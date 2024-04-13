/**
 * @param {App.Entity.SlaveState} slave
 * @param {function():void} contentRefresh
 * @returns {DocumentFragment}
 */
App.UI.SlaveInteract.wardrobe = function(slave, contentRefresh) {
	const {
		him,
		his,
	} = getPronouns(slave);

	const T = State.temporary;
	if (!T.filters) {
		T.filters = {};
	}

	return contents();

	function contents() {
		const frag = new DocumentFragment();

		if (slave.fuckdoll === 0) {
			frag.append(filtersDOM());
			frag.append(chooseHerOwn());
			frag.append(clothes());
			frag.append(mask());
			frag.append(mouth());
			if (slave.armAccessory !== "none" || hasAnyArms(slave)) {
				frag.append(armAccessory());
			}
			frag.append(shoes());
			frag.append(legAccessory());
			frag.append(bellyAccessory());
			frag.append(buttplug());
			frag.append(buttplugAttachment());
			if (slave.vagina > -1) {
				frag.append(vaginalAccessory());
				frag.append(vaginalAttachment());
			}
			if (slave.dick > 0) {
				frag.append(dickAccessory());
			}
			frag.append(chastity());
		} else {
			frag.append(clothes());
		}

		App.UI.DOM.appendNewElement("h3", frag, `Shopping`);
		frag.append(shopping());

		return frag;
	}

	function filtersDOM() {
		const el = document.createElement("p");
		el.classList.add("filter-row");
		el.append("Filters: ");

		const niceFilters = new Map([
			[false, "Nice"],
			[true, "Harsh"],
		]);
		el.append(filterButtons(niceFilters, "harsh"));

		const exposureFilters = new Map([
			[0, "Modest"],
			[1, "Normal"],
			[2, "Slutty"],
			[3, "Humiliating"],
			[4, "Practically nude"],
		]);
		el.append(filterButtons(exposureFilters, "exposure"));

		const FSFilters = new Map([]);
		for (const FS of App.Data.FutureSociety.fsNames) {
			if (V.arcologies[0][FS] > 0) {
				FSFilters.set(FS, App.Data.FutureSociety.records[FS].noun);
			}
		}
		el.append(filterButtons(FSFilters, "FSLoves"));

		// clear filters
		const resetButton = App.UI.DOM.makeElement("button", "Reset Filters");
		resetButton.onclick = () => {
			T.filters = {};
			refresh();
		};
		App.UI.DOM.appendNewElement("span", el, resetButton, "button-group");
		return el;
	}

	/**
	 * @param {Map<number|boolean, string>} filters
	 * @param {string} filterKey
	 * @returns {HTMLSpanElement}
	 */
	function filterButtons(filters, filterKey) {
		let span = document.createElement("span");
		span.classList.add("button-group");
		for (const [num, string] of filters) {
			const button = App.UI.DOM.makeElement("button", string);
			if (T.filters[filterKey] === num) {
				button.classList.add("selected", "disabled");
			} else {
				button.onclick = () => {
					T.filters[filterKey] = num;
					refresh();
				};
			}
			span.append(button);
		}
		return span;
	}

	function chooseHerOwn() {
		const el = document.createElement('div');
		const linkArray = [];

		const label = document.createElement('div');
		label.append(`Slave selects ${his} own outfits: `);

		App.UI.DOM.appendNewElement("span", label, slave.choosesOwnClothes ? "Allowed" : "Forbidden", ["bold"]);

		el.appendChild(label);

		linkArray.push(
			App.UI.DOM.link(
				`Allow`,
				() => {
					slave.choosesOwnClothes = 1;
					refresh();
				},
			)
		);

		linkArray.push(
			App.UI.DOM.link(
				`Forbid`,
				() => {
					slave.choosesOwnClothes = 0;
					refresh();
				},
			)
		);

		App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray), "choices")
			.append(App.UI.DOM.makeElement("span", " Increases or greatly reduces devotion based on whether the slave is obedient (devotion at accepting or higher).", "note"));

		return el;
	}

	function clothes() {
		const clothingDiv = document.createElement('div');
		let links;
		let label;
		if (slave.fuckdoll === 0) {
			// First Row
			label = document.createElement('div');
			label.append(`Clothes: `, App.UI.DOM.spanWithTooltip(slave.clothes, itemTooltip(slave.clothes, "clothes"), ["bold"]));

			if (slave.fuckdoll !== 0 || slave.clothes === "restrictive latex" || slave.clothes === "a latex catsuit" || slave.clothes === "a cybersuit" || slave.clothes === "a comfortable bodysuit") {
				if (V.seeImages === 1 && V.imageChoice === 1) {
					// Color options
					label.appendChild(colorOptions("clothingBaseColor"));
				}
			}

			clothingDiv.appendChild(label);
			links = App.UI.DOM.appendNewElement("div", clothingDiv, clothingSelection());
			links.id = "clothing-selection";
		}

		label = document.createElement('div');
		label.append(`Collar: `, App.UI.DOM.spanWithTooltip(slave.collar, itemTooltip(slave.collar, "collar"), ["bold"]));
		// Choose her own
		if (slave.collar !== `none`) {
			label.append(" ", noneLink("collar"));
		}
		clothingDiv.appendChild(label);

		links = App.UI.DOM.appendNewElement("div", clothingDiv, collar());
		links.id = "collar-selection";

		return clothingDiv;

		function clothingSelection() {
			const el = new DocumentFragment();
			/** @type {FC.Clothes[]} */
			let array = [];

			for (const [key, object] of App.Data.clothes) {
				if (T.filters.hasOwnProperty("exposure") && T.filters.exposure !== object.exposure) {
					continue;
				}
				if (T.filters.hasOwnProperty("harsh") && ((T.filters.harsh === false && object.harsh) || (T.filters.harsh === true && !object.harsh))) {
					continue;
				}
				if (T.filters.hasOwnProperty("FSLoves") && !(object.fs && object.fs.loves && object.fs.loves.has(T.filters.FSLoves))) {
					continue;
				}
				if (object.fuckdoll) { // skip displaying fuckdoll outfits
					continue;
				}
				array.push(key);
			}

			// Sort
			array = array.sort((a, b) => (App.Data.clothes.get(a).name > App.Data.clothes.get(b).name) ? 1 : -1);
			const sortedMap = new Map([]);
			for (const name of array) {
				sortedMap.set(name, App.Data.clothes.get(name));
			}
			const list = generateRows(sortedMap, "clothes", true);
			if (list.children.length > 0) {
				App.UI.DOM.appendNewElement("div", el, list, "choices");
			} else {
				App.UI.DOM.appendNewElement("div", el, "No available clothing meets your criteria", ["note", "choices"]);
			}
			return el;
		}

		function collar() {
			const el = new DocumentFragment();
			let array = [];

			for (const [key, object] of App.Data.slaveWear.collar) {
				if (T.filters.hasOwnProperty("harsh") && ((T.filters.harsh === false && object.harsh) || (T.filters.harsh === true && !object.harsh))) {
					continue;
				}
				array.push(key);
			}

			// Sort
			array = array.sort((a, b) => (App.Data.slaveWear.collar.get(a).name > App.Data.slaveWear.collar.get(b).name) ? 1 : -1);
			const sortedMap = new Map([]);
			for (const name of array) {
				sortedMap.set(name, App.Data.slaveWear.collar.get(name));
			}
			const list = generateRows(sortedMap, "collar", true);
			if (list.children.length > 0) {
				App.UI.DOM.appendNewElement("div", el, list, "choices");
			} else {
				App.UI.DOM.appendNewElement("div", el, "No available collar meets your criteria", ["note", "choices"]);
			}
			return el;
		}
	}

	function mask() {
		const el = document.createElement('div');

		const label = document.createElement('div');
		label.append(`Mask: `, App.UI.DOM.spanWithTooltip(slave.faceAccessory, itemTooltip(slave.faceAccessory, "faceAccessory"), ["bold"]));

		// Choose her own
		if (slave.faceAccessory !== `none`) {
			label.append(" ", noneLink("faceAccessory"));
		}

		el.appendChild(label);

		let array = Array.from(App.Data.slaveWear.faceAccessory.keys());

		// Sort
		array = array.sort((a, b) => (App.Data.slaveWear.faceAccessory.get(a).name > App.Data.slaveWear.faceAccessory.get(b).name) ? 1 : -1);
		const sortedMap = new Map([]);
		for (const name of array) {
			sortedMap.set(name, App.Data.slaveWear.faceAccessory.get(name));
		}

		let links = document.createElement('div');
		links.className = "choices";
		links.appendChild(generateRows(sortedMap, "faceAccessory", true));
		el.appendChild(links);

		if (slave.eyewear === "corrective glasses" || slave.eyewear === "glasses" || slave.eyewear === "blurring glasses" || slave.faceAccessory === "porcelain mask") {
			// Color options
			links = document.createElement('div');
			links.className = "choices";
			links.append(`Color: `);
			links.appendChild(colorOptions("glassesColor"));
			let note = document.createElement('span');
			note.className = "note";
			note.textContent = ` Glasses and porcelain masks share the same custom color.`;
			links.appendChild(note);
			el.appendChild(links);
		}

		return el;
	}

	function mouth() {
		const el = document.createElement('div');

		const label = document.createElement('div');
		label.append(`Gag: `, App.UI.DOM.spanWithTooltip(slave.mouthAccessory, itemTooltip(slave.mouthAccessory, "mouthAccessory"), ["bold"]));

		// Choose her own
		if (slave.mouthAccessory !== `none`) {
			label.append(" ", noneLink("mouthAccessory"));
		}

		el.appendChild(label);

		let array = Array.from(App.Data.mouthAccessory.keys());

		// Sort
		array = array.sort((a, b) => (App.Data.mouthAccessory.get(a).name > App.Data.mouthAccessory.get(b).name) ? 1 : -1);
		const sortedMap = new Map([]);
		for (const name of array) {
			sortedMap.set(name, App.Data.mouthAccessory.get(name));
		}

		let links = document.createElement('div');
		links.className = "choices";
		links.appendChild(generateRows(sortedMap, "mouthAccessory", true));
		el.appendChild(links);

		return el;
	}

	function armAccessory() {
		const el = document.createElement('div');
		// App.Desc.armwear(slave)

		const label = document.createElement('div');
		label.append(`Arm accessory: `, App.UI.DOM.spanWithTooltip(slave.armAccessory, itemTooltip(slave.armAccessory, "armAccessory"), ["bold"]));

		// Choose her own
		if (slave.armAccessory !== "none") {
			label.append(" ", noneLink("armAccessory"));
		}

		el.appendChild(label);

		let links = document.createElement('div');
		links.className = "choices";
		links.appendChild(generateRows(App.Data.slaveWear.armAccessory, "armAccessory", false));
		el.appendChild(links);

		return el;
	}

	function shoes() {
		const el = document.createElement('div');
		const label = App.UI.DOM.appendNewElement("div", el, `Shoes: `);

		label.append(App.UI.DOM.spanWithTooltip(slave.shoes, itemTooltip(slave.shoes, "shoes"), ["bold"]));

		/* We have "barefoot" in App.Data.slaveWear.slaveWear to cover for this
			// Choose her own
			if (slave.shoes !== `none`) {
				let choiceOptionsMap = [];
				choiceOptionsMap.push({text: `None`, updateSlave: {shoes: `none`}});
				label.appendChild(generateRows(choiceOptionsMap, "shoes", false));
			}
		*/

		let array = Array.from(App.Data.shoes.keys());

		// Sort
		// No sort here since we want light -> advanced. optionsArray = optionsArray.sort((a, b) => (a.text > b.text) ? 1 : -1);

		// Options
		let links = document.createElement('div');
		links.className = "choices";
		const sortedMap = new Map([]);
		for (const name of array) {
			sortedMap.set(name, App.Data.shoes.get(name));
		}
		links.appendChild(generateRows(sortedMap, "shoes", true));
		el.appendChild(links);

		if (V.seeImages === 1 && V.imageChoice === 1 && slave.shoes !== "none") {
			// Color options
			links = App.UI.DOM.appendNewElement("div", el, `Color: `, "choices");
			links.appendChild(colorOptions("shoeColor"));
		}

		return el;
	}

	function legAccessory() {
		const el = document.createElement('div');
		const label = App.UI.DOM.appendNewElement("div", el, `Leg accessory: `);

		label.append(App.UI.DOM.spanWithTooltip(slave.legAccessory, itemTooltip(slave.legAccessory, "legAccessory"), ["bold"]));

		// Choose her own
		if (slave.legAccessory !== "none") {
			label.append(" ", noneLink("legAccessory"));
		}

		App.UI.DOM.appendNewElement("div", el, generateRows(App.Data.slaveWear.legAccessory, "legAccessory", false), "choices");

		return el;
	}

	function bellyAccessory() {
		/** @type {Array<FC.BellyAccessory>} */
		let array = [];
		/** @type {Array<FC.BellyAccessory>} */
		let empathyArray = [];

		for (const [key, object] of App.Data.bellyAccessory) {
			if (key === "none") {
				// skip none in set, we set the link elsewhere.
				continue;
			}
			if (object.hasOwnProperty("empathyBelly")) {
				empathyArray.push(key);
			} else {
				array.push(key);
			}
		}

		// Sort
		// No sort here since we want small -> large.optionsArray = optionsArray.sort((a, b) => (a.text > b.text) ? 1 : -1);

		let el = document.createElement('div');

		let label = App.UI.DOM.appendNewElement("div", el, `Belly accessory: `);

		label.append(App.UI.DOM.spanWithTooltip(slave.bellyAccessory, itemTooltip(slave.bellyAccessory, "bellyAccessory"), ["bold"]));

		// Choose her own
		if (slave.bellyAccessory !== `none`) {
			label.append(" ", noneLink("bellyAccessory"));
		}

		// Options
		let sortedMap = new Map([]);
		for (const name of array) {
			sortedMap.set(name, App.Data.bellyAccessory.get(name));
		}
		App.UI.DOM.appendNewElement("div", el, generateRows(sortedMap, "bellyAccessory", true), "choices");

		sortedMap = new Map([]);
		for (const name of empathyArray) {
			sortedMap.set(name, App.Data.bellyAccessory.get(name));
		}
		App.UI.DOM.appendNewElement("div", el, generateRows(sortedMap, "bellyAccessory", true), "choices");

		if (slave.pregKnown === 1) {
			App.UI.DOM.appendNewElement("div", el, ` Extreme corsets will endanger the life within ${him}.`, ["note", "choices"]);
		}

		return el;
	}

	function buttplug() {
		// App.Desc.buttplug(slave)
		const el = document.createElement('div');

		const label = document.createElement('div');
		label.append(`Anal accessory: `, App.UI.DOM.spanWithTooltip(slave.buttplug, itemTooltip(slave.buttplug, "buttplug"), ["bold"]));

		if (slave.buttplug !== `none`) {
			label.append(" ", noneLink("buttplug"));
		}
		el.appendChild(label);

		let normalArray = [];
		let longArray = [];

		for (const [key, object] of App.Data.buttplug) {
			if (key === "none") {
				// skip none in set, we set the link elsewhere.
				continue;
			}
			if (object.length > 1) {
				longArray.push(key);
			} else {
				normalArray.push(key);
			}
		}

		// Sort
		// No sort here since we want small -> large. optionsArray = optionsArray.sort((a, b) => (a.text > b.text) ? 1 : -1);

		// Options
		let sortedMap = new Map([]);
		for (const name of longArray) {
			sortedMap.set(name, App.Data.buttplug.get(name));
		}
		App.UI.DOM.appendNewElement("div", el, generateRows(sortedMap, "buttplug", true), "choices");

		sortedMap = new Map([]);
		for (const name of normalArray) {
			sortedMap.set(name, App.Data.buttplug.get(name));
		}
		App.UI.DOM.appendNewElement("div", el, generateRows(sortedMap, "buttplug", true), "choices");

		if (V.customItem.buttplug.size > 0) {
			App.UI.DOM.appendNewElement("div", el, generateRows(V.customItem.buttplug, "buttplug", false), "choices");
		}

		return el;
	}

	function buttplugAttachment() {
		if (slave.buttplug === "none") {
			return new DocumentFragment();
		}

		const el = document.createElement('div');

		const label = document.createElement('div');
		label.append(`Anal accessory attachment: `, App.UI.DOM.spanWithTooltip(slave.buttplugAttachment, itemTooltip(slave.buttplugAttachment, "buttplugAttachment"), ["bold"]));
		if (slave.buttplugAttachment !== `none`) {
			label.append(" ", noneLink("buttplugAttachment"));
		}
		el.appendChild(label);

		el.append(lowerAttachmentList(App.Data.slaveWear.buttplugAttachment, "buttplugAttachment"));
		return el;
	}

	function vaginalAccessory() {
		const el = document.createElement('div');

		const label = document.createElement('div');
		label.append(`Vaginal accessory: `, App.UI.DOM.spanWithTooltip(slave.vaginalAccessory, itemTooltip(slave.vaginalAccessory, "vaginalAccessory"), ["bold"]));

		if (slave.vaginalAccessory !== `none`) {
			label.append(" ", noneLink("vaginalAccessory"));
		}
		el.appendChild(label);

		let bulletArray = [];
		let normalArray = [];
		let longArray = [];

		for (const [key, object] of App.Data.vaginalAccessory) {
			if (key === "none") {
				// skip none in set, we set the link elsewhere.
				continue;
			}
			if (object.width === 0) {
				bulletArray.push(key);
			} else if (object.length > 1) {
				longArray.push(key);
			} else {
				normalArray.push(key);
			}
		}

		// Sort
		// No sort here since we want small -> large. optionsArray = optionsArray.sort((a, b) => (a.text > b.text) ? 1 : -1);

		// Options
		let sortedMap = new Map([]);
		for (const name of bulletArray) {
			sortedMap.set(name, App.Data.vaginalAccessory.get(name));
		}
		App.UI.DOM.appendNewElement("div", el, generateRows(sortedMap, "vaginalAccessory", true), "choices");

		sortedMap = new Map([]);
		for (const name of normalArray) {
			sortedMap.set(name, App.Data.vaginalAccessory.get(name));
		}
		App.UI.DOM.appendNewElement("div", el, generateRows(sortedMap, "vaginalAccessory", true), "choices");

		sortedMap = new Map([]);
		for (const name of longArray) {
			sortedMap.set(name, App.Data.vaginalAccessory.get(name));
		}
		App.UI.DOM.appendNewElement("div", el, generateRows(sortedMap, "vaginalAccessory", true), "choices");
		if (V.customItem.vaginalAccessory.size > 0) {
			App.UI.DOM.appendNewElement("div", el, generateRows(V.customItem.vaginalAccessory, "vaginalAccessory", false), "choices");
		}
		return el;
	}

	function vaginalAttachment() {
		// TODO: This check should occur when setting the accessory
		if (dildoWidth(slave) === 0) {
			slave.vaginalAttachment = "none";
			return new DocumentFragment();
		}

		let el = document.createElement('div');
		const label = document.createElement('div');
		label.append(`Vaginal accessory attachment: `, App.UI.DOM.spanWithTooltip(slave.vaginalAttachment, itemTooltip(slave.vaginalAttachment, "vaginalAttachment"), ["bold"]));

		if (slave.vaginalAttachment !== `none`) {
			label.append(" ", noneLink("vaginalAttachment"));
		}
		el.append(label);

		el.append(lowerAttachmentList(App.Data.slaveWear.vaginalAttachment, "vaginalAttachment"));
		return el;
	}

	function dickAccessory() {
		const el = document.createElement('div');

		const label = document.createElement('div');
		label.append(`Dick accessory: `, App.UI.DOM.spanWithTooltip(slave.dickAccessory, itemTooltip(slave.dickAccessory, "dickAccessory"), ["bold"]));

		if (slave.dickAccessory !== `none`) {
			label.append(" ", noneLink("dickAccessory"));
		}
		el.appendChild(label);

		el.append(lowerAttachmentList(App.Data.slaveWear.dickAccessory, "dickAccessory"));
		return el;
	}

	/**
	 * @param {slaveWearCategory} data
	 * @param {string} category
	 * @returns {HTMLDivElement}
	 */
	function lowerAttachmentList(data, category) {
		let keys = [];
		for (const key of data.keys()) {
			if (key === "none") {
				// skip none in set, we set the link elsewhere.
				continue;
			}
			keys.push(key);
		}

		// Sort
		keys = keys.sort((a, b) => (a > b) ? 1 : -1);

		// Options
		const sortedMap = new Map([]);
		for (const name of keys) {
			sortedMap.set(name, data.get(name));
		}
		let links = document.createElement("div");
		links.className = "choices";
		links.appendChild(generateRows(sortedMap, category, true));
		return links;
	}

	function chastity() {
		const el = document.createElement('div');

		const label = document.createElement('div');
		label.append(`Chastity devices: `);

		/** @type {string} */
		let chastityDevice;
		if (slave.choosesOwnChastity === 1) {
			chastityDevice = `choosing ${his} own chastity`;
		} else if (slave.chastityAnus === 1 && slave.chastityPenis === 1 && slave.chastityVagina === 1) {
			chastityDevice = `full chastity`;
		} else if (slave.chastityPenis === 1 && slave.chastityVagina === 1) {
			chastityDevice = `genital chastity`;
		} else if (slave.chastityAnus === 1 && slave.chastityPenis === 1) {
			chastityDevice = `combined chastity cage`;
		} else if (slave.chastityAnus === 1 && slave.chastityVagina === 1) {
			chastityDevice = `combined chastity belt`;
		} else if (slave.chastityVagina === 1) {
			chastityDevice = `chastity belt`;
		} else if (slave.chastityPenis === 1) {
			chastityDevice = `chastity cage`;
		} else if (slave.chastityAnus === 1) {
			chastityDevice = `anal chastity`;
		} else if (slave.chastityAnus === 0 && slave.chastityPenis === 0 && slave.chastityVagina === 0) {
			chastityDevice = `none`;
		} else {
			chastityDevice = `THERE HAS BEEN AN ERROR `;
		}

		label.append(App.UI.DOM.spanWithTooltip(chastityDevice, itemTooltip(chastityDevice, "chastity"), ["bold"]));

		if (slave.chastityAnus !== 0 || slave.chastityPenis !== 0 || slave.chastityVagina !== 0) {
			label.append(" ",
				App.UI.DOM.link(
					`None`,
					() => {
						Object.assign(
							slave,
							{
								choosesOwnChastity: 0,
								chastityAnus: 0,
								chastityPenis: 0,
								chastityVagina: 0
							});
						refresh();
					}
				)
			);
		}
		el.appendChild(label);

		let optionsArray = [];

		for (const key of App.Data.chastity.keys()) {
			if (key === "none") {
				// skip none in set, we set the link elsewhere.
				continue;
			}
			optionsArray.push(key);
		}

		// Options
		const linkArray = [];
		for (const name of optionsArray) {
			const object = App.Data.chastity.get(name);
			if (object && object.fs && object.fs.unlocks && FutureSocieties.isActive(object.fs.unlocks)) { // Really simple requirements check here since FS is the only way to unlock chastity options
				continue;
			}
			if (object.updateSlave.chastityPenis && slave.dick === 0) {
				continue;
			}
			if (object.updateSlave.chastityVagina && slave.vagina < 0) {
				continue;
			}
			linkArray.push(
				App.UI.DOM.link(
					object.name,
					() => {
						Object.assign(slave, object.updateSlave);
						refresh();
					},
					[],
					"",
					object.note
				)
			);
		}
		let links = document.createElement('div');
		links.className = "choices";
		links.append(App.UI.DOM.generateLinksStrip(linkArray));
		el.appendChild(links);

		return el;
	}

	function shopping() {
		return App.UI.DOM.passageLink(
			`Go shopping for more options`,
			"Wardrobe"
		);
	}

	/**
	 * @param {string} update
	 * @returns {Node}
	 */
	function colorOptions(update) {
		const el = new DocumentFragment();
		const colorChoice = App.UI.DOM.colorInput(
			slave[update],
			v => {
				slave[update] = v;
				refresh();
			}
		);
		el.appendChild(colorChoice);

		if (slave[update]) {
			el.appendChild(
				App.UI.DOM.link(
					` Reset`,
					() => {
						delete slave[update];
						refresh();
					},
				)
			);
		}
		return el;
	}

	function refresh() {
		if (V.aiCachingStrategy === 'reactive') { contentRefresh(); } else {
			App.Events.refreshEventArt(slave);
			contentRefresh();
		}
	}

	/**
	 * Figure out a tooltip text to use based on clothing name.
	 * - Described effects are mainly from saClothes.js some are from saLongTermMentalEffects.js or saLongTermPhysicalEffects.js
	 * - Potential fetish revelations are not mentioned.
	 * - Chastity options could mention that at least fucktoys can appreciate maintaining their virginity, but I assume
	 *   just choosing a hole to focus on has the same effect, so it's not really a clothing effect.
	 * - what's the word for below 20 devotion slaves? Disobedient?
	 * - Also accepting is a bit weird for ones above, I think I've seen obedient being used instead.
	 * @param {string} itemName
	 * @param {string} category
	 * @returns {string|HTMLElement}
	 */
	function itemTooltip(itemName, category) {
		if (itemName === "none" || ["armAccessory", "legAccessory"].includes(category)) {
			return "No effect one way or another.";
		}
		let desc = [];
		let item;
		if (App.Data[category]) {
			item = App.Data[category].get(itemName);
		} else {
			item = App.Data.slaveWear[category].get(itemName);
		}
		if (!item && V.customItem[category]) {
			item = V.customItem[category].get(itemName);
		}

		switch (category) {
			case "clothes":
				if (itemName === "no clothing") {
					desc.push("Increases devotion for resistant slaves, humiliation fetishists, submissives and nymphos.");
				} else if (item) {
					switch (item.exposure) {
						case 4:
							desc.push("Might as well be naked.");
							break;
						case 3:
							desc.push("Humiliating.");
							break;
						case 2:
							desc.push("Slutty.");
							break;
						case 1:
							desc.push("Normal.");
							break;
						case 0:
							desc.push("Modest.");
							break;
					}
				}
				break;
			case "collar":
				if (item.harsh) {
					desc.push("Increases fear for non-obedient slaves.");
				} else {
					desc.push("On obedient slaves reduces fear, on non-obedient ones reduces fear a lot and devotion somewhat.");
				}
				break;
			case "shoes":
				if (item.heelHeight === 0) {
					desc.push("Have no effect one way or another.");
				} else if (item.heelHeight > 20) {
					desc.push(`Increases height, slaves with natural legs who are resistant resent and fear wearing them while non-resistant ones become more fearful(unless masochistic) and obedient. Heel height: ${item.heelHeight}cm.`);
				} else {
					desc.push(`Increases height, resistant slaves with natural legs resent wearing them. Heel height: ${item.heelHeight}cm.`);
				}
				if (item.platformHeight > 0) {
					desc.push(`Platform height: ${item.platformHeight}cm.`);
				}
				break;
			case "bellyAccessory":
				if (item.empathyBelly) {
					desc.push("Strengthens or removes(a weak) pregnancy fetish and affects devotion in various ways depending on devotion, fertility and having a pregnancy fetish or breeder flaw.");
				}
				break;
			case "vaginalAccessory":
				if (item.vibrates >= 2) {
					desc.push("Increases devotion and affects a specific fetish, attraction or sex drive.");
				} else if (item.vibrates === 1) {
					desc.push("Increases devotion but weakens fetish and libido.");
				} else if (item.width >= 3) {
					desc.push("Stretches vagina into a cavernous one, on smaller vaginas size queens get much more devoted, masochists and submissives much more devoted and fearful and anyone else becomes much less devoted and trusting. Might cause miscarriage.");
				} else if (item.width === 2) {
					desc.push("Stretches vagina into a loose one, on a tight vagina increases obedience and fear.");
				} else if (item.width === 1) {
					if (item.length >= 2) {
						desc.push("Stretches vagina from virgin to tight, might remove hatred of penetration. Makes size queens happy while others less trusting.");
					} else {
						desc.push("Stretches vagina from virgin to tight, might remove hatred of penetration.");
					}
				}
				break;
			case "buttplug":
				if (item.width >= 3) {
					desc.push("Stretches butthole into a cavernous one, on smaller buttholes size queens get much more devoted, masochists and submissives much more devoted and fearful and anyone else becomes much less devoted and trusting.");
				} else if (item.width === 2) {
					desc.push("Stretches butthole into a loose one, on a tight butthole increases obedience and fear.");
				} else if (item.width === 1) {
					if (item.length >= 2) {
						desc.push("Stretches butthole from virgin to tight, might remove hatred of penetration. Makes size queens happy.");
					} else {
						desc.push("Stretches butthole from virgin to tight, might remove hatred of anal.");
					}
				}
				break;
			case "buttplugAttachments":
				if (itemName !== "none" && App.Data.slaveWear.buttplugAttachment.get(itemName)) {
					desc.push("Makes it more scary to wear a plug but might give humiliation fetish,");
				}
				break;
			case "dickAccessory":
				if (item.vibrates >= 2) {
					desc.push("Increases devotion and affects a specific fetish, attraction or sex drive.");
				} else if (item.vibrates === 1) {
					desc.push("Increases devotion but weakens fetish and libido.");
				}
				break;
		}

		if (item) {
			if (item.note) {
				desc.push(item.note);
			}
			if (item.fs) {
				const reactions = new Map([
					["loves", "like"],
					["tolerates", "tolerate"],
					["hates", "hate"],
				]);
				for (const [key, value] of reactions) {
					if (item.fs[key]) {
						const lovers = [];
						for (const FS of item.fs[key]) {
							lovers.push(App.Data.FutureSociety.records[FS].noun);
						}
						if (lovers.length > 0) {
							desc.push(`${toSentence(lovers)} will ${value} this look.`);
						}
					}
				}
			}
		}

		if (desc.length === 0) {
			return undefined;
		}
		if (desc.length <= 1) {
			return desc[0];
		}
		const f = document.createElement("ul");
		for (const line of desc) {
			App.UI.DOM.appendNewElement("li", f, line);
		}
		return f;
	}

	/** Generate a row of choices
	 * @param {Map<string, slaveWear>} map
	 * @param {string} [category] - should be in the form of slave.category, the thing we want to update.
	 * @param {boolean} [accessCheck=false]
	 * @returns {HTMLUListElement}
	 */
	function generateRows(map, category, accessCheck = false) {
		const linkArray = [];
		for (const [name, item] of map) {
			let link;
			// Some items will never be in App.Data.slaveWear.slaveWear, especially "none" if it falls in between harsh
			// and nice data sets. Trying to look it up would cause an error, which is what access check works around.
			const unlocked = (accessCheck === true) ? isItemAccessible.entry(name, category, slave) : false;
			if (accessCheck === false || unlocked) {
				if (typeof unlocked === 'string') { // is it just text?
					link = App.UI.DOM.disabledLink(item.name, [unlocked]);
				} else {
					link = document.createElement('span');

					// Set up the link
					link.appendChild(
						App.UI.DOM.link(
							`${item.name}`,
							() => {
								slave[category] = name;
								if (category === "clothes") {
									slave.choosesOwnClothes = 0;
								}
								refresh();
							},
							[],
							"",
							itemTooltip(name, category)
						)
					);

					if (item.fs && item.fs.unlocks) {
						link.append(" ", App.UI.DOM.spanWithTooltip(`FS`, FutureSocieties.displayAdj(item.fs.unlocks), ["note"]));
					}
				}
				linkArray.push(link);
			}
		}

		return App.UI.DOM.generateLinksStrip(linkArray);
	}

	function noneLink(slaveSlot) {
		return App.UI.DOM.link(
			`None`,
			() => {
				slave[slaveSlot] = "none";
				refresh();
			}
		);
	}
};
