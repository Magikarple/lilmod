/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.Desc.hips = function(slave) {
	const r = [];
	const {his} = getPronouns(slave);
	if (slave.hips < -1) {
		if (slave.butt > 2) {
			if (FutureSocieties.isActive('FSHedonisticDecadence')) {
				r.push(`disproportionately large for ${his} narrow hips, but your hedonistic arcology finds this attractive.`);
			} else if (FutureSocieties.isActive('FSTransformationFetishist')) {
				r.push(`disproportionately large for ${his} narrow hips, but your transformation fetishist arcology considers this attractive.`);
			} else if (FutureSocieties.isActive('FSAssetExpansionist')) {
				r.push(`disproportionately large for ${his} narrow hips, but that's just fine to your asset expansionist society.`);
			} else {
				r.push(`<span class="red">disproportionately large</span> for ${his} narrow hips.`);
			}
		} else {
			r.push(`and ${his} hips are very narrow.`);
		}
	} else if (slave.hips < 0) {
		if (slave.butt > 4) {
			if (FutureSocieties.isActive('FSHedonisticDecadence')) {
				r.push(`disproportionately large for ${his} trim hips, but your hedonistic arcology finds this attractive.`);
			} else if (FutureSocieties.isActive('FSTransformationFetishist')) {
				r.push(`disproportionately large for ${his} trim hips, but your transformation fetishist arcology considers this attractive.`);
			} else if (FutureSocieties.isActive('FSAssetExpansionist')) {
				r.push(`disproportionately large for ${his} trim hips, but that's just fine to your asset expansionist society.`);
			} else {
				r.push(`<span class="red">disproportionately large</span> for ${his} trim hips.`);
			}
		} else {
			r.push(`complemented by ${his} trim hips.`);
		}
	} else if (slave.hips > 2) {
		if (slave.butt <= 8) {
			r.push(`<span class="red">disproportionately small</span> for ${his} monstrous hips.`);
		} else {
			r.push(`fitting for ${his} monstrous hips.`);
		}
	} else if (slave.hips > 1) {
		if (slave.butt <= 3 && (!FutureSocieties.isActive('FSSlimnessEnthusiast') || (slave.boobs >= 500))) {
			r.push(`<span class="red">disproportionately small</span> for ${his} very wide`);
			if (FutureSocieties.isActive('FSSlimnessEnthusiast')) {
				r.push(`hips, which your arcology finds unattractive on busty slaves.`);
			} else {
				r.push(`hips.`);
			}
		} else {
			r.push(`flattered by ${his} very wide hips.`);
		}
	} else if (slave.hips > 0) {
		if (slave.butt > 8) {
			if (FutureSocieties.isActive('FSHedonisticDecadence')) {
				r.push(`disproportionately large for ${his} broad hips, but your hedonistic arcology finds this attractive.`);
			} else if (FutureSocieties.isActive('FSTransformationFetishist')) {
				r.push(`disproportionately large for ${his} broad hips, but your transformation fetishist arcology considers this attractive.`);
			} else if (FutureSocieties.isActive('FSAssetExpansionist')) {
				r.push(`disproportionately large for ${his} broad hips, but that's just fine to your asset expansionist society.`);
			} else {
				r.push(`<span class="red">disproportionately large</span> for ${his} broad hips.`);
			}
		} else if (slave.butt <= 2 && (!FutureSocieties.isActive('FSSlimnessEnthusiast') || (slave.boobs >= 500))) {
			r.push(`<span class="red">disproportionately small</span> for ${his} broad`);
			if (FutureSocieties.isActive('FSSlimnessEnthusiast')) {
				r.push(`hips, which your arcology finds unattractive on busty slaves.`);
			} else {
				r.push(`hips.`);
			}
		} else {
			r.push(`complemented by ${his} broad hips.`);
		}
	} else {
		if (slave.butt > 6) {
			if (FutureSocieties.isActive('FSHedonisticDecadence')) {
				r.push(`disproportionately large for ${his} womanly hips, but your hedonistic arcology finds this attractive.`);
			} else if (FutureSocieties.isActive('FSTransformationFetishist')) {
				r.push(`disproportionately large for ${his} womanly hips, but your transformation fetishist arcology considers this attractive.`);
			} else if (FutureSocieties.isActive('FSAssetExpansionist')) {
				r.push(`disproportionately large for ${his} womanly hips, but that's just fine to your asset expansionist society.`);
			} else {
				r.push(`<span class="red">disproportionately large</span> for ${his} womanly hips.`);
			}
		} else if (slave.butt <= 1 && (!FutureSocieties.isActive('FSSlimnessEnthusiast') || (slave.boobs >= 500))) {
			r.push(`<span class="red">disproportionately small</span> for ${his} ample`);
			if (FutureSocieties.isActive('FSSlimnessEnthusiast')) {
				r.push(`hips, which your arcology finds unattractive on busty slaves.`);
			} else {
				r.push(`hips.`);
			}
		} else {
			r.push(`complemented by ${his} ample hips.`);
		}
	}
	return r.join(" ");
};
