/**
 * @file defines the gulp tasks that we use to build FC
 */

/* globals process */
// cSpell: words embedsourcemaps, sourcemapsincludecontent, pmodversion, fnames, nothrow, pathcmp, autoprefix

import yargs from "yargs";
import {hideBin} from "yargs/helpers";
import terser from "gulp-terser";
import cleanCSS from "gulp-clean-css";
import autoprefixer from "autoprefixer";
import gulp from "gulp";
import concat from "gulp-concat";
import gulpIgnore from "gulp-ignore";
import log from "fancy-log-levels";
import noop from "gulp-noop";
import postcss from "gulp-postcss";
import shell from "gulp-shell";
import sort from "gulp-sort";
import sourcemaps from "gulp-sourcemaps";
import stripCssJSComments from "gulp-strip-comments";
import {execSync} from "child_process";
import which from "which";
import jetpack from "fs-jetpack";
import path from "path";
import os from "os";
import {fileURLToPath} from "url";

// load json without using "...assert {type: "json"}" which is still in to proposal stage
// https://github.com/tc39/proposal-json-modules
const cfg = jetpack.read(fileURLToPath(new URL('./build.config.json', import.meta.url)), "json");

// run `npx gulp` to display help
const args = yargs(hideBin(process.argv))
	.showHelpOnFail(true)
	.option('verbosity', {
		alias: 'v',
		type: 'number',
		description: 'Logging verbosity level, 1-6',
		default: 6,
	})
	.option('release', {
		alias: 'r',
		type: 'boolean',
		description: 'Build source maps if not supplied',
		default: false,
	})
	.options('ci', {
		type: 'boolean',
		description: 'Assumes gitlab CI environment',
		default: false,
	})
	.option('minify', {
		alias: 'm',
		type: 'boolean',
		description: 'Makes builds smaller at the cost of readability and compiling time',
		default: false,
	})
	.options('embedsourcemaps', {
		type: 'boolean',
		description: 'Embed source maps into final html file',
		default: true,
	})
	.options('sourcemapsincludecontent', {
		type: 'boolean',
		description: 'Add original js and css code to the source maps. Loses file names and paths!',
		default: false,
	})
	.options('debug', {
		type: 'boolean',
		description: 'Add files that match the *.debug.* pattern, otherwise ignore them',
		default: false,
	})
	.options('hash', {
		type: 'boolean',
		description: 'Adds the git commit hash to the output filename',
		default: false,
	})
	.options('epoch', {
		type: 'boolean',
		description: 'Adds the current epoch time to the output filename',
		default: false,
	})
	.options('pmodversion', {
		type: 'boolean',
		description: 'Adds the current pregmod version number to the output filename',
		default: false,
	})
	.option('filename', {
		type: 'string',
		description: 'The filename to save the compiled HTML file as',
		default: cfg.output,
	})
	.option('inject-live-reload', {
		type: 'boolean',
		description: 'Injects code used by the watcher to live reload FC',
		default: false,
	})
	// commands should exist as exported gulp tasks
	.command('html', "Build FC")
	.command('themes', "Build themes")
	.command('mods', "Build mods")
	.command('all', "Build FC, themes, and mods")
	.demandCommand()
	.parse();

/**
 * Options used to minify js code using terser
 * @type {import("terser").MinifyOptions}
 */
const terserMinifyConfig = {
	// https://www.npmjs.com/package/terser#minify-options
	mangle: true,
	// eslint-disable-next-line camelcase
	keep_classnames: true,
	// eslint-disable-next-line camelcase
	keep_fnames: true,
};
/**
 * Options used to minify css code using CleanCSS
 */
const cleanCssMinifyConfig = {
	// https://www.npmjs.com/package/clean-css#constructor-options
};
/** Filename for the temporary output. Tweego will write here and then it will be moved into the output dir */
const htmlOut = "tmp.html";

// set log verbosity basing on the command line argument
log(args.verbosity);

// -------------- Helper functions -----------------------

/**
 * Locates a tweego executable.
 * Looks in the host $PATH, otherwise uses one of the bundled executables in devTools/tweeGo
 * @returns {string} Returns the path to the tweego executable
 */
function tweeCompilerExecutable() {
	const systemTweego = which.sync("tweego", {nothrow: true});

	if (systemTweego) {
		log.info("Found system tweego at ", systemTweego);
		return systemTweego;
	}

	const archSuffix = os.arch() === "x64" ? "64" : "86";
	const platformSuffix = {
		"Darwin": "osx",
		"Linux": "nix",
		"Windows_NT": "win"
	}[os.type()];
	const extension = os.type() === "Windows_NT" ? ".exe" : "";
	const res = path.join(".", "devTools", "tweeGo", `tweego_${platformSuffix}${archSuffix}${extension}`);

	log.info("Using bundled tweego at ", res);
	return res;
}

/**
 * Composes tweego invocation command
 *
 * Combines paths to tweego and options defined in the build.config.json file to
 * return a full tweego launch command, which will combine all story elements, pick up modules,
 * and generate a HTML file in the intermediate directory
 * @returns {string} Full tweego command string
 */
function tweeCompileCommand() {
	const sources = [path.join(cfg.dirs.intermediate, "story")];

	sources.push(...cfg.sources.story.media);

	const modules = [path.join(cfg.dirs.intermediate, "module")];
	const moduleArgs = modules.map(fn => `--module=${fn}`);

	return `"${tweeCompilerExecutable()}" --head=${cfg.sources.head} -o ${path.join(cfg.dirs.intermediate, htmlOut)} ${moduleArgs.join(" ")} ${sources.join(" ")}`;
}

/**
 * gulp-sort uses String.localeCompare() by default, which may be case-insensitive,
 * while we require case-sensitive sorting for sources
 * @param {Vinyl} a
 * @param {Vinyl} b
 * @returns {number}
 */
function pathcmp(a, b) {
	return (a.path < b.path ? -1 : (a.path > b.path ? 1 : 0));
}

/**
 * Creates a pipeline that sorts and combines files
 * @param {string|string[]} srcGlob Glob(s) to combine
 * @param {string} destDir destination directory to save to
 * @param {string} destFileName the filename to save as
 * @returns {NodeJS.ReadWriteStream}
 */
function concatFiles(srcGlob, destDir, destFileName) {
	return gulp.src(srcGlob)
		.pipe(args.debug
			? noop()
			: gulpIgnore.exclude("*.debug.*")
		)
		.pipe(sort(pathcmp))
		.pipe(concat(destFileName))
		.pipe(gulp.dest(destDir));
}

/**
 * Creates a pipeline for processing JS scripts
 *
 * The pipeline collects sources, sorts them, concatenates and
 * saves in the destination dir. If no "release" command line switch was
 * supplied, sourcemaps will be written for the files
 * @param {string} srcGlob Glob to process
 * @param {string} destDir destination directory to save to
 * @param {string} destFileName the filename to save as
 * @returns {NodeJS.ReadWriteStream}
 */
function processScripts(srcGlob, destDir, destFileName) {
	const addSourcemaps = !args.release;
	const prefix = path.relative(destDir, srcGlob.substr(0, srcGlob.indexOf("*")));

	if (args.injectLiveReload === true && destFileName === "module-script.js") {
		const liveReloadScriptPath = "devTools/scripts/watcherLiveReload.js";
		if (jetpack.exists(liveReloadScriptPath) === "file") {
			log.info("Injecting live reload code");
			if (typeof srcGlob === "string") {
				srcGlob = [srcGlob];
			}
			srcGlob.push(liveReloadScriptPath);
		} else {
			log.error(`Live reload script is missing from "${liveReloadScriptPath}"!`);
		}
	}

	return gulp.src(srcGlob)
		.pipe(args.debug
			? noop()
			: gulpIgnore.exclude("*.debug.*")
		)
		.pipe(sort(pathcmp))
		.pipe(addSourcemaps ? sourcemaps.init() : noop())
		.pipe(concat(destFileName))
		.pipe(args.minify
			// @ts-expect-error This is correct
			? terser(terserMinifyConfig)
			: noop())
		.pipe(addSourcemaps
			? sourcemaps.write(args.embedsourcemaps ? undefined : ".", {
				includeContent: args.sourcemapsincludecontent,
				sourceRoot: prefix,
				sourceMappingURLPrefix: path.relative(cfg.dirs.output, destDir)
			})
			: noop())
		.pipe(gulp.dest(destDir));
}

/**
 * Creates a pipeline for processing CSS stylesheets
 *
 * The pipeline collects sources, sorts them, concatenates, pass through
 * an autoprefixer and saves in the destination dir. If no "release" command
 * line switch was supplied, sourcemaps will be written for the files
 * @param {string} srcGlob Glob to process
 * @param {string} destDir destination directory to save to
 * @param {string} destFileName the filename to save as
 * @returns {NodeJS.ReadWriteStream}
 */
function processStylesheets(srcGlob, destDir, destFileName) {
	const addSourcemaps = !args.release;
	const prefix = path.relative(destDir, srcGlob.substr(0, srcGlob.indexOf("*")));

	return gulp.src(srcGlob)
		.pipe(args.debug
			? noop()
			: gulpIgnore.exclude("*.debug.*")
		)
		.pipe(sort(pathcmp))
		.pipe(addSourcemaps ? sourcemaps.init() : noop())
		.pipe(concat(destFileName))
		.pipe(cfg.options.css.autoprefix
			? postcss([autoprefixer({overrideBrowserslist: ["last 2 versions"]})])
			: noop())
		// minify css using CleanCSS
		.pipe(args.minify
			? cleanCSS(cleanCssMinifyConfig)
			: noop())
		.pipe(addSourcemaps
			? sourcemaps.write(args.embedsourcemaps ? undefined : ".", {
				includeContent: args.sourcemapsincludecontent,
				sourceRoot: prefix,
				sourceMappingURLPrefix: path.relative(cfg.dirs.output, destDir)
			})
			: noop())
		.pipe(gulp.dest(destDir));
}

/**
 * Creates tasks for processing sources with provided function
 *
 * This function is a workaround. Gulp can handle multiple globs at time, but
 * for writing sourcemaps we have to process them one by one, because we detect
 * where to write source maps from each glob pattern in order to make them accessible
 * from the compiled HTML
 * @param {("module-js"|"module-css"|"story-js"|"story-css"|"story-twee"|"story-media")} name
 * @param {Function} processorFunc
 * @param {string[]} globs
 * @param {string} destDir destination directory to save to
 * @param {string} destFileName filename to save as
 * @param  {...any} args extra args to pass to processorFunc
 * @returns {import("gulp").TaskFunction}
 */
function processSrc(name, processorFunc, globs, destDir, destFileName, ...args) {
	/** @type {import("gulp").TaskFunction[]} */
	const tasks = [];

	if (!Array.isArray(globs) || globs.length === 1) {
		const src = Array.isArray(globs) ? globs[0] : globs;

		tasks.push(() => processorFunc(src, destDir, destFileName, args));
		tasks[tasks.length - 1].displayName = "process-" + name;
	} else { // many globs
		const ext = path.extname(destFileName);
		const bn = path.basename(destFileName, ext);

		for (let i = 0; i < globs.length; ++i) {
			tasks.push(() => processorFunc(globs[i], destDir, `${bn}-${i}${ext}`, args));
			tasks[tasks.length - 1].displayName = `process-${name}-${i}`;
		}
	}

	const res = gulp.parallel(...tasks);

	res.displayName = name;
	return res;
}

function gitExecutableExists() {
	return which.sync('git', {nothrow: true}) !== null;
}

/**
 * Returns true if the working directory is a Git repository
 * @returns {boolean}
 */
function isGitCheckout() {
	return jetpack.exists(".git") === "dir";
}

let gitHash = "UNKNOWN";

/**
 * Invokes git and writes the hash of the head commit to the file, specified in the 'gitVersionFile' config property
 * @param {Function} cb callback function
 */
function injectGitCommit(cb) {
	// check if we are in CI mode, if yes, just read out the hash from environment variables
	gitHash = args.ci
		? execSync("echo $CI_COMMIT_SHORT_SHA").toString().trim()
		: execSync("git rev-parse --short HEAD").toString().trim();

	if (gitHash === "$CI_COMMIT_SHORT_SHA" || (gitHash === "" && args.ci === true)) {
		// This should only fire if the CI flag is used out of GitLab CI
		// If it fires in GitLab CI then $CI_COMMIT_SHORT_SHA is no longer valid or something has gone terribly wrong.
		log.warn(`git hash === "${gitHash}"!`);
		log.warn("Are you in a GitLab CI environment?");
		log.warn("If not please remove the --ci flag from the commands arguments to remove this message.");
		log.warn("Sleeping for 10 seconds and then setting ci to false");
		// sleep for 10 second
		Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 10000);
		args.ci = false;
		return injectGitCommit(cb);
	} else if (gitHash === "") {
		throw new Error("Failed to get git hash!");
	}

	log.info("current git hash:", gitHash);
	jetpack.write(cfg.gitVersionFile, `App.Version.commitHash = '${gitHash}';\n`, {atomic: true});
	cb();
}

/**
 * Ensures the file with the git commit hash does not exists
 * @param {Function} cb callback function
 */
function cleanupGit(cb) {
	jetpack.remove(cfg.gitVersionFile);
	cb();
}

/**
 * Copies a file/directory to a destination
 * @param {string} source
 * @param {string} destination
 * @param {boolean} removeExisting
 * @param {Function} callback
 */
function copy(source, destination, removeExisting, callback) {
	// if not debug mode filter out *.debug.* files
	let matching = "!*.debug.*";

	if (args.debug === true) {
		matching = "*";
	}

	if (removeExisting) {
		jetpack.remove(destination);
	}

	jetpack.copy(source, destination, {overwrite: true, matching: matching});
	callback();
}

// --------------- build tasks definitions -----------------
/*
The main build process, which produces the assembled HTML file, consists of several stages.
The game sources, which are .twee, .js, and .css files, belong to one of the two categories:
they are either part of the story in Tweego terms, or modules. These categories are called
"components" below. For each component files of the same type are processed in the same way
and results for each component/file type pair are concatenated file in the intermediate builds
directory and a source map for that file.
When all intermediate files are ready, tweego picks them up and assembles the HTML file.
*/

// Create task to execute tweego
gulp.task("compileStory", shell.task(tweeCompileCommand(), {
	env: {...process.env, ...cfg.options.twee.environment},
	verbose: args.verbosity >= 3
}));

/**
 * Creates tasks for preparing intermediate files for a component
 * @param {"story"|"module"} name "story" or "module"
 * @returns {import("gulp").TaskFunction}
 */
function prepareComponent(name) {
	const processors = {
		"css": {
			func: processStylesheets,
			output: "-styles.css"
		},
		"js": {
			func: processScripts,
			output: "-script.js"
		},
		"twee": {
			func: concatFiles,
			output: "-story.twee"
		},
		"media": {
			func: null
		}
	};
	const c = cfg.sources[name];
	const outDir = path.join(cfg.dirs.intermediate, name);
	const subTasks = [];

	/** @type {"css"|"js"|"twee"|"media"} */
	let srcType;

	for (srcType in c) {
		const proc = processors[srcType];

		if (proc.func) {
			// @ts-expect-error ${name}-${srcType} is valid
			subTasks.push(processSrc(`${name}-${srcType}`, proc.func, c[srcType], outDir, `${name}${proc.output}`, cfg.options[srcType]));
		}
	}

	const r = gulp.parallel(subTasks);

	r.displayName = "prepare-" + name;
	return r;
}

/**
 *  Creates a task for compiling a theme
 * @param {string} themeName theme directory name
 * @returns {string} task name
 */
function makeThemeCompilationTask(themeName) {
	// make sure it's a name, not a path
	if (themeName.replace(/\/+$/, "").replace(/\\+$/, "").includes(path.sep)) {
		// only keep the last path component
		themeName = themeName.split(path.sep).pop();
	}

	const taskName = `make-theme-${themeName}`;

	gulp.task(taskName, function() {
		return concatFiles(`${cfg.sources.themes}/${themeName}/**/*.css`, cfg.dirs.output, `${themeName}.css`);
	});
	return taskName;
}

/**
 *  Creates a task for compiling a mod
 * @param {string} modName mod directory name
 * @returns {string} task name
 */
function makeModCompilationTask(modName) {
	// make sure it's a name, not a path
	if (modName.replace(/\/+$/, "").replace(/\\+$/, "").includes(path.sep)) {
		// only keep the last path component
		modName = modName.split(path.sep).pop();
	}

	const taskName = `make-mod-${modName}`;

	gulp.task(taskName, function(cb) {
		return copy(`${cfg.sources.mods}/${modName}`, `${cfg.dirs.modOutput}/${modName}`, true, cb);
	});
	return taskName;
}

/**
 * Moves compiled HTML file from the intermediate location to the final output
 * @param {Function} cb callback function
 */
function moveHTML(cb) {
	if (jetpack.exists(path.join(cfg.dirs.intermediate, htmlOut)) === "file") {
		let finalPath = path.join(cfg.dirs.output, args.filename);
		let extraString = "";

		if (args.epoch) {
			extraString += "." + String(Math.floor(Date.now() / 1000));
		}

		if (args.pmodversion) {
			// open ./src/002-config/fc-version.js
			jetpack.read("./src/002-config/fc-version.js").split("\n").forEach(line => {
				if (line.trim().includes("pmod: ")) {
					// add everything between first and last " to extraString
					extraString += "." + line.split("\"")[1].split("\"")[0];
				}
			});
		}

		if (args.hash) {
			extraString += "." + gitHash;
		}

		finalPath = finalPath.replace("[extras]", extraString);

		jetpack.move(path.join(cfg.dirs.intermediate, htmlOut), path.resolve(finalPath), {overwrite: true});

		log.info("FC saved to \"" + finalPath + "\"");
		cb();
	}
}

/**
 *  Removes intermediate compilation files if any
 * @param {Function} cb callback function
 */
function removeIntermediateFiles(cb) {
	jetpack.remove(cfg.dirs.intermediate);
	cb();
}

// Creates task to assemble components in the intermediate dir where they are ready for tweego
gulp.task("prepare", gulp.parallel(prepareComponent("module"), prepareComponent("story")));

// Creates theme build task for each subdirectory in the 'themes' dir
const themeTasks = jetpack.find(cfg.sources.themes, {files: false, directories: true, recursive: false})
	.map(entry => makeThemeCompilationTask(entry));

// create cfg.sources.mods directory if it doesn't exist
jetpack.dir(cfg.sources.mods);

// Creates mod build task for each subdirectory in the 'mods' dir
const modTasks = jetpack.find(cfg.sources.mods, {files: false, directories: true, recursive: false})
	.map(entry => makeModCompilationTask(entry));

// If modTasks is empty, create a task that does nothing
if (modTasks.length === 0) {
	gulp.task("make-mod-empty-folder", function(cb) {
		return cb();
	});

	modTasks.push("make-mod-empty-folder");
}

// Create the main build and clean tasks, which include writing Git commit hash if we are working in a Git repo
let cleanOp = noop();

if (isGitCheckout() && gitExecutableExists()) {
	cleanOp = gulp.parallel(cleanupGit, removeIntermediateFiles);

	gulp.task("buildHTML", gulp.series(cleanOp, injectGitCommit, "prepare", "compileStory", cleanupGit));
} else if (args.ci) {
	// CI environment is already clean

	gulp.task("buildHTML", gulp.series(injectGitCommit, "prepare", "compileStory"));
} else {
	if (isGitCheckout()) {
		log.info("git executable not found.");
	}
	cleanOp = gulp.parallel(removeIntermediateFiles);
	gulp.task("buildHTML", gulp.series(cleanOp, "prepare", "compileStory"));
}

export const clean = cleanOp;

// Create user-invocable targets for building HTML and themes
export const html = gulp.series("buildHTML", moveHTML);
export const themes = gulp.parallel(themeTasks);
export const mods = gulp.parallel(modTasks);

// Convenient shortcut to build everything (HTML, themes, and mods)
export const all = gulp.parallel(html, themes, mods);

// legacy tasks

gulp.task("twineCSS", function() {
	return concatFiles([...cfg.sources.module.css, ...cfg.sources.story.css], "devNotes", "twine CSS.txt");
});

gulp.task("twineJS", function() {
	return gulp.src([...cfg.sources.module.js, ...cfg.sources.story.js, "!src/art/assistantArt.js"])
		.pipe(args.debug
			? noop()
			: gulpIgnore.exclude("*.debug.*")
		)
		.pipe(stripCssJSComments({trim: true}))
		.pipe(sort(pathcmp))
		.pipe(concat("twine JS.txt"))
		.pipe(gulp.dest("devNotes"));
});

export const twine = gulp.parallel("twineCSS", "twineJS");
