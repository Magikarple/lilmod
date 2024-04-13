App.Intro.extremeIntro = function() {
	const node = new DocumentFragment();

	App.Events.addParagraph(node, [
		`The early Free Cities were wild places where the writ of law did not run. In some of the most depraved, slaves' bodies, minds and even lives were playthings of the wealthy and powerful. Though modern Free Cities are tremendously varied, a majority of the new communities made a choice about whether extreme practices were a flaw in a lawless society or one of its benefits.`,
		App.UI.DOM.makeElement("span", `How did most Free Cities react to the excesses of the early days?`, ["intro", "question"])
	]);

	App.Events.addResponses(node, [
		new App.Events.Result(`They drew back from them.`, drewBack, `Extreme content such as amputation and castration will not appear.`),
		new App.Events.Result(`They reveled in them.`, reveled, `Extreme content will appear.`),
		new App.Events.Result(`They drew back from them, but remained creative.`, creative, `Extreme content will not appear, but hyper-pregnancy related content might appear.`),
		new App.Events.Result(`They reveled in them and were particularly inventive.`, inventive, `Extreme content will appear, including hyper-pregnancy related content`),
	]);

	return node;

	function drewBack() {
		V.seeExtreme = 0;
		Engine.play("Gender Intro");
		return ``;
	}

	function reveled() {
		V.seeExtreme = 1;
		Engine.play("Gender Intro");
		return ``;
	}

	function creative() {
		V.seeExtreme = 0;
		V.seeHyperPreg = 1;
		Engine.play("Gender Intro");
		return ``;
	}

	function inventive() {
		V.seeExtreme = 1;
		V.seeHyperPreg = 1;
		Engine.play("Gender Intro");
		return ``;
	}
};
