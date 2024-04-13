App.Mods.SF.unlocked = (function() {
	return {
		secondTier,
		garage,
		hangar,
		launchBay,
		navalYard
	};

	function secondTier() {
		return V.SF.Squad.Firebase + V.SF.Squad.Armoury + V.SF.Squad.Drugs + V.SF.Squad.Drones +
			(V.terrain !== "oceanic" ? V.SF.Squad.AV + V.SF.Squad.TV : 0) + V.SF.Squad.AA + V.SF.Squad.TA >= 30;
	}

	function garage() {
		return V.SF.Squad.Firebase >= 1 && V.terrain !== "oceanic";
	}

	function hangar() {
		return V.SF.Squad.Firebase >= 4;
	}

	function launchBay() {
		return secondTier();
	}

	function navalYard() {
		return secondTier() && (V.terrain === "oceanic" || V.terrain === "marine");
	}
})();

App.Mods.SF.upgrades = (function() {
	return {
		total,
		list,
		max,
		currentUnitMax,
		menu
	};

	function total() {
		return V.SF.Toggle === 1 && V.SF.Active >= 1 ? Object.values(V.SF.Squad).reduce((a, b) => a + b) : 0;
	}

	function list(completeView = '') {
		let array = ['Armoury', 'Firebase', 'Drugs'];
		const T1 = App.Mods.SF.unlocked.secondTier();

		if (V.SF.Squad.Firebase >= 2 || completeView === 'all') {
			array.push('Drones');
		}

		if (V.terrain !== "oceanic" && (V.SF.Squad.Firebase >= 1 || completeView === 'all')) { // Garage
			array.push('AV', 'TV');
			if (completeView === 'all' || T1) {
				array.push('PGT');
			}
		}

		if (V.SF.Squad.Firebase >= 4 || completeView === 'all') { // Hangar
			array.push('AA', 'TA');
			if (completeView === 'all' || T1) {
				array.push('SpacePlane', 'GunS');
			}
		}

		if (completeView === 'all' || T1) { // Launch Bay
			array.push('Satellite');
			if (V.terrain !== "oceanic") {
				array.push('GiantRobot', 'MissileSilo');
			}
			if (V.terrain === "oceanic" || V.terrain === "marine") { // Naval Yard
				array.push('AircraftCarrier', 'Sub', 'HAT');
			}
		}

		return array;
	}

	function max() {
		return list('all').length * 10;
	}

	function currentUnitMax(input) {
		const T1 = App.Mods.SF.unlocked.secondTier();

		if (!T1) {
			if (['Armoury', 'Firebase', 'Drugs', 'Drones', 'AV', 'TV', 'AA', 'TA'].includes(input)) {
				return 5;
			}
			return 0;
		} else {
			if (!['SpacePlane', 'GunS', 'Satellite', 'GiantRobot', 'MissileSilo', 'AircraftCarrier', 'Sub', 'HAT'].includes(input)) {
				return 10;
			} else {
				if (V.PC.skill.warfare >= 75) {
					return 10;
				} else if (V.PC.skill.warfare >= 50) {
					return 9;
				} else {
					return 8;
				}
			}
		}
	}

	function menu() {
		const fullyUpgraded = [];
		const node = document.createElement("span");
		App.UI.DOM.appendNewElement("p", node, "Which facility or equipment do you wish to upgrade this week?");

		App.UI.DOM.appendNewElement("div", node, checkUnit("Firebase"));
		App.UI.DOM.appendNewElement("div", node, checkUnit("Armoury"));
		App.UI.DOM.appendNewElement("div", node, checkUnit("Drugs"));
		if (V.SF.Squad.Firebase >= 2) {
			App.UI.DOM.appendNewElement("div", node, checkUnit("Drones"));
		}

		if (App.Mods.SF.unlocked.garage()) {
			App.UI.DOM.appendNewElement("div", node, "Garage", "bold");
			App.UI.DOM.appendNewElement("div", node, checkUnit("AV"));
			App.UI.DOM.appendNewElement("div", node, checkUnit("TV"));
			App.UI.DOM.appendNewElement("div", node, checkUnit("PGT"));
		}
		if (App.Mods.SF.unlocked.hangar()) {
			App.UI.DOM.appendNewElement("div", node, "Hangar", "bold");
			App.UI.DOM.appendNewElement("div", node, checkUnit("AA"));
			App.UI.DOM.appendNewElement("div", node, checkUnit("TA"));
			App.UI.DOM.appendNewElement("div", node, checkUnit("SpacePlane"));
			App.UI.DOM.appendNewElement("div", node, checkUnit("GunS"));
		}
		if (App.Mods.SF.unlocked.launchBay()) {
			App.UI.DOM.appendNewElement("div", node, "Launch Bay", "bold");
			App.UI.DOM.appendNewElement("div", node, checkUnit("Satellite"));
			if (V.terrain !== "oceanic") {
				App.UI.DOM.appendNewElement("div", node, checkUnit("GiantRobot"));
				App.UI.DOM.appendNewElement("div", node, checkUnit("MissileSilo"));
			}
		}
		if (App.Mods.SF.unlocked.navalYard()) {
			App.UI.DOM.appendNewElement("div", node, "Naval Yard", "bold");
			App.UI.DOM.appendNewElement("div", node, checkUnit("AircraftCarrier"));
			App.UI.DOM.appendNewElement("div", node, checkUnit("Sub"));
			App.UI.DOM.appendNewElement("div", node, checkUnit("HAT"));
		}

		if (fullyUpgraded.length > 0) {
			App.UI.DOM.appendNewElement("div", node, `The following units are fully upgraded: ${toSentence(fullyUpgraded)}.`, "note");
		}
		return node;

		/**
		 * @param {string} unit
		 * @returns {DocumentFragment}
		 */
		function checkUnit(unit) {
			const node = new DocumentFragment();
			const max = App.Mods.SF.upgrades.currentUnitMax(unit);
			let cost;
			let text = unit;
			switch (unit) {
				case "Firebase":
					cost = 125000;
					break;
				case "Armoury":
					cost = 40000;
					break;
				case "Drugs":
					cost = 40000;
					text = "Drug Lab";
					break;
				case "Drones":
					cost = 45000;
					text = "Drone Bay";
					break;
				case "AV":
					cost = 60000;
					text = "Attack Vehicle Fleet";
					break;
				case "TV":
					cost = 60000;
					text = "Transport Vehicle Fleet";
					break;
				case "PGT":
					cost = 60000;
					text = "Prototype Goliath Tank";
					break;
				case "AA":
					cost = 70000;
					text = "Attack Aircraft Fleet";
					break;
				case "TA":
					cost = 70000;
					text = "Transport Aircraft Fleet";
					break;
				case "SpacePlane":
					cost = 250000;
					text = "Spaceplane";
					break;
				case "GunS":
					cost = 350000;
					text = "Gunship";
					break;
				case "Satellite":
					cost = 525000;
					break;
				case "GiantRobot":
					cost = 550000;
					text = 'Giant Robot';
					break;
				case "MissileSilo":
					cost = 565000;
					text = 'Cruise Missile';
					break;
				case "AircraftCarrier":
					cost = 650000;
					text = 'Aircraft Carrier';
					break;
				case "Sub":
					cost = 700000;
					text = 'Submarine';
					break;
				case "HAT":
					cost = 665000;
					text = 'Amphibious Transport';
					break;
			}

			if (V.SF.Squad[unit] < max) {
				const price = getPrice(cost);
				const multiplier = [1, 2, 3, 4, 5];
				if (V.cash >= price) {
					node.append(`Upgrade ${text}, one level costs`);
					App.UI.DOM.appendNewElement("span", node, ` ${cashFormat(price)}. `, ["cash", "dec"]);
					for (const number of multiplier) {
						if (V.cash >= price * number && (max - V.SF.Squad[unit] >= number)) {
							App.UI.DOM.appendNewElement("span", node, App.UI.DOM.link(` ,x${number}`, () => {
								V.SF.Upgrade = 1;
								V.SF.Squad[unit] += number;
								V.SF.CreditsInvested += price * number;
								cashX(forceNeg(price * number), "specialForcesCap");
								App.UI.reload();
							}));
						}
					}
				} else {
					App.UI.DOM.appendNewElement("span", node, `Cannot afford to upgrade the ${text}.`, "note");
				}
				$(node).wiki(App.Mods.SF.progress(V.SF.Squad[unit]));
			} else if (["PGT", "SpacePlane", "GunS", "Satellite", "GiantRobot", "MissileSilo", "AircraftCarrier", "Sub", "HAT"].includes(unit) && V.SF.Squad[unit] === max && V.PC.skill.warfare < 75) {
				App.UI.DOM.appendNewElement("span", node, "Your warfare skill is not high enough unlock the next upgrade.", "note");
				$(node).wiki(App.Mods.SF.progress(V.SF.Squad[unit]));
			} else if (V.SF.Squad[unit] === max && max > 0) {
				fullyUpgraded.push(text);
			}
			return node;
			/**
			 * @param {number} cost
			 * @returns {number}
			 */
			function getPrice(cost) {
				const upgradeDiv = 1.65;
				const S = V.SF.Squad;
				let value = (cost / upgradeDiv) * App.Mods.SF.env() * Math.pow(1.15, V.SF.Squad[unit] + 1);
				if ([S.AircraftCarrier, S.Drones, S.GiantRobot, S.GunS, S.MissileSilo, S.Satellite, S.SpacePlane, S.Sub].includes(unit)) {
					value *= V.HackingSkillMultiplier;
				}
				return Math.ceil(value);
			}
		}
	}
})();
/**
 * @param {number} x
 * @param {number} [max]
 * @returns {string}
 */
App.Mods.SF.progress = function(x, max) {
	let out = `⏐`;
	let z;
	let i;
	if (max === undefined) {
		x = Math.clamp(x, 0, 10);
		if (App.Mods.SF.unlocked.secondTier() === false) {
			z = 5 - x;
			for (i = 0; i < x; i++) {
				out += `█⏐`;
			}
			for (i = 0; i < z; i++) {
				out += `<span style='opacity: 0;'>█</span>⏐`;
			}
			for (i = 0; i < 5; i++) {
				out += `░⏐`;
			}
		} else {
			z = 10 - x;
			for (i = 0; i < x; i++) {
				out += `█⏐`;
			}
			for (i = 0; i < z; i++) {
				out += `<span style='opacity: 0;'>█</span>⏐`;
			}
		}
	} else {
		x = Math.clamp(x, 0, max);
		x = Math.floor(10 * x / max);
		z = 10 - x;
		for (i = 0; i < x; i++) {
			out += `█⏐`;
		}
		for (i = 0; i < z; i++) {
			out += `<span style='opacity: 0;'>█</span>⏐`;
		}
	}
	return ` ${out} `;
};
