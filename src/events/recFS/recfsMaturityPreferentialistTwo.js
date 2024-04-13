App.Events.recFSMaturityPreferentialistTwo = class recFSMaturityPreferentialistTwo extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
			() => V.arcologies[0].FSMaturityPreferentialist > random(1, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}

	execute(node) {
		let r = [];
		const slave = GenerateNewSlave(null, {
			minAge: 36, maxAge: 55, ageOverridesPedoMode: 1, disableDisability: 1
		});
		slave.origin = "$He was sold to you by $his son, in order to raise funds for his business.";
		slave.boobs = random(4, 6)*200;
		slave.natural.boobs = slave.boobs - 200;
		slave.weight = 20;
		slave.height = random(130, 150);
		slave.face = random(15, 100);
		slave.butt = random(3, 4);
		slave.lips = 15;
		slave.devotion = random(25, 45);
		slave.trust = random(25, 45);
		slave.career = App.Data.Careers.General.educated.random();
		setHealth(slave, jsRandom(20, 40), undefined, undefined, 0, 0);
		slave.intelligence = random(51, 95);
		slave.intelligenceImplant = 15;
		slave.teeth = "normal";
		slave.pubicHStyle = "waxed";
		slave.behavioralFlaw = "arrogant";
		slave.counter.birthsTotal = 1;
		const {
			His, He,
			his, he, him, himself, woman, girl
		} = getPronouns(slave);
		const {HeA} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const contractCost = 3000;
		const cost = slaveCost(slave) - contractCost;
		r.push(`You receive so many messages, as a noted titan of the new Free Cities world, that ${V.assistant.name} has to be quite draconian in culling them. ${HeA} lets only the most important through to you. One category of message that always gets through regardless of content, though, is requests for voluntary enslavement. As the new world takes shape, they've become less rare than they once were.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`The call comes in from a middle-class area. It appears that the youthful man placing the call has a failing business, and is leveraging his last remaining asset by selling his stately-looking mother into slavery. Enslaving ${him} will be costlier than usual, but it seems likely to be worth it. From the dossier ${his} son forwarded to you, ${he}'s both educated and intelligent, both relics of ${his} impressive pedigree. Even better, ${he}'s aged like a fine wine, a short, stacked and attractive beauty with a face and rack that must be the envy of ${girl}s half ${his} age. ${He}'s aware of the situation at hand, and peeks in from the corner of the screen to say,`);
		r.push(Spoken(slave, `"I hear you appreciate a mature ${woman}; if I'm going down into slavery, ${(V.PC.title !== 0) ? "sir" : "ma'am"}, I hope for your sake that you know how to treat a ${woman} of my caliber."`));

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
			r.push(Spoken(slave, `"I'm sorry,"`));
			r.push(`${he} apologizes sadly,`);
			r.push(Spoken(slave, `"but I wanted to wear my best one last time."`));
			r.push(`${He} sighs, squares ${his} shoulders, and visibly steels ${himself}.`);
			r.push(Spoken(slave, `"My son's a bastard for selling me to you, and all to save that useless store of his."`));
			r.push(`${He} delivers this last with a bitter smile on ${his} lips.`);
			r.push(Spoken(slave, `"At least he had the sense to sell me to someone with exquisite taste, like you. After all, you did buy me."`));

			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function sell() {
			cashX(cost, "slaveTransfer");
			const frag = new DocumentFragment();
			r = [];
			r.push(`${He} arrives apologizing for ${his} fine clothing.`);
			r.push(Spoken(slave, `"I'm sorry,"`));
			r.push(`${he} apologizes sadly,`);
			r.push(Spoken(slave, `"but I wanted to wear my best one last time."`));
			r.push(`${He} sighs, squares ${his} shoulders, and visibly steels ${himself}.`);
			r.push(Spoken(slave, `"My son's a bastard for selling me to you, and all to save that useless store of his."`));
			r.push(`${He} delivers this last with a bitter smile on ${his} lips.`);
			r.push(Spoken(slave, `"At least he had the sense to sell me to someone with exquisite taste, like you. After all, you did buy me."`));
			r.push(`${He}'s about to declaim something else when a purchaser's agent arrives to bundle ${him} off. ${His} face darkens and ${he} mulls something over, probably preparing a really cutting remark, but before ${he} can deliver it the agent fastens a bag over ${his} head and ${he} is heard no more.`);
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
