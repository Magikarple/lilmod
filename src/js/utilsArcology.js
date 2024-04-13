/** Returns the revivalist nationality associated with the player's arcology, or 0 if none
 * @returns {string|0}
 */
globalThis.getRevivalistNationality = function() {
	for (const fsKey of Object.keys(App.Data.FutureSociety.records)) {
		if (V.arcologies[0][fsKey] > 90) {
			const nationality = App.Data.FutureSociety.records[fsKey].nationality;
			if (nationality) {
				return nationality;
			}
		}
	}
	return 0;
};

/** Calculate and return economic uncertainty multiplier for a given arcology
 * @param {number} arcologyID
 * @returns {number}
 */
App.Utils.economicUncertainty = function(arcologyID) {
	let uncertainty = arcologyID === 0 ? 5 : 10;
	if (V.assistant.power === 1) {
		uncertainty -= Math.max(Math.trunc(uncertainty / 2), 0);
	} else if (V.assistant.power > 1) {
		uncertainty = 0;
	}
	return jsRandom(100 - uncertainty, 100 + uncertainty) / 100;
};

/**
 * @returns {number}
 */
App.Utils.schoolCounter = function() {
	return Array.from(App.Data.misc.schools.keys()).filter(s => V[s].schoolPresent).length;
};

/**
 * @typedef {object} menialObject
 * @property {string} text
 * @property {number} value
 */

/**
 * @returns {menialObject}
 */
globalThis.menialPopCap = function() {
	let r = "";

	let popCap = 500 * (1 + V.building.findCells(cell => cell instanceof App.Arcology.Cell.Manufacturing && cell.type === "Pens").length);

	let overMenialCap = V.menials + V.fuckdolls + V.menialBioreactors - popCap;
	if (overMenialCap > 0) {
		const price = menialSlaveCost(-overMenialCap);
		if (V.menials > 0) {
			if (V.menials > overMenialCap) {
				cashX((overMenialCap * price), "menialTrades");
				V.menialDemandFactor -= overMenialCap;
				V.menials -= overMenialCap;
				overMenialCap = 0;
				r += "You don't have enough room for all your menials and are obliged to sell some.";
			} else {
				cashX((V.menials * price), "menialTrades");
				V.menialDemandFactor -= V.menials;
				overMenialCap -= V.menials;
				V.menials = 0;
				r += "You don't have enough room for your menials and are obliged to sell them.";
			}
		}
		if (overMenialCap > 0 && V.fuckdolls > 0) {
			if (V.fuckdolls > overMenialCap) {
				cashX(overMenialCap * (price * 2), "menialTrades");
				V.menialDemandFactor -= overMenialCap;
				V.fuckdolls -= overMenialCap;
				overMenialCap = 0;
				r += "You don't have enough room for all your Fuckdolls and are obliged to sell some.";
			} else {
				cashX(V.fuckdolls * (price * 2), "menialTrades");
				V.menialDemandFactor -= V.fuckdolls;
				overMenialCap -= V.fuckdolls;
				V.fuckdolls = 0;
				r += "You don't have enough room for your Fuckdolls and are obliged to sell them.";
			}
		}
		if (overMenialCap > 0 && V.menialBioreactors > 0) {
			cashX(overMenialCap * (price - 100), "menialTrades");
			V.menialDemandFactor -= overMenialCap;
			V.menialBioreactors -= overMenialCap;
			r += "You don't have enough room for all your menial bioreactors and are obliged to sell some.";
		}
	}
	return {text: r, value: popCap};
};

/**
 * Returns the percentage (0-100) of the social acceptance of the slaves penetrating citizens in YOUR arcology. Accepts a slave as argument.
 *
 * @param {FC.SlaveState} slave
 * @returns {number}
 */
globalThis.penetrativeSocialUse = function(slave = null) {
	let total = 10;
	if (V.policies.sexualOpenness) {
		total += 40 + 20 * (Math.clamp(V.rep - 5000, 0, 12000) / 12000); // penetrative campaign, related to reputation, (40 to 60)
	}
	total += V.LDE.schoolPresent * 3 + V.TGA.schoolPresent * 3 + V.TFS.schoolPresent * 10; // slave schools focused on penises
	total += FutureSocieties.isActive("FSGenderRadicalist") ? 25 : 0;
	total += [0, 15, 20, 0, 5][V.arcologies[0].FSGenderRadicalistLawFuta]; // 15 futas, 20 big dicks & balls, 5 small dicks
	total += FutureSocieties.isActive("FSNull") ? 15 : 0;
	total += FutureSocieties.isActive("FSHedonisticDecadence") ? 15 : 0;
	total += FutureSocieties.isActive("FSRepopulationFocus") ? 5 : 0;
	total += V.arcologies[0].FSRepopulationFocusLaw * 10;

	total -= FutureSocieties.isActive("FSGenderFundamentalist") ? 25 : 0;
	total -= V.arcologies[0].FSGenderFundamentalistSMR ? 30 : 0;
	total -= FutureSocieties.isActive("FSEdoRevivalist") ? 10 : 0;
	total -= FutureSocieties.isActive("FSArabianRevivalist") ? 10 : 0;
	total -= FutureSocieties.isActive("FSChineseRevivalist") ? 10 : 0;
	total -= V.arcologies[0].FSRestartSMR ? 30 : 0;
	total -= FutureSocieties.isActive("FSAztecRevivalist") ? 10 : 0;
	total -= FutureSocieties.isActive("FSNeoImperialist") ? 10 : 0;
	total -= FutureSocieties.isActive("FSAntebellumRevivalist") ? 10 : 0;

	total = Math.clamp(total, 0, 100);

	if (slave && asSlave(slave)) {
		total += slave.toyHole === "dick" ? 5 : 0;
		total += Math.trunc(slave.skill.penetrative ** 2 / 1000);
		if (FutureSocieties.isActive("FSSupremacist")) {
			total += V.arcologies[0].FSSupremacistRace === slave.race ? 10 : -20;
		}
		if (FutureSocieties.isActive("FSSubjugationist")) {
			total += V.arcologies[0].FSSubjugationistRace === slave.race ? 20 : 0;
		}
		if (FutureSocieties.isActive("FSRestart")) {
			total -= isVirile(slave) ? 40 : 0;
		}
		total += slave.prestige * 5;
		if (slave.porn.prestigeDesc === "fucker") {
			total += (slave.porn.prestige + 1) ** 3; // 1, 8, 27, 64
		} else if (slave.porn.prestigeDesc === "stud") {
			total += (slave.porn.prestige ** 2) * 3; // 0, 3, 12, 27
		} else {
			total += slave.porn.prestige ** 2; // 0, 1, 4, 9
		}
	}

	if (V.seeDicks === 0 && total > 0) {
		total *= .6;
	} else if (V.seeDicks > 25) {
		total += V.seeDicks < 75 ? V.seeDicks * .10 : V.seeDicks * .08;
	}

	if (total >= 40) { // Once dicks are trendy, availability starts to increase interest
		let haveDick = V.slaves.filter(s => s.dick > 0).length;
		if (haveDick) {
			let withDick = (haveDick / V.slaves.length); // percentage of slaves with dicks
			total += withDick > .2 ? 15 * withDick : 0;
			let toyHole = V.slaves.filter(s => s.toyHole === "dick").length;
			total += 10 * (toyHole / haveDick);
			let penetrativeAverage = 0;
			V.slaves.filter(s => s.dick > 0).forEach(s1 => {
				penetrativeAverage += s1.skill.penetrative;
			});
			total += (penetrativeAverage / haveDick) * .1;
		}
	}

	total = Math.clamp(Math.floor(total), 0, 100);
	return total;
};

App.Utils.Arcology = class {
	/**
	 * @param {FC.ArcologyState} [arcology]
	 */
	constructor(arcology) {
		this._arcology = arcology ?? V.arcologies[0];
	}

	/**
	 * @param {FC.FutureSociety} fs
	 * @returns {boolean}
	 */
	fsActive(fs) {
		return FutureSocieties.isActive(fs, this._arcology);
	}

	/**
	 * @param {FC.FutureSociety[]} FSes
	 * @returns {boolean}
	 */
	fsActiveSome(...FSes) {
		return FSes.some((fs) => this.fsActive(fs));
	}

	/**
	 * @param {FC.FutureSociety[]} FSes
	 * @returns {boolean}
	 */
	fsActiveEvery(...FSes) {
		return FSes.every((fs) => this.fsActive(fs));
	}

	/**
	 * @param {FC.FutureSociety[]} FSes
	 * @returns {number}
	 */
	countActive(...FSes) {
		return FSes.reduce((count, fs) => this.fsActive(fs) ? count + 1 : count, 0);
	}

	/**
	 * @returns {keyof FC.RevivalSocietyFreeze | null}
	 */
	revivalSociety() {
		console.assert(this.countActive('FSAztecRevivalist', 'FSEgyptianRevivalist', 'FSEdoRevivalist', 'FSArabianRevivalist', 'FSChineseRevivalist', 'FSNeoImperialist', 'FSRomanRevivalist', 'FSAntebellumRevivalist') <= 1);

		if (this.fsActive('FSAntebellumRevivalist')) {
			return RevivalSociety.ANTEBELLUM;
		} else if (this.fsActive('FSArabianRevivalist')) {
			return RevivalSociety.ARABIAN;
		} else if (this.fsActive('FSAztecRevivalist')) {
			return RevivalSociety.AZTEC;
		} else if (this.fsActive('FSChineseRevivalist')) {
			return RevivalSociety.CHINESE;
		} else if (this.fsActive('FSEdoRevivalist')) {
			return RevivalSociety.EDO;
		} else if (this.fsActive('FSEgyptianRevivalist')) {
			return RevivalSociety.EGYPTIAN;
		} else if (this.fsActive('FSNeoImperialist')) {
			return RevivalSociety.NEO_IMPERIAL;
		} else if (this.fsActive('FSRomanRevivalist')) {
			return RevivalSociety.ROMAN;
		} else {
			return null;
		}
	}
};
