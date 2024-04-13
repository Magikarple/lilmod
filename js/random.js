// cSpell:ignore unskewed

/**
 * generate two independent Gaussian numbers using Box-Muller transform.
 * mean and deviation specify the desired mean and standard deviation.
 * @param {number} [mean=0]
 * @param {number} [deviation=1]
 * @returns {number[]}
 */
function gaussianPair(mean = 0, deviation = 1) {
	const r = Math.sqrt(-2.0 * Math.log(1 - Math.random()));
	const sigma = 2.0 * Math.PI * (1 - Math.random());
	return [r * Math.cos(sigma), r * Math.sin(sigma)].map(val => val * deviation + mean);
}

/**
 * Generate a skewed normal random variable
 * Reference: http://azzalini.stat.unipd.it/SN/faq-r.html
 * @param {number} skew
 * @returns {number}
 */
App.Utils.Math.skewedGaussian = function(skew) {
	let randoms = gaussianPair();
	if (skew === 0) {
		// Don't bother, return an unskewed normal distribution
		return randoms[0];
	}
	let delta = skew / Math.sqrt(1 + skew * skew);
	let result = delta * randoms[0] + Math.sqrt(1 - delta * delta) * randoms[1];
	return randoms[0] >= 0 ? result : -result;
};

/**
 * Generate a skewed normal random variable between max and min
 * @param {number} max
 * @param {number} min
 * @param {number} skew
 * @returns {number}
 */
App.Utils.Math.limitedSkewedGaussian = function(max, min, skew) {
	let result = App.Utils.Math.skewedGaussian(skew);
	while (result < min || result > max) {
		result = App.Utils.Math.skewedGaussian(skew);
	}
	return result;
};

/**
 * Generate a random integer with a normal distribution between min and max (both inclusive).
 * Default parameters result in truncating the standard normal distribution between -3 and +3.
 * Not specifying min/max results in rerolling val approximately 0.3% of the time.
 * @param {number} [mean=0]
 * @param {number} [deviation=1]
 * @param {number} [min=mean-3*deviation]
 * @param {number} [max=mean+3*deviation]
 * @returns {number}
 */
// eslint-disable-next-line no-unused-vars
function normalRandInt(mean = 0, deviation = 1, min = mean - 3 * deviation, max = mean + 3 * deviation) {
	let val = gaussianPair(mean, deviation)[0];
	while (val < min || val > max) {
		val = gaussianPair(mean, deviation)[0];
	}
	return Math.round(val);
}

/**
 * Returns a random integer between min and max (both inclusive).
 * If count is defined, chooses that many random numbers between min and max and returns the average. This is an approximation of a normal distribution.
 * @param {number} min
 * @param {number} max
 * @param {number} [count=1]
 * @returns {number}
 */
// eslint-disable-next-line no-unused-vars
function jsRandom(min, max, count = 1) {
	function rand() {
		return Math.random() * (max - min + 1) + min;
	}

	if (count === 1) {
		return Math.floor(rand());
	}

	let total = 0;
	for (let i = 0; i < count; i++) {
		total += rand();
	}
	return Math.floor(total / count);
}

/**
 * Chooses multiple random elements of an array.
 * @template {*} T
 * @param {Array<T>} arr
 * @param {number} count
 * @returns {Array<T>}
 */
// eslint-disable-next-line no-unused-vars
function jsRandomMany(arr, count) {
	let result = [];
	let tmp = arr.slice();
	for (let i = 0; i < count; i++) {
		let index = Math.floor(Math.random() * tmp.length);
		result.push(tmp.splice(index, 1)[0]);
	}
	return result;
}

/**
 * Accepts both an array and a list, returns undefined if nothing is passed.
 * @template {*} T
 * @param {Array<T>} choices
 * @param {...T} [otherChoices]
 * @returns {T}
 */
// eslint-disable-next-line no-unused-vars
function jsEither(choices, ...otherChoices) {
	if (otherChoices.length === 0 && Array.isArray(choices)) {
		return choices[Math.floor(Math.random() * choices.length)];
	}
	const allChoices = otherChoices;
	allChoices.push(...choices);
	return allChoices[Math.floor(Math.random() * allChoices.length)];
}
