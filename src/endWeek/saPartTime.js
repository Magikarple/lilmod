App.SlaveAssignment.PartTime = Object.freeze(function() {
	/**
	 * How much do part-time jobs degrade the normal performance. Gives a multiplier for the work that still gets done.
	 * @param {FC.SlaveState} slave
	 * @returns {number} Between 0 (exclusive) and 1 (inclusive)
	 */
	function efficiencyModifier(slave) {
		let workTime = 0; // time spent working, in hours per day

		switch (slave.rules.rest) {
			case "none":
				workTime = 16;
				break;
			case "cruel":
				workTime = 15;
				break;
			case "restrictive":
				workTime = 13;
				break;
			case "permissive":
				workTime = 12;
				break;
			case "mandatory":
				workTime = 10;
				break;
		}

		const partTime = arenaTime(slave);
		let efficiency = 1 - (partTime / workTime);

		return Math.max(0.1, efficiency); // Some work would always be done;
	}

	/**
	 * Hours per day the slave devotes to the arena.
	 *
	 * @param {FC.SlaveState} slave
	 * @returns {number}
	 */
	function arenaTime(slave) {
		if (App.Entity.facilities.pit.job("trainee").isEmployed(slave)) {
			if (slave.skill.combat >= 100) {
				return 1; // They just work on maintaining skill
			}
			return 4;
		}
		return 0;
	}

	/**
	 * Assembles the part-time report for all part-time jobs the slave is assigned to.
	 *
	 * @param {FC.ReportSlave} slave
	 * @returns {Array<string>}
	 */
	function saPartTime(slave) {
		/** @type {Array<string>} */
		const f = [];
		if (App.Entity.facilities.pit.job("trainee").isEmployed(slave)) {
			f.push(App.SlaveAssignment.arena(slave));
		}
		return f;
	}

	return {
		efficiencyModifier,
		arenaTime,
		saPartTime,
	};
}());
