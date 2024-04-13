App.UI.universalRules = function() {
	const node = new DocumentFragment();
	let option;
	const tabBar = new App.UI.Tabs.TabBar("CheatArcology");
	tabBar.addTab("Permissions", "permissions", permissions());
	tabBar.addTab("Slave mods", "mods", mods());
	tabBar.addTab("Names", "names", names());
	if (V.seePreg) {
		tabBar.addTab("Babies", "babies", babies());
	}
	node.append(
		// App.UI.DOM.makeElement("h1", `Universal Rules`),
		tabBar.render()
	);
	return node;

	function permissions() {
		const frag = new DocumentFragment();
		App.UI.DOM.appendNewElement("h2", frag, `Permissions for slaves`);

		let options = new App.UI.OptionsGroup();

		options.addOption("Get consent before fucking other slaves", "universalRulesConsent")
			.addValue("Yes", 1).on()
			.addValue(`No`, 0).off();

		options.addOption("Slave requests for body mods are", "modRequestsAllowed")
			.addValue("Allowed", 1).on()
			.addValue(`Forbidden`, 0).off();

		options.addOption("Slave requests for growth hormones are", "expansionRequestsAllowed")
			.addValue("Allowed", 1).on()
			.addValue(`Forbidden`, 0).off();

		if (V.brothel + V.club + V.dairy + V.farmyard + V.servantsQuarters + V.arcade + V.schoolroom + V.spa + V.nursery + V.clinic + V.masterSuite + V.cellblock > 0) {
			options.addOption("Slaves cooperate with staffed facilities to improve their performance", "universalRulesFacilityWork")
				.addValue("Allow", 1).on()
				.addValue(`Stop`, 0).off();

			options.addOption("Slave permission to assign themselves to facilities when choosing their assignment", "universalRulesAssignsSelfFacility")
				.addValue("Allow", 1).on()
				.addValue(`Stop`, 0).off();
		}

		options.addOption("Immobile slaves maintain their muscles rather than allow themselves to become soft", "universalRulesImmobileSlavesMaintainMuscles")
			.addValue("Mandatory workouts", 1).on()
			.addValue(`Stop`, 0).off();

		frag.append(options.render());

		App.UI.DOM.appendNewElement("h2", frag, `New slaves`);
		options = new App.UI.OptionsGroup();
		options.addOption(`Apply Rules Assistant to newly acquired slaves`, "universalRulesNewSlavesRA")
			.addValue("Yes", 1).on()
			.addValue("No", 0).off();
		frag.append(options.render());
		return frag;
	}

	function mods() {
		const frag = new DocumentFragment();
		App.UI.DOM.appendNewElement("h2", frag, `Branding for slaves`);
		frag.append(App.UI.brandSelect("official"));

		App.UI.DOM.appendNewElement("h2", frag, `Scarring for slaves`);
		frag.append(App.UI.scarSelect("official"));

		return frag;
	}

	function names() {
		const frag = new DocumentFragment();
		App.UI.DOM.appendNewElement("h2", frag, `Names for slaves`);

		const options = new App.UI.OptionsGroup();

		options.addOption("Slaves keep surnames", "surnamesForbidden")
			.addValue("Yes", 0).on()
			.addValue(`No going forward`, 1).off()
			.customButton(`No and strip all current surnames`, () => {
				for (const slave of V.slaves) {
					slave.slaveSurname = 0;
				}
				V.surnamesForbidden = 1;
			}, passage());

		if (V.surnamesForbidden === 0) {
			options.addOption("Surname convention", "surnameScheme")
				.addValue("Family (Patrilineal)", 0)
				.addValue("Family (Matrilineal)", 1)
				.addValue("Norse (Patronymic)", 2)
				.addValue("Norse (Matronymic)", 3)
				.addValue("Hadesha (Patronymic)", 4)
				.addValue("Hadesha (Matronymic)", 5)
				.addValue("Double-barreled", 6)
				.addValue("Hispanic", 7)
				.addValue("Lusitanic", 8)
				.addComment((() => {
					const start = "If Adam Smith and Betty Jones have a daughter, Charlotte, and a son, Daniel, they will be named ";
					switch (V.surnameScheme) {
						case 0:
							return start + "Charlotte Smith and Daniel Smith";
						case 1:
							return start + "Charlotte Jones and Daniel Jones";
						case 2:
							return start + "Charlotte Adamsdóttir and Daniel Adamsson";
						case 3:
							return start + "Charlotte Bettysdóttir and Daniel Bettysson";
						case 4:
							return start + "Charlotte Adam and Daniel Adam";
						case 5:
							return start + "Charlotte Betty and Daniel Betty";
						case 6:
							return start + "Charlotte Smith-Jones and Daniel Smith-Jones";
						case 7:
							return start + "Charlotte Smith Jones and Daniel Smith Jones";
						case 8:
							return start + "Charlotte Jones Smith and Daniel Jones Smith";
					}
				})());
			if ([0, 1, 6, 7, 8].includes(V.surnameScheme)) {
				options.addOption("Grant this family name to children born without one", "surnameArcology").showTextBox();
			}
			if ([0, 1, 2, 3, 4, 5].includes(V.surnameScheme)) {
				options.addOption("Override gender preference for your own children", "surnamePCOverride")
					.addValue("Follow conventions", 0).on().addValue("Prefer using your name", 1).addValue("Avoid using your name", 2);
			}
		}

		options.addOption("Slave nicknames", "nicknamesAllowed")
			.addValue("Allowed", 1).on()
			.addValue(`Forbidden`, 0).off();

		if (V.FSAnnounced > 0) {
			options.addOption("Future society names for new slaves", "useFSNames")
				.addValue("Applied", 1).on()
				.addValue(`Not applied`, 0).off();

			if (V.useFSNames !== 0) {
				option = options.addOption("Future society names for new slaves", "FSNamePref")
					.addValue(`No direction`, 0);

				if (V.arcologies[0].FSChattelReligionist >= 20) {
					option.addValue(`Devotional`, 1);
				}
				if (V.arcologies[0].FSRomanRevivalist > 20) {
					option.addValue(`Roman`, 2);
				}
				if (V.arcologies[0].FSAztecRevivalist > 20) {
					option.addValue(`Aztec`, 3);
				}
				if (V.arcologies[0].FSEgyptianRevivalist > 20) {
					option.addValue(`Egyptian`, 4);
				}
				if (V.arcologies[0].FSEdoRevivalist > 20) {
					option.addValue(`Japanese`, 5);
				}
				if (FutureSocieties.isActive('FSDegradationist')) {
					option.addValue(`Degrading`, 6);
				}
				if (V.arcologies[0].FSPaternalist >= 20) {
					option.addValue(`Paternalist`, 7);
				}
				if (V.arcologies[0].FSIntellectualDependency >= 20) {
					option.addValue(`Simple Bimbo`, 8);
				}
				if (V.arcologies[0].FSPastoralist >= 20) {
					option.addValue(`Pastoralist`, 9);
				}
				if (V.arcologies[0].FSAntebellumRevivalist > 20) {
					option.addValue('Antebellum', 10);
				}
			}
		}
		frag.append(options.render());
		return frag;
	}

	function babies() {
		const frag = new DocumentFragment();
		const r = [];
		App.UI.DOM.appendNewElement("h2", frag, `Pregnant slaves`);
		let options = new App.UI.OptionsGroup();

		if (V.universalRulesImpregnation === "HG") {
			r.push(`Fertile slaves will be systematically impregnated by your Head Girl,`);
			const {he} = getPronouns(S.HeadGirl ? S.HeadGirl : {pronoun: App.Data.Pronouns.Kind.plural});
			if (!V.HeadGirlID) {
				r.push(`once you designate one capable of the act.`);
			} else {
				r.push(`if ${he} is able to do so.`);
			}
		} else if (V.universalRulesImpregnation === "Stud") {
			if (!V.StudID) {
				r.push(`Fertile slaves will be systematically impregnated by a Stud, once you designate a subordinate slave to act as such.`);
			} else {
				const stud = slaveStateById(V.StudID);
				const {he} = getPronouns(stud ? stud : {pronoun: App.Data.Pronouns.Kind.plural});
				r.push(`Fertile slaves will be systematically impregnated by your Stud, if ${he} is able to do so.`);
			}
		} else if (V.universalRulesImpregnation === "PC") {
			r.push(`Fertile slaves will be systematically impregnated by you.`);
		} else if (V.universalRulesImpregnation === "Slaves") {
			r.push(`Fertile slaves will be systematically inseminated wth your chattels' collected cum; who knows who the father will be?`);
		} else if (V.universalRulesImpregnation === "Citizens") {
			r.push(`Fertile slaves will be systematically impregnated by ${V.arcologies[0].name}'s citizens.`);
		} else {
			r.push(`Fertile slaves will not be systematically impregnated.`);
		}
		option = options.addOption(r.join(" "), "universalRulesImpregnation");
		option.addValue(`No regimen`, "none", () => V.universalHGImpregnateMasterSuiteToggle = 0);
		if (isVirile(V.PC)) {
			option.addValue(`Inseminate them yourself`, "PC", () => V.universalHGImpregnateMasterSuiteToggle = 0);
		}
		if (V.seeDicks !== 0) {
			option.addValue(`Head Girl`, "HG");
		}
		option.addValue(`Stud`, "Stud");
		if (["HG", "Stud"].includes(V.universalRulesImpregnation)) {
			options.addOption(`${V.universalRulesImpregnation}, if able, will impregnate slaves in the Master Suite`, "universalHGImpregnateMasterSuiteToggle")
				.addValue("Yes", 1).on()
				.addValue("No", 0).off();
		}
		option.addValue(`Slaves`, "Slaves", () => { V.universalRulesSuperfetationImpregnation = 0; V.universalHGImpregnateMasterSuiteToggle = 0; });
		option.addValue(`Citizens`, "Citizens", () => { V.universalRulesSuperfetationImpregnation = 0; V.universalHGImpregnateMasterSuiteToggle = 0; });
		if (["Slaves", "Citizens"].includes(V.universalRulesImpregnation)) {
			options.addOption(`${V.universalRulesImpregnation} are permitted to impregnate your harem`, "universalHGImpregnateMasterSuiteToggle")
				.addValue("Yes", 1).on()
				.addValue("No", 0).off();
		}

		if (["HG", "PC", "Stud"].includes(V.universalRulesImpregnation)) {
			options.addOption(`Further impregnate already-pregnant slaves with superfetation quirk.`, `universalRulesSuperfetationImpregnation`)
				.addValue("Yes", 1).on()
				.addValue("No", 0).off();
			if (V.universalRulesSuperfetationImpregnation === 1) {
				option.addComment(`Already-pregnant slaves with the superfetation quirk will be included in systematic impregnation.`);
			} else {
				option.addComment(`Already-pregnant slaves with the superfetation quirk will be ignored in systematic impregnation.`);
			}
		}

		option = options.addOption(`Scan heavily pregnant slaves daily`, "universalRulesBirthing")
			.addValue("Yes", 1).on()
			.addValue("No", 0).off();
		if (V.universalRulesBirthing === 1) {
			option.addComment(`Heavily pregnant slaves will be scanned daily for signs of labor and moved to a birthing area immediately if any are detected.`);
		} else {
			option.addComment(`Heavily pregnant slaves will be required to work right up until they feel contractions. This will increase upkeep costs for these slaves`);
		}

		option = options.addOption(`Slave birth`, "universalRulesCSec")
			.addValue("C-sections", 1)
			.addValue("Naturally", 0);

		if (V.universalRulesCSec === 1) {
			option.addComment(`Pregnant slaves will be given Caesarean sections rather than allowed to give birth naturally in order to minimize health issues and to preserve their vaginas.`);
		} else {
			option.addComment(`Pregnant slaves will give birth naturally unless health issues pose a threat. Will lessen medical costs, at the expense of scarring`);
		}
		frag.append(options.render());

		App.UI.DOM.appendNewElement("h2", frag, `Babies`);
		options = new App.UI.OptionsGroup();

		option = options.addOption(`Babies will be sent to`, "DefaultBirthDestination")
			.addValue("Decide individually", "individually decided fates", () => V.universalRulesChildrenBecomeBreeders = 0)
			.addValue("Slave orphanage", "an orphanage", () => V.universalRulesChildrenBecomeBreeders = 0)
			.addValue("Citizen school", "a citizen school", () => V.universalRulesChildrenBecomeBreeders = 0)
			.addValue("Private school", "a private school", () => V.universalRulesChildrenBecomeBreeders = 0);
		if (V.incubator.capacity > 0) {
			if (App.Entity.facilities.incubator.capacity - (V.incubator.tanks.length + FetusGlobalReserveCount("incubator")) > 0) {
				option.addValue(`${capFirstChar(V.incubator.name)}`, "the incubator", () => V.universalRulesChildrenBecomeBreeders = 0);
			} else {
				frag.append(`${capFirstChar(V.incubator.name)} has no empty tanks. Either build more or reduce reservations.`);
			}
		}
		if (V.nursery > 0) {
			if (App.Entity.facilities.nursery.capacity - (V.nurseryChildren + FetusGlobalReserveCount("nursery")) > 0) {
				option.addValue(`${capFirstChar(V.nurseryName)}`, "the nursery", () => V.universalRulesChildrenBecomeBreeders = 0);
			} else {
				frag.append(`${capFirstChar(V.nurseryName)} is full.`);
			}
		}

		if (V.policies.cash4Babies > 0) {
			option.addValue("Market", "the market");
		}
		if (V.arcologies[0].FSRepopulationFocus > 40) {
			option.addValue("Breeder schools", "breeder schools", () => V.universalRulesChildrenBecomeBreeders = 1)
				.addComment(`Will require a ${cashFormat(50)} donation per week once enrollment begins`);
		}
		option.addComment(`Children reserved for the Incubator or Nursery will not be affected`);
		frag.append(options.render());
		return frag;
	}
};
