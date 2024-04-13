App.Events.recFSPetiteAdmiration = class recFSPetiteAdmiration extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
			() => V.arcologies[0].FSPetiteAdmiration > random(1, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}

	execute(node) {
		let r = [];
		const slave = GenerateNewSlave(null, {minAge: 13, maxAge: 22, disableDisability: 1});
		generateSalonModifications(slave);
		slave.origin = "$He offered $himself for voluntary enslavement to avoid being singled out by ruthless slavers.";
		if (slave.natural.height >= 150) {
			slave.natural.height = Height.randomAdult(slave, {limitMult: [-2, 0]});
			if (slave.natural.height >= 150) {
				slave.natural.height = Height.randomAdult(slave, {limitMult: [-3, -1]});
				if (slave.natural.height >= 150) {
					slave.natural.height = random(90, 130);
					slave.geneticQuirks.dwarfism = 2;
				}
			}
			slave.height = Height.forAge(slave.natural.height, slave);
		}
		setHealth(slave, jsRandom(20, 40), undefined, undefined, 0, 0);
		slave.face = Math.clamp(slave.face+80, -100, 100);
		slave.faceShape = "cute";
		slave.weight = 0;
		slave.waist = -10;
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
		r.push(`This one, unusually, is voice-only. The caller explains why in a painfully quiet voice: slavers have been scoping out the area for prime catches and ${he} feels like ${he} may be on their list, especially given ${his} small stature and relative inability to escape. The mixed notes of despair, apathy, and fear in ${his} voice are heartrending, even to you. ${He} begs you to make the necessary arrangements to enslave ${him}. ${He}'s heard about you and how you like petite ${girl}s, and ${he}'s also heard about brothels and arcades. There is very little hope discernible in ${his} tone or the pictures ${he} sends you.`);

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
			r.push(`Your slaving network gets ${him} out of ${his} difficult situation without trouble, forwarding ${him} the necessary travel documents. When ${he} arrives, ${he} displays the clear signs of someone who has learned to avoid attention: ${he} takes no initiative and does nothing without instructions, just standing dumbly until ordered; when told what to do, ${he} does it quickly and carefully. When ${he} looks at you, it is with the watchful caution of a hunted animal.`);

			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function sell() {
			cashX(cost, "slaveTransfer");
			return `Your slaving network gets ${him} out of ${his} difficult situation without trouble, forwarding ${him} the necessary travel documents. When ${he} arrives, ${he} displays the clear signs of someone who has learned to avoid attention: ${he} takes no initiative and does nothing without instructions, just standing dumbly until ordered; when told what to do, ${he} does it quickly and carefully. When a buyer's agent arrives to take ${him} away, a look of terror flashes across ${his} face. You tell ${him} truthfully that a wealthy citizen bought ${him} as a bed slave; you neglect to mention the competition they encourage amongst their harem. A meek girl like ${him} will likely be the lowest in the pecking order.`;
		}
	}
};
