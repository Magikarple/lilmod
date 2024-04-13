// cSpell:ignore robophile

App.Events.recRogueCyborg = class recRogueCyborg extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.seeDicks !== 100,
			() => V.PC.skill.hacking >= 100,
			() => (random(0, 100) > 95) || (V.debugMode > 0 && V.debugModeEventSelection > 0),
			() => V.cash >= 100000
		];
	}

	get eventName() {
		return "Rogue Cyborg";
	}

	execute(node) {
		const slave = makeSlave();
		const {him, loli} = getPronouns(slave);
		let r = [];

		r.push(`While digging through the highest security and clearance level database of a powerful old government for anything of value, you discover the existence of an ultra top secret project to develop the most powerful and effective child cyborg ever created. The entire notion is absurd, but it seems they succeeded in creating something. During field testing it was discovered that it retained far too much humanity, resulting in the death of its handler. Unsure of what to do with the project, it has been placed on ice in the bowels of a black site. With a few simple commands, you could release it and order it to your arcology.`);

		App.Events.addParagraph(node, r);

		node.append(App.Desc.longSlave(slave, {market: "generic"}));

		const contractCost = 100000;
		const cost = slaveCost(slave) - contractCost + 300000; // Cyborg very expensive!
		const responses = [];
		if (V.cash >= contractCost) {
			responses.push(new App.Events.Result(`Enslave ${him}`, enslave));
		} else {
			responses.push(new App.Events.Result(null, null, `You lack the necessary funds to enslave ${him}`));
		}
		responses.push(new App.Events.Result(`Sell ${him} immediately`, sell, `This will bring in ${cashFormat(cost)}`));
		App.Events.addResponses(node, responses);

		function enslave() {
			const el = new DocumentFragment();
			let r = [];
			cashX(forceNeg(contractCost), "slaveTransfer", slave);
			r.push(`With your order received the target quickly seeks you out. After a huge sum of credits changes hands to render it penthouse safe, the legalities and biometric scanning are complete and you are now the proud owner of a cyber${loli}.`);
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addNode(el, r);
			return el;
		}

		function sell() {
			const el = new DocumentFragment();
			let r = [];
			cashX(cost, "slaveTransfer");
			r.push(`With your order received the target quickly seeks you out. After a huge sum of credits changes hands to render it safe, the legalities and biometric scanning are complete and it is sold off to a very eager robophile.`);
			App.Events.addNode(el, r);
			return el;
		}

		function makeSlave() {
			const slave = GenerateNewSlave("XX", {maxAge: 24, ageOverridesPedoMode: 1});
			slave.career = App.Data.Careers.Leader.bodyguard.random();
			slave.origin = "$He is an unsuccessful cyborg experiment that was set free.";
			slave.devotion = random(0, 20);
			slave.trust = random(0, 20);
			setHealth(slave, 100);
			slave.weight = random(-11 - 30);
			slave.waist = random(-11, -40);
			slave.skill.combat = 70;
			configureLimbs(slave, "all", 6);
			slave.teeth = "pointy";
			slave.muscles = random(30, 70);
			slave.height = Height.random(slave, {skew: 3, spread: .2, limitMult: [1, 4]});
			slave.face = 100;
			slave.vagina = -1;
			slave.ovaries = 0;
			slave.anus = 0;
			slave.chem = 1500;
			slave.clothes = "a comfortable bodysuit";
			slave.intelligence = 100;
			slave.intelligenceImplant = 30;
			slave.energy = 0;
			slave.attrXX = 0;
			slave.attrXY = 0;
			// slave.custom.label = "Z-23series"; // this is not an appropriate use of custom.label
			slave.behavioralFlaw = "none";
			slave.behavioralQuirk = "none";
			slave.sexualFlaw = "none";
			slave.sexualQuirk = "none";
			slave.fetish = "none";
			slave.fetishStrength = 96;
			slave.fetishKnown = 0;
			slave.piercing.genitals.weight = 0;
			slave.piercing.genitals.smart = false;
			slave.boobsTat = "$He has the characters 'z-23' printed across $his left breast.";
			return slave;
		}
	}
};
