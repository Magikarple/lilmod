// cSpell:ignore undrawnJobs

App.EndWeek.slaveAssignmentReport = function() {
	const facilities = App.Entity.facilities;
	const arcology = V.arcologies[0];

	const initialEmployeesCount = App.Utils.countFacilityWorkers(); // will be used to show differences after all the assignment changes
	const initialPenthouseTotalEmployeesCount = _countPenthousePopulation();

	/* Initialize global SA variables */
	App.EndWeek.saVars = new App.EndWeek.SASharedVariables();

	/* Spa room */
	if (facilities.spa.established) {
		V.spaSpots = (facilities.spa.capacity - App.Entity.facilities.spa.employeesIDs().size) * 20;
		if (S.Attendant) {
			V.spaSpots = Math.trunc(V.spaSpots * (1 + (S.Attendant.skill.attendant / 400))); // A skilled attendant improves available space by 25%
		}
	}

	const skillsToTest = {
		whoring: "whore",
		entertainment: "entertain",
		vaginal: "vaginal",
		anal: "anal",
		oral: "oral",
		penetrative: "penetrative"
	};

	const res = document.createDocumentFragment();

	/* perform reassignments before generating reports */
	for (const slave of V.slaves) {
		for (const sk in skillsToTest) {
			if (_.isNil(slave.skill[sk])) {
				_printSlaveError(`Reset bad ${skillsToTest[sk]} skill`, slave);
				slave.skill[sk] = 0;
			}
		}

		// fire unqualified special slaves
		_ensureEmployeeMeetsJobRequirements(slave);

		// allow slaves to choose their jobs for later output
		if (slave.choosesOwnAssignment === 1) {
			App.SlaveAssignment.choosesOwnJob(slave);
		}
	}

	App.EndWeek.computeSexualServicesModel(res);

	let slavesWithWorkingDicks = 0;
	for (const slave of V.slaves) {
		if ((V.seeDicks > 0) && canPenetrate(slave) && App.Utils.hasNonassignmentSex(slave)) {
			App.EndWeek.saVars.averageDick += slave.dick;
			slavesWithWorkingDicks++;
		}

		if (slave.lactation === 1) {
			slave.lactationDuration--;
		}

		switch (slave.assignment) {
			case Job.HEADGIRLSUITE:
				if (slave.devotion >= random(-30, 20)) {
					App.EndWeek.saVars.HGSlaveSuccess = true;
					App.EndWeek.saVars.HGEnergy++;
				}
				App.EndWeek.saVars.slaveCheckedIn.push(slave.ID);
				break;
			case Job.SUBORDINATE: {
				const map = App.EndWeek.saVars.subSlaveMap;
				const curSubs = map.get(slave.subTarget);
				if (curSubs) {
					curSubs.push(slave.ID);
				} else {
					map.set(slave.subTarget, [slave.ID]);
				}
				break;
			}
		}

		if (slave.bellyPain !== 0) {
			slave.bellyPain = 0;
		}

		/* preg speed and advance*/

		if (slave.preg > 0) {
			let pregSpeed = 1; // base speed is normal
			if (slave.pregControl === GestationDrug.SLOW) {
				pregSpeed = 0.25;
			} else if (slave.pregControl === GestationDrug.FAST) {
				pregSpeed = 2;
			}

			if (slave.broodmother === 1 && slave.broodmotherOnHold !== 1) { /* broodmother advance block */
				if ((V.week / slave.broodmotherFetuses === Math.round(V.week / slave.broodmotherFetuses)) && slave.broodmotherFetuses < 1) {
					// one fetus in few week - selection and adding
					WombImpregnate(slave, 1, slave.pregSource, 0);
				} else {
					// one or more fetuses in one week
					WombImpregnate(slave, Math.floor(slave.broodmotherFetuses), slave.pregSource, 0); /* really 0, it's will be advanced right few lines down.*/
				}
				if (slave.ovaryAge >= 47) {
					slave.broodmotherOnHold = 1;
					slave.broodmotherCountDown = 37 - WombMinPreg(slave);
				}
			}

			WombProgress(slave, pregSpeed, 1); /* drugs can affect speed of gestation, but not a real time */

			slave.pregKnown = 1;
			slave.pregWeek++;
		}
		if (slave.pregWeek < 0) { // postpartum state
			slave.pregWeek++;
		}

		SetBellySize(slave); /* here will be also set through WombGetVolume .bellyPreg, .pregType, to current values. */

		/* end of preg speed and advance*/

		/* set up sexual need */
		if (slave.devotion >= -50) {
			if (slave.energy > 20) {
				if (slave.physicalAge < slave.pubertyAgeXY && slave.genes === GenderGenes.MALE && slave.energy <= 80) {
					slave.need = slave.energy / 3;
				} else if (slave.physicalAge < slave.pubertyAgeXX && slave.genes === GenderGenes.FEMALE && slave.energy <= 80) {
					slave.need = slave.energy / 3;
				} else if (slave.physicalAge < 50) {
					slave.need = slave.energy;
				} else {
					slave.need = slave.energy / 5;
				}
				if (slave.balls > 0 && slave.pubertyXY === 1 && slave.physicalAge <= (slave.pubertyAgeXY + 1) && (slave.physicalAge > slave.pubertyAgeXY) && slave.physicalAge < 18) {
					slave.need *= 1.25;
				}
				if ((slave.ovaries === 1 || slave.mpreg === 1) && slave.pubertyXX === 1 && slave.physicalAge <= (slave.pubertyAgeXX + 1) && (slave.physicalAge > slave.pubertyAgeXX) && slave.physicalAge < 18) {
					slave.need *= 1.25;
				}
				if (slave.diet === Diet.FERTILITY) {
					slave.need += 10;
				}
				if (slave.aphrodisiacs === -1) {
					slave.need *= 0.5;
				} else if (slave.aphrodisiacs === 1) {
					slave.need *= 1.5;
				} else if (slave.aphrodisiacs === 2) {
					slave.need *= 2;
				}
				poorHealthNeedReduction(slave);
				slave.need = Math.round(slave.need);
				App.EndWeek.saVars.needCapPerSlave[slave.ID] = slave.need;
			}
		}

		if (slave.fetish === Fetish.MINDBROKEN && slave.relationship === -3) {
			if (slave.kindness > 0) {
				slave.kindness--;
			}
		}

		if (slave.assignment === Job.AGENT || slave.assignment === Job.AGENTPARTNER) {
			App.SlaveAssignment.agent(slave);
		}

		// Set up torturing
		if (getPersonalAttention(slave.ID, "torture")) {
			if (!onBedRest(V.PC, true)) {
				if (slave.fetish === Fetish.MINDBROKEN) {
					App.EndWeek.saVars.slaveTortured = "broken";
				} else if (!canTalk(slave)) {
					App.EndWeek.saVars.slaveTortured = "mute";
				} else if (slave.sexualFlaw === SexualFlaw.SELFHATING) {
					App.EndWeek.saVars.slaveTortured = "self hating";
				} else if (slave.fetish === Fetish.MASOCHIST) {
					App.EndWeek.saVars.slaveTortured = "fetish";
				} else if (slave.devotion + slave.trust > 195) {
					App.EndWeek.saVars.slaveTortured = "love";
				} else {
					App.EndWeek.saVars.slaveTortured = "normal";
				}
			}
		}
	} // for (const slave of V.slaves)

	// Optimized sperm slaves cumming up the spa pool.
	if (facilities.spa.established) {
		let cum;
		for (const slave of App.Utils.sortedEmployees(App.Entity.facilities.spa)) {
			if (slave.geneMods.aggressiveSperm === 1 && isVirile(slave) && (slave.rules.release.masturbation || App.Utils.hasNonassignmentSex(slave) || slave.rules.release.facilityLeader) && slave.energy > 20 && (!S.Attendant || V.spaAggroSpermBan !== 1)) {
				cum = Math.trunc(cumAmount(slave) / 2);
				App.EndWeek.saVars.poolJizz += cum;
				App.EndWeek.saVars.poolJizzers.push({ID: slave.ID, weight: cum});
			}
		}
	}

	if (V.HeadGirlID !== 0) {
		App.EndWeek.saVars.HGEnergy++;
		const slave = slaveStateById(V.HeadGirlID);
		if (V.personalAttention.task === PersonalAttention.SUPPORT_HG && !onBedRest(V.PC, true)) {
			App.EndWeek.saVars.HGEnergy++;
			if (slave.trust > 95) {
				App.EndWeek.saVars.HGEnergy++;
			}
		}
		if (arcology.FSChineseRevivalistLaw === 1) {
			App.EndWeek.saVars.HGEnergy++;
		}
		if (slaveResting(slave)) {
			App.EndWeek.saVars.HGEnergy = 0;
		}
		if (canAchieveErection(slave)) {
			App.EndWeek.saVars.HGCum = resetHGCum(slave);
		}
		App.EndWeek.saVars.HGEnergy *= App.SlaveAssignment.PartTime.efficiencyModifier(slave);
		App.EndWeek.saVars.HGEnergy = Math.max(1, Math.floor(App.EndWeek.saVars.HGEnergy));
	}

	// Stud gets off based on impregnations, so we need to check and see if they actually do anyone
	if (V.StudID) {
		const stud = S.Stud;
		App.EndWeek.saVars.StudCum = 2 + Math.trunc(((stud.balls / 5) + (stud.energy / 95) + (stud.health.condition / 95) + (stud.devotion / 95) + (V.reproductionFormula * 5) - (stud.health.tired / 25)) * restEffects(stud, 5));
		if (stud.drugs === Drug.HYPERTESTICLE) {
			App.EndWeek.saVars.StudCum += 3;
		} else if (stud.drugs === Drug.GROWTESTICLE) {
			App.EndWeek.saVars.StudCum += 1;
		}
		if (stud.diet === Diet.CUM) {
			App.EndWeek.saVars.StudCum += 1;
		}
		let studCumLimit = App.EndWeek.saVars.StudCum;
		for (const slave of V.slaves) {
			if (studCumLimit === 0 || stud.need <= 0) {
				break;
			}
			if (canGetPregnant(slave) && canBreed(stud, slave) && slave.ID !== V.StudID) {
				stud.need -= 20;
				if (stud.fetish === Fetish.PREGNANCY) {
					stud.need -= 30;
				}
			}
		}
	}

	if (App.EndWeek.saVars.averageDick > 0) {
		App.EndWeek.saVars.averageDick = App.EndWeek.saVars.averageDick / slavesWithWorkingDicks;
	}
	App.EndWeek.saVars.freeSexualEnergy = Math.trunc(V.PC.need / 10) - (V.PCSlutContacts === 2 ? 3 : 0) + (V.personalAttention.task === PersonalAttention.SEX ? 2 : 0) - fuckSlavesLength(); // I really do not like fuckslaves reducing the number of slaves begging you for release you can handle.

	const penthouseSlaves = App.Entity.facilities.penthouse.employees().filter(s => s.rules.release.master === 1).length;
	if (App.EndWeek.saVars.freeSexualEnergy > 0 || isPlayerLusting()) {
		if (getPersonalAttention(null, "ravish") || getPersonalAttention(null, "ravished")) {
			App.EndWeek.saVars.freeSexualEnergy = 0;
		} else if (App.EndWeek.saVars.freeSexualEnergy > penthouseSlaves / 2 || isPlayerLusting()) {
			App.EndWeek.saVars.freeSexualEnergy = 3;
		} else if (App.EndWeek.saVars.freeSexualEnergy > penthouseSlaves / 4) {
			App.EndWeek.saVars.freeSexualEnergy = 2;
		} else {
			App.EndWeek.saVars.freeSexualEnergy = 1;
		}
	}
	V.PC.oldEnergy = V.PC.energy;

	// initialize slave art
	if (V.seeImages && V.seeReportImages) {
		// agents and partners are not drawn; penthouse partners and the head girl's slave will be drawn via a different mechanism (since they are larger and right-aligned)
		const undrawnJobs = [Job.AGENT, Job.AGENTPARTNER, Job.HEADGIRLSUITE];
		const drawnSlaveIDs = V.slaves.filter(s => !assignmentVisible(s) && !undrawnJobs.includes(s.assignment)).map(s => s.ID);
		// this batch renderer object will be accessible to all the facility reports
		App.EndWeek.saVars.slaveArt = new App.Art.SlaveArtBatch(drawnSlaveIDs, 0);
		res.append(App.EndWeek.saVars.slaveArt.writePreamble());
	}

	/**
	 * Accordion
	 * @version 0.7RC
	 * @author 000-250-006
	 *
	 * @param array _facListArr
	 *	Multidimensional temporary array
	 *	0: The DOM function for the facility's report
	 *	1: A facility object, or the title of the report if there is no facility object
	 *	2: If there is no facility object, a truthy value indicating whether the facility exists
	 *	3: If there is no facility object, the maximum capacity of the facility
	 *
	 * TODO: This is a proof of concept construct, if it works and cuts overhead, intended to create an object
	 *	for deeper use in multiple locations, including streamlining reports/facilities code to one widget
	 * TODO: Figure out if this would be better as an object rather than an array for overhead
	 *	StoryInit also?
	 */

	/**
	 * @type {Array<Array<(function(): FC.EndWeek.FacilityReport)|App.Entity.Facilities.SingleJobFacility|string|number| App.Entity.Facilities.Incubator>>}
	 */
	const facListArr = [
		[App.EndWeek.clinicReport, App.Entity.facilities.clinic],
		[App.EndWeek.cellblockReport, App.Entity.facilities.cellblock],
		[App.EndWeek.schoolroomReport, App.Entity.facilities.schoolroom],
		[App.EndWeek.spaReport, App.Entity.facilities.spa],
		 /** The above four facilities must be kept in order as they can release slaves into other facilities. This order has the least chances of allowing reports to slip through the cracks. **/
		[App.EndWeek.arcadeReport, App.Entity.facilities.arcade],
		[App.EndWeek.brothelReport, App.Entity.facilities.brothel],
		[App.EndWeek.clubReport, App.Entity.facilities.club],
		[App.EndWeek.dairyReport, App.Entity.facilities.dairy],
		[App.EndWeek.farmyardReport, App.Entity.facilities.farmyard],
		[App.EndWeek.servantsQuartersReport, App.Entity.facilities.servantsQuarters],
		[App.Facilities.Nursery.nurseryReport, App.Entity.facilities.nursery],
		[App.Facilities.Nursery.childrenReport, "Nursery Children", V.nurseryCribs, V.nurseryChildren],
		[App.EndWeek.incubatorReport, App.Entity.facilities.incubator],
		[App.EndWeek.masterSuiteReport, App.Entity.facilities.masterSuite],
		[App.EndWeek.penthouseReport, "The Penthouse"],
		[App.EndWeek.rulesAssistantReport, "Rules Assistant", V.rulesAssistantAuto], /** should be last — may reassign slaves **/
		[App.EndWeek.labReport, "Lab", V.researchLab.level]
	];

	function _getReportElementStats(ar) {
		if (typeof ar[1] === "string") {
			if (ar[1] === "The Penthouse") { // special case because we have to combine several facilities
				return {
					name: ar[1],
					established: 1,
					entriesNumberInitial: initialPenthouseTotalEmployeesCount,
					entriesNumber: _countPenthousePopulation(),
					manager: null, // Recruiter is technically the "manager" according to the facility system, but ALL the penthouse leaders (inc. HG/BG) get counted in general population instead
					alwaysExists: 0,
				};
			} else {
				return {
					name: ar[1],
					established: ar[2],
					entriesNumberInitial: null,
					entriesNumber: ar[3],
					manager: null,
					alwaysExists: ar[3] === undefined ? 1 : 0,
				};
			}
		} else {
			return {
				name: capFirstChar(ar[1].name),
				established: ar[1].established,
				entriesNumberInitial: initialEmployeesCount[ar[1].desc.baseName],
				entriesNumber: ar[1].hostedSlaves(),
				manager: ar[1].manager,
				alwaysExists: 0,
			};
		}
	}

	// create an accordion if fav report is enabled
	const favHeader = document.createDocumentFragment();
	App.UI.DOM.appendNewElement("span", favHeader, `Favorites Report`, ["title"]);
	const favSpan = App.UI.DOM.makeElement("span"); // shows amount of slaves there
	favHeader.appendChild(favSpan);
	const favDiv = App.UI.DOM.makeElement("div");
	if (V.favSeparateReport === 1) {
		res.append(App.UI.DOM.accordion(favHeader, favDiv, V.useAccordion > 0)); // We don't know ahead of time if it has any slaves inside though...
	}
	let favSlaveAmount = 0;
	// ^ none of this is used if fav report is disabled

	for (const facSubArr of facListArr) {
		// needs to be inside the loop after the report passage to get the employees number after re-assignments
		const stats = _getReportElementStats(facSubArr);

		if (stats.established) { // Do we have one of these facilities?
			const header = document.createDocumentFragment();
			App.UI.DOM.appendNewElement("span", header, `${stats.name} Report`, ["title"]);

			if (!stats.alwaysExists) {
				const diffNum = stats.entriesNumber - stats.entriesNumberInitial;
				const diffText = diffNum === 0 ? "" : (diffNum > 0 ? ` (+${diffNum})` : ` (${diffNum})`);
				// Display the bar with information
				if (stats.entriesNumber > 0) {
					App.UI.DOM.appendNewElement("span", header,
						`${stats.entriesNumber}${diffText} slave${stats.entriesNumber !== 1 ? "s" : ""} ${
							stats.manager && stats.manager.currentEmployee
								? `and ${capFirstChar(stats.manager.desc.position)}` : ""
						} in ${stats.name}`, ["info", "green"]);
				} else if (stats.manager && stats.manager.currentEmployee) {
					App.UI.DOM.appendNewElement("span", header,
						`${diffText} Only ${capFirstChar(stats.manager.desc.position)} in ${stats.name}`,
						["info", "orange"]);
				} else {
					App.UI.DOM.appendNewElement("span", header, `${diffText} ${stats.name} is empty`,
						["info", "gray"]);
				}
			}

			// Is there anyone inside the facility?
			if (stats.entriesNumber > 0 || (stats.manager && stats.manager.currentEmployee) || stats.alwaysExists) {
				// @ts-ignore - the first element of the subarray is always callable but TS isn't smart enough to figure that out
				const reportContent = facSubArr[0]();

				const f = new DocumentFragment();
				f.append(reportContent.before);
				for (const report of reportContent.slaves) {
					if (V.favSeparateReport === 1 && V.favorites.includes(report.id)) {
						favDiv.appendChild(report.report);
						favSlaveAmount++;
					} else if (V.showEWD !== 0 || facSubArr[1] === "The Penthouse") {
						f.append(report.report);
					}
				}
				f.append(reportContent.after);

				res.append(App.UI.DOM.accordion(header, App.UI.DOM.makeElement("div", f), V.useAccordion > 0));
			} else {
				res.append(App.UI.DOM.accordion(header));
			}
		}
	}

	// fill out fav report passage
	if (V.favSeparateReport === 1) {
		favSpan.innerText=`${favSlaveAmount} slave${favSlaveAmount !== 1 ? "s" : ""} are favorites`;
		if (favSlaveAmount > 0) {
			favSpan.classList.add("info", "green");
		} else {
			favSpan.classList.add("info", "gray");
		}
	}

	/* Clean up global SA variables */
	App.EndWeek.saVars = null;

	return res;

	function _countPenthousePopulation() {
		const fs = App.Entity.facilities;
		return fs.penthouse.totalEmployeesCount + fs.headGirlSuite.totalEmployeesCount + fs.armory.totalEmployeesCount;
	}

	function _printSlaveError(warning, slave) {
		const warningLine = App.UI.DOM.appendNewElement("div", res);
		App.UI.DOM.appendNewElement("span", warningLine, warning + `for ${slave.slaveName}.`, "yellow");
		warningLine.appendChild(document.createTextNode(" Report this as a bug if it reoccurs."));
	}

	/**
	 * Check key employees. Fire those who do not satisfy their job requirements
	 * @param {App.Entity.SlaveState} slave
	 */
	function _ensureEmployeeMeetsJobRequirements(slave) {
		switch (slave.assignment) {
			case Job.HEADGIRL:
				if (slave.fetish === Fetish.MINDBROKEN) {
					_printSlaveUnassignedNote(slave, "is mindbroken");
					V.HeadGirlID = 0;
				} else if (!canTalk(slave)) {
					_printSlaveUnassignedNote(slave, "can't give slaves verbal orders");
					V.HeadGirlID = 0;
				} else if (!canWalk(slave)) {
					_printSlaveUnassignedNote(slave, "is no longer independently mobile");
					V.HeadGirlID = 0;
				} else if (!canHold(slave)) {
					_printSlaveUnassignedNote(slave, "is no longer able to handle your slaves");
					V.HeadGirlID = 0;
				} else if (!canSee(slave)) {
					_printSlaveUnassignedNote(slave, "can no longer see");
					V.HeadGirlID = 0;
				} else if (!canHear(slave)) {
					_printSlaveUnassignedNote(slave, "can no longer hear");
					V.HeadGirlID = 0;
				} else if (slave.preg >= 37 && slave.broodmother === 2) {
					_printSlaveUnassignedNote(slave, "spends so much time giving birth and laboring that", `${getPronouns(slave).he} cannot effectively serve as your Head Girl any longer`);
					V.HeadGirlID = 0;
				} else if (slave.devotion <= 20) {
					_printSlaveUnassignedNote(slave, "is no longer even accepting of you");
					V.HeadGirlID = 0;
				}
				if (V.HeadGirlID === 0) {
					removeJob(slave, Job.HEADGIRL);
				}
				break;
			case Job.RECRUITER:
				V.RecruiterID = slave.ID;
				if (slave.fetish === Fetish.MINDBROKEN) {
					_printSlaveUnassignedNote(slave, "is mindbroken");
					V.RecruiterID = 0;
				} else if (!canTalk(slave)) {
					_printSlaveUnassignedNote(slave, "can't verbally entice marks");
					V.RecruiterID = 0;
				} else if (slave.preg >= 37 && slave.broodmother === 2) {
					_printSlaveUnassignedNote(slave, "spends so much time giving birth and laboring that", `${getPronouns(slave).he} cannot effectively serve as your recruiter any longer`);
					V.RecruiterID = 0;
				} else if (!canWalk(slave)) {
					_printSlaveUnassignedNote(slave, "is no longer independently mobile");
					V.RecruiterID = 0;
				} else if (!canSee(slave)) {
					_printSlaveUnassignedNote(slave, "can no longer see");
					V.RecruiterID = 0;
				} else if (!canHear(S.Recruiter)) {
					_printSlaveUnassignedNote(slave, "an no longer hear");
					V.RecruiterID = 0;
				}
				if (V.RecruiterID === 0) {
					removeJob(slave, Job.RECRUITER);
				}
				break;
			case Job.MADAM:
				if (!canTalk(slave)) {
					_printSlaveUnassignedNote(slave, "can't give whores verbal orders");
					V.MadamID = 0;
				} else if (slave.preg >= 37 && slave.broodmother === 2) {
					_printSlaveUnassignedNote(slave, "spends so much time giving birth and laboring that", `${getPronouns(slave).he} cannot effectively serve as your Madam any longer`);
					V.MadamID = 0;
				} else if (slave.fetish === Fetish.MINDBROKEN) {
					_printSlaveUnassignedNote(slave, "is mindbroken");
					V.MadamID = 0;
				} else if (!canWalk(slave)) {
					_printSlaveUnassignedNote(slave, "is no longer independently mobile");
					V.MadamID = 0;
				} else if (!canSee(slave)) {
					_printSlaveUnassignedNote(slave, "can no longer see");
					V.MadamID = 0;
				} else if (!canHear(slave)) {
					_printSlaveUnassignedNote(slave, "can no longer hear");
					V.MadamID = 0;
				} else if (!canHold(slave)) {
					_printSlaveUnassignedNote(slave, `can no longer handle ${getPronouns(slave).his} underlings`);
					V.MadamID = 0;
				}
				if (V.MadamID === 0) {
					removeJob(slave, Job.MADAM);
				}
				break;
			case Job.DJ:
				if (!canTalk(slave)) {
					_printSlaveUnassignedNote(slave, "can't speak");
					V.djID = 0;
				} else if (slave.preg >= 37 && slave.broodmother === 2) {
					_printSlaveUnassignedNote(slave, "spends so much time giving birth and laboring that", `${getPronouns(slave).he} cannot effectively serve as your DJ any longer`);
					V.djID = 0;
				} else if (slave.fetish === Fetish.MINDBROKEN) {
					_printSlaveUnassignedNote(slave, "is mindbroken");
					V.djID = 0;
				} else if (!canWalk(slave)) {
					_printSlaveUnassignedNote(slave, "is no longer independently mobile");
					V.djID = 0;
				} else if (!canHear(slave)) {
					_printSlaveUnassignedNote(slave, "can no longer hear");
					V.djID = 0;
				}
				if (V.djID === 0) {
					removeJob(slave, Job.DJ);
				}
				break;
			case Job.MILKMAID:
				if (slave.fetish === Fetish.MINDBROKEN) {
					_printSlaveUnassignedNote(slave, "is mindbroken");
					V.MilkmaidID = 0;
				} else if (slave.preg >= 37 && slave.broodmother === 2) {
					_printSlaveUnassignedNote(slave, "spends so much time giving birth and laboring that", `${getPronouns(slave).he} cannot effectively serve as your Milkmaid any longer`);
					V.MilkmaidID = 0;
				} else if (!canWalk(slave)) {
					_printSlaveUnassignedNote(slave, "is no longer independently mobile");
					V.MilkmaidID = 0;
				} else if (!canHold(slave)) {
					_printSlaveUnassignedNote(slave, "can no longer handle nor milk your slaves");
					V.MilkmaidID = 0;
				} else if (!canSee(slave)) {
					_printSlaveUnassignedNote(slave, "can no longer see");
					V.MilkmaidID = 0;
				} else if (!canHear(slave)) {
					_printSlaveUnassignedNote(slave, "can no longer hear");
					V.MilkmaidID = 0;
				} else if (V.dairyRestraintsSetting === 2) {
					_printSlaveUnassignedNote(slave, `has been made redundant by ${V.dairyName}'s industrialization and automation`);
					V.MilkmaidID = 0;
				}
				if (V.MilkmaidID === 0) {
					removeJob(slave, Job.MILKMAID);
				}
				break;
			case Job.FARMER:
				if (S.Farmer.fetish === Fetish.MINDBROKEN) {
					_printSlaveUnassignedNote(slave, "is mindbroken");
					V.FarmerID = 0;
				} else if (S.Farmer.preg > 37 && S.Farmer.broodmother === 2) {
					_printSlaveUnassignedNote(slave, "spends so much time giving birth and laboring that", `${getPronouns(slave).he} cannot effectively serve as your Farmer any longer`);
					V.FarmerID = 0;
				} else if (!canWalk(S.Farmer)) {
					_printSlaveUnassignedNote(slave, "is no longer independently mobile");
					V.FarmerID = 0;
				} else if (!canHold(S.Farmer)) {
					_printSlaveUnassignedNote(slave, "can no longer grip things");
					V.FarmerID = 0;
				} else if (!canSee(S.Farmer)) {
					_printSlaveUnassignedNote(slave, "can no longer see");
					V.FarmerID = 0;
				} else if (!canHear(S.Farmer)) {
					_printSlaveUnassignedNote(slave, "can no longer hear");
					V.FarmerID = 0;
				}
				if (V.FarmerID === 0) {
					removeJob(slave, Job.FARMER);
				}
				break;
			case Job.STEWARD:
				if (!canTalk(slave)) {
					_printSlaveUnassignedNote(slave, "can't give servants verbal orders");
					V.StewardessID = 0;
				} else if (slave.preg >= 37 && slave.broodmother === 2) {
					_printSlaveUnassignedNote(slave, "spends so much time giving birth and laboring that", `${getPronouns(slave).he} cannot effectively serve as your Stewardess any longer`);
					V.StewardessID = 0;
				} else if (slave.fetish === Fetish.MINDBROKEN) {
					_printSlaveUnassignedNote(slave, "is mindbroken");
					V.StewardessID = 0;
				} else if (!canWalk(slave)) {
					_printSlaveUnassignedNote(slave, "is no longer independently mobile");
					V.StewardessID = 0;
				} else if (!canHold(slave)) {
					_printSlaveUnassignedNote(slave, `can no longer handle ${getPronouns(slave).his} underlings nor effectively clean`);
					V.StewardessID = 0;
				} else if (!canSee(slave)) {
					_printSlaveUnassignedNote(slave, "can no longer see");
					V.StewardessID = 0;
				} else if (!canHear(slave)) {
					_printSlaveUnassignedNote(slave, "can no longer hear");
					V.StewardessID = 0;
				}
				if (V.StewardessID === 0) {
					removeJob(slave, Job.STEWARD);
				}
				break;
			case Job.TEACHER:
				if (!canTalk(slave)) {
					_printSlaveUnassignedNote(slave, "can't give verbal instruction");
					V.SchoolteacherID = 0;
				} else if (slave.preg >= 37 && slave.broodmother === 2) {
					_printSlaveUnassignedNote(slave, "spends so much time giving birth and laboring that", `${getPronouns(slave).he} cannot effectively serve as your Schoolteacher any longer`);
					V.SchoolteacherID = 0;
				} else if (slave.fetish === Fetish.MINDBROKEN) {
					_printSlaveUnassignedNote(slave, "is mindbroken");
					V.SchoolteacherID = 0;
				} else if (!canSee(slave)) {
					_printSlaveUnassignedNote(slave, "can no longer see");
					V.SchoolteacherID = 0;
				} else if (!canHear(slave)) {
					_printSlaveUnassignedNote(slave, "can no longer hear");
					V.SchoolteacherID = 0;
				}
				if (V.SchoolteacherID === 0) {
					removeJob(slave, Job.TEACHER);
				}
				break;
			case Job.WARDEN:
				if (!canWalk(slave)) {
					_printSlaveUnassignedNote(slave, "is no longer independently mobile");
					V.WardenessID = 0;
				} else if (!canHold(slave)) {
					_printSlaveUnassignedNote(slave, `can no longer handle ${getPronouns(slave).his} charges`);
					V.WardenessID = 0;
				} else if (slave.preg >= 37 && slave.broodmother === 2) {
					_printSlaveUnassignedNote(slave, "spends so much time giving birth and laboring that", `${getPronouns(slave).he} cannot effectively serve as your Wardeness any longer`);
					V.WardenessID = 0;
				} else if (!canSee(slave)) {
					_printSlaveUnassignedNote(slave, "can no longer see");
					V.WardenessID = 0;
				} else if (!canHear(slave)) {
					_printSlaveUnassignedNote(slave, "can no longer hear");
					V.WardenessID = 0;
				}
				if (V.WardenessID === 0) {
					removeJob(slave, Job.WARDEN);
				}
				break;
			case Job.ATTENDANT:
				if (slave.fetish === Fetish.MINDBROKEN) {
					_printSlaveUnassignedNote(slave, "is mindbroken");
					V.AttendantID = 0;
				} else if (slave.preg >= 37 && slave.broodmother === 2) {
					_printSlaveUnassignedNote(slave, "spends so much time giving birth and laboring that", `${getPronouns(slave).he} cannot effectively serve as your Attendant any longer`);
					V.AttendantID = 0;
				} else if (!canWalk(slave)) {
					_printSlaveUnassignedNote(slave, "is no longer independently mobile");
					V.AttendantID = 0;
				} else if (!canHold(slave)) {
					_printSlaveUnassignedNote(slave, `can no longer support ${getPronouns(slave).his} charges`);
					V.AttendantID = 0;
				} else if (!canHear(slave)) {
					_printSlaveUnassignedNote(slave, "can no longer hear");
					V.AttendantID = 0;
				}
				if (V.AttendantID === 0) {
					removeJob(slave, Job.ATTENDANT);
				}
				break;
			case Job.MATRON:
				if (slave.fetish === Fetish.MINDBROKEN) {
					_printSlaveUnassignedNote(slave, "is mindbroken");
					V.MatronID = 0;
				} else if (slave.preg >= 37 && slave.broodmother === 2) {
					_printSlaveUnassignedNote(slave, "spends so much time giving birth and laboring that", `${getPronouns(slave).he} cannot effectively serve as your Matron any longer`);
					V.MatronID = 0;
				} else if (!canWalk(slave)) {
					_printSlaveUnassignedNote(slave, "is no longer independently mobile");
					V.MatronID = 0;
				} else if (!canHold(slave)) {
					_printSlaveUnassignedNote(slave, "can no longer hold infants");
					V.MatronID = 0;
				} else if (!canHear(slave)) {
					_printSlaveUnassignedNote(slave, "can no longer hear");
					V.MatronID = 0;
				} else if (!canSee(slave)) {
					_printSlaveUnassignedNote(slave, "can no longer see");
					V.MatronID = 0;
				}
				if (V.MatronID === 0) {
					removeJob(slave, Job.MATRON);
				}
				break;
			case Job.NURSE:
				if (slave.fetish === Fetish.MINDBROKEN) {
					_printSlaveUnassignedNote(slave, "is mindbroken");
					V.NurseID = 0;
				} else if (slave.preg >= 37 && slave.broodmother === 2) {
					_printSlaveUnassignedNote(slave, "spends so much time giving birth and laboring that", `${getPronouns(slave).he} cannot effectively serve as your Nurse any longer`);
					V.NurseID = 0;
				} else if (!canWalk(slave)) {
					_printSlaveUnassignedNote(slave, "is no longer independently mobile");
					V.NurseID = 0;
				} else if (!canHold(slave)) {
					_printSlaveUnassignedNote(slave, "can no longer hold onto patients");
					V.NurseID = 0;
				} else if (!canSee(slave)) {
					_printSlaveUnassignedNote(slave, "can no longer see");
					V.NurseID = 0;
				} else if (!canHear(slave)) {
					_printSlaveUnassignedNote(slave, "can no longer hear");
					V.NurseID = 0;
				}
				if (V.NurseID === 0) {
					removeJob(slave, Job.NURSE);
				}
				break;
			case Job.BODYGUARD:
				if (slave.fetish === Fetish.MINDBROKEN) {
					_printSlaveUnassignedNote(slave, "is mindbroken");
					V.BodyguardID = 0;
				} else if (!canWalk(slave)) {
					_printSlaveUnassignedNote(slave, "is no longer independently mobile");
					V.BodyguardID = 0;
				} else if (!canHold(slave)) {
					_printSlaveUnassignedNote(slave, "is no longer able to hold a weapon");
					V.BodyguardID = 0;
				} else if (slave.preg >= 37 && slave.broodmother === 2) {
					_printSlaveUnassignedNote(slave, "spends so much time giving birth and laboring that", `${getPronouns(slave).he} cannot effectively serve as your bodyguard any longer`);
					V.BodyguardID = 0;
				} else if (!canSee(slave)) {
					_printSlaveUnassignedNote(slave, "can no longer see");
					V.BodyguardID = 0;
				} else if (!canHear(slave)) {
					_printSlaveUnassignedNote(slave, "can no longer hear");
					V.BodyguardID = 0;
				}
				if (V.BodyguardID === 0) {
					removeJob(slave, Job.BODYGUARD);
				}
				break;
			case Job.SUBORDINATE:
				if (slave.subTarget === -1) {
					V.StudID = slave.ID;
					if (slave.balls === 0) {
						_printSlaveUnassignedNote(slave, "no longer has sperm", null, "@Stud");
						V.StudID = 0;
					} else if (slave.ballType === "sterile") {
						_printSlaveUnassignedNote(slave, "no longer produces potent sperm", null, "@Stud");
						V.StudID = 0;
					} else if (slave.pubertyXY !== 1) {
						_printSlaveUnassignedNote(slave, "no longer produces mature sperm", null, "@Stud");
						V.StudID = 0;
					} else if (slave.vasectomy === 1) {
						_printSlaveUnassignedNote(slave, "shoots blanks due to a vasectomy", null, "@Stud");
						V.StudID = 0;
					} else if (V.universalRulesImpregnation !== "Stud") {
						_printSlaveUnassignedNote(slave, "is", "no longer needed as a Stud", "@Stud");
					}
					if (V.StudID === 0) {
						slave.subTarget = 0;
					}
				}
				break;
			case Job.AGENT: {
				const arc = V.arcologies.find((a) => a.leaderID === slave.ID);
				if (!arc) {
					_printSlaveUnassignedNote(slave, "is not assigned to an arcology");
					removeJob(slave, Job.AGENT);
				} else if (arc.government !== "your agent") {
					_printSlaveUnassignedNote(slave, "is assigned to an arcology that is not lead by an agent");
					removeJob(slave, Job.AGENT);
				}
				break;
			}
		}

		if (slave.ID === V.LurcherID) {
			if (!canWalk(slave)) {
				_printSlaveUnassignedNote(slave, "is no longer able to run", null, Job.LURCHER);
				V.LurcherID = 0;
			} else if (!canHold(slave)) {
				_printSlaveUnassignedNote(slave, "is no longer able to catch the hares", null, Job.LURCHER);
				V.LurcherID = 0;
			} else if (!canHear(slave) && !canSee(slave)) {
				_printSlaveUnassignedNote(slave, "is no longer able to track the hares", null, Job.LURCHER);
				V.LurcherID = 0;
			} else if (slave.bellyPreg >= 60000) {
				_printSlaveUnassignedNote(slave, "is too pregnant to run", null, Job.LURCHER);
				V.LurcherID = 0;
			}
		}

		if (V.pit) {
			const trainee = App.Entity.facilities.pit.job("trainee").isEmployed(slave);
			const fighter = App.Entity.facilities.pit.job("fighter").isEmployed(slave);
			if (trainee || fighter) {
				if (!canWalk(slave)) {
					_printSlaveUnassignedNote(slave, "is no longer independently mobile",
						`and cannot fight any more. ${getPronouns(slave).He} has been removed from ${App.Entity.facilities.pit.name} roster`);
					removeJob(slave, Job.ARENA, true);
					removeJob(slave, Job.PIT, true);
				} else if (!canHold(slave)) {
					_printSlaveUnassignedNote(slave, "is no longer able to strike",
						`and cannot fight any more. ${getPronouns(slave).he} has been removed from ${App.Entity.facilities.pit.name} roster`);
					removeJob(slave, Job.ARENA, true);
					removeJob(slave, Job.PIT, true);
				}
			}
			if (trainee) {
				if (slave.skill.combat >= 100) {
					_printSlaveUnassignedNote(slave, "has nothing left to learn",
						`and has been removed from ${App.Entity.facilities.pit.name}`);
					removeJob(slave, Job.ARENA, true);
				}
				if ([Job.AGENT, Job.AGENTPARTNER].includes(slave.assignment)) {
					_printSlaveUnassignedNote(slave, "is now outside of your arcology",
						`and cannot train combat any more`);
					removeJob(slave, Job.ARENA, true);
				}
			}
		}
	}

	/**
	 *
	 * @param {App.Entity.SlaveState} slave
	 * @param {string} condition
	 * @param {string} [outcome]
	 * @param {string} [assignment]
	 */
	function _printSlaveUnassignedNote(slave, condition, outcome, assignment) {
		const cantServeNotes = new Map([
			[Job.HEADGIRL, "cannot serve as your Head Girl any more"],
			[Job.RECRUITER, "and cannot serve as your recruiter any more"],
			[Job.MADAM, "cannot serve as your Madam any more"],
			[Job.DJ, "cannot serve as your DJ any more"],
			[Job.MILKMAID, "cannot serve as your Milkmaid any more"],
			[Job.FARMER, "cannot serve as your Farmer any more"],
			[Job.STEWARD, "cannot serve as your Stewardess any more"],
			[Job.TEACHER, "cannot serve as your Schoolteacher any more"],
			[Job.WARDEN, "cannot serve as your Wardeness any more"],
			[Job.ATTENDANT, "cannot serve as your Attendant any more"],
			[Job.BODYGUARD, " cannot serve as your Bodyguard any more"],
			["@Stud", "cannot serve as a Stud any more"],
			[Job.NURSE, "cannot serve as your Nurse any more"],
			[Job.MATRON, "cannot serve as your Matron any more"],
			[Job.LURCHER, "cannot course as a lurcher"],
			[Job.AGENT, "cannot serve as an Agent any more"]
		]);

		const warningLine = App.UI.DOM.appendNewElement("div", res);
		App.UI.DOM.appendNewElement("span", warningLine, slave.slaveName, 'slave-name');
		warningLine.appendChild(document.createTextNode(' ' + condition + ' '));
		App.UI.DOM.appendNewElement("span", warningLine, outcome ? outcome + "." : `and ${cantServeNotes.get(assignment || slave.assignment)}.`, "yellow");
	}
};
