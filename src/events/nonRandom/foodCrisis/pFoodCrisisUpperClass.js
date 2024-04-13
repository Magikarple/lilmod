App.Events.pFoodCrisisUpperClass = class pFoodCrisisUpperClass extends App.Events.BaseEvent {
	actorPrerequisites() {
		return [];
	}

	eventPrerequisites() {
		return [];
	}

	execute(node) {
		const discount = V.PC.skill.trading >= 50 && ["capitalist", "entrepreneur", "business kid"].includes(V.PC.career) || V.PC.skill.trading >= 100;
		const price = discount ? 7500 : 10000;

		App.Events.addParagraph(node, [`Another few weeks has passed since your last meeting with your citizens regarding rationing, and things have only deteriorated further since then. It was only a matter of time before the wealthier citizens of ${V.arcologies[0].name} paid you a visit one afternoon. While being able to afford food wasn't exactly difficult for them as of yet, they could read the writing on the wall, and knew it would only be a matter of time before the prices of food were so high that even they would be forced to beg for handouts.`]);
		App.Events.addParagraph(node, [`Seeing the progress you had made since taking control of the arcology, they decided their best course of action was to come to you with a proposition. They would allow you to take full control of the food supply in ${V.arcologies[0].name}, and in return you would keep them well-fed. <span class="bold">This is a unique opportunity.</span> If you turn their offer down, the citizens of your arcology will find another way of surviving.`]);

		App.Events.addResponses(node, [
			new App.Events.Result(`Set up a food market`, foodMarket, `This will cost an initial investment of ${cashFormat(price * 15)}${discount ? `, reduced by your knowledge of trading` : ``}.`),
			new App.Events.Result(`Politely decline their offer, but continue giving them rations`, enough, `This will cost ${cashFormat(price)} and ${discount ? `some upkeep, reduced by your knowledge of trading` : `will incur significant upkeep costs`}.`),
			new App.Events.Result(`Turn down their offer and end rationing completely`, refuse),
		]);

		function foodMarket() {
			V.mods.food.market = true;
			V.mods.food.rations = 0;
			cashX(forceNeg(price * 15), "farmyard");
			repX(5000, "event");
			return `You know that a proposition like this wouldn't have been easy for your citizens to make, and you also know that there is no one better suited to a task like this than you. You announce that you will be setting up a market to buy, sell, and store food in, and that you'll make sure that the citizens will continue to be well-fed. Your citizens are <span class="reputation inc">glad</span> to hear that you are looking out for their best interests.`;
		}

		function enough() {
			V.mods.food.rations = 5;
			cashX(forceNeg(price), "farmyard");
			repX(1500, "event");
			return `Things have been going fairly well for you, but not <em>that</em> well — setting up an entirely new place to buy, sell, and store food would no doubt be an expensive undertaking. You tell the citizens that while you can't spare the resources to create a new market at the moment, you will honor your past agreement and continue giving them free rations. The people initially seem a bit disappointed that you don't seem to want to expand ${V.arcologies[0].name}, but are ultimately <span class="reputation inc">glad</span> to hear that you'll continue taking care of them.`;
		}

		function refuse() {
			V.mods.food.rations = 0;
			repX(-1500, "event");
			return `While a new place to buy, sell, and store food in ${V.arcologies[0].name} would most likely come in quite handy in the future, you ultimately decide that you simply cannot spare the resources required. In fact, giving rations at all was a costly venture, and after not having seen any sort of return-on-investment, you decide that you are unable to continue giving out rations anymore. Your citizens are <span class="reputation dec">angry</span> at the fact that you seem not to care about them at all, but that's their problem.`;
		}
	}
};
