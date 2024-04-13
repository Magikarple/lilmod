App.Events.recDesperatePreg = class recDesperatePreg extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => !FutureSocieties.isActive('FSRestart')
		];
	}

	get eventName() {
		return "Desperate Pregnancy";
	}

	execute(node) {
		const slave = makeSlave();
		const {
			He,
			he, his, him, himself, woman,
		} = getPronouns(slave);
		const title = (V.PC.title !== 0) ? `Sir` : `Ma'am`;
		let r = [];
		r.push(`A young ${woman} comes to your penthouse for an interview. You accepted ${his} request to see you because ${he} took the unusual step of promising to sell ${himself} to you if you would admit ${him}. The reason for this odd behavior becomes clear when ${he} enters. ${He}'s dressed in torn old clothes, is obviously unhealthy, and is massively pregnant. Instead of standing in front of your desk, ${he} kneels and looks at the floor as ${he} speaks.`);

		r.push(Spoken(slave, `"${title}, I'm desperate. I understand slaves' babies must be sent to orphanages at birth. But I'm on the streets and I'm so sick and hungry I'm afraid I'll miscarry. Could you enslave me, ${title.toLowerCase()}? I'm still pretty enough, and... I know some men like pregnant women. My ass is — well, I hear slaves are more valuable if they're tight back there and I've never done it there. I'm also starting to give a little milk. I know I'll have to give up the baby. I guess that's all."`));
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
			r.push(`${He} cooperates as the biometric scanners scrupulously record ${his} every particular as belonging not to a person but to a piece of human property. ${He} willingly places ${his} biometric signature in testament to the truth of ${his} voluntary enslavement. When a purchaser's agent arrives to take ${him} away, though, ${he} becomes afraid.`);
			r.push(Spoken(slave, `"W-will they h-hurt my baby?"`));
			r.push(`${he} asks plaintively. You tell ${him} no, ${he}'s been bought by a slave dairy. ${He}'ll be permitted to carry ${his} pregnancy to term, since it'll enhance ${his} milk production; and within a few weeks after that, ${he}'ll be impregnated again. And again.`);
			App.Events.addNode(el, r);
			return el;
		}

		function makeSlave() {
			const pram = new GenerateNewSlavePram();
			pram.ageOverridesPedoMode = 1;
			pram.disableDisability = 1;
			pram.race = "nonslave";
			if (V.pedo_mode === 1) {
				pram.minAge = V.fertilityAge;
			} else if (V.minimumSlaveAge < 18) {
				pram.minAge = Math.min(25, V.fertilityAge);
				pram.maxAge = Math.max(30, pram.minAge + 1);
			} else {
				pram.minAge = 25;
				pram.maxAge = 30;
			}
			const slave = GenerateNewSlave("XX", pram);
			generateSalonModifications(slave);
			slave.origin = "$He sold $himself into slavery out of fear that life on the streets was endangering $his pregnancy.";
			slave.devotion = random(0, 15);
			slave.trust = random(0, 15);
			slave.boobs += 100;
			slave.lactation = 1;
			slave.lactationDuration = 2;
			slave.butt++;
			slave.vagina = 1;
			slave.anus = 0;
			slave.skill.anal = 0;
			slave.face = normalRandInt(50, 50, 10, 95);
			slave.fetish = "none";
			slave.fetishKnown = 0;
			slave.preg = random(30, 39);
			slave.pregType = 1;
			slave.pregWeek = slave.preg;
			slave.pregKnown = 1;
			SetBellySize(slave);
			setHealth(slave, random(-40, -20), undefined, undefined, undefined, 50);
			return slave;
		}
	}
};
