/**
 * @file This creates a Gulp compiler command out of settings.json and executes it
 */

// cSpell:ignore pmodversion

import {execSync} from "child_process";
// @ts-ignore
import jetpack from "fs-jetpack";
import * as path from "path";
import yargs from "yargs";
import {hideBin} from "yargs/helpers";
import notifier from "node-notifier";

const args = yargs(hideBin(process.argv))
	.showHelpOnFail(true)
	.option('interaction', {
		type: 'boolean',
		description: 'Used by scripts to let the compiler know that user interaction is not possible.',
		default: true,
	})
	.option('filename', {
		type: 'string',
		description: 'The filename to save the compiled HTML file as',
		default: "FC_pregmod.html"
	})
	.option('skip-sanity-checks', {
		type: 'boolean',
		description: 'If true sanity checks will be skipped regardless of settings',
		default: false,
	})
	.parse();

const batSh = (process.platform === "win32") ? "bat" : "sh";

if (args.interaction === true) {
	console.log(`Using the advanced compiler, run 'simple-compiler.${batSh}' instead to use the simple compiler.`);
}

// make sure settings.json exists and has all the required properties
execSync("node devTools/scripts/setup.js --settings");

// load settings.json
/** @type {import("./setup.js").Settings} */
const settings = jetpack.read("settings.json", "json");

let command = "";

if (settings.compilerMode === "simple") {
	if (process.platform === "win32") {
		command = "simple-compiler.bat --no-wait";
	} else {
		command = "./simple-compiler.sh";
	}
	if (settings.compileThemes === true) {
		command += ` --themes`;
	}
} else {
	if (settings.compilerRunSanityChecks === 1 && args.skipSanityChecks === false) {
		try {
			execSync(
				`node devTools/scripts/sanityCheck.js${args.interaction ? "" : " --no-interaction"}`,
				{stdio: "inherit"}
			);
		} catch {
			console.log("Sanity checks failed! See above for details");
		}
	}
	if (settings.compileThemes === true) {
		command = `npx gulp all`;
	} else {
		command = `npx gulp html mods`;
	}
	command += ` --verbosity ${settings.compilerVerbosity}`;
	if (settings.compilerSourcemaps === false) {
		command += ` -r`; // release
	}
	if (settings.compilerMinify === true) {
		command += ` -m`; // minify
	}
	if (settings.compilerAddDebugFiles === true) {
		command += ` --debug`;
	}
	if (settings.compilerFilenameHash === true) {
		command += ` --hash`;
	}
	if (settings.compilerFilenameEpoch === true) {
		command += ` --epoch`;
	}
	if (settings.compilerFilenamePmodVersion === true) {
		command += ` --pmodversion`;
	}
	if (settings.WatcherLiveReload === true) {
		command += ` --inject-live-reload`;
	}
	command += ` --filename=${args.filename}`;
}

console.log(`Executing "${command}"`);

execSync(command, {stdio: "inherit"});

if (settings.compilerCopyToFCHost === true) {
	if (jetpack.exists(settings.FCHostPath) === "dir") {
		console.log(`Copying files from "bin" to "${settings.FCHostPath}"`);
		// for each file/folder in bin
		jetpack.list("bin").forEach(fPath => {
			// if path doesn't end with .html
			if (!fPath.endsWith(".html")) {
				// copy it to FCHostPath, overwritting the existing file
				jetpack.copy(
					path.join("bin", fPath),
					path.join(settings.FCHostPath, fPath),
					{overwrite: true}
				);
			}
		});
		// copy output html file to FCHostPath, renaming it to FC_pregmod.html
		const htmlPath = path.join("bin", args.filename);
		if (jetpack.exists(htmlPath) === "file") {
			jetpack.copy(
				htmlPath,
				path.join(settings.FCHostPath, "FC_pregmod.html"),
				{overwrite: true}
			);
		} else {
			console.log(`Couldn't find "${htmlPath}"!`);
		}
	} else {
		console.log(`Skipping: 'Copy "bin" to "${settings.FCHostPath}"' because the path doesn't exist`);
	}
}

if (settings.compilerMode === "advanced" && settings.compilerRunSanityChecks === 2 && args.skipSanityChecks === false) {
	try {
		execSync(
			`node devTools/scripts/sanityCheck.js${args.interaction ? "" : " --no-interaction"}`,
			{stdio: "inherit"}
		);
	} catch {
		console.log("Sanity checks failed! See above for details");
	}
}

if (settings.compilerMode === "advanced" && settings.compilerFinishedNotification) {
	// push a notification
	notifier.notify({
		title: 'FC Dev',
		message: 'Compiler finished',
		icon: 'resources/raster/favicon/arcologyVector-144.png',
	});
}

console.log(`Run 'setup.${batSh}' to change compiler settings`);
if (settings.compilerWaitOnWindows && process.platform === "win32" && args.interaction === true) {
	console.log('Press enter to exit.');
	process.stdin.once('data', function() {
		process.exit();
	});
}
