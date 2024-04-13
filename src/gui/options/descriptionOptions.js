App.UI.descriptionOptions = function() {
	const f = document.createDocumentFragment();
	App.UI.DOM.appendNewElement("h1", f, "Description Options");

	App.UI.DOM.appendNewElement("p", f,
		"These options will affect both the long form description of each slave and the miniscenes available from the main menu.",
		"scene-intro");

	const options = new App.UI.OptionsGroup();

	options.addOption("", "surnameOrder")
		.addValue("Allow nationality name order", 0).customDescription("Order names ''based on country of origin''.")
		.addValue("Force name surname", 1).customDescription("Names will always be ''Name Surname''.")
		.addValue("Force surname name", 2).customDescription("Names will always be ''Surname Name''.");

	options.addOption("", "seeRace")
		.addValue("Disable most mentions of race", 0).off()
		.customDescription("Ethnicity will ''almost never'' be mentioned.")
		.addValue("Enable mentions of race", 1).on().customDescription("Ethnicity will ''occasionally'' be mentioned.");

	options.addOption("", "seeNationality")
		.addValue("Disable most mentions of nationality", 0).off()
		.customDescription("Nationality will ''almost never'' be mentioned.")
		.addValue("Enable mentions of nationality", 1).on()
		.customDescription("Nationality will ''occasionally'' be mentioned.");

	options.addOption("The effects of implants are", "showImplantEffects")
		.addValue("Shown", 1).on().addValue("Hidden", 0).off();

	options.addOption("Clothing is mostly", "showClothing")
		.addValue("Shown", 1).on().addValue("Hidden", 0).off();

	options.addOption("Detailed slave age information is", "showAgeDetail")
		.addValue("Shown", 1).on().addValue("Hidden", 0).off();

	options.addOption("Approximate height is", "showHeightCMs")
		.addValue("Shown", 1).on().addValue("Hidden", 0).off();

	options.addOption("Cosmetic body mods are", "showBodyMods")
		.addValue("Shown", 1).on().addValue("Hidden", 0).off();

	options.addOption("Sexual histories are", "showSexualHistory")
		.addValue("Shown", 1).on().addValue("Hidden", 0).off();

	options.addOption("Attractiveness and sexual scores are", "showScores")
		.addValue("Shown", 1).on().addValue("Hidden", 0).off();

	options.addOption("Volume, in CCs, of breasts is", "showBoobCCs")
		.addValue("Shown", 1).on().addValue("Hidden", 0).off();

	options.addOption("Height and length units are in", "showInches")
		.addValueList([["Metric", 0], ["Both", 1], ["Imperial", 2]]);

	options.addOption("Potential sizes (height, breasts) are", "showPotentialSizes")
		.addValue("Shown", 1).on().addValue("Hidden", 0).off();

	if (V.seeDicks > 0) {
		options.addOption("Approximate sizes of dicks and balls are", "showDickCMs")
			.addValue("Shown", 1).on().addValue("Hidden", 0).off();
	}

	options.addOption("Numbers are displayed as", "showNumbers")
		.addValueList([["Integers", 2], ["Both", 1], ["Words", 0]]);

	if (V.showNumbers === 1) {
		options.addOption(`Only numbers up to ${V.showNumbersMax} are displayed as words`, "showNumbersMax")
			.addValue("Default (20)", 20).showTextBox();
	}

	App.UI.DOM.appendNewElement("p", f, options.render());

	return f;
};
