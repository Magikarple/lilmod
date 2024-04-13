App.Events.recFSGenderRadicalistTwo = class recFSGenderRadicalistTwo extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
			() => V.arcologies[0].FSGenderRadicalist > random(1, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}

	execute(node) {
		let r = [];
		const slave = GenerateNewSlave("XY", {
			minAge: 32, maxAge: 42, ageOverridesPedoMode: 1, disableDisability: 1
		});
		generateSalonModifications(slave);
		slave.origin = "$He offered $himself for voluntary enslavement after a lifetime as an outcast due to $his sexual tendencies.";
		setHealth(slave, jsRandom(-20, 20), undefined, undefined, 0, 0);
		slave.devotion = random(15, 20);
		slave.trust = random(0, 10);
		slave.anus = random(1, 2);
		slave.behavioralFlaw = "hates women";

		const {
			He,
			his, he, him, himself
		} = getPronouns(slave);
		const {HeA} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const contractCost = sexSlaveContractCost();
		const cost = slaveCost(slave) - contractCost;
		r.push(`You receive so many messages, as a noted titan of the new Free Cities world, that ${V.assistant.name} has to be quite draconian in culling them. ${HeA} lets only the most important through to you. One category of message that always gets through regardless of content, though, is requests for voluntary enslavement. As the new world takes shape, they've become less rare than they once were.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`This one is from a rather mature but otherwise visibly well-to-do individual from one of the more traditionalist areas of the old world. It seems ${he}'s heard of the new and interesting way gender is thought of in the Free Cities, and in ${V.arcologies[0].name} in particular.`);
		r.push(Spoken(slave, `"I've lived my whole life as a subhuman here,"`));
		r.push(`${he} says.`);
		r.push(Spoken(slave, `"Being your sex slave is more accepted in your city than being me is here."`));

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
			r.push(`When ${he} arrives, ${he} comes directly to your penthouse for enslavement. ${He} wears an expression of doubt, fear, and wonder as ${he} takes in the sights and sounds of the magnificent beast that is the new society taking shape in ${V.arcologies[0].name}. The enslavement process requires ${him} to be nude, of course, so ${he} doesn't need to strip to offer ${himself} to you when it's over. ${He} doesn't even have to be prompted: ${he} just gets down on the floor in front of your desk and offers you ${his} fuckhole.`);
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function sell() {
			cashX(cost, "slaveTransfer");
			return `When ${he} arrives, ${he} comes directly to your penthouse for enslavement. ${He} wears an expression of doubt, fear, and wonder as ${he} takes in the sights and sounds of the magnificent beast that is the new society taking shape in ${V.arcologies[0].name}. A purchaser's agent arrives to take charge of ${him}, and ${he} asks politely who bought ${him}. A salon, you tell ${him}; ${he}'ll be trained to wait tables, serve drinks, and entertain customers with ${his} mouth and anus.`;
		}
	}
};
