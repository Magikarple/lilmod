// cSpell:ignore herms

/** Calculate the minimum slave cost for a given market
 * @param {boolean} [includeLaws=false]
 * @returns {number}
 */
globalThis.minimumSlaveCost = function(includeLaws = false) {
	let value = 3000;

	if (V.terrain === "urban") {
		value = 2000;
	} else if (V.terrain === "marine") {
		value = 2500;
	}
	if (V.PC.career === "gang") {
		value -= 1000;
	} else if (V.PC.career === "hoodlum") {
		value -= 750;
	} else if (V.PC.career === "street urchin") {
		value -= 500;
	}

	if (includeLaws) {
		if (V.policies.SMR.basicSMR === 1) {
			value += 500;
		}
		if (V.policies.SMR.healthInspectionSMR === 1) {
			value += 500;
		}
		if (V.policies.SMR.educationSMR === 1) {
			value += 500;
		}
		if (V.policies.SMR.frigiditySMR === 1) {
			value += 500;
		}
		if (V.policies.SMR.honestySMR === 1) {
			value += 500;
		}
		value += policies.countEugenicsSMRs() * 500;

		if (V.policies.SMR.weightSMR === 1) {
			value += 3000;
		}
		if (V.policies.SMR.beauty.basicSMR === 1) {
			value += 3000;
		}
		if (V.policies.SMR.beauty.qualitySMR === 1) {
			value += 10000;
		}
		if (V.policies.SMR.height.basicSMR !== 0) {
			value += 5000;
		}
		if (V.policies.SMR.height.advancedSMR !== 0) {
			value += 10000;
		}
		if (V.policies.SMR.intelligence.basicSMR === 1) {
			value += 2000;
		}
		if (V.policies.SMR.intelligence.qualitySMR === 1) {
			value += 10000;
		}

		const FS = [
			'FSPaternalistSMR', 'FSBodyPuristSMR', 'FSTransformationFetishistSMR',
			'FSYouthPreferentialistSMR', 'FSMaturityPreferentialistSMR', 'FSSlimnessEnthusiastSMR',
			'FSAssetExpansionistSMR', 'FSPastoralistSMR', 'FSPhysicalIdealistSMR',
			'FSHedonisticDecadenceSMR', 'FSEgyptianRevivalistSMR', 'FSEdoRevivalistSMR',
			'FSArabianRevivalistSMR', 'FSChineseRevivalistSMR', 'FSNeoImperialistSMR', `FSAntebellumRevivalistSMR`
		];
		for (const key of FS) {
			if (V.arcologies[0][key]) {
				value += 500;
			}
		}
	}

	return value;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {Array<{text:string, value: number}>}
 */
globalThis.BeautyArray = function(slave) {
	const arcology = V.arcologies[0];
	const arcologyInfo = new App.Utils.Arcology(arcology);
	let beauty = 0;
	let retval = [];

	const FSValues = clampFSValues();

	calcInitBeauty(slave);
	if (slave.fuckdoll === 0) {
		adjustBeauty("Not a fuckdoll", (30));
		calcIntelligenceBeauty(slave);
		calcFaceBeauty(slave);
		calcTeethBeauty(slave);
		calcModBeauty(slave);
		calcCosmeticsBeauty(slave);
		calcFSNotFuckdollBeauty(slave);
		calcMiscNotFuckdollBeauty(slave);
	}
	calcHeightBeauty(slave);
	if (slave.dick > 0) {
		calcDickBeauty(slave);
	}
	if (slave.balls > 0) {
		calcBallsBeauty(slave);
	}
	calcButtBeauty(slave);
	calcHipsBeauty(slave);
	calcBoobsBeauty(slave);
	calcWeightBeauty(slave);
	calcMusclesBeauty(slave);
	calcBodyHairBeauty(slave);
	calcImplantBeauty(slave);
	if (arcology.FSRepopulationFocus > 40) {
		calcRepopulationPregBeauty(slave);
	} else if (arcology.FSRepopulationFocusPregPolicy === 1) {
		calcTrendyPregBeauty(slave);
	} else if (arcology.FSRestart > 40) {
		calcRestartPregBeauty(slave);
	}
	if (arcology.FSRepopulationFocusMilfPolicy === 1) {
		calcTrendyMilfBeauty(slave);
	}
	if (arcology.FSGenderRadicalistLawFuta !== 0) {
		calcFutaLawBeauty(slave);
	}
	calcBodyProportionBeauty(slave);
	calcVoiceBeauty(slave);
	calcLimbsBeauty(slave);
	calcPubertyBeauty(slave);
	calcFSMiscBeauty(slave);

	calcPurityBeauty(slave);
	calcPhysiqueBeauty(slave);
	if (arcology.FSSlimnessEnthusiastLaw === 1) {
		calcSlimBeauty(slave);
	}
	if (arcology.FSGenderFundamentalistLawBeauty + arcology.FSGenderRadicalistLawBeauty > 0) {
		calcGenderLawBeauty(slave);
	}

	calcMultipliersBeauty(slave);

	return retval;

	/** FS values are deliberately unclamped during endweek because we need to accumulate before clamping,
	 *  but we can't let out-of-bounds FS values affect beauty, so we clamp them all locally
	 * @returns {Record<FC.FutureSociety, number>}
	 */
	function clampFSValues() {
		let values = {};
		for (const fs of App.Data.FutureSociety.fsNames) {
			values[fs] = Math.clamp(arcology[fs] || 0, 0, 100);
		}
		return /** @type {Record<FC.FutureSociety, number>} */(values);
	}

	function adjustBeauty(text, beautyChange) {
		if (beautyChange) {
			retval.push({text: text, value: beautyChange});
			beauty += beautyChange;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcInitBeauty(slave) {
		adjustBeauty("Base value for all slaves", 120);
		adjustBeauty("Waist", -(slave.waist / 20));
		adjustBeauty("Lips", (slave.lips / 10));
		adjustBeauty("Clit", (slave.clit));
		if (slave.anus > 3) {
			adjustBeauty("Anus", -(10 + (slave.anus * 2))); /* -20 */
		}
		if (slave.vagina > 3) {
			adjustBeauty("Vagina", -(10 + (slave.vagina * 2))); /* -20 */
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcIntelligenceBeauty(slave) {
		if (arcologyInfo.fsActive('FSSlaveProfessionalism')) {
			adjustBeauty("Intelligence: Professional", ((FSValues.FSSlaveProfessionalism / 10) * (slave.intelligence / 10))); /* 100 */
		} else if (arcologyInfo.fsActive('FSIntellectualDependency')) {
			adjustBeauty("Intelligence: Intellectual Dependency", -((FSValues.FSIntellectualDependency / 10) * ((slave.intelligence + slave.intelligenceImplant) / 20))); /* 65 */
		} else if (arcologyInfo.fsActive('FSDegradationist')) {
			adjustBeauty("Intelligence: Degradationist", -((FSValues.FSDegradationist / 10) * ((slave.intelligence + slave.intelligenceImplant) / 50))); /* 20 */
		} else {
			adjustBeauty("Intelligence: General", ((slave.intelligence + slave.intelligenceImplant) / 10)); /* -10 to 13 */
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcHeightBeauty(slave) {
		if (arcologyInfo.fsActive('FSPetiteAdmiration')) {
			if (arcology.FSPetiteAdmirationLaw2 === 1) {
				if (heightPass(slave)) {
					adjustBeauty("Height: Petite Admiration: Relative Height", ((Height.mean(slave) - slave.height) * (FSValues.FSPetiteAdmiration / 50)));
				} else {
					adjustBeauty("Height: Petite Admiration: Relative Height", -((slave.height - Height.mean(slave)) * (FSValues.FSPetiteAdmiration / 50)));
				}
			} else {
				if (heightPass(slave)) {
					const ageDiv = (slave.physicalAge >= 16) ? 1 : (16 - slave.physicalAge); // this could probably be better, but bad at math. Intent is for younger, and thus naturally shorter than the threshold, slaves receive a weaker bonus.
					adjustBeauty("Height: Petite Admiration", ((161 - slave.height) * ((FSValues.FSPetiteAdmiration / 50) + 0.5) / ageDiv));
				} else if (slave.height >= 170) {
					adjustBeauty("Height: Petite Admiration", -((slave.height - 169) * (FSValues.FSPetiteAdmiration / 50)));
				}
			}
		} else if (arcologyInfo.fsActive('FSStatuesqueGlorification')) {
			if (arcology.FSStatuesqueGlorificationLaw2 === 1) {
				if (heightPass(slave)) {
					adjustBeauty("Height: Statuesque Glorification: Relative Height", ((slave.height - Height.mean(slave)) * (FSValues.FSStatuesqueGlorification / 50)));
				} else {
					adjustBeauty("Height: Statuesque Glorification: Relative Height", -((Height.mean(slave) - slave.height) * (FSValues.FSStatuesqueGlorification / 50)));
				}
			} else {
				const effectiveHeight = slave.height + shoeHeight(slave);
				if (heightPass(slave)) {
					adjustBeauty("Height: Statuesque Glorification", ((effectiveHeight - 169) * ((FSValues.FSStatuesqueGlorification / 50) + 0.5)));
				} else {
					adjustBeauty("Height: Statuesque Glorification", -(((FSValues.FSStatuesqueGlorification / 10) + (170 - effectiveHeight)) * 2));
				}
			}
		} else {
			adjustBeauty("Height: General", ((slave.height - 160) / 10));
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcFaceBeauty(slave) {
		adjustBeauty("Face", (slave.face / 5));
		switch (slave.faceShape) {
			case "masculine":
				if (arcologyInfo.fsActive('FSGenderRadicalist')) {
					adjustBeauty("Masculine face: Gender Radicalist", -((2 - (FSValues.FSGenderRadicalist / 25)) * (slave.face / 30)));
				} else if (arcologyInfo.fsActive('FSGenderFundamentalist')) {
					adjustBeauty("Masculine face: Gender Fundamentalist", -((2 + (FSValues.FSGenderFundamentalist / 25)) * (slave.face / 30)));
				} else {
					adjustBeauty("Masculine face: General", -(2 * (slave.face / 30)));
				}
				break;
			case "androgynous":
				if (arcologyInfo.fsActive('FSGenderRadicalist')) {
					adjustBeauty("Androgynous face: Gender Radicalist", (2 - ((1 - (FSValues.FSGenderRadicalist / 25)) * (slave.face / 30))));
				} else if (arcologyInfo.fsActive('FSGenderFundamentalist')) {
					adjustBeauty("Androgynous face: Gender Fundamentalist", (2 - ((1 + (FSValues.FSGenderFundamentalist / 25)) * (slave.face / 30))));
				} else {
					adjustBeauty("Androgynous face: General", (2 - (slave.face / 30)));
				}
				break;
			case "exotic":
				adjustBeauty("Exotic face: General", (2 * (slave.face / 30)));
				break;
			case "feline":
				adjustBeauty("Feline face: General", (2 * (slave.face / 30)));
				break;
			case "sensual":
				adjustBeauty("Sensual face: General", (2 + (slave.face / 30)));
				break;
			case "cute":
				adjustBeauty("Cute face: General", (8 / 3));
				break;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcTeethBeauty(slave) {
		switch (slave.teeth) {
			case "crooked":
				adjustBeauty("Teeth", -(3));
				break;
			case "gapped":
			case "fang":
				if (slave.faceShape === "cute") {
					adjustBeauty("Teeth", (1));
				} else {
					adjustBeauty("Teeth", -(1));
				}
				break;
			case "straightening braces":
			case "cosmetic braces":
				if (slave.visualAge.isBetween(14, 18) && !FutureSocieties.isActive('FSMaturityPreferentialist', arcology)) {
					adjustBeauty("Teeth", (1));
				}
				break;
			case "removable":
				if (V.policies.gumjobFetishism === 1) {
					adjustBeauty("Teeth: Gumjob Fetishism", (15));
				} else {
					adjustBeauty("Teeth", -(1));
				}
				break;
			case "pointy":
			case "fangs":
			case "baby":
			case "mixed":
				adjustBeauty("Teeth", -(1));
				break;
		}
		if (V.policies.gumjobFetishism === 1) {
			if (slave.teeth !== "removable") {
				adjustBeauty("Teeth: Gumjob Fetishism", -(5));
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcModBeauty(slave) {
		const modScore = SlaveStatsChecker.modScore(slave);
		if (arcology.FSTransformationFetishist > 20 || arcology.FSDegradationist > 20) {
			if (modScore.total > 15 || (modScore.piercing > 8 && modScore.tat > 5)) {
				adjustBeauty("Modded: Greatly", (8 + (modScore.total * 0.25)));
			} else if (modScore.total > 7) {
				adjustBeauty("Modded: Some", (modScore.total - 7));
			}
		} else if (arcology.FSBodyPurist > 20 || arcology.FSPaternalist > 20) {
			if (modScore.total <= 7) {
				adjustBeauty("Modded: Few: Body Purist / Paternalist", (10));
			} else {
				adjustBeauty("Modded: Body Purist", (15 - modScore.total));
			}
		} else {
			if (modScore.total <= 7) {
				adjustBeauty("Modded: Few", (modScore.total));
			} else if (modScore.total > 15 || (modScore.piercing > 8 && modScore.tat > 5)) {
				adjustBeauty("Modded: Greatly", (11));
			} else {
				adjustBeauty("Modded", (7 + (0.5 * (modScore.total - 7))));
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcCosmeticsBeauty(slave) {
		if (V.rep > 10000 || V.rep < 5000) {
			const brands = App.Medicine.Modification.brandRecord(slave);
			if (Object.values(brands).includes(V.brandDesign.official)) {
				if (V.rep > 10000) {
					adjustBeauty("Brand: Famous", (1));
				} else if (V.rep < 5000) {
					adjustBeauty("Brand: Owner not Famous", -(1));
				}
			}
		}
		if (slave.minorInjury !== 0) {
			adjustBeauty("Minor Injury", -(2));
		}
		const scars = App.Medicine.Modification.scarRecord(slave);
		for (const bodypart of Object.keys(scars)) {
			if (scars[bodypart].surgical > 0) {
				adjustBeauty("Scar", -(scars[bodypart].surgical));
			}
		}
		if (slave.nails > 0) {
			adjustBeauty("Nails", (1));
		}
		if (slave.makeup === 0) {
			if (FutureSocieties.isActive('FSBodyPurist', arcology)) {
				if (slave.face > 10) {
					adjustBeauty("Body Purist: Makeup-free beauty", 2);
				} else {
					adjustBeauty("Body Purist: Makeup-free honesty", 1);
				}
			}
		} else {
			if (FutureSocieties.isActive('FSDegradationist', arcology) && slave.makeup > 1) {
				adjustBeauty("Degradationist: Heavy makeup", 2);
			} else if (FutureSocieties.isActive('FSBodyPurist', arcology)) {
				if (slave.makeup > 1) {
					adjustBeauty("Body Purist: Unsightly makeup", -1);
				} else {
					// no bonus or penalty for light makeup in Body Purist arcologies
				}
			} else {
				adjustBeauty("Makeup", 1);
			}
		}
		switch (slave.markings) {
			case "beauty mark":
				if (slave.face > 40) {
					adjustBeauty("Beautymark: Beautiful Face", 6);
				} else if (slave.face < -10) {
					adjustBeauty("Beautymark: Ugly Face", -6);
				}
				break;
			case "birthmark":
				if (slave.prestige > 0 || slave.porn.prestige > 1) {
					adjustBeauty("Birthmark: Prestigious", 4);
				} else {
					adjustBeauty("Birthmark: Not Prestigious", -4);
				}
				break;
			case "freckles":
			case "heavily freckled":
				if (App.Medicine.Modification.naturalSkins.includes(slave.skin) && skinToneLevel(slave.skin).isBetween(5, 10)) {
					adjustBeauty("Freckles", 2);
					if (App.Data.misc.redheadColors.includes(slave.hColor)) {
						adjustBeauty("Freckles: Redhead", 2);
					}
				}
				break;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcFSNotFuckdollBeauty(slave) {
		if (arcologyInfo.fsActive('FSSupremacist')) {
			if (slave.race === arcology.FSSupremacistRace) {
				adjustBeauty("Supremacist Race", ((FSValues.FSSupremacist / 3) + (arcology.FSSupremacistLawME * 10)));
			}
		}
		if (arcologyInfo.fsActive('FSSubjugationist')) {
			if (slave.race === arcology.FSSubjugationistRace) {
				adjustBeauty("Inferior Race", -((FSValues.FSSubjugationist / 2) - (arcology.FSSubjugationistLawME * 10)));
			}
		}
		if (arcology.FSGenderFundamentalistLawBimbo === 1) { // TODO: Needs review in light of miseducation
			if (slave.intelligenceImplant === 0) {
				adjustBeauty("Uneducated: Bimbo Law: Gender Fundamentalist", (30));
			} else if (slave.intelligenceImplant > 15) {
				adjustBeauty("Educated: Bimbo Law: Gender Fundamentalist", -(slave.intelligenceImplant * 3));
			} else {
				adjustBeauty("Low Education/Miseducated: Bimbo Law: Gender Fundamentalist", -(Math.abs(slave.intelligenceImplant * 1.5)));
			}
		} else if (arcologyInfo.fsActive('FSSlaveProfessionalism')) {
			if (slave.intelligenceImplant >= 30) {
				adjustBeauty("Highly Educated: Professionalism", (5 + (FSValues.FSSlaveProfessionalism / 10))); /* 15 */
			} else if (slave.intelligenceImplant >= 15) {
				adjustBeauty("Educated: Professionalism", (FSValues.FSSlaveProfessionalism / 20)); /* 5 */
			} else {
				adjustBeauty("Low Education/Miseducated: Professionalism", -(((FSValues.FSSlaveProfessionalism / 10) * 3) - slave.intelligenceImplant)); /* -30 */
			}
		} else if (arcologyInfo.fsActive('FSIntellectualDependency')) {
			if (slave.intelligenceImplant > 15) {
				adjustBeauty("Educated: Intellectual Dependency", -((FSValues.FSIntellectualDependency / 10) * (slave.intelligenceImplant / 10))); /* -30 */
			}
		}
		if (arcologyInfo.fsActive('FSSlaveProfessionalism')) {
			adjustBeauty("Skilled: Slave Professionalism", ((FSValues.FSSlaveProfessionalism / 50) * ((slave.skill.entertainment + slave.skill.whoring + slave.skill.oral + slave.skill.anal + slave.skill.vaginal + adjustedPenSkill(slave)) / 100))); /* 10 */
		}
		if (arcologyInfo.fsActive('FSYouthPreferentialist')) {
			if (slave.visualAge < 30) {
				adjustBeauty("Age: Youth Preferentialist", Math.clamp(((FSValues.FSYouthPreferentialist / 2) + (arcology.FSYouthPreferentialistLaw * 10)) - Math.round(Math.abs(slave.visualAge - V.idealAge) * 2.222), 0, 60)); /* max 60 */
			}
		} else if (arcologyInfo.fsActive('FSMaturityPreferentialist')) {
			if (slave.visualAge >= 30 && slave.visualAge < 60) {
				adjustBeauty("Age: Maturity Preferentialist", Math.clamp(((FSValues.FSMaturityPreferentialist / 2) + (arcology.FSMaturityPreferentialistLaw * 10)) - Math.round(Math.abs(slave.visualAge - V.idealAge) * 2.222), 0, 60)); /* max 60 */
			}
		}
		if (arcology.FSBodyPurist > 20) {
			/* bonus for virgin slaves */
			if (slave.vagina === 0 && slave.counter.vaginal === 0) {
				adjustBeauty("Vaginal: Body Purist", (30 * (FSValues.FSBodyPurist / 100)));
			}
			if (slave.anus === 0 && slave.counter.anal === 0) {
				adjustBeauty("Anal: Body Purist", (30 * (FSValues.FSBodyPurist / 100)));
			}
		}
		if (arcologyInfo.fsActive('FSEdoRevivalist')) {
			if (slave.nationality === "Japanese" || slave.nationality === "Edo Revivalist") {
				adjustBeauty("Nationality: Japanese: Edo Revivalist", (FSValues.FSEdoRevivalist / 2));
			} else if (slave.race === "asian") {
				adjustBeauty("Race: Asian: Edo Revivalist", (FSValues.FSEdoRevivalist / 5));
			} else {
				adjustBeauty("Neither Asian nor Japanese: Edo Revivalist", -(FSValues.FSEdoRevivalist / 4));
			}
			if (V.language === "Japanese" && canTalk(slave)) {
				if (slave.accent > 1) {
					adjustBeauty("Heavy Foreign Accent: Edo Revivalist", -(FSValues.FSEdoRevivalist / 2));
				} else if (slave.accent > 0) {
					adjustBeauty("Foreign Accent: Edo Revivalist", -(FSValues.FSEdoRevivalist / 5));
				} else {
					adjustBeauty("No Accent: Edo Revivalist", (FSValues.FSEdoRevivalist / 10));
				}
			}
		} else if (arcologyInfo.fsActive('FSChineseRevivalist')) {
			if (slave.nationality === "Chinese" || slave.nationality === "Ancient Chinese Revivalist") {
				adjustBeauty("Nationality: Chinese: Chinese Revivalist", (FSValues.FSChineseRevivalist / 2));
			} else if (slave.race === "asian") {
				adjustBeauty("Race: Asian: Chinese Revivalist", (FSValues.FSChineseRevivalist / 5));
			} else {
				adjustBeauty("Neither Asian nor Chinese: Chinese Revivalist", -(FSValues.FSChineseRevivalist / 4));
			}
			if (V.language === "Chinese" && canTalk(slave)) {
				if (slave.accent > 1) {
					adjustBeauty("Heavy Foreign Accent: Chinese Revivalist", -(FSValues.FSChineseRevivalist / 2));
				} else if (slave.accent > 0) {
					adjustBeauty("Foreign Accent: Chinese Revivalist", -(FSValues.FSChineseRevivalist / 5));
				} else {
					adjustBeauty("No Accent: Chinese Revivalist", (FSValues.FSChineseRevivalist / 10));
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcMiscNotFuckdollBeauty(slave) {
		adjustBeauty(`Health: Health (${slave.health.health})`, (Math.min(slave.health.health, 100) / 5));
		adjustBeauty(`Health: Tired (${slave.health.health})`, -(Math.trunc(slave.health.tired / 20)));
		if (slave.health.tired > 80) {
			adjustBeauty("Health: Extremely Tired", -2);
		} else if (slave.health.tired > 50) {
			adjustBeauty("Health: Very Tired", -1);
		}
		adjustBeauty(`Health: Ill (${slave.health.illness})`, -(Math.pow(slave.health.illness, 2)));
		adjustBeauty(`Voice Pitch`, (slave.voice));
		adjustBeauty(`Skill: Entertainment (${slave.skill.entertainment})`, (slave.skill.entertainment / 10));
		adjustBeauty(`Skill: Whoring (${slave.skill.whoring})`, (slave.skill.whoring / 10));
		const ageBeautyPenaltyOffset = slave.visualAge - V.idealAge === 0 ? 0 : 9;
		adjustBeauty(`Age: Visual Age (${slave.visualAge})`, -((3 * Math.abs(slave.visualAge - V.idealAge)) + ageBeautyPenaltyOffset));
		if (App.Data.Careers.General.entertainment.includes(slave.career)) {
			adjustBeauty("Career: Entertainment", (20));
		} else if (V.week - slave.weekAcquired >= 20 && slave.skill.entertainment >= 100) {
			adjustBeauty("Experience: Entertainment", (10));
		}
		if (slave.race === "white") {
			if (slave.origRace === "white") {
				adjustBeauty("White girls be like", 4);
			} else {
				adjustBeauty("Fake white girls be like", 2);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcDickBeauty(slave) {
		if (arcology.FSAssetExpansionist > 20 && !arcologyInfo.fsActive('FSGenderFundamentalist')) {
			if (slave.dick >= 20) {
				adjustBeauty("Enormous Dick: Asset Expansionist", (17 + (slave.dick * (FSValues.FSAssetExpansionist / 500)))); /* 23 */
			} else if (slave.dick >= 10) {
				adjustBeauty("Huge Dick: Asset Expansionist", (10 + (slave.dick * (FSValues.FSAssetExpansionist / 300)))); /* 16.3 */
			} else if (slave.dick > 6) {
				adjustBeauty("Large Dick: Asset Expansionist", (slave.dick * (1 + (FSValues.FSAssetExpansionist / 100)))); /* 10 */
			}
		} else if (arcologyInfo.fsActive('FSGenderFundamentalist')) {
			if (slave.dick > 0) {
				if (slave.genes === "XY") {
					adjustBeauty("Dick: Gender Fundamentalist", Math.min(5, (-1 + slave.dick)));
				} else {
					adjustBeauty("Dick: Gender Fundamentalist", -(3 * slave.dick));
				}
			}
		} else if (arcologyInfo.fsActive('FSGenderRadicalist')) {
			if (slave.dick > 20) {
				adjustBeauty("EnormousDick: Gender Radicalist", (20 + (slave.dick * (FSValues.FSGenderRadicalist / 400)))); /* 27.5 */
			} else if (slave.dick >= 10) {
				adjustBeauty("HugeDick: Gender Radicalist", (10 + (slave.dick * (FSValues.FSGenderRadicalist / 200)))); /* 20 */
			} else if (slave.dick > 0) {
				adjustBeauty("Dick: Gender Radicalist", (slave.dick * (1 + (FSValues.FSGenderRadicalist / 100)))); /* 10 */
			}
		} else {
			// this will need to be split into male/female in the future
			adjustBeauty("Dick: General", -(2 * slave.dick));
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcBallsBeauty(slave) {
		if (arcology.FSAssetExpansionist > 20 && !arcologyInfo.fsActive('FSGenderFundamentalist')) {
			if (slave.balls > 100) {
				adjustBeauty("Inhuman Balls: Asset Expansionist", (41 + (slave.balls * (FSValues.FSAssetExpansionist / 500)))); /* 66 */
			} else if (slave.balls > 80) {
				adjustBeauty("Enormous Balls: Asset Expansionist", (16 + (slave.balls * (FSValues.FSAssetExpansionist / 400)))); /* 41 */
			} else if (slave.balls > 60) {
				adjustBeauty("Huge Balls: Asset Expansionist", (6 + (slave.balls * (FSValues.FSAssetExpansionist / 800)))); /* 16 */
			} else if (slave.balls > 10) {
				adjustBeauty("Big Balls: Asset Expansionist", (slave.balls * (FSValues.FSAssetExpansionist / 1000))); /* 6 */
			}
		} else if (arcologyInfo.fsActive('FSGenderFundamentalist')) {
			if (slave.scrotum > 0) {
				adjustBeauty("Scrotum: Gender Fundamentalist", -(slave.balls * (1 + (FSValues.FSGenderFundamentalist / 200))));
			}
		} else if (arcologyInfo.fsActive('FSGenderRadicalist')) {
			if (slave.scrotum > 0) {
				if (slave.balls > 100) {
					adjustBeauty("Inhuman Scrotum: Gender Radicalist", (40 + (slave.balls * (FSValues.FSGenderRadicalist / 2000)))); /* 46.25 */
				} else if (slave.balls > 60) {
					adjustBeauty("Enormous Scrotum: Gender Radicalist", (30 + (slave.balls * (FSValues.FSGenderRadicalist / 1000)))); /* 40 */
				} else if (slave.balls > 10) {
					adjustBeauty("Huge Scrotum: Gender Radicalist", (15 + (slave.balls * (FSValues.FSGenderRadicalist / 400)))); /* 30 */
				} else {
					adjustBeauty("Scrotum: Gender Radicalist", (slave.balls * (1 + (FSValues.FSGenderRadicalist / 200)))); /* 15 */
				}
			}
		} else {
			if (slave.scrotum > 0) {
				adjustBeauty("Scrotum: General", -(slave.balls));
			}
		}
		if (arcologyInfo.fsActive('FSRestart')) {
			/* Eugenics does not like slaves having working balls */
			if (slave.ballType === "human") {
				adjustBeauty("Balls: Eugenics", -(slave.balls * (1 + (FSValues.FSRestart / 100))));
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcButtBeauty(slave) {
		if (slave.butt <= 10) {
			adjustBeauty("Butt", (1.5 * slave.butt)); /* max 15 */
		} else {
			adjustBeauty("Inhuman Butt", (10 + (slave.butt / 2))); /* range (15, 20] */
		}
		if ((arcology.FSTransformationFetishist > 20 && !arcologyInfo.fsActive('FSSlimnessEnthusiast')) || arcology.FSAssetExpansionist > 20) {
			if (slave.butt <= 2) {
				adjustBeauty("Small Butt: Transformation Fetishist / Asset Expansionist", (2 * (slave.butt - 1))); /* 2 */
			} else if (slave.butt <= 4) {
				adjustBeauty("Big Bubble Butt: Transformation Fetishist / Asset Expansionist", (2 + 1.5 * (slave.butt - 2))); /* 5 */
			} else if (slave.butt <= 10) {
				adjustBeauty("Ridiculous Butt: Transformation Fetishist / Asset Expansionist", (5 + (slave.butt - 4))); /* 11 */
			} else {
				adjustBeauty("Inhuman Butt: Transformation Fetishist / Asset Expansionist", (7 + 0.5 * (slave.butt - 5))); /* 14.5 */
			} /* maybe buff butts? */
		} else if (arcology.FSSlimnessEnthusiast > 20) {
			if (slave.butt <= 3) {
				adjustBeauty("Small Butt: Slimness Enthusiast", (12 + 3 * (slave.butt - 1))); /* 18 buff if asses get buffed */
			} else if (slave.butt <= 5) {
				adjustBeauty("Big Butt: Slimness Enthusiast", 9);
			} else {
				adjustBeauty("Absurd Butt: Slimness Enthusiast", -(10 + 3 * slave.butt)); /* -70 */
			}
		} else {
			if (slave.butt <= 2) {
				adjustBeauty("Small Butt: General", (2 * (slave.butt - 1))); /* 2 */
			} else if (slave.butt <= 4) {
				adjustBeauty("Big Bubble Butt: General", (2 + (1.5 * (slave.butt - 2)))); /* 5 */
			} else if (slave.butt <= 8) {
				adjustBeauty("Ridiculous Butt: General", (2 + (1.5 * (slave.butt - 2)))); /* 11 */
			} else {
				adjustBeauty("Inhuman Butt: General", 9);
			}
		}
		if (arcology.FSTransformationFetishist > 20) {
			/* the cost of using AE's values */
			if (arcologyInfo.fsActive('FSSlimnessEnthusiast')) {
				if (slave.butt >= 3) {
					if (slave.buttImplant / slave.butt < 0.25) {
						adjustBeauty("Butt Implant: Slimness Enthusiast", -(2 * (slave.butt - 1) + 10));
					}
				}
			} else {
				if (slave.butt >= 6) {
					if (slave.buttImplant / slave.butt < 0.5) {
						adjustBeauty("Butt Implant: General", -((1.5 * slave.butt) + 6)); /* will get nasty at huge sizes */
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcHipsBeauty(slave) {
		adjustBeauty("Hips", (2 * slave.hips));
		/* butts in general may need buffs */
		switch (slave.hips) {
			case -2:
				if (slave.butt > 2) {
					if (!arcologyInfo.fsActive('FSTransformationFetishist') && !arcologyInfo.fsActive('FSHedonisticDecadence')) {
						adjustBeauty("Hips: General", (2 - slave.butt));
					} else {
						adjustBeauty("Hips: Transformation Fetishist or Hedonistic Decadence", 1);
					}
				} else {
					adjustBeauty("Hips/Butt Ratio", 1);
				}
				break;
			case -1:
				if (slave.butt > 4) {
					if (!arcologyInfo.fsActive('FSTransformationFetishist') && !arcologyInfo.fsActive('FSHedonisticDecadence')) {
						adjustBeauty("Hips: General", (4 - slave.butt));
					} else {
						adjustBeauty("Hips: Transformation Fetishist or Hedonistic Decadence", 1);
					}
				} else {
					adjustBeauty("Hips/Butt Ratio", 1);
				}
				break;
			case 0:
				if (slave.butt > 6) {
					if (!arcologyInfo.fsActive('FSTransformationFetishist') && !arcologyInfo.fsActive('FSHedonisticDecadence')) {
						adjustBeauty("Hips: General", (6 - slave.butt));
					} else {
						adjustBeauty("Hips: Transformation Fetishist or Hedonistic Decadence", 1);
					}
				} else if (slave.butt <= 1) {
					adjustBeauty("Hips/Butt Ratio", (slave.butt - 2));
				} else {
					adjustBeauty("Hips/Butt Ratio", 1);
				}
				break;
			case 1:
				if (slave.butt > 8) {
					if (!arcologyInfo.fsActive('FSTransformationFetishist') && !arcologyInfo.fsActive('FSHedonisticDecadence')) {
						adjustBeauty("Hips: General", (8 - slave.butt));
					} else {
						adjustBeauty("Hips: Transformation Fetishist or Hedonistic Decadence", 1);
					}
				} else if (slave.butt <= 2) {
					adjustBeauty("Hips/Butt Ratio", (slave.butt - 3));
				} else {
					adjustBeauty("Hips/Butt Ratio", 1);
				}
				break;
			case 2:
				if (slave.butt <= 3) {
					adjustBeauty("Hips/Butt Ratio", (slave.butt - 4));
				} else {
					adjustBeauty("Hips/Butt Ratio", 1);
				}
				break;
			case 3:
				if (slave.butt <= 8) {
					adjustBeauty("Hips/Butt Ratio", (slave.butt - 8));
				} else {
					adjustBeauty("Hips/Butt Ratio", 1);
				}
				break;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcBoobsBeauty(slave) {
		if ((arcology.FSTransformationFetishist > 20 && !arcologyInfo.fsActive('FSSlimnessEnthusiast')) || arcology.FSAssetExpansionist > 20) {
			if (slave.boobs <= 750) {
				adjustBeauty("Boob Size: Less than DD: Transformation Fetishist / Asset Expansionist", (-4 + 0.01 * (slave.boobs))); /* 3.5 */
			} else if (slave.boobs <= 2050) {
				adjustBeauty("Boob Size: Less than J: Transformation Fetishist / Asset Expansionist", (3.5 + 0.0175 * (slave.boobs - 750))); /* 26.25 */
			} else if (slave.boobs <= 3000) {
				adjustBeauty("Boob Size: Less than N: Transformation Fetishist / Asset Expansionist", (26.25 + 0.025 * (slave.boobs - 2050))); /* 50 */
			} else if (slave.boobs <= 25000) {
				adjustBeauty("Boob Size: Scale-breaking: Transformation Fetishist / Asset Expansionist", (50 + 0.005 * (slave.boobs - 3000))); /* 160 - this might need to be lowered. Maybe drop the 50? Otherwise break it down more. */
			} else {
				adjustBeauty("Boob Size: Inconceivable: Transformation Fetishist / Asset Expansionist", (160 + 0.001 * (slave.boobs - 25000))); /* 185 */
			}
		} else if (arcology.FSSlimnessEnthusiast > 20) {
			if (slave.boobs <= 500) {
				adjustBeauty("Boob Size: Less than C: Slimness Fetishist", (0.08 * (slave.boobs))); /* 40 - buff me to be in line with higher end asset exp */
			} else if (slave.boobs <= 1000) {
				adjustBeauty("Boob Size: Less than F: Slimness Fetishist", (10));
			} else if (slave.boobs <= 3000) {
				adjustBeauty("Boob Size: Less than N: Slimness Fetishist", 5);
			} else {
				adjustBeauty("Boob Size: Greater than N: Slimness Fetishist", -(5 + 0.005 * (slave.boobs - 3000))); /* -110 */
			}
		} else {
			if (slave.boobs <= 1200) {
				adjustBeauty("Boob Size: Less than G: General", (0.02 * (slave.boobs - 200))); /* 20 */
			} else if (slave.boobs <= 2400) {
				adjustBeauty("Boob Size: Less than L: General", (20 + (0.01 * (slave.boobs - 1200)))); /* 32 */
			} else if (slave.boobs <= 3600) {
				adjustBeauty("Boob Size: Less than P: General", (32 + (0.005 * (slave.boobs - 2400)))); /* 38 */
			} else if (slave.boobs <= 10000) {
				adjustBeauty("Boob Size: Less than Scale-breaking: General", 38);
			} else if (slave.boobs <= 25000) {
				adjustBeauty("Boob Size: Less than Inconceivable: General", (30));
			} else {
				adjustBeauty("Boob Size: Inconceivable: General", (20));
			}
		}
		if (arcology.FSTransformationFetishist > 20) {
			/* the cost of using AE's values */
			if (arcologyInfo.fsActive('FSSlimnessEnthusiast')) {
				if (slave.boobs >= 400) {
					if (slave.boobs >= 10000) {
						if (slave.boobsImplant / slave.boobs < 0.75) {
							adjustBeauty("Boob Implant: Slimness Enthusiast", -((0.05 * slave.boobs) + 10));
						}
					} else if (slave.boobs >= 2000) {
						if (slave.boobsImplant / slave.boobs < 0.5) {
							adjustBeauty("Boob Implant: Slimness Enthusiast", -((0.05 * slave.boobs) + 10));
						}
					} else if (slave.boobs >= 1000) {
						if (slave.boobsImplant / slave.boobs < 0.25) {
							adjustBeauty("Boob Implant: Slimness Enthusiast", -((0.05 * slave.boobs) + 10));
						}
					} else {
						if (slave.boobsImplant / slave.boobs < 0.1) {
							adjustBeauty("Boob Implant: Slimness Enthusiast", -((0.05 * slave.boobs) + 10));
						}
					}
				}
			} else {
				if (slave.boobs >= 600) {
					if (slave.boobs >= 10000) {
						if (slave.boobsImplant / slave.boobs < 0.75) {
							adjustBeauty("Boob Implant: General", -(30 + (0.005 * slave.boobs))); /* will get nasty at huge sizes */
						}
					} else if (slave.boobs >= 2000) {
						if (slave.boobsImplant / slave.boobs < 0.5) {
							adjustBeauty("Boob Implant: General", -(30 + (0.005 * slave.boobs))); /* will get nasty at huge sizes */
						}
					} else if (slave.boobs >= 1000) {
						if (slave.boobsImplant / slave.boobs < 0.25) {
							adjustBeauty("Boob Implant: General", -(30 + (0.005 * slave.boobs))); /* will get nasty at huge sizes */
						}
					} else {
						if (slave.boobsImplant / slave.boobs < 0.1) {
							adjustBeauty("Boob Implant: General", -(30 + (0.005 * slave.boobs))); /* will get nasty at huge sizes */
						}
					}
				}
			}
		}
		if (slave.boobs > 250) {
			if (slave.boobShape === "perky") {
				adjustBeauty("Boob Shape", 6);
			} else if (slave.boobShape === "torpedo-shaped") {
				adjustBeauty("Boob Shape", 6);
			} else if (slave.boobShape === "downward-facing") {
				adjustBeauty("Boob Shape", -4);
			} else if (slave.boobShape === "saggy") {
				adjustBeauty("Boob Shape", -4);
			} else if (slave.boobShape === "spherical") {
				if (arcologyInfo.fsActive('FSTransformationFetishist')) {
					adjustBeauty("Boob Shape: Transformation Fetishist", (FSValues.FSTransformationFetishist / 10));
				} else if (arcologyInfo.fsActive('FSBodyPurist')) {
					adjustBeauty("Boob Shape: Body Purist", -(FSValues.FSBodyPurist / 2));
				} else {
					adjustBeauty("Boob Shape", -1);
				}
			}
		}
		if (slave.nipples === "huge") {
			adjustBeauty("Nipples", 4);
		} else if (slave.nipples === "inverted") {
			adjustBeauty("Nipples", 2);
		} else if (slave.nipples === "puffy") {
			adjustBeauty("Nipples", 2);
		} else if (slave.nipples === "tiny") {
			adjustBeauty("Nipples", -2);
		} else if (slave.nipples === "fuckable") {
			if (arcologyInfo.fsActive('FSTransformationFetishist')) {
				adjustBeauty("Nipples: Transformation Fetishist", (FSValues.FSTransformationFetishist / 10));
			}
		} else if (slave.nipples === "flat") {
			if (arcologyInfo.fsActive('FSTransformationFetishist')) {
				adjustBeauty("Nipples: Transformation Fetishist", (FSValues.FSTransformationFetishist / 20));
			} else {
				adjustBeauty("Nipples", -2);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcWeightBeauty(slave) {
		if (arcology.FSHedonisticDecadence > 20) {
			if (slave.weight < -95) {
				adjustBeauty("Weight: Hedonistic Decadence", (-70 + (slave.weight / 10))); /* -80 */
			} else if (slave.weight < -30) {
				adjustBeauty("Weight: Hedonistic Decadence", (-30 + (slave.weight / 3))); /* -61 */
			} else if (slave.weight < -10) {
				adjustBeauty("Weight: Hedonistic Decadence", (slave.weight)); /* -30 */
			} else if (slave.weight <= 10) {
				/* no effect */
			} else if (slave.weight <= 30) {
				adjustBeauty("Weight: Hedonistic Decadence", (slave.weight / 2)); /* 15 */
			} else if (slave.weight <= 95) {
				adjustBeauty("Weight: Hedonistic Decadence", (15 + (slave.weight / 7))); /* 28.5 */
			} else if (slave.weight <= 130) {
				adjustBeauty("Weight: Hedonistic Decadence", (28 + (slave.weight / 10))); /* 41 */
			} else if (slave.weight <= 160) {
				adjustBeauty("Weight: Hedonistic Decadence", (42 + (slave.weight / 20))); /* 50 */
			} else if (slave.weight <= 190) {
				adjustBeauty("Weight: Hedonistic Decadence", (50 - (slave.weight / 25))); /* 42.5 */
			} else {
				adjustBeauty("Weight: Hedonistic Decadence", (40 - (slave.weight / 20))); /* 30 */
			}
		} else {
			if (slave.weight > 130) {
				adjustBeauty("Weight", -(Math.abs(slave.weight) / 5));
			} else if (slave.hips === 3) {
				if (slave.weight < -10) {
					adjustBeauty("Weight", -(Math.abs(slave.weight) / 10));
				}
			} else if (slave.hips === 2) {
				if (slave.weight > 95) {
					adjustBeauty("Weight", -(Math.abs(slave.weight) / 15));
				} else if (slave.weight < -30) {
					adjustBeauty("Weight", -(Math.abs(slave.weight) / 10));
				}
			} else if (slave.hips === -2) {
				if (slave.weight < -95 || slave.weight > 30) {
					adjustBeauty("Weight", -(Math.abs(slave.weight) / 10));
				}
			} else {
				if (Math.abs(slave.weight) > 30) {
					adjustBeauty("Weight", -(Math.abs(slave.weight) / 10));
				}
			}
		}
		if (arcologyInfo.fsActive('FSPhysicalIdealist')) {
			if (arcology.FSPhysicalIdealistStrongFat === 1) {
				if (slave.weight > 10 && slave.weight <= 130) {
					adjustBeauty("Weight: Physical Idealist: Strongfat", (slave.weight * (FSValues.FSPhysicalIdealist / 200))); /* 65 */
				} else {
					adjustBeauty("Weight: Physical Idealist: Strongfat", -(Math.abs(slave.weight) / 2));
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcMusclesBeauty(slave) {
		if (slave.muscles > 30 || (slave.muscles <= -5 && canMove(slave))) {
			adjustBeauty("Muscles", -(slave.muscles / 30));
		} else if (slave.muscles < -30) {
			adjustBeauty("Muscles", (slave.muscles / 30));
		}
		if (arcologyInfo.fsActive('FSPhysicalIdealist')) {
			if (arcology.FSPhysicalIdealistLaw === 1) {
				if (Math.abs(slave.weight) <= 30 && slave.health.condition >= 20 && slave.muscles >= 20 && slave.muscles <= 50) {
					adjustBeauty("Muscles: Physical Idealist: Fit Feminine Ideal", ((slave.muscles + (Math.min(slave.health.condition, 300) / 5)) * (FSValues.FSPhysicalIdealist / 100)));
				} else {
					adjustBeauty("Muscles: Physical Idealist: Fit Feminine Ideal", -(30));
				}
			} else {
				if (slave.muscles > 30 || slave.muscles <= -5) {
					adjustBeauty("Muscles: Physical Idealist", (slave.muscles * (FSValues.FSPhysicalIdealist / 120))); /* +-83 */
				}
			}
		} else if (arcologyInfo.fsActive('FSHedonisticDecadence')) {
			if (slave.muscles < -10) {
				adjustBeauty("Muscles: Hedonistic Decadence", (Math.abs(slave.muscles) * (FSValues.FSHedonisticDecadence / 160))); /* 62.5 */
			} else if (slave.muscles > 5) {
				if (arcology.FSHedonisticDecadenceStrongFat === 1) {
					adjustBeauty("Muscles: Hedonistic Decadence: Strongfat", (slave.muscles * (FSValues.FSHedonisticDecadence / 200))); /* 50 */
				} else {
					adjustBeauty("Muscles: Hedonistic Decadence", -(slave.muscles * (FSValues.FSHedonisticDecadence / 200))); /* -50 */
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcBodyHairBeauty(slave) {
		if (slave.physicalAge < 11) {
			adjustBeauty("Hair: Youth", 4);
		} else if (slave.physicalAge >= 13) {
			switch (slave.underArmHStyle) {
				case "hairless":
				case "bald":
				case "waxed":
				case "shaved":
					adjustBeauty(`Armpit Hair: ${slave.underArmHStyle}`, 2);
					break;
				case "bushy":
					if (arcology.FSBodyPurist > 0) {
						adjustBeauty(`Armpit Hair: ${slave.underArmHStyle}: Body Purist`, 4);
					} else {
						adjustBeauty(`Armpit Hair: ${slave.underArmHStyle}`, -2);
					}
					break;
			}
			switch (slave.pubicHStyle) {
				case "hairless":
				case "bald":
				case "waxed":
					adjustBeauty(`Pubic Hair: ${slave.pubicHStyle}`, 2);
					break;
				case "bushy":
					if (arcology.FSBodyPurist > 0) {
						adjustBeauty(`Pubic Hair: ${slave.pubicHStyle}: Body Purist`, 2);
					} else {
						adjustBeauty(`Pubic Hair: ${slave.pubicHStyle}`, -4);
					}
					break;
				case "bushy in the front and neat in the rear":
					if (arcology.FSBodyPurist > 0) {
						adjustBeauty(`Pubic Hair: ${slave.pubicHStyle}: Body Purist`, 4);
					} else {
						adjustBeauty(`Pubic Hair: ${slave.pubicHStyle}`, -2);
					}
					break;
				case "very bushy":
					if (arcology.FSBodyPurist > 0) {
						adjustBeauty(`Pubic Hair: ${slave.pubicHStyle}: Body Purist`, 2);
					} else {
						adjustBeauty(`Pubic Hair: ${slave.pubicHStyle}:`, -6);
					}
					break;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcImplantBeauty(slave) {
		if (arcologyInfo.fsActive('FSTransformationFetishist')) {
			if (Math.abs(slave.shouldersImplant) > 1) {
				adjustBeauty("Shoulders Implant: Transformation Fetishist", ((FSValues.FSTransformationFetishist / 20) + Math.abs(slave.shouldersImplant)));
			}
			if (Math.abs(slave.hipsImplant) > 1) {
				adjustBeauty("Hips Implant: Transformation Fetishist", ((FSValues.FSTransformationFetishist / 20) + Math.abs(slave.hipsImplant)));
			}
			if (slave.race !== slave.origRace) {
				adjustBeauty("Race Implant: Transformation Fetishist", (FSValues.FSTransformationFetishist / 20));
			}
			if (slave.faceImplant > 95 && slave.face > 40) {
				adjustBeauty("Face Implant: Transformation Fetishist", (FSValues.FSTransformationFetishist / 4));
			}
		} else if (arcologyInfo.fsActive('FSBodyPurist')) {
			if (slave.faceImplant > 5) {
				adjustBeauty("Face Implant: Body Purist", -((FSValues.FSBodyPurist / 100) * (slave.faceImplant / 10)));
			}
			if (slave.race !== slave.origRace) {
				adjustBeauty("Race Implant: Body Purist", -(FSValues.FSBodyPurist / 5));
			}
		} else {
			if (slave.faceImplant > 30) {
				adjustBeauty("Face Implant", -((slave.faceImplant - 30) / 10));
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcRepopulationPregBeauty(slave) {
		if (slave.preg > slave.pregData.normalBirth / 1.33) {
			/* limited huge boost for full term */
			if (slave.broodmother > 0) {
				adjustBeauty("Preg Beauty: Broodmother", (0.4 * (slave.broodmother * FSValues.FSRepopulationFocus))); /* 40-80 limited due to constant presence. Also good breeders, but subpar mothers */
			} else if (slave.bellyPreg >= 600000) {
				adjustBeauty("Preg Beauty", (1.5 * FSValues.FSRepopulationFocus)); /* 150 */
			} else if (slave.bellyPreg >= 300000) {
				adjustBeauty("Preg Beauty", (FSValues.FSRepopulationFocus)); /* 100 */
			} else if (slave.bellyPreg >= 120000) {
				adjustBeauty("Preg Beauty", (0.9 * FSValues.FSRepopulationFocus)); /* 90 */
			} else {
				adjustBeauty("Preg Beauty", (0.8 * FSValues.FSRepopulationFocus)); /* 80 */
			}
		} else if (slave.preg > slave.pregData.normalBirth / 2) {
			if (slave.pregType >= 20) {
				adjustBeauty("Preg Beauty", (10 * (FSValues.FSRepopulationFocus / 40))); /* 25 */
			} else if (slave.pregType >= 10) {
				adjustBeauty("Preg Beauty", (9 * (FSValues.FSRepopulationFocus / 40))); /* 22.5 */
			} else {
				adjustBeauty("Preg Beauty", (8 * (FSValues.FSRepopulationFocus / 40))); /* 20 */
			}
		} else if (slave.preg > slave.pregData.normalBirth / 4) {
			if (slave.pregType >= 20) {
				adjustBeauty("Preg Beauty", (FSValues.FSRepopulationFocus / 5)); /* 20 */
			} else if (slave.pregType >= 10) {
				adjustBeauty("Preg Beauty", (FSValues.FSRepopulationFocus / 6.25)); /* 16 */
			} else {
				adjustBeauty("Preg Beauty", (FSValues.FSRepopulationFocus / 10)); /* 10 */
			}
		} else if (slave.pregWeek < 0) {
			adjustBeauty("Preg Beauty", (FSValues.FSRepopulationFocus / 10)); /* 10 */
		} else if (slave.preg > 0 && slave.collar === "preg biometrics") {
			adjustBeauty("Preg Beauty", (FSValues.FSRepopulationFocus / 12)); /* 8.33 */
		} else {
			adjustBeauty("Preg Beauty", -(FSValues.FSRepopulationFocus / 2.5)); /* -40 */
		}
		if (slave.counter.births > 50) {
			adjustBeauty("Preg Beauty: Births", (FSValues.FSRepopulationFocus / 1.5)); /* 66.6 */
		} else {
			adjustBeauty("Preg Beauty: Births", (slave.counter.births * (FSValues.FSRepopulationFocus / 75)));
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcTrendyPregBeauty(slave) {
		if (slave.preg > slave.pregData.normalBirth / 1.33) {
			/* limited huge boost for full term */
			adjustBeauty("Preg Beauty: Trendy: Full Term", (20));
		} else if (slave.bellyPreg >= 1500) {
			adjustBeauty("Preg Beauty: Trendy", (10));
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcRestartPregBeauty(slave) {
		if (slave.breedingMark === 1 && V.propOutcome === 1) {
			if ((slave.preg > slave.pregData.normalBirth / 8) && ((slave.pregSource === -1) || (slave.pregSource === -6))) {
				adjustBeauty("Preg Beauty: Eugenics", (FSValues.FSRestart)); /* 100 */
			}
		} else {
			if (slave.preg > slave.pregData.normalBirth / 1.33) {
				if (slave.bellyPreg >= 600000) {
					adjustBeauty("Preg Beauty: Eugenics", -(2.5 * FSValues.FSRestart)); /* -250 */
				} else if (slave.bellyPreg >= 300000) {
					adjustBeauty("Preg Beauty: Eugenics", -(1.25 * FSValues.FSRestart)); /* -125 */
				} else if (slave.bellyPreg >= 120000) {
					adjustBeauty("Preg Beauty: Eugenics", -(FSValues.FSRestart)); /* -100 */
				} else {
					adjustBeauty("Preg Beauty: Eugenics", -(0.75 * FSValues.FSRestart)); /* -75 */
				}
			} else if (slave.preg > slave.pregData.normalBirth / 2) {
				if (slave.pregType >= 20) {
					adjustBeauty("Preg Beauty: Eugenics", -(FSValues.FSRestart / 1.5)); /* -66.6 */
				} else if (slave.pregType >= 10) {
					adjustBeauty("Preg Beauty: Eugenics", -(FSValues.FSRestart / 2)); /* -50 */
				} else {
					adjustBeauty("Preg Beauty: Eugenics", -(FSValues.FSRestart / 3)); /* -33.3 */
				}
			} else if (slave.preg > slave.pregData.normalBirth / 4) {
				if (slave.pregType >= 20) {
					adjustBeauty("Preg Beauty: Eugenics", -(3 * (FSValues.FSRestart / 8))); /* -37.5 */
				} else if (slave.pregType >= 10) {
					adjustBeauty("Preg Beauty: Eugenics", -(FSValues.FSRestart / 4)); /* -25 */
				} else {
					adjustBeauty("Preg Beauty: Eugenics", -(FSValues.FSRestart / 8)); /* -12.5 */
				}
			} else if (slave.preg === -2) {
				adjustBeauty("Preg Beauty: Eugenics", (FSValues.FSRestart / 7)); /* 14.2 */
			} else if (slave.preg < 1) {
				adjustBeauty("Preg Beauty: Eugenics", (FSValues.FSRestart / 5)); /* 20 */
			}
			if (slave.counter.births > 50) {
				adjustBeauty("Preg Beauty: Eugenics", -(FSValues.FSRestart)); /* -100 */
			} else {
				adjustBeauty("Preg Beauty: Eugenics", -(slave.counter.births * (FSValues.FSRestart / 50)));
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcTrendyMilfBeauty(slave) {
		if (slave.counter.births > 50) {
			adjustBeauty("Preg Beauty: MILF", 6);
		} else {
			adjustBeauty("Preg Beauty: MILF", (Math.ceil(slave.counter.births / 10)));
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcFutaLawBeauty(slave) {
		switch (arcology.FSGenderRadicalistLawFuta) {
			case 1:
				if (slave.dick > 0 && slave.vagina > -1) {
					/* herms */
					calcFutaLawTrueFutaBeauty(slave);
				}
				break;
			case 2:
				if (canAchieveErection(slave) && slave.balls > 0 && slave.scrotum > 0) {
					/* erection! */
					calcFutaLawBigDickBeauty(slave);
				}
				break;
			case 3:
				calcFutaLawBigBootyBeauty(slave);
				break;
			case 4:
				if (slave.dick > 0 && slave.vagina === -1 && slave.faceShape !== "masculine") {
					if (slave.boobs < 500 && slave.dick < 4 && slave.balls < 4) {
						calcFutaLawFemboyBeauty(slave);
					}
				}
				break;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcFutaLawTrueFutaBeauty(slave) {
		if (slave.dick <= 10) {
			adjustBeauty("Dick: Futa Law: True", (slave.dick));
		} else if (slave.dick > 20) {
			adjustBeauty("Dick: Futa Law: True", 2);
		} else {
			adjustBeauty("Dick: Futa Law: True", 4);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcFutaLawBigDickBeauty(slave) {
		adjustBeauty("Dick: Futa Law: Big", (slave.dick));
		if (slave.balls > 120) {
			adjustBeauty("Dick: Futa Law: Big", 14);
		} else if (slave.balls > 100) {
			adjustBeauty("Dick: Futa Law: Big", 12);
		} else if (slave.balls > 80) {
			adjustBeauty("Dick: Futa Law: Big", (10));
		} else if (slave.balls > 60) {
			adjustBeauty("Dick: Futa Law: Big", 8);
		} else if (slave.balls > 40) {
			adjustBeauty("Dick: Futa Law: Big", 6);
		} else if (slave.balls > 20) {
			adjustBeauty("Dick: Futa Law: Big", 4);
		} else if (slave.balls > 10) {
			adjustBeauty("Dick: Futa Law: Big", 2);
		} else {
			adjustBeauty("Dick: Futa Law: Big", (slave.balls));
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcFutaLawBigBootyBeauty(slave) {
		if (slave.hips >= 1) {
			adjustBeauty("Futa Law: Bottom Heavy: Hips", (4 * (slave.hips - 1))); /* 8 */
			if (arcologyInfo.fsActive('FSSlimnessEnthusiast')) {
				adjustBeauty("Futa Law: Bottom Heavy: Hips (Slimness Enthusiast)", (4 * (slave.hips - 1))); /* 8 */ /* offsets the malus for big butts */
			}
		}
		if (slave.skill.anal > 60 && slave.anus >= 2) {
			adjustBeauty("Futa Law: Bottom Heavy: Anus", (2 * (slave.anus - 2))); /* 6 */
			if (arcologyInfo.fsActive('FSSlimnessEnthusiast')) {
				adjustBeauty("Futa Law: Bottom Heavy: Anus (Slimness Enthusiast)", (2 * (slave.anus - 2))); /* 6 */ /* offsets the malus for big butts */
			}
		}
		if (slave.butt >= 5) {
			adjustBeauty("Futa Law: Bottom Heavy: Butt", (slave.butt - 5)); /* 15 */
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcFutaLawFemboyBeauty(slave) {
		if (!arcologyInfo.fsActive('FSSlimnessEnthusiast')) {
			/* balance with slimness */
			adjustBeauty("Body Proportion: Femboy: Futa Law", (20));
			if (slave.boobs < 300) {
				adjustBeauty("Boob Size: Less than A: Femboy: Futa Law", 12);
			} else if (slave.boobs < 400) {
				adjustBeauty("Boob Size: Less than B: Femboy: Futa Law", 6);
			}
		}
		if (slave.dick === 1) {
			adjustBeauty("Tiny Dick: Femboy: Futa Law", 12);
		} else if (slave.dick === 2) {
			adjustBeauty("Small Dick: Femboy: Futa Law", 6);
		}
		if (slave.balls <= 2) {
			adjustBeauty("Small Balls: Femboy: Futa Law", 8);
		}
		if (slave.faceShape === "cute" && slave.face > 0) {
			/* ugly slaves need not apply, maybe a small boost for other faceShapes */
			adjustBeauty("Cute face: Femboy: Futa Law", (((FSValues.FSGenderRadicalist / 25) * (slave.face / 30)) - 2)); /* gives a slightly better boost than androgynous does with gender radical boost, 15.3 */
		}
		if (slave.nipples === "tiny") {
			adjustBeauty("Tiny Nipples: Femboy: Futa Law", 5);
		} else if (slave.nipples === "cute") {
			adjustBeauty("Cute Nipples: Femboy: Futa Law", 2);
		} else {
			adjustBeauty("Oversized Nipples: Femboy: Futa Law", -5);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcBodyProportionBeauty(slave) {
		if (arcologyInfo.fsActive('FSGenderFundamentalist')) {
			if (slave.shoulders > slave.hips) {
				if (slave.boobs <= 2000 * (slave.shoulders - slave.hips)) {
					adjustBeauty("Body Proportion: Gender Fundamentalist", -((slave.shoulders - slave.hips) * (1 + (FSValues.FSGenderFundamentalist / 200))));
				}
			}
		} else if (!arcologyInfo.fsActive('FSGenderRadicalist')) {
			if (slave.shoulders > slave.hips) {
				if (slave.boobs <= 2000 * (slave.shoulders - slave.hips)) {
					adjustBeauty("Body Proportion", -(slave.shoulders - slave.hips));
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcVoiceBeauty(slave) {
		if (arcologyInfo.fsActive('FSSlaveProfessionalism')) {
			if (canTalk(slave)) {
				if (slave.accent > 1) {
					adjustBeauty("Voice Accent: Slave Professionalism", -(20));
				} else if (slave.accent === 0) {
					adjustBeauty("Voice No Accent: Slave Professionalism", 4);
				}
			}
		} else {
			if (canTalk(slave)) {
				if (slave.accent >= 3) {
					adjustBeauty("Voice Accent: Bad", -1);
				} else if (slave.accent === 1) {
					adjustBeauty("Voice Accent: Sexy", 1);
				}
			} else {
				adjustBeauty("Voice Accent: Can't Talk", -2);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcLimbsBeauty(slave) {
		if (!arcologyInfo.fsActive('FSDegradationist')) {
			// missing limbs
			adjustBeauty("Limbs: Missing", -(getLimbCount(slave, 0) * 2.5));
			// non-beauty prosthetics
			adjustBeauty("Limbs: Non-beauty Prosthetics", -((getLimbCount(slave, 102) - getLimbCount(slave, 104)) * 0.5));
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcPubertyBeauty(slave) {
		if (slave.pubertyXX === 1) {
			adjustBeauty("Puberty Beauty", 5);
		}
		if (slave.pubertyXY === 0 && slave.physicalAge > V.potencyAge && slave.balls > 0) {
			adjustBeauty("Puberty Beauty", (10));
			if (arcologyInfo.fsActive('FSGenderFundamentalist')) {
				adjustBeauty("Puberty Beauty: Gender Fundamentalist", 5);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcFSMiscBeauty(slave) {
		if (arcology.FSTransformationFetishist > 20) {
			if (slave.lips > 70) {
				if (slave.lipsImplant / slave.lips < 0.5) {
					adjustBeauty("Lips: Transformation Fetishist", -((slave.lips / 10) + (FSValues.FSTransformationFetishist / 20)));
				}
			}
			if (slave.hips === 3) {
				adjustBeauty("Hips: Transformation Fetishist", (10));
			}
			if (hasAnyProstheticLimbs(slave)) {
				adjustBeauty("Artificial Limbs: Transformation Fetishist", (FSValues.FSTransformationFetishist / 5));
			}
			if (slave.horn !== "none" || slave.tail !== "none" || (slave.earShape !== "normal" && slave.earShape !== "damaged") || slave.earT !== "none") {
				adjustBeauty("Horn/Tail/Odd Ears: Transformation Fetishist", (10));
			}
		}
		if ((arcology.FSGenderRadicalist > 20 && arcology.FSGenderRadicalistLawFuta !== 3) || arcology.FSSlimnessEnthusiast > 20) {
			if (slave.hips < 0) {
				adjustBeauty("Hips: Gender Radicalist Futa Law / Slimness Enthusiast", (Math.abs(slave.hips)));
			}
		}
		if (arcologyInfo.fsActive('FSPhysicalIdealist')) {
			if (slave.height > Height.mean(slave)) {
				adjustBeauty("Height: Physical Idealist", (10));
			}
		}
		if (arcology.FSHedonisticDecadenceLaw2 === 1) {
			if (slave.boobs >= 2000 && slave.butt >= 5 && slave.weight > 95) {
				adjustBeauty("Boobs/Butt/Weight: Hedonistic Decadence: Rotund Feminine Ideal", (5 + (FSValues.FSHedonisticDecadence / 20))); /* 10 */
			} else {
				adjustBeauty("Boobs/Butt/Weight: Hedonistic Decadence: Rotund Feminine Ideal", -(15 + (FSValues.FSHedonisticDecadence / 20))); /* -20 */
			}
		}
		if (arcologyInfo.fsActive('FSSlaveProfessionalism')) {
			if (slave.energy > 80) {
				adjustBeauty("Energy: Slave Professionalism", -(slave.energy)); /* -80 to -100 */
			} else if (slave.energy <= 40 && slave.devotion > 50) {
				adjustBeauty("Energy: Slave Professionalism", 10 - (slave.energy / 4)); /* +10 to 0 */
			}
		} else if (arcologyInfo.fsActive('FSIntellectualDependency')) {
			if (arcology.FSIntellectualDependencyLawBeauty === 1) {
				let bimboDegree = Math.clamp(bimboScore(slave), 0, 6);
				if (bimboDegree > 0) {
					adjustBeauty("Bimbo Degree: Intellectual Dependency Law, Beauty", (Math.pow(2, bimboDegree))); /* 64 */
				} else {
					adjustBeauty("Bimbo Degree: Intellectual Dependency Law, Beauty", -(FSValues.FSIntellectualDependency)); /* -100 */
				}
			}
			if (slave.energy > 80) {
				adjustBeauty("Energy: Intellectual Dependency", ((FSValues.FSIntellectualDependency / 50) * (8 + (slave.energy / 10)))); /* 16 to 36 */
			} else if (slave.energy <= 60) {
				adjustBeauty("Energy: Intellectual Dependency", -((FSValues.FSIntellectualDependency / 50) * (60 - slave.energy))); /* -120 to 0 */
			}
		}
		if (arcology.FSChattelReligionistCreed === 1) {
			if (V.nicaea.assignment === slave.assignment) {
				adjustBeauty("Nicaea Assignment: Chattel Religionist Creed", (2 * V.nicaea.power));
			}
		}
		if (arcology.FSChattelReligionist > 40 && !arcologyInfo.fsActive('FSBodyPurist')) {
			const tats = ["anusTat", "armsTat", "backTat", "boobsTat", "buttTat", "dickTat", "legsTat", "lipsTat", "shouldersTat", "stampTat", "vaginaTat"];
			let sacrilegeCount = 0;
			for (const index in tats) {
				if (slave[index] === "sacrilege") {
					sacrilegeCount++;
				}
			}
			if (sacrilegeCount > 0) {
				adjustBeauty("Sacrilege Tattoos: Chattel Religionist", (1.5 * sacrilegeCount));
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcPurityBeauty(slave) {
		if (isPure(slave)) {
			if (arcologyInfo.fsActive('FSBodyPurist')) {
				adjustBeauty("Purity: Body Purist", (FSValues.FSBodyPurist / 5));
			}
			if (!arcologyInfo.fsActive('FSTransformationFetishist')) {
				adjustBeauty("Purity", 2);
			}
		} else if (arcologyInfo.fsActive('FSTransformationFetishist')) {
			adjustBeauty("Purity: Transformation Fetishist", (FSValues.FSTransformationFetishist / 40));
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcPhysiqueBeauty(slave) {
		let physiquePass = 0;

		if (slave.boobs < 500 && slave.butt < 3) {
			if (slave.muscles <= 30 && !arcologyInfo.fsActive('FSPhysicalIdealist') && slave.weight <= 10 && !arcologyInfo.fsActive('FSHedonisticDecadence')) {
				physiquePass = 1;
			} else if (arcologyInfo.fsActive('FSPhysicalIdealist')) {
				/* no muscle malus for muscle loving societies */
				if (arcology.FSPhysicalIdealistStrongFat === 1 && slave.weight <= 30) {
					/* reduced weight malus for fat loving societies */
					physiquePass = 1;
				} else if (slave.weight <= 10) {
					physiquePass = 1;
				}
			} else if (arcologyInfo.fsActive('FSHedonisticDecadence') && slave.weight <= 30) {
				/* reduced weight malus for fat loving societies */
				if (arcology.FSHedonisticDecadenceStrongFat === 1) {
					/* no muscle malus for muscle loving societies */
					physiquePass = 1;
				} else if (slave.muscles <= 30) {
					physiquePass = 1;
				}
			}
		}
		if (physiquePass === 1) {
			adjustBeauty("Physique Beauty", (40));
			if (arcology.FSSlimnessEnthusiast > 20) {
				adjustBeauty("Physique Beauty: Slimness Enthusiast", (FSValues.FSSlimnessEnthusiast / 20));
				if (canTalk(slave) && slave.voice === 3) {
					adjustBeauty("Physique Beauty: Slimness Enthusiast: High Voice", (FSValues.FSSlimnessEnthusiast / 40));
				}
			}
		} else if (isStacked(slave)) {
			if (!arcologyInfo.fsActive('FSSlimnessEnthusiast')) {
				adjustBeauty("Physique Beauty", 1);
			}
			if (arcology.FSAssetExpansionist > 20) {
				adjustBeauty("Physique Beauty: Asset Expansionist", (FSValues.FSAssetExpansionist / 20));
				if (canTalk(slave) && slave.voice === 3) {
					adjustBeauty("Physique Beauty: Asset Expansionist: High Voice", (FSValues.FSAssetExpansionist / 40));
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcSlimBeauty(slave) {
		if (slimLawPass(slave) === 1) {
			adjustBeauty("Slim Beauty: Slimness Enthusiast: Slim Law", (40 + (FSValues.FSSlimnessEnthusiast / 20))); /* 45 */
		} else {
			adjustBeauty("Slim Beauty: Slimness Enthusiast", -(FSValues.FSSlimnessEnthusiast / 20));
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcGenderLawBeauty(slave) {
		if (genderLawPass(slave) === 1) {
			adjustBeauty("Gender Law", (60));
		} else {
			adjustBeauty("Gender Law", -(10));
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcMultipliersBeauty(slave) {
		calcBellyBeauty(slave);
		if (slave.geneticQuirks.albinism === 2) {
			adjustBeauty("Albino", (0.1 * beauty));
		}
		if (slave.geneticQuirks.progeria === 2 && slave.physicalAge >= 45) {
			adjustBeauty("Advanced Progeria", -(0.1 * slave.physicalAge * beauty));
		} else if (slave.geneticQuirks.progeria !== 2 && slave.geneticQuirks.neoteny === 2 && slave.actualAge > slave.visualAge + 5) {
			adjustBeauty("Neoteny", (0.1 * beauty));
		}
		if (slave.breedingMark === 1) {
			if (V.propOutcome === 1 && FutureSocieties.isActive('FSRestart')) {
				adjustBeauty("Breeding Mark: Elite (Modifies all beauty)", beauty);
			} else {
				adjustBeauty("Breeding Mark: Elite", 2);
			}
		}
		if (slave.fuckdoll === 0 && V.seeAge === 1) {
			calcAgeBeauty(slave);
		}
		if (slave.prestige + slave.porn.prestige > 0) {
			calcPrestigeBeauty(slave);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcBellyBeauty(slave) {
		if (slave.bellySag > 0) {
			if (slave.belly < 100) {
				if (!arcologyInfo.fsActive('FSRepopulationFocus')) {
					adjustBeauty("Belly Sag", -(20));
				}
			}
		}
		if (slave.bellyPreg >= 500 && !arcologyInfo.fsActiveSome('FSRepopulationFocus', 'FSRestart')) {
			if (arcology.FSRepopulationFocusPregPolicy === 1) {
				adjustBeauty("Pregnancy: Repop. (Modifies all beauty)", (-0.1 * beauty));
			} else if (arcologyInfo.fsActive('FSGenderRadicalist') && slave.mpreg === 1) {
				adjustBeauty("Anal Pregnancy: Gender Rad. (Modifies all beauty)", (-0.1 * beauty));
			} else if (arcologyInfo.fsActive('FSGenderFundamentalist')) {
				adjustBeauty("Pregnancy: Gender Fund. (Modifies all beauty)", (-0.2 * beauty));
			} else {
				adjustBeauty("Pregnancy (Modifies all beauty)", (-0.3 * beauty));
			}
		}
		if (slave.bellyImplant >= 1500) {
			if (arcology.FSTransformationFetishist > 20) {
				adjustBeauty("Belly Implant: Transformation Fetishist", (Math.min(Math.trunc(slave.bellyImplant / 1000), 50))); /* 50 */
			} else if (arcology.FSRepopulationFocus > 60) {
				if ((slave.ovaries === 0 && slave.mpreg === 0) || slave.preg < -1) {
					adjustBeauty("Belly Implant: Repopulationist Focus", (20));
				}
			} else {
				if (slave.bellyImplant >= 750000) {
					/* multipliers */
					adjustBeauty("Belly Implant (Modifies all beauty)", (-0.8 * beauty));
				} else if (slave.bellyImplant >= 450000) {
					adjustBeauty("Belly Implant (Modifies all beauty)", (-0.5 * beauty));
				} else if (slave.bellyImplant >= 300000) {
					adjustBeauty("Belly Implant (Modifies all beauty)", (-0.3 * beauty));
				} else if (slave.bellyImplant >= 100000) {
					adjustBeauty("Belly Implant (Modifies all beauty)", (-0.2 * beauty));
				} else if (slave.bellyImplant >= 50000) {
					adjustBeauty("Belly Implant (Modifies all beauty)", (-0.15 * beauty));
				} else {
					adjustBeauty("Belly Implant: (Modifies all beauty)", (-0.1 * beauty));
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcAgeBeauty(slave) {
		if (slave.physicalAge === V.minimumSlaveAge) {
			adjustBeauty("Age: First Year Legal", 1);
			if (slave.physicalAge === V.fertilityAge && canGetPregnant(slave) && (arcologyInfo.fsActive('FSRepopulationFocus') || arcologyInfo.fsActive('FSGenderFundamentalist')) && !arcologyInfo.fsActive('FSRestart')) {
				if (slave.birthWeek === 0) {
					adjustBeauty("Age: First Week Legal: Newborn: Fertile+FS", (1.6 * beauty));
				} else if (slave.birthWeek < 4) {
					adjustBeauty("Age: First Week Legal: Born Yesterday: Fertile+FS", (0.2 * beauty));
				}
			} else {
				if (slave.birthWeek === 0) {
					adjustBeauty("Age: First Week Legal: Newborn", (0.8 * beauty));
				} else if (slave.birthWeek < 4) {
					adjustBeauty("Age: First Week Legal: Born Yesterday", (0.1 * beauty));
				}
			}
		} else if (slave.physicalAge === V.fertilityAge && canGetPregnant(slave) && (arcologyInfo.fsActive('FSRepopulationFocus') || arcologyInfo.fsActive('FSGenderFundamentalist')) && !arcologyInfo.fsActive('FSRestart')) {
			adjustBeauty("Age: Newborn: Fertile+FS", 1);
			if (slave.birthWeek === 0) {
				adjustBeauty("Age: Newborn", (0.8 * beauty));
			} else if (slave.birthWeek < 4) {
				adjustBeauty("Age: Born Yesterday", (0.1 * beauty));
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcPrestigeBeauty(slave) {
		/* multipliers */
		if (slave.prestige >= 3) {
			adjustBeauty("Prestige", (2 * beauty));
		} else if (slave.prestige === 2) {
			adjustBeauty("Prestige", (0.5 * beauty));
		} else if (slave.prestige === 1) {
			adjustBeauty("Prestige", (0.25 * beauty));
		}
		if (slave.porn.prestige === 3) {
			adjustBeauty("Porn Prestige", (beauty));
		} else if (slave.porn.prestige === 2) {
			adjustBeauty("Porn Prestige", (0.5 * beauty));
		} else if (slave.porn.prestige === 1) {
			adjustBeauty("Porn Prestige", (0.1 * beauty));
		}
	}
};

globalThis.Beauty = function(s) {
	let beauty = BeautyArray(s).reduce((result, {value}) => result + value, 0);
	beauty = Math.max(1, Math.trunc(0.5 * beauty));
	return beauty;
};

/**
 * Show an itemized breakdown of the beauty value (Beauty) of the slave.
 * @param {App.Entity.SlaveState} slave
 * @returns {HTMLSpanElement}
 */
globalThis.BeautyTooltip = function(slave) {
	const beauty = Beauty(slave);
	const span = App.UI.DOM.makeElement("span", beauty.toString(), ["pink", "bold"]);
	span.tabIndex = 0;
	span.classList.add("has-tooltip");
	tippy(span, {
		content: BeautyDisplay(),
		interactive: true,
		placement: "right",
	});
	return span;

	function BeautyDisplay() {
		const el = document.createElement("div");
		el.classList.add("tip-details");
		el.append(RelativeDataTable(BeautyArray(slave), "text", "value", [10, 100]));

		App.UI.DOM.appendNewElement("div", el, `${beauty * 2}/2 is ${beauty}, ${getPronouns(slave).his} total score`);
		return el;
	}
};

/**
 * Generate a table displaying text-value (string-number) pairs.
 * Table can be sorted by text and value
 * The numbers will be hidden if not in cheat/debug mode and it will show +/- instead
 *
 * TODO: move to proper file & namespace
 *
 * @param {Array<object>} data Every object must have textKey and valueKey properties
 * @param {string} textKey
 * @param {string} valueKey
 * @param {number[]} signSteps Must be positive and ascending. For every step where the absolute value is larger, add a +/-.
 * @returns {HTMLDivElement}
 */
globalThis.RelativeDataTable = function(data, textKey, valueKey, signSteps) {
	/** @type {"text"|"value"} */
	let orderCriteria = "value";
	/** @type {"ascending"|"descending"} */
	let orderDirection = "descending";

	const dataFrame = document.createElement("div");
	dataFrame.append(buttons(), frame());
	return dataFrame;

	function buttons() {
		const frag = new DocumentFragment();
		frag.append(document.createTextNode(`Sort by: `));
		const links = [];
		if (orderCriteria === "text") {
			links.push("Text");
		} else {
			links.push(App.UI.DOM.link("Text", () => {
				orderCriteria = "text";
				jQuery(dataFrame).empty().append(buttons(), frame());
			}, []));
		}
		if (orderCriteria === "value") {
			links.push("Value");
		} else {
			links.push(App.UI.DOM.link("Value", () => {
				orderCriteria = "value";
				jQuery(dataFrame).empty().append(buttons(), frame());
			}, []));
		}
		if (orderDirection === "ascending") {
			links.push("Ascending");
		} else {
			links.push(App.UI.DOM.link("Ascending", () => {
				orderDirection = "ascending";
				jQuery(dataFrame).empty().append(buttons(), frame());
			}, []));
		}
		if (orderDirection === "descending") {
			links.push("Descending");
		} else {
			links.push(App.UI.DOM.link("Descending", () => {
				orderDirection = "descending";
				jQuery(dataFrame).empty().append(buttons(), frame());
			}, []));
		}
		frag.append(App.UI.DOM.generateLinksStrip(links));
		return frag;
	}

	/**
	 * @returns {HTMLDivElement}
	 */
	function frame() {
		const gridDiv = document.createElement("div");
		gridDiv.classList.add("grid-2columns-auto");

		const key = orderCriteria === "text" ? textKey : valueKey;

		if ((orderCriteria === "text" && orderDirection === "descending") ||
			(orderCriteria === "value" && orderDirection === "ascending")) {
			data.sort((a, b) => (a[key] > b[key]) ? 1 : -1);
		} else {
			data.sort((a, b) => (a[key] < b[key]) ? 1 : -1);
		}

		for (const line of data) {
			const value = (Math.floor(line[valueKey] * 10) / 10);

			let classNames = [];
			if (value > 0) {
				classNames.push("green");
			} else if (value < 0) {
				classNames.push("red");
			}

			if (V.cheatMode || V.debugMode) {
				App.UI.DOM.appendNewElement("div", gridDiv, value.toString(), classNames);
			} else {
				if (value > 0) {
					let signs = '+';
					for (const signStep of signSteps) {
						if (value > signStep) {
							signs += "+";
						} else {
							break;
						}
					}

					App.UI.DOM.appendNewElement("div", gridDiv, signs, classNames);
				} else {
					let signs = '-';
					for (const signStep of signSteps) {
						if (value < -signStep) {
							signs += "-";
						} else {
							break;
						}
					}

					App.UI.DOM.appendNewElement("div", gridDiv, signs, classNames);
				}
			}

			App.UI.DOM.appendNewElement("div", gridDiv, line[textKey]);
		}
		return gridDiv;
	}
};

// this is a port of the FResult widget
// it has been broken up into several functions, because it grew too long
// it has been wrapped in a closure so as not to pollute the global namespace
// and so that nested functions are only evaluated once

globalThis.FResultArray = (function() {
	"use strict";
	// we can't initialize our global variables on load, because SugarCube.State isn't initialized
	// instead, declare them and initialize on run time

	let result;
	let retval;
	let incestBonus;

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {number} [forSale=0] set to 1 if the value should not consider co-assignment and other temporary factors
	 * @returns {{text:string, value:number}[]}
	 */
	function FResult(slave, forSale = 0) {
		incestBonus = V.arcologies[0].FSEgyptianRevivalist > 20 || V.arcologies[0].FSEgyptianRevivalistIncestPolicy === 1;
		result = 0;
		retval = [];

		calcUseWeights(slave, forSale);
		if (!slave.fuckdoll) {
			calcNotFuckdoll(slave, forSale);
		} else {
			adjustFResult(`Fuckdoll`, slave.fuckdoll / 10);
		}

		if (!forSale) {
			adjustFResult(`Aphrodisiacs`, Math.max(0, slave.aphrodisiacs) * 2);

			if (slave.inflationType === "aphrodisiac") {
				adjustFResult(`Aphrodisiac: Inflation`, slave.inflation * 4);
			}
		}

		if (slave.lactation > 0) {
			adjustFResult(`Lactation`, 1);
		}

		if (slave.nipples === "fuckable") {
			calcFuckableTits(slave);
		}

		if (V.seeAge === 1) {
			calcAge(slave);
		}

		if (slave.pregWeek < 0) {
			adjustFResult(`Postpartum`, Math.trunc(result * slave.pregWeek / 10));
		} // reduced the most just after birth

		calcAmputation(slave);

		if (V.arcologies[0].FSHedonisticDecadence > 20) {
			calcHedonismWeight(slave);
		}

		if (slave.fetish === Fetish.MINDBROKEN) {
			adjustFResult(`Mindbroken: total score reduced by 60% instead of 30%`, -Math.trunc(result * 0.6));
		} else {
			adjustFResult(`All score totals are cut by 30%`, -Math.trunc(result * 0.3));
		}

		if (result < 2) {
			if (supremeRaceP(slave) && V.arcologies[0].FSSupremacist > 20) {
				adjustFResult(`Race is Supreme Race`, -result);
			} else {
				adjustFResult(`Rounding off: Slave value cannot be less than 2`, 2 - result);
			}
		}

		return retval;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {number} [forSale=0]
	 */
	function calcUseWeights(slave, forSale = 0) {
		adjustFResult(`Muscles`, slave.muscles / 30);
		if (slave.muscles < -95) {
			adjustFResult(`Muscles: Extremely weak`, -5);
		} else if (slave.muscles < -30) {
			adjustFResult(`Muscles: weak`, -2);
		}

		const uses = V.oralUseWeight + V.vaginalUseWeight + V.analUseWeight + V.penetrativeUseWeight;
		if (uses <= 0) {
			return;
		}

		adjustFResult(`Oral potential: Tongue piercing, skill, and arcology oral weight`, (6 + slave.piercing.tongue.weight) * (V.oralUseWeight / uses) * (slave.skill.oral / 30));
		if (slave.sexualFlaw === "cum addict") {
			adjustFResult(`Oral potential: Cum Addict, skill, and arcology oral weight`, (V.oralUseWeight / uses) * (slave.skill.oral / 30));
		}
		if (canDoVaginal(slave) || (slave.vagina > -1 && forSale)) {
			adjustFResult(`Vaginal potential: skill, and arcology vaginal weight`, (6 + slave.piercing.vagina.weight) * (V.vaginalUseWeight / uses) * (slave.skill.vaginal / 30));
			adjustFResult(`Vaginal potential: Vagina stretched level`, (3 - slave.vagina));
			adjustFResult(`Vaginal: Lube`, slave.vaginaLube);
		}
		if (canDoAnal(slave) || forSale) {
			adjustFResult(`Anal potential: skill, and arcology anal weight`, (6 + slave.piercing.anus.weight) * (V.analUseWeight / uses) * (slave.skill.anal / 30));
			adjustFResult(`Anus potential: Anus stretched level`, (3 - slave.anus));
			if (slave.sexualFlaw === "anal addict") {
				adjustFResult(`Anal potential: Anal Addict, skill, and arcology anal weight`, (V.analUseWeight / uses) * (slave.skill.anal / 30));
			}
			if (slave.inflationType === "aphrodisiac" && !forSale) {
				adjustFResult(`Anal potential: Aphrodisiac inflation`, (V.analUseWeight / uses) * (slave.inflation * 3));
			}
		}
		if (canPenetrate(slave)) {
			adjustFResult(`Dick use potential: skill, and arcology penetrative weight`, (6 + slave.piercing.dick.weight) * (V.penetrativeUseWeight / uses) * (slave.skill.penetrative / 30));
			adjustFResult(`Dick use potential: Dick size`, (slave.dick < 7 ? Math.floor(slave.dick / 2) : Math.round((slave.dick - 8) / 2)));
		} else if (penetrativeSocialUse() >= 20) {
			adjustFResult(`Penetrative potential: skill, and arcology penetrative weight`, (6 + slave.piercing.dick.weight) * (V.penetrativeUseWeight / uses) * (slave.skill.penetrative / 30));
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcFuckableTits(slave) {
		adjustFResult(`Tits: base bonus for all slaves`, 2);
		if (slave.fetish === "boobs") {
			adjustFResult(`Tits`, Math.trunc(slave.fetishStrength / 20));
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcWorksWithRelatives(slave) {
		for (const potentialRel of V.slaves) {
			if (sameAssignmentP(slave, potentialRel)) {
				if (isParentP(slave, potentialRel)) {
					adjustFResult(`Works with their parent(s)`, 1);
					if (incestBonus) {
						adjustFResult(`Works with their parent(s): incest bonus`, 1);
					}
				}
				if (isParentP(potentialRel, slave)) {
					adjustFResult(`Works with their kid(s)`, 1);
					if (incestBonus) {
						adjustFResult(`Works with their kid(s): incest bonus`, 1);
					}
				}
				if (areSisters(slave, potentialRel) > 0) {
					adjustFResult(`Works with their sibling(s)`, 1);
					if (incestBonus) {
						adjustFResult(`Works with their sibling(s): incest bonus`, 1);
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcWorksWithRelationship(slave) {
		const fre = V.slaves.find(s => haveRelationshipP(slave, s) && sameAssignmentP(slave, s));
		if (fre) {
			adjustFResult(`Works with lover`, 1);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcWorksWithRival(slave) {
		const en = getSlave(slave.rivalryTarget);
		if (en !== undefined && sameAssignmentP(slave, en)) {
			adjustFResult(`Works with rival`, -1);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcHInjectionsDiet(slave) {
		if (slave.drugs === "male hormone injections" || slave.drugs === "female hormone injections") {
			adjustFResult(`Hormone Injections`, -10);
		}
		if (slave.diet === "XXY") {
			adjustFResult(`Diet: XXY`, 2);
		} else if (slave.diet === "XY" || slave.diet === "XX") {
			adjustFResult(`Diet: XY/XX`, 1);
		} else if (slave.diet === "cum production") {
			adjustFResult(`Diet: Cum Production`, 1);
		} else if (slave.diet === "fertility") {
			adjustFResult(`Diet: Fertility`, 1);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcPreg(slave) {
		if (V.arcologies[0].FSRepopulationFocus > 20) {
			if (slave.belly >= 1500) {
				adjustFResult(`Belly: Repopulationist`, 2);
			} else {
				adjustFResult(`Belly: Repopulationist`, -2);
			}
		} else if (V.arcologies[0].FSRepopulationFocusPregPolicy === 1) {
			if (slave.bellyPreg >= 1500) {
				adjustFResult(`Belly: Repopulationist: Preg Policy`, 1);
			}
		} else if (V.arcologies[0].FSRestart > 20) {
			if (slave.bellyPreg >= 500 && slave.breedingMark === 1 && V.propOutcome === 1) {
				adjustFResult(`Belly: Elitist, Has Mark`, 1);
			} else if (slave.bellyPreg >= 1500) {
				adjustFResult(`Belly: Elitist, No Mark`, -10);
			} else {
				adjustFResult(`Belly: Elitist, No Mark`, 0);
			}
		}
		if ((V.arcologies[0].FSRepopulationFocusMilfPolicy === 1 || V.arcologies[0].FSRepopulationFocus > 20) && slave.counter.birthsTotal > 0) {
			adjustFResult(`Belly: Repopulationist, MILF Policy`, 1);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcRace(slave) {
		if (FutureSocieties.isActive('FSSupremacist') && supremeRaceP(slave)) {
			adjustFResult(`Race is supreme race`, -(V.arcologies[0].FSSupremacist / 5) + (V.arcologies[0].FSSupremacistLawME * 10));
		}
		if (FutureSocieties.isActive('FSSubjugationist') && inferiorRaceP(slave)) {
			adjustFResult(`Race is inferior race`, (V.arcologies[0].FSSubjugationist / 10) + (V.arcologies[0].FSSubjugationistLawME));
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcSexAttributes(slave) {
		if (slave.piercing.genitals.smart) {
			adjustFResult(`Piercings: Clit`, 1);
		}
		if (slave.tail === "sex") {
			adjustFResult(`Tail: Sex`, 1);
		}
		if (slave.fetishKnown === 1 && slave.fetishStrength > 60 && slave.fetish !== Fetish.NONE) {
			adjustFResult(`Fetish: Known`, slave.fetishStrength / 5);
		}

		if (slave.attrKnown === 1) {
			adjustFResult(`Attraction Known: XX`, Math.trunc(slave.attrXX / 20));
			adjustFResult(`Attraction Known: XY`, Math.trunc(slave.attrXY / 20));
			if (slave.energy > 95) {
				adjustFResult(`Energy`, 3);
			} else if (slave.energy > 80) {
				adjustFResult(`Energy`, 2);
			} else if (slave.energy > 60) {
				adjustFResult(`Energy`, 1);
			} else if (slave.energy <= 20) {
				adjustFResult(`Energy`, -2);
			} else if (slave.energy <= 40) {
				adjustFResult(`Energy`, -1);
			}
		}
		if (slave.sexualFlaw !== "none") {
			adjustFResult(`Sexual Flaw`, -2);
		}
		if (slave.sexualQuirk !== "none") {
			adjustFResult(`Sexual Quirk`, 2);
		}
		if (slave.behavioralFlaw !== "none") {
			adjustFResult(`Behavioral Flaw`, -2);
		}
		if (slave.behavioralQuirk !== "none") {
			adjustFResult(`Behavioral Quirk`, 2);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcCareer(slave) {
		if (App.Data.Careers.General.whore.includes(slave.career)) {
			adjustFResult(`Whore Knowledge: Career`, 1);
		} else if (slave.counter.oral + slave.counter.anal + slave.counter.vaginal + slave.counter.mammary + slave.counter.penetrative > 1000) {
			adjustFResult(`Whore Knowledge: Experience`, 1);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcSight(slave) {
		if (!canSee(slave)) {
			adjustFResult(`Eyes: Blind`, -3);
		} else if (!canSeePerfectly(slave)) {
			adjustFResult(`Eyes: Impaired vision`, -1);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcHearing(slave) {
		if (!canHear(slave)) {
			adjustFResult(`Ears: Deaf`, -2);
		} else if (slave.hears <= -1) {
			if (slave.earwear !== "hearing aids") {
				adjustFResult(`Ears: Bad Hearing`, -1);
			}
		} else if (slave.earwear === "muffling ear plugs") {
			adjustFResult(`Ears: Muffling Ear Plugs`, -1);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcYouthBonus(slave) {
		if (slave.visualAge < 30) {
			if (slave.actualAge > 30) {
				adjustFResult(`Age: Actual`, 5);
			} // experienced for her apparent age
			if (slave.physicalAge > 30) {
				adjustFResult(`Age: Physical`, -slave.physicalAge / 2);
			} // too old :(
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcMatureBonus(slave) {
		if (slave.visualAge >= 30 && slave.actualAge >= 30 && slave.physicalAge > slave.visualAge) {
			adjustFResult(`Age: Mature`, Math.min((slave.physicalAge - slave.visualAge) * 2, 20));
		} // looks and acts mature, but has a body that just won't quit
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcSlaveProfessionalismBonus(slave) {
		if (slave.devotion > 50) {
			if (slave.energy <= 40) {
				adjustFResult(`Devotion/Energy: Professionalism`, 4);
			} else {
				adjustFResult(`Devotion/Energy: Professionalism`, 2);
			}
		} // Professional slaves try harder
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {number} [forSale=0]
	 */
	function calcNotFuckdoll(slave, forSale = 0) {
		if (!forSale) {
			if (totalRelatives(slave) > 0) {
				calcWorksWithRelatives(slave);
			}
			if (slave.relationship > 0) {
				calcWorksWithRelationship(slave);
			}
			if (slave.rivalry !== 0) {
				calcWorksWithRival(slave);
			}
			calcHInjectionsDiet(slave);
		}
		calcPreg(slave);
		calcRace(slave);
		calcSexAttributes(slave);
		calcCareer(slave);
		if (!forSale) {
			calcSight(slave);
			calcHearing(slave);
		} else {
			adjustFResult(`Ears: Hearing`, slave.hears);
			// see: 0
			// impaired: -1
			// blind: -3
			adjustFResult(`Eyes: Vision`, Math.clamp(getBestVision(slave) * 2 - 3, -3, 0));
		}
		if (FutureSocieties.isActive('FSYouthPreferentialist')) {
			calcYouthBonus(slave);
		} else if (FutureSocieties.isActive('FSMaturityPreferentialist')) {
			calcMatureBonus(slave);
		}
		if (FutureSocieties.isActive('FSSlaveProfessionalism')) {
			calcSlaveProfessionalismBonus(slave);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcAge(slave) {
		if ((FutureSocieties.isActive('FSRepopulationFocus') || FutureSocieties.isActive('FSGenderFundamentalist')) && slave.physicalAge === V.minimumSlaveAge && slave.physicalAge === V.fertilityAge && canGetPregnant(slave)) {
			adjustFResult(`Young and Fertile: Repopulationist/Gender Fundamentalist`, 1);
			if (slave.birthWeek === 0) {
				adjustFResult(`Newborn and Fertile: Repopulationist/Gender Fundamentalist`, result);
			} else if (slave.birthWeek < 4) {
				adjustFResult(`Very Young and Fertile: Repopulationist/Gender Fundamentalist`, 0.2 * result);
			}
		} else if (slave.physicalAge === V.minimumSlaveAge) {
			adjustFResult(`Young`, 1);
			if (slave.birthWeek === 0) {
				adjustFResult(`Newborn`, 0.5 * result);
			} else if (slave.birthWeek < 4) {
				adjustFResult(`Very Young`, 0.1 * result);
			}
		} else if ((FutureSocieties.isActive('FSRepopulationFocus') || FutureSocieties.isActive('FSGenderFundamentalist')) && slave.physicalAge === V.fertilityAge && canGetPregnant(slave)) {
			adjustFResult(`Young and Fertile: Repopulationist/Gender Fundamentalist`, 1);
			if (slave.birthWeek === 0) {
				adjustFResult(`Newborn and Fertile: Repopulationist/Gender Fundamentalist`, 0.5 * result);
			} else if (slave.birthWeek < 4) {
				adjustFResult(`Very Young and Fertile: Repopulationist/Gender Fundamentalist`, 0.1 * result);
			}
		}
		if (slave.geneticQuirks.progeria === 2 && slave.physicalAge >= 45) {
			adjustFResult("Advanced Progeria", -(0.1 * slave.physicalAge * result));
		} else if (slave.geneticQuirks.neoteny === 2 && slave.visualAge < V.minimumSlaveAge) {
			adjustFResult("Appears Underage", -(0.5 * result));
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcAmputation(slave) {
		// missing limbs
		adjustFResult(`Limbs: Missing`, -getLimbCount(slave, 0) * 0.5);
		// non-sex prosthetics
		adjustFResult(`Prosthetics: Non Sexual`, -(getLimbCount(slave, 102) - getLimbCount(slave, 103)) * 0.25);
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcHedonismWeight(slave) {
		if (slave.weight < 10) {
			adjustFResult(`Weight: Hedonism`, -2);
		} else if (slave.weight > 190) {
			adjustFResult(`Weight: Hedonism`, -5);
		} // too fat
	}

	/**
	 * @param {string} text blurb
	 * @param {number} FResultChange
	 */
	function adjustFResult(text, FResultChange) {
		if (FResultChange) {
			retval.push({text: text, value: FResultChange});
			result += FResultChange;
		}
	}

	return FResult;
})();

/** Calculate the sexual value (FResult) of the slave
 * @param {App.Entity.SlaveState} s
 * @param {number} [forSale=0] set to 1 to ignore co-assignment and other temporary factors
 * @returns {number}
 */
globalThis.FResult = function(s, forSale = 0) {
	let FResult = FResultArray(s, forSale).reduce((result, {value}) => result + value, 0);
	FResult = Math.trunc(FResult);
	return FResult;
};

/** Show an itemized breakdown of the sexual value (FResult) of the slave.
 * @param {App.Entity.SlaveState} slave
 * @param {number} [forSale=0] set to 1 to ignore co-assignment and other temporary factors
 * @returns {HTMLSpanElement}
 */
globalThis.FResultTooltip = function(slave, forSale = 0) {
	// Make a link. Text should be slave's FResult. Clicking the link will display detailed info about that FResult over the top of the page (tooltip-style)
	const span = App.UI.DOM.makeElement("span", FResult(slave, forSale).toString(), ["lightcoral", "bold"]);
	span.tabIndex = 0;
	span.classList.add("has-tooltip");
	tippy(span, {
		content: FResultDisplay(),
		interactive: true,
		placement: "right",
	});
	return span;

	/** Upon the link being clicked, set up some links to sort the info and a span to show it in
	 * @returns {HTMLElement}
	 */
	function FResultDisplay() {
		const el = document.createElement("div");
		el.classList.add("tip-details");
		el.append(RelativeDataTable(FResultArray(slave, forSale), "text", "value", [1, 10]));
		return el;
	}
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {boolean} [isStartingSlave] is the slave a "starting slave"
 * @param {boolean} [followLaws] Apply cost variations from enacted Slave Market Regulations
 * @param {boolean} [isSpecial] is this slave a special/hero slave
 * @param {boolean} [returnDOM]
 * @param {Array<{factor: number, reason: string}>} [modifiers]
 * @returns {number | object}
 */
globalThis.slaveCost = function(slave, isStartingSlave = false, followLaws = false, isSpecial = false, returnDOM = false, modifiers = []) {
	const milked = App.SlaveAssignment.getMilked(slave, 1.0, true);
	const beautyObj = slaveCostBeauty(slave, isStartingSlave, followLaws, isSpecial, modifiers);
	const cost = beautyObj.cost;
	/** Arbitrarily, let's say their milk worth is what they would make in a year. Blocking starting slave for now because milk makes so much money, the estimation makes game start impossible. */
	const milkYear = milked.cash * 52;
	if ((milkYear) > cost && !isStartingSlave) {
		const milkSpan = App.UI.DOM.makeElement("span", cashFormat(milkYear));
		if (V.cheatMode || V.debugMode) {
			milkSpan.tabIndex = 0;
			milkSpan.classList.add("has-tooltip");
			tippy(milkSpan, {
				content: `Value as a cow is greater than their value as a sex object. Value is based on a year's fluids with current body.`,
				placement: "right", interactive: true, trigger: "click"
			});
		}
		return returnDOM ? {cost: milkYear, report: milkSpan} : milkYear;
	} else {
		return returnDOM ? {cost: cost, report: costTooltip()} : cost;
	}

	function costTooltip() {
		// Make a link. Clicking the link will display detailed info about that over the top of the page (tooltip-style)
		const span = App.UI.DOM.makeElement("span", cashFormat(cost));
		if (V.cheatMode || V.debugMode) {
			span.tabIndex = 0;
			span.classList.add("has-tooltip");
			tippy(span, {
				content: costDisplay(),
				placement: "right", interactive: true, trigger: "click"
			});
		}
		return span;

		/** Upon the link being clicked, set up some links to sort the info and a span to show it in
		 * @returns {HTMLElement}
		 */
		function costDisplay() {
			let criteria = "value";
			let direction = "descending";

			// Heading line that handles sorting
			const el = document.createElement('div');
			el.classList.add("tip-details");

			el.appendChild(document.createTextNode(`Sort by: `));
			el.appendChild(App.UI.DOM.generateLinksStrip([
				App.UI.DOM.link("Text", () => {
					criteria = "text";
					jQuery(cheatContents).empty().append(costFrame);
				}, []),
				App.UI.DOM.link("Value", () => {
					criteria = "value";
					jQuery(cheatContents).empty().append(costFrame);
				}, []),
				App.UI.DOM.link("Ascending", () => {
					direction = "ascending";
					jQuery(cheatContents).empty().append(costFrame);
				}, []),
				App.UI.DOM.link("Descending", () => {
					direction = "descending";
					jQuery(cheatContents).empty().append(costFrame);
				}, [])
			]));

			let cheatContents = App.UI.DOM.appendNewElement("div", el, costFrame());

			App.UI.DOM.appendNewElement("div", el, "A slave's base value is modified by an additive multiplier.", "note");

			return el;

			/** Set up the frame that contains the info
			 * @returns {HTMLDivElement}
			 */
			function costFrame() {
				let el = document.createElement("div");
				el.classList.add("grid-2columns-auto");

				let sortedBeautyMapKeys;
				if (criteria === "text") {
					if (direction === "descending") {
						sortedBeautyMapKeys = Array.from(beautyObj.map.keys()).sort((a, b) => (a > b) ? 1 : -1);
					} else {
						sortedBeautyMapKeys = Array.from(beautyObj.map.keys()).sort((a, b) => (a < b) ? 1 : -1);
					}
				} else if (criteria === "value") {
					if (direction === "descending") {
						sortedBeautyMapKeys = Array.from(beautyObj.map.keys()).sort((a, b) => (beautyObj.map.get(a) < beautyObj.map.get(b)) ? 1 : -1);
					} else {
						sortedBeautyMapKeys = Array.from(beautyObj.map.keys()).sort((a, b) => (beautyObj.map.get(a) > beautyObj.map.get(b)) ? 1 : -1);
					}
				}

				for (const key of sortedBeautyMapKeys) {
					let value = beautyObj.map.get(key);
					value = (Math.floor(value * 10) / 10);

					let className;
					if (value > 0) {
						className = "green";
					} else if (value < 0) {
						className = "red";
					}
					App.UI.DOM.appendNewElement("div", el, value.toString(), className);

					App.UI.DOM.appendNewElement("div", el, capFirstChar(key));
				}

				return el;
			}
		}
	}
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {boolean} isStartingSlave is the slave a "starting slave"
 * @param {boolean} followLaws Apply cost variations from enacted Slave Market Regulations
 * @param {boolean} isSpecial is this slave a special/hero slave
 * @param {Array<{factor: number, reason: string}>} modifiers market discounts, etc
 * @returns {{cost: number, map: Map<string, number>}}
 */
globalThis.slaveCostBeauty = function(slave, isStartingSlave, followLaws, isSpecial, modifiers) {
	const arcology = V.arcologies[0];
	const arcologyInfo = new App.Utils.Arcology(arcology);
	let multiplier = V.slaveCostFactor;
	let cost = Beauty(slave) * FResult(slave, 1);
	/** @type {Map<string, number>} */
	const map = new Map([]);

	calcGenitalsCost(slave);
	calcDevotionTrustCost(slave, isSpecial);
	calcPreferencesCost(slave);
	calcPregCost(slave);
	if (slave.prestige + slave.porn.prestige > 0) {
		calcPrestigeCost(slave);
	}
	calcFSCost(slave);
	if (V.seeAge === 1) {
		calcAgeCost(slave);
	}
	calcCareersCost(slave);
	calcMiscCost(slave);
	calcTimeRemainingCost(slave); /* multipliers */

	calcCost(followLaws);
	if (isStartingSlave) {
		calcStartingSlaveCost(slave);
	}

	// handle incoming modifiers (such as market discounts)
	for (const mod of modifiers) {
		cost *= (1 + mod.factor);
		map.set("(%) " + mod.reason, mod.factor * 100);
	}

	// round to nearest 500 credits
	cost = 500 * Math.trunc(cost / 500);

	return {cost: cost, map: map};

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcGenitalsCost(slave) {
		if (slave.vagina === 0 && slave.counter.vaginal === 0) {
			updateMultiplier(`virgin`, 0.2);
		}
		if (slave.anus === 0 && slave.counter.anal === 0) {
			updateMultiplier(`anal virgin`, 0.2);
		}
		// Boosted these to 20% to account for the fact that it limits the skill that can be attained
		if (slave.vagina > -1 && arcology.FSRestartSMR === 1) {
			if (slave.dick > 0) {
				if (slave.ovaries === 0 && slave.balls === 0) {
					updateMultiplier(`castrated`, 0.8);
				}
			}
		} else if (slave.vagina > -1) {
			if (slave.dick > 0) {
				if (V.ui !== "start" || V.PC.dick === 0 || V.PC.vagina === -1) {
					updateMultiplier(`dick`, 0.2);
					if (slave.ovaries > 0) {
						if (slave.balls > 0) {
							updateMultiplier(`futa`, 0.8);
						}
					}
				} else {
					updateMultiplier(`dick`, 0.1);
					if (slave.ovaries > 0) {
						if (slave.balls > 0) {
							updateMultiplier(`futa`, 0.2);
						}
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {boolean} isSpecial
	 */
	function calcDevotionTrustCost(slave, isSpecial) {
		if (isSpecial === true) {
			if (slave.devotion > 50) {
				updateMultiplier(`special devotion`, slave.devotion / 200);
			}
			if (slave.trust > 50) {
				updateMultiplier(`special trust`, slave.trust / 200);
			}
		} else {
			updateMultiplier(`devotion`, slave.devotion / 200);
			if (slave.devotion < -20) {
				if (slave.trust > 0) {
					updateMultiplier(`trust with low devotion`, -slave.trust / 200);
				}
			} else {
				if (slave.trust > 0) {
					updateMultiplier(`trust with devotion`, slave.trust / 200);
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcPreferencesCost(slave) {
		if (slave.behavioralFlaw !== "none") {
			updateMultiplier(`behavioral flaw`, -0.1);
		}
		if (slave.behavioralQuirk !== "none") {
			updateMultiplier(`behavioral quirk`, 0.1);
		}
		if (slave.sexualFlaw === "breeder" && arcologyInfo.fsActive('FSRepopulationFocus')) {
			updateMultiplier(`sexual flaw, but a breeder`, 0.3);
		} else if (slave.sexualFlaw !== "none") {
			updateMultiplier(`sexual flaw`, -0.1);
		}
		if (slave.sexualQuirk !== "none") {
			updateMultiplier(`sexual quirk`, 0.1);
		}
		if (slave.fetishKnown === 1) {
			if (slave.fetish === Fetish.MINDBROKEN) {
				updateMultiplier(`mindbroken`, -0.3);
			} else if (slave.fetish !== Fetish.NONE) {
				updateMultiplier(`fetish`, slave.fetishStrength / 1000);
			}
		} else {
			updateMultiplier(`unknown fetish`, -0.1);
		}
		if (slave.attrKnown === 1) {
			if (slave.energy > 95) {
				updateMultiplier(`high attraction`, 0.2);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcPregCost(slave) {
		if (slave.mpreg === 1) {
			updateMultiplier(`mpreg`, 0.2);
		}
		if (arcology.FSRepopulationFocusSMR === 1) {
			if (slave.preg < -1) {
				updateMultiplier(`repopulationist sterile`, -0.5);
			} else if (slave.bellyPreg >= 300000) {
				updateMultiplier(`repopulationist mega preg`, 1);
			} else if (slave.bellyPreg >= 120000) {
				updateMultiplier(`repopulationist very preg`, 0.5);
			} else if (slave.preg > slave.pregData.normalBirth / 4) {
				updateMultiplier(`repopulationist showing`, 0.1);
			}
		} else if (arcology.FSRestartSMR === 1) {
			if (slave.preg < -1) {
				updateMultiplier(`restart sterile`, 0.5);
			} else if (slave.bellyPreg >= 300000) {
				updateMultiplier(`restart mega preg`, -2.5);
			} else if (slave.bellyPreg >= 30000) {
				updateMultiplier(`restart very preg`, -1.5);
			} else if (slave.preg > slave.pregData.normalBirth / 4) {
				updateMultiplier(`restart showing`, -1.0);
			}
		} else {
			if (slave.preg < -1) {
				updateMultiplier(`sterile`, -0.1);
			} else if (slave.bellyPreg >= 300000) {
				updateMultiplier(`mega preg`, -1.5);
			} else if (slave.bellyPreg >= 120000) {
				updateMultiplier(`very preg`, -0.5);
			} else if (slave.bellyPreg >= 500 || slave.pregKnown === 1) {
				updateMultiplier(`baby bump`, -0.1);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcPrestigeCost(slave) {
		if (slave.prestige > 0) {
			updateMultiplier(`prestige`, 0.7 * slave.prestige);
		}
		if (slave.porn.prestige === 3) {
			updateMultiplier(`porn prestige`, 1.5);
		} else if (slave.porn.prestige === 2) {
			updateMultiplier(`porn prestige`, 0.7);
		} else if (slave.porn.prestige === 1) {
			updateMultiplier(`porn prestige`, 0.2);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcFSCost(slave) {
		if (arcology.FSSupremacistLawME !== 0) {
			if (slave.race !== arcology.FSSupremacistRace) {
				updateMultiplier(`supremacist race`, -0.1);
			}
		}
		if (arcology.FSSubjugationistLawME !== 0) {
			if (slave.race === arcology.FSSubjugationistRace) {
				updateMultiplier(`subjugationist race`, -0.2);
			}
		}
		if (V.seeCats === 1 && slave.race === "catgirl") {
			if (!arcologyInfo.fsActive('FSBodyPurist') && V.projectN.techReleased === 1) {
				updateMultiplier(`catgirl`, 0.5);
			} else if (!arcologyInfo.fsActive('FSBodyPurist') && V.projectN.techReleased === 0) {
				updateMultiplier(`catgirl`, 0.9);
			} else if (arcologyInfo.fsActive('FSBodyPurist') && arcology.FSBodyPuristCatLaw === 0) {
				updateMultiplier(`catgirl`, -0.5);
			} else if (arcologyInfo.fsActive('FSBodyPurist') && arcology.FSBodyPuristCatLaw === 1 && V.projectN.techReleased === 1) {
				updateMultiplier(`catgirl`, 0.5);
			} else if (arcologyInfo.fsActive('FSBodyPurist') && arcology.FSBodyPuristCatLaw === 1 && V.projectN.techReleased === 0) {
				updateMultiplier(`catgirl`, 0.9);
			}
			if (arcologyInfo.fsActive('FSEgyptianRevivalist')) {
				updateMultiplier(`egyptian catgirl`, 0.2);
			}
			if (arcologyInfo.fsActive('FSTransformationFetishist')) {
				updateMultiplier(`transformation catgirl`, 0.2);
			}
		}
		if (arcology.FSRepopulationFocusSMR !== 0) {
			if (slave.preg > 0) {
				updateMultiplier(`repopulationist preg`, 0.1);
			}
		} else if (arcology.FSRestartSMR !== 0) {
			if (slave.dick > 0) {
				updateMultiplier(`restart smr dick`, -0.1);
			}
			if (slave.balls > 0) {
				updateMultiplier(`restart smr balls`, -0.2);
			}
			if (slave.vagina > 0) {
				updateMultiplier(`restart smr vagina`, -0.1);
			}
			if (slave.ovaries > 0) {
				updateMultiplier(`restart smr ovaries`, -0.5);
			}
		}
		if (arcology.FSGenderFundamentalistSMR !== 0) {
			if (slave.dick > 0) {
				updateMultiplier(`gender fundamentalist smr dick`, -0.1);
			}
			if (slave.balls > 0) {
				updateMultiplier(`gender fundamentalist smr balls`, -0.1);
			}
		} else if (arcologyInfo.fsActive('FSGenderRadicalist')) {
			if (slave.dick > 0) {
				updateMultiplier(`gender radicalist dick`, 0.1);
			}
			if (slave.balls > 0 && arcology.FSGenderRadicalistLawFuta !== 2 && arcology.FSGenderRadicalistLawFuta !== 4) {
				updateMultiplier(`gender radicalist balls`, -0.1);
			}
		}
		if (arcology.FSPetiteAdmirationSMR !== 0 || arcology.FSStatuesqueGlorificationSMR !== 0) {
			if (heightPass(slave)) {
				updateMultiplier(`petite admiration smr`, 0.1);
			} else {
				updateMultiplier(`petite admiration smr`, -0.1);
			}
		}
		if (arcologyInfo.fsActive('FSSlaveProfessionalism')) {
			updateMultiplier(`slave professionalism`, 0.1 * (slave.intelligence / 20));
		}
		if (arcology.FSHedonisticDecadenceSMR !== 0) {
			if (slave.weight > 60 && slave.muscles < 5) {
				updateMultiplier(`hedonistic decadence smr`, 0.1);
			}
		}
		if (arcology.FSArabianRevivalist > 50) {
			updateMultiplier(`arabian revivalist`, 0.1);
		}
		if (arcology.FSNeoImperialist > 40) {
			updateMultiplier(`neo imperialist`, 0.1);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcAgeCost(slave) {
		if (slave.physicalAge === V.minimumSlaveAge && slave.physicalAge === V.fertilityAge && canGetPregnant(slave) && (arcologyInfo.fsActive('FSRepopulationFocus') || arcologyInfo.fsActive('FSGenderFundamentalist'))) {
			if (slave.birthWeek === 0) {
				updateMultiplier(`birthWeek`, 0.4);
			} else if (slave.birthWeek < 4) {
				updateMultiplier(`birthWeek`, 0.1);
			}
		} else if (
			slave.physicalAge === V.minimumSlaveAge ||
			(slave.physicalAge === V.fertilityAge && canGetPregnant(slave) && (arcologyInfo.fsActive('FSRepopulationFocus') || arcologyInfo.fsActive('FSGenderFundamentalist')))
		) {
			if (slave.birthWeek === 0) {
				updateMultiplier(`birthWeek`, 0.2);
			} else if (slave.birthWeek < 4) {
				updateMultiplier(`birthWeek`, 0.05);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcCareersCost(slave) {
		if (slave.career === "a slave") {
			updateMultiplier(`career`, 0.1);
		} else if (App.Data.Careers.Leader.bodyguard.includes(slave.career)) {
			updateMultiplier(`career`, 0.1);
		} else if (App.Data.Careers.Leader.wardeness.includes(slave.career)) {
			updateMultiplier(`career`, 0.1);
		} else if (App.Data.Careers.Leader.attendant.includes(slave.career)) {
			updateMultiplier(`career`, 0.1);
		} else if (App.Data.Careers.Leader.nurse.includes(slave.career)) {
			updateMultiplier(`career`, 0.1);
		} else if (App.Data.Careers.Leader.matron.includes(slave.career)) {
			updateMultiplier(`career`, 0.1);
		} else if (App.Data.Careers.Leader.schoolteacher.includes(slave.career)) {
			updateMultiplier(`career`, 0.1);
		} else if (App.Data.Careers.Leader.stewardess.includes(slave.career)) {
			updateMultiplier(`career`, 0.1);
		} else if (App.Data.Careers.Leader.milkmaid.includes(slave.career)) {
			updateMultiplier(`career`, 0.1);
		} else if (App.Data.Careers.Leader.farmer.includes(slave.career)) {
			updateMultiplier(`career`, 0.1);
		} else if (App.Data.Careers.Leader.madam.includes(slave.career)) {
			updateMultiplier(`career`, 0.1);
		} else if (App.Data.Careers.Leader.DJ.includes(slave.career)) {
			updateMultiplier(`career`, 0.1);
		} else if (App.Data.Careers.Leader.HG.includes(slave.career)) {
			updateMultiplier(`career`, 0.1);
		} else if (App.Data.Careers.Leader.recruiter.includes(slave.career)) {
			updateMultiplier(`career`, 0.1);
		} else if (App.Data.Careers.General.entertainment.includes(slave.career)) {
			updateMultiplier(`career`, 0.05);
		} else if (App.Data.Careers.General.whore.includes(slave.career)) {
			updateMultiplier(`career`, 0.05);
		} else if (App.Data.Careers.General.grateful.includes(slave.career)) {
			updateMultiplier(`career`, 0.05);
		} else if (App.Data.Careers.General.menial.includes(slave.career)) {
			updateMultiplier(`career`, 0.05);
		} else if (App.Data.Careers.General.servant.includes(slave.career)) {
			updateMultiplier(`career`, 0.05);
		}
		if (V.week - slave.weekAcquired >= 20 && slave.skill.entertainment >= 100) {
			if (!App.Data.Careers.General.entertainment.includes(slave.career)) {
				updateMultiplier(`entertainment career`, 0.05);
			}
		}
		if (slave.counter.oral + slave.counter.anal + slave.counter.vaginal + slave.counter.mammary + slave.counter.penetrative > 1000) {
			if (!App.Data.Careers.General.whore.includes(slave.career)) {
				updateMultiplier(`whore career`, 0.05);
			}
		}
		if (!App.Data.Careers.Leader.bodyguard.includes(slave.career) && slave.skill.bodyguard >= Constant.MASTERED_XP) {
			updateMultiplier(`good bodyguard`, 0.1);
		}
		if (!App.Data.Careers.Leader.wardeness.includes(slave.career) && slave.skill.wardeness >= Constant.MASTERED_XP) {
			updateMultiplier(`good wardeness`, 0.1);
		}
		if (!App.Data.Careers.Leader.attendant.includes(slave.career) && slave.skill.attendant >= Constant.MASTERED_XP) {
			updateMultiplier(`good attendant`, 0.1);
		}
		if (!App.Data.Careers.Leader.nurse.includes(slave.career) && slave.skill.nurse >= Constant.MASTERED_XP) {
			updateMultiplier(`good nurse`, 0.1);
		}
		if (!App.Data.Careers.Leader.matron.includes(slave.career) && slave.skill.matron >= Constant.MASTERED_XP) {
			updateMultiplier(`good matron`, 0.1);
		}
		if (!App.Data.Careers.Leader.schoolteacher.includes(slave.career) && slave.skill.teacher >= Constant.MASTERED_XP) {
			updateMultiplier(`good teacher`, 0.1);
		}
		if (!App.Data.Careers.Leader.stewardess.includes(slave.career) && slave.skill.stewardess >= Constant.MASTERED_XP) {
			updateMultiplier(`good stewardess`, 0.1);
		}
		if (!App.Data.Careers.Leader.milkmaid.includes(slave.career) && slave.skill.milkmaid >= Constant.MASTERED_XP) {
			updateMultiplier(`good milkmaid`, 0.1);
		}
		if (!App.Data.Careers.Leader.farmer.includes(slave.career) && slave.skill.farmer >= Constant.MASTERED_XP) {
			updateMultiplier(`good farmer`, 0.1);
		}
		if (!App.Data.Careers.Leader.madam.includes(slave.career) && slave.skill.madam >= Constant.MASTERED_XP) {
			updateMultiplier(`good madam`, 0.1);
		}
		if (!App.Data.Careers.Leader.DJ.includes(slave.career) && slave.skill.DJ >= Constant.MASTERED_XP) {
			updateMultiplier(`good DJ`, 0.1);
		}
		if (!App.Data.Careers.Leader.HG.includes(slave.career) && slave.skill.headGirl >= Constant.MASTERED_XP) {
			updateMultiplier(`good headGirl`, 0.1);
		}
		if (!App.Data.Careers.Leader.recruiter.includes(slave.career) && slave.skill.recruiter >= Constant.MASTERED_XP) {
			updateMultiplier(`good recruiter`, 0.1);
		}
		if (!App.Data.Careers.General.servant.includes(slave.career) && slave.skill.servant >= Constant.MASTERED_XP) {
			updateMultiplier(`good servant`, 0.05);
		}
		if (!App.Data.Careers.General.entertainment.includes(slave.career) && slave.skill.entertainer >= Constant.MASTERED_XP) {
			updateMultiplier(`good entertainer`, 0.05);
		}
		if (!App.Data.Careers.General.whore.includes(slave.career) && slave.skill.whore >= Constant.MASTERED_XP) {
			updateMultiplier(`good whore`, 0.05);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcMiscCost(slave) {
		const totalInt = Math.clamp(slave.intelligence + slave.intelligenceImplant, -130, 130);
		/* make absolutely certain we do not use +-131 in the next line
		 */
		updateMultiplier(`intelligence`, Math.floor((Math.asin(totalInt / 131)) * 50) / 50);
		if (slave.pubertyXY === 0 && slave.physicalAge >= V.potencyAge && slave.genes === "XY" && !arcologyInfo.fsActive('FSGenderRadicalist')) {
			updateMultiplier(`child`, 0.5);
		}
		if (slave.geneticQuirks.albinism === 2) {
			updateMultiplier(`albinism`, 0.2);
		}
		const brands = App.Medicine.Modification.brandRecord(slave);
		if (V.rep > 10000) {
			updateMultiplier(`high rep brand`, 0.1 * (Object.getOwnPropertyNames(brands).length));
		} else if (V.rep < 5000) {
			updateMultiplier(`low rep brand`, -0.1 * (Object.getOwnPropertyNames(brands).length));
		}
		updateMultiplier(`limbs`, -getLimbCount(slave, 0) * 0.05);
		if (!canSee(slave)) {
			updateMultiplier(`vision`, -0.2);
		}
		if (slave.hears === -2) {
			updateMultiplier(`hearing`, -0.1);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcTimeRemainingCost(slave) {
		let weeksRemaining = 1000;
		let weeksRemainingReason = `limited service`;
		if (slave.indenture > -1) {
			updateMultiplier(`indenture level`, -0.1 * slave.indentureRestrictions);
			weeksRemainingReason = `indenture time`;
			weeksRemaining = slave.indenture;
		} else if (V.seeAge === 1) {
			weeksRemaining = 52 - slave.birthWeek; // weeks to next birthday
			if (V.policies.retirement.physicalAgePolicy === 0) {
				weeksRemaining += (V.retirementAge - (slave.actualAge + 1)) * 52;
				weeksRemainingReason = `near retirement (age)`;
			} else {
				weeksRemaining += (V.retirementAge - (slave.physicalAge + 1)) * 52;
				weeksRemainingReason = `near retirement (physical age)`;
			}
		}
		if (weeksRemaining < 260) { // scale value linearly with less than five years remaining service
			updateMultiplier(weeksRemainingReason, (multiplier * weeksRemaining / 260) - multiplier);
		}
	}

	/**
	 * @param {boolean} followLaws
	 */
	function calcCost(followLaws) {
		cost *= multiplier * 50;
		cost = Number(cost) || 0;
		const minimumCost = minimumSlaveCost(followLaws);
		if (cost < minimumCost) {
			cost = minimumCost;
		} else if (cost <= 100000) {
			/* do nothing */
		} else if (cost <= 200000) {
			cost -= (cost - 100000) * 0.1;
		} else if (cost <= 300000) {
			cost -= 10000 + ((cost - 200000) * 0.2);
		} else if (cost <= 400000) {
			cost -= 30000 + ((cost - 300000) * 0.3);
		} else if (cost <= 500000) {
			cost -= 60000 + ((cost - 400000) * 0.4);
		} else {
			cost -= 100000 + ((cost - 500000) * 0.5);
		}
		if (cost < 1000) {
			cost = 1000;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcStartingSlaveCost(slave) {
		let startingSlaveMultiplier = 0;

		if (slave.devotion > 20) {
			startingSlaveMultiplier += (0.000117 * (slave.devotion - 20) * (slave.devotion - 20)) + (0.003167 * (slave.devotion - 20));
		}
		if (slave.skill.whoring) {
			startingSlaveMultiplier += 0.00001 * slave.skill.whoring * slave.skill.whoring;
		}
		if (slave.skill.entertainment) {
			startingSlaveMultiplier += 0.00001 * slave.skill.entertainment * slave.skill.entertainment;
		}
		if (slave.skill.vaginal) {
			startingSlaveMultiplier += 0.00001 * slave.skill.vaginal * slave.skill.vaginal;
		}
		if (slave.skill.penetrative > 10) {
			startingSlaveMultiplier += 0.00001 * slave.skill.penetrative * slave.skill.penetrative;
		}
		if (slave.skill.anal) {
			startingSlaveMultiplier += 0.00001 * slave.skill.anal * slave.skill.anal;
		}
		if (slave.skill.oral) {
			startingSlaveMultiplier += 0.00001 * slave.skill.oral * slave.skill.oral;
		}
		startingSlaveMultiplier += 0.001 * slave.skill.combat;
		if (slave.prestige) {
			startingSlaveMultiplier += slave.prestige;
		}
		if (startingSlaveMultiplier) {
			if (slave.actualAge > 25) {
				startingSlaveMultiplier -= startingSlaveMultiplier * (slave.actualAge - 25) * 0.05;
			}
		}
		startingSlaveMultiplier = Math.clamp(startingSlaveMultiplier, 0, 10);
		cost += cost * startingSlaveMultiplier;
		if (isPCCareerInCategory("slaver")) {
			cost *= 0.5;
		}
	}

	/**
	 * @param {string} reason
	 * @param {number} value
	 */
	function updateMultiplier(reason, value) {
		if (value) {
			map.set(reason, value);
			multiplier += value;
		}
	}
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {number}
 */
globalThis.startingSlaveCost = function(slave) {
	return slaveCost(slave, true);
};

/**
 * Calculates the expected cost for a hero slave.
 * @param {App.Entity.SlaveState} slave
 * @param {number} costFloor - if a slave is worth less than this amount, add between 1/2 and 3/2 this much to it
 * @returns {number}
 */
globalThis.heroSlaveCost = function(slave, costFloor) {
	let cost = (10 * Math.trunc((slaveCost(slave, false, false, true) / 10) * 2));
	if (cost < costFloor) {
		cost += jsRandom(Math.trunc(costFloor / 2000), Math.trunc((costFloor * 3) / 2000)) * 1000;
	}
	return cost;
};
