/**
 * @param {App.Entity.SlaveState} slave
 */
globalThis.SlaveStatClamp = function(slave) {
	slave.energy = Math.clamp(slave.energy, 0, 100);

	if (slave.devotion > 100) {
		if (slave.trust < -95) {
			slave.trust = -100;
		} else if (slave.trust < 100 && slave.trust > 20) {
			slave.trust += Math.trunc((slave.devotion - 100) * 5) / 10;
		} else {
			repX(4 * (slave.devotion - 100), "slavesViewOfPC", slave);
		}
		slave.devotion = 100;
	} else if (slave.devotion < -95) {
		slave.devotion = -100;
	}
	if (slave.trust > 100) {
		if (slave.devotion < -95) {
			slave.devotion = -100;
		} else if (slave.devotion < 100 && slave.devotion > 20) {
			slave.devotion += Math.trunc(slave.trust - 100);
		} else {
			repX(4 * (slave.trust - 100), "slavesViewOfPC", slave);
		}
		slave.trust = 100;
	} else if (slave.trust < -95) {
		slave.trust = -100;
	}
	if (slave.trust < -100) {
		slave.trust = -100;
	}
	if (slave.devotion < -100) {
		slave.devotion = -100;
	}
	if (isNaN(slave.counter.oral)) {
		slave.counter.oral = 0;
		alert("Oral count has broken, report what you just did!");
	}
	if (isNaN(slave.counter.anal)) {
		slave.counter.anal = 0;
		alert("Anal count has broken, report what you just did!");
	}
	if (isNaN(slave.counter.vaginal)) {
		slave.counter.vaginal = 0;
		alert("Vaginal count has broken, report what you just did!");
	}
	if (isNaN(slave.counter.mammary)) {
		slave.counter.mammary = 0;
		alert("Titfuck count has broken, report what you just did!");
	}
	if (isNaN(slave.counter.penetrative)) {
		slave.counter.penetrative = 0;
		alert("Penetration count has broken, report what you just did!");
	}
	if (slave.foreskin === undefined) {
		slave.foreskin = 0;
	}
	if (!hasAnyNaturalLegs(slave) && slave.heels === 1) {
		slave.heels = 0;
	}
	if (slave.vagina < 0 && slave.mpreg === 0 && slave.preg === -1) {
		slave.preg = 0;
		WombFlush(slave);
	}
	if ((slave.rules.lactation === "induce" && slave.lactation !== 0) || (slave.rules.lactation === "maintain" && slave.lactation !== 1)) {
		slave.rules.lactation = "none";
	}
};
