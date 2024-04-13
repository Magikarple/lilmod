// cSpell:ignore fchost, megajs

// @ts-ignore
import jetpack from "fs-jetpack";
import {execSync} from "child_process";
import * as path from "path";
import inquirer from 'inquirer';
import {File} from 'megajs';
import decompress from "decompress";

// location to save the zip file to
const zipLocation = path.join("fchost", "PreCompiledFCHost.zip");

// make sure settings.json exists and has all the required properties
execSync("node devTools/scripts/setup.js --settings");

// load settings.json
/** @type {import("./setup.js").Settings} */
const settings = jetpack.read("settings.json", "json");

// link to pre-compiled fchost
let windowsLink = "https://mega.nz/file/AFhTxLxR#fQgZFswJHVLpLlY5BzhTPmUKtmISeHdJ065b_MW0700";

let wineExists = false;
try {
	if (process.platform !== "win32" && execSync("command -v wine").toString().trim() !== "") { wineExists = true; }
} catch (e) {
	// fail silently
	// console.log(e);
}

let megaLink = "";

// if FCHost doesn't exist
if (
	jetpack.exists(path.join(settings.FCHostPath, "fchost.exe")) === false &&
	jetpack.exists(path.join(settings.FCHostPath, "fchost")) === false
) {
	if (process.platform === "win32") {
		megaLink = windowsLink;
	} else {
		if (wineExists === false) {
			// there are no pre-compiled versions of FCHost for this os at this time and wine isn't installed.
			console.log("There is not a pre-compiled version of FCHost available for your system at this time.");
			console.log("You can still use FCHost, but you will have to manually build it yourself.");
			console.log("Instructions for doing so are here: https://gitgud.io/pregmodfan/fc-pregmod/-/blob/pregmod-master/FCHost/Building_FCHost.txt");
			console.log("Alternatively you can install Wine (https://www.winehq.org/) and rerun this script to attempt to run the Windows version of FCHost.");
		} else {
			// use windows FCHost link
			megaLink = windowsLink;
			console.log("A native pre-compiled version of FCHost is not available for your os, but Wine is installed.");
			console.log("Selected the pre-compiled Windows version of FCHost for download.");
		}
	}

	// ask user if they want to download FCHost
	if (
		megaLink !== ""
	) {
		console.log("This script will download, extract, and run FCHost.");
		// ask the users permission to download FCHost
		let choice;
		// @ts-ignore
		await inquirer
			.prompt([{
				type: "rawlist",
				name: "choice",
				message: `Do you want to download and extract a pre-compiled version of FCHost from '${megaLink}'?`,
				choices: ["Yes", "No"],
				default: "Yes",
				loop: false
			}])
			.then((answers) => {
				choice = answers.choice;
			});
		if (choice === "Yes") {
			// download FCHost
			const file = File.fromURL(megaLink);

			// @ts-ignore
			await file.loadAttributes();
			console.log(`Downloading ${file.name} with a size of ${file.size} bytes`);

			// if zipLocation exists then remove it
			jetpack.remove(zipLocation);

			// @ts-ignore
			const data = await file.downloadBuffer();
			// check that buffer size is the same as file.size
			if (data.byteLength !== file.size) {
				console.log(`File did not download correctly! There is a ${file.size - data.byteLength} byte size difference.}`);
				console.log("Rerun this script to try again.");
				process.exit();
			}
			jetpack.write(zipLocation, data, {atomic: true});

			// create settings.FCHostPath directory
			if (jetpack.exists(settings.FCHostPath) === "file") {
				// I don't know how we got both a folder and a file with the same name, but that is invalid on Windows
				// Renaming it to `${settings.FCHostPath}.file` should be okay since anyone manually compiling should be recreating the file anyway
				jetpack.move(settings.FCHostPath, settings.FCHostPath + ".file");
			}
			jetpack.dir(settings.FCHostPath);
			// extract FCHost
			// @ts-ignore
			await decompress(zipLocation, settings.FCHostPath).then(files => {
				// find the FCHost folder in releases
				/** @type {string[]|string} */
				let folder = jetpack.find(settings.FCHostPath, {
					matching: "FCHost*", files: false, directories: true, recursive: false
				});
				if (folder.length === 0) {
					console.log("Zip file extraction failed!");
					jetpack.remove(settings.FCHostPath);
					process.exit();
				} else {
					// move contents of folder[0] to settings.FCHostPath
					jetpack.find(folder[0]).forEach(element => {
						jetpack.move(element, path.join(settings.FCHostPath, path.relative(folder[0], element)));
					});
					// remove folder[0]
					jetpack.remove(folder[0]);
					console.log('Zip file extracted successfully!');
				}
			});
			// delete zip file
			jetpack.remove(zipLocation);
		} else {
			console.log("You can run this script at any time if you change your mind.");
			console.log("You can also manually compile FCHost if you wish.");
			console.log("Instructions for doing so are here: https://gitgud.io/pregmodfan/fc-pregmod/-/blob/pregmod-master/FCHost/Building_FCHost.txt");
			process.exit();
		}
	}
}

if (
	jetpack.exists(path.join(settings.FCHostPath, "fchost.exe")) === false &&
	jetpack.exists(path.join(settings.FCHostPath, "fchost")) === false
) {
	console.log(`FCHost doesn't exist at "${settings.FCHostPath}"`);
	console.log("You can manually compile FCHost if you wish.");
	console.log("Instructions for doing so are here: https://gitgud.io/pregmodfan/fc-pregmod/-/blob/pregmod-master/FCHost/Building_FCHost.txt");
	process.exit();
}

// if FC_pregmod.html is not in settings.FCHostPath
if (jetpack.exists(path.join(settings.FCHostPath, "FC_pregmod.html")) !== "file") {
	console.log(`There doesn't seem to be a FC_pregmod.html file at ${settings.FCHostPath}`);
	console.log("Running the compiler with it's default settings should fix this problem.");
	let choice;
	// @ts-ignore
	await inquirer
		.prompt([{
			type: "rawlist",
			name: "choice",
			message: `Do want to run the compiler now?`,
			choices: ["Yes", "No"],
			default: "Yes",
			loop: false
		}])
		.then((answers) => {
			choice = answers.choice;
		});
	if (choice === "Yes") {
		try {
			execSync("node devTools/scripts/advancedCompiler.js --skip-sanity-checks --no-interaction", {stdio: "inherit"});
		} catch (e) {
			console.log(e);
		}
	}
}

// launch FCHost
// cd into settings.FCHostPath
process.chdir(settings.FCHostPath);
console.log("Launching FCHost");
if (process.platform === "win32") {
	// run fchost
	execSync("fchost.exe", {stdio: "inherit"});
} else if (wineExists === true) {
	console.log("Using Wine to run the Windows version of FCHost");
	execSync("wine fchost.exe", {stdio: "inherit"});
} else {
	// run fchost
	execSync("./fchost", {stdio: "inherit"});
}
