App.Events.recFSSubjugationist = class recFSSubjugationist extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
		];
	}

	actorPrerequisites() {
		return [];
	}

	get weight() {
		return V.arcologies[0].FSSubjugationist > random(1, 100) ? 1 : 0;
	}

	execute(node) {
		let r = [];
		const slave = GenerateNewSlave(null, {
			minAge: 18, maxAge: 42, disableDisability: 1, race: V.arcologies[0].FSSubjugationistRace
		});
		generateSalonModifications(slave);
		slave.origin = "$He was beaten, sexually assaulted, and finally enslaved for being stupid enough to visit an arcology that doesn't like $his kind.";
		setHealth(slave, jsRandom(-80, -60), jsRandom(20, 30), jsRandom(0, 10), Math.max(normalRandInt(1, 0.5), 0), jsRandom(40, 90));
		slave.trust = random(-45, -25);
		slave.devotion = random(-75, -65);
		slave.anus = random(1, 2);
		const {
			his, he, him
		} = getPronouns(slave);
		const {hisA} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const contractCost = 1000;
		const cost = slaveCost(slave) - contractCost;
		if (V.arcologyUpgrade.drones > 0) {
			r.push(`Your security drones`);
		} else {
			r.push(`Security guards in your employ`);
		}
		r.push(`break up a minor disturbance on the lowest, poorest levels of the arcology without needing your direction, or indeed without even informing you. ${capFirstChar(V.assistant.name)} is good enough at filtering incidents down to what you need to know that you typically leave minor things to ${hisA} discretion. This time ${V.assistant.name} only informs you once it's apparent that that brawl left someone injured and unconscious.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`It seems the violence was racially motivated. The ${V.arcologies[0].FSSubjugationistRace} victim was publicly sodomized and left bruised and bleeding, ${his} clothes torn off, beaten into insensibility, with anti-${V.arcologies[0].FSSubjugationistRace} slogans written crudely across ${his} ${slave.skin} skin. It seems ${he} came into the arcology despite the strong penalties for free ${V.arcologies[0].FSSubjugationistRace} subhumans found here. You can easily enslave ${him} in return for ${his} medical costs, though no one is likely to object to your enslaving one of ${his} kind, whatever the situation.`);

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
			r.push(`The enslavement process is disappointingly quiet, since ${he}'s still unconscious. As of this morning ${he} was one of the last free ${V.arcologies[0].FSSubjugationistRace} people in the arcology. Now ${he}'s simply the newest sex slave of the inferior race to take ${his} proper place.`);

			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function sell() {
			cashX(cost, "slaveTransfer");
			return `The purchasing agent is businesslike, even hurried. The inert slave receives a simple check, with some industrious fingering of orifices, and is bundled off. As is appropriate.`;
		}
	}
};
