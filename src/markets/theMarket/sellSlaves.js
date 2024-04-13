App.UI.sellSlaves = function() {
	const el = new DocumentFragment();

	App.UI.DOM.appendNewElement("h2", el, "Selling slaves");

	const div = document.createElement("div");
	div.append(`While you are at the market, you may want to `);
	div.append(
		App.UI.DOM.passageLink(
			`look at your own underperforming slaves`,
			`Underperforming Slaves`
		)
	);
	el.append(div);

	return el;
};
