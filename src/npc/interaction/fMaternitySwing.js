/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.Interact.fMaternitySwing = function(slave) {
	const node = new DocumentFragment();
	let r = [];

	const {
		He,
		he, his, him, himself
	} = getPronouns(slave);

	slave.partners.add(-1);

	r.push(`You call ${him} over and hook ${him} into the reinforced silk maternity swing built into your office, then lift ${him} into the air so that you can toy with ${his} hyperfecund body. Once you have ${him} properly situated with ${his}`);
	if (slave.boobs >= 20000) {
		r.push(`obscenely bloated boobs`);
	} else if (Math.floor(slave.boobsImplant/slave.boobs) >= .60) {
		r.push(`augmented balloon boobies`);
	} else if (slave.boobs >= 3000) {
		r.push(`enormous breasts`);
	} else {
		r.push(`cute tits`);
	}
	r.push(`and`);
	if (slave.bellyPreg >= 1000000) {
		r.push(`ridiculously enormous, baby-packed belly`);
	} else if (slave.bellyPreg >= 750000) {
		r.push(`mountainous, baby-stuffed gut`);
	} else if (slave.bellyPreg >= 600000) {
		r.push(`titanic, baby-swollen womb`);
	} else {
		r.push(`massive belly`);
	}
	r.push(`hanging above the floor of your office, you turn your attention to molesting ${his} ripe protuberances. Running your tongue along the distended nub of ${his} belly button, you kiss your way up the fertile curve of ${his} belly, making your way to ${his} tits so that you can suck on ${his} ${slave.nipples} nipples. ${He} squirms in ${his} restraints and`);
	if (slave.devotion > 95) {
		if (canTalk(slave)) {
			r.push(`begs you to fuck ${him} already.`);
		} else {
			r.push(`groans inchoately, obviously desperate for you to fuck ${him}.`);
		}
	} else if (slave.trust < -20 && slave.devotion > -10) {
		r.push(`groans with barely restrained lust.`);
	} else {
		r.push(`groans in lust and terror.`);
	}
	r.push(`You strap into your own customized version of the device, then elevate your body so that`);
	if (V.PC.dick !== 0) {
		r.push(`your dick`);
	} else {
		r.push(`the device's built-in strap-on`);
	}
	r.push(`is at the perfect angle to drive yourself and your`);
	if (slave.bellyPreg >= 600000) {
		r.push(`brood-slave`);
	} else {
		r.push(`glorified belly-balloon`);
	}
	r.push(`into a string of mutual orgasms with some truly astounding aerial sex.`);
	if (canDoVaginal(slave)) {
		r.push(VCheck.Vaginal(slave, 1));
	} else {
		r.push(VCheck.Anal(slave, 1));
	}
	r.push(`The sight of ${his} swollen body wobbling in mid-air as you pound away at ${him} never gets old,`);
	if (slave.devotion > 95) {
		r.push(`and ${he} certainly seems to enjoy your ministrations, too.`);
	} else if (slave.trust < -20 && slave.devotion > -10) {
		r.push(`and, by the end of your session, ${he} seems to be enjoying ${himself}, too.`);
	} else {
		r.push(`and the sight of ${his} ugly tears rolling down ${his} face to hit the ground far below is one hell of a bonus.`);
	}
	r.push(`Once finished, you release ${him} from ${his} restraints and have ${him} carried away to clean ${himself} up before returning to ${his} duties.`);
	App.Events.addParagraph(node, r);
	return node;
};
