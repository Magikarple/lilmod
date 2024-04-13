// cSpell:ignore desyncs, spurty

App.EndWeek.Shared.physicalDevelopment = function(actor, player = false) {
	let gigantomastiaMod = 1;
	let uterineHypersensitivityMod;
	const rearQuirk = actor.geneticQuirks.rearLipedema === 2 ? 2 : 0;
	const rearQuirkDivider = rearQuirk === 0 ? 1 : rearQuirk;
	const dickMod = (actor.geneticQuirks.wellHung === 2 ? 2 : 1);
	let physicalAgeSwap;

	if (actor.geneticQuirks.progeria === 2) {
		// since progeria increases .physicalAge, we need to work around it.
		// nothing other than the incubator drastically desyncs it, and progeria actors do not live through incubation, so this should be fine.
		physicalAgeSwap = actor.actualAge;
	} else {
		physicalAgeSwap = actor.physicalAge;
	}
	if (actor.geneMods.NCS !== 1) {
		/* NCS completely blocks all natural physical growth: no height increases. It also blocks all hormonal secondary sexual
		 * characteristics. So, on the female side: no boobs, no butt, no hips, and no labia. And on the male side: no dick, no clit, no balls, no scrotum, no shoulders. */
		/* so this is a big old NO-OP to skip the physical development. */
		if (actor.geneticQuirks.neoteny === 2) {
			// special case for neoteny (genetic target height does not take it into account)
			increaseHeightNeoteny(actor);
		} else {
			// giant/dwarf/sex/race/etc is already taken into account by the target height. just need to take one step towards it.
			increaseHeight(actor);
		}
		// physical development EXCEPT for height stops at 18; height keeps going until 20.
		if (physicalAgeSwap <= 18) {
			if (actor.geneticQuirks.androgyny === 2) { /* takes a mix of both to create a very androgynous slave */
				if (actor.geneticQuirks.neoteny !== 2) {
					if (actor.boobs - actor.boobsImplant <= 300) {
						increaseBoobsXX(actor);
					}
					if (actor.dick.isBetween(0, 3) || actor.geneticQuirks.wellHung === 2) {
						increaseDick(actor);
					}
					if (actor.balls.isBetween(0, 3)) {
						increaseBalls(actor);
					}
					if (actor.vagina !== -1 && actor.ovaries > 0 && physicalAgeSwap > actor.pubertyAgeXX) {
						increaseWetness(actor);
					}
					if (actor.waist < 10) {
						increaseWaistXY(actor);
					}
					if (actor.hips - actor.hipsImplant < 0) {
						increaseHipsXX(actor);
					}
					if (actor.butt - actor.buttImplant < 3) {
						increaseButtXX(actor);
					}
				}
				increasePregAdaptationXX(actor);
			} else if (actor.genes === GenderGenes.FEMALE) { /* loli becoming a woman */
				if (physicalAgeSwap === 13 || (physicalAgeSwap > 13 && (actor.hormoneBalance >= 100 || actor.hormoneBalance <= -100))) {
					increaseFaceXX(actor);
					if (actor.voice > 1) {
						increaseVoiceXX(actor);
					}
				}
				if (actor.geneticQuirks.neoteny !== 2) {
					if (physicalAgeSwap > actor.pubertyAgeXX) {
						increaseBoobs(actor); // this function accounts for natural.boobs, but should not be allowed to run before puberty
					} else {
						increaseBoobsXX(actor); // this function does not account for natural.boobs, but allows for minor prepubescent growth
					}
					if (actor.clit > 0) {
						increaseClit(actor);
					}
					if (actor.vagina > 0 && actor.ovaries > 0 && physicalAgeSwap > actor.pubertyAgeXX) {
						increaseWetness(actor);
					}
					increaseWaistXX(actor);
					increaseHipsXX(actor);
					increaseButtXX(actor);
				}
				increasePregAdaptationXX(actor);
			} else { /* shota becoming a man */
				if (physicalAgeSwap === 13 || (physicalAgeSwap > 13 && (actor.hormoneBalance >= 100 || actor.hormoneBalance <= -100))) {
					increaseFaceXY(actor);
					if (actor.voice > 1) {
						increaseVoiceXY(actor);
					}
				}
				if (actor.geneticQuirks.neoteny !== 2) {
					if (actor.pubertyXX === 1 || actor.hormoneBalance >= 200) {
						increaseBoobs(actor);
					}
					if (actor.dick > 0) {
						increaseDick(actor);
					}
					if (actor.balls > 0) {
						increaseBalls(actor);
					}
					increaseWaistXY(actor);
					increaseHipsXY(actor);
					increaseButtXY(actor);
				}
				increasePregAdaptationXY(actor);
			}
		}
	}

	/**
	 * @param {FC.HumanState} actor
	 */
	function increaseHeight(actor) {
		const unalteredHeight = actor.height - actor.heightImplant * 10;
		const lastYearsTarget = Height.forAge(actor.natural.height, physicalAgeSwap - 1, actor.genes);
		const thisYearsTarget = Height.forAge(actor.natural.height, physicalAgeSwap, actor.genes);
		// by default, grow by the difference in natural height targets, +1/-2 cm
		// slightly undershooting on average is intentional, since we can't shrink but we CAN have growth spurts
		let thisYearsGrowth = thisYearsTarget - lastYearsTarget + jsRandom(-2, 1);
		// if we're way ahead of target or way behind target, adjust towards it a bit harder
		// if the player doesn't interfere, this mechanism should always end up within 2cm of the target at age 20, with slightly "spurty" growth
		const deltaFromTarget = thisYearsTarget - (unalteredHeight + thisYearsGrowth);
		const yearsLeft = Math.min(5, 21 - physicalAgeSwap);
		if (deltaFromTarget >= yearsLeft) {
			thisYearsGrowth = Math.max(0, thisYearsGrowth) + 2;
		} else if (deltaFromTarget <= -yearsLeft) {
			thisYearsGrowth = Math.min(0, thisYearsGrowth) - 2;
		}
		// never shrink
		if (thisYearsGrowth > 0) {
			actor.height += Math.round(thisYearsGrowth);
		}
	}

	/**
	 * @param {FC.HumanState} actor
	 */
	function increaseHeightNeoteny(actor) {
		if (physicalAgeSwap <= 12) {
			if (actor.height <= 120) {
				actor.height += jsEither([0, 0, 1, 1, 2, 2]);
			}
		} else if (physicalAgeSwap === 13) {
			if (actor.height <= 120) {
				actor.height += jsEither([0, 0, 1, 1, 2, 2]);
			}
		} else if (physicalAgeSwap === 14) {
			if (actor.height <= 120) {
				actor.height += jsEither([0, 0, 1, 1, 2, 2]);
			}
		} else if (physicalAgeSwap === 15) {
			if (actor.height <= 120) {
				actor.height += jsEither([0, 0, 1, 1, 2, 2]);
			}
		} else if (physicalAgeSwap === 16) {
			if (actor.height <= 130) {
				actor.height += jsEither([0, 0, 1, 1, 2, 2]);
			}
		} else if (physicalAgeSwap === 17) {
			if (actor.height <= 130) {
				actor.height += jsEither([0, 0, 1, 1, 2, 2]);
			}
		} else if (physicalAgeSwap === 18) {
			if (actor.height <= 130) {
				actor.height += jsEither([0, 0, 1, 1, 2, 2]);
			}
		}
	}

	/**
	 * @param {FC.HumanState} actor
	 */
	function increaseBoobs(actor) {
		const unalteredBoobs = App.Medicine.fleshSize(actor, 'boobs');
		if (actor.geneticQuirks.gigantomastia === 2 && actor.geneticQuirks.macromastia === 2) {
			gigantomastiaMod = 3;
		} else if (actor.geneticQuirks.gigantomastia === 2) {
			gigantomastiaMod = 2;
		} else if (actor.geneticQuirks.macromastia === 2) {
			gigantomastiaMod = 1.5;
		} else if (actor.geneticQuirks.gigantomastia === 3) {
			gigantomastiaMod = 1.2;
		} else if (actor.geneticQuirks.macromastia === 3) {
			gigantomastiaMod = 1.1;
		} else {
			gigantomastiaMod = 1;
		}
		let hormoneMod = actor.hormoneBalance <= -100 ? 0 : Math.min(1 + Math.trunc(actor.hormoneBalance / 100) / 10, 1.4); // Forbid 500 hormone balance from being special. It is not.
		const growthTarget = actor.natural.boobs * gigantomastiaMod * hormoneMod * (random(90, 110) / 100);
		const implantsHinder = actor.boobsImplant === 0 ? 1 : 1 - (actor.boobsImplant / actor.boobs); // Implants disrupt growth.
		const growthRange = Math.max(18 - actor.pubertyAgeXX, 6); // growth range puberty to 18? 12 should be the starting point otherwise you end up with the possibility of way too much growth in just a few years.
		const expectedGrowth = growthTarget / growthRange;
		if (unalteredBoobs < growthTarget) {
			let roundGrowth = expectedGrowth * implantsHinder;
			roundGrowth = Math.round(roundGrowth * .10);
			actor.boobs += roundGrowth * 10;
		}
		// TODO: natural.boobs past threshold should begin underflowing puberty to generate oppailoli
	}

	/**
	 * @param {FC.HumanState} actor
	 */
	function increaseBoobsXX(actor) {
		if (actor.geneticQuirks.gigantomastia === 2 && actor.geneticQuirks.macromastia === 2) {
			gigantomastiaMod = 3;
		} else if (actor.geneticQuirks.gigantomastia === 2) {
			gigantomastiaMod = 2;
		} else if (actor.geneticQuirks.macromastia === 2) {
			gigantomastiaMod = 1.5;
		} else if (actor.geneticQuirks.gigantomastia === 3) {
			gigantomastiaMod = 1.2;
		} else if (actor.geneticQuirks.macromastia === 3) {
			gigantomastiaMod = 1.1;
		} else {
			gigantomastiaMod = 1;
		}
		if (actor.hormoneBalance >= 200) {
			if (physicalAgeSwap === 8) {
				actor.boobs += 50;
			} else if (physicalAgeSwap === 9) {
				actor.boobs += 50;
			} else if (physicalAgeSwap === 10) {
				actor.boobs += 50;
			} else if (physicalAgeSwap === 11) {
				if (actor.boobs < (600 * gigantomastiaMod)) {
					if (random(1, 100) > (40 / gigantomastiaMod)) {
						actor.boobs += 100;
					}
				}
				actor.boobs += 100;
			} else if (physicalAgeSwap === 12) {
				if (actor.boobs < (700 * gigantomastiaMod)) {
					if (random(1, 100) > (40 / gigantomastiaMod)) {
						actor.boobs += 100;
					}
				}
				actor.boobs += 100;
			} else if (physicalAgeSwap === 13) {
				if (actor.boobs < (1000 * gigantomastiaMod)) {
					if (random(1, 100) > (40 / gigantomastiaMod)) {
						actor.boobs += 100;
					}
				}
				actor.boobs += 100;
			} else if (physicalAgeSwap === 14) {
				if (actor.boobs < (800 * gigantomastiaMod)) {
					if (random(1, 100) > (40 / gigantomastiaMod)) {
						actor.boobs += 100;
					}
				}
				actor.boobs += 100;
			} else if (physicalAgeSwap === 15) {
				if (actor.boobs < (900 * gigantomastiaMod)) {
					if (random(1, 100) > (40 / gigantomastiaMod)) {
						actor.boobs += 100;
					}
				}
				actor.boobs += 100;
			} else if (physicalAgeSwap === 16) {
				if (actor.boobs < (1200 * gigantomastiaMod)) {
					if (random(1, 100) > (40 / gigantomastiaMod)) {
						actor.boobs += 100;
					}
				}
				actor.boobs += 100;
			} else if (physicalAgeSwap === 17) {
				if (actor.boobs < (1600 * gigantomastiaMod)) {
					if (random(1, 100) > (40 / gigantomastiaMod)) {
						actor.boobs += 100;
					}
				}
				actor.boobs += 100;
			} else if (physicalAgeSwap === 18) {
				if (actor.boobs < (2000 * gigantomastiaMod)) {
					if (random(1, 100) > (40 / gigantomastiaMod)) {
						actor.boobs += 100;
					}
				}
				actor.boobs += 100;
			}
		} else if (actor.hormoneBalance >= 100) {
			if (physicalAgeSwap === 8) {
				actor.boobs += 25;
			} else if (physicalAgeSwap === 9) {
				actor.boobs += 25;
			} else if (physicalAgeSwap === 10) {
				actor.boobs += 25;
			} else if (physicalAgeSwap === 11) {
				if (actor.boobs < (500 * gigantomastiaMod)) {
					if (random(1, 100) > (40 / gigantomastiaMod)) {
						actor.boobs += 100;
					}
				}
				actor.boobs += 50;
			} else if (physicalAgeSwap === 12) {
				if (actor.boobs < (600 * gigantomastiaMod)) {
					if (random(1, 100) > (40 / gigantomastiaMod)) {
						actor.boobs += 100;
					}
				}
				actor.boobs += 50;
			} else if (physicalAgeSwap === 13) {
				if (actor.boobs < (900 * gigantomastiaMod)) {
					if (random(1, 100) > (40 / gigantomastiaMod)) {
						actor.boobs += 100;
					}
				}
				actor.boobs += 50;
			} else if (physicalAgeSwap === 14) {
				if (actor.boobs < (700 * gigantomastiaMod)) {
					if (random(1, 100) > (40 / gigantomastiaMod)) {
						actor.boobs += 100;
					}
				}
				actor.boobs += 50;
			} else if (physicalAgeSwap === 15) {
				if (actor.boobs < (800 * gigantomastiaMod)) {
					if (random(1, 100) > (40 / gigantomastiaMod)) {
						actor.boobs += 100;
					}
				}
				actor.boobs += 50;
			} else if (physicalAgeSwap === 16) {
				if (actor.boobs < (1000 * gigantomastiaMod)) {
					if (random(1, 100) > (40 / gigantomastiaMod)) {
						actor.boobs += 100;
					}
				}
				actor.boobs += 50;
			} else if (physicalAgeSwap === 17) {
				if (actor.boobs < (1200 * gigantomastiaMod)) {
					if (random(1, 100) > (40 / gigantomastiaMod)) {
						actor.boobs += 100;
					}
				}
				actor.boobs += 50;
			} else if (physicalAgeSwap === 18) {
				if (actor.boobs < (1600 * gigantomastiaMod)) {
					if (random(1, 100) > (40 / gigantomastiaMod)) {
						actor.boobs += 100;
					}
				}
				actor.boobs += 50;
			}
		} else if (actor.hormoneBalance <= -200) {
			if (physicalAgeSwap >= 11) {
				if (actor.boobs > 200 && gigantomastiaMod !== 3) {
					actor.boobs -= 100;
				}
			}
		} else if (actor.hormoneBalance <= -100) {
			if (physicalAgeSwap >= 11) {
				if (actor.boobs > 200 && gigantomastiaMod !== 3) {
					actor.boobs -= 50;
				}
			}
		} else {
			if (physicalAgeSwap === 11) {
				if (actor.boobs < (300 * gigantomastiaMod)) {
					if (random(1, 100) > (40 / gigantomastiaMod)) {
						actor.boobs += 100;
					}
				}
			} else if (physicalAgeSwap === 12) {
				if (actor.boobs < (300 * gigantomastiaMod)) {
					if (random(1, 100) > (40 / gigantomastiaMod)) {
						actor.boobs += 100;
					}
				}
			} else if (physicalAgeSwap === 13) {
				if (actor.boobs < (400 * gigantomastiaMod)) {
					if (random(1, 100) > (40 / gigantomastiaMod)) {
						actor.boobs += 100;
					}
				}
			} else if (physicalAgeSwap === 14) {
				if (actor.boobs < (500 * gigantomastiaMod)) {
					if (random(1, 100) > (40 / gigantomastiaMod)) {
						actor.boobs += 100;
					}
				}
			} else if (physicalAgeSwap === 15) {
				if (actor.boobs < (500 * gigantomastiaMod)) {
					if (random(1, 100) > (40 / gigantomastiaMod)) {
						actor.boobs += 100;
					}
				}
			} else if (physicalAgeSwap === 16) {
				if (actor.boobs < (800 * gigantomastiaMod)) {
					if (random(1, 100) > (50 / gigantomastiaMod)) {
						actor.boobs += 100;
					}
				}
			} else if (physicalAgeSwap === 17) {
				if (actor.boobs < (800 * gigantomastiaMod)) {
					if (random(1, 100) > (60 / gigantomastiaMod)) {
						actor.boobs += 100;
					}
				}
			} else if (physicalAgeSwap === 18) {
				if (actor.boobs < (800 * gigantomastiaMod)) {
					if (random(1, 100) > (70 / gigantomastiaMod)) {
						actor.boobs += 100;
					}
				}
			}
		}
	}

	/**
	 * @param {FC.HumanState} actor
	 */
	function increaseBoobsXY(actor) {
		if (actor.geneticQuirks.gigantomastia === 2 && actor.geneticQuirks.macromastia === 2) {
			gigantomastiaMod = 3;
		} else if (actor.geneticQuirks.gigantomastia === 2) {
			gigantomastiaMod = 2;
		} else if (actor.geneticQuirks.macromastia === 2) {
			gigantomastiaMod = 1.5;
		} else if (actor.geneticQuirks.gigantomastia === 3) {
			gigantomastiaMod = 1.2;
		} else if (actor.geneticQuirks.macromastia === 3) {
			gigantomastiaMod = 1.1;
		} else {
			gigantomastiaMod = 1;
		}
		if (actor.hormoneBalance >= 200) {
			if (physicalAgeSwap === 8) {
				actor.boobs += 50;
			} else if (physicalAgeSwap === 9) {
				actor.boobs += 50;
			} else if (physicalAgeSwap === 10) {
				actor.boobs += 50;
			} else if (physicalAgeSwap === 11) {
				actor.boobs += 50;
			} else if (physicalAgeSwap === 12) {
				actor.boobs += 50;
			} else if (physicalAgeSwap === 13) {
				if (actor.boobs < (1000 * gigantomastiaMod)) {
					if (random(1, 100) > (40 / gigantomastiaMod)) {
						actor.boobs += 100;
					}
				}
				actor.boobs += 50;
			} else if (physicalAgeSwap === 14) {
				if (actor.boobs < (800 * gigantomastiaMod)) {
					if (random(1, 100) > (40 / gigantomastiaMod)) {
						actor.boobs += 100;
					}
				}
				actor.boobs += 100;
			} else if (physicalAgeSwap === 15) {
				if (actor.boobs < (900 * gigantomastiaMod)) {
					if (random(1, 100) > (40 / gigantomastiaMod)) {
						actor.boobs += 100;
					}
				}
				actor.boobs += 100;
			} else if (physicalAgeSwap === 16) {
				if (actor.boobs < (1200 * gigantomastiaMod)) {
					if (random(1, 100) > (40 / gigantomastiaMod)) {
						actor.boobs += 100;
					}
				}
				actor.boobs += 100;
			} else if (physicalAgeSwap === 17) {
				if (actor.boobs < (1600 * gigantomastiaMod)) {
					if (random(1, 100) > (40 / gigantomastiaMod)) {
						actor.boobs += 100;
					}
				}
				actor.boobs += 100;
			} else if (physicalAgeSwap === 18) {
				if (actor.boobs < (2000 * gigantomastiaMod)) {
					if (random(1, 100) > (40 / gigantomastiaMod)) {
						actor.boobs += 100;
					}
				}
				actor.boobs += 100;
			}
		} else if (actor.hormoneBalance >= 100) {
			if (physicalAgeSwap === 8) {
				actor.boobs += 25;
			} else if (physicalAgeSwap === 9) {
				actor.boobs += 25;
			} else if (physicalAgeSwap === 10) {
				actor.boobs += 25;
			} else if (physicalAgeSwap === 11) {
				actor.boobs += 25;
			} else if (physicalAgeSwap === 12) {
				actor.boobs += 25;
			} else if (physicalAgeSwap === 13) {
				if (actor.boobs < (900 * gigantomastiaMod)) {
					if (random(1, 100) > (40 / gigantomastiaMod)) {
						actor.boobs += 100;
					}
				}
				actor.boobs += 25;
			} else if (physicalAgeSwap === 14) {
				if (actor.boobs < (700 * gigantomastiaMod)) {
					if (random(1, 100) > (40 / gigantomastiaMod)) {
						actor.boobs += 100;
					}
				}
				actor.boobs += 50;
			} else if (physicalAgeSwap === 15) {
				if (actor.boobs < (800 * gigantomastiaMod)) {
					if (random(1, 100) > (40 / gigantomastiaMod)) {
						actor.boobs += 100;
					}
				}
				actor.boobs += 50;
			} else if (physicalAgeSwap === 16) {
				if (actor.boobs < (1000 * gigantomastiaMod)) {
					if (random(1, 100) > (40 / gigantomastiaMod)) {
						actor.boobs += 100;
					}
				}
				actor.boobs += 50;
			} else if (physicalAgeSwap === 17) {
				if (actor.boobs < (1200 * gigantomastiaMod)) {
					if (random(1, 100) > (40 / gigantomastiaMod)) {
						actor.boobs += 100;
					}
				}
				actor.boobs += 50;
			} else if (physicalAgeSwap === 18) {
				if (actor.boobs < (1600 * gigantomastiaMod)) {
					if (random(1, 100) > (40 / gigantomastiaMod)) {
						actor.boobs += 100;
					}
				}
				actor.boobs += 50;
			}
		} else if (actor.hormoneBalance <= -200) {
			if (physicalAgeSwap >= 11) {
				if (actor.boobs > 200 && gigantomastiaMod !== 3) {
					actor.boobs -= 100;
				}
			}
		} else if (actor.hormoneBalance <= -100) {
			if (physicalAgeSwap >= 11) {
				if (actor.boobs > 200 && gigantomastiaMod !== 3) {
					actor.boobs -= 50;
				}
			}
		}
	}

	/**
	 * @param {FC.HumanState} actor
	 */
	function increaseHipsXX(actor) {
		if (actor.geneticQuirks.uterineHypersensitivity === 2) {
			uterineHypersensitivityMod = 1.5;
		} else if (actor.geneticQuirks.uterineHypersensitivity === 1) {
			uterineHypersensitivityMod = 1.2;
		} else {
			uterineHypersensitivityMod = 1;
		}
		if (actor.hormoneBalance >= 200) {
			if (physicalAgeSwap === 8) {
				if (actor.hips < 2) {
					if (random(1, 100) > 90 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			} else if (physicalAgeSwap === 9) {
				if (actor.hips < 2) {
					if (random(1, 100) > 90 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			} else if (physicalAgeSwap === 10) {
				if (actor.hips < 2) {
					if (random(1, 100) > 90 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			} else if (physicalAgeSwap === 11) {
				if (actor.hips < 2) {
					if (random(1, 100) > 20 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			} else if (physicalAgeSwap === 12) {
				if (actor.hips < 2) {
					if (random(1, 100) > 20 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			} else if (physicalAgeSwap === 13) {
				if (actor.hips < 2) {
					if (random(1, 100) > 20 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			} else if (physicalAgeSwap === 14) {
				if (actor.hips < 2) {
					if (random(1, 100) > 20 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			} else if (physicalAgeSwap === 15) {
				if (actor.hips < 2) {
					if (random(1, 100) > 20 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			} else if (physicalAgeSwap === 16) {
				if (actor.hips < 2) {
					if (random(1, 100) > 20 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			} else if (physicalAgeSwap === 17) {
				if (actor.hips < 2) {
					if (random(1, 100) > 20 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			} else if (physicalAgeSwap === 18) {
				if (actor.hips < 2) {
					if (random(1, 100) > 20 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			}
		} else if (actor.hormoneBalance >= 100) {
			if (physicalAgeSwap === 8) {
				if (actor.hips < 2) {
					if (random(1, 100) > 95 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			} else if (physicalAgeSwap === 9) {
				if (actor.hips < 2) {
					if (random(1, 100) > 95 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			} else if (physicalAgeSwap === 10) {
				if (actor.hips < 2) {
					if (random(1, 100) > 95 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			} else if (physicalAgeSwap === 11) {
				if (actor.hips < 2) {
					if (random(1, 100) > 40 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			} else if (physicalAgeSwap === 12) {
				if (actor.hips < 2) {
					if (random(1, 100) > 40 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			} else if (physicalAgeSwap === 13) {
				if (actor.hips < 2) {
					if (random(1, 100) > 40 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			} else if (physicalAgeSwap === 14) {
				if (actor.hips < 2) {
					if (random(1, 100) > 40 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			} else if (physicalAgeSwap === 15) {
				if (actor.hips < 2) {
					if (random(1, 100) > 40 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			} else if (physicalAgeSwap === 16) {
				if (actor.hips < 2) {
					if (random(1, 100) > 40 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			} else if (physicalAgeSwap === 17) {
				if (actor.hips < 2) {
					if (random(1, 100) > 40 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			} else if (physicalAgeSwap === 18) {
				if (actor.hips < 2) {
					if (random(1, 100) > 40 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			}
		} else if (actor.hormoneBalance <= -200) {
			if (physicalAgeSwap === 8) {
				if (actor.hips < 2) {
					if (random(1, 100) > 99 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			} else if (physicalAgeSwap === 11) {
				if (actor.hips < 2) {
					if (random(1, 100) > 95 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			} else if (physicalAgeSwap === 12) {
				if (actor.hips < 2) {
					if (random(1, 100) > 95 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			} else if (physicalAgeSwap === 13) {
				if (actor.hips < 2) {
					if (random(1, 100) > 95 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			}
		} else if (actor.hormoneBalance <= -100) {
			if (physicalAgeSwap === 8) {
				if (actor.hips < 2) {
					if (random(1, 100) > 95 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			} else if (physicalAgeSwap === 11) {
				if (actor.hips < 2) {
					if (random(1, 100) > 90 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			} else if (physicalAgeSwap === 12) {
				if (actor.hips < 2) {
					if (random(1, 100) > 90 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			} else if (physicalAgeSwap === 13) {
				if (actor.hips < 2) {
					if (random(1, 100) > 90 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			}
		} else {
			if (physicalAgeSwap === 8) {
				if (actor.hips < 2) {
					if (random(1, 100) > 90 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			} else if (physicalAgeSwap === 11) {
				if (actor.hips < 2) {
					if (random(1, 100) > 60 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			} else if (physicalAgeSwap === 12) {
				if (actor.hips < 2) {
					if (random(1, 100) > 60 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			} else if (physicalAgeSwap === 13) {
				if (actor.hips < 2) {
					if (random(1, 100) > 60 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			} else if (physicalAgeSwap === 14) {
				if (actor.hips < 2) {
					if (random(1, 100) > 60 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			}
		}
	}

	/**
	 * @param {FC.HumanState} actor
	 */
	function increaseHipsXY(actor) {
		if (actor.geneticQuirks.uterineHypersensitivity === 2) {
			uterineHypersensitivityMod = 1.3;
		} else if (actor.geneticQuirks.uterineHypersensitivity === 1) {
			uterineHypersensitivityMod = 1.15;
		} else {
			uterineHypersensitivityMod = 1;
		}
		if (actor.hormoneBalance >= 200) {
			if (physicalAgeSwap === 8) {
				if (actor.hips < 2) {
					if (random(1, 100) > 90 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			} else if (physicalAgeSwap === 9) {
				if (actor.hips < 2) {
					if (random(1, 100) > 90 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			} else if (physicalAgeSwap === 10) {
				if (actor.hips < 2) {
					if (random(1, 100) > 90 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			} else if (physicalAgeSwap === 11) {
				if (actor.hips < 2) {
					if (random(1, 100) > 20 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			} else if (physicalAgeSwap === 12) {
				if (actor.hips < 2) {
					if (random(1, 100) > 20 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			} else if (physicalAgeSwap === 13) {
				if (actor.hips < 2) {
					if (random(1, 100) > 20 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			} else if (physicalAgeSwap === 14) {
				if (actor.hips < 2) {
					if (random(1, 100) > 20 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			} else if (physicalAgeSwap === 15) {
				if (actor.hips < 2) {
					if (random(1, 100) > 20 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			} else if (physicalAgeSwap === 16) {
				if (actor.hips < 2) {
					if (random(1, 100) > 20 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			} else if (physicalAgeSwap === 17) {
				if (actor.hips < 2) {
					if (random(1, 100) > 20 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			} else if (physicalAgeSwap === 18) {
				if (actor.hips < 2) {
					if (random(1, 100) > 20 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			}
		} else if (actor.hormoneBalance >= 100) {
			if (physicalAgeSwap === 8) {
				if (actor.hips < 2) {
					if (random(1, 100) > 95 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			} else if (physicalAgeSwap === 9) {
				if (actor.hips < 2) {
					if (random(1, 100) > 95 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			} else if (physicalAgeSwap === 10) {
				if (actor.hips < 2) {
					if (random(1, 100) > 95 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			} else if (physicalAgeSwap === 11) {
				if (actor.hips < 2) {
					if (random(1, 100) > 40 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			} else if (physicalAgeSwap === 12) {
				if (actor.hips < 2) {
					if (random(1, 100) > 40 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			} else if (physicalAgeSwap === 13) {
				if (actor.hips < 2) {
					if (random(1, 100) > 40 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			} else if (physicalAgeSwap === 14) {
				if (actor.hips < 2) {
					if (random(1, 100) > 40 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			} else if (physicalAgeSwap === 15) {
				if (actor.hips < 2) {
					if (random(1, 100) > 40 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			} else if (physicalAgeSwap === 16) {
				if (actor.hips < 2) {
					if (random(1, 100) > 40 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			} else if (physicalAgeSwap === 17) {
				if (actor.hips < 2) {
					if (random(1, 100) > 40 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			} else if (physicalAgeSwap === 18) {
				if (actor.hips < 2) {
					if (random(1, 100) > 40 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			}
		} else if (actor.hormoneBalance <= -200) {
			if (physicalAgeSwap === 14) {
				if (actor.hips < 2) {
					if (random(1, 100) > 99 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			}
		} else if (actor.hormoneBalance <= -100) {
			if (physicalAgeSwap === 14) {
				if (actor.hips < 2) {
					if (random(1, 100) > 95 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			}
		} else {
			if (physicalAgeSwap === 14) {
				if (actor.hips < 2) {
					if (random(1, 100) > 60 / uterineHypersensitivityMod) {
						actor.hips++;
					}
				}
			}
		}
	}

	/**
	 * @param {FC.HumanState} actor
	 */
	function increaseButtXX(actor) {
		if (actor.hormoneBalance >= 200) {
			if (physicalAgeSwap === 8) {
				if (actor.butt < (3 + rearQuirk)) {
					if (random(1, 100) > (80 / rearQuirkDivider)) {
						actor.butt++;
					}
				}
			} else if (physicalAgeSwap === 9) {
				if (actor.butt < (3 + rearQuirk)) {
					if (random(1, 100) > (80 / rearQuirkDivider)) {
						actor.butt++;
					}
				}
			} else if (physicalAgeSwap === 10) {
				if (actor.butt < (3 + rearQuirk)) {
					if (random(1, 100) > (80 / rearQuirkDivider)) {
						actor.butt++;
					}
				}
			} else if (physicalAgeSwap === 11) {
				if (actor.butt < (3 + rearQuirk)) {
					if (random(1, 100) > (20 / rearQuirkDivider)) {
						actor.butt++;
					}
				}
			} else if (physicalAgeSwap === 12) {
				if (actor.butt < (4 + rearQuirk)) {
					if (random(1, 100) > (20 / rearQuirkDivider)) {
						actor.butt++;
					}
				}
			} else if (physicalAgeSwap === 13) {
				if (actor.butt < (4 + rearQuirk)) {
					if (random(1, 100) > (20 / rearQuirkDivider)) {
						actor.butt++;
					}
				}
			}
		} else if (actor.hormoneBalance >= 100) {
			if (physicalAgeSwap === 8) {
				if (actor.butt < (3 + rearQuirk)) {
					if (random(1, 100) > (90 / rearQuirkDivider)) {
						actor.butt++;
					}
				}
			} else if (physicalAgeSwap === 9) {
				if (actor.butt < (3 + rearQuirk)) {
					if (random(1, 100) > (90 / rearQuirkDivider)) {
						actor.butt++;
					}
				}
			} else if (physicalAgeSwap === 10) {
				if (actor.butt < (3 + rearQuirk)) {
					if (random(1, 100) > (90 / rearQuirkDivider)) {
						actor.butt++;
					}
				}
			} else if (physicalAgeSwap === 11) {
				if (actor.butt < (3 + rearQuirk)) {
					if (random(1, 100) > (40 / rearQuirkDivider)) {
						actor.butt++;
					}
				}
			} else if (physicalAgeSwap === 12) {
				if (actor.butt < (4 + rearQuirk)) {
					if (random(1, 100) > (40 / rearQuirkDivider)) {
						actor.butt++;
					}
				}
			} else if (physicalAgeSwap === 13) {
				if (actor.butt < (4 + rearQuirk)) {
					if (random(1, 100) > (40 / rearQuirkDivider)) {
						actor.butt++;
					}
				}
			}
		} else if (actor.hormoneBalance <= -200) {
			if (physicalAgeSwap === 8) {
				if (actor.butt < (3 + rearQuirk)) {
					if (random(1, 100) > (90 / rearQuirkDivider)) {
						actor.butt++;
					}
				}
			} else if (physicalAgeSwap === 11) {
				if (actor.butt < (3 + rearQuirk)) {
					if (random(1, 100) > (95 / rearQuirkDivider)) {
						actor.butt++;
					}
				}
			} else if (physicalAgeSwap === 12) {
				if (actor.butt < (3 + rearQuirk)) {
					if (random(1, 100) > (95 / rearQuirkDivider)) {
						actor.butt++;
					}
				}
			} else if (physicalAgeSwap === 13) {
				if (actor.butt < (3 + rearQuirk)) {
					if (random(1, 100) > (95 / rearQuirkDivider)) {
						actor.butt++;
					}
				}
			}
		} else if (actor.hormoneBalance <= -100) {
			if (physicalAgeSwap === 8) {
				if (actor.butt < (3 + rearQuirk)) {
					if (random(1, 100) > (80 / rearQuirkDivider)) {
						actor.butt++;
					}
				}
			} else if (physicalAgeSwap === 11) {
				if (actor.butt < (3 + rearQuirk)) {
					if (random(1, 100) > (90 / rearQuirkDivider)) {
						actor.butt++;
					}
				}
			} else if (physicalAgeSwap === 12) {
				if (actor.butt < (3 + rearQuirk)) {
					if (random(1, 100) > (90 / rearQuirkDivider)) {
						actor.butt++;
					}
				}
			} else if (physicalAgeSwap === 13) {
				if (actor.butt < (3 + rearQuirk)) {
					if (random(1, 100) > (90 / rearQuirkDivider)) {
						actor.butt++;
					}
				}
			}
		} else {
			if (physicalAgeSwap === 8) {
				if (actor.butt < (3 + rearQuirk)) {
					if (random(1, 100) > (60 / rearQuirkDivider)) {
						actor.butt++;
					}
				}
			} else if (physicalAgeSwap === 11) {
				if (actor.butt < (3 + rearQuirk)) {
					if (random(1, 100) > (60 / rearQuirkDivider)) {
						actor.butt++;
					}
				}
			} else if (physicalAgeSwap === 12) {
				if (actor.butt < (3 + rearQuirk)) {
					if (random(1, 100) > (60 / rearQuirkDivider)) {
						actor.butt++;
					}
				}
			} else if (physicalAgeSwap === 13) {
				if (actor.butt < (3 + rearQuirk)) {
					if (random(1, 100) > (60 / rearQuirkDivider)) {
						actor.butt++;
					}
				}
			}
		}
	}

	/**
	 * @param {FC.HumanState} actor
	 */
	function increaseButtXY(actor) {
		if (actor.hormoneBalance >= 200) {
			if (physicalAgeSwap === 8) {
				if (actor.butt < (3 + rearQuirk)) {
					if (random(1, 100) > (80 / rearQuirkDivider)) {
						actor.butt++;
					}
				}
			} else if (physicalAgeSwap === 9) {
				if (actor.butt < (3 + rearQuirk)) {
					if (random(1, 100) > (80 / rearQuirkDivider)) {
						actor.butt++;
					}
				}
			} else if (physicalAgeSwap === 10) {
				if (actor.butt < (3 + rearQuirk)) {
					if (random(1, 100) > (80 / rearQuirkDivider)) {
						actor.butt++;
					}
				}
			} else if (physicalAgeSwap === 11) {
				if (actor.butt < (3 + rearQuirk)) {
					if (random(1, 100) > (20 / rearQuirkDivider)) {
						actor.butt++;
					}
				}
			} else if (physicalAgeSwap === 12) {
				if (actor.butt < (4 + rearQuirk)) {
					if (random(1, 100) > (20 / rearQuirkDivider)) {
						actor.butt++;
					}
				}
			} else if (physicalAgeSwap === 13) {
				if (actor.butt < (4 + rearQuirk)) {
					if (random(1, 100) > (20 / rearQuirkDivider)) {
						actor.butt++;
					}
				}
			}
		} else if (actor.hormoneBalance >= 100) {
			if (physicalAgeSwap === 8) {
				if (actor.butt < (3 + rearQuirk)) {
					if (random(1, 100) > (90 / rearQuirkDivider)) {
						actor.butt++;
					}
				}
			} else if (physicalAgeSwap === 9) {
				if (actor.butt < (3 + rearQuirk)) {
					if (random(1, 100) > (90 / rearQuirkDivider)) {
						actor.butt++;
					}
				}
			} else if (physicalAgeSwap === 10) {
				if (actor.butt < (3 + rearQuirk)) {
					if (random(1, 100) > (90 / rearQuirkDivider)) {
						actor.butt++;
					}
				}
			} else if (physicalAgeSwap === 11) {
				if (actor.butt < (3 + rearQuirk)) {
					if (random(1, 100) > (40 / rearQuirkDivider)) {
						actor.butt++;
					}
				}
			} else if (physicalAgeSwap === 13) {
				if (actor.butt < (4 + rearQuirk)) {
					if (random(1, 100) > (40 / rearQuirkDivider)) {
						actor.butt++;
					}
				}
			}
		} else if (actor.hormoneBalance <= -200) {
			if (physicalAgeSwap === 8) {
				if (actor.butt < (3 + rearQuirk)) {
					if (random(1, 100) > (90 / rearQuirkDivider)) {
						actor.butt++;
					}
				}
			}
		} else if (actor.hormoneBalance <= -100) {
			if (physicalAgeSwap === 8) {
				if (actor.butt < (3 + rearQuirk)) {
					if (random(1, 100) > (80 / rearQuirkDivider)) {
						actor.butt++;
					}
				}
			}
		}
	}

	/**
	 * @param {FC.HumanState} actor
	 */
	function increaseDick(actor) {
		if (actor.hormoneBalance >= 200) {
			//
		} else if (actor.hormoneBalance >= 100) {
			//
		} else if (actor.hormoneBalance <= -200) {
			if (physicalAgeSwap === 8) {
				if (actor.dick < 6) {
					if (random(1, 100) > (70 / dickMod)) {
						actor.dick++;
						if (actor.foreskin > 0) {
							actor.foreskin++;
						}
					}
				}
			} else if (physicalAgeSwap === 9) {
				if (actor.dick < 6 && dickMod === 2) {
					if (random(1, 100) > 70) {
						actor.dick++;
						if (actor.foreskin > 0) {
							actor.foreskin++;
						}
					}
				}
			} else if (physicalAgeSwap === 10) {
				if (actor.dick < 6) {
					if (random(1, 100) > (70 / dickMod)) {
						actor.dick++;
						if (actor.foreskin > 0) {
							actor.foreskin++;
						}
					}
				}
			} else if (physicalAgeSwap === 11) {
				if (actor.dick < 6) {
					if (random(1, 100) > (70 / dickMod)) {
						actor.dick++;
						if (actor.foreskin > 0) {
							actor.foreskin++;
						}
					}
				}
			} else if (physicalAgeSwap === 12) {
				if (actor.dick < 6) {
					if (random(1, 100) > (70 / dickMod)) {
						actor.dick++;
						if (actor.foreskin > 0) {
							actor.foreskin++;
						}
					}
				}
			} else if (physicalAgeSwap === 13) {
				if (actor.dick < 6) {
					if (random(1, 100) > (50 / dickMod)) {
						actor.dick++;
						if (actor.foreskin > 0) {
							actor.foreskin++;
						}
					}
				}
			} else if (physicalAgeSwap === 14) {
				if (actor.dick < 6) {
					if (random(1, 100) > (20 / dickMod)) {
						actor.dick++;
						if (actor.foreskin > 0) {
							actor.foreskin++;
						}
					}
				}
			} else if (physicalAgeSwap === 15) {
				if (actor.dick < 6) {
					if (random(1, 100) > (20 / dickMod)) {
						actor.dick++;
						if (actor.foreskin > 0) {
							actor.foreskin++;
						}
					}
				}
			} else if (physicalAgeSwap === 16) {
				if (actor.dick < 6) {
					if (random(1, 100) > (70 / dickMod)) {
						actor.dick++;
						if (actor.foreskin > 0) {
							actor.foreskin++;
						}
					}
				}
			} else if (physicalAgeSwap === 17) {
				if (actor.dick < 6) {
					if (random(1, 100) > (70 / dickMod)) {
						actor.dick++;
						if (actor.foreskin > 0) {
							actor.foreskin++;
						}
					}
				}
			} else if (physicalAgeSwap === 18) {
				if (actor.dick < 6) {
					if (random(1, 100) > (70 / dickMod)) {
						actor.dick++;
						if (actor.foreskin > 0) {
							actor.foreskin++;
						}
					}
				}
			}
		} else if (actor.hormoneBalance <= -100) {
			if (physicalAgeSwap === 8) {
				if (actor.dick < 6) {
					if (random(1, 100) > (90 / dickMod)) {
						actor.dick++;
						if (actor.foreskin > 0) {
							actor.foreskin++;
						}
					}
				}
			} else if (physicalAgeSwap === 9) {
				if (actor.dick < 6 && dickMod === 2) {
					if (random(1, 100) > 70) {
						actor.dick++;
						if (actor.foreskin > 0) {
							actor.foreskin++;
						}
					}
				}
			} else if (physicalAgeSwap === 10) {
				if (actor.dick < 6) {
					if (random(1, 100) > (90 / dickMod)) {
						actor.dick++;
						if (actor.foreskin > 0) {
							actor.foreskin++;
						}
					}
				}
			} else if (physicalAgeSwap === 11) {
				if (actor.dick < 6) {
					if (random(1, 100) > (90 / dickMod)) {
						actor.dick++;
						if (actor.foreskin > 0) {
							actor.foreskin++;
						}
					}
				}
			} else if (physicalAgeSwap === 12) {
				if (actor.dick < 6) {
					if (random(1, 100) > (90 / dickMod)) {
						actor.dick++;
						if (actor.foreskin > 0) {
							actor.foreskin++;
						}
					}
				}
			} else if (physicalAgeSwap === 13) {
				if (actor.dick < 6) {
					if (random(1, 100) > (70 / dickMod)) {
						actor.dick++;
						if (actor.foreskin > 0) {
							actor.foreskin++;
						}
					}
				}
			} else if (physicalAgeSwap === 14) {
				if (actor.dick < 6) {
					if (random(1, 100) > (40 / dickMod)) {
						actor.dick++;
						if (actor.foreskin > 0) {
							actor.foreskin++;
						}
					}
				}
			} else if (physicalAgeSwap === 15) {
				if (actor.dick < 6) {
					if (random(1, 100) > (40 / dickMod)) {
						actor.dick++;
						if (actor.foreskin > 0) {
							actor.foreskin++;
						}
					}
				}
			} else if (physicalAgeSwap === 16) {
				if (actor.dick < 6) {
					if (random(1, 100) > (90 / dickMod)) {
						actor.dick++;
						if (actor.foreskin > 0) {
							actor.foreskin++;
						}
					}
				}
			} else if (physicalAgeSwap === 17) {
				if (actor.dick < 6) {
					if (random(1, 100) > (90 / dickMod)) {
						actor.dick++;
						if (actor.foreskin > 0) {
							actor.foreskin++;
						}
					}
				}
			} else if (physicalAgeSwap === 18) {
				if (actor.dick < 6) {
					if (random(1, 100) > (90 / dickMod)) {
						actor.dick++;
						if (actor.foreskin > 0) {
							actor.foreskin++;
						}
					}
				}
			}
		} else {
			if (physicalAgeSwap === 9) {
				if (actor.dick < 6 && dickMod === 2) {
					if (random(1, 100) > 70) {
						actor.dick++;
						if (actor.foreskin > 0) {
							actor.foreskin++;
						}
					}
				}
			} else if (physicalAgeSwap === 10) {
				if (actor.dick < 6 && dickMod === 2) {
					if (random(1, 100) > 70) {
						actor.dick++;
						if (actor.foreskin > 0) {
							actor.foreskin++;
						}
					}
				}
			} else if (physicalAgeSwap === 11) {
				if (actor.dick < 6 && dickMod === 2) {
					if (random(1, 100) > 70) {
						actor.dick++;
						if (actor.foreskin > 0) {
							actor.foreskin++;
						}
					}
				}
			} else if (physicalAgeSwap === 12) {
				if (actor.dick < 6 && dickMod === 2) {
					if (random(1, 100) > 70) {
						actor.dick++;
						if (actor.foreskin > 0) {
							actor.foreskin++;
						}
					}
				}
			} else if (physicalAgeSwap === 13) {
				if (actor.dick < 6) {
					if (random(1, 100) > (50 / dickMod)) {
						actor.dick++;
						if (actor.foreskin > 0) {
							actor.foreskin++;
						}
					}
				}
			} else if (physicalAgeSwap === 14) {
				if (actor.dick < 6) {
					if (random(1, 100) > (50 / dickMod)) {
						actor.dick++;
						if (actor.foreskin > 0) {
							actor.foreskin++;
						}
					}
				}
			} else if (physicalAgeSwap === 15) {
				if (actor.dick < 6) {
					if (random(1, 100) > (50 / dickMod)) {
						actor.dick++;
						if (actor.foreskin > 0) {
							actor.foreskin++;
						}
					}
				}
			}
		}
	}

	/**
	 * @param {FC.HumanState} actor
	 */
	function increaseBalls(actor) {
		if (actor.hormoneBalance >= 200) {
			//
		} else if (actor.hormoneBalance >= 100) {
			//
		} else if (actor.hormoneBalance <= -200) {
			if (physicalAgeSwap === 8) {
				if (actor.balls < 6) {
					if (random(1, 100) > 10) {
						actor.balls++;
						if (actor.scrotum > 0) {
							actor.scrotum++;
						}
					}
				}
			} else if (physicalAgeSwap === 10) {
				if (actor.balls < 6) {
					if (random(1, 100) > 70) {
						actor.balls++;
						if (actor.scrotum > 0) {
							actor.scrotum++;
						}
					}
				}
			} else if (physicalAgeSwap === 11) {
				if (actor.balls < 6) {
					if (random(1, 100) > 70) {
						actor.balls++;
						if (actor.scrotum > 0) {
							actor.scrotum++;
						}
					}
				}
			} else if (physicalAgeSwap === 12) {
				if (actor.balls < 6) {
					if (random(1, 100) > 70) {
						actor.balls++;
						if (actor.scrotum > 0) {
							actor.scrotum++;
						}
					}
				}
			} else if (physicalAgeSwap === 13) {
				if (actor.balls < 6) {
					if (random(1, 100) > 50) {
						actor.balls++;
						if (actor.scrotum > 0) {
							actor.scrotum++;
						}
					}
				}
			} else if (physicalAgeSwap === 14) {
				if (actor.balls < 6) {
					if (random(1, 100) > 20) {
						actor.balls++;
						if (actor.scrotum > 0) {
							actor.scrotum++;
						}
					}
				}
			} else if (physicalAgeSwap === 15) {
				if (actor.balls < 6) {
					if (random(1, 100) > 20) {
						actor.balls++;
						if (actor.scrotum > 0) {
							actor.scrotum++;
						}
					}
				}
			} else if (physicalAgeSwap === 16) {
				if (actor.balls < 6) {
					if (random(1, 100) > 70) {
						actor.balls++;
						if (actor.scrotum > 0) {
							actor.scrotum++;
						}
					}
				}
			} else if (physicalAgeSwap === 17) {
				if (actor.balls < 6) {
					if (random(1, 100) > 70) {
						actor.balls++;
						if (actor.scrotum > 0) {
							actor.scrotum++;
						}
					}
				}
			} else if (physicalAgeSwap === 18) {
				if (actor.balls < 6) {
					if (random(1, 100) > 70) {
						actor.balls++;
						if (actor.scrotum > 0) {
							actor.scrotum++;
						}
					}
				}
			}
		} else if (actor.hormoneBalance <= -100) {
			if (physicalAgeSwap === 8) {
				if (actor.balls < 6) {
					if (random(1, 100) > 30) {
						actor.balls++;
						if (actor.scrotum > 0) {
							actor.scrotum++;
						}
					}
				}
			} else if (physicalAgeSwap === 10) {
				if (actor.balls < 6) {
					if (random(1, 100) > 90) {
						actor.balls++;
						if (actor.scrotum > 0) {
							actor.scrotum++;
						}
					}
				}
			} else if (physicalAgeSwap === 11) {
				if (actor.balls < 6) {
					if (random(1, 100) > 90) {
						actor.balls++;
						if (actor.scrotum > 0) {
							actor.scrotum++;
						}
					}
				}
			} else if (physicalAgeSwap === 12) {
				if (actor.balls < 6) {
					if (random(1, 100) > 90) {
						actor.balls++;
						if (actor.scrotum > 0) {
							actor.scrotum++;
						}
					}
				}
			} else if (physicalAgeSwap === 13) {
				if (actor.balls < 6) {
					if (random(1, 100) > 70) {
						actor.balls++;
						if (actor.scrotum > 0) {
							actor.scrotum++;
						}
					}
				}
			} else if (physicalAgeSwap === 14) {
				if (actor.balls < 6) {
					if (random(1, 100) > 40) {
						actor.balls++;
						if (actor.scrotum > 0) {
							actor.scrotum++;
						}
					}
				}
			} else if (physicalAgeSwap === 15) {
				if (actor.balls < 6) {
					if (random(1, 100) > 40) {
						actor.balls++;
						if (actor.scrotum > 0) {
							actor.scrotum++;
						}
					}
				}
			} else if (physicalAgeSwap === 16) {
				if (actor.balls < 6) {
					if (random(1, 100) > 90) {
						actor.balls++;
						if (actor.scrotum > 0) {
							actor.scrotum++;
						}
					}
				}
			} else if (physicalAgeSwap === 17) {
				if (actor.balls < 6) {
					if (random(1, 100) > 90) {
						actor.balls++;
						if (actor.scrotum > 0) {
							actor.scrotum++;
						}
					}
				}
			} else if (physicalAgeSwap === 18) {
				if (actor.balls < 6) {
					if (random(1, 100) > 90) {
						actor.balls++;
						if (actor.scrotum > 0) {
							actor.scrotum++;
						}
					}
				}
			}
		} else {
			if (physicalAgeSwap === 8) {
				if (actor.balls < 6) {
					if (random(1, 100) > 50) {
						actor.balls++;
						if (actor.scrotum > 0) {
							actor.scrotum++;
						}
					}
				}
			} else if (physicalAgeSwap === 13) {
				if (actor.balls < 6) {
					if (random(1, 100) > 50) {
						actor.balls++;
						if (actor.scrotum > 0) {
							actor.scrotum++;
						}
					}
				}
			} else if (physicalAgeSwap === 14) {
				if (actor.balls < 6) {
					if (random(1, 100) > 50) {
						actor.balls++;
						if (actor.scrotum > 0) {
							actor.scrotum++;
						}
					}
				}
			} else if (physicalAgeSwap === 15) {
				if (actor.balls < 6) {
					if (random(1, 100) > 50) {
						actor.balls++;
						if (actor.scrotum > 0) {
							actor.scrotum++;
						}
					}
				}
			}
		}
	}

	/**
	 * @param {FC.HumanState} actor
	 */
	function increaseClit(actor) {
		if (actor.hormoneBalance <= -200) {
			if (physicalAgeSwap === 8) {
				if (actor.clit < 4) {
					if (random(1, 100) > 70) {
						actor.clit++;
					}
				}
			} else if (physicalAgeSwap === 9) {
				if (actor.clit < 4) {
					if (random(1, 100) > 70) {
						actor.clit++;
					}
				}
			} else if (physicalAgeSwap === 10) {
				if (actor.clit < 4) {
					if (random(1, 100) > 70) {
						actor.clit++;
					}
				}
			} else if (physicalAgeSwap === 11) {
				if (actor.clit < 4) {
					if (random(1, 100) > 50) {
						actor.clit++;
					}
				}
			} else if (physicalAgeSwap === 12) {
				if (actor.clit < 4) {
					if (random(1, 100) > 50) {
						actor.clit++;
					}
				}
			} else if (physicalAgeSwap === 13) {
				if (actor.clit < 4) {
					if (random(1, 100) > 50) {
						actor.clit++;
					}
				}
			} else if (physicalAgeSwap === 14) {
				if (actor.clit < 4) {
					if (random(1, 100) > 50) {
						actor.clit++;
					}
				}
			} else if (physicalAgeSwap === 15) {
				if (actor.clit < 4) {
					if (random(1, 100) > 50) {
						actor.clit++;
					}
				}
			} else if (physicalAgeSwap === 16) {
				if (actor.clit < 4) {
					if (random(1, 100) > 50) {
						actor.clit++;
					}
				}
			} else if (physicalAgeSwap === 17) {
				if (actor.clit < 4) {
					if (random(1, 100) > 50) {
						actor.clit++;
					}
				}
			} else if (physicalAgeSwap === 18) {
				if (actor.clit < 4) {
					if (random(1, 100) > 50) {
						actor.clit++;
					}
				}
			}
		} else if (actor.hormoneBalance <= -100) {
			if (physicalAgeSwap === 8) {
				if (actor.clit.isBetween(0, 4)) {
					if (random(1, 100) > 90) {
						actor.clit++;
					}
				}
			} else if (physicalAgeSwap === 9) {
				if (actor.clit.isBetween(0, 4)) {
					if (random(1, 100) > 90) {
						actor.clit++;
					}
				}
			} else if (physicalAgeSwap === 10) {
				if (actor.clit.isBetween(0, 4)) {
					if (random(1, 100) > 90) {
						actor.clit++;
					}
				}
			} else if (physicalAgeSwap === 11) {
				if (actor.clit.isBetween(0, 4)) {
					if (random(1, 100) > 70) {
						actor.clit++;
					}
				}
			} else if (physicalAgeSwap === 12) {
				if (actor.clit.isBetween(0, 4)) {
					if (random(1, 100) > 70) {
						actor.clit++;
					}
				}
			} else if (physicalAgeSwap === 13) {
				if (actor.clit.isBetween(0, 4)) {
					if (random(1, 100) > 70) {
						actor.clit++;
					}
				}
			} else if (physicalAgeSwap === 14) {
				if (actor.clit.isBetween(0, 4)) {
					if (random(1, 100) > 70) {
						actor.clit++;
					}
				}
			} else if (physicalAgeSwap === 15) {
				if (actor.clit.isBetween(0, 4)) {
					if (random(1, 100) > 70) {
						actor.clit++;
					}
				}
			} else if (physicalAgeSwap === 16) {
				if (actor.clit.isBetween(0, 4)) {
					if (random(1, 100) > 70) {
						actor.clit++;
					}
				}
			} else if (physicalAgeSwap === 17) {
				if (actor.clit.isBetween(0, 4)) {
					if (random(1, 100) > 70) {
						actor.clit++;
					}
				}
			} else if (physicalAgeSwap === 18) {
				if (actor.clit.isBetween(0, 4)) {
					if (random(1, 100) > 70) {
						actor.clit++;
					}
				}
			}
		}
		if (physicalAgeSwap >= 11 && actor.geneticQuirks.wellHung === 2 && actor.clit < 5 && random(1, 100) > 60) {
			actor.clit++;
		}
	}

	/**
	 * @param {FC.HumanState} actor
	 */
	function increaseWetness(actor) {
		if (actor.geneticQuirks.uterineHypersensitivity === 2) {
			uterineHypersensitivityMod = 1.5;
		} else if (actor.geneticQuirks.uterineHypersensitivity === 1) {
			uterineHypersensitivityMod = 1.2;
		} else {
			uterineHypersensitivityMod = 1;
		}
		if (actor.hormoneBalance >= 200) {
			if (physicalAgeSwap === 8 || physicalAgeSwap === 9) {
				if (actor.vaginaLube < 1) {
					if (random(1, 100) > 90 / uterineHypersensitivityMod) {
						actor.vaginaLube++;
					}
				}
			} else if (physicalAgeSwap <= 12) {
				if (actor.vaginaLube < 1) {
					if (random(1, 100) > 60 / uterineHypersensitivityMod) {
						actor.vaginaLube++;
					}
				} else if (actor.vaginaLube < 2) {
					if (random(1, 100) > 80 / uterineHypersensitivityMod) {
						actor.vaginaLube++;
					}
				}
			} else if (physicalAgeSwap <= 15) {
				if (actor.vaginaLube < 1) {
					if (random(1, 100) > 30 / uterineHypersensitivityMod) {
						actor.vaginaLube++;
					}
				} else if (actor.vaginaLube < 2) {
					if (random(1, 100) > 50 / uterineHypersensitivityMod) {
						actor.vaginaLube++;
					}
				}
			} else if (physicalAgeSwap <= 18) {
				if (actor.vaginaLube < 1) {
					if (random(1, 100) > 10 / uterineHypersensitivityMod) {
						actor.vaginaLube++;
					}
				} else if (actor.vaginaLube < 2) {
					if (random(1, 100) > 20 / uterineHypersensitivityMod) {
						actor.vaginaLube++;
					}
				}
			}
		} else if (actor.hormoneBalance >= 100) {
			if (physicalAgeSwap > 9 && physicalAgeSwap <= 12) {
				if (actor.vaginaLube < 1) {
					if (random(1, 100) > 70 / uterineHypersensitivityMod) {
						actor.vaginaLube++;
					}
				}
			} else if (physicalAgeSwap <= 15) {
				if (actor.vaginaLube < 1) {
					if (random(1, 100) > 40 / uterineHypersensitivityMod) {
						actor.vaginaLube++;
					}
				} else if (actor.vaginaLube < 2) {
					if (random(1, 100) > 70 / uterineHypersensitivityMod) {
						actor.vaginaLube++;
					}
				}
			} else if (physicalAgeSwap <= 18) {
				if (actor.vaginaLube < 1) {
					if (random(1, 100) > 20 / uterineHypersensitivityMod) {
						actor.vaginaLube++;
					}
				} else if (actor.vaginaLube < 2) {
					if (random(1, 100) > 40 / uterineHypersensitivityMod) {
						actor.vaginaLube++;
					}
				}
			}
		} else if (actor.hormoneBalance >= -20) {
			if (physicalAgeSwap > 15 && physicalAgeSwap <= 18) {
				if (actor.vaginaLube < 1) {
					if (random(1, 100) > 50 / uterineHypersensitivityMod) {
						actor.vaginaLube++;
					}
				}
			}
		}
	}

	/**
	 * @param {FC.HumanState} actor
	 */
	function increaseWaistXX(actor) {
		if (actor.hormoneBalance >= 200) {
			if (physicalAgeSwap >= 12) {
				if (actor.waist > -60) {
					if (random(1, 100) > 20) {
						actor.waist = Math.clamp(actor.waist - 5, -60, 100);
					}
				}
			}
		} else if (actor.hormoneBalance >= 100) {
			if (physicalAgeSwap >= 12) {
				if (actor.waist > -30) {
					if (random(1, 100) > 20) {
						actor.waist = Math.clamp(actor.waist - 5, -30, 100);
					}
				}
			}
		} else if (actor.hormoneBalance <= -200) {
			if (physicalAgeSwap >= 12) {
				if (actor.waist < 60) {
					if (random(1, 100) > 20) {
						actor.waist = Math.clamp(actor.waist + 5, -100, 60);
					}
				}
			}
		} else if (actor.hormoneBalance <= -100) {
			if (physicalAgeSwap >= 12) {
				if (actor.waist < 30) {
					if (random(1, 100) > 20) {
						actor.waist = Math.clamp(actor.waist + 5, -100, 30);
					}
				}
			}
		} else {
			if (physicalAgeSwap >= 12) {
				if (actor.waist > -20) {
					if (random(1, 100) > 60) {
						actor.waist = Math.clamp(actor.waist - 5, -20, 100);
					}
				}
			}
		}
	}

	/**
	 * @param {FC.HumanState} actor
	 */
	function increaseWaistXY(actor) {
		if (actor.hormoneBalance >= 200) {
			if (physicalAgeSwap >= 12) {
				if (actor.waist > -30) {
					if (random(1, 100) > 20) {
						actor.waist = Math.clamp(actor.waist - 5, -30, 100);
					}
				}
			}
		} else if (actor.hormoneBalance >= 100) {
			if (physicalAgeSwap >= 12) {
				if (actor.waist > -15) {
					if (random(1, 100) > 20) {
						actor.waist = Math.clamp(actor.waist - 5, -15, 100);
					}
				}
			}
		} else if (actor.hormoneBalance <= -200) {
			if (physicalAgeSwap >= 12) {
				if (actor.waist < 90) {
					if (random(1, 100) > 20) {
						actor.waist = Math.clamp(actor.waist + 5, -100, 90);
					}
				}
			}
		} else if (actor.hormoneBalance <= -100) {
			if (physicalAgeSwap >= 12) {
				if (actor.waist < 60) {
					if (random(1, 100) > 20) {
						actor.waist = Math.clamp(actor.waist + 5, -100, 60);
					}
				}
			}
		} else {
			if (physicalAgeSwap >= 12) {
				if (actor.waist < 20) {
					if (random(1, 100) > 60) {
						actor.waist = Math.clamp(actor.waist + 5, -100, 20);
					}
				}
			}
		}
	}

	/**
	 * @param {FC.HumanState} actor
	 */
	function increaseFaceXX(actor) {
		if (actor.hormoneBalance >= 200) {
			if (actor.face > 60) {
				if (random(1, 100) > 80) {
					actor.face += 5;
				}
			} else if (actor.face <= 60) {
				if (random(1, 100) > 30) {
					actor.face += 10;
				}
			}
		} else if (actor.hormoneBalance >= 100) {
			if (actor.face > 60) {
				if (random(1, 100) > 80) {
					actor.face += 5;
				}
			} else if (actor.face <= 60) {
				if (random(1, 100) > 30) {
					actor.face += 10;
				}
			}
		} else if (actor.hormoneBalance <= -200) {
			if (actor.face < 100) {
				if (random(1, 100) > 50) {
					actor.face -= 20;
				}
			}
		} else if (actor.hormoneBalance <= -100) {
			if (actor.face < 100) {
				if (random(1, 100) > 70) {
					actor.face -= 20;
				}
			}
		} else {
			if (actor.face > 60) {
				if (random(1, 100) > 90) {
					actor.face += 5;
				}
			} else if (actor.face <= 60) {
				if (random(1, 100) > 40) {
					actor.face += 10;
				}
			}
		}
	}

	/**
	 * @param {FC.HumanState} actor
	 */
	function increaseFaceXY(actor) {
		if (actor.hormoneBalance >= 200) {
			if (actor.face > 60) {
				if (random(1, 100) > 80) {
					actor.face += 5;
				}
			} else if (actor.face <= 60) {
				if (random(1, 100) > 50) {
					actor.face += 10;
				}
			}
		} else if (actor.hormoneBalance >= 100) {
			if (actor.face > 60) {
				if (random(1, 100) > 80) {
					actor.face += 10;
				}
			}
		}
	}

	/**
	 * @param {FC.HumanState} actor
	 */
	function increaseVoiceXX(actor) {
		if (actor.hormoneBalance >= 200) {
			if (actor.voice === 3) {
				if (random(1, 100) > 90) {
					actor.voice--;
				}
			}
		} else if (actor.hormoneBalance >= 100) {
			if (actor.voice === 3) {
				if (random(1, 100) > 80) {
					actor.voice--;
				}
			}
		} else if (actor.hormoneBalance <= -200) {
			if (actor.voice <= 3) {
				if (random(1, 100) > 30) {
					actor.voice--;
				}
			}
		} else if (actor.hormoneBalance <= -100) {
			if (actor.voice <= 3) {
				if (random(1, 100) > 60) {
					actor.voice--;
				}
			}
		} else {
			if (actor.voice === 3) {
				if (random(1, 100) > 60) {
					actor.voice--;
				}
			}
		}
	}

	/**
	 * @param {FC.HumanState} actor
	 */
	function increaseVoiceXY(actor) {
		if (actor.hormoneBalance >= 200) {
			if (actor.voice < 2) {
				if (random(1, 100) > 50) {
					actor.voice--;
				}
			}
		} else if (actor.hormoneBalance >= 100) {
			if (actor.voice < 3) {
				if (random(1, 100) > 50) {
					actor.voice--;
				}
			}
		} else if (actor.hormoneBalance <= -200) {
			if (actor.voice > 1) {
				if (random(1, 100) > 10) {
					actor.voice--;
				}
			}
		} else if (actor.hormoneBalance <= -100) {
			if (actor.voice > 1) {
				if (random(1, 100) > 30) {
					actor.voice--;
				}
			}
		} else {
			if (actor.voice > 1) {
				if (random(1, 100) > 60) {
					actor.voice--;
				}
			}
		}
	}

	/**
	 * @param {FC.HumanState} actor
	 */
	function increasePregAdaptationXX(actor) {
		if (physicalAgeSwap === 3) {
			if (actor.pregAdaptation < 5) {
				actor.pregAdaptation = 5;
			}
		} else if (physicalAgeSwap === 4) {
			if (actor.pregAdaptation < 5) {
				actor.pregAdaptation++;
			}
		} else if (physicalAgeSwap === 5) {
			if (actor.pregAdaptation < 5) {
				actor.pregAdaptation++;
			}
		} else if (physicalAgeSwap === 6) {
			if (actor.pregAdaptation < 5) {
				actor.pregAdaptation++;
			}
		} else if (physicalAgeSwap === 7) {
			if (actor.pregAdaptation < 6) {
				actor.pregAdaptation++;
			}
		} else if (physicalAgeSwap === 8) {
			if (actor.pregAdaptation < 7) {
				actor.pregAdaptation++;
			}
		} else if (physicalAgeSwap === 9) {
			if (actor.pregAdaptation < 8) {
				actor.pregAdaptation++;
			}
		} else if (physicalAgeSwap === 10) {
			if (actor.pregAdaptation < 9) {
				actor.pregAdaptation++;
			}
		} else if (physicalAgeSwap === 11) {
			if (actor.pregAdaptation < 10) {
				actor.pregAdaptation++;
			}
		} else if (physicalAgeSwap === 12) {
			if (actor.pregAdaptation < 14) {
				actor.pregAdaptation += 4;
			}
		} else if (physicalAgeSwap === 13) {
			if (actor.pregAdaptation < 18) {
				actor.pregAdaptation += 4;
			}
		} else if (physicalAgeSwap === 14) {
			if (actor.pregAdaptation < 22) {
				actor.pregAdaptation += 4;
			}
		} else if (physicalAgeSwap === 15) {
			if (actor.pregAdaptation < 28) {
				actor.pregAdaptation += 6;
			}
		} else if (physicalAgeSwap === 16) {
			if (actor.pregAdaptation < 34) {
				actor.pregAdaptation += 6;
			}
		} else if (physicalAgeSwap === 17) {
			if (actor.pregAdaptation < 42) {
				actor.pregAdaptation += 8;
			}
		} else if (physicalAgeSwap === 18) {
			if (actor.pregAdaptation < 50) {
				actor.pregAdaptation += 8;
			}
		}
	}

	/**
	 * @param {FC.HumanState} actor
	 */
	function increasePregAdaptationXY(actor) {
		if (physicalAgeSwap === 3) {
			if (actor.pregAdaptation < 5) {
				actor.pregAdaptation = 5;
			}
		} else if (physicalAgeSwap === 4) {
			if (actor.pregAdaptation < 5) {
				actor.pregAdaptation++;
			}
		} else if (physicalAgeSwap === 5) {
			if (actor.pregAdaptation < 5) {
				actor.pregAdaptation++;
			}
		} else if (physicalAgeSwap === 6) {
			if (actor.pregAdaptation < 5) {
				actor.pregAdaptation++;
			}
		} else if (physicalAgeSwap === 7) {
			if (actor.pregAdaptation < 6) {
				actor.pregAdaptation++;
			}
		} else if (physicalAgeSwap === 8) {
			if (actor.pregAdaptation < 7) {
				actor.pregAdaptation++;
			}
		} else if (physicalAgeSwap === 9) {
			if (actor.pregAdaptation < 8) {
				actor.pregAdaptation++;
			}
		} else if (physicalAgeSwap === 10) {
			if (actor.pregAdaptation < 9) {
				actor.pregAdaptation++;
			}
		} else if (physicalAgeSwap === 11) {
			if (actor.pregAdaptation < 10) {
				actor.pregAdaptation++;
			}
		} else if (physicalAgeSwap === 12) {
			if (actor.pregAdaptation < 12) {
				actor.pregAdaptation += 2;
			}
		} else if (physicalAgeSwap === 13) {
			if (actor.pregAdaptation < 14) {
				actor.pregAdaptation += 2;
			}
		} else if (physicalAgeSwap === 14) {
			if (actor.pregAdaptation < 16) {
				actor.pregAdaptation += 2;
			}
		} else if (physicalAgeSwap === 15) {
			if (actor.pregAdaptation < 18) {
				actor.pregAdaptation += 2;
			}
		} else if (physicalAgeSwap === 16) {
			if (actor.pregAdaptation < 20) {
				actor.pregAdaptation += 2;
			}
		} else if (physicalAgeSwap === 17) {
			if (actor.pregAdaptation < 20) {
				actor.pregAdaptation += 2;
			}
		} else if (physicalAgeSwap === 18) {
			if (actor.pregAdaptation < 20) {
				actor.pregAdaptation += 2;
			}
		}
	}
};
