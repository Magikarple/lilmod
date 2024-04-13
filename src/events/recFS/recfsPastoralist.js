App.Events.recFSPastoralist = class recFSPastoralist extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
			() => V.arcologies[0].FSPastoralist > random(1, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}

	execute(node) {
		let r = [];
		const contractCost = sexSlaveContractCost();
		const pram = {disableDisability: 1};
		if (V.pedo_mode === 1) {
			pram.minAge = V.fertilityAge;
			pram.maxAge = 21;
			pram.ageOverridesPedoMode = 1; /* Can lactate. */
		} else {
			pram.minAge = random(14, 16);
		}
		const slave = GenerateNewSlave("XX", pram);
		generateSalonModifications(slave);
		slave.origin = "$He offered $himself for voluntary enslavement, choosing you as $his new owner because you treat lactating girls well.";
		setHealth(slave, jsRandom(-20, 20), undefined, undefined, 0, 0);
		slave.devotion = random(-15, 15);
		slave.trust = random(5, 15);
		slave.preg = random(15, 30);
		slave.pregType = 1;
		slave.pregWeek = slave.preg;
		slave.pregKnown = 1;
		SetBellySize(slave);
		slave.lactation = 1;
		slave.lactationDuration = 2;
		slave.vagina = 1;
		slave.boobs += 200 * random(2, 5);
		const cost = slaveCost(slave) - contractCost;
		const {
			His, He,
			his, he, him, himself, woman
		} = getPronouns(slave);
		const {say} = getEnunciation(slave);
		const {HeA} = getPronouns(assistant.pronouns().main).appendSuffix("A");

		r.push(`You receive so many messages, as a noted titan of the new Free Cities world, that ${V.assistant.name} has to be quite draconian in culling them. ${HeA} lets only the most important through to you. One category of message that always gets through regardless of content, though, is requests for voluntary enslavement. As the new world takes shape, they've become less rare than they once were.`);

		App.Events.addParagraph(node, r);
		r = [];

		r.push(
			`This call is coming from a public kiosk, which is usually an indication that the person on the other end is a transient individual who has decided to take slavery over homelessness. This proves to be right on the money in this case, though the ${woman} isn't too terribly bedraggled; ${his} situation must be recent. ${He} asks to be enslaved with the crushing sadness most such people experience during their last free hours.`,
			Spoken(slave, `"I'm pregnant,"`),
			`${he} ${say}s through tears.`,
			Spoken(slave, `"I know I'm not that pretty, ${(V.PC.title !== 0) ? "sir" : "ma'am"}. But,"`),
			`and ${he} brings ${his} sizable chest into view,`,
			Spoken(slave, `"I've got pretty big boobs, and I started giving milk yesterday. I was searching the net, and I saw that you milk women, ${(V.PC.title !== 0) ? "sir" : "ma'am"}. It seems like a better life than getting fucked all the time."`)
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
			r.push(`${He} drags ${himself} in, but as the enslavement process winds grindingly on, ${he} shakes off ${his} depression. The vast weight of ${his} situation lifts from ${him}. You've seen this before, the perverse internal freedom that comes with the knowledge that ${his} life is in the hands of another now, and that all ${he} has to do or can do is obey. ${His} last words to you as a free ${woman} are an ironic statement that, when ${he} was teased back in school for the size of ${his} boobs, ${he} never thought they'd save ${him} one day.`);
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function sell() {
			cashX(cost, "slaveTransfer");
			return `${He} drags ${himself} in, but as the enslavement process winds grindingly on, ${he} shakes off ${his} depression. It threatens to descend again when a purchaser's agent comes in to take ${him} away. ${He} begs to know where ${he}'s going, so you tell ${him} ${he}'s to be a cow in a slave dairy. ${He} quails at the term, but you observe that ${he}'ll be well treated and lightly used, if at all, and ${he} seems to take heart at this.`;
		}
	}
};
