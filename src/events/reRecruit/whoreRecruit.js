App.Events.recWhoreRecruit = class recWhoreRecruit extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => !!S.HeadGirl,
			() => S.HeadGirl.devotion > 50,
			() => S.HeadGirl.skill.whoring >= 100,
		];
	}

	get eventName() {
		return "Whore Recruit";
	}

	execute(node) {
		const slave = makeSlave();
		const {
			He, His,
			he, his, him, himself, girl
		} = getPronouns(slave);
		const {say: say} = getEnunciation(slave);
		const {he2, him2} = getPronouns(S.HeadGirl || {pronoun: 1}).appendSuffix("2");
		const title = (V.PC.title !== 0) ? `Sir` : `Ma'am`;
		let r = [];
		r.push(`Your Head Girl sends you a discreet message that ${he2} may have found a slave for you. ${S.HeadGirl.slaveName} duly ushers a working ${girl} into your office. ${He} looks like a classic street hooker, and ${he}'s clearly had a rough time recently. ${He} needs no prompting to explain ${himself}, and ${he} does so without embarrassment.`);
		App.Events.addParagraph(node, r);
		r = [];

		r.push(Spoken(slave, `"${title}, my name is ${slave.slaveName}. I'm a street whore. Working ${girl}s get to know each other, so I know ${S.HeadGirl.slaveName} pretty well. I've been having a bad time on the streets, and last night a john beat on me pretty good. I'm broke and I'm sick of this. Being free isn't worth shit. ${S.HeadGirl.slaveName} likes you and ${he2} seems to do OK. So, can I be your slave? I'm a good bet, ${title.toLowerCase()}. I'd be happy enough working for you as a slave whore if you keep me healthy and safe, and I'm a good fuck."`));
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
			r.push(`You complete the legalities and biometric scanning quickly and without fuss. ${slave.slaveName} participates matter-of-factly, and there's a certain sense of relief about ${him}. ${His} fate is out of ${his} hands now, and you get the impression ${he} isn't sorry about that at all.`);
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addNode(el, r);
			return el;
		}

		function sell() {
			const el = new DocumentFragment();
			let r = [];
			cashX(cost, "slaveTransfer");
			r.push(`When the purchasing agent appears to take ${him} away, ${he} looks rueful.`);
			r.push(Spoken(slave, `"God fucking damn it,"`));
			r.push(`${he} ${say}s, less angrily than you expected.`);
			r.push(Spoken(slave, `"I should have known. ${S.HeadGirl.slaveName} played me good. Treat ${him2} right, ${he2}'s got skills."`));
			App.Events.addNode(el, r);
			return el;
		}

		function makeSlave() {
			const pram = new GenerateNewSlavePram();
			pram.disableDisability = 1;
			pram.race = "nonslave";
			if (V.minimumSlaveAge < 14 && V.pedo_mode === 0) {
				pram.minAge = random(V.minimumSlaveAge, 14);
			}
			const slave = GenerateNewSlave("XX", pram);
			slave.origin = "$He offered $himself to you as a slave to escape the hard life of a free whore.";
			slave.career = "a prostitute";
			slave.devotion = random(25, 45);
			slave.trust = random(25, 45);
			setHealth(slave, jsRandom(-40, -20), undefined, undefined, undefined, 40);
			slave.anus = 2;
			slave.vagina = 2;
			slave.skill.vaginal = 35;
			slave.skill.oral = 35;
			slave.skill.anal = 35;
			slave.skill.whoring = 35;
			slave.boobs += 600;
			slave.boobsImplant = 600;
			slave.boobsImplantType = "normal";
			slave.butt++;
			slave.buttImplant = 1;
			slave.buttImplantType = "normal";
			slave.lips += 10;
			slave.lipsImplant = 10;
			slave.piercing.lips.weight = 1;
			slave.piercing.tongue.weight = 1;
			slave.piercing.ear.weight = 1;
			slave.piercing.nose.weight = 1;
			slave.piercing.eyebrow.weight = 1;
			slave.piercing.navel.weight = 1;
			slave.piercing.nipple.weight = 1;
			slave.piercing.genitals.weight = 1;
			generateSalonModifications(slave);
			slave.hStyle = "strip";
			slave.pubicHStyle = "waxed";
			slave.underArmHStyle = "waxed";
			slave.custom.tattoo = "$He has a tear tattooed under each eye.";
			return slave;
		}
	}
};
