App.Events.recFSEgyptianRevivalist = class recFSEgyptianRevivalist extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
			() => V.arcologies[0].FSEgyptianRevivalist > random(1, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}

	execute(node) {
		/* Written and coded by Boney M */
		App.UI.StoryCaption.encyclopedia = "Enslaving People";

		V.market = new App.Markets.Global("generic");
		V.market.introType = "egyptian";

		const contractCost = 3000;
		const slave = GenerateNewSlave(null, {minAge: Math.max(16, V.minimumSlaveAge + 3), maxAge: 29, disableDisability: 1});
		generateSalonModifications(slave);
		slave.origin = "$He offered $himself to you for enslavement hoping you would preserve $his incestuous relationship with $his sibling.";
		slave.devotion = random(5, 15);
		slave.trust = random(-15, -5);
		setHealth(slave, jsRandom(-20, 0), undefined, undefined, undefined, 35);
		setMissingParents(slave);
		slave.canRecruit = 0;
		if (slave.dick > 0 && slave.balls === 0) {
			slave.balls = random(1, 5);
		}

		const oppositeSex = V.seeDicks.isBetween(0, 100) && (random(1, 4) <= 3);
		const secondSlave = generateRelatedSlave(slave, "younger sibling", oppositeSex);

		secondSlave.relationship = 4;
		secondSlave.relationshipTarget = slave.ID;
		slave.relationship = 4;
		slave.relationshipTarget = secondSlave.ID;

		/* they've been fucking, obviously, so no virginity */
		if (secondSlave.dick > 0) {
			if (slave.vagina === 0) {
				slave.vagina = secondSlave.dick > 4 ? 2 : 1;
			}
			slave.anus = Math.max(slave.anus, secondSlave.dick > 4 ? 2 : 1);
			if (slave.preg >= 1) {
				slave.pregSource = secondSlave.ID;
			}
		}
		if (slave.dick > 0) {
			if (secondSlave.vagina === 0) {
				secondSlave.vagina = slave.dick > 4 ? 2 : 1;
			}
			secondSlave.anus = Math.max(secondSlave.anus, slave.dick > 4 ? 2 : 1);
			if (secondSlave.preg >= 1) {
				secondSlave.pregSource = slave.ID;
			}
		}

		const newSlaves = [slave, secondSlave];
		const {
			HeA,
		} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		App.Events.addParagraph(node, [
			`You receive so many messages, as a noted titan of the new Free Cities world, that ${V.assistant.name} has to be quite draconian in culling them. ${HeA} lets only the most important through to you. One category of message that always gets through regardless of content, though, is requests for voluntary enslavement. As the new world takes shape, they've become less rare than they once were.`
		]);
		App.Events.addParagraph(node, [
			`This call is coming from a public kiosk, which is usually an indication that the person on the other end is a transient individual who has decided to take slavery over homelessness. In this case, however, the story is more unusual — the callers seem stressed, but otherwise normal. They haltingly and quietly explain, with many nervous glances off-camera to ensure they are not overheard, that they are both siblings and lovers, and their attempts to keep the truth of the nature of their relationship from their friends, family, and society at large have failed. They had heard of ${V.arcologies[0].name}'s reverence for incestuous relationships, and have managed to talk themselves into the questionable conclusion that their only chance to be together was for them to sell themselves to someone who would not just accept but encourage their incest — namely, you.`
		]);
		App.Events.addParagraph(node, [
			`${capFirstChar(V.assistant.name)} assembles a dossier of information and photos from information they've sent describing their bodies and skills, to be used as a substitute for an in-person inspection.`
		]);

		const totalValue = slaveCost(slave) + slaveCost(secondSlave);
		App.UI.DOM.appendNewElement("div", node, `Enslaving them will cost ${cashFormat(contractCost)}. Selling them immediately will bring in approximately ${cashFormat(totalValue-contractCost)}.`, "note");
		node.append(App.UI.MultipleInspect(newSlaves, true));

		const choices = [];
		if (V.cash >= contractCost) {
			choices.push(new App.Events.Result(`Enslave the pair`, enslave));
		} else {
			choices.push(new App.Events.Result(null, null, "You lack the necessary funds to enslave them."));
		}
		App.Events.addResponses(node, choices);

		function enslave() {
			V.market.newSlaves = newSlaves;
			V.market.newSlaves.forEach((s) => cashX(forceNeg(contractCost/V.market.newSlaves.length), "slaveTransfer", s));
			V.returnTo = V.nextLink;
			return App.Markets.bulkSlaveIntro();
		}
	}
};
