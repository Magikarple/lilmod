App.EndWeek.corporationDevelopments = function() {
	const el = document.createElement("p");
	let r;
	/* Main Corporation Pass*/

	if (App.Corporate.getStored("Cash") < 0) {
		App.Corporate.setStored("Cash", Math.trunc(Math.trunc(App.Corporate.getStored("Cash") * 1.02))); /* 2% weekly interest rate on negative cash*/
	}
	App.UI.DOM.appendNewElement("h1", el, "Corporation Management");
	App.UI.DOM.appendNewElement("h2", el, "Operational Results");
	/* Divisions doing their thing*/
	const weekLedger = App.Corporate.endWeek();
	for (const i in weekLedger.divisionLedgers) {
		const d = weekLedger.divisionLedgers[i];
		const division = d.division;
		let r;
		/* Reporting on number of slaves being processed or completed processing */
		App.UI.DOM.appendNewElement("h3", el, division.name);
		App.Events.addNode(el, [`The division ${division.message_endWeek_Slaves(d)}`], "div");

		r = [];
		if (d.market.originalBuy != null) {
			if (d.market.buy === 0) {
				r.push(`It couldn't purchase ${numberWithPlural(d.market.originalBuy, "slave")} to replenish its stock from the market because it couldn't afford to purchase price.`);
			} else {
				r.push(`It needed to replenish its slave stock of ${numberWithPlural(d.market.originalBuy, "slave")}, but couldn't afford to buy all of them. It bought ${numberWithPlural(d.market.buy, division.nounSlaveFromMarket)} for ${cashFormatColor(d.market.finalPurchase, true)}.`);
			}
		} else if (d.market.buy > 0) {
			r.push(`It replenished its slave stock and bought ${numberWithPlural(d.market.buy, division.nounSlaveFromMarket)} from the market for ${cashFormatColor(d.market.finalPurchase, true)}.`);
		}
		App.Events.addNode(el, r, "div");

		if (d.transfer.total > 0) {
			for (const i in d.transfer.divisions) {
				const nextDivLedger = d.transfer.divisions[i];
				const nextDiv = nextDivLedger.division;
				const slavesToNext = nextDivLedger.fill;
				App.Events.addNode(el, [`It moved ${numberWithPlural(slavesToNext, "slave")} to the ${nextDiv.name} Division.`], "div");
			}
		}
		if (division.toMarket) {
			r = [];
			if (division.heldSlaves === 0) {
				if (d.market.sell > 0) {
					r.push(`It immediately sold ${numberWithPlural(d.market.sell, division.nounFinishedSlave)} to the market and made ${cashFormatColor(d.market.finalSale)}.`);
				}
			} else {
				r.push(`It holds <span class="positive">${numberWithPlural(division.heldSlaves, division.nounFinishedSlave)}</span> at the end of the`);
				if (d.market.sell > 0) {
					r.push(`week, but it ran out of storage space and had to sell <span class="red">${numberWithPlural(d.market.sell, "slave")}</span> and made ${cashFormatColor(d.market.finalSale)}.`);
				} else {
					r.push(`week.`);
				}
			}
			App.Events.addNode(el, r, "div");
		}
		if (d.revenue.value > 0) {
			App.Events.addNode(el, [`It earned ${cashFormatColor(d.revenue.value)} in revenue.`], "div");
		}
	}

	/* Aggregate Corporation Results*/
	el.append(App.Corporate.writeLedger(App.Corporate.ledger.current, V.week));

	/* Division Expansion Tokens*/
	if (weekLedger.canExpandNow) {
		App.UI.DOM.appendNewElement("div", el, "Your corporation is ready to start an additional division!", "majorText");
	}

	/* Specializations tokens*/
	if (weekLedger.canSpecializeNow) {
		App.UI.DOM.appendNewElement("div", el, "Your corporation is ready to specialize its slaves further!", "majorText");
	}

	/* Calculating cash set aside for dividend*/
	App.UI.DOM.appendNewElement("h2", el, "Dividend");
	r = [];
	if (V.dividendRatio > 0) {
		r.push(`The corporation is currently reserving ${Math.floor(V.dividendRatio * 100)}% of its profit to be paid out as dividends.`);
	} else {
		r.push(`The corporation is currently not reserving a portion of its profit to be paid out as dividends.`);
	}
	if (App.Corporate.getStored("CashDividend") === 1) {
		r.push(`It is putting aside unused cash reserves to be paid out as dividends.`);
	}
	App.Events.addNode(el, r, "div");

	if (App.Corporate.getStored("Dividend") > 0) {
		r = [];
		if (weekLedger.hasDividend) {
			r.push(`It reserved ${cashFormatColor(weekLedger.dividend)} this week.`);
		}
		r.push(`A total of ${cashFormatColor(App.Corporate.getStored("Dividend"))} has been put aside for its shareholders.`);
		App.Events.addNode(el, r, "div");
	}

	if (weekLedger.hasPayout) {
		App.Events.addNode(el, [`This week the dividends were paid out, you received ${cashFormatColor(weekLedger.payout)}.`], "div");
	}

	/* Bankrupted the Corporation*/
	if (App.Corporate.calculateValue() < 0) {
		App.Corporate.dissolve();
		App.UI.DOM.appendNewElement("div", el, "Your corporation went bankrupt.", "red");
	}
	/* This needs to be at the very end of the financials*/
	App.Corporate.ledger.swap();
	return el;
};
