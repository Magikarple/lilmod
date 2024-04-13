App.Events.recFSIntellectualDependency = class recFSIntellectualDependency extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
		];
	}

	actorPrerequisites() {
		return [];
	}

	get weight() {
		return V.arcologies[0].FSIntellectualDependency > random(1, 100) ? 1 : 0;
	}

	execute(node) {
		let r = [];
		const slave = GenerateNewSlave(null, {minAge: V.minimumSlaveAge, maxAge: 20, disableDisability: 1});
		slave.career = "a shut-in";
		slave.origin = "$He was sold to you by $his exhausted mother, unable to continue dealing with $his mental handicap.";
		slave.accent = 3;
		slave.intelligence = -100;
		slave.intelligenceImplant = 0;
		slave.face = Math.clamp(slave.face+20, -100, 100);
		slave.devotion = random(-100, -50);
		slave.trust = random(-100, -80);
		setHealth(slave, jsRandom(-20, 20), undefined, undefined, 0, 0);
		slave.weight = random(-10, 90);
		slave.behavioralFlaw = "odd";
		slave.canRecruit = 0;

		const {
			He,
			his, he, him
		} = getPronouns(slave);
		const {HeA} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const contractCost = 2000;
		const cost = slaveCost(slave) - contractCost;
		r.push(`You receive so many messages, as a noted titan of the new Free Cities world, that ${V.assistant.name} has to be quite draconian in culling them. ${HeA} lets only the most important through to you. One category of message that always gets through regardless of content, though, is requests for voluntary enslavement. As the new world takes shape, they've become less rare than they once were.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`The call comes in from a middle-class area. It appears that the tired looking woman placing the call has a special needs child and can no longer continue to provide the care ${he} requires. Having ${him} disappear discreetly into ${V.arcologies[0].name} would be a convenient way of resolving the situation. Your society's tastes for the mentally slow gives them a plausible way to salve their own consciences on abandoning their child, while, at the same time, giving ${him} a home where ${he} can thrive.`);

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
			r = [];
			r.push(`When ${he} arrives, ${he} is lead directly to your penthouse for enslavement. ${He} wears an expression of avid wonder as ${he} takes in the sights and sounds of the magnificent beast that is the new society taking shape in ${V.arcologies[0].name}. The enslavement process requires ${him} to be nude which, of course, goes about as well as ${his} mother alluded to. By the time you get ${him} undressed, ${he}'s passed out on your floor with ${his} bare ass up in the air. After getting a taste for sex, and an obedience lesson, ${he}'ll fit right in.`);
			r.push(App.UI.newSlaveIntro(slave));
			return r;
		}

		function sell() {
			cashX(cost, "slaveTransfer");
			return `When ${he} arrives, ${he} is lead directly to your penthouse for enslavement. ${He} wears an expression of avid wonder as ${he} takes in the sights and sounds of the magnificent beast that is the new society taking shape in ${V.arcologies[0].name}. The purchaser's agent's bag slipping over ${his} head, however, sours ${his} mood. Mustering all of ${his} strength, ${he} breaks into a run, collides with the now closed door, and collapses into a heap, leaving the swearing agent to carry ${him} off.`;
		}
	}
};
