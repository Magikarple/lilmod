App.Events.recFSArabianRevivalist = class recFSArabianRevivalist extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
			() => V.arcologies[0].FSArabianRevivalist > random(1, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}
	execute(node) {
		let r = [];
		const slave = GenerateNewSlave(null, {
			minAge: 25, maxAge: Math.max(25, V.retirementAge-5), ageOverridesPedoMode: 1, disableDisability: 1
		});
		slave.origin = "$He offered $himself to you for enslavement because $he thought your harem $his best hope for good treatment.";
		slave.devotion = random(30, 35);
		slave.trust = random(30, 35);
		slave.career = "a professor";
		generateSalonModifications(slave);
		setHealth(slave, jsRandom(10, 30), undefined, undefined, 0, 0);
		slave.face = random(15, 100);
		slave.skill.oral = 35;
		slave.skill.anal = 15;
		slave.skill.whoring = 0;
		slave.skill.entertainment = 100;
		slave.intelligence = random(51, 95);
		slave.intelligenceImplant = 15;
		slave.teeth = "normal";
		slave.sexualFlaw = either("idealistic");

		const {
			He,
			his, he, him, girl, woman
		} = getPronouns(slave);
		const {HeA} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const contractCost = sexSlaveContractCost();
		const cost = slaveCost(slave) - contractCost;
		r.push(`You receive so many messages, as a noted titan of the new Free Cities world, that ${V.assistant.name} has to be quite draconian in culling them. ${HeA} lets only the most important through to you. One category of message that always gets through regardless of content, though, is requests for voluntary enslavement. As the new world takes shape, they've become less rare than they once were.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`The call comes in from an old world university. The caller, surprisingly, is a beautiful ${woman} in ${his} thirties who speaks with a richly lilting accent and a literary vocabulary.`);
		r.push(Spoken(slave, `"I'm afraid,"`));
		r.push(`${he} says sadly,`);
		r.push(Spoken(slave, `"it's come to slavery, for me. I am no longer a ${girl}, but I can make some claim to beauty. I know many stories and can tell them cleverly; I can sing and dance well. I know you are not looking for a Scheherazade, but I could play her part. Nor am I naïve; I know the Sultan enjoyed her body as well as her wit, and I am not unskilled in those respects, either."`));
		r.push(`${He} looks you straight in the eye.`);
		r.push(Spoken(slave, `"May I come into your harem? I will do my best to brighten it."`));

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
			r.push(`Your estimation of ${him} rises through the enslavement process: ${he} doffs and discards ${his} conservative business wear without complaint, and stands nude before you, obeying instructions without fuss. There is an indecipherable glint in ${his} ${App.Desc.eyesColor(slave)}: nerves? Excitement? Challenge, even? Perhaps ${he} even feels this is an adventure. And that, it will certainly be.`);

			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function sell() {
			cashX(cost, "slaveTransfer");
			return `${He} arrives and works ${his} way through the enslavement process without fuss. When a buyer's agent arrives, ${he} immediately understands that ${he} has been sold. ${He} looks rueful for a moment, obviously realizing that you made no commitment not to do this, and that such a commitment would have been worthless in any case. ${He} flawlessly performs the only successful insult available to ${him}, ignoring you utterly from that moment on, but obeying the agent faultlessly.`;
		}
	}
};
