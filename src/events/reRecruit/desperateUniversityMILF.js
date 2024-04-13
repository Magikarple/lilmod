App.Events.recDesperateUniversityMILF = class recDesperateUniversityMILF extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.seeDicks !== 100
		];
	}

	get eventName() {
		return "Desperate University MILF";
	}

	execute(node) {
		const slave = makeSlave();
		const {
			He,
			he, his, him, woman, mother,
		} = getPronouns(slave);
		const title = (V.PC.title !== 0) ? `Sir` : `Ma'am`;
		let r = [];

		r.push(`A call comes in from an old world household. The caller appears on your screen, a worn down matronly ${woman} flanked by ${his} two daughters. The middle-aged ${mother} addresses you in a formal yet halting manner, as if rehearsing an unfamiliar speech.`);
		r.push(Spoken(slave, `"I don't know how closely you watch the old world from where you are, but finding steady work without an education is becoming increasingly difficult".`));
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`The ${mother} pauses to glance at ${his} daughters before continuing.`);
		r.push(Spoken(slave, `"I want my daughters to have a chance to make a life for themselves. I know that if I can pay their way towards attending university, then I will have succeeded as a parent."`));
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`${He} begins to weep quietly, but continues after ${his} daughters lay their hands supportively on ${his} shoulder.`);
		r.push(Spoken(slave, `"Could you enslave me, ${title.toLowerCase()}? It's the only way I have to pay for their tuition."`));

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
			r.push(`${He} cooperates as the biometric scanners scrupulously record ${his} every particular as belonging not to a person but to a piece of human property. ${He} willingly places ${his} biometric signature in testament to the truth of ${his} voluntary enslavement. The process is completed with a distinct anticlimax: ${he} is one of your slaves now. ${He} looks almost relaxed, content in the knowledge that ${his} daughters' education has been paid in full.`);
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addNode(el, r);
			return el;
		}

		function sell() {
			const el = new DocumentFragment();
			let r = [];
			cashX(cost, "slaveTransfer");
			r.push(`${He} cooperates as the biometric scanners scrupulously record ${his} every particular as belonging not to a person but to a piece of human property. ${He} willingly places ${his} biometric signature in testament to the truth of ${his} voluntary enslavement. A purchasing agent appears to take ${him} away, which ${he} accepts resignedly, though ${he} does ask you who purchased ${him}. Amused, you tell ${him} that ${his} reverence of education convinced you to sell ${him} to a brothel catering to inexperienced men.`);
			r.push(Spoken(slave, `"I'm going to be a little bit like a teacher?"`));
			r.push(`${He} contemplates this unexpected turn of events.`);
			r.push(Spoken(slave, `"Well, that's very thoughtful of you. Thank you."`));
			App.Events.addNode(el, r);
			return el;
		}

		function makeSlave() {
			const slave = GenerateNewSlave("XX", {
				minAge: 30, maxAge: 43,
				ageOverridesPedoMode: 1, disableDisability: 1
			});
			slave.origin = "$He sold $himself into slavery to pay for $his children's education.";
			slave.devotion = random(0, 15);
			slave.trust = random(0, 15);
			slave.boobs += 650;
			slave.butt++;
			slave.anus++;
			slave.face = 20;
			slave.fetish = "none";
			slave.fetishKnown = 0;
			setHealth(slave, jsRandom(-70, -60), undefined, undefined, undefined, 0);
			slave.intelligence = random(-50, 0);
			slave.intelligenceImplant = 0;
			slave.career = App.Data.Careers.General.uneducated.random();
			slave.counter.birthsTotal = 2;
			return slave;
		}
	}
};
