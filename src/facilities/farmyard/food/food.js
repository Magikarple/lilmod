/**
 * The amount of food a given slave produces in a week.
 *
 * Defaults to a menial slave if one is not provided.
 * @param {App.Entity.SlaveState} [slave]
 * @returns {number}
 */
App.Facilities.Farmyard.foodAmount = function(slave) {
	if (slave && V.farmyardShows === 2) { return 0; }

	let food = 100;

	if (V.farmyardUpgrades.pump) {
		food += 25;
	}

	if (V.farmyardUpgrades.fertilizer) {
		food += 50;
	}

	if (V.farmyardUpgrades.seeds) {
		food += 75;
	}

	if (V.farmyardUpgrades.machinery) {
		food += 100;
	}

	if (S.Farmer) {
		food *= 1.1;

		if (S.Farmer.skill.farmer >= Constant.MASTERED_XP) {
			food *= 1.3;
		}

		if (App.Data.Careers.Leader.farmer.includes(S.Farmer.career)) {
			food *= 1.2;
		}
	}

	if (slave) {
		food += slaveProduction(slave);

		if (V.farmyardShows === 1) {
			food *= 0.5;
		} else if (V.farmyardShows === 2) {
			return 0;
		}
	} else {
		food += menialProduction();
	}

	food = Math.trunc(Math.max(food, 0));

	return food;

	function slaveProduction(slave) {
		let food = 100;

		if (slave.devotion > 50) {
			food *= 1.1;
		} else if (slave.devotion < -50) {
			food *= 0.8;
		}

		if (slaveResting(slave)) {
			food *= 0.9;
		} else if (slave.health.tired + 20 >= 90 && !willWorkToDeath(slave)) {
			slave.devotion -= 10;
			slave.trust -= 5;
			food *= 0.5;
		}

		if (slave.muscles > 30) {
			food *= 1.1;
		} else if (slave.muscles <= -6) {
			food *= 0.8;
		}

		if (slave.weight > 95) {
			food *= 0.9;
		} else if (slave.weight > 130) {
			food *= 0.8;
		} else if (slave.weight > 160) {
			food *= 0.7;
		} else if (slave.weight > 190) {
			food *= 0.6;
		}

		if (!canSee(slave)) {
			food *= 0.6;
		} else if (!canSeePerfectly(slave)) {
			food *= 0.8;
		}

		if (slave.hears === -1) {
			food *= 0.8;
		} else if (slave.hears < -1) {
			food *= 0.6;
		}

		food *= restEffects(slave, 20);

		return food;
	}

	function menialProduction() {
		return food * 0.85;
	}
};

/**
 * The total amount of food produced in a given week.
 *
 * @param {'menials'|'slaves'|'both'} [target] Whose production to target.
 */
App.Facilities.Farmyard.foodProduction = function(target='both') {
	function menialProduction() {
		return V.farmMenials * App.Facilities.Farmyard.foodAmount();
	}

	function slaveProduction() {
		return App.Entity.facilities.farmyard.employees().reduce((acc, cur) => acc + App.Facilities.Farmyard.foodAmount(cur), 0);
	}

	if (target === 'menials') { return menialProduction(); }
	if (target === 'slaves') { return slaveProduction(); }

	return menialProduction() + slaveProduction();
};

/**
 * The total amount of food consumed in a given week.
 *
 * @param {'citizens'|'slaves'|'both'} target Whose consumption to target.
 */
App.Facilities.Farmyard.foodConsumption = function(target = 'both') {
	function citizenConsumption() {
		return (
			(V.lowerClass * V.mods.food.rate.lower) +
			(V.middleClass * V.mods.food.rate.middle) +
			(V.upperClass * V.mods.food.rate.upper) +
			(V.topClass * V.mods.food.rate.top)
		);
	}

	function slaveConsumption() {
		let total = 0;

		for (const slave of V.slaves) {
			let amount = 8;

			if (slave.diet === "restricted") {
				amount = 6;
			} else if (slave.diet === "slimming") {
				amount = 7;
			} else if (slave.diet === "muscle building") {
				amount = 9;
			} else if (slave.diet === "fattening") {
				amount = 10;
			}

			total += amount;
		}

		return total;
	}

	if (target === 'citizens') { return citizenConsumption(); }
	if (target === 'slaves') { return slaveConsumption(); }

	return citizenConsumption() + slaveConsumption();
};
