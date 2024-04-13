// cSpell:ignore Musc

/**
 * A categorizer is used to "slice" a value range into distinct categories in an efficient manner.
 *
 * If the values are objects their property named 'value' will be set to whatever
 * the value used for the choice was. This is important for getters, where it can be accessed
 * via this.value.
 *
 * @example Plain if
 * let r = "";
 * if (slave.muscles > 95) {
 *     r = "Musc++";
 * } else if (slave.muscles > 30) {
 *     r = "Musc+";
 * } else if (slave.muscles > 5) {
 *     r = "Toned";
 * } else if (slave.muscles > -6) {
 * } elseif (slave.muscles > -31) {
 *     r = "weak";
 * } else if (slave.muscles > -96) {
 *     r = "weak+";
 * } else {
 * 	   r = "weak++";
 * }
 *
 * @example As a categorizer
 * // Can be defined globally.
 * const muscleCat = new Categorizer([96, "Musc++"], [31, "Musc+"], [6, "Toned"], [-5, ""], [-30, "weak"], [-95, "weak+"], [-Infinity, "weak++"])
 *
 * r = muscleCat.cat(slave.muscles);
 */
globalThis.Categorizer = class {
	/**
	 * @param  {...Array} pairs
	 */
	constructor(...pairs) {
		this.cats = Array.prototype.slice.call(pairs)
			.filter(function(e, i, a) {
				return Array.isArray(e) && e.length === 2 && typeof e[0] === "number" && !isNaN(e[0]) &&
					a.findIndex(function(val) {
						return e[0] === val[0];
					}) === i; /* uniqueness test */
			})
			.sort(function(a, b) {
				return b[0] - a[0]; /* reverse sort */
			});
	}

	cat(val, def) {
		let result = def;
		if (typeof val === "number" && !isNaN(val)) {
			let foundCat = this.cats.find(function(e) {
				return val >= e[0];
			});
			if (foundCat) {
				result = foundCat[1];
			}
		}
		// Record the value for the result's getter, if it is an object
		// and doesn't have the property yet
		if (typeof result === "object" && !isNaN(result)) {
			result.value = val;
		}
		return result;
	}
};

/**
 * Converts an Iterable of strings into a sentence parted by commas.
 * For an empty Iterable will return an empty string.
 * @param {Iterable<string>} iterable
 * @param {string} [delimiter=", "]
 * @param {string} [lastDelimiter=" and "]
 * @returns {string}
 *
 * @example array
 * toSentence(["apple", "banana", "carrot"]);
 * // returns "apple, banana and carrot"
 *
 * @example Set
 * toSentence(new Set(["apple", "banana"]), ", ", " or ");
 * // returns "apple or banana"
 */
globalThis.toSentence = function(iterable, delimiter = ", ", lastDelimiter = " and ") {
	const itr = iterable[Symbol.iterator]();
	let output = ``;
	let result = itr.next();
	if (!result.done) {
		// output first element
		output += result.value;
		result = itr.next();
		if (!result.done) {
			// output elements (1...n-1)
			let previous = result.value;
			result = itr.next();
			while (!result.done) {
				output += delimiter + previous;
				previous = result.value;
				result = itr.next();
			}
			// output final element
			output += lastDelimiter + previous;
		}
	}
	return output;
};

App.Utils.alphabetizeIterable = function(iterable) {
	const compare = function(a, b) {
		let aTitle = a.toLowerCase();
		let bTitle = b.toLowerCase();

		aTitle = App.Utils.removeArticles(aTitle);
		bTitle = App.Utils.removeArticles(bTitle);

		if (aTitle > bTitle) {
			return 1;
		}
		if (aTitle < bTitle) {
			return -1;
		}
		return 0;
	};

	const clonedArray = (Array.from(iterable));
	return clonedArray.sort(compare);
};

/**
 * @param {string} str
 * @returns {string}
 */
App.Utils.removeArticles = function(str) {
	const words = str.split(" ");
	if (words.length <= 1) {
		return str;
	}
	if (words[0] === "a" || words[0] === "the" || words[0] === "an") {
		return words.splice(1).join(" ");
	}
	return str;
};

/**
 * @param {FC.Zeroable<FC.Race>} badRace
 * @returns {Array<FC.Race>}
 */
App.Utils.getRaceArrayWithoutParamRace = function(badRace) {
	return Array.from(App.Data.misc.filterRaces.keys()).filter(race => race !== badRace);
};

/** Narrows the type of a HumanState object representing the player into a PlayerState object, or returns null if it's not the player
 * @param {FC.HumanState} human
 * @returns {App.Entity.PlayerState}
 */
globalThis.asPlayer = function(human) {
	if (!human || human.ID !== -1) {
		return null;
	}
	return /** @type {App.Entity.PlayerState} */(human);
};

/** Narrows the type of a HumanState object representing a slave into a SlaveState object, or returns null if it's not a slave
 * @param {FC.HumanState} human
 * @returns {App.Entity.SlaveState}
 */
globalThis.asSlave = function(human) {
	if (!human || human.ID === -1) {
		return null;
	}
	return /** @type {App.Entity.SlaveState} */(human);
};

/**
 * @param {string} englishWord
 * @returns {string}
 */
App.Utils.translate = function(englishWord) {
	return App.Data.dictionary[englishWord] && App.Data.dictionary[englishWord].hasOwnProperty(V.language)
		? App.Data.dictionary[englishWord][V.language]
		: englishWord;
};

/**
 * Calculates the player's net worth.
 *
 * @returns {number}
 */
App.Utils.totalNetWorth = function() {
	const arcology = V.arcologies[0];
	const assistant = V.assistant.power;
	const menialPrice = menialSlaveCost();
	let total = 0;

	total += V.cash;

	for (const slave of V.slaves) {
		total += slaveCost(slave);
	}

	total += V.menials * menialPrice;
	total += V.menialBioreactors * menialPrice;
	total += V.bioreactorsXY * menialPrice;
	total += V.bioreactorsXX * menialPrice;
	total += V.bioreactorsHerm * menialPrice;

	total += V.building.findCells(cell => !(cell instanceof App.Arcology.Cell.Filler) && cell.owner === 1).length * 1000 * Math.trunc(arcology.prosperity * (1 + (arcology.demandFactor / 100)));

	for (let i = 1; i < V.arcologies.length; i++) {
		const arcology = V.arcologies[i];

		total += (500 * Math.trunc(arcology.prosperity * (1 + (arcology.demandFactor / 100))) / 100) * arcology.PCminority;
	}

	if (assistant > 0) {
		if (assistant > 1) {
			total += 20000;
		}
		if (assistant > 2) {
			total += 35000;
		}
		if (assistant > 3) {
			total += 50000;
		}
	}

	if (V.arcologyUpgrade.drones) {
		total += 5000;
	}
	if (V.arcologyUpgrade.hydro) {
		total += 10000;
	}
	if (V.arcologyUpgrade.apron) {
		total += 20000;
	}
	if (V.arcologyUpgrade.grid) {
		total += 50000;
	}

	if (V.weatherCladding === 1) {
		total += 50000;
	} else if (V.weatherCladding === 2) {
		total += 3500000;
	}

	total += Object.values(App.Entity.facilities)
		.filter(f => f.established)
		.reduce((acc, cur) => acc + cur.value, 0);

	total += Math.trunc(V.mods.food.amount * V.mods.food.cost);

	total += App.Mods.SF.totalNetWorth();
	total -= App.Mods.SecExp.upkeep.cost();

	if (V.loans.length > 0) {
		V.loans.forEach(loan => total -= loan.full);
	}

	return total;
};

/** Calculate the target number of slaves to recruit when the recruiter is set to fill facilities */
App.Utils.recruiterFacilitySpace = function() {
	/* Note on target sum: HG and Recruiter are the initial 2 counted (no facility req'd), while HGSuite counts the HG's girl, other facilities count associated leader */
	let idleTarget = (2 + V.brothel + V.club + V.arcade + V.dairy + V.servantsQuarters + V.masterSuite);
	if (V.HGSuite) {
		idleTarget++;
	}
	if (V.dojo) {
		idleTarget++;
	}
	if (V.brothel) {
		idleTarget++;
	}
	if (V.club) {
		idleTarget++;
	}
	if (V.dairy && V.dairyRestraintsSetting < 2) {
		idleTarget++;
	}
	if (V.farmyard) {
		idleTarget++;
	}
	if (V.servantsQuarters) {
		idleTarget++;
	}
	if (V.masterSuite) {
		idleTarget++;
	}
	if (V.schoolroom) {
		idleTarget++;
	}
	if (V.spa) {
		idleTarget++;
	}
	if (V.nursery) {
		idleTarget++;
	}
	if (V.clinic) {
		idleTarget++;
	}
	if (V.cellblock) {
		idleTarget++;
	}
	return Math.max(idleTarget, 20);
};

globalThis.generalRefreshment = function name() {
	if (V.PC.refreshmentType === 1) {
		return `glass of ${V.PC.refreshment}`;
	} else if (V.PC.refreshmentType === 2) {
		return `plate of ${V.PC.refreshment}`;
	} else if (V.PC.refreshmentType === 3) {
		return `line of ${V.PC.refreshment}`;
	} else if (V.PC.refreshmentType === 4) {
		return `syringe of ${V.PC.refreshment}`;
	} else if (V.PC.refreshmentType === 5) {
		return `pill of ${V.PC.refreshment}`;
	} else if (V.PC.refreshmentType === 6) {
		return `tab of ${V.PC.refreshment}`;
	} else { // 0 and default
		return `${V.PC.refreshment}`;
	}
};

/**
 * @param {string} name
 * @param {FC.TrinketData} [object]
 */
globalThis.addTrinket = function(name, object) {
	if (object) {
		if (!V.trinkets.get(name)) {
			V.trinkets.set(name, []);
		}
		V.trinkets.get(name).push(object);
	} else {
		if (!V.trinkets.get(name)) {
			V.trinkets.set(name, 0);
		}
		V.trinkets.set(name, V.trinkets.get(name) + 1);
	}
};

/**
 * Creates range object
 * @param {number} minValue
 * @param {number} maxValue
 * @returns {FC.NumericRange}
 */
App.Utils.makeRange = function(minValue, maxValue) {
	return {
		min: minValue, max: maxValue
	};
};

/**
 * Compares value to a range
 * @param {number} value
 * @param {FC.NumericRange} [range]
 * @returns {number} The value which when added to `value` brings it within the range [min:max]
 * `positive` when value is less than range min, `0` when the value is whithin the range or
 * the range is `null`, and `negative` when value is greater than range max
 */
App.Utils.distanceToRange = function(value, range) {
	if (!range) {
		return 0;
	}
	return value < range.min ? range.min - value : (value > range.max ? range.max - value : 0);
};

/**
 * @typedef {object} weightedObject
 * @property {number} weight
 */

/**
 * Gives back a random object from a given array, based on the weights of the objects.
 * Negative weights are not allowed and will break.
 *
 * @template {weightedObject} T
 * @param {Array<T>} values
 * @returns {T}
 */
globalThis.weightedRandom = function(values) {
	const sum = values.reduce((acc, cur) => acc + cur.weight, 0);
	let r = Math.random() * sum;
	for (const item of values) {
		if (r < item.weight) {
			return item;
		}
		r -= item.weight;
	}
	// Array was empty or all weights were 0
	return null;
};

/**
 * @typedef {object} geneToGenderOptions
 * @property {boolean} keepKaryotype if true then we will keep the karyotype. `XX` = `Female (XX)
 * @property {boolean} lowercase if true then we will make the output lower case. the karyotype is exempt from this.
 */

/**
 * Takes a karyotype (XX, XY, X, etc) and converts it to a gender (Female, Male, Turner Syndrome Female, etc)
 * @param {FC.GenderGenes} karyotype the karyotype to convert
 * @param {geneToGenderOptions} [options] {keepKaryotype: false, lowercase: true}
 * @returns {string} the gender that matches the karyotype
 */
globalThis.geneToGender = (karyotype, options = {
	keepKaryotype: false,
	lowercase: true,
}) => {
	/** @type {string} */
	let gender = {
		XX: 'Female',
		XY: 'Male',
		X: 'Turner Syndrome Female',
		X0: 'Turner Syndrome Female',
		XYY: 'XYY Syndrome Male',
		XXY: 'Klinefelter Syndrome Male',
		XXX: 'triple X Syndrome Female'
	}[String(karyotype).toUpperCase()] || `Unknown Gender: ${String(karyotype)}`;
	if (options.lowercase === true) {
		gender = gender.toLowerCase();
	}
	if (options.keepKaryotype === true && !gender.toLowerCase().startsWith("unknown gender")) {
		gender = `${gender} (${String(karyotype).toUpperCase()})`;
	}
	return gender;
};
