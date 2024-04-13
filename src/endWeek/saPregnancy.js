// cSpell:ignore tribs

/**
 * @param {FC.ReportSlave} slave
 * @returns {string}
 */
App.SlaveAssignment.pregnancy = function saPregnancy(slave) {
	/** @type {string[]} */
	const r = [];

	const gigantomastiaMod = slave.geneticQuirks.gigantomastia === 2 ? (slave.geneticQuirks.macromastia === 2 ? 3 : 2) : 1;
	const rearQuirk = slave.geneticQuirks.rearLipedema === 2 ? 2 : 0;
	const uterineHypersensitivityMod = slave.geneticQuirks.uterineHypersensitivity === 2 ? 2 : 1;

	const {
		he, him, his, himself, girl, He, His, wife
	} = getPronouns(slave);

	if (slave.preg > 0) {
		pregnancyEffects(slave);
	}
	if (V.seePreg !== 0) {
		preconception(slave);
		pregnancySanityCheck(slave);
	}

	return r.join(" ");

	/**
	 * @param {FC.ReportSlave} slave
	 *
	 */
	function pregnancyEffects(slave) {
		pregnancyDiscovery(slave);
		if (slave.fuckdoll === 0 && slave.fetish !== Fetish.MINDBROKEN) {
			pregnancyLibido(slave);
		}
		fetalAdjustment(slave);
		if (slave.preg >= slave.pregData.normalBirth / 4) {
			pregnancyAdjustments(slave);
			if (slave.fuckdoll === 0 && slave.fetish !== Fetish.MINDBROKEN) {
				pregnancyMentalEffects(slave);
			}
			pregnancyPhysicalEffects(slave);
		}
		if (slave.pregType === 0) { // Catch for strange cases - now with checking.
			failSafe(slave);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function pregnancyDiscovery(slave) {
		if (slave.preg === slave.pregData.normalBirth / 8) { /* BAD design - with speed control drugs and animal pregnancy 5th week can be not integer value, and block will be skipped as it's will be not strict == */
			// Perhaps a specific value assigned to the pregData? Only human will need to do it.
			if (slave.womb[slave.womb.length - 1].motherID === -1) { // if the PC is the real mother (transferred the ova)
				if (slave.womb[slave.womb.length - 1].fatherID > 0) {
					actX(findFather(slave.womb[slave.womb.length - 1].fatherID), "PCKnockedUp");
				}
			} else if (slave.womb[slave.womb.length - 1].motherID !== slave.ID) { // if another slave is the real mother (transferred the ova)
				if (slave.womb[slave.womb.length - 1].fatherID === -1) { // if PC is the father
					V.PC.counter.slavesKnockedUp++;
					let realMommy = findFather(slave.womb[slave.womb.length - 1].motherID);
					if (realMommy) {
						realMommy.counter.timesBred++;
					}
				} else if (slave.womb[slave.womb.length - 1].fatherID > 0) {
					let babyDaddy = findFather(slave.womb[slave.womb.length - 1].fatherID);
					if (babyDaddy) {
						babyDaddy.counter.slavesKnockedUp++;
					}
				}
			} else if (slave.pregSource === -1) {
				V.PC.counter.slavesKnockedUp++;
				slave.counter.timesBred++;
			} else if (slave.pregSource > 0) {
				let babyDaddy = findFather(slave.pregSource);
				if (babyDaddy) {
					babyDaddy.counter.slavesKnockedUp++;
				}
			}
		}
		if (slave.bellyFluid > 2000) {
			if (slave.inflation > 1) {
				r.push(`${He} finds ${himself} only capable of handling <span class="noteworthy">two liters of ${slave.inflationType} inside ${his} body at once,</span> far less than ${his} required bloating.`);
			} else {
				r.push(`${His} body cannot handle having so much ${slave.inflationType} inside it, forcing ${him} to release ${his} contents until ${he} feels better.`);
			}
			if (slave.pregKnown === 0) {
				r.push(`The cause? <span class="pregnancy">${He}'s`);
				if (slave.preg > slave.pregData.normalBirth / 4) {
					r.push(`pregnant and rather far along.</span>`);
				} else {
					r.push(`pregnant.</span>`);
				}
			} else {
				r.push(`This will likely be the case for the duration of ${his} pregnancy.`);
			}
		}
	}


	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function slowLibidoIncrease(slave) {
		if (slave.preg > slave.pregData.normalBirth / 4) {
			r.push(`${His} new pregnancy excites ${him} and produces <span class="libido inc">very slow improvement in ${his} sexual appetite.</span>`);
			slave.energy += 1;
		} else if (slave.preg <= slave.pregData.normalBirth / 4 && slave.preg > slave.pregData.normalBirth / 13.33) {
			r.push(`The rigors of early pregnancy do not seem to decrease ${his} sex drive. If anything, it seems to be exciting ${him}.`);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function pregnancyLibido(slave) {
		if (slave.geneticQuirks.uterineHypersensitivity === 2 && V.geneticMappingUpgrade > 0) {
			if (slave.preg >= slave.pregData.normalBirth) {
				r.push(`${He}'s full-term and has never been hornier. ${His} uterine hypersensitivity combined with ${his} full womb and upcoming birth confers a <span class="libido inc">huge improvement in ${his} sexual appetite.</span>`);
				slave.energy += 7;
			} else if (slave.preg > slave.pregData.normalBirth / 1.33) {
				r.push(`Being hugely pregnant with uterine hypersensitivity confers an <span class="libido inc">improvement in ${his} sexual appetite.</span>`);
				slave.energy += 5;
			} else if (slave.preg > slave.pregData.normalBirth / 2) {
				r.push(`Being pregnant with uterine hypersensitivity confers a <span class="libido inc">slow improvement in ${his} sexual appetite.</span>`);
				slave.energy += 3;
			} else {
				slowLibidoIncrease(slave);
			}
		} else if (slave.fetish === Fetish.PREGNANCY && slave.fetishKnown === 1) {
			if (slave.preg >= slave.pregData.normalBirth) {
				r.push(`${He}'s full-term and has never been hornier. ${His} pregnancy fetish combined with ${his} ripe belly confers a <span class="libido inc">huge improvement in ${his} sexual appetite.</span>`);
				slave.energy += 5;
			} else if (slave.preg > slave.pregData.normalBirth / 1.33) {
				r.push(`Being a pregnancy fetishist and hugely pregnant confers an <span class="libido inc">improvement in ${his} sexual appetite.</span>`);
				slave.energy += 3;
			} else if (slave.preg > slave.pregData.normalBirth / 2) {
				r.push(`Being a pregnancy fetishist and pregnant confers a <span class="libido inc">slow improvement in ${his} sexual appetite.</span>`);
				slave.energy += 2;
			} else {
				slowLibidoIncrease(slave);
			}
		} else if (slave.fetish === Fetish.PREGNANCY) {
			if (slave.preg >= slave.pregData.normalBirth) {
				r.push(`${He}'s full-term and has never been hornier. ${His} advanced pregnancy confers a <span class="libido inc">huge improvement in ${his} sexual appetite.</span>`);
				slave.energy += 5;
			} else if (slave.preg > slave.pregData.normalBirth / 1.33) {
				r.push(`Being hugely pregnant confers an <span class="libido inc">improvement in ${his} sexual appetite.</span>`);
				slave.energy += 3;
			} else if (slave.preg > slave.pregData.normalBirth / 2) {
				r.push(`Being pregnant confers a <span class="libido inc">slow improvement in ${his} sexual appetite.</span>`);
				slave.energy += 2;
			} else {
				slowLibidoIncrease(slave);
			}
			if (slave.preg > slave.pregData.normalBirth / 13.33) {
				if (slave.fetish === Fetish.PREGNANCY) {
					r.push(`Given ${his} enthusiasm, ${he} appears to have a <span class="fetish gain">pregnancy fetish.</span>`);
					slave.fetishKnown = 1;
				}
			}
		} else if (slave.geneticQuirks.uterineHypersensitivity === 2) {
			if (slave.preg >= slave.pregData.normalBirth) {
				r.push(`${He}'s full-term and has never been hornier, conferring a <span class="libido inc">huge improvement in ${his} sexual appetite.</span>`);
				slave.energy += 7;
			} else if (slave.preg > slave.pregData.normalBirth / 1.33) {
				r.push(`Being hugely pregnant confers an <span class="libido inc">improvement in ${his} sexual appetite.</span>`);
				slave.energy += 5;
			} else if (slave.preg > slave.pregData.normalBirth / 2) {
				r.push(`Being pregnant confers a <span class="libido inc">slow improvement in ${his} sexual appetite.</span>`);
				slave.energy += 3;
			} else {
				slowLibidoIncrease(slave);
			}
		} else { // not pregnancy fetish
			if (slave.energy < 41) {
				if (slave.preg <= slave.pregData.normalBirth / 4 && slave.preg > slave.pregData.normalBirth / 13.33) {
					r.push(`The rigors of early pregnancy <span class="libido dec">reduce ${his} sexual appetite.</span>`);
					slave.energy -= 3;
				} else if (slave.preg >= slave.pregData.normalBirth) {
					r.push(`${He} is full-term and feels massively unattractive, <span class="libido dec">greatly suppressing ${his} sexual appetite.</span>`);
					slave.energy -= 4;
				} else if (slave.preg > slave.pregData.normalBirth / 1.33) {
					r.push(`${His} advanced pregnancy <span class="libido dec">greatly suppresses ${his} sexual appetite.</span>`);
					slave.energy -= 3;
				} else if (slave.preg > slave.pregData.normalBirth / 2) {
					r.push(`${His} growing pregnancy <span class="libido dec">suppresses ${his} sexual appetite.</span>`);
					slave.energy -= 2;
				} else if (slave.bellyPreg >= 1500) {
					r.push(`${His} visible pregnancy causes ${him} to feel unattractive, <span class="libido dec">reducing ${his} sex drive.</span>`);
					slave.energy -= 1;
				}
			} else if (slave.energy < 61) {
				if (slave.preg <= slave.pregData.normalBirth / 4 && slave.preg > slave.pregData.normalBirth / 13.33) {
					r.push(`The rigors of early pregnancy <span class="libido dec">slightly reduce ${his} sexual appetite.</span>`);
					slave.energy -= 1;
				} else if (slave.preg >= slave.pregData.normalBirth) {
					r.push(`${He} is full-term and <span class="libido inc">hornier than ever.</span>`);
					slave.energy += 2;
				} else if (slave.preg > slave.pregData.normalBirth / 1.33) {
					r.push(`${His} advanced pregnancy <span class="libido inc">increases ${his} libido.</span>`);
					slave.energy += 1;
				}
			} else if (slave.energy < 90) {
				if (slave.preg <= slave.pregData.normalBirth / 4 && slave.preg > slave.pregData.normalBirth / 13.33) {
					r.push(`The rigors of early pregnancy <span class="libido dec">reduce ${his} sexual appetite.</span>`);
					slave.energy -= 3;
				} else if (slave.preg >= slave.pregData.normalBirth) {
					r.push(`${He} is full-term and suffering from an <span class="libido inc">unquenchable need for sex.</span>`);
					slave.energy += 4;
				} else if (slave.preg > slave.pregData.normalBirth / 1.33) {
					r.push(`${His} advanced pregnancy comes with a hugely increased libido, <span class="libido inc">greatly increasing ${his} sexual drive.</span>`);
					slave.energy += 3;
				} else if (slave.preg > slave.pregData.normalBirth / 2) {
					r.push(`${His} growing pregnancy comes with an increased libido, <span class="libido inc">spurring ${his} sexual appetite.</span>`);
					slave.energy += 2;
				}
			} else {
				if (slave.preg <= slave.pregData.normalBirth / 4 && slave.preg > slave.pregData.normalBirth / 13.33) {
					r.push(`The rigors of early pregnancy <span class="libido dec">reduce ${his} sexual appetite.</span>`);
					slave.energy -= 3;
				} else if (slave.preg >= slave.pregData.normalBirth) {
					r.push(`${He} is full-term and <span class="libido inc">horny as hell.</span> ${His} hormones and already high libido have ${him} acting like ${he} hasn't had a good fuck in nine months.`);
					slave.energy += 2;
				} else if (slave.preg > slave.pregData.normalBirth / 1.33) {
					r.push(`${His} advanced pregnancy, combined with ${his} already high libido, has ${him} practically begging for sex whenever ${he} has a spare moment.`);
				} else if (slave.preg > slave.pregData.normalBirth / 2) {
					r.push(`${His} growing pregnancy, combined with ${his} already high libido, has ${him} always itching for some sex.`);
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function fetalAdjustment(slave) {
		const oldCount = slave.pregType;
		if (slave.preg <= 2 && slave.broodmother === 0) {
			fetalSplit(slave, 1000);
			WombCleanYYFetuses(slave);
		}
		if (V.pregnancyMonitoringUpgrade === 1) {
			if (oldCount < slave.pregType) {
				r.push(`During ${his} weekly monitoring, it is discovered that ${his} womb is now home to <span class="pregnancy">more ova than last checkup.</span>`);
			} else if (oldCount > slave.pregType) {
				r.push(`During ${his} weekly monitoring, it is discovered that ${his} womb is now home to <span class="change negative">less ova than last checkup.</span>`);
				if (slave.pregType === 0) {
					r.push(`For all intent and purposes, <span class="noteworthy">${he} is no longer pregnant.</span>`);
					TerminatePregnancy(slave);
				}
			}
		} else if (oldCount > slave.pregType && slave.pregType === 0) {
			TerminatePregnancy(slave);
		}
	}

	/**
	 * @param {FC.ReportSlave} slave
	 *
	 */
	function pregnancyAdjustments(slave) {
		if (slave.geneticQuirks.gigantomastia === 3 && random(1, 200) < slave.hormoneBalance) {
			slave.geneticQuirks.gigantomastia = 2;
		}
		if (slave.geneticQuirks.macromastia === 3 && random(1, 200) < slave.hormoneBalance) {
			slave.geneticQuirks.macromastia = 2;
		}
		if (slave.geneticQuirks.galactorrhea === 2 && random(1, 100) < slave.hormoneBalance && slave.lactation === 0) {
			slave.inappropriateLactation = 1;
		}
		if (slave.preg > slave.pregData.normalBirth / 2) {
			if (slave.belly >= 300000) {
				slave.need *= 0.5;
			} else if (slave.belly >= 120000) {
				slave.need *= 0.7;
			} else if (slave.belly >= 60000) {
				slave.need *= 0.9;
			} else {
				slave.need *= 1.5;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function pregnancyMentalEffects(slave) {
		const child = (slave.pregType > 1 ? "children" : "child");
		const childIs = (slave.pregType > 1 ? "children are" : "child is");

		if (slave.career === "a dairy cow" && slave.devotion <= 50) {
			r.push(`${He} <span class="devotion inc">feels right</span> to be growing heavy with child. To ${him}, a growing baby means better milk.`);
			slave.devotion += 1;
		} else if (slave.devotion <= 20 && slave.pregSource === -1) {
			r.push(`${He} is filled with a feeling of <span class="devotion dec">revulsion</span> that your ${childIs} growing within ${his} body.`);
			slave.devotion -= 1;
			if (slave.relationship === -3) {
				r.push(`This is compounded by the fact that you <span class="trust dec">forced ${him} to marry you</span> and <span class="devotion dec">raped ${him} pregnant.</span>`);
				slave.devotion -= 5;
				slave.trust -= -5;
			}
		} else if (slave.devotion > 50 && slave.pregSource === -1) {
			r.push(`${He} <span class="devotion inc">loves</span> that your ${childIs} growing within ${him}.`);
			slave.devotion += 1;
			if (slave.relationship === -3) {
				r.push(`This is compounded by the fact that ${he} is your <span class="devotion inc">devoted ${wife}</span> and <span class="trust inc">feels it is ${his} duty</span> to bear your children.`);
				slave.devotion += 5;
				slave.trust += 5;
			}
		}
		if (slave.pregSource === slave.relationshipTarget && slave.relationship > 2) {
			r.push(`${He} can't help but feel <span class="trust inc">satisfaction</span> in carrying ${his} lover's ${child}.`);
			slave.trust += 1;
		} else if (slave.pregSource === -9) {
			r.push(`${He} can't help but feel <span class="trust inc">proud</span> over the life you helped conceive and the future generation of Futanari Sisters.`);
			slave.devotion += 1;
		}
		// @ts-ignore
		if (slave.devotion > 20 && FutureSocieties.isActive('FSRepopulationFocus') && slave.sexualQuirk === "motherly") {
			r.push(`${His} pregnancy fills ${him} with <span class="devotion inc">joyful pride,</span> since ${he} is surrounded by those that share ${his} values on having children.`);
			slave.devotion += 1;
		}
		if (slave.pregSource === slave.ID) {
			if (slave.sexualQuirk === SexualQuirk.PERVERT) {
				r.push(`${He}'s <span class="devotion inc">aroused</span> at the mere concept that the bab${slave.pregType > 1 ? "ies" : "y"} growing inside ${him} ${slave.pregType > 1 ? "were" : "was"} conceived by ${his} own sperm.`);
				slave.devotion += 1;
			} else {
				r.push(`${He} often becomes preoccupied with <span class="trust dec">worry</span> that ${his} self-conceived ${child} will be born unhealthy.`);
				slave.trust -= 1;
			}
		}
		if (slave.geneticQuirks.uterineHypersensitivity === 2) {
			if (slave.pregKnown === 1) {
				if (slave.belly <= 1500) {
					r.push(`${He} feels a pleasant tingling sensation in ${his} lower belly.`);
				} else if (slave.preg > slave.pregData.normalBirth / 2) {
					if (slave.belly <= 10000) {
						r.push(`${He} feels a pleasant fullness in ${his} womb.`);
					} else if (slave.belly <= 30000) {
						r.push(`${His} pregnancy fills ${him} with pleasant sensations of fullness and fulfillment,`);
						if (slave.fetish !== Fetish.PREGNANCY) {
							if (slave.fetishStrength > 10) {
								r.push(`<span class="fetish loss">distracting ${him} from ${his} existing proclivities.</span>`);
								slave.fetishStrength -= 1;
							} else {
								r.push(`<span class="fetish gain">giving ${him} a new appreciation for pregnancy.</span>`);
								slave.fetish = Fetish.PREGNANCY;
								slave.fetishStrength = 60;
								slave.fetishKnown = 1;
							}
						} else {
							r.push(`<span class="fetish inc">further increasing ${his} love for pregnancy.</span>`);
							slave.fetishStrength = Math.clamp(slave.fetishStrength + 1, 0, 100);
							slave.fetishKnown = 1;
						}
					} else if (slave.belly <= 60000) {
						r.push(`${His} huge pregnancy fills ${him} with pleasure and a sense of accomplishment,`);
						if (slave.fetish !== Fetish.PREGNANCY) {
							if (slave.fetishStrength > 10) {
								r.push(`<span class="fetish loss">distracting ${him} from ${his} existing proclivities.</span>`);
								slave.fetishStrength -= 2;
							} else {
								r.push(`<span class="fetish gain">giving ${him} a new appreciation for pregnancy.</span>`);
								slave.fetish = Fetish.PREGNANCY;
								slave.fetishStrength = 60;
								slave.fetishKnown = 1;
							}
						} else {
							r.push(`<span class="fetish inc">further increasing ${his} love for pregnancy.</span>`);
							slave.fetishStrength = Math.clamp(slave.fetishStrength + 2, 0, 100);
							slave.fetishKnown = 1;
						}
					} else if (slave.belly <= 120000) {
						r.push(`${His} enormous pregnancy fills ${him} with pleasure and sometimes causes small orgasms from fetal movement,`);
						if (slave.fetish !== Fetish.PREGNANCY) {
							if (slave.fetishStrength > 10) {
								r.push(`<span class="fetish loss">causing ${him} to slowly lose interest in ${his} current proclivities.</span>`);
								slave.fetishStrength -= 3;
							} else {
								r.push(`<span class="fetish gain">focusing ${his} lust on pregnancy.</span>`);
								slave.fetish = Fetish.PREGNANCY;
								slave.fetishStrength = 60;
								slave.fetishKnown = 1;
							}
						} else {
							r.push(`<span class="fetish inc">further increasing ${his} love for pregnancy.</span>`);
							slave.fetishStrength = Math.clamp(slave.fetishStrength + 3, 0, 100);
							slave.fetishKnown = 1;
						}
					} else if (slave.belly <= 300000) {
						r.push(`${His} gigantic pregnancy fills ${him} with pleasure and often causes small orgasms from fetal movement,`);
						if (slave.fetish !== Fetish.PREGNANCY) {
							if (slave.fetishStrength > 10) {
								r.push(`<span class="fetish loss">causing ${him} to slowly lose interest in ${his} current proclivities.</span>`);
								slave.fetishStrength -= 5;
							} else {
								r.push(`<span class="fetish gain">focusing ${his} lust on pregnancy.</span>`);
								slave.fetish = Fetish.PREGNANCY;
								slave.fetishStrength = 60;
								slave.fetishKnown = 1;
							}
						} else {
							r.push(`<span class="fetish inc">further increasing ${his} love for pregnancy.</span>`);
							slave.fetishStrength = Math.clamp(slave.fetishStrength + 5, 0, 100);
							slave.fetishKnown = 1;
						}
					} else {
						r.push(`${His} hyperpregnancy fills ${him} with great pleasure and keeps ${him} in near constant orgasm from fetal movement alone,`);
						if (slave.fetish !== Fetish.PREGNANCY) {
							if (slave.fetishStrength > 10) {
								r.push(`<span class="fetish loss">causing ${him} to rapidly lose interest in ${his} current proclivities.</span>`);
								slave.fetishStrength -= 10;
							} else {
								r.push(`<span class="fetish gain">focusing ${his} lust on pregnancy.</span>`);
								slave.fetish = Fetish.PREGNANCY;
								slave.fetishStrength = 60;
								slave.fetishKnown = 1;
							}
						} else {
							r.push(`<span class="fetish inc">further increasing ${his} love for pregnancy.</span>`);
							slave.fetishStrength = Math.clamp(slave.fetishStrength + 10, 0, 100);
							slave.fetishKnown = 1;
						}
					}
				}
			}
		}
		switch (slave.pregControl) {
			case GestationDrug.FAST:
				if (!S.Nurse || slave.assignment !== Job.CLINIC) {
					if (slave.pregType >= 20 && slave.devotion <= 20 && slave.trust <= 50) {
						if (slave.sexualFlaw === SexualFlaw.SELFHATING) {
							r.push(`${He} is <span class="devotion inc">delirious with joy</span> over ${his} straining womb. Every week ${he} gets bigger, fuller and tighter; in ${his} mind, it won't be long until ${he} bursts, bringing ${his} children into the world.`);
							slave.devotion += 10;
						} else if (slave.geneticQuirks.uterineHypersensitivity === 2) {
							r.push(`${He} is <span class="libido inc">extremely aroused</span> over ${his} straining womb.`);
							if (V.geneticMappingUpgrade > 0) {
								r.push(`${His} hypersensitive uterus is overstimulated by the pressure, clouding both pain and worry from ${his} mind.`);
							} else {
								r.push(`Every week ${he} gets bigger, fuller, tighter, and, strangely enough, hornier. It's unclear why ${he} is this way, but it distracts ${him} from worrying at least.`);
							}
							slave.energy += 3;
						} else {
							r.push(`${He} is <span class="trust dec">utterly terrified</span> by ${his} straining womb. Every week ${he} gets bigger, fuller and tighter; in ${his} mind, it won't be long until ${he} bursts, bringing ${his} children into <span class="devotion dec">this wretched world.</span>`);
							if (slave.bellyPreg >= 600000) {
								r.push(`${He} is absolutely huge, ${his}`);
								if (slave.geneMods.rapidCellGrowth !== 1) {
									r.push(`stretch mark streaked`);
								} else {
									r.push(`swollen`);
								}
								r.push(`orb of a belly keeps ${him} painfully immobilized. ${He} counts every second, hoping that ${he} can make it to the next. ${His} mind <span class="mindbreak">can't handle it and shatters,</span> leaving ${him} nothing more than an overfilled broodmother.`);
								applyMindbroken(slave);
							}
							slave.devotion -= 10;
							slave.trust -= 10;
						}
					} else if (slave.geneticQuirks.uterineHypersensitivity === 2) {
						r.push(`${He} is <span class="libido inc">extremely aroused</span> over ${his} straining womb.`);
						if (V.geneticMappingUpgrade > 0) {
							r.push(`${His} hypersensitive uterus is overstimulated by the pressure, clouding both pain and worry from ${his} mind.`);
						} else {
							r.push(`Every week ${he} gets bigger, fuller, tighter, and, strangely enough, hornier. It's unclear why ${he} is this way, but it distracts ${him} from worrying at least.`);
						}
						slave.energy += 3;
					} else if (slave.devotion <= 20 && slave.trust <= 20) {
						r.push(`${He} is <span class="trust dec">utterly terrified</span> by ${his} straining womb and filled <span class="devotion dec">with disgust</span> that you've turned ${him} into nothing more than a rapid breeding vessel.`);
						slave.devotion -= 10;
						slave.trust -= 10;
					} else if (slave.devotion <= 80 && slave.trust <= 80) {
						r.push(`${He} trusts you, but deep down <span class="trust dec">${he} can't help but worry</span> over how fast ${he} is growing.`);
						slave.trust -= 2;
					}
				}
				break;
			case GestationDrug.LABOR:
				if (slave.geneticQuirks.uterineHypersensitivity === 2 && slave.counter.birthsTotal > 0) {
					if (V.geneticMappingUpgrade > 0) {
						r.push(`Birth is incredibly pleasurable to ${him} due to ${his} uterine hypersensitivity, filling ${him} with <span class="trust dec">fear</span> and <span class="devotion dec">loathing</span> that ${he} won't be allowed to reach that high again.`);
					} else {
						r.push(`${He} is filled with unwarranted <span class="trust dec">paranoia</span> and <span class="devotion dec">hate</span> over you delaying ${his} upcoming birth.`);
					}
					slave.devotion -= 10;
					slave.trust -= 10;
				} else if (slave.devotion <= 20 && slave.pregSource === -1) {
					r.push(`${He} is filled with <span class="devotion dec">hate</span> that you're forcing ${him} to continue carrying your ${child}.`);
					slave.devotion -= 5;
				}
				break;
			case GestationDrug.SLOW:
				if (slave.devotion <= 20 && slave.pregSource === -1) {
					r.push(`${He} is filled with <span class="devotion dec">hate</span> that you're tormenting ${him} by prolonging ${his} pregnancy.`);
					slave.devotion -= 5;
				}
				break;
		}
		if (isInduced(slave)) {
			r.push(`${His} child${slave.pregType > 1 ? "ren visibly shift" : " visibly shifts"} within ${his} womb as ${slave.pregType > 1 ? "they prepare" : "it prepares"} to enter the world. ${He} experiences several`);
			if (slave.geneticQuirks.uterineHypersensitivity === 2) {
				r.push(`unexpected orgasms,`);
			} else {
				r.push(`contractions,`);
			}
			r.push(`but not enough to deter ${him} from ${his} work.`);
		} else if (slave.pregControl === GestationDrug.LABOR) {
			r.push(`${His} ${childIs} oddly calm; it is unlikely ${he} will give birth soon, despite being overdue.`);
		} else if (slave.broodmother === 0) {
			if (slave.preg > slave.pregData.normalBirth + 1) {
				r.push(`${He} is constantly beset by ${his} squirming`);
				if (slave.geneticQuirks.uterineHypersensitivity === 2) {
					r.push(`${child} and uncontrollable orgasms.`);
				} else {
					r.push(`${child}.`);
				}
				r.push(`They're overdue, so ${he}'s likely to go into labor at any moment, but they aren't quite ready to leave their home.`);
			} else if (slave.preg > slave.pregData.normalBirth - 1 && slave.preg > slave.pregData.minLiveBirth) {
				r.push(`${He} is constantly beset by ${his} squirming`);
				if (slave.geneticQuirks.uterineHypersensitivity === 2) {
					r.push(`${child} and uncontrollable orgasms.`);
				} else {
					r.push(`${child}.`);
				}
				r.push(`Given their liveliness, and how long ${he} has been pregnant, it is likely that ${he} will go into labor at any time now.`);
			} else if (slave.preg > slave.pregData.normalBirth - 2 && slave.preg > slave.pregData.minLiveBirth) {
				r.push(`${He} often has to stop for breaks to soothe ${his} kicking`);
				if (slave.geneticQuirks.uterineHypersensitivity === 2) {
					r.push(`${child}, to spontaneously orgasm,`);
				} else {
					r.push(`${child}`);
				}
				r.push(`and to catch ${his} breath. ${He} is far enough along that ${he} may go into labor any day now.`);
			} else if (slave.preg > slave.pregData.normalBirth - 3 && slave.preg > slave.pregData.minLiveBirth) {
				r.push(`${He} often has to stop for breaks to soothe ${his} kicking`);
				if (slave.geneticQuirks.uterineHypersensitivity === 2) {
					r.push(`${child} and clean up after spontaneously orgasming.`);
				} else {
					r.push(`${child}.`);
				}
				r.push(`${He} is far enough along that ${he} may go into early labor.`);
			}
		} else if (slave.broodmother > 0 && slave.preg >= 37) {
			if (slave.broodmother === 2) {
				r.push(`${He} often has to stop for breaks to soothe ${his} kicking`);
				if (slave.geneticQuirks.uterineHypersensitivity === 2) {
					r.push(`${child}, to spontaneously orgasm,`);
				} else {
					r.push(`${child}`);
				}
				r.push(`and to catch ${his} breath. It's only a matter of time until the next one drops into position to be born.`);
			} else {
				r.push(`${He} is constantly beset by ${his} squirming children and often has to stop for breaks to soothe`);
				if (slave.geneticQuirks.uterineHypersensitivity === 2) {
					r.push(`them and to clean up after spontaneously orgasming.`);
				} else {
					r.push(`them.`);
				}
				r.push(`${He} is never quite sure when the next one will drop into position to be born.`);
			}
		}
		if (slave.preg > slave.pregData.normalBirth / 2 && random(1, 100) === 69) {
			if (slave.behavioralFlaw === BehavioralFlaw.NONE && slave.behavioralQuirk === BehavioralQuirk.NONE) {
				switch (random(1, 4)) {
					case 1:
						slave.behavioralFlaw = BehavioralFlaw.ODD;
						r.push(`The stress of ${his} growing pregnancy leads ${him} to begin <span class="flaw gain">acting oddly.</span>`);
						break;
					case 2:
						slave.behavioralFlaw = BehavioralFlaw.HATESMEN;
						r.push(`The stress of ${his} growing pregnancy leads ${him} to begin <span class="flaw gain">disliking the company of men.</span>`);
						break;
					case 3:
						slave.behavioralFlaw = BehavioralFlaw.HATESWOMEN;
						r.push(`The stress of ${his} growing pregnancy leads ${him} to begin <span class="flaw gain">disliking the company of women.</span>`);
						break;
					case 4:
						slave.behavioralFlaw = BehavioralFlaw.GLUTTONOUS;
						r.push(`The stress of ${his} growing pregnancy leads ${him} to begin <span class="flaw gain">taking solace in overeating.</span>`);
						break;
				}
			} else if (slave.sexualFlaw === SexualFlaw.NONE && slave.sexualQuirk === SexualQuirk.NONE) {
				switch (random(1, 8)) {
					case 1:
						slave.sexualFlaw = SexualFlaw.HATESORAL;
						r.push(`The stress of ${his} growing pregnancy leads ${him} to begin <span class="flaw gain">rejecting oral sex.</span>`);
						break;
					case 2:
						slave.sexualFlaw = SexualFlaw.HATESANAL;
						r.push(`The stress of ${his} growing pregnancy leads ${him} to begin <span class="flaw gain">rejecting anal sex.</span>`);
						break;
					case 3:
						slave.sexualFlaw = SexualFlaw.HATESPEN;
						r.push(`The stress of ${his} growing pregnancy leads ${him} to begin <span class="flaw gain">rejecting penetrative sex.</span>`);
						break;
					case 4:
						slave.sexualFlaw = SexualFlaw.SHAMEFAST;
						r.push(`The stress of ${his} growing pregnancy leads ${him} to become <span class="flaw gain">paranoid about ${his} naked body.</span>`);
						break;
					case 5:
						slave.sexualFlaw = SexualFlaw.REPRESSED;
						r.push(`The stress of ${his} growing pregnancy leads ${him} to begin <span class="flaw gain">rejecting sex.</span>`);
						break;
					case 6:
						slave.sexualFlaw = SexualFlaw.APATHETIC;
						r.push(`The stress of ${his} growing pregnancy causes ${him} to become <span class="flaw gain">inert during sex.</span>`);
						break;
					case 7:
						slave.sexualFlaw = SexualFlaw.CRUDE;
						r.push(`The stress of ${his} growing pregnancy leads ${him} to <span class="flaw gain">become quite crude.</span>`);
						break;
					case 8:
						slave.sexualFlaw = SexualFlaw.JUDGEMENT;
						r.push(`The stress of ${his} growing pregnancy causes ${him} to become overly <span class="flaw gain">judgemental of ${his} partners.</span>`);
						break;
				}
			}
		}
		if (slave.fetishStrength <= 95 && fetishChangeChance(slave) > random(0, 100) && slave.counter.oral + slave.counter.vaginal + slave.counter.anal > 200 && slave.fetish !== Fetish.PREGNANCY) {
			r.push(`The combination of pregnancy and constant sex has <span class="fetish gain">sexualized pregnancy for ${him}.</span>`);
			slave.fetish = Fetish.PREGNANCY;
			slave.fetishKnown = 1;
			slave.fetishStrength = 65;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function pregnancyPhysicalEffects(slave) {
		let boobTarget;
		const slimnessFoodMod = V.arcologies[0].FSSlimnessEnthusiastFoodLaw === 1 ? 0.5 : 1;
		if (slave.geneMods.NCS === 1) {
			// NCS: always working against secondary sexual characteristics even in pregnancies.
			boobTarget = 0;
		} else if (slave.geneticQuirks.androgyny === 2) {
			boobTarget = 400;
		} else if (slave.physicalAge >= 18) {
			if (slave.pregType >= 50) {
				boobTarget = 10000;
			} else if (slave.pregType >= 30) {
				boobTarget = 5000;
			} else if (slave.pregType >= 10) {
				boobTarget = 2000;
			} else if (slave.pregType >= 2) {
				boobTarget = 1000;
			} else {
				boobTarget = 800;
			}
		} else if (slave.physicalAge >= 13) {
			if (slave.pregType >= 50) {
				boobTarget = 5000;
			} else if (slave.pregType >= 30) {
				boobTarget = 3200;
			} else if (slave.pregType >= 10) {
				boobTarget = 1800;
			} else if (slave.pregType >= 2) {
				boobTarget = 1000;
			} else {
				boobTarget = 700;
			}
		} else if (slave.physicalAge >= 8) {
			if (slave.pregType >= 50) {
				boobTarget = 1800;
			} else if (slave.pregType >= 30) {
				boobTarget = 1400;
			} else if (slave.pregType >= 10) {
				boobTarget = 1000;
			} else if (slave.pregType >= 2) {
				boobTarget = 800;
			} else {
				boobTarget = 600;
			}
		} else {
			if (slave.pregType >= 50) {
				boobTarget = 1000;
			} else if (slave.pregType >= 30) {
				boobTarget = 800;
			} else if (slave.pregType >= 10) {
				boobTarget = 600;
			} else {
				boobTarget = 400;
			}
		}
		boobTarget *= gigantomastiaMod;
		boobTarget *= slimnessFoodMod;
		if (slave.geneMods.NCS === 0) {
			const boobSize = App.Medicine.fleshSize(slave, 'boobs');
			const buttSize = App.Medicine.fleshSize(slave, 'butt');
			const hipSize = slave.hips - slave.hipsImplant;
			if (slave.pregType >= 30 && (((slave.assignment === Job.CONCUBINE || slave.assignment === Job.MASTERSUITE) && V.masterSuitePregnancySlaveLuxuries === 1) || slave.diet === Diet.CALORIC)) {
				if (slave.weight <= 65) {
					r.push(`${He} has <span class="change positive">gained weight</span> in order to better sustain ${himself} and ${his} children.`);
					slave.weight += 1;
				}
				if (random(1, 100) > 60) {
					if (boobSize < boobTarget) {
						r.push(`${His} breasts <span class="change positive">greatly swell</span> to meet the upcoming demand.`);
						slave.boobs += 100;
						if (slave.boobs > 250 && slave.boobShape !== BreastShape.SAGGY && slave.preg > slave.pregData.normalBirth / 1.25 && (slave.boobsImplant / slave.boobs < 0.5) && slave.breastMesh !== 1 && slave.drugs !== Drug.SAGBGONE) {
							r.push(`${His} immensely engorged <span class="change negative">breasts become saggy</span> in the last stages of ${his} pregnancy as ${his} body undergoes changes in anticipation of the forthcoming birth.`);
							slave.boobShape = BreastShape.SAGGY;
						}
					}
					if (slave.geneticQuirks.androgyny !== 2) {
						if (hipSize < 2) {
							r.push(`${His} hips <span class="change positive">widen</span> for ${his} upcoming birth.`);
							slave.hips += 1;
						}
						if (buttSize < 14 + (rearQuirk * 3)) {
							r.push(`${His} butt <span class="change positive">swells with added fat</span> from ${his} changing body.`);
							slave.butt += 1;
						}
					}
				}
			} else if (slave.pregType >= 10) {
				if (random(1, 100) > 80 && boobSize < boobTarget) {
					r.push(`${His} breasts <span class="change positive">swell</span> in preparation for ${his} growing brood.`);
					slave.boobs += 50;
					if (slave.boobs > 250 && slave.boobShape !== BreastShape.SAGGY && (slave.boobsImplant / slave.boobs < 0.5) && slave.breastMesh !== 1 && slave.drugs !== Drug.SAGBGONE) {
						if (slave.preg > random(slave.pregData.normalBirth / 1.25, slave.pregData.normalBirth * 2.05)) {
							r.push(`${His} swollen <span class="change negative">breasts become saggy</span> in the last stages of ${his} pregnancy as ${his} body undergoes changes in anticipation of the forthcoming birth.`);
							slave.boobShape = BreastShape.SAGGY;
						}
					}
				}
			} else if (boobSize < boobTarget) {
				if (random(1, 100) > 80) {
					r.push(`Pregnancy <span class="change positive">causes ${his} breasts to swell somewhat.</span>`);
					slave.boobs += 25;
					if (slave.boobs > 250 && slave.boobShape !== BreastShape.SAGGY && slave.preg > random(slave.pregData.normalBirth / 1.25, slave.pregData.normalBirth * 2.5) && (slave.boobsImplant / slave.boobs < 0.5) && slave.breastMesh !== 1 && slave.drugs !== Drug.SAGBGONE) {
						r.push(`${His} <span class="change negative">breasts become saggy</span> in the last stages of ${his} pregnancy as ${his} body undergoes changes in anticipation of the forthcoming birth.`);
						slave.boobShape = BreastShape.SAGGY;
					}
				}
			}
			if (slave.preg > slave.pregData.normalBirth / 1.25 && slave.physicalAge >= 18 && slave.hips === 1 && slave.hipsImplant === 0 && random(1, 100) > 90 / uterineHypersensitivityMod) {
				r.push(`${His} hips <span class="change positive">widen</span> to better support ${his} gravidity.`);
				slave.hips += 1;
			} else if (slave.preg > slave.pregData.normalBirth / 1.42 && slave.physicalAge >= 16 && slave.hips === 0 && slave.hipsImplant === 0 && random(1, 100) > 70 / uterineHypersensitivityMod) {
				r.push(`${His} hips <span class="change positive">widen</span> to better support ${his} gravidity.`);
				slave.hips += 1;
			}
			if (slave.preg > slave.pregData.normalBirth / 1.42 && slave.physicalAge >= 12 && buttSize < (4 + (rearQuirk * 3)) && slave.weight >= -30 && random(1, 100) > 70) {
				r.push(`${His} butt <span class="change positive">gets a little bigger</span> as ${his} body ripens.`);
				slave.butt += 1;
			}
		}
		if (slave.preg === slave.pregData.normalBirth / 2.66) { // change me when nipple color gets hardset
			if (slave.pregKnown === 0) {
				r.push(`${His} areolae have oddly darkened. Some cursory tests reveal <span class="pregnant">${he} is about fifteen weeks pregnant.</span>`);
				slave.pregKnown = 1;
			} else {
				r.push(`${His} areolae darken with ${his} progressing pregnancy.`);
			}
		} else if (slave.bellyPreg >= 1500) {
			if (App.Data.misc.fakeBellies.includes(slave.bellyAccessory)) {
				r.push(`${His} growing pregnancy renders ${his} fake belly moot.`);
				slave.bellyAccessory = "none";
			}
			if (slave.preg > slave.pregData.normalBirth / 2 && slave.lactation === 0) {
				if (slave.health.condition < -20) {
					r.push(`${He}'s so unwell that natural lactation is unlikely.`);
				} else if (slave.weight <= -30) {
					r.push(`${He}'s so skinny that natural lactation is unlikely.`);
				} else if (slave.preg > random(slave.pregData.normalBirth / 2.22, slave.pregData.normalBirth / 1.33)) {
					r.push(`Pregnancy <span class="change positive">causes ${him} to begin lactating.</span>`);
					slave.lactation = 1;
				}
			}
			if (slave.lactation === 1) { // If natural lactation, constantly refresh it.
				slave.lactationDuration = 2;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function failSafe(slave) {
		slave.pregType = setPregType(slave);
		WombImpregnate(slave, slave.pregType, slave.pregSource, slave.preg);
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function preconception(slave) {
		if (isFertile(slave)) {
			needToBreed(slave);
		}
		if (canGetPregnant(slave) && ((slave.assignment === Job.DAIRY && V.dairyPregSetting === 0) || slave.assignment !== Job.DAIRY)) {
			impregnation(slave);
		}
		if (slave.ovaImplant === OvaryImplantType.ASEXUAL && isFertile(slave) && (slave.preg === 0 || (slave.preg >= 0 && slave.geneticQuirks.superfetation === 2))) {
			autoImpregnation(slave);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function needToBreed(slave) {
		if (slave.geneticQuirks.uterineHypersensitivity === 2) {
			slave.need *= 2;
			if (slave.fuckdoll === 0 && slave.fetish !== Fetish.MINDBROKEN) {
				if (slave.fetish !== Fetish.PREGNANCY) {
					if (slave.fetishStrength > 10) {
						r.push(`${He} feels a constant compulsion to breed, <span class="fetish loss">steadily eroding ${his} sexuality.</span>`);
						slave.fetishStrength -= 5;
					} else if (fetishChangeChance(slave) > random(0, 100)) {
						r.push(`${His} constant desire to breed <span class="fetish gain">finally manifests into a pregnancy fetish.</span>`);
						slave.fetish = Fetish.PREGNANCY;
						slave.fetishStrength = 60;
						slave.fetishKnown = 1;
					}
				} else if (slave.fetishStrength <= 95) {
					r.push(`${His} heat <span class="fetish inc">further increases ${his} desire to be impregnated.</span>`);
					slave.fetishStrength = Math.min(slave.fetishStrength + 5, 100);
				} else {
					r.push(`${He} is in a state of heat and in dire need of sex.`);
				}
			}
		}
		if (slave.fuckdoll === 0 && slave.preg === -1 && slave.devotion > 20 && slave.fetishStrength > 60 && slave.fetish === Fetish.PREGNANCY) {
			if (slave.fetishKnown === 0) {
				r.push(`<span class="devotion dec">${He}'s unhappy</span> that ${he}'s on contraceptives, revealing that ${he} has a <span class="fetish gain">deep desire to get pregnant.</span>`);
				slave.fetishKnown = 1;
			} else {
				r.push(`${He} badly wants to have a child, so <span class="devotion dec">${he}'s unhappy</span> that ${he}'s on contraceptives.`);
			}
			slave.devotion -= 4;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function addRapeFlaw(slave) {
		if (slave.sexualFlaw === SexualFlaw.NONE) {
			r.push(`This unpleasant interlude leaves ${him} <span class="flaw gain">hating penetration</span> of ${his} violated`);
			if (slave.mpreg === 1) {
				r.push(`anus.`);
				slave.sexualFlaw = SexualFlaw.HATESANAL;
			} else {
				r.push(`pussy.`);
				slave.sexualFlaw = SexualFlaw.HATESPEN;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {boolean}
	 */
	function pcCanKnockUpSlave(slave) {
		return !isPlayerFrigid() &&
			((canImpreg(slave, V.PC) &&
				(
					(slave.toyHole === ToyHole.ALL && slave.mpreg !== 1 && slave.vagina > 0) ||
					(slave.toyHole === ToyHole.ALL && slave.mpreg === 1 && slave.anus > 0) ||
					(slave.toyHole === ToyHole.PUSSY && slave.mpreg !== 1) ||
					(slave.toyHole === ToyHole.ASS && slave.mpreg === 1)
				)
			) ||
			(canFemImpreg(slave, V.PC) &&
				(
					(slave.toyHole === ToyHole.ALL && slave.mpreg !== 1 && slave.vagina >= 0) ||
					(slave.toyHole === ToyHole.PUSSY && slave.mpreg !== 1)
				)
			));
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function pcDoKnockUpSlave(slave) {
		if (slave.pregKnown === 0) {
			r.push(`You frequently avail yourself to ${his} fertile`);
			if (slave.mpreg === 1) {
				r.push(`ass.`);
			} else {
				r.push(`pussy.`);
			}
			r.push(`It's no surprise when <span class="pregnant">${he} ends up pregnant with your child.</span>`);
		}
		knockMeUp(slave, 100, 2, -1);
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function impregnation(slave) {
		const conceptionSeed = random(1, 100);
		let Stud = slaveStateById(V.StudID); // May be null!
		const studIgnoresRules = (Stud && V.universalRulesImpregnation === "Stud" && Stud.career === "a breeding bull" && Stud.fetish === Fetish.MINDBROKEN && canMove(Stud));
		const pussy = (slave.mpreg === 1 ? "asspussy" : "pussy");
		let satisfiedPregFetish = 0;
		let StudVaginal = 0;
		let rapeAddsFlaw = 0;
		let StudPenetrative = 0;
		let StudTakesV = 0;

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {App.Entity.PlayerState} PC
		 */
		function tryImpreg(slave, PC) {
			if (!isVirile(PC)) {
				return false;
			} else if (!canBreed(slave, PC)) {
				return false;
			} else if (!canGetPregnant(slave)) {
				return false;
			} else if ((PC.anus === 0 || PC.prostate === 0) && (PC.prostateImplant !== "stimulator")) {
				return false;
			} else {
				return true;
			}
		}

		if (V.universalRulesImpregnation === "PC" && tryImpreg(slave, V.PC) && (slave.pregKnown === 0 || (V.universalRulesSuperfetationImpregnation === 1 && slave.geneticQuirks.superfetation === 2 && (slave.pregKnown === 1 || V.geneticMappingUpgrade > 0 || slave.counter.birthsTotal > 0))) && slave.PCExclude !== 1) {
			if (isPlayerFrigid()) {
				r.push(`${slave.slaveName} is ready to be bred, so whenever you feel up to it, you ejaculate onto ${his} fertile`);
				if (slave.mpreg === 1) {
					r.push(`ass.`);
				} else {
					r.push(`cunt.`);
				}
				if (slave.fuckdoll === 0 && slave.fetish !== Fetish.MINDBROKEN) {
					if (slave.devotion <= 20 && slave.trust >= -20) {
						r.push(`${He} attempts to resist this treatment, and spends most of ${his} days bound securely to prevent ${him} from cleaning the cum off ${his}`);
						if (slave.mpreg === 1) {
							r.push(`anus.`);
						} else {
							r.push(`pussy.`);
						}
						r.push(`This regimen fills ${him} with <span class="devotion dec">hatred,</span> <span class="trust dec">fear,</span> and eventually, <span class="pregnant">a pregnancy.</span>`);
						slave.devotion -= 5;
						slave.trust -= 5;
					} else if (slave.devotion <= 20) {
						r.push(`${He} complies fearfully with your use of ${his} <span class="pregnant">body and womb.</span>`);
					} else if (slave.fetish === Fetish.PREGNANCY && slave.fetishStrength > 60) {
						r.push(`${He} is <span class="devotion inc">absurdly pleased</span> by this treatment, <span class="trust inc">trustingly</span> serving as your cum receptacle until ${he} <span class="pregnant">conceives.</span> ${He}'s so aroused by having you pour in semen that the sensation alone of it creeping into ${his} depths is often enough to bring ${him} to orgasm.`);
						slave.devotion += 5;
						slave.trust += 5;
						if (slave.fetishKnown === 1 && slave.fetishStrength <= 95) {
							r.push(`Such total satisfaction of ${his} pregnancy fantasies <span class="fetish inc">strengthens ${his} fetish.</span>`);
							slave.fetishStrength += 4;
						} else if (slave.fetishKnown === 0) {
							r.push(`You are now well aware of ${his} <span class="fetish gain">latent pregnancy fetish.</span>`);
							slave.fetishKnown = 1;
						}
						slave.need = 0;
					} else {
						r.push(`${He} serves you dutifully in this, <span class="trust inc">trustingly</span> serving as your cum receptacle until ${he} <span class="pregnant">conceives.</span>`);
						slave.trust += 5;
					}
				}
				// yes, you are NOT penetrating her. This can, and will, result in virgin pregnancies.
			} else if (V.PC.dick > 0) {
				r.push(`${slave.slaveName} is ripe for breeding, so you ejaculate inside ${him} often. When you bore of ${his} fertile`);
				if (slave.mpreg === 1) {
					r.push(`ass,`);
				} else {
					r.push(`cunt,`);
				}
				r.push(`you keep ${him} around as you fuck other slaves so you can pull out of them, shove your cock into ${him}, and fill ${him} with your seed anyway.`);
				if (slave.fuckdoll === 0 && slave.fetish !== Fetish.MINDBROKEN) {
					if (slave.devotion <= 20 && slave.trust >= -20) {
						r.push(`${He} attempts to resist this treatment, and spends most of ${his} days bound securely, with your cum dripping out of ${his}`);
						if (slave.mpreg === 1) {
							r.push(`ass.`);
						} else {
							r.push(`pussy.`);
						}
						r.push(`This regimen fills ${him} with <span class="devotion dec">hatred,</span> <span class="trust dec">fear,</span> and <span class="pregnant">a pregnancy.</span>`);
						slave.devotion -= 5;
						slave.trust -= 5;
						if (slave.sexualFlaw === SexualFlaw.NONE) {
							r.push(`This unpleasant interlude leaves ${him} <span class="flaw gain">hating penetration</span> of ${his} now-pregnant`);
							if (slave.mpreg === 1) {
								r.push(`ass.`);
								slave.sexualFlaw = SexualFlaw.HATESANAL;
							} else {
								r.push(`pussy.`);
								slave.sexualFlaw = SexualFlaw.HATESPEN;
							}
						}
					} else if (slave.devotion <= 20) {
						r.push(`${He} complies fearfully with your use of ${his} <span class="pregnant">body and womb.</span>`);
					} else if (slave.fetish === Fetish.PREGNANCY && slave.fetishStrength > 60) {
						r.push(`${He} is <span class="devotion inc">absurdly pleased</span> by this treatment, <span class="trust inc">trustingly</span> serving as your breeding bitch until ${he} <span class="pregnant">conceives.</span> ${He}'s so aroused by the constant insemination that having your dick, wet from another slave, pushed inside ${him} to climax is often enough to bring ${him} to orgasm in turn.`);
						slave.devotion += 5;
						slave.trust += 5;
						if (slave.fetishKnown === 1 && slave.fetishStrength <= 95) {
							r.push(`Such total satisfaction of ${his} pregnancy fantasies <span class="fetish inc">strengthens ${his} fetish.</span>`);
							slave.fetishStrength += 4;
						} else if (slave.fetishKnown === 0) {
							r.push(`You are now well aware of ${his} <span class="fetish gain">latent pregnancy fetish.</span>`);
							slave.fetishKnown = 1;
						}
						slave.need = 0;
					} else {
						r.push(`${He} serves you dutifully in this, <span class="trust inc">trustingly</span> serving as your breeding bitch until ${he} <span class="pregnant">conceives.</span>`);
						slave.trust += 5;
					}
				}
				if (slave.mpreg === 1) {
					r.push(VCheck.Anal(slave, 10));
				} else {
					r.push(VCheck.Vaginal(slave, 10));
				}
			} else {
				r.push(`${slave.slaveName} is ripe for breeding, so you spray ejaculate onto ${his} fertile`);
				if (slave.mpreg === 1) {
					r.push(`ass`);
				} else {
					r.push(`cunt`);
				}
				r.push(`often. When you`);
				if (V.PC.vagina >= 0) {
					r.push(`bore of tribbing with ${him}, you keep ${him} around as you fuck other slaves so you can press your pussy up against ${him} and fill ${him} with your seed anyway.`);
				} else {
					r.push(`tire of milking yourself, you keep ${him} around so you don't have to travel far when your refractory period is up.`);
				}
				if (slave.fuckdoll === 0 && slave.fetish !== Fetish.MINDBROKEN) {
					if (slave.devotion <= 20 && slave.trust >= -20) {
						r.push(`${He} attempts to resist this treatment, and spends most of ${his} days bound securely with ${his} cum-filled`);
						if (slave.mpreg === 1) {
							r.push(`ass`);
						} else {
							r.push(`pussy`);
						}
						r.push(`up in the air. This regimen fills ${him} with <span class="devotion dec">hatred,</span> <span class="trust dec">fear,</span> and <span class="pregnant">a pregnancy.</span>`);
						slave.devotion -= 5;
						slave.trust -= 5;
						if (slave.behavioralFlaw === BehavioralFlaw.NONE && perceivedGender(V.PC) > 0) {
							r.push(`This unpleasant interlude leaves ${him} <span class="flaw gain">distrusting women</span> and their many surprises.`);
							slave.sexualFlaw = BehavioralFlaw.HATESWOMEN;
						}
					} else if (slave.devotion <= 20) {
						r.push(`${He} complies fearfully with your use of ${his} <span class="pregnant">body and womb.</span>`);
					} else if (slave.fetish === Fetish.PREGNANCY && slave.fetishStrength > 60) {
						r.push(`${He} is <span class="devotion inc">absurdly pleased</span> by this treatment, <span class="trust inc">trustingly</span> serving as your cum receptacle until ${he} <span class="pregnant">conceives.</span> ${He}'s so aroused by the constant insemination that having you push up against ${him} to climax is often enough to bring ${him} to orgasm in turn.`);
						slave.devotion += 5;
						slave.trust += 5;
						if (slave.fetishKnown === 1 && slave.fetishStrength <= 95) {
							r.push(`Such total satisfaction of ${his} pregnancy fantasies <span class="fetish inc">strengthens ${his} fetish.</span>`);
							slave.fetishStrength += 4;
						} else if (slave.fetishKnown === 0) {
							r.push(`You are now well aware of ${his} <span class="fetish gain">latent pregnancy fetish.</span>`);
							slave.fetishKnown = 1;
						}
						slave.need = 0;
					} else {
						r.push(`${He} serves you dutifully in this, <span class="trust inc">trustingly</span> serving as your cum receptacle until ${he} <span class="pregnant">conceives.</span>`);
						slave.trust += 5;
					}
				}
				if (V.PC.vagina >= 0) {
					if (slave.mpreg === 1) {
						seX(slave, "anal", V.PC, "vaginal", 10);
					} else {
						seX(slave, "vaginal", V.PC, "vaginal", 10);
					}
				}
			}
			knockMeUp(slave, 100, 2, -1);
			V.PC.deferredNeed -= 2;
		} else if ((slave.vagina === 0 || (slave.anus === 0 && slave.mpreg > 0)) && !studIgnoresRules) {
			// Skip virgins.
			if (isVirile(slave) && slave.geneMods.aggressiveSperm === 1 && canFemImpreg(slave, slave)) {
				// Ejaculating with the sperm mod can result in splashback. More sex, more chances.
				if (random(1, 100) > (99 - (slave.energy / 2))) {
					knockMeUp(slave, 0, 2, slave.ID); // 0% chance is correct. Gene mod adds 75% in knockMeUp().
				}
			}
		} else if (V.HeadGirlID !== 0 && slave.ID !== V.HeadGirlID && V.universalRulesImpregnation === "HG" && canPenetrate(S.HeadGirl) && (slave.pregKnown === 0 || (V.universalRulesSuperfetationImpregnation === 1 && slave.geneticQuirks.superfetation === 2 && (slave.pregKnown === 1 || V.geneticMappingUpgrade > 0 || slave.counter.birthsTotal > 0)))) {
			const {
				he2, His2, his2, him2,
			} = getPronouns(S.HeadGirl).appendSuffix('2');
			if (slave.HGExclude === 1) {
				r.push(`It's ${S.HeadGirl.slaveName}'s responsibility to impregnate fertile slaves, but your Head Girl is forbidden from impregnating ${slave.slaveName}.`);
			} else if (V.universalHGImpregnateMasterSuiteToggle === 1 && [Job.MASTERSUITE, Job.CONCUBINE].includes(slave.assignment)) {
				r.push(`It's ${S.HeadGirl.slaveName}'s responsibility to impregnate fertile slaves, but ${slave.slaveName} is off-limits.`);
			} else if (App.EndWeek.saVars.HGCum === 0) {
				r.push(`It's ${S.HeadGirl.slaveName}'s responsibility to impregnate fertile slaves, but your Head Girl can only fuck a limited number of slaves enough to ensure impregnation each week.`);
			} else if (!canBreed(slave, S.HeadGirl)) {
				r.push(`It's ${S.HeadGirl.slaveName}'s responsibility to impregnate fertile slaves, but ${S.HeadGirl.slaveName}'s sperm is unable to fertilize ${slave.slaveName}'s ova, so ${he2} doesn't waste ${his2} seed trying.`);
			} else {
				r.push(`It's ${S.HeadGirl.slaveName}'s responsibility to get ${him} pregnant, a task your`);
				if (S.HeadGirl.fetish === Fetish.PREGNANCY && S.HeadGirl.fetishStrength > 60) {
					if (S.HeadGirl.fetishKnown === 1) {
						r.push(`pregnancy fetishist`);
					}
					r.push(`Head Girl is <span class="devotion inc">extremely pleased</span> to take on.`);
					S.HeadGirl.devotion += 2;
					if (S.HeadGirl.fetishStrength <= 95) {
						if (S.HeadGirl.fetishKnown === 1) {
							r.push(`The opportunity <span class="fetish inc">strengthens ${his2} pregnancy fetish</span> by indulgence.`);
						}
						S.HeadGirl.fetishStrength += 4;
					}
				} else if (S.HeadGirl.career === "a breeding bull") {
					r.push(`Head Girl feels <span class="devotion inc">${he2} was meant for.</span>`);
					S.HeadGirl.devotion += 1;
				} else if (S.HeadGirl.attrXX > 65 && S.HeadGirl.attrKnown === 1) {
					if (slave.mpreg === 1) {
						r.push(`ass-hungry`);
					} else {
						r.push(`pussy-hungry`);
					}
					r.push(`Head Girl is <span class="devotion inc">happy</span> to take on.`);
					S.HeadGirl.devotion += 1;
				} else {
					r.push(`Head Girl approaches dutifully.`);
				}
				if (slave.fuckdoll === 0 && slave.fetish !== Fetish.MINDBROKEN) {
					if (slave.career === "a dairy cow" && slave.devotion <= 20) {
						r.push(`${slave.slaveName} feels a need to be bred by the Head Girl, and submits ${himself} to ${his} superior's virile cock until <span class="pregnant">conception</span> is verified.`);
					} else if (slave.devotion <= 20 && slave.trust >= -20) {
						if ((S.HeadGirl.fetish === Fetish.SADIST || S.HeadGirl.fetish === Fetish.DOM) && S.HeadGirl.fetishStrength > 60) {
							r.push(`${His2} interest is piqued, however, when ${slave.slaveName} shows signs of resistance. ${S.HeadGirl.slaveName} <span class="devotion inc">enthusiastically</span> <span class="devotion dec">rapes the poor ${girl}</span> pregnant, ejaculating inside ${his2} victim more often than is really necessary for <span class="pregnant">conception.</span>`);
							S.HeadGirl.devotion += 2;
							slave.devotion -= 5;
						} else {
							r.push(`${slave.slaveName} tries to resist ${him2}, so ${S.HeadGirl.slaveName} is forced to <span class="devotion dec">rape the poor ${girl}</span> pregnant, regularly ejaculating inside ${him} until <span class="pregnant">conception</span> is confirmed.`);
							slave.devotion -= 4;
						}
						addRapeFlaw(slave);
					} else if (slave.devotion <= 20) {
						if ((S.HeadGirl.fetish === Fetish.SADIST || S.HeadGirl.fetish === Fetish.DOM) && S.HeadGirl.fetishStrength > 60) {
							r.push(`${His2} interest is piqued, however, when it becomes clear that ${slave.slaveName}, though fearfully obedient, is not happy with being bred. ${S.HeadGirl.slaveName} <span class="devotion inc">enthusiastically</span> ensures that ${his2} victim <span class="devotion dec">does not enjoy</span> a week of being <span class="pregnant">raped pregnant.</span>`);
							S.HeadGirl.devotion += 2;
							slave.devotion -= 3;
						} else {
							r.push(`${slave.slaveName}, though fearfully obedient, is not happy with being bred, but ${S.HeadGirl.slaveName} <span class="devotion dec">rapes the poor ${girl}</span> pregnant anyway, regularly ejaculating inside ${him} until <span class="pregnant">conception</span> is confirmed.`);
							slave.devotion -= 2;
						}
						addRapeFlaw(slave);
					} else if (slave.devotion < 75) {
						if (slave.fetish === Fetish.PREGNANCY && slave.fetishStrength > 60) {
							if (slave.fetishKnown === 1) {
								r.push(`${slave.slaveName}, a pregnancy fetishist,`);
							} else {
								r.push(`${slave.slaveName}`);
							}
							r.push(`is <span class="devotion inc">very willing to be bred</span> by your Head Girl, and eagerly takes ${his} superior's cock bareback until <span class="pregnant">conception</span> is verified.`);
							slave.devotion += 2;
							if (slave.fetishStrength <= 95 && slave.fetishKnown === 1) {
								r.push(`Such total satisfaction of ${his} pregnancy fantasies <span class="fetish inc">strengthens ${his} fetish.</span>`);
								slave.fetishStrength += 4;
							} else {
								r.push(`${His} enthusiasm betrays ${his} <span class="fetish gain">hidden pregnancy fetish.</span>`);
								slave.fetishKnown = 1;
							}
							slave.need = 0;
						} else {
							r.push(`${slave.slaveName} is willing to be bred by the Head Girl, and takes ${his} superior's cock bareback until <span class="pregnant">conception</span> is verified.`);
						}
					} else {
						if (slave.fetish === Fetish.PREGNANCY && slave.fetishStrength > 60) {
							if (slave.fetishKnown === 1) {
								r.push(`${slave.slaveName}, a pregnancy fetishist,`);
							} else {
								r.push(`${slave.slaveName}`);
							}
							r.push(`considers getting bred by your Head Girl <span class="devotion inc">a dream come true,</span> and gets fucked bareback daily until <span class="pregnant">conception</span> is verified.`);
							slave.devotion += 2;
							if (slave.fetishStrength <= 95 && slave.fetishKnown === 1) {
								r.push(`Such total satisfaction of ${his} pregnancy fantasies <span class="fetish inc">strengthens ${his} fetish.</span>`);
								slave.fetishStrength += 4;
							} else {
								r.push(`${His} enthusiasm exposes ${his} <span class="fetish gain">latent pregnancy fetish.</span>`);
								slave.fetishKnown = 1;
							}
							slave.need = 0;
						} else {
							r.push(`${slave.slaveName} is <span class="devotion inc">quite willing to be bred</span> by the Head Girl, whom ${he} respects, and submissively takes ${his} superior's cock bareback until <span class="pregnant">conception</span> is verified.`);
							slave.devotion += 1;
						}
					}
				}
				App.EndWeek.saVars.HGCum -= 1;
				knockMeUp(slave, 100, 2, V.HeadGirlID);
				if (slave.mpreg === 1) {
					seX(slave, "anal", S.HeadGirl, "penetrative", 10);
				} else {
					seX(slave, "vaginal", S.HeadGirl, "penetrative", 10);
				}
			}
		} else if (Stud && slave.ID !== V.StudID && V.universalRulesImpregnation === "Stud" && (slave.pregKnown === 0 || (V.universalRulesSuperfetationImpregnation === 1 && slave.geneticQuirks.superfetation === 2 && (slave.pregKnown === 1 || V.geneticMappingUpgrade > 0 || slave.counter.birthsTotal > 0)))) {
			const {
				He2, he2, his2, him2, himself2,
			} = getPronouns(Stud).appendSuffix('2');
			if ((slave.StudExclude === 1 || slave.breedingMark === 1) && (Stud.career !== "a breeding bull" || Stud.fetish !== Fetish.MINDBROKEN || !canMove(Stud))) {
				r.push(`It's ${Stud.slaveName}'s role to provide sperm for fertile slaves, but ${slave.slaveName} is not included on the list.`);
			} else if (V.universalHGImpregnateMasterSuiteToggle === 1 && [Job.MASTERSUITE, Job.CONCUBINE].includes(slave.assignment)) {
				r.push(`It's ${Stud.slaveName}'s role to provide sperm for fertile slaves, but ${slave.slaveName} is off-limits.`);
			} else if (App.EndWeek.saVars.StudCum === 0) {
				r.push(`It's ${Stud.slaveName}'s role to provide sperm for fertile slaves, but your Stud can only cum enough to ensure impregnation in a limited number of slaves each week.`);
			} else if (!canBreed(slave, Stud)) {
				r.push(`It's ${Stud.slaveName}'s role to provide sperm for fertile slaves, but ${his2} sperm is unable to fertilize ${slave.slaveName}'s ova, so there is no point in forcing the union.`);
			} else {
				let StudRandiness = 0; // used to control the slave reaction. 1 - fucks slave, -1 - slave fucks stud, 0 - inert
				r.push(`It's ${Stud.slaveName}'s role to`);
				// stud's reaction to the role
				if (Stud.fuckdoll > 0) {
					r.push(`provide sperm for ${him}; all ${he} needs to do is signal the suit to stimulate an ejaculation.`);
				} else if (Stud.fetish === Fetish.MINDBROKEN) {
					if (Stud.career === "a breeding bull" && canMove(Stud)) {
						r.push(`impregnate fertile slaves, a task the amorous Stud performs with gusto and little regard for rules.`);
						StudRandiness = 1;
					} else {
						r.push(`provide sperm for ${him}, a task that usually involves ${him} doing all the work.`);
						StudRandiness = -1;
					}
				} else if (Stud.career === "a breeding bull") {
					if (Stud.fetish === Fetish.PREGNANCY && Stud.fetishKnown === 1 && Stud.fetishStrength > 60) {
						r.push(`impregnate ${him}, a task your pregnancy fetishist Stud believes <span class="devotion inc">is nothing short of destiny.</span>`);
						Stud.devotion += 3;
						if (Stud.fetishStrength <= 95) {
							r.push(`The opportunity <span class="fetish inc">strengthens ${his2} pregnancy fetish</span> by indulgence.`);
							Stud.fetishStrength += 4;
						}
					} else if (Stud.fetish === Fetish.DOM && Stud.fetishKnown === 1 && Stud.fetishStrength > 60) {
						r.push(`fill ${him} with child, a task your dominant Stud <span class="devotion inc">carries out with gusto.</span>`);
						Stud.devotion += 2;
						if (Stud.fetishStrength <= 95) {
							r.push(`The opportunity <span class="fetish inc">strengthens ${his2} dominant tendencies</span> by indulgence.`);
							Stud.fetishStrength += 4;
						}
					} else {
						r.push(`impregnate ${him}, a task your Stud feels <span class="devotion inc">${he2} was meant for.</span>`);
						Stud.devotion += 1;
					}
					StudRandiness = 1;
				} else if (Stud.devotion < -20) {
					if (Stud.trust > 20) {
						if (Stud.fetish === Fetish.PREGNANCY && Stud.fetishKnown === 1 && Stud.fetishStrength > 60) {
							r.push(`impregnate ${him}, a task your pregnancy fetishist Stud <span class="trust inc">takes full advantage of</span> to deeply ingrain ${himself2} in your penthouse.`);
							if (Stud.fetishStrength <= 95) {
								r.push(`The opportunity <span class="fetish inc">strengthens ${his2} pregnancy fetish</span> by indulgence.`);
								Stud.fetishStrength += 4;
							}
						} else if (Stud.fetish === Fetish.DOM && Stud.fetishKnown === 1 && Stud.fetishStrength > 60) {
							r.push(`fill ${him} with child, a task your dominant Stud <span class="trust inc">carries out with glee</span> as ${he2} steadily dominates your slaves.`);
							if (Stud.fetishStrength <= 95) {
								r.push(`The opportunity <span class="fetish inc">strengthens ${his2} dominant tendencies</span> by indulgence.`);
								Stud.fetishStrength += 4;
							}
						} else {
							r.push(`impregnate ${him}, a task your Stud <span class="trust inc">takes pride in</span> with each and every womb ${he2} takes from you.`);
						}
						Stud.trust += 3;
						StudRandiness = 1;
					} else if (Stud.trust >= -20) {
						if (Stud.fetish === Fetish.PREGNANCY && Stud.fetishKnown === 1 && Stud.fetishStrength > 60) {
							r.push(`fill ${him} with child, a task your pregnancy fetishist Stud <span class="trust inc">takes unwarranted pride</span> in.`);
							Stud.trust += 3;
							if (Stud.fetishStrength <= 95) {
								r.push(`The opportunity <span class="fetish inc">strengthens ${his2} pregnancy fetish</span> by indulgence.`);
								Stud.fetishStrength += 2;
							}
						} else if (Stud.fetish === Fetish.DOM && Stud.fetishKnown === 1 && Stud.fetishStrength > 60) {
							r.push(`fill ${him} with child, a task your dominant Stud <span class="trust inc">takes unwarranted pride</span> in.`);
							Stud.trust += 3;
							if (Stud.fetishStrength <= 95) {
								r.push(`The opportunity <span class="fetish inc">strengthens ${his2} dominant tendencies</span> by indulgence.`);
								Stud.fetishStrength += 2;
							}
						} else {
							r.push(`impregnate ${him}, a task your Stud <span class="trust inc">takes unwarranted liberties</span> in.`);
							Stud.trust += 2;
						}
						StudRandiness = 1;
					} else {
						if (Stud.fetish === Fetish.PREGNANCY && Stud.fetishKnown === 1 && Stud.fetishStrength > 60) {
							r.push(`impregnate ${him}, a task your pregnancy fetishist Stud <span class="trust inc">warms up to</span> in spite of ${his2} fear of you.`);
							Stud.trust += 1;
							if (Stud.fetishStrength <= 95) {
								r.push(`The opportunity <span class="fetish inc">strengthens ${his2} pregnancy fetish</span> by indulgence.`);
								Stud.fetishStrength += 1;
							}
							StudRandiness = 1;
						} else if (Stud.fetish === Fetish.MASOCHIST && Stud.fetishKnown === 1 && Stud.fetishStrength > 60) {
							r.push(`provide sperm for ${him}, a task your masochist Stud <span class="trust inc">takes advantage of</span> despite ${his2} fear of you.`);
							Stud.trust += 1;
							if (Stud.fetishStrength <= 95) {
								r.push(`The opportunity <span class="fetish inc">strengthens ${his2} masochistic tendencies</span> by indulgence.`);
								Stud.fetishStrength += 1;
							}
							StudRandiness = -1;
						} else if (Stud.fetish === Fetish.SUBMISSIVE && Stud.fetishKnown === 1 && Stud.fetishStrength > 60) {
							r.push(`provide sperm for ${him}, a task your submissive Stud <span class="trust inc">warms up to</span> in spite of ${his2} fear of you.`);
							Stud.trust += 1;
							if (Stud.fetishStrength <= 95) {
								r.push(`The opportunity <span class="fetish inc">strengthens ${his2} tendencies</span> by indulgence.`);
								Stud.fetishStrength += 1;
							}
							StudRandiness = -1;
						} else {
							r.push(`impregnate ${him}, a task your Stud struggles with under ${his2} overwhelming fear of you.`);
							StudRandiness = -1;
						}
					}
				} else if (Stud.devotion <= 20) {
					if (Stud.trust >= -20) {
						if (Stud.fetish === Fetish.PREGNANCY && Stud.fetishKnown === 1 && Stud.fetishStrength > 60) {
							r.push(`impregnate ${him}, a task your pregnancy fetishist Stud takes <span class="devotion inc">hesitant pleasure</span> in.`);
							Stud.devotion += 1;
							if (Stud.fetishStrength <= 95) {
								r.push(`The opportunity <span class="fetish inc">strengthens ${his2} pregnancy fetish</span> by indulgence.`);
								Stud.fetishStrength += 2;
							}
							StudRandiness = 1;
						} else if (Stud.fetish === Fetish.SUBMISSIVE && Stud.fetishKnown === 1 && Stud.fetishStrength > 60) {
							r.push(`provide sperm for ${him}, a task your submissive Stud <span class="devotion inc">enjoys</span> more than ${he2} lets on.`);
							Stud.devotion += 1;
							if (Stud.fetishStrength <= 95) {
								r.push(`The opportunity <span class="fetish inc">strengthens ${his2} tendencies</span> by indulgence.`);
								Stud.fetishStrength += 2;
							}
							StudRandiness = -1;
						} else {
							r.push(`impregnate ${him}, a task your Stud approaches with caution.`);
							StudRandiness = 1;
						}
					} else {
						if (Stud.fetish === Fetish.PREGNANCY && Stud.fetishKnown === 1 && Stud.fetishStrength > 60) {
							r.push(`impregnate ${him}, a task your pregnancy fetishist Stud takes some <span class="devotion inc">pleasure</span> in, despite ${his2} fears of you.`);
							Stud.devotion += 1;
							if (Stud.fetishStrength <= 95) {
								r.push(`The opportunity <span class="fetish inc">strengthens ${his2} tendencies</span> by indulgence.`);
								Stud.fetishStrength += 1;
							}
						} else if (Stud.fetish === Fetish.MASOCHIST && Stud.fetishKnown === 1 && Stud.fetishStrength > 60) {
							r.push(`provide sperm for ${him}, a task your masochist Stud is <span class="devotion inc">surprisingly willing</span> to complicate, despite ${his2} fear of you, in order to provoke ${him}.`);
							Stud.devotion += 1;
							if (Stud.fetishStrength <= 95) {
								r.push(`The opportunity <span class="fetish inc">strengthens ${his2} masochistic tendencies</span> by indulgence.`);
								Stud.fetishStrength += 1;
							}
						} else if (Stud.fetish === Fetish.SUBMISSIVE && Stud.fetishKnown === 1 && Stud.fetishStrength > 60) {
							r.push(`provide sperm for ${him}, a task your submissive Stud <span class="devotion inc">is more than happy</span> to allow ${him} to take responsibility of.`);
							Stud.devotion += 1;
							if (Stud.fetishStrength <= 95) {
								r.push(`The opportunity <span class="fetish inc">strengthens ${his2} tendencies</span> by indulgence.`);
								Stud.fetishStrength += 1;
							}
						} else {
							r.push(`impregnate ${him}, a task your Stud takes seriously in fear of what will become of ${him} should ${he} fail.`);
						}
						StudRandiness = 1;
					}
				} else {
					if (Stud.fetish === Fetish.PREGNANCY && Stud.fetishKnown === 1 && Stud.fetishStrength > 60) {
						r.push(`impregnate ${him}, a task your pregnancy fetishist Stud is <span class="devotion inc">extremely pleased</span> to take on.`);
						Stud.devotion += 2;
						if (Stud.fetishStrength <= 95) {
							r.push(`The opportunity <span class="fetish inc">strengthens ${his2} pregnancy fetish</span> by indulgence.`);
							Stud.fetishStrength += 4;
						}
					} else if (Stud.fetish === Fetish.DOM && Stud.fetishKnown === 1 && Stud.fetishStrength > 60) {
						r.push(`fill ${him} with child, a task your dominant Stud <span class="devotion inc">enjoys the perks of.</span>`);
						Stud.devotion += 2;
						if (Stud.fetishStrength <= 95) {
							r.push(`The opportunity <span class="fetish inc">strengthens ${his2} tendencies</span> by indulgence.`);
							Stud.fetishStrength += 4;
						}
					} else {
						r.push(`impregnate ${him}, a task your Stud approaches dutifully.`);
					}
					StudRandiness = 1;
				}
				// slave's response to the deed
				if (slave.fuckdoll === 0 && slave.fetish !== Fetish.MINDBROKEN) {
					if (Stud.fuckdoll > 0) {
						if (slave.career === "a dairy cow" && slave.devotion <= 20) {
							r.push(`${slave.slaveName} <span class="devotion dec">is not amused</span> that ${he} is expected to use a syringe to <span class="pregnant">inseminate ${himself}.</span>`);
							slave.devotion -= 2;
						} else if (slave.devotion <= 20 && slave.trust >= -20) {
							r.push(`${slave.slaveName} <span class="trust dec">is horrified</span> by the state of ${Stud.slaveName} and <span class="devotion dec">quite upset</span> that ${he} is being forced not only to carry ${his2} child, but to milk ${him2} and inject ${his2} cum into ${his} ${pussy} until ${he} <span class="pregnant">conceives.</span>`);
							slave.trust -= 4;
							slave.devotion -= 4;
						} else if (slave.devotion <= 20) {
							r.push(`${slave.slaveName} <span class="trust dec">is utterly horrified</span> by the state of ${Stud.slaveName} and <span class="devotion dec">has to be forced</span> <span class="pregnant">conceive ${his2} child.</span>`);
							slave.trust -= 10;
							slave.devotion -= 10;
						} else if (slave.devotion <= 75) {
							if (slave.fetish === Fetish.PREGNANCY && slave.fetishKnown === 1 && slave.fetishStrength > 60) {
								r.push(`${slave.slaveName}, a pregnancy fetishist, is <span class="devotion inc">very willing</span> to inject ${his2} cumshots deep into ${his} ${pussy} until ${he} <span class="pregnant">conceives.</span>`);
								slave.devotion += 1;
								satisfiedPregFetish = 1;
								slave.need -= 10;
							} else {
								r.push(`${slave.slaveName} is willing to carry your Stud's child and injects ${his2} loads into ${his} ${pussy} until ${he} <span class="pregnant">conceives.</span>`);
							}
						} else {
							if (slave.fetish === Fetish.PREGNANCY && slave.fetishKnown === 1 && slave.fetishStrength > 60) {
								r.push(`${slave.slaveName}, a pregnancy fetishist, <span class="devotion inc">eagerly</span> injects cumshot after cumshot into ${his} hungry ${pussy} throughout the week, <span class="pregnant">guaranteeing conception.</span>`);
								slave.devotion += 1;
								satisfiedPregFetish = 1;
								slave.need -= 10;
							} else {
								r.push(`${slave.slaveName} is <span class="devotion inc">quite willing</span> to carry your Stud's child and dutifully injects ${himself} with ${his2} loads until <span class="pregnant">conception</span> is verified.`);
								slave.devotion += 1;
							}
						}
					} else if (Stud.dick === 0) {
						if (slave.career === "a dairy cow" && slave.devotion <= 20) {
							r.push(`${slave.slaveName} feels a need to be bred by your Stud,`);
							if (StudRandiness === 1) {
								r.push(`but has <span class="devotion dec">trouble coming to terms with</span> being <span class="pregnant">inseminated</span> by a mate with no dick.`);
								slave.need -= 10;
								StudVaginal = 1;
							} else {
								r.push(`but between ${his} mate's lack of a dick and having to <span class="pregnant">inseminate ${himself}</span> with a syringe, the experience <span class="devotion dec">is not very pleasant.</span>`);
							}
							slave.devotion -= 1;
						} else if (slave.devotion <= 20 && slave.trust >= -20) {
							if (StudRandiness === 1) {
								r.push(`${slave.slaveName} tries to resist ${him2}, so ${Stud.slaveName} teaches ${him2} that ${he2} doesn't need a dick <span class="devotion dec">to rape the poor ${girl}</span> pregnant. ${He2} regularly ejaculating inside ${him} until <span class="pregnant">conception</span> is confirmed, <span class="trust dec">much to ${his} terror.</span>`);
								slave.devotion -= 4;
								slave.trust -= 4;
								StudVaginal = 1;
							} else {
								r.push(`${slave.slaveName} finds ${Stud.slaveName} is in a similar situation as ${he} is, so ${he} tries to make it as <span class="trust inc">mutually enjoyable as possible,</span> despite the awkwardness involved, while trying ${his} best to overlook that ${Stud.slaveName} is being forced to <span class="pregnant">impregnate ${him}.</span>`);
								slave.trust += 4;
								slave.need = 0;
							}
						} else if (slave.devotion <= 20) {
							if (StudRandiness === 1) {
								r.push(`${slave.slaveName}, though fearfully obedient, is not happy with being bred, so ${Stud.slaveName} is forced to <span class="devotion dec">rape the poor ${girl}</span> pregnant, regularly squirting cum into ${his} ${pussy} until <span class="pregnant">conception</span> is confirmed.`);
								slave.devotion -= 4;
							} else {
								r.push(`${slave.slaveName} finds that ${Stud.slaveName} is less than enthusiastic about fucking ${him}, <span class="devotion dec">making the resulting rape extra unpleasant</span> when ${he2} <span class="pregnant">forces a baby into ${him}.</span>`);
								slave.devotion -= 6;
							}
						} else if (slave.devotion <= 75) {
							if (slave.fetish === Fetish.PREGNANCY && slave.fetishKnown === 1 && slave.fetishStrength > 60) {
								r.push(`${slave.slaveName}, a pregnancy fetishist, is`);
								if (StudRandiness === 1) {
									r.push(`<span class="devotion inc">very willing to be bred</span> by your Stud, but never expected to be <span class="pregnant">impregnated via tribbing.</span>`);
									slave.need -= 20;
									StudVaginal = 1;
								} else {
									r.push(`<span class="devotion inc">happy to bear</span> your Stud's child by injecting ${his2} cumshots deep into ${his} ${pussy} until ${he} <span class="pregnant">conceives.</span>`);
								}
								slave.devotion += 1;
								satisfiedPregFetish = 1;
							} else {
								r.push(`${slave.slaveName} is willing to carry your Stud's child and`);
								if (StudRandiness === 1) {
									r.push(`allows ${him2} to effectively <span class="pregnant">trib ${him} pregnant.</span>`);
									slave.need -= 20;
									StudVaginal = 1;
								} else {
									if (slave.fetish === Fetish.SADIST || slave.fetish === Fetish.DOM) {
										r.push(`wastes no time dealing with ${his2} issues and just harvests ${his2} sperm`);
									} else {
										r.push(`injects ${himself} with ${his2} loads`);
									}
									r.push(`until <span class="pregnant">conception</span> is verified.`);
								}
							}
						} else {
							if (slave.fetish === Fetish.PREGNANCY && slave.fetishKnown === 1 && slave.fetishStrength > 60) {
								r.push(`${slave.slaveName}, a pregnancy fetishist, considers carrying your Stud's child <span class="devotion inc">a dream come true,</span>`);
								if (StudRandiness === 1) {
									r.push(`but never expected to be <span class="pregnant">impregnated via tribbing.</span>`);
									slave.need -= 20;
									StudVaginal = 1;
								} else {
									r.push(`and injects milked cum into ${his} hungry ${pussy} daily until <span class="pregnant">conception</span> is verified.`);
								}
								slave.devotion += 1;
								satisfiedPregFetish = 1;
							} else {
								r.push(`${slave.slaveName} is <span class="devotion inc">quite willing</span> to carry your Stud's child`);
								if (StudRandiness === 1) {
									r.push(`and tribs with ${him2} until ${he2} squirts enough sperm into ${him} to <span class="pregnant">conceive a child.</span>`);
									slave.need -= 20;
									StudVaginal = 1;
								} else {
									r.push(`and dutifully injects ${himself} with ${his2} loads until <span class="pregnant">conception</span> is verified.`);
								}
								slave.devotion += 1;
							}
						}
					} else if (canAchieveErection(Stud) && Stud.dick <= 7) { // chastity is temporarily removed, so the only diff between this and canPenetrate() is if the dick actually fits
						if (slave.career === "a dairy cow" && slave.devotion <= 20) {
							r.push(`${slave.slaveName} feels a need to be bred by your Stud,`);
							if (StudRandiness === 1) {
								r.push(`and submits ${himself} to ${his} mate's virile cock`);
							} else {
								r.push(`and ${his} mate's unwillingness doesn't stop ${him} from forcibly riding ${his} cock`);
							}
							r.push(`until <span class="pregnant">conception</span> is verified.`);
							slave.need -= 50;
						} else if (slave.devotion <= 20 && slave.trust >= -20) {
							if (StudRandiness === 1) {
								r.push(`${slave.slaveName} tries to resist ${him2}, so ${Stud.slaveName} just <span class="devotion dec">rapes the poor ${girl}</span> pregnant, regularly ejaculating inside ${him} until <span class="pregnant">conception</span> is confirmed.`);
								slave.devotion -= 4;
								rapeAddsFlaw = 1;
							} else {
								r.push(`${slave.slaveName} finds ${Stud.slaveName} is in a similar situation as ${he} is, so ${he} tries to make it as <span class="trust inc">mutually enjoyable as possible,</span> despite the awkwardness involved, while trying ${his} best to overlook that ${Stud.slaveName} is being forced to <span class="pregnant">impregnate ${him}.</span>`);
								slave.trust += 4;
								slave.need = 0;
							}
						} else if (slave.devotion <= 20) {
							if (StudRandiness === 1) {
								r.push(`${slave.slaveName}, though fearfully obedient, is not happy with being bred, but ${Stud.slaveName} <span class="devotion dec">rapes the poor ${girl}</span> pregnant anyway, regularly ejaculating inside ${him} until <span class="pregnant">conception</span> is confirmed.`);
								slave.devotion -= 4;
								rapeAddsFlaw = 1;
							} else {
								r.push(`${slave.slaveName} finds that ${Stud.slaveName} is less than enthusiastic about fucking ${him}, <span class="devotion dec">making the resulting rape extra unpleasant</span> when ${he2} <span class="pregnant">forces a baby into ${him}.</span>`);
								slave.devotion -= 6;
							}
						} else if (slave.devotion <= 75) {
							if (slave.fetish === Fetish.PREGNANCY && slave.fetishKnown === 1 && slave.fetishStrength > 60) {
								r.push(`${slave.slaveName}, a pregnancy fetishist, is <span class="devotion inc">very willing to be bred</span> by your Stud, and eagerly`);
								if (StudRandiness === 1) {
									r.push(`takes ${his2} cock bareback`);
								} else {
									r.push(`rides ${him2} raw`);
								}
								r.push(`until <span class="pregnant">conception</span> is verified.`);
								slave.devotion += 2;
								satisfiedPregFetish = 1;
								slave.need = 0;
							} else {
								r.push(`${slave.slaveName} is willing to be bred by your Stud, and`);
								if (StudRandiness === 1) {
									r.push(`takes ${his2} cock bareback`);
								} else {
									if (slave.fetish === Fetish.SADIST || slave.fetish === Fetish.DOM) {
										r.push(`takes ${his2} dick by force`);
									} else {
										r.push(`dominantly rides ${his2} cock raw`);
									}
								}
								r.push(`until <span class="pregnant">conception</span> is verified.`);
								slave.need -= 20;
							}
						} else {
							if (slave.fetish === Fetish.PREGNANCY && slave.fetishKnown === 1 && slave.fetishStrength > 60) {
								r.push(`${slave.slaveName}, a pregnancy fetishist, considers getting bred by your Stud <span class="devotion inc">a dream come true,</span>`);
								if (StudRandiness === 1) {
									r.push(`and gets fucked bareback`);
								} else {
									r.push(`and rides ${him2} raw`);
								}
								r.push(`daily until <span class="pregnant">conception</span> is verified.`);
								slave.devotion += 2;
								satisfiedPregFetish = 1;
								slave.need = 0;
							} else {
								r.push(`${slave.slaveName} is <span class="devotion inc">quite willing to be bred</span> by your Stud and`);
								if (StudRandiness === 1) {
									r.push(`submissively takes ${his2} cock bareback`);
								} else {
									if (slave.fetish === Fetish.SADIST || slave.fetish === Fetish.DOM) {
										r.push(`takes ${his2} dick by force`);
									} else {
										r.push(`dominantly rides ${his2} cock raw`);
									}
								}
								r.push(`until <span class="pregnant">conception</span> is verified.`);
								slave.devotion += 1;
								slave.need -= 30;
							}
						}
						StudPenetrative = 1;
						StudTakesV = 1;
					} else if (canAchieveErection(Stud)) {
						if (slave.career === "a dairy cow" && slave.devotion <= 20) {
							r.push(`${slave.slaveName} feels a need to be bred by your Stud, but try as ${he} might, just can't fit ${his2} massive dick inside ${his} ${pussy}. Having to take just the tip until ${he} <span class="pregnant">conceives</span> <span class="devotion dec">isn't satisfying</span> to the ex-dairy cow.`);
							slave.devotion -= 1;
							StudPenetrative = 1;
							StudTakesV = 1;
						} else if (slave.devotion <= 20 && slave.trust >= -20) {
							if (StudRandiness === 1) {
								r.push(`${slave.slaveName} tries to resist ${him2}, so ${Stud.slaveName} just <span class="devotion dec">rapes the poor ${girl}</span> pregnant, regularly ejaculating inside ${him} until <span class="pregnant">conception</span> is confirmed.`);
								slave.devotion -= 4;
								rapeAddsFlaw = 1;
								StudPenetrative = 1;
								StudTakesV = 1;
							} else {
								r.push(`${slave.slaveName} finds ${Stud.slaveName} is in a similar situation as ${he} is, so ${he} tries to make it as <span class="trust inc">mutually enjoyable as possible,</span> despite the awkwardness involved, while trying ${his} best to overlook that ${Stud.slaveName} is being forced to <span class="pregnant">impregnate ${him}.</span>`);
								slave.trust += 4;
								slave.need = 0;
								StudPenetrative = 1;
							}
						} else if (slave.devotion <= 20) {
							if (StudRandiness === 1) {
								r.push(`${slave.slaveName}, though fearfully obedient, is not happy with being bred, so ${Stud.slaveName} is forced to <span class="devotion dec">rape the poor ${girl}</span> pregnant, regularly squirting cum into ${his} ${pussy} until <span class="pregnant">conception</span> is confirmed.`);
								slave.devotion -= 4;
							} else {
								r.push(`${slave.slaveName} finds that ${Stud.slaveName} is less than enthusiastic about fucking ${him}, <span class="devotion dec">making the resulting rape extra unpleasant</span> when ${he2} <span class="pregnant">forces a baby into ${him}.</span>`);
								slave.devotion -= 6;
							}
						} else if (slave.devotion <= 75) {
							if (slave.fetish === Fetish.PREGNANCY && slave.fetishKnown === 1 && slave.fetishStrength > 60) {
								r.push(`${slave.slaveName}, a pregnancy fetishist, is <span class="devotion inc">very willing to be bred</span> by your Stud, and eagerly`);
								if (StudRandiness === 1) {
									r.push(`takes ${his2} tip`);
								} else {
									r.push(`rides ${his2} tip`);
								}
								r.push(`until <span class="pregnant">conception</span> is verified.`);
								slave.devotion += 2;
								satisfiedPregFetish = 1;
								slave.need = 0;
								StudPenetrative = 1;
								StudTakesV = 1;
							} else {
								r.push(`${slave.slaveName} is willing to be bred by your Stud, and`);
								if (StudRandiness === 1) {
									r.push(`takes as much of ${his2} cock bareback as ${he} can`);
									slave.need -= 20;
									StudPenetrative = 1;
									StudTakesV = 1;
								} else {
									if (slave.fetish === Fetish.SADIST || slave.fetish === Fetish.DOM) {
										r.push(`nearly hurts ${himself} trying to fit the monster in ${his}`);
										if (slave.mpreg === 1) {
											r.push(`ass,`);
										} else {
											r.push(`pussy,`);
										}
										r.push(`but manages to take spurts`);
										slave.need -= 10;
									} else {
										r.push(`pumps loads of ${his2} cum into ${his} ${pussy}`);
									}
								}
								r.push(`until <span class="pregnant">conception</span> is verified.`);
							}
						} else {
							if (slave.fetish === Fetish.PREGNANCY && slave.fetishKnown === 1 && slave.fetishStrength > 60) {
								r.push(`${slave.slaveName}, a pregnancy fetishist, considers getting bred by your Stud <span class="devotion inc">a dream come true,</span>`);
								if (StudRandiness === 1) {
									r.push(`and allows ${him2} to have ${his2} way with ${him}`);
								} else {
									r.push(`and rides ${his2} oversized dick`);
								}
								r.push(`daily until <span class="pregnant">conception</span> is verified.`);
								slave.devotion += 2;
								satisfiedPregFetish = 1;
								slave.need = 0;
								StudPenetrative = 1;
								StudTakesV = 1;
							} else {
								r.push(`${slave.slaveName} is <span class="devotion inc">quite willing to be bred</span> by your Stud and`);
								if (StudRandiness === 1) {
									r.push(`submissively takes the tip of ${his2} cock`);
									StudPenetrative = 1;
									StudTakesV = 1;
								} else {
									if (slave.fetish === Fetish.SADIST || slave.fetish === Fetish.DOM) {
										r.push(`forcibly extracts cum from ${his2} massive cock`);
									} else {
										r.push(`dominantly milks ${his2} massive cock`);
									}
								}
								r.push(`until <span class="pregnant">conception</span> is verified.`);
								slave.devotion += 1;
								slave.need -= 20;
							}
						}
					} else {
						if (slave.career === "a dairy cow" && slave.devotion <= 20) {
							r.push(`${slave.slaveName} feels a need to be bred by your Stud, but try as ${he} might, just can't get ${him2} hard. Being forced to milk ${him2} and inject ${his2} seed into ${himself} until ${he} <span class="pregnant">conceives</span> <span class="devotion dec">disappoints</span> the ex-dairy cow.`);
							slave.devotion -= 1;
						} else if (slave.devotion <= 20 && slave.trust >= -20) {
							r.push(`${slave.slaveName} finds ${Stud.slaveName} is in a similar situation as ${he} is, so the two of them work together to make the process <span class="trust inc">as painless as possible,</span> given that ${he} is <span class="pregnant">coming out of this pregnant,</span> one way or the other.`);
							slave.trust += 4;
							Stud.trust += 4;
						} else if (slave.devotion <= 20) {
							r.push(`${Stud.slaveName} shows mercy to the pitiable ${slave.slaveName}, <span class="devotion dec">building upon their mutual dislike of you.</span> ${He2} still has to <span class="pregnant">force ${him} to bear ${his2} child,</span> however.`);
							slave.devotion -= 4;
							Stud.devotion -= 4;
						} else if (slave.devotion <= 75) {
							if (slave.fetish === Fetish.PREGNANCY && slave.fetishKnown === 1 && slave.fetishStrength > 60) {
								r.push(`${slave.slaveName}, a pregnancy fetishist, is <span class="devotion inc">very willing</span> to milk ${him2} and inject ${his} harvest deep into ${his} ${pussy} until ${he} <span class="pregnant">conceives.</span>`);
								slave.devotion += 1;
								satisfiedPregFetish = 1;
							} else {
								r.push(`${slave.slaveName} is willing to carry your Stud's child and milks loads into ${his} ${pussy} until ${he} <span class="pregnant">conceives.</span>`);
							}
						} else {
							if (slave.fetish === Fetish.PREGNANCY && slave.fetishKnown === 1 && slave.fetishStrength > 60) {
								r.push(`${slave.slaveName}, a pregnancy fetishist, <span class="devotion inc">eagerly</span> milks cumshot after cumshot into ${his} hungry ${pussy} throughout the week, <span class="pregnant">guaranteeing conception.</span>`);
								slave.devotion += 1;
								satisfiedPregFetish = 1;
							} else {
								r.push(`${slave.slaveName} is <span class="devotion inc">quite willing</span> to carry your Stud's child and dutifully milks loads from ${him2} until <span class="pregnant">conception</span> is verified.`);
								slave.devotion += 1;
							}
						}
					}
				} else {
					slave.need -= 30;
				}
				if (satisfiedPregFetish) {
					if (slave.fetishStrength <= 95) {
						r.push(`Such total satisfaction of ${his} pregnancy fantasies <span class="fetish inc">strengthens ${his} fetish.</span>`);
						slave.fetishStrength += 4;
					}
				}
				if (rapeAddsFlaw) {
					addRapeFlaw(slave);
				}
				App.EndWeek.saVars.StudCum -= 1;
				knockMeUp(slave, 100, 2, V.StudID);
				if (StudPenetrative) {
					seX(slave, "anal", Stud, "penetrative", 10);
					seX(slave, "vaginal", Stud, "penetrative", 10);
					if (StudTakesV) { // Stud may not actually take virginity
						if (slave.mpreg === 1) {
							if (slave.anus === 0) {
								r.push(`${Stud.slaveName} <span class="virginity loss">took ${slave.slaveName}'s virginity</span> during the affair.`);
								slave.anus++;
							}
						} else {
							if (slave.vagina === 0) {
								r.push(`${Stud.slaveName} <span class="virginity loss">took ${slave.slaveName}'s virginity</span> during the affair.`);
								slave.vagina++;
							}
						}
					}
				}
				if (StudVaginal) {
					seX(Stud, "vaginal", slave, slave.mpreg === 1 ? "anal" : "vaginal", 10);
				}
			}
		} else if (V.universalRulesImpregnation === "Slaves" && slave.preg === 0 && slave.inseminationExclude !== 1 && ((![Job.CONCUBINE, Job.MASTERSUITE, Job.FUCKTOY].includes(slave.assignment) && slave.relationship !== -3 ) || V.universalHGImpregnateMasterSuiteToggle === 1)) {
			const potentialSlaveFathers = V.slaves.filter(s => s.ID !== slave.ID && canBreed(slave, s) && ![Job.AGENT, Job.AGENTPARTNER].includes(s.assignment));
			if (potentialSlaveFathers.length === 0) {
				r.push(`${slave.slaveName} is ripe for breeding, but you have no other slaves to harvest sperm from to use on ${him}.`);
			} else {
				r.push(`${slave.slaveName} is ripe for breeding, so you have your chattel milked of their sperm to inseminate ${his} fertile`);
				if (slave.mpreg === 1) {
					r.push(`ass`);
				} else {
					r.push(`cunt`);
				}
				r.push(`with.`);
				if (slave.fuckdoll === 0 && slave.fetish !== Fetish.MINDBROKEN) {
					if (slave.devotion <= 20 && slave.trust >= -20) {
						r.push(`${He} attempts to resist this treatment, and spends most of ${his} days bound securely with ${his}`);
						if (slave.mpreg === 1) {
							r.push(`anus`);
						} else {
							r.push(`pussy`);
						}
						r.push(`up in the air so semen can be funneled into it. This regimen fills ${him} with <span class="devotion dec">hatred,</span> and <span class="trust dec">fear,</span> as ${he} feels it seep into ${his} womb.`);
						slave.devotion -= 5;
						slave.trust -= 5;
					} else if (slave.devotion <= 20) {
						r.push(`${He} shudders with fear as ${he} feels the plunger unload your collective seed into ${his} womb.`);
					} else if (slave.fetish === Fetish.PREGNANCY && slave.fetishStrength > 60) {
						r.push(`${He} is <span class="devotion inc">absurdly pleased</span> by this treatment, <span class="trust inc">trustingly</span> serving as your cum repository until ${he}'s taken every last drop. ${He}'s so aroused by the constant insemination that just feeling the plunger enter ${him} is often enough to bring ${him} to orgasm.`);
						slave.devotion += 5;
						slave.trust += 5;
						if (slave.fetishKnown === 1 && slave.fetishStrength <= 95) {
							r.push(`Such total satisfaction of ${his} pregnancy fantasies <span class="fetish inc">strengthens ${his} fetish.</span>`);
							slave.fetishStrength += 4;
						} else if (slave.fetishKnown === 0) {
							r.push(`You are now well aware of ${his} <span class="fetish gain">latent pregnancy fetish.</span>`);
							slave.fetishKnown = 1;
						}
						slave.need = 0;
					} else {
						r.push(`${He} serves you dutifully in this, <span class="trust inc">trustingly</span> accepting your collective seed into ${his} womb.`);
						slave.trust += 5;
					}
				}
				if (potentialSlaveFathers.length > 1) {
					r.push(`You have no way of knowing which slave ${he} <span class="pregnant">conceives</span> from, so it's a mystery until the father can be verified.`);
				} else {
					r.push(`You have a fairly safe idea of which slave ${he} <span class="pregnant">conceived</span> from, given there was only one donor.`);
				}
			}
			const score = (/** @type {App.Entity.SlaveState} */s) => {
				let weight = 1;
				if (s.geneMods.aggressiveSperm === 1) {
					weight *= 20;
				}
				if (s.geneticQuirks.potent === 2) {
					weight *= 5;
				}
				return weight;
			};
			const dadHash = potentialSlaveFathers.reduce((acc, cur, i) => Object.assign(acc, {[i]: score(cur)}), {});
			const rouletteWinner = hashChoice(dadHash);
			if (rouletteWinner) {
				knockMeUp(slave, 100, 2, eligibleSlaves[rouletteWinner]);
			}
		} else if (V.universalRulesImpregnation === "Citizens" && slave.eggType === "human" && slave.preg === 0 && slave.inseminationExclude !== 1 && ((![Job.CONCUBINE, Job.MASTERSUITE, Job.FUCKTOY].includes(slave.assignment) && slave.relationship !== -3) || V.universalHGImpregnateMasterSuiteToggle === 1)) {
			r.push(`${slave.slaveName} is ready to bear a child for the arcology, so ${he} is`);
			if (slave.fuckdoll > 0) {
				r.push(`positioned on a cot in the square outside the penthouse for citizens to fuck ${his} fertile`);
				if (slave.mpreg === 1) {
					r.push(`rear`);
				} else {
					r.push(`pussy`);
				}
				r.push(`until ${his} suit alerts you that that ${he} has likely <span class="pregnant">conceived.</span>`);
			} else if (slave.fetish === Fetish.MINDBROKEN) {
				r.push(`positioned on a cot in the square outside the penthouse for citizens to fuck ${his} fertile`);
				if (slave.mpreg === 1) {
					r.push(`rear`);
				} else {
					r.push(`pussy`);
				}
				r.push(`until ${he} is <span class="pregnant">thoroughly bred.</span>`);
			} else if (slave.devotion <= 20 && slave.trust >= -20) {
				r.push(`chained out in the square for citizens to avail themselves to ${his} fertile`);
				if (slave.mpreg === 1) {
					r.push(`anus.`);
				} else {
					r.push(`pussy.`);
				}
				r.push(`Being reduced to a public cumdump fills ${him} with <span class="devotion dec">hatred,</span> and <span class="trust dec">fear,</span> and <span class="pregnant">pregnant</span> with some unknown man's spawn.`);
				slave.devotion -= 7;
				slave.trust -= 7;
			} else if (slave.devotion <= 20) {
				r.push(`shackled out in the square for citizens to avail themselves to ${his} fertile`);
				if (slave.mpreg === 1) {
					r.push(`anus.`);
				} else {
					r.push(`pussy.`);
				}
				r.push(`${He} complies out of fear, allowing man after man to cum inside ${him} until <span class="pregnant">pregnancy is assured.</span`);
			} else if (slave.fetish === Fetish.PREGNANCY && slave.fetishStrength > 60) {
				r.push(`<span class="trust inc">permitted</span> outside the penthouse to <span class="devotion inc">gleefully</span> offer ${his} fertile`);
				if (slave.mpreg === 1) {
					r.push(`rear`);
				} else {
					r.push(`pussy`);
				}
				r.push(`to passersby until ${he} feels ${he} is thoroughly <span class="pregnant">impregnated.</span> ${He}'s so aroused by the erection selection that ${he} often climaxes just by being penetrated.`);
				slave.devotion += 5;
				slave.trust += 5;
				if (slave.fetishKnown === 1 && slave.fetishStrength <= 95) {
					r.push(`Such total satisfaction of ${his} pregnancy fantasies <span class="fetish inc">strengthens ${his} fetish.</span>`);
					slave.fetishStrength += 4;
				} else if (slave.fetishKnown === 0) {
					r.push(`You are now well aware of ${his} <span class="fetish gain">latent pregnancy fetish.</span>`);
					slave.fetishKnown = 1;
				}
				if (slave.mpreg === 1) {
					seX(slave, "anal", "public", "penetrative", 5);
				} else {
					seX(slave, "vaginal", "public", "penetrative", 5);
				}
				slave.need = 0;
			} else if ([Job.CONCUBINE, Job.MASTERSUITE, Job.FUCKTOY].includes(slave.assignment) || slave.relationship === -3) {
				r.push(`ordered to leave the penthouse and offer ${his} fertile`);
				if (slave.mpreg === 1) {
					r.push(`rear`);
				} else {
					r.push(`pussy`);
				}
				r.push(`to citizens until ${he} has taken enough dicks to <span class="pregnant">conceive.</span>`);
				if (!isVirile(V.PC)) {
					r.push(`${He} carries out the task respectfully, even if it feels a <span class="trust dec">little wrong.</span>`);
					slave.trust -= 2;
				} else {
					r.push(`${He} carries out the task reluctantly, <span class="trust dec">fearful</span> that you are losing interest in ${him}.`);
					slave.trust -= 7;
				}
			} else {
				r.push(`allowed to leave the penthouse to offer ${his} fertile`);
				if (slave.mpreg === 1) {
					r.push(`rear`);
				} else {
					r.push(`pussy`);
				}
				r.push(`to citizens until ${he} has taken enough dicks to <span class="pregnant">conceive.</span>`);
				if (!isVirile(V.PC)) {
					r.push(`${He} carries out the task dutifully, <span class="trust inc">trusting</span> your judgement in this matter.`);
					slave.trust += 5;
				} else {
					r.push(`${He} carries out the task dutifully, but can't help <span class="devotion dec">question</span> why you aren't doing this yourself.`);
					slave.devotion -= 5;
				}
			}
			if (FutureSocieties.isActive('FSRestart')) {
				if (slave.breedingMark === 1) {
					r.push(`The Societal Elite <span class="reputation inc">appreciate the offering</span> and take it upon themselves to make sure ${his} child is a worthy one.`);
					repX(V.FSSingleSlaveRep, "publicBreeding", slave);
				} else {
					r.push(`Society finds this <span class="reputation dec">horribly distasteful,</span> yet they still choose to use ${him}.`);
					repX(V.FSSingleSlaveRep * -2, "publicBreeding", slave);
					if (V.eugenicsFullControl !== 1) {
						r.push(`The Societal Elite <span class="warning">judge you harshly</span> for this public display of wanton reproduction.`);
						V.failedElite += 5;
					} else {
						r.push(`The remaining Societal Elite turn a blind eye to your actions, hoping to avoid further ire.`);
					}
				}
			} else if ([Job.CONCUBINE, Job.MASTERSUITE, Job.FUCKTOY].includes(slave.assignment) || slave.relationship === -3) {
				if (FutureSocieties.isActive('FSPaternalist') && slave.relationship === -3) {
					r.push(`Society finds putting your wife through this <span class="reputation dec">horribly distasteful,</span> yet some still decide to discard their scruples and use ${him} anyway.`);
					repX(V.FSSingleSlaveRep * -2, "publicBreeding", slave);
				} else {
					r.push(`The people are <span class="reputation inc">thrilled</span> to have access to your most personal slaves.`);
					repX(V.FSSingleSlaveRep * 2, "publicBreeding", slave);
				}
			}
			if (slave.mpreg === 1) {
				seX(slave, "anal", "public", "penetrative", 15);
			} else {
				seX(slave, "vaginal", "public", "penetrative", 15);
			}
			if (FutureSocieties.isActive('FSRestart') && slave.breedingMark === 1) {
				knockMeUp(slave, 100, 2, -6);
			} else {
				knockMeUp(slave, 100, 2, -2);
			}
		} else if (conceptionSeed > (50 - (V.reproductionFormula * 10))) {
			switch (slave.assignment) {
				case Job.REST:
				case Job.CONFINEMENT:
				case Job.CELLBLOCK:
					/* these assignments are safe from random impregnation */
					break;
				case Job.CONCUBINE:
					if (slave.fuckdoll === 0 && slave.fetish !== Fetish.MINDBROKEN && canImpreg(slave, V.PC)) {
						if (slave.pregKnown === 0) {
							r.push(`As your concubine, ${he} takes care to only share ${his} fertile`);
							if (slave.mpreg === 1) {
								r.push(`ass`);
							} else {
								r.push(`pussy`);
							}
							r.push(`with you. ${His} efforts paid off; <span class="pregnant">${he} has become pregnant with your child.</span>`);
						}
						knockMeUp(slave, 100, 2, -1);
					}
					break;
				case Job.MASTERSUITE:
					if (pcCanKnockUpSlave(slave)) {
						pcDoKnockUpSlave(slave);
					} else { // look for a random father among master suite slaves
						const msSlaves = V.slaves.filter((s) => s.assignment === Job.MASTERSUITE).shuffle();
						for (const msSlave of msSlaves) {
							if (canImpreg(slave, msSlave) && App.Utils.sexAllowed(slave, msSlave)) {
								/* catch for self-impregnation */
								if (slave.ID === msSlave.ID) {
									if (conceptionSeed <= 95) {
										continue; /* 95% chance not to self-impregnate */
									}
								}
								/* found eligible father */
								if (slave.pregKnown === 0) {
									r.push(`After all the unprotected sex ${he} had this week, it's really no surprise when <span class="pregnant">${he} ends up pregnant.</span>`);
								}
								knockMeUp(slave, 100, 2, msSlave.ID);
								break;
							}
						}
					}
					break;
				case Job.FUCKTOY:
					if (pcCanKnockUpSlave(slave)) {
						pcDoKnockUpSlave(slave);
					}
					break;
				case Job.CLUB:
				case Job.PUBLIC:
				case Job.WHORE:
				case Job.BROTHEL:
					if (slave.eggType === "human") {
						if (slave.pregKnown === 0) {
							r.push(`Due to all the citizens cumming in ${his} fertile`);
							if (slave.mpreg === 1) {
								r.push(`ass,`);
							} else {
								r.push(`pussy,`);
							}
							r.push(`<span class="pregnant">${he} has become pregnant.</span>`);
						}
						knockMeUp(slave, 100, 2, -2);
					}
					break;
				case Job.GLORYHOLE:
				case Job.ARCADE:
					if (slave.eggType === "human") {
						if (slave.pregKnown === 0) {
							r.push(`Due to all the customers cumming in ${his} fertile, restrained`);
							if (slave.mpreg === 1) {
								r.push(`ass,`);
							} else {
								r.push(`pussy,`);
							}
							r.push(`<span class="pregnant">${he} has become pregnant.</span>`);
						}
						knockMeUp(slave, 100, 2, -2);
					}
					break;
				default: /* random impregnation chance on other assignments - consider relationships first */
					if (App.Utils.hasNonassignmentSex(slave) || slave.devotion <= 50) {
						let pregSource = 0;
						if (conceptionSeed > 80 && ((slave.counter.vaginal > 0) || (slave.counter.anal > 0 && slave.mpreg > 0))) { /* TODO: compare to previous week totals? */
							const tempLover = slave.relationship > 2 ? getSlave(slave.relationshipTarget) : null;
							const tempRival = slave.rivalry > 2 ? getSlave(slave.rivalryTarget) : null;
							const tempSub = slave.assignment === Job.SUBORDINATE && slave.subTarget > 0 ? getSlave(slave.subTarget) : null;
							if (((slave.relationship === -3) || (slave.relationship === -2)) && canImpreg(slave, V.PC) && App.Utils.sexAllowed(slave, V.PC)) {
								pregSource = -1;
							} else if (tempLover && canImpreg(slave, tempLover)) { /* erection not needed for impregnation via consensual sex play (FWB or better) */
								if (App.Utils.sexAllowed(slave, tempLover)) {
									pregSource = tempLover.ID;
								} else if (disobedience(slave) + disobedience(tempLover) + 5 > random(0, 100)) { /* note higher than normal disobedience chance...telling lovers they can't play is just asking for trouble */
									r.push(`Although sexual contact between them is forbidden, ${slave.slaveName} and ${his} ${relationshipTerm(slave)} ${tempLover.slaveName} took a risk and <span class="trust dec">flouted the rules.</span>`);
									slave.trust -= 5;
									tempLover.trust -= 5;
									pregSource = tempLover.ID;
								}
							} else if (tempSub && canAchieveErection(tempSub) && canImpreg(slave, tempSub)) { /* subordinate must have erection to impregnate target */
								pregSource = tempSub.ID;
							} else if (random(1, 100) > 95 && tempRival && canAchieveErection(tempRival) && canImpreg(slave, tempRival)) { /* 5% chance to be raped and knocked up by bitter rival - erection needed */
								if (App.Utils.sexAllowed(slave, tempRival)) {
									r.push(`Driven by the bitter rivalry between them, ${tempRival.slaveName} successfully manages to overpower ${slave.slaveName} and rape ${him}, cumming deep in ${his} fertile`);
									if (slave.mpreg === 1) {
										r.push(`ass.`);
									} else {
										r.push(`pussy.`);
									}
									r.push(`By the end of the week, ${slave.slaveName} is vowing revenge as ${he} regains confidence.`);
									pregSource = tempRival.ID;
								} else if (disobedience(tempRival) > random(0, 100)) {
									r.push(`Driven by the bitter rivalry between them, ${tempRival.slaveName} <span class="trust dec">breaks the rules,</span> successfully overpowering ${slave.slaveName} and raping ${him}, cumming deep in ${his} fertile`);
									if (slave.mpreg === 1) {
										r.push(`ass.`);
									} else {
										r.push(`pussy.`);
									}
									slave.trust -= 5;
									pregSource = tempRival.ID;
								}
							} else if (random(1, 100) > 60 && (canImpreg(slave, V.PC) || canFemImpreg(slave, V.PC)) && App.Utils.sexAllowed(slave, V.PC)) { /* still 40% chance of impregnation by PC */
								pregSource = -1;
							} else if (random(1, 100) > 95 && slave.eggType === "human" && slave.trust > 20 && slave.relationship.isBetween(-2, 4) && (slave.devotion <= 20 || slave.energy > 95)) { // 5% chance of impregnation by random citizen in defiant and nymphomaniac slaves.
								pregSource = -2;
							} else {
								const potentialFathers = V.slaves.filter(s => canImpreg(slave, s)).shuffle();
								const motherDisobeys = disobedience(slave) > random(0, 100);
								for (const father of potentialFathers) {
									if (father.ID === slave.ID) { /* self-impregnation check */
										if (conceptionSeed <= 5) { /* 95% chance not to self-impregnate */
											pregSource = slave.ID;
											break;
										}
									} else if (App.Utils.sexAllowed(slave, father)) {
										pregSource = father.ID; /* this is an eligible father */
										break;
									} else if (motherDisobeys && (V.universalRulesConsent === 0 || disobedience(father) > random(0, 50))) {
										r.push(`Although sexual contact between them is forbidden, ${slave.slaveName} <span class="trust dec">breaks the rules</span> by`);
										if (V.universalRulesConsent === 0) {
											r.push(`compelling`);
										} else {
											r.push(`convincing`);
										}
										r.push(`${father.slaveName} to fuck ${him}.`);
										slave.trust -= 5;
										pregSource = father.ID;
										break;
									}
								}
							}
						}
						if (pregSource !== 0 && slave.eggType === "human") {
							if (slave.pregKnown === 0) {
								r.push(`A quick scan after a bout of morning nausea reveals that <span class="pregnant">${he} has become pregnant.</span>`);
							}
							knockMeUp(slave, 100, 2, pregSource);
						}
					} /* closes random chance and non-zero sex acts check */
					if (canGetPregnant(slave) && canWalk(slave) && isSlaveAvailable(slave) && (V.personalAttention.task !== PersonalAttention.MAID || onBedRest(V.PC))) {
						// Sperm mod leavings around the penthouse. Gives servants more of a point too.
						let slobs = V.slaves.filter(s => canFemImpreg(slave, s) && isSlaveAvailable(s) && s.geneMods.aggressiveSperm === 1 && (s.fetish === Fetish.MINDBROKEN || s.energy > 95 || (s.devotion < -20 && s.trust > 20) || (s.intelligence + s.intelligenceImplant < -10)));
						if (slobs.length > (totalServantCapacity() / 5)) {
							tryKnockMeUp(slave, -50, 2, slobs.random());
						}
					}
			} /* closes assignment checks */
		} /* closes all impregnation checks */
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function autoImpregnation(slave) {
		knockMeUp(slave, 100, 2, slave.ID);
		if (slave.geneticQuirks.superfetation === 2 && slave.pregKnown === 1) {
			if (V.geneticMappingUpgrade === 0) {
				r.push(`${He} experiences frequent spontaneous orgasms from ${his} asexual reproduction modification despite already being pregnant.`);
			} else {
				r.push(`Since ${he} is fertile and pregnant, the frequent orgasms caused by ${his} asexual reproduction modifications eventually force <span class="pregnant">another child into ${his} increasingly crowded womb.</span>`);
			}
		} else {
			r.push(`Since ${he} is fertile and still not pregnant, the frequent orgasms caused by ${his} asexual reproduction modifications eventually leave ${him} <span class="pregnant">pregnant with ${his} own child.</span>`);
			slave.pregKnown = 1;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function pregnancySanityCheck(slave) { // PREGNANCY TYPE SANITY CHECK (not for pregnancies started above)
		if (slave.preg <= 0) {
			if (slave.pregType !== 0) {
				WombFlush(slave);
			}
		} else if (slave.preg > 0 && slave.pregType === 0) {
			slave.pregType = setPregType(slave);
			WombImpregnate(slave, slave.pregType, slave.pregSource, 1);
		}
		if (slave.readyOva !== 0) {
			slave.readyOva = 0;
		}
	}
};
