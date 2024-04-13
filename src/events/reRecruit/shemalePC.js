App.Events.recShemalePC = class recShemalePC extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.PC.dick !== 0,
			() => V.PC.boobs >= 300,
			() => ((V.rep/250) > random(1, 100)) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}

	get eventName() {
		return "Shemale PC";
	}

	get weight() { return 2; }

	execute(node) {
		const slave = makeSlave();
		const {He, he, his, him, himself, girl} = getPronouns(slave);
		const {himselfA} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		let r = [];
		r.push(`${capFirstChar(V.assistant.name)} alerts you that a supplicant has arrived at the door to the penthouse. A constant stream of hopefuls appear at your door, and ${V.assistant.name} makes ${himselfA} invaluable by filtering them. One of the few categories of applicant that is always admitted is people willing to be enslaved for some reason; this is just such a ${girl}.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(Spoken(slave, `"Hi",`));
		r.push(`${he} says hesitantly. ${He}'s a pretty convincing girl; ${his} voice is the only giveaway. You tell ${him} that if ${he} wishes to be considered for enslavement, you need to inspect ${him} naked. To ${his} credit, ${he} obeys, undressing quickly to reveal a body that's clearly seen a good deal of hormone therapy. ${He}'s not unhealthy and isn't too shabby, so you ask ${him} why ${he}'s here.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(Spoken(slave, `"I don't make very much money,"`));
		r.push(`${he} says, and you manage not to laugh at the absurdity.`);
		r.push(Spoken(slave, `"I really want to be a prettier girl. I'm — I'm not really comfortable yet. But all the modern surgeries and drugs are so expensive. And I can't afford it, and I won't be able to before I'm old unless I decide to be a whore. So I decided if I was going to do that I might as well do it here, for you. You're,"`));
		r.push(`${he} blushes,`);
		r.push(Spoken(slave, `"you're very pretty. I would love to look like you."`));
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
			r.push(`You put ${him} through the enslavement procedures. ${He}'s almost excited. Though ${he} knows ${he}'s signed ${himself} over to a life of sexual slavery, the anticipation of becoming more feminine is clearly more important to ${him} than any kind of fear.`);
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addNode(el, r);
			return el;
		}

		function sell() {
			const el = new DocumentFragment();
			let r = [];
			cashX(cost, "slaveTransfer");
			r.push(`You put ${him} through the enslavement procedures. ${He} only realizes the true situation when ${his} purchaser's agent appears to take ${him} away. ${He} looks at you with a faint hopefulness.`);
			r.push(Spoken(slave, `"Do you think they'll pay for surgery and drugs for me?"`));
			r.push(`${he} asks plaintively. You observe that they probably will; ${he}'s been sold to a boutique trainer that produces high-class gelded escorts. ${He} quails a little at hearing about the castration, but squares ${his} shoulders and accompanies the agent willingly.`);
			App.Events.addNode(el, r);
			return el;
		}

		function makeSlave() {
			const slave = GenerateNewSlave("XY", {
				minAge: 13, maxAge: 20, disableDisability: 1, race: "nonslave"
			});
			generateSalonModifications(slave);
			slave.origin = "$He asked to be enslaved since $he felt you were $his only hope of becoming a prettier woman.";
			slave.devotion = random(10, 15);
			slave.trust = random(-15, -10);
			setHealth(slave, jsRandom(0, 20), undefined, undefined, 0, 0);
			slave.voice = 1;
			slave.dick = random(1, 2);
			slave.balls = random(1, 2);
			slave.scrotum = slave.balls;
			slave.anus = 1;
			slave.attrXX = Math.max(slave.attrXX, 70);
			slave.attrXY = Math.max(slave.attrXY, 70);
			slave.skill.anal = 15;
			slave.skill.oral = 15;
			slave.boobs += 400;
			slave.boobsImplant = 400;
			slave.boobsImplantType = "normal";
			slave.butt++;
			slave.buttImplant = 1;
			slave.buttImplantType = "normal";
			slave.lips += 10;
			slave.lipsImplant = 10;
			slave.face = Math.clamp(slave.face + 20, -100, 100);
			slave.faceImplant = 15;
			slave.piercing.ear.weight = either(0, 1);
			slave.piercing.navel.weight = either(0, 1);
			slave.piercing.nose.weight = either(0, 1);
			slave.piercing.eyebrow.weight = either(0, 1);
			slave.piercing.lips.weight = either(0, 1);
			slave.piercing.genitals.weight = either(0, 1);
			slave.piercing.nipple.weight = either(0, 1);
			slave.stampTat = either("advertisements", "degradation", "flowers", "rude words", "tribal patterns", 0, 0);
			slave.anusTat = either("bleached");
			slave.pubicHStyle = "waxed";
			return slave;
		}
	}
};
