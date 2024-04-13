globalThis.evenFillArray = function(array, amount, lookupAmount) {
	let perItem;
	let changed;
	let retval = [];
	do {
		let newArray = [];
		changed = false;
		perItem = Math.trunc(amount / array.length);
		for (let item of array) {
			let itemValue = lookupAmount(item);
			if (itemValue >= perItem) {
				newArray.push(item);
				continue;
			}

			amount -= itemValue;
			retval.push({item, value: itemValue});
			changed = true;
		}
		array = newArray;
	} while (changed);
	let remainder = amount % array.length;
	for (let item of array) {
		let extra = 0;
		if (remainder > 0) {
			remainder--;
			extra = 1;
		}
		retval.push({item, value: perItem + extra});
	}
	return retval;
};

App.Corporate.getStored = function(key) { return V.corp[key]; };
App.Corporate.setStored = function(key, value) { V.corp[key] = value; };
App.Corporate.deleteStored = function(key) { delete V.corp[key]; };

/**
 * @param {string|App.Corporate.Division.Base} division
 * @returns {App.Corporate.Division.Base}
 */
globalThis.asDivision = function(division) {
	if (_.isObject(division)) {
		return division;
	}
	return App.Corporate.divisions[division];
};

/**
 * @param {string|App.Corporate.Division.Base} division
 * @param {number} personalShares
 * @param {number} publicShares
 * @returns {number}
 */
App.Corporate.foundingCostToPlayer = function(division, personalShares, publicShares) {
	division = asDivision(division);
	return Math.trunc((division.foundingCash / (personalShares + publicShares)) * personalShares);
};

/**
 * @param {string|App.Corporate.Division.Base} division
 * @param {number} personalShares
 * @param {number} publicShares
 */
App.Corporate.create = function(division, personalShares, publicShares) {
	App.Corporate.shares.personal = personalShares;
	App.Corporate.shares.public = publicShares;
	V.dividendTimer = 13;
	App.Corporate.setStored("Incorporated", 1);
	App.Corporate.setStored("Founded", V.week);
	App.Corporate.setStored("Dividend", 0);
	V.dividendRatio = 0;
	App.Corporate.setStored("SpecTimer", 4);

	App.Corporate.ledger.clear();

	// this will be updated by division.create
	App.Corporate.setStored("Div", 0);
	App.Corporate.expansionTokens = 1;

	division = asDivision(division);
	cashX(forceNeg(App.Corporate.foundingCostToPlayer(division, personalShares, publicShares)), 'stocksTraded');
	App.Corporate.setStored("Cash", Math.trunc(division.foundingCash));

	division.create();
	App.Corporate.ledger.swap();
};

App.Corporate.dissolve = function() {
	for (let division of App.Corporate.divisionList.filter(x => x.founded)) {
		division.dissolve();
	}
	App.Corporate.setStored("Incorporated", 0);
	App.Corporate.setStored("Div", 0);
	App.Corporate.expansionTokens = 0;
	App.Corporate.setStored("Expand", 0);
	App.Corporate.setStored("Spec", 0);
	App.Corporate.setStored("SpecToken", 0);
	App.Corporate.setStored("SpecRaces", []);
	App.Corporate.ledger.release();

	// TODO Some of these will need to be refactored into App.Corporate.Specialization
	const toDeleteGlobal = [
		"personalShares",
		"publicShares",
		"dividendTimer",
	];
	toDeleteGlobal.forEach(id => delete V[id]);
	const toDeleteCorp = [
		"Cash",
		"Dividend",
		"SpecAccent",
		"SpecAge",
		"SpecNationality",
		"SpecAmputee",
		"SpecBalls",
		"SpecDevotion",
		"SpecDick",
		"SpecEducation",
		"SpecGender",
		"SpecGenitalia",
		"SpecWeight",
		"SpecHeight",
		"SpecHormones",
		"SpecImplants",
		"SpecInjection",
		"SpecIntelligence",
		"SpecMilk",
		"SpecMuscle",
		"SpecPussy",
		"SpecSexEd",
		"SpecTrust",
		"SpecVirgin"
	];
	toDeleteCorp.forEach(id => delete V.corp[id]);

	if (App.Corporate.getStored("Market") === 1) {
		App.Arcology.cellUpgrade(V.building, App.Arcology.Cell.Market, "Corporate Market", "Markets");
		App.Corporate.setStored("Market", 0);
	}
};

App.Corporate.expandedDivision = function() {
	App.Corporate.setStored("Div", App.Corporate.getStored("Div") + 1);
	App.Corporate.setStored("ExpandToken", 0);
};

App.Corporate.dissolvedDivision = function() {
	App.Corporate.setStored("Div", App.Corporate.getStored("Div") - 1);
};
/**
 * @param {number} cost
 * @param {string} type
 */
App.Corporate.chargeAsset = function(cost, type) {
	if (!Number.isFinite(cost)) {
		throw Error("The cost provided was not a real number");
	}
	cost = Math.trunc(cost);
	if (!(type in App.Corporate.ledger.current)) {
		throw Error(`Ledger doesn't record '${type}' category.`);
	}
	if (cost === 0) {
		return;
	}

	App.Corporate.ledger.current[type] += cost;
	App.Corporate.setStored("Cash", App.Corporate.getStored("Cash") - cost);
};

/**
 * @param {number} cost
 * @param {string} locality
 */
App.Corporate.earnRevenue = function(cost, locality) {
	if (!Number.isFinite(cost)) {
		throw Error("The cost provided was not real");
	}
	cost = Math.trunc(cost);
	let current = App.Corporate.ledger.current;
	let key = `${locality}Revenue`;
	if (!(key in current)) {
		throw Error(`Unknown locality '${locality}'`);
	}
	current[key] += cost;
	App.Corporate.setStored("Cash", App.Corporate.getStored("Cash") + cost);
};

/**
 * @param {number} cost
 * @param {object} weekLedger
 */
App.Corporate.chargeDividend = function(cost, weekLedger) {
	if (!Number.isFinite(cost)) {
		throw Error("The cost provided was not real");
	}
	cost = Math.trunc(cost);
	if (weekLedger == null) {
		throw Error("No weekLedger provided");
	}
	App.Corporate.setStored("Dividend", App.Corporate.getStored("Dividend") + cost);
	App.Corporate.setStored("Cash", App.Corporate.getStored("Cash") - cost);
	weekLedger.dividend += cost;
};

App.Corporate.creditEconomy = function() {
	App.Corporate.ledger.current.setEconomy(V.localEcon);
	App.Corporate.setStored("Cash", App.Corporate.getStored("Cash") + App.Corporate.ledger.current.economicBoost);
};

/**
 * Need to prevent skipping intermediaries if they exist, ie break->surgery->train, you can skip surgery only if you don't have it.
 * @param {App.Corporate.Division.Base} fromDivision
 * @param {App.Corporate.Division.Base} toDivision
 * @returns {boolean}
 */
App.Corporate.ownsIntermediaryDivision = function(fromDivision, toDivision) {
	for (let intermediateDiv of toDivision.relatedDivisions
		.from
		.filter(iDep => iDep.id !== fromDivision.id &&
			fromDivision.relatedDivisions.to.includes(iDep))) {
		if (intermediateDiv.founded) {
			return true;
		}
	}
	return false;
};

/**
 * @param {string|App.Corporate.Division.Base} division
 * @param {number} count
 * @returns {number}
 */
App.Corporate.slaveMarketPurchaseValue = function(division, count) {
	division = asDivision(division);
	let slaveValue = division.purchasedSlaveValue;
	let totalValue = slaveValue * count * menialSlaveCost(count);
	return Math.trunc(totalValue);
};

/**
 * @param {string|App.Corporate.Division.Base} division
 * @param {number} count
 * @returns {number}
 */
App.Corporate.slaveMarketSellValue = function(division, count) {
	division = asDivision(division);
	let slaveValue = division.soldSlaveValue;
	let totalValue = slaveValue * count * menialSlaveCost(count);
	return Math.trunc(totalValue);
};

/**
 * @param {string|App.Corporate.Division.Base} division
 * @param {number} count
 * @returns {number}
 */
App.Corporate.buySlaves = function(division, count) {
	if (count <= 0) {
		return 0;
	}

	division = asDivision(division);
	let purchasePrice = App.Corporate.slaveMarketPurchaseValue(division, count);
	if (App.Corporate.getStored("Cash") < purchasePrice) {
		throw Error("Attempted purchase without enough money");
	}

	App.Corporate.chargeAsset(purchasePrice, "slaves");
	division.activeSlaves += count;
	V.menialSupplyFactor -= count;
	return purchasePrice;
};

/**
 * @param {string|App.Corporate.Division.Base} division
 * @param {number} count
 * @returns {number}
 */
App.Corporate.sellSlaves = function(division, count) {
	if (count <= 0) {
		return 0;
	}

	division = asDivision(division);
	if (division.heldSlaves < count) {
		throw Error("Attempted to sell more slaves than held.");
	}

	let sellPrice = App.Corporate.slaveMarketSellValue(division, count);
	App.Corporate.earnRevenue(sellPrice, "local");
	division.heldSlaves -= count;
	V.menialDemandFactor -= count;
	return sellPrice;
};

/**
@param {string|App.Corporate.Division.Base} fromDivision
 * @param {string|App.Corporate.Division.Base} toDivision
 * @param {number} count
 */
App.Corporate.transferSlaves = function(fromDivision, toDivision, count) {
	fromDivision = asDivision(fromDivision);
	toDivision = asDivision(toDivision);
	// TODO: validate the from and to departments are directly connected.

	if (fromDivision.heldSlaves < count) {
		throw Error(`Tried to move ${count} slaves out of ${fromDivision.name}, but it only had ${fromDivision.heldSlaves}`);
	}

	fromDivision.heldSlaves -= count;
	toDivision.activeSlaves += count;
};

/**
 * @param {string|App.Corporate.Division.Base} division
 * @param {number} count
 */
App.Corporate.buyDevelopment = function(division, count) {
	division = asDivision(division);

	let cost = Math.trunc(division.sizeCost * count * 1000);

	App.Corporate.chargeAsset(cost, "development");
	division.developmentCount += count;
};

/**
 * @param {string|App.Corporate.Division.Base} division
 * @param {number} [count=0]
 */
App.Corporate.sellDevelopment = function(division, count = 0) {
	division = asDivision(division);

	const devCount = division.developmentCount;
	count = count || devCount;
	if (count > devCount) {
		throw Error(`Attempted to sell more of a division ${division.id} than exists (${count} of ${devCount})`);
	}
	const developmentCost = Math.trunc(count * division.sizeCost * 800);
	App.Corporate.chargeAsset(-developmentCost, "development");
	division.developmentCount -= count;
};

/**
 * @param {string|App.Corporate.Division.Base} fromDivision
 * @param {string|App.Corporate.Division.Base} toDivision
 * @param {*} value
 */
App.Corporate.setAutoSendToDivision = function(fromDivision, toDivision, value) {
	fromDivision = asDivision(fromDivision);
	toDivision = asDivision(toDivision);

	fromDivision.setAutoSendToDivision(toDivision, value);
};

/**
 * @param {string|App.Corporate.Division.Base} division
 * @param {*} value
 */
App.Corporate.setAutoSendToMarket = function(division, value) {
	division = asDivision(division);
	division.setAutoSendToMarket(value);
};

/**
 * @param {string|App.Corporate.Division.Base} division
 * @param {*} value
 */
App.Corporate.setAutoBuyFromMarket = function(division, value) {
	division = asDivision(division);
	division.setAutoBuyFromMarket(value);
};
/**
 * @param {object} weekLedger
 */
App.Corporate.calculateDividend = function(weekLedger) {
	let profit = App.Corporate.ledger.current.profit;
	if (V.dividendRatio > 0 && profit > 0) {
		App.Corporate.chargeDividend(profit * V.dividendRatio, weekLedger);
	}
	// Payout leftover cash should be the last thing the corporation does
	// in a week so that its cash will be at the payout amount.
	if (App.Corporate.getStored("CashDividend") === 1) {
		let payoutAfter = App.Corporate.payoutAfterCash();
		if (App.Corporate.getStored("Cash") > payoutAfter) {
			App.Corporate.chargeDividend(App.Corporate.getStored("Cash") - payoutAfter, weekLedger);
		}
	}

	if (V.dividendTimer <= 1) {
		weekLedger.payout = Math.trunc(App.Corporate.getStored("Dividend") * App.Corporate.shares.personal / App.Corporate.shares.total);
		cashX(weekLedger.payout, "stocks");
		V.dividendTimer = 14;// 13 for each quarter, but +1 because we're subtracting one below.
		App.Corporate.setStored("Dividend", 0);
	}

	V.dividendTimer--;
};

/**
 * @param {number} userCash
 */
App.Corporate.cheatCash = function(userCash) {
	userCash = Math.trunc(Number(userCash));
	if (Number.isFinite(userCash)) {
		App.Corporate.setStored("Cash", Math.trunc(userCash));
		V.cheater = 1;
	}
};

/**
 * @returns {number}
 */
App.Corporate.calculateValue = function() {
	if (App.Corporate.getStored("Incorporated") === 0) {
		return 0;
	}
	let corpAssets = App.Corporate.divisionList
		.filter(div => div.founded)
		.reduce((v, div) => v + div.value, 0);
	return corpAssets + App.Corporate.getStored("Dividend") + App.Corporate.getStored("Cash");
};

/**
 * @returns {number}
 */
App.Corporate.payoutAfterCash = function() {
	return Math.max(Math.trunc(App.Corporate.payoutCorpValueMultiplier * App.Corporate.calculateValue()), App.Corporate.payoutMinimumCash);
};

/**
 * Corporation Share Price
 * @param {number} q positive means adding shares to the market, negative means removing them
 * @param {number} [personalShares=null]
 * @param {number} [publicShares=null]
 * @returns {number}
 */
globalThis.corpSharePrice = function(q = 0, personalShares = null, publicShares = null) {
	if (V.corp.Incorporated === 0) {
		return 0;
	}
	personalShares = personalShares || V.personalShares;
	publicShares = publicShares || V.publicShares;
	return Math.trunc(1000 * (App.Corporate.calculateValue() / (personalShares + publicShares + q)));
};

/**
 * Corporation race blacklisting/whitelisting
 * @param {string} race lowercase string representing the race
 * @param {0|1} blacklist 1 means we are blacklisting and 0 means we are whitelisting given race
 * @returns {Array<string>}
 */
globalThis.corpBlacklistRace = function(race, blacklist) {
	let raceArray = V.corp.SpecRaces;
	if (raceArray.length > 0 && blacklist === 1) {
		raceArray.delete(race);
	} else if (blacklist === 1) {
		raceArray = Array.from(App.Data.misc.filterRacesPublic.keys()).filter(x => x !== race);
	} else {
		raceArray.push(race);
	}
	return raceArray;
};
