App.Events.recCleaningHouse = class recCleaningHouse extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.seeDicks !== 100,
			() => V.seePreg !== 0,
			() => V.rep > 16000,
			() => (random(1, 100) < V.rep/1000) || (V.debugMode > 0 && V.debugModeEventSelection > 0),
			() => V.cash >= 50000
		];
	}

	get eventName() {
		return "Cleaning House";
	}

	execute(node) {
		const slave = makeSlave();
		const {his, girl} = getPronouns(slave);
		const {HeA} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		let r = [];

		r.push(`You receive so many messages, as a noted titan of the new Free Cities world, that ${V.assistant.name} has to be quite draconian in culling them. ${HeA} lets only the most important through to you. One category of message that always gets through regardless of content, though, are lucrative deals with powerful individuals.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`This call is coming from a public kiosk, which is usually an indication that the person on the other end is a transient individual who has decided to take slavery over homelessness and not someone of high society. This call, as you would expect, is different. The moment the person on the other end introduces themselves you immediately recognize why your assistant brought this to your attention. The caller is the King of an old world kingdom, contacting you by an untraceable means due of the conspiratorial nature of his proposal.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`He explains that one of his servant ${girl}s, ${slave.slaveName}, was impregnated by his fool of a son, and that he wants to sell you the ${girl} and ${his} nosy coworkers to clean house and cover it up.`);
		if (FutureSocieties.isActive('FSRepopulationFocus')) {
			r.push(`You relish at the opportunity to obtain an expectant mother and some decent slaves.`);
		} else {
			r.push(`You aren't particularly concerned with the pregnancy, but it sounds like you could get a several decent slaves out of this.`);
		}
		App.Events.addParagraph(node, r);
		r = [];
		r.push(App.UI.DOM.makeElement("span", `His offer stands at ${cashFormat(10000)} per head for a total of ${cashFormat(50000)}.`, "note"));

		App.Events.addParagraph(node, r);
		const contractCost = 50000;
		const responses = [];
		responses.push(new App.Events.Result(`Accept the offer`, accept));
		const newSlaves = [slave];
		for (let reRec = 0; reRec < 4; reRec++) {
			const s = GenerateNewSlave("XX", {minAge: 8, maxAge: 32, disableDisability: 1});
			s.face = random(20, 100);
			s.intelligence = random(20, 60);
			s.intelligenceImplant = 0;
			s.origin = "You purchased $him from a King after $he expressed knowledge of the prince's affair with another servant.";
			s.career = "a maid";
			s.clothes = "a nice maid outfit";
			s.devotion = random(-20, 20);
			s.trust = random(-20, 20);
			setHealth(s, jsRandom(0, 20), undefined, undefined, 0, 0);
			s.weight = random(-20, 60);
			s.waist = random(-40, 0);
			newSlaves.push(s);
		}

		node.append(App.UI.MultipleInspect(newSlaves, true, "generic"));

		App.Events.addResponses(node, responses);

		function accept() {
			const node = new DocumentFragment();
			let r = [];
			r.push(`You agree to purchase the servants and wire the money. The next day, a rather expensive-looking VTOL comes and drops off a group of confused and terrified slaves fitted with maid outfits and a pair of shackles on each set of limbs.`);
			for (const slave of newSlaves) {
				cashX(forceNeg(contractCost/5), "slaveTransfer", slave);
				newSlave(slave);
			}
			App.Events.addNode(node, r);
			return node;
		}

		function makeSlave() {
			const slave = GenerateNewSlave("XX", {minAge: V.fertilityAge, maxAge: 22, disableDisability: 1});
			slave.face = random(60, 100);
			slave.intelligence = random(30, 100);
			slave.intelligenceImplant = 15;
			slave.origin = "You purchased $him from a King after his son put an illegitimate heir in $his womb.";
			slave.career = "a maid";
			slave.clothes = "a nice maid outfit";
			slave.devotion = random(-20, 20);
			slave.trust = random(-90, -80);
			setHealth(slave, jsRandom(0, 20), undefined, undefined, 0, 10);
			slave.skill.vaginal = 30;
			slave.skill.anal = 15;
			slave.skill.oral = 50;
			slave.skill.entertainment = 0;
			slave.skill.whoring = 0;
			slave.vagina = 1;
			slave.anus = 1;
			slave.pubicHStyle = "waxed";
			slave.underArmHStyle = "waxed";
			slave.weight = random(-20, 0);
			slave.waist = random(-40, 0);
			slave.muscles = 0;
			slave.shoulders = random(-2, 0);
			slave.boobs += 100;
			slave.canRecruit = 0;
			slave.pubertyXX = 1;
			slave.preg = 20;
			slave.pregWeek = 20;
			slave.pregType = 1;
			slave.pregKnown = 1;
			SetBellySize(slave);
			return slave;
		}
	}
};
