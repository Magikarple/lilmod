/**
 * UI for the Body Modification system/studio. Refreshes without refreshing the passage.
 */
App.UI.toyShop = function() {
	const container = document.createElement("span");

	/**
	 * @typedef toyData
	 * @property {string} name
	 * @property {number} width
	 * @property {number} length
	 */

	/**
	 * @typedef toy
	 * @property {string} name
	 * @property {toyData} data
	 * @property {string} selected
	 */

	let buttPlug = {name: "", data: null, selected: ""};
	initToy(buttPlug);
	let vaginalAcc = {name: "", data: null, selected: ""};
	initToy(vaginalAcc);

	container.append(createPage());
	return container;

	function createPage() {
		const el = new DocumentFragment();
		el.append(intro());
		el.append(vaginalAccessory());
		el.append(buttPlugs());
		return el;
	}

	/**
	 * @param {toy} toy
	 */
	function initToy(toy) {
		toy.name = "";
		toy.data = {name: "", width: 1, length: 1};
	}

	function intro() {
		const el = new DocumentFragment();
		// App.UI.DOM.appendNewElement("h1", el, "The Toy Shop");
		App.UI.DOM.appendNewElement("div", el, `The toy shop is filled with the smell of rubber, latex, and various synthetic materials and solvents. A series of screens allows you to design toys of various shapes and sizes, and then produce them at scale. A bin of defects sits in the corner, glistening a bit under a layer of lubrication.`, "scene-intro");
		return el;
	}

	function vaginalAccessory() {
		const frag = new DocumentFragment();
		App.UI.DOM.appendNewElement("h2", frag, "Vaginal Accessories");
		const selectDiv = App.UI.DOM.appendNewElement("div", frag, App.UI.DOM.link("Start a new design", () => {
			initToy(vaginalAcc);
			refresh();
		}));
		if (V.customItem.vaginalAccessory.size > 0) {
			selectDiv.append(selectDesign(vaginalAcc, "vaginalAccessory"));
		}
		/*
		if (V.toys.smartStrapon === 0 && V.PC.dick === 0) {
			frag.append(personalStrapon());
		}
		*/
		frag.append(create());
		return frag;

		function create() {
			const el = new DocumentFragment();
			const existingDesign = V.customItem.vaginalAccessory.get(vaginalAcc.name);
			if (existingDesign) {
				el.append(descLocked());
			} else {
				el.append(desc());
			}
			if (vaginalAcc.data.name) {
				el.append(title(vaginalAcc));
			}
			el.append(
				width(vaginalAcc),
				length(vaginalAcc),
			);

			if (existingDesign) {
				const build = App.UI.DOM.appendNewElement("div", el, `Send updated design to production and make sure all appropriate slaves are updated `);
				const linkArray = [];
				linkArray.push(
					App.UI.DOM.link(
						"Update the mold",
						() => { buildVA(); }
					)
				);

				linkArray.push(
					App.UI.DOM.link(
						`Recall "${vaginalAcc.name}"`,
						() => { deleteVA(); }
					)
				);
				build.append(App.UI.DOM.generateLinksStrip(linkArray));
			} else if (vaginalAcc.name && vaginalAcc.data.name) {
				el.append(apply());
			}

			return el;

			function descLocked() {
				return App.UI.DOM.makeElement("div", `Description has already been selected for this model: "${vaginalAcc.name}"`);
			}
		}

		function desc() {
			const value = App.UI.DOM.makeElement("div", `Enter toy's shape here as it will appear in descriptions: `);
			value.append(App.UI.DOM.makeTextBox(
				vaginalAcc.name,
				v => {
					vaginalAcc.name = v;
					vaginalAcc.data.name = capFirstChar(v);
					refresh();
				}
			));
			App.UI.DOM.appendNewElement("span", value, ` Your slave has a standard ${vaginalAcc.name || `pink dildo`} wedged firmly in their pussy.`, "note");
			return value;
		}

		function buildVA() {
			V.customItem.vaginalAccessory.set(vaginalAcc.name, vaginalAcc.data);
			initToy(vaginalAcc);
			refresh();
		}

		function apply() {
			const build = App.UI.DOM.appendNewElement("div", frag, `Send design to production and make available for all slaves `);
			build.append(
				App.UI.DOM.link(
					"Start the mold",
					() => { buildVA(); }
				)
			);
			return build;
		}

		function deleteVA() {
			V.customItem.vaginalAccessory.delete(vaginalAcc.name);
			for (const slave of V.slaves) {
				if (slave.vaginalAccessory === vaginalAcc.name) {
					slave.vaginalAccessory = "none";
				}
			}
			refresh();
		}
	}

	function buttPlugs() {
		const frag = new DocumentFragment();
		App.UI.DOM.appendNewElement("h2", frag, "Buttplugs");
		const selectDiv = App.UI.DOM.appendNewElement("div", frag, App.UI.DOM.link("Start a new design", () => {
			initToy(buttPlug);
			refresh();
		}));
		if (V.customItem.buttplug.size > 0) {
			selectDiv.append(selectDesign(buttPlug, "buttplug"));
		}
		frag.append(create());
		return frag;

		function create() {
			const el = new DocumentFragment();
			const existingDesign = V.customItem.buttplug.get(buttPlug.name);
			if (existingDesign) {
				el.append(descLocked());
			} else {
				el.append(desc());
			}
			if (buttPlug.data.name) {
				el.append(title(buttPlug));
			}
			el.append(
				width(buttPlug),
				length(buttPlug),
			);

			if (existingDesign) {
				const build = App.UI.DOM.appendNewElement("div", el, `Send updated design to production and make sure all appropriate slaves are updated `);
				const linkArray = [];
				linkArray.push(
					App.UI.DOM.link(
						"Update the mold",
						() => { buildPlug(); }
					)
				);

				linkArray.push(
					App.UI.DOM.link(
						`Recall "${buttPlug.name}"`,
						() => { deletePlug(); }
					)
				);
				build.append(App.UI.DOM.generateLinksStrip(linkArray));
			} else if (buttPlug.name && buttPlug.data.name) {
				el.append(apply());
			}

			return el;

			function descLocked() {
				return App.UI.DOM.makeElement("div", `Description has already been selected for this model: "${buttPlug.name}"`);
			}
		}

		function desc() {
			const value = App.UI.DOM.makeElement("div", `Enter toy's shape here as it will appear in descriptions: `);
			value.append(App.UI.DOM.makeTextBox(
				buttPlug.name,
				v => {
					buttPlug.name = v;
					buttPlug.data.name = capFirstChar(v);
					refresh();
				}
			));
			App.UI.DOM.appendNewElement("span", value, ` Your slave has a standard ${buttPlug.name || `spade-shaped plug`} wedged firmly in their asshole.`, "note");
			return value;
		}

		function buildPlug() {
			V.customItem.buttplug.set(buttPlug.name, buttPlug.data);
			initToy(buttPlug);
			refresh();
		}

		function apply() {
			const build = App.UI.DOM.appendNewElement("div", frag, `Send design to production and make available for all slaves `);
			build.append(
				App.UI.DOM.link(
					"Start the mold",
					() => { buildPlug(); }
				)
			);
			return build;
		}

		function deletePlug() {
			V.customItem.buttplug.delete(buttPlug.name);
			for (const slave of V.slaves) {
				if (slave.buttplug === buttPlug.name) {
					slave.buttplug = "none";
				}
			}
			refresh();
		}
	}

	/**
	 * @param {toy} toy
	 * @returns {HTMLDivElement}
	 */
	function title(toy) {
		const title = App.UI.DOM.makeElement("div", `Enter title as it will appear in lists of choices `);
		title.append(App.UI.DOM.makeTextBox(
			toy.data.name,
			v => {
				toy.data.name = capFirstChar(v);
				refresh();
			}
		));
		return title;
	}

	/**
	 * @param {toy} toy
	 * @returns {HTMLDivElement}
	 */
	function width(toy) {
		const widthOptions = new Map([
			["Standard", 1],
			["Large", 2],
			["Huge", 3],
		]);
		const width = App.UI.DOM.makeElement("div", `Width: `);
		width.append(optionsStrip(toy.data, "width", widthOptions));
		return width;
	}

	/**
	 * @param {toy} toy
	 * @returns {HTMLDivElement}
	 */
	function length(toy) {
		const lengthOptions = new Map([
			["Standard", 1],
			["Long", 2],
		]);
		const length = App.UI.DOM.makeElement("div", `Length: `);
		length.append(optionsStrip(toy.data, "length", lengthOptions));
		return length;
	}

	/**
	 * @param {object} obj
	 * @param {string} objKey
	 * @param {Map<string, any>} map
	 * @returns {HTMLUListElement}
	 */
	function optionsStrip(obj, objKey, map) {
		const linkArray = [];
		for (const [key, value] of map) {
			if (obj[objKey] === value) {
				linkArray.push(
					App.UI.DOM.disabledLink(
						key,
						["Currently selected"]
					)
				);
			} else {
				linkArray.push(
					App.UI.DOM.link(
						key,
						() => {
							obj[objKey] = value;
							refresh();
						}
					)
				);
			}
		}
		return App.UI.DOM.generateLinksStrip(linkArray);
	}

	/**
	 * @param {toy} toy
	 * @param {string} itemKey
	 * @returns {HTMLElement}
	 */
	function selectDesign(toy, itemKey) {
		const choice = App.UI.DOM.makeElement("span", ` or choose an existing design to edit `);
		const options = [];
		for (const [key, values] of V.customItem[itemKey]) {
			options.push({key: key, name: values.name});
		}
		choice.append(App.UI.DOM.makeSelect(options, toy.name, key => {
			toy.selected = key;
			toy.name = toy.selected;
			toy.data = V.customItem[itemKey].get(toy.selected);
			refresh();
		}));
		return choice;
	}

	function refresh() {
		jQuery(container).empty().append(createPage());
		console.log(vaginalAcc);
	}
};
