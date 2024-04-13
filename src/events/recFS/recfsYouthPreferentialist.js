App.Events.recFSYouthPreferentialist = class recFSYouthPreferentialist extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
		];
	}

	actorPrerequisites() {
		return [];
	}

	get weight() {
		return V.arcologies[0].FSYouthPreferentialist > random(1, 100) ? 1 : 0;
	}

	execute(node) {
		let r = [];
		const slave = GenerateNewSlave(null, {maxAge: 18, disableDisability: 1});
		generateSalonModifications(slave);
		slave.origin = "$He came to you for enslavement out of desperation, terrified that $he was about to be enslaved into a worse situation by $his abusive family.";
		setHealth(slave, jsRandom(-40, 30), undefined, undefined, 0, 70);
		slave.devotion = random(10, 15);
		slave.trust = random(-55, -75);
		slave.birthWeek = 0; // turns {age} this week
		slave.behavioralFlaw = either("anorexic", "devout", "gluttonous", "hates men", "hates women", "odd");
		slave.sexualFlaw = either("apathetic", "hates anal", "hates oral", "repressed", "shamefast");

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
		r.push(`This one, unusually, is voice-only. The caller explains why in a painfully quiet voice: ${he}'s turning ${slave.actualAge} in the next few days, and ${he}'s fairly certain ${his} family is about to sell ${him} into slavery. The mixed notes of despair, apathy, and fear in ${his} voice are heartrending, even to you. ${He} begs you to make the necessary arrangements to enslave ${him}. ${He}'s heard about you and how you like young ${girl}s, and ${he}'s also heard about brothels and arcades. There is very little hope discernible in ${his} tone or the pictures ${he} sends you.`);

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
			r.push(`Your slaving network gets ${him} out of ${his} difficult situation without trouble, forwarding ${him} the necessary travel documents. When ${he} arrives, ${he} displays the clear signs of someone who has learned to avoid abuse: ${he} takes no initiative and does nothing without instructions, just standing dumbly until ordered; when told what to do, ${he} does it quickly and carefully. Though ${his} mind is not broken, there is something dead lurking in ${his} eyes. When ${he} looks at you, it is with the watchful caution of an abused animal.`);

			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function sell() {
			cashX(cost, "slaveTransfer");
			return `Your slaving network gets ${him} out of ${his} difficult situation without trouble, forwarding ${him} the necessary travel documents. When ${he} arrives, ${he} displays the clear signs of someone who has learned to avoid abuse: ${he} takes no initiative and does nothing without instructions, just standing dumbly until ordered; when told what to do, ${he} does it quickly and carefully. When a buyer's agent arrives to take ${him} away, ${he} follows him without a backward glance.`;
		}
	}
};
