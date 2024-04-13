/**
 * @file Spell checks files using cspell
 * Only checks .js and .md files
 *
 * Can be called from the command line
 *
 * node devTools/scripts/spellingChecks.js
 * node devTools/scripts/spellingChecks.js --changed
 *
 * Or imported as shown below
 *
 * import spellingChecks from './spellingChecks.js';
 * const changed = false;
 * /** @type{Array<string>} *\/
 * const report = spellingChecks(changed);
 */

import detectChanges from './detectChanges.js';

import {execSync} from 'child_process';
import yargs from "yargs";
import {hideBin} from "yargs/helpers";
import {resolve} from 'path';
import {fileURLToPath} from 'url';
// @ts-ignore
import jetpack from 'fs-jetpack';
import stripAnsi from "strip-ansi";

const args = yargs(hideBin(process.argv))
	.showHelpOnFail(true)
	.option('changed', {
		type: 'boolean',
		description: 'Only check changed files',
		default: false,
	})
	.parse();

/**
 * Runs spelling checks of files
 * @param {boolean} changed If true, only check changed files. If false, check all files.
 * @param {string[]} files If provided we will sent this list of files to cSpell instead
 * @param {detectChanges} parser If provided it will be used instead of the default parser
 * @returns {Array<string>}
 */
function spellingChecks(changed = false, files = undefined, parser = detectChanges) {
	const cspellPath = "cspell.json";

	// sort words in cspell.json by alphabetical order
	// also makes them lowercase
	if (jetpack.exists(cspellPath) === "file") {
		const cspell = jetpack.read(cspellPath, "json");
		let changed = false;

		// if cspell doesn't have a words property create it
		if (!cspell.hasOwnProperty("words")) {
			cspell.words = [];
		}

		// if cspell doesn't have a ignoreWords property create it
		if (!cspell.hasOwnProperty("ignoreWords")) {
			cspell.ignoreWords = [];
		}

		// if cspell doesn't have a flagWords property create it
		if (!cspell.hasOwnProperty("flagWords")) {
			cspell.flagWords = [];
		}

		// make a copy of words, ignoredWords, and flagWords for reference
		const words = JSON.parse(JSON.stringify(cspell.words));
		const ignoreWords = JSON.parse(JSON.stringify(cspell.ignoreWords));
		const flagWords = JSON.parse(JSON.stringify(cspell.flagWords));

		// cspell.json to lower case
		cspell.words = cspell.words.map(word => word.toLowerCase());
		cspell.ignoreWords = cspell.ignoreWords.map(word => word.toLowerCase());

		// sort cspell.json by alphabetically order
		cspell.words.sort();
		cspell.ignoreWords.sort();
		cspell.flagWords.sort();

		if (
			!words.every((value, index) => value === cspell.words[index]) ||
			!ignoreWords.every((value, index) => value === cspell.ignoreWords[index]) ||
			!flagWords.every((value, index) => value === cspell.flagWords[index])
		) {
			changed = true;
		}

		if (changed === true) {
			// save cspell.json
			jetpack.write(cspellPath, cspell, {jsonIndent: 4, atomic: true});
		}
	}

	/** @type {Array<string>} */
	let errors = [];

	let command = `npx cspell --show-context --show-suggestions --gitignore --color "**/*.{js,md}"`;

	if (files === undefined && changed === true) {
		let changedFiles = parser.changedFiles();
		if (changedFiles !== null) {
			// only change files
			let filesToCheck = changedFiles;
			// filter out any files that are not JavaScript or markdown files
			filesToCheck = filesToCheck.filter(file => file.endsWith(".js") || file.endsWith(".md"));
			// if no files return errors
			if (filesToCheck.length === 0) {
				console.log("Only checking changed files compared to pregmodfan/fc-pregmod");
				return errors;
			}
			command = `npx cspell --show-context --show-suggestions --gitignore --color "${filesToCheck.join('" "')}"`;
		} else {
			// There are no changed files. Return an empty array
			return [];
		}
	} else if (files !== undefined) {
		// make sure files is an array of strings
		if (Object.prototype.toString.call(files) !== '[object Array]' || files.every(i => typeof i !== "string")) {
			throw new Error("files must be an array of strings or undefined");
		}
		command = `npx cspell --show-context --show-suggestions --gitignore --color "${files.join('" "')}"`;
	}

	if (files === undefined && changed === false) {
		console.log("Running cSpell on all files, this may take a while...");
	} else if (files === undefined) {
		console.log("Running cSpell on changed files compared to pregmodfan/fc-pregmod");
	} else {
		console.log(`Running cSpell on ${files.length} file(s)`);
	}

	// cSpell will error if there are any misspelled words
	let result = "";
	try {
		result = execSync(command, {maxBuffer: 1024 * 1024 * 1024}).toString();
	} catch (e) {
		e.output.forEach(out => {
			if (out === null) { return; }
			result += "\n" + out.toString();
		});
	}

	errors = result.split("\n").filter(
		line => stripAnsi(line.trim()).startsWith(".")
	);

	// remove duplicates from errors
	errors = [...new Set(errors)];

	if (changed === true) {
		const changedLines = parser.changedLines();

		if (changedLines === null) {
			return errors;
		}

		errors = errors.filter(error => {
			let cleanError = stripAnsi(error);
			// filter out errors for unchanged lines
			// file path is from the start of the line to :
			let file = cleanError.match(/^[^:]+/)[0].slice(2);
			if (file in changedLines) {
				// line is from first : to second :
				let lineNumber = cleanError.split(":")[1];
				if (lineNumber in changedLines[file]) {
					return true;
				}
			}
			return false;
		});
	}

	return errors;
}

// @ts-ignore
const pathToThisFile = resolve(fileURLToPath(import.meta.url));
const pathPassedToNode = resolve(process.argv[1]);

if (pathToThisFile.includes(pathPassedToNode)) {
	const initializedParser = detectChanges;
	const report = spellingChecks(args.changed, undefined, initializedParser);
	if (report.length > 0) {
		console.log("");
		console.log(report.join("\n"));
		console.log("");
		console.log(`cSpell found ${report.length} issues.`);
	} else {
		console.log("");
		console.log("cSpell found no issues.");
	}
}

export default spellingChecks;
