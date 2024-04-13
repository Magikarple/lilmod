App.UI.Cheat.neighborArcologyCheatDatatypeCleanup = function() {
	const node = new DocumentFragment();

	App.Update.arcologiesDatatypeCleanup();

	App.UI.DOM.appendNewElement("p", node, "You have CHEATED your way to influencing the neighboring arcologies. They have been unscrupulously directed according to your CHEAT whims.");

	App.UI.DOM.appendNewElement("p", node, "The Eldritch horrors feast upon your CHEATING soul and look forward to more future dealings with you. The repercussions may be far reaching and the consequences dire.");

	return node;
};
