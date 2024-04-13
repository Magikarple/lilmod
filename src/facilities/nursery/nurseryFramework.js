/** @type {FC.FacilityFramework} */
App.Data.Facilities.nursery = {
	baseName: "nursery",
	genericName: null,
	jobs: {
		nanny: {
			position: "nanny",
			assignment: Job.NURSERY,
			publicSexUse: false,
			fuckdollAccepted: false
		}
	},
	defaultJob: "nanny",
	manager: {
		position: "matron",
		assignment: Job.MATRON,
		careers: App.Data.Careers.Leader.matron,
		skill: "matron",
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
	decorated: true
};

App.Entity.Facilities.NurseryNannyJob = class extends App.Entity.Facilities.FacilitySingleJob {
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string[]}
	 */
	checkRequirements(slave) {
		let r = super.checkRequirements(slave);

		if (!App.Entity.Facilities.Job._isBrokenEnough(slave, 51, 21, -20, -95)) {
			r.push(App.Entity.Facilities.Job._stdBreakageMessage(slave));
		}

		return r;
	}

	/**
	 * @override
	 */
	get assignment() {
		return `work in ${this.facility.name}`;
	}
};

App.Entity.Facilities.Nursery = class extends App.Entity.Facilities.SingleJobFacility {
	constructor() {
		super(App.Data.Facilities.nursery,
			{
				nanny: new App.Entity.Facilities.NurseryNannyJob()
			});
	}

	// get capacity() {
	// 	return State.Variables.nurseryNannies;
	// }

	/** @override */
	occupancyReport(long) {
		return long
			? `${V.nurseryChildren}/${V.nurseryCribs} babies, ${this.hostedSlaves()}/${V.nursery} nannies${this.manager.currentEmployee ? `, ${this.manager.desc.position}` : ""}`
			: `${V.nurseryChildren}/${V.nurseryCribs}, ${this.hostedSlaves()}/${V.nursery}${this.manager.currentEmployee ? ", L" : ""}`;
	}
};

App.Entity.facilities.nursery = new App.Entity.Facilities.Nursery();
