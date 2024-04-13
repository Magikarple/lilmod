/** @type {FC.FacilityFramework} */
App.Data.Facilities.pit = {
	baseName: "pit",
	genericName: "Arena",
	jobs: {
		trainee: {
			position: "trainee",
			assignment: Job.ARENA, /* pseudo-assignment for assignmentTransition/assignJob/removeJob */
			publicSexUse: false,
			fuckdollAccepted: false,
			partTime: true
		},
		fighter: {
			position: "fighter",
			assignment: Job.PIT, /* pseudo-assignment for assignmentTransition/assignJob/removeJob */
			publicSexUse: false,
			fuckdollAccepted: false,
			partTime: true
		}
	},
	defaultJob: "fighter",
	manager: null,
	decorated: true,
};

App.Entity.Facilities.PitFighterJob = class extends App.Entity.Facilities.FacilitySingleJob {
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string[]}
	 */
	checkRequirements(slave) {
		let r = super.checkRequirements(slave);
		if (slave.breedingMark === 1 && V.propOutcome === 1 && V.eugenicsFullControl !== 1 && FutureSocieties.isActive('FSRestart')) {
			r.push(`${slave.slaveName} may not participate in combat.`);
		}
		if (slave.indentureRestrictions > 1) {
			r.push(`${slave.slaveName}'s indenture forbids fighting.`);
		}
		if ((slave.indentureRestrictions > 0) && (this.facility.option("lethal"))) {
			r.push(`${slave.slaveName}'s indenture forbids lethal fights.`);
		}
		if (!canWalk(slave)) {
			r.push(`${slave.slaveName} cannot walk independently.`);
		}
		if (!canHold(slave)) {
			r.push(`${slave.slaveName} is unable to strike their opponent.`);
		}
		return r;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string[]}
	 */
	canEmploy(slave) {
		if (this.isEmployed(slave)) {
			return [`${slave.slaveName} is already assigned to fight in ${this.facility.name}.`];
		}
		return this.checkRequirements(slave);
	}
};

/**
 * The requirements are harsher than for the fighter job, as you can't learn combat if you can't fight in the first
 * place. That's why we inherit PitFighterJob to keep the base requirements in sync.
 */
App.Entity.Facilities.ArenaTraineeJob = class extends App.Entity.Facilities.PitFighterJob {
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string[]}
	 */
	checkRequirements(slave) {
		let r = super.checkRequirements(slave);
		if (!App.Entity.Facilities.Job._isBrokenEnough(slave, -20, -50, -20, -51)) {
			r.push(`${slave.slaveName} is too resistant to be trusted with weapons.`);
		}
		if (slave.skill.combat >= 100) {
			r.push(`${slave.slaveName} has nothing left to learn.`);
		}
		return r;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string[]}
	 */
	canEmploy(slave) {
		if (this.isEmployed(slave)) {
			return [`${slave.slaveName} is already assigned to train in ${this.facility.name}.`];
		}
		if ([Job.AGENT, Job.AGENTPARTNER].includes(slave.assignment)) {
			return [`${slave.slaveName} has a job outside your arcology.`];
		}
		return this.checkRequirements(slave);
	}
};

App.Entity.Facilities.Pit = class extends App.Entity.Facilities.Facility {
	constructor() {
		super(App.Data.Facilities.pit,
			{
				trainee: new App.Entity.Facilities.ArenaTraineeJob(),
				fighter: new App.Entity.Facilities.PitFighterJob(),
			});
	}

	get capacity() {
		return V.pit ? Number.MAX_VALUE : null;
	}

	/** @override */
	occupancyReport(long) {
		if (long) {
			return `${this.hostedSlaves("trainee")} ${this.job("trainee").desc.position}s and ${this.hostedSlaves("fighter")} ${this.job("fighter").desc.position}s`;
		}
		return `T:${this.hostedSlaves("trainee")}+F:${this.hostedSlaves("fighter")}`;
	}
};

App.Entity.facilities.pit = new App.Entity.Facilities.Pit();
