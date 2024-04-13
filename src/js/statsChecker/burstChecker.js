globalThis.burstCheck = function(slave) {
	return (slave.burst);
	// return V.burstIDs.includes(slave.ID);
};

globalThis.burst = function(slave) {
	slave.burst = 1;
	/*
	if (typeof slave === "number") {
		V.burstIDs.push(slave);
	} else {
		V.burstIDs.push(slave.ID);
	}
	*/
};
