App.Events.recMaleSD = class recMaleSD extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.seeDicks !== 0,
		];
	}

	get eventName() {
		return "Male Sold Debt";
	}

	execute(node) {
		const slave = makeSlave();
		const {
			He, His,
			he, his, him
		} = getPronouns(slave);
		let r = [];

		r.push(`Your desk flags a report of the arcology security service for your immediate attention. As it turns out, a number of pretty liberal students from`);
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
		r.push(`One dented hood and smashed windshield later, someone was in big trouble. The ever-present camera surveillance in your arcology made it easy to track the rock to the hand of the person who threw it — a good-looking young man, well-muscled too, who immediately got arrested and is awaiting sentencing in the lock-up right now. The video of ${him} getting booked — complete with a thorough strip-search (since all the officers agreed ${he} 'had to be hiding something') does make you think about the potential this guy would have as a slave with some training, and maybe a little surgical work to improve ${his} femininity.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`Given the damage to an expensive classic car and the meager balance of ${his} bank accounts, this student is definitively up for enslavement. There's no way ${he} or even anyone related to ${him} could come up with the cash. All of which leaves you with an opportunity... the car's owner hasn't seen the arrested student yet, so you could conceivably approach him and buy the debt for this young buck off him. Better be quick, or the owner might just choose to keep such a promising slave himself.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(App.UI.DOM.makeElement("span", `${His} debt will cost ${cashFormat(5000)} to pay off, with the usual ${cashFormat(1000)} in registration fees, and the option to make a satisfactory dickgirl out of ${him} afterward. Alternatively, you could buy ${him} and after just a little work with the remote surgery sell a newly made dickgirl.`, "note"));

		App.Events.addParagraph(node, r);
		const contractCost = 6000;
		const cost = slaveCost(slave) - contractCost;
		const responses = [];
		if (V.cash >= contractCost) {
			responses.push(new App.Events.Result(`Enslave ${him}`, enslave));
			responses.push(new App.Events.Result(`Enslave ${him} and arrange immediate feminization surgery`, feminize));
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
			r.push(`Contacting the wealthy resident, you apologize for his inconvenience and offer to 'deal with' the matter personally. He is content with not having the hassle and agrees with little thought, leaving you owning the debt of the unfortunate student. Making your way to the guard station where ${he} is being kept, you tell the young man ${he}'s getting out of jail right away. ${He} cooperates with having ${his} biometric readings taken and logged, only later realizing this isn't for a release, but to register ${him} as a slave. In shock and with tears in ${his} eyes, ${he} gets angry and tries to fight, only to be overwhelmed by your guards and dragged off to the slave quarters.`);
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addNode(el, r);
			return el;
		}

		function feminize() {
			const node = new DocumentFragment();
			let r = [];
			cashX(forceNeg(contractCost), "slaveTransfer", slave);
			r.push(`Contacting the wealthy resident, you apologize for his inconvenience and offer to 'deal with' the matter personally. He is content with not having the hassle and agrees with little thought, leaving you owning the debt of the unfortunate student. Making your way to the guard station where he is being kept, you tell the young man ${he}'s getting out of jail right away. ${He} cooperates with having his biometric readings taken and logged, only later realizing this isn't for a release, but to register ${him} as a slave. In shock and with tears in ${his} eyes, ${he} gets angry and tries to fight, only to be overwhelmed by your guards and dragged off to the remote surgery. It doesn't take long at all to add a pretty dickgirl to your slave quarters after that.`);
			slave.faceImplant = 15;
			slave.face = Math.clamp(slave.face + slave.faceImplant, -100, 100);
			slave.faceShape = "normal";
			surgeryDamage(slave, 10);
			slave.devotion = Math.clamp(slave.devotion - 5, -100, 100);
			slave.trust = Math.clamp(slave.trust - 10, -100, 100);
			App.Events.addNode(node, r);
			node.append(App.UI.newSlaveIntro(slave));
			return node;
		}

		function sell() {
			const el = new DocumentFragment();
			let r = [];
			cashX(cost, "slaveTransfer");
			r.push(`Contacting the wealthy resident, you apologize for his inconvenience and offer to 'deal with' the matter personally. He is content with not having the hassle and agrees with little thought, leaving you owning the debt of the unfortunate student. Making your way to the guard station where he is being kept, you tell the young man ${he}'s getting out of jail right away. ${He} cooperates with having ${his} biometric readings taken and logged, only later realizing this isn't for a release, but to register ${him} as a slave. In shock and with tears in ${his} eyes, ${he} gets angry and tries to fight, only to be overwhelmed by your guards and dragged off to the remote surgery. It doesn't take long at all before the student is transported to the office of the slave broker you sold ${him} to.`);
			App.Events.addNode(el, r);
			return el;
		}

		function makeSlave() {
			const slave = GenerateNewSlave("XY", {
				minAge: 13, maxAge: 20, disableDisability: 1, race: "nonslave"
			});
			generateSalonModifications(slave);
			slave.origin = "$He got into debt for damaging someone's property during a student protest and you bought out $his debt.";
			slave.devotion = random(-30, -5);
			slave.trust = random(-25, -5);
			setHealth(slave, jsRandom(20, 40), undefined, undefined, undefined, 10);
			slave.face = random(5, 45);
			slave.skill.vaginal = 0;
			slave.skill.anal = random(0, 40);
			slave.skill.oral = random(0, 40);
			slave.skill.penetrative = jsRandom(0, 65);
			slave.skill.whoring = 0;
			slave.boobs = 150;
			slave.vagina = -1;
			slave.labia = 0;
			slave.ovaries = 0;
			slave.preg = 0;
			slave.anus = random(0, 1);
			slave.dick = random(3, 5);
			slave.balls = random(2, 4);
			slave.scrotum = slave.balls;
			slave.weight = 0;
			slave.muscles = 50;
			slave.intelligence = random(15, 90);
			slave.intelligenceImplant = 15;
			slave.teeth = "normal";
			slave.career = "a student";
			slave.behavioralFlaw = "liberated";
			return slave;
		}
	}
};
