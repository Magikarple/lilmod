/**
 * Returns a block that describes an overview of the slave's impact on your reputation and finances in the short term
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
globalThis.slaveExpenses = function(slave) {
	const frag = new DocumentFragment();
	let div;

	// Generate the lines of the report
	for (const line of getSlaveCostArray(slave)) {
		div = document.createElement("div");
		div.classList.add("indent");
		App.UI.DOM.appendNewElement("span", div, `${line.text}: `);
		App.UI.DOM.appendNewElement("span", div, cashFormat(line.value), "cash");
		frag.append(div);
	}

	// Total expenses
	const individualCosts = getSlaveCost(slave);
	div = document.createElement("div");
	div.classList.add("double-indent");

	App.UI.DOM.appendNewElement("span", div, "Predicted expense", "underline");
	div.append(": ");
	div.append(App.UI.DOM.cashFormat(-individualCosts));
	frag.append(div);

	// Income from last week vs expense gives net, assistant gated
	if (V.assistant.power > 0) {
		if (slave.lastWeeksCashIncome > 0) {
			div = document.createElement("div");
			div.classList.add("indent");
			App.UI.DOM.appendNewElement("span", div, `Income: `);
			div.append(App.UI.DOM.cashFormat(slave.lastWeeksCashIncome));
			frag.append(div);

			div = document.createElement("div");
			div.classList.add("double-indent");
			App.UI.DOM.appendNewElement("span", div, `Total`, "underline");
			App.UI.DOM.appendNewElement("span", div, `: `);
			div.append(App.UI.DOM.cashFormat(slave.lastWeeksCashIncome - individualCosts));
			frag.append(div);
		}
	}
	frag.append(slaveImpactLongTerm(slave));

	return frag;
};

/**
 * Returns a block that describes an overview of the slave's impact on your reputation and finances over the long term
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
globalThis.slaveImpactLongTerm = function(slave) {
	const frag = new DocumentFragment();
	const {he, his, him} = getPronouns(slave);
	let p;
	let div;
	let span;
	let cost;
	let expense;
	let income;
	let text;

	// Background and original cost
	if (slave.origin !== "") {
		App.UI.DOM.appendNewElement("div", frag, pronounsForSlaveProp(slave, slave.origin), "indent");
	}
	div = document.createElement("div");
	div.classList.add("indent");
	if (slave.slaveCost < 0) {
		const costSpan = App.UI.DOM.cashFormat(slave.slaveCost);
		costSpan.textContent += `.`;
		div.append(`You bought ${him} for `, costSpan);
		cost = slave.slaveCost;
	} else if (slave.slaveCost === 0) {
		div.append(`You spent nothing to acquire ${him}.`);
		cost = slave.slaveCost;
	} else {
		text = `You have no record of how much `;
		if (slave.origin !== "") {
			text += `this`;
		} else {
			text += `${he} originally`;
		}
		text += ` cost.`;
		div.append(text);
		cost = 0;
	}
	frag.append(div);

	// Lifetime totals, assistant gated
	if (V.assistant.power > 0) {
		const weeksOwned = V.week - Math.max(0, slave.weekAcquired);
		// Lifetime expense
		div = document.createElement("div");
		div.classList.add("indent");
		if (slave.lifetimeCashExpenses < 0) {
			text = `In ${his} `;
			if (weeksOwned > 0) {
				if (weeksOwned === 1) {
					text += `week`;
				} else {
					text += `${weeksOwned} weeks`;
				}
			} else {
				text += `time`;
			}
			// Time spent as your agent in another arcology will not be accounted for here.
			text += ` with you in the arcology, ${he} has cost `;
			const cash = (App.UI.DOM.cashFormat(slave.lifetimeCashExpenses));
			cash.textContent += `.`;
			div.append(text, cash);
			expense = slave.lifetimeCashExpenses;
		} else {
			div.append(`You have no record of ${him} costing you any ¤.`);
			expense = 0;
		}
		frag.append(div);

		// Lifetime income
		div = document.createElement("div");
		div.classList.add("indent");
		if (slave.lifetimeCashIncome > 0) {
			text = `In ${his} `;
			if (weeksOwned > 0) {
				if (weeksOwned === 1) {
					text += `week`;
				} else {
					text += `${weeksOwned} weeks`;
				}
			} else {
				text += `time`;
			}
			// Time spent as your agent in another arcology will not be accounted for here.
			text += ` with you in the arcology, ${he} has earned `;
			const cash = App.UI.DOM.cashFormat(slave.lifetimeCashIncome);
			cash.textContent += `.`;
			div.append(text, cash);
			income = slave.lifetimeCashIncome;
		} else {
			div.append(`You have no record of ${him} making you any ¤.`);
			income = 0;
		}
		frag.append(div);

		// Lifetime total
		div = document.createElement("div");
		div.classList.add("indent");
		div.append(`Overall, `);
		if ((income + cost + expense) > 0) {
			div.append(`you have made `);
			div.append(App.UI.DOM.cashFormat(income + cost + expense));
			div.append(` net from ${his} labors.`);
		} else if ((income + cost + expense) === 0) {
			div.append(`${he} is even in cost and income.`);
		} else {
			div.append(`${he} has cost you `);
			const cash = App.UI.DOM.cashFormat(income + cost + expense);
			cash.textContent += `.`;
			div.append(cash);
		}
		frag.append(div);

		// Reputation:
		p = document.createElement("p");
		if (slave.lifetimeRepIncome !== 0 || slave.lifetimeRepExpenses !== 0) {
			let repTotal = (slave.lifetimeRepIncome + slave.lifetimeRepExpenses);
			if (V.cheatMode === 1 || V.debugMode === 1) {
				if (slave.lifetimeRepIncome !== 0) {
					div = document.createElement("div");
					div.classList.add("indent");
					div.append(`This week ${he} has `);
					if (slave.lastWeeksRepIncome === 0) {
						div.append(`had no positive effect on your reputation, but `);
					} else {
						div.append(`improved your reputation by `);
						App.UI.DOM.appendNewElement("span", div, num(slave.lastWeeksRepIncome), "green");
						div.append(` and `);
					}
					div.append(`over ${his} entire time with you, ${he} gained `);
					App.UI.DOM.appendNewElement("span", div, `${num(slave.lifetimeRepIncome)}.`, "green");
					p.append(div);
				}

				if (slave.lifetimeRepExpenses !== 0) {
					div = document.createElement("div");
					div.classList.add("indent");
					div.append(`This week ${he} has `);
					if (slave.lastWeeksRepExpenses === 0) {
						div.append(`had no negative effect on your reputation, but `);
					} else {
						div.append(`lowered your reputation by `);
						App.UI.DOM.appendNewElement("span", div, slave.lastWeeksRepExpenses.toString(), "red");
						div.append(` and `);
					}
					div.append(`over ${his} entire time with you, ${he} cost `);
					App.UI.DOM.appendNewElement("span", div, `${slave.lifetimeRepExpenses}.`, "red");
					p.append(div);
				}

				div = document.createElement("div");
				div.classList.add("indent");
				div.append(`Overall then, ${he} has changed your reputation by `);
				span = document.createElement("span");
				if (repTotal > 0) {
					span.classList.add("green");
				} else if (repTotal < 0) {
					span.classList.add("red");
				}
				span.append(num(repTotal));
				div.append(span);
				p.append(div);
			} else {
				/* lowercasedonkey: TODO: I don't like how vague my placeholder is. Probably need to set up some kind of sliding scale to describe how much rep (roughly) she has made or lost. Need to get a sense of common ranges. */
				div = document.createElement("div");
				div.classList.add("indent");
				div.append(`Overall, ${he} has `);
				if (repTotal === 0) {
					div.append(`had no impact on `);
				} else if (repTotal > 0) {
					App.UI.DOM.appendNewElement("span", div, `increased `, "green");
				} else if (repTotal < 0) {
					App.UI.DOM.appendNewElement("span", div, `decreased `, "red");
				}
				div.append(`your reputation.`);
				p.append(div);
			}
		}
		frag.append(p);
	}
	return frag;
};
