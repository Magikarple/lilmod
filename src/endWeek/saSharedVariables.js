/** Container for temporary variables that must be shared between different elements of the slave assignment report
 * It's still effectively global data (so use sparingly), but with some enforced scoping, and without getting SugarCube involved
 * Should always be null unless App.EndWeek.slaveAssignmentReport is running
 * @type {App.EndWeek.SASharedVariables}
 */
App.EndWeek.saVars = null;

App.EndWeek.SASharedVariables = class {
	/** Initialize - declare members that need to persist *between* slaves here */
	constructor() {
		/** How many slaves can the HG still impregnate? */
		this.HGCum = 0;
		/** How many slaves can the HG still train? */
		this.HGEnergy = 0;
		/** Was the HG's slave successful at helping her? */
		this.HGSlaveSuccess = false;
		/** How much cash bonus is the Madam contributing to her whores? */
		this.madamBonus = 0;
		/** Slave job values */
		this.slaveJobValues = {};
		/** Whore price adjustments (per class) */
		this.whorePriceAdjustment = {};
		/** How many slaves can the designated stud still impregnate? */
		this.StudCum = 0;
		/** Are slaves with the aggressive sperm gene mod jacking off or having sex in the spa pool? */
		this.poolJizz = 0;
		/** Which aggressive sperm slaves are knocking up the spa bathers? */
		this.poolJizzers = [];
		/** How much energy does the player have left to fuck slaves who need it? */
		this.freeSexualEnergy = 0;
		/** How big is the average dick on a slave? */
		this.averageDick = 0;
		/** Who are your subordinate slaves actually assigned to?
		 * @type {Map<number, Array<number>>} - key is sub target, value is list of sub slaves (by ID) assigned to that target
		 */
		this.subSlaveMap = new Map();
		/** Slave art manager */
		this.slaveArt = null;
		/** Need cap per slave. Array indices are the slave IDs (resulting in a sparse array, but that's ok, because we never save this array) */
		this.needCapPerSlave = [];
		/** Which employees the leader of the currently processed facility is having sex with this week
		 *  @type {Set<number>}
		 *  @see App.EndWeek.getFLSex
		 */
		this.flSex = new Set();
		/**
		 * Assignments texts for slaves who choose their own assignment, set in App.SlaveAssignment.choosesOwnJob()
		 * @type {{[key: number]: string}}
		 */
		this.choosesOwnAssignmentText = {};
		/**
		 * Effective Whore Class for use in saWhore. Array indices are the slave IDs
		 * * 1: Lower class
		 * * 2: Middle class
		 * * 3: Upper class
		 * * 4: Top class
		 * @type {Array<number>}
		 */
		this.effectiveWhoreClass = [];
		/**
		 * Max Whore Class for use in saWhore. Array indices are the slave IDs
		 * @type {Array<number>}
		 */
		this.maxWhoreClass = [];
		/** How was a slave tortured, if one was. */
		this.slaveTortured = "none";
		/** Array of all slaves that have reported in that week. Used to display "missed" reports in odd cases, ie. clinic -> brothel. Set in individualSlaveReport, with exceptions for saAgent */
		this.slaveCheckedIn = [];
	}

	/** Compute shared subslave ratio (subslaves per ordinary slave) */
	get subSlaveRatio() {
		const subSlaves = this.subSlaveMap.get(0);
		const subCount = subSlaves ? subSlaves.length : 0;
		if (V.dormitoryPopulation + V.roomsPopulation <= subCount) {
			return subCount; // avoid negative result or divide by zero
		}
		return subCount / (V.dormitoryPopulation + V.roomsPopulation - subCount);
	}
};
