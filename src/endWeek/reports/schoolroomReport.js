/**
 * @returns {FC.EndWeek.FacilityReport}
 */
App.EndWeek.schoolroomReport = function() {
	const beforeFrag = new DocumentFragment();

	const slaves = App.Utils.sortedEmployees(App.Entity.facilities.schoolroom);
	const devBonus = (V.schoolroomDecoration !== "standard") ? 1 : 0;
	App.EndWeek.saVars.flSex = App.EndWeek.getFLSex(App.Entity.facilities.schoolroom);

	function schoolteacherText() {
		const frag = new DocumentFragment();

		let r = [];
		let FLsFetish = 0;
		let idleBonus = 0;

		if (S.Schoolteacher) {
			if (S.Schoolteacher.health.condition < -80) {
				improveCondition(S.Schoolteacher, 20);
			} else if (S.Schoolteacher.health.condition < -40) {
				improveCondition(S.Schoolteacher, 15);
			} else if (S.Schoolteacher.health.condition < 0) {
				improveCondition(S.Schoolteacher, 10);
			} else if (S.Schoolteacher.health.condition < 90) {
				improveCondition(S.Schoolteacher, 7);
			}
			if (S.Schoolteacher.devotion <= 60) {
				S.Schoolteacher.devotion++;
			}
			if (S.Schoolteacher.trust < -30) {
				S.Schoolteacher.trust++;
			}
			S.Schoolteacher.devotion += devBonus;
			if (S.Schoolteacher.rules.living !== "luxurious") {
				S.Schoolteacher.rules.living = "luxurious";
			}
			if (S.Schoolteacher.rules.rest !== "restrictive") {
				S.Schoolteacher.rules.rest = "restrictive";
			}
			if (S.Schoolteacher.fetishStrength <= 95) {
				if (S.Schoolteacher.fetish !== Fetish.DOM) {
					if (fetishChangeChance(S.Schoolteacher) > jsRandom(0, 100)) {
						FLsFetish = 1;
						S.Schoolteacher.fetishKnown = 1;
						S.Schoolteacher.fetish = Fetish.DOM;
						S.Schoolteacher.fetishStrength = 10;
					}
				} else if (S.Schoolteacher.fetishKnown === 0) {
					FLsFetish = 1;
					S.Schoolteacher.fetishKnown = 1;
				} else {
					FLsFetish = 2;
					S.Schoolteacher.fetishStrength += 4;
				}
			}

			const {He, he, His, his, him, himself, wife} = getPronouns(S.Schoolteacher);
			if (S.Schoolteacher.relationship === -3 && S.Schoolteacher.devotion > 50) {
				r.push(`As your loving ${wife}, ${he} tries ${his} best to teach ${his} pupils how to please you.`);
			}
			if (FLsFetish === 1) {
				r.push(`${He}'s allowed and even expected to use ${his} students for ${his} own sexual gratification, and in their own way ${his} students are complicit, offering sexual favors for an easier time in the classroom. Before long, ${he}'s running a hungry eye over the tits and asses of new trainees; ${he} is now <span class="lightcoral">more dominant.</span>`);
			} else if (FLsFetish === 2) {
				r.push(`Every new student in class is a new target for ${his} personal educational attention. <span class="lightsalmon">${He} becomes more dominant.</span>`);
			}
			if (App.Data.Careers.Leader.schoolteacher.includes(S.Schoolteacher.career)) {
				r.push(`${He} has experience with students and learning from ${his} life before ${he} was a slave, making ${him} more effective.`);
				idleBonus++;
			} else if (S.Schoolteacher.skill.teacher >= Constant.MASTERED_XP) {
				r.push(`${He} has experience with students and learning from working for you, making ${him} more effective.`);
				idleBonus++;
			} else {
				const skillIncrease = jsRandom(1, Math.ceil((S.Schoolteacher.intelligence + S.Schoolteacher.intelligenceImplant) / 15) + 8);
				r.push(slaveSkillIncrease('teacher', S.Schoolteacher, skillIncrease));
			}
			if (S.Schoolteacher.visualAge > 35) {
				r.push(`${His} age earns ${him} the respect of ${his} students.`);
				idleBonus++;
			}
			if (S.Schoolteacher.intelligence > 15) {
				r.push(`${He}'s intelligent enough to be a good teacher.`);
				idleBonus++;
			}
			if (S.Schoolteacher.intelligenceImplant >= 15) {
				r.push(`Since ${he}'s educated ${himself}, ${he} understands`);
				if (V.schoolroomRemodelBimbo !== 0) {
					r.push(`how best to apply the new lesson plan.`);
				} else {
					r.push(`${his} students.`);
				}
				idleBonus++;
			}
			if (S.Schoolteacher.face > 40) {
				r.push(`${His} students want to be just like their beautiful teacher.`);
				idleBonus++;
			}
			if (S.Schoolteacher.accent >= 2) { // really accent === 2, because accent > 2 can't teach anyway
				r.push(`${He}'s been tasked with teaching ${V.language}, but ${he}'s barely understandable ${himself}.`);
				r.push(`This <span class="warning">slows ${his} students' progress</span> with the language.`);
				if (S.Schoolteacher.devotion > 50) {
					r.push(`${He} wants to do better, and devotes any extra time ${he} can find to improving ${his} own competency in ${V.language}.`);
					idleBonus--;
					if (S.Schoolteacher.intelligence + S.Schoolteacher.intelligenceImplant > random(-110, 110)) { // similar chances to saTakeClasses.speechLessons
						r.push(`This week, ${he} makes a breakthrough, <span class="improvement">reducing ${his} accent</span> to a clear, pleasant, exoticism.`);
						S.Schoolteacher.accent--;
					}
				}
			}

			for (const slave of slaves) {
				const {he2} = getPronouns(slave).appendSuffix('2');
				if (S.Schoolteacher.rivalryTarget === slave.ID) {
					r.push(`Ever since ${his} ${rivalryTerm(S.Schoolteacher)} was enrolled, ${he} began stalking the classroom carrying a large paddle, much to ${slave.slaveName}'s terror.`);
					slave.devotion -= 4;
					slave.trust -= 4;
					if (jsRandom(1, 100) > 35) {
						S.Schoolteacher.rivalry++;
						slave.rivalry++;
					}
				} else if (S.Schoolteacher.relationshipTarget === slave.ID) {
					r.push(`${He} dedicates most of ${his} attention to ${his} ${relationshipTerm(S.Schoolteacher)}, ${slave.slaveName}, making sure ${he2} understands that day's lesson.`);
					slave.devotion += 2;
					slave.trust += 2;
				} else if (areRelated(S.Schoolteacher, slave)) {
					r.push(`${He} makes sure to spend extra time teaching ${his} ${relativeTerm(S.Schoolteacher, slave)}, ${slave.slaveName}.`);
					slave.trust++;
				}
			}
			const pMod = App.SlaveAssignment.PartTime.efficiencyModifier(S.Schoolteacher);
			idleBonus *= pMod;
			if (pMod < 1) {
				r.push(`Some part of ${his} day is taken up by ${his} part-time job, making ${him} less effective.`);
			}

			if (slaves.length < V.schoolroom && !slaveResting(S.Schoolteacher)) {
				const idlePay = Math.ceil(jsRandom(1, 10) + ((V.schoolroom - slaves.length) * (jsRandom(150, 170) + (idleBonus * 10))));
				cashX(idlePay, "school", S.Schoolteacher);
				r.push(`<div class="indent">Since ${he} doesn't have enough students to occupy all of ${his} time, ${V.schoolroomName} takes in citizens' slaves on a contract basis and ${he} teaches them too, earning <span class="yellowgreen">${cashFormat(idlePay)}.</span></div>`);
			}

			App.Events.addNode(frag, r);
		}

		return frag;
	}

	if (slaves.length > 0) {
		const intro = App.UI.DOM.appendNewElement("p", beforeFrag, '', ["indent"]);
		const r = [];
		if (slaves.length > 1) {
			r.push(`<strong>There are ${slaves.length} slaves studying in ${V.schoolroomName}.</strong>`);
		} else {
			r.push(`<strong>There is one slave studying in ${V.schoolroomName}.</strong>`);
		}
		App.Events.addNode(intro, r);
	}

	/** @type {Array<FC.EndWeek.SlaveReport>} */
	const slaveReports = [];

	if (S.Schoolteacher) {
		const slave = App.SlaveAssignment.reportSlave(S.Schoolteacher);
		tired(slave);
		/* apply following SA passages to facility leader */
		if (V.showEWD !== 0 || (V.favSeparateReport === 1 && V.favorites.includes(slave.ID))) {
			const schoolteacherEntry = App.UI.DOM.makeElement("div", '', ["slave-report"]);
			const artSpan = App.UI.DOM.appendNewElement("span", schoolteacherEntry);
			schoolteacherEntry.append(App.SlaveAssignment.saSlaveIntro(slave, `is serving as your Schoolteacher.`));
			App.Events.addNode(schoolteacherEntry, [schoolteacherText()], "div", ["indent"]);
			schoolteacherEntry.append(App.SlaveAssignment.standardSlaveReport(slave, false));
			App.SlaveAssignment.appendSlaveArt(artSpan, slave);
			slaveReports.push({
				id: slave.ID,
				report: schoolteacherEntry
			});
		} else {
			App.SlaveAssignment.standardSlaveReport(slave, true);
		}
	}

	let restedSlaves = 0;
	for (const slave of App.SlaveAssignment.reportSlaves(slaves)) {
		slave.devotion += devBonus;
		if (slave.health.condition < -80) {
			improveCondition(slave, 20);
		} else if (slave.health.condition < -40) {
			improveCondition(slave, 10);
		} else if (slave.health.condition < 0) {
			improveCondition(slave, 7);
		} else if (slave.health.condition < 90) {
			improveCondition(slave, 3);
		}
		if (slave.rules.living !== "normal") {
			slave.rules.living = "normal";
		}
		/* Education done? Has to be here before we run the standard slave report or there will be double entries for slave */
		if (slave.fetish === Fetish.MINDBROKEN) {
			if (V.assignmentRecords[slave.ID]) {
				assignJobSafely(slave, V.assignmentRecords[slave.ID]);
			} else {
				removeJob(slave, Job.SCHOOL);
			}
			restedSlaves++;
			continue;
		} else if (	((slave.intelligenceImplant >= 30 && V.schoolroomRemodelBimbo !== 1) || (slave.intelligenceImplant <= -15 && V.schoolroomRemodelBimbo === 1)) &&
					((slave.voice === 0) || (slave.accent <= 1) || ((V.schoolroomUpgradeLanguage === 0) && (slave.accent <= 2))) &&
					((slave.skill.oral > 30) || ((V.schoolroomUpgradeSkills === 0) && (slave.skill.oral > 10))) &&
					((slave.skill.whoring > 30) || ((V.schoolroomUpgradeSkills === 0) && (slave.skill.whoring > 10))) &&
					((slave.skill.entertainment > 30) || ((V.schoolroomUpgradeSkills === 0) && (slave.skill.entertainment > 10))) &&
					((slave.skill.anal > 30) || ((V.schoolroomUpgradeSkills === 0) && (slave.skill.anal > 10))) &&
					((slave.skill.vaginal > 30) || ((V.schoolroomUpgradeSkills === 0) && (slave.skill.vaginal > 10)) || (slave.vagina < 0)) &&
					((slave.skill.penetrative > 30) || ((V.schoolroomUpgradeSkills === 0) && (slave.skill.penetrative > 10)) || (penetrativeSocialUse() < 40)) &&
					(!needsTutoring(slave))) {
			const reassignment = App.UI.DOM.appendNewElement("p", beforeFrag, '');
			const {he, his} = getPronouns(slave);
			let r = [];
			r.push(`<span class="slave-name">${slave.slaveName}</span> can learn little from further classes,`);
			r.push(`<span class="noteworthy">`);
			if (V.assignmentRecords[slave.ID]) {
				const oldJob = V.assignmentRecords[slave.ID];
				assignJobSafely(slave, oldJob);
				if (slave.choosesOwnAssignment === 1) {
					r.push(`and ${he} is resting before choosing another task.`);
				} else if (slave.assignment === Job.REST) {
					if (oldJob !== Job.REST) {
						r.push(`and since ${he} was unable to return to ${his} old task to ${oldJob}, ${his} assignment has defaulted to rest.`);
					} else {
						r.push(`so ${he} has returned to rest.`);
					}
				} else {
					r.push(`so ${he} goes back to ${slave.assignment}.`);
				}
			} else {
				r.push(`so ${his} assignment has defaulted to rest.`);
				removeJob(slave, Job.SCHOOL);
			}
			r.push(`</span>`);
			restedSlaves++;
			App.Events.addNode(reassignment, r);
			continue;
		}

		if (V.showEWD || (V.favSeparateReport === 1 && V.favorites.includes(slave.ID))) {
			const {He} = getPronouns(slave);
			const slaveEntry = App.UI.DOM.makeElement("div", null, ["slave-report"]);
			const artSpan = App.UI.DOM.appendNewElement("span", slaveEntry);
			let leaderTraining = '';
			for (const role of Object.keys(V.slaveTutor)) {
				if (V.slaveTutor[role].includes(slave.ID)) {
					leaderTraining = ` on being a ${role}`; break;
				}
			}
			slaveEntry.append(App.SlaveAssignment.saSlaveIntro(slave, `is studying in ${V.schoolroomName}${leaderTraining}.`));
			App.Events.addNode(slaveEntry, [He, App.SlaveAssignment.takeClasses(slave)], "div", ["indent"]);
			slaveEntry.append(App.SlaveAssignment.standardSlaveReport(slave, false));
			App.SlaveAssignment.appendSlaveArt(artSpan, slave);

			slaveReports.push({
				id: slave.ID,
				report: slaveEntry,
			});
		} else {
			// discard return values silently
			App.SlaveAssignment.takeClasses(slave);
			App.SlaveAssignment.standardSlaveReport(slave, true);
		}
	}

	const afterFrag = new DocumentFragment();

	if (restedSlaves > 0) {
		const r = [];
		r.push((restedSlaves === 1) ? `One slave has ` : `${restedSlaves} slaves have`);
		r.push(App.UI.DOM.makeElement("span", "learned", ["green"]));
		r.push(`all they can, and will be released from the schoolroom before the end of the week.`);
		App.Events.addNode(afterFrag, r, "p", ["indent"]);
	}

	if (V.schoolroomDecoration !== "standard") {
		const r = [];
		r.push(`${capFirstChar(V.schoolroomName)}'s ${V.schoolroomDecoration} atmosphere <span class="hotpink">has a minor impact on the students.</span>`);
		if (App.Entity.facilities.schoolroom.revivalistLanguageDecorationBonus()) {
			r.push(`They also <span class="positive">learn ${V.language} more quickly</span> in this environment.`);
		}
		App.Events.addNode(afterFrag, r, "p", ["indent"]);
	}

	App.EndWeek.saVars.flSex = new Set();

	return {
		before: beforeFrag,
		slaves: slaveReports,
		after: afterFrag,
	};
};
