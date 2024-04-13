App.Data.FacilityDesc = class {
	constructor() {
		/** Base name for state variables */
		this.baseName = "";
		/** Generic name for UI (Brothel, Club, etc.)
		 * If null, baseName is used instead
		 */
		this.genericName = "";
		/** @type {{[key: string]: FC.Data.JobDesc}} */
		this.jobs = {};
		this.defaultJob = "";
		/** @type {FC.Data.ManagerJobDesc} */
		this.manager = null;
		this.decorated = false;
	}
};

App.Data.Facilities = {};
App.Entity.Facilities = {};

App.Entity.Facilities.Job = class {
	constructor() {
		/** @type {FC.Data.JobDesc} */
		this.desc = null;
		/** @type {App.Entity.Facilities.Facility} */
		this.facility = null;
	}

	/**
	 * Does slave meet the requirements for this job
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string[]}
	 */
	checkRequirements(slave) {
		let r = [];
		if (this.desc.publicSexUse &&
			(slave.breedingMark === 1 && V.propOutcome === 1 && V.eugenicsFullControl !== 1 && FutureSocieties.isActive('FSRestart'))) {
			r.push(`${slave.slaveName} is for private use only.`);
		}
		if (!this.desc.fuckdollAccepted && slave.fuckdoll > 0) {
			r.push(`Fuckdolls can't ${this.desc.assignment} at ${this.facility.name}.`);
		}
		if (!this.desc.broodmotherAccepted && slave.preg >= 36 && slave.broodmother === 2) {
			r.push(`Birthing broodmothers can't ${this.desc.assignment}.`);
		}
		return r;
	}

	/**
	 * Can slave be employed at this position
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string[]}
	 */
	canEmploy(slave) {
		let r = [];
		if (slave.assignment === this.desc.assignment) {
			r.push(`${slave.slaveName} is already assigned to ${this.desc.assignment}.`);
		} else if (this.isEmployed(slave)) {
			r.push(`${slave.slaveName} is already assigned to ${this.desc.assignment} at ${this.facility.name}.`);
		} else if (!this._facilityHasFreeSpace) {
			r.push(`Capacity of ${this.facility.name} exceeded.`);
		}
		r.push(...this.checkRequirements(slave));
		return r;
	}

	/**
	 * Is slave with the given ID already assigned to this job
	 * @param {number} id
	 * @returns {boolean}
	 */
	hasEmployeeWithId(id) {
		return this.employeesIDs().has(id);
	}

	/**
	 * Is slave already assigned to this job
	 * @param {App.Entity.SlaveState} slave
	 * @returns {boolean}
	 */
	isEmployed(slave) {
		return this.hasEmployeeWithId(slave.ID);
	}

	/**
	 * @callback assignmentCallback
	 * @param {App.Entity.SlaveState} slave the slave whose assignment changes
	 * @param {FC.Assignment} assignment new assignment
	 * @returns {void}
	 */

	/**
	 * Returns link text for the penthouse assignment
	 * @param {number} ID slave ID
	 * @param {string} [passage] passage to go to
	 * @param {assignmentCallback} [callback]
	 * @param {string} [linkText]
	 * @returns {HTMLAnchorElement}
	 */
	assignmentLinkElement(ID, passage, callback, linkText) {
		linkText = linkText || this.desc.position;
		return App.UI.DOM.assignmentLink(slaveStateById(ID), this.desc.assignment, passage, callback, linkText);
	}

	/**
	 * all slaves that are employed at this job
	 * @returns {App.Entity.SlaveState[]}
	 */
	employees() {
		return [...this.employeesIDs()].map(id => slaveStateById(id));
	}

	/**
	 * IDs for all slaves that are employed at this job
	 * @returns {Set<number>}
	 */
	employeesIDs() {
		return V.JobIDMap[this.desc.assignment];
	}

	/**
	 * assignment string but the generic facility name replaced with its in-game name
	 */
	get assignment() {
		return this.desc.assignment.replace("the " + this.facility.desc.baseName, this.facility.name);
	}

	/**
	 * Tests if slave is broken enough
	 * @protected
	 * @param {App.Entity.SlaveState} slave
	 * @param {number} [pureDevotion=50] Minimal devotion level to pass test with any trust
	 * @param {number} [devotion=-50] Minimal devotion for slaves with enough fear
	 * @param {number} [trust=-21] Maximal trust (i.e. minimal fear) for the less devotional (see above)
	 * @param {number} [pureFear=-51] Maximal low trust to pass test with any devotion (because of the fear)
	 * @param {number} [pureTrust=101] Minimal high trust level to pass test without devotion
	 * @returns {boolean}
	 */
	static _isBrokenEnough(slave, pureDevotion = 50, devotion = -51, trust = -21, pureFear = -51, pureTrust = 101) {
		return slave.devotion >= pureDevotion ||
			slave.trust >= pureTrust ||
			slave.trust <= pureFear ||
			(
				slave.devotion > devotion &&
				slave.trust < trust
			);
	}

	/**
	 * @protected
	 * Standard message that slave is not broken enough
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string}
	 */
	static _stdBreakageMessage(slave) {
		return `${slave.slaveName} must be either more fearful of you or devoted to you.`;
	}

	/** @protected */
	get _facilityHasFreeSpace() {
		return this.facility.hasFreeSpace;
	}
};

App.Entity.Facilities.ManagingJob = class extends App.Entity.Facilities.Job {
	constructor() {
		super();
		/** @type {FC.Data.ManagerJobDesc} */
		this.desc = null;
	}

	/**
	 * Can slave be employed at this position
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string[]}
	 */
	checkRequirements(slave) {
		let r = super.checkRequirements(slave);
		if (slave.devotion < this.desc.requiredDevotion) {
			r.push(`${slave.slaveName} must be more devoted to you.`);
		}
		if (this.desc.shouldWalk && !canWalk(slave)) {
			r.push(`${slave.slaveName} must be able to walk.`);
		}
		if (this.desc.shouldHold && !canHold(slave)) {
			r.push(`${slave.slaveName} must be able to hold on to objects.`);
		}
		if (this.desc.shouldSee && !canSee(slave)) {
			r.push(`${slave.slaveName} must have working eyes.`);
		}
		if (this.desc.shouldHear && !canHear(slave)) {
			r.push(`${slave.slaveName} must be able to hear.`);
		}
		if (this.desc.shouldTalk && !canTalk(slave)) {
			r.push(`${slave.slaveName} must be able to talk.`);
		}
		if (this.desc.shouldThink && slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${slave.slaveName} must possess cognition.`);
		}
		return r;
	}

	/**
	 * Returns true if slave has enough applicable skill or career
	 * @param {App.Entity.SlaveState} slave
	 * @returns {boolean}
	 */
	slaveHasExperience(slave) {
		return (this.desc.skill && slave.skill[this.desc.skill] >= Constant.MASTERED_XP) || (this.desc.careers.includes(slave.career));
	}

	/** @returns {App.Entity.SlaveState} */
	get currentEmployee() {
		const employees = this.employees();
		return employees.length > 0 ? employees[0] : null;
	}

	/** @protected */
	get _facilityHasFreeSpace() {
		return true;
	}

	/** @returns {string} */
	get positionAbbreviation() {
		return this.desc.positionAbbreviation || "L";
	}
};

App.Entity.Facilities.Facility = class {
	/**
	 * @param {FC.Data.FacilityDesc} desc defines state variable for this facility
	 * @param {{[key: string]: App.Entity.Facilities.Job}} [jobs] job object that are not default
	 * @param {App.Entity.Facilities.ManagingJob} [manager]
	 */
	constructor(desc, jobs, manager) {
		this.desc = desc;
		jobs = jobs || {};
		/** @private @type {{[key: string]: App.Entity.Facilities.Job}} */
		this._jobs = {};

		for (const jn in this.desc.jobs) {
			if (jobs[jn] !== undefined) {
				this._jobs[jn] = jobs[jn];
			} else {
				this._jobs[jn] = this._createJob(jn);
			}
			this._jobs[jn].facility = this;
			this._jobs[jn].desc = desc.jobs[jn];
		}

		if (manager === undefined) {
			// default manager job implementation
			manager = (this.desc.manager !== null) ? new App.Entity.Facilities.ManagingJob() : null;
		}
		/**
		 * @private
		 * @type {App.Entity.Facilities.ManagingJob}
		 */
		this._manager = manager;
		if (this._manager !== null) {
			this._manager.facility = this;
			this._manager.desc = this.desc.manager;
		}
	}

	/** Facility display name
	 * @returns {string} */
	get name() {
		const stateObj = V[this.desc.baseName];
		const res = (stateObj && typeof stateObj === "object") ? stateObj.name : V[this.desc.baseName + "Name"];
		return res !== undefined ? res : 'the ' + this.genericName;
	}

	set name(newName) {
		const stateObj = V[this.desc.baseName];
		if (stateObj && typeof stateObj === "object") {
			stateObj.name = newName;
		} else {
			V[this.desc.baseName + "Name"] = newName;
		}
	}

	/** @returns {string} */
	get nameCaps() {
		return capFirstChar(this.name);
	}

	/** @returns {string} */
	get UIName() {
		return capFirstChar(this.genericName);
	}

	/** Facility generic name ("Brothel", "Schoolroom", etc.)
	 * @returns {string} */
	get genericName() {
		return this.desc.genericName !== null ? this.desc.genericName : capFirstChar(this.desc.baseName);
	}

	/** All jobs at this facility
	 * @returns {string[]}
	 */
	get jobsNames() {
		return Object.keys(this.desc.jobs);
	}

	/**
	 * Returns job description
	 * @param {string} [name] job name; the default job will be used if omitted
	 * @returns {App.Entity.Facilities.Job}
	 */
	job(name) {
		return this._jobs[name || this.desc.defaultJob];
	}

	get jobs() {
		return Object.values(this._jobs);
	}

	get manager() {
		return this._manager;
	}

	/** Facility slave capacity
	 * @returns {number} */
	get capacity() {
		return V[this.desc.baseName] !== null && ((typeof V[this.desc.baseName] === "object") ? V[this.desc.baseName].capacity : V[this.desc.baseName]);
	}

	get established() {
		return this.capacity > 0;
	}

	/** Number of already hosted slaves
	 * @param {string} [jobName]
	 * @returns {number} */
	hostedSlaves(jobName) {
		if (jobName) {
			return this._jobs[jobName].employeesIDs().size;
		}
		return this.jobs.reduce((acc, job) => { return acc + job.employeesIDs().size; }, 0);
	}

	/**
	 * Count of employees plus manager altogether
	 * @returns {number}
	 */
	get totalEmployeesCount() {
		return this.hostedSlaves() + ((this.manager && this.manager.currentEmployee) ? 1 : 0);
	}

	/**
	 * @returns {number} count of non slave occupants (e.g. bioreactors in the dairy)
	 */
	get nonEmployeeOccupantsCount() {
		return 0;
	}

	/**
	 * @returns {number} total count of facility places taken by employees and other beings (e.g. bioreactors in the dairy)
	 */
	get totalOccupants() {
		return this.hostedSlaves() + this.nonEmployeeOccupantsCount;
	}

	get hasEmployees() {
		return this.jobs.some(j => j.employeesIDs().size > 0);
	}

	get hasFreeSpace() {
		return this.capacity > this.totalOccupants;
	}

	get freeSpace() {
		return this.capacity > 0 ? this.capacity - this.totalOccupants : 0;
	}

	/**
	 * @param {string} name
	 * @returns {number}
	 */
	option(name) {
		return (typeof V[this.desc.baseName] === "object") ? V[this.desc.baseName][name] : V[this.desc.baseName + name];
	}

	/**
	 * @param {string} name
	 * @returns {number}
	 */
	upgrade(name) {
		return (typeof V[this.desc.baseName] === "object") ? V[this.desc.baseName].upgrade[name] : this.option("Upgrade" + name);
	}

	/** Can this facility be decorated? */
	get isDecorated() {
		return this.desc.decorated;
	}

	/** How is this facility currently decorated?
	 * @returns {FC.FutureSocietyDeco}
	 */
	get decoration() {
		if (!this.isDecorated) {
			return "standard";
		}
		return (typeof V[this.desc.baseName] === "object") ? V[this.desc.baseName].decoration : V[this.desc.baseName + "Decoration"];
	}

	/** Configure facility decoration
	 * @param {FC.FutureSocietyDeco} val
	 */
	set decoration(val) {
		if (this.isDecorated) {
			if (typeof V[this.desc.baseName] === "object") {
				V[this.desc.baseName].decoration = val;
			} else {
				V[this.desc.baseName + "Decoration"] = val;
			}
		}
	}

	/** Returns the facility's value, including all purchased upgrades. */
	get value() {
		return 10000;
	}

	/**
	 * Can this facility host the given slave
	 * @param {App.Entity.SlaveState} slave
	 * @param {string} [job] default job if omitted
	 * @returns {string[]} array with rejection reasons. Slave can be hosted if this is empty.
	 */
	canHostSlave(slave, job) {
		const j = this.job(job);
		if (j === undefined) {
			if (this.jobs.length === 0) {
				const err = `${this.genericName} facility has no jobs for slaves`;
				console.warn(err);
				return [err];
			} else {
				console.warn(`Can't find job ${job} at ${this.name}.`); // eslint-disable-line no-console
			}
		}
		return j.canEmploy(slave);
	}

	/**
	 * Does the given slave work at this facility
	 * @param {App.Entity.SlaveState} slave
	 * @returns {boolean}
	 */
	isHosted(slave) {
		return this.jobs.some(job => job.isEmployed(slave));
	}

	/**
	 * Returns link text for the job assignments
	 * @param {number} ID slave ID
	 * @param {string} [job] generate link only for this job
	 * @param {string} [passage]
	 * @param {assignmentCallback} [callback]
	 * @returns {HTMLElement[]}
	 */
	assignmentLinkElements(ID, job, passage, callback) {
		/** @type {App.Entity.SlaveState} */
		const slave = slaveStateById(ID);
		const jobs = job === undefined ? this._jobs : {job: this._jobs[job]};

		let res = [];
		for (const jn in jobs) {
			const j = jobs[jn];
			let rejects = j.canEmploy(slave);
			if (rejects.length === 0) {
				res.push(j.assignmentLinkElement(ID, passage, callback));
			} else {
				res.push(App.UI.DOM.disabledLink(j.desc.position, rejects));
			}
		}
		return res;
	}

	/**
	 * Returns link text for the facility transfer
	 * @param {number} ID slave ID
	 * @param {string} [job] transfer to this job (uses default job if this is undefined)
	 * @param {string} [passage]
	 * @param {assignmentCallback} [callback]
	 * @returns {HTMLElement}
	 */
	transferLinkElement(ID, job, passage, callback) {
		job = job || this.desc.defaultJob;
		return this._jobs[job].assignmentLinkElement(ID, passage, callback, this.genericName);
	}

	/**
	 * all slaves that are employed at this job
	 * @returns {App.Entity.SlaveState[]}
	 */
	employees() {
		const jobArray = this.jobs;
		if (jobArray.length === 1) {
			return jobArray[0].employees();
		}
		return [].concat(...jobArray.map(j => j.employees()));
	}

	/**
	 * IDs for all slaves that are employed at this facility (excluding the manager)
	 * @returns {Set<number>}
	 */
	employeesIDs() {
		const jobArray = this.jobs;
		if (jobArray.length === 1) {
			return jobArray[0].employeesIDs();
		}
		const res = new Set();
		for (const j of jobArray) {
			const ids = j.employeesIDs();
			for (const id of ids) {
				res.add(id);
			}
		}
		return res;
	}

	/**
	 * @param {boolean} long
	 * @returns {string}
	 */
	occupancyReport(long) {
		if (this.jobs.length === 0) {
			return this.manager && this.manager.currentEmployee ? this.manager.positionAbbreviation : "";
		}
		const nonEmployees = this.nonEmployeeOccupantsCount;
		const managerStr = this.manager && this.manager.currentEmployee ? (
			long ? `, ${this.manager.desc.position}` : `, ${this.manager.positionAbbreviation}`) : "";
		const slavesStr = long ? ` ${this.job().desc.position}${this.capacity !== 1 ? 's' : ''}` : "";
		return `${num(this.hostedSlaves())}${nonEmployees ? `+${num(nonEmployees)}` : ""}/${num(this.capacity)}${slavesStr}${managerStr}`;
	}

	/**
	 * @protected
	 * @param {string} jobName
	 * @returns {App.Entity.Facilities.Job}
	 */
	_createJob(jobName) { /* eslint-disable-line no-unused-vars*/
		return new App.Entity.Facilities.Job();
	}
};

/**
 * Job for a facility with a single job option
 */
App.Entity.Facilities.FacilitySingleJob = class extends App.Entity.Facilities.Job {
	/**
	 * @param {number} ID slave ID
	 * @param {string} [targetPassage] passage to go to
	 * @param {assignmentCallback} [callback]
	 * @param {string} [linkText]
	 * @returns {HTMLAnchorElement}
	 */
	assignmentLinkElement(ID, targetPassage, callback, linkText) {
		linkText = linkText || this.desc.position;
		return App.UI.DOM.assignmentLink(slaveStateById(ID), this.desc.assignment, "",
			(slave, assignment) => {
				if (callback) {
					callback(slave, assignment);
				}
				assignmentTransition(slave, assignment, targetPassage || passage());
			}, linkText);
	}
};

App.Entity.Facilities.SingleJobFacility = class extends App.Entity.Facilities.Facility {
	/**
	 * @param {FC.Data.FacilityDesc} desc defines state variable for this facility
	 * @param {{[key: string]: App.Entity.Facilities.Job}} [jobs] job object that are not default
	 * @param {App.Entity.Facilities.ManagingJob} [manager]
	 */
	constructor(desc, jobs, manager) {
		super(desc, jobs, manager);
		if (this.jobs.length !== 1) {
			throw Error(`SingleJobFacility accepts only a single job, but ${this.jobs.length} were provided`);
		}
		this._job = this.job(); // cache the only job
	}

	/**
	 * @override
	 * @protected
	 * @returns {App.Entity.Facilities.FacilitySingleJob}
	 */
	_createJob() {
		return new App.Entity.Facilities.FacilitySingleJob();
	}

	get facilityJob() {
		return this._job;
	}
};

/** Instances of all facility objects */
App.Entity.facilities = {};
