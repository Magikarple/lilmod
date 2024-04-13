/** @type {FC.FacilityFramework} */
App.Data.Facilities.masterSuite = {
	baseName: "masterSuite",
	genericName: "Master Suite",
	jobs: {
		fucktoy: {
			position: "fucktoy",
			assignment: Job.MASTERSUITE,
			publicSexUse: false,
			fuckdollAccepted: false
		}
	},
	defaultJob: "fucktoy",
	manager: {
		position: "concubine",
		positionAbbreviation: "C",
		assignment: Job.CONCUBINE,
		careers: [],
		skill: null,
		publicSexUse: false,
		fuckdollAccepted: false,
		broodmotherAccepted: true,
		shouldWalk: false,
		shouldHold: false,
		shouldSee: false,
		shouldHear: false,
		shouldTalk: false,
		shouldThink: false,
		requiredDevotion: 51
	},
	decorated: true
};

App.Entity.Facilities.MasterSuiteFuckToyJob = class extends App.Entity.Facilities.FacilitySingleJob {
	/**
	 * @override
	 * @returns {string}
	 * */
	get assignment() {
		return this.facility.name;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string[]}
	 */
	checkRequirements(slave) {
		let r = super.checkRequirements(slave);
		if (!App.Entity.Facilities.Job._isBrokenEnough(slave, 20, -51, -21, -50)) {
			r.push(`${slave.slaveName} is not sufficiently broken for ${this.facility.name}.`);
		}

		return r;
	}
};

App.Entity.Facilities.ConcubineJob = class extends App.Entity.Facilities.ManagingJob {
	checkRequirements(slave) {
		let r = super.checkRequirements(slave);
		if (isAmputee(slave)) {
			r.push(`${slave.slaveName} can't serve as your Concubine without limbs.`);
		}
		return r;
	}
};

App.Entity.facilities.masterSuite = new App.Entity.Facilities.SingleJobFacility(
	App.Data.Facilities.masterSuite,
	{
		fucktoy: new App.Entity.Facilities.MasterSuiteFuckToyJob()
	},
	new App.Entity.Facilities.ConcubineJob()
);
