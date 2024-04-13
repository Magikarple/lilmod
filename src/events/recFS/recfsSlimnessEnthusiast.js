App.Events.recFSSlimnessEnthusiast = class recFSSlimnessEnthusiast extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
		];
	}

	actorPrerequisites() {
		return [];
	}

	get weight() {
		return V.arcologies[0].FSSlimnessEnthusiast > random(1, 100) ? 1 : 0;
	}

	execute(node) {
		let r = [];
		const slave = GenerateNewSlave(null, {
			minAge: 25, maxAge: V.retirementAge, ageOverridesPedoMode: 1, disableDisability: 1
		});
		generateSalonModifications(slave);
		slave.origin = "$He offered $himself to you for enslavement because $he felt your arcology was the best place for a $woman of $his appearance.";
		slave.boobs = random(4, 6)*50;
		slave.natural.boobs = slave.boobs;
		slave.weight = -20;
		slave.natural.height = random(160, 200);
		slave.height = slave.natural.height;
		slave.face = random(15, 100);
		slave.butt = random(1, 2);
		slave.lips = 0;
		slave.devotion = random(25, 45);
		slave.trust = random(25, 45);
		slave.career = App.Data.Careers.General.educated.random();
		setHealth(slave, jsRandom(20, 40), undefined, undefined, 0, 0);
		slave.intelligence = random(51, 95);
		slave.intelligenceImplant = 15;
		slave.teeth = "normal";
		slave.pubicHStyle = "waxed";
		slave.underArmHStyle = "waxed";
		slave.behavioralFlaw = "arrogant";

		const {
			His, He,
			his, he, him, himself, woman, girl
		} = getPronouns(slave);
		const {say} = getEnunciation(slave);
		const {HeA} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const contractCost = 3000;
		const cost = slaveCost(slave) - contractCost;
		r.push(`You receive so many messages, as a noted titan of the new Free Cities world, that ${V.assistant.name} has to be quite draconian in culling them. ${HeA} lets only the most important through to you. One category of message that always gets through regardless of content, though, is requests for voluntary enslavement. As the new world takes shape, they've become less rare than they once were.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`The call comes in from an unusually well-to-do area. It appears that the aristocratic-looking ${woman} placing the call has fallen on hard times, and is doing the intelligent thing and staying ahead of ${his} creditors by offering ${himself} into slavery. Enslaving ${him} will be costlier than usual, but it seems likely to be worth it. ${He}'s well-spoken and seems both educated and intelligent. Even better, despite being middle-aged, ${he}'s extremely well-preserved, a tall, slim and graceful beauty with a face that must be the envy of ${girl}s half ${his} age. ${He} knows all this ${himself}, and ${say}s,`);
		r.push(Spoken(slave, `"I hear you appreciate a slender ${woman}; if I'm going down into slavery, ${(V.PC.title !== 0) ? "sir" : "ma'am"}, I'd be happy to avoid too many implants. I understand ${V.arcologies[0].name} is a fine place for someone in my situation."`));

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
			r.push(`${He} arrives apologizing for ${his} fine clothing.`);
			r.push(Spoken(slave, `"I'm sorry," ${he} apologizes sadly,`));
			r.push(Spoken(slave, `"but I wanted to wear my best one last time."`));
			r.push(`${He} sighs, squares ${his} shoulders, and visibly steels ${himself}.`);
			r.push(Spoken(slave, `"I'll say as a free ${woman}, since it's my last chance to say anything as a free ${woman}, you're good-looking, for an evil slaveholding oligarch."`));
			r.push(`${He} delivers this last with a little smile on ${his} lips and rich turn of humor in ${his} voice.`);
			r.push(Spoken(slave, `"If we'd met at a nice party last week I might have made a pass at you. I suppose that's beside the point now."`));

			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function sell() {
			const frag = new DocumentFragment();
			r = [];
			cashX(cost, "slaveTransfer");
			r.push(`${He} arrives apologizing for ${his} fine clothing.`);
			r.push(Spoken(slave, `"I'm sorry,"`));
			r.push(`${he} apologizes sadly,`);
			r.push(Spoken(slave, `"but I wanted to wear my best one last time."`));
			r.push(`${He} sighs, squares ${his} shoulders, and visibly steels ${himself}. ${He}'s about to declaim something when a purchaser's agent arrives to bundle ${him} off. ${His} face darkens and ${he} mulls something over, probably preparing a really cutting remark, but before ${he} can deliver it the agent fastens a bag over ${his} head and ${he} is heard no more.`);
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
