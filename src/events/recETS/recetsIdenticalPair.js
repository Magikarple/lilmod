App.Events.recetsIdenticalPair = class recetsIdenticalPair extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.seeDicks !== 100,
			() => V.rep / 400 > random(1, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}

	get eventName() {
		return `Identical Pair`;
	}

	execute(node) {
		App.UI.StoryCaption.encyclopedia = "Enslaving People";
		const thing1 = GenerateNewSlave("XX", {minAge: V.minimumSlaveAge, maxAge: 21, disableDisability: 1});
		thing1.origin = "$He was brought up in a radical slave school to match $his twin.";
		thing1.career = "a slave";
		thing1.devotion = random(25, 45);
		thing1.trust = random(-15, 15);
		thing1.oldDevotion = thing1.devotion;
		setHealth(thing1, jsRandom(0, 20), undefined, undefined, 0, 0);
		thing1.anus = 1;
		thing1.dick = 0;
		thing1.foreskin = 0;
		thing1.balls = 0;
		thing1.scrotum = 0;
		thing1.clit = 2;
		thing1.vagina = 1;
		thing1.weight = 0;
		thing1.face = 15;
		thing1.faceShape = "cute";
		thing1.energy = Math.max(thing1.energy, 40);
		thing1.attrXX = Math.max(thing1.attrXX, 70);
		if (thing1.physicalAge >= 12) {
			thing1.teeth = "normal";
		}
		thing1.skill.vaginal = 15;
		thing1.skill.oral = 15;
		thing1.skill.anal = 15;
		thing1.skill.penetrative = 0;
		if (thing1.physicalAge >= random(13, 17)) {
			thing1.boobs = either(500, 600);
			thing1.natural.boobs = thing1.boobs;
			thing1.boobsImplant = 0;
			thing1.boobsImplantType = "none";
			thing1.butt = either(2, 3);
			thing1.buttImplant = 0;
			thing1.buttImplantType = "none";
		}
		thing1.preg = -1;
		thing1.hStyle = "tails";
		thing1.pubicHStyle = "waxed";
		thing1.sexualFlaw = "none";
		thing1.behavioralFlaw = "none";
		setMissingParents(thing1);
		thing1.canRecruit = 0;
		thing1.relationship = 2;
		const contractCost = slaveCost(thing1) * 2;

		const thing2 = generateRelatedSlave(thing1, "twin");
		thing2.career = "a slave";
		thing2.energy = Math.max(thing2.energy, 40);
		thing2.attrXX = Math.max(thing2.attrXX, 70);
		thing2.relationship = 2;
		thing2.relationshipTarget = thing1.ID;

		thing1.relationshipTarget = thing2.ID;

		const {His} = getPronouns(thing1);
		const {sister2} = getPronouns(thing2).appendSuffix("2");

		App.Events.addParagraph(node, [
			`A pair of young slaves is going door to door offering themselves for sale on behalf of their owner. It's rare to see a slave obedient enough to be entrusted with their own sale, and the price alone suggests there's something interesting, so you let them up. They stand in front of your desk and wait for instructions. They appear to be twins, and are dressed identically: they're wearing very skimpy miniskirts and bikini tops so brief that their areolae are clearly visible around the scrap of cloth over each nipple. You instruct them to tell you about themselves.`
		]);

		App.Events.addParagraph(node, [
			`One of them speaks up.`,
			Spoken(thing2, `"We're twins, ${(V.PC.title !== 0) ? "sir" : "ma'am"}. Identical twins. We've also been trained ${(thing2.actualAge > V.minimumSlaveAge) ? `ever since we turned ${num(V.minimumSlaveAge)}` : ``} to be completely obedient, ${(V.PC.title !== 0) ? "sir" : "ma'am"}, in everything, and sexually proficient."`)
		]);

		App.Events.addParagraph(node, [Spoken(thing2, `"We cost ${cashFormat(contractCost)}, ${(V.PC.title !== 0) ? "sir" : "ma'am"}."`)]);
		App.UI.DOM.appendNewElement("p", node, `${His} ${sister2} is identical.`, ["detail"]);

		const newSlaves = [thing1, thing2];

		node.append(App.UI.MultipleInspect(newSlaves, true, "generic"));
		const choices = [];

		if (V.cash >= contractCost) {
			choices.push(new App.Events.Result(`Buy them both`, both, `This will cost ${cashFormat(contractCost)}`));
		} else {
			choices.push(new App.Events.Result(null, null, `You lack the necessary funds to enslave them.`));
		}
		App.Events.addResponses(node, choices);

		function both() {
			newSlave(thing1);
			newSlave(thing2);
			cashX(forceNeg(contractCost / 2), "slaveTransfer", thing1);
			cashX(forceNeg(contractCost / 2), "slaveTransfer", thing2);
			return App.UI.DOM.combineNodes(
				`They giggle and kiss each other rather sexually, pressing their nearly identical bodies closely together. They're clearly very well trained.`,
				newSlaveIncestSex(thing1, thing2)
			);
		}
	}
};
