// cSpell:ignore confinee

/** @type {FC.FacilityFramework} */
App.Data.Facilities.cellblock = {
	baseName: "cellblock",
	genericName: null,
	jobs: {
		assignee: {
			position: "confinee",
			assignment: Job.CELLBLOCK,
			publicSexUse: false,
			fuckdollAccepted: false
		},
	},
	defaultJob: "assignee",
	manager: {
		position: "wardeness",
		assignment: Job.WARDEN,
		careers: App.Data.Careers.Leader.wardeness,
		skill: "wardeness",
		publicSexUse: false,
		fuckdollAccepted: false,
		broodmotherAccepted: false,
		shouldWalk: true,
		shouldHold: true,
		shouldSee: true,
		shouldHear: true,
		shouldTalk: false,
		shouldThink: false,
		requiredDevotion: 51
	},
	decorated: true
};

App.Entity.Facilities.CellblockJob = class extends App.Entity.Facilities.FacilitySingleJob {
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string[]}
	 */
	checkRequirements(slave) {
		let r = super.checkRequirements(slave);

		if (slave.trust < -50) {
			r.push(`${slave.slaveName} is too terrified for ${this.facility.name} to have an effect.`);
		} else if ((slave.devotion >= -20 || slave.trust < -20) && (slave.devotion >= -50 || slave.trust < -50)) {
			r.push(`${slave.slaveName} is not defiant enough for ${this.facility.name} to have an effect.`);
		}

		return r;
	}
};

App.Entity.facilities.cellblock = new App.Entity.Facilities.SingleJobFacility(
	App.Data.Facilities.cellblock,
	{
		assignee: new App.Entity.Facilities.CellblockJob()
	}
);
