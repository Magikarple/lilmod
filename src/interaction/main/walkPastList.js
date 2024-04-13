App.UI.walkPastAll = function() {
	const node = new DocumentFragment();

	App.UI.DOM.appendNewElement("p", node, `For testing purposes only, this page lists or can produce all of the "walk past" scenes. "Vagina" will use ass if they lack one.`, "scene-intro");

	const tabMap = new Map([
		["Lips", "fLips"],
		["Boobs", "fBoobs"],
		["Butt", "fButt"],
		["Anus", "fAnus"],
		["Vagina", "fVagina"],
		["Dick", "fDick"],
		["Suck Dick", "fSuckDick"],
		["Rival", "fRival"],
		["Relation", "fRelation"],
	]);

	App.UI.DOM.appendNewElement("h2", node, `Choose target`);

	const tabBar = new App.UI.Tabs.TabBar("Walkpastlist");
	for (const [title, category] of tabMap) {
		tabBar.addTab(title, title.toLowerCase(), walkPastCategory(category));
	}
	node.append(tabBar.render());

	return node;

	/** generate the specified walkPast vignette for all slaves (for debugging purposes)
	 * @param {string} fixedTarget
	 * @returns {DocumentFragment}
	 */
	function walkPastCategory(fixedTarget) {
		return App.UI.DOM.combineNodes(...V.slaves.map(
			(s) => App.UI.DOM.makeElement("p", walkPast(s, fixedTarget))
		));
	}
};
