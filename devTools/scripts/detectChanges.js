/**
 * @file returns changes to the project's files. can return files changed or which lines have been changed.
 *
 * Can be called from the command line
 *
 * node devTools/scripts/detectChanges.js
 * node devTools/scripts/detectChanges.js --lines
 *
 * Or imported as shown below
 *
 * import parser from './detectChanges.js';
 * const changedFiles = parser.changedFiles();
 * const changedLines = parser.changedLines();
 */

// cSpell:ignore ACMR

import {execSync} from 'child_process';
// @ts-ignore
import jetpack from 'fs-jetpack';
import yargs from "yargs";
import {hideBin} from "yargs/helpers";
import {resolve} from 'path';
import {fileURLToPath} from 'url';

const args = yargs(hideBin(process.argv))
	.showHelpOnFail(true)
	.option('lines', {
		type: 'boolean',
		description: 'Returns list of lines changed',
		default: false,
	})
	.parse();

/**
 * An object that contains file paths as keys and a list of numbers as values
 * @typedef {{[key: string]: Array<number>}} ChangedLines
 */

/**
 * Detects file changes
 * @class
 */
class ChangeParser {
	/** @type {string} */
	branchName;
	/** @type {string} */
	mergeCommit;

	/**
	 * Gets the current branch name and the merge commit that the branch was created with and set this.branchName and this.mergeCommit to them
	 * @returns {boolean} false if we are on the "pregmod-master" branch, true otherwise
	 */
	setMergeCommitAndBranchName() {
		if (typeof this.branchName === 'string' && typeof this.mergeCommit === 'string') {
			return true;
		}

		const branchNameCommand = "git rev-parse --abbrev-ref HEAD";
		const branchName = execSync(branchNameCommand).toString().trim();

		const commitLogCommand = `git reflog show --no-abbrev ${branchName}`;
		const commitLog = execSync(commitLogCommand).toString().trim().split("\n");

		const mergeCommit = commitLog[commitLog.length - 1].trim().split(" ")[0].trim();

		if (branchName === "pregmod-master") {
			// we cannot detect changes, fall back to checking all files
			console.log(`Cannot check for changed files on the "pregmod-master" branch, please use a different branch`);
			this.branchName = null;
			this.mergeCommit = null;
			return false;
		} else {
			console.log(`Comparing changes on branch "${branchName}" since commit "${mergeCommit}"`);
			this.branchName = branchName;
			this.mergeCommit = mergeCommit;
			return true;
		}
	}
	/**
	 * Filters paths and removes anything that is not a file. Fixes a really obscure bug where git returns a directory
	 * and jetpack chokes on it when it tries to read it as a file.
	 * @param {string[]} paths list of paths to filter
	 * @returns {string[]} list of filtered paths
	 */
	filterFiles(paths) {
		return paths.filter(path => {
			return path.trim() !== "" && jetpack.exists(path) === "file";
		});
	}

	/**
	 * Returns the number of lines in the file.
	 * @param {string} filePath path to the file to count lines
	 * @returns {number} number of lines in the file
	 */
	countFileLines(filePath){
		return jetpack.read(filePath, "utf8").split('\n').length;
	}

	/**
	 * Returns a list of files that are not tracked by git and are not in .gitignore
	 * @returns {Array<string>}
	 */
	getUntrackedFiles() {
		const command = "git ls-files -o --exclude-standard .";
		let result = execSync(command).toString().trim().split('\n');

		if (result !== undefined) {
			return this.filterFiles(result.filter(file => file!== ""));
		} else {
			return [];
		}
	}

	/**
	 * Returns a list of files that are staged for a git commit
	 * @returns {string[]}
	 */
	stagedFiles() {
		let command = "git diff --name-only --cached --diff-filter=ACMR";
		return this.filterFiles(
			execSync(command).toString().trim().split('\n')
		);
	}

	/**
	 * Returns a list of files that have been changed.
	 * If the current branch is "pregmod-master", returns null, otherwise returns changed files
	 * @returns {string[]|null}
	 */
	changedFiles() {
		if (!this.setMergeCommitAndBranchName()) {
			return null;
		}

		const command = `git diff --name-only --diff-filter=d ${this.mergeCommit}`;
		let result = execSync(command).toString().trim().split('\n');

		// add result and this.getUntrackedFiles() together and return
		return this.filterFiles(result.concat(this.getUntrackedFiles()));
	}

	/**
	 * Returns a json object of files with their changed lines.
	 * If the current branch is "pregmod-master", returns null, otherwise returns changed lines
	 * @returns {ChangedLines|null}
	 */
	changedLines() {
		/** @type {ChangedLines} */
		let changed = {};

		const untracked = this.getUntrackedFiles();

		let changedFiles = this.changedFiles();

		if (changedFiles === null) {
			return null;
		}

		for (const file of changedFiles) {
			changed[file] = [];
			if (untracked.includes(file)) {
				// add all lines to changed[file]
				for (let i = 1; i <= this.countFileLines(file); i++) {
					changed[file].push(i);
				}
			} else {
				const command = `git diff -U${this.countFileLines(file)} ${this.mergeCommit} -- ${file}`;
				/** @type {Array<string>} */
				try {
					let result = execSync(command).toString().trim().split('\n');

					// remove first two lines
					result = result.slice(2);
					// remove all lines starting with ---, +++, or @@
					result = result.filter(line => !line.startsWith("---") && !line.startsWith("+++") && !line.startsWith("@@"));
					// remove all lines starting with -
					result = result.filter(line => !line.startsWith("-"));
					let lineNo = 0;
					// for each line
					result.forEach(line => {
						lineNo += 1;
						// if line starts with + add line number to changed lines
						if (line.startsWith("+")) {
							changed[file].push(lineNo);
						}
					});
				} catch {
					// git fails with a `Circular *1` error sometimes on merge commits
				}
			}
		}

		return changed;
	}
}

const parser = new ChangeParser();

// @ts-ignore
const pathToThisFile = resolve(fileURLToPath(import.meta.url));
const pathPassedToNode = resolve(process.argv[1]);

if (pathToThisFile.includes(pathPassedToNode)) {
	// called via console
	if (args.lines === true) {
		// get changed lines
		const changed = parser.changedLines();
		// for each file in changed
		for (const file in changed) {
			// for each line in the file
			for (const line of changed[file]) {
				console.log(`${file}, line ${line}`);
			}
		}
	} else {
		// get changed files and print them
		console.log(parser.changedFiles().join("\n"));
	}
}

export default parser;
