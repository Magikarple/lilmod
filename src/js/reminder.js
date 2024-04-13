App.Reminders = (function() {
	/**
	 *  @type {Array<function():void>}
	 */
	let activeViewRefreshers = [];

	return {
		add: add,
		list: list,
		fullDisplay: fullDisplay,
		slaveDisplay: slaveDisplay,
		slaveLink: slaveLink,
		dialog: dialog,
		clear: clearActive,
	};

	/**
	 * @param {string|Node} message
	 * @param {number} week
	 * @param {string} [category]
	 * @param {number} [slaveID]
	 * @returns {boolean} Whether a reminder was actually added or we aborted.
	 */
	function add(message, week, category = "manual", slaveID = 0) {
		if (message === "" || message === null) {
			return false;
		}
		const entry = {message: message, week: week, category: category};
		if (slaveID) {
			entry.slaveID = slaveID;
		}

		// V.reminders is sorted by week from low to high, we insert at the correct place so it remains sorted.
		const index = V.reminders.findIndex(e => e.week >= week);
		if (index === -1) {
			V.reminders.push(entry);
		} else {
			V.reminders.splice(index, 0, entry);
		}
		return true;
	}

	/**
	 * @param {object} [obj]
	 * @param {number} [obj.maxFuture] how far into the future should reminders be displayed.
	 * @param {function(FC.ReminderEntry):boolean} [obj.filter]
	 * @param {boolean} [obj.link] permit passage links
	 * @returns {HTMLSpanElement|DocumentFragment}
	 */
	function list({maxFuture = Number.POSITIVE_INFINITY, filter = null, link = false} = {}) {
		if (V.reminders.length === 0) {
			return document.createDocumentFragment();
		}

		if (!filter) {
			filter = () => true;
		}

		const outerSpan = document.createElement("span");

		/**
		 * @param {FC.ReminderEntry} entry
		 */
		function clearEntry(entry) {
			V.reminders.splice(V.reminders.indexOf(entry), 1);
			refreshActive();
		}

		// We only want to remove visible entries
		function clearOverdue() {
			V.reminders = V.reminders.filter(e => e.week >= V.week || e.week > V.week + maxFuture || !filter(e));
			refreshActive();
		}

		function clearAll() {
			V.reminders = V.reminders.filter(e => e.week > V.week + maxFuture || !filter(e));
			refreshActive();
		}

		let overdue = 0;
		let any = false;

		V.reminders.filter(e => e.week <= V.week + maxFuture && filter(e))
			.forEach(entry => {
				any = true;
				let week;
				let classes = []; // has to be an array, because makeElement takes no empty strings, but empty arrays.
				if (entry.week < V.week) {
					classes = ["red"];
					week = `${numberWithPluralOne(-(entry.week - V.week), 'week')} ago`;
					overdue++;
				} else if (entry.week === V.week) {
					classes = ["orange"];
					week = "today";
				} else {
					if (entry.week <= V.week + 5) {
						classes = ["green"];
					}
					week = `in ${numberWithPluralOne(entry.week - V.week, 'week')}`;
				}
				const div = document.createElement("div");
				div.append(entry.message, " ", App.UI.DOM.makeElement("span", week.toString(), classes));
				const slave = getSlave(entry.slaveID);
				if (slave) {
					const slaveName = link
						? App.UI.DOM.passageLink(SlaveFullName(slave), "Slave Interact", () => {
							V.AS = slave.ID;
							if (Dialog.isOpen()) {
								Dialog.close();
							}
						})
						: SlaveFullName(slave);
					div.append(" (for ", slaveName, ")");
				}
				div.append(" ", App.UI.DOM.link("Clear", clearEntry, [entry]));
				outerSpan.append(div);
			});

		if (overdue > 0) {
			outerSpan.append(App.UI.DOM.makeElement("div", App.UI.DOM.link("Clear overdue", clearOverdue)));
		}
		if (any) {
			outerSpan.append(App.UI.DOM.makeElement("div", App.UI.DOM.link("Clear all", clearAll)));
		}

		return outerSpan;
	}

	/**
	 * @param {string} [category]
	 * @param {number} [slaveID]
	 * @returns {HTMLDivElement}
	 */
	function addField(category, slaveID) {
		const addDiv = document.createElement("div");

		let entry = "";
		let week = 0;

		addDiv.append(
			App.UI.DOM.makeTextBox("", v => {
				entry = v;
			}),
			" in ", App.UI.DOM.makeTextBox(0, v => {
				week = v;
			}, true), " weeks.",
			" ", App.UI.DOM.link("Add", () => {
				if (add(entry, V.week + week, category, slaveID)) {
					refreshActive();
				}
			})
		);

		return addDiv;
	}

	/**
	 * @param {boolean} [link=false] show passage links
	 * @param {HTMLElement} [displayDiv] Only to be used by the refresh functionality
	 * @returns {HTMLElement}
	 */
	function fullDisplay(link, displayDiv) {
		if (displayDiv) {
			// If displayDiv is given, it either is currently being shown or the tree it belonged to was removed from
			// the page. In that case we don't need to refresh it ever again.
			if (!displayDiv.isConnected) {
				return null;
			}
			jQuery(displayDiv).empty();
		} else {
			displayDiv = document.createElement("div");
		}
		activeViewRefreshers.push(() => fullDisplay(link, displayDiv));

		displayDiv.append(App.UI.DOM.makeElement("h2", "Reminders"));

		const listEl = list({link});
		if (listEl !== null) {
			displayDiv.append(App.UI.DOM.makeElement("p", listEl, "indent"));
		}

		displayDiv.append(App.UI.DOM.makeElement("h3", "Add new"));
		displayDiv.append(App.UI.DOM.makeElement("p", addField()));

		return displayDiv;
	}

	/**
	 * @param {number} slaveID
	 * @param {HTMLElement} [displayDiv] Only to be used by the refresh functionality
	 * @returns {HTMLElement}
	 */
	function slaveDisplay(slaveID, displayDiv) {
		if (displayDiv) {
			if (!displayDiv.isConnected) {
				return null;
			}
			jQuery(displayDiv).empty();
		} else {
			displayDiv = document.createElement("div");
		}
		activeViewRefreshers.push(() => slaveDisplay(slaveID, displayDiv));

		displayDiv.append(App.UI.DOM.makeElement("h2", `Reminders for ${SlaveFullName(getSlave(slaveID))}`));

		const listEl = list({filter: e => e.slaveID === slaveID});
		if (listEl !== null) {
			displayDiv.append(App.UI.DOM.makeElement("p", listEl, "indent"));
		}

		displayDiv.append(App.UI.DOM.makeElement("h3", "Add new"));
		displayDiv.append(App.UI.DOM.makeElement("p", addField("slave", slaveID)));

		return displayDiv;
	}

	/**
	 * @param {number} slaveID
	 * @returns {HTMLElement}
	 */
	function slaveLink(slaveID) {
		const link = App.UI.DOM.link(String.fromCharCode(0x23f0), () => {
			dialog(slaveID);
		});
		link.style.textDecoration = "none";
		return link;
	}

	/**
	 * @param {number} [slaveID]
	 */
	function dialog(slaveID) {
		if (Dialog.isOpen()) {
			Dialog.close();
		}
		Dialog.setup("Reminders", "reminders");
		const showLinks = Story.lookup("tags", "jump-from-safe").some(x => x.title === passage());
		$(Dialog.body()).empty().append(slaveID ? slaveDisplay(slaveID) : fullDisplay(showLinks));
		Dialog.open();
	}

	function refreshActive() {
		console.log(activeViewRefreshers.length);
		const ars = activeViewRefreshers;
		activeViewRefreshers = [];
		for (const refresher of ars) {
			refresher();
		}
		App.Utils.scheduleSidebarRefresh();
	}

	function clearActive() {
		activeViewRefreshers = [];
	}
})();
