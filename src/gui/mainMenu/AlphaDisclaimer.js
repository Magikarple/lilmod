App.Intro.alphaDisclaimer = function() {
	App.Intro.init();
	const node = new DocumentFragment();

	App.UI.DOM.appendNewElement("h2", node, "Warning");

	App.UI.DOM.appendNewElement("p", node, `This is a text-based game that includes descriptions of sexual activity, graphic violence, drug use, and other subjects not suitable for persons under the age of 18. This is a work of fiction; any resemblance to actual persons, places, or events is unintended.`, "yellow");

	App.UI.DOM.appendNewElement("h2", node, "Welcome!");

	App.UI.DOM.appendNewElement("p", node, `An in-game encyclopedia is available from the sidebar, with answers to most basic gameplay questions.`);
	App.Events.addParagraph(node, [
		App.UI.DOM.makeElement("span", `Important info for new players, and a reminder for FC veterans:`, "bold"),
		`when the player is offered a set of choices, the`,
		App.UI.DOM.makeElement("span", `Continue`, "bold"),
		`button at the top of the left sidebar will almost always remain available. Using this to decline all the options presented is <span style="font-style:italic">not cheating.</span> If it's available, it's supposed to be available. It represents the player character politely bowing out of the situation.`
	]);

	App.UI.DOM.appendNewElement("h2", node, "Please note");
	const p = App.UI.DOM.appendNewElement("p", node);
	App.Events.addNode(p, [
		App.UI.DOM.makeElement("span", `This is an alpha.`, "bold"),
		`That means the game is missing content, is full of bugs, is imbalanced, and is generally in an incomplete state. The game will keep a start of turn autosave. If you encounter a bug, we strongly recommend you reload your start of turn autosave immediately. Please submit your feedback and bug reports <a href='https://gitgud.io/pregmodfan/fc-pregmod/issues/' target='_blank'>here</a>. Consider attaching a save file and screenshot of the problem.`,
	], "div");
	App.Events.addNode(p, [`Pregmod is a modification of the original <i>Free Cities</i> ${V.ver} created by FCdev, which can be seen <a href='https://freecitiesblog.blogspot.com/' target='_blank'>here</a>.`], "div");


	App.Events.addNode(p, [`mod version: ${V.pmodVer}, build: ${V.releaseID}${App.Version.commitHash ? `, commit: ${App.Version.commitHash}` : ``}`], "div", "note");
	App.Events.addNode(p, [`4.0.0 is an alpha release. This means the new player content has minimal implementation.`], "div", "bold"); /* remove me with 4.0.0! */

	App.Events.addResponses(node, [
		new App.Events.Result(`More version info`, versionInfo)
	]);

	App.UI.DOM.appendNewElement("p", node, App.UI.DOM.passageLink(
		"I am 18 or more years of age, I understand, and I wish to continue",
		"Economy Intro"
	));

	return node;


	function versionInfo() {
		const frag = new DocumentFragment();
		App.Events.addNode(frag, [
			App.UI.DOM.makeElement("span", "Mod: expanded age ranges and other tweaks 2016-08-30", ["green", "note"]),
			App.UI.DOM.makeElement("span", `+SV`, "darkred"),
		], "div");
		App.UI.DOM.appendNewElement("div", frag, "Mod: extra preg content and other crap", ["green", "note"]);
		App.UI.DOM.appendNewElement("div", frag, "Saves from versions prior to 0.6 are not compatible.", "bold");

		return frag;
	}
};
