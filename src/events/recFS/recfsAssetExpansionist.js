App.Events.recFSAssetExpansionist = class recFSAssetExpansionist extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
		];
	}

	actorPrerequisites() {
		return [];
	}

	get weight() {
		return V.arcologies[0].FSAssetExpansionist > random(1, 100) ? 1 : 0;
	}

	execute(node) {
		let r = [];
		const slave = GenerateNewSlave(null, {minAge: 16, maxAge: 19, disableDisability: 1});
		slave.birthWeek = random(1, 8);
		generateSalonModifications(slave);
		slave.origin = "$He offered $himself to you for enslavement after following a dangerous, illegal growth hormone regimen.";
		slave.boobs += random(10, 20)*200;
		slave.nipples = "puffy";
		slave.areolae = 3;
		slave.weight = 50;
		slave.butt += random(2, 4);
		slave.lips = 35;
		slave.devotion = random(-15, 15);
		slave.trust = random(-15, 15);
		setHealth(slave, jsRandom(-40, -30), undefined, normalRandInt(10, 3), Math.max(normalRandInt(1, 0.5), 0));
		slave.intelligence = random(0, 90);
		slave.pubicHStyle = "waxed";
		slave.underArmHStyle = "waxed";
		slave.behavioralFlaw = either("anorexic", "odd");

		const {
			His, He,
			his, he, him, himself
		} = getPronouns(slave);
		const {HeA} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const contractCost = sexSlaveContractCost();
		const cost = slaveCost(slave) - contractCost;
		r.push(`You receive so many messages, as a noted titan of the new Free Cities world, that ${V.assistant.name} has to be quite draconian in culling them. ${HeA} lets only the most important through to you. One category of message that always gets through regardless of content, though, is requests for voluntary enslavement. As the new world takes shape, they've become less rare than they once were.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`The person placing the call is physically quite unusual, to the point of looking distinctly unnatural. ${He} has absolutely enormous tits, an ass to match, and is generally plush all over; yet despite being able to compete with the lushest mother in the curves department, ${he} appears to be very young. ${He} explains ${himself} quickly.`);
		r.push(Spoken(slave, `"${(V.PC.title !== 0) ? "Sir" : "Ma'am"}, I just turned ${slave.actualAge}. Where I'm from, that means I'm very likely to be enslaved one way or another. So, I've been taking off-market hormones for a couple of years to raise myself out of the gutter as far as who might take me. I hear life is better if you're a valuable slave."`));
		r.push(`${He} leans into the camera, displaying a solid acre of cleavage.`);
		r.push(Spoken(slave, `"Can I be your valuable slave?"`));

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
			r.push(`When ${he} arrives, it's clear ${he}'s nobody's fool. ${He} comes without personal effects of any kind, and is wearing cheap, sturdy clothes to travel in, since ${he} knows ${he}'ll be taking them off immediately. ${He} does, without being told, just as soon as the enslavement formalities are out of the way. ${His} breasts are capped by titanic, puffy nipples; ${he} notices you appreciating them and gives you a hesitant little smile, swaying ${his} shoulders back and forth a little to set ${his} flesh deliciously into motion.`);

			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function sell() {
			cashX(cost, "slaveTransfer");
			return `When ${he} arrives, it's clear ${he}'s nobody's fool. ${He} comes without personal effects of any kind, and is wearing cheap, sturdy clothes to travel in, since ${he} knows ${he}'ll be taking them off immediately. ${He} does, without being told, just as soon as the enslavement formalities are out of the way. ${His} breasts are capped by titanic, puffy nipples; ${he} notices you appreciating them and gives you a hesitant little smile, swaying ${his} shoulders back and forth a little to set ${his} flesh deliciously into motion. ${His} playfulness vanishes when a purchaser's agent arrives to take ${him} away. ${He} looks at you desperately, begging to know who's purchased ${him}. You tell ${him} truthfully that a wealthy citizen one arcology over bought ${him} as a house slave; you neglect to mention that he likes big tits.`;
		}
	}
};
