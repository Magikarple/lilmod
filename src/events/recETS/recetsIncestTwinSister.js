App.Events.recetsIncestTwinSister = class recetsIncestTwinSister extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.seeDicks !== 100,
			() => V.seeIncest !== 0,
			() => V.rep / 400 > random(1, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}

	get eventName() {
		return `Twin Sister Incest`;
	}

	execute(node) {
		App.UI.StoryCaption.encyclopedia = "Enslaving People";
		const contractCost = 10000 * 2;
		const sis1 = GenerateNewSlave("XX", {
			minAge: Math.max(V.fertilityAge, V.minimumSlaveAge), maxAge: 20, ageOverridesPedoMode: 1, disableDisability: 1
		});
		sis1.origin = "$He offered to become your slave to protect $his incestuous relationship.";
		sis1.devotion = random(-15, 15);
		sis1.trust = random(-15, 15);
		sis1.oldDevotion = sis1.devotion;
		sis1.oldTrust = sis1.trust;
		sis1.face = random(15, 40);
		sis1.skill.vaginal = 15;
		sis1.clothes = "cutoffs and a t-shirt";
		setHealth(sis1, jsRandom(20, 40), 0, 0, 0);
		sis1.pubicHStyle = "in a strip";
		sis1.energy = Math.max(sis1.energy, 40);
		sis1.attrXX = Math.max(sis1.attrXX, 70);
		if (sis1.behavioralFlaw === "hates women") {
			sis1.behavioralFlaw = "none";
		}
		sis1.behavioralQuirk = "sinful";
		setMissingParents(sis1);
		sis1.canRecruit = 0;
		sis1.relationship = 3;

		const sis2 = generateRelatedSlave(sis1, "twin");
		sis2.slaveName = sis2.birthName;
		sis2.energy = Math.max(sis2.energy, 40);
		sis2.attrXX = Math.max(sis2.attrXX, 70);
		if (sis2.behavioralFlaw === "hates women") {
			sis2.behavioralFlaw = "none";
		}
		sis2.relationship = 3;
		sis2.relationshipTarget = sis1.ID;
		sis1.relationshipTarget = sis2.ID;

		const {sister} = getPronouns(sis1);
		const {HeA} = getPronouns(assistant.pronouns().main).appendSuffix("A");

		App.Events.addParagraph(node, [`You receive so many messages, as a noted titan of the new Free Cities world, that ${V.assistant.name} has to be quite draconian in culling them. ${HeA} lets only the most important through to you. One category of message that always gets through regardless of content, though, is requests for voluntary enslavement. As the new world takes shape, they've become less rare than they once were.`]);

		App.Events.addParagraph(node, [`This call is coming from a public kiosk, which is usually an indication that the person on the other end is a transient individual who has decided to take slavery over homelessness. In this case, however, the story is more unusual — the callers seem stressed, but otherwise normal. They haltingly and quietly explain that they are twin ${sister}s who had to flee their home after their parents found out they were having sex with each other. They feel that life in an arcology together, even as slaves, would be better than their current life on the streets.`]);

		App.Events.addParagraph(node, [`${capFirstChar(V.assistant.name)} assembles a dossier of information and photos from information they've sent describing their bodies and skills, to be used as a substitute for an in-person inspection.`]);

		App.UI.DOM.appendNewElement("p", node, `It would cost ${cashFormat(contractCost)} to enslave the two of them.`, ["detail"]);

		const newSlaves = [sis1, sis2];

		node.append(App.UI.MultipleInspect(newSlaves, true, "generic"));
		const choices = [];

		if (V.cash >= contractCost) {
			choices.push(new App.Events.Result(`Buy them both`, both, `This will cost ${cashFormat(contractCost)}`));
		} else {
			choices.push(new App.Events.Result(null, null, `You lack the necessary funds to enslave them.`));
		}
		App.Events.addResponses(node, choices);

		function both() {
			newSlave(sis2);
			newSlave(sis1);
			cashX(forceNeg(contractCost / 2), "slaveTransfer", sis1);
			cashX(forceNeg(contractCost / 2), "slaveTransfer", sis2);
			return [
				`They cheer happily and hug each other tightly. They ought to be an interesting addition to your penthouse.`,
				newSlaveIncestSex(sis1, sis2)
			];
		}
	}
};
