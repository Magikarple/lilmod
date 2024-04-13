App.Events.recFSPaternalistTwo = class recFSPaternalistTwo extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
		];
	}

	actorPrerequisites() {
		return [];
	}

	get weight() {
		return V.arcologies[0].FSPaternalist > random(1, 100) ? 1 : 0;
	}

	execute(node) {
		let r = [];
		const slave = GenerateNewSlave(null, {maxAge: 42, disableDisability: 1});
		slave.origin = "$He was voluntarily enslaved after $he decided that your paternalistic arcology was a better place to live than the old world.";
		setHealth(slave, jsRandom(40, 60), undefined, undefined, 0, 0);
		generateSalonModifications(slave);
		slave.devotion = random(25, 45);
		slave.trust = random(25, 45);

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
		r.push(`This one is interesting, even by the standards of messages from people who want to become slaves. The individual is a normal looking ${woman}, neither sick nor visibly abused.`);
		r.push(Spoken(slave, `"I've heard a lot about how ${V.arcologies[0].name} treats slaves,"`));
		r.push(`${he} says.`);
		r.push(Spoken(slave, `"And, well, I don't know how closely you watch the old world from where you are, but it's pretty bad. Saving your whole life doesn't always keep you fed and clothed, or even alive. I never had much and now I have even less, and I'd rather live as your slave in ${V.arcologies[0].name} than on the streets back home."`));

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
			r.push(`${He} speaks to you as a free ${woman} throughout the enslavement process, but as soon as it is completed, ${he} stops and waits for instruction before talking. ${He} may not have had many prospects in ${his} life back home, but if ${he} remains this obedient ${he}'ll fit right in here in the Free Cities.`);

			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function sell() {
			cashX(cost, "slaveTransfer");
			return `${He} speaks to you as a free ${woman} throughout the enslavement process, but as soon as it is completed, ${he} stops and waits for instruction before talking. ${He} may not have had many prospects in ${his} life back home, but if ${he} remains this obedient ${he}'ll fit right in here in the Free Cities. When the purchasing agent arrives ${he} is momentarily surprised but not alarmed, ${he} figures ${he}'ll been sold to a citizen of ${V.arcologies[0].name} who shares paternalistic beliefs.`;
		}
	}
};
