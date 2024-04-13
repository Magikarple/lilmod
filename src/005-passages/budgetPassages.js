new App.DomPassage("Costs Budget",
	() => {
		V.nextButton = "Back";
		V.nextLink = "Main";
		return App.Budget.costs();
	}, ["jump-to-safe", "jump-from-safe"]
);

new App.DomPassage("Rep Budget",
	() => {
		V.nextButton = "Back";
		V.nextLink = "Main";
		return App.Budget.rep();
	}, ["jump-to-safe", "jump-from-safe"]
);
