App.Medicine.Surgery.Procedures.SizingImplantProcedure = class extends App.Medicine.Surgery.Procedure {
	/**
	 * @param {FC.SlaveState} slave
	 * @param {FC.SizingImplantTarget} target
	 * @param {FC.SizingImplantType} implantType
	 * @param {number} size
	 */
	constructor(slave, target, implantType, size) {
		super(slave);
		this._target = target;
		this._implantType = implantType;
		this._size = size;
	}

	get name() {
		return `${capFirstChar(this._resolveDynamic(this._implantData.name, this._size))} implants`;
	}

	get changeValue() {
		return this._size;
	}

	apply(cheat) {
		this._slave[this._target] += this._size;
		this._slave[`${this._target}Implant`] += this._size;
		this._setSlaveImplantType(this._implantType);

		if (this.changeValue >= 0) {
			return this._assemble(this._doTargetGain());
		} else {
			if (this._slave[`${this._target}Implant`] < 1) {
				this._slave[`${this._target}Implant`] = 0;
				this._setSlaveImplantType("none");
			}
			return this._assemble(this._doTargetLoss());
		}
	}

	_surgeryWorkPriceFactor() {
		return V.surgeryCost * V.localEcon / 3e4;
	}

	/**
	 * @param {FC.SizingImplantType} type
	 */
	_implantDataForType(type) {
		return App.Data.Medicine.sizingImplants[this._target][type];
	}

	/**
	 * @param {FC.SizingImplantType} type
	 * @param {number} size
	 */
	_installationHealthCost(type, size) {
		return this._implantDataForType(type).healthCostFactor.installation * size;
	}

	/**
	 * @param {FC.InstalledSizingImplantType} type
	 * @param {number} size
	 */
	_removalHealthCost(type, size) {
		return type === "none" ? 0
			: this._implantDataForType(type).healthCostFactor.removal * size;
	}

	/**
	 * @param {FC.InstalledSizingImplantType} type
	 * @param {number} size
	 */
	_installationWorkCost(type, size) {
		return type === "none" ? 0
			: this._implantDataForType(type).workCostFactor.installation * size * this._surgeryWorkPriceFactor();
	}

	/**
	 * @param {FC.InstalledSizingImplantType} type
	 * @param {number} size
	 */
	_removalWorkCost(type, size) {
		return type === "none" ? 0
			: this._implantDataForType(type).workCostFactor.removal * size * this._surgeryWorkPriceFactor();
	}

	get _implantData() {
		return this._implantDataForType(this._implantType);
	}

	get _implantName() {
		return this._resolveDynamic(this._implantData.name, this._size);
	}

	get _materialCost() {
		return this._resolveDynamic(this._implantData.specificMaterialCost, this._size) * this._size;
	}

	/**
	 * @param {*} amount Positive for fill, negative for drain
	 */
	_fillDrainMaterialCost(amount) {
		const id = this._implantData;
		return amount >= 0
			? (id.fill ? this._implantData.fill.materialCostFactor * amount : 0)
			: 0; // draining does not impose material cost as of now
	}

	/**
	 * @template {string | number} T
	 * @param {T | ((size: number) => T)} value
	 * @param {number} size
	 * @returns {T}
	 */
	_resolveDynamic(value, size) {
		return typeof value !== "function" ? value : value(size);
	}

	get _targetName() {
		switch (this._target) {
			case "boobs":
				return ["mammaries", "chest", "breasts"].random();
			case "butt":
				return ["buttocks", "posterior"].random();
			case "lips":
				return "lip";
			default:
				return this._target;
		}
	}

	/**
	 * Returns a string containign the name (depends on size) and possible volume of the implant
	 * @param {FC.SizingImplantType} type
	 * @param {number} volume
	 */
	_describeImplant(type, volume) {
		let r = this._resolveDynamic(this._implantDataForType(type).name, volume);
		const volumeDesc = this._volumeStr(volume);
		if (volumeDesc) {
			r += ` (${volumeDesc})`;
		}
		return r;
	}

	_setSlaveImplantType(implantType) {
		if (this.originalSlave[`${this._target}ImplantType`] !== implantType) {
			this._slave[`${this._target}ImplantType`] = implantType;
		}
	}

	/**
	 * @abstract
	 * @returns {App.Medicine.Surgery.SimpleReaction}
	 */
	_doTargetGain() {
		throw Error("Abstract method called");
	}
	/**
	 * @abstract
	 * @returns {App.Medicine.Surgery.SimpleReaction}
	 */
	_doTargetLoss() {
		throw Error("Abstract method called");
	}

	/**
	 * @abstract
	 * @param {number} volume
	 * @returns {string}
	 */
	_volumeStr(volume) {
		throw Error("Abstract method called");
	}

	/**
	 * @abstract
	 * @param {number} volume
	 * @returns {string}
	 */
	 _fleshExcessStr(volume) {
		throw Error("Abstract method called");
	}
};

App.Medicine.Surgery.Procedures.InstallSizingImplantProcedure = class extends App.Medicine.Surgery.Procedures.SizingImplantProcedure {
	/**
	 * @param {FC.SlaveState} slave
	 * @param {FC.SizingImplantTarget} target
	 * @param {FC.SizingImplantType} implantType
	 * @param {number} size how big is the implant
	 * @param {number} fleshExcess Excess flesh volume to remove for installing this implant
	 */
	constructor(slave, target, implantType, size, fleshExcess) {
		super(slave, target, implantType, size);
		this._fleshExcess = fleshExcess;
	}

	get description() {
		const {his} = getPronouns(this._slave);
		return `place ${this._describeImplant(this._implantType, this._size)} implants into ${his} ${this._targetName}`;
	}

	get note() {
		if (this._fleshExcess > 0) {
			const {his} = getPronouns(this._slave);
			return App.UI.DOM.makeElement('span',
				`Installation requires removing ${this._fleshExcessStr(this._fleshExcess)} of ${his} ${this._targetName} flesh.`, ["warning"]);
		}
		return null;
	}

	get healthCost() {
		return this._installationHealthCost(this._implantType, this._size);
	}

	get _workCost() {
		return super._workCost + super._installationWorkCost(this._implantType, this._size);
	}
};

App.Medicine.Surgery.Procedures.ExistingImplantsProcedureBase = class extends App.Medicine.Surgery.Procedures.SizingImplantProcedure {
	/**
	 * @param {FC.SlaveState} slave
	 * @param {FC.SizingImplantTarget} target
	 * @param {number} size
	 * @param {FC.SizingImplantType} [implantType]
	 */
	constructor(slave, target, size, implantType = null) {
		const oldImplantInfo = App.Medicine.implantInfo(slave, target);
		if (oldImplantInfo.type === "none") {
			throw Error(`Slave has no ${target} implant to work on`);
		}
		super(slave, target, implantType || oldImplantInfo.type, size);
		this._oldImplantInfo = oldImplantInfo;
	}

	/**
	 * @protected
	 */
	get _oldImplantsDescription() {
		return this._describeImplant(/** @type {FC.SizingImplantType}*/(this._oldImplantInfo.type), this._oldImplantInfo.volume);
	}
};

App.Medicine.Surgery.Procedures.RemoveSizingImplantProcedure = class extends App.Medicine.Surgery.Procedures.ExistingImplantsProcedureBase {
	/**
	 * @param {FC.SlaveState} slave
	 * @param {FC.SizingImplantTarget} target
	 */
	constructor(slave, target) {
		super(slave, target, -slave[`${target}Implant`]);
	}

	get name() {
		return `Remove ${this._targetName} implants`;
	}

	get description() {
		const {his} = getPronouns(this._slave);
		return `remove ${his} ${this._oldImplantsDescription} ${this._targetName} implants`;
	}

	get _materialCost() {
		return 0;
	}

	get _workCost() {
		return super._workCost + super._removalWorkCost(this._implantType, -this._size);
	}

	get healthCost() {
		return this._removalHealthCost(this._implantType, -this._size);
	}
};

App.Medicine.Surgery.Procedures.ReplaceSizingImplantProcedure = class extends App.Medicine.Surgery.Procedures.ExistingImplantsProcedureBase {
	/**
	 * @param {FC.SlaveState} slave
	 * @param {FC.SizingImplantTarget} target
	 * @param {FC.SizingImplantType} implantType
	 * @param {number} size how big is the implant
	 * @param {number} fleshExcess Excess flesh volume to remove for installing this implant
	 */
	constructor(slave, target, implantType, size, fleshExcess) {
		super(slave, target, size, implantType);
		this._fleshExcess = fleshExcess;
	}

	get description() {
		const {his} = getPronouns(this._slave);
		return `replace ${his} ${this._oldImplantsDescription} ${this._targetName} implants with ${this._describeImplant(this._implantType, this._size)} ones`;
	}

	get note() {
		if (this._fleshExcess > 0) {
			const {his} = getPronouns(this._slave);
			return App.UI.DOM.makeElement('span',
				`Installation of the new implant requires removing ${this._fleshExcessStr(this._fleshExcess)} of ${his} ${this._targetName} flesh.`, ["warning"]);
		}
		return null;
	}

	get healthCost() {
		let removeCost = this._removalHealthCost(this._oldImplantInfo.type, this._oldImplantInfo.volume);
		let implantCost = this._installationHealthCost(this._implantType, this._size);
		return Math.max(removeCost, implantCost) + Math.min(removeCost, implantCost) * 0.2;
	}

	get _workCost() {
		const previousImplant = App.Medicine.implantInfo(this.originalSlave, this._target);
		return super._workCost + super._removalWorkCost(previousImplant.type, previousImplant.volume) +
			this._installationWorkCost(this._implantType, this._size);
	}

	get changeValue() {
		return this._size - this._oldImplantInfo.volume;
	}

	apply(cheat) {
		this._slave[this._target] -= this._oldImplantInfo.volume;
		this._slave[`${this._target}Implant`] = 0;

		return super.apply(cheat);
	}
};

App.Medicine.Surgery.Procedures.FillSizingImplantProcedure = class extends App.Medicine.Surgery.Procedures.ExistingImplantsProcedureBase {
	/**
	 * @param {FC.SlaveState} slave
	 * @param {FC.SizingImplantTarget} target
	 * @param {number} amount
	 */
	constructor(slave, target, amount) {
		super(slave, target, amount);
	}

	get name() {
		return `Add inert filler`;
	}

	get description() {
		const {his} = getPronouns(this._slave);
		const volumeStr = this._volumeStr(this._size);
		return `add ${volumeStr ? `${volumeStr} of` : 'some'} inert filler to each of ${his} ${this._oldImplantsDescription} ${this._targetName} implants`;
	}

	get _materialCost() {
		return this._fillDrainMaterialCost(this._size);
	}

	get healthCost() {
		return this._implantData.fill.healthCost;
	}
};

App.Medicine.Surgery.Procedures.DrainSizingImplantProcedure = class extends App.Medicine.Surgery.Procedures.ExistingImplantsProcedureBase {
	/**
	 * @param {FC.SlaveState} slave
	 * @param {FC.SizingImplantTarget} target
	 * @param {number} amount
	 */
	constructor(slave, target, amount) {
		super(slave, target, -amount);
	}

	get name() {
		return `Drain inert filler`;
	}

	get description() {
		const {his} = getPronouns(this._slave);
		const volumeStr = this._volumeStr(this._size);
		return `drain ${volumeStr ? `${volumeStr} of` : 'some'} inert filler from ${his} ${this._oldImplantsDescription} ${this._targetName} implants`;
	}

	get _materialCost() {
		return 0;
	}

	get healthCost() {
		return this._implantData.drain.healthCost;
	}
};
