/**
 * @param {string} article
 * @returns {HTMLDivElement}
 */
App.Encyclopedia.ui = function(article) {
	const f = document.createElement("div");
	if (article !== "Table of Contents") {
		App.UI.DOM.appendNewElement("div", f, App.Encyclopedia.link("Table of Contents"), ["center"]);
	}
	App.UI.DOM.appendNewElement("h2", f, article, ["center"]);
	f.append(App.Encyclopedia.renderArticle(article));

	if (!["How to Play", "Table of Contents", "Credits"].includes(article)) { // special pages where we don't show related links
		if (![
			"Being in Charge", "Body", "Fetishes", "Mods/Pregmod", "Inflation",
			"Leadership Positions", "Loli Mode", "Lore", "Obtaining Slaves", "Paraphilias",
			"Playing Free Cities", "Skills", "Slave Assignments", "Slave Modification", "Slaves",
			"Terrain Types", "The X-Series Arcology"
		].includes(article)) { // pages asking the player to click a link for more information have no section heading
			App.UI.DOM.appendNewElement("h3", f, "Related Links", ["center"]);
		}
		f.append(App.Encyclopedia.renderCategory(article));
	}
	const bottomLinks = [];
	if (article !== "Table of Contents") {
		bottomLinks.push(App.Encyclopedia.link("Table of Contents"));
		if (article !== "Credits") {
			bottomLinks.push(App.Encyclopedia.link("Credits"));
		}
	}
	App.UI.DOM.appendNewElement("div", f, App.UI.DOM.generateLinksStrip(bottomLinks), ["center"]);
	return f;
};

/** Create a link to an encyclopedia dialog for a given article with the given text
 * @param {string} text Text for link
 * @param {string} [article] Encyclopedia article to link to (if not supplied than text is capitalized.)
 * @param {string} [classNames] CSS Class to add to the link
 * @returns {HTMLElement} DOM link element
 */
App.Encyclopedia.link = function(text, article = capFirstChar(text), classNames) {
	const link = App.UI.DOM.link(text, () => showArticleInDialog(article));
	if (!classNames) {
		return link;
	}
	// Wrap in a span for coloring, more reliable when hovering over the link
	const span = document.createElement("span");
	span.className += classNames;
	span.append(link);
	return span;

	/** Show a given encyclopedia article in the encyclopedia dialog
	 * @param {string} article
	 */
	function showArticleInDialog(article) {
		if (Dialog.isOpen()) {
			Dialog.close();
		}
		Dialog.setup("Encyclopedia", "encyclopedia");
		Dialog.append(App.Encyclopedia.ui(article));
		Dialog.open();
	}
};
