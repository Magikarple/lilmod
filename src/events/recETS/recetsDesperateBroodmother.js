App.Events.recetsDesperateBroodmother = class recetsDesperateBroodmother extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.seeDicks !== 100,
			() => V.seePreg !== 0,
			() => V.seeHyperPreg === 1,
			() => !FutureSocieties.isActive('FSRestart'),
			() => V.rep / 400 > random(1, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}

	get eventName() {
		return `Desperate Broodmother`;
	}

	execute(node) {
		App.UI.StoryCaption.encyclopedia = "Enslaving People";
		const contractCost = 1000;
		const pram = {
			minAge: V.fertilityAge + 3, maxAge: (V.pedo_mode === 1 ? 18 : 24), disableDisability: 1, ageOverridesPedoMode: 1
		};
		const mother = GenerateNewSlave("XX", pram);
		mother.origin = "$He begged to be enslaved in a desperate attempt to provide for $his many children.";
		mother.career = "homeless";
		setHealth(mother, jsRandom(-45, -30), -1, -1, -1, 80);
		mother.devotion = random(35, 45);
		mother.trust = random(15, 25);
		mother.oldDevotion = mother.devotion;
		/* Being pregnant with 25-29 children requires either hyper fertility drugs (1/3 odds) or a genetic quirk (2/3 odds) */
		mother.geneticQuirks.hyperFertility = either(mother.geneticQuirks.hyperFertility, 2, 2);
		mother.face = 15;
		mother.vagina = 4;
		mother.skill.vaginal = 45;
		mother.skill.whoring = 20;
		mother.skill.anal = 10;
		mother.anus = 1;
		mother.weight = random(-80, -50);
		mother.muscles = 0;
		mother.underArmHStyle = "bushy";
		mother.pubicHStyle = "bushy";
		mother.boobs = 1600;
		mother.boobShape = "saggy";
		mother.nipples = "huge";
		mother.lactation = 1;
		mother.lactationDuration = 2;
		mother.lactationAdaptation = 30;
		mother.hips = 2;
		mother.vaginaLube = 1;
		mother.butt += 3;
		mother.sexualQuirk = "caring";
		mother.pubertyXX = 1;
		mother.canRecruit = 0;
		mother.preg = 41;
		mother.pregType = random(25, 29);
		mother.pregKnown = 1;
		mother.pregWeek = mother.preg;
		SetBellySize(mother);
		mother.pregAdaptation = 600;
		mother.ovaries = 1;
		mother.counter.birthsTotal = 5;
		mother.bellySag = 20;
		mother.bellySagPreg = 20;

		let child;
		if (random(1, 100) < V.seeDicks) { /* boy*/
			child = generateRelatedSlave(mother, "son");
			child.origin = "$His mother offered $him to you as an incentive to take them in.";
			child.career = "homeless";
			child.slaveName = child.birthName;
			setHealth(child, jsRandom(10, 20));
			child.devotion -= 5;
			child.trust -= 5;
			child.oldDevotion = child.devotion;
			child.oldTrust = child.trust;
			child.pregAdaptation = 10;
			child.anus = 0;
			child.skill.vaginal = 0;
			child.skill.penetrative = 0;
			child.skill.whoring = 0;
			child.skill.anal = 0;
			child.weight = random(-80, -50);
			child.muscles = 0;
			child.underArmHStyle = "bushy";
			child.pubicHStyle = "bushy";
			child.boobs = 100;
			child.boobShape = "perky";
			child.nipples = "tiny";
			child.lactation = 0;
			child.lactationDuration = 0;
			child.lactationAdaptation = 0;
			child.hips = -2;
			child.shoulders = -2;
			child.waist = 0;
			child.vaginaLube = 0;
			child.butt = 0;
			child.fetish = "none";
			child.fetishStrength = 0;
			child.sexualFlaw = "none";
			child.sexualQuirk = "none";
			child.bellySag = 0;
			child.bellySagPreg = 0;
			child.pubertyXX = 0;
			child.dick = 1;
			child.foreskin = 1;
			child.balls = 2;
			child.scrotum = 3;
			child.prostate = 1;
			child.actualAge = 3;
			child.visualAge = child.actualAge;
			child.physicalAge = child.actualAge;
			child.ovaryAge = child.actualAge;
			child.teeth = "baby";
		} else { /* girl*/
			child = generateRelatedSlave(mother, "daughter");
			child.origin = "$His mother offered $him to you as an incentive to take them in.";
			child.career = "homeless";
			child.slaveName = child.birthName;
			setHealth(child, jsRandom(10, 20));
			child.devotion -= 5;
			child.trust -= 5;
			child.oldDevotion = child.devotion;
			child.oldTrust = child.trust;
			child.anus = 0;
			child.skill.vaginal = 0;
			child.skill.penetrative = 0;
			child.skill.whoring = 0;
			child.skill.anal = 0;
			child.weight = random(-80, -50);
			child.muscles = 0;
			child.underArmHStyle = "bushy";
			child.pubicHStyle = "bushy";
			child.boobs = 100;
			child.boobShape = "perky";
			child.nipples = "tiny";
			child.hips = -2;
			child.shoulders = -2;
			child.waist = 0;
			child.butt = 0;
			child.fetish = "none";
			child.fetishStrength = 0;
			child.sexualFlaw = "none";
			child.sexualQuirk = "none";
			child.bellySag = 0;
			child.bellySagPreg = 0;
			child.pubertyXX = 0;
			child.vagina = 0;
			child.pregKnown = 0;
			child.pregAdaptation = 10;
			WombFlush(child);
			if (V.fertilityAge <= 3) {
				child.pubertyXX = 1;
				child.preg = 6;
				child.pregType = 1;
				child.pregKnown = 1;
				child.vagina = 1;
			}
			child.pregWeek = child.preg;
			SetBellySize(child);
			child.actualAge = 3;
			child.visualAge = child.actualAge;
			child.physicalAge = child.actualAge;
			child.ovaryAge = child.actualAge;
			child.teeth = "baby";
		}

		const {
			He, His,
			he, his, him, woman, loli, girl
		} = getPronouns(mother);
		const {
			He2,
			him2, his2, girl2
		} = getPronouns(child).appendSuffix("2");
		const {HeA} = getPronouns(assistant.pronouns().main).appendSuffix("A");

		let r = [];

		App.Events.addParagraph(node, [`You receive so many messages, as a noted titan of the new Free Cities world, that ${V.assistant.name} has to be quite draconian in culling them. ${HeA} lets only the most important through to you. One category of message that always gets through regardless of content, though, is requests for voluntary enslavement. As the new world takes shape, they've become less rare than they once were.`]);

		App.Events.addParagraph(node, r);
		r = [];
		r.push(`This call is coming from a public kiosk, which is usually an indication that the person on the other end is a transient individual who has decided to take slavery over homelessness. You aren't far off; the caller is a`);
		if (mother.actualAge >= 18) {
			r.push(`young ${woman}`);
		} else if (mother.actualAge >= 13) {
			r.push(`teen`);
		} else {
			r.push(`${loli}`);
		}
		r.push(
			`desperate for work, carrying a young child on ${his} shoulder, quadruplets on ${his} back and a large sack against ${his} middle, while looking absolutely exhausted.`,
			Spoken(mother, `"Please, would you happen to have any work for a desperate mother? I need to eat, and my babies are starting to go hungry... I tried whoring, but I got pregnant again..."`),
			`${He} struggles back to allow you to see ${his} full body. The object you thought was ${his} possessions is, in fact, ${his} massively distended stomach.`,
			Spoken(mother, `"I'm having so many and I don't know what to do anymore... I can't care for this many... Anything you can do for meeEEEEEE!"`),
			`${He} groans as an intense contraction hits ${him}.`,
			Spoken(mother, `"Oh god! Not now! Not like this! I'm not ready... Please, I'm giving birth right now... Forget work, I'll be your slave if you can help me..."`),
			`${He} begs, tears streaming down ${his} face as ${he} struggles to hold back the child threatening to slide into ${his} birth canal.`);
		if (V.minimumSlaveAge <= 3) {
			r.push(Spoken(mother, `"Please... My eldest is of age here... Help me and they'll be yours too! You'll help mommy, right sweetie?" The toddler nods to ${him}, unlikely to understand exactly what is going on.`));
		}
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`Enslaving ${him} will cost ${cashFormat(contractCost)}.`);
		if (V.minimumSlaveAge <= 3) {
			r.push(`Alternatively, for ${cashFormat(contractCost * 2)} you could enslave both mother and ${his} eldest child, the rest being sent to the slave orphanages.`);
		}
		App.Events.addParagraph(node, r);

		const newSlaves = [mother]; /* rushed videocall, no dossier */

		node.append(App.UI.MultipleInspect(newSlaves, true, "generic"));
		const choices = [];

		if (V.cash >= contractCost) {
			choices.push(new App.Events.Result(`Enslave the mother`, enslave, `This will cost ${cashFormat(contractCost)}`));
			if (V.minimumSlaveAge <= 3 && V.cash >= (contractCost * 2)) {
				choices.push(new App.Events.Result(`Accept ${his} offer`, both, `This will cost ${cashFormat(2 * contractCost)}`));
			}
		} else {
			choices.push(new App.Events.Result(null, null, `You lack the necessary funds to enslave ${him}.`));
		}
		App.Events.addResponses(node, choices);

		function enslave() {
			newSlave(mother);
			cashX(forceNeg(contractCost), "slaveTransfer", mother);
			startLabor(mother);
			return `You have the needy ${girl} immediately bought to your penthouse where you help ${his} laboring body into an available bed for inspection. ${He} asks where ${his} children were taken, to which you reply somewhere they can be raised properly. They'll be taken care of and won't have to grow up on the streets, plus they were sucking the life out of ${him}. ${He}'s a little depressed at the news, but understands your reasons. You take the opportunity to give ${him} a good look over; ${he} is really dilated! Apart from that, between all the births and dicks, ${his} vagina is rather worn out, though ${he} seems to understand how to use it. ${His} anus has also seen use, but not nearly as much.`;
		}

		function both() {
			const frag = new DocumentFragment();
			newSlave(mother);
			cashX(forceNeg(contractCost), "slaveTransfer", mother);
			newSlave(child);
			cashX(forceNeg(contractCost), "slaveTransfer", child);
			App.Events.addParagraph(frag, [`You have the needy ${girl} immediately bought to your penthouse where you help ${his} laboring body into an available bed for inspection. ${He} asks where ${his} other babies were taken, to which you reply somewhere they can be raised properly. They'll be taken care of and won't have to grow up on the streets, plus they were sucking the life out of ${him}. ${He}'s a little depressed at the news, but understands your reasons. You take the opportunity to give ${him} a good look over; ${he} is really dilated! Apart from that, between all the births and dicks, ${his} vagina is rather worn out, though ${he} seems to understand how to use it. ${His} anus has also seen use, but not nearly as much.`]);

			let r = [];
			r.push(`You turn to the child clutching ${his2} mother's grotesque belly. ${He2} is in better shape than ${his2} mother and tries to hide behind ${his} belly when you look at ${him2}. ${He2}'ll be broken into a good little ${girl2} for you soon enough.`);
			if (child.preg > 0) {
				r.push(`You notice ${his2} belly is slightly distended. It could be hunger, but upon closer inspection, you realize ${his2} hymen has been torn. ${He2}'s likely been servicing men alongside ${his2} mother and has a bun in the oven too.`);
			}
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
