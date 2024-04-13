// @ts-ignore
import jetpack from 'fs-jetpack';
import {ESLint} from "eslint";
import yargs from "yargs";
import {hideBin} from "yargs/helpers";
import {execSync} from 'child_process';
import stripAnsi from "strip-ansi";
// @ts-ignore
import c from "ansi-colors";

import customChecks from "./customChecks.js";
import spellingChecks from "./spellingChecks.js";
import eslintChecks from "./eslintChecks.js";
import typescriptChecks from "./typescriptChecks.js";
import parser from './detectChanges.js';

// TODO:@franklygeorge flags to selectively run parts of the sanity check. After you add those change the commands in package.json to use them

const args = yargs(hideBin(process.argv))
	.showHelpOnFail(true)
	.option('staged', {
		type: 'boolean',
		description: 'Only check staged files',
		default: false,
	})
	.option('interaction', {
		type: 'boolean',
		description: 'Used by scripts to let the sanity checker know that user interaction is not possible.',
		default: true,
	})
	.parse();

// make sure settings.json exists and has all the required properties
execSync("node devTools/scripts/setup.js --settings");

// load settings.json
/** @type {import("./setup.js").Settings} */
const settings = jetpack.read("settings.json", "json");

// move old log to sanityCheck.log.bak
if (jetpack.exists("sanityCheck.log") === "file") {
	jetpack.move("sanityCheck.log", "sanityCheck.log.bak", {overwrite: true});
}

// write new log starting with the current date and time
jetpack.write("sanityCheck.log", new Date().toLocaleString() + "\n\n", {atomic: true});

/**
 * Adds a message to the log file, also prints the message to the console by default
 * @param {string} message message to log
 * @param {boolean} [print] if true (default) then print message to console
 */
function log(message, print = true) {
	if (print === true) {
		console.log(message);
	}
	// if message doesn't end with `\n` then add it
	if (message.trimEnd() === message) {
		message += "\n";
	}
	// strip color codes and save to log file
	jetpack.append("sanityCheck.log", stripAnsi(message));
}

const eslint = new ESLint({
	cache: true,
	cacheStrategy: "content"
});

/** @type {Array<string>} */
let customProblems = [];
/** @type {Array<string>} */
let spellingProblems = [];
/** @type {Array<object>} */
let eslintProblems = [];
let eslintProblemCount = 0;
/** @type {Array<string>} */
let typescriptProblems = [];

let stagedFiles = undefined;

// add state of staged flag to log
log(`args.staged: ${args.staged}`, false);

if (args.staged === true) {
	// get staged files
	stagedFiles = parser.stagedFiles();
	if (stagedFiles === null) {
		stagedFiles = undefined;
	}
}

if (stagedFiles !== undefined) {
	// if no files in stagedFiles
	if (stagedFiles.length === 0) {
		log("No staged files found for processing!");
		process.exit(2);
	}
	// add list of staged files to log
	log(`staged files: ${JSON.stringify(stagedFiles, undefined, "\t")}`, false);
}

if (settings.checksEnableCustom === true) {
	customProblems = customChecks(settings.checksOnlyChangedCustom, stagedFiles, parser);
}
if (settings.checksEnableSpelling === true) {
	spellingProblems = spellingChecks(settings.checksOnlyChangedSpelling, stagedFiles, parser);
}
if (settings.checksEnableESLint === true) {
	// @ts-ignore
	eslintProblems = await eslintChecks(settings.checksOnlyChangedESLint, stagedFiles, parser);
	eslintProblems.forEach(problem => {
		eslintProblemCount += problem.messages.length;
	});
}
if (settings.checksEnableTypescript === true) {
	// @ts-ignore
	typescriptProblems = typescriptChecks(settings.checksOnlyChangedTypescript, stagedFiles, parser);
}

if (customProblems.length > 0) {
	log("=".repeat(20) + "Custom problems" + "=".repeat(20));
	log("");
	log(customProblems.join("\n"));
}
if (spellingProblems.length > 0) {
	log("=".repeat(20) + "Spelling problems" + "=".repeat(20));
	log("");
	log(spellingProblems.join("\n"));
}
if (eslintProblems.length > 0) {
	log("=".repeat(20) + "JavaScript linting problems" + "=".repeat(20));
	log("");
	// @ts-ignore
	const formatter = await eslint.loadFormatter("stylish");
	// @ts-ignore
	const reportText = await formatter.format(eslintProblems);
	log(reportText);
}
if (typescriptProblems.length > 0) {
	log("=".repeat(20) + "JavaScript type problems" + "=".repeat(20));
	log("");
	log(typescriptProblems.join("\n"));
}

log("=".repeat(60));

let skippedChecks = 0;

if (customProblems.length > 0) {
	log(c.bold.red(`Custom sanity checks found ${customProblems.length} issues.`));
} else if (settings.checksEnableCustom === true) {
	log(c.green("Custom sanity checks found no issues."));
} else {
	log(c.yellow("Custom sanity checks are currently disabled."));
	skippedChecks += 1;
}

if (spellingProblems.length > 0) {
	log(c.bold.red(`cSpell found ${spellingProblems.length} spelling issues.`));
} else if (settings.checksEnableSpelling === true) {
	log(c.green("cSpell found no spelling issues."));
} else {
	log(c.yellow("Spelling checks using cSpell are currently disabled."));
	skippedChecks += 1;
}

if (eslintProblemCount > 0) {
	log(c.bold.red(`ESLint found ${eslintProblemCount} linting issues.`));
} else if (settings.checksEnableESLint === true) {
	log(c.green(`ESLint found no linting issues.`));
} else {
	log(c.yellow("Linting using ESLint is currently disabled."));
	skippedChecks += 1;
}

if (typescriptProblems.length > 0) {
	log(c.bold.red(`The TypeScript compiler found ${typescriptProblems.length} type issues.`));
} else if (settings.checksEnableTypescript === true) {
	log(c.green(`The Typescript compiler found no type issues.`));
} else {
	log(c.yellow("Type checking using the Typescript compiler is currently disabled."));
	skippedChecks += 1;
}

const issueCount = customProblems.length + spellingProblems.length + eslintProblemCount + typescriptProblems.length;

log("");
let finalMessage = "";
if (issueCount > 0) {
	finalMessage = c.bold.red(`${issueCount}`) + " issues found.";
} else {
	finalMessage = c.green("No issues found.");
}
if (skippedChecks > 0) {
	finalMessage += ` ${c.yellow(skippedChecks)} sanity checker${(skippedChecks > 1) ? "s" : ""} disabled.`;
} else {
	finalMessage += c.green(" No sanity checkers disabled.");
}
log(finalMessage);

log("=".repeat(60));

// exclude eslint and typescript problems from making git pre-commit hook fail
// we may change this in the future
if ((issueCount - (eslintProblemCount + typescriptProblems.length)) > 0) {
	if (args.staged === true) {
		log(`You can temporarily disable the pre-commit hook by changing 'Edit Sanity Check Settings' -> 'Running sanity checks before commiting' in "setup.${process.platform === "win32" ? "bat": "sh"}" to 'Sanity checks are temporarily disabled...'`);
	}
	process.exit(1);
}
