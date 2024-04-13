/** @param {App.Entity.SlaveState} sacrifice */
App.UI.SlaveInteract.aztecSlaveSacrificeLife = function(sacrifice) {
	const frag = new DocumentFragment();
	const {He, His, his, him} = getPronouns(sacrifice);
	const activeSlaveRepSacrifice = repGainSacrifice(sacrifice, V.arcologies[0]);
	const havePlatform = V.eventResults.artifactsBought?.includes("aztec");

	let r = [];
	r.push(`Two of the local devotees of Huitzilopochtli drag ${contextualIntro(V.PC, sacrifice, false)}`);
	if (havePlatform) {
		r.push(`up the steps to the sacrificial platform.`);
	} else {
		r.push(`into the large room designated for the sacrifice.`);
	}
	r.push(`${He} has been drugged in preparation for this and can hardly move on ${his} own. ${sacrifice.slaveName} is placed on`);
	if (havePlatform) {
		r.push(`the ancient stone platform,`);
	} else {
		r.push(`a suitable improvised altar,`);
	}
	r.push(`lying on ${his} back.`);
	App.Events.addParagraph(frag, r);

	r = [];
	r.push(`You raise the ceremonial dagger over ${sacrifice.slaveName},`);
	if (sacrifice.fetish === Fetish.MINDBROKEN) {
		r.push(`who has no reaction.`);
	} else if (canSee(sacrifice)) {
		r.push(`whose eyes beg you not to do this.`);
	} else {
		r.push(`who grimaces anxiously in expectation.`);
	}
	r.push(`You plunge the dagger into ${his} chest cavity, and cut a vertical line across ${his} chest. You reach into ${his} body, grab hold of ${his} beating heart, and tear it out of ${him} before presenting it to the crowd.`);
	if (havePlatform) {
		r.push(`${His} body is thrown off the sacrifice platform and rolls down the steps towards the spectators, leaving a blood trail between you and your people.`);
	}
	App.Events.addParagraph(frag, r);

	r = [];
	if (activeSlaveRepSacrifice <= 0) {
		r.push(`Nobody cares.`);
	} else if (activeSlaveRepSacrifice < 10) {
		r.push(`The few spectators are suitably impressed.`);
	} else if (activeSlaveRepSacrifice < 100) {
		r.push(`The small crowd appreciates your devotion to the Aztec culture.`);
	} else {
		r.push(`The crowd cheers to the bloody spectacle.`);
	}
	if (V.slaves.length > 0) {
		r.push(`On the other hand, your remaining ${asPlural("slave is", "slaves are")} suitably <span class="trust dec">terrified.</span>`);
		for (const slave of V.slaves.filter((s) => !isVegetable(s))) {
			slave.trust -= 5 + random(5);
		}
	}

	repX(activeSlaveRepSacrifice, "futureSocieties");
	if (FutureSocieties.isActive('FSAztecRevivalist') && V.arcologies[0].FSAztecRevivalist < 100) {
		V.arcologies[0].FSAztecRevivalist++;
	}
	V.slavesSacrificedThisWeek = (V.slavesSacrificedThisWeek || 0) + 1;
	App.Events.addParagraph(frag, r);

	if (isShelterSlave(sacrifice)) {
		App.Events.addParagraph(frag, [`When the Slave Shelter discovers that you've sacrificed a slave they placed with you for safekeeping, they are understandably <span class="red">horrified.</span>`]);
		V.shelterAbuse += 2;
	}
	removeSlave(sacrifice);

	return frag;
};
