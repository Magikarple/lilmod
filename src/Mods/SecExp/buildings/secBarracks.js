App.Mods.SecExp.barracks = (function() {
	return {
		init,
		GUI
	};

	function init() {
		V.SecExp.buildings.barracks = {
			size: 0,
			luxury: 0,
			training: 0,
			loyaltyMod: 0
		};
	}

	function GUI() {
		const node = new DocumentFragment();
		V.nextButton = "Back";
		V.nextLink = "Main";
		let r = [];
		let cost;
		let text;

		node.append(`While this is a sore sight for many citizens of ${V.arcologies[0].name}, the barracks stand proud before you. `);
		App.UI.DOM.appendNewElement("h1", node, "Upgrades", ["underline"]);
		switch (V.SecExp.buildings.barracks.size) {
			case 0: r.push("The building is relatively small and able to house a limited number of units."); break;
			case 1: r.push("The building has been expanded and can now house more units comfortably."); break;
			case 2: r.push("The building has been further expanded and can now house a high number of units."); break;
			case 3: r.push("The building has been greatly expanded and can now house a sizable military."); break;
			case 4: r.push("The building has been greatly expanded and can now house a small army."); break;
			case 5: r.push("The building has been greatly expanded and can now house an army worthy of an old world nation."); break;
		}
		App.UI.DOM.appendNewElement("div", node, toSentence(r, " ", " "));
		r = [];

		if (V.SecExp.buildings.barracks.luxury === 0) {
			node.append("The barracks are a spartan building, with little to make the day to day lives of your soldiers pleasant.");
		} else {
			r.push("The barracks have been made more comfortable by");
			if (V.SecExp.buildings.barracks.luxury >= 1) {
				r.push("installing high tech furniture");
			}
			if (V.SecExp.buildings.barracks.luxury >= 2) {
				r.push("and advanced kitchen facilities");
			}
			if (V.SecExp.buildings.barracks.luxury >= 3) {
				r.push("It also provides free access to any digital media");
			}
			if (V.SecExp.buildings.barracks.luxury >= 4) {
				r.push("A small limited-access brothel has been added to the structure");
			}
			App.UI.DOM.appendNewElement("div", node, toSentence(r));
		}

		if (V.SecExp.buildings.barracks.training === 0) {
			App.UI.DOM.appendNewElement("div", node, "The building lacks the space and the equipment to train your units.");
		} else if (V.SecExp.buildings.barracks.training === 1) {
			App.UI.DOM.appendNewElement("div", node, "A training facility has been set up, allowing your units to better their skills with time.");
		} else {
			App.UI.DOM.appendNewElement("div", node, "The training facility has been filled with specialized equipment and skilled trainers.");
		}

		if (V.SecExp.buildings.barracks.loyaltyMod === 0) {
			App.UI.DOM.appendNewElement("div", node, "The barracks lack an indoctrination facility.");
		} else if (V.SecExp.buildings.barracks.loyaltyMod === 1) {
			App.UI.DOM.appendNewElement("div", node, "The barracks have been fitted with an indoctrination facility.");
		} else {
			App.UI.DOM.appendNewElement("div", node, "The barracks have been fitted with an advanced indoctrination facility.");
		}
		App.Events.addParagraph(node, []);

		if (V.SecExp.buildings.barracks.size < 5) {
			cost = Math.trunc(5000 * (V.SecExp.buildings.barracks.size + 1) * V.upgradeMultiplierArcology);
			node.append(App.UI.DOM.link("Increase the size of the barracks", () => {
				cashX(-cost, "capEx");
				V.SecExp.buildings.barracks.size++;
				App.UI.reload();
			}
			));
			App.UI.DOM.appendNewElement("div", node, `Costs ${cashFormat(cost)} and will increase the maximum number of units by 2`, ["note"]);
		} else {
			const activeSF = V.SF.Toggle && V.SF.Active >= 1;
			const sectionSF = activeSF && V.SF.Squad.Firebase > 5 && V.SecExp.edicts.SFSupportLevel >= 4 && App.Mods.SecExp.battle.maxUnits() === 18 && App.Mods.SecExp.battle.deploySpeed() <= 10;
			const reasons = [];
			if (activeSF) {
				if (V.SF.Squad.Firebase < 5) {
					reasons.push('the Firebase is expanded');
				}
				if (V.SecExp.edicts.SFSupportLevel < 4) {
					reasons.push('the scope of the support contract/edict is increased');
				}
			}

			if (reasons.length > 0 || sectionSF) {
				const capSF = capFirstChar(V.SF.Lower || "the Special Force");
				if (reasons.length > 0) {
					App.UI.DOM.appendNewElement("div", node, `The Colonel says that ${capSF} may be able to provide assistance if ${toSentence(reasons)}.`);
				}
				cost = Math.trunc( (750000 * (1.15 + (App.Mods.SF.upgrades.total() / 1000)) * (1.15 + (V.SF.Squad.Firebase / 10))) * App.Mods.SF.env() );
				if (sectionSF && !V.SecExp.sectionInFirebase) {
					node.append(App.UI.DOM.link(`Direct the ${capSF} to provide the security force with their own section in the Firebase `, () => {
						V.SecExp.sectionInFirebase = 1;
						cashX(-cost, "specialForcesCap");
						App.UI.reload();
					}
					));
					App.UI.DOM.appendNewElement("span", node, `Costs ${cashFormat(cost)}`, ["cash", "dec"]);
				}
			} else {
				App.UI.DOM.appendNewElement("div", node, "You've expanded the barracks to their maximum.");
			}
		}

		if (V.SecExp.buildings.barracks.luxury < 4) {
			switch (V.SecExp.buildings.barracks.luxury) {
				case 0:
					cost = Math.trunc(5000 * V.upgradeMultiplierTrade);
					text = "Increase the quality of life of your soldiers by installing high tech furniture and appliances";
					break;
				case 1:
					cost = Math.trunc(10000 * V.upgradeMultiplierTrade);
					text = "Further increase the quality of life of your soldiers by installing advanced kitchen equipment and hiring skilled chefs";
					break;
				case 2:
					cost = Math.trunc(10000 * V.upgradeMultiplierTrade);
					text = "Further increase the quality of life of your soldiers by providing high speed, free access to digital media";
					break;
				case 3:
					cost = Math.trunc(15000 * V.upgradeMultiplierTrade);
					text = "Further increase the quality of life of your soldiers by adding and staffing an exclusive brothel to the structure";
			}

			App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(text, () => {
				cashX(forceNeg(cost), "capEx");
				V.SecExp.buildings.barracks.luxury++;
				App.UI.reload();
			}
			));
			App.UI.DOM.appendNewElement(
				"div",
				node,
				`Costs ${cashFormat(cost)} and will provide a 5% bonus to morale${V.SecExp.buildings.barracks.luxury === 0 ? "." : ` for a total of +${(V.SecExp.buildings.barracks.luxury + 1) * 5}.`}`,
				["note"]
			);
		} else {
			App.UI.DOM.appendNewElement("div", node, "You've made life in your barracks as good as it can get.");
		}

		if (V.SecExp.buildings.barracks.training < 2) {
			switch (V.SecExp.buildings.barracks.training) {
				case 0:
					cost = Math.trunc(10000 * V.upgradeMultiplierArcology);
					text = "Add a training facility to the barracks";
					break;
				case 1:
					cost = Math.trunc(20000 * V.upgradeMultiplierTrade);
					text = "Improve the training facility with modern equipment and skilled personnel";
			}

			App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(text, () => {
				cashX(forceNeg(cost), "capEx");
				V.SecExp.buildings.barracks.training++;
				App.UI.reload();
			}
			));
			App.UI.DOM.appendNewElement("div", node, `Costs ${cashFormat(cost)} and will allow units to accumulate ${V.SecExp.buildings.barracks.training === 0 ? "some" : "additional"} experience each week.`, ["note"]);
		} else {
			App.UI.DOM.appendNewElement("div", node, "You have improved the training facility to the limit.");
		}

		if (V.SecExp.buildings.barracks.loyaltyMod < 2) {
			switch (V.SecExp.buildings.barracks.loyaltyMod) {
				case 0:
					cost = Math.trunc(10000 * V.upgradeMultiplierArcology);
					text = "Add an indoctrination facility to the barracks";
					break;
				case 1:
					cost = Math.trunc(20000 * V.upgradeMultiplierTrade);
					text = "Improve the indoctrination facility with advanced equipment and skilled personnel";
			}

			App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(text, () => {
				cashX(forceNeg(cost), "capEx");
				V.SecExp.buildings.barracks.loyaltyMod++;
				App.UI.reload();
			}
			));
			App.UI.DOM.appendNewElement("div", node, `Costs ${cashFormat(cost)} and will ${V.SecExp.buildings.barracks.loyaltyMod === 0 ? "slowly raise loyalty of all units" : "raise loyalty of all units faster"}.`, "note");
		} else {
			App.UI.DOM.appendNewElement("div", node, "You have improved the indoctrination facility to the limit.");
		}

		App.UI.DOM.appendNewElement("h1", node, "Units", "underline");
		node.append(`${App.Mods.SecExp.battle.activeUnits()}/${App.Mods.SecExp.battle.maxUnits()} are active, totalling ${num(App.Mods.SecExp.unit.squads().reduce((acc, t) => acc += t.troops, 0))} troops `);
		if (App.Mods.SecExp.battle.activeUnits() <= 2 * App.Mods.SecExp.battle.deploySpeed()) {
			node.append(`and all can be deployed.`);
		} else {
			node.append(`however only ${2 * App.Mods.SecExp.battle.deploySpeed()} units can be deployed due to low readiness.`);
		}
		if (V.SecExp.buildings.barracks.luxury > 0) {
			node.append(` The barracks provides ${V.SecExp.buildings.barracks.luxury * 5}% bonus morale when battle occurs.`);
		}
		if (V.SecExp.buildings.barracks.training > 0) {
			node.append(" The training facility will increase the effectiveness of your units with time.");
		}

		const options = new App.UI.OptionsGroup();
		options.addOption("Unit descriptions are", "unitDescriptions", V.SecExp.settings)
			.addValue("Abbreviated", 1).on().addValue("Summarized", 0).off();
		node.append(options.render());
		if (App.Mods.SecExp.battle.activeUnits() >= App.Mods.SecExp.battle.maxUnits()) {
			App.UI.DOM.appendNewElement("div", node, "You have reached the maximum number of units. You'll have to disband one or enlarge the barracks before forming a new unit.");
		}
		node.append(App.Mods.SecExp.unit.replenishAll());

		const tabBar = new App.UI.Tabs.TabBar("SecExpBarracks");
		for (const [unit, data] of App.Mods.SecExp.unit.list()) {
			if (data.unlock) {
				tabBar.addTab(`${capFirstChar(data.name || unit)}: ${(V.SecExp.units[unit].squads.length)}`, unit, page(unit));
			} else {
				App.UI.DOM.appendNewElement("div", node, data.lockedText);
			}
		}
		node.append(tabBar.render());
		return node;

		function page(u) {
			const r = new DocumentFragment();
			switch (u) {
				case "slaves":
					App.UI.DOM.appendNewElement("div", r, `You are free to organize your menial slaves into fighting units. Currently you have ${num(V.menials)} slaves available, while ${num(App.Mods.SecExp.Manpower.employedSlave)} are already employed as soldiers. During all your battles you lost a total of ${num(V.SecExp.units.slaves.dead)}.`);
					break;
				case "militia":
					App.UI.DOM.appendNewElement("div", r, `You founded the ${V.arcologies[0].name} free militia. You are now able to organize your citizens into fighting units.`);
					switch (V.SecExp.edicts.defense.militia) {
						case 2:
							App.UI.DOM.appendNewElement("div", r, `The militia is composed entirely of volunteers, your manpower is ${num(App.Mods.SecExp.militiaCap()*100)}% of the citizens population of your arcology.`);
							break;
						case 3:
							App.UI.DOM.appendNewElement("div", r, `With the establishment of conscription, your available manpower has increased to now ${num(App.Mods.SecExp.militiaCap()*100)}% of the arcology's citizens population.`);
							break;
						case 4:
							App.UI.DOM.appendNewElement("div", r, `By establishing obligatory military service to obtain citizenship you have enlarged your manpower pool to be ${num(App.Mods.SecExp.militiaCap()*100)}% of the arcology's citizens population.`);
							break;
						case 5:
							App.UI.DOM.appendNewElement("div", r, `With the adoption of a militarized society, your available manpower has swelled to be ${num(App.Mods.SecExp.militiaCap()*100)}% of the arcology's citizens population.`);
					}
					App.UI.DOM.appendNewElement("div", r, `Your current total manpower is ${num(App.Mods.SecExp.Manpower.totalMilitia)}, of which ${num(App.Mods.SecExp.Manpower.employedMilitia)} is in active duty. You lost in total ${num(V.SecExp.units.militia.dead)} citizens, leaving you with ${num(V.SecExp.units.militia.free)} available citizens.`);
					break;
				case "mercs":
					App.UI.DOM.appendNewElement("div", r, `With the installation of a mercenary company in the arcology, many other are attracted to your free city, hoping to land a contract with you.`);
					App.UI.DOM.appendNewElement("div", r, `You are able to organize them in units to use in the defense of the arcology. Excluding the defense force you set up, there are ${num(App.Mods.SecExp.Manpower.totalMerc)} mercenaries in your arcology, of which ${num(App.Mods.SecExp.Manpower.employedMerc)} actively employed and ${num(V.SecExp.units.mercs.free)} not yet under contract. In total ${num(V.SecExp.units.mercs.dead)} mercenaries have died defending your arcology.`);
					break;
			}

			App.UI.DOM.appendNewElement("div", r, App.Mods.SecExp.unit.barracksList(u));
			return r;
		}
	}
})();
