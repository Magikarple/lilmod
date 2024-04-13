App.Corporate.Division.Working = class extends App.Corporate.Division.Base {
	constructor({founding, attrition, revenue, slaveWorkDescription}) {
		super(arguments[0]);
		this._const.attrition = new App.Corporate.Shared.averageRange(attrition);
		this._const.revenue = new App.Corporate.Shared.averageRange(revenue);
		this._const.slaveWorkDescription = slaveWorkDescription;
	}

	// abstract virtual definitions
	get fromMarket() { return true; }

	get toMarket() { return false; }

	get heldSlaves() { return 0; }

	set heldSlaves(value) { throw Error("Cannot set held slaves of working division"); }

	get activeSlaves() { return this.getStored("Slaves"); }

	set activeSlaves(value) { this.setStored("Slaves", Math.trunc(value)); }

	get processRate() { return this._const.attrition.center; }

	get initialSlaveValue() { return null; }

	get soldSlaveValue() { return null; }

	get slaveAction() {
		return this._const.slaveWorkDescription;
	}

	// @ts-ignore
	get nounFinishedSlave() { throw Error("Cannot get finished slave in working division, since they don't produce finished slaves."); }

	get nounSlaveFromMarket() { return this._const.slaveWorkDescription.market; }

	messageSlaveCount() {
		return App.Corporate.Shared.MessageProcessedSlaves(this, `has to replace`, 'red');
	}

	messageSlaveOutput() {
		/* TODO: originally some divisions had a slight description for what the work was; ie, "the escorts generate" */
		return `The division generates <span class="yellowgreen">${cashFormat(this.slaveRevenue)}</span> per slave on average.`;
	}

	endWeek_Slaves(divLedger) {
		let slaves = App.Corporate.Shared.EndWeekProcessing_Slaves(this.activeSlaves, this._const.attrition);
		this.activeSlaves -= slaves.value;
		return divLedger.slaves.apply(slaves);
	}

	message_endWeek_Slaves(divLedger) {
		let lostSlaves = divLedger.slaves.value;
		let retval = '';// The division
		if (this.activeSlaves <= 0) {
			retval += `has <span class="red">no slaves</span> to ${this._const.slaveWorkDescription.future}.`;
		} else {
			retval += `is ${this._const.slaveWorkDescription.present} <span class="positive">${numberWithPlural(this.activeSlaves, 'slave')}.</span> `;
		}
		if (lostSlaves > 0) {
			retval += `During operations <span class="red">${numberWithPlural(lostSlaves, 'slave')}</span> ${this._const.slaveWorkDescription.past}.`;
		}
		return retval;
	}

	// virtual override
	get developmentCount() { return super.developmentCount; }

	set developmentCount(value) {
		super.developmentCount = value;
		App.Corporate.Shared.SellOverflowSlaves(this);
	}

	dissolve() {
		super.dissolve();
		delete V.corp[this._const.corpId + "Slaves"];
	}

	getAutoSendToMarket() {
		return false;
	}

	setAutoSendToMarket(value) {
		throw Error("Working divisions cannot sell to market");
	}

	endweek_Revenue(divLedger) {
		let {roll, value} = this._const.revenue.roll();
		let revenue = Math.trunc(this.activeSlaves * value);
		divLedger.revenue.apply({value: revenue, efficiency: roll});
	}

	endWeek_Transfer(divLedger) {
		// Working divisions don't do transfers
	}

	get slaveRevenue() {
		return this._const.revenue.center;
	}

	get maintenanceSlaves() {
		// maintenance is paid on working slaves, not worked slaves.
		return this.activeSlaves;
	}

	get foundingCostSlaves() { return this._const.founding.size * this.purchasedSlaveValue; }

	get foundingCost() { return this.foundingCostDivision + this.foundingCostSlaves; }

	create() {
		super.create();
		App.Corporate.chargeAsset(this.foundingCostSlaves * 1000, "slaves");
		this.activeSlaves = this._const.founding.size;
		App.Corporate.Shared.FoundingSetupAutoBuy(this);
	}
};
