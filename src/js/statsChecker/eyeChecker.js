/**
 * True if slave has at least one eye
 *
 * @param {FC.HumanState} slave
 * @returns {boolean}
 */
globalThis.hasAnyEyes = function(slave) {
	return !!slave.eye.right || !!slave.eye.left;
};

/**
 * True if slave has at least one eye that is natural
 *
 * @param {FC.HumanState} slave
 * @returns {boolean}
 */
globalThis.hasAnyNaturalEyes = function(slave) {
	return getLeftEyeType(slave) === 1 || getRightEyeType(slave) === 1;
};

/**
 * True if slave has at least one eye that is prosthetic (cyber or glass)
 *
 * @param {FC.HumanState} slave
 * @returns {boolean}
 */
globalThis.hasAnyProstheticEyes = function(slave) {
	return getLeftEyeType(slave) > 1 || getRightEyeType(slave) > 1;
};

/**
 * True if slave has at least one eye that is cybernetic
 *
 * @param {FC.HumanState} slave
 * @returns {boolean}
 */
globalThis.hasAnyCyberneticEyes = function(slave) {
	return getLeftEyeType(slave) === 3 || getRightEyeType(slave) === 3;
};

/**
 * True if slave has both eyes
 *
 * @param {FC.HumanState} slave
 * @returns {boolean}
 */
globalThis.hasBothEyes = function(slave) {
	return !!slave.eye.right && !!slave.eye.left;
};

/**
 * True if slave has both eyes and they are natural
 *
 * @param {FC.HumanState} slave
 * @returns {boolean}
 */
globalThis.hasBothNaturalEyes = function(slave) {
	return getLeftEyeType(slave) === 1 && getRightEyeType(slave) === 1;
};

/**
 * True if slave has both eyes and they are prosthetic (cyber or glass)
 *
 * @param {FC.HumanState} slave
 * @returns {boolean}
 */
globalThis.hasBothProstheticEyes = function(slave) {
	return getLeftEyeType(slave) > 1 && getRightEyeType(slave) > 1;
};

/**
 * True if slave has both eyes and they are cybernetic
 *
 * @param {FC.HumanState} slave
 * @returns {boolean}
 */
globalThis.hasBothCyberneticEyes = function(slave) {
	return getLeftEyeType(slave) === 3 && getRightEyeType(slave) === 3;
};

/**
 * True if slave has left eye
 *
 * @param {FC.HumanState} slave
 * @returns {boolean}
 */
globalThis.hasLeftEye = function(slave) {
	return !!slave.eye.left;
};
/**
 * True if slave has right eye
 *
 * @param {FC.HumanState} slave
 * @returns {boolean}
 */
globalThis.hasRightEye = function(slave) {
	return !!slave.eye.right;
};

/**
 * Returns type of the left eye.
 *
 * @param {FC.HumanState} slave
 * @returns {number}
 */
globalThis.getLeftEyeType = function(slave) {
	if (hasLeftEye(slave)) {
		return slave.eye.left.type;
	} else {
		return 0;
	}
};

/**
 * Returns type of the right eye.
 *
 * @param {FC.HumanState} slave
 * @returns {number}
 */
globalThis.getRightEyeType = function(slave) {
	if (hasRightEye(slave)) {
		return slave.eye.right.type;
	} else {
		return 0;
	}
};

/**
 * @param {FC.HumanState} slave
 * @returns {number}
 */
globalThis.getLeftEyeVision = function(slave) {
	if (hasLeftEye(slave)) {
		return slave.eye.left.vision;
	} else {
		return 0;
	}
};

/**
 * @param {FC.HumanState} slave
 * @returns {number}
 */
globalThis.getRightEyeVision = function(slave) {
	if (hasRightEye(slave)) {
		return slave.eye.right.vision;
	} else {
		return 0;
	}
};

/**
 * @param {FC.HumanState} slave
 * @returns {number}
 */
globalThis.getBestVision = function(slave) {
	return Math.max(getRightEyeVision(slave), getLeftEyeVision(slave));
};

/**
 * @param {FC.HumanState} slave
 * @returns {number}
 */
globalThis.getWorstVision = function(slave) {
	return Math.min(getRightEyeVision(slave), getLeftEyeVision(slave));
};

/**
 *
 * @param {FC.HumanState} slave
 * @param {number} vision
 * @returns {boolean}
 */
globalThis.anyVisionEquals = function(slave, vision) {
	return getRightEyeVision(slave) === vision || getLeftEyeVision(slave) === vision;
};

/**
 * @param {FC.HumanState} slave
 * @returns {string}
 */
globalThis.getLeftEyeColor = function(slave) {
	if (hasLeftEye(slave)) {
		return slave.eye.left.iris;
	} else {
		return "empty";
	}
};

/**
 * @param {FC.HumanState} slave
 * @returns {string}
 */
globalThis.getRightEyeColor = function(slave) {
	if (hasRightEye(slave)) {
		return slave.eye.right.iris;
	} else {
		return "empty";
	}
};

/**
 * @param {FC.HumanState} slave
 * @returns {string}
 */
globalThis.getLeftEyePupil = function(slave) {
	if (hasLeftEye(slave)) {
		return slave.eye.left.pupil;
	} else {
		return "circular";
	}
};

/**
 * @param {FC.HumanState} slave
 * @returns {string}
 */
globalThis.getRightEyePupil = function(slave) {
	if (hasRightEye(slave)) {
		return slave.eye.right.pupil;
	} else {
		return "circular";
	}
};

/**
 * @param {FC.HumanState} slave
 * @returns {string}
 */
globalThis.getLeftEyeSclera = function(slave) {
	if (hasLeftEye(slave)) {
		return slave.eye.left.sclera;
	} else {
		return "empty";
	}
};

/**
 * @param {FC.HumanState} slave
 * @returns {string}
 */
globalThis.getRightEyeSclera = function(slave) {
	if (hasRightEye(slave)) {
		return slave.eye.right.sclera;
	} else {
		return "empty";
	}
};

/**
 * @param {FC.HumanState} slave
 * @returns {boolean}
 */
globalThis.hasVisibleHeterochromia = function(slave) {
	return hasAnyEyes(slave) && getLeftEyeColor(slave) !== getRightEyeColor(slave);
};

/**
 * Gives the genetic color of the specified eye part.
 *
 * @param {FC.HumanState} playerOrSlave
 * @param {FC.BodySide} side
 * @param {"iris"|"pupil"|"sclera"} [eyePart="iris"]
 * @returns {string}
 */
globalThis.getGeneticEyeColor = function(playerOrSlave, side, eyePart = "iris") {
	if (eyePart === "iris") {
		if (playerOrSlave.geneticQuirks.albinism === 2 && "albinismOverride" in playerOrSlave) {
			return playerOrSlave.albinismOverride.eyeColor;
		} else {
			if (side === "left" && typeof playerOrSlave.geneticQuirks.heterochromia === "string") {
				return playerOrSlave.geneticQuirks.heterochromia;
			} else {
				return playerOrSlave.eye.origColor;
			}
		}
	} else if (eyePart === "pupil") {
		return playerOrSlave.race === "catgirl" ? "catlike" : "circular";
	} else {
		return "white";
	}
};

/**
 * Counts the number of eyes that are not the genetic color
 *
 * @param {FC.HumanState} slave
 * @returns {number}
 */
globalThis.getLenseCount = function(slave) {
	let count = 0;

	if (hasRightEye(slave) &&
		(getRightEyeColor(slave) !== getGeneticEyeColor(slave, "right", "iris")) ||
		(getRightEyePupil(slave) !== getGeneticEyeColor(slave, "right", "pupil")) ||
		(getRightEyeSclera(slave) !== getGeneticEyeColor(slave, "right", "sclera"))) {
		count++;
	}

	if (hasLeftEye(slave) &&
		getLeftEyeColor(slave) !== getGeneticEyeColor(slave, "left", "iris") ||
		(getLeftEyePupil(slave) !== getGeneticEyeColor(slave, "left", "pupil")) ||
		(getLeftEyeSclera(slave) !== getGeneticEyeColor(slave, "left", "sclera"))) {
		count++;
	}

	return count;
};
