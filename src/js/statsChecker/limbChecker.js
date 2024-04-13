/* limb checker */

/**
 * True if slave has no limbs, neither natural nor prosthetic
 *
 * @param {FC.LimbsState} slave
 * @returns {boolean}
 */
globalThis.isAmputee = function(slave) {
	return !(slave.leg.right || slave.leg.left || slave.arm.right || slave.arm.left);
};

/**
 * True if slave has at least one natural limb
 *
 * @param {FC.LimbsState} slave
 * @returns {boolean}
 */
globalThis.hasAnyNaturalLimbs = function(slave) {
	return getLeftArmID(slave) === 1 || getRightArmID(slave) === 1 || getLeftLegID(slave) === 1 || getRightLegID(slave) === 1;
};

/**
 * True if slave has at least one prosthetic limb
 *
 * @param {FC.LimbsState} slave
 * @returns {boolean}
 */
globalThis.hasAnyProstheticLimbs = function(slave) {
	return getLeftArmID(slave) > 1 || getRightArmID(slave) > 1 || getLeftLegID(slave) > 1 || getRightLegID(slave) > 1;
};

/**
 * True if slave has at least one quadrupedal limb
 *
 * @param {FC.LimbsState} slave
 * @returns {boolean}
 */
globalThis.hasAnyQuadrupedLimbs = function(slave) {
	return getLeftArmID(slave) > 6 || getRightArmID(slave) > 6 || getLeftLegID(slave) > 6 || getRightLegID(slave) > 6;
};

/**
 * True if slave has at least one leg
 *
 * @param {FC.LimbsState} slave
 * @returns {boolean}
 */
globalThis.hasAnyLegs = function(slave) {
	return !!slave.leg.right || !!slave.leg.left;
};

/**
 * True if slave has at least one arm
 *
 * @param {FC.LimbsState} slave
 * @returns {boolean}
 */
globalThis.hasAnyArms = function(slave) {
	return !!slave.arm.right || !!slave.arm.left;
};

/**
 * True if slave has at least one leg that is natural
 *
 * @param {FC.LimbsState} slave
 * @returns {boolean}
 */
globalThis.hasAnyNaturalLegs = function(slave) {
	return getLeftLegID(slave) === 1 || getRightLegID(slave) === 1;
};

/**
 * True if slave has at least one arm that is natural
 *
 * @param {FC.LimbsState} slave
 * @returns {boolean}
 */
globalThis.hasAnyNaturalArms = function(slave) {
	return getLeftArmID(slave) === 1 || getRightArmID(slave) === 1;
};

/**
 * True if slave has at least one leg that is prosthetic
 *
 * @param {FC.LimbsState} slave
 * @returns {boolean}
 */
globalThis.hasAnyProstheticLegs = function(slave) {
	return getLeftLegID(slave) > 1 || getRightLegID(slave) > 1;
};

/**
 * True if slave has at least one leg that is quadrupedal
 *
 * @param {FC.LimbsState} slave
 * @returns {boolean}
 */
globalThis.hasAnyQuadrupedLegs = function(slave) {
	return getLeftLegID(slave) > 6 || getRightLegID(slave) > 6;
};

/**
 * True if slave has at least one arm that is prosthetic
 *
 * @param {FC.LimbsState} slave
 * @returns {boolean}
 */
globalThis.hasAnyProstheticArms = function(slave) {
	return getLeftArmID(slave) > 1 || getRightArmID(slave) > 1;
};

/**
 * True if slave has at least one arm that is quadrupedal
 *
 * @param {FC.LimbsState} slave
 * @returns {boolean}
 */
globalThis.hasAnyQuadrupedArms = function(slave) {
	return getLeftArmID(slave) > 6 || getRightArmID(slave) > 6;
};


/**
 * True if slave has both legs
 *
 * @param {FC.LimbsState} slave
 * @returns {boolean}
 */
globalThis.hasBothLegs = function(slave) {
	return !!slave.leg.right && !!slave.leg.left;
};

/**
 * True if slave has both arms
 *
 * @param {FC.LimbsState} slave
 * @returns {boolean}
 */
globalThis.hasBothArms = function(slave) {
	return !!slave.arm.right && !!slave.arm.left;
};

/**
 * True if slave has both legs and they are natural
 *
 * @param {FC.LimbsState} slave
 * @returns {boolean}
 */
globalThis.hasBothNaturalLegs = function(slave) {
	return getLeftLegID(slave) === 1 && getRightLegID(slave) === 1;
};

/**
 * True if slave has both arms and they are natural
 *
 * @param {FC.LimbsState} slave
 * @returns {boolean}
 */
globalThis.hasBothNaturalArms = function(slave) {
	return getLeftArmID(slave) === 1 && getRightArmID(slave) === 1;
};

/**
 * True if slave has both arms and they are artificial
 *
 * @param {FC.LimbsState} slave
 * @returns {boolean}
 */
globalThis.hasBothProstheticArms = function(slave) {
	return getLeftArmID(slave) > 1 && getRightArmID(slave) > 1;
};

/**
 * True if slave has both arms and they are quadrupedal
 *
 * @param {FC.LimbsState} slave
 * @returns {boolean}
 */
globalThis.hasBothQuadrupedArms = function(slave) {
	return getLeftArmID(slave) > 6 && getRightArmID(slave) > 6;
};

/**
 * True if slave has both legs and they are artificial
 *
 * @param {FC.LimbsState} slave
 * @returns {boolean}
 */
globalThis.hasBothProstheticLegs = function(slave) {
	return getLeftLegID(slave) > 1 && getRightLegID(slave) > 1;
};

/**
 * True if slave has both legs and they are quadrupedal
 *
 * @param {FC.LimbsState} slave
 * @returns {boolean}
 */
globalThis.hasBothQuadrupedLegs = function(slave) {
	return getLeftLegID(slave) > 6 && getRightLegID(slave) > 6;
};

/**
 * True if slave has any limbs
 *
 * @param {FC.LimbsState} slave
 * @returns {boolean}
 */
globalThis.hasAnyLimbs = function(slave) {
	return hasAnyArms(slave) || hasAnyLegs(slave);
};

/**
 * True if slave has all limbs
 *
 * @param {FC.LimbsState} slave
 * @returns {boolean}
 */
globalThis.hasAllLimbs = function(slave) {
	return hasBothLegs(slave) && hasBothArms(slave);
};

/**
 * True if slave has all limbs and all are natural
 *
 * @param {FC.LimbsState} slave
 * @returns {boolean}
 */
globalThis.hasAllNaturalLimbs = function(slave) {
	return hasBothNaturalLegs(slave) && hasBothNaturalArms(slave);
};

/**
 * True if slave has all limbs and all are quadrupedal
 *
 * @param {FC.LimbsState} slave
 * @returns {boolean}
 */
globalThis.isQuadrupedal = function(slave) {
	return hasBothQuadrupedLegs(slave) && hasBothQuadrupedArms(slave);
};

/**
 * True if slave has left arm
 *
 * @param {FC.LimbsState} slave
 * @returns {boolean}
 */
globalThis.hasLeftArm = function(slave) {
	return !!slave.arm.left;
};

/**
 * True if slave has right arm
 *
 * @param {FC.LimbsState} slave
 * @returns {boolean}
 */
globalThis.hasRightArm = function(slave) {
	return !!slave.arm.right;
};

/**
 * True if slave has left leg
 *
 * @param {FC.LimbsState} slave
 * @returns {boolean}
 */
globalThis.hasLeftLeg = function(slave) {
	return !!slave.leg.left;
};

/**
 * True if slave has right leg
 *
 * @param {FC.LimbsState} slave
 * @returns {boolean}
 */
globalThis.hasRightLeg = function(slave) {
	return !!slave.leg.right;
};

/**
 * Returns limb ID of the left arm. Uses new IDs.
 *
 * @param {FC.LimbsState} slave
 * @returns {number}
 */
globalThis.getLeftArmID = function(slave) {
	if (hasLeftArm(slave)) {
		return slave.arm.left.type;
	} else {
		return 0;
	}
};

/**
 * Returns limb ID of the right arm. Uses new IDs.
 *
 * @param {FC.LimbsState} slave
 * @returns {number}
 */
globalThis.getRightArmID = function(slave) {
	if (hasRightArm(slave)) {
		return slave.arm.right.type;
	} else {
		return 0;
	}
};

/**
 * Returns limb ID of the left leg. Uses new IDs.
 *
 * @param {FC.LimbsState} slave
 * @returns {number}
 */
globalThis.getLeftLegID = function(slave) {
	if (hasLeftLeg(slave)) {
		return slave.leg.left.type;
	} else {
		return 0;
	}
};

/**
 * Returns limb ID of the right leg. Uses new IDs.
 *
 * @param {FC.LimbsState} slave
 * @returns {number}
 */
globalThis.getRightLegID = function(slave) {
	if (hasRightLeg(slave)) {
		return slave.leg.right.type;
	} else {
		return 0;
	}
};

/**
 * Returns a very short description of the specified limb ID. Uses new limb IDs.
 *
 * @param {number} id
 * @returns {string}
 */
globalThis.idToDescription = function(id) {
	switch (id) {
		case 0:
			return "amputated";
		case 1:
			return "healthy";
		case 2:
			return "modern prosthetic";
		case 3:
			return "advanced, sex-focused prosthetic";
		case 4:
			return "advanced, beauty-focused prosthetic";
		case 5:
			return "advanced, combat-focused prosthetic";
		case 6:
			return "highly advanced cybernetic";
		case 7:
			return "feline prosthetic";
		case 8:
			return "canine prosthetic";
		case 9:
			return "feline combat-adapted prosthetic";
		case 10:
			return "canine combat-adapted prosthetic";
		default:
			return "unknown id: " + id;
	}
};

/**
 * Returns count of specified limb type. Uses new limb IDs:
 * * 0: no limb
 * * 1: natural
 * * 2: basic
 * * 3: sex
 * * 4: beauty
 * * 5: combat
 * * 6: cybernetic
 * * 7: felidaeL
 * * 8: canidaeL
 * * 9: felidaeCL
 * * 10: canidaeCL
 *
 * Can also be used to check for groups:
 * * 101: any limbs, that are not amputated
 * * 102: prosthetic limbs off all kind
 * * 103: sex-prosthetic
 * * 104: beauty-prosthetic
 * * 105: combat-prosthetic
 * * 106: quadruped
 * * 107: feline
 * * 108: canine
 * *
 *
 * !!! I think I adjusted this right but i didn't spend too long on it so it might be wrong. !!!
 *
 * @param {FC.LimbsState} slave
 * @param {number} [id] Defaults to all limb types if unspecified (id = 101)
 * @returns {number}
 */
globalThis.getLimbCount = function(slave, id = 101) {
	if (id < 100) {
		let n = 0;
		if (getLeftArmID(slave) === id) {
			n++;
		}
		if (getRightArmID(slave) === id) {
			n++;
		}
		if (getLeftLegID(slave) === id) {
			n++;
		}
		if (getRightLegID(slave) === id) {
			n++;
		}
		return n;
	}
	switch (id) {
		case 101:
			return getLimbCount(slave, 1) + getLimbCount(slave, 102);
		case 102:
			return getLimbCount(slave, 2) + getLimbCount(slave, 3) + getLimbCount(slave, 4) + getLimbCount(slave, 5) + getLimbCount(slave, 6) + getLimbCount(slave, 7) + getLimbCount(slave, 8) + getLimbCount(slave, 9) + getLimbCount(slave, 10);
		case 103:
			return getLimbCount(slave, 3) + getLimbCount(slave, 6);
		case 104:
			return getLimbCount(slave, 4) + getLimbCount(slave, 6);
		case 105:
			return getLimbCount(slave, 5) + getLimbCount(slave, 6) + getLimbCount(slave, 9) + getLimbCount(slave, 10);
		case 106:
			return getLimbCount(slave, 7) + getLimbCount(slave, 8) + getLimbCount(slave, 9) + getLimbCount(slave, 10);
		case 107:
			return getLimbCount(slave, 7) + getLimbCount(slave, 9);
		case 108:
			return getLimbCount(slave, 8) + getLimbCount(slave, 10);
	}
	// unknown id defaults to 0
	return 0;
};

/**
 * Returns count of specified leg type. Uses new limb IDs.
 *
 * @param {FC.LimbsState} slave
 * @param {number} id
 * @returns {number}
 */
globalThis.getLegCount = function(slave, id) {
	let n = 0;

	if (getLeftLegID(slave) === id) {
		n++;
	}
	if (getRightLegID(slave) === id) {
		n++;
	}

	return n;
};

/**
 * Returns count of specified arm type. Uses new limb IDs.
 *
 * @param {FC.LimbsState} slave
 * @param {number} id
 * @returns {number}
 */
globalThis.getArmCount = function(slave, id) {
	let n = 0;

	if (getLeftArmID(slave) === id) {
		n++;
	}
	if (getRightArmID(slave) === id) {
		n++;
	}

	return n;
};

/**
 * Returns a string depending on the limbs a slave has.
 * By default a variation of "arms and legs", but this can be changed via parameters.
 * Expects the slave to at least have one limb.
 *
 * @param {FC.LimbsState} slave
 * @param {string} [arms]
 * @param {string} [arm]
 * @param {string} [legs]
 * @param {string} [leg]
 */
globalThis.armsAndLegs = function(slave, arms = "arms", arm = "arm", legs = "legs", leg = "leg") {
	let r = "";
	if (hasAnyArms(slave)) {
		if (hasBothArms(slave)) {
			r += arms;
		} else {
			r += arm;
		}
		if (hasAnyLegs(slave)) {
			r += " and ";
		}
	}

	if (hasBothLegs(slave)) {
		r += legs;
	} else if (hasAnyLegs(slave)) {
		r += leg;
	}

	return r;
};
