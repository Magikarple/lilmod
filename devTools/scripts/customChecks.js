/**
 * @file This ports the non twine sanity checks from sanityCheck.sh into JavaScript.
 * Only checks .js and .md files
 *
 * Can be called from the command line
 *
 * node devTools/scripts/customChecks.js
 * node devTools/scripts/customChecks.js --changed
 *
 * Or imported as shown below
 *
 * import customChecks from './customChecks.js';
 * const changed = false;
 * /** @type{Array<string>} *\/
 * const report = customChecks(changed);
 */

// This file uses Regex for a lot of its checks.
// A great resource for Regex is here: https://regex101.com/

import detectChanges from './detectChanges.js';

// @ts-ignore
import jetpack from 'fs-jetpack';
import yargs from "yargs";
import {hideBin} from "yargs/helpers";
import {resolve} from 'path';
import {fileURLToPath} from 'url';
import indefinite from "indefinite";
// @ts-ignore
import path from "path";

const ignoredPaths = [
	"js/001-lib/",
	"src/001-lib/"
]
	.map((entry) => entry.replace(/\//g, path.sep));

const customArticles = [
	// list of words with their articles. If the article used doesn't match this list, return an error
	// unlisted words are sent to indefinite (https://www.npmjs.com/package/indefinite) for checking
	// a word can be listed with both articles
	// all entries will be matched by exact case (except for the first letter)
	// "A house" and "a house" are the same; but "a House" and "a house" are different
	"a FCTV",
	"a MILF",
	"a SHIT",
	"a MUCH",
	"a span",
	"a html",
	"a HTML",
]
	.map((entry) => entry.slice(0, 1).toLowerCase() + entry.slice(1));

/**
 * @typedef {object} LineObject
 * @property {string} line
 * @property {number} lineNumber
 */

const args = yargs(hideBin(process.argv))
	.showHelpOnFail(true)
	.option('changed', {
		type: 'boolean',
		description: 'Only check changed files',
		default: false,
	})
	.parse();

/**
 * Runs custom sanity checks of files
 * @param {boolean} changed If true, only check changed files. If false, check all files.
 * @param {string[]} files If provided we will sent this list of files to the custom checks instead
 * @param {detectChanges} parser If provided it will be used instead of the default parser
 * @returns {Array<string>}
 */
function customChecks(changed = false, files = undefined, parser = detectChanges) {
	/** @type {Array<string>} */
	let errors = [];

	/** @type {Array<string>} */
	let filesToCheck = [];

	if (files === undefined && changed === true) {
		// get list of changed files
		let changedFiles = parser.changedFiles();
		if (changedFiles !== null) {
			filesToCheck = changedFiles.filter(file => (
				file.endsWith(".js") ||
				file.endsWith(".md")
			));
		} else {
			// There are no changed files. Return an empty array
			return [];
		}
	} else if (files !== undefined) {
		// make sure files is an array of strings
		if (Object.prototype.toString.call(files) !== '[object Array]' || files.every(i => typeof i !== "string")) {
			throw new Error("files must be an array of strings or undefined");
		}
		filesToCheck = files;
	} else {
		// get list of all JavaScript and markdown files
		filesToCheck = jetpack.find(".", {matching: "*.{js,md}"});
	}

	// filter out ignored paths
	filesToCheck = filesToCheck.filter(file => {
		let ignored = false;
		// for path in ignoredPaths
		ignoredPaths.forEach(ignoredPath => {
			if (file.startsWith(ignoredPath)) {
				ignored = true;
			}
		});
		return !ignored;
	});

	if (files === undefined && changed === true) {
		console.log("Running custom sanity checks on changed files compared to pregmodfan/fc-pregmod");
	} else if (files === undefined) {
		console.log("Running custom sanity checks on all files");
	} else {
		console.log(`Running custom sanity checks on ${files.length} file(s)`);
	}

	// filter out any files not in js/ or src/
	filesToCheck = filesToCheck.filter(file => file.startsWith("js") || file.startsWith("src"));

	filesToCheck.forEach(file => {
		/** @type {string} */
		const content = jetpack.read(file, "utf8");

		if (content === undefined) {
			// skip file
			return;
		}

		content.split("\n").forEach((line, index) => {
			const lineNumber = index +1;
			// TODO:@franklygeorge ignoring lines based off comments
			// TODO:@franklygeorge prettier/more readable error messages

			// Raises an error if @@color: is found in the line
			if (line.includes("@@color:") && !line.includes("@@color:rgb(")) {
				errors.push(
					`"Invalid color code. Should be @@.[color], @@.red for example." at .${path.sep}${file}:${lineNumber}`
				);
			}

			// Raises an error if there is punctuation following a </span>
			if (line.match(/<\/span>(\.|,|;|:)/) !== null) {
				errors.push(
					`"</span> should have punctuation in front of it not behind it" at .${path.sep}${file}:${lineNumber}`
				);
			}

			// Raises an error if there is a class="something" without any quotation marks
			// invalid: class=something || class=something"
			// valid: class="something"
			if (line.match(/<.+class=[^\\"']/) !== null) {
				errors.push(
					`"Missing quotation marks around class selector" at .${path.sep}${file}:${lineNumber}`
				);
			}

			// Raises an error if a word exists twice in a row
			// invalid: word word || a a || you you || on on
			// valid: word words || let t || you you're || strap-on on
			let duplicateWordList = line.match(/(^|\s)([a-zA-Z]+)\s\2(\s|$)/g);

			// remove duplicates from list
			// @ts-expect-error invalid typescript error message
			duplicateWordList = [...new Set(duplicateWordList)];

			if (duplicateWordList !== null) {
				duplicateWordList.forEach((group) => {
					if (group === undefined || group === null || group === "") { return; }

					const groupLower = group.trim().toLowerCase();

					if (groupLower !== "in in") {
						errors.push(`"Duplicate words" at .${path.sep}${file}:${lineNumber}`);
					}
				});
			}

			// Checks for a letter that repeats twice, with some exceptions
			// invalid: aa || ee || ll
			// valid: ann || cc || mm || xx || II
			// skips any line that starts with "for ", "if ", "else ", and "let "
			const doubleLetterList = line.match(/(\s|^)([a-zA-Z])\2\b(\s|\n|$)/g);

			if (doubleLetterList !== null) {
				doubleLetterList.forEach((group) => {
					const groupLower = group.trim().toLowerCase();

					if (
						groupLower.length === 2 &&
						groupLower !== "cc" && groupLower !== "mm" && groupLower !== "xx" &&
						group.trim() !== "II" &&
						!line.startsWith("for ") && !line.startsWith("if ") &&
						!line.startsWith("else ") && !line.startsWith("let ")
					) {
						errors.push(`"Double letters" at .${path.sep}${file}:${lineNumber}`);
					}
				});
			}

			// Raises an error if "a an" or "an a" exists in the line
			if (line.toLowerCase().match(/(^|\s|\n)(a an|an a)($|\s|\n)/g) !== null) {
				errors.push(`"Double articles" at .${path.sep}${file}:${lineNumber}`);
			}

			// Raises an error if the article is potentially incorrect for the word following it
			// Uses customArticles and indefinite (https://www.npmjs.com/package/indefinite) for checking
			const articleWords = line.match(/(^|\s)(a|an) \w+/g);

			if (articleWords!== null) {
				articleWords.forEach((wordWithAAn) => {
					wordWithAAn = wordWithAAn.trim();

					const wordWithAAnLowerFirst = wordWithAAn.slice(0, 1).toLowerCase() + wordWithAAn.slice(1);
					const word = wordWithAAn.replace(/(^|\s)(a|an) /, "").trim();
					const aAn = wordWithAAn.replace(word, "").trim();

					if (
						aAn === "" || word === null || word === undefined || word.length < 2 ||
						customArticles.indexOf(wordWithAAnLowerFirst) !== -1
					) {
						// do nothing
					} else if (wordWithAAnLowerFirst !== indefinite(word)) {
						errors.push(`"Potentially incorrect article" at .${path.sep}${file}:${lineNumber}`);
					}
				});
			}

			// Raises an error if the line has a word that has a dollar sign in it
			// invalid: b$dding
			// valid: $bidding || bidding$
			if (line.match(/\w\$\w/) !== null) {
				errors.push(`"Mid-word $" at .${path.sep}${file}:${lineNumber}`);
			}
		});
	});

	// remove duplicates from errors
	errors = [...new Set(errors)];

	if (changed === true) {
		const changedLines = parser.changedLines();

		if (changedLines === null) {
			return errors;
		}

		errors = errors.filter(error => {
			// filter out errors for unchanged lines
			// file path is between ` at .${path.sep}` and ":"
			let file = error.match(/\.(\\|\/)\S+?:/)[0].replace("." + path.sep, "").replace(":", "");
			if (file in changedLines) {
				// line is from ":" to the end of the line and is only digits
				let lineNumber = error.match(/\d+?$/)[0];
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
	const report = customChecks(args.changed, undefined, initializedParser);
	if (report.length > 0) {
		console.log("");
		console.log(report.join("\n"));
		console.log("");
		console.log(`Custom sanity checks found ${report.length} issues.`);
	} else {
		console.log("");
		console.log("No custom sanity check issues found.");
	}
}

export default customChecks;
