App.Neighbor.Display = class {
	/** Create a neighbor display controller
	 * @param {function(number):void} onSelection function to be called when selection changes
	 */
	constructor(onSelection) {
		this.containerID = "neighbor-display";
		this._onSelection = onSelection;
	}

	/** Render the neighbor display to DOM
	 * @returns {Element}
	 */
	render() {
		const container = App.UI.DOM.makeElement("div", null, ["margin-top"]);
		container.id = this.containerID;

		function makeSortLink(/** @type {string} */ title, /** @type {string} */ mode) {
			if (V.neighborDisplay === mode) {
				return document.createTextNode(title);
			} else {
				return App.UI.DOM.link(title, () => { V.neighborDisplay = mode; this.rerender(); } );
			}
		}

		container.append("Neighbor display mode: ");
		container.appendChild(App.UI.DOM.generateLinksStrip([
			makeSortLink.call(this, "List by ID", "list"),
			makeSortLink.call(this, "List by Name", "list-name"),
			makeSortLink.call(this, "City Grid", "grid")
		]));

		// pick a mode
		if (V.neighborDisplay === "grid") {
			container.appendChild(this._renderGrid());
		} else if (V.neighborDisplay === "list-name") {
			container.appendChild(this._renderListName());
		} else { // default if V.neighborDisplay is unset for some reason; canonically "list"
			container.appendChild(this._renderListID());
		}
		return container;
	}

	/** Refresh an existing neighbor display list */
	rerender() {
		$(`#${this.containerID}`).replaceWith(this.render());
		this.select(V.activeArcologyIdx);
	}

	/** Render the display as a list, sorted by ID
	 * @returns {Element}
	 */
	_renderListID() {
		const container = App.UI.DOM.makeElement("div", null, ["neighbor-container", "neighbor-container-list"]);

		for (let i = 0; i < V.arcologies.length; ++i) {
			this._renderCell(container, i);
		}

		return container;
	}

	/** Render the display as a list, sorted by name
	 * @returns {Element}
	 */
	_renderListName() {
		const container = App.UI.DOM.makeElement("div", null, ["neighbor-container", "neighbor-container-list"]);

		const arcologyNames = V.arcologies.map((a) => a.name).sort((a, b) => a.localeCompare(b));
		for (const name of arcologyNames) {
			this._renderCell(container, V.arcologies.findIndex((a) => a.name === name));
		}

		return container;
	}

	/** Render the display as a grid
	 * @returns {Element}
	 */
	_renderGrid() {
		const container = App.UI.DOM.makeElement("div", null, ["neighbor-container", "neighbor-container-grid"]);

		const directionToIndex = (dir) => V.arcologies.findIndex((a) => a.direction === dir);
		for (const dir of [ "northwest", "north", "northeast", "west", 0, "east", "southwest", "south", "southeast" ]) {
			this._renderCell(container, directionToIndex(dir));
		}

		return container;
	}

	/** Render a single cell to the display
	 * @param {Element} container
	 * @param {number} arcID
	 */
	_renderCell(container, arcID) {
		const arcology = V.arcologies[arcID];

		/** render styled text with a tooltip
		 * @param {string} text
		 * @param {string} tooltipText
		 * @param {string} className
		 * @returns {HTMLSpanElement}
		 */
		function withTooltip(text, tooltipText, className) {
			let res = App.UI.DOM.makeElement("span", text, ["has-tooltip", className]);
			tippy(res, {content: tooltipText});
			return res;
		}

		/** @param {function(): void} selectLambda */
		function nameFrag(selectLambda) {
			return App.UI.DOM.makeElement("div", App.UI.DOM.link(arcology.name, selectLambda), "name");
		}

		function govGSPFrag() {
			let frag = document.createDocumentFragment();
			let gov;
			if (arcID === 0) {
				gov = App.UI.DOM.appendNewElement("div", frag, "Your arcology; ");
			} else {
				gov = App.UI.DOM.appendNewElement("div", frag, capFirstChar(arcology.government) + '; ');
			}
			const estimatedGSP = Math.trunc(0.1 * arcology.prosperity * App.Utils.economicUncertainty(arcID));
			App.UI.DOM.appendNewElement("span", gov, cashFormat(estimatedGSP) + "m GSP", "cash");
			return frag;
		}

		function fsFrag() {
			let frag = document.createDocumentFragment();
			frag.appendChild(document.createTextNode("FS: "));
			const FSes = FutureSocieties.activeFSes(arcology);
			if (arcID === 0) {
				for (const fs of FSes) {
					frag.appendChild(withTooltip("⯁", FutureSocieties.displayName(fs), "steelblue"));
				}
			} else {
				const diplomatic = FutureSocieties.diplomaticFSes(arcology, V.arcologies[0]);
				for (const fs of FSes) {
					let style = "white";
					if (diplomatic.shared.includes(fs)) {
						style = "steelblue";
					} else {
						const conflict = diplomatic.conflicting.find((f) => f[0] === fs);
						if (conflict) {
							style = "red";
						}
					}
					frag.appendChild(withTooltip("⯁", FutureSocieties.displayName(fs), style));
				}
			}
			return App.UI.DOM.makeElement("div", frag);
		}

		function ownershipFrag() {
			let frag = document.createDocumentFragment();
			const owned = arcID === 0 || arcology.government === "your trustees" || arcology.government === "your agent";
			const yourPercent = arcID === 0 ? `${arcology.ownership}%` : `${arcology.PCminority}%`;
			const hostilePercent = owned ? `${arcology.minority}%` : `${arcology.ownership}%`;
			const challengerPercent = owned ? null : `${arcology.minority}%`;
			const publicPercent = `${100 - (arcology.ownership + arcology.minority + arcology.PCminority)}%`;
			App.UI.DOM.appendNewElement("li", frag, withTooltip(yourPercent, "Your ownership", "steelblue"));
			if (arcID !== 0) {
				App.UI.DOM.appendNewElement("li", frag, withTooltip(publicPercent, "Public ownership", "yellow"));
			}
			if (challengerPercent) {
				App.UI.DOM.appendNewElement("li", frag, withTooltip(challengerPercent, "Minority challenger ownership", "orange"));
			}
			App.UI.DOM.appendNewElement("li", frag, withTooltip(hostilePercent, "Hostile ownership", "red"));
			return App.UI.DOM.makeElement("ul", frag, "choices-strip");
		}

		let frag = document.createDocumentFragment();
		let classNames = ["neighbor-item"];
		if (!arcology) {
			// empty block
			classNames.push("neighbor-item-empty");
		} else {
			frag.appendChild(nameFrag(() => this.select(arcID)));
			frag.appendChild(govGSPFrag());
			frag.appendChild(fsFrag());
			frag.appendChild(ownershipFrag());
			if (arcID === 0) {
				classNames.push("neighbor-item-self");
			} else if (arcology.government === "your trustees" || arcology.government === "your agent") {
				classNames.push("neighbor-item-owned");
			} else if (arcology.rival) {
				classNames.push("neighbor-item-rival");
			} else {
				classNames.push("neighbor-item-unowned");
			}
		}

		const element = App.UI.DOM.appendNewElement("div", container, frag, classNames);
		element.id = `neighbor-cell-${arcID}`;
	}

	/** Set the selection to a particular arcology
	 * @param {number} arcID
	 */
	select(arcID) {
		const elementID = `#neighbor-cell-${arcID}`;

		$("div[id^='neighbor-cell']").each((i, e) => { $(e).removeClass("neighbor-item-selected"); });
		$(elementID).addClass("neighbor-item-selected");

		this._onSelection(arcID);
	}
};
