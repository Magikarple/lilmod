App.Mods.SecExp.unit = (function() {
	const equipUpgradeCost = 350;
	const secBotsUpgradeCost = 450;
	const secBotsCost = 500;
	return {
		list,
		checkID,
		gen: generate,
		barracksList,
		replenishAll,
		isDeployed,
		describe,
		squads,
		genID,
		unitFree,
		// replenish - helper function
	};

	function list() {
		return new Map([
			["bots", {
				baseID: 0,
				maxID: 99,
				defaultName: "drone squad",
				previousVars: {
					count: (V.SecExp.units.bots && V.SecExp.units.bots.ID || V.secBots ? 1 : undefined),
					squads: (V.SecExp.units.bots && V.SecExp.units.bots.ID || V.secBots) ? [V.SecExp.units.bots || V.secBots] : undefined
				},
				unlock: V.arcologyUpgrade.drones > 0,
				lockedText: "As you have not yet installed a drone security system in your arcology, you will not be able to form a unit of drones.",
				name: "Security Drones",
				squadSizeCap: V.SF.Toggle && V.SF.Active >= 1 && V.SecExp.edicts.SFSupportLevel >= 1 ? 100 : 80
			}],
			["slaves", {
				baseID: 100,
				maxID: 199,
				defaultName: "slave platoon",
				costMod: 0.5,
				previousVars: {
					count: V.createdSlavesUnits,
					squads: V.slaveUnits,
					killed: V.slavesTotalCasualties,
				},
				unlock: true,
				squadSizeCap: 50
			}],
			["militia", {
				baseID: 200,
				maxID: 299,
				defaultName: "citizens' platoon",
				costMod: 1,
				previousVars: {
					count: V.createdMilitiaUnits,
					squads: V.militiaUnits,
					killed: V.militiaTotalCasualties,
					free: V.militiaFreeManpower
				},
				unlock: V.SecExp.edicts.defense.militia > 0,
				lockedText: "As you have not yet founded the militia, you will not be able to form citizens units.",
				squadSizeCap: 50
			}],
			["mercs", {
				baseID: 300,
				maxID: 399,
				defaultName: "mercenary platoon",
				costMod: 1.5,
				previousVars: {
					count: V.createdMercUnits,
					squads: V.mercUnits,
					killed: V.mercTotalCasualties,
					free: V.mercFreeManpower
				},
				unlock: V.mercenaries > 0,
				lockedText: "As mercenaries are not allowed inside the arcology. You will not be able to recruit mercenary units.",
				name: "Mercenaries",
				squadSizeCap: 50
			}],
		]);
	}

	/** Calculate the unit type via passed unitID.
	 * @param {number} unitID
	 * @returns {FC.SecExp.PlayerHumanUnitTypeMod}
	 */
	function checkID(unitID) {
		for (const [u, d] of list()) {
			if (unitID.isBetween(d.baseID, d.maxID, true)) {
				return u;
			}
		}
	}

	/** Creates the requested unit object.
	 * @param {FC.SecExp.PlayerHumanUnitTypeMod} type
	 * @returns {void}
	 */
	function generate(type, addNew=false) {
		if (V.secExpEnabled === 0) {
			return;
		}

		if (!V.SecExp.units[type] || Object.values(list().get(type).previousVars).filter(s => s !== undefined).length) {
			const squads = list().get(type).previousVars.squads;
			const defaultName = list().get(type).defaultName;
			const count = list().get(type).previousVars.count;
			const killed = list().get(type).previousVars.killed;
			const free = list().get(type).previousVars.free;

			V.SecExp.units[type] = V.SecExp.units[type] || {};
			if (type === "bots" && (V.SecExp.units.bots.ID || V.secBots)) {
				V.SecExp.units[type] = {};
			} else {
				V.SecExp.units[type].dead = V.SecExp.units[type].dead || killed || 0;
				if (type !== 'slaves') {
					V.SecExp.units[type].free = V.SecExp.units[type].free || free || 0;
				}
			}
			V.SecExp.units[type].squads = V.SecExp.units[type].squads || squads || [];
			V.SecExp.units[type].defaultName = V.SecExp.units[type].defaultName || defaultName;
			V.SecExp.units[type].created = V.SecExp.units[type].created || count || 0;
		} else if (addNew) {
			V.SecExp.units[type].created++;
			const newUnit = {
				equip: 0,
				active: 1,
				maxTroops: 30,
				troops: 30,
				platoonName: `${ordinalSuffix(V.SecExp.units[type].created)} ${V.SecExp.units[type].defaultName}`,
			};
			if (type !== "bots") {
				Object.assign(newUnit, {
					training: 0,
					cyber: 0,
					medics: 0,
					SF: 0,
					commissars: 0,
					battlesFought: 0,
					loyalty: jsRandom(40, 60),
				});
				newUnit.troops = Math.min(newUnit.maxTroops, unitFree(type).print());
				unitFree(type).remove(newUnit.troops);
			}
			genID(newUnit, type);
			V.SecExp.units[type].squads.push(newUnit);
		}
	}

	/** Prints a list of options that can be applied to the passed unit array.
	 * @param {FC.SecExp.PlayerHumanUnitTypeMod} type
	 * @returns {DocumentFragment}
	 */
	function barracksList(type) {
		const list = new DocumentFragment();
		const unitDetail = new DocumentFragment();
		let linkArray = [];

		linkArray.push("Default unit name:", App.UI.DOM.makeTextBox(V.SecExp.units[type].defaultName, str => { V.SecExp.units[type].defaultName = str; App.UI.reload(); }));
		if (unitFree(type).canUpgrade() && App.Mods.SecExp.battle.activeUnits() < App.Mods.SecExp.battle.maxUnits()) {
			linkArray.push(App.UI.DOM.link(`Form a new unit`, () => {
				generate(type, true);
				if (type === "bots") {
					cashX(forceNeg(secBotsCost * V.SecExp.units.bots.squads.length + 1), "securityExpansion");
				}
				App.UI.reload();
			}
			));
		}
		if (bulkUpgrade(V.SecExp.units[type].squads) !== "N/A") {
			linkArray.push(bulkUpgrade(V.SecExp.units[type].squads));
		}
		App.UI.DOM.appendNewElement("div", list, App.UI.DOM.generateLinksStrip(linkArray));
		if (type === "slaves") {
			App.UI.DOM.appendNewElement("div", list, App.UI.market({menialWorkersOnly: true}));
		}

		for (const unit of V.SecExp.units[type].squads) {
			linkArray = [];
			App.UI.DOM.appendNewElement("div", unitDetail, describe(unit, false));
			linkArray.push(App.UI.DOM.makeTextBox(unit.platoonName, str => { unit.platoonName = str; App.UI.reload(); }));
			linkArray.push(App.UI.DOM.link(`Disband the unit`, () => {
				unitFree(type).add(unit.troops);
				V.SecExp.units[type].squads.delete(unit);
				V.SecExp.battles.lastSelection.delete(unit);
				App.UI.reload();
			}
			));

			if (unit.active === 1) {
				if (unit.troops < unit.maxTroops && unitFree(unit).canUpgrade()) {
					linkArray.push(App.UI.DOM.link(`Replenish unit`, () => {
						replenish(unit);
						App.UI.reload();
					}
					));
				}
			} else {
				if (type !== "bots") {
					if (unitFree(unit).canUpgrade()) {
						linkArray.push(App.UI.DOM.link(`Reform unit`, () => {
							if (unitFree(type).print() >= unit.maxTroops) {
								unitFree(type).remove(unit.maxTroops);
								unit.troops = unit.maxTroops;
							} else {
								unit.troops += unitFree(type).print();
								unitFree(type).set(0);
							}
							unit.training = 0;
							unit.active = 1;
							App.UI.reload();
						}
						));
					}
				} else {
					linkArray.push(App.UI.DOM.link(`Rebuild the unit`, () => {
						cashX(-((unit.maxTroops - unit.troops) * secBotsCost), "securityExpansion");
						unit.troops = unit.maxTroops;
						unit.active = 1;
						App.UI.reload();
					}
					));
				}
			}
			if (bulkUpgrade(unit) !== "N/A") {
				linkArray.push(bulkUpgrade(unit));
			}
			if (V.peacekeepers.state === 3 && type !== "bots") {
				const unitAdjust = Math.ceil((unit.troops / 10) + (unit.maxTroops / 10) + (unit.training / 10) + unit.equip + unit.commissars + unit.cyber + unit.medics + unit.SF);
				const cost = forceNeg(25000 * (1.5 + unitAdjust));
				linkArray.push(App.UI.DOM.link(`Send this unit to improve your relationship with General ${V.peacekeepers.generalName}. Costs ${cashFormat(cost)}.`, () => {
					V.peacekeepers.attitude += Math.ceil(unitAdjust / 5);
					cashX(cost, "securityExpansion");
					unitFree(type).add(unit.troops);
					V.SecExp.units[type].squads.delete(unit);
					V.SecExp.battles.lastSelection.delete(unit);
					App.UI.reload();
				}
				));
			}
			App.UI.DOM.appendNewElement("div", unitDetail, App.UI.DOM.generateLinksStrip(linkArray));

			if (V.SecExp.settings.showStats === 1) {
				App.UI.DOM.appendNewElement("div", unitDetail, App.Mods.SecExp.getUnit(type, unit).printStats());
			}

			let options = new DocumentFragment();
			if (type !== "bots") {
				if (unit.maxTroops < 50) {
					options.append(`For ${cashFormat(upgradeCost("squadSize", unit))} provide this unit's `);
					options.append(App.UI.DOM.link("officers with intensive training", () => {
						cashX(upgradeCost("squadSize", unit), "securityExpansion");
						unit.maxTroops += 10;
						App.UI.reload();
					}
					));
					options.append(` to increase the maximum number of soldiers in the unit by 10.`);
				} else {
					options.append(`Your officers reached their peak. Further training will have little impact on the number of troops they can effectively lead.`);
				}
			} else {
				if (unit.maxTroops < 80) {
					options.append(App.UI.DOM.link("Improve the digital control matrix ", () => {
						cashX(upgradeCost("squadSize", unit), "securityExpansion");
						unit.maxTroops += 10;
						App.UI.reload();
					}
					));
					options.append(`Invest in the development of more refined controls for your drones to increase the maximum number of drones in the unit.`);
					options.append(`Costs ${cashFormat(upgradeCost("squadSize", unit))} per upgrade and each will increase the max by 10`);
				} else if (V.SF.Toggle && V.SF.Active >= 1 && unit.maxTroops < 100 && V.SecExp.edicts.SFSupportLevel >= 1) {
					options.append(App.UI.DOM.link(`Refine the drone network with ${V.SF.Lower} assistance `, () => {
						cashX(upgradeCost("squadSize", unit), "securityExpansion");
						unit.maxTroops += 10;
						App.UI.reload();
					}
					));
					options.append(`Utilize the technological developments made by ${V.SF.Lower} to further improve the control matrix of the security drones.`);
					options.append(`Costs ${cashFormat(upgradeCost("squadSize", unit))} and will increase the max by 10`);
				} else if (V.SF.Toggle && V.SF.Active >= 1 && V.SecExp.edicts.SFSupportLevel === 0) {
					options.append(`There's little left to improve in the matrix. However support from ${V.SF.Lower} might give some more room from improvement, if an assistance contract is signed.`);
				} else {
					options.append(`There's little left to improve in the matrix. Your control systems are at top capacity and won't be able to handle a bigger drone unit.`);
				}
			}
			App.UI.DOM.appendNewElement("div", unitDetail, options);

			options = new DocumentFragment();
			if (type !== "bots") {
				if (unit.equip < 3) {
					options.append(`For ${cashFormat(upgradeCost("equipment", unit))} invest in `);
					options.append(App.UI.DOM.link("better equipment", () => {
						cashX(upgradeCost("equipment", unit), "securityExpansion");
						unit.equip++;
						App.UI.reload();
					}
					));
					options.append(` to increase this unit's attack and defense by 15% per investment.`);
				} else {
					options.append(`The unit is equipped with state of the art weaponry and equipment.`);
				}
			} else {
				if (unit.equip < 3) {
					options.append(App.UI.DOM.link("Improve drone weaponry and armor ", () => {
						cashX(upgradeCost("equipment", unit), "securityExpansion");
						unit.equip++;
						App.UI.reload();
					}
					));
					options.append(`Invest in better equipment for your drones to increase their battle effectiveness.`);
					options.append(`Costs ${cashFormat(upgradeCost("equipment", unit))} and will increase attack and defense value of the unit by 15% for every upgrade.`);
				} else {
					options.append(`Your drones are equipped with top tier weaponry and armor.`);
				}
			}
			App.UI.DOM.appendNewElement("div", unitDetail, options);

			if (type !== "bots") {
				options = new DocumentFragment();
				if (unit.commissars < 2) {
					options.append(`For ${cashFormat(upgradeCost("commissars", unit))} attach `);
					options.append(App.UI.DOM.link("commissars", () => {
						cashX(upgradeCost("commissars", unit), "securityExpansion");
						unit.commissars++;
						App.UI.reload();
					}
					));
					options.append(` to slowly increase this unit's loyalty.`);
				}
				if (unit.commissars === 1) {
					options.append(" The unit has a commissar detachment, keeping under control the ambitions of the unit's officers.");
				} else if (unit.commissars === 2) {
					options.append(" The unit has a perfectly trained and loyal commissar detachment, keeping under control the ambitions of the unit's officers.");
				}
				App.UI.DOM.appendNewElement("div", unitDetail, options);

				options = new DocumentFragment();
				if (V.prostheticsUpgrade >= 2 || V.researchLab.advCombatPLimb === 1) {
					if (unit.cyber === 0) {
						options.append(`For ${cashFormat(upgradeCost("cyber", unit))} `);
						options.append(App.UI.DOM.link("augment all soldiers of the unit", () => {
							cashX(upgradeCost("cyber", unit), "securityExpansion");
							unit.cyber++;
							App.UI.reload();
						}
						));
						options.append(` with high tech cyber enhancements that will increase attack, defense and base hp values.`);
					} else {
						options.append("The unit is equipped with advanced cybernetic enhancements.");
					}
				}
				App.UI.DOM.appendNewElement("div", unitDetail, options);

				options = new DocumentFragment();
				if (unit.medics === 0) {
					options.append(`For ${cashFormat(upgradeCost("medics", unit))} `);
					options.append(App.UI.DOM.link("attach trained medics to the unit", () => {
						cashX(upgradeCost("medics", unit), "securityExpansion");
						unit.medics++;
						App.UI.reload();
					}
					));
					options.append(" which will decrease the number of casualties suffered during battle.");
				} else {
					options.append("The unit has a medic detachment following it into battle, decreasing the number of casualties the unit suffers");
				}
				App.UI.DOM.appendNewElement("div", unitDetail, options);

				if (V.SF.Toggle && V.SF.Active >= 1) {
					options = new DocumentFragment();
					if (unit.SF === 0) {
						options.append(`For ${cashFormat(upgradeCost("SF", unit))} `);
						options.append(App.UI.DOM.link("attach Special Force advisors", () => {
							cashX(upgradeCost("SF", unit), "securityExpansion");
							unit.SF++;
							App.UI.reload();
						}
						));
						options.append(" which will slightly increase the base stats of the unit.");
					} else {
						options.append(`The unit has attached advisors from ${V.SF.Lower} that will help the squad remain tactically aware and active.`);
					}
					App.UI.DOM.appendNewElement("div", unitDetail, options);
				}
			}
			App.UI.DOM.appendNewElement("p", list, unitDetail);
		}
		return list;

		/** Creates a bulk upgrade link for the unit that is passed.
		 * @param {object} unit the unit to be checked
		 */
		function bulkUpgrade(unit) {
			unit = Array.isArray(unit) ? unit : [unit];
			const el = document.createElement("a");
			const price = unit.map(getCost).reduce((acc, cur) => acc + cur, 0);
			if (price !== 0) {
				el.append(App.UI.DOM.link(`Bulk upgrade for ${cashFormat(price)}`, () => {
					unit.map(upgradeUnit).reduce((acc, cur) => acc + cur, 0);
					cashX(price, "securityExpansion");
					App.UI.reload();
				}
				));
				return el;
			} else {
				return "N/A";
			}
			/**
			 * @param {FC.SecExp.PlayerHumanUnitData} x
			 */
			function upgradeUnit(x) {
				x.equip = 3;
				if (checkID(x.ID) !== "bots") {
					Object.assign(x, {
						maxTroops: 50,
						commissars: 2,
						cyber: 1,
						medics: 1,
					});
					x.SF = (V.SF.Active >= 1 ? 1 : 0);
				} else {
					if (x.maxTroops < 80) {
						x.maxTroops = 80;
					} else if (V.SF.Toggle && V.SF.Active >= 1 && x.maxTroops < 100 && V.SecExp.edicts.SFSupportLevel >= 1) {
						x.maxTroops = 100;
					}
				}
			}
			/**
			 * @param {FC.SecExp.PlayerHumanUnitData} x
			 */
			function getCost(x) {
				let cost = 0;
				if (checkID(x.ID) !== "bots") {
					if (x.commissars < 2) {
						cost += upgradeCost("commissars", x);
					}
					if ((V.prostheticsUpgrade >= 2 || V.researchLab.advCombatPLimb === 1) && x.cyber === 0) {
						cost += upgradeCost("cyber", x);
					}
					if (x.medics === 0) {
						cost += upgradeCost("medics", x);
					}
					if (V.SF.Toggle && V.SF.Active >= 1 && x.SF === 0) {
						cost += equipUpgradeCost * x.maxTroops + 5000;
					}
				}
				cost += upgradeCost("squadSize", x);
				if (x.equip < 3) {
					cost += upgradeCost("equipment", x);
				}
				return Math.ceil(cost * 1.1);
			}
		}

		/**
		 * @param {string} upgrade to perform
		 * @param {FC.SecExp.PlayerHumanUnitData} unit
		 */
		function upgradeCost(upgrade, unit) {
			let cost = 0;
			const isBots = checkID(unit.ID) === "bots";
			switch (upgrade) {
				case "squadSize":
					if (isBots) {
						if (unit.maxTroops < 80) {
							cost -= 5000;
						} else if (V.SF.Toggle && V.SF.Active >= 1 && unit.maxTroops < 100 && V.SecExp.edicts.SFSupportLevel >= 1) {
							cost -= 5000 + 10 * secBotsUpgradeCost * unit.equip;
						}
					} else {
						if (unit.maxTroops < 50) {
							cost -= 5000 + 10 * equipUpgradeCost * (unit.equip + unit.commissars + unit.cyber + unit.SF);
						}
					}
					break;
				case "equipment":
					cost -= ((isBots ? secBotsUpgradeCost : equipUpgradeCost) * unit.maxTroops) + 1000;
					break;
				case "commissars":
					cost -= equipUpgradeCost * unit.maxTroops + 1000;
					break;
				case "cyber":
					cost -= equipUpgradeCost * unit.maxTroops + 2000;
					break;
				case "medics":
					cost -= equipUpgradeCost * unit.maxTroops + 3000;
					break;
				case "SF":
					cost -= equipUpgradeCost * unit.maxTroops + 5000;
			}
			return cost;
		}
	}

	/**
	 * @returns {HTMLDivElement}
	 */
	function replenishAll() {
		const el = document.createElement("div");
		const woundedUnit = new Map([]);
		for (const squad of App.Mods.SecExp.unit.squads()) {
			const unit = checkID(squad.ID);
			if (squad.troops < squad.maxTroops && unitFree(unit).canUpgrade()) {
				woundedUnit.set(unit);
			}
		}
		if (woundedUnit.size > 0) {
			el.append(App.UI.DOM.link("Replenish all units", () => {
				for (const [u] of woundedUnit) {
					V.SecExp.units[u].squads.forEach(s => replenish(s));
				}
				App.UI.reload();
			}
			));
			el.append(` Will replenish units as long as requirements are met.\n\n`);
		}
		return el;
	}

	/**
	 * @param {FC.SecExp.PlayerHumanUnitData} unit
	 * @returns {boolean}
	 */
	function isDeployed(unit) {
		return V.SecExp.war.type.includes("Attack") && V.SecExp.war.deployed.includes(unit.ID) || V.SecExp.war.type.includes("Rebellion") && unit.active === 1 && !V.SecExp.war.rebellingID.includes(unit.ID);
	}

	/**
	 * @param {FC.SecExp.PlayerHumanUnitData} input
	 * @param {boolean} inBattle - if true appends a deploy/recall link to the description, allowing for [input] to be deployed/recalled.
	 * @returns {HTMLDivElement}
	 */
	function describe(input, inBattle) {
		const brief = V.SecExp.settings.unitDescriptions;
		const unitType = App.Mods.SecExp.unit.checkID(input.ID);
		const el = new DocumentFragment();

		if (inBattle) {
			const canDeploy = !isDeployed(input) && App.Mods.SecExp.battle.deployableUnits() > 0;
			el.append(App.UI.DOM.link(`(${canDeploy ? 'Deploy' : 'Recall'}) `, () => {
				if (canDeploy) {
					V.SecExp.war.deployed.push(input.ID);
				} else {
					V.SecExp.war.deployed.deleteAt(s => s === input.ID);
				}
				V.SecExp.war.saveValid = 0;
				App.UI.reload();
			}
			));
		}

		App.UI.DOM.appendNewElement("span", el, `${input.platoonName}`, ["bold"]);
		App.UI.DOM.appendNewElement("span", el, `${!brief ? ``:`. `} `);
		if (unitType !== "bots") {
			if (brief === 0) {
				if (input.battlesFought > 1) {
					el.append(`has participated in ${input.battlesFought} battles and is ready to face the enemy once more at your command. `);
				} else if (input.battlesFought === 1) {
					el.append(`is ready to face the enemy once more at your command. `);
				} else {
					el.append(`is ready to face the enemy in battle. `);
				}
				el.append(`Its ${input.troops} men and women are `);

				if (unitType === "militia") {
					el.append(`all proud citizens of your arcology, willing to put their lives on the line to protect their home. `);
				} else if (unitType === "slaves") {
					el.append(`slaves in your possession, tasked with the protection of their owner and their arcology. `);
				} else if (unitType === "mercs") {
					el.append(`mercenaries contracted to defend the arcology against external threats. `);
				}
			} else {
				el.append(`Battles fought: ${input.battlesFought}. `);
			}
		} else {
			if (brief === 0) {
				el.append(`is made up of ${input.troops} drones. All of which are assembled in an ordered formation in front of you, absolutely silent and ready to receive their orders. `);
			}
		}

		if (brief === 0) {
			if (input.troops < input.maxTroops) {
				el.append(`The unit is not at its full strength of ${input.maxTroops} operatives. `);
			}
		} else {
			el.append(`Unit size: ${input.troops}/${input.maxTroops}. `);
		}

		if (brief === 0) {
			if (unitType !== "bots") {
				if (input.equip === 0) {
					el.append(`They are issued with simple, yet effective equipment: firearms, a few explosives and standard uniforms, nothing more. `);
				} else if (input.equip === 1) {
					el.append(`They are issued with good, modern equipment: firearms, explosives and a few specialized weapons like sniper rifles and machine guns. They also carry simple body armor. `);
				} else if (input.equip === 2) {
					el.append(`They are issued with excellent, high tech equipment: modern firearms, explosives, specialized weaponry and modern body armor. They are also issued with modern instruments like night vision and portable radars. `);
				} else {
					el.append(`They are equipped with the best the modern world has to offer: modern firearms, explosives, specialized weaponry, experimental railguns, adaptive body armor and high tech recon equipment. `);
				}
			} else {
				if (input.equip === 0) {
					el.append(`They are equipped with light weaponry, mainly anti-riot nonlethal weapons. Not particularly effective in battle. `);
				} else if (input.equip === 1) {
					el.append(`They are equipped with light firearms, not an overwhelming amount of firepower, but with their mobility good enough to be effective. `);
				} else if (input.equip === 2) {
					el.append(`They are equipped with powerful, modern firearms and simple armor mounted around their frames. They do not make for a pretty sight, but on the battlefield they are a dangerous weapon. `);
				} else {
					el.append(`They are equipped with high energy railguns and adaptive armor. They are a formidable force on the battlefield, even for experienced soldiers. `);
				}
			}
		} else {
			el.append(`Equipment quality: `);
			if (input.equip === 0) {
				el.append(`basic. `);
			} else if (input.equip === 1) {
				el.append(`average. `);
			} else if (input.equip === 2) {
				el.append(`high. `);
			} else {
				el.append(`advanced. `);
			}
		}

		if (unitType !== "bots") {
			if (brief === 0) {
				if (input.training <= 33) {
					el.append(`They lack the experience to be considered professionals, but `);
					if (unitType === "militia") {
						el.append(`their eagerness to defend the arcology makes up for it. `);
					} else if (unitType === "slaves") {
						el.append(`their eagerness to prove themselves makes up for it. `);
					} else if (unitType === "mercs") {
						el.append(`they're trained more than enough to still be an effective unit. `);
					}
				} else if (input.training <= 66) {
					el.append(`They have trained `);
					if (input.battlesFought > 0) {
						el.append(`and fought `);
					}
					el.append(`enough to be considered disciplined, professional soldiers, ready to face the battlefield. `);
				} else {
					el.append(`They are consummate veterans, with a wealth of experience and perfectly trained. On the battlefield they are a well oiled war machine capable of facing pretty much anything. `);
				}

				if (input.loyalty < 10) {
					el.append(`The unit is extremely disloyal. Careful monitoring of their activities and relationships should be implemented. `);
				} else if (input.loyalty < 33) {
					el.append(`Their loyalty is low. Careful monitoring of their activities and relationships is advised. `);
				} else if (input.loyalty < 66) {
					el.append(`Their loyalty is not as high as it can be, but they are not actively working against their arcology owner. `);
				} else if (input.loyalty < 90) {
					el.append(`Their loyalty is high and strong. The likelihood of this unit betraying the arcology is low to non-existent. `);
				} else {
					el.append(`The unit is fanatically loyal. They would prefer death over betrayal. `);
				}

				if (input.cyber > 0) {
					el.append(`The soldiers of the unit have been enhanced with numerous cyber-augmentations which greatly increase their raw power. `);
				}
				if (input.medics > 0) {
					el.append(`The unit has a dedicated squad of medics that will follow them in battle. `);
				}
				if (V.SF.Toggle && V.SF.Active >= 1 && input.SF > 0) {
					el.append(`The unit has "advisors" from ${V.SF.Lower} that will help the squad remain tactically aware and active. `);
				}
			} else {
				el.append(`Training: `);
				if (input.training <= 33) {
					el.append(`low. `);
				} else if (input.training <= 66) {
					el.append(`medium. `);
				} else {
					el.append(`high. `);
				}

				el.append(`Loyalty: `);
				if (input.loyalty < 10) {
					el.append(`extremely disloyal. `);
				} else if (input.loyalty < 33) {
					el.append(`low. `);
				} else if (input.loyalty < 66) {
					el.append(`medium. `);
				} else if (input.loyalty < 90) {
					el.append(`high. `);
				} else {
					el.append(`fanatical. `);
				}
				App.UI.DOM.appendNewElement("div", el);

				if (jsDef(input.cyber) && input.cyber > 0) {
					el.append(`Cyber-augmentations applied. `);
				}
				if (jsDef(input.medics) && input.medics > 0) {
					el.append(`Medical squad attached. `);
				}
				if (V.SF.Toggle && V.SF.Active >= 1 && jsDef(input.SF) && input.SF > 0) {
					el.append(`${capFirstChar(V.SF.Lower || "the Special Force")} "advisors" attached. `);
				}
			}
		}

		if (!input.active) {
			App.UI.DOM.appendNewElement("div", el, `This unit has lost too many operatives `);
			if (jsDef(input.battlesFought)) {
				el.append(`in the ${input.battlesFought} it fought `);
			}
			el.append(`and can no longer be considered a unit at all. `);
		}
		return el;
	}

	/** Generates an array of units
	 * @returns {Array}
	 */
	function squads(type = '') {
		const array = Object.values(V.SecExp.units).map(s => s.squads).flatten();
		switch (type) {
			case "human": return array.filter(s => checkID(s.ID) !== "bots");
		}
		return array;
	}

	/** Generate a unit ID for a new unit
	 * @param {FC.SecExp.PlayerHumanUnitData} squad
	 * @param {FC.SecExp.PlayerHumanUnitTypeMod} unit
	 * @returns {void}
	 */
	function genID(squad, unit) {
		if (V.SecExp.units[unit].squads.filter(s => !s.ID.isBetween(list().get(unit).baseID, list().get(unit).maxID, true)).length) {
			const oldID = squad.ID;
			let location;
			const newID = list().get(unit).baseID + (unit === 'bots' ? 0 : oldID);
			if (V.SecExp.battles.lastSelection && V.SecExp.battles.lastSelection.includes(oldID) || V.lastSelection && V.lastSelection.includes(oldID)) {
				if (V.SecExp.battles.lastSelection) {
					location = V.SecExp.battles.lastSelection.indexOf(oldID);
				} else {
					location = V.lastSelection.indexOf(oldID);
					V.SecExp.battles.lastSelection = [];
				}
				V.SecExp.battles.lastSelection[location] = newID;
			}
			squad.ID = newID;
		} else if (!jsDef(squad.ID)) {
			if (V.SecExp.units[unit].squads.length === 0) {
				squad.ID = list().get(unit).baseID;
			} else {
				squad.ID = Math.max(
					V.SecExp.units[unit].squads.map(u => u.ID).reduce((acc, cur) => Math.max(acc, cur), 0)
				) + 1;
			}
		}
	}

	/** performs operations on a unit
	 * helper function, not callable externally
	 * @param {FC.SecExp.PlayerHumanUnitTypeMod} type
	 */
	function unitFree(type) {
		/**
		 * @returns {number}
		 */
		function print() {
			switch (type) {
				case "slaves": return V.menials;
				case "militia":
				case "mercs":
					return V.SecExp.units[type].free;
			}
		}

		/**
		 * @returns {boolean}
		 */
		function canUpgrade() {
			switch (type) {
				case "bots": return V.cash >= secBotsCost;
				case "slaves": return V.menials > 0;
				case "militia":
				case "mercs":
					return V.SecExp.units[type].free > 0;
			}
		}

		/**
		 * @param {number} value
		 * @returns {void}
		 */
		function add(value) {
			switch (type) {
				case "slaves": V.menials += value; break;
				case "militia":
				case "mercs":
					V.SecExp.units[type].free += value;
			}
		}

		/**
		 * @param {number} value
		 * @returns {void}
		 */
		function remove(value) {
			switch (type) {
				case "slaves": V.menials -= value; break;
				case "militia":
				case "mercs":
					V.SecExp.units[type].free -= value;
			}
		}

		/**
		 * @param {number} value
		 * @returns {void}
		 */
		function set(value) {
			switch (type) {
				case "slaves": V.menials = value; break;
				case "militia":
				case "mercs":
					V.SecExp.units[type].free = value;
			}
		}

		return {
			print,
			canUpgrade,
			add,
			remove,
			set,
		};
	}

	/** Replenishes a unit if needed
	 * helper function, not callable externally
	 * @param {FC.SecExp.PlayerHumanUnitData} squad
	 */
	function replenish(squad) {
		const oldTroops = squad.troops;
		const type = checkID(squad.ID);

		if (type !== "bots") {
			if (unitFree(type).print() >= squad.maxTroops - squad.troops) {
				unitFree(type).remove(squad.maxTroops - squad.troops);
				squad.troops = squad.maxTroops;
			} else {
				squad.troops += unitFree(type).print();
				unitFree(type).set(0);
			}
			const expLoss = (squad.troops - oldTroops) / squad.troops;
			squad.training -= squad.training * expLoss;
		} else {
			cashX(-((squad.maxTroops - squad.troops) * secBotsCost), "securityExpansion");
			squad.troops = squad.maxTroops;
		}
	}
})();

/** Player unit factory - get a unit's data based on its type and the individual unit passed
 * @param {FC.SecExp.PlayerHumanUnitType} type - "bots", "militia", "slaves", "mercs", or "SF"
 * @param {FC.SecExp.PlayerHumanUnitData} [unit]
 * @returns {App.Mods.SecExp.Unit}
 */
App.Mods.SecExp.getUnit = function(type, unit=null) {
	switch (type) {
		case "SF":
			return new App.Mods.SecExp.SFUnit();
		case "bots":
			return new App.Mods.SecExp.DroneUnit(unit, App.Mods.SecExp.BaseDroneUnit);
		case "militia":
			return new App.Mods.SecExp.HumanUnit(unit, App.Mods.SecExp.BaseMilitiaUnit);
		case "slaves":
			return new App.Mods.SecExp.HumanUnit(unit, App.Mods.SecExp.BaseSlaveUnit);
		case "mercs":
			return new App.Mods.SecExp.HumanUnit(unit, App.Mods.SecExp.BaseMercUnit);
		default:
			throw Error(`Unknown unit type: ${type}`);
	}
};

/** Enemy unit factory - get a unit based on its type and basic data
 * @param {FC.SecExp.EnemyUnitType} type - "raiders", "free city", "old world", or "freedom fighters"
 * @param {number} troops
 * @param {number} equipment
 * @returns {App.Mods.SecExp.Unit}
 */
App.Mods.SecExp.getEnemyUnit = function(type, troops, equipment) {
	const baseUnitMap = new Map([
		["raiders", App.Mods.SecExp.BaseRaiderUnit],
		["free city", App.Mods.SecExp.BaseFreeCityUnit],
		["old world", App.Mods.SecExp.BaseOldWorldUnit],
		["freedom fighters", App.Mods.SecExp.BaseFreedomFighterUnit],
	]);
	const unitData = {
		troops: troops,
		maxTroops: troops,
		equip: equipment
	};
	return new App.Mods.SecExp.EnemyUnit(unitData, baseUnitMap.get(type));
};

/** Irregular unit factory - get an irregular unit (without organization/upgrade bonuses) based on its type and basic data
 * @param {FC.SecExp.PlayerHumanUnitTypeModHuman} type - "militia", "slaves", or "mercs"
 * @param {number} troops
 * @param {number} equipment
 * @returns {App.Mods.SecExp.Unit}
 */
App.Mods.SecExp.getIrregularUnit = function(type, troops, equipment) {
	const baseUnitMap = new Map([
		["militia", App.Mods.SecExp.BaseMilitiaUnit],
		["slaves", App.Mods.SecExp.BaseSlaveUnit],
		["mercs", App.Mods.SecExp.BaseMercUnit],
	]);
	const unitData = {
		troops: troops,
		maxTroops: troops,
		equip: equipment
	};

	return new App.Mods.SecExp.IrregularUnit(unitData, baseUnitMap.get(type));
};

/** Equipment multiplier (static balance variable) */
App.Mods.SecExp.equipMod = 0.15;

/** Turn a loyalty value into a corresponding bonus factor
 * @param {number} value range: [0-100]
 * @returns {number} bonus - range: [0.0-0.3], cap at input 67
 */
App.Mods.SecExp.loyaltyValueToBonusFactor = function(value) {
	return Math.min(value * 3 / 670, 0.3);
};

/** Turn a training value into a corresponding bonus factor
 * @param {number} value range: [0-100]
 * @returns {number} bonus - range: [0.0-0.5], cap at input 67
 */
App.Mods.SecExp.trainingValueToBonusFactor = function(value) {
	return Math.min(value * 3 / 400, 0.5);
};

/** Gets the bonus values provided for completing weapon manufacturing upgrades.
 * @param {string} type - unit type to check.
 * @returns {object} bonus values after checking for completed upgrades.
 */
App.Mods.SecExp.getAppliedUpgrades = function(type) {
	let hp = 0; let morale = 0; let def = 0; let attack = 0;
	if (V.SecExp.buildings.weapManu) {
		if (type === 'drone') {
			if (V.SecExp.buildings.weapManu.upgrades.completed.includes(-3)) {
				hp++;
			}
			if (V.SecExp.buildings.weapManu.upgrades.completed.includes(-2)) {
				def++;
			}
			if (V.SecExp.buildings.weapManu.upgrades.completed.includes(-1)) {
				attack++;
			}
		} else if (type === 'human') {
			if (V.SecExp.buildings.weapManu.upgrades.completed.includes(0)) {
				attack++;
			}
			if (V.SecExp.buildings.weapManu.upgrades.completed.includes(1)) {
				def++;
			}
			if (V.SecExp.buildings.weapManu.upgrades.completed.includes(2)) {
				hp++;
			}
			if (V.SecExp.buildings.weapManu.upgrades.completed.includes(3)) {
				morale += 10;
			}
			if (V.SecExp.buildings.weapManu.upgrades.completed.includes(4)) {
				attack++; def++;
			}
			if (V.SecExp.buildings.weapManu.upgrades.completed.includes(5)) {
				hp++; morale += 10;
			}
			if (V.SecExp.buildings.weapManu.upgrades.completed.includes(6)) {
				attack++; def++;
			}
			if (V.SecExp.buildings.weapManu.upgrades.completed.includes(7)) {
				hp++; morale += 10;
			}
			if (V.SecExp.buildings.weapManu.upgrades.completed.includes(8)) {
				attack++; def++; hp++; morale += 10;
			}
			if (V.arcologies[0].FSNeoImperialistLaw1) {
				attack++;
			}
			if (V.arcologies[0].FSAntebellumRevivalistLaw2) {
				def++;
			}
		}
	}
	return {
		attack: attack, defense: def, hp: hp, morale: morale
	};
};

App.Mods.SecExp.getEdictUpgradeVal = (function() {
	const data = {
		militia: new Map([
			["legionTradition", {defense: 2, morale: 5, hp: 1}],
			["imperialTradition", {defense: 1, morale: 5, hp: 1}],
			["pharaonTradition", {attack: 2, defense: 2, morale: 10}],
			["sunTzu", {attack: 1, defense: 1, morale: 5}],
			["eliteOfficers", {morale: 5}],
			["lowerRequirements", {defense: -1, hp: -1}],
			["southronTradition", {attack: -1, defense: 4, morale : 5}],
		]),
		slave: new Map([
			["mamluks", {attack: 2, morale: 10, hp: 1}],
			["sunTzu", {attack: 1, defense: 1, morale: 5}],
			["eliteOfficers", {morale: -5}],
			["martialSchool", {morale: 5}]
		]),
		merc: new Map([
			["eagleWarriors", {attack: 4, defense: -2, morale: 10}],
			["ronin", {attack: 2, defense: 2, morale: 10}],
			["sunTzu", {attack: 1, defense: 1, morale: 5}],
			["imperialTradition", {attack: 1, defense: 2, morale: 5}],
		])
	};

	/** Get the total edict upgrade effect on a particular stat for a particular unit
	 * @param {string} unitType
	 * @param {string} stat
	 * @returns {number}
	 */
	function getNetEffect(unitType, stat) {
		let effect = 0;
		for (const [key, val] of data[unitType]) {
			if (V.SecExp.edicts.defense[key] > 0 && val[stat]) {
				effect += val[stat];
			}
		}
		return effect;
	}

	return getNetEffect;
})();

/**
 * @interface
 * @typedef {object} BaseUnit
 * @property {number} attack
 * @property {number} defense
 * @property {number} morale
 * @property {number} hp
 */

/** @implements {BaseUnit} */
App.Mods.SecExp.BaseMilitiaUnit = class BaseMilitiaUnit {
	static get attack() {
		return 7 + App.Mods.SecExp.getAppliedUpgrades('human').attack + App.Mods.SecExp.getEdictUpgradeVal("militia", "attack");
	}

	static get defense() {
		return 5 + App.Mods.SecExp.getAppliedUpgrades('human').defense + App.Mods.SecExp.getEdictUpgradeVal("militia", "defense");
	}

	static get morale() {
		return 140 + App.Mods.SecExp.getAppliedUpgrades('human').morale + App.Mods.SecExp.getEdictUpgradeVal("militia", "morale");
	}

	static get hp() {
		return 3 + App.Mods.SecExp.getAppliedUpgrades('human').hp + App.Mods.SecExp.getEdictUpgradeVal("militia", "hp");
	}
};


/** @implements {BaseUnit} */
App.Mods.SecExp.BaseSlaveUnit = class BaseSlaveUnit {
	static get attack() {
		return 8 + App.Mods.SecExp.getAppliedUpgrades('human').attack + App.Mods.SecExp.getEdictUpgradeVal("slave", "attack");
	}

	static get defense() {
		return 3 + App.Mods.SecExp.getAppliedUpgrades('human').defense + App.Mods.SecExp.getEdictUpgradeVal("slave", "defense");
	}

	static get morale() {
		return 110 + App.Mods.SecExp.getAppliedUpgrades('human').morale + App.Mods.SecExp.getEdictUpgradeVal("slave", "morale");
	}

	static get hp() {
		return 3 + App.Mods.SecExp.getAppliedUpgrades('human').hp + App.Mods.SecExp.getEdictUpgradeVal("slave", "hp");
	}
};

/** @implements {BaseUnit} */
App.Mods.SecExp.BaseMercUnit = class BaseMercUnit {
	static get attack() {
		return 8 + App.Mods.SecExp.getAppliedUpgrades('human').attack + App.Mods.SecExp.getEdictUpgradeVal("merc", "attack");
	}

	static get defense() {
		return 4 + App.Mods.SecExp.getAppliedUpgrades('human').defense + App.Mods.SecExp.getEdictUpgradeVal("merc", "defense");
	}

	static get morale() {
		return 125 + App.Mods.SecExp.getAppliedUpgrades('human').morale + App.Mods.SecExp.getEdictUpgradeVal("merc", "morale");
	}

	static get hp() {
		return 4 + App.Mods.SecExp.getAppliedUpgrades('human').hp + App.Mods.SecExp.getEdictUpgradeVal("merc", "hp");
	}
};

/** @implements {BaseUnit} */
App.Mods.SecExp.BaseDroneUnit = class BaseDroneUnit {
	static get attack() {
		return 7 + App.Mods.SecExp.getAppliedUpgrades('drone').attack;
	}

	static get defense() {
		return 3 + App.Mods.SecExp.getAppliedUpgrades('drone').defense;
	}

	static get morale() {
		return 200;
	}

	static get hp() {
		return 3 + App.Mods.SecExp.getAppliedUpgrades('drone').hp;
	}
};

/** @implements {BaseUnit} */
App.Mods.SecExp.BaseRaiderUnit = class BaseRaiderUnit {
	static get attack() {
		return 7 + (V.SecExp.buildings.weapManu ? V.SecExp.buildings.weapManu.sellTo.raiders : 0);
	}

	static get defense() {
		return 2 + (V.SecExp.buildings.weapManu ? V.SecExp.buildings.weapManu.sellTo.raiders : 0);
	}

	static get morale() {
		return 100;
	}

	static get hp() {
		return 2;
	}
};

/** @implements {BaseUnit} */
App.Mods.SecExp.BaseFreeCityUnit = class BaseFreeCityUnit {
	static get attack() {
		return 6 + (V.SecExp.buildings.weapManu ? V.SecExp.buildings.weapManu.sellTo.FC : 0);
	}

	static get defense() {
		return 4 + (V.SecExp.buildings.weapManu ? V.SecExp.buildings.weapManu.sellTo.FC : 0);
	}

	static get morale() {
		return 130;
	}

	static get hp() {
		return 3;
	}
};

/** @implements {BaseUnit} */
App.Mods.SecExp.BaseOldWorldUnit = class BaseOldWorldUnit {
	static get attack() {
		return 8 + (V.SecExp.buildings.weapManu ? V.SecExp.buildings.weapManu.sellTo.oldWorld : 0);
	}

	static get defense() {
		return 4 + (V.SecExp.buildings.weapManu ? V.SecExp.buildings.weapManu.sellTo.oldWorld : 0);
	}

	static get morale() {
		return 110;
	}

	static get hp() {
		return 2;
	}
};

/** @implements {BaseUnit} */
App.Mods.SecExp.BaseFreedomFighterUnit = class BaseFreedomFighterUnit {
	static get attack() {
		return 9 + (V.SecExp.buildings.weapManu ? V.SecExp.buildings.weapManu.sellTo.oldWorld : 0);
	}

	static get defense() {
		return 2 + (V.SecExp.buildings.weapManu ? V.SecExp.buildings.weapManu.sellTo.oldWorld : 0);
	}

	static get morale() {
		return 160;
	}

	static get hp() {
		return 2;
	}
};

/** @implements {BaseUnit} */
App.Mods.SecExp.BaseSpecialForcesUnit = class BaseSpecialForcesUnit {
	static get attack() {
		return 8 + App.Mods.SecExp.getAppliedUpgrades('human').attack;
	}

	static get defense() {
		return 4 + App.Mods.SecExp.getAppliedUpgrades('human').defense;
	}

	static get morale() {
		return 140 + App.Mods.SecExp.getAppliedUpgrades('human').morale;
	}

	static get hp() {
		return 4 + App.Mods.SecExp.getAppliedUpgrades('human').hp;
	}
};

/** Unit base class */
App.Mods.SecExp.Unit = class SecExpUnit {
	/** @param {FC.SecExp.UnitData} data
	 * @param {BaseUnit} baseUnit
	 */
	constructor(data, baseUnit) {
		this._data = data;
		this._baseUnit = baseUnit;
	}

	/** @abstract
	 * @returns {number} */
	get attack() {
		throw Error("derive me");
	}

	/** @abstract
	 * @returns {number} */
	get defense() {
		throw Error("derive me");
	}

	/** @abstract
	 * @returns {number} */
	get morale() {
		return this._baseUnit.morale; // no morale modifiers
	}

	/** @abstract
	 * @returns {number} */
	get hp() {
		throw Error("derive me");
	}

	/** @abstract
	 * @returns {DocumentFragment} */
	printStats() {
		throw Error("derive me");
	}
};

App.Mods.SecExp.DroneUnit = class SecExpDroneUnit extends App.Mods.SecExp.Unit {
	/** @param {FC.SecExp.PlayerUnitData} data
	 * @param {BaseUnit} baseUnit
	 */
	constructor(data, baseUnit) {
		super(data, baseUnit);
		this._data = data; // duplicate assignment, just for TypeScript
	}

	get attack() {
		const equipmentFactor = this._data.equip * App.Mods.SecExp.equipMod;
		return this._baseUnit.attack * (1 + equipmentFactor);
	}

	get defense() {
		const equipmentFactor = this._data.equip * App.Mods.SecExp.equipMod;
		return this._baseUnit.defense * (1 + equipmentFactor);
	}

	get hp() {
		return this._baseUnit.hp * this._data.troops;
	}

	printStats() {
		const r = new DocumentFragment();
		App.UI.DOM.appendNewElement("div", r, `Security drones base attack: ${this._baseUnit.attack} (After modifiers: ${Math.trunc(this.attack)})`);
		App.UI.DOM.appendNewElement("div", r, `Security drones base defense: ${this._baseUnit.defense} (After modifiers: ${Math.trunc(this.defense)})`);
		App.UI.DOM.appendNewElement("div", r, `Equipment bonus: +${this._data.equip * 15}%`);
		App.UI.DOM.appendNewElement("div", r, `Security drones base hp: ${this._baseUnit.hp} (Total after modifiers for ${this._data.troops} drones: ${this.hp})`);
		App.UI.DOM.appendNewElement("div", r, `Security drones base morale: ${this._baseUnit.morale}`);
		return r;
	}
};

App.Mods.SecExp.HumanUnit = class SecExpHumanUnit extends App.Mods.SecExp.Unit {
	/** @param {FC.SecExp.PlayerHumanUnitData} data
	 * @param {BaseUnit} baseUnit
	 */
	constructor(data, baseUnit) {
		super(data, baseUnit);
		this._data = data; // duplicate assignment, just for TypeScript
	}

	get attack() {
		const equipmentFactor = this._data.equip * App.Mods.SecExp.equipMod;
		const experienceFactor = App.Mods.SecExp.trainingValueToBonusFactor(this._data.training);
		const loyaltyFactor = App.Mods.SecExp.loyaltyValueToBonusFactor(this._data.loyalty);
		const SFFactor = 0.20 * this._data.SF;
		return this._baseUnit.attack * (1 + equipmentFactor + experienceFactor + loyaltyFactor + SFFactor) + this._data.cyber;
	}

	get defense() {
		const equipmentFactor = this._data.equip * App.Mods.SecExp.equipMod;
		const experienceFactor = App.Mods.SecExp.trainingValueToBonusFactor(this._data.training);
		const loyaltyFactor = App.Mods.SecExp.loyaltyValueToBonusFactor(this._data.loyalty);
		const SFFactor = 0.20 * this._data.SF;
		return this._baseUnit.defense * (1 + equipmentFactor + experienceFactor + loyaltyFactor + SFFactor) + this._data.cyber;
	}

	get hp() {
		const medicFactor = 0.25 * this._data.medics;
		const singleTroopHp = this._baseUnit.hp * (1 + medicFactor) + this._data.cyber;
		return singleTroopHp * this._data.troops;
	}

	printStats() {
		const r = new DocumentFragment();
		this._descType = App.Mods.SecExp.unit.checkID(this._data.ID);
		App.UI.DOM.appendNewElement("div", r, `${this._descType} base attack: ${this._baseUnit.attack} (After modifiers: ${Math.trunc(this.attack)})`);
		App.UI.DOM.appendNewElement("div", r, `${this._descType} base defense: ${this._baseUnit.defense} (After modifiers: ${Math.trunc(this.defense)})`);
		if (this._data.equip > 0) {
			App.UI.DOM.appendNewElement("div", r, `Equipment bonus: +${this._data.equip * 15}%`);
		}
		if (this._data.cyber > 0) {
			App.UI.DOM.appendNewElement("div", r, `Cyber enhancements bonus: +1`);
		}
		if (this._data.training > 0) {
			App.UI.DOM.appendNewElement("div", r, `Experience bonus: +${Math.trunc(App.Mods.SecExp.trainingValueToBonusFactor(this._data.training)*100)}%`);
		}
		if (this._data.loyalty > 0) {
			App.UI.DOM.appendNewElement("div", r, `Loyalty bonus: +${Math.trunc(App.Mods.SecExp.loyaltyValueToBonusFactor(this._data.loyalty)*100)}%`);
		}
		if (this._data.SF > 0) {
			App.UI.DOM.appendNewElement("div", r, `Special Force advisors bonus: +20%`);
		}
		App.UI.DOM.appendNewElement("div", r, `${this._descType} base morale: ${this._baseUnit.morale} (After modifiers: ${this.morale})`);
		if (jsDef(V.SecExp.buildings.barracks) && V.SecExp.buildings.barracks.luxury > 0) {
			App.UI.DOM.appendNewElement("div", r, `Barracks bonus: +${V.SecExp.buildings.barracks.luxury * 5}%`);
		}
		App.UI.DOM.appendNewElement("div", r, `${this._descType} base hp: ${this._baseUnit.hp} (Total after modifiers for ${this._data.troops} troops: ${this.hp})`);
		if (this._data.medics > 0) {
			App.UI.DOM.appendNewElement("div", r, `Medics detachment bonus: +25%`);
		}
		return r;
	}
};

App.Mods.SecExp.troopsFromSF = function() {
	if (V.SecExp.war.type.includes("Attack")) {
		const transportMax = Math.trunc(125 * (V.SF.Squad.GunS + (V.terrain !== "oceanic" ? ((V.SF.Squad.AV + V.SF.Squad.TV)/2) : 0)));
		return Math.min(transportMax, V.SF.ArmySize);
	} else {
		return V.SF.ArmySize; // rebellion: transport capabilities are irrelevant
	}
};

App.Mods.SecExp.SFUnit = class SFUnit extends App.Mods.SecExp.Unit {
	constructor() {
		super(null, App.Mods.SecExp.BaseSpecialForcesUnit);
		this._distancePenalty = (V.SecExp.war.type.includes("Attack")) ? 0.10 : 0.0;
	}

	get attack() {
		// ignores base attack? weird.
		const attackUpgrades = V.SF.Squad.Armoury + V.SF.Squad.Drugs + V.SF.Squad.AA + (V.terrain !== "oceanic" ? V.SF.Squad.AV : 0);
		return (0.75 - this._distancePenalty) * attackUpgrades;
	}

	get defense() {
		// ignores base defense? weird.
		const defenseUpgrades = V.SF.Squad.Armoury + V.SF.Squad.Drugs + (V.SF.Squad.AA + V.SF.Squad.TA) / 2 + (V.terrain !== "oceanic" ? (V.SF.Squad.AV + V.SF.Squad.TV) / 2 : 0);
		return (0.5 - this._distancePenalty) * defenseUpgrades;
	}

	get hp() {
		return this._baseUnit.hp * App.Mods.SecExp.troopsFromSF();
	}
};

App.Mods.SecExp.EnemyUnit = class SecExpEnemyUnit extends App.Mods.SecExp.Unit {
	/** @param {FC.SecExp.UnitData} data
	 * @param {BaseUnit} baseUnit
	 */
	constructor(data, baseUnit) {
		super(data, baseUnit);
	}

	get attack() {
		const equipmentFactor = this._data.equip * App.Mods.SecExp.equipMod;
		return this._baseUnit.attack * (1 + equipmentFactor);
	}

	get defense() {
		const equipmentFactor = this._data.equip * App.Mods.SecExp.equipMod;
		return this._baseUnit.defense * (1 + equipmentFactor);
	}

	get hp() {
		return this._baseUnit.hp * this._data.troops;
	}
};

App.Mods.SecExp.IrregularUnit = class SecExpEnemyUnit extends App.Mods.SecExp.Unit {
	/** @param {FC.SecExp.UnitData} data
	 * @param {BaseUnit} baseUnit
	 */
	constructor(data, baseUnit) {
		super(data, baseUnit);
	}

	get attack() {
		const equipmentFactor = this._data.equip * App.Mods.SecExp.equipMod;
		return (this._baseUnit.attack - App.Mods.SecExp.getAppliedUpgrades('human').attack) * (1 + equipmentFactor);
	}

	get defense() {
		const equipmentFactor = this._data.equip * App.Mods.SecExp.equipMod;
		return (this._baseUnit.defense - App.Mods.SecExp.getAppliedUpgrades('human').defense) * (1 + equipmentFactor);
	}

	get hp() {
		return (this._baseUnit.hp - App.Mods.SecExp.getAppliedUpgrades('human').hp) * this._data.troops;
	}
};

App.Mods.SecExp.mercenaryAvgLoyalty = function() {
	return _.mean(V.SecExp.units.mercs.squads.filter((u) => u.active === 1).map((u) => u.loyalty));
};

App.Mods.SecExp.Manpower = {
	get totalMilitia() {
		return this.employedMilitia + this.freeMilitia;
	},

	get employedMilitia() {
		return V.SecExp.units.militia.squads.reduce((acc, cur) => acc + cur.troops, 0);
	},

	get freeMilitia() {
		return V.SecExp.units.militia.free;
	},

	get employedSlave() {
		return V.SecExp.units.slaves.squads.reduce((acc, cur) => acc + cur.troops, 0);
	},

	get totalMerc() {
		return this.employedMerc + this.freeMerc;
	},

	get employedMerc() {
		return V.SecExp.units.mercs.squads.reduce((acc, cur) => acc + cur.troops, 0);
	},

	get freeMerc() {
		return V.SecExp.units.mercs.free;
	},
};
