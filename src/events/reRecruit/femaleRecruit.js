App.Events.recFemaleRecruit = class recFemaleRecruit extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => !!S.HeadGirl,
			() => S.HeadGirl.devotion > 50,
			() => S.HeadGirl.skill.entertainment >= 100,
		];
	}

	get eventName() {
		return "Female Recruit";
	}

	execute(node) {
		const slave = makeSlave();
		const {
			He,
			he, his, him, himself, girl,
		} = getPronouns(slave);
		const {title: Master} = getEnunciation(slave);
		const {he2, him2} = getPronouns(S.HeadGirl || {pronoun: 1}).appendSuffix("2");
		const title = (V.PC.title !== 0) ? `Sir` : `Ma'am`;
		let r = [];
		r.push(`Your Head Girl sends you a discreet message that ${he2} may have found a slave for you. ${S.HeadGirl.slaveName} duly ushers a ${girl} into your office. ${He} looks very young, like a dissolute party ${girl}. ${He} bites ${his} lip nervously when ${he} sees you, and looks to ${S.HeadGirl.slaveName} for guidance. ${S.HeadGirl.slaveName} nods at ${him} reassuringly, so ${he} explains ${himself}.`);
		App.Events.addParagraph(node, r);
		r = [];

		r.push(Spoken(slave, `"${title}, my name is ${slave.slaveName}. I'm, um, bored, I guess. I go to clubs and get drunk and fuck guys and it's just kinda boring. I thought it would be different when I turned ${num(slave.actualAge)}, but that was a couple months ago and, well, nothing's different. I saw ${S.HeadGirl.slaveName} and ${he2} was just so graceful and beautiful and ${he2} seemed so confident in what ${he2} was doing and who ${he2} was and I talked to ${him2} and ${he2} said ${he2} was your Head Girl and... I want to be like ${him2}. Can I be your slave? I'd be good, I'm good at sucking dicks and stuff."`));
		r.push(`${He} seems to be a little naïve about sexual slavery, but there's no need to tell ${him} that.`);
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
			r.push(`You complete the legalities and biometric scanning quickly and without fuss. ${slave.slaveName} bounces nervously on ${his} heels. Finally ${he} works up ${his} courage and asks,`);
			if (App.Data.clothes.get(S.HeadGirl.clothes).exposure <= 3) {
				r.push(Spoken(slave, `"Can I have ${S.HeadGirl.clothes} like ${S.HeadGirl.slaveName}?"`));
			} else {
				r.push(Spoken(slave, `"Can I work with ${S.HeadGirl.slaveName}?"`));
			}
			r.push(`Your sternly tell ${him} to call you ${properMaster()}, to ask questions only with permission, and to strip. ${He} looks at ${S.HeadGirl.slaveName}, but ${S.HeadGirl.slaveName} returns ${his} look with no compassion at all and tells ${him} to do what you say. Looking suddenly fearful, ${slave.slaveName} strips. Once your inspection of ${his} body reaches ${his} anus, ${he} becomes suddenly nervous.`);
			r.push(Spoken(slave, `"A-am I going to have t-to do butt stuff, ${Master}?"`));
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addNode(el, r);
			return el;
		}

		function sell() {
			const el = new DocumentFragment();
			let r = [];
			cashX(cost, "slaveTransfer");
			r.push(`You complete the legalities and biometric scanning quickly and without fuss. ${slave.slaveName} bounces nervously on ${his} heels. Finally ${he} works up ${his} courage and asks,`);
			if (App.Data.clothes.get(S.HeadGirl.clothes).exposure <= 3) {
				r.push(Spoken(slave, `"Can I have ${S.HeadGirl.clothes} like ${S.HeadGirl.slaveName}?"`));
			} else {
				r.push(Spoken(slave, `"Can I work with ${S.HeadGirl.slaveName}?"`));
			}
			r.push(`Your answer appears in the form of a purchasing agent, here to take ${him} away. As he restrains the disbelieving ${girl}, you tell ${him} ${he}'s been purchased by a brothel, so ${he}'s going to be fucked about 70,000 times before ${he} gets to be too old and is retired, so ${he} can be sure ${he} won't be bored. ${He} releases a wail of utter despair, quickly cut off by a sturdy bag being fastened over ${his} head.`);
			App.Events.addNode(el, r);
			return el;
		}

		function makeSlave() {
			const pram = new GenerateNewSlavePram();
			pram.minAge = (V.pedo_mode === 1 ? 11 : 16);
			pram.maxAge = 19;
			pram.ageOverridesPedoMode = 1;
			pram.disableDisability = 1;
			pram.race = "nonslave";
			const slave = GenerateNewSlave("XX", pram);
			slave.origin = "$He offered $himself to you as a slave to escape a life of boredom.";
			slave.career = "a party girl";
			slave.birthWeek = random(8, 16);
			slave.devotion = random(25, 45);
			slave.trust = random(25, 45);
			setHealth(slave, jsRandom(0, 20), undefined, undefined, undefined, 0);
			slave.anus = 0;
			slave.vagina = 1;
			slave.skill.vaginal = 15;
			slave.skill.oral = 15;
			slave.skill.anal = 0;
			slave.piercing.ear.weight = 1;
			slave.piercing.nose.weight = 1;
			slave.piercing.eyebrow.weight = 1;
			slave.piercing.navel.weight = 1;
			slave.behavioralFlaw = "arrogant";
			if (["apathetic", "hates oral", "repressed"].includes(slave.sexualFlaw)) {
				slave.sexualFlaw = "none";
			}
			slave.energy = random(60, 90);
			// TODO: make sexual orientation dependent on HG appearance?
			slave.attrXX = random(60, 90);
			slave.attrXY = random(60, 90);
			generateSalonModifications(slave);
			slave.hStyle = "undercut";
			// Replaced custom hairstyle with a near-identical standard one that plays nice with images. Original custom hairstyle below.
			// slave.hStyle = "fashionable for a Free Cities girl, long, with the left half shaved";
			slave.pubicHStyle = "waxed";
			slave.underArmHStyle = "waxed";
			return slave;
		}
	}
};
