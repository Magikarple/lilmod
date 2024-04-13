/** Get the slave (or player) who's taking care of this patient's sexual needs this week.
 * @param {App.Entity.SlaveState} slave
 * @returns {{type: "player" | "lover" | "friend" | "family" | "nurse" | null, slave?: App.Entity.SlaveState}}
 */
App.EndWeek.getClinicPartner = function(slave) {
	const validVisitingPartner = (/** @type {App.Entity.SlaveState} */ s) => s && canMove(s) && isSlaveAvailable(s) && App.Utils.sexAllowed(slave, s);
	if (slave.relationship === -3) { // player visits wife
		return {type: "player"};
	}
	if (slave.relationship > 0) {
		const partner = getSlave(slave.relationshipTarget);
		if (validVisitingPartner(partner)) {
			if (slave.relationship > 2) { // lover
				return {type: "lover", slave: partner};
			} else { // friend
				return {type: "friend", slave: partner};
			}
		}
	}
	if (V.seeIncest === 1) { // close family member
		const partner = randomRelatedSlave(slave, validVisitingPartner);
		if (partner) {
			return {type: "family", slave: partner};
		}
	}
	if (S.Nurse && App.Utils.sexAllowed(S.Nurse, slave)) {
		return {type: "nurse"};
	}
	return {type: null};
};

/** Determines which employees a given facility leader is having sex with this week
 * @param {App.Entity.Facilities.Facility} facility
 * @returns {Set<number>}
 */
App.EndWeek.getFLSex = function(facility) {
	/** @type {Set<number>} */
	const employeeSex = new Set();
	const fl = facility.manager ? facility.manager.currentEmployee : null;
	if (fl && App.Data.misc.sexFromDevelopmentLeaders.includes(fl.assignment)) {
		facility.employees().filter(s => flWillFuck(s)).forEach(s => employeeSex.add(s.ID));
	}
	return employeeSex;

	/** @param {App.Entity.SlaveState} emp */
	function flWillFuck(emp) {
		const horny = (s) => s.devotion >= -50 /* not unhappy */ && s.energy > 20/* not frigid */;
		if (fl.assignment === Job.WARDEN && fl.fetish === Fetish.MINDBROKEN) {
			return true; // mindbroken warden ignores rules, rapes everyone
		}
		if (fl.assignment === Job.NURSE && App.EndWeek.getClinicPartner(emp).type !== "nurse") {
			return false; // nurse is busy, will not have sex with patients who are satisfied by someone else
		}
		if (fl.assignment === Job.WARDEN && emp.relationship === -3) {
			return false; // wardeness will never molest the PC's spouse
		}
		if (horny(emp) || fl.assignment === Job.WARDEN) { // only the warden will routinely rape frigid/unhappy slaves
			if (App.Utils.sexAllowed(emp, fl)) { // no sex with a slave you've forbidden them to fuck
				return true;
			}
		}
		return false;
	}
};
