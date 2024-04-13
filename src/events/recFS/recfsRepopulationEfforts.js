App.Events.recFSRepopulationEfforts = class recFSRepopulationEfforts extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
			() => V.arcologies[0].FSRepopulationFocus > random(1, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}

	execute(node) {
		let r = [];
		const pram = {disableDisability: 1};
		if (V.pedo_mode === 1) {
			pram.minAge = V.fertilityAge;
			pram.maxAge = 18;
			pram.ageOverridesPedoMode = 1;
		} else {
			pram.minAge = 14;
			pram.maxAge = 30;
		}
		const slave = GenerateNewSlave("XX", pram);
		slave.origin = "$He sold $himself to you in the hopes that $his body would help keep humanity alive.";
		slave.career = App.Data.Careers.General.young.random();
		generateSalonModifications(slave);
		setHealth(slave, jsRandom(40, 60), undefined, undefined, 0, 0);
		slave.devotion = random(25, 35);
		slave.trust = random(20, 25);
		slave.vagina = 0;
		slave.trueVirgin = 1;
		slave.preg = 0;
		slave.pregType = 0;
		slave.fetish = "pregnancy";

		const {
			He,
			his, he, him
		} = getPronouns(slave);
		const {say} = getEnunciation(slave);
		const {HeA} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const contractCost = sexSlaveContractCost();
		const cost = slaveCost(slave) - contractCost;
		r.push(`You receive so many messages, as a noted titan of the new Free Cities world, that your personal assistant has to be quite draconian in culling them. ${HeA} lets only the most important through to you. One category of message that always gets through regardless of content, though, are requests for voluntary enslavement. As the new world takes shape, they've become less rare than they once were.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(
			`This one is interesting, even by the standards of messages from people who want to become slaves. The individual is neither sick nor abused, and speaks with directness.`,
			Spoken(slave, `"I've heard a lot about how your arcology wishes to preserve humanity's place in the future,"`),
			`${he} ${say}s.`,
			Spoken(slave, `"And, well, I don't know how closely you watch the old world from where you are, but things are falling apart. Humanity's future surely rests in the arcologies, and you seem to be the only one who's focusing on that future... As such, I want to become a mother to the future of humanity! Please, take me in and knock me up! I'll carry as many children as my body can take!"`)
		);

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
			r.push(`When ${he} arrives, ${he} comes directly to your penthouse for enslavement. ${He} passes many heavily pregnant women along the way, and barely restrains an expression of excited lust as ${he} greets you. When ${he} eagerly strips for inspection, ${his} pussy is visibly moist; it seems ${he} may be more into pregnancy than ${he} let on.`);

			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function sell() {
			cashX(cost, "slaveTransfer");
			return `When ${he} arrives, ${he} comes directly to your penthouse for enslavement. ${He} passes many heavily pregnant women along the way, and barely restrains an expression of excited lust as ${he} greets you. When ${he} eagerly strips for inspection, ${his} pussy is visibly moist; it seems ${he} may be more into pregnancy than ${he} let on. As a purchaser's agent appears to take ${him} away, ${he} asks if ${he}'ll still be impregnated, and the agent nods approvingly. ${He} seems slightly disheartened that ${he} won't be yours, but ${he} accepts the fact that ${he}'ll still be useful to your future.`;
		}
	}
};
