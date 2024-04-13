/** @type {FC.FacilityFramework} */
App.Data.Facilities.schoolroom = {
	baseName: "schoolroom",
	genericName: null,
	jobs: {
		student: {
			position: "student",
			assignment: Job.SCHOOL,
			publicSexUse: false,
			fuckdollAccepted: false
		}
	},
	defaultJob: "student",
	manager: {
		position: "schoolteacher",
		assignment: Job.TEACHER,
		careers: App.Data.Careers.Leader.schoolteacher,
		skill: "teacher",
		publicSexUse: false,
		fuckdollAccepted: false,
		broodmotherAccepted: false,
		shouldWalk: false,
		shouldHold: false,
		shouldSee: true,
		shouldHear: true,
		shouldTalk: true,
		shouldThink: true,
		requiredDevotion: 51
	},
	decorated: true
};

App.Entity.Facilities.SchoolroomStudentJob = class extends App.Entity.Facilities.FacilitySingleJob {
	/**
	 * @override
	 * @returns {string}
	 */
	get assignment() {
		return `study in ${this.facility.name}`;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string[]}
	 */
	checkRequirements(slave) {
		let r = super.checkRequirements(slave);

		if (!App.Entity.Facilities.Job._isBrokenEnough(slave, -20, -50, -20, -51)) {
			r.push(`${slave.slaveName} is too resistant to learn.`);
		}

		const maxSkill = 10 + this.facility.upgrade("Skills") * 20; // maximal skill value the school can teach
		if (((slave.intelligenceImplant >= 30 && V.schoolroomRemodelBimbo !== 1) || (slave.intelligenceImplant <= -15 && V.schoolroomRemodelBimbo === 1)) &&
			(slave.voice === 0 || slave.accent + this.facility.upgrade("Language") <= 2) &&
			(slave.skill.oral > maxSkill) && (slave.skill.whoring > maxSkill) && (slave.skill.entertainment > maxSkill) &&
			(slave.skill.anal > maxSkill) && ((slave.vagina < 0) || (slave.skill.vaginal > maxSkill)) &&
			((penetrativeSocialUse() < 40) || (slave.skill.penetrative > maxSkill)) &&
			(!needsTutoring(slave))) {
			r.push(`${slave.slaveName} has nothing left to learn.`);
		}

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${slave.slaveName}'s mind is fundamentally broken and can't learn`);
		}

		return r;
	}
};

App.Entity.Facilities.Schoolroom = class extends App.Entity.Facilities.SingleJobFacility {
	constructor() {
		super(App.Data.Facilities.schoolroom, {
			student: new App.Entity.Facilities.SchoolroomStudentJob()
		});
	}

	/** Does the schoolroom decoration impart a language-learning bonus?
	 * @returns {boolean}
	 */
	revivalistLanguageDecorationBonus() {
		const decoFS = Object.keys(App.Data.FutureSociety.records).find(FS => App.Data.FutureSociety.records[FS].deco === V.schoolroomDecoration);
		return decoFS && App.Data.FutureSociety.records[decoFS].language === V.language;
	}
};

App.Entity.facilities.schoolroom = new App.Entity.Facilities.Schoolroom();
