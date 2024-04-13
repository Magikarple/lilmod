/**
 * Converts numbers to text according to the player's settings.
 * @param {number} x
 * @param {boolean} [printText=false] Whether to return the text form regardless of the user's settings. Mainly used for events.
 * @returns {string} Returns the given value in string form as either an integer (e.g. "10") or word form (e.g."ten").
 */
globalThis.num = function(x, printText = false) {
	const max = V.showNumbersMax;

	const ONE_TO_NINETEEN = [
		"one", "two", "three", "four", "five",
		"six", "seven", "eight", "nine", "ten",
		"eleven", "twelve", "thirteen", "fourteen", "fifteen",
		"sixteen", "seventeen", "eighteen", "nineteen",
	];

	const TENS = [
		"ten", "twenty", "thirty", "forty", "fifty",
		"sixty", "seventy", "eighty", "ninety",
	];

	const SCALES = ["thousand", "million", "billion", "trillion", "quadrillion", "quintillion", "sextillion",
		"septillion", "octillion", "nonillion", "decillion", "undecillion", "duodecillion"];

	/**
	 * helper function for use with Array.filter
	 * @param {any} item
	 * @returns {boolean}
	 */
	function isTruthy(item) {
		return !!item;
	}

	/**
	 * convert a number into "chunks" of 0-999
	 * @param {number} number
	 * @returns {number[]}
	 */
	function chunk(number) {
		const thousands = [];

		while (number > 0) {
			thousands.push(number % 1000);
			number = Math.floor(number / 1000);
		}

		return thousands;
	}

	/**
	 * translate a number from 1-999 into English
	 * @param {number} number
	 * @returns {string}
	 */
	function inEnglish(number) {
		let hundreds;
		let tens;
		let ones;
		const words = [];

		if (number === 0) {
			return "zero";
		}

		if (number < 20) {
			return ONE_TO_NINETEEN[number - 1]; // may be undefined
		}

		if (number < 100) {
			ones = number % 10;
			tens = number / 10 | 0; // equivalent to Math.floor(number / 10)

			words.push(TENS[tens - 1]);

			if (number % 10 !== 0) {
				words.push(inEnglish(ones));
			}

			return words.filter(isTruthy).join("-");
		}

		hundreds = number / 100 | 0;
		words.push(inEnglish(hundreds));
		words.push("hundred");
		words.push(inEnglish(number % 100));

		return words.filter(isTruthy).join(" ");
	}

	if (printText) {
		return inEnglish(x);
	}

	/**
	 * append the word for a scale. Made for use with Array.map
	 * @param {string} chunk
	 * @param {number} exp
	 * @returns {string}
	 */
	function appendScale(chunk, exp) {
		let scale;
		if (!chunk) {
			return null;
		}
		scale = SCALES[exp - 1];
		return [chunk, scale].filter(isTruthy).join(" ");
	}

	if (V.showNumbers === 2) {
		return commaNum(x);
	} else {
		if (x === 0) {
			return "zero";
		}

		if (V.showNumbers === 1 && Math.abs(x) > max) {
			return commaNum(x);
		}

		let numberAsString = chunk(Math.abs(x))
			.map(inEnglish)
			.map(appendScale)
			.filter(isTruthy)
			.reverse()
			.join(" ");

		if (x > 0) {
			return numberAsString;
		} else {
			return `negative ${numberAsString}`;
		}
	}
};

/**
 * Converts the given string to the plural form of the given string. Mainly used as a helper function.
 * @param {string|{single: string, plural: string}} single The singular form.
 * @param {string} [plural] The plural form (e.g. "oxen" for "ox"). Returns the singular form with an "s" if one is not given.
 * @returns {string} Returns the plural form of a given number of items.
 */
globalThis.asPlural = function(single, plural = null) {
	if (typeof single !== 'string') {
		let asObj = single;
		single = asObj.single;
		plural = asObj.plural;
	}
	if (!plural) {
		plural = single + "s";
	}
	return plural;
};

/**
 * Converts the given string to the singular form of the given string. Mainly used as a helper function.
 * @param {string|{single: string}} single The singular form.
 * @returns {string} Returns the singular form of a given number of items.
 */
globalThis.asSingular = function(single) {
	if (typeof single !== 'string') {
		let asObj = single;
		single = asObj.single;
	}
	return single;
};

/**
 * Converts the given number to a string in either singular or plural form.
 * @param {number} number The number to format.
 * @param {string} single The singular form.
 * @param {string} [plural] The plural form (e.g. "oxen" for "ox"). Returns the singular form with an "s" if one is not given.
 * @returns {string} Returns "a _", "less than one _", or the number formatted as either words or numbers, depending on the users' settings.
 */
globalThis.numberWithPlural = function(number, single, plural) {
	if (number === 0) {
		return "no " + asPlural(single, plural);
	} else if (number === 1) {
		return addA(asSingular(single));
	} else if (number.isBetween(0, 1)) {
		return "less than one " + asSingular(single);
	} else {
		return num(number) + " " + asPlural(single, plural);
	}
};

/**
 * Converts the given number to a string in either singular or plural form.
 * @param {number} number The number to format.
 * @param {string} single The singular form.
 * @param {string} [plural] The plural form (e.g. "oxen" for "ox"). Returns the singular form with an "s" if one is not given.
 * @returns {string} Returns "no _", "one _", "less than one _", or the number formatted as either words or numbers, depending on the user's settings.
 */
globalThis.numberWithPluralOne = function(number, single, plural) {
	if (number === 1) {
		return "one " + asSingular(single);
	} else {
		return numberWithPlural(number, single, plural);
	}
};

/**
 * Converts the given number to a string in either singular or plural form.
 * @param {number} number The number to format.
 * @param {string} single The singular form.
 * @param {string} [plural] The plural form (e.g. "oxen" for "ox").
 * @returns {string} Returns "less than one _" instead of "no _" when `number` is 0.
 */
globalThis.numberWithPluralNonZero = function(number, single, plural) {
	if (number === 0) {
		number = 0.1;
	}
	return numberWithPlural(number, single, plural);
};

/**
 * Converts the given number to a string in either singular or plural form.
 * @param {number} number The number to format.
 * @param {string} single The singular form.
 * @param {string} [plural] The plural form (e.g. "oxen" for "ox").
 * @returns {string} Returns the singular form if `number` is greater than 0 and less than or equal to 1. Otherwise returns the plural form of the number.
 */
globalThis.onlyPlural = function(number, single, plural) {
	if (number > 0 && number <= 1) {
		return asSingular(single);
	}
	return asPlural(single, plural);
};

/**
 * Converts the given number to a string with or without commas, based on the user's settings.
 * @param {number} s The number to format.
 * @returns {string} Returns the number either with or without comma dividers, depending on the user's settings.
 */
globalThis.commaNum = function(s) {
	// Separated from num because some places in code (like long lists, tables) should never have numbers spelled out, but still benefit from commas
	if (!s) {
		return "0";
	}
	switch (V.formatNumbers) {
		case 1:
			return s.toLocaleString('en-US');
		case 2:
			return s.toLocaleString();
		default:
			return s.toString();
	}
};

globalThis.getDecimalSeparator = function() {
	let locale = 'en-US';
	if (V.formatNumbers === 2) {
		// get default locale https://stackoverflow.com/q/55385129
		locale = new Intl.NumberFormat().resolvedOptions().locale;
	}
	const numberWithDecimalSeparator = 1.1;
	// Attempt to get the decimal separator https://stackoverflow.com/q/33159354
	return Intl.NumberFormat(locale)
		// TS doesn't know this, but all major browsers support it since 2018:
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/formatToParts#browser_compatibility
		// @ts-ignore
		.formatToParts(numberWithDecimalSeparator)
		.find(part => part.type === 'decimal')
		.value;
};

/**
 * Converts the given number in weeks to a string in a years / months / weeks format.
 * @param {number} weeks The number of weeks to format.
 * @returns {string} Returns "_ years _ months _ weeks".
 */
globalThis.years = function(weeks) {
	let years = 0;
	let quarters = 0; // needed for calc, not user facing
	let months = 0;
	let array = [];

	// A year is always 52 weeks
	// that could be 13 months, but lets say 4 quarters each getting an extra week (13 weeks)

	// Find years
	years = Math.trunc(weeks / 52);

	if (years >= 1) { // Is there at least 1 year
		weeks = weeks - (years * 52); // Find leftover weeks
	}
	if (weeks && weeks / 13 >= 1) { // Is there at least 1 quarter
		quarters = Math.trunc(weeks / 13); // How many quarters?
		weeks = weeks - (quarters * 13); // A quarter contains 13 weeks, how many extra weeks do we have?
	}
	if (weeks && weeks / 4 >= 1) { // Is there at least 1 month
		months = Math.trunc(weeks / 4); // How many months?
		if (months === 3) { // Almost a quarter of a year
			months--; // Quarters have 13 weeks though, so let's be sure the extra is in weeks. Otherwise 51 will return "12 months" instead of "11 months and 4 weeks."
		}
		weeks = weeks - (months * 4); // A month contains 4 weeks, how many extra weeks do we have?
	}

	// So we have years, quarters, months, and weeks.

	// Quarters are useless so:

	months += quarters * 3; // Each quarter has three months.

	if (years) {
		array.push(numberWithPluralOne(years, 'year'));
	}

	if (months) {
		array.push(numberWithPluralOne(months, 'month'));
	}

	if (weeks) {
		array.push(numberWithPluralOne(weeks, 'week'));
	}

	return toSentence(array);
};

/**
 * Converts the given number in weeks to a new Date object.
 * @param {number} [weeks] The week to use. Uses the current week if one is not given.
 * @param {number} [bonusDay] A specific day of the week to represent. 0-indexed.
 * @returns {Date} Returns a new Date object.
 */
globalThis.asDate = function(weeks = null, bonusDay = 0) {
	if (weeks === null) {
		weeks = V.week;
	}
	let d = new Date(2037, 0, 12);
	d.setDate(d.getDate() + weeks * 7 + bonusDay);
	return d;
};

/**
 * Formats the given number in weeks as a string.
 * @param {number} [weeks] The week to use. Uses the current week if one is not given.
 * @param {number} [bonusDay] A specific day of the week to represent. 0-indexed.
 * @returns {string} Returns a string of the number formatted as a date based on the user's locale settings.
 */
globalThis.asDateString = function(weeks = null, bonusDay = 0) {
	return asDate(weeks, bonusDay).toLocaleString(undefined, {year: 'numeric', month: 'long', day: 'numeric'});
};

/**
 * Formats the given number as currency.
 * @param {number} s The number to format.
 * @returns {string} Returns a string of the number formatted as a currency.
 */
globalThis.cashFormat = function(s = 0) {
	if (s < 0) {
		return `-¤${commaNum(Math.abs(s))}`;
	}
	return `¤${commaNum(s)}`;
};

/**
 * Formats the given number as currency.
 *
 * Positive values returns in green, negative values return in red, unless the invert parameter is set.
 * @param {number} s The number to format.
 * @param {boolean} invert Whether or not to invert the numbers (i.e. display positive numbers in red, and negative numbers in green).
 * @returns {string}
 */
globalThis.cashFormatColor = function(s = 0, invert = false) {
	if ((invert && s > 0) || s < 0) {
		// Display in red (WITHOUT a negative sign) if the value is negative, unless invert is true
		return `<span class='cash dec'>${cashFormat(s)}</span>`;
	} else if (s === 0) {
		// White for exactly zero
		return `<span>${cashFormat(s)}</span>`;
	} else {
		// Yellow for positive
		return `<span class='cash inc'>${cashFormat(s)}</span>`;
	}
};

/**
 * Formats the given number as reputation.
 *
 * @param {number} s The number to format.
 * @param {boolean} [fuzzy] Only show an approximate value.
 * @returns {string} Returns a string of the number formatted as a currency.
 */
globalThis.repFormat = function(s, fuzzy = true) {
	if (!fuzzy || V.cheatMode === 1 || V.debugMode === 1) {
		return `${commaNum(Math.round(s * 100) / 100)}`;
	} else {
		// In order to calculate just how much any one category matters, so we can show a "fuzzy" symbolic value to the
		// player, we need to know how "busy" reputation was this week. To calculate this, I ADD income to expenses.
		// Why? 100 - 100 and 10000 - 10000 BOTH are 0, but a +50 event matters a lot more in the first case than the
		// second. I exclude overflow and curving from the calculation because it's not a "real" expense for our
		// purposes, and divide by half just to make percentages a bit easier.
		// Curving is recorded on the income to keep the numbers correct.
		const cleanGain = V.lastWeeksRepIncome.Total + V.lastWeeksRepIncome.curve;
		const cleanLoss = V.lastWeeksRepExpenses.Total + V.lastWeeksRepExpenses.overflow;
		const movement = cleanGain - cleanLoss;
		const weight = s / Math.abs(movement / 2);
		// \u2212 = Mathematical minus sign
		let r;
		if (weight > 0.60) {
			r = `+++++`;
		} else if (weight > 0.45) {
			r = `++++`;
		} else if (weight > 0.30) {
			r = `+++`;
		} else if (weight > 0.15) {
			r = `++`;
		} else if (weight > 0.0) {
			r = `+`;
		} else if (weight === 0) {
			r = "0";
		} else if (weight < -0.60) {
			r = "\u2212\u2212\u2212\u2212\u2212";
		} else if (weight < -0.45) {
			r = `\u2212\u2212\u2212\u2212`;
		} else if (weight < -0.30) {
			r = `\u2212\u2212\u2212`;
		} else if (weight < -0.15) {
			r = `\u2212\u2212`;
		} else if (weight < 0) {
			r = `\u2212`;
		}
		return r;
	}
};

/**
 * Converts the given number in kg to a string in tons or kg.
 * @param {number} s The number to format. Returns "tons" if greater than 1000, otherwise returns "kg".
 * @returns {string} Returns "_ tons", "1 ton" (or "one ton"), or "_ kg".
 */
globalThis.massFormat = function(s = 0) {
	if (Math.abs(s) >= 1000) {
		s = Math.trunc(s / 1000);
		return `${num(s)} ${s !== 1 ? 'tons' : 'ton'}`;
	} else {
		return `${num(s)} kg`;
	}
};

/**
 * Converts the given number in cm to a string in inches.
 * @param {number} cm The number to format, in cm.
 * @returns {string} Returns "less than an inch", "1 inch" (or "one inch"), or "_ inches".
 */
globalThis.cmToInchString = function(cm) {
	let inches = cm / 2.54;
	if (inches.isBetween(0, 1)) {
		return "less than an inch";
	}
	inches = Math.round(inches);
	if (inches === 1) {
		return `${num(1)} inch`;
	}
	return `${inches} inches`;
};

/**
 * Converts the given number in cm to a string in feet and inches.
 * @param {number} cm The value to convert.
 * @returns {string} Returns "less than an inch", "1 inch" (or "one inch"), "_ inches", or "_'_"".
 */
globalThis.cmToFootInchString = function(cm) {
	if (Math.round(cm / 2.54) < 12) {
		return cmToInchString(cm);
	}
	return `${Math.trunc(Math.round(cm / 2.54) / 12)}'${Math.round(cm / 2.54) % 12}"`;
};

/**
 * Converts the given `.dick` value to a string in inches.
 * @param {number} dick The value to convert.
 * @returns {string} Returns "less than an inch", "1 inch" (or "one inch"), or "_ inches".
 */
globalThis.dickToInchString = function(dick) {
	return cmToInchString(dickToCM(dick));
};

/**
 * Converts the given `.dick` value to a number in cm.
 * @param {number} dick The value to convert.
 * @returns {number} Returns the value in cm.
 */
globalThis.dickToCM = function(dick) {
	if (dick < 9) {
		return dick * 5;
	} else if (dick === 9) {
		return 50;
	}
	return dick * 6;
};

/**
 * Converts the given `.balls` value to a string in inches.
 * @param {number} balls The value to convert.
 * @returns {string} Returns "less than an inch", "1 inch" (or "one inch"), or "_ inches".
 */
globalThis.ballsToInchString = function(balls) {
	return cmToInchString(ballsToCM(balls));
};

/**
 * Converts the given `.balls` value to a number in cm.
 * @param {number} balls The value to convert.
 * @returns {number} Returns the value in cm.
 */
globalThis.ballsToCM = function(balls) {
	if (balls < 2) {
		return 0;
	}
	return (balls < 10 ? (balls - 1) * 2 : balls * 2);
};

/**
 * Converts the given `.dick` value to a string in either cm or inches, depending on the user's settings.
 * @param {number} dick The value to convert.
 * @returns {string} Returns either "_cm (_ inches)", "_ inches", or "_cm".
 */
globalThis.dickToEitherUnit = function(dick) {
	if (V.showInches === 1) {
		return `${dickToCM(dick)}cm (${dickToInchString(dick)})`;
	}
	if (V.showInches === 2) {
		return dickToInchString(dick);
	}
	return `${dickToCM(dick)}cm`;
};

/**
 * Converts the given `.balls` value to a string in either cm or inches, depending on the user's settings.
 * @param {number} balls The value to convert.
 * @returns {string} Returns either "_cm (_ inches)", "_ inches", or "_cm".
 */
globalThis.ballsToEitherUnit = function(balls) {
	if (V.showInches === 1) {
		return `${ballsToCM(balls)}cm (${ballsToInchString(balls)})`;
	}
	if (V.showInches === 2) {
		return ballsToInchString(balls);
	}
	return `${ballsToCM(balls)}cm`;
};

/**
 * Converts the given `.height` value to a string in either cm or inches, depending on the user's settings.
 * @param {number} height The value to convert.
 * @returns {string} Returns either "_cm (_'_")", "_'_"", or "_cm".
 */
globalThis.heightToEitherUnit = function(height) {
	if (V.showInches === 1) {
		return `${height}cm (${cmToFootInchString(height)})`;
	}
	if (V.showInches === 2) {
		return cmToFootInchString(height);
	}
	return `${height}cm`;
};

/**
 * Converts the given value in cm to a string in either cm or inches, depending on the user's settings.
 * @param {number} length The value to convert.
 * @returns {string} Returns either "_cm (_ inches)", "_ inches", or "_cm".
 */
globalThis.lengthToEitherUnit = function(length) {
	if (V.showInches === 1) {
		return `${length}cm (${cmToInchString(length)})`;
	}
	if (V.showInches === 2) {
		return cmToInchString(length);
	}
	return `${length}cm`;
};
