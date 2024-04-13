// cSpell:ignore Rquirements, milita

App.Mods.SecExp.Obj = (function() {
	return {
		BC,
		Init,
	};

	function BC() {
		if (jsDef(V.secExp) && V.secExpEnabled !== 1) {
			V.secExpEnabled = V.secExp;
		}
		if (typeof V.secExpEnabled !== "number") {
			V.secExpEnabled = 0;
		}
		delete V.SecExp.army;
		if (V.secExpEnabled === 0) {
			return;
		}

		V.SecExp.war = V.SecExp.war || {};
		V.SecExp.settings = V.SecExp.settings || {};
		V.SecExp.edicts = V.SecExp.edicts || {};
		V.SecExp.edicts.defense = V.SecExp.edicts.defense || {};
		V.SecExp.units = V.SecExp.units || {};
		V.SecExp.units.bots = V.SecExp.units.bots || {};
		V.SecExp.smilingMan = V.SecExp.smilingMan || {};
		V.SecExp.core = V.SecExp.core || {};
		V.SecExp.battles = V.SecExp.battles || {};
		V.SecExp.rebellions = V.SecExp.rebellions || {};
		V.SecExp.settings.battle = V.SecExp.settings.battle || {};
		V.SecExp.settings.battle.major = V.SecExp.settings.battle.major || {};
		V.SecExp.settings.rebellion = V.SecExp.settings.rebellion || {};
		V.SecExp.buildings = V.SecExp.buildings || {};
		V.SecExp.proclamation = V.SecExp.proclamation || {};

		V.SecExp.edicts.alternativeRents = V.SecExp.edicts.alternativeRents || V.alternativeRents || 0;
		V.SecExp.edicts.enslavementRights = V.SecExp.edicts.enslavementRights || V.enslavementRights || 0;
		V.SecExp.edicts.sellData = V.SecExp.edicts.sellData || V.sellData || 0;
		V.SecExp.edicts.propCampaignBoost = V.SecExp.edicts.propCampaignBoost || V.propCampaignBoost || 0;
		V.SecExp.edicts.tradeLegalAid = V.SecExp.edicts.tradeLegalAid || V.tradeLegalAid || 0;
		V.SecExp.edicts.taxTrade = V.SecExp.edicts.taxTrade || V.taxTrade || 0;
		V.SecExp.edicts.slaveWatch = V.SecExp.edicts.slaveWatch || V.slaveWatch || 0;
		V.SecExp.edicts.subsidyChurch = V.SecExp.edicts.subsidyChurch || V.subsidyChurch || 0;
		V.SecExp.edicts.SFSupportLevel = V.SecExp.edicts.SFSupportLevel || V.SFSupportLevel || 0;
		V.SecExp.edicts.limitImmigration = V.SecExp.edicts.limitImmigration || V.limitImmigration || 0;
		V.SecExp.edicts.openBorders = V.SecExp.edicts.openBorders || V.openBorders || 0;
		if (typeof V.SecExp.edicts.weaponsLaw !== "number") {
			V.SecExp.edicts.weaponsLaw = V.weaponsLaw || 3;
		}

		V.SecExp.edicts.defense.soldierWages = V.SecExp.edicts.defense.soldierWages || V.soldierWages || 1;
		V.SecExp.edicts.defense.slavesOfficers = V.SecExp.edicts.defense.slavesOfficers || V.slavesOfficers || 0;
		V.SecExp.edicts.defense.discountMercenaries = V.SecExp.edicts.defense.discountMercenaries || V.discountMercenaries || 0;

		V.SecExp.edicts.defense.militia = V.SecExp.edicts.defense.militia || 0;
		if (V.militiaFounded) {
			V.SecExp.edicts.defense.militia = 1;
		}
		if (V.recruitVolunteers) {
			V.SecExp.edicts.defense.militia = 2;
		}
		if (V.conscription) {
			V.SecExp.edicts.defense.militia = 3;
		}
		if (V.militaryService) {
			V.SecExp.edicts.defense.militia = 4;
		}
		if (V.militarizedSociety) {
			V.SecExp.edicts.defense.militia = 5;
		}

		V.SecExp.edicts.defense.militaryExemption = V.SecExp.edicts.defense.militaryExemption || V.militaryExemption || 0;
		V.SecExp.edicts.defense.noSubhumansInArmy = V.SecExp.edicts.defense.noSubhumansInArmy || V.noSubhumansInArmy || 0;
		V.SecExp.edicts.defense.pregExemption = V.SecExp.edicts.defense.pregExemption || V.pregExemption || 0;
		V.SecExp.edicts.defense.liveTargets = V.SecExp.edicts.defense.liveTargets || V.liveTargets || 0;
		V.SecExp.edicts.defense.pregExemption = V.SecExp.edicts.defense.pregExemption || V.pregExemption || 0;

		// Units
		V.SecExp.edicts.defense.martialSchool = V.SecExp.edicts.defense.martialSchool || V.martialSchool || 0;
		V.SecExp.edicts.defense.eliteOfficers = V.SecExp.edicts.defense.eliteOfficers || V.eliteOfficers || 0;
		V.SecExp.edicts.defense.lowerRequirements = V.SecExp.edicts.defense.lowerRequirements || V.lowerRequirements|| V.lowerRquirements || 0;
		V.SecExp.edicts.defense.legionTradition = V.SecExp.edicts.defense.legionTradition || V.legionTradition || 0;
		V.SecExp.edicts.defense.eagleWarriors = V.SecExp.edicts.defense.eagleWarriors || V.eagleWarriors || 0;
		V.SecExp.edicts.defense.ronin = V.SecExp.edicts.defense.ronin || V.ronin || 0;
		V.SecExp.edicts.defense.sunTzu = V.SecExp.edicts.defense.sunTzu || V.sunTzu || 0;
		V.SecExp.edicts.defense.mamluks = V.SecExp.edicts.defense.mamluks || V.mamluks || 0;
		V.SecExp.edicts.defense.pharaonTradition = V.SecExp.edicts.defense.pharaonTradition || V.pharaonTradition || 0;

		// Priv
		V.SecExp.edicts.defense.privilege = V.SecExp.edicts.defense.privilege || {};
		V.SecExp.edicts.defense.privilege.militiaSoldier = V.SecExp.edicts.defense.privilege.militiaSoldier || V.militiaSoldier || 0;
		V.SecExp.edicts.defense.privilege.slaveSoldier = V.SecExp.edicts.defense.privilege.slaveSoldier || V.slaveSoldier || 0;
		V.SecExp.edicts.defense.privilege.mercSoldier = V.SecExp.edicts.defense.privilege.mercSoldier || V.mercSoldier || 0;

		for (const [unit, data] of App.Mods.SecExp.unit.list()) {
			App.Mods.SecExp.unit.gen(unit);
			V.SecExp.units[unit].squads.forEach(u => {
				if (unit === 'bots') {
					u.active = Math.max(0, u.active) || V.arcologyUpgrade.drones > 0 ? 1 : 0;
					u.troops = Math.max(u.troops || 0, V.arcologyUpgrade.drones > 0 ? 30 : 0);
					u.maxTroops = Math.max(u.maxTroops || 0, V.arcologyUpgrade.drones > 0 ? 30 : 0);
					if (V.secBots) {
						V.SecExp.units.bots.squads[0] = Object.assign(V.secBots, {platoonName: "1st " + data.defaultName});
					}
					if (V.SecExp.units[unit].squads.length === 1 && !u.platoonName) {
						u.platoonName = "1st " + data.defaultName;
					}
				} else {
					u.SF = u.SF || 0;
					u.cyber = u.cyber || 0;
					u.commissars = u.commissars || 0;
					u.troops = Math.clamp(u.troops, 0, u.maxTroops || 30);
					u.training = Math.clamp(u.training, 0, 100);
					if (V.SF.Active < 1) {
						u.SF = 0;
					}
				}

				if (unit !== 'bots' && u.platoonName.contains('undefined')) {
					u.platoonName = u.platoonName.replace('undefined', data.defaultName);
				}

				App.Mods.SecExp.unit.genID(u, unit);
				u.equip = u.equip || 0;
				delete u.isDeployed;
			});
		}

		if (V.SecExp.units.mercs.free === 0) {
			if (V.mercenaries === 1) {
				V.SecExp.units.mercs.free = 15;
			} else if (V.mercenaries > 1) {
				V.SecExp.units.mercs.free = 30;
			}
		}

		if (V.SecExp.defaultNames) {
			V.SecExp.units.slaves.defaultName = V.SecExp.defaultNames.slaves;
			V.SecExp.units.militia.defaultName = V.SecExp.defaultNames.milita || V.SecExp.defaultNames.militia;
			V.SecExp.units.mercs.defaultName = V.SecExp.defaultNames.mercs;
			delete V.SecExp.defaultNames;
		}

		V.SecExp.smilingMan.progress = V.SecExp.smilingMan.progress || V.smilingManProgress || 0;
		if (jsDef(V.smilingManFate)) {
			if (V.smilingManFate === 0) { // Offer $him a new life
				V.SecExp.smilingMan.progress = 10;
			} else if (V.smilingManFate === 1) { // Make $him pay
				V.SecExp.smilingMan.progress = 20;
			} else if (V.smilingManFate === 2) { // Enslave $him
				V.SecExp.smilingMan.progress = 30;
			}
		}

		if (V.SecExp.smilingMan.progress === 4) {
			V.SecExp.smilingMan.progress = 10;
		} else if (V.SecExp.smilingMan.progress < 4) {
			if (V.SecExp.smilingMan.progress === 0 && V.investedFunds) {
				V.SecExp.smilingMan.investedFunds = V.investedFunds;
			}
			if (V.relationshipLM) {
				V.SecExp.smilingMan.relationship = V.relationshipLM;
			}
			if (V.globalCrisisWeeks) {
				V.SecExp.smilingMan.globalCrisisWeeks = V.globalCrisisWeeks;
			}
		}

		delete V.SecExp.core.crimeCap;
		V.SecExp.core.trade = V.SecExp.core.trade || V.trade || 0;
		initTrade();

		V.SecExp.core.authority = V.SecExp.core.authority || V.authority || 0;
		V.SecExp.core.security = V.SecExp.core.security || V.security || 100;
		if (jsDef(V.SecExp.security)) {
			V.SecExp.core.security = V.SecExp.security.cap;
			delete V.SecExp.security;
		}
		V.SecExp.core.totalKills = +V.SecExp.core.totalKills || V.totalKills || 0;

		if (V.week === 1 || !jsDef(V.SecExp.core.crimeLow)) {
			V.SecExp.core.crimeLow = 30;
		}
		V.SecExp.core.crimeLow = Math.clamp(V.SecExp.core.crimeLow, 0, 100) || V.crime || 0;

		V.SecExp.battles.slaveVictories = V.SecExp.battles.slaveVictories || V.slaveVictories || [];
		V.SecExp.battles.major = V.SecExp.battles.major || 0;
		if (jsDef(V.majorBattlesCount)) {
			if (V.majorBattlesCount === 0 && V.hasFoughtMajorBattleOnce === 1) {
				V.SecExp.battles.major = 1;
			} else {
				V.SecExp.battles.major = V.majorBattlesCount;
			}
		}
		V.SecExp.battles.victories = V.SecExp.battles.victories || V.PCvictories || 0;
		V.SecExp.battles.victoryStreak = V.SecExp.battles.victoryStreak || V.PCvictoryStreak || 0;
		V.SecExp.battles.losses = V.SecExp.battles.losses || V.PClosses || 0;
		V.SecExp.battles.lossStreak = V.SecExp.battles.lossStreak || V.PClossStreak || 0;
		V.SecExp.battles.lastEncounterWeeks = V.SecExp.battles.lastEncounterWeeks || V.lastAttackWeeks || 0;
		V.SecExp.battles.lastSelection = V.SecExp.battles.lastSelection || V.lastSelection || [];
		V.SecExp.battles.saved = V.SecExp.battles.saved || {};
		V.SecExp.battles.saved.commander = V.SecExp.battles.saved.commander || V.SavedLeader || "";
		V.SecExp.battles.saved.sfSupport = V.SecExp.battles.saved.sfSupport || V.SavedSFI || 0;

		V.SecExp.rebellions.tension = V.SecExp.rebellions.tension || V.tension || 0;
		V.SecExp.rebellions.slaveProgress = V.SecExp.rebellions.slaveProgress || V.slaveProgress || 0;
		V.SecExp.rebellions.citizenProgress = V.SecExp.rebellions.citizenProgress || V.citizenProgress || 0;
		V.SecExp.rebellions.victories = V.SecExp.rebellions.victories || V.PCrebWon || 0;
		V.SecExp.rebellions.losses = V.SecExp.rebellions.losses || V.PCrebLoss || 0;
		V.SecExp.rebellions.lastEncounterWeeks = V.SecExp.rebellions.lastEncounterWeeks || V.lastRebellionWeeks || 0;
		if (V.SFGear) {
			V.SecExp.rebellions.sfArmor = V.SFGear;
		}
		V.SecExp.settings.difficulty = V.difficulty || V.SecExp.settings.difficulty || 1;

		if (!jsDef(V.SecExp.settings.battle.enabled)) {
			V.SecExp.settings.battle.enabled = 1;
		}
		if (jsDef(V.battlesEnabled)) {
			V.SecExp.settings.battle.enabled = V.battlesEnabled;
		}
		delete V.SecExp.battle;

		V.SecExp.settings.battle.frequency = V.battleFrequency || V.SecExp.settings.battle.frequency || 1;
		V.SecExp.settings.battle.force = V.forceBattle || V.SecExp.settings.battle.force || 0;

		if (V.readiness && V.readiness === 10 || V.sectionInFirebase) {
			V.SecExp.sectionInFirebase = 1;
		}

		V.SecExp.settings.unitDescriptions = V.SecExp.settings.unitDescriptions || 0;

		if (!jsDef(V.SecExp.settings.battle.allowSlavePrestige)) {
			V.SecExp.settings.battle.allowSlavePrestige = 1;
		}
		if (jsDef(V.allowPrestigeFromBattles)) {
			V.SecExp.settings.battle.allowSlavePrestige = V.allowPrestigeFromBattles;
		}

		V.SecExp.settings.battle.major.enabled = V.majorBattlesEnabled || V.SecExp.settings.battle.major.enabled || 0;

		if (!jsDef(V.SecExp.settings.battle.major.gameOver)) {
			V.SecExp.settings.battle.major.gameOver = 1;
		}
		if (jsDef(V.majorBattleGameOver)) {
			V.SecExp.settings.battle.major.gameOver = V.majorBattleGameOver;
		}
		V.SecExp.settings.battle.major.force = V.forceMajorBattle || V.SecExp.settings.battle.major.force || 0;
		V.SecExp.settings.battle.major.mult = V.SecExp.settings.battle.major.mult || 1;

		if (!jsDef(V.SecExp.settings.rebellion.enabled)) {
			V.SecExp.settings.rebellion.enabled = 1;
		}
		if (jsDef(V.rebellionsEnabled)) {
			V.SecExp.settings.rebellion.enabled = V.rebellionsEnabled;
		}

		V.SecExp.settings.rebellion.force = V.forceRebellion || V.SecExp.settings.rebellion.force || 0;
		if (!jsDef(V.SecExp.settings.rebellion.gameOver)) {
			V.SecExp.settings.rebellion.gameOver = 1;
		}
		if (jsDef(V.rebellionGameOver)) {
			V.SecExp.settings.rebellion.gameOver = V.rebellionGameOver;
		}

		V.SecExp.settings.rebellion.speed = V.rebellionSpeed || V.SecExp.settings.rebellion.speed || 1;
		V.SecExp.settings.showStats = V.showBattleStatistics || V.SecExp.settings.showStats || 0;

		App.Mods.SecExp.BC.propHub();
		App.Mods.SecExp.BC.barracks();
		App.Mods.SecExp.BC.secHub();
		App.Mods.SecExp.BC.transportHub();
		App.Mods.SecExp.BC.riotCenter();
		App.Mods.SecExp.BC.weaponsManufacturing();

		V.SecExp.proclamation.cooldown = V.SecExp.proclamation.cooldown || V.proclamationsCooldown || 0;
		V.SecExp.proclamation.currency = V.SecExp.proclamation.currency || V.proclamationCurrency || "";
		V.SecExp.proclamation.type = V.SecExp.proclamation.type || "crime";
		if (jsDef(V.proclamationType) && V.proclamationType !== "none") {
			V.SecExp.proclamation.type = V.proclamationType;
		}

		V.SecExp.rebellions.repairTime = V.SecExp.rebellions.repairTime || {};
		if (jsDef(V.garrison)) {
			if (V.garrison.waterwayTime > 0) {
				V.SecExp.rebellions.repairTime.waterway = V.garrison.waterwayTime;
			}
			if (V.garrison.assistantTime > 0) {
				V.SecExp.rebellions.repairTime.assistant = V.garrison.assistantTime;
			}
			if (V.garrison.reactorTime > 0) {
				V.SecExp.rebellions.repairTime.reactor = V.garrison.reactorTime;
			}
		}
		if (V.arcRepairTime && V.arcRepairTime > 0) {
			V.SecExp.rebellions.repairTime.arc = V.arcRepairTime;
		}

		delete V.SecExp.settings.show;
	}

	/**
	 * Initializes V.SecExp based on V.secExpEnabled
	 */
	function Init() {
		if (V.secExpEnabled === 0) {
			V.SecExp = {};
			return;
		}
		V.SecExp = {
			war: {},
			battles: {
				major: 0,
				slaveVictories: [],
				lastSelection: [],
				victories: 0,
				victoryStreak: 0,
				losses: 0,
				lossStreak: 0,
				lastEncounterWeeks: 0,
				saved: {}
			},
			rebellions: {
				tension: 0,
				slaveProgress: 0,
				citizenProgress: 0,
				victories: 0,
				losses: 0,
				lastEncounterWeeks: 0,
				repairTime: {},
			},
			core: {
				trade: 0,
				authority: 0,
				security: 100,
				crimeLow: 30,
				totalKills: 0,
			},
			settings: {
				difficulty: 1,
				unitDescriptions: 0,
				showStats: 0,
				battle: {
					enabled: 1,
					allowSlavePrestige: 1,
					force: 0,
					frequency: 1,
					major: {
						enabled: 0,
						gameOver: 1,
						mult: 1,
						force: 0
					}
				},
				rebellion: {
					enabled: 1,
					force: 0,
					gameOver: 1,
					speed: 1
				}
			},
			buildings: {},
			proclamation: {
				cooldown: 0,
				currency: "",
				type: "crime"
			},
			units: {},
			edicts: {
				alternativeRents: 0,
				enslavementRights: 0,
				sellData: 0,
				propCampaignBoost: 0,
				tradeLegalAid: 0,
				taxTrade: 0,
				slaveWatch: 0,
				subsidyChurch: 0,
				SFSupportLevel: 0,
				limitImmigration: 0,
				openBorders: 0,
				weaponsLaw: 3,
				defense: {
					soldierWages: 1,
					slavesOfficers: 0,
					discountMercenaries: 0,
					militia: 0,
					militaryExemption: 0,
					noSubhumansInArmy: 0,
					pregExemption: 0,
					liveTargets: 0,
					privilege: {
						militiaSoldier: 0,
						slaveSoldier: 0,
						mercSoldier: 0,
					},
					// Soldiers
					martialSchool: 0,
					eliteOfficers: 0,
					lowerRequirements: 0,
					// FS soldiers
					legionTradition: 0,
					eagleWarriors: 0,
					ronin: 0,
					sunTzu: 0,
					mamluks: 0,
					pharaonTradition: 0,
				}
			},
			smilingMan: {progress: 0}
		};
		initTrade();
		for (const [unit, data] of App.Mods.SecExp.unit.list()) {
			App.Mods.SecExp.unit.gen(unit);
		}
	}

	function initTrade() {
		if (V.SecExp.core.trade === 0 || !jsDef(V.SecExp.core.trade)) {
			let init = jsRandom(20, 30);
			if (V.terrain === "urban") {
				init += jsRandom(10, 10);
			} else if (V.terrain === "ravine") {
				init -= jsRandom(5, 5);
			}
			if (isPCCareerInCategory("wealth") || isPCCareerInCategory("capitalist") || isPCCareerInCategory("celebrity") || isPCCareerInCategory("BlackHat")) {
				init += jsRandom(5, 5);
			} else if (isPCCareerInCategory("escort") || isPCCareerInCategory("gang") || isPCCareerInCategory("servant")) {
				init -= jsRandom(5, 5);
			}
			V.SecExp.core.trade = init;
		}
	}
})();
