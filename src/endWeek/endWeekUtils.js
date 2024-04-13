/**
 * Sets slave's fetish
 * @param {App.Entity.SlaveState|FC.ReportSlave} slave
 * @param {FC.Fetish} fetish
 * @param {number} strength
 */
globalThis.fetishChange = function(slave, fetish, strength = 65) {
	slave.fetish = fetish;
	slave.fetishStrength = strength;
	slave.fetishKnown = 1;
	if ('fetishChanged' in slave) {
		slave.fetishChanged = 1;
	}
};

/**
 * Make a report slave proxy. This binds extra temporary data to a specific slave as she runs through all the SA reports.
 * Use the {FC.ReportSlave} type to denote that your function requires this temporary proxy data.
 * @param {App.Entity.SlaveState} slave
 * @returns {FC.ReportSlave}
 */
App.SlaveAssignment.reportSlave = function(slave) {
	const proxyProperties = {
		/** Is this slave's paraphilia satisfied? (1: satisfied, 0: no paraphilia; -1: unsatisfied) */
		paraphiliaSatisfied: 0,
		/** A slave with a lot of porn viewers will have a stronger effect on societal norms. This is her multiplier for those effects. */
		pornFameBonus: 1,
		/** Used to condense all the possible galactorrhea lactation start points to a single line of text in saLongTermPhysicalEffects. */
		inappropriateLactation: 0,
		/** Used limit a slave to a single fetish change per week. */
		fetishChanged: 0,
		/** Is the slave resting this week? */
		slaveUsedRest: 0,
	};

	/** effectively merge the proxy properties onto the slave
	 * @type {ProxyHandler<App.Entity.SlaveState>}
	 */
	const handler = {
		get(target, key) {
			if (key in proxyProperties) {
				return proxyProperties[key];
			}
			return target[key];
		},
		set(target, key, value) {
			if (key in proxyProperties) {
				proxyProperties[key] = value;
			}
			target[key] = value;
			return true;
		},
		has(target, key) {
			return (key in proxyProperties) || (key in target);
		}
	};

	return /** @type {FC.ReportSlave} */ (new Proxy(slave, handler));
};

/**
 * Iterable which gets prepared slaves via App.SlaveAssignment.reportSlave
 * @param {App.Entity.SlaveState[]} slaves
 * @yields {FC.ReportSlave}
 */
App.SlaveAssignment.reportSlaves = function*(slaves) {
	let iterationCount = 0;
	for (const slave of slaves) {
		iterationCount++;
		yield App.SlaveAssignment.reportSlave(slave);
	}
	return iterationCount;
};

/**
 * Whether we are on an 'end-week' tagged passage.
 * @returns {boolean}
 */
App.Utils.isEndWeek = function() {
	return Story.lookup("tags", "end-week").map(passage => passage.title).includes(passage());
};
