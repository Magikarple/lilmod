App.UI.Cheat.PCCheatMenu = function() {
	const node = new DocumentFragment();

	App.UI.DOM.appendNewElement("h2", node, "Cheat Editing Player Character");

	App.UI.DOM.appendNewElement("div", node, App.UI.DOM.passageLink(
		"Cancel",
		"Manage Personal Affairs",
		() => {
			V.PC = clone(V.backupSlave);
		}
	));

	const tabBar = new App.UI.Tabs.TabBar("PCCheatMenu");
	tabBar.addTab("Player", "player", App.UI.Player.design());
	tabBar.addTab("Family", "family", App.Intro.editFamily(V.PC, true));
	node.append(tabBar.render());

	return node;
};
