App.Events.recFSRestartTwo = class recFSRestartTwo extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
		];
	}

	actorPrerequisites() {
		return [];
	}

	get weight() {
		return V.arcologies[0].FSRestart > random(1, 100) ? 1 : 0;
	}

	execute(node) {
		let r = [];
		const slave = GenerateNewSlave(null, {maxAge: 42, disableDisability: 1});
		slave.origin = "$He considered $himself ugly and wished to stay out of your gene pool.";
		setHealth(slave, jsRandom(0, 60), undefined, undefined, 0, 0);
		slave.trust = random(25, 45);
		slave.devotion = random(25, 45);
		slave.anus = random(1, 2);
		slave.face = random(-40, 0);
		slave.boobShape = "perky";
		slave.boobs = random(2, 5)*100;
		slave.natural.boobs = slave.boobs;
		slave.weight = 5;
		slave.waist = random(-60, 0);
		if (slave.physicalAge >= 12) {
			slave.teeth = "normal";
		}

		const {
			His, He,
			his, he, him
		} = getPronouns(slave);
		const {HeA} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const contractCost = 1000;
		const cost = slaveCost(slave) - contractCost;
		r.push(`You receive so many messages, as a noted titan of the new Free Cities world, that your personal assistant has to be quite draconian in culling them. ${HeA} lets only the most important through to you. One category of message that always gets through regardless of content, though, are requests for voluntary enslavement. As the new world takes shape, they've become less rare than they once were.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`This call is coming from a public kiosk, which is usually an indication that the person on the other end is a transient individual who has decided to take slavery over homelessness. A rather homely face greets you, much to your displeasure.`);
		r.push(Spoken(slave, `"I know I'm not much to look at, so I don't even want you to consider me more than just a slave. With the way things are going, I figured just getting it over with is the way to go."`));

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
			r.push(`When ${he} arrives, ${he} comes directly to your to your penthouse for enslavement. ${His} face may painful to look at, but ${his} body is not all bad; with a little work, ${he} can be quite the catch. When`);
			if (canHear(slave)) {
				r.push(`${he} hears`);
			} else {
				r.push(`${he}'s given`);
			}
			r.push(`the news, ${his} spirits are visibly lifted; ${he} never thought ${he}'d be so lucky.`);

			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function sell() {
			cashX(cost, "slaveTransfer");
			return `When ${he} arrives, ${he} comes directly to your to your penthouse for enslavement. ${His} face may painful to look at, but ${his} body is not all bad; with a little work, ${he} can be quite the catch. A purchaser's agent appears to take ${him} away, and ${he} quietly asks who's bought ${him}. A plastic surgeon, you tell ${him}, who sees a diamond in the rough. ${He}'s speechless.`;
		}
	}
};

