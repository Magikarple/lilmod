App.Arcology.Cell.Market = class extends App.Arcology.Cell.BaseCell {
	/**
	 * @param {number} owner
	 * @param {string} type
	 */
	constructor(owner, type = "Markets") {
		super(owner);
		this.type = type;
	}

	static get cellName() {
		return "Markets";
	}

	/**
	 * @returns {string}
	 */
	get colorClass() {
		switch (this.type) {
			case "Markets":
				return "markets";
			case "Arcade":
				return "arcade";
			case "Pit":
				return "pit";
			case "Transport Hub":
				return "transport-hub";
			case "Corporate Market":
				return "corporateMarket";
			default:
				return super.colorClass;
		}
	}

	/**
	 * @override
	 * @returns {string}
	 */
	get name() {
		if (this.type === "Pit") {
			return "Arena";
		}
		return this.type;
	}

	isBaseType() {
		return this.type === "Markets";
	}

	/**
	 * @param {Array<number>} path
	 * @returns {Node}
	 */
	cellContent(path) {
		switch (this.type) {
			case "Arcade":
				return App.Arcology.facilityCellContent(App.Entity.facilities.arcade);
			case "Pit":
				return App.Arcology.facilityCellContent(App.Entity.facilities.pit, "Pit");
			case "Markets":
				return App.Arcology.getCellLinkFromPath(path, "Markets");
			case "Transport Hub":
				return App.UI.DOM.passageLink("Transport Hub", "Transport Hub");
			case "Corporate Market":
				return App.UI.DOM.passageLink(
					"Corporate Market",
					"Market",
					this._prepareCorporateMarket
				);
			default:
				return App.UI.DOM.makeElement("span", "ERROR: invalid type: " + this.type, ["error"]);
		}
	}

	/**
	 * @returns {string|Node}
	 * @protected @override
	 */
	_setting() {
		/* no need to check type, since you can only get here with the basic type */
		let r = "area of the concourse occupied by large stores and markets, many of which sell slaves";

		if (this.owner === 1) {
			return `This is an ${r}. You control this part of the arcology and all these tenants pay you rent.`;
		}
		return `This is a privately-owned ${r}.`;
	}

	/**
	 * @returns {Node}
	 * @protected @override
	 */
	_body(containingBuilding) {
		const fragment = document.createDocumentFragment();

		const cost = Math.trunc(10000 * V.upgradeMultiplierArcology);
		if (V.arcade === 0) {
			fragment.append(this._makeExternalUpgrade(
				`Construct a sex arcade to present slaves' holes for public use`,
				() => {
					this.type = "Arcade";
					V.arcade = 10;
				}, cost, "Arcade", [`will incur upkeep costs`]
			));
		}

		if (!V.pit) {
			fragment.append(this._makeExternalUpgrade(
				`Build an arena to host proper slave fights`,
				() => {
					this.type = "Pit";
					App.Facilities.Pit.init();
				}, cost, "Pit"
			));
		}

		if (V.secExpEnabled > 0 && !V.SecExp.buildings.transportHub) {
			fragment.append(this._makeExternalUpgrade(
				`Centralize and modernize the transport hub`,
				() => {
					this.type = "Transport Hub";
					App.Mods.SecExp.transportHub.Init();
				}, cost, "Transport Hub"
			));
		}

		const corpCost = Math.trunc(10000 * V.upgradeMultiplierArcology);
		if (V.corp.Market === 0 && V.corp.Incorporated === 1) {
			fragment.append(this._makeExternalUpgrade(
				`Create a flagship slave market for your corporation here`,
				() => {
					this.type = "Corporate Market";
					V.corp.Market = 1;
					V.corp.Cash -= corpCost;
					this._prepareCorporateMarket();
				}, 0, "Market", [`costs ${cashFormat(corpCost)} of the corporation's money`]
			));
		}

		return fragment;
	}

	/**
	 * @private
	 */
	_prepareCorporateMarket() {
		V.market = new App.Markets.Global("corporate");
		V.nextButton = "Back to Main";
		V.nextLink = "Main";
		V.returnTo = "Main";
	}

	/**
	 * @returns {boolean}
	 */
	canBeSold() {
		return this.type === "Markets";
	}

	static _cleanupConfigScheme(config) {
		super._cleanupConfigScheme(config);
		// BC code
	}

	/** @returns {App.Arcology.Cell.Market} */
	clone() {
		return (new App.Arcology.Cell.Market(this.owner))._init(this);
	}

	get className() { return "App.Arcology.Cell.Market"; }
};
