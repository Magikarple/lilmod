App.Events.recetsAddictMotherDaughter = class recetsAddictMotherDaughter extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.rep / 400 > random(1, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}

	get eventName() {
		return `Addict Mother Daughter`;
	}

	execute(node) {
		App.UI.StoryCaption.encyclopedia = "Enslaving People";
		let r = [];
		const contractCost = 1000;

		let pram = new GenerateNewSlavePram();
		Object.assign(pram, {
			minAge: V.fertilityAge + V.minimumSlaveAge, maxAge: 40, ageOverridesPedoMode: 1, disableDisability: 1, race: "nonslave"
		});
		const mother = GenerateNewSlave("XX", pram);
		mother.origin = "$He sold $himself into slavery to escape addiction debts.";
		mother.career = App.Data.Careers.General.uneducated.random();
		mother.devotion = random(-15, 15);
		mother.trust = random(-15, 15);
		mother.oldDevotion = mother.devotion;
		mother.addict = 8;
		mother.boobs += 100;
		mother.face = -15;
		mother.butt++;
		if (mother.vagina > -1) {
			mother.vagina++;
		}
		mother.anus++;
		setHealth(mother, jsRandom(-60, 20), Math.max(normalRandInt(5, 3), 0), Math.max(normalRandInt(5, 3), 0));
		mother.pubicHStyle = "waxed";
		mother.underArmHStyle = "waxed";
		mother.canRecruit = 0;
		mother.counter.birthsTotal++;
		let cost = slaveCost(mother);
		cost -= 1000;

		const daughter = generateRelatedSlave(mother, "daughter");
		daughter.origin = "You tricked $his mother into selling $him into slavery to clear addiction debts.";
		daughter.intelligenceImplant = 0;
		daughter.career = randomCareer(daughter);
		daughter.slaveName = daughter.birthName;
		daughter.devotion += 10;
		daughter.trust += 10;
		daughter.oldDevotion = daughter.devotion;
		daughter.oldTrust = daughter.trust;

		const {
			He,
			his, he, him, himself
		} = getPronouns(mother);
		const {
			daughter2, he2, his2
		} = getPronouns(daughter).appendSuffix("2");

		App.Events.addParagraph(node, [`A matronly woman comes to your penthouse in tears. It seems ${he} is a tenant of yours, and has fallen deeply into debt as a result of aphrodisiac addiction. ${He} offers to sell ${himself} into slavery if you will pay off ${his} debts. ${He} is strangely eager about this, and after some probing it becomes apparent that ${he} is living with ${his} ${daughter2} and wants to avoid having ${his} ${daughter2} involved in this debt.`]);

		App.Events.addParagraph(node, [`Enslaving ${him} will cost ${cashFormat(contractCost)}. Alternatively, you could sell your rights to ${him}. Including costs, this will bring in ${cashFormat(cost - contractCost)}. As a third option, for ${cashFormat(contractCost * 2)} you could manipulate ${him} to bind both mother and ${daughter2}, but you wouldn't be able to examine the ${daughter2} first.`]);

		const newSlaves = [mother]; /* caller doesn't want relative involved, so you don't get to inspect her even if you can force a sale */

		node.append(App.UI.MultipleInspect(newSlaves, true, "generic"));
		const choices = [];

		if (V.cash >= contractCost) {
			choices.push(new App.Events.Result(`Accept ${his} proposal and enslave ${him}`, enslave, `This will cost ${cashFormat(contractCost)}`));
			choices.push(new App.Events.Result(`Sell ${him} immediately`, sell, `This will bring in ${cashFormat(cost - contractCost)}`));
			if (V.cash >= (contractCost * 2)) {
				choices.push(new App.Events.Result(`Manipulate ${him} to enslave both mother and ${daughter2}`, both, `This will cost ${cashFormat(contractCost * 2)}`));
			}
		} else {
			choices.push(new App.Events.Result(null, null, `You lack the necessary funds to enslave ${him}.`));
		}
		App.Events.addResponses(node, choices);

		function enslave() {
			const frag = new DocumentFragment();
			r = [];
			seX(mother, "oral", V.PC, "penetrative");
			newSlave(mother);
			cashX(forceNeg(contractCost), "slaveTransfer", mother);
			r.push(`Despite ${himself}, ${he} sobs with relief when you agree. ${He} offers to`);
			if (V.PC.dick !== 0) {
				r.push(`suck you off`);
				if (V.PC.vagina !== -1) {
					r.push(`and`);
				}
			}
			if (V.PC.vagina !== -1) {
				r.push(`eat you out`);
			}
			r.push(`while you complete the necessary legalities, so you work away with a`);
			if (V.PC.dick !== 0) {
				r.push(`pair of motherly lips wrapped around your dick`);
			} else {
				r.push(`motherly tongue pleasuring your clit`);
			}
			r.push(`as ${he} pumps away eagerly under the desk. ${He}'s definitely on aphrodisiacs. ${He} masturbates while ${he} sucks.`);
			App.Events.addParagraph(frag, r);
			return frag;
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
			mother.devotion -= 50;

			r.push(`Despite ${himself}, ${he} sobs with relief when you agree. ${He} offers to`);
			if (V.PC.dick !== 0) {
				r.push(`suck you off`);
			} else {
				r.push(`eat you out`);
			}
			r.push(`while you complete the necessary legalities, but instead you idly place a big dose of aphrodisiac on your desk and tell ${him} to wait quietly. After ten minutes of careful manipulation, ${he}'s signed away both ${his} own freedom and ${his} ${daughter2}'s without realizing it, in return for the drug. ${He}'s masturbating furiously on a chair when ${his} ${daughter2} arrives. ${He} immediately realizes what's happened and ${his} eyes fill with all-consuming hatred, but ${he} can't stop rubbing.`);
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`Unsurprisingly the ${daughter2} is an addict too, and before long ${he2}'s given ${his2} signature and is sitting on a different chair on a strong dose of aphrodisiacs.`);
			if (daughter.dick > 0) {
				r.push(`Mother and ${daughter2} crank it desperately,`);
			} else {
				r.push(`Mother and ${daughter2} schlick themselves desperately,`);
			}
			r.push(`sobbing in despair as you hurry to complete the nastily complex paperwork. This is going to be fun.`);
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
