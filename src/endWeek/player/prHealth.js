// This file calls functions from /src/endWeek/healthFunctions.js
App.EndWeek.Player.health = function(PC = V.PC) {
	const r = [];
	const PCH = PC.health;

	PC.chem = Math.clamp(PC.chem - 0.01, 0, 1000);

	if (PC.diet !== PCDiet.MEDICINAL) {
		healthBlips();
	}
	illness();
	addiction();
	endWeekHealthDamage(PC);
	health();

	return r.join(" ");

	function healthBlips() {
		if (PC.chem > 5) {
			if (random(1, 220) < (PC.chem * 2) + PC.physicalAge - PC.health.condition) {
				healthDamage(PC, 5);
				switch (random(1, 10)) {
					case 1:
						r.push(`A bout of foreplay was interrupted when your partner discovered a small lump in your ${PC.boobs >= 300 ? "breast" : "chest"}. Your doctor removed it easily enough, <span class="cash">for a small fee,</span> with testing revealing it as benign.`);
						cashX(forceNeg(500), "PCmedical");
						break;
					case 2:
						r.push(`A bout of intense vertigo kept you stuck in bed, unwilling to move. Eventually the feeling passes on its own, just as suddenly as it arrived.`);
						break;
					case 3:
						r.push(`You spent the morning experiencing an unshakable sense of dread. Eventually the feeling passes on its own, just as suddenly as it arrived.`);
						break;
					case 4:
						r.push(`You're plagued by a series of severe headaches that are calmed easily enough by a dose of aspirin each.`);
						break;
					case 5:
						r.push(`You experience recurrent nausea each morning this week.`);
						if (PC.preg.isBetween(0, 4)) {
							if (PC.pregKnown === 0) {
								r.push(`It turns out <span class="pregnant">you're pregnant,</span> but it still didn't feel like ${PC.counter.birthsTotal > 0 ? "your morning sickness did last pregnancy" : "morning sickness to you"}.`);
								PC.pregKnown = 1;
							} else {
								r.push(`You have been experiencing morning sickness already, and this is not helping matters.`);
							}
						} else {
							r.push(`Your stomach is soothed with a little medication, but it was still unpleasant.`);
						}
						break;
					case 6:
						r.push(`You had trouble sleeping without taking anything before bed, several nights in a row.`);
						break;
					case 7:
						r.push(`After a vigorous lovemaking session, you discover your heart rate is not coming down. A minor dose of medication resolves it, but it was still alarming.`);
						break;
					case 8:
						r.push(`Much to your dismay, you discover that your blood isn't clotting properly. Eventually the cut stops bleeding on its own, but it does not bode well should anything worse happen to you.`);
						break;
					case 9:
						r.push(`You've developed several ugly little ${PC.skin} skin tags. The autosurgery has everything you need to trivially remove them, but they are still annoying.`);
						break;
					default:
						r.push(`Often you just feel wrong for a short spell before recovering.`);
				}
				r.push(`This likely was <span class="health dec">a side effect</span> of some treatment you've undergone.`);
			}
		}

		if (PC.weight > 190) {
			r.push(`Your extreme obesity <span class="health dec">directly impacts</span> your health, but since you let yourself get this large, it's not really that bothersome.`);
			healthDamage(PC, 2);
			if (random(1, 100 + PC.health.condition) < 5) {
				r.push(`Unfortunately, this week ushered in <span class="health dec">severe health complications</span> related to it. After extensive, <span class="cash">and very costly,</span> heart surgery, your life was saved, though you'd better set aside some ¤ for when it happens again.`);
				cashX(forceNeg(15000), "PCmedical");
				healthDamage(PC, 80);
			}
		} else if (PC.weight > 160) {
			if (random(1, 150 + PC.health.condition) < 5) {
				r.push(`Your obesity has brought <span class="health dec">severe health complications</span> upon you this week. They required extensive, <span class="cash">and costly,</span> surgery to correct, so it may be time to pay more mind to your wellbeing.`);
				cashX(forceNeg(5000), "PCmedical");
				healthDamage(PC, 40);
			}
		} else if (PC.weight > 130) {
			if (random(1, 175 + PC.health.condition) < 5) {
				r.push(`Your weight caused you some <span class="health dec">severe health complications</span> this week. They passed after some time, but are rather concerning.`);
				healthDamage(PC, 20);
			}
		} else if (PC.weight > 95) {
			if (random(1, 200 + PC.health.condition) < 5) {
				r.push(`Your weight caused you some <span class="health dec">minor health complications</span> this week. It passed quickly enough, and shouldn't be a real problem.`);
				healthDamage(PC, 5);
			}
		}
	}

	function illness() {
		const sicknessDegree = ["fine", "minor illness", "illness", "bad illness", "severe illness", "life-threatening illness"];

		if (PCH.illness > 0) {
			r.push(`You are`);
			if (PCH.illness > 4) {
				r.push(`deathly`);
			} else if (PCH.illness > 3) {
				r.push(`seriously`);
			} else if (PCH.illness < 2) {
				r.push(`slightly`);
			} else {
				r.push(`visibly`);
			}
			r.push(`ill,`);
			if (PCH.illness > 1) {
				r.push(`limiting your social interactions.`);
			} else {
				r.push(`but not badly enough to impede your socializing.`);
			}
		}

		const roll = random(1, 100); // high rolls are good
		let bonuses = 20; // bonus for living conditions and skills
		if (PC.skill.medicine >= 40) {
			bonuses += 10;
		}
		if (PC.diet === PCDiet.MEDICINAL) {
			bonuses += 10;
		}
		if (V.personalAttention.task === PersonalAttention.RELAX) {
			bonuses += 10;
		}

		if (roll < 2 && canCatchIllness(PC)) { // Always a 2% per week base chance of you, even in otherwise-safe conditions, spontaneously catching an illness
			getIll(PC);
			r.push(`You wake up to a sore throat and a runny nose; <span class="health dec">you've fallen ill.</span>`);
			if (PCH.illness > 4) {
				r.push(`You can barely move, and as you feel the vomit coming, there is nothing you can do to stop it. When you come back to your senses, you're horrified to discover you've coated yourself in your own disgorged blood.`);
			} else if (PCH.illness > 3) {
				r.push(`All you manage to do is roll to the side of the bed and vomit all over the floor before having to stop to regain some strength. Moving to clean yourself up is agonizing, and all you want is to go back to bed.`);
			} else if (PCH.illness > 2) {
				r.push(`It's a struggle to get out of bed, and you barely manage to make it to the bathroom before the vomit escapes you.`);
			} else if (PCH.illness > 1) {
				r.push(`It's a struggle to get out of bed, but you manage.`);
			} else {
				r.push(`It doesn't feel that bad, though.`);
			}
		} else if (roll < 6 && PCH.illness > 0) { // Always a 5% chance of feeling worse
			PCH.illness += 1 + Math.trunc((PC.chem / 10 + random(1, 50) + 15) / 100); // Illness progresses with 1, unless chem > 350, then there's a chance for 2
			r.push(`You feel worse by week's end <span class="health dec">as your illness progresses.</span>`);
			if (PCH.illness > 5) {
				healthDamage(PC, 20 * (PCH.illness - 5)); // Condition penalty for going over maximum illness, very dangerous
				PCH.illness = 5;
				r.push(`You feel your consciousness start to fade, and the last thing you remember is projectile vomiting a large amount of blood across the room. You awake surrounded by terrified slaves, <span class="health dec">unsure if you are alive or not and unwilling to approach you to find out,</span> lest they risk catching whatever it is that got you.`);
			}
		} else if (roll > 95 && PCH.illness > 0) { // Always a 5% chance of getting better
			PCH.illness -= 1;
			if (PCH.illness === 0) {
				improveCondition(PC, 5);
				r.push(`You feel better; <span class="health inc">it seems you've gotten over what ailed you.</span>`);
			} else {
				r.push(`You're not feeling yourself yet, but <span class="health inc">your illness has waned</span> slightly.`);
			}
		} else {
			const ageModifier = Math.min(PC.physicalAge - 15, 0); // always negative (-15 to 0); younger kids are slightly more likely to get sick
			const healthAdjusted = PCH.condition - (PCH.longDamage * 0.5) - (PCH.shortDamage * 1.5) * 1.25 + ageModifier; // -125~ to +125~, before weakness kicks in
			const healthFactor = Math.clamp(1 + bonuses / healthAdjusted, 0.5, 1.5); // 0.5 to 1.5

			if (V.debugMode) {
				r.push(`(Illness factors: health ${healthFactor}${PCH.illness > 0 ? `; cure roll ${roll}` : ``})`);
			}

			// When ill, being in average health with a level 1 illness has a 60% chance of getting better the next week at complete default
			if (PCH.illness > 0 && roll > (30 + (PCH.illness * 10)) / (healthFactor)) {
				PCH.illness -= 1;
				r.push(`Your immune system <span class="health inc">pushes back</span> against your illness.`);
				if (PCH.illness === 0) {
					r.push(`It seems to have <span class="health inc">thoroughly beaten</span> whatever was ailing you.`);
				}
			} else if (canCatchIllness(PC)) {
				/** an adult in average condition in an otherwise unprotected environment (no drugs or modifiers) will have `baseChance` chance of catching an illness when exposed
				 * note the independent roll for each exposure; we're ignoring the original random roll here
				 * @param {number} baseChance
				 * @returns {boolean}
				 */
				const catchesIllness = (baseChance) => {
					const catchIll = random(1, 100);
					if (V.debugMode) {
						r.push(`(Transmission roll: ${catchIll} vs ${baseChance}*mods)`);
					}
					return catchIll < baseChance / (bonuses * healthFactor);
				};

				// PC is always in and out of the penthouse
				if (isMovable(PC)) {
					if (catchesIllness(5)) {
						getIll(PC);
						r.push(`You have picked up <span class="health dec">${addA(sicknessDegree[PCH.illness])}</span> while touring ${V.arcologies[0].name}; with all the people coming and going, it's not surprising that something easily transmissible can gain a foothold.`);
						if (PCH.illness > 2) {
							r.push(`Wandering around when you're this sick, however, is a serious public health risk given the population density, as well as just plain rude.`);
						}
					}
				}

				/* if you didn't/couldn't catch an illness outside, maybe you'll get one from your slaves
				 * You're most likely to catch something from your lover,
				 * followed by consorts,
				 * then personal attention targets,
				 * and lastly, anything in the penthouse.
				*/
				const sexPartners = V.slaves.filter(s => App.Utils.sexAllowed(PC, s) && isSlaveAvailable(s));
				const fucktoys = V.slaves.filter(s => [Job.FUCKTOY, Job.MASTERSUITE, Job.CONCUBINE].includes(s.assignment));
				const wives = V.slaves.filter(s => s.relationship === -3);
				if (PCH.illness === 0 && wives.length > 0) {
					for (const other of wives.filter(s => s.health.illness > 1)) {
						if (catchesIllness(20)) {
							PCH.illness = other.health.illness - 1; // reduced severity
							r.push(`${other.slaveName} is sick, and has <span class="health dec">passed ${addA(sicknessDegree[PCH.illness])} on</span> to you.`);
							break;
						}
					}
				}
				if (PCH.illness === 0 && fucktoys.length > 0) {
					for (const other of fucktoys.filter(s => s.health.illness > 1)) {
						if (catchesIllness(15)) {
							PCH.illness = other.health.illness - 1; // reduced severity
							r.push(`You have <span class="health dec">caught ${addA(sicknessDegree[PCH.illness])}</span> from your bedslave, ${other.slaveName}.`);
							break;
						}
					}
				}
				if (PCH.illness === 0 && V.personalAttention.task === PersonalAttention.TRAINING && V.personalAttention.slaves.length > 0 && !onBedRest(V.PC, true)) {
					for (const other of V.personalAttention.slaves.map(s => getSlave(s.ID)).filter(s => !!s && s.health.illness > 1)) {
						if (catchesIllness(20)) {
							PCH.illness = other.health.illness - 1; // reduced severity
							r.push(`You tried your best, but you ended up <span class="health dec">catching ${addA(sicknessDegree[PCH.illness])}</span> while training ${other.slaveName}.`);
							break;
						}
					}
				}
				if (PCH.illness === 0 && sexPartners.length > 0) {
					const contacts = 30; // limits max spread rate in large populations - you do try to avoid catching ill, after all
					for (const other of sexPartners.randomMany(contacts).filter(s => s.health.illness > 1)) {
						if (catchesIllness(5)) {
							PCH.illness = other.health.illness - 1; // reduced severity
							r.push(`You tried to avoid catching whatever is ailing ${other.slaveName}, but you still ended up <span class="health dec">with ${addA(sicknessDegree[PCH.illness])}.</span>`);
							break;
						}
					}
				}
			} else if (PCH.illness > 0) {
				if (random(1, 100) > 75 && PCH.illness === 1 && V.personalAttention.task !== PersonalAttention.RELAX && V.week > 8) {
					// independent 25% chance of getting worse if you have a level 1 illness, aren't treating it, AND already failed your recovery roll (i.e. you've spent more than one week sick)
					r.push(`You've ignored your minor illness, allowing it time to <span class="health dec">develop into something more threatening.</span>`);
					PCH.illness += 1;
				} else {
					r.push(`Your <span class="health dec">${sicknessDegree[PCH.illness]} takes its toll on your health.</span>`);
				}
				// note: health damage from continuing illness is deducted in endWeekHealthDamage
			}
		}
	}

	function health() {
		r.push(`Living such a lavish lifestyle has a <span class="health inc">positive effect on one's well-being${V.personalAttention.task === PersonalAttention.RELAX ? ", especially when focusing on rest and relaxation" : ""}.</span> Overall,`);
		if (PCH.condition < -90) {
			r.push(`<span class="red">you are on the brink of death`);
		} else if (PCH.condition < -50) {
			r.push(`you are in <span class="red">bad health`);
		} else if (PCH.condition < -20) {
			r.push(`you are in <span class="red">poor health`);
		} else if (PCH.condition <= 20) {
			r.push(`you are in <span class="yellow">average health`);
		} else if (PCH.condition <= 50) {
			r.push(`you are in <span class="green">good health`);
		} else if (PCH.condition <= 90) {
			r.push(`you are in <span class="green">great health`);
		} else {
			r.push(`you are the definition of <span class="green">perfect health`);
		}
		if (PCH.shortDamage >= 20) {
			r.push(r.pop() + `,</span>`);
			if (PCH.condition < -20) {
				r.push(`and`);
				if (PCH.shortDamage >= 50) {
					r.push(`have been <span class="red">incapacitated by your worsening condition.</span>`);
				} else if (PCH.shortDamage >= 20) {
					r.push(`are tormented by a <span class="red">general sense of malaise.</span>`); // tormented by malaise? General sense may be redundant here.
				}
			} else {
				r.push(`but`);
				if (PCH.shortDamage >= 50) {
					r.push(`your <span class="red">worsening condition</span> has caught up with you.`);
				} else if (PCH.shortDamage >= 20) {
					r.push(`a <span class="red">general sense of malaise</span> lingers over you.`); // a malaise? General sense may be redundant here.
				}
			}
		} else {
			r.push(r.pop() + `.</span>`);
		}
		if (V.debugMode) {
			r.push(`Your current health is ${PCH.condition}, with ${PCH.shortDamage} short term damage and ${PCH.longDamage} long term damage.`);
		}
	}

	function addiction() {
		if (PC.addict > 0) {
			if (PC.aphrodisiacs > 0) {
				PC.addict++;
			} else if (PC.inflationType === InflationLiquid.APHRO) {
				r.push(`You don't mind cutting back on the aphrodisiac pills when your gut is laden with the stuff.`);
			} else if (PC.addict < 2) {
				r.push(`You've finally <span class="cyan">kicked your aphrodisiac addiction.</span>`);
				PC.addict = 0;
			} else if (PC.drugs === "detox pills") {
				r.push(`The aphrodisiac substitute helps keep the cravings in check while slowly weaning you off the real drug.`);
				PC.addict -= 1;
			} else if (V.aphrodisiacUpgrade === 1 && !canEatFood(PC)) {
				r.push(`Substitutes produced by your advanced pharmaceutical fabricator allow you to skip the negative effects of aphrodisiac withdrawal while efficiently flushing them from your system.`);
				PC.addict -= 2;
			} else {
				r.push(`The effects of aphrodisiac withdrawal eat away at you, encouraging <span class="health dec">self-destructive behavior.</span>`);
				PC.addict -= 2;
				healthDamage(PC, 1 * Math.min(random(1, PC.addict), 10));
			}
		} else {
			if (PC.aphrodisiacs > 0) {
				if (random(1, 100) < 40 + (20 * PC.aphrodisiacs)) {
					r.push(`<span class="cyan">You've become addicted to aphrodisiacs.</span>`);
					PC.addict = 1;
				}
			}
		}
	}
};
