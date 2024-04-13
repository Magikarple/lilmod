// cSpell:ignore hgsuite

/**
 * @param {App.Entity.SlaveState} slave
 * @param {FC.Assignment} job
 * @returns {string}
 */
globalThis.assignJob = function(slave, job) {
	// Handle non-exclusive pseudo-assignments as special cases
	if (job === Job.ARENA) {
		if (!V.pit.trainingIDs.includes(slave.ID)) {
			V.pit.trainingIDs.push(slave.ID);
		}
		V.JobIDMap[Job.ARENA].add(slave.ID);
		return "";
	}
	if (job === Job.PIT) {
		if (!V.pit.fighterIDs.includes(slave.ID)) {
			V.pit.fighterIDs.push(slave.ID);
		}
		V.JobIDMap[Job.PIT].add(slave.ID);
		return "";
	}
	if (job === Job.LURCHER) {
		V.LurcherID = slave.ID;
		V.JobIDMap[Job.LURCHER].clear();
		V.JobIDMap[Job.LURCHER].add(slave.ID);
		return "";
	}

	let r = "";
	const oldJob = slave.assignment;

	removeJob(slave, slave.assignment, true);
	const restingAssignment = slave.assignment; // not necessary Job.REST, but the assignment chosen by removeJob() for her case

	/**
	 * this helper makes sure global references global IDs (V.HeadGirlID, V.AttendantID, etc) are set correctly
	 * @param {string} propName
	 */
	function uniqueJob(propName) {
		const specialIDProp = `${propName}ID`;
		const prevAssigneeID = V[specialIDProp];
		if (prevAssigneeID !== slave.ID) {
			removeJob(slaveStateById(prevAssigneeID), job, true);
		}
		V[specialIDProp] = slave.ID;
	}

	/* Tracking for the following cases: */
	if (oldJob !== job && V.assignmentRecords[slave.ID] !== job && oldJob !== Job.REST) { // Check that there is a real change happening. Sometimes when you send someone to a classroom or something, this fires twice.
		switch (job.toLowerCase()) {
			case Job.CELLBLOCK:
			case "cellblock":
				if (oldJob !== Job.CELLBLOCK) { // Due to the way assignJob fires twice on assigning to a building, we have to make sure that we are keeping the original record.
					V.assignmentRecords[slave.ID] = oldJob;
				}
				break;
			case Job.CLINIC:
			case "clinic":
				if (oldJob !== Job.CLINIC) {
					V.assignmentRecords[slave.ID] = oldJob;
				}
				break;
			case Job.SCHOOL.toLowerCase():
			case "schoolroom":
				if (oldJob !== Job.SCHOOL) {
					V.assignmentRecords[slave.ID] = oldJob;
				}
				break;
			case Job.SPA.toLowerCase():
			case "spa":
				if (oldJob !== Job.SPA) {
					V.assignmentRecords[slave.ID] = oldJob;
				}
				break;
		}
	}
	/* use .toLowerCase() to get rid of a few dupe conditions. */
	switch (job.toLowerCase()) {
		case Job.ARCADE.toLowerCase():
		case "arcade":
			slave.assignment = Job.ARCADE;
			if (slave.clothes !== "a Fuckdoll suit") {
				slave.clothes = "no clothing";
			}
			slave.shoes = "none";
			slave.collar = "none";
			slave.rules.living = LivingRule.SPARE;
			break;

		case Job.BROTHEL.toLowerCase():
		case "brothel":
			slave.assignment = Job.BROTHEL;
			switch (V.brothelDecoration) {
				case "Degradationist":
				case "standard":
					slave.rules.living = LivingRule.SPARE;
					break;
				default:
					slave.rules.living = LivingRule.NORMAL;
					break;
			}
			break;

		case Job.CELLBLOCK.toLowerCase():
		case "cellblock":
			slave.assignment = Job.CELLBLOCK;
			switch (V.cellblockDecoration) {
				case "Paternalist":
					slave.rules.living = LivingRule.NORMAL;
					break;
				default:
					slave.rules.living = LivingRule.SPARE;
					break;
			}
			break;

		case Job.CLINIC.toLowerCase():
		case "clinic":
			slave.assignment = Job.CLINIC;
			switch (V.clinicDecoration) {
				case "Repopulationist":
				case "Eugenics":
				case "Gender Radicalist":
				case "Gender Fundamentalist":
				case "Paternalist":
				case "Maturity Preferentialist":
				case "Youth Preferentialist":
				case "Slimness Enthusiast":
				case "Hedonistic":
				case "Intellectual Dependency":
				case "Petite Admiration":
				case "Statuesque Glorification":
				case "Neo-Imperialist":
					slave.rules.living = LivingRule.LUXURIOUS;
					break;

				case "Roman Revivalist":
				case "Aztec Revivalist":
				case "Egyptian Revivalist":
				case "Arabian Revivalist":
				case "Chinese Revivalist":
				case "Antebellum Revivalist":
				case "Chattel Religionist":
				case "Edo Revivalist":
					slave.rules.living = LivingRule.NORMAL;
					break;

				default:
					slave.rules.living = LivingRule.SPARE;
					break;
			}
			break;

		case Job.CLUB.toLowerCase():
		case "club":
			slave.assignment = Job.CLUB;
			slave.rules.living = LivingRule.NORMAL;
			break;

		case Job.DAIRY.toLowerCase():
		case "dairy":
			slave.assignment = Job.DAIRY;
			switch (V.dairyDecoration) {
				case "Roman Revivalist":
				case "Neo-Imperialist":
				case "Aztec Revivalist":
				case "Chinese Revivalist":
				case "Chattel Religionist":
				case "Edo Revivalist":
				case "Arabian Revivalist":
				case "Egyptian Revivalist":
				case "Supremacist":
				case "Subjugationist":
				case "Degradationist":
					slave.rules.living = LivingRule.SPARE;
					break;
				default:
					slave.rules.living = LivingRule.NORMAL;
					break;
			}
			break;

		case Job.FARMYARD.toLowerCase():
		case "farmyard":
			slave.assignment = Job.FARMYARD;
			switch (V.farmyardDecoration) {
				case "Neo-Imperialist":
				case "Aztec Revivalist":
				case "Chinese Revivalist":
				case "Chattel Religionist":
				case "Edo Revivalist":
				case "Arabian Revivalist":
				case "Egyptian Revivalist":
				case "Antebellum Revivalist":
				case "Supremacist":
				case "Subjugationist":
				case "Degradationist":
					slave.rules.living = LivingRule.SPARE;
					break;
				case "Roman Revivalist":
					slave.rules.living = LivingRule.LUXURIOUS;
					break;
				default:
					slave.rules.living = LivingRule.SPARE;
					break;
			}
			break;

		case Job.HEADGIRLSUITE.toLowerCase():
		case "head girl suite":
		case "hgsuite":
			slave.assignment = Job.HEADGIRLSUITE;
			slave.rules.living = LivingRule.LUXURIOUS;
			break;

		case Job.MASTERSUITE.toLowerCase():
		case "master suite":
		case "mastersuite":
			slave.assignment = Job.MASTERSUITE;
			if (V.masterSuiteUpgradeLuxury > 0) {
				slave.rules.living = LivingRule.LUXURIOUS;
			} else {
				slave.rules.living = LivingRule.NORMAL;
			}
			break;

		case Job.SCHOOL.toLowerCase():
		case "schoolroom":
			slave.assignment = Job.SCHOOL;
			slave.rules.living = LivingRule.NORMAL;
			break;

		case Job.QUARTER.toLowerCase():
		case "servants' quarters":
		case "servantsquarters":
			slave.assignment = Job.QUARTER;
			switch (V.servantsQuartersDecoration) {
				case "Roman Revivalist":
				case "Neo-Imperialist":
				case "Aztec Revivalist":
				case "Chinese Revivalist":
				case "Chattel Religionist":
				case "Edo Revivalist":
				case "Supremacist":
				case "Subjugationist":
				case "Degradationist":
				case "Arabian Revivalist":
				case "Egyptian Revivalist":
				case "Antebellum Revivalist":
					slave.rules.living = LivingRule.SPARE;
					break;
				case "Slave Professionalism":
					if (slave.intelligence + slave.intelligenceImplant > 15) {
						slave.rules.living = LivingRule.NORMAL;
					} else {
						slave.rules.living = LivingRule.SPARE;
					}
					break;
				case "Petite Admiration":
				case "Statuesque Glorification":
					if (heightPass(slave)) {
						slave.rules.living = LivingRule.NORMAL;
					} else {
						slave.rules.living = LivingRule.SPARE;
					}
					break;
				default:
					slave.rules.living = LivingRule.NORMAL;
					break;
			}
			break;

		case Job.SPA.toLowerCase():
		case "spa":
			slave.assignment = Job.SPA;
			switch (V.spaDecoration) {
				case "Chattel Religionist":
				case "Chinese Revivalist":
					slave.rules.living = LivingRule.NORMAL;
					break;
				case "Degradationist":
					slave.rules.living = LivingRule.SPARE;
					break;
				default:
					slave.rules.living = LivingRule.LUXURIOUS;
					break;
			}
			break;

		case Job.NURSERY.toLowerCase():
		case "nursery":
			slave.assignment = Job.NURSERY;
			slave.rules.living = LivingRule.NORMAL;
			break;

		case Job.ATTENDANT.toLowerCase():
			uniqueJob("Attendant");
			slave.assignment = Job.ATTENDANT;
			slave.rules.living = LivingRule.LUXURIOUS;
			break;

		case Job.MATRON.toLowerCase():
			uniqueJob("Matron");
			slave.assignment = Job.MATRON;
			slave.rules.living = LivingRule.LUXURIOUS;
			slave.rules.rest = RestRule.MID;
			break;

		case Job.DJ.toLowerCase():
			uniqueJob("dj");
			slave.assignment = Job.DJ;
			slave.rules.living = LivingRule.LUXURIOUS;
			slave.rules.rest = RestRule.MID;
			break;

		case Job.MADAM.toLowerCase():
			uniqueJob("Madam");
			slave.assignment = Job.MADAM;
			slave.rules.living = LivingRule.LUXURIOUS;
			slave.rules.rest = RestRule.MID;
			break;

		case Job.MILKMAID.toLowerCase():
			uniqueJob("Milkmaid");
			slave.assignment = Job.MILKMAID;
			slave.rules.living = LivingRule.LUXURIOUS;
			slave.rules.rest = RestRule.MID;
			break;

		case Job.FARMER.toLowerCase():
			uniqueJob("Farmer");
			slave.assignment = Job.FARMER;
			slave.rules.living = LivingRule.LUXURIOUS;
			slave.rules.rest = RestRule.MID;
			break;

		case Job.NURSE.toLowerCase():
			uniqueJob("Nurse");
			slave.assignment = Job.NURSE;
			slave.rules.living = LivingRule.LUXURIOUS;
			slave.rules.rest = RestRule.MID;
			break;

		case Job.TEACHER.toLowerCase():
			uniqueJob("Schoolteacher");
			slave.assignment = Job.TEACHER;
			slave.rules.living = LivingRule.LUXURIOUS;
			slave.rules.rest = RestRule.MID;
			break;

		case Job.STEWARD.toLowerCase():
			uniqueJob("Stewardess");
			slave.assignment = Job.STEWARD;
			slave.rules.living = LivingRule.LUXURIOUS;
			slave.rules.rest = RestRule.MID;
			break;

		case Job.WARDEN.toLowerCase():
			uniqueJob("Wardeness");
			slave.assignment = Job.WARDEN;
			slave.rules.living = LivingRule.LUXURIOUS;
			slave.rules.rest = RestRule.MID;
			break;

		case Job.RECRUITER:
			uniqueJob("Recruiter");
			slave.assignment = Job.RECRUITER;
			break;

		case Job.CONCUBINE.toLowerCase():
			uniqueJob("Concubine");
			slave.assignment = Job.CONCUBINE;
			slave.rules.living = V.masterSuiteUpgradeLuxury > 0 ? LivingRule.LUXURIOUS : LivingRule.NORMAL;
			break;

		case Job.HEADGIRL.toLowerCase():
			uniqueJob("HeadGirl");
			slave.assignment = Job.HEADGIRL;
			if (V.HGSuite === 1) {
				slave.rules.living = LivingRule.LUXURIOUS;
			}
			slave.rules.rest = RestRule.MID;
			V.HGTimeInGrade = 0;
			break;

		case Job.BODYGUARD.toLowerCase():
			uniqueJob("Bodyguard");
			slave.assignment = Job.BODYGUARD;
			if (V.dojo > 1) {
				slave.rules.living = LivingRule.LUXURIOUS;
			}
			if (V.pit) {
				V.pit.fighterIDs.delete(slave.ID);
			}
			break;

		case Job.AGENT.toLowerCase():
		case Job.AGENTPARTNER.toLowerCase():
			slave.assignment = job;
			slave.useRulesAssistant = 0; /* non-visible roles exempt from Rules Assistant */
			WombCleanGenericReserve(slave, 'incubator', 9999);
			WombCleanGenericReserve(slave, 'nursery', 9999);
			if (job === Job.AGENT) {
				if (App.activeArcology().direction !== 0) { // never assign an agent to the player's arcology
					if (App.activeArcology().leaderID !== 0) {
						const oldAgent = getSlave(App.activeArcology().leaderID);
						if (oldAgent && oldAgent.assignment === Job.AGENT) {
							// this is an error...you should never be able to assign an agent over the top of another
							// but in order to prevent game state corruption, we are going to remove the old agent
							removeJob(oldAgent, oldAgent.assignment, false);
						}
					}
					App.activeArcology().leaderID = slave.ID;
					App.activeArcology().government = "your agent";
				}
			}
			break;

		case Job.CHOICE.toLowerCase():
			slave.assignment = job;
			slave.choosesOwnAssignment = 1;
			break;

		default:
			slave.assignment = job; /* removeJob already set choosesOwnAssignment = 0 */
			break;
	}

	V.JobIDMap[restingAssignment].delete(slave.ID);
	V.JobIDMap[slave.assignment].add(slave.ID);

	if (!assignmentVisible(slave) && !App.Entity.facilities.masterSuite.isHosted(slave) && V.personalAttention.task === PersonalAttention.TRAINING) {
		if (V.personalAttention.slaves.deleteWith(s => s.ID === slave.ID).length > 0) {
			if (V.personalAttention.slaves.length === 0) {
				App.PersonalAttention.reset();
				r += `${slave.slaveName} no longer has your personal attention; you plan to focus on ${V.personalAttention.task}.`;
			} else {
				r += `${slave.slaveName} no longer has your personal attention.`;
			}
		}
	}

	return r;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {FC.Assignment} assignmentStr
 */
globalThis.assignJobSafely = function(slave, assignmentStr) {
	if (V.assignmentRecords[slave.ID] === Job.CHOICE) {
		assignJob(slave, Job.REST);
		slave.choosesOwnAssignment = 1;
	} else if ([Job.AGENT, Job.AGENTPARTNER].includes(V.assignmentRecords[slave.ID])) { // it is NEVER safe to auto-reassign agents (we don't know which arcology they came from)
		assignJob(slave, Job.REST);
	} else if (!App.Utils.jobForAssignment(assignmentStr).canEmploy(slave).length) { // If nothing complains about job requirements not being met
		assignJob(slave, assignmentStr);
		if (App.EndWeek.saVars) { // during the endweek reports, if a slave gets reassigned to whoring, we have to make her whore class valid
			if (assignmentStr === Job.WHORE || assignmentStr === Job.BROTHEL) {
				setReassignedWhoreClass(slave);
			}
		}
	} else {
		assignJob(slave, Job.REST);
	}
	// Whether they manage to go back or they default to rest, we don't need their record:
	if (V.assignmentRecords[slave.ID]) {
		delete V.assignmentRecords[slave.ID];
	}
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {FC.Assignment} assignment
 * @param {boolean} [saveRecord=false]
 * @returns {string}
 */
globalThis.removeJob = function(slave, assignment, saveRecord = false) {
	if (!slave) {
		// it is well-formed, but does nothing, to remove an assignment from nobody.
		// this lets us call removeJob(S.HeadGirl, Job.HEADGIRL) and similar,
		// without first checking to see whether a slave is really assigned to S.HeadGirl or not.
		return '';
	}

	// Handle non-exclusive pseudo-assignments as special cases.
	// These jobs are not remembered as a last assignment and don't follow most other rules.
	if (assignment === Job.ARENA) {
		if (V.pit) {
			V.pit.trainingIDs.delete(slave.ID);
			V.JobIDMap[Job.ARENA].delete(slave.ID);
		}
		return "";
	}
	if (assignment === Job.PIT) {
		if (V.pit) {
			V.pit.fighterIDs.delete(slave.ID);
			V.JobIDMap[Job.PIT].delete(slave.ID);
		}
		return "";
	}
	if (assignment === Job.LURCHER) {
		if (V.LurcherID === slave.ID) {
			V.LurcherID = 0;
		}
		V.JobIDMap[Job.LURCHER].delete(slave.ID);
		return "";
	}

	let r = "";

	if (V.assignmentRecords[slave.ID] && (saveRecord === false)) {
		delete V.assignmentRecords[slave.ID];
	}

	if (V.JobIDMap.hasOwnProperty(assignment)) {
		V.JobIDMap[assignment].delete(slave.ID);
	} else {
		V.JobIDMap[slave.assignment].delete(slave.ID);
	}

	if (slave.ID === V.HeadGirlID) {
		V.HeadGirlID = 0;
	} else if (slave.ID === V.RecruiterID) {
		V.RecruiterID = 0;
		V.recruiterIOUs = 0;
	} else if (slave.ID === V.BodyguardID) {
		V.BodyguardID = 0;
	} else if (slave.ID === V.MadamID) {
		V.MadamID = 0;
	} else if (slave.ID === V.djID) {
		V.djID = 0;
	} else if (slave.ID === V.MilkmaidID) {
		V.MilkmaidID = 0;
	} else if (slave.ID === V.FarmerID) {
		V.FarmerID = 0;
	} else if (slave.ID === V.SchoolteacherID) {
		V.SchoolteacherID = 0;
	} else if (V.AttendantID === slave.ID) {
		V.AttendantID = 0;
	} else if (slave.ID === V.MatronID) {
		V.MatronID = 0;
	} else if (slave.ID === V.NurseID) {
		V.NurseID = 0;
	} else if (slave.ID === V.StewardessID) {
		V.StewardessID = 0;
	} else if (slave.ID === V.WardenessID) {
		V.WardenessID = 0;
	} else if (slave.ID === V.ConcubineID) {
		V.ConcubineID = 0;
	} else if (slave.ID === V.StudID) {
		V.StudID = 0;
	}

	/* use .toLowerCase() to get rid of a few dupe conditions. */
	switch (assignment.toLowerCase()) {
		case Job.ARCADE.toLowerCase():
		case "arcade":
			slave.assignment = Job.GLORYHOLE;
			break;

		case Job.BROTHEL.toLowerCase():
		case "brothel":
			slave.assignment = Job.WHORE;
			break;

		case Job.CELLBLOCK.toLowerCase():
		case "cellblock":
			slave.assignment = Job.REST;
			if (slave.inflation > 0) {
				deflate(slave);
			}
			break;

		case Job.CLINIC.toLowerCase():
		case "clinic":
			slave.assignment = Job.REST;
			break;

		case Job.CLUB.toLowerCase():
		case "club":
			slave.assignment = Job.PUBLIC;
			break;

		case Job.DAIRY.toLowerCase():
		case "dairy":
			slave.assignment = Job.MILKED;
			if (V.dairyRestraintsSetting > 1) {
				slave.health.tired = 100;
			}
			if (V.dairyFeedersSetting > 0) {
				slave.diet = "healthy";
			}
			if (V.dairyHormonesSetting > 0) {
				slave.hormones = 0;
			}
			break;

		case Job.FARMYARD.toLowerCase():
		case "farmyard":
			slave.assignment = Job.REST;
			break;

		case Job.SCHOOL.toLowerCase():
		case "schoolroom":
			slave.assignment = Job.REST;
			break;

		case Job.SPA.toLowerCase():
		case "spa":
			slave.assignment = Job.REST;
			break;

		case Job.QUARTER.toLowerCase():
		case "servants' quarters":
		case "servantsquarters":
			slave.assignment = Job.HOUSE;
			break;

		case Job.MASTERSUITE.toLowerCase():
		case "master suite":
		case "mastersuite":
			slave.assignment = Job.FUCKTOY;
			break;

		case "live with your head girl":
		case "head girl suite":
		case "hgsuite":
			slave.assignment = Job.REST;
			break;

		case Job.NURSERY:
		case "nursery":
			slave.assignment = Job.REST;
			break;

		case "be your head girl": {
			slave.assignment = Job.REST;
			const HGSlave = V.slaves.find(s => s.assignment === Job.HEADGIRLSUITE);
			if (HGSlave) {
				removeJob(HGSlave, Job.HEADGIRLSUITE);
				if (V.HGSuiteEquality === 1 && HGSlave.devotion > 50) {
					assignJob(HGSlave, Job.HEADGIRL);
					V.HeadGirlID = HGSlave.ID;
					HGSlave.diet = "healthy";
				}
			}
			if (V.personalAttention.task === PersonalAttention.SUPPORT_HG && V.HeadGirlID === 0) {
				App.PersonalAttention.reset();
				r += `You no longer have a slave assigned to be your Head Girl, so you turn your personal attention to focus on ${V.personalAttention.task}.`;
			}
			V.HGTimeInGrade = 0;
			break;
		}

		case Job.AGENT:
		case Job.AGENTPARTNER:
			if (slave.assignment === Job.AGENT) {
				const arc = V.arcologies.find((a) => a.leaderID === slave.ID);
				if (arc) {
					arc.leaderID = 0;
					arc.government = "your trustees";
				}
			}
			slave.assignment = Job.REST;
			if (slave.relationshipTarget > 0) {
				/* following code assumes there can be at most one companion */
				const lover = V.slaves.find(s => haveRelationshipP(s, slave) && s.assignment === Job.AGENTPARTNER);
				if (lover) {
					removeJob(lover, Job.AGENTPARTNER, saveRecord);
				}
			}
			break;

		default:
			slave.assignment = Job.REST;
			break;
	}

	V.JobIDMap[slave.assignment].add(slave.ID);

	if (slave.rules.living === LivingRule.LUXURIOUS && !assignmentVisible(slave)) {
		slave.rules.living = LivingRule.NORMAL;
	}

	slave.choosesOwnAssignment = 0;
	slave.sentence = 0;
	slave.subTarget = 0;

	return r;
};

/**
 * Indicate whether a slave's current assignment is shown in Main
 * Often used as a proxy for "penthouse slave"
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
globalThis.assignmentVisible = function(slave) {
	switch (slave.assignment) {
		/* normal out-of-penthouse jobs */
		case Job.ARCADE:
		case Job.BROTHEL:
		case Job.CELLBLOCK:
		case Job.CLINIC:
		case Job.CLUB:
		case Job.DAIRY:
		case Job.FARMYARD:
		case Job.HEADGIRLSUITE:
		case Job.MASTERSUITE:
		case Job.SCHOOL:
		case Job.QUARTER:
		case Job.SPA:
		case Job.NURSERY:
			return false;

		/* outside leadership jobs */
		case Job.ATTENDANT:
		case Job.MATRON:
		case Job.DJ:
		case Job.MADAM:
		case Job.MILKMAID:
		case Job.FARMER:
		case Job.NURSE:
		case Job.TEACHER:
		case Job.STEWARD:
		case Job.WARDEN:
		case Job.CONCUBINE:
			return false;

		/* agents are not in the arcology at all */
		case Job.AGENT:
		case Job.AGENTPARTNER:
			return false;

		/* transition state */
		case Job.CHOICE:
			return true; // show
	}

	/* all other jobs are shown in penthouse */
	return true;
};

/**
 * @returns {Record<FC.Assignment, Set<number>>} dictionary assignment -> slave IDs
 */
globalThis.makeJobIdMap = function() {
	/** @type {Object.<FC.Assignment, Set<number>>} */
	const res = {};
	for (const jn of Object.values(Job)) {
		res[jn] = new Set();
	}

	for (const slave of V.slaves) {
		res[slave.assignment].add(slave.ID);
	}

	// special cases
	if (V.pit) {
		res[Job.ARENA] = new Set(V.pit.trainingIDs);
		res[Job.PIT] = new Set(V.pit.fighterIDs);
	}
	res[Job.LURCHER].add(V.LurcherID);

	return res;
};

/**
 * Generates string with links for changing slave assignment
 */
App.UI.jobLinks = function() {
	"use strict";
	const facilitiesOrder = [
		/* sorted by improvement before work, within improvement in order of progress, within work alphabetical for facilities*/
		App.Entity.facilities.penthouse,
		App.Entity.facilities.cellblock,
		App.Entity.facilities.nursery,
		App.Entity.facilities.schoolroom,
		App.Entity.facilities.clinic,
		App.Entity.facilities.spa,
		App.Entity.facilities.arcade,
		App.Entity.facilities.brothel,
		App.Entity.facilities.club,
		App.Entity.facilities.dairy,
		App.Entity.facilities.farmyard,
		App.Entity.facilities.masterSuite,
		App.Entity.facilities.servantsQuarters
	];

	return {
		assignmentsFragment: assignmentsFragment,
		transfersFragment: transfersFragment
	};

	/**
	 * Generates assignment links
	 * @param {number} ID
	 * @param {string} passage
	 * @param {assignmentCallback} [callback]
	 * @returns {DocumentFragment}
	 */
	function assignmentsFragment(ID, passage, callback) {
		let penthouseJobs = App.Entity.facilities.penthouse.assignmentLinkElements(ID, undefined, passage, callback);
		const slave = slaveStateById(ID);
		const sp = getPronouns(slave);

		if (slave.fuckdoll === 0) {
			const assignment = Job.CHOICE;
			if (slave.assignment !== assignment) {
				penthouseJobs.push(App.UI.DOM.assignmentLink(slave, assignment, passage, callback, `Let ${sp.object} choose`));
			}
		} else {
			penthouseJobs.push(App.UI.DOM.disabledLink(`Let ${sp.object} choose`, ["Fuckdolls can't choose their job"]));
		}
		let res = document.createDocumentFragment();
		// there is always at least one job
		res.appendChild(penthouseJobs[0]);
		for (let i = 1; i < penthouseJobs.length; ++i) {
			res.appendChild(document.createTextNode(" | "));
			res.appendChild(penthouseJobs[i]);
		}
		return res;
	}

	/**
	 * Generates transfer links
	 * @param {number} ID
	 * @param {assignmentCallback} [callback]
	 * @returns {DocumentFragment}
	 */
	function transfersFragment(ID, callback) {
		/** @type {HTMLElement[]} */
		const transfers = [];
		const slave = slaveStateById(ID);

		for (const f of facilitiesOrder) {
			if (!f.established || f.jobs.length === 0) {
				continue;
			}
			const rejects = f.canHostSlave(slave);
			if (rejects.length === 0) {
				transfers.push(f.transferLinkElement(ID, undefined, passage(), callback));
			} else {
				transfers.push(App.UI.DOM.disabledLink(f.genericName, rejects));
			}
		}

		let res = document.createDocumentFragment();
		// there is always at least one job
		res.appendChild(transfers[0]);
		for (let i = 1; i < transfers.length; ++i) {
			res.appendChild(document.createTextNode(" | "));
			res.appendChild(transfers[i]);
		}
		return res;
	}
}();

App.activeArcology = function() {
	return V.arcologies[V.activeArcologyIdx];
};

App.currentAgent = function(arcology) {
	return getSlave(V.arcologies[arcology].leaderID);
};

/**
 * Remove all workers from the facility changing their assignments
 * @param {App.Entity.Facilities.Facility} facility
 * @param {FC.Assignment} [managerAssignment="rest"] new assignment for the facility manager
 * @param {FC.Assignment} [workerAssignment="rest"] new assignment for the facility workers
 */
App.Utils.moveFacilityWorkers = function(facility, managerAssignment = Job.REST, workerAssignment = Job.REST) {
	if (facility.manager && facility.manager.currentEmployee) {
		assignJob(facility.manager.currentEmployee, managerAssignment);
	}

	for (const w of facility.employees()) {
		assignJob(w, workerAssignment);
	}
};

App.Utils.jobForAssignment = function() {
	const map = new Map();

	function fillMap() {
		/**
		 * @param {Map} m
		 * @param {App.Entity.Facilities.Facility} f
		 */
		function addFacility(m, f) {
			if (f.manager) {
				m.set(f.desc.manager.assignment, f.manager);
			}
			for (const j of f.jobsNames) {
				m.set(f.desc.jobs[j].assignment, f.job(j));
			}
		}

		for (const f in App.Entity.facilities) {
			if (f.length > 0) {
				addFacility(map, App.Entity.facilities[f]);
			}
		}
	}

	/**
	 * @param {FC.Assignment} assignment
	 * @returns {App.Entity.Facilities.Job}
	 */
	function getJob(assignment) {
		if (map.size === 0) {
			fillMap();
		}
		const res = map.get(assignment);
		if (!res) {
			throw Error(`Can't find job object for assignment '${assignment}'`);
		}
		return res;
	}

	return getJob;
}();

/** Assign a slave, play the appropriate assignment scene if necessary, and redirect to a destination passage.
 * @param {App.Entity.SlaveState} slave
 * @param {FC.Assignment} assignTo
 * @param {string} passage
 */
globalThis.assignmentTransition = function(slave, assignTo, passage) {
	/** @param {string} scene */
	function detourThroughScene(scene) {
		V.returnTo = passage;
		Engine.play(scene);
	}

	V.AS = slave.ID;
	assignJob(slave, assignTo);
	if (V.showAssignToScenes === 1 && slave.fetish !== Fetish.MINDBROKEN) {
		if (assignTo === Job.DAIRY && V.dairyRestraintsSetting >= 2 && ((V.dairyStimulatorsSetting >= 2) || (V.dairyFeedersSetting >= 2) || (V.dairyPregSetting >= 2))) {
			detourThroughScene("Industrial Dairy Assignment Scene");
		} else if (assignTo === Job.DAIRY && (V.dairyRestraintsSetting === 0 && slave.devotion > 0)) {
			detourThroughScene("Free Range Dairy Assignment Scene");
		} else if (assignTo === Job.BROTHEL) {
			detourThroughScene("Brothel Assignment Scene");
		} else {
			Engine.play(passage);
		}
	} else {
		Engine.play(passage);
	}
};

/**
 * Creates a link that will remove all slaves from a facility, including manager.
 * @param {App.Entity.Facilities.Facility} facility
 * @param {FC.Assignment} [managerAssignment]
 * @param {FC.Assignment} [workerAssignment]
 * @returns {DocumentFragment}
 */
globalThis.removeFacilityWorkers = function(facility, managerAssignment, workerAssignment) {
	const count = facility.totalEmployeesCount;
	const frag = new DocumentFragment();
	if (count > 0) {
		frag.append(
			App.UI.DOM.link(
				"Remove all slaves",
				() => {
					App.Utils.moveFacilityWorkers(facility, managerAssignment, workerAssignment);
					penthouseCensus();
				},
				[],
				passage(),
			)
		);
		if ((count + V.dormitoryPopulation) > V.dormitory) {
			App.UI.DOM.appendNewElement("span", frag, ` Dormitory capacity will be exceeded.`, "red");
		}
	}
	return frag;
};
