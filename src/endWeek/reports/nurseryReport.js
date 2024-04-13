/**
 * Creates a full report of the Nursery
 * @returns {FC.EndWeek.FacilityReport}
 */
App.Facilities.Nursery.nurseryReport = function nurseryReport() {
	const frag = new DocumentFragment();

	const slaves = App.Utils.sortedEmployees(App.Entity.facilities.nursery);
	const devBonus = (V.nurseryDecoration !== "standard") ? 1 : 0;
	const arcology = V.arcologies[0];
	const NL = App.Entity.facilities.nursery.employeesIDs().size;

	let matronBonus = 0;

	App.EndWeek.saVars.flSex = App.EndWeek.getFLSex(App.Entity.facilities.nursery);

	function matronChanges() {
		if (S.Matron) {
			S.Matron.devotion += devBonus;

			if (S.Matron.health.condition < -80) {
				improveCondition(S.Matron, 20);
			} else if (S.Matron.health.condition < -40) {
				improveCondition(S.Matron, 15);
			} else if (S.Matron.health.condition < 0) {
				improveCondition(S.Matron, 10);
			} else if (S.Matron.health.condition < 90) {
				improveCondition(S.Matron, 7);
			}

			if (S.Matron.devotion <= 60) {
				S.Matron.devotion++;
			}

			if (S.Matron.trust < 60) {
				S.Matron.trust++;
			}

			if (S.Matron.rules.living !== "luxurious") {
				S.Matron.rules.living = "luxurious";
			}
			if (S.Matron.rules.rest !== "restrictive") {
				S.Matron.rules.rest = "restrictive";
			}
		}
	}

	function matronText() {
		const frag = new DocumentFragment();

		if (S.Matron) {
			const {He, he, His, his, him} = getPronouns(S.Matron);

			let r = [];
			if (S.Matron.relationship === -3 && S.Matron.devotion > 50) {
				r.push(`${He} does ${his} best to ${V.nurseryChildren
					? `properly raise and look after the children in ${V.nurseryName}`
					: `look after ${V.nurseryName} and keep it tidy and running smoothly`}.`);
			}

			if (S.Matron.health.condition < 10) {
				r.push(`${He} does ${his} best to take good care of ${V.nurseryChildren ? `the children` : `${V.nurseryName}`}, but ${his} poor health limits ${his} ability to do so.`);
			} else if (S.Matron.health.condition < 80) {
				r.push(`${His} good health allows ${him} to keep up with the demands of ${V.nurseryName}${NL ? `and <span class="yellowgreen">work</span> the nannies hard` : ``}.`);

				matronBonus += NL ? 50 : 0;
			} else {
				r.push(`${His} perfect health allows ${him} to really stay on top of things in ${V.nurseryName}${NL > 0 ? ` and <span class="yellowgreen">really drive</span> the nannies hard.` : ``}`);

				matronBonus += NL ? 75 : 0;
			}

			if (App.Data.Careers.Leader.matron.includes(S.Matron.career)) {
				r.push(`${He} has experience with looking after children from ${his} life before ${he} was a slave.`);

				matronBonus += 25;
			} else if (S.Matron.skill.matron >= Constant.MASTERED_XP) {
				r.push(`${He} has applicable experience with taking care of children from working for you.`);

				matronBonus += 25;
			} else {
				const skillIncrease = jsRandom(1, Math.ceil((
					S.Matron.intelligence + S.Matron.intelligenceImplant
				) / 15) + 8);
				r.push(slaveSkillIncrease('matron', S.Matron, skillIncrease));
			}

			if (S.Matron.actualAge > 35) {
				r.push(`${His} age and experience make ${him} more effective.`);

				matronBonus += 25;
			} else if (!V.AgePenalty) {
				matronBonus += 25;
			}

			if (S.Matron.intelligence + S.Matron.intelligenceImplant > 15) {
				r.push(`${He}'s intelligent enough that ${he} is more effectively able to take care of ${V.nurseryName}${V.nurseryChildren ? ` and its children` : ``}.`);

				matronBonus += S.Matron.intelligence + S.Matron.intelligenceImplant;
			}

			if (V.nurseryChildren < V.nurseryCribs) {
				let seed = jsRandom(1, 10) + ((V.nurseryCribs - V.nurseryChildren) * (jsRandom(150, 170) + (matronBonus * 10)));
				cashX(seed, "nursery", S.Matron);

				r.push(`<p class="indent">Since ${he} doesn't have enough children to occupy all ${his} time, ${V.nurseryName} takes in citizens' children on a contract basis and ${he} cares for them too, earning <span class='yellowgreen'>${cashFormat(seed)}.</span></p>`);
			}

			if (arcology.FSRepopulationFocus > 0 && V.nurseryChildren > 0) {
				r.push(`Society <span class='green'>loves</span> the way you are raising more children for ${arcology.name}.`);
				FutureSocieties.Change("Repopulationist", 2);
			}

			App.Events.addNode(frag, r);
		}

		return frag;
	}

	if (slaves) {
		let r = [];

		r.push(`${slaves.length > 1 ? `There are ${slaves.length} slaves` : `There is one slave`} working in ${V.nurseryName}.</strong>`);

		if (arcology.FSRepopulationFocus > 0 && V.nurseryChildren > 0) {
			r.push(`Society <span class="green">approves</span> of your bringing more children into this world.`);
		} else if (arcology.FSGenderFundamentalist > 0) {
			r.push(`Society <span class="green">approves</span> of your assigning slaves to a traditionally feminine role.`);
		}

		App.Events.addNode(frag, r);
	}

	if (S.Matron) {
		const slave = App.SlaveAssignment.reportSlave(S.Matron);

		matronChanges();

		if (V.showEWD || (V.favSeparateReport === 1 && V.favorites.includes(slave.ID))) {
			const matronEntry = App.UI.DOM.appendNewElement("div", frag, '', ["slave-report"]);
			const artSpan = App.UI.DOM.appendNewElement("span", matronEntry);
			App.Events.addNode(matronEntry, [App.SlaveAssignment.saSlaveIntro(slave, `is serving as your Matron.`), matronText()]);
			matronEntry.append(App.SlaveAssignment.standardSlaveReport(slave, false));
			App.SlaveAssignment.appendSlaveArt(artSpan, slave);
		} else {
			App.SlaveAssignment.standardSlaveReport(slave, true);
		}
	}

	// FIXME: check these numbers over to make sure they make sense
	for (const slave of App.SlaveAssignment.reportSlaves(slaves)) {
		slave.devotion += devBonus;

		if (slave.devotion <= 20 && slave.trust >= -20) {
			slave.devotion -= 5;
			slave.trust -= 5;
		} else if (slave.devotion <= 10) {
			slave.devotion += 2;
		} else if (slave.devotion >= 80) {
			slave.devotion -= 2;
		}

		if (slave.trust < -20) {
			slave.trust += 3;
		} else if (slave.trust < -50) {
			slave.trust += 2;
		} else if (slave.trust < -30) {
			slave.trust += 1;
		}

		if (slave.health.condition < -80) {
			improveCondition(slave, 20);
		} else if (slave.health.condition < -40) {
			improveCondition(slave, 10);
		} else if (slave.health.condition < 0) {
			improveCondition(slave, 7);
		} else if (slave.health.condition < 90) {
			improveCondition(slave, 3);
		}

		// TODO: add more cases
		switch (V.nurseryDecoration) {
			case "Repopulationist":
				slave.rules.living = "luxurious";
				break;
			case "Degradationist":
				slave.rules.living = "spare";
				break;
			default:
				slave.rules.living = "normal";
				break;
		}

		if (V.showEWD || (V.favSeparateReport === 1 && V.favorites.includes(slave.ID))) {
			const {He} = getPronouns(slave);
			const slaveEntry = App.UI.DOM.appendNewElement("div", frag, '', ["slave-report"]);
			const artSpan = App.UI.DOM.appendNewElement("span", slaveEntry);
			slaveEntry.append(App.SlaveAssignment.saSlaveIntro(slave, `is working out of ${V.nurseryName}.`));

			App.Events.addNode(slaveEntry, [He, App.SlaveAssignment.nanny(slave)], "div", ["indent"]);
			slaveEntry.append(App.SlaveAssignment.standardSlaveReport(slave, false));
			App.SlaveAssignment.appendSlaveArt(artSpan, slave);
		} else {	// silently discard return values
			App.SlaveAssignment.nanny(slave);
			App.SlaveAssignment.standardSlaveReport(slave, true);
		}
	}

	if (V.nurseryDecoration !== "standard") {
		App.Events.addNode(frag, [`${capFirstChar(V.nurseryName)}'s ${V.nurseryDecoration} atmosphere <span class="devotion inc">has a minor impact on your servants.</span>`]);
	}

	App.EndWeek.saVars.flSex = new Set();

	return {
		before: frag,
		slaves: [],
		after: new DocumentFragment(),
	};
};
