App.Events.recOrphanRebelliousFemale = class recOrphanRebelliousFemale extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.seeDicks !== 100
		];
	}

	get eventName() {
		return "Orphan Rebellious Female";
	}

	execute(node) {
		const slave = makeSlave();
		const {he, his, him, woman} = getPronouns(slave);
		let r = [];

		r.push(`An invitation to a 'visitation day' at an orphanage in the arcology pops up in your in-box, prompting you to make some room in your schedule to go have a look. Run by a well-meaning non-profit organization active in numerous of the Free Cities, the facility does house quite a few orphans (both local and saved from the chaos of the old world), doing excellent work in teaching them and finding new homes. Still, with times being what they are, the people running things do have a... realistic outlook, in the end. And so, in order to keep the orphanage going, those living there who aren't adopted till they reach maturity are sold as slaves. Legally this practice is easily arranged, as the life-debt for any of the orphans builds up over the years, pretty much automatically putting them over the limit for enslavement.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`Knowing what's coming, the teachers in the facility do train their pupils accordingly and try to instill obedience and acceptance into those soon reaching eighteen years of age, but there are always those with whom the lessons don't quite take hold. The young ${woman} that catches your eye from among the newly of age orphans is such a case... from all accounts, ${he}'s rather headstrong and doesn't bend ${his} will to anyone really — for example having long lost ${his} virginities one way or another. Still, a young slave at a fairly low price could be worth the investment for anyone who likes breaking them in...`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(App.UI.DOM.makeElement("span", `A short discussion with an administrator establishes the young ${woman}'s asking price at ${cashFormat(1500)}.`, "note"));

		App.Events.addParagraph(node, r);

		node.append(App.Desc.longSlave(slave, {market: "generic"}));

		const contractCost = 1500;
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
			r.push(`Transferring the money with a few clicks on your smartphone, you have your new acquisition brought to your penthouse. ${slave.slaveName} reacts sullenly to an order to strip, so the guardsmen's assistance is required to peel ${his} clothes off ${him}, followed by the young ${woman} sticking out ${his} tongue as ${he} is scanned and registered as your property.`);
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addNode(el, r);
			return el;
		}

		function makeSlave() {
			const slave = GenerateNewSlave("XX", {
				minAge: 18,
				maxAge: 18,
				ageOverridesPedoMode: 1,
				disableDisability: 1
			});
			generateSalonModifications(slave);
			slave.origin = "$He was in an orphanage until reaching maturity, at which point $he was sold to you.";
			slave.devotion = random(-45, -25);
			slave.trust = random(-25, 0);
			setHealth(slave, jsRandom(10, 40), undefined, undefined, undefined, 0);
			slave.face = random(-30, 30);
			slave.skill.vaginal = 15;
			slave.skill.anal = 15;
			slave.skill.oral = 15;
			slave.skill.entertainment = 0;
			slave.skill.whoring = 15;
			slave.boobs = random(4, 8) * 100;
			slave.natural.boobs = slave.boobs;
			slave.vagina = 1;
			slave.vaginaLube = 1;
			slave.labia = 2;
			slave.ovaries = 1;
			slave.pubicHStyle = "waxed";
			slave.underArmHStyle = "waxed";
			slave.hips = random(-1, 2);
			slave.butt = random(1, 3);
			slave.anus = 1;
			slave.weight = random(-80, 20);
			slave.muscles = random(0, 40);
			slave.shoulders = random(-1, 2);
			slave.intelligence = random(-50, 50);
			slave.career = "an orphan";
			slave.fetish = "pregnancy";
			slave.behavioralFlaw = either("bitchy", "hates men", "hates women");
			slave.sexualFlaw = either("apathetic", "crude", "hates anal", "hates oral", "judgemental");
			return slave;
		}
	}
};
