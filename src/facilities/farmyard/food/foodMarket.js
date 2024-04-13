App.UI.foodMarket = function() {
	const frag = new DocumentFragment();
	const quantities = new Set([1, 10, 100, 1000, 10000, 100000]);

	const maxFood = Math.trunc(V.cash / V.mods.food.cost);

	frag.append(
		overview(),
		buy(),
		// sell(),	// TODO: temporarily disabled for balancing
		remove(),
	);

	return frag;

	function overview() {
		const div = document.createElement("div");
		const text = new SpacedTextAccumulator(div);

		const consumption = App.Facilities.Farmyard.foodConsumption();
		const foodValue = Math.trunc(V.mods.food.amount * V.mods.food.cost);
		const citizens = V.lowerClass + V.middleClass + V.upperClass + V.topClass;

		if (V.useTabs === 0) {
			App.UI.DOM.appendNewElement("h2", div, "The Food Market");
		}

		text.push(`The food market has <span class="food">${massFormat(V.mods.food.amount)}</span> in storage, valued at a total of ${cashFormat(foodValue)}.`);

		if (V.mods.food.amount > consumption) {
			text.push(`This is enough to provide for ${numberWithPluralOne(V.slaves.length, `slave`)} and ${numberWithPluralOne(citizens, `citizen`)} for about ${years(Math.trunc(V.mods.food.amount / consumption))}.`);
		} else if (V.mods.food.amount < consumption) {
			text.push(`You will need an additional ${massFormat(consumption - V.mods.food.amount)} to provide for ${numberWithPluralOne(V.slaves.length, `slave`)} and ${numberWithPluralOne(citizens, `citizen`)} during the upcoming week.`);
		}

		text.toChildren();

		return div;
	}

	function buy() {
		const div = App.UI.DOM.makeElement("div", null, ['indent']);
		const links = [];

		div.append(`Buy `);

		for (const q of quantities) {
			links.push(App.UI.DOM.link(
				massFormat(q),
				() => {
					cashX(forceNeg(V.mods.food.cost * q), "farmyard");
					V.mods.food.amount += q;
					App.UI.reload();
				}
			));
		}
		links.push(App.UI.DOM.link(
			"max",
			() => {
				cashX(forceNeg(maxFood * V.mods.food.cost), "farmyard");
				V.mods.food.amount += maxFood;
				App.UI.reload();
			}
		));

		div.append(App.UI.DOM.generateLinksStrip(links));

		return div;
	}

	function sell() {
		const div = App.UI.DOM.makeElement("div", null, ['indent']);
		const links = [];

		div.append(`Sell `);

		if (V.mods.food.amount > 0) {
			for (const q of quantities) {
				links.push(App.UI.DOM.link(
					massFormat(q),
					() => {
						cashX(V.mods.food.cost * q, "farmyard");
						V.mods.food.amount -= q;
						App.UI.reload();
					}
				));
			}
			links.push(App.UI.DOM.link(
				"max",
				() => {
					cashX((V.mods.food.cost * V.mods.food.amount), "farmyard");
					V.mods.food.amount = 0;
					App.UI.reload();
				}
			));
		}

		div.append(App.UI.DOM.generateLinksStrip(links));

		return div;
	}

	function remove() {
		const div = document.createElement("div");

		div.append(
			`You can remove the food market entirely and let your citizens fend for themselves, if you wish.`,
			App.UI.DOM.makeElement("div", App.UI.DOM.link(`Dismantle`, () => {
				V.mods.food.market = false;
				repX(forceNeg(8500), "food");
				App.UI.reload();
			}, [], '', `Your citizens WILL hate you for this.`), ['indent']),
		);

		return div;
	}
};
