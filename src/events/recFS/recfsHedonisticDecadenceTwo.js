App.Events.recFSHedonisticDecadenceTwo = class recFSHedonisticDecadenceTwo extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
			() => V.arcologies[0].FSHedonisticDecadence > random(1, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}

	execute(node) {
		let r = [];
		const slave = GenerateNewSlave(null, {maxAge: 24, disableDisability: 1});
		slave.origin = "$He offered $himself for enslavement in hope of being less dull.";
		setHealth(slave, jsRandom(0, 10), undefined, undefined, 0, 0);
		slave.devotion = random(0, 15);
		slave.trust = random(10, 25);
		slave.behavioralFlaw = "none";
		slave.behavioralQuirk = "none";
		slave.sexualFlaw = "none";
		slave.sexualQuirk = "none";
		slave.fetish = "none";
		slave.fetishStrength = 0;
		slave.attrXX = 30;
		slave.attrXY = 30;
		slave.vagina = 0;
		slave.trueVirgin = 1;
		slave.anus = 0;

		const {
			His, He,
			his, he, him
		} = getPronouns(slave);
		const {HeA} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const contractCost = sexSlaveContractCost();
		const cost = slaveCost(slave) - contractCost;
		r.push(`You receive so many messages, as a noted titan of the new Free Cities world, that ${V.assistant.name} has to be quite draconian in culling them. ${HeA} lets only the most important through to you. One category of message that always gets through regardless of content, though, is requests for voluntary enslavement. As the new world takes shape, they've become less rare than they once were.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`This one is interesting, even by the standards of messages from people who want to become slaves. The individual is neither sick nor abused, and speaks with directness.`);
		r.push(Spoken(slave, `"I'm what you'd call 'vanilla',"`));
		r.push(`${he} sighs.`);
		r.push(Spoken(slave, `"And, well, I want to expand my horizons and I heard how much fun people have in your arcology. I'm yours to experiment with.`));

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
			r.push(`When ${he} arrives, ${he} comes directly to your penthouse for enslavement. ${He} wears an expression of doubt, fear, and wonder as ${he} takes in the sights and sounds of the magnificent beast that is the new society taking shape in ${V.arcologies[0].name}. The enslavement process requires ${him} to be nude, of course, and it reveals ${he} has no idea how to be sexy. ${He} really is as boring as ${he} said ${he} was.`);

			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function sell() {
			cashX(cost, "slaveTransfer");
			return `When ${he} arrives, ${he} comes directly to your penthouse for enslavement. ${He} wears an expression of doubt, fear, and wonder as ${he} takes in the sights and sounds of the magnificent beast that is the new society taking shape in ${V.arcologies[0].name}. A purchaser's agent arrives to take charge of ${him}, and ${he} asks politely who bought ${him}. A man with an oviposition fetish, you tell ${him}. ${He} fails to grasp the meaning. You explain to ${him} that eggs will be stuck into all ${his} holes until ${he} can't stomach any more. ${He} turns beat red at the description, so you carry on. ${His} new owner will likely remodel ${his} cervix to allow eggs to be pumped straight into ${his} womb; ${he}'ll be lucky if ${he} can stand once he's done with ${him}. Then ${he}'ll have to look forward to laying them all for his amusement. ${His} hands have since moved to ${his} crotch, it seems ${he}'s getting into the fantasy.`;
		}
	}
};
