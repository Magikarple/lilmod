/**
 * checks for illness and reduces the effectiveness of the slave accordingly -- 10, 25, 50, 85, 95% reduced
 * also checks for tiredness and reduces effectiveness from that as well -- 25% reduction at 90+ and 10% at 60-90
 * @param {FC.HumanState} slave
 * @returns {number}
 */
globalThis.healthPenalty = function(slave) {
	const H = slave.health;
	let penalty = 100;
	const realSlave = asSlave(slave);
	if (!realSlave || realSlave.assignment !== Job.GLORYHOLE) {
		if (H.illness > 0) {
			penalty *= (100 - Math.min((Math.pow(H.illness, 2) * 5 + 5), 95)) / 100;
		}
		// tiredness does not affect the productivity of restrained slaves (or the PC)
		const tirednessPenaltyApplies = realSlave && realSlave.fuckdoll === 0 && (realSlave.assignment !== Job.DAIRY || V.dairyRestraintsSetting <= 1);
		if (tirednessPenaltyApplies) {
			if (H.tired > 90) {
				penalty *= 0.75;
			} else if (H.tired > 60) {
				penalty *= 0.90;
			} else if (H.tired === 0) { // Experiment: Fulled rested slaves perform slightly better.
				penalty *= 1.05;
			}
		}
	}
	penalty = Math.trunc(penalty) / 100;
	return penalty;
};

/**
 * All things hurting a slave go through this to update short term damage and slave health.
 * @param {App.Entity.SlaveState|App.Entity.PlayerState} slave
 * @param {number} damage
 * @param {number} mult
 * @returns {void}
 */
globalThis.healthDamage = function(slave, damage, mult = 1) {
	if (!_.isFinite(damage)) {
		throw Error("Health damage must be a finite number.");
	}
	const H = slave.health;
	damage = Math.max(Math.trunc(damage), 0);
	if (slave.id === -1) {
		// temp player exception
		H.shortDamage += Math.trunc(damage / 2) * mult;
	} else {
		H.shortDamage += damage * mult;
	}
	H.condition -= damage;
	updateHealth(slave);
};

/**
 * All things directly curing wounds on a slave go through this to update short term damage and slave health.
 * Use sparingly and for direct medical treatment by qualified professionals only; improveCondition should be used instead for drugs, natural healing, etc.
 * @param {App.Entity.SlaveState} slave
 * @param {number} cure
 * @returns {void}
 */
globalThis.healthCure = function(slave, cure) {
	if (!_.isFinite(cure)) {
		throw Error("Health cure must be a finite number.");
	}
	const H = slave.health;
	cure = Math.max(Math.trunc(cure), 0);
	if (cure > H.shortDamage) {
		cure = H.shortDamage;
	}
	H.shortDamage -= cure;
	H.condition += cure;
	updateHealth(slave);
};

/**
 * Surgical procedures also depend on the PC's medicine skill
 * @param {App.Entity.SlaveState} slave
 * @param {number} damage
 * @param {boolean} [cheat]
 * @returns {void}
 */
globalThis.surgeryDamage = function(slave, damage, cheat = false) {
	if (!cheat) {
		const playerSkillFactor = 1 + Math.clamp(Math.pow(V.PC.skill.medicine / 100, 2), 0, 1);
		healthDamage(slave, Math.trunc(damage / playerSkillFactor));
	}
};

/**
 * All things improving a slave's condition go through this to update condition and slave health.
 * @param {App.Entity.SlaveState|App.Entity.PlayerState} slave
 * @param {number} condition
 * @returns {void}
 */
globalThis.improveCondition = function(slave, condition) {
	if (!_.isFinite(condition)) {
		throw Error("Health condition change must be a finite number.");
	}
	const H = slave.health;
	H.condition += Math.max(Math.trunc(condition), 0);
	updateHealth(slave);
};

/**
 * Computes the aggregate health value for a slave given an assumed condition value.
 * Generally should not be called directly (use updateHealth instead); needed for health gingering.
 * @param {App.Entity.SlaveState|App.Entity.PlayerState} slave
 * @param {number} condition
 * @returns {number}
 */
globalThis.computeAggregateHealth = function(slave, condition) {
	const H = slave.health;

	// Converting the other variables to better fit the same scale as .condition
	const damage = (40 - H.shortDamage - H.longDamage) * 2.5; // 100 / -inf
	const tired = (40 - H.tired) * 2.5; // 100 / -150
	const illness = (5 - Math.pow(H.illness, 2)) * 20; // 100 / -400

	// Assigning weights to the different components and aggregating
	return condition * 0.6 + damage * 0.2 + tired * 0.1 - illness * 0.1;
};

/**
 * Updates slave.health.health
 * @param {App.Entity.SlaveState|App.Entity.PlayerState} slave
 * @returns {void}
 */
globalThis.updateHealth = function(slave) {
	const H = slave.health;
	H.health = computeAggregateHealth(slave, H.condition);
};

/**
 * A function for setting valid health values for new slaves, comes with a set of defaults.
 * Not meant for use with existing slaves (consider healthDamage(), surgeryDamage() and improveCondition() first), but sometimes useful still.
 * @param {App.Entity.SlaveState} slave
 * @param {number} condition
 * @param {number} [shortDamage]
 * @param {number} [longDamage]
 * @param {number} [illness]
 * @param {number} [tired]
 * @returns {void}
 */
globalThis.setHealth = function(slave, condition = -101, shortDamage = -1, longDamage = -1, illness = -1, tired = -1) {
	const H = slave.health;

	// Making sure all values get set to either a default or their desired value
	if (condition < -100) {
		H.condition = jsRandom(-50, 50); // Default value
	} else {
		H.condition = condition;
	}
	if (shortDamage < 0) {
		H.shortDamage = Math.max(normalRandInt(0, 3), 0);
	} else {
		H.shortDamage = shortDamage;
	}
	if (longDamage < 0) {
		H.longDamage = Math.max(normalRandInt(0, 3), 0);
	} else {
		H.longDamage = longDamage;
	}
	if (V.seeIllness !== 0) {
		if (illness < 0 || illness > 5) {
			H.illness = Math.max(normalRandInt(0, 0.5), 0);
		} else {
			H.illness = illness;
		}
	} else {
		H.illness = 0;
	}
	if (tired < 0 || tired > 100) {
		H.tired = jsRandom(10, 40);
	} else {
		H.tired = tired;
	}

	// Adjusting long term damage for age
	if (slave.physicalAge > 29) {
		for (let i = 1; i < (slave.physicalAge - 29); i++) {
			H.longDamage += Math.trunc((i + 4 + jsRandom(1, 15)) / 20);
		}
	}

	// Making sure their overall health doesn't go too low (and would lead to a very likely death)
	if (H.condition - H.shortDamage - H.longDamage < -100) {
		let excess = -100 + H.condition + H.shortDamage + H.longDamage;
		if (H.shortDamage + H.longDamage < 50) { // As long as the damage doesn't get too crazy we'll compensate condition for it
			H.condition += excess;
		} else if (H.longDamage < 50) { // As long as long damage doesn't get too high we'll compensate by improving shortDamage and condition
			if (H.shortDamage - Math.ceil(excess / 2) > 0) {
				H.shortDamage -= Math.ceil(excess / 2);
				H.condition += Math.ceil(excess / 2);
			} else {
				excess -= H.shortDamage;
				H.shortDamage = 0;
				H.condition += excess;
			}
		} else { // If such high longDamage was intentional, they really should have done better basic math to ensure these slaves wouldn't just die immediately
			if (H.shortDamage - Math.ceil(excess / 3) > 0 && H.longDamage - Math.ceil(excess / 3) > 0) {
				H.longDamage -= Math.ceil(excess / 3);
				H.shortDamage -= Math.ceil(excess / 3);
				H.condition += Math.ceil(excess / 3);
			} else {
				excess -= H.shortDamage;
				H.shortDamage = 0;
				if (H.longDamage - Math.ceil(excess / 2) > 0) {
					H.longDamage -= Math.ceil(excess / 2);
					H.condition += Math.ceil(excess / 2);
				} else {
					excess -= H.longDamage;
					H.longDamage = 0;
					H.condition += excess;
				}
			}
		}
	}

	// Finally giving slaves their overall health value
	updateHealth(slave);
};
