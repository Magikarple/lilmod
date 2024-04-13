App.Events.recFSPaternalist = class recFSPaternalist extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
			() => V.arcologies[0].FSPaternalist > random(1, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}

	execute(node) {
		let r = [];
		const slave = GenerateNewSlave(null, {maxAge: 42, disableDisability: 1});
		slave.origin = "$He was voluntarily enslaved after $he decided that your paternalistic arcology was a better place for advancement than the old world.";
		slave.career = App.Data.Careers.General.educated.random();
		setHealth(slave, jsRandom(40, 60), undefined, undefined, 0, 0);
		slave.devotion = random(25, 45);
		slave.trust = random(25, 45);
		slave.intelligence = random(51, 95);
		slave.intelligenceImplant = 15;
		if (slave.physicalAge >= 12) {
			slave.teeth = "normal";
		}
		const {
			He,
			his, he, him, woman
		} = getPronouns(slave);
		const {HeA} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const contractCost = sexSlaveContractCost();
		const cost = slaveCost(slave) - contractCost;
		r.push(`You receive so many messages, as a noted titan of the new Free Cities world, that ${V.assistant.name} has to be quite draconian in culling them. ${HeA} lets only the most important through to you. One category of message that always gets through regardless of content, though, is requests for voluntary enslavement. As the new world takes shape, they've become less rare than they once were.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`This one is interesting, even by the standards of messages from people who want to become slaves. The individual is neither sick nor abused, and speaks with intelligence and directness.`);
		r.push(Spoken(slave, `"I've heard a lot about how ${V.arcologies[0].name} treats slaves,"`));
		r.push(`${he} says.`);
		r.push(Spoken(slave, `"And, well, I don't know how closely you watch the old world from where you are, but it's pretty bad. Being smart and driven out here doesn't always keep you fed and clothed, or even alive. I'm smart and driven, and I understand that might make me a Madam or a DJ or even a Head Girl in ${V.arcologies[0].name}. I'm not dumb enough to rely on that, but I'll take that chance."`));

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
			r.push(`${He} speaks to you as a free ${woman} throughout the enslavement process, but as soon as it is completed, ${he} stops and waits for instruction before talking. ${He} does not look directly at your face, but keeps ${his} gaze lower than that, and stands expectant and ready for commands. You are reminded of ${his} intelligence by ${his} precisely correct behavior for a new slave, even before you give any kind of direction.`);

			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function sell() {
			cashX(cost, "slaveTransfer");
			return `${He} speaks to you as a free ${woman} throughout the enslavement process, but as soon as it is completed, ${he} stops and waits for instruction before talking. ${He} does not look directly at your face, but keeps ${his} gaze lower than that, and stands expectant and ready for commands. You are reminded of ${his} intelligence by ${his} presence of mind when a purchaser's agent arrives to take charge of ${him}; ${he} clearly calculates that making a scene will gain ${him} nothing, and cooperates. You reward this by telling ${him} the truth: ${he}'s been sold to a citizen of ${V.arcologies[0].name} who shares paternalistic beliefs; ${he}'ll be fine.`;
		}
	}
};
