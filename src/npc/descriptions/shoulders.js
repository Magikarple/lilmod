/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.Desc.shoulders = function(slave) {
	const r = [];
	const {
		him, his, His
	} = getPronouns(slave);
	if (slave.fuckdoll === 0) {
		if (slave.shoulders < -1) {
			r.push(`${His} shoulders and chest are very narrow and`);
			if (slave.boobs > 2000) {
				r.push(`feminine, forcing ${his} pressed-together tits to spread far beyond ${his} sides.`);
			} else {
				r.push(`feminine.`);
			}
		} else if (slave.shoulders < 0) {
			r.push(`${His} shoulders and chest are quite`);
			if (slave.boobs > 1200) {
				r.push(`feminine, causing a lot of cleavage and pressing ${his} boobs outward beyond ${his} sides.`);
			} else {
				r.push(`feminine.`);
			}
		} else if (slave.shoulders > 1) {
			r.push(`${His} shoulders and chest are very`);
			if (slave.boobs > 600) {
				r.push(`broad, making ${his} boobs look a lot smaller than they actually are.`);
			} else {
				r.push(`broad.`);
			}
		} else if (slave.shoulders > 0) {
			r.push(`${His} shoulders and chest are fairly`);
			if (slave.boobs > 600) {
				r.push(`broad, making ${his} tits look smaller than they actually are.`);
			} else {
				r.push(`broad.`);
			}
		} else {
			r.push(`${His} shoulders and chest are`);
			if (slave.boobs > 800) {
				r.push(`feminine, flattering ${his} breasts.`);
			} else {
				r.push(`feminine.`);
			}
		}
		if (slave.shoulders > slave.hips) {
			r.push(`They're wider than ${his} hips,`);
			if (slave.boobs > 2000 * (slave.shoulders - slave.hips)) {
				r.push(`but ${his} massive breasts make it hard to discern.`);
			} else if (FutureSocieties.isActive('FSGenderRadicalist')) {
				r.push(`giving ${him} a somewhat mannish appearance.`);
			} else if (FutureSocieties.isActive('FSGenderFundamentalist')) {
				r.push(`giving ${him} an <span class="red">ugly, mannish appearance.</span>`);
			} else {
				r.push(`giving ${him} an <span class="red">unattractive, somewhat mannish, appearance.</span>`);
			}
		}
	}
	return r.join(" ");
};
