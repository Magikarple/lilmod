/**
 * @file Moves all the git hooks to .git/hooks
 */

// @ts-ignore
import jetpack from "fs-jetpack";
import * as path from "path";

// copy contents of devTools/scripts/gitHooks to .git/hooks
// for file in devTools/scripts/gitHooks
jetpack.list("devTools/scripts/gitHooks").forEach((/** @type {string} */ file) => {
	// skip if path ends with `addHooks.js`
	if (file.endsWith("addHooks.js")) { return; }
	const newPath = path.join(".git/hooks", file);
	// copy file if it doesn't already exist
	if (jetpack.exists(newPath) === false) {
		jetpack.copy(
			path.join("devTools/scripts/gitHooks", file),
			newPath
		);
	}
});
