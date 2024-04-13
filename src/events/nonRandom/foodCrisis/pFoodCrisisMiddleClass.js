App.Events.pFoodCrisisMiddleClass = class pFoodCrisisMiddleClass extends App.Events.BaseEvent {
	actorPrerequisites() {
		return [];
	}

	eventPrerequisites() {
		return [];
	}

	execute(node) {
		const discount = V.PC.skill.trading >= 50 && ["capitalist", "entrepreneur", "business kid"].includes(V.PC.career) || V.PC.skill.trading >= 100;
		const price = discount ? 7500 : 10000;

		App.Events.addParagraph(node, [`It's been a few weeks since your citizens had approached you asking for aid, and since then, the situation hasn't improved. In fact, it had gotten worse, and food prices have reached a record high. The tension in ${V.arcologies[0].name} is palpable, and small riots have broken out more than once over disputes about food. You are not surprised, then, when you receive a visit from some more of your citizens – not the poor, but not wealthy either. They state that they noticed that you have been giving out rations to the poorer citizens, and, now that the situation has become dire, were wondering if you would be willing to do the same for them.`]);

		App.Events.addResponses(node, [
			new App.Events.Result(`Give them generous rations as well`, ample, `This will cost ${cashFormat(price * 2)} and ${discount ? `some upkeep, reduced by your knowledge of trading` : `will incur significant upkeep costs`}.`),
			new App.Events.Result(`Give them enough to survive on`, enough, `This will cost ${cashFormat(price)} and ${discount ? `some upkeep, reduced by your knowledge of trading` : `will incur significant upkeep costs`}.`),
			new App.Events.Result(`Change your mind about giving out any rations at all`, refuse)
		]);

		function ample() {
			V.mods.food.rations = 4;
			cashX(forceNeg(price * 2), "farmyard");
			repX(3000, "event");

			App.Events.queueEvent(2, new App.Events.pFoodCrisisUpperClass());
			return `You still have more than enough to go around, so you inform the leaders that you have decided you will give them large rations, enough to feed even the hungriest citizen. The leaders are <span class="reputation inc">very pleased</span> to hear that you are taking care of them as well.`;
		}

		function enough() {
			V.mods.food.rations = 3;
			cashX(forceNeg(price), "farmyard");
			repX(1500, "event");

			App.Events.queueEvent(2, new App.Events.pFoodCrisisUpperClass());
			return `As much as you'd like to provide them with all of the food in the world, it simply is not feasible in your current situation. Therefore, you announce to the leaders that you will provide them only enough rations to live off of. The leaders understand, and are <span class="reputation inc">pleased</span> to hear that you would provide for them at all.`;
		}

		function refuse() {
			V.mods.food.rations = 0;
			repX(-1500, "event");
			return `Having given the people rations at all was a mistake, you think to yourself. You have a great number of your own problems to deal with, and providing rations to everyone that can't afford food is putting an unnecessary strain on your own situation. With this is mind, you tell the leaders that you simply can't help them at this time, and have decided that you can't help anyone with food at all. The citizens are understandably <span class="reputation dec">angry</span> that you would go back on your word.`;
		}
	}
};
