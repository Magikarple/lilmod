App.Arcology.Cell.Penthouse = class extends App.Arcology.Cell.BaseCell {
	constructor() {
		super(1);
	}

	/**
	 * @returns {string}
	 */
	get colorClass() {
		return "penthouse";
	}

	/**
	 * @returns {number}
	 */
	get width() {
		return 2;
	}

	/**
	 * @param {Array<number>} path
	 * @returns {Node}
	 */
	cellContent(path) {
		const fragment = document.createDocumentFragment();

		const link = App.UI.DOM.passageLink("Penthouse", "Manage Penthouse");
		const hotkey = App.UI.DOM.makeElement("span", App.UI.Hotkeys.hotkeys("Manage Penthouse"), ["hotkey"]);
		if (V.verticalizeArcologyLinks === 0) {
			const div = document.createElement("div");
			div.append(link, " ", hotkey);
			fragment.append(div);
		} else {
			fragment.append(link, " ", hotkey);
		}

		const wrapper = getWrapper(fragment);
		const fcs = App.Entity.facilities;

		/**
		 * @param {App.Entity.Facilities.Facility} facility
		 * @param {string} [passageName]
		 */
		function addFacility(facility, passageName) {
			if (facility.established) {
				const report = facility.occupancyReport(false);
				wrapper.append(createFacilityDiv(
					App.UI.DOM.passageLink(facility.UIName, passageName || facility.genericName),
					report ? `(${report})` : null
				));
			}
		}

		if (V.verticalizeArcologyLinks !== -1){
			addFacility(fcs.masterSuite);
			addFacility(fcs.headGirlSuite, "Head Girl Suite");
			addFacility(fcs.armory, "BG Select");
			addFacility(fcs.servantsQuarters);
			addFacility(fcs.spa);
			addFacility(fcs.nursery);
			addFacility(fcs.clinic);
			addFacility(fcs.schoolroom);
			addFacility(fcs.cellblock);

			if (V.incubator.capacity > 0) {
				const inc = App.Entity.facilities.incubator;
				const link = App.UI.DOM.passageLink(inc.UIName, "Incubator");
				const desc = `(${numberWithPluralOne(inc.capacity -
					(V.incubator.tanks.length + FetusGlobalReserveCount("incubator")), "empty tank")})`;

				if (V.incubator.readySlaves > 0) {
					wrapper.append(createFacilityDiv(link, App.UI.DOM.combineNodes(desc, App.UI.DOM.makeElement("span", "[!]", ["noteworthy"]))));
				} else {
					wrapper.append(createFacilityDiv(link, desc));
				}
			}
			if (V.researchLab.level > 0) {
				wrapper.append(createFacilityDiv(App.UI.DOM.passageLink("Prosthetic Lab", "Prosthetic Lab")));
			}
		} else {
			addFacility(fcs.headGirlSuite, "Head Girl Suite");
			addFacility(fcs.armory, "BG Select");
		}

		return fragment;

		/**
		 * @param {ParentNode} outer
		 * @returns {HTMLDivElement}
		 */
		function getWrapper(outer) {
			const wrapper = document.createElement("div");
			if (V.verticalizeArcologyLinks !== 0) {
				if (V.verticalizeArcologyLinks === -1) {
					// use double column for HG suite and Armory.
					let gridClass = `grid${2}`;
					wrapper.classList.add("gridWrapper", gridClass);
				} else {
					let gridClass = `grid${V.verticalizeArcologyLinks}`;
					wrapper.classList.add("gridWrapper", gridClass);
				}
			}
			outer.append(wrapper);
			return wrapper;
		}

		/**
		 *
		 * @param {HTMLElement} link
		 * @param {(Node|string)} [content]
		 * @returns {HTMLDivElement}
		 */
		function createFacilityDiv(link, content) {
			const div = document.createElement("div");
			div.append(link);
			// in collapsed mode additional information needs to be in its own div to stop linebreaks at weird places
			if (V.verticalizeArcologyLinks === 0) {
				div.classList.add("collapsed");
				if (content) {
					div.append(" ", content);
				}
			} else if (content) {
				const innerDiv = document.createElement("div");
				innerDiv.append(content);
				div.append(" ", innerDiv);
			}
			return div;
		}
	}

	static _cleanupConfigScheme(config) {
		super._cleanupConfigScheme(config);
		// BC code
	}

	/** @returns {App.Arcology.Cell.Penthouse} */
	clone() {
		return new App.Arcology.Cell.Penthouse()._init(this);
	}

	get className() { return "App.Arcology.Cell.Penthouse"; }
};
