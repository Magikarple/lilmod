/**
 * @file An hook script to verify what is about to be committed.
 *Called by "git commit" with no arguments.  The hook should
 * exit with non-zero status after issuing an appropriate message if
 * it wants to stop the commit.
 */

// @ts-ignore
import jetpack from "fs-jetpack";
import {execSync} from 'child_process';

// make sure settings.json exists and has all the required properties
execSync("node devTools/scripts/setup.js --settings");

// load settings.json
/** @type {import("./../setup.js").Settings} */
const settings = jetpack.read("settings.json", "json");

if (settings.precommitHookEnabled === 1) {
	try {
		execSync("node devTools/scripts/sanityCheck.js --staged", {stdio: "inherit"});
	} catch (e) {
		console.log("Sanity checks failed! See above for details");
		process.exit(1);
	}
} else if (settings.precommitHookEnabled === -1) {
	console.log("Precommit hook temporarily disabled");
	settings.precommitHookEnabled = 1;
	// save settings to settings.json
	jetpack.write("settings.json", settings, {atomic: true});
} else {
	console.log("pre-commit sanity checks are currently disabled");
}
