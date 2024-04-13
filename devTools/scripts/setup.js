/**
 * @file Creates a menu to manage settings for the compiler and sanity checks
 */

// cSpell:words list
// cSpell:ignore fchost

import yargs from "yargs";
import {hideBin} from "yargs/helpers";
// @ts-ignore
import jetpack from "fs-jetpack";
import inquirer from 'inquirer';

const args = yargs(hideBin(process.argv))
	.showHelpOnFail(true)
	.option('settings', {
		type: 'boolean',
		description: 'Creates/Updates settings.json and then exits',
		default: false,
	})
	.parse();

const separatorString = "-".repeat(78);

// default settings
/**
 * @typedef {object} Settings
 * @property {-1|0|1} manageNodePackages -1 = do not ask, 0 = ask, 1 = auto install
 * @property {"simple"|"advanced"} compilerMode
 * @property {boolean} compilerWaitOnWindows Wait for user input before closing bat files on Windows.
 * @property {1|2|3|4|5|6} compilerVerbosity
 * @property {boolean} compileThemes If true then tell the advanced compiler to compile themes
 * @property {boolean} compilerSourcemaps If true then tell the advanced compiler to add sourcemaps (don't add the release flag)
 * @property {boolean} compilerMinify If true then tell the advanced compiler to minify the build
 * @property {boolean} compilerAddDebugFiles If true then tell the advanced compiler to add files matching *.debug.* to the build
 * @property {boolean} compilerFilenameHash If true then tell the advanced compiler to add the git commit hash to the filename
 * @property {boolean} compilerFilenameEpoch If true then tell the advanced compiler to add the current epoch to the filename
 * @property {boolean} compilerFilenamePmodVersion If true then tell the advanced compiler to add the current pmod version to the filename
 * @property {0|1|2} compilerRunSanityChecks 0 = Do not run sanity checks during compiling, 1 = Run before compiling, 2 = Run after compiling
 * @property {boolean} compilerCopyToFCHost If true copy files from "bin" to settings.FCHostPath
 * @property {boolean} compilerFinishedNotification if true then we send a notification before exiting the compiler
 * @property {boolean} checksEnableCustom If true then we will run Extra sanity checks
 * @property {boolean} checksOnlyChangedCustom If true then we will only check changed lines
 * @property {boolean} checksEnableSpelling If true then we will run Spelling checks
 * @property {boolean} checksOnlyChangedSpelling If true then we will only check changed lines
 * @property {boolean} checksEnableESLint If true then we will run ESLint checks
 * @property {boolean} checksOnlyChangedESLint If true then we will only check changed lines
 * @property {boolean} checksEnableTypescript If true then we will run Typescript checks
 * @property {boolean} checksOnlyChangedTypescript If true then we will only check changed lines
 * @property {-1|0|1} precommitHookEnabled 0 = Disabled, 1 = Enabled, -1 = temporarily disabled
 * @property {string} FCHostPath Path to FCHost's directory
 * @property {boolean} WatcherLiveReload If true then the watcher will trigger a live reload of FC each time it gets re-compiled
 */

// TODO:@franklygeorge Do we want an extensions.json file for VSCode?
// TODO:@franklygeorge Figure out why setup.[bat,sh] is slow to start (~5 seconds). Probably affects compile.[bat,sh] and sanityCheck.[bat,sh] as well
// TODO:@franklygeorge Search for todo's with @franklygeorge in them and complete them

/** @type {Settings} */
const settings = {
	manageNodePackages: 0,
	compilerMode: "advanced",
	compilerWaitOnWindows: true,
	compilerVerbosity: 6,
	compileThemes: true,
	compilerSourcemaps: true,
	compilerMinify: false,
	compilerAddDebugFiles: true,
	compilerFilenameHash: false,
	compilerFilenameEpoch: false,
	compilerFilenamePmodVersion: false,
	compilerRunSanityChecks: 0,
	compilerCopyToFCHost: true,
	compilerFinishedNotification: true,
	checksEnableCustom: true,
	checksOnlyChangedCustom: true,
	checksEnableSpelling: true,
	checksOnlyChangedSpelling: true,
	checksEnableESLint: true,
	checksOnlyChangedESLint: true,
	checksEnableTypescript: false,
	checksOnlyChangedTypescript: true,
	precommitHookEnabled: 1,
	FCHostPath: "FCHost/fchost/Release",
	WatcherLiveReload: false,
};

// create settings.json if it doesn't exist
if (jetpack.exists("settings.json") !== "file") {
	jetpack.write("settings.json", settings, {atomic: true});
}

// load settings from settings.json
let settingsChanged = false;
const settingsJson = jetpack.read("settings.json", "json");
for (let [key, value] of Object.entries(settings)) {
	if (!(key in settingsJson)) {
		// @ts-ignore
		settings[key] = value;
		settingsChanged = true;
	} else if (settingsJson[key] !== value) {
		if (typeof settingsJson[key] !== typeof value) {
			throw new Error(`Invalid type "${typeof settingsJson[key]}" for setting "${key}", expected a "${typeof value}"`);
		}
		// @ts-ignore
		settings[key] = settingsJson[key];
	}
}

// setting migrations
if ("checksEnableExtras" in settings) {
	// @ts-ignore
	// eslint-disable-next-line dot-notation
	settings.checksEnableCustom = settings["checksEnableExtras"];
	// eslint-disable-next-line dot-notation
	delete settings["checksEnableExtras"];
}

if ("checksOnlyChangedExtras" in settings) {
	// @ts-ignore
	// eslint-disable-next-line dot-notation
	settings.checksOnlyChangedCustom = settings["checksOnlyChangedExtras"];
	// eslint-disable-next-line dot-notation
	delete settings["checksOnlyChangedExtras"];
}

if (settingsChanged === true) {
	jetpack.write("settings.json", settings, {atomic: true});
}

if (args.settings === true) {
	process.exit(0);
}

/** @type {Settings} */
let originalSettings = JSON.parse(JSON.stringify(settings));

const strings = {
	compilerMode: () => {
		if (settings.compilerMode === "advanced") {
			return "Using the advanced compiler";
		} else {
			return "Using the simple compiler, change to the advanced compiler for more options";
		}
	},
	compileThemes: () => {
		return (settings.compileThemes
			? "Themes are compiled"
			: "Themes are not compiled"
		);
	},
	compilerSourcemaps: () => {
		return (settings.compilerSourcemaps
			? "Source maps are added, minification is disabled"
			: "Source maps are not added"
		);
	},
	compilerMinify: () => {
		return (settings.compilerMinify
			? "Build is minified"
			: "Build is not minified"
		);
	},
	compilerAddDebugFiles: () => {
		return (settings.compilerAddDebugFiles
			? "Adding *.debug.* files to the build"
			: "Ignoring *.debug.* files"
		);
	},
	compilerFilenameHash: () => {
		return (settings.compilerFilenameHash
			? "Adding the current Git commit hash to the final filename"
			: "Not adding the current Git commit hash to the final filename"
		);
	},
	compilerFilenameEpoch: () => {
		return (settings.compilerFilenameEpoch
			? "Adding the current time to the final filename"
			: "Not adding the current time to the final filename"
		);
	},
	compilerFilenamePmodVersion: () => {
		return (settings.compilerFilenamePmodVersion
			? "Adding the current Pmod version to the final filename"
			: "Not adding the current Pmod version to the final filename"
		);
	},
	compilerVerbosity: () => {
		return `Verbosity level: ${settings.compilerVerbosity}`;
	},
	compilerRunSanityChecks: () => {
		if (settings.compilerRunSanityChecks === 0) {
			return "Not running sanity checks when compiling";
		} else if (settings.compilerRunSanityChecks === 1) {
			return "Running sanity checks before compiling";
		} else {
			return "Running sanity checks after compiling";
		}
	},
	compilerWaitOnWindows: () => {
		return (settings.compilerWaitOnWindows
			? "Waiting for user input before exiting compiler"
			: "Exiting compiler without user input"
		);
	},
	precommitHookEnabled: () => {
		if (settings.precommitHookEnabled === 0) {
			return "Not running sanity checks before commiting";
		} else if (settings.precommitHookEnabled === 1) {
			return "Running sanity checks before commiting";
		} else {
			return "Sanity checks are temporarily disabled and will be re-enabled after the next commit";
		}
	},
	checksEnableCustom: () => {
		return (settings.checksEnableCustom
			? "Custom sanity checks are enabled"
			: "Custom sanity checks are disabled"
		);
	},
	checksEnableSpelling: () => {
		return (settings.checksEnableSpelling
			? "Spelling checks are enabled"
			: "Spelling checks are disabled"
		);
	},
	checksEnableESLint: () => {
		return (settings.checksEnableESLint
			? "JavaScript linting is enabled"
			: "JavaScript linting is disabled"
		);
	},
	checksEnableTypescript: () => {
		return (settings.checksEnableTypescript
			? "JavaScript type checking is enabled"
			: "JavaScript type checking is disabled"
		);
	},
	checksOnlyChangedCustom: () => {
		return (settings.checksOnlyChangedCustom
			? "Custom sanity checks are only reporting problems on changed lines"
			: "Custom sanity checks are reporting all problems"
		);
	},
	checksOnlyChangedSpelling: () => {
		return (settings.checksOnlyChangedSpelling
			? "Spelling checks are only reporting problems on changed lines"
			: "Spelling checks are reporting all problems"
		);
	},
	checksOnlyChangedESLint: () => {
		return (settings.checksOnlyChangedESLint
			? "JavaScript linting is only reporting problems on changed lines"
			: "JavaScript linting is reporting all problems"
		);
	},
	checksOnlyChangedTypescript: () => {
		return (settings.checksOnlyChangedTypescript
			? "JavaScript type checking is only reporting problems on changed lines"
			: "JavaScript type checking is reporting all problems"
		);
	},
	manageNodePackages: () => {
		if (settings.manageNodePackages === -1) {
			return "Ignoring incorrect Node packages";
		} else if (settings.manageNodePackages === 0) {
			return "Asking about incorrect Node packages";
		} else {
			return "Automatically fixing incorrect Node packages";
		}
	},
	WatcherLiveReload: () => {
		return (settings.WatcherLiveReload
			? "Watcher is triggering a live reload on each successful build"
			: "Watcher is not triggering a live reload on each successful build"
		);
	},
	compilerCopyToFCHost: () => {
		return (settings.compilerCopyToFCHost
			? "Copying FC to FCHost's directory after a successful build"
			: "Not copying FC to FCHost's directory"
		);
	},
	compilerFinishedNotification: () => {
		return (settings.compilerFinishedNotification
			? "Sending a notification when the compiler finishes"
			: "Not sending a notification when the compiler finishes"
		);
	},
};

let compilerMenuChoice;

async function compilerSettings() {
	let choices = [];
	choices.push(strings.compilerMode());
	choices.push(new inquirer.Separator(separatorString));
	if (settings.compilerMode === "advanced") {
		choices.push(strings.compileThemes());
		choices.push(strings.compilerSourcemaps());
		if (settings.compilerSourcemaps === false) {
			choices.push(strings.compilerMinify());
		}
		choices.push(strings.compilerAddDebugFiles());
		choices.push(strings.compilerFilenameHash());
		choices.push(strings.compilerFilenameEpoch());
		choices.push(strings.compilerFilenamePmodVersion());
		choices.push(strings.compilerVerbosity());
		choices.push(new inquirer.Separator(separatorString));
		choices.push(strings.compilerFinishedNotification());
		choices.push(strings.compilerRunSanityChecks());
	} else {
		choices.push(strings.compileThemes());
	}
	if (process.platform === "win32") {
		choices.push(strings.compilerWaitOnWindows());
	}

	choices.push("Back");

	await inquirer
		.prompt([{
			type: "rawlist",
			name: "choice",
			message: "Compiler Settings",
			choices: choices,
			default: compilerMenuChoice,
			loop: false,
			pageSize: 11
		}])
		.then((answers) => {
			compilerMenuChoice = answers.choice;
		});

	if (compilerMenuChoice === strings.compilerMode()) {
		if (settings.compilerMode === "simple") {
			settings.compilerMode = "advanced";
		} else {
			settings.compilerMode = "simple";
		}
		compilerMenuChoice = strings.compilerMode();
	} else if (compilerMenuChoice === strings.compileThemes()) {
		settings.compileThemes = !settings.compileThemes;
		compilerMenuChoice = strings.compileThemes();
	} else if (compilerMenuChoice === strings.compilerSourcemaps()) {
		settings.compilerSourcemaps = !settings.compilerSourcemaps;
		if (settings.compilerSourcemaps === true) {
			settings.compilerMinify = false;
		}
		compilerMenuChoice = strings.compilerSourcemaps();
	} else if (compilerMenuChoice === strings.compilerMinify()) {
		settings.compilerMinify = !settings.compilerMinify;
		compilerMenuChoice = strings.compilerMinify();
	} else if (compilerMenuChoice === strings.compilerAddDebugFiles()) {
		settings.compilerAddDebugFiles = !settings.compilerAddDebugFiles;
		compilerMenuChoice = strings.compilerAddDebugFiles();
	} else if (compilerMenuChoice === strings.compilerFilenameHash()) {
		settings.compilerFilenameHash = !settings.compilerFilenameHash;
		compilerMenuChoice = strings.compilerFilenameHash();
	} else if (compilerMenuChoice === strings.compilerFilenameEpoch()) {
		settings.compilerFilenameEpoch = !settings.compilerFilenameEpoch;
		compilerMenuChoice = strings.compilerFilenameEpoch();
	} else if (compilerMenuChoice === strings.compilerFilenamePmodVersion()) {
		settings.compilerFilenamePmodVersion = !settings.compilerFilenamePmodVersion;
		compilerMenuChoice = strings.compilerFilenamePmodVersion();
	} else if (compilerMenuChoice === strings.compilerVerbosity()) {
		if (settings.compilerVerbosity === 6) {
			settings.compilerVerbosity = 1;
		} else {
			settings.compilerVerbosity += 1;
		}
		compilerMenuChoice = strings.compilerVerbosity();
	} else if (compilerMenuChoice === strings.compilerRunSanityChecks()) {
		if (settings.compilerRunSanityChecks === 2) {
			settings.compilerRunSanityChecks = 0;
		} else {
			settings.compilerRunSanityChecks += 1;
		}
		compilerMenuChoice = strings.compilerRunSanityChecks();
	} else if (compilerMenuChoice === strings.compilerFinishedNotification()) {
		settings.compilerFinishedNotification = !settings.compilerFinishedNotification;
		compilerMenuChoice = strings.compilerFinishedNotification();
	} else if (compilerMenuChoice === strings.compilerWaitOnWindows()) {
		settings.compilerWaitOnWindows = !settings.compilerWaitOnWindows;
		compilerMenuChoice = strings.compilerWaitOnWindows();
	} else if (compilerMenuChoice === "Back") {
		compilerMenuChoice = 0;
		return;
	} else {
		throw new Error("Invalid compiler menu choice: " + compilerMenuChoice);
	}

	await compilerSettings();
}

let sanityCheckMenuChoice;

async function sanityCheckSettings() {
	let choices = [];
	choices.push(strings.precommitHookEnabled());
	choices.push(strings.compilerRunSanityChecks());
	choices.push(new inquirer.Separator(separatorString));
	choices.push(strings.checksEnableCustom());
	choices.push(strings.checksEnableSpelling());
	choices.push(strings.checksEnableESLint());
	choices.push(strings.checksEnableTypescript());
	choices.push(new inquirer.Separator(separatorString));
	if (settings.checksEnableCustom === true) {
		choices.push(strings.checksOnlyChangedCustom());
	}
	if (settings.checksEnableSpelling === true) {
		choices.push(strings.checksOnlyChangedSpelling());
	}
	if (settings.checksEnableESLint === true) {
		choices.push(strings.checksOnlyChangedESLint());
	}
	if (settings.checksEnableTypescript === true) {
		choices.push(strings.checksOnlyChangedTypescript());
	}

	choices.push("Back");

	await inquirer
		.prompt([{
			type: "rawlist",
			name: "choice",
			message: "Sanity Check Settings",
			choices: choices,
			default: sanityCheckMenuChoice,
			loop: false,
			pageSize: 11
		}])
		.then((answers) => {
			sanityCheckMenuChoice = answers.choice;
		});
	if (sanityCheckMenuChoice === strings.precommitHookEnabled()) {
		if (settings.precommitHookEnabled === -1) {
			settings.precommitHookEnabled = 0;
		} else if (settings.precommitHookEnabled === 0) {
			settings.precommitHookEnabled = 1;
		} else {
			settings.precommitHookEnabled = -1;
		}
		sanityCheckMenuChoice = strings.precommitHookEnabled();
	} else if (sanityCheckMenuChoice === strings.compilerRunSanityChecks()) {
		if (settings.compilerRunSanityChecks === 2) {
			settings.compilerRunSanityChecks = 0;
		} else {
			settings.compilerRunSanityChecks += 1;
		}
		sanityCheckMenuChoice = strings.compilerRunSanityChecks();
	} else if (sanityCheckMenuChoice === strings.checksEnableCustom()) {
		settings.checksEnableCustom = !settings.checksEnableCustom;
		sanityCheckMenuChoice = strings.checksEnableCustom();
	} else if (sanityCheckMenuChoice === strings.checksEnableSpelling()) {
		settings.checksEnableSpelling = !settings.checksEnableSpelling;
		sanityCheckMenuChoice = strings.checksEnableSpelling();
	} else if (sanityCheckMenuChoice === strings.checksEnableESLint()) {
		settings.checksEnableESLint = !settings.checksEnableESLint;
		sanityCheckMenuChoice = strings.checksEnableESLint();
	} else if (sanityCheckMenuChoice === strings.checksEnableTypescript()) {
		settings.checksEnableTypescript = !settings.checksEnableTypescript;
		sanityCheckMenuChoice = strings.checksEnableTypescript();
	} else if (sanityCheckMenuChoice === strings.checksOnlyChangedCustom()) {
		settings.checksOnlyChangedCustom = !settings.checksOnlyChangedCustom;
		sanityCheckMenuChoice = strings.checksOnlyChangedCustom();
	} else if (sanityCheckMenuChoice === strings.checksOnlyChangedSpelling()) {
		settings.checksOnlyChangedSpelling = !settings.checksOnlyChangedSpelling;
		sanityCheckMenuChoice = strings.checksOnlyChangedSpelling();
	} else if (sanityCheckMenuChoice === strings.checksOnlyChangedESLint()) {
		settings.checksOnlyChangedESLint = !settings.checksOnlyChangedESLint;
		sanityCheckMenuChoice = strings.checksOnlyChangedESLint();
	} else if (sanityCheckMenuChoice === strings.checksOnlyChangedTypescript()) {
		settings.checksOnlyChangedTypescript = !settings.checksOnlyChangedTypescript;
		sanityCheckMenuChoice = strings.checksOnlyChangedTypescript();
	} else if (
		sanityCheckMenuChoice === "Back"
	) {
		sanityCheckMenuChoice = 0;
		return;
	} else {
		throw new Error("Invalid sanity check menu choice: " + sanityCheckMenuChoice);
	}

	await sanityCheckSettings();
}

let miscMenuChoice;

async function MiscSettings() {
	let choices = [];
	choices.push(strings.manageNodePackages());
	choices.push(new inquirer.Separator(separatorString));
	choices.push(strings.WatcherLiveReload());
	choices.push(strings.compilerCopyToFCHost());
	choices.push("Back");

	await inquirer
		.prompt([{
			type: "rawlist",
			name: "choice",
			message: "Miscellaneous Settings",
			choices: choices,
			default: miscMenuChoice,
			loop: false,
			pageSize: 11
		}])
		.then((answers) => {
			miscMenuChoice = answers.choice;
		});

	if (miscMenuChoice === strings.manageNodePackages()) {
		if (settings.manageNodePackages === 1) {
			settings.manageNodePackages = -1;
		} else {
			settings.manageNodePackages += 1;
		}
		miscMenuChoice = strings.manageNodePackages();
	} else if (miscMenuChoice === strings.WatcherLiveReload()) {
		settings.WatcherLiveReload = !settings.WatcherLiveReload;
		miscMenuChoice = strings.WatcherLiveReload();
	} else if (miscMenuChoice === strings.compilerCopyToFCHost()) {
		settings.compilerCopyToFCHost = !settings.compilerCopyToFCHost;
		miscMenuChoice = strings.compilerCopyToFCHost();
	} else if (miscMenuChoice === "Back") {
		miscMenuChoice = 0;
		return;
	} else {
		throw new Error("Invalid misc menu choice: " + miscMenuChoice);
	}

	await MiscSettings();
}

let mainMenuChoice;

async function mainMenu() {
	let choices = [
		"Edit Compiler Settings",
		"Edit Sanity Check Settings",
		"Edit Miscellaneous Settings",
	];
	if (JSON.stringify(settings) !== JSON.stringify(originalSettings)) {
		choices.push("Save Settings");
		choices.push("Exit without saving settings");
	} else {
		choices.push("Exit");
	}

	await inquirer
		.prompt([{
			type: "rawlist",
			name: "choice",
			message: "Welcome to FC development! Here you can change the settings that are used for the compiler and sanity checks.",
			choices: choices,
			default: mainMenuChoice,
			loop: false,
			pageSize: 11
		}])
		.then((answers) => {
			mainMenuChoice = answers.choice;
		});

	if (mainMenuChoice === "Edit Compiler Settings") {
		await compilerSettings();
	} else if (mainMenuChoice === "Edit Sanity Check Settings") {
		await sanityCheckSettings();
	} else if (mainMenuChoice === "Edit Miscellaneous Settings") {
		await MiscSettings();
	} else if (mainMenuChoice === "Save Settings") {
		jetpack.write("settings.json", settings, {atomic: true});
		originalSettings = JSON.parse(JSON.stringify(settings));
	} else if (
		mainMenuChoice === "Exit without saving settings" ||
        mainMenuChoice === "Exit"
	) {
		process.exit(0);
	} else {
		throw new Error("Invalid main menu choice: " + mainMenuChoice);
	}

	mainMenuChoice = choices.indexOf(mainMenuChoice);

	await mainMenu();
}

// @ts-ignore
await mainMenu();
