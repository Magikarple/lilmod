/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.Desc.legs = function(slave) {
	const {
		his, He
	} = getPronouns(slave);

	if (hasAnyNaturalLegs(slave) && (slave.weight > 95 || slave.muscles > 5)) {
		const thighs = hasBothNaturalLegs(slave) ? "thighs" : "thigh";
		const thighMuscles = slave.muscles > 5 ? `${thighs} and ${muscleDesc()}` : thighs;
		if (slave.weight > 190) {
			if (hasBothNaturalLegs(slave)) {
				return `${He} has extremely fat legs with immense soft, rather uneven ${thighMuscles}.`;
			} else {
				return `${He} has an extremely fat leg with an immense soft, rather uneven ${thighMuscles}.`;
			}
		} else if (slave.weight > 160) {
			if (hasBothNaturalLegs(slave)) {
				return `${He} has very fat legs with massively thick, soft, somewhat uneven ${thighMuscles}.`;
			} else {
				return `${He} has a very fat leg with a massively thick, soft, somewhat uneven ${thighMuscles}.`;
			}
		} else if (slave.weight > 130) {
			if (hasBothNaturalLegs(slave)) {
				return `${He} has fat legs with hugely thick, soft ${thighMuscles}.`;
			} else {
				return `${He} has a fat leg with a hugely thick, soft ${thighMuscles}.`;
			}
		} else if (slave.weight > 97) {
			if (hasBothNaturalLegs(slave)) {
				return `${He} has fat legs with thick, soft ${thighMuscles}.`;
			} else {
				return `${He} has a fat leg with a thick, soft ${thighMuscles}.`;
			}
		} else if (slave.weight > 95) {
			if (hasBothNaturalLegs(slave)) {
				return `${He} has normal legs with thick, soft ${thighMuscles}.`;
			} else {
				return `${He} has a normal leg with a thick, soft ${thighMuscles}.`;
			}
		} else if (slave.muscles > 5) {
			if (hasBothNaturalLegs(slave)) {
				return `${He} has relatively normal legs and thighs with ${muscleDesc()}.`;
			} else {
				return `${He} has a relatively normal leg and thigh with ${muscleDesc()}.`;
			}
		}
	}

	function muscleDesc(){
		if (slave.muscles > 95) {
			if (slave.weight > 95) {
				return `huge muscles hidden beneath ${his} soft flab`;
			} else {
				return `huge muscles`;
			}
		} else if (slave.muscles > 30) {
			if (slave.weight > 95) {
				return `obvious muscles hidden beneath ${his} soft flab`;
			} else {
				return `obvious muscles`;
			}
		} else if (slave.muscles > 5) {
			if (slave.weight > 30) {
				return `toned muscles hidden beneath ${his} soft flab`;
			} else {
				return `toned muscles`;
			}
		}
	}

	return ``;
};
