/**
 * @param {number} num
 * @returns {DocumentFragment}
 */
App.UI.Cheat.arcology = function(num) {
	V.cheater = 1;
	const el = new DocumentFragment();
	const arc = V.arcologies[num];
	if (arc.rival) {
		el.append(`You cannot cheat edit your rival's arcology at the moment.`);
	} else {
		const tabBar = new App.UI.Tabs.TabBar("CheatArcology");
		tabBar.addTab("Cheat", "cheat", cheat());
		tabBar.addTab("Future societies", "fs", fs());
		el.append(tabBar.render());
	}

	if (num === 0) {
		if (FutureSocieties.isActive('FSMaturityPreferentialist', arc)) {
			if (V.idealAge < 30) {
				V.idealAge = 30;
			}
			if (V.targetIdealAge < 30) {
				V.targetIdealAge = 30;
			}
			V.policies.idealAge = 1;
		} else if (FutureSocieties.isActive('FSYouthPreferentialist', arc)) {
			if (V.idealAge >= 30) {
				V.idealAge = 29;
			}
			if (V.targetIdealAge >= 30) {
				V.targetIdealAge = 29;
			}
			if (V.targetIdealAge !== 18) {
				V.policies.idealAge = 1;
			}
		}
	}

	return el;

	function cheat() {
		const el = new DocumentFragment();
		let option;
		const options = new App.UI.OptionsGroup();
		options.addOption("Name", "name", arc).showTextBox();
		option = options.addOption("Direction", "direction", arc);
		const compass = ["east", "north", "northeast", "northwest", "south", "southeast", "southwest", "west"];
		if (num > 0) {
			option.addValueList(compass).pulldown();
		}
		options.addOption("government", "government", arc);
		if (num > 0) {
			option.addValueList(["a committee", "a corporation", "an individual", "an oligarchy", "direct democracy", "elected officials"]);
		}
		options.addOption("Leader ID", "leaderID", arc);
		if (num > 0) {
			option.showTextBox();
		}
		options.addOption("Honeymoon", "honeymoon", arc).showTextBox();
		options.addOption("Prosperity", "prosperity", arc).showTextBox();
		options.addOption("Ownership", "ownership", arc).showTextBox();
		options.addOption("Minority", "minority", arc).showTextBox();
		options.addOption("PC minority", "PCminority", arc).showTextBox();
		options.addOption("Demand factor", "demandFactor", arc).showTextBox();
		options.addOption("Embargo", "embargo", arc).showTextBox();
		option = options.addOption("Embargo target", "embargoTarget", arc)
			.addValue("none", -1).off()
			.addValueList(compass).pulldown();
		if (num !== 0) {
			option.addValue("player", 0);
		}
		option = options.addOption("Influence target", "influenceTarget", arc)
			.addValue("none", -1).off()
			.addValueList(compass).pulldown();
		if (num !== 0) {
			option.addValue("player", 0);
		}
		options.addOption("Influence bonus", "influenceBonus", arc).showTextBox();
		options.addOption("Cyber economic", "CyberEconomic", arc).showTextBox();
		option = options.addOption("Cyber economic target", "CyberEconomicTarget", arc)
			.addValue("none", -1).off()
			.addValueList(compass).pulldown();
		if (num !== 0) {
			option.addValue("player", 0);
		}
		options.addOption("Cyber reputation", "CyberReputation", arc).showTextBox();
		option = options.addOption("Cyber reputation target", "CyberReputationTarget", arc)
			.addValue("none", -1).off()
			.addValueList(compass).pulldown();
		if (num !== 0) {
			option.addValue("player", 0);
		}

		const rivalArc = V.arcologies.find((a) => a.rival === 1);
		if (arc.rival === 0 && rivalArc) {
			options.addCustom(`Sorry, you already have a rival in ${rivalArc.name}`);
		} else {
			options.addOption("Rival", "rival", arc)
				.addValue("Yes", 1).on()
				.addValue("No", 0).off();
		}
		if (arc.hasOwnProperty("childhoodFertilityInducedNCSResearch")) {
			options.addOption("Childhood fertility induced NCS research", "childhoodFertilityInducedNCSResearch", arc).showTextBox();
		}
		el.append(options.render());
		return el;
	}

	function fs() {
		const el = new DocumentFragment();
		let option;
		const options = new App.UI.OptionsGroup();
		for (const FS of Object.keys(App.Data.FutureSociety.records)) {
			if (arc.hasOwnProperty(FS)) {
				option = options.addOption(App.Data.FutureSociety.records[FS].noun, FS, arc)
					.addValue("Unset", null);
				if (typeof arc[FS] === "number") {
					option.showTextBox();
				} else {
					option.addValue("Set", 0);
				}

				if (arc.hasOwnProperty(`${FS}Research`)) {
					options.addOption(`${App.Data.FutureSociety.records[FS].noun} research`, `${FS}Research`, arc)
						.addValue("Yes", 1).on()
						.addValue("No", 0).off();
				}
				if (num === 0) {
					if (arc.hasOwnProperty(`${FS}Decoration`)) {
						options.addOption(`${App.Data.FutureSociety.records[FS].noun} decoration`, `${FS}Decoration`, arc).showTextBox();
					}
				}
				if (FS === "FSSupremacist") {
					option = options.addOption(`Supremacist race`, `FSSupremacistRace`, arc);
					for (const [race, capRace] of App.Data.misc.filterRaces) {
						option.addValue(capRace, race);
					}
				} else if (FS === "FSSubjugationist") {
					option = options.addOption(`Subjugationist race`, `FSSubjugationistRace`, arc);
					for (const [race, capRace] of App.Data.misc.filterRaces) {
						option.addValue(capRace, race);
					}
				}
			}
		}
		el.append(options.render());
		return el;
	}
};

App.UI.Cheat.arcologyPassage = function() {
	const node = new DocumentFragment();
	App.UI.DOM.appendNewElement("h2", node, "Cheating Edit Arcology");

	if (
		(V.economy !== 100) ||
		(V.seeDicks !== 25) ||
		(V.continent !== "North America") ||
		(V.internationalTrade !== 1) ||
		(V.internationalVariety !== 1) ||
		(V.seeRace !== 1) ||
		(V.seeNationality !== 1) ||
		(V.seeExtreme !== 0) ||
		(V.plot !== 1)
	) {
		App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
			"Restore defaults",
			App.Intro.arcDefault
		));
	}
	node.append(App.UI.Cheat.arcology(0));

	return node;
};
