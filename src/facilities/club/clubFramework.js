/** @type {FC.FacilityFramework} */
App.Data.Facilities.club = {
	baseName: "club",
	genericName: null,
	jobs: {
		slut: {
			position: "slut",
			assignment: Job.CLUB,
			publicSexUse: true,
			fuckdollAccepted: false
		},
	},
	defaultJob: "slut",
	manager: {
		position: "DJ",
		assignment: Job.DJ,
		careers: App.Data.Careers.Leader.DJ,
		skill: "DJ",
		publicSexUse: false,
		fuckdollAccepted: false,
		broodmotherAccepted: false,
		shouldWalk: true,
		shouldHold: false,
		shouldSee: false,
		shouldHear: true,
		shouldTalk: true,
		shouldThink: true,
		requiredDevotion: 51
	},
	decorated: true
};

App.Entity.Facilities.ClubSlutJob = class extends App.Entity.Facilities.FacilitySingleJob {
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string[]}
	 */
	checkRequirements(slave) {
		let r = super.checkRequirements(slave);

		// condition is the same as for the brothel
		// TODO: consider moving this to App.Entity.Facilities.SexJob
		if (!App.Entity.Facilities.Job._isBrokenEnough(slave, 51, -50, -20, -50, 50)) {
			r.push(App.Entity.Facilities.Job._stdBreakageMessage(slave));
		}

		return r;
	}
};

App.Entity.Facilities.ClubDJJob = class extends App.Entity.Facilities.ManagingJob {
	checkRequirements(slave) {
		let r = super.checkRequirements(slave);
		if (slave.intelligence + slave.intelligenceImplant < -50) {
			r.push(`${slave.slaveName} is not intelligent enough to DJ.`);
		}
		return r;
	}
};

App.Entity.facilities.club = new App.Entity.Facilities.SingleJobFacility(
	App.Data.Facilities.club,
	{
		slut: new App.Entity.Facilities.ClubSlutJob()
	},
	new App.Entity.Facilities.ClubDJJob()
);
