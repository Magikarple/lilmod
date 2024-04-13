// cSpell:ignore laal, ttsstt

/**
 * @typedef {object} arcologyEnvironment
 * @property {string} terrain
 * @property {boolean} established
 * @property {FC.FutureSociety|"New"} fs
 */
/**
 * @typedef {object} buildingPreset
 * @property {function(arcologyEnvironment):boolean} isAllowed
 * @property {function(arcologyEnvironment):{building: App.Arcology.Building, apply: function():void}} construct
 */

/**
 * @type {Array<buildingPreset>}
 */
App.Arcology.presets = (function() {
	/**
	 * @typedef {object} sectionTemplate
	 * @property {string} id
	 * @property {Array<string>} rows
	 * @property {boolean} [ground]
	 */

	/*
	 NOTE: test new templates, broken templates WILL explode
	 t is markets; () is possible values for a sector, first is default;
	 [number] is for filler space, must be parsable by Number(), 1 equals the width of a normal cell
	 */
	const templates = {
		default: [
			{id: "penthouse", rows: ["p"]},
			{id: "shops", rows: ["sss"]},
			{id: "apartments", rows: ["aaaa", "aaaa", "aaaa"]},
			{id: "markets", rows: ["ttttt"], ground: true},
			{id: "manufacturing", rows: ["mmmmm"]}],
		urban: [
			{id: "penthouse", rows: ["p"]},
			{id: "shops", rows: ["sss"]},
			{id: "apartments", rows: ["aaaa", "aaaa", "dddd"]},
			{id: "markets", rows: ["(dt)tt(dt)", "t(tm)(tm)t"], ground: true},
			{id: "manufacturing", rows: ["mmmm"]}],
		rural: [
			{id: "penthouse", rows: ["p"]},
			{id: "shops", rows: ["sss"]},
			{id: "apartments", rows: ["aaaaa", "aaaaa"]},
			{id: "markets", rows: ["tt(mt)(mt)tt"], ground: true},
			{id: "manufacturing", rows: ["mmmmm"]}],
		ravine: [
			{id: "penthouse", rows: ["p"]},
			{id: "shops", rows: ["sss"]},
			{id: "ravine-markets", rows: ["ttttt"], ground: true},
			{id: "apartments", rows: ["aaaa", "aaaa", "aaaa"]},
			{id: "manufacturing", rows: ["mmmmm"]}],
		marine: [
			{id: "penthouse", rows: ["p"]},
			{id: "shops", rows: ["ssss"]},
			{id: "apartments", rows: ["laal", "aaaa", "aaaa"]},
			{id: "markets", rows: ["tt(mt)tt"], ground: true},
			{id: "manufacturing", rows: ["(tm)mmm(tm)"]}],
		oceanic: [
			{id: "penthouse", rows: ["p"]},
			{id: "shops", rows: ["sss"]},
			{id: "apartments", rows: ["llll", "aaaa", "aaaa"]},
			{id: "markets", rows: ["ttttt"], ground: true},
			{id: "manufacturing", rows: ["mmmmm"]}],
		dick: [ // yes, this is a giant dick
			{id: "penthouse", rows: ["l", "p"]},
			{id: "apartments", rows: ["a", "a", "a", "d[0.75]a[0.75]d", "dd[0.25]s[0.25]dd"]},
			{id: "markets", rows: ["ttsstt"], ground: true},
			{id: "manufacturing", rows: ["tm[0.25]m[0.25]mt", "m[0.75]m[0.75]m"]}],
	};

	/**
	 * @param {keyof templates} layout
	 * @returns {App.Arcology.Building}
	 */
	function templateToBuilding(layout) {
		const sections = templates[layout].map(sect => getSection(sect));
		return new App.Arcology.Building(layout, sections);

		/**
		 * @param {sectionTemplate} section
		 * @returns {App.Arcology.Section}
		 */
		function getSection(section) {
			const rows = section.rows.map(row => getRow(row));
			return new App.Arcology.Section(section.id, rows, section.ground === true /* to ensure no undefined gets through */);
		}

		/**
		 * @param {string} rowTemplate
		 * @returns {App.Arcology.Cell.BaseCell[]}
		 */
		function getRow(rowTemplate) {
			const cells = [];
			const iter = rowTemplate[Symbol.iterator]();

			let next = iter.next();
			while (!next.done) {
				if (next.value === "(") {
					next = iter.next();
					const cell = charToCell(next.value).cell;
					do {
						cell.allowedConversions.push(charToCell(next.value).code);
						next = iter.next();
					} while (next.value !== ")");
					cells.push(cell);
				} else if (next.value === "[") {
					let number = "";
					next = iter.next();
					while (next.value !== "]") {
						number += next.value;
						next = iter.next();
					}
					cells.push(new App.Arcology.Cell.Filler(Number(number)));
				} else {
					cells.push(charToCell(next.value).cell);
				}
				next = iter.next();
			}

			return cells;
		}

		/**
		 * @param {string} char
		 * @returns {{cell: App.Arcology.Cell.BaseCell, code:string}}
		 */
		function charToCell(char) {
			switch (char) {
				case "p":
					return {cell: new App.Arcology.Cell.Penthouse(), code: "Penthouse"};
				case "s":
					return {cell: new App.Arcology.Cell.Shop(1), code: "Shop"};
				case "l":
					return {cell: new App.Arcology.Cell.Apartment(1, 1), code: "Apartment"};
				case "a":
					return {cell: new App.Arcology.Cell.Apartment(1), code: "Apartment"};
				case "d":
					return {cell: new App.Arcology.Cell.Apartment(1, 3), code: "Apartment"};
				case "t":
					return {cell: new App.Arcology.Cell.Market(1), code: "Market"};
				case "m":
					return {cell: new App.Arcology.Cell.Manufacturing(1), code: "Manufacturing"};
				default:
					return {cell: new App.Arcology.Cell.BaseCell(1), code: "BaseCell"};
			}
		}
	}

	/**
	 * @param {App.Arcology.Building} building
	 * @param {arcologyEnvironment} environment
	 * @returns {{building: App.Arcology.Building, apply: function()}}
	 */
	function randomizeBuilding(building, environment) {
		if (Math.random() < 0.5) {
			addFsShop(building, environment.fs);
		}
		return {building: building, apply: () => { }};
	}

	/**
	 * @param {App.Arcology.Building} building
	 * @param {FC.FutureSociety|"New"} fs
	 */
	function addFsShop(building, fs) {
		function randomShop() {
			return /** @type {App.Arcology.Cell.Shop} */(building.findCells(cell => cell instanceof App.Arcology.Cell.Shop).random());
		}

		const fsEntry = App.Data.FutureSociety.records[fs];
		if (fsEntry && fsEntry.deco) {
			randomShop().type = fsEntry.deco;
		}
	}

	return [
		/* basic types for controlled start */
		{
			isAllowed: env => !env.established && env.terrain === "default",
			construct: () => { return {building: templateToBuilding("default"), apply: () => {}}; }
		}, {
			isAllowed: env => !env.established && env.terrain === "urban",
			construct: () => { return {building: templateToBuilding("urban"), apply: () => {}}; }
		}, {
			isAllowed: env => !env.established && env.terrain === "rural",
			construct: () => { return {building: templateToBuilding("rural"), apply: () => {}}; }
		}, {
			isAllowed: env => !env.established && env.terrain === "ravine",
			construct: () => { return {building: templateToBuilding("ravine"), apply: () => {}}; }
		}, {
			isAllowed: env => !env.established && env.terrain === "marine",
			construct: () => { return {building: templateToBuilding("marine"), apply: () => {}}; }
		}, {
			isAllowed: env => !env.established && env.terrain === "oceanic",
			construct: () => { return {building: templateToBuilding("oceanic"), apply: () => {}}; }
		},
		/* crazy presets for established arcologies TODO: */
		{
			isAllowed: env => env.established && env.terrain === "default",
			construct: env => { return randomizeBuilding(templateToBuilding("default"), env); }
		}, {
			isAllowed: env => env.established && env.terrain === "urban",
			construct: env => { return randomizeBuilding(templateToBuilding("urban"), env); }
		}, {
			isAllowed: env => env.established && env.terrain === "rural",
			construct: env => { return randomizeBuilding(templateToBuilding("rural"), env); }
		}, {
			isAllowed: env => env.established && env.terrain === "ravine",
			construct: env => { return randomizeBuilding(templateToBuilding("ravine"), env); }
		}, {
			isAllowed: env => env.established && env.terrain === "marine",
			construct: env => { return randomizeBuilding(templateToBuilding("marine"), env); }
		}, {
			isAllowed: env => env.established && env.terrain === "oceanic",
			construct: env => { return randomizeBuilding(templateToBuilding("oceanic"), env); }
		}, {
			isAllowed: env => env.established && Math.random() < 0.1,
			construct: env => { return randomizeBuilding(templateToBuilding("dick"), env); }
		},
	];
}());

/**
 * @param {arcologyEnvironment} environment
 * @returns {buildingPreset}
 */
App.Arcology.randomPreset = function(environment) {
	return App.Arcology.presets.filter(p => p.isAllowed(environment)).random();
};

/**
 * Shows all possible upgrades for a given building.
 * @param {App.Arcology.Building} building
 * @returns {HTMLElement}
 */
App.Arcology.upgrades = function(building) {
	const outerDiv = document.createElement("div");

	/**
	 * @typedef upgrade
	 * @property {string} id used to identify already build upgrades, unique!
	 * @property {Array<string>} layouts
	 * @property {Array<string>} exclusive any upgrade is always exclusive to itself. NOTE: keep in mind that exclusiveness has to be added to both upgrades!
	 * @property {string} name as shown to player.
	 * @property {string} desc Fits in a sentence like this: The next major upgrade needed is "desc"
	 * @property {number} cost
	 * @property {function():void} apply
	 */
	/** @type {Array<upgrade>} */
	const upgrades = [
		{
			id: "spire",
			layouts: ["default", "urban", "rural", "ravine", "marine", "oceanic"],
			exclusive: [], name: "spire",
			desc: "the addition of a spire at the top of the arcology to increase the space available for the wealthiest citizens to own whole floors",
			cost: 250000, apply: () => {
				building.sections.push(new App.Arcology.Section("spire", [
					[new App.Arcology.Cell.Apartment(1, 1), new App.Arcology.Cell.Apartment(1, 1)],
					[new App.Arcology.Cell.Apartment(1, 1), new App.Arcology.Cell.Apartment(1, 1)]
				]));
				V.spire = 1;
			}
		}, {
			id: "fountain",
			layouts: ["dick"],
			exclusive: [], name: "fountain",
			desc: "a monumental fountain on top of the arcology using the latest advancements in building technology making your arcology known far and wide as a great supporter of modern architecture",
			cost: 250000, apply: () => {
				V.building.sections.push(new App.Arcology.Section("fountain", [[
					new App.Arcology.Cell.Decorative({
						width: 170, rotation: 70, xOffset:-130, yOffset: 220, absoluteWidth:1, cellHeight: 330
					}),
					new App.Arcology.Cell.Decorative({
						width: 250, rotation: 95, xOffset:-110, yOffset: 80, absoluteWidth:1
					}),
					new App.Arcology.Cell.Decorative({
						width: 190, rotation: 115, xOffset:-30, yOffset: 190, absoluteWidth:1
					}),
				]]));
				V.spire = 1;
			}
		}
	];

	let count = 0;
	for (let upgrade of upgrades) {
		if (upgrade.layouts.includes(building.layout) &&
			!building.usedUpgrades.includesAny(upgrade.id, ...upgrade.exclusive)) {
			const div = document.createElement("div");
			div.classList.add("choices");
			const cost = upgrade.cost * V.upgradeMultiplierArcology;
			div.append(
				makePurchase(`...${upgrade.desc}`, cost, "capEx", {
					handler: () => {
						if (building.usedUpgrades.length === 0) {
							// the first major upgrade gives skill, successive ones not, mainly because there might be a
							// different number depending on layout.
							V.PC.skill.engineering++;
						}
						building.usedUpgrades.push(upgrade.id);
						upgrade.apply();
						App.UI.reload();
					},
				}),
			);
			outerDiv.append(div);
			count++;
		}
	}

	if (count === 0) {
		return App.UI.DOM.makeElement("span", "The arcology structure is fully upgraded.");
	} else {
		if (count === 1) {
			outerDiv.prepend("The next major upgrade is...");
		} else {
			outerDiv.prepend("Possible major upgrades to the arcology are ...");
		}
		return outerDiv;
	}
};
