App.Events.recSpoiledDaughter = class recSpoiledDaughter extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.seeDicks !== 100
		];
	}

	get eventName() {
		return "Spoiled Daughter";
	}

	execute(node) {
		const slave = makeSlave();
		const {He, he, his, him, girl, daughter} = getPronouns(slave);
		let r = [];

		r.push(`Your desk flags a video message as coming from an influential old world businessman. To your surprise, rather than the portly visage you were expecting, a pretty young face appears on your screen.`);
		r.push(Spoken(slave, `"Oh. My. God. How long does it take to answer a call?"`));
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`The ${girl} speaks in a ridiculously high, bubblegum voice and bounces indignantly around ${his} father's luxurious office as ${he} rants, barely acknowledging your presence on the other end of the call.`);
		r.push(Spoken(slave, `"Daddy says that I'm spending too much of his money but what the hell is all of his money for if he's not spending it on his little ${girl}?"`));
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`${He} pauses, looking directly at you for the first time, though you get the sense that ${he} seems more interested in your own luxurious surroundings.`);
		r.push(Spoken(slave, `"Daddy told me all about you arcology types, so I know what you're all about. Anyways, I don't care about freedom and stuff if you treat me like the perfect princess I am."`));
		App.Events.addParagraph(node, r);
		r = [];
		r.push(Spoken(slave, `"So, could you enslave me or whatever?"`));

		App.Events.addParagraph(node, r);
		const contractCost = 1000;
		const cost = slaveCost(slave) - contractCost;
		const responses = [];
		if (V.cash >= contractCost) {
			responses.push(new App.Events.Result(`Enslave ${him}`, enslave));
		} else {
			responses.push(new App.Events.Result(null, null, `You lack the necessary funds to enslave ${him}`));
		}
		responses.push(new App.Events.Result(`Contact ${his} father`, father));
		responses.push(new App.Events.Result(`Sell ${him} immediately`, sell, `This will bring in ${cashFormat(cost)}`));

		node.append(App.Desc.longSlave(slave, {market: "generic"}));

		App.Events.addResponses(node, responses);

		function enslave() {
			const el = new DocumentFragment();
			let r = [];
			cashX(forceNeg(contractCost), "slaveTransfer", slave);
			r.push(`A few days after granting your assent to the ${girl}'s offer, ${he} appears at your penthouse laden with luggage and handbags. Much to your relief, ${he} gets through the legalities and biometric scanning with little more than a pout.`);
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addNode(el, r);
			return el;
		}

		function father() {
			const el = new DocumentFragment();
			let r = [];
			repX(1000, "event");
			r.push(`Hanging up, you decide to inform the brat's father of the ${girl}'s suicidally stupid scheme. The grateful businessman thanks you for your kindness and promises to ground ${him} for "two weeks", seemingly sharing his ${daughter}'s naïveté. Although people will gossip as to whether you did this out of the goodness of your heart, or out of recognition of his daughter's allegedly poor value as human property, the businessman will be sure to <span class="green">tell his associates it was the former.</span>`);
			App.Events.addNode(el, r);
			return el;
		}

		function sell() {
			const el = new DocumentFragment();
			let r = [];
			cashX(cost, "slaveTransfer");
			r.push(`A few days after granting your assent to the ${girl}'s offer, ${he} appears at your penthouse laden with luggage and handbags. ${slave.slaveName} bounces happily in ${his} heels and eagerly explains ${his} expectations regarding ${his} new life with you. Your response appears in the form of a purchasing agent, here to take ${him} away. As he restrains the disbelieving ${girl}, you tell ${him} ${he}'s been purchased by a brothel, so ${he}'s soon going to have more sugar daddies than ${his} holes can take. ${He} releases a wail of utter despair, quickly cut off by a sturdy bag being fastened over ${his} head.`);
			App.Events.addNode(el, r);
			return el;
		}

		function makeSlave() {
			const slave = GenerateNewSlave("XX", {
				minAge: 12, maxAge: 18,
				disableDisability: 1
			});
			generateSalonModifications(slave);
			slave.origin = "$He sold $himself into slavery to spite $his father.";
			slave.devotion = 20;
			slave.trust = 0;
			setHealth(slave, 80, 0, 0, 0, jsRandom(0, 20));
			slave.face = random(15, 70);
			slave.skill.vaginal = 0;
			slave.skill.anal = 0;
			slave.skill.oral = 0;
			slave.skill.entertainment = 0;
			slave.skill.whoring = 0;
			slave.boobs = random(3, 10) * 100;
			slave.natural.boobs = slave.boobs;
			slave.vagina = 1;
			slave.vaginaLube = random(1, 2);
			slave.labia = 1;
			slave.ovaries = 1;
			slave.pubicHStyle = "waxed";
			slave.hips = random(0, 2);
			slave.butt = random(1, 4);
			slave.anus = 1;
			slave.weight = random(-20, 0);
			slave.muscles = 0;
			slave.shoulders = random(-2, 0);
			slave.intelligence = random(-50, -16);
			slave.career = "from an upper class family";
			slave.behavioralFlaw = "arrogant";
			slave.voice = 3;
			slave.teeth = "normal";
			slave.prestige = 1;
			slave.prestigeDesc = "$He is the spoiled $daughter of a wealthy old world businessman. Many will pay well to use $him to discredit $his father and family.";
			slave.canRecruit = 0;

			return slave;
		}
	}
};
