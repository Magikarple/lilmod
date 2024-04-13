App.Data.NewGamePlus = (function() {
	const NGPOffset = 1200000;

	function ngpSlaveID(id, preserveSpecial=false) {
		const minID = preserveSpecial ? -20 : -1;
		if (id > 0) {
			id += NGPOffset;
		} else if (V.freshPC === 1 && id === -1) {
			id = -NGPOffset;
		} else if (id < minID) {
			id -= NGPOffset;
		}
		return id;
	}

	function slaveOrZero(id) {
		if (id > 0 && !getSlave(id)) {
			return 0;
		}
		return id;
	}

	function PCInit() {
		if (V.freshPC === 0) {
			cashX(V.ngpParams.prosperity, "personalBusiness");
			const oldCash = V.cash;
			V.cash = 0;
			V.cashLastWeek = 0;
			cashX((Math.clamp(1000*Math.trunc(oldCash/100000), 5000, 1000000)), "personalBusiness");
			if (V.retainCareer === 0) {
				V.PC.career = "arcology owner";
				V.PC.skill.trading = 100;
				V.PC.skill.warfare = 100;
				V.PC.skill.hacking = 100;
				V.PC.skill.slaving = 100;
				V.PC.skill.engineering = 100;
				V.PC.skill.medicine = 100;
			}
			V.PC.mother = ngpSlaveID(V.PC.mother);
			V.PC.father = ngpSlaveID(V.PC.father);
			V.PC.pregSource = slaveOrZero(ngpSlaveID(V.PC.pregSource, true));
			for (let fetus of V.PC.womb) {
				fetus.fatherID = ngpSlaveID(fetus.fatherID, true);
				fetus.genetics.father = ngpSlaveID(fetus.genetics.father, true);
				fetus.genetics.mother = ngpSlaveID(fetus.genetics.mother, true);
			}
		} else {
			V.PC = basePlayer();
			WombInit(V.PC);
			V.cheater = 0;
			V.cash = 0;
			cashX(10000, "personalBusiness");
		}
	}

	function slaveLoopInit() {
		const ngUpdateGenePool = function(genePool = []) {
			const transferredSlaveIds = (V.slaves || [])
				.filter(s => s.ID >= NGPOffset)
				.map(s => s.ID - NGPOffset);
			const pcGenes = V.genePool.find(s => s.ID === -1);
			const gp = genePool
				.filter(s => (transferredSlaveIds.includes(s.ID)))
				.map(s => {
					const result = jQuery.extend(true, {}, s);
					result.ID += NGPOffset;
					result.mother = ngpSlaveID(result.mother);
					result.father = ngpSlaveID(result.father);
					result.cloneID = ngpSlaveID(result.cloneID);
					return result;
				});
			if (V.freshPC === 0) {
				gp.push(pcGenes);
			}
			return gp;
		};

		const ngUpdateMissingTable = function(missingTable) {
			const newTable = {};
			let needed = [];

			(V.slaves || [])
				.forEach(s => ([s.pregSource + NGPOffset, s.mother + NGPOffset, s.father + NGPOffset]
					.filter(i => (i in missingTable))
					.forEach(i => {
						if (needed.indexOf(i) === -1) {
							needed.push(i);
						}
					})));
			(V.slaves || []).forEach(s => (s.womb
				.forEach(f => ([f.fatherID, f.genetics.father, f.genetics.mother]
					.filter(i => (i in missingTable))
					.forEach(i => {
						if (needed.indexOf(i) === -1) {
							needed.push(i);
						}
					})))));

			while (needed.length > 0) {
				let i = needed.shift();
				let s = missingTable[i];
				newTable[i - NGPOffset] = s;
				s.ID -= NGPOffset;
				if (s.mother in missingTable) {
					s.mother -= NGPOffset;
					if (!(s.mother in newTable) && needed.indexOf(s.mother + NGPOffset) === -1) {
						needed.push(s.mother + NGPOffset);
					}
				}
				if (s.father in missingTable) {
					s.father -= NGPOffset;
					if (!(s.father in newTable) && needed.indexOf(s.father + NGPOffset) === -1) {
						needed.push(s.father + NGPOffset);
					}
				}
			}

			return newTable;
		};

		const ngUpdatePartners = function(slave) {
			const partners = [...slave.partners]
				.map(k => ngpSlaveID(k, true));

			return new Set(partners);
		};

		let oldMissingParentID = Math.min(-10000, ...Object.keys(V.missingTable)) - 1;
		V.slaves.filter(s => (s.assignment !== Job.IMPORTED)).forEach(s => {
			V.missingTable[oldMissingParentID] = {
				slaveName: s.slaveName,
				slaveSurname: s.slaveSurname,
				fullName: SlaveFullName(s),
				dick: s.dick,
				vagina: s.vagina,
				ID: oldMissingParentID,
				mother: s.mother,
				father: s.father,
				inbreedingCoeff: s.inbreedingCoeff
			};
			Object.values(V.missingTable).forEach(so => {
				if (so.mother === s.ID) {
					so.mother = oldMissingParentID;
				}
				if (so.father === s.ID) {
					so.father = oldMissingParentID;
				}
			});
			V.slaves.concat([V.PC]).forEach(so => {
				if (so.mother === s.ID) {
					so.mother = oldMissingParentID;
				}
				if (so.father === s.ID) {
					so.father = oldMissingParentID;
				}
				if (so.assignment === Job.IMPORTED || so.ID === -1) {
					WombChangeID(so, s.ID, oldMissingParentID);
				}
			});
			oldMissingParentID--;
		});

		V.slaves.deleteWith((s) => s.assignment !== Job.IMPORTED);

		for (let slave of V.slaves) {
			slave.ID += NGPOffset;
			slave.assignment = Job.REST;
			if (V.freshPC === 1) { // check whether to reset weekAcquired same way we check whether to change father of fetus
				// She's the same number of weeks pregnant, with the same baby, so to the extent this is "really" happening,
				// the new PC must have acquired her this week.
				slave.weekAcquired = 0;
			} else {
				// V.week is getting reset to 0, new weekAcquired is relative to the new V.week
				slave.weekAcquired -= V.week;
			}
			slave.newGamePlus = 1;
			slave.mother = ngpSlaveID(slave.mother);
			slave.father = ngpSlaveID(slave.father);
			slave.canRecruit = 0;
			slave.breedingMark = 0;
			if (typeof V.ngpParams.nationality === 'string') {
				slave.nationality = V.ngpParams.nationality;
			}
			slave.relationshipTarget = ngpSlaveID(slave.relationshipTarget);
			slave.cloneID = ngpSlaveID(slave.cloneID);
			slave.pregSource = ngpSlaveID(slave.pregSource, true);
			for (let fetus of slave.womb) {
				fetus.fatherID = ngpSlaveID(fetus.fatherID, true);
				fetus.genetics.father = ngpSlaveID(fetus.genetics.father, true);
				fetus.genetics.mother = ngpSlaveID(fetus.genetics.mother, true);
			}
			slave.rivalry = 0;
			slave.rivalryTarget = 0;
			slave.subTarget = 0;
			slave.drugs = "no drugs";
			slave.porn.spending = 0;
			slave.rules.living = "spare";
			slave.diet = "healthy";
			slave.pregControl = "none";
		}
		V.slaveIndices = slaves2indices();
		for (let slave of V.slaves) {
			slave.pregSource = slaveOrZero(slave.pregSource);
			slave.cloneID = slaveOrZero(slave.cloneID);
			slave.relationshipTarget = slaveOrZero(slave.relationshipTarget);
		}
		V.genePool = ngUpdateGenePool(V.genePool);
		V.missingTable = ngUpdateMissingTable(V.missingTable);
		let validRelationship = (s) => (s.relationshipTarget !== 0 && getSlave(s.relationshipTarget).relationshipTarget === s.ID);
		for (let slave of V.slaves) {
			if ((slave.relationship < 0 && V.freshPC === 1) || (slave.relationship > 0 && !validRelationship(slave))) {
				slave.relationship = 0;
				slave.relationshipTarget = 0;
			}
			slave.counter.milk = 0;
			slave.counter.cum = 0;
			slave.counter.births = 0;
			slave.counter.mammary = 0;
			slave.counter.penetrative = 0;
			slave.counter.oral = 0;
			slave.counter.anal = 0;
			slave.counter.vaginal = 0;
			slave.partners = ngUpdatePartners(slave);
			slave.lifetimeCashExpenses = 0;
			slave.lifetimeCashIncome = 0;
			slave.lastWeeksCashIncome = 0;
			slave.lifetimeRepExpenses = 0;
			slave.lifetimeRepIncome = 0;
			slave.lastWeeksRepExpenses = 0;
			slave.lastWeeksRepIncome = 0;
		}
	}

	function updateMods() {
		if (V.mods.food.enabled) {
			V.mods.food.amount = 0;
			V.mods.food.lastWeek = 0;
			V.mods.food.market = false;
			V.mods.food.produced = 0;
			V.mods.food.rations = 0;
			V.mods.food.total = 0;
			V.mods.food.warned = false;
		}
	}

	function doNGPSetup() {
		slaveLoopInit();
		PCInit();
		resetFamilyCounters();
		updateMods();
		V.ngpParams = {};
	}

	return doNGPSetup;
})();
