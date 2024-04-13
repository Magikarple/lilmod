App.Events.recFSAssetExpansionistTwo = class recFSAssetExpansionistTwo extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
			() => V.arcologies[0].FSAssetExpansionist > random(1, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}

	execute(node) {
		let r = [];
		const slave = GenerateNewSlave(null, {
			minAge: 28, maxAge: 44, ageOverridesPedoMode: 1, disableDisability: 1
		});
		generateSalonModifications(slave);
		slave.origin = "$He offered $himself to you to escape enslavement in $his homeland for being older and unmarried.";
		slave.boobs += random(6, 15)*200;
		slave.nipples = "inverted";
		slave.areolae = 3;
		slave.weight = random(50, 150);
		slave.butt += random(2, 4);
		slave.lips = 35;
		slave.devotion = random(-15, 15);
		slave.trust = random(-15, 15);
		setHealth(slave, jsRandom(20, 40), undefined, undefined, 0, 0);
		slave.intelligence = random(0, 90);
		slave.pubicHStyle = "waxed";

		const {
			His, He,
			his, he, him, himself, woman
		} = getPronouns(slave);
		const {HeA} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const contractCost = sexSlaveContractCost();
		const cost = slaveCost(slave) - contractCost;
		r.push(`You receive so many messages, as a noted titan of the new Free Cities world, that ${V.assistant.name} has to be quite draconian in culling them. ${HeA} lets only the most important through to you. One category of message that always gets through regardless of content, though, is requests for voluntary enslavement. As the new world takes shape, they've become less rare than they once were.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`The person placing the call is physically quite unusual, to the point of looking distinctly unnatural. ${He} has absolutely enormous tits, an ass to match, and is generally plush all over; perhaps one of the lushest mothers in the curves department you've ever seen. ${He} explains ${himself} quickly.`);
		r.push(Spoken(slave, `"${(V.PC.title !== 0) ? "Sir" : "Ma'am"}, I'm not a young ${woman}. Where I'm from, being this old and unmarried means I'm very likely to be enslaved one way or another. But I've always had big breasts. Well, big everything really. I hear life is better if you're a plush slave."`));
		r.push(`${He} leans into the camera, displaying a solid acre of cleavage.`);
		r.push(Spoken(slave, `"Can I be your plush slave?"`));

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
