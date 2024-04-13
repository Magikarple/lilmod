// cSpell:ignore SSAA

App.UI.optionsPassage = function() {
	const el = new DocumentFragment();
	App.UI.DOM.appendNewElement("h1", el, `Game Options`);
	App.Utils.PassageSwitchHandler.set(App.EventHandlers.optionsChanged);
	el.append(intro());

	try {
		const tabBar = new App.UI.Tabs.TabBar("Options");
		tabBar.addTab("Display", "display", App.Intro.display(false));
		tabBar.addTab("Content & Flavour", "content-flavor", App.Intro.contentAndFlavor(false));
		tabBar.addTab("Mods", "mods", mods());
		tabBar.addTab("Debug & Cheating", "debug-cheating", debugCheating());
		if (V.cheatMode) {
			tabBar.addTab("Cheats", "cheat", cheat());
			tabBar.addTab("Cheat Edit Schools", "cheat-school", cheatSchools());
		}
		tabBar.addTab("New Game Plus", "new-game-plus", newGamePlus());
		tabBar.addTab("Experimental", "experimental", experimental());
		el.append(tabBar.render());
	} catch (e) {
		App.UI.DOM.appendNewElement("p", el,
			"Options cannot be displayed. Try running Backwards Compatibility and see if the problem persists.",
			["bold", "error"]);
		el.append(App.UI.DOM.formatException(e));
	}
	return el;

	/**
	 * @returns {DocumentFragment} the header for the `Game Options` menu
	 */
	function intro() {
		const el = new DocumentFragment();

		const options = new App.UI.OptionsGroup();
		options.addOption("End of week autosaving is currently", "autosave")
			.addValue("Enabled", 1).on().addValue("Disabled", 0).off();
		el.append(options.render());

		const table = App.UI.DOM.appendNewElement("table", el);
		fillRow([
			`You are currently playing:`,
			`FC version: ${App.Version.base},`,
			`mod version: ${App.Version.pmod},`,
			`build: ${App.Version.release}${App.Version.commitHash ? `, commit: ${App.Version.commitHash}` : ``}.`
		]);
		fillRow([
			`This save was created using:`,
			App.UI.DOM.makeElement("span", `FC version: ${V.ver},`, (V.ver !== App.Version.base) ? ["yellow"] : null),
			``,
			App.UI.DOM.makeElement("span", `build: ${V.releaseID}.`, (V.releaseID !== App.Version.release) ? ["red"] : null)
		]);

		/**
		 * Creates a html table row and fills it with contents
		 * @param {any[]} contents
		 */
		function fillRow(contents) {
			const row = App.UI.DOM.appendNewElement("tr", table);
			for (const content of contents) {
				App.UI.DOM.appendNewElement("td", row, content);
			}
		}

		const links = [];
		links.push(App.UI.DOM.passageLink("Apply Backwards Compatibility Update", "Backwards Compatibility"));

		links.push(
			App.UI.DOM.link(
				`Reset extended family mode controllers`,
				() => {
					resetFamilyCounters();
					const span = document.createElement("span");
					span.classList.add("note");
					App.UI.DOM.appendNewElement("span", span, "Done: ", ["lightgreen"]);
					span.append("all family relations flushed and rebuilt.");
					jQuery(results).empty().append(span);
				},
				[],
				"",
				"Clears and rebuilds .sister and .daughter tracking."
			)
		);

		if (isNaN(V.rep)) {
			links.push(
				App.UI.DOM.link(
					`Reset Reputation (${V.rep})`,
					() => {
						V.rep = 0;
						jQuery(results).empty().append(`Reputation reset to ${V.rep}`);
					},
					[],
					"Options"
				)
			);
		}

		if (isNaN(V.rep)) {
			links.push(
				App.UI.DOM.link(
					`Reset Money (${V.cash})`,
					() => {
						V.cash = 500;
						jQuery(results).empty().append(`Cash reset to ${V.cash}`);
					},
					[],
					"Options"
				)
			);
		}

		const div = App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(links), ["margin-bottom"]);
		// Results
		const results = App.UI.DOM.appendNewElement("div", div);

		return el;
	}

	/**
	 * @returns {DocumentFragment} the contents of the `Mods` tab for the `Game Options` menu
	 */
	function mods() {
		const el = new DocumentFragment();
		let options;
		let option;

		options = new App.UI.OptionsGroup();

		options.addOption("The Special Force Mod is currently", "Toggle", V.SF)
			.addValue("Enabled", 1).on().addValue("Disabled", 0).off()
			.addComment("<div>This mod is triggered after week 72. It is non-canon where it conflicts with canonical updates to the base game.</div>");

		options.addOption("The Security Expansion mod is", "secExpEnabled")
			.addValue("Enabled", 1).on()
			.addValue("Disabled", 0).off()
			.addComment("<div>The mod can be activated in any moment, but it may result in unbalanced gameplay if activated very late in the game.</div><span class='yellow'>After enabling mid-game please run re-run BC Update.</span>");

		option = options.addOption("Catmod is currently", "seeCats")
			.addValue("Enabled", 1).on().addValue("Disabled", 0).off();
		if (V.seeCats) {
			option.addComment(`Disabling Catmod will not murder existing catgirls, you have to do that yourself. <span style="font-style:normal">😿</span>`);
		}

		options.addOption("The food system is", "enabled", V.mods.food)
			.addValue("Enabled", true).on().addValue("Disabled", false).off()
			.addComment("This will enable the food supply and demand system.");

		el.append(options.render());

		if (V.secExpEnabled > 0) {
			App.UI.DOM.appendNewElement("h2", el, `Security Expansion mod options`);
			options = new App.UI.OptionsGroup();

			if (V.SecExp.settings.battle.enabled > 0 || V.SecExp.settings.rebellion.enabled > 0) {
				options.addOption("Detailed battle statistics are", "showStats", V.SecExp.settings)
					.addValue("Shown", 1).on().addValue("Hidden", 0).off()
					.addComment("Visibility of detailed statistics and battle turns.");

				options.addOption("Difficulty is", "difficulty", V.SecExp.settings)
					.addValueList([["Extremely hard", 2], ["Very hard", 1.5], ["Hard", 1.25], ["Normal", 1], ["Easy", 0.75], ["Very easy", 0.5]]);

				options.addOption("Unit descriptions are", "unitDescriptions", V.SecExp.settings)
					.addValue("Abbreviated", 1).addValue("Summarized", 0);
			}

			options.addOption("Battles are", "enabled", V.SecExp.settings.battle)
				.addValue("Enabled", 1).on().addValue("Disabled", 0).off();

			options.addOption("Rebellions are", "enabled", V.SecExp.settings.rebellion)
				.addValue("Enabled", 1).on().addValue("Disabled", 0).off();

			if (V.SecExp.settings.battle.enabled > 0) {
				options.addOption("Battle frequency", "frequency", V.SecExp.settings.battle)
					.addValueList([["Extremely high", 2], ["Very high", 1.5], ["High", 1.25], ["Normal", 1], ["Low", 0.75], ["Very low", 0.5]]);
			}

			if (V.SecExp.settings.rebellion.enabled > 0) {
				options.addOption("Rebellion buildup", "speed", V.SecExp.settings.rebellion)
					.addValueList([["Extremely fast", 2], ["Very fast", 1.5], ["Fast", 1.25], ["Normal", 1], ["Slow", 0.75], ["Very slow", 0.5]]);
			}

			if (V.SecExp.settings.battle.enabled > 0) {
				options.addOption("Commanders gain a prestige rank every 10 victories", "allowSlavePrestige", V.SecExp.settings.battle)
					.addValue("Yes", 1).on().addValue("No", 0).off();
			}

			if (V.SecExp.settings.battle.enabled > 0) {
				options.addOption("Force battles", "force", V.SecExp.settings.battle)
					.addValue("Yes", 1).on().addValue("No", 0).off();
			}
			if (V.SecExp.settings.rebellion.enabled > 0) {
				options.addOption("Force rebellions", "force", V.SecExp.settings.rebellion)
					.addValue("Yes", 1).on().addValue("No", 0).off()
					.addComment("Rebellions take precedence over Battles.");
			}

			if (V.SecExp.settings.battle.enabled > 0) {
				options.addOption("Late game major battles are", "enabled", V.SecExp.settings.battle.major)
					.addValue("Enabled", 1).on().addValue("Disabled", 0).off()
					.addComment("More likely after week 120");
			}

			if (V.SecExp.settings.battle.enabled > 0 && V.SecExp.settings.battle.major.enabled > 0) {
				options.addOption("Multiplier is", "mult", V.SecExp.settings.battle.major)
					.addValueList([["Extremely high", 2], ["Very high", 1.5], ["High", 1.25], ["Normal", 1], ["Low", 0.75], ["Very low", 0.5]]);

				options.addOption("This week a major battle is", "force", V.SecExp.settings.battle.major)
					.addValue("Guaranteed", 1).on().addValue("Not guaranteed", 0).off();
			}

			if (V.SecExp.settings.battle.enabled > 0 && V.SecExp.settings.battle.major.enabled > 0) {
				options.addOption("Gameover on battle loss", "gameOver", V.SecExp.settings.battle.major)
					.addValue("Yes", 1).on().addValue("No", 0).off();
			}

			if (V.SecExp.settings.rebellion.enabled > 0) {
				options.addOption("Gameover on rebellion loss", "gameOver", V.SecExp.settings.rebellion)
					.addValue("Yes", 1).on().addValue("No", 0).off();
			}

			el.append(options.render());

			const subHeading = document.createElement("div");
			subHeading.classList.add("subHeading");

			if (V.debugMode || V.cheatMode || V.cheatModeM) {
				App.UI.DOM.appendNewElement("div", subHeading, "Debug/cheat", ["bold"]);
				let td;
				let links;
				const table = document.createElement("table");
				table.classList.add("invisible");
				el.append(table);

				let tr = document.createElement("tr");
				tr.style.textAlign = "center";

				td = createTd();
				links = [];
				links.push(
					App.UI.DOM.link(
						"Set loyalty high",
						() => {
							changeLoyalty("high");
						},
						[],
						"Options"
					)
				);
				links.push(
					App.UI.DOM.link(
						"Set loyalty average",
						() => {
							changeLoyalty("average");
						},
						[],
						"Options"
					)
				);
				links.push(
					App.UI.DOM.link(
						"Set loyalty low",
						() => {
							changeLoyalty("low");
						},
						[],
						"Options"
					)
				);
				links.push(
					App.UI.DOM.link(
						"Randomize loyalty",
						() => {
							changeLoyalty("random");
						},
						[],
						"Options"
					)
				);

				td.append(App.UI.DOM.generateLinksStrip(links));
				tr.append(td);
				table.append(tr);

				tr = document.createElement("tr");
				tr.style.textAlign = "center";
				td = createTd();
				links = [];
				links.push(App.UI.DOM.link(
					"Give Authority",
					() => {
						App.Mods.SecExp.authorityX(1000);
					},
					[],
					"Options"
				));
				links.push(App.UI.DOM.link(
					"Remove Authority",
					() => {
						App.Mods.SecExp.authorityX(-1000);
					},
					[],
					"Options"
				));
				td.append(App.UI.DOM.generateLinksStrip(links));
				tr.append(td);
				table.append(tr);

				tr = document.createElement("tr");
				td = document.createElement("td");
				td.style.textAlign = "right";
				links = [];
				links.push(App.UI.DOM.link(
					"Raise security",
					() => {
						V.SecExp.core.security = Math.clamp(V.SecExp.core.security + 5, 0, 100);
					},
					[],
					"Options"
				));
				links.push(App.UI.DOM.link(
					"Lower security",
					() => {
						V.SecExp.core.security = Math.clamp(V.SecExp.core.security - 5, 0, 100);
					},
					[],
					"Options"
				));
				tr.append(App.UI.DOM.generateLinksStrip(links));
				tr.append(td);

				td = document.createElement("td");
				td.style.textAlign = "left";
				links = [];
				links.push(App.UI.DOM.link(
					"Raise crime",
					() => {
						V.SecExp.core.crimeLow = Math.clamp(V.SecExp.core.crimeLow + 5, 0, 100);
					},
					[],
					"Options"
				));
				links.push(App.UI.DOM.link(
					"Lower crime",
					() => {
						V.SecExp.core.crimeLow = Math.clamp(V.SecExp.core.crimeLow - 5, 0, 100);
					},
					[],
					"Options"
				));
				tr.append(App.UI.DOM.generateLinksStrip(links));
				tr.append(td);
				table.append(tr);

				tr = document.createElement("tr");
				td = document.createElement("td");
				td.style.textAlign = "right";
				links = [];
				links.push(App.UI.DOM.link(
					"Give militia manpower",
					() => {
						V.SecExp.units.militia.free += 30;
					},
					[],
					"Options"
				));
				links.push(App.UI.DOM.link(
					"Remove militia manpower",
					() => {
						V.SecExp.units.militia.free = Math.max(V.SecExp.units.militia.free - 30, 0);
					},
					[],
					"Options"
				));
				tr.append(App.UI.DOM.generateLinksStrip(links));
				tr.append(td);

				td = document.createElement("td");
				td.style.textAlign = "left";
				links = [];
				links.push(App.UI.DOM.link(
					"Give mercs manpower",
					() => {
						V.SecExp.units.mercs.free += 30;
					},
					[],
					"Options"
				));
				links.push(App.UI.DOM.link(
					"Remove mercs manpower",
					() => {
						V.SecExp.units.mercs.free = Math.max(V.SecExp.units.mercs.free - 30, 0);
					},
					[],
					"Options"
				));
				tr.append(App.UI.DOM.generateLinksStrip(links));
				tr.append(td);
				table.append(tr);
				subHeading.append(table);
				el.append(subHeading);
			}	/* closes cheatmode check */
		} /* closes SecExp check*/
		return el;

		/**
		 * creates a html table cell and returns it
		 * @returns {HTMLTableCellElement}
		 */
		function createTd() {
			const td = document.createElement("td");
			td.style.columnSpan = "2";
			return td;
		}

		/**
		 *
		 * @param {"high"|"average"|"low"|"random"} level
		 */
		function changeLoyalty(level) {
			const numberMap = new Map([
				["high", [80, 100]],
				["average", [40, 60]],
				["low", [20]],
				["random", [100]],
			]);

			App.Mods.SecExp.unit.squads("human").forEach(u => u.loyalty = numberGenerator());
			/**
			 * returns a randomized value based off level and numberMap
			 * @returns {number}
			 */
			function numberGenerator() {
				const range = numberMap.get(level);
				if (range[1]) {
					return random(range[0], range[1]);
				} else {
					return random(range[0]);
				}
			}
		}
	}

	/**
	 * @returns {DocumentFragment} the contents of the `Cheats` tab for the `Game Options` menu
	 */
	function cheat() {
		const el = new DocumentFragment();
		const options = new App.UI.OptionsGroup();
		options.addOption("Corporation: Divisions generate overhead costs", "disableOverhead", V.corp)
			.addValue("Yes", 0).on()
			.addValue("No", 1).off();
		options.addOption("Arcology sex slaves", "NPCSlaves").showTextBox();
		options.addOption("Arcology prosperity cap", "AProsperityCap").showTextBox();
		options.addOption("Shelter Abuse Counter", "shelterAbuse").showTextBox();
		el.append(options.render());

		el.append(App.Intro.economy(false));
		return el;
	}

	/**
	 * @returns {DocumentFragment} the contents of the `Cheat edit schools` tab for the `Game Options` menu
	 */
	function cheatSchools() {
		const el = new DocumentFragment();
		const options = new App.UI.OptionsGroup();
		options.addCustom(App.UI.DOM.makeElement("h2", "Schools"));
		for (const [key, obj] of App.Data.misc.schools) {
			if (typeof obj.requirements === "function" && !obj.requirements()) {
				continue;
			}
			options.addCustom(App.UI.DOM.makeElement("h3", obj.title));
			options.addOption("Students Bought", "studentsBought", V[key]).showTextBox();
			options.addOption("Upgrades", "schoolUpgrade", V[key])
				.addValueList([
					["None", 0],
					["Partial", 1],
					["Full", 2],
				]);
			options.addOption("Moved to arcology", "schoolPresent", V[key])
				.addValue("No", 0).off()
				.addValue("Yes", 1).on();
			options.addOption("Prosperity", "schoolProsperity", V[key]).showTextBox();
			options.addOption("Failed", "schoolAnnexed", V[key])
				.addValue("No", 0).off()
				.addValue("Yes", 1).on();
		}
		el.append(options.render());
		return el;
	}

	/**
	 * @returns {DocumentFragment} the contents of the `Debug & cheating` tab for the `Game Options` menu
	 */
	function debugCheating() {
		const el = new DocumentFragment();
		let options;
		let option;
		let links;
		let r;
		const popCap = menialPopCap();

		App.UI.DOM.appendNewElement("h2", el, `Debug`);

		options = new App.UI.OptionsGroup();

		options.addOption("DebugMode is", "debugMode")
			.addValue("Enabled", 1).on().addValue("Disabled", 0).off()
			.addComment("This will add passages to Display Variables and create Bug Reports to the sidebar.");

		if (V.debugMode > 0) {
			options.addOption("<span class='choices'>The custom function part of debug mode is</span>", "debugModeCustomFunction")
				.addValue("Enabled", 1).on().addValue("Disabled", 0).off();
			options.addOption("<span class='choices'>Event selection is</span>", "debugModeEventSelection")
				.addValue("Manual", 1).on().addValue("Automatic", 0).off();
		}

		option = options.addCustomOption("Genetics array");
		if (V.cheatMode === 1) {
			option.addButton("Edit Genetics", () => { }, "Edit Genetics");
		} else {
			option.addComment("Enable cheat mode to edit genetics.");
		}

		options.addCustomOption("Rules Assistant").addButton("Reset Rules", () => { initRules(); }, "Rules Assistant");

		options.addOption("Passage Profiler is", "profiler")
			.addValue("Enabled", 1).on().addValue("Disabled", 0).off()
			.addComment("Outputs performance data at the bottom of every passage.");

		el.append(options.render());

		App.UI.DOM.appendNewElement("h2", el, `Cheating`);

		options = new App.UI.OptionsGroup();

		options.addOption("CheatMode is", "cheatMode")
			.addValue("Enabled", 1).on().addValue("Disabled", 0).off()
			.addComment("This will unlock some options that would usually be restricted by progress.");

		if (V.cheatMode === 0) {
			el.append(options.render());
		} else {
			options.addOption("Sidebar Cheats are currently", "cheatModeM")
				.addValue("Shown", 1).on().addValue("Hidden", 0).off();

			options.addOption("Slave aging", "seeAge")
				.addValue("Enabled", 1).on().addValue("Celebrate birthdays, but don't age.", 2).addValue("Disabled", 0).off();

			el.append(options.render());

			links = [];

			links.push(
				App.UI.DOM.link(
					`Add ${commaNum(100000)} money`,
					() => {
						V.cheater = 1;
						cashX(100000, "cheating");
					},
					[],
					"Options"
				)
			);

			links.push(
				App.UI.DOM.link(
					`Add ${commaNum(10000)} rep`,
					() => {
						V.cheater = 1;
						repX(10000, "cheating");
					},
					[],
					"Options"
				)
			);

			r = [];
			r.push(App.UI.DOM.generateLinksStrip(links));
			r.push(App.UI.DOM.makeElement("span", "Cheating will be flagged in your save", "note"));
			App.Events.addNode(el, r, "div", "scLink2");

			SectorCounts();

			links = [];
			links.push(
				App.UI.DOM.link(
					"Raise prosperity cap",
					() => {
						V.AProsperityCapModified += 10;
					},
					[],
					"Options"
				)
			);

			links.push(
				App.UI.DOM.link(
					"Lower prosperity cap",
					() => {
						V.AProsperityCapModified -= 10;
					},
					[],
					"Options"
				)
			);
			App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(links), "scLink2");

			links = [];
			links.push(
				App.UI.DOM.link(
					"Raise prosperity",
					() => {
						V.arcologies[0].prosperity = Math.clamp(V.arcologies[0].prosperity + 10, 0, V.AProsperityCap);
					},
					[],
					"Options"
				)
			);

			links.push(
				App.UI.DOM.link(
					"Lower prosperity",
					() => {
						V.arcologies[0].prosperity = Math.clamp(V.arcologies[0].prosperity - 10, 0, V.AProsperityCap);
					},
					[],
					"Options"
				)
			);
			App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(links), "scLink2");

			links = [];
			links.push(
				App.UI.DOM.link(
					"Give menial slaves",
					() => {
						V.menials = Math.clamp(V.menials + 30, 0, popCap.value);
					},
					[],
					"Options"
				)
			);

			links.push(
				App.UI.DOM.link(
					"Remove menial slaves",
					() => {
						V.menials = Math.clamp(V.menials - 30, 0, popCap.value);
					},
					[],
					"Options"
				)
			);
			App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(links), "scLink2");

			links = [];

			// Will no longer work as intended due to population changes
			links.push(
				App.UI.DOM.link(
					"Add citizens",
					() => {
						V.lowerClass = Math.max(V.lowerClass + 200, 0);
					},
					[],
					"Options"
				)
			);

			// also no longer properly functional
			links.push(
				App.UI.DOM.link(
					"Remove citizens",
					() => {
						V.lowerClass = Math.max(V.lowerClass - 200, 0);
					},
					[],
					"Options"
				)
			);
			App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(links), "scLink2");

			links = [];
			// Will work to a limited degree, minimums and maximums for slaves are set through population
			links.push(
				App.UI.DOM.link(
					"Add slaves",
					() => {
						V.NPCSlaves = Math.max(V.NPCSlaves + 200, 0);
					},
					[],
					"Options"
				)
			);

			// Will work to a limited degree
			links.push(
				App.UI.DOM.link(
					"Remove slaves",
					() => {
						V.NPCSlaves = Math.max(V.NPCSlaves - 200, 0);
					},
					[],
					"Options"
				)
			);
			if (V.corp.Announced !== 1) {
				links = [];
				links.push(
					App.UI.DOM.link(
						"Enable Corporation",
						() => {
							V.corp.Announced = 1;
						},
						[],
						"Options"
					)
				);
			}
			App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(links), "scLink2");
		}
		return el;
	}

	/**
	 * @returns {DocumentFragment} the contents of the `Experimental` tab for the `Game Options` menu
	 */
	function experimental() {
		const el = new DocumentFragment();
		let options;
		let r;

		r = [];
		r.push(`Experimental means just that: experimental. Options below are likely to be in an`);
		r.push(App.UI.DOM.makeElement("span", `even more incomplete or broken state than usual.`, "yellow"));
		r.push(App.UI.DOM.makeElement("span", `THEY MAY NOT WORK AT ALL.`, "red"));
		r.push(`Make sure you back up your save before enabling any of these, and if you are that interested, consider helping to improve them.`);
		App.Events.addNode(el, r, "div", ["bold"]);

		options = new App.UI.OptionsGroup();

		if (V.seePreg !== 0) {
			options.addOption("Nursery is", "nursery", V.experimental)
				.addValue("Enabled", 1).on().addValue("Disabled", 0).off()
				.addComment("This will enable the experimental nursery, which allows players to interact with growing slave children. An alternative to the incubator.");
		}

		options.addOption("Slave Bot generation is ", "slaveBotGeneration")
			.addValue("Enabled", 1).on().addValue("Disabled", 0).off()
			.addComment("This will enable an option to export slaves as a Slave Bot, compatible with SillyTavern for LLM-backed roleplay. Available in the Records tab.");

		options.addOption("Allow a sufficiently large enough clitoris to evaluate true in canPenetrate()", "clitoralPenetration", V.experimental)
			.addValue("Enabled", 1).on().addValue("Disabled", 0).off()
			.addComment("canPenetrate() was originally built to assume dicks, so not all scenes may make sense without one. May also lead to awkward pregnancies.");

		if (V.seeExtreme === 1 && V.seeBestiality === 1) {
			options.addOption("Animal Ovaries are", "animalOvaries", V.experimental)
				.addValue("Enabled", 1).on().addValue("Disabled", 0).off()
				.addComment("This will allow slaves to be impregnated by animals. Not currently implemented.");
		}

		if (V.seeExtreme === 1) {
			options.addOption("Dinner party", "dinnerParty", V.experimental)
				.addValue("Enabled", 1).on().addValue("Disabled", 0).off()
				.addComment("This will enable a controversial but very broken event. Warning: Snuff, cannibalism.");
		}

		if (V.debugMode && V.imageChoice === 1) {
			options.addOption("If art for Deepmurk's clothing has not yet been reported, log it in console", "reportMissingClothing", V.experimental)
				.addValue("Enabled", 1).on().addValue("Disabled", 0).off();
		}

		options.addOption("Rules Assistant target growth expressions", "raGrowthExpr", V.experimental)
			.addValue("Enabled", 1).on().addValue("Disabled", 0).off()
			.addComment("This will allow JavaScript expressions to be used in the Rules Assistant growth target setters.");

		options.addOption("New event", "tempEventToggle")
			.addValue("Enabled", 1).on().addValue("Disabled", 0).off();

		options.addOption("New Interactions", "interactions", V.experimental)
			.addValue("Enabled", 1).on().addValue("Disabled", 0).off()
			.addComment("This will enable WIP slave interactions. Currently fully functional, but a little rough around the edges.");

		options.addOption("Sex overhaul", "sexOverhaul", V.experimental)
			.addValue("Enabled", 1).on().addValue("Disabled", 0).off()
			.addComment("This will enable a new way to interact with slaves. Currently working but missing flavor text.");

		options.addOption("RA Sort Output", "raSortOutput", V.experimental)
			.addValue("Enabled", 1).on().addValue("Disabled", 0).off()
			.addComment("This will sort rule assistant output. You may benefit if you have a lot of rules, but only want to look out for a specific portion of it.");

		el.append(options.render());

		App.UI.DOM.appendNewElement("div", el, "Importing options into an in-progress game risks breaking the game, but you can export options from this game and import them into a new game.", ["warning"]);
		const textareaElement = App.UI.DOM.makeElement("textarea", App.Intro.getNondefaultOptionsAsJSON());
		el.append(textareaElement);

		el.append(App.UI.playerMods());
		return el;
	}

	/**
	 * @returns {DocumentFragment} the contents of the `New Game Plus` tab for the `Game Options` menu
	 */
	function newGamePlus() {
		const f = new DocumentFragment();
		if ((V.releaseID >= 1000) || V.ver.startsWith("0.9") || V.ver.startsWith("0.8") || V.ver.startsWith("0.7") || V.ver.startsWith("0.6")) {
			App.UI.DOM.appendNewElement("div", f, `You can begin a new game with up to five (or more) of your current slaves, although starting resources other than these slaves will be reduced.`);
			App.UI.DOM.appendNewElement("div", f, App.UI.DOM.link(
				"Activate New Game Plus",
				() => {
					V.ui = "start";
				},
				[],
				"New Game Plus"
			), ["indent"]);
			if (V.debugMode) {
				App.UI.DOM.appendNewElement("div", f, App.Arcology.purchase());
			}
		} else {
			App.UI.DOM.appendNewElement("div", f, `New Game Plus is not available because this game was not started with a compatible version.`, ["note"]);
		}
		return f;
	}
};
/**
 *
 * @param {boolean} isIntro
 * @returns {DocumentFragment}
 */
App.Intro.display = function(isIntro) {
	const el = new DocumentFragment();
	let options;
	let r;

	App.UI.DOM.appendNewElement("h2", el, "Reports");

	options = new App.UI.OptionsGroup();

	options.addOption("End week report descriptive details are", "showEWD")
		.addValue("Enabled", 1).on().addValue("Disabled", 0).off();

	options.addOption("End week report performance details are", "showEWM")
		.addValue("Enabled", 1).on().addValue("Disabled", 0).off();

	options.addOption("Master Suite report details such as slave changes are", "verboseDescriptions")
		.addValue("Enabled", 1).on().addValue("Disabled", 0).off();

	options.addOption("End week societal effects from slaves are", "compressSocialEffects", V.UI)
		.addValue("Expanded", 0).on().addValue("Compacted", 1).off();

	options.addOption("Accordion on week end defaults to", "useAccordion")
		.addValue("Open", 0).on().addValue("Collapsed", 1).off();

	options.addOption("Favorites Report", "favSeparateReport")
		.addValue("Enabled", 1).on().addValue("Disabled", 0).off()
		.addComment("This will move reports of your favorite slaves to their own section.");

	options.addOption("Economic Tabs on weekly reports are", "useTabs")
		.addValue("Enabled", 1).on().addValue("Disabled", 0).off();

	options.addOption("Economic detail sheets for facilities are", "showEconomicDetails")
		.addValue("Enabled", 1).on().addValue("Disabled", 0).off();

	options.addOption("Economic report neighbor details such as trade impacts on culture are", "showNeighborDetails")
		.addValue("Enabled", 1).on().addValue("Disabled", 0).off();

	options.addOption("Numeric formatting is currently", "formatNumbers")
		.addValue("Localized", 2).on().addValue("Force US locale", 1).on().addValue("Disabled", 0).off()
		.addComment("This will format numbers in some areas according to locale settings or force the US locale (decimal point, comma as thousands separator).");

	el.append(options.render());

	App.UI.DOM.appendNewElement("h2", el, "General");

	options = new App.UI.OptionsGroup();

	options.addOption("Main menu leadership controls displayed", "positionMainLinks")
		.addValueList([["Above", 1], ["Above and below", 0], ["Below", -1]]);

	options.addOption("New Model UI", "newModelUI")
		.addValue("Enabled", 1).on().addValue("Disabled", 0).off();

	options.addOption("Penthouse Facility Display", "verticalizeArcologyLinks")
		.addValueList([["Triple column", 3], ["Double Column", 2], ["Single Column", 1], ["Collapsed", 0], ["Hidden", -1]]);

	options.addOption("Main menu arcology description", "seeArcology")
		.addValue("Enabled", 1).on().addValue("Disabled", 0).off();

	options.addOption("Main menu desk description", "seeDesk")
		.addValue("Enabled", 1).on().addValue("Disabled", 0).off();

	options.addOption("Main menu newsfeed", "seeFCNN")
		.addValue("Enabled", 1).on().addValue("Disabled", 0).off();

	options.addOption("Tips from the Encyclopedia are", "showTipsFromEncy")
		.addValue("Enabled", 1).on().addValue("Disabled", 0).off();

	options.addOption("Help tooltips are", "tooltipsEnabled")
		.addValue("Enabled", 1).on().addValue("Disabled", 0).off()
		.addComment(`This is mostly for new players. <span class='exampleTooltip noteworthy'>Colored text</span> can have tooltips.`)
		.addGlobalCallback(App.UI.GlobalTooltips.update);

	options.addOption("Main menu slave tabs are", "useSlaveSummaryTabs")
		.addValue("Enabled", 1).on().addValue("CardStyle", 2).on().addValue("Disabled", 0).off();

	options.addOption("The slave list in-page scroll-to is", "useSlaveListInPageJSNavigation")
		.addValue("Always", 2).on().addValue("Collapsable", 1).on().addValue("Disabled", 0).off();

	options.addOption("Condense special slaves into their own tab", "useSlaveSummaryOverviewTab")
		.addValue("Enabled", 1).on().addValue("Disabled", 0).off();

	options.addOption("Interactions with your fucktoys are", "fucktoyInteractionsPosition")
		.addValueList([["next to them", 1], ["at page bottom", 0]]);

	options.addOption("Hide tabs in Slave Interact", "slaveInteractLongForm")
		.addValue("Enabled", true).on().addValue("Disabled", false).off();

	options.addOption("Warning on end week saving", "endweekSaveWarning")
		.addValue("Shown", 1).on().addValue("Hidden", 0).off();

	options.addOption("Purchase options are", "purchaseStyle")
		.addValue("Links", 'link').addValue("Buttons", 'button');

	options.addOption("Default Rules Assistant mode is", "raDefaultMode")
		.addValue("Simple", 0).addValue("Advanced", 1);

	options.addOption("Confirmation before deleting a rule is", "raConfirmDelete")
		.addValue("Enabled", 1).on().addValue("Disabled", 0).off()
		.addComment("Enabling this will open a dialog box to confirm you meant to delete a rule.");

	options.addOption(
		"Favorite and reminder buttons in front of some slave description links are",
		"addButtonsToSlaveLinks"
	)
		.addValue("Enabled", true).on().addValue("Disabled", false).off();

	options.addOption("Pregnancy reports are", "enabled", V.pregnancyNotice)
		.addValue("Enabled", true).on().addValue("Disabled", false).off()
		.addComment("You have to buy the 'pregnancy monitoring system upgrade' for these reports to happen.");

	if (V.pregnancyNotice.enabled === true) {
		options.addOption("Rendering of the child in pregnancy reports is", "renderFetus", V.pregnancyNotice)
			.addValue("Enabled", true).on().addValue("Disabled", false).off()
			.addComment("Requires the 'basic genetic sequencer' to render");
		options.addOption("When there are unprocessed children the continue button is", "nextLockout", V.pregnancyNotice)
			.addValue("Hidden", true).addValue("Shown", false);
	}

	el.append(options.render());

	r = [];
	r.push(`UI theme selector. Allows to select a single CSS file to be loaded.`);
	r.push(App.UI.DOM.makeElement("span", `The file has to be located in the same directory as the HTML file otherwise it will simply not load at all.`, "red"));
	r.push(App.UI.Theme.selector());
	App.Events.addParagraph(el, r);

	App.UI.DOM.appendNewElement("h2", el, "Sidebar");

	options = new App.UI.OptionsGroup();

	options.addOption("Style is", "Style", V.sideBarOptions)
		.addValue("Compact", 'compact').addValue("Expanded", 'expanded');

	options.addOption("Cash is", "Cash", V.sideBarOptions)
		.addValue("Shown", 1).on().addValue("Hidden", 0).off();

	options.addOption("Upkeep is", "Upkeep", V.sideBarOptions)
		.addValue("Shown", 1).on().addValue("Hidden", 0).off();

	options.addOption("Sex slave count is", "SexSlaveCount", V.sideBarOptions)
		.addValue("Shown", 1).on().addValue("Hidden", 0).off();

	options.addOption("Room population is", "roomPop", V.sideBarOptions)
		.addValue("Shown", 1).on().addValue("Hidden", 0).off();

	options.addOption("GSP is", "GSP", V.sideBarOptions)
		.addValue("Shown", 1).on().addValue("Hidden", 0).off();

	options.addOption("Rep is", "Rep", V.sideBarOptions)
		.addValue("Shown", 1).on().addValue("Hidden", 0).off();

	options.addOption("Confirmation before ending a week is", "confirmWeekEnd", V.sideBarOptions)
		.addValue("Enabled", 1).on().addValue("Disabled", 0).off()
		.addComment("Enabling this will open a dialog box to confirm you meant to end a week.");

	if (V.secExpEnabled > 0) {
		options.addOption("Authority is", "Authority", V.sideBarOptions)
			.addValue("Shown", 1).on().addValue("Hidden", 0).off();

		options.addOption("Security is", "Security", V.sideBarOptions)
			.addValue("Shown", 1).on().addValue("Hidden", 0).off();

		options.addOption("Crime is", "Crime", V.sideBarOptions)
			.addValue("Shown", 1).on().addValue("Hidden", 0).off();
	}

	el.append(options.render());

	App.UI.DOM.appendNewElement("h2", el, "Images");
	el.append(App.UI.artOptions());

	return el;
};

/**
 *
 * @param {boolean} isIntro
 * @returns {DocumentFragment}
 */
App.Intro.contentAndFlavor = function(isIntro) {
	const el = new DocumentFragment();
	let r;
	let options;
	let option;

	App.UI.DOM.appendNewElement("h2", el, "Content");

	const descOptions = App.UI.DOM.makeElement("div");
	r = [];
	r.push("More granular control of what appears is in");
	r.push(App.UI.DOM.link("Description Options", () => {
		jQuery(descOptions).empty().append(App.UI.descriptionOptions());
	}));

	App.Events.addNode(descOptions, r, "div");
	el.append(descOptions);

	options = new App.UI.OptionsGroup();

	if (!isIntro) {
		options.addOption("The difficulty setting is currently set to", "baseDifficulty")
			.addValueList([["Very easy", 1], ["Easy", 2], ["Default", 3], ["Hard", 4], ["Very hard", 5]]);
	}

	if (!isIntro) {
		options.addOption("Maximum random slave events per week", "RIEPerWeek")
			.addValueList([1, 2, 3]);
	}

	options.addOption("Slaves falling ill is currently", "seeIllness")
		.addValue("Enabled", 1).on().addValue("Disabled", 0).off()
		.addComment("Will not affect existing ill slaves already in-game.");

	options.addOption("Extreme content like amputation is currently", "seeExtreme")
		.addValue("Enabled", 1).on().addValue("Disabled", 0).off()
		.addComment("Will not affect extreme surgeries already applied in-game.");

	options.addOption("Permanent stretching of holes is currently", "seeStretching")
		.addValue("Enabled", 1).on().addValue("Disabled", 0).off()
		.addComment("Will not affect holes already stretched.");

	options.addOption("Bestiality related content is currently", "seeBestiality")
		.addValue("Enabled", 1).on().addValue("Disabled", 0).off();

	options.addOption("Watersports related content is currently", "seePee")
		.addValue("Enabled", 1).on().addValue("Disabled", 0).off();

	options.addOption("Incest content is currently", "seeIncest")
		.addValue("Enabled", 1).on().addValue("Disabled", 0).off();

	options.addOption("Proportion of slave girls with dicks", "seeDicks")
		.addValueList([
			["None (0%)", 0],
			["Nearly none (1%)", 1],
			["A few (10%)", 10],
			["Some (25%)", 25],
			["Half (50%)", 50],
			["Lots (75%)", 75],
			["Most (90%)", 90],
			["Almost all (99%)", 99],
			["All (100%)", 100]
		]);

	if (V.seeDicks === 0) {
		options.addOption("Surgical attachment of dicks is", "makeDicks")
			.addValue("Enabled", 1).on().addValue("Disabled", 0).off();
	}

	if (V.seeDicks !== 0 || V.makeDicks !== 0) {
		options.addOption("Circumcision is", "seeCircumcision")
			.addValue("Enabled", 1).on().addValue("Disabled", 0).off();
	}

	const existingPregnancies = isIntro ? `` : ` Will not affect existing pregnancies already in-game.`;
	options.addOption("Pregnancy related content is currently", "seePreg")
		.addValue("Enabled", 1).on().addValue("Disabled", 0).off()
		.addComment(existingPregnancies);

	if (V.seePreg) {
		options.addOption("Child gender is generated based on", "seeDicksAffectsPregnancy")
			.addValue(`Proportion of slaves with dicks (${V.seeDicks}% male)`, 1).on().addValue("Genetics", 0).off()
			.addComment(existingPregnancies);

		if (V.seeDicksAffectsPregnancy === 0) {
			options.addOption("XX slaves only father daughters", "adamPrinciple")
				.addValue("Enabled", 1).on().addValue("Disabled", 0).off()
				.addComment(existingPregnancies);
		}

		options.addOption("Extreme pregnancy content like broodmothers is currently", "seeHyperPreg")
			.addValue("Enabled", 1).on().addValue("Disabled", 0).off()
			.addComment(isIntro ? `` : "Will not affect existing hyperpregnancies already in-game.");

		options.addOption("Pregnancy complications due to multiples and body size are currently", "dangerousPregnancy")
			.addValue("Enabled", 1).on().addValue("Disabled", 0).off();
	}

	option = options.addOption(`Precocious puberty (pregnancy younger than ${V.fertilityAge})`, "precociousPuberty")
		.addValue("Enabled", 1).on().addValue("Disabled", 0).off();
	if (isIntro) {
		option.addComment(`Under certain conditions slaves can become pregnant or impregnate others younger than normal age (${V.fertilityAge}); they may also experience delayed puberty.`);
	} else {
		option.addComment("Will not affect existing precocious puberty cases already in-game.");
	}

	options.addOption("Proportion of slave girls with exotic hair colors", "seeRandomHair")
		.addValueList([
			["None (0%)", 0],
			["Nearly none (1%)", 1],
			["A few (10%)", 10],
			["A couple (20%)", 20],
			["Some (25%)", 25],
			["Half (50%)", 50],
			["Lots (75%)", 75],
			["All (100%)", 100]
		]);

	options.addOption("Slaves with fat lips or heavy oral piercings may lisp", "disableLisping")
		.addValue("Yes", 0).on().addValue("No", 1).off();

	options.addOption("<span class='note'>(Temp option)</span> The long-term damage mechanic is currently", "disableLongDamage")
		.addValue("Enabled", 0).on().addValue("Disabled", 1).off();

	options.addOption("Experimental male pronouns are currently", "diversePronouns")
		.addValue("Enabled", 1).on().addValue("Disabled", 0).off()
		.addComment("Apply Backwards Compatibility after changing to update slave's pronouns. Not all scenes support male pronouns and this is not yet incorporated into the lore or mechanics.");

	options.addOption("Male slave names are currently", "allowMaleSlaveNames")
		.addValue("Enabled", true).on().addValue("Disabled", false).off()
		.addComment("This only affects slave generation and not your ability to name your slaves.");

	options.addOption("Missing slave names are currently", "showMissingSlaves")
		.addValue("Enabled", true).on().addValue("Disabled", false).off();

	el.append(options.render());

	App.UI.DOM.appendNewElement("h2", el, `Intersecting mechanics`);

	options = new App.UI.OptionsGroup();

	options.addOption("Assets affected by weight is", "weightAffectsAssets")
		.addValue("Enabled", 1).on().addValue("Disabled", 0).off()
		.addComment("Diet will still affect asset size.");

	options.addOption("Breasts shrink if their base size is greater than", "oversizedBoobShrinkage")
		.addValueList([
			["genetic breast size", 0],
			["an arbitrary value", 1],
			["what the game can handle", 2]
		])
		.addComment("Arbitrary value (30kcc) was used prior to genetic breast size.");

	options.addOption("Chem damage from drugs is", "curativeSideEffects") // Yes, this variable controls all chem damage. The vestigial "curatives" name isn't worth changing.
		.addValue("Enabled", 1).on().addValue("Disabled", 0).off()
		.addComment("If enabled, many drugs will cause harmful, though curable, carcinogen buildup and genomic damage over time.");

	options.addOption("Size of the slaves maximum possible erection is influenced by", "maxErectionSizeOption")
		.addValueList([
			["nothing", 0],
			["slave's height", 1],
			["slave's height and health", 2]
		])
		.addComment("Changes if a slaves height (and health) influences their ability to maintain an erection or if it is static.");

	el.append(options.render());

	App.UI.DOM.appendNewElement("h2", el, `Flavour`);

	options = new App.UI.OptionsGroup();

	options.addOption("Slave reactions to facility assignments are", "showAssignToScenes")
		.addValue("Enabled", 1).on().addValue("Disabled", 0).off();

	options.addOption("Post sex clean up", "postSexCleanUp")
		.addValue("Enabled", 1).on().addValue("Disabled", 0).off();

	options.addOption("Appraisal miniscenes on slave sale are", "showAppraisal")
		.addValue("Enabled", 1).on().addValue("Disabled", 0).off();

	options.addOption("Assignment performance vignettes on the end week report are", "showVignettes")
		.addValue("Enabled", 1).on().addValue("Disabled", 0).off();

	options.addOption("Slaves can have alternate titles", "newDescriptions")
		.addValue("Enabled", 1).on().addValue("Disabled", 0).off();

	options.addOption("Family titles for relatives", "allowFamilyTitles")
		.addValue("Enabled", 1).on().addValue("Disabled", 0).off();

	options.addOption("Limit family growth", "limitFamilies")
		.addValue("Enabled", 1).on().addValue("Disabled", 0).off()
		.addComment("Restricts acquisition of additional relatives, by means other than birth, for slaves with families.");

	options.addOption("Distant relatives such as aunts, nieces and cousins are", "showDistantRelatives")
		.addValue("Enabled", 1).on().addValue("Disabled", 0).off();

	el.append(options.render());
	return el;
};

/**
 * @param {InstanceType<App.UI.OptionsGroup>} options
 */
App.UI.aiPromptingOptions = function(options) {
	options.addOption("NGBot's LoRA pack", "aiLoraPack")
		.addValue("Enabled", true).on().addValue("Disabled", false).off()
		.addComment("Adds prompting to support NGBot's LoRA pack; see the LoRA Pack Installation Guide for details");
	options.addCustom(App.UI.loraInstallationGuide("LoRA Pack Installation Guide"));
	options.addOption("AI style prompting", "aiStyle")
		.addValueList([
			["Photorealistic", 1],
			["Anime/Hentai", 2],
			["Custom", 0]
		]);
	if (V.aiStyle === 0) {
		options.addOption("AI custom style positive prompt", "aiCustomStylePos").showTextBox({large: true, forceString: true})
			.addComment("Include desired LoRA triggers (<code>&lt;lora:LowRA:0.5&gt;</code>) and general style prompts relevant to your chosen model ('<code>hand drawn, dark theme, black background</code>'), but no slave-specific prompts");
		options.addOption("AI custom style negative prompt", "aiCustomStyleNeg").showTextBox({large: true, forceString: true})
			.addComment("Include undesired general style prompts relevant to your chosen model ('<code>greyscale, photography, forest, low camera angle</code>'), but no slave-specific prompts");
	} else if (V.aiStyle === 1) {
		options.addComment("For best results, use an appropriately-trained photorealistic base model, such as MajicMIX or Life Like Diffusion.");
	} else if (V.aiStyle === 2) {
		options.addComment("For best results, use an appropriately-trained hentai base model, such as Hassaku.");
	}
	options.addOption("Nationality factor in prompt", "aiNationality")
		.addValue("Strong", 2).addValue("Weak", 1).on().addValue("Disabled", 0).off()
		.addComment("Helps differentiate between ethnicities that share a Free Cities race, like Japanese and Korean or Spanish and Greek. May cause flags/national colors to appear unexpectedly, and can have a negative impact on slaves that belong to a minority race for their nationality.");
	options.addOption("Gender hints come from", "aiGenderHint")
		.addValue("Hormone balance", 1).addValue("Perceived gender", 2).addValue("Pronouns", 3)
		.addComment("How to determine whether to include words like \"woman\" or \"man\" in a prompt.");
};

App.UI.artOptions = function() {
	const el = new DocumentFragment();
	let options = new App.UI.OptionsGroup();

	if (V.seeImages && !V.seeCustomImagesOnly) {
		let artContainer = App.UI.DOM.appendNewElement("div", el);
		artContainer.style.textAlign = "center";
		let baseSlave = BaseSlave();

		if (V.imageChoice === 6 && V.aiSamplingSteps !== V.aiSamplingStepsEvent) {
			const artFast = App.UI.DOM.appendNewElement("div", artContainer, App.Art.SlaveArtElement(baseSlave, 2, 0, true), ["imageRef", "medImg"]);
			artFast.style.float = "none";
			artFast.style.display = "inline-block";
			artFast.style.marginLeft = "auto";
			artFast.style.marginRight = "auto";
			App.UI.DOM.appendNewElement("div", artFast, `${V.aiSamplingStepsEvent} steps`);
		}
		const art = App.UI.DOM.appendNewElement("div", artContainer, App.Art.SlaveArtElement(baseSlave, 2, 0, false), ["imageRef", "medImg"]);
		art.style.float = "none";
		art.style.display = "inline-block";
		art.style.marginLeft = "auto";
		art.style.marginRight = "auto";
		if (V.imageChoice === 6 && V.aiSamplingSteps !== V.aiSamplingStepsEvent) {
			App.UI.DOM.appendNewElement("div", art, `${V.aiSamplingSteps} steps`);
		}
	}

	options.addOption("Images are", "seeImages")
		.addValue("Enabled", 1).on().addValue("Disabled", 0).off();

	if (V.seeImages > 0) {
		options.addOption("Show custom images only", "seeCustomImagesOnly")
			.addValue("Enabled", 1).addValue("Disabled", 0);

		if (!V.seeCustomImagesOnly) {
			/* REMOVE THIS WARNING ONCE ART DEVELOPMENT RESUMES */
			options.addComment('<span class="warning">All image packs are currently incomplete; some outfits will not be displayed.</span>');
			const option = options.addOption("Image style is", "imageChoice")
				.addValueList([ // Keeping the most up-to-date options as the first in line
					["Elohiem's interactive WebGL", 4],
					["NoX/Deepmurk's vector art", 1],
					["Revamped embedded vector art", 3],
					["Non-embedded vector art", 2],
					["Shokushu's rendered image pack", 5],
					["Anon's AI image generation", 6],
				]);
			if (V.imageChoice === 1) {
				options.addComment("The only 2D art in somewhat recent development. Contains many outfits.");
				options.addOption("Face artwork is", "seeFaces")
					.addValue("Enabled", 1).on().addValue("Disabled", 0).off();

				options.addOption("Highlights on shiny clothing are", "seeVectorArtHighlights")
					.addValue("Enabled", 1).on().addValue("Disabled", 0).off();

				options.addOption("Height scaling", "seeHeight")
					.addValue("All images", 2).on().addValue("Small images", 1).addValue("Disabled", 0).off();

				options.addOption("Clothing erection bulges are", "showClothingErection")
					.addValue("Enabled", true).on().addValue("Disabled", false).off();
			} else if (V.imageChoice === 5) {
				options.addComment("Dead since long before the end of vanilla. You need to" +
					" <a href='https://mega.nz/#!upoAlBaZ!EbZ5wCixxZxBhMN_ireJTXt0SIPOywO2JW9XzTIPhe0' target='_blank'>download the image" +
					" pack</a> and put the 'renders' folder into the resources/ folder where this html file is.");

				options.addOption("Slave summary fetish images are", "seeMainFetishes")
					.addValue("Enabled", 1).on().addValue("Disabled", 0).off();
			} else if (V.imageChoice === 3) {
				options.addComment("This art development is dead.");
				options.addOption("Clothing erection bulges are", "showClothingErection")
					.addValue("Enabled", true).on().addValue("Disabled", false).off();
			} else if (V.imageChoice === 4) {
				// Use ISO date format as it is the only format where everyone agrees what it means
				options.addComment(`This art is currently (2023-01-04) the most actively developed. Real time 3D models. <span class="warning">(Android/MacOS not supported)</span>`);
				if (App.Art.webglErrorMessage.includes("Version mismatch") || App.Art.webglErrorMessage.includes("Could not find art assets")) {
					options.addComment(`<a href='https://mega.nz/folder/CgRiQaxS#Cjok57jXZwQt-jP7zkRh2Q' target='_blank'> Download the WebGL art assets</a>.`);
					if (App.Art.webglErrorMessage.includes("Could not find art assets")) {
						options.addComment(`Place the 'webgl' folder into the resources/ folder where this HTML file is.
						Then <b>refresh</b> the page.
						Create the resources folder if it does not exist.`);
					}
				}

				let option = options.addOption("Supersampling (SSAA)", "setSuperSampling");
				for (const value of [0.25, 0.5, 1, 2, 4]) {
					option.addValue(`${value}`, value);
				}
				option.addComment("Multiplies the resolution of the render. Use a smaller factor for low-end GPUs.");

				option = options.addOption("Texture resolution", "setTextureResolution");
				for (const value of [512, 1024, 2048, 4096]) {
					option.addValue(`${value}`, value);
				}
				option.addComment("Refresh the page to take affect.");

				options.addOption("Face culling", "setFaceCulling")
					.addValue("Enabled", true).off().addValue("Disabled", false).on()
					.addComment("Whether to draw the backside of the model, affects transparent surfaces such as hair. Enabling is recommended for low-end GPUs.");
				options.addOption("Pan speed", "setPanSpeed")
					.addValue("0.25", 0.25).off().addValue("0.5", 0.5).off().addValue("1", 1).on().addValue("2", 2).off().addValue("4", 4).off();
				options.addOption("Rotation speed", "setRotationSpeed")
					.addValue("0.25", 0.25).off().addValue("0.5", 0.5).off().addValue("1", 1).on().addValue("2", 2).off().addValue("4", 4).off();
				options.addOption("Zoom speed", "setZoomSpeed")
					.addValue("0.25", 0.25).off().addValue("0.5", 0.5).off().addValue("1", 1).on().addValue("2", 2).off().addValue("4", 4).off();

				options.addOption("Auto-frame", "setAutoFrame")
					.addValue("Enabled", 1).on().addValue("Disabled", 0).off();
				if (V.setAutoFrame === 1) {
					options.addOption("Default view", "setDefaultView").showTextBox()
						.addComment("Choose a value between 0 and 1.");
				}
				options.addOption("Large Image size", "setImageSize").showTextBox()
					.addComment("Recommended to be between 0.5 and 1.5.");
				options.addOption("Three-Quarter View", "set3QView")
					.addValue("Enabled", true).off().addValue("Disabled", false).on()
					.addComment("Toggle between frontal and three-quarter view on reset");
				options.addOption("Ambient Occlusion", "setSSAO")
					.addValue("Enabled", true).on().addValue("Disabled", false).off();
				options.addOption("SubSurface Scattering", "setSSS")
					.addValue("Enabled", true).on().addValue("Disabled", false).off();
				options.addOption("Shadowmapping", "setShadowMapping")
					.addValue("Enabled", true).on().addValue("Disabled", false).off();
				options.addOption("Idle Animations", "seeAnimation")
					.addValue("Enabled", true).on().addValue("Disabled", false).off()
					.addComment("Experimental idle animations, only visible in slave inspect screen. Will cause slowdown on some systems.");
				options.addOption("Animation FPS", "animFPS")
					.addValue("6", 6).off().addValue("12", 12).on().addValue("24", 24).off().addValue("32", 32).off();
			} else if (V.imageChoice === 2) {
				option.addComment("This art development is dead since vanilla. Since it is not embedded, requires a separate art pack to be downloaded.");
			} else if (V.imageChoice === 6) {
				options.addComment("This is experimental. Please follow the setup instructions below.");
				options.addCustom(App.UI.stableDiffusionInstallationGuide("Stable Diffusion Installation Guide"));
				if (V.aiApiUrl.endsWith('/')) { // common error is including a trailing slash, which will fuck us up, so strip it automatically
					V.aiApiUrl = V.aiApiUrl.slice(0, -1);
				}
				options.addOption("API URL", "aiApiUrl").showTextBox().addComment("The URL of the Automatic 1111 Stable Diffusion API.");
				App.UI.aiPromptingOptions(options);

				options.addOption("Caching Strategy", 'aiCachingStrategy')
					.addValue("Reactive", 'reactive').addValue("Static", 'static')
					.addComment("Caching behavior for AI images. Reactive pictures always reflect the state of the slave at the current time. Static refreshes every set amount of weeks, or manually. Images will not be brought across different strategies, but if the model is the same the generated images will be the same as well.");

				if (V.aiCachingStrategy === 'static') {
					options.addOption("Automatic generation", "aiAutoGen")
						.addValue("Enabled", true).on().addValue("Disabled", false).off()
						.addComment("Generate images for new slaves on the fly. If disabled, you will need to manually click to generate each slave's image.");
					if (V.aiAutoGen) {
						if (V.aiAutoGenFrequency < 1) {
							V.aiAutoGenFrequency = 1;
						}
						V.aiAutoGenFrequency = Math.round(V.aiAutoGenFrequency);
						options.addOption("Regeneration Frequency", "aiAutoGenFrequency").showTextBox()
							.addComment("How often (in weeks) regenerate slave images. Slaves will render when 'Weeks Owned' is divisible by this number.");
					}
				}

				options.addOption("Apply RA prompt changes for event images", "aiUseRAForEvents")
					.addValue("Enabled", true).on().addValue("Disabled", false).off()
					.addComment("Apply image generation prompt changes from Rules Assistant for event images, including slave marketplace images. Useful for customizing prompts of non-owned slaves.");

				const samplerListSpan = App.UI.DOM.makeElement('span', `Fetching options, please wait...`);
				App.Art.GenAI.sdClient.getSamplerList().then(list => {
					if (list.length === 0) {
						samplerListSpan.textContent = `Could not fetch valid samplers. Check your configuration.`;
						samplerListSpan.classList.add('error');
					} else {
						samplerListSpan.textContent = `Valid options on your Stable Diffusion installation: ${toSentence(list)}.`;
						if (!list.includes(V.aiSamplingMethod)) {
							samplerListSpan.classList.add('error');
							samplerListSpan.textContent = "ERROR: " + samplerListSpan.textContent;
						}
					}
				});
				options.addOption("Sampling Method", "aiSamplingMethod").showTextBox()
					.addComment(App.UI.DOM.combineNodes(`The sampling method used by AI. `, samplerListSpan));

				if (V.aiCfgScale < 1) {
					V.aiCfgScale = 1;
				}
				options.addOption("CFG Scale", "aiCfgScale").showTextBox()
					.addComment("The higher this number, the more the prompt influences the image. Generally between 5 to 12.");
				if (V.aiTimeoutPerStep < 0.01) {
					V.aiTimeoutPerStep = 0.01;
				}
				options.addOption("CFG Scale Fix", "aiDynamicCfgEnabled")
					.addValue("Enabled", true).off().addValue("Disabled", false).on()
					.addComment('Use the "Stable Diffusion Dynamic Thresholding" extension.');

				if (V.aiDynamicCfgEnabled) {
					options.addOption("CFG Scale Fix: Mimicked Number", "aiDynamicCfgMimic").showTextBox()
						.addComment("If CFG Scale Fix is on, then set this number to a CFG scale to mimic a normal CFG (5 to 12), and then set your actual CFG to something high (20, 30, etc.)");
					if (V.aiDynamicCfgMimic < 0) {
						V.aiDynamicCfgMimic = 0;
					}
					options.addOption("CFG Scale Fix: Minimum Scale", "aiDynamicCfgMinimum").showTextBox()
						.addComment("CFG Scheduler minimums. Set to around 3 or 4 for best results.");
					if (V.aiDynamicCfgMinimum < 0) {
						V.aiDynamicCfgMinimum = 0;
					}
				}

				options.addOption("Seconds per Step", "aiTimeoutPerStep").showTextBox()
					.addComment("The maximum number of Seconds (per Step) your system takes to render an image.  This time is from the time the request is sent to the time it is saved divided by the number of Sampling Steps. Please set this at as small a value as reasonable to avoid the game from waiting longer than you are for images to generate.");
				if (V.aiSamplingSteps < 2) {
					V.aiSamplingSteps = 2;
				}
				options.addOption("Sampling Steps", "aiSamplingSteps").showTextBox()
					.addComment("The number of steps used when generating the image. More steps might reduce artifacts but increases generation time. Generally between 20 to 50, but may be as high as 500 if you don't mind long queues in the background.");
				if (V.aiSamplingStepsEvent < 2) {
					V.aiSamplingStepsEvent = 2;
				}
				options.addOption("Event Sampling Steps", "aiSamplingStepsEvent").showTextBox()
					.addComment("The number of steps used when generating an image during events. Generally between 20 to 50 to maintain a reasonable speed.");
				if (V.aiHeight < 10) {
					V.aiHeight = 10;
				}
				options.addOption("Height", "aiHeight").showTextBox()
					.addComment("The height of the image.");
				if (V.aiWidth < 10) {
					V.aiWidth = 10;
				}
				options.addOption("Width", "aiWidth").showTextBox()
					.addComment("The width of the image.");

				const rfCheckSpan = App.UI.DOM.makeElement('span', `Validating Restore Faces...`);
				App.Art.GenAI.sdClient.canRestoreFaces().then(result => {
					if (result) {
						if (V.aiAdetailerFace && V.aiRestoreFaces) {
							rfCheckSpan.textContent = `Do not use Restore Faces and ADetailer Restore Face at the same time. Pick one.`;
							rfCheckSpan.classList.add("error");
						} else {
							rfCheckSpan.textContent = "";
						}
					} else {
						rfCheckSpan.textContent = `Restore Faces is unavailable on your Stable Diffusion installation.`;
						rfCheckSpan.classList.add("error");
					}
				});
				options.addOption("Restore Faces", "aiRestoreFaces")
					.addValue("Enabled", true).on().addValue("Disabled", false).off()
					.addComment(App.UI.DOM.combineNodes("Use a model to restore faces after the image has been generated. May result in 'samey' faces. ", rfCheckSpan));

				const adCheckSpan = App.UI.DOM.makeElement('span', `Validating ADetailer setup...`);
				App.Art.GenAI.sdClient.hasAdetailer().then(result => {
					if (result) {
						adCheckSpan.textContent = "";
					} else {
						adCheckSpan.textContent = `ADetailer is unavailable on your Stable Diffusion installation.`;
						adCheckSpan.classList.add("error");
					}
				});
				options.addOption("ADetailer restore face", "aiAdetailerFace")
					.addValue("Enabled", true).on().addValue("Disabled", false).off()
					.addComment(App.UI.DOM.combineNodes("Use AI to recognize and re-render faces with better detail. Much better than Restore Faces, but requires more technical setup. ", adCheckSpan));

				options.addOption("Upscaling/highres fix", "aiUpscale")
					.addValue("Enabled", true).on().addValue("Disabled", false).off()
					.addComment("Use AI upscaling to produce higher-resolution images. Significantly increases both time to generate and image quality.");
				if (V.aiUpscale) {
					options.addOption("Upscaling size", "aiUpscaleScale").showTextBox()
						.addComment("Scales the dimensions of the image by this factor. Defaults to 1.75.");

					const upscalerListSpan = App.UI.DOM.makeElement('span', `Fetching options, please wait...`);
					App.Art.GenAI.sdClient.getUpscalerList().then(list => {
						if (list.length === 0) {
							upscalerListSpan.textContent = `Could not fetch valid upscalers. Check your configuration.`;
							upscalerListSpan.classList.add('error');
						} else {
							upscalerListSpan.textContent = `Valid options on your Stable Diffusion installation: ${toSentence(list)}.`;
							if (!list.includes(V.aiUpscaler)) {
								upscalerListSpan.classList.add('error');
								upscalerListSpan.textContent = "ERROR: " + upscalerListSpan.textContent;
							}
						}
					});
					options.addOption("Upscaling method", "aiUpscaler").showTextBox()
						.addComment(App.UI.DOM.combineNodes(`The method used for upscaling the image. `, upscalerListSpan));
				}

				const opCheckSpan = App.UI.DOM.makeElement('span', `Validating ControlNet and OpenPose setup...`);
				App.Art.GenAI.sdClient.hasOpenPose().then(result => {
					if (result) {
						opCheckSpan.textContent = "";
					} else {
						opCheckSpan.textContent = `OpenPose is unavailable on your Stable Diffusion installation. Check your ControlNet configuration.`;
						opCheckSpan.classList.add("error");
					}
				});
				options.addOption("Strictly control posing", "aiOpenPose")
					.addValue("Enabled", true).on().addValue("Disabled", false).off()
					.addComment(App.UI.DOM.combineNodes(`Use the ControlNet extension's OpenPose module to strictly control slave poses. `, opCheckSpan));
				if (V.aiOpenPose) {
					const opModelList = App.UI.DOM.makeElement('span', `Fetching options, please wait...`);
					App.Art.GenAI.sdClient.getOpenPoseModelList().then(list => {
						if (list.length === 0) {
							opModelList.textContent = `Could not fetch valid OpenPose models. Check your configuration.`;
							opModelList.classList.add('error');
						} else {
							opModelList.textContent = `Valid options on your Stable Diffusion installation: ${toSentence(list)}.`;
							if (!list.includes(V.aiOpenPoseModel)) {
								opModelList.classList.add('error');
								opModelList.textContent = "ERROR: " + opModelList.textContent;
							}
						}
					});
					options.addOption("OpenPose Model", "aiOpenPoseModel").showTextBox()
						.addComment(App.UI.DOM.combineNodes(`The model used for applying the pose to the image. Enter the entire model name, including the checksum (i.e. "control_v11p_sd15_openpose [cab727d4]").`, opModelList));
				}

				const renderQueueOption = async (clicked = false) => {
					const sleep = (ms) => new Promise(r => setTimeout(r, ms));
					// wait for the button to render
					while (!$("button:contains('Interrupt rendering')").length) {
						await sleep(10);
					}
					if (clicked) {
						// send interrupt when clicked
						App.Art.GenAI.sdQueue.interrupt();
					}
					if (App.Art.GenAI.sdQueue.interrupted) {
						$("button:contains('Interrupt rendering')").removeClass("off").addClass("on selected disabled");
						await App.Art.GenAI.sdQueue.resumeAfterInterrupt();
					}
					$("button:contains('Interrupt rendering')").removeClass("on selected disabled").addClass("off");
					App.Art.GenAI.sdQueue.updateQueueCounts();
				};
				options.addCustomOption("Rendering Queue management")
					.addButton("Interrupt rendering and clear the rendering queues", () => renderQueueOption(true))
					.addComment(`<span id="mainQueueCount">N/A</span> main images and <span id="backlogQueueCount">N/A</span> backlog images queued for generation.`);
				// adjust the state of the button when it is rendered
				renderQueueOption();
				options.addCustomOption("Cache database management")
					.addButton("Purge all images", async () => {
						await App.Art.GenAI.staticImageDB.clear();
						await App.Art.GenAI.reactiveImageDB.clear();
					})
					.addButton("Regenerate images for all slaves", () => {
						// queue all slaves for regeneration in the background
						if (V.aiCachingStrategy === 'static') {
							V.slaves.forEach(s => App.Art.GenAI.staticCache.updateSlave(s)
								.catch(error => {
									console.log(error.message || error);
								}));
						} else {
							// reactive
							V.slaves.forEach(s => App.Art.GenAI.reactiveCache.updateSlave(s)
								.catch(error => {
									console.log(error.message || error);
								}));
						}
						console.log(`${App.Art.GenAI.sdQueue.queue.length} requests queued for rendering.`);
					})
					.addComment(`The cache database is shared between games. Current cache size: <span id="cacheCount">Please wait...</span>`);
				if (V.aiCachingStrategy === 'static') {
					App.Art.GenAI.staticImageDB.sizeInfo().then((result) => {
						$("#cacheCount").empty().append(result);
					});
				} else {
					App.Art.GenAI.reactiveImageDB.sizeInfo().then((result) => {
						$("#cacheCount").empty().append(result);
					});
				}
			}
		} else { // custom images only
			options.addOption("Show suggested AI prompts in Customize tab", "aiCustomImagePrompts")
				.addValue("Enabled", 1).on().addValue("Disabled", 0).off();
			if (V.aiCustomImagePrompts) {
				App.UI.aiPromptingOptions(options);
			}
		}

		options.addOption("PA avatar art is", "seeAvatar")
			.addValue("Enabled", 1).on().addValue("Disabled", 0).off();

		options.addOption("Slave images in lists are", "seeSummaryImages")
			.addValue("Enabled", 1).on().addValue("Disabled", 0).off();

		options.addOption("Slave images in the weekly report are", "seeReportImages")
			.addValue("Enabled", 1).on().addValue("Disabled", 0).off();
	}

	el.append(options.render());
	return el;
};
