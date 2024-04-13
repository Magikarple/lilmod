App.Corporate.Shared.averageRange = class {
	constructor({center, range}) {
		this._const = {
			center,
			range
		};
	}

	get center() { return this._const.center; }

	get range() { return this._const.range; }

	roll() {
		let roll = Math.clamp(gaussianPair(0, 0.2)[0], -0.5, 0.5);
		return {roll, value: (roll * this.range) + this.center};
	}

	rollInt() {
		let retval = this.roll();
		retval.value = Math.trunc(retval.value);
		return retval;
	}
};

App.Corporate.Shared.RelatedDivisionType = class {
	constructor() {
		this._var = {
			to: [],
			from: [],
			all: []
		};
	}

	get to() { return this._var.to; }

	get from() { return this._var.from; }

	get all() { return this._var.all; }

	addTo(value) {
		this._var.to.push(value);
		this._var.all.push(value);
	}

	addFrom(value) {
		this._var.from.push(value);
		this._var.all.push(value);
	}

	get anyFounded() { return this.all.some(div => div.founded); }
};
App.Corporate.Shared.FoundingType = class {
	constructor(division, {corporateCash, startingSize = 10}) {
		this._const = {
			division,
			cash: corporateCash,
			size: startingSize
		};
	}

	get cash() { return this._const.cash; }

	get size() { return this._const.size; }

	get startingPrice() {
		let div = this._const.division;
		return this._const.cash + div.foundingCost;
	}
};
App.Corporate.Shared.SellOverflowSlaves = function(division) {
	const slavesToSell = division.activeSlaves - division.developmentCount;
	if (slavesToSell > 0) {
		const slaveProcCost = Math.trunc(App.Corporate.slaveMarketPurchaseValue(division, -slavesToSell));
		App.Corporate.chargeAsset(slaveProcCost, "slaves");
		division.activeSlaves -= slavesToSell;
		V.menialDemandFactor -= slavesToSell;
	}
};
App.Corporate.Shared.SellUnhousedSlaves = function(division, divLedger, rate) {
	if (divLedger.market.sell != 0) {
		return;
	}

	let housing = Math.trunc(2 * rate * division.developmentCount);
	let unhoused = division.heldSlaves - housing - divLedger.transfer.total;
	if (unhoused <= 0) {
		return;
	}

	divLedger.market.sell = unhoused;
};
App.Corporate.Shared.MessageProcessedSlaves = function(division, verbPhrase, color) {
	let procCount = Math.trunc(division.developmentCount * division.processRate);
	let slaveCountedNoun = numberWithPluralNonZero(procCount, "slave");

	return `It ${verbPhrase} approximately <span class="${color}">${slaveCountedNoun}</span> each week when operating at capacity (${division.developmentCount})`;
};
App.Corporate.Shared.MessageSlaveToMarket = function(division) {
	return `The slaves from this division can be sold for <span class='yellowgreen'>${cashFormat(Math.trunc(division.soldSlaveValue * menialSlaveCost()))}</span> each.`;
};
App.Corporate.Shared.EndWeekProcessing_Slaves = function(processingCount, rate) {
	const perDevPair = rate.roll();
	let slaveIncrease = perDevPair.value * processingCount;
	if (slaveIncrease < 1) {
		slaveIncrease = (slaveIncrease > Math.random() ? 1 : 0);
	}
	return {efficiency: perDevPair.roll, value: Math.trunc(slaveIncrease)};
};
App.Corporate.Shared.FoundingSetupAutoBuy = function(division) {
	let foundedFrom = division.relatedDivisions.from.filter(div => div.founded);
	if (foundedFrom.length === 0) {
		division.setAutoBuyFromMarket(true);
	} else {
		for (let otherDiv of foundedFrom) {
			if (otherDiv.getAutoSendToMarket()) {
				otherDiv.setAutoSendToDivision(division, true);
			}
		}
	}
};
App.Corporate.Shared.FoundingSetupAutoSell = function(division) {
	let foundedTo = division.relatedDivisions.to.filter(div => div.founded);
	if (foundedTo.length === 0) {
		division.setAutoSendToMarket(true);
	} else {
		for (let otherDiv of foundedTo) {
			if (otherDiv.getAutoBuyFromMarket()) {
				division.setAutoSendToDivision(otherDiv, true);
			}
		}
	}
};

App.Corporate.Division.Base = class {
	constructor({id, name, focusDescription, sizeCost, maintenance, founding, merger}) {
		this._const = {};
		this._const.id = id;
		this._const.corpId = `Div${capFirstChar(id)}`;
		this._const.cost = sizeCost;
		this._const.name = name;
		this._const.focusDescription = focusDescription;
		this._const.maintenance = {
			quadratic: maintenance.quadratic,
			linear: maintenance.linear,
			category: maintenance.category
		};
		if (founding != null) {
			this._const.founding = new App.Corporate.Shared.FoundingType(this, founding);
		}
		if (merger != null && _.isObject(merger) || (Array.isArray(merger) && merger.length > 0)) {
			if (!Array.isArray(merger)) {
				merger = [merger];
			}
			this._const.merger = merger;
		}
		this.relatedDivisions = new App.Corporate.Shared.RelatedDivisionType();
	}

	// initialized data
	get id() { return this._const.id; }

	get sizeCost() { return this._const.cost; }

	get name() { return this._const.name; }

	get focusDescription() { return this._const.focusDescription; }

	get founding() { return this._const.founding; }

	get nextDivisions() { return null; }

	get hasMergers() { return this._const.merger != null; }

	get mergerChoices() { return this._const.merger; }

	get maintenanceCategory() { return this._const.maintenance.category; }

	// stored variables
	get founded() { return this.getStored('') == 1; }

	get foundedDate() { return this.getStored('Founded'); }

	get developmentCount() { return this.getStored("Dev"); }

	set developmentCount(value) {
		if (value < 0) {
			throw Error("Cannot set development count to less than 0");
		}
		// dissolve is the only function that sets founded to false.
		if (value === 0 && this.founded) {
			throw Error("Cannot set development count to 0; use dissolve instead.");
		}
		this.setStored("Dev", value);
	}

	// calculated
	get availableRoom() { return Math.max(0, this.developmentCount - this.activeSlaves); }

	get maintenanceCost() {
		return Math.trunc(this._const.maintenance.linear * 1000 * this.developmentCount + this._const.maintenance.quadratic * Math.pow(this.activeSlaves, 2));
	}

	get foundingCostDivision() { return this._const.founding.size * this.sizeCost; }

	get foundingCost() { return this.foundingCostDivision; }

	get canFoundCorporation() { return this._const.founding != null; }

	get foundingCash() {
		if (!this.canFoundCorporation) {
			throw Error(`${this.name} is not set up found a corporation`);
		}
		return 1000 * this._const.founding.startingPrice;
	}

	get value() {
		const developmentValue = this.developmentCount * this.sizeCost * 800;
		let slaveProcValue = 0;
		let slaveHeldValue = 0;

		if (this.activeSlaves > 0) {
			slaveProcValue = this.activeSlaves * this.purchasedSlaveValue * 1000;
		}
		if (this.heldSlaves > 0) {
			slaveHeldValue = this.heldSlaves * this.soldSlaveValue * 1000;
		}

		return developmentValue + slaveProcValue + slaveHeldValue;
	}

	/**
	 * @abstract
	 * @returns {boolean}
	 */
	get fromMarket() { throw Error("Must be defined"); }

	/**
	 * @abstract
	 * @returns {boolean}
	 */
	get toMarket() { throw Error("Must be defined"); }

	/**
	 * @abstract
	 * @returns {number}
	 */
	get heldSlaves() { throw Error("Must be defined"); }

	/**
	 * @abstract
	 * @param {number} value
	 */
	set heldSlaves(value) { throw Error("Must be defined"); }

	/**
	 * @abstract
	 * @returns {number}
	 */
	get activeSlaves() { throw Error("Must be defined"); }

	/**
	 * @abstract
	 * @param {number} value
	 */
	set activeSlaves(value) { throw Error("Must be defined"); }

	/**
	 * @abstract
	 * @returns {number}
	 */
	get processRate() { throw Error("Must be defined"); }

	/**
	 * @abstract
	 * @returns {number}
	 */
	get initialSlaveValue() { throw Error("Must be defined"); }

	/**
	 * @abstract
	 * @returns {number}
	 */
	get soldSlaveValue() { throw Error("Must be defined"); }

	/**
	 * @abstract
	 * @returns {string}
	 */
	get slaveAction() { throw Error("Must be defined"); }

	/**
	 * @abstract
	 * @returns {string}
	 */
	get nounFinishedSlave() { throw Error("Must be defined"); }

	/**
	 * @abstract
	 * @returns {string}
	 */
	get nounSlaveFromMarket() { throw Error("Must be defined"); }

	/**
	 * @abstract
	 * @returns {string}
	 */
	messageSlaveCount() { throw Error("Must be defined"); }

	/**
	 * @abstract
	 * @returns {string}
	 */
	messageSlaveOutput() { throw Error("Must be defined"); }

	/**
	 * @abstract
	 * @param {object} divLedger
	 * @returns {string}
	 */
	message_endWeek_Slaves(divLedger) { throw Error("Must be defined"); }

	/**
	 * @abstract
	 * @param {object} ledger
	 * @param {object} divLedger
	 * @returns {string}
	 */
	endWeek_Slaves(ledger, divLedger) { throw Error("Must be defined"); }

	/**
	 * The value of a slave ignoring enhancements from founded divisions
	 * The actual value of a slave after all improvements
	 * @returns {number}
	 */
	get purchasedSlaveValue() {
		let cheapest = {'value': Number.MAX_VALUE, 'div': null};
		let expensive = {'value': 0, 'div': null};
		for (let fromDiv of this.relatedDivisions.from) {
			let initialValue = fromDiv.initialSlaveValue;
			if (initialValue < cheapest.value) {
				cheapest.value = initialValue;
				cheapest.div = fromDiv;
			}
			if (fromDiv.founded) {
				let soldValue = fromDiv.soldSlaveValue;
				if (soldValue > expensive.value) {
					expensive.value = soldValue;
					expensive.div = fromDiv;
				}
			}
		}
		if (expensive.div != null && expensive.value != cheapest.value) {
			// The added value of an owned intermediary takes time to work its way through this division to the next
			let expensiveDiv = expensive.div;
			let valueDiff = expensive.value - cheapest.value;
			let weeksSinceFounding = V.week - (expensiveDiv.foundedDate || 0);
			let weeksToProcess = 10 * expensiveDiv.processRate;
			let multiplier = Math.min(weeksSinceFounding / weeksToProcess, 1);
			let finalAddedValue = valueDiff * multiplier;
			return cheapest.value + finalAddedValue;
		} else if (cheapest.div != null) {
			return cheapest.value;
		}
		throw Error("No route to acquisition found.");
	}

	/**
	 * @returns {number}
	 */
	get maintenanceSlaves() { return this.activeSlaves * this.processRate; }

	/**
	 * @returns {{cost: number, perUnit: number}}
	 */
	getDisplayMaintenanceCost() {
		const cost = this.maintenanceCost;
		const processedCount = this.maintenanceSlaves;

		return {cost, perUnit: cost / processedCount};
	}

	/**
	 * @param {App.Corporate.Division.Base} division
	 * @returns {boolean}
	 */
	getAutoSendToDivision(division) {
		return (!App.Corporate.ownsIntermediaryDivision(this, division) && this.getStored(`To${division.id}`) === 1);
	}

	/**
	 * @param {App.Corporate.Division.Base} division
	 * @param {boolean} value
	 */
	setAutoSendToDivision(division, value) {
		this.setStored(`To${division.id}`, value ? 1 : 0);
	}

	/**
	 * @returns {boolean}
	 */
	getAutoSendToMarket() {
		return !!this.getStored("ToMarket");
	}

	/**
	 * @param {boolean} value
	 */
	setAutoSendToMarket(value) {
		this.setStored("ToMarket", value ? 1 : 0);
	}

	/**
	 * @returns {boolean}
	 */
	getAutoBuyFromMarket() {
		return !!this.getStored("FromMarket");
	}

	/**
	 * @param {boolean} value
	 */
	setAutoBuyFromMarket(value) {
		this.setStored("FromMarket", value ? 1 : 0);
	}

	/**
	 * @param {object} divLedger
	 */
	endweek_Revenue(divLedger) {
		// Unless otherwise specified, divisions don't produce revenue directly.
	}

	/**
	 * @param {object} divLedger
	 */
	endWeek_Transfer(divLedger) {
		let divisions = [];
		for (let otherDiv of this.relatedDivisions.to.filter(div => div.founded && this.getAutoSendToDivision(div))) {
			const otherLedger = divLedger.weekLedger.getDivision(otherDiv);

			const room = otherDiv.availableRoom - otherLedger.transfer.in;
			if (room === 0) {
				continue;
			}
			divisions.push({division: otherDiv, room});
		}
		const fillDivisions = evenFillArray(divisions, this.heldSlaves, pair => pair.room);
		for (const filled of fillDivisions) {
			const division = filled.item.division;
			const value = filled.value;
			divLedger.transfer.addDivision(division, value);
		}
	}

	/**
	 * @param {object} divLedger
	 */
	endWeek_Market(divLedger) {
		if (this.getAutoSendToMarket()) {
			divLedger.market.sell = this.heldSlaves - divLedger.transfer.total;
		}
		if (this.getAutoBuyFromMarket()) {
			divLedger.market.buy = this.availableRoom - divLedger.transfer.in;
		}
		App.Corporate.Shared.SellUnhousedSlaves(this, divLedger, this.processRate);
	}

	create() {
		if (this.founded) {
			throw Error(`${this.name} has already been founded.`);
		}

		App.Corporate.expandedDivision();
		App.Corporate.chargeAsset(this.foundingCostDivision * 1000, "development");
		this.setStored('', 1);
		this.developmentCount = this._const.founding.size;
		this.setStored('Founded', V.week);
	}

	dissolve() {
		this.setStored('', 0);
		App.Corporate.sellDevelopment(this);
		App.Corporate.dissolvedDivision();
		this.relatedDivisions.to.forEach(nextDep => delete V.corp[`${this._const.corpId}To${nextDep.id}`]);
	}

	// private helpers
	/**
	 * @param {string} key
	 * @returns {*}
	 */
	getStored(key) { return V.corp[this._const.corpId + key]; }

	/**
	 * @param {string} key
	 * @param {*} value
	 */
	setStored(key, value) { V.corp[this._const.corpId + key] = value; }
};
