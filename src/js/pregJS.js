/* Major props to the anons who worked together to forge the Super Pregnancy Project. Let your legacy go unforgotten.*/
globalThis.getPregBellySize = function(s) {
	let targetLen;
	let gestationWeek = s.preg;
	let fetuses = s.pregType;
	let phi = 1.618;

	if (gestationWeek <= 32) {
		targetLen = ((0.00006396 * Math.pow(gestationWeek, 4)) - (0.005501 * Math.pow(gestationWeek, 3)) + (0.161 * Math.pow(gestationWeek, 2)) - (0.76 * gestationWeek) + 0.208);
	} else if (gestationWeek <= 106) {
		targetLen = ((-0.0000004675 * Math.pow(gestationWeek, 4)) + (0.0001905 * Math.pow(gestationWeek, 3)) - (0.029 * Math.pow(gestationWeek, 2)) + (2.132 * gestationWeek) - 16.575);
	} else {
		targetLen = ((-0.00003266 * Math.pow(gestationWeek, 2)) + (0.076 * gestationWeek) + 43.843);
	}

	return ((4 / 3) * (Math.PI) * (phi / 2) * (Math.pow((targetLen / 2), 3)) * fetuses);
};

/** calculates and returns expected ovum count during conception
 * @param {FC.HumanState} actor
 */
globalThis.setPregType = function(actor) {
	/* IMHO rework is possible. Can be more interesting to play, if this code will take in account more body conditions - age, fat, food, hormone levels, etc. */

	let ovum = jsRandom(actor.pregData.normalOvaMin, actor.pregData.normalOvaMax); // for default human profile it's always 1.
	let fertilityStack = 0; // adds an increasing bonus roll for stacked fertility drugs
	let wombCapacity = Math.floor(actor.pregAdaptation / 15); // Used for a gene mod
	let minFertStack = 0;
	// reproduction formula applies to PCs that eat slave food, and slaves that have been here for at least one week
	const reproductionFormulaApplies = (V.reproductionFormula === 1) && (actor.ID === -1 ? !canEatFood(asPlayer(actor)) : (V.week - asSlave(actor).weekAcquired > 0));
	// master suite fertility applies when the option is set and the actor is a slave that is in the master suite
	const masterSuiteFertilityApplies = V.masterSuitePregnancyFertilitySupplements === 1 && asSlave(actor) && [Job.MASTERSUITE, Job.CONCUBINE].includes(asSlave(actor).assignment);

	/* Suggestion for better animal pregnancy support - usage of another variable then ovum for fertility drugs bonus, and then adding actor.pregData.drugsEffect multiplier to it before adding to ovum. Example:

		let bonus = 0;

		... (code below where ovum changed to bonus)

		bonus *= actor.pregData.drugsEffect;
		ovum += bonus;

	*/

	if (actor.broodmother < 1) { // Broodmothers should be not processed here. Necessary now.
		if (typeof actor.readyOva === "number" && actor.readyOva !== 0) {
			ovum = actor.readyOva; // just single override; for delayed impregnation cases
		} else {
			if (actor.eggType === "horse" || actor.eggType === "cow") {
				if (actor.geneticQuirks.fertility === 2 && actor.geneticQuirks.hyperFertility === 2) { // Do not mix with sperm
					ovum += jsEither([0, 0, 0, 0, 0, 0, 1]);
					fertilityStack += 0.8;
				} else if (actor.geneticQuirks.hyperFertility === 2) { // Predisposed to multiples
					fertilityStack += 0.4;
				} else if (actor.geneticQuirks.fertility === 2) { // Predisposed to twins
					fertilityStack += 0.2;
				}
				if (actor.ovaImplant === "fertility") {
					fertilityStack += 0.3;
				}
				if (actor.hormones === 2) {
					fertilityStack += 0.2;
				}
				if (actor.hormoneBalance >= 200) {
					fertilityStack += 0.3;
				}
				if (actor.diet === "fertility") {
					fertilityStack += 0.3;
				}
				if (masterSuiteFertilityApplies) {
					fertilityStack += 0.5;
				}
				if (reproductionFormulaApplies) {
					fertilityStack += 0.2;
				}
				if (actor.drugs === "super fertility drugs") {
					fertilityStack += 1.6;
				} else if (actor.drugs === "fertility drugs") {
					fertilityStack += 0.6;
				}
				fertilityStack = Math.floor(fertilityStack);
				if (V.seeHyperPreg === 1) {
					if (actor.drugs === "super fertility drugs") {
						ovum += jsRandom(0, fertilityStack * 2);
					} else {
						ovum += jsRandom(0, fertilityStack);
					}
					if (actor.ovaImplant === "sympathy") {
						ovum *= 2;
					}
				} else {
					ovum += jsRandom(0, fertilityStack);
					if (actor.ovaImplant === "sympathy") {
						ovum *= 2;
						if (ovum > 4) {
							ovum = 4;
						}
					} else if (ovum > 3) {
						ovum = 3;
					}
				}
			} else if (actor.eggType === "dog") {
				if (actor.geneticQuirks.fertility === 2 && actor.geneticQuirks.hyperFertility === 2) { // Do not mix with sperm
					ovum += jsEither([1, 2, 2, 3]);
					fertilityStack++;
					fertilityStack++;
					fertilityStack++;
				} else if (actor.geneticQuirks.hyperFertility === 2) { // Predisposed to multiples
					ovum += jsEither([0, 1, 1, 2]);
					fertilityStack++;
					fertilityStack++;
				} else if (actor.geneticQuirks.fertility === 2) { // Predisposed to twins
					ovum += jsEither([0, 0, 0, 0, 1]);
					fertilityStack++;
				}
				if (actor.ovaImplant === "fertility") {
					ovum += jsEither([0, 0, 0, 0, 1]);
					fertilityStack++;
				}
				if (actor.hormones === 2) {
					ovum += jsEither([0, 0, 0, 1, 1, 1, 1, 2]);
					fertilityStack++;
				}
				if (actor.hormoneBalance >= 200) {
					ovum += jsEither([0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2]);
					fertilityStack++;
				}
				if (actor.diet === "fertility") {
					ovum += jsEither([0, 0, 0, 0, 0, 0, 0, 0, 1]);
					fertilityStack++;
				}
				if (masterSuiteFertilityApplies) {
					ovum += jsEither([0, 0, 0, 1, 1, 2, 2, 2, 3, 3]);
					fertilityStack++;
					fertilityStack++;
				}
				if (reproductionFormulaApplies) {
					fertilityStack++;
				}
				if (actor.drugs === "super fertility drugs") {
					ovum += jsEither([1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5]);
					fertilityStack++;
					fertilityStack++;
					fertilityStack++;
					fertilityStack++;
					fertilityStack++;
				} else if (actor.drugs === "fertility drugs") {
					ovum += jsEither([0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3]);
					fertilityStack++;
				}
				if (V.seeHyperPreg === 1) {
					if (actor.drugs === "super fertility drugs") {
						ovum += jsRandom(0, fertilityStack * 2);
					} else {
						ovum += jsRandom(0, fertilityStack);
					}
					if (actor.ovaImplant === "sympathy") {
						ovum *= 2;
					}
				} else {
					ovum += jsRandom(0, fertilityStack);
					if (actor.ovaImplant === "sympathy") {
						ovum *= 2;
						if (ovum > 8) {
							ovum = jsEither([6, 8]);
						}
					} else if (ovum > 8) {
						ovum = jsRandom(6, 8);
					}
				}
			} else if (actor.eggType === "pig") {
				if (actor.geneticQuirks.fertility === 2 && actor.geneticQuirks.hyperFertility === 2) { // Do not mix with sperm
					ovum += jsRandom(4, 8);
					fertilityStack += 16;
				} else if (actor.geneticQuirks.hyperFertility === 2) { // Predisposed to multiples
					ovum += jsRandom(2, 6);
					fertilityStack += 10;
				} else if (actor.geneticQuirks.fertility === 2) { // Predisposed to twins
					ovum += jsRandom(2, 4);
					fertilityStack += 6;
				}
				if (actor.ovaImplant === "fertility") {
					ovum += jsRandom(4, 12);
					fertilityStack += 6;
				}
				if (actor.hormones === 2) {
					ovum += jsRandom(0, 4);
					fertilityStack += 3;
				}
				if (actor.hormoneBalance >= 200) {
					ovum += jsRandom(0, 4);
					fertilityStack += 3;
				}
				if (actor.diet === "fertility") {
					ovum += jsRandom(4, 10);
					fertilityStack += 6;
				}
				if (masterSuiteFertilityApplies) {
					ovum += jsRandom(8, 16);
					fertilityStack += 10;
				}
				if (reproductionFormulaApplies) {
					fertilityStack += 2;
				}
				if (actor.drugs === "super fertility drugs") {
					ovum += jsRandom(10, 40);
					fertilityStack += 32;
				} else if (actor.drugs === "fertility drugs") {
					ovum += jsRandom(10, 20);
					fertilityStack += 16;
				}
				if (V.seeHyperPreg === 1) {
					if (actor.drugs === "super fertility drugs") {
						ovum += jsRandom(fertilityStack / 2, fertilityStack * 2);
					} else {
						ovum += jsRandom(fertilityStack / 4, fertilityStack);
					}
					if (actor.ovaImplant === "sympathy") {
						ovum *= 2;
					}
				} else {
					ovum += jsRandom(0, fertilityStack);
					if (actor.ovaImplant === "sympathy") {
						ovum *= 2;
						if (ovum > 76) {
							ovum = jsEither([70, 72, 74, 76]);
						}
					} else if (ovum > 75) {
						ovum = jsRandom(60, 75);
					}
				}
			} else {
				if (actor.geneticQuirks.fertility === 2 && actor.geneticQuirks.hyperFertility === 2) { // Do not mix with sperm
					ovum += jsEither([1, 2, 2, 3]);
					fertilityStack++;
					fertilityStack++;
					fertilityStack++;
					fertilityStack++;
				} else if (actor.geneticQuirks.hyperFertility === 2) { // Predisposed to multiples
					ovum += jsEither([0, 1, 1, 2]);
					fertilityStack++;
					fertilityStack++;
				} else if (actor.geneticQuirks.fertility === 2) { // Predisposed to twins
					ovum += jsEither([0, 0, 0, 0, 1]);
					fertilityStack++;
				} else {
					ovum += jsEither([0, 0, 0, 0, 0, 0, 0, 0, 0, 1]); // base chance for twins
				}
				if (actor.ovaImplant === "fertility") {
					ovum += jsEither([0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
					fertilityStack++;
				}
				if (actor.hormones === 2) {
					ovum += jsEither([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2]);
					fertilityStack++;
				}
				if (actor.hormoneBalance >= 200) {
					ovum += jsEither([0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2]);
					fertilityStack++;
				}
				if (actor.diet === "fertility") {
					ovum += jsEither([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
					fertilityStack++;
				}
				if (actor.ID === -1) {
					if (asPlayer(actor).forcedFertDrugs > 0) {
						ovum += jsEither([1, 1, 1, 1, 1, 2, 2, 2, 3]);
						fertilityStack++;
						fertilityStack++;
					}
				} else {
					if (masterSuiteFertilityApplies) {
						ovum += jsEither([0, 0, 0, 1, 1, 2, 2, 2, 3, 3]);
						fertilityStack++;
						fertilityStack++;
					}
				}
				if (reproductionFormulaApplies) {
					fertilityStack++;
				}
				if (actor.drugs === "super fertility drugs") {
					ovum += jsEither([1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5]);
					fertilityStack++;
					fertilityStack++;
					fertilityStack++;
					fertilityStack++;
					fertilityStack++;
				} else if (actor.drugs === "fertility supplements") {
					ovum += jsEither([0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2]);
					fertilityStack++;
				} else if (actor.drugs === "fertility drugs") {
					ovum += jsEither([0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3]);
					fertilityStack++;
				}
				if (actor.geneMods.livestock === 1) {
					ovum += Math.max(0, ovum - wombCapacity);
				}
				if (actor.geneMods.progenitor === 1) {
					minFertStack = fertilityStack;
					fertilityStack += wombCapacity;
				}
				if (V.seeHyperPreg === 1) {
					if (actor.drugs === "super fertility drugs") {
						ovum += jsRandom(minFertStack, fertilityStack * 2);
					} else {
						ovum += jsRandom(minFertStack, fertilityStack);
					}
					if (actor.ovaImplant === "sympathy") {
						ovum *= 2;
					}
				} else {
					ovum += jsRandom(minFertStack, fertilityStack);
					if (actor.ovaImplant === "sympathy") {
						ovum *= 2;
						if (ovum > 12) {
							ovum = jsEither([10, 12]);
						}
					} else if (ovum > 12) {
						ovum = jsRandom(6, 12);
					}
				}
				if (actor.ID === -1) { // temp until player birth is redone
					ovum = Math.clamp(ovum, 0, 8);
				}
			}
		}
	}

	if (actor.geneticQuirks.superfetation === 2 && actor.womb.length > 0) {
		let ftVol = FetusGetPrediction(actor, actor.pregData.normalBirth);
		let cmVol = ftVol * actor.womb.length;
		let maxVol = actor.pregAdaptation * 2000;
		if (V.seeHyperPreg === 0) {
			maxVol /= 10; // without hyperpreg enabled it's limited to be roughly ten times smaller.
		}
		let freeVol = maxVol - cmVol;
		let coeff = ((maxVol / actor.womb.length) / (freeVol / ftVol)) / 2; // more divide to 2 is to balance for ensured 1 ova even if over limit.

		if (coeff < 0) { coeff = 0; }

		if (V.seeHyperPreg !== 0) {
			// This is a second chance for implantation.
			// Should be affected only by chemical and genetic for easier implantation.
			// Not directly related to ova count, only to body/womb condition.
			// Raise successful implantation chance with already overfull womb. AFTER previous check.
			coeff += jsRandom(0, fertilityStack / 2);
		}

		if (ovum > coeff) {
			ovum = coeff;
		}

		/* for future, if monthly cycle will be a thing to implement, this will be useful.
		if (ovum < 0)
			ovum = jsRandom(coeff/fertilityStack, 1);
		*/
		if (ovum < 1) { ovum = 1; }

		// console.log("Name: ", actor.slaveName, " ftVol:", ftVol, " cmVol:", cmVol, " maxVol:", maxVol, " freeVol:", freeVol, " coeff:", coeff, " fertilityStack: ", fertilityStack, " ovum: ", ovum);
	}

	return Math.ceil(ovum);
};

/** Attempt to get a slave pregnant
 * Penetrative ability, ability to become pregnant, and canBreed() must be checked outside of this. Designed to assume .eggType === "human".
 * @param {App.Entity.SlaveState | App.Entity.PlayerState} target is the slave to get pregnant. Also accepts the PC.
 * @param {number} chance is the % chance to conceive.
 * @param {0|1|2} hole control's the hole involved (0 - vagina, 1 - ass, 2 - both). .mpreg did this.
 * @param {number} [fatherID] is the ID of her sire or 0 if undefined.
 * @returns {string} Returns "${He} has become pregnant." if relevant
 */
globalThis.knockMeUp = function(target, chance, hole, fatherID) {
	let r = ``;
	if (V.seePreg !== 0) {
		if (target.geneMods.progenitor === 1) {
			chance += 20;
		}
		let father = findFather(fatherID);
		if (father !== undefined) {
			if (father.geneMods.aggressiveSperm === 1) {
				chance += 75;
				// While I would like to give a chance of self-impreg here, the risk of recursion seems high.
			}
			if (father.geneticQuirks.potent === 2) {
				chance *= 1.5;
			}
			if (V.seeIncest === 0 && areRelated(target, father)) {
				chance = -100;
			}
		}
		// eslint-disable-next-line no-nested-ternary
		if (jsRandom(0, 99) < (chance + (V.reproductionFormula * ((target.pregSource <= 0) ? ((target.ID === -1) ? 0 : 10) : 20)))) {
			if (target.mpreg === hole || hole === 2) {
				if (target.pregWeek <= 0) {
					target.preg = 1;
					target.pregSource = (!fatherID ? 0 : fatherID);
					if (target.ID !== -1) {
						target.pregWeek = 1;
					}
				}

				target.pregType = setPregType(target);
				WombImpregnate(target, target.pregType, fatherID, 1);

				if (V.menstruation === 1) {
					//
				} else {
					target.pregKnown = 1;
					if (target.ID === -1) {
						/* r += "<span class="lime">You have gotten pregnant.</span>"; */
					} else {
						const {He} = getPronouns(target);
						r += `<span class="lime">${He} has become pregnant.</span>`;
					}
					if (target.geneticQuirks.superfetation === 2 && target.womb.length > 0) {
						if (V.seeHyperPreg === 1) {
							target.fertPeak = 1;
						} else {
							target.fertPeak = 4;
						}
					}
				}
			}
		}
	}
	return r;
};

/** Attempt to get an actor pregnant with another actor's child.
 * Assumes that sperm is at the point of meeting the egg, so check penetrative ability outside of this.
 * Technically deprecates canImpreg() and canFemImpreg().
 * @param {App.Entity.SlaveState | App.Entity.PlayerState} mother is the actor attempting to become pregnant.
 * @param {number} chance is the % chance to conceive.
 * @param {0|1|2} hole control's the hole involved (0 - vagina, 1 - ass, 2 - both).
 * @param {App.Entity.SlaveState | App.Entity.PlayerState} father is the actor doing the impregnating.
 * @returns {string} Returns "${He} has become pregnant." if relevant
 */
globalThis.tryKnockMeUp = function(mother, chance, hole, father) {
	let r = ``;
	if (V.seePreg !== 0) {
		if (canBreed(mother, father)) {
			if (mother.geneMods.progenitor === 1) {
				chance += 20;
			}
			if (father.geneMods.aggressiveSperm === 1) {
				chance += 75;
			}
			if (V.reproductionFormula) {
				if (mother.ID !== -1) {
					chance += 10;
				}
				if (father.ID !== -1) {
					chance += 10;
				}
			}
			if (father.geneticQuirks.potent === 2) {
				if (chance > 0) {
					chance *= 1.5;
				} else {
					chance += 10;
				}
			}
			if (!isVirile(father) || !isFertile(mother) || (V.seeIncest === 0 && areRelated(mother, father))) {
				chance = -10000;
			}
			if (mother.preg === -1) {
				chance -= 350; // Allows making sperm so potent that they can overpower contraceptives. Shouldn't be possible at this value, but why stop a player from tweaking this if it's their thing?
			}
			if (mother.eggType !== father.ballType) { // Special case for fantasy races to create half-breeds.
				chance -= 20;
			}
			if (random(0, 99) < chance) {
				if (mother.mpreg === hole || hole === 2) {
					if (mother.pregWeek <= 0) {
						mother.preg = 1;
						mother.pregSource = father.ID;
						if (mother.ID !== -1) {
							mother.pregWeek = 1;
						}
					}

					mother.pregType = setPregType(mother);
					WombImpregnate(mother, mother.pregType, father.ID, 1);

					if (V.menstruation === 1) {
						//
					} else {
						mother.pregKnown = 1;
						if (mother.ID === -1) {
							/* r += "<span class="lime">You have gotten pregnant.</span>"; */
						} else {
							const {He, him} = getPronouns(mother);
							if (father.ID === -1) {
								r += `<span class="lime">${He} has become pregnant.</span>`;
							} else {
								r += `<span class="lime">${father.slaveName} has gotten ${him} pregnant.</span>`;
							}
						}
						if (mother.geneticQuirks.superfetation === 2 && mother.womb.length > 0) {
							if (V.seeHyperPreg === 1) {
								mother.fertPeak = 1;
							} else {
								mother.fertPeak = 4;
							}
						}
					}
				}
			}
		}
	}
	return r;
};

globalThis.getIncubatorReserved = function( /* slaves */ ) {
	return FetusGlobalReserveCount("incubator");
};

globalThis.getNurseryReserved = function( /* slaves */ ) {
	return FetusGlobalReserveCount("nursery");
};

/** Find a slave's by ID, if they are also one of your slaves, wherever they may be
 * Note: not specific to fathers, though that's the most common use.
 * @param {number} fatherID
 * @returns {FC.HumanState}
 */
globalThis.findFather = function(fatherID) {
	/** @type {FC.HumanState} */
	let father = getSlave(fatherID);
	if (fatherID === -1) {
		father = V.PC;
	}
	if (father === undefined) {
		if (V.incubator.capacity > 0) {
			father = V.incubator.tanks.find(s => s.ID === fatherID);
		}
	}
	if (father === undefined) {
		if (V.nursery > 0) {
			father = V.cribs.find(s => s.ID === fatherID);
		}
	}

	return father;
};

/* not to be used until that last part is defined. It may become slave.boobWomb.volume or some shit
 * TODO update App.Medicine.fleshSize() when boobsWombVolume comes unto existence
*/
/**
 * @param {App.Entity.SlaveState} slave
 * @returns {number}
 */
globalThis.getBaseBoobs = function(slave) {
	return slave.boobs - slave.boobsImplant - slave.boobsMilk - slave.boobsWombVolume;
};

/**
 * Terminate a pregnancy without birth (i.e. miscarriage/abortion), while automatically applying the correct postpartum length
 * @param {App.Entity.SlaveState | App.Entity.PlayerState} slave
 */
globalThis.TerminatePregnancy = function(slave) {
	if (slave.bellyPreg > 1500) {
		// late term - highly fertile slaves spring back quicker
		if ((slave.geneticQuirks.fertility + slave.geneticQuirks.hyperFertility >= 4) || slave.geneMods.progenitor === 1) {
			slave.pregWeek = -2;
		} else if (slave.geneticQuirks.hyperFertility > 1) {
			slave.pregWeek = -3;
		} else {
			slave.pregWeek = -4;
		}
	} else if (slave.pregWeek >= 4) {
		// still early
		slave.pregWeek = -2;
	} else if (slave.pregWeek > 0) {
		// very early
		slave.pregWeek = -1;
	}
	WombFlush(slave);
	SetBellySize(slave);
};
