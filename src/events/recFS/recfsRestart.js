App.Events.recFSRestart = class recFSRestart extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
			() => V.arcologies[0].FSRestart > random(1, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}

	execute(node) {
		let r = [];
		const slave = GenerateNewSlave("XX", {
			minAge: 10, maxAge: 18, disableDisability: 1, race: "nonslave"
		});
		slave.origin = "$He thought $he was important; $he was not.";
		slave.career = "a student from a private school";
		slave.intelligence = random(16, 95);
		slave.intelligenceImplant = 30;
		setHealth(slave, jsRandom(20, 40), 0, 0, 0, 0);
		slave.devotion = random(-100, -90);
		slave.trust = random(-100, -90);
		slave.vagina = 0;
		slave.trueVirgin = 1;
		slave.preg = 0;
		slave.behavioralFlaw = "arrogant";

		const {
			He,
			his, he, him
		} = getPronouns(slave);
		const {HeA} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const contractCost = 1000;
		const cost = slaveCost(slave) - contractCost;
		r.push(`You receive so many messages, as a noted titan of the new Free Cities world, that your personal assistant has to be quite draconian in culling them. ${HeA} lets only the most important through to you. One category of message that always gets through are potential applicants for the Societal Elite. As the new world takes shape, they've become more rare than they once were.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`This one is most mundane, a student with top grades wanting to be part of the top of society. Upon arriving for ${his} evaluation, ${he} begins droning on about ${his} unimpressive achievements and pointless accomplishments. You review information on ${his} lineage and connections, while feigning interest in ${his} prattling. It would seem ${he} is worth far less than ${he} thinks ${he} is.`);

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
			r.push(`You interrupt ${his} rambling and bluntly inform ${him} that ${he} is useless to society. ${He} steps back, insulted, and attempts a rebuttal. You cut ${him} off again and tell ${him} ${he}'s much more useful as your personal toy. ${He} takes another step back and is promptly restrained before being dragged off to the autosurgery.`);
			slave.preg = -2;
			slave.ovaries = 0;
			slave.balls = 0;

			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function sell() {
			cashX(cost, "slaveTransfer");
			return `You interrupt ${his} rambling and bluntly inform ${him} that ${he} is useless to society. ${He} steps back, insulted, and attempts a rebuttal. You cut ${him} off again and tell ${him} another of the Societal Elite has taken interest in making ${him} his pet. ${He} takes another step back and is promptly restrained before being dragged off to ${his} new owner.`;
		}
	}
};
