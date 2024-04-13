/**
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
globalThis.isSexuallyPure = function(slave) {
	if (!slave) {
		return null;
	}
	return (slave.vagina < 1 && slave.anus < 1 && !slave.counter.anal && !slave.counter.vaginal && !slave.counter.oral && !slave.counter.mammary && !slave.counter.penetrative && !slave.counter.publicUse);
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
globalThis.isSlaveAvailable = function(slave) {
	if (!slave) {
		return null;
	} else if (slave.assignment === Job.AGENT) {
		return false;
	} else if (slave.assignment === Job.AGENTPARTNER) {
		return false;
	} else if (slave.assignment === Job.ARCADE) {
		return false;
	} else if (slave.assignment === Job.DAIRY && V.dairyRestraintsSetting >= 2) {
		return false;
	} else if (getPersonalAttention(slave.ID, "torture") && !onBedRest(V.PC, true)) {
		return false;
	}
	return true;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
globalThis.isFaceVisible = function(slave) {
	const obscuringClothes = ["a Fuckdoll suit", "restrictive latex", "a burqa", "a niqab and abaya", "a klan robe", "a slutty klan robe"].includes(slave.clothes); // Debatable whether "a cybersuit", "battlearmor", "Imperial Plate", should be added. Helmets could be off in short periods.
	const obscuringFaceAccessory = ["porcelain mask"].includes(slave.faceAccessory);
	return (!obscuringClothes && !obscuringFaceAccessory);
};

globalThis.SlaveStatsChecker = (function() {
	return {
		checkForLisp: hasLisp,
		isModded: isModded,
		isUnmodded: isUnmodded,
		modScore: modScore
	};

	/* call as SlaveStatsChecker.checkForLisp() */
	function hasLisp(slave) {
		if (V.disableLisping === 1 || !canTalk(slave)) {
			return false;
		}
		return (slave.lips > 70 || (slave.piercing.lips.weight + slave.piercing.tongue.weight > 2) || slave.teeth === "gapped");
	}

	/** call as SlaveStatsChecker.modScore()
	 * @param {App.Entity.SlaveState} slave
	 * @returns {{piercing: number, tat: number, brand: number, scar: number, total: number}}
	 */
	function modScore(slave) {
		const piercing = piercingScore(slave);
		const tat = tatScore(slave);
		const brand = brandScore(slave);
		const scar = scarScore(slave);
		return {
			piercing,
			tat,
			brand,
			scar,
			total: piercing + tat + brand + scar
		};
	}

	/**
	 * helper function, not callable
	 * @param {App.Entity.SlaveState} slave
	 * @returns {number}
	 */
	function piercingScore(slave) {
		let score = 0;

		for (const piercing in slave.piercing) {
			const impact = (["lips", "tongue", "nipple", "genitals", "vagina", "dick", "anus"].includes(piercing)) ? 0.25 : 0.5; // Piercings in sexual areas count more for piercing score.
			if (piercing === "genitals" && slave.piercing.genitals.smart) {
				score += 1.25;
			} else if (slave.piercing[piercing].weight > 0) {
				score += slave.piercing[piercing].weight * 0.75 - impact;
				if (["areola", "corset"].includes(piercing)) {
					score += 1; // bonus score for corset and areola piercings (which are actually many piercings each)
				}
			}
		}

		return score;
	}

	/**
	 * helper function, not callable
	 * @param {App.Entity.SlaveState} slave
	 * @returns {number}
	 */
	function tatScore(slave) {
		let score = 0;

		if (slave.boobsTat !== 0) {
			score += 1.25;
		}
		if (slave.buttTat !== 0) {
			score += 1.25;
		}
		if (slave.lipsTat !== 0) {
			score += 1.25;
		}
		if (slave.shouldersTat !== 0) {
			score += 1;
		}
		if (slave.backTat !== 0) {
			score += 1.25;
		}
		if (slave.armsTat !== 0) {
			score += 1;
		}
		if (slave.legsTat !== 0) {
			score += 1;
		}
		if (slave.stampTat !== 0) {
			score += 1;
		}
		if (slave.vaginaTat !== 0) {
			score += 1;
		}
		if (slave.dickTat !== 0) {
			score += 1;
		}
		if (slave.bellyTat !== 0) {
			if ((slave.preg > slave.pregData.normalBirth / 1.33 && slave.pregType >= 20) || slave.belly >= 300000) {
				score += 0.75;
			} else if ((slave.preg > slave.pregData.normalBirth / 2 && slave.pregType >= 20) || (slave.preg > slave.pregData.normalBirth / 1.33 && slave.pregType >= 10) || slave.belly >= 150000) {
				score += 1;
			} else if (slave.belly >= 10000 || slave.bellyImplant >= 8000) {
				score += 1;
			} else if ((slave.preg >= slave.pregData.normalBirth / 4 && slave.pregType >= 20) || (slave.preg > slave.pregData.normalBirth / 4 && slave.pregType >= 10) || slave.belly >= 5000) {
				score += 0.5;
			} else if (slave.belly >= 1500) {
				score += 0.25;
			} else {
				score += 0.1;
			}
		}
		if (slave.anusTat === "bleached") {
			score += 0.5;
		} else if (slave.anusTat !== 0) {
			score += 1.25;
		}
		if (slave.abortionTat > 0 || (slave.abortionTat === 0 && slave.pregKnown === 1)) {
			score += 1;
		}
		if (slave.birthsTat > 0 || (slave.birthsTat === 0 && slave.pregKnown === 1)) {
			score += 1;
		}
		return score;
	}

	/**
	 * helper function, not callable
	 * @param {App.Entity.SlaveState} slave
	 * @returns {number}
	 */
	function brandScore(slave) {
		let score = 0;
		const brands = App.Medicine.Modification.brandRecord(slave);
		score += Object.getOwnPropertyNames(brands).length;
		return score;
	}

	/**
	 * helper function, not callable
	 * @param {App.Entity.SlaveState} slave
	 * @returns {number}
	 */
	function scarScore(slave) {
		let score = 0;
		let scars;
		if (slave.hasOwnProperty("scar")) { /* For very old saves this may not be defined yet and blocks the save from loading. */
			scars = App.Medicine.Modification.scarRecord(slave);
			for (const bodypart of Object.keys(scars)) {
				for (const kind of Object.keys(scars[bodypart])) {
					score += scars[bodypart][kind];
				}
			}
		}
		return score;
	}

	/**
	 * call as SlaveStatsChecker.isModded()
	 * @param {App.Entity.SlaveState} slave
	 * @returns {boolean}
	 */
	function isModded(slave) {
		const tattoos = tatScore(slave);
		const piercings = piercingScore(slave);
		const brands = brandScore(slave);
		const scars = scarScore(slave);
		const mods = piercings + tattoos + scars;

		return (mods > 15 || (piercings > 8 && tattoos > 5) || brands > 5);
	}

	/**
	 * call as SlaveStatsChecker.isUnmodded()
	 * @param {App.Entity.SlaveState} slave
	 * @returns {boolean}
	 */
	function isUnmodded(slave) {
		const tattoos = tatScore(slave);
		const piercings = piercingScore(slave);
		const brands = brandScore(slave);
		const scars = scarScore(slave);

		return (!isModded(slave) && slave.piercing.corset.weight === 0 && piercings < 3 && tattoos < 2 && brands < 2 && scars <= 1);
	}
}());

/**
 * Returns if slave is considered slim or not by arcology standards.
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
globalThis.isSlim = function(slave) {
	let slim = false;
	const arcology = V.arcologies[0];

	if (arcology.FSSlimnessEnthusiastLaw === 1) {
		return (slimLawPass(slave) === 1);
	}
	if ((slave.boobs < 500) && (slave.butt < 3)) {
		if ((slave.muscles <= 30) && (!FutureSocieties.isActive('FSPhysicalIdealist', arcology)) && (slave.weight <= 10) && (!FutureSocieties.isActive('FSHedonisticDecadence', arcology))) {
			slim = true;
		} else if (FutureSocieties.isActive('FSPhysicalIdealist', arcology)) {
			if (((arcology.FSPhysicalIdealistStrongFat === 1) && (slave.weight <= 30)) || slave.weight <= 10) {
				slim = true;
			}
		} else if ((FutureSocieties.isActive('FSHedonisticDecadence', arcology)) && (slave.weight <= 30)) {
			if (arcology.FSHedonisticDecadenceStrongFat === 1 || slave.muscles <= 30) {
				slim = true;
			}
		}
	}
	return slim;
};

/**
 * Returns if slave is considered a fashionable body shape or not by arcology laws.
 * @param {FC.HumanState} slave
 * @returns {number} 1: yes, 0: no
 */
globalThis.genderLawPass = function(slave) {
	let genderLawPass = 1;

	const arcology = V.arcologies[0];

	if (!FutureSocieties.isActive('FSPhysicalIdealist', arcology) && arcology.FSHedonisticDecadenceStrongFat === 0 && slave.muscles > 30) {
		/* muscle check */
		genderLawPass = 0;
	}
	if (FutureSocieties.isActive('FSHedonisticDecadence', arcology) || arcology.FSPhysicalIdealistStrongFat === 1) {
		/* weight check */
		if (slave.weight > 130 || slave.weight <= -30) {
			genderLawPass = 0;
		}
	} else if (Math.abs(slave.weight) > 30) {
		genderLawPass = 0;
	}
	if (FutureSocieties.isActive('FSAssetExpansionist', arcology)) {
		if (slave.boobs < 1600 || slave.boobs > 4300 || slave.butt < 4 || slave.butt > 8) {
			genderLawPass = 0;
		}
	} else if (slave.boobs < 500 || slave.boobs > 800 || slave.butt < 3 || slave.butt > 4) {
		genderLawPass = 0;
	}

	return genderLawPass;
};

/**
 * Returns if slave is considered slim or not by Slimness Enthusiast Law.
 * @param {FC.HumanState} slave
 * @returns {number} 1: yes, 0: no
 */
globalThis.slimLawPass = function(slave) {
	let slimLawPass = 0;
	const arcology = V.arcologies[0];

	if (arcology.FSSlimnessEnthusiastLaw === 1) {
		if ((slave.boobs < 300) && (slave.butt <= 1) && (slave.waist <= 10)) {
			if ((!FutureSocieties.isActive('FSPhysicalIdealist', arcology)) && (arcology.FSHedonisticDecadenceStrongFat === 0) && (slave.muscles > 30)) {
				/* muscle check*/
				slimLawPass = 0;
			} else if ((FutureSocieties.isActive('FSHedonisticDecadence', arcology)) || (arcology.FSPhysicalIdealistStrongFat === 1)) {
				slimLawPass = 1;
				/* weight check*/
				if (slave.weight > 30) {
					slimLawPass = 0;
				}
			} else if (slave.weight > 10) {
				slimLawPass = 0;
			} else {
				slimLawPass = 1;
			}
		}
	}

	return slimLawPass;
};

/**
 * Returns if slave is considered an acceptable height by arcology standards.
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
globalThis.heightPass = function(slave) {
	const arcology = V.arcologies[0];

	if (FutureSocieties.isActive('FSPetiteAdmiration', arcology)) {
		if (arcology.FSPetiteAdmirationLaw2 === 1) {
			if (slave.height < Height.mean(slave) - 5) {
				return true;
			}
		} else {
			if (slave.height < 160) {
				return true;
			}
		}
	} else if (FutureSocieties.isActive('FSStatuesqueGlorification', arcology)) {
		if (arcology.FSStatuesqueGlorificationLaw2 === 1) {
			if (slave.height + shoeHeight(slave) > Height.mean(slave) + 5) {
				return true;
			}
		} else {
			if (slave.height + shoeHeight(slave) >= 170) {
				return true;
			}
		}
	}
	return false;
};

/**
 * Returns slave bimbo body degree (FSIntellectualDependencyLawBeauty).
 * @param {FC.HumanState} slave
 * @returns {number}
 */
globalThis.bimboScore = function(slave) {
	let degree = 0;
	const modScore = SlaveStatsChecker.modScore(slave);

	if (slave.lips > 70) {
		degree++;
	}
	if ((slave.lipsImplant / slave.lips) >= 0.60) {
		degree++;
	}
	if (slave.boobs >= 2000) {
		degree++;
		if (slave.boobs >= 10000) {
			degree++;
		}
	}
	if ((slave.boobsImplant / slave.boobs) >= 0.60) {
		degree++;
	}
	if (slave.butt > 4) {
		degree++;
		if (slave.butt > 10) {
			degree++;
		}
	}
	if ((slave.buttImplant / slave.butt) >= 0.60) {
		degree++;
	}
	if (slave.belly >= 1500) {
		degree++;
		if (slave.belly >= 20000) {
			degree++;
		}
	}
	if (slave.waist <= -60) {
		degree++;
	}
	if (slave.hips > 1) {
		degree++;
		if (slave.hips > 2) {
			degree++;
		}
	}
	if (slave.dick > 3 && canPenetrate(slave)) {
		degree++;
		if (slave.balls > 5) {
			degree++;
		}
	}
	if (slave.hLength >= 100) {
		degree++;
	}
	if (slave.makeup > 1 && slave.nails > 1) {
		degree++;
	}
	if (modScore.total >= 10) {
		degree++;
	}
	if (modScore.piercing > 5) {
		degree++;
	}
	if (modScore.tat > 3) {
		degree++;
	}
	degree += shoeHeelCategory(slave);
	if (slave.skin === "sun tanned" || slave.skin === "spray tanned") {
		degree++;
	}
	if (getExposure(slave) === 2) {
		degree++;
	}

	// degree can go far higher than the max to allow various FS combinations to take advantage.
	// degree is capped at 6 logically, but this function return oob values for the RA to work with.
	return degree;
};

/**
 * Returns if slave is considered stacked (big T&A) or not.
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
globalThis.isStacked = function(slave) {
	return (slave.butt > 4) && (slave.boobs > 800);
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
globalThis.isXY = function(slave) {
	return (slave.dick > 0);
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
globalThis.isYoung = function(slave) {
	return (slave.visualAge < 30);
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
globalThis.isPreg = function(slave) {
	return ((slave.bellyPreg >= 5000) || (slave.bellyImplant >= 5000));
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
globalThis.isNotPreg = function(slave) {
	return (!isPreg(slave) && (slave.belly < 100) && (slave.weight < 30) && !App.Data.misc.fakeBellies.includes(slave.bellyAccessory));
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
globalThis.isPure = function(slave) {
	return ((slave.boobsImplant === 0) && (slave.buttImplant === 0) && (slave.waist >= -95) && (slave.lipsImplant === 0) && (slave.faceImplant < 30) && (slave.bellyImplant === -1) && (Math.abs(slave.shouldersImplant) < 2) && (Math.abs(slave.hipsImplant) < 2));
};

/**
 * @param {FC.HumanState} slave
 * @returns {boolean}
 */
globalThis.isVirile = function(slave) {
	return (slave.balls > 0 && slave.pubertyXY === 1 && slave.vasectomy === 0 && slave.ballType !== "sterile");
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
globalThis.isSurgicallyImproved = function(slave) {
	return ((slave.boobsImplant > 0) && (slave.buttImplant > 0) && (slave.waist < -10) && (slave.lipsImplant > 0));
};

/**
 * @param {FC.HumanState} slave
 * @returns {boolean}
 */
globalThis.isFullyPotent = function(slave) {
	if (!slave) {
		return null;
	} else if (slave.dick > 0 && slave.balls > 0 && slave.ballType !== "sterile" && slave.hormoneBalance < 100 && slave.drugs !== "hormone blockers" && slave.pubertyXY === 1) {
		return true;
	}
	return false;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean} Whether the slave is considered at least smart
 */
globalThis.isSmart = function(slave) {
	if (!slave) {
		return null;
	} else if (slave.intelligence > 15) {
		return true;
	}
	return false;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean} Whether the slave is considered at least slow
 */
globalThis.isStupid = function(slave) {
	if (!slave) {
		return null;
	} else if (slave.intelligence < -15) {
		return true;
	}
	return false;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean} Whether the slave is a part of the "superior" race
 */
globalThis.isSuperiorRace = function(slave) {
	const arcology = V.arcologies[0];

	if (!slave || !FutureSocieties.isActive('FSSupremacist', arcology)) {
		return null;
	} else {
		if (slave.race === arcology.FSSupremacistRace) {
			return true;
		}
	}
	return false;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean} Whether the slave is a part of the "inferior" race
 */
globalThis.isInferiorRace = function(slave) {
	const arcology = V.arcologies[0];

	if (!slave || !FutureSocieties.isActive('FSSubjugationist', arcology)) {
		return null;
	} else {
		if (slave.race === arcology.FSSubjugationistRace) {
			return true;
		}
	}
	return false;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {number} Whether the slave is a breeder for the Elites
 */
globalThis.isEliteBreeder = function(slave) {
	return slave.breedingMark;
};

/**
 * @param {FC.HumanState} slave
 * @returns {boolean}
 */
globalThis.canGetPregnant = function(slave) {
	if (!slave) {
		return null;
	} else if (slave.preg === -1) { /* contraceptives check */
		return false;
	} else if (!isFertile(slave)) { /* check other fertility factors */
		return false;
	} else if ((slave.ovaries === 1) && (canDoVaginal(slave))) {
		return true;
	} else if ((slave.mpreg === 1) && (canDoAnal(slave))) {
		/* pregmod */
		return true;
	}
	return false;
};

/** contraceptives (.preg === -1) do not negate this function
 * @param {FC.HumanState} slave
 * @returns {boolean}
 */
globalThis.isFertile = function(slave) {
	if (!slave) {
		return null;
	}

	if (slave.womb.length > 0 && slave.geneticQuirks.superfetation < 2) {
		/* currently pregnant without superfetation */
		return false;
	} else if (slave.broodmother > 0) {
		/* currently broodmother */
		return false;
	} else if (slave.preg < -1) {
		/* sterile */
		return false;
	} else if (slave.pregWeek < 0) {
		/* postpartum */
		return false;
	} else if (slave.pubertyXX === 0) {
		return false;
	} else if (slave.ovaryAge >= 47) {
		return false;
	} else if (slave.inflation > 2) {
		return false;
	} else if (slave.bellyImplant >= 0) {
		return false;
	} else if (slave.mpreg === 1 || slave.ovaries === 1) {
		if (slave.womb.length > 0) { // superfetation route
			if (slave.fertPeak !== 0) {
				return false;
			}
		}
		return true;
	}
	return false;
};

/**
 * returns the maximum dick size the slave can maintain erect
 * @param {FC.HumanState} slave
 * @returns {number}
 */
globalThis.maxErectionSize = function(slave) {
	const dickBodyRatio = 2.0; // dick to body ratio normalized to an average height of 165 and an average dick size of 3 ==> with height 165 a dick size of 3 is 1.0 and a size of 6 is 2.0
	if (V.maxErectionSizeOption === 1) { // only height
		/**
		 * Max height erection support ranges (cms)
		 * 1: 28
		 * 2: 55
		 * 3: 83
		 * 4: 110 (min height is 85, so this is the current floor)
		 * 5: 138
		 * 6: 165
		 * 7: 193
		 * 8: 220
		 * 9: 248
		 */
		return Math.floor(dickBodyRatio * ((slave.height / 165) * 3));
	} else if (V.maxErectionSizeOption === 2) { // height and health
		// muscles modify [-25%, 25%], weight modify [-5%, 5%], health modify [-25%, 25%]
		return Math.floor((dickBodyRatio * ((slave.height / 165) * 3)) * (1 + (slave.muscles / 400)) * (1 + (slave.weight / 2000)) * (1 + (slave.health.health / 400)));
	}
	return 6;
};

/**
 * @param {FC.HumanState} slave
 * @returns {boolean}
 */
globalThis.canAchieveErection = function(slave) {
	if (!slave) {
		return null;
	} else {
		const maxErection = maxErectionSize(slave);
		if (slave.dick <= 0) { // needs dick to be erect
			return false;
		} else if (slave.dick <= 10 && slave.drugs === "priapism agents") { // dick size 11 has a dickBodyRatio of 3.3333.... Note: The amount of extra changes needed for sizes > 10 tells me to just cap it at a max size of 10.
			return true;
		} else if (slave.dick > maxErection) {
			return false;
		} else if (slave.aphrodisiacs > 1 || (slave.inflationType === "aphrodisiac" && slave.inflation >= 2)) {
			return true;
		} else if (slave.ballType === "sterile") {
			return false;
		} else if ((slave.balls > 0 ? slave.hormoneBalance < 100 : slave.hormoneBalance <= -100) && slave.drugs !== "hormone blockers") {
			return true;
		} else if (slave.aphrodisiacs > 0 || slave.inflationType === "aphrodisiac") {
			return true;
		}
	}
	return false;
};

/**
 * @param {FC.HumanState} slave
 * @returns {boolean}
 */
globalThis.canPenetrate = function(slave) {
	if (!slave) {
		return null;
	/*
	} else if (slave.belly >= 300000) {
		return false;
	*/
	} else if (slave.clit >= 3 && !slave.chastityPenis && V.experimental.clitoralPenetration) {
		return true;
	} else if (!canAchieveErection(slave)) {
		return false;
	} else if (slave.chastityPenis === 1) {
		return false;
	} else if (slave.dick > 7) {
		return false;
	}
	return true;
};

/**
 * @param {FC.HumanState} slave
 * @returns {boolean}
 */
globalThis.canPenetrateAny = function(slave) {
	if (!slave) {
		return null;
	}
	return canPenetrate(slave) || (slave.clit >= 3 && slave.chastityVagina === 0);
};

/**
 * @param {FC.HumanState} slave
 * @returns {boolean}
 */
globalThis.canSee = function(slave) {
	if (!slave) {
		return null;
	}
	return (getBestVision(slave)) > 0;
};

/**
 *
 * @param {FC.HumanState} slave
 * @returns {boolean}
 */
globalThis.canSeePerfectly = function(slave) {
	if (!canSee(slave)) {
		return false;
	}

	if (getBestVision(slave) === 2 && (slave.eyewear === "blurring glasses") || (slave.eyewear === "blurring contacts")) {
		// could see perfectly, but being blurred
		return false;
	} else if (getBestVision(slave) < 2 && !(slave.eyewear === "corrective glasses" || slave.eyewear === "corrective contacts")) {
		// can't see perfectly and not corrected
		return false;
	}
	return true;
};

/**
 * @param {FC.HumanState} slave
 * @returns {boolean}
 */
globalThis.canHear = function(slave) {
	if (!slave) {
		return null;
	}
	return ((slave.hears > -2) && (slave.earwear !== "deafening ear plugs"));
};

/**
 * @param {FC.HumanState} slave
 * @returns {boolean}
 */
globalThis.canSmell = function(slave) {
	if (!slave) {
		return null;
	}
	return (slave.smells > -1);
};

/**
 * @param {FC.HumanState} slave
 * @returns {boolean}
 */
globalThis.canTaste = function(slave) {
	if (!slave) {
		return null;
	}
	return (slave.tastes > -1);
};

/**
 * @param {FC.HumanState} slave
 * @returns {boolean}
 */
globalThis.canHold = function(slave) {
	if (!slave) {
		return null;
	} else if (hasAnyQuadrupedArms(slave)) {
		return false;
	}
	return hasAnyArms(slave);
};

/** If a slave can walk, she can move and stand.
 * @param {FC.HumanState} slave
 * @returns {boolean}
 */
globalThis.canWalk = function(slave) {
	if (!slave) {
		return null;
	} else if (!hasBothLegs(slave)) {
		return false;
	} else if (!isQuadrupedal(slave) && hasAnyQuadrupedLegs(slave)) {
		return false;
	} else if (tooFatSlave(slave)) {
		return false;
	} else if (tooBigBreasts(slave)) {
		return false;
	} else if (tooBigDick(slave)) {
		return false;
	} else if (tooBigBalls(slave)) {
		return false;
	} else if (tooBigButt(slave)) {
		return false;
	} else if (tooBigBelly(slave)) {
		return false;
	} else if (slave.heels === 1 && shoeHeelCategory(slave) === 0) {
		return false;
	}
	// player exclusives
	if (slave.ID === -1) {
		if (slave.physicalImpairment > 1) {
			return false;
		}
	}
	return true;
};

/** If a slave can stand, she can move, but not necessarily walk.
 * @param {FC.HumanState} slave
 * @returns {boolean}
 */
globalThis.canStand = function(slave) {
	if (!slave) {
		return null;
	/*
	} else if (!canMove(slave)) {
		return false;
	*/
	} else if (!hasAnyLegs(slave)) {
		return false;
	} else if (hasAnyQuadrupedLegs(slave)) {
		return false;
	} else if (!hasBothLegs(slave) && shoeHeelCategory(slave) > 1) {
		return false; // Can't stand on one leg while in heels
	} else if (slave.heels === 1 && shoeHeelCategory(slave) === 0) {
		return false;
	} else if (tooFatSlave(slave)) {
		return false;
	} else if (tooBigBreasts(slave)) {
		return false;
	} else if (tooBigBelly(slave)) {
		return false;
	}
	// player exclusives
	if (slave.ID === -1) {
		if (slave.physicalImpairment > 1) {
			return false;
		}
	}
	return true;
};

/** can the actor move at all?
 * @param {FC.HumanState} slave
 * @returns {boolean}
 */
globalThis.canMove = function(slave) {
	if (!slave) {
		return false;
	} else if (canWalk(slave)) {
		return true; // If she can walk, no point to even check anything after
	} else if (!hasAnyLegs(slave)) {
		return false;
	} else if (!hasBothQuadrupedLegs(slave) && hasAnyQuadrupedLegs(slave)) {
		return false;
	} else if (tooFatSlave(slave)) {
		return false;
	} else if (slave.physicalAge <= 3) {
		if (slave.boobs > 25000 + (slave.muscles * 20)) {
			return false;
		}
		if (slave.belly >= 150000) {
			return false;
		}
		if (slave.balls >= 30 + (slave.muscles * 0.3)) {
			return false;
		}
	} else if (slave.physicalAge <= 12) {
		if (slave.boobs > 100000 + (slave.muscles * 50)) {
			return false;
		}
		if (slave.belly >= 300000) {
			return false;
		}
		if (slave.balls >= 60 + (slave.muscles * 0.5)) {
			return false;
		}
	} else if (slave.physicalAge < 18) {
		if (slave.boobs > 250000 + (slave.muscles * 100)) {
			return false;
		}
		if (slave.belly >= 600000) {
			return false;
		}
		if (slave.balls >= 90 + (slave.muscles * 0.7)) {
			return false;
		}
	} else if (slave.physicalAge >= 18) {
		if (slave.boobs > 500000 + (slave.muscles * 200)) {
			return false;
		}
		if (slave.belly >= 1000000) {
			return false;
		}
		if (slave.balls >= 90 + (slave.muscles * 0.7)) {
			return false;
		}
	}
	// player exclusives
	if (slave.ID === -1) {
		if (slave.physicalImpairment > 1) {
			return false;
		}
	}
	return true;
};

/** Assuming the actor can walk, is their movement hindered by anything? Intended for the player, but could be applied to slaves.
 * @param {FC.HumanState} slave
 * @returns {boolean}
 */
globalThis.isHindered = function(slave) {
	const averageHeight = Height.mean(slave);
	if (!slave) {
		return null;
	} else if (!canWalk(slave) && canMove(slave)) {
		return true;
	} else if (!isQuadrupedal(slave) && hasAnyQuadrupedLegs(slave)) {
		return true;
	} else if (hasBothQuadrupedLegs(slave) && !hasBothQuadrupedArms(slave)) {
		return true;
	} else if (!hasBothQuadrupedLegs(slave) && hasAnyQuadrupedLegs(slave) && !hasBothQuadrupedArms(slave) && hasAnyQuadrupedArms(slave)) {
		return true;
	} else if (slave.weight >= 130 || (slave.weight >= 95 + ((slave.physicalAge - 9) * 5))) {
		return true;
	} else if (slave.muscles > 95 && slave.height <= (averageHeight + 10)) {
		return true;
	} else if (slave.belly >= 60000 || slave.belly >= 60000 / (1 + Math.pow(Math.E, -0.4 * (slave.physicalAge - 14))) || slave.belly >= Math.max(10000, ((12500 / 19) * slave.height) - (1172500 / 19))) {
		return true;
	} else if (slave.boobs > 5000) {
		return true;
	} else if (slave.balls >= 14) {
		return true;
	} else if (slave.hips > 2) {
		return true;
	} else if (slave.butt > 6) {
		return true;
	} else if (slave.muscles < -30) {
		return true;
	}
	// player exclusives
	if (slave.ID === -1) {
		if (onBedRest(slave)) {
			return true;
		} else if (slave.physicalImpairment !== 0) {
			return true;
		// } else if (slave.energy > 95 || slave.need > 0) {
		//	return true;
		}
	}
	return false;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {boolean} checkLanguage Does a bad accent count as being unable to speak?
 * @returns {boolean}
 */
globalThis.canTalk = function(slave, checkLanguage = true) {
	if (!slave) {
		return null;
	} else if (checkLanguage && slave.accent > 2) {
		return false;
	} else if (slave.voice === 0) {
		return false;
	} else if (slave.lips > 95) {
		return false;
	} else if (slave.mouthAccessory === "dildo gag") {
		return false;
	} else if (slave.mouthAccessory === "massive dildo gag") {
		return false;
	} else if (slave.mouthAccessory === "ball gag") {
		return false;
	} else if (slave.mouthAccessory === "bit gag") {
		return false;
	} else if (slave.mouthAccessory === "ring gag") {
		return false;
	}
	return true;
};

/**
 * @param {FC.HumanState} slave
 * @returns {boolean}
 */
globalThis.canDoAnal = function(slave) {
	if (!slave) {
		return null;
	} else if (slave.chastityAnus === 1) {
		return false;
	}
	return true;
};

/**
 * @param {FC.HumanState} slave
 * @returns {boolean}
 */
globalThis.canDoVaginal = function(slave) {
	if (!slave) {
		return null;
	} else if (slave.vagina < 0) {
		return false;
	} else if (slave.chastityVagina === 1) {
		return false;
	}
	return true;
};

/**
 * @param {FC.HumanState} slave
 * @returns {boolean}
 */
globalThis.tooFatSlave = function(slave) {
	if (!slave) {
		return null;
	} else if (slave.weight > 130 + (slave.muscles / 20) && slave.physicalAge <= 3) {
		return true;
	} else if (slave.weight > 160 + (slave.muscles / 15) && slave.physicalAge <= 12) {
		return true;
	} else if (slave.weight > 185 + (slave.muscles / 10) && slave.physicalAge < 18) {
		return true;
	} else if (slave.weight > 190 + (slave.muscles / 5)) {
		return true;
	}
	return false;
};

/**
 * @param {FC.HumanState} slave
 * @returns {boolean}
 */
globalThis.tooBigBreasts = function(slave) {
	if (!slave) {
		return null;
	} else if (slave.boobs > 5000 + (slave.muscles * 20) && slave.physicalAge <= 3) {
		return true;
	} else if (slave.boobs > 10000 + (slave.muscles * 50) && slave.physicalAge <= 12) {
		return true;
	} else if (slave.boobs > 25000 + (slave.muscles * 100) && slave.physicalAge < 18) {
		return true;
	} else if (slave.boobs > 40000 + (slave.muscles * 200)) {
		return true;
	}
	return false;
};

/**
 * @param {FC.HumanState} slave
 * @returns {boolean}
 */
globalThis.tooBigBelly = function(slave) {
	if (!slave) {
		return null;
	} else if (slave.belly >= 120000 + (slave.muscles * 500) && slave.physicalAge <= 3) { // 70k - 170k
		return true;
	} else if (slave.belly >= 150000 + (slave.muscles * 800) && slave.physicalAge <= 12) { // 70k - 230k
		return true;
	} else if (slave.belly >= 350000 + (slave.muscles * 1000) && slave.physicalAge < 18) { // 250k - 450k
		return true;
	} else if (slave.belly >= 450000 + (slave.muscles * 2000)) { // 250k - 650k
		return true;
	}
	return false;
};

/**
 * @param {FC.HumanState} slave
 * @returns {boolean}
 */
globalThis.tooBigBalls = function(slave) {
	if (!slave) {
		return null;
	} else if (slave.balls >= 30 + (slave.muscles * 0.3) && slave.physicalAge <= 3) {
		return true;
	} else if (slave.balls >= 60 + (slave.muscles * 0.5) && slave.physicalAge <= 12) {
		return true;
	} else if (slave.balls >= 90 + (slave.muscles * 0.7)) {
		return true;
	}
	return false;
};

/**
 * @param {FC.HumanState} slave
 * @returns {boolean}
 */
globalThis.tooBigDick = function(slave) {
	if (!slave) {
		return null;
	} else if (slave.dick >= 20 + (slave.muscles * 0.1) && slave.physicalAge <= 3 && slave.dick !== 0) { // 10 - 30
		return true;
	} else if (slave.dick >= 45 + (slave.muscles * 0.3) && slave.physicalAge <= 12) { // 15 - 75
		return true;
	} else if (slave.dick >= 68 + (slave.muscles * 0.4)) { // 28 - 108
		return true;
	}
	return false;
};

/**
 * @param {FC.HumanState} slave
 * @returns {boolean}
 */
globalThis.tooBigButt = function(slave) {
	if (!slave) {
		return null;
	} else if (slave.butt > 10 && slave.physicalAge <= 3) {
		return true;
	} else if (slave.butt > 14 && slave.physicalAge <= 12) {
		return true;
	} else if (slave.butt > 22) {
		return true;
	}
	return false;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
globalThis.isVegetable = function(slave) {
	if (!slave) {
		return false;
	}
	return (slave.fetish === Fetish.MINDBROKEN);
};

/**
 * Returns the hair color the slave was (or would be) born with.
 *
 * @param {FC.HumanState} slave
 * @returns {string}
 */
globalThis.getGeneticHairColor = function(slave) {
	if (slave.geneticQuirks.albinism === 2) {
		return slave.albinismOverride.hColor;
	}
	return slave.origHColor;
};

/**
 * Returns the skin color the slave was (or would be) born with.
 *
 * @param {FC.HumanState} slave
 * @returns {string}
 */
globalThis.getGeneticSkinColor = function(slave) {
	if (slave.geneticQuirks.albinism === 2) {
		return slave.albinismOverride.skin;
	}
	return slave.origSkin;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
globalThis.canBeReceptrix = function(slave) {
	return (
		(slave.ovaries > 0 || slave.mpreg > 0) &&
		isSlaveAvailable(slave) &&
		slave.preg >= 0 &&
		slave.preg < 4 &&
		slave.pregWeek >= 0 &&
		slave.pubertyXX === 1 &&
		slave.pregType < 12 &&
		slave.bellyImplant === -1 &&
		slave.broodmother === 0 &&
		slave.inflation <= 2 &&
		slave.physicalAge < 70
	);
};

/**
 * @param {FC.HumanState} slave
 * @returns {string}
 */
globalThis.milkFlavor = function(slave) {
	if (slave.milkFlavor === "none") {
		return ``;
	}
	return `${slave.milkFlavor}-flavored `;
};

/**
 * @param {FC.HumanState} slave
 * @returns {boolean}
 */
globalThis.canBeDeflowered = function(slave) {
	return (slave.vagina === 0 && canDoVaginal(slave)) || (slave.anus === 0 && canDoAnal(slave));
};

/**
 * A consolidated function for checking if an actor is likely to be aroused at any given moment.
 * @param {FC.HumanState} actor
 * @returns {boolean}
 */
globalThis.isHorny = function(actor) {
	return ((actor.prostate > 0 && actor.preg > 0 && actor.preg > actor.pregData.normalBirth * .75) ||
		(actor.preg > 0 && actor.preg > actor.pregData.normalBirth * .66 && actor.pregMood === 2) ||
		(actor.geneticQuirks.uterineHypersensitivity === 2 &&
			(actor.bellyPreg >= 10000) ||
			(actor.belly > (actor.pregAdaptation * 1000)) ||
			(actor.wombImplant === "restraint" && actor.belly >= 400000)
		) ||
		// (actor.need > 0) ||
		(actor.energy > 95) ||
		(actor.aphrodisiacs > 0) ||
		(actor.inflationType === "aphrodisiac") ||
		(actor.drugs === "priapism agents"));
};

/**
 * A consolidated function for checking if a slave is comfortable with underage partners.
 * @param {FC.HumanState} actor
 * @returns {boolean}
 */
globalThis.acceptsUnderage = function(actor) { // should this consider slaves below an age threshold?
	return (actor.fetish === Fetish.MINDBROKEN ||
		(actor.behavioralQuirk === "sinful") ||
		(actor.devotion > 50) ||
		(actor.trust > 50) ||
		(actor.career === "a slave since birth"));
};

/**
 * @param {FC.HumanState} slave
 * @returns {boolean}
 */
globalThis.isMindbroken = function(slave) {
	return slave.fetish === Fetish.MINDBROKEN;
};
