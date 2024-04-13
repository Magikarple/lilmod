/**
 * @returns {FC.EndWeek.FacilityReport}
 */
App.EndWeek.cellblockReport = function() {
	const beforeFrag = new DocumentFragment();
	let r = [];

	const slaves = App.Utils.sortedEmployees(App.Entity.facilities.cellblock);
	let brokenSlaves = 0;
	let idleBonus = 0;
	let softenedQuirks = 0;
	let trustMalus = 0;
	let FLsFetish = 0;
	let devBonus = (V.cellblockDecoration !== "standard") ? 1 : 0;
	let confinedResults;

	const cellblockNameCaps = capFirstChar(V.cellblockName);
	App.EndWeek.saVars.flSex = App.EndWeek.getFLSex(App.Entity.facilities.cellblock);

	if (S.Wardeness) {
		const {
			He, His,
			he, his, him, wife
		} = getPronouns(S.Wardeness);
		r = [];

		if (S.Wardeness.health.condition < -80) {
			improveCondition(S.Wardeness, 20);
		} else if (S.Wardeness.health.condition < -40) {
			improveCondition(S.Wardeness, 15);
		} else if (S.Wardeness.health.condition < 0) {
			improveCondition(S.Wardeness, 10);
		} else if (S.Wardeness.health.condition < 90) {
			improveCondition(S.Wardeness, 7);
		}
		if (S.Wardeness.devotion <= 60) {
			S.Wardeness.devotion += 2;
		}
		S.Wardeness.devotion += devBonus;
		if (S.Wardeness.trust < 60) {
			S.Wardeness.trust += 3;
		}
		if (S.Wardeness.rules.living !== "luxurious") {
			S.Wardeness.rules.living = "luxurious";
		}
		if (S.Wardeness.rules.rest !== "restrictive") {
			S.Wardeness.rules.rest = "restrictive";
		}
		if (S.Wardeness.fetishStrength <= 95) {
			if (S.Wardeness.fetish !== Fetish.SADIST) {
				if (fetishChangeChance(S.Wardeness) > random(0, 100)) {
					FLsFetish = 1;
					S.Wardeness.fetishKnown = 1;
					S.Wardeness.fetish = Fetish.SADIST;
					S.Wardeness.fetishStrength = 10;
				}
			} else if (S.Wardeness.fetishKnown === 0) {
				FLsFetish = 1;
				S.Wardeness.fetishKnown = 1;
			} else {
				FLsFetish = 2;
				S.Wardeness.fetishStrength += 4;
			}
		}
		if (S.Wardeness.energy > 95 || S.Wardeness.fetish === Fetish.SADIST) {
			devBonus++;
			trustMalus++;
			idleBonus++;
		}
		const popup = App.UI.DOM.slaveDescriptionDialog(S.Wardeness, SlaveFullName(S.Wardeness));
		popup.classList.add("slave-name", "bold");
		r.push(popup, `is serving as the Wardeness.`);

		if (S.Wardeness.relationship === -3 && S.Wardeness.devotion > 50) {
			devBonus++;
			trustMalus++;
			idleBonus++;
			r.push(`As your ${wife}, ${he} tries ${his} best to break the disobedient slaves to your will.`);
		}
		if (FLsFetish === 1) {
			r.push(`One day ${he} demands obedience. The next day ${he} strikes a slave when it isn't given. The next, ${he} seems more excited than embarrassed when beating a prisoner. Soon, ${he}'s looking for an excuse to punish. ${He}'s <span class="pink">become more of a sadist.</span>`);
		} else if (FLsFetish === 2) {
			r.push(`Being not only allowed but encouraged to get off while punishing prisoners <span class="lightsalmon">deepens ${his} sadism.</span>`);
		}
		if (App.Data.Careers.Leader.wardeness.includes(S.Wardeness.career)) {
			devBonus++;
			trustMalus++;
			idleBonus++;
			r.push(`${He} has experience with detecting security issues and grinding down potential miscreants from ${his} life before ${he} was a slave, making ${him} more effective.`);
		} else if (S.Wardeness.skill.wardeness >= Constant.MASTERED_XP) {
			devBonus++;
			trustMalus++;
			idleBonus++;
			r.push(`${He} has experience with detecting security issues and grinding down potential miscreants from working for you, making ${him} more effective.`);
		} else {
			const skillIncrease = random(1, Math.ceil((S.Wardeness.intelligence + S.Wardeness.intelligenceImplant) / 15) + 8);
			r.push(slaveSkillIncrease('wardeness', S.Wardeness, skillIncrease));
		}
		if (S.Wardeness.fetish === Fetish.SADIST) {
			r.push(`${He} uses the prisoners to gratify ${his} sadism, terrifying them and quickly breaking their resistance.`);
		} else if (S.Wardeness.energy > 95) {
			r.push(`${He} is so sexually depraved that ${he} constantly molests the prisoners, breaking them to a life of servitude.`);
		}
		if (S.Wardeness.sexualFlaw === SexualFlaw.MALICIOUS || S.Wardeness.sexualFlaw === SexualFlaw.ABUSIVE) {
			devBonus++;
			trustMalus += 2;
			idleBonus += 2;
			r.push(`Sexual abuse of prisoners has become an end for ${him}, not a means. ${He} inspires ${his} prisoners to do everything possible to qualify to get away from ${him}, even as ${he} slowly grinds away their interest in sex to do it.`);
		} else if (S.Wardeness.sexualQuirk === SexualQuirk.CARING) {
			devBonus--;
			trustMalus--;
			idleBonus--;
			r.push(`${His} kindness sometimes shows through ${his} tough façade, letting prisoners get off easier than they should.`);
		}
		if (S.Wardeness.dick > 2 && canPenetrate(S.Wardeness)) {
			devBonus++;
			trustMalus++;
			idleBonus++;
			r.push(`${His} molestation of the prisoners is more varied and effective because ${he} has a dick to fuck them with.`);
			slaveSkillIncrease('penetrative', S.Wardeness, 2);
		}
		if (S.Wardeness.muscles > 35) {
			devBonus++;
			trustMalus++;
			idleBonus++;
			r.push(`${He} is strong enough to restrain anyone that tries anything with ${his} own hands.`);
		}
		if (S.Wardeness.devotion > 95) {
			devBonus++;
			trustMalus++;
			idleBonus++;
			r.push(`${His} devotion to you is so absolute that ${he} sees breaking bitches for your service as a noble calling.`);
		}
		const pMod = App.SlaveAssignment.PartTime.efficiencyModifier(S.Wardeness);
		devBonus *= pMod;
		trustMalus *= pMod;
		idleBonus *= pMod;
		if (pMod < 1) {
			r.push(`Some part of ${his} day is taken up by ${his} part-time job, making ${him} less effective.`);
		}
		App.Events.addNode(beforeFrag, r, "div", "indent");

		for (const slave of slaves) {
			r = [];
			if (S.Wardeness.rivalryTarget === slave.ID) {
				r.push(`${He} greatly enjoys breaking ${his} ${rivalryTerm(S.Wardeness)}, ${slave.slaveName}'s will.`);
				slave.devotion++;
				slave.trust -= 3;
				if (random(1, 100) > 30) {
					S.Wardeness.rivalry++;
					slave.rivalry++;
				}
			} else if (S.Wardeness.relationshipTarget === slave.ID) {
				r.push(`${He} hates having to break ${his} ${relationshipTerm(S.Wardeness)}, ${slave.slaveName}, but ${his} devotion to you wins out in the end.`);
				slave.devotion++;
				slave.trust -= 3;
				if (random(1, 100) >= 50) {
					r.push(`${His} and ${slave.slaveName}'s relationship has been shattered by these events.`);
					S.Wardeness.relationship = 0;
					S.Wardeness.relationshipTarget = 0;
					slave.relationship = 0;
					slave.relationshipTarget = 0;
				}
			} else if (areRelated(S.Wardeness, slave)) {
				const {he2, his2} = getPronouns(slave).appendSuffix("2");
				r.push(`${He} shows ${his} ${relativeTerm(S.Wardeness, slave)} ${slave.slaveName} no mercy, making sure ${he2} understands ${his2} place.`);
				slave.devotion++;
				slave.trust--;
			}
			App.Events.addNode(beforeFrag, r, "div", "indent");
		}
		if (slaves.length < V.cellblock && !slaveResting(S.Wardeness)) {
			const seed = random(1, 10) + ((V.cellblock - slaves.length) * (random(150, 170) + (idleBonus * 10)));
			cashX(seed, "cellblock", S.Wardeness);
			App.Events.addNode(beforeFrag, [`Since ${he} doesn't have enough prisoners to manage to keep ${him} busy, ${he} works on citizens' slaves, earning <span class="yellowgreen"> ${cashFormat(seed)}.</span>`], "div", "indent");
		}
	}

	if (slaves.length > 0) {
		if (slaves.length === 1) {
			App.UI.DOM.appendNewElement("div", beforeFrag, `One slave is being confined in ${V.cellblockName} until they are willing to obey.`, "indent");
		} else {
			App.UI.DOM.appendNewElement("div", beforeFrag, `${slaves.length} slaves are being confined in ${V.cellblockName} until they are willing to obey.`, "indent");
		}
	}

	/** @type {Array<FC.EndWeek.SlaveReport>} */
	const slaveReports = [];

	if (S.Wardeness) {
		const slave = App.SlaveAssignment.reportSlave(S.Wardeness);
		tired(slave);
		/* apply following SA passages to facility leader */
		if (V.showEWD !== 0 || (V.favSeparateReport === 1 && V.favorites.includes(slave.ID))) {
			const wardenessEntry = App.UI.DOM.appendNewElement("div", beforeFrag, '', "slave-report");
			const artSpan = App.UI.DOM.appendNewElement("span", wardenessEntry);
			wardenessEntry.append(App.SlaveAssignment.saSlaveIntro(slave, `is serving as the Wardeness in ${V.cellblockName}.`));
			wardenessEntry.append(App.SlaveAssignment.standardSlaveReport(slave, false));
			App.SlaveAssignment.appendSlaveArt(artSpan, slave);
			slaveReports.push({
				id: slave.ID,
				report: wardenessEntry
			});
		} else {
			App.SlaveAssignment.standardSlaveReport(slave, true);
		}
	}

	for (const slave of App.SlaveAssignment.reportSlaves(slaves)) {
		const {He} = getPronouns(slave);
		if (slave.devotion <= 20) {
			if (slave.trust >= -20) {
				if (
					(slave.hears === -1 && slave.earwear !== "hearing aids") ||
					(slave.hears === 0 && slave.earwear === "muffling ear plugs") ||
					(slave.hears === -2)
				) {
					slave.devotion -= 2;
					slave.trust -= 2;
				} else {
					slave.devotion -= 4;
					slave.trust -= 4;
				}
			} else {
				slave.devotion++;
			}
		}
		switch (V.cellblockDecoration) {
			case "Paternalist":
				slave.rules.living = "normal";
				if (slave.inflation > 0) {
					deflate(slave);
				}
				break;
			case "Pastoralist":
				slave.rules.living = "spare";
				if (slave.inflation === 0) {
					if (slave.pregKnown === 0 && slave.bellyImplant < 1500) {
						slave.inflation = 2;
						slave.inflationType = InflationLiquid.MILK;
						slave.inflationMethod = 1;
					} else {
						slave.inflation = 1;
						slave.inflationType = InflationLiquid.MILK;
						slave.inflationMethod = 1;
					}
					SetBellySize(slave);
				}
				break;
			case "Hedonistic":
				slave.rules.living = "spare";
				if (slave.weight < 200) {
					if (slave.weightDirection === 1) {
						slave.weight += 5;
					} else if (slave.weightDirection === -1) {
						slave.weight += 1;
					} else {
						slave.weight += 3;
					}
				}
				if (slave.muscles > -100) {
					slave.muscles -= 2;
				}
				if (slave.inflation === 0) {
					if (slave.pregKnown === 0 && slave.bellyImplant < 1500) {
						slave.inflation = 3;
						slave.inflationType = InflationLiquid.FOOD;
						slave.inflationMethod = 1;
					} else {
						slave.inflation = 1;
						slave.inflationType = InflationLiquid.FOOD;
						slave.inflationMethod = 1;
					}
					SetBellySize(slave);
				}
				break;
			default:
				slave.rules.living = "spare";
				if (slave.inflation > 0) {
					deflate(slave);
				}
		}
		if (V.cellblockUpgrade === 1) {
			if (slave.behavioralFlaw !== BehavioralFlaw.NONE && slave.behavioralQuirk === BehavioralQuirk.NONE) {
				SoftenBehavioralFlaw(slave);
				slave.devotion -= 10;
				softenedQuirks++;
			} else if (slave.sexualFlaw !== SexualFlaw.NONE && slave.sexualQuirk === SexualQuirk.NONE) {
				SoftenSexualFlaw(slave);
				slave.devotion -= 10;
				softenedQuirks++;
			}
		}
		slave.devotion += devBonus;
		slave.trust -= trustMalus;
		if (S.Wardeness && S.Wardeness.sexualFlaw === SexualFlaw.MALICIOUS && slave.energy >= 2) {
			slave.energy -= 2;
		}
		if (slave.health.condition < -80) {
			improveCondition(slave, 20);
		} else if (slave.health.condition < -40) {
			improveCondition(slave, 15);
		} else if (slave.health.condition < 0) {
			improveCondition(slave, 10);
		} else if (slave.health.condition < 40) {
			improveCondition(slave, 7);
		} else if (slave.health.condition < 100) {
			improveCondition(slave, 3);
		}

		if (V.showEWD || (V.favSeparateReport === 1 && V.favorites.includes(slave.ID))) {
			const slaveEntry = App.UI.DOM.makeElement("div", null, ["slave-report"]);
			const artSpan = App.UI.DOM.appendNewElement("span", slaveEntry);
			slaveEntry.append(App.SlaveAssignment.saSlaveIntro(slave, `is confined in ${V.cellblockName}.`));

			confinedResults = App.SlaveAssignment.stayConfined(slave);
			App.Events.addNode(slaveEntry, [He, confinedResults.text], "div", "indent");
			if (confinedResults.broken) {
				brokenSlaves++;
				continue; // slave has been reassigned; remaining report will run at her new assignment
			}
			slaveEntry.append(App.SlaveAssignment.standardSlaveReport(slave, false));
			App.SlaveAssignment.appendSlaveArt(artSpan, slave);

			slaveReports.push({
				id: slave.ID,
				report: slaveEntry,
			});
		} else {
			// discard return values silently
			confinedResults = App.SlaveAssignment.stayConfined(slave);
			if (confinedResults.broken) {
				brokenSlaves++;
				continue; // slave has been reassigned; remaining report will run at her new assignment
			}
			App.SlaveAssignment.standardSlaveReport(slave, true);
		}
	}

	const afterFrag = new DocumentFragment();

	if (softenedQuirks || brokenSlaves) {
		r = [];
		if (softenedQuirks > 0) {
			r.push(`${cellblockNameCaps}'s advanced compliance systems successfully softened`);
			if (softenedQuirks === 1) {
				r.push(`one slave's mental flaw into an <span class="green">appealing quirk,</span> though the constant correction caused them <span class="mediumorchid">considerable anguish.</span>`);
			} else {
				r.push(`${softenedQuirks} slaves' mental flaws into <span class="green">appealing quirks,</span> though the constant correction caused them <span class="mediumorchid">considerable anguish.</span>`);
			}
		}
		if (brokenSlaves > 0) {
			if (brokenSlaves === 1) {
				r.push(`One slave is now willing to <span class="hotpink">do as they're told</span> and has been released.`);
			} else {
				r.push(`${brokenSlaves} slaves are now willing to <span class="hotpink">do as they're told</span> and have been released.`);
			}
			if (V.cellblockDecoration !== "standard") {
				App.Events.addNode(afterFrag, r, "p", "indent");
				r = [];
				r.push(`${cellblockNameCaps}'s ${V.cellblockDecoration} atmosphere <span class="hotpink">had an impact on them while they were</span> imprisoned.`);
			}
		}
		App.Events.addNode(afterFrag, r, "p", "indent");
	}
	App.EndWeek.saVars.flSex = new Set();

	return {
		before: beforeFrag,
		slaves: slaveReports,
		after: afterFrag,
	};
};
