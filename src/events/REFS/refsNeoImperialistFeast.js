App.Events.refsNeoImperialistFeast = class refsNeoImperialistFeast extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.arcologies[0].FSNeoImperialist > random(25, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0),
			() => V.arcologies[0].FSNeoImperialistLaw1 === 1,
			() => V.arcologies[0].FSNeoImperialistLaw2 === 1,
			() => V.policies.regularParties === 1
		];
	}

	execute(node) {
		const slave = GenerateNewSlave("XX", {minAge: 16, maxAge: 23, disableDisability: 1});
		slave.career = "a maid";
		slave.devotion = random(-20, 20);
		slave.trust = random(-30, 20);
		slave.face = random(25, 100);
		slave.boobs = either(100, 200, 300);
		slave.vagina = 0;
		slave.ovaries = 1;
		slave.preg = -1;
		slave.pubicHStyle = "waxed";
		slave.underArmHStyle = "waxed";
		slave.hips = 0;
		slave.butt = random(1, 2);
		slave.dick = 0;
		slave.foreskin = 0;
		slave.balls = 0;
		slave.anus = 0;
		slave.weight = 0;
		slave.intelligence = random(15, 100);
		slave.skill.entertainment = 45;
		slave.skill.penetrative = 0;
		slave.skill.anal = 0;
		slave.skill.oral = 0;
		slave.skill.whoring = 0;
		slave.canRecruit = 0;
		setHealth(slave, jsRandom(30, 60), 0, 0, 0, 0);

		App.Events.drawEventArt(node, slave);

		App.Events.addParagraph(node, [`Although you regularly host casual parties in ${V.arcologies[0].name}, the demands of the elite nobility, those chosen few who stand above even your millionaires and societal elites, can be truly extravagant. Every once in a while, instead of a simple, classy party, they clamor for something more – a proper feast. As the Emperor of the arcology, it falls to you to organize such an event, and plan it to satisfy even the ravenous appetites of your ever-hungry Barons.`]);

		App.Events.addParagraph(node, [`Planning a genuine feast is no small task. Unlike your typical parties, which can be as simple as preparing food and drinks served by your own slavegirls, this celebration almost by necessity must be an enormous blowout. The Barons will come expecting delicacies from around the world, enough alcohol to get all of them drunk ten times over, foreign slaves and entertainment for the night, and a truly decadent level of indulgence, one befitting of an assembly of rulers. The greatest celebrations can go on for full days at a time, stopped only to sleep before returning to the festivities. Although such lavishness can be crushingly expensive, the best feasts are more than just the best time anyone can have in the Free Cities – they're also calendar events remembered for years to come.`]);

		const enormousCash = 20000;
		const moderateCash = 5000;
		const choices = [];
		if (V.cash >= enormousCash) {
			choices.push(new App.Events.Result(`Plan an absolutely enormous celebration`, enormous, cashFormat(enormousCash)));
		}
		if (V.cash >= moderateCash) {
			choices.push(new App.Events.Result(`Plan a moderate feast`, moderate, cashFormat(moderateCash)));
		}

		choices.push(new App.Events.Result(`No feast this year`, refuse));

		App.Events.addResponses(node, choices);

		function enormous() {
			repX(5000, "event");
			V.arcologies[0].prosperity -= 1;
			cashX(-enormousCash, "event");
			return `The feast you organize would put Norse raiders and ancient Kings alike to shame; you <span class="cash dec">spend more money</span> in the first few days of planning than most of them would have ever seen in their lives. The Barons arrive at your penthouse on time and are immediately mystified by the overwhelming variety of foods put out on your eloquent tables, served by stunning girls in thin silks that barely conceal their perfect bodies. Entertainers of every stripe lead around flaming swords and well-trained lions, transforming your penthouse into a temporary circus of debauchery and hedonism; there are so many that you can't even remember all those you hired, and every room contains a new wonder or waiting beauty. You deliver a short speech to the Barons, Knights, and other elite you've granted the honor of attending, welcoming the lot to your home; one of your Barons claps loudly the moment you finish and <span class="reputation inc">shouts your name</span> in celebration, which is quickly taken up by the rest of the room. From then on, the next few days are an absolute blur of sex, drink, drugs and food, casting aside all worries and indulging alongside the wealthiest of your arcology in a true display of ultra-hedonism. The hours blend into days of the endless celebration you've organized, until, finally, the Barons and Knights begin to shuffle out in a drunken, exhausted haze, leaving behind a trail of bones and knocked-up slavegirls. No one, yourself included, seems to be able to remember exactly what happened during those days of wild celebration, but everyone agrees that it was <span class="prosperity inc">one of the greatest parties ever held in the Free Cities.</span>`;
		}

		function moderate() {
			cashX(-moderateCash, "event");
			repX(2000, "event");
			return `There's no special cause for celebration this time around, but that doesn't mean you can't have a great time. You lay out platters of expensive food and drink, served by gorgeous maids, for the arriving Barons and Knights, who seem universally pleased to have an opportunity to forget the troubles of rulership and power for a day – not that that's particularly difficult in the Free Cities, anyway. Among the roaring company of ${V.arcologies[0].name}'s wealthiest and most influential citizens, you tear into fresh-cooked meats and the rounded asses of the servants alike, in a glorious celebration where nothing and no one is off-limits. At the end of the evening, when the crowd has finally had their fill and you've fucked and drunk enough that you can barely stand to wave them goodbye, nearly each and every Baron leaves the celebration with a <span class="reputation inc">stupid, drunken smile across their face.</span>`;
		}

		function refuse() {
			repX(-2000, "event");
			return `You somberly announce that there'll be no feast this time around, despite the mutterings of your Barons. Unsurprisingly, the pompous nobles are <span class="reputation dec">deeply frustrated</span> with the lack of a feast, and spend the next few weeks snarkily reminding you about your failure to provide a celebration worthy of your title. At least your treasury isn't forced to bear the burden of another feast for now.`;
		}
	}
};
