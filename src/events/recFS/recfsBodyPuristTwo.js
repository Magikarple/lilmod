App.Events.recFSBodyPuristTwo = class recFSBodyPuristTwo extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
		];
	}

	actorPrerequisites() {
		return [];
	}

	get weight() {
		return V.arcologies[0].FSBodyPurist > random(1, 100) ? 1 : 0;
	}

	execute(node) {
		let r = [];
		const slave = GenerateNewSlave(null, {
			minAge: 18, maxAge: 24, ageOverridesPedoMode: 1, disableDisability: 1
		});
		slave.origin = "$He offered $himself for voluntary enslavement after graduating from a slave school and passing $his majority, because $he heard you treat slaves without implants well.";
		slave.career = "a student";
		setHealth(slave, jsRandom(-20, 20), 0, 0, 0, jsRandom(10, 30));
		slave.devotion = random(-15, 15);
		slave.trust = random(-15, 15);

		const {
			He, His,
			his, he, him, himself, women, girl
		} = getPronouns(slave);
		const {HeA} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const contractCost = sexSlaveContractCost();
		const cost = slaveCost(slave) - contractCost;
		const {title: Master} = getEnunciation(slave);
		r.push(`You receive so many messages, as a noted titan of the new Free Cities world, that ${V.assistant.name} has to be quite draconian in culling them. ${HeA} lets only the most important through to you. One category of message that always gets through regardless of content, though, is requests for voluntary enslavement. As the new world takes shape, they've become less rare than they once were.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`This one is from one of the less prestigious slave schools, which is not in itself unusual, save that it comes directly from one of the graduating students. You are presented with a rather normal-looking slave${girl}.`);
		r.push(Spoken(slave, `"I'm past my majority," ${he} says happily. "I know I'm not that pretty, ${(V.PC.title !== 0) ? "sir" : "ma'am"}. But,"`));
		r.push(`and ${he} pulls the camera back to reveal ${his} fully nude body,`);
		r.push(Spoken(slave, `"I've never had any plastic in me, the school couldn't afford it anyways. I was searching the net, and I saw that you like ${women} without surgery, ${(V.PC.title !== 0) ? "sir" : "ma'am"}. If I'm to be owned, I'd like it to be by someone like you who won't cut me open."`));

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
			r.push(`When ${he} arrives, it's obvious that ${he}'s fairly happy. After all, the slave school trained ${him} for this. When asked about it, ${he} says,`);
			r.push(Spoken(slave, `"Some of the ${girl}s who graduated before me were given implants, ${Master}. Just — the idea of having fake shit in here —"`));
			r.push(`${he} rubs ${his} chest a little`);
			r.push(Spoken(slave, `"— ugh. I'm glad you're not into that"`));
			r.push(`${He} laughs bitterly at ${himself}, and then rubs ${his} chest again, looking at you with mixed fear and invitation.`);

			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function sell() {
			const frag = new DocumentFragment();
			r = [];
			cashX(cost, "slaveTransfer");
			r.push(`When ${he} arrives, it's obvious that ${he}'s fairly happy. After all, the slave school trained ${him} for this. When asked about it, ${he} says,`);
			r.push(Spoken(slave, `"Some of the ${girl}s who graduated before me were given implants, ${Master}. Just — the idea of having fake shit in here —"`));
			r.push(`${he} rubs ${his} chest a little`);
			r.push(Spoken(slave, `"— Ugh. I'm glad you're not into that"`));
			r.push(`${He} laughs bitterly at ${himself}, and then rubs ${his} chest again, looking at you with mixed fear and invitation. ${His} playfulness vanishes when a purchaser's agent arrives to take ${him} away. ${He} looks at you desperately, begging to know who's purchased ${him}. You tell ${him} truthfully that a wealthy citizen one arcology over bought ${him} as a house slave; you neglect to mention that he likes big tits, and he isn't particular about whether they're natural.`);
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
