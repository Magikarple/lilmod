/*
*
* This file focuses on slave related functions that assess qualities about slaves. Are they/can they X?
*
*/

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
globalThis.getSlaveDevotionClass = function(slave) {
	if ((!slave) || (!State)) {
		return undefined;
	}
	if (slave.fetish === Fetish.MINDBROKEN) {
		return "mindbroken";
	}
	if (slave.devotion < -95) {
		return "very-hateful";
	} else if (slave.devotion < -50) {
		return "hateful";
	} else if (slave.devotion < -20) {
		return "resistant";
	} else if (slave.devotion <= 20) {
		return "ambivalent";
	} else if (slave.devotion <= 50) {
		return "accepting";
	} else if (slave.devotion <= 95) {
		return "devoted";
	} else {
		return "worshipful";
	}
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
globalThis.getSlaveTrustClass = function(slave) {
	if ((!slave) || (!State)) {
		return undefined;
	}

	if (slave.fetish === Fetish.MINDBROKEN) {
		return "mindbroken";
	}

	if (slave.trust < -95) {
		return "extremely-terrified";
	} else if (slave.trust < -50) {
		return "terrified";
	} else if (slave.trust < -20) {
		return "frightened";
	} else if (slave.trust <= 20) {
		return "fearful";
	} else if (slave.trust <= 50) {
		if (slave.devotion < -20) {
			return "hate-careful";
		} else {
			return "careful";
		}
	} else if (slave.trust <= 95) {
		if (slave.devotion < -20) {
			return "bold";
		} else {
			return "trusting";
		}
	} else if (slave.devotion < -20) {
		return "defiant";
	} else {
		return "profoundly-trusting";
	}
};

/**
 * Returns a "disobedience factor" between 0 (perfectly obedient) and 100 (completely defiant)
 * @param {App.Entity.SlaveState} slave
 * @returns {number}
 */
globalThis.disobedience = function(slave) {
	const devotionBaseline = 20; // with devotion above this number slaves will obey completely
	const trustBaseline = -20; // with trust below this number slaves will obey completely

	if (slave.devotion > devotionBaseline || slave.trust < trustBaseline) {
		return 0; // no chance of disobedience
	}

	// factors are between 0 (right on the boundary of perfectly obedient) and 10 (completely disobedient)
	let devotionFactor = 10 - ((10 * (slave.devotion + 100)) / (devotionBaseline + 100));
	let trustFactor = (10 * (slave.trust - trustBaseline)) / (100 - trustBaseline);
	return Math.round(devotionFactor * trustFactor);
};

/**
 * Returns how exposing a slave's outfit is, after taking into consideration a topless outfit is more revealing for beboobed slaves or female ones.
 * @param {App.Entity.SlaveState} slave
 * @returns {0|1|2|3|4}
 */
globalThis.getExposure = function(slave) {
	const clothes = App.Data.clothes.get(slave.clothes);
	return (!clothes || (clothes.topless && clothes.exposure < 3 && (slave.boobs > 299 || (slave.genes === 'XX' && slave.vagina >= 0)))) ? 3 : clothes.exposure;
};

/**
 * @param {FC.HumanState} slave
 * @returns {boolean}
 */
globalThis.canImproveIntelligence = function(slave) {
	let origIntel = V.genePool.find(function(s) { return s.ID === slave.ID; }).intelligence;
	return (slave.intelligence < origIntel + 15) && (slave.intelligence < 100);
};

/**
 * This function returns the max *growable* height; remember to consider implants at call sites.
 * @param {FC.HumanState} slave
 * @returns {number}
 */
globalThis.maxHeight = function(slave) {
	let max = Math.clamp(slave.natural.height * 1.25, 0, 274); /* max achievable height is expected height plus 25% */

	if (slave.geneticQuirks.neoteny === 2 && slave.physicalAge > 12) { /* Limit neoteny slaves to 12 year old max height */
		max = Math.clamp(Height.mean(slave.nationality, slave.race, slave.genes, 12) * 1.25, 0, 274);
	}

	if (slave.geneticQuirks.dwarfism === 2 && slave.geneticQuirks.gigantism !== 2) {
		max = Math.min(max, 160);
	} else if (slave.geneticQuirks.gigantism === 2 && slave.geneticQuirks.dwarfism !== 2) {
		max = Math.min(Math.trunc(max * 1.1), 274);
	}

	max = Math.round(max);

	return max;
};

/**
 * @param {FC.HumanState} slave
 * @returns {boolean}
 */
globalThis.canImproveHeight = function(slave) {
	return slave.height - slave.heightImplant * 10 < maxHeight(slave);
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {FC.HumanState} target
 * @returns {boolean}
 */
globalThis.haveRelationshipP = function(slave, target) {
	return slave.relationshipTarget === target.ID;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {App.Entity.SlaveState} target
 * @returns {boolean}
 */
globalThis.isRivalP = function(slave, target) {
	return slave.rivalryTarget === target.ID;
};

/**
 * @param {FC.HumanState} slave
 * @returns {boolean}
 */
globalThis.supremeRaceP = function(slave) {
	return V.arcologies[0].FSSupremacistRace === slave.race;
};

/**
 * @param {FC.HumanState} slave
 * @returns {boolean}
 */
globalThis.inferiorRaceP = function(slave) {
	return V.arcologies[0].FSSubjugationistRace === slave.race;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
globalThis.isLeaderP = function(slave) {
	const leaders = [S.HeadGirl, S.Bodyguard, S.Recruiter, S.Concubine, S.Nurse, S.Attendant, S.Matron, S.Madam, S.DJ, S.Milkmaid, S.Farmer, S.Stewardess, S.Schoolteacher, S.Wardeness];

	return leaders.some(leader => leader && leader.ID === slave.ID);
};

/** Get the written variant of a slave's title for the player, without messing with global state.
 * @param {App.Entity.SlaveState} [slave]
 * @returns {string}
 */
globalThis.getWrittenTitle = function(slave) {
	if (slave && slave.custom.title !== undefined && slave.custom.title !== "" && slave.rudeTitle === 0) {
		return slave.custom.title;
	}
	if (V.PC.customTitle !== undefined) {
		return V.PC.customTitle;
	} else if (V.PC.title !== 0) {
		return "Master";
	} else {
		return "Mistress";
	}
};

/**
 * @param {FC.HumanState} slave
 * @returns {string}
 */
globalThis.SlaveFullName = function(slave) {
	const pair = slave.slaveSurname ? [slave.slaveName, slave.slaveSurname] : [slave.slaveName];
	if ((V.surnameOrder !== 1 && ["Cambodian", "Chinese", "Ancient Chinese Revivalist", "Hungarian", "Japanese", "Edo Revivalist", "Korean", "Mongolian", "Taiwanese", "Vietnamese"].includes(slave.nationality)) || (V.surnameOrder === 2)) {
		pair.reverse();
	}
	return pair.join(" ");
};

/** Is the slave a shelter slave?
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
globalThis.isShelterSlave = function(slave) {
	return slave.origin.includes("Slave Shelter");
};

/**
 * Returns if a person appears male, female, or androgynous.
 * @param {FC.HumanState} slave
 * @returns {number} - negative means male, positive means female, more androgynous is closer to zero
 */
globalThis.perceivedGender = function(slave) {
	let degree = 0;
	if (["cute", "sensual"].includes(slave.faceShape)) {
		degree++;
	} else if (["masculine"].includes(slave.faceShape)) {
		degree--;
	}
	if (slave.shoulders > slave.hips) {
		degree += slave.hips - slave.shoulders;
	} else if (slave.shoulders < slave.hips) {
		degree += slave.shoulders - slave.hips;
	}
	if ((slave.shoulders > 1 && slave.boobs < 650) || (slave.shoulders > 0 && slave.boobs < 500)) {
		// wide shoulders muddle breast size
	} else if (slave.boobs >= 500 || (slave.boobs >= 400 && slave.weight <= 30) || (slave.boobs >= 300 && slave.weight < -10)) {
		degree++;
	}
	let weightAffectsWaist = 0;
	if (slave.hips > 2) {
		if (slave.weight > 0) {
			weightAffectsWaist = Math.round(slave.weight / 6);
		}
		degree++;
	} else if (slave.hips > 1) {
		if (slave.weight > 0) {
			weightAffectsWaist = Math.round(slave.weight / 4);
		}
		if (slave.butt <= 3) {
			degree--;
		} else {
			degree++;
		}
	} else if (slave.hips > 0) {
		if (slave.weight > 0) {
			weightAffectsWaist = Math.round(slave.weight / 2);
		}
		if (slave.butt <= 2) {
			degree--;
		} else {
			degree++;
		}
	} else if (slave.hips > -1) {
		if (slave.weight > 0) {
			weightAffectsWaist = slave.weight;
		}
		if (slave.butt <= 1) {
			degree--;
		} else {
			degree++;
		}
	} else if (slave.butt > 2) {
		degree++;
	} else {
		degree--;
	}
	if (slave.weight > 0) {
		if (slave.hips === -1) {
			weightAffectsWaist = Math.round(slave.weight * 2);
		} else if (slave.hips === -2) {
			weightAffectsWaist = Math.round(slave.weight * 4);
		}
	}
	if (slave.waist < -10 - weightAffectsWaist) {
		degree++;
	} else if (slave.waist > 10 - weightAffectsWaist) {
		degree--;
	}
	if (slave.muscles > 50) {
		degree--;
	}
	if (slave.belly >= 5000) {
		degree++;
	}
	if (slave.dick > 2 || slave.balls > 3) {
		degree--;
	}
	degree += Math.trunc(slave.hormoneBalance / 200);
	const PC = asPlayer(slave);
	if (PC) {
		if (PC.title === 1) {
			degree--;
			if (degree > 0) {
				degree *= .85;
			} else {
				degree *= 1.15;
			}
		} else {
			degree++;
			if (degree > 0) {
				degree *= 1.15;
			} else {
				degree *= .85;
			}
		}
	}
	if (slave.genes === GenderGenes.MALE) {
		if (degree > 0) {
			degree *= .75;
		} else {
			degree *= 1.25;
		}
	} else if (slave.genes === GenderGenes.FEMALE) {
		if (degree > 0) {
			degree *= 1.25;
		} else {
			degree *= .75;
		}
	}
	return degree;
};

/**
 * @param {App.Entity.SlaveState} A
 * @param {App.Entity.SlaveState} B
 * @returns {boolean}
 */
globalThis.sameAssignmentP = function(A, B) {
	return A.assignment === B.assignment;
};

/** Determine whether a given penthouse slave can move into a private room or not.
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
globalThis.canMoveToRoom = function(slave) {
	const partner = slave.relationship >= 4 ? getSlave(slave.relationshipTarget) : null;
	const partnerHasRoom = partner && assignmentVisible(partner) && partner.rules.living === "luxurious";
	return partnerHasRoom || V.rooms - V.roomsPopulation >= 1;
};

/**
 * @param {FC.HumanState} slave
 * @returns {0|1|2|3} 0: No heel boost at all. 1: Pumps, slight boost. 2: High heels. 3: Painfully/extreme high heels
 */
globalThis.shoeHeelCategory = function(slave) {
	const height = App.Data.shoes.get(slave.shoes) ? App.Data.shoes.get(slave.shoes).heelHeight : 0; // Height is in cm
	if (height > 20) {
		return 3;
	} else if (height > 5) {
		return 2;
	} else if (height > 0) {
		return 1;
	} else {
		return 0;
	}
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {number} shoe height in cm (heel + platform height)
 */
globalThis.shoeHeight = function(slave) {
	const heelHeight = App.Data.shoes.get(slave.shoes) ? App.Data.shoes.get(slave.shoes).heelHeight : 0;
	const platformHeight = App.Data.shoes.get(slave.shoes) ? App.Data.shoes.get(slave.shoes).platformHeight : 0;
	return heelHeight + platformHeight;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {0|1|2|3}
 */
globalThis.plugWidth = function(slave) {
	const plug = App.Data.buttplug.get(slave.buttplug) || V.customItem.buttplug.get(slave.buttplug);
	return plug.width || 0;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {0|1|2|3}
 */
globalThis.plugLength = function(slave) {
	const plug = App.Data.buttplug.get(slave.buttplug) || V.customItem.buttplug.get(slave.buttplug);
	return plug.length || 0;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {0|1|2|3}
 */
globalThis.dildoWidth = function(slave) {
	const dildo = App.Data.vaginalAccessory.get(slave.vaginalAccessory) || V.customItem.vaginalAccessory.get(slave.vaginalAccessory);
	if (dildo === undefined) {
		console.log("missing dildo: ", slave.vaginalAccessory);
		return 0;
	}
	return dildo.width || 0;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {0|1|2}
 */
globalThis.dildoLength = function(slave) {
	const dildo = App.Data.vaginalAccessory.get(slave.vaginalAccessory) || V.customItem.vaginalAccessory.get(slave.vaginalAccessory);
	return dildo.length || 0;
};

/**
 * Returns the best vibe mode available between the dildo itself, and any attachment that may be present.
 * @param {App.Entity.SlaveState} slave
 * @returns {0|1|2}
 */
globalThis.dildoVibeLevel = function(slave) {
	// Vaginal accessory/dildo
	const dildo = App.Data.vaginalAccessory.get(slave.vaginalAccessory) || V.customItem.vaginalAccessory.get(slave.vaginalAccessory);
	const dildoVibrationLevel = ((dildo) ? dildo.vibrates : 0) || 0;

	// Attachment, if present
	const vaginalAttachment = App.Data.slaveWear.vaginalAttachment.get(slave.vaginalAttachment) || 0;
	const vaginalAttachmentVibrationLevel = ((vaginalAttachment) ? vaginalAttachment.vibrates : 0) || 0;
	return Math.max(dildoVibrationLevel, vaginalAttachmentVibrationLevel);
};
