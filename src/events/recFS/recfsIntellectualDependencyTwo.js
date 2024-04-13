App.Events.recFSIntellectualDependencyTwo = class recFSIntellectualDependencyTwo extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
			() => V.arcologies[0].FSIntellectualDependency > random(1, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}

	execute(node) {
		let r = [];
		const slave = GenerateNewSlave(null, {
			minAge: 16, maxAge: 20, disableDisability: 1, race: "nonslave"
		});
		generateSalonModifications(slave);
		slave.origin = "$He was voluntarily enslaved after $he overdosed on psychosuppressant-laced aphrodisiacs and fried $his brain.";
		slave.dullIntelligence = 1;
		const geneticInt = slave.intelligence;/* for longSlaveDescription to report what the intelligence will be while keeping the original value safe for ${V.genePool[]} */
		slave.intelligence = -100;
		slave.devotion = random(20, 40);
		slave.trust = random(0, 50);
		setHealth(slave, jsRandom(-60, -40), undefined, undefined, 0, 20);
		slave.weight = random(-40, 0);
		slave.energy = 100;
		slave.attrXX = 100;
		slave.attrXY = 100;
		slave.addict = 50;
		slave.canRecruit = 0;

		const {
			He,
			his, he, him
		} = getPronouns(slave);
		const {HeA} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const contractCost = sexSlaveContractCost();
		const cost = slaveCost(slave) - contractCost;
		r.push(`You receive so many messages, as a noted titan of the new Free Cities world, that ${V.assistant.name} has to be quite draconian in culling them. ${HeA} lets only the most important through to you. One category of message that always gets through regardless of content, though, is requests for voluntary enslavement. As the new world takes shape, they've become less rare than they once were.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`This one, unusually, is voice-only. The caller seems extremely intoxicated as ${he} struggles to explain ${his} situation, and you're not far off on that assumption; ${he} overdosed on illicit drugs at a party and can't think straight any longer. ${He} apparently cannot remember where ${he} came from and is desperate for any sort of support, even if it means enslavement. It's not like ${he} has much freedom left with ${his} mind in tatters anyway.`);

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
			slave.intelligence = geneticInt;
			r.push(`It takes several hours to track ${him} down for enslavement and once ${he} arrives it becomes clear that ${his} mental state has broken down even further. ${He} spends the better part of the process masturbating and begging for you to touch ${his} body.`);

			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function sell() {
			cashX(cost, "slaveTransfer");
			return `It takes several hours to track ${him} down for enslavement and once ${he} arrives it becomes clear that ${his} mental state has broken down even further. A purchaser's agent arrives and takes charge of ${him}, and takes hold of ${his} hand. He leads ${him} away, and it's done.`;
		}
	}
};
