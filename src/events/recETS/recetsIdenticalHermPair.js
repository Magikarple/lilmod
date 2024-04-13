App.Events.recetsIdenticalHermPair = class recetsIdenticalHermPair extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.seeDicks !== 0,
			() => V.seeDicks !== 100,
			() => V.seeIncest !== 0,
			() => V.rep / 400 > random(1, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}

	get eventName() {
		return `Identical Hermaphrodite Pair`;
	}

	execute(node) {
		App.UI.StoryCaption.encyclopedia = "Enslaving People";
		const thing1 = GenerateNewSlave("XX", {
			minAge: Math.max(V.fertilityAge, V.potencyAge), maxAge: 21, ageOverridesPedoMode: 1, disableDisability: 1
		});
		thing1.origin = "$He was brought up in a radical slave school to match $his twin.";
		thing1.career = "a slave";
		thing1.devotion = random(25, 45);
		thing1.trust = random(-15, 15);
		thing1.oldDevotion = thing1.devotion;
		setHealth(thing1, jsRandom(0, 20), undefined, undefined, 0, 10);
		thing1.anus = 1;
		thing1.dick = 5;
		thing1.foreskin = thing1.dick += either(-1, 0);
		thing1.balls = 6;
		thing1.scrotum = thing1.balls += either(-2, -1, -1, -1, 0, 0);
		thing1.clit = 0;
		thing1.vagina = 2;
		thing1.weight = 0;
		thing1.face = 15;
		thing1.faceShape = "cute";
		if (thing1.physicalAge >= 12) {
			thing1.teeth = "normal";
		}
		thing1.skill.vaginal = 15;
		thing1.skill.penetrative = 15;
		thing1.skill.oral = 15;
		thing1.skill.anal = 15;
		if (thing1.physicalAge >= random(13, 17)) {
			thing1.boobs = either(500, 600);
			thing1.natural.boobs = thing1.boobs;
			thing1.boobsImplant = 0;
			thing1.boobsImplantType = "none";
			thing1.butt = either(2, 3);
			thing1.buttImplant = 0;
			thing1.buttImplantType = "none";
		}
		thing1.pubertyXX = 1;
		thing1.pubertyXY = 1;
		thing1.hStyle = "tails";
		thing1.pubicHStyle = "waxed";
		thing1.energy = Math.max(thing1.energy, 40);
		thing1.attrXX = Math.max(thing1.attrXX, 70);
		thing1.attrXY = Math.max(thing1.attrXY, 70);
		thing1.sexualQuirk = "perverted";
		thing1.sexualFlaw = "none";
		thing1.behavioralFlaw = "none";
		setMissingParents(thing1);
		thing1.canRecruit = 0;
		thing1.relationship = 4;
		const contractCost = slaveCost(thing1) * 2;

		const thing2 = generateRelatedSlave(thing1, "twin");
		thing2.career = "a slave";
		thing2.energy = Math.max(thing2.energy, 40);
		thing2.attrXX = Math.max(thing2.attrXX, 70);
		thing2.attrXY = Math.max(thing2.attrXY, 70);
		thing2.sexualQuirk = "perverted";
		thing2.sexualFlaw = "none";
		thing2.behavioralFlaw = "none";
		thing2.relationship = 4;

		thing2.relationshipTarget = thing1.ID;
		thing1.relationshipTarget = thing2.ID;

		if (V.seePreg) {
			WombFlush(thing1);
			thing1.preg = 30;
			thing1.pregType = 2;
			thing1.pregSource = thing2.ID;
			thing1.pregKnown = 1;
			thing1.pregWeek = thing1.preg;
			thing1.belly = 14000;
			thing1.bellyPreg = 14000;
			thing1.fetish = "pregnancy";
			thing1.fetishStrength = 100;
			WombChangeGene(thing1, "fatherName", thing2.slaveName);

			WombFlush(thing2);
			thing2.preg = 30;
			thing2.pregType = 2;
			thing2.pregSource = thing1.ID;
			thing2.pregKnown = 1;
			thing2.pregWeek = thing2.preg;
			thing2.belly = 14000;
			thing2.bellyPreg = 14000;
			thing2.fetish = "pregnancy";
			thing2.fetishStrength = 100;
			WombChangeGene(thing2, "fatherName", thing1.slaveName);
		}

		const {His} = getPronouns(thing1);
		const {He2, sister2} = getPronouns(thing2).appendSuffix("2");

		App.Events.addParagraph(node, [
			`A pair of young slaves is going door to door offering themselves for sale on behalf of their owner. It's rare to see a slave obedient enough to be entrusted with their own sale, and the price alone suggests there's something interesting, so you let them up. They stand in front of your desk, an arm around the other, and wait for instructions. They appear to be twins, and are dressed identically: they're wearing very skimpy miniskirts, which fail to conceal their semi-erect cocks at all, bikini tops so brief that their areolae are clearly visible around the scrap of cloth over each nipple, and nothing ${V.seePreg ? `over their huge pregnant bellies` : `else to speak of`}. You instruct them to tell you about themselves.`
		]);

		App.Events.addParagraph(node, [
			`They pull themselves together, bringing their ${V.seePreg ? `gravid middles` : `unique bodies`} in tight contact with one another. One of them speaks up.`,
			Spoken(thing1, `"We're twins, ${(V.PC.title !== 0) ? "sir" : "ma'am"}. Identical twins. We've also been trained ${(thing2.actualAge > V.minimumSlaveAge) ? `ever since we turned ${num(V.minimumSlaveAge)}` : ``} to be completely obedient, ${(V.PC.title !== 0) ? "sir" : "ma'am"}, in everything, and sexually proficient."`)
		]);

		if (V.seePreg) {
			App.Events.addParagraph(node, [
				`The other blurts out.`,
				Spoken(thing2, `"But we kinda got too into each other, in more ways than one!"`),
				`${He2} winks.`
			]);
		}

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
			return [
				`They giggle and kiss each other rather passionately, their miniskirts ${V.seePreg ? `becoming pinned against their pregnancies` : `being lifted toward their navels`} by their stiffening pricks. They're very well trained but not very disciplined, though their pervertedness will be fun.`,
				Spoken(thing2, `"You know we ${V.seePreg ? `each are carrying the other's twins` : `took each other's virginities`}, right?"`),
				newSlaveIncestSex(thing1, thing2)
			];
		}
	}
};
