// Always scope your code to not pollute the global namespace.
{
	// Get the mod so we can modify it:
	const mod = App.Modding.currentMod;

	// Set the name and version:
	mod.name = "Example Mod";
	mod.version = "1.0";
	mod.description = "This is an example mod showing off the modding API and gives examples for moddable systems.";

	// For bigger mods it can be useful to split the mod in multiple parts.
	// These parts can then be loaded as subscripts.
	// Subscripts will be loaded in series and only once this script is done.
	mod.addSubscript("subscript");

	// Usage examples for moddable systems
	mod.addSubscript("rulesAssistantGetters");

	// Write to console, so we can easily see that the mod has loaded:
	console.log("Index Loading: Success!");

	// Tell the modding system this file is done. Do this at the end of EVERY script file.
	App.Modding.scriptDone();
}
