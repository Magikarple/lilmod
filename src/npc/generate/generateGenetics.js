// CSpell:ignore matronym, patronym, Yengo, Vedantam, Marouli, dóttir
// Generates a child's genetics based off mother and father and returns it as an object to be attached to an ovum

globalThis.generateGenetics = (function() {
	let mother;
	/** @type {FC.HumanState|0} */
	let activeMother;
	let father;
	/** @type {FC.HumanState|0} */
	let activeFather;
	/** @type {FC.Zeroable<FC.Race>} - if father is unknown, what race was he? */
	let fatherRace;

	// intelligence and face parameters are the same so we can use the same distribution for both values
	// clamping makes edge values (-100, 100) more likely; this is expected behavior
	// please see https://gitgud.io/pregmodfan/fc-pregmod/issues/852
	const fuzzy = (a, b) => Math.clamp(normalRandInt((a + b) / 2, 20), -100, 100);

	/**
	 * @param {FC.HumanState} actor1
	 * @param {number} actor2 Slave ID of actor 2
	 * @param {string} name Initial name of ovum
	 * @returns {FC.FetusGenetics}
	 */
	function generateGenetics(actor1, actor2, name) {
		/** @type {FC.FetusGenetics} */
		const genes = {
			gender: /** @type {FC.GenderGenes} */ ("XX"),
			name: "blank",
			surname: 0,
			mother: 0,
			motherName: "none",
			father: 0,
			fatherName: "none",
			inbreedingCoeff: 0,
			nationality: "Stateless",
			race: "white",
			intelligence: 0,
			face: 0,
			faceShape: "cute",
			eyeColor: "brown",
			hColor: "black",
			skin: "light",
			markings: "none",
			behavioralFlaw: "none",
			sexualFlaw: "none",
			pubicHStyle: "bushy",
			underArmHStyle: "bushy",
			clone: 0,
			cloneID: 0,
			geneticQuirks: {},
			fetish: "none",
			spermY: 50,
			adultHeight: 170,
			boobPotential: 500,
			artSeed: jsRandom(0, 10 ** 14)
		};
		if (actor1.ID > 0) {
			mother = V.genePool.find(s => s.ID === actor1.ID);
			if (mother === undefined) {
				mother = actor1;
			}
			activeMother = getSlave(actor1.ID);
			if (activeMother === undefined) {
				activeMother = actor1;
			}
		} else {
			activeMother = V.PC;
			mother = V.PC;
		}
		if (actor2 > 0) {
			father = V.genePool.find(s => s.ID === actor2);
			activeFather = findFather(actor2);
			if (father === undefined) {
				father = activeFather;
			}
			if (father === undefined) {
				father = 0;
				activeFather = 0;
			}
		} else if (actor2 === -1) {
			father = V.PC;
			activeFather = V.PC;
		} else {
			father = 0;
			activeFather = 0;
		}

		chooseUnknownFatherRace(actor2);
		genes.gender = setGender(father, mother);
		genes.name = name;
		genes.mother = actor1.ID;
		genes.motherName = setMotherName(activeMother);
		genes.father = actor2;
		genes.fatherName = setFatherName(father, activeFather, actor2);
		genes.inbreedingCoeff = ibc.kinship(mother, father);
		genes.nationality = setNationality(father, mother);
		genes.geneticQuirks = setGeneticQuirks(activeFather, activeMother, genes.gender);
		genes.race = setRace(father, mother);
		genes.skin = setSkin(father, mother, genes.race);
		genes.intelligence = setIntelligence(father, mother, activeMother, actor2, genes.inbreedingCoeff);
		genes.face = setFace(father, mother, activeMother, actor2, genes.geneticQuirks, genes.inbreedingCoeff);
		genes.faceShape = setFaceShape(father, mother, genes.geneticQuirks);
		genes.eyeColor = setEyeColor(father, mother);
		if (genes.geneticQuirks.heterochromia === 2) {
			genes.geneticQuirks.heterochromia = setHeterochromaticEyeColor(father, mother);
		}
		genes.hColor = setHColor(father, mother);
		genes.underArmHStyle = setUnderArmHStyle(father, mother);
		genes.pubicHStyle = setPubicHStyle(father, mother);
		genes.markings = setMarkings(father, mother);
		genes.sexualFlaw = setSexualFlaw(father, mother);
		genes.behavioralFlaw = setBehavioralFlaw(father, mother);
		genes.fetish = setFetish(father, mother);
		genes.spermY = setSpermY(father, mother);
		genes.adultHeight = setAdultHeight(father, mother, genes.gender, genes.race, genes.nationality, genes.geneticQuirks);
		genes.boobPotential = setBoobPotential(mother, father);

		return genes;
	}

	/** set expected adult height for the fetus
	 * @param {FC.Zeroable<FC.HumanState>} father
	 * @param {FC.HumanState} mother
	 * @param {string} gender
	 * @param {FC.Race} race
	 * @param {string} nationality
	 * @param {Partial<FC.GeneticQuirks>} quirks
	 * @returns {number}
	 */
	function setAdultHeight(father, mother, gender, race, nationality, quirks) {
		const randomPart = Height.random({
			nationality, race, genes: gender, physicalAge: 20, birthWeek: 0
		});
		if ((quirks.dwarfism === 2) !== (mother.geneticQuirks.dwarfism === 2) ||
			(quirks.gigantism === 2) !== (mother.geneticQuirks.gigantism === 2) ||
			father && ((quirks.dwarfism === 2) !== (father.geneticQuirks.dwarfism === 2)) ||
			father && ((quirks.gigantism === 2) !== (father.geneticQuirks.gigantism === 2))) {
			// we have a height quirk change compared to one of our parents. better to just start over with a completely random target height.
			return randomPart;
		}
		// global average: men are 7% taller than women. natural heights contain this bias.
		const genderScalingFactor = 1.07;
		// heritance ratio for height in humans is currently estimated at 79% (Yengo, L., Vedantam, S., Marouli, E., et al. "A saturated map of common genetic variants associated with human height." Nature 610, 704–712 (2022))
		const heritanceRatio = 0.79;
		// assemble!
		const motherPart = mother.natural.height * (gender === "XX" ? 1.0 : genderScalingFactor);
		const fatherPart = father ? father.natural.height * (gender === "XY" ? 1.0 : (1 / genderScalingFactor)) : motherPart;
		const inheritedPart = (motherPart + fatherPart) * 0.5;
		return Math.round((heritanceRatio * inheritedPart) + ((1 - heritanceRatio) * randomPart));
	}

	/** set breast size potential for the fetus
	 * @param {FC.HumanState} mother
	 * @param {FC.Zeroable<FC.HumanState>} father
	 * @returns {number}
	 */
	function setBoobPotential(mother, father) {
		const motherContrib = mother.natural.boobs / 10; // To allow the following randoms to avoid rounding.
		let potential;
		if (father !== 0) {
			const fatherContrib = father.natural.boobs / 10;
			potential = Math.round((motherContrib + fatherContrib) / 2);
			potential = random(potential - 10, potential + 10);
		} else {
			potential = random(motherContrib - 10, motherContrib + 10);
			if (potential >= 160) {
				potential -= random(0, 5);
			} else if (potential <= 30) {
				potential += random(0, 5);
			}
		}
		return Math.max(potential * 10, 200);
	}

	// get spermY value of the parent that's donating the Y chromosome
	function getSpermY(father, mother) {
		let sourceSpermY = 50; // default if no inherited Y chromosome (should be impossible, but the Adam Principle is optional, so it can happen)
		if (father !== 0 && father.genes === "XY") {
			sourceSpermY = father.spermY;
		} else if (mother.genes === "XY") {
			sourceSpermY = father.spermY;
		}
		return sourceSpermY;
	}

	// generation chance of y-chromosome carrying sperm
	function setSpermY(father, mother) {
		// Y-linked trait, so figure out where the Y chromosome is coming from and start from there
		return normalRandInt(getSpermY(father, mother), 5); // mutation
	}

	// gender
	function setGender(father, mother) {
		/** @type {FC.GenderGenes} */
		let gender;
		if (mother.geneticQuirks.girlsOnly === 2) {
			gender = "XX";
		} else if (V.seeDicksAffectsPregnancy === 1) {
			gender = jsRandom(0, 99) < V.seeDicks ? "XY" : "XX";
		} else if (V.adamPrinciple === 1) {
			if (father !== 0) {
				if (father.genes === "XX" && mother.genes === "XX") {
					gender = "XX"; // neither parent has a Y chromosome, it's definitely a girl
				} else if (father.genes !== mother.genes) {
					gender = jsRandom(0, 99) < getSpermY(father, mother) ? "XY" : "XX"; // "normal" conception
				} else {
					// both parents have a Y chromosome that they could donate; treat them as independent events
					const motherY = jsRandom(0, 99) < mother.spermY;
					const fatherY = jsRandom(0, 99) < father.spermY;
					if (motherY && fatherY) {
						gender = "YY"; // inviable, but retain for now
					} else if (!motherY && !fatherY) {
						gender = "XX"; // it's a girl!
					} else {
						gender = "XY"; // it's a boy!
					}
				}
			} else {
				gender = jsRandom(0, 99) < getSpermY(father, mother) ? "XY" : "XX";
			}
		} else {
			gender = jsRandom(0, 99) < getSpermY(father, mother) ? "XY" : "XX";
		}
		return gender;
	}

	// motherName
	function setMotherName(activeMother) {
		let motherName;
		motherName = activeMother.slaveName;
		if (activeMother.slaveSurname !== 0 && activeMother.slaveSurname !== "") {
			motherName += ` ${activeMother.slaveSurname}`;
		}
		return motherName;
	}

	// fatherName
	function setFatherName(father, activeFather, actor2) {
		let fatherName;
		if (father !== 0) {
			fatherName = activeFather.slaveName;
			if (activeFather.slaveSurname !== 0 && activeFather.slaveSurname !== "") {
				fatherName += ` ${activeFather.slaveSurname}`;
			}
		} else {
			switch (actor2) {
				case -2:
				case -5:
					fatherName = "Citizen";
					break;
				case -3:
					fatherName = "Your Master";
					break;
				case -4:
					fatherName = "Another arcology owner";
					break;
				case -6:
					fatherName = "The Societal Elite";
					break;
				case -7:
					fatherName = "Lab designed";
					break;
				case -9:
					fatherName = "A Futanari Sister";
					break;
				case -10:
					fatherName = "A rapist";
					break;
				default:
					fatherName = "Unknown";
			}
		}
		return fatherName;
	}

	// nationality
	function setNationality(father, mother) {
		if (father === 0 || father.nationality !== mother.nationality) {
			return "Stateless";
		} else {
			return mother.nationality;
		}
	}

	/** Pick a fixed race for the child's unknown father.
	 * @param {number} actor2
	 */
	function chooseUnknownFatherRace(actor2) {
		fatherRace = 0; // usually this will be interpreted as "copy from mother"
		if (((actor2 === -2 || actor2 === -5) && V.arcologies[0].FSSupremacistLawME === 1) || (actor2 === -6 && FutureSocieties.isActive('FSSupremacist'))) {
			fatherRace = V.arcologies[0].FSSupremacistRace;
		} else if (((actor2 === -2 || actor2 === -5) && V.arcologies[0].FSSubjugationistLawME === 1) || (actor2 === -6 && FutureSocieties.isActive('FSSubjugationist'))) {
			fatherRace = App.Utils.getRaceArrayWithoutParamRace(V.arcologies[0].FSSubjugationistRace).random();
		}
	}

	/**
	 * race
	 * @param {*} father
	 * @param {*} mother
	 * @returns {FC.Race}
	 */
	function setRace(father, mother) {
		let race;
		if (father !== 0) {
			if (mother.origRace === father.origRace) {
				race = mother.origRace;
			} else if (mother.origRace === "catgirl") {
				race = "catgirl";
			} else if (father.origRace === "catgirl") {
				race = "catgirl";
			} else if (jsRandom(1, 4) === 4) {
				race = jsEither([father.origRace, mother.origRace]);
			} else {
				race = "mixed race";
			}
		} else {
			if (mother.origRace === "catgirl") {
				race = "catgirl";
			} else if (father.origRace === "catgirl") {
				race = "catgirl";
			} else if (fatherRace !== 0) {
				if (mother.origRace === fatherRace) {
					race = mother.origRace;
				} else if (jsRandom(1, 4) === 4) {
					race = jsEither([fatherRace, mother.origRace]);
				} else {
					race = "mixed race";
				}
			} else {
				race = mother.origRace;
			}
		}
		return race;
	}

	/**
	 * @param {FC.Zeroable<FC.HumanState>} father
	 * @param {FC.HumanState} mother
	 * @param {FC.Race} race
	 */
	function setSkin(father, mother, race) {
		/** @type {FC.Zeroable<string>} */
		let fatherSkin = 0;
		let dadSkinIndex;
		const skinToMelanin = {
			"pure black": 25,
			"ebony": 24,
			"black": 23,
			"dark brown": 22,
			"brown": 21,
			"light brown": 20,
			"dark beige": 19,
			"beige": 18,
			"light beige": 17,
			"dark": 16,
			"dark olive": 15,
			"bronze": 14,
			"olive": 13,
			"tan": 12,
			"light olive": 11,
			"light": 10,
			"fair": 9,
			"very fair": 8,
			"extremely fair": 7,
			"pale": 6,
			"very pale": 5,
			"extremely pale": 4,
			"white": 3,
			"ivory": 2,
			"pure white": 1
		};
		const racialSkinToneBounds = {
			"black": [21, 25],
			"white": [4, 12],
			"latina": [10, 22],
			"indo-aryan": [9, 24],
			"malay": [9, 24],
			"pacific islander": [11, 24],
			"amerindian": [11, 22],
			"asian": [4, 15],
			"middle eastern": [10, 21],
			"semitic": [10, 21],
			"southern european": [9, 15]
		};

		let prop = "";
		if (race === "catgirl") {
			// pick a random catgirl color, slightly preferring the parents' coloration if applicable
			const catgirlColors = [...App.Medicine.Modification.catgirlNaturalSkins];
			if (mother.origSkin in catgirlColors) {
				catgirlColors.push(mother.origSkin, mother.origSkin);
			}
			if (father && father.origSkin in catgirlColors) {
				catgirlColors.push(father.origSkin, father.origSkin);
			}
			return catgirlColors.random();
		} else {
			// blend the father's and mother's skintones
			const momSkinIndex = mother ? (skinToMelanin[mother.origSkin] || 13) : 8;
			if (father !== 0) {
				fatherSkin = father.origSkin;
			} else if (fatherRace !== 0) {
				fatherSkin = randomRaceSkin(fatherRace);
			}
			dadSkinIndex = fatherSkin !== 0 ? (skinToMelanin[fatherSkin] || 13) : 8;

			let skinIndex = Math.round(Math.random() * (dadSkinIndex - momSkinIndex) + momSkinIndex);
			if (race in racialSkinToneBounds) {
				// don't exceed the skintone bounds of the already-selected race (note that "mixed race" does not have bounds)
				skinIndex = Math.clamp(skinIndex, racialSkinToneBounds[race][0], racialSkinToneBounds[race][1]);
			}

			// find the skin name associated with the blended skintone
			for (prop in skinToMelanin) {
				if (!skinToMelanin.hasOwnProperty(prop)) { continue; }
				if (skinIndex >= skinToMelanin[prop]) { return prop; }
			}
			return prop;
		}
	}

	/** Make sure a given eye color is a valid genetic eye color and not the result of some modification.
	 * @param {string} eyeColor
	 * @returns {string}
	 */
	function validGeneticEyeColor(eyeColor) {
		switch (eyeColor) {
			case "blind blue":
				eyeColor = "deep blue";
				break;
			case "milky white":
			case "implant":
				eyeColor = jsEither(["blue", "brown", "dark blue", "dark green", "green", "hazel", "light blue", "light green"]);
				break;
		}
		return eyeColor;
	}

	// eyeColor
	function setEyeColor(father, mother) {
		let eyeColor;
		/** @type {FC.Zeroable<string>} */
		let fatherEye = 0;

		// during BC WombInit, the mother has been updated but the father might not have been yet.
		// if the father is defined but doesn't have eyes, see if maybe he has an old eye color
		if (father !== 0) {
			if (jsDef(father.eye)) {
				fatherEye = father.eye.origColor;
			} else if (jsDef(father.eyeColor)) {
				fatherEye = father.eyeColor;
			}
		}

		if (father !== 0) {
			if (mother.eye.origColor === fatherEye) {
				eyeColor = mother.eye.origColor;
			} else if (["light red", "milky white", "pale gray", "pale red", "red"].includes(mother.eye.origColor)) {
				eyeColor = fatherEye;
			} else if (["light red", "milky white", "pale gray", "pale red", "red"].includes(fatherEye)) {
				eyeColor = mother.eye.origColor;
			} else if (["blue", "dark blue", "deep blue", "light blue", "light grey"].includes(mother.eye.origColor)) {
				if (jsRandom(1, 4) === 2) {
					eyeColor = mother.eye.origColor;
				} else {
					eyeColor = fatherEye;
				}
			} else if (["blue", "dark blue", "deep blue", "light blue", "light grey"].includes(fatherEye)) {
				if (jsRandom(1, 4) === 2) {
					eyeColor = fatherEye;
				} else {
					eyeColor = mother.eye.origColor;
				}
			} else {
				eyeColor = jsEither([fatherEye, mother.eye.origColor]);
			}
		} else {
			if (fatherRace) {
				fatherEye = randomRaceEye(fatherRace);
				if (mother.eye.origColor === fatherEye) {
					eyeColor = mother.eye.origColor;
				} else if (["light red", "milky white", "pale gray", "pale red", "red"].includes(mother.eye.origColor)) {
					eyeColor = fatherEye;
				} else if (["blue", "dark blue", "deep blue", "light blue", "light grey"].includes(mother.eye.origColor)) {
					if (jsRandom(1, 4) === 2) {
						eyeColor = mother.eye.origColor;
					} else {
						eyeColor = fatherEye;
					}
				} else if (["blue", "dark blue", "deep blue", "light blue", "light grey"].includes(fatherEye)) {
					if (jsRandom(1, 4) === 2) {
						eyeColor = fatherEye;
					} else {
						eyeColor = mother.eye.origColor;
					}
				} else {
					eyeColor = jsEither([fatherEye, mother.eye.origColor]);
				}
			} else {
				eyeColor = mother.eye.origColor;
			}
		}
		return validGeneticEyeColor(eyeColor);
	}

	function setHeterochromaticEyeColor(father, mother) {
		let eyeColorArray = [];
		if (father !== 0) {
			eyeColorArray.push(mother.eye.origColor);
			eyeColorArray.push(father.eye.origColor);
			if (father.geneticQuirks.heterochromia !== 0 && father.geneticQuirks.heterochromia !== 1) {
				eyeColorArray.push(father.geneticQuirks.heterochromia);
			}
		} else {
			if (fatherRace) {
				eyeColorArray.push(randomRaceEye(fatherRace));
				eyeColorArray.push(mother.eye.origColor);
			} else {
				eyeColorArray.push(mother.eye.origColor);
			}
		}
		if (mother.geneticQuirks.heterochromia !== 0 && mother.geneticQuirks.heterochromia !== 1) {
			eyeColorArray.push(mother.geneticQuirks.heterochromia);
		}
		return validGeneticEyeColor(jsEither(eyeColorArray));
	}

	// hColor
	function setHColor(father, mother) {
		let hairColor;
		if (father !== 0) {
			if (mother.origHColor === father.origHColor) {
				hairColor = mother.origHColor;
			} else if (mother.origHColor === "white") {
				hairColor = jsRandom(1, 100) === 69 ? mother.origHColor : father.origHColor;
			} else if (father.origHColor === "white") {
				hairColor = jsRandom(1, 100) === 69 ? father.origHColor : mother.origHColor;
			} else if (["black", "jet black"].includes(mother.origHColor)) {
				hairColor = jsEither([father.origHColor, mother.origHColor, mother.origHColor, mother.origHColor, mother.origHColor, mother.origHColor, mother.origHColor, mother.origHColor]);
			} else if (["black", "jet black"].includes(father.origHColor)) {
				hairColor = jsEither([father.origHColor, father.origHColor, father.origHColor, father.origHColor, father.origHColor, father.origHColor, father.origHColor, mother.origHColor]);
			} else if (["brown", "chestnut", "chocolate brown", "dark brown"].includes(mother.origHColor)) {
				hairColor = jsEither([father.origHColor, mother.origHColor, mother.origHColor, mother.origHColor]);
			} else if (["brown", "chestnut", "chocolate brown", "dark brown"].includes(father.origHColor)) {
				hairColor = jsEither([father.origHColor, father.origHColor, father.origHColor, mother.origHColor]);
			} else {
				hairColor = jsEither([father.origHColor, mother.origHColor]);
			}
		} else {
			if (fatherRace !== 0) {
				const fatherHair = randomRaceHair(fatherRace);
				if (mother.origHColor === fatherHair) {
					hairColor = mother.origHColor;
				} else if (mother.origHColor === "white") {
					hairColor = jsRandom(1, 100) === 69 ? mother.origHColor : fatherHair;
				} else if (["black", "jet black"].includes(mother.origHColor)) {
					hairColor = jsEither([fatherHair, mother.origHColor, mother.origHColor, mother.origHColor, mother.origHColor, mother.origHColor, mother.origHColor, mother.origHColor]);
				} else if (["black", "jet black"].includes(fatherHair)) {
					hairColor = jsEither([fatherHair, fatherHair, fatherHair, fatherHair, fatherHair, fatherHair, fatherHair, mother.origHColor]);
				} else if (["brown", "chestnut", "chocolate brown", "dark brown"].includes(mother.origHColor)) {
					hairColor = jsEither([fatherHair, mother.origHColor, mother.origHColor, mother.origHColor]);
				} else if (["brown", "chestnut", "chocolate brown", "dark brown"].includes(fatherHair)) {
					hairColor = jsEither([fatherHair, fatherHair, fatherHair, mother.origHColor]);
				} else {
					hairColor = jsEither([fatherHair, mother.origHColor]);
				}
			} else {
				hairColor = mother.origHColor;
			}
		}
		return hairColor;
	}

	// underArmHairStyle
	function setUnderArmHStyle(father, mother) {
		return hairStyle(father.underArmHStyle, mother.underArmHStyle);
	}

	// pubicHairStyle
	function setPubicHStyle(father, mother) {
		return hairStyle(father.pubicHStyle, mother.pubicHStyle);
	}

	/**
	 * @param {string} fatherStyle
	 * @param {string} motherStyle
	 * @returns {string}
	 */
	function hairStyle(fatherStyle, motherStyle) {
		let hair;
		if (father !== 0) {
			if (motherStyle === "hairless" && fatherStyle === "hairless") {
				hair = "hairless";
			} else if (motherStyle === "hairless" || fatherStyle === "hairless") {
				hair = (jsRandom(1, 5) === 3) ? "hairless" : jsEither(["bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "hairless"]);
			} else {
				hair = jsEither(["bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "hairless"]);
			}
		} else if (motherStyle === "hairless") {
			hair = (jsRandom(1, 5) === 3) ? "hairless" : jsEither(["bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "hairless"]);
		} else {
			hair = jsEither(["bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "bushy", "hairless"]);
		}
		return hair;
	}

	// markings
	function setMarkings(father, mother) {
		let markings;
		if (jsRandom(1, 8) === 1) {
			markings = jsEither(["beauty mark", "birthmark"]);
		} else {
			markings = "none";
		}
		if (markings === "none") {
			if (father !== 0) {
				markings = jsEither(["none", "none", father.markings, mother.markings]);
			} else {
				markings = jsEither(["none", "none", mother.markings, mother.markings]);
			}
		}
		return markings;
	}

	// sexualFlaw
	function setSexualFlaw(father, mother) {
		let flaw;
		if (father !== 0) {
			flaw = jsEither(["none", "none", father.sexualFlaw, mother.sexualFlaw]);
		} else {
			flaw = jsEither(["none", "none", mother.sexualFlaw, mother.sexualFlaw]);
		}
		return flaw;
	}

	// behavioralFlaw
	function setBehavioralFlaw(father, mother) {
		let flaw;
		if (father !== 0) {
			flaw = jsEither(["none", "none", father.behavioralFlaw, mother.behavioralFlaw]);
		} else {
			flaw = jsEither(["none", "none", mother.behavioralFlaw, mother.behavioralFlaw]);
		}
		return flaw;
	}

	// fetish
	function setFetish(father, mother) {
		let fetish;
		if (father !== 0) {
			fetish = jsEither(["none", "none", "none", "none", "none", father.fetish, mother.fetish]);
		} else {
			fetish = jsEither(["none", "none", "none", "none", "none", mother.fetish, mother.fetish]);
		}
		if (fetish === Fetish.MINDBROKEN) { fetish = "none"; }
		return fetish;
	}

	// intelligence
	function setIntelligence(father, mother, activeMother, actor2, inbreedingCoeff) {
		let smarts;
		if (mother.ID === -1) {
			if (actor2 === -6) {
				smarts = Math.clamp(normalRandInt(95, 2.5), -100, 100);
			} else if (father !== 0) {
				smarts = fuzzy(father.intelligence, mother.intelligence);
				// player is considered "good stock"
				while (smarts < 50) {
					smarts = fuzzy(father.intelligence, mother.intelligence);
				}
			} else {
				smarts = fuzzy(random(20, 100), mother.intelligence);
			}
		} else if (father !== 0) {
			smarts = fuzzy(father.intelligence, mother.intelligence);
			// elite slaves are also considered "good stock"
			while (activeMother.breedingMark && smarts < 50) {
				smarts = fuzzy(father.intelligence, mother.intelligence);
			}
		} else {
			smarts = fuzzy(random(-20, 100), mother.intelligence);
		}
		if (V.inbreeding === 1) {
			if (jsRandom(1, 100) < inbreedingCoeff * 200) {
				smarts -= Math.abs(normalRandInt(5 * inbreedingCoeff, 30 * inbreedingCoeff, -100 * inbreedingCoeff, 100 * inbreedingCoeff));
			}
		}
		return Math.clamp(smarts, -100, 100);
	}

	// face
	function setFace(father, mother, activeMother, actor2, genes, inbreedingCoeff) {
		let face;
		if (genes.pFace > 0 && genes.uFace > 0) {
			face = 0;
		} else if (genes.pFace > 0) {
			face = 100;
		} else if (genes.uFace > 0) {
			face = -100;
		} else if (mother.ID === -1) {
			if (actor2 === -6) {
				face = Math.clamp(normalRandInt(95, 2.5), -100, 100);
			} else if (father !== 0) {
				face = fuzzy(father.face, mother.face);
				// the player is considered "good stock"
				while (face < 50) {
					face = fuzzy(father.face, mother.face);
				}
			} else {
				face = fuzzy(random(50, 100), mother.face);
			}
		} else if (father !== 0) {
			face = fuzzy(father.face, mother.face);
			// elite slaves are also considered "good stock"
			while (activeMother.breedingMark && face < 50) {
				face = fuzzy(father.face, mother.face);
			}
		} else {
			face = fuzzy(random(-100, 100), mother.face);
		}
		if (V.inbreeding === 1 && genes.pFace === 0 && genes.uFace === 0) {
			if (jsRandom(1, 100) < inbreedingCoeff * 200) {
				face -= Math.abs(normalRandInt(5 * inbreedingCoeff, 35 * inbreedingCoeff, -100 * inbreedingCoeff, 100 * inbreedingCoeff));
			}
		}
		return Math.clamp(face, -100, 100);
	}

	// face shape
	function setFaceShape(father, mother, genes) {
		let shape;
		if (genes.race === "catgirl") {
			shape = "feline";
		} else if (mother.faceShape === "feline") {
			shape = "feline";
		} else if (father.faceShape === "feline") {
			shape = "feline";
		} else if (genes.androgyny === 2 && genes.race !== "catgirl") {
			shape = "androgynous";
		} else if (father !== 0) {
			if (mother.faceShape === father.faceShape) {
				shape = mother.faceShape;
			} else {
				shape = jsEither(["androgynous", "androgynous", "cute", "cute", "exotic", "normal", "normal", "sensual", mother.faceShape, mother.faceShape]);
			}
		} else {
			shape = jsEither(["androgynous", "androgynous", "cute", "cute", "exotic", "normal", "normal", "sensual", mother.faceShape, mother.faceShape]);
		}
		return shape;
	}

	/**
	 * Genetic quirks
	 * @param {FC.HumanState|0} father
	 * @param {FC.HumanState} mother
	 * @param {string} sex
	 * @returns {FC.GeneticQuirks}
	 */
	function setGeneticQuirks(father, mother, sex) {
		/** @type {FC.GeneticQuirks} */
		const quirks = {};
		App.Data.geneticQuirks.forEach((value, q) => quirks[q] = 0);
		let chance = 0;
		let fatherGenes = 0;
		/** @type {number} */
		let geneTarget;

		// during BC WombInit, the mother has been updated but the father might not have been yet.
		// if the father is defined but doesn't have genetic quirks, just ignore him
		if (father !== 0 && !jsDef(father.geneticQuirks)) {
			father = 0;
		}

		// Genetics implementation
		// Autosomal recessive: For each gene, add up gene level (0, 1, or 2) for both parents; if total level 1 or above, then roll a d16.
		// If result is less than 2^(total gene level), child manifests the quirk.
		// Otherwise, if result is less than 3*2^(total gene level), child is carrier of the quirk.
		// This precisely duplicates autosomal recessive behavior for cases where both parents manifest, one manifests and one is carrier, or where both are carriers.
		// If one manifests and one normal, it behaves the same as both carriers instead of having 100% carrier children; result is more interesting this way.
		// If one carrier and one normal, it gives 1/8th manifesting, 1/4th carrier; small overall chance, more interesting than the realistic 50% carrier.

		// Sex-linked recessive: ???
		// realism would be, looking at hypothetical x-carried gene that by its nature can only affect women
		// Male carrier, female with condition:		100% of daughters have condition, 100% of sons carriers					geneTotal 3
		// Normal male, female with condition:		100% of daughters are carriers, 100% of sons are carriers				geneTotal 2
		// Carrier male, carrier female:			50% of daughters have condition, 50% carriers; 50% of sons carriers.	geneTotal 2
		// Normal male, carrier female:				50% of daughters carriers,	50% of sons carriers						geneTotal 1
		// Carrier male, normal female:				100% of daughters carriers, sons normal									geneTotal 1

		// Sex-linked traits (fertility-affecting, potent, well-hung) left handled by the old method; latter made mirror image to former.

		// potency
		if (mother.geneticQuirks.potent === 2) {
			if (sex === "XY") {
				quirks.potent = 2;
			} else {
				quirks.potent = 1;
			}
		} else if (mother.geneticQuirks.potent === 1) {
			chance = jsRandom(0, 1000);
			if (father !== 0) {
				if (father.geneticQuirks.potent >= 1) {
					if (sex === "XY") {
						if (chance > 500) {
							quirks.potent = 2;
						} else if (chance > 50) {
							quirks.potent = 1;
						}
					} else {
						if (chance > 500) {
							quirks.potent = 1;
						}
					}
				}
			} else {
				if (sex === "XY") {
					if (chance > 950) {
						quirks.potent = 2;
					} else if (chance > 200) {
						quirks.potent = 1;
					}
				} else {
					if (chance > 500) {
						quirks.potent = 1;
					}
				}
			}
		}

		// fertility
		if (mother.geneticQuirks.fertility === 2) {
			if (sex === "XX") {
				quirks.fertility = 2;
			} else {
				quirks.fertility = 1;
			}
		} else if (mother.geneticQuirks.fertility === 1) {
			chance = jsRandom(0, 1000);
			if (father !== 0) {
				if (father.geneticQuirks.fertility >= 1) {
					if (sex === "XX") {
						if (chance > 500) {
							quirks.fertility = 2;
						} else if (chance > 50) {
							quirks.fertility = 1;
						}
					} else {
						if (chance > 500) {
							quirks.fertility = 1;
						}
					}
				}
			} else {
				if (sex === "XX") {
					if (chance > 950) {
						quirks.fertility = 2;
					} else if (chance > 200) {
						quirks.fertility = 1;
					}
				} else {
					if (chance > 500) {
						quirks.fertility = 1;
					}
				}
			}
		}

		// hyper fertility
		if (mother.geneticQuirks.hyperFertility === 2) {
			if (sex === "XX") {
				quirks.hyperFertility = 2;
			} else {
				quirks.hyperFertility = 1;
			}
		} else if (mother.geneticQuirks.hyperFertility === 1) {
			chance = jsRandom(0, 1000);
			if (father !== 0) {
				if (father.geneticQuirks.hyperFertility >= 1) {
					if (sex === "XX") {
						if (chance > 750) {
							quirks.hyperFertility = 2;
						} else if (chance > 500) {
							quirks.hyperFertility = 1;
						}
					} else {
						if (chance > 500) {
							quirks.hyperFertility = 1;
						}
					}
				}
			} else {
				if (sex === "XX") {
					if (chance > 950) {
						quirks.hyperFertility = 2;
					} else if (chance > 700) {
						quirks.hyperFertility = 1;
					}
				} else {
					if (chance > 700) {
						quirks.hyperFertility = 1;
					}
				}
			}
		}

		// superfetation
		if (mother.geneticQuirks.superfetation === 2) {
			if (sex === "XX") {
				quirks.superfetation = 2;
			} else {
				quirks.superfetation = 1;
			}
		} else if (mother.geneticQuirks.superfetation === 1) {
			chance = jsRandom(0, 1000);
			if (father !== 0) {
				if (father.geneticQuirks.superfetation >= 1) {
					if (sex === "XX") {
						if (chance > 750) {
							quirks.superfetation = 2;
						} else if (chance > 700) {
							quirks.superfetation = 1;
						}
					} else {
						if (chance > 700) {
							quirks.superfetation = 1;
						}
					}
				}
			} else {
				if (sex === "XX") {
					if (chance > 950) {
						quirks.superfetation = 2;
					} else if (chance > 900) {
						quirks.superfetation = 1;
					}
				} else {
					if (chance > 900) {
						quirks.superfetation = 1;
					}
				}
			}
		}

		// Polyhydramnios
		if (father !== 0) {
			fatherGenes = father.geneticQuirks.polyhydramnios;
		}
		geneTarget = Math.pow(2, mother.geneticQuirks.polyhydramnios + fatherGenes);
		if (geneTarget >= 2) {
			chance = jsRandom(1, 16);
			if (chance <= geneTarget) {
				quirks.polyhydramnios = 2;
			} else {
				quirks.polyhydramnios = 1;
			}
		}

		// Uterine Hypersensitivity
		if (mother.geneticQuirks.uterineHypersensitivity === 2) {
			chance = jsRandom(0, 1000);
			if (father !== 0 && father.geneticQuirks.uterineHypersensitivity >= 1) {
				if (sex === "XX") {
					quirks.uterineHypersensitivity = 2;
				} else {
					quirks.uterineHypersensitivity = 1;
				}
			} else {
				if (sex === "XX") {
					if (chance > 700) {
						quirks.uterineHypersensitivity = 2;
					} else if (chance > 500) {
						quirks.uterineHypersensitivity = 1;
					}
				} else {
					if (chance > 500) {
						quirks.uterineHypersensitivity = 1;
					}
				}
			}
		} else if (mother.geneticQuirks.uterineHypersensitivity === 1) {
			chance = jsRandom(0, 1000);
			if (father !== 0 && father.geneticQuirks.uterineHypersensitivity >= 1) {
				if (sex === "XX") {
					if (chance > 750) {
						quirks.uterineHypersensitivity = 2;
					} else if (chance > 700) {
						quirks.uterineHypersensitivity = 1;
					}
				} else {
					if (chance > 600) {
						quirks.uterineHypersensitivity = 1;
					}
				}
			} else {
				if (sex === "XX") {
					if (chance > 950) {
						quirks.uterineHypersensitivity = 2;
					} else if (chance > 900) {
						quirks.uterineHypersensitivity = 1;
					}
				} else {
					if (chance > 900) {
						quirks.uterineHypersensitivity = 1;
					}
				}
			}
		}

		// well hung
		if (father !== 0) {
			if (father.geneticQuirks.wellHung === 2) {
				if (sex === "XY") {
					quirks.wellHung = 2;
				} else {
					quirks.wellHung = 1;
				}
			} else if (father.geneticQuirks.wellHung === 1) {
				chance = jsRandom(0, 1000);
				if (mother.geneticQuirks.wellHung >= 1) {
					if (sex === "XY") {
						if (chance > 750) {
							quirks.wellHung = 2;
						} else if (chance > 700) {
							quirks.wellHung = 1;
						}
					} else {
						if (chance > 700) {
							quirks.wellHung = 1;
						}
					}
				}
			}
		}

		// twinning
		if (mother.geneticQuirks.twinning === 2) {
			if (sex === "XX") {
				quirks.twinning = 2;
			} else {
				quirks.twinning = 1;
			}
		}

		// perfect face
		quirks.pFace = genes(father !== 0 ? father.geneticQuirks.pFace : 0, mother.geneticQuirks.pFace);

		// ugly face
		quirks.uFace = genes(father !== 0 ? father.geneticQuirks.uFace : 0, mother.geneticQuirks.uFace);

		// gigantism
		quirks.gigantism = genes(father !== 0 ? father.geneticQuirks.gigantism : 0, mother.geneticQuirks.gigantism);

		// dwarfism
		quirks.dwarfism = genes(father !== 0 ? father.geneticQuirks.dwarfism : 0, mother.geneticQuirks.dwarfism);

		// neoteny
		quirks.neoteny = inactiveGene(genes(father !== 0 ? father.geneticQuirks.neoteny : 0, mother.geneticQuirks.neoteny));

		// progeria
		quirks.progeria = inactiveGene(genes(father !== 0 ? father.geneticQuirks.progeria : 0, mother.geneticQuirks.progeria));

		// albinism
		quirks.albinism = genes(father !== 0 ? father.geneticQuirks.albinism : 0, mother.geneticQuirks.albinism);

		// heterochromia
		quirks.heterochromia = genes(
			father === 0 ? 0
				: typeof father.geneticQuirks.heterochromia === "string" ? 2
					: father.geneticQuirks.heterochromia,
			typeof mother.geneticQuirks.heterochromia === "string" ? 2
				: mother.geneticQuirks.heterochromia);

		// rear lipedema
		quirks.rearLipedema = genes(father !== 0 ? father.geneticQuirks.rearLipedema : 0, mother.geneticQuirks.rearLipedema);

		// Gigantomastia
		quirks.gigantomastia = inactiveGene(genes(father !== 0 ? father.geneticQuirks.gigantomastia : 0, mother.geneticQuirks.gigantomastia));

		// Macromastia
		quirks.macromastia = inactiveGene(genes(father !== 0 ? father.geneticQuirks.macromastia : 0, mother.geneticQuirks.macromastia));

		// Galactorrhea
		quirks.galactorrhea = inactiveGene(genes(father !== 0 ? father.geneticQuirks.galactorrhea : 0, mother.geneticQuirks.galactorrhea));

		// myotonic hypertrophy
		quirks.mGain = genes(father !== 0 ? father.geneticQuirks.mGain : 0, mother.geneticQuirks.mGain);

		// myotonic dystrophy
		quirks.mLoss = genes(father !== 0 ? father.geneticQuirks.mLoss : 0, mother.geneticQuirks.mLoss);

		// hyperleptinemia
		quirks.wGain = genes(father !== 0 ? father.geneticQuirks.wGain : 0, mother.geneticQuirks.wGain);

		// hypoleptinemia
		quirks.wLoss = genes(father !== 0 ? father.geneticQuirks.wLoss : 0, mother.geneticQuirks.wLoss);

		// androgyny
		quirks.androgyny = genes(father !== 0 ? father.geneticQuirks.androgyny : 0, mother.geneticQuirks.androgyny);

		return clone(quirks);
	}

	/** sets a gene as inactive at birth. 3 means inactive, so if we've picked 2 but it's inactive at birth, we have to set it to 3.
	 * @param {0|1|2|3} gene
	 * @returns {0|1|2|3}
	 */
	function inactiveGene(gene) {
		return gene === 2 ? 3 : gene;
	}

	/** narrows the range of genes by consolidating active and inactive states
	 * @param {0|1|2|3} gene
	 * @returns {0|1|2}
	 */
	function hasGene(gene) {
		return gene === 3 ? 2 : gene;
	}

	/**
	 * @param {0|1|2|3} fatherGenes
	 * @param {0|1|2|3} motherGenes
	 * @returns {0|1|2}
	 */
	function genes(fatherGenes, motherGenes) {
		const geneTarget = Math.pow(2, hasGene(motherGenes) + hasGene(fatherGenes));
		if (geneTarget >= 2) {
			const chance = jsRandom(1, 16);
			if (chance <= geneTarget) {
				return 2;
			} else if (chance <= 3 * geneTarget) {
				return 1;
			}
		}
		return 0;
	}

	return generateGenetics;
})();

/**
 * Creates a new child object based on its mother and father and whether or not it is destined for the Incubator
 * @param {FC.HumanState} mother The slave object carrying the child source
 * @param {App.Entity.Fetus} ovum The source for the child, comes from the mother's womb array
 * @param {boolean} [incubator=false] True if the child is destined for the incubator; false if it's destined for the nursery
 * @returns {App.Entity.SlaveState|App.Facilities.Nursery.InfantState}
 */
globalThis.generateChild = function(mother, ovum, incubator = false) {
	/** @type {FC.FetusGenetics} */
	let genes = ovum.genetics; // TODO: maybe just argument this? We'll see.
	let child;

	if (!incubator) { // does extra work for the incubator if defined, otherwise builds a simple object
		child = new App.Facilities.Nursery.InfantState();
		child.genes = genes.gender;
		if (genes.clone !== undefined) {
			child.clone = genes.clone;
			child.cloneID = genes.cloneID;
		}
		child.mother = genes.mother;
		child.father = genes.father;
		setSlaveName(child, genes);
		regenerateSurname(child);

		child.nationality = genes.nationality;
		child.race = genes.race;
		child.intelligence = genes.intelligence;
		if (mother.prematureBirth > 0) {
			if (child.intelligence >= -90) {
				child.intelligence -= jsRandom(0, 10);
			}
			child.premature = 1;
		}
		child.face = genes.face;
		child.underArmHStyle = genes.underArmHStyle;
		child.pubicHStyle = genes.pubicHStyle;
		child.markings = genes.markings;
		child.sexualFlaw = genes.sexualFlaw;
		child.behavioralFlaw = genes.behavioralFlaw;
		child.fetish = genes.fetish;
		child.geneticQuirks = clone(genes.geneticQuirks);
		if (child.geneticQuirks.albinism === 2) {
			child.albinismOverride = makeAlbinismOverride(child.race);
		}
		child.origSkin = genes.skin;
		child.eyeColor = genes.eyeColor;
		child.origHColor = genes.hColor;
		child.skin = getGeneticSkinColor(child);
		child.hColor = getGeneticHairColor(child);
		child.spermY = genes.spermY;
		child.natural.height = genes.adultHeight;
		child.natural.boobs = genes.boobPotential;
		child.pubicHColor = child.hColor;
		child.underArmHColor = child.hColor;
		child.eyebrowHColor = child.hColor;
		child.birthWeek = 0;
		child.actualAge = 0;
		if (child.race !== "catgirl") {
			child.earImplant = 0;
			child.earShape = "normal";
			child.earT = "none";
			child.earTColor = "hairless";
			child.tailColor = "none";
			child.tailShape = "none";
		} else {
			child.earImplant = 1;
			child.earShape = "none";
			child.earT = "cat";
			child.earTColor = child.hColor;
			child.tailShape = "cat";
			child.tailColor = child.hColor;
		}
		if (genes.faceShape !== undefined) {
			child.faceShape = genes.faceShape;
		}
		if (mother.addict > 0) {
			child.addict = Math.trunc(mother.addict / 2);
		}
		child.weekAcquired = V.week;
		if (child.nationality === "Stateless") {
			const revivalistNationality = getRevivalistNationality();
			if (typeof revivalistNationality === 'string') {
				child.nationality = revivalistNationality;
			}
		}
	} else {
		const incubatorSetting = ("tankSetting" in ovum) ? ovum.tankSetting : (genes.gender === "XX" ? V.incubator.femaleSetting : V.incubator.maleSetting);
		const fixedAge = {
			minAge: incubatorSetting.targetAge,
			maxAge: incubatorSetting.targetAge,
			ageOverridesPedoMode: 1,
			mature: 0
		};

		child = GenerateNewSlave(genes.gender, fixedAge);
		child.slaveSurname = 0; // must default, but will be changed later
		if (genes.clone !== undefined) {
			child.clone = genes.clone;
			child.cloneID = genes.cloneID;
		}
		child.mother = genes.mother;
		child.father = genes.father;
		setSlaveName(child, genes);
		regenerateSurname(child);

		child.actualAge = 0;
		child.nationality = genes.nationality;
		child.race = genes.race;
		child.origRace = child.race;
		child.geneticQuirks = clone(genes.geneticQuirks);
		if (child.geneticQuirks.albinism === 2) {
			child.albinismOverride = makeAlbinismOverride(child.race);
		}
		if (child.geneticQuirks.progeria === 3) {
			child.geneticQuirks.progeria = 2;
			child.visualAge = ((child.visualAge * 10) - 30);
			child.physicalAge = ((child.physicalAge * 10) - 30);
			child.ovaryAge = ((child.ovaryAge * 10) - 30);
		} else if (child.geneticQuirks.neoteny === 3 && child.physicalAge > 12) {
			child.geneticQuirks.neoteny = 2;
			child.visualAge = 12;
		}
		child.origSkin = genes.skin;
		child.eye.origColor = genes.eyeColor;
		child.origHColor = genes.hColor;
		child.skin = getGeneticSkinColor(child);
		child.hColor = getGeneticHairColor(child);
		if (child.race !== "catgirl") {
			child.earImplant = 0;
			child.earShape = "normal";
			child.earT = "none";
			child.earTColor = "hairless";
			child.tailColor = "none";
			child.tailShape = "none";
		} else {
			child.earImplant = 1;
			child.earShape = "none";
			child.earT = "cat";
			child.earTColor = child.hColor;
			child.tailShape = "cat";
			child.tailColor = child.hColor;
		}
		child.spermY = genes.spermY;
		child.natural.height = genes.adultHeight;
		child.natural.boobs = genes.boobPotential;
		resetEyeColor(child, "both");
		child.pubicHColor = child.hColor;
		child.underArmHColor = child.hColor;
		child.eyebrowHColor = child.hColor;
		child.intelligence = genes.intelligence;
		if (mother.prematureBirth > 0) {
			if (child.intelligence >= -90) {
				child.intelligence -= jsRandom(0, 10);
			}
			child.premature = 1;
		}
		if ((child.geneticQuirks.dwarfism === 2 || (child.geneticQuirks.neoteny === 2 && child.actualAge > 12)) && child.geneticQuirks.gigantism !== 2) {
			child.height = Height.random(child, {limitMult: [-4, -1], spread: 0.15});
		} else if (child.geneticQuirks.gigantism === 2 && child.geneticQuirks.dwarfism !== 2) {
			child.height = Height.random(child, {limitMult: [3, 10], spread: 0.15});
		}
		child.face = genes.face;
		child.underArmHStyle = genes.underArmHStyle;
		child.pubicHStyle = genes.pubicHStyle;
		child.markings = genes.markings;
		child.sexualFlaw = genes.sexualFlaw;
		child.behavioralFlaw = genes.behavioralFlaw;
		child.fetish = genes.fetish;
		child.birthWeek = 0;
		child.energy = 0;
		child.anus = 0;
		if (child.vagina > 0) { child.vagina = 0; }
		if (child.fetish !== Fetish.NONE) { child.fetishStrength = 20; }
		if (child.dick > 0) {
			child.foreskin = 1;
			child.balls = 1;
			child.scrotum = 1;
		}
		if (genes.faceShape !== undefined) { child.faceShape = genes.faceShape; }
		if (mother.addict > 0) { child.addict = Math.trunc(mother.addict / 2); }
		child.career = "a slave since birth";
		child.birthName = child.slaveName;
		child.birthSurname = child.slaveSurname;
		child.devotion = 0;
		child.trust = 0;
		child.weekAcquired = V.week;
		if (child.nationality === "Stateless") {
			const revivalistNationality = getRevivalistNationality();
			if (typeof revivalistNationality === 'string') {
				child.nationality = revivalistNationality;
			}
		}

		child.weight = -100;
		child.muscles = -100;
		child.boobs = 10;
		child.butt = 0;
		child.chem = 990;
		child.piercing = new App.Entity.completePiercingState();
		child.boobsImplant = 0;
		child.boobsImplantType = "none";
		child.lactation = 0;
		child.hipsImplant = 0;
		child.buttImplant = 0;
		child.buttImplantType = "none";
		child.lipsImplant = 0;
		child.preg = 0;
		child.pregType = 0;
		child.pregKnown = 0;
		child.belly = 0;
		child.bellyPreg = 0;
		child.bellyFluid = 0;
		child.bellyImplant = -1;
		child.cervixImplant = 0;
		child.makeup = 0;
		child.nails = 0;
		child.stampTat = 0;
		child.bellyTat = 0;
		child.anusTat = 0;
		child.shouldersTat = 0;
		child.armsTat = 0;
		child.legsTat = 0;
		child.backTat = 0;
		child.skill.combat = 0;
		child.skill.whoring = 0;
		child.skill.entertainment = 0;
		child.skill.oral = 0;
		child.skill.anal = 0;
		child.skill.vaginal = 0;
		child.skill.penetrative = 0;
		child.accent = 4;
		child.canRecruit = 0;
		child.hStyle = "messy";
		child.hLength = 300;
		if (incubatorSetting.imprint === "terror") {
			child.origin = "$He was conditioned from birth into mindless terror in an aging tank.";
			child.tankBaby = 2;
		} else if (incubatorSetting.imprint === "trust") {
			child.origin = "$He was conditioned from birth into trusting obedience in an aging tank.";
			child.tankBaby = 1;
		} else {
			child.origin = "$His brain is blank outside of the most basic of functions.";
			applyMindbroken(child, child.intelligence);
			child.tankBaby = 3;
		}
		child.intelligenceImplant = 0;
	}

	child.inbreedingCoeff = genes.inbreedingCoeff;

	generatePronouns(child);

	return child;
};

/**
 * Sets the child's surname based on information on its mother and father
 * @param {{clone: FC.Zeroable<string>, cloneID: number, mother: number, father: number, genes: FC.GenderGenes, slaveSurname: FC.Zeroable<string>}} child
 */
function regenerateSurname(child) {
	// clone case - copy surname from genetic origin
	if (child.clone) {
		const cloneSeed = getRelative(child.cloneID);
		if (cloneSeed && nameOrNull(cloneSeed.slaveSurname)) {
			child.slaveSurname = cloneSeed.slaveSurname;
		}
		return;
	}

	// non-clone case - build surname from parent surnames according to the arcology's universal rules

	/** @param {FC.Zeroable<string>} name */
	function nameOrNull(name) {
		// handles names that are 0 or ""
		return name || null;
	}

	/** @param {string} surname */
	function splitSurname(surname) {
		if (V.surnameScheme === 6) {
			const parts = surname.split('-', 2);
			return {pat: parts[0], mat: parts.length > 1 ? parts[1] : null};
		} else {
			const parts = surname.split(' ', 2);
			if (V.surnameScheme === 7) {
				return {pat: parts[0], mat: parts.length > 1 ? parts[1] : null};
			} else if (V.surnameScheme === 8) {
				if (parts.length === 1) {
					return {pat: parts[0], mat: null};
				} else {
					return {pat: parts[1], mat: parts[0]};
				}
			}
		}
	}

	const father = getRelative(child.father);
	const mother = getRelative(child.mother);
	const fatherName = father ? nameOrNull(father.slaveName) : null;
	const motherName = mother ? nameOrNull(mother.slaveName) : null;

	function getPatronym() {
		if (child.mother === -1 && V.surnamePCOverride === 1) {
			return V.PC.slaveName;
		} else if (motherName && (!fatherName || (child.father === -1 && V.surnamePCOverride === 2))) {
			return motherName;
		} else if (fatherName) {
			return fatherName;
		}
	}

	function getMatronym() {
		if (child.father === -1 && V.surnamePCOverride === 1) {
			return V.PC.slaveName;
		} else if (fatherName && (!motherName || (child.mother === -1 && V.surnamePCOverride === 2))) {
			return fatherName;
		} else if (motherName) {
			return motherName;
		}
	}

	const fatherSurname = father ? nameOrNull(father.slaveSurname) : null;
	const motherSurname = mother ? nameOrNull(mother.slaveSurname) : null;

	function makeDoubleSurname() {
		const dadPart = fatherSurname ? splitSurname(fatherSurname) : null;
		const momPart = motherSurname ? splitSurname(motherSurname) : null;
		if (dadPart && momPart && dadPart.pat && momPart.pat) {
			// both surnames contain a patrilineal (primary) part; return them appropriately
			if (V.surnameScheme === 6 && dadPart.pat === momPart.pat) {
				// "Vasquez Ruiz" and "Vasquez Martinez" yielding "Vasquez Vasquez" (Hispanic/Lusitanic) is fine
				// ...but "Smith-Jones" and "Smith-Baker" yielding "Smith-Smith" (double-barreled) is not
				if (!dadPart.mat && momPart.mat) {
					return momPart; // Smith (P) and Smith-Baker (M) yield Smith-Baker
				} else {
					return dadPart; // Smith-Jones (P) and Smith-Baker (M) yield Smith-Jones
				}
			}
			return {pat: dadPart.pat, mat: momPart.pat};
		} else if (dadPart && dadPart.pat) {
			// mother's surname didn't contain a patrilineal (primary) part, return both parts of the father's surname
			return dadPart;
		} else if (momPart && momPart.pat) {
			// father's surname didn't contain a patrilineal (primary) part, return both parts of the mother's surname
			return momPart;
		} else if (V.surnameArcology && !nameOrNull(child.slaveSurname)) {
			// neither surname contained a patrilineal (primary) part, but the player will grant an arcology surname
			return {pat: V.surnameArcology, mat: null};
		}
		return {pat: null, mat: null};
	}

	const norseGenderSuffix = (child.genes === "XY" && V.allowMaleSlaveNames) ? "son" : "dóttir";
	const patronym = getPatronym();
	const matronym = getMatronym();
	const doubleSurname = makeDoubleSurname();

	switch (V.surnameScheme) {
		case 0: // family, patrilineal
			if (V.PC.slaveSurname && child.mother === -1 && V.surnamePCOverride === 1) {
				child.slaveSurname = V.PC.slaveSurname;
			} else if (motherSurname && (!fatherSurname || (child.father === -1 && V.surnamePCOverride === 2))) {
				child.slaveSurname = motherSurname;
			} else if (fatherSurname) {
				child.slaveSurname = fatherSurname;
			} else if (V.surnameArcology && !nameOrNull(child.slaveSurname)) {
				child.slaveSurname = V.surnameArcology;
			}
			break;
		case 1: // family, matrilineal
			if (V.PC.slaveSurname && child.father === -1 && V.surnamePCOverride === 1) {
				child.slaveSurname = V.PC.slaveSurname;
			} else if (fatherSurname && (!motherSurname || (child.mother === -1 && V.surnamePCOverride === 2))) {
				child.slaveSurname = fatherSurname;
			} else if (motherSurname) {
				child.slaveSurname = motherSurname;
			} else if (V.surnameArcology && !nameOrNull(child.slaveSurname)) {
				child.slaveSurname = V.surnameArcology;
			}
			break;
		case 2: // norse, patronym
			if (patronym) {
				let genitive;
				if (patronym.endsWith("i")) {
					genitive = patronym.slice(0, -1) + "a";
				} else {
					genitive = patronym + "s";
				}
				child.slaveSurname = genitive + norseGenderSuffix;
			}
			break;
		case 3: // norse, matronym
			if (matronym) {
				let genitive;
				if (matronym.endsWith("a")) {
					genitive = matronym.slice(0, -1) + "u";
				} else {
					genitive = matronym + "ar";
				}
				child.slaveSurname = genitive + norseGenderSuffix;
			}
			break;
		case 4: // simple patronym (Hadesha/Somali)
			if (patronym) {
				child.slaveSurname = patronym;
			}
			break;
		case 5: // simple matronym (Hadesha/Somali)
			if (matronym) {
				child.slaveSurname = matronym;
			}
			break;
		case 6: // double-barreled (patrilineal inheritance)
		{
			if (doubleSurname.pat) {
				if (doubleSurname.mat) {
					child.slaveSurname = doubleSurname.pat + "-" + doubleSurname.mat;
				} else {
					child.slaveSurname = doubleSurname.pat;
				}
			}
			break;
		}
		case 7: // Hispanic (patrilineal inheritance, patrilineal family name first)
		{
			if (doubleSurname.pat) {
				if (doubleSurname.mat) {
					child.slaveSurname = doubleSurname.pat + " " + doubleSurname.mat;
				} else {
					child.slaveSurname = doubleSurname.pat;
				}
			}
			break;
		}
		case 8: // Lusitanic (patrilineal inheritance, matrilineal family name first)
		{
			if (doubleSurname.pat) {
				if (doubleSurname.mat) {
					child.slaveSurname = doubleSurname.mat + " " + doubleSurname.pat;
				} else {
					child.slaveSurname = doubleSurname.pat;
				}
			}
			break;
		}
	}
}

/**
 * Sets the child's name or title based on information on its mother and father
 * @param {object} child
 * @param {object} genes An object containing child's genetic information
 */
function setSlaveName(child, genes) {
	const relString = child.genes === "XX" ? "daughter" : "son";
	if (!(V.pregnancyMonitoringUpgrade) || genes.name.indexOf("ovum") === 0) {
		if (genes.clone) {
			if (genes.cloneID === -1) {
				child.slaveName = `Your clone`;
			} else {
				child.slaveName = `${genes.clone}'s clone`;
			}
		} else if (genes.mother === -1) {
			if (genes.father <= 0) {
				child.slaveName = `Your ${relString}`;
			} else {
				child.slaveName = `Your and ${genes.fatherName}'s ${relString}`;
			}
		} else if (genes.father === -1) {
			child.slaveName = `${genes.motherName}'s and your ${relString}`;
		} else if (genes.father > 0) {
			child.slaveName = `${genes.motherName} and ${genes.fatherName}'s ${relString}`;
		} else {
			child.slaveName = `${genes.motherName}'s bastard ${relString}`;
		}
	} else {
		child.slaveName = genes.name;
	}
}

/**
 * Changes the child's skin depending on if it has albinism
 * @param {string} race The child's race
 */
function makeAlbinismOverride(race) {
	let albinismOverride = {
		skin: "pure white",
		eyeColor: "red",
		hColor: "white"
	};
	switch (race) {
		case "black":
		case "indo-aryan":
		case "malay":
		case "pacific islander":
		case "amerindian":
			albinismOverride.skin = "very fair";
			break;
		case "latina":
			albinismOverride.skin = "extremely fair";
			break;
		case "asian":
		case "middle eastern":
		case "semitic":
		case "southern european":
		case "white":
		case "catgirl":
			albinismOverride.skin = "pure white";
			break;
	}
	return albinismOverride;
}
