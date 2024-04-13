App.Facilities.StatsHelper = class {
	/**
	 * @param {string[]} columns - Array of labels for data columns.
	 * @param {number} [slaveExtraCols=1] - How many extra columns does the slave section have?
	 */
	constructor(columns, slaveExtraCols = 1) {
		this._table = document.createElement("table");
		this._table.classList.add("facility-stats");

		this._section = this._table.createTHead();
		this._slaveSection = false;
		this._slaveExtraCols = slaveExtraCols;

		const row = document.createElement("tr");
		App.UI.DOM.appendNewElement("th", row, "Items").colSpan = 1 + this._slaveExtraCols;
		for (let i = 0; i < columns.length; ++i) {
			App.UI.DOM.appendNewElement("th", row, columns[i]); // additional narrow columns
		}
		this._section.append(row);
	}

	get table() {
		return this._table;
	}

	/** Starts the slave stats section
	 * @param {string} caption
	 * @param {string[]} columns - column labels
	 */
	startSlaveStatsSection(caption, columns) {
		this._slaveSection = true;
		this._section = this._table.createTBody();

		const captionRow = App.UI.DOM.appendNewElement("tr", this._section);
		const header = App.UI.DOM.appendNewElement("tr", this._section);
		App.UI.DOM.appendNewElement("th", captionRow, caption);
		App.UI.DOM.appendNewElement("th", header, columns[0]);

		for (let i = 1; i < columns.length; i++) {
			captionRow.append(document.createElement("th"));
			App.UI.DOM.appendNewElement("th", header, columns[i]);
		}
	}

	startSummarySection() {
		this._slaveSection = false;
		this._section = this._table.createTFoot();
	}

	/** Adds a value row to the current section, with the given label and value cells
	 * @param {string|Node} label
	 * @param {HTMLTableCellElement[]} valueCells
	 */
	addValueRow(label, valueCells) {
		const row = App.UI.DOM.appendNewElement("tr", this._section);
		const labelCell = App.UI.DOM.appendNewElement("td", row, label);
		if (!this._slaveSection) {
			labelCell.colSpan = 1 + this._slaveExtraCols;
		}
		for (const cell of valueCells) {
			row.append(cell);
		}
	}

	/** Makes a slave label
	 * @param {string} slaveName
	 * @param {string} customLabel
	 * @returns {Node}
	 */
	makeSlaveLabel(slaveName, customLabel) {
		if (!customLabel) {
			return document.createTextNode(slaveName);
		} else {
			const frag = document.createDocumentFragment();
			App.UI.DOM.appendNewElement("span", frag, `(${customLabel}) `, "custom-label");
			frag.append(slaveName);
			return frag;
		}
	}

	/**
	 * @typedef {object} valueFragFlags
	 * @property {"reputation"|"cash"|"food"|"milk"|"cum"|"fluid"} [type] - format the value based on type
	 * @property {boolean} [forceNeg] - treat nonzero positive values as negative
	 * @property {boolean} [showSign] - display the sign
	 * @property {boolean} [showZero] - show the value, even if it's zero
	 */

	/** Makes a value cell
	 * @param {number} value - numeric value
	 * @param {valueFragFlags} [flags]
	 * @returns {DocumentFragment}
	 */
	makeValueFrag(value, flags = {}) {
		const f = new DocumentFragment();
		if (value !== 0 || flags.showZero) {
			// set contents
			let prefix = '';
			if (flags.type === "cash") {
				prefix += '¤';
			}
			if (flags.showSign) {
				if (flags.forceNeg) { // if the real value is negative, - sign will come from commaNum
					prefix += '-';
				} else if (value > 0) {
					prefix += '+';
				} else if (value === 0) {
					prefix += '±';
				}
			}
			let fixedPrecision = 0;
			if (flags.type === "cash") {
				fixedPrecision = 2;
			} else if (flags.type === "reputation" || flags.type === "cum" || flags.type === "fluid") {
				fixedPrecision = 1;
			}
			const wholeValue = Math.trunc(value);
			App.UI.DOM.appendNewElement("span", f, prefix + commaNum(wholeValue), wholeValue === 0 ? ["decimalZero"] : undefined);
			if (fixedPrecision > 0) {
				const parts = value.toFixed(fixedPrecision).split('.');
				const decimalAllZero = /^0+$/.test(parts[1]);
				App.UI.DOM.appendNewElement("span", f, getDecimalSeparator() + parts[1],
					decimalAllZero ? ["decimalZero"] : undefined);
			}
		}
		return f;
	}

	/** Makes a value cell
	 * @param {number} value - numeric value
	 * @param {valueFragFlags} [flags]
	 * @returns {HTMLTableCellElement}
	 */
	makeValueCell(value, flags = {}) {
		const cell = App.UI.DOM.makeElement("td", this.makeValueFrag(value, flags), ["value"]);

		// style appropriately
		if (flags.type) {
			if (value < 0 || flags.forceNeg) {
				cell.classList.add(flags.type, "dec");
			} else if (value > 0) {
				cell.classList.add(flags.type, "inc");
			}
		}

		return cell;
	}

	/** Make an empty cell (for parity)
	 * @returns {HTMLTableCellElement}
	 */
	makeEmptyCell() {
		return document.createElement("td");
	}

	/** Make the customer cell (for the facility-specific slave details column)
	 * @param {number} value
	 * @returns {HTMLTableCellElement}
	 */
	makeCustomersCell(value) {
		const cell = document.createElement("td");
		cell.classList.add("value");
		if (value <= 0) {
			cell.textContent = "none";
			cell.classList.add("red");
		} else {
			cell.textContent = value.toString();
		}
		return cell;
	}
};

/** Generate the brothel statistics table
 * @param {boolean} showDetails
 * @returns {HTMLElement|DocumentFragment}
 */
App.Facilities.Brothel.Stats = function(showDetails) {
	const assureList = ["whoreIncome", "rep", "whoreCosts", "adsIncome", "maintenance", "adsCosts", "totalIncome",
		"totalExpenses", "profit"];

	if (!V.showEconomicDetails) {
		return document.createDocumentFragment();
	} else if (!V.facility || !V.facility.brothel) {
		return App.UI.DOM.makeElement("h4", `- No statistics for ${V.brothelName} gathered this week -`);
	}

	const b = V.facility.brothel;
	for (const prop of assureList) {
		b[prop] = b[prop] || 0;
	}

	let adsIncome = 0;
	if (showDetails) {
		for (const record of b.income.values()) {
			adsIncome += record.adsIncome;
		}
	}

	const H = new App.Facilities.StatsHelper(["Revenue", "Expenses", "Net Income", "Rep. Change"],
		adsIncome > 0 ? 2 : 1);

	H.addValueRow("Total whoring income", [
		H.makeValueCell(b.whoreIncome, {type: "cash"}),
		H.makeEmptyCell(),
		H.makeValueCell(b.whoreIncome, {type: "cash"}),
		H.makeValueCell(b.rep, {showSign: true, type: "reputation"})
	]);
	H.addValueRow("Total whore living costs", [
		H.makeEmptyCell(),
		H.makeValueCell(b.whoreCosts, {forceNeg: true, type: "cash"}),
		H.makeValueCell(b.whoreCosts, {forceNeg: true, showSign: true, type: "cash"}),
		H.makeEmptyCell()
	]);
	if (showDetails) {
		H.startSlaveStatsSection("Whore details", ["Whore", "Customers",
			...adsIncome > 0 ? ["Ad Revenue", "Total Revenue"] : ["Revenue"],
			"Expenses", "Net Income", "Rep. Change"]);
		for (const record of b.income.values()) {
			const revenue = record.income + record.adsIncome;
			const netIncome = revenue - record.cost;
			H.addValueRow(H.makeSlaveLabel(record.slaveName, record.customLabel), [
				H.makeCustomersCell(record.customers),
				...adsIncome > 0 ? [H.makeValueCell(record.adsIncome, {type: "cash"})] : [],
				H.makeValueCell(revenue, {type: "cash"}),
				H.makeValueCell(record.cost, {forceNeg: true, type: "cash"}),
				H.makeValueCell(netIncome, {type: "cash"}),
				H.makeValueCell(record.rep, {showSign: true, type: "reputation"})
			]);
		}
	}
	H.startSummarySection();
	if (b.adsIncome > 0) {
		H.addValueRow("Additional income", [
			H.makeValueCell(b.adsIncome, {type: "cash"}),
			H.makeEmptyCell(),
			H.makeValueCell(b.adsIncome, {type: "cash"}),
			H.makeEmptyCell()
		]);
	}
	H.addValueRow("Brothel maintenance", [
		H.makeEmptyCell(),
		H.makeValueCell(b.maintenance, {forceNeg: true, type: "cash"}),
		H.makeValueCell(b.maintenance, {forceNeg: true, showSign: true, type: "cash"}),
		H.makeEmptyCell()
	]);
	if (b.adsCosts > 0) {
		H.addValueRow("Advertising program", [
			H.makeValueCell(b.adsIncome, {type: "cash"}),
			H.makeValueCell(b.adsCosts, {forceNeg: true, type: "cash"}),
			H.makeValueCell(b.adsIncome - b.adsCosts, {type: "cash"}),
			H.makeEmptyCell()
		]);
	}
	H.addValueRow("Total", [
		H.makeValueCell(b.totalIncome, {type: "cash"}),
		H.makeValueCell(b.totalExpenses, {forceNeg: true, type: "cash"}),
		H.makeValueCell(b.profit, {type: "cash"}),
		H.makeValueCell(b.rep, {showSign: true, type: "reputation"})
	]);

	return H.table;
};

/** Generate the Club statistics table
 * @param {boolean} showDetails
 * @returns {HTMLElement|DocumentFragment}
 */
App.Facilities.Club.Stats = function(showDetails) {
	const assureList = ["whoreIncome", "rep", "whoreCosts", "adsIncome", "maintenance", "adsCosts", "totalIncome",
		"totalExpenses", "profit"];

	if (!V.showEconomicDetails) {
		return document.createDocumentFragment();
	} else if (!V.facility || !V.facility.club) {
		return App.UI.DOM.makeElement("h4", `- No statistics for ${V.clubName} gathered this week -`);
	}

	const b = V.facility.club;
	for (const prop of assureList) {
		b[prop] = b[prop] || 0;
	}

	const H = new App.Facilities.StatsHelper(["Rep. Gain", "Expenses", "Rep/Expenses", "Extra Income"]);
	H.addValueRow("Total slut rep gain", [
		H.makeValueCell(b.whoreIncome, {showSign: true, type: "reputation"}),
		H.makeEmptyCell(),
		H.makeEmptyCell(),
		H.makeValueCell(b.rep, {type: "cash"})
	]);
	H.addValueRow("Total slut living costs", [
		H.makeEmptyCell(),
		H.makeValueCell(b.whoreCosts, {forceNeg: true, type: "cash"}),
		H.makeEmptyCell(),
		H.makeEmptyCell()
	]);
	if (showDetails) {
		H.startSlaveStatsSection("Public slut details", ["Slut", "Customers", "Rep. Gain",
			"Expenses", "Rep/Expenses", "Extra Income"]);
		for (const record of b.income.values()) {
			const netIncome = record.income / record.cost;
			H.addValueRow(H.makeSlaveLabel(record.slaveName, record.customLabel), [
				H.makeCustomersCell(record.customers),
				H.makeValueCell(record.income, {showSign: true, showZero: true, type: "reputation"}),
				H.makeValueCell(record.cost, {forceNeg: true, type: "cash"}),
				makeEfficiencyCell(netIncome),
				H.makeValueCell(record.rep, {showZero: true, type: "cash"})
			]);
		}
	}
	H.startSummarySection();
	if (b.adsIncome > 0) {
		H.addValueRow("Additional rep gain", [
			H.makeValueCell(b.adsIncome, {type: "reputation"}),
			H.makeEmptyCell(),
			H.makeEmptyCell(),
			H.makeEmptyCell()
		]);
	}
	H.addValueRow("Club maintenance", [
		H.makeEmptyCell(),
		H.makeValueCell(b.maintenance, {forceNeg: true, type: "cash"}),
		H.makeEmptyCell(),
		H.makeEmptyCell()
	]);
	if (b.adsCosts > 0) {
		H.addValueRow("Advertising program", [
			H.makeEmptyCell(),
			H.makeValueCell(b.adsCosts, {forceNeg: true, type: "cash"}),
			H.makeEmptyCell(),
			H.makeEmptyCell()
		]);
	}
	H.addValueRow("Total", [
		H.makeValueCell(b.totalIncome, {showSign: true, type: "reputation"}),
		H.makeValueCell(b.totalExpenses, {forceNeg: true, type: "cash"}),
		makeEfficiencyCell(b.profit),
		H.makeValueCell(b.rep, {showZero: true, type: "cash"})
	]);

	return H.table;

	/** Make the slut efficiency cell
	 * @param {number} efficiency
	 * @returns {HTMLTableCellElement}
	 */
	function makeEfficiencyCell(efficiency) {
		const cell = document.createElement("td");
		cell.classList.add("value");
		const val = App.UI.DOM.appendNewElement("span", cell, commaNum(Math.trunc(efficiency)), ["reputation", "inc"]);
		const parts = efficiency.toFixed(2).split('.');
		App.UI.DOM.appendNewElement("span", val, getDecimalSeparator() + parts[1],
			/^0+$/.test(parts[1]) ? "decimalZero" : undefined);
		cell.append(document.createTextNode(" rep/¤"));
		return cell;
	}
};

/** Generate the arcade statistics table
 * @param {boolean} showDetails
 * @returns {HTMLElement|DocumentFragment}
 */
App.Facilities.Arcade.Stats = function(showDetails) {
	const assureList = ["whoreIncome", "rep", "whoreCosts", "maintenance", "totalIncome", "totalExpenses", "profit"];
	if (!V.showEconomicDetails) {
		return document.createDocumentFragment();
	} else if (!V.facility || !V.facility.arcade) {
		return App.UI.DOM.makeElement("h4", `- No statistics for ${V.arcadeName} gathered this week -`);
	}

	const b = V.facility.arcade;
	for (const prop of assureList) {
		b[prop] = b[prop] || 0;
	}

	const H = new App.Facilities.StatsHelper(["Revenue", "Expenses", "Net Income", "Rep. Change"]);
	H.addValueRow("Total arcade income", [
		H.makeValueCell(b.whoreIncome, {type: "cash"}),
		H.makeEmptyCell(),
		H.makeValueCell(b.whoreIncome, {type: "cash"}),
		H.makeValueCell(b.rep, {showSign: true, type: "reputation"})
	]);
	H.addValueRow("Total fuckmeat living costs", [
		H.makeEmptyCell(),
		H.makeValueCell(b.whoreCosts, {forceNeg: true, type: "cash"}),
		H.makeValueCell(b.whoreCosts, {forceNeg: true, showSign: true, type: "cash"}),
		H.makeEmptyCell()
	]);
	if (showDetails) {
		H.startSlaveStatsSection("Fuckmeat details", ["Fuckmeat", "Customers", "Revenue",
			"Expenses", "Net Income", "Rep. Change"]);
		for (const record of b.income.values()) {
			const revenue = record.income + record.adsIncome;
			const netIncome = revenue - record.cost;
			H.addValueRow(H.makeSlaveLabel(record.slaveName, record.customLabel), [
				H.makeCustomersCell(record.customers),
				H.makeValueCell(revenue, {type: "cash"}),
				H.makeValueCell(record.cost, {forceNeg: true, type: "cash"}),
				H.makeValueCell(netIncome, {type: "cash"}),
				H.makeValueCell(record.rep, {showSign: true, type: "reputation"})
			]);
		}
	}
	H.startSummarySection();
	H.addValueRow("Arcade maintenance", [
		H.makeEmptyCell(),
		H.makeValueCell(b.maintenance, {forceNeg: true, type: "cash"}),
		H.makeValueCell(b.maintenance, {forceNeg: true, showSign: true, type: "cash"}),
		H.makeEmptyCell()
	]);
	H.addValueRow("Total", [
		H.makeValueCell(b.totalIncome, {type: "cash"}),
		H.makeValueCell(b.totalExpenses, {forceNeg: true, type: "cash"}),
		H.makeValueCell(b.profit, {type: "cash"}),
		H.makeValueCell(b.rep, {showSign: true, type: "reputation"})
	]);

	return H.table;
};

/** Generate the arcade statistics table
 * @param {boolean} showDetails
 * @returns {HTMLElement|DocumentFragment}
 */
App.Facilities.Dairy.Stats = function(showDetails) {
	const assureList = ["whoreIncome", "whoreCosts", "maintenance", "totalIncome", "totalExpenses", "profit"];

	if (!V.showEconomicDetails) {
		return document.createDocumentFragment();
	} else if (!V.facility || !V.facility.dairy) {
		return App.UI.DOM.makeElement("h4", `- No statistics for ${V.dairyName} gathered this week -`);
	}

	const b = V.facility.dairy;
	for (const prop of assureList) {
		b[prop] = b[prop] || 0;
	}

	const H = new App.Facilities.StatsHelper(["Revenue", "Expenses", "Net Income", "Rep. Change"], 3);
	H.addValueRow("Total cow income", [
		H.makeValueCell(b.whoreIncome, {type: "cash"}),
		H.makeEmptyCell(),
		H.makeValueCell(b.whoreIncome, {type: "cash"}),
		H.makeEmptyCell(),
	]);
	H.addValueRow("Total cow living costs", [
		H.makeEmptyCell(),
		H.makeValueCell(b.whoreCosts, {forceNeg: true, type: "cash"}),
		H.makeValueCell(b.whoreCosts, {forceNeg: true, showSign: true, type: "cash"}),
		H.makeEmptyCell()
	]);
	if (showDetails) {
		H.startSlaveStatsSection("Cow details", ["Cow", "Milk [L]", "Cum [L]", "Fluids [L]", "Revenue",
			"Expenses", "Net Income", "Rep. Change"]);
		for (const record of b.income.values()) {
			const netIncome = record.income - record.cost;
			H.addValueRow(H.makeSlaveLabel(record.slaveName, record.customLabel), [
				H.makeValueCell(record.milk, {showZero: true, type: "milk"}),
				H.makeValueCell(record.cum * 0.1, {showZero: true, type: "cum"}),
				H.makeValueCell(record.fluid * 0.1, {showZero: true, type: "fluid"}),
				H.makeValueCell(record.income, {type: "cash"}),
				H.makeValueCell(record.cost, {forceNeg: true, type: "cash"}),
				H.makeValueCell(netIncome, {type: "cash"}),
				H.makeEmptyCell()
			]);
		}
	}
	H.startSummarySection();
	H.addValueRow("Dairy maintenance", [
		H.makeEmptyCell(),
		H.makeValueCell(b.maintenance, {forceNeg: true, type: "cash"}),
		H.makeValueCell(b.maintenance, {forceNeg: true, showSign: true, type: "cash"}),
		H.makeEmptyCell()
	]);
	H.addValueRow("Total", [
		H.makeValueCell(b.totalIncome, {type: "cash"}),
		H.makeValueCell(b.totalExpenses, {forceNeg: true, type: "cash"}),
		H.makeValueCell(b.profit, {type: "cash"}),
		H.makeEmptyCell()
	]);

	return H.table;
};

/** Generate the Farmyard statistics table
 * @param {boolean} showDetails
 * @returns {HTMLElement|DocumentFragment}
 */
App.Facilities.Farmyard.Stats = function(showDetails) {
	const assureList = ["whoreIncome", "whoreCosts", "maintenance", "totalIncome", "totalExpenses", "food", "profit"];

	if (!V.showEconomicDetails) {
		return document.createDocumentFragment();
	} else if (!V.facility || !V.facility.farmyard) {
		return App.UI.DOM.makeElement("h4", `- No statistics for ${V.farmyardName} gathered this week -`);
	}

	const b = V.facility.farmyard;
	for (const prop of assureList) {
		b[prop] = b[prop] || 0;
	}

	const H = new App.Facilities.StatsHelper(["Revenue", "Expenses", "Food [kg]", "Net Income", "Rep. Change"]);
	H.addValueRow("Total farmhand income", [
		H.makeValueCell(b.whoreIncome, {type: "cash"}),
		H.makeEmptyCell(),
		H.makeEmptyCell(),
		H.makeValueCell(b.whoreIncome, {type: "cash"}),
		H.makeEmptyCell(),
	]);
	H.addValueRow("Total farmhand living costs", [
		H.makeEmptyCell(),
		H.makeValueCell(b.whoreCosts, {forceNeg: true, type: "cash"}),
		H.makeEmptyCell(),
		H.makeValueCell(b.whoreCosts, {forceNeg: true, showSign: true, type: "cash"}),
		H.makeEmptyCell()
	]);
	H.addValueRow("Total food produced", [
		H.makeEmptyCell(),
		H.makeEmptyCell(),
		H.makeValueCell(b.food, {type: "food"}),
		H.makeValueCell(b.food, {type: "food"}),
		H.makeEmptyCell()
	]);
	if (showDetails) {
		H.startSlaveStatsSection("Farmhand details", ["Farmhand", "Revenue", "Expenses",
			"Food [kg]", "Net Income", "Rep. Change"]);
		for (const record of b.income.values()) {
			const netIncome = record.income - record.cost;
			H.addValueRow(H.makeSlaveLabel(record.slaveName, record.customLabel), [
				H.makeValueCell(record.income, {type: "cash"}),
				H.makeValueCell(record.cost, {forceNeg: true, type: "cash"}),
				H.makeValueCell(record.food, {type: "food"}),
				H.makeValueCell(netIncome, {type: "cash"}),
				H.makeEmptyCell()
			]);
		}
	}
	H.addValueRow("Farmyard maintenance", [
		H.makeEmptyCell(),
		H.makeValueCell(b.maintenance, {forceNeg: true, type: "cash"}),
		H.makeEmptyCell(),
		H.makeValueCell(b.maintenance, {forceNeg: true, showSign: true, type: "cash"}),
		H.makeEmptyCell()
	]);
	H.addValueRow("Total", [
		H.makeValueCell(b.totalIncome, {type: "cash"}),
		H.makeValueCell(b.totalExpenses, {forceNeg: true, type: "cash"}),
		H.makeValueCell(b.food, {type: "food"}),
		H.makeValueCell(b.profit, {type: "cash"}),
		H.makeEmptyCell()
	]);

	return H.table;
};
