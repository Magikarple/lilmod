/**
 * @file Lints files using ESLint
 *
 * Can be called from the command line
 *
 * node devTools/scripts/eslintChecks.js
 * node devTools/scripts/eslintChecks.js --changed
 *
 * Or imported as shown below
 *
 * import eslintChecks from './eslintChecks.js';
 * const changed = false;
 * /** @type{object[]} *\/
 * const report = await eslintChecks(changed);
 */

import detectChanges from './detectChanges.js';

import yargs from "yargs";
import {hideBin} from "yargs/helpers";
import {resolve} from 'path';
import {fileURLToPath} from 'url';
import {ESLint} from "eslint";
// @ts-ignore
import path from "path";

const args = yargs(hideBin(process.argv))
	.showHelpOnFail(true)
	.option('changed', {
		type: 'boolean',
		description: 'Only check changed files',
		default: false,
	})
	.parse();

const eslint = new ESLint({
	cache: true,
	cacheStrategy: "content"
});

/**
 * Runs ESLint on files
 * @param {boolean} changed If true, only check changed files. If false, check all files.
 * @param {string[]} files If provided we will sent this list of files to ESLint instead
 * @param {detectChanges} parser If provided it will be used instead of the default parser
 * @returns {Promise<object[]>}
 */
async function eslintChecks(changed = false, files = undefined, parser = detectChanges) {
	let results = [];

	try {
		let filesToLint = ["**/*.js"];

		if (files === undefined && changed === true) {
			let changedFiles = parser.changedFiles();
			if (changedFiles !== null) {
				filesToLint = changedFiles.filter(file => file.endsWith(".js"));
			} else {
				// There are no changed files. Return an empty array
				return [];
			}
		} else if (files !== undefined) {
			// make sure files is an array of strings
			if (Object.prototype.toString.call(files) !== '[object Array]' || files.every(i => typeof i !== "string")) {
				throw new Error("files must be an array of strings or undefined");
			}
			filesToLint = files.filter(file => file.endsWith(".js"));
		}
		if (files === undefined && changed === false) {
			console.log("If this is the first time you have ran ESLint on all files, then this will take a while...");
		} else if (files === undefined) {
			console.log("Running ESLint on changed files compared to pregmodfan/fc-pregmod");
		} else {
			console.log(`Running ESLint on ${files.length} file(s)`);
		}
		const ESLintResults = await eslint.lintFiles(filesToLint);

		const formatter = await eslint.loadFormatter("json");
		results = JSON.parse(await formatter.format(ESLintResults));
	} catch (e) {
		console.error(e);
		process.exit(1);
	}

	// If changed filter out line numbers that were not edited
	if (changed === true) {
		const changedLines = parser.changedLines();

		if (changedLines === null) {
			// remove any result that has an empty messages array and return
			return results.filter(result => result.messages.length > 0);
		}

		const originalResults = JSON.parse(JSON.stringify(results));

		results = [];

		Object.keys(originalResults).forEach(resultKey => {
			/** @type {object} */
			let result = originalResults[resultKey];
			const filePath = path.relative(process.cwd(), result.filePath).replace(/\\/g, "/");
			if (Object.keys(changedLines).includes(filePath)) {
				const changedLineNumbers = changedLines[filePath];
				const originalMessages = JSON.parse(JSON.stringify(result.messages));
				result.messages = [];
				originalMessages.forEach(message => {
					// if changedLineNumbers is not between message.line and message.endLine
					changedLineNumbers.forEach(lineNo => {
						if (
							lineNo >= message.line &&
							lineNo <= message.endLine
						) {
							// Keep this one
							message.path = filePath;
							result.messages.push(message);
						}
					});
				});
				results.push(result);
			}
		});
	}

	// remove any result that has an empty messages array and return
	return results.filter(result => result.messages.length > 0);
}

// @ts-ignore
const pathToThisFile = resolve(fileURLToPath(import.meta.url));
const pathPassedToNode = resolve(process.argv[1]);

if (pathToThisFile.includes(pathPassedToNode)) {
	const initializedParser = detectChanges;
	// @ts-ignore
	const report = await eslintChecks(args.changed, undefined, initializedParser);
	// parse report using eslint
	// @ts-ignore
	const formatter = await eslint.loadFormatter("stylish");
	const reportText = formatter.format(report);
	console.log(reportText);
}

export default eslintChecks;
