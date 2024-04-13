/** @type {FC.FacilityFramework} */
App.Data.Facilities.farmyard = {
	baseName: "farmyard",
	genericName: null,
	jobs: {
		farmhand: {
			position: "farmhand",
			assignment: Job.FARMYARD,
			publicSexUse: false,
			fuckdollAccepted: false
		}
	},
	defaultJob: "farmhand",
	manager: {
		position: "farmer",
		assignment: Job.FARMER,
		careers: App.Data.Careers.Leader.farmer,
		skill: "farmer",
		publicSexUse: false,
		fuckdollAccepted: false,
		broodmotherAccepted: false,
		shouldWalk: true,
		shouldHold: true,
		shouldSee: true,
		shouldHear: true,
		shouldTalk: false,
		shouldThink: true,
		requiredDevotion: 51
	},
	decorated: true
};

App.Entity.Facilities.FarmHandJob = class extends App.Entity.Facilities.FacilitySingleJob {
	/**
	 * @override
	 */
	get assignment() {
		return `work in ${this.facility.name}`;
	}
};

App.Entity.facilities.farmyard = new App.Entity.Facilities.SingleJobFacility(
	App.Data.Facilities.farmyard, {
		farmhand: new App.Entity.Facilities.FarmHandJob()
	}
);
