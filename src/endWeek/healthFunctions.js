/* Condition
	The current physical condition of the slave.
	Any health improvements get added here.
	Short term damage reduces it as it degrades.

Short term damage
	Anything that hurts a slave gets transferred into this.
	At the end of the week 25% of it will be removed and turned into condition damage instead.
	Usage of preventatives or curatives reduces the actual condition damage by 50%.

Long term damage
	Once ageing beyond 30 years old there is a chance of long term damage that increases with time. Calculated on birthday.
		Math.floor((slave.physicalAge - 25 + jsRandom(1, 15)) / 20)
	25% of the actual condition damage taken during a week also gets added to the pool (therefore gets reduced by preventatives and curatives if active).
	Nothing can reduce this value.
	Perhaps the effect can still be reduced through surgical implant with high upkeep.

Carcinogens
	Aside from a source of regular short term damage high levels will also increase the chances for severe illnesses
		3d6 rolls for illness
			illness > 8 -- 1 62.5%
			illness > 6 -- 2 21.3%
			illness > 5 -- 3 11.6%
			illness > 4 -- 4 2.8%
			illness = 3 or 4 -- 5 1.8%
		Carcinogens subtract Math.trunc(chem / 150) from the dice rolls for a max of -6 at >= 90
	There should be a natural decay of carcinogens every week of 10% of the level. But at the price of 0.2 short term damage per point of chem.
	Add carcinogen damage to serious medical procedures due to use of potent pharmaceuticals during them.

Illness
	There is always a chance a slave gets sick. Often they will just get better on their own, but sometimes it can be more serious and require a stay in the clinic.
	Sick slaves work at reduced effectiveness and will see their health lowered.

Tiredness
	Depending on various factors (living conditions, assignment, rewards, muscles, health) a slave may become more or less tired.
	Once tiredness reached 60 there will be negative effects for productivity and at 90 they become even more extreme.
	Being tired or exhausted also reduces a slave's ability to resist the player, increasing devotion and fear.

Health
	The aggregate of condition, short term damage and long term damage to provide an indication of the current overall state of the slave. The slave will die once this reached -100.
*/

/* Getting ill depends on the following factors;
	- current condition
	- long term damage (accumulated through getting old(er) and residual from short term damage)
	- short term damage (accumulated through serious illness, chemical carcinogens, damaging surgeries and other health damage sources) 125%
	- chemical carcinogens (more serious illness chance with high carcinogen levels)
	- age (long term damage takes care of older slaves, the young ones need a specific vulnerability)
	- use of curatives
	- assignment (rest, clinic, spa and master suite less likely, whoring, slutting and gloryholes more likely.)
	- random chance
	Can be blocked with preventatives.
*/

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
globalThis.illness = function(slave) {
	const H = slave.health;

	// Let's make sure agents don't get sick and accidentally die, they should take care of themselves
	if (slave.assignment === Job.AGENTPARTNER || slave.assignment === Job.AGENT) {
		if (H.illness !== 0) {
			H.illness = 0;
		}
		return "";
	}

	const random = jsRandom(1, 100); // high rolls are good
	let r = ``;
	let assignBonus = 0; // bonus for healthy assignments

	const {
		he, his, He, His
	} = getPronouns(slave);

	const sicknessDegree = ["fine", "minor illness", "illness", "bad illness", "severe illness",
		"life-threatening illness"];

	// On the macro side of things disease could also happen to the arcology's population as the arcology becomes
	// crowded, killing citizens and putting slaves at greater risk of getting ill. Again with upgrades/policies to
	// mitigate the issue made available TODO?

	if (slave.fuckdoll !== 0) {
		assignBonus += 50;
	} else if (slave.assignment === Job.CLINIC || slave.assignment === Job.NURSE) {
		assignBonus += 40;
	} else if (slave.assignment === Job.DAIRY && V.dairyRestraintsSetting > 1) { // industrial dairy immunization boost
		assignBonus += 30;
	} else {
		if (slave.assignment === Job.SPA || slave.assignment === Job.ATTENDANT || slave.assignment === Job.REST) {
			assignBonus += 20;
		} else if ((slave.assignment === Job.MASTERSUITE || slave.assignment === Job.FUCKTOY || slave.assignment === Job.CONCUBINE || slave.assignment === Job.HEADGIRL) && V.PC.skill.medicine >= 40) {
			assignBonus += 10;
		}
		if (App.Data.Careers.Leader.nurse.includes(slave.career) || slave.skill.nurse > 120 || slave.intelligence + slave.intelligenceImplant > 95) { // Let slaves with experience or brains use it
			assignBonus += 10;
		}
	}
	if (random < 2 && canCatchIllness(slave)) { // Always a 2% (one week per slave per year) base chance of a slave even in otherwise-safe conditions spontaneously catching an illness
		getIll(slave);
		r += ` ${He} has come down with <span class="health dec">${addA(sicknessDegree[H.illness])}.</span>`;
	} else if (random < 6 && H.illness > 0) { // Always a 5% chance of a sick slave feeling worse
		H.illness += 1 + Math.trunc((slave.chem / 10 + jsRandom(1, 50) + 15) / 100); // Illness progresses with 1, unless chem > 350, then there's a chance for 2
		r += ` <span class="health dec">${His} sickness has progressed.</span>`;
		if (H.illness > 5) {
			healthDamage(slave, 20 * (H.illness - 5)); // Condition penalty for going over maximum illness, very dangerous
			H.illness = 5;
			r += ` ${His} illness <span class="health dec">makes an attempt to claim ${his} life.</span>`;
		}
	} else if (random > 95 && H.illness > 0) { // Always a 5% chance of a sick slave getting better
		H.illness -= 1;
		if (H.illness === 0) {
			improveCondition(slave, 5);
			r += ` <span class="health inc">${His} sickness has waned</span> and ${he} now feels better.`;
		} else {
			r += ` ${His} immune system <span class="health inc">fights back</span> against ${his} illness.`;
		}
	} else {
		const nurseEffect = nurseEffectiveness(slave); // small (~5 or less) for prevention, large (~20 or more) for cure
		const ageModifier = Math.min(slave.physicalAge - 15, 0); // always negative (-15 to 0); younger kids are slightly more likely to get sick
		const healthAdjusted = H.condition - H.longDamage - H.shortDamage * 1.25 + ageModifier; // -100 to +200, roughly
		const assignmentFactor = 1 + assignBonus / 100; // 1.0 to 1.5
		const nurseFactor = 1 + nurseEffect / 100; // 1.0 to 1.4
		const healthFactor = Math.clamp(1 + healthAdjusted / 100, 0.5, 1.5); // 0.5 to 1.5
		const curativesBonus = (slave.curatives > 1 || slave.inflationType === InflationLiquid.CURATIVE) ? 2 : 1; // 1.0 or 2.0
		if (V.debugMode) {
			r += ` (Illness factors: health ${healthFactor}, nurse ${nurseFactor}, assignment ${assignmentFactor}, curative ${curativesBonus}${H.illness > 0 ? `; cure roll ${random}` : ``})`;
		}

		// When ill, a slave in average health with a level 1 illness has a 60% chance of getting better the next week at complete default, 78% in the clinic with a great nurse, 80% with curatives alone, 89% with both benefits - note that bonus factors have a bigger effect on more advanced illnesses
		if (H.illness > 0 && random > (30 + (H.illness * 10)) / (curativesBonus * assignmentFactor * nurseFactor * healthFactor)) {
			if (nurseEffect > 30 && (jsRandom(1, 2) === 2 || slave.assignment === Job.CLINIC) && H.illness > 1) { // A particularly effective nurse can improve illness faster
				H.illness -= 2;
				r += ` ${S.Nurse.slaveName} <span class="health inc">successfully treats</span> ${his} illness.`;
			} else {
				H.illness -= 1;
				r += ` ${His} body <span class="health inc">fights back</span> against ${his} illness.`;
			}
			if (H.illness === 0) {
				r += ` ${He} no longer <span class="health inc">shows any signs</span> of ${his} previous sickness.`;
			}
		} else if (canCatchIllness(slave)) {
			/** an adult slave in average condition in an otherwise unprotected environment (no drugs or modifiers) will have `baseChance` chance of catching an illness when exposed
			 * note the independent roll for each exposure; we're ignoring the original random roll here
			 * @param {number} baseChance
			 * @returns {boolean}
			 */
			const catchesIllness = (baseChance) => {
				const roll = jsRandom(1, 100);
				if (V.debugMode) {
					r += ` (Transmission roll: ${roll} vs ${baseChance}*mods)`;
				}
				return roll < baseChance / (curativesBonus * assignmentFactor * nurseFactor * healthFactor);
			};

			if (hasOutsideContact(slave)) {
				if (catchesIllness(15)) {
					getIll(slave);
					r += ` ${He} has come down with <span class="health dec">${addA(sicknessDegree[H.illness])}.</span>`;
				}
			}

			// if she didn't/couldn't catch an illness outside, maybe she'll get one from another slave
			if (![Job.CLINIC, Job.NURSE].includes(slave.assignment)) { // slaves in the clinic are monitored and can't catch new illnesses from visitors or patients
				// a slave is likely to catch something from her friend/partner
				if (H.illness === 0 && slave.relationship > 0) {
					const rel = getSlave(slave.relationshipTarget);
					if (rel && rel.health.illness > 1) {
						const chance = rel.assignment === Job.CLINIC ? 15 : 45; // you CAN still catch a disease from visiting your sick friend while she's in the clinic for treatment, but it's much less likely
						if (catchesIllness(chance)) {
							H.illness = rel.health.illness - 1; // reduced severity
							r += ` ${He} has <span class="health dec">caught ${addA(sicknessDegree[H.illness])}</span> from ${his} ${relationshipTerm(rel)} ${rel.slaveName}.`;
						}
					}
				} else if (H.illness === 0 && slave.relationship === -3) {
					if (V.PC.health.illness > 1) {
						if (catchesIllness(10)) {
							H.illness = V.PC.health.illness - 1; // reduced severity
							r += ` ${He} has <span class="health dec">caught ${addA(sicknessDegree[H.illness])}</span> from you.`;
						}
					}
				}
				// or she might catch something from a sick coworker
				const job = App.Utils.jobForAssignment(slave.assignment);
				if (H.illness === 0 && job) {
					const contacts = 20; // limits max spread rate in large facilities - not everyone comes into contact with everyone else every week
					for (const other of job.facility.employees().randomMany(contacts).filter(s => s.health.illness > 1)) {
						if (catchesIllness(25)) {
							H.illness = other.health.illness - 1; // reduced severity
							r += ` ${He} has <span class="health dec">caught ${addA(sicknessDegree[H.illness])}</span> from ${his} coworker ${other.slaveName}.`;
							break;
						}
					}
				}
				if (H.illness === 0 && [Job.FUCKTOY, Job.MASTERSUITE, Job.CONCUBINE].includes(slave.assignment)) {
					if (V.PC.health.illness > 1) {
						if (catchesIllness(20)) {
							H.illness = V.PC.health.illness - 1; // reduced severity
							r += ` ${He} has <span class="health dec">caught ${addA(sicknessDegree[H.illness])}</span> from you.`;
						}
					}
				}
			}
		} else if (H.illness > 0) {
			if (jsRandom(1, 100) > 75 && H.illness === 1 && curativesBonus < 2 && slave.assignment !== Job.CLINIC && V.week > 8) {
				// independent 25% chance of getting worse if you have a level 1 illness, aren't being treated, AND already failed your recovery roll (i.e. you've spent more than one week sick)
				r += ` ${He}'s <span class="health dec">feeling much worse</span> after spending so much time with a minor illness.`;
				H.illness += 1;
			} else {
				r += ` ${He} <span class="health dec">suffers under ${his} ${sicknessDegree[H.illness]}.</span>`;
			}
			// note: health damage from continuing illness is deducted in endWeekHealthDamage
		}
	}
	return r;
};

/** Determine whether a given slave can catch an illness at all, so we don't have to check chances.
 * @param {FC.HumanState} slave
 * @returns {boolean}
 */
globalThis.canCatchIllness = function(slave) {
	if (V.seeIllness === 0) { // illness is disabled globally
		return false;
	}
	if (slave.health.illness > 0) { // already sick
		return false;
	}
	slave = asSlave(slave);
	if (slave) {
		if (slave.curatives === 1 || slave.inflationType === InflationLiquid.CURATIVE) { // on preventatives, or inflated with curatives
			return false;
		}
		if (slave.assignment === Job.CLINIC) { // slaves in the clinic are monitored
			return false;
		}
	}
	return true;
};

/** Does this slave have regular contact with people other than you and your slaves?
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
globalThis.hasOutsideContact = function(slave) {
	/** @type {Job[]} */
	const jobsWithOutsideContact = [Job.BODYGUARD, Job.DJ, Job.MADAM, Job.ARCADE, Job.GLORYHOLE, Job.CLUB, Job.PUBLIC,
		Job.WHORE, Job.BROTHEL];
	if (V.recruiterTarget === "other arcologies") {
		jobsWithOutsideContact.push(Job.RECRUITER);
	}
	return jobsWithOutsideContact.includes(slave.assignment);
};

/** Once a new illness is rolled this determines how bad it is initially, chem levels seriously increase the chances of a higher initial value. Health also factors in with weakened slaves being more likely to catch ill.
 * @param {FC.HumanState} slave
 */
globalThis.getIll = function(slave) {
	const H = slave.health;
	if (V.week <= 8) {
		// new game protection: do not directly spawn any transmissible illnesses for the first 8 weeks
		H.illness = 1;
	} else {
		const illness = jsRandom(1, 6) + jsRandom(1, 6) + jsRandom(1, 6) - Math.trunc(slave.chem / 150) + Math.trunc(H.condition / 25);
		if (illness < 4) {
			H.illness = 5; // 0.5% chance
		} else if (illness < 5) {
			H.illness = 4; // 1.4% chance
		} else if (illness < 6) {
			H.illness = 3; // 2.7% chance
		} else if (illness < 8) {
			H.illness = 2; // 11.6% chance
		} else {
			H.illness = 1; // 83.8% chance
		}
	}
};

/** Reduce slave need if ill or tired
 * @param {FC.HumanState} slave
 * @returns {void}
 */
globalThis.poorHealthNeedReduction = function(slave) {
	if (slave.energy > 20) {
		slave.need = Math.trunc(slave.need * healthPenalty(slave));
	}
};

/**
 * A better nurse and/or fewer slaves/patients to look out for makes for a better chance of curing illness
 * @param {App.Entity.SlaveState} slave
 * @returns {number}
 */
globalThis.nurseEffectiveness = function(slave) {
	const H = slave.health;
	const clinicUpgrade = 1 + (V.clinicUpgradePathogenSequencer || 0);
	const clinicScreening = V.clinicRegularCheckups || 0;
	if (S.Nurse) {
		const nurseSkill = App.Data.Careers.Leader.nurse.includes(S.Nurse.career) ? 200 : S.Nurse.skill.nurse;
		let nurseEffectiveness = Math.trunc((nurseSkill * clinicUpgrade / Math.max((App.Entity.facilities.clinic.employeesIDs().size * 10 + (V.slaves.length * 2) * clinicScreening), 1)) * 20);
		if (H.illness > 1 && slave.assignment === Job.CLINIC) {
			if (nurseEffectiveness < 20) {
				return nurseEffectiveness;
			} else if (nurseSkill > 80) {
				return Math.min(nurseEffectiveness, 40);
			} else if (nurseSkill > 40) {
				return Math.min(nurseEffectiveness, 30);
			} else {
				return 20;
			}
		} else if (H.illness < 2 && (clinicScreening || slave.assignment === Job.CLINIC)) { // reasonably ill slaves get no benefit from the nurse unless they are in the clinic, otherwise she can provide benefits to prevent illness in the first place and clearing up illnesses of level 1
			nurseEffectiveness = Math.trunc(nurseEffectiveness / 4);
			if (nurseEffectiveness < 5) {
				return nurseEffectiveness;
			} else {
				return 5;
			}
		}
	}
	return 0;
};

/**
 * Run at the end of the week to take care of health changes
 * @param {FC.HumanState} slave
 * @returns {void}
 */
globalThis.endWeekHealthDamage = function(slave) {
	const H = slave.health;
	let illnessToCondition = 0;
	let chemToShort = 0;
	let chemToLong = 0;
	let shortRecovery = 0;
	let shortToCondition = 0;
	let shortToLong = 0;

	// Checking if we are dealing with the player
	// Player is the testbed for a new long/short damage system
	if (slave.ID !== -1) {
		// dealing with carcinogens
		// They decay naturally at a rate of 10%, but at as they decay cause short term damage
		if (slave.chem > 0) {
			if (slave.chem > 10) {
				chemToShort += Math.max(Math.trunc(slave.chem * 0.1), 1);
			} else if (slave.chem > jsRandom(0, 9)) {
				chemToShort += 1;
			}
			slave.chem -= chemToShort;
			H.shortDamage += Math.max(Math.trunc(chemToShort * 0.1), 2);
		}

		// dealing with illness
		if (H.illness > 0) {
			H.shortDamage += Math.trunc(Math.pow(H.illness, 1.52) * 3 + 2); // 5, 10, 17, 26, 36 points of damage per respective level of illness
		}

		// Long term damage due to age calculated on birthdays only
		if (slave.birthWeek === 0 && slave.physicalAge > 29) {
			H.longDamage += Math.trunc((slave.physicalAge - 25 + jsRandom(1, 15)) / 20);
		}

		// recovering and transferring short term damage to condition and long term
		if (H.shortDamage > 0) {
			shortToCondition += Math.max(Math.trunc(H.shortDamage * 0.5), 1); // 50% of short term damage gets transferred
			H.shortDamage -= shortToCondition;
			const assignment = slave.ID !== -1 ? asSlave(slave).assignment : null;
			if (assignment === Job.CLINIC) {
				H.shortDamage = Math.trunc(H.shortDamage * 0.5); // An additional 50% of short term damage reduction (75% total) for getting treatment in the clinic
			} else if (assignment === Job.REST || assignment === Job.SPA) {
				H.shortDamage = Math.trunc(H.shortDamage * 0.75); // An additional 25% of short term damage reduction (62.5% total) for resting
			}
			if (slave.curatives > 0 || slave.ID === -1) { // transferred damage is half if on preventatives/curatives or target is the player
				shortToCondition = Math.trunc(shortToCondition * 0.5);
			}
			if (assignment === Job.CLINIC) {
				shortToCondition = Math.trunc(shortToCondition * 0.75);
			}
			shortToLong += Math.trunc(shortToCondition * 0.1); // 10% of transferred damage gets added to long term damage, minimum of 20 short term damage before any long term damage is accumulated
			H.longDamage += shortToLong;
		}
		if (V.baseDifficulty === 1) { // Reducing longDamage up to a certain point depending on the difficulty
			if (H.longDamage > 0) {
				H.longDamage -= Math.min(Math.trunc(H.longDamage * 0.1), 1);
			}
		} else if (V.baseDifficulty === 2) {
			if (H.longDamage > 20) {
				H.longDamage -= Math.min(Math.trunc((H.longDamage - 20) * 0.1), 1);
			}
		} else if (V.baseDifficulty === 3) {
			if (H.longDamage > 40) {
				H.longDamage -= Math.min(Math.trunc((H.longDamage - 40) * 0.1), 1);
			}
		} else if (V.baseDifficulty === 4) {
			if (H.longDamage > 60) {
				H.longDamage -= Math.min(Math.trunc((H.longDamage - 60) * 0.1), 1);
			}
		}
	} else { // player
		slave = asPlayer(slave);
		// This is under heavy testing, especially long term damage. Chem contributes to death directly, so it must not overdo it through long term damage, while at the same time being something to keep in the back of ones mind when using unhealthy drugs.

		// dealing with illness
		// moved ahead of everything else to allow its major short term damage impact to make a bigger splash
		if (H.illness > 0) {
			illnessToCondition = Math.trunc(Math.pow(H.illness, 1.5) * (1 + H.shortDamage * 0.1) * (Math.max(H.longDamage * 0.01, 1)) + 2); // this needs extensive testing, but a healthy player should fight off the damage better than a weakened one. Every week will hit harder and harder due to damage impacts.
			H.condition -= illnessToCondition; // direct change, since we don't want to double-dip on damage.
			H.shortDamage += Math.trunc(Math.pow(H.illness, 1.52) * 3 + 2); // 5, 10, 17, 26, 36 points of damage per respective level of illness
			if (H.illness > 4) {
				H.longDamage++;
			}
		}

		// dealing with carcinogens
		// slave food aids in neutralization.
		// They decay naturally at a rate of 10%, but at as they decay cause short term damage,
		// and 1%, rounded down, to long term damage
		// Without it, it linearly slowly decays, adds 5% to short term damage, and 1%, rounded down, to long term damage
		if (slave.chem > 0) {
			if (!canEatFood(slave)) {
				if (slave.chem > 10) {
					chemToShort += Math.max(Math.trunc(slave.chem * 0.1), 1);
				} else if (slave.chem > jsRandom(0, 9)) {
					chemToShort += 1;
				}
				slave.chem -= chemToShort;
				H.shortDamage += Math.max(Math.trunc(chemToShort * 0.1), 2);
				chemToLong += Math.floor(slave.chem * 0.01);
				H.longDamage += chemToLong;
			} else {
				slave.chem = Math.clamp(slave.chem - 0.2, 0, 1000); // note that it lingers, causing issues
				chemToShort += Math.min(Math.max(Math.trunc(slave.chem * 0.05), 1), 5); // capped at 5 for now
				H.shortDamage += chemToShort;
				chemToLong += Math.trunc(slave.chem * 0.01);
				H.longDamage += chemToLong;
			}
		}

		// recovering and converting short term damage to long term
		if (H.shortDamage > 0) {
			// short term damage begins converting to long term damage at 20+
			shortToLong += Math.trunc(H.shortDamage * 0.05);
			H.longDamage += shortToLong;
			// short term damage reduces by half each week normally
			// 100+ long term damage begins to harm short term recovery
			// at 400+, your ability to heal properly is completely crippled
			// but, keep in mind, that short and long damage do not directly influence health, sans illness
			shortRecovery = Math.max(Math.trunc(H.shortDamage * (0.5 + Math.min(0.4, H.longDamage * 0.001))), 1);
			if (V.personalAttention.task === PersonalAttention.RELAX) {
				shortRecovery += 5;
			}
			if (V.PC.diet === PCDiet.MEDICINAL) {
				shortRecovery += 5;
			}
			H.shortDamage = Math.max(H.shortDamage - shortRecovery, 0);
		}

		// Reducing longDamage for easier difficulties
		if (H.longDamage > 0) {
			if (V.baseDifficulty === 1) {
				H.longDamage -= 0.3;
			} else if (V.baseDifficulty === 2) {
				H.longDamage -= 0.1;
			}
			H.longDamage = Math.max(H.longDamage, 0);
		}

		// Temporarily disabled for balancing. healthDamage() is causing too much shortDamage right now, need to think on things.
		H.longDamage = 0;
		H.shortDamage = 0;
		slave.chem = 0;

		// The player gets an automatic 5 condition recovery each week up to 100
		// relaxation and diet is handled in its respective locations
		H.condition = Math.min(H.condition + 5, 100);
	}
	if (V.disableLongDamage) {
		H.longDamage = 0;
	}

	// Making sure condition doesn't get too high
	if (H.condition > 150) {
		H.condition -= Math.trunc(Math.pow(H.condition - 150, 0.5));
	}

	updateHealth(slave);
};

/**
 * Health saving throw, to put it simply.
 * @param {App.Entity.SlaveState} slave
 * @returns {number}
 */
globalThis.healthCheck = function(slave) {
	const H = slave.health;
	return 50 + Math.floor(H.condition - (H.shortDamage / 2) - (H.longDamage / 10));
};

/**
 * Tells if a slave will willingly work to death
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
globalThis.willWorkToDeath = function(slave) {
	// More to come in the future
	if (slave.trust < -50) { // Maybe lower
		return true;
	} else if (slave.devotion > 50) {
		return true;
	} else if (slave.sexualFlaw === SexualFlaw.SELFHATING) {
		return true;
	} else if (slave.fetish === Fetish.MINDBROKEN) {
		return true;
	} else if (V.MadamID !== 0 && (slave.assignment === Job.BROTHEL || (slave.assignment === Job.WHORE && V.brothel > 0 && V.universalRulesFacilityWork === 1 && V.brothelSpots > 0))) {
		return true;
	} else if (S.DJ && (slave.assignment === Job.CLUB || (slave.assignment === Job.PUBLIC && V.club > 0 && V.universalRulesFacilityWork === 1 && V.clubSpots > 0))) {
		return true;
	}
	return false;
};

/**
 * Tells if a slave is taking the week off to rest
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
globalThis.slaveResting = function(slave) {
	if (slave.rules.rest === "cruel" && slave.health.tired > 90) {
		return true;
	} else if (slave.rules.rest === "restrictive" && slave.health.tired > 60) {
		return true;
	} else if (slave.rules.rest === "permissive" && slave.health.tired > 30) {
		return true;
	}
	return false;
};

/**
 * Run at the end of the week to take care of tiredness changes
 * @param {FC.ReportSlave} slave
 * @returns {void}
 */
globalThis.tired = function(slave) {
	const H = slave.health;
	let livingRules = 0;
	let restRules = 0;
	let assignment = 0;
	let reward = 0;
	let punishment = 0;
	// let muscles;
	// let health;
	let tiredChange;
	let spaFlag = 0;
	let dormPop = V.dormitoryPopulation - V.dormitory;

	if (!slave.fuckdoll) {
		// Assignment
		if ([Job.SPA].includes(slave.assignment)) {
			assignment -= 40 * (V.spaUpgrade + 1); // Reduces tired by an average of 40 points while in the spa, double with the upgraded spa
			if (S.Attendant) {
				let skillBonus;
				if (App.Data.Careers.Leader.attendant.includes(S.Attendant.career)) {
					skillBonus = 200;
				} else {
					skillBonus = S.Attendant.skill.attendant;
				}
				assignment -= Math.trunc(skillBonus / 10); // Maximum of 20 extra points of negative tiredness due to attendant skill
			}
		} else if ([Job.REST, Job.CLINIC].includes(slave.assignment)) {
			assignment -= 40; // Major tired reduction due to a solid week of rest
		} else if ([Job.BODYGUARD].includes(slave.assignment)) {
			assignment += 18; // A tough assignment with a girl that doesn't use her provided room unless it is attached to yours.
		} else if ([Job.HEADGIRL].includes(slave.assignment)) {
			if (slaveResting(slave)) {
				assignment -= 40;
				slave.slaveUsedRest = 1;
			} else {
				assignment += 22; // Always busy. Could benefit from a helper...
			}
		} else if (App.Data.misc.facilityHeads.includes(slave.assignment)) { // Heads are very busy, but always have luxurious conditions, so it balances out, save for the exceptions
			if (slaveResting(slave)) {
				assignment -= 10;
				slave.slaveUsedRest = 1;
			} else {
				assignment += 15;
			}
		} else if ([Job.ATTENDANT, Job.CONCUBINE].includes(slave.assignment)) { // Cushy head positions
			assignment += 5;
		} else if ([Job.RECRUITER].includes(slave.assignment)) {
			if (H.tired > 80) { // I'll take it easy a week to better recruit the next.
				assignment -= 20;
			} else {
				assignment += 10;
			}
		} else if ([Job.HEADGIRLSUITE].includes(slave.assignment)) {
			if (slave.health.tired > 60) {
				assignment += 2;
			} else if (slave.devotion > 20) {
				assignment += 5;
			} else {
				assignment += 10;
			}
		} else if ([Job.SUBORDINATE].includes(slave.assignment)) {
			if (slaveResting(slave)) {
				assignment -= 20;
				slave.slaveUsedRest = 1;
			} else if (slave.subTarget === -1) {
				if (slave.health.tired + 5 >= 90 && !willWorkToDeath(slave)) {
					assignment += 1;
				} else if (slave.devotion > 20) {
					assignment += 3;
				} else {
					assignment += 5;
				}
			} else if (slave.subTarget === 0) {
				if (slave.devotion > 20) {
					assignment += 7;
				} else {
					assignment += 10;
				}
				assignment = Math.min(Math.ceil(assignment / App.EndWeek.saVars.subSlaveRatio), 50); // up to 50 if very overloaded, make sure to have enough girls serving!
			} else {
				if (slave.relationshipTarget === slave.subTarget && slave.health.tired > 60) {
					assignment += 2;
				} else if (slave.health.tired + 10 >= 90 && !willWorkToDeath(slave)) {
					assignment += 1;
				} else if (slave.devotion > 20 || slave.relationshipTarget === slave.subTarget) {
					assignment += 5;
				} else {
					assignment += 10;
				}
			}
		} else if ([Job.DAIRY].includes(slave.assignment)) {
			if (V.dairyRestraintsSetting > 1) {
				assignment -= 100; // Full industrial Dairy is mind dulling (leaving the stupor is devastating)
			} else if (V.dairyRestraintsSetting > 0) {
				// Restraining while milking is a little stressful
				// Additional invasions multiply it
				if (slaveResting(slave)) {
					assignment -= 20;
					slave.slaveUsedRest = 1;
				} else if (slave.health.tired + 9 >= 90 && !willWorkToDeath(slave)) {
					assignment += 2;
				} else if (slave.devotion > 20) {
					assignment += 4;
				} else {
					assignment += 9;
				}
				if (slave.balls > 0) {
					assignment += 1;
				}
				assignment *= 1 + (V.dairyFeedersSetting + V.dairyStimulatorsSetting + V.dairyPregSetting);
			} else { // Being a free-range cow is relatively relaxing
				if (slaveResting(slave)) {
					assignment -= 40;
					slave.slaveUsedRest = 1;
				} else if (slave.health.tired + 5 >= 90 && !willWorkToDeath(slave)) {
					assignment += 2;
				} else if (slave.devotion > 20) {
					assignment -= 5;
				} else {
					assignment += 5;
				}
				if (slave.balls > 0) {
					assignment += 1;
				}
			}
		} else if ([Job.MILKED].includes(slave.assignment)) {
			if (slaveResting(slave)) {
				assignment -= 5;
				slave.slaveUsedRest = 1;
			} else if (slave.health.tired + 8 >= 90 && !willWorkToDeath(slave)) {
				assignment += 1;
			} else if (slave.devotion > 20) {
				assignment += 2;
			} else {
				assignment += 8;
			}
			if (slave.balls > 0) {
				assignment += 1;
			}
		} else if ([Job.CELLBLOCK, Job.CONFINEMENT].includes(slave.assignment)) { // Generally not tiring unless a Wardeness is present, in which case she uses sleep deprivation to break slaves.
			if (slave.assignment === Job.CELLBLOCK && V.WardenessID !== 0 && slave.fetish !== Fetish.MINDBROKEN) {
				if (S.Wardeness.fetish === Fetish.MINDBROKEN) {
					if (H.tired > 80) {
						assignment -= 8;
					} else {
						assignment += 40;
					}
				} else if (S.Wardeness.sexualQuirk === SexualQuirk.CARING) {
					assignment += 5;
				} else if (S.Wardeness.sexualFlaw === SexualFlaw.MALICIOUS || S.Wardeness.sexualFlaw === SexualFlaw.ABUSIVE) {
					if (H.condition > 20) {
						assignment += 40;
					} else if (H.tired > 80) {
						assignment -= 8;
					} else {
						assignment += 20;
					}
				} else if (H.tired > 50) {
					assignment -= 8;
				} else if (H.tired <= 30) {
					assignment += 33;
				} else {
					assignment += 20;
				}
			} else {
				assignment -= 8;
			}
		} else if ([Job.ARCADE].includes(slave.assignment)) {
			assignment += 35;
			if (V.arcadeUpgradeHealth === 2) {
				assignment -= 60;
			} else if (V.arcadeUpgradeHealth === 1) {
				assignment -= 30;
			}
		} else if ([Job.GLORYHOLE, Job.FARMYARD].includes(slave.assignment)) { // Hard assignments
			if (slaveResting(slave)) {
				assignment -= 20;
				slave.slaveUsedRest = 1;
			} else if (slave.health.tired + 20 >= 90 && !willWorkToDeath(slave)) {
				assignment += 1;
			} else if (slave.devotion > 20) {
				assignment += 15;
			} else {
				assignment += 20;
			}
		} else if (App.Data.misc.whoringAssignments.includes(slave.assignment)) { // Moderate assignments
			if (slaveResting(slave)) {
				assignment -= 20;
				slave.slaveUsedRest = 1;
			} else if (slave.health.tired + 15 >= 90 && !willWorkToDeath(slave)) {
				assignment += 1;
			} else if (slave.devotion > 20) {
				assignment += 10;
			} else {
				assignment += 15;
			}
		} else if ([Job.FUCKTOY, Job.HOUSE, Job.QUARTER].includes(slave.assignment)) { // Easy assignments
			if (slaveResting(slave)) {
				assignment -= 20;
				slave.slaveUsedRest = 1;
			} else if (slave.health.tired + 11 >= 90 && !willWorkToDeath(slave)) {
				assignment += 1;
			} else if (slave.devotion > 20) {
				assignment += 7;
			} else {
				assignment += 11;
			}
		} else if ([Job.SCHOOL, Job.CLASSES, Job.MASTERSUITE].includes(slave.assignment)) { // Trivial assignments
			if (slave.health.tired > 80) {
				assignment += 2;
			} else if (slave.devotion > 20) {
				assignment += 2;
			} else {
				assignment += 5;
			}
		}

		// Living Conditions
		if ((slave.assignment === Job.BODYGUARD && V.dojo === 2) || (slave.assignment === Job.HEADGIRL && V.HGSuite === 1)) {
			livingRules -= 20;
		} else if (slave.assignment === Job.BODYGUARD) {
			livingRules -= 6; // Remove maybe?
		} else if (slave.rules.living === "luxurious") {
			livingRules -= 15;
		} else if (slave.rules.living === "spare") {
			livingRules -= 2; // Barely reduce tiredness while sleeping in spare conditions
			if (dormPop > 10) { // Overcrowding penalty
				livingRules += 12;
			} else if (dormPop > 5) {
				livingRules += 7;
			}
		} else {
			livingRules -= 10;
			if (dormPop > 10) { // Overcrowding penalty
				livingRules += 15;
			} else if (dormPop > 5) {
				livingRules += 10;
			}
		}

		// Rewards
		if (slave.rules.reward === "drugs") {
			reward -= 4;
		} else if (slave.rules.reward === "relaxation") {
			if (V.spaSpots > 0) {
				reward -= 7;
				spaFlag = 1;
			} else {
				reward -= 5;
			}
		} else if (slave.rules.reward === "situational") {
			if (V.spaSpots > 0) {
				reward -= 4;
				spaFlag = 1;
			} else {
				reward -= 3;
			}
		}
		if (slave.devotion > 50) { // Considering how often the slave gets rewarded
			reward *= 3;
		} else if (slave.devotion > 20) {
			reward *= 2;
		} else if (slave.devotion < -20 || slave.trust >= -20) {
			reward = 0;
		}
		if (spaFlag) {
			V.spaSpots -= Math.abs(reward); // Reducing the available space in the spa depending on how often the slave can be found there
		}
		if (reward > 0) {
			if (spaFlag) {
				reward *= V.spaUpgrade + 1;
			}
		}

		// Punishments
		if (slave.rules.reward === "confinement" && V.cellblock !== 0) {
			punishment -= 2;
		}
		if (slave.devotion > 50) { // Considering how often the slave gets punished
			punishment = 0;
		} else if (slave.devotion >= -20) {
			if (slave.trust >= -20) {
				punishment *= 2;
			}
		} else {
			if (slave.trust >= -50) {
				punishment *= 3;
			}
		}

		/* Disabled for balancing
		// Muscles
		if (slave.muscles < 0) {
			muscles = -Math.trunc((slave.muscles / 10) * (1 + normalRandInt(0, 5) / 100)); // Being weak increases tiredness, building muscles eventually reduces tiredness
		} else {
			muscles = -Math.trunc(5 * (1 + normalRandInt(0, 5) / 100)); // Muscle benefits max out at 50
		}

		// Health
		health = Math.trunc((H.shortDamage / 2 - H.condition / 10) * (1 + normalRandInt(0, 5) / 100)); // Current condition reduces tiredness, health damage increases tiredness
		if (slave.assignment === Job.REST || slave.assignment === Job.CLINIC || slave.assignment === Job.SPA) {
			health = Math.max(0, health); // break vicious cycle - no additional tiredness accumulates from bad health for slaves assigned to rest
		}
		*/

		// Add advanced pregnancy/high .bellyPreg (it is either caused by an advanced pregnancy or high multiples, both draining) tiredness gain gated under preg effects
		// Add pregnancy speed up effects

		// day of rest
		if (slave.rules.rest === "mandatory") {
			if ([Job.GLORYHOLE, Job.FARMYARD, Job.CLUB, Job.PUBLIC, Job.WHORE, Job.BROTHEL, Job.SUBORDINATE, Job.HOUSE,
				Job.QUARTER, Job.FUCKTOY, Job.MASTERSUITE,
				Job.MILKED].includes(slave.assignment) || (V.dairyRestraintsSetting < 2 && slave.assignment === Job.DAIRY)) {
				restRules -= 20;
			}
		}

		tiredChange = livingRules + assignment + restRules + reward + punishment; // + muscles + health
		H.tired += tiredChange;

		// HG special cases
		if (slave.assignment === Job.HEADGIRL) {
			if (App.EndWeek.saVars.HGSlaveSuccess) {
				H.tired -= 5;
			}
			if (V.personalAttention.task === PersonalAttention.SUPPORT_HG && !onBedRest(V.PC, true)) {
				H.tired -= 10;
			}
		}
	} else {
		// fuckdolls get a static tiredness drop due to drugs and suit control
		H.tired -= 30;
	}
	H.tired = Math.clamp(H.tired, 0, 100);
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {number} [exhaustion=0]
 * @returns {number}
 */
globalThis.restEffects = function(slave, exhaustion = 0) {
	// exhaustion holds the weekly .tired gain from the assignment.
	if (!slave.fuckdoll) {
		if (slave.rules.rest === "mandatory") {
			return 0.86;
		} else if (slaveResting(slave)) {
			if (slave.assignment === window.Job.HOUSE || slave.assignment === window.Job.QUARTER || window.Job.SUBORDINATE || window.Job.FARMER || window.Job.STEWARD) {
				return 0.60;
			} else {
				return 0.25;
			}
		} else if (slave.health.tired + exhaustion >= 90 && !willWorkToDeath(slave)) {
			return 0.10;
		} else {
			return healthPenalty(slave);
		}
	}
	return 1;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {void}
 */
globalThis.tiredFucks = function(slave) {
	if (!slave.fuckdoll) {
		let acceptance = 0;
		acceptance += Math.trunc(slave.energy / 10);
		acceptance -= Math.trunc((slave.intelligence + slave.intelligenceImplant) / 10);
		if (slave.fetish === Fetish.MASOCHIST || slave.fetish === Fetish.HUMILIATION) {
			acceptance += Math.trunc(slave.fetishStrength / 10);
		}

		let tiredMulti = 1;
		if (slave.assignment === Job.GLORYHOLE) {
			tiredMulti *= 0.5;
		}
		if ((acceptance > 20 && slave.devotion > 20) || slave.sexualFlaw === SexualFlaw.SELFHATING) {
			tiredMulti *= 0.5;
		}
		slave.health.tired += Math.trunc(slave.sexAmount * (1 + normalRandInt(0, 5) / 100) * (1 / 25) * tiredMulti);
	}
};
