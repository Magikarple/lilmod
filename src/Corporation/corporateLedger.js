/** Create the DOM ledger table
 * @param {object} ledger - One of the members of App.Corporate.ledger, such as .current or .old
 * @param {number} week - Week number (usually V.week, for the current ledger, or V.week-1, for the old one)
 * @returns {HTMLTableElement}
 */
App.Corporate.writeLedger = function(ledger, week) {
	/** Add a row to the ledger
	 * @param {HTMLElement} table
	 * @param {"th" | "td"} cellType
	 * @param {string} caption
	 * @param {number} [value]
	 * @param {string|Node} [note]
	 */
	function createRow(table, cellType, caption, value, note) {
		const row = App.UI.DOM.appendNewElement("tr", table);
		/** @type {HTMLTableCellElement} */
		const leftCell = App.UI.DOM.appendNewElement(cellType, row, caption);
		if (jsDef(value)) {
			const rightCell = App.UI.DOM.appendNewElement(cellType, row, App.UI.DOM.makeElement("div", formatCash(value)));
			if (note) {
				App.UI.DOM.appendNewElement("div", rightCell, note, "minor-note");
			}
		} else {
			leftCell.colSpan = 2;
		}
	}

	/** Format cash with color, DOM style (probably should be a shared function)
	 * @param {number} cash
	 * @returns {HTMLSpanElement}
	 */
	function formatCash(cash) {
		let span = App.UI.DOM.makeElement('span', cashFormat(cash));
		if (cash === 0) {
			span.classList.add("gray");
		} else {
			span.classList.add("cash");
			if (cash < 0) {
				span.classList.add("dec");
			} else if (cash > 0) {
				span.classList.add("inc");
			}
		}
		return span;
	}

	/** Build the cheat textbox for liquidity
	 * @param {number} cash - initial value
	 * @returns {HTMLInputElement}
	 */
	function makeCheatTextbox(cash) {
		return App.UI.DOM.makeTextBox(cash, (v) => {
			App.Corporate.cheatCash(v);
			updateLedgerTable();
		}, true);
	}

	function buildLedgerTable() {
		const table = document.createElement('table');
		table.className = "corporate";
		table.id = "corporate-ledger";

		const thead = App.UI.DOM.appendNewElement('thead', table);
		createRow(thead, "th", `Ledger for ${asDateString(week)} - ${asDateString(week + 1)}`);
		const tbody = App.UI.DOM.appendNewElement('tbody', table);
		createRow(tbody, "td", "Revenue", ledger.revenue);
		if (V.cheatMode && ledger.foreignRevenue > 0) {
			createRow(tbody, "td", "Including Neighbor Bonus", ledger.foreignRevenue);
		}
		createRow(tbody, "td", "Operating Expenses", forceNeg(ledger.operations));
		createRow(tbody, "td", "Slave Expenses", forceNeg(ledger.slaves));
		createRow(tbody, "td", "Asset Expenses", forceNeg(ledger.development));
		if (V.cheatMode) {
			createRow(tbody, "td", `Economic ${ledger.economicBoost < 0 ? "Expenses" : "Windfall"}`, ledger.economicBoost);
		}
		createRow(tbody, "td", "Overhead", forceNeg(ledger.overhead));
		let econNote = '';
		if (V.difficultySwitch > 0) {
			if (ledger.economy > 100) {
				econNote = "* Profits benefited from a strong economy.";
			} else if (ledger.economy > 60) {
				econNote = "* Profits were lowered by the weak economy.";
			} else {
				econNote = "* Profits were severely depressed by the failing economy.";
			}
		}
		createRow(tbody, "td", "Profit", ledger.profit, econNote);

		createRow(tbody, "th", "Totals");
		createRow(tbody, "td", "Liquidity", App.Corporate.getStored("Cash"), V.cheatMode ? makeCheatTextbox(App.Corporate.getStored("Cash")) : undefined);
		createRow(tbody, "td", "Corporate Value", App.Corporate.calculateValue());
		createRow(tbody, "td", "Dividend for Payout", App.Corporate.getStored("Dividend"), `Pays out on ${asDateString(V.week + V.dividendTimer, -1)},
			${V.dividendTimer === 1	? `the end of this week` : `in ${V.dividendTimer} weeks`}
		`);

		return table;
	}

	function updateLedgerTable() {
		$('#corporate-ledger').replaceWith(buildLedgerTable());
	}

	return buildLedgerTable();
};
