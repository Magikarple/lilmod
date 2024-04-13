/** @type {FC.FacilityFramework} */
App.Data.Facilities.brothel = {
	baseName: "brothel",
	genericName: null,
	jobs: {
		assignee: {
			position: "whore",
			assignment: Job.BROTHEL,
			publicSexUse: true,
			fuckdollAccepted: false
		},
	},
	defaultJob: "assignee",
	manager: {
		position: "madam",
		assignment: Job.MADAM,
		careers: App.Data.Careers.Leader.madam,
		skill: "madam",
		publicSexUse: true,
		fuckdollAccepted: false,
		broodmotherAccepted: false,
		shouldWalk: true,
		shouldHold: true,
		shouldSee: true,
		shouldHear: true,
		shouldTalk: true,
		shouldThink: true,
		requiredDevotion: 50
	},
	decorated: true
};

App.Entity.Facilities.BrothelJob = class extends App.Entity.Facilities.FacilitySingleJob {
	/**
	 * @override
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string[]}
	 */
	checkRequirements(slave) {
		let r = super.checkRequirements(slave);

		// condition is the same as for the club
		if (!App.Entity.Facilities.Job._isBrokenEnough(slave, 51, -50, -20, -50, 50)) {
			r.push(App.Entity.Facilities.Job._stdBreakageMessage(slave));
		}
		return r;
	}
};

App.Entity.Facilities.MadamJob = class extends App.Entity.Facilities.ManagingJob {
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string[]}
	 */
	checkRequirements(slave) {
		let r = super.checkRequirements(slave);
		if (slave.intelligence + slave.intelligenceImplant < -50) {
			r.push(`${slave.slaveName} is not intelligent enough to be the Madam.`);
		}
		return r;
	}
};

App.Entity.facilities.brothel = new App.Entity.Facilities.SingleJobFacility(
	App.Data.Facilities.brothel,
	{
		assignee: new App.Entity.Facilities.BrothelJob()
	},
	new App.Entity.Facilities.MadamJob()
);
