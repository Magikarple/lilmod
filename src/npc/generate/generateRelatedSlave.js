globalThis.generateRelatedSlave = (function() {
	let sourceID;

	/**
	 * Generate a very similar relative for an existing slave (for use in Household Liquidators, for example).
	 * @param {App.Entity.SlaveState} slave - the source relative. Note: this slave is NOT changed, calling code is responsible for setting up the source end of the relationship!
	 * @param {string} relationship - the relationship that the new relative has with the source. Currently supports "parent", "child", "older sibling", "younger sibling", "twin", and applicable gender-specific variants of those (i.e. mother/father, daughter/son, older/younger brother/sister).
	 * @param {boolean} oppositeSex - set to true if the new relative should be the opposite sex of the old one (otherwise it will be the same sex). will be ignored if gender is implied by relationship.
	 * @returns {App.Entity.SlaveState} - new relative
	 */
	function generateRelative(slave, relationship, oppositeSex=false) {
		let relative = prepareClone(slave);

		({relationship, oppositeSex} = interpretGenderSpecificRelationship(slave, relationship, oppositeSex));
		if (relationship === "twin") {
			makeTwin(relative);
		} else if (relationship === "child") {
			makeChild(relative, slave.genes);
		} else if (relationship === "parent") {
			const father = (slave.genes === "XX" && oppositeSex) || (slave.genes === "XY" && !oppositeSex);
			makeParent(relative, father);
		} else if (relationship === "younger sibling") {
			makeYoungerSibling(relative);
		} else if (relationship === "older sibling") {
			makeOlderSibling(relative);
		} else {
			throw Error(`Unknown relationship: ${relationship}`);
		}
		if (oppositeSex) {
			if (slave.genes === "XX") {
				changeSexToXY(relative);
			} else if (slave.genes === "XY") {
				changeSexToXX(relative);
			} else {
				// we'll assume futa are their own opposites and don't need tweaking
			}
		}
		generateGivenName(relative); // must happen *after* any possible sex change
		// perform age-related adjustment for all relatives *except* same-sex twins (preserve identicality)
		if (relative.actualAge !== slave.actualAge || oppositeSex) {
			ageFixup(relative);
		}
		resetStatus(relative);

		return relative;
	}

	/**
	 * Split a gender-specific relationship into a gender-neutral relationship and a base-slave-relative gender toggle
	 * @param {App.Entity.SlaveState} slave
	 * @param {string} relationship
	 * @param {boolean} oppositeSex - original value of oppositeSex (will be copied unchanged if not overridden)
	 * @returns {{relationship: string, oppositeSex: boolean}}
	 */
	function interpretGenderSpecificRelationship(slave, relationship, oppositeSex) {
		/** @param {string} genes - expected genes for this case
		 * @returns {boolean} - whether genes match slave or not */
		function isOppositeSex(genes) { return slave.genes !== genes; }

		if (relationship === "daughter") {
			return {relationship: "child", oppositeSex: isOppositeSex("XX")};
		} else if (relationship === "son") {
			return {relationship: "child", oppositeSex: isOppositeSex("XY")};
		} else if (relationship === "mother") {
			return {relationship: "parent", oppositeSex: isOppositeSex("XX")};
		} else if (relationship === "father") {
			return {relationship: "parent", oppositeSex: isOppositeSex("XY")};
		} else {
			const bits = relationship.split(" ");
			if (bits.length === 2) {
				if (bits[0] === "younger" || bits[0] === "older") {
					if (bits[1] === "sister") {
						return {relationship: `${bits[0]} sibling`, oppositeSex: isOppositeSex("XX")};
					} else if (bits[1] === "brother") {
						return {relationship: `${bits[0]} sibling`, oppositeSex: isOppositeSex("XY")};
					}
				}
			}
		}
		return {relationship: relationship, oppositeSex: oppositeSex};
	}

	/**
	 * Clone the original slave and do some common preparations to it.
	 * @param {App.Entity.SlaveState} slave - the source relative
	 * @returns {App.Entity.SlaveState} - the new relative
	 */
	function prepareClone(slave) {
		let relative = clone(slave);

		// regenerate accent
		nationalityToAccent(relative);

		// fuzz trust/devotion
		relative.devotion += random(-5, 5);
		relative.oldDevotion = relative.devotion;
		relative.trust += random(-5, 5);
		relative.oldTrust = relative.trust;

		// fuzz attraction and energy
		relative.attrXX += random(-20, 20);
		relative.attrXX = Math.clamp(relative.attrXX, 0, 100);
		relative.attrXY += random(-20, 20);
		relative.attrXY = Math.clamp(relative.attrXX, 0, 100);
		relative.energy += random(-20, 20);

		// store old ID and set the new ID
		sourceID = slave.ID;
		relative.ID = generateSlaveID();

		return relative;
	}

	/**
	 * Generate a new given name for the slave (keeping the surname).
	 * @param {App.Entity.SlaveState} slave - the new relative to be renamed
	 */
	function generateGivenName(slave) {
		const surname = slave.slaveSurname;
		const birthSurname = slave.birthSurname;
		nationalityToName(slave);
		slave.slaveSurname = surname;
		slave.birthSurname = birthSurname;
	}

	/**
	 * Finish configuring an identical twin
	 * @param {App.Entity.SlaveState} slave - the new twin
	 */
	function makeTwin(slave) {
		/* twins are physically identical, change only mental traits. */
		randomizeFetishFlaws(slave);
	}

	/**
	 * Finish configuring a sibling
	 * @param {App.Entity.SlaveState} slave - the new sibling
	 */
	function makeYoungerSibling(slave) {
		// reduce age
		slave.actualAge -= random(2, 6);
		slave.actualAge = Math.max(slave.actualAge, V.minimumSlaveAge);
		slave.visualAge = slave.actualAge;
		slave.physicalAge = slave.actualAge;
		slave.ovaryAge = slave.actualAge;
		slave.birthWeek = random(0, 51);

		fuzzPhysicalTraits(slave);

		randomizeFetishFlaws(slave);
	}

	/**
	 * Finish configuring a sibling
	 * @param {App.Entity.SlaveState} slave - the new sibling
	 */
	function makeOlderSibling(slave) {
		// increase age
		const maxDifference = (V.retirementAge - 1) - slave.actualAge;
		const ageDifference = Math.min(random(2, 6), maxDifference);
		fastForward(slave, ageDifference);
		slave.birthWeek = random(0, 51);

		fuzzPhysicalTraits(slave);

		randomizeFetishFlaws(slave);
	}

	/**
	 * Finish configuring a child
	 * @param {App.Entity.SlaveState} slave - the new child
	 * @param {string} parentSex - the sex of the parent
	 */
	function makeChild(slave, parentSex) {
		slave.mother = parentSex === "XX" ? sourceID : 0;
		slave.father = parentSex !== "XX" ? sourceID : 0;

		// select age
		const parentAge = slave.actualAge;
		let maxAge = Math.min(22, Math.max(V.minimumSlaveAge, parentAge - 11));
		let minAge = Math.min(Math.max(8, V.minimumSlaveAge), maxAge);
		if (V.pedo_mode === 1) {
			minAge = V.minimumSlaveAge;
		}
		slave.actualAge = random(minAge, maxAge);
		slave.visualAge = slave.actualAge;
		slave.physicalAge = slave.actualAge;
		slave.ovaryAge = slave.actualAge;
		slave.birthWeek = random(0, 51);

		// child always has less devotion/trust
		slave.devotion -= 10;
		slave.trust -= 10;

		// child always has less boobs/butt than mother
		if (parentSex === "XX") {
			slave.boobs -= 100;
			slave.butt -= 1;
		}

		fuzzPhysicalTraits(slave);

		// daughter has never had children and is likely a virgin
		if (slave.genes === "XX") {
			slave.vagina = either(0, 0, 0, 1);
			slave.counter.birthsTotal = 0;
		}

		randomizeFetishFlaws(slave);
	}

	/**
	 * Finish configuring a parent
	 * @param {App.Entity.SlaveState} slave - the new parent
	 * @param {boolean} father - is the parent going to be a father or a mother?
	 */
	function makeParent(slave, father) {
		slave.mother = 0;
		slave.father = 0;

		// select age
		const ageRange = getParentAgeRange(slave, father);
		if (ageRange.min > ageRange.max) {
			throw Error("Cannot generate parent (slave too old)");
		}
		const targetAge = random(ageRange.min, ageRange.max);
		fastForward(slave, targetAge - slave.actualAge);
		slave.birthWeek = random(0, 51);

		// parent always has less devotion/trust
		slave.devotion -= 10;
		slave.trust -= 10;

		// mother always has more boobs/butt
		if (!father) {
			slave.boobs += 100;
			slave.butt += 1;
		}

		fuzzPhysicalTraits(slave);

		// mother has had one child (at least)
		if (!father) {
			slave.vagina = Math.max(slave.vagina, 1);
			slave.counter.birthsTotal = 1;
		}

		randomizeFetishFlaws(slave);
	}

	/**
	 * Fuzz some physical traits so we don't start out identical
	 * @param {App.Entity.SlaveState} slave
	 */
	function fuzzPhysicalTraits(slave) {
		// fuzz boobs/butt
		if (slave.boobs > 200) {
			const fuzz = either(-100, 0, 100);
			slave.boobs += fuzz;
			slave.natural.boobs += fuzz;
		}
		if (slave.butt > 1) {
			slave.butt += random(-1, 1);
		}
		// fuzz height
		const heightAdjust = random(-5, Math.min(maxHeight(slave) - slave.height, 5));
		slave.natural.height += heightAdjust;
		slave.height += heightAdjust;
		// reset art seed
		slave.natural.artSeed = jsRandom(0, 10 ** 14);
	}

	/**
	 * Randomize fetish and flaws
	 * @param {App.Entity.SlaveState} slave
	 */
	function randomizeFetishFlaws(slave) {
		slave.fetishStrength = random(0, 90);
		slave.fetish = either("buttslut", "cumslut", "dom", "humiliation", "masochist", "boobs", "none", "none", "none", "none", "none", "none", "pregnancy", "sadist", "submissive");
		slave.behavioralFlaw = either("anorexic", "arrogant", "bitchy", "devout", "gluttonous", "hates men", "hates women", "liberated", "none", "none", "none", "odd");
		if (slave.behavioralFlaw === "devout") {
			slave.sexualFlaw = either("apathetic", "none", "repressed", "shamefast");
		} else {
			slave.sexualFlaw = either("apathetic", "crude", "hates anal", "hates oral", "hates penetration", "idealistic", "judgemental", "none", "none", "none", "none", "repressed", "shamefast");
		}
		randomizeAttraction(slave);
	}

	/**
	 * Fix age-related factors such as physical immaturity, height, etc
	 * Must be after age is recomputed, obviously; should not be needed for twins
	 * @param {App.Entity.SlaveState} slave - the new relative
	 */
	function ageFixup(slave) {
		// adjust immature slaves
		if (slave.physicalAge <= 15) {
			ageAdjustYoungRelative(slave);
		}

		// reset height
		slave.height = Height.forAge(slave.natural.height, slave);

		// reset puberty status
		generatePuberty(slave);

		// reset teeth
		if (slave.physicalAge < 6) {
			slave.teeth = "baby";
		} else if (slave.physicalAge < 12) {
			slave.teeth = "mixed";
		} else if (slave.teeth === "baby" || slave.teeth === "mixed") {
			slave.teeth = either("crooked", "normal", "normal");
		}

		// reset pregAdaptation (copied from generateNewSlaveJS's generateXX/XYPregAdaptation functions)
		if (slave.genes === "XX") { // female
			if (slave.physicalAge <= 6) {
				slave.pregAdaptation = 5;
			} else if (slave.physicalAge <= 11) {
				slave.pregAdaptation = slave.physicalAge - 1;
			} else if (slave.physicalAge <= 14) {
				slave.pregAdaptation = 4 * (slave.physicalAge - 12) + 14;
			} else if (slave.physicalAge <= 15) {
				slave.pregAdaptation = 28;
			} else if (slave.physicalAge <= 16) {
				slave.pregAdaptation = 34;
			} else if (slave.physicalAge <= 17) {
				slave.pregAdaptation = 42;
			} else {
				slave.pregAdaptation = 50;
			}
		} else { // male
			if (slave.physicalAge <= 6) {
				slave.pregAdaptation = 5;
			} else if (slave.physicalAge <= 11) {
				slave.pregAdaptation = slave.physicalAge - 1;
			} else if (slave.physicalAge <= 15) {
				slave.pregAdaptation = 2 * (slave.physicalAge - 12) + 12;
			} else {
				slave.pregAdaptation = 20;
			}
		}
	}

	/**
	 * Reset pregnancy, health, and other "status" variables dependent on age or gender that exist on newly-generated
	 * slaves but which shouldn't be identical even on twins. Must be after age is recomputed.
	 * @param {App.Entity.SlaveState} slave - the new relative
	 */
	function resetStatus(slave) {
		// reset pregnancy
		WombFlush(slave);
		if (V.arcologies[0].FSRepopulationFocusSMR === 1 && canGetPregnant(slave)) {
			slave.preg = random(1, 38);
			slave.pregWeek = slave.preg;
			slave.pregKnown = 1;
			slave.pregType = setPregType(slave);
			if (slave.vagina === 0) {
				slave.vagina = 1;
			}
		}
		SetBellySize(slave);

		// reset lactation
		slave.lactation = 0;
		slave.lactationDuration = 0;

		// reset health (but keep condition, which disproportionately influences slave value)
		setHealth(slave, slave.health.condition);

		// reset career
		slave.career = randomCareer(slave);
	}

	/**
	 * When generating a younger relative by cloning an older one (for example, for Household Liquidators),
	 * clamp certain physical parameters of the younger relative appropriately for their physical age.
	 * Generally these adjustments should match the age limiters found in generateNewSlave.js.
	 * @param {App.Entity.SlaveState} slave - the slave to adjust
	 */
	function ageAdjustYoungRelative(slave) {
		/* breast size */
		const origBoobs = slave.boobs;
		if (slave.physicalAge <= 10) {
			slave.boobs = Math.clamp(slave.boobs, 0, 100);
		} else if (slave.physicalAge <= 12) {
			slave.boobs = Math.clamp(slave.boobs, 0, 300);
		} else if (slave.physicalAge <= 14) {
			slave.boobs = Math.clamp(slave.boobs, 0, 400);
		} else if (slave.physicalAge <= 15) {
			slave.boobs = Math.clamp(slave.boobs, 0, 450);
		}

		/* if we've reduced breast size because of age, reapply minimum weight modifiers */
		if (origBoobs > slave.boobs && V.weightAffectsAssets !== 0) {
			if (slave.weight > 190) {
				slave.boobs += 300;
			} else if (slave.weight > 160) {
				slave.boobs += 200;
			} else if (slave.weight > 30) {
				slave.boobs += 100;
			}
		}

		/* if we've managed to *increase* breast size, just put it back */
		if (origBoobs < slave.boobs) {
			slave.boobs = origBoobs;
		}

		/* breast shape - preserve if it would have been valid, otherwise reset to normal (don't reroll) */
		/* nipple size - checks for flat nipples and their validity, otherwise reroll */
		const AllowedBoobShapes = [];
		const AllowedNippleShapes = [];
		if (slave.boobs.isBetween(250, 800)) {
			AllowedBoobShapes.push("perky");
			AllowedBoobShapes.push("downward-facing");
		}
		if (slave.boobs.isBetween(400, 1200)) {
			AllowedBoobShapes.push("torpedo-shaped");
			AllowedBoobShapes.push("wide-set");
		}
		if (slave.boobsImplant / slave.boobs >= 0.90) {
			AllowedBoobShapes.push("spherical");
			AllowedNippleShapes.push("flat");
		}
		if (!AllowedBoobShapes.includes(slave.boobShape)) {
			slave.boobShape = "normal";
		}
		if (!AllowedNippleShapes.includes(slave.nipples)) {
			slave.nipples = either("cute", "puffy", "inverted");
		}

		/* voice */
		if (slave.physicalAge <= 16 && slave.voice <= 1) {
			slave.voice = 2;
		}

		/* XX genitals */
		if (slave.physicalAge < 20 && slave.vagina > 1) {
			slave.vagina = 1;
		}

		if (slave.physicalAge <= 13 && slave.clit > 1) {
			slave.clit = 1;
		}

		if (slave.physicalAge <= 13 && slave.labia > 1) {
			slave.labia = 1;
		} else if (slave.physicalAge <= 15 && slave.labia > 2) {
			slave.labia = 2;
		}

		/* XY genitals */
		if (slave.physicalAge <= 13) {
			if (slave.geneticQuirks.wellHung === 2 && slave.physicalAge >= 8 && slave.dick > 4) {
				slave.dick = 4;
			} else if (slave.dick > 3) {
				slave.dick = 3;
			}
			if (slave.balls > 3) {
				slave.balls = 3;
				slave.scrotum = slave.balls;
			}
		} else if (slave.physicalAge <= 15) {
			if (slave.geneticQuirks.wellHung === 2 && slave.dick > 5) {
				slave.dick = 5;
			} else if (slave.dick > 3) {
				slave.dick = 3;
			}
			if (slave.balls > 4) {
				slave.balls = 4;
				slave.scrotum = slave.balls;
			}
		}
	}

	function fastForward(slave, years) {
		for (let i = 0; i < years; ++i) {
			ageSlave(slave, true);
		}
	}

	/**
	 * Give a slave a realistic chance to activate a sex-linked genetic quirk which her opposite-sex relative was only a carrier for.
	 * @param {App.Entity.SlaveState} slave - the slave to adjust
	 * @param {string} quirk - the sex-linked quirk to test
	 */
	function activateSexLinkedGeneticQuirk(slave, quirk) {
		if (slave.geneticQuirks[quirk] === 1) {
			if (random(1, 4) > 3) {
				slave.geneticQuirks[quirk] = 2;
			}
		}
	}

	/**
	 * Make a slave a carrier for a genetic sex-linked quirk which her opposite-sex relative had active.
	 * @param {App.Entity.SlaveState} slave - the slave to adjust
	 * @param {string} quirk - the sex-linked quirk to test
	 */
	function deactivateSexLinkedGeneticQuirk(slave, quirk) {
		if (slave.geneticQuirks[quirk] === 2) {
			slave.geneticQuirks[quirk] = 1;
		}
	}

	/**
	 * Changes the new relative's sex from XY to XX.
	 * @param {App.Entity.SlaveState} slave - the slave to adjust
	 */
	function changeSexToXX(slave) {
		slave.genes = "XX";
		slave.pronoun = App.Data.Pronouns.Kind.female;

		// activate/deactivate sex-linked genetic quirks
		["wellHung"].forEach((q) => deactivateSexLinkedGeneticQuirk(slave, q));
		["fertility", "hyperFertility", "macromastia", "gigantomastia"].forEach((q) => activateSexLinkedGeneticQuirk(slave, q));

		// alter body proportions
		slave.hips = Math.clamp(slave.hips + 1, -2, 2);
		slave.butt++;
		slave.waist = Math.clamp(slave.waist - random(15, 25), -100, 100);
		slave.face = Math.clamp(slave.face + random(15, 25), -100, 100);
		slave.boobs = either(200, 300, 400, 450, 500, 550, 600, 700);

		// alter genitals
		slave.dick = 0;
		slave.balls = 0;
		slave.scrotum = 0;
		slave.prostate = 0;
		slave.vagina = 1; // no virgins here?
		slave.clit = either(0, 0, 0, 0, 0, 0, 1, 1, 2);
		slave.labia = either(0, 0, 0, 1, 1, 1, 1, 2, 2, 3);
		slave.ovaries = 1;
		slave.preg = -1; // might get pregnant from repop check later on anyway

		// swap penetrative skill for vaginal
		slave.skill.vaginal = slave.skill.penetrative;
		slave.skill.penetrative = 0;

		// swap attraction
		[slave.attrXX, slave.attrXY] = [slave.attrXY, slave.attrXX];

		// consider face
		if (slave.faceShape === "masculine") {
			slave.faceShape = either("androgynous", "androgynous", "cute", "cute", "exotic", slave.faceShape, "normal", "normal", "sensual");
		}

		// adjust voice and hair
		slave.voice = Math.min(3, slave.voice + 1);
		slave.hLength = 60;

		// rotate hormone balance around a center of 10 (60 becomes -40 and vice versa)
		slave.hormoneBalance -= (slave.hormoneBalance - 10) * 2;

		// regenerate piercings (would be nice to just call generateXXMods here)
		slave.piercing.ear.weight = jsEither([0, 1]);
		slave.piercing.nose.weight = jsEither([0, 0, 0, 1]);
		slave.piercing.eyebrow.weight = jsEither([0, 0, 0, 0, 0, 1]);
		slave.piercing.genitals.weight = jsEither([0, 0, 0, 0, 0, 1]);
		slave.piercing.dick.weight = 0;
		slave.piercing.lips.weight = jsEither([0, 0, 0, 0, 0, 1]);
		slave.piercing.navel.weight = jsEither([0, 0, 0, 1]);
		slave.piercing.nipple.weight = jsEither([0, 0, 0, 0, 1]);
	}

	/**
	 * Changes the new relative's sex from XX to XY.
	 * @param {App.Entity.SlaveState} slave - the slave to adjust
	 */
	function changeSexToXY(slave) {
		slave.genes = "XY";
		slave.pronoun = App.Data.Pronouns.Kind.male;

		// activate/deactivate sex-linked genetic quirks
		["wellHung"].forEach((q) => activateSexLinkedGeneticQuirk(slave, q));
		["fertility", "hyperFertility", "macromastia", "gigantomastia"].forEach((q) => deactivateSexLinkedGeneticQuirk(slave, q));

		// alter body proportions
		slave.hips = Math.clamp(slave.hips - 1, -2, 2);
		slave.butt = Math.max(0, slave.butt - 1);
		slave.waist = Math.clamp(slave.waist + random(15, 25), -100, 100);
		slave.face = Math.clamp(slave.face - random(15, 25), -100, 100);
		slave.boobs = either(100, 200);

		// alter genitals
		slave.vagina = -1;
		slave.clit = 0;
		slave.labia = 0;
		slave.ovaries = 0;
		slave.preg = 0;
		if (slave.geneticQuirks.wellHung === 2) {
			slave.dick = either(5, 5, 6);
		} else {
			slave.dick = either(1, 2, 2, 2, 3, 3, 3, 4, 4, 5);
		}
		slave.balls = either(1, 2, 2, 2, 3, 3, 3, 4, 4, 5);
		slave.scrotum = slave.balls;
		slave.prostate = 1;

		// swap vaginal skill for penetrative
		slave.skill.penetrative = slave.skill.vaginal;
		slave.skill.vaginal = 0;

		// swap attraction
		[slave.attrXX, slave.attrXY] = [slave.attrXY, slave.attrXX];

		// consider face
		if (slave.faceShape !== "masculine" && slave.faceShape !== "androgynous") {
			slave.faceShape = either("androgynous", "masculine", slave.faceShape, slave.faceShape);
		}

		// adjust voice and hair
		slave.voice = Math.max(1, slave.voice - 1);
		slave.hLength = 10;

		// rotate hormone balance around a center of 10 (60 becomes -40 and vice versa)
		slave.hormoneBalance -= (slave.hormoneBalance - 10) * 2;

		// regenerate piercings (would be nice to just call generateXYMods here)
		slave.piercing.ear.weight = jsEither([0, 0, 0, 1]);
		slave.piercing.nose.weight = jsEither([0, 0, 0, 0, 1]);
		slave.piercing.eyebrow.weight = jsEither([0, 0, 0, 0, 0, 1]);
		slave.piercing.genitals.weight = jsEither([0, 0, 0, 0, 0, 1]);
		slave.piercing.lips.weight = jsEither([0, 0, 0, 0, 0, 1]);
		slave.piercing.navel.weight = jsEither([0, 0, 0, 0, 1]);
		slave.piercing.nipple.weight = jsEither([0, 0, 0, 0, 1]);
	}

	return generateRelative;
})();

/** Return the valid age range for a parent for the given slave
 * NOTE: If minimum age is GREATER than maximum age, the parent cannot be generated. Check first!
 * @param {FC.HumanState} slave
 * @param {boolean} maleParent - true if the desired parent is a father
 * @returns {{min: number, max: number}}
 */
globalThis.getParentAgeRange = function(slave, maleParent) {
	const childAge = slave.actualAge;
	const min = childAge + (maleParent ? V.potencyAge : V.fertilityAge) + 1;
	const lastFertileYear = maleParent ? 75 : 45;
	const max = Math.min(V.retirementAge - 1, childAge + lastFertileYear);
	return {min, max};
};
