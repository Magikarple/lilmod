
/**
 * @template {PropertyKey} K
 * @template {*} T
 * @param {Partial<Record<K, T>>} dict
 * @param {K} value
 * @param {T} [defaultValue]
 * @returns {T|null}
 */
App.Ratings.exact = function(dict, value, defaultValue = null) {
	const res = dict[value];
	return res ? res : defaultValue;
};

/**
 * @template {*} T
 * @param {Record<number, T>} ratings
 * @param {number} value
 * @returns {T|null}
 */
App.Ratings.numeric = function(ratings, value) {
	for (const key in ratings) {
		if (parseInt(key) >= value) {
			return ratings[key];
		}
	}
	return null;
};

/**
 * @param {object} ratings
 * @param {number[]} values
 * @returns {*|null}
 */
App.Ratings.multiNumeric = function(ratings, values) {
	const firstRating = App.Ratings.numeric(ratings, values[0]);
	if (firstRating === null || typeof firstRating === "string" || firstRating.hasOwnProperty("desc")) {
		return firstRating;
	}
	return App.Ratings.multiNumeric(firstRating, values.slice(1));
};
