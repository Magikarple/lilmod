/** @type {FC.FacilityFramework} */
App.Data.Facilities.penthouse = {
	baseName: "penthouse",
	genericName: "Penthouse",
	jobs: {
		rest: {
			position: "Rest",
			assignment: Job.REST,
			publicSexUse: false,
			fuckdollAccepted: true
		},
		chooseOwn: {
			position: "Choose own",
			assignment: Job.CHOICE,
			publicSexUse: false,
			fuckdollAccepted: false
		},
		fucktoy: {
			position: "Fucktoy",
			assignment: Job.FUCKTOY,
			publicSexUse: false,
			fuckdollAccepted: true
		},
		classes: {
			position: "Classes",
			assignment: Job.CLASSES,
			publicSexUse: false,
			fuckdollAccepted: false
		},
		houseServant: {
			position: "House Servant",
			assignment: Job.HOUSE,
			publicSexUse: false,
			fuckdollAccepted: false
		},
		whore: {
			position: "Whore",
			assignment: Job.WHORE,
			publicSexUse: true,
			fuckdollAccepted: false
		},
		publicServant: {
			position: "Public Servant",
			assignment: Job.PUBLIC,
			publicSexUse: true,
			fuckdollAccepted: false
		},
		subordinateSlave: {
			position: "Subordinate slave",
			assignment: Job.SUBORDINATE,
			publicSexUse: false,
			fuckdollAccepted: false
		},
		cow: {
			position: "Milked",
			assignment: Job.MILKED,
			publicSexUse: false,
			fuckdollAccepted: false
		},
		gloryhole: {
			position: "Gloryhole",
			assignment: Job.GLORYHOLE,
			publicSexUse: false,
			fuckdollAccepted: true
		},
		confinement: {
			position: "Confinement",
			assignment: Job.CONFINEMENT,
			publicSexUse: false,
			fuckdollAccepted: true
		}
	},
	defaultJob: "rest",
	manager: {
		position: "Recruiter",
		assignment: Job.RECRUITER,
		careers: App.Data.Careers.Leader.recruiter,
		skill: "recruiter",
		publicSexUse: false,
		fuckdollAccepted: false,
		broodmotherAccepted: false,
		shouldWalk: true,
		shouldHold: false,
		shouldSee: true,
		shouldHear: true,
		shouldTalk: true,
		shouldThink: true,
		requiredDevotion: 51
	},
	decorated: false
};

App.Entity.Facilities.PenthouseJobs = {
	Classes: class extends App.Entity.Facilities.Job {
		checkRequirements(slave) {
			let r = super.checkRequirements(slave);
			if (slave.intelligenceImplant >= 15) {
				r.push(`${slave.slaveName} already has a basic education.`);
			}
			if (!App.Entity.Facilities.Job._isBrokenEnough(slave, -20, -50, -20, -51)) {
				r.push(`${slave.slaveName} is too resistant to learn.`);
			}

			if (slave.fetish === Fetish.MINDBROKEN) {
				r.push(`${slave.slaveName}'s mind is fundamentally broken and can't learn.`);
			}
			return r;
		}
	},
	HouseServant: class extends App.Entity.Facilities.Job {
		checkRequirements(slave) {
			let r = super.checkRequirements(slave);

			if (!App.Entity.Facilities.Job._isBrokenEnough(slave, -20, -50, -19, -51)) {
				r.push(App.Entity.Facilities.Job._stdBreakageMessage(slave));
			}

			if (!canWalk(slave)) {
				r.push(`${slave.slaveName} can't walk and would be unable to properly clean.`);
			} else if (!canHold(slave)) {
				r.push(`${slave.slaveName} has no hands and would be unable to properly clean.`);
			}
			if (!canSee(slave)) {
				r.push(`${slave.slaveName} is blind and would be unable to properly clean.`);
			}

			return r;
		}
	},

	SubordinateSlave: class extends App.Entity.Facilities.Job {
		checkRequirements(slave) {
			let r = super.checkRequirements(slave);
			if (!App.Entity.Facilities.Job._isBrokenEnough(slave, -20, -50, -19, -51)) {
				r.push(App.Entity.Facilities.Job._stdBreakageMessage(slave));
			}
			return r;
		}

		assignmentLinkElement(ID, passage, callback, linkText) {
			linkText = linkText || this.desc.position;
			return App.UI.DOM.assignmentLink(slaveStateById(ID), this.desc.assignment, "Subordinate Targeting",
				(slave, assignment) => {
					if (callback) {
						callback(slave, assignment);
					}
					V.AS = ID;
					V.returnTo = passage;
				}, linkText);
		}
	},
	Cow: class extends App.Entity.Facilities.Job {
		checkRequirements(slave) {
			let r = super.checkRequirements(slave);
			if ((slave.lactation <= 0) && (slave.balls <= 0)) {
				r.push(`${slave.slaveName} is not lactating` + ((V.seeDicks > 0) ? ' or producing semen.' : '.'));
			}
			return r;
		}
	},
};

App.Entity.Facilities.Penthouse = class extends App.Entity.Facilities.Facility {
	constructor() {
		super(App.Data.Facilities.penthouse, {
			classes: new App.Entity.Facilities.PenthouseJobs.Classes(),
			houseServant: new App.Entity.Facilities.PenthouseJobs.HouseServant(),
			subordinateSlave: new App.Entity.Facilities.PenthouseJobs.SubordinateSlave(),
			cow: new App.Entity.Facilities.PenthouseJobs.Cow(),
		});
	}

	/** Facility slave capacity
	 * Note that slaves in a relationship may share luxury rooms, so actual capacity is slightly larger (@see penthouseCensus)
	 * @override
	 * @returns {number} */
	get capacity() {
		return V.dormitory + V.rooms;
	}

	/** Penthouse can be overcrowded, so it always has free space
	 * @override
	 * @returns {boolean} */
	get hasFreeSpace() {
		return true;
	}

	/** Not meaningful */
	occupancyReport() {
		return "";
	}
};

App.Entity.facilities.penthouse = new App.Entity.Facilities.Penthouse();
