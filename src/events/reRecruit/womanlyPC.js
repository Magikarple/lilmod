App.Events.recWomanlyPC = class recWomanlyPC extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.PC.dick === 0,
			() => V.PC.boobs >= 300,
			() => V.PC.title === 0,
			() => ((V.rep/250) > random(1, 100)) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}

	get eventName() {
		return "Womanly PC";
	}

	get weight() { return 2; }

	execute(node) {
		const slave = makeSlave();
		const {He, he, his, him, woman} = getPronouns(slave);
		const {himselfA} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		let r = [];

		r.push(`${capFirstChar(V.assistant.name)} alerts you that a supplicant has arrived at the door to the penthouse. A constant stream of hopefuls appear at your door, and ${V.assistant.name} makes ${himselfA} invaluable by filtering them. One of the few categories of applicant that is always admitted is people willing to be enslaved for some reason; this is just such a ${woman}.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(Spoken(slave, `"It's my husband,"`));
		r.push(`${he} says forthrightly.`);
		r.push(Spoken(slave, `"I'm pretty sure the bastard is going to enslave me."`));
		r.push(`${He} pours out the trite story; it's terrifically boring, but it pays to hear people who want to be enslaved out. It's the only forbearance you'll need to show ${him}, ever, if you manage things correctly.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(Spoken(slave, `"So,"`));
		r.push(`${he} sums up, sighing and dabbing at tears,`);
		r.push(Spoken(slave, `"I know you're a slaveowner. I don't really have anywhere else to go, so I'll be your slave. I'm not stupid, and I'm not ugly, so I know that means I'd be a sex slave. But it's better than the open market."`));
		r.push(`Left unsaid is ${his} obvious expectation that you'll be sympathetic to ${his} plight.`);

		App.Events.addParagraph(node, r);
		const contractCost = 1000;
		const cost = slaveCost(slave) - contractCost;
		const responses = [];
		if (V.cash >= contractCost) {
			responses.push(new App.Events.Result(`Enslave ${him}`, enslave));
		} else {
			responses.push(new App.Events.Result(null, null, `You lack the necessary funds to enslave ${him}`));
		}
		responses.push(new App.Events.Result(`Sell ${him} immediately`, sell, `This will bring in ${cashFormat(cost)}`));

		node.append(App.Desc.longSlave(slave, {market: "generic"}));

		App.Events.addResponses(node, responses);

		function enslave() {
			const el = new DocumentFragment();
			let r = [];
			cashX(forceNeg(contractCost), "slaveTransfer", slave);
			r.push(`You put ${him} through the enslavement procedures. ${He} looks relieved, as though ${he} thinks ${he} no longer has anything to worry about. ${He}'s certainly more complacent than the average inductee.`);
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addNode(el, r);
			return el;
		}

		function sell() {
			const el = new DocumentFragment();
			let r = [];
			cashX(cost, "slaveTransfer");
			r.push(`You put ${him} through the enslavement procedures. ${He} only realizes the true situation when ${his} purchaser's agent appears to take ${him} away. ${He} looks at you in total unwillingness to believe you'd do such a thing; you observe politely that ${he}'s been purchased by a brothel, but is old enough ${he}'ll probably only work there for ten years or so. During that time ${he}'ll only be fucked 30,000 times, give or take. ${He} releases a wail of utter despair, quickly cut off by a sturdy bag being fastened over ${his} head.`);
			App.Events.addNode(el, r);
			return el;
		}

		function makeSlave() {
			const slave = GenerateNewSlave("XX", {
				minAge: 28, maxAge: 32, disableDisability: 1, race: "nonslave"
			});
			generateSalonModifications(slave);
			slave.origin = "$He asked to be enslaved in the hope you'd treat a fellow woman well.";
			slave.devotion = random(10, 15);
			slave.trust = random(-15, -10);
			setHealth(slave, jsRandom(0, 20), undefined, undefined, 0, 0);
			slave.face = random(0, 20);
			slave.anus = 1;
			slave.skill.anal = 0;
			slave.skill.oral = 15;
			slave.vagina = 1;
			slave.behavioralFlaw = "hates men";
			slave.skill.vaginal = 15;
			slave.piercing.ear.weight = either(0, 1);
			slave.piercing.navel.weight = either(0, 1);
			slave.piercing.nose.weight = either(0, 1);
			slave.piercing.genitals.weight = either(0, 1);
			slave.piercing.nipple.weight = either(0, 1);
			slave.shouldersTat = either("flowers", "tribal patterns", 0, 0);
			slave.stampTat = either("flowers", "tribal patterns", 0, 0);
			return slave;
		}
	}
};
