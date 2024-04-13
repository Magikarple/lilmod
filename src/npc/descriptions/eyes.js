/**
 * returned string fits in a sentence like this:
 * She has {return}.
 *
 * @param {FC.HumanState} slave
 * @returns {string}
 */
App.Desc.eyesType = function(slave) {
	let r = "";
	if (hasBothEyes(slave)) {
		if (getLeftEyeType(slave) !== getRightEyeType(slave)) {
			r = `a ${App.Desc.eyeTypeToString(getRightEyeType(slave))} and a ${App.Desc.eyeTypeToString(getLeftEyeType(slave))} eye`;
		} else {
			r = `${App.Desc.eyeTypeToString(getRightEyeType(slave))} eyes`;
		}
	} else if (hasAnyEyes(slave)) {
		if (hasRightEye(slave)) {
			r = `a ${App.Desc.eyeTypeToString(getRightEyeType(slave))} eye`;
		} else if (hasLeftEye(slave)) {
			r = `a ${App.Desc.eyeTypeToString(getLeftEyeType(slave))} eye`;
		}
	} else {
		r = "no eyes";
	}

	return r;
};

/**
 * converts an eye type to a string
 * @param {number} type
 * @returns {string}
 */
App.Desc.eyeTypeToString = function(type) {
	switch (type) {
		case 1:
			return "natural";
		case 2:
			return "glass";
		case 3:
			return "artificial";
		default:
			return "unknown eye type: " + type;
	}
};

/**
 * Fits in a sentence like this:
 * She has {return}.
 *
 * Intentionally leaves out some information to make it flow nicer and have less grammatical restrictions.
 * Use App.Desc.eyesColorLong for a complete eye description.
 *
 * @param {FC.HumanState} slave
 * @param {string} [adj=""]
 * @param {string} [eye="eye"]
 * @param {string} [eyes="eyes"]
 * @param {boolean} [a=true]
 * @returns {string}
 */
App.Desc.eyesColor = function(slave, adj = "", eye = "eye", eyes = "eyes", a = true) {
	let r = "";
	if (hasBothEyes(slave)) {
		const leftEye = slave.eye.left;
		const rightEye = slave.eye.right;
		if (unusualPupil(leftEye) && leftEye.pupil === rightEye.pupil) {
			r += `${leftEye.pupil} `;
		}
		r += leftEye.iris;
		if (leftEye.iris !== rightEye.iris) {
			r += ` and ${rightEye.iris}`;
		}
		r += ` ${adj} ${eyes}`;
		if (unusualSclera(leftEye) && leftEye.sclera === rightEye.sclera) {
			r += ` with ${leftEye.sclera} sclerae`;
		}
	} else if (hasAnyEyes(slave)) {
		const slaveEye = hasLeftEye(slave) ? slave.eye.left : slave.eye.right;
		if (a) {
			r += "a ";
		}
		if (unusualPupil(slaveEye)) {
			r += `${slaveEye.pupil} `;
		}
		r += `${slaveEye.iris} ${adj ? `${adj} ` : ""}${eye}`;
		if (unusualSclera(slaveEye)) {
			r += ` with ${a ? "a " : ""}${slaveEye.sclera} sclera`;
		}
	} else {
		r = "no eyes";
	}

	return r;

	// TODO: deduplicate with eyesColorLong()
	function unusualPupil(eye) { return eye.pupil !== "circular"; }

	function unusualSclera(eye) { return eye.sclera !== "white"; }
};

/**
 * Returns a description of a given slave's eyes.
 * WARNING: Expects .,:;!? after the string, otherwise there might be grammatical errors!
 *
 * @param {FC.HumanState} slave
 * @returns {string}
 */
App.Desc.eyesColorLong = function(slave) {
	let r = "";
	if (hasBothEyes(slave)) {
		const leftEye = slave.eye.left;
		const rightEye = slave.eye.right;
		if (leftEye.iris === rightEye.iris) {
			if (leftEye.pupil === rightEye.pupil && unusualPupil(leftEye)) {
				r += `${leftEye.pupil} `;
			}
			// This line is the only guaranteed line, every other line has a space on the side TOWARDS this line.
			r += `${leftEye.iris} eyes`;
			let comma = false;
			let left = "";
			let right = "";
			if (leftEye.pupil !== rightEye.pupil) {
				if (unusualPupil(leftEye)) {
					left = ` ${leftEye.pupil}`;
				}
				if (unusualPupil(rightEye)) {
					right = ` ${rightEye.pupil}`;
				}
			}
			if (leftEye.sclera !== rightEye.sclera) {
				if (unusualSclera(leftEye)) {
					left += ` with a ${leftEye.sclera} sclera`;
				}
				if (unusualSclera(rightEye)) {
					right += ` with a ${rightEye.sclera} sclera`;
				}
			}
			if (left !== "") {
				r += `; one${left}`;
				if (right !== "") {
					r += ` and the other${right}`;
				}
				comma = true;
			} else if (right !== "") {
				r += `; one${right}`;
				comma = true;
			}
			if (leftEye.sclera === rightEye.sclera && unusualSclera(leftEye)) {
				r += `${comma ? "," : ""} with ${leftEye.sclera} sclerae`;
			}
		} else {
			const splitPupil = leftEye.pupil !== rightEye.pupil;
			const splitSclerae = leftEye.sclera !== rightEye.sclera;
			if (splitPupil || splitSclerae) {
				r += "a";
				if (splitPupil && unusualPupil(leftEye)) {
					r += ` ${leftEye.pupil}`;
				}
				r += ` ${leftEye.iris} eye`;
				if (splitSclerae && unusualSclera(leftEye)) {
					r += ` with a ${leftEye.sclera} sclera`;
				}
				r += " and a";
				if (splitPupil && unusualPupil(rightEye)) {
					r += ` ${rightEye.pupil}`;
				}
				r += ` ${rightEye.iris} eye`;
				if (splitSclerae && unusualSclera(rightEye)) {
					r += ` with a ${rightEye.sclera} sclera`;
				}
				if (!splitPupil && unusualPupil(leftEye)) {
					r += `; both ${leftEye.pupil}`;
				} else if (!splitSclerae && unusualSclera(leftEye)) {
					r += `; both with ${leftEye.sclera} sclerae`;
				}
			} else {
				if (unusualPupil(leftEye)) {
					r += `${leftEye.pupil} `;
				}
				r += `${leftEye.iris} and ${rightEye.iris} eyes`;
				if (unusualSclera(leftEye)) {
					r += ` with ${leftEye.sclera} sclerae`;
				}
			}
		}
	} else if (hasAnyEyes(slave)) {
		const eye = hasLeftEye(slave) ? slave.eye.left : slave.eye.right;
		r += "a";
		if (unusualPupil(eye)) {
			r += ` ${eye.pupil}`;
		}
		r += ` ${eye.iris} eye`;
		if (unusualSclera(eye)) {
			r += ` with a ${eye.sclera} sclera`;
		}
	} else {
		r = "no eyes";
	}
	return r;

	function unusualPupil(eye) { return eye.pupil !== "circular"; }

	function unusualSclera(eye) { return eye.sclera !== "white"; }
};

/**
 * Fits in a sentence like this:
 * She has {return} eyes.
 * Prefer App.Desc.eyesColor if possible as it works reliably with only one eye.
 * Example where this is better: {return}-eyed gaze
 *
 * @param {FC.HumanState} slave
 * @returns {string} Slave's eye color
 */
App.Desc.eyeColor = function(slave) {
	"use strict";
	let r;

	if (!hasAnyEyes(slave)) {
		r = "empty";
	} else if (hasBothEyes(slave)) {
		if (hasVisibleHeterochromia(slave)) {
			r = `heterochromatic ${getRightEyeColor(slave)} and ${getLeftEyeColor(slave)}`;
		} else {
			r = getLeftEyeColor(slave);
		}
	} else if (hasLeftEye(slave)) {
		r = getLeftEyeColor(slave);
	} else {
		r = getRightEyeColor(slave);
	}
	return r;
};

/**
 * returned string fits in a sentence like this:
 * She has {return}.
 *
 * @param {FC.HumanState} slave
 * @returns {string}
 */
App.Desc.eyesVision = function(slave) {
	let r = "";
	if (hasBothEyes(slave)) {
		if (getLeftEyeVision(slave) !== getRightEyeVision(slave)) {
			r = `a ${App.Desc.eyeVisionToString(getRightEyeVision(slave))} and a ${App.Desc.eyeVisionToString(getLeftEyeVision(slave))} eye`;
		} else {
			r = `${App.Desc.eyeVisionToString(getRightEyeVision(slave))} eyes`;
		}
	} else if (hasAnyEyes(slave)) {
		if (hasRightEye(slave)) {
			r = `a ${App.Desc.eyeVisionToString(getRightEyeVision(slave))} eye`;
		} else if (hasLeftEye(slave)) {
			r = `a ${App.Desc.eyeVisionToString(getLeftEyeVision(slave))} eye`;
		}
	} else {
		r = "no eyes";
	}

	return r;
};

/**
 * converts an eye vision to a string
 * @param {number} type
 * @returns {string}
 */
App.Desc.eyeVisionToString = function(type) {
	switch (type) {
		case 0:
			return "blind";
		case 1:
			return "nearsighted";
		case 2:
			return "normal";
		default:
			return "unknown eye vision: " + type;
	}
};
