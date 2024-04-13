globalThis.isInLabor = function(slave) {
	return (slave.labor);
	// return V.birthIDs.includes(slave.ID);
};

globalThis.startLabor = function(slave) {
	slave.labor = 1;
	/*
	if (typeof slave === "number") {
		V.birthIDs.push(slave);
	} else {
		V.birthIDs.push(slave.ID);
	}
	*/
};

globalThis.isInduced = function(slave) {
	return (slave.induce);
	// return V.induceIDs.includes(slave.ID);
};

globalThis.induce = function(slave) {
	startLabor(slave);
	slave.induce = 1;
	/*
	if (typeof slave === "number") {
		V.induceIDs.push(slave);
	} else {
		V.induceIDs.push(slave.ID);
	}
	*/
};
