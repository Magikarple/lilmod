App.RA.summary = function() {
	const frag = new DocumentFragment();
	// App.UI.DOM.appendNewElement("h1", frag, `Rules Assistant Summary`);
	App.UI.DOM.appendNewElement("div", frag, `Here you can see an overview of all of your rules at the same time.`, "scene-intro");
	App.UI.DOM.appendNewElement("div", frag, `Rules further to the right will always take priority, but some rules may not apply to all slaves.`, "scene-intro");
	frag.append(makeTable());
	return frag;

	/**
	 * Creates a table to summarize RA
	 * @returns {HTMLTableElement}
	 */
	function makeTable() {
		const container = App.UI.DOM.makeElement("div", null, "ra-sum");
		const table = App.UI.DOM.appendNewElement("table", container, null, "");
		/** @type {FC.RA.Rule[]} */
		const rules = V.defaultRules;

		if (rules.length === 0) {
			return container;
		}

		/* start row title */
		const thead = App.UI.DOM.appendNewElement("thead", table, null, '');
		const theadTr = App.UI.DOM.appendNewElement("tr", thead, null, '');

		App.UI.DOM.appendNewElement("th", theadTr, "Rules", '');
		/* make rest of row title */
		for (const rule of rules) {
			App.UI.DOM.appendNewElement("th", theadTr, App.UI.DOM.link(
				rule.name,
				() => {
					V.currentRule = rule.ID;
				},
				[],
				"Rules Assistant"
			), "");
		}

		const tbody = App.UI.DOM.appendNewElement("tbody", table, null, '');

		const setters = rules.map(r => r.set);
		/* A row for every condition the RA can set. */
		/* start loop for row*/

		walkObject(emptyDefaultRule().set, (obj, path) => {
			addRow(path, collectMemberFromObjects(setters, path));
		}, []);

		return container;

		/**
		 * @param {object[]} objects
		 * @param {string[]} member
		 */
		function collectMemberFromObjects(objects, member) {
			let r = [];
			for (const o of objects) {
				let to = o;
				for (const m of member) {
					to = to[m];
				}
				r.push(to);
			}
			return r;
		}

		/**
		 * @callback objectWalker
		 * @param {object} obj
		 * @param {string[]} memberPath
		 */
		/**
		 * @param {object} obj
		 * @param {objectWalker} walker
		 * @param {string[]} path
		 */
		function walkObject(obj, walker, path) {
			for (const prop in obj) {
				const v = obj[prop];
				const vp = path.concat([prop]);
				if (v !== null && typeof v === 'object') {
					walkObject(v, walker, vp);
				} else {
					walker(obj, vp);
				}
			}
		}

		/**
		 * @param {string[]} path
		 * @param {Array} cells
		 */
		function addRow(path, cells) {
			if (!cells.some(v => v !== null)) { // skip empty rows
				return;
			}
			const row = App.UI.DOM.makeElement("tr", null, "");

			function ruleSetValueToString(v) {
				if (typeof v === 'object') {
					if (v.hasOwnProperty('cond') && v.hasOwnProperty('val')) {
						return `${v.cond} ${v.val}`;
					} else if (v.hasOwnProperty('min') && v.hasOwnProperty('max')) {
						return `${v.min} to ${v.max}`;
					} else {
						return JSON.stringify(v);
					}
				}
				return `${v}`;
			}

			App.UI.DOM.appendNewElement("th", row, path.join('.'), '');
			for (const cell of cells) {
				const content = cell !== null ? ruleSetValueToString(cell) : null;
				App.UI.DOM.appendNewElement("td", row, content, "");
			}
			tbody.append(row);
		}
	}
};
