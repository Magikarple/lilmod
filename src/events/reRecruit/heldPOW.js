App.Events.recHeldPOW = class recHeldPOW extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.seeDicks !== 100,
			() => V.PC.skill.hacking >= 50,
			() => (random(0, 100) < V.PC.skill.hacking) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}

	get eventName() {
		return "Held POW";
	}

	execute(node) {
		const slave = makeSlave();
		const {
			He, His,
			he, his, him,
		} = getPronouns(slave);
		let r = [];

		r.push(`While digging through the database of a POW camp for anything of value, you find records of a`);
		if (slave.actualAge > 17) {
			r.push(`rather attractive`);
		} else if (slave.actualAge > 12) {
			r.push(`teenage`);
		} else {
			r.push(`child`);
		}
		r.push(`soldier long abandoned by ${his} nation. You forge false orders to have ${him} transported to a new location, a location that would be trivial for you to obtain ${him} from.`);

		App.Events.addParagraph(node, r);
		r = [];
		r.push(`Upon ${his} inevitable arrival in your penthouse, you see`);
		if (V.seeExtreme === 1) {
			r.push(`the traces of ${his} wounds, that ${he} has been greatly modified for war, and that ${he} had been raped, repeatedly, despite ${his} powerful body.`);
			slave.teeth = "pointy";
			slave.muscles = random(30, 70);
			slave.height = Height.random(slave, {skew: 3, spread: .2, limitMult: [1, 4]});
			slave.chem = 1000;
			slave.attrXX = 0;
			slave.attrXY = 0;
			configureLimbs(slave, "all", 6);
		} else {
			r.push(`the traces of ${his} wounds, that ${he} had been left bound long enough for ${his} body to atrophy, and that ${he} had been raped, repeatedly.`);
		}
		if (V.seePreg === 1) {
			slave.preg = 2;
			slave.pregType = 1;
			slave.pregWeek = 2;
			SetBellySize(slave);
		}
		r.push(`${His} odd behavior suggests that ${his} will to live has nearly been snuffed out. ${He} likely wouldn't have lasted much longer, though it's questionable if ${he} still will if you let ${him} walk free.`);

		App.Events.addParagraph(node, r);
		const contractCost = 5000;
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
			r.push(`You complete the legalities and biometric scanning quickly and without fuss; ${his} will to fight has long since broken.`);
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addNode(el, r);
			return el;
		}

		function sell() {
			const el = new DocumentFragment();
			let r = [];
			cashX(cost, "slaveTransfer");
			r.push(`You complete the legalities and biometric scanning quickly and without fuss; ${his} will to fight has long since broken. Although you do catch a faint glimmer of joy in ${his} eyes as you tell ${him} ${he}'s been purchased by a notorious Pit Master and will likely spend the rest of ${his} life in combat.`);
			App.Events.addNode(el, r);
			return el;
		}

		function makeSlave() {
			const slave = GenerateNewSlave("XX", {
				minAge: Math.max(V.fertilityAge, 8), maxAge: 22,
				ageOverridesPedoMode: 1, disableDisability: 1
			});
			configureLimbs(slave, "all", 2);
			slave.origin = "You helped free $him from a POW camp after being abandoned by $his country, leaving $him deeply indebted to you.";
			slave.devotion = random(0, 20);
			slave.trust = random(0, 20);
			setHealth(slave, -50, normalRandInt(15, 4), normalRandInt(15, 4), Math.max(normalRandInt(1, 0.5), 0), jsRandom(30, 80));
			slave.muscles = random(-80, 0);
			slave.weight = random(-80, -60);
			slave.waist = random(-40, -20);
			slave.skill.combat = 70;
			slave.boobs = random(3, 6) * 100;
			slave.natural.boobs = slave.boobs * 2;
			slave.behavioralFlaw = "odd";
			slave.behavioralQuirk = "insecure";
			slave.sexualFlaw = "self hating";
			slave.sexualQuirk = "unflinching";
			slave.fetish = "masochist";
			slave.fetishStrength = 100;
			slave.fetishKnown = 0;
			slave.vaginaLube = 0;
			slave.collar = "shock punishment";
			slave.energy = 0;
			if (slave.actualAge < 13) {
				slave.career = "a child soldier";
			} else if (random(1, 100) > 50) {
				slave.career = "a mercenary";
			} else {
				slave.career = "a soldier";
			}
			slave.vagina = 3;
			slave.anus = 2;
			return slave;
		}
	}
};
