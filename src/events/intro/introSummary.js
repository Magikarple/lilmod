App.Intro.assignOnlyMatchingKeys = function(target, source, whitelist) {
	for (const settingName in whitelist) {
		if (settingName in source && settingName in target) {
			if (whitelist[settingName] instanceof Object) {
				App.Intro.assignOnlyMatchingKeys(target[settingName], source[settingName], whitelist[settingName]);
			} else {
				target[settingName] = source[settingName];
			}
		}
	}
};

App.Intro.getNondefaultOptionsAsObject = function(exportFrom = V, defaults = App.Data.defaultGameOptions) {
	const settingsToExport = {};
	for (const settingName in defaults) {
		if (defaults[settingName] instanceof Object && exportFrom[settingName] instanceof Object) {
			const nondefaultSub = App.Intro.getNondefaultOptionsAsObject(exportFrom[settingName], defaults[settingName]);
			if (Object.keys(nondefaultSub).length > 0) {
				settingsToExport[settingName] = nondefaultSub;
			}
		} else if (settingName in exportFrom && exportFrom[settingName] != defaults[settingName]) {
			settingsToExport[settingName] = exportFrom[settingName];
		}
	}
	return settingsToExport;
};

App.Intro.getNondefaultOptionsAsJSON = function() {
	return JSON.stringify(App.Intro.getNondefaultOptionsAsObject(), null, 2);
};

App.Intro.summary = function() {
	const el = new DocumentFragment();

	V.neighboringArcologies = variableAsNumber(V.neighboringArcologies, 0, 8, 3);
	V.FSCreditCount = variableAsNumber(V.FSCreditCount, 4, 7, 5);
	V.PC.actualAge = variableAsNumber(V.PC.actualAge, 10, 80, 35);
	V.PC.height = variableAsNumber(V.PC.height, 85, 305, 185);
	V.PC.natural.height = variableAsNumber(V.PC.natural.height, 85, 305, 185);
	V.PC.boobs = variableAsNumber(V.PC.boobs, 100, 50000, 200);
	V.PC.natural.boobs = variableAsNumber(V.PC.natural.boobs, 100, 10000, 200);
	V.PC.pubertyAgeXX = variableAsNumber(V.PC.pubertyAgeXX, 8, 13, 13);
	V.PC.pubertyAgeXY = variableAsNumber(V.PC.pubertyAgeXY, 8, 13, 13);
	V.PC.birthWeek = variableAsNumber(V.PC.birthWeek, 0, 51, 0);

	el.append(introContent());

	V.minimumSlaveAge = variableAsNumber(V.minimumSlaveAge, 3, 18, 18);
	V.retirementAge = variableAsNumber(V.retirementAge, 25, 120, 45);
	let minAge = V.minimumSlaveAge;
	let maxAge = V.retirementAge - 1 > 60 ? 60 : V.retirementAge - 1;
	let defaultAge = 18;
	if (V.targetArcology.fs === "FSMaturityPreferentialist") {
		minAge = 30;
		defaultAge = 30;
	} else if (V.targetArcology.fs === "FSYouthPreferentialist") {
		maxAge = 29;
	}
	V.idealAge = variableAsNumber(V.idealAge, minAge, maxAge, defaultAge);
	V.targetIdealAge = V.idealAge;

	V.fertilityAge = variableAsNumber(V.fertilityAge, 3, 18, 13);
	V.potencyAge = variableAsNumber(V.potencyAge, 3, 18, 13);
	V.PC.mother = Number(V.PC.mother);
	V.PC.father = Number(V.PC.father);
	if (V.freshPC === 1 || V.saveImported === 0) {
		V.PC.origRace = V.PC.race;
		V.PC.origSkin = V.PC.skin;
		V.PC.origHColor = V.PC.hColor;
		V.PC.eyebrowHColor = V.PC.hColor;
	}
	// Ensure SecExp variables are in sync. Important to do here so NGP is handled as well.
	if ((V.secExpEnabled && Object.values(V.SecExp).length <= 1) || (!V.secExpEnabled && Object.values(V.SecExp).length > 1)) {
		App.Mods.SecExp.Obj.Init();
	}

	const tabBar = new App.UI.Tabs.TabBar("IntroSummary");
	tabBar.addTab("World", "world", worldContent());
	tabBar.addTab("Display", "display", App.Intro.display(true));
	tabBar.addTab("Content & Flavor", "content-and-flavor", App.Intro.contentAndFlavor(true));
	tabBar.addTab("Slaves", "slaves", slavesContent());
	tabBar.addTab("Player Character", "player", App.UI.Player.design());
	tabBar.addTab("Mods", "mods", modContent());
	tabBar.addTab("Import / Export", "import-export", importExportContent());
	el.append(tabBar.render());

	return el;

	function introContent() {
		const el = new DocumentFragment();
		App.UI.DOM.appendNewElement("div", el, `You may review your settings before clicking "Continue" to begin.`);

		const linkArray = [];
		linkArray.push(
			App.UI.DOM.link(
				"Continue",
				() => {
					continueNormal();
				},
				[],
				"Starting Girls"
			)
		);

		linkArray.push(
			App.UI.DOM.link(
				"Back to arcology selection",
				() => {},
				[],
				"Takeover Target"
			)
		);

		// App.Data.defaultGameOptions.PC and App.Data.defaultGameOptions.SF will *not* be identical to V.PC and V.SF,
		// so we cannot simply use _.isEqual.
		if (App.Intro.getNondefaultOptionsAsJSON() !== "{}") {
			linkArray.push(
				App.UI.DOM.link(
					"Restore defaults",
					() => {
						App.Intro.arcDefault();
						App.UI.reload();
					}
				)
			);
		}
		linkArray.push(
			App.UI.DOM.link(
				"Cheat Start",
				() => {
					cashX(1000000, "cheating");
					V.PC.rules.living = "luxurious";
					repX(20000, "cheating");
					V.dojo += 1;
					V.cheatMode = 1;
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
							beauty: 1,
							rules: 1,
							clothes: 2,
							health: 1,
							diet: 1,
							drugs: 1,
							race: 1,
							nationality: 1,
							genitalia: 1,
							physicals: 1,
							skills: 1,
							mental: 2
						}
					);
					V.PC.skill.trading = 100;
					V.PC.skill.warfare = 100;
					V.PC.skill.slaving = 100;
					V.PC.skill.engineering = 100;
					V.PC.skill.medicine = 100;
					V.PC.skill.hacking = 100;
					V.PC.geneticQuirks.wellHung = 2;
					if (V.PC.title === 0) {
						V.PC.hLength = 15;
						V.PC.waist = -20;
						V.PC.voice = 2;
					}
					if (V.PC.eye.right.vision === 1 || V.PC.eye.left.vision === 1) {
						V.PC.eyewear = "corrective glasses";
					}
					if (V.PC.physicalAge >= 14) {
						if (V.PC.balls > 0) {
							V.PC.pubertyXY = 1;
						}
						if (V.PC.ovaries > 0) {
							V.PC.pubertyXX = 1;
						}
					}
					if (V.PC.pubertyXX === 0 && V.PC.pubertyXY === 0) {
						if (V.PC.physicalAge < 11) {
							V.PC.energy = 20;
						} else if (V.PC.physicalAge < 12) {
							V.PC.energy = 30;
						} else if (V.PC.physicalAge < 13) {
							V.PC.energy = 40;
						}
					}
					if (V.PC.genes === "XX") {
						if (V.PC.ovaries === 1 && V.PC.pubertyXX > 0) {
							if (V.PC.balls > 0 && V.PC.pubertyXY > 0) {
								V.PC.hormoneBalance = 10;
							} else {
								V.PC.hormoneBalance = 50;
							}
						} else if (V.PC.balls > 0 && V.PC.pubertyXY > 0) {
							V.PC.hormoneBalance = -30;
						} else {
							V.PC.hormoneBalance = 10;
						}
					} else if (V.PC.genes === "XY") {
						if (V.PC.ovaries === 1 && V.PC.pubertyXX > 0) {
							if (V.PC.balls > 0 && V.PC.pubertyXY > 0) {
								V.PC.hormoneBalance = -10;
							} else {
								V.PC.hormoneBalance = 30;
							}
						} else {
							if (V.PC.balls > 0 && V.PC.pubertyXY > 0) {
								V.PC.hormoneBalance = -50;
							} else {
								V.PC.hormoneBalance = -10;
							}
						}
					}
					if (V.PC.preg > 0 && V.PC.preg > V.PC.pregData.normalBirth / 2) {
						V.PC.lactation = 1;
					}
					if (V.PC.pubertyXX === 1 && V.PC.physicalAge < V.PC.pubertyAgeXX) {
						V.PC.pubertyAgeXX = 8;
					}
					if (V.PC.pubertyXY === 1 && V.PC.physicalAge < V.PC.pubertyAgeXY) {
						V.PC.pubertyAgeXY = 8;
					}
					V.PC.birthName = V.PC.slaveName;
					V.PC.birthSurname = V.PC.slaveSurname;
					if (V.freshPC === 1 || V.saveImported === 0) {
						V.genePool.push(clone(V.PC));
					}
					App.Intro.initNationalities();
				},
				[],
				"Starting Girls",
				"Intended for debugging: may have unexpected effects"
			)
		);
		linkArray.push(
			App.UI.DOM.link(
				"Limited Cheat Start",
				() => {
					continueNormal();
					V.limitedCheatStart = 1;
				},
				[],
				"Starting Girls",
				"Allow cheating when selecting starting slaves"
			)
		);
		App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray));

		return el;
	}

	function worldContent() {
		const el = new DocumentFragment();
		el.append(App.Intro.economy(true));

		App.UI.DOM.appendNewElement("h2", el, "The Free City");
		let options = new App.UI.OptionsGroup();

		options.addOption(`The Free City features <strong>${V.neighboringArcologies}</strong> arcologies in addition to your own.`, "neighboringArcologies")
			.showTextBox().addComment("Setting this to 0 will disable most content involving the rest of the Free City.");

		if (V.targetArcology.fs === "New") {
			options.addOption(`The Free City is located on <strong>${V.terrain}</strong> terrain.`, "terrain")
				.addValueList([
					["Urban", "urban"],
					["Rural", "rural"],
					["Ravine", "ravine"],
					["Marine", "marine"],
					["Oceanic", "oceanic"]
				]);

			if (V.terrain !== "oceanic") {
				options.addOption(`The Free City is located in <strong>${V.continent}</strong>.`, "continent")
					.addValue("North America").addCallback(() => V.language = "English")
					.addValue("South America").addCallback(() => V.language = "Spanish")
					.addValue("Brazil").addCallback(() => V.language = "Portuguese")
					.addValue("Western Europe").addCallback(() => V.language = "English")
					.addValue("Central Europe").addCallback(() => V.language = "German")
					.addValue("Eastern Europe").addCallback(() => V.language = "Russian")
					.addValue("Southern Europe").addCallback(() => V.language = "Italian")
					.addValue("Scandinavia").addCallback(() => V.language = "Norwegian")
					.addValue("the Middle East").addCallback(() => V.language = "Arabic")
					.addValue("Africa").addCallback(() => V.language = "Arabic")
					.addValue("Asia").addCallback(() => V.language = "Chinese")
					.addValue("Australia").addCallback(() => V.language = "English")
					.addValue("Japan").addCallback(() => V.language = "Japanese")
					.pulldown();
			}
		} else {
			el.append(App.Intro.descriptionDivForArcology(V.targetArcology));
		}

		const fsRecord = App.Data.FutureSociety.records[V.targetArcology.fs];
		if (fsRecord && fsRecord.language) {
			options.addCustom(App.UI.DOM.combineNodes(`The lingua franca of your arcology is `, App.UI.DOM.makeElement("strong", fsRecord.language), ` due to its advanced ${fsRecord.adj} society.`));
		} else {
			options.addOption("The lingua franca of your arcology is", "language")
				.addValueList(["English", "Spanish", "Arabic"]).showTextBox();
		}

		options.addOption(`The Free City could develop as many as <strong>${V.FSCreditCount}</strong> future societies.`, "FSCreditCount")
			.showTextBox().addComment("5 is default, 4 behaves the same as pre-patch 0.9.9.0, max is 7. This option cannot be changed during the game.");

		el.append(options.render());
		return el;
	}

	function modContent() {
		const el = new DocumentFragment();
		let options = new App.UI.OptionsGroup();

		options.addOption("The Special Force Mod is", "Toggle", V.SF)
			.addValue("Enabled", 1).on().addValue("Disabled", 0).off();
		options.addComment(`This mod is initially from anon1888 but expanded by SFanon offers a lategame special (started out as security but changed to special in order to try and reduce confusion with CrimeAnon's separate Security Expansion (SecExp) mod) force, that is triggered after week 72.
		It is non-canon where it conflicts with canonical updates to the base game.`);

		options.addOption("The Security Expansion Mod is", "secExpEnabled")
			.addValue("Enabled", 1).on().addValue("Disabled", 0).off();
		options.addComment(`This mod introduces security and crime in the arcology, as well as attacks and battles.
		The mod can be activated in any moment, but it may result in unbalanced gameplay if activated very late in the game.`);

		options.addOption("Catmod is", "seeCats")
			.addValue("Enabled", 1).on().addValue("Disabled", 0).off();
		options.addComment(`This mod allows you to start your own lategame bioengineering project, focused around creating functional catgirls for recreational purposes. The ultimate dream of any anime-addicted billionaire. After enabling, bioengineering must be manually activated from the genelab through expensive upgrades to see any of the mod's content.`);

		el.append(options.render());
		return el;
	}

	function slavesContent() {
		const el = new DocumentFragment();
		let options = new App.UI.OptionsGroup();

		options.addOption("Dynasties of enslaved royalties are", "realRoyalties")
			.addValueList([
				["Historical", 1],
				["Random", 0]
			]);

		options.addOption("Schema for ordering slave names is", "surnameOrder")
			.addValueList([
				["Country of origin", 0],
				["Name Surname", 1],
				["Surname Name", 2]
			]);

		options.addOption("Successive breeding resulting in sub-average slaves is", "inbreeding")
			.addValue("Enabled", 1).on().addValue("Disabled", 0).off();

		el.append(options.render());

		App.UI.DOM.appendNewElement("h2", el, "Age");
		options = new App.UI.OptionsGroup();

		options.addOption("Slave aging", "seeAge")
			.addValue("Enabled", 1).on().addValue("Celebrate birthdays, but don't age.", 2).addValue("Disabled", 0).off();

		options.addOption("Slave age distribution", "pedo_mode").addComment("In loli mode most new slaves are under the age of 18. May not apply to custom slaves and slaves from specific events.")
			.addValue("Loli mode", 1, () => V.minimumSlaveAge = 5).addValue("Normal mode", 0);

		V.minimumSlaveAge = Math.clamp(V.minimumSlaveAge, 3, 18);
		options.addOption("Slaves appearing in the game will be no younger than", "minimumSlaveAge").showTextBox();

		options.addOption(`Molestation of slaves younger than ${V.minimumSlaveAge} is`, "extremeUnderage")
			.addValue("Permitted", 1).on().addValue("Forbidden", 0).off();

		V.retirementAge = Math.clamp(V.retirementAge, V.minimumSlaveAge + 1, 120);
		options.addOption("Initial retirement age will be at", "retirementAge")
			.addComment("May cause issues with New Game and initial slaves if set below 45.").showTextBox();

		V.idealAge = Math.clamp(V.idealAge, minAge, maxAge);
		options.addOption("Prime age of sexual appeal", "idealAge")
			.addComment("Perceived beauty will decrease the farther (younger or older) one's appearance is from the ideal.").showTextBox();

		V.fertilityAge = Math.clamp(V.fertilityAge, 3, 18);
		options.addOption("Slaves will not be able to become pregnant if their age is under", "fertilityAge").showTextBox();

		V.potencyAge = Math.clamp(V.potencyAge, 3, 18);
		options.addOption("Slaves will not be able to impregnate others if their age is under", "potencyAge").showTextBox();

		options.addOption("Age penalties are", "AgePenalty").addComment("Job and career penalties due to age.")
			.addValue("Enabled", 1).on().addValue("Disabled", 0).off();

		options.addOption("Children growing as they age is", "loliGrow")
			.addValue("Enabled", 1).on().addValue("Disabled", 0).off();

		el.append(options.render());

		return el;
	}

	/**
	 * @returns {DocumentFragment}
	 */
	function importExportContent() {
		const el = new DocumentFragment();

		App.UI.DOM.appendNewElement("div", el, "This functionality is currently experimental.", ["warning"]);

		const textareaElement = App.UI.DOM.makeElement("textarea", App.Intro.getNondefaultOptionsAsJSON());

		App.UI.DOM.appendNewElement("div", el,
			App.UI.DOM.link("Export game options", () => {
				textareaElement.value = App.Intro.getNondefaultOptionsAsJSON();
			})
		);
		App.UI.DOM.appendNewElement("div", el,
			App.UI.DOM.link(
				"Import game options",
				() => {
					const optionsFromJSON = JSON.parse(textareaElement.value);
					const tooltipsEnabled = V.tooltipsEnabled;
					App.Intro.assignOnlyMatchingKeys(V, optionsFromJSON, App.Data.defaultGameOptions);
					if (tooltipsEnabled !== V.tooltipsEnabled) {
						App.UI.GlobalTooltips.update();
					}
					if (V.secExpEnabled) {
						// App.Mods.SecExp.Obj.Init() is safe to call multiple times; it runs each time backward-compatibility is run.
						// This creates the options structure for the Security Expansion.
						App.Mods.SecExp.Obj.Init();
						App.Intro.assignOnlyMatchingKeys(V, optionsFromJSON, App.Data.defaultGameOptions);
					}
					if (V.targetArcology.fs !== "New") {
						// This is basically a general sanity-check-and-repair for established arcologies;
						// should we just always run this independent of import?
						if (!V.targetArcology.name) {
							V.targetArcology.name = App.Intro.getNameForArcology(V.targetArcology);
						}
						if (V.targetArcology.prosperity) {
							V.targetArcology.prosperity = Math.clamp(V.targetArcology.prosperity, 40, 60);
						} else {
							V.targetArcology.prosperity = either(40, 50, 60);
						}
						if (V.targetArcology.citizens) {
							V.targetArcology.citizens = Math.clamp(V.targetArcology.citizens, -1, 1);
						} else {
							V.targetArcology.citizens = random(-1, 1);
						}
						if (V.targetArcology.FSProgress) {
							V.targetArcology.FSProgress = Math.clamp(V.targetArcology.FSProgress, 10, 50);
						} else {
							V.targetArcology.FSProgress = either(10, 30, 50);
						}
						if (!App.Data.Arcology.Terrain.contains(V.targetArcology.terrain)) {
							V.targetArcology.terrain = App.Data.Arcology.Terrain.random();
						}
						V.terrain = V.targetArcology.terrain;
						if (!App.Data.Arcology.Continents.contains(V.targetArcology.continent)) {
							V.targetArcology.continent = App.Data.Arcology.Continents.random();
						}
						V.continent = V.targetArcology.continent;
						if (!V.targetArcology.language) {
							V.targetArcology.language = App.Intro.getLanguageForArcology(V.targetArcology);
						}
						V.language = V.targetArcology.language;
						const env = {terrain: V.targetArcology.terrain, established: true, fs: V.targetArcology.fs};
						const preset = App.Arcology.randomPreset(env).construct(env);
						V.targetArcology.building = preset.building;
						V.targetArcology.apply = preset.apply;
						V.targetArcology.apply(); // pretty sure this does nothing
					}
					App.UI.reload();
				}
			)
		);

		el.append(textareaElement);

		return el;
	}

	function continueNormal() {
		if (V.freshPC === 1 || V.saveImported === 0) {
			switch (V.PC.career) {
				case "arcology owner":
					V.PC.skill.trading = 100;
					V.PC.skill.warfare = 100;
					V.PC.skill.hacking = 100;
					V.PC.skill.slaving = 100;
					V.PC.skill.engineering = 100;
					V.PC.skill.medicine = 100;
					V.PC.skill.combat = 100;
					break;
				case "wealth":
					if (V.PC.vagina === 1) {
						V.PC.vagina = 2;
					}
					V.PC.weight = 60;
					V.PC.muscles = 0;
					break;
				case "trust fund":
					V.PC.intelligenceImplant = 15;
					V.PC.skill.warfare = -50;
					V.PC.skill.slaving = -50;
					V.PC.skill.engineering = -50;
					V.PC.skill.medicine = -50;
					V.PC.weight = 60;
					V.PC.muscles = 0;
					break;
				case "rich kid":
					V.PC.intelligenceImplant = 5;
					V.PC.skill.trading = -25;
					V.PC.skill.warfare = -100;
					V.PC.skill.slaving = -100;
					V.PC.skill.engineering = -100;
					V.PC.skill.medicine = -100;
					V.PC.skill.hacking = -25;
					V.PC.weight = 60;
					V.PC.muscles = 0;
					break;
				case "capitalist":
					V.PC.skill.trading = 100;
					V.PC.muscles = 0;
					break;
				case "entrepreneur":
					V.PC.intelligenceImplant = 15;
					V.PC.skill.trading = 50;
					V.PC.skill.warfare = -25;
					V.PC.skill.slaving = -25;
					V.PC.skill.engineering = -25;
					V.PC.skill.medicine = -25;
					V.PC.muscles = 0;
					break;
				case "business kid":
					V.PC.intelligenceImplant = 5;
					V.PC.skill.warfare = -80;
					V.PC.skill.slaving = -80;
					V.PC.skill.engineering = -100;
					V.PC.skill.medicine = -100;
					V.PC.skill.hacking = -20;
					V.PC.muscles = 0;
					break;
				case "mercenary":
					V.PC.skill.warfare = 100;
					V.PC.skill.combat = 70;
					V.PC.muscles = 50;
					break;
				case "recruit":
					V.PC.intelligenceImplant = 15;
					V.PC.skill.trading = -25;
					V.PC.skill.warfare = 50;
					V.PC.skill.slaving = -25;
					V.PC.skill.engineering = -25;
					V.PC.skill.medicine = -25;
					V.PC.skill.combat = 50;
					V.PC.muscles = 40;
					break;
				case "child soldier":
					V.PC.intelligenceImplant = 0;
					V.PC.skill.trading = -100;
					V.PC.skill.slaving = -80;
					V.PC.skill.engineering = -100;
					V.PC.skill.medicine = -100;
					V.PC.skill.hacking = -80;
					V.PC.skill.combat = 30;
					break;
				case "slaver":
					V.PC.skill.slaving = 100;
					V.PC.skill.combat = 50;
					V.PC.muscles = 50;
					break;
				case "slave overseer":
					V.PC.intelligenceImplant = 15;
					V.PC.skill.trading = -20;
					V.PC.skill.warfare = -20;
					V.PC.skill.slaving = 50;
					V.PC.skill.engineering = -25;
					V.PC.skill.medicine = -20;
					V.PC.skill.combat = 30;
					V.PC.muscles = 50;
					break;
				case "slave tender":
					V.PC.intelligenceImplant = 0;
					V.PC.skill.trading = -100;
					V.PC.skill.warfare = -100;
					V.PC.skill.engineering = -100;
					V.PC.skill.medicine = -60;
					V.PC.skill.hacking = -100;
					V.PC.muscles = 10;
					break;
				case "engineer":
					V.PC.skill.engineering = 100;
					break;
				case "construction":
					V.PC.intelligenceImplant = 15;
					V.PC.skill.trading = -25;
					V.PC.skill.warfare = -50;
					V.PC.skill.slaving = -25;
					V.PC.skill.engineering = 50;
					V.PC.skill.medicine = -25;
					V.PC.skill.hacking = -20;
					V.PC.muscles = 50;
					break;
				case "worksite helper":
					V.PC.intelligenceImplant = 0;
					V.PC.skill.trading = -80;
					V.PC.skill.warfare = -100;
					V.PC.skill.slaving = -100;
					V.PC.skill.engineering = 0;
					V.PC.skill.medicine = -100;
					V.PC.skill.hacking = -100;
					break;
				case "medicine":
					V.PC.skill.medicine = 100;
					V.PC.muscles = 0;
					V.consumerDrugs = 1;
					break;
				case "medical assistant":
					V.PC.intelligenceImplant = 15;
					V.PC.skill.trading = -25;
					V.PC.skill.warfare = -50;
					V.PC.skill.slaving = -25;
					V.PC.skill.engineering = -25;
					V.PC.skill.medicine = 50;
					V.PC.skill.hacking = -20;
					V.PC.muscles = 0;
					break;
				case "nurse":
					V.PC.intelligenceImplant = 5;
					V.PC.skill.trading = -100;
					V.PC.skill.warfare = -100;
					V.PC.skill.slaving = -100;
					V.PC.skill.engineering = -100;
					V.PC.skill.hacking = -20;
					V.PC.muscles = 0;
					break;
				case "celebrity":
					if (V.PC.vagina === 1) {
						V.PC.vagina = 2;
					}
					V.PC.muscles = -20;
					break;
				case "rising star":
					V.PC.intelligenceImplant = 15;
					V.PC.skill.trading = -50;
					V.PC.skill.warfare = -50;
					V.PC.skill.slaving = -50;
					V.PC.skill.engineering = -50;
					V.PC.skill.medicine = -50;
					V.PC.muscles = -20;
					break;
				case "child star":
					V.PC.intelligenceImplant = 0;
					V.PC.skill.trading = -100;
					V.PC.skill.warfare = -100;
					V.PC.skill.slaving = -100;
					V.PC.skill.engineering = -100;
					V.PC.skill.medicine = -100;
					V.PC.skill.hacking = -20;
					V.PC.muscles = 0;
					break;
				case "BlackHat":
					V.PC.skill.hacking = 100;
					V.PC.muscles = -20;
					break;
				case "hacker":
					V.PC.intelligenceImplant = 15;
					V.PC.skill.trading = -50;
					V.PC.skill.warfare = -50;
					V.PC.skill.slaving = -50;
					V.PC.skill.engineering = -50;
					V.PC.skill.medicine = -50;
					V.PC.skill.hacking = 50;
					V.PC.muscles = -20;
					break;
				case "script kiddy":
					V.PC.intelligenceImplant = 5;
					V.PC.skill.trading = -80;
					V.PC.skill.warfare = -100;
					V.PC.skill.slaving = -80;
					V.PC.skill.engineering = -100;
					V.PC.skill.medicine = -100;
					V.PC.skill.hacking = 20;
					V.PC.muscles = -20;
					break;
				case "escort":
					if (V.PC.vagina >= 0) {
						V.PC.vagina = 4;
					}
					V.PC.anus = 1;
					V.PC.clothes = "a slutty outfit";
					V.PC.intelligenceImplant = 15;
					V.PC.skill.trading = 50;
					V.PC.skill.warfare = -100;
					V.PC.skill.slaving = -100;
					V.PC.skill.engineering = -100;
					V.PC.skill.medicine = 10;
					V.PC.skill.hacking = 10;
					V.PC.muscles = 0;
					break;
				case "prostitute":
					if (V.PC.vagina >= 0) {
						V.PC.vagina = 3;
					}
					V.PC.anus = 1;
					V.PC.clothes = "a slutty outfit";
					V.PC.intelligenceImplant = 0;
					V.PC.skill.warfare = -100;
					V.PC.skill.slaving = -100;
					V.PC.skill.engineering = -100;
					V.PC.skill.medicine = -50;
					V.PC.skill.hacking = -20;
					V.PC.muscles = 0;
					break;
				case "child prostitute":
					if (V.PC.vagina >= 0) {
						V.PC.vagina = 2;
					}
					V.PC.anus = 1;
					V.PC.clothes = "a slutty outfit";
					V.PC.intelligenceImplant = 0;
					V.PC.skill.trading = -50;
					V.PC.skill.warfare = -100;
					V.PC.skill.slaving = -100;
					V.PC.skill.engineering = -100;
					V.PC.skill.medicine = -100;
					V.PC.skill.hacking = -80;
					V.PC.muscles = -20;
					break;
				case "servant":
					V.PC.clothes = "a nice maid outfit";
					V.PC.intelligenceImplant = 0;
					if (V.PC.vagina >= 1) {
						V.PC.vagina = 3;
					}
					if (V.PC.vagina >= 0) {
						V.PC.geneticQuirks.fertility = 2;
					} else {
						V.PC.geneticQuirks.fertility = 1;
					}
					V.PC.skill.trading = -100;
					V.PC.skill.warfare = -100;
					V.PC.skill.slaving = -100;
					V.PC.skill.engineering = -100;
					V.PC.skill.medicine = -100;
					V.PC.skill.hacking = -100;
					V.PC.muscles = 0;
					V.PC.digestiveSystem = "atrophied";
					break;
				case "handmaiden":
					V.PC.clothes = "a nice maid outfit";
					V.PC.intelligenceImplant = 0;
					if (V.PC.vagina >= 1) {
						V.PC.vagina = 3;
					}
					if (V.PC.vagina >= 0) {
						V.PC.geneticQuirks.fertility = 2;
					} else {
						V.PC.geneticQuirks.fertility = 1;
					}
					V.PC.skill.trading = -100;
					V.PC.skill.warfare = -100;
					V.PC.skill.slaving = -100;
					V.PC.skill.engineering = -100;
					V.PC.skill.medicine = -100;
					V.PC.skill.hacking = -100;
					V.PC.muscles = 0;
					V.PC.geneticQuirks.fertility = 1;
					V.PC.digestiveSystem = "atrophied";
					break;
				case "child servant":
					V.PC.clothes = "a nice maid outfit";
					V.PC.intelligenceImplant = 0;
					if (V.PC.vagina >= 1) {
						V.PC.vagina = 2;
					}
					if (V.PC.vagina >= 0) {
						V.PC.geneticQuirks.fertility = 2;
					} else {
						V.PC.geneticQuirks.fertility = 1;
					}
					V.PC.skill.trading = -100;
					V.PC.skill.warfare = -100;
					V.PC.skill.slaving = -100;
					V.PC.skill.engineering = -100;
					V.PC.skill.medicine = -100;
					V.PC.skill.hacking = -100;
					V.PC.muscles = 0;
					V.PC.geneticQuirks.fertility = 1;
					V.PC.digestiveSystem = "atrophied";
					break;
				case "gang":
					if (V.PC.vagina === 1) {
						V.PC.vagina = 2;
					}
					V.PC.intelligenceImplant = 15;
					V.PC.skill.trading = 50;
					V.PC.skill.warfare = 50;
					V.PC.skill.slaving = 50;
					V.PC.skill.engineering = -100;
					V.PC.skill.hacking = 50;
					V.PC.skill.combat = 50;
					V.PC.muscles = 60;
					break;
				case "hoodlum":
					V.PC.intelligenceImplant = 0;
					V.PC.skill.warfare = -20;
					V.PC.skill.slaving = -20;
					V.PC.skill.engineering = -100;
					V.PC.skill.medicine = -50;
					V.PC.skill.hacking = 0;
					V.PC.skill.combat = 30;
					break;
				case "street urchin":
					V.PC.intelligenceImplant = 0;
					V.PC.skill.trading = -20;
					V.PC.skill.warfare = -40;
					V.PC.skill.slaving = -80;
					V.PC.skill.engineering = -100;
					V.PC.skill.medicine = -100;
					V.PC.skill.hacking = -100;
					V.PC.skill.combat = 10;
					break;
				case "test subject":
					V.PC.intelligenceImplant = 0;
					V.PC.skill.trading = -100;
					V.PC.skill.warfare = -100;
					V.PC.skill.slaving = -100;
					V.PC.skill.engineering = -100;
					V.PC.skill.medicine = -100;
					V.PC.skill.hacking = -100;
					V.PC.muscles = -100;
					V.PC.boobs = 50000;
					V.PC.lactation = 1;
					V.PC.lactationAdaptation = 100;
					if (V.PC.pubertyXX === 1) {
						V.PC.pregType = 100;
						V.PC.preg = 27;
					} else {
						V.PC.bellyImplant = 800000;
					}
					V.PC.pregAdaptation = 200;
					V.PC.hips = 3;
					V.PC.butt = 20;
					V.PC.dick = 50;
					V.PC.balls = 100;
					V.PC.weight = 200;
					V.PC.digestiveSystem = "atrophied";
					break;
			}
			if (V.PC.rumor === "diligence") {
				V.PC.weight = 0;
				if (V.PC.muscles < 30) {
					V.PC.muscles += 20;
				}
			} else if (V.PC.rumor === "force") {
				V.PC.muscles += 20;
			}
			// I hope this works
			PCDatatypeCleanup(V.PC);

			if (V.PC.dick >= 3) {
				V.PC.geneticQuirks.wellHung = 2;
			}
			if (V.PC.title === 0) {
				V.PC.hLength = 15;
				V.PC.waist = -20;
				V.PC.voice = 2;
			}
			if (V.PC.eye.right.vision === 1 || V.PC.eye.left.vision === 1) {
				V.PC.eyewear = "corrective glasses";
			}
			if (V.PC.physicalAge >= 14) {
				if (V.PC.balls > 0) {
					V.PC.pubertyXY = 1;
				}
				if (V.PC.ovaries > 0) {
					V.PC.pubertyXX = 1;
				}
			}
			if (V.PC.pubertyXX === 0 && V.PC.pubertyXY === 0) {
				if (V.PC.physicalAge < 11) {
					V.PC.energy = 20;
				} else if (V.PC.physicalAge < 12) {
					V.PC.energy = 30;
				} else if (V.PC.physicalAge < 13) {
					V.PC.energy = 40;
				}
			}
			if (V.PC.genes === "XX") {
				if (V.PC.ovaries === 1 && V.PC.pubertyXX > 0) {
					if (V.PC.balls > 0 && V.PC.pubertyXY > 0) {
						V.PC.hormoneBalance = 10;
					} else {
						V.PC.hormoneBalance = 50;
					}
				} else if (V.PC.balls > 0 && V.PC.pubertyXY > 0) {
					V.PC.hormoneBalance = -30;
				} else {
					V.PC.hormoneBalance = 10;
				}
			} else if (V.PC.genes === "XY") {
				if (V.PC.ovaries === 1 && V.PC.pubertyXX > 0) {
					if (V.PC.balls > 0 && V.PC.pubertyXY > 0) {
						V.PC.hormoneBalance = -10;
					} else {
						V.PC.hormoneBalance = 30;
					}
				} else {
					if (V.PC.balls > 0 && V.PC.pubertyXY > 0) {
						V.PC.hormoneBalance = -50;
					} else {
						V.PC.hormoneBalance = -10;
					}
				}
			}
			if (V.PC.preg > 0 && V.PC.preg > V.PC.pregData.normalBirth / 2) {
				V.PC.lactation = 1;
			}
			if (V.PC.pubertyXX === 1 && V.PC.physicalAge < V.PC.pubertyAgeXX) {
				V.PC.pubertyAgeXX = 8;
			}
			if (V.PC.pubertyXY === 1 && V.PC.physicalAge < V.PC.pubertyAgeXY) {
				V.PC.pubertyAgeXY = 8;
			}
			V.genePool.push(clone(V.PC));
		}

		V.PC.birthName = V.PC.slaveName;
		V.PC.birthSurname = V.PC.slaveSurname;

		if (V.saveImported === 1 && V.freshPC === 0 && V.PC.rules.living !== "luxurious") {
			if (V.PC.rules.living === "spare") {
				V.PC.rules.living = "normal";
			} else {
				V.PC.rules.living = "luxurious";
			}
		} else if (["celebrity", "child star", "rich kid", "rising star", "trust fund", "wealth"].includes(V.PC.career)) {
			V.PC.rules.living = "normal";
		} else {
			V.PC.rules.living = "spare";
		}
		App.Intro.initNationalities();
		SectorCounts(); // Update AProsperityCap
	}
};
/**
 * @param {boolean} isIntro
 * @returns {DocumentFragment}
 */
App.Intro.economy = function(isIntro) {
	const el = new DocumentFragment();
	App.UI.DOM.appendNewElement("h2", el, "Economy");

	let options = new App.UI.OptionsGroup();

	options.addOption("The difficulty setting is currently set to", "baseDifficulty")
		.addValue("Very Easy", 1, () => V.economy = 200)
		.addValue("Easy", 2, () => V.economy = 125)
		.addValue("Default Difficulty", 3, () => V.economy = 100)
		.addValue("Hard", 4, () => V.economy = 80)
		.addValue("Very Hard", 5, () => V.economy = 67);

	V.localEcon = V.economy;
	options.addOption("Economic climate: ", "economy")
		.addValue("Very Easy", 200).customDescription("Not truly dire. Not yet.")
		.addValue("Easy", 125).customDescription("Getting a touch dire.")
		.addValue("Default Difficulty", 100).customDescription("Very serious.")
		.addValue("Hard", 80).customDescription("It won't be pretty.")
		.addValue("Very Hard", 67).customDescription("This is the last dance.");

	if (V.difficultySwitch === 1) {
		V.econAdvantage = -2;
	}
	if (V.difficultySwitch === 0) {
		V.econRate = 0;
	}
	options.addOption("Economic forecast", "econRate").addComment("Some economic content requires this to be set to harder than vanilla")
		.addValue("Vanilla", 0, () => V.difficultySwitch = 0)
		.addValue("Easy", 1, () => V.difficultySwitch = 1)
		.addValue("Default", 2, () => V.difficultySwitch = 1)
		.addValue("Hard", 4, () => V.difficultySwitch = 1);

	/* Not functional yet
	All the things you need to run your arcology are getting more expensive
	if (V.incomeMod === 0) {
		while all forms of income <strong>remain static</strong>.
			[[Easier|Intro Summary][V.incomeMod = 1]]
	} else if (V.incomeMod === 1) {
		while all forms of income <strong>rise but cannot keep pace</strong>.
		[[Harder|Intro Summary][V.incomeMod = 0]] | [[Easier|Intro Summary][V.incomeMod = 2]]
	} else {
		but luckily all forms of income <strong>rise in lockstep</strong>.
		[[Harder|Intro Summary][V.incomeMod = 1]]
	}
	*/

	if (isIntro) {
		setup();
	}

	// changing between standard and custom variety, or between standard variety settings, would require rerunning initNationalities(), and that resets LOTS of shit that shouldn't be done during a game.
	// TODO: consider splitting up initNationalities so you can cheat variety settings correctly
	if (isIntro) {
		if (!V.customVariety) {
			options.addCustomOption("You are using standardized slave trading channels.")
				.addButton("Customize the slave trade", () => { V.customVariety = 1; V.customWA = 0; }, "Customize Slave Trade");

			options.addOption("", "internationalTrade")
				.addValue("Allow intercontinental trade", 1).on().customDescription("The slave trade is <strong>international,</strong> so a wider variety of slaves will be available.")
				.addValue("Restrict the trade to continental", 0).off().customDescription("The slave trade is <strong>continental,</strong> so a narrower variety of slaves will be available.");

			if (V.internationalTrade === 1) {
				options.addOption("International slave variety is", "internationalVariety")
					.addValue("Normalized national variety", 1).customDescription("<strong>normalized,</strong> so small nations will appear nearly as much as large ones.")
					.addValue("Semi-realistic national variety", 0).customDescription("<strong>semi-realistic,</strong> so more populous nations will be more common.");
			}
		} else {
			options.addCustomOption("Nationality distributions are customized.")
				.addButton("Adjust the slave trade", () => { V.customWA = 0; V.customVariety = 1; }, "Customize Slave Trade")
				.addButton("Stop customizing", () => { delete V.customVariety; });
		}
	}

	if (V.customVariety) {
		options.addCustom(App.UI.nationalitiesDisplay());
	}

	options.addOption("", "plot")
		.addValue("Enable non-erotic events", 1).on().customDescription("Game mode: <strong>two-handed</strong>. Includes non-erotic events concerning the changing world.")
		.addValue("Disable non-erotic events", 0).off().customDescription("Game mode: <strong>one-handed</strong>. No non-erotic events concerning the changing world.");

	el.append(options.render());
	return el;

	function setup() {
		V.mods.food.cost = Math.trunc(2500 / V.economy);
		V.drugsCost = Math.trunc(10000 / V.economy);
		V.rulesCost = Math.trunc(10000 / V.economy);
		V.modCost = Math.trunc(5000 / V.economy);
		V.surgeryCost = Math.trunc(30000 / V.economy);
	}
};

App.Intro.arcDefault = function() {
	App.Intro.assignOnlyMatchingKeys(V, App.Data.defaultGameOptions, App.Data.defaultGameOptions);
	// Q: lol, what?
	// A: No, there really is a reason for this. If we just Object.assign(V, App.Data.defaultGameOptions),
	// then V.PC will be overwritten with App.Data.defaultGameOptions.PC.
	// But V.PC is a complex object with many not-necessarily-editable properties (must like V itself),
	// whereas App.Data.defaultGameOptions.PC is a simple object with only properties that should be editable.
	// Similarly for V.SF.
	App.UI.GlobalTooltips.update();
};
