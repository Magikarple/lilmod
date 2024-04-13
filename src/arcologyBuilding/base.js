/**
 * @param {Array<number>} path
 * @param {string} message
 * @returns {Node}
 */
App.Arcology.getCellLinkFromPath = function(path, message) {
	return App.Arcology.getCellLink(message, message, () => V.building.renderCell(path));
};

/**
 * @param {string} linkText
 * @param {string} title
 * @param {function():(HTMLDivElement|DocumentFragment)} content
 * @param {function():void} [callback]
 * @returns {HTMLAnchorElement}
 */
App.Arcology.getCellLink = function(linkText, title, content, callback) {
	return App.UI.DOM.link(linkText, () => {
		if (Dialog.isOpen()) {
			Dialog.close();
		}
		if (callback) {
			callback();
			V.building.refresh();
		}
		Dialog.setup(title);
		$(Dialog.body()).empty().append(content());
		Dialog.open();
	});
};

/**
 * Upgrades all instances of cellClass and cellType to newType.
 * Intended for use on guaranteed single hits.
 *
 * @param {App.Arcology.Building} building
 * @param {typeof App.Arcology.Cell.BaseCell} cellClass
 * @param {*} cellType
 * @param {*} newType
 * @param {string} [key="type"]
 */
App.Arcology.cellUpgrade = function(building, cellClass, cellType, newType, key = "type") {
	building.findCells(cell => cell instanceof cellClass && cell[key] === cellType)
		.forEach(cell => { cell[key] = newType; });
};

/**
 * Updates V.arcologies[0].ownership.
 */
App.Arcology.updateOwnership = function() {
	const allCells = V.building.findCells(cell => !(cell instanceof App.Arcology.Cell.Filler));
	const ownedCells = allCells.filter(cell => cell.owner === 1);

	const ratio = ownedCells.length / allCells.length;

	V.arcologies[0].ownership = Math.round(100 * ratio);
};

/**
 * @param {string} [terrain="default"]
 * @returns {App.Arcology.Building}
 */
App.Arcology.defaultBuilding = function(terrain = "default") {
	/**
	 * @type {arcologyEnvironment}
	 */
	const env = {terrain: terrain, established: false, fs: "New"};
	const candidates = App.Arcology.presets.filter(preset => preset.isAllowed(env));
	return candidates.pluck().construct(env).building;
};

/**
 * Determine whether the arcology has a shop of a particular type
 * @param {string} type
 * @returns {boolean}
 */
App.Arcology.hasShopOfType = function(type) {
	return V.building.findCells(cell => (cell instanceof App.Arcology.Cell.Shop) && cell.type === type).length > 0;
};

/**
 * Order of the building sections. All possible sections have to be added here.
 *
 * @type {string[]}
 */
App.Arcology.sectionOrder = ["fountain", "penthouse", "spire", "shops", "ravine-markets", "apartments", "markets", "manufacturing"];

/**
 * @param {App.Entity.Facilities.Facility} facility
 * @param {string} [passageName]
 * @returns {Node}
 */
App.Arcology.facilityCellContent = function(facility, passageName) {
	const res = document.createDocumentFragment();
	res.append(App.UI.DOM.passageLink(facility.UIName, passageName || facility.genericName));
	const report = facility.occupancyReport(false);
	if (report !== "") {
		const stats = document.createElement("span");
		stats.textContent = ` (${report})`;
		res.append(stats);
	}
	return res;
};

App.Arcology.Section = class extends App.Entity.Serializable {
	/**
	 * @param {string} id unique ID
	 * @param {Array<Array<App.Arcology.Cell.BaseCell>>} rows
	 * @param {boolean} [groundLevel=false] if the section the ground level, all lower layers are automatically in the basement
	 */
	constructor(id, rows, groundLevel = false) {
		super();
		/**
		 * @type {string}
		 */
		this.id = id;
		/**
		 * @type {Array<Array<App.Arcology.Cell.BaseCell>>}
		 */
		this.rows = rows;
		this.groundLevel = groundLevel;
	}

	get width() {
		let maxWidth = 0;

		this.rows.forEach(cells => {
			let width = 0;
			cells.forEach(cell => {
				width += cell.width;
			});
			maxWidth = Math.max(maxWidth, width);
		});
		return maxWidth;
	}

	/**
	 * @param {number} elementWidth in %
	 * @param {number} index
	 * @returns {DocumentFragment}
	 */
	render(elementWidth, index) {
		/**
		 * @param {App.Arcology.Cell.BaseCell} cell
		 * @param {number} rowIndex
		 * @param {number} cellIndex
		 * @returns {HTMLDivElement}
		 */
		function createCell(cell, rowIndex, cellIndex) {
			return cell.renderCell([index, rowIndex, cellIndex], elementWidth);
		}

		/**
		 * @param {Array<App.Arcology.Cell.BaseCell>} row
		 * @param {number} rowIndex
		 * @returns {HTMLDivElement}
		 */
		function createRow(row, rowIndex) {
			const div = document.createElement("div");
			div.classList.add("row");

			row.forEach((cell, cellIndex) => {
				div.append(createCell(cell, rowIndex, cellIndex));
			});

			return div;
		}

		const fragment = document.createDocumentFragment();

		this.rows.forEach((row, rowIndex) => {
			fragment.append(createRow(row, rowIndex));
		});

		return fragment;
	}

	/**
	 * @param {Array<number>} path of the form [i, j]
	 * @param {App.Arcology.Building} containingBuilding
	 * @returns {DocumentFragment}
	 */
	renderCell(path, containingBuilding) {
		return this.rows[path[0]][path[1]].cellPassage(containingBuilding);
	}

	/**
	 * @param {function(App.Arcology.Cell.BaseCell): boolean} predicate
	 * @returns {Array<App.Arcology.Cell.BaseCell>}
	 */
	findCells(predicate) {
		const cells = [];
		for (const row of this.rows) {
			for (const cell of row) {
				if (predicate(cell)) {
					cells.push(cell);
				}
			}
		}
		return cells;
	}

	/**
	 * Replaces the first occurrence of oldCell with newCell
	 *
	 * @param {App.Arcology.Cell.BaseCell} oldCell
	 * @param {App.Arcology.Cell.BaseCell} newCell
	 * @returns {boolean}
	 */
	replaceCell(oldCell, newCell) {
		for (const row of this.rows) {
			for (let i = 0; i < row.length; i++) {
				if (row[i] === oldCell) {
					row[i] = newCell;
					return true;
				}
			}
		}
		return false;
	}

	static _cleanupConfigScheme(config) {
		super._cleanupConfigScheme(config);
		// BC code
	}

	clone() {
		return (new App.Arcology.Section())._init(this);
	}

	get className() { return "App.Arcology.Section"; }
};

App.Arcology.Building = class extends App.Entity.Serializable {
	/**
	 * @param {string} layout reference to the used layout so we now how to do layout specific actions. (upgrading)
	 * @param {Array<App.Arcology.Section>} sections
	 */
	constructor(layout, sections) {
		super();
		/**
		 * @type {string}
		 */
		this.layout = layout;
		/**
		 * List of all already taken upgrades.
		 * @type {Array<string>}
		 */
		this.usedUpgrades = [];
		/**
		 * @type {Array<App.Arcology.Section>}
		 */
		this.sections = sections;
	}

	/**
	 * @returns {HTMLDivElement}
	 */
	render() {
		const div = document.createElement("div");
		div.id = "arcology-building-container";
		div.append(this.renderInner());
		return div;
	}

	refresh() {
		App.UI.DOM.replace("#arcology-building-container", this.renderInner());
	}

	/**
	 * @returns {DocumentFragment}
	 */
	renderInner() {
		const fragment = document.createDocumentFragment();

		let maxWidth = 0;
		this.sections.forEach(section => {
			maxWidth = Math.max(section.width, maxWidth);
		});
		const elementWidth = 100 / maxWidth;

		const upperLevels = document.createElement("div");
		upperLevels.classList.add("building");
		const basement = document.createElement("div");
		basement.classList.add("building", "basement");

		let wrapper = upperLevels;
		sortArrayByArray(App.Arcology.sectionOrder, this.sections, "id")
			.forEach((section, index) => {
				wrapper.append(section.render(elementWidth, index));
				if (section.groundLevel) {
					// if there are multiple sections that are ground level the first (highest) section wins and all
					// others are in the basement.
					wrapper = basement;
				}
			});

		fragment.append(upperLevels, basement);
		return fragment;
	}

	/**
	 * @param {Array<*>} path
	 * @returns {DocumentFragment}
	 */
	renderCell(path) {
		return this.sections[path[0]].renderCell(path.slice(1), this);
	}

	/**
	 * @param {function(App.Arcology.Cell.BaseCell): boolean} predicate
	 * @returns {Array<App.Arcology.Cell.BaseCell>}
	 */
	findCells(predicate) {
		return this.sections.reduce(
			(cells, section) => {
				cells.push(...section.findCells(predicate));
				return cells;
			}, []);
	}

	/**
	 * @param {App.Arcology.Cell.BaseCell} oldCell
	 * @param {App.Arcology.Cell.BaseCell} newCell
	 * @returns {boolean}
	 */
	replaceCell(oldCell, newCell) {
		for (let section of this.sections) {
			if (section.replaceCell(oldCell, newCell)) {
				return true;
			}
		}
		return false;
	}

	static _cleanupConfigScheme(config) {
		super._cleanupConfigScheme(config);
		if (config.layout === undefined) {
			config.layout = V.terrain;
		}
	}

	clone() {
		return (new App.Arcology.Building())._init(this);
	}

	get className() { return "App.Arcology.Building"; }
};
