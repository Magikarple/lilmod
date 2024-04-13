App.Events.recFSMaturityPreferentialist = class recFSMaturityPreferentialist extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
		];
	}

	actorPrerequisites() {
		return [];
	}

	get weight() {
		return V.arcologies[0].FSMaturityPreferentialist > random(1, 100) ? 1 : 0;
	}

	execute(node) {
		let r = [];
		const slave = GenerateNewSlave(null, {
			minAge: V.retirementAge-4, maxAge: V.retirementAge-2, ageOverridesPedoMode: 1, disableDisability: 1
		});
		slave.origin = "$He offered $himself to you for enslavement after deciding you were $his best hope of a good life as a slave.";
		setHealth(slave, jsRandom(40, 60), undefined, undefined, 0, 0);
		slave.devotion = random(25, 45);
		slave.trust = random(25, 45);
		slave.muscles = 20;
		slave.face = random(0, 20);
		slave.anus = random(2, 3);
		if (slave.vagina !== -1) {
			slave.vagina = random(2, 3);
		}
		slave.weight = 20;
		slave.boobs += 50*random(1, 10);
		slave.butt += random(0, 2);
		slave.lips += random(5, 15);
		slave.skill.entertainment = 35;
		slave.skill.anal = 35;
		slave.skill.oral = 35;
		slave.behavioralFlaw = "none";
		slave.sexualFlaw = "none";
		slave.energy = random(80, 90);
		const {
			He,
			his, he, him, himself, woman, women
		} = getPronouns(slave);
		const {title: Master} = getEnunciation(slave);
		const {HeA} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const contractCost = sexSlaveContractCost();
		const cost = slaveCost(slave) - contractCost;
		r.push(`You receive so many messages, as a noted titan of the new Free Cities world, that ${V.assistant.name} has to be quite draconian in culling them. ${HeA} lets only the most important through to you. One category of message that always gets through regardless of content, though, is requests for voluntary enslavement. As the new world takes shape, they've become less rare than they once were.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`And this one is a rare one indeed. It's a personal file, and you suppress the urge to see whether ${V.assistant.name} is bugged and has misfiled an application for employment. The beautiful older ${woman} depicted has included a resume listing ${his} skills, and a clever selection of photographs: tasteful shots of ${him} in nice makeup and a fashionable business skirt, and fully nude mirror shots, flaws and all. Curious, you place a video call and get an immediate answer. It seems that 'personal circumstances' that ${he} saw coming are forcing ${him} to accept enslavement. ${He} had some weeks of warning, however, and seems to have made use of the time to find an arcology owner that treats ${women} of ${his} age well, and then to make ${himself} as appealing as possible in the hope you'll keep ${him}.`);

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
			r.push(`When ${he} arrives, you're impressed again. ${He} elected to appear in black lace lingerie, and stalks into your office on high heels with a calculated sensuality.`);
			r.push(Spoken(slave, `"${Master},"`));
			r.push(`${he} purrs,`);
			r.push(Spoken(slave, `"I've done my very best to get ready to be a good slave. May I show you?"`));
			r.push(`More than a little curious, you nod. ${He} starts to strip slowly and skillfully.`);
			r.push(Spoken(slave, `"Well, ${Master}, I had a month. So I did my best to get in shape."`));
			r.push(`${He} rubs ${his} hands down ${his} toned belly, hooking fingers under ${his} thong.`);
			r.push(Spoken(slave, `"I practiced stripping. I practiced blowjobs."`));
			r.push(`${He} turns slowly, revealing the base of an impressively large buttplug nestling between ${his} cheeks.`);
			r.push(Spoken(slave, `"I even practiced buttsex."`));

			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function sell() {
			cashX(cost, "slaveTransfer");
			return `${He} and the buyer's agent arrive at the same time. ${He} accepts this defeat with good grace, and cooperates with him as best ${he} can. ${He} gives you a single questioning glance, with just a glint of hope; you take pity, and tell ${him} ${he} won't be going far. ${He}'s to be employed in one of the arcology's better MILF brothels. ${He}'ll be fucked ten times tomorrow, it's true, but ${he}'ll be well treated when ${he} doesn't have dicks in ${him}.`;
		}
	}
};
