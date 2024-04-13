/**
 * @typedef {object} selectOption
 * @property {string} key
 * @property {string} name
 * @property {boolean} [enabled]
 */

/**
 * Creates a new dropdown with available and unavailable options.
 * @param {Array<selectOption>} options A list of options to display
 * @param {string} selected
 * @param {function(string):void} onchange
 *
 * @returns {HTMLSelectElement}
 */
App.UI.DOM.makeSelect = function(options, selected, onchange) {
	const select = document.createElement("select");
	let matchFound = false;

	for (const choice of options) {
		const option = document.createElement("option");

		option.text = choice.name;
		option.value = choice.key;

		if (selected === choice.key) {
			option.selected = true;
			matchFound = true;
		}

		if ("enabled" in choice && !choice.enabled) {
			option.disabled = true;
		}

		select.append(option);
	}

	if (!matchFound) {
		select.selectedIndex = -1;
	}

	select.onchange = () => onchange(select.value);

	return select;
};
