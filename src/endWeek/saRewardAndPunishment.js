/** Administer rewards and punishments for the slave
 * @param {App.Entity.SlaveState} forSlave
 * @returns {string}
 */
App.SlaveAssignment.rewardAndPunishment = function rewardAndPunish(forSlave) {
	/** @type {string[]} */
	const r = [];

	const slave = forSlave;
	const {He, he, His, his, him, himself} = getPronouns(slave);

	let rewards = 0;
	let punishments = 0;
	let combinedText = false;

	if (slave.assignment === Job.CLINIC && random(-200, 200) < slave.health.health) {
		r.push(`${He} does not feel up to doing much, so ${he} needs neither rewards nor punishments this week.`);
	} else {
		const you = (slave.assignment !== Job.HEADGIRLSUITE) ? `you` : `you and ${S.HeadGirl.slaveName}`;
		if (slave.devotion > 50) {
			r.push(`${He} does ${his} best for ${you}, so ${he} frequently deserves a reward and never needs to be punished.`);
			punishments = 0;
			rewards = 3;
		} else if (slave.devotion > 20) {
			r.push(`${He}'s obedient out of acceptance of ${his} place, so ${he} often deserves a reward and rarely needs to be punished.`);
			punishments = 1;
			rewards = 2;
		} else if (slave.devotion >= -20) {
			if (slave.trust < -20) {
				r.push(`${He}'s obedient out of fear, so ${he} only rarely deserves a reward and sometimes needs to be punished.`);
				punishments = 1;
				rewards = 1;
			} else {
				r.push(`${He}'s too trusting for obedience and often needs to be punished.`);
				punishments = 2;
				rewards = 0;
			}
		} else {
			if (slave.trust < -50) {
				r.push(`${He}'s only obedient out of terror, so ${he} sometimes needs to be punished.`);
				punishments = 1;
				rewards = 0;
			} else {
				r.push(`${He} hates ${you} too much to obey, so ${he} needs constant punishment.`);
				punishments = 3;
				rewards = 0;
			}
		}
	}

	combinedText = (slave.rules.reward === slave.rules.punishment) && rewards > 0 && punishments > 0;
	if (rewards > 0) {
		r.push(...reward(slave, slave.rules.reward));
	}
	if (punishments > 0) {
		r.push(...punish(slave, slave.rules.punishment));
	}
	return r.join(' ');

	/**
	 * @param {FC.SlaveState} slave
	 * @param {"relaxation" | "drugs" | "orgasm" | "situational" | "confinement"} type
	 * @returns {string[]}
	 */
	function reward(slave, type) {
		/** @type {string[]} */
		const r = [];
		switch (type) {
			case "relaxation":
				r.push(`${He}'s given free time, which ${he}`);
				if (slave.assignment === Job.CLINIC) {
					r.push(`spends with the amenities present in ${V.clinicName} for recovering slaves to pass the time.`);
				} else if (slave.assignment === Job.ATTENDANT) {
					r.push(`usually spends soaking in a hot bath or enjoying the amenities ${his} facility has to offer.`);
				} else if (slave.assignment === Job.CONCUBINE) {
					if (onBedRest(V.PC, true)) {
						r.push(`usually spends in bed with you, helping to ease your worries.`);
					} else if (V.spa !== 0) {
						r.push(`usually sets aside to spend with you in ${V.spaName}.`);
						if (App.EndWeek.saVars.poolJizz > ((S.Attendant && canSee(S.Attendant)) ? 5000 : 1000)) {
							if (V.PC.intelligence + V.PC.intelligenceImplant < 10 || !canSee(V.PC)) { // Free swimming sperm do not respect chastity.
								let sperm;
								if (isFertile(slave) && slave.preg !== -1) {
									sperm = weightedRandom(App.EndWeek.saVars.poolJizzers);
									if (canBreed(slave, getSlave(sperm.ID))) {
										knockMeUp(slave, 25, 2, sperm.ID);
									}
								}
								if (isFertile(V.PC) && V.PC.preg !== -1) {
									sperm = weightedRandom(App.EndWeek.saVars.poolJizzers);
									if (canBreed(V.PC, getSlave(sperm.ID))) {
										knockMeUp(V.PC, 25, 2, sperm.ID);
									}
								}
							}
						}
					} else {
						r.push(`usually spends relaxing with you.`);
					}
				} else if (V.spa !== 0) {
					const where = (slave.assignment !== Job.SPA || slave.breedingMark) ? V.spaName : `a private bath`;
					const attendant = S.Attendant ? `, enjoying ${S.Attendant.slaveName}'s care` : ``;
					r.push(`usually spends in ${where}${attendant}.`);
					if (slave.assignment !== Job.SPA && slave.breedingMark === 0 && App.EndWeek.saVars.poolJizz > ((S.Attendant && canSee(S.Attendant)) ? 5000 : 1000)) {
						if (slave.fetish === Fetish.CUMSLUT && (canSee(slave) || canTaste(slave) || canSmell(slave))) {
							r.push(`As an added bonus, ${he} gets to soak in a pool teeming with live sperm; <span class="hotpink">what luck!</span>`);
							slave.devotion++;
						}
						if (isFertile(slave) && slave.preg !== -1) { // Free swimming sperm do not respect chastity.
							const sperm = weightedRandom(App.EndWeek.saVars.poolJizzers);
							if (canBreed(slave, getSlave(sperm.ID))) {
								knockMeUp(slave, 25, 2, sperm.ID);
							}
							if (slave.sexualFlaw === SexualFlaw.BREEDER && (canSee(slave) || canTaste(slave) || canSmell(slave))) {
								r.push(`${He} finds the ropes of cum swarming ${his} loins <span class="hotpink">a nice touch.</span>`);
								slave.devotion++;
							}
						}
					}
				} else if (slave.assignment === Job.MASTERSUITE) {
					r.push(`usually spends relaxing on ${his} favorite pillow.`);
				} else if (slave.assignment === Job.HEADGIRLSUITE) {
					r.push(`usually spends relaxing in your Head Girl's private room.`);
				} else if (slave.rules.living === "luxurious") {
					let roomActivity = '';
					if (slave.assignment === Job.NURSE) {
						roomActivity = ` amusing ${himself} with the amenities for recovering slaves`;
					} else if (slave.assignment === Job.WARDEN && App.Entity.facilities.cellblock.employeesIDs().size > 0) {
						roomActivity = ` teaching a disobedient slave how to properly use their mouth`;
					} else if (slave.assignment === Job.TEACHER && App.Entity.facilities.schoolroom.employeesIDs().size > 0) {
						roomActivity = ` giving private lessons to a student`;
					} else if (slave.assignment === Job.STEWARD && App.Entity.facilities.servantsQuarters.employeesIDs().size > 0) {
						roomActivity = ` while enjoying some service from ${his} underlings`;
					} else if (slave.assignment === Job.MILKMAID && App.Entity.facilities.dairy.employeesIDs().size > 0) {
						roomActivity = ` with the softest cow available`;
					} else if (slave.assignment === Job.FARMER && App.Entity.facilities.farmyard.employeesIDs().size > 0) {
						roomActivity = ` with the softest cow available`; // FIXME: needs improvement
					} else if (canSee(slave) && (slave.intelligence + slave.intelligenceImplant > 50)) {
						roomActivity = ` reading books`;
					} else if (canSee(slave) && canHear(slave)) {
						roomActivity = ` watching television`;
					} else if (canSee(slave)) {
						roomActivity = ` reading magazines`;
					} else if (canHear(slave)) {
						roomActivity = ` listening to music`;
					}
					r.push(`usually spends relaxing in ${his} private room${roomActivity}.`);
				} else if (slave.assignment === Job.SCHOOL) {
					r.push(`usually spends relaxing in ${his} dorm room.`);
				} else {
					r.push(`usually spends relaxing in the slave quarters.`);
				}
				if (slave.relationship > 0) {
					r.push(`${He} often asks to save these breaks so ${he} can spend them with ${his} ${relationshipTerm(slave)}.`);
				}
				r.push(`These breaks are <span class="health inc">good for ${him}.</span>`);
				improveCondition(slave, rewards);
				return r;

			case "drugs":
				r.push(`${He}'s <span class="hotpink">rewarded</span> with hits of mild recreational drugs, which <span class="health dec">isn't healthy,</span> but helps bind ${him} to you strongly.`);
				if ([Job.CLUB, Job.PUBLIC].includes(slave.assignment)) {
					r.push(`${His} patrons don't complain either.`);
				}
				healthDamage(slave, rewards);
				slave.devotion += rewards * 2;
				return r;

			case "orgasm":
				r.push(`${He}'s <span class="hotpink">rewarded</span> with`);
				if (slave.piercing.genitals.smart) {
					r.push(`sustained orgasm from ${his}`);
					if (slave.dick === 0) {
						r.push(`clit`);
					} else {
						r.push(`dick`);
					}
					r.push(`piercing,`);
					if (slave.assignment === Job.CLUB) {
						r.push(`often on stage during a dance,`);
					}
				} else if ([Job.CONCUBINE, Job.MASTERSUITE, Job.FUCKTOY].includes(slave.assignment)) {
					if (slave.rules.release.master) {
						r.push(`immediate sex with you,`);
						seX(slave, canDoVaginal(slave) ? "vaginal" : "anal", V.PC);
					} else {
						r.push(`an orgasm directly from the hand of ${his} ${getWrittenTitle(slave)},`);
					}
				} else if (slave.rules.release.slaves === 1) {
					r.push(`immediate sex with any nearby slave,`);
					seX(slave, canDoVaginal(slave) ? "vaginal" : "anal", "slaves");
				} else {
					r.push(`a quick climax from a vibrator,`);
				}
				r.push(`<span class="libido inc">boosting ${his} libido.</span>`);
				if (slave.energy < 98) {
					slave.energy += rewards;
				}
				slave.need -= (rewards * 10);
				slave.devotion += rewards;
				return r;

			case "situational":
				r.push(`${He}'s <span class="hotpink">rewarded</span>`);
				if (combinedText) {
					r.push(`and <span class="gold">punished</span>`);
				}
				r.push(`situationally, letting ${him} develop normally.`);
				slave.devotion += rewards;
				return r;
		}
	}

	/**
	 * @param {FC.SlaveState} slave
	 * @param {"confinement" | "whipping" | "chastity" | "situational"} type
	 * @returns {string[]}
	 */
	function punish(slave, type) {
		/** @type {string[]} */
		const r = [];
		switch (type) {
			case "confinement":
				r.push(`When ${he} disobeys,`);
				if (slave.assignment === Job.CLINIC) {
					r.push(`${he} spends ${his} time <span class="gold">strapped</span> to ${his} bed until ${he} behaves.`);
				} else if (slave.assignment === Job.DAIRY) {
					r.push(`${he} spends ${his} time <span class="gold">getting milked in a cramped dark stall</span> until ${he} behaves.`);
				} else if (V.cellblock !== 0) {
					if (slave.assignment === Job.CELLBLOCK) {
						r.push(`${he} <span class="gold">spends ${his} day in solitary.</span>`);
					} else if (slave.assignment === Job.SCHOOL) {
						r.push(`${he} <span class="gold">is assigned detention after school in ${V.cellblockName}</span>${S.Wardeness ? `, where ${he} can experience ${S.Wardeness.slaveName}'s teaching methods` : ``}.`);
					} else if (slave.assignment === Job.QUARTER) {
						r.push(`${he} <span class="gold">spends ${his} day (and night) cleaning the cells in ${V.cellblockName}</span>${S.Wardeness ? `, where ${he} can experience ${S.Wardeness.slaveName}'s tender mercies` : ``}.`);
					} else {
						r.push(`${he} <span class="gold">spends ${his} off hours in ${V.cellblockName}</span>${S.Wardeness ? `, where ${he} can experience ${S.Wardeness.slaveName}'s tender mercies` : ``}.`);
					}
				} else {
					r.push(`${he} spends ${his} off hours <span class="gold">shut up in a box</span> until ${he} behaves.`);
				}
				slave.trust -= punishments;
				return r;

			case "whipping":
				r.push(`When ${he} disobeys, ${he}'s`);
				if (slave.assignment === Job.SCHOOL) {
					r.push(`dragged to the front of the class and`);
				}
				r.push(`<span class="gold">whipped,</span> not hard enough to mark ${him}${slave.assignment === Job.CLINIC ? `or complicate ${his} stay` : ``}, but hard enough to <span class="health dec">hurt,</span> breaking ${him} quickly.`);
				healthDamage(slave, punishments);
				slave.trust -= 2 * punishments;
				return r;

			case "chastity":
				r.push(`When ${he} disobeys,`);
				if (slave.assignment === Job.BROTHEL) {
					r.push(`${he} finds ${his} next client is into <span class="gold">orgasm denial,</span>`);
				} else if (slave.assignment === Job.CLUB) {
					r.push(`${he} finds ${his} next dance to be both extremely sexual and <span class="gold">completely unsatisfying,</span>`);
				} else if (slave.assignment === Job.CELLBLOCK) {
					r.push(`${he}'s given a hit of mild aphrodisiacs and <span class="gold">left to squirm without release,</span>`);
				} else if (slave.assignment === Job.SCHOOL) {
					r.push(`${he}'s dragged to the front of the class for a lesson on edging. ${He} is kept <span class="gold">just shy of orgasm</span> for the rest of the day,`);
				} else if (slave.assignment === Job.QUARTER) {
					r.push(`${he} finds ${himself} cleaning up around an ongoing orgy, yet <span class="gold">forbidden from getting off,</span>`);
				} else if (slave.assignment === Job.DAIRY) {
					r.push(`${he} finds ${his} <span class="gold">milkings fewer and farther between,</span>`);
				} else {
					r.push(`${he}'s <span class="gold">denied</span> ${his} next orgasm,`);
				}
				r.push(`<span class="libido dec">reducing ${his} libido</span> but breaking ${him} to <span class="hotpink">sexual obedience.</span>`);
				if (slave.energy > 2) {
					slave.energy -= 2 * punishments;
				}
				slave.devotion += punishments;
				slave.trust -= punishments;
				return r;

			case "situational":
				if (!combinedText) {
					r.push(`When ${he} disobeys, ${he}'s <span class="gold">punished</span> situationally, letting ${him} develop normally.`);
				}
				slave.trust -= punishments;
				return r;
		}
	}
};
