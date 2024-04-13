App.Intro.PCAppearanceIntro = function() {
	const node = new DocumentFragment();

	node.append(
		`Race and appearance are largely irrelevant in the Free Cities; there are only the free and the enslaved.`,
		App.UI.DOM.makeElement("div", `Appearance only, will mostly have a superficial effect (unless you make a big deal out of it).`, ["indent", "note"])
	);

	const options = new App.UI.OptionsGroup();
	App.UI.Player.appearance(options);
	node.append(options.render());

	if (isFertile(V.PC)) {
		App.UI.DOM.appendNewElement("div", node, App.UI.DOM.passageLink(
			"Continue player character customization",
			"PC Preg Intro",
			() => resetEyeColor(V.PC)
		));
	} else {
		App.UI.DOM.appendNewElement("div", node, App.UI.DOM.passageLink(
			"Finish player character customization",
			"PC Experience Intro",
			() => resetEyeColor(V.PC)
		));
	}

	return node;
};
