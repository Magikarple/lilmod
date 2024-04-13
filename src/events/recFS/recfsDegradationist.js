App.Events.recFSDegradationist = class recFSDegradationist extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
		];
	}

	actorPrerequisites() {
		return [];
	}

	get weight() {
		return V.arcologies[0].FSDegradationist > random(1, 100) ? 1 : 0;
	}

	execute(node) {
		let r = [];
		const slave = GenerateNewSlave("XX", {minAge: 11, maxAge: 42, disableDisability: 1});
		slave.origin = "$He was sold to you by an anonymous person who wanted $him to suffer.";
		generateSalonModifications(slave);
		slave.boobsImplant += random(4, 6)*200;
		slave.boobs += slave.boobsImplant;
		slave.boobsImplantType = "normal";
		if (slave.boobsImplant / slave.boobs >= 0.90) {
			slave.boobShape = "spherical";
			slave.nipples = "flat";
		} else {
			slave.boobShape = "normal";
			slave.nipples = "huge";
		}
		slave.nipples = "huge";
		slave.areolae = 1;
		slave.butt++;
		slave.buttImplant++;
		slave.buttImplantType = "normal";
		slave.lips += 10;
		slave.lipsImplant += 10;
		slave.face = Math.clamp(slave.face+20, -100, 100);
		slave.faceImplant += 40;
		slave.devotion = random(-45, -25);
		slave.trust = random(-45, -25);
		setHealth(slave, jsRandom(20, 40), undefined, undefined, 0, 40);
		slave.anus = 2;
		slave.vagina = 2;
		slave.weight = 0;
		slave.piercing.genitals.weight = 1;
		slave.piercing.tongue.weight = 1;
		slave.piercing.nipple.weight = 1;
		slave.piercing.nose.weight = 1;
		slave.piercing.ear.weight = 1;
		slave.skill.vaginal = random(50, 100);
		slave.skill.oral = random(50, 100);
		slave.skill.anal = random(50, 100);
		slave.skill.whoring = random(50, 100);
		slave.skill.entertainment = random(50, 100);
		slave.pubicHStyle = "waxed";
		slave.underArmHStyle = "waxed";
		slave.behavioralFlaw = either("anorexic", "arrogant", "bitchy");

		const {
			He,
			his, he, him
		} = getPronouns(slave);
		const {HeA, himA} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const {womanP} = getPronouns(V.PC).appendSuffix("P");
		const contractCost = 2000;
		const cost = slaveCost(slave) - contractCost;
		r.push(`${capFirstChar(V.assistant.name)} does not typically permit anonymous messages through to you. If someone wishes to speak to you, they can do so under their own name and with their own face. ${HeA} makes an exception, however, for a message offering you a slave so long as you pay the costs of enslavement, nothing else.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`The face and voice are obscured by a petty anonymization program, the sort that can be obtained with five minutes' work in the shadier parts of the net. ${capFirstChar(V.assistant.name)} could crack it nearly instantaneously, but you hold ${himA} back a moment to avoid spooking your correspondent. You are rewarded with video of the subject of the proposed enslavement, and the simple statement "I hate this fucking bitch, and I want ${him} to suffer. Can't do it myself. You seem like the right ${womanP} to break the cunt."`);

		App.Events.addParagraph(node, r);

		node.append(App.Desc.longSlave(slave, {market: "generic"}));

		const choices = [];

		if (V.cash >= contractCost) {
			choices.push(new App.Events.Result(`Enslave ${him}`, enslave, `This will cost ${cashFormat(contractCost)}`));
			choices.push(new App.Events.Result(`Sell ${him} immediately`, sell, `This will bring in ${cashFormat(cost)}`));
		} else {
			choices.push(new App.Events.Result(null, null, `You lack the necessary funds to enslave ${him}.`));
		}
		App.Events.addResponses(node, choices);

		function enslave() {
			const frag = new DocumentFragment();
			r = [];
			r.push(`When ${he} arrives as part of the anonymous slave transfers that make up a good part of the inter-arcology commerce, ${he} has clearly had some time to mull over ${his} situation. As soon as ${he} sees you, ${he} blurts out, "Whatever that fucker told you, it isn't true. I'll be your little bitch bimbo, whatever you want. Just don't — just don't fucking hurt me." ${He} sticks out ${his} chest in a clear attempt to entice you with ${his} fake tits.`);

			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function sell() {
			cashX(cost, "slaveTransfer");
			return `When ${he} arrives as part of the anonymous slave transfers that make up a good part of the inter-arcology commerce, ${he} has clearly had some time to mull over ${his} situation. As soon as ${he} sees you, ${he} blurts out, "Whatever that fucker told you, it isn't true. I'll be your little bitch bimbo, whatever you want. Just don't — just don't fucking hurt me." ${He} sticks out ${his} chest in a clear attempt to entice you with ${his} fake tits, and is rewarded with a bag over ${his} head, courtesy of the purchaser's agent who arrived in the meantime. The agent clearly felt that ${he} would be a handful worth corralling quickly, and this proves correct. ${He} goes limp after being tased, though.`;
		}
	}
};
