App.Encyclopedia.addArticle("Slave Modification", function() {
	const t = new DocumentFragment();
	const r = new SpacedTextAccumulator(t);
	r.push("What would a slaveowner be without the ability to customize their slaves' bodies?");
	r.push("The Free Cities offer a variety of ways to achieve this for an arcology owner.");
	r.push("Choose a more particular entry below:");
	r.toNode("div");
	return t;
}, "slaveModification");

App.Encyclopedia.addArticle("Corrective Diet", function() {
	return App.UI.DOM.makeElement("div", "Using the upgraded kitchen to monitor a slave's caloric intake allows for diets to be tailored to slowly increase or decrease their weight without them realizing.");
}, "slaveModification");

App.Encyclopedia.addArticle("Nipple Conversion — Penetratable", function() {
	const t = new DocumentFragment();
	const r = new SpacedTextAccumulator(t);
	r.push("By taking extremely large nipples and inverting them into an adequately sized breast, it is possible to use an advanced surgical suite to create a cavity suitable for penetration.");
	r.push("Early attempts found that the novelty of fucking a tit did not offset the discomfort of ramming one's dick into a solid object and as such, the surgery is only applicable to slaves with at least 500ccs of breast tissue per boob.");
	r.push("Milk production is unhindered by the alterations, though non-machine milking is far more difficult without a nipple to grab and it is unlikely to be able to properly nourish a child.");
	r.push("Arousal is also expressed differently, as the nipple cannot stiffen any longer; instead, engorgement causes the newly crafted passage to tighten, adding to the pleasure of using the unorthodox hole.");
	r.push("While looseness is no issue, and the orifice quite capable of stretching around an intruding shaft, depth can become a problem; even the most average of slaveowners will find themselves bottoming out far sooner than they would like.");
	r.push("Fortunately, this downside is offset by the novelty of the act and the capacity to push the nipple itself deeper into the slave's breast to better accommodate one's cock.");
	r.push("In this case, bigger really is better.");
	r.toNode("div");
	return t;
}, "slaveModification");

App.Encyclopedia.addArticle("Ejaculation Boosting Prostate Implant", function() {
	const t = new DocumentFragment();
	const r = new SpacedTextAccumulator(t);
	r.push("An additional prostate implant designed to hyperstimulate one's prostate and store the resulting fluid for release during ejaculation in a specialized reservoir.");
	r.push("An easy way to tell if the precum soaked slave you are fucking is sporting this implant is the distinct swelling in her lower belly as she nears release.");
	r.push("Due to the sheer amount of prostate fluid released, sperm per volume is greatly reduced, devastating profits of those looking to sell cum.");
	r.push("Remember to keep your slaves well hydrated!");
	r.toNode("div");
	return t;
}, "slaveModification");

App.Encyclopedia.addCategory("slaveModification", function(currentArticle) {
	const links = [];
	if (currentArticle !== "Slave Modification") {
		links.push(App.Encyclopedia.link("Slave Modification"));
	}
	links.push(App.Encyclopedia.link("Corrective Diet"));
	links.push(App.Encyclopedia.link("Nipple Conversion — Penetratable"));
	links.push(App.Encyclopedia.link("Ejaculation Boosting Prostate Implant"));
	return App.UI.DOM.generateLinksStrip(links);
});
