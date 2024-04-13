/**
 * Returns true if two slaves are allowed to have sex according to the rules.
 * @param {FC.HumanState} slaveA
 * @param {FC.HumanState} slaveB
 * @returns {boolean}
 */
App.Utils.sexAllowed = function sexAllowed(slaveA, slaveB) {
	/* absolutely no sex of any kind with relatives, if incest is prohibited by game rules */
	const related = areRelated(slaveA, slaveB);
	if (V.seeIncest === 0 && related) {
		return false;
	}
	/* check most specific to least specific - master, partner, leader, family, slaves */
	if (slaveA === V.PC) {
		return slaveB.rules.release.master === 1;
	} else if (slaveB === V.PC) {
		return slaveA.rules.release.master === 1;
	} else if (haveRelationshipP(slaveA, slaveB)) {
		return (slaveA.rules.release.partner === 1) && (slaveB.rules.release.partner === 1);
	} else if (App.Utils.isDevelopmentFacilityLeader(slaveA, slaveB)) {
		return slaveA.rules.release.facilityLeader === 1;
	} else if (App.Utils.isDevelopmentFacilityLeader(slaveB, slaveA)) {
		return slaveB.rules.release.facilityLeader === 1;
	} else if (related) {
		return (slaveA.rules.release.family === 1) && (slaveB.rules.release.family === 1);
	} else {
		return (slaveA.rules.release.slaves === 1) && (slaveB.rules.release.slaves === 1);
	}
};

/**
 * Returns true if the second slave ID resolves to a real slave that the first slave can fuck.
 * @param {FC.HumanState} slave
 * @param {number} id - slave ID (player not allowed)
 * @returns {boolean}
 */
App.Utils.sexAllowedByID = function sexAllowedByID(slave, id) {
	if (id > 0) {
		const target = getSlave(id);
		return target && this.sexAllowed(slave, target);
	}
	return false;
};

/**
 * Returns true if a slave has a romantic partner other than the PC who is both willing and allowed to have sex with her.
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
App.Utils.hasPartnerSex = function hasPartnerSex(slave) {
	const hasWillingSlavePartner = (slave.rules.relationship === "permissive") && (slave.relationship >= 3) && (slave.relationshipTarget > 0);
	return hasWillingSlavePartner && this.sexAllowedByID(slave, slave.relationshipTarget);
};

/**
 * Returns true if a slave has a close family member other than the PC who is both willing and allowed to have sex with her.
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
App.Utils.hasFamilySex = function hasFamilySex(slave) {
	if (V.seeIncest === 0 || slave.rules.release.family === 0) {
		return false;
	}
	// check fast cases first
	if (this.sexAllowedByID(slave, slave.mother)) {
		return true;
	}
	if (this.sexAllowedByID(slave, slave.father)) {
		return true;
	}
	// search exhaustively for sisters/daughters only if necessary
	if (slave.sisters + slave.daughters === 0) {
		return false;
	}
	return V.slaves.some(s => areRelated(slave, s) && this.sexAllowed(slave, s));
};

/**
 * Returns true if the slave has any kind of nonassignment sex with someone other than the PC.
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
App.Utils.hasNonassignmentSex = function hasNonassignmentSex(slave) {
	return (slave.rules.release.slaves === 1) || this.hasFamilySex(slave) || this.hasPartnerSex(slave);
};

/**
 * Returns true if the slave has an assignment that requires them to have sex.
 * @param {FC.SlaveState} slave
 * @returns {boolean}
 */
App.Utils.hasAssignmentSex = function hasAssignmentSex(slave) {
	return [Job.PUBLIC, Job.WHORE, Job.BROTHEL, Job.CLUB, Job.GLORYHOLE, Job.ARCADE, Job.FUCKTOY, Job.MASTERSUITE, Job.SUBORDINATE].includes(slave.assignment);
};

/**
 * Returns true if the slave is to remain completely chaste.
 * @param {FC.SlaveState} slave
 * @returns {boolean}
 */
App.Utils.isChaste = function isChaste(slave) {
	return !App.Utils.hasNonassignmentSex(slave) && !App.Utils.hasAssignmentSex(slave) && !App.Utils.sexAllowed(slave, V.PC);
};

/**
 * Returns true if there is any restriction at all on how a slave may choose to get off.
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
App.Utils.releaseRestricted = function releaseRestricted(slave) {
	return (slave.rules.release.slaves === 0) || (V.seeIncest && slave.rules.release.family === 0) || (slave.rules.release.masturbation === 0) || (slave.rules.release.partner === 0);
};

/**
 * Returns true if employee is an employee of a development facility, and leader manages that same facility. Non-commutative!
 * @param {App.Entity.SlaveState} employee
 * @param {App.Entity.SlaveState} leader
 * @returns {boolean}
 */
App.Utils.isDevelopmentFacilityLeader = function(employee, leader) {
	if (!App.Data.misc.sexFromDevelopmentLeaders.includes(leader.assignment)) {
		return false;
	}
	try {
		const manager = App.Utils.jobForAssignment(employee.assignment)?.facility?.manager?.currentEmployee;
		return (!!manager && leader.ID === manager.ID);
	} catch {
		return false; // could mean no job for assignment, or facility does not have a manager assigned...doesn't matter, we're only interested in matches
	}
};

/**
 * Returns a short summary of the slave's release rules
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.Utils.releaseSummaryShort = function releaseSummaryShort(slave) {
	const rel = slave.rules.release;
	let ret = "";
	if (rel.masturbation === 1) {
		ret += "M";
	}
	if (rel.partner === 1) {
		ret += "P";
	}
	if (rel.family === 1 && V.seeIncest === 1) {
		ret += "F";
	}
	if (rel.slaves === 1) {
		ret += "O";
	}
	if (rel.master === 1) {
		ret += "Y";
	}
	if (ret === "") {
		ret = "None";
	}
	return ret;
};

/**
 * Returns a longer summary of the slave's release rules
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.Utils.releaseSummaryLong = function releaseSummaryLong(slave) {
	const rel = slave.rules.release;
	const includeFamily = (rel.family === 1) && (V.seeIncest === 1);

	if (rel.masturbation === 0 && rel.partner === 0 && rel.facilityLeader === 0 && !includeFamily && rel.slaves === 0 && rel.master === 0) {
		return "chastity";
	} else if (rel.masturbation === 1 && rel.partner === 0 && rel.facilityLeader === 0 && !includeFamily && rel.slaves === 0 && rel.master === 0) {
		return "masturbation only";
	} else if (rel.masturbation === 0 && rel.partner === 1 && rel.facilityLeader === 0 && !includeFamily && rel.slaves === 0 && rel.master === 0) {
		return "partner only";
	} else if (rel.masturbation === 0 && rel.partner === 0 && rel.facilityLeader === 1 && !includeFamily && rel.slaves === 0 && rel.master === 0) {
		return "facility leaders only";
	} else if (rel.masturbation === 0 && rel.partner === 0 && rel.facilityLeader === 0 && includeFamily && rel.slaves === 0 && rel.master === 0) {
		return "family only";
	} else if (rel.masturbation === 0 && rel.partner === 0 && rel.facilityLeader === 0 && !includeFamily && rel.slaves === 1 && rel.master === 0) {
		return "slaves only";
	} else if (rel.masturbation === 0 && rel.partner === 0 && rel.facilityLeader === 0 && !includeFamily && rel.slaves === 0 && rel.master === 1) {
		return "you only";
	} else if (rel.slaves === 1) {
		let ret = "permissive";
		let exceptions = [];
		if (rel.partner === 0) {
			exceptions.push("partner");
		}
		if (rel.facilityLeader === 0) {
			exceptions.push("facility leaders");
		}
		if (!includeFamily) {
			exceptions.push("family");
		}
		if (rel.master === 0) {
			exceptions.push("you");
		}
		if (exceptions.length > 0) {
			ret += " except " + exceptions.reduce(function(res, ch, i, arr) { return res + (i === arr.length - 1 ? ' and ' : ', ') + ch; });
		}
		if (rel.masturbation === 0) {
			ret += ", no masturbation";
		}
		return ret;
	} else {
		let permissions = [];
		if (rel.masturbation === 1) {
			permissions.push("masturbation");
		}
		if (rel.partner === 1) {
			permissions.push("partner");
		}
		if (rel.facilityLeader === 1) {
			permissions.push("facility leaders");
		}
		if (includeFamily) {
			permissions.push("family");
		}
		if (rel.master === 1) {
			permissions.push("you");
		}
		if (permissions.length > 0) {
			return permissions.reduce(function(res, ch, i, arr) { return res + (i === arr.length - 1 ? ' and ' : ', ') + ch; });
		} else {
			return "restrictive";
		}
	}
};

/**
 * Returns a description of the slave's release rules
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.Desc.releaseDesc = function releaseDesc(slave) {
	const rel = slave.rules.release;
	const includeFamily = (rel.family === 1) && (V.seeIncest === 1);
	const {He, he, his, him} = getPronouns(slave);
	let r = "and ";
	let appendFrequency = false;
	if (rel.masturbation === 0 && rel.partner === 0 && !includeFamily && rel.slaves === 0 && rel.master === 0) {
		r += `${he} is to remain completely chaste.`;
	} else if (rel.masturbation === 1 && rel.partner === 0 && !includeFamily && rel.slaves === 0 && rel.master === 0) {
		r += `${he} is only allowed to masturbate`;
		if (slave.energy > 95) {
			r += `, which ${he} is constantly doing.`;
		} else {
			r += `.`;
		}
	} else if (rel.masturbation === 0 && rel.partner === 1 && !includeFamily && rel.slaves === 0 && rel.master === 0) {
		r += `${he} is not allowed to masturbate or proposition `;
		if (slave.rules.relationship === "permissive" && slave.relationship >= 3) {
			r += `slaves other than ${his} ${relationshipTerm(slave)}.`;
		} else {
			r += `other slaves; ${he} must find sexual release in ${his} duties.`;
		}
	} else if (rel.masturbation === 0 && rel.partner === 0 && includeFamily && rel.slaves === 0 && rel.master === 0) {
		r += `${he} is not allowed to masturbate. ${He} is only allowed to achieve sexual release with close family members,`;
		appendFrequency = true;
	} else if (rel.masturbation === 0 && rel.partner === 0 && !includeFamily && rel.slaves === 0 && rel.master === 1) {
		r += `${he} is not allowed to masturbate. ${He} must find you if ${he} wants sexual release,`;
		appendFrequency = true;
	} else if (rel.slaves === 1) {
		if (rel.masturbation === 0) {
			r += `${he} is not allowed to masturbate, but may `;
		} else {
			r += `${he} is allowed to masturbate. ${He} may also `;
		}
		if (V.universalRulesConsent === 1) {
			r += "proposition other slaves to find sexual release,";
		} else {
			r += "demand sex from other slaves,";
		}

		const exceptPartner = (rel.partner === 0) && (slave.rules.relationship === "permissive") && (slave.relationship >= 3);
		if (exceptPartner && !includeFamily) {
			r += ` except for ${his} ${relationshipTerm(slave)} and close family members,`;
		} else if (exceptPartner) {
			r += ` except for ${his} ${relationshipTerm(slave)},`;
		} else if (!includeFamily) {
			r += ` except for ${his} close family members,`;
		}

		appendFrequency = true;
	} else {
		if (rel.masturbation === 0) {
			r += `${he} is not allowed to masturbate, but may `;
		} else {
			r += `${he} is allowed to masturbate. ${He} may also `;
		}

		const showPartner = (rel.partner === 1) && (slave.rules.relationship === "permissive") && (slave.relationship >= 3);
		if (includeFamily && showPartner) {
			r += `have sex with ${his} ${relationshipTerm(slave)} and close family members,`;
		} else if (showPartner) {
			r += `fuck ${his} ${relationshipTerm(slave)} as much as ${he} wants,`;
		} else if (includeFamily && rel.master === 1) {
			r += `proposition sex from ${his} close family members and you,`;
		} else if (includeFamily) {
			r += `proposition sex from ${his} close family members,`;
		} else { // should mean rel.master === 1
			r += `find you for sexual relief,`;
		}

		appendFrequency = true;
	}
	if (appendFrequency) {
		if ((slave.devotion > 50) || (slave.energy > 95)) {
			r += ` which ${he} is constantly doing.`;
		} else if (slave.devotion > 20) {
			r += ` which ${he} is often willing to do.`;
		} else {
			r += ` which ${he} is rarely willing to do.`;
		}
	}
	if (rel.facilityLeader === 0) {
		r += ` Your slave leaders have been told not to touch ${him}, no matter how much ${he} begs.`;
	} // else case is "default state", no text
	return r;
};

App.Utils.testAllReleaseText = function testAllReleaseText() {
	let slave = new App.Entity.SlaveState();
	slave.rules.relationship = "permissive";
	slave.relationship = 4;
	slave.relationshipTarget = -1;
	let r = "";
	for (let i = 0; i < Math.pow(2, 5); ++i) {
		const bits = i.toString(2).padStart(5, "0");
		let rule = new App.Entity.ReleaseRulesState();
		rule.masturbation = Number(bits[0]);
		rule.partner = Number(bits[1]);
		rule.family = Number(bits[2]);
		rule.slaves = Number(bits[3]);
		rule.master = Number(bits[4]);
		slave.rules.release = rule;

		r += JSON.stringify(rule) + "\n";
		r += App.Utils.releaseSummaryShort(slave) + "\n";
		r += App.Utils.releaseSummaryLong(slave) + "\n";
		r += App.Desc.releaseDesc(slave) + "\n";
	}
	return r;
};
