new App.DomPassage("Options",
	() => {
		if (lastVisited("Slave Interact") === 1) {
			V.storedLink = "Slave Interact";
		} else {
			V.storedLink = "Main";
		}

		V.nextButton = "Back";
		V.nextLink = V.storedLink;
		App.UI.StoryCaption.encyclopedia = "How to Play";

		return App.UI.optionsPassage();
	}, ["jump-to-safe", "jump-from-safe", "temporary-images"]
);

new App.DomPassage("Description Options",
	() => {
		V.nextButton = "Back";
		if (V.storedLink !== "Slave Interact") {
			V.storedLink = lastVisited("Slave Interact") === 1 ? "Slave Interact" : "Options";
		}
		V.nextLink = V.storedLink;

		return App.UI.descriptionOptions();
	}, ["jump-to-safe", "jump-from-safe"]
);

new App.DomPassage("Summary Options",
	() => {
		V.nextButton = "Back";
		if (V.storedLink !== "Slave Interact" && V.storedLink !== "Main") {
			V.storedLink = lastVisited("Main") === 1 ? "Main" : "Options";
		}
		V.nextLink = V.storedLink;
		App.Utils.PassageSwitchHandler.set(App.EventHandlers.optionsChanged);

		return App.UI.summaryOptions();
	}, ["jump-to-safe", "jump-from-safe"]
);

new App.DomPassage("Hotkey Settings",
	() => {
		V.nextButton = "Back";
		V.nextLink = "Main";

		return App.UI.Hotkeys.settings();
	}, ["jump-to-safe", "jump-from-safe"]
);

new App.DomPassage("Edit Genetics",
	() => {
		return App.UI.editGenetics();
	}, ["jump-from-safe"]
);

new App.DomPassage("Variable Difference",
	() => {
		V.nextButton = " "; /* disable the nextButton. Forces the user to use the "Go Back" option contained in the function */
		return App.UI.variableDifference();
	}
);

new App.DomPassage("MOD_Edit Arcology Cheat",
	() => {
		V.nextButton = "Continue";
		V.nextLink = "MOD_Edit Arcology Cheat Datatype Cleanup";
		return App.UI.Cheat.arcologyPassage();
	}
);

new App.DomPassage("MOD_Edit Arcology Cheat Datatype Cleanup",
	() => {
		V.nextButton = "Continue";
		V.nextLink = "Main";
		return App.UI.Cheat.arcologyCheatDatatypeCleanup();
	}
);

new App.DomPassage("MOD_Edit Neighbor Arcology Cheat Datatype Cleanup",
	() => {
		V.nextButton = "Continue";
		V.nextLink = "Main";
		return App.UI.Cheat.neighborArcologyCheatDatatypeCleanup();
	}
);

new App.DomPassage("PCCheatMenu",
	() => {
		V.nextButton = "Apply";
		V.nextLink = "PCCheatMenuCheatDatatypeCleanup";
		App.UI.StoryCaption.encyclopedia = "Design Your Master";
		return App.UI.Cheat.PCCheatMenu();
	}
);


new App.DomPassage("PCCheatMenuCheatDatatypeCleanup",
	() => {
		V.nextButton = "Continue";
		V.nextLink = "Manage Personal Affairs";
		return App.UI.Cheat.PCCheatMenuCheatDatatypeCleanup();
	}
);
