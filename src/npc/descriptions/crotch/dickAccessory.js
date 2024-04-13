/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.Desc.dickAccessory = function(slave) {
	const r = [];
	const {
		he, His
	} = getPronouns(slave);
	if (slave.chastityPenis === 1) {
		r.push(`${His} cock is encased in a tight chastity cage, which is designed to be comfortable as long as ${he} remains soft.`);
		if (slave.energy > 95) {
			r.push(`The poor nympho looks painfully frustrated by this, and a long string of precum is dangling from the hole in the bottom of the cage.`);
		}
		if (FutureSocieties.isActive('FSRestart')) {
			r.push(`This pleases the Societal Elite.`);
		}
	}
	return r.join(" ");
};
