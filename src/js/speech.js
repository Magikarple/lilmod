// cSpell:ignore Dadda

/** Get all the enunciations used by a particular slave as a destructible object.
 * @param {App.Entity.SlaveState} slave
 * @returns {FC.Enunciation}
 */
globalThis.getEnunciation = function(slave) {
	let ret = {};

	if (V.PC.customTitle !== undefined) {
		ret.title = V.PC.customTitle;
	} else if (V.PC.title !== 0) {
		ret.title = "Master";
	} else {
		ret.title = "Mistress";
	}
	if (V.allowFamilyTitles === 1) {
		const soleParentPrefersMom = slave.father === -1 && slave.mother === -1 && V.PC.title === 0;
		if (slave.father === -1 && !soleParentPrefersMom) {
			if (slave.actualAge < 4 && slave.physicalAge < 4) {
				ret.title = "Dadda";
			} else if (slave.actualAge < 9) {
				ret.title = "Daddy";
			} else {
				ret.title = "Dad";
			}
		} else if (slave.mother === -1) {
			if (slave.actualAge < 4 && slave.physicalAge < 4) {
				ret.title = "Mama";
			} else if (slave.actualAge < 9) {
				ret.title = "Mommy";
			} else {
				ret.title = "Mom";
			}
		} else if (V.PC.mother === slave.ID || V.PC.father === slave.ID) {
			if (V.PC.title === 1) {
				ret.title = "Son";
			} else if (V.PC.title === 0) {
				ret.title = "Daughter";
			}
		} else if (areSisters(slave, V.PC) > 0) {
			if (V.PC.title === 1) {
				if (slave.actualAge < 18) {
					ret.title = "Bro";
				} else {
					ret.title = "Brother";
				}
			} else if (V.PC.title === 0) {
				if (slave.actualAge < 18) {
					ret.title = "Sis";
				} else {
					ret.title = "Sister";
				}
			}
		} else if (isAunt(V.PC, slave)) {
			if (V.PC.title === 1) {
				ret.title = "Nephew";
			} else if (V.PC.title === 0) {
				ret.title = "Niece";
			}
		} else if (isAunt(slave, V.PC)) {
			if (V.PC.title === 1) {
				ret.title = "Uncle";
			} else if (V.PC.title === 0) {
				ret.title = "Aunt";
			}
		} else if (areCousins(slave, V.PC)) {
			ret.title = "Cousin";
		} else if (isGrandfatherP(V.PC, slave) || isGrandmotherP(V.PC, slave)) {
			if (V.PC.title === 1) {
				ret.title = "Grandson";
			} else {
				ret.title = "Granddaughter";
			}
		} else if (isGrandfatherP(slave, V.PC)) {
			if (slave.actualAge < 18) {
				ret.title = "Grand-papa";
			} else {
				ret.title = "Grandfather";
			}
		} else if (isGrandmotherP(slave, V.PC)) {
			if (slave.actualAge < 18) {
				ret.title = "Grand-mama";
			} else {
				ret.title = "Grandmother";
			}
		}
	}
	if (slave.custom.title !== undefined && slave.custom.title !== "") {
		if (slave.rudeTitle === 1) {
			if (slave.trust > 20) {
				ret.title = slave.custom.title;
			}
		} else {
			ret.title = slave.custom.title;
		}
	}
	ret.say = "say";

	if (SlaveStatsChecker.checkForLisp(slave)) {
		if (slave.custom.titleLisp !== undefined && slave.custom.titleLisp !== "") {
			if (slave.rudeTitle === 1) {
				if (slave.trust > 20) {
					ret.title = slave.custom.titleLisp;
				}
			} else {
				ret.title = slave.custom.titleLisp;
			}
		} else {
			ret.title = lispReplace(ret.title);
		}
		ret.say = "lisp";
	}

	return ret;
};

/**
 * Returns speech with lisp if slave lisps
 * @param {App.Entity.SlaveState} slave
 * @param {string} speech
 * @returns {string}
 */
globalThis.Spoken = function(slave, speech) {
	if (SlaveStatsChecker.checkForLisp(slave)) {
		return lispReplace(speech);
	} else {
		return speech;
	}
};
