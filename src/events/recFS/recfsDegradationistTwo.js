App.Events.recFSDegradationistTwo = class recFSDegradationistTwo extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
			() => V.arcologies[0].FSDegradationist > random(1, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}

	execute(node) {
		let r = [];
		const slave = GenerateNewSlave("XX", {
			minAge: 32, maxAge: 42, ageOverridesPedoMode: 1, disableDisability: 1
		});
		slave.origin = "$He was sold to you by an anonymous slave breaking group.";
		generateSalonModifications(slave);
		slave.boobsImplant += random(3, 6)*200;
		slave.boobs += slave.boobsImplant;
		slave.boobsImplantType = "normal";
		slave.areolae = 1;
		slave.butt++;
		slave.buttImplant++;
		slave.buttImplantType = "normal";
		slave.lips += 10;
		slave.lipsImplant += 10;
		slave.face = Math.clamp(slave.face+20, -100, 100);
		slave.devotion = random(-75, -55);
		slave.trust = random(-65, -45);
		setHealth(slave, jsRandom(-40, 20), normalRandInt(10, 3), normalRandInt(10, 3), undefined, jsRandom(30, 80));
		slave.anus = 2;
		slave.vagina = 2;
		slave.weight = 0;
		slave.piercing.genitals.weight = 1;
		slave.piercing.tongue.weight = 1;
		slave.piercing.nipple.weight = 1;
		slave.piercing.nose.weight = 1;
		slave.piercing.ear.weight = 1;
		slave.pubicHStyle = "waxed";
		slave.behavioralFlaw = either("arrogant", "bitchy");

		const {
			He,
			his, he, him, woman
		} = getPronouns(slave);
		const {HeA} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const contractCost = 2000;
		const cost = slaveCost(slave) - contractCost;

		r.push(`${capFirstChar(V.assistant.name)} does not typically permit anonymous messages through to you. If someone wishes to speak to you, they can do so under their own name and with their own face. ${HeA} makes an exception, however, for a message offering you a slave so long as you pay the costs of enslavement, nothing else.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`In lieu of a face, a plain page of mostly text and a scant few pictures fills the screen and details a number of potential slaves for sale, though most of the merchandise seems visibly too damaged to be worthy of purchase. Yet, one of the slaves catches your eye — an older ${woman} covered in lashes, bruises and marks yet absent the dead-eyed expression of ${his} peers. The document claims ${he} has been in their possession longer than any of the other slaves, but has proven resistant to their breaking methods.`);

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
			r.push(`When ${he} arrives as part of the anonymous slave transfers that make up a good part of the inter-arcology commerce, ${he} has clearly had some time to mull over ${his} situation. As soon as ${he} sees you, ${he} glares deep into your eyes and addresses you directly,`);
			r.push(Spoken(slave, `"Those fuckers threw everything they could at me; you can't break me. No one can."`));

			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function sell() {
			const frag = new DocumentFragment();
			r = [];
			cashX(cost, "slaveTransfer");
			r.push(`When ${he} arrives as part of the anonymous slave transfers that make up a good part of the inter-arcology commerce, ${he} has clearly had some time to mull over ${his} situation. As soon as ${he} sees you, ${he} glares deep into your eyes and addresses you directly,`);
			r.push(Spoken(slave, `"Those fuckers threw everything they could at me, you can't break me. No one can."`));
			r.push(`${He} is rewarded with a bag over ${his} head, courtesy of the purchaser's agent who arrived in the meantime. The agent clearly felt that ${he} would be a handful worth corralling quickly, and this proves correct. ${He} goes limp after being tased, though.`);
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
