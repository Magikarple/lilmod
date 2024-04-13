/**
 * @returns {FC.EndWeek.FacilityReport}
 */
App.EndWeek.arcadeReport = function() {
	const beforeFrag = new DocumentFragment();
	let r;

	const arcadeStats = document.createElement("span");
	beforeFrag.append(arcadeStats);

	const slaves = App.Utils.sortedEmployees(App.Entity.facilities.arcade);
	const slavesLength = slaves.length;

	const cockMilkedSlaves = [];
	const milkedSlaves = [];
	const boobsImplantedSlaves = [];
	const prostatesImplantedSlaves = [];
	let vasectomiesUndone = 0;
	let milkProfits = 0;
	let profits = 0;

	// Statistics gathering
	V.facility = V.facility || {};
	V.facility.arcade = initFacilityStatistics(V.facility.arcade);
	const arcadeNameCaps = capFirstChar(V.arcadeName);

	if (slavesLength > 1) {
		App.UI.DOM.appendNewElement("p", beforeFrag, `There are ${slavesLength} inmates confined in ${V.arcadeName}.`, ["bold", "indent"]);
	} else {
		App.UI.DOM.appendNewElement("p", beforeFrag, `There is one inmate confined in ${V.arcadeName}.`, ["bold", "indent"]);
	}
	r = [];
	if (V.arcologies[0].FSDegradationist > 20) {
		if (V.arcologies[0].FSDegradationistLaw === 1) {
			r.push(`The tenants located near the arcade consider the facility a normal part of their surroundings, including the crowd of menial slaves waiting their turn spills out into the hallway, 24 hours a day.`);
		} else {
			r.push(`The tenants located near the arcade consider the facility a normal part of their surroundings.`);
		}
	} else if (V.arcologies[0].FSPaternalist > 20) {
		r.push(`The tenants located near the arcade consider it an <span class="red">intolerable</span> establishment.`);
	}
	App.Events.addNode(beforeFrag, r, "div", "indent");
	if (V.arcadeDecoration !== "standard") {
		App.Events.addNode(beforeFrag, [`${arcadeNameCaps}'s customers enjoy <span class="green">getting off in ${V.arcadeDecoration} surroundings.</span>`], "p", "indent");
	}

	/**
	 * @type {Array<FC.EndWeek.SlaveReport>}
	 */
	const slaveReports = [];

	for (const slave of App.SlaveAssignment.reportSlaves(slaves)) {
		r = [];
		/* for the included passages */

		/* Perform facility based rule changes */
		if (slave.clothes !== "a Fuckdoll suit") {
			slave.clothes = "no clothing";
		}
		/* Health */
		if (V.arcadeUpgradeHealth === 2 && slave.health.condition < 40) {
			improveCondition(slave, 2);
		} else if (slave.health.condition > 20) {
			healthDamage(slave, 5);
		} else if (V.arcadeUpgradeHealth === 1 && slave.health.condition < -30) {
			improveCondition(slave, 2);
		} else if (slave.health.condition > -50) {
			healthDamage(slave, 3);
		} else if (slave.health.condition > -90) {
			healthDamage(slave, 1);
		}
		/* Curatives */
		if (V.arcadeUpgradeHealth === 2) {
			slave.curatives = 2;
		} else if (V.arcadeUpgradeHealth === 1) {
			slave.curatives = 1;
		}
		/* Stimulation or lack thereof trust/devotion effect */
		if (V.arcadeUpgradeInjectors > 0) {
			if (V.arcadeUpgradeInjectors === 2) {
				slave.aphrodisiacs = 2;
			}
			slave.devotion -= 5;
			slave.trust -= 10;
		} else {
			slave.trust -= 5;
		}
		/* Muscles */
		if (slave.muscles > -100) {
			slave.muscles--;
		}
		const oldCash = V.cash;
		if ((V.favSeparateReport === 1 && V.favorites.includes(slave.ID)) || V.showEWD !== 0) {
			const {He} = getPronouns(slave);
			const slaveEntry = App.UI.DOM.makeElement("div", null, ["slave-report"]);
			const artSpan = App.UI.DOM.appendNewElement("span", slaveEntry);
			slaveEntry.append(App.SlaveAssignment.saSlaveIntro(slave, `is confined in ${V.arcadeName}.`));

			App.Events.addNode(
				slaveEntry,
				[
					He,
					App.SlaveAssignment.workAGloryHole(slave),
				],
				"div",
				"indent"
			);
			App.SlaveAssignment.appendSlaveArt(artSpan, slave);

			profits += V.cash - oldCash;

			if (V.arcadeUpgradeCollectors > 0) {
				applyCollectors(slave);
			}
			if (slave.inflation > 0) {
				deflate(slave);
			}

			slaveEntry.append(App.SlaveAssignment.standardSlaveReport(slave, false));

			slaveReports.push({
				id: slave.ID,
				report: slaveEntry
			});
		} else {
			// discard return values silently
			App.SlaveAssignment.workAGloryHole(slave);

			profits += V.cash - oldCash;

			if (V.arcadeUpgradeCollectors > 0) {
				applyCollectors(slave);
			}
			if (slave.inflation > 0) {
				deflate(slave);
			}

			App.SlaveAssignment.standardSlaveReport(slave, true);
		}
	}

	const afterFrag = new DocumentFragment();

	if (slavesLength + V.fuckdolls > 0) {
		r = [];
		if (milkedSlaves.length > 0) {
			if (milkedSlaves.length === 1) {
				const {his} = getPronouns(milkedSlaves[0]);
				r.push(`One of them is lactating and spends ${his} time in ${V.arcadeName} being simultaneously milked and fucked.`);
			} else {
				r.push(`${capFirstChar(num(milkedSlaves.length))} of them are lactating and spend their time in ${V.arcadeName} being simultaneously milked and fucked.`);
			}
		}

		if (vasectomiesUndone > 0) {
			if (vasectomiesUndone === 1) {
				r.push(`One`);
			} else {
				r.push(capFirstChar(num(vasectomiesUndone)));
			}
			r.push(`of them had severed vas deferens, so they were reattached to allow sperm through, costing <span class="red">${cashFormat(V.surgeryCost * vasectomiesUndone)}.</span>`);
		}

		if (boobsImplantedSlaves.length > 0) {
			if (boobsImplantedSlaves.length === 1) {
				const {he} = getPronouns(boobsImplantedSlaves[0]);
				r.push(`One of them was not lactating, so ${he} was`);
			} else {
				r.push(`${capFirstChar(num(boobsImplantedSlaves.length))} of them were not lactating, so they were`);
			}
			r.push(`implanted with long-acting lactation inducing drugs, costing <span class="red">${cashFormat(V.surgeryCost * boobsImplantedSlaves.length)}.</span>`);
		}

		if (prostatesImplantedSlaves.length > 0) {
			if (prostatesImplantedSlaves.length === 1) {
				const {he} = getPronouns(prostatesImplantedSlaves[0]);
				r.push(`One of them was not producing the maximum possible amount of precum, so ${he} was`);
			} else {
				r.push(`${capFirstChar(num(prostatesImplantedSlaves.length))} of them were not producing the maximum possible amount of precum, so they were`);
			}
			r.push(`implanted with long-acting prostate stimulation drugs, costing <span class="red">${cashFormat(V.surgeryCost * prostatesImplantedSlaves.length)}.</span>`);
		}

		if (cockMilkedSlaves.length > 0) {
			if (cockMilkedSlaves.length === 1) {
				const {he} = getPronouns(cockMilkedSlaves[0]);
				r.push(`One of them retains testicles and is brutally cockmilked as ${he} is used.`);
			} else {
				r.push(`${capFirstChar(num(cockMilkedSlaves.length))} of them retain testicles and are brutally cockmilked as they are used.`);
			}
		}

		r.push(`The arcade makes you`);
		if (V.policies.publicFuckdolls === 0) {
			r.push(`<span class="yellowgreen">${cashFormat(profits)}</span> from selling the inmates' holes`);
		} else {
			r.push(`<span class="green">more reputable</span> from freely providing the inmates' holes`);
		}
		if (V.arcadeUpgradeCollectors > 0 && V.policies.publicFuckdolls === 0) {
			r.push(`and`);
		}
		if (V.arcadeUpgradeCollectors > 0) {
			r.push(`<span class="yellowgreen">${cashFormat(milkProfits)}</span> from selling the fluids they produced`);
		}
		r.push(`this week.`);
		if (V.arcologies[0].FSPaternalist > 20) {
			repX(forceNeg(Math.trunc(profits / 20)), "arcade");
		}
		App.Events.addNode(afterFrag, r, "div", "indent");
	}

	if (V.arcadeUpgradeFuckdolls > 1) {
		const fuckdolls = slaves.filter(s => fuckdollQualifier(s));
		if (fuckdolls.length > 0) {
			// ascending sort by sexAmount...least popular slaves are converted first
			fuckdolls.sort((a, b) => b.sexAmount - a.sexAmount);
			for (const fuckdoll of fuckdolls) {
				const {he} = getPronouns(fuckdoll);
				App.UI.DOM.appendNewElement("div", afterFrag, `${fuckdoll.slaveName} is low-quality merchandise, so ${he} has been converted into a Fuckdoll.`, "indent");
				removeSlave(fuckdoll);
				V.fuckdolls++;
				if (V.arcadeUpgradeFuckdolls === 2) {
					break; // convert at most one per week on this setting
				}
			}
		} else {
			App.UI.DOM.appendNewElement("div", afterFrag, `No slaves have failed quality inspection for Fuckdoll conversion. ${arcadeNameCaps} will remain overcrowded this week.`, "indent");
		}
	}

	if (slavesLength > 0) {
		// Record statistics gathering
		let b = V.facility.arcade;
		b.whoreIncome = 0;
		b.customers = 0;
		b.whoreCosts = 0;
		b.rep = 0;
		for (let si of b.income.values()) {
			b.whoreIncome += si.income;
			b.customers += si.customers;
			b.whoreCosts += si.cost;
			b.rep += si.rep;
		}
		b.maintenance = V.arcade * V.facilityCost * (0.05 + 0.02 * V.arcadeUpgradeInjectors + 0.05 * V.arcadeUpgradeCollectors);
		b.totalIncome = b.whoreIncome;
		b.totalExpenses = b.whoreCosts + b.maintenance;
		b.profit = b.totalIncome - b.totalExpenses;

		// Arcade stats
		afterFrag.append(App.Facilities.Arcade.Stats(false));
		arcadeStats.append(App.Facilities.Arcade.Stats(true));
	}

	return {
		before: beforeFrag,
		slaves: slaveReports,
		after: afterFrag,
	};

	/**
	 *
	 * @param {App.Entity.SlaveState} slave
	 */
	function fuckdollQualifier(slave) {
		if (slave.sentence === 0 && slave.fuckdoll === 0 && slave.fetish === Fetish.MINDBROKEN) {
			if (slave.physicalAge > 35) {
				return true;
			} else if (slave.vagina >= 4 || slave.anus >= 4) {
				return true;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {DocumentFragment}
	 */
	function applyCollectors(slave) {
		const f = new DocumentFragment();
		if (slave.vasectomy === 1) {
			slave.vasectomy = 0;
			vasectomiesUndone++;
			cashX(forceNeg(V.surgeryCost), "slaveSurgery", slave);
			surgeryDamage(slave, 10);
		} else if (slave.lactation < 2) {
			slave.lactation = 2;
			boobsImplantedSlaves.push(slave);
			cashX(forceNeg(V.surgeryCost), "slaveSurgery", slave);
			surgeryDamage(slave, 10);
		} else if (slave.prostate === 1) {
			slave.prostate = 2;
			prostatesImplantedSlaves.push(slave);
			cashX(forceNeg(V.surgeryCost), "slaveSurgery", slave);
			surgeryDamage(slave, 10);
		} else if (slave.lactation > 0 || slave.balls > 0) {
			const {He} = getPronouns(slave);
			const milkResults = App.SlaveAssignment.getMilked(slave, 1.0);
			App.Events.addNode(f, [He, milkResults.text], "div", "indent");
			milkProfits += milkResults.cash;
			slave.boobs += boobGrowth(slave);
			if (
				slave.balls.isBetween(0, 10) &&
				(random(1, 100) > (40 + (10 * (slave.balls + (2 * slave.geneMods.NCS)))))
			) {
				slave.balls++;
			}
			if (
				(slave.dick > 0) &&
				(slave.dick < 10) &&
				(random(1, 100) > (40 + (10 * slave.dick + (2 * slave.geneMods.NCS))))
			) {
				slave.dick++;
			}
			if (slave.lactation > 0) {
				milkedSlaves.push(slave);
			}
			if (slave.balls > 0) {
				cockMilkedSlaves.push(slave);
			}
		}
		return f;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {number}
	 */
	function boobGrowth(slave) {
		let growth = 0;
		const gigantomastiaMod = slave.geneticQuirks.gigantomastia === 2 ? (slave.geneticQuirks.macromastia === 2 ? 3 : 2) : 1;
		if (slave.boobs < 2000) {
			growth = 100;
		} else if (slave.boobs < 5000 * gigantomastiaMod) {
			growth = 50;
		} else if (slave.boobs < 10000 * gigantomastiaMod) {
			growth = 25;
		}
		if (slave.geneMods.NCS === 1) {
			/*
			** NCS will allow some growth for Arcade milking, but not as much as the Dairy.
			*/
			growth = Math.trunc(growth / 3.5);
		}
		return growth;
	}
};
