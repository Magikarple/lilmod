new App.DomPassage("Alpha disclaimer", () => { return App.Intro.alphaDisclaimer(); });

new App.DomPassage("New Game Plus", () => { return App.Intro.newGamePlus(); });

new App.DomPassage("PC Body Intro", () => { return App.Intro.PCBodyIntro(); });

new App.DomPassage("Intro Summary", () => { return App.Intro.summary(); });

new App.DomPassage("Acquisition",
	() => {
		App.UI.StoryCaption.encyclopedia = "How to Play";
		return App.Intro.acquisition();
	}
);

new App.DomPassage("Customize Slave Trade", () => { return App.Intro.CustomSlaveTrade(); });

new App.DomPassage("Starting Girls", () => { return App.StartingGirls.passage(); });

new App.DomPassage("Gender Intro", () => { return App.Intro.genderIntro(); });

new App.DomPassage("PC Experience Intro", () => { return App.Intro.PCExperienceIntro(); });

new App.DomPassage("Economy Intro", () => { return App.Intro.economyIntro(); });

new App.DomPassage("Trade Intro", () => { return App.Intro.tradeIntro(); });

new App.DomPassage("Extreme Intro", () => { return App.Intro.extremeIntro(); });

new App.DomPassage("Slave Age Intro", () => { return App.Intro.slaveAgeIntro(); });

new App.DomPassage("PC Rumor Intro", () => { return App.Intro.PCRumorIntro(); });

new App.DomPassage("Terrain Intro", () => { return App.Intro.terrainIntro(); });

new App.DomPassage("Takeover Target", () => { return App.Intro.takeoverTarget(); });

new App.DomPassage("PC Preg Intro", () => { return App.Intro.PCPregIntro(); });

new App.DomPassage("PC Appearance Intro", () => { return App.Intro.PCAppearanceIntro(); });

new App.DomPassage("Location Intro", () => { return App.Intro.locationIntro(); });
