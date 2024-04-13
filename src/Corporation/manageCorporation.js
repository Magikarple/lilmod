App.Corporate.manage = function() {
	const wrapper = document.createElement("div");
	wrapper.append(structure());
	return wrapper;

	/**
	 * @returns {DocumentFragment}
	 */
	function structure() {
		const f = new DocumentFragment();

		if (App.Corporate.getStored("Incorporated") === 0) {
			f.append(foundingPage());
		} else {
			App.UI.DOM.appendNewElement("h1", f, `Corporation Overview`);
			App.UI.DOM.appendNewElement("h2", f,
				App.UI.DOM.link(V.corp.Name, () => {
					if (Dialog.isOpen()) {
						Dialog.close();
					}

					Dialog.setup("Rename");

					const frag = new DocumentFragment();

					frag.append(App.UI.DOM.makeTextBox(V.corp.Name, str => { V.corp.Name = str; App.UI.reload(); }));

					$(Dialog.body()).empty().append(frag);

					Dialog.open();
				}), ["white", "margin-bottom"]
			);

			if (App.Corporate.getStored("Founded")) {
				App.UI.DOM.appendNewElement("div", f, `Founded on ${asDateString(App.Corporate.getStored("Founded"))}.`, ["founding"]);
			}

			f.append(App.Corporate.writeLedger(App.Corporate.ledger.old, V.week - 1));

			f.append(divisionManagement());
			f.append(expansions());
			f.append(financials());
			f.append(specializations());
			f.append(dissolveLink());
		}

		return f;
	}

	function refresh() {
		App.UI.DOM.replace(wrapper, structure());
	}

	/**
	 * @returns {DocumentFragment}
	 */
	function foundingPage() {
		const el = new DocumentFragment();
		App.UI.DOM.appendNewElement("h1", el, "Incorporation");
		App.UI.DOM.appendNewElement("p", el, "Please consider that the market price of slaves has quite the impact on the profitability of your corporation. Focus on acquisition when prices are high, exploitation if prices are low. Slave improvement is a safe choice either way. Also note the option for a 8 - 7 share split instead of the vanilla 2 - 1, this makes the initial investment cheaper but leaves you with relatively less shares.", ["intro"]);

		const divisionsByFoundingCost = App.Corporate.divisionList.concat().sort(function(a, b) { return a.founding.startingPrice - b.founding.startingPrice; });
		const optionsText = ["to found a slave corporation", "for most options", "for many options", "for some options", "for the final option"];

		// Picking a starting division
		let personalShares = 8000;
		let publicShares = 7000;
		if (V.vanillaShareSplit === 1) {
			personalShares = 2000;
			publicShares = 1000;
		}

		for (let i = 0; i < divisionsByFoundingCost.length; i++) {
			const division = divisionsByFoundingCost[i];
			const divisionCost = App.Corporate.foundingCostToPlayer(division, personalShares, publicShares);
			if (V.cash >= divisionCost) {
				if (i === 0) {
					App.UI.DOM.appendNewElement("div", el, `You can lay the groundwork for a slave corporation and choose to start out with:`);
				}
				addDiv(el,
					App.UI.DOM.link(division.name, () => {
						App.Corporate.create(division.id, personalShares, publicShares);
						refresh();
					}),
					" (",
					App.UI.DOM.makeElement("span", cashFormat(divisionCost), ["cash"]),
					"): Focuses on ", division.focusDescription, "."
				);
			} else {
				const r = [];
				r.push("You lack the funds");
				r.push(optionsText[App.Utils.mapIndexBetweenLists(i, divisionsByFoundingCost, optionsText)] + ".");
				r.push(`You need at least`);
				r.push(App.UI.DOM.makeElement("span", cashFormat(divisionCost), ["cash"]));

				if (i !== 0) {
					if (i < divisionsByFoundingCost.length - 1) {
						r.push(`for the next option and at most`);
						r.push(App.UI.DOM.makeElement("span",
							cashFormat(App.Corporate.foundingCostToPlayer(
								divisionsByFoundingCost[divisionsByFoundingCost.length - 1],
								personalShares, publicShares)),
							["cash"]));
					} else {
						r.push(`for it.`);
					}
				}
				App.Events.addParagraph(el, r);
				break;
			}
		}

		const options = new App.UI.OptionsGroup().customRefresh(refresh);
		options.addOption("Share split", "vanillaShareSplit")
			.addValue("2-1", 1).addValue("8-7", 0);
		el.append(options.render());
		return el;
	}

	/**
	 * @returns {DocumentFragment}
	 */
	function divisionManagement() {
		const el = new DocumentFragment();
		App.UI.DOM.appendNewElement("h1", el, "Division Management");

		const tabBar = new App.UI.Tabs.TabBar("ManageDivisions");

		for (let division of App.Corporate.divisionList) {
			if (!division.founded) {
				continue;
			}
			const frag = new DocumentFragment();
			if (division.foundedDate !== 0) {
				App.UI.DOM.appendNewElement("div", frag, `Founded on ${asDateString(division.foundedDate)}.`, ["founding"]);
			}

			App.UI.DOM.appendNewElement("div", frag, `This division focuses on ${division.focusDescription}.`);

			let div = document.createElement("div");
			$(div).append(division.messageSlaveCount());
			frag.append(div);

			let divisionMaintenance = division.getDisplayMaintenanceCost();
			addDiv(frag, "It costs ",
				App.UI.DOM.makeElement("span", cashFormat(Math.trunc(divisionMaintenance.cost)), ["cash", "dec"]),
				" to run. On average that is ",
				App.UI.DOM.makeElement("span", cashFormat(Math.trunc(divisionMaintenance.perUnit)), ["cash", "dec"]),
				" per slave.");

			div = document.createElement("div");
			$(div).append(division.messageSlaveOutput());
			frag.append(div);

			let divSentenceStart = ["Currently the division", "It also"];
			App.UI.DOM.appendNewElement("h3", frag, "Direct Control");

			if (division.fromMarket) {
				addDiv(frag, `${divSentenceStart.shift()} is ${division.slaveAction.present} `,
					App.UI.DOM.makeElement("span", numberWithPlural(division.activeSlaves, "slave"), ["green"]));

				if (division.activeSlaves < division.developmentCount) {
					let fillSlaveCount = division.availableRoom;
					addDiv(frag, `There is room to ${division.slaveAction.future} ${numberWithPluralOne(fillSlaveCount, "more slave")}.`);

					let buySlaveArray = [
						{'name': 'Buy Slave', 'count': 1},
						{'name': 'Buy x10', 'count': 10}
					];

					if (!buySlaveArray.some(function(x) { return x.count === fillSlaveCount; })) {
						buySlaveArray.push({'name': 'Fill', 'count': fillSlaveCount});
					}
					let singleSlaveCost = App.Corporate.slaveMarketPurchaseValue(division, 1);
					if (V.corp.Cash > singleSlaveCost) {
						addDiv(frag, `The corporation can purchase slaves directly from the market for about `,
							cashFormatColor(singleSlaveCost), ".");

						const links = [];

						for (const slaveNum of buySlaveArray.filter(num => division.availableRoom >= num.count)) {
							let slaveSetCost = App.Corporate.slaveMarketPurchaseValue(division, slaveNum.count);
							if (V.corp.Cash < slaveSetCost) {
								continue;
							}
							links.push(App.UI.DOM.link(slaveNum.name, () => {
								App.Corporate.buySlaves(division.id, slaveNum.count);
								refresh();
							}));
						}
						frag.append(App.UI.DOM.generateLinksStrip(links));
					} else {
						addDiv(frag, App.UI.DOM.makeElement("span", "The corporation cannot afford to purchase any slaves from the market.", ["note"]), " It requires about ",
							App.UI.DOM.makeElement("span", cashFormat(singleSlaveCost), ["cash"]), ` to buy a ${asSingular(division.slaveAction.market)}.`);
					}
				} else {
					addDiv(frag, "There is ", App.UI.DOM.makeElement("em", "no room"), ` to ${division.slaveAction.future} more slaves.`);
				}
			}
			if (division.toMarket) {
				let finishedSlaveNoun = division.nounFinishedSlave;
				if (division.heldSlaves > 0) {
					addDiv(frag, `${divSentenceStart.shift()} holds `,
						App.UI.DOM.makeElement("span", numberWithPlural(division.heldSlaves, finishedSlaveNoun), ["green"]),
						".");
					for (const nextDiv of division.relatedDivisions.to
						.filter(div => div.availableRoom > 0 &&
							!App.Corporate.ownsIntermediaryDivision(division, div))) {
						addDiv(frag, `The ${nextDiv.name} Division can accept up to `, App.UI.DOM.makeElement("span", numberWithPlural(nextDiv.availableRoom, "slave"), "green"), ".");

						let sendSlaveArray = [
							{'name': 'Send Slave', 'count': 1},
							{'name': 'Send x10', 'count': 10}
						];
						if (division.heldSlaves >= nextDiv.availableRoom) {
							sendSlaveArray.push({
								'name': `Fill ${nextDiv.name} Division`,
								'count': nextDiv.availableRoom
							});
						} else {
							sendSlaveArray.push({'name': 'Send All', 'count': division.heldSlaves});
						}
						const links = [];
						for (const slaveNum of sendSlaveArray.filter(slaveNum => slaveNum.count <= nextDiv.availableRoom && slaveNum.count <= division.heldSlaves)) {
							links.push(App.UI.DOM.link(slaveNum.name, () => {
								App.Corporate.transferSlaves(division.id, nextDiv.id, slaveNum.count);
								refresh();
							}));
						}
						frag.append(App.UI.DOM.generateLinksStrip(links));
					}

					App.UI.DOM.appendNewElement("div", frag, "The corporation can sell these slaves to the market.");

					let sellSlaveArray = [
						{'name': 'Sell Slave', 'count': 1},
						{'name': 'Sell x10', 'count': 10},
						{'name': 'Sell x100', 'count': 100},
						{'name': 'Sell All', 'count': division.heldSlaves}
					];

					const links = [];
					for (const slaveNum of sellSlaveArray.filter(slaveNum => division.heldSlaves >= slaveNum.count)) {
						links.push(App.UI.DOM.link(slaveNum.name, () => {
							App.Corporate.sellSlaves(division.id, slaveNum.count);
							refresh();
						}));
					}
					frag.append(App.UI.DOM.generateLinksStrip(links));
				} else {
					App.UI.DOM.appendNewElement("div", frag, `The division is not holding any ${asPlural(finishedSlaveNoun)}.`);
				}
			}

			// Division size
			const links = [];

			/* Expanding the division*/
			let depExpandCost = division.sizeCost * 1000;
			addDiv(frag, "Expanding the division costs ", App.UI.DOM.makeElement("span", `${cashFormat(depExpandCost)}.`, ["cash", "dec"]), " Downsizing recoups 80% of the investment; slaves will be sold at the going rate.");

			let buyDevArray = [
				{'name': 'Expand Division', 'count': 1},
				{'name': 'Expand x10', 'count': 10}
			];

			for (const buySet of buyDevArray.filter(buySet => App.Corporate.getStored("Cash") >= buySet.count * depExpandCost)) {
				links.push(App.UI.DOM.link(buySet.name, () => {
					App.Corporate.buyDevelopment(division.id, buySet.count);
					refresh();
				}));
			}

			/* Downsize the division*/
			const sellDevArray = [
				{'name': 'Downsize Division', 'count': 1},
				{'name': 'Downsize x10', 'count': 10}
			];

			for (const sellSet of sellDevArray.filter(divNum => division.developmentCount > divNum.count)) {
				links.push(App.UI.DOM.link(sellSet.name, () => {
					App.Corporate.sellDevelopment(division.id, sellSet.count);
					refresh();
				}));
			}

			frag.append(App.UI.DOM.generateLinksStrip(links));

			App.UI.DOM.appendNewElement("h3", frag, "Rules");

			const options = new App.UI.OptionsGroup().customRefresh(refresh);
			for (const nextDiv of division.relatedDivisions.to
				.filter(nextDiv => nextDiv.founded && !App.Corporate.ownsIntermediaryDivision(division, nextDiv))) {
				// TODO: Originally this had a bit of flavor per nextDep. ie, Surgery said "to undergo surgery"
				const o = {send: division.getAutoSendToDivision(nextDiv)};
				options.addOption(`Auto send slaves to ${nextDiv.name} Division`, "send", o)
					.addValue("Enabled", true, () => {
						App.Corporate.setAutoSendToDivision(division.id, nextDiv.id, true);
						refresh();
					}).on()
					.addValue("Disabled", false, () => {
						App.Corporate.setAutoSendToDivision(division.id, nextDiv.id, false);
						refresh();
					}).off();
			}

			if (division.toMarket) {
				const o = {send: division.getAutoSendToMarket()};
				options.addOption("Auto send to market", "send", o)
					.addValue("Enabled", true, () => {
						App.Corporate.setAutoSendToMarket(division.id, 1);
						refresh();
					}).on()
					.addValue("Disabled", false, () => {
						App.Corporate.setAutoSendToMarket(division.id, 0);
						refresh();
					}).off();
			}

			if (division.fromMarket) {
				const o = {buy: division.getAutoBuyFromMarket()};
				options.addOption("Auto buy slaves from the market", "buy", o)
					.addValue("Enabled", true, () => {
						App.Corporate.setAutoBuyFromMarket(division.id, 1);
						refresh();
					}).on()
					.addValue("Disabled", false, () => {
						App.Corporate.setAutoBuyFromMarket(division.id, 0);
						refresh();
					}).off();
			}
			frag.append(options.render());

			if (App.Corporate.getStored("Div") > 1) {
				// Cannot dissolve the last division
				addDiv(frag,
					App.UI.DOM.link("Dissolve Division", () => {
						if (Dialog.isOpen()) {
							Dialog.close();
						}

						Dialog.setup("Dissolve Division");
						const frag = new DocumentFragment();
						App.UI.DOM.appendNewElement("p", frag, "Dissolving the division will destroy all of its assets!", ["note"]);
						App.UI.DOM.appendNewElement("p", frag, "This decision cannot be reverted!", ["warning", "note"]);
						frag.append(App.UI.DOM.link("Dissolve", () => {
							App.Corporate.divisions[division.id].dissolve();
							refresh();
							Dialog.close();
						}));
						$(Dialog.body()).empty().append(frag);
						Dialog.open();
					})
				);
			}
			tabBar.addTab(division.name, division.name.replace(/\s/g, ''), frag);
		}
		el.append(tabBar.render());
		return el;
	}

	/**
	 * @returns {DocumentFragment}
	 */
	function expansions() {
		const el = new DocumentFragment();
		const numDiv = App.Corporate.divisionList.filter(x => x.founded).length;
		App.UI.DOM.appendNewElement("h1", el, "Expansions");

		addDiv(el, `The corporation currently has ${numberWithPluralOne(numDiv, "division")}.`);

		if (numDiv === App.Corporate.divisionList.length) {
			addDiv(el, `All possible divisions have been found.`);
		} else if (App.Corporate.getStored("ExpandToken") === 1) {
			addDiv(el, `The corporation can expand by founding a new division related to its current ${onlyPlural(numDiv, "division")}.`);

			for (const division of App.Corporate.divisionList.filter(x => !x.founded && x.relatedDivisions.anyFounded)) {
				const depCost = division.foundingCost * 1000;

				if (App.Corporate.getStored("Cash") >= depCost) {
					addDiv(el,
						App.UI.DOM.link("Add " + division.name + " Division", () => {
							App.Corporate.divisions[division.id].create(App.Corporate);
							refresh();
						}),
						" (",
						App.UI.DOM.makeElement("span", cashFormat(depCost), ["cash"]),
						`): A division focusing on ${division.focusDescription}.`);
				} else {
					addDiv(el, `${division.name} (`,
						App.UI.DOM.makeElement("span", cashFormat(depCost), ["cash", "dec"]),
						`): The corporation cannot afford to start a division focusing on ${division.focusDescription}.`);
				}
			}
		} else {
			const div = App.UI.DOM.makeElement("div", "The corporation cannot expand to a new division at the moment.");
			if (V.cheatMode === 1) {
				div.append(" ", App.UI.DOM.link("Unlock expansion", () => {
					V.corp.ExpandToken++;
					refresh();
				}));
			}
			el.append(div);
		}

		return el;
	}

	/**
	 * @returns {DocumentFragment}
	 */
	function financials() {
		const el = new DocumentFragment();

		App.UI.DOM.appendNewElement("h1", el, "Financials");
		App.UI.DOM.appendNewElement("h2", el, "Dividend");

		const div = document.createElement("div");
		let dividends = App.Corporate.dividendOptions;
		let index = dividends.findIndex(element => V.dividendRatio >= element);
		let dividend = dividends[index];
		if (index >= 0) {
			let nextIndex = index + 1;
			V.dividendRatio = dividend;/* Normalize */
			div.append(`${V.corp.Name} is currently reserving ${Math.trunc(dividend * 100)}% of its profit to be paid out as dividends. `);
			const links = [];
			if (index > 0) {
				links.push(App.UI.DOM.link("Increase Ratio", () => {
					V.dividendRatio = dividends[index - 1];
					refresh();
				}));
			}
			if (nextIndex !== dividends.length) {
				links.push(App.UI.DOM.link("Reduce Ratio", () => {
					V.dividendRatio = dividends[nextIndex];
					refresh();
				}));
			} else {
				links.push(App.UI.DOM.link("None", () => {
					V.dividendRatio = 0;
					refresh();
				}));
			}
			div.append(App.UI.DOM.generateLinksStrip(links));
		} else {
			div.append(`${V.corp.Name} is currently not reserving a portion of its profit to be paid out as dividends. `);
			div.append(App.UI.DOM.link("Increase Ratio", () => {
				V.dividendRatio = dividends[dividends.length - 1];
				refresh();
			}));
		}
		el.append(div);

		if (App.Corporate.getStored("CashDividend") === 1) {
			addDiv(el, "The corporation will payout unused cash reserves over ", App.UI.DOM.makeElement("span", cashFormat(App.Corporate.payoutAfterCash()), ["yellowgreen"]), " as dividends. ", App.UI.DOM.link("Stop", () => {
				App.Corporate.setStored("CashDividend", 0);
				refresh();
			}));
		} else {
			addDiv(el, "You can direct the corporation to reserve cash over ", App.UI.DOM.makeElement("span", cashFormat(App.Corporate.payoutAfterCash()), ["yellowgreen"]), " to be paid out as dividends as well. ", App.UI.DOM.link("Payout Cash Reserves", () => {
				App.Corporate.setStored("CashDividend", 1);
				refresh();
			}));
		}

		App.UI.DOM.appendNewElement("h2", el, "Shares");
		let r = [];

		r.push(`You own`);
		r.push(num(V.personalShares));
		r.push(`shares while another`);
		r.push(num(V.publicShares));
		r.push(`shares are traded publicly. The going rate on the market for 1000 shares is currently`);
		r.push(App.UI.DOM.makeElement("span", `${cashFormat(corpSharePrice())}.`, ["cash"]));
		addDiv(el, ...App.Events.spaceSentences(r));

		r = [];
		r.push(`The corporation can buyback 1000 shares for`);
		r.push(App.UI.DOM.makeElement("span", cashFormat(corpSharePrice(-1000)), ["cash", "dec"]));
		r.push(`or issue 1000 shares and net`);
		r.push(App.UI.DOM.makeElement("span", `${cashFormat(corpSharePrice(1000))}.`, ["cash"]));
		r.push(`The corporation will prefer to round shares to the nearest 1000 and will issue or buy shares toward that goal first.`);
		addDiv(el, ...App.Events.spaceSentences(r));

		if (V.corp.Cash > corpSharePrice(-1000)) {
			if (V.publicShares <= V.personalShares - 2000 && V.publicShares > 0) {
				// It won't buy back player shares if the corporation is entirely owned by the player
				let persExtraShares = V.personalShares % 1000 || 1000;
				addDiv(el, "The corporation can buyback some of your shares. ",
					App.UI.DOM.link(`Buyback ${persExtraShares}`, () => {
						cashX(corpSharePrice(-persExtraShares), 'stocksTraded');
						V.corp.Cash -= corpSharePrice(-persExtraShares);
						V.personalShares -= persExtraShares;
						refresh();
					}));
			}
			if (V.publicShares >= 1000) {
				let pubExtraShares = V.publicShares % 1000 || 1000;
				addDiv(el, "The corporation can buyback some of the public shares. ",
					App.UI.DOM.link(`Buyback ${pubExtraShares}`, () => {
						V.corp.Cash -= corpSharePrice(-pubExtraShares);
						V.corp.Cash -= corpSharePrice(-pubExtraShares);
						V.publicShares -= pubExtraShares;
						refresh();
					}));
			}
		}

		let persLeftoverShares = 1000 - (V.personalShares % 1000);
		if (V.cash > corpSharePrice(persLeftoverShares)) {
			addDiv(el, `The corporation can issue ${persLeftoverShares} shares to you. `,
				App.UI.DOM.link(`Issue ${persLeftoverShares}`, () => {
					cashX(forceNeg(corpSharePrice(persLeftoverShares)), 'stocksTraded');
					V.corp.Cash += corpSharePrice(persLeftoverShares);
					V.personalShares += persLeftoverShares;
					refresh();
				}));
		}
		let pubLeftoverShares = 1000 - (V.publicShares % 1000);
		if (V.publicShares <= V.personalShares - 2000) {
			addDiv(el, `The corporation can issue ${pubLeftoverShares} shares onto the stock market. `,
				App.UI.DOM.link(`Issue ${pubLeftoverShares}`, () => {
					V.corp.Cash += corpSharePrice(pubLeftoverShares);
					V.publicShares += pubLeftoverShares;
					refresh();
				}));
		}
		if (V.publicShares <= V.personalShares - 3000) {
			addDiv(el, `You can sell some of your shares on the stock market. `,
				App.UI.DOM.link("Sell 1000", () => {
					cashX(corpSharePrice(), "stocksTraded");
					V.personalShares -= 1000;
					V.publicShares += 1000;
					refresh();
				}));
		}

		if (V.cash > corpSharePrice() && V.publicShares >= 1000) {
			addDiv(el, "You can buy some shares from the stock market. ",
				App.UI.DOM.link("Buy 1000", () => {
					cashX(forceNeg(corpSharePrice()), "stocksTraded");
					V.personalShares += 1000;
					V.publicShares -= 1000;
					refresh();
				}));
		}

		App.UI.DOM.appendNewElement("h3", el, "Stock Split");
		// Splitting shares when they're unwieldy
		let splitFeeInitial = 10000;
		let splitFeeValue = splitFeeInitial - Math.floor((splitFeeInitial * (V.PC.skill.trading / 100.0) / 2.0) / 1000) * 1000;
		let splitStockConstants = App.Corporate.stockSplits;

		r = [];
		r.push(`${V.corp.Name} can perform a stock split to increase the number of stocks while maintaining the same owned value. This requires paying a market fee of`);
		r.push(App.UI.DOM.makeElement("span", cashFormat(splitFeeValue), ["cash", "dec"]));
		r.push(`plus a per-share fee depending on the type of split being done.`);

		if (splitFeeValue < splitFeeInitial) {
			r.push(App.UI.DOM.makeElement("span", "You negotiated lower fees due to your", ["note"]));
			r.push(App.UI.DOM.makeElement("span", "business acumen", ["skill", "player", "note"]));
		}
		addDiv(el, ...App.Events.spaceSentences(r));

		if (V.corp.SpecTimer > 0) {
			App.UI.DOM.appendNewElement("div", el, "The corporation has restructured too recently.", ["note"]);
		}

		const ul = document.createElement("ul");
		for (const stockType of splitStockConstants) {
			let splitValue = stockType.cost;
			let splitDenom = stockType.oldStocks || 1;
			let splitNumerator = stockType.newStocks || 1;
			let splitMultiplier = splitNumerator / splitDenom;
			let splitTotal = splitValue * (V.publicShares + V.personalShares) + splitFeeValue;
			let splitWeek = stockType.weeks;

			const li = document.createElement("li");
			r = [];
			r.push(`${splitNumerator}-for-${splitDenom}`);
			if (splitDenom > splitNumerator) {
				r.push(`inverse`);
			}
			r.push(`stock split at`);
			r.push(App.UI.DOM.makeElement("span", cashFormat(splitValue), ["cash", "dec"]));
			r.push(`per share. Including market fees, this will cost the corporation a total of`);
			r.push(App.UI.DOM.makeElement("span", `${cashFormat(splitTotal)},`, ["cash", "dec"]));
			r.push(`leaving the going rate for stock at`);
			r.push(App.UI.DOM.makeElement("span", cashFormat(Math.floor(corpSharePrice(0, V.personalShares * splitMultiplier, V.publicShares * splitMultiplier))), ["cash"]));
			r.push(`per 1000 shares.`);
			if (V.corp.SpecTimer === 0) {
				if (V.publicShares % splitDenom !== 0 || V.personalShares % splitDenom !== 0) {
					r.push(App.UI.DOM.makeElement("span", "The number of shares cannot be evenly split", "note"));
				} else if (V.corp.Cash > splitTotal) {
					r.push(App.UI.DOM.link("Split Shares", () => {
						V.corp.Cash -= splitTotal;
						V.publicShares *= splitMultiplier;
						V.personalShares *= splitMultiplier;
						V.corp.SpecTimer = splitWeek;
						refresh();
					}));
				} else {
					r.push(App.UI.DOM.makeElement("span", "The corporation cannot afford the fees.", ["note"]));
				}
			}
			li.append(...App.Events.spaceSentences(r));
			ul.append(li);
		}
		el.append(ul);
		return el;
	}

	/**
	 * @returns {DocumentFragment}
	 */
	function specializations() {
		const el = new DocumentFragment();
		App.UI.DOM.appendNewElement("h1", el, "Slave specialization");
		if (V.corp.SpecToken > 0) {
			// Spending tokens on new specializations
			const r = [];
			if (V.corp.SpecToken > 1) {
				r.push(`${V.corp.Name} has ${V.corp.SpecToken} specializations left.`);
			} else {
				r.push(`${V.corp.Name} has one specialization left.`);
			}
			if (V.corp.SpecTimer > 0) {
				r.push(`You have recently changed specializations and the corporation needs`);
				if (V.corp.SpecTimer > 1) {
					r.push(`${V.corp.SpecTimer} more weeks`);
				} else {
					r.push(`another week`);
				}

				r.push(`before it can comply with another directive.`);
				if (V.cheatMode === 1) {
					r.push(App.UI.DOM.link("Skip wait", () => {
						V.corp.SpecTimer = 0;
						refresh();
					}));
				}
				addDiv(el, ...App.Events.spaceSentences(r));
			} else {
				addDiv(el, ...App.Events.spaceSentences(r));
				addDiv(el, "Choosing to specialize your corporation uses a specialization. The corporation can be directed to focus on the following:");
				if (V.corp.SpecRaces.length === 0 && (V.corp.DivExtra > 0 || V.corp.DivLegal > 0)) {
					// This used to be V.captureUpgradeRace, it is a general acquisition specialization

					const links = [];
					for (const [key, race] of App.Data.misc.filterRacesPublic) {
						if (V.arcologies[0].FSSubjugationistRace !== key || !FutureSocieties.isActive('FSSubjugationist')) {
							links.push(App.UI.DOM.link(race, () => {
								V.corp.SpecRaces = corpBlacklistRace(key, 1);
								V.corp.SpecToken -= 1;
								refresh();
							}));
						}
					}
					addDiv(el, "Slaves who are not ",
						App.UI.DOM.generateLinksStrip(links), "— ",
						App.UI.DOM.makeElement("span", "additional races can be excluded. 4 races per token.", ["note"]));

					if (V.corp.SpecToken >= 3) {
						const links = [];
						for (const [key, race] of App.Data.misc.filterRacesPublic) {
							if (V.arcologies[0].FSSupremacistRace !== key || !FutureSocieties.isActive('FSSupremacist')) {
								links.push(App.UI.DOM.link(race, () => {
									V.corp.SpecRaces = corpBlacklistRace(key, 0);
									V.corp.SpecToken -= 3;
									V.corp.SpecTimer = 2;
									refresh();
								}));
							}
						}
						addDiv(el, "Only slaves who are ", App.UI.DOM.generateLinksStrip(links));
					} else {
						addDiv(el, "Only slaves of a particular race requires 3 tokens.");
					}
				}

				if ((!jsDef(V.corp.SpecNationality)) && V.corp.DivExtra > 0 && (FutureSocieties.isActive('FSEdoRevivalist') || FutureSocieties.isActive('FSChineseRevivalist'))) {
					if (FutureSocieties.isActive('FSEdoRevivalist')) {
						addDiv(el, `Since you are pursuing Edo Revivalism, slaves who are `, App.UI.DOM.link("Japanese", () => {
							V.corp.SpecNationality = "Japanese";
							V.corp.SpecToken -= 1;
							V.corp.SpecTimer = 2;
							refresh();
						}));
					}
					if (FutureSocieties.isActive('FSChineseRevivalist')) {
						addDiv(el, `Since you are pursuing Chinese Revivalism, slaves who are `, App.UI.DOM.link("Chinese", () => {
							V.corp.SpecNationality = "Chinese";
							V.corp.SpecToken -= 1;
							V.corp.SpecTimer = 2;
							refresh();
						}));
					}
				}
				if (V.seeDicks !== 0 && !jsDef(V.corp.SpecGender) && (V.corp.DivExtra > 0 || V.corp.DivLegal > 0)) {
					// This used to be V.captureUpgradeGender, it is a general acquisition specialization
					const links = [];
					links.push(App.UI.DOM.link("Pussies", () => {
						V.corp.SpecGender = 1;
						V.corp.SpecToken -= 1;
						V.corp.SpecTimer = 2;
						refresh();
					}));
					links.push(App.UI.DOM.link("Dicks", () => {
						V.corp.SpecGender = 2;
						V.corp.SpecToken -= 1;
						V.corp.SpecTimer = 2;
						refresh();
					}));
					addDiv(el, "Train only slaves with ", App.UI.DOM.generateLinksStrip(links));
				}
				if (!jsDef(V.corp.SpecHeight) && (V.corp.DivExtra > 0 || V.corp.DivLegal > 0)) {
					// This is a general acquisition specialization
					const links = [];
					links.push(App.UI.DOM.link("Short", () => {
						V.corp.SpecHeight = 2;
						V.corp.SpecToken -= 1;
						V.corp.SpecTimer = 2;
						refresh();
					}));
					links.push(App.UI.DOM.link("Tall", () => {
						V.corp.SpecHeight = 4;
						V.corp.SpecToken -= 1;
						V.corp.SpecTimer = 2;
						refresh();
					}));
					addDiv(el, "Slaves that are ", App.UI.DOM.generateLinksStrip(links), "- ", App.UI.DOM.makeElement("span", "Further specializations possible", "note"));
				}
				if (!jsDef(V.corp.SpecVirgin) && (V.corp.DivExtra > 0 || V.corp.DivLegal > 0)) {
					// This is a general acquisition specialization
					addDiv(el, "Slaves that are ", App.UI.DOM.link("Virgins", () => {
						V.corp.SpecVirgin = 1;
						V.corp.SpecToken -= 1;
						V.corp.SpecTimer = 2;
						refresh();
					}));
				}
				if (!jsDef(V.corp.SpecIntelligence) && V.corp.DivLegal > 0) {
					// This used to be V.entrapmentUpgradeIntelligence, it is a legal enslavement specialization
					const links = [];
					links.push(App.UI.DOM.link("Stupid", () => {
						V.corp.SpecIntelligence = 1;
						V.corp.SpecToken -= 1;
						V.corp.SpecTimer = 2;
						refresh();
					}));
					links.push(App.UI.DOM.link("Intelligent", () => {
						V.corp.SpecIntelligence = 3;
						V.corp.SpecToken -= 1;
						V.corp.SpecTimer = 2;
						refresh();
					}));
					addDiv(el, "Slaves who are ", App.UI.DOM.generateLinksStrip(links), "- ", App.UI.DOM.makeElement("span", "Further specializations possible", "note"));
				}
				if (!jsDef(V.corp.SpecAge) && V.corp.DivExtra > 0) {
					// This used to be V.captureUpgradeAge, it is the extralegal enslavement specialization
					const links = [];
					links.push(App.UI.DOM.link("Younger", () => {
						V.corp.SpecAge = 1;
						V.corp.SpecToken -= 1;
						V.corp.SpecTimer = 2;
						refresh();
					}));
					links.push(App.UI.DOM.link("Older", () => {
						V.corp.SpecAge = 3;
						V.corp.SpecToken -= 1;
						V.corp.SpecTimer = 2;
						refresh();
					}));
					addDiv(el, "Slaves who are ", App.UI.DOM.generateLinksStrip(links));
				}
				if (!jsDef(V.corp.SpecWeight) && (V.corp.DivBreak > 0 || V.corp.DivSurgery > 0 || V.corp.DivTrain > 0)) {
					// This used to be V.generalUpgradeWeight, it is a general improvement specialization
					const links = [];
					links.push(App.UI.DOM.link("Thin Slaves", () => {
						V.corp.SpecWeight = 2;
						V.corp.SpecToken -= 1;
						V.corp.SpecTimer = 2;
						refresh();
					}));
					links.push(App.UI.DOM.link("Fat nor Thin Slaves", () => {
						V.corp.SpecWeight = 3;
						V.corp.SpecToken -= 1;
						V.corp.SpecTimer = 2;
						refresh();
					}));
					links.push(App.UI.DOM.link("Fat Slaves", () => {
						V.corp.SpecWeight = 5;
						V.corp.SpecToken -= 1;
						V.corp.SpecTimer = 2;
						refresh();
					}));
					addDiv(el, "Managing slaves' diets to achieve ", App.UI.DOM.generateLinksStrip(links), " -- ", App.UI.DOM.makeElement("span", "Further specializations possible", "note"));
				}
				if (!jsDef(V.corp.SpecDevotion) && (V.corp.DivBreak > 0 || V.corp.DivSurgery > 0 || V.corp.DivTrain > 0)) {
					// This used to be V.entrapmentUpgradeDevotionOne/Two, it is a general improvement specialization
					const links = [];
					links.push(App.UI.DOM.link("Reluctant", () => {
						V.corp.SpecDevotion = 2;
						V.corp.SpecToken -= 1;
						V.corp.SpecTimer = 2;
						refresh();
					}));
					links.push(App.UI.DOM.link("Obedient", () => {
						V.corp.SpecDevotion = 4;
						V.corp.SpecToken -= 1;
						V.corp.SpecTimer = 2;
						refresh();
					}));
					addDiv(el, "Slaves who are ", App.UI.DOM.generateLinksStrip(links), " -- ", App.UI.DOM.makeElement("span", "Further specializations possible", "note"));
				}
				if (!jsDef(V.corp.SpecAccent) && (V.corp.DivBreak > 0 || V.corp.DivSurgery > 0 || V.corp.DivTrain > 0)) {
					// This used to be V.trainingUpgradeAccent, it is a general improvement specialization
					const links = [];
					links.push(App.UI.DOM.link("Speak the Language", () => {
						V.corp.SpecAccent = 1;
						V.corp.SpecToken -= 1;
						V.corp.SpecTimer = 2;
						refresh();
					}));
					links.push(App.UI.DOM.link("Speak without Accent", () => {
						V.corp.SpecAccent = 2;
						V.corp.SpecToken -= 1;
						V.corp.SpecTimer = 2;
						refresh();
					}));
					addDiv(el, "Slaves are taught to ", App.UI.DOM.generateLinksStrip(links));
				}
				if (!jsDef(V.corp.SpecHormones) && (V.corp.DivBreak > 0 || V.corp.DivSurgery > 0 || V.corp.DivTrain > 0)) {
					// This used to be V.drugUpgradeHormones, it is a general improvement specialization
					const links = [];
					links.push(App.UI.DOM.link("Feminize", () => {
						V.corp.SpecHormones = 1;
						V.corp.SpecToken -= 1;
						V.corp.SpecTimer = 2;
						refresh();
					}));
					links.push(App.UI.DOM.link("Masculinize", () => {
						V.corp.SpecHormones = 2;
						V.corp.SpecToken -= 1;
						V.corp.SpecTimer = 2;
						refresh();
					}));
					addDiv(el, "Slaves are given hormones to ", App.UI.DOM.generateLinksStrip(links));
				}
				if (!jsDef(V.corp.SpecInjection) && (V.corp.DivBreak > 0 || V.corp.DivSurgery > 0 || V.corp.DivTrain > 0)) {
					// This used to be V.drugUpgradeInjectionOne, it is a general improvement specialization
					const links = [];
					links.push(App.UI.DOM.link("Petite", () => {
						V.corp.SpecInjection = 1;
						V.corp.SpecToken -= 1;
						V.corp.SpecTimer = 2;
						refresh();
					}));
					links.push(App.UI.DOM.link("Tasteful", () => {
						V.corp.SpecInjection = 2;
						V.corp.SpecToken -= 1;
						V.corp.SpecTimer = 2;
						refresh();
					}));
					links.push(App.UI.DOM.link("Huge", () => {
						V.corp.SpecInjection = 3;
						V.corp.SpecToken -= 1;
						V.corp.SpecTimer = 2;
						refresh();
					}));
					addDiv(el, "Slave assets are made to be ", App.UI.DOM.generateLinksStrip(links), " -- ", App.UI.DOM.makeElement("span", "Further specializations possible", "note"));
				}
				if (!jsDef(V.corp.SpecCosmetics) && (V.corp.DivBreak > 0 || V.corp.DivSurgery > 0 || V.corp.DivTrain > 0)) {
					// This used to be V.surgicalUpgradeCosmetics, it is a general improvement specialization
					const links = [];
					links.push(App.UI.DOM.link("Applied", () => {
						V.corp.SpecCosmetics = 1;
						V.corp.SpecToken -= 1;
						V.corp.SpecTimer = 2;
						refresh();
					}));
					links.push(App.UI.DOM.link("Not Applied", () => {
						V.corp.SpecCosmetics = 0;
						V.corp.SpecTimer = 2;
						refresh();
					}));
					addDiv(el, "Straightforward cosmetic procedures are ", App.UI.DOM.generateLinksStrip(links));
				}
				if (!jsDef(V.corp.SpecEducation) && V.corp.DivTrain > 0) {
					// This used to be V.trainingUpgradeEducation, it is the training specialization
					const links = [];
					links.push(App.UI.DOM.link("No Education", () => {
						V.corp.SpecEducation = 0;
						V.corp.SpecToken -= 1;
						V.corp.SpecTimer = 2;
						refresh();
					}));
					links.push(App.UI.DOM.link("Basic Education", () => {
						V.corp.SpecEducation = 1;
						V.corp.SpecToken -= 1;
						V.corp.SpecTimer = 2;
						refresh();
					}));
					addDiv(el, "Slaves are given ", App.UI.DOM.generateLinksStrip(links), " -- ", App.UI.DOM.makeElement("span", "Further specializations possible", "note"));
				}
				if (!jsDef(V.corp.SpecImplants) && V.corp.DivSurgery > 0) {
					// This used to be V.surgicalUpgradeImplants, it is the surgery specialization
					const links = [];
					links.push(App.UI.DOM.link("Applied", () => {
						V.corp.SpecImplants = 1;
						V.corp.SpecToken -= 1;
						V.corp.SpecTimer = 2;
						refresh();
					}));
					links.push(App.UI.DOM.link("Not Applied", () => {
						V.corp.SpecImplants = 0;
						V.corp.SpecTimer = 2;
						refresh();
					}));
					addDiv(el, "Slave implants are ", App.UI.DOM.generateLinksStrip(links), " -- ", App.UI.DOM.makeElement("span", "Further specializations possible", "note"));
				}
				if (!jsDef(V.corp.SpecGenitalia) && V.corp.DivSurgeryDev > 100) {
					// This used to be V.surgicalUpgradeGenitalia, it is the surgery specialization
					const links = [];
					links.push(App.UI.DOM.link("Add Pussy", () => {
						V.corp.SpecPussy = 1;
						V.corp.SpecGenitalia = 1;
						V.corp.SpecToken -= 1;
						V.corp.SpecTimer = 2;
						refresh();
					}));
					links.push(App.UI.DOM.link("Remove Pussy", () => {
						V.corp.SpecPussy = -1;
						V.corp.SpecGenitalia = 1;
						V.corp.SpecToken -= 1;
						V.corp.SpecTimer = 2;
						refresh();
					}));
					links.push(App.UI.DOM.link("Add Dick", () => {
						V.corp.SpecDick = 1;
						V.corp.SpecGenitalia = 1;
						V.corp.SpecToken -= 1;
						V.corp.SpecTimer = 2;
						refresh();
					}));
					links.push(App.UI.DOM.link("Remove Dick", () => {
						V.corp.SpecDick = -1;
						V.corp.SpecGenitalia = 1;
						V.corp.SpecToken -= 1;
						V.corp.SpecTimer = 2;
						refresh();
					}));
					links.push(App.UI.DOM.link("Add Balls", () => {
						V.corp.SpecBalls = 1;
						V.corp.SpecGenitalia = 1;
						V.corp.SpecToken -= 1;
						V.corp.SpecTimer = 2;
						refresh();
					}));
					links.push(App.UI.DOM.link("Remove Balls", () => {
						V.corp.SpecBalls = -1;
						V.corp.SpecGenitalia = 1;
						V.corp.SpecToken -= 1;
						V.corp.SpecTimer = 2;
						refresh();
					}));
					addDiv(el, "Slaves get their genitalia reconfigured ", App.UI.DOM.generateLinksStrip(links), " -- ", App.UI.DOM.makeElement("span", "Further specializations possible", "note"));
				}
				if (!jsDef(V.corp.SpecTrust) && V.corp.DivBreak > 0) {
					// This used to be V.generalUpgradeBreaking, it is the slave breaking specific specialization
					const links = [];
					links.push(App.UI.DOM.link("Brutality", () => {
						V.corp.SpecTrust = 2;
						V.corp.SpecToken -= 1;
						V.corp.SpecTimer = 2;
						refresh();
					}));
					links.push(App.UI.DOM.link("Care", () => {
						V.corp.SpecTrust = 4;
						V.corp.SpecToken -= 1;
						V.corp.SpecTimer = 2;
						refresh();
					}));
					addDiv(el, "Breaking slaves with ", App.UI.DOM.generateLinksStrip(links), " -- ", App.UI.DOM.makeElement("span", "Further specializations possible", "note"));
				}
				if (!jsDef(V.corp.SpecAmputee) && V.corp.DivArcade > 0 && V.corp.DivSurgeryDev > 100) {
					// This is the arcade specialization
					addDiv(el, "Slave limbs are categorically ", App.UI.DOM.link("Removed", () => {
						V.corp.SpecAmputee = 1;
						V.corp.SpecToken -= 1;
						V.corp.SpecTimer = 2;
						refresh();
					}));
				}
				if (!jsDef(V.corp.SpecMuscle) && V.corp.DivMenial > 0) {
					// This used to be V.generalUpgradeMuscle, it is the Menial division's specialization
					const links = [];
					if (!FutureSocieties.isActive('FSPhysicalIdealist')) {
						links.push(App.UI.DOM.link("Weak", () => {
							V.corp.SpecMuscle = 2;
							V.corp.SpecToken -= 1;
							V.corp.SpecTimer = 2;
							refresh();
						}));
					}
					links.push(App.UI.DOM.link("Soft", () => {
						V.corp.SpecMuscle = 3;
						V.corp.SpecToken -= 1;
						V.corp.SpecTimer = 2;
						refresh();
					}));
					links.push(App.UI.DOM.link("Toned", () => {
						V.corp.SpecMuscle = 4;
						V.corp.SpecToken -= 1;
						V.corp.SpecTimer = 2;
						refresh();
					}));
					addDiv(el, "Slaves with muscles that are ", App.UI.DOM.generateLinksStrip(links), " -- ", App.UI.DOM.makeElement("span", "Further specializations possible", "note"));
				}
				if (!jsDef(V.corp.SpecMilk) && V.corp.DivDairy > 0) {
					// This is the dairy specialization
					const links = [];
					links.push(App.UI.DOM.link("Naturally", () => {
						V.corp.SpecMilk = 1;
						V.corp.SpecToken -= 1;
						V.corp.SpecTimer = 2;
						refresh();
					}));
					links.push(App.UI.DOM.link("Through Implant", () => {
						V.corp.SpecMilk = 2;
						V.corp.SpecToken -= 1;
						V.corp.SpecTimer = 2;
						refresh();
					}));
					addDiv(el, "Slaves are made to be lactating ", App.UI.DOM.generateLinksStrip(links));
				}
				if (!jsDef(V.corp.SpecSexEd) && V.corp.DivWhore > 0) {
					// This used to be V.trainingUpgradeSexEd, it is the escort division specialization
					const links = [];
					links.push(App.UI.DOM.link("Clueless", () => {
						V.corp.SpecSexEd = 0;
						V.corp.SpecToken -= 0;
						V.corp.SpecTimer = 2;
						refresh();
					}));
					links.push(App.UI.DOM.link("Competent", () => {
						V.corp.SpecSexEd = 1;
						V.corp.SpecToken -= 1;
						V.corp.SpecTimer = 2;
						refresh();
					}));
					addDiv(el, "Slaves are sexually ", App.UI.DOM.generateLinksStrip(links), " -- ", App.UI.DOM.makeElement("span", "Further specializations possible", ["note"]));
				}
			}
		} else {
			const div = App.UI.DOM.makeElement("div", "Your corporation cannot pick a new specialization at this time.");
			if (V.cheatMode === 1) {
				div.append(" ", App.UI.DOM.link("Unlock specialization", () => {
					V.corp.Spec++;
					V.corp.SpecToken++;
					V.corp.SpecTimer = 0;
					refresh();
				}));
				div.append(" ", App.UI.DOM.link("Reset Timer", () => {
					V.corp.SpecTimer = 0;
					refresh();
				}));
			}
			el.append(div);
		}

		if (V.corp.Spec > V.corp.SpecToken) {
			const p = document.createElement("p");
			// Modifying specializations
			p.append(`You have chosen the following specializations:`);
			App.UI.DOM.appendNewElement("div", p, `You can choose to specialize further with additional tokens, specialize less, end the specialization or sometimes tweak them for free.`, ["note"]);

			if (V.corp.SpecRaces.length === App.Data.misc.filterRacesPublic.size) {
				V.corp.SpecRaces = [];
			}
			if (V.corp.SpecRaces.length > 0) {
				p.append(corpRaces());
			}
			if (V.corp.SpecNationality) {
				const div = App.UI.DOM.makeElement("div", `The corporation trains slaves who are ${V.corp.SpecNationality}.`);
				if (V.corp.SpecTimer === 0) {
					div.append(" ", App.UI.DOM.link("No Focus", () => {
						delete V.corp.SpecNationality;
						V.corp.SpecToken += 1;
						V.corp.SpecTimer = 2;
						refresh();
					}));
				}
				p.append(div);
			}

			if (V.corp.SpecGender) {
				const r = [];
				r.push("The corporation trains slaves with");
				if (V.corp.SpecGender === 1) {
					r.push("pussies.");
				} else if (V.corp.SpecGender === 2) {
					r.push("dicks.");
				}
				if (V.corp.SpecTimer === 0) {
					r.push(App.UI.DOM.link("No Focus", () => {
						delete V.corp.SpecGender;
						V.corp.SpecToken += 1;
						V.corp.SpecTimer = 2;
						refresh();
					}));
				}
				App.Events.addNode(p, r, "div");
			}

			if (V.corp.SpecHeight !== undefined) {
				const r = [];
				const links = [];
				r.push("The corporation is targeting");
				let tokenGain = 1;
				if (V.corp.SpecHeight === 1) {
					r.push("tiny");
					if (V.corp.SpecTimer === 0) {
						links.push(App.UI.DOM.link("Short Slaves", () => {
							V.corp.SpecHeight = 2;
							V.corp.SpecToken += 1;
							V.corp.SpecTimer = 2;
							refresh();
						}));
						tokenGain = 2;
					}
				} else if (V.corp.SpecHeight === 2) {
					r.push("short");
					if (V.corp.SpecTimer === 0) {
						if (V.corp.SpecToken > 0 && ((V.corp.DivExtraDev || 0) + (V.corp.DivLegalDev || 0)) > 50) {
							links.push(App.UI.DOM.link("Tiny Slaves", () => {
								V.corp.SpecHeight = 1;
								V.corp.SpecToken -= 1;
								V.corp.SpecTimer = 2;
								refresh();
							}));
						}
					}
				} else if (V.corp.SpecHeight === 4) {
					r.push("tall");
					if (V.corp.SpecTimer === 0) {
						if (V.corp.SpecToken > 0 && ((V.corp.DivExtraDev || 0) + (V.corp.DivLegalDev || 0)) > 50) {
							links.push(App.UI.DOM.link("Giant Slaves", () => {
								V.corp.SpecHeight = 5;
								V.corp.SpecToken -= 1;
								V.corp.SpecTimer = 2;
								refresh();
							}));
						}
					}
				} else if (V.corp.SpecHeight === 5) {
					r.push("giant");
					if (V.corp.SpecTimer === 0) {
						links.push(App.UI.DOM.link("Tall Slaves", () => {
							V.corp.SpecHeight = 4;
							V.corp.SpecToken += 1;
							V.corp.SpecTimer = 2;
							refresh();
						}));
					}
					tokenGain = 2;
				}
				r.push("slaves.");
				if (V.corp.SpecTimer === 0) {
					links.push(App.UI.DOM.link("No Focus", () => {
						delete V.corp.SpecHeight;
						V.corp.SpecToken += tokenGain;
						V.corp.SpecTimer = 2;
						refresh();
					}));
				}
				r.push(App.UI.DOM.generateLinksStrip(links));
				App.Events.addNode(p, r, "div");
			}

			if (V.corp.SpecVirgin === 1) {
				const div = App.UI.DOM.makeElement("div", `The corporation is ensuring slaves remain virgins.`);
				if (V.corp.SpecTimer === 0) {
					div.append(" ", App.UI.DOM.link("No Focus", () => {
						delete V.corp.SpecVirgin;
						V.corp.SpecToken += 1;
						V.corp.SpecTimer = 2;
						refresh();
					}));
				}
				p.append(div);
			}

			if (V.corp.SpecTrust) {
				const r = [];
				const links = [];
				r.push("The corporation is breaking slaves with");
				let tokenGain = 1;
				if (V.corp.SpecTrust === 1) {
					r.push("extreme brutality.");
					if (V.corp.SpecTimer === 0) {
						links.push(App.UI.DOM.link("Apply Less Brutality", () => {
							V.corp.SpecTrust = 2;
							V.corp.SpecTimer = 2;
							refresh();
						}));
					}
				} else if (V.corp.SpecTrust === 2) {
					r.push("brutality.");
					if (V.corp.SpecTimer === 0) {
						if (V.corp.SpecToken > 0 && V.arcologies[0].FSDegradationist > 20 && V.corp.DivBreakDev > 50) {
							links.push(App.UI.DOM.link("Apply Extreme Brutality", () => {
								V.corp.SpecTrust = 1;
								// Don't think this deserves the added cost of a token, unlike the 'utmost care' one.
								V.corp.SpecTimer = 2;
								refresh();
							}));
						}
					}
				} else if (V.corp.SpecTrust === 4) {
					r.push("care.");
					if (V.corp.SpecTimer === 0) {
						if (V.corp.SpecToken > 0 && V.arcologies[0].FSPaternalist > 20 && V.corp.DivBreakDev > 50) {
							links.push(App.UI.DOM.link("Use the Utmost Care", () => {
								V.corp.SpecTrust = 5;
								V.corp.SpecToken -= 1;
								V.corp.SpecTimer = 2;
								refresh();
							}));
						}
					}
				} else if (V.corp.SpecTrust === 5) {
					r.push("the utmost care.");
					if (V.corp.SpecTimer === 0) {
						links.push(App.UI.DOM.link("Use Less Care", () => {
							V.corp.SpecTrust = 4;
							V.corp.SpecToken += 1;
							V.corp.SpecTimer = 2;
							refresh();
						}));
						tokenGain = 2;
					}
				}
				if (V.corp.SpecTimer === 0) {
					links.push(App.UI.DOM.link("No Focus", () => {
						delete V.corp.SpecTrust;
						V.corp.SpecToken += tokenGain;
						V.corp.SpecTimer = 2;
						refresh();
					}));
				}
				r.push(App.UI.DOM.generateLinksStrip(links));
				App.Events.addNode(p, r, "div");
			}

			if (V.corp.SpecWeight) {
				const r = [];
				const links = [];
				r.push("The corporation");
				if (V.corp.SpecWeight === 1) {
					r.push("makes slaves follow incredibly strict diets.");
					if (V.corp.SpecTimer === 0) {
						links.push(App.UI.DOM.link("Apply Looser Diet", () => {
							V.corp.SpecWeight = 2;
							V.corp.SpecTimer = 2;
							refresh();
						}));
					}
				} else if (V.corp.SpecWeight === 2) {
					r.push("makes slaves diet.");
					if (V.corp.SpecTimer === 0) {
						if (V.corp.SpecToken > 0 && !FutureSocieties.isActive('FSHedonisticDecadence')) {
							links.push(App.UI.DOM.link("Apply Strict Diet", () => {
								V.corp.SpecWeight = 1;
								V.corp.SpecTimer = 2;
								refresh();
							}));
						}
						links.push(App.UI.DOM.link("Aim for Healthy Weight", () => {
							V.corp.SpecWeight = 3;
							V.corp.SpecTimer = 2;
							refresh();
						}));
					}
				} else if (V.corp.SpecWeight === 3) {
					r.push("is aiming for slaves with a healthy weight.");
					if (V.corp.SpecTimer === 0) {
						links.push(App.UI.DOM.link("Apply Diet", () => {
							V.corp.SpecWeight = 2;
							V.corp.SpecTimer = 2;
							refresh();
						}));
						// TODO: Perhaps 'plump up' is not the right phrase
						links.push(App.UI.DOM.link("Plump up Slaves", () => {
							V.corp.SpecWeight = 5;
							V.corp.SpecTimer = 2;
							refresh();
						}));
					}
				} else if (V.corp.SpecWeight === 5) {
					r.push("aims for plump slaves.");
					if (V.corp.SpecTimer === 0) {
						if (V.corp.SpecToken > 0 && !FutureSocieties.isActive('FSPhysicalIdealist')) {
							links.push(App.UI.DOM.link("Fatten Slaves", () => {
								V.corp.SpecWeight = 6;
								V.corp.SpecTimer = 2;
								refresh();
							}));
						}
						links.push(App.UI.DOM.link("Aim for Healthy Weight", () => {
							V.corp.SpecWeight = 3;
							V.corp.SpecTimer = 2;
							refresh();
						}));
					}
				} else if (V.corp.SpecWeight === 6) {
					r.push("aims for fat slaves.");
					if (V.corp.SpecTimer === 0) {
						links.push(App.UI.DOM.link("Settle for Plump", () => {
							V.corp.SpecWeight = 5;
							V.corp.SpecTimer = 2;
							refresh();
						}));
					}
				}
				if (V.corp.SpecTimer === 0) {
					links.push(App.UI.DOM.link("No Focus", () => {
						delete V.corp.SpecWeight;
						V.corp.SpecToken += 1;
						V.corp.SpecTimer = 2;
						refresh();
					}));
				}
				r.push(App.UI.DOM.generateLinksStrip(links));
				App.Events.addNode(p, r, "div");
			}

			if (V.corp.SpecMuscle) {
				const r = [];
				r.push("The corporation");
				const links = [];
				let tokenGain = 1;
				if (V.corp.SpecMuscle === 1) {
					r.push("aims to have frail slaves.");
					if (V.corp.SpecTimer === 0) {
						links.push(App.UI.DOM.link("Aim for Weak", () => {
							V.corp.SpecMuscle = 2;
							V.corp.SpecTimer = 2;
							refresh();
						}));
					}
				} else if (V.corp.SpecMuscle === 2) {
					// Don't think this deserves the added cost of a token, unlike slaves getting ripped
					r.push("aims to have weak slaves.");
					if (V.corp.SpecTimer === 0) {
						if (!FutureSocieties.isActive('FSPhysicalIdealist')) {
							links.push(App.UI.DOM.link("Aim for Frail", () => {
								V.corp.SpecMuscle = 1;
								V.corp.SpecTimer = 2;
								refresh();
							}));
						}
					}
				} else if (V.corp.SpecMuscle === 3) {
					r.push("is aiming for slaves with soft muscles.");
					if (V.corp.SpecTimer === 0) {
						if (!FutureSocieties.isActive('FSPhysicalIdealist')) {
							links.push(App.UI.DOM.link("Aim for Weak", () => {
								V.corp.SpecMuscle = 2;
								V.corp.SpecTimer = 2;
								refresh();
							}));
						}
						links.push(App.UI.DOM.link("Aim for Toned", () => {
							V.corp.SpecMuscle = 4;
							V.corp.SpecTimer = 2;
							refresh();
						}));
					}
				} else if (V.corp.SpecMuscle === 4) {
					r.push("aims for toned muscles.");
					if (V.corp.SpecTimer === 0) {
						if (V.corp.SpecToken > 0 &&
							((V.corp.DivBreakDev || 0) + (V.corp.DivSurgeryDev || 0) + (V.corp.DivTrainDev || 0) > 100)) {
							links.push(App.UI.DOM.link("Aim for Ripped", () => {
								V.corp.SpecMuscle = 5;
								V.corp.SpecToken -= 1;
								V.corp.SpecTimer = 2;
								refresh();
							}));
						}
					}
				} else if (V.corp.SpecMuscle === 5) {
					r.push("aims for ripped slaves.");
					if (V.corp.SpecTimer === 0) {
						links.push(App.UI.DOM.link("Aim for Toned", () => {
							V.corp.SpecMuscle = 4;
							V.corp.SpecToken += 1;
							V.corp.SpecTimer = 2;
							refresh();
						}));
						tokenGain = 2;
					}
				}
				if (V.corp.SpecTimer === 0) {
					if (V.corp.SpecMuscle === 4 || V.corp.SpecMuscle === 2) {
						links.push(App.UI.DOM.link("Aim for Soft", () => {
							V.corp.SpecMuscle = 3;
							V.corp.SpecTimer = 2;
							refresh();
						}));
					}
					links.push(App.UI.DOM.link("No Focus", () => {
						delete V.corp.SpecWeight;
						V.corp.SpecToken += tokenGain;
						V.corp.SpecTimer = 2;
					}));
				}
				r.push(App.UI.DOM.generateLinksStrip(links));
				App.Events.addNode(p, r, "div");
			}

			if (V.corp.SpecDevotion) {
				const r = [];
				const links = [];
				let tokenGain = 1;
				if (V.corp.SpecDevotion === 1) {
					r.push(`The corporation keeps slaves extremely defiant.`);
					if (V.corp.SpecTimer === 0) {
						links.push(App.UI.DOM.link("Less Defiant", () => {
							V.corp.SpecDevotion = 2;
							V.corp.SpecTimer = 2;
							refresh();
						}));
					}
				} else if (V.corp.SpecDevotion === 2) {
					r.push(`The corporation keeps slaves reluctant.`);
					if (V.corp.SpecTimer === 0) {
						links.push(App.UI.DOM.link("Make them Defiant", () => {
							V.corp.SpecDevotion = 1;
							// Don't think this deserves the added cost of a token, unlike the 'devoted' one
							V.corp.SpecTimer = 2;
							refresh();
						}));
					}
				} else if (V.corp.SpecDevotion === 4) {
					r.push(`The corporation is fostering obedience.`);
					if (V.corp.SpecTimer === 0) {
						if (V.corp.SpecToken > 0 && V.corp.DivTrainDev > 100) {
							links.push(App.UI.DOM.link("Foster Devotion", () => {
								V.corp.SpecDevotion = 5;
								V.corp.SpecToken += 1;
								V.corp.SpecTimer = 2;
								refresh();
							}));
						}
					}
				} else if (V.corp.SpecDevotion === 5) {
					r.push(`The corporation is fostering devotion.`);
					if (V.corp.SpecTimer === 0) {
						links.push(App.UI.DOM.link("Settle for Obedience", () => {
							V.corp.SpecDevotion = 4;
							V.corp.SpecToken += 1;
							V.corp.SpecTimer = 2;
							refresh();
						}));
					}
				}
				if (V.corp.SpecTimer === 0) {
					links.push(App.UI.DOM.link("No Focus", () => {
						delete V.corp.SpecDevotion;
						V.corp.SpecToken += tokenGain;
						V.corp.SpecTimer = 2;
						refresh();
					}));
				}
				r.push(App.UI.DOM.generateLinksStrip(links));
				App.Events.addNode(p, r, "div");
			}

			if (V.corp.SpecIntelligence !== undefined) {
				let div = document.createElement("div");
				if (V.corp.SpecIntelligence === 1) {
					div.append(`The corporation keeps stupid slaves.`);
				} else if (V.corp.SpecIntelligence === 3) {
					div.append(`The corporation keeps intelligent slaves.`);
				}
				if (V.corp.SpecTimer === 0) {
					div.append(" ", App.UI.DOM.link("No Focus", () => {
						delete V.corp.SpecIntelligence;
						V.corp.SpecToken += 1;
						V.corp.SpecTimer = 2;
						refresh();
					}));
				}
				p.append(div);
			}

			if (V.corp.SpecAge) {
				let div = document.createElement("div");
				if (V.corp.SpecAge === 1) {
					div.append(`The corporation focuses on young slaves.`);
				} else if (V.corp.SpecAge === 3) {
					div.append(`The corporation focuses on older slaves.`);
				}
				if (V.corp.SpecTimer === 0) {
					div.append(" ", App.UI.DOM.link("No Focus", () => {
						delete V.corp.SpecAge;
						V.corp.SpecToken += 1;
						V.corp.SpecTimer = 2;
						refresh();
					}));
				}
				p.append(div);
			}

			if (V.corp.SpecAccent !== undefined) {
				const r = [];
				const links = [];
				if (V.corp.SpecAccent === 1) {
					r.push(`The corporation teaches slaves to speak the lingua franca.`);
					if (V.corp.SpecTimer === 0) {
						links.push(App.UI.DOM.link("Eliminate Accents", () => {
							V.corp.SpecAccent = 2;
							V.corp.SpecTimer = 2;
							refresh();
						}));
					}
				} else if (V.corp.SpecAccent === 2) {
					r.push(`The corporation teaches slaves to speak the lingua franca without an accent.`);
					if (V.corp.SpecTimer === 0) {
						links.push(App.UI.DOM.link("Just Teach Language", () => {
							V.corp.SpecAccent = 1;
							V.corp.SpecTimer = 2;
							refresh();
						}));
					}
				}
				if (V.corp.SpecTimer === 0) {
					links.push(App.UI.DOM.link("No Focus", () => {
						delete V.corp.SpecAccent;
						V.corp.SpecToken += 1;
						V.corp.SpecTimer = 2;
						refresh();
					}));
				}
				r.push(App.UI.DOM.generateLinksStrip(links));
				App.Events.addNode(p, r, "div");
			}

			if (V.corp.SpecEducation !== undefined) {
				const r = [];
				const links = [];
				let tokenGain = 1;
				if (V.corp.SpecEducation === 0) {
					r.push(`The corporation focuses on uneducated slaves.`);
					if (V.corp.SpecTimer === 0) {
						if (V.corp.SpecToken > 0) {
							links.push(App.UI.DOM.link("Basic Education", () => {
								V.corp.SpecEducation = 1;
								V.corp.SpecTimer = 2;
								refresh();
							}));
						}
					}
				} else if (V.corp.SpecEducation === 1) {
					r.push(`The corporation makes sure all slaves have a basic education.`);
					if (V.corp.SpecTimer === 0) {
						if (V.corp.DivTrainDev > 200 && V.corp.SpecToken > 0) {
							links.push(App.UI.DOM.link("Advanced Education", () => {
								V.corp.SpecEducation = 2;
								V.corp.SpecToken -= 1;
								V.corp.SpecTimer = 2;
								refresh();
							}));
						}
						links.push(App.UI.DOM.link("No Education", () => {
							V.corp.SpecEducation = 1;
							V.corp.SpecTimer = 2;
							refresh();
						}));
					}
				} else if (V.corp.SpecEducation === 2) {
					r.push(`The corporation makes sure all slaves have an advanced education.`);
					if (V.corp.SpecTimer === 0) {
						links.push(App.UI.DOM.link("Basic Education", () => {
							V.corp.SpecEducation = 1;
							V.corp.SpecToken += 1;
							V.corp.SpecTimer = 2;
							refresh();
						}));
						tokenGain = 2;
					}
				}
				if (V.corp.SpecTimer === 0) {
					links.push(App.UI.DOM.link("No Focus", () => {
						delete V.corp.SpecEducation;
						V.corp.SpecToken += tokenGain;
						V.corp.SpecTimer = 2;
						refresh();
					}));
				}
				r.push(App.UI.DOM.generateLinksStrip(links));
				App.Events.addNode(p, r, "div");
			}

			if (V.corp.SpecCosmetics !== undefined) {
				const r = [];
				const links = [];
				let tokenGain = 0;
				if (V.corp.SpecCosmetics === 1) {
					r.push(`The corporation applies straightforward cosmetic procedures.`);
					tokenGain = 1;
				} else if (V.corp.SpecCosmetics === 0) {
					r.push(`The corporation doesn't apply cosmetic procedures.`);
					if (V.corp.SpecTimer === 0) {
						if (V.corp.SpecToken > 0) {
							links.push(App.UI.DOM.link("Applied", () => {
								V.corp.SpecCosmetics = 1;
								V.corp.SpecToken -= 1;
								V.corp.SpecTimer = 2;
								refresh();
							}));
						}
					}
				}
				if (V.corp.SpecTimer === 0) {
					links.push(App.UI.DOM.link("No Focus", () => {
						delete V.corp.SpecCosmetics;
						V.corp.SpecToken += tokenGain;
						V.corp.SpecTimer = 2;
						refresh();
					}));
				}
				r.push(App.UI.DOM.generateLinksStrip(links));
				App.Events.addNode(p, r, "div");
			}

			if (V.corp.SpecImplants !== undefined) {
				const r = [];
				const links = [];
				let tokenGain = 1;
				if (V.corp.SpecImplants === 1) {
					r.push(`The corporation applies tasteful implants to all slaves.`);
					if (V.corp.SpecTimer === 0) {
						if (V.corp.DivSurgeryDev > 100 && V.corp.SpecToken > 0) {
							links.push(App.UI.DOM.link("Absurd Implants", () => {
								V.corp.SpecImplants = 2;
								V.corp.SpecToken -= 1;
								V.corp.SpecTimer = 2;
								refresh();
							}));
						}
					}
				} else if (V.corp.SpecImplants === 2) {
					r.push(`The corporation applies absurd implants to all slaves.`);
					if (V.corp.SpecTimer === 0) {
						links.push(App.UI.DOM.link("Tasteful Implants", () => {
							V.corp.SpecImplants = 1;
							V.corp.SpecToken += 1;
							V.corp.SpecTimer = 2;
							refresh();
						}));
						tokenGain = 2;
					}
				} else if (V.corp.SpecImplants === 0) {
					r.push(`The corporation keeps their slaves entirely implant free.`);
					if (V.corp.SpecTimer === 0) {
						if (V.corp.SpecToken > 0) {
							links.push(App.UI.DOM.link("Tasteful Implants", () => {
								V.corp.SpecImplants = 1;
								V.corp.SpecToken -= 1;
								V.corp.SpecTimer = 2;
								refresh();
							}));
						}
						tokenGain = 0;
					}
				}
				if (V.corp.SpecTimer === 0) {
					links.push(App.UI.DOM.link("No Focus", () => {
						delete V.corp.SpecImplants;
						V.corp.SpecToken += tokenGain;
						V.corp.SpecTimer = 2;
						refresh();
					}));
				}
				r.push(App.UI.DOM.generateLinksStrip(links));
				App.Events.addNode(p, r, "div");
			}

			if (!jsDef(V.corp.SpecPussy) && !jsDef(V.corp.SpecDick) && !jsDef(V.corp.SpecBalls) && V.corp.SpecGenitalia === 1) {
				delete V.corp.SpecGenitalia;
				V.corp.SpecToken += 1;
			}
			if (V.corp.SpecGenitalia === 1) {
				if (V.corp.SpecPussy === 1) {
					const div = App.UI.DOM.makeElement("div", `The corporation adds a pussy to all slaves.`);
					if (V.corp.SpecTimer === 0) {
						div.append(" ", App.UI.DOM.link("Stop", () => {
							delete V.corp.SpecPussy;
							V.corp.SpecTimer = 2;
							refresh();
						}));
					}
					p.append(div);
				} else if (V.corp.SpecPussy === -1) {
					const div = App.UI.DOM.makeElement("div", `The corporation removes pussies from all slaves.`);
					if (V.corp.SpecTimer === 0) {
						div.append(" ", App.UI.DOM.link("Stop", () => {
							delete V.corp.SpecPussy;
							V.corp.SpecTimer = 2;
							refresh();
						}));
					}
					p.append(div);
				} else {
					const div = App.UI.DOM.makeElement("div", `The corporation has no plans for pussies.`);
					if (V.corp.SpecTimer === 0) {
						const links = [];
						links.push(App.UI.DOM.link("Add Pussy", () => {
							V.corp.SpecPussy = 1;
							V.corp.SpecTimer = 2;
							refresh();
						}));
						links.push(App.UI.DOM.link("Remove Pussy", () => {
							V.corp.SpecPussy = -1;
							V.corp.SpecToken -= 1;
							V.corp.SpecTimer = 2;
							refresh();
						}));
						div.append(" ", App.UI.DOM.generateLinksStrip(links));
					}
					p.append(div);
				}
				if (V.corp.SpecDick === 1) {
					const div = App.UI.DOM.makeElement("div", `The corporation adds a dick to all slaves.`);
					if (V.corp.SpecTimer === 0) {
						div.append(" ", App.UI.DOM.link("Stop", () => {
							delete V.corp.SpecDick;
							V.corp.SpecTimer = 2;
							refresh();
						}));
					}
					p.append(div);
				} else if (V.corp.SpecDick === -1) {
					const div = App.UI.DOM.makeElement("div", `The corporation removes dicks from all slaves.`);
					if (V.corp.SpecTimer === 0) {
						div.append(" ", App.UI.DOM.link("Stop", () => {
							delete V.corp.SpecDick;
							V.corp.SpecTimer = 2;
							refresh();
						}));
					}
					p.append(div);
				} else {
					const div = App.UI.DOM.makeElement("div", `The corporation has no plans for dicks.`);
					if (V.corp.SpecTimer === 0) {
						const links = [];
						links.push(App.UI.DOM.link("Add Dick", () => {
							V.corp.SpecDick = 1;
							V.corp.SpecTimer = 2;
							refresh();
						}));
						links.push(App.UI.DOM.link("Remove Dick", () => {
							V.corp.SpecDick = -1;
							V.corp.SpecToken -= 1;
							V.corp.SpecTimer = 2;
							refresh();
						}));
						div.append(" ", App.UI.DOM.generateLinksStrip(links));
					}
					p.append(div);
				}
				if (V.corp.SpecBalls === 1) {
					const div = App.UI.DOM.makeElement("div", `The corporation adds balls to all slaves (penis required).`);
					if (V.corp.SpecTimer === 0) {
						div.append(" ", App.UI.DOM.link("Stop", () => {
							delete V.corp.SpecBalls;
							V.corp.SpecTimer = 2;
							refresh();
						}));
					}
					p.append(div);
				} else if (V.corp.SpecBalls === -1) {
					const div = App.UI.DOM.makeElement("div", `The corporation removes balls from all slaves.`);
					if (V.corp.SpecTimer === 0) {
						div.append(" ", App.UI.DOM.link("Stop", () => {
							delete V.corp.SpecBalls;
							V.corp.SpecTimer = 2;
							refresh();
						}));
					}
					p.append(div);
				} else {
					const div = App.UI.DOM.makeElement("div", `The corporation has no plans for balls.`);
					if (V.corp.SpecTimer === 0) {
						const links = [];
						links.push(App.UI.DOM.link("Add Balls", () => {
							V.corp.SpecBalls = 1;
							V.corp.SpecTimer = 2;
							refresh();
						}));
						links.push(App.UI.DOM.link("Remove Balls", () => {
							V.corp.SpecBalls = -1;
							V.corp.SpecTimer = 2;
							refresh();
						}));
						div.append(" ", App.UI.DOM.generateLinksStrip(links));
					}
					p.append(div);
				}
			}

			if (V.corp.SpecInjection) {
				const r = [];
				const links = [];
				let tokenGain = 1;
				if (V.corp.SpecInjection === 1) {
					r.push(`The corporation aims for petite assets.`);
					if (V.corp.SpecTimer === 0) {
						links.push(App.UI.DOM.link("Tasteful Size", () => {
							V.corp.SpecInjection = 2;
							V.corp.SpecTimer = 2;
							refresh();
						}));
						links.push(App.UI.DOM.link("Huge Size", () => {
							V.corp.SpecInjection = 3;
							V.corp.SpecTimer = 2;
							refresh();
						}));
					}
				} else if (V.corp.SpecInjection === 2) {
					r.push(`The corporation aims for tasteful assets.`);
					if (V.corp.SpecTimer === 0) {
						links.push(App.UI.DOM.link("Small Size", () => {
							V.corp.SpecInjection = 1;
							V.corp.SpecTimer = 2;
							refresh();
						}));
						links.push(App.UI.DOM.link("Huge Size", () => {
							V.corp.SpecInjection = 3;
							V.corp.SpecTimer = 2;
							refresh();
						}));
					}
				} else if (V.corp.SpecInjection === 3) {
					r.push(`The corporation aims for huge assets.`);
					if (V.corp.SpecTimer === 0) {
						links.push(App.UI.DOM.link("Small Size", () => {
							V.corp.SpecInjection = 1;
							V.corp.SpecTimer = 2;
							refresh();
						}));
						links.push(App.UI.DOM.link("Tasteful Size", () => {
							V.corp.SpecInjection = 2;
							V.corp.SpecTimer = 2;
							refresh();
						}));
						if (V.corp.DivSurgeryDev > 100 && V.corp.SpecToken > 0) {
							links.push(App.UI.DOM.link("Supermassive Size", () => {
								V.corp.SpecInjection = 4;
								V.corp.SpecToken -= 1;
								V.corp.SpecTimer = 2;
								refresh();
							}));
						}
						if (V.corp.DivDairyDev > 200 && V.corp.SpecToken > 0) {
							links.push(App.UI.DOM.link("Pastoral Size", () => {
								V.corp.SpecInjection = 5;
								V.corp.SpecToken -= 1;
								V.corp.SpecTimer = 2;
								refresh();
							}));
						}
					}
				} else if (V.corp.SpecInjection === 4) {
					r.push(`The corporation aims for supermassive assets.`);
					if (V.corp.SpecTimer === 0) {
						links.push(App.UI.DOM.link("Huge Size", () => {
							V.corp.SpecInjection = 3;
							V.corp.SpecToken += 1;
							V.corp.SpecTimer = 2;
							refresh();
						}));
						if (V.corp.DivDairyDev > 200) {
							links.push(App.UI.DOM.link("Pastoral Size", () => {
								V.corp.SpecInjection = 5;
								V.corp.SpecTimer = 2;
								refresh();
							}));
						}
						tokenGain = 2;
					}
				} else if (V.corp.SpecInjection === 5) {
					r.push(`The corporation aims for pastoral assets.`);
					if (V.corp.SpecTimer === 0) {
						links.push(App.UI.DOM.link("Huge Size", () => {
							V.corp.SpecInjection = 3;
							V.corp.SpecToken += 1;
							V.corp.SpecTimer = 2;
							refresh();
						}));
						if (V.corp.DivSurgeryDev > 50) {
							links.push(App.UI.DOM.link("Supermassive Size", () => {
								V.corp.SpecInjection = 4;
								V.corp.SpecTimer = 2;
								refresh();
							}));
						}
						tokenGain = 2;
					}
				}
				if (V.corp.SpecTimer === 0) {
					links.push(App.UI.DOM.link("No Focus", () => {
						delete V.corp.SpecInjection;
						V.corp.SpecToken += tokenGain;
						V.corp.SpecTimer = 2;
					}));
				}
				r.push(App.UI.DOM.generateLinksStrip(links));
				App.Events.addNode(p, r, "div");
			}

			if (V.corp.SpecHormones) {
				const r = [];
				const links = [];
				if (V.corp.SpecHormones === 1) {
					r.push(`The corporation feminizes slaves with hormones.`);
					if (V.corp.SpecTimer === 0) {
						links.push(App.UI.DOM.link("Masculinize", () => {
							V.corp.SpecHormones = 2;
							V.corp.SpecTimer = 2;
							refresh();
						}));
					}
				} else if (V.corp.SpecHormones === 2) {
					r.push(`The corporation masculinize slaves with hormones.`);
					if (V.corp.SpecTimer === 0) {
						links.push(App.UI.DOM.link("Feminize", () => {
							V.corp.SpecHormones = 1;
							V.corp.SpecTimer = 2;
							refresh();
						}));
					}
				}
				if (V.corp.SpecTimer === 0) {
					links.push(App.UI.DOM.link("No Focus", () => {
						delete V.corp.SpecHormones;
						V.corp.SpecToken += 1;
						V.corp.SpecTimer = 2;
						refresh();
					}));
				}
				r.push(App.UI.DOM.generateLinksStrip(links));
				App.Events.addNode(p, r, "div");
			}

			if (V.corp.SpecAmputee === 1) {
				const div = App.UI.DOM.makeElement("div", `The corporation removes all limbs from its slaves.`);
				if (V.corp.SpecTimer === 0) {
					div.append(" ", App.UI.DOM.link("Stop", () => {
						delete V.corp.SpecAmputee;
						V.corp.SpecToken += 1;
						V.corp.SpecTimer = 2;
						refresh();
					}));
				}
				p.append(div);
			}

			if (V.corp.SpecMilk) {
				const r = [];
				const links = [];
				if (V.corp.SpecMilk === 1) {
					r.push(`The corporation makes sure all slaves are naturally lactating.`);
					if (V.corp.SpecTimer === 0) {
						links.push(App.UI.DOM.link("Lactation Implant", () => {
							V.corp.SpecMilk = 2;
							V.corp.SpecTimer = 2;
							refresh();
						}));
					}
				} else if (V.corp.SpecMilk === 2) {
					r.push(`The corporation equips all slaves with lactation implants.`);
					if (V.corp.SpecTimer === 0) {
						links.push(App.UI.DOM.link("Natural Lactation", () => {
							V.corp.SpecMilk = 1;
							V.corp.SpecTimer = 2;
							refresh();
						}));
					}
				}
				if (V.corp.SpecTimer === 0) {
					links.push(App.UI.DOM.link("No Focus", () => {
						delete V.corp.SpecMilk;
						V.corp.SpecToken += 1;
						V.corp.SpecTimer = 2;
						refresh();
					}));
				}
				r.push(App.UI.DOM.generateLinksStrip(links));
				App.Events.addNode(p, r, "div");
			}

			if (V.corp.SpecSexEd !== undefined) {
				const r = [];
				const links = [];
				let tokenGain = 1;
				if (V.corp.SpecSexEd === 1) {
					r.push(`The corporation familiarizes slaves with sexual service.`);
					if (V.corp.SpecTimer === 0) {
						if (V.corp.SpecToken > 0 && V.corp.DivWhoreDev > 200) {
							links.push(App.UI.DOM.link("Advanced Training", () => {
								V.corp.SpecSexEd = 2;
								V.corp.SpecToken -= 1;
								V.corp.SpecTimer = 2;
								refresh();
							}));
						}
					}
				} else if (V.corp.SpecSexEd === 2) {
					r.push(`The corporation teaches advanced sexual techniques to its slaves.`);
					if (V.corp.SpecTimer === 0) {
						links.push(App.UI.DOM.link("Basic Training", () => {
							V.corp.SpecSexEd = 1;
							V.corp.SpecToken += 1;
							V.corp.SpecTimer = 2;
							refresh();
						}));
						tokenGain = 2;
					}
				} else if (V.corp.SpecSexEd === 0) {
					r.push(`The corporation teaches no sexual techniques to its slaves.`);
					if (V.corp.SpecTimer === 0) {
						links.push(App.UI.DOM.link("Basic Training", () => {
							V.corp.SpecSexEd = 1;
							V.corp.SpecToken -= 1;
							V.corp.SpecTimer = 2;
							refresh();
						}));
						tokenGain = 0;
					}
				}
				if (V.corp.SpecTimer === 0) {
					links.push(App.UI.DOM.link("No Focus", () => {
						delete V.corp.SpecSexEd;
						V.corp.SpecToken += tokenGain;
						V.corp.SpecTimer = 2;
						refresh();
					}));
				}
				r.push(App.UI.DOM.generateLinksStrip(links));
				App.Events.addNode(p, r, "div");
			}

			el.append(p);
		}

		return el;
	}

	/**
	 * @returns {HTMLParagraphElement}
	 */
	function dissolveLink() {
		const p = document.createElement("p");
		p.append(App.UI.DOM.link("Dissolve the corporation", () => {
			if (Dialog.isOpen()) {
				Dialog.close();
			}

			Dialog.setup("Dissolve Corporation");
			const frag = new DocumentFragment();
			App.UI.DOM.appendNewElement("p", frag, "Dissolving the corporation will destroy all assets your corporation owns!", ["note"]);
			App.UI.DOM.appendNewElement("p", frag, "This decision cannot be reverted!", ["warning", "note"]);
			frag.append(App.UI.DOM.link("Dissolve", () => {
				cashX(Math.min(corpSharePrice() * V.personalShares / 1000, 1000000), "stocksTraded");
				App.Corporate.dissolve();
				refresh();
				Dialog.close();
			}));
			$(Dialog.body()).empty().append(frag);
			Dialog.open();
		}));
		return p;
	}

	/**
	 * @returns {DocumentFragment}
	 */
	function corpRaces() {
		const el = new DocumentFragment();
		App.UI.DOM.appendNewElement("div", el, `The corporation enslaves people of the following race${V.corp.SpecRaces.length === 1 ? `` : `s`}:`);
		for (const [race, capRace] of App.Data.misc.filterRacesPublic) {
			const r = [];
			if (V.corp.SpecRaces.includes(race)) {
				r.push(capRace);
				if (!(FutureSocieties.isActive('FSSubjugationist') && V.arcologies[0].FSSubjugationistRace !== race)) {
					if (V.corp.SpecRaces.length > 1 && V.corp.SpecTimer === 0) {
						const blacklistLength = App.Data.misc.filterRacesPublic.size - V.corp.SpecRaces.length;
						const needsToken = blacklistLength % 4 === 0;

						if (!needsToken || V.corp.SpecToken > 0) {
							r.push(
								App.UI.DOM.link(
									"Blacklist",
									() => {
										V.corp.SpecRaces = corpBlacklistRace(race, 1);
										if (needsToken) {
											V.corp.SpecToken -= 1;
										}
										if (blacklistLength % 4 === 3) {
											V.corp.SpecTimer = 1;
										}
										refresh();
									},
								)
							);
						}
					}
				}
			} else {
				r.push(App.UI.DOM.makeElement("span", capFirstChar(capRace), ["strikethrough"]));
				if (V.corp.SpecTimer === 0) {
					r.push(
						App.UI.DOM.link(
							"Whitelist",
							() => {
								V.corp.SpecRaces = corpBlacklistRace(race, 0);
								const blacklistLength = App.Data.misc.filterRacesPublic.size - V.corp.SpecRaces.length;
								if (blacklistLength % 4 === 0) {
									V.corp.SpecToken += 1;
									V.corp.SpecTimer = 1;
								}
								if (blacklistLength === 0) {
									V.corp.SpecRaces = [];
								}
								refresh();
							},
						)
					);
				}
			}
			App.Events.addNode(el, r, "div");
		}
		return el;
	}

	/**
	 * @param {HTMLElement|DocumentFragment} parent
	 * @param {Array<string|Node>} children
	 */
	function addDiv(parent, ...children) {
		const div = document.createElement("div");
		// @ts-ignore
		$(div).append(...children);
		parent.append(div);
	}
};
