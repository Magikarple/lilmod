/** @type {FC.FacilityFramework} */
App.Data.Facilities.incubator = {
	baseName: "incubator",
	genericName: null,
	jobs: {
		tank: {
			position: "tank",
			assignment: Job.TANK,
			publicSexUse: false,
			fuckdollAccepted: false
		}
	},
	defaultJob: "tank",
	manager: null,
	decorated: false
};

App.Entity.Facilities.IncubatorTankJob = class extends App.Entity.Facilities.Job {
	/**
	 * @override
	 * @returns {App.Entity.SlaveState[]}
	 */
	employees() {
		return V.incubator.tanks;
	}

	/** @override */
	employeesIDs() {
		return new Set(this.employees().map(s => s.ID));
	}
};

App.Entity.Facilities.Incubator = class extends App.Entity.Facilities.Facility {
	constructor() {
		super(App.Data.Facilities.incubator, {
			tank: new App.Entity.Facilities.IncubatorTankJob()
		});
	}
};

App.Entity.facilities.incubator = new App.Entity.Facilities.Incubator();
