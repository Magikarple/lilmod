/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.SlaveAssignment.inflation = function saInflation(slave) {
	/** @type {string[]} */
	const r = [];

	const gigantomastiaMod = slave.geneticQuirks.gigantomastia === 2 ? (slave.geneticQuirks.macromastia === 2 ? 3 : 2) : 1;
	const rearLipedemaMod = slave.geneticQuirks.rearLipedema === 2 ? 2 : 0;
	const rearLipedemaDivider = rearLipedemaMod === 0 ? 1 : rearLipedemaMod;
	const dairyL = App.Entity.facilities.dairy.employeesIDs().size;

	let cow;
	if (slave.inflationMethod === 3) {
		cow = slave.inflationType === InflationLiquid.MILK ? getSlave(slave.milkSource) : getSlave(slave.cumSource);
	}

	const {
		he, him, his, himself, He, His,
	} = getPronouns(slave);

	inflationCancellation(slave);
	if (slave.inflation > 0) {
		fillUp(slave);
	}
	if (slave.fetish !== Fetish.MINDBROKEN && slave.fuckdoll === 0) {
		mentalEffects(slave);
	}
	if (slave.inflationType === InflationLiquid.MILK || slave.inflationType === InflationLiquid.FOOD) {
		foodMeansFat(slave);
	}
	if (slave.cervixImplant >= 2) {
		cervixImplantFluidConversion(slave);
	}

	return r.join(" ");

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function inflationCancellation(slave) {
		if (slave.assignment === Job.ARCADE || slave.assignment === Job.DAIRY) {
			deflate(slave);
		} else if (slave.inflationType === InflationLiquid.MILK && (slave.inflationMethod === 1 || slave.inflationMethod === 2) && (dairyL === 0 || V.dairy === 0) && V.arcologies[0].FSPastoralistLaw !== 1 && (slave.assignment !== Job.CELLBLOCK || V.cellblockDecoration !== "Pastoralist")) {
			r.push(`You no longer have a functional dairy. <span class="yellow">${His} inflation regimen has been ended.</span>`);
			deflate(slave);
		} else if (slave.inflationType === InflationLiquid.MILK && slave.inflationMethod === 3 && cow.lactation === 0) {
			r.push(`${cow.slaveName} is no longer lactating and thus can no longer keep ${slave.slaveName} filled with milk. <span class="yellow">${His} inflation regimen has been ended.</span>`);
			deflate(slave);
		} else if (slave.inflationType === InflationLiquid.CUM && (slave.inflationMethod === 1 || slave.inflationMethod === 2) && (dairyL === 0 || cumSlaves().length === 0 || V.dairy === 0) && V.arcologies[0].FSPastoralistLaw !== 1) {
			r.push(`You no longer have a functional cum dairy. <span class="yellow">${His} inflation regimen has been ended.</span>`);
			deflate(slave);
		} else if (slave.inflationType === InflationLiquid.CUM && slave.inflationMethod === 3 && cow.balls === 0) {
			r.push(`${cow.slaveName} no longer has testicles and thus can no longer keep ${slave.slaveName} filled with cum. <span class="yellow">${His} inflation regimen has been ended.</span>`);
			deflate(slave);
		} else if (slave.bellyImplant >= 1500) {
			if (slave.inflation > 1) {
				r.push(`Due to the mounting pressure from ${his} filled abdominal implant, ${he} can no longer fill ${himself} as large as ${he} used to.`);
				slave.inflation = 1;
				SetBellySize(slave);
			} else {
				slave.bellyFluid = 2000;
				SetBellySize(slave);
			}
		} else if (slave.bellyPreg >= 1500) {
			if (slave.inflation > 1) {
				r.push(`Due to the mounting pressure from ${his} growing pregnancy, ${he} can no longer fill ${himself} as large as ${he} used to.`);
				slave.inflation = 1;
				SetBellySize(slave);
			} else {
				slave.bellyFluid = 2000;
				SetBellySize(slave);
			}
		} else if ((slave.inflationType === InflationLiquid.MILK || slave.inflationType === InflationLiquid.CUM) && slave.inflationMethod === 3) {
			const harvest = (slave.inflationType === InflationLiquid.MILK) ? Math.trunc(milkAmount(cow) / 14) : Math.trunc(cumAmount(cow) / 70);
			if (slave.inflation === 3 && harvest < 8) {
				r.push(`${cow.slaveName} is having trouble producing the requested amount of ${slave.inflationType}`);
				if (harvest < 2) {
					r.push(`needed to even fill ${him}. <span class="yellow">${His} inflation regimen has been ended.</span>`);
				} else if (harvest < 4) {
					r.push(`so ${his} serving has been reduced to a mere two liters.`);
				} else {
					r.push(`so ${his} serving has been reduced to four liters.`);
				}
			} else if (slave.inflation === 2 && harvest < 4) {
				if (harvest < 2) {
					r.push(`needed to even fill ${him}. <span class="yellow">${His} inflation regimen has been ended.</span>`);
				} else {
					r.push(`so ${his} serving has been reduced to two liters.`);
				}
			} else if (slave.inflation === 1 && harvest < 2) {
				r.push(`and can't even give ${him} a simple meal. <span class="yellow">${His} inflation regimen has been ended.</span>`);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function gluttonousReaction(slave) {
		if (slave.inflationMethod === 1 || slave.inflationMethod === 3) {
			if (slave.inflation === 3) {
				r.push(`full belly <span class="mediumaquamarine">contently,</span> anticipating ${his} next gorging.`);
				slave.devotion += 5;
				slave.trust += 5;
			} else if (slave.inflation === 2) {
				r.push(`taut belly <span class="mediumaquamarine">contently,</span> anticipating ${his} next feeding.`);
				slave.devotion += 4;
				slave.trust += 4;
			} else if (slave.inflation === 1) {
				r.push(`sloshing belly <span class="mediumaquamarine">contently,</span> anticipating ${his} next meal.`);
				slave.devotion += 3;
				slave.trust += 3;
			}
		} else {
			if (slave.inflation === 3) {
				r.push(`taut`);
				slave.devotion += 4;
				slave.trust += 4;
			} else if (slave.inflation === 2) {
				r.push(`full`);
				slave.devotion += 3;
				slave.trust += 3;
			} else if (slave.inflation === 1) {
				r.push(`sloshing`);
				slave.devotion += 1;
				slave.trust += 1;
			}
			r.push(`belly <span class="mediumaquamarine">contently,</span> though ${he} wishes ${he} could have swallowed it instead.`);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function milkInflationMethod(slave) {
		if (slave.inflationMethod === 1) {
			r.push(`sucks from the dairy tap until ${his} stomach is`);
		} else if (slave.inflationMethod === 2) {
			r.push(`fills ${his} rectum from the dairy tap until ${his} stomach is`);
		} else if (slave.inflationMethod === 3) {
			r.push(`suckles from ${cow.slaveName} until ${his} stomach is`);
			cow.lactationDuration = 2;
			cow.boobs -= cow.boobsMilk;
			cow.boobsMilk = 0;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function cumInflationMethod(slave) {
		if (slave.inflationMethod === 1) {
			r.push(`sucks from the dairy tap until ${his} stomach is`);
		} else if (slave.inflationMethod === 2) {
			r.push(`fills ${his} rectum from the dairy tap until ${his} stomach is`);
		} else if (slave.inflationMethod === 3) {
			r.push(`sucks ${cow.slaveName}'s ${(cow.dick > 0) ? `cock` : `cum hole`} until ${his} stomach is`);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function anorexicBloatSize(slave) {
		if (slave.inflation === 3) {
			r.push(`<span class="health dec">painfully bloated</span> with nearly two gallons`);
			healthDamage(slave, 10);
			slave.devotion -= 8;
			slave.trust -= 8;
		} else if (slave.inflation === 2) {
			r.push(`bloated with nearly four liters`);
			slave.devotion -= 5;
			slave.trust -= 5;
		} else if (slave.inflation === 1) {
			r.push(`bloated with nearly two liters`);
			slave.devotion -= 3;
			slave.trust -= 3;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function milkOrCumSize(slave) {
		if (slave.inflation === 3) {
			r.push(`${He} keeps ${himself} <span class="health dec">painfully full</span> for you.`);
			healthDamage(slave, 10);
		} else if (slave.inflation === 2) {
			r.push(`${He} is full enough to be distended but not enough to grow taut.`);
		} else if (slave.inflation === 1) {
			r.push(`${He} is full enough to be swollen but not enough to visibly jiggle.`);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function fillUp(slave) {
		let distensionTerm;
		if (slave.inflation === 3) {
			distensionTerm = `leaving ${him} looking ready to burst`;
		} else if (slave.inflation === 2) {
			distensionTerm = `leaving ${him} looking pregnant`;
		} else {
			distensionTerm = `leaving ${his} belly noticeably distended`;
		}

		switch (slave.inflationType) {
			case InflationLiquid.WATER:
				r.push(`${He} makes sure to fill ${his} rear with nearly`);
				if (slave.inflation === 3) {
					r.push(`two gallons of water, ${distensionTerm}, whenever ${he} leaks or needs to release ${his} load. ${He} keeps ${himself} <span class="health dec">painfully full</span> for you.`);
					healthDamage(slave, 10);
				} else if (slave.inflation === 2) {
					r.push(`four liters of water, ${distensionTerm}, whenever ${he} leaks or needs to release ${his} load. ${He} is full enough to be distended but not enough to grow taut.`);
				} else if (slave.inflation === 1) {
					r.push(`two liters of water, ${distensionTerm}, whenever ${he} leaks or needs to release ${his} load. ${He} is full enough to be swollen but not enough to visibly jiggle.`);
				}
				break;

			case InflationLiquid.URINE:
				r.push(`${He} makes sure to fill ${his} rear with nearly`);
				if (slave.inflation === 3) {
					r.push(`two gallons of urine, ${distensionTerm}, whenever ${he} leaks or needs to release ${his} load. ${He} keeps ${himself} <span class="health dec">painfully full</span> for you.`);
					healthDamage(slave, 10);
				} else if (slave.inflation === 2) {
					r.push(`four liters of urine, ${distensionTerm}, whenever ${he} leaks or needs to release ${his} load. ${He} is full enough to be distended but not enough to grow taut.`);
				} else if (slave.inflation === 1) {
					r.push(`two liters of urine, ${distensionTerm}, whenever ${he} leaks or needs to release ${his} load. ${He} is full enough to be swollen but not enough to visibly jiggle.`);
				}
				break;

			case InflationLiquid.APHRO:
				r.push(`${He} makes sure to fill ${his} rear with nearly`);
				if (slave.inflation === 3) {
					r.push(`two gallons of an aphrodisiac solution, leaving ${him} looking ready to burst, whenever ${he} leaks or ${his} body absorbs too much. ${He} keeps ${himself} <span class="health dec">painfully full</span> for you, though ${he} barely notices it over ${his} horniness. While having ${his} body packed full of aphrodisiacs doesn't make ${him} additionally submissive, it does amplify the effects of them. ${His} aphrodisiac bursting belly`);
					healthDamage(slave, 10);
				} else if (slave.inflation === 2) {
					r.push(`four liters of an aphrodisiac solution, leaving ${him} looking pregnant, whenever ${he} leaks or ${his} body absorbs too much. ${He} is full enough to be distended but not enough to grow taut. While having ${his} body bloated with aphrodisiacs doesn't make ${him} additionally submissive, it does amplify the effects of them. ${His} overfilled aphrodisiac belly`);
				} else if (slave.inflation === 1) {
					r.push(`two liters of an aphrodisiac solution, leaving ${his} belly noticeably distended, whenever ${he} leaks or ${his} body absorbs too much. ${He} is full enough to be swollen but not enough to visibly jiggle. ${His} aphrodisiac-filled belly`);
				}
				if (slave.energy <= 95) {
					r.push(`<span class="libido inc">rapidly boosts ${his} sex drive.</span>`);
					slave.energy += 5 * slave.inflation;
				} else {
					r.push(`can't improve ${his} absurd sex drive.`);
				}
				if (slave.fuckdoll === 0 && slave.fetish !== Fetish.MINDBROKEN) {
					r.push(`Besides being humiliating, it chemically <span class="hotpink">increases ${his} acceptance</span> of sexual slavery.`);
					slave.devotion += 5;
				}
				if (V.arcologies[0].FSBodyPuristLaw === 0 && V.healthyDrugsUpgrade === 0) {
					r.push(`Such a high dosage held for so long <span class="health dec">isn't healthy.</span>`);
					healthDamage(slave, 5);
				}
				slave.chem += 2 * slave.inflation;
				if (slave.addict > 0) {
					slave.addict += slave.inflation * 3;
				} else if (jsRandom(1, 100) < 40 + (20 * slave.inflation)) {
					r.push(`All the aphrodisiacs held within ${his} bowels cause <span class="cyan">${him} to become an aphrodisiac addict.</span>`);
					slave.addict = 1;
				}
				break;

			case InflationLiquid.CURATIVE:
				r.push(`${He} makes sure to fill ${his} rear with nearly`);
				if (slave.inflation === 3) {
					r.push(`two gallons of a curative solution, leaving ${him} looking ready to burst, whenever ${he} leaks or ${his} body absorbs too much. ${He} keeps ${himself} full for you, the curatives in ${his} gut keeping ${him} healthy despite the pain.`);
					if ((slave.assignment === Job.REST || slave.assignment === Job.SPA) && slave.fetish !== Fetish.MINDBROKEN) {
						r.push(`The curative enema ${he}'s on synergize with rest, keeping ${him} asleep most of the time. This is an <span class="health inc">extremely effective health treatment,</span> though being filled to ${his} limit doesn't hasten ${his} recovery at all; it's just perverted.`);
						improveCondition(slave, 4);
					} else if (slave.health.condition < -20) {
						r.push(`<span class="health inc">${His} poor health rapidly improves</span> under the curative enema, though being filled to ${his} limit doesn't hasten ${his} recovery at all; it's just perverted.`);
						improveCondition(slave, 2);
					} else {
						r.push(`<span class="health inc">${His} health improves</span> under the curative enema, though being filled to ${his} limit doesn't hasten ${his} recovery at all; it's just perverted.`);
					}
					improveCondition(slave, 1);
				} else if (slave.inflation === 2) {
					r.push(`four liters of a curative solution, leaving ${him} looking pregnant, whenever ${he} leaks or ${his} body absorbs too much. ${He} is full enough to be distended but not enough to grow taut.`);
					if ((slave.assignment === Job.REST || slave.assignment === Job.SPA) && slave.fetish !== Fetish.MINDBROKEN) {
						r.push(`The curative enema ${he}'s on synergize with rest, keeping ${him} asleep most of the time. This is an <span class="health inc">extremely effective health treatment,</span> though being overfilled doesn't hasten ${his} recovery at all; it's just perverted.`);
						improveCondition(slave, 4);
					} else if (slave.health.condition < -20) {
						r.push(`<span class="health inc">${His} poor health rapidly improves</span> under the curative enema, though being overfilled doesn't hasten ${his} recovery at all; it's just perverted.`);
						improveCondition(slave, 2);
					} else {
						r.push(`<span class="health inc">${His} health improves</span> under curative enema, though being overfilled doesn't hasten ${his} recovery at all; it's just perverted.`);
					}
					improveCondition(slave, 6);
				} else if (slave.inflation === 1) {
					r.push(`two liters of a curative solution, leaving ${his} belly noticeably distended, whenever ${he} leaks or ${his} body absorbs too much. ${He} is full enough to be swollen but not enough to visibly jiggle.`);
					if ((slave.assignment === Job.REST || slave.assignment === Job.SPA) && slave.fetish !== Fetish.MINDBROKEN) {
						r.push(`The curative enema ${he}'s on synergize with rest, keeping ${him} asleep most of the time. This is an <span class="health inc">extremely effective health treatment.</span>`);
						improveCondition(slave, 4);
					} else if (slave.health.condition < -20) {
						r.push(`<span class="health inc">${His} poor health rapidly improves</span> under the curative enema.`);
						improveCondition(slave, 2);
					} else {
						r.push(`<span class="health inc">${His} health improves</span> under curative enema.`);
					}
					improveCondition(slave, 6);
				}
				if (slave.fuckdoll === 0 && slave.fetish !== Fetish.MINDBROKEN) {
					r.push(`${He} <span class="mediumaquamarine">trusts you more</span> for giving ${him} access to expensive modern medicine, even if it is really embarrassing to be seen with that belly.`);
					slave.trust += 1;
				}
				if (slave.health.condition >= 90) {
					r.push(`${He} is as healthy as ${he} can be. <span class="yellow">${His} curative enema regimen has been ended.</span>`);
					deflate(slave);
				}
				slave.chem += 2;
				break;

			case InflationLiquid.TIGHTEN:
				r.push(`${He} makes sure to fill ${his} rear with nearly`);
				if (slave.inflation === 3) {
					r.push(`two gallons of tightening solution, leaving ${him} looking ready to burst, whenever ${he} leaks or ${his} body absorbs too much. ${He} keeps ${himself} <span class="health dec">painfully full</span> for you.`);
					healthDamage(slave, 10);
				} else if (slave.inflation === 2) {
					r.push(`four liters of tightening solution, leaving ${him} looking pregnant, whenever ${he} leaks or ${his} body absorbs too much. ${He} is full enough to be distended but not enough to grow taut.`);
				} else if (slave.inflation === 1) {
					r.push(`two liters of tightening solution, leaving ${his} belly noticeably distended, whenever ${he} leaks or ${his} body absorbs too much. ${He} is full enough to be swollen but not enough to visibly jiggle.`);
				}
				if (slave.geneMods.rapidCellGrowth === 1) {
					r.push(`Unfortunately for ${him}, ${his} body shows no interest in tightening up after the elasticity treatment ${he} underwent.`);
				} else {
					let dupeTextFlag = false;
					if (slave.anus > 1) {
						r.push(`The solution slowly tightens ${his} anus while inside ${his} bowels.`);
						if (slave.inflation === 3) {
							r.push(`Being filled to ${his} limit with the solution does not make it tighten any better or faster; it's just perverted.`);
							dupeTextFlag = true;
						} else if (slave.inflation === 2) {
							r.push(`Being overfilled with the solution does not make it tighten any better or faster; it's just perverted.`);
							dupeTextFlag = true;
						}
						if (jsRandom(1, 100) > 60) {
							r.push(`By week's end, <span class="lime">${his} butthole has tightened nicely.</span>`);
							slave.anus--;
						}
					} else {
						r.push(`${His} anus is as tight as the solution can possibly make it.`);
					}
					if (slave.vagina > 1) {
						r.push(`As ${his} body slowly absorbs the solution, its benefits begin to affect ${his} pussy.`);
						if (!dupeTextFlag) {
							if (slave.inflation === 3) {
								r.push(`Being filled to ${his} limit with the solution does not make it tighten any better or faster; it's just perverted.`);
							} else if (slave.inflation === 2) {
								r.push(`Being overfilled with the solution does not make it tighten any better or faster; it's just perverted.`);
							}
						}
						if (jsRandom(1, 100) > 80) {
							r.push(`By week's end, <span class="lime">${his} vagina has regained some tightness.</span>`);
							slave.vagina--;
						}
					} else if (slave.vagina === 1) {
						r.push(`${His} pussy is as tight as the solution can possibly make it.`);
					}
				}
				if ((slave.anus <= 1 && slave.vagina <= 1) || (slave.geneMods.rapidCellGrowth === 1)) {
					if (slave.vagina >= 0) {
						r.push(`${His} holes are`);
					} else {
						r.push(`${His} hole is`);
					}
					r.push(`as tight as the drugs can get`);
					if (slave.geneMods.rapidCellGrowth === 1) {
						if (slave.vagina >= 0) {
							r.push(`them`);
						} else {
							r.push(`it`);
						}
						r.push(`with the treatment counteracting their efforts. <span class="yellow">${His} tightening enema regimen has been ended.</span>`);
						deflate(slave);
					} else if ([Job.CLUB, Job.BROTHEL].includes(slave.assignment)) {
						if (slave.vagina >= 0) {
							r.push(`them,`);
						} else {
							r.push(`it,`);
						}
						r.push(`but given ${his} assignment, ${he} is likely to be stretched out again, so ${his} tightening enema regimen continues.`);
					} else {
						if (slave.vagina >= 0) {
							r.push(`them.`);
						} else {
							r.push(`it.`);
						}
						r.push(`<span class="yellow">${His} tightening enema regimen has been ended.</span>`);
						deflate(slave);
					}
				}
				slave.chem += 2;
				break;

			case InflationLiquid.MILK:
				r.push(`Throughout the week, ${he}`);
				if (slave.behavioralFlaw === BehavioralFlaw.ANOREXIC) {
					r.push(`<span class="mediumorchid">reluctantly</span>`);
					milkInflationMethod(slave);
					anorexicBloatSize(slave);
					r.push(`of milk, ${distensionTerm}. ${He} struggles to keep ${his} fatty, liquid meal down, <span class="gold">fearing</span> punishment otherwise.`);
				} else if (slave.behavioralFlaw === BehavioralFlaw.GLUTTONOUS) {
					r.push(`<span class="hotpink">${slave.inflationMethod === 2 ? `happily` : `eagerly`}</span>`);
					milkInflationMethod(slave);
					if (slave.inflation === 3) {
						r.push(`<span class="health dec">painfully bloated</span> with nearly two gallons`);
						healthDamage(slave, 10);
					} else if (slave.inflation === 2) {
						r.push(`bloated with nearly four liters`);
					} else if (slave.inflation === 1) {
						r.push(`bloated with nearly two liters`);
					}
					r.push(`of milk, ${distensionTerm}. ${He} rubs ${his}`);
					gluttonousReaction(slave);
				} else {
					r.push(`makes sure to`);
					if (slave.inflationMethod === 1) {
						r.push(`keep ${himself} filled with nearly`);
					} else if (slave.inflationMethod === 2) {
						r.push(`fill ${his} rear with nearly`);
					} else if (slave.inflationMethod === 3) {
						r.push(`keep suckling from ${cow.slaveName} until ${he} is filled with nearly`);
						cow.lactationDuration = 2;
						cow.boobs -= cow.boobsMilk;
						cow.boobsMilk = 0;
					}
					if (slave.inflation === 3) {
						r.push(`two gallons of milk,`);
					} else if (slave.inflation === 2) {
						r.push(`four liters of milk,`);
					} else if (slave.inflation === 1) {
						r.push(`two liters of milk,`);
					}
					if (slave.inflationMethod === 2) {
						r.push(`${distensionTerm}, whenever ${he} leaks or needs to release ${his} load.`);
					} else {
						r.push(`${distensionTerm}.`);
					}
					milkOrCumSize(slave);
				}
				break;

			case InflationLiquid.CUM:
				r.push(`Throughout the week, ${he}`);
				if (slave.behavioralFlaw === BehavioralFlaw.ANOREXIC) {
					r.push(`<span class="mediumorchid">reluctantly</span>`);
					cumInflationMethod(slave);
					anorexicBloatSize(slave);
					r.push(`of cum, ${distensionTerm}.`);
					if (slave.inflationMethod === 1 || slave.inflationMethod === 3) {
						r.push(`${He} struggles to keep ${his} liquid meal down, <span class="gold">fearing</span> punishment otherwise.`);
					} else {
						r.push(`${He} struggles to keep the ${slave.inflation === 1 ? '' : slave.inflation === 2 ? 'huge ' : 'massive '}cumshot inside ${him}, <span class="gold">fearing</span> punishment otherwise.`);
					}
				} else if (slave.behavioralFlaw === BehavioralFlaw.GLUTTONOUS) {
					r.push(`<span class="hotpink">${slave.inflationMethod === 2 ? `happily` : `eagerly`}</span>`);
					cumInflationMethod(slave);
					if (slave.inflation === 3) {
						r.push(`<span class="health dec">painfully bloated</span> with nearly two gallons`);
						healthDamage(slave, 10);
					} else if (slave.inflation === 2) {
						r.push(`bloated with nearly four liters`);
					} else if (slave.inflation === 1) {
						r.push(`bloated with nearly two liters`);
					}
					r.push(`of cum, ${distensionTerm}. ${He} rubs ${his}`);
					gluttonousReaction(slave);
				} else {
					r.push(`makes sure to`);
					if (slave.inflationMethod === 1) {
						r.push(`keep ${himself} filled with nearly`);
					} else if (slave.inflationMethod === 2) {
						r.push(`fill ${his} rear with nearly`);
					} else if (slave.inflationMethod === 3) {
						r.push(`sucks ${cow.slaveName}'s ${(cow.dick > 0) ? `cock` : `cum hole`} until ${he} is filled with nearly`);
					}
					if (slave.inflation === 3) {
						r.push(`two gallons of cum,`);
					} else if (slave.inflation === 2) {
						r.push(`four liters of cum,`);
					} else if (slave.inflation === 1) {
						r.push(`two liters of cum,`);
					}
					if (slave.inflationMethod === 2) {
						r.push(`${distensionTerm}, whenever ${he} leaks or needs to release ${his} load.`);
					} else {
						r.push(`${distensionTerm}.`);
					}
					milkOrCumSize(slave);
				}
				break;

			case InflationLiquid.FOOD:
				r.push(`Throughout the week, ${he}`);
				if (slave.behavioralFlaw === BehavioralFlaw.ANOREXIC) {
					r.push(`focuses ${his} <span class="mediumorchid">loathing</span> on you as ${he} forces down servings of slave food until ${his} stomach is`);
					if (slave.inflation === 3) {
						r.push(`<span class="health dec">painfully bloated</span> with nearly two gallons of the paste, ${distensionTerm}.`);
						healthDamage(slave, 10);
						slave.devotion -= 16;
						slave.trust -= 16;
					} else if (slave.inflation === 2) {
						r.push(`bloated with nearly four liters of the paste, giving ${him} quite the food baby.`);
						slave.devotion -= 10;
						slave.trust -= 10;
					} else if (slave.inflation === 1) {
						r.push(`bloated with nearly two liters of the paste, leaving ${his} stomach obviously distended.`);
						slave.devotion -= 6;
						slave.trust -= 6;
					}
					r.push(`${He} struggles to keep ${his} meal down, <span class="gold">fearing</span> punishment otherwise.`);
				} else if (slave.behavioralFlaw === BehavioralFlaw.GLUTTONOUS) {
					r.push(`<span class="hotpink">eagerly</span> stuffs ${his} face with servings of slave food until ${his} stomach is`);
					if (slave.inflation === 3) {
						r.push(`<span class="health dec">painfully bloated</span> with nearly two gallons of the paste, ${distensionTerm}. ${He} rubs ${his} stuffed belly <span class="mediumaquamarine">contently,</span> anticipating ${his} next gorging.`);
						healthDamage(slave, 10);
						slave.devotion += 10;
						slave.trust += 10;
					} else if (slave.inflation === 2) {
						r.push(`bloated with nearly four liters of the paste, giving ${him} quite the food baby. ${He} rubs ${his} taut belly <span class="mediumaquamarine">contently,</span> anticipating ${his} next meal.`);
						slave.devotion += 7;
						slave.trust += 7;
					} else if (slave.inflation === 1) {
						r.push(`bloated with nearly two liters of the paste, leaving ${his} belly noticeably distended. ${He} rubs ${his} stuffed belly <span class="mediumaquamarine">contently,</span> anticipating ${his} next helping.`);
						slave.devotion += 5;
						slave.trust += 5;
					}
				} else {
					r.push(`makes sure to binge eat until`);
					if (slave.inflation === 3) {
						r.push(`${his} gut is stuffed with nearly two gallons of slave food, ${distensionTerm}. ${He} keeps ${himself} <span class="health dec">painfully full</span> for you.`);
						healthDamage(slave, 10);
					} else if (slave.inflation === 2) {
						r.push(`${his} gut is filled with nearly four liters of slave food, giving ${him} quite the food baby. ${He} is full enough to be distended but not enough to grow taut.`);
					} else if (slave.inflation === 1) {
						r.push(`${he}'s consumed nearly two liters of slave food, leaving ${his} belly noticeably distended. ${He} is full enough to be swollen but not enough to visibly jiggle.`);
					}
				}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function mentalEffects(slave) {
		if (slave.fetish === Fetish.CUMSLUT && slave.inflationType === InflationLiquid.CUM && slave.bellyFluid >= 1500) {
			r.push(`Being so full of cum fills ${him} with <span class="hotpink">absolute bliss.</span>`);
			slave.devotion += 5;
		} else if (slave.fetish === Fetish.MASOCHIST && slave.bellyFluid >= 10000) {
			r.push(`That pain comes with <span class="hotpink">absolute bliss</span> as ${he} relishes the unique sensation.`);
			slave.devotion += 5;
		}
		if (slave.behavioralQuirk === BehavioralQuirk.FITNESS) {
			if ((slave.inflationType === InflationLiquid.MILK || slave.inflationType === InflationLiquid.CUM || slave.inflationType === InflationLiquid.FOOD) && slave.inflation > 0) {
				r.push(`${He} vows to exercise more to deal with <span class="mediumorchid">the bloated belly you forced on ${him}.</span> Though gaining weight just means more opportunities to work out.`);
				slave.devotion -= 3;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function foodMeansFat(slave) {
		if (slave.inflationType === InflationLiquid.MILK) {
			if (slave.weight < 200) {
				r.push(`${His} body <span class="lime">grows a little more padded</span> as it absorbs the milk contained in ${his} digestive track.`);
				slave.weight += 2;
				if (slave.weightDirection === 1) {
					slave.weight += 2;
				}
			}
			if (jsRandom(1, 100) > 50 / gigantomastiaMod && slave.boobs < 3000 * gigantomastiaMod) {
				r.push(`${His} breasts <span class="lime">swell</span> with added fat as ${he} digests the milk contained in ${his} digestive track.`);
				slave.boobs += 200;
			}
			if (jsRandom(1, 100) > (50 / rearLipedemaDivider) && slave.butt < 7 + ((7 / 2) * rearLipedemaMod)) {
				r.push(`${His} butt <span class="lime">swells</span> with added fat as ${he} digests the milk contained in ${his} digestive track.`);
				slave.butt += 1;
			}
		} else if (slave.inflationType === InflationLiquid.FOOD) {
			if (slave.weight < 200) {
				r.push(`${His} body <span class="lime">rapidly gains weight</span> as it digests the food contained in ${his} digestive track.`);
				slave.weight += 4;
				if (slave.weightDirection === 1) {
					slave.weight += 2;
				}
			}
			if (jsRandom(1, 100) > 50 / gigantomastiaMod && slave.boobs < 3000 * gigantomastiaMod) {
				r.push(`${His} breasts <span class="lime">swell</span> with added fat as ${he} digests the food contained in ${his} digestive track.`);
				slave.boobs += 200;
			}
			if (jsRandom(1, 100) > (50 / rearLipedemaDivider) && slave.butt < 7 + ((7 / 2) * rearLipedemaMod)) {
				r.push(`${His} butt <span class="lime">swells</span> with added fat as ${he} digests the food contained in ${his} digestive track.`);
				slave.butt += 1;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function cervixImplantFluidConversion(slave) {
		if (slave.inflationMethod === 2) {
			r.push(`${His} rectal micropump implant filters out some fluid from the ${slave.inflationType} within ${him} during the week, adding it to ${his} abdominal implant.`);
			slave.bellyImplant += 200;
		}
	}
};
