/**
 *
 * @param {FC.SlaveMarketName} slaveMarket
 * @param {object} [param1]
 * @param {string} [param1.sTitleSingular]
 * @param {string} [param1.sTitlePlural]
 * @param {Array<{factor: number, reason:string}>} [param1.modifiers]
 */
App.Markets.purchaseFramework = function(slaveMarket, {sTitleSingular = "slave", sTitlePlural = "slaves", modifiers = []} = {}) {
	const el = new DocumentFragment();
	const {slave, text} = generateMarketSlave(slaveMarket, (V.market.numArcology || 1));
	const {He, him, his} = getPronouns(slave);
	let prisonCrime = "";
	if (slaveMarket === V.prisonCircuit[V.prisonCircuitIndex]) {
		prisonCrime = `${He} ${pronounsForSlaveProp(slave, text)}`;
	} else {
		$(el).append(` ${text}`);
	}

	const applyLaw = applyLawCheck(slaveMarket);
	const complianceResult = applyLaw ? App.Desc.lawCompliance(slave, slaveMarket) : ``;
	const limitReached = V.slavesSeen > V.slaveMarketLimit;
	if (limitReached) {
		modifiers.push({factor: (V.slavesSeen - V.slaveMarketLimit) * 0.1, reason: "market reach exceeded"});
	}
	const {cost, report} = slaveCost(slave, false, applyLaw, false, true, modifiers);

	App.Events.addParagraph(el, [
		`The offered price is`, App.UI.DOM.combineNodes(report, "."),
		limitReached ? `You have cast such a wide net for slaves this week that it is becoming more expensive to find more for sale. Your reputation helps determine your reach within the slave market.` : ``
	]);

	el.append(choices());
	return el;

	function interruptImageGeneration() {
		if (V.seeImages === 1 && !V.seeCustomImagesOnly && V.imageChoice === 6) {
			App.Art.GenAI.sdQueue.interrupt();
		}
	}

	function choices() {
		const el = document.createElement("p");
		let title = {};
		V.slavesSeen++;
		if (sTitleSingular === "prisoner") {
			title = {
				decline: `Inspect a different prisoner`,
				buyAndKeepShopping: `Buy ${him} and check out other available ${sTitlePlural}`,
				buyJustHer: `Enslave ${him}`,
				buyHerAndFinish: `Enslave ${him} and finish your inspection`,
				finish: `Finish your enslavement of prisoners`
			};
		} else {
			title = {
				decline: `Decline to purchase ${him} and check out another ${sTitleSingular}`,
				buyAndKeepShopping: `Buy ${him} and check out other ${sTitlePlural} to order`,
				buyJustHer: `Buy ${his} slave contract`,
				buyHerAndFinish: `Buy ${him} and finish your order of slaves`,
				finish: `Finish your order of slaves`
			};
		}

		App.UI.DOM.appendNewElement(
			"div",
			el,
			App.UI.DOM.link(
				title.decline,
				() => {
					interruptImageGeneration();
					jQuery("#slave-markets").empty().append(App.Markets[slaveMarket]);
				},
			)
		);
		if (V.cash >= cost) {
			App.UI.DOM.appendNewElement(
				"div",
				el,
				App.UI.DOM.link(
					title.buyAndKeepShopping,
					() => {
						interruptImageGeneration();
						cashX(forceNeg(cost), "slaveTransfer", slave);
						V.market.totalCost += cost;
						V.market.newSlaves.push(slave);
						V.market.introType = "multi";
						student();
						jQuery("#slave-markets").empty().append(App.Markets[slaveMarket]);
						V.nextLink = "Bulk Slave Intro";
						V.nextButton = "Continue";
						V.returnTo = "Main";
						App.Utils.updateUserButton();
					},
				)
			);
			if (V.market.newSlaves.length === 0) {
				App.UI.DOM.appendNewElement(
					"div",
					el,
					App.UI.DOM.link(
						title.buyJustHer,
						() => {
							interruptImageGeneration();
							cashX(forceNeg(cost), "slaveTransfer", slave);
							V.market.totalCost += cost;
							V.market.newSlaves.push(slave);
							V.nextButton = "Continue";
							V.returnTo = "Main";
							student();
							jQuery("#slave-markets").empty().append(
								App.Desc.longSlave(slave, {market: slaveMarket}),
								App.UI.newSlaveIntro(slave)
							);
						},
					)
				);
			} else {
				App.UI.DOM.appendNewElement(
					"div",
					el,
					App.UI.DOM.link(
						title.buyHerAndFinish,
						() => {
							student();
							cashX(forceNeg(cost), "slaveTransfer", slave);
							V.market.totalCost += cost;
							V.market.newSlaves.push(slave);
							V.returnTo = "Main";
						},
						[],
						"Bulk Slave Intro"
					)
				);
			}
		} else {
			App.UI.DOM.appendNewElement("span", el, `You lack the necessary funds to buy this slave.`, "note");
		}
		if (V.market.newSlaves.length > 0) {
			App.UI.DOM.appendNewElement(
				"div",
				el,
				App.UI.DOM.passageLink(
					title.finish,
					"Bulk Slave Intro",
				)
			);
		}

		el.append(App.Desc.longSlave(slave, {market: slaveMarket, marketText: prisonCrime || complianceResult}));
		return el;

		function student() {
			if (App.Data.misc.schools.has(slaveMarket)) {
				V[slaveMarket].schoolSale = 0;
				V[slaveMarket].studentsBought++;
			}
		}
	}
};

/** Construct the market global
 * @param {FC.SlaveMarketName | FC.SpecialMarketName} market
 */
App.Markets.Global = function(market) {
	/** @type {FC.SlaveMarketName | FC.SpecialMarketName} */
	this.slaveMarket = market;
	this.introType = "";
	/** @type {Array<FC.GingeredSlave>} */
	this.newSlaves = [];
	this.newSlaveIndex = 0;
	this.newSlavesDone = 0;
	this.numSlaves = 0;
	this.numArcology = 0;
	this.totalCost = 0;
	return this;
};

/**
 * User facing names for the markets
 * @param {FC.SlaveMarketName} market
 * @param {number} arcIndex
 */
App.Markets.marketName = function(market, arcIndex = 1) {
	if (App.Data.misc.schools.has(market)) {
		return App.Data.misc.schools.get(market).title;
	} else {
		switch (market) {
			case "corporate":
				return `your corporation`;
			case "neighbor":
				return `${V.arcologies[arcIndex].name}`;
			case "kidnappers":
				return `the Kidnappers' Market`;
			case "indentures":
				return `the Indentures Market`;
			case "hunters":
				return `the Runaway Hunters' Market`;
			case "raiders":
				return `the Raiders' Market`;
			case "underage raiders":
				return `the Raiders' Black Market`;
			case "heap":
				return `the Flesh Heap as alive as when you purchased them.`;
			case "wetware":
				return `the Wetware CPU market`;
			case "trainers":
				return `the Trainers' Market`;
			case "low tier criminals":
			case "gangs and smugglers":
			case "white collar":
			case "military prison":
			case "juvenile detention":
				return `the prisoner sale`;
			default:
				return `Someone messed up. ${market} is not known.`;
		}
	}
};
