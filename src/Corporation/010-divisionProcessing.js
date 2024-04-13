App.Corporate.Division.Processing = class extends App.Corporate.Division.Base {
	constructor({founding, addedValue, processing, nextDivision, slaveProcessType, slaveProcessDescription}) {
		super(arguments[0]);
		this._const.addedValue = addedValue;
		this._const.processing = new App.Corporate.Shared.averageRange(processing);
		this._const.nextDivisions = nextDivision;
		this._const.slaveProcessType = slaveProcessType;
		this._const.slaveProcessDescription = slaveProcessDescription;
	}

	// abstract virtual definitions
	get fromMarket() { return true; }

	get toMarket() { return true; }

	get heldSlaves() { return this.getStored("Slaves2"); }

	set heldSlaves(value) { this.setStored("Slaves2", Math.trunc(value)); }

	get activeSlaves() { return this.getStored("Slaves"); }

	set activeSlaves(value) { this.setStored("Slaves", Math.trunc(value)); }

	get processRate() { return this._const.processing.center; }

	get soldSlaveValue() {
		// TODO: find a way to cache this.
		return this.purchasedSlaveValue + this._const.addedValue;
	}

	get slaveAction() {
		return this._const.slaveProcessDescription;
	}

	get nounFinishedSlave() { return `${this._const.slaveProcessDescription.past} slave`; }

	get nounSlaveFromMarket() { return this._const.slaveProcessDescription.market; }

	messageSlaveCount() {
		return App.Corporate.Shared.MessageProcessedSlaves(this, `can ${this._const.slaveProcessType.present}`, 'green');
	}

	messageSlaveOutput() {
		return App.Corporate.Shared.MessageSlaveToMarket(this);
	}

	message_endWeek_Slaves(divLedger) {
		let newSlaves = divLedger.slaves.value;
		// The division
		let retval = this._const.slaveProcessType.past; // exploited
		if (newSlaves <= 0) {
			retval += " <span class='red'>none of its slaves.</span>";
		} else {
			retval += ` <span class="positive">${numberWithPlural(newSlaves, 'slave')}.</span>`;
		}
		retval += " The division ";
		if (this.activeSlaves) {
			retval += `is still ${this._const.slaveProcessDescription.present} ${numberWithPlural(this.activeSlaves, "slave")}.`;
		} else {
			retval += `doesn't have any slaves to ${this._const.slaveProcessDescription.future}.`;
		}
		return retval;
	}

	endWeek_Slaves(divLedger) {
		let slaves = App.Corporate.Shared.EndWeekProcessing_Slaves(this.activeSlaves, this._const.processing);
		this.activeSlaves -= slaves.value;
		this.heldSlaves += slaves.value;
		return divLedger.slaves.apply(slaves);
	}

	get initialSlaveValue() {
		const values = this.relatedDivisions.from.map(fromDiv => fromDiv.initialSlaveValue);
		if (values.length === 0) {
			throw Error("No route to acquisition found.");
		}
		return Math.min(...values) + this._const.addedValue;
	}

	// virtual override
	get nextDivisions() { return this._const.nextDivisions; }

	get developmentCount() { return super.developmentCount; }

	set developmentCount(value) {
		super.developmentCount = value;
		App.Corporate.Shared.SellOverflowSlaves(this);
	}

	dissolve() {
		App.Corporate.sellSlaves(this, this.heldSlaves);
		super.dissolve();
		delete V.corp[this._const.corpId + "Slaves"];
		delete V.corp[this._const.corpId + "Slaves2"];
	}

	get foundingCostSlaves() { return this._const.founding.size * this.purchasedSlaveValue; }

	get foundingCost() { return this.foundingCostDivision + this.foundingCostSlaves; }

	create() {
		super.create();
		App.Corporate.chargeAsset(this.foundingCostSlaves * 1000, "slaves");
		this.activeSlaves = this._const.founding.size;
		this.heldSlaves = 0;
		App.Corporate.Shared.FoundingSetupAutoBuy(this);
		App.Corporate.Shared.FoundingSetupAutoSell(this);
	}
};
