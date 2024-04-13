/**
 * @param {FC.ReportSlave} slave
 * @returns {string}
 */
App.SlaveAssignment.guardYou = function saGuardYou(slave) {
	/** @type {string[]} */
	const r = [];

	const {
		he, him, his, He, His
	} = getPronouns(slave);

	updateBGState(slave);
	jobPreface(slave);
	publicImpression(slave);
	jobEffects(slave);
	if (V.bodyguardTrains === 1) {
		trainReplacements(slave);
	}

	return r.join(" ");

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function jobPreface(slave) {
		r.push(`carries arms in your defense.`);
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function updateBGState(slave) {
		if (V.dojo > 1) {
			slave.rules.living = "luxurious";
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * TODO @Arkerthan
	 *      Sync with actual deadliness calculation
	 */
	function publicImpression(slave) {
		const pMod = App.SlaveAssignment.PartTime.efficiencyModifier(slave);

		if (slave.skill.combat > 30) {
			r.push(`${His} combat skills greatly increase ${his} deadliness.`);
		}

		if (App.Data.Careers.Leader.bodyguard.includes(slave.career)) {
			r.push(`${He} has experience in personal defense from before ${he} was a slave.`);
		} else if (slave.skill.bodyguard >= Constant.MASTERED_XP) {
			r.push(`${He} has experience in personal defense from working for you.`);
		} else {
			let max = 8 + (pMod * (slave.intelligence + slave.intelligenceImplant) / 15);
			if (!(V.dojo > 1)) {
				max /= 2;
			}
			const skillIncrease = jsRandom(1, Math.ceil(max));
			r.push(slaveSkillIncrease('bodyguard', slave, skillIncrease));
		}

		if (V.AgePenalty !== 0) {
			if (slave.physicalAge >= 100) {
				r.push(`${His} absurd age ravages ${him}, leaving ${him} toothless in more ways than one.`);
			} else if (slave.physicalAge >= 85) {
				r.push(`${His} extreme age binds ${him}, limiting what ${he} can do and take.`);
			} else if (slave.physicalAge >= 70) {
				r.push(`${His} advanced age frequently leaves ${him} winded.`);
			}
		}

		if (slave.muscles > 30 && slave.muscles <= 95) {
			r.push(`${He} is strong and powerful, yet quick and flexible.`);
		} else if (slave.muscles > 95 && slave.height >= 185) {
			r.push(`${His} huge muscles are an intimidating sight and, despite their massive size, ${he} is tall enough to use them effectively.`);
		} else if (slave.muscles > 95) {
			r.push(`${His} huge muscles are an intimidating sight, but are so big that they actually detract from ${his} combat effectiveness.`);
		} else if (slave.muscles > 5) {
			r.push(`${He} is reasonably fit, but not enough to significantly affect ${his} combat effectiveness.`);
		} else if (slave.muscles < -95) {
			r.push(`${He} can barely stand, let alone fight. A single shot from ${his} own weapon is liable to incapacitate ${him}, making ${him} an absolute travesty of a bodyguard.`);
		} else if (slave.muscles < -30) {
			r.push(`${He} tires from just standing, rendering ${him} both ineffective and embarrassing to have as your guard.`);
		} else if (slave.muscles < -5) {
			r.push(`${He} is rather unfit, enough to negatively impact ${his} combat effectiveness.`);
		}

		if (getLimbCount(slave, 6) > 1) {
			r.push(`The artificial muscles of ${his} cybernetic limbs increase ${his} strength and flexibility to enhance ${his} combat abilities and give ${him} the intimidating appearance of a super-soldier.`);
		} else if (getLimbCount(slave, 105) > 1) {
			r.push(`${His} tough combat limbs make ${him} an intimidating sight to behold.`);
		}

		if (slave.height >= 170) {
			r.push(`${His} height gives ${him} a reach advantage with ${his} sword.`);
		}

		if (slave.health.condition > 50) {
			r.push(`${His} shining health makes ${him} a better combatant.`);
		}

		if (slave.boobs > 4000) {
			r.push(`${His} titanic tits are a terrible hindrance in actual fighting.`);
		} else if (slave.boobs > 2000) {
			r.push(`${His} big breasts get in ${his} way and reduce ${his} efficiency.`);
		}

		if (slave.dick >= 10) {
			r.push(`${His} massive dick gets in ${his} way and reduces ${his} efficiency.`);
		}

		if (slave.balls >= 15) {
			r.push(`${His} massive balls slow ${him} down and limit ${his} range of motion.`);
		}

		if (slave.butt > 6) {
			r.push(`${His} massive ass slows ${him} down and limits ${his} range of motion.`);
		}

		if (slave.hips > 2) {
			r.push(`${He} struggles to move with ${his} inhumanly wide hips and frequently gets caught between things trying to follow you.`);
		}

		if (slave.weight > 190) {
			r.push(`${His} extreme weight nearly immobilizes ${him}. ${He} struggles to move let alone protect you. At least ${his} bloated body will likely stop bullets and block doorways when needed.`);
		} else if (slave.weight > 160) {
			r.push(`${His} extreme weight limits ${his} mobility and range of motion, making ${him} a poor bodyguard but decent meatshield.`);
		} else if (slave.weight > 130) {
			r.push(`${His} extreme weight is an impediment as a bodyguard.`);
		} else if (slave.weight > 30) {
			r.push(`${His} heavy weight is an impediment as a bodyguard.`);
		} else if (slave.weight < -10) {
			r.push(`${His} light weight is an impediment as a bodyguard.`);
		}

		if (slave.health.condition < -50) {
			r.push(`${His} poor health makes ${him} a weaker combatant.`);
		}

		if (slave.health.tired > 90) {
			r.push(`${He} is exhausted and can barely stay awake, let alone ready a weapon.`);
		} else if (slave.health.tired > 60) {
			r.push(`${He} is fatigued, making ${his} situational awareness and reaction time suffer.`);
		} else if (slave.health.tired > 30) {
			r.push(`${He} is tired, slightly lowering ${his} reaction time.`);
		}

		if (slave.pregKnown === 1 || slave.bellyPreg >= 1500) {
			if (slave.bellyPreg >= 750000) {
				r.push(`${His} monolithic pregnancy greatly restricts ${his} movement and renders ${him} nearly useless in combat. ${He} can barely waddle after you, and when ${he} does, finds doors and small passages don't agree with ${his} bloated figure.`);
			} else if (slave.bellyPreg >= 450000) {
				r.push(`${His} gigantic pregnancy greatly hinders ${his} movement and terribly reduces ${his} effectiveness in combat. It also limits where ${he} can follow you, as doors and small passages don't agree with ${his} bloated figure.`);
			} else if (slave.bellyPreg >= 300000) {
				r.push(`${His} massive pregnancy obstructs ${his} movement and greatly hinders ${his} ability to protect you. It also limits where ${he} can follow you, as doors and small passages don't agree with ${his} bloated figure.`);
			} else if (slave.bellyPreg >= 150000) {
				r.push(`${His} giant pregnancy obstructs ${his} movement and greatly slows ${him} down. It also limits where ${he} can follow you, as ${he} has trouble waddling through crowds.`);
			} else if (slave.bellyPreg >= 100000) {
				r.push(`${His} giant belly gets in ${his} way and weighs ${him} down.`);
			} else if (slave.bellyPreg >= 10000) {
				r.push(`${His} huge belly is unwieldy and hinders ${him}.`);
			} else if (slave.bellyPreg >= 5000) {
				r.push(`${His} advanced pregnancy limits ${his} effectiveness.`);
			} else if (slave.bellyPreg >= 1500) {
				r.push(`${His} growing pregnancy occasionally distracts ${him} from ${his} job.`);
			} else {
				r.push(`The life just beginning to grow inside ${him} occasionally distracts ${him} from ${his} job.`);
			}
		} else if (slave.bellyImplant >= 1500) {
			if (slave.bellyImplant >= 750000) {
				r.push(`${His} monolithic, ${slave.bellyImplant}cc implant-filled belly greatly restricts ${his} movement and renders ${him} nearly useless in combat. ${He} can barely waddle after you, and when ${he} does, finds doors and small passages don't agree with ${his} bloated figure.`);
			} else if (slave.bellyImplant >= 450000) {
				r.push(`${His} gigantic, ${slave.bellyImplant}cc implant-filled belly greatly hinders ${his} movement and terribly reduces ${his} effectiveness in combat. It also limits where ${he} can follow you, as doors and small passages don't agree with ${his} bloated figure.`);
			} else if (slave.bellyImplant >= 300000) {
				r.push(`${His} massive, ${slave.bellyImplant}cc implant-filled belly obstructs ${his} movement and greatly hinders ${his} ability to protect you. It also limits where ${he} can follow you, as doors and small passages don't agree with ${his} bloated figure.`);
			} else if (slave.bellyImplant >= 150000) {
				r.push(`${His} giant, ${slave.bellyImplant}cc implant-filled belly obstructs ${his} movement and greatly slows ${him} down. It also limits where ${he} can follow you, as ${he} has trouble waddling through crowds.`);
			} else if (slave.bellyImplant >= 100000) {
				r.push(`${His} giant, ${slave.bellyImplant}cc implant-filled belly is very heavy and unwieldy, frequently getting in the way of ${his} job.`);
			} else if (slave.bellyImplant >= 10000) {
				r.push(`${His} huge, ${slave.bellyImplant}cc implant-filled belly is very heavy and unwieldy, throwing off ${his} weight and making ${him} far less effective.`);
			} else if (slave.bellyImplant >= 5000) {
				r.push(`${His} large, ${slave.bellyImplant}cc implant-filled belly is heavy and unwieldy, limiting ${his} effectiveness.`);
			} else if (slave.bellyImplant >= 1500) {
				r.push(`${His} swollen, ${slave.bellyImplant}cc implant-filled belly is heavy and occasionally distracts ${him}.`);
			}
		}
		if (isInLabor(slave)) {
			r.push(`${He}'s feeling labor pains, greatly detracting from ${his} ability to protect you.`);
		} else if (slave.preg >= slave.pregData.normalBirth && slave.pregControl !== GestationDrug.LABOR) {
			r.push(`${He}'ll be going into labor any time now, detracting from ${his} ability to protect you.`);
		}

		if (slave.bellyFluid >= 10000) {
			r.push(`${His} hugely bloated, ${slave.inflationType}-filled belly is taut and painful, hindering ${his} ability to guard you.`);
		} else if (slave.bellyFluid >= 5000) {
			r.push(`${His} bloated, ${slave.inflationType}-stuffed belly is constantly jiggling and moving, distracting ${him} and throwing off ${his} weight.`);
		} else if (slave.bellyFluid >= 2000) {
			r.push(`${His} distended, ${slave.inflationType}-belly is uncomfortable and heavy, distracting ${him}.`);
		}

		if (slave.teeth === "pointy") {
			r.push(`${His} sharp teeth add nothing to ${his} actual effectiveness, but they're certainly intimidating.`);
		}

		if (slave.skill.combat < 100 && App.Entity.facilities.pit.job("trainee").isEmployed(slave)) {
			r.push(`${He} diligently trains in ${App.Entity.facilities.pit.name} to better protect you.`);
		} else {
			let increase = 10 + Math.floor((slave.intelligence + slave.intelligenceImplant) / 32);
			if (V.dojo > 1) {
				if (slave.skill.combat < 60) {
					r.push(`After some experience guarding you, and diligent practice in the armory, <span class="green">${his} combat skills increase.</span>`);
				} else {
					if (slave.skill.combat < 100) {
						r.push(`${He} has learned all ${he} can on ${his} own and`);
					} else {
						r.push(He);
					}
					r.push(` maintains ${his} combat skill with practice in the armory.`);
				}
			} else {
				r.push(`${He} is unable to properly train making ${him} <span class="devotion dec">worried</span> whether ${he} can properly protect you in the future.`);
				slave.devotion -= 2;
				increase *= 0.3;
			}
			if (slave.skill.combat < 60) {
				slave.skill.combat += pMod * increase;
			}
		}

		r.push(His);
		if (pMod < 0.4) {
			r.push("rare");
		} else if (pMod < 0.9) {
			r.push("regular");
		} else {
			r.push("constant");
		}
		r.push(`presence is`);
		const impressiveness = deadliness(slave).value * pMod;
		if (impressiveness > 6) {
			r.push(`extremely intimidating, <span class="green">adding much to your reputation.</span>`);
			if (slave.career === "an arcology owner") {
				r.push(`You've made a one-time rival arcology owner into a deadly and loyal protector, a feat of slaveownership that's <span class="green">internationally famous.</span>`);
				repX(impressiveness * 50, "bodyguard", slave);
			}
		} else if (impressiveness > 3) {
			r.push(`intimidating, <span class="green">adding to your reputation.</span>`);
		} else {
			r.push(`hardly intimidating, <span class="yellow">barely adding to your reputation.</span>`);
		}

		repX(impressiveness * 50, "bodyguard", slave);
	}

	/**
	 * @param {FC.ReportSlave} slave
	 *
	 */
	function jobEffects(slave) {
		r.push(`Being continually trusted with your life <span class="hotpink">increases ${his} devotion to you</span> and encourages ${him} to <span class="mediumaquamarine">trust you in turn.</span>`);
		slave.devotion += 2;
		slave.trust += 4;

		if (V.dojo > 1) {
			r.push(`${He} <span class="hotpink">appreciates</span> how special it is that ${he} has a nice room off the armory to rest in. ${He} can finally <span class="health inc">rest easy</span> while still keeping tabs on your safety.`);
			slave.devotion += 1;
		} else {
			r.push(`Between protecting you, training, and keeping vigil while you sleep, ${he} lives a <span class="health dec">very tiring</span> life.`);
		}
		tired(slave);
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function trainReplacements(slave) {
		/** @type {[boolean, string][]} */
		const requirements = [
			[slave.devotion <= 95, "not devoted enough"],
			[slave.trust <= 50, "too fearful"],
			[slave.skill.combat <= 60, "hasn't had enough training"],
			[slave.intelligence + slave.intelligenceImplant <= 15, "too stupid"],
		];

		if (requirements.filter(s => s[0]).length > 0) {
			if (V.debugMode > 0) {
				r.push(`<span class="yellow">${He} is ${toSentence(requirements.filter(s => s[0]).map(s => s[1]))} to train any successors.</span>`);
			}
		} else {
			const successorCandidates = V.slaves.filter(s => (assignmentVisible(s) || [Job.CONCUBINE, Job.WARDEN, Job.HEADGIRL, Job.QUARTER, Job.MASTERSUITE].includes(s.assignment)) && bodyguardSuccessorEligible(s));
			const combatSkilled = successorCandidates.filter(s => s.skill.combat > 60);

			r.push(`${He}'s confident in ${his} martial skills, but smart enough to know that${slave.geneMods.immortality > 0 ? `, while technically immortal, ${he} isn't invincible` : ` ${he} isn't immortal`}, and devoted enough to worry about who will protect you should ${he} die.`);
			if (combatSkilled.length < 2) {
				let candidate = null;
				let flawedTrainee = false;
				if (slave.relationship > 1) {
					candidate = getSlave(slave.relationshipTarget);
					if (candidate !== undefined && candidate.skill.combat <= 60 && bodyguardSuccessorEligible(candidate)) {
						const candidatePronouns = getPronouns(candidate);
						r.push(`${He} does ${his} best to train ${candidate.slaveName} whenever ${he} can, hoping that ${his}`);
						if (slave.relationship > 4) {
							r.push(`${candidatePronouns.wife}`);
						} else if (slave.relationship === 4) {
							r.push(`lover`);
						} else if (slave.relationship === 3) {
							r.push(`${candidatePronouns.girl} friend`);
						} else {
							r.push(`best friend`);
						}
						r.push(`can be made capable of stepping into ${his} place.`);
					}
				}
				if (!candidate) {
					if (V.HeadGirlID !== 0 && S.HeadGirl.skill.combat <= 60 && bodyguardSuccessorEligible(S.HeadGirl)) {
						r.push(`${He} does ${his} best to train ${S.HeadGirl.slaveName} whenever ${he} can, hoping that your Head Girl can be made capable of stepping into ${his} place.`);
						candidate = S.HeadGirl;
					}
				}
				if (!candidate) {
					if (V.ConcubineID !== 0 && S.Concubine.skill.combat <= 60 && S.Concubine.devotion > 50 && S.Concubine.muscles >= -30 && S.Concubine.weight < 160 && S.Concubine.butt < 10 && S.Concubine.boobs < 25000 && S.Concubine.belly < 5000 && S.Concubine.balls < 20 && S.Concubine.dick < 15 && S.Concubine.fuckdoll === 0 && S.Concubine.fetish !== Fetish.MINDBROKEN && canWalk(S.Concubine)) {
						r.push(`${He} does ${his} best to train ${S.Concubine.slaveName} whenever ${he} can, hoping that your Concubine can be made capable of stepping into ${his} place.`);
						if (S.Concubine.boobs >= 8000 || S.Concubine.butt >= 10 || S.Concubine.belly >= 5000 || S.Concubine.balls >= 10 || S.Concubine.dick >= 10 || S.Concubine.muscles < 0 || S.Concubine.weight >= 130) {
							r.push(`${His} body is poorly suited for combat, but ${he} can learn to work around it with enough effort.`);
							flawedTrainee = true;
						}
						candidate = S.Concubine;
					}
				}
				if (!candidate) {
					if (V.WardenessID !== 0 && S.Wardeness.skill.combat <= 60 && bodyguardSuccessorEligible(S.Wardeness)) {
						r.push(`${He} does ${his} best to train ${S.Wardeness.slaveName} whenever ${he} can, hoping that your Wardeness can be made capable of stepping into ${his} place.`);
						candidate = S.Wardeness;
					}
				}
				if (!candidate) {
					candidate = successorCandidates.find(function(s) { return s.skill.combat <= 60; });
					if (candidate) {
						r.push(`${He} does ${his} best to train ${candidate.slaveName} whenever ${he} can, hoping that ${his} subordinate can be made capable of stepping into ${his} place.`);
					}
				}
				if (candidate) {
					let gain = 10 + Math.floor((slave.intelligence + slave.intelligenceImplant) / 32);
					if (flawedTrainee) {
						gain /= 2;
					}
					candidate.skill.combat += gain;
					if (candidate.skill.combat > 60) {
						r.push(`By the end of the week, ${he} is satisfied that ${candidate.slaveName} <span class="green">has the combat skill</span> to contribute to your defense.`);
					} else {
						r.push(`Unfortunately, ${candidate.slaveName} wasn't able to pass the rigorous combat tests to ${his} satisfaction this week.`);
					}
				} else {
					r.push(`${He} finds no suitable candidates to serve as ${his} replacement, leaving ${him} stressed over your future safety. The worry is <span class="health dec">exhausting</span> and <span class="health dec">bad for ${his} health.</span>`);
					healthDamage(slave, 3);
					slave.health.tired += 15;
				}
			} else {
				r.push(`${He} takes care to look after the skills of your other defensively capable slaves, satisfied that there are enough of them living in your penthouse.`);
			}
		}
	}
};
