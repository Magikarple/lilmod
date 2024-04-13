// cSpell:ignore Dheight, AHeight, Dprestige, Aprestige, Dpregnancy, Apregnancy, Dsex, Asex, Dintelligence
// cSpell:ignore Aintelligence, Dmuscles, Amuscles, Dweight, Aweight, Dhealth, Ahealth, Dbeauty, Abeauty, Dweekly
// cSpell:ignore Aweekly, Dtrust, Atrust, Ddevotion, Adevotion, Dphysical, Aphysical, Dvisual, Avisual, Aactual
// cSpell:ignore Dseniority, Aseniority, Dname, Dassignment, Aassignment


globalThis.cumSlaves = function() {
	return V.slaves.filter(s => (s.assignment === Job.MILKED || s.assignment === Job.DAIRY) && s.balls > 0 && s.ballType === "human");
};
globalThis.haremLength = function() {
	return V.slaves.filter(s => [Job.FUCKTOY, Job.MASTERSUITE, Job.CONCUBINE].includes(s.assignment)).length;
};
globalThis.fuckSlavesLength = function() {
	return V.slaves.filter(s => [Job.FUCKTOY, Job.MASTERSUITE, Job.CONCUBINE].includes(s.assignment) && s.rules.release.master !== 0).length;
};
globalThis.servantsLength = function() {
	return V.slaves.filter(s => [Job.HOUSE, Job.QUARTER].includes(s.assignment)).length;
};

globalThis.getRieEligibleSlaves = function() {
	return V.slaves.filter(s => s.fuckdoll === 0 &&
		(assignmentVisible(s) || [Job.MASTERSUITE, Job.CONCUBINE, Job.QUARTER].includes(s.assignment)) &&
		!V.RIESkip.includes(s.ID)
	);
};

globalThis.SlaveSort = function() {
	const effectivePreg = (slave) => {
		// slave.preg is only *mostly* usable for sorting
		if (slave.preg > 0 && !slave.pregKnown) {
			// don't reveal unknown pregnancies
			return 0;
		}
		if (slave.pubertyXX === 0 && (slave.ovaries === 1 || slave.mpreg === 1)) {
			// not ovulating yet - sort between barren slaves and slaves on contraceptives
			return -1.2;
		} else if (slave.ovaryAge >= 47 && (slave.ovaries === 1 || slave.mpreg === 1)) {
			// menopausal - sort between barren slaves and slaves on contraceptives
			return -1.1;
		} else if (slave.pregWeek < 0) {
			// postpartum - sort between slaves on contraceptives and fertile slaves
			return -0.1;
		}
		return slave.preg;
	};

	const effectiveEnergy = (slave) => {
		return slave.attrKnown === 1 ? slave.energy : -101;
	};

	const comparators = {
		Aassignment: (a, b) => a.assignment < b.assignment ? -1 : 1,
		Dassignment: (a, b) => a.assignment > b.assignment ? -1 : 1,
		Aname: (a, b) => a.slaveName < b.slaveName ? -1 : 1,
		Dname: (a, b) => a.slaveName > b.slaveName ? -1 : 1,
		Aseniority: (a, b) => b.weekAcquired - a.weekAcquired,
		Dseniority: (a, b) => a.weekAcquired - b.weekAcquired,
		AactualAge: (a, b) => a.actualAge - b.actualAge,
		DactualAge: (a, b) => b.actualAge - a.actualAge,
		AvisualAge: (a, b) => a.visualAge - b.visualAge,
		DvisualAge: (a, b) => b.visualAge - a.visualAge,
		AphysicalAge: (a, b) => a.physicalAge - b.physicalAge,
		DphysicalAge: (a, b) => b.physicalAge - a.physicalAge,
		Adevotion: (a, b) => a.devotion - b.devotion,
		Ddevotion: (a, b) => b.devotion - a.devotion,
		Atrust: (a, b) => a.trust - b.trust,
		Dtrust: (a, b) => b.trust - a.trust,
		AID: (a, b) => a.ID - b.ID,
		DID: (a, b) => b.ID - a.ID,
		AweeklyIncome: (a, b) => a.lastWeeksCashIncome - b.lastWeeksCashIncome,
		DweeklyIncome: (a, b) => b.lastWeeksCashIncome - a.lastWeeksCashIncome,
		Abeauty: (a, b) => Beauty(a) - Beauty(b),
		Dbeauty: (a, b) => Beauty(b) - Beauty(a),
		Ahealth: (a, b) => a.health.health - b.health.health,
		Dhealth: (a, b) => b.health.health - a.health.health,
		Aweight: (a, b) => a.weight - b.weight,
		Dweight: (a, b) => b.weight - a.weight,
		Amuscles: (a, b) => a.muscles - b.muscles,
		Dmuscles: (a, b) => b.muscles - a.muscles,
		Aintelligence: (a, b) => (a.intelligence + a.intelligenceImplant) - (b.intelligence + b.intelligenceImplant),
		Dintelligence: (a, b) => (b.intelligence + b.intelligenceImplant) - (a.intelligence + a.intelligenceImplant),
		AsexDrive: (a, b) => effectiveEnergy(a) - effectiveEnergy(b),
		DsexDrive: (a, b) => effectiveEnergy(b) - effectiveEnergy(a),
		Apregnancy: (a, b) => effectivePreg(a) - effectivePreg(b),
		Dpregnancy: (a, b) => effectivePreg(b) - effectivePreg(a),
		Aprestige: (a, b) => a.prestige - b.prestige,
		Dprestige: (a, b) => b.prestige - a.prestige,
		Aheight: (a, b) => a.height - b.height,
		Dheight: (a, b) => b.height - a.height,
	};

	return {
		slaves: sortSlaves,
		IDs: sortIDs,
		indices: sortIndices
	};

	/** @param {App.Entity.SlaveState[]} [slaves] */
	function sortSlaves(slaves) {
		slaves = slaves || V.slaves;
		slaves.sort(_comparator());
		if (slaves === V.slaves) {
			V.slaveIndices = slaves2indices();
		}
	}

	/** @param {number[]} [slaveIDs] */
	function sortIDs(slaveIDs) {
		const slaves = V.slaves;
		const slaveIndices = V.slaveIndices;
		const cmp = _comparator();
		slaveIDs = slaveIDs || slaves.map(s => s.ID);
		slaveIDs.sort((IDa, IDb) => cmp(slaves[slaveIndices[IDa]], slaves[slaveIndices[IDb]]));
	}

	/** @param {number[]} [slaveIndices] */
	function sortIndices(slaveIndices) {
		const slaves = V.slaves;
		const cmp = _comparator();
		slaveIndices = slaveIndices || [...slaves.keys()];
		slaveIndices.sort((ia, ib) => cmp(slaves[ia], slaves[ib]));
	}

	/**
	 * @callback slaveComparator
	 * @param {App.Entity.SlaveState} a
	 * @param {App.Entity.SlaveState} b
	 * @returns {number}
	 */
	/** @returns {slaveComparator} */
	function _comparator() {
		return _makeStableComparator(comparators[(V.sortSlavesOrder === "ascending" ? 'A' : 'D') + V.sortSlavesBy]);
	}

	/** secondary-sort by ascending ID if the primary comparator would return 0 (equal), so we have a guaranteed stable order regardless of input
	 * @param {slaveComparator} comparator
	 * @returns {slaveComparator}
	 */
	function _makeStableComparator(comparator) {
		return function(a, b) {
			return comparator(a, b) || comparators.AID(a, b);
		};
	}
}();

/**
 * @param {App.Entity.SlaveState[]} slaves
 */
globalThis.slaveSortMinor = function(slaves) {
	slaves.sort((a, b) => a.slaveName < b.slaveName ? -1 : 1);
};

/** @typedef {object} getBestSlavesParams
 * @property {string|function(App.Entity.SlaveState): number} part slave object property or custom function
 * @property {number} [count] number of slaves to return
 * @property {boolean} [largest] should it search for the biggest or smallest value
 * @property {function(App.Entity.SlaveState): boolean} [filter] filter out undesired slaves
 */

/**
 * Example:
 * getBestSlaves({part:"butt", count: 5});
 * getBestSlaves({part:"boobs"});//defaults to top 3
 * getBestSlaves({part:"dick", smallest:true, filter:(slave)=>slave.dick > 0});//defaults to top 3
 * getBestSlaves({part:slave=>slave.intelligence+slave.intelligenceImplant});
 * @param {getBestSlavesParams} params
 * @returns {App.Entity.SlaveState[]} sorted from best to worst
 */
globalThis.getBestSlaves = function({part, count = 3, largest = true, filter = (() => true)}) {
	const partCB = _.isFunction(part) ? part : (slave) => slave[part];

	const sortMethod = largest ? (left, right) => right.value - left.value : (left, right) => left.value - right.value;
	return V.slaves.filter(slave => filter(slave))
		.map(slave => ({slave, value: partCB(slave)}))
		.sort(sortMethod)
		.slice(0, count)
		.map(slaveInfo => slaveInfo.slave);
};

/**
 * @param {getBestSlavesParams} info
 * @returns {number[]}
 */
globalThis.getBestSlavesIDs = function(info) {
	return getBestSlaves(info).map(slave => slave.ID);
};

/**
 * @param {App.Entity.SlaveState[]} [slaves]
 * @returns {{[key: string]: number}}
 */
globalThis.slaves2indices = function(slaves = V.slaves) {
	return slaves.reduce((acc, slave, i) => {
		acc[slave.ID] = i;
		return acc;
	}, {});
};

/** Calculate various averages for the master suite slaves
 * @returns {{energy: number, milk: number, cum: number, dom: number, sadism: number, dick: number, preg: number}}
 */
App.Utils.masterSuiteAverages = (function() {
	const domMap = {dom: 1, submissive: -1};
	const sadismMap = {sadism: 1, masochism: -1};

	/** Returns either zero or the results of mapping the slave's fetish through an object containing fetish names and result values
	 * @param {App.Entity.SlaveState} s
	 * @param {{[key: string]: number}} map
	 * @returns {number}
	 */
	const fetishMapOrZero = (s, map) => map.hasOwnProperty(s.fetish) ? map[s.fetish] : 0;

	return () => {
		const msSlaves = App.Entity.facilities.masterSuite.employees();
		return {
			energy: _.mean(msSlaves.map(s => s.energy)),
			milk: _.mean(msSlaves.map(s => s.lactation * (s.boobs - s.boobsImplant))),
			cum: _.mean(msSlaves.map(s => s.balls ? Math.round(cumAmount(s) / 3) : 0)),
			dick: _.mean(msSlaves.map(s => canPenetrate(s) ? s.dick : 0)),
			preg: _.mean(msSlaves.map(s => s.preg)),
			sadism: _.mean(msSlaves.map(s => (s.fetishStrength * fetishMapOrZero(s, sadismMap)))),
			dom: _.mean(msSlaves.map(s => (s.fetishStrength * fetishMapOrZero(s, domMap)))),
			aggroSperm: _.mean(msSlaves.map(s => (s.geneMods.aggressiveSperm === 1 && isVirile(s)) ? 1 : 0))
		};
	};
})();

/**
 * Updates the globals roomsPopulation and dormitoryPopulation
 * @returns {void}
 */
globalThis.penthouseCensus = function() {
	function occupiesRoom(slave) {
		if (slave.rules.living !== "luxurious") {
			return false; // assigned to dormitory
		} else if (slave.assignment === Job.HEADGIRL && V.HGSuite > 0) {
			return false; // lives in HG suite
		} else if (slave.assignment === Job.BODYGUARD && V.dojo > 0) {
			return false; // lives in dojo
		} else if (slave.relationship >= 4) {
			const partner = getSlave(slave.relationshipTarget);
			if (partner && assignmentVisible(partner) && partner.ID < slave.ID && partner.rules.living === "luxurious") {
				return false; // living with partner, who is already assigned a room (always allocate a room to the partner with the lower ID)
			}
		}
		return true; // takes her own room
	}

	const penthouseSlaves = V.slaves.filter(s => assignmentVisible(s));
	V.roomsPopulation = penthouseSlaves.filter(occupiesRoom).length;
	V.dormitoryPopulation = penthouseSlaves.filter(s => s.rules.living !== "luxurious").length;
};

/**
 * @param {App.Entity.Facilities.Job|App.Entity.Facilities.Facility} jobOrFacility job or facility object
 * @returns {App.Entity.SlaveState[]} array of slaves employed at the job or facility, sorted in accordance to user choice
 */
App.Utils.sortedEmployees = function(jobOrFacility) {
	const employees = jobOrFacility.employees();
	SlaveSort.slaves(employees);
	return employees;
};

/**
 * @param {Array<string|App.Entity.Facilities.Facility>} [facilities]
 * @param {{[key: string]: string}} [mapping] Optional mapping for the property names in the result object. Keys
 * are the standard facility names, values are the desired names.
 * @returns {{[key: string]: number}}
 */
App.Utils.countFacilityWorkers = function(facilities = null, mapping = {}) {
	facilities = facilities || Object.values(App.Entity.facilities);
	/** @type {App.Entity.Facilities.Facility[]} */
	const fObjects = facilities.map(f => typeof f === "string" ? App.Entity.facilities[f] : f);
	return fObjects.reduce((acc, cur) => {
		acc[mapping[cur.desc.baseName] || cur.desc.baseName] = cur.employeesIDs().size;
		return acc;
	}, {});
};

/**
 * @param {string[]} [assignments] array of assignment strings. The default is to count for all assignments
 * @returns {{[key: string]: number}}
 */
App.Utils.countAssignmentWorkers = function(assignments) {
	assignments = assignments || Object.values(Job);
	return assignments.reduce((acc, cur) => {
		acc[cur] = V.JobIDMap[cur].size;
		return acc;
	}, {});
};
