App.Arcology.Cell.Apartment = class extends App.Arcology.Cell.BaseCell {
	/**
	 * @param {number} owner
	 * @param {number} type
	 */
	constructor(owner, type = 2) {
		super(owner);
		this.type = type;
	}


	static get cellName() {
		return "Apartments";
	}

	/**
	 * @returns {string}
	 */
	get colorClass() {
		switch (this.type) {
			case 1:
				return "luxuryApartments";
			case 2:
				return "apartments";
			case 3:
				return "denseApartments";
			default:
				return super.colorClass;
		}
	}

	/**
	 * @override
	 * @returns {string}
	 */
	get name() {
		switch (this.type) {
			case 1:
				return "Luxury Apartments";
			case 2:
				return "Apartments";
			case 3:
				return "Dense Apartments";
			default:
				return super.name;
		}
	}

	/**
	 * @param {Array<number>} path
	 * @returns {Node}
	 */
	cellContent(path) {
		return App.Arcology.getCellLinkFromPath(path, this.name);
	}

	/**
	 * @returns {string|Node}
	 * @override @protected
	 */
	_setting() {
		let r = "";

		switch (this.type) {
			case 1:
				r = "improved for occupancy by the Free Cities' wealthiest citizens";
				break;
			case 2:
				r = "occupied by citizens of varying wealth and social standing";
				break;
			case 3:
				r = "upgraded for dense occupancy by as many citizens as possible";
				break;
		}

		if (this.owner === 1) {
			r = `This is a sector of the arcology's living areas, ${r}. You control this part of the arcology and all these tenants pay you rent.`;
		} else {
			r = `This is a privately-owned sector of the arcology's living areas, ${r}.`;
		}

		return r;
	}

	/**
	 * @returns {Node}
	 * @override @protected
	 */
	_body(containingBuilding) {
		const fragment = document.createDocumentFragment();

		const cost = 10000 * V.upgradeMultiplierArcology;

		if (this.type !== 3) {
			fragment.append(this._makeInternalUpgrade(
				`Upgrade this sector of apartments for dense occupancy by as many citizens as possible`,
				() => { this.type = 3; }, cost, containingBuilding));
		}

		if (this.type !== 1) {
			fragment.append(this._makeInternalUpgrade(
				`Improve this sector of apartments for occupancy by the Free Cities' wealthiest citizens`,
				() => { this.type = 1; }, cost, containingBuilding));
		}

		if (this.type !== 2) {
			fragment.append(this._makeInternalUpgrade(
				`Return this sector to standard, mixed housing`,
				() => { this.type = 2; }, cost, containingBuilding));
		}

		return fragment;
	}

	/**
	 * @returns {boolean}
	 */
	canBeSold() {
		return true;
	}

	static _cleanupConfigScheme(config) {
		super._cleanupConfigScheme(config);
		// BC code
	}

	/** @returns {App.Arcology.Cell.Apartment} */
	clone() {
		return (new App.Arcology.Cell.Apartment(this.owner))._init(this);
	}

	get className() { return "App.Arcology.Cell.Apartment"; }
};
