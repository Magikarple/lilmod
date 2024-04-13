App.Events.recFSPhysicalIdealistTwo = class recFSPhysicalIdealistTwo extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
		];
	}

	actorPrerequisites() {
		return [];
	}

	get weight() {
		return V.arcologies[0].FSPhysicalIdealist > random(1, 100) ? 1 : 0;
	}

	execute(node) {
		let r = [];
		const slave = GenerateNewSlave(null, {maxAge: 42, disableDisability: 1});
		generateSalonModifications(slave);
		slave.origin = "$He was voluntarily enslaved after $he decided that your arcology was the best place for $him to get the steroids that $he'd allowed to define $his life.";
		setHealth(slave, jsRandom(20, 40), undefined, undefined, 0, 20);
		slave.muscles = 100;
		slave.addict = 1;
		slave.devotion = random(0, 15);
		slave.trust = random(0, 15);

		const {
			He,
			his, he, him, himself, woman
		} = getPronouns(slave);
		const {HeA} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const {title: Master} = getEnunciation(slave);
		const contractCost = sexSlaveContractCost();
		const cost = slaveCost(slave) - contractCost;
		r.push(`You receive so many messages, as a noted titan of the new Free Cities world, that ${V.assistant.name} has to be quite draconian in culling them. ${HeA} lets only the most important through to you. One category of message that always gets through regardless of content, though, is requests for voluntary enslavement. As the new world takes shape, they've become less rare than they once were.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`And this one is a rare one indeed. It's a personal file, and you suppress the urge to see whether ${V.assistant.name} is bugged and has misfiled an application for employment. The muscular ${woman} depicted has included a resume listing ${his} various physical achievements, and a clever selection of photographs: tantalizing shots of ${him} in skimpy workout clothes, and fully nude mirror shots of ${him} flexing and posing. Curious, you place a video call and get an immediate answer. It seems that ${he}'s determined that life as a slave is the easiest means to access the drugs and steroids ${he} needs to continue making massive gains. ${He} had some weeks of planning, however, and seems to have made use of the time to find an arcology owner that values the pursuit of the physical ideal, and then to make ${himself} as appealing as possible in the hope you'll take ${him}.`);

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
			r.push(`When ${he} arrives, you're impressed again. ${He}'s even more muscular in person than in ${his} pictures.`);
			r.push(Spoken(slave, `"${Master},"`));
			r.push(`${he} growls,`);
			r.push(Spoken(slave, `"I've done my very best to be the biggest, strongest slave before coming here. May I show you?"`));
			r.push(`More than a little curious, you nod. ${He} reaches down to place a palm on the ground.`);
			r.push(Spoken(slave, `"Well, ${Master}, I had a month. So I did my best to get in shape."`));
			r.push(`${He} suddenly flips as if starting a cartwheel, but stops suspended in midair, holding ${his} entire muscular frame off the ground with just one hand planted on the floor. ${He} turns slowly, revealing the base of an impressively large buttplug nestling between ${his} cheeks. ${He} knows ${his} audience.`);

			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function sell() {
			const frag = new DocumentFragment();
			r = [];
			cashX(cost, "slaveTransfer");
			r.push(`When ${he} arrives, you're impressed again. ${He}'s even more muscular in person than in ${his} pictures.`);
			r.push(Spoken(slave, `"${Master},"`));
			r.push(`${he} growls,`);
			r.push(Spoken(slave, `"I've done my very best to be the biggest, strongest slave before coming here. May I show you?"`));
			r.push(`Though more than a little curious, the arrival of the purchasing agent cuts short any theatrics. Though initially confused, the promise of steroids and other drugs by ${his} new owner has ${him} follow the agent out of your penthouse without fuss.`);
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
