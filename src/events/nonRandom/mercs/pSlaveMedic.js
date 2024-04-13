App.Events.PSlaveMedic = class PSlaveMedic extends App.Events.BaseEvent {
	execute(node) {
		let r = [];

		V.nextButton = "Continue";

		const minAge = (V.pedo_mode === 1) ? V.minimumSlaveAge : 18;
		const maxAge = (V.pedo_mode === 1) ? 25 : 42;

		const genParam = {minAge: minAge, maxAge: maxAge, disableDisability: 1};
		let slave;
		if (V.seeDicks >= 100) {
			slave = GenerateNewSlave("XY", genParam);
			slave.dick = 5;
			slave.foreskin = 0;
			slave.balls = 3;
			slave.scrotum = 3;
			slave.butt = 3;
			slave.attrXY = 70;
			slave.skill.penetrative = 35;
		} else {
			slave = GenerateNewSlave("XX", genParam);
			slave.vagina = 2;
			slave.preg = -1;
			slave.ovaries = 1;
			slave.skill.vaginal = 35;
		}
		if (V.pedo_mode === 1) {
			slave.sexualQuirk = "caring";
			slave.intelligenceImplant = 15;
			if (slave.physicalAge >= 12) {
				slave.teeth = "cosmetic braces";
			}
			if (V.seeDicks < 100) {
				slave.hips = 1;
				slave.boobs = 2000;
				slave.boobShape = "perky";
				slave.geneticQuirks.macromastia = 2;
				slave.butt = 4;
				slave.voice = 3;
			} else {
				slave.geneticQuirks.wellHung = 2;
			}
		} else {
			slave.anusTat = "bleached";
			slave.height = random(165, 190);
			slave.intelligenceImplant = 30;
			slave.teeth = "normal";
			if (V.seeDicks < 100) {
				slave.boobs += 400;
				slave.natural.boobs = slave.boobs;
				slave.butt += 1;
				slave.stampTat = either("flowers", "tribal patterns");
			}
		}
		slave.origin = "$He was captured while caring for those injured in a failed attack on the Free City.";
		slave.career = "a nurse";
		slave.custom.desc = "$He has a faint air of fatigue about $him, and strength too: that of a survivor.";
		slave.sexualFlaw = "none";
		slave.behavioralFlaw = "none";
		slave.devotion = random(30, 40);
		slave.trust = slave.devotion - 20;
		slave.oldDevotion = slave.devotion;
		slave.muscles = random(20, 50);
		slave.skill.oral = 35;
		slave.skill.anal = 15;
		slave.skill.whoring = 0;
		slave.skill.entertainment = 15;
		slave.intelligence = random(51, 95);
		slave.anus = 2;
		slave.hStyle = "neat";
		slave.hLength = 35;
		setHealth(slave, jsRandom(20, 40));
		if (V.mercenaries >= 3) {
			slave.counter.publicUse += 39;
		} else {
			slave.counter.publicUse += 13;
		}

		App.Events.drawEventArt(node, slave);
		const {
			He,
			he, his, him, himself, girl,
		} = getPronouns(slave);

		if (V.pedo_mode === 1 && V.seeDicks < 100) {
			r.push(`You make a habit of dropping in on your mercenaries whenever you get the chance. You have regular meetings with their grizzled captain, of course, but turning up unannounced to get to know them is simply a matter of self-preservation. The better they like you, the more likely they are to think of more than their pay when deciding how to hazard themselves on your behalf. When you enter the lounge of their`);
			if (V.barracks) {
				r.push(`barracks,`);
			} else {
				r.push(`main living area,`);
			}
			r.push(`you see ${slave.slaveName} kneeling next to a mercenary with most of his armor stripped off. ${He}'s the ${aNational(slave.nationality)} nurse they captured and enslaved, and ${he} seems to be doing pretty well in ${his} new life. ${He} seems to be checking the sutures on a minor wound to the man's flank. "Don't squirm!" ${he} says with an annoyed tone. "I'll get you off when I've checked this." He chuckles and holds still; ${he} redresses the wound, stands up, and strips off ${his} tank top, allowing ${his} huge tits to swing free. ${He}'s quite young, but ${his} ${slave.skin} body is appealingly curvy. As ${he} swings one leg across the seated mercenary, ${he} continues, "Please sit still and let me do the work. You need to take it easy for a day or two or you'll pop those sutures." Using ${his} hands, ${he} gently caresses his stiff prick with ${his} pillowy breasts, eliciting a grunt. ${He}'s a strong ${girl}, and pleasures him without letting any of ${his} weight rest on his body at all. When he climaxes, ${he} leans in to clean him with ${his} mouth and then heads off to wash out ${his} cleavage.`);
		} else {
			r.push(`You make a habit of dropping in on your mercenaries whenever you get the chance. You have regular meetings with their grizzled captain, of course, but turning up unannounced to get to know them is simply a matter of self-preservation. The better they like you, the more likely they are to think of more than their pay when deciding how to hazard themselves on your behalf.`);

			r.push(`When you enter the lounge of their`);
			if (V.barracks) {
				r.push(`barracks,`);
			} else {
				r.push(`main living area,`);
			}
			r.push(`you see ${slave.slaveName} bending over a mercenary with most of his armor stripped off. ${He}'s the ${aNational(slave.nationality)} nurse they captured and enslaved, and ${he} seems to be doing pretty well in ${his} new life. ${He} seems to be checking the sutures on a minor wound to the man's flank. "Don't squirm," ${he} says quietly. "I'll get you off when I've checked this." He chuckles and holds still; ${he} redresses the wound, stands up, and strips off ${his} fatigue pants.`);
			if (V.pedo_mode === 1) {
				r.push(`${He}'s quite youthful, nimble and knows just how to manage ${his} impressive asset without it touching ${his} charge.`);
			} else {
				r.push(`${He}'s no longer young, but ${his} ${slave.skin} legs are pretty enough.`);
			}
			r.push(`As ${he} swings one leg across the seated mercenary, ${he} continues, "Please sit still and let me do the work. You need to take it easy for a day or two or you'll pop those sutures." Using a hand, ${he} guides ${himself} down onto his stiff prick, eliciting a grunt. ${He}'s a strong ${girl}, and rides him without letting any of ${his} weight rest on his hips at all. When he climaxes, ${he} kneels to clean him with ${his} mouth and then heads off to wash.`);
		}

		App.Events.addParagraph(node, r);

		const lowBid = 10000;
		const highBid = 25000;
		const choices = [];
		if (V.cash > lowBid) {
			choices.push(new App.Events.Result(`Offer ${cashFormat(lowBid)} for ${him}`, offerLow));
			if (V.cash > highBid) {
				choices.push(new App.Events.Result(`Offer a very generous ${cashFormat(highBid)} for ${him}`, offerHigh));
			} else {
				choices.push(new App.Events.Result(null, null, `Cannot afford even a generous bid of ${cashFormat(highBid)}`));
			}
		} else {
			choices.push(new App.Events.Result(null, null, `Cannot afford even a low bid of ${cashFormat(lowBid)}`));
		}

		App.Events.addResponses(node, choices);

		function offerLow() {
			return `The mercenary laughs at your offered price. "No offense, ${properTitle()}, but no. Even if I wanted to sell ${him} on everyone's behalf for that price, my buddies would kill me for that. ${He}'s popular, that ${slave.slaveName}."`;
		}

		function offerHigh() {
			let r = [];
			cashX(-highBid, "slaveTransfer", slave);
			r.push(`"Huh," says the mercenary. "${He}'s popular, but for that we could probably buy two of ${him}. Might be fun to train a couple of new nurses. Let me ask the boys and girls." He speaks into his helmet for a few minutes, and then turns back to you. "Sold. Enjoy, ${he}'s a good fuck."`);
			r.push(App.UI.newSlaveIntro(slave));
			return r;
		}
	}
};
