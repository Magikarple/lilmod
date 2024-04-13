App.Events.recPrincelyBetrayal = class recPrincelyBetrayal extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.seeDicks !== 0,
			() => V.rep > 16000,
			() => ((random(1, 100) < V.rep/1000) || (V.debugMode > 0 && V.debugModeEventSelection > 0)),
			() => V.cash >= 100000
		];
	}

	get eventName() {
		return "Princely Betrayal";
	}

	execute(node) {
		const slave = makeSlave();
		const {
			he, his, him, sister
		} = getPronouns(slave);
		const {HeA} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		let r = [];

		r.push(`You receive so many messages, as a noted titan of the new Free Cities world, that ${V.assistant.name} has to be quite draconian in culling them. ${HeA} lets only the most important through to you. One category of message that always gets through regardless of content, though, are lucrative deals with powerful individuals.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`This call is coming from a public kiosk, which is usually an indication that the person on the other end is a transient individual who has decided to take slavery over homelessness and not someone of high society. This call, as you would expect, is different. The moment the person on the other end introduces themselves you immediately recognize why your assistant brought this to your attention. The caller is the prince of an old world kingdom, contacting you by an untraceable means due of the conspiratorial nature of his proposal.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`He explains that he is the younger of two princes, and is about to carry out a plan to poison his father and take the throne for himself. However, his older ${sister} is standing in the way of his plan simply by virtue of being next in line for the throne. He sees selling his ${sister} to you as a more humane method of disposing of ${him}, not wanting to have to kill any more family than he has to. It doesn't hurt that he stands to make a lot of money either.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(App.UI.DOM.makeElement("span", `His offer stands at a firm ${cashFormat(100000)}, but you've seen his ${sister}; you stand to gain quite the addition to your chattel should you take the offer.`, "note"));

		App.Events.addParagraph(node, r);

		node.append(App.Desc.longSlave(slave, {market: "generic"}));

		const contractCost = 100000;
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
			r.push(`You agree to purchase the prince and wire the money. The next day, a rather expensive-looking VTOL comes and drops off an angry slave wearing fine clothing and a pair of shackles on each set of limbs. Despite ${his} bindings, ${he} puts up quite the fight before the legalities and biometric scanning are complete.`);
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addNode(el, r);
			return el;
		}

		function makeSlave() {
			const slave = GenerateNewSlave("XY", {
				minAge: (V.pedo_mode === 1 ? 16 : 20),
				maxAge: (V.pedo_mode === 1 ? 20 : 35),
				ageOverridesPedoMode: 1, disableDisability: 1
			});
			slave.face = random(80, 100);
			slave.intelligence = random(60, 100);
			slave.intelligenceImplant = 30;
			slave.origin = "You purchased $him in order to pave the way for $his brother to take the throne.";
			slave.career = "a prince";
			slave.prestige = 2;
			slave.prestigeDesc = "$He was once the crown prince of an old world kingdom up until you aided $his brother in making $him 'disappear'.";
			slave.teeth = "normal";
			slave.devotion = random(-100, -90);
			slave.trust = random(25, 85);
			setHealth(slave, jsRandom(0, 20), undefined, undefined, 0, 0);
			slave.weight = random(-10, 10);
			slave.muscles = random(10, 40);
			slave.anus = 0;
			slave.balls = Math.max(slave.balls, 2);
			slave.scrotum = slave.balls;
			slave.boobs = 100;
			slave.skill.oral = 0;
			slave.skill.anal = 0;
			slave.skill.whoring = 0;
			slave.skill.entertainment = random(5, 9) * 5;
			slave.behavioralFlaw = "arrogant";
			slave.hStyle = "luxurious";
			slave.hLength = 2;
			slave.pubicHStyle = "waxed";
			slave.underArmHStyle = "waxed";
			slave.accent = 0;
			slave.canRecruit = 0;
			return slave;
		}
	}
};
