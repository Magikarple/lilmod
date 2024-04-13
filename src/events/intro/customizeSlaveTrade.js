App.Intro.CustomSlaveTrade = function() {
	let baseControlsFilter = "all";
	/**
	 * @typedef  {"c1"|"c2"|"c3"|"percent"|"10th percent"} adjustModeValue
	 */
	/** @type {adjustModeValue} */
	let adjustMode = "c2";

	const outerContainer = new DocumentFragment();
	App.UI.DOM.appendNewElement("p", outerContainer, `When civilization turned upon itself, some countries readily took to enslaving their own. Others were raided by their neighbors for their desirable, and profitable, citizens. Which nationalities were most affected by the booming slave trade, and thus, likely to appear in your local slave markets?`);

	let dynamicDiv = document.createElement("div");
	dynamicDiv.append(dynamicContent());
	outerContainer.append(dynamicDiv);

	return outerContainer;

	function dynamicContent() {
		const f = new DocumentFragment();

		if (hashSum(V.nationalities) < 1) {
			App.UI.DOM.appendNewElement("p", f, `You cannot be a slaveowner without a slave trade. Please add nationalities to continue.`, ["note"]);
		} else {
			App.UI.DOM.appendNewElement("p", f, App.UI.DOM.passageLink(
				"Confirm customization",
				// @ts-ignore
				V.customWA ? "Extreme Intro" : "Intro Summary",
				// @ts-ignore
				() => delete V.customWA
			));
		}

		f.append(App.UI.nationalitiesDisplay());

		const tabBar = new App.UI.Tabs.TabBar("customST");
		tabBar.addTab("Adjust slave populations", "custom", customControls());
		tabBar.addTab("Presets", "presets", presetControls());
		tabBar.addTab("Import/Export", "import-export", importExport());
		f.append(tabBar.render());

		return f;
	}

	function customControls() {
		const f = new DocumentFragment();
		f.append(filters());
		f.append(adjustSelector());
		f.append(resetOptions());
		f.append(sectionBreak());
		f.append(popControls());
		return f;
	}

	/**
	 * @returns {DocumentFragment}
	 */
	function filters() {
		const frag = new DocumentFragment();

		/* Filter controls */
		const raceDiv = document.createElement("div");
		raceDiv.append("Filter by Race: ");
		const raceLinks = [];
		for (const [race, capRace] of App.Data.misc.filterRaces) {
			if (baseControlsFilter === race) {
				raceLinks.push(App.UI.DOM.disabledLink(capRace, ["Currently selected race"]));
			} else {
				raceLinks.push(App.UI.DOM.link(capRace,
					() => {
						baseControlsFilter = race;
						refresh();
					}
				));
			}
		}
		raceDiv.append(App.UI.DOM.generateLinksStrip(raceLinks));
		frag.append(raceDiv);

		const regionDiv = document.createElement("div");
		regionDiv.append("Filter by Region: ");
		const regionLinks = [];
		for (const region of App.Data.misc.filterRegions) {
			if (baseControlsFilter === uncapFirstChar(region).replace(/[ -]/g, '')) {
				regionLinks.push(App.UI.DOM.disabledLink(region, ["Currently selected region"]));
			} else {
				regionLinks.push(App.UI.DOM.link(region,
					() => {
						baseControlsFilter = uncapFirstChar(region).replace(/[ -]/g, '');
						refresh();
					}
				));
			}
		}
		regionDiv.append(App.UI.DOM.generateLinksStrip(regionLinks));
		frag.append(regionDiv);
		return frag;
	}

	/**
	 * @returns {HTMLDivElement}
	 */
	function adjustSelector() {
		const div = document.createElement("div");
		div.append("Adjustment amount: ");
		/**
		 * @type {Array<[string, adjustModeValue]>}
		 */
		const options = [["Constant Small", "c1"], ["Constant Medium", "c2"], ["Constant Large", "c3"], ["Single Percent", "percent"], ["A 10th percent", "10th percent"]];
		const links = [];
		for (const o of options) {
			if (adjustMode === o[1]) {
				links.push(App.UI.DOM.disabledLink(o[0], ["Mode selected"]));
			} else {
				links.push(App.UI.DOM.link(o[0], () => {
					adjustMode = o[1];
					refresh();
				}));
			}
		}
		div.append(App.UI.DOM.generateLinksStrip(links));
		return div;
	}

	/**
	 * @returns {HTMLDivElement}
	 */
	function resetOptions() {
		const div = document.createElement("div");
		div.append(
			App.UI.DOM.link(
				"Reset filters",
				() => {
					baseControlsFilter = "all";
					refresh();
				}
			)
		);
		div.append(" | ");
		div.append(
			App.UI.DOM.link(
				"Clear all nationalities",
				() => {
					V.nationalities = {};
					refresh();
				}
			)
		);
		return div;
	}

	/**
	 * Fine control tweaking of populations
	 * @returns {DocumentFragment}
	 */
	function popControls() {
		const frag = new DocumentFragment();
		const nationalitiesCheck = App.UI.nationalitiesCheck();

		const grid = document.createElement("p");
		grid.classList.add("customize-slave-trade-grid");

		let nationalities = App.Data.misc.baseNationalities;
		if (baseControlsFilter !== "all") {
			const controlsNationality = App.Data.misc.nationalitiesByRace[baseControlsFilter] || App.Data.misc[baseControlsFilter + 'Nationalities'];
			nationalities = Object.keys(controlsNationality);
		}
		for (const nation of nationalities) {
			const div = document.createElement("div");
			div.append(nation);

			const span = document.createElement("span");
			span.classList.add("controls-container");

			const plusButton = App.UI.DOM.appendNewElement("button", span, "+", ["plus-button"]);
			plusButton.onclick = () => {
				addNationality(nation, adjustmentStep(nation, true));
				refresh();
			};

			if (nationalitiesCheck[nation]) {
				const minusButton = App.UI.DOM.appendNewElement("button", span, "-", ["minus-button"]);
				minusButton.onclick = () => {
					addNationality(nation, adjustmentStep(nation, false));
					refresh();
				};
			}

			if (V.nationalities[nation] > 1) {
				const zeroButton = App.UI.DOM.appendNewElement("button", span, "0", ["zero-button"]);
				zeroButton.onclick = () => {
					delete V.nationalities[nation];
					refresh();
				};
			}

			div.append(span);
			grid.append(div);
		}
		frag.append(grid);

		if (baseControlsFilter === "all") {
			frag.append(ethnicityControls());
		}

		return frag;
	}

	function ethnicityControls() {
		const frag = new DocumentFragment();
		App.UI.DOM.appendNewElement("p", frag, `By dominant race/ethnicity (hover over the name to see the nationalities affected):`);
		const grid = document.createElement("p");
		grid.classList.add("customize-slave-trade-grid");
		for (const race of App.Data.misc.filterRaces.keys()) {
			const racialNationalities = App.Data.misc.baseNationalities.filter(function(n) {
				let races = App.Data.misc.raceSelector[n] || App.Data.misc.raceSelector[''];
				return races[race] * 3.5 > hashSum(races);
			});

			if (racialNationalities.length > 0) {
				const div = document.createElement("div");
				div.append(App.UI.DOM.spanWithTooltip(race, racialNationalities.length > 0 ? racialNationalities.join(", ") : "(none)"));

				const span = document.createElement("span");
				span.classList.add("controls-container");

				const plusButton = App.UI.DOM.appendNewElement("button", span, "+", ["plus-button"]);
				plusButton.onclick = () => {
					racialNationalities.forEach(nation => {
						addNationality(nation, adjustmentStep(nation, true));
					});
					refresh();
				};

				const minusButton = App.UI.DOM.appendNewElement("button", span, "0", ["zero-button"]);
				minusButton.onclick = () => {
					racialNationalities.forEach(n => delete V.nationalities[n]);
					refresh();
				};

				div.append(span);
				grid.append(div);
			}
		}
		frag.append(grid);
		return frag;
	}

	/**
	 * How much a single +/- action should affect
	 * @param {string} nation
	 * @param {boolean} up
	 * @returns {number}
	 */
	function adjustmentStep(nation, up) {
		if (adjustMode === "c1") {
			return up ? 1 : -1;
		} else if (adjustMode === "c2") {
			return up ? 100 : -100;
		} else if (adjustMode === "c3") {
			return up ? 1000 : -1000;
		}

		const total = hashSum(V.nationalities);
		if (total === 0) {
			return 1;
		}

		const nationValue = V.nationalities[nation] ? V.nationalities[nation] : 0;

		if (nationValue === 0) {
			if (adjustMode === "percent") {
				return total / 99;
			} else if (adjustMode === "10th percent") {
				return total / 999;
			}
		}

		let fractionChange = 0;
		if (adjustMode === "percent") {
			fractionChange = 0.01;
		} else if (adjustMode === "10th percent") {
			fractionChange = 0.001;
		}

		const nonNationTotal = (total - nationValue);
		const nationFraction = nationValue / total;
		const nonNationFraction = nonNationTotal / total;

		if (!up) {
			// When going down we want to change by the same ratio, but in the opposite direction
			fractionChange *= -1;
		}

		// Arrive at this function from:
		// Target ratio = Value ratio with adjusted nationValue
		// <=>
		// (nationFraction + fractionChange) / (nonNationFraction - fractionChange) = (nationValue + change) / nonNationTotal
		// // Edit both fractions, because we want a behaviour like this: 50% / 50% -> 51% / 49%
		// <=>
		// change = ... (See below)
		return nonNationTotal * ((nationFraction + fractionChange) / (nonNationFraction - fractionChange)) - nationValue;
	}


	function presetControls() {
		const f = new DocumentFragment();
		f.append(`Vanilla presets: `, generatePresetLinks(App.Data.NationalityPresets.Vanilla));
		f.append(`Mod presets: `, generatePresetLinks(App.Data.NationalityPresets.Mod));
		return f;
	}

	/**
	 * @param {Map<string, Object.<string,number>>} presets
	 * @returns {HTMLDivElement}
	 */
	function generatePresetLinks(presets) {
		const grid = document.createElement("div");
		grid.classList.add("customize-slave-trade-grid", "presets");
		for (const [name, nationalities] of presets) {
			const div = document.createElement("div");
			div.append(name);

			const span = document.createElement("span");
			span.classList.add("controls-container");

			const setButton = App.UI.DOM.appendNewElement("button", span, "Set", ["set-button"]);
			setButton.onclick = () => {
				V.nationalities = clone(nationalities);
				refresh();
			};

			const plusButton = App.UI.DOM.appendNewElement("button", span, "+", ["plus-button"]);
			plusButton.onclick = () => {
				for (const nat in nationalities) {
					addNationality(nat, nationalities[nat]);
				}
				refresh();
			};

			div.append(span);
			grid.append(div);
		}
		return grid;
	}

	/**
	 * @param {string} nation
	 * @param {number} amount
	 */
	function addNationality(nation, amount) {
		if (V.nationalities.hasOwnProperty(nation)) {
			V.nationalities[nation] += amount;
			if (V.nationalities[nation] <= 0) {
				delete V.nationalities[nation];
			}
		} else if (amount > 0) {
			V.nationalities[nation] = amount;
		}
	}

	function importExport() {
		const f = new DocumentFragment();
		const span = document.createElement("p");
		const importExportContainer = document.createElement("div");
		App.UI.DOM.appendNewElement(
			"span",
			span,
			App.UI.DOM.link(
				"Export Settings",
				() => {
					settingsExport(importExportContainer);
				}
			)
		);
		span.append(" | ");
		App.UI.DOM.appendNewElement(
			"span",
			span,
			App.UI.DOM.link(
				"Import Settings",
				() => {
					settingsImport(importExportContainer);
				}
			)
		);
		f.append(span);

		f.append(importExportContainer);
		return f;
	}

	/**
	 * @param {HTMLDivElement} container
	 */
	function settingsExport(container) {
		let textArea = document.createElement("textarea");
		textArea.value = JSON.stringify(V.nationalities);
		$(container).empty().append(textArea);
	}

	/**
	 * @param {HTMLDivElement} container
	 */
	function settingsImport(container) {
		let textArea = document.createElement("textarea");
		let button = document.createElement("button");
		button.append("Load");
		button.onclick = () => {
			try {
				V.nationalities = JSON.parse(textArea.value);
			} catch (SyntaxError) {
				Dialog.setup("Invalid Input");
				Dialog.append("The input is not a valid nationalities object.");
				Dialog.open();
				return;
			}
			refresh();
		};

		$(container).empty().append(textArea, button);
	}

	function sectionBreak() {
		const hr = document.createElement("hr");
		hr.style.margin = "0";
		return hr;
	}

	function refresh() {
		return $(dynamicDiv).empty().append(dynamicContent());
	}
};

/**
 * @returns {HTMLElement}
 */
App.UI.nationalitiesDisplay = function() {
	const p = document.createElement("p");

	/* Generates cloned array of V.nationalities, removing duplicates and then sorting */
	const nationalitiesCheck = App.UI.nationalitiesCheck();
	const nationalities = [];
	for (const nat in nationalitiesCheck) {
		nationalities.push(nat);
	}
	nationalities.sort((a, b) => nationalitiesCheck[b] - nationalitiesCheck[a]);

	/* Prints distribution of V.nationalities, using nationalitiesCheck to render array */
	let percentPerPoint = 100.0 / hashSum(V.nationalities);
	let len = Object.keys(nationalitiesCheck).length;
	let j = 0;
	for (const nation of nationalities) {
		const span = document.createElement("span");
		span.append(`${nation} `);
		let percent = (V.nationalities[nation] * percentPerPoint).toFixed(2);
		if (percent === "0.00") {
			percent = "<0.01";
		}
		App.UI.DOM.appendNewElement("span", span, percent + "%", ["orange"]);
		j++;
		if (j < len) {
			span.append(` | `);
		}
		p.append(span);
	}
	return p;
};

/**
 * @returns {object}
 */
App.UI.nationalitiesCheck = function() {
	return Object.assign(
		{
			// Player can add custom nations here.
		},
		V.nationalities);
};
