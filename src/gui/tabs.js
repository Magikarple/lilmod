App.UI.Tabs = (function() {
	/**
	 * @type {Array<HTMLButtonElement|HTMLAnchorElement>}
	 */
	let active = null;

	/**
	 * TabBar class responsible for collecting the tabs and rendering to one DOM Node.
	 *
	 * Multiple TabBars on one page will work, but hotkeys may behave unexpectedly. (It's also considered bad ui design)
	 */
	class TabBar {
		/**
		 * @typedef tab
		 * @property {string} name
		 * @property {string} id
		 * @property {Node} content
		 * @property {string} [buttonClass]
		 * @property {string} [contentClass]
		 */

		/**
		 * @param {string} id Saved, should stay the same across versions. No spaces allowed
		 */
		constructor(id) {
			/**
			 * @type {string}
			 * @private
			 */
			this._id = id;
			/**
			 * @type {Array<tab>}
			 * @private
			 */
			this._tabs = [];
			/**
			 * @type {Node}
			 * @private
			 */
			this._customNode = null;
		}

		/**
		 * @param {string} name Display name
		 * @param {string} id Saved, should stay the same across versions
		 * @param {Node} content
		 * @param {string} [buttonClass] CSS class applied to the button
		 * @param {string} [contentClass] CSS class applied to the content holder
		 */
		addTab(name, id, content, buttonClass, contentClass) {
			this._tabs.push({
				name: name,
				id: id,
				content: content,
				buttonClass: buttonClass,
				contentClass: contentClass,
			});
		}

		/**
		 * Add a DOM element between the button row and the content. Mostly intended for art.
		 *
		 * @param {Node} node
		 */
		set customNode(node) {
			this._customNode = node;
		}

		/**
		 * @param {boolean} plainLinks
		 * @returns {DocumentFragment}
		 */
		render(plainLinks = false) {
			const f = new DocumentFragment();
			const tabBar = document.createElement("div");
			tabBar.classList.add("tab-bar");
			f.append(tabBar);

			if (this._customNode) {
				f.append(this._customNode);
			}

			/**
			 * @type {Array<HTMLButtonElement|HTMLAnchorElement>}
			 */
			const buttonList = [];
			/**
			 * @type {Array<HTMLDivElement>}
			 */
			const contentList = [];

			let any = false;
			for (const tab of this._tabs) {
				// check if selected.
				const selected = V.tabChoice.hasOwnProperty(this._id) && V.tabChoice[this._id] === tab.id;

				/** @type {HTMLButtonElement|HTMLAnchorElement} */
				let button;
				if (!plainLinks) {
					button = App.UI.DOM.appendNewElement("button", tabBar, tab.name, tab.buttonClass);
				} else {
					button = App.UI.DOM.makeElement("a", tab.name, tab.buttonClass);
				}
				buttonList.push(button);

				const contentHolder = App.UI.DOM.appendNewElement("div", f, tab.content, "tab-content");
				if (tab.contentClass) {
					contentHolder.classList.add(tab.contentClass);
				}
				contentList.push(contentHolder);

				button.onclick = () => {
					buttonList.forEach(c => { c.classList.remove("active"); });
					contentList.forEach(c => { c.classList.remove("active"); });
					button.classList.add("active");
					contentHolder.classList.add("active");
					V.tabChoice[this._id] = tab.id;
				};

				if (selected) {
					contentHolder.classList.add("active");
					button.classList.add("active");
					any = true;
				}
			}

			if (plainLinks) {
				tabBar.append(App.UI.DOM.generateLinksStrip(buttonList));
			}

			// if no tabs are open, open the first one.
			if (!any && buttonList.length > 0) {
				buttonList[0].click();
			}

			active = buttonList;

			return f;
		}
	}

	/**
	 * Call on passageinit to clear the button cache.
	 * Shouldn't matter, but we don't need to have huge DOM trees floating around.
	 */
	function clear() {
		active = null;
	}

	/**
	 * Open the tab to the left of the currently open tab. If there is none, don't do anything.
	 */
	function openLeft() {
		if (active) {
			const index = currentIndex();
			if (index - 1 >= 0) {
				active[index - 1].click();
			}
		}
	}

	/**
	 * Open the tab to the right of the currently open tab. If there is none, don't do anything.
	 */
	function openRight() {
		if (active) {
			const index = currentIndex();
			if (index > -1 && index + 1 < active.length) {
				active[index + 1].click();
			}
		}
	}

	/**
	 * @returns {number} Index of the currently open tab
	 */
	function currentIndex() {
		for (let i = 0; i < active.length; i++) {
			if (active[i].classList.contains("active")) {
				return i;
			}
		}
		return -1;
	}

	return {
		TabBar: TabBar,
		clear: clear,
		left: openLeft,
		right: openRight
	};
})();

