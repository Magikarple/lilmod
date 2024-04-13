/** @type {FC.FacilityFramework} */
App.Data.Facilities.spa = {
	baseName: "spa",
	genericName: null,
	jobs: {
		assignee: {
			position: "bather",
			assignment: Job.SPA,
			publicSexUse: false,
			fuckdollAccepted: false
		}
	},
	defaultJob: "assignee",
	manager: {
		position: "attendant",
		assignment: Job.ATTENDANT,
		careers: App.Data.Careers.Leader.attendant,
		skill: "attendant",
		publicSexUse: false,
		fuckdollAccepted: false,
		broodmotherAccepted: false,
		shouldWalk: true,
		shouldHold: true,
		shouldSee: false,
		shouldHear: true,
		shouldTalk: false,
		shouldThink: true,
		requiredDevotion: 51
	},
	decorated: true
};

App.Entity.Facilities.SpaAssigneeJob = class extends App.Entity.Facilities.FacilitySingleJob {
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string[]}
	 */
	checkRequirements(slave) {
		let r = super.checkRequirements(slave);

		if (
			slave.fetish !== Fetish.MINDBROKEN &&
			(
				slave.devotion < -20 ||
				(
					slave.health.tired <= 30 &&
					slave.trust > 60 &&
					slave.devotion > 60 &&
					slave.sexualFlaw === "none" &&
					slave.behavioralFlaw === "none"
				)
			)
		) {
			if (slave.devotion < -20) {
				r.push(`${slave.slaveName} is too resistant to be trusted at ${this.facility.name}.`);
			} else {
				r.push(`${slave.slaveName} will not benefit from time at ${this.facility.name}.`);
			}
		}

		return r;
	}
};

App.Entity.facilities.spa = new App.Entity.Facilities.SingleJobFacility(
	App.Data.Facilities.spa,
	{
		assignee: new App.Entity.Facilities.SpaAssigneeJob()
	}
);
