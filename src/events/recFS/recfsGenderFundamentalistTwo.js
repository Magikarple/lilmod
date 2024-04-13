App.Events.recFSGenderFundamentalistTwo = class recFSGenderFundamentalistTwo extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
			() => V.arcologies[0].FSGenderFundamentalist > random(1, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}

	execute(node) {
		let r = [];
		const slave = GenerateNewSlave("XX", {
			minAge: 32, maxAge: 43, ageOverridesPedoMode: 1, disableDisability: 1
		});
		slave.origin = "$He was raped and impregnated, then sold to you as a way of disposing of an inconveniently pregnant mother.";
		setHealth(slave, jsRandom(-20, 20), undefined, undefined, 0, 10);
		slave.devotion = random(-45, -25);
		slave.trust = random(-45, -25);
		slave.preg = random(20, 40);
		slave.pregType = 1;
		slave.pregWeek = slave.preg;
		slave.pregKnown = 1;
		SetBellySize(slave);
		slave.vagina = 1;
		slave.counter.birthsTotal = random(1, 3);

		const {
			He,
			he, his, him, woman
		} = getPronouns(slave);
		const contractCost = sexSlaveContractCost();
		const cost = slaveCost(slave) - contractCost;
		r.push(`The sexual and moral revolution taking place in the Free Cites has spread back into the old world, producing an inevitable reaction. Thus there are still many places in the world where it is socially embarrassing for one's female relatives to be pregnant as a result of rape, and where direct solutions to this unfortunate situation are frowned upon. You receive a communication from one such place, from a traditionalist family whose mother was dishonored in this way.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`Having ${him} disappear discreetly into ${V.arcologies[0].name} would be a convenient and face-saving way of resolving the situation. Your society's respect for slave pregnancy gives them a plausible way to salve their own consciences where the baby is concerned. As for the mother, having ${him} out of the way is what matters to them.`);

		App.Events.addParagraph(node, r);

		node.append(App.Desc.longSlave(slave, {market: "generic"}));

		const choices = [];

		if (V.cash >= contractCost) {
			choices.push(new App.Events.Result(`Enslave ${him}`, enslave, `This will cost ${cashFormat(contractCost)}`));
			choices.push(new App.Events.Result(`Sell ${him} immediately`, sell, `This will bring in ${cashFormat(cost)}`));
		} else {
			choices.push(new App.Events.Result(null, null, `You lack the necessary funds to enslave ${him}.`));
		}
		App.Events.addResponses(node, choices);

		function enslave() {
			const frag = new DocumentFragment();
			r = [];
			r.push(`When ${he} arrives, ${he} is the very picture of a distraught and very pregnant mature ${woman}. ${He} clearly feels some resentment at ${his} traditionalist home and family for selling ${him} into slavery, but ${he} has just as clearly heard enough about the Free Cities to know that ${he}'s likely traded one form of marginalization for another.`);

			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function sell() {
			cashX(cost, "slaveTransfer");
			return `When ${he} arrives, ${he} is the very picture of a distraught and very pregnant mature ${woman}. ${He} clearly feels some resentment at ${his} traditionalist home and family for selling ${him} into slavery, but ${he} has just as clearly heard enough about the Free Cities to know that ${he}'s likely traded one form of marginalization for another. A purchaser's agent appears to take ${him} away, and ${he} quietly asks who's bought ${him}. A breeder, you tell ${him}, who prefers to squeeze a few pregnancies out of mature women. ${He}'ll probably manage a few pregnancies before ${he}'s retired.`;
		}
	}
};
