App.Facilities.Dairy.inflation = function() {
	const inflatedSlaves = {
		milk: 0,
		cum: 0
	};
	for (const s of V.slaves) {
		if (s.inflationMethod === 1 || s.inflationMethod === 2) {
			if (s.inflationType === "milk") {
				inflatedSlaves.milk++;
			} else if (s.inflationType === "cum") {
				inflatedSlaves.cum++;
			}
		}
	}
	return inflatedSlaves;
};
