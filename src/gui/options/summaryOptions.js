App.UI.summaryOptions = function() {
	const el = new DocumentFragment();
	let options;

	App.UI.DOM.appendNewElement("h1", el, "Summary Options");

	App.UI.DOM.appendNewElement("p", el, `These options will affect the short slave summaries that appear on the main menu and the facility management screens.`, "scene-intro");

	App.UI.DOM.appendNewElement("h2", el, "Main menu features");

	options = new App.UI.OptionsGroup();

	options.addOption("Rules Assistant visibility", "rulesAssistantMain")
		.addValue("Shown", 1).on().addValue("Hidden", 0).off();

	options.addOption("Facilities in the sidebar are", "abbreviateSidebar")
		.addValueList([["Summarized", 2], ["Abbreviated", 1]]);

	options.addOption("Sorting main menu options are", "sortSlavesMain")
		.addValue("Shown", 1).on().addValue("Hidden", 0).off();

	if (V.sortSlavesMain > 0) {
		options.addOption("Sorting direction", "sortSlavesOrder")
			.addValueList([["Ascending", "ascending"], ["Descending", "descending"]]);

		options.addOption("Slaves are sorted by", "sortSlavesBy")
			.addValueList(Array.from(App.Data.SlaveSorting.entries()));
	}

	el.append(options.render());

	App.UI.DOM.appendNewElement("h2", el, "Individual panels");
	App.UI.DOM.appendNewElement("div", el, "Sample summary:");
	el.append(App.UI.SlaveList.render([V.slaves.random().ID], [], App.UI.SlaveList.SlaveInteract.stdInteract));

	options = (new App.UI.OptionsGroup()).enableDoubleColumn();

	options.addOption("Panel style is", "slavePanelStyle")
		.addValueList([
			["None", 0],
			["Line Separator", 1],
			["Card", 2]
		]);

	App.UI.SlaveSummary.addOptions(options);

	options.addOption("Granular slave stat numbers are", "summaryStats")
		.addValue("Shown", 1).on().addValue("Hidden", 0).off();

	options.addOption("Main menu assignment shortcuts are", "displayAssignments")
		.addValue("Shown", 1).on().addValue("Hidden", 0).off();

	if (V.showMissingSlaves) {
		options.addOption("Missing slave parents are", "showMissingSlavesSD")
			.addValue("Shown", true).on().addValue("Hidden", false).off();
	}

	options.addCustomOption("FC Dev's preferred options")
		.addButton(
			"Apply",
			() => {
				V.seeDesk = 0;
				V.seeFCNN = 0;
				V.sortSlavesBy = "devotion";
				V.sortSlavesOrder = "descending";
				V.sortSlavesMain = 0;
				V.rulesAssistantMain = 1;
				Object.assign(
					V.UI.slaveSummary.abbreviation,
					{
						devotion: 1,
						mental: 1,
						rules: 1,
						health: 1,
						diet: 1,
						drugs: 1,
						hormoneBalance: 1,
						race: 1,
						genitalia: 1,
						physicals: 1,
						skills: 1,
						nationality: 1,
						rulesets: 1,
						clothes: 0,
						origins: 0
					}
				);
				V.abbreviateSidebar = 1;
			}
		);

	el.append(options.render());

	return el;
};
