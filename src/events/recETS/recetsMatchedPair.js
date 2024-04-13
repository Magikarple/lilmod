App.Events.recetsMatchedPair = class recetsMatchedPair extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.seeDicks !== 0,
			() => V.seeDicks !== 100,
			() => V.rep / 400 > random(1, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}

	get eventName() {
		return `Matched Pair`;
	}

	execute(node) {
		App.UI.StoryCaption.encyclopedia = "Enslaving People";
		const sis1 = GenerateNewSlave("XY", {minAge: 12, maxAge: 21, disableDisability: 1});
		sis1.origin = "$He was brought up in a radical slave school to match $his twin.";
		sis1.career = "a slave";
		sis1.devotion = random(25, 45);
		sis1.trust = random(-15, 15);
		sis1.oldDevotion = sis1.devotion;
		setHealth(sis1, jsRandom(0, 20), undefined, undefined, 0, 0);
		sis1.anus = 1;
		sis1.vagina = -1;
		sis1.dick = 1;
		if (sis1.foreskin > 0) {
			sis1.foreskin = sis1.dick;
		}
		if (sis1.balls > 0) {
			sis1.scrotum = sis1.balls;
		}
		sis1.balls = 1;
		sis1.ovaries = 0;
		sis1.clit = 0;
		sis1.weight = 0;
		sis1.face = 15;
		sis1.skill.vaginal = 0;
		sis1.skill.oral = 15;
		sis1.skill.anal = 15;
		sis1.skill.penetrative = 15;
		sis1.boobs = either(500, 600);
		sis1.natural.boobs = sis1.boobs; // This is for sis2 to inherit.
		sis1.boobsImplant = 400;
		sis1.boobsImplantType = "normal";
		sis1.butt = either(2, 3);
		sis1.buttImplant = 1;
		sis1.buttImplantType = "normal";
		sis1.preg = -3;
		sis1.hStyle = "tails";
		sis1.pubicHStyle = "waxed";
		sis1.underArmHStyle = "waxed";
		sis1.energy = Math.max(sis1.energy, 40);
		sis1.attrXX = Math.max(sis1.attrXX, 70);
		sis1.sexualFlaw = "none";
		sis1.behavioralFlaw = "none";
		setMissingParents(sis1);
		sis1.canRecruit = 0;
		sis1.relationship = 2;
		const contractCost = slaveCost(sis1) * 2;

		const sis2 = generateRelatedSlave(sis1, "twin", true);
		sis2.career = "a slave";
		sis2.vagina = 1;
		sis2.preg = -1;
		sis2.dick = 0;
		sis2.scrotum = 0;
		sis2.clit = 2;
		sis2.ovaries = 1;
		sis2.balls = 0;
		sis2.skill.vaginal = 15;
		sis2.skill.penetrative = 0;
		sis2.boobsImplant = 0;
		sis2.boobsImplantType = "none";
		sis2.buttImplant = 0;
		sis2.buttImplantType = "none";
		sis2.energy = Math.max(sis2.energy, 40);
		sis2.attrXX = Math.max(sis2.attrXX, 70);
		sis2.attrXY = Math.max(sis2.attrXY, 70);
		sis2.sexualFlaw = "none";
		sis2.behavioralFlaw = "none";
		sis2.relationship = 2;

		sis2.relationshipTarget = sis1.ID;
		sis1.relationshipTarget = sis2.ID;

		const {His, his} = getPronouns(sis1);
		const {he2, sister2} = getPronouns(sis2).appendSuffix("2");

		let r = [];

		App.Events.addParagraph(node, [
			`A pair of young slaves is going door to door offering themselves for sale on behalf of their owner. It's rare to see a slave obedient enough to be entrusted with their own sale, and the price alone suggests there's something interesting, so you let them up. They stand in front of your desk and wait for instructions. They appear to be twins, and are dressed identically: they're wearing very skimpy miniskirts and bikini tops so brief that their areolae are clearly visible around the scrap of cloth over each nipple. You instruct them to tell you about themselves.`
		]);

		App.Events.addParagraph(node, r);
		r = [];
		r.push(
			`One of them speaks up.`,
			Spoken(sis2, `"We're twins, ${(V.PC.title !== 0) ? "sir" : "ma'am"}. Fraternal twins. We have been given hormone treatments and surgery to match one another more closely, except for one detail."`),
			`They lift their skirts; the speaker has a hormone-atrophied cock, while ${his} ${sister2} has a pussy, along with a large clit that almost matches ${his} sibling's member in size.`,
			Spoken(sis2, `"We've also been trained ever since we turned ${num(V.minimumSlaveAge)} to be completely obedient, ${(V.PC.title !== 0) ? "sir" : "ma'am"}, in everything, and sexually proficient."`)
		);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(Spoken(sis2, `"We cost ${cashFormat(contractCost)}, ${(V.PC.title !== 0) ? "sir" : "ma'am"}."`));
		App.Events.addParagraph(node, r);
		App.UI.DOM.appendNewElement("p", node, `${His} ${sister2} is identical except that ${he2} is naturally female and lacks implants, having reached that size the normal way.`, ["detail"]);

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
			newSlave(sis1);
			newSlave(sis2);
			cashX(forceNeg(contractCost / 2), "slaveTransfer", sis1);
			cashX(forceNeg(contractCost / 2), "slaveTransfer", sis2);
			return [
				`They giggle and kiss each other rather sexually, pressing their nearly identical bodies closely together so their hips and shapely buttocks hide any sign of their difference. They're clearly very well trained.`,
				newSlaveIncestSex(sis1, sis2)];
		}
	}
};
