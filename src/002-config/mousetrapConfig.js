/**
 * Expand mousetrap with multiple binds per key, passage dependent bindings and a menu for custom rebinding.
 */
App.UI.Hotkeys = (function() {
	/**
	 * @typedef action
	 * @property {Function} callback
	 * @property {Array<string>} combinations 0 <= length <= 2
	 * @property {Array<string>} [passages] not existing means everywhere
	 * @property {string|function(): string} [uiName] allow different name in hotkey settings
	 */

	/**
	 * The key is used in the hotkey settings to describe the action
	 * @type {{[key: string]: action}}
	 */
	const actions = {};

	/**
	 * Contains the default combinations for every action
	 * @type {{[key: string]: Array<string>}}
	 */
	const defaultCombinations = {};

	/**
	 * References a key combination to a set of actions
	 * @type {{[key: string]: Array<string>}}
	 */
	const bindings = {};

	/**
	 * To ensure we only record one at a time
	 * @type {boolean}
	 */
	let recording = false;

	/**
	 * @param {string} name used as key
	 * @param {action} action
	 */
	function addDefault(name, action) {
		actions[name] = action;
		for (const binding of action.combinations) {
			addBinding(name, binding);
		}
		defaultCombinations[name] = [...action.combinations];
	}

	/**
	 * @param {string} actionKey
	 * @param {string} combination
	 */
	function addBinding(actionKey, combination) {
		if (bindings[combination]) {
			bindings[combination].push(actionKey);
		} else {
			bindings[combination] = [actionKey];
			Mousetrap.bind(combination, e => {
				e.preventDefault();
				for (const binding of bindings[combination]) {
					const action = actions[binding];
					// only activate callback if we are on the right passage
					if (!action.passages || action.passages.includes(State.passage)) {
						action.callback();
					}
				}
			});
		}
	}

	/**
	 * @param {string} actionKey
	 * @param {string} combination
	 */
	function removeBinding(actionKey, combination) {
		if (bindings[combination]) {
			const index = bindings[combination].indexOf(actionKey);
			if (index > -1) {
				bindings[combination].splice(index, 1);
				if (bindings[combination].length === 0) {
					delete bindings[combination];
					Mousetrap.unbind(combination);
				}
			}
		}
	}

	/**
	 * @param {string} name
	 * @returns {string}
	 */
	function hotkeysForAction(name) {
		if (!actions[name]) {
			return "";
		}
		const c = actions[name].combinations;
		if (c.length === 0) {
			return "";
		}
		if (c.length === 1) {
			return `[${formatHotkey(c[0])}]`;
		}
		return `[${formatHotkey(c[0])},${formatHotkey(c[1])}]`;
	}

	/**
	 * @param {string} combination
	 * @returns {string}
	 */
	function formatHotkey(combination) {
		const parts = combination.split("+");

		for (let i = 0; i < parts.length; i++) {
			parts[i] = capFirstChar(parts[i]);
		}

		return parts.join("+");
	}

	/**
	 * @returns {HTMLDivElement}
	 */
	function settingsMenu() {
		const div = document.createElement("div");
		div.className = "hotkey-settings";

		for (const actionsKey in actions) {
			settingsRow(div, actionsKey);
		}

		return div;
	}

	/**
	 * @param {HTMLDivElement} container
	 * @param {string} actionKey
	 */
	function settingsRow(container, actionKey) {
		const action = actions[actionKey];
		// get correct name
		let name = actionKey;
		if (action.uiName) {
			if (typeof action.uiName === "string") {
				name = action.uiName;
			} else {
				name = action.uiName();
			}
		}
		App.UI.DOM.appendNewElement("div", container, name, "description");

		settingsCell(container, actionKey, 0);
		settingsCell(container, actionKey, 1);

		const button = App.UI.DOM.appendNewElement("button", container, "Reset");
		if (isDefault(actionKey)) {
			button.className = "inactive";
		} else {
			button.onclick = () => {
				action.combinations = [...defaultCombinations[actionKey]];
				saveToStorage();
				App.UI.reload();
			};
		}
	}

	/**
	 * Checks if the combinations assigned to an action are the default ones.
	 * @param {string} actionKey
	 * @returns {boolean}
	 */
	function isDefault(actionKey) {
		if (defaultCombinations[actionKey].length !== actions[actionKey].combinations.length) {
			return false;
		}
		if (defaultCombinations[actionKey].length === 0) {
			return true;
		}
		if (defaultCombinations[actionKey][0] !== actions[actionKey].combinations[0]) {
			return false;
		}
		if (defaultCombinations[actionKey].length === 1) {
			return true;
		}
		return defaultCombinations[actionKey][1] === actions[actionKey].combinations[1];
	}

	/**
	 * @param {HTMLDivElement} container
	 * @param {string} actionKey
	 * @param {number} index
	 */
	function settingsCell(container, actionKey, index) {
		const action = actions[actionKey];
		const button = App.UI.DOM.appendNewElement("button", container,
			action.combinations[index] ? formatHotkey(action.combinations[index]) : "", "combination");
		button.onclick = () => {
			if (recording) { return; }
			recording = true;

			$(button).empty();
			Mousetrap.record(function(sequence) {
				// sequence is an array like ['ctrl+k', 'c']
				const combination = sequence.join(" ");
				if (action.combinations[index]) {
					removeBinding(actionKey, action.combinations[index]);
				}
				action.combinations[index] = combination;
				addBinding(actionKey, combination);
				saveToStorage();
				App.UI.reload();
				recording = false;
			});
		};
	}

	/**
	 * Saves custom hotkeys to browser storage
	 */
	function saveToStorage() {
		const save = {};

		for (const actionsKey in actions) {
			if (!isDefault(actionsKey)) {
				save[actionsKey] = actions[actionsKey].combinations;
			}
		}

		SugarCube.storage.set("hotkeys", save);
	}

	/**
	 * Loads custom hotkeys from browser storage
	 */
	function loadFromStorage() {
		const save = SugarCube.storage.get("hotkeys");

		for (const saveKey in save) {
			// discard obsolete hotkeys
			if (actions[saveKey]) {
				actions[saveKey].combinations = save[saveKey];
				addBinding(saveKey, save[saveKey]);
			}
		}
	}

	/**
	 * Initialize custom hotkeys
	 */
	function init() {
		loadFromStorage();
		// :storyready is to late to influence the page, but it's the earliest where SugarCube.storage is available so
		// we refresh the passage if we happen to be on the settings passage.
		if (State.passage === "Hotkey Settings") {
			App.UI.reload();
		}
	}

	function settingsPage() {
		const f = document.createDocumentFragment();

		App.UI.DOM.appendNewElement("h1", f, "Hotkey Settings");

		const p = document.createElement("p");
		const ul = document.createElement("ul");

		let li = document.createElement("li");
		li.append("On keyboard layouts other than the ");
		const a = document.createElement("a");
		a.href = "https://en.wikipedia.org/wiki/File:KB_United_States.svg";
		a.target = "_blank";
		a.append("US-QWERTY layout");
		li.append(a,
			" there may be keys or combinations of keys where the recorded key is different from the key used to listen to key events. You will have to find these keys yourself through trial and error.");
		ul.append(li);

		App.UI.DOM.appendNewElement("li", ul, "Custom hotkeys are browser specific and are not part of your save.");

		li = document.createElement("li");
		li.append("While we try not to overwrite browser or OS level key combinations it is possible to do so with custom hotkeys. This also means that during recording of custom hotkeys no browser or OS level key combinations are available. There are however keys that cannot be overwritten, such as the ",
			App.UI.DOM.makeElement("code", "Win key"), " on Windows.");
		ul.append(li);

		p.append(ul);
		f.append(p);

		f.append(settingsMenu());
		return f;
	}

	return {
		add: addDefault,
		hotkeys: hotkeysForAction,
		init: init,
		settings: settingsPage,
	};
})();

// add hotkeys
App.UI.Hotkeys.add("endWeek", {
	callback: function() {
		$("#story-caption #endWeekButton").trigger("click");
	}, combinations: ["enter"], uiName: "Next Week"
});
App.UI.Hotkeys.add("nextLink", {
	callback: function() {
		$("#story-caption #nextButton").trigger("click");
	}, combinations: ["space"], uiName: "Continue/Back"
});
App.UI.Hotkeys.add("prev-slave", {
	callback: function() {
		$("#prev-slave a").trigger("click");
	}, combinations: ["left", "q"], uiName: "Previous Slave"
});
App.UI.Hotkeys.add("next-slave", {
	callback: function() {
		$("#next-slave a").trigger("click");
	}, combinations: ["right", "e"], uiName: "Next Slave"
});
App.UI.Hotkeys.add("prev-child", {
	callback: function() {
		$("#prev-child a.macro-link").trigger("click");
	}, combinations: ["left", "q"], uiName: "Previous Child"
});
App.UI.Hotkeys.add("next-child", {
	callback: function() {
		$("#next-child a.macro-link").trigger("click");
	}, combinations: ["right", "e"], uiName: "Next Child"
});
App.UI.Hotkeys.add("Previous Tab", {
	callback: function() {
		App.UI.Tabs.left();
	}, combinations: []
});
App.UI.Hotkeys.add("Next Tab", {
	callback: function() {
		App.UI.Tabs.right();
	}, combinations: []
});
App.UI.Hotkeys.add("Close Dialog", {
	callback: function() {
		Dialog.close();
	}, combinations: ["esc"]
});
App.UI.Hotkeys.add("walkpast", {
	callback: function() {
		$("#walkpast a").trigger("click");
	}, combinations: [], uiName: "Walkpast"
});
App.UI.Hotkeys.add("Head Girl Select", {
	callback: function() {
		$("#manageHG a").trigger("click");
	}, combinations: ["h"]
});
App.UI.Hotkeys.add("Previous AI Image", {
	callback: function() {
		$(".lrgRender .ai-art-container .leftArrow").trigger("click");
	}, combinations: ["ctrl+left"]
});
App.UI.Hotkeys.add("Next AI Image", {
	callback: function() {
		$(".lrgRender .ai-art-container .rightArrow").trigger("click");
	}, combinations: ["ctrl+right"]
});
