/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.Desc.heightImplant = function(slave) {
	let r = [];
	const {his} = getPronouns(slave);
	if (slave.heightImplant > 1) {
		r = limbs();
		r.push(isAre());
		r.push(`wrong; it's obvious that`);
		r.push(itHasTheyHave());
		r.push(`been artificially lengthened.`);
	} else if (slave.heightImplant > 0) {
		r = limbs();
		r.push(isAre());
		r.push(`odd, as though`);
		r.push(itHasTheyHave());
		r.push(`been artificially lengthened.`);
	} else if (slave.heightImplant < -1) {
		r = limbs();
		r.push(isAre());
		r.push(`wrong; it's obvious that`);
		r.push(itHasTheyHave());
		r.push(`been artificially shortened.`);
	} else if (slave.heightImplant < 0) {
		r = limbs();
		r.push(isAre());
		r.push(`odd, as though`);
		r.push(itHasTheyHave());
		r.push(`been artificially shortened.`);
	}

	return r.join(" ");

	function limbs() {
		const r = [];
		r.push(`The proportions of ${his}`);
		if (hasAnyArms(slave)) {
			if (hasBothArms(slave)) {
				r.push(`arms`);
			} else {
				r.push(`arm`);
			}
			if (hasAnyLegs(slave)) {
				r.push(`and`);
			}
		}
		if (hasAnyLegs(slave)) {
			if (hasBothLegs(slave)) {
				r.push(`legs`);
			} else {
				r.push(`leg`);
			}
		}
		return r;
	}

	function isAre() {
		return getLimbCount(slave) === 1 ? `is` : `are`;
	}

	function itHasTheyHave() {
		return getLimbCount(slave) === 1 ? `it has` : `they have`;
	}
};
