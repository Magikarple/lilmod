App.Events.recetsMismatchedPair = class recetsMismatchedPair extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.seeDicks !== 0,
			() => V.seeDicks !== 100,
			() => (S.HeadGirl && S.HeadGirl.devotion > 50),
			() => V.rep / 400 > random(1, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}

	get eventName() {
		return `Mismatched Pair`;
	}

	execute(node) {
		App.UI.StoryCaption.encyclopedia = "Enslaving People";
		const contractCost = 1500;
		const bro = GenerateNewSlave("XY", {
			minAge: V.minimumSlaveAge, maxAge: 21, disableDisability: 1, race: "nonslave"
		});
		bro.origin = "$He was sold into slavery by $his older sister.";
		bro.career = "a prostitute";
		bro.devotion = random(-15, 15);
		bro.trust = random(-15, 15);
		bro.oldDevotion = bro.devotion;
		bro.oldTrust = bro.trust;
		setHealth(bro, jsRandom(0, 20));
		bro.anus = 1;
		bro.vagina = -1;
		bro.dick = 1;
		if (bro.foreskin > 0) {
			bro.foreskin = bro.dick;
		}
		if (bro.balls > 0) {
			bro.scrotum = bro.balls;
		}
		bro.clit = 0;
		bro.balls = 1;
		bro.face = 15;
		bro.weight = 0;
		bro.skill.vaginal = 0;
		bro.skill.oral = 15;
		bro.skill.anal = 15;
		bro.skill.penetrative = 15;
		bro.boobs = 600;
		bro.boobsImplant = 400;
		bro.boobsImplantType = "normal";
		bro.butt = either(1, 2);
		bro.preg = -2;
		bro.birthWeek = 0;
		bro.sexualFlaw = "hates anal";
		bro.hStyle = "tails";
		bro.pubicHStyle = "waxed";
		bro.underArmHStyle = "waxed";
		setMissingParents(bro);
		bro.canRecruit = 0;
		bro.rivalry = 3;
		let cost = slaveCost(bro);
		cost -= 1500;

		const sis = generateRelatedSlave(bro, "older sister");
		sis.origin = "You acquired $him along with $his sissy sister due to $his inexperience as a madam.";
		sis.career = "a pimp";
		sis.devotion -= 50;
		sis.trust -= 10;
		sis.oldDevotion = sis.devotion;
		sis.oldTrust = sis.trust;
		sis.skill.vaginal = 0;
		sis.skill.oral = 0;
		sis.skill.anal = 0;
		sis.behavioralFlaw = "arrogant";
		sis.sexualFlaw = "hates penetration";
		sis.boobs = either(400, 500);
		sis.boobsImplant = 0;
		sis.boobsImplantType = "none";
		sis.butt = either(2, 3);
		sis.rivalry = 3;
		sis.rivalryTarget = bro.ID;
		bro.rivalryTarget = sis.ID;

		const {
			He, His,
			he, his, him, himself, sister
		} = getPronouns(bro);
		const {
			He2, His2,
			he2, him2, his2, sister2,
		} = getPronouns(sis).appendSuffix("2");
		const {
			He3,
			he3,
		} = getPronouns(S.HeadGirl).appendSuffix("3");

		const {title: Master} = getEnunciation(S.HeadGirl);

		App.Events.addParagraph(node, [
			`Your Head Girl comes to see you. ${He3} flags a slave posted for sale on your desk. The posting seems completely unimpressive — just a bitch barely past ${his} ${ordinalSuffix(bro.actualAge)} birthday with basic implants and a pathetic little dick — until ${he3} points out that the person posting ${him} for sale is ${his} ${sister2}. ${His} ${sis.actualAge - bro.actualAge > 3 ? `` : `slightly`} older, naturally female ${sister2}. Who, to go by the pictures, the younger sibling has desperately been trying to mold ${himself} to look more like.`,
			Spoken(S.HeadGirl, `"It won't show on the desk yet, but rumor is the little cunt's gotten them both in bad debt, ${Master}. You could grab them both cheap."`),
			`You bring up a video feed of the one-room apartment they share. A man, clearly a client, is sitting on the bed while the sissy rides him. ${He}'s facing away from the john, so ${he} isn't trying to hide the fact that ${he} isn't happy selling ${his} anus for money. The older ${sister2} is naked, but ${he2}'s trying to act as a pimp of sorts rather than helping fuck. ${He2} alternately poses and preens for the john and nonverbally scolds the wincing sissy when he's not paying attention. After the customer finishes, the sissy heads to the toilet to clean ${himself}, and ${his} older ${sister2} whispers to the john that the sissy's for sale. The john laughs at ${him2} and excuses himself.`
		]);

		let r = [];
		r.push(`Enslaving the younger, sissy ${sister} will cost ${cashFormat(contractCost)}. Alternatively, you could sell your rights to ${him}. Including costs, this will bring in ${cashFormat(cost - contractCost)}. As a third option, for ${cashFormat(contractCost * 2)} you could enslave both`);
		if (sister === sister2) {
			r.push(`${sister}s,`);
		} else {
			r.push(`siblings,`);
		}
		r.push(`but you wouldn't be able to examine the older one first. ${He2}'ll likely be very rebellious and sexually unskilled.`);
		App.Events.addParagraph(node, r);

		const newSlaves = [bro]; /* caller doesn't want relative involved, so you don't get to inspect her even if you can force a sale */

		node.append(App.UI.MultipleInspect(newSlaves, true, "generic"));
		const choices = [];

		if (V.cash >= contractCost) {
			choices.push(new App.Events.Result(`Enslave the sissy slut`, enslave, `This will cost ${cashFormat(contractCost)}`));
			choices.push(new App.Events.Result(`Sell ${him} immediately`, sell, `This will bring in ${cashFormat(cost)}`));
			if (V.cash >= (contractCost * 2)) {
				choices.push(new App.Events.Result(`Enslave both`, both, `This will cost ${cashFormat(contractCost * 2)}`));
			}
		} else {
			choices.push(new App.Events.Result(null, null, `You lack the necessary funds to enslave ${him}.`));
		}
		App.Events.addResponses(node, choices);

		function enslave() {
			bro.mother = 0;
			bro.father = 0;
			bro.rivalry = 0;
			bro.rivalryTarget = 0;
			newSlave(bro);
			cashX(forceNeg(contractCost), "slaveTransfer", bro);
			return `The poor sissy isn't happy to become a slave, but ${he}'s clearly relieved to be away from ${his} ${sister2}. The bitch isn't likely to have an easy time; the sale didn't clear ${him2} from debt. ${bro.slaveName} describes ${his} basic sexual experience, which includes a lot of sucking and anal whoring. Without further ado ${he} moves from practical sexual slavery at the hands of ${his} ${sister2} to actual sexual slavery.`;
		}

		function sell() {
			cashX(cost, "slaveTransfer");
			return `${bro.slaveName} accepts being resold without much fuss. ${He}'s merely exchanged one unknown owner for another. For all ${he} knows ${his} new buyer will be less abusive than you would have been. ${He} would be less complacent if ${he} knew who ${his} buyers are; ${he}'ll be immured in an arcade within the hour.`;
		}

		function both() {
			newSlave(bro);
			newSlave(sis);
			cashX(forceNeg(contractCost), "slaveTransfer", bro);
			cashX(forceNeg(contractCost), "slaveTransfer", sis);
			const frag = new DocumentFragment();
			App.Events.addParagraph(frag, [`The poor sissy isn't happy to become a slave, but ${he}'s clearly relieved to be away from ${his} ${sister2}. The bitch isn't likely to have an easy time; the sale didn't clear ${him2} from debt. ${bro.slaveName} describes ${his} basic sexual experience, which includes a lot of sucking and anal whoring. Without further ado ${he} moves from practical sexual slavery at the hands of ${his} ${sister2} to actual sexual slavery.`]);
			App.Events.addParagraph(frag, [`${His} ${sister2}-pimp walks in angrily demanding to know why you called ${him2} here. ${He2} sees ${his2} sissy ${sister} kneeling naked next to you, hears the hiss-click of the door closing and locking behind ${him2}, and makes the connection far too late to run. ${He2} begins to scream at both you and ${his2} ${sister} at the top of ${his2} lungs, and manages to keep up an impressive volume until you get ${him2} gagged. ${His2} ${sister} does not move to interfere as you strip and bind ${his2} struggling body. In fact, as you get the gag in place, ${he} begins to laugh an unstable, cracking laugh that degenerates into sobbing.`]);
			return frag;
		}
	}
};
