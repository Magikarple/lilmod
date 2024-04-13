App.Events.recPaternalistSwanSong = class recPaternalistSwanSong extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
			() => V.arcologies[0].FSPaternalistDecoration === 100,
			() => V.minimumSlaveAge <= 14,
			() => V.week >= 100,
			() => (V.swanSong === undefined || V.swanSong === 0)
		];
	}

	get eventName() {
		return "Paternalist Swansong";
	}

	execute(node) {
		const slave = makeSlave();
		const {He, he, his, him} = getPronouns(slave);
		let r = [];

		V.swanSong = 1;
		r.push(`Not every day in the arcology is calm and this one is most certainly more energetic than usual. It seems there that a large crowd is gathering along the`);
		if (V.terrain !== "oceanic") {
			r.push(`road extending from the front gate as a small convoy of luxury vehicles rolls in. Your arcology isn't immune to outside old world influences, and the person in the center vehicle`);
		} else if (V.terrain === "oceanic") {
			r.push(`canal extending from the front gate as a small convoy of luxury yachts sails in. Your arcology isn't immune to outside old world influences, and the person on the center yacht`);
		}
		r.push(`so happens to be such a force. Recently, a young musical prodigy has taken both the old world and the Free Cities by storm. Their rising popularity has gained them quite a following and the attention of some very powerful people. You look at the schedule of events for citizens tonight and, sure enough, they are to appear, live in concert, tonight. You tell ${V.assistant.name} to set up a live feed of the performance for you so as not to interrupt your work. Several hours later, the young artist comes out on stage to a full house. They perform their latest hits and some fan favorites, but it's the crowd suddenly going silent that disturbs you from your paperwork. You look at the feed to see the artist standing there, a sullen expression on their face, tears streaming down their cheeks, and their body jerking, obviously wracked by occasional sobbing. They take a very quick bow and run off stage, before the feed gets cut. You shrug — artists have breakdowns — and return to your tasks. Surprisingly, ${V.assistant.name} chimes in to tell you that an unexpected guest has arrived. You have them sent in and are surprised to see the young, visibly distressed prodigy.`);
		r.push(Spoken(slave, `"I was told by my producer to come here; they say I have earned enough of a debt to be enslaved. I heard that slaves seem to be treated well here and thought that, just maybe, if I convinced them to let my final performance be here, I would have a chance at a better life than at another arcology owned by a crueler master. Please, would you consider taking me in?"`));

		App.Events.addParagraph(node, r);

		const contractCost = 10000;
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
			r.push(`${He} thanks you profusely for purchasing ${him}, and ${he} means it. ${He}'s relieved to have been bought by a kind master and promises to give you a private performance whenever you want.`);
			V.swanSong = 2;
			App.Events.queueEvent(3, new App.Events.SETheSirenStrikesBack([slave.ID]));
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addNode(el, r);
			return el;
		}

		function sell() {
			const el = new DocumentFragment();
			let r = [];
			cashX(cost, "slaveTransfer");
			r.push(`${He} thanks you profusely for purchasing ${him} and before you get the chance to correct ${him}, a purchaser's agent arrives to take ${him} away. ${He} looks at you in terror, beginning to sob at having trusted you. You place a hand on ${his} shoulder and reassure ${him}; ${he} has many fans in ${V.arcologies[0].name} that would love to treat ${him} with the kindness ${he} deserves and you made sure the nicest of the bunch was the one who bought ${his} contract. ${He} brightens up upon hearing your words and leaves the penthouse smiling as the agent talks about all the preparations ${his} new owner has set up for ${him}.`);
			App.Events.addNode(el, r);
			return el;
		}

		function makeSlave() {
			const pram = new GenerateNewSlavePram();
			pram.minAge = 10;
			pram.maxAge = 14;
			pram.disableDisability = 1;
			pram.race = "nonslave";
			const slave = GenerateNewSlave(null, pram);
			slave.origin = "$He came to you to escape being sold to a cruel master after $his producer informed $him of $his debt.";
			slave.career = "a musician";
			slave.devotion = random(30, 100);
			slave.trust = random(30, 100);
			setHealth(slave, jsRandom(0, 100), 0, 0, 0, jsRandom(10, 30));
			slave.anus = 0;
			slave.vagina = 1;
			slave.skill.vaginal = 0;
			slave.skill.oral = 0;
			slave.skill.anal = 0;
			slave.skill.penetrative = 0;
			slave.piercing.ear.weight = 0;
			slave.piercing.nose.weight = 0;
			slave.piercing.eyebrow.weight = 0;
			slave.piercing.navel.weight = 0;
			slave.behavioralFlaw = "none";
			slave.hStyle = "neat";
			slave.pubicHStyle = "waxed";
			slave.underArmHStyle = "waxed";
			slave.intelligenceImplant = 15;
			slave.intelligence = 100;
			slave.prestige = 3;
			slave.prestigeDesc = "$He was a famous young musical prodigy known throughout both the old world and the Free Cities.";
			slave.accent = 1;
			return slave;
		}
	}
};
