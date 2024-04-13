App.Events.recFarmBull = class recFarmBull extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.seeDicks !== 0
		];
	}

	get eventName() {
		return "Farm Bull";
	}

	execute(node) {
		const slave = makeSlave();
		const {
			He,
			he, his, him,
		} = getPronouns(slave);
		let r = [];

		r.push(`As you're working on some boring administrative matters, a courier comes to your office, delivering a satchel of documents. Opening it up to check who would go through the trouble of having something hand-delivered, you find out that the Free Cities Farmers Association (FCFA) has chosen your arcology to hold the next of their semi-regular conventions, in which prominent members of the industry will gather and new developments be presented. Sounds like a mixture of a conference and a trade show, and the association has rented out the convention center in the mid-levels of your demesne for more than a week. That'll certainly boost the local economy a bit.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`From the looks of all the brochures and extra information included, the association's president is well-versed in how the Free Cities are run... leading him to promote his group directly to you. And not only that — in an effort to curry favor, he included a slave's records, including an offer to buy the obedient breeding bull (a dickgirl) from his own stable for an almost ridiculously low price.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(App.UI.DOM.makeElement("span", `Checking ${his} stats and the videos included, you see the dickgirl is healthy and well cared for, fitting for a prized breeder of countless milk cows. ${He}'s fathered countless offspring already and will yield quite a bit of cum if ${his} cock is milked. With the registration and all, it'll still just take ${cashFormat(2500)} to buy ${him} and add ${him} to your own slave lineup.`, ["note"]));

		App.Events.addParagraph(node, r);

		node.append(App.Desc.longSlave(slave, {market: "generic"}));

		const contractCost = 2500;
		const responses = [];
		if (V.cash >= contractCost) {
			responses.push(new App.Events.Result(`Enslave ${him}`, enslave));
		} else {
			responses.push(new App.Events.Result(null, null, `You lack the necessary funds to enslave ${him}`));
		}
		App.Events.addResponses(node, responses);

		function enslave() {
			const el = new DocumentFragment();
			let r = [];
			cashX(forceNeg(contractCost), "slaveTransfer", slave);
			r.push(`Making a video call to tell the association president you accept the asking price for ${slave.slaveName}, you're drawn into a conversation with the skillful speaker, at the end of which you agree to be the honored guest for their convention. Who knows, new developments in the slave farming industry might actually prove interesting to learn about, and the pleasure of acquiring a new slave will make it worth your while even if it turns out to be boring. In short notice, the dickgirl you just bought is brought to your penthouse where ${he} obediently strips and stands ready for your inspection, a sizable cock swinging between ${his} legs.`);
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addNode(el, r);
			return el;
		}

		function makeSlave() {
			const pram = new GenerateNewSlavePram();
			pram.maxAge = 15;
			pram.disableDisability = 1;
			if (V.pedo_mode === 1) {
				pram.minAge = V.potencyAge;
				pram.ageOverridesPedoMode = 1;
			} else {
				pram.minAge = 21;
			}
			const slave = GenerateNewSlave("XY", pram);
			slave.origin = "$He was a breeding bull in the stable of a slaveholding farmer before being sold to you.";
			slave.devotion = random(25, 50);
			slave.trust = random(25, 50);
			setHealth(slave, jsRandom(30, 60), undefined, undefined, 0, 0);
			slave.face = random(-30, 30);
			slave.skill.vaginal = 0;
			slave.skill.anal = 35;
			slave.skill.oral = 15;
			slave.skill.penetrative = 65;
			slave.skill.entertainment = 0;
			slave.skill.whoring = 0;
			slave.boobs = 0;
			slave.vagina = -1;
			slave.vaginaLube = 1;
			slave.labia = 1;
			slave.ovaries = -1;
			slave.dick = random(4, 5);
			slave.balls = random(3, 4);
			slave.scrotum = slave.balls;
			slave.pubicHStyle = "waxed";
			slave.underArmHStyle = "waxed";
			slave.hips = random(1, 2);
			slave.butt = random(2, 5);
			slave.anus = 2;
			slave.weight = random(-80, 20);
			slave.muscles = random(10, 50);
			slave.shoulders = random(1, 2);
			slave.intelligence = random(-95, 50);
			slave.piercing.nose.weight = 2;
			slave.career = "a slave";
			slave.fetish = "pregnancy";
			slave.behavioralQuirk = "adores women";
			slave.sexualQuirk = "size queen";
			return slave;
		}
	}
};
