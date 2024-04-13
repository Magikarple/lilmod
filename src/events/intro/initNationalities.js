App.Intro.initNationalities = function() {
	function applyPCQualities() {
		resetEyeColor(V.PC);
		generatePlayerPronouns(V.PC);

		switch (V.PC.career) {
			case "arcology owner":
				addTrinket("a miniature model of your first arcology");
				repX(2000, "event");
				break;
			case "wealth":
				addTrinket("a collection of diplomas from expensive schools");
				cashX(10000, "personalBusiness");
				break;
			case "trust fund":
				addTrinket("a diploma from your expensive boarding school");
				cashX(8000, "personalBusiness");
				break;
			case "rich kid":
				addTrinket("an extensive collection of pricey Old World trading cards.");
				cashX(6000, "personalBusiness");
				break;
			case "capitalist":
			case "entrepreneur":
			case "business kid":
				addTrinket("a framed low denomination piece of paper money from your native country");
				break;
			case "mercenary":
				addTrinket("a battered old assault rifle");
				break;
			case "recruit":
				addTrinket("a battered old pistol");
				break;
			case "child soldier":
				addTrinket("a combat knife");
				break;
			case "slaver":
				addTrinket("a framed picture of a slave with her sale price scrawled across the bottom");
				break;
			case "slave overseer":
				addTrinket("a framed picture of slave pens you used to lord over");
				break;
			case "slave tender":
				addTrinket("a framed picture of you hosing down a slave for market");
				break;
			case "engineer":
				addTrinket("an artist's impression of an early arcology design");
				V.arcologyUpgrade.drones = 1;
				V.arcologyUpgrade.hydro = 1;
				App.Mods.SecExp.unit.gen("bots", true);
				break;
			case "construction":
				addTrinket("the blueprints of a proto-arcology you helped construct");
				V.arcologyUpgrade.drones = 1;
				App.Mods.SecExp.unit.gen("bots", true);
				break;
			case "worksite helper":
				addTrinket("the hardhat you used to wear around worksites");
				break;
			case "medicine":
				addTrinket("a framed postsurgical x-ray");
				V.surgeryCost = Math.trunc(V.surgeryCost / 2);
				break;
			case "medical assistant":
				addTrinket("your personal set of surgical tools");
				V.surgeryCost = Math.trunc(V.surgeryCost / 2);
				break;
			case "nurse":
				addTrinket("a framed picture of you outside the clinic you worked in");
				V.surgeryCost = Math.trunc(V.surgeryCost / 2);
				break;
			case "celebrity":
				addTrinket("a framed copy of the first news story featuring yourself");
				repX(4000, "event");
				break;
			case "rising star":
				addTrinket("a framed poster of the first movie you starred in");
				repX(3000, "event");
				break;
			case "child star":
				addTrinket("a copy of the movie that gave you fame");
				repX(2000, "event");
				break;
			case "BlackHat":
				addTrinket("a news clipping of your first successful live hack");
				break;
			case "hacker":
				addTrinket("an old USB stick that ruined a corporation");
				break;
			case "script kiddy":
				addTrinket("a CD containing your first foray into scripting");
				break;
			case "escort":
				addTrinket("a copy of the first porno you starred in");
				break;
			case "prostitute":
				addTrinket("a nude pinup of you from the brothel you used to work in");
				break;
			case "child prostitute":
				addTrinket("a pair of your used underwear");
				break;
			case "servant":
				addTrinket("a framed picture of your late Master");
				break;
			case "handmaiden":
				addTrinket("a framed picture of your late Master's family");
				break;
			case "child servant":
				addTrinket("a framed picture of your late Master patting your head");
				break;
			case "gang":
				addTrinket("your favorite handgun, whose sight has instilled fear in many");
				break;
			case "hoodlum":
				addTrinket("a hood ornament stolen from a fancy Old World vehicle");
				break;
			case "street urchin":
				addTrinket("your trusty knife, whose kept you safe many a night");
				break;
		}

		if (V.PC.rumor === "wealth") {
			cashX(10000, "personalBusiness");
		} else if (V.PC.rumor === "social engineering") {
			V.FSAnnounced = 1;
			V.FSGotRepCredits = 1;
		} else if (V.PC.rumor === "luck") {
			repX(4000, "event");
		}

		if (V.PC.visualAge >= 50) {
			repX(2000, "event");
		} else if (V.PC.visualAge < 35) {
			if (V.rep >= 2000) {
				repX(-2000, "event");
			} else {
				/* set rep to zero */
				repX(forceNeg(Math.abs(V.rep)), "event");
			}
		}
	}

	function initArcologies() {
		/** @type {Array<FC.ArcologyDirection>} */
		const seed = ["east", "north", "northeast", "northwest", "south", "southeast", "southwest", "west"];
		const govtypes = ["a committee", "a corporation", "an individual", "an oligarchy", "direct democracy", "elected officials"];

		V.neighboringArcologies = variableAsNumber(V.neighboringArcologies, 0, 8, 3);
		for (let i = 0; i <= V.neighboringArcologies; i++) {
			/** @type {FC.ArcologyState} */
			const newArcology = {
				name: "",
				direction: "north",
				government: "an individual",
				leaderID: 0,
				honeymoon: 0,
				prosperity: 50,
				ownership: 50,
				minority: 20,
				PCminority: 0,
				demandFactor: 0,
				FSSupremacist: null,
				FSSupremacistRace: 0,
				FSSubjugationist: null,
				FSSubjugationistRace: 0,
				FSGenderRadicalist: null,
				FSGenderFundamentalist: null,
				FSPaternalist: null,
				FSDegradationist: null,
				FSBodyPurist: null,
				FSTransformationFetishist: null,
				FSYouthPreferentialist: null,
				FSMaturityPreferentialist: null,
				FSSlimnessEnthusiast: null,
				FSAssetExpansionist: null,
				FSPastoralist: null,
				FSPhysicalIdealist: null,
				FSChattelReligionist: null,
				FSRomanRevivalist: null,
				FSAztecRevivalist: null,
				FSEgyptianRevivalist: null,
				FSEdoRevivalist: null,
				FSNeoImperialist: null,
				FSArabianRevivalist: null,
				FSChineseRevivalist: null,
				FSAntebellumRevivalist: null,
				FSNull: null,
				embargo: 1,
				embargoTarget: -1,
				influenceTarget: -1,
				influenceBonus: 0,
				CyberEconomic: 1,
				CyberEconomicTarget: -1,
				CyberReputation: 1,
				CyberReputationTarget: -1,
				rival: 0,
				FSRestart: null,
				FSRepopulationFocus: null,
				FSHedonisticDecadence: null,
				FSIntellectualDependency: null,
				FSSlaveProfessionalism: null,
				FSPetiteAdmiration: null,
				FSStatuesqueGlorification: null,
				FSCummunism: null,
				FSIncestFetishist: null,
				FSGenderRadicalistResearch: 0,
				FSGenderFundamentalistResearch: 0,
				FSPaternalistResearch: 0,
				FSDegradationistResearch: 0,
				FSBodyPuristResearch: 0,
				FSTransformationFetishistResearch: 0,
				FSYouthPreferentialistResearch: 0,
				FSMaturityPreferentialistResearch: 0,
				FSSlimnessEnthusiastResearch: 0,
				FSAssetExpansionistResearch: 0,
				FSPastoralistResearch: 0,
				FSPhysicalIdealistResearch: 0,
				FSRepopulationFocusResearch: 0,
				FSRestartResearch: 0,
				FSHedonisticDecadenceResearch: 0,
				FSHedonisticDecadenceDietResearch: 0,
				FSIntellectualDependencyResearch: 0,
				FSSlaveProfessionalismResearch: 0,
				FSPetiteAdmirationResearch: 0,
				FSStatuesqueGlorificationResearch: 0,
				FSCummunismResearch: 0,
				FSIncestFetishistResearch: 0,
				weeks: 0,
			};
			if (i === 0) {
				newArcology.direction = 0;
				newArcology.name = "Arcology X-4";
				newArcology.FSSupremacistDecoration = 20;
				newArcology.FSSubjugationistDecoration = 20;
				newArcology.FSGenderRadicalistDecoration = 20;
				newArcology.FSGenderFundamentalistDecoration = 20;
				newArcology.FSPaternalistDecoration = 20;
				newArcology.FSDegradationistDecoration = 20;
				newArcology.FSBodyPuristDecoration = 20;
				newArcology.FSTransformationFetishistDecoration = 20;
				newArcology.FSYouthPreferentialistDecoration = 20;
				newArcology.FSMaturityPreferentialistDecoration = 20;
				newArcology.FSSlimnessEnthusiastDecoration = 20;
				newArcology.FSAssetExpansionistDecoration = 20;
				newArcology.FSPastoralistDecoration = 20;
				newArcology.FSPhysicalIdealistDecoration = 20;
				newArcology.FSChattelReligionistDecoration = 20;
				newArcology.FSRomanRevivalistDecoration = 20;
				newArcology.FSNeoImperialistDecoration = 20;
				newArcology.FSAntebellumRevivalistDecoration = 20;
				newArcology.FSAztecRevivalistDecoration = 20;
				newArcology.FSEgyptianRevivalistDecoration = 20;
				newArcology.FSEdoRevivalistDecoration = 20;
				newArcology.FSArabianRevivalistDecoration = 20;
				newArcology.FSChineseRevivalistDecoration = 20;
				newArcology.FSRepopulationFocusDecoration = 20;
				newArcology.FSRestartDecoration = 20;
				newArcology.FSHedonisticDecadenceDecoration = 20;
				newArcology.FSIntellectualDependencyDecoration = 20;
				newArcology.FSSlaveProfessionalismDecoration = 20;
				newArcology.FSPetiteAdmirationDecoration = 20;
				newArcology.FSStatuesqueGlorificationDecoration = 20;
				newArcology.FSCummunismDecoration = 20;
				newArcology.FSIncestFetishistDecoration = 20;
				if (V.targetArcology.fs !== "New") {
					V.FSAnnounced = 1;
					V.FSGotRepCredits = 1;
					newArcology.name = V.targetArcology.name;
					newArcology.prosperity = V.targetArcology.prosperity;
					V.ACitizens += V.targetArcology.citizens*500;
					if (V.targetArcology.fs === "FSNull") {
						newArcology.FSNull = 20;
					} else {
						const decoration = V.targetArcology.FSProgress + 10;
						newArcology[V.targetArcology.fs] = V.targetArcology.FSProgress;
						newArcology[`${V.targetArcology.fs}Decoration`] = decoration;
						if (V.targetArcology.fs === "FSSupremacist") {
							newArcology.FSSupremacistRace = V.targetArcology.race;
						} else if (V.targetArcology.fs === "FSSubjugationist") {
							newArcology.FSSubjugationistRace = V.targetArcology.race;
						}
					}
					const fsLanguage = App.Data.FutureSociety.records[V.targetArcology.fs].language;
					if (fsLanguage) {
						V.language = fsLanguage;
					}
					if (V.PC.rumor === "social engineering") {
						V.FSGotRepCredits += 1;
					}
				} else {
					newArcology.honeymoon = 20;
				}
			} else {
				if (i < 4) {
					/* X-4 is reserved for player's arcology, so X-1 is available */
					newArcology.name = `Arcology X-${i}`;
				} else {
					newArcology.name = `Arcology X-${i+1}`;
				}
				newArcology.direction = seed.pluck();
				newArcology.government = govtypes.random();
				newArcology.prosperity += jsRandom(-20, 20);
				newArcology.ownership += jsRandom(-10, 0);
				newArcology.minority += jsRandom(-5, 5);
			}
			V.arcologies.push(newArcology);
		}

		V.arcologies[0].FSSupremacistLawME = 0;
		V.arcologies[0].FSSupremacistSMR = 0;
		V.arcologies[0].FSSubjugationistLawME = 0;
		V.arcologies[0].FSSubjugationistSMR = 0;
		V.arcologies[0].FSGenderRadicalistLawFuta = 0;
		V.arcologies[0].FSGenderRadicalistLawBeauty = 0;
		V.arcologies[0].FSGenderFundamentalistLawBimbo = 0;
		V.arcologies[0].FSGenderFundamentalistSMR = 0;
		V.arcologies[0].FSGenderFundamentalistLawBeauty = 0;
		V.arcologies[0].FSPaternalistLaw = 0;
		V.arcologies[0].FSPaternalistSMR = 0;
		V.arcologies[0].FSDegradationistLaw = 0;
		V.arcologies[0].FSDegradationistSMR = 0;
		V.arcologies[0].FSBodyPuristLaw = 0;
		V.arcologies[0].FSBodyPuristSMR = 0;
		V.arcologies[0].FSBodyPuristCatLaw = 0;
		V.arcologies[0].FSTransformationFetishistSMR = 0;
		V.arcologies[0].FSYouthPreferentialistLaw = 0;
		V.arcologies[0].FSYouthPreferentialistSMR = 0;
		V.arcologies[0].FSMaturityPreferentialistLaw = 0;
		V.arcologies[0].FSMaturityPreferentialistSMR = 0;
		V.arcologies[0].FSSlimnessEnthusiastSMR = 0;
		V.arcologies[0].FSSlimnessEnthusiastLaw = 0;
		V.arcologies[0].FSSlimnessEnthusiastFoodLaw = 0;
		V.arcologies[0].FSAssetExpansionistSMR = 0;
		V.arcologies[0].FSPastoralistLaw = 0;
		V.arcologies[0].FSPastoralistSMR = 0;
		V.arcologies[0].FSPhysicalIdealistSMR = 0;
		V.arcologies[0].FSPhysicalIdealistLaw = 0;
		V.arcologies[0].FSPhysicalIdealistStrongFat = 0;
		V.arcologies[0].FSChattelReligionistLaw = 0;
		V.arcologies[0].FSChattelReligionistLaw2 = 0;
		V.arcologies[0].FSChattelReligionistSMR = 0;
		V.arcologies[0].FSChattelReligionistCreed = 0;
		V.arcologies[0].FSRomanRevivalistLaw = 0;
		V.arcologies[0].FSRomanRevivalistSMR = 0;
		V.arcologies[0].FSNeoImperialistSMR = 0;
		V.arcologies[0].FSNeoImperialistLaw1 = 0;
		V.arcologies[0].FSNeoImperialistLaw2 = 0;
		V.arcologies[0].FSAztecRevivalistLaw = 0;
		V.arcologies[0].FSAztecRevivalistSMR = 0;
		V.arcologies[0].FSEgyptianRevivalistLaw = 0;
		V.arcologies[0].FSEgyptianRevivalistSMR = 0;
		V.arcologies[0].FSEdoRevivalistLaw = 0;
		V.arcologies[0].FSEdoRevivalistSMR = 0;
		V.arcologies[0].FSArabianRevivalistLaw = 0;
		V.arcologies[0].FSArabianRevivalistSMR = 0;
		V.arcologies[0].FSChineseRevivalistLaw = 0;
		V.arcologies[0].FSChineseRevivalistSMR = 0;
		V.arcologies[0].FSAntebellumRevivalistSMR = 0;
		V.arcologies[0].FSAntebellumRevivalistLaw1 = 0;
		V.arcologies[0].FSAntebellumRevivalistLaw2 = 0;
		V.arcologies[0].FSRepopulationFocusLaw = 0;
		V.arcologies[0].FSRepopulationFocusSMR = 0;
		V.arcologies[0].FSRestartLaw = 0;
		V.arcologies[0].FSRestartSMR = 0;
		V.arcologies[0].FSHedonisticDecadenceLaw = 0;
		V.arcologies[0].FSHedonisticDecadenceLaw2 = 0;
		V.arcologies[0].FSHedonisticDecadenceStrongFat = 0;
		V.arcologies[0].FSHedonisticDecadenceSMR = 0;
		V.arcologies[0].FSIntellectualDependencyLaw = 0;
		V.arcologies[0].FSIntellectualDependencyLawBeauty = 0;
		V.arcologies[0].FSIntellectualDependencySMR = 0;
		V.arcologies[0].FSSlaveProfessionalismLaw = 0;
		V.arcologies[0].FSSlaveProfessionalismSMR = 0;
		V.arcologies[0].FSPetiteAdmirationLaw = 0;
		V.arcologies[0].FSPetiteAdmirationLaw2 = 0;
		V.arcologies[0].FSPetiteAdmirationSMR = 0;
		V.arcologies[0].FSStatuesqueGlorificationLaw = 0;
		V.arcologies[0].FSStatuesqueGlorificationLaw2 = 0;
		V.arcologies[0].FSStatuesqueGlorificationSMR = 0;

		V.arcologies[0].FSGenderRadicalistResearch = 0;
		V.arcologies[0].FSGenderFundamentalistResearch = 0;
		V.arcologies[0].FSPaternalistResearch = 0;
		V.arcologies[0].FSDegradationistResearch = 0;
		V.arcologies[0].FSBodyPuristResearch = 0;
		V.arcologies[0].FSTransformationFetishistResearch = 0;
		V.arcologies[0].FSYouthPreferentialistResearch = 0;
		V.arcologies[0].FSMaturityPreferentialistResearch = 0;
		V.arcologies[0].FSSlimnessEnthusiastResearch = 0;
		V.arcologies[0].FSAssetExpansionistResearch = 0;
		V.arcologies[0].FSPastoralistResearch = 0;
		V.arcologies[0].FSPhysicalIdealistResearch = 0;
		V.arcologies[0].FSRepopulationFocusResearch = 0;
		V.arcologies[0].FSRestartResearch = 0;
		V.arcologies[0].FSHedonisticDecadenceResearch = 0;
		V.arcologies[0].FSHedonisticDecadenceDietResearch = 0;
		V.arcologies[0].FSCummunismResearch = 0;
		V.arcologies[0].FSIncestFetishistResearch = 0;
		V.arcologies[0].FSIntellectualDependencyResearch = 0;
		V.arcologies[0].FSSlaveProfessionalismResearch = 0;
		V.arcologies[0].FSPetiteAdmirationResearch = 0;
		V.arcologies[0].FSStatuesqueGlorificationResearch = 0;

		V.arcologies[0].FSEgyptianRevivalistIncestPolicy = 0;
		V.arcologies[0].FSEgyptianRevivalistInterest = 0;
		V.arcologies[0].FSRepopulationFocusPregPolicy = 0;
		V.arcologies[0].FSRepopulationFocusMilfPolicy = 0;
		V.arcologies[0].FSRepopulationFocusInterest = 0;
		V.arcologies[0].FSEugenicsChastityPolicy = 0;
		V.arcologies[0].FSEugenicsSterilizationPolicy = 0;
		V.arcologies[0].FSEugenicsInterest = 0;

		V.arcologies[0].childhoodFertilityInducedNCSResearch = 0;
	}

	if (V.targetArcology.fs !== "New") {
		V.building = V.targetArcology.building;
		delete V.targetArcology.building;
	} else {
		V.building = App.Arcology.defaultBuilding(V.terrain);
	}
	const sellable = V.building.findCells(cell => cell.canBeSold());
	const random12 = jsRandomMany(sellable, 12);
	random12.forEach(cell => { cell.owner = 0; });

	if (V.localEcon > 100) {
		V.mods.food.cost = Math.max(5 / (1 + (Math.trunc(1000-100000/V.localEcon)/10)/100), 3.125);
	} else if (V.localEcon === 100) {
		V.mods.food.cost = 5;
	} else {
		V.mods.food.cost = Math.min(5 * (1 + 1.5 * Math.sqrt(Math.trunc(100000/V.localEcon-1000)/10)/100), 6.5);
	}

	V.minimumSlaveAge = variableAsNumber(V.minimumSlaveAge, 3, 18, 18);
	V.retirementAge = variableAsNumber(V.retirementAge, 25, 120, 45);
	V.fertilityAge = variableAsNumber(V.fertilityAge, 3, 18, 13);
	V.potencyAge = variableAsNumber(V.potencyAge, 3, 18, 13);

	applyPCQualities();

	/* SET STARTING CONDITIONS */

	V.enduringRep = V.rep;

	initArcologies();

	V.HackingSkillMultiplier = upgradeMultiplier('hacking');
	V.upgradeMultiplierArcology = upgradeMultiplier('engineering');
	V.upgradeMultiplierMedicine = upgradeMultiplier('medicine');
	V.upgradeMultiplierTrade = upgradeMultiplier('trading');

	/* Nationalities Setup */

	if (!V.customVariety) {
		/* If non-custom variety, empties or defines V.nationalities */
		V.nationalities = {};
	}
	const needLocalNationalities = !V.customVariety && !V.internationalTrade;
	if (V.terrain === "oceanic") {
		if (V.targetArcology.fs !== "FSSupremacist") {
			V.arcologies[0].FSSupremacistRace = "white";
		}
		if (V.targetArcology.fs !== "FSSubjugationist") {
			V.arcologies[0].FSSubjugationistRace = "middle eastern";
		}
		if (needLocalNationalities) {
			// FIXME: equal distributions? probably should use weighted variety instead
			V.nationalities = arr2obj(App.Data.misc.baseNationalities);
		}
	} else {
		/** @type {Map<string, {supr: FC.Race, subj: FC.Race, preset: string}>} */
		const continentalDefaults = new Map([
			["North America",	{supr: "white", subj: "black", preset: "Vanilla North America"}],
			["South America",	{supr: "latina", subj: "black", preset: "Vanilla South America"}],
			["Brazil",			{supr: "white", subj: "black", preset: "Vanilla South America"}],
			["the Middle East",	{supr: "middle eastern", subj: "asian", preset: "Vanilla Middle East"}],
			["Africa",			{supr: "black", subj: "white", preset: "Vanilla Africa"}],
			["Asia",			{supr: "asian", subj: "indo-aryan", preset: "Vanilla Asia"}],
			["Western Europe",	{supr: "white", subj: "middle eastern", preset: "Vanilla Europe"}],
			["Central Europe",	{supr: "white", subj: "middle eastern", preset: "Vanilla Europe"}],
			["Eastern Europe",	{supr: "white", subj: "asian", preset: "Vanilla Europe"}],
			["Scandinavia",		{supr: "white", subj: "southern european", preset: "Vanilla Europe"}],
			["Southern Europe",	{supr: "southern european", subj: "middle eastern", preset: "Vanilla Europe"}],
			["Australia",		{supr: "white", subj: "asian", preset: "Vanilla Australia"}],
			["Japan",			{supr: "asian", subj: "asian", preset: null}]
		]);

		const defaults = continentalDefaults.get(V.continent);
		if (!defaults) {
			throw Error(`Missing defaults for continent: ${V.continent}`);
		}
		if (V.targetArcology.fs !== "FSSupremacist") {
			V.arcologies[0].FSSupremacistRace = defaults.supr;
		}
		if (V.targetArcology.fs !== "FSSubjugationist") {
			V.arcologies[0].FSSubjugationistRace = defaults.subj;
		}
		if (needLocalNationalities) {
			if (V.continent === "Japan") { // special case, no preset for Japan
				hashPush(V.nationalities, "Japanese", "Japanese", "Japanese");
			} else {
				hashMerge(V.nationalities, App.Data.NationalityPresets.Vanilla.get(defaults.preset));
			}
		}
	}

	if (!V.customVariety && V.internationalTrade) {
		if (V.internationalVariety === 0) { // weighted
			hashMerge(V.nationalities, App.Data.NationalityPresets.Vanilla.get("Vanilla Global"));
		} else { // normalized
			V.nationalities = arr2obj(App.Data.misc.baseNationalities);
		}
	}
};
