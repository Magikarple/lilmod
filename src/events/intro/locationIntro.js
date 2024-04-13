App.Intro.locationIntro = function() {
	const node = new DocumentFragment();

	App.Events.addParagraph(node, [
		`As the old countries crumble and technology stagnates, the gap between rich and poor increases. In order to continue living a good life without having their property taken by the mob, many of the wealthy and powerful come together to form 'Free Cities.' These are new cities on undeveloped land, in remote areas, or even afloat, fully free of any allegiance or law. These new cities are built on new ideas, with most buildings designed as futuristic, self-contained 'arcologies.' An arcology and everything in it is usually owned by a single person. And you're determined that you will soon be one of those single people.`,
		App.UI.DOM.makeElement("span", `In what part of the world is your new arcology going to be located?`, ["intro", "question"])
	]);

	const continents = new Map([
		["North America", "English"],
		["South America", "Spanish"],
		["Brazil", "Portuguese"],
		["Central Europe", "German"],
		["Western Europe", "English"],
		["Eastern Europe", "Russian"],
		["Southern Europe", "Italian"],
		["Scandinavia", "Norwegian"],
		["the Middle East", "Arabic"],
		["Africa", "Arabic"],
		["Asia", "Chinese"],
		["Japan", "Japanese"],
		["Australia", "English"],
	]);

	const linkArray = [];
	for (const [name, language] of continents) {
		linkArray.push(App.UI.DOM.passageLink(
			name,
			"Intro Summary",
			() => {
				V.continent = name;
				V.language = language;
			}
		));
	}
	node.append(App.UI.DOM.generateLinksStrip(linkArray));

	return node;
};
