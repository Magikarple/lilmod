/**
 * @param {App.Entity.SlaveState} slave
 * @param {DescType} descType
 * @returns {string}
 */
App.Desc.heels = function(slave, descType) {
	const r = [];
	const {
		he, He, His
	} = getPronouns(slave);
	if (slave.heels === 1 && hasAnyLegs(slave)) {
		r.push(`${His}`);
		if (hasBothLegs(slave)) {
			r.push(`<span class="pink">legs have been altered</span>`);
		} else {
			r.push(`<span class="pink">leg has been altered</span>`);
		}
		r.push(`so that ${he} must wear heels in order to walk.`);
		if (V.showClothing === 1 && descType !== DescType.MARKET) {
			if (shoeHeelCategory(slave) > 0) {
				r.push(`${He} is, so ${he} can walk reasonably well.`);
			} else {
				r.push(`Since ${he} is without them, ${he}'s crawling on`);
				if (!hasAllLimbs(slave)) {
					r.push(`the ground.`);
				} else {
					r.push(`all fours.`);
				}
			}
		}
	}
	return r.join(" ");
};
