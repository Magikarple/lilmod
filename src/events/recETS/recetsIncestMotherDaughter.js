App.Events.recetsIncestMotherDaughter = class recetsIncestMotherDaughter extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.seeDicks !== 100,
			() => V.seeIncest !== 0,
			() => V.rep / 400 > random(1, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}

	get eventName() {
		return `Mother Daughter Incest`;
	}

	execute(node) {
		App.UI.StoryCaption.encyclopedia = "Enslaving People";
		const contractCost = 10000 * 2;
		const mother = GenerateNewSlave("XX", {
			minAge: Math.max(V.fertilityAge + 20, V.minimumSlaveAge + 20), maxAge: 40, ageOverridesPedoMode: 1, disableDisability: 1
		});
		mother.origin = "$He offered to become your slave to protect $his incestuous relationship.";
		mother.career = "a housewife";
		mother.devotion = random(-15, 15);
		mother.trust = random(-15, 15);
		mother.oldDevotion = mother.devotion;
		mother.vagina = 2;
		mother.ovaries = 1;
		mother.counter.birthsTotal++;
		mother.face = random(15, 60);
		mother.skill.vaginal = 35;
		mother.anus = 1;
		mother.boobs += 600;
		mother.lactation = 1;
		mother.lactationDuration = 2;
		mother.boobsImplant = 0;
		mother.boobsImplantType = "none";
		mother.butt += 2;
		mother.buttImplant = 0;
		mother.buttImplantType = "none";
		mother.clothes = "conservative clothing";
		setHealth(mother, jsRandom(20, 40), 0, 0, 0);
		mother.pubicHStyle = "bushy";
		mother.energy = Math.max(mother.energy, 40);
		mother.attrXX = Math.max(mother.attrXX, 70);
		if (mother.behavioralFlaw === "hates women") {
			mother.behavioralFlaw = "none";
		}
		mother.behavioralQuirk = "sinful";
		mother.canRecruit = 0;
		mother.relationship = 3;

		const daughter = generateRelatedSlave(mother, "daughter");
		daughter.career = "a student";
		daughter.vagina = 0;
		daughter.counter.birthsTotal = 0;
		daughter.skill.vaginal = 15;
		daughter.anus = 0;
		daughter.boobs = Math.max(daughter.boobs - 300, 0);
		daughter.lactation = 0;
		daughter.lactationDuration = 0;
		daughter.boobsImplant = 0;
		daughter.boobsImplantType = "none";
		daughter.energy = Math.max(daughter.energy, 40);
		daughter.attrXX = Math.max(daughter.attrXX, 70);
		if (daughter.behavioralFlaw === "hates women") {
			daughter.behavioralFlaw = "none";
		}
		daughter.relationship = 3;
		daughter.relationshipTarget = mother.ID;

		mother.relationshipTarget = daughter.ID;

		const {
			He,
			he, his
		} = getPronouns(mother);
		const {
			daughter2, his2, him2
		} = getPronouns(daughter).appendSuffix("2");
		const {
			HeA
		} = getPronouns(assistant.pronouns().main).appendSuffix("A");

		App.Events.addParagraph(node, [`You receive so many messages, as a noted titan of the new Free Cities world, that ${V.assistant.name} has to be quite draconian in culling them. ${HeA} lets only the most important through to you. One category of message that always gets through regardless of content, though, is requests for voluntary enslavement. As the new world takes shape, they've become less rare than they once were.`]);

		App.Events.addParagraph(node, [`This call is coming from a public kiosk, which is usually an indication that the person on the other end is a transient individual who has decided to take slavery over homelessness. In this case, however, the story is more unusual — the callers seem stressed, but otherwise normal. They haltingly and quietly explain that they are a mother and ${daughter2} who had to flee their home after ${his} husband found out ${he} was having sex with their ${daughter2}. They feel that life in an arcology together, even as slaves, would be better than their current life on the streets.`]);

		App.Events.addParagraph(node, [`${capFirstChar(V.assistant.name)} assembles a dossier of information and photos from information they've sent describing their bodies and skills, to be used as a substitute for an in-person inspection.`]);

		App.UI.DOM.appendNewElement("p", node, `It would cost ${cashFormat(contractCost)} to enslave the two of them.`, ["detail"]);

		const newSlaves = [mother, daughter];

		node.append(App.UI.MultipleInspect(newSlaves, true, "generic"));
		const choices = [];

		if (V.cash >= contractCost) {
			choices.push(new App.Events.Result(`Buy them both`, both, `This will cost ${cashFormat(contractCost)}`));
		} else {
			choices.push(new App.Events.Result(null, null, `You lack the necessary funds to enslave them.`));
		}
		App.Events.addResponses(node, choices);

		function both() {
			newSlave(daughter);
			newSlave(mother);
			cashX(forceNeg(contractCost / 2), "slaveTransfer", mother);
			cashX(forceNeg(contractCost / 2), "slaveTransfer", daughter);
			return [
				`The ${daughter2} cheers happily and hugs ${his2} relieved mother. ${He} leans in and kisses ${him2} deeply. They ought to be an interesting addition to your penthouse.`,
				newSlaveIncestSex(mother, daughter)
			];
		}
	}
};
