App.Mods.SecExp.weapManu = (function() {
	return {
		Init,
		baseTime,
		current,
		completed,
		GUI,
		// purchase - helper function
	};

	function Init() {
		V.SecExp.buildings.weapManu = {
			space: 500,
			menials: 0,
			productivity: 1,
			lab: 1,
			sellTo: {
				citizen: 1,
				raiders: 1,
				oldWorld: 1,
				FC: 1,
			},
			upgrades: {completed: []}
		};
	}

	/** Weeks to completion without any modification.
	 * @returns {number}
	 */
	function baseTime() { return 10; }

	/** Checks the supplied ID value and assigns values.
	 * @param {number} [upgradeID] passed ID
	 * @returns {object}
	 */
	function current(upgradeID) {
		switch (upgradeID) {
			case -3:
				return {
					dec: "advanced synthetic alloys", type: "hp",
					purpose: "survivability", cost: 10000*V.HackingSkillMultiplier,
					unit: "the security drones"
				};
			case -2:
				return {
					dec: "adaptive armored frames", type: "defense",
					purpose: "defensive capabilities", cost: 10000,
					unit: "the security drones"
				};
			case -1:
				return {
					dec: "dynamic battle aware AI", type: "attack",
					purpose: "attack power", cost: 30000,
					unit: "the security drones"
				};
			case 0:
				return {
					dec: "magnetic based ballistic weaponry", type: "attack",
					purpose: "attack power", cost: 30000,
					unit: "our human troops"
				};
			case 1:
				return {
					dec: "ceramo-metallic alloys", type: "defense",
					purpose: "defensive capabilities", cost: 30000,
					unit: "our human troops"
				};
			case 2:
				return {
					dec: "rapid action stimulants", type: "hp",
					purpose: "survivability", cost: 60000,
					unit: "our human troops"
				};
			case 3:
				return {
					dec: "fast response neural stimulant", type: "morale",
					purpose: "standing power", cost: 60000,
					unit: "our human troops"
				};
			case 4:
				return {
					dec: "universal cyber enhancements", type: "attack and defense",
					purpose: "offensive and defensive effectiveness", cost: 120000*V.HackingSkillMultiplier,
					unit: "our human troops"
				};
			case 5:
				return {
					dec: "remote neural links", type: "hp and morale",
					purpose: "morale and survivability", cost: 120000*V.HackingSkillMultiplier,
					unit: "our human troops"
				};
			case 6:
				return {
					dec: `combined training regimens with ${capFirstChar(V.SF.Lower)}`, type: "attack and defense",
					purpose: "offensive and defensive effectiveness", cost: 0,
					unit: "our human troops"
				};
			case 7:
				return {
					dec: `a variant of the stimulant cocktail that ${capFirstChar(V.SF.Lower)} created`, type: "hp and morale",
					purpose: "morale and survivability", cost: 300000,
					unit: "our human troops"
				};
			case 8:
				return {
					dec: `a mesh network based off the custom network of ${capFirstChar(V.SF.Lower)}`, type: "all",
					purpose: "offensive,defensive effectiveness in addition to morale and survivability", cost: 1000000*V.HackingSkillMultiplier,
					unit: "our human troops"
				};
		}
	}

	/** Checks if the class of unit is fully upgraded.
	 * @returns {boolean}
	 */
	 function completed(check = "all") {
		let human = [0, 1, 2, 3, 4, 5];
		if (V.SF.Toggle && V.SF.Active >= 1) {
			human.push(6, 7, 8);
		}

		if (check === "human") {
			return V.SecExp.buildings.weapManu.upgrades.completed.includesAll(human);
		} else if (check === "bots") {
			return V.SecExp.buildings.weapManu.upgrades.completed.includesAll(-1, -2, -3);
		}
		return V.SecExp.buildings.weapManu.upgrades.completed.includesAll(human.concat(-1, -2, -3));
	}

	function GUI() {
		const frag = new DocumentFragment();

		V.nextButton = "Back";
		V.nextLink = "Main";
		const refreshDiv = App.UI.DOM.makeElement("div", content());

		function content() {
			const div = document.createElement("div");
			div.append(
				intro(),
				menials(),
				rules(),
				upgrades(),
				research(),
			);
			return div;
		}
		frag.append(refreshDiv);
		return frag;

		function intro() {
			const div = document.createElement("div");
			const text = [];
			const units = [];

			text.push(`This sector of the arcology has been dedicated to weapons manufacturing. These factories supply`);
			if (V.SecExp.units.militia.squads) {
				units.push(`your militia`);
			}
			if (V.SecExp.units.slaves.squads) {
				units.push(`your slave soldiers`);
			}
			if (V.mercenaries) {
				units.push(`your mercenaries`);
			}

			text.push(`${toSentence([...units, `many small old world nations`])} as the advanced technology that Free Cities have available is hard to come by otherwise.`);

			App.Events.addNode(div, text, "div", ['scene-intro']);
			App.UI.DOM.appendNewElement("div", div, App.UI.DOM.passageLink(`Decommission the Weapons Manufacturing`, "Main", () => {
				delete V.SecExp.buildings.weapManu;

				App.Arcology.cellUpgrade(V.building, App.Arcology.Cell.Manufacturing, "Weapon Manufacturing", "Manufacturing");
			}), ['indent']);

			return div;
		}

		function menials() {
			const div = App.UI.DOM.makeElement("div", null, ['margin-bottom']);
			App.UI.DOM.appendNewElement("h2", div, `Menials`);
			const unitCost = Math.trunc(1000 * V.upgradeMultiplierArcology * (V.SecExp.buildings.weapManu.space/100));
			let text = [];
			// let links = [];

			// Transferring
			if (V.SecExp.buildings.weapManu.menials > 0) {
				text.push(`Assigned here ${V.SecExp.buildings.weapManu.menials === 1 ? `is` : `are`} ${numberWithPluralOne(V.SecExp.buildings.weapManu.menials, 'menial slave')}, working to produce as much equipment as they can.`);
			}
			text.push(`You ${V.menials ? `own ${num(V.menials)}` : `don't own any`} free menial slaves. This manufacturing complex is currently housing ${num(V.SecExp.buildings.weapManu.menials)} out of ${num(V.SecExp.buildings.weapManu.space)} possible menial slaves.`);
			div.append(text.join(' '));
			text = [];

			App.UI.DOM.appendNewElement("div", div, App.UI.market({menialWorkersOnly: true}), ['indent']);
			const optionsList = [1, 5, 10, 100, 500];
			let linkArray;
			for (const flow of ["in", "out"]) {
				linkArray = [];
				for (const value of optionsList.filter(s => (flow === "in" ? ((V.SecExp.buildings.weapManu.space - V.SecExp.buildings.weapManu.menials) >= s && V.menials >= s) : V.SecExp.buildings.weapManu.menials >= s) )) {
					linkArray.push(
						App.UI.DOM.link(
							`${value}`,
							() => {
								V.menials += (flow === "in" ? forceNeg(value) : value);
								V.SecExp.buildings.weapManu.menials += (flow === "in" ? value : forceNeg(value));
								App.UI.reload();
							}
						)
					);
				}
				if (linkArray.length > 0) {
					if (flow !== "in" || flow === "in" && V.SecExp.buildings.weapManu.menials < V.SecExp.buildings.weapManu.space) {
						const line = new DocumentFragment();
						line.append(`Transfer ${flow}: `, App.UI.DOM.generateLinksStrip(linkArray));
						App.UI.DOM.appendNewElement("div", div, line);
					}
				}
			}
			// FIXME: this is unused
			// if (V.SecExp.buildings.weapManu.menials) {
			// 	links.push(App.UI.DOM.link("Transfer out all menial slaves", () => {
			// 		V.menials += V.SecExp.buildings.weapManu.menials;
			// 		V.SecExp.buildings.weapManu.menials = 0;
			// 		App.UI.reload();
			// 	}));
			// }

			// Housing
			App.UI.DOM.appendNewElement("div", div, `There is enough room in the complex to build housing, enough to give an additional 100 workers a place to sleep and relax.`);
			App.UI.DOM.appendNewElement("div", div, App.UI.DOM.link(`Build a new housing unit`, () => {
				cashX(forceNeg(unitCost), "capEx");
				V.SecExp.buildings.weapManu.space += 100;
				App.UI.reload();
			},
			[], '', `Costs ${cashFormat(unitCost)} and increases housing by 100.`), ['indent']);

			return div;
		}

		function upgrades() {
			const div = App.UI.DOM.makeElement("div", null, ['margin-bottom']);
			/** @type {FC.Upgrade[]} */
			const upgrades = [
				new App.Upgrade(
					"productivity",
					[
						{
							value: 1,
							upgraded: 2,
							text: `Production is completely manned by human workers. The complex has close to zero automation.`,
							link: `Invest in automating the complex`,
							cost: 10000 * V.SecExp.buildings.weapManu.productivity,
							handler: () => V.PC.skill.engineering += 0.1,
							notes: [`will increase income in addition to speeding up upgrade production`],
						},
						{
							value: 2,
							upgraded: 3,
							text: `Production is mostly handled by human workers. A few of the most tiresome tasks are handled by robots.`,
							link: `Invest in automating the complex`,
							cost: 10000 * V.SecExp.buildings.weapManu.productivity,
							handler: () => V.PC.skill.engineering += 0.1,
							notes: [`will increase income in addition to speeding up upgrade production`],
						},
						{
							value: 3,
							upgraded: 4,
							text: `A good part of production is handled by robots with humans handling the most complex tasks.`,
							link: `Invest in automating the complex`,
							cost: 10000 * V.SecExp.buildings.weapManu.productivity,
							handler: () => V.PC.skill.engineering += 0.1,
							notes: [`will increase income in addition to speeding up upgrade production`],
						},
						{
							value: 4,
							upgraded: 5,
							text: `Almost all production is handled by robots, with humans acting as support for the machines.`,
							link: `Invest in automating the complex`,
							cost: 10000 * V.SecExp.buildings.weapManu.productivity,
							handler: () => V.PC.skill.engineering += 0.1,
							notes: [`will increase income in addition to speeding up upgrade production`],
						},
						{
							value: 5,
							text: `All production here is handled by robots. The few humans working in the complex occupy themselves exclusively with management and quality assurance.`,
						},
					],
					V.SecExp.buildings.weapManu,
				),
				new App.Upgrade(
					"lab",
					[
						{
							value: 1,
							upgraded: 2,
							text: `There's a very spartan lab attached to the complex that occupies itself mainly with weapons testing and small adjustments to the manufacturing process.`,
							link: `Invest in research and development`,
							cost: 10000 * V.SecExp.buildings.weapManu.lab,
							handler: () => V.PC.skill.engineering += 0.1,
							notes: [`will increase income in addition to unlocking more advanced upgrades`],
						},
						{
							value: 2,
							upgraded: 3,
							text: `There's a lab attached to the complex. It mainly test weapons effectiveness and manufacturing efficiency, but has enough equipment and personnel to develop new technology.`,
							link: `Invest in research and development`,
							cost: 10000 * V.SecExp.buildings.weapManu.lab,
							handler: () => V.PC.skill.engineering += 0.1,
							notes: [`will increase income in addition to unlocking more advanced upgrades`],
						},
						{
							value: 3,
							text: `There's a large lab attached to the complex. The complement of equipment and personnel makes it a great beacon of military science in an otherwise ignorant world.`,
						},
					],
					V.SecExp.buildings.weapManu,
				),
			];

			App.UI.DOM.appendNewElement("h2", div, `Upgrades`);
			upgrades.forEach(upgrade => div.append(upgrade.render()));
			return div;
		}

		function rules() {
			const div = App.UI.DOM.makeElement("div", null, ['margin-bottom']);
			App.UI.DOM.appendNewElement("h2", div, `Rules`);
			[
				{
					property: "citizen",
					options: [
						{
							get text() { return `We are not selling our weaponry to our citizens.`; },
							link: `Forbid`,
							value: 0,
						},
						{
							get text() { return `We are currently selling our weapons to the domestic market of the arcology.`; },
							link: `Allow`,
							value: 1,
						}
					],
					object: V.SecExp.buildings.weapManu.sellTo,
				},
				{
					property: "raiders",
					options: [
						{
							get text() { return `We are not selling our weaponry to raiders.`; },
							link: `Forbid`,
							value: 0,
						},
						{
							get text() { return `We are currently selling our weapons to various groups of outlaws, also known as raiders.`; },
							link: `Allow`,
							value: 1,
						}
					],
					object: V.SecExp.buildings.weapManu.sellTo,
				},
				{
					property: "oldWorld",
					options: [
						{
							get text() { return `We are not selling our weaponry to old world nations.`; },
							link: `Forbid`,
							value: 0,
						},
						{
							get text() { return `We are currently selling our weapons to many old world nations.`; },
							link: `Allow`,
							value: 1,
						}
					],
					object: V.SecExp.buildings.weapManu.sellTo,
				},
				{
					property: "FC",
					options: [
						{
							get text() { return `We are not selling our weaponry to other Free Cities.`; },
							link: `Forbid`,
							value: 0,
						},
						{
							get text() { return `We are currently selling our weapons to other Free Cities.`; },
							link: `Allow`,
							value: 1,
						}
					],
					object: V.SecExp.buildings.weapManu.sellTo,
				},
			].forEach(rule => {
				const options = new App.UI.OptionsGroup();
				const option = options.addOption(null, rule.property, V.SecExp.buildings.weapManu.sellTo);

				rule.options.forEach(o => {
					option.addValue(o.link, o.value);
					if (o.handler) {
						option.addCallback(o.handler);
					}
					if (o.note) {
						option.addComment(o.note);
					}

					if (_.isEqual(V.SecExp.buildings.weapManu.sellTo[rule.property], o.value)) {
						App.UI.DOM.appendNewElement("div", div, o.text);
					}
				});
				App.UI.DOM.appendNewElement("div", div, options.render(), ['indent', 'margin-bottom']);
			});
			return div;
		}

		function research() {
			const div = App.UI.DOM.makeElement("div", null, ['margin-bottom']);
			const time = Math.ceil(baseTime() / V.SecExp.buildings.weapManu.productivity);
			const completedArray = V.SecExp.buildings.weapManu.upgrades.completed;

			App.UI.DOM.appendNewElement("h2", div, `Research`);
			div.append(`With our current industrial and research capabilities, upgrades will be finished in ${time} weeks.`);
			if (completed()) {
				delete V.SecExp.buildings.weapManu.upgrades.queue;
			} else {
				V.SecExp.buildings.weapManu.upgrades.queue = V.SecExp.buildings.weapManu.upgrades.queue || [];
				if (V.SecExp.buildings.weapManu.lab < 3) {
					div.append(`Upgrade the research facility further to unlock additional upgrades.`);
				}
			}

			App.UI.DOM.appendNewElement("h3", div, `Security Drones`);
			if (completed("bots")) {
				div.append(`You have fully upgraded the security drones.`);
			} else {
				div.append(purchase(-1));
				if (V.SecExp.buildings.weapManu.lab > 1) {
					div.append(purchase(-2));
				}
				if (V.SecExp.buildings.weapManu.lab > 2) {
					div.append(purchase(-3));
				}
			}

			App.UI.DOM.appendNewElement("h3", div, `Troops`);
			if (V.SF.Toggle && V.SF.Active >= 1 &&
				(App.Mods.SecExp.getAppliedUpgrades('human').attack >= 4 ||
					App.Mods.SecExp.getAppliedUpgrades('human').hp >= 4 ||
					App.Mods.SecExp.getAppliedUpgrades('human').morale >= 40 ||
					App.Mods.SecExp.getAppliedUpgrades('human').defense >= 4)) {
				div.append(`You have fully upgraded your human troops.`);
			} else if (App.Mods.SecExp.getAppliedUpgrades('human').attack >= 2 ||
				App.Mods.SecExp.getAppliedUpgrades('human').hp >= 2 ||
				App.Mods.SecExp.getAppliedUpgrades('human').morale >= 20 ||
				App.Mods.SecExp.getAppliedUpgrades('human').defense >= 2) {
				if (V.SF.Toggle && V.SF.Active >= 1) {
					const reasons = [];
					if (V.SF.Squad.Drugs < 8) {
						reasons.push(`the drug lab needs more advanced equipment`);
					}
					if (V.SecExp.edicts.SFSupportLevel < 2 || V.SecExp.edicts.SFSupportLevel < 4 || V.SecExp.edicts.SFSupportLevel < 5) {
						reasons.push(`you need to pass higher SF support edicts`);
					}
					if (V.SF.Squad.Firebase < 7) {
						reasons.push(`the Firebase need additional expansion(s)`);
					}

					div.append(`With support from ${V.SF.Lower}, we may be able to further upgrade our troops.`);
					if (reasons.length > 0) {
						div.append(`The Colonel says ${toSentence(reasons)}.`);
					}
				} else {
					div.append(`You have fully upgraded your human troops.`);
				}
			}

			div.append(purchase(0));
			div.append(purchase(1));
			if (V.SecExp.buildings.weapManu.lab > 1) {
				div.append(purchase(2));
				div.append(purchase(3));
			}
			if (V.SecExp.buildings.weapManu.lab > 2) {
				div.append(purchase(4));
				div.append(purchase(5));
			}

			if (V.SF.Toggle && V.SF.Active > 0) {
				if (V.SecExp.buildings.weapManu.lab > 1 &&
					V.SecExp.edicts.SFSupportLevel > 1 &&
					V.SF.Squad.Firebase > 6) {
					div.append(purchase(6));
				}
				if (V.SecExp.buildings.weapManu.lab > 1 &&
					V.SecExp.edicts.SFSupportLevel > 3 &&
					V.SF.Squad.Firebase > 7) {
					div.append(purchase(7));
				}
				if (V.SecExp.buildings.weapManu.lab > 2 &&
					V.SecExp.edicts.SFSupportLevel > 4) {
					div.append(purchase(8));
				}
			}

			if (V.SecExp.buildings.weapManu.upgrades.queue) {
				App.Events.addParagraph(div, []);
				for (let i = 0; i < V.SecExp.buildings.weapManu.upgrades.queue.length; i++) {
					const upgrade = V.SecExp.buildings.weapManu.upgrades.queue[i];
					const latest = current(upgrade.ID);
					if (i === 0) {
						div.append(`Currently developing`);
					} else {
						div.append(`${ordinalSuffix(i + 1)} in queue:`);
					}
					div.append(` ${latest.dec} for ${latest.unit}. It will enhance their ${latest.purpose}. Estimated completion time is ${numberWithPluralOne(upgrade.time, "week")}.`);
					App.UI.DOM.appendNewElement("div", div);
				}
			}

			if (completedArray.length) {
				App.UI.DOM.appendNewElement("div", div, `You have completed the following projects: ${toSentence(completedArray.map(u => current(u).dec))}.`, ['margin-top']);
			}
			return div;
		}
	}

	/** Prints a line that allows a user to purchase an upgrade.
	 * helper function, not callable externally
	 * @param {number} [upgradeID] ID value to when generating.
	 * @returns {Node}
	 */
	 function purchase(upgradeID) {
		let el = document.createElement("div");
		const found = V.SecExp.buildings.weapManu.upgrades.queue && V.SecExp.buildings.weapManu.upgrades.queue.find(s => s.ID === upgradeID);
		if (!V.SecExp.buildings.weapManu.upgrades.completed.includes(upgradeID)) {
			const item = current(upgradeID); const time = Math.ceil(baseTime() / V.SecExp.buildings.weapManu.productivity);
			if (!found) {
				el.append(App.UI.DOM.link(`Develop ${item.dec}.`, () => {
					V.SecExp.buildings.weapManu.upgrades.queue.push({ID: upgradeID, time: time});
					cashX(-item.cost, "capEx");
					App.UI.reload();
				}
				));
				el.append(` This will take ${time} weeks`);
				if (item.cost > 0) {
					el.append(`, cost ${cashFormat(item.cost)}`);
				}
				el.append(` and will increase `);
				if (item.type !== "all") {
					el.append(`the base ${item.type} value${item.type.contains("and") ? 's' : ''}`);
				} else {
					el.append('all base stats');
				}
				el.append(` of ${item.unit}.`);
			} else {
				el.append(App.UI.DOM.link(`Remove ${item.dec} from the queue`, () => {
					V.SecExp.buildings.weapManu.upgrades.queue.deleteAt(found);
					App.UI.reload();
				}
				));
			}
		}
		return el;
	}
})();
