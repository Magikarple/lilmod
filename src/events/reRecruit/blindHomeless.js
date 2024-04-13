App.Events.recBlindHomeless = class recBlindHomeless extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.seeDicks !== 100,
			() => V.seePreg !== 0,
		];
	}

	get eventName() {
		return "Homeless Blind";
	}

	execute(node) {
		const slave = makeSlave();
		const {
			He,
			he, his, him, himself, girl, woman
		} = getPronouns(slave);
		const title = (V.PC.title !== 0) ? `Sir` : `Ma'am`;
		let r = [];

		r.push(`A young`);
		if (slave.physicalAge < 13) {
			r.push(girl);
		} else if (slave.physicalAge < 18) {
			r.push(`teen`);
		} else {
			r.push(woman);
		}
		r.push(
			`struggles into your penthouse for an interview. You accepted ${his} request to see you because ${he} took the unusual step of promising to sell ${himself} to you if you would admit ${him}. The reason for this odd behavior becomes clear when ${he} enters. ${He} is gingerly feeling ${his} way towards your desk, before finding it and straightening up, giving you a good look at ${his} body. ${He} is clothed in rags and dangerously thin, save for a notable roundness in ${his} middle. ${He} shakily makes ${his} case.`,
			Spoken(slave, `"${title}, I'm desperate. My home was repossessed and I was forced onto the street. And the street is no place for a blind ${girl}. T-they",`),
			`${he} places a hand on ${his} stomach,`,
			Spoken(slave, `"took advantage of my helplessness. For months, they fucked me whenever they wanted, and in return they gave me next to no food and this child!"`),
			`${He} stamps ${his} foot angrily, before continuing,`,
			Spoken(slave, `"but, I thought, you would be far better than that life, a slow death on the streets." ${He} tears up and awaits your response.`)
		);

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
			r.push(`${He} cooperates as the biometric scanners scrupulously record ${his} every particular as belonging not to a person but to a piece of human property. ${He} willingly places ${his} biometric signature in testament to the truth of ${his} voluntary enslavement. The process is completed with a distinct anticlimax: ${he} is one of your slaves now. ${He} gives you a smile, knowing ${he}'ll have a belly full of food before long.`);
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addNode(el, r);
			return el;
		}

		function sell() {
			const el = new DocumentFragment();
			let r = [];
			cashX(cost, "slaveTransfer");

			r.push(`${He} cooperates as the biometric scanners scrupulously record ${his} every particular as belonging not to a person but to a piece of human property. ${He} willingly places ${his} biometric signature in testament to the truth of ${his} voluntary enslavement. When a purchaser's agent arrives to take ${him} away, though, ${he} becomes uneasy.`);
			r.push(Spoken(slave, `"Will they have food?"`));
			r.push(`${he} asks plaintively. You tell ${him} yes, all ${he} can hold, ${he}'s been bought by a slave dairy. ${He}'ll be fattened up and forced to carry ${his} pregnancy to term, since it'll enhance ${his} milk production; and within a few weeks after that, ${he}'ll be impregnated again. And again. But ${he} won't be on the streets anymore.`);

			App.Events.addNode(el, r);
			return el;
		}

		function makeSlave() {
			const pram = new GenerateNewSlavePram();
			pram.maxAge = 22;
			pram.ageOverridesPedoMode = 1;
			pram.disableDisability = 1;
			pram.race = "nonslave";
			if (V.pedo_mode === 1) {
				pram.minAge = V.fertilityAge;
			} else {
				pram.minAge = 18;
			}
			const slave = GenerateNewSlave("XX", pram);
			slave.origin = "$He offered $himself as a slave to escape the horrors a blind $girl faces on the streets.";
			slave.devotion = random(20, 30);
			slave.trust = random(0, 15);
			if (slave.behavioralFlaw === "anorexic") {
				slave.behavioralFlaw = "none";
			}
			slave.boobs = 300;
			slave.butt++;
			slave.vagina = 2;
			slave.anus = 1;
			slave.skill.anal = 0;
			slave.preg = 20;
			slave.pregType = 1;
			slave.pregWeek = slave.preg;
			slave.pregKnown = 1;
			SetBellySize(slave);
			eyeSurgery(slave, "both", "blind");
			slave.weight = -100;
			slave.fetish = "none";
			slave.fetishKnown = 0;
			setHealth(slave, jsRandom(-60, -20), undefined, undefined, undefined, 60);
			return slave;
		}
	}
};
