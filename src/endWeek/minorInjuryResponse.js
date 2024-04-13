/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
globalThis.minorInjuryResponse = function(slave) {
	const arcology = V.arcologies[0];
	const arcologyUpgrade = V.arcologyUpgrade;
	const {he, himself, He} = getPronouns(slave);

	return responseWithTracking(trackedCategory());

	/**
	 * @returns {keyof App.Data.Records.LastWeeksCash}
	 */
	function trackedCategory() {
		switch (slave.assignment) {
			case Job.WHORE:
				return "slaveAssignmentWhore";
			case Job.MADAM:
				return "slaveAssignmentMadam";
			case Job.BROTHEL:
				return "slaveAssignmentBrothel";
			case Job.PUBLIC:
				return "slaveAssignmentPublic";
			case Job.DJ:
				return "slaveAssignmentDj";
			case Job.CLUB:
				return "slaveAssignmentClub";
			default:
				throw new Error(`Minor injury response requested for unexpected assignment ${slave.assignment}`);
		}
	}

	/**
	 * @param {keyof App.Data.Records.LastWeeksCash} category
	 * @returns {string}
	 */
	function responseWithTracking(category) {
		let o = "";
		if (arcology.FSDegradationist > 20) {
			o += ` ${He} carries on, knowing that in your degradationist arcology, this is accepted behavior.`;
		} else if (arcology.FSPaternalist > 20) {
			if (arcologyUpgrade.drones === 1 && jsRandom(1, 100) > 50) {
				o += ` The security drones successfully detain him and oblige him to pay significant <span class="yellowgreen">compensation,</span> since abusing slaves is discouraged here.`;
				cashX(50, category, slave);
			} else if (arcologyUpgrade.grid === 1 && jsRandom(1, 100) > 50) {
				o += ` The computer systems successfully detain him and require him to pay significant <span class="yellowgreen">compensation,</span> since abusing slaves is discouraged here.`;
				cashX(50, category, slave);
			} else if (slave.skill.whoring > jsRandom(1, 100)) {
				o += ` ${slave.slaveName} is used to this sort of thing, and convinces him to pay significant <span class="yellowgreen">compensation,</span> since abusing slaves is discouraged here.`;
				cashX(50, category, slave);
			} else if (slave.skill.combat > 30) {
				o += ` ${slave.slaveName} can take care of ${himself}, and ${he} successfully forces him to pay significant <span class="yellowgreen">compensation,</span> since abusing slaves is discouraged here.`;
				cashX(50, category, slave);
			}
		} else {
			if (arcologyUpgrade.drones === 1 && jsRandom(1, 100) > 50) {
				o += ` The security drones successfully detain him and oblige him to pay minor <span class="yellowgreen">compensation.</span>`;
				cashX(10, category, slave);
			} else if (arcologyUpgrade.grid === 1 && jsRandom(1, 100) > 50) {
				o += ` The computer systems successfully detain him and require him to pay minor <span class="yellowgreen">compensation.</span>`;
				cashX(10, category, slave);
			} else if (slave.skill.whoring > jsRandom(1, 100)) {
				o += ` ${slave.slaveName} is used to this sort of thing, and convinces him to pay minor <span class="yellowgreen">compensation.</span>`;
				cashX(10, category, slave);
			} else if (slave.skill.combat > 30) {
				o += ` ${slave.slaveName} can take care of ${himself}, and ${he} successfully forces him to pay minor <span class="yellowgreen">compensation.</span>`;
				cashX(10, category, slave);
			}
		}
		return o;
	}
};
