App.Events.recFSChattelReligionist = class recFSChattelReligionist extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
			() => V.arcologies[0].FSChattelReligionist > random(1, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}

	execute(node) {
		let r = [];
		const slave = GenerateNewSlave(null, {minAge: 16, maxAge: 42, disableDisability: 1});
		slave.origin = "$He offered $himself for enslavement out of religious conviction.";
		generateSalonModifications(slave);
		setHealth(slave, jsRandom(10, 30), undefined, undefined, 0, 0);
		slave.devotion = random(15, 45);
		slave.trust = random(60, 75);
		slave.behavioralFlaw = "devout";
		slave.sexualFlaw = "repressed";

		const {
			He,
			his, he, him, himself, girl, woman
		} = getPronouns(slave);
		const {HeA} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const contractCost = sexSlaveContractCost();
		const cost = slaveCost(slave) - contractCost;
		r.push(`You receive so many messages, as a noted titan of the new Free Cities world, that ${V.assistant.name} has to be quite draconian in culling them. ${HeA} lets only the most important through to you. One category of message that always gets through regardless of content, though, is requests for voluntary enslavement. As the new world takes shape, they've become less rare than they once were.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`This one is a little odd; it merely begs you for an in person audience and offers you the sender's "unworthy body" as payment for granting it. You surreptitiously scan ${him} when ${he} arrives to make sure this isn't an attack of some kind, but ${he}'s just a normal ${girl} wearing conservative clothing. When admitted to your office, ${he} immediately strips off ${his} clothing, gets down before your desk, and presses ${his} forehead to the floor.`);
		r.push(Spoken(slave, `"${(V.PC.title !== 0) ? "Sir" : "Ma'am"},"`));
		r.push(`${he} says,`);
		r.push(Spoken(slave, `"please accept me as your slave. I am a wretched whore, filled with sin, and freedom is a burden to me. Please free me from this torment and take me into your service."`));

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
			r.push(`${He} lets out a convulsive sob when you accept ${his} servitude, and is painfully obsequious as you complete the formalities of enslavement. Your exam reveals several minor indications of self-harm — chewed nails, bitten lips, and such. But for all that, a remarkable look of peace has settled on the poor ${woman}'s face. ${He} waits patiently for a hint of your will,`);
			if (canAchieveErection(slave)) {
				r.push(`${his} cock painfully erect`);
			} else if (slave.dick > 0) {
				r.push(`precum dripping from ${his} soft dick`);
			} else {
				r.push(`${his} pussy visibly moist`);
			}
			r.push(`at the prospect of the servile sex ${he} is convinced is ${his} duty.`);

			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function sell() {
			cashX(cost, "slaveTransfer");
			return `${He} lets out a convulsive sob when you accept ${his} servitude, and is painfully obsequious as you complete the formalities of enslavement. When ${his} buyer arrives to take ${him} away, the realization agonizes ${him}, but ${he} snuffs out ${his} saddened reaction almost as soon as it dawns on ${his} face. ${He} visibly draws ${himself} up, obviously telling ${himself} that service under one master is as righteous as service under another.`;
		}
	}
};
