App.Events.recFSRepopulationEffortsTwo = class recFSRepopulationEffortsTwo extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
		];
	}

	actorPrerequisites() {
		return [];
	}

	get weight() {
		return V.arcologies[0].FSRepopulationFocus > random(1, 100) ? 1 : 0;
	}

	execute(node) {
		let r = [];
		const pram = {disableDisability: 1};
		if (V.pedo_mode === 1) {
			pram.minAge = V.fertilityAge;
			pram.maxAge = 18;
			pram.ageOverridesPedoMode = 1;
		} else {
			pram.minAge = 18;
			pram.maxAge = 30;
		}
		const slave = GenerateNewSlave("XX", pram);
		slave.origin = "$He sold $himself to you in the hope of someday bearing children.";
		setHealth(slave, jsRandom(40, 60), undefined, undefined, 0, 0);
		slave.devotion = random(25, 35);
		slave.trust = random(20, 25);
		slave.vagina = 2;
		slave.trueVirgin = 1;
		slave.preg = -2;

		const {
			He, His,
			his, he, him
		} = getPronouns(slave);
		const {say} = getEnunciation(slave);
		const {HeA} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const contractCost = sexSlaveContractCost();
		const cost = slaveCost(slave) - contractCost;
		r.push(`You receive so many messages, as a noted titan of the new Free Cities world, that your personal assistant has to be quite draconian in culling them. ${HeA} lets only the most important through to you. One category of message that always gets through regardless of content, though, are requests for voluntary enslavement. As the new world takes shape, they've become less rare than they once were.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(
			`This call is coming from a public kiosk, which is usually an indication that the person on the other end is a transient individual who has decided to take slavery over homelessness. You are understandably surprised when this turns out to not be the case; the young woman in the video call is reasonably well dressed, if rather upset over something.`,
			Spoken(slave, `"I... can't have children,"`),
			`${he} ${say}s through building tears.`,
			Spoken(slave, `"I've always dreamed of being a mother, but I was born sterile... I heard rumors that ${V.arcologies[0].name} had cures for infertility, and if you'd help me, I would love to ${(V.PC.title === 1) ? "have your children" : "get pregnant for you"}. Even if the rest of my life was devoted to motherhood... I'd like that..."`)
		);

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
			r.push(`When ${he} arrives, ${he} is the very picture of someone who has seen the light at the end of a very dark tunnel. ${He} can't wait to get started making babies for you.`);

			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function sell() {
			cashX(cost, "slaveTransfer");
			return `When ${he} arrives, ${he} is the very picture of a someone who has seen the light at the end of a very dark tunnel. ${He} can't wait to get started making babies for you. A purchaser's agent arrives to take charge of ${him} and ${he} pleads not to leave ${him} infertile. You abate ${his} fears, ${his} fertility will be restored. ${His} new owner likes to experiment with fertility agents; ${he}'ll quickly be pregnant with ${(V.seeHyperPreg === 1) ? "dozens of children" : "multiples"}. ${His} face alights at the thought. ${He}'ll finally have all the children ${he}'d dreamed of.`;
		}
	}
};
