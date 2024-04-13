App.Events.recFSStatuesqueGlorification = class recFSStatuesqueGlorification extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
		];
	}

	actorPrerequisites() {
		return [];
	}

	get weight() {
		return V.arcologies[0].FSStatuesqueGlorification > random(1, 100) ? 1 : 0;
	}

	execute(node) {
		let r = [];
		const slave = GenerateNewSlave(null, {disableDisability: 1});
		generateSalonModifications(slave);
		slave.origin = "$He offered $himself for voluntary enslavement to avoid being singled out by ruthless slavers.";
		slave.natural.height = random(200, 264);
		slave.height = Height.forAge(slave.natural.height, slave);
		setHealth(slave, jsRandom(20, 40), undefined, undefined, 0, 0);
		slave.geneticQuirks.gigantism = 2;
		slave.devotion = random(15, 20);
		slave.trust = random(0, 10);
		const {
			He,
			his, he, him, girl
		} = getPronouns(slave);
		const {HeA} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const contractCost = sexSlaveContractCost();
		const cost = slaveCost(slave) - contractCost;
		r.push(`You receive so many messages, as a noted titan of the new Free Cities world, that ${V.assistant.name} has to be quite draconian in culling them. ${HeA} lets only the most important through to you. One category of message that always gets through regardless of content, though, is requests for voluntary enslavement. As the new world takes shape, they've become less rare than they once were.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`This one, unusually, is voice-only. The caller explains why in a painfully quiet voice: slavers have been scoping out the area for prime catches and, as a genetic giant, ${he} knows they'll be gunning for ${him}. The mixed notes of despair, apathy, and fear in ${his} voice are heartrending, even to you. ${He} begs you to make the necessary arrangements to enslave ${him}. ${He}'s heard about you and how you like tall ${girl}s, and ${he}'s also heard about brothels and arcades. There is very little hope discernible in ${his} tone or the pictures ${he} sends you.`);
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
			r.push(`When ${he} arrives, ${he} is the very picture of someone out of ${his} depth. It's clear ${he} feels some relief over not being at the mercy of the slavers, but ${he} knows enough about the Free Cities to know that ${he}'s likely to buy ${his} presence here through long years of sexual labor.`);

			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function sell() {
			const frag = new DocumentFragment();
			r = [];
			cashX(cost, "slaveTransfer");
			r.push(`When ${he} arrives, ${he} is the very picture of someone out of ${his} depth. It's clear ${he} feels some relief over not being at the mercy of the slavers, but ${he} knows enough about the Free Cities to know that ${he}'s likely to buy ${his} presence here through long years of sexual labor. A purchaser's agent appears to take ${him} away, and ${he} quietly asks who's bought ${him}. A breeder, you tell ${him}, who plans to breed the ideal line of giants.`);
			if (slave.dick > 0) {
				r.push(`${He}'ll be the center of ${his} own little harem for as long as ${he} can keep them swollen with children.`);
			} else {
				r.push(`${He}'ll probably manage 20 pregnancies or so before ${he}'s retired, but during that time ${he}'ll be pampered, if not a little sore.`);
			}
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
