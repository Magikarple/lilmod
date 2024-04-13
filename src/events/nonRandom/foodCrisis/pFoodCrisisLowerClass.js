App.Events.pFoodCrisisLowerClass = class pFoodCrisisLowerClass extends App.Events.BaseEvent {
	actorPrerequisites() {
		return [];
	}

	eventPrerequisites() {
		return [
			() => App.Events.effectiveWeek() >= 48,
			() => !!V.mods.food.enabled,
			() => !V.eventResults.foodCrisis,
		];
	}

	execute(node) {
		const discount = V.PC.skill.trading >= 50 && ["capitalist", "entrepreneur", "business kid"].includes(V.PC.career) || V.PC.skill.trading >= 100;
		const price = discount ? 7500 : 10000;

		App.Events.addParagraph(node, [`The region supplying much of the Free City's food had been battling a famine for quite some time now — between the deteriorating weather and the war raging on — but it had always seemed the situation was improving, and your arcology's citizens never really had to worry about going to bed hungry. Unfortunately, that all changed this week. A firefight had broken out near one of the region's largest farms, and one of the main reserves of food was caught in the crossfire.`]);
		App.Events.addParagraph(node, [`Supplies steadily began to dwindle, and it wasn't long before the prices of food began to rise as a result. ${V.arcologyUpgrade.hydro ? `Even the hydroponics system you had installed earlier could barely put a dent in the needs of your citizens.` : ``} Now, the poorest in your arcology are facing starvation. Seeing no other choice, they turned to you to provide them with sustenance. <span class="bold">This is a unique opportunity.</span> It's unlikely your citizens would ask for your help again, should you choose not to help them.`]);

		App.Events.addResponses(node, [
			new App.Events.Result(`Provide them with ample rations`, ample, `This will cost ${cashFormat(price * 2.5)} and ${discount ? `some upkeep, reduced by your knowledge of trading` : `will incur significant upkeep costs`}.`),
			new App.Events.Result(`Give them enough to survive on`, enough, `This will cost ${cashFormat(price * 1.5)} and ${discount ? `some upkeep, reduced by your knowledge of trading` : `will incur significant upkeep costs`}.`),
			new App.Events.Result(`They can figure their problem out on their own`, refuse)
		]);

		V.eventResults.foodCrisis = 1;	// don't repeat this event

		function ample() {
			V.mods.food.rations = 2;
			cashX(forceNeg(price * 2.5), "farmyard");
			repX(3500, "event");

			App.Events.queueEvent(2, new App.Events.pFoodCrisisMiddleClass());
			return `You have enough to go around, so you decide to help the desperate citizens. You have a number of rationing stations set up throughout ${V.arcologies[0].name} and announce that each citizen is entitled to four full meals a day, more than enough to sate the hunger of even the most famished of men. Your citizens are <span class="reputation inc">thrilled</span> to hear that their leader is looking out for them.`;
		}

		function enough() {
			V.mods.food.rations = 1;
			cashX(forceNeg(price * 1.5), "farmyard");
			repX(2000, "event");

			App.Events.queueEvent(2, new App.Events.pFoodCrisisMiddleClass());
			return `You have your own problems to deal with, but that doesn't mean you don't look out for your own. You have a number of rationing stations set up throughout ${V.arcologies[0].name} and announce that each citizen is entitled to two full meals a day, just enough for your citizens not to starve. Your citizens are <span class="reputation inc">happy</span> to hear that their leader is looking out for them.`;
		}

		function refuse() {
			V.mods.food.rations = 0;
			repX(-1500, "event");
			return `You have your own problems to deal with, and you simply can't afford to drop everything and solve theirs at the moment. That you can't take care of your arcology's citizen <span class="reputation dec">reflects poorly on you.</span>`;
		}
	}
};
