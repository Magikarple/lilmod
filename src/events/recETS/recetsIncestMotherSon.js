App.Events.recetsIncestMotherSon = class recetsIncestMotherSon extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.seeDicks !== 100,
			() => V.seeDicks !== 0,
			() => V.seeIncest !== 0,
			() => V.rep / 400 > random(1, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}

	get eventName() {
		return `Mother Son Incest`;
	}

	execute(node) {
		App.UI.StoryCaption.encyclopedia = "Enslaving People";
		const contractCost = 10000 * 2;
		const mother = GenerateNewSlave("XX", {
			minAge: Math.max(V.fertilityAge + 20, V.potencyAge + 20, V.minimumSlaveAge + 20), maxAge: 40, ageOverridesPedoMode: 1, disableDisability: 1
		});
		mother.origin = "$He offered to become your slave to protect $his incestuous relationship.";
		mother.career = "a housewife";
		mother.devotion = random(-15, 15);
		mother.trust = random(-15, 15);
		mother.oldDevotion = mother.devotion;
		mother.oldTrust = mother.trust;
		mother.vagina = 2;
		mother.ovaries = 1;
		mother.counter.birthsTotal++;
		mother.face = 15;
		mother.skill.vaginal = 35;
		mother.anus = 1;
		mother.boobs += 600;
		mother.boobsImplant = 0;
		mother.boobsImplantType = "none";
		mother.butt += 2;
		mother.buttImplant = 0;
		mother.buttImplantType = "none";
		mother.clothes = "conservative clothing";
		setHealth(mother, jsRandom(20, 40), 0, 0, 0);
		mother.pubicHStyle = "bushy";
		mother.energy = Math.max(mother.energy, 40);
		mother.attrXY = Math.max(mother.attrXY, 70);
		if (mother.behavioralFlaw === "hates men") {
			mother.behavioralFlaw = "none";
		}
		mother.behavioralQuirk = "sinful";
		mother.canRecruit = 0;
		mother.relationship = 3;

		const son = generateRelatedSlave(mother, "son");
		son.career = "a student";
		son.faceShape = "cute";
		son.boobs = 100;
		son.anus = 0;
		son.skill.penetrative = 15;
		son.energy = Math.max(son.energy, 40);
		son.attrXX = Math.max(son.attrXX, 70);
		if (son.behavioralFlaw === "hates women") {
			son.behavioralFlaw = "none";
		}
		son.behavioralQuirk = "none";
		son.sexualQuirk = "perverted";
		son.relationship = 3;
		son.relationshipTarget = mother.ID;

		mother.relationshipTarget = son.ID;

		if (V.seePreg) {
			while (son.actualAge < son.pubertyAgeXY) {
				ageSlave(son, true);
			}
			mother.lactation = 1;
			mother.lactationDuration = 2;
			mother.preg = random(20, 30);
			mother.pregType = either(1, 1, 1, 1, 1, 2, 2, 3);
			mother.pregKnown = 1;
			mother.pregSource = son.ID;
			mother.pregWeek = mother.preg;
			SetBellySize(mother);
			WombChangeGene(mother, "fatherName", son.slaveName);
			WombChangeGene(mother, "motherName", mother.slaveName);
		}

		const {He, his} = getPronouns(mother);
		const {
			daughter2, his2, him2
		} = getPronouns(son).appendSuffix("2");
		const {HeA} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const children = mother.pregType > 1 ? "children" : "child";

		App.Events.addParagraph(node, [`You receive so many messages, as a noted titan of the new Free Cities world, that ${V.assistant.name} has to be quite draconian in culling them. ${HeA} lets only the most important through to you. One category of message that always gets through regardless of content, though, is requests for voluntary enslavement. As the new world takes shape, they've become less rare than they once were.`]);

		App.Events.addParagraph(node, [`This call is coming from a public kiosk, which is usually an indication that the person on the other end is a transient individual who has decided to take slavery over homelessness. In this case, however, the story is more unusual — the callers seem stressed, but otherwise normal. They haltingly and quietly explain that they are a mother and ${daughter2} who had to flee their home after ${his} husband ${V.seePreg ? `found out ${his} rounded middle contained not his ${children}, but his ${daughter2}'s` : `caught them in the act of incest`}. They feel that life in an arcology together, even as slaves, would be better than their new life on the streets.`]);

		App.Events.addParagraph(node, [`${capFirstChar(V.assistant.name)} assembles a dossier of information and photos from information they've sent describing their bodies and skills, to be used as a substitute for an in-person inspection.`]);

		App.UI.DOM.appendNewElement("p", node, `It would cost ${cashFormat(contractCost)} to enslave the two of them.`, ["detail"]);

		const newSlaves = [mother, son];

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
			newSlave(mother);
			cashX(forceNeg(contractCost / 2), "slaveTransfer", mother);
			cashX(forceNeg(contractCost / 2), "slaveTransfer", son);
			return [
				`The ${daughter2} cheers happily and hugs ${his2} relieved mother. ${He} leans in and kisses ${him2} deeply. They ought to be an interesting addition to your penthouse.`,
				newSlaveIncestSex(mother, son)
			];
		}
	}
};
