/** @type {FC.FacilityFramework} */
App.Data.Facilities.headGirlSuite = {
	baseName: "HGSuite",
	genericName: null,
	jobs: {
		HGToy: {
			position: "Head Girl's toy",
			assignment: Job.HEADGIRLSUITE,
			publicSexUse: true,
			fuckdollAccepted: false
		}
	},
	defaultJob: "HGToy",
	manager: {
		position: "Head Girl",
		assignment: Job.HEADGIRL,
		careers: App.Data.Careers.Leader.HG,
		skill: "headGirl",
		publicSexUse: false,
		fuckdollAccepted: false,
		broodmotherAccepted: false,
		shouldWalk: true,
		shouldHold: true,
		shouldSee: true,
		shouldHear: true,
		shouldTalk: true,
		shouldThink: true,
		requiredDevotion: 51
	},
	decorated: false
};

App.Entity.Facilities.HeadGirlSuite = class extends App.Entity.Facilities.SingleJobFacility {
	constructor() {
		super(App.Data.Facilities.headGirlSuite);
	}

	/** @override */
	occupancyReport(long) {
		return this.manager.currentEmployee
			? `HG${this.hostedSlaves() ? long
				? ` and ${getPronouns(this.manager.currentEmployee).his} slave`
				: ", 1" : ""}`
			: "";
	}
};

App.Entity.facilities.headGirlSuite = new App.Entity.Facilities.HeadGirlSuite();
