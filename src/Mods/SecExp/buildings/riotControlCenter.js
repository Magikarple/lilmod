App.Mods.SecExp.riotCenter = (function() {
	return {
		init,
		GUI
	};

	function init() {
		V.SecExp.buildings.riotCenter = {
			upgrades: {
				freeMedia: 0,
				rapidUnit: 0,
				rapidUnitSpeed: 0,
			},
			fort: {
				reactor: 0,
				waterway: 0,
				assistant: 0,
			},
			sentUnitCooldown: 0,
			advancedRiotEquip: 0,
			brainImplant: -1,
			brainImplantProject: 0,
		};
	}

	function GUI() {
		const node = new DocumentFragment();
		V.nextButton = "Back";
		V.nextLink = "Main";
		node.append("The riot control center opens its guarded doors to you. The great chamber inside is dominated by massive screens filled with vital information and propaganda being tested.");
		App.Events.addParagraph(node, []);

		if (V.SecExp.rebellions.tension <= 33) {
			node.append("Tensions in the arcology are low. Political and ideological opposition against the arcology owner is almost unheard of.");
		} else if (V.SecExp.rebellions.tension <= 66) {
			node.append("Tensions in the arcology are rising; political and ideological opposition against the arcology owner are becoming a part of the daily life of the arcology.");
		} else {
			node.append("Tensions are high. Opposition to the arcology owner is a sentiment shared by many and armed resistance is on the rise.");
		}

		if (V.SecExp.buildings.riotCenter.upgrades.freeMedia === 0) {
			App.UI.DOM.appendNewElement("div", node,
				makeLink(
					"Provide free media access in all the arcology",
					5000,
					"Will slowly lower tensions in the arcology, but will incur in upkeep costs.",
					"freeMedia"
				)
			);
		} else {
			App.UI.DOM.appendNewElement("div", node, "You are providing free access to many mass media in the arcology.");
			if (V.SecExp.buildings.riotCenter.upgrades.freeMedia < 5) {
				App.UI.DOM.appendNewElement("div", node,
					makeLink(
						"Invest more resources in the free media project to increase its effectiveness",
						5000,
						"Will accelerate the tension decay, but will increase upkeep costs.",
						"freeMedia",
						true
					)
				);
			} else {
				App.UI.DOM.appendNewElement("div", node, "You upgraded your free media scheme to its limits.");
			}
		}
		App.Events.addParagraph(node, []);

		node.append(progressReport("slave"));
		App.UI.DOM.appendNewElement("div", node, progressReport("citizen"));
		App.Events.addParagraph(node, []);

		if (V.SecExp.buildings.riotCenter.upgrades.rapidUnit === 0) {
			node.append(
				makeLink(
					"Create rapid deployment riot units",
					7500,
					"Will allow spending authority or reputation to lower the progress of rebellions.",
					"rapidUnit"
				)
			);
		} else {
			node.append("You created a rapid deployment riot unit.");
			if (V.SecExp.buildings.riotCenter.upgrades.rapidUnit < 5) {
				App.UI.DOM.appendNewElement("div", node,
					makeLink(
						"Invest more resources in the rapid deployment unit",
						5000,
						"Will lower action costs.",
						"rapidUnit"
					)
				);
			} else {
				App.UI.DOM.appendNewElement("div", node, "You upgraded your rapid deployment unit to its limits.");
			}

			if (V.SecExp.buildings.riotCenter.upgrades.rapidUnitSpeed < 2) {
				App.UI.DOM.appendNewElement("div", node,
					makeLink(
						"Enhance the internal informants network",
						5000,
						"Will reduce cooldown of the rapid deployment riot unit.",
						"rapidUnitSpeed"
					)
				);
			} else {
				App.UI.DOM.appendNewElement("div", node, "You enhanced your informants network to its limits.");
			}

			App.Events.addParagraph(node, []);
			if (V.SecExp.buildings.riotCenter.sentUnitCooldown === 0) {
				App.UI.DOM.appendNewElement("div", node, deployUnit());
			} else {
				App.UI.DOM.appendNewElement("div", node, `The unit cannot be deployed again for ${V.SecExp.buildings.riotCenter.sentUnitCooldown} weeks.`);
			}
		}
		App.Events.addParagraph(node, []);

		if (V.SecExp.buildings.riotCenter.brainImplant < 106) {
			if (V.SecExp.buildings.riotCenter.brainImplantProject === 0) {
				node.append(
					makeLink(
						"Start secretly installing brain implants in your citizens and resident slaves",
						0,
						`Will take weeks of work and will cost ${cashFormat(5000)} each week, but once finished rebellions will progress a lot slower.`,
						"brainImplantStart"
					)
				);
			} else if (V.SecExp.buildings.riotCenter.brainImplantProject < 5) {
				node.append(
					makeLink(
						"Invest more resources into the project to increase its speed",
						50000,
						"Will shorten the time required to complete the project.",
						"brainImplantProject",
						true
					)
				);
			} else {
				node.append("You sped up the project to its maximum.");
			}
			if (V.SecExp.buildings.riotCenter.brainImplant !== -1) {
				App.UI.DOM.appendNewElement("div", node, `The great brain implant project is underway. Estimated time to completion: ${years(Math.trunc((100 - V.SecExp.buildings.riotCenter.brainImplant) / V.SecExp.buildings.riotCenter.brainImplantProject))}`);
			}
		} else {
			node.append("The great brain implant project is completed, rebellions against you will be extremely difficult to organize.");
		}
		App.Events.addParagraph(node, []);

		if (V.SecExp.buildings.riotCenter.advancedRiotEquip === 0) {
			node.append(
				makeLink(
					"Develop advanced anti-riot equipment",
					30000,
					"Will allow the selection of advanced riot equipment in case of a rebellion, which will let your troops fight at full effectiveness while doing reduced collateral damage.",
					"advancedRiotEquip"
				)
			);
		} else {
			node.append("You developed advanced riot equipment, which allows your troops to fight within the confines of your arcology without the fear of doing major collateral damage.");
		}

		if (V.SecExp.buildings.riotCenter.fort.reactor === 0) {
			App.UI.DOM.appendNewElement("div", node,
				makeLink(
					"Reinforce the reactor complex",
					10000,
					"Will add protection to the reactor building, making it less likely to be damaged and speeding up repairs if our defensive efforts should fail.",
					"reactor"
				)
			);
		} else {
			App.UI.DOM.appendNewElement("div", node, "You have installed additional protection layers and redundant systems in the reactor complex.");
		}

		if (V.SecExp.buildings.riotCenter.fort.waterway === 0) {
			App.UI.DOM.appendNewElement("div", node,
				makeLink(
					"Reinforce the waterways",
					10000,
					"Will add protection to the waterways, making it less likely to be damaged and speeding up repairs if our defensive efforts should fail.",
					"waterway"
				)
			);
		} else {
			App.UI.DOM.appendNewElement("div", node, "You have installed additional protection layers and redundant systems in the waterways.");
		}

		if (V.SecExp.buildings.riotCenter.fort.assistant === 0) {
			App.UI.DOM.appendNewElement("div", node,
				makeLink(
					"Reinforce the assistant CPU core",
					10000,
					"Will add protection to the assistant CPU core, making it less likely to be damaged and speeding up repairs if our defensive efforts should fail.",
					"assistant"
				)
			);
		} else {
			App.UI.DOM.appendNewElement("div", node, "You have installed additional protection layers and redundant systems in the assistant CPU core.");
		}

		if (V.SF.Toggle && V.SF.Active >= 1) {
			if (V.SecExp.edicts.SFSupportLevel >= 4 && V.SF.Squad.Armoury >= 8 && !V.SecExp.rebellions.sfArmor) {
				const cost = Math.ceil(500000 * App.Mods.SF.env() * (1.15 + (V.SF.Squad.Armoury/10) ));
				App.UI.DOM.appendNewElement("div", node, makePurchase(
					`Give the riot unit access to the combat armor suits of ${V.SF.Lower}.`, cost, "capEx",
					{handler: () => { V.SecExp.rebellions.sfArmor = 1; }}
				));
			} else {
				App.UI.DOM.appendNewElement("div", node, `You have given the riot unit access to the combat armor suits of ${V.SF.Lower}.`);
			}
		}
		return node;

		function deployUnit() {
			const deploy = document.createElement("span");
			const r = [];
			App.UI.DOM.appendNewElement("div", deploy, "You can send out the squad to slow down the progress of hostile groups within the arcology.");
			for (const type of ["authority", "reputation"]) {
				r.push(App.UI.DOM.link(
					`${capFirstChar(type)}`,
					() => {
						App.UI.DOM.replace(deploy, menu(type));
					}
				));
			}
			deploy.append("Spend: ", App.UI.DOM.generateLinksStrip(r));
			return deploy;
			/**
			 * @param {string} cost
			 * @returns {HTMLSpanElement}
			 */
			function menu(cost) {
				const text = document.createElement("span");
				App.UI.DOM.appendNewElement("div", text, `Your ${cost} will be leveraged to suppress the rebels.`);
				for (const type of ["slave", "citizen"]) {
					App.UI.DOM.appendNewElement("div", text, App.UI.DOM.link(
						`Deploy the unit against ${type} rebel leaders`,
						() => {
							const price = forceNeg(1000 + 50 * V.SecExp.buildings.riotCenter.upgrades.rapidUnit);
							(function() { cost === "reputation" ? repX(price, "war") : App.Mods.SecExp.authorityX(price); })();
							const change = random(15) + random(1, 2) * V.SecExp.buildings.riotCenter.upgrades.rapidUnit;
							V.SecExp.rebellions[type + "Progress"] = Math.clamp(V.SecExp.rebellions[type + "Progress"] - change, 0, 100);
							V.SecExp.buildings.riotCenter.sentUnitCooldown = 3 - V.SecExp.buildings.riotCenter.upgrades.rapidUnitSpeed;
							App.UI.DOM.replace(text, `${capFirstChar(type)} rebellion progress set back by ${change}%. The unit will be able to deployed again in ${V.SecExp.buildings.riotCenter.sentUnitCooldown} weeks.`);
						}
					));
				}
				return text;
			}
		}
		function makeLink(text, price, note, type, applyHacking=false) {
			const r = new DocumentFragment();
			r.append(App.UI.DOM.link(text,
				() => {
					cashX(-getCost(), "capEx");
					if (applyHacking) {
						V.PC.skill.hacking++;
					}
					switch (type) {
						case "freeMedia":
						case "rapidUnit":
						case "rapidUnitSpeed":
							V.SecExp.buildings.riotCenter.upgrades[type]++;
							break;
						case "brainImplantStart":
							V.SecExp.buildings.riotCenter.brainImplantProject = 1;
							V.SecExp.buildings.riotCenter.brainImplant = 0;
							break;
						case "brainImplantProject":
						case "advancedRiotEquip":
							V.SecExp.buildings.riotCenter[type]++;
							break;
						case "reactor":
						case "waterway":
						case "assistant":
							V.SecExp.buildings.riotCenter.fort[type]++;
					}
					App.UI.reload();
				},
			));

			if (type !== "brainImplantProject") {
				App.UI.DOM.appendNewElement("div", r, `Costs ${cashFormat(getCost())}. ${note}`, "note");
			} else {
				App.UI.DOM.appendNewElement("div", r, `One-time cost of ${cashFormat(getCost())} with an additional ${cashFormat(5000)} each week in maintenance. ${note}`, "note");
			}
			return r;

			function getCost() {
				if (["freeMedia", "rapidUnit", "rapidUnitSpeed"].includes(type)) {
					return Math.trunc(price * V.upgradeMultiplierArcology * (V.SecExp.buildings.riotCenter.upgrades[type] + 1) * (applyHacking ? V.HackingSkillMultiplier : 1));
				} else if (type === "brainImplantProject") {
					return Math.trunc(price * V.upgradeMultiplierArcology * (V.SecExp.buildings.riotCenter.brainImplantProject) * (applyHacking ? V.HackingSkillMultiplier : 1));
				} else if (type !== "advancedRiotEquip") {
					return Math.trunc(price * V.upgradeMultiplierArcology * (applyHacking ? V.HackingSkillMultiplier : 1));
				} else {
					return Math.trunc(price * V.upgradeMultiplierTrade);
				}
			}
		}
		function progressReport(type) {
			if (V.SecExp.rebellions[type + "Progress"] <= 25) {
				return `There is very low unrest between the ${type + 's'} of the arcology. The chances of a rebellion igniting are extremely low.`;
			} else if (V.SecExp.rebellions[type + "Progress"] <= 50) {
				return `There is some unrest between the ${type + 's'}. No major movement is forming yet, but it might be time to consider preventive measures.`;
			} else if (V.SecExp.rebellions[type + "Progress"] <= 75 ) {
				return `Unrest is getting high between the ${type + 's'} of the arcology. Preventive measures are necessary if we want to prevent a violent rebellion.`;
			}
			return `Unrest is extremely high between ${type + 's'}. The chances of a rebellion happening in the near future are extremely high.`;
		}
	}
})();
