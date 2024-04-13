/**
 * @file Checks JavaScript files for type errors
 * Only checks .js files
 *
 * Can be called from the command line
 *
 * node devTools/scripts/typescriptChecks.js
 * node devTools/scripts/typescriptChecks.js --changed
 *
 * Or imported as shown below
 *
 * import typescriptChecks from './typescriptChecks.js';
 * const changed = false;
 * /** @type{Array<string>} *\/
 * const report = typescriptChecks(changed);
 */

import detectChanges from './detectChanges.js';

import {execSync} from 'child_process';
import yargs from "yargs";
import {hideBin} from "yargs/helpers";
import {resolve} from 'path';
import {fileURLToPath} from 'url';
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
 * Runs the typescript compiler on files
 * @param {boolean} changed If true, only check changed files. If false, check all files.
 * @param {string[]} files If provided we will sent this list of files to the extra checks instead
 * @param {detectChanges} parser If provided it will be used instead of the default parser
 * @returns {Array<string>}
 */
function typescriptChecks(changed = false, files = undefined, parser = detectChanges) {
	if (files !== undefined) {
		// make sure files is an array of strings
		if (Object.prototype.toString.call(files) !== '[object Array]' || files.every(i => typeof i !== "string")) {
			throw new Error("files must be an array of strings or undefined");
		}
	}

	/** @type {Array<string>} */
	let errors = [];

	let command = `npx tsc`;

	console.log("Running the TypeScript compiler, this will take a while...");

	// the TypeScript compiler will error if there are any issues
	let result = "";
	try {
		result = execSync(command, {maxBuffer: 1024 * 1024 * 1024}).toString();
	} catch (e) {
		e.output.forEach(out => {
			if (out === null) { return; }
			result += "\n" + out.toString();
		});
	}

	// for each line
	// if line contains 2 or more ": " then it is the start of an issue
	// it and all of the lines up to the next 2x ": " line should be part of the same error message
	// issue example: src/player/js/enslavePlayer.js(129,15): error TS2339: Property 'rumor' does not exist on type 'SlaveState'.
	let lastError = "";

	result.split("\n").forEach(line => {
		line = stripAnsi(line).trimEnd();
		if (line !== "") {
			let count = line.match(/: /g);
			if (count !== null && count.length >= 2) {
				if (lastError !== "") {
					errors.push(lastError);
				}
				lastError = line;
			} else {
				lastError += "\n" + line;
			}
		}
	});

	// remove duplicates from errors
	errors = [...new Set(errors)];

	if (changed === true) {
		if (files === undefined) {
			files = [];
		}
		const changedLines = parser.changedLines();

		if (changedLines === null) {
			return errors;
		}

		// issue example: src/player/js/enslavePlayer.js(129,15): error TS2339: Property 'rumor' does not exist on type 'SlaveState'.
		errors = errors.filter(error => {
			// filter out errors for unchanged lines
			// file path is from the start of the line to (
			let file = error.match(/^[^\\(]+/)[0];
			if (file in changedLines) {
				// line number and column is from first ( to first ,
				let lineNumber = error.split("(")[1].split(",")[0];
				if (lineNumber in changedLines[file]) {
					return true;
				}
			} else if (file in files) {
				// I don't think it is actually possible to get here because of how git handles staged and changed files
				// but better safe then sorry
				return true;
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
	const report = typescriptChecks(args.changed, undefined, initializedParser);
	if (report.length > 0) {
		console.log("");
		console.log(report.join("\n"));
		console.log("");
		console.log(`The TypeScript compiler found ${report.length} issues.`);
	} else {
		console.log("");
		console.log("The TypeScript compiler found no issues.");
	}
}

export default typescriptChecks;
