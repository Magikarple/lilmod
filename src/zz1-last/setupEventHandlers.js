/* subscribe to game save/load events */
Save.onLoad.add(App.EventHandlers.onLoad);
Save.onSave.add(App.EventHandlers.onSave);

/* ### Every-time listeners #### */

$(document).on(":storyready", () => {
	App.EventHandlers.storyReady();
});

$(document).on(":passageinit", () => {
	App.Utils.PassageSwitchHandler.execute();
	App.UI.Tabs.clear();
	App.Reminders.clear();
	App.UI.StoryCaption.encyclopedia = "";
	profileEvents.passageinit();
});

$(document).on(":passagestart", event => {
	App.Debug.slavesConsistency(event);
	Object.defineProperty(State.temporary, "S", {
		get: () => S,
		enumerable: true
	});
	profileEvents.passagestart();
});

$(document).on(":passagerender", () => {
	profileEvents.passagerender();
});

$(document).on(":passagedisplay", () => {
	profileEvents.passagedisplay();
});

$(document).on(":passageend", ev => {
	profileEvents.passageend(ev.content);
});

/* ### One-time listeners ### */

$(document).one(":passagestart", () => {
	App.EventHandlers.optionsChanged();
});
