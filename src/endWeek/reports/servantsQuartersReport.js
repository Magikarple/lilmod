/**
 * @returns {FC.EndWeek.FacilityReport}
 */
App.EndWeek.servantsQuartersReport = function() {
	const beforeFrag = new DocumentFragment();

	const slaves = App.Utils.sortedEmployees(App.Entity.facilities.servantsQuarters);
	const devBonus = (V.servantsQuartersDecoration !== "standard") ? 1 : 0;
	let stewardessBonus = 0;

	function stewardessText() {
		const frag = new DocumentFragment();

		let r = [];
		let FLsFetish = 0;
		let stewardessImpregnated = 0;
		let stewardessTookVirginity = 0;

		if (S.Stewardess) {
			S.Stewardess.devotion += devBonus;
			if (S.Stewardess.health.condition < -80) {
				improveCondition(S.Stewardess, 20);
			} else if (S.Stewardess.health.condition < -40) {
				improveCondition(S.Stewardess, 15);
			} else if (S.Stewardess.health.condition < 0) {
				improveCondition(S.Stewardess, 10);
			} else if (S.Stewardess.health.condition < 90) {
				improveCondition(S.Stewardess, 7);
			}
			if (S.Stewardess.devotion <= 60) {
				S.Stewardess.devotion++;
			}
			if (S.Stewardess.trust < 60) {
				S.Stewardess.trust++;
			}
			if (S.Stewardess.fetishStrength <= 95) {
				if (S.Stewardess.fetish !== Fetish.DOM) {
					if (fetishChangeChance(S.Stewardess) > jsRandom(0, 100)) {
						FLsFetish = 1;
						S.Stewardess.fetishKnown = 1;
						S.Stewardess.fetish = Fetish.DOM;
						S.Stewardess.fetishStrength = 10;
					}
				} else if (S.Stewardess.fetishKnown === 0) {
					FLsFetish = 1;
					S.Stewardess.fetishKnown = 1;
				} else {
					FLsFetish = 2;
					S.Stewardess.fetishStrength += 4;
				}
			}
			if (S.Stewardess.rules.living !== "luxurious") {
				S.Stewardess.rules.living = "luxurious";
			}
			if (S.Stewardess.rules.rest !== "restrictive") {
				S.Stewardess.rules.rest = "restrictive";
			}

			const {He, he, His, his, him, wife} = getPronouns(S.Stewardess);
			if (S.Stewardess.relationship === -3 && S.Stewardess.devotion > 50) {
				r.push(`${He} does ${his} best to be your perfect lovely house${wife}.`);
			}
			if (V.stewardessImpregnates === 1 && canPenetrate(S.Stewardess) && S.Stewardess.pubertyXY === 1 && !slaveResting(S.Stewardess)) {
				for (const slave of slaves) {
					if (canImpreg(slave, S.Stewardess) && slave.pregKnown === 0) {
						knockMeUp(slave, 100, 2, S.Stewardess.ID);
						if (slave.mpreg === 1) {
							seX(S.Stewardess, "penetrative", slave, "anal", 10);
							if (slave.anus === 0) {
								slave.anus = 1;
								stewardessTookVirginity++;
							}
						} else {
							seX(S.Stewardess, "penetrative", slave, "vaginal", 10);
							if (slave.vagina === 0) {
								slave.vagina = 1;
								stewardessTookVirginity++;
							}
						}
						stewardessImpregnated++;
						slave.need = 0;
					}
				}
				if (stewardessImpregnated > 0) {
					r.push(`It's ${his} responsibility to keep ${his} charges pregnant, so`);
					if (stewardessImpregnated === 1) {
						r.push(`${he} cums in the only fertile slave's pussy all week.`);
					} else {
						r.push(`${he} ensures the ${stewardessImpregnated} fertile servants are full of ${his} cum at all times.`);
					}
					if (S.Stewardess.career === "a breeding bull") {
						r.push(`${He} was conditioned to fill empty wombs, so ${he} takes a <span class="devotion inc">deep pleasure</span> in ${his} job.`);
						S.Stewardess.devotion++;
					}
					if (stewardessTookVirginity > 0) {
						r.push(`${He} needed to break in`);
						if (stewardessImpregnated === 1) {
							r.push(`their hole`);
						} else {
							r.push(`several holes`);
						}
						r.push(`to be certain ${his} seed took root; a treat ${he} <span class="devotion inc">quite enjoyed.</span>`);
						S.Stewardess.devotion += stewardessTookVirginity;
					}
					S.Stewardess.need = 0;
				}
			}
			if (FLsFetish === 1) {
				r.push(`${He}'s allowed and even expected to use ${his} charges for ${his} own gratification, and sometimes they'll even instigate submissive sex with ${him} just to ingratiate themselves. ${He} becomes comfortable with the role of a <span class="lightcoral">sexual dominant.</span>`);
			} else if (FLsFetish === 2) {
				r.push(`Having a legion of servants jumping to obey ${his} daily commands <span class="lightsalmon">makes ${him} more dominant.</span>`);
			}
			if (S.Stewardess.health.condition < 10) {
				r.push(`Though ${he} tries to watch the servants, ${his} lack of good health inhibits ${him}.`);
			} else if (S.Stewardess.health.condition < 80) {
				stewardessBonus += 50;
				r.push(`${His} good health allows ${him} to work long hours and <span class="yellowgreen">drive</span> the servants hard.`);
			} else {
				stewardessBonus += 75;
				r.push(`${His} perfect health allows ${him} to work exhaustive hours and <span class="yellowgreen">drive</span> the servants very hard.`);
			}
			if (App.Data.Careers.Leader.stewardess.includes(S.Stewardess.career)) {
				stewardessBonus += 25;
				r.push(`${He} has applicable experience with daily sums and organizational trifles from ${his} life before ${he} was a slave.`);
			} else if (S.Stewardess.skill.stewardess >= Constant.MASTERED_XP) {
				stewardessBonus += 25;
				r.push(`${He} has applicable experience with daily sums and organizational trifles from working for you.`);
			} else if (S.Stewardess.skill.stewardess > 120) {
				stewardessBonus += 15;
				r.push(`${He} has picked up the skills needed to keep your servants working efficiently.`);
			} else if (S.Stewardess.skill.stewardess > 60) {
				stewardessBonus += 10;
				r.push(`${He} understands what it takes to keep your servants in line.`);
			} else if (S.Stewardess.skill.stewardess > 20) {
				stewardessBonus += 5;
				r.push(`${He} understands the basics of what it takes to keep your penthouse operational.`);
			}
			if (S.Stewardess.skill.stewardess < Constant.MASTERED_XP) {
				const skillIncrease = jsRandom(1, Math.ceil((S.Stewardess.intelligence + S.Stewardess.intelligenceImplant) / 15) + 8);
				r.push(slaveSkillIncrease('stewardess', S.Stewardess, skillIncrease));
			}
			if (S.Stewardess.actualAge > 35) {
				stewardessBonus += 25;
				r.push(`${His} age and experience give ${him} added effectiveness.`);
			} else if (V.AgePenalty === 0) {
				stewardessBonus += 25;
			}
			if (S.Stewardess.intelligence + S.Stewardess.intelligenceImplant > 15) {
				stewardessBonus += S.Stewardess.intelligence + S.Stewardess.intelligenceImplant;
				r.push(`${He}'s smart enough that ${he} misses very little.`);
			}
			stewardessBonus *= restEffects(S.Stewardess);
			const pMod = App.SlaveAssignment.PartTime.efficiencyModifier(S.Stewardess);
			stewardessBonus *= pMod;
			if (pMod < 1) {
				r.push(`Some part of ${his} day is taken up by ${his} part-time job, making ${him} less effective.`);
			}

			const bonusToggle = S.Stewardess.energy > 95 || (S.Stewardess.fetishKnown === 1 && S.Stewardess.fetish === Fetish.DOM);
			for (const slave of slaves) {
				const {he2, him2, his2} = getPronouns(slave).appendSuffix('2');
				if (S.Stewardess.rivalryTarget === slave.ID) {
					r.push(`${He} bears down on ${his} ${rivalryTerm(S.Stewardess)}, ${slave.slaveName}, forcing ${him2} to work extra hard or suffer punishment.`);
					slave.devotion--;
					slave.trust--;
					if (jsRandom(1, 100) > 65) {
						S.Stewardess.rivalry++;
						slave.rivalry++;
					}
				} else if (S.Stewardess.relationshipTarget === slave.ID) {
					r.push(`${He} dotes over ${his} ${relationshipTerm(S.Stewardess)}, ${slave.slaveName}, making sure ${he2} knows how to do a good job and keeping ${him2} well stocked with everything ${he2} needs.`);
					slave.devotion++;
				} else if (areRelated(S.Stewardess, slave)) {
					r.push(`${He} pays special attention to ${his} ${relativeTerm(S.Stewardess, slave)}, ${slave.slaveName}, making sure ${he2} doesn't slack off just because they are related.`);
					slave.trust++;
				}
				switch (slave.prestigeDesc) {
					case "$He is a famed Free Cities whore, and commands top prices.":
						r.push(`${He} does ${his} best to motivate the famous whore, ${slave.slaveName}, though ${he} is uncertain why ${he2} is here.`);
						break;
					case "$He is a famed Free Cities slut, and can please anyone.":
						r.push(`${He} ignores ${his} duties in order the fawn over the famous entertainer, ${slave.slaveName}.`);
						break;
					case "$He is remembered for winning best in show as a cockmilker.":
						if (slave.dick !== 0 && slave.balls !== 0 && slave.prostate > 1) {
							r.push(`${slave.slaveName} leaves a trail of cum wherever ${he2} goes and frequently stops to masturbate, greatly annoying ${S.Stewardess.slaveName}.`);
							if (jsRandom(1, 100) > 90 && S.Stewardess.rivalry === 0 && slave.rivalry === 0) {
								S.Stewardess.rivalryTarget = slave.ID;
								S.Stewardess.rivalry++;
								slave.rivalryTarget = S.Stewardess.ID;
								slave.rivalry++;
							}
						}
						break;
					case "$He is remembered for winning best in show as a dairy cow.":
						if (slave.lactation > 0 && (slave.boobs-slave.boobsImplant) > 6000) {
							r.push(`${slave.slaveName}'s huge breasts frequently get in the way of ${his2} work and ${he2} leaks milk everywhere, greatly annoying ${S.Stewardess.slaveName}.`);
							if (jsRandom(1, 100) > 90 && S.Stewardess.rivalry === 0 && slave.rivalry === 0) {
								S.Stewardess.rivalryTarget = slave.ID;
								S.Stewardess.rivalry++;
								slave.rivalryTarget = S.Stewardess.ID;
								slave.rivalry++;
							}
						}
						break;
					case "$He is remembered for winning best in show as a breeder.":
						if (slave.bellyPreg >= 10000) {
							r.push(`${slave.slaveName}'s big pregnant belly frequently gets in the way of ${his2} work. However, ${S.Stewardess.slaveName} is willing to overlook it, as well as allow ${him2} easy jobs, due to how valuable ${his2} womb is.`);
						}
						break;
				}
				if (bonusToggle && slave.devotion < 45) {
					slave.devotion += 5;
				}
			}
			if (slaves.length > 0) {
				if (S.Stewardess.fetishKnown === 1 && S.Stewardess.fetish === Fetish.DOM) {
					r.push(`${He} walks among the cowering servants as a queen among peasants, playing the role of a dominant to perfection and increasing ${his} charges' <span class="hotpink">obedience.</span>`);
				} else if (S.Stewardess.energy > 95) {
					r.push(`${He} walks among the cowering servants looking for an excuse to extract sex from shirkers as <span class="hotpink">punishment.</span>`);
				}
				cashX(stewardessBonus * slaves.length, "servantsQuarters", S.Stewardess);
			}
			if (FutureSocieties.isActive('FSRestart') && stewardessImpregnated > 0 && V.eugenicsFullControl !== 1) {
				r.push(`<br>The Societal Elite know you've ordered ${S.Stewardess.slaveName} to impregnate your maids. <span class="red">They are not amused by your disinterest in eugenics.</span>`);
				V.failedElite += 10;
			}
			App.Events.addNode(frag, r);
		}
		return frag;
	}

	const stewardessEffects = App.UI.DOM.appendNewElement("p", beforeFrag, '', "indent");
	$(stewardessEffects).append(stewardessText());

	if (slaves.length > 0) {
		let r = [];
		if (slaves.length > 1) {
			r.push(`<strong>There are ${num(slaves.length)} slaves working out of the servants' quarters.</strong> They work to`);
		} else {
			const {He} = getPronouns(slaves[0]);
			r.push(`<strong>There is ${num(1)} slave working out of the servants' quarters.</strong> ${He} works to`);
		}
		r.push(`<span class="yellowgreen">reduce</span> your household expenses; having a well-staffed house slightly <span class="green">increases</span> your reputation.`);
		App.Events.addNode(beforeFrag, r);
	}

	/** @type {Array<FC.EndWeek.SlaveReport>} */
	const slaveReports = [];

	if (S.Stewardess) {
		const slave = App.SlaveAssignment.reportSlave(S.Stewardess);
		tired(slave);
		/* apply following SA passages to facility leader */
		if (V.showEWD || (V.favSeparateReport === 1 && V.favorites.includes(slave.ID))) {
			const stewardessEntry = App.UI.DOM.makeElement("div", '', ["slave-report"]);
			const artSpan = App.UI.DOM.appendNewElement("span", stewardessEntry);
			stewardessEntry.append(App.SlaveAssignment.saSlaveIntro(slave, `is serving as your Stewardess.`));
			App.Events.addNode(stewardessEntry, [stewardessText()], "div", ["indent"]);
			stewardessEntry.append(App.SlaveAssignment.standardSlaveReport(slave, false));
			App.SlaveAssignment.appendSlaveArt(artSpan, slave);
			slaveReports.push({
				id: slave.ID,
				report: stewardessEntry,
			});
		} else {
			App.SlaveAssignment.standardSlaveReport(slave, true);
		}
	}

	let SQMilk = 0;
	let SQMilkSale = 0;

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
		if (slave.devotion < -20) {
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
		switch (V.servantsQuartersDecoration) {
			case "Arabian Revivalist":
			case "Aztec Revivalist":
			case "Chattel Religionist":
			case "Chinese Revivalist":
			case "Degradationist":
			case "Edo Revivalist":
			case "Egyptian Revivalist":
			case "Roman Revivalist":
			case "Subjugationist":
			case "Supremacist":
				slave.rules.living = "spare";
				break;
			case "Slave Professionalism":
				if (slave.intelligence+slave.intelligenceImplant > 15) {
					slave.rules.living = "normal";
				} else {
					slave.rules.living = "spare";
				}
				break;
			case "Petite Admiration":
			case "Statuesque Glorification":
				if (heightPass(slave)) {
					slave.rules.living = "normal";
				} else {
					slave.rules.living = "spare";
				}
				break;
			default:
				slave.rules.living = "normal";
		}

		if (V.showEWD || (V.favSeparateReport === 1 && V.favorites.includes(slave.ID))) {
			const {He} = getPronouns(slave);
			const slaveEntry = App.UI.DOM.makeElement("div", null, ["slave-report"]);
			const artSpan = App.UI.DOM.appendNewElement("span", slaveEntry);
			slaveEntry.append(App.SlaveAssignment.saSlaveIntro(slave, `is working out of ${V.servantsQuartersName}.`));
			App.Events.addNode(slaveEntry, [He, App.SlaveAssignment.servant(slave, stewardessBonus)], "div", ["indent"]);
			if (V.servantMilkers === 1 && slave.lactation > 0) {
				const milkResults = App.SlaveAssignment.getMilked(slave, 0.5);
				App.Events.addNode(slaveEntry, [He, milkResults.text], "div", ["indent"]);
				SQMilk += milkResults.milk;
				SQMilkSale += milkResults.milkSale;
			}
			slaveEntry.append(App.SlaveAssignment.standardSlaveReport(slave, false));
			App.SlaveAssignment.appendSlaveArt(artSpan, slave);

			slaveReports.push({
				id: slave.ID,
				report: slaveEntry,
			});
		} else {
			// discard return values silently
			App.SlaveAssignment.servant(slave, stewardessBonus);
			if (V.servantMilkers === 1 && slave.lactation > 0) {
				const milkResults = App.SlaveAssignment.getMilked(slave, 0.5);
				SQMilk += milkResults.milk;
				SQMilkSale += milkResults.milkSale;
			}
			App.SlaveAssignment.standardSlaveReport(slave, true);
		}
	}

	const afterFrag = new DocumentFragment();

	if (SQMilk > 0) {
		const milkEffects = App.UI.DOM.appendNewElement("p", afterFrag, '', "indent");
		App.Events.addNode(milkEffects, [`Since your lactating servants spend most of their time working in the penthouse, they use the milkers there, giving ${SQMilk} liters of milk over the week, which is sold for <span class="yellowgreen">${cashFormat(SQMilkSale)}.</span>`]);
	}

	if (V.servantsQuartersDecoration !== "standard") {
		const decorationEffects = App.UI.DOM.appendNewElement("p", afterFrag, '', "indent");
		App.Events.addNode(decorationEffects, [`${capFirstChar(V.servantsQuartersName)}'s ${V.servantsQuartersDecoration} atmosphere <span class="hotpink">has a minor impact on your servants.</span>`]);
	}

	repX(slaves.length * 20, "servantsQuarters");

	return {
		before: beforeFrag,
		slaves: slaveReports,
		after: afterFrag,
	};
};
