/**
 * Provide a mechanism to inspect multiple slaves at once (for example, for Household Liquidators and recETS).
 * @param {Array<App.Entity.SlaveState>} slaves
 * @param {boolean} showFamilyTree
 * @param {FC.SlaveMarketName | FC.SpecialMarketName} [market]
 * @param {Map<number, string>} [marketText] map of Slave ID to text
 * @returns {DocumentFragment}
 */
App.UI.MultipleInspect = function(slaves, showFamilyTree, market, marketText) {
	const tabBar = new App.UI.Tabs.TabBar("MultipleInspect");

	for (const slave of slaves) {
		const text = marketText ? marketText.get(slave.ID) : null;
		tabBar.addTab(slave.slaveName, `slave${slave.ID}`, App.Desc.longSlave(slave, {market: market, marketText: text}));
	}

	if (slaves.length > 1 && showFamilyTree) {
		tabBar.addTab("Family Tree", "family-tree-tab", renderFamilyTree(slaves, slaves[0].ID));
	}

	return tabBar.render();
};
