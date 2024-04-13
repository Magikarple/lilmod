App.Events.recetsPoshMotherDaughter = class recetsPoshMotherDaughter extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.seeDicks !== 100,
			() => V.rep / 400 > random(1, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}

	get eventName() {
		return `Posh Mother Daughter`;
	}

	execute(node) {
		App.UI.StoryCaption.encyclopedia = "Enslaving People";
		let r = [];

		let pram = new GenerateNewSlavePram();
		Object.assign(pram, {
			minAge: Math.max(V.fertilityAge + V.minimumSlaveAge, 16), maxAge: 40, ageOverridesPedoMode: 1, disableDisability: 1, race: "nonslave"
		});
		const contractCost = 1500;
		const mother = GenerateNewSlave("XX", pram);
		mother.origin = "$He was enslaved after you called in $his business debts.";
		mother.career = "a business owner";
		mother.devotion = random(-15, 15);
		mother.trust = random(-15, 15);
		mother.oldDevotion = mother.devotion;
		mother.oldTrust = mother.trust;
		mother.vagina = 2;
		mother.ovaries = 1;
		mother.counter.birthsTotal++;
		mother.face = 15;
		mother.skill.vaginal = 15;
		mother.anus = 0;
		mother.skill.anal = 0;
		mother.boobs += 400;
		mother.boobsImplant = 400;
		mother.boobsImplantType = "normal";
		mother.butt++;
		mother.buttImplant = 1;
		mother.buttImplantType = "normal";
		mother.clothes = "nice business attire";
		setHealth(mother, jsRandom(20, 40), 0, 0, 0);
		mother.pubicHStyle = "neat";
		mother.underArmHStyle = "shaved";
		mother.canRecruit = 0;
		let cost = slaveCost(mother);
		cost -= 1500;

		const daughter = generateRelatedSlave(mother, "daughter");
		daughter.origin = "You acquired $him along with $his mother when the family business failed.";
		daughter.career = daughter.actualAge < 16 ? "a student from a private school" : "an intern";
		daughter.devotion -= 25;
		daughter.trust -= 10;
		daughter.oldDevotion = daughter.devotion;
		daughter.oldTrust = daughter.trust;
		daughter.boobs = Math.max(daughter.boobs - 200, 100);
		if (daughter.boobs >= 400) { // if daughter is physically mature enough to have at least natural B-cups, she's had them enhanced
			daughter.boobs += 200;
			daughter.boobsImplant = 200;
			daughter.boobsImplantType = "normal";
		} else { // otherwise, clear implants inherited from mother's data
			daughter.boobsImplant = 0;
			daughter.boobsImplantType = "none";
		}
		daughter.buttImplant = 0;
		daughter.buttImplantType = "none";
		daughter.vagina = 0;
		daughter.skill.vaginal = 0;
		daughter.behavioralQuirk = "none";
		daughter.behavioralFlaw = "arrogant";

		const {
			His, He,
			his, he, him, woman
		} = getPronouns(mother);
		const {
			He2, His2,
			daughter2, he2, his2, him2
		} = getPronouns(daughter).appendSuffix("2");

		App.Events.addParagraph(node, [`A${mother.actualAge > 24 ? "n older" : " young"} ${woman} comes to see you representing ${his} family business. ${He}'s pretty enough, but extremely unpleasant to deal with. ${He} pushes hard for a deal that strongly favors ${him}, and is not above leaning over your desk to give you an eyeful of probably-enhanced cleavage behind ${his} business attire. As you argue, a discreet alert appears on your desk: ${his} family business is actually on the verge of bankruptcy. With a press of your thumb you could acquire enough of ${his} debts to be able to enslave ${him}. And what's more, ${his} ${daughter2} ${daughter.actualAge === V.minimumSlaveAge ? "just came of age and became" : "is"} a partner in the business. ${He2}'s in play, too. Based on the desk report, ${he2}'s likely to be a spoiled little bitch.`]);

		App.Events.addParagraph(node, [`Enslaving the mother will cost ${cashFormat(contractCost)}. Alternatively, you could sell your rights to ${him}. Including costs, this will bring in ${cashFormat(cost - contractCost)}. As a third option, for ${cashFormat(contractCost * 2)} you could enslave both mother and ${daughter2}, but you wouldn't be able to examine the ${daughter2} first.`]);

		const newSlaves = [mother]; /* caller doesn't want relative involved, so you don't get to inspect her even if you can force a sale */

		node.append(App.UI.MultipleInspect(newSlaves, true, "generic"));
		const choices = [];

		if (V.cash >= contractCost) {
			choices.push(new App.Events.Result(`Enslave the mother`, enslave, `This will cost ${cashFormat(contractCost)}`));
			choices.push(new App.Events.Result(`Sell ${him} immediately`, sell, `This will bring in ${cashFormat(cost - contractCost)}`));
			if (V.cash >= (contractCost * 2)) {
				choices.push(new App.Events.Result(`Manipulate ${him} to enslave both mother and ${daughter2}`, both, `This will cost ${cashFormat(contractCost * 2)}`));
			}
		} else {
			choices.push(new App.Events.Result(null, null, `You lack the necessary funds to enslave ${him}.`));
		}
		App.Events.addResponses(node, choices);

		function enslave() {
			newSlave(mother);
			cashX(forceNeg(contractCost), "slaveTransfer", mother);
			return `You press your thumb down on your desk interface and then tell ${him} to read the display, strip, and show you ${his} body. ${He} knits ${his} brow in confusion and begins to curse at you but reads anyway. Comprehension dawns on ${him} and ${he} stares you in the eye for a long moment — and then drops ${his} gaze. ${He} knows the Free Cities well enough to understand. ${He} stands and sadly strips off ${his} blouse and slacks. Following orders, ${he} rotates slowly for you. Then, ${he} bends over facing away from you and spreads ${his} buttocks to display ${his} holes. Unsurprisingly, ${he}'s got a well-used pussy but has clearly never taken it up the ass. That will change.`;
		}

		function sell() {
			cashX((cost - contractCost), "slaveTransfer", mother);
			return `${mother.slaveName} accepts being resold without much fuss. ${He}'s merely exchanged one unknown owner for another. For all ${he} knows ${his} new buyer will be less abusive than you would have been. ${He} would be less complacent if ${he} knew who ${his} buyers are; ${he}'ll be immured in an arcade within the hour.`;
		}

		function both() {
			const frag = new DocumentFragment();
			r = [];
			newSlave(mother);
			cashX(forceNeg(contractCost), "slaveTransfer", mother);
			newSlave(daughter);
			cashX(forceNeg(contractCost), "slaveTransfer", daughter);

			mother.devotion -= 25;
			r.push(`You press your thumb down on your desk interface and then tell ${him} to read the display, strip, and show you ${his} body. ${He} knits ${his} brow in confusion and begins to curse at you but reads anyway. Comprehension dawns on ${him} and ${he} stares you in the eye for a long moment — and then drops to`);
			if (hasBothLegs(mother)) {
				r.push(`${his} knees`);
			} else {
				r.push(`the floor`);
			}
			r.push(`and begins to beg for ${his} ${daughter2}'s freedom. ${He} knows the Free Cities well enough to be unsurprised when you ignore ${him} completely. ${He} stands and sadly strips off ${his} blouse and slacks. Following orders, ${he} rotates slowly for you. Then, ${he} bends over facing away from you and spreads ${his} buttocks to display ${his} holes. Unsurprisingly, ${he}'s got a well-used pussy but has clearly never taken it up the ass. That will change.`);
			App.Events.addParagraph(frag, r);
			App.Events.addParagraph(frag, [`${His} ${daughter2} walks in angrily demanding to know why you called ${him2} here. ${He2} sees ${his2} mother kneeling naked next to you, hears the hiss-click of the door closing and locking behind ${him2}, and makes the connection far too late to run. ${He2} begins to scream at both you and ${his2} mother at the top of ${his2} lungs, and manages to keep up an impressive volume until you get ${him2} gagged. ${His2} mother does not move to interfere as you strip and bind ${his} ${daughter2}'s struggling body.`]);
			return frag;
		}
	}
};
