App.Encyclopedia.addArticle("Terrain Types", function() {
	const f = new DocumentFragment();
	App.Events.addNode(f, [App.UI.DOM.makeElement("span", "Future room for lore text", ["note"])], "div");
	App.Events.addNode(f, ["Choose a more particular entry below:"], "div");
	return f;
}, "Terrain");

App.Encyclopedia.addArticle("Urban Terrain", function() {
	const f = new DocumentFragment();
	App.Events.addNode(f, [App.UI.DOM.makeElement("span", "Urban", ["bold"]), "terrain is one of the possible settings for the Free City in which the arcology is located. It provides:"], "div");
	App.Events.addNode(f, [App.UI.DOM.makeElement("span", "Low", ["yellow"]), "minimum slave value and initial", App.UI.DOM.makeElement("span", "bear market", ["yellow"]), "for slaves."], "div", ["indent"]);
	App.Events.addNode(f, [App.UI.DOM.makeElement("span", "High", ["green"]), "ease of commerce with the old world."], "div", ["indent"]);
	App.Events.addNode(f, [App.UI.DOM.makeElement("span", "High", ["green"]), "access to refugees and other desperate people."], "div", ["indent"]);
	App.Events.addNode(f, [App.UI.DOM.makeElement("span", "Low", ["red"]), "cultural independence."], "div", ["indent"]);
	return f;
}, "Terrain");

App.Encyclopedia.addArticle("Rural Terrain", function() {
	const f = new DocumentFragment();
	App.Events.addNode(f, [App.UI.DOM.makeElement("span", "Rural", ["bold"]), "terrain is one of the possible settings for the Free City in which the arcology is located. It provides:"], "div");
	App.Events.addNode(f, [App.UI.DOM.makeElement("span", "High", ["yellow"]), "minimum slave value and initial", App.UI.DOM.makeElement("span", "bull market", ["yellow"]), "for slaves."], "div", ["indent"]);
	App.Events.addNode(f, ["Moderate ease of commerce with the old world."], "div", ["indent"]);
	App.Events.addNode(f, ["Moderate access to refugees and other desperate people."], "div", ["indent"]);
	App.Events.addNode(f, ["Moderate cultural independence."], "div", ["indent"]);
	return f;
}, "Terrain");

App.Encyclopedia.addArticle("Ravine Terrain", function() {
	const f = new DocumentFragment();
	App.Events.addNode(f, [App.UI.DOM.makeElement("span", "Ravine", ["bold"]), "terrain is one of the possible settings for the Free City in which the arcology is located. It provides:"], "div");
	App.Events.addNode(f, [App.UI.DOM.makeElement("span", "High", ["yellow"]), "minimum slave value and initial", App.UI.DOM.makeElement("span", "bull market", ["yellow"]), "for slaves."], "div", ["indent"]);
	App.Events.addNode(f, [App.UI.DOM.makeElement("span", "Low", ["red"]), "ease of commerce with the old world."], "div", ["indent"]);
	App.Events.addNode(f, [App.UI.DOM.makeElement("span", "Very low", ["red"]), "access to refugees and other desperate people."], "div", ["indent"]);
	App.Events.addNode(f, [App.UI.DOM.makeElement("span", "High", ["green"]), "cultural independence."], "div", ["indent"]);
	return f;
}, "Terrain");

App.Encyclopedia.addArticle("Marine Terrain", function() {
	const f = new DocumentFragment();
	App.Events.addNode(f, [App.UI.DOM.makeElement("span", "Marine", ["bold"]), "terrain is one of the possible settings for the Free City in which the arcology is located. It provides:"], "div");
	App.Events.addNode(f, [App.UI.DOM.makeElement("span", "Moderate minimum slave value and initially balanced market for slaves.")], "div", ["indent"]);
	App.Events.addNode(f, [App.UI.DOM.makeElement("span", "Moderate ease of commerce with the old world.")], "div", ["indent"]);
	App.Events.addNode(f, [App.UI.DOM.makeElement("span", "Low", ["red"]), "access to refugees and other desperate people."], "div", ["indent"]);
	App.Events.addNode(f, [App.UI.DOM.makeElement("span", "High", ["green"]), "cultural independence."], "div", ["indent"]);
	return f;
}, "Terrain");

App.Encyclopedia.addArticle("Oceanic Terrain", function() {
	const f = new DocumentFragment();
	App.Events.addNode(f, [App.UI.DOM.makeElement("span", "Oceanic", ["bold"]), "terrain is one of the possible settings for the Free City in which the arcology is located. It provides:"], "div");
	App.Events.addNode(f, [App.UI.DOM.makeElement("span", "High", ["yellow"]), "minimum slave value and initial", App.UI.DOM.makeElement("span", "bull market", ["yellow"]), "for slaves."], "div", ["indent"]);
	App.Events.addNode(f, ["Moderate ease of commerce with the old world."], "div", ["indent"]);
	App.Events.addNode(f, [App.UI.DOM.makeElement("span", "Very low", ["red"]), "access to refugees and other desperate people."], "div", ["indent"]);
	App.Events.addNode(f, [App.UI.DOM.makeElement("span", "Very high", ["green"]), "cultural independence."], "div", ["indent"]);
	App.Events.addNode(f, ["Ensures access to slaves from all over the world and will not associate the arcology with a continent."], "div", ["indent"]);
	return f;
}, "Terrain");

App.Encyclopedia.addCategory("Terrain", function() {
	const f = new DocumentFragment();
	const r = [];
	r.push(App.Encyclopedia.link("Types", "Terrain Types"));
	r.push(App.Encyclopedia.link("Urban", "Urban Terrain"));
	r.push(App.Encyclopedia.link("Rural", "Rural Terrain"));
	r.push(App.Encyclopedia.link("Ravine", "Ravine Terrain"));
	r.push(App.Encyclopedia.link("Marine", "Marine Terrain"));
	r.push(App.Encyclopedia.link("Oceanic", "Oceanic Terrain"));
	App.Events.addNode(f, ["Terrain:", App.UI.DOM.generateLinksStrip(r)], "div");
	return f;
});
