/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.Interact.abort = function(slave) {
	const node = new DocumentFragment();
	let r = [];

	const {
		He, His,
		he, his, him
	} = getPronouns(slave);

	r.push(`The remote surgery makes aborting a pregnancy quick and efficient.`);

	if (slave.preg < 4) {
		r.push(`It was so early in ${his} pregnancy that the potential mental effects are diminished.`);
	} else {
		r.push(`${slave.slaveName} is`);
		if (slave.fuckdoll > 0 || slave.fetish === Fetish.MINDBROKEN) {
			r.push(`completely unmoved by the development.`);
		} else if (slave.sexualFlaw === "breeder") {
			r.push(`<span class="red">fundamentally broken.</span> ${His} entire concept of self and sexuality was wrapped up in the life growing within ${him}, and now it is gone.`);
			applyMindbroken(slave);
		} else if (slave.devotion < -50) {
			r.push(`<span class="devotion dec">filled with violent, consuming hatred.</span> Even though ${he} knew ${his} baby was destined for a slave orphanage, it seems ${he} cared for it and views you as its killer. ${He} is <span class="trust dec">terrified of your power</span> over ${his} body.`);
			slave.trust -= 10;
			slave.devotion -= 25;
		} else if (slave.devotion < -20) {
			r.push(`<span class="devotion dec">afflicted by desperate, inconsolable sobbing.</span> Even though ${he} knew ${his} baby was destined for a slave orphanage, it seems ${he} cared for it. ${He} is <span class="trust dec">terrified of your power</span> over ${his} body.`);
			slave.trust -= 10;
			slave.devotion -= 10;
		} else if (slave.fetish === "pregnancy") {
			r.push(`<span class="devotion dec">filled with a deep sorrow.</span> To a pregnancy fetishist, having a pregnancy end like this hurts far worse than birth ever would. ${He} is <span class="trust dec">terrified of a repeat performance.</span>`);
			const fetishModifier = slave.fetishStrength / 2;
			slave.devotion -= 1 * fetishModifier;
			slave.trust -= 1 * fetishModifier;
		} else if (slave.devotion <= 20) {
			r.push(`<span class="devotion dec">consumed by muted weeping and enduring sorrow.</span> Even though ${he} knew ${his} baby was destined for a slave orphanage, it seems ${he} cared for it. ${He} is <span class="trust dec">terrified of your power</span> over ${his} body.`);
			slave.trust -= 10;
			slave.devotion -= 5;
		} else if (slave.devotion <= 50) {
			r.push(`dully obedient. ${He} has been broken to slave life so thoroughly that even this is neither surprising nor affecting. ${He} is <span class="trust dec">terrified of your power</span> over ${his} body.`);
			slave.trust -= 10;
		} else {
			r.push(`<span class="devotion inc">pleased by this stark development,</span> since ${he} is so attentive to your will. ${He} also expects ${he}'ll be able to fuck better now.`);
			slave.devotion += 4;
		}
	}

	if (slave.abortionTat > -1) {
		slave.abortionTat++;
		r.push(`The temporary tattoo of a child has been replaced with ${his} ${ordinalSuffix(slave.abortionTat)} crossed out infant.`);
		cashX(forceNeg(V.modCost), "slaveMod", slave);
	}

	slave.preg = rulesDemandContraceptives(slave, V.defaultRules) ? -1 : 0;

	TerminatePregnancy(slave);
	actX(slave, "abortions");
	App.Events.addParagraph(node, r);
	return node;
};
