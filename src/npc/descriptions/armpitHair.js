/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.Desc.armpitHair = function(slave) {
	const r = [];
	const {
		his, His, he, He
	} = getPronouns(slave);
	const pubertyAge = Math.min(slave.pubertyAgeXX, slave.pubertyAgeXY);
	if (slave.race === "catgirl") {
		if (slave.underArmHStyle === "bushy") {
			r.push(`${His} underarm fur is especially bushy and untamed.`);
		} else if (slave.underArmHStyle === "waxed" || slave.underArmHStyle === "hairless" || slave.underArmHStyle === "shaved" || slave.underArmHStyle === "bald") {
			r.push(`${His} underarm fur is trim and smooth.`);
		} else {
			r.push(`${His} ${slave.skin} underarm fur is quite regular along ${his} fuzzy body.`);
		}
	} else if (slave.physicalAge < pubertyAge - 2) {
		r.push(`${He} is too sexually immature to have armpit hair.`);
	} else if (slave.underArmHStyle === "hairless") {
		r.push(`${His} armpits are perfectly smooth and naturally hairless.`);
	} else if (slave.underArmHStyle === "bald") {
		r.push(`${His} armpits no longer grow hair, leaving them smooth and hairless.`);
	} else if (slave.underArmHStyle === "waxed") {
		if (slave.assignment === Job.DAIRY && V.dairyRestraintsSetting > 1) {
			r.push(`${His} armpit hair has been removed to prevent chafing.`);
		} else {
			r.push(`${His} armpits are waxed and smooth.`);
		}
	} else if (slave.physicalAge < pubertyAge - 1) {
		r.push(`${He} has a few ${slave.underArmHColor} wisps of armpit hair.`);
	} else if (slave.physicalAge < pubertyAge) {
		r.push(`${He} is on the verge of puberty and has a small patch of ${slave.underArmHColor} armpit hair.`);
	} else if (slave.underArmHStyle === "shaved") {
		r.push(`${His} armpits appear hairless, but closer inspection reveals light, ${slave.underArmHColor} stubble.`);
	} else if (slave.underArmHStyle === "neat") {
		r.push(`${His} armpit hair is neatly trimmed`);
		if (!hasBothArms(slave)) {
			r.push(`since`);
			if (hasAnyArms(slave)) {
				r.push(`at least half`);
			} else {
				r.push(`it`);
			}
			r.push(`is always in full view.`);
		} else {
			r.push(`to not be visible unless ${he} lifts ${his} arms.`);
		}
	} else if (slave.underArmHStyle === "bushy") {
		r.push(`${His} ${slave.underArmHColor} armpit hair has been allowed to grow freely,`);
		if (!hasAnyArms(slave)) {
			r.push(`creating two bushy patches under where ${his} arms used to be.`);
		} else {
			r.push(`so it can be seen poking out from under ${his}`);
			if (hasBothArms(slave)) {
				r.push(`arms`);
			} else {
				r.push(`arm`);
			}
			r.push(`at all times.`);
		}
	}

	return r.join(" ");
};
