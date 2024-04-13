// cSpell:ignore troublingly

/**
 * @param {FC.ReportSlave} slave
 * @returns {string}
 */
App.SlaveAssignment.longTermPhysicalEffects = function saLongTermPhysicalEffects(slave) {
	const r = [];

	const gigantomastiaMod = slave.geneticQuirks.gigantomastia === 2 ? (slave.geneticQuirks.macromastia === 2 ? 3 : 2) : 1;
	const boobSize = App.Medicine.fleshSize(slave, 'boobs');
	const buttSize = App.Medicine.fleshSize(slave, 'butt');
	const totalInt = slave.intelligence + slave.intelligenceImplant;

	const {
		he, him, his, hers, himself, girl, He, His,
	} = getPronouns(slave);

	if (slave.fuckdoll > 0) {
		fuckdollEffects(slave); // Moved up to follow the disability block that proceeds this function in LTE
	}
	teeth(slave);
	if (V.weightAffectsAssets !== 0) {
		weightAffectsAssets(slave);
	}
	if (slave.anus > 0 || slave.vagina > 2) {
		holeRelaxation(slave);
	}
	malenessAdjustments(slave);
	if ((slave.balls === 0 || slave.ballType === "sterile") && slave.ovaries === 0 && slave.mpreg === 0) {
		noHormoneProduction(slave);
	}
	if (slave.vagina === -1 && slave.dick === 0) {
		nullSexualFrustration(slave);
	}
	if (slave.fuckdoll === 0) {
		adjustSexualAppetite(slave);
	}
	sexualSatisfaction(slave);
	healthEffects(slave);
	ageEffects(slave);
	if (slave.geneMods.NCS === 1) {
		NCSEffects(slave);
	}
	geneticQuirkEffects(slave);
	boobsEffects(slave); // Moved up from middle of the mobility and oversized asset set of text.
	bellyEffects(slave); // Moved up from middle of the mobility and oversized asset set of text.
	if (slave.fuckdoll === 0) {
		mobility(slave);
		hugeBreasts(slave);
		if (slave.fetish !== Fetish.MINDBROKEN && isSlaveAvailable(slave)) {
			boobAccessibility(slave);
		}
	}
	hugeBelly(slave);
	if (slave.fuckdoll === 0) {
		if (slave.fetish !== Fetish.MINDBROKEN && isSlaveAvailable(slave)) {
			bellyAccessibility(slave);
			hugeDick(slave);
			dickAccessibility(slave);
			hugeBalls(slave);
			ballsAccessibility(slave);
			hugeHips(slave);
			hugeButt(slave);
			buttAccessibility(slave);
		}
	}
	healthBlips(slave);

	return r.join(" ");

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function fuckdollEffects(slave) {
		if (getBestVision(slave) > 0) {
			if (slave.fuckdoll > random(20, 100)) {
				r.push(`${His} suit blinds ${him}, and ${his} <span class="health dec">vision worsens</span> from long disuse.`);
				eyeSurgery(slave, "both", "blind");
			}
		}
		if (slave.hears >= 0) {
			if (slave.fuckdoll > random(20, 100)) {
				r.push(`${His} suit deafens ${him}, and ${his} <span class="health dec">hearing worsens</span> from long disuse.`);
				slave.hears = -1;
			}
		}
		if (slave.curatives === 0 && slave.inflationType !== InflationLiquid.CURATIVE) {
			r.push(`The extreme physical stress of living in the suit <span class="health dec">damages ${his} health.</span>`);
			healthDamage(slave, 10);
		} else {
			r.push(`The`);
			if (slave.curatives === 1) {
				r.push(`preventatives`);
			} else if (slave.inflationType === InflationLiquid.CURATIVE) {
				r.push(`rectal curatives`);
			} else {
				r.push(`curatives`);
			}
			r.push(`protect ${him} from the extreme physical stress of living in the suit.`);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function teeth(slave) {
		if (slave.teeth === "straightening braces") {
			if (slave.fuckdoll === 0 && slave.fetish !== Fetish.MINDBROKEN) {
				if (slave.devotion <= 20) {
					r.push(`${His} mouth full of orthodontia is quite uncomfortable,`);
					if (totalInt > 15) {
						r.push(`but ${he} has the presence of mind to know that it's for ${his} own good, and ${he} doesn't blame you for it.`);
					} else {
						r.push(`and ${he}'s stupid enough to <span class="devotion dec">blame you</span> for the discomfort.`);
						slave.devotion -= 1;
					}
				} else {
					r.push(`${He} puts up with the discomfort produced by ${his} orthodontia for your sake.`);
				}
			}
			if (random(1, 10) === 1) {
				r.push(`${His} braces <span class="improvement">straighten ${his} teeth.</span> They can now be removed to leave ${him} with a beautiful smile, or left on.`);
				slave.teeth = "cosmetic braces";
			}
		} else if (slave.teeth === "baby") {
			if (V.seeAge === 1 && slave.physicalAge >= 6 && random(0, (slave.birthWeek * 2))) {
				slave.teeth = "mixed";
				r.push(`${He} lost ${his} first baby tooth this week.`);
			}
		} else if (slave.teeth === "mixed") {
			if (V.seeAge === 1 && slave.physicalAge >= 12 && random(0, (slave.birthWeek * 2))) {
				r.push(`${He} lost the last of ${his} baby teeth this week.`);
				if (slave.race === "catgirl") {
					slave.teeth = "fangs";
					r.push(`${His} baby teeth have fully grown into a pretty but intimidatingly sharp set of feline fangs.`);
				} else {
					const faceValue = slave.face - slave.faceImplant;
					const crookedTeethGen = ((faceValue + 100) / 10);
					if (random(0, crookedTeethGen) < 5) {
						r.push(`Unfortunately,`);
						if (random(0, 5) < 1) {
							slave.teeth = "gapped";
							r.push(`${he} has a large <span class="noteworthy">gap</span> between ${his} front teeth that`);
						} else {
							slave.teeth = "crooked";
							r.push(`${his} teeth came in <span class="noteworthy">crooked</span> and`);
						}
						r.push(`will require braces to correct.`);
					} else {
						r.push(`${He} has <span class="noteworthy">quite the lovely smile.</span>`);
						slave.teeth = "normal";
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function weightAffectsAssets(slave) {
		if (slave.weight <= 10) {
			if (slave.diet !== Diet.FATTEN) {
				const rearQuirk = slave.geneticQuirks.rearLipedema === 2 ? 2 : 0;
				let normBreasts;
				let normButt;
				let adj1;
				let adj2;
				let adj3;
				if (slave.hormoneBalance > 30 && slave.geneMods.NCS !== 1) { // 'Expected' breast size based on weight for feminine-bodied slaves
					normBreasts = Math.trunc(((slave.natural.boobs / 5) + (slave.weight + 100) * 5 + 2 * slave.lactationAdaptation) * (0.85 + slave.hormoneBalance / 400) * gigantomastiaMod); // (slave.natural.boobs / 5 replaced 100, consider rebalacing?)
					normButt = ((slave.weight + 100) * .025 * ( 0.9 + slave.hormoneBalance / 600) * ( rearQuirk / 2 + 1));
				} else { // For masculine-and childish-bodied slaves
					normBreasts = ((slave.weight + 100) * 2 + slave.lactationAdaptation) * gigantomastiaMod;
					normButt = ((slave.weight + 100) * .0125 * (rearQuirk / 2 + 1));
				}
				if (slave.weight < -95) {
					adj1 = "desperately underweight";
					adj2 = "plush";
					adj3 = "healthy";
				} else if (slave.weight <= -30) {
					adj1 = "underweight";
					adj2 = "big";
					adj3 = "plush";
				} else if (slave.weight < -10) {
					adj1 = "skinny";
					adj2 = "huge";
					adj3 = "big";
				} else {
					adj1 = "thin";
					adj2 = "monstrous";
					adj3 = "huge";
				}
				if (boobSize > (4 * normBreasts + 400) && gigantomastiaMod !== 3) {
					r.push(`${His} ${adj1} body <span class="change negative">burns fat off ${his} ${adj2} boobs.</span>`);
					slave.boobs -= 50 / gigantomastiaMod;
				} else if (buttSize > (3 * normButt + 3) && rearQuirk !== 2) {
					r.push(`${His} ${adj1} body <span class="change negative">burns fat off ${his} ${adj2} butt.</span>`);
					slave.butt -= 0.4;
				} else if (boobSize > (3 * normBreasts + 200) && gigantomastiaMod !== 3) {
					r.push(`${His} ${adj1} body <span class="change negative">burns some fat off ${his} ${adj3} boobs.</span>`);
					slave.boobs -= 25;
				} else if (buttSize > (2 * normButt + 2) && rearQuirk !== 2) {
					r.push(`${His} ${adj1} body <span class="change negative">burns some fat off ${his} ${adj3} butt.</span>`);
					slave.butt -= 0.2;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function holeRelaxation(slave) {
		const jobStressesHoles = [Job.ARCADE, Job.CLUB, Job.PUBLIC, Job.WHORE, Job.GLORYHOLE, Job.BROTHEL].includes(slave.assignment) ||
			(slave.assignment === Job.MASTERSUITE && V.masterSuiteUpgradeLuxury === 2) ||
			(slave.assignment === Job.DAIRY && V.dairyStimulatorsSetting > 0);
		if (slave.geneMods.rapidCellGrowth !== 1) {
			if (slave.vagina >= 3 && dildoWidth(slave) < 2 && (!jobStressesHoles || slave.chastityVagina === 1)) {
				r.push(`With a rest from strenuous use, <span class="improvement">${his} loose vagina recovers a little.</span>`);
				slave.vagina -= 1;
			} else if (slave.anus >= 3 && plugWidth(slave) < 2 && (!jobStressesHoles || slave.chastityAnus === 1)) {
				r.push(`With a rest from continual sodomy, <span class="improvement">${his} gaping anus recovers a little.</span>`);
				slave.anus -= 1;
			}
		}
		if (slave.anus >= slave.analArea) {
			if (random(1, 100) > (80 - (20 * (slave.anus - slave.analArea)))) {
				slave.analArea += 1;
				r.push(`${His} anal area is getting used to being`);
				if (slave.analArea > 3) {
					r.push(`permanently gaped, and the puckered skin around ${his} anus now runs from ${his} tailbone all the way down to the`);
					if (slave.vagina > -1) {
						r.push(`bottom of ${his} pussy.`);
					} else {
						r.push(`base of ${his} dick.`);
					}
				} else if (slave.analArea > 2) {
					r.push(`very loose, and the puckered skin around ${his} anus now covers more of the space between ${his} buttocks.`);
				} else if (slave.analArea > 1) {
					r.push(`nice and relaxed, and it now looks quite lewd.`);
				} else {
					r.push(`penetrated, and to put it delicately, ${his} anus is now a bit more eye-catching.`);
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function malenessAdjustments(slave) {
		if (slave.dick > 0) {
			if (slave.foreskin > 0) {
				if (slave.foreskin - slave.dick < -1) {
					if (canAchieveErection(slave)) {
						r.push(`${His} cockhead has grown to the point where it is much too large for ${his} foreskin, making ${his} erections so uncomfortable to achieve that ${his} <span class="libido dec">appetite for sex is reduced</span> by ${his} reluctance to undergo the discomfort.`);
						slave.energy -= 2;
						if (random(1, 300) < slave.energy || slave.geneMods.rapidCellGrowth === 1) {
							r.push(`Despite this, ${he} spends enough of ${his} time hard that ${his} foreskin <span class="change positive">stretches out naturally.</span>`);
							slave.foreskin += 1;
						}
					}
				} else if (slave.foreskin - slave.dick < 0) {
					if (canAchieveErection(slave)) {
						r.push(`${His} cockhead has grown to the point where it is too large for ${his} foreskin, making ${his} erections uncomfortable to achieve; ${his} <span class="libido dec">arousal is slightly impeded</span> by ${his} reluctance to undergo the discomfort.`);
						slave.energy -= 1;
						if (random(1, 500) < slave.energy || slave.geneMods.rapidCellGrowth === 1) {
							r.push(`Despite this, ${he} spends enough of ${his} time hard that ${his} foreskin <span class="change positive">stretches out naturally.</span>`);
							slave.foreskin += 1;
						}
					}
				} else if (slave.foreskin - slave.dick > 1 && slave.geneMods.rapidCellGrowth !== 1) {
					if (canAchieveErection(slave)) {
						if (random(30, 110) > slave.energy) {
							r.push(`${His} penis has gotten so small that even when ${he}'s hard, ${his} loose foreskin rarely retracts. Despite ${his} regular erections, <span class="change negative">${his} foreskin atrophies.</span>`);
							slave.foreskin -= 1;
						}
					} else {
						if (random(40, 120) > slave.energy) {
							r.push(`<span class="change negative">${His} foreskin atrophies,</span> which is not surprising, since ${his} penis has shrunk and it's almost never hard.`);
							slave.foreskin -= 1;
						}
					}
				}
			}
			if (slave.clit > 0) {
				r.push(`${He} doesn't have a clit, since ${he} has a penis atop ${his} vagina where a normal clitoris is supposed to be.`);
				slave.clit = 0;
			}
		}
		// slave may have balls but no dick
		if (slave.balls > 0) {
			if (slave.scrotum > 0) {
				const extraScrotum = slave.scrotum - slave.balls;
				if (extraScrotum < -1) {
					r.push(`${His} nuts are much too big for ${his} ballsack, giving ${him} constant discomfort. ${His} <span class="libido dec">appetite for sex is reduced</span> by how much ${his} junk hurts.`);
					slave.energy -= 2;
					if (random(0, 2) === 0 || slave.geneMods.rapidCellGrowth === 1) {
						r.push(`${His} scrotum <span class="change positive">stretches out naturally</span> as ${his} balls force it to accept their size.`);
						slave.scrotum += 1;
					}
				} else if (extraScrotum < 0 && slave.balls > 5) {
					if (random(0, 4) === 0 || slave.geneMods.rapidCellGrowth === 1) {
						r.push(`${His} heavy balls tug ${his} scrotum downward, and it <span class="change positive">stretches out naturally</span> under their weight.`);
						slave.scrotum += 1;
					}
				} else if (extraScrotum === -1) {
					if (random(0, 5) === 0 || slave.geneMods.rapidCellGrowth === 1) {
						r.push(`${His} scrotum <span class="change positive">stretches out naturally</span> as it adapts to ${his} newly expanded balls.`);
						slave.scrotum += 1;
					}
				} else if (extraScrotum > 1 && slave.geneMods.rapidCellGrowth !== 1) {
					if (slave.hormoneBalance >= 100) {
						if (random(0, 2) === 0) {
							r.push(`<span class="change negative">${His} ballsack atrophies,</span> which is not surprising, since ${he}'s on female hormones and ${his} girly balls have gotten so small.`);
							slave.scrotum -= 1;
						}
					}
				}
			} else {
				if (slave.balls > 2) {
					r.push(`${His} balls have been relocated to ${his} abdomen, and while they still work there, it's not where they're designed to be. Routine scans show that <span class="change negative">they've atrophied,</span>`);
					if (slave.balls > 3) {
						r.push(`and will probably continue to do so until they stabilize at a below-average size.`);
					} else {
						r.push(`but are not likely to get any smaller.`);
					}
					slave.balls -= 1;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function noHormoneProduction(slave) {
		if (slave.energy > 5) {
			if (slave.energy <= 95) {
				if (slave.dick === 0) {
					r.push(`${His} lack of natural sex hormones <span class="change negative">slightly reduces ${his} sex drive.</span>`);
					slave.energy -= 1;
				} else {
					r.push(`${His} lack of balls <span class="change negative">reduces ${his} sex drive.</span>`);
					slave.energy -= 2;
				}
			} else {
				r.push(`${He}'s so addicted to sex that ${his} lack of natural sex hormones doesn't affect ${his} sex drive.`);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function nullSexualFrustration(slave) {
		let frustration = 0;
		if (slave.energy > 20) {
			r.push(`${He}`);
			if (canDoAnal(slave)) {
				if (slave.prostate !== 0) {
					if (slave.fetish === Fetish.BUTTSLUT) {
						if (slave.fetishStrength > 60) {
							r.push(`is such a buttslut that ${his} null status doesn't affect ${his} libido at all; ${he}'s got ${his} prostate and that's all ${he} cares about.`);
						} else {
							r.push(`is a buttslut, but not enough of one that ${his} lack of`);
							if (V.seeDicks > 0) {
								r.push(`a dick or`);
							}
							r.push(`a pussy isn't frustrating.`);
							frustration = 1;
						}
					} else {
						r.push(`is no buttslut, but ${he} has a prostate, allowing ${him} a sexual outlet despite ${his} lack of`);
						if (V.seeDicks > 0) {
							r.push(`a dick or`);
						}
						r.push(`a pussy.`);
						frustration = 1;
					}
				} else {
					if (slave.fetish === Fetish.BUTTSLUT) {
						if (slave.fetishStrength > 95) {
							r.push(`is such a buttslut that ${his} complete lack of`);
							if (V.seeDicks > 0) {
								r.push(`a dick, a pussy, or a prostate`);
							} else {
								r.push(`a pussy`);
							}
							r.push(`only bothers ${him} slightly.`);
							frustration = 1;
						} else {
							r.push(`is a buttslut, but not enough of to console ${him} for ${his} complete lack of`);
							if (V.seeDicks > 0) {
								r.push(`a dick, a pussy, or a prostate.`);
							} else {
								r.push(`a pussy.`);
							}
							frustration = 2;
						}
					} else {
						r.push(`has no`);
						if (V.seeDicks > 0) {
							r.push(`dick, pussy, or prostate`);
						} else {
							r.push(`pussy`);
						}
						r.push(`and no easy way to get off.`);
						frustration = 2;
					}
				}
			} else {
				r.push(`has no`);
				if (V.seeDicks > 0) {
					r.push(`dick, no`);
				}
				r.push(`pussy, and can't even take it up the ass, leaving ${him} no easy way to get off.`);
				frustration = 2;
			}
		}
		if (frustration > 0) {
			r.push(`This <span class="change negative">affects ${his} libido</span> and is`);
			if (slave.devotion > 50) {
				r.push(`annoying, but ${he} puts up with it for your sake.`);
			} else {
				r.push(`<span class="devotion dec">annoying.</span>`);
				slave.devotion -= frustration * 2;
			}
			slave.energy -= frustration * 3;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function adjustSexualAppetite(slave) {
		if (slave.fetish !== Fetish.MINDBROKEN) { // future proofing for mindbreak-pleasure
			if (slave.devotion > 95) {
				if (slave.energy <= 50) {
					r.push(`${He}'s so worshipful of you that ${he} derives erotic satisfaction simply from being your slave, giving ${him} <span class="libido inc">more of an appetite for sex.</span>`);
					slave.energy += 1;
				}
			} else if (slave.devotion > 50) {
				r.push(`${He}'s so devoted to you that ${his} appetite for sex isn't affected by the unpleasant parts of slave life.`);
			} else if (slave.energy > 95) {
				// nymphos stay nymphos
			} else if (slave.energy > 0) {
				const sexJobs = [Job.PUBLIC, Job.WHORE, Job.BROTHEL, Job.CLUB, Job.GLORYHOLE, Job.ARCADE, Job.SUBORDINATE].includes(slave.assignment);
				const fucktoyJobs = [Job.FUCKTOY, Job.MASTERSUITE].includes(slave.assignment);
				const willPlayerFuck = ((V.PC.need - (V.PCSlutContacts === 2 ? 50 : 0) + (V.personalAttention.task === PersonalAttention.SEX ? 20 : 0)) / fuckSlavesLength()) > 0 && slave.rules.release.master === 1 && !isPlayerFrigid();
				if (slave.devotion > 20) {
					if (sexJobs || (fucktoyJobs && willPlayerFuck)) {
						r.push(`${His} assignment constantly requires ${him} to fuck. ${He} obeys, but <span class="libido dec">${his} appetite for sex is reduced.</span>`);
						slave.energy -= 2;
					} else {
						r.push(`Sometimes, ${he} wishes ${he} weren't a sex slave, <span class="libido dec">reducing ${his} appetite for sex,</span> though less than if ${his} assignment required ${him} to fuck constantly.`);
						slave.energy -= 1;
					}
				} else if (slave.devotion >= -20) {
					if (sexJobs || (fucktoyJobs && willPlayerFuck)) {
						r.push(`${His} assignment forces ${him} to let ${himself} get fucked constantly, <span class="libido dec">reducing ${his} appetite for sex.</span>`);
						slave.energy -= 3;
					} else {
						r.push(`${He} isn't used to life as a sex slave, and the constant sexual anxiety <span class="libido dec">reduces ${his} appetite for sex,</span> though less than if ${his} assignment forced ${him} to let ${himself} get fucked constantly.`);
						slave.energy -= 2;
					}
				} else {
					if (sexJobs || (fucktoyJobs && willPlayerFuck)) {
						r.push(`${His} assignment subjects ${him} to constant rape, <span class="libido dec">rapidly reducing ${his} appetite for sex.</span>`);
						slave.energy -= 5;
					} else {
						r.push(`${He} hates being a sex slave, <span class="libido dec">reducing ${his} appetite for sex,</span> though less than if ${his} assignment subjected ${him} to constant rape.`);
						slave.energy -= 3;
					}
				}
				slave.energy = Math.max(slave.energy, 0);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function sexualSatisfaction(slave) {
		let sexPartner;
		let fuckCount;

		// There really is no good place for this since saRules is too early and saRivals/saRelationships is too late
		if (slave.rivalry > 1 && V.universalRulesConsent === 0) {
			sexPartner = getSlave(slave.rivalryTarget);
			if (sexPartner && isSlaveAvailable(slave) && isSlaveAvailable(sexPartner)) {
				// rape time
				if (App.Utils.sexAllowed(sexPartner, slave)) {
					fuckCount = random(1, (Math.ceil(slave.energy / 10) + 1));
					slave.need -= fuckCount * 10;
					SimpleSexAct.Slaves(sexPartner, slave, fuckCount);
				}
			}
		}
		if (App.Utils.hasPartnerSex(slave)) {
			sexPartner = getSlave(slave.relationshipTarget);
			if (sexPartner && isSlaveAvailable(slave) && isSlaveAvailable(sexPartner)) {
				// sexy time
				if (slave.relationship === 5 && canPenetrate(slave)) {
					if (sexPartner.vagina === 0 && canDoVaginal(sexPartner)) {
						seX(sexPartner, "vaginal", slave, "penetrative");
						sexPartner.vagina++;
						if (canImpreg(sexPartner, slave)) {
							knockMeUp(sexPartner, 50, 0, slave.ID);
						}
					}
					if (sexPartner.anus === 0 && canDoAnal(sexPartner)) {
						seX(sexPartner, "anal", slave, "penetrative");
						sexPartner.anus++;
						if (canImpreg(sexPartner, slave)) {
							knockMeUp(sexPartner, 50, 1, slave.ID);
						}
					}
				}
				fuckCount = random(Math.min(4, Math.ceil(slave.energy / 20)), 5);
				slave.need = 0;
				SimpleSexAct.Slaves(sexPartner, slave, fuckCount);
			}
		}
		// Has to come here otherwise runs too late for satiation.
		if (!onBedRest(V.PC, true)) {
			const pa = getPersonalAttentionType(slave.ID);
			if (pa === "spar") {
				if (canWalk(V.PC) && canWalk(slave) && hasAnyArms(V.PC) && hasAnyArms(slave) && canSee(slave) && slave.fetish !== Fetish.MINDBROKEN) {
					if (isHorny(V.PC)) {
						if (slave.energy > 95 || slave.aphrodisiacs > 0 || slave.inflationType === InflationLiquid.APHRO) {
							slave.need = 0;
						}
					}
				}
			}
		}

		if (slave.need) {
			if (slave.need > slave.energy / 2) {
				const decay = 1 + Math.trunc(slave.need / 20);
				if (App.Utils.releaseRestricted(slave)) {
					r.push(`${He} is not allowed to get`);
				} else {
					r.push(`${He} is incapable of getting`);
				}
				r.push(`off as frequently as ${his}`);
				if (slave.aphrodisiacs > 0 || slave.inflationType === InflationLiquid.APHRO) {
					r.push(`aphrodisiac fueled sex drive demands, and the constant frustration`);
					if (slave.fuckdoll !== 0 || slave.fetish === Fetish.MINDBROKEN) {
						r.push(`<span class="health dec">stresses ${his} body considerably.</span>`);
						healthDamage(slave, decay);
					} else {
						r.push(`drives ${him} mad with lust. ${He} <span class="devotion dec">blames you</span> for this <span class="trust dec">cruelty.</span>`);
						slave.devotion -= decay;
						slave.trust -= decay;
					}
				} else if (slave.need > slave.energy && slave.energy >= 70) {
					r.push(`powerful sex drive demands, and the constant frustration`);
					if (slave.fuckdoll !== 0 || slave.fetish === Fetish.MINDBROKEN) {
						r.push(`<span class="health dec">stresses ${his} body considerably.</span>`);
						healthDamage(slave, decay);
					} else {
						r.push(`drives ${him} mad with lust. ${He} <span class="devotion dec">blames you</span> for this <span class="trust dec">cruelty.</span>`);
						slave.devotion -= decay;
						slave.trust -= decay;
					}
					r.push(`Unable to achieve the release ${he} needs, ${his} <span class="libido dec">runaway libido is damaged.</span>`);
					slave.energy -= decay;
				} else {
					r.push(`healthy sex drive demands, and the constant frustration <span class="libido dec">wears away at ${his} libido.</span>`);
					slave.energy -= decay;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function healthEffects(slave) {
		if (slave.health.condition > 90) {
			if (slave.need <= slave.energy / 2) {
				if (slave.energy <= 70) {
					r.push(`${His} outstanding health produces a <span class="libido inc">slow improvement in libido.</span>`);
					slave.energy += 1;
				}
			}
			if (slave.face > 80) {
				if (slave.face < 100) {
					if (slave.trust > 95) {
						r.push(`${He} is so healthy and trusting that <span class="change positive">the minute flaws in ${his} facial appearance seem to be smoothed away</span> every time ${he} sleeps.`);
						r.push(faceIncrease(slave, 5));
					}
				}
			}

			if (V.seeAge === 1) {
				if (slave.visualAge > 20 && slave.physicalAge > 20) {
					if (slave.trust > 95 && slave.devotion > 95) {
						if (slave.ageAdjust === 40) {
							r.push(`${He} has been living a happy, healthy and trusting life under you for so long that you swear <span class="change positive">${he} looks a little younger</span> than a ${girl} ${his} age should.`);
							slave.visualAge--;
							slave.ageAdjust = 0;
						} else if (random(1, 100) > 60) {
							slave.ageAdjust++;
						}
					}
				}
			}
		} else if (slave.health.condition > 60) {
			if (slave.need <= slave.energy / 2) {
				if (slave.energy <= 50) {
					r.push(`${His} good health produces a <span class="libido inc">slow improvement in libido.</span>`);
					slave.energy += 1;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function ageEffects(slave) {
		if (slave.geneMods.immortality !== 1) {
			if (slave.physicalAge >= 30) {
				if (slave.physicalAge >= 70) {
					if (slave.health.condition >= -90) {
						if (slave.curatives === 0 && slave.inflationType !== InflationLiquid.CURATIVE) {
							if (slave.physicalAge - 30 > random(1, 100)) {
								r.push(`With ${his} advanced age comes increasing health complications. It <span class="health dec">caught up with ${him}</span> this week.`);
								healthDamage(slave, 10);
							}
						}
					}
				} else {
					if (slave.health.condition > 20) {
						if (slave.curatives === 0 && slave.inflationType !== InflationLiquid.CURATIVE) {
							if (slave.physicalAge - 30 > random(1, 100)) {
								r.push(`The bloom comes off ${his} excellent health a little. It seems ${his} <span class="health dec">age</span> may be affecting ${him}.`);
								healthDamage(slave, 10);
							}
						}
					}
				}
				if (slave.trust < random(1, 100) && slave.geneticQuirks.neoteny !== 2) {
					if (slave.health.condition < random(1, 100)) {
						if (slave.physicalAge - 30 > random(1, 100)) {
							r.push(`${His} face looks <span class="change negative">just a little older</span> than it did last week. ${He}'s not getting any younger.`);
							slave.face -= 2;
						}
					}
				}
			}
			if (V.seeAge === 1) {
				if (slave.visualAge > 15 && slave.physicalAge > 15 && slave.geneticQuirks.neoteny !== 2) {
					if (slave.trust < -20 && slave.devotion < -20) {
						if (slave.ageAdjust === -40) {
							r.push(`${He} has been living a miserable life under your feet for so long that you swear <span class="change negative">${he} looks a little older</span> than a ${girl} ${his} age should.`);
							slave.visualAge++;
							slave.ageAdjust = 0;
						} else if (random(1, 100) > 40) {
							slave.ageAdjust--;
						}
					}
				}
			}
		} else {
			if (slave.physicalAge > 26 || slave.visualAge > 26) {
				r.push(`The genetic modifications that keep ${him} from growing old also steadily reverse the rigors of age, leaving ${him} <span class="change positive">looking a little younger.</span>`);
			}
			if (slave.physicalAge > 26) {
				slave.physicalAge--;
			}
			if (slave.visualAge > 26) {
				slave.visualAge--;
			}
		}
		if (slave.geneticQuirks.progeria === 2 && slave.birthWeek > 2) {
			if (((slave.birthWeek - 2) % 5) === 0) { // progeria should increase age on every fifth week but not zeroth week as the birthday age up has already handled that.
				if (V.geneticMappingUpgrade >= 1 || (slave.physicalAge >= slave.actualAge + 20 && slave.tankBaby === 0)) {
					if (V.geneticMappingUpgrade > 0) {
						r.push(`${His} progeria takes its toll, <span class="change negative">cruelly rushing ${him} to an early grave.</span>`);
					} else {
						r.push(`Worryingly, ${he} <span class="change negative">seems even older</span> this week than the last.`);
					}
				} else {
					r.push(`Oddly enough, ${he} <span class="change negative">seems a little older</span> this week than the last.`);
				}
				slave.physicalAge++;
				slave.visualAge++;
				if (slave.ovaryAge >= 0) { // immortal ovaries counteract progeria's effect on ovaryAge
					slave.ovaryAge += 5; // Since we are using .physicalAge, we need to manipulate things to prevent the possibility of pregnancy.
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function NCSEffects(slave) {
		// NCS youthening and shrinkage of giant organs and regular shrinking for regular organs happening when not youthening
		let countNCS = 0;
		let youthening = 0;
		const youtheningLevel = Math.round(Math.clamp(((slave.physicalAge - 8) / 4) + .25, 0, 10));
		/*
		**	To prevent the NCS from firing on every attribute in one year, this variable counts the
		**	number of NCS affects that fire. Most affects will only trigger if one or two other
		**	have already fired, but won't fire beyond. There are two exceptions to that, first,
		**	massively oversized growth assets, which will fire always, e.g. boobs > 5000, dick > 10,
		**	etc. Second, Body structure, hips/shoulders may fire any time, (decreasing random).
		**
		**	Youthening (visual age year number reduction)
		**	Happens on a sliding scale, the older a slave is, the faster the de-aging goes.
		**	Consequently, it goes slower as the visual age approaches an 8 year old loli/shota body.
		**	Age 45+=> auto age reduction 1 year per 1 week.
		**	Age 41-44=> age reduction 1 year per 2 weeks.
		**	Age 37-40=> age reduction 1 year per 3 weeks.
		**	Age 33-36=> age reduction 1 year per 4 weeks.
		**	Age 29-32=> age reduction 1 year per 5 weeks.
		**	Age 25-28=> age reduction 1 year per 6 weeks.
		**	Age 21-24=> age reduction 1 year per 7 weeks.
		**	Age 17-20=> age reduction 1 year per 8 weeks.
		**	Age 13-16=> age reduction 1 year per 9 weeks.
		**	Age 9-12=> slowest age reduction 1 year per 10 weeks.
		**
		**	To track this, the slave.NCSyouthening field counts the *charge* of youthening the slave
		**	currently has, and if it's over the youthening requirements, the slave will become younger.
		**
		**	Additionally while years fly off quickly in the beginning for older slaves, and oversized body parts
		**	shrink away, other secondary characteristics slowly but surely drop off, but based on the above
		**	*charge* of youthening.
		**
		**	Note that with this system a 45 year old slave given NCS would be indistinguishable from an 8 year
		**	old in a little over 4 years time.
		*/
		slave.NCSyouthening++;
		if (slave.visualAge > 8 && slave.NCSyouthening >= (11 - youtheningLevel)) {
			// NCS: youthening fires!
			if (V.seeAge === 1) {
				r.push(`${He} has been living under the effects of ${his} <span class="ncs">NCS</span> for a while and the accumulated effects make <span class="change positive">${him} look younger again.</span>`);
			}
			slave.visualAge--;
			countNCS++;
			youthening++;
		}
		/*
		**	height always fires if over 176 cm,
		**	also fires if the slave is tall for their visual age
		**	also if they are in * NCSyouthening 3-5 (reverse teen years) and
		**	over 126 cm
		**	or over height (30% chance)
		*/
		const nonsurgicalHeight = slave.height - 10 * slave.heightImplant;
		const heightDelta = nonsurgicalHeight - slave.natural.height;
		let shrinkage;
		if ((nonsurgicalHeight > 176) || (heightDelta > 5) || ((slave.NCSyouthening >= 6) && ((nonsurgicalHeight > 126) || (heightDelta > 0)) && (random(1, 100) < 30))) {
			if (heightDelta > 15) {
				shrinkage = 5;
			} else if (heightDelta > 5) {
				shrinkage = 4;
			} else if (heightDelta > -5) {
				shrinkage = 3;
			} else if (heightDelta > -15) {
				shrinkage = 2;
			} else {
				shrinkage = 1;
			}
			r.push(`${His} <span class="ncs">NCS</span> is actively <span class="ncs">reducing ${his} stature, leaving ${him} shorter.</span>`);
			slave.height -= shrinkage;
			countNCS++;
		}
		/*
		**	Boobs, nipples and areolae.
		**	Boobs always fires for over 5000 cc,
		**	nipples/areolae shrinkage will fire for boobs under 5000,
		**	where nipples are tiny/cute at 30% chance.
		**	anything over 300 will fire if
		**	the slave's accumulated youthening is 6 or higher,
		**	or by a 50% chance.
		*/
		/** @type {FC.NippleShape} */
		let nipplesString;
		if ((boobSize >= 5000) && (random(1, 100) < 90) && gigantomastiaMod !== 3) {
			r.push(`${His} <span class="ncs">NCS</span> has <span class="change negative">reduced the size of ${his} bouncing breasts.</span>`);
			slave.boobs -= Math.round(boobSize * .11);
			countNCS++;
		} else if ((boobSize <= 5000) && (![NippleShape.CUTE, NippleShape.FUCKABLE, NippleShape.TINY, NippleShape.FLAT].includes(slave.nipples)) && (random(1, 100) < 30)) {
			if (slave.nipples === NippleShape.INVERTED) {
				nipplesString = NippleShape.PARTIAL;
			} else if (slave.nipples === NippleShape.PARTIAL) {
				nipplesString = NippleShape.PUFFY;
			} else {
				nipplesString = either(NippleShape.CUTE, NippleShape.TINY);
			}
			r.push(`${His} <span class="ncs">NCS</span> has <span class="change positive">made ${his} nipples ${nipplesString}.</span>`);
			slave.nipples = nipplesString;
			if (slave.areolae > 1) {
				r.push(`${His} areolae also shrink down to a more normal`);
				if (slave.areolaeShape !== "circle") {
					r.push(`size, including their unique ${slave.areolaeShape} shapes.`);
				} else {
					r.push(`size.`);
				}
				slave.areolae = 1;
				countNCS++;
			}
		} else if ((boobSize >= 300) && ((slave.NCSyouthening >= 6) || (random(1, 100) < 50)) && gigantomastiaMod !== 3) {
			r.push(`${His} <span class="orange">NCS</span> has <span class="change negative">reduced the size of ${his} tits.</span>`);
			slave.boobs -= Math.round(boobSize * .09);
			countNCS++;
		}
		/*
		**	Hips and Shoulders reshaping
		**	One or the other can happen per week as long as the hips and shoulders are bigger than the smallest
		**	level, though the chances get much more likely for the widest sizes.
		*/
		if (((slave.hips - Math.abs(slave.hipsImplant)) > -2) && (random(1, 100) < ((slave.hips + 3) * 18))) {
			r.push(`${His} <span class="ncs">NCS</span> gets busy <span class="change negative"> reducing the size of ${his}`);
			if (slave.hips >= 2) {
				r.push(`freakish`);
			} else if (slave.hips >= 0) {
				r.push(`wide`);
			} else if (slave.hips >= -2) {
				r.push(`already narrow`);
			}
			r.push(`hips.</span>`);
			slave.hips -= 1;
			countNCS++;
		} else if (((slave.shoulders - Math.abs(slave.shouldersImplant)) > -2) && (random(1, 100) < ((slave.shoulders + 3) * 18))) {
			r.push(`${His} <span class="ncs">NCS</span> applies and<span class="change negative"> reduces the size of ${his}`);
			if (slave.shoulders >= 2) {
				r.push(`domineering`);
			} else if (slave.shoulders >= -2 && slave.shoulders < 0) {
				r.push(`already narrow`);
			}
			r.push(`shoulders.</span>`);
			slave.shoulders -= 1;
			countNCS++;
		}
		/*
		**	Dick and clit shrinkage
		**	Massive 10+ Dicks or 5+ Clits always fire, and at double power.
		**	Below that by chance, (reducing chances by current size). In general clits shrink faster.
		*/
		if (slave.dick >= 10) {
			r.push(`${His} <span class="ncs">NCS</span> is actively <span class="change negative">reducing the size of ${his} giant dick.</span>`);
			slave.dick -= 2;
			countNCS++;
		} else if (slave.clit >= 5) {
			r.push(`${His} <span class="ncs">NCS</span> has <span class="change negative">reduced the size of ${his} enormous clit-dick.</span>`);
			slave.clit -= 2;
			countNCS++;
		} else if ((countNCS < 3) && (slave.dick > 2) && (random(1, 100) < ((slave.dick + 1) * 9))) {
			r.push(`${His} <span class="ncs">NCS</span> is actively <span class="change negative">reducing the size of ${his} dick.</span>`);
			slave.dick -= 1;
			countNCS++;
		} else if ((countNCS < 3) && (slave.clit >= 1) && (random(1, 100) < ((slave.clit + 2) * 16))) {
			r.push(`${His} <span class="ncs">NCS</span> has <span class="change negative">reduced the size of ${his} clit.</span>`);
			slave.clit -= 1;
			countNCS++;
		}
		/*
		**	Balls.
		**	Massive testicles (10+) drop by 2 levels,
		**	Others decrease by chance based on current size.
		*/
		if (slave.balls >= 10) {
			r.push(`${His} <span class="ncs">NCS</span> gets busy <span class="change negative">reducing the size of ${his} titanic balls.</span>`);
			slave.balls -= 2;
			countNCS++;
		} else if ((countNCS < 3) && (slave.balls > 2) && (random(1, 100) < ((slave.balls + 1) * 8))) {
			r.push(`${His} <span class="ncs">NCS</span> gets busy <span class="change negative">reducing the size of ${his} balls.</span>`);
			slave.balls -= 1;
			countNCS++;
		}
		/*
		**	Butt.
		**	Tremendous butts burn of by 2 points.
		**	Regular butts based on chances, decrease as the size does.
		*/
		if (buttSize >= 10) {
			r.push(`${His} <span class="ncs">NCS</span> applies and <span class="change negative">reduces the size of ${his} bulbous butt.</span>`);
			slave.butt -= 2;
			countNCS++;
		} else if ((countNCS < 3) && (buttSize >= 1) && (random(1, 100) < (slave.butt * 9))) {
			r.push(`${His} <span class="ncs">NCS</span> applies and <span class="change negative">reduces the size of ${his} butt.</span>`);
			slave.butt -= 1;
			countNCS++;
		}
		/*
		**	Scrotum and Labia
		**	One or the other can fire per week.
		**	Pendulous ballsacks or sagging labia will always fire.
		**	Otherwise by reducing chance based on current sizes, but labia are a little more likely.
		*/
		if (slave.geneMods.rapidCellGrowth !== 1) {
			if (slave.scrotum >= 5) {
				r.push(`${His} <span class="ncs">NCS</span> kicks in and <span class="change negative">reduces the size of ${his} pendulous scrotum.</span>`);
				slave.scrotum -= 2;
				countNCS++;
			} else if (slave.labia >= 5) {
				r.push(`${His} <span class="ncs">NCS</span> kicks in and <span class="change negative">reduces the size of ${his} sagging labia.</span>`);
				slave.labia -= 2;
				countNCS++;
			} else if ((countNCS < 3) && (slave.labia >= 1) && (random(1, 100) < (slave.labia * 11))) {
				r.push(`${His} <span class="ncs">NCS</span> kicks in and <span class="change negative">reduces the size of ${his} labia.</span>`);
				slave.labia -= 1;
				countNCS++;
			} else if ((countNCS < 3) && (slave.scrotum > 1) && (random(1, 100) < (slave.scrotum * 8.5))) {
				r.push(`${His} <span class="ncs">NCS</span> kicks in and <span class="change negative">reduces the size of ${his} scrotum.</span>`);
				slave.scrotum -= 1;
				countNCS++;
			}
		}
		/*
		**	Voice.
		**	Small chance for any non-childlike voice.
		*/
		if ((countNCS < 3) && (slave.voice < 3) && slave.voice !== 0 && (random(1, 100) > (slave.voice * 15))) {
			r.push(`${His} <span class="ncs">NCS</span> has <span class="change positive">raised the pitch of ${his} voice, ${he} now sounds more`);
			if (slave.voice === 1) {
				r.push(`feminine.</span>`);
			} else {
				r.push(`childlike.</span>`);
			}
			slave.voice += 1;
			countNCS++;
		}
		/*
		**	Pussy/Ass-Pussy rejuvenation.
		**	10% chance of either one rejuvenating per week. (The Child Whore's delight!)
		*/
		if (slave.geneMods.rapidCellGrowth !== 1) {
			if ((countNCS < 2) && (slave.vagina > 1) && (random(1, 100) < (slave.vagina * 10))) {
				r.push(`${His} <span class="ncs">NCS</span> manages to <span class="change positive">reverse the stretching in ${his} vagina, ${his} pussy now looks more childlike.</span>`);
				slave.vagina -= 1;
				countNCS++; // These are in case anything is ever added after.
			} else if ((countNCS < 2) && (slave.anus > 1) && (random(1, 100) < (slave.anus * 10))) {
				r.push(`${His} <span class="ncs">NCS</span> effectively <span class="change positive">reverses the stretching in ${his} anus, ${his} ass-pussy now looks more childlike.</span>`);
				slave.anus -= 1;
				countNCS++;
			}
		}
		/*
		**	reset youthening for those that just got younger (see age above) or for already lolified slaves.
		*/
		if (youthening > 0 || slave.NCSyouthening > 9) {
			slave.NCSyouthening = 0;
		}
	}

	/**
	 * @param {FC.ReportSlave} slave
	 *
	 */
	function geneticQuirkEffects(slave) {
		/* progeria and neoteny triggers */
		if (slave.geneticQuirks.neoteny === 3 && slave.physicalAge >= 12) {
			slave.geneticQuirks.neoteny = 2;
		}
		if (slave.geneticQuirks.progeria === 3 && slave.physicalAge >= 3) {
			slave.geneticQuirks.progeria = 2;
		}
		/* macromastia random trigger + growth */
		if (slave.geneticQuirks.gigantomastia === 3 && random(70 - slave.physicalAge, 300) < slave.hormoneBalance) {
			slave.geneticQuirks.gigantomastia = 2;
		}
		if (slave.geneticQuirks.macromastia === 3 && random(70 - slave.physicalAge, 300) < slave.hormoneBalance) {
			slave.geneticQuirks.macromastia = 2;
		}
		if (slave.geneticQuirks.macromastia === 2 && slave.geneticQuirks.gigantomastia === 2) {
			if (boobSize < 100000 && slave.weight >= -95) {
				if (V.geneticMappingUpgrade > 0) {
					r.push(`${His} <span class="change positive">breasts expand</span> due to ${his} abnormal strain of gigantomastia.`);
				} else {
					r.push(`${His} <span class="change positive">breasts are undeniably larger</span> than they were last week, though the exact cause is a mystery.`);
				}
				slave.boobs += 30;
			}
		} else if (slave.geneticQuirks.gigantomastia === 2) {
			if (boobSize < 25000 && slave.weight >= -95) {
				if (V.geneticMappingUpgrade > 0) {
					r.push(`${His} <span class="change positive">breasts expand</span> due to ${his} gigantomastia.`);
				} else {
					r.push(`You suspect that ${his} <span class="change positive">breasts have grown slightly</span> since last week, but you cannot account for why.`);
				}
				slave.boobs += 20;
			}
		} else if (slave.geneticQuirks.macromastia === 2) {
			if (boobSize < 5000 && slave.weight >= -95) {
				if (V.geneticMappingUpgrade > 0) {
					r.push(`${His} <span class="change positive">breasts expand</span> due to ${his} macromastia.`);
				}
				slave.boobs += 10;
			}
		}
		if (slave.geneticQuirks.galactorrhea === 2 && slave.inappropriateLactation === 1) {
			if (V.geneticMappingUpgrade > 0) {
				r.push(`${His} galactorrhea has caused ${him} to <span class="change positive">begin lactating.</span>`);
			} else {
				r.push(`${He} appears to have <span class="change positive">spontaneously begun lactating</span> for some reason or another.`);
			}
			slave.lactation = 1;
			slave.lactationDuration = 2;
		}
		if (slave.geneticQuirks.rearLipedema === 2 && slave.butt < 20 && slave.weight >= -95) {
			if (V.geneticMappingUpgrade > 0) {
				r.push(`${His} body <span class="change positive">continues to lay fat on ${his} rear</span> due to ${his} lipedema.`);
			}
			slave.butt += .1;
		}

		if (slave.geneticQuirks.uterineHypersensitivity === 2) {
			if (slave.vaginaLube < 2 && slave.vagina !== -1 && slave.preg >= slave.pregData.normalBirth * .75) {
				if (V.geneticMappingUpgrade > 0) {
					r.push(`${His} vagina begins to <span class="change positive">produce more sexual fluids</span> as the stimulation to ${his} hypersensitive uterus nears its climax.`);
				} else {
					r.push(`${His} vagina oddly begins to <span class="change positive">produce more sexual fluids</span> in apparent preparation to ${his} upcoming birth.`);
				}
				slave.vaginaLube += 1;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function boobsEffects(slave) {
		/* LACTATION EFFECTS */
		if (slave.lactation > 1) {
			if (slave.geneMods.NCS === 1) {
				// Power struggle for sure
				if (slave.boobs < 500) {
					r.push(`The powerful lactation drugs ${he}'s implanted with <span class="change positive">slowly swell ${his} petite breasts.</span>`);
					slave.boobs += 10;
				}
			} else if (slave.boobs < 800) {
				r.push(`The powerful lactation drugs ${he}'s implanted with <span class="change positive">rapidly swell ${his} small breasts.</span>`);
				slave.boobs += 100;
			} else if (slave.boobs < 1600) {
				r.push(`The powerful lactation drugs ${he}'s implanted with <span class="change positive">slowly swell ${his} big breasts.</span>`);
				slave.boobs += 50;
			} else if (slave.boobs < 3000 * gigantomastiaMod) {
				r.push(`The powerful lactation drugs ${he}'s implanted with <span class="change positive">gradually swell ${his} enormous breasts.</span>`);
				slave.boobs += 25;
			}
			slave.lactationDuration = 2;
		}
		if (slave.lactation === 1) {
			if (slave.boobsMilk > 0) {
				/*
				r.push(`Without release, ${his} breasts have become <span class="change positive">`);
				if (slave.lactationAdaptation > 50) {
					r.push(`massively`);
				}
				r.push(`engorged</span> with pent-up milk.`);
				*/
				/* I don't know where to put this since it happens at the tail end of endWeek now */
				const milkToFleshRatio = slave.boobsMilk / App.Medicine.fleshSize(slave, 'boobs');
				if (milkToFleshRatio > 2) {
					r.push(`Having breasts bloated to the point of bursting is <span class="health dec">incredibly painful.</span> Spending a week like that is excruciating,`);
					healthDamage(slave, 20);
				} else if (milkToFleshRatio > .5) {
					r.push(`Having breasts so swollen with milk that every motion hurts is <span class="health dec">very uncomfortable.</span> Spending a week like that only makes it worse,`);
					healthDamage(slave, 5);
				} else {
					r.push(`${He} spends the week with breasts aching for release,`);
				}
			}
			if (slave.lactationDuration === 0) {
				if (S.Wardeness !== null && slave.assignment === Job.CELLBLOCK && ([SexualFlaw.MALICIOUS, SexualFlaw.ABUSIVE, SexualFlaw.BREASTEXP].includes(S.Wardeness.sexualFlaw))) {
					slave.boobs -= slave.boobsMilk;
					slave.boobsMilk = 0;
					slave.lactationDuration = 2;
				} else if (slave.drugs === Drug.FERTILITY || slave.drugs === Drug.SUPERFERTILITY) {
					if (slave.boobsMilk > 0) {
						r.push(`and, since ${he} is on lactation inducing drugs and not being milked, ${he} eventually can no longer hold back the flow, releasing ${his} milk supply`);
					} else {
						r.push(`and, since ${he} is on lactation inducing drugs, ${he} eventually can no longer hold back the flow, releasing ${his} milk supply`);
					}
					if (slave.fetish === Fetish.BOOBS) {
						r.push(`in a <span class="devotion inc">lewd breastgasm.</span>`);
						slave.devotion += 2;
					} else if (slave.fetish === Fetish.HUMILIATION) {
						r.push(`in a <span class="devotion inc">humiliating, yet orgasmic, display.</span>`);
						slave.devotion += 2;
					} else if (slave.devotion > 50) {
						r.push(`in an amusingly lewd display.`);
					} else if (slave.devotion >= -20) {
						r.push(`in a <span class="devotion inc">humiliating display.</span>`);
						slave.devotion++;
					} else {
						r.push(`in a <span class="trust dec">shameful display.</span>`);
						slave.trust--;
					}
					slave.boobsMilk = Math.round(slave.boobsMilk / 2);
					slave.boobs -= slave.boobsMilk;
					slave.lactationDuration = 1;
				} else if (slave.geneticQuirks.galactorrhea === 2 && random(1, 100) <= slave.lactationAdaptation) {
					r.push(`and ${he} eventually loses control, releasing ${his} milk supply`);
					if (slave.fetish === Fetish.BOOBS) {
						r.push(`in a <span class="devotion inc">lewd breastgasm.</span>`);
						slave.devotion += 1;
					} else if (slave.fetish === Fetish.HUMILIATION) {
						r.push(`in a <span class="devotion inc">humiliating, yet orgasmic, display.</span>`);
						slave.devotion += 1;
					} else if (slave.devotion > 50) {
						r.push(`in an amusingly lewd display.`);
					} else if (slave.devotion >= -20) {
						r.push(`in an <span class="devotion dec">upsetting display.</span>`);
						slave.devotion--;
					} else {
						r.push(`in a <span class="trust dec">shameful display.</span>`);
						slave.trust--;
					}
					if (V.geneticMappingUpgrade > 0) {
						r.push(`${His} galactorrhea refuses to let ${his} lactation dry up, maintaining ${his} production despite the lack of demand.`);
					}
					slave.boobsMilk = Math.round(slave.boobsMilk / 2);
					slave.boobs -= slave.boobsMilk;
					slave.lactationDuration = 1;
				} else {
					if (slave.boobsMilk > 0) {
						r.push(`but without regular use, ${his} lactation finally <span class="change negative">dries up</span> and ${he} can be drained without encouraging it.`);
					} else {
						r.push(`Without regular use, ${his} lactation naturally <span class="change negative">come to an end.</span>`);
					}
					slave.boobs -= slave.boobsMilk;
					slave.boobsMilk = 0;
					slave.lactation = 0;
				}
			}
		}
		if (slave.lactation > 0 && slave.geneMods.livestock === 1 && slave.lactationAdaptation < 200) {
			slave.lactationAdaptation = Math.min(slave.lactationAdaptation + 4, 200);
		}
		if (slave.breastMesh !== 1) {
			if (slave.boobs - (slave.muscles * 30) > 5000 && slave.boobs <= 8000 && slave.boobsImplant / slave.boobs < .50) { // Check now requires breasts to be less than half implant to sag.
				if (slave.physicalAge < random(10, 200)) {
					if (slave.boobShape === BreastShape.PERKY) {
						r.push(`${His} <span class="change negative">breasts lose their perkiness</span> under their own titanic weight. Their nipples now point forward and ${his} boobs rest more heavily against the chest beneath them.`);
						slave.boobShape = BreastShape.TORPEDO;
					} else if (slave.boobShape !== BreastShape.SAGGY) {
						r.push(`${His} <span class="change negative">breasts become saggy</span> under their own titanic weight. Their nipples now point downward and ${his} bosom sways pendulously with ${his} every movement.`);
						slave.boobShape = BreastShape.SAGGY;
					}
				}
			} else if (slave.boobsImplant / slave.boobs >= .90 && slave.boobs > 2000 && ![BreastShape.SAGGY, BreastShape.DOWNWARD, BreastShape.SPHERICAL].includes(slave.boobShape) && random(1, 100) > 70) {
				r.push(`${His} <span class="change negative">breasts become firm and round</span> under the weight of ${his} massive implants. Their nipples now point forward, if not a little downward and to the side, as ${his} boobs begin to pull away from ${his} chest.`);
				slave.boobShape = BreastShape.SPHERICAL;
			}
		}
		// Oversized breast shrinkage
		let triggerSize;
		if (V.oversizedBoobShrinkage === 2) {
			triggerSize = 50000;
		} else if (V.oversizedBoobShrinkage === 1) {
			if (slave.physicalAge <= 3) {
				triggerSize = (gigantomastiaMod === 2 ? 25000 : 7000);
			} else if (slave.physicalAge <= 12) {
				triggerSize = (gigantomastiaMod === 2 ? 25000 : 15000);
			} else {
				triggerSize = 30000;
			}
		} else {
			triggerSize = slave.natural.boobs * 20;
			// A well-developed cow should have udders
			triggerSize += slave.lactationAdaptation * (slave.lactation > 0 ? 20 : 10);
			if (slave.physicalAge <= 6) {
				triggerSize *= (gigantomastiaMod === 2 ? .5 : .25);
			} else if (slave.physicalAge <= 12) {
				triggerSize *= (gigantomastiaMod === 2 ? .75 : .5);
			}
			// Give fat girls a little extra leeway
			triggerSize += slave.weight * 2;
			triggerSize = Math.trunc(triggerSize / 10) * 10;
		}
		triggerSize = Math.max(triggerSize, 300);
		if (boobSize > triggerSize) {
			if (slave.assignment !== Job.DAIRY || V.dairyRestraintsSetting < 2 || V.arcologies[0].FSAssetExpansionistResearch === 0) {
				if (![Drug.GROWBREAST, Drug.INTENSIVEBREAST, Drug.HYPERBREAST].includes(slave.drugs) && V.arcologies[0].FSAssetExpansionistResearch === 0) {
					if (slave.bellyPreg < 300000 && slave.hormoneBalance < 300 && gigantomastiaMod !== 3) {
						if (boobSize < triggerSize * 2) {
							r.push(`${His} breasts are larger than ${his} body can possibly sustain without industrial intervention, and they <span class="change negative">naturally lose mass.</span>`);
							slave.boobs -= 25;
						} else {
							r.push(`${His} breasts are far, far beyond what ${his} body can sustain without industrial intervention, and they <span class="change negative">naturally lose mass.</span>`);
							slave.boobs -= 50 / gigantomastiaMod;
						}
						if (slave.geneMods.NCS === 1 && random(1, 100) > 50 * gigantomastiaMod) {
							r.push(`This effect is massively compounded by ${his} <span class="ncs">NCS.</span>`);
							slave.boobs -= Math.round(boobSize * .1);
						}
					}
				}
			}
		}
		// boobs size nipple effects
		if (slave.nipples === NippleShape.FUCKABLE && (slave.boobs - slave.boobsImplant < 500)) {
			r.push(`Without the necessary flesh to support them, ${his} fuckable nipples pop out and stay out. They have <span class="change negative">reverted to being huge.</span>`);
			slave.nipples = NippleShape.HUGE;
		} else if (slave.nipples === NippleShape.FLAT && (slave.boobsImplant / slave.boobs < 0.75)) {
			r.push(`With ${his} breasts no longer being overstretched by implants, ${his} flat nipples regain a more normal shape. They now <span class="change positive">protrude hugely.</span>`);
			slave.nipples = NippleShape.HUGE;
		} else if (slave.boobShape === BreastShape.SPHERICAL && slave.nipples !== NippleShape.FLAT && slave.lactation === 0 && slave.piercing.nipple.weight === 0) { // Lactation and piercings discourage flattening and convert flat nipples to huge ones.
			r.push(`With the skin of ${his} breasts stretched so thin by ${his} implants, it's only natural that ${his} nipples are soon <span class="change negative">pulled flat</span> as well.`);
			slave.nipples = NippleShape.FLAT;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function bellyEffects(slave) {
		if (slave.pregAdaptation > 40 && (slave.belly < 5000 && slave.preg < 1 && slave.pregWeek === 0) && slave.geneticQuirks.uterineHypersensitivity !== 2 && slave.geneMods.livestock !== 1 && slave.geneMods.progenitor !== 1) {
			if (slave.pregAdaptation > 1001) { // TODO: Compact, or expand useless branches below
				slave.pregAdaptation--;
			} else if (slave.pregAdaptation >= 751 && slave.pregAdaptation < 1000) {
				slave.pregAdaptation--;
			} else if (slave.pregAdaptation >= 501 && slave.pregAdaptation < 750) {
				slave.pregAdaptation--;
			} else if (slave.pregAdaptation >= 251 && slave.pregAdaptation < 500) {
				slave.pregAdaptation--;
			} else if (slave.pregAdaptation >= 101 && slave.pregAdaptation < 250) {
				slave.pregAdaptation--;
			} else if (slave.pregAdaptation >= 51 && slave.pregAdaptation < 100) {
				slave.pregAdaptation--;
			}
		}
		if (slave.cervixImplant >= 1) {
			if (slave.bellyImplant >= 800000 || (slave.bellyImplant > 130000 && V.arcologies[0].FSTransformationFetishistResearch !== 1)) {
				r.push(`${His} cervix implant detected that the volume of filler in ${slave.slaveName}'s belly reached ${His} implant's threshold, and <span class="change negative">opens backflow</span> several times throughout week.`);
				if (V.arcologies[0].FSTransformationFetishistResearch !== 1) {
					slave.bellyImplant = 120000;
				} else {
					slave.bellyImplant = 750000;
				}
			}
		}
		/*
		if (V.masterSuitePregnancySlaveLuxuries === 1 && slave.broodmother === 2 && (slave.assignment === Job.MASTERSUITE || slave.assignment === Job.CONCUBINE)) {
			if (slave.diet !== Diet.CALORIC) {
				if (slave.preg > slave.pregData.normalBirth / 2) {
					r.push(`The pregnancy generator places heavy strain on ${him} as ${his} body <span class="health dec">consumes itself</span> to keep releasing eggs and maintain ${his} many developing babies.`);
					healthDamage(slave, 5);
					if (slave.weight < -50) {
						healthDamage(slave, 10);
					}
					slave.chem += 2;
					if (slave.weight < -50) {
						r.push(`${He} is <span class="devotion dec">gravely concerned</span> over ${his} withered body and <span class="trust dec">terrified</span> of what will happen next.`);
						slave.devotion -= 20;
						slave.trust -= 20;
					} else {
						r.push(`${He} is <span class="devotion dec">concerned</span> by ${his} withering body and <span class="trust dec">fears</span> ${his} future.`);
						slave.devotion -= 5;
						slave.trust -= 5;
					}
					if (slave.physicalAge < 12) {
						r.push(`${His} very young body is decimated by it.`);
						if (random(20, 100) > slave.health.condition && slave.weight > -95) {
							r.push(`${He} has <span class="health dec">lost weight.</span>`);
							slave.weight -= 5;
						}
						if (random(20, 100) > slave.health.condition && slave.muscles > -95) {
							r.push(`${He} has <span class="health dec">lost muscle mass.</span>`);
							slave.muscles -= 5;
						}
						if (random(20, 100) > slave.health.condition and slave.boobs > 0) {
							if (slave.weight <= -95) {
								r.push(`With nothing else to draw from, ${his} body <span class="health dec">rapidly consumes ${his} breasts.</span>`);
								slave.boobs -= 5000;
							} else {
								r.push(`${He} has <span class="health dec">lost breast tissue.</span>`);
								slave.boobs -= 300;
							}
							Math.max(slave.boobs, 0);
						}
						if (random(20, 100) > slave.health.condition && slave.butt > 0) {
							if (slave.weight <= -95) {
								r.push(`With nothing else to draw from, ${his} body <span class="health dec">rapidly consumes ${his} ass fat.</span>`);
								slave.butt -= 4;
							} else {
								r.push(`${He} has <span class="health dec">lost some ass fat.</span>`);
								slave.butt -= 3;
							}
							Math.max(slave.butt, 0);
						}
					} else if (slave.physicalAge < 18) {
						r.push(`${His} young body suffers greatly from it.`);
						if (random(10, 80) > slave.health.condition && slave.weight > -95) {
							r.push(`${He} has <span class="health dec">lost weight.</span>`);
							slave.weight -= 5;
						}
						if (random(10, 80) > slave.health.condition && slave.muscles > -95) {
							r.push(`${He} has <span class="health dec">lost muscle mass.</span>`);
							slave.muscles -= 5;
						}
						if (random(10, 80) > slave.health.condition && slave.boobs > 0) {
							if (slave.weight <= -95) {
								r.push(`With nothing else to draw from, ${his} body <span class="health dec">rapidly consumes ${his} breasts.</span>`);
								slave.boobs -= 2000;
							} else {
								r.push(`${He} has <span class="health dec">lost breast tissue.</span>`);
								slave.boobs -= 200;
							}
							Math.max(slave.boobs, 0);
						}
						if (random(10, 80) > slave.health.condition && slave.butt > 0) {
							if (slave.weight <= -95) {
								r.push(`With nothing else to draw from, ${his} body <span class="health dec">rapidly consumes ${his} ass fat.</span>`);
								slave.butt -= 3;
							} else {
								r.push(`${He} has <span class="health dec">lost some ass fat.</span>`);
								slave.butt -= 2;
							}
							Math.max(slave.butt, 0);
						}
					} else if (slave.physicalAge > 32) {
						r.push(`${His} mature body handles it well.`);
						if (random(10, 60) > slave.health.condition && slave.weight > -95) {
							r.push(`${He} has <span class="health dec">lost weight.</span>`);
							slave.weight -= 5;
						}
						if (random(10, 60) > slave.health.condition && slave.muscles > -95) {
							r.push(`${He} has <span class="health dec">lost muscle mass.</span>`);
							slave.muscles -= 5;
						}
						if (random(10, 60) > slave.health.condition && slave.boobs > 0) {
							if (slave.weight <= -95) {
								r.push(`With nothing else to draw from, ${his} body <span class="health dec">rapidly consumes ${his} breasts.</span>`);
								slave.boobs -= 1000;
							} else {
								r.push(`${He} has <span class="health dec">lost breast tissue.</span>`);
								slave.boobs -= 50;
							}
							Math.max(slave.boobs, 0);
						}
						if (random(10, 60) > slave.health.condition && slave.butt > 0) {
							if (slave.weight <= -95) {
								r.push(`With nothing else to draw from, ${his} body <span class="health dec">rapidly consumes ${his} ass fat.</span>`);
								slave.butt -= 2;
							} else {
								r.push(`${He} has <span class="health dec">lost some ass fat.</span>`);
								slave.butt -= 1;
							}
							Math.max(slave.butt, 0);
						}
					} else {
						if (random(10, 80) > slave.health.condition && slave.weight > -95) {
							r.push(`${He} has <span class="health dec">lost weight.</span>`);
							slave.weight -= 5;
						}
						if (random(10, 80) > slave.health.condition && slave.muscles > -95) {
							r.push(`${He} has <span class="health dec">lost muscle mass.</span>`);
							slave.muscles -= 5;
						}
						if (random(10, 80) > slave.health.condition && slave.boobs > 0) {
							if (slave.weight <= -95) {
								r.push(`With nothing else to draw from, ${his} body <span class="health dec">rapidly consumes ${his} breasts.</span>`);
								slave.boobs -= 1000;
							} else {
								r.push(`${He} has <span class="health dec">lost breast tissue.</span>`);
								slave.boobs -= 100;
							}
							Math.max(slave.boobs, 0);
						}
						if (random(10, 80) > slave.health.condition && slave.butt > 0) {
							if (slave.weight <= -95) {
								r.push(`With nothing else to draw from, ${his} body <span class="health dec">rapidly consumes ${his} ass fat.</span>`);
								slave.butt -= 2;
							} else {
								r.push(`${He} has <span class="health dec">lost some ass fat.</span>`);
								slave.butt -= 1;
							}
							Math.max(slave.butt, 0);
						}
					}
				}
				if (slave.preg > 30) {
					if (slave.fetish !== Fetish.MINDBROKEN && slave.fuckdoll === 0) {
						if (hasAnyArms(slave)) {
							if (slave.devotion < -20) {
								r.push(`When ${he} isn't laboring or performing ${his} duties ${he} can be seen pressing down on ${his} grotesque belly desperately trying to coax the device out of ${his} body. ${He} is <span class="trust dec">mortified</span> by ${his} body and <span class="devotion dec">loathes you</span> for doing this to ${him}.`);
								slave.devotion -= 20;
								slave.trust -= 20;
							} else if (slave.devotion <= 20) {
								r.push(`${He} runs ${his}`);
								if (hasBothArms(slave)) {
									r.push(`hands`);
								} else {
									r.push(`hand`);
								}
								r.push(`across ${his} bulging belly, feeling the life within threatening to burst ${him}. ${He} is <span class="trust dec">disgusted</span> by ${his} body and <span class="devotion dec">hates you</span> for doing this to ${him}.`);
								slave.devotion -= 15;
								slave.trust -= 15;
							} else if (slave.devotion <= 95) {
								r.push(`${He} runs ${his}`);
								if (hasBothArms(slave)) {
									r.push(`hands`);
								} else {
									r.push(`hand`);
								}
								r.push(`across ${his} bulging belly, feeling the life within growing larger. ${He} is <span class="trust dec">concerned</span> by ${his} body and <span class="devotion dec">is uncertain</span> on ${his} situation.`);
								slave.devotion -= 10;
								slave.trust -= 10;
							}
						} else {
							if (slave.devotion < -20) {
								r.push(`When ${he} isn't laboring or performing ${his} duties ${he} can be seen desperately thrashing trying to coax the device out of ${his} body. ${He} is <span class="trust dec">mortified</span> by ${his} body and <span class="devotion dec">loathes you</span> for doing this to ${him}.`);
								slave.devotion -= 20;
								slave.trust -= 20;
							} else if (slave.devotion <= 20) {
								r.push(`${He} attempts to shift beneath ${his} bulging belly, feeling the life within threatening to burst ${him}. ${He} is <span class="trust dec">disgusted</span> by ${his} body and <span class="devotion dec">hates you</span> for doing this to ${him}.`);
								slave.devotion -= 15;
								slave.trust -= 15;
							} else if (slave.devotion <= 95) {
								r.push(`${He} pushes ${his} bulging belly out, feeling the life within growing larger. ${He} is <span class="trust dec">concerned</span> by ${his} body and <span class="devotion dec">is uncertain</span> on ${his} situation.`);
								slave.devotion -= 10;
								slave.trust -= 10;
							}
						}
						if (slave.counter.births > 100 && slave.devotion <= 20 && slave.trust <= 20) {
							r.push(`Being constantly pregnant and giving birth to over a hundred offspring has taken its toll on ${slave.slaveName}'s mind. Feeling that ${he} is nothing more than a breeder has destroyed any hopes that ${he} had. ${slave.slaveName} has become <span class="mindbreak">completely broken,</span> leaving ${him} nothing more than a baby-filled sack.`);
							slave.fetish = Fetish.MINDBROKEN;
							slave.sexualFlaw = SexualFlaw.NONE;
							slave.behavioralFlaw = BehavioralFlaw.NONE;
						} else if (slave.weight <= -95 && slave.boobs < 100 && slave.butt < 1 && slave.muscles < -95) {
							r.push(`Watching ${his} body sacrifice itself for a pregnancy ${he} hates takes its toll on ${slave.slaveName}'s mind. Feeling that ${he} is nothing more than a host for ${his} brood has destroyed any hopes ${he} had left. ${slave.slaveName} has become <span class="mindbreak">completely broken.</span>`);
							slave.fetish = Fetish.MINDBROKEN;
							slave.sexualFlaw = SexualFlaw.NONE;
							slave.behavioralFlaw = BehavioralFlaw.NONE;
						}
					}
					if (slave.fetish === Fetish.MINDBROKEN && slave.weight <= -95 && slave.butt < 1 && slave.boobs < 100 && slave.muscles < -95 && ((slave.physicalAge < 18 && slave.counter.births > 50) || (slave.physicalAge <= 32 && slave.counter.births > 100) || (slave.physicalAge > 32 && slave.counter.births > 150))) {
						slave.counter.births += 50;
						slave.counter.birthsTotal += 50;
						V.birthsTotal += 50;
						slave.vagina = 10;
						WombFlush(slave);
						V.slaveDead = 2;
					}
				}
			} else {
				r.push(`${His} high-calorie and nutrient-filled diet allows ${his} body to handle its demanding pregnancy, though being stuffed only compounds the pressure within ${his} abdomen. ${He} <span class="devotion dec">resents</span> needing to have ${his} stomach bloated with food at all times, but <span class="trust inc">appreciates</span> the effort you are putting into keeping ${him} healthy.`);
				slave.devotion -= 1;
				slave.trust += 2;
			}
		} else {
			r.push(`Being allowed to relax among the luxuries of the master suite permit ${his} body to handle its demanding pregnancy.`);
		}
		*/
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function mobility(slave) {
		if (!canWalk(slave) || !canMove(slave)) {
			let mobility = 1;
			let hindrances = [];
			let likesImmobility = 0;
			if (!canMove(slave)) {
				mobility = 0;
				if (tooFatSlave(slave)) {
					hindrances.push("fat body");
				}
				if (slave.physicalAge <= 3) {
					if (slave.boobs > 25000 + (slave.muscles * 20)) {
						hindrances.push("tits");
					}
					if (slave.belly >= 150000) {
						hindrances.push("belly");
					}
					if (slave.balls >= 30 + (slave.muscles * 0.3)) {
						hindrances.push("balls");
					}
				} else if (slave.physicalAge <= 12) {
					if (slave.boobs > 100000 + (slave.muscles * 50)) {
						hindrances.push("tits");
					}
					if (slave.belly >= 300000) {
						hindrances.push("belly");
					}
					if (slave.balls >= 60 + (slave.muscles * 0.5)) {
						hindrances.push("balls");
					}
				} else if (slave.physicalAge < 18) {
					if (slave.boobs > 250000 + (slave.muscles * 100)) {
						hindrances.push("tits");
					}
					if (slave.belly >= 600000) {
						hindrances.push("belly");
					}
					if (slave.balls >= 90 + (slave.muscles * 0.7)) {
						hindrances.push("balls");
					}
				} else {
					if (slave.boobs > 500000 + (slave.muscles * 200)) {
						hindrances.push("tits");
					}
					if (slave.belly >= 1000000) {
						hindrances.push("belly");
					}
					if (slave.balls >= 90 + (slave.muscles * 0.7)) {
						hindrances.push("balls");
					}
				}
			} else {
				if (tooBigBreasts(slave)) {
					hindrances.push("tits");
				}
				if (tooBigBelly(slave)) {
					hindrances.push("belly");
				}
				if (tooBigDick(slave)) {
					hindrances.push("dick");
				}
				if (tooBigButt(slave)) {
					hindrances.push("butt");
				}
				if (tooBigBalls(slave)) {
					hindrances.push("balls");
				}
				if (tooFatSlave(slave)) {
					hindrances.push("fat body");
				}
			}
			if (mobility) {
				r.push(`${His}`);
				if (hindrances.length > 0) {
					r.push(toSentence(hindrances));
					if (isAmputee(slave)) {
						if (hindrances.length > 1) {
							r.push(`but ultimately ${his} limblessness,`);
						} else {
							r.push(`or would be if ${he} had limbs,`);
						}
					} else if (!hasAnyLegs(slave)) {
						if (hindrances.length > 1) {
							r.push(`but ultimately ${his} leglessness,`);
						} else {
							r.push(`or would be if ${he} had legs,`);
						}
					} else if (!hasBothLegs(slave)) {
						if (hindrances.length > 1) {
							r.push(`but ultimately ${his} missing leg,`);
						} else {
							r.push(`or would be if ${he} had both legs,`);
						}
					} else if (slave.heels === 1 && shoeHeelCategory(slave) === 0) {
						if (hindrances.length > 1) {
							r.push(`but ultimately ${his} heels having been clipped,`);
						} else {
							r.push(`or would be if ${his} heels weren't clipped,`);
						}
					}
					if (hindrances.length === 1) {
						r.push(`renders`);
					} else {
						r.push(`render`);
					}
				} else {
					if (isAmputee(slave)) {
						r.push(`limblessness renders`);
					} else if (!hasAnyLegs(slave)) {
						r.push(`leglessness renders`);
					} else if (!hasBothLegs(slave)) {
						r.push(`missing leg renders`);
					} else if (slave.heels === 1 && shoeHeelCategory(slave) === 0) {
						r.push(`clipped heels render`);
					}
				}
				r.push(`${him} incapable of walking,`);
			} else {
				r.push(`${He} is immobilized by ${his}`);
				if (hindrances.length > 0) {
					r.push(toSentence(hindrances));
					if (isAmputee(slave)) {
						if (hindrances.length > 1) {
							r.push(`but ultimately ${his} limblessness,`);
						} else {
							r.push(`or would be if ${he} had limbs,`);
						}
					} else if (!hasAnyLegs(slave)) {
						if (hindrances.length > 1) {
							r.push(`but ultimately ${his} leglessness,`);
						} else {
							r.push(`or would be if ${he} had legs,`);
						}
					}
				} else {
					if (isAmputee(slave)) {
						r.push(`limblessness,`);
					} else if (!hasAnyLegs(slave)) {
						r.push(`leglessness,`);
					}
				}
			}
			r.push(`making ${his} life more difficult.`);
			if (slave.fetish !== Fetish.MINDBROKEN) {
				if (mobility) {
					if (slave.rules.mobility === "restrictive") {
						if (slave.devotion < -20) {
							r.push(`${He} <span class="devotion dec">hates being forced</span> to crawl around like some kind of animal, but it keeps ${him} properly <span class="trust dec">afraid.</span>`);
							slave.devotion -= 2;
							slave.trust -= 4;
						} else if (slave.devotion >= -20) {
							if (slave.fetish === Fetish.SUBMISSIVE) {
								if (slave.fetishKnown === 1) {
									r.push(`${He} <span class="devotion inc">loves being forced</span> to crawl around like some kind of animal.`);
									slave.devotion += 1;
								} else {
									r.push(`${He} seems to enjoy ${his} forced prostration to anyone that comes ${his} way. <span class="fetish gain">${He}'s a natural submissive!</span>`);
									slave.fetishKnown = 1;
								}
								likesImmobility = 1;
							} else if (slave.fetish === Fetish.HUMILIATION) {
								if (slave.fetishKnown === 1) {
									r.push(`${He} <span class="devotion inc">revels in the humiliation</span> of being forced to crawl around in the dirt.`);
									slave.devotion += 1;
								} else {
									r.push(`${He} seems to be excited by the humiliation not being able to walk brings. <span class="fetish gain">${He}'s enjoys being degraded!</span>`);
									slave.fetishKnown = 1;
								}
								likesImmobility = 1;
							} else if (slave.devotion > 50) {
								r.push(`It is your will that ${he} crawl around on`);
								if (hasAllLimbs(slave)) {
									r.push(`all fours,`);
								} else {
									r.push(`the ground,`);
								}
								r.push(`so ${he} embraces it as normality.`);
							} else if (slave.devotion > 20) {
								r.push(`${He} accepts being forced to crawl around on`);
								if (hasAllLimbs(slave)) {
									r.push(`all fours`);
								} else {
									r.push(`the ground`);
								}
								r.push(`as part of slave life.`);
							} else {
								r.push(`Being forced to crawl around on`);
								if (hasAllLimbs(slave)) {
									r.push(`all fours`);
								} else {
									r.push(`the ground`);
								}
								r.push(`<span class="devotion inc">breaks down any remaining dignity</span> ${he} may have and keeps ${him} <span class="trust dec">well aware of ${his} total vulnerability</span> to punishment.`);
								slave.devotion += 2;
								slave.trust -= 1;
							}
						}
					} else {
						if (slave.devotion > 50) {
							r.push(`<span class="trust inc">${He} is thankful</span> that ${he} serves a ${getWrittenTitle(slave)} so kind as to permit ${him} the tools ${he} needs to not be reduced to crawling.`);
							slave.trust += 1;
						} else if (slave.devotion > 20) {
							r.push(`<span class="trust inc">${He} appreciates</span> being given the means to maintain some semblance of mobility.`);
							slave.trust += 2;
						} else if (slave.devotion >= -20) {
							r.push(`<span class="trust inc">${He} takes full advantage</span> of the provided mobility aids to avoid being forced to crawl everywhere.`);
							slave.trust += 3;
						} else {
							r.push(`Anything is better than crawling on the floor, so ${he} makes full use of the provided mobility aids <span class="trust inc">to avoid such an indignity.</span>`);
							slave.trust += 4;
						}
					}
				} else {
					if (slave.devotion < -20) {
						r.push(`${He} can't escape those looking to prey upon ${him}, <span class="trust dec">terrifying ${him}.</span>`);
						slave.trust -= 4;
					} else if (slave.devotion >= -20) {
						if (slave.fetish === Fetish.SUBMISSIVE) {
							if (slave.fetishKnown === 1) {
								r.push(`${He} <span class="devotion inc">loves having no choice but to be submissive</span> if ${he} wants assistance.`);
								slave.devotion += 1;
							} else {
								r.push(`${He} seems to enjoy being at the mercy of you and your chattel. <span class="fetish gain">${He}'s a natural submissive!</span>`);
								slave.fetishKnown = 1;
							}
							likesImmobility = 1;
						} else if (slave.fetish === Fetish.HUMILIATION) {
							if (slave.fetishKnown === 1) {
								r.push(`${He} <span class="devotion inc">revels in the humiliation</span> of being completely stripped of any ability to do things on ${his} own.`);
								slave.devotion += 1;
							} else {
								r.push(`${He} seems to be excited by the humiliation complete immobility brings. <span class="fetish gain">${He}'s enjoys being degraded!</span>`);
								slave.fetishKnown = 1;
							}
							likesImmobility = 1;
						} else if (slave.devotion > 50) {
							r.push(`Since you want to keep ${him} from moving, ${he}'s perfectly happy to sit around and wait for your attention.`);
						} else if (slave.devotion > 20) {
							r.push(`${He} accepts ${his} inability to move as part of slave life.`);
						} else {
							r.push(`Being completely unable to move leaves ${him} at the mercy of others, <span class="devotion inc">destroying any semblance of self-reliance ${he} has</span> and keeps ${him} <span class="trust dec">well aware of ${his} total vulnerability</span> to punishment.`);
							slave.devotion += 3;
							slave.trust -= 1;
						}
					}
				}
			}
			if (mobility) {
				r.push(`Other slaves have to help ${him} at times, which`);
			} else {
				r.push(`${He} requires help to do nearly everything, which`);
			}
			if (slave.fetish !== Fetish.MINDBROKEN) {
				if (likesImmobility) {
					r.push(`suits ${his} fetish just fine.`);
				} else if (slave.devotion > 50) {
					r.push(`the devoted slave bears with equanimity.`);
				} else if (slave.devotion > 20) {
					r.push(`${he} can't help <span class="devotion dec">resenting</span> a little.`);
					slave.devotion -= 1;
				} else if (slave.devotion >= -20) {
					if (slave.trust >= -20) {
						r.push(`${he} <span class="devotion dec">actively resents.</span>`);
						slave.devotion -= 2;
					} else {
						r.push(`${he} appreciates in ${his} frightening life.`);
						slave.trust += 1;
					}
				} else {
					if (slave.trust >= -20) {
						r.push(`${he} <span class="devotion dec">utterly detests.</span>`);
						slave.devotion -= 2;
					} else {
						r.push(`${he} needs in these dark times.`);
						slave.trust += 2;
					}
				}
			} else {
				r.push(`goes largely unnoticed by the mindless slave.`);
			}
			if (isAmputee(slave)) {
				if (slave.muscles > -80) {
					r.push(`As a quadruple amputee`);
					if (slave.muscles > 5) {
						r.push(`${he} <span class="change negative">loses some muscle definition.</span>`);
					} else {
						r.push(`${his} <span class="change negative">muscles steadily atrophy.</span>`);
					}
					slave.muscles -= 3;
				}
			} else if (!canMove(slave) && slave.diet !== Diet.MUSCLE) {
				if (slave.muscles > -80) {
					r.push(`Since ${he} is effectively incapable of moving ${himself},`);
					if (V.universalRulesImmobileSlavesMaintainMuscles === 1 && slave.muscles >= 0) {
						r.push(`and is required to maintain ${his} musculature, ${he} regularly lifts weights`);
						if (!hasAnyArms(slave)) {
							r.push(`with ${his}`);
							if (hasBothLegs(slave)) {
								r.push(`legs`);
							} else {
								r.push(`leg`);
							}
						}
						r.push(`to stave off muscular atrophy.`);
					} else if (slave.muscles >= -5) {
						r.push(`${he} steadily <span class="change negative">loses muscle definition.</span>`);
						slave.muscles--;
					} else {
						r.push(`${his} <span class="change negative">muscles steadily atrophy.</span>`);
						slave.muscles--;
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function hugeBreasts(slave) {
		if (slave.physicalAge >= 18) {
			if (isSlaveAvailable(slave)) {
				if (slave.boobs > 40000 + (slave.muscles * 200)) {
					r.push(`${His} immense breasts are so big they pin ${him} to the floor, taking the weight off ${his} body.`);
					if (slave.sexualFlaw === SexualFlaw.BREASTEXP) {
						r.push(`${He}'s perfectly fine with dragging them along as a testament to how much ${he}'s managed to grow.`);
					} else if (slave.devotion <= 50) {
						r.push(`${He} finds pulling them along <span class="devotion dec">mildly annoying.</span>`);
						slave.devotion -= 1;
					} else {
						r.push(`${He} finds pulling them along somewhat annoying, but ${he}'s happy to do so if it pleases you.`);
					}
				} else if (slave.boobs > 25000) {
					if (canWalk(slave)) {
						if (slave.sexualFlaw === SexualFlaw.BREASTEXP) {
							r.push(`${His} giant tits are debilitatingly big and a constant reminder of ${his} progress. No amount of discomfort or pain could dissuade ${him} from going bigger.`);
						} else if (FutureSocieties.isActive('FSAssetExpansionist') && (slave.behavioralFlaw === BehavioralFlaw.ARROGANT || slave.behavioralQuirk === BehavioralQuirk.CONFIDENT)) {
							if (slave.behavioralFlaw === BehavioralFlaw.ARROGANT) {
								r.push(`${His} debilitatingly giant tits may be <span class="health dec">agony on ${his} back,</span> but ${he} is well aware of <span class="trust inc">just how valuable</span> they make ${him} in your arcology.`);
								healthDamage(slave, 5);
								slave.trust += 1;
							} else if (slave.behavioralQuirk === BehavioralQuirk.CONFIDENT) {
								r.push(`${His} giant tits are debilitatingly big, but ${he} knows how valuable they are to society and takes extra measures to care for them.`);
							}
						} else if (slave.devotion <= 50) {
							r.push(`${His} giant tits are debilitatingly big. They are <span class="devotion dec">very uncomfortable</span> and <span class="health dec">painful</span> for ${his} body.`);
							slave.devotion -= 3;
							healthDamage(slave, 5);
						} else {
							r.push(`${His} giant tits are debilitatingly big, but ${he} takes measures to keep comfortable and pain free as to not concern you with ${his} troubles.`);
						}
					}
				} else if (slave.boobs > 10000) {
					if (slave.muscles <= 30) {
						if (canWalk(slave)) {
							if (slave.sexualFlaw === SexualFlaw.BREASTEXP) {
								r.push(`${His} huge breasts are becoming troublesome for ${his} slight form, but that only drives ${his} desire to go even bigger.`);
							} else if (FutureSocieties.isActive('FSAssetExpansionist') && (slave.behavioralFlaw === BehavioralFlaw.ARROGANT || slave.behavioralQuirk === BehavioralQuirk.CONFIDENT)) {
								if (slave.behavioralFlaw === BehavioralFlaw.ARROGANT) {
									r.push(`${His} huge tits may leave ${him} with a <span class="health dec">sore back,</span> but ${he} is well aware of <span class="trust inc">just how valuable</span> they make ${him} in your arcology.`);
									healthDamage(slave, 2);
									slave.trust += 1;
								} else if (slave.behavioralQuirk === BehavioralQuirk.CONFIDENT) {
									r.push(`${His} breasts are uncomfortably large, but ${he} knows how valuable they are to society and does ${his} best to manage them.`);
								}
							} else if (slave.devotion <= 50) {
								r.push(`Dragging ${his} huge tits around is <span class="devotion dec">uncomfortable</span> and <span class="health dec">painful</span> for ${his} slight form.`);
								slave.devotion -= 2;
								healthDamage(slave, 2);
							} else {
								r.push(`${He} finds ${his} breasts uncomfortably large, but ${he} grins and bears it for you.`);
							}
						}
					}
				} else if (slave.boobs > 4000) {
					if (slave.muscles <= 30) {
						if (canWalk(slave)) {
							if (slave.sexualFlaw === SexualFlaw.BREASTEXP) {
								r.push(`The weight of ${his} big boobs serves as a reminder that ${he} needs to get even bigger.`);
							} else if (FutureSocieties.isActive('FSAssetExpansionist') && (slave.behavioralFlaw === BehavioralFlaw.ARROGANT || slave.behavioralQuirk === BehavioralQuirk.CONFIDENT)) {
								if (slave.behavioralFlaw === BehavioralFlaw.ARROGANT) {
									r.push(`${His} big tits may be a little heavy for ${his} slight form, but ${he} is well aware of <span class="trust inc">just how sexy</span> they make ${him} in your arcology.`);
									slave.trust += 1;
								} else if (slave.behavioralQuirk === BehavioralQuirk.CONFIDENT) {
									r.push(`${His} breasts are uncomfortably big for ${his} slight form, but ${he} feels this makes ${him} valuable to society and does ${his} best to deal with it.`);
								}
							} else if (slave.devotion <= 50) {
								r.push(`The weight of ${his} big boobs is <span class="devotion dec">uncomfortable</span> for ${his} slight form.`);
								slave.devotion -= 2;
							} else {
								r.push(`The weight of ${his} big boobs is uncomfortable for ${his} slight form, but ${he} bears it out of devotion to you.`);
							}
						}
					}
				}
			}
		} else if (slave.physicalAge <= 3) {
			if (isSlaveAvailable(slave)) {
				if (slave.boobs > 40000) {
					r.push(`${His} titanic breasts are so massive they dwarf ${his} body. ${He}`);
					if (slave.sexualFlaw === SexualFlaw.BREASTEXP) {
						r.push(`happily embraces`);
					} else {
						r.push(`has no choice but to accept`);
					}
					r.push(`immobility.`);
				} else if (slave.boobs > 20000) {
					r.push(`${His} immense breasts are so huge they rest upon the floor even when ${he} tries to stand, taking the weight off ${his} tiny body.`);
					if (canMove(slave)) {
						if (slave.sexualFlaw === SexualFlaw.BREASTEXP) {
							r.push(`${He}'s perfectly fine with dragging them along as a testament to how much ${he}'s managed to grow.`);
						} else if (slave.devotion <= 50) {
							r.push(`${He} finds pulling them along <span class="devotion dec">mildly annoying.</span>`);
							slave.devotion -= 1;
						} else {
							r.push(`${He} finds pulling them along a big burden, but ${his} devotion to you is far stronger than ${his} discomfort.`);
						}
					}
				} else if (slave.boobs > 4700 + (slave.muscles * 20)) {
					if (canWalk(slave)) {
						if (slave.sexualFlaw === SexualFlaw.BREASTEXP) {
							r.push(`${His} giant tits are debilitatingly big and a constant reminder of ${his} progress. No amount of discomfort or pain could dissuade ${him} from going bigger.`);
						} else if (FutureSocieties.isActive('FSAssetExpansionist') && (slave.behavioralFlaw === BehavioralFlaw.ARROGANT || slave.behavioralQuirk === BehavioralQuirk.CONFIDENT)) {
							if (slave.behavioralFlaw === BehavioralFlaw.ARROGANT) {
								r.push(`${His} debilitatingly giant tits may be <span class="health dec">agony on ${his} back,</span> but ${he} is well aware of <span class="trust inc">just how valuable</span> they make ${him} in your arcology.`);
								healthDamage(slave, 4);
								slave.trust += 1;
							} else if (slave.behavioralQuirk === BehavioralQuirk.CONFIDENT) {
								r.push(`${His} giant tits are debilitatingly big for ${his} childish form, but ${he} knows how valuable they are to society and takes extra measures to manage them.`);
							}
						} else if (slave.devotion <= 50) {
							r.push(`${His} giant tits are debilitatingly big. They are <span class="devotion dec">very uncomfortable</span> and <span class="health dec">painful</span> for ${his} childish form.`);
							slave.devotion -= 3;
							healthDamage(slave, 4);
						} else {
							r.push(`${His} giant tits are debilitatingly big. ${He} does everything ${he} can to keep comfortable and pain free as to not bother you.`);
						}
					} else if (canMove(slave)) {
						r.push(`${His} giant breasts are so big they pin ${him} to the floor, taking the weight off ${his} tiny body.`);
						if (slave.sexualFlaw === SexualFlaw.BREASTEXP) {
							r.push(`${He}'s perfectly fine with dragging them along as a testament to how much ${he}'s managed to grow.`);
						} else if (slave.devotion <= 50) {
							r.push(`${He} finds pulling them along <span class="devotion dec">mildly annoying.</span>`);
							slave.devotion -= 1;
						} else {
							r.push(`${He} finds pulling them along a little annoying, but your will is far more important to ${him}.`);
						}
					}
				} else if (slave.boobs > 2500) {
					if (slave.muscles <= 80) {
						if (canWalk(slave)) {
							if (slave.sexualFlaw === SexualFlaw.BREASTEXP) {
								r.push(`${His} huge breasts are troublesome for ${his} childish form, but that only drives ${his} desire to go even bigger.`);
							} else if (FutureSocieties.isActive('FSAssetExpansionist') && (slave.behavioralFlaw === BehavioralFlaw.ARROGANT || slave.behavioralQuirk === BehavioralQuirk.CONFIDENT)) {
								if (slave.behavioralFlaw === BehavioralFlaw.ARROGANT) {
									r.push(`${His} huge tits may be annoying, but ${he} is well aware of <span class="trust inc">just how valuable</span> they make ${him} in your arcology.`);
									slave.trust += 1;
								} else if (slave.behavioralQuirk === BehavioralQuirk.CONFIDENT) {
									r.push(`${His} breasts are uncomfortably large for ${his} tiny body, but ${he} knows how valuable they are to society and does ${his} best to manage them.`);
								}
							} else if (slave.devotion <= 50) {
								r.push(`Hauling ${his} huge tits around is <span class="devotion dec">uncomfortable</span> for ${his} childish form.`);
								slave.devotion -= 2;
							} else {
								r.push(`${He} finds ${his} breasts uncomfortably large for ${his} tiny body, but ${he} grins and bears it for you.`);
							}
						}
					}
				} else if (slave.boobs > 1000) {
					if (slave.muscles <= 30) {
						if (canWalk(slave)) {
							if (slave.sexualFlaw === SexualFlaw.BREASTEXP) {
								r.push(`The weight of ${his} big boobs serves as a reminder that ${he} needs to get even bigger.`);
							} else if (FutureSocieties.isActive('FSAssetExpansionist') && (slave.behavioralFlaw === BehavioralFlaw.ARROGANT || slave.behavioralQuirk === BehavioralQuirk.CONFIDENT)) {
								if (slave.behavioralFlaw === BehavioralFlaw.ARROGANT) {
									r.push(`${His} big tits may be uncomfortable, but ${he} is well aware of <span class="trust inc">just how sexy</span> they make ${him} in your arcology.`);
									slave.trust += 1;
								} else if (slave.behavioralQuirk === BehavioralQuirk.CONFIDENT) {
									r.push(`${His} breasts are uncomfortably big for ${his} slight form, but ${he} knows how valuable they are to society and does ${his} best to deal with it.`);
								}
							} else if (slave.devotion <= 50) {
								r.push(`The weight of ${his} big boobs is <span class="devotion dec">uncomfortable</span> for ${his} slight form.`);
								slave.devotion -= 2;
							} else {
								r.push(`The weight of ${his} big boobs is uncomfortable for ${his} slight form, but ${he} bears it out of devotion to you.`);
							}
						}
					}
				}
			}
		} else if (slave.physicalAge <= 12) {
			if (isSlaveAvailable(slave)) {
				if (slave.boobs > 40000) {
					r.push(`${His} immense breasts are so huge they rest upon the floor even when ${he} tries to stand, taking the weight off ${his} small body.`);
					if (canMove(slave)) {
						if (slave.sexualFlaw === SexualFlaw.BREASTEXP) {
							r.push(`${He}'s perfectly fine with dragging them along as a testament to how much ${he}'s managed to grow.`);
						} else if (slave.devotion <= 50) {
							r.push(`${He} finds pulling them along <span class="devotion dec">mildly annoying.</span>`);
							slave.devotion -= 1;
						} else {
							r.push(`${He} finds pulling them along a burden, but ${his} devotion to you is far stronger than ${his} discomfort.`);
						}
					}
				} else if (slave.boobs > 9500 + (slave.muscles * 50)) {
					if (canWalk(slave)) {
						r.push(`${His} giant tits are debilitatingly big.`);
						if (slave.sexualFlaw === SexualFlaw.BREASTEXP) {
							r.push(`No amount of discomfort or pain could dissuade ${him} from going bigger.`);
						} else if (FutureSocieties.isActive('FSAssetExpansionist') && (slave.behavioralFlaw === BehavioralFlaw.ARROGANT || slave.behavioralQuirk === BehavioralQuirk.CONFIDENT)) {
							if (slave.behavioralFlaw === BehavioralFlaw.ARROGANT) {
								r.push(`They are <span class="health dec">painful</span> to lug around for ${his} childish form, but ${he} is well aware of <span class="trust inc">just how much of an effect</span> they have on your citizens.`);
								healthDamage(slave, 5);
								slave.trust += 1;
							} else if (slave.behavioralQuirk === BehavioralQuirk.CONFIDENT) {
								r.push(`They look ridiculous on ${his} childish body, but ${he} knows how valuable they are to society and takes extra measures to manage them.`);
							}
						} else if (slave.devotion <= 50) {
							r.push(`They are <span class="devotion dec">very uncomfortable</span> and <span class="health dec">painful</span> for ${his} childish form.`);
							slave.devotion -= 3;
							healthDamage(slave, 5);
						} else {
							r.push(`${He} does ${his} best to not let them get the better of ${his} youthful body.`);
						}
					} else {
						r.push(`${His} giant breasts are so big they pin ${him} to the floor, taking the weight off ${his} young body.`);
						if (canMove(slave)) {
							if (slave.sexualFlaw === SexualFlaw.BREASTEXP) {
								r.push(`${He}'s perfectly fine with dragging them along as a testament to how much ${he}'s managed to grow.`);
							} else if (slave.devotion <= 50) {
								r.push(`${He} finds pulling them along <span class="devotion dec">mildly annoying.</span>`);
								slave.devotion -= 1;
							} else {
								r.push(`${He} finds pulling them along a little annoying, but your will is far more important to ${him}.`);
							}
						}
					}
				} else if (slave.boobs > 5000) {
					if (slave.muscles <= 80) {
						if (canWalk(slave)) {
							if (slave.sexualFlaw === SexualFlaw.BREASTEXP) {
								r.push(`${His} huge breasts are troublesome for ${his} childish form, but that only drives ${his} desire to go even bigger.`);
							} else if (FutureSocieties.isActive('FSAssetExpansionist') && (slave.behavioralFlaw === BehavioralFlaw.ARROGANT || slave.behavioralQuirk === BehavioralQuirk.CONFIDENT)) {
								if (slave.behavioralFlaw === BehavioralFlaw.ARROGANT) {
									r.push(`${His} huge tits may be annoying and <span class="health dec">painful</span> for ${his} childish form, but ${he} is well aware of <span class="trust inc">just how valuable</span> they make ${him} in your arcology.`);
									healthDamage(slave, 4);
									slave.trust += 1;
								} else if (slave.behavioralQuirk === BehavioralQuirk.CONFIDENT) {
									r.push(`${His} breasts are uncomfortably big for ${his} childish form, but ${he} knows how valuable they are to society and does ${his} best to manage with them.`);
								}
							} else if (slave.devotion <= 50) {
								r.push(`Dragging ${his} huge tits around is <span class="devotion dec">uncomfortable</span> and <span class="health dec">painful</span> for ${his} childish form.`);
								slave.devotion -= 2;
								healthDamage(slave, 4);
							} else {
								r.push(`${His} huge tits are uncomfortably big for ${his} childish form, but ${he} keeps it to ${himself} out of devotion to you.`);
							}
						}
					}
				} else if (slave.boobs > 2000) {
					if (slave.muscles <= 30) {
						if (canWalk(slave)) {
							if (slave.sexualFlaw === SexualFlaw.BREASTEXP) {
								r.push(`The weight of ${his} big boobs serves as a reminder that ${he} needs to get even bigger.`);
							} else if (FutureSocieties.isActive('FSAssetExpansionist') && (slave.behavioralFlaw === BehavioralFlaw.ARROGANT || slave.behavioralQuirk === BehavioralQuirk.CONFIDENT)) {
								if (slave.behavioralFlaw === BehavioralFlaw.ARROGANT) {
									r.push(`${His} big tits may be heavy, but ${he} is well aware of <span class="trust inc">just how sexy</span> they make ${him} in your arcology.`);
									slave.trust += 1;
								} else if (slave.behavioralQuirk === BehavioralQuirk.CONFIDENT) {
									r.push(`${His} big boobs are uncomfortably heavy for ${his} slight form, but ${he} knows how valuable they are to society and does ${his} best to deal with it.`);
								}
							} else if (slave.devotion <= 50) {
								r.push(`The weight of ${his} big boobs is <span class="devotion dec">uncomfortable</span> for ${his} slight form.`);
								slave.devotion -= 1;
							} else {
								r.push(`The weight of ${his} big boobs is uncomfortable for ${his} slight form, but ${he} bears it out of devotion to you.`);
							}
						}
					}
				}
			}
		} else {
			if (isSlaveAvailable(slave)) {
				if (slave.boobs > 25000 + (slave.muscles * 100)) {
					r.push(`${His} immense breasts are so big they pin ${him} to the floor, taking the weight off ${his} youthful body.`);
					if (canMove(slave)) {
						if (slave.sexualFlaw === SexualFlaw.BREASTEXP) {
							r.push(`${He}'s perfectly fine with dragging them along as a testament to how much ${he}'s managed to grow.`);
						} else if (slave.devotion <= 50) {
							r.push(`${He} finds pulling them along <span class="devotion dec">mildly annoying.</span>`);
							slave.devotion -= 1;
						} else {
							r.push(`${He} finds pulling them along a little annoying, but your will is far more important to ${him}.`);
						}
					}
				} else if (slave.boobs > 17000) {
					r.push(`${His} giant tits are debilitatingly big.`);
					if (canMove(slave)) {
						if (slave.sexualFlaw === SexualFlaw.BREASTEXP) {
							r.push(`No amount of discomfort or pain could dissuade ${him} from going bigger.`);
						} else if (slave.devotion <= 50) {
							r.push(`They are <span class="devotion dec">very uncomfortable</span> and <span class="health dec">painful</span> for ${his} youthful form.`);
							slave.devotion -= 3;
							healthDamage(slave, 10);
						} else {
							r.push(`${He} finds them painfully uncomfortable, but finds ways to mitigate it to not distract you with ${his} worries.`);
						}
					}
				} else if (slave.boobs > 10000) {
					if (slave.muscles <= 30) {
						if (canWalk(slave)) {
							if (slave.sexualFlaw === SexualFlaw.BREASTEXP) {
								r.push(`${His} huge breasts are troublesome for ${his} slight form, but that only drives ${his} desire to go even bigger.`);
							} else if (FutureSocieties.isActive('FSAssetExpansionist') && (slave.behavioralFlaw === BehavioralFlaw.ARROGANT || slave.behavioralQuirk === BehavioralQuirk.CONFIDENT)) {
								if (slave.behavioralFlaw === BehavioralFlaw.ARROGANT) {
									r.push(`${His} huge tits may be annoying and <span class="health dec">painful</span> for ${his} slight form, but ${he} is well aware of <span class="trust inc">just how valuable</span> they make ${him} in your arcology.`);
									healthDamage(slave, 3);
									slave.trust += 1;
								} else if (slave.behavioralQuirk === BehavioralQuirk.CONFIDENT) {
									r.push(`${His} breasts are uncomfortably big for ${his} slight form, but ${he} knows how valuable they are to society and does ${his} best to manage with them.`);
								}
							} else if (slave.devotion <= 50) {
								r.push(`Dragging ${his} huge tits around is <span class="devotion dec">uncomfortable</span> and <span class="health dec">painful</span> for ${his} slight form.`);
								slave.devotion -= 2;
								healthDamage(slave, 3);
							} else {
								r.push(`${His} huge tits are uncomfortably big for ${his} slight form, but ${he} keeps it to ${himself} out of devotion to you.`);
							}
						}
					}
				} else if (slave.boobs > 2000) {
					if (slave.muscles <= 5) {
						if (canWalk(slave)) {
							if (slave.sexualFlaw === SexualFlaw.BREASTEXP) {
								r.push(`The weight of ${his} big boobs serves as a reminder that ${he} needs to get even bigger.`);
							} else if (FutureSocieties.isActive('FSAssetExpansionist') && (slave.behavioralFlaw === BehavioralFlaw.ARROGANT || slave.behavioralQuirk === BehavioralQuirk.CONFIDENT)) {
								if (slave.behavioralFlaw === BehavioralFlaw.ARROGANT) {
									r.push(`${His} big tits may be heavy, but ${he} is well aware of <span class="trust inc">just how sexy</span> they make ${him} in your arcology.`);
									slave.trust += 1;
								} else if (slave.behavioralQuirk === BehavioralQuirk.CONFIDENT) {
									r.push(`${His} big boobs are uncomfortably heavy for ${his} slight form, but ${he} knows how valuable they are to society and does ${his} best to deal with it.`);
								}
							} else if (slave.devotion <= 50) {
								r.push(`The weight of ${his} big boobs is <span class="devotion dec">uncomfortable</span> for ${his} slight form.`);
								slave.devotion -= 1;
							} else {
								r.push(`The weight of ${his} big boobs is uncomfortable for ${his} slight form, but ${he} bears it out of devotion to you.`);
							}
						}
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function boobAccessibility(slave) {
		if (slave.boobs > 20000) {
			if (V.boobAccessibility === 1) {
				if (slave.devotion > 20) {
					r.push(`${He}'s <span class="trust inc">thankful</span> to you for providing living spaces adapted to life with gigantic boobs.`);
					slave.trust += 1;
				}
			} else {
				r.push(`${His} gigantic boobs make life a struggle:`);
				if (V.buttAccessibility === 1 || V.pregAccessibility === 1 || V.ballsAccessibility === 1) {
					r.push(`${he} has trouble using appliances and furniture, and constantly bumps into things, but at least the doors have already been widened for your other slaves.`);
				} else {
					r.push(`${he} barely fits through doors, has trouble using appliances and furniture, and constantly bumps into things.`);
				}
				if (slave.sexualFlaw === SexualFlaw.BREASTEXP) {
					r.push(`Every little inconvenience just feeds ${his} breast growth obsession, so ${he}'s more bothered that they aren't an even bigger problem for ${his} daily life.`);
				} else if (slave.devotion > 50) {
					r.push(`Since ${he}'s devoted to you, ${he} just does ${his} best.`);
				} else if (slave.trust >= -20) {
					r.push(`This torment makes ${him} <span class="trust dec">less trusting</span> of your willingness to look after ${him}.`);
					slave.trust -= 2;
				} else {
					r.push(`${He} already believes you capable of tormenting ${him}, so this proof of your indifference <span class="devotion dec">angers ${him}</span> daily.`);
					slave.devotion -= 2;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function hugeBelly(slave) {
		let bellyBand = (slave.bellyAccessory === "a support band" || slave.clothes === "a Fuckdoll suit") ? 2 : 1;
		if (slave.belly > (slave.pregAdaptation * 4500)) {
			r.push(`${His} bloated`);
			if (slave.mpreg === 0 && slave.ovaries === 0) {
				r.push(`implant-filled middle`);
			} else {
				r.push(`womb`);
			}
			r.push(`is constantly straining to hold together and puts <span class="health dec">overwhelming pressure on ${his} skin and organs.</span> ${His} stomach is streaked with deep stretch marks and black and blue from the tension.`);
			if (isSlaveAvailable(slave) && slave.fuckdoll === 0) {
				if ((slave.sexualFlaw === SexualFlaw.BREEDER || slave.sexualFlaw === SexualFlaw.SELFHATING) && slave.preg > 0) {
					r.push(`${He} spends every painful moment in sheer joy, each agonizing motion sending quivers of lust through ${his} breaking body.`);
					if (slave.sexualFlaw === SexualFlaw.BREEDER) {
						r.push(`${He} has achieved ${his} desires of being nothing more than a baby factory absolutely.`);
					} else {
						r.push(`${He} is on the brink of sacrificing ${his} worthless life for the lives of ${his} children and ${he} couldn't be happier.`);
					}
				} else if (slave.geneticQuirks.uterineHypersensitivity === 2 && slave.preg > 0) {
					r.push(`${He} spends every moment stuck between pleasure and`);
					if (V.geneticMappingUpgrade > 0) {
						r.push(`pain due to ${his} uterine hypersensitivity;`);
					} else {
						r.push(`pain;`);
					}
					r.push(`it distracts from the possibilities at least.`);
				} else if (slave.devotion > 90) {
					r.push(`${He} believes in you so absolutely that even if ${he} doesn't make it, ${he} accepts it as your will.`);
				} else if (slave.fetish === Fetish.MINDBROKEN) {
					r.push(`${He} struggles along ${his} daily tasks as if nothing is out of the ordinary.`);
				} else {
					r.push(`This is <span class="devotion dec">horrifying</span> to ${him}. ${He} is in excruciating pain and each`);
					if (slave.bellyPreg > 100) {
						r.push(`movement within ${his} tearing womb`);
					} else {
						r.push(`breath`);
					}
					r.push(`feels like it may be ${his} last. ${He} is <span class="trust dec">terrified</span> that at any moment ${his} body may fail causing ${him} to burst.`);
					if (slave.pregControl === GestationDrug.SLOW && totalInt >= -50) {
						r.push(`${His} slowed gestation rate gives ${his} body more time to adapt to ${his} gravidity, but given ${his} situation, it just means more suffering.`);
						slave.devotion -= 15;
						slave.trust -= 20;
					} else {
						slave.devotion -= 20;
						slave.trust -= 20;
					}
				}
			}
			healthDamage(slave, 30);
			if (slave.geneticQuirks.uterineHypersensitivity === 2) {
				if (V.geneticMappingUpgrade > 0) {
					r.push(`${His} genetic gift helps ${his} body to rapidly adapt to this incredible stress.`);
				}
				slave.pregAdaptation += 5;
			} else {
				slave.pregAdaptation += 1;
			}
		} else if (slave.belly > (slave.pregAdaptation * 3200)) {
			r.push(`${His}`);
			if (slave.mpreg === 0 && slave.ovaries === 0) {
				r.push(`implant-filled abdominal cavity`);
			} else {
				r.push(`straining womb`);
			}
			r.push(`takes up most of ${his} body and puts <span class="health dec">tremendous pressure on ${his} skin and organs.</span>`);
			if (isSlaveAvailable(slave) && slave.fuckdoll === 0) {
				if (slave.sexualFlaw === SexualFlaw.BREEDER && slave.preg > 0) {
					r.push(`${He} does ${his} best to ignore the pain; after all, ${his} wishes to be hugely pregnant have come true.`);
				} else if (slave.geneticQuirks.uterineHypersensitivity === 2 && slave.preg > 0) {
					if (V.geneticMappingUpgrade > 0) {
						r.push(`${His} uterine hypersensitivity renders it more pleasurable than painful, taking ${his} mind off things.`);
					} else {
						r.push(`${He} is disturbingly enjoying the situation.`);
					}
				} else if (slave.devotion > 70) {
					r.push(`Despite`);
					if (slave.bellyPreg > 100) {
						r.push(`every movement within ${him}`);
					} else {
						r.push(`every breath`);
					}
					r.push(`feeling like a knife being driven into ${his} body, ${he} has faith in your plans for ${him}.`);
				} else if (slave.fetish === Fetish.MINDBROKEN) {
					r.push(`${He} carries on ${his} daily tasks as if nothing is bothering ${him}.`);
				} else {
					r.push(`This is <span class="devotion dec">very worrying</span> to ${him}. ${He} is in constant pain and`);
					if (slave.bellyPreg > 100) {
						r.push(`each movement within ${his} straining womb`);
					} else {
						r.push(`every breath ${he} takes,`);
					}
					r.push(`causes additional agony. ${He} is <span class="trust dec">terrified</span> of what`);
					if (slave.bellyPreg > 100) {
						r.push(`awaits ${him} at the end of this pregnancy.`);
					} else {
						r.push(`will become of ${him}.`);
					}
					if (slave.pregControl === GestationDrug.SLOW && totalInt >= -50) {
						r.push(`${His} slowed gestation rate gives ${his} body more time to adapt to ${his} gravidity, but given ${his} situation, it isn't very comforting.`);
						slave.devotion -= 7;
						slave.trust -= 10;
					} else {
						slave.devotion -= 10;
						slave.trust -= 10;
					}
				}
			}
			healthDamage(slave, 20);
			if (slave.geneticQuirks.uterineHypersensitivity === 2) {
				if (V.geneticMappingUpgrade > 0) {
					r.push(`${His} genetic gift helps ${his} body to rapidly adapt to such extreme stress.`);
				}
				slave.pregAdaptation += 4;
			} else {
				slave.pregAdaptation += .4;
			}
		} else if (slave.belly > (slave.pregAdaptation * 2000)) {
			r.push(`${His}`);
			if (slave.mpreg === 0 && slave.ovaries === 0) {
				r.push(`belly implant`);
			} else {
				r.push(`womb`);
			}
			r.push(`takes up most of ${his} body and <span class="health dec">puts tremendous pressure on ${his} skin and organs.</span>`);
			if (isSlaveAvailable(slave) && slave.fuckdoll === 0) {
				if (slave.sexualFlaw === SexualFlaw.BREEDER && slave.preg > 0) {
					r.push(`Every painful kick is a reminder of just how pregnant ${he} really is, but it just makes ${his} condition hotter to ${him}.`);
				} else if (slave.geneticQuirks.uterineHypersensitivity === 2 && slave.preg > 0) {
					if (V.geneticMappingUpgrade > 0) {
						r.push(`${His} uterine hypersensitivity renders it completely pleasurable.`);
					} else {
						r.push(`${He} handles it well, if a little disturbingly.`);
					}
				} else if (slave.devotion > 50) {
					r.push(`While`);
					if (slave.bellyPreg > 100) {
						r.push(`every stirring of the life within ${him} is uncomfortable,`);
					} else {
						r.push(`every motion ${he} takes is uncomfortable,`);
					}
					r.push(`${he} tries ${his} best to not bother you with ${his} worries.`);
				} else if (slave.fetish === Fetish.MINDBROKEN) {
					r.push(`${He} tries ${his} best to stay still to minimize the amount of discomfort ${he}'s in.`);
				} else {
					r.push(`This is <span class="devotion dec">very worrying</span> to ${him}. ${He} moans in discomfort`);
					if (slave.bellyPreg > 100) {
						r.push(`with each movement within ${him}.`);
					} else {
						r.push(`whenever ${he} is forced to move.`);
					}
					if (slave.pregControl === GestationDrug.SLOW && totalInt >= -50) {
						r.push(`${His} slowed gestation rate gives ${his} body more time to adapt to ${his} gravidity, easing some of ${his} worries.`);
						slave.devotion -= 3;
					} else {
						slave.devotion -= 5;
					}
				}
			}
			healthDamage(slave, (10 / bellyBand));
			if (slave.geneticQuirks.uterineHypersensitivity === 2) {
				if (V.geneticMappingUpgrade > 0) {
					r.push(`${His} genetic gift helps ${his} body to rapidly adapt to such huge stress.`);
				}
				slave.pregAdaptation += 3;
			} else {
				slave.pregAdaptation += .3;
			}
		} else if (slave.belly > (slave.pregAdaptation * 1000)) {
			r.push(`${His}`);
			if (slave.mpreg === 0 && slave.ovaries === 0) {
				r.push(`belly implant`);
			} else {
				r.push(`womb`);
			}
			r.push(`fills ${his} body and <span class="health dec">compresses ${his} internal organs.</span>`);
			if (isSlaveAvailable(slave) && slave.fuckdoll === 0) {
				if (slave.sexualFlaw === SexualFlaw.BREEDER && slave.preg > 0) {
					r.push(`While ${he} may be uncomfortable, it only serves to remind ${him} that ${he} can sustain larger.`);
				} else if (slave.geneticQuirks.uterineHypersensitivity === 2 && slave.preg > 0) {
					if (V.geneticMappingUpgrade > 0) {
						r.push(`${His} uterine hypersensitivity renders it rather enjoyable.`);
					} else {
						r.push(`${He} handles it oddly well, if a little disturbingly.`);
					}
				} else if (slave.devotion > 50) {
					r.push(`${He} is in constant discomfort, but ${he} grins and bears it for you.`);
				} else if (slave.fetish === Fetish.MINDBROKEN) {
					r.push(`Such discomforts are meaningless to ${his} broken mind.`);
				} else  {
					r.push(`${He} is in constant <span class="devotion dec">discomfort</span> and`);
					if (slave.bellyPreg > 100) {
						r.push(`can't wait for these children to be born.`);
					} else {
						r.push(`dreads having to work with it.`);
					}
					if (slave.pregControl === GestationDrug.SLOW && totalInt >= -50) {
						r.push(`${His} slowed gestation rate gives ${his} body more time to adapt to ${his} gravidity, easing some of ${his} worries.`);
						slave.devotion -= 1;
					} else {
						slave.devotion -= 2;
					}
				}
			}
			healthDamage(slave, (2 / bellyBand));
			if (slave.geneticQuirks.uterineHypersensitivity === 2) {
				if (V.geneticMappingUpgrade > 0) {
					r.push(`${His} genetic gift helps ${his} body to rapidly adapt to such stress.`);
				}
				slave.pregAdaptation += 2;
			} else {
				slave.pregAdaptation += .2;
			}
		} else if (slave.belly > (slave.pregAdaptation * 750)) {
			if (slave.geneticQuirks.uterineHypersensitivity === 2) {
				if (V.geneticMappingUpgrade > 0) {
					r.push(`${His} genetic gift helps ${his} body to rapidly adapt to ${his} gravidity.`);
				}
				slave.pregAdaptation += 1;
			} else {
				slave.pregAdaptation += .1;
			}
		}
		if (slave.geneMods.progenitor === 1 && slave.belly > (slave.pregAdaptation * 750)) {
			r.push(`${His} genetically altered body quickly adjusts to ${his} increased gravidity.`);
			slave.pregAdaptation += 1;
		}
		if (slave.wombImplant === "restraint" && slave.belly >= 400000) {
			r.push(`The mesh implanted into the walls of ${his} uterus is nearing its limit and <span class="health dec">beginning to strangle</span> the organ it is meant to support. While it is still structurally sound, it can only expand so much before failing.`);
			healthDamage(slave, 15);
		}

		if (V.seeExtreme === 1 && V.dangerousPregnancy === 1 && slave.geneMods.rapidCellGrowth !== 1 && slave.bellyPreg >= 100000 && slave.belly > (slave.pregAdaptation * 3200) && (slave.bellyPreg >= 500000 || slave.wombImplant !== "restraint")) {
			if (slave.assignment === Job.CLINIC) {
				if (S.Nurse) {
					r.push(`The fast actions of ${V.clinicName}'s nurse, ${S.Nurse.slaveName}, saved ${his} life a few times. <span class="health dec">${His} womb is breaking!</span>`);
				} else {
					r.push(`Automatic monitors in ${V.clinicName} detected critical pressure and called junior medical staff. They managed to hold ${him} together, for now; <span class="health dec">${his} womb is breaking!</span>`);
				}
			} else if (slave.assignment === Job.DAIRY && V.dairyPregSetting === 3) {
				r.push(`Automatic monitors in ${his} harness detected ${his} womb has reached critical mass and applied a special adaptive belly corset to hold <span class="health dec">${his} breaking womb</span> together.`);
			}
		}

		/* body inconvenience */
		if (slave.fuckdoll !== 0 && slave.fetish !== Fetish.MINDBROKEN && isSlaveAvailable(slave)) {
			const belly = bellyAdjective(slave);
			if (slave.physicalAge < 4) {
				if (slave.belly >= 150000) {
					r.push(`${His} ${belly} belly is so large it dwarfs ${his} body. ${He}`);
					if (slave.sexualFlaw === SexualFlaw.BREEDER && slave.preg > 0) {
						r.push(`enjoys`);
					} else {
						r.push(`has no choice but to accept`);
					}
					r.push(`being an accessory to ${his} belly.`);
				} else if (slave.belly >= 100000) {
					r.push(`${His} ${belly} belly is so large it reaches the floor`);
					if (hasAnyLegs(slave)) {
						r.push(`even when ${he} stands,`);
					} else {
						r.push(`no matter how ${he} rests,`);
					}
					r.push(`taking the weight off ${his} tiny body.`);
					if (canMove(slave)) {
						if (slave.sexualFlaw === SexualFlaw.BREEDER && slave.preg > 0) {
							r.push(`Such an inconvenience means little when you're living the dream of being a baby-filled breeder.`);
						} else if (slave.devotion <= 50) {
							r.push(`${He} finds dragging it along <span class="devotion dec">mildly annoying.</span>`);
							slave.devotion -= 1;
						} else {
							r.push(`${He}'s fine with this though, as it is much easier than trying to waddle along.`);
						}
					}
				} else if (slave.belly >= 30000) {
					if (canWalk(slave)) {
						r.push(`${His} ${belly} belly is debilitatingly big. ${He} can barely waddle along and even then, can't manage to avoid bumping into`);
						if (slave.sexualFlaw === SexualFlaw.BREEDER && slave.preg > 0) {
							r.push(`things. Such troubles matter little when you're living the dream of being a baby-filled breeder.`);
						} else if (slave.devotion <= 50) {
							r.push(`things, leaving ${him} <span class="devotion dec">extremely annoyed</span> as ${he} goes about ${his} day.`);
							slave.devotion -= 4;
						} else {
							r.push(`things, but quickly struggles to fix it to keep you happy.`);
						}
					}
				} else if (slave.belly >= 10000) {
					if (canWalk(slave)) {
						r.push(`${His} ${belly} belly juts out tremendously from ${his} slight`);
						if (slave.sexualFlaw === SexualFlaw.BREEDER && slave.preg > 0) {
							r.push(`form, but the life growing within makes that alright to ${him}.`);
						} else if (slave.devotion <= 50) {
							r.push(`form causing ${him} <span class="devotion dec">frustration</span> as ${he} tries ${his} best to not bump into things.`);
							slave.devotion -= 2;
						} else {
							r.push(`form, but ${he} bears it out of devotion to you.`);
						}
					}
				}
			} else if (slave.physicalAge < 13) {
				if (slave.belly >= 300000) {
					r.push(`${His} ${belly} belly is so large it dwarfs ${his} body. ${He}`);
					if (slave.sexualFlaw === SexualFlaw.BREEDER && slave.preg > 0) {
						r.push(`enjoys`);
					} else {
						r.push(`has no choice but to accept`);
					}
					r.push(`being an accessory to ${his} belly.`);
				} else if (slave.belly >= 200000) {
					r.push(`${His} ${belly} belly is so large it reaches the floor`);
					if (hasAnyLegs(slave)) {
						r.push(`even when ${he} stands,`);
					} else {
						r.push(`no matter how ${he} rests,`);
					}
					r.push(`taking the weight off ${his} young figure.`);
					if (canMove(slave)) {
						if (slave.sexualFlaw === SexualFlaw.BREEDER && slave.preg > 0) {
							r.push(`Such an inconvenience means little when you're living the dream of being a baby-filled breeder.`);
						} else if (slave.devotion <= 50) {
							r.push(`${He} finds dragging it along <span class="devotion dec">mildly annoying.</span>`);
							slave.devotion -= 1;
						} else {
							r.push(`While it is quite a nuisance, your will outweighs ${his} opinions.`);
						}
					}
				} else if (slave.belly >= 120000) {
					if (canWalk(slave)) {
						r.push(`${His} ${belly} belly is debilitatingly big. ${He} can barely waddle along and even then, can't manage to avoid bumping into`);
						if (slave.sexualFlaw === SexualFlaw.BREEDER && slave.preg > 0) {
							r.push(`things. Such troubles matter little when you're living the dream of being a baby-filled breeder.`);
						} else if (slave.devotion <= 50) {
							r.push(`things, leaving ${him} <span class="devotion dec">overly frustrated</span> and moody by the end of the day.`);
							slave.devotion -= 4;
						} else {
							r.push(`things, but accepts this is the life you have chosen for ${him}.`);
						}
					}
				} else if (slave.belly >= 60000) {
					if (canWalk(slave)) {
						r.push(`${His} ${belly} belly is troublesome for ${his} young figure. Every step is a slow, ponderous one and ${he} has to be careful not to collide with anything.`);
						if (slave.sexualFlaw === SexualFlaw.BREEDER && slave.preg > 0) {
							r.push(`However, such inconveniences are nothing when you're living the dream of being a baby-filled breeder.`);
						} else if (slave.devotion <= 50) {
							r.push(`${His} day to day life is <span class="devotion dec">filled with annoyances</span> as ${he} struggles along.`);
							slave.devotion -= 4;
						} else {
							r.push(`However, ${he} takes pride in being kept so round by you, so ${he} keeps ${his} thoughts to ${himself}.`);
						}
					}
				} else if (slave.belly >= 12000) {
					if (canWalk(slave)) {
						r.push(`${His} ${belly} belly juts out heavily from ${his} young`);
						if (slave.sexualFlaw === SexualFlaw.BREEDER && slave.preg > 0) {
							r.push(`frame, but the life growing within makes that alright to ${him}.`);
						} else if (slave.devotion <= 50) {
							r.push(`frame causing ${him} <span class="devotion dec">frustration</span> as ${he} tries ${his} hardest to move with it.`);
							slave.devotion -= 2;
						} else {
							r.push(`frame, but ${he} bears it out of devotion to you.`);
						}
					}
				}
			} else if (slave.physicalAge < 18) {
				if (slave.belly >= 600000) {
					r.push(`${His} ${belly} belly is so large it dwarfs ${his} body. ${He}`);
					if (slave.sexualFlaw === SexualFlaw.BREEDER && slave.preg > 0) {
						r.push(`enjoys`);
					} else {
						r.push(`has no choice but to accept`);
					}
					r.push(`being an accessory to ${his} belly.`);
				} else if (slave.belly >= 300000) {
					r.push(`${His} ${belly} belly is so large it reaches the floor`);
					if (hasAnyLegs(slave)) {
						r.push(`even when ${he} stands,`);
					} else {
						r.push(`no matter how ${he} rests,`);
					}
					r.push(`taking the weight off ${his} body.`);
					if (canMove(slave)) {
						if (slave.sexualFlaw === SexualFlaw.BREEDER && slave.preg > 0) {
							r.push(`Such an inconvenience means little when you're living the dream of being a baby-filled breeder.`);
						} else if (slave.devotion <= 50) {
							r.push(`${He} finds dragging it along <span class="devotion dec">a painful problem.</span>`);
							slave.devotion -= 5;
						} else {
							r.push(`While moving it is a problem, ${he} struggles through it for you.`);
						}
					}
				} else if (slave.belly >= 200000) {
					if (canWalk(slave)) {
						r.push(`${His} ${belly} belly is debilitatingly big. ${He} can barely waddle along and even then, it's practically impossible to avoid`);
						if (slave.sexualFlaw === SexualFlaw.BREEDER && slave.preg > 0) {
							r.push(`things, but you take your lumps with pride when you're this heavy with child.`);
						} else if (slave.devotion <= 50) {
							r.push(`things, leaving ${him} <span class="devotion dec">overly frustrated</span> and a little roughed up by the end of the day.`);
							slave.devotion -= 4;
						} else {
							r.push(`things, but if you like the huge dome hanging from ${his} body, so does ${he}.`);
						}
					}
				} else if (slave.belly >= 80000) {
					if (canWalk(slave)) {
						r.push(`${His} ${belly} belly is troublesome for ${him}. Every step is a slow, ponderous one and ${he} has to be careful not to collide with anything.`);
						if (slave.sexualFlaw === SexualFlaw.BREEDER && slave.preg > 0) {
							r.push(`However, such inconveniences are nothing when you're more pregnant than any woman ever was in the old world.`);
						} else if (slave.devotion <= 50) {
							r.push(`${His} day to day life is <span class="devotion dec">miserable</span> as ${he} struggles to do the simplest of tasks.`);
							slave.devotion -= 4;
						} else {
							r.push(`However, ${he} takes pride in being kept so big and round by you, so ${he} keeps ${his} thoughts to ${himself}.`);
						}
					}
				} else if (slave.belly >= 30000) {
					if (canWalk(slave)) {
						r.push(`${His} ${belly} belly juts out heavily from ${his}`);
						if (slave.sexualFlaw === SexualFlaw.BREEDER && slave.preg > 0) {
							r.push(`frame, but being so full of life is wondrous to ${him}.`);
						} else if (slave.devotion <= 50) {
							r.push(`frame causing ${him} <span class="devotion dec">frustration</span> as ${he} frequently bumps things with it.`);
							slave.devotion -= 2;
						} else {
							r.push(`frame, but ${he} bears it out of devotion to you.`);
						}
					}
				}
			} else {
				if (slave.belly >= 1500000) {
					r.push(`${His} ${belly} belly is so large it dwarfs ${his} body. ${He}`);
					if (slave.sexualFlaw === SexualFlaw.BREEDER && slave.preg > 0) {
						r.push(`enjoys`);
					} else {
						r.push(`has no choice but to accept`);
					}
					r.push(`being an accessory to ${his} belly.`);
				} else if (slave.belly >= 1000000) {
					r.push(`${His} ${belly} belly is so large it reaches the floor`);
					if (hasAnyLegs(slave)) {
						r.push(`even when ${he} stands,`);
					} else {
						r.push(`no matter how ${he} rests,`);
					}
					r.push(`taking the weight off ${his} body.`);
					if (canMove(slave)) {
						if (slave.sexualFlaw === SexualFlaw.BREEDER && slave.preg > 0) {
							r.push(`Such an inconvenience means little when you're living the dream of being a baby-filled breeder.`);
						} else if (slave.devotion <= 50) {
							r.push(`${He} finds dragging it along <span class="devotion dec">a painful problem.</span>`);
							slave.devotion -= 5;
						} else {
							r.push(`While moving it is a problem, ${he} struggles through it for you.`);
						}
					}
				} else if (slave.belly >= 300000) {
					if (canWalk(slave)) {
						r.push(`${His} ${belly} belly is debilitatingly big. ${He} can barely waddle along and even then, it's practically impossible to avoid`);
						if (slave.sexualFlaw === SexualFlaw.BREEDER && slave.preg > 0) {
							r.push(`things, but you take your lumps with pride when you're this heavy with child.`);
						} else if (slave.devotion <= 50) {
							r.push(`things, leaving ${him} <span class="devotion dec">overly frustrated</span> and a little roughed up by the end of the day.`);
							slave.devotion -= 4;
						} else {
							r.push(`things, but if you like the huge dome hanging from ${his} body, so does ${he}.`);
						}
					}
				} else if (slave.belly >= 150000) {
					if (canWalk(slave)) {
						r.push(`${His} ${belly} belly is troublesome for ${him}. Every step is a slow, ponderous one and ${he} has to be careful not to collide with anything.`);
						if (slave.sexualFlaw === SexualFlaw.BREEDER && slave.preg > 0) {
							r.push(`However, such inconveniences are nothing when you're more pregnant than any woman ever was in the old world.`);
						} else if (slave.devotion <= 50) {
							r.push(`${His} day to day life is <span class="devotion dec">miserable</span> as ${he} struggles to do the simplest of tasks.`);
							slave.devotion -= 4;
						} else {
							r.push(`However, ${he} takes pride in being kept so big and round by you, so ${he} keeps ${his} thoughts to ${himself}.`);
						}
					}
				} else if (slave.belly >= 75000) {
					if (canWalk(slave)) {
						r.push(`${His} ${belly} belly juts out heavily from ${his}`);
						if (slave.sexualFlaw === SexualFlaw.BREEDER && slave.preg > 0) {
							r.push(`frame, but being so full of life is wondrous to ${him}.`);
						} else if (slave.devotion <= 50) {
							r.push(`frame causing ${him} <span class="devotion dec">frustration</span> as ${he} frequently bumps things with it.`);
							slave.devotion -= 2;
						} else {
							r.push(`frame, but ${he} bears it out of devotion to you.`);
						}
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function bellyAccessibility(slave) {
		if (slave.bellyPreg >= 100000) {
			if (V.pregAccessibility === 1) {
				if (slave.devotion > 20) {
					r.push(`${He}'s <span class="trust inc">thankful</span> to you for providing living spaces adapted to heavily pregnant life.`);
					slave.trust += 1;
				}
			} else {
				r.push(`${His} giant pregnancy makes life a struggle:`);
				if (V.buttAccessibility === 1 || V.boobAccessibility === 1 || V.ballsAccessibility === 1) {
					r.push(`${he} has trouble using appliances and furniture, and constantly bumps into things, but at least the doors have already been widened for your other slaves.`);
				} else {
					r.push(`${he} barely fits through doors, has trouble using appliances and furniture, and constantly bumps into things.`);
				}
				if (slave.sexualFlaw === SexualFlaw.BREEDER) {
					r.push(`But all this just feeds ${his} obsession with being a breeder.`);
				} else if (slave.devotion > 50) {
					r.push(`Since ${he}'s devoted to you, ${he} just does ${his} best.`);
				} else if (slave.trust >= -20) {
					r.push(`This torment makes ${him} <span class="trust dec">less trusting</span> of your willingness to look after ${him}.`);
					slave.trust -= 2;
				} else {
					r.push(`${He} already believes you capable of tormenting ${him}, so this proof of your indifference <span class="devotion dec">angers ${him}</span> daily.`);
					slave.devotion -= 2;
				}
			}
		}
		if (slave.bellyImplant >= 100000) {
			if (V.pregAccessibility === 1) {
				if (slave.devotion > 20) {
					r.push(`${He}'s <span class="trust inc">thankful</span> to you for providing living spaces adapted to life with an enormous belly.`);
					slave.trust += 1;
				}
			} else {
				r.push(`${His} giant belly makes life a struggle:`);
				if (V.buttAccessibility === 1 || V.boobAccessibility === 1 || V.ballsAccessibility === 1) {
					r.push(`${he} has trouble using appliances and furniture, and constantly bumps into things, but at least the doors have already been widened for your other slaves.`);
				} else {
					r.push(`${he} barely fits through doors, has trouble using appliances and furniture, and constantly bumps into things.`);
				}
				if (slave.devotion > 40) {
					r.push(`Since ${he}'s devoted to you, ${he} just does ${his} best.`);
				} else if (slave.trust >= -20) {
					r.push(`This torment makes ${him} <span class="trust dec">less trusting</span> of your willingness to look after ${him}.`);
					slave.trust -= 2;
				} else {
					r.push(`${He} already believes you capable of tormenting ${him}, so this proof of your indifference <span class="devotion dec">angers ${him}</span> daily.`);
					slave.devotion -= 2;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function hugeDick(slave) {
		if (canMove(slave)) {
			if (slave.dick >= 30) {
				if (slave.devotion <= 50) {
					r.push(`${His} titanic penis rests upon the floor even when ${he} stands. ${He} finds moving <span class="devotion dec">terrifying</span> since ${he} drags ${his} cock along.`);
					slave.devotion -= 3;
				} else {
					r.push(`${His} titanic penis rests upon the floor even when ${he} stands. ${He} pays close attention as ${he} moves to keep it pristine for you.`);
				}
			} else if (slave.dick > 20) {
				if (slave.devotion <= 50) {
					r.push(`${His} enormous cock is <span class="devotion dec">very uncomfortable</span> for ${him} to drag around.`);
					slave.devotion -= 2;
				} else {
					r.push(`${His} enormous cock is uncomfortable for ${him} to move with, but ${he} bears its weight out of devotion to you.`);
				}
			} else if (slave.dick >= 10) {
				if (canWalk(slave)) {
					if (slave.devotion <= 50) {
						r.push(`${His} giant dick is <span class="devotion dec">uncomfortable</span> for ${his} body.`);
						slave.devotion -= 1;
					} else {
						r.push(`${He} can't seem to get comfortable with ${his} giant dick, but ${he} keeps it to ${himself} out of devotion.`);
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function dickAccessibility(slave) {
		if (slave.dick >= 20) {
			if (V.dickAccessibility === 1) {
				if (slave.devotion > 20) {
					r.push(`${He}'s <span class="trust inc">thankful</span> to you for providing living spaces adapted to life with an enormous dick.`);
					slave.trust += 1;
				}
			} else if (canMove(slave)) {
				r.push(`${His} giant penis makes life a struggle: ${he} has to drag it along as ${he} moves, has trouble fitting into beds and sitting in chairs, and constantly has to make sure to not get ${his} dick caught in doors.`);
				if (slave.devotion > 50) {
					r.push(`Since ${he}'s devoted to you, ${he} just does ${his} best.`);
				} else if (slave.trust >= -20) {
					r.push(`This torment makes ${him} <span class="trust dec">less trusting</span> of your willingness to look after ${him}.`);
					slave.trust -= 2;
				} else {
					r.push(`${He} already believes you capable of tormenting ${him}, so this proof of your indifference <span class="devotion dec">angers ${him}</span> daily.`);
					slave.devotion -= 3;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function hugeBalls(slave) {
		if (canMove(slave)) {
			if (slave.balls > 90) {
				r.push(`${His} titanic balls rest upon the floor even when ${he} stands.`);
				if (slave.devotion <= 50) {
					r.push(`${He} finds them <span class="devotion dec">annoying</span> to lug around.`);
					slave.devotion -= 1;
				} else {
					r.push(`They are a little annoying at times, but ${he} bears them with pride.`);
				}
			} else if (slave.balls > 50) {
				if (slave.devotion <= 50) {
					r.push(`${His} enormous balls are <span class="devotion dec">very uncomfortable</span> for ${him} to carry.`);
					slave.devotion -= 2;
				} else {
					r.push(`${He} finds ${his} enormous balls a little uncomfortable, but ${he} bears their weight out of devotion to you.`);
				}
			} else if (slave.balls > 25) {
				if (slave.devotion <= 50) {
					r.push(`${His} huge balls are <span class="devotion dec">uncomfortable</span> for ${his} body.`);
					slave.devotion -= 1;
				} else {
					r.push(`${He} can't seem to get comfortable with ${his} huge balls, but ${he} keeps it to ${himself} out of devotion.`);
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function ballsAccessibility(slave) {
		if (slave.balls > 90) {
			if (V.ballsAccessibility === 1) {
				if (slave.devotion > 20) {
					r.push(`${He}'s <span class="trust inc">thankful</span> to you for providing living spaces adapted to life with enormous testicles.`);
					slave.trust += 1;
				}
			} else if (canMove(slave)) {
				r.push(`${His} giant balls make life a struggle:`);
				if (V.buttAccessibility === 1 || V.pregAccessibility === 1 || V.boobAccessibility === 1) {
					r.push(`${he} has trouble using appliances and furniture, and has to be constantly mindful of things striking ${his} oversensitive testicles, but at least the doors have already been widened for your other slaves.`);
				} else {
					r.push(`${he} barely fits through doors, has trouble using appliances and furniture, and has to be constantly mindful of things striking ${his} oversensitive testicles.`);
				}
				if (slave.devotion > 50) {
					r.push(`Since ${he}'s devoted to you, ${he} just does ${his} best.`);
				} else if (slave.trust >= -20) {
					r.push(`This torment makes ${him} <span class="trust dec">less trusting</span> of your willingness to look after ${him}.`);
					slave.trust -= 2;
				} else {
					r.push(`${He} already believes you capable of tormenting ${him}, so this proof of your indifference <span class="devotion dec">angers ${him}</span> daily.`);
					slave.devotion -= 3;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function hugeHips(slave) {
		if (canWalk(slave)) {
			if (slave.hips > 2) {
				r.push(`${His} inhumanly wide hips make walking difficult. ${He} can barely move without swinging them side to side seductively, and ${he} keeps bumping things with them.`);
				if (slave.sexualFlaw === SexualFlaw.BREEDER) {
					r.push(`${He} <span class="devotion inc">loves</span> how ${his} wide body basically screams "fertility goddess".`);
					slave.devotion += 1;
				} else if (slave.devotion > 50) {
					r.push(`Since ${he}'s devoted to you, ${he} embraces ${his} wide body and does everything ${he} can to show it off for you.`);
				} else if (slave.devotion >= -20) {
					r.push(`This gait makes ${him} feel like a huge whore, <span class="devotion inc">increasing ${his} submissiveness.</span>`);
					slave.devotion += 2;
				} else {
					r.push(`${He} hates that ${he} is forced to bear such freakish hips and <span class="devotion dec">blames you</span> for every trip, bumped object, and hip checked slave.`);
					slave.devotion -= 3;
				}
			}
		} else if (slave.sexualFlaw === SexualFlaw.BREEDER && slave.hips > 2) {
			r.push(`${He} <span class="devotion inc">loves</span> how ${his} wide body basically screams "fertility goddess".`);
			slave.devotion += 1;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function hugeButt(slave) {
		if (canWalk(slave)) {
			if (slave.butt > 15) {
				r.push(`${His} butt is a massive burden to ${him}. ${He} dreads walking down narrow hallways and getting dressed in the morning.`);
				if (FutureSocieties.isActive('FSAssetExpansionist') && (slave.behavioralFlaw === BehavioralFlaw.ARROGANT || slave.behavioralQuirk === BehavioralQuirk.CONFIDENT)) {
					if (slave.behavioralFlaw === BehavioralFlaw.ARROGANT) {
						r.push(`However, your arcology can't help but worship an ass as expansive as ${hers}, <span class="trust inc">giving ${him} an ego</span> that rivals ${his} rear.`);
						slave.trust += 3;
					} else if (slave.behavioralQuirk === BehavioralQuirk.CONFIDENT) {
						r.push(`However, your arcology can't help but worship an ass as expansive as ${hers}, so it mostly balances out.`);
					}
				} else if (slave.devotion <= 50) {
					r.push(`${He} lives a life of <span class="devotion dec">annoyance</span> over knocking things over, bumping people, and getting stuck in chairs with ${his} godly ass.`);
					slave.devotion -= 2;
				} else {
					r.push(`${He} lives a life of minor annoyances knocking things over, bumping people and getting stuck in chairs with ${his} godly ass, but bears them with pride out of devotion.`);
				}
			} else if (slave.butt > 10) {
				r.push(`${His} butt has gotten absolutely enormous.`);
				if (FutureSocieties.isActive('FSAssetExpansionist') && (slave.behavioralFlaw === BehavioralFlaw.ARROGANT || slave.behavioralQuirk === BehavioralQuirk.CONFIDENT)) {
					if (slave.behavioralFlaw === BehavioralFlaw.ARROGANT) {
						r.push(`Your arcology glorifies asses as large as ${hers}, <span class="trust inc">inflating ${his} ego</span> almost as large as ${his} rear.`);
						slave.trust += 2;
					} else if (slave.behavioralQuirk === BehavioralQuirk.CONFIDENT) {
						r.push(`Your arcology glorifies asses as large as ${hers}, so the minor annoyances don't seem so bad.`);
					}
				} else if (slave.devotion <= 50) {
					r.push(`${He} finds it a <span class="devotion dec">massive nuisance</span> to live with.`);
					slave.devotion -= 1;
				} else {
					r.push(`${He} finds it a massive nuisance to live with, but does anyway out of devotion to you.`);
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function buttAccessibility(slave) {
		if (slave.butt > 15) {
			if (V.buttAccessibility === 1) {
				if (slave.devotion > 20) {
					r.push(`${He}'s <span class="trust inc">thankful</span> to you for providing living spaces adapted to life with way too much excess junk in the trunk.`);
					slave.trust += 1;
				}
			} else {
				r.push(`${His} giant butt makes life a struggle:`);
				if (V.ballsAccessibility === 1 || V.pregAccessibility === 1 || V.boobAccessibility === 1) {
					r.push(`${he} has trouble using furniture, and constantly bumps into things, but at least the doors have already been widened for your other slaves.`);
				} else {
					r.push(`${he} barely fits through doors, has trouble using furniture, and constantly bumps into things.`);
				}
				if (slave.devotion > 50) {
					r.push(`Since ${he}'s devoted to you, ${he} just does ${his} best.`);
				} else if (slave.trust >= -20) {
					r.push(`This torment makes ${him} <span class="trust dec">less trusting</span> of your willingness to look after ${him}.`);
					slave.trust -= 1;
				} else {
					r.push(`${He} already believes you capable of tormenting ${him}, so this proof of your indifference <span class="devotion dec">angers ${him}</span> daily.`);
					slave.devotion -= 2;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function healthBlips(slave) {
		if (V.curativeSideEffects !== 0) {
			if (slave.chem > 10) {
				if (random(1, 200) < slave.chem + slave.physicalAge - slave.health.condition - (5 * slave.curatives)) {
					const effect = random(1, 10);
					healthDamage(slave, 10);
					switch (effect) {
						case 1:
							r.push(`A routine medical scan detects a small, benign growth in one of ${his} breasts. The autosurgery removes it with only <span class="health dec">minor health consequences,</span>`);
							break;
						case 2:
							r.push(`A routine medical scan detects a small, benign growth`);
							if (slave.ovaries === 1) {
								r.push(`on one of ${his} ovaries.`);
							} else if (slave.balls > 0) {
								r.push(`in one of ${his} testicles.`);
							} else {
								r.push(`in ${his} abdomen.`);
							}
							r.push(`The autosurgery removes it with only <span class="health dec">minor health consequences,</span>`);
							break;
						case 3:
							r.push(`${He} experiences a troublingly severe panic attack one morning. It passes with <span class="health dec">a minor dose of medication,</span>`);
							break;
						case 4:
							r.push(`${He} suffers a series of severe headaches. They pass with <span class="health dec">a minor dose of medication,</span>`);
							break;
						case 5:
							r.push(`${He} experiences recurrent nausea this week. It passes with <span class="health dec">a minor dose of medication,</span>`);
							break;
						case 6:
							r.push(`${He} experiences troublingly severe night terrors several times this week. <span class="health dec">A minor dose of medication</span> resolves them,`);
							break;
						case 7:
							r.push(`A routine medical scan detects a minor arrhythmia in ${his} heart. <span class="health dec">A minor dose of medication</span> resolves it,`);
							break;
						case 8:
							r.push(`A trivial injury turns serious when ${his} blood takes an unnaturally long time to clot. The autosurgery patches ${him} up with only <span class="health dec">minor health consequences,</span>`);
							break;
						case 9:
							r.push(`An unsightly new vein becomes visible, just under ${his} ${slave.skin} skin. The autosurgery removes it with only <span class="health dec">minor health consequences,</span>`);
							break;
						default:
							r.push(`${He} seems <span class="health dec">slightly ill</span> this week. ${He} recovers quickly,`);
					}
					r.push(`but it's likely this is a side effect of the heavy drug treatments ${he}'s received.`);
					if (V.arcologies[0].FSBodyPuristLaw === 1) {
						r.push(`Your society's focus on preventing things like this is starting to have an effect, but long term damage like that ${he} has suffered takes time to resolve itself.`);
					} else if (V.healthyDrugsUpgrade === 1) {
						r.push(`Your effort to provide drug treatments free of negative side effects is starting to show results, but long term damage like that ${he} has suffered takes time to resolve itself.`);
					}
				}
			}
		}

		if (slave.weight > 190) {
			if (slave.curatives !== 1) {
				r.push(`${His} extreme obesity <span class="health dec">directly affects</span> ${his} health.`);
				healthDamage(slave, 2);
			}
			if (random(1, 200) < 5) {
				r.push(`${He} experienced <span class="health dec">severe health complications</span> due to ${his} weight this week. After extensive surgery, ${his} health was stabilized, though ${his} survival is not assured.`);
				healthDamage(slave, 80);
			}
		} else if (slave.weight > 160) {
			if (slave.curatives !== 1) {
				r.push(`${His} obesity <span class="health dec">directly affects</span> ${his} health.`);
				healthDamage(slave, 1);
			}
			if (random(1, 200) < 5) {
				r.push(`${He} experienced <span class="health dec">severe health complications</span> due to ${his} weight this week. After extensive surgery, ${his} health was stabilized.`);
				healthDamage(slave, 40);
			}
		} else if (slave.weight > 130) {
			if (random(1, 200) < 5) {
				r.push(`${He} experienced <span class="health dec">severe health complications</span> due to ${his} weight this week. After some rest, ${he} recovered.`);
				healthDamage(slave, 20);
			}
		} else if (slave.weight > 95) {
			if (random(1, 200) < 5) {
				r.push(`${He} experienced <span class="health dec">minor health complications</span> due to ${his} weight this week. After some rest, ${he} recovered.`);
				healthDamage(slave, 5);
			}
		}
	}
};
