// cSpell:ignore fuckin

App.Events.recHandsomePC = class recHandsomePC extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.PC.dick !== 0,
			() => V.PC.vagina === -1,
			() => V.PC.boobs < 300,
			() => V.PC.title === 1,
			() => ((V.rep/250) > random(1, 100)) || (V.debugMode > 0 && V.debugModeEventSelection > 0),
		];
	}

	get eventName() {
		return "Handsome PC";
	}

	get weight() { return 2; }

	execute(node) {
		const slave = makeSlave();
		const {
			He, His,
			he, his, him, girl,
		} = getPronouns(slave);
		const {HeA, heA, himselfA} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		let r = [];
		r.push(`${capFirstChar(V.assistant.name)} alerts you that a supplicant has arrived at the door to the penthouse. A constant stream of hopefuls appear at your door, and ${V.assistant.name} makes ${himselfA} invaluable by filtering them. One of the few categories of applicant that is always admitted is people willing to be enslaved for some reason; this is just such a ${girl}.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`The young ${girl} who is admitted to your office quails a bit at the sight of you, and you believe you can detect a bit of infatuation there, too. You wordlessly query ${V.assistant.name}, and ${heA} turns to the massive task of sorting through arcology records to come up with a possible explanation. Meanwhile, you start interviewing the potential slave. It appears that ${he} left home, in a settlement near the arcology, right after ${his} ${ordinalSuffix(slave.actualAge)} birthday and came straight here. ${He}'s no innocent, and not destitute, and you're surprised ${he}'s done something this foolish.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`After a short while, your assistant whispers in your earpiece,`);
		if (V.assistant.personality <= 0) {
			r.push(`${properTitle()},`);
		} else {
			r.push(`"Sweetheart,`);
		}
		r.push(`${he} doesn't live here. Look at this." ${HeA} pulls up footage of a public event several weeks ago, and the ${girl} is in the crowd, staring at you with limpid eyes. Rather than confronting ${him} directly, you probe the subject, and after some evasion ${he} admits that yes, ${he} did come here out of infatuation with you.`);
		r.push(Spoken(slave, `"Pretty fuckin' stupid,"`));
		r.push(`${he} admits.`);
		r.push(Spoken(slave, `"But I've come too far now. I just really want to live here. With you, I guess. If that means being your slave, that's okay. Can I be your house servant, maybe?"`));
		App.Events.addParagraph(node, r);

		node.append(App.Desc.longSlave(slave, {market: "generic"}));

		const contractCost = 1000;
		const cost = slaveCost(slave) - contractCost;
		const responses = [];
		if (V.cash >= contractCost) {
			responses.push(new App.Events.Result(`Enslave ${him}`, enslave));
		} else {
			responses.push(new App.Events.Result(null, null, `You lack the necessary funds to enslave ${him}`));
		}
		responses.push(new App.Events.Result(`Sell ${him} immediately`, sell, `This will bring in ${cashFormat(cost)}`));
		App.Events.addResponses(node, responses);

		function enslave() {
			const el = new DocumentFragment();
			let r = [];
			cashX(forceNeg(contractCost), "slaveTransfer", slave);
			r.push(`You put ${him} through the enslavement procedures. ${He} looks doubtful, obviously wondering whether ${he}'s made a huge mistake. ${He}'s legally your property, now; you can fulfill ${his} wishes for a gentler assignment near you, or not. ${His} suspicion that ${he}'s blundered into something terrible no longer matters.`);
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addNode(el, r);
			return el;
		}

		function sell() {
			const el = new DocumentFragment();
			let r = [];
			cashX(cost, "slaveTransfer");
			r.push(`You put ${him} through the enslavement procedures. ${He} only realizes ${his} mistake when ${his} purchaser's agent appears to take ${him} away. ${He} looks at you in total unwillingness to believe you'd do such a thing; you observe politely that ${he}'s likely to receive an easy assignment like being a house servant in about twenty years. In the meantime, you continue, ${he}'s been purchased by a brothel, so ${he}'s going to be fucked about 70,000 times before then. ${He} releases a wail of utter despair, quickly cut off by a sturdy bag being fastened over ${his} head.`);
			App.Events.addNode(el, r);
			return el;
		}

		function makeSlave() {
			const slave = GenerateNewSlave("XX", {
				minAge: random(12, 16), maxAge: 19, disableDisability: 1, race: "nonslave"
			});
			generateSalonModifications(slave);
			slave.origin = "$He asked to be enslaved out of naïve infatuation with you.";
			slave.devotion = random(25, 30);
			slave.trust = random(-15, -10);
			setHealth(slave, jsRandom(0, 20), undefined, undefined, 0, 0);
			slave.anus = 1;
			slave.attrXY = random(70, 100);
			if (slave.behavioralFlaw === "hates men") {
				slave.behavioralFlaw = "none";
			}
			slave.skill.anal = 15;
			slave.skill.oral = 15;
			if (slave.vagina > 0) {
				slave.vagina = 1;
				slave.skill.vaginal = 15;
			}
			slave.birthWeek = random(0, 2);
			slave.piercing.ear.weight = either(0, 1);
			return slave;
		}
	}
};
