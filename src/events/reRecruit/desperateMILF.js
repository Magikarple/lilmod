App.Events.recDesperateMILF = class recDesperateMILF extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.seeDicks !== 100
		];
	}

	get eventName() {
		return "Desperate MILF";
	}

	execute(node) {
		const slave = makeSlave();
		const {
			He,
			he, his, him, girl, woman, loli
		} = getPronouns(slave);
		const title = (V.PC.title !== 0) ? `Sir` : `Ma'am`;
		let r = [];
		if (slave.physicalAge > 50) {
			r.push(`An old ${woman}`);
		} else if (slave.physicalAge > 30) {
			r.push(`A middle-aged ${woman}`);
		} else if (slave.physicalAge >= 18) {
			r.push(`A young ${woman}`);
		} else if (slave.physicalAge >= 13) {
			r.push(`A teenage ${girl}`);
		} else if (slave.physicalAge >= 7) {
			r.push(`A ${loli}`);
		} else {
			r.push(`A little ${girl}`);
		}
		r.push(`comes to your penthouse for an interview. ${He}'s clearly unwell. Instead of standing in front of your desk, ${he} kneels and looks at the floor as ${he} speaks.`);

		r.push(Spoken(slave, `"${title}, I'm desperate. I came to the Free Cities to build a better life, but... it hasn't worked out for me. I can't afford medical care, and I guess I'm too scared to try street-walking yet, though I'll have to soon. I hear you're a known slaveowner, and that you give your slaves good medical care... could you enslave me, ${title.toLowerCase()}? I know I'm still pretty enough, so I'd be used as a sex slave."`));
		r.push(`${He} weeps quietly as ${he} talks, but ${he}'s brave enough to get through ${his} little speech.`);
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
			r.push(`${He} cooperates as the biometric scanners scrupulously record ${his} every particular as belonging not to a person but to a piece of human property. ${He} willingly places ${his} biometric signature in testament to the truth of ${his} voluntary enslavement. The process is completed with a distinct anticlimax: ${he} is one of your slaves now. ${He} looks almost relaxed, as though ${he}'s at peace, now.`);
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addNode(el, r);
			return el;
		}

		function sell() {
			const el = new DocumentFragment();
			let r = [];
			cashX(cost, "slaveTransfer");
			r.push(`${He} cooperates as the biometric scanners scrupulously record ${his} every particular as belonging not to a person but to a piece of human property. ${He} willingly places ${his} biometric signature in testament to the truth of ${his} voluntary enslavement. A purchasing agent appears to take ${him} away, which ${he} accepts resignedly, though ${he} does ask you who purchased ${him}. You tell ${him} that ${his} ample breasts have gotten ${him} bought by a slave dairy; ${he} looks thoughtful.`);
			r.push(Spoken(slave, `"I'm going to be a cow?"`));
			r.push(`${He} turns ${his} torso a little, sloshing ${his} breasts from side to side.`);
			r.push(Spoken(slave, `"Well, that doesn't sound <span style="italic">too</span> bad. Thank you."`));
			App.Events.addNode(el, r);
			return el;
		}

		function makeSlave() {
			const pram = new GenerateNewSlavePram();
			pram.minAge = V.fertilityAge + V.minimumSlaveAge;
			pram.ageOverridesPedoMode = 1;
			pram.disableDisability = 1;
			pram.race = "nonslave";
			pram.maxAge = Math.max(pram.minAge, V.retirementAge - 2);
			const slave = GenerateNewSlave("XX", pram);
			slave.origin = "$He sold $himself into slavery to escape life on the streets.";
			slave.devotion = random(0, 15);
			slave.trust = random(0, 15);
			slave.boobs += 650;
			slave.butt++;
			slave.anus++;
			slave.face = 15;
			slave.fetish = "none";
			slave.fetishKnown = 0;
			setHealth(slave, jsRandom(-70, -60), normalRandInt(10, 3), normalRandInt(10, 3), Math.max(normalRandInt(1, 0.5), 0));
			return slave;
		}
	}
};
