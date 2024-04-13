/* global V, Engine, num, random */
App.Events.conflictHandler = function() {
	V.nextButton = ' ';
	App.UI.StoryCaption.encyclopedia = 'Battles';

	const node = new DocumentFragment();
	const showStats = V.SecExp.settings.showStats === 1;
	const inBattle = V.SecExp.war.type.includes('Attack');
	const isMajorBattle = inBattle && V.SecExp.war.type.includes('Major');
	const inRebellion = V.SecExp.war.type.includes('Rebellion');
	const turns = isMajorBattle || inRebellion ? 20 : 10;
	const showProgress = function(message, tag = 'div') {
		if (showStats) {
			App.UI.DOM.appendNewElement(tag, node, message);
		}
	};
	const setResult = function(varA, varB, text, value, count) {
		if (varA <= 0 || varB <= 0) {
			showProgress(`${text}!`);
			V.SecExp.war.result = value;
			V.SecExp.war.turns = count;
		}
	};
	const atEnd = function(passage) {
		if (showStats) {
			App.UI.DOM.appendNewElement(
				'div',
				node,
				App.UI.DOM.passageLink('Proceed', passage),
			);
		} else {
			setTimeout(() => Engine.play(passage), Engine.minDomActionDelay);
		}
	};
	const turnReport = function() {
		showProgress(`Turn: ${i + 1}`);
		// player army attacks
		damage = Math.round(
			Math.clamp(
				attack.total - enemyDefense,
				attack.total * 0.1,
				attack.total,
			),
		);
		showProgress(`Player damage: ${num(Math.round(damage))}`);
		enemyHp -= damage;
		showProgress(`Remaining enemy Hp: ${num(Math.round(enemyHp))}`);
		V.SecExp.war.attacker.losses += damage / enemyBaseHp;
		enemyMorale -= Math.clamp(
			damage / 2 +
			damage / enemyBaseHp,
			0,
			damage * 1.5,
		);
		showProgress(`Remaining enemy morale: ${num(Math.round(enemyMorale))}`);
		setResult(enemyHp, enemyMorale, 'Victory', 3, i);

		// OpFor army attacks
		damage = enemyAttack - defense.total;
		if (damage < enemyAttack * 0.1) {
			damage = enemyAttack * 0.1;
		}
		damage = Math.round(damage);
		showProgress(`Enemy damage: ${num(Math.round(damage))}`);
		hp.total -=
			damage * (inRebellion && V.SecExp.rebellions.sfArmor ? 0.85 : 1);
		showProgress(`Remaining hp: ${num(Math.round(hp.total))}`);
		V.SecExp.war.losses += damage / baseHp;
		morale.total -= Math.clamp(
			damage / 2 +
			damage / baseHp,
			0,
			damage * 1.5,
		);
		showProgress(`Remaining morale: ${num(Math.round(morale.total))}`);
		setResult(hp.total, morale.total, 'Defeat', -3, i);
	};

	const attack = {base: 0, modifier: 1};
	const defense = {base: 0, modifier: 1};
	const morale = {base: 0};
	const hp = {base: 0};
	let unitData;
	let damage;
	let baseHp;
	let enemyBaseHp;
	let enemyMorale;
	let enemyAttack = 0;
	let enemyDefense = 0;
	let enemyHp = 0;
	let armyMod = V.SecExp.war.attacker.troops / (inBattle ? 80 : 100);
	const activeSF = V.SF.Toggle && V.SF.Active >= 1;
	// Battles
	morale.militia = isMajorBattle ? 1.5 : 1;
	morale.slaves = isMajorBattle ? 1.5 : 1;
	morale.mercs = isMajorBattle ? 1.5 : 1;
	morale.enemy = isMajorBattle ? 1.5 : 1;
	morale.SF = isMajorBattle ? 1.5 : 1;
	let tacChance = 0.5; // by default tactics have a 50% chance of succeeding
	// Rebellions
	let irregularMod = V.SecExp.war.irregulars / 60;
	let engageMod = 0.5; // V.SecExp.war.engageRule === 0
	let rebellingSlaves = 0;
	let rebellingMilitia = 0;

	if (inBattle && (V.SecExp.war.result === 1 || V.SecExp.war.result === -1)) {
		// bribery/surrender check
		showProgress(`${V.SecExp.war.result === 1 ? 'Bribery' : 'Surrender'} chosen`);
		if (inBattle && V.SecExp.war.result === 1) {
			if (V.cash >= App.Mods.SecExp.battle.bribeCost()) {
				// if there's enough cash there's a 10% chance bribery fails. If there isn't there's instead a 50% chance it fails
				if (
					(
						V.SecExp.war.attacker.type === 'freedom fighters' &&
						random(1, 100) <= 50
					) ||
					random(1, 100) <= 10
				) {
					V.SecExp.war.result = 0;
				}
			} else {
				if (random(1, 100) <= 50) {
					V.SecExp.war.result = 0;
				}
			}
			showProgress(`${V.SecExp.war.result === 0 ? 'Failed' : 'Successful'}!`, 'span');
			atEnd('conflictReport');
			return node;
		}
	}

	if (inBattle) {
		if (isMajorBattle) {
			if (activeSF) {
				if (V.SF.Squad.Firebase >= 7) {
					attack.modifier += (V.SF.Squad.Firebase - 6) * 0.05;
				}
				if (V.SF.Squad.GunS >= 1) {
					defense.modifier += V.SF.Squad.GunS * 0.05;
				}
				if (V.SF.Squad.Satellite >= 5 && V.SF.SatLaunched > 0) {
					attack.modifier += (V.SF.Squad.Satellite - 5) * 0.05;
				}
				if (V.SF.Squad.GiantRobot >= 6) {
					defense.modifier += (V.SF.Squad.GiantRobot - 5) * 0.05;
				}
				if (V.SF.Squad.MissileSilo >= 1) {
					attack.modifier += V.SF.Squad.MissileSilo * 0.05;
				}
			}
		}

		const commanderEffectiveness = App.Mods.SecExp.commanderEffectiveness('handler');
		morale.slaves += commanderEffectiveness.slaveMod;
		morale.militia += commanderEffectiveness.militiaMod;
		morale.mercs += commanderEffectiveness.militiaMod;
		morale.SF += commanderEffectiveness.SFMod;
		morale.enemy += commanderEffectiveness.enemyMod;
		attack.modifier += commanderEffectiveness.atkMod;
		defense.modifier += commanderEffectiveness.defMod;
		tacChance += commanderEffectiveness.tacChance;

		// Terrain and Tactics
		const tacticsObj = App.Data.SecExp.TerrainAndTactics.get(V.SecExp.war.terrain)[V.SecExp.war.chosenTactic];
		attack.modifier += tacticsObj.atkMod;
		defense.modifier += tacticsObj.defMod;
		tacChance += tacticsObj.tacChance;

		if (V.SecExp.war.chosenTactic === 'Bait and Bleed') {
			if (V.SecExp.war.attacker.type === 'raiders') {
				tacChance -= 0.1;
			} else if (V.SecExp.war.attacker.type === 'free city') {
				tacChance += 0.1;
			} else if (V.SecExp.war.attacker.type === 'old world') {
				tacChance += 0.25;
			} else if (V.SecExp.war.attacker.type === 'freedom fighters') {
				tacChance -= 0.15;
			}
		} else if (V.SecExp.war.chosenTactic === 'Guerrilla') {
			if (V.SecExp.war.attacker.type === 'raiders') {
				tacChance -= 0.2;
			} else if (V.SecExp.war.attacker.type === 'free city') {
				tacChance += 0.15;
			} else if (V.SecExp.war.attacker.type === 'old world') {
				tacChance += 0.25;
			} else if (V.SecExp.war.attacker.type === 'freedom fighters') {
				tacChance -= 0.25;
			}
		} else if (V.SecExp.war.chosenTactic === 'Choke Points') {
			if (V.SecExp.war.attacker.type === 'raiders') {
				tacChance += 0.25;
			} else if (V.SecExp.war.attacker.type === 'free city') {
				tacChance -= 0.05;
			} else if (V.SecExp.war.attacker.type === 'old world') {
				tacChance -= 0.1;
			} else if (V.SecExp.war.attacker.type === 'freedom fighters') {
				tacChance += 0.05;
			}
		} else if (V.SecExp.war.chosenTactic === 'Interior Lines') {
			if (V.SecExp.war.attacker.type === 'raiders') {
				tacChance -= 0.15;
			} else if (V.SecExp.war.attacker.type === 'free city') {
				tacChance += 0.15;
			} else if (V.SecExp.war.attacker.type === 'old world') {
				tacChance += 0.2;
			} else if (V.SecExp.war.attacker.type === 'freedom fighters') {
				tacChance -= 0.1;
			}
		} else if (V.SecExp.war.chosenTactic === 'Pincer Maneuver') {
			if (V.SecExp.war.attacker.type === 'raiders') {
				tacChance += 0.15;
			} else if (V.SecExp.war.attacker.type === 'free city') {
				tacChance += 0.1;
			} else if (V.SecExp.war.attacker.type === 'old world') {
				tacChance -= 0.1;
			} else if (V.SecExp.war.attacker.type === 'freedom fighters') {
				tacChance += 0.15;
			}
		} else if (V.SecExp.war.chosenTactic === 'Defense In Depth') {
			if (V.SecExp.war.attacker.type === 'raiders') {
				tacChance -= 0.2;
			} else if (V.SecExp.war.attacker.type === 'free city') {
				tacChance += 0.1;
			} else if (V.SecExp.war.attacker.type === 'old world') {
				tacChance += 0.2;
			} else if (V.SecExp.war.attacker.type === 'freedom fighters') {
				tacChance -= 0.05;
			}
		} else if (V.SecExp.war.chosenTactic === 'Blitzkrieg') {
			if (V.SecExp.war.attacker.type === 'raiders') {
				tacChance += 0.1;
			} else if (V.SecExp.war.attacker.type === 'free city') {
				tacChance -= 0.2;
			} else if (V.SecExp.war.attacker.type === 'old world') {
				tacChance += 0.25;
			} else if (V.SecExp.war.attacker.type === 'freedom fighters') {
				tacChance -= 0.1;
			}
		} else if (V.SecExp.war.chosenTactic === 'Human Wave') {
			if (V.SecExp.war.attacker.type === 'raiders') {
				tacChance -= 0.1;
			} else if (V.SecExp.war.attacker.type === 'free city') {
				tacChance += 0.1;
			} else if (V.SecExp.war.attacker.type === 'old world') {
				tacChance -= 0.15;
			} else if (V.SecExp.war.attacker.type === 'freedom fighters') {
				tacChance += 0.1;
			}
		}
		tacChance = Math.clamp(tacChance, 0.1, tacChance); // Calculates if tactics are successful - minimum chance is 10%

		if (random(1, 100) <= tacChance * 100) {
			morale.enemy -= 0.3;
			morale.militia += 0.2;
			morale.slaves += 0.2;
			morale.mercs += 0.2;
			attack.modifier += 0.1;
			defense.modifier += 0.1;
			V.SecExp.war.tacticsSuccessful = 1;
		} else {
			morale.enemy += 0.2;
			morale.militia -= 0.2;
			morale.slaves -= 0.2;
			morale.mercs -= 0.2;
			attack.modifier -= 0.1;
			defense.modifier -= 0.1;
		}

		// enemy morale mods
		if (V.week < 30) {
			morale.enemy += 0.15;
		} else if (V.week < 60) {
			morale.enemy += 0.3;
		} else if (V.week < 90) {
			morale.enemy += 0.45;
		} else if (V.week < 120) {
			morale.enemy += 0.6;
		} else {
			morale.enemy += 0.75;
		}
	}

	// calculates PC army stats
	if (inRebellion) {
		if (V.SecExp.war.engageRule === 1) {
			engageMod = 0.75;
		} else if (V.SecExp.war.engageRule === 2) {
			engageMod = 1;
		} else if (V.SecExp.war.engageRule > 2) {
			engageMod = 1.4;
		}

		if (V.week > 30 && V.week <= 60) {
			irregularMod = V.SecExp.war.irregulars / 50;
		} else if (V.week <= 90) {
			irregularMod = V.SecExp.war.irregulars / 40;
		} else if (V.week <= 120) {
			irregularMod = V.SecExp.war.irregulars / 30;
		} else {
			irregularMod = V.SecExp.war.irregulars / 20;
		}
		if (V.SecExp.war.irregulars > 0) {
			irregularMod = Math.trunc(irregularMod);
			unitData = App.Mods.SecExp.getIrregularUnit(
				'militia',
				V.SecExp.war.irregulars,
				V.SecExp.war.attacker.equip,
			);
			attack.irregulars = unitData.attack * irregularMod * 0.8;
			defense.irregulars = unitData.defense * irregularMod * 0.8;
			hp.irregulars = unitData.hp;
		}
	}

	for (const type of Array.from(App.Mods.SecExp.unit.list().keys())) {
		for (const unit of V.SecExp.units[type].squads) {
			if (App.Mods.SecExp.unit.isDeployed(unit)) {
				unitData = App.Mods.SecExp.getUnit(type, unit);
				attack.base += unitData.attack;
				defense.base += unitData.defense;
				hp.base += unitData.hp;
			}
		}
	}

	if (activeSF && ((inBattle && V.SecExp.war.deploySF) || inRebellion)) {
		unitData = App.Mods.SecExp.getUnit('SF');
		attack.SF = unitData.attack;
		defense.SF = unitData.defense;
		hp.SF = unitData.hp;
	}

	if (inRebellion) {
		for (const zone of ['assistant', 'reactor', 'penthouse', 'waterway']) {
			if (V.SecExp.war[zone + 'Defense']) {
				attack.base *= 0.95;
				defense.base *= 0.95;
				hp.base *= 0.95;
			}
		}
	}

	// morale and baseHp calculation
	if (inBattle) {
		// minimum modifier is -50%, maximum is +50%
		morale.slaves = Math.clamp(morale.slaves, 0.5, 1.5);
		morale.militia = Math.clamp(morale.militia, 0.5, 1.5);
		morale.mercs = Math.clamp(morale.mercs, 0.5, 1.5);
		morale.SF = Math.clamp(morale.SF, 0.5, 1.5);
	}
	const moraleTroopMod = Math.clamp(
		App.Mods.SecExp.battle.troopCount() / 100,
		1,
		inBattle ? 5 : 10,
	);
	const modifierSF = activeSF ? 1 : 0;

	if (inBattle) {
		morale.total =
			(
				App.Mods.SecExp.BaseDroneUnit.morale *
					App.Mods.SecExp.battle.deployedUnits('bots') +
				App.Mods.SecExp.BaseMilitiaUnit.morale *
					morale.militia *
					App.Mods.SecExp.battle.deployedUnits('militia') +
				App.Mods.SecExp.BaseSlaveUnit.morale *
					morale.slaves *
					App.Mods.SecExp.battle.deployedUnits('slaves') +
				App.Mods.SecExp.BaseMercUnit.morale *
					morale.mercs *
					App.Mods.SecExp.battle.deployedUnits('mercs') +
				App.Mods.SecExp.BaseSpecialForcesUnit.morale *
					V.SecExp.war.deploySF *
					morale.SF
			) /
			(
				App.Mods.SecExp.battle.deployedUnits('bots') +
				App.Mods.SecExp.battle.deployedUnits('militia') +
				App.Mods.SecExp.battle.deployedUnits('slaves') +
				App.Mods.SecExp.battle.deployedUnits('mercs') +
				V.SecExp.war.deploySF
			);
		if (V.SecExp.buildings.barracks) {
			morale.total += morale.total * V.SecExp.buildings.barracks.luxury * 0.05; // barracks bonus
		}
	} else {
		morale.total =
			(
				App.Mods.SecExp.BaseDroneUnit.morale *
					App.Mods.SecExp.battle.deployedUnits('bots') +
				App.Mods.SecExp.BaseMilitiaUnit.morale *
					App.Mods.SecExp.battle.deployedUnits('militia') +
				App.Mods.SecExp.BaseSlaveUnit.morale *
					App.Mods.SecExp.battle.deployedUnits('slaves') +
				App.Mods.SecExp.BaseMercUnit.morale *
					App.Mods.SecExp.battle.deployedUnits('mercs') +
				App.Mods.SecExp.BaseSpecialForcesUnit.morale *
					modifierSF
			) /
			(
				App.Mods.SecExp.battle.deployedUnits('bots') +
				App.Mods.SecExp.battle.deployedUnits('militia') +
				App.Mods.SecExp.battle.deployedUnits('slaves') +
				App.Mods.SecExp.battle.deployedUnits('mercs') +
				modifierSF
			);
		morale.total +=
			morale.total *
				(V.SecExp.buildings.barracks
					? V.SecExp.buildings.barracks.luxury * 0.05
					: 1); // barracks bonus
	}
	morale.total *= moraleTroopMod;
	if (inBattle) {
		baseHp =
			(
				App.Mods.SecExp.BaseDroneUnit.hp *
					App.Mods.SecExp.battle.deployedUnits('bots') +
				App.Mods.SecExp.BaseMilitiaUnit.hp *
					App.Mods.SecExp.battle.deployedUnits('militia') +
				App.Mods.SecExp.BaseSlaveUnit.hp *
					App.Mods.SecExp.battle.deployedUnits('slaves') +
				App.Mods.SecExp.BaseMercUnit.hp *
					App.Mods.SecExp.battle.deployedUnits('mercs') +
				App.Mods.SecExp.BaseSpecialForcesUnit.hp *
					V.SecExp.war.deploySF
			) /
			(
				App.Mods.SecExp.battle.deployedUnits('bots') +
				App.Mods.SecExp.battle.deployedUnits('militia') +
				App.Mods.SecExp.battle.deployedUnits('slaves') +
				App.Mods.SecExp.battle.deployedUnits('mercs') +
				V.SecExp.war.deploySF
			);
	} else {
		baseHp =
			(
				App.Mods.SecExp.BaseDroneUnit.hp *
					App.Mods.SecExp.battle.deployedUnits('bots') +
				App.Mods.SecExp.BaseMilitiaUnit.hp *
					App.Mods.SecExp.battle.deployedUnits('militia') +
				App.Mods.SecExp.BaseSlaveUnit.hp *
					App.Mods.SecExp.battle.deployedUnits('slaves') +
				App.Mods.SecExp.BaseMercUnit.hp *
					App.Mods.SecExp.battle.deployedUnits('mercs') +
				App.Mods.SecExp.BaseSpecialForcesUnit.hp *
					modifierSF
			) /
			(
				App.Mods.SecExp.battle.deployedUnits('bots') +
				App.Mods.SecExp.battle.deployedUnits('militia') +
				App.Mods.SecExp.battle.deployedUnits('slaves') +
				App.Mods.SecExp.battle.deployedUnits('mercs') +
				modifierSF
			);
	}

	// calculates opposing army stats
	if (V.week > 30 && V.week <= 60) {
		armyMod = V.SecExp.war.attacker.troops / (inBattle ? 75 : 90);
	} else if (V.week <= 90) {
		armyMod = V.SecExp.war.attacker.troops / (inBattle ? 70 : 80);
	} else if (V.week <= 120) {
		armyMod = V.SecExp.war.attacker.troops / (inBattle ? 65 : 70);
	} else if (V.week > 120) {
		armyMod = V.SecExp.war.attacker.troops / 60;
	}
	armyMod = Math.trunc(armyMod);
	if (isMajorBattle) {
		armyMod *= 2;
	}
	if (inBattle && armyMod <= 0) {
		armyMod = 1;
	}

	if (inRebellion) {
		if (V.SecExp.war.type.includes('Slave')) {
			rebellingSlaves = 1;
			unitData = App.Mods.SecExp.getIrregularUnit(
				'slaves',
				V.SecExp.war.attacker.troops,
				V.SecExp.war.attacker.equip,
			);
		} else {
			rebellingMilitia = 1;
			unitData = App.Mods.SecExp.getIrregularUnit(
				'militia',
				V.SecExp.war.attacker.troops,
				V.SecExp.war.attacker.equip,
			);
		}
		enemyAttack += unitData.attack * armyMod;
		enemyDefense += unitData.defense * armyMod;
		enemyHp += unitData.hp;

		for (const [type] of Array.from(App.Mods.SecExp.unit.list()).slice(1)) {
			if (
				(rebellingSlaves === 1 && type === 'slaves') ||
				(rebellingMilitia === 1 && type === 'militia')
			) {
				for (const unit of V.SecExp.units[type].squads) {
					if (V.SecExp.war.rebellingID.includes(unit.ID)) {
						V.SecExp.war.attacker.troops += unit.troops;
						unit.loyalty = 0;
						unitData = App.Mods.SecExp.getUnit(type, unit);
						enemyAttack += unitData.attack;
						enemyDefense += unitData.defense;
						enemyHp += unitData.hp;
					}
				}
			}
		}
	}

	// calculates opposing army stats
	const enemyMoraleTroopMod = Math.clamp(
		V.SecExp.war.attacker.troops / 100,
		1,
		inBattle ? 5 : 10,
	);
	if (inBattle) {
		unitData = App.Mods.SecExp.getEnemyUnit(
			V.SecExp.war.attacker.type,
			V.SecExp.war.attacker.troops,
			V.SecExp.war.attacker.equip,
		);
		enemyAttack = unitData.attack * armyMod;
		enemyDefense = unitData.defense * armyMod;
		enemyMorale = unitData.morale * morale.enemy * enemyMoraleTroopMod;
		enemyHp = unitData.hp;
		enemyBaseHp = unitData.hp / V.SecExp.war.attacker.troops;
	} else {
		enemyMorale =
			(
				1.5 *
				(
					App.Mods.SecExp.BaseMilitiaUnit.morale *
						rebellingMilitia +
					App.Mods.SecExp.BaseSlaveUnit.morale *
						rebellingSlaves
				)
			) /
			(rebellingMilitia + rebellingSlaves);
		enemyMorale *= enemyMoraleTroopMod;
		enemyBaseHp =
			(
				App.Mods.SecExp.BaseMilitiaUnit.hp *
					rebellingMilitia +
				App.Mods.SecExp.BaseSlaveUnit.hp *
					rebellingSlaves
			) /
			(rebellingMilitia + rebellingSlaves);
	}
	enemyMorale = Math.round(enemyMorale);

	attack.total = Math.round(Object.values(attack).reduce((a, b) => a + b));
	defense.total = Math.round(Object.values(defense).reduce((a, b) => a + b));
	hp.total = Math.round(Object.values(hp).reduce((a, b) => a + b));
	morale.total = Math.round(Object.values(hp).reduce((a, b) => a + b));

	for (const variable of [
		attack.total,
		defense.total,
		hp.total,
		morale.total,
		enemyAttack,
		enemyDefense,
		enemyHp,
		enemyMorale,
		enemyBaseHp,
	]) {
		if (isNaN(variable)) {
			throw Error(
				'Value: A key variable is NaN, please report this along with an affected save.',
			);
		}
	}

	enemyAttack *= V.SecExp.settings.difficulty;
	enemyDefense *= V.SecExp.settings.difficulty;
	enemyMorale *= V.SecExp.settings.difficulty;
	enemyHp *= V.SecExp.settings.difficulty;
	enemyBaseHp *= V.SecExp.settings.difficulty;

	if (showStats) {
		if (inBattle) {
			attack.modifier = Math.round((attack.modifier - 1) * 100);
			defense.modifier = Math.round((defense.modifier - 1) * 100);
			morale.militia = Math.round((morale.militia - 1) * 100);
			morale.mercs = Math.round((morale.mercs - 1) * 100);
			morale.slaves = Math.round((morale.slaves - 1) * 100);
			morale.SF = Math.round((morale.SF - 1) * 100);
			morale.enemy = Math.round((morale.enemy - 1) * 100);
		} else {
			engageMod = Math.round((engageMod - 1) * 100);
		}

		let difficultyText;
		if (V.SecExp.settings.difficulty === 0.5) {
			difficultyText = 'Very easy';
		} else if (V.SecExp.settings.difficulty === 0.75) {
			difficultyText = 'Easy';
		} else if (V.SecExp.settings.difficulty === 1) {
			difficultyText = 'Normal';
		} else if (V.SecExp.settings.difficulty === 1.25) {
			difficultyText = 'Hard';
		} else if (V.SecExp.settings.difficulty === 1.5) {
			difficultyText = 'Very hard';
		} else {
			difficultyText = 'Extremely hard';
		}
		App.UI.DOM.appendNewElement(
			'div',
			node,
			`Difficulty: ${difficultyText}. Modifier: x${V.SecExp.settings.difficulty}`,
		);

		App.UI.DOM.appendNewElement('div', node, 'Army', ['underline']);
		App.UI.DOM.appendNewElement('div', node, `Deployed troops: ${num(App.Mods.SecExp.battle.troopCount())}`);
		App.UI.DOM.appendNewElement('div', node, `Attack: ${num(attack.total)}.`);
		if (attack.SF) {
			App.UI.DOM.appendNewElement('div', node, `Base: ${attack.base}`, ['indent']);
			App.UI.DOM.appendNewElement('div', node, `SF Bonus: ${attack.SF}`, ['indent']);
		}
		App.UI.DOM.appendNewElement(
			'div',
			node,
			`Defense: ${num(Math.round(defense.total))}.`,
		);
		if (defense.SF) {
			App.UI.DOM.appendNewElement('div', node, `Base: ${defense.base}`, ['indent']);
			App.UI.DOM.appendNewElement('div', node, `SF Bonus: ${defense.SF}`, ['indent']);
		}
		if (inRebellion) {
			App.UI.DOM.appendNewElement(
				'div',
				node,
				`Engagement rule modifier: +${engageMod}%`,
			);
		}
		App.UI.DOM.appendNewElement(
			'div',
			node,
			`HP: ${num(Math.round(hp.total))}.`,
		);
		if (hp.SF) {
			App.UI.DOM.appendNewElement('div', node, `Base: ${hp.base}`, ['indent']);
			App.UI.DOM.appendNewElement('div', node, `SF Bonus: ${hp.SF}`, ['indent']);
		}
		App.UI.DOM.appendNewElement(
			'div',
			node,
			`Morale: ${num(Math.round(morale.total))}.`,
		);
		if (inBattle) {
			App.UI.DOM.appendNewElement(
				'div',
				node,
				`Slaves morale modifier: +${morale.slaves}%`,
				['indent'],
			);
			App.UI.DOM.appendNewElement(
				'div',
				node,
				`Militia morale modifier: +${morale.militia}%`,
				['indent'],
			);
			App.UI.DOM.appendNewElement(
				'div',
				node,
				`Mercenaries morale modifier: +${morale.mercs}%`,
				['indent'],
			);
			if (activeSF && V.SecExp.war.deploySF) {
				App.UI.DOM.appendNewElement(
					'div',
					node,
					`Special Force morale modifier: +${morale.SF}%`,
					['indent'],
				);
			}
			if (
				V.SecExp.buildings.barracks &&
				V.SecExp.buildings.barracks.luxury >= 1
			) {
				App.UI.DOM.appendNewElement(
					'div',
					node,
					`Barracks bonus morale modifier: +${V.SecExp.buildings.barracks.luxury * 5}%`,
					['indent'],
				);
			}
		}
		if (inBattle) {
			App.UI.DOM.appendNewElement('div', node, 'Tactics', ['underline']);
			App.UI.DOM.appendNewElement(
				'div',
				node,
				`Chance of success: ${num(Math.round(tacChance * 100))}%. Was successful?: ${V.SecExp.war.tacticsSuccessful ? 'Yes' : 'No'}`,
			);
		}

		App.UI.DOM.appendNewElement('p', node);
		App.UI.DOM.appendNewElement(
			'div',
			node,
			`${inBattle ? 'Enemy' : 'Rebels'}`,
			['underline'],
		);
		App.UI.DOM.appendNewElement(
			'div',
			node,
			`Troops: ${num(Math.round(V.SecExp.war.attacker.troops))}`,
		);
		App.UI.DOM.appendNewElement(
			'div',
			node,
			`Attack: ${num(Math.round(enemyAttack))}`,
		);
		App.UI.DOM.appendNewElement(
			'div',
			node,
			`Defense: ${num(Math.round(enemyDefense))}`,
		);
		App.UI.DOM.appendNewElement(
			'div',
			node,
			`HP: ${num(Math.round(enemyHp))}. Base: ${num(Math.round(enemyBaseHp))}`,
		);
		App.UI.DOM.appendNewElement(
			'div',
			node,
			`Morale: ${num(Math.round(enemyMorale))}.`,
		);
		if (inBattle) {
			App.UI.DOM.appendNewElement(
				'div',
				node,
				// Allowing displaying 'Rebels' is just future-proofing. Currently that branch will never be taken.
				`${inBattle ? 'Enemy' : 'Rebels'} morale modifier: +${morale.enemy}%`,
				['indent'],
			);
			App.UI.DOM.appendNewElement(
				'div',
				node,
				`${inBattle ? 'Enemy' : 'Rebels'} morale extra modifier due to troop numbers: +${Math.round((enemyMoraleTroopMod-1) * 100)}%`,
				['indent'],
			);
		}
	}

	let i = 0; // simulates the combat by pitting attack against defense
	while (i < turns && ![3, -3].includes(V.SecExp.war.result)) {
		App.UI.DOM.appendNewElement('p', node, turnReport());
		i++;
	}

	if (![3, -3].includes(V.SecExp.war.result)) {
		showProgress(`Partial ${morale.total > enemyMorale ? 'victory' : 'defeat'}!`);
		V.SecExp.war.result = morale.total > enemyMorale ? 2 : -2;
	}

	if (V.SecExp.war.result > 3 || V.SecExp.war.result < -3) {
		throw Error('Failed to determine battle result');
	}

	if (inBattle && showStats) {
		App.UI.DOM.appendNewElement(
			'div',
			node,
			`Losses: ${num(Math.trunc(V.SecExp.war.losses))}`,
		);
		App.UI.DOM.appendNewElement(
			'div',
			node,
			`Enemy losses: ${num(Math.trunc(V.SecExp.war.attacker.losses))}`,
		);
	}

	if (
		V.SecExp.war.result === -3 &&
		(
			(isMajorBattle && V.SecExp.settings.battle.major.gameOver === 1) ||
			(inRebellion && V.SecExp.settings.rebellion.gameOver === 1)
		)
	) {
		V.gameover = `${isMajorBattle ? 'major battle' : 'Rebellion'} defeat`;
		atEnd('Gameover');
	} else {
		atEnd('conflictReport');
	}
	return node;
};
