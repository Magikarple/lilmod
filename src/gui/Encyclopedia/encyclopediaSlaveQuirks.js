App.Encyclopedia.addArticle("Quirks", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push(App.UI.DOM.makeElement("span", "Quirks", ["bold"]));
	r.push("are positive slave qualities. They increase slaves' value and performance at sexual assignments, and each quirk also has other, differing effects. Each quirk is associated with a corresponding");
	r.push(App.UI.DOM.combineNodes(App.Encyclopedia.link("flaw", "Flaws"), ", and each slave can have two quirks (a sexual quirk and a behavioral quirk), just like flaws. Quirks may appear randomly, but the most reliable way to give slaves quirks is to soften flaws."));
	r.toParagraph();

	r.push("The", App.Encyclopedia.link("Head Girl"), "can be ordered to soften flaws, the");
	r.push(App.Encyclopedia.link("Attendant"), "can soften the flaws of slaves resting in the", App.UI.DOM.combineNodes(App.Encyclopedia.link("Spa"), ","));
	r.push("and the player character can soften flaws with personal attention. Certain flaws can also be naturally softened into quirks by fetishes, high libido, or other factors.");
	r.toNode("div");

	return f;
}, "slaveQuirks");

App.Encyclopedia.addArticle("Adores men", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push(App.UI.DOM.makeElement("span", "Adores men", ["bold"]), "is a behavioral", App.Encyclopedia.link("quirk", "Quirks"), "developed from the");
	r.push(App.Encyclopedia.link("hates women"), App.UI.DOM.combineNodes(App.Encyclopedia.link("flaw", "Flaws"), "."));
	r.push("Slaves may naturally become", App.Encyclopedia.link("pregnancy fetishists", "Pregnancy Fetishists"), "if capable of becoming pregnant, or", App.Encyclopedia.link("cumsluts"), "otherwise.");
	r.push("In addition to the standard value and sexual assignment advantages, they get bonus");
	r.push(App.Encyclopedia.link("trust", "Trust", "mediumaquamarine"), "on", App.Encyclopedia.link("fucktoy"), "duty if the player character is masculine, and increased chance of gaining additional XY attraction.");
	r.toNode("div");

	return f;
}, "slaveQuirks");

App.Encyclopedia.addArticle("Adores women", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push(App.UI.DOM.makeElement("span", "Adores women", ["bold"]), "is a behavioral", App.Encyclopedia.link("quirk", "Quirks"), "developed from the");
	r.push(App.Encyclopedia.link("hates men"), App.UI.DOM.combineNodes(App.Encyclopedia.link("flaw", "Flaws"), "."));
	r.push("Slaves may naturally become", App.Encyclopedia.link("pregnancy fetishists", "Pregnancy Fetishists"), "if capable of impregnating others, or", App.Encyclopedia.link("breast fetishists", "Boob Fetishists"), "otherwise.");
	r.push("In addition to the standard value and sexual assignment advantages, they get bonus");
	r.push(App.Encyclopedia.link("trust", "Trust", "mediumaquamarine"), "on", App.Encyclopedia.link("fucktoy"), "duty if the player character is feminine, and increased chance of gaining additional XX attraction.");
	r.toNode("div");

	return f;
}, "slaveQuirks");

App.Encyclopedia.addArticle("Advocate", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push(App.UI.DOM.makeElement("span", "Advocate", ["bold"]), "is a behavioral", App.Encyclopedia.link("quirk", "Quirks"), "developed from the");
	r.push(App.Encyclopedia.link("liberated"), App.UI.DOM.combineNodes(App.Encyclopedia.link("flaw", "Flaws"), "."));
	r.push("Slaves may naturally become", App.UI.DOM.combineNodes(App.Encyclopedia.link("submissive", "Submissives"), "."));
	r.push("In addition to the standard value and sexual assignment advantages, they get bonus");
	r.push(App.Encyclopedia.link("devotion", "From Rebellious to Devoted", "hotpink"), "while performing");
	r.push(App.UI.DOM.combineNodes(App.Encyclopedia.link("public service", "Public Service"), "."));
	r.toNode("div");

	return f;
}, "slaveQuirks");

App.Encyclopedia.addArticle("Confident", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push(App.UI.DOM.makeElement("span", "Confident", ["bold"]), "is a behavioral", App.Encyclopedia.link("quirk", "Quirks"), "developed from the");
	r.push(App.Encyclopedia.link("arrogant"), App.UI.DOM.combineNodes(App.Encyclopedia.link("flaw", "Flaws"), "."));
	r.push("Slaves may naturally become", App.UI.DOM.combineNodes(App.Encyclopedia.link("doms"), "."));
	r.push("In addition to the standard value and sexual assignment advantages, they get bonus");
	r.push(App.Encyclopedia.link("trust", "Trust", "mediumaquamarine"), "on", App.Encyclopedia.link("fucktoy"), "duty.");
	r.toNode("div");

	return f;
}, "slaveQuirks");

App.Encyclopedia.addArticle("Cutting", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push(App.UI.DOM.makeElement("span", "Cutting", ["bold"]), "is a behavioral", App.Encyclopedia.link("quirk", "Quirks"), "developed from the");
	r.push(App.Encyclopedia.link("bitchy"), App.UI.DOM.combineNodes(App.Encyclopedia.link("flaw", "Flaws"), "."));
	r.push("Slaves may naturally become", App.UI.DOM.combineNodes(App.Encyclopedia.link("sadists"), ", and the quirk can also reinforce an existing"), App.UI.DOM.combineNodes(App.Encyclopedia.link("dominance fetish", "Doms"), "."));
	r.push("In addition to the standard value and sexual assignment advantages, they get bonus");
	r.push(App.Encyclopedia.link("devotion", "From Rebellious to Devoted", "hotpink"), "while performing", App.UI.DOM.combineNodes(App.Encyclopedia.link("whoring"), "."));
	r.toNode("div");

	return f;
}, "slaveQuirks");

App.Encyclopedia.addArticle("Fitness", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push(App.UI.DOM.makeElement("span", "Fitness", ["bold"]), "is a behavioral", App.Encyclopedia.link("quirk", "Quirks"), "developed from the");
	r.push(App.Encyclopedia.link("gluttonous"), App.UI.DOM.combineNodes(App.Encyclopedia.link("flaw", "Flaws"), "."));
	r.push("In addition to the standard value and sexual assignment advantages, they gain additional sex drive each week, and are better at working out.");
	r.toNode("div");

	return f;
}, "slaveQuirks");

App.Encyclopedia.addArticle("Funny", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push(App.UI.DOM.makeElement("span", "Funny", ["bold"]), "is a behavioral", App.Encyclopedia.link("quirk", "Quirks"), "developed from the");
	r.push(App.Encyclopedia.link("odd"), App.UI.DOM.combineNodes(App.Encyclopedia.link("flaw", "Flaws"), "."));
	r.push("Slaves may naturally become", App.UI.DOM.combineNodes(App.Encyclopedia.link("masochists"), "."));
	r.push("In addition to the standard value and sexual assignment advantages, they get bonus");
	r.push(App.Encyclopedia.link("devotion", "From Rebellious to Devoted", "hotpink"), "while performing", App.UI.DOM.combineNodes(App.Encyclopedia.link("public service", "Public Service"), "."));
	r.toNode("div");

	return f;
}, "slaveQuirks");

App.Encyclopedia.addArticle("Insecure", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push(App.UI.DOM.makeElement("span", "Insecure", ["bold"]), "is a behavioral", App.Encyclopedia.link("quirk", "Quirks"), "developed from the");
	r.push(App.Encyclopedia.link("anorexic"), App.UI.DOM.combineNodes(App.Encyclopedia.link("flaw", "Flaws"), "."));
	r.push("Slaves may naturally become", App.UI.DOM.combineNodes(App.Encyclopedia.link("submissive", "Submissives"), "."));
	r.push("In addition to the standard value and sexual assignment advantages, they get bonus", App.Encyclopedia.link("trust", "Trust", "mediumaquamarine"), "on", App.Encyclopedia.link("fucktoy"), "duty.");
	r.toNode("div");

	return f;
}, "slaveQuirks");

App.Encyclopedia.addArticle("Sinful", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push(App.UI.DOM.makeElement("span", "Sinful", ["bold"]), "is a behavioral", App.Encyclopedia.link("quirk", "Quirks"), "developed from the");
	r.push(App.Encyclopedia.link("devout"), App.UI.DOM.combineNodes(App.Encyclopedia.link("flaw", "Flaws"), "."));
	r.push("Slaves may naturally become", App.UI.DOM.combineNodes(App.Encyclopedia.link("humiliation fetishists", "Humiliation Fetishists"), "."));
	r.push("In addition to the standard value and sexual assignment advantages, they get bonus", App.Encyclopedia.link("devotion", "From Rebellious to Devoted", "hotpink"), "when in incestuous relationships and while performing", App.UI.DOM.combineNodes(App.Encyclopedia.link("whoring"), "."));
	r.toNode("div");

	return f;
}, "slaveQuirks");

App.Encyclopedia.addArticle("Caring", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push(App.UI.DOM.makeElement("span", "Caring", ["bold"]), "is a sexual", App.Encyclopedia.link("quirk", "Quirks"), "developed from the");
	r.push(App.Encyclopedia.link("apathetic"), App.UI.DOM.combineNodes(App.Encyclopedia.link("flaw", "Flaws"), "."));
	r.push("Slaves may naturally become", App.UI.DOM.combineNodes(App.Encyclopedia.link("submissive", "Submissives"), "."));
	r.push("In addition to the standard value and sexual assignment advantages, they get bonus");
	r.push(App.Encyclopedia.link("devotion", "From Rebellious to Devoted", "hotpink"), "while performing");
	r.push(App.Encyclopedia.link("whoring"), "and nannying.");
	r.toNode("div");

	return f;
}, "slaveQuirks");

App.Encyclopedia.addArticle("Gagfuck Queen", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push(App.UI.DOM.makeElement("span", "Gagfuck Queen", ["bold"]), "is a sexual", App.Encyclopedia.link("quirk", "Quirks"), "developed from the");
	r.push(App.Encyclopedia.link("hates oral"), App.UI.DOM.combineNodes(App.Encyclopedia.link("flaw", "Flaws"), "."));
	r.push("Slaves may naturally become", App.UI.DOM.combineNodes(App.Encyclopedia.link("cumsluts"), "."));
	r.push("In addition to the standard value and sexual assignment advantages, they enjoy living in a penthouse upgraded with phallic food dispensers.");
	r.toNode("div");

	return f;
}, "slaveQuirks");

App.Encyclopedia.addArticle("Painal Queen", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push(App.UI.DOM.makeElement("span", "Painal Queen", ["bold"]), "is a sexual", App.Encyclopedia.link("quirk", "Quirks"), "developed from the");
	r.push(App.Encyclopedia.link("hates anal"), App.UI.DOM.combineNodes(App.Encyclopedia.link("flaw", "Flaws"), "."));
	r.push("Slaves may naturally become", App.UI.DOM.combineNodes(App.Encyclopedia.link("buttsluts"), "."));
	r.push("In addition to the standard value and sexual assignment advantages, they enjoy living in a penthouse upgraded with dildo drug dispensers.");
	r.toNode("div");

	return f;
}, "slaveQuirks");

App.Encyclopedia.addArticle("Perverted", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push(App.UI.DOM.makeElement("span", "Perverted", ["bold"]), "is a sexual", App.Encyclopedia.link("quirk", "Quirks"), "developed from the");
	r.push(App.Encyclopedia.link("repressed"), App.UI.DOM.combineNodes(App.Encyclopedia.link("flaw", "Flaws"), "."));
	r.push("Slaves may naturally become", App.UI.DOM.combineNodes(App.UI.DOM.combineNodes(App.Encyclopedia.link("humiliation fetishists", "Humiliation Fetishists"), ".")));
	r.push("In addition to the standard value and sexual assignment advantages, they get bonus");
	r.push(App.Encyclopedia.link("devotion", "From Rebellious to Devoted", "hotpink"), "when in incestuous relationships, and gain additional sex drive each week.");
	r.toNode("div");

	return f;
}, "slaveQuirks");

App.Encyclopedia.addArticle("Romantic", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push(App.UI.DOM.makeElement("span", "Romantic", ["bold"]), "is a sexual", App.Encyclopedia.link("quirk", "Quirks"), "developed from the");
	r.push(App.Encyclopedia.link("idealistic"), App.UI.DOM.combineNodes(App.Encyclopedia.link("flaw", "Flaws"), "."));
	r.push("Slaves may naturally become", App.UI.DOM.combineNodes(App.Encyclopedia.link("pregnancy fetishists", "Pregnancy Fetishists"), "."));
	r.push("In addition to the standard value and sexual assignment advantages, they get bonus");
	r.push(App.Encyclopedia.link("trust", "Trust", "mediumaquamarine"), "on", App.Encyclopedia.link("fucktoy"), "duty.");
	r.toNode("div");

	return f;
}, "slaveQuirks");

App.Encyclopedia.addArticle("Size Queen", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push(App.UI.DOM.makeElement("span", "Size Queen", ["bold"]), "is a sexual", App.Encyclopedia.link("quirk", "Quirks"), "developed from the");
	r.push(App.Encyclopedia.link("judgemental"), App.UI.DOM.combineNodes(App.Encyclopedia.link("flaw", "Flaws"), "."));
	r.push("Slaves may naturally become", App.UI.DOM.combineNodes(App.Encyclopedia.link("buttsluts"), "."));
	r.push("In addition to the standard value and sexual assignment advantages, they will enjoy relationships with well-endowed, virile slaves so much their partners will get");
	r.push(App.Encyclopedia.link("devotion", "From Rebellious to Devoted", "hotpink"), "benefits, too.");
	r.toNode("div");

	return f;
}, "slaveQuirks");

App.Encyclopedia.addArticle("Strugglefuck Queen", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push(App.UI.DOM.makeElement("span", "Strugglefuck Queen", ["bold"]), "is a sexual", App.Encyclopedia.link("quirk", "Quirks"), "developed from the");
	r.push(App.Encyclopedia.link("hates penetration"), App.UI.DOM.combineNodes(App.Encyclopedia.link("flaw", "Flaws"), "."));
	r.push("Slaves may naturally become", App.UI.DOM.combineNodes(App.Encyclopedia.link("masochists"), "."));
	r.push("In addition to the standard value and sexual assignment advantages, this Quirk avoids");
	r.push(App.Encyclopedia.link("devotion", "From Rebellious to Devoted", "hotpink"), "losses if the slave is assigned to be a");
	r.push(App.UI.DOM.combineNodes(App.Encyclopedia.link("sexual servant", "Sexual Servitude"), "."));
	r.toNode("div");

	return f;
}, "slaveQuirks");

App.Encyclopedia.addArticle("Tease", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push(App.UI.DOM.makeElement("span", "Tease", ["bold"]), "is a sexual", App.Encyclopedia.link("quirk", "Quirks"), "developed from the");
	r.push(App.Encyclopedia.link("shamefast"), App.UI.DOM.combineNodes(App.Encyclopedia.link("flaw", "Flaws"), "."));
	r.push("Slaves may naturally become", App.UI.DOM.combineNodes(App.Encyclopedia.link("humiliation fetishists", "Humiliation Fetishists"), "."));
	r.push("In addition to the standard value and sexual assignment advantages, they get bonus");
	r.push(App.Encyclopedia.link("devotion", "From Rebellious to Devoted", "hotpink"), "while performing");
	r.push(App.UI.DOM.combineNodes(App.Encyclopedia.link("public service", "Public Service"), "."));
	r.toNode("div");

	return f;
}, "slaveQuirks");

App.Encyclopedia.addArticle("Unflinching", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push(App.UI.DOM.makeElement("span", "Unflinching", ["bold"]), "is a sexual", App.Encyclopedia.link("quirk", "Quirks"), "developed from the");
	r.push(App.Encyclopedia.link("crude"), App.UI.DOM.combineNodes(App.Encyclopedia.link("flaw", "Flaws"), "."));
	r.push("Slaves may naturally become", App.UI.DOM.combineNodes(App.Encyclopedia.link("masochists"), "."));
	r.push("In addition to the standard value and sexual assignment advantages, they will experience a partial rebound during weeks in which they lose");
	r.push(App.Encyclopedia.link("devotion.", "From Rebellious to Devoted", "hotpink"));
	r.toNode("div");

	return f;
}, "slaveQuirks");

App.Encyclopedia.addCategory("slaveQuirks", function() {
	const f = new DocumentFragment();
	let r = [];
	r.push(App.Encyclopedia.link("Adores men"));
	r.push(App.Encyclopedia.link("Adores women"));
	r.push(App.Encyclopedia.link("Advocate"));
	r.push(App.Encyclopedia.link("Confident"));
	r.push(App.Encyclopedia.link("Cutting"));
	r.push(App.Encyclopedia.link("Fitness"));
	r.push(App.Encyclopedia.link("Funny"));
	r.push(App.Encyclopedia.link("Insecure"));
	r.push(App.Encyclopedia.link("Sinful"));
	App.Events.addNode(f, ["Behavioral ", App.UI.DOM.combineNodes(App.Encyclopedia.link("Quirks"), ":"), App.UI.DOM.generateLinksStrip(r)], "div");

	r = [];
	r.push(App.Encyclopedia.link("Caring"));
	r.push(App.Encyclopedia.link("Gagfuck Queen"));
	r.push(App.Encyclopedia.link("Painal Queen"));
	r.push(App.Encyclopedia.link("Perverted"));
	r.push(App.Encyclopedia.link("Romantic"));
	r.push(App.Encyclopedia.link("Size Queen"));
	r.push(App.Encyclopedia.link("Strugglefuck Queen"));
	r.push(App.Encyclopedia.link("Tease"));
	r.push(App.Encyclopedia.link("Unflinching"));
	App.Events.addNode(f, ["Sexual ", App.UI.DOM.combineNodes(App.Encyclopedia.link("Quirks"), ":"), App.UI.DOM.generateLinksStrip(r)], "div");

	return f;
});
