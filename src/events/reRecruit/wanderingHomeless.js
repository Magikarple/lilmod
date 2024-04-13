App.Events.recWanderingHomeless = class recWanderingHomeless extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.seeDicks !== 100,
			() => V.seePreg !== 0,
			() => (random(1, 1000) < 5) || (V.debugMode > 0 && V.debugModeEventSelection > 0),
		];
	}

	get eventName() {
		return "Wandering Homeless";
	}

	execute(node) {
		const slave = makeSlave();
		const {He, he, his, him, girl} = getPronouns(slave);
		let r = [];
		r.push(`As you are heading back to your penthouse from overseeing a promising new store's opening, you noticed a feminine face peeking around a nearby corner. It quickly darts out of sight before a hand beckons you in. The alley isn't particularly out of sight, so no harm looking in. The ${girl} is young, with silver hair, blue eyes, dark skin and`);
		if (slave.preg > 0) {
			r.push(`is enormously pregnant;`);
		} else {
			r.push(`a waifish build;`);
		}
		r.push(`certainly an eye-catching display. ${He} doesn't seem to speak much ${V.language} at all, and judging by ${his} gesturing, is trying to ask you to purchase ${him}.`);
		App.Events.addParagraph(node, r);

		node.append(App.Desc.longSlave(slave, {market: "generic"}));

		const contractCost = 1000;
		const responses = [];
		if (V.cash >= contractCost) {
			responses.push(new App.Events.Result(`Enslave ${him}`, enslave));
		} else {
			responses.push(new App.Events.Result(null, null, `You lack the necessary funds to enslave ${him}`));
		}
		responses.push(new App.Events.Result(`A quick fuck couldn't hurt`, quickFuck));
		App.Events.addResponses(node, responses);

		function enslave() {
			const el = new DocumentFragment();
			let r = [];
			cashX(forceNeg(contractCost), "slaveTransfer", slave);
			r.push(`You always keep a few slave contracts handy for just such an occasion. ${He} eyes it suspiciously before marking it and dropping ${his} skirt and bending over. As you inform ${him} this is not the place for a proper inspection and move to pull ${him} upright does the realization of what happened sink in. ${He} breaks down in tears, pleading in some language you don't understand for what you can only guess is ${his} freedom back. ${He} doesn't look to be in the best of health, so ${he}'ll learn to appreciate the hand that fate dealt ${him} soon enough.`);
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addNode(el, r);
			return el;
		}

		function quickFuck() {
			const el = new DocumentFragment();
			let r = [];
			cashX(forceNeg(1), "personalBusiness");
			r.push(`You take ${him} up on ${his} offer,`);
			if (V.PC.dick !== 0) {
				r.push(`grab ${his} wiggling hips, and hilt your dick in ${his} tight ass. ${He}'s clueless when it comes to anal, so the experience isn't too enjoyable for you. You leave ${him} with a ${cashFormat(1)} tip, a load of cum in ${his} butt, and a smile on ${his} face over getting any money at all.`);
			} else {
				r.push(`pull out a strap-on you carry for just such an occasion, grab ${his} wiggling hips, and hilt yourself in ${his} tight ass. ${He}'s clueless when it comes to anal, so the experience isn't too enjoyable for you. You leave ${him} with a ${cashFormat(1)} tip, a sore rear, and a smile on ${his} face over getting any money at all.`);
			}

			App.Events.addNode(el, r);
			return el;
		}

		function makeSlave() {
			const slave = GenerateNewSlave("XX", {
				minAge: 6, maxAge: 12, disableDisability: 1, race: "asian", nationality: "Stateless"
			});
			slave.origin = "$He offered to sell you $his body and you graciously accepted.";
			slave.devotion = random(-45, -25);
			slave.trust = random(-15, 0);
			slave.weight = -70;
			slave.boobs = 100;
			slave.origHColor = "silver";
			slave.eye.origColor = "blue";
			slave.origSkin = "dark";
			applyGeneticColor(slave);
			if (slave.actualAge < 13) {
				slave.career = "a child prostitute";
			} else {
				slave.career = "a prostitute";
			}
			slave.vagina = 2;
			slave.anus = 1;
			slave.skill.oral = 30;
			slave.skill.vaginal = 20;
			slave.accent = 3;
			slave.preg = 0;
			if (canGetPregnant(slave)) {
				slave.lactation = 1;
				slave.lactationDuration = 2;
				slave.preg = 30;
				slave.pregType = 3;
				slave.pregWeek = 30;
				slave.pregKnown = 1;
				SetBellySize(slave);
			}
			return slave;
		}
	}
};
