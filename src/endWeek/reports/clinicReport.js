/**
 * @returns {FC.EndWeek.FacilityReport}
 */
App.EndWeek.clinicReport = function() {
	let beforeFrag = document.createDocumentFragment();

	const slaves = App.Utils.sortedEmployees(App.Entity.facilities.clinic);
	let devBonus = (V.clinicDecoration !== "standard") ? 1 : 0;
	let healthBonus = 0;
	App.EndWeek.saVars.flSex = App.EndWeek.getFLSex(App.Entity.facilities.clinic);

	function nurseText() {
		let r = [];
		let FLsFetish = 0;
		let idleBonus = 0;

		if (S.Nurse) {
			if (S.Nurse.health.condition < 100) {
				improveCondition(S.Nurse, 20);
			}
			if (S.Nurse.devotion <= 60) {
				S.Nurse.devotion++;
			}
			if (S.Nurse.trust < 60) {
				S.Nurse.trust++;
			}

			if (S.Nurse.rules.living !== "luxurious") {
				S.Nurse.rules.living = "luxurious";
			}
			if (S.Nurse.rules.rest !== "restrictive") {
				S.Nurse.rules.rest = "restrictive";
			}

			S.Nurse.devotion += devBonus;
			if (S.Nurse.fetishStrength <= 95) {
				if (S.Nurse.fetish !== Fetish.DOM) {
					if (fetishChangeChance(S.Nurse) > jsRandom(0, 100)) {
						FLsFetish = 1;
						S.Nurse.fetishKnown = 1;
						S.Nurse.fetish = Fetish.DOM;
						S.Nurse.fetishStrength = 10;
					}
				} else if (S.Nurse.fetishKnown === 0) {
					FLsFetish = 1;
					S.Nurse.fetishKnown = 1;
				} else {
					FLsFetish = 2;
					S.Nurse.fetishStrength += 4;
				}
			}
			const {He, he, His, his, him, himself, wife} = getPronouns(S.Nurse);
			r.push(`${SlaveFullName(S.Nurse)} is serving as the clinical nurse.`);
			if (S.Nurse.relationship === -3 && S.Nurse.devotion > 50) {
				r.push(`${He} does ${his} best to be a caring and nurturing ${wife}.`);
				healthBonus += 2;
			}
			if (FLsFetish === 1) {
				r.push(`${His} job involves giving naked sex slaves orders for their own good. Even though most of these commands are medical rather than sexual, ${he} can be forgiven for not always seeing the difference, and <span class="fetish inc">becomes more dominant.</span>`);
			} else if (FLsFetish === 2) {
				r.push(`Every new patient in the clinic is a new target for ${his} authority. <span class="fetish inc">${He} becomes more dominant.</span>`);
			}
			if (App.Data.Careers.Leader.nurse.includes(S.Nurse.career)) {
				r.push(`${He} has experience with medicine from ${his} life before ${he} was a slave, and can often recognize conditions before even the medical scanners can.`);
				idleBonus++;
				healthBonus++;
			} else if (S.Nurse.skill.nurse >= Constant.MASTERED_XP) {
				r.push(`${He} has experience with medicine from working for you, and can often recognize conditions before even the medical scanners can.`);
				idleBonus++;
				healthBonus++;
			} else {
				const skillIncrease = jsRandom(1, Math.ceil((S.Nurse.intelligence + S.Nurse.intelligenceImplant) / 15) + 8);
				r.push(slaveSkillIncrease('nurse', S.Nurse, skillIncrease));
			}
			if (S.Nurse.fetish === Fetish.DOM) {
				r.push(`${He} raps out commands with the confidence of long and partly sexual experience, so patients are inclined to follow even unpleasant medical instructions.`);
				idleBonus++;
				healthBonus++;
			}
			if (S.Nurse.muscles > 5) {
				r.push(`${He}'s strong enough to gently but firmly restrain resistant slaves, allowing ${him} to be sparing with the inescapable but less healthy restraints.`);
				idleBonus++;
				healthBonus++;
			}
			if (S.Nurse.intelligence + S.Nurse.intelligenceImplant > 50) {
				r.push(`The diagnostic equipment is state-of-the-art, but ${he}'s smart and perceptive enough that on occasion, ${he} can add meaningfully to its medical scans.`);
				idleBonus++;
				healthBonus++;
			}
			if (S.Nurse.face > 40) {
				r.push(`Patients rarely object to seeing ${his} gorgeous face hovering over them.`);
				idleBonus++;
				devBonus++;
			}
			if (S.Nurse.devotion >= 60) {
				healthBonus++;
			}
			for (const slave of slaves) {
				const {He2, His2, he2, his2, him2} = getPronouns(slave).appendSuffix('2');
				if (S.Nurse.rivalryTarget === slave.ID) {
					r.push(`${He} purposefully neglects the needs of ${his} ${rivalryTerm(S.Nurse)}, ${slave.slaveName}, <span class="health dec">hindering ${his2} recovery</span> and deepening their dislike for each other.`);
					slave.devotion--;
					slave.trust--;
					healthDamage(slave, 3);
					if (jsRandom(1, 100) > 65) {
						S.Nurse.rivalry++;
						slave.rivalry++;
					}
				} else if (S.Nurse.relationshipTarget === slave.ID) {
					r.push(`${He} dedicates most of ${his} attention to ${his} ${relationshipTerm(S.Nurse)}, ${slave.slaveName}, making sure ${he2} has everything ${he2} needs and more. This lavish attention detracts from ${his} overall effectiveness.`);
					idleBonus -= 3;
					slave.devotion++;
					slave.trust++;
					improveCondition(slave, 3);
				} else if (areRelated(S.Nurse, slave)) {
					r.push(`${He} makes sure to spend extra time caring for ${his} ${relativeTerm(S.Nurse, slave)}, ${slave.slaveName}.`);
					slave.trust++;
					improveCondition(slave, 1);
				}
				switch (slave.prestigeDesc) {
					case "$He is a famed Free Cities whore, and commands top prices.":
						r.push(`${He} does ${his} best to aid the famous whore, ${slave.slaveName}, making sure to pay special attention to ${his2} worn holes.`);
						improveCondition(slave, 2);
						break;
					case "$He is a famed Free Cities slut, and can please anyone.":
						r.push(`${He} does ${his} best to aid the famous entertainer, ${slave.slaveName}, making sure ${he2} can show off as soon as possible.`);
						improveCondition(slave, 2);
						break;
					case "$He is remembered for winning best in show as a cockmilker.":
						if (slave.balls > 4 && slave.dick !== 0) {
							r.push(`${He} does ${his} best to aid the dribbling ${slave.slaveName}, paying special attention to ${his2} huge cock and balls as well as making sure to milk ${his2}`);
							if (canAchieveErection(slave)) {
								r.push(`erect`);
							}
							r.push(`dick hourly.`);
							improveCondition(slave, 4);
							if (jsRandom(1, 100) > 65 && canTaste(S.Nurse)) {
								if (S.Nurse.fetish === Fetish.NONE) {
									r.push(`It's not uncommon for ${him} to receive a load to the face; before long, <span class="fetish gain">${he} starts to enjoy the taste.</span>`);
									S.Nurse.fetish = Fetish.CUMSLUT;
								} else if (S.Nurse.fetish === Fetish.CUMSLUT) {
									r.push(`${canSmell(S.Nurse) ? `The smell of ${his2}` : `${His2}`} semen is irresistible to ${him} and sometimes ${he} can't help but`);
									if (slave.chastityPenis === 0 && slave.rules.release.facilityLeader === 1) {
										r.push(`wrap ${his} lips around ${him2} and sample the stuff directly,`);
										seX(S.Nurse, "oral", slave, "penetrative");
									} else {
										r.push(`catch a little of it in a cup for further "analysis",`);
									}
									r.push(`<span class="fetish inc">further feeding ${his} cum fetishism.</span>`);
									S.Nurse.fetishStrength = Math.clamp(S.Nurse.fetishStrength + 4, 0, 100);
								}
							}
						}
						break;
					case "$He is remembered for winning best in show as a dairy cow.":
						if (slave.lactation > 0 && App.Medicine.fleshSize(slave, 'boobs') > 6000) {
							r.push(`${He} does ${his} best to aid the leaking ${slave.slaveName}, paying special attention to ${his2} huge breasts as well as making sure to milk ${him2} hourly.`);
							improveCondition(slave, 4);
							slave.lactationDuration = 2;
							if (jsRandom(1, 100) > 65 && canTaste(S.Nurse)) {
								if (S.Nurse.fetish === Fetish.NONE) {
									r.push(`Those lovely globes are just too tantalizing for ${him} to resist, <span class="fetish gain">${he} can't help but take a drink ${himself}.</span>`);
									S.Nurse.fetish = Fetish.BOOBS;
								} else if (S.Nurse.fetish === Fetish.BOOBS) {
									r.push(`${He} takes the opportunity to <span class="fetish gain">feed ${his} breast fetishism</span> by getting up close and personal with ${his2} prized udders.`);
									S.Nurse.fetishStrength = Math.clamp(S.Nurse.fetishStrength + 4, 0, 100);
								}
							}
						}
						break;
					case "$He is remembered for winning best in show as a breeder.":
						if (slave.bellyPreg >= 1500) {
							r.push(`${He} does ${his} best to aid the pregnant ${slave.slaveName}, paying special attention to ${his2} swollen belly and the welfare of the life within.`);
							improveCondition(slave, 6);
						} else if (slave.ovaries === 1 || slave.mpreg === 1) {
							r.push(`${He} does ${his} best to aid the breeder ${slave.slaveName}, paying special attention to ${his2} fertility and reproductive organs.`);
							improveCondition(slave, 4);
						} else {
							r.push(`${He} lays out plans on how to restore the breeder ${slave.slaveName} to ${his2} former gravid glory.`);
						}
						break;
				}
				if (slave.bellyImplant > -1 && V.clinicInflateBelly === 1) {
					r.push(`<div class="indent"><span class="slave-name">${slave.slaveName}</span> spent a lot of time during the week under IV-like stands with bags of inert filler steadily flowing into ${his2} belly implant, slowly pushing ${his2} belly further and further out. Careful attention, along with several drug injections, were used to make sure ${his2} body was able to safely adjust to the implant's rapid growth.`);
					healthDamage(slave, 10);
					slave.bellyImplant += 5000;
					if (slave.devotion > 50) {
						slave.devotion += 4;
						slave.trust += 3;
					} else if (slave.devotion >= -20) {
						slave.trust -= 5;
					} else {
						slave.devotion -= 5;
						slave.trust -= 10;
					}
					if (slave.bellyImplant > (V.arcologies[0].FSTransformationFetishistResearch ? 800000 : 130000)) {
						slave.bellyImplant = (V.arcologies[0].FSTransformationFetishistResearch ? 800000 : 130000);
						r.push(`${He2} is filled to the maximum that ${his2} implant can stand.`);
					}
					r.push(`</div>`);
				}
				if (slave.pregKnown === 1 && slave.preg < slave.pregData.normalBirth && slave.pregControl === GestationDrug.FAST) {
					r.push(`<div class="indent"><span class="slave-name">${slave.slaveName}</span> spends most of ${his2} time on bedrest being filled with rapid gestation agents and concentrated slave food. All ${he2} can do is`);
					if (hasAnyArms(slave) && canSee(slave)) {
						r.push(`watch and feel ${his2} belly pushing further and further out with life.`);
					} else if (canSee(slave)) {
						r.push(`watch ${his2} belly bulging further and further out with life.`);
					} else if (hasAnyArms(slave)) {
						r.push(`feel ${his2} belly pushing further and further out with life beneath ${his2} fingers.`);
					} else {
						r.push(`feel the ever-growing pressure inside ${his2} abdomen.`);
					}
					r.push(`Careful attention, along with numerous drug injections, are used to make sure ${his2} body is able to safely adjust to ${his2} pregnancy's rapid growth.`);
					healthDamage(slave, 10);
					if (slave.devotion > 50) {
						slave.devotion += 2;
						slave.trust += 1;
					} else if (slave.devotion >= -20) {
						slave.trust -= 5;
					} else {
						slave.devotion -= 5;
						slave.trust -= 10;
					}
					if (slave.preg >= slave.pregData.normalBirth && slave.pregControl === GestationDrug.FAST) {
						slave.pregControl = "none";
						r.push(`${His2} child is ready to pop out of ${his2} womb; <span class="yellow">${his2} course of rapid gestation agents is finished.</span>`);
					}
					r.push(`</div>`);
				} else if (slave.preg > 2 && slave.pregKnown === 0) {
					r.push(`During ${his} tests, ${he} discovers that ${slave.slaveName} <span class="lime">is pregnant.</span>`);
					slave.pregKnown = 1;
				}
			}

			const pMod = App.SlaveAssignment.PartTime.efficiencyModifier(S.Nurse);
			healthBonus *= pMod;
			idleBonus *= pMod;
			if (pMod < 1) {
				r.push(`Some part of ${his} day is taken up by ${his} part-time job, making ${him} less effective.`);
			}

			if (slaves.length < V.clinic && !slaveResting(S.Nurse)) {
				const idlePay = Math.ceil(jsRandom(1, 10) + ((V.clinic - slaves.length) * (jsRandom(150, 170) + (idleBonus * 10))));
				cashX(idlePay, "clinic", S.Nurse);
				r.push(`<div class="indent">Since ${he} doesn't have enough patients to occupy all of ${his} time, ${V.clinicName} takes in citizens' slaves on a contract basis and ${he} helps them too, earning <span class="cash inc">${cashFormat(idlePay)}.</span></div>`);
			}
		}

		return r.join(" ");
	}

	const nurseEffects = App.UI.DOM.appendNewElement("p", beforeFrag, '', "indent");
	$(nurseEffects).append(nurseText());

	if (slaves.length > 0) {
		const intro = App.UI.DOM.appendNewElement("p", beforeFrag, '', "indent");
		if (slaves.length > 1) {
			$(intro).append(`<strong>There are ${slaves.length} slaves receiving treatment in the clinic.</strong>`);
		} else {
			$(intro).append(`<strong>There is one slave receiving treatment in the clinic.</strong>`);
		}
	}

	/** @type {Array<FC.EndWeek.SlaveReport>} */
	const slaveReports = [];

	if (S.Nurse) {
		const slave = App.SlaveAssignment.reportSlave(S.Nurse);
		tired(slave);
		/* apply following SA passages to facility leader */
		if (V.showEWD !== 0 || (V.favSeparateReport === 1 && V.favorites.includes(slave.ID))) {
			const nurseEntry = App.UI.DOM.makeElement("div", '', ["slave-report"]);
			const artSpan = App.UI.DOM.appendNewElement("span", nurseEntry);
			nurseEntry.append(App.SlaveAssignment.saSlaveIntro(slave, `is serving as the clinical nurse.`));
			nurseEntry.append(App.SlaveAssignment.standardSlaveReport(slave, false));
			App.SlaveAssignment.appendSlaveArt(artSpan, slave);
			slaveReports.push({
				id: slave.ID,
				report: nurseEntry
			});
		} else {
			App.SlaveAssignment.standardSlaveReport(slave, true);
		}
	}

	let restedSlaves = 0;
	for (const slave of App.SlaveAssignment.reportSlaves(slaves)) {
		if (slave.devotion < 45) {
			slave.devotion += 4;
		}
		slave.devotion += devBonus;

		if (slave.health.condition < -80) {
			improveCondition(slave, 20 + (V.curativeUpgrade * 10) + healthBonus);
		} else if (slave.health.condition < -40) {
			improveCondition(slave, 10 + (V.curativeUpgrade * 10) + healthBonus);
		} else if (slave.health.condition < 0) {
			improveCondition(slave, 7 + (V.curativeUpgrade * 10) + healthBonus);
		} else if (slave.health.condition < 90) {
			improveCondition(slave, 3 + (V.curativeUpgrade * 10) + healthBonus);
		}

		/* the clinic is a well-equipped medical facility and can allow the Nurse or player to
		* directly cure serious wounds caused by injury and surgery with minimal side effects */
		if (slave.health.shortDamage >= 10) {
			if (S.Nurse) {
				healthCure(slave, 5 + healthBonus);
			} else {
				healthCure(slave, V.PC.skill.medicine / 15); /* maximum of 6...even a bad full-time nurse will be better than a player doctor */
			}
		}

		switch (V.clinicDecoration) {
			case "Eugenics":
			case "Gender Fundamentalist":
			case "Gender Radicalist":
			case "Hedonistic":
			case "Intellectual Dependency":
			case "Maturity Preferentialist":
			case "Paternalist":
			case "Petite Admiration":
			case "Repopulationist":
			case "Slimness Enthusiast":
			case "Statuesque Glorification":
			case "Youth Preferentialist":
				slave.rules.living = "luxurious";
				break;
			case "Arabian Revivalist":
			case "Aztec Revivalist":
			case "Chattel Religionist":
			case "Chinese Revivalist":
			case "Edo Revivalist":
			case "Egyptian Revivalist":
			case "Roman Revivalist":
			case "Antebellum Revivalist":
				slave.rules.living = "normal";
				break;
			default:
				slave.rules.living = "spare";
		}

		if (S.Nurse) {
			if (V.clinicSpeedGestation === 1 && slave.pregKnown === 1) {
				slave.pregControl = GestationDrug.FAST;
			}
			if (slave.chem > 10 && V.clinicUpgradeFilters >= 1) {
				if (slave.health.health > -50 && (V.clinicUpgradePurge > 0)) {
					slave.chem -= 100 * V.clinicUpgradePurge;
					healthDamage(slave, 15);
				}
				slave.chem = Math.max(slave.chem - 5, 0);
			}
			if (slave.lactation > 0) {
				slave.boobs -= slave.boobsMilk;
				slave.boobsMilk = 0;
			}
		}

		/* Evaluate why the slave even needs to be here, and eject her if she doesn't */
		const {He, he, his} = getPronouns(slave);
		const remainReasons = [];
		if (slave.health.illness > 0) {
			remainReasons.push(`since ${he} is still sick`);
		}
		if (slave.health.shortDamage >= 20) {
			remainReasons.push(`to recover from ${his} injuries`);
		}
		if (slave.health.condition < -20) {
			remainReasons.push(`since ${his} health is still poor`);
		} else if (slave.health.condition <= 40) {
			remainReasons.push(`since ${his} health could be better`);
		}
		if (S.Nurse) {
			if (slave.chem > 15 && V.clinicUpgradeFilters === 1) {
				remainReasons.push(`to have unhealthy chemicals flushed from ${his} system`);
			}
			if (slave.pregKnown === 1 && (V.clinicSpeedGestation > 0 || slave.pregControl === GestationDrug.FAST)) {
				remainReasons.push(`to hurry ${his} pregnancy along safely`);
			}
			if (V.clinicObservePregnancy !== 0) {
				const highRisk = (slave.pregAdaptation * 1000 < slave.bellyPreg && slave.geneMods.progenitor !== 1) || (slave.geneMods.rapidCellGrowth !== 1 && slave.bellyPreg >= 100000 && slave.belly > (slave.pregAdaptation * 3200) && (slave.bellyPreg >= 500000 || slave.wombImplant !== "restraint"));
				const closeToGivingBirth = slave.preg > slave.pregData.normalBirth / 1.33;
				if (highRisk || (V.clinicObservePregnancy === 1 && closeToGivingBirth)) {
					remainReasons.push(`to wait for childbirth`);
				}
			}
			if (V.clinicInflateBelly > 0 && slave.bellyImplant >= 0 && (slave.bellyImplant <= (V.arcologies[0].FSTransformationFetishistResearch ? 800000 : 130000))) {
				remainReasons.push(`as ${his} implants can still receive more filling`);
			}
		}

		if (remainReasons.length === 0) {
			const reassignment = App.UI.DOM.appendNewElement("p", beforeFrag, '');
			let r = [];
			r.push(`<span class="slave-name">${slave.slaveName}</span> has been cured${(S.Nurse && V.clinicUpgradeFilters > 0) ? ' and purified' : ''},`);
			r.push(`<span class="noteworthy">`);
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
				removeJob(slave, Job.CLINIC);
			}
			r.push(`</span>`);
			restedSlaves++;
			$(reassignment).append(r.join(" "));
			continue;
		}

		if (V.showEWD !== 0 || (V.favSeparateReport === 1 && V.favorites.includes(slave.ID))) {
			const slaveEntry = App.UI.DOM.makeElement("div", null, ["slave-report"]);
			const artSpan = App.UI.DOM.appendNewElement("span", slaveEntry);
			slaveEntry.append(App.SlaveAssignment.saSlaveIntro(slave, `is receiving treatment in ${V.clinicName}.`));

			let r = [];
			r.push(He, App.SlaveAssignment.rest(slave));
			if (remainReasons.length > 0) {
				r.push(`${He} stays in the clinic ${toSentence(remainReasons)}.`);
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
		const rested = App.UI.DOM.appendNewElement("p", afterFrag, '', ["indent"]);
		rested.append((restedSlaves === 1) ? `One slave has` : `${restedSlaves} slaves have`, " been returned to ");
		App.UI.DOM.appendNewElement("span", rested, `health${(S.Nurse && V.clinicUpgradeFilters > 0) ? ' and purity' : ''}`, "green");
		rested.append(` and will be released from the clinic before the end of the week.`);

		if (V.clinicDecoration !== "standard") {
			const decorationEffects = App.UI.DOM.appendNewElement("p", afterFrag, '', ["indent"]);
			$(decorationEffects).append(`${capFirstChar(V.clinicName)}'s ${V.clinicDecoration} atmosphere <span class="hotpink">had an impact on them</span> while they were getting treatment.`);
		}
	}

	App.EndWeek.saVars.flSex = new Set();

	return {
		before: beforeFrag,
		slaves: slaveReports,
		after: afterFrag,
	};
};
