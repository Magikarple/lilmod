/* ### Non Random Events ### */

new App.DomPassage("conflictReport",
	() => {
		V.nextButton = "Continue";
		V.nextLink = "Scheduled Event";
		App.UI.StoryCaption.encyclopedia = "Battles";
		return App.Events.conflictReport();
	}, ["end-week, temporary-images"]
);
new App.DomPassage("conflictHandler",
	() => {
		return App.Events.conflictHandler();
	}, ["end-week", "temporary-images"]
);

/* ### Random Events ### */

new App.DomPassage("Random Individual Event",
	() => {
		V.nextButton = "Continue";

		if (V.RIERemaining <= 0) {
			// first event for this week: reset counter
			V.RIERemaining = Math.max(1, Math.min(V.RIEPerWeek, Math.floor(getRieEligibleSlaves().length / 2)));
		}
		if (V.RIERemaining > 1) {
			// return to self if we have more events to play
			V.nextLink = "Random Individual Event";
		} else {
			// last event for this week: out to Next Week
			V.nextLink = "Next Week";
		}
		V.RIERemaining--;

		return App.Events.playRandomIndividualEvent();
	}, ["end-week", "temporary-images"]
);

new App.DomPassage("Random Nonindividual Event",
	() => {
		V.nextButton = "Continue";
		V.nextLink = "Random Individual Event";

		return App.Events.playRandomNonindividualEvent();
	}, ["end-week", "temporary-images"]
);

/* ### Scheduled Events ### */

new App.DomPassage("Scheduled Event",
	() => {
		V.nextButton = "Continue";
		V.nextLink = "Scheduled Event"; // return to self; playNonrandomEvent will forward automatically when necessary

		return App.Events.playNonrandomEvent();
	}, ["end-week", "temporary-images"]
);

/* ### Player Events ### */

new App.DomPassage("Gameover",
	() => {
		return App.Events.Gameover();
	}, ["end-week", "temporary-images"]
);
