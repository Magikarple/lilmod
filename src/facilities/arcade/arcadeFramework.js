/** @type {FC.FacilityFramework} */
App.Data.Facilities.arcade = {
	baseName: "arcade",
	genericName: null,
	jobs: {
		assignee: {
			position: "inmate",
			assignment: Job.ARCADE,
			publicSexUse: true,
			fuckdollAccepted: true
		},
	},
	defaultJob: "assignee",
	manager: null,
	decorated: true
};

App.Entity.Facilities.ArcadeJob = class extends App.Entity.Facilities.FacilitySingleJob {
	/**
	 * Can slave be employed at this position
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string[]}
	 */
	checkRequirements(slave) {
		let r = super.checkRequirements(slave);
		if (slave.indentureRestrictions > 0) {
			r.push(`${slave.slaveName}'s indenture forbids arcade service.`);
		}
		return r;
	}
};

App.Entity.facilities.arcade = new App.Entity.Facilities.SingleJobFacility(
	App.Data.Facilities.arcade,
	{
		assignee: new App.Entity.Facilities.ArcadeJob()
	}
);
