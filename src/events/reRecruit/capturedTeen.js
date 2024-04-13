// cSpell:ignore vidcall

App.Events.recCapturedTeen = class recCapturedTeen extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.seeDicks !== 100,
			() => V.terrain !== "oceanic",
		];
	}

	get eventName() {
		return "Captured Teen";
	}

	execute(node) {
		const slave = makeSlave();
		const {
			He,
			he, his, him, girl, daughter,
		} = getPronouns(slave);
		let r = [];

		r.push(`You've been kept busy until late at night. The warm blue glow of your desk screen illuminates your work. Suddenly, your assistant flags an incoming vidcall as urgent. The call had decent encryption, but could be traced to a rural location several`);
		if (V.showInches === 2) {
			r.push(`miles`);
		} else {
			r.push(`kilometers`);
		}
		r.push(`away from your arcology. The callers only specified that they had a good deal to offer.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`With apprehension, you decide to let the call through. The screen switches from your work to the vidcall. Several armed men, cloaked in black, are standing around a pretty young ${girl}. ${He}'s gagged and bound to a chair.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`The men explain that they've captured the young ${daughter} of a wealthy old-world businessman, by abducting ${him} straight from a gated community. It's far from uncommon for ${girl}s to be captured and sold as slaves, but that these men had the balls to raid a gated community is something else. There are still some places in the world that are considered safe, where the world's deterioration isn't readily apparent. Showing that these places aren't safe from the predations of slavers upsets what little balance that the old world still has left, and that isn't always a good thing for the Free Cities.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`At any rate, ${he}'s a fine capture. And unsurprisingly, they want to get rid of ${him}. Fast. They're willing to offer a below-market price for ${his} enslavement.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(App.UI.DOM.makeElement("span", `You can buy out ${his} auction for ${cashFormat(10000)}.`, "note"));

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
			r.push(`You agree to the purchase. The men give a hushed thank you, and the call ends, cutting you off from the light. They arrive outside the city just a few hours later, and you send your VTOL to pick up the ${girl}. When ${he} arrives, you see that ${he} was kept in the same bindings. ${He}'s awake, and ${his} eyes make ${his} hatred of you unmistakable.`);
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addNode(el, r);
			return el;
		}

		function sell() {
			const el = new DocumentFragment();
			let r = [];
			cashX(cost, "slaveTransfer");
			r.push(`You agree to the purchase. The men give a hushed thank you, and the call ends, cutting you off from the light. They arrive outside the city just a few hours later, and you send your VTOL to pick up the ${girl}. When ${he} arrives, you see that ${he} was kept in the same bindings. ${He}'s awake, and ${his} eyes make ${his} hatred of you unmistakable; fortunately, that's not your problem. You have a buyer with a taste for spoiled ${girl}s raised on a diet of false security lined up and eager to meet his new toy. ${He} struggles against ${his} bindings as his agent carries ${him} off, but quickly loses hope when ${he} finds there is no chance of mercy.`);
			App.Events.addNode(el, r);
			return el;
		}

		function makeSlave() {
			const slave = GenerateNewSlave("XX", {
				minAge: 13, maxAge: 18,
				race: "white", disableDisability: 1
			});
			generateSalonModifications(slave);
			slave.origin = "$He was captured in a raid on a gated community and quickly sold off.";
			slave.devotion = -20;
			slave.trust = 0;
			setHealth(slave, 20, undefined, undefined, 0, 40);
			slave.face = random(20, 60);
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
			slave.underArmHStyle = "waxed";
			slave.hips = random(0, 2);
			slave.butt = random(1, 4);
			slave.anus = 1;
			slave.weight = random(-20, 0);
			slave.muscles = 0;
			slave.shoulders = random(-2, 0);
			slave.intelligence = random(-50, -16);
			slave.career = "from an upper class family";
			slave.fetish = "humiliation";
			slave.behavioralFlaw = "arrogant";
			slave.voice = 3;
			slave.boobShape = "perky";
			slave.origSkin = "light";
			slave.eye.origColor = "blue";
			slave.origHColor = "blonde";
			applyGeneticColor(slave);
			slave.teeth = "normal";
			slave.prestige = 1;
			slave.prestigeDesc = "$He is the notoriously spoiled $daughter of a wealthy old world businessman.";
			return slave;
		}
	}
};
