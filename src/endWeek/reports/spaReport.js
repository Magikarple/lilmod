/**
 * @returns {FC.EndWeek.FacilityReport}
 */
App.EndWeek.spaReport = function() {
	const beforeFrag = new DocumentFragment();
	let r;

	const slaves = App.Utils.sortedEmployees(App.Entity.facilities.spa);
	let healthBonus = 0;
	let restedSlaves = 0;
	let restedSlave;
	let devBonus = (V.spaDecoration !== "standard") ? 1 : 0;

	App.EndWeek.saVars.flSex = App.EndWeek.getFLSex(App.Entity.facilities.spa);

	if (S.Attendant) {
		let idleBonus = 0;
		let bonusToggle = 0;
		let FLsFetish = 0;
		r = [];

		if (S.Attendant.health.condition < 100) {
			improveCondition(S.Attendant, normalRandInt(20));
		}
		if (S.Attendant.devotion <= 60) {
			S.Attendant.devotion++;
		}
		if (S.Attendant.trust < 60) {
			S.Attendant.trust++;
		}
		if (S.Attendant.rules.living !== "luxurious") {
			S.Attendant.rules.living = "luxurious";
		}
		if (S.Attendant.fetishStrength <= 95) {
			if (S.Attendant.fetish !== Fetish.SUBMISSIVE) {
				if (fetishChangeChance(S.Attendant) > random(0, 100)) {
					FLsFetish = 1;
					S.Attendant.fetishKnown = 1;
					S.Attendant.fetish = Fetish.SUBMISSIVE;
					S.Attendant.fetishStrength = 10;
				}
			} else if (S.Attendant.fetishKnown === 0) {
				FLsFetish = 1;
				S.Attendant.fetishKnown = 1;
			} else {
				FLsFetish = 2;
				S.Attendant.fetishStrength += 4;
			}
		}
		if (S.Attendant.fetish === Fetish.NONE || S.Attendant.fetish === Fetish.SUBMISSIVE) {
			devBonus++;
		}
		S.Attendant.devotion += devBonus;
		const {
			He, His,
			he, his, him, himself, wife
		} = getPronouns(S.Attendant);
		const popup = App.UI.DOM.slaveDescriptionDialog(S.Attendant, SlaveFullName(S.Attendant));
		popup.classList.add("slave-name", "bold");
		r.push(popup, `is serving as the spa attendant.`);
		if (S.Attendant.relationship === -3 && S.Attendant.devotion > 50) {
			r.push(`${He} tries ${his} best to be your perfect attentive, caring and loving ${wife}.`);
		}
		if (FLsFetish === 1) {
			r.push(`When ${he} is paid a visit by a slave with sexual issues to work out, ${he} provides them with an understanding, willing, giving partner. ${He} finds real satisfaction in helping your slaves find sexual gratification, and <span class="lightsalmon">becomes a submissive.</span>`);
		} else if (FLsFetish === 2) {
			r.push(`Every new slave in the spa is a new person ${he} gets to connect with and serve. Sexually. <span class="lightsalmon">${He} becomes more submissive.</span>`);
		}
		if (App.Data.Careers.Leader.attendant.includes(S.Attendant.career)) {
			r.push(`${He} has experience with counseling from ${his} life before ${he} was a slave, making ${him} better at building rapport with troubled slaves, and giving ${him} a better chance of softening flaws into beneficial quirks.`);
			bonusToggle = 1;
			idleBonus++;
		} else if (S.Attendant.skill.attendant >= Constant.MASTERED_XP) {
			r.push(`${He} has experience with counseling from working for you, making ${him} better at building rapport with troubled slaves, and giving ${him} a better chance of softening flaws into beneficial quirks.`);
			bonusToggle = 1;
			idleBonus++;
		} else {
			const skillIncrease = random(1, Math.ceil((S.Attendant.intelligence + S.Attendant.intelligenceImplant) / 15) + 8);
			r.push(slaveSkillIncrease('attendant', S.Attendant, skillIncrease));
		}
		if (!canSee(S.Attendant)) {
			r.push(`${His} blindness allows ${him} to deeply connect with ${his} charges.`);
			idleBonus++;
		}
		if (S.Attendant.fetish === Fetish.NONE) {
			r.push(`${S.Attendant.slaveName} respects the slaves lounging in the spa, allowing them to relax completely.`);
			idleBonus++;
		} else if (S.Attendant.fetish === Fetish.SUBMISSIVE) {
			r.push(`${S.Attendant.slaveName} lets the slaves resting in the spa take the lead sexually, doing ${his} best to please them.`);
			idleBonus++;
		} else if (S.Attendant.fetishKnown === 1) {
			r.push(`${S.Attendant.slaveName} can't keep ${his} ${hasBothArms(S.Attendant) ? `hands` : `hand`} to ${himself}, preventing the slaves in the spa from relaxing completely.`);
		}
		if (S.Attendant.visualAge > 35) {
			r.push(`${His} apparent maturity encourages the slaves in the spa to relax and pour out their troubles to ${him}.`);
			healthBonus++;
			idleBonus++;
		}
		if (S.Attendant.intelligence + S.Attendant.intelligenceImplant > 15) {
			r.push(`${He}'s so intelligent ${he} can suss out the cause of slaves' emotional issues and counsel them effectively.`);
			idleBonus++;
		}
		if (isFertile(S.Attendant) || (S.Attendant.bellyPreg >= 1500) || (S.Attendant.counter.birthsTotal > 0) || (S.Attendant.bellyImplant >= 1500)) {
			r.push(`${He} has a natural mothering instinct and really makes ${his} charges feel at home.`);
			idleBonus++;
			healthBonus++;
		}
		let attendantUsedCure = false;
		App.Events.addNode(beforeFrag, r, "div", "indent");
		r = [];
		const softenFlawBonus = bonusToggle ? 10 : 0;
		for (const slave of slaves) {
			const {he2, his2, him2} = getPronouns(slave).appendSuffix("2");
			if (slave.fetish === Fetish.MINDBROKEN && slave.health.condition > 20 && !attendantUsedCure && V.spaFix !== 2) {
				attendantUsedCure = true;
				if (random(1, 100) > 90 - S.Attendant.devotion) {
					const curedSlave = App.UI.DOM.makeElement("div", null, "indent");
					const curedArray = [`<span class="green">Something almost miraculous has happened.</span> ${S.Attendant.slaveName} has always refused to believe that ${slave.slaveName} could not be reached, and has lavished patient tenderness on ${him2} in ${V.spaName}. ${slave.slaveName} has begun to respond, and is stirring from ${his2} mental torpor.`];
					slave.devotion = -15;
					slave.sexualFlaw = SexualFlaw.APATHETIC;
					slave.behavioralFlaw = either(BehavioralFlaw.HATESMEN, BehavioralFlaw.ODD);
					slave.fetish = Fetish.NONE;
					slave.fetishKnown = 1;
					const gp = V.genePool.find(s => s.ID === slave.ID);
					if (gp.intelligence >= -95) {
						slave.intelligence = gp.intelligence - 30;
					}
					if (FutureSocieties.isActive('FSPaternalist') && V.arcologies[0].FSPaternalist > 0) {
						curedArray.push(`Society <span class="green">strongly approves</span> of ${slave.slaveName} being restored to sanity, which advances ideals about enlightened slaveownership.`);
						V.arcologies[0].FSPaternalist += 0.01 * V.FSSingleSlaveRep;
						repX(2 * V.FSSingleSlaveRep * (V.arcologies[0].FSPaternalist / V.FSLockinLevel), "spa", slave);
					}
					App.Events.addNode(curedSlave, curedArray);
					r.push(curedSlave);
				}
			}
			if (bonusToggle === 1 && slave.trust < 60) {
				slave.trust++;
			}
			if (S.Attendant.rivalryTarget === slave.ID) {
				r.push(`${He} constantly harasses ${his} ${rivalryTerm(S.Attendant)}, ${slave.slaveName}, preventing ${him2} from getting comfortable and forcing ${him2} to keep ${his2} guard up.`);
				slave.devotion -= 4;
				slave.trust -= 4;
				if (random(1, 100) > 35) {
					S.Attendant.rivalry++;
					slave.rivalry++;
				}
			} else if (S.Attendant.relationshipTarget === slave.ID) {
				r.push(`${He} dedicates most of ${his} attention to ${his} ${relationshipTerm(S.Attendant)}, ${slave.slaveName}, making ${his2} stress, both physical and mental, wash away.`);
				slave.devotion += 3;
				slave.trust += 3;
			} else if (areRelated(S.Attendant, slave)) {
				r.push(`${He} makes sure to spend extra time caring for ${his} ${relativeTerm(S.Attendant, slave)}, ${slave.slaveName}.`);
				slave.trust++;
				improveCondition(slave, 1);
			}
			switch (slave.prestigeDesc) {
				case "$He is a famed Free Cities whore, and commands top prices.":
					r.push(`${He} does ${his} best to relax the famous whore,${slave.slaveName}, making sure to`);
					if (slave.vagina > 2 || slave.anus > 2) {
						r.push(`pay special attention to ${his2} worn holes.`);
					} else {
						r.push(`get ${him2} clean and relaxed for ${his2} next usage.`);
					}
					slave.devotion += 3;
					slave.trust += 3;
					break;
				case "$He is a famed Free Cities slut, and can please anyone.":
					r.push(`${He} does ${his} best to soothe the famous entertainer, ${slave.slaveName}, letting ${him2} relax in blissful peace.`);
					slave.devotion += 3;
					slave.trust += 3;
					break;
				case "$He is remembered for winning best in show as a cockmilker.":
					if (slave.balls > 6 && slave.dick !== 0) {
						if (S.Attendant.fetish === Fetish.CUMSLUT) {
							r.push(`${He} can't keep ${his} ${hasBothArms(S.Attendant) ? `hands` : `hand`} off ${slave.slaveName}'s cock and balls, but ${he2} doesn't mind being milked constantly. Before long, strands of cum can be found floating all throughout the bath.`);
							S.Attendant.fetishStrength += 4;
						} else {
							r.push(`${He} does ${his} best to accommodate ${slave.slaveName}'s massive genitals and tends to ${him2} whenever ${he2} feels a need for release.`);
							if (random(1, 100) > 65 && S.Attendant.fetish === Fetish.NONE) {
								r.push(`After taking several massive loads to the face, ${S.Attendant.slaveName} begins to find satisfaction in being coated in cum.`);
								S.Attendant.fetish = Fetish.CUMSLUT;
							}
						}
					}
					slave.devotion += 3;
					slave.trust += 3;
					break;
				case "$He is remembered for winning best in show as a dairy cow.":
					if (slave.lactation > 0 && (slave.boobs - slave.boobsImplant) > 6000) {
						if (S.Attendant.fetish === Fetish.BOOBS) {
							r.push(`${He} can't keep ${his} ${hasBothArms(S.Attendant) ? `hands` : `hand`} off ${slave.slaveName}'s huge breasts, but ${he2} doesn't mind being milked constantly. Before long the bath gains a white tint.`);
							S.Attendant.fetishStrength += 4;
							S.Attendant.fetishStrength += 4;
						} else {
							r.push(`${He} does ${his} best to accommodate ${slave.slaveName}'s massive breasts and tends to ${him2} whenever ${he2} feels a need for release.`);
							if (random(1, 100) > 65 && S.Attendant.fetish === Fetish.NONE) {
								r.push(`After multiple milking sessions, ${S.Attendant.slaveName} begins to find ${himself} fantasizing about having giant milky breasts too.`);
								S.Attendant.fetish = Fetish.BOOBS;
							}
						}
						slave.devotion += 3;
						slave.trust += 3;
						slave.lactationDuration = 2;
						slave.boobs -= slave.boobsMilk;
						slave.boobsMilk = 0;
					}
					break;
				case "$He is remembered for winning best in show as a breeder.":
					if (slave.bellyPreg >= 5000) {
						if (S.Attendant.fetish === Fetish.PREGNANCY) {
							r.push(`${He} can't keep ${his} ${hasBothArms(S.Attendant) ? `hands` : `hand`} off ${slave.slaveName}'s pregnancy, but ${he2} doesn't mind ${his2} full belly being fondled.`);
							S.Attendant.fetishStrength += 4;
							S.Attendant.fetishStrength += 4;
						} else {
							r.push(`${He} does ${his} best to accommodate ${slave.slaveName}'s pregnancy and to make sure the mother-to-be is happy and comfortable.`);
							if (random(1, 100) > 65 && S.Attendant.fetish === Fetish.NONE) {
								r.push(`After massaging ${slave.slaveName}'s growing belly multiple times, ${S.Attendant.slaveName} begins to find ${himself} fantasizing about being swollen with life too.`);
								S.Attendant.fetish = Fetish.PREGNANCY;
							}
						}
						slave.devotion += 3;
						slave.trust += 3;
					} else {
						if (S.Attendant.fetish === Fetish.PREGNANCY) {
							r.push(`${He} can't help but pester ${slave.slaveName} with questions about ${his2} famous pregnancy, limiting ${his2} ability to truly relax.`);
							slave.devotion += 1;
							slave.trust += 1;
						} else if (canGetPregnant(slave)) {
							r.push(`${He} does ${his} best to encourage ${slave.slaveName}'s fertilization by performing any fertility boosting actions ${he} can.`);
							slave.devotion += 3;
							slave.trust += 3;
						}
					}
			}
			if (
				!attendantUsedCure &&
				(S.Attendant.intelligence + S.Attendant.intelligenceImplant > 15) &&
				(S.Attendant.intelligence + S.Attendant.intelligenceImplant + softenFlawBonus) > random(1, 200) &&
				(V.spaFix === 0)
			) {
				if (slave.behavioralFlaw !== BehavioralFlaw.NONE) {
					SoftenBehavioralFlaw(slave);
					attendantUsedCure = true;
					r.push(`${S.Attendant.slaveName} works carefully with ${slave.slaveName}, and successfully`);
					r.push(App.UI.DOM.makeElement("span", `softens ${his2} behavioral flaw`, "green"));
					r.push(`into an appealing quirk.`);
				} else if (slave.sexualFlaw !== SexualFlaw.NONE) {
					SoftenSexualFlaw(slave);
					attendantUsedCure = true;
					r.push(`${S.Attendant.slaveName} works carefully with ${slave.slaveName}, and successfully`);
					r.push(App.UI.DOM.makeElement("span", `softens ${his2} sexual flaw`, "green"));
					r.push(`into an appealing quirk.`);
				}
			}
			if (slave.lactation > 0) {
				r.push(`${S.Attendant.slaveName} takes care to keep ${slave.slaveName}'s breasts comfortably drained.`);
				slave.lactationDuration = 2;
				slave.boobs -= slave.boobsMilk;
				slave.boobsMilk = 0;
			}
			App.Events.addNode(beforeFrag, r, "div", "indent");
			r = [];
		}

		const pMod = App.SlaveAssignment.PartTime.efficiencyModifier(S.Attendant);
		idleBonus *= pMod;
		if (pMod < 1) {
			r.push(`Some part of ${his} day is taken up by ${his} part-time job, making ${him} less effective.`);
		}

		if (slaves.length < V.spa) {
			const seed = Math.ceil(random(1, 10) + ((V.spa - slaves.length) * (random(150, 170) + (idleBonus * 10))));
			cashX(seed, "spa", S.Attendant);
			r.push(`Since ${he} doesn't have enough slaves to occupy all ${his} time, the spa takes in citizens' slaves on a contract basis and ${he} helps them too, earning <span class="yellowgreen"> ${cashFormat(seed)}.</span>`);
			if (V.arcologies[0].FSHedonisticDecadence > 0 && slaves.length === 0) {
				r.push(`Society <span class="green">loves</span> being allowed to lounge in your spa, greatly advancing your laid back culture.`);
				FutureSocieties.Change("Hedonistic", 2);
			}
		}
		if (r.length > 0) {
			App.Events.addNode(beforeFrag, r, "div", "indent");
		}
	}

	if (slaves.length > 0) {
		r = [];
		if (slaves.length > 1) {
			r.push(`There are ${slaves.length} slaves`);
		} else {
			r.push(`There is one slave`);
		}
		r.push(`resting and recuperating in the spa.`);
		App.Events.addNode(beforeFrag, r, "p", ["indent", "bold"]);
	}

	if (App.EndWeek.saVars.poolJizz > ((S.Attendant && canSee(S.Attendant)) ? 5000 : 1000)) {
		r.push(`The filters${S.Attendant ? ` and ${S.Attendant.slaveName}` : ""} have been overwhelmed by the sheer quantity of resilient sperm swimming around in the pool.`);
		if (V.seePreg) {
			 r.push(`Any woman that enters these fertile waters is liable to be gifted with new life.`);
		}
		App.Events.addNode(beforeFrag, r, "div", "indent");
	}

	/** @type {Array<FC.EndWeek.SlaveReport>} */
	const slaveReports = [];

	if (S.Attendant) {
		const slave = App.SlaveAssignment.reportSlave(S.Attendant);
		tired(slave);
		if (isFertile(slave) && slave.preg !== -1 && App.EndWeek.saVars.poolJizz > (canSee(S.Attendant) ? 5000 : 1000)) { // Free swimming sperm do not respect chastity and the Attendant cannot avoid going in the pool.
			const spermAtt = weightedRandom(App.EndWeek.saVars.poolJizzers);
			if (canBreed(slave, getSlave(spermAtt.ID))) {
				knockMeUp(slave, 25, 2, spermAtt.ID);
			}
		}
		/* apply following SA passages to facility leader */
		if (V.showEWD !== 0 || (V.favSeparateReport === 1 && V.favorites.includes(slave.ID))) {
			const attendantEntry = App.UI.DOM.makeElement("div", '', ["slave-report"]);
			const artSpan = App.UI.DOM.appendNewElement("span", attendantEntry);
			attendantEntry.append(App.SlaveAssignment.saSlaveIntro(slave, `is serving as the Attendant in ${V.spaName}.`));
			attendantEntry.append(App.SlaveAssignment.standardSlaveReport(slave, false));
			App.SlaveAssignment.appendSlaveArt(artSpan, slave);
			slaveReports.push({
				id: slave.ID,
				report: attendantEntry
			});
		} else {
			App.SlaveAssignment.standardSlaveReport(slave, true);
		}
	}

	for (const slave of App.SlaveAssignment.reportSlaves(slaves)) {
		const {He, he, his, him} = getPronouns(slave);
		slave.devotion += devBonus;
		improveCondition(slave, 5 + healthBonus);
		if (slave.health.condition < -80) {
			improveCondition(slave, 15);
		} else if (slave.health.condition < -40) {
			improveCondition(slave, 10);
		} else if (slave.health.condition < 0) {
			improveCondition(slave, 5);
		}
		if (V.spaUpgrade === 1 && slave.health.condition < 100) {
			improveCondition(slave, normalRandInt(8));
		}
		if (slave.devotion < 60 && slave.trust < 60) {
			slave.devotion++;
			slave.trust++;
		} else if (slave.trust < 40) {
			if (slave.geneMods.aggressiveSperm === 1 && isVirile(slave) && S.Attendant && V.spaAggroSpermBan === 1) {
				slave.trust += 5;
			} else {
				slave.trust += 10;
			}
		} else if (slave.devotion < 40) {
			if (slave.geneMods.aggressiveSperm === 1 && isVirile(slave) && S.Attendant && V.spaAggroSpermBan === 1) {
				slave.devotion += 5;
			} else {
				slave.devotion += 10;
			}
		}
		if (App.EndWeek.saVars.poolJizz > ((S.Attendant && canSee(S.Attendant)) ? 5000 : 1000) && (V.spaAggroSpermBan === 0 || slave.breedingMark === 0)) { // 0 breeds all, 1 doesn't reach here, and 2 fails if .breedingMark is 0.
			if (slave.fetish === Fetish.CUMSLUT && (canSee(slave) || canTaste(slave) || canSmell(slave))) {
				slave.devotion++;
			}
			if (isFertile(slave) && slave.preg !== -1) { // Free swimming sperm do not respect chastity.
				const spermSlave = weightedRandom(App.EndWeek.saVars.poolJizzers);
				if (canBreed(slave, getSlave(spermSlave.ID))) {
					knockMeUp(slave, 25, 2, spermSlave.ID);
				}
				if (slave.sexualFlaw === SexualFlaw.BREEDER && (canSee(slave) || canTaste(slave) || canSmell(slave))) {
					slave.devotion++;
				}
			}
		}
		switch (V.spaDecoration) {
			case "Chattel Religionist":
			case "Chinese Revivalist":
				slave.rules.living = "normal";
				break;
			case "Degradationist":
				slave.rules.living = "spare";
				break;
			default:
				slave.rules.living = "luxurious";
		}
		if (slave.health.condition >= 20 && slave.health.tired <= 30 && slave.trust > 60 && slave.devotion > 60 && slave.fetish !== Fetish.MINDBROKEN && (V.spaFix === 2 || (slave.sexualFlaw === SexualFlaw.NONE && slave.behavioralFlaw === BehavioralFlaw.NONE))) {
			const slaveFixed = App.UI.DOM.makeElement("p");
			App.Events.addNode(
				slaveFixed,
				[
					App.UI.DOM.makeElement("span", slave.slaveName, "slave-name"),
					`is feeling well enough to leave ${V.spaName}, `
				]
			);
			r = [];
			if (V.assignmentRecords[slave.ID]) {
				const oldJob = V.assignmentRecords[slave.ID];
				assignJobSafely(slave, oldJob);
				if (slave.choosesOwnAssignment === 1) {
					r.push(`and ${he} is resting before choosing another task.`);
				} else if (slave.assignment === Job.REST) {
					if (oldJob !== Job.REST) {
						r.push(`and since ${he} was unable to return to ${his} old task to ${oldJob}, ${his} assignment has defaulted to rest.`);
					} else {
						r.push(`so ${he} has returned to rest.`);
					}
				} else {
					r.push(`so ${he} goes back to ${slave.assignment}.`);
				}
			} else {
				r.push(`so ${his} assignment has defaulted to rest.`);
				removeJob(slave, Job.SPA);
			}
			App.Events.addNode(slaveFixed, r, "span", "noteworthy");
			beforeFrag.append(slaveFixed);
			restedSlaves++;
			restedSlave = slave;
			continue;
		}

		if (V.showEWD !== 0 || (V.favSeparateReport === 1 && V.favorites.includes(slave.ID))) {
			const slaveEntry = App.UI.DOM.makeElement("div", null, ["slave-report"]);
			const artSpan = App.UI.DOM.appendNewElement("span", slaveEntry);
			slaveEntry.append(App.SlaveAssignment.saSlaveIntro(slave, `is resting in ${V.spaName}.`));

			r = [];
			r.push(He);
			r.push(App.SlaveAssignment.rest(slave));

			if (slave.fetish === Fetish.MINDBROKEN) {
				r.push(`${He} remains in the Spa, completely mindbroken.`);
			} else if (slave.sexualFlaw !== SexualFlaw.NONE || slave.behavioralFlaw !== BehavioralFlaw.NONE) {
				r.push(`${He} remains in the Spa, stubborn in ${his} flaw.`);
			} else if (slave.trust < 60 || slave.devotion < 60) {
				r.push(`${He} remains in the Spa, as ${he} is still learning to accept life as a slave.`);
				if (slave.geneMods.aggressiveSperm === 1 && isVirile(slave) && S.Attendant && V.spaAggroSpermBan === 1) {
					if (slave.devotion < 40 || slave.trust < 40) {
						r.push(`${He} wishes ${S.Attendant.slaveName} would allow ${him} to enjoy the main pool.`);
					}
				}
			} else if (slave.health.condition < 20) {
				r.push(`${He} remains in the Spa, as ${he} is benefiting from its healing properties.`);
			} else if (slave.health.tired > 30) {
				r.push(`${He} remains in the Spa, continuing to soak away ${his} fatigue.`);
			}
			App.Events.addNode(slaveEntry, r, "div", "indent");
			slaveEntry.append(App.SlaveAssignment.standardSlaveReport(slave, false));
			App.SlaveAssignment.appendSlaveArt(artSpan, slave);

			slaveReports.push({
				id: slave.ID,
				report: slaveEntry,
			});
		} else {
			// discard return values silently
			App.SlaveAssignment.rest(slave);
			App.SlaveAssignment.standardSlaveReport(slave, true);
		}
	}

	const afterFrag = new DocumentFragment();

	if (restedSlaves > 0) {
		const {he, him} = getPronouns(restedSlave);
		r = [];
		if (restedSlaves === 1) {
			r.push(`One slave has rested until ${he} reached a state of <span class="hotpink">devotion</span> and <span class="mediumaquamarine">trust</span> and will leave the spa before the end of the week.`);
		} else {
			r.push(`${restedSlaves} slaves have rested until they reached a state of <span class="hotpink">devotion</span> and <span class="mediumaquamarine">trust</span> and will leave the spa before the end of the week.`);
		}
		App.Events.addNode(afterFrag, r, "p", "indent");
		if (V.spaDecoration !== "standard") {
			r = [];
			r.push(`${capFirstChar(V.spaName)}'s ${V.spaDecoration} atmosphere <span class="hotpink">had an impact on`);
			if (restedSlaves === 1) {
				r.push(`${him} while ${he} was`);
			} else {
				r.push(`them while they were`);
			}
			r.push(`</span> resting.`);
			App.Events.addNode(afterFrag, r, "p", "indent");
		}
	}

	App.EndWeek.saVars.flSex = new Set();

	return {
		before: beforeFrag,
		slaves: slaveReports,
		after: afterFrag,
	};
};
