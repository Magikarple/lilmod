App.Events.recFemaleSD = class recFemaleSD extends App.Events.BaseEvent {
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
			he, his, him, woman,
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
		r.push(`One dented hood and smashed windshield later, someone was in big trouble. The ever-present camera surveillance in your arcology made it easy to track the rock to the hand of the person who threw it — a quite pretty young ${woman}, who immediately got arrested and is awaiting sentencing in the lock-up right now. The video of ${him} getting booked — complete with a thorough strip-search (since all the officers agreed ${he} 'had to be hiding something') is definitively worth saving to a private folder.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`Given the damage to an expensive classic car and the meager balance of ${his} bank accounts, this student is definitively up for enslavement. There's no way ${he} or even anyone related to ${him} could come up with the cash. All of which leaves you with an opportunity... the car's owner hasn't seen ${him} yet, so you could conceivably approach him and buy the debt for this beauty off him. Better be quick, if he realizes what is waiting in a cell for him, you doubt he'd sell ${him} at all.`);
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
			r.push(`Contacting the wealthy resident, you apologize for his inconvenience and offer to 'deal with' the matter personally. He is content with not having the hassle and agrees with little thought, leaving you owning the debt of the unfortunate student. Making your way to the guard station where ${he} is being kept, you tell the young ${woman} ${he}'s getting out of jail right away. ${He} cooperates to having ${his} biometric readings taken and logged, only later realizing this isn't for ${his} release but to register ${him} as a slave. In shock and with tears in ${his} eyes, ${he} dejectedly follows the guard you summon to have ${him} brought to the slave quarters.`);
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addNode(el, r);
			return el;
		}

		function sell() {
			const el = new DocumentFragment();
			let r = [];
			cashX(cost, "slaveTransfer");
			r.push(`Contacting the wealthy resident, you apologize for his inconvenience and offer to 'deal with' the matter personally. He is content with not having the hassle and agrees with little thought, leaving you owning the debt of the unfortunate student. Making your way to the guard station where ${he} is being kept, you tell the young ${woman} ${he}'s getting out of jail right away. ${He} cooperates to having ${his} biometric readings taken and logged, only later realizing this isn't for ${his} release but to register ${him} as a slave. In shock and with tears in ${his} eyes, ${he} dejectedly follows the guard you summon to have ${him} brought to the slave broker you sold ${him} to.`);
			App.Events.addNode(el, r);
			return el;
		}

		function makeSlave() {
			const slave = GenerateNewSlave("XX", {
				minAge: 13, maxAge: 21, disableDisability: 1, race: "nonslave"
			});
			generateSalonModifications(slave);
			slave.origin = "$He got into debt for damaging someone's property during a student protest and you bought out $his debt.";
			slave.devotion = random(-25, 0);
			slave.trust = random(-20, -5);
			setHealth(slave, jsRandom(20, 40), undefined, undefined, undefined, 10);
			slave.face = random(20, 60);
			slave.skill.vaginal = random(0, 15);
			slave.skill.anal = 0;
			slave.skill.oral = random(0, 15);
			slave.skill.whoring = 0;
			slave.boobs = random(2, 6) * 100;
			slave.natural.boobs = slave.boobs;
			slave.vagina = 1;
			slave.labia = 0;
			slave.clit = 0;
			slave.ovaries = 1;
			slave.preg = -1;
			slave.anus = 0;
			slave.weight = 0;
			slave.muscles = 20;
			slave.intelligence = random(16, 90);
			slave.intelligenceImplant = 15;
			slave.teeth = "normal";
			slave.career = "a student";
			slave.behavioralFlaw = "liberated";
			return slave;
		}
	}
};
