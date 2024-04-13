App.Events.recFSSubjugationistTwo = class recFSSubjugationistTwo extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
			() => V.arcologies[0].FSSubjugationist > random(1, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}

	execute(node) {
		let r = [];
		const slave = GenerateNewSlave(null, {maxAge: 42, disableDisability: 1, race: V.arcologies[0].FSSubjugationistRace});
		generateSalonModifications(slave);
		slave.origin = "$He came to your arcology to be enslaved out of a sense of self-loathing for $his kind.";
		setHealth(slave, jsRandom(-40, 0), undefined, undefined, 0, 0);
		slave.trust = random(-25, -15);
		slave.devotion = random(-45, -25);
		slave.anus = random(1, 2);

		const {
			He,
			his, he, him
		} = getPronouns(slave);
		const {HeA} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const contractCost = 1000;
		const cost = slaveCost(slave) - contractCost;
		r.push(`You receive so many messages, as a noted titan of the new Free Cities world, that ${V.assistant.name} has to be quite draconian in culling them. ${HeA} lets only the most important through to you. One category of message that always gets through regardless of content, though, is requests for voluntary enslavement. As the new world takes shape, they've become less rare than they once were.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`The caller is ${V.arcologies[0].FSSubjugationistRace}, and a particularly self-hating one at that. It seems ${he} came into the arcology despite the strong penalties for free ${V.arcologies[0].FSSubjugationistRace} subhumans found here in order to seek enslavement, a curious turn of events. You can easily enslave ${him}; no one is likely to object to your enslaving one of ${his} kind, especially when ${he} came so willingly.`);

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
			r.push(`The enslavement process is disappointingly quiet, since ${he} does little more than stare blankly ahead and respond to any orders. As of this morning ${he} was one of the last free ${V.arcologies[0].FSSubjugationistRace} people in the arcology. Now ${he}'s simply the newest, and perhaps most willing, sex slave of the inferior race to take ${his} proper place.`);

			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function sell() {
			cashX(cost, "slaveTransfer");
			return `The enslavement process is disappointingly quiet, since ${he} does little more than stare blankly ahead and respond to any orders. As of this morning ${he} was one of the last free ${V.arcologies[0].FSSubjugationistRace} people in the arcology. Now ${he}'s simply the newest, and perhaps most willing, sex slave of the inferior race to take ${his} proper place. ${He}'s taken away by a purchasing agent soon after.`;
		}
	}
};
