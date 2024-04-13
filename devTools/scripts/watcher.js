/**
 * @file Watches for changes in the project, when changes occur we run the advanced compiler
 */

// @ts-ignore
import jetpack from "fs-jetpack";
import watch from "node-watch";
import {execSync, spawn} from "child_process";
import * as path from "path";
import * as http from "http";
import {createHash} from "crypto";
// @ts-ignore
import colors from "ansi-colors";

const batSh = (process.platform === "win32") ? "bat" : "sh";

/** @type {import("child_process").ChildProcessWithoutNullStreams} */
let buildProcess;
/** @type {import("child_process").ChildProcessWithoutNullStreams} */
let sanityCheckProcess;

// make sure settings.json exists and has all the required properties
execSync("node devTools/scripts/setup.js --settings");

// load settings.json
/** @type {import("./setup.js").Settings} */
let settings = jetpack.read("settings.json", "json");

/**
 * @param {string} fPath path to check
 * @returns {boolean} true if a path is allowed, false otherwise
 */
function allowed(fPath) {
	if (fPath.endsWith("fc-version.js.commitHash.js")) {
		return false;
	} else if (
		fPath.startsWith("src") ||
		fPath.startsWith("js") ||
		fPath.startsWith("css") ||
		fPath.startsWith("mods") ||
		fPath.startsWith("themes") ||
		fPath.startsWith("tests") ||
		fPath.startsWith("resources") ||
		fPath.startsWith("settings.json") ||
		fPath.startsWith(`devTools${path.sep}scripts`) ||
		fPath.startsWith("gulpfile.js")
	) {
		return true;
	}
	return false;
}

let hashes = {};

let needsReloaded = false;

if (settings.WatcherLiveReload === true) {
	// start http server for live reloading
	let app = http.createServer((req, res) => {
		res.setHeader("Content-Type", "application/json");
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.end(JSON.stringify({needsReloaded: needsReloaded}, null, 2));
		needsReloaded = false;
	});
	app.listen(16969);
	console.log("Live reload server listening on port 16969");
} else {
	console.log("Live reloading is disabled");
}

/**
 * runs the compiler
 * @param {boolean} andSanity if true then we run sanity checks after compiling
 */
function runCompiler(andSanity = false) {
	console.log("Running the compiler...");
	buildProcess = spawn(
		"node",
		[
			"devTools/scripts/advancedCompiler.js", "--filename=FC_pregmod.watcher.html",
			"--no-interaction", "--skip-sanity-checks"
		],
		{
			stdio: ['inherit', 'inherit', 'inherit'],
		}
	);
	buildProcess.on('exit', function(code) {
		if (code === null) {
			return;
		} else if (code === 0) {
			console.log(colors.blue(`Saving changes in "setup.${batSh}" will toggle a rebuild using the new settings`));
			if (settings.WatcherLiveReload === true) {
				// trigger a reload
				needsReloaded = true;
			}
			if (andSanity === true) {
				runSanity();
			}
		} else {
			console.log(colors.red(`Compiler exited with code: ${code.toString()}`));
		}
	});
}

/**
 * runs the sanity checker
 * @param {boolean} andCompiler if true then we run compiler after doing sanity checks
 */
function runSanity(andCompiler = false) {
	console.log("Running sanity checks...");
	sanityCheckProcess = spawn(
		"node",
		[ "devTools/scripts/sanityCheck.js", "--no-interaction"],
		{
			stdio: ['inherit', 'inherit', 'inherit'],
		}
	);
	sanityCheckProcess.on('exit', function(code) {
		if (code === null) {
			return;
		} else {
			if (code !== 0) {
				console.log(colors.red(`Sanity checker exited with code: ${code.toString()}`));
			}
			if (andCompiler === true) {
				runCompiler();
			}
		}
	});
}

/**
 * Builds FC using the advanced compiler
 */
function build() {
	console.log("");

	if (buildProcess !== undefined) {
		buildProcess.kill();
	}
	if (sanityCheckProcess !== undefined) {
		sanityCheckProcess.kill();
	}

	// set needsReloaded to false to stop unnecessary reloads
	needsReloaded = false;

	if (settings.compilerRunSanityChecks === 1) {
		// sanity checks first then compile
		runSanity(true);
	} else if (settings.compilerRunSanityChecks === 2) {
		// compile first then sanity checks
		runCompiler(true);
	} else {
		// compile without sanity checks
		runCompiler(false);
	}
}

console.log(colors.blue(`The watcher will save its output to "bin/FC_pregmod.watcher.html"`));
if (settings.compilerCopyToFCHost === true && jetpack.exists(settings.FCHostPath) === "dir") {
	console.log(colors.blue(`The watcher's output will be copied to "${settings.FCHostPath}"`));
}
console.log("Watcher is starting, please wait...");

// hash all files
jetpack.find(".").forEach(file => {
	if (!allowed(file)) { return; }
	// console.log(`Hashing "${file}"`);
	try {
		hashes[file] = createHash("sha256").update(jetpack.read(file, "utf8")).digest("base64");
	} catch (e) {
		// fail silently
	}
});

const watcher = watch(".", {
	recursive: true,
	// eslint-disable-next-line jsdoc/require-jsdoc
	filter(f, skip) {
		if (
			allowed(f)
		) {
			return true;
		} else if (jetpack.exists(f) === "dir") {
			return skip;
		} else {
			return false;
		}
	}
});

watcher.on("change", function(event, filename) {
	filename = filename.toString();

	if (event === "update" && filename && jetpack.exists(filename) === "file") {
		try {
			let hash = createHash("sha256").update(jetpack.read(filename, "utf8")).digest("base64");
			if (!(filename in hashes) || hash !== hashes[filename]) {
				console.log("");
				console.log(filename + " changed");
				if (filename === "settings.json") {
					// reload settings.json
					console.log("Reloading settings");
					/** @type {import("./setup.js").Settings} */
					settings = jetpack.read("settings.json", "json");
				}
				hashes[filename] = hash;
				build();
			}
		} catch (e) {
			console.log(e);
		}
	}
});

console.log("Watching for changes");
console.log("");

// run build when we first startup
build();
