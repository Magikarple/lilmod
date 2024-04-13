/**
 * @param {FC.ReportSlave} slave
 * @returns {string}
 */
App.SlaveAssignment.workAGloryHole = function saWorkAGloryHole(slave) {
	const {
		he, him, his, He, His
	} = getPronouns(slave);
	const beauty = slave.sexAmount; /* This gets calculated during slaveAssignmentReport and stored on the slave for later use */
	const FResult = V.arcadePrice; /* This gets calculated during slaveAssignmentReport after we know the total 'arcade' sex slave supply */

	let r = ``;

	const incomeStats = gatherStatistics(slave);
	jobPreface(slave);
	physicalEffects(slave);
	mentalEffects(slave);
	jobBody(slave);
	applyFSDecoration(slave);
	sexCounts(slave);
	profitReport(slave);

	return r;

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {FC.SlaveStatisticData}
	 */
	function gatherStatistics(slave) {
		/* Statistics gathering */
		const facility = slave.assignment === window.Job.ARCADE ? V.facility.arcade : undefined;
		let incomeStats = getSlaveStatisticData(slave, facility);
		incomeStats.customers = beauty;
		return incomeStats;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function jobPreface(slave) {
		r += ` is `;
		if (slave.fuckdoll === 0) {
			r += `restrained in a glory hole.`;
		} else {
			r += `set out for use.`;
		}
		r += ` ${beauty} customers (${Math.trunc(beauty / 7)} a day) `;
		if (V.policies.publicFuckdolls === 1) {
			r += `enjoyed ${his} holes free of charge thanks to your gracious policies.`;
		} else {
			r += `paid `;
			// is this right? This really doesn't feel right. < 1 credit?
			if (FResult === 3) {
				r += `${cashFormat(3)}`;
			} else if (FResult >= 2.5) {
				r += `a little under ${cashFormat(3)}`;
			} else if (FResult >= 2) {
				r += `a little over ${cashFormat(2)}`;
			} else if (FResult >= 1.5) {
				r += `a little under ${cashFormat(2)}`;
			} else if (FResult >= 1) {
				r += `a little over ${cashFormat(1)}`;
			} else {
				r += `less than ${cashFormat(1)}`;
			}
			r += ` to use ${his} holes.`;
		}
		if (V.arcologies[0].FSDegradationist > 0) {
			r += ` Demand for ${his} holes is strong due to the appetite for degradation rampant in ${V.arcologies[0].name}.`;
		}
		const pMod = App.SlaveAssignment.PartTime.efficiencyModifier(slave);
		if (pMod < 1) {
			const loss = Math.ceil((beauty / pMod) * (1 - pMod));
			r += ` Due to ${his} part-time job, ${he} served ${loss} less than ${he} would have normally.`;
		}
	}

	/**
	 * @param {FC.ReportSlave} slave
	 */
	function physicalEffects(slave) {
		// check usage counts for these — more fucks should be more damaging
		if (slave.curatives > 0 || slave.inflationType === InflationLiquid.CURATIVE) {
			r += ` The drugs ${he}'s `;
			if (slave.inflationType === InflationLiquid.CURATIVE) {
				r += `harboring inside ${his} guts`;
			} else {
				r += `on`;
			}
			r += ` protect ${his} health from the stress of being used as a sexual appliance.`;
		} else if (slave.health.condition < -50) {
			r += ` The stress of being used while very in terrible condition <span class="health dec">damaged ${his} health.</span>`;
			healthDamage(slave, Math.max(Math.trunc((slave.sexAmount - 400) / 25) + jsRandom(-2, 2), 1));
		} else if (slave.health.condition < -10) {
			if (jsRandom(1, 100) < 10) {
				r += ` The stress of being used while weak has <span class="health dec">damaged ${his} health.</span>`;
				healthDamage(slave, Math.max(Math.trunc((slave.sexAmount - 400) / 25) + jsRandom(-2, 2), 1));
			}
		} else if (!canDoVaginal(slave) && !canDoAnal(slave)) {
			if (jsRandom(1, 100) < 75) {
				r += ` The stress of being used repeatedly in only one hole has <span class="health dec">damaged ${his} health.</span>`;
				healthDamage(slave, Math.max(Math.trunc((slave.sexAmount - 400) / 25) + jsRandom(-2, 2), 1));
			}
		} else if (!canDoVaginal(slave)) {
			if (jsRandom(1, 100) < 50) {
				r += ` The stress of being used in only two holes has <span class="health dec">damaged ${his} health.</span>`;
				healthDamage(slave, Math.max(Math.trunc((slave.sexAmount - 400) / 25) + jsRandom(-2, 2), 1));
			}
		} else if (jsRandom(1, 100) < 25) {
			r += ` The stress of being used has <span class="health dec">damaged ${his} health.</span>`;
			healthDamage(slave, Math.max(Math.trunc((slave.sexAmount - 400) / 25) + jsRandom(-2, 2), 1));
		}

		if (slave.health.illness > 0 || slave.health.tired > 60) {
			r += ` ${He} is<span class="health dec">`;
			if (slave.health.illness === 1) {
				r += ` feeling under the weather`;
			} else if (slave.health.illness === 2) {
				r += ` somewhat ill`;
			} else if (slave.health.illness === 3) {
				r += ` sick`;
			} else if (slave.health.illness === 4) {
				r += ` very sick`;
			} else if (slave.health.illness === 5) {
				r += ` terribly ill`;
			}
			if (slave.health.illness > 0 && slave.health.tired > 90) {
				r += ` and`;
			}
			if (slave.health.tired > 90) {
				r += ` exhausted`;
			} else if (slave.health.tired > 60) {
				r += ` fatigued`;
			}
			r += `,</span> but no one cared.`;
		}
		if (slave.assignment === Job.ARCADE) {
			if (!slave.fuckdoll) {
				r += ` ${He} spends ${his} working hours constrained to a box, and ${his} time outside preparing for ${his} next shift; <span class="health dec">an exhausting life for even the healthiest of slaves.</span>`;
				if (V.arcadeUpgradeHealth > 0) {
					r += ` The curative cocktail pumped into ${him} is laced with `;
					if (V.arcadeUpgradeHealth === 2) {
						r += `sedatives and painkillers to keep ${him} in a <span class="health inc">state of forced rest.</span>`;
					} else {
						r += `painkillers and mild muscle relaxants; Not enough to ruin a customer's fun, but enough to keep ${him} in a <span class="health inc">state of pseudo-rest.</span>`;
					}
				} else {
					r += ` If ${he} needs to rest, however, ${he} can always just pass out in ${his} restraints.`;
				}
			}
			tired(slave);
		} else if (slave.assignment === Job.GLORYHOLE) {
			if (!slave.fuckdoll) {
				if (slaveResting(slave)) {
					r += ` ${He} spends reduced hours serving ${his} glory hole in order to <span class="health inc">offset ${his} lack of rest.</span>`;
				} else if (slave.health.tired + 20 >= 90 && !willWorkToDeath(slave)) {
					r += ` ${He} attempts to refuse work due to ${his} exhaustion, but can do little to stop it or the resulting <span class="trust dec">severe punishment.</span> ${He} <span class="devotion dec">purposefully underperforms,</span> choosing ${his} overall well-being over the consequences, <span class="reputation dec">aggravating customers and damaging the establishment's image.</span>`;
					slave.devotion -= 10;
					slave.trust -= 5;
					repX(forceNeg(50), "disobedience", slave);
				} else {
					r += ` ${He} spends long hours cooped up in a small box with nothing to rest on. Even if ${he} were to try to lean against its side, it won't be long before another dick pokes through the hole demanding service. By the time ${he} is released, ${he} is <span class="health dec">utterly exhausted.</span>`;
				}
			}
			tired(slave);
		}

		if (slave.vagina === 0 && canDoVaginal(slave)) {
			r += ` A `;
			if (slave.fuckdoll === 0) {
				r += `glory hole`;
			} else {
				r += `Fuckdoll`;
			}
			r += ` user takes ${his} virginity. ${He} does not notice or care. <span class="lime">${His} pussy has been broken in</span> in a <span class="trust dec">painful</span> and <span class="devotion dec">degrading</span> way.`;
			slave.devotion -= 10;
			slave.trust -= 10;
			slave.vagina = 1;
		} else if (V.seeStretching === 1 && slave.vagina < 3 && canDoVaginal(slave) && jsRandom(1, 100) > ((310 - beauty) + (slave.vagina * 10))) {
			r += ` <span class="lime">${His} pussy gets stretched out by the use.</span>`;
			slave.vagina += 1;
		}

		if (slave.anus === 0 && canDoAnal(slave)) {
			r += ` ${His} anal virginity goes to a `;
			if (slave.fuckdoll === 0) {
				r += `glory hole`;
			} else {
				r += `Fuckdoll`;
			}
			r += ` user, who doesn't understand why this particular run at `;
			if (slave.fuckdoll === 0) {
				r += `the glory hole`;
			} else {
				r += `a Fuckdoll`;
			}
			r += ` is so great. <span class="lime">${His} ass has been broken in</span> in a <span class="trust dec">painful</span> and <span class="devotion dec">degrading</span> way.`;
			slave.devotion -= 5;
			slave.trust -= 5;
			slave.anus = 1;
		} else if (V.seeStretching === 1 && slave.anus < 3 && canDoAnal(slave) && jsRandom(1, 100) > ((290 - beauty) + (slave.anus * 10))) {
			r += ` <span class="lime">${His} asshole sees constant use and loosens.</span>`;
			slave.anus += 1;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function mentalEffects(slave) {
		if (slave.fetish === Fetish.MINDBROKEN) {
			r += ` ${He} serves ${his} role as a mindless set of holes to perfection.`;
		} else {
			if (slave.skill.oral <= 10) {
				r += ` With ${his} throat being brutally used, ${his} gag reflex is suppressed and ${his} oral skills improve.`;
				r += ` ${slaveSkillIncrease('oral', slave, 5)}`;
			} else if (slave.skill.vaginal <= 10 && canDoVaginal(slave)) {
				r += ` With ${his} pussy being harshly used, ${his} vaginal skills improve.`;
				r += ` ${slaveSkillIncrease('vaginal', slave, 5)}`;
			} else if (slave.skill.anal <= 10 && canDoAnal(slave)) {
				r += ` With ${his} butt being mercilessly fucked, ${his} anal skills improve.`;
				r += ` ${slaveSkillIncrease('anal', slave, 5)}`;
			}
			let acceptance = 0;
			acceptance += Math.trunc(slave.energy / 10);
			acceptance -= Math.trunc((slave.intelligence + slave.intelligenceImplant) / 10);
			if (slave.fetish === Fetish.MASOCHIST || slave.fetish === Fetish.HUMILIATION) {
				acceptance += Math.trunc(slave.fetishStrength / 10);
			}
			if (slave.sexualFlaw === SexualFlaw.SELFHATING) {
				r += ` ${His} self hatred is so deep that ${he} believes ${he} deserves to serve in a glory hole, and even gets off on the degradation.`;
			} else if (acceptance > 20 && slave.devotion > 20) {
				r += ` ${He} gets off on the constant degrading sexual use and does not consider what this means for ${his} future as a slave.`;
			} else if (slave.sentence > 0) {
				if (slave.behavioralFlaw !== BehavioralFlaw.ODD && jsRandom(1, 100) > (100 + (slave.devotion / 5))) {
					r += ` Constant confinement coupled with brutal use has left ${him} with involuntary nervous tics.`;
					slave.behavioralFlaw = BehavioralFlaw.ODD;
				}
				if (slave.devotion > 50) {
					r += ` ${He} does ${his} best to tolerate ${his} sentence to the glory hole, but <span class="devotion dec">${his} devotion is hurt</span> and ${he} is <span class="trust dec">filled with fear</span> ${he} won't be let out.`;
				} else if (slave.devotion > 20) {
					r += ` ${He} does not understand why ${his} obedience has earned ${him} a sentence to this torture. <span class="devotion dec">${His} obedience is hurt</span> and ${he} is <span class="trust dec">filled with fear</span> ${he} won't be let out.`;
				} else if (slave.devotion >= -20) {
					r += ` ${His} fear of you turns to desperation during ${his} sentence. <span class="devotion dec">${His} obedience is reduced</span> and ${he} is <span class="trust dec">filled with fear</span> ${he} won't be let out.`;
				} else if (slave.devotion >= -50) {
					r += ` Though ${he} is only temporarily sentenced to suffer, <span class="devotion dec">${his} resistance is increased</span> and ${he} is <span class="trust dec">filled with fear</span> ${he} won't be let out.`;
				} else {
					r += ` ${He} has hope ${he}'ll be released after ${his} sentence, but <span class="devotion dec">${his} hatred of you is increased</span> and ${he} is <span class="trust dec">filled with fear</span> ${he} won't be let out.`;
				}
				slave.devotion -= 5;
				slave.trust -= 5;
			} else {
				if (slave.behavioralFlaw !== BehavioralFlaw.ODD && jsRandom(1, 100) > (70 + (slave.devotion / 5))) {
					r += ` Constant confinement coupled with brutal use has left ${him} with involuntary nervous tics.`;
					slave.behavioralFlaw = BehavioralFlaw.ODD;
				}
				if (slave.devotion > 50) {
					r += ` ${He} feels starved of personal contact. <span class="devotion dec">${His} devotion is hurt</span> and ${he} is <span class="trust dec">filled with fear</span> ${he} won't be let out.`;
				} else if (slave.devotion > 20) {
					r += ` ${He} does not understand why ${his} obedience has earned ${him} this immurement. <span class="devotion dec">${His} obedience is hurt</span> and ${he} is <span class="trust dec">filled with fear</span> ${he} won't be let out.`;
				} else if (slave.devotion >= -20) {
					r += ` ${His} fear of you has increased into something like a pathology. <span class="devotion dec">${His} obedience is reduced</span> and ${he} is <span class="trust dec">filled with fear</span> ${he} won't be let out.`;
				} else if (slave.devotion >= -50) {
					r += ` ${His} resistance is deepening into hatred. <span class="devotion dec">${His} resistance is increased</span> and ${he} is <span class="trust dec">filled with fear</span> ${he} won't be let out.`;
				} else {
					r += ` <span class="devotion dec">${His} helpless hatred of you is increased</span> and ${he} is <span class="trust dec">filled with fear</span> ${he} won't be let out.`;
				}
				slave.devotion -= 10;
				slave.trust -= 10;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function jobBody(slave) {
		r += ` ${His} feelings, skills, and appearance do not matter. ${He} is condemned to a world that consists of a tiny cell, featureless except for the never-ending dicks ${he} is required to service. You `;
		if (V.policies.publicFuckdolls === 0) {
			r += `were paid <span class="cash inc">${cashFormat((Math.trunc(beauty * FResult)))}</span>`;
		} else {
			r += `<span class="reputation inc">gained reputation</span>`;
		}
		r += ` for the use of ${slave.slaveName}'s holes this week.`;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function applyFSDecoration(slave) {
		if (slave.assignment === Job.ARCADE) {
			const impact = (0.0001 * beauty);
			FutureSocieties.DecorationBonus(V.arcadeDecoration, impact);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function sexCounts(slave) {
		/* SEX ACT COUNTS AND SEXUAL SATISFACTION */
		let oralUse = (V.oralUseWeight + (slave.lips / 20));
		if (V.policies.gumjobFetishism === 1 && slave.teeth !== "removable") {
			oralUse = Math.max(Math.trunc(oralUse * .75), 1);
		}
		let analUse = 0;
		if (canDoAnal(slave)) {
			analUse = V.analUseWeight - slave.anus;
			if (analUse < 0) {
				analUse = 0;
			}
		}
		let vaginalUse = 0;
		if (canDoVaginal(slave)) {
			vaginalUse = V.vaginalUseWeight - slave.vagina;
			if (vaginalUse < 0) {
				vaginalUse = 0;
			}
		}

		const demand = (oralUse + analUse + vaginalUse);
		let cervixPump = 0;

		oralUse = Math.trunc((oralUse / demand) * beauty);
		analUse = Math.trunc((analUse / demand) * beauty);
		vaginalUse = Math.trunc((vaginalUse / demand) * beauty);

		slave.need -= ((analUse + vaginalUse) / 4);

		seX(slave, "oral", "public", "penetrative", oralUse);
		seX(slave, "anal", "public", "penetrative", analUse);
		seX(slave, "vaginal", "public", "penetrative", vaginalUse);

		if (slave.cervixImplant === 1 || slave.cervixImplant === 3) {
			cervixPump += (20 * vaginalUse);
		}
		if (slave.cervixImplant === 2 || slave.cervixImplant === 3) {
			cervixPump += (20 * analUse);
		}

		// this may need improvement with the new system
		if (slave.need) {
			if (slave.fetishKnown) {
				switch (slave.fetish) {
					case Fetish.SUBMISSIVE:
					case Fetish.MASOCHIST:
						if ((analUse + vaginalUse) > 0) {
							r += ` ${He} enjoys being used, and got sexual satisfaction from the ${analUse + vaginalUse} dicks stuck inside ${him} this week.`;
							slave.need -= (analUse + vaginalUse);
						}
						break;
					case Fetish.DOM:
					case Fetish.SADIST:
						break;
					case Fetish.CUMSLUT:
						if (oralUse > 0) {
							r += ` ${He} enjoys being facefucked, and got sexual satisfaction from the ${oralUse} dicks shoved inside ${his} throat this week.`;
							slave.need -= oralUse;
						}
						break;
					case Fetish.BUTTSLUT:
						if (analUse > 0) {
							r += ` ${He} enjoys getting buttfucked, and got sexual satisfaction from the ${analUse} times ${he} was sodomized this week.`;
							slave.need -= analUse;
						}
						break;
					case Fetish.PREGNANCY:
						if (canGetPregnant(slave)) {
							if (slave.mpreg === 0) {
								if (vaginalUse > 0) {
									r += ` ${He} enjoys having ${his} pussy fucked, and got sexual satisfaction from the ${vaginalUse} loads ${he} received this week.`;
									slave.need -= vaginalUse;
								}
							} else {
								if (analUse > 0) {
									r += ` ${He} enjoys having ${his} ass fucked, and got sexual satisfaction from the ${analUse} loads ${he} received this week.`;
									slave.need -= analUse;
								}
							}
						}
						break;
					case Fetish.HUMILIATION:
						r += ` ${He} enjoys the humiliation of having ${his} most intimate parts presented for public use, and got a bit of sexual satisfaction from every sex act ${he} performed this week.`;
						slave.need -= beauty;
						break;
				}
			}
		}

		if (cervixPump > 0) {
			r += ` ${He} notices ${his} <span class="change positive">belly has swollen</span> from all the `;
			if (slave.cervixImplant === 1) {
				r += `vaginal `;
			} else if (slave.cervixImplant === 2) {
				r += `anal `;
			}
			r += `sex ${he} had throughout the week.`;
			slave.bellyImplant += cervixPump;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function profitReport(slave) {
		let cash;
		if (V.policies.publicFuckdolls === 0) {
			cash = Math.trunc(beauty * FResult);
		} else {
			cash = Math.trunc(beauty * FResult / 5);
		}

		if (slave.assignment === window.Job.GLORYHOLE) {
			cashX(cash, "slaveAssignmentGloryhole", slave);
		} else if (slave.assignment === window.Job.ARCADE) {
			cashX(cash, "slaveAssignmentArcade", slave);
		} else {
			cashX(cash, "income for working a gloryhole in an unregistered building", slave);
		}

		incomeStats.income += cash;
	}
};
