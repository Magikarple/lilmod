// cSpell:ignore yesno

/**
 * @file Makes sure that node dependencies are installed
 */

// @ts-ignore
import jetpack from "fs-jetpack";
import {ask} from "./yesno.js";
import {execSync} from "child_process";

// We need to load package.json to detect kinds of dependencies
// Don't want to install a dev dependency as a normal dependency and vise versa
/** @type {object} */
const packageContents = jetpack.read("package.json", "json");
/** @type {object} */
const devDependencies = packageContents.devDependencies;
/** @type {object} */
const dependencies = packageContents.dependencies;

// make sure settings.json exists and has all the required properties
execSync("node devTools/scripts/setup.js --settings");

// load settings.json
/** @type {import("./setup.js").Settings} */
const settings = jetpack.read("settings.json", "json");

function installGitHooks() {
	execSync("node devTools/scripts/gitHooks/addHooks.js");
}

/**
 * Adds any packages with the wrong version to problems
 * @param {string} npmList results of `npm ls` command
 * @param {string[]} problems
 */
async function parseWrongVersion(npmList, problems) {
	npmList.split("\n").forEach(line => {
		// npm ERR! invalid: eslint@7.0.0 C:\Users\dev\Documents\Projects\fc pregmod\node_modules\eslint
		if (line.trim().startsWith("npm ERR! invalid: ")) {
			line = line.replace("npm ERR! invalid: ", "");
			let nodePackage = line.match(/^[^ ]*/)[0];
			problems.push(nodePackage.split("@")[0]);
		}
	});
	return problems;
}

/**
 * Adds any missing packages to problems
 * @param {string} npmList results of `npm ls` command
 * @param {string[]} problems
 */
async function parseMissing(npmList, problems) {
	npmList.split("\n").forEach(line => {
		// npm ERR! missing: eslint@^8.0.0, required by free-cities@1.0.0
		if (line.trim().startsWith("npm ERR! missing: ")) {
			line = line.replace("npm ERR! missing: ", "");
			let nodePackage = line.match(/^[^,]*/)[0];
			problems.push(nodePackage.split("@")[0]);
		}
	});
	return problems;
}

/**
 * Checks for missing and outdated node packages.
 */
async function main() {
	let npmList = "";
	try {
		npmList = execSync('npm ls', {maxBuffer: 1024 * 1024 * 1024, stdio: ['pipe']}, ).toString();
	} catch (e) {
		e.output.forEach(out => {
			if (out === null) { return; }
			npmList += "\n" + out.toString();
		});
	}

	/** @type {string[]} */
	let problems = [];

	if (npmList.includes("npm ERR! invalid: ")) {
		problems = await parseWrongVersion(npmList, problems);
	}

	if (npmList.includes("npm ERR! missing: ")) {
		problems = await parseMissing(npmList, problems);
	}

	// remove empty strings from problems
	problems = problems.filter(problem => problem.trim() !== "");

	let devDependencyCommand = "npm install --save-dev";
	let dependencyCommand = "npm install --save";

	problems.forEach(problem => {
		if (problem.trim().length === 0) { return; }
		let matched = false;
		for (let [key, value] of Object.entries(devDependencies)) {
			if (matched === true) { continue; }
			if (key === problem) {
				matched = true;
				devDependencyCommand += ` ${key}@${value}`;
			}
		}
		if (matched === true) { return; }
		for (let [key, value] of Object.entries(dependencies)) {
			if (matched === true) { continue; }
			if (key === problem) {
				matched = true;
				dependencyCommand += ` ${key}@${value}`;
			}
		}
		if (matched === false) {
			console.log(`Unknown dependency type for ${problem}`);
		}
	});

	if (problems.length === 0) {
		installGitHooks();
		return;
	}

	console.log("The Node packages below are missing or are the wrong version.");
	console.log("");
	problems.forEach(problem => console.log(problem));
	console.log("");
	console.log("The command(s) that need to be run to fix this problem are:");
	console.log("");
	if (devDependencyCommand !== "npm install --save-dev") {
		console.log(devDependencyCommand);
	}
	if (dependencyCommand !== "npm install --save") {
		console.log(dependencyCommand);
	}
	console.log("");
	if (settings.manageNodePackages === 0) {
		// @ts-ignore
		const answer = await ask({
			question: "Would you like us to run the above command(s) for you? [Y/N]",
		});
		if (answer === true) {
			if (devDependencyCommand !== "npm install --save-dev") {
				execSync(devDependencyCommand, {stdio:[0, 1, 2]});
			}
			if (dependencyCommand !== "npm install --save") {
				execSync(dependencyCommand, {stdio:[0, 1, 2]});
			}
			const settingsScript = (process.platform === "win32") ? "setup.bat" : "setup.sh";
			console.log(`If you wish not to be asked about Node packages again, run '${settingsScript}' and change option #1 in "Edit Miscellaneous Settings"`);
			installGitHooks();
		} else {
			console.log("If you wish not to be asked about Node packages again, change 'manageNodePackages' in settings.json to -1 (no) or 1 (yes).");
		}
	} else if (settings.manageNodePackages === 1) {
		if (devDependencyCommand !== "npm install --save-dev") {
			execSync(devDependencyCommand, {stdio:[0, 1, 2]});
		}
		if (dependencyCommand !== "npm install --save") {
			execSync(dependencyCommand, {stdio:[0, 1, 2]});
		}
		installGitHooks();
	}
}

// @ts-ignore
await main();
