App.Events.recStarvingMigrant = class recStarvingMigrant extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.week > 46,
			() => ((V.rep/100) > random(1, 100)) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}

	get eventName() {
		return "Starving Migrant";
	}

	execute(node) {
		const slave = makeSlave();
		const {He, he, his, him, girl} = getPronouns(slave);
		const title = (V.PC.title !== 0) ? `Sir` : `Ma'am`;
		let r = [];

		r.push(`Your desk flags a video message as having potential. This call is coming from a public kiosk outside the Free City, which is usually an indication that the person on the other end is a transient individual or refugee who has decided to take slavery over the alternatives. This appears to be exactly the case; the ${girl} is skeletally gaunt, dressed in tattered rags, and shakes miserably as ${he}`);
		if (!canTalk(slave)) {
			r.push(`gestures ${his} desperate deprivation and willingness to be enslaved to escape it, though ${his} appearance alone communicates ${his} situation quite sufficiently.`);
		} else {
			r.push(`explains ${his} situation.`);
			r.push(Spoken(slave, `"Please, ${title.toLowerCase()}, let me be your slave. I'll do anything you want, I just need food... it took everything I had to get here. A few more days like this and I'll die."`));
		}
		r.push(`Famines have become common as the old world collapses; you surmise ${he} came from a recently stricken region near your arcology.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`You look over the prospective slave. While bone-thin, obviously unhealthy, and barely strong enough to stand, ${he} was resourceful enough to make it to your arcology despite ${his} dire circumstances, and ${his} emaciated face would be`);
		if (slave.face > 80) {
			r.push(`drop-dead gorgeous`);
		} else if (slave.face > 50) {
			r.push(`beautiful`);
		} else {
			r.push(`rather pretty`);
		}
		r.push(`in better health. ${He} would be costly to rehabilitate, but could become a valuable asset.`);

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
			r.push(`You have ${him} let into the arcology and brought up to your penthouse, and ${he} wearily submits to biometric scanning to be registered as your slave. ${He} is visibly relieved at the sudden reality of ${his} survival, even at the price of ${his} freedom.`);
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addNode(el, r);
			return el;
		}

		function sell() {
			const el = new DocumentFragment();
			let r = [];
			cashX(cost, "slaveTransfer");
			r.push(`You have ${him} let into the arcology and brought up to your penthouse, and ${he} wearily submits to biometric scanning to be registered as your slave. When the purchasing agent arrives, you reassure ${him} that ${his} buyer is a charitable slaveowner who will take care of ${him}; you neglect to mention his notorious fetish for fattening up lean slaves.`);
			App.Events.addNode(el, r);
			return el;
		}

		function makeSlave() {
			const slave = GenerateNewSlave("");
			generateSalonModifications(slave);
			slave.origin = "$He begged to be enslaved to avoid starvation.";
			slave.career = "a refugee";
			slave.devotion = random(21, 40);
			slave.trust = random(-20, 20);
			setHealth(slave, random(-80, -40));
			slave.weight = -100;
			slave.muscles = random(-80, -40);
			slave.intelligence = random(0, 100);
			if (slave.behavioralFlaw === "anorexic") {
				slave.behavioralFlaw = "none";
			}
			slave.face = random(20, 100);
			slave.boobs = Math.min(slave.boobs, 300);
			slave.butt = Math.min(slave.butt, 2);
			slave.hStyle = "messy";
			slave.pubicHStyle = "bushy";
			slave.underArmHStyle = "bushy";
			return slave;
		}
	}
};
