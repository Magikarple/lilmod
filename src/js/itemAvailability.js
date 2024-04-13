globalThis.isItemAccessible = (function() {
	return {
		array: array,
		entry: entry,
	};

	/**
	 * Checks whether an item is accessible
	 * @param {string} string Name of wearable item
	 * @param {string} [category="clothes"] that item is in clothing, collar, etc
	 * @param {App.Entity.SlaveState} [slave]
	 * @returns {boolean|string} Returns true if item is accessible, and false if it is not. If the slave param is set, it may sometimes return a string instead of false, explaining why the item can't be used with that slave.
	 */
	function entry(string, category = "clothes", slave) {
		if (V.cheatMode === 1) {
			return true;
		}
		const selectedDB = App.Data.slaveWear[category] || App.Data[category];
		const item = selectedDB.get(string);
		if (!item) {
			console.log(`${string} is not a registered piece of clothing! Check App.Data.slaveWear.${category}`);
			return false; /* couldn't be found */
		}
		return isAvailable(item, category, slave);
	}

	/**
	 * Returns array of wearable clothing in format [name, value], basically player facing / game data.
	 * @param {Map} map Map to look in (such as App.Data.clothes)
	 * @param {(arg0: any) => any} [filter] The callback function to run.
	 * @returns {Array}
	 */
	function array(map, filter) {
		const array = [];
		for (const [key, obj] of map) {
			if (typeof filter === "function" && !filter(obj)) {
				continue;
			}
			if (V.cheatMode || isAvailable(obj)) {
				const name = (obj.fs && obj.fs.unlocks) ? `${obj.name} (FS)` : obj.name;
				array.push([name, key]);
			}
		}
		return array;
	}

	/**
	 * @param {object} item
	 * @param {string} [category="clothes"] that item is in clothing, collar, etc
	 * @param {App.Entity.SlaveState} [slave]
	 * @returns {boolean|string} Returns true if item is accessible, and false if it is not. If the slave param is set, it may sometimes return a string instead of false, explaining why the item can't be used with that slave.
	 */
	function isAvailable(item, category = "clothes", slave) {
		let slaveResults;
		if (slave) {
			slaveResults = isAvailableForSlave(item, category, slave);
			if (slaveResults === false) {
				return slaveResults;
			}
		}
		if (!(item.hasOwnProperty("fs") && item.fs.hasOwnProperty("unlocks")) && !(item.hasOwnProperty("requirements"))) {
			// No restriction, this clothing item is available to everyone
			return true;
		}
		if (item.hasOwnProperty("requirements")) {
			if (item.requirements === true) {
				return true;
			}
		}
		if (item.hasOwnProperty("fs") && item.fs.hasOwnProperty("unlocks")) {
			if (V.arcologies[0][item.fs.unlocks] > 0) {
				return true;
			}
		}
		if (slaveResults && slaveResults !== true) { // If we still haven't returned true or false, then we display why this particular slave can't use the item.
			return slaveResults;
		}
		return false;
	}

	/**
	 * @param {object} item
	 * @param {string} [category="clothes"] that item is in clothing, collar, etc
	 * @param {App.Entity.SlaveState} [slave]
	 * @returns {boolean|string} Returns true if item is accessible, and false if it is not. If the slave param is set, it may sometimes return a string instead of false, explaining why the item can't be used with that slave.
	 */
	function isAvailableForSlave(item, category, slave) {
		switch (category) {
			case "clothes":
				break;
			case "collar":
				break;
			case "bellyAccessory": {
				switch (item.value) {
					case "a support band": {
						if (slave.belly > 10000) {
							return true;
						} else {
							return `Slave belly too small for this`;
						}
					}
					case "a small empathy belly":
					case "a medium empathy belly":
					case "a large empathy belly":
					case "a huge empathy belly": {
						if (slave.belly < 1500 && slave.weight < 130) {
							return true;
						} else {
							return `Slave belly too big for this`;
						}
					}
					default:
						return true;
				}
			}
			case "buttplug": {
				switch (item.value) {
					case "huge plug": {
						if (slave.anus < 2) {
							return `Slave's anus is too small for this right now`;
						} else {
							return true;
						}
					}
					case "long plug":
					case "long, large plug": {
						if (!(slave.breedingMark !== 1 || V.propOutcome === 0 || V.eugenicsFullControl === 1 || !FutureSocieties.isActive('FSRestart'))) {
							return "Elites frown on this";
						} else {
							return true;
						}
					}
					case "long, huge plug": {
						if (slave.anus < 2) {
							return `Slave's anus is too small for this right now`;
						} else if (!(slave.breedingMark !== 1 || V.propOutcome === 0 || V.eugenicsFullControl === 1 || !FutureSocieties.isActive('FSRestart'))) {
							return "Elites frown on this";
						} else {
							return true;
						}
					}
					default:
						return true;
				}
			}
			case "buttplugAttachment":
				break;
			case "vaginalAccessory": {
				if (slave.vagina < 0) {
					return false;
				}
				switch (item.value) {
					case "huge dildo": {
						if (slave.vagina < 2) {
							return `Slave's vagina is too small for this right now`;
						} else {
							return true;
						}
					}
					case "long dildo":
					case "long, large dildo": {
						if (!(slave.breedingMark !== 1 || V.propOutcome === 0 || V.eugenicsFullControl === 1 || !FutureSocieties.isActive('FSRestart'))) {
							return "Elites frown on this";
						} else {
							return true;
						}
					}
					case "long, huge dildo": {
						if (slave.vagina < 2) {
							return `Slave's vagina is too small for this right now`;
						} else if (!(slave.breedingMark !== 1 || V.propOutcome === 0 || V.eugenicsFullControl === 1 || !FutureSocieties.isActive('FSRestart'))) {
							return "Elites frown on this";
						} else {
							return true;
						}
					}
					default:
						return true;
				}
			}
			case "vaginalAttachment": {
				if (slave.vagina < 0) {
					return false;
				}
				switch (item.value) {
					case "vibrator":
						if (slave.vaginalAccessory === "none") {
							return "No vaginal accessory to attach it to";
						} else if (dildoWidth(slave) === 0) {
							return "Vaginal accessory is too small";
						} else if (dildoVibeLevel(slave)) {
							return "Vaginal accessory already vibrates";
						} else {
							return true;
						}
				}
				break;
			}
			case "dickAccessory":
				return (slave.dick >= 1);
			case "shoes":
				break;
			case "chastity": {
				switch (item.value) {
					case "chastity belt":
					case "combined chastity belt":
						return (slave.vagina > -1);
					case "chastity cage":
					case "combined chastity cage":
						return (slave.dick > 0);
					case "genital chastity":
					case "full chastity":
						return (slave.vagina > -1 && slave.dick > 0);
					case "choose own chastity":
						return (slave.choosesOwnChastity !== 1 && slave.devotion > 20 && slave.trust > 0);
					case "revoke choosing own chastity":
						return (slave.choosesOwnChastity > 0);
					default:
						return true;
				}
			}
			default:
				break;
		}
		return true;
	}
})();

/**
 * @param {App.Entity.SlaveState} slave
 * @param {string} prosthetic
 * @returns {boolean}
 */
globalThis.isProstheticAvailable = function(slave, prosthetic) {
	return slave.readyProsthetics.findIndex(function(p) { return p.id === prosthetic; }) !== -1;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {string} prosthetic
 */
globalThis.addProsthetic = function(slave, prosthetic) {
	if (!isProstheticAvailable(slave, prosthetic)) {
		let limb = prostheticToLimb(prosthetic);
		if (limb > 0) {
			let p = {
				id: prosthetic,
				arm: {left: new App.Entity.ArmState(), right: new App.Entity.ArmState()},
				leg: {left: new App.Entity.LegState(), right: new App.Entity.LegState()}
			};
			p.arm.left.type = limb;
			p.arm.right.type = limb;
			p.leg.left.type = limb;
			p.leg.right.type = limb;
			slave.readyProsthetics.push(p);
		} else {
			slave.readyProsthetics.push({id: prosthetic});
		}
	}
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {string} prosthetic
 * @returns {{}}
 */
globalThis.findProsthetic = function(slave, prosthetic) {
	return slave.readyProsthetics.find(p => p.id === prosthetic);
};

/**
 * @param {string} prosthetic
 * @returns {FC.LimbType}
 */
globalThis.prostheticToLimb = function(prosthetic) {
	switch (prosthetic) {
		case "basicL":
			return 2;
		case "sexL":
			return 3;
		case "beautyL":
			return 4;
		case "combatL":
			return 5;
		case "cyberneticL":
			return 6;
		case "felidaeL":
			return 7;
		case "canidaeL":
			return 8;
		case "felidaeCL":
			return 9;
		case "canidaeCL":
			return 10;
		default:
			return 0;
	}
};

/**
 *
 * @param {number} limb
 * @returns {string}
 */
globalThis.limbToProsthetic = function(limb) {
	switch (limb) {
		case 2:
			return "basicL";
		case 3:
			return "sexL";
		case 4:
			return "beautyL";
		case 5:
			return "combatL";
		case 6:
			return "cyberneticL";
		case 7:
			return "felidaeL";
		case 8:
			return "canidaeL";
		case 9:
			return "felidaeCL";
		case 10:
			return "canidaeCL";
		default:
			return "";
	}
};

/**
 *
 * @param {FC.FutureSociety} FS
 * @returns {Array}
 */
globalThis.clothingLovedByAnFS = function(FS) {
	const clothingOptions = [];
	for (const [key, value] of App.Data.clothes) {
		if (value.fs && value.fs.loves && value.fs.loves.has(FS)) {
			clothingOptions.push(key);
		}
	}
	return clothingOptions;
};
