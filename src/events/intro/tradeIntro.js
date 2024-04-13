App.Intro.tradeIntro = function() {
	const node = new DocumentFragment();

	App.Events.addParagraph(node, [
		`Most of the Free Cities are run on radically libertarian or even anarcho-capitalist principles. The first Free Cities experimented with indentured servitude, and this rapidly developed into widespread slavery. By now, the Free Cities collectively are a fundamentally slaveowning society and maintain a thriving slave trade that feeds off the terrible conditions in parts of the old world.`,
		App.UI.DOM.makeElement("span", `What attitude have the old world countries generally taken towards this trade?`, ["intro", "question"])
	]);

	App.Events.addResponses(node, [
		new App.Events.Result(`They've turned a blind eye, or even been complicit.`, complicit, `Slaves from all across the world will appear.`),
		new App.Events.Result(`They've done what little they can to stop it.`, little, `Almost all slaves will be from the continent where the arcology is located.`),
		new App.Events.Result(`Reactions have been mixed.`, mixed, `This will bypass arcology location restrictions, allowing you to adjust the nationalities encountered when buying non-customizable slaves.`),
	]);

	return node;

	function complicit() {
		V.internationalTrade = 1;
		V.customVariety = 0;
		Engine.play("Extreme Intro");
		return ``;
	}

	function little() {
		V.internationalTrade = 0;
		V.customVariety = 0;
		Engine.play("Extreme Intro");
		return ``;
	}

	function mixed() {
		V.internationalTrade = 0;
		V.customVariety = 1;
		V.customWA = 1;
		Engine.play("Customize Slave Trade");
		return ``;
	}
};
