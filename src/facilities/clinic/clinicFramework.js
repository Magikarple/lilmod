/** @type {FC.FacilityFramework} */
App.Data.Facilities.clinic = {
	baseName: "clinic",
	genericName: null,
	jobs: {
		patient: {
			position: "patient",
			assignment: Job.CLINIC,
			publicSexUse: false,
			fuckdollAccepted: false
		}
	},
	defaultJob: "patient",
	manager: {
		position: "nurse",
		assignment: Job.NURSE,
		careers: App.Data.Careers.Leader.nurse,
		skill: "nurse",
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

App.Entity.Facilities.ClinicPatientJob = class extends App.Entity.Facilities.FacilitySingleJob {
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string[]}
	 */
	checkRequirements(slave) {
		let r = super.checkRequirements(slave);

		if ((slave.health.illness === 0 && slave.health.shortDamage < 20 && slave.health.condition >= 40) &&
			(!S.Nurse || ((slave.chem <= 15 || this.facility.upgrade("Filters") !== 1) &&
				(V.bellyImplants !== 1 || slave.bellyImplant <= -1) &&
				(slave.pregKnown !== 1 || (this.facility.option("SpeedGestation") <= 0 && slave.pregControl !== "speed up")) &&
				(this.facility.option("ObservePregnancy") !== 1 || slave.pregAdaptation * 1000 >= slave.bellyPreg && slave.preg <= slave.pregData.normalBirth / 1.33)))) {
			r.push(`${slave.slaveName} cannot benefit from ${this.facility.name}.`);
		}

		return r;
	}
};

App.Entity.facilities.clinic = new App.Entity.Facilities.SingleJobFacility(
	App.Data.Facilities.clinic,
	{
		patient: new App.Entity.Facilities.ClinicPatientJob()
	}
);
