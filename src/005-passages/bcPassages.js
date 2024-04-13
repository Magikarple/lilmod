new App.DomPassage("Backwards Compatibility",
	() => {
		V.nextButton = "Continue";
		V.nextLink = "Main";

		App.Update.setNonexistentProperties(V, App.Data.defaultGameStateVariables);
		// resetOnNGPlus contains half of the variables we need, but we use it politely here instead of forcing it so it
		// fills in holes instead of overwriting data.
		App.Update.setNonexistentProperties(V, App.Data.resetOnNGPlus);

		return App.Update.backwardsCompatibility();
	}
);
