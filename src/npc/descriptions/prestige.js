/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.Desc.prestige = function(slave) {
	const r = [];
	const {
		He, him, he, his
	} = getPronouns(slave);

	if (slave.prestige > 0) {
		if (slave.prestigeDesc) {
			r.push(pronounsForSlaveProp(slave, slave.prestigeDesc));
		}
		if (slave.prestige > 2) {
			r.push(`<span class="green">It is extremely prestigious to own ${him}.</span>`);
		} else if (slave.prestige > 1) {
			r.push(`<span class="green">It is quite prestigious to own ${him}.</span>`);
		} else {
			r.push(`<span class="green">It is fairly prestigious to own ${him}.</span>`);
		}
	}

	if (slave.porn.prestige > 0) {
		if (slave.porn.prestigeDesc) {
			r.push(pronounsForSlaveProp(slave, slave.porn.prestigeDesc));
		}
		if (slave.porn.prestige > 2) {
			r.push(`As such, ${he} tends to gain a following wherever ${he} goes.`);
		} else if (slave.porn.prestige > 1) {
			r.push(`As such, ${he} is recognized often.`);
		} else {
			r.push(`As such, ${he} is recognized occasionally.`);
		}
	}

	if (slave.prestige > 0 || slave.porn.prestige > 1) {
		if (slave.fuckdoll === 0 && slave.markings === "birthmark") {
			r.push(`${He} has a large, liver-colored birthmark, but since ${he}'s well known, this uniqueness adds to ${his} beauty rather than detracting from it.`);
		}
	}
	return r.join(" ");
};

