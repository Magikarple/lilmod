// cSpell:ignore uncurved

globalThis.DJRepBonus = function() {
	if (!S.DJ) {
		return 0;
	}

	let value = 0;
	const djIntel = S.DJ.intelligence + S.DJ.intelligenceImplant;
	if (S.DJ.relationship === -3 && S.DJ.devotion > 50) {
		value += 0.1;
		// $He tries $his best to be your energetic, cheerful ${wife}.
	}
	if (!canSee(S.DJ)) {
		value += 0.15;
	}
	if (S.DJ.skill.entertainment > 10 && S.DJ.skill.entertainment <= 30) {
		value += 0.05;
		// V.DJ.slaveName's basic skills marginally <span class="green">improve</span> the atmosphere in V.clubName.
	} else if (S.DJ.skill.entertainment <= 60) {
		value += 0.1;
		// V.DJ.slaveName's skills <span class="green">improve</span> the atmosphere in V.clubName.
	} else if (S.DJ.skill.entertainment < 100) {
		value += 0.15;
		// V.DJ.slaveName's skills greatly <span class="green">improve</span> the atmosphere in V.clubName.
	} else if (S.DJ.skill.entertainment >= 100) {
		value += 0.20;
		// V.DJ.slaveName's mastery immensely <span class="green">;improves</span> the atmosphere in V.clubName.
	}
	if (S.DJ.muscles > 5 && S.DJ.muscles <= 95) {
		value += 0.05;
		// $His toned body helps $him lead $his fellow club sluts by letting $him dance all night.
	}
	if (djIntel > 15) {
		value += 0.05 * Math.floor((-0.00008 * djIntel * djIntel) + (0.0337 * djIntel) + 0.5);
		// $He's smart enough to make an actual contribution to the music, greatly enhancing the entire experience.
	}
	if (S.DJ.face > 95) {
		value += 0.05;
		// $His great beauty is a further draw, even when $he's in $his DJ booth, but especially when $he comes out to dance.
	}
	if (App.Data.Careers.Leader.DJ.includes(S.DJ.career)) {
		value += 0.05;
		// $He has musical experience from $his life before $he was a slave, a grounding that gives $his tracks actual depth.
	} else if (S.DJ.skill.DJ >= Constant.MASTERED_XP) {
		value += 0.05;
		// $He has musical experience from working for you, giving $his tracks actual depth.
	} else if (S.DJ.skill.DJ > 120) {
		value += 0.03;
	} else if (S.DJ.skill.DJ > 60) {
		value += 0.02;
	} else if (S.DJ.skill.DJ > 20) {
		value += 0.01;
	}
	return value;
};

globalThis.CategoryAssociatedGroup = Object.freeze({
	PENTHOUSE: [
		'slaveAssignmentRest',
		'slaveAssignmentRestVign',
		'slaveAssignmentFucktoy',
		'slaveAssignmentClasses',
		'slaveAssignmentHouse',
		'slaveAssignmentWhore',
		'slaveAssignmentWhoreVign',
		'slaveAssignmentPublic',
		'slaveAssignmentPublicVign',
		'slaveAssignmentSubordinate',
		'slaveAssignmentMilked',
		'slaveAssignmentMilkedVign',
		'slaveAssignmentExtraMilk',
		'slaveAssignmentExtraMilkVign',
		'slaveAssignmentGloryhole',
		'slaveAssignmentConfinement',
		'slaveAssignmentChoice'
	],
	HEADGIRLSUITE: [
		'slaveAssignmentHeadgirl',
		'slaveAssignmentHeadgirlsuite'
	],
	RECRUITER: [
		'slaveAssignmentRecruiter'
	],
	DOJO: [
		'slaveAssignmentBodyguard'
	],
	MASTERSUITE: [
		'masterSuite',
		'slaveAssignmentConcubine',
		'slaveAssignmentMastersuite'
	],
	AGENT: [
		'slaveAssignmentAgent',
		'slaveAssignmentAgentPartner'
	],
	ARCADE: [
		'arcade',
		'slaveAssignmentArcade'
	],
	BROTHEL: [
		'brothel',
		'slaveAssignmentMadam',
		'slaveAssignmentMadamVign',
		'slaveAssignmentBrothel',
		'slaveAssignmentBrothelVign',
		'brothelAds'
	],
	CELLBLOCK: [
		'cellblock',
		'slaveAssignmentWarden',
		'slaveAssignmentCellblock'
	],
	CLUB: [
		'club',
		'slaveAssignmentDj',
		'slaveAssignmentDjVign',
		'slaveAssignmentClub',
		'slaveAssignmentClubVign',
		'clubAds'
	],
	CLINIC: [
		'clinic',
		'slaveAssignmentNurse',
		'slaveAssignmentClinic'
	],
	DAIRY: [
		'dairy',
		'slaveAssignmentMilkmaid',
		'slaveAssignmentDairy',
		'slaveAssignmentDairyVign'
	],
	FARMYARD: [
		'farmyard',
		'slaveAssignmentFarmer',
		'slaveAssignmentFarmyard',
		'slaveAssignmentFarmyardVign',
	],
	INCUBATOR: [
		'incubator',
		'incubatorSlaves'
	],
	NURSERY: [
		'nursery',
		'slaveAssignmentMatron',
		'slaveAssignmentNursery',
		'slaveAssignmentNurseryVign'
	],
	PIT: [
		'pit'
	],
	PROSTHETICLAB: [
		'lab',
		'labResearch',
		'labScientists',
		'labMenials'
	],
	SCHOOLROOM: [
		'school',
		'slaveAssignmentTeacher',
		'slaveAssignmentSchool'
	],
	SERVANTSQUARTERS: [
		'servantsQuarters',
		'slaveAssignmentSteward',
		'slaveAssignmentQuarter',
		'slaveAssignmentQuarterVign'
	],
	SPA: [
		'spa',
		'slaveAssignmentAttendant',
		'slaveAssignmentSpa'
	],
	SLAVES: [
		'porn',
		'slaveMod',
		'slaveSurgery',
		'birth'
	],
	LABOR: [
		'menialTrades',
		'fuckdolls',
		'menialBioreactors'
	],
	FLIPPING: [
		'slaveTransfer',
		'indentureRenewal',
		'menialTransfer',
		'fuckdollsTransfer',
		'menialBioreactorsTransfer',
		'menialTransferA',
		'fuckdollsTransferA',
		'menialBioreactorsTransferA',
		'menialRetirement',
		'labScientistsTransfer',
		'babyTransfer'
	],
	FINANCIALS: [
		'weather',
		'rents',
		'fines',
		'event',
		'capEx',
		'futureSocieties',
		'schoolBacking',
		'war',
		'cheating'
	],
	POLICIES: [
		'policies',
		'subsidiesAndBarriers'
	],
	EDICTS: [
		'edicts'
	],
	PERSONALFINANCE: [
		'personalBusiness',
		'personalLivingExpenses',
		'PCSkills',
		'PCtraining',
		'PCdiet',
		'PCdrugs',
		'PCmedical',
		'PCcosmetics',
		'citizenOrphanage',
		'privateOrphanage',
		'stocks',
		'stocksTraded'
	],
	SECURITY: [
		'mercenaries',
		'securityExpansion',
		'specialForces',
		'specialForcesCap',
		'peacekeepers'
	],
});

globalThis.CategoryAssociatedGroupRep = Object.freeze({
	PENTHOUSE: [
		'fucktoy',
		'publicServant',
		'gloryhole',
		'concubine',
		'headGirl',
		'bodyguard',
		'recruiter'
	],
	ARCADE: [
		'arcade',
		'gloryholeArcade',
	],
	BROTHEL: [
		'brothel'
	],
	CLUB: [
		'club',
		'publicServantClub',
		'clubAds'
	],
	PIT: [
		'pit'
	],
	SERVANTSQUARTERS: [
		'servantsQuarters'
	],
	SPA: [
		'spa'
	],
	FARMYARD: [
		'shows'
	],
	SLAVES: [
		'slavesViewOfPC',
		'prestigiousSlave',
		'porn',
		'slaveTransfer',
		'babyTransfer',
		'birth',
		'retirement',
		'vignette',
		'fuckdolls'
	],
	POLICIES: [
		'capEx',
		'subsidiesAndBarriers',
		'futureSocieties',
		'food'
	],
	EDICTS: [
		'edicts'
	],
	PERSONALFINANCE: [
		'personalBusiness',
		'PCappearance',
		'PCactions',
		'PCRelationships',
		'SlaveRelationships',
		'event'
	],
	SECURITY: [
		'securityExpansion',
		'specialForces',
		'war',
		'peacekeepers'
	],
	WASTE: [
		'multiplier',
		'overflow',
		'curve'
	]
});

globalThis.calculateCosts = (function() {
	return {
		predict: predictCost,
		bill: getCost,
	};

	function predictCost() {
		let totalCosts = (
			getBrothelCosts() +
			getBrothelAdsCosts() +
			getArcadeCosts() +
			getClubCosts() +
			getClubAdsCosts() +
			getDairyCosts() +
			getServantsQuartersCosts() +
			getMasterSuiteCosts() +
			getNurseryCosts() +
			getFarmyardCosts() +
			getLifestyleCosts() +
			getFSCosts() +
			getCitizenOrphanageCosts() +
			getPrivateOrphanageCosts() +
			getPeacekeeperCosts() +
			getMercenariesCosts() +
			getMenialRetirementCosts() +
			getRecruiterCosts() +
			getSchoolCosts() +
			getPolicyCosts() +
			getLabCosts() +
			getLabScientistsCosts() +
			getLabMenialsCosts() +
			getPCTrainingCosts() +
			getPCFoodCosts() +
			getPCDrugCosts() +
			getPCCosts() +
			predictTotalSlaveCosts()
		);

		totalCosts += App.Mods.SecExp.upkeep.cost();

		if (V.incubator.capacity > 0) {
			totalCosts += getIncubatorCosts();
		}

		// these two apply a multiplicative effect to all costs so far.
		totalCosts = getEnvironmentCosts(totalCosts);
		totalCosts = getPCMultiplierCosts(totalCosts);

		// in the old order these were applied after multiplication. Not sure if deliberate, but I'm leaving it for now.
		totalCosts += getSFCosts() + getWeatherCosts();
		/*
		// clean up
		if (totalCosts > 0) {
			totalCosts = 0;
		} else {
			totalCosts = Math.ceil(totalCosts);
		}
		*/
		return totalCosts;
	}

	function getCost() {
		const oldCash = V.cash;
		cashX(forceNeg(getBrothelCosts()), "brothel");
		cashX(forceNeg(getBrothelAdsCosts()), "brothelAds");
		cashX(forceNeg(getArcadeCosts()), "arcade");
		cashX(forceNeg(getClubCosts()), "club");
		cashX(forceNeg(getClubAdsCosts()), "clubAds");
		cashX(forceNeg(getDairyCosts()), "dairy");
		cashX(forceNeg(getServantsQuartersCosts()), "servantsQuarters");
		cashX(forceNeg(getMasterSuiteCosts()), "masterSuite");
		cashX(forceNeg(getNurseryCosts()), "nursery");
		cashX(forceNeg(getFarmyardCosts()), "farmyard");
		cashX(forceNeg(getLifestyleCosts()), "personalLivingExpenses");
		cashX(forceNeg(getFSCosts()), "futureSocieties");
		cashX(forceNeg(getCitizenOrphanageCosts()), "citizenOrphanage");
		cashX(forceNeg(getPrivateOrphanageCosts()), "privateOrphanage");
		cashX(forceNeg(getPeacekeeperCosts()), "peacekeepers");
		cashX(forceNeg(getMercenariesCosts()), "mercenaries");
		cashX(forceNeg(getMenialRetirementCosts()), "menialRetirement");
		cashX(forceNeg(getRecruiterCosts()), "slaveAssignmentRecruiter");
		cashX(forceNeg(getSchoolCosts()), "schoolBacking");
		cashX(forceNeg(getPolicyCosts()), "policies");
		cashX(forceNeg(getLabCosts()), "lab");
		cashX(forceNeg(getLabScientistsCosts()), "labScientists");
		cashX(forceNeg(getLabMenialsCosts()), "labMenials");
		cashX(forceNeg(getPCTrainingCosts()), "PCtraining");
		cashX(forceNeg(getPCFoodCosts()), "PCdiet");
		cashX(forceNeg(getPCDrugCosts()), "PCdrugs");
		cashX(forceNeg(getPCCosts()), "PCmedical");
		cashX(forceNeg(getPCCosts()), "PCcosmetics");
		getTotalSlaveCosts();

		cashX(forceNeg(App.Mods.SecExp.upkeep.cost()), "securityExpansion");

		if (V.incubator.capacity > 0) {
			cashX(forceNeg(getIncubatorCosts()), "incubator");
			cashX(forceNeg(getIncubatorSlavesCosts()), "incubatorSlaves");
		}

		// these two apply a multiplicative effect to all costs so far.
		// Calculate what the deduced expenses would be, then subtract
		let costSoFar = (oldCash - V.cash); // How much we have spent by this point; expected to be positive.
		cashX(costSoFar - getEnvironmentCosts(costSoFar), "environment"); // getEnv takes total costs and makes it worse. Figure out how much worse and record it

		costSoFar = (oldCash - V.cash);
		cashX(costSoFar - getPCMultiplierCosts(costSoFar), "PCskills");

		// in the old order these were applied after multiplication. Not sure if deliberate, but I'm leaving it for now.
		cashX(forceNeg(getSFCosts()), "specialForces");
		cashX(forceNeg(getWeatherCosts()), "weather");

		return (oldCash - V.cash);
	}

	// slave expenses
	function predictTotalSlaveCosts() {
		let loopCosts = 0;
		for (const slave of V.slaves) {
			loopCosts += getSlaveCost(slave);
		}
		const reducibleUpkeep = Math.trunc(loopCosts * 0.2);
		const servantCapacity = totalServantCapacity();
		if (V.slaves.length > servantCapacity) {
			loopCosts -= Math.trunc(reducibleUpkeep / V.slaves.length * servantCapacity);
		} else {
			loopCosts -= reducibleUpkeep;
		}
		return loopCosts;
	}

	function getTotalSlaveCosts() {
		let slaveCost = 0;
		let slaveCostMinor = 0;
		let loopCosts = 0;

		// Find the total slave upkeep, calculate and subtract per assignment
		for (const slave of V.slaves) {
			slaveCost = getSlaveCost(slave);
			loopCosts += slaveCost;
			// Switch to subtract and track upkeep per assignment
			switch (slave.assignment) {
				// Penthouse Assignments
				case Job.REST:
					cashX(forceNeg(slaveCost), "slaveAssignmentRest", slave);
					break;
				case Job.FUCKTOY:
					cashX(forceNeg(slaveCost), "slaveAssignmentFucktoy", slave);
					break;
				case Job.CLASSES:
					cashX(forceNeg(slaveCost), "slaveAssignmentClasses", slave);
					break;
				case Job.HOUSE:
					cashX(forceNeg(slaveCost), "slaveAssignmentHouse", slave);
					break;
				case Job.WHORE:
					cashX(forceNeg(slaveCost), "slaveAssignmentWhore", slave);
					break;
				case Job.PUBLIC:
					cashX(forceNeg(slaveCost), "slaveAssignmentPublic", slave);
					break;
				case Job.SUBORDINATE:
					cashX(forceNeg(slaveCost), "slaveAssignmentSubordinate", slave);
					break;
				case Job.MILKED:
					cashX(forceNeg(slaveCost), "slaveAssignmentMilked", slave);
					break;
				case Job.GLORYHOLE:
					cashX(forceNeg(slaveCost), "slaveAssignmentGloryhole", slave);
					break;
				case Job.CONFINEMENT:
					cashX(forceNeg(slaveCost), "slaveAssignmentConfinement", slave);
					break;
				// Leadership Assignments
				case Job.BODYGUARD:
					cashX(forceNeg(slaveCost), "slaveAssignmentBodyguard", slave);
					break;
				case Job.HEADGIRL:
					cashX(forceNeg(slaveCost), "slaveAssignmentHeadgirl", slave);
					break;
				case Job.RECRUITER:
					cashX(forceNeg(slaveCost), "slaveAssignmentRecruiter", slave);
					break;
				case Job.AGENT:
					cashX(forceNeg(slaveCost), "slaveAssignmentAgent", slave);
					break;
				case Job.AGENTPARTNER:
					cashX(forceNeg(slaveCost), "slaveAssignmentAgentPartner", slave);
					break;
				// Facility Assignments
				case Job.ARCADE:
					cashX(forceNeg(slaveCost), "slaveAssignmentArcade", slave);
					break;
				case Job.MADAM:
					cashX(forceNeg(slaveCost), "slaveAssignmentMadam", slave);
					break;
				case Job.BROTHEL:
					cashX(forceNeg(slaveCost), "slaveAssignmentBrothel", slave);
					break;
				case Job.WARDEN:
					cashX(forceNeg(slaveCost), "slaveAssignmentWarden", slave);
					break;
				case Job.CELLBLOCK:
					cashX(forceNeg(slaveCost), "slaveAssignmentCellblock", slave);
					break;
				case Job.DJ:
					cashX(forceNeg(slaveCost), "slaveAssignmentDj", slave);
					break;
				case Job.CLUB:
					cashX(forceNeg(slaveCost), "slaveAssignmentClub", slave);
					break;
				case Job.NURSE:
					cashX(forceNeg(slaveCost), "slaveAssignmentNurse", slave);
					break;
				case Job.CLINIC:
					cashX(forceNeg(slaveCost), "slaveAssignmentClinic", slave);
					break;
				case Job.MILKMAID:
					cashX(forceNeg(slaveCost), "slaveAssignmentMilkmaid", slave);
					break;
				case Job.DAIRY:
					cashX(forceNeg(slaveCost), "slaveAssignmentDairy", slave);
					break;
				case Job.FARMER:
					cashX(forceNeg(slaveCost), "slaveAssignmentFarmer", slave);
					break;
				case Job.FARMYARD:
					cashX(forceNeg(slaveCost), "slaveAssignmentFarmyard", slave);
					break;
				case Job.HEADGIRLSUITE:
					cashX(forceNeg(slaveCost), "slaveAssignmentHeadgirlsuite", slave);
					break;
				case Job.CONCUBINE:
					cashX(forceNeg(slaveCost), "slaveAssignmentConcubine", slave);
					break;
				case Job.MASTERSUITE:
					cashX(forceNeg(slaveCost), "slaveAssignmentMastersuite", slave);
					break;
				case Job.MATRON:
					cashX(forceNeg(slaveCost), "slaveAssignmentMatron", slave);
					break;
				case Job.NURSERY:
					cashX(forceNeg(slaveCost), "slaveAssignmentNursery", slave);
					break;
				case Job.TEACHER:
					cashX(forceNeg(slaveCost), "slaveAssignmentTeacher", slave);
					break;
				case Job.SCHOOL:
					cashX(forceNeg(slaveCost), "slaveAssignmentSchool", slave);
					break;
				case Job.STEWARD:
					cashX(forceNeg(slaveCost), "slaveAssignmentSteward", slave);
					break;
				case Job.QUARTER:
					cashX(forceNeg(slaveCost), "slaveAssignmentQuarter", slave);
					break;
				case Job.ATTENDANT:
					cashX(forceNeg(slaveCost), "slaveAssignmentAttendant", slave);
					break;
				case Job.SPA:
					cashX(forceNeg(slaveCost), "slaveAssignmentSpa", slave);
					break;
				case Job.BABY_FACTORY:
					cashX(forceNeg(slaveCost), "slaveAssignmentBabyFactory", slave);
					break;
				case Job.CHOICE:
					cashX(forceNeg(slaveCost), "slaveAssignmentChoice", slave);
					break;
				default:
					cashX(forceNeg(slaveCost), "slaveAssignmentUndefined", slave);
					break;
			}
		}

		// Calculate the servant reduction and credit them for it
		const reducibleUpkeep = Math.trunc(loopCosts * 0.2);
		const actualNumberServed = Math.min(V.slaves.length, totalServantCapacity());
		const savedPerSlot = reducibleUpkeep / actualNumberServed;
		App.Utils.jobForAssignment(Job.QUARTER).employees().forEach(s => {
			slaveCostMinor = Math.trunc(savedPerSlot * houseServantEffectiveness(s));
			cashX(Math.abs(slaveCostMinor), "slaveAssignmentQuarter", s);
		});
		App.Utils.jobForAssignment(Job.HOUSE).employees().forEach(s => {
			slaveCostMinor = Math.trunc(savedPerSlot * houseServantEffectiveness(s));
			cashX(Math.abs(slaveCostMinor), "slaveAssignmentHouse", s);
		});
		// nothing to return, cashX already billed.
	}

	// facility expenses
	function getBrothelCosts() {
		return (1 + 0.1 * V.brothelUpgradeDrugs) * (V.brothel * V.facilityCost);
	}

	function getBrothelAdsCosts() {
		return (V.brothel > 0) ? V.brothelAdsSpending : 0;
	}

	function getArcadeCosts() {
		const healthUpgrade = V.arcadeUpgradeHealth >= 0 ? V.arcadeUpgradeHealth : 0;
		return (0.05 + (0.02 * V.arcadeUpgradeInjectors) + (0.05 * V.arcadeUpgradeCollectors) + (0.02 * healthUpgrade)) * (V.arcade * V.facilityCost);
	}

	function getClubCosts() {
		const initCosts = (V.club * V.facilityCost) + (0.2 * V.clubUpgradePDAs * V.club * V.facilityCost);
		return (V.club > 0) ? initCosts + V.clubAdsSpending : initCosts;
	}

	function getClubAdsCosts() {
		return (V.club > 0) ? V.clubAdsSpending : 0;
	}

	function getDairyCosts() {
		const facDairyMultiplier = V.facilityCost * V.dairy;
		let costs = facDairyMultiplier + (0.2 * V.dairyFeedersUpgrade + 0.1 * V.dairyPregUpgrade) * facDairyMultiplier + (0.2 * V.dairyStimulatorsUpgrade * V.facilityCost);
		if (V.dairy > 0) {
			costs += ((V.bioreactorsXY + V.bioreactorsXX + V.bioreactorsHerm + V.bioreactorsBarren) * 100);
		}
		return costs;
	}

	function getIncubatorCosts() {
		const facIncMultiplier = V.facilityCost * V.incubator.capacity;
		return (facIncMultiplier * 10) +
			0.2 * V.incubator.upgrade.weight * facIncMultiplier +
			0.2 * V.incubator.upgrade.muscles * facIncMultiplier +
			0.2 * V.incubator.upgrade.reproduction * facIncMultiplier +
			0.2 * V.incubator.upgrade.growthStims * facIncMultiplier +
			0.2 * V.incubator.upgrade.organs * facIncMultiplier +
			0.5 * V.incubator.upgrade.reproduction * facIncMultiplier +
			0.5 * V.incubator.upgrade.speed * facIncMultiplier;
	}

	function getIncubatorSlavesCosts() {
		let sum = 0;
		for (const tank of V.incubator.tanks) {
			sum += ((V.incubator.upgrade.weight + V.incubator.upgrade.muscles + V.incubator.upgrade.reproduction +
			V.incubator.upgrade.growthStims + V.incubator.upgrade.organs + tank.incubatorSettings.pregAdaptationPower) * 500);
		}
		return sum;
	}

	function getServantsQuartersCosts() {
		return (0.2 * V.servantsQuartersUpgradeMonitoring * V.servantsQuarters * V.facilityCost);
	}

	function getMasterSuiteCosts() {
		let costs = 0;
		if (V.masterSuitePregnancySlaveLuxuries === 1) {
			costs += 500;
		}
		if (V.masterSuitePregnancyFertilitySupplements === 1) {
			costs += 1000;
		}
		return costs;
	}

	function getNurseryCosts() {
		return (V.nursery * V.facilityCost);
	}

	function getFarmyardCosts() {
		const facility = V.farmyard * V.facilityCost;
		const exotic = V.animals.canine.map(c => getAnimal(c)).filter(c => !!c && c.rarity === "exotic").length +
			V.animals.hooved.map(h => getAnimal(h)).filter(h => !!h && h.rarity === "exotic").length +
			V.animals.feline.map(f => getAnimal(f)).filter(f => !!f && f.rarity === "exotic").length;
		const domestic = V.animals.canine.map(c => getAnimal(c)).filter(c => !!c && c.rarity === "domestic").length +
			V.animals.hooved.map(h => getAnimal(h)).filter(h => !!h && h.rarity === "domestic").length +
			V.animals.feline.map(f => getAnimal(f)).filter(f => !!f && f.rarity === "domestic").length;
		return (
			(
				(facility) +
				(0.1 * V.farmyardUpgrades.fertilizer * facility) -
				(0.2 * V.farmyardUpgrades.hydroponics * facility) +
				(0.2 * V.farmyardUpgrades.seeds * facility) -
				(0.4 * V.farmyardUpgrades.machinery * facility)
			) * 2 + (exotic * 100) + (domestic * 10)
		);
	}

	// general arcology costs
	function getLifestyleCosts() {
		let ownerExpense = 1;
		if (V.PC.rules.living === "luxurious") {
			ownerExpense = 3;
		} else if (V.PC.rules.living === "normal") {
			ownerExpense = 2;
		}
		return (ownerExpense * (250 + (50000 / V.localEcon)));
	}

	function getFSCosts() {
		let costs = V.FSSpending;
		if (V.arcologies[0].FSRepopulationFocusLaw === 1 && V.PC.pregKnown === 1) {
			costs -= 500;
		}
		return costs;
	}

	function getCitizenOrphanageCosts() {
		return V.citizenOrphanageTotal * 100;
	}

	function getPrivateOrphanageCosts() {
		const costs = V.privateOrphanageTotal * 500;
		return (V.breederOrphanageTotal > 0) ? costs + 50 : costs;
	}

	function getPeacekeeperCosts() {
		return (V.peacekeepers.state === 2 && V.peacekeepers.undermining !== 0) ? V.peacekeepers.undermining : 0;
	}

	function getMercenariesCosts() {
		let costs = 0;
		let mercCosts = V.mercenaries * 2000;
		if (V.mercenaries > 0) {
			if (V.barracks) {
				mercCosts *= 0.5;
			}
			if ((V.PC.skill.warfare >= 100) || (V.PC.career === 'arcology owner')) {
				mercCosts *= 0.5;
			}
			costs += mercCosts;
		}
		return costs;
	}

	function getMenialRetirementCosts() {
		return (V.policies.retirement.menial2Citizen === 1) ? V.menials * 2 : 0;
	}

	// policy and other expenses
	function getRecruiterCosts() {
		return V.RecruiterID ? 250 : 0;
	}

	function getSchoolCosts() {
		let costs = 0;
		for (const school of App.Data.misc.schools.keys()) {
			if (school === 'TFS') {
				if (V[school].subsidize === 1 && ((V.PC.dick === 0) || (V.PC.vagina === -1) || (V.PC.boobs < 300))) {
					costs += 1000;
				}
			} else {
				if (V[school].subsidize === 1) {
					costs += 1000;
				}
			}
		}
		return costs;
	}

	function getPolicyCosts() {
		let costs = 0;
		if (V.policies.idealAge && (V.targetIdealAge !== V.idealAge)) {
			costs += 1500;
		}
		if (V.policies.alwaysSubsidizeGrowth === 1) {
			costs += policies.cost();
		}
		if (V.policies.alwaysSubsidizeRep === 1) {
			costs += policies.cost();
		}
		if (V.policies.regularParties === 1) {
			costs += policies.cost();
		}
		if (V.policies.immigrationCash === 1) {
			costs += policies.cost();
		}
		if (V.policies.coursingAssociation === 1) {
			costs += 1000;
		}
		return costs;
	}

	function getLabCosts() {
		return (100 * V.researchLab.maxSpace);
	}

	function getLabScientistsCosts() {
		return (300 * V.researchLab.hired);
	}

	function getLabMenialsCosts() {
		return (100 * V.researchLab.menials);
	}

	// player expenses
	function getPCTrainingCosts() {
		const trainingPA = [PersonalAttention.TRADE, PersonalAttention.WAR, PersonalAttention.SLAVING, PersonalAttention.ENGINEERING, PersonalAttention.MEDICINE, PersonalAttention.HACKING];
		const currentPA = V.personalAttention.task;
		let costs = 0;
		if (!(onBedRest(V.PC, true))) {
			if (V.PC.actualAge >= V.IsInPrimePC && V.PC.actualAge < V.IsPastPrimePC) {
				if (trainingPA.includes(currentPA)) {
					costs += 10000 * V.AgeEffectOnTrainerPricingPC;
				}
			}
		}
		return costs;
	}

	function getPCFoodCosts() {
		const slimnessFoodMod = V.arcologies[0].FSSlimnessEnthusiastFoodLaw === 1 && !canEatFood(V.PC) ? 1.15 : 1;
		const foodCost = V.mods.food.cost * slimnessFoodMod;
		let costs = 0;
		// Well this ought to be a mess.
		// Basic food costs
		if (canEatFood(V.PC)) {
			costs += foodCost * 8;
			if (V.PC.weight > 130) {
				costs += foodCost * 4;
			} else if (V.PC.weight > 50) {
				costs += foodCost * 2;
			} else if (V.PC.weight < -50) {
				costs -= foodCost * 2;
			}
		} else {
			costs += foodCost * 4;
			if (V.PC.weight > 130) {
				costs += foodCost * 2;
			} else if (V.PC.weight > 50) {
				costs += foodCost;
			} else if (V.PC.weight < -50) {
				costs -= foodCost;
			}
		}
		switch (V.PC.diet) {
			case 'fattening':
			case 'muscle building':
				costs += foodCost;
				break;
			case 'restricted':
			case 'slimming':
				costs -= foodCost;
				break;
		}
		if (V.PC.geneticQuirks.fertility === 2 && V.PC.geneticQuirks.hyperFertility === 2 && V.PC.preg === 0 && (V.PC.ovaries === 1 || V.PC.mpreg === 1)) {
			costs += Math.trunc(foodCost * 0.5);
		}
		if (V.PC.geneticQuirks.rearLipedema === 2) {
			costs += Math.trunc(foodCost * 0.2);
		}
		if (V.PC.geneticQuirks.macromastia === 2) {
			costs += Math.trunc(foodCost * 0.2);
		}
		if (V.PC.geneticQuirks.gigantomastia === 2) {
			costs += Math.trunc(foodCost * 0.2);
		}
		if (V.PC.geneticQuirks.mGain === 2 && V.PC.geneticQuirks.mLoss !== 2) {
			costs += Math.trunc(foodCost * 0.2);
		}
		if (V.PC.geneticQuirks.wGain === 2 && V.PC.geneticQuirks.wLoss !== 2) {
			costs += Math.trunc(foodCost * 0.2);
		}
		if (V.PC.geneMods.livestock === 1) {
			costs += Math.trunc(foodCost * 0.2);
			if (V.PC.lactation > 0) {
				costs += Math.trunc(foodCost * (1 + V.PC.lactationAdaptation / 400));
			}
			if (isVirile(V.PC)) {
				costs += Math.trunc(foodCost * (1.1 + Math.trunc(V.PC.balls / 100)));
			}
		}
		if (V.PC.drugs === 'appetite suppressors') {
			costs -= foodCost;
		}
		if (V.PC.lactation > 0) {
			costs += foodCost * V.PC.lactation * (1 + Math.trunc(V.PC.boobs / 10000));
		}
		if (V.PC.preg > V.PC.pregData.normalBirth / 8) {
			costs += foodCost * V.PC.pregType;
			if (V.PC.pregType >= 100) {
				costs += foodCost * 5 * V.PC.pregType;
			} else if (V.PC.pregType >= 50) {
				costs += foodCost * 3 * V.PC.pregType;
			} else if (V.PC.pregType >= 30) {
				costs += foodCost * 2 * V.PC.pregType;
			} else if (V.PC.pregType >= 10) {
				costs += foodCost * V.PC.pregType;
			}
		}
		costs = Math.trunc(costs);
		if (V.PC.diet === 'XX' || V.PC.diet === 'XY') {
			costs += 25;
		} else if (V.PC.diet === 'fertility') {
			costs += 25;
		} else if (V.PC.diet === 'cleansing') {
			costs += 50;
		} else if (V.PC.diet === 'XXY') {
			costs += 75;
		} else if (V.PC.diet === 'exotic') {
			costs += 200;
		} else if (V.PC.diet === 'medicinal') {
			costs += 250;
		} else if (V.PC.diet === 'weaning') {
			costs += 500;
		}
		return costs;
	}

	function getPCDrugCosts() {
		const drugsCost = V.drugsCost;
		let costs = 0;

		switch (V.PC.drugs) {
			case 'anti-aging cream':
				costs += Math.trunc(drugsCost * 10);
				break;
			case 'female hormone injections':
			case 'male hormone injections':
			case 'intensive breast injections':
			case 'intensive butt injections':
			case 'intensive penis enhancement':
			case 'intensive testicle enhancement':
			case 'hyper breast injections':
			case 'hyper butt injections':
			case 'hyper penis enhancement':
			case 'hyper testicle enhancement':
			case 'growth stimulants':
			case 'psychostimulants':
				costs += drugsCost * 5;
				break;
			case 'breast enhancers':
			case 'butt enhancers':
			case 'lip enhancers':
			case 'penis enlargers':
			case 'testicle enlargers':
				costs += (V.consumerDrugs ? drugsCost * 2 : drugsCost * 3);
				break;
			case 'fertility supplements':
			case 'stamina enhancers':
				costs += drugsCost;
				break;
			case 'sag-B-gone':
				costs += Math.trunc(drugsCost * 0.1);
				break;
			case 'no drugs':
				break;
			default:
				costs += Math.trunc(drugsCost * 2);
				break;
		}
		if (V.PC.aphrodisiacs !== 0) {
			costs += Math.trunc(drugsCost * Math.abs(V.PC.aphrodisiacs));
		}
		if (V.PC.hormones !== 0) {
			costs += Math.trunc(drugsCost * Math.abs(V.PC.hormones) * (V.consumerDrugs ? 0.5 : 1));
		}
		if (V.PC.bodySwap > 0) {
			costs += Math.trunc(drugsCost * V.PC.bodySwap * 10);
		}
		if (V.PC.preg === -1) {
			costs += Math.trunc(drugsCost * 0.5);
		}
		return costs;
	}

	function getPCCosts() {
		const rulesCost = V.rulesCost;
		let costs = 0;

		// Accessibility costs
		if (V.boobAccessibility !== 1 && V.PC.boobs >= 25000) {
			costs += 50;
		}
		if (V.pregAccessibility !== 1 && V.PC.belly >= 300000) {
			costs += 100;
		}
		if (V.dickAccessibility !== 1 && V.PC.dick >= 20) {
			costs += 50;
		}
		if (V.ballsAccessibility !== 1 && V.PC.balls > 90) {
			costs += 50;
		}
		if (V.buttAccessibility !== 1 && V.PC.butt > 15) {
			costs += 50;
		}
		if (!canSee(V.PC)) {
			costs += 50;
		} else if (getWorstVision(V.PC) === 1) {
			costs += 25;
		}
		if (!canHear(V.PC)) {
			costs += 40;
		} else if (V.PC.hears <= -1) {
			costs += 15;
		}
		if (!isMovable(V.PC)) {
			costs += rulesCost;
		} else if (!canWalk(V.PC)) {
			costs += Math.trunc(rulesCost * 0.50);
		} else {
			if (!hasAllLimbs(V.PC)) {
				costs += Math.trunc(getLimbCount(V.PC, 0) * 0.25);
			}
			if (hasAnyProstheticLimbs(V.PC)) {
				costs += Math.trunc(getLimbCount(V.PC, 102) * 0.125);
			}
		}

		// Maintenance
		if (V.PC.boobsImplant > 10000 && V.PC.boobsImplantType === "string") {
			costs += 50;
		}
		if (V.PC.buttImplant > 5 && V.PC.buttImplantType === "string") {
			costs += 50;
		}

		// Pregnancy
		if (V.PC.preg >= 16) {
			costs += 100;
		}
		return costs;
	}

	function getPCMultiplierCosts(cost) {
		if (!onBedRest(V.PC, true)) {
			if (isPCCareerInCategory("servant")) {
				if (V.personalAttention.task === PersonalAttention.MAID) {
					if (!isMovable(V.PC)) {
						cost *= 1; // Just for keeping values in sync with persBusiness.
					} else if (isTrapped(V.PC)) {
						cost *= 0.98;
					} else if (isHindered(V.PC) || V.PC.energy > 95) {
						cost *= 0.85;
					} else {
						cost *= 0.75;
					}
				} else if (isMovable(V.PC) && !isTrapped(V.PC)) {
					cost *= 0.9;
				}
			}
		}
		return cost;
	}

	function getEnvironmentCosts(cost = 0) {
		if (V.secExpEnabled > 0 && V.SecExp.buildings.transportHub) {
			cost *= (1 - V.SecExp.buildings.transportHub.surfaceTransport * 0.05);
		}
		return Math.trunc(cost);
	}

	/**
	 * @returns {number}
	 */
	function getSFCosts() {
		if (V.SF.Toggle && V.SF.Active >= 1) {
			return App.Mods.SF.AAR()[1];
		}
		return 0;
	}

	function getWeatherCosts() {
		let costs = 0;
		if (V.econWeatherDamage && V.disasterResponse > 0) {
			costs += Math.trunc(V.disasterResponse * 200000 / V.localEcon);
		}
		if (V.antiWeatherFreeze > 0) {
			costs += Math.trunc(V.antiWeatherFreeze * 200000 / V.localEcon);
		}
		return costs;
	}
})();

/**
 * The total amount of slaves that could be served by all the servants combined
 */
globalThis.totalServantCapacity = function() {
	let numberServed = 0;
	App.Utils.jobForAssignment(Job.QUARTER).employees().forEach(s => {
		numberServed += houseServantEffectiveness(s);
	});
	App.Utils.jobForAssignment(Job.HOUSE).employees().forEach(s => {
		numberServed += houseServantEffectiveness(s);
	});
	return numberServed;
};

/**
 * The amount of slaves served by a servant
 * @param {App.Entity.SlaveState} slave
 */
globalThis.houseServantEffectiveness = function(slave) {
	let effectiveness = 0;
	if (slave.trust < -20) {
		effectiveness = 80;
	} else if (slave.devotion < -20) {
		effectiveness += (slave.trust >= 20) ? 25 : 50;
	} else if (slave.devotion <= 20) {
		effectiveness = 65;
	} else if (slave.devotion <= 50) {
		effectiveness = 80;
	} else {
		effectiveness = 100;
	}
	if (slave.fetish === 'submissive') {
		effectiveness *= 1.1;
	} else if (slave.fetish === 'dom') {
		effectiveness *= 0.9;
	}
	if (slave.relationship < -1) {
		effectiveness *= 1.1;
	}
	if (slave.energy < 20) {
		effectiveness *= 1.1;
	} else if (slave.energy < 40) {
		effectiveness *= 1.05;
	}
	if (slave.lactation > 0) {
		effectiveness *= 1.025;
	}
	if (slave.assignment === Job.QUARTER) {
		effectiveness *= 1.1;
	}
	if (App.Data.Careers.General.servant.includes(slave.career) || slave.skill.servant >= Constant.MASTERED_XP) {
		effectiveness *= 1.1;
	}
	effectiveness = Math.trunc(effectiveness * App.SlaveAssignment.PartTime.efficiencyModifier(slave) * restEffects(slave) / 10);
	return effectiveness;
};

/**
 * Used only when you don't have a slave object in hand, such as in the encyclopedia.
 * The rulesCost parameter is for potentially showing the effects of different difficulty settings.
 * @param {FC.Rules.LivingFreezed} living
 * @param {number} rulesCost
 * @param {FC.Rules.Relationship} relationship
 * @param {FC.Assignment} assignment
 * @returns {number}
 */
globalThis.getLivingExpenses = function(living, rulesCost = 0, relationship = 0, assignment = Job.REST) {
	let cost = 0;
	switch (assignment) {
		case Job.ARCADE:
			cost += rulesCost * 0.75;
			break;
		case Job.DAIRY:
			if (V.dairyRestraintsSetting >= 2) {
				cost += rulesCost * 0.75;
			} else if (living === LivingRule.NORMAL) {
				cost += rulesCost * 1.5;
			} else if (V.dairyDecoration === 'Degradationist') {
				cost += rulesCost * 0.90;
			} else {
				cost += rulesCost;
			}
			break;
		case Job.FARMYARD:
			if (living === LivingRule.NORMAL) {
				cost += rulesCost * 1.5;
			} else if (V.farmyardDecoration === 'Roman Revivalist') {
				cost += rulesCost * 1.5;
			} else {
				cost += rulesCost;
			}
			break;
		case Job.BROTHEL:
			cost += (living === LivingRule.NORMAL) ? rulesCost * 1.5 : rulesCost;
			break;
		case Job.SCHOOL:
		case Job.CLUB:
			cost += rulesCost * 1.5;
			break;
		case Job.CLINIC:
			if (living === LivingRule.LUXURIOUS) {
				cost += rulesCost * 2;
			} else if (living === LivingRule.NORMAL) {
				cost += rulesCost * 1.5;
			} else {
				cost += rulesCost;
			}
			break;
		case Job.SPA:
		case Job.NURSERY:
			if (living === LivingRule.LUXURIOUS) {
				cost += rulesCost * 1.75;
			} else if (living === LivingRule.NORMAL) {
				cost += rulesCost * 1.5;
			} else {
				cost += rulesCost;
			}
			break;
		case Job.QUARTER:
			if (living === LivingRule.NORMAL) {
				cost += rulesCost * 1.5;
			} else {
				cost += (V.servantsQuartersDecoration === 'Degradationist') ? rulesCost * 0.90 : rulesCost;
			}
			break;
		case Job.CELLBLOCK:
			cost += (living === LivingRule.NORMAL) ? rulesCost * 1.25 : rulesCost * 0.90;
			break;
		case Job.MADAM:
		case Job.DJ:
		case Job.NURSE:
		case Job.WARDEN:
		case Job.ATTENDANT:
		case Job.STEWARD:
		case Job.MILKMAID:
		case Job.FARMER:
		case Job.TEACHER:
		case Job.MATRON:
			cost += rulesCost * 2;
			break;
		default:
			if (living === LivingRule.LUXURIOUS) {
				cost += rulesCost * (relationship >= 4 ? 3 : 4);
			} else if (living === LivingRule.NORMAL) {
				cost += rulesCost * 2;
			} else {
				cost += rulesCost;
			}
			break;
	}
	return Math.trunc(cost);
};

/**
 * This is what you should always call to get a slave's living expenses for normal use.
 * @param {App.Entity.SlaveState} s
 * @returns {number}
 */
globalThis.getSlaveLivingExpenses = function(s) {
	return getLivingExpenses(s.rules.living, V.rulesCost, s.relationship, s.assignment);
};

/**
 * @param {App.Entity.SlaveState} s
 * @returns {Array<{text:string, value:number}>}
 */
globalThis.getSlaveCostArray = function(s) {
	// Data duplicated from Cost Report
	let retval = [];
	let t = "";
	const slimnessFoodMod = V.arcologies[0].FSSlimnessEnthusiastFoodLaw === 1 ? 1.15 : 1;
	const rulesCost = V.rulesCost;
	const foodCost = V.mods.food.cost * slimnessFoodMod;
	const drugsCost = V.drugsCost;

	retval.push({text: "Living Expenses", value: getSlaveLivingExpenses(s)});

	// Food
	retval.push({
		text: "Basic slave food cost",
		value: Math.trunc(foodCost * 4)
	});

	switch (s.diet) {
		case 'fattening':
		case 'muscle building':
			retval.push({
				text: "Heavy diet",
				value: Math.trunc(foodCost)
			});
			break;
		case 'restricted':
		case 'slimming':
			retval.push({
				text: "Light diet, reduced by",
				value: -Math.abs(Math.trunc(foodCost))
			});
			break;
	}
	if (s.weight > 130) {
		retval.push({
			text: "Heavy weight",
			value: Math.trunc(foodCost * 2)
		});
	} else if (s.weight > 50) {
		retval.push({
			text: "High weight",
			value: Math.trunc(foodCost)
		});
	} else if (s.weight < -50) {
		retval.push({
			text: "Light weight, reduced by",
			value: -Math.abs(Math.trunc(foodCost))
		});
	}
	if (s.geneticQuirks.fertility === 2 && s.geneticQuirks.hyperFertility === 2 && s.preg === 0 && (s.ovaries === 1 || s.mpreg === 1)) {
		if (V.geneticMappingUpgrade > 0) {
			retval.push({
				text: "Additional dietary supplements due to genetic hyper-fertility",
				value: Math.trunc(foodCost * 0.5)
			});
		} else {
			retval.push({
				text: "Adjustment for unusual dietary deficiencies",
				value: Math.trunc(foodCost * 0.5)
			});
		}
	}
	if (s.geneticQuirks.rearLipedema === 2) {
		if (V.geneticMappingUpgrade > 0) {
			retval.push({
				text: "Additional dietary supplements due to lipedema",
				value: Math.trunc(foodCost * 0.2)
			});
		} else {
			retval.push({
				text: "Adjustment for unusual dietary deficiencies",
				value: Math.trunc(foodCost * 0.2)
			});
		}
	}
	if (s.geneticQuirks.macromastia === 2) {
		if (V.geneticMappingUpgrade > 0) {
			retval.push({
				text: "Additional dietary supplements due to macromastia",
				value: Math.trunc(foodCost * 0.2)
			});
		} else {
			retval.push({
				text: "Adjustment for unusual dietary deficiencies",
				value: Math.trunc(foodCost * 0.2)
			});
		}
	}
	if (s.geneticQuirks.gigantomastia === 2) {
		if (V.geneticMappingUpgrade > 0) {
			retval.push({
				text: "Additional dietary supplements due to gigantomastia",
				value: Math.trunc(foodCost * 0.2)
			});
		} else {
			retval.push({
				text: "Adjustment for unusual dietary deficiencies",
				value: Math.trunc(foodCost * 0.2)
			});
		}
	}
	if (s.geneticQuirks.mGain === 2 && s.geneticQuirks.mLoss !== 2) {
		if (V.geneticMappingUpgrade > 0) {
			retval.push({
				text: "Additional dietary supplements due to myotonic hypertrophy",
				value: Math.trunc(foodCost * 0.2)
			});
		} else {
			retval.push({
				text: "Adjustment for unusual dietary deficiencies",
				value: Math.trunc(foodCost * 0.2)
			});
		}
	}
	if (s.geneticQuirks.wGain === 2 && s.geneticQuirks.wLoss !== 2) {
		if (V.geneticMappingUpgrade > 0) {
			retval.push({
				text: "Additional dietary supplements due to hyperleptinemia",
				value: Math.trunc(foodCost * 0.2)
			});
		} else {
			retval.push({
				text: "Adjustment for unusual dietary deficiencies",
				value: Math.trunc(foodCost * 0.2)
			});
		}
	}
	if (s.drugs === 'appetite suppressors') {
		retval.push({
			text: "Food saved via suppressed appetite",
			value: -Math.abs(Math.trunc(foodCost))
		});
	}
	if (s.lactation > 0) {
		t = "Food to support ";
		if (s.lactation > 1) {
			t += "heavy ";
		} else {
			t += "natural ";
		}
		t += "lactation from ";
		if (Math.trunc(s.boobs / 10000) > 2) {
			t += "absurd udders";
		} else if (Math.trunc(s.boobs / 10000) > 1) {
			t += "enormous boobs";
		} else {
			t += "reasonable breasts";
		}
		retval.push({
			text: t,
			value: Math.trunc(foodCost * s.lactation * (1 + (s.boobs / 10000)))
		});
	}
	if (s.geneMods.livestock === 1) {
		retval.push({
			text: "Increased portion sizes for gene therapy induced appetite increase",
			value: Math.trunc(foodCost * 0.2)
		});
		if (s.lactation > 0) {
			retval.push({
				text: "Extra feeding costs to support gene therapy enhanced milk production",
				value: Math.trunc(foodCost * (1 + s.lactationAdaptation / 400))
			});
		}
		if (isVirile(s)) {
			retval.push({
				text: "Extra feeding costs to support gene therapy enhanced sperm production",
				value: Math.trunc(foodCost * (1.1 + Math.trunc(s.balls / 100)))
			});
		}
	}
	if (s.preg > s.pregData.normalBirth / 8) {
		if (s.assignment === Job.DAIRY && V.dairyFeedersSetting > 0) {
			// Extra feeding costs to support pregnancy are covered by dairy feeders.
			// TODO: Include them here anyway?
			retval.push({
				text: "Extra feeding costs to support pregnancy are covered by dairy feeders",
				value: 0
			});
		} else if ((s.assignment === Job.MASTERSUITE || s.assignment === Job.CONCUBINE) &&
			V.masterSuiteUpgradePregnancy === 1) {
			// Extra feeding costs to support pregnancy are covered by master suite luxuries.
			// TODO: Include them here anyway?
			retval.push({
				text: `Extra feeding costs to support pregnancy are covered by ${V.masterSuiteName} luxuries`,
				value: 0
			});
		} else {
			t = "Extra feeding to support ";
			if (s.pregControl === "speed up") {
				t += "accelerated ";
			}
			t += "pregnancy";
			retval.push({
				text: t,
				value: Math.trunc(foodCost * s.pregType * (s.pregControl === 'speed up' ? 3 : 1))
			});

			if (s.pregType >= 100) {
				retval.push({
					text: "Specialized dietary requirements and feeding methods to support absurd multiples",
					value: Math.trunc(foodCost * 5 * s.pregType * (s.pregControl === 'speed up' ? 3 : 1))
				});
			} else if (s.pregType >= 50) {
				retval.push({
					text: "Specialized dietary adjustments and concentrated, quick to digest food required to support absurd multiples",
					value: Math.trunc(foodCost * 3 * s.pregType * (s.pregControl === 'speed up' ? 3 : 1))
				});
			} else if (s.pregType >= 30) {
				retval.push({
					text: "Concentrated, quick to digest food blend to support extreme multiples",
					value: Math.trunc(foodCost * 2 * s.pregType * (s.pregControl === 'speed up' ? 3 : 1))
				});
			} else if (s.pregType >= 10) {
				retval.push({
					text: "Specialized food blend to support multiples",
					value: Math.trunc(foodCost * s.pregType * (s.pregControl === 'speed up' ? 3 : 1))
				});
			}
		}
	}
	if (s.diet === 'XX' || s.diet === 'XY') {
		retval.push({text: "Hormone enriched diet", value: 25});
	} else if (s.diet === 'fertility') {
		retval.push({text: "Specialized fertility diet", value: 25});
	} else if (s.diet === 'cleansing') {
		retval.push({text: "Chemical cleansing diet", value: 50});
	} else if (s.diet === 'XXY') {
		retval.push({text: "Specialized hermaphrodite diet", value: 75});
	}

	// Accessibility costs
	if (V.boobAccessibility !== 1 && s.boobs >= 25000 &&
		(s.assignment !== Job.DAIRY || V.dairyRestraintsSetting < 2) && (s.assignment !== Job.ARCADE)) {
		retval.push({text: "Increased living expenses due to inconveniently huge boobs", value: 50});
	}
	if (V.pregAccessibility !== 1 &&
		(s.belly >= 300000) && s.assignment !== Job.BABY_FACTORY && (s.assignment !== Job.DAIRY || V.dairyRestraintsSetting < 2) && (s.assignment !== Job.ARCADE)) {
		retval.push({text: "Increased living expenses due to an inconveniently huge belly", value: 100});
	}
	if (V.dickAccessibility !== 1 && s.dick > 45 && (s.assignment !== Job.DAIRY || V.dairyRestraintsSetting < 2) && (s.assignment !== Job.ARCADE)) {
		retval.push({text: "Increased living expenses due to an inconveniently huge penis", value: 50});
	}
	if (V.ballsAccessibility !== 1 && s.balls > 90 && (s.assignment !== Job.DAIRY || V.dairyRestraintsSetting < 2) && (s.assignment !== Job.ARCADE)) {
		retval.push({text: "Increased living expenses due to inconveniently huge balls", value: 50});
	}
	if (V.buttAccessibility !== 1 && s.butt > 15 && (s.assignment !== Job.DAIRY || V.dairyRestraintsSetting < 2) && (s.assignment !== Job.ARCADE)) {
		retval.push({text: "Increased living expenses due to an inconveniently huge butt", value: 50});
	}
	if (!canSee(s) && (s.assignment !== Job.DAIRY || V.dairyRestraintsSetting < 2) && (s.assignment !== Job.ARCADE)) {
		retval.push({text: "Increased living expenses due to lack of sight", value: 50});
	} else if (!canSeePerfectly(s)) {
		if (getBestVision(s) < 2) {
			retval.push({text: "Increased living expenses due to poor vision", value: 25});
		} else {
			retval.push({text: "Increased living expenses due to blurred vision", value: 25});
		}
	}
	if (!canHear(s) && (s.assignment !== Job.DAIRY || V.dairyRestraintsSetting < 2) && (s.assignment !== Job.ARCADE)) {
		retval.push({text: "Increased living expenses due to lack of hearing", value: 40});
	} else if (s.hears <= -1 && s.earwear !== 'hearing aids') {
		retval.push({text: "Increased living expenses due to poor hearing", value: 15});
	} else if (s.earwear === 'muffling ear plugs') {
		retval.push({text: "Increased living expenses due to muffled hearing", value: 15});
	}
	if ((s.assignment !== Job.DAIRY || V.dairyRestraintsSetting < 2) && (s.assignment !== Job.ARCADE)) {
		if (!canMove) {
			retval.push({text: "Increased living expenses due to immobility", value: rulesCost});
		} else if (!canWalk) {
			retval.push({text: "Increased living expenses due to limited mobility", value: rulesCost * 0.50});
		} else {
			if (!hasAllLimbs(s)) {
				retval.push({
					text: "Increased living expenses due to limblessness",
					value: Math.trunc(getLimbCount(s, 0) * 0.25 * rulesCost)
				});
			}
			if (hasAnyProstheticLimbs(s)) {
				retval.push({
					text: "Increased living expenses due to prosthetics",
					value: Math.trunc(getLimbCount(s, 102) * 0.125 * rulesCost)
				});
			}
		}
	}

	// Maintenance
	if (s.boobsImplant > 10000 && s.boobsImplantType === "string") {
		retval.push({text: "Maintenance cost for oversized string implants", value: 50});
	}
	if (s.buttImplant > 5 && s.buttImplantType === "string") {
		retval.push({text: "Maintenance cost for oversized string implants", value: 50});
	}
	if ((s.assignment !== Job.DAIRY || V.dairyRestraintsSetting < 2) && (s.assignment !== Job.ARCADE)) {
		if (s.preg > s.pregData.minLiveBirth && V.universalRulesBirthing === 1) {
			retval.push({text: "Coverage cost for daily pregnancy scanning", value: 50});
		}
	}

	// Retirement account
	if (V.policies.retirement.menial2Citizen === 1 && V.policies.retirement.fate !== "citizen") {
		retval.push({text: "Retirement account payments for menials", value: 2});
	}

	if (V.policies.retirement.fate === "citizen") {
		retval.push({text: "Retirement account payments", value: 250});
	}

	// Enemas
	if (s.inflation === 3) {
		switch (s.inflationType) {
			case 'water':
				retval.push({text: "Costs of specially formulated water for enemas; 2 gallons", value: 100});
				break;
			case 'food':
				retval.push({text: "Costs of filler food for slave stuffing; 2 gallons", value: (foodCost * 4)});
				break;
			case 'curative':
			case 'aphrodisiac':
			case 'tightener':
				retval.push({
					text: "Costs of specially formulated drug mixtures for enemas; 2 gallons",
					value: (100 + (drugsCost * 2))
				});
				break;
		}
	} else if (s.inflation === 2) {
		switch (s.inflationType) {
			case 'water':
				retval.push({text: "Costs of specially formulated water for enemas; 1 gallon", value: 50});
				break;
			case 'food':
				retval.push({text: "Costs of filler food for slave stuffing; 1 gallon", value: foodCost * 2});
				break;
			case 'curative':
			case 'aphrodisiac':
			case 'tightener':
				retval.push({
					text: "Costs of specially formulated drug mixtures for enemas",
					value: (50 + (drugsCost * 2))
				});
				break;
		}
	} else if (s.inflation === 1) {
		switch (s.inflationType) {
			case 'water':
				retval.push({text: "Costs of specially formulated water for enemas; 2 quarts", value: 25});
				break;
			case 'food':
				retval.push({text: "Costs of filler food for slave stuffing; 2 quarts", value: foodCost});
				break;
			case 'curative':
			case 'aphrodisiac':
			case 'tightener':
				retval.push({
					text: "Costs of specially formulated drug mixtures for enemas",
					value: (25 + (drugsCost * 2))
				});
				break;
		}
	}

	// Drugs
	switch (s.drugs) {
		case 'anti-aging cream':
			retval.push({text: "Anti-aging creams", value: drugsCost * 10});
			break;
		case 'female hormone injections':
		case 'male hormone injections':
			retval.push({text: "Hormonal injections", value: drugsCost * 5});
			break;
		case 'intensive breast injections':
		case 'intensive butt injections':
		case 'intensive penis enhancement':
		case 'intensive testicle enhancement':
		case 'hyper breast injections':
		case 'hyper butt injections':
		case 'hyper penis enhancement':
		case 'hyper testicle enhancement':
			retval.push({text: "Intensive drugs", value: drugsCost * 5});
			break;
		case 'growth stimulants':
			retval.push({text: "Growth stimulants", value: drugsCost * 5});
			break;
		case 'psychostimulants':
			retval.push({text: "Mental stimulants", value: drugsCost * 5});
			break;
		case 'sag-B-gone':
			retval.push({text: "Questionable infomercial creams", value: Math.trunc(drugsCost * 0.1)});
			break;
		case 'no drugs':
			break;
		default:
			retval.push({text: "Standard drugs", value: drugsCost * 2});
			break;
	}
	if (s.curatives > 0 && assignmentVisible(s)) {
		retval.push({text: "Health drugs", value: drugsCost * s.curatives});
	}
	if (s.aphrodisiacs !== 0) {
		retval.push({text: "Aphrodisiacs/Anaphrodisiacs", value: Math.trunc(drugsCost * Math.abs(s.aphrodisiacs))});
	}
	if (s.hormones !== 0) {
		retval.push({text: "Hormones", value: Math.trunc((drugsCost * Math.abs(s.hormones) * 0.5))});
	}
	if (s.bodySwap > 0) {
		retval.push({text: "JS-Suppressants", value: Math.trunc(drugsCost * s.bodySwap * 10)});
	}
	if (s.preg === -1 && isFertile(s)) {
		retval.push({text: "Contraceptives", value: Math.trunc(drugsCost * 0.5)});
	}

	if ((Job.CONCUBINE === s.assignment || s.relationship === -3) && V.arcologies[0].FSPetiteAdmirationLaw === 1) {
		retval.push({text: "Big & Small Subsidy", value: -200});
	}

	// Tutoring
	if (tutorForSlave(s) && (Job.CLASSES === s.assignment || Job.SCHOOL === s.assignment)) {
		retval.push({text: "Tutoring expenses", value: 7500});
	}

	return retval;
};

/**
 * @param {App.Entity.SlaveState} s
 * @returns {number}
 */
globalThis.getSlaveCost = function(s) {
	return getSlaveCostArray(s).reduce((result, {value}) => result + value, 0);
};

/**
 * This is solely for future-proofing; at the moment, contract costs are not dynamic.
 * @returns {number}
 */
globalThis.sexSlaveContractCost = function() {
	return Constant.SEX_SLAVE_CONTRACT_COST;
};

/**
 * This function calculates the market price for menial slaves given market conditions.
 * In almost all cases, you should call the menialSlaveCost() wrapper instead.
 * The only reason to call menialSlaveCostInTheory() is to calculate a market price in a hypothetical situation.
 * @param {number} menialDemandFactor
 * @param {number} menialSupplyFactor
 * @param {number} slaveCostRandom
 * @param {number} q
 * @returns {number}
 */
globalThis.menialSlaveCostInTheory = function(menialDemandFactor = 0, menialSupplyFactor = 0, slaveCostRandom = 0, q = 0) {
	const baseCost = 1000;
	return (Math.trunc(baseCost + menialDemandFactor / 400 - menialSupplyFactor / 400 + q / 400) + slaveCostRandom);
};

/**
 * Supply and Demand for slaves (linear, simple)
 * PC buying slaves reduces supply, selling slaves reduces demand.
 * @param {number} q
 * @returns {number}
 */
globalThis.menialSlaveCost = function(q = 0) {
	return menialSlaveCostInTheory(V.menialDemandFactor, V.menialSupplyFactor, V.slaveCostRandom, q);
};

globalThis.NPCSexSupply = function(lowerDemandLeft, lowerTotalDemand, middleDemandLeft, middleTotalDemand, upperDemandLeft, upperTotalDemand, topDemandLeft, topTotalDemand) {
	const NPCSexSupply = {
		lowerClass: V.NPCSexSupply.lowerClass,
		middleClass: V.NPCSexSupply.middleClass,
		upperClass: V.NPCSexSupply.upperClass,
		topClass: V.NPCSexSupply.topClass
	};

	// Lower class calculations
	const lowerClassNPCRatio = NPCSexSupply.lowerClass / lowerDemandLeft;
	const lowerClassOptimalRatio = 0.5 + V.sexSubsidies.lowerClass / 10 - V.sexSupplyBarriers.lowerClass / 10;
	const lowerClassOptimal = lowerDemandLeft * lowerClassOptimalRatio;
	if (NPCSexSupply.lowerClass > lowerTotalDemand * (0.3 - V.sexSupplyBarriers.lowerClass / 20)) { // Checking if NPCs are supplying more than the standard minimum share of supply
		if (lowerClassNPCRatio >= lowerClassOptimalRatio + 0.05) { // NPCs provide more than they really care to and some wish to stop providing sexual services, max reduction of 10% of previous
			NPCSexSupply.lowerClass -= Math.min(NPCSexSupply.lowerClass - Math.trunc((NPCSexSupply.lowerClass * 4 + lowerClassOptimal) / 5), Math.trunc(NPCSexSupply.lowerClass * 0.1));
		} else if (lowerClassNPCRatio <= lowerClassOptimalRatio - 0.05) { // NPCs see business opportunities and provide more sexual services, minimum increase of 500, max of 10% of previous
			NPCSexSupply.lowerClass += Math.trunc(Math.clamp((NPCSexSupply.lowerClass * 4 + lowerClassOptimal) / 5 - NPCSexSupply.lowerClass, 500, NPCSexSupply.lowerClass * 0.1) * (1 - V.sexSupplyBarriers.lowerClass / 5)); // Slow down NPC growth through bureaucracy
		} else {
			NPCSexSupply.lowerClass = Math.trunc(NPCSexSupply.lowerClass * (1 + normalRandInt(0, 20) / 1000)); // Some random fluxuations whenever the NPC supply is roughly on target.
		}
	} else { // Increase NPC supply if it drops below the standard minimum share of supply
		NPCSexSupply.lowerClass += Math.max(Math.trunc(NPCSexSupply.lowerClass * (normalRandInt(150, 10) / 1000)), 500);
	}

	// Middle class calculations
	const middleClassNPCRatio = NPCSexSupply.middleClass / middleDemandLeft;
	const middleClassOptimalRatio = 0.5 + V.sexSubsidies.middleClass / 10 - V.sexSupplyBarriers.middleClass / 10;
	const middleClassOptimal = middleDemandLeft * middleClassOptimalRatio;
	if (NPCSexSupply.middleClass > middleTotalDemand * (0.3 - V.sexSupplyBarriers.middleClass / 20)) {
		if (middleClassNPCRatio >= middleClassOptimalRatio + 0.05) {
			NPCSexSupply.middleClass -= Math.min(NPCSexSupply.middleClass - Math.trunc((NPCSexSupply.middleClass * 4 + middleClassOptimal) / 5), Math.trunc(NPCSexSupply.middleClass * 0.1));
		} else if (middleClassNPCRatio <= middleClassOptimalRatio - 0.05) {
			NPCSexSupply.middleClass += Math.trunc(Math.clamp((NPCSexSupply.middleClass * 4 + middleClassOptimal) / 5 - NPCSexSupply.middleClass, 500, NPCSexSupply.middleClass * 0.1) * (1 - V.sexSupplyBarriers.middleClass / 5));
		} else {
			NPCSexSupply.middleClass = Math.trunc(NPCSexSupply.middleClass * (1 + normalRandInt(0, 20) / 1000));
		}
	} else {
		NPCSexSupply.middleClass += Math.max(Math.trunc(NPCSexSupply.middleClass * (normalRandInt(150, 10) / 1000)), 500);
	}

	// Upper class Calculations
	const upperClassNPCRatio = NPCSexSupply.upperClass / upperDemandLeft;
	const upperClassOptimalRatio = 0.5 + V.sexSubsidies.upperClass / 10 - V.sexSupplyBarriers.upperClass / 10;
	const upperClassOptimal = upperDemandLeft * upperClassOptimalRatio;
	if (NPCSexSupply.upperClass > upperTotalDemand * (0.3 - V.sexSupplyBarriers.upperClass / 20)) {
		if (upperClassNPCRatio >= upperClassOptimalRatio + 0.05) {
			NPCSexSupply.upperClass -= Math.min(NPCSexSupply.upperClass - Math.trunc((NPCSexSupply.upperClass * 4 + upperClassOptimal) / 5), Math.trunc(NPCSexSupply.upperClass * 0.1));
		} else if (upperClassNPCRatio <= upperClassOptimalRatio - 0.05) {
			NPCSexSupply.upperClass += Math.trunc(Math.clamp((NPCSexSupply.upperClass * 4 + upperClassOptimal) / 5 - NPCSexSupply.upperClass, 500, NPCSexSupply.upperClass * 0.1) * (1 - V.sexSupplyBarriers.upperClass / 5));
		} else {
			NPCSexSupply.upperClass = Math.trunc(NPCSexSupply.upperClass * (1 + normalRandInt(0, 20) / 1000));
		}
	} else {
		NPCSexSupply.upperClass += Math.max(Math.trunc(NPCSexSupply.upperClass * (normalRandInt(150, 10) / 1000)), 500);
	}

	// Top class calculations
	const topClassNPCRatio = NPCSexSupply.topClass / topDemandLeft;
	const topClassOptimalRatio = 0.5 + V.sexSubsidies.topClass / 8 - V.sexSupplyBarriers.topClass / 10;
	const topClassOptimal = topDemandLeft * topClassOptimalRatio;
	if (NPCSexSupply.topClass > topTotalDemand * (0.3 - V.sexSupplyBarriers.topClass / 20)) {
		if (topClassNPCRatio >= topClassOptimalRatio + 0.025) {
			NPCSexSupply.topClass -= Math.min(NPCSexSupply.topClass - Math.trunc((NPCSexSupply.topClass * 4 + topClassOptimal) / 5), Math.trunc(NPCSexSupply.topClass * 0.1));
		} else if (topClassNPCRatio <= topClassOptimalRatio - 0.025) {
			NPCSexSupply.topClass += Math.trunc(Math.clamp((NPCSexSupply.topClass * 4 + topClassOptimal) / 5 - NPCSexSupply.topClass, 500, NPCSexSupply.topClass * 0.1) * (1 - V.sexSupplyBarriers.topClass / 5));
		} else {
			NPCSexSupply.topClass = Math.trunc(NPCSexSupply.topClass * (1 + normalRandInt(0, 20) / 1000));
		}
	} else {
		NPCSexSupply.topClass += Math.max(Math.trunc(NPCSexSupply.topClass * (normalRandInt(150, 10) / 1000)), 500);
	}

	return NPCSexSupply;
};

// The function for calculating and storing a slave's sexual interaction with citizens/'the outside'
globalThis.slaveJobValues = function(lowerClassSexDemandRef, middleClassSexDemandRef, upperClassSexDemandRef, topClassSexDemandRef) {
	const slaveJobValues = {
		arcade: 0,
		club: 0,
		clubSP: 0,
		brothel: {
			lowerClass: 0,
			middleClass: 0,
			upperClass: 0,
			topClass: 0,
			boost: 0
		} // A list of values for each tier of whore (low, middle, upper, top) and a variable for the amount of money earned through the boost
	};
	let clubSpots;
	let brothelSpots;
	let toTheClubTotal = 0;
	let toTheBrothelTotal = 0;
	const AL = App.Entity.facilities.arcade.employeesIDs().size;
	const CL = App.Entity.facilities.club.employeesIDs().size;
	const BL = App.Entity.facilities.brothel.employeesIDs().size;
	V.clubSlavesGettingHelp = 0;
	V.brothelSlavesGettingHelp = 0;

	// This section is for specific slaves or non-unique slaves adding their values to the whole
	// Accounting for Fuckdolls
	if (V.fuckdolls > 0) {
		slaveJobValues.arcade += (V.fuckdolls - (V.arcade - AL)) * 150 + (V.arcade - AL) * (200 + 20 * V.arcadeUpgradeInjectors);
	}

	// Accounting for the DJ
	if (S.DJ) {
		// The DJ adding to 'club'
		SJVClub(S.DJ);
	}

	// Checking for space in the club
	if (V.club > 0 && CL < V.club) {
		clubSpots = V.club - CL;
	}

	// Accounting for the Madam
	if (V.MadamID !== 0) {
		const madam = S.Madam;
		const madamIntel = madam.intelligence + madam.intelligenceImplant;
		App.EndWeek.saVars.madamBonus = 0;
		if (madam.relationship === -3 && madam.devotion > 50) {
			// As your loving ${wife}, ${he} does $his best to attract attention to your brothel.
			App.EndWeek.saVars.madamBonus += 0.25;
		}
		if (madam.skill.whoring > 10 && madam.skill.whoring <= 30) {
			// S.Madam.slaveName's basic skills marginally yellowgreen;improve business at V.brothelName.
			App.EndWeek.saVars.madamBonus += 0.05;
		} else if (madam.skill.whoring <= 60) {
			// S.Madam.slaveName's skills yellowgreen;improve business at V.brothelName.
			App.EndWeek.saVars.madamBonus += 0.1;
		} else if (madam.skill.whoring < 100) {
			// S.Madam.slaveName's skills greatly yellowgreen;improve business at V.brothelName.
			App.EndWeek.saVars.madamBonus += 0.15;
		} else {
			// S.Madam.slaveName's mastery immensely yellowgreen;improves business at V.brothelName.
			App.EndWeek.saVars.madamBonus += 0.20;
		}
		if (madam.actualAge > 35) {
			// $His age and experience also contribute.
			App.EndWeek.saVars.madamBonus += 0.05;
		} else if (V.AgePenalty === 0) {
			App.EndWeek.saVars.madamBonus += 0.05;
		}
		if (App.Data.Careers.Leader.madam.includes(madam.career)) {
			// $He has experience from $his life before $he was a slave that helps $him in the seedy business of selling other people's bodies for sex.
			App.EndWeek.saVars.madamBonus += 0.05;
		} else if (madam.skill.madam >= Constant.MASTERED_XP) {
			// $He has experience from working for you that helps $him in the seedy business of selling other people's bodies for sex.
			App.EndWeek.saVars.madamBonus += 0.05;
		} else if (madam.skill.madam > 120) {
			App.EndWeek.saVars.madamBonus += 0.03;
		} else if (madam.skill.madam > 60) {
			App.EndWeek.saVars.madamBonus += 0.02;
		} else if (madam.skill.madam > 20) {
			App.EndWeek.saVars.madamBonus += 0.01;
		}
		if (madamIntel > 15) {
			// $He is a clever manager.
			App.EndWeek.saVars.madamBonus += 0.05 * Math.floor((-0.00008 * madamIntel * madamIntel) + (0.0337 * madamIntel) + 0.5);
		}
		if (madam.dick > 2 && canPenetrate(madam)) {
			if (S.Madam.skill.penetrative > 90) {
				// $His skilled dick incentivizes the bitches to behave.
				App.EndWeek.saVars.madamBonus += 0.07;
			} else if (S.Madam.skill.penetrative > 10) {
				// $His turgid dick helps $him manage the bitches.
				App.EndWeek.saVars.madamBonus += 0.05;
			} else {
				// `$He tries to use $his turgid cock to keep the bitches in line, but $his lack of skill only leaves them off kilter.
				App.EndWeek.saVars.madamBonus -= 0.05;
			}
		}
		for (const slave of App.Entity.facilities.brothel.employees()) {
			if (madam.relationshipTarget === slave.ID) {
				App.EndWeek.saVars.madamBonus -= 0.05;
			} else if (areRelated(madam, slave)) {
				App.EndWeek.saVars.madamBonus += 0.05;
			}
			if (slave.prestigeDesc === "$He is a famed Free Cities whore, and commands top prices.") {
				App.EndWeek.saVars.madamBonus += 0.15;
			} else if (slave.prestigeDesc === "$He is a famed Free Cities slut, and can please anyone.") {
				App.EndWeek.saVars.madamBonus += 0.15;
			} else if (slave.prestigeDesc === "$He is remembered for winning best in show as a dairy cow.") {
				if (FutureSocieties.isActive('FSPhysicalIdealist')) {
					if (slave.muscles > 60 && slave.weight < 30 && slave.lactation > 0 && slave.boobs - slave.boobsImplant > 6000) {
						App.EndWeek.saVars.madamBonus += 0.15;
					}
				} else if (slave.lactation > 0 && slave.boobs - slave.boobsImplant > 6000) {
					App.EndWeek.saVars.madamBonus += 0.10;
				}
			} else if (slave.prestigeDesc === "$He is remembered for winning best in show as a cockmilker.") {
				if (FutureSocieties.isActive('FSGenderFundamentalist')) {
					if (slave.balls === 0 && slave.dick === 0 && slave.vagina > -1) { /* this needs review - doesn't fit right. An XY slave would be expected to be masculine. 5.0.0 */
						App.EndWeek.saVars.madamBonus += 0.20;
					}
				} else if ((slave.balls > 5 && slave.dick !== 0) || (slave.balls > 4 && slave.dick !== 0 && slave.prostate > 1)) {
					App.EndWeek.saVars.madamBonus += 0.15;
				}
			} else if (slave.prestigeDesc === "$He is remembered for winning best in show as a breeder.") {
				if (canGetPregnant(slave)) {
					App.EndWeek.saVars.madamBonus += 0.15;
				} else if (isPreg(slave) && slave.bellyPreg >= 5000) {
					App.EndWeek.saVars.madamBonus += 0.1;
				}
			}
		}

		// The Madam adding to 'brothel'
		SJVBrothel(S.Madam, lowerClassSexDemandRef, middleClassSexDemandRef, upperClassSexDemandRef, topClassSexDemandRef);
	}

	// Checking for space in the brothel
	if (V.brothel > 0 && BL < V.club) {
		brothelSpots = V.brothel - BL;
	}

	// Glory hole slaves adding to 'arcade'
	App.Utils.jobForAssignment(Job.GLORYHOLE).employees().forEach(s => {
		const base = ((normalRandInt(600, 20) + (4 - s.anus) * 10 + (4 - s.vagina) * 10 + Math.trunc(s.health.condition / 2)) * 0.75);
		s.sexAmount = Math.trunc(base * restEffects(s, 20) * App.SlaveAssignment.PartTime.efficiencyModifier(s));
		tiredFucks(s);
		slaveJobValues.arcade += s.sexAmount;
	});

	// Arcade slaves adding to 'arcade'
	App.Utils.jobForAssignment(Job.ARCADE).employees().forEach(s => {
		const base = normalRandInt(600, 20) + (4 - (s.anus - 2 * V.arcadeUpgradeInjectors)) * 10 + (4 - (s.vagina - 2 * V.arcadeUpgradeInjectors)) * 10 + s.health.condition / 2;
		s.sexAmount = Math.trunc(base * App.SlaveAssignment.PartTime.efficiencyModifier(s));
		slaveJobValues.arcade += s.sexAmount;
	});

	// Public sluts adding to 'club'
	App.Utils.jobForAssignment(Job.PUBLIC).employees().forEach(s => {
		SJVClub(s);
	});

	// Club sluts adding to 'club'
	App.Utils.jobForAssignment(Job.CLUB).employees().forEach(s => {
		SJVClub(s);
	});

	// Saturation penalty for public servants. Even the most beautiful slaves lose some of their shine if they have too much competition.
	if (slaveJobValues.club > 0) {
		slaveJobValues.clubSP = (Math.pow(slaveJobValues.club / 1000, 0.95) * 1000) / slaveJobValues.club;
	}

	// Street whores adding to 'brothel'
	App.Utils.jobForAssignment(Job.WHORE).employees().forEach(s => {
		SJVBrothel(s, lowerClassSexDemandRef, middleClassSexDemandRef, upperClassSexDemandRef, topClassSexDemandRef);
	});

	// Brothel whores adding to 'brothel'
	App.Utils.jobForAssignment(Job.BROTHEL).employees().forEach(s => {
		SJVBrothel(s, lowerClassSexDemandRef, middleClassSexDemandRef, upperClassSexDemandRef, topClassSexDemandRef);
	});

	function SJVClub(s) {
		let toTheClub = 0;
		let beautyMultiplier = 1;
		let restEffect = restEffects(s, 15);
		s.minorInjury = 0;

		// The beauty multiplier
		if (s.sexualFlaw === "attention whore") {
			beautyMultiplier += 0.1;
		}
		if (FutureSocieties.isActive('FSEdoRevivalist')) {
			beautyMultiplier += V.arcologies[0].FSEdoRevivalist / (V.FSLockinLevel * 3);
		}
		if (((V.universalRulesFacilityWork === 1) && (s.assignment === Job.PUBLIC) && (clubSpots > 0)) || (s.assignment === Job.CLUB)) {
			if (s.assignment === Job.PUBLIC) {
				toTheClub = 1;
				toTheClubTotal += 1;
				V.clubSlavesGettingHelp += 1;
			}
			if (V.clubAdsSpending !== 0) {
				beautyMultiplier += 0.05 * App.Ads.getMatchedCategoryCount(s, "club");
			}
		}
		if (s.assignment === Job.CLUB || toTheClub === 1) {
			beautyMultiplier += DJRepBonus();
			if (canHear(s) === false) {
				beautyMultiplier -= 0.65;
				// $His inability to move to the rhythm of the music is very off putting to those looking to party.
			} else if ((s.hears === -1 && s.earwear !== "hearing aids") || (s.hears === 0 && s.earwear === "muffling ear plugs")) {
				beautyMultiplier -= 0.75;
			}
		}

		// Injuries
		if (s.assignment === Job.PUBLIC && !toTheClub) {
			if (s.curatives < 1 && s.inflationType !== "curative") {
				if (s.health.condition < -50) {
					healthDamage(s, 13);
					s.minorInjury = 1;
				} else if (s.health.condition < -20 && jsRandom(1, 100) > 50) {
					healthDamage(s, 10);
					s.minorInjury = 1;
				} else {
					const canA = canDoAnal(s) ? 1 : 0;
					const canV = canDoVaginal(s) ? 1 : 0;
					let canP = canPenetrate(s) && penetrativeSocialUse(s) >= 40 ? 1 : 0;
					let skilltarget = (100 + (s.skill.anal - 100) * canA * [0, 6, 4, 3][canA + canV + canP] + // 100 -> 0, 600, 400, 300
						(s.skill.vaginal - 100) * canV * [0, 6, 4, 3][canA + canV + canP] + // 100 -> 0, 600, 400, 300
						(s.skill.penetrative - 100) * canP * [0, 6, 4, 3][canA + canV + canP] + // 100 -> 0, 600, 400, 300
						(s.skill.oral - 100) * [12, 6, 4, 3][canA + canV + canP] // 100 -> 1200, 600, 400, 300
					) / 12 * .9;
					// Complicated, I know - but it should automatically account for what acts are possible to scale the injury risk smoothly between 90% when totally unskilled
					// and 0% when perfectly skilled in the relevant method or methods.

					if (jsRandom(1, 100) > skilltarget) {
						healthDamage(s, 10 - 7 * canA * (canV | canP)); // Any limitations means an injury inflicts the harsher 10 instead of 3
						s.minorInjury = 1;
					}
				}
			}
			if (s.minorInjury === 1) {
				let injuryChance;
				beautyMultiplier -= 0.05;
				if (canDoAnal(s)) {
					injuryChance = jsRandom(1, 100);
				} else {
					injuryChance = jsRandom(1, 80);
				}
				if (injuryChance > 80) {
					s.minorInjury = "sore ass";
				} else if (injuryChance > 60) {
					s.minorInjury = "black eye";
				} else if (injuryChance > 40) {
					s.minorInjury = "split lip";
				} else if (injuryChance > 20) {
					s.minorInjury = "bad bruise";
				} else {
					s.minorInjury = "sore muscle";
				}
			}
		}

		// The amount of sexual acts
		s.sexAmount = Beauty(s) / 2 + 100;

		if (s.assignment === Job.DJ) {
			if ((CL + toTheClubTotal > 0) && (CL + toTheClubTotal < 10)) {
				s.sexAmount *= (10 - CL - toTheClubTotal) / 10;
			}
		}
		if (restEffect !== healthPenalty(s)) {
			s.sexAmount *= restEffect;
		}
		s.sexAmount = Math.trunc(s.sexAmount * beautyMultiplier *
			App.SlaveAssignment.PartTime.efficiencyModifier(s) // We know the full-time numbers, let's check how much they actually work.
		);

		// The effect of sexual acts on tiredness
		tiredFucks(s);

		// The quality/value of each sexual act
		s.sexQuality = FResult(s);
		if (!App.Utils.hasNonassignmentSex(s) && s.rules.reward !== "orgasm" && s.energy >= 20) {
			s.sexQuality += 2;
		}
		if (canDoAnal(s) && s.anus === 0) {
			s.sexQuality += 5; // This was at 10, not sure what the reasoning behind that was
		}
		if (canDoVaginal(s) && s.vagina === 0) {
			s.sexQuality += 5;
		}
		if (s.devotion > 95 || s.energy > 95) {
			s.sexQuality += 2;
		} else if (s.devotion > 50) {
			s.sexQuality += 1;
		} else if (s.trust > -20 && s.trust <= 20) {
			s.sexQuality -= 1;
		} else if (s.trust < -20) {
			s.sexQuality -= 2;
		}
		if (s.assignment === Job.CLUB) {
			s.sexQuality += 2;
		} else if (toTheClub === 1) {
			s.sexQuality += 2;
			clubSpots -= 1;
		}
		if (healthPenalty(s) < restEffect) {
			s.sexQuality = Math.trunc(s.sexQuality * healthPenalty(s) / restEffect);
		}
		if (s.assignment !== Job.RECRUITER) {
			slaveJobValues.club += Math.trunc(s.sexAmount * s.sexQuality);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} s
	 * @param {number} lowerClassSexDemandRef
	 * @param {number} middleClassSexDemandRef
	 * @param {number} upperClassSexDemandRef
	 * @param {number} topClassSexDemandRef
	 */
	function SJVBrothel(s, lowerClassSexDemandRef, middleClassSexDemandRef, upperClassSexDemandRef, topClassSexDemandRef) {
		let toTheBrothel = 0;
		let beautyMultiplier = 1;
		s.minorInjury = 0;

		// Beauty multipliers
		if (s.sexualFlaw === "neglectful") {
			beautyMultiplier += 0.1;
		}
		if ((s.hears === -1 && s.earwear !== "hearing aids") || (s.hears === 0 && s.earwear === "muffling ear plugs") || (s.hears === -2)) {
			if (!canHear(s)) {
				beautyMultiplier -= 0.25;
			} else {
				beautyMultiplier -= 0.10;
			}
		}
		if (V.brothel > 0) {
			if ((V.universalRulesFacilityWork === 1 && s.assignment === Job.WHORE && brothelSpots > 0) || (s.assignment === Job.BROTHEL)) {
				if (s.assignment === Job.WHORE) {
					toTheBrothel = 1;
					toTheBrothelTotal += 1;
					V.brothelSlavesGettingHelp += 1;
				}
				// ads
				if (V.brothelAdsSpending !== 0) {
					beautyMultiplier += 0.05 * App.Ads.getMatchedCategoryCount(s, "brothel");
				}
				if (V.MadamID !== 0) {
					if (App.EndWeek.saVars.madamBonus > 0) {
						if (!canHear(s)) {
							beautyMultiplier += App.EndWeek.saVars.madamBonus * 0.5;
						} else {
							beautyMultiplier += App.EndWeek.saVars.madamBonus;
						}
					}
				}
			}
		}

		// Injuries
		if (s.assignment === Job.WHORE && !toTheBrothel) {
			if (s.curatives < 1 && s.inflationType !== "curative") {
				if (s.health.condition < -50) {
					healthDamage(s, 13);
					s.minorInjury = 1;
				} else if (s.health.condition < -20 && jsRandom(1, 100) > 50) {
					healthDamage(s, 10);
					s.minorInjury = 1;
				} else {
					const canA = canDoAnal(s) ? 1 : 0;
					const canV = canDoVaginal(s) ? 1 : 0;
					let canP = canPenetrate(s) && penetrativeSocialUse(s) >= 40 ? 1 : 0;
					let skilltarget = (100 + (s.skill.anal - 100) * canA * [0, 6, 4, 3][canA + canV + canP] + // 100 -> 0, 600, 400, 300
						(s.skill.vaginal - 100) * canV * [0, 6, 4, 3][canA + canV + canP] + // 100 -> 0, 600, 400, 300
						(s.skill.penetrative - 100) * canP * [0, 6, 4, 3][canA + canV + canP] + // 100 -> 0, 600, 400, 300
						(s.skill.oral - 100) * [12, 6, 4, 3][canA + canV + canP] // 100 -> 1200, 600, 400, 300
					) / 12 * .9;
					// Complicated, I know - but it should automatically account for what acts are possible to scale the injury risk smoothly between 90% when totally unskilled
					// and 0% when perfectly skilled in the relevant method or methods.

					if (jsRandom(1, 100) > skilltarget) {
						healthDamage(s, 10 - 7 * canA * (canV | canP)); // Any limitations means an injury inflicts the harsher 10 instead of 3
						s.minorInjury = 1;
					}
				}
			}
			if (s.minorInjury === 1) {
				const injuryChance = canDoAnal(s) ? jsRandom(1, 100) : jsRandom(1, 80);
				beautyMultiplier -= 0.05;

				if (injuryChance > 80) {
					s.minorInjury = "sore ass";
				} else if (injuryChance > 60) {
					s.minorInjury = "black eye";
				} else if (injuryChance > 40) {
					s.minorInjury = "split lip";
				} else if (injuryChance > 20) {
					s.minorInjury = "bad bruise";
				} else {
					s.minorInjury = "sore muscle";
				}
			}
		}

		// The amount of sexual acts
		s.sexAmount = Math.trunc(Beauty(s) * beautyMultiplier * (1 + (0.002 * s.skill.whoring)));

		// The quality/value of each sexual act
		s.sexQuality = FResult(s);
		if (!App.Utils.hasNonassignmentSex(s) && s.rules.reward !== "orgasm" && s.energy >= 20) {
			s.sexQuality += 2;
		}
		if (canDoAnal(s) && s.anus === 0) {
			s.sexQuality += 5; // This was at 10, not sure what the reasoning behind that was
		}
		if (canDoVaginal(s) && s.vagina === 0) {
			s.sexQuality += 5;
		}
		if (s.devotion > 95 || s.energy > 95) {
			s.sexQuality += 2;
		} else if (s.devotion > 50) {
			s.sexQuality += 1;
		} else if (s.trust > -20 && s.trust <= 20) {
			s.sexQuality -= 1;
		} else if (s.trust < -20) {
			s.sexQuality -= 2;
		}
		if (s.assignment === Job.BROTHEL || s.assignment === Job.MADAM) {
			s.sexQuality += 2;
		} else if (toTheBrothel === 1) {
			s.sexQuality += 2;
			brothelSpots -= 1;
		}
		if (s.sexQuality < 2) {
			s.sexQuality = 2;
		}

		/**
		 * The whoreScore function finds the appropriate customer class and then calculates the whore income stats associated with that class and adds to the class supply.
		 * whoreClass is the MAXIMUM player set class the whore is allowed to service, if the whore is not eligible it will service the highest it is capable of servicing properly. A whoreClass of 0 means it is on auto (always service the highest possible class).
		 * @param {App.Entity.SlaveState} s
		 * @param {number} lowerClassSexDemandRef
		 * @param {number} middleClassSexDemandRef
		 * @param {number} upperClassSexDemandRef
		 * @param {number} topClassSexDemandRef
		 */
		function whoreScore(s, lowerClassSexDemandRef, middleClassSexDemandRef, upperClassSexDemandRef, topClassSexDemandRef) {
			let income = s.sexAmount * s.sexQuality;
			let sexMin;
			let sexBudget;
			let targetBudget; // Finding the right budget target
			let fuckMin; // minimum amount of fucks
			let fuckDev = 3; // standard deviation of fucks
			const initialHealthPenalty = restEffects(s, 15);
			App.EndWeek.saVars.effectiveWhoreClass[s.ID] = effectiveWhoreClass(s);
			App.EndWeek.saVars.maxWhoreClass[s.ID] = App.EndWeek.saVars.effectiveWhoreClass[s.ID];
			income *= initialHealthPenalty;

			// Automatically changing effectiveWhoreClass
			// what is the initial effective whore class? Are we providing more sex than overall demand? Is the ratio of supply/demand for this tier higher than the one below it?
			// This also takes into consideration public sluts and ignores the NPC market and arcades
			const topSDRatio = slaveJobValues.brothel.topClass / (topClassSexDemandRef - V.NPCSexSupply.topClass);
			const upperSDRatio = slaveJobValues.brothel.upperClass / (upperClassSexDemandRef - V.NPCSexSupply.upperClass);
			const middleClubSupply = slaveJobValues.club * slaveJobValues.clubSP * (middleClassSexDemandRef / (lowerClassSexDemandRef + middleClassSexDemandRef));
			const middleSupply = slaveJobValues.brothel.middleClass + middleClubSupply;
			const middleSDRatio = middleSupply / (middleClassSexDemandRef - V.NPCSexSupply.middleClass);
			const lowerClubSupply = slaveJobValues.club * slaveJobValues.clubSP * (lowerClassSexDemandRef / (lowerClassSexDemandRef + middleClassSexDemandRef));
			const lowerSupply = slaveJobValues.brothel.lowerClass + lowerClubSupply;
			const lowerSDRatio = lowerSupply / (lowerClassSexDemandRef - V.NPCSexSupply.lowerClass);
			let demandBoost = 1;
			let priceBoost = 1;

			if (toTheBrothel === 1 || s.assignment === Job.BROTHEL) {
				demandBoost += V.brothelBoost.eligible / 50;
				priceBoost += V.brothelBoost.eligible / 20;
			}

			if (App.EndWeek.saVars.effectiveWhoreClass[s.ID] === 4 && topSDRatio > 1 && topSDRatio > upperSDRatio) {
				App.EndWeek.saVars.effectiveWhoreClass[s.ID] -= 1;
			}
			if (App.EndWeek.saVars.effectiveWhoreClass[s.ID] === 3 && upperSDRatio > 1 && upperSDRatio > middleSDRatio) {
				App.EndWeek.saVars.effectiveWhoreClass[s.ID] -= 1;
			}
			if (App.EndWeek.saVars.effectiveWhoreClass[s.ID] === 2 && middleSDRatio > 1 && middleSDRatio > lowerSDRatio) {
				App.EndWeek.saVars.effectiveWhoreClass[s.ID] -= 1;
			}

			switch (App.EndWeek.saVars.effectiveWhoreClass[s.ID]) {
				case 1:
					targetBudget = V.whoreBudget.lowerClass * 3;
					fuckMin = 60;
					break;
				case 2:
					targetBudget = V.whoreBudget.middleClass;
					fuckMin = 50;
					break;
				case 3:
					targetBudget = V.whoreBudget.upperClass * 0.5;
					fuckMin = 40;
					break;
				case 4:
					targetBudget = V.whoreBudget.topClass * 0.2;
					fuckMin = 30;
					fuckDev = 2;
					break;
				default:
					targetBudget = V.whoreBudget.lowerClass * 3;
					fuckMin = 60;
			}

			if (initialHealthPenalty !== healthPenalty(s)) {
				fuckMin *= initialHealthPenalty;
			}
			sexMin = normalRandInt(fuckMin, fuckDev); // The minimum of fucks per week; can increase if needed
			sexBudget = Math.trunc(targetBudget); // initial maximum price per fuck; can increase if needed
			while (income > sexBudget * sexMin) { // if the income cannot be caught within the initial values of sexMin and sexBudget we increase both as needed in this loop
				sexMin = Math.trunc(sexMin * 1.1);
				if (income > sexBudget * sexMin) {
					sexBudget = Math.trunc(sexBudget * 1.1);
				}
			}

			s.sexAmount = Math.round(sexMin * demandBoost *
				App.SlaveAssignment.PartTime.efficiencyModifier(s) // We know the full-time numbers, let's check how much they actually work.
			);

			tiredFucks(s); // adding tiredness based on number of fucks and then adjusting income in case the tiredness penalty changed as a result.
			if (healthPenalty(s) < initialHealthPenalty) {
				income *= healthPenalty(s) / initialHealthPenalty;
			}

			s.sexQuality = Math.max(Math.trunc((income * demandBoost * priceBoost) / s.sexAmount), 1);
			const incomeBoostCorrected = Math.trunc(s.sexAmount * s.sexQuality / priceBoost);
			if ((toTheBrothel === 1 || s.assignment === Job.BROTHEL) && V.brothelBoost.eligible > 0) {
				slaveJobValues.brothel.boost += Math.max(Math.trunc(s.sexAmount * s.sexQuality / demandBoost) - Math.trunc(income), 0); // Keeping track of additional benefits from boosting the brothel on the price side and not the amount side.
			}

			switch (App.EndWeek.saVars.effectiveWhoreClass[s.ID]) {
				case 1:
					slaveJobValues.brothel.lowerClass += incomeBoostCorrected; // Registering the job value in the right slot
					break;
				case 2:
					slaveJobValues.brothel.middleClass += incomeBoostCorrected;
					break;
				case 3:
					slaveJobValues.brothel.upperClass += incomeBoostCorrected;
					break;
				case 4:
					slaveJobValues.brothel.topClass += incomeBoostCorrected;
					break;
				default:
					slaveJobValues.brothel.lowerClass += incomeBoostCorrected;
			}
		}

		whoreScore(s, lowerClassSexDemandRef, middleClassSexDemandRef, upperClassSexDemandRef, topClassSexDemandRef);

		if (s.assignment === Job.MADAM) {
			if ((BL + toTheBrothelTotal > 0) && (BL + toTheBrothelTotal < 10)) {
				s.sexAmount = Math.trunc(s.sexAmount * ((10 - BL - toTheBrothelTotal) / 10));
				s.sexQuality = Math.trunc(s.sexQuality * 1.2);
			}
		}
	}

	return slaveJobValues;
};

/**
 * @param {App.Entity.SlaveState} s
 * @returns {number}
 */
globalThis.effectiveWhoreClass = function(s) {
	let score = s.sexAmount * s.sexQuality;
	let result;
	if (typeof s.whoreClass === 'undefined' || s.whoreClass === 0) {
		result = 4;
	} else {
		result = s.whoreClass;
	}
	// Find maximum eligible class
	// these could be refined further if needed.
	if (result === 4 && !(score > 5000 && s.skill.whoring > 80 && s.skill.entertainment > 50)) {
		result -= 1;
	}
	if (result === 3 && !(score > 2500 && s.skill.whoring > 50)) {
		result -= 1;
	}
	if (result === 2 && (score <= 1000)) {
		result -= 1;
	}
	return result;
};

/**
 * When a slave gets reassigned from a development facility to a whoring job during the week end,
 * we have to set her whore class to something valid to prevent errors.  This method is non-ideal
 * and will skew class loads, but it's not really noticeable by the player.
 * @param {App.Entity.SlaveState} slave
 */
globalThis.setReassignedWhoreClass = function(slave) {
	slave.sexAmount = Math.trunc(Beauty(slave) / 5);
	slave.sexQuality = FResult(slave);
	App.EndWeek.saVars.effectiveWhoreClass[slave.ID] = effectiveWhoreClass(slave);
	App.EndWeek.saVars.maxWhoreClass[slave.ID] = App.EndWeek.saVars.effectiveWhoreClass[slave.ID];
};

/**
 * End week function to handle the (menial) slave market prices through supply and demand
 * @returns {void}
 */
globalThis.endWeekSlaveMarket = function() {
	const demandVariance = jsRandom(-10, 10) * 20;
	const supplyVariance = jsRandom(-10, 10) * 20;
	const demand = V.menialDemandFactor;
	const supply = V.menialSupplyFactor;
	const relativeDemand = Math.trunc(Math.pow(Math.abs(demand) / 10000, 2)); // A variable that gets much greater the further demand is from 0
	const relativeSupply = Math.trunc(Math.pow(Math.abs(supply) / 10000, 2));
	let randomDemand;
	let randomSupply;
	V.slaveCostRandom = jsRandom(-3, 3);

	if (V.demandTimer === 0) { // First week setup
		let random = jsRandom(1, 100);
		if (random > 55) {
			V.deltaDemand = normalRandInt(350, 60) * 10;
		} else if (random <= 45) {
			V.deltaDemand = normalRandInt(-350, 60) * 10;
		} else {
			V.deltaDemand = 0;
		}
		newTimer();
		random = jsRandom(1, 100);
		if (random > 55) {
			V.deltaDemand = normalRandInt(350, 60) * 10;
		} else if (random <= 45) {
			V.deltaDemand = normalRandInt(-350, 60) * 10;
		} else {
			V.deltaDemand = 0;
		}
	}

	if (demand >= 50000 && V.deltaDemand >= 0) { // Turning the market around if demand hits the upper bound
		newTimer();
		V.deltaDemand = normalRandInt(-500, 40) * 10; // Force with which the market moves
	} else if (demand <= -50000 && V.deltaDemand <= 0) { // Turning the market around if demand hits the lower bound
		newTimer();
		V.deltaDemand = normalRandInt(500, 40) * 10;
	}

	if (V.elapsedDemandTimer >= V.demandTimer) { // Changing the delta once the timer runs out
		newTimer();
		randomDemand = jsRandom(1, 100) - relativeDemand * 2; // A variable used to determine if demand will go up, down or remain stable while taking into account relativeDemand, thus making movement towards the extreme less likely
		if (demand >= 0) { // If demand is currently positive (or 0) the chances for even greater demand are reduced by randomDemand
			if (randomDemand > 55) {
				V.deltaDemand = normalRandInt(350, 60) * 10;
			} else if (randomDemand <= 45) {
				V.deltaDemand = normalRandInt(-350, 60) * 10;
			} else {
				V.deltaDemand = 0;
			}
		} else { // If demand is currently negative the chances for even lower demand are reduced by randomDemand
			if (randomDemand > 55) {
				V.deltaDemand = normalRandInt(-350, 60) * 10;
			} else if (randomDemand <= 45) {
				V.deltaDemand = normalRandInt(350, 60) * 10;
			} else {
				V.deltaDemand = 0;
			}
		}
	}
	V.elapsedDemandTimer += 1;
	const relativeTimeDemand = V.elapsedDemandTimer / V.demandTimer;
	V.menialDemandFactor += demandVariance + Math.trunc(relativeTimeDemand * V.deltaDemand + (1 - relativeTimeDemand) * V.deltaDemandOld); // Actual movement of demand gradually shifts from old to 'new' deltaDemand

	if (V.supplyTimer === 0) { // First week setup
		let random = jsRandom(1, 100);
		if (random > 55) {
			V.deltaSupply = normalRandInt(350, 60) * 10;
		} else if (random <= 45) {
			V.deltaSupply = normalRandInt(-350, 60) * 10;
		} else {
			V.deltaSupply = 0;
		}
		newTimer("supply");
		random = jsRandom(1, 100);
		if (random > 55) {
			V.deltaSupply = normalRandInt(350, 60) * 10;
		} else if (random <= 45) {
			V.deltaSupply = normalRandInt(-350, 60) * 10;
		} else {
			V.deltaSupply = 0;
		}
	}

	if (supply >= 50000 && V.deltaSupply >= 0) { // Turning the market around if supply hits the upper bound
		newTimer("supply");
		V.deltaSupply = normalRandInt(-500, 40) * 10; // Force with which the market moves
	} else if (supply <= -50000 && V.deltaSupply <= 0) { // Turning the market around if supply hits the lower bound
		newTimer("supply");
		V.deltaSupply = normalRandInt(500, 40) * 10;
	}

	if (V.elapsedSupplyTimer >= V.supplyTimer) { // Changing the delta once the timer runs out
		newTimer("supply");
		randomSupply = jsRandom(1, 100) - relativeSupply * 2;
		if (supply >= 0) { // If supply is currently positive (or 0) the chances for even greater supply are reduced by randomSupply
			if (randomSupply > 55) {
				V.deltaSupply = normalRandInt(350, 60) * 10;
			} else if (randomSupply <= 45) {
				V.deltaSupply = normalRandInt(-350, 60) * 10;
			} else {
				V.deltaSupply = 0;
			}
		} else { // If supply is currently negative the chances for even lower supply are reduced by randomSupply
			if (randomSupply > 55) {
				V.deltaSupply = normalRandInt(-350, 60) * 10;
			} else if (randomSupply <= 45) {
				V.deltaSupply = normalRandInt(350, 60) * 10;
			} else {
				V.deltaSupply = 0;
			}
		}
	}
	V.elapsedSupplyTimer += 1;
	const relativeTimeSupply = V.elapsedSupplyTimer / V.supplyTimer;
	V.menialSupplyFactor += supplyVariance + Math.trunc(relativeTimeSupply * V.deltaSupply + (1 - relativeTimeSupply) * V.deltaSupplyOld); // Actual movement of supply gradually shifts from old to 'new' deltaSupply

	function newTimer(side = "demand") {
		if (side === "demand") {
			V.demandTimer = jsRandom(6, 10);
			V.elapsedDemandTimer = 0;
			V.deltaDemandOld = V.deltaDemand;
		} else if (side === "supply") {
			V.supplyTimer = jsRandom(6, 10);
			V.elapsedSupplyTimer = 0;
			V.deltaSupplyOld = V.deltaSupply;
		}
	}
};

/**
 * @param {App.Entity.SlaveState} s
 * @param {object|undefined} facility
 * @returns {FC.SlaveStatisticData}
 */
globalThis.getSlaveStatisticData = function(s, facility) {
	if (!facility) { // Base data, even without facility
		return {
			ID: s.ID,
			slaveName: s.slaveName,
			customLabel: s.custom.label,
			income: 0,
			adsIncome: 0,
			rep: 0,
			food: 0,
			cost: getSlaveCost(s),
			customers: 0, // brothel, club, ...
			milk: 0,
			cum: 0,
			fluid: 0, // diary
		};
	}

	if (!facility.income) {
		facility.income = new Map();
	}

	if (facility.income.has(s.ID)) {
		return facility.income.get(s.ID);
	}

	const data = {
		ID: s.ID,
		slaveName: s.slaveName,
		customLabel: s.custom.label,
		income: 0,
		adsIncome: 0,
		rep: 0,
		food: 0,
		cost: getSlaveCost(s),
		customers: 0, /* brothel, club, ... */
		milk: 0,
		cum: 0,
		fluid: 0, // diary
	};
	facility.income.set(s.ID, data);
	return data;
};

globalThis.initFacilityStatistics = function(facility = {}) {
	facility.adsIncome = 0;
	facility.maintenance = 0;
	facility.totalIncome = 0;
	facility.totalExpenses = 0;
	facility.profit = 0;
	facility.income = new Map();
	return facility;
};

/*

Welcome to the new way to spend and make money, all while having it recorded: cashX! In the past, costs were directly deducted from V.cash, with something like V.cash -= 100.

The new system will still happily spend your money, but it will also record it in the appropriate budget category and (optionally) the appropriate slave as well.

Let's say you were going to spend 100 on your favorite slave with cashX. You might try:

<<run cashX(-100, "slaveMod", slave)>>

There we go!
1. -100 taken from your account
2. Recorded: -100 for the slaveMod category, to be displayed on the Budget screen
3. Recorded: -100 noted in your slave's permanent record. $He better get busy paying that off!

cashX can be used in JS as well, and can be included in [[]] style links.

Make sure that expenses arrive in the COST slot as a negative, they are often positive in code. Use the new function forceNeg or pass it along on a temporary variable if needed.

Costs don't have to be numbers either, you can use variables. <<run cashX(forceNeg(ContractCost), "slaveTransfer", slave)>>. forceNeg makes sure that whatever value ContractCost has is negative, and will therefore be recorded as an expense. You don't have to use it if you're sure the number you are passing along is negative.

A full list of categories (slaveMod, slaveTransfer, event) are in App.Data.Records.LastWeeksCash(). It's important to match your cost to one of those categories (or add a new one there, and display it in costsBudget.tw.)

The third category, the "slave slot" is completely optional. Sometimes you just want to spend money by yourself.

*/
/** Spend or gain money and record the transaction for accounting
 * @param {number} cost
 * @param {keyof App.Data.Records.LastWeeksCash} what - @see App.Data.Records.LastWeeksCash() for a full list
 * @param {FC.HumanState} [who] - the slave whose ledger the transaction should be recorded to. V.PC may be passed but will be ignored.
 */
globalThis.cashX = function(cost, what, who) {
	if (!Number.isFinite(cost)) {
		V.lastWeeksCashErrors.push(`Expected a finite number for ${what}, but got ${cashFormat(cost)}`);
		return 0;
	}

	// remove fractions from the money
	cost = Math.trunc(cost);

	// Spend the money
	V.cash += cost;

	// detailed recordkeeping performed for slaves only
	const whoSlave = asSlave(who);

	// INCOME
	if (cost > 0) {
		// record the action
		if (typeof V.lastWeeksCashIncome[what] !== 'undefined') {
			V.lastWeeksCashIncome[what] += cost;
		} else {
			V.lastWeeksCashErrors.push(`Unknown place "${what}" gained you ${cashFormat(cost)}`);
		}

		// record the slave, if available
		if (whoSlave) {
			whoSlave.lastWeeksCashIncome += cost;
			whoSlave.lifetimeCashIncome += cost;
		}
	} else if (cost < 0) { // EXPENSES
		// record the action
		if (typeof V.lastWeeksCashExpenses[what] !== 'undefined') {
			V.lastWeeksCashExpenses[what] += cost;
		} else {
			V.lastWeeksCashErrors.push(`Unknown place "${what}" charged you ${cashFormat(cost)}`);
		}

		// record the slave, if available
		if (whoSlave) {
			if (what === "slaveTransfer") {
				whoSlave.slaveCost = cost;
			} else if (what === "indentureRenewal") {
				whoSlave.slaveCost += cost;
			} else {
				// whoSlave.lastWeeksCashExpenses = cost; - weekly slave expenses are not tracked this way
				whoSlave.lifetimeCashExpenses += cost;
			}
		}
	}

	V.lastCashTransaction = cost;

	App.Utils.scheduleSidebarRefresh();

	return cost;
};

/** Spend or gain reputation and record the transaction for accounting
 * @param {number} rep
 * @param {keyof App.Data.Records.LastWeeksRep} what - @see App.Data.Records.LastWeeksRep() for a full list
 * @param {App.Entity.SlaveState} [who] - the slave whose ledger the transaction should be recorded to. V.PC may be passed but will be ignored.
 */
globalThis.repX = function(rep, what, who) {
	if (!Number.isFinite(rep)) {
		V.lastWeeksRepErrors.push(`Expected a finite number for ${what}, but got ${rep}`);
		return 0;
	}

	// round the change
	rep = Math.trunc(rep);

	// INCOME
	// These are all scaled relative to current rep except when recording the who, to keep comparisons between slaves possible across times. This quite drastically reduces rep income at high levels of rep and only slightly at low levels.
	if (rep > 0) {
		// record the slave, if available
		if (typeof who !== 'undefined' && who.ID !== -1) {
			who.lastWeeksRepIncome += rep;
			who.lifetimeRepIncome += rep;
		}

		// record the action
		if (what === "cheating" || passage() === "Alpha disclaimer" || passage() === "Intro Summary") {
			/* we don't want to curve startup or cheating.*/
			V.lastWeeksRepIncome[what] += rep;
		} else if (typeof V.lastWeeksRepIncome[what] !== 'undefined') {
			const curvedRep = Math.round(Math.pow(1000 * rep + Math.pow(V.rep, 2), 0.5) - V.rep);
			const curveLoss = rep - curvedRep;
			// for the balance sheet: record original uncurved income
			V.lastWeeksRepIncome[what] += rep;
			// for the balance sheet: record curving as a negative income; this is a bit odd, but it makes the totals nicer and it IS an income calculation after all
			V.lastWeeksRepIncome.curve -= curveLoss;
			// switch over to the net amount gained for the rest of the logic
			rep = curvedRep;
		} else {
			V.lastWeeksRepErrors.push(`Unknown place "${what}" gained you ${rep}`);
		}
	} else if (rep < 0) { // EXPENSES
		// record the action
		if (typeof V.lastWeeksRepExpenses[what] !== 'undefined') {
			V.lastWeeksRepExpenses[what] += rep;
		} else {
			V.lastWeeksRepErrors.push(`Unknown place "${what}" cost you ${rep}`);
		}

		// record the slave, if available
		if (typeof who !== 'undefined' && who.ID !== -1) {
			who.lastWeeksRepExpenses += rep;
			who.lifetimeRepExpenses += rep;
		}
	}

	// Apply the reputation change
	V.rep += rep;

	// Check if total rep is over cap, and use "overflow" category to expense it down if needed.
	if (V.rep > 20000) {
		V.lastWeeksRepExpenses.overflow += (20000 - V.rep);
		V.rep = 20000;
	} else if (V.rep < 0) { // Rep should never be lower than 0. Record this rounding purely to keep the books balanced.
		V.lastWeeksRepIncome.overflow += (0 - V.rep);
		V.rep = 0;
	}

	App.Utils.scheduleSidebarRefresh();

	return rep;
};

/** Make sure a number is negative.
 * @param {number} x
 * @returns {number}
 */
globalThis.forceNeg = function(x) {
	return -Math.abs(x);
};

globalThis.sweatshopCount = function() {
	return V.building.findCells(cell => (cell instanceof App.Arcology.Cell.Manufacturing) && cell.type === "Sweatshops").length;
};

globalThis.SectorCounts = function() {
	// Ternaries: - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
	V.AProsperityCapModified = V.AProsperityCapModified > 0 ? V.AProsperityCapModified : 0;
	const caps = [
		{upgrade: "drones", cap: 10},
		{upgrade: "hydro", cap: 30},
		{upgrade: "apron", cap: 60},
		{upgrade: "grid", cap: 100},
		{upgrade: "spire", cap: 150}];

	V.AProsperityCap = 0;
	caps.forEach(cap => {
		if (V.arcologyUpgrade[cap.upgrade] > 0) {
			V.AProsperityCap = cap.cap;
		}
	});

	// The idea is that cells used for your private benefit contribute less to the economy as they cannot be used by
	// others to generate revenue and therefore increase total cash flow. Can be offset by more luxury apartments.
	V.building.findCells(cell => !(cell instanceof App.Arcology.Cell.Penthouse))
		.forEach(cell => {
			if (cell instanceof App.Arcology.Cell.Apartment) {
				if (cell.type === 1) {
					V.AProsperityCap += 10;
				} else if (cell.type === 2) {
					V.AProsperityCap += 5;
				}
			} else if (cell instanceof App.Arcology.Cell.Shop) {
				if (cell.type !== "Club" && cell.type !== "Brothel") {
					V.AProsperityCap += 10;
				}
			} else if (cell instanceof App.Arcology.Cell.Market) {
				if (cell.type === "Transport Hub") {
					V.AProsperityCap += 15;
				} else if (cell.type !== "Pit" && cell.type !== "Arcade") {
					V.AProsperityCap += 10;
				}
			} else if (cell instanceof App.Arcology.Cell.Manufacturing) {
				if (cell.type !== "Dairy" && cell.type !== "Farmyard" && cell.type !== "Barracks") {
					V.AProsperityCap += 10;
				}
			}
		});

	V.AProsperityCap += V.AProsperityCapModified;
};

/**
 * Calculate the agent bonus for a given arcology governed by an agent.
 * @param {number} arcology Arcology Index
 * @returns {number}
 */
globalThis.agentBonus = function(arcology) {
	const agent = App.currentAgent(arcology);
	let bonus = Math.floor((agent.intelligence + agent.intelligenceImplant) / 32);
	if (agent.actualAge > 35) {
		bonus++;
	}
	if (agent.career === "an arcology owner" || App.Data.Careers.Leader.HG.includes(agent.career)) {
		bonus++;
	}
	if (agent.fetishStrength > 95) {
		if (agent.fetish === "dom" || agent.fetish === "sadist") {
			bonus++;
		} else if (agent.fetish === Fetish.SUBMISSIVE || agent.fetish === "masochist") {
			bonus--;
		}
	}
	if (agent.energy > 95) {
		bonus++;
	}
	if (bonus > jsRandom(0, 5)) {
		bonus++;
	}
	return bonus;
};

/**
 * Report supply market status, charge for subsidies and supply barriers and report the results
 * @param {string} NPCclass One of "lower", "middle", "upper", or "top"
 * @returns {string}
 */
globalThis.supplyPoliciesReport = function(NPCclass) {
	let r = ``;
	const varName = `${NPCclass}Class`;
	const className = NPCclass !== 'top' ? `<b>${NPCclass} class citizens</b>` : `<b>arcology's millionaires</b>`;
	const dissatisfaction = `and their <span class='red'>dissatisfaction</span> with you is rising.`;
	let overSupply = 0;

	if (V.sexDemandResult[varName] < 350) {
		r += `Your ${className} have <span class='red'>far too few options for sexual relief</span> inside your arcology`;
		if (V.classSatisfied[varName] === 0) {
			r += `. They trust you will take care of this issue as soon as you are settled in.`;
		} else {
			r += ` ${dissatisfaction}`;
		}
	} else if (V.sexDemandResult[varName] < 550) {
		r += `Your ${className} need <span class='red'>some more avenues for sexual relief</span> inside your arcology`;
		if (V.classSatisfied[varName] === 1) {
			r += `. They see <span class='green'>you are on the right track</span> and anticipate further improvements.`;
		} else if (V.classSatisfied[varName] === 0) {
			r += `. Their patience is being tested.`;
		} else {
			r += ` ${dissatisfaction}`;
		}
	} else if (V.sexDemandResult[varName] < 750) {
		r += `Your ${className} have no issue finding the sexual relief they need inside your arcology.`;
		if (V.classSatisfied[varName] === 1) {
			r += ` They are <span class='green'>delighted</span> with how quickly you've provided for them.`;
		}
	} else {
		r += `Your ${className} are <span class='green'>${V.sexDemandResult[varName] < 950 ? `happy with the availability` : `delighted with the abundance`} of sexual services</span> inside your arcology.`;
	}

	if (V.sexDemandResult[varName] > 1000) {
		overSupply = V.sexDemandResult[varName] - 1000;
		V.sexDemandResult[varName] = 1000;
	}
	r += `<i><br>&nbsp;Satisfaction is at ${V.sexDemandResult[varName] / 10}%`;
	if (overSupply > 0) {
		r += ` and the arcology provides ${overSupply / 10}% more sexual services than required which <span class='red'>drives prices down,</span>`;
	}
	r += ` ${V.NPCMarketShare[varName] / 10 === V.sexDemandResult[varName] / 10 ? `the entire` : `${V.NPCMarketShare[varName] / 10}% of the`} market is serviced by other suppliers operating inside your arcology.</i><br>`;

	// charge supply barriers (unreported, since it's a flat amount that you were told when you enacted the policy)
	const supplyCosts = [0, 1000, 5000, 20000, 60000];
	cashX(forceNeg(supplyCosts[V.sexSupplyBarriers[varName]]), "subsidiesAndBarriers");

	// report subsidy cost since it is variable
	if (V.sexSubsidies[varName] > 0) {
		const severity = ["none", "minor", "moderate", "substantial", "gratuitous"];
		const subsidyCost = forceNeg(Math.trunc(V.NPCSexSupply[varName] * Math.pow(V.sexSubsidies[varName], 2) * 0.25));
		r += `<i>&nbsp;Your ${severity[V.sexSubsidies[varName]]} subsidy costs ${cashFormatColor(subsidyCost)} this week</i>`;
		cashX(subsidyCost, "subsidiesAndBarriers");

		// warn about conflicting policies
		if (V.sexSupplyBarriers[varName] > 0) {
			r += `<i>, however the barriers that are also in place <span class="red">reduce its effectiveness and increase</span> your costs</i>`;
		}
		r += `.<br>`;
	}

	return r;
};

/**
 * @param {boolean} short
 * @returns {DocumentFragment}
 */
globalThis.ownershipReport = function(short) {
	const fragment = new DocumentFragment();
	const ownership = V.arcologies[0].ownership;
	const minority = V.arcologies[0].minority;
	let cssClass;
	let warning = false;

	if (ownership <= minority + 5) {
		cssClass = 'warning';
		warning = true;
	} else if (ownership >= minority + 10) {
		cssClass = 'yellowgreen';
	} else if (ownership >= minority) {
		cssClass = 'yellow';
	}

	if (short === true) {
		const span = document.createElement("span");

		span.className = cssClass;
		span.append(`${ownership}%`);
		if (V.assistant.power >= 1 && ownership < 100) {
			span.append(`:${minority}%`);
		}
		fragment.append("(", span, ")");
	} else {
		fragment.append("You own ", App.UI.DOM.makeElement("span", `${ownership}%`, ["bold"]),
			` of ${V.arcologies[0].name}, `);
		if (minority > 0) {
			fragment.append("against ", App.UI.DOM.makeElement("span", `${minority}%`, ["bold"]),
				" owned by the second most significant holder.");
		} else {
			fragment.append("and there are no other significant holders.");
		}
		if (warning) {
			App.UI.DOM.appendNewElement("span", fragment, " A dangerously narrow margin of control.", ["warning"]);
		}
	}

	return fragment;
};

globalThis.setupLastWeeksCash = function() {
	V.lastWeeksCashIncome = new App.Data.Records.LastWeeksCash();
	V.lastWeeksCashExpenses = new App.Data.Records.LastWeeksCash();
	V.lastWeeksCashErrors = [];
};

globalThis.setupLastWeeksRep = function() {
	V.lastWeeksRepIncome = new App.Data.Records.LastWeeksRep();
	V.lastWeeksRepExpenses = new App.Data.Records.LastWeeksRep();
	V.lastWeeksRepErrors = [];
};
