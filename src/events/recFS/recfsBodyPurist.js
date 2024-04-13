App.Events.recFSBodyPurist = class recFSBodyPurist extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
			() => V.arcologies[0].FSBodyPurist > random(1, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}

	execute(node) {
		let r = [];
		const slave = GenerateNewSlave(null, {maxAge: 42, disableDisability: 1, race: "nonslave"});
		slave.origin = "$He offered $himself for voluntary enslavement to get to an arcology in which implants are uncommon, since $he has a fear of surgery.";
		setHealth(slave, jsRandom(-20, 20), undefined, undefined, 0, 0);
		slave.devotion = random(-15, 15);
		slave.trust = random(-15, 15);

		const {
			He,
			his, he, him, himself
		} = getPronouns(slave);
		const {HeA} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const {title: Master, say} = getEnunciation(slave);
		const contractCost = sexSlaveContractCost();
		const cost = slaveCost(slave) - contractCost;
		r.push(`You receive so many messages, as a noted titan of the new Free Cities world, that ${V.assistant.name} has to be quite draconian in culling them. ${HeA} lets only the most important through to you. One category of message that always gets through regardless of content, though, is requests for voluntary enslavement. As the new world takes shape, they've become less rare than they once were.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`This one is from another arcology, which is rather unusual. You are presented with a rather normal-looking, if obviously poor, free citizen. ${He} says dejectedly,`);
		r.push(Spoken(slave, `"I'm on my last few ¤ here, ${V.PC.title !== 0 ? "sir" : "ma'am"}. The owner here, he's planning to enslave me later today. I just know it. He fills his slaves up with silicone until they look like fucking Barbie dolls."`));
		r.push(`${He} shivers fearfully.`);
		r.push(Spoken(slave, `"You don't do that, right? If I have to be a fucktoy, I don't want to be cut up first."`));

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
			r.push(`When ${he} arrives, it's obvious that ${he} isn't particularly happy with the situation, but there is some evident relief to ${him}. When asked about it, ${he} ${say}s,`);
			r.push(Spoken(slave, `"I really hate the idea of surgery, especially implant surgery, ${Master}. Just — the idea of having fake shit in here —"`));
			r.push(`${he} rubs ${his} chest a little`);
			r.push(Spoken(slave, `"— Ugh."`));
			r.push(`${He} laughs bitterly at ${himself}, and then rubs ${his} chest again, looking at you with mixed fear and invitation.`);

			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function sell() {
			cashX(cost, "slaveTransfer");
			return `When ${he} arrives, it's obvious that ${he} isn't particularly happy with the situation, but there is some evident relief to ${him}. It vanishes when a purchaser's agent arrives to take ${him} away. ${He} looks at you desperately, begging to know who's purchased ${him}. You tell ${him} truthfully that a wealthy citizen one arcology over bought ${him} as a house slave; you neglect to mention that he likes big tits, and he isn't particular about whether they're natural.`;
		}
	}
};
