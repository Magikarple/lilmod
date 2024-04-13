/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.Desc.arms = function(slave) {
	const r = [];
	const {
		his, He
	} = getPronouns(slave);

	if (hasAnyNaturalArms(slave)) {
		if (slave.weight > 190) {
			r.push(`${He} has`);
			if (hasBothNaturalArms(slave)) {
				r.push(`hugely thick arms`);
			} else {
				r.push(`a hugely thick arm`);
			}
			r.push(`with sagging fat`);
			if (slave.muscles > 5) {
				r.push(`rolls and`);
			} else {
				r.push(`rolls.`);
			}
		} else if (slave.weight > 160) {
			r.push(`${He} has`);
			if (hasBothNaturalArms(slave)) {
				r.push(`thick arms`);
			} else {
				r.push(`a thick arm`);
			}
			r.push(`with drooping fat`);
			if (slave.muscles > 5) {
				r.push(`folds and`);
			} else {
				r.push(`folds.`);
			}
		} else if (slave.weight > 130) {
			r.push(`${He} has`);
			if (hasBothNaturalArms(slave)) {
				if (slave.muscles > 5) {
					r.push(`plump arms with`);
				} else {
					r.push(`plump arms.`);
				}
			} else {
				if (slave.muscles > 5) {
					r.push(`a plump arm with`);
				} else {
					r.push(`a plump arm.`);
				}
			}
		} else if (slave.weight > 97) {
			r.push(`${He} has`);
			if (hasBothNaturalArms(slave)) {
				if (slave.muscles > 5) {
					r.push(`chubby arms with`);
				} else {
					r.push(`chubby arms.`);
				}
			} else {
				if (slave.muscles > 5) {
					r.push(`a chubby arm with`);
				} else {
					r.push(`a chubby arm.`);
				}
			}
		} else if (slave.muscles > 5) {
			r.push(`${He} has`);
			if (hasBothNaturalArms(slave)) {
				r.push(`normal arms`);
			} else {
				r.push(`a normal arm`);
			}
			r.push(`with`);
		}

		if (slave.muscles > 95) {
			if (slave.weight > 95) {
				r.push(`huge muscles hidden beneath ${his} soft flesh.`);
			} else {
				r.push(`huge muscles.`);
			}
		} else if (slave.muscles > 30) {
			if (slave.weight > 95) {
				r.push(`obvious muscles hidden beneath ${his} soft flesh.`);
			} else {
				r.push(`obvious muscles.`);
			}
		} else if (slave.muscles > 5) {
			if (slave.weight > 30) {
				r.push(`toned muscles hidden beneath ${his} soft flesh.`);
			} else {
				r.push(`toned muscles.`);
			}
		} else {
			// little muscle to them.
		}
	}
	return r.join(" ");
};

