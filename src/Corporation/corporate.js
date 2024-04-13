App.Corporate.Init = function() {
	const Ledger = class {
		constructor(corp, suffix = "") {
			this.corp = corp;
			this.suffix = suffix;
		}
		get operations() { return this.getStored('OpCost'); }
		set operations(value) { this.setStored('OpCost', value); }

		get localRevenue() { return this.getStored('Rev'); }
		set localRevenue(value) { this.setStored('Rev', value); }

		get development() { return this.getStored('AssetsDev'); }
		set development(value) { this.setStored('AssetsDev', value); }

		get slaves() { return this.getStored('AssetsSlave'); }
		set slaves(value) { this.setStored('AssetsSlave', value); }

		get overhead() { return this.getStored('Overhead'); }
		set overhead(value) { this.setStored('Overhead', value); }

		get economicBoost() { return this.getStored('EconBonus'); }
		set economicBoost(value) { this.setStored('EconBonus', value); }

		get economy() { return this.getStored('Econ'); }
		set economy(value) { this.setStored('Econ', value); }

		get foreignRevenue() { return this.getStored('NeighborBonus'); }
		set foreignRevenue(value) { this.setStored('NeighborBonus', value); }

		copy(ledger) {
			this.operations = ledger.operations;
			this.localRevenue = ledger.localRevenue;
			this.foreignRevenue = ledger.foreignRevenue;
			this.development = ledger.development;
			this.slaves = ledger.slaves;
			this.overhead = ledger.overhead;
			this.economicBoost = ledger.economicBoost;
			this.economy = ledger.economy;
		}
		clear() {
			this.operations = 0;
			this.localRevenue = 0;
			this.foreignRevenue = 0;
			this.development = 0;
			this.slaves = 0;
			this.overhead = 0;
			this.economicBoost = 0;
			this.economy = 0;
		}
		release() {
			this.deleteStored('OpCost');
			this.deleteStored('Rev');
			this.deleteStored('AssetsDev');
			this.deleteStored('AssetsSlave');
			this.deleteStored('Overhead');
			this.deleteStored('EconBonus');
			this.deleteStored('Econ');
			this.deleteStored('NeighborBonus');
		}
		get profit() {
			return this.revenue + this.economicBoost -
this.development - this.slaves - this.overhead - this.operations;
		}
		get revenue() {
			return this.localRevenue + this.foreignRevenue;
		}
		setEconomy(economy) {
			this.economy = economy;

			// NOTE: Set economicBoost to 0 so it doesn't affect this.profit!
			this.economicBoost = 0; // <-- DO NOT delete
			this.economicBoost = Math.trunc(this.profit * (economy - 100) / 100);
		}
		// private access
		getStored(key) {
			return this.corp.getStored(key + this.suffix);
		}
		setStored(key, value) {
			return this.corp.setStored(key + this.suffix, value);
		}
		deleteStored(key) {
			this.corp.deleteStored(key + this.suffix);
		}
	};
	const typeHiddenMembers = class {
		constructor() {
			this._const = {};
			this._var = {};
			this._cache = {};
		}
	};
	const WeekProcessingEfficiencyLine = class {
		constructor() {
			this.value = 0;
			this.efficiency = 0;
		}
		apply(pair) {
			this.value = pair.value;
			this.efficiency = pair.efficiency;
		}
	};
	const WeekProcessingTransfer = class extends typeHiddenMembers {
		constructor(divLedger) {
			super();
			this._const.divLedger = divLedger;
			this._var.divisions = [];
			this._var.in = 0;
			this._var.out = 0;
		}
		addDivision(division, fill) {
			const otherLedger = this._const.divLedger.weekLedger.getDivision(division);

			this._var.out += fill;
			otherLedger.transfer.in += fill;

			this._var.divisions.push({division, fill});
		}
		get in() {
			return this._var.in;
		}
		set in(value) {
			if (value == this._var.in) { return; }
			if (this._const.divLedger.market.canBuy) {
				this._const.divLedger.market.buy -= value - this._var.in;
			}
			this._var.in = value;
		}
		get total() {
			return this._var.out;
		}
		get divisions() {
			return this._var.divisions;
		}
	};
	const WeekProcessingMarket = class extends typeHiddenMembers {
		constructor(divLedger) {
			super();

			this._const.divLedger = divLedger;
			this._var.canBuy = false;
			this._var.buy = 0;
			this._var.sell = 0;
		}
		get buy() {
			return this._var.buy;
		}
		set buy(value) {
			// Note: canBuy merely means we've set buy to some value, even 0.
			// Setting to 0 after setting to another value happens when we tried to buy some number, but couldn't afford it.
			this._var.canBuy = true;
			this._var.buy = value;
			this._cache.buyValue = null;
		}
		get sell() {
			return this._var.sell;
		}
		set sell(value) {
			this._var.sell = value;
			this._cache.sellValue = null;
		}
		get sellValue() {
			if (this._cache.sellValue == null) { this._cache.sellValue = App.Corporate.slaveMarketSellValue(this.division, this.sell); }
			return this._cache.sellValue;
		}
		get buyValue() {
			if (this._cache.buyValue == null) { this._cache.buyValue = App.Corporate.slaveMarketPurchaseValue(this.division, this.buy); }
			return this._cache.buyValue;
		}
		get canBuy() {
			return this._var.canBuy;
		}

		get divisionLedger() {
			return this._const.divLedger;
		}
		get division() {
			return this.divisionLedger.division;
		}
	};
	const WeekProcessingDivision = class extends typeHiddenMembers {
		constructor(division, weekLedger) {
			super();

			this._const.division = division;
			this._const.ledger = weekLedger;
			this._var.slaves = new WeekProcessingEfficiencyLine();
			this._var.revenue = new WeekProcessingEfficiencyLine();
			this._var.transfer = new WeekProcessingTransfer(this);
			this._var.market = new WeekProcessingMarket(this);
		}
		get slaves() {
			return this._var.slaves;
		}
		get revenue() {
			return this._var.revenue;
		}
		get transfer() {
			return this._var.transfer;
		}
		get market() {
			return this._var.market;
		}
		get division() {
			return this._const.division;
		}
		get weekLedger() {
			return this._const.ledger;
		}
	};
	const WeekProcessingOverheadCategory = class extends typeHiddenMembers {
		constructor(categoryId) {
			super();

			this._const.category = App.Corporate.maintenance.divisionCategories[categoryId];
			if (this._const.category == null) { throw Error("Invalid category id: " + categoryId); }
			this._var.divisions = [];
		}
		addDivision(division) {
			this._var.divisions.push(division);
		}
		get cost() {
			const category = this._const.category;
			const ownedDivisionCount = this._var.divisions.length - category.freeDivisions;
			const developmentCount = this._var.divisions.reduce((r, div) => r + div.developmentCount, 0) - category.freeDevelopment;

			const divisionCost = Math.trunc(Math.pow(Math.max(ownedDivisionCount, 0), 2) * category.divisionCost );
			const developmentCost = Math.trunc(Math.pow(Math.max(developmentCount, 0), 2) * category.developmentCost);

			return divisionCost + developmentCost;
		}
	};
	const WeekProcessingLedger = class extends typeHiddenMembers {
		constructor() {
			super();

			this._var.divisions = {};
			this._var.maintenanceCategories = {};
			this._var.operatingCost = 0;
			this._var.canExpandNow = false;
			this._var.canSpecializeNow = false;
			this._var.dividend = 0;
			this._var.payout = 0;
		}

		getDivision(division) {
			if (!(division.id in this._var.divisions)) {
				this._var.divisions[division.id] = new WeekProcessingDivision(division, this);
			}
			return this._var.divisions[division.id];
		}
		get divisionLedgers() {
			return this._var.divisions;
		}

		registerMaintenanceForDivision(division) {
			let categoryId = division.maintenanceCategory;
			if (!(categoryId in this._var.maintenanceCategories)) {
				this._var.maintenanceCategories[categoryId] = new WeekProcessingOverheadCategory(categoryId);
			}
			let category = this._var.maintenanceCategories[categoryId];
			category.addDivision(division);
		}
		get maintenanceCategories() {
			return this._var.maintenanceCategories;
		}

		get operatingCost() {
			return this._var.operatingCost;
		}
		set operatingCost(value) {
			if (!Number.isFinite(value)) { throw Error("Operating cost wasn't finite "); }
			this._var.operatingCost = Math.trunc(value);
		}
		get overhead() {
			const divCount = App.Corporate.getStored("Div");
			if (divCount <= 1 || V.corp.disableOverhead) { return 0; }

			const divisionOverhead = Object.values(this.maintenanceCategories).reduce((r, categoryLedger) => r + categoryLedger.cost, 0);
			const maintenanceInfo = App.Corporate.maintenance.corporate;
			let corpOverhead = Math.pow(Math.max(divCount - maintenanceInfo.freeDivisions, 0), 2) * maintenanceInfo.divisionCost;
			let retval = (divisionOverhead + corpOverhead) * 1 - (5 - V.baseDifficulty) / 8;
			return Math.trunc(retval);
		}
		get canExpandNow() { return this._var.canExpandNow; }
		set canExpandNow(value) { this._var.canExpandNow = value; }

		get hasDividend() { return this._var.dividend > 0; }
		get dividend() { return this._var.dividend; }
		set dividend(value) { this._var.dividend = value; }

		get hasPayout() { return this._var.payout > 0; }
		get payout() { return this._var.payout; }
		set payout(value) { this._var.payout = value; }

		get canSpecializeNow() { return this._var.canSpecializeNow; }
		set canSpecializeNow(value) { this._var.canSpecializeNow = value; }
	};

	App.Corporate.InitConstants();
	let divisions = App.Corporate.divisions = mapIdList(App.Corporate.divisionList);
	App.Corporate.maintenance.divisionCategories = mapIdList(App.Corporate.maintenance.divisionCategoriesList);

	for (const divInfo of App.Corporate.divisionList.filter(div=>div.nextDivisions != null)) {
		const div = divisions[divInfo.id];
		for (const nextDepId of divInfo.nextDivisions) {
			let nextDiv = divisions[nextDepId];
			div.relatedDivisions.addTo(nextDiv);
			nextDiv.relatedDivisions.addFrom(div);
		}
	}

	const SharesType = class {
		get personal() { return V.personalShares; }
		set personal(value) { V.personalShares = value; }
		get public() { return V.publicShares; }
		set public(value) { V.publicShares = value; }
		get total() { return this.personal + this.public; }
	};
	App.Corporate.shares = new SharesType();
	App.Corporate.ledger = {
		current: new Ledger(App.Corporate),
		old: new Ledger(App.Corporate, "Old"),
		swap: function() {
			this.old.copy(this.current);
			this.current.clear();
		},
		clear: function() {
			this.old.clear();
			this.current.clear();
		},
		release: function() {
			this.old.release();
			this.current.release();
		}
	};

	App.Corporate.endWeek = function() {
		let ledger = new WeekProcessingLedger();
		// Prepare requests
		for (let div of App.Corporate.divisionList.filter(div=>div.founded)) {
			let divLedger = ledger.getDivision(div);

			ledger.operatingCost += div.maintenanceCost;
			ledger.registerMaintenanceForDivision(div);

			div.endweek_Revenue(divLedger);
			div.endWeek_Slaves(divLedger);
		}
		for (let divLedger of Object.values(ledger.divisionLedgers)) {
			let div = divLedger.division;
			div.endWeek_Transfer(divLedger);
			div.endWeek_Market(divLedger);
		}
		App.Corporate.chargeAsset(ledger.operatingCost, "operations");
		App.Corporate.chargeAsset(ledger.overhead, "overhead");
		// Execute sales requests, transfers, and earned revenue
		for (let divLedger of Object.values(ledger.divisionLedgers)) {
			let div = divLedger.division;
			App.Corporate.earnRevenue(divLedger.revenue.value, "local");
			if (div.activeSlaves > 0) {
				App.Corporate.Shared.SellOverflowSlaves(div);
			}

			for (let otherDivPair of divLedger.transfer.divisions) {
				let otherDiv = otherDivPair.division;
				let count = otherDivPair.fill;
				if (count == 0) { continue; }

				App.Corporate.transferSlaves(div, otherDiv, count);
			}
			if (divLedger.market.sell > 0) {
				divLedger.market.finalSale = App.Corporate.sellSlaves(div, divLedger.market.sell);
			}
		}

		// Execute purchase requests
		// TODO: Make a switch to allow the user to control purchasing behavior.
		// TODO: Expensive first
		// TODO: Cheapest first
		// Even purchase requests:
		let purchaseValues = evenFillArray(Object.values(ledger.divisionLedgers)
			.filter(divLedger=>divLedger.market.buy > 0)
		, App.Corporate.getStored("Cash")
		, divLedger=>divLedger.market.buyValue);
		for (let divLedgerPair of purchaseValues) {
			let divLedger = divLedgerPair.item;
			let purchaseCost = divLedgerPair.value;
			let div = divLedger.division;

			if (divLedger.market.buyValue > purchaseCost) {
				// Estimate how many slaves we can afford within the purchase cost
				let perSlaveEstimate = Math.trunc(divLedger.market.buyValue / divLedger.market.buy);
				let numSlavesEstimate = Math.trunc(purchaseCost / perSlaveEstimate);

				if (numSlavesEstimate < 1) {
					divLedger.market.originalBuy = divLedger.market.buy;
					divLedger.market.buyShortMoney = divLedger.market.buyValue;
					divLedger.market.buyShortSlaves = divLedger.market.buy;
					divLedger.market.buy = 0;
				} else {
					divLedger.market.originalBuy = divLedger.market.buy;
					divLedger.market.buyShortMoney = divLedger.market.buyValue - purchaseCost;
					divLedger.market.buyShortSlaves = divLedger.market.buy - numSlavesEstimate;
					divLedger.market.buy = numSlavesEstimate;
				}
			}
			divLedger.market.finalPurchase = App.Corporate.buySlaves(div, divLedger.market.buy);
		}
		App.Corporate.creditEconomy();

		if (App.Corporate.getStored("Div") < App.Corporate.divisionList.length && App.Corporate.getStored("ExpandToken") === 0) {
			let expansionValue = Math.trunc(Math.pow(App.Corporate.getStored("Div"), 1.5) + (5 * App.Corporate.getStored("Div") + 2) / 4);
			if (App.Corporate.calculateValue() > expansionValue * 1000000) {
				ledger.canExpandNow = true;
				App.Corporate.setStored("ExpandToken", 1);
			}
		}
		let specializationExpansion = 1.6 * Math.pow(1.25, App.Corporate.getStored("Spec")) - 1.2;
		if (App.Corporate.calculateValue() > specializationExpansion * 1000000) {
			App.Corporate.setStored("SpecToken", App.Corporate.getStored("SpecToken") + 1);
			App.Corporate.setStored("Spec", App.Corporate.getStored("Spec") + 1);
			ledger.canSpecializeNow = true;
		}
		if (App.Corporate.getStored("SpecTimer") > 0) {
			App.Corporate.setStored("SpecTimer", App.Corporate.getStored("SpecTimer") - 1);
		}
		App.Corporate.calculateDividend(ledger);

		return ledger;
	};
};
