App.Events.recFSTransformationFetishistTwo = class recFSTransformationFetishistTwo extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
			() => V.arcologies[0].FSTransformationFetishist > random(1, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}

	execute(node) {
		let r = [];
		const slave = GenerateNewSlave(null, {
			minAge: 32, maxAge: 42, ageOverridesPedoMode: 1, disableDisability: 1
		});
		slave.origin = "$His husband sold $him into slavery to escape his debts.";
		slave.career = "a trophy wife";
		slave.boobsImplant += random(5, 10)*200;
		slave.boobs += slave.boobsImplant;
		slave.boobsImplantType = "fillable";
		if (slave.boobsImplant / slave.boobs >= 0.90) {
			slave.boobShape = "spherical";
			slave.nipples = "flat";
		} else {
			slave.boobShape = "normal";
			slave.nipples = "tiny";
		}
		slave.areolae = 2;
		slave.buttImplant += random(2, 4);
		slave.butt += slave.buttImplant;
		slave.buttImplantType = "normal";
		slave.lipsImplant += random(15, 25);
		slave.lips += slave.lipsImplant;
		slave.face = Math.clamp(slave.face+20, -100, 100);
		slave.faceImplant += 40;
		slave.devotion = random(-100, -75);
		slave.trust = random(-45, -25);
		setHealth(slave, jsRandom(20, 60), normalRandInt(10, 3), normalRandInt(10, 3), 0, 20);
		slave.pubicHStyle = "waxed";
		slave.behavioralFlaw = either("anorexic", "arrogant", "bitchy", "odd");

		const {
			His, He,
			his, he, him, himself, wife, woman
		} = getPronouns(slave);
		const {HeA} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const contractCost = 1000;
		const cost = slaveCost(slave) - contractCost;
		r.push(`You receive so many messages, as a noted titan of the new Free Cities world, that ${V.assistant.name} has to be quite draconian in culling them. ${HeA} lets only the most important through to you. One category of message that always gets through regardless of content, though, is requests for voluntary enslavement. As the new world takes shape, they've become less rare than they once were.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`The call comes in from an unusually well-to-do area. It appears that an aristocratic-looking man placing the call has fallen on hard times, and is doing the intelligent thing and staying ahead of his creditors by offering his trophy ${wife} into slavery. Enslaving ${him} will be costlier than usual, but it seems likely to be worth it. ${He}'s finely aged and completed worked over under a surgeon's knife. ${He}'s quite the implant queen, in fact.`);

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
			r.push(`${He} arrives unapologetically in ${his} fine clothing.`);
			r.push(Spoken(slave, `"I'm not sorry,"`));
			r.push(`${he} says harshly,`);
			r.push(Spoken(slave, `"but I'm wearing my best one last time whether you like it or not."`));
			r.push(`Eventually ${he} sighs, squares ${his} shoulders, and visibly steels ${himself}.`);
			r.push(Spoken(slave, `"I'll say as a free ${woman}, since it's my last chance to say anything as a free ${woman}, you're good-looking, for an evil slaveholding oligarch."`));
			r.push(`${He} delivers this last with a little smile on ${his} plush lips and a sense of bitter irony in ${his} voice.`);
			r.push(Spoken(slave, `"If we'd met at a nice party last week I might have made a pass at you. You'd be a better choice than my ex-husband at least."`));

			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function sell() {
			const frag = new DocumentFragment();
			r = [];
			cashX(cost, "slaveTransfer");
			r.push(`${He} arrives unapologetically in ${his} fine clothing.`);
			r.push(Spoken(slave, `"I'm not sorry,"`));
			r.push(`${he} says harshly,`);
			r.push(Spoken(slave, `"but I'm wearing my best one last time whether you like it or not."`));
			r.push(`Eventually ${he} sighs, squares ${his} shoulders, and visibly steels ${himself}. ${He}'s about to declaim something when a purchaser's agent arrives to bundle ${him} off. ${His} face darkens and ${he} mulls something over, probably preparing a really cutting remark, but before ${he} can deliver it the agent fastens a bag over ${his} head and ${he} is heard no more.`);
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
