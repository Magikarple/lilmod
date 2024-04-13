App.Events.recFSStatuesqueGlorificationTwo = class recFSStatuesqueGlorificationTwo extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
			() => V.arcologies[0].FSStatuesqueGlorification > random(1, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}

	execute(node) {
		let r = [];
		const slave = GenerateNewSlave(null, {disableDisability: 1});
		slave.origin = "$He offered $himself for voluntary enslavement knowing $he would only fit in with your help.";
		slave.natural.height = 165;
		slave.height = Height.forAge(slave.natural.height, slave);
		setHealth(slave, jsRandom(20, 40), undefined, undefined, 0, 0);
		slave.shoes = "extreme heels";
		slave.devotion = random(30, 45);
		slave.trust = random(-20, 0);

		const {
			He,
			his, he, him, himself, girl
		} = getPronouns(slave);
		const {HeA} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const contractCost = sexSlaveContractCost();
		const cost = slaveCost(slave) - contractCost;
		r.push(`You receive so many messages, as a noted titan of the new Free Cities world, that ${V.assistant.name} has to be quite draconian in culling them. ${HeA} lets only the most important through to you. One category of message that always gets through regardless of content, though, is requests for voluntary enslavement. As the new world takes shape, they've become less rare than they once were.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`This one is interesting, even by the standards of messages from people who want to become slaves. The individual is neither sick nor abused, and speaks with directness.`);
		r.push(Spoken(slave, `"I'm going to be out of a home by the end of the week and more than likely falling into slavery not long after,"`));
		r.push(`${he} sighs.`);
		r.push(Spoken(slave, `"And, well, I heard you like tall ${girl}s and ${V.arcologies[0].name} can be lenient when it comes to high heels pushing people over the height threshold, so I was hoping you'd take pity on a ${girl} down on his luck even though ${he}'s not quite up to standards."`));

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
			r.push(`When ${he} arrives, ${he} is the very picture of someone in over ${his} head. The only thing separating ${him} from ridicule is a pair of high heels; a fact ${he} is very aware of as ${he} struggles with doubts through the enslavement process.`);

			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function sell() {
			cashX(cost, "slaveTransfer");
			return `When ${he} arrives, ${he} comes directly to your penthouse for enslavement. ${He} wears an expression of doubt, fear, and wonder as ${he} takes in the sights and sounds of the magnificent beast that is the new society taking shape in ${V.arcologies[0].name}. A purchaser's agent arrives to take charge of ${him}, and ${he} asks politely who bought ${him}. A man with a means to fix ${his} height issue, you tell ${him}. ${He} should be able to walk again within a year, assuming the surgery is a success. ${He} shudders at the concept and steels ${himself}; not everyone has access to the high end technology you do after all.`;
		}
	}
};

