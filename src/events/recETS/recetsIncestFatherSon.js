App.Events.recetsIncestFatherSon = class recetsIncestFatherSon extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.seeDicks !== 0,
			() => V.seeIncest !== 0,
			() => V.rep / 400 > random(1, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}

	get eventName() {
		return `Father Son Incest`;
	}

	execute(node) {
		App.UI.StoryCaption.encyclopedia = "Enslaving People";
		const contractCost = 10000 * 2;
		const father = GenerateNewSlave("XY", {
			minAge: Math.max(V.potencyAge + 20, V.minimumSlaveAge + 20), maxAge: 40, ageOverridesPedoMode: 1, disableDisability: 1
		});
		father.origin = "$He offered to become your slave to protect $his incestuous relationship.";
		father.devotion = random(-15, 15);
		father.trust = random(-15, 15);
		father.oldDevotion = father.devotion;
		father.dick = 4;
		father.balls = 3;
		father.scrotum = 3;
		father.face = random(15, 50);
		father.faceShape = "masculine";
		father.clothes = "conservative clothing";
		setHealth(father, jsRandom(20, 40), 0, 0, 0);
		father.energy = Math.max(father.energy, 40);
		father.attrXY = Math.max(father.attrXY, 70);
		if (father.behavioralFlaw === "hates men") {
			father.behavioralFlaw = "none";
		}
		father.behavioralQuirk = "sinful";
		father.canRecruit = 0;
		father.relationship = 3;

		const son = generateRelatedSlave(father, "son");
		son.career = "a student";
		son.energy = Math.max(son.energy, 40);
		son.attrXY = Math.max(son.attrXY, 70);
		if (son.behavioralFlaw === "hates men") {
			son.behavioralFlaw = "none";
		}
		son.relationship = 3;
		son.relationshipTarget = father.ID;

		father.relationshipTarget = son.ID;

		const {
			he, his
		} = getPronouns(father);
		const {
			daughter2, his2
		} = getPronouns(son).appendSuffix("2");
		const {
			HeA
		} = getPronouns(assistant.pronouns().main).appendSuffix("A");

		App.Events.addParagraph(node, [`You receive so many messages, as a noted titan of the new Free Cities world, that ${V.assistant.name} has to be quite draconian in culling them. ${HeA} lets only the most important through to you. One category of message that always gets through regardless of content, though, is requests for voluntary enslavement. As the new world takes shape, they've become less rare than they once were.`]);

		App.Events.addParagraph(node, [`This call is coming from a public kiosk, which is usually an indication that the person on the other end is a transient individual who has decided to take slavery over homelessness. In this case, however, the story is more unusual — the callers seem stressed, but otherwise normal. They haltingly and quietly explain that they are a father and ${daughter2} who had to flee their home after ${his} wife found out ${he} was having sex with their ${daughter2}. They feel that life in an arcology together, even as slaves, would be better than their current life on the streets.`]);

		App.Events.addParagraph(node, [`${capFirstChar(V.assistant.name)} assembles a dossier of information and photos from information they've sent describing their bodies and skills, to be used as a substitute for an in-person inspection.`]);

		App.UI.DOM.appendNewElement("p", node, `It would cost ${cashFormat(contractCost)} to enslave the two of them.`, ["detail"]);

		const newSlaves = [father, son];

		node.append(App.UI.MultipleInspect(newSlaves, true, "generic"));
		const choices = [];

		if (V.cash >= contractCost) {
			choices.push(new App.Events.Result(`Buy them both`, both, `This will cost ${cashFormat(contractCost)}`));
		} else {
			choices.push(new App.Events.Result(null, null, `You lack the necessary funds to enslave them.`));
		}
		App.Events.addResponses(node, choices);

		function both() {
			newSlave(son);
			newSlave(father);
			cashX(forceNeg(contractCost / 2), "slaveTransfer", father);
			cashX(forceNeg(contractCost / 2), "slaveTransfer", son);
			return [
				`The father hugs ${his} ${daughter2} tight and slips a hand down ${his2} pants. They ought to be an interesting addition to your penthouse.`,
				newSlaveIncestSex(father, son)
			];
		}
	}
};
