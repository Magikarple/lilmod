App.EventHandlers = function() {
	/**
	 * @param {TwineSugarCube.SaveObject} save
	 */
	function onLoad(save) {
		const v = /** @type {FC.GameVariables} */(save.state.history[0].variables);
		if (v.releaseID === 2000) {
			v.releaseID = 1100;
		}
		if (v.releaseID > App.Version.release) {
			console.error("Save game version problem. Loaded : " + v.releaseID + ", above expected:" + App.Version.release); // eslint-disable-line no-console
			throw new Error("The save you're attempting to load was created with the game version newer than one you are running. Please download the latest game version.");
		}
		// updating settings only for the same releaseID, otherwise user will run
		// backwards compatibility and we update settings from there
		if (v.releaseID === App.Version.release) {
			App.UI.SlaveSummary.settingsChanged(v);
		}
		App.Utils.PassageSwitchHandler.clear();
	}

	/**
	 * @param {TwineSugarCube.SaveObject} save
	 */
	function onSave(save) {
		if (App.Utils.isEndWeek() && V.endweekSaveWarning && Dialog.isOpen()) {
			$(document).one(':dialogclosed', () => {
				Dialog.setup("Saving during End Week");
				Dialog.append("<p>Saves created during End Week should <span class='warning bold'>ONLY</span> be loaded in the <span class='bold'>SAME</span> game version.</p><p>Please save on <span class='bold'>Main</span> or <span class='bold'>Options</span> if you plan on upgrading your game.</p>");
				Dialog.append("You can disable this message in the Game Options.");
				Dialog.open();
			});
		}
	}

	function storyReady() {
		App.Status.storyReady = true;
		App.UI.Theme.init();
		App.UI.Hotkeys.init();
		App.UI.GlobalTooltips.update();
		// Load player mods. Do this last
		App.Modding.internal.load();
	}

	function optionsChanged() {
		App.UI.SlaveSummary.settingsChanged();
	}

	return {
		onLoad: onLoad,
		onSave: onSave,
		storyReady: storyReady,
		optionsChanged: optionsChanged
	};
}();
