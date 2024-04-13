/**
 * Displays the Market, where you can select individual slave markets to shop at.
 * @returns {Node}
 */

App.UI.buySlaves = function() {
	const el = new DocumentFragment();
	const minCost = minimumSlaveCost();
	let linkArray;

	App.UI.DOM.appendNewElement("h1", el, "The Market");
	App.UI.DOM.appendNewElement("p", el, `There are many different organizations to purchase slaves from, but many of them are selective about their customers and will only sell to you if you are reputable. `, ["note"]);

	if (V.slaveCostFactor > 1.1) {
		App.UI.DOM.appendNewElement("div", el, `There is a bull market for slaves; the price of slaves is very high. `, ["yellow"]);
	} else if (V.slaveCostFactor > 1) {
		App.UI.DOM.appendNewElement("div", el, `The slave market is bullish; the price of slaves is high. `, ["yellow"]);
	} else if (V.slaveCostFactor < 0.9) {
		App.UI.DOM.appendNewElement("div", el, `There is a bear market for slaves; the price of slaves is very low. `, ["yellow"]);
	} else if (V.slaveCostFactor < 1) {
		App.UI.DOM.appendNewElement("div", el, `The slave market is bearish; the price of slaves is low. `, ["yellow"]);
	} else {
		App.UI.DOM.appendNewElement("div", el, `The slave market is stable; the price of slaves is average.`);
	}

	App.UI.DOM.appendNewElement("h2", el, "Sex Slave Purchase Options");

	// Cheap
	el.append(storeBlock(App.Data.Markets.low));

	// Neighbors
	App.UI.DOM.appendNewElement("h3", el, "Neighboring Arcologies");
	App.UI.DOM.appendNewElement("div", el, "The arcology's prosperity and culture will affect slaves who have lived there.", ["note"]);
	App.UI.DOM.appendNewElement("div", el, neighborsBlock());

	// Schools
	if (V.rep > 6000) {
		App.UI.DOM.appendNewElement("h3", el, "Slave Schools");
		App.UI.DOM.appendNewElement("div", el, "High prices; will be young and healthy.", ["note"]);
		el.append(storeBlock(App.Data.Markets.schools));
	} else {
		App.UI.DOM.appendNewElement("div", el, "You are not reputable enough to acquire fresh school slaves.");
	}

	// High end
	App.UI.DOM.appendNewElement("h3", el, "Special");
	el.append(storeBlock(App.Data.Markets.high));
	return el;

	function storeBlock(storeCategory) {
		const el = new DocumentFragment();

		for (const store of storeCategory) {
			el.append(storeFront(store));
		}

		return el;
	}

	function neighborsBlock() {
		const el = new DocumentFragment();
		for (let i = 0; i < V.arcologies.length; i++) {
			if (V.arcologies[i].direction !== 0) {
				linkArray = [];
				const linkUnit = document.createElement("span");
				linkUnit.append(
					App.UI.DOM.link(
						"Slaves from",
						() => {
							V.market = new App.Markets.Global("neighbor");
							V.market.numArcology = i;
							updateNav();
						},
						[],
						"Market"
					)
				);
				App.UI.DOM.appendNewElement("span", linkUnit, ` ${V.arcologies[i].name}`, ["bold"]);
				linkArray.push(linkUnit);
				if (V.cash > (minCost * 5)) {
					linkArray.push(
						App.UI.DOM.link(
							"x5",
							() => {
								V.market = new App.Markets.Global("neighbor");
								V.market.introType = "bulk";
								V.market.numSlaves = 5;
								V.market.numArcology = i;
								V.returnTo = "Buy Slaves";
							},
							[],
							"Bulk Slave Intro"
						)
					);
				}
				if (V.cash > (minCost * 10)) {
					linkArray.push(
						App.UI.DOM.link(
							"x10",
							() => {
								V.market = new App.Markets.Global("neighbor");
								V.market.introType = "bulk";
								V.market.numSlaves = 10;
								V.market.numArcology = i;
								V.returnTo = "Buy Slaves";
							},
							[],
							"Bulk Slave Intro"
						)
					);
				}
				App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray));
			}
		}
		return el;
	}

	/** *
	 * @param {market} store
	 * @returns {Node}
	 */
	function storeFront(store) {
		const el = document.createElement("div");

		// Check requirements
		const requirements = store.requirements;
		if (requirements === false) {
			return el;
		} else if (typeof requirements === "string") {
			el.append(requirements);
			return el;
		}
		if (!App.Markets[store.marketType] && V.debugMode) {
			App.UI.DOM.appendNewElement("span", el, "marketType not set up", ["red"]);
		}

		const linkArray = [];
		linkArray.push(
			App.UI.DOM.link(
				store.title,
				() => {
					V.market = new App.Markets.Global(store.marketType);
					updateNav(store);
				},
				[],
				"Market"
			)
		);
		if (store.bulkAvailable !== false) {
			if (V.cash > (minCost * 5)) {
				linkArray.push(
					App.UI.DOM.link(
						`x5`,
						() => {
							V.market = new App.Markets.Global(store.marketType);
							V.market.introType = "bulk";
							V.market.numSlaves = 5;
							V.returnTo = "Buy Slaves";
						},
						[],
						`Bulk Slave Intro`
					)
				);
			}
			if (V.cash > (minCost * 10)) {
				linkArray.push(
					App.UI.DOM.link(
						`x10`,
						() => {
							V.market = new App.Markets.Global(store.marketType);
							V.market.introType = "bulk";
							V.market.numSlaves = 10;
							V.returnTo = "Buy Slaves";
						},
						[],
						`Bulk Slave Intro`
					)
				);
			}
		}

		el.append(App.UI.DOM.generateLinksStrip(linkArray));

		if (store.sale) {
			el.append(` ${store.sale}`);
		}

		if (store.note) {
			App.UI.DOM.appendNewElement("span", el, ` ${store.note}`, ["note"]);
		}
		if (App.Data.misc.schools.has(store.marketType)) {
			if (V[store.marketType].schoolSale === 1) {
				App.UI.DOM.appendNewElement("span", el, `Offering your first purchase at half price this week. `, ["yellow"]);
			}
		}
		return el;
	}

	/** @param {market} [store] */
	function updateNav(store) {
		// Sidebar
		V.nextButton = "Back";
		V.nextLink = "Buy Slaves";
		V.returnTo = "Buy Slaves";
		App.UI.StoryCaption.encyclopedia = store && store.encyclopedia ? store.encyclopedia : "Obtaining Slaves";
		// Multi-Purchase Support
		if (V.market.newSlaves.length > 0) {
			V.nextButton = "Continue";
			V.nextLink = "Bulk Slave Intro";
			V.returnTo = "Main";
		}
	}
};
