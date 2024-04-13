App.Update.mods = function(node) {
	food();

	function food() {
		App.Update.deleteProperties(V, ["farmyardFoodCost"]);

		App.Update.moveProperties(V.mods.food, V, {
			cost: "foodCost",
			amount: "food",
			lastWeek: "foodLastWeek",
			market: "foodMarket",
			produced: "foodProduced",
			rate: "foodRate",
			rations: "foodRations",
			total: "foodTotal",
			warned: "foodWarned"
		});

		V.mods.food.amount = Math.max(+V.mods.food.amount, 0) || 12500;
		V.mods.food.cost = Math.trunc(2500 / V.localEcon);
	}

	node.append(`Done!`);
};
