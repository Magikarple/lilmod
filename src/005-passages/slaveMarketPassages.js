new App.DomPassage("Market",
	() => {
		const span = App.UI.DOM.makeElement("span", App.Markets[V.market.slaveMarket]());
		span.id = "slave-markets";
		return span;
	}, ["temporary-images"]
);

new App.DomPassage("Buy Slaves",
	() => {
		V.nextButton = "Back";
		V.nextLink = "Main";
		App.UI.StoryCaption.encyclopedia = "Obtaining Slaves";

		return App.UI.market();
	}, ["jump-from-safe", "jump-to-safe", "temporary-images"]
);

new App.DomPassage("Bulk Slave Intro", () => App.Markets.bulkSlaveIntro());

new App.DomPassage("Underperforming Slaves",
	() => {
		V.nextButton = "Back";
		V.nextLink = "Buy Slaves";
		return App.Underperformers.passage();
	}, ["jump-from-safe", "jump-to-safe", "temporary-images"]
);
