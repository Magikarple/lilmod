/**
 * @returns {DocumentFragment}
 */
App.UI.View.mainLinks = function() {
	"use strict";
	const PA = V.personalAttention.task === PersonalAttention.TRAINING ? V.personalAttention.slaves.map(x => getSlave(x.ID)) : [];
	let fragment = document.createDocumentFragment();

	if (onBedRest(V.PC, true)) {
		if (V.PC.majorInjury > 0) {
			fragment.append(`You're laid up in bed until your injuries heal.`);
		} else if (V.PC.health.condition < -90) {
			fragment.append(`Your health is failing, so you're on bedrest until you recover.`);
		} else if (V.PC.preg > V.PC.pregData.normalBirth / 1.05 && V.PC.pregControl !== "labor suppressors") { // consider if the player should be able to ignore contractions
			fragment.append(`You plan to give birth this week.`);
		} else if (isInduced(V.PC)) {
			fragment.append(`You are giving birth this week.`);
		} else if (V.PC.geneMods.rapidCellGrowth !== 1 && V.PC.bellyPreg >= 100000 && V.PC.belly > (V.PC.pregAdaptation * 3200) && (V.PC.bellyPreg >= 500000 || V.PC.wombImplant !== "restraint")) {
			fragment.append(`You're laid up in bed until you pop.`);
		}
	} else {
		switch (V.personalAttention.task) {
			case PersonalAttention.BUSINESS:
				fragment.append(`You plan to focus on business this week.`);
				break;
			case PersonalAttention.WHORING:
				fragment.append(`You plan to focus on earning extra money this week.`);
				break;
			case PersonalAttention.MAID:
				fragment.append(`You plan to focus on cleaning the penthouse this week.`);
				break;
			case PersonalAttention.IMAGE:
				fragment.append(`You plan on improving your public image this week.`);
				break;
			case PersonalAttention.SURVEY:
				fragment.append(`You plan to survey ${V.arcologies[0].name}'s defenses in person this week.`);
				break;
			case PersonalAttention.DEVELOPMENT:
				fragment.append(`You plan on contributing to a local development project this week.`);
				break;
			case PersonalAttention.SMUGGLING:
				fragment.append(`You plan to make some easy (but dirty) money this week.`);
				break;
			case PersonalAttention.FIGHT:
				fragment.append(`You plan to enter a fistfight for some quick (but hopefully not too bloody) money this week.`);
				break;
			case PersonalAttention.SUPPORT_HG:
				fragment.append(`You plan to support your Head Girl this week, `);
				if (S.HeadGirl) {
					const {he, his} = getPronouns(S.HeadGirl);
					fragment.append(`so ${he} can give more slaves ${his} attention.`);
				} else {
					fragment.append(`should you assign one.`);
				}
				break;
			case PersonalAttention.SEX:
				fragment.append(`You plan to have as much sex with your slaves as possible this week.`);
				break;
			case PersonalAttention.RELAX:
				fragment.append(`You plan to take it easy this week.`);
				break;
			case PersonalAttention.STUDY:
				fragment.append(`This week you will work on getting a general education.`);
				break;
			case PersonalAttention.GED:
				fragment.append(`This week you are taking a test to prove you have a general education.`);
				break;
			case PersonalAttention.EDUCATION:
				fragment.append(`This week you are pursuing an advanced education.`);
				break;
			case PersonalAttention.TEST:
				fragment.append(`This week you are attempting to complete your advanced education.`);
				break;
			case PersonalAttention.TRADE:
				fragment.append(`This week you will learn trading.`);
				break;
			case PersonalAttention.WAR:
				fragment.append(`This week you will learn modern combat tactics.`);
				break;
			case PersonalAttention.SLAVING:
				fragment.append(`This week you will learn slaving.`);
				break;
			case PersonalAttention.ENGINEERING:
				fragment.append(`This week you will learn engineering.`);
				break;
			case PersonalAttention.MEDICINE:
				fragment.append(`This week you will learn medicine.`);
				break;
			case PersonalAttention.HACKING:
				fragment.append(`This week you will learn hacking.`);
				break;
			case PersonalAttention.PROCLAMATION:
				fragment.append(`This week you plan to issue a proclamation about ${V.SecExp.proclamation.type}.`);
				break;
			case PersonalAttention.TECH:
				fragment.append(`This week you plan to sell your technical skills to the highest bidder.`);
				break;
			default:
				if (PA.length > 0) {
					fragment.append(`You plan to train `);

					const trainees = [];
					PA.forEach((trainee, i) => {
						trainees.push(App.UI.DOM.combineNodes(App.UI.DOM.makeElement("span", SlaveFullName(trainee), "slave-name"),
							` to ${App.PersonalAttention.getText(V.personalAttention.slaves[i].objective, trainee)}`));
					});
					fragment.append(App.UI.DOM.toSentence(trainees));

					fragment.append(` this week.`);
				}
				break;
		}
	}

	if (V.PC.health.shortDamage < 30) {
		const link = App.UI.DOM.makeElement("span", App.UI.DOM.passageLink("Change plans", "Personal Attention Select"), "major-link");
		link.id = "managePA";
		fragment.append(" ", link, " ", App.UI.DOM.makeElement("span", App.UI.Hotkeys.hotkeys("Personal Attention Select"), "hotkey"));
	}

	if (V.useSlaveSummaryOverviewTab === 0) {
		let div = document.createElement("div");
		if (S.HeadGirl) {
			div.append(App.UI.DOM.makeElement("span", SlaveFullName(S.HeadGirl), "slave-name"), " is serving as your Head Girl");
			if (V.arcologies[0].FSEgyptianRevivalistLaw === 1) {
				div.append(` and Consort`);
			}
			div.append(". ",
				App.UI.DOM.makeElement("span", App.UI.DOM.passageLink("Manage Head Girl", "Head Girl Select"), "major-link"),
				" ", App.UI.DOM.makeElement("span", App.UI.Hotkeys.hotkeys("Head Girl Select"), "hotkey"));
			div.id = "manageHG";
		} else if (V.slaves.length > 1) {
			div.append(`You have not selected a Head Girl`);
			if (V.arcologies[0].FSEgyptianRevivalistLaw === 1) {
				div.append(` and Consort`);
			}
			div.append(". ",
				App.UI.DOM.makeElement("span", App.UI.DOM.passageLink("Select One", "Head Girl Select"), "major-link"),
				" ", App.UI.DOM.makeElement("span", App.UI.Hotkeys.hotkeys("Head Girl Select"), "hotkey"));
			div.id = "manageHG";
		} else {
			div.append(App.UI.DOM.makeElement("span", "You do not have enough slaves to keep a Head Girl", "note"));
		}
		fragment.append(div);

		div = document.createElement("div");
		if (V.RecruiterID) {
			div.append(App.UI.DOM.makeElement("span", SlaveFullName(S.Recruiter), "slave-name"), " is working to recruit girls. ",
				App.UI.DOM.makeElement("span", App.UI.DOM.passageLink("Manage Recruiter", "Recruiter Select"), "major-link"));
		} else {
			div.append("You have not selected a Recruiter. ",
				App.UI.DOM.makeElement("span", App.UI.DOM.passageLink("Select one", "Recruiter Select"), "major-link"));
		}
		div.append(" ", App.UI.DOM.makeElement("span", App.UI.Hotkeys.hotkeys("Recruiter Select"), "hotkey"));
		div.id = "manageRecruiter";
		fragment.append(div);

		if (V.dojo) {
			div = document.createElement("div");
			if (V.BodyguardID !== 0) {
				div.append(App.UI.DOM.makeElement("span", SlaveFullName(S.Bodyguard), "slave-name"), " is serving as your bodyguard. ",
					App.UI.DOM.makeElement("span", App.UI.DOM.passageLink("Manage Bodyguard", "BG Select"), "major-link"));
			} else {
				div.append("You have not selected a Bodyguard. ",
					App.UI.DOM.makeElement("span", App.UI.DOM.passageLink("Select one", "BG Select"), "major-link"));
			}
			div.append(" ", App.UI.DOM.makeElement("span", App.UI.Hotkeys.hotkeys("BG Select"), "hotkey"));
			div.id = "manageBG";
			fragment.append(div);
		}
	}

	if (V.completedOrgans.length > 0) {
		/* first remove any organs with no corresponding slave */
		V.completedOrgans = V.completedOrgans.filter(organ => {
			return (typeof organ === 'object' && getSlave(organ.ID) !== undefined);
		});
		/* cycle through slaves, for each slave cycle through completed organs and track how many are of the interrogated slave (and if organs have a slaves to be implanted on) */
		for (const slave of V.slaves) {
			const slaveOrgans = V.completedOrgans.reduce((acc, organ) => organ.ID === slave.ID ? acc + 1 : acc, 0);
			/* if the interrogated slave has one or more organs ready: */
			if (slaveOrgans > 0) {
				const div = document.createElement("div");
				div.classList.add("yellow");
				div.append("The fabricator has completed ");
				if (slaveOrgans > 1) {
					div.append(`${slaveOrgans} organs`);
				} else {
					div.append('an organ');
				}
				div.append(" for ",
					App.UI.DOM.makeElement(
						"span",
						App.UI.DOM.link(
							slave.slaveName,
							() => {
								V.AS = slave.ID;
								V.tabChoice.RemoteSurgery = "Structural";
							},
							[],
							"Remote Surgery")
						, "clear-formatting"
					),
					" which ");
				if (slaveOrgans > 1) {
					div.append('are');
				} else {
					div.append('is');
				}
				div.append(' ready to be implanted.');
				fragment.append(div);
			}
		}
	}

	if (V.adjustProstheticsCompleted > 0) {
		for (let j = 0; j < V.adjustProsthetics.length; j++) {
			const slave = getSlave(V.adjustProsthetics[j].slaveID);
			if (slave) {
				if (V.adjustProsthetics[j].workLeft <= 0) {
					const div = document.createElement("div");
					div.classList.add("yellow");
					div.append(`The lab has completed ${addA(App.Data.prosthetics[V.adjustProsthetics[j].id].name)} for `,
						App.UI.DOM.makeElement("span", App.UI.DOM.link(SlaveFullName(slave), () => { V.AS = slave.ID; }, [], "Slave Interact"), "clear-formatting"),
						" which is ready to be attached.");
					fragment.append(div);
				}
			} else {
				V.adjustProsthetics.splice(j, 1);
				j--;
			}
		}
	}

	if (V.completedOrgans.length > 0 && V.adjustProstheticsCompleted > 0) {
		const div = document.createElement("div");
		div.append(App.UI.DOM.passageLink("Implant and Attach", "Multiple Organ Implant"),
			App.UI.DOM.makeElement("span", " all organs and prosthetics that are ready.", "yellow"));
		fragment.append(div);
	} else if (V.completedOrgans.length > 1) {
		const div = document.createElement("div");
		div.append(App.UI.DOM.passageLink("Implant", "Multiple Organ Implant"),
			App.UI.DOM.makeElement("span", " all organs that are ready for implantation.", "yellow"));
		fragment.append(div);
	} else if (V.adjustProstheticsCompleted > 1) {
		const div = document.createElement("div");
		div.append(App.UI.DOM.passageLink("Attach", "Multiple Organ Implant"),
			App.UI.DOM.makeElement("span", " all prosthetics that are ready to be attached.", "yellow"));
		fragment.append(div);
	}

	const div = App.UI.DOM.makeElement("div", null, ['margin-bottom']);
	if (V.slaveCostFactor === 1) {
		div.append("The slave market is stable; the price of slaves is average.");
	} else {
		let r;
		if (V.slaveCostFactor > 1) {
			if (V.slaveCostFactor > 1.05) {
				r = "There is a bull market for slaves; the price of slaves is very high.";
			} else {
				r = "The slave market is bullish; the price of slaves is high.";
			}
		} else {
			if (V.slaveCostFactor < 0.95) {
				r = "There is a bear market for slaves; the price of slaves is very low.";
			} else {
				r = "The slave market is bearish; the price of slaves is low.";
			}
		}
		div.append(App.UI.DOM.makeElement("span", r, "yellow"));
	}

	const buySlaves = App.UI.DOM.makeElement("span", App.UI.DOM.passageLink("Buy Slaves", "Buy Slaves"), "major-link");
	buySlaves.id = "buySlaves";
	div.append(" ", buySlaves, " ", App.UI.DOM.makeElement("span", "[S]", "hotkey"));

	fragment.append(div);

	for (const [SCH, schObj] of App.Data.misc.schools) {
		if (!schObj.requirements || V[SCH].schoolSale === 0) {
			continue;
		}
		const div = document.createElement("div");
		div.append(App.UI.DOM.makeElement("span", "For your first purchase, ", "yellow"),
			App.UI.DOM.passageLink(
				schObj.title,
				"Market",
				() => {
					V.market = new App.Markets.Global(SCH);
					V.nextButton = "Back to Main";
					V.nextLink = "Main";
					V.returnTo = "Main";
				}),
			App.UI.DOM.makeElement("span", " will sell at half price this week.", "yellow"));
		fragment.append(div);
	}
	return fragment;
};
