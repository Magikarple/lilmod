App.UI.FireBase = function() {
	const max = App.Mods.SF.upgrades.max();
	const size = App.Mods.SF.upgrades.total();
	const isBrazen = V.SF.Colonel.Core === "brazen";
	const node = document.createElement("span");
	let r = [];

	if (V.SF.FS.Tension > 100) {
		return App.UI.DOM.appendNewElement("div", node, App.Mods.SF.fsIntegration.crisis()[0]);
	} else {
		if (V.cheatMode > 0 || V.debugMode > 0) {
			App.UI.DOM.appendNewElement("div", node, App.UI.DOM.passageLink("Edit", "editSF"));
		}

		node.append(
			`The firebase of ${V.arcologies[0].name}'s `,
			App.UI.DOM.makeTextBox(V.SF.Lower, str => { V.SF.Lower = str; }),
			` is located in the lower levels, occupying unneeded warehouse space. It is not accessible to the general citizenry, but your personal elevator has express service to it. As you step off, two soldiers in combat armor manning the entry checkpoint tense before recognizing their Marshal and stepping aside with a sharp salute.`
		);
	}

	r.push("You make your way to the operations center. The Colonel is");
	if (random(1, 100) > 25) {
		r.push("glancing between her tablet and the large wallscreen, occasionally taking notes or barking orders.");
	} else if (random(1, 100) > 50) {
		r.push("handling a minor issue.");
	} else {
		r.push("examining a table with a map of the surrounding area, planning maneuvers in the event of an attack.");
	}
	r.push("She notices your entrance and turns her attention to you.");
	if (isBrazen) {
		r.push(`She gives a textbook salute. "${properTitle()}, how can I help you?"`);
	} else {
		r.push(`"Hey boss, what do you need?"`);
	}
	App.UI.DOM.appendNewElement("div", node, r.join(" "));

	App.UI.DOM.appendNewElement("p", node, App.UI.DOM.passageLink("Tour the firebase", "FirebaseTour"));
	if (size === max) {
		App.UI.DOM.appendNewElement("div", node, "There are no more upgrades available.");
		delete V.SF.Upgrade;
	}
	if (V.SF.FS.Tension !== -1) {
		App.UI.DOM.appendNewElement("div", node, `The Colonel's current Tension: ${V.SF.FS.Tension}`);
	}

	const tabBar = new App.UI.Tabs.TabBar("SpecialForceBase");
	if (size !== max) {
		tabBar.addTab("Upgrades", "Upgrades", upgrades());
	}
	tabBar.addTab("Actions", "Actions", actions());
	tabBar.addTab("Future Societies", "FS", App.Mods.SF.fsIntegration.menu());
	node.append(tabBar.render());
	return node;

	function upgrades() {
		const cost = forceNeg(Math.ceil(10000 + ((0.03 - (size/max)/100) * V.SF.CreditsInvested)));
		const node = document.createElement("span");
		node.append(`Total upgrade progress:`);
		$(node).wiki(App.Mods.SF.progress(size, max));
		node.append(`${size}/${max}(${(size/max).toFixed(2)*100}%)`);
		if (size < 30) {
			App.UI.DOM.appendNewElement("div", node, `${(30 - size)} more upgrades is needed until the next tier unlocks.`, "note");
		}
		if (V.SF.Upgrade > 0) {
			App.UI.DOM.appendNewElement("div", node, App.UI.DOM.combineNodes(
				App.UI.DOM.appendNewElement("span", node, `Spend ${cashFormat(cost)} `, ["cash", "dec"]),
				App.UI.DOM.link("to re-unlock upgrading.",
					() => {
						V.SF.Upgrade = 0;
						cashX(cost, "specialForcesCap");
						App.UI.reload();
					}
				))
			);
		} else if (size < 30 || size !== max) {
			App.UI.DOM.appendNewElement("div", node, App.Mods.SF.upgrades.menu());
		}
		return node;
	}

	function actions() {
		const r = [];
		const repeatTrigger = (Math.trunc(V.week/24) === (V.week/24)) && V.SF.MercCon.CanAttend === -1;
		const node = document.createElement("span");
		/**
			* @param {string} text
			* @param {number} value
			*/
		const choiceLink = (text, value) => App.UI.DOM.link(text, () => { V.SF.MercCon.CanAttend = value; App.UI.reload(); });
		/**
			* @param {string} text
			* @param {string} target
			* @param {number} value
			*/
		const assignTroopsLink = (text, target, value) => App.UI.DOM.link(text, () => { V.SF.UC[target] = value; App.UI.reload(); });

		App.UI.DOM.appendNewElement("h3", node, `Operational choices:`);
		App.UI.DOM.appendNewElement("p", node, DeploymentFocus());
		App.UI.DOM.appendNewElement("p", node, ROE());
		App.UI.DOM.appendNewElement("p", node, Accountability());
		App.Events.addParagraph(node, ["Force depravity is a measure of how cruel and indifferent solders of the force are. This affects trade, how the force is viewed and or acts during some situations. Lower values lead to more ideal outcomes."]);

		if (V.SF.MercCon.CanAttend === 0 || V.SF.MercCon.History >= 1 && repeatTrigger) {
			r.push(`Her expression changes as something jogs her memory. "Before we begin, ${isBrazen ? `${properTitle()}` : 'boss'},`);
			if (V.SF.MercCon.CanAttend === 0) {
				r.push(`back when I was a merc me and a couple of my old friends would have a meetup every several months. Drinking, fucking, drugs... a little poker. It eventually grew into a whole thing, and now we bring our latest and greatest toys to show off, maybe make some money off selling the schematics. I'd like to continue going, for old times' sake."`);
			} else if (V.SF.MercCon.History >= 1 && repeatTrigger) {
				r.push(`that biannual merc meetup has come around again. You've already given me leave to attend, but I just wanted to be sure I'm still clear to go."`);
			}
			App.UI.DOM.appendNewElement("div", node, r.join(" "));
			App.UI.DOM.appendNewElement("div", node, choiceLink("Grant leave", 1));
			App.UI.DOM.appendNewElement("div", node, choiceLink("Request she remain on site", -2));
		}

		const report = document.createElement("span");
		if (V.SF.MercCon.History >= 1) {
			App.UI.DOM.appendNewElement("div", report, App.UI.DOM.link("Mercenary meetup report",
				() => {
					App.UI.DOM.replace(report,
						App.UI.DOM.combineNodes(
							`While at the recent merc meetup, The Colonel made`,
							App.UI.DOM.makeElement("span", ` ${cashFormat(Math.ceil(V.SF.MercCon.Income))}`, "yellowgreen"),
							` selling generic schematics to her friends,`,
							` ${num(V.SF.MercCon.Menials)} menial slaves were won in a poker game, and`,
							` ${num(V.SF.MercCon.Mercs)} mercenaries were persuaded to join ${V.SF.Lower}.`,
							App.UI.DOM.makeElement("div",
								App.UI.DOM.combineNodes(
									"Total earnings thus far:",
									App.UI.DOM.makeElement("span",
										` ${cashFormat(Math.ceil(V.SF.MercCon.Revenue))}`, "yellowgreen"),
									` in income, ${num(V.SF.MercCon.TotalMenials)} menial slaves and ${num(V.SF.MercCon.TotalMercs)} mercenaries joined across ${V.SF.MercCon.History} meetups.`
								)
							)
						)
					);
				}));
		}
		App.UI.DOM.appendNewElement("p", node, report);

		const ratio = function() {
			if (V.SF.UC.Assign === 0) {
				return (V.SF.UC.Lock < 1 ? "No" : "Zero of");
			} else if (V.SF.UC.Assign === 1) {
				return "A small section of";
			} else if (V.SF.UC.Assign === 2) {
				return "A large section of";
			}
		};

		if (V.SF.UC.Lock < 1) {
			if (V.SF.UC.Assign >= 0) {
				App.UI.DOM.appendNewElement("div", node, `${ratio()} soldiers are working undercover, which would primarily advance your cultural goals while also slightly boosting your reputation.`);
				App.UI.DOM.appendNewElement("div", node, assignTroopsLink("Full time assignment", "Lock", 1));
				App.UI.DOM.appendNewElement("div", node, assignTroopsLink("Reassign soldiers", "Assign", -1));
			} else {
				App.UI.DOM.appendNewElement("div", node, "Would you like to assign soldiers to undercover duty, which will primarily advance your cultural goals while also slightly boosting your reputation?");
				App.UI.DOM.appendNewElement("div", node, assignTroopsLink("Do not assign soldiers to work undercover", "Assign", 0));
				App.UI.DOM.appendNewElement("div", node, assignTroopsLink("Assign a small section of soldiers to work undercover", "Assign", 1));
				App.UI.DOM.appendNewElement("div", node, assignTroopsLink("Assign a large section of soldiers to work undercover", "Assign", 2));
			}
		} else {
			App.UI.DOM.appendNewElement("span", node,
				App.UI.DOM.combineNodes(
					App.UI.DOM.makeElement("span", `${ratio()}`, ["bold"]),
					" the Special Force is assigned to undercover work, which will primarily advance your cultural goals while also slightly boosting your reputation."
				)
			);
			App.UI.DOM.appendNewElement("span", node, assignTroopsLink(" Re-allocate the units", "Lock", 0));
		}
		App.UI.DOM.appendNewElement("div", node, "Any affects on your cultural goals and reputation are modified by the number of assigned troops.");

		return node;

		function DeploymentFocus() {
			const text = new DocumentFragment();
			let focus = document.createElement("span");
			App.UI.DOM.appendNewElement("span", focus, mapping());

			App.UI.DOM.appendNewElement("span", text, "Deployment focus: ");
			App.UI.DOM.appendNewElement("span", text, focus, "bold");

			App.UI.DOM.appendNewElement("div", text, App.UI.DOM.link("Recruiting and Training",
				() => {
					V.SF.Target = "recruit";
					App.UI.DOM.replace(focus, "Recruiting and Training");
				}, [], "",
				"Increases the amount of FNGs at the cost of revenue."
			), "indent");

			App.UI.DOM.appendNewElement("div", text, App.UI.DOM.link("Securing Trade Routes",
				() => {
					V.SF.Target = "secure";
					App.UI.DOM.replace(focus, "Securing Trade Routes");
				}, [], "",
				"Increases trade and reputation at the cost of revenue."
			), "indent");

			App.UI.DOM.appendNewElement("div", text, App.UI.DOM.link("Raiding and Slaving",
				() => {
					V.SF.Target = "raiding";
					App.UI.DOM.replace(focus, "Raiding and Slaving");
				}, [], "",
				"Increases revenue at the cost of less FNGs and increased force depravity."
			), "indent");

			return text;

			function mapping() {
				switch (V.SF.Target) {
					case "recruit":
						return "Recruiting and Training";
					case "secure":
						return "Securing Trade Routes";
					case "raiding":
						return "Raiding and Slaving";
				}
			}
		}

		function ROE() {
			const text = new DocumentFragment();
			let focus = document.createElement("span");
			App.UI.DOM.appendNewElement("span", focus, mapping());

			App.UI.DOM.appendNewElement("span", text, "Rules of Engagements: ");
			App.UI.DOM.appendNewElement("span", text, focus, "bold");

			App.UI.DOM.appendNewElement("div", text, App.UI.DOM.link("Hold Fire",
				() => {
					V.SF.ROE = "hold";
					App.UI.DOM.replace(focus, mapping());
				}, [], "",
				"Reduces force depravity."
			), "indent");

			App.UI.DOM.appendNewElement("div", text, App.UI.DOM.link("limited Fire",
				() => {
					V.SF.ROE = "limited";
					App.UI.DOM.replace(focus, mapping());
				}, [], "",
				"Does not adjust force depravity."
			), "indent");

			App.UI.DOM.appendNewElement("div", text, App.UI.DOM.link("Free Fire",
				() => {
					V.SF.ROE = "free";
					App.UI.DOM.replace(focus, mapping());
				}, [], "",
				"Increases force depravity."
			), "indent");

			return text;

			function mapping() {
				switch (V.SF.ROE) {
					case "hold":
						return "Hold Fire";
					case "limited":
						return "limited Fire";
					case "free":
						return "Free Fire";
				}
			}
		}

		function Accountability() {
			const text = new DocumentFragment();
			let focus = document.createElement("span");
			App.UI.DOM.appendNewElement("span", focus, mapping());

			App.UI.DOM.appendNewElement("span", text, "Rules of Engagements: ");
			App.UI.DOM.appendNewElement("span", text, focus, "bold");

			App.UI.DOM.appendNewElement("div", text, App.UI.DOM.link("Strict Accountability",
				() => {
					V.SF.Regs = "strict";
					App.UI.DOM.replace(focus, mapping());
				}, [], "",
				"Reduces force depravity."
			), "indent");

			App.UI.DOM.appendNewElement("div", text, App.UI.DOM.link("Some Accountability",
				() => {
					V.SF.Regs = "some";
					App.UI.DOM.replace(focus, mapping());
				}, [], "",
				"Does not adjust force depravity."
			), "indent");

			App.UI.DOM.appendNewElement("div", text, App.UI.DOM.link("No Accountability",
				() => {
					V.SF.Regs = "none";
					App.UI.DOM.replace(focus, mapping());
				}, [], "",
				"Increases force depravity."
			), "indent");

			return text;

			function mapping() {
				switch (V.SF.Regs) {
					case "strict":
						return "Strict Accountability";
					case "some":
						return "Some Accountability";
					case "none":
						return "No Accountability";
				}
			}
		}
	}
};
