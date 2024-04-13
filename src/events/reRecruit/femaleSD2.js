App.Events.recFemaleSD2 = class recFemaleSD2 extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.seeDicks !== 100,
		];
	}

	get eventName() {
		return "Female Sold Debt";
	}

	execute(node) {
		const slave = makeSlave();
		const {
			He, His,
			he, his, him, himself, woman,
		} = getPronouns(slave);
		let r = [];

		r.push(`Your desk flags a report of the arcology security service for your immediate attention. As it turns out, a number of rather liberal students from`);
		if (slave.actualAge >= 18) {
			r.push(`a college`);
		} else if (slave.actualAge >= 14) {
			r.push(`a high school`);
		} else if (slave.actualAge >= 11) {
			r.push(`a junior high school`);
		} else {
			r.push(`an elementary school`);
		}
		r.push(`in your arcology led a protest earlier today in the financial district several levels up from their institution. Seems to have been against slavery, for environmentalism, or some other nonsense that you skip over reading. The really interesting thing is what happened during the protest anyways. Things became a bit unruly between protesters and some counter-protesters — and at some point rocks started to fly... all of which would barely be worth a mention, if the vintage sports car of a prominent resident hadn't been parked on the same street.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`One dented hood and smashed windshield later, someone was in big trouble. The ever-present camera surveillance in your arcology made it easy to track the rock to the hand of the person who threw it — a rather fat young ${woman}, who immediately got arrested and is awaiting sentencing in the lock-up right now. The video of ${him} getting booked — complete with a thorough strip-search by a new recruit (since all the officers agreed ${he} 'had to be hiding something') was definitely amusing. ${His} reaction was priceless.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`Given the damage to an expensive classic car and the meager balance of ${his} bank accounts, this student is definitively up for enslavement. There's no way ${he} or even anyone related to ${him} could come up with the cash.`);
		if (FutureSocieties.isActive('FSHedonisticDecadence')) {
			r.push(`All of which leaves you with an opportunity... the car's owner hasn't seen ${him} yet, so you could conceivably approach him and buy the debt for this beauty off him. Better be quick, if he realizes what is waiting in a cell for him, you doubt he'd sell ${him} at all.`);
		} else {
			r.push(`Most slavers wouldn't give such a bloated slave a second look, but your eyes are keen; there is a rather pretty face buried under all that flab. With a bit of work, ${he} can be turned into a rather valuable asset; also it's always fun to break a haughty bitch into an obedient slut.`);
		}
		App.Events.addParagraph(node, r);
		r = [];
		r.push(App.UI.DOM.makeElement("span", `${His} debt will cost ${cashFormat(5000)} to pay off, with the usual ${cashFormat(1000)} in registration fees afterward. Alternatively, you could buy ${him} and sell ${him}.`, "note"));

		App.Events.addParagraph(node, r);
		const contractCost = 6000;
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
			r.push(`Contacting the wealthy resident, you apologize for his inconvenience and offer to 'deal with' the matter personally. He is content with not having the hassle and agrees with little thought, leaving you owning the debt of the unfortunate student. Making your way to the guard station where ${he} is being kept, you tell the young ${woman} ${he}'s getting out of jail right away. ${He} cooperates to having ${his} biometric readings taken and logged, only later realizing this isn't for ${his} release but to register ${him} as a slave. ${He} makes a poor decision to rebel against you on the way to the slave quarters, but ${his} jiggling mass makes it a pathetically short distance before tiring and dejectedly following the guard the rest of the way.`);
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addNode(el, r);
			return el;
		}

		function sell() {
			const el = new DocumentFragment();
			let r = [];
			cashX(cost, "slaveTransfer");
			r.push(`Contacting the wealthy resident, you apologize for his inconvenience and offer to 'deal with' the matter personally. He is content with not having the hassle and agrees with little thought, leaving you owning the debt of the unfortunate student. Making your way to the guard station where ${he} is being kept, you tell the young ${woman} ${he}'s getting out of jail right away. ${He} cooperates to having ${his} biometric readings taken and logged, only later realizing this isn't for ${his} release but to register ${him} as a slave. ${He} makes a poor decision to rebel against ${his} guard you summoned to have ${him} brought to the slave broker you sold ${him} to, earning ${himself} a taser shock and a degrading cart ride with ${his} ass bare for all to see.`);
			App.Events.addNode(el, r);
			return el;
		}

		function makeSlave() {
			const slave = GenerateNewSlave("XX", {
				minAge: 13, maxAge: 27, disableDisability: 1, race: "nonslave"
			});
			slave.origin = "$He got into debt for damaging someone's property during a student protest and you bought out $his debt.";
			slave.devotion = -100;
			slave.trust = 60;
			setHealth(slave, jsRandom(-20, 20), undefined, undefined, undefined, 10);
			slave.face = random(80, 100);
			slave.faceShape = "sensual";
			slave.skill.vaginal = 0;
			slave.skill.anal = 0;
			slave.skill.oral = random(0, 30);
			slave.skill.whoring = 0;
			slave.boobs = random(2, 4) * 100;
			slave.vagina = 0;
			slave.labia = 0;
			slave.clit = 0;
			slave.ovaries = 1;
			slave.preg = -1;
			slave.anus = 0;
			slave.weight = random(100, 180);
			slave.muscles = random(-20, 0);
			slave.intelligence = random(-50, 90);
			slave.intelligenceImplant = 15;
			slave.teeth = "normal";
			slave.career = "a student";
			slave.behavioralFlaw = "hates men";
			slave.sexualFlaw = "hates penetration";
			slave.hStyle = "strip";
			slave.hLength = 5;
			slave.pubicHStyle = "very bushy";
			slave.underArmHStyle = "bushy";
			slave.piercing.nose.weight = 1;
			slave.piercing.tongue.weight = 1;
			slave.piercing.ear.weight = 2;
			slave.piercing.nipple.weight = 1;
			slave.piercing.lips.weight = 1;
			slave.piercing.vagina.weight = 1;
			slave.piercing.eyebrow.weight = 1;
			slave.piercing.navel.weight = 1;
			slave.override_H_Color = 1;
			slave.hColor = either("blue", "green", "purple");
			return slave;
		}
	}
};
