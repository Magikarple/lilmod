App.UI.tradeMenials = function(menialWorkersOnly) {
	const el = new DocumentFragment();
	const menialPrice = menialSlaveCost();
	const popCap = menialPopCap();
	const bulkMax = popCap.value - V.menials - V.fuckdolls - V.menialBioreactors;
	let linkArray;

	if (!menialWorkersOnly) {
		App.UI.DOM.appendNewElement("h2", el, "Menial Slaves");

		el.append(slaveDemand());
		el.append(slaveSupply());

		App.UI.DOM.appendNewElement("div", el, popCap.text);
		App.UI.DOM.appendNewElement("div", el, `The parts of your arcology you own can house a total of ${num(popCap.value)} menial slaves.`);
	}

	el.append(menialTrading());

	if (!menialWorkersOnly) {
		if (!FutureSocieties.isActive('FSPaternalist')) {
			el.append(fuckDollConversion());
			el.append(fuckDollTrading());
		}

		el.append(bioreactorTrading());
	}

	return el;


	function slaveDemand() {
		const el = new DocumentFragment();
		const div = document.createElement("div");
		div.append(`Slave demand is `);
		if (V.menialDemandFactor <= -35000) {
			App.UI.DOM.appendNewElement("span", div, `extremely low`, ["red", "bold"]);
		} else if (V.menialDemandFactor <= -20000) {
			App.UI.DOM.appendNewElement("span", div, `very low`, ["red", "bold"]);
		} else if (V.menialDemandFactor <= 0) {
			App.UI.DOM.appendNewElement("span", div, `weak`, ["yellow", "bold"]);
		} else if (V.menialDemandFactor >= 35000) {
			App.UI.DOM.appendNewElement("span", div, `extremely high`, ["green", "bold"]);
		} else if (V.menialDemandFactor >= 20000) {
			App.UI.DOM.appendNewElement("span", div, `very high`, ["green", "bold"]);
		} else {
			App.UI.DOM.appendNewElement("span", div, `strong`, ["yellow", "bold"]);
		}
		if (V.deltaDemand > 0) {
			div.append(` and `);
			App.UI.DOM.appendNewElement("span", div, `improving`, ["green", "bold"]);
		} else if (V.deltaDemand < 0) {
			div.append(` and `);
			App.UI.DOM.appendNewElement("span", div, `decreasing`, ["red", "bold"]);
		}
		if (V.deltaDemand !== 0) {
			if (V.demandTimer - V.elapsedDemandTimer < 3) {
				App.UI.DOM.appendNewElement("span", div, ` but it might change soon.`);
			}
		}
		if (V.cheatMode && V.cheatModeM) {
			const menDemand = function() {
				const el = new DocumentFragment();
				el.append(" ");
				App.UI.DOM.appendNewElement("span", el, `Slave Demand`, ["yellowgreen"]);
				el.append(` | ${V.menialDemandFactor}`);
				return el;
			};

			const span = document.createElement("span");
			span.append(menDemand());

			App.UI.DOM.makeTextBox(
				V.menialDemandFactor,
				v => {
					V.menialDemandFactor = Math.clamp(Math.trunc(Number(v)), -50000, 50000) || V.menialDemandFactor;
					V.cheater = 1;
					$(span).empty().append(menDemand());
				}
			);
			div.append(span);
		}
		el.append(div);
		return el;
	}

	function slaveSupply() {
		const el = new DocumentFragment();
		const div = document.createElement("div");
		div.append(`Slave supply is `);

		if (V.menialSupplyFactor <= -35000) {
			App.UI.DOM.appendNewElement("span", div, "extremely low", ["green", "bold"]);
		} else if (V.menialSupplyFactor <= -20000) {
			App.UI.DOM.appendNewElement("span", div, "very low", ["green", "bold"]);
		} else if (V.menialSupplyFactor <= 0) {
			App.UI.DOM.appendNewElement("span", div, "weak", ["yellow", "bold"]);
		} else if (V.menialSupplyFactor >= 35000) {
			App.UI.DOM.appendNewElement("span", div, "extremely high", ["red", "bold"]);
		} else if (V.menialSupplyFactor >= 20000) {
			App.UI.DOM.appendNewElement("span", div, "very high", ["red", "bold"]);
		} else {
			App.UI.DOM.appendNewElement("span", div, "strong", ["yellow", "bold"]);
		}
		if (V.deltaSupply > 0) {
			div.append(` and `);
			App.UI.DOM.appendNewElement("span", div, "improving", ["red", "bold"]);
		} else if (V.deltaSupply < 0) {
			div.append(` and `);
			App.UI.DOM.appendNewElement("span", div, "decreasing", ["green", "bold"]);
		}
		if (V.deltaSupply !== 0) {
			if (V.supplyTimer - V.elapsedDemandTimer < 3) {
				App.UI.DOM.appendNewElement("span", div, ` but it might change soon.`);
			}
		}

		if (V.cheatMode && V.cheatModeM) {
			const menSupply = function() {
				const el = new DocumentFragment();
				el.append(" ");
				App.UI.DOM.appendNewElement("span", el, `Slave Supply`, `yellowgreen`);
				el.append(` | ${V.menialSupplyFactor}`);
				return el;
			};

			const span = document.createElement("span");
			span.append(menSupply());

			App.UI.DOM.makeTextBox(
				V.menialSupplyFactor,
				v => {
					V.menialSupplyFactor = Math.clamp(Math.trunc(Number(v)), -50000, 50000) || V.menialSupplyFactor;
					V.cheater = 1;
					$(span).empty().append(menSupply());
				}
			);
			div.append(span);
		}
		el.append(div);

		return el;
	}

	function menialTrading() {
		const el = document.createElement("div");
		if (!menialWorkersOnly) {
			const r = [];
			if (V.menials > 1) {
				r.push(`You own ${num(Math.trunc(V.menials))} menial slaves.`);
			} else if (V.menials > 0) {
				r.push(`You own one menial slave.`);
			} else {
				r.push(`You do not own any menial slaves.`);
			}
			r.push(`The market price of menials is <span class='cash'>${cashFormat(menialPrice)}.</span>`);
			App.Events.addNode(el, r);
		}

		if (bulkMax > 0 && V.cash > menialPrice) {
			linkArray = [];
			const buySomeMenials = function(number = 1) {
				const value = forceNeg(menialSlaveCost(number) * number);
				V.menials += number;
				V.menialSupplyFactor -= number;
				cashX(value, "menialTransfer");
				if (menialWorkersOnly) {
					Engine.play(passage());
				} else {
					jQuery("#menial-transaction-result").empty().append(App.UI.DOM.cashFormat(value));
				}
			};

			linkArray.push(
				App.UI.DOM.link(
					"Buy",
					() => {
						buySomeMenials(1);
						jQuery("#menial-span").empty().append(App.UI.tradeMenials(menialWorkersOnly));
					}
				)
			);
			if (V.cash > (menialSlaveCost(5)) * 5) {
				makeLink(5, buySomeMenials);
			}
			if (V.cash > (menialSlaveCost(10)) * 10) {
				makeLink(10, buySomeMenials);
			}
			if (V.cash > (menialSlaveCost(100)) * 100) {
				makeLink(100, buySomeMenials);
			}
			if (V.cash > (menialPrice + 1) * 2) {
				const menialBulkPremium = Math.trunc(1 + Math.clamp(V.cash / menialPrice, 0, bulkMax) / 400);
				linkArray.push(
					App.UI.DOM.link(
						"max",
						() => {
							buySomeMenials(
								Math.trunc(Math.clamp(V.cash / (menialPrice + menialBulkPremium), 0, bulkMax))
							);
							jQuery("#menial-span").empty().append(App.UI.tradeMenials(menialWorkersOnly));
						},
					)
				);
			}
			const div = document.createElement("div");
			div.classList.add("indent");
			div.append(App.UI.DOM.generateLinksStrip(linkArray));
			App.UI.DOM.appendNewElement("span", div, " Bulk transactions may require offering a premium.", "note");
			el.append(div);
		}

		if (!menialWorkersOnly && V.menials > 0) {
			linkArray = [];
			const sellSomeMenials = function(number = 1) {
				const value = menialSlaveCost(number) * number;
				V.menials -= number;
				V.menialDemandFactor -= number;
				cashX(value, "menialTransfer");
				jQuery("#menial-transaction-result").empty().append(App.UI.DOM.cashFormat(value));
			};
			linkArray.push(
				App.UI.DOM.link(
					"Sell",
					() => {
						sellSomeMenials(1);
						jQuery("#menial-span").empty().append(App.UI.tradeMenials(menialWorkersOnly));
					}
				)
			);

			if (V.menials >= 5) {
				makeLink(5, sellSomeMenials);
			}
			if (V.menials >= 10) {
				makeLink(10, sellSomeMenials);
			}
			if (V.menials >= 100) {
				makeLink(100, sellSomeMenials);
			}
			linkArray.push(
				App.UI.DOM.link(
					"all",
					() => {
						sellSomeMenials(V.menials);
						V.menials = 0; // Be quite sure.
						jQuery("#menial-span").empty().append(App.UI.tradeMenials(menialWorkersOnly));
					},
				)
			);
			App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray), ["indent"]);
		}
		return el;
	}

	function fuckDollConversion() {
		const el = document.createElement("div");
		const div = document.createElement("div");
		if (V.menials > 0) {
			if (V.arcadeUpgradeFuckdolls > 0) {
				const convertCost = 100;
				const convertSomeMenialsToFuckdolls = function(number) {
					const value = forceNeg(number * convertCost);
					V.menials -= number;
					V.fuckdolls += number;
					cashX(value, "menialTransfer");
					jQuery("#menial-transaction-result").empty().append(App.UI.DOM.cashFormat(value));
				};
				linkArray = [];
				linkArray.push(
					App.UI.DOM.link(
						"Convert to Fuckdoll",
						() => {
							convertSomeMenialsToFuckdolls(1);
							jQuery("#menial-span").empty().append(App.UI.tradeMenials(menialWorkersOnly));
						}
					)
				);

				if (V.menials >= 10) {
					makeLink(10, convertSomeMenialsToFuckdolls);
					if (V.menials >= 100) {
						makeLink(100, convertSomeMenialsToFuckdolls);
					}
				}
				linkArray.push(
					App.UI.DOM.link(
						"all",
						() => {
							convertSomeMenialsToFuckdolls(V.menials);
							V.menials = 0; // Be really sure
							jQuery("#menial-span").empty().append(App.UI.tradeMenials(menialWorkersOnly));
						},
					)
				);

				div.append(App.UI.DOM.generateLinksStrip(linkArray));
				App.Events.addNode(div, [`Conversion costs ${cashFormatColor(convertCost)} each`], "span", "note");
				el.append(div);
			}
			if (V.dairyFeedersUpgrade > 0) {
				const convertCost = 500;
				const convertSomeMenialsToBioreactors = function(number) {
					const value = forceNeg(number * convertCost);
					V.menials -= number;
					V.menialBioreactors += number;
					cashX(value, "menialTransfer");
					jQuery("#menial-transaction-result").empty().append(App.UI.DOM.cashFormat(value));
				};
				linkArray = [];
				linkArray.push(
					App.UI.DOM.link(
						"Convert to Bioreactor",
						() => {
							convertSomeMenialsToBioreactors(1);
							jQuery("#menial-span").empty().append(App.UI.tradeMenials(menialWorkersOnly));
						}
					)
				);

				if (V.menials >= 10) {
					makeLink(10, convertSomeMenialsToBioreactors);
					if (V.menials >= 100) {
						makeLink(100, convertSomeMenialsToBioreactors);
					}
				}
				linkArray.push(
					App.UI.DOM.link(
						"all",
						() => {
							convertSomeMenialsToBioreactors(V.menials);
							V.menials = 0; // Be really sure
							jQuery("#menial-span").empty().append(App.UI.tradeMenials(menialWorkersOnly));
						},
					)
				);
				const div = document.createElement("div");
				div.append(App.UI.DOM.generateLinksStrip(linkArray));
				App.Events.addNode(div, [`Conversion costs ${cashFormatColor(convertCost)} each`], "span", "note");
				el.append(div);
			}
		}
		return el;
	}

	function fuckDollTrading() {
		const el = document.createElement("div");
		if (V.fuckdolls > 1) {
			el.append(`You own ${num(Math.trunc(V.fuckdolls))} standard Fuckdolls. `);
		} else if (V.fuckdolls > 0) {
			el.append(`You own one standard Fuckdoll. `);
		} else if (!FutureSocieties.isActive('FSPaternalist')) {
			el.append(`You do not own any standard Fuckdolls. `);
		}
		if ((V.fuckdolls > 0) || !FutureSocieties.isActive('FSPaternalist')) {
			App.Events.addNode(el, [`The market price of standard Fuckdolls is <span class="cash">${cashFormat(menialPrice)}.</span>`]);
			if (bulkMax > 0) {
				if (!FutureSocieties.isActive('FSPaternalist') && V.cash > menialPrice) {
					linkArray = [];
					const buySomeFuckdolls = function(number = 1) {
						const value = forceNeg(menialSlaveCost(number) * number);
						V.fuckdolls += number;
						V.menialSupplyFactor -= number;
						cashX(value, "fuckdollsTransfer");
						jQuery("#menial-transaction-result").empty().append(App.UI.DOM.cashFormat(value));
					};

					linkArray.push(
						App.UI.DOM.link(
							"Buy",
							() => {
								buySomeFuckdolls(1);
								jQuery("#menial-span").empty().append(App.UI.tradeMenials(menialWorkersOnly));
							}
						)
					);
					if (V.cash > (menialSlaveCost(10)) * 10) {
						makeLink(10, buySomeFuckdolls);
					}
					if (V.cash > (menialSlaveCost(100)) * 100) {
						makeLink(100, buySomeFuckdolls);
					}
					if (V.cash > (menialPrice + 1) * 2) {
						const menialBulkPremium = Math.trunc(1 + Math.clamp(V.cash / menialPrice, 0, bulkMax) / 400);
						linkArray.push(
							App.UI.DOM.link(
								"max",
								() => {
									buySomeFuckdolls(
										Math.trunc(Math.clamp(V.cash / (menialPrice + menialBulkPremium), 0, bulkMax))
									);
									jQuery("#menial-span").empty().append(App.UI.tradeMenials(menialWorkersOnly));
								},
							)
						);
					}
					const div = document.createElement("div");
					div.classList.add("indent");
					div.append(App.UI.DOM.generateLinksStrip(linkArray));
					App.UI.DOM.appendNewElement("span", div, " Bulk transactions may require offering a premium.", "note");
					el.append(div);
				}
			}
			if (V.fuckdolls >= 1) {
				linkArray = [];
				const sellSomeFuckdolls = function(number = 1) {
					const value = menialSlaveCost(number) * number;
					V.fuckdolls -= number;
					V.menialDemandFactor -= number;
					cashX(value, "fuckdollsTransfer");
					jQuery("#menial-transaction-result").empty().append(App.UI.DOM.cashFormat(value));
				};
				linkArray.push(
					App.UI.DOM.link(
						"Sell",
						() => {
							sellSomeFuckdolls(1);
							jQuery("#menial-span").empty().append(App.UI.tradeMenials(menialWorkersOnly));
						}
					)
				);

				if (V.fuckdolls >= 10) {
					makeLink(10, sellSomeFuckdolls);
					if (V.fuckdolls >= 100) {
						makeLink(100, sellSomeFuckdolls);
					}
				}
				linkArray.push(
					App.UI.DOM.link(
						"all",
						() => {
							sellSomeFuckdolls(V.fuckdolls);
							V.fuckdolls = 0; // Be quite sure.
							jQuery("#menial-span").empty().append(App.UI.tradeMenials(menialWorkersOnly));
						},
					)
				);
				App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray), ["indent"]);
			}
		}

		return el;
	}

	function bioreactorTrading() {
		const el = document.createElement("div");
		if (V.menialBioreactors > 1) {
			el.append(`You own ${num(Math.trunc(V.menialBioreactors))} standard bioreactors. `);
		} else if (V.menialBioreactors > 0) {
			el.append(`You own one standard bioreactor. `);
		} else if (!FutureSocieties.isActive('FSPaternalist')) {
			el.append(`You do not own any standard bioreactors. `);
		}
		if ((V.menialBioreactors > 0) || !FutureSocieties.isActive('FSPaternalist')) {
			App.Events.addNode(el, [`The market price of standard bioreactors is <span class='cash'>${cashFormat(menialPrice - 100)}.</span>`]);
			if (bulkMax > 0) {
				if (!FutureSocieties.isActive('FSPaternalist') && V.cash > menialPrice) {
					linkArray = [];
					const buySomeBioreactors = function(number = 1) {
						const value = forceNeg(menialSlaveCost(number - 100) * number);
						V.menialBioreactors += number;
						V.menialSupplyFactor -= number;
						cashX(value, "menialBioreactorsTransfer");
						jQuery("#menial-transaction-result").empty().append(App.UI.DOM.cashFormat(value));
					};

					linkArray.push(
						App.UI.DOM.link(
							"Buy",
							() => {
								buySomeBioreactors(1);
								jQuery("#menial-span").empty().append(App.UI.tradeMenials(menialWorkersOnly));
							}
						)
					);
					if (V.cash > (menialSlaveCost(10)) * 10) {
						makeLink(10, buySomeBioreactors);
					}
					if (V.cash > (menialSlaveCost(100)) * 100) {
						makeLink(100, buySomeBioreactors);
					}
					if (V.cash > (menialPrice - 99) * 2) {
						const bioreactorBulkPremium = Math.trunc(1 + Math.clamp(V.cash / (menialPrice - 99), 0, bulkMax) / 400);
						linkArray.push(
							App.UI.DOM.link(
								"max",
								() => {
									buySomeBioreactors(
										Math.trunc(Math.clamp(V.cash / (menialPrice - 99 + bioreactorBulkPremium), 0, bulkMax))
									);
									jQuery("#menial-span").empty().append(App.UI.tradeMenials(menialWorkersOnly));
								},
							)
						);
					}
					const div = document.createElement("div");
					div.classList.add("indent");
					div.append(App.UI.DOM.generateLinksStrip(linkArray));
					App.UI.DOM.appendNewElement("span", div, " Bulk transactions may require offering a premium.", "note");
					el.append(div);
				}
			}
			if (V.menialBioreactors >= 1) {
				linkArray = [];
				const sellSomeBioreactors = function(number = 1) {
					const value = menialSlaveCost(number - 100) * number;
					V.menialBioreactors -= number;
					V.menialDemandFactor -= number;
					jQuery("#menial-transaction-result").empty().append(App.UI.DOM.cashFormat(value));
					cashX(value, "menialBioreactorsTransfer");
				};
				linkArray.push(
					App.UI.DOM.link(
						"Sell",
						() => {
							sellSomeBioreactors(1);
							jQuery("#menial-span").empty().append(App.UI.tradeMenials(menialWorkersOnly));
						}
					)
				);

				if (V.menialBioreactors >= 10) {
					makeLink(10, sellSomeBioreactors);
					if (V.menialBioreactors >= 100) {
						makeLink(100, sellSomeBioreactors);
					}
				}
				linkArray.push(
					App.UI.DOM.link(
						"all",
						() => {
							sellSomeBioreactors(V.menialBioreactors);
							V.menialBioreactors = 0; // Be quite sure.
							jQuery("#menial-span").empty().append(App.UI.tradeMenials(menialWorkersOnly));
						},
					)
				);
				const div = document.createElement("div");
				div.classList.add("indent");
				div.append(App.UI.DOM.generateLinksStrip(linkArray));
				el.append(div);
			}
		}
		return el;
	}

	/**
	 *
	 * @param {number} number
	 * @param {Function} runMe
	 */
	function makeLink(number, runMe) {
		linkArray.push(
			App.UI.DOM.link(
				`x${number}`,
				() => {
					runMe(number);
					jQuery("#menial-span").empty().append(App.UI.tradeMenials(menialWorkersOnly));
				}
			)
		);
	}
};
