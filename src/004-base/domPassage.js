/**
 * A pure DOM Passage, the SugarCube Wikifier never gets invoked.
 */
// @ts-ignore
App.DomPassage = class extends Passage {
	/**
	 * @param {string} title
	 * @param {function():Node} callback
	 * @param {string[]} tags
	 */
	constructor(title, callback, tags = []) {
		super(title, {
			hasAttribute: a => a === "tags",
			getAttribute: () => tags.join(" ")
		});
		this.callback = callback;

		// @ts-ignore
		Story.add(this);
	}

	/**
	 * @returns {Node}
	 */
	render() {
		// In case the callback fails give out a nice error message instead of breaking completely.
		try {
			return this.callback();
		} catch (ex) {
			return App.UI.DOM.formatException(ex);
		}
	}
};
