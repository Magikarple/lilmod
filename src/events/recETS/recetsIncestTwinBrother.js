App.Events.recetsIncestTwinBrother = class recetsIncestTwinBrother extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.seeDicks !== 0,
			() => V.seeIncest !== 0,
			() => V.rep / 400 > random(1, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}

	get eventName() {
		return `Twin Brother Incest`;
	}

	execute(node) {
		App.UI.StoryCaption.encyclopedia = "Enslaving People";
		const contractCost = 10000 * 2;
		const brother1 = GenerateNewSlave("XY", {
			minAge: Math.max(V.potencyAge, V.minimumSlaveAge), maxAge: 20, ageOverridesPedoMode: 1, disableDisability: 1
		});
		brother1.origin = "$He offered to become your slave to protect $his incestuous relationship.";
		brother1.devotion = random(-15, 15);
		brother1.trust = random(-15, 15);
		brother1.oldDevotion = brother1.devotion;
		brother1.oldTrust = brother1.trust;
		brother1.face = random(15, 40);
		brother1.clothes = "conservative clothing";
		setHealth(brother1, jsRandom(20, 40), 0, 0, 0);
		brother1.pubicHStyle = "bushy";
		brother1.energy = Math.max(brother1.energy, 40);
		brother1.attrXY = Math.max(brother1.attrXY, 70);
		if (brother1.behavioralFlaw === "hates men") {
			brother1.behavioralFlaw = "none";
		}
		brother1.behavioralQuirk = "sinful";
		setMissingParents(brother1);
		brother1.canRecruit = 0;
		brother1.relationship = 3;

		const brother2 = generateRelatedSlave(brother1, "twin");
		brother2.energy = Math.max(brother2.energy, 40);
		brother2.attrXY = Math.max(brother2.attrXY, 70);
		if (brother2.behavioralFlaw === "hates men") {
			brother2.behavioralFlaw = "none";
		}
		brother2.relationship = 3;
		brother2.relationshipTarget = brother1.ID;
		brother1.relationshipTarget = brother2.ID;

		const {sister} = getPronouns(brother1);
		const {HeA} = getPronouns(assistant.pronouns().main).appendSuffix("A");

		App.Events.addParagraph(node, [`You receive so many messages, as a noted titan of the new Free Cities world, that ${V.assistant.name} has to be quite draconian in culling them. ${HeA} lets only the most important through to you. One category of message that always gets through regardless of content, though, is requests for voluntary enslavement. As the new world takes shape, they've become less rare than they once were.`]);

		App.Events.addParagraph(node, [`This call is coming from a public kiosk, which is usually an indication that the person on the other end is a transient individual who has decided to take slavery over homelessness. In this case, however, the story is more unusual — the callers seem stressed, but otherwise normal. They haltingly and quietly explain that they are twin ${sister}s who had to flee their home after their parents found out they were having sex with each other. They feel that life in an arcology together, even as slaves, would be better than their current life on the streets.`]);

		App.Events.addParagraph(node, [`${capFirstChar(V.assistant.name)} assembles a dossier of information and photos from information they've sent describing their bodies and skills, to be used as a substitute for an in-person inspection.`]);

		App.UI.DOM.appendNewElement("p", node, `It would cost ${cashFormat(contractCost)} to enslave the two of them.`, ["detail"]);

		const newSlaves = [brother1, brother2];

		node.append(App.UI.MultipleInspect(newSlaves, true, "generic"));
		const choices = [];

		if (V.cash >= contractCost) {
			choices.push(new App.Events.Result(`Buy them both`, both, `This will cost ${cashFormat(contractCost)}`));
		} else {
			choices.push(new App.Events.Result(null, null, `You lack the necessary funds to enslave them.`));
		}
		App.Events.addResponses(node, choices);

		function both() {
			newSlave(brother2);
			newSlave(brother1);
			cashX(forceNeg(contractCost / 2), "slaveTransfer", brother1);
			cashX(forceNeg(contractCost / 2), "slaveTransfer", brother2);
			return [
				`They hug each other tightly as they slip a hand down the other's pants. They ought to be an interesting addition to your penthouse.`,
				newSlaveIncestSex(brother1, brother2)
			];
		}
	}
};
