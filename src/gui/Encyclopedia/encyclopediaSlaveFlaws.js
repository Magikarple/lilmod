App.Encyclopedia.addArticle("Flaws", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push(App.UI.DOM.makeElement("span", "Flaws", ["bold"]), "are negative slave qualities.");
	r.push("They decrease slaves' value and performance at sexual assignments, and each flaw also has other, differing effects. Each flaw is associated with a corresponding");
	r.push(App.UI.DOM.combineNodes(App.Encyclopedia.link("quirk", "Quirks"), ","), "and each slave can have two flaws (a sexual flaw and a behavioral flaw), just like quirks. New slaves will often have flaws, and tough experiences can also cause them to appear.");
	r.toParagraph();

	r.push("Flaws can softened or removed either by orders given to the", App.Encyclopedia.link("Head Girl"), "or via personal attention provided by the player character.");
	r.push("Flaws can also be naturally softened or removed by fetishes, and can resolve on their own if a slave is happy.");
	r.toNode("div");

	return f;
}, "slaveFlaws");

App.Encyclopedia.addArticle("Anorexic", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push(App.UI.DOM.makeElement("span", "Anorexic", ["bold"]), "is a behavioral", App.Encyclopedia.link("flaw", "Flaws"), "that can be softened into the");
	r.push(App.Encyclopedia.link("insecure"), App.UI.DOM.combineNodes(App.Encyclopedia.link("quirk", "Quirks"), "."));
	r.push("In addition to the standard penalties to value and performance on sexual assignments, anorexia can cause unexpected weight loss. Anorexics will enjoy dieting but dislike gaining weight, and may bilk attempts to make them fatten up.");
	r.toNode("div");

	return f;
}, "slaveFlaws");

App.Encyclopedia.addArticle("Arrogant", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push(App.UI.DOM.makeElement("span", "Arrogant", ["bold"]), "is a behavioral", App.Encyclopedia.link("flaw", "Flaws"), "that can be softened into the");
	r.push(App.Encyclopedia.link("confident"), App.UI.DOM.combineNodes(App.Encyclopedia.link("quirk", "Quirks"), "."));
	r.push("The", App.Encyclopedia.link("submissive", "Submissives"), "fetish can do this naturally.");
	r.push("In addition to the standard penalties to value and performance on sexual assignments, weekly", App.Encyclopedia.link("devotion", "From Rebellious to Devoted", "hotpink"), "gains are limited.");
	r.toNode("div");

	r.toNode("div");

	return f;
}, "slaveFlaws");

App.Encyclopedia.addArticle("Bitchy", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push(App.UI.DOM.makeElement("span", "Bitchy", ["bold"]), "is a behavioral", App.Encyclopedia.link("flaw", "Flaws"), "that can be softened into the");
	r.push(App.Encyclopedia.link("cutting"), App.UI.DOM.combineNodes(App.Encyclopedia.link("quirk", "Quirks"), "."));
	r.push("The", App.Encyclopedia.link("humiliation", "Humiliation Fetishists"), "fetish can do this naturally.");
	r.push("In addition to the standard penalties to value and performance on sexual assignments, weekly", App.Encyclopedia.link("devotion", "From Rebellious to Devoted", "hotpink"), "gains are limited.");
	r.toNode("div");

	return f;
}, "slaveFlaws");

App.Encyclopedia.addArticle("Devout", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push(App.UI.DOM.makeElement("span", "Devout", ["bold"]), "is a behavioral", App.Encyclopedia.link("flaw", "Flaws"), "that can be softened into the");
	r.push(App.Encyclopedia.link("sinful"), App.UI.DOM.combineNodes(App.Encyclopedia.link("quirk", "Quirks"), "."));
	r.push("A very powerful sex drive can do this naturally.");
	r.push("In addition to the standard penalties to value and performance on sexual assignments, weekly", App.Encyclopedia.link("devotion", "From Rebellious to Devoted", "hotpink"), "gains are limited.");
	r.toNode("div");

	return f;
}, "slaveFlaws");

App.Encyclopedia.addArticle("Gluttonous", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push(App.UI.DOM.makeElement("span", "Gluttonous", ["bold"]), "is a behavioral", App.Encyclopedia.link("flaw", "Flaws"), "that can be softened into the");
	r.push(App.Encyclopedia.link("fitness"), App.UI.DOM.combineNodes(App.Encyclopedia.link("quirk", "Quirks"), "."));
	r.push("In addition to the standard penalties to value and performance on sexual assignments, gluttons will enjoy gaining weight but dislike dieting, and may bilk attempts to make them lose weight.");
	r.toNode("div");

	return f;
}, "slaveFlaws");

App.Encyclopedia.addArticle("Hates men", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push(App.UI.DOM.makeElement("span", "Hates men", ["bold"]), "is a behavioral", App.Encyclopedia.link("flaw", "Flaws"), "that can be softened into the");
	r.push(App.Encyclopedia.link("adores women"), App.Encyclopedia.link("quirk", "Quirks"), "by training,");
	r.push("a good", App.UI.DOM.combineNodes(App.Encyclopedia.link("Attendant"), ","), "a powerful sex drive, or the", App.Encyclopedia.link("boob fetish.", "Boob Fetishists"));
	r.push("Strong attraction to men or the", App.Encyclopedia.link("pregnancy fetish", "Pregnancy Fetishists"), "will soften it so she", App.Encyclopedia.link("adores men"), "instead.");
	r.push("This flaw can also be removed by serving a player character or another slave with a dick.");
	r.toNode("div");

	return f;
}, "slaveFlaws");

App.Encyclopedia.addArticle("Hates women", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push(App.UI.DOM.makeElement("span", "Hates women", ["bold"]), "is a behavioral", App.Encyclopedia.link("flaw", "Flaws"), "that can be softened into the");
	r.push(App.Encyclopedia.link("adores men"), App.Encyclopedia.link("quirk", "Quirks"), "by training,");
	r.push("a good", App.UI.DOM.combineNodes(App.Encyclopedia.link("Attendant"), ","), "a powerful sex drive, or the", App.Encyclopedia.link("cumslut", "Cumsluts"), "fetish.");
	r.push("Strong attraction to women or the", App.Encyclopedia.link("pregnancy fetish", "Pregnancy Fetishists"), "will soften it so she", App.Encyclopedia.link("adores women"), "instead.");
	r.push("This flaw can also be removed by serving a player character or another slave with a vagina.");
	r.toNode("div");

	return f;
}, "slaveFlaws");

App.Encyclopedia.addArticle("Liberated", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push(App.UI.DOM.makeElement("span", "Liberated", ["bold"]), "is a behavioral", App.Encyclopedia.link("flaw", "Flaws"), "that can be softened into the");
	r.push(App.Encyclopedia.link("advocate"), App.UI.DOM.combineNodes(App.Encyclopedia.link("quirk", "Quirks"), "."));
	r.push("The", App.Encyclopedia.link("masochism", "Masochists"), "fetish can do this naturally.");
	r.push("In addition to the standard penalties to value and performance on sexual assignments, weekly", App.Encyclopedia.link("devotion", "From Rebellious to Devoted", "hotpink"), "gains are limited.");
	r.toNode("div");

	return f;
}, "slaveFlaws");

App.Encyclopedia.addArticle("Odd", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push(App.UI.DOM.makeElement("span", "Odd", ["bold"]), "is a behavioral", App.Encyclopedia.link("flaw", "Flaws"), "that can be softened into the");
	r.push(App.Encyclopedia.link("funny"), App.UI.DOM.combineNodes(App.Encyclopedia.link("quirk", "Quirks"), "."));
	r.push("In addition to the standard penalties to value and performance on sexual assignments, weekly", App.Encyclopedia.link("devotion", "From Rebellious to Devoted", "hotpink"), "gains are limited.");
	r.toParagraph();

	return f;
}, "slaveFlaws");

App.Encyclopedia.addArticle("Apathetic", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push(App.UI.DOM.makeElement("span", "Apathetic", ["bold"]), "is a sexual", App.Encyclopedia.link("flaw", "Flaws"), "that can be softened into the");
	r.push(App.Encyclopedia.link("caring"), App.Encyclopedia.link("quirk", "Quirks"), "by training,");
	r.push("a good", App.UI.DOM.combineNodes(App.Encyclopedia.link("Attendant"), ","), "a powerful sex drive, or the", App.Encyclopedia.link("submissive", "Submissives"), "fetish.");
	r.push("It can also be removed by the", App.Encyclopedia.link("dom", "Doms"), "fetish.");
	r.toParagraph();

	return f;
}, "slaveFlaws");

App.Encyclopedia.addArticle("Crude", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push(App.UI.DOM.makeElement("span", "Crude", ["bold"]), "is a sexual", App.Encyclopedia.link("flaw", "Flaws"), "that can be softened into the");
	r.push(App.Encyclopedia.link("unflinching"), App.Encyclopedia.link("quirk", "Quirks"), "by training,");
	r.push("a good", App.UI.DOM.combineNodes(App.Encyclopedia.link("Attendant"), ","), "a powerful sex drive, or the", App.Encyclopedia.link("buttslut", "Buttsluts"), "fetish.");
	r.toParagraph();

	return f;
}, "slaveFlaws");

App.Encyclopedia.addArticle("Hates anal", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push(App.UI.DOM.makeElement("span", "Hates anal", ["bold"]), "is a sexual", App.Encyclopedia.link("flaw", "Flaws"), "that can be softened into the");
	r.push(App.Encyclopedia.link("painal queen", "Painal Queen"), App.Encyclopedia.link("quirk", "Quirks"), "by training,");
	r.push("a good", App.UI.DOM.combineNodes(App.Encyclopedia.link("Attendant"), ","), "a powerful sex drive, anus piercings, or the", App.Encyclopedia.link("buttslut", "Buttsluts"), "fetish.");
	r.push("This flaw can also be removed by serving the player character.");
	r.toParagraph();

	return f;
}, "slaveFlaws");

App.Encyclopedia.addArticle("Hates oral", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push(App.UI.DOM.makeElement("span", "Hates oral", ["bold"]), "is a sexual", App.Encyclopedia.link("flaw", "Flaws"), "that can be softened into the");
	r.push(App.Encyclopedia.link("gagfuck queen", "Gagfuck Queen"), App.Encyclopedia.link("quirk", "Quirks"), "by training,");
	r.push("a good", App.UI.DOM.combineNodes(App.Encyclopedia.link("Attendant"), ","), "a powerful sex drive, tongue piercings, or the", App.Encyclopedia.link("cumslut", "Cumsluts"), "fetish.");
	r.push("This flaw can also be removed by serving the player character.");
	r.toParagraph();

	return f;
}, "slaveFlaws");

App.Encyclopedia.addArticle("Hates penetration", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push(App.UI.DOM.makeElement("span", "Hates penetration", ["bold"]), "is a sexual", App.Encyclopedia.link("flaw", "Flaws"), "that can be softened into the");
	r.push(App.Encyclopedia.link("strugglefuck queen", "Strugglefuck Queen"), App.Encyclopedia.link("quirk", "Quirks"), "by training,");
	r.push("a good", App.UI.DOM.combineNodes(App.Encyclopedia.link("Attendant"), ","), "a powerful sex drive, labia piercings, or the", App.Encyclopedia.link("buttslut", "Buttsluts"), "fetish.");
	r.push("This flaw can also be removed by the", App.Encyclopedia.link("pregnancy fetish", "Pregnancy Fetishists"), "or by serving the player character.");
	r.toParagraph();

	return f;
}, "slaveFlaws");

App.Encyclopedia.addArticle("Idealistic", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push(App.UI.DOM.makeElement("span", "Idealistic", ["bold"]), "is a sexual", App.Encyclopedia.link("flaw", "Flaws"), "that can be softened into the");
	r.push(App.Encyclopedia.link("romantic"), App.Encyclopedia.link("quirk", "Quirks"), "by training,");
	r.push("a good", App.UI.DOM.combineNodes(App.Encyclopedia.link("Attendant"), ","), "a powerful sex drive, or the", App.Encyclopedia.link("submissive", "Submissives"), "fetish.");
	r.toParagraph();

	return f;
}, "slaveFlaws");

App.Encyclopedia.addArticle("Judgemental", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push(App.UI.DOM.makeElement("span", "Judgemental", ["bold"]), "is a sexual", App.Encyclopedia.link("flaw", "Flaws"), "that can be softened into the");
	r.push(App.Encyclopedia.link("size queen", "Size Queen"), App.Encyclopedia.link("quirk", "Quirks"), "by training,");
	r.push("a good", App.UI.DOM.combineNodes(App.Encyclopedia.link("Attendant"), ","), "a powerful sex drive, or the", App.Encyclopedia.link("submissive", "Submissives"), "fetish.");
	r.toParagraph();

	return f;
}, "slaveFlaws");

App.Encyclopedia.addArticle("Repressed", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push(App.UI.DOM.makeElement("span", "Repressed", ["bold"]), "is a sexual", App.Encyclopedia.link("flaw", "Flaws"), "that can be softened into the");
	r.push(App.Encyclopedia.link("perverted"), App.Encyclopedia.link("quirk", "Quirks"), "by training,");
	r.push("a good", App.UI.DOM.combineNodes(App.Encyclopedia.link("Attendant"), ","), "a powerful sex drive, or the", App.Encyclopedia.link("cumslut", "Cumsluts"), "or", App.Encyclopedia.link("buttslut", "Buttsluts"), "fetishes.");
	r.toParagraph();

	return f;
}, "slaveFlaws");

App.Encyclopedia.addArticle("Shamefast", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push(App.UI.DOM.makeElement("span", "Shamefast", ["bold"]), "is a sexual", App.Encyclopedia.link("flaw", "Flaws"), "that can be softened into the");
	r.push(App.Encyclopedia.link("tease"), App.Encyclopedia.link("quirk", "Quirks"), "by training,");
	r.push("a good", App.UI.DOM.combineNodes(App.Encyclopedia.link("Attendant"), ","), "a powerful sex drive, or the", App.Encyclopedia.link("humiliation", "Humiliation Fetishists"), "fetish.");
	r.toParagraph();

	return f;
}, "slaveFlaws");

App.Encyclopedia.addCategory("slaveFlaws", function() {
	const f = new DocumentFragment();
	let r = [];
	r.push(App.Encyclopedia.link("Anorexic"));
	r.push(App.Encyclopedia.link("Arrogant"));
	r.push(App.Encyclopedia.link("Bitchy"));
	r.push(App.Encyclopedia.link("Devout"));
	r.push(App.Encyclopedia.link("Gluttonous"));
	r.push(App.Encyclopedia.link("Hates men"));
	r.push(App.Encyclopedia.link("Hates women"));
	r.push(App.Encyclopedia.link("Liberated"));
	r.push(App.Encyclopedia.link("Odd"));
	App.Events.addNode(f, ["Behavioral ", App.UI.DOM.combineNodes(App.Encyclopedia.link("Flaws"), ":"), App.UI.DOM.generateLinksStrip(r)], "div");

	r = [];
	r.push(App.Encyclopedia.link("Apathetic"));
	r.push(App.Encyclopedia.link("Crude"));
	r.push(App.Encyclopedia.link("Hates anal"));
	r.push(App.Encyclopedia.link("Hates oral"));
	r.push(App.Encyclopedia.link("Hates penetration"));
	r.push(App.Encyclopedia.link("Idealistic"));
	r.push(App.Encyclopedia.link("Judgemental"));
	r.push(App.Encyclopedia.link("Repressed"));
	r.push(App.Encyclopedia.link("Shamefast"));
	App.Events.addNode(f, ["Sexual ", App.UI.DOM.combineNodes(App.Encyclopedia.link("Flaws"), ":"), App.UI.DOM.generateLinksStrip(r)], "div");

	return f;
});
