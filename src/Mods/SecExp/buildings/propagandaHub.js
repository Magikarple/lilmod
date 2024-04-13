App.Mods.SecExp.propHub = (function() {
	return {
		init,
		GUI
	};

	function init() {
		V.SecExp.buildings.propHub = {
			recruiterOffice: 0,
			upgrades: {
				campaign: 0,
				miniTruth: 0,
				fakeNews: 0,
				controlLeaks: 0,
				secretService: 0,
				blackOps: 0,
				marketInfiltration: 0,
			},
			focus: "social engineering",
		};
	}

	function GUI() {
		const node = new DocumentFragment();
		V.nextButton = "Back";
		V.nextLink = "Main";
		let r = [];

		node.append("The propaganda hub is a surprisingly inconspicuous building, dimly lit from the outside. You are well aware however of its role and its importance. You confidently enter its unassuming doorway and calmly review the work being done here.");
		if (V.RecruiterID !== 0) {
			App.Events.addParagraph(node, []);
			const hasOffice = V.SecExp.buildings.propHub.recruiterOffice === 1;
			node.append(App.UI.DOM.link(
				`${hasOffice ? "Deny" : "Grant"} ${SlaveFullName(S.Recruiter)} office privileges`,
				() => {
					V.SecExp.buildings.propHub.recruiterOffice = (hasOffice ? 0 : 1);
					App.UI.reload();
				}
			));
			App.UI.DOM.appendNewElement("div", node, "Providing them with an office will help boost your chosen campaign. This also stacks with the campaign boost edict.", "note");
		}
		App.Events.addParagraph(node, []);

		if (V.SecExp.buildings.propHub.upgrades.campaign === 0) {
			node.append(makeLink(
				`Set up a propaganda campaign to align your citizens with your goals`,
				5000,
				"Will provide the focused resource each week, but will cost reputation in upkeep.",
				"campaign"
			));
		} else {
			const focusOptions = ["social engineering", "immigration", "enslavement"];
			App.UI.DOM.appendNewElement("div", node, "You have set up a team of trained slaves and expert propagandists, ready to spread the message of your choosing to the population.");
			if (V.SecExp.edicts.defense.militia >= 1) {
				focusOptions.push("recruitment");
			}

			for (const focus of focusOptions) {
				if (V.SecExp.buildings.propHub.focus === focus) {
					r.push(focus);
				} else {
					r.push(App.UI.DOM.link(
						`${focus}`,
						() => {
							V.SecExp.buildings.propHub.focus = focus;
							App.UI.reload();
						}
					));
				}
			}
			node.append("Focus on: ", App.UI.DOM.generateLinksStrip(r));

			r = ["You are concentrating your propaganda efforts towards"];
			switch (V.SecExp.buildings.propHub.focus) {
				case "social engineering":
					r.push("increasing the acceptance of your chosen future societies.");
					break;
				case "immigration":
					r.push("convincing more people to immigrate to your arcology.");
					break;
				case "enslavement":
					r.push("convincing more people to voluntarily enslave themselves.");
					break;
				case "recruitment":
					r.push("convincing more citizens to enter the militia.");
					break;
			}
			App.UI.DOM.appendNewElement("div", node, r.join(" "));

			if (V.SecExp.buildings.propHub.upgrades.campaign < 5) {
				App.UI.DOM.appendNewElement("div", node, makeLink(
					`Invest more resources into the project to increase its effectiveness`,
					5000,
					"Will provide more of the focused resource each week but increase reputation upkeep.",
					"campaign",
					true
				));
			} else {
				App.UI.DOM.appendNewElement("div", node, "You have upgraded your propaganda machine to its limits.");
			}
		}
		App.Events.addParagraph(node, []);

		if (V.SecExp.buildings.propHub.upgrades.miniTruth === 0) {
			node.append(makeLink(
				`Set up the authenticity department`,
				5000,
				"Will provide authority and unlock special upgrades, but will increase upkeep.",
				"miniTruth",
				false,
				"Set up a department tasked with guaranteeing the authenticity of all information available in the arcology. Of course if reality is against what is best for the arcology, then it should be redacted as well"
			));
		} else {
			if (V.SecExp.buildings.propHub.upgrades.miniTruth < 5) {
				node.append(makeLink(
					"Enlarge the authenticity department",
					5000,
					"Will provide more authority each week, but increases upkeep.",
					"miniTruth",
					false,
					"Invest more resources into the project to increase its effectiveness.",
				));
			} else {
				node.append("You have upgraded the authenticity department to its maximum.");
			}

			if (V.SecExp.buildings.propHub.upgrades.fakeNews === 0) {
				App.UI.DOM.appendNewElement("div", node, makeLink(
					"Install a news generator",
					10000,
					"The authenticity dept. now provides a small amount of reputation as well as authority, but increases upkeep.",
					"fakeNews",
					false,
					"Install an automatic news generator, able to fabricate thousands of plausible sounding news every day."
				));
			} else {
				App.UI.DOM.appendNewElement("div", node);
				node.append(
					"You have installed an automatic news generator. ",
					App.UI.DOM.link(
						"Remove news generator",
						() => {
							V.SecExp.buildings.propHub.upgrades.fakeNews = 0;
							App.UI.reload();
						}
					)
				);
			}

			if (V.SecExp.buildings.propHub.upgrades.controlLeaks === 0) {
				App.UI.DOM.appendNewElement("div", node, makeLink(
					"Institute controlled leaks protocols",
					10000,
					"The authenticity dept. now provides a small amount of reputation as well as authority, but increases upkeep.",
					"controlLeaks",
					true,
					"Institute a system able to release erroneous, but plausible, information about your business, leading your competitors to prepared financial traps. "
				));
			} else {
				App.UI.DOM.appendNewElement("div", node);
				node.append(
					"You have instituted controlled leaks protocols, able to create fabricated leaks of sensible information. ",
					App.UI.DOM.link(
						"Shut down leak protocols",
						() => {
							V.SecExp.buildings.propHub.upgrades.controlLeaks = 0;
							App.UI.reload();
						}
					)
				);
			}
		}
		App.Events.addParagraph(node, []);

		if (V.SecExp.buildings.propHub.upgrades.secretService === 0) {
			node.append(makeLink(
				"Set up personal secret service",
				10000,
				"Will provide authority and unlock special upgrades, but will increase upkeep.",
				"secretService",
				false,
				"Set up a department tasked with the protection of your person, as well as operations requiring a delicate approach."
			));
		} else {
			if (V.SecExp.buildings.propHub.upgrades.secretService < 5 && V.rep >= (V.SecExp.buildings.propHub.upgrades.secretService * 1000) + 5000) {
				node.append(makeLink(
					"Expand the secret service",
					5000,
					"Will provide more authority each week, but increases upkeep.",
					"secretService",
					false,
					"Invest more resources into the project to increase its effectiveness."
				));
			} else if (V.SecExp.buildings.propHub.upgrades.secretService < 5) {
				node.append("You lack the reputation to further expand operations.");
			} else {
				node.append("You have upgraded the secret service to its maximum.");
			}

			if (V.SecExp.buildings.propHub.upgrades.blackOps === 0) {
				App.UI.DOM.appendNewElement("div", node, makeLink(
					"Create a black ops team",
					10000,
					"The secret services now provides security as well as authority, but increases upkeep.",
					"blackOps",
					false,
					"Create a black ops team, ready to carry out corporate sabotage and sensitive operations to further your goals."
				));
			} else {
				App.UI.DOM.appendNewElement("div", node, "You have created a black ops team.");
			}

			if (V.SecExp.buildings.propHub.upgrades.marketInfiltration === 0) {
				App.UI.DOM.appendNewElement("div", node, makeLink(
					"Infiltrate the black market in order to manipulate it",
					10000,
					"The secret services now provides cash as well as authority each week, but will increase crime growth",
					"marketInfiltration"
				));
			} else {
				App.UI.DOM.appendNewElement("div", node);
				node.append(
					"You have infiltrated the black market and are now in partial control of it. ",
					App.UI.DOM.link(
						"Withdraw from the black market",
						() => {
							V.SecExp.buildings.propHub.upgrades.marketInfiltration = 0;
							App.UI.reload();
						}
					)
				);
			}
		}

		return node;

		function makeLink(text, price, note, type, applyHacking = true, message = null) {
			const r = new DocumentFragment();
			r.append(App.UI.DOM.link(text,
				() => {
					cashX(forceNeg(getCost()), "capEx");
					if (applyHacking) {
						V.PC.skill.hacking++;
					}
					V.SecExp.buildings.propHub.upgrades[type]++;
					if (V.SecExp.buildings.propHub.upgrades.campaign === 1) {
						V.SecExp.buildings.propHub.focus = "social engineering";
					}
					App.UI.reload();
				},
			));
			if (message) {
				App.UI.DOM.appendNewElement("div", r, `${message}`);
			}
			App.UI.DOM.appendNewElement("div", r, `Costs ${cashFormat(getCost())}. ${note}`, "note");
			return r;

			function getCost() {
				const HistoryDiscount = ["capitalist", "celebrity", "wealth"].includes(V.PC.career) ? 0.5 : 1;
				return Math.trunc(price * V.upgradeMultiplierArcology * (V.SecExp.buildings.propHub.upgrades[type] + 1) * HistoryDiscount * (applyHacking ? V.HackingSkillMultiplier : 1));
			}
		}
	}
})();
