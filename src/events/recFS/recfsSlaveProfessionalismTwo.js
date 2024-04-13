App.Events.recFSSlaveProfessionalismTwo = class recFSSlaveProfessionalismTwo extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
			() => V.arcologies[0].FSSlaveProfessionalism > random(1, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}

	execute(node) {
		let r = [];
		const slave = GenerateNewSlave(null, {minAge: 20, maxAge: 36, disableDisability: 1});
		slave.career = "a servant";
		slave.origin = "$He offered $himself for voluntary enslavement after being freed by $his deceased master's next of kin.";
		slave.face = Math.clamp(slave.face+20, -100, 100);
		slave.devotion = random(60, 80);
		slave.trust = random(60, 80);
		slave.intelligence = 100;
		slave.intelligenceImplant = 30;
		setHealth(slave, jsRandom(40, 60), undefined, undefined, 0, 0);
		slave.anus = 2;
		if (slave.vagina >= 0) {
			slave.vagina = 2;
			slave.skill.vaginal = 100;
		} else {
			slave.skill.penetrative = 100;
		}
		slave.weight = random(-10, 10);
		slave.skill.oral = 100;
		slave.skill.anal = 100;
		slave.skill.whoring = 100;
		slave.skill.entertainment = 100;
		slave.skill.combat = 40;
		slave.behavioralFlaw = "none";
		slave.sexualFlaw = "none";

		const {
			He,
			he, him
		} = getPronouns(slave);
		const {HeA} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const contractCost = sexSlaveContractCost();
		const cost = slaveCost(slave) - contractCost;
		r.push(`You receive so many messages, as a noted titan of the new Free Cities world, that ${V.assistant.name} has to be quite draconian in culling them. ${HeA} lets only the most important through to you. One category of message that always gets through regardless of content, though, is requests for voluntary enslavement. As the new world takes shape, they've become less rare than they once were.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`This one is from another arcology, which is rather unusual. You are presented with a humble, though clearly well raised, free citizen. ${He} says directly,`);
		r.push(Spoken(slave, `"I'm a slave through and through. I won't waste your time, so long story short, my Master passed away recently and his successor freed me. I was trained to be a slave, I was bred to serve my owner, and now I have no purpose in life. I offer myself to you, please save me from this so-called <i>freedom</i>."`));

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
			r.push(`From the first moment you see ${him}, ${he} is acting the part of an ideal slave. Re-enslaving ${him} is a near effortless affair. As much as ${he} tries to politely conceal it, you can feel the joy radiating off of ${him}.`);

			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function sell() {
			cashX(cost, "slaveTransfer");
			return `From the first moment you see ${him}, ${he} is acting the part of an ideal slave. Even when a purchaser's agent arrives to take ${him} away, you can still feel a sense of joy radiating from ${him}.`;
		}
	}
};
