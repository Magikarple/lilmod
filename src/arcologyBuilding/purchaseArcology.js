App.Arcology.purchase = function() {
	const div = document.createElement("div");
	const linkDiv = document.createElement("div");

	div.append(linkDiv);
	linkDiv.append(
		`You can also purchase a new arcology to move to in a new location. You will once again become an unknown figure with no reputation of any kind.`,
		App.UI.DOM.makeElement("div", App.UI.DOM.link(`See arcologies`, () => {
			App.UI.DOM.replace(linkDiv, purchase());
		}), ['indent']),
	);

	function purchase() {
		const frag = new DocumentFragment();

		const h3 = App.UI.DOM.makeElement("h3", `Purchase an arcology`);

		frag.append(h3, App.Intro.generateEstablishedArcologies());

		return frag;
	}

	return div;
};
