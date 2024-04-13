/** Takes the passed input and returns a clamped V.SecExp.core.authority
 * @param {number} input defaults to zero
 */
App.Mods.SecExp.authorityX = function(input = 0) {
	V.SecExp.core.authority = Math.trunc(Math.clamp(V.SecExp.core.authority + input, 0, 20000));
};

App.Mods.SecExp.generator = (function() {
	return {
		attack,
		rebellion,
	};

	function shared() {
		V.SecExp.war.commander = "assistant";
		V.SecExp.war.losses = 0;
		V.SecExp.war.attacker = {losses: 0};
	}

	function attack() {
		let attackChance = 0; // attackChance value is the chance out of 100 of an attack happening this week
		// attacks are deactivated if security drones are not around yet, there is not a rebellion this week or the last attack/rebellion happened within 3 weeks
		if (V.arcologyUpgrade.drones === 1 && !V.SecExp.war.type && V.SecExp.battles.lastEncounterWeeks > 3 && V.SecExp.rebellions.lastEncounterWeeks > 3) {
			if (V.week < 30) {
				attackChance = 5;
			} else if (V.week < 60) {
				attackChance = 8;
			} else if (V.week < 90) {
				attackChance = 12;
			} else if (V.week < 120) {
				attackChance = 16;
			} else {
				attackChance = 20;
			}
			if (V.SecExp.battles.victories + V.SecExp.battles.losses >= 0) {
				attackChance = 25;
			}

			if (V.SecExp.battles.lastEncounterWeeks >= 10) {
				attackChance += V.SecExp.battles.lastEncounterWeeks/2; // attackChance += 5;
			}
			if (V.terrain === "oceanic") {
				attackChance -= 10;
			}
			attackChance *= V.SecExp.settings.battle.frequency; // battle frequency
		}

		if (V.SecExp.settings.battle.force === 1 && V.SecExp.settings.rebellion.force === 0) {
			attackChance = 100;
		}

		if (random(1, 100) > attackChance) { // Rolls to see if attack happens this week
			V.SecExp.battles.lastEncounterWeeks++;
		} else {
			let type; let terrain; let troops; let equip = 0; let L = 0;
			V.SecExp.battles.lastEncounterWeeks = 0;
			let raider = 25; let oldWorld = 25; let freeCity = 25; let free = 25; // type is the chance out of 100 of an attack of that type happening
			// the old world attracted by "degenerate" future societies
			const arcInfo = new App.Utils.Arcology();
			const resultA = arcInfo.fsActiveSome(
				'FSRomanRevivalist', 'FSEdoRevivalist', 'FSArabianRevivalist',
				'FSChineseRevivalist', 'FSEgyptianRevivalist', 'FSAztecRevivalist');
			const resultB = arcInfo.fsActiveSome(
				'FSRepopulationFocus', 'FSGenderRadicalist', 'FSPastoralist',
				'FSChattelReligionist', 'FSNeoImperialist', "FSAntebellumRevivalist");
			if (resultA && resultB) {
				oldWorld += 15;
				raider -= 5;
				freeCity -= 5;
				free -= 5;
			} else if (resultA || resultB) {
				oldWorld += 24;
				raider -= 8;
				freeCity -= 8;
				free -= 8;
			}
			// freedom fighters attracted by high slave/citizen ratio
			if (V.ASlaves > V.ACitizens * 2) {
				oldWorld -= 8;
				raider -= 8;
				freeCity -= 8;
				free += 24;
			} else if (V.ASlaves > V.ACitizens * 1.2 || arcInfo.fsActive('FSDegradationist')) {
				oldWorld -= 5;
				raider -= 5;
				freeCity -= 5;
				free += 15;
			}
			// free Cities attracted by high prosperity
			if (V.arcologies[0].prosperity >= 10 && V.arcologies[0].prosperity < 20) {
				oldWorld -= 5;
				raider -= 5;
				freeCity += 15;
				free -= 5;
			} else if (V.arcologies[0].prosperity >= 20) {
				oldWorld -= 8;
				raider -= 8;
				freeCity += 24;
				free -= 8;
			}
			// raiders are attracted by low security
			if (V.SecExp.core.security <= 50) {
				oldWorld -= 5;
				raider += 15;
				freeCity -= 5;
				free -= 5;
			} else if (V.SecExp.core.security <= 25) {
				oldWorld -= 8;
				raider += 24;
				freeCity -= 8;
				free -= 8;
			}

			const roll = random(1, 100); // makes the actual roll
			if (roll <= raider) {
				type = "raiders";
				troops = random(40, 80); L = 1;
			} else if (roll <= raider + oldWorld) {
				type = "old world";
				troops = random(25, 50);
			} else if (roll <= raider + oldWorld + freeCity) {
				type = "free city";
				troops = random(20, 40);
			} else if (roll <= raider + oldWorld + freeCity + free) {
				type = "freedom fighters";
				troops = random(30, 60);
			}

			V.SecExp.war.type = 'Attack';
			if (V.terrain === "urban") {
				terrain = either("outskirts", "urban", "wasteland");
			} else if (V.terrain === "rural") {
				terrain = either("hills", "outskirts", "rural", "wasteland");
			} else if (V.terrain === "ravine") {
				terrain = either("hills", "mountains", "outskirts", "wasteland");
			} else if (V.terrain === "marine") {
				terrain = either("coast", "hills", "outskirts", "wasteland");
			} else if (V.terrain === "oceanic") {
				terrain = either("international waters", "an underwater cave", "a sunken ship");
			} else {
				terrain = "error";
			}

			if (V.week < 30) {
				troops *= random(1, 2); // troops *= Math.trunc(random( (1*(1.01+(V.week/100))), (2*(1.01+(V.week/100))) ))) {
			} else if (V.week < 60) {
				troops *= random(1, 3); // troops *= Math.trunc(random( (1*(1.01+(V.week/200))), (3*(1.01+(V.week/200))) ))) {
				equip = random(0, 1);
			} else if (V.week < 90) {
				troops *= random(2, 3); // troops *= Math.trunc(random( (2*(1.01+(V.week/300))), (3*(1.01+(V.week/300))) ))) {
				equip = random(0, 3-L); // "raiders" equip = random(0,2)) {
			} else if (V.week < 120) {
				troops *= random(2, 4); // troops *= Math.trunc(random( (2*(1.01+(V.week/400))), (4*(1.01+(V.week/400))) ))) {
				equip = random(1-L, 3); // "raiders" equip = random(0,3)) {
			} else {
				troops *= random(3, 5);
				equip = random(2-L, 4-L); // "raiders" equip = random(1,3)) {
			}

			if (V.SecExp.settings.battle.major.enabled === 1) { // major battles have a 50% chance of firing after week 120
				if ((V.week >= 120 && random(1, 100) >= 50) || V.SecExp.settings.battle.major.force === 1) {
					V.SecExp.war.type = 'Major Attack';
					const sfActive = V.SF.Toggle && V.SF.Active >= 1;
					troops *= sfActive ? random(4, 6) : random(2, 3);
					equip = sfActive ? either(3, 4) : either(2, 3, 4);
				}
			}

			if (V.SecExp.settings.difficulty > 1) {
				troops *= V.SecExp.settings.difficulty;
			}

			shared();
			V.SecExp.war.attacker.troops = troops;
			V.SecExp.war.attacker.equip = equip;
			V.SecExp.war.attacker.type = type;
			V.SecExp.war.terrain = terrain;
			V.SecExp.war.deploySF = 0;
			V.SecExp.war.saveValid = 0;
			V.SecExp.war.tacticsSuccessful = 0;
			V.SecExp.war.chosenTactic = either("Bait and Bleed", "Blitzkrieg", "Choke Points", "Defense In Depth", "Guerrilla", "Human Wave", "Interior Lines", "Pincer Maneuver");
			V.SecExp.war.estimatedMen = normalRandInt(troops, troops * (4 - App.Mods.SecExp.battle.recon()) * 0.05);
			V.SecExp.war.expectedEquip = normalRandInt(equip, (4 - App.Mods.SecExp.battle.recon()) * 0.25);
			V.SecExp.war.deployed = [];
		}
	}

	function rebellion() {
		if (V.SecExp.rebellions.slaveProgress >= 100) {
			if (random(1, 100) <= 80) {	// 80% of firing a rebellion once progress is at 100
				V.SecExp.war.type = "Slave Rebellion";
				V.SecExp.rebellions.slaveProgress = 0;
				V.SecExp.rebellions.citizenProgress *= 0.2;
			} else {
				V.SecExp.rebellions.slaveProgress = 100;
			}
		} else if (V.SecExp.rebellions.citizenProgress >= 100) {
			if (random(1, 100) <= 80) {
				V.SecExp.war.type = "Citizen Rebellion";
				V.SecExp.rebellions.citizenProgress = 0;
				V.SecExp.rebellions.slaveProgress *= 0.2;
			} else {
				V.SecExp.rebellions.citizenProgress = 100;
			}
		}

		if (V.SecExp.settings.rebellion.force === 1) {
			V.SecExp.war.type = `${random(1, 100) <= 50 ? 'Slave' : 'Citizen'} Rebellion`;
		}

		if (!V.SecExp.war.type) {
			V.SecExp.rebellions.lastEncounterWeeks++;
		} else {
			const isSlaveRebellion = V.SecExp.war.type.includes("Slave");
			let weekMod;
			if (V.week <= 30) {
				weekMod = 0.75 + (0.01+(V.week/200));
			} else if (V.week <= 60) {
				weekMod = 1 + (0.01+(V.week/300));
			} else if (V.week <= 90) {
				weekMod = 1.25 + (0.01+(V.week/400));
			} else if (V.week <= 120) {
				weekMod = 1.50 + (0.01+(V.week/500));
			} else {
				weekMod = 1.75;
			}

			shared();
			V.SecExp.rebellions.lastEncounterWeeks = 0;
			const authFactor = Math.clamp(1 - (V.SecExp.core.authority / 20000), 0.4, 0.6);
			const repFactor = Math.clamp(V.rep / 20000, 0.4, 0.6);
			const rebelPercent = 0.3 * authFactor;
			const irregularPercent = 0.2 * repFactor;

			const isDisloyal = (x) => (x < 10 && jsRandom(1, 100) <= 70) || (x < 33 && jsRandom(1, 100) <= 30) || (x < 66 && jsRandom(1, 100) <= 10);
			const baseValue = Math.trunc((isSlaveRebellion ? V.ASlaves : V.ACitizens) * rebelPercent * weekMod) + random(-100, 100);
			const highestValue = isSlaveRebellion ? V.ASlaves : V.ACitizens;
			V.SecExp.war.attacker.troops = Math.clamp(baseValue, 50, highestValue);
			V.SecExp.war.attacker.equip = Math.clamp(V.SecExp.edicts.weaponsLaw + random((isSlaveRebellion ? -2 : -1), 1), 0, 4);
			V.SecExp.war.irregulars = Math.clamp(Math.trunc(V.ACitizens * irregularPercent * weekMod) + random(-100, 100), 50, V.ACitizens);
			V.SecExp.war.engageRule = 0;
			V.SecExp.war.rebellingID = App.Mods.SecExp.unit.squads("human").map(u => u.loyalty).filter(isDisloyal);
		}
	}
})();

/**
 * Returns the raw percentage of society that can be drafted.
 * @returns {number}
 */
App.Mods.SecExp.militiaCap = function(x = 0) {
	x = x || V.SecExp.edicts.defense.militia;
	if (x === 2) {
		return 0.02;
	} else if (x === 3) {
		return 0.05;
	} else if (x === 4) {
		return 0.1;
	} else if (x === 5) {
		return 0.2;
	}
};

App.Mods.SecExp.battle = (function() {
	"use strict";
	const unitFunctions = App.Mods.SecExp.unit;
	return {
		deployedUnits,
		troopCount,
		deploySpeed,
		deployableUnits,
		activeUnits,
		maxUnits,
		recon,
		bribeCost,
	};

	/** Get count of deployed/active units for a particular battle
	 * @param {string} input type of to measure; if omitted, count all types
	 * @returns {number} unit count
	 */
	function deployedUnits(input = '') {
		const inBattle = V.SecExp.war.type.includes("Attack");
		let count = {}; let init = 0;
		Array.from(unitFunctions.list().keys()).forEach((s) => count[s] = 0);
		if (V.SF.Toggle && V.SF.Active >= 1 && (inBattle && V.SecExp.war.deploySF || !inBattle)) {
			init++;
		}
		if (!inBattle && V.SecExp.war.irregulars > 0) { // rebellion
			count.militia++;
		}

		Array.from(unitFunctions.list().keys()).forEach((s) => count[s] += V.SecExp.units[s].squads.filter(u => App.Mods.SecExp.unit.isDeployed(u)).length);
		if (input === '') {
			return Object.values(count).reduce((a, b) => a + b) + init;
		} else {
			return count[input];
		}
	}

	/** Get total troop count of deployed/active units for a particular battle
	 * @returns {number} troop count
	 */
	function troopCount() {
		const inBattle = V.SecExp.war.type.includes("Attack");
		let troops = 0;
		if (V.SF.Toggle && V.SF.Active >= 1 && (inBattle && V.SecExp.war.deploySF || !inBattle)) {
			troops += App.Mods.SecExp.troopsFromSF();
		}
		if (!inBattle) {
			troops += V.SecExp.war.irregulars;
		}
		return Math.round(troops += unitFunctions.squads().filter(s => unitFunctions.isDeployed(s)).reduce((acc, t) => acc += t.troops, 0));
	}

	/** Get mobilization readiness (in *pairs* of units) given upgrades
	 * @returns {number} readiness
	 */
	function deploySpeed() {
		let init = 1;
		if (V.SecExp.buildings.secHub) {
			if (V.SecExp.buildings.secHub.upgrades.readiness.pathways > 0) {
				init += 1;
			}
			if (V.SecExp.buildings.secHub.upgrades.readiness.rapidVehicles > 0) {
				init += 2;
			}
			if (V.SecExp.buildings.secHub.upgrades.readiness.rapidPlatforms > 0) {
				init += 2;
			}
			if (V.SecExp.buildings.secHub.upgrades.readiness.earlyWarn > 0) {
				init += 2;
			}
		}
		if (V.SF.Toggle && V.SF.Active >= 1 && V.SecExp.sectionInFirebase >= 1) {
			init += 2;
		}
		return init;
	}

	/** Get remaining deployable units (mobilization in units minus units already deployed)
	 * @returns {number}
	 */
	function deployableUnits() {
		let init = 2 * App.Mods.SecExp.battle.deploySpeed();
		init -= unitFunctions.squads().filter(s => unitFunctions.isDeployed(s)).length;
		return Math.max(0, init);
	}

	/** Get total active units
	 * @returns {number}
	 */
	function activeUnits() {
		return V.secExpEnabled > 0 ? App.Mods.SecExp.unit.squads().filter(s => s.active).length : 0;
	}

	/** Get maximum active units
	 * @returns {number}
	 */
	function maxUnits() {
		let max = 0;
		if (V.SecExp.buildings.barracks) {
			max += 8 + (V.SecExp.buildings.barracks.size * 2);
			if (App.Mods.SecExp.battle.deploySpeed() === 10) {
				max += 2;
			}
		}
		return max;
	}

	/** Get recon score (scale 0-3)
	 * @returns {number}
	 */
	function recon() {
		return V.SecExp.buildings.secHub ? Object.values(V.SecExp.buildings.secHub.upgrades.intel).reduce((a, b) => a + b) : 0;
	}

	/** Get bribe cost for an attacker to go away
	 * @returns {number}
	 */
	function bribeCost() {
		let cost; const baseBribePerAttacker = 5;
		if (V.week <= 30) {
			cost = 5000 + baseBribePerAttacker * V.SecExp.war.attacker.troops;
		} else if (V.week <= 40) {
			cost = 10000 + baseBribePerAttacker * V.SecExp.war.attacker.troops;
		} else if (V.week <= 50) {
			cost = 15000 + baseBribePerAttacker * V.SecExp.war.attacker.troops;
		} else if (V.week <= 60) {
			cost = 20000 + baseBribePerAttacker * V.SecExp.war.attacker.troops;
		} else if (V.week <= 70) {
			cost = 25000 + baseBribePerAttacker * V.SecExp.war.attacker.troops;
		} else {
			cost = 30000 + baseBribePerAttacker * V.SecExp.war.attacker.troops;
		}
		cost *= (V.SecExp.war.type.includes("Major") ? 3 : 1);
		return Math.trunc(Math.clamp(cost, 0, 1000000));
	}
})();

App.Mods.SecExp.Check = (function() {
	"use strict";
	return {
		secRestPoint,
		crimeCap,
		reqMenials,
	};

	function secRestPoint() {
		let rest = 40;
		if (V.SecExp.buildings.secHub) {
			if (V.SecExp.buildings.secHub.upgrades.security.nanoCams === 1) {
				rest += 15;
			}
			if (V.SecExp.buildings.secHub.upgrades.security.cyberBots === 1) {
				rest += 15;
			}
			if (V.SecExp.buildings.secHub.upgrades.security.eyeScan === 1) {
				rest += 20;
			}
			if (V.SecExp.buildings.secHub.upgrades.security.cryptoAnalyzer === 1) {
				rest += 20;
			}
		}
		return rest;
	}

	function crimeCap() {
		let cap = 100;
		if (V.SecExp.buildings.secHub) {
			if (V.SecExp.buildings.secHub.upgrades.crime.autoTrial === 1) {
				cap -= 10;
			}
			if (V.SecExp.buildings.secHub.upgrades.crime.autoArchive === 1) {
				cap -= 10;
			}
			if (V.SecExp.buildings.secHub.upgrades.crime.worldProfiler === 1) {
				cap -= 15;
			}
			if (V.SecExp.buildings.secHub.upgrades.crime.advForensic === 1) {
				cap -= 15;
			}
		}
		return cap;
	}

	function reqMenials() {
		let Req = 20;
		if (V.SecExp.buildings.secHub) {
			if (V.SecExp.buildings.secHub.upgrades.security.nanoCams === 1) {
				Req += 5;
			}
			if (V.SecExp.buildings.secHub.upgrades.security.cyberBots === 1) {
				Req += 5;
			}
			if (V.SecExp.buildings.secHub.upgrades.security.eyeScan === 1) {
				Req += 10;
			}
			if (V.SecExp.buildings.secHub.upgrades.security.cryptoAnalyzer === 1) {
				Req += 10;
			}

			if (V.SecExp.buildings.secHub.upgrades.crime.advForensic === 1) {
				Req += 10;
			}
			if (V.SecExp.buildings.secHub.upgrades.crime.autoArchive === 1) {
				Req += 5;
			}
			if (V.SecExp.buildings.secHub.upgrades.crime.autoTrial === 1) {
				Req += 5;
			}
			if (V.SecExp.buildings.secHub.upgrades.crime.worldProfiler === 1) {
				Req += 10;
			}

			if (V.SecExp.buildings.secHub.upgrades.intel.sensors === 1) {
				Req += 5;
			}
			if (V.SecExp.buildings.secHub.upgrades.intel.signalIntercept === 1) {
				Req += 5;
			}
			if (V.SecExp.buildings.secHub.upgrades.intel.radar === 1) {
				Req += 10;
			}

			if (V.SecExp.buildings.secHub.upgrades.readiness.pathways === 1) {
				Req += 5;
			}
			if (V.SecExp.buildings.secHub.upgrades.readiness.rapidVehicles === 1) {
				Req += 5;
			}
			if (V.SecExp.buildings.secHub.upgrades.readiness.rapidPlatforms === 1) {
				Req += 10;
			}
			if (V.SecExp.buildings.secHub.upgrades.readiness.earlyWarn === 1) {
				Req += 10;
			}
			Req -= 5 * V.SecExp.edicts.SFSupportLevel;
			Req -= 10 * V.SecExp.buildings.secHub.coldstorage;
		}
		return Req;
	}
})();

App.Mods.SecExp.inflictBattleWound = (function() {
	/** @typedef {object} Wound
	 * @property {number} weight
	 * @property {function(App.Entity.SlaveState):boolean} allowed
	 * @property {function(App.Entity.SlaveState):void} effects
	 */
	/** @type {{[key: string]: Wound}} */
	const wounds = {
		eyes: {
			weight: 10,
			allowed: (s) => canSee(s),
			effects: (s) => {
				clampedDamage(s, 30);
				eyeSurgery(s, "both", "blind");
				App.Medicine.Modification.addScar(s, "damaged eyes", "a scar from shrapnel obtained while leading your army");
			}
		},
		voice: {
			weight: 10,
			allowed: (s) => canTalk(s),
			effects: (s) => {
				clampedDamage(s, 60);
				s.voice = 0;
				App.Medicine.Modification.addScar(s, "damaged throat", "a scar from shrapnel obtained while leading your army");
			}
		},
		legs: {
			weight: 5,
			allowed: (s) => hasAnyNaturalLegs(s),
			effects: (s) => {
				clampedDamage(s, 80);
				removeLimbs(s, "left leg");
				removeLimbs(s, "right leg");
				App.Medicine.Modification.addScar(s, "left buttock", "a scar from a battle wound leading to amputation");
				App.Medicine.Modification.addScar(s, "right buttock", "a scar from a battle wound leading to amputation");
			}
		},
		arm: {
			weight: 5,
			allowed: (s) => hasAnyNaturalArms(s),
			effects: (s) => {
				clampedDamage(s, 60);
				const side = jsEither(["left", "right"]);
				removeLimbs(s, side === "left" ? "left arm" : "right arm");
				App.Medicine.Modification.addScar(s, `${side} shoulder`, "a scar from a battle wound leading to amputation");
			}
		},
		flesh: {
			weight: 70,
			allowed: () => true,
			effects: (s) => {
				clampedDamage(s, 30);
				App.Medicine.Modification.addScar(s, either("left shoulder", "right shoulder", "back", "lower back", "belly", "left buttock", "right buttock"), "a scar from a stray shot while leading your army");
			}
		}
		// TODO: add more wound types? destroy prosthetics?
	};

	/** Inflicts a large amount of damage upon a slave without killing them (i.e. leaving their health total above -90)
	 * @param {App.Entity.SlaveState} slave
	 * @param {number} magnitude
	 */
	function clampedDamage(slave, magnitude) {
		if ((slave.health.health - magnitude) > -90) {
			healthDamage(slave, magnitude);
		} else {
			healthDamage(slave, 90 + slave.health.health);
		}
	}

	/** Inflicts a wound upon a slave during a battle. Returns the wound type from the wound table (see above) so it can be described.
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string}
	 */
	function doWound(slave) {
		let woundHash = {};
		for (const w of Object.keys(wounds)) {
			if (wounds[w].allowed(slave)) {
				woundHash[w] = wounds[w].weight;
			}
		}
		/** @type {string} */
		// @ts-ignore - FIXME: hashChoice has bad JSDoc
		const wound = hashChoice(woundHash);
		wounds[wound].effects(slave);
		return wound;
	}

	return doWound;
})();
