App.Arcology.changeLanguage = function() {
	let el = document.createElement("div");
	let revivalist = {language: "", name: ""};
	let r = [];

	const options = new App.UI.OptionsGroup();
	const languageList = new Set(["English", "Spanish", "Arabic", "Chinese", "Japanese", V.seed]);

	if (["Australia", "North America", "Western Europe"].includes(V.continent)) {
		languageList.add("English");
	} else if (V.continent === "South America") {
		languageList.add("Spanish");
	} else if (V.continent === "Brazil") {
		languageList.add("Portuguese");
	} else if (V.continent === "Central Europe") {
		languageList.add("German");
	} else if (V.continent === "Eastern Europe") {
		languageList.add("Russian");
	} else if (V.continent === "Southern Europe") {
		languageList.add("Italian");
	} else if (V.continent === "Scandinavia") {
		languageList.add("Norwegian");
	} else if (V.continent === "the Middle East" || V.continent === "Africa") {
		languageList.add("Arabic");
	} else if (V.continent === "Asia") {
		languageList.add("Chinese");
	} else if (V.continent === "Japan") {
		languageList.add("Japanese");
	}

	for (const [FSname, FSprops] of Object.entries(App.Data.FutureSociety.records)) {
		if (FSprops.language && FutureSocieties.isActive(FSname)) {
			revivalist = {language: FSprops.language, name: FSprops.noun};
			languageList.add(FSprops.language);
		}
	}

	r.push(`The lingua franca of the arcology is <span class='bold'>${V.language}.</span>`);
	App.Events.addParagraph(el, r);

	r = [];
	r.push(`Changing the lingua franca of the arcology is a difficult process.`);
	r.push(`Doing so will slightly reduce the arcology's prosperity due to the difficulty changing languages will impose on businesses.`);
	r.push(`It will also cost ${cashFormat(500)} for each mentally competent slave you own, since it will be necessary to build time into their schedules for them to learn basic commands in the new language.`);
	r.push(`Slaves' starting fluency in the new language will depend on their intelligence, nationality, education, and in some cases, ethnicity.`);
	r.push(`Previous linguistic experience will not be saved, meaning that repeated language changes will wipe out slaves' previous language skills.`);
	App.Events.addParagraph(el, r);

	options.addOption("Select a custom language to be applied: ", "seed").showTextBox().addComment("A single capitalized word is recommended.");
	el.append(options.render());

	function setLanguage(targetLanguage) {
		V.language = targetLanguage;
		V.arcologies[0].prosperity = Math.trunc(0.9 * V.arcologies[0].prosperity);
		for (const slave of V.slaves) {
			if (slave.fetish !== Fetish.MINDBROKEN) {
				nationalityToAccent(slave);
				if (slave.accent >= 3) {
					if ((slave.intelligence + slave.intelligenceImplant + 100) > random(0, 100)) {
						slave.accent--;
					}
				}
				cashX(-500, "capEx");
			}
		}
	}

	for (const targetLanguage of languageList) {
		const languageLink = (targetLanguage !== V.language)
			? App.UI.DOM.link(targetLanguage, setLanguage, [targetLanguage], passage())
			: App.UI.DOM.disabledLink(targetLanguage, ["This is your arcology's current lingua franca."]);
		const revivalistWarning = (revivalist.language !== "" && targetLanguage === revivalist.language)
			? App.UI.DOM.makeElement("span", ` Failing to use this language will retard the adoption of ${revivalist.name}.`, ["note", "noteworthy"])
			: ``;
		App.UI.DOM.appendNewElement("div", el, App.UI.DOM.combineNodes(languageLink, revivalistWarning));
	}
	return el;
};
