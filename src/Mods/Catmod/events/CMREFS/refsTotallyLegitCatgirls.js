App.Events.refsTotallyLegitCatgirls = class refsTotallyLegitCatgirls extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.projectN.public === 1,
			() => !!V.seeCats, // TODO: was not hooked up in TW, what else should gate be? Project N something?
		];
	}

	execute(node) {
		const slave = GenerateNewSlave("XX", {minAge: 16, maxAge: 24});
		slave.origin = "You purchased $him from a reputable street merchant selling you completely legitimate catgirls.";
		slave.tailShape = "cat";
		slave.tailColor = slave.hColor;
		slave.collar = "uncomfortable leather";
		slave.clothes = "kitty lingerie";
		setHealth(slave, jsRandom(30, 60), 0, 0, 0, 0);

		App.Events.drawEventArt(node, slave);

		App.Events.addParagraph(node, [`The novelty of catgirls is still very much present in the marketplaces of your arcology. Across the stands, you see magazines proudly advertising new transformative trends, featuring ways to graft on cat ears or 'home-engineer' catgirls with stripped-down versions of the Project N technologies, and various gear and equipment tailored towards catlike slave bodies, mostly for people who can't afford one.`]);

		App.Events.addParagraph(node, [`Of course, part of this enduring trend is the fact that catgirls are so exclusive, with the Project N tech so expensive and difficult to employ and generally requiring hundreds of thousands of credits worth of equipment and trained scientific teams. That's why it perks your attention when you notice one market vendor selling, as it says on the shop's outer sign, "DISCOUNT CATGIRLS".`]);

		App.Events.addParagraph(node, [`The second you step inside a lanky man with slick black hair practically intercepts you with greetings and praise, nearly blocking your path and stopping you from getting a good look at the cages behind him. But even with the slick salesman in your way, you can tell that these are pretty obviously just normal women with surgical alternations to make them look vaguely like catgirls, although you can't imagine anyone other than a total idiot would be fooled considering none of them have fur or actual cat ears.`]);

		App.Events.addParagraph(node, [`"For you, a special price of just two thousand credits! What a steal! Normally, catgirls cost six, seven, twenty times that price! But I'm sure you of all people know that, no? Haha..."`]);


		const cash = 2000;
		const choices = [];
		if (V.cash >= cash) {
			choices.push(new App.Events.Result(`Buy a "catgirl"`, buy, `Will cost ${cashFormat(cash)}`));
		}

		choices.push(new App.Events.Result(`Decline to purchase the obviously fake catgirls`, refuse));

		App.Events.addResponses(node, choices);

		function buy() {
			cashX(-cash, "slaveTransfer", slave);
			return [
				`You sigh and hand the merchant a few thousand credits. He seems overjoyed, if slightly shocked, to have actually made a sale on his 'discount' catgirls, but rushes over to the cages and leads out your new slave with an ear-to-ear smile. "Have fun with her!" He shouts out at you as you leave. The 'catgirl' adjusts her headband and attempts a very human sounding meow as you lead her out of the shop.`,
				App.UI.newSlaveIntro(slave)
			];
		}

		function refuse() {
			return `You ask the salesman if he thinks you're an idiot and tell him that these are clearly not legitimate catgirls. He smiles bashfully and shrugs his shoulder like a child being scolded. "Sure, sure, but they're still pretty good girls. And besides, it's something for all the people who can't afford a real one, right? Haha. So, anyway, you wanna buy one, or..?" You roll your eyes at the persistent salesman. He's still making pitches at you as you leave.`;
		}
	}
};
