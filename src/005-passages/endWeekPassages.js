new App.DomPassage("Slave Assignments Report",
	() => {
		V.nextLink = "Economics";
		V.nextButton = "Continue";

		const f = document.createDocumentFragment();

		try {
			App.UI.DOM.appendNewElement("h1", f, `${V.arcologies[0].name} Weekly Slave Report - Week ${V.week}`);
			f.append(App.EndWeek.slaveAssignmentReport());
		} finally {
			// whatever happens, stop the end week animation so we at least know there is an error.
			App.UI.EndWeekAnim.end();
		}

		return f;
	}, ["end-week"]
);

new App.DomPassage("Next Week",
	() => {
		App.EndWeek.nextWeek();

		// simulate <<goto "Main">> macro behaviour
		// @ts-ignore
		setTimeout(() => Engine.play("Main"), Engine.minDomActionDelay);

		return document.createDocumentFragment();
	}, ["end-week"]
);

new App.DomPassage("Economics",
	() => {
		V.nextButton = "Continue";
		V.nextLink = "Scheduled Event";

		return App.EndWeek.economics();
	}, ["end-week"]
);
