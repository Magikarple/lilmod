App.Events.recetsIncestFatherDaughter = class recetsIncestFatherDaughter extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.seeDicks !== 100,
			() => V.seeDicks !== 0,
			() => V.seeIncest !== 0,
			() => !FutureSocieties.isActive('FSRestart'),
			() => V.rep / 400 > random(1, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}

	get eventName() {
		return `Father Daughter Incest`;
	}

	execute(node) {
		App.UI.StoryCaption.encyclopedia = "Enslaving People";
		const contractCost = 10000 * 2;
		const father = GenerateNewSlave("XY", {
			minAge: Math.max(V.potencyAge + 20, V.fertilityAge + 20, V.minimumSlaveAge + 20), maxAge: 40, ageOverridesPedoMode: 1, disableDisability: 1
		});
		father.origin = "$He offered to become your slave to protect $his incestuous relationship.";
		father.devotion = random(-15, 15);
		father.trust = random(-15, 15);
		father.oldDevotion = father.devotion;
		father.dick = 4;
		father.balls = 3;
		father.scrotum = 3;
		father.skill.penetrative = 60;
		father.face = 15;
		father.faceShape = "masculine";
		father.clothes = "conservative clothing";
		setHealth(father, jsRandom(20, 40), 0, 0, 0);
		father.energy = Math.max(father.energy, 40);
		father.attrXX = Math.max(father.attrXX, 70);
		if (father.behavioralFlaw === "hates women") {
			father.behavioralFlaw = "none";
		}
		father.behavioralQuirk = "sinful";
		father.canRecruit = 0;
		father.relationship = 3;

		const daughter = generateRelatedSlave(father, "daughter");
		daughter.career = "a student";
		daughter.vagina = 3;
		daughter.clit = 1;
		daughter.ovaries = 1;
		daughter.voice = 2;
		daughter.skill.vaginal = 50;
		daughter.boobs = (random(3, 6) * 100);
		daughter.faceShape = "cute";
		daughter.energy = Math.max(daughter.energy, 40);
		daughter.attrXY = Math.max(daughter.attrXY, 70);
		if (daughter.behavioralFlaw === "hates men") {
			daughter.behavioralFlaw = "none";
		}
		daughter.behavioralQuirk = "none";
		daughter.sexualQuirk = "perverted";
		daughter.relationship = 3;
		daughter.relationshipTarget = father.ID;

		father.relationshipTarget = daughter.ID;

		if (V.seePreg) {
			while (daughter.actualAge < daughter.pubertyAgeXX) {
				ageSlave(daughter, true);
			}
			daughter.preg = random(20, 30);
			daughter.pregType = either(1, 1, 1, 1, 1, 2, 2, 3);
			daughter.pregKnown = 1;
			daughter.pregSource = father.ID;
			daughter.pregWeek = daughter.preg;
			SetBellySize(daughter);
			WombChangeGene(daughter, "fatherName", father.slaveName);
			WombChangeGene(daughter, "motherName", daughter.slaveName);
		}

		const {
			He,
			he, his
		} = getPronouns(father);
		const {
			His2,
			daughter2, his2, him2
		} = getPronouns(daughter).appendSuffix("2");
		const {
			HeA
		} = getPronouns(assistant.pronouns().main).appendSuffix("A");

		App.Events.addParagraph(node, [`You receive so many messages, as a noted titan of the new Free Cities world, that ${V.assistant.name} has to be quite draconian in culling them. ${HeA} lets only the most important through to you. One category of message that always gets through regardless of content, though, is requests for voluntary enslavement. As the new world takes shape, they've become less rare than they once were.`]);

		App.Events.addParagraph(node, [`This call is coming from a public kiosk, which is usually an indication that the person on the other end is a transient individual who has decided to take slavery over homelessness. In this case, however, the story is more unusual — the callers seem stressed, but otherwise normal. They haltingly and quietly explain that they are a father and ${daughter2} who had to flee their home after ${his} wife found out ${he} was having sex with their ${daughter2}. ${V.seePreg ? `${His2} gravid middle is testament to that. ` : ``}They feel that life in an arcology together, even as slaves, would be better than their current life on the streets.`]);

		App.Events.addParagraph(node, [`${capFirstChar(V.assistant.name)} assembles a dossier of information and photos from information they've sent describing their bodies and skills, to be used as a substitute for an in-person inspection.`]);

		App.UI.DOM.appendNewElement("p", node, `It would cost ${cashFormat(contractCost)} to enslave the two of them.`, ["detail"]);

		const newSlaves = [father, daughter];

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
			newSlave(father);
			cashX(forceNeg(contractCost / 2), "slaveTransfer", father);
			cashX(forceNeg(contractCost / 2), "slaveTransfer", daughter);
			return [
				`The ${daughter2} cheers happily and hugs ${his2} relieved father. ${He} leans in and kisses ${him2} deeply. They ought to be an interesting addition to your penthouse.`,
				newSlaveIncestSex(father, daughter)
			];
		}
	}
};
