App.Events.recetsIncestBrotherSister = class recetsIncestBrotherSister extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.seeDicks !== 100,
			() => V.seeDicks !== 0,
			() => V.seeIncest !== 0,
			() => V.rep / 400 > random(1, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}

	get eventName() {
		return `Brother Sister Incest `;
	}

	execute(node) {
		App.UI.StoryCaption.encyclopedia = "Enslaving People";
		const contractCost = 10000 * 2;
		const sis = GenerateNewSlave("XX", {
			minAge: Math.max(V.fertilityAge, V.potencyAge + 2, V.minimumSlaveAge + 2), maxAge: 20, ageOverridesPedoMode: 1, disableDisability: 1
		});
		sis.origin = "$He offered to become your slave to protect $his incestuous relationship.";
		sis.career = "a dropout";
		sis.devotion = random(-15, 15);
		sis.trust = random(-15, 15);
		sis.oldDevotion = sis.devotion;
		sis.ovaries = 1;
		sis.vagina = 1;
		sis.face = random(15, 40);
		sis.skill.vaginal = 15;
		sis.clothes = "cutoffs and a t-shirt";
		setHealth(sis, jsRandom(20, 40), 0, 0, 0);
		sis.pubicHStyle = "in a strip";
		sis.energy = Math.max(sis.energy, 40);
		sis.attrXY = Math.max(sis.attrXY, 70);
		if (sis.behavioralFlaw === "hates men") {
			sis.behavioralFlaw = "none";
		}
		sis.behavioralQuirk = "sinful";
		setMissingParents(sis);
		sis.canRecruit = 0;
		sis.relationship = 3;

		const bro = generateRelatedSlave(sis, "younger brother");
		bro.pubicHStyle = "shaved";
		bro.energy = Math.max(bro.energy, 40);
		bro.attrXX = Math.max(bro.attrXX, 70);
		if (bro.behavioralFlaw === "hates women") {
			bro.behavioralFlaw = "none";
		}
		bro.relationship = 3;
		bro.relationshipTarget = sis.ID;

		sis.relationshipTarget = bro.ID;

		if (V.seePreg) {
			while (bro.actualAge < bro.pubertyAgeXY) {
				ageSlave(bro, true);
			}
			sis.preg = random(20, 30);
			sis.pregType = either(1, 1, 1, 1, 1, 2, 2, 3);
			sis.pregKnown = 1;
			sis.pregSource = bro.ID;
			sis.pregWeek = sis.preg;
			SetBellySize(sis);
			WombChangeGene(sis, "fatherName", bro.slaveName);
			WombChangeGene(sis, "motherName", sis.slaveName);
		}

		const {
			His, sister
		} = getPronouns(sis);
		const {
			sister2
		} = getPronouns(bro).appendSuffix("2");
		const {
			HeA
		} = getPronouns(assistant.pronouns().main).appendSuffix("A");

		App.Events.addParagraph(node, [`You receive so many messages, as a noted titan of the new Free Cities world, that ${V.assistant.name} has to be quite draconian in culling them. ${HeA} lets only the most important through to you. One category of message that always gets through regardless of content, though, is requests for voluntary enslavement. As the new world takes shape, they've become less rare than they once were.`]);

		App.Events.addParagraph(node, [`This call is coming from a public kiosk, which is usually an indication that the person on the other end is a transient individual who has decided to take slavery over homelessness. In this case, however, the story is more unusual — the callers seem stressed, but otherwise normal. They haltingly and quietly explain that they are a ${sister2} and ${sister} who had to flee their home after their parents found out they were having sex with each other. ${V.seePreg ? `${His} gravid middle is testament to that. ` : ``}They feel that life in an arcology together, even as slaves, would be better than their current life on the streets.`]);

		App.Events.addParagraph(node, [`${capFirstChar(V.assistant.name)} assembles a dossier of information and photos from information they've sent describing their bodies and skills, to be used as a substitute for an in-person inspection.`]);

		App.UI.DOM.appendNewElement("p", node, `It would cost ${cashFormat(contractCost)} to enslave the two of them.`, ["detail"]);

		const newSlaves = [sis, bro];

		node.append(App.UI.MultipleInspect(newSlaves, true, "generic"));
		const choices = [];

		if (V.cash >= contractCost) {
			choices.push(new App.Events.Result(`Buy them both`, both, `This will cost ${cashFormat(contractCost)}`));
		} else {
			choices.push(new App.Events.Result(null, null, `You lack the necessary funds to enslave them.`));
		}
		App.Events.addResponses(node, choices);

		function both() {
			newSlave(bro);
			newSlave(sis);
			cashX(forceNeg(contractCost / 2), "slaveTransfer", sis);
			cashX(forceNeg(contractCost / 2), "slaveTransfer", bro);
			return [
				`They cheer happily and hug each other tightly. They ought to be an interesting addition to your penthouse.`,
				newSlaveIncestSex(sis, bro)
			];
		}
	}
};
