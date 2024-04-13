App.Events.recFemaleRunaway = class recFemaleRunaway extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.seeDicks !== 100,
			() => V.mercenaries >= 5,
			() => V.seePreg !== 0
		];
	}

	get eventName() {
		return "Female Runaway";
	}

	execute(node) {
		const slave = makeSlave();
		const {
			He,
			he, his, him, girl, woman,
		} = getPronouns(slave);
		let r = [];

		r.push(`A report about a successful operation by your mercenaries waits at your desk when you come in the office this morning. Turns out they tracked a brutal gang that was waylaying travelers near the Free City and stormed their hideout last night. All of the criminals were killed in the process, preventing proper punishments or more... creative uses for them. From the videos of the raid and the fanatic way the men fought to the last man, it seems that this was unavoidable, so you send a quick note of approval to their commander.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`After the fighting died down, they found a ${woman} inside the compound, harshly used and seemingly the center of many gangbangs there. A scan of ${his} biometric data revealed that ${he} is in fact a slave that ran away about two months ago — into a much worse situation after being caught by the gang, as it turns out. Countless dicks have stretched ${his} pussy and ass wide,`);
		if (slave.physicalAge >= slave.pubertyAgeXX) {
			r.push(`${he} is pregnant with some dead criminal bastard's offspring,`);
		}
		r.push(`and they've decorated ${him} with numerous piercings. As you notify the owner that her property has been retrieved, the woman is distraught at the state of her merchandise, grumbling that a once quite valuable ${girl} is now worth almost nothing. Seems she's unwilling to invest her time and money in caring for the slave. With a sigh, the slave-mistress whips out her smartphone and starts to set up a selling offer in one of the popular slave trading apps.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(App.UI.DOM.makeElement("span", `The young ${woman} has been used and abused quite a bit, making ${him} deathly terrified about what might happen to ${him} next. ${He} has partially resigned to be nothing but a fuckhole. You can get ${him} cheap from the owner, it'll be just ${cashFormat(1000)}.`, "note"));

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
			r.push(`With a few keystrokes, you wire the payment to the slave${girl}'s owner, then have your guardsmen bring ${him} from the station infirmary to your penthouse. ${He} is led to stand before you, shivering in terror and looking at ${his} feet. Only after an insistent command does ${he} look up long enough to be biometrically scanned and registered as your property.`);
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addNode(el, r);
			return el;
		}

		function sell() {
			const el = new DocumentFragment();
			let r = [];
			cashX(cost, "slaveTransfer");
			r.push(`With a few keystrokes, you wire the payment to the slave${girl}'s owner, then have your guardsmen bring ${him} from the station infirmary to your penthouse. ${He} is led to stand before you, shivering in terror and looking at ${his} feet. Only after an insistent command does ${he} look up long enough to be biometrically scanned and registered as your property. Frowning at the emotional state the gang left ${him} in, you're relieved when your guards take ${him} away a moment later, to be transported to the office of a slave broker you know well. Oh well, now ${he}'ll be someone else's problem to fix up.`);
			App.Events.addNode(el, r);
			return el;
		}

		function makeSlave() {
			const slave = GenerateNewSlave("XX", {maxAge: 24});
			slave.origin = "$He was a runaway slave captured by a gang outside your arcology. You bought $him cheap after $he was harshly used by them.";
			slave.devotion = random(0, 25);
			slave.trust = -20;
			generateSalonModifications(slave);
			setHealth(slave, jsRandom(-50, -30), normalRandInt(10, 3), normalRandInt(10, 3), Math.max(normalRandInt(1, 0.5), 50));
			slave.face = random(0, 20);
			slave.skill.vaginal = 15;
			slave.skill.anal = 15;
			slave.skill.oral = 15;
			slave.skill.whoring = 0;
			slave.boobs = random(3, 7) * 100;
			slave.natural.boobs = slave.boobs;
			slave.vagina = 3;
			slave.labia = 1;
			slave.ovaries = 1;
			slave.weight = random(-80, 20);
			slave.pubicHStyle = "waxed";
			slave.underArmHStyle = "waxed";
			slave.anus = 3;
			slave.intelligence = random(-50, 50);
			slave.career = "a slave";
			slave.fetish = "submissive";
			slave.behavioralFlaw = "hates men";
			slave.behavioralQuirk = "insecure";
			slave.sexualFlaw = "apathetic";
			slave.piercing.lips.weight = 1;
			slave.piercing.tongue.weight = 1;
			slave.piercing.ear.weight = 1;
			slave.piercing.nose.weight = 2;
			slave.piercing.navel.weight = 1;
			slave.piercing.nipple.weight = 2;
			slave.piercing.genitals.weight = 2;
			slave.custom.tattoo = "$He has a barcode tattooed on $his neck.";
			slave.attrXY = 20;
			if (slave.physicalAge >= slave.pubertyAgeXX) {
				slave.pubertyXX = 1;
				slave.preg = 7;
				slave.pregType = 1;
				slave.pregWeek = slave.preg;
				slave.pregKnown = 1;
				SetBellySize(slave);
			}
			return slave;
		}
	}
};
