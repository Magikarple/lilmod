Number.prototype.isBetween = function(min, max, inclusive = false) {
	return inclusive ? this >= min && this <= max : this > min && this < max;
};
