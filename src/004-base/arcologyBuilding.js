App.Arcology.Cell.BaseCell = class extends App.Entity.Serializable {
	/**
	 * @param {number} owner
	 */
	constructor(owner) {
		super();
		/**
		 * 0: private
		 * 1: player
		 * @type {number}
		 */
		this.owner = owner;
		/**
		 * List of classes this cell can be converted to.
		 * Format: "BaseCell" stands for App.Arcology.Cell.BaseCell
		 * Note: The current class needs to be included as well, otherwise converting back is not possible.
		 * @type {string[]}
		 */
		this.allowedConversions = [];
	}

	/**
	 * @returns {string}
	 */
	static get cellName() {
		return "baseCell";
	}

	/**
	 * @returns {string}
	 */
	get colorClass() {
		return "empty";
	}

	/**
	 * @returns {number}
	 */
	get width() {
		return 1;
	}

	/**
	 * @returns {string}
	 */
	get name() {
		return "Base Cell";
	}

	/**
	 * @returns {boolean}
	 */
	isBaseType() {
		return true;
	}

	renderCell(path, width) {
		const outerCell = document.createElement("div");
		outerCell.classList.add("outerCell");
		outerCell.style.width = `${width * this.width}%`;

		const innerCell = document.createElement("div");
		innerCell.classList.add("innerCell");
		innerCell.classList.add(this.owner === 1 ? this.colorClass : "private");
		innerCell.append(this.cellContent(path));

		outerCell.append(innerCell);

		return outerCell;
	}

	/**
	 * @param {Array<number>} path
	 * @returns {Node}
	 */
	cellContent(path) {
		return document.createDocumentFragment();
	}

	/**
	 * @param {App.Arcology.Building} containingBuilding
	 * @returns {DocumentFragment}
	 */
	cellPassage(containingBuilding) {
		/**
		 * Thanks JS!
		 * @type {App.Arcology.Cell.BaseCell}
		 */
		const that = this;

		const fragment = document.createDocumentFragment();

		const scene = document.createElement("p");
		scene.classList.add("scene-intro");
		scene.append(this._setting());
		if (this.canBeSold()) {
			scene.append(' ', ownership(this));
		}
		fragment.append(scene);

		if (this.owner === 1) {
			const upgrades = document.createElement("p");

			upgrades.append(this._body(containingBuilding));

			fragment.append(upgrades);

			if (this.allowedConversions.length > 0 && this.isBaseType()) {
				const p = document.createElement("p");
				if (V.rep < 5000) {
					fragment.append(App.UI.DOM.makeElement("p", "You don't have the reputation required to convert the sector base type."));
				} else {
					const cost = 50000;
					const rep = 5000;
					for (const ac of this.allowedConversions) {
						const cellClass = App.Arcology.Cell[ac];
						if (!(this instanceof cellClass)) {
							p.append(App.UI.DOM.link(`Convert sector to ${cellClass.cellName}.`, () => {
								if (Dialog.isOpen()) {
									Dialog.close();
								}

								/** @type {App.Arcology.Cell.BaseCell} */
								const newCell = new cellClass(1);
								newCell.allowedConversions = this.allowedConversions;
								containingBuilding.replaceCell(this, newCell);
								cashX(-cost, "capEx");
								repX(-rep, "capEx");

								containingBuilding.refresh();
								Dialog.setup(newCell.name);
								$(Dialog.body()).empty().append(newCell.cellPassage(containingBuilding));
								Dialog.open();
							}));

							App.UI.DOM.appendNewElement("span", p, ` Costs ${cashFormat(cost)} and ${rep} reputation as many citizens will lose most of what they own.`);
						}
					}
				}
				fragment.append(p);
			}
		}

		return fragment;

		/**
		 * @returns {DocumentFragment}
		 */
		function ownership(cell) {
			const DEMAND_FACTOR_DIFF = 20;
			const fragment = document.createDocumentFragment();
			const A = V.arcologies[0];
			const allCells = V.building.findCells(cell => !(cell instanceof App.Arcology.Cell.Filler));
			const ownedCells = allCells.filter(cell => cell.owner === 1).length;
			const oneCellPercentage = ((1 / allCells.length) * 100).toPrecision(3);

			/**
			 * @param {boolean} buy
			 * @returns {number}
			 */
			function price(buy) {
				let demand = A.demandFactor;
				if (buy) {
					demand += DEMAND_FACTOR_DIFF;
				}
				return 1000 * Math.trunc(A.prosperity * (1 + (demand / 100)));
			}

			if (cell.owner === 1) {
				App.Events.addNode(fragment, [`Selling this sector would relinquish a ${oneCellPercentage}% interest in ${A.name}. Such an interest is worth <span class='cash'>${cashFormat(price(false))}.</span>`]);

				if (ownedCells > 1) {
					const span = document.createElement("span");
					span.classList.add("clear-formatting");
					span.append(App.Arcology.getCellLink("Sell", that.name, () => that.cellPassage(containingBuilding),
						() => {
							cashX(price(false), "capEx");
							App.Arcology.updateOwnership();
							A.demandFactor -= DEMAND_FACTOR_DIFF;
							cell.owner = 0;
						}));
					fragment.append(" ", span);
				}
			} else {
				App.Events.addNode(fragment, [`You will have to acquire an additional ${oneCellPercentage}% interest in ${A.name} to take control of this sector. Such an interest is worth ${cashFormatColor(price(true))} and will require a transaction cost of ${cashFormatColor(10000)} to acquire for a total cost of <span class='cash'>${cashFormat(price(true) + 10000)}.</span>`]);
				const availableCells = allCells.length * ((100 - A.minority) / 100) - ownedCells;
				if (availableCells >= 1) {
					const buySpan = document.createElement("span");
					buySpan.classList.add("clear-formatting");
					buySpan.append(App.Arcology.getCellLink("Buy", that.name, () => that.cellPassage(containingBuilding),
						() => {
							cashX(-(price(true) + 10000), "capEx");
							A.demandFactor += DEMAND_FACTOR_DIFF;
							App.Arcology.updateOwnership();
							cell.owner = 1;
						}));
					fragment.append(" ", buySpan);

					if (V.rep >= 18000) {
						const repDiv = document.createElement("div");
						repDiv.classList.add("clear-formatting");

						const repPrice = Math.clamp(price(true) / 2, 0, 18000);
						repDiv.append("You have so much political capital that you can spend reputation to acquire ownership by spending reputation. ",
							App.Arcology.getCellLink("Use reputation", that.name, () => that.cellPassage(containingBuilding),
								() => {
									repX(-(repPrice), "capEx");
									A.demandFactor += DEMAND_FACTOR_DIFF;
									App.Arcology.updateOwnership();
									cell.owner = 1;
								}));
						fragment.append(repDiv);
					}
				} else {
					fragment.append("Too much of the arcology is owned by a single minority holder for you to force a purchase of this sector right now. Your control of the arcology should naturally resolve this situation in a few weeks.");
				}
			}
			return fragment;
		}
	}

	/**
	 * @returns {string|Node}
	 * @protected
	 */
	_setting() {
		return "baseCell";
	}

	/**
	 * @param {App.Arcology.Building} containingBuilding
	 * @returns {Node}
	 * @protected
	 */
	_body(containingBuilding) {
		return document.createDocumentFragment();
	}

	/**
	 * @param {string} name
	 * @param {function(): void} action
	 * @param {number} cost
	 * @param {App.Arcology.Building} containingBuilding
	 * @param {string[]} [notes]
	 * @returns {HTMLDivElement}
	 * @protected
	 */
	_makeInternalUpgrade(name, action, cost, containingBuilding, notes) {
		return makePurchase(name, cost, "capEx", {
			notes,
			handler: () => {
				if (Dialog.isOpen()) {
					Dialog.close();
				}
				if (action) {
					action();
					V.building.refresh();
				}
				Dialog.setup(this.name);
				$(Dialog.body()).empty().append(this.cellPassage(containingBuilding));
				Dialog.open();
			},
		});
	}

	/**
	 * @param {string} name
	 * @param {function(): void} action
	 * @param {number} cost
	 * @param {string} passage
	 * @param {string[]} [notes]
	 * @returns {HTMLDivElement}
	 * @protected
	 */
	_makeExternalUpgrade(name, action, cost, passage, notes) {
		const div = document.createElement("div");

		div.append(makePurchase(name, cost, "capEx", {
			notes,
			handler: () => {
				action();
				Dialog.close();
				Engine.play(passage);
			}
		}));

		return div;
	}

	/**
	 * @returns {boolean}
	 */
	canBeSold() {
		return false;
	}

	static _cleanupConfigScheme(config) {
		super._cleanupConfigScheme(config);
		// BC code
	}

	/** @returns {App.Arcology.Cell.BaseCell} */
	clone() {
		return new App.Arcology.Cell.BaseCell(this.owner)._init(this);
	}

	get className() { return "App.Arcology.Cell.BaseCell"; }
};
