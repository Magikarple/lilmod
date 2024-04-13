App.Encyclopedia.addArticle("Skills", function() {
	const t = new DocumentFragment();
	App.Events.addNode(t, [App.UI.DOM.makeElement("span", "Future room for lore text", ["note"])], "div");
	App.Events.addNode(t, ["Choose a more particular entry below:"], "div");
	return t;
}, "SlaveSkills");

App.Encyclopedia.addArticle("Anal Skill", function() {
	const t = new DocumentFragment();
	App.Events.addNode(t, [
		App.UI.DOM.makeElement("span", "Anal skill", ["bold"]), "improves performance on sexual assignments and is available in three levels.",
		"Training methods include schooling (up to level one), plugs (up to level one), personal attention (unlimited), Head Girl attention (up to the Head Girl's skill), and on the job experience (unlimited).",
		App.Encyclopedia.link("Anus", "Anuses"), "surgery can reduce this skill."
	], "div");
	return t;
}, "SlaveSkills");

App.Encyclopedia.addArticle("Combat Skill", function() {
	const r = new SpacedTextAccumulator();
	r.push(App.UI.DOM.makeElement("span", "Combat skill", ["bold"]), "is a slaves combat experience and schooling.",
		"It can be roughly split into three stages.",
		"The first stage is basic skill in hand-to-hand combat as well as common melee and ranged weapons usage.", // 0-30
		"The second stage is high skill in common weapons and their maintenance as well as basic skill in exotic weaponry. It also includes basic skill in protection tasks and group combat ability.", // 31-60
		"The last stage perfects the slaves usage of all weaponry and refines their tactical abilities.", // 61-100
	);
	r.toParagraph();
	r.push("It improves performance in lethal and nonlethal pit fights and performance as the Bodyguard.",
		"Training methods are limited to on the job experience (including pit fights), successor training and events.",
		"Only your bodyguard with their constant training can reach the last stage.");
	r.toParagraph();
	return r.container();
}, "SlaveSkills");

App.Encyclopedia.addArticle("Entertainment Skill", function() {
	const t = new DocumentFragment();
	App.Events.addNode(t, [
		App.UI.DOM.makeElement("span", "Entertainment skill", ["bold"]), "is available in three levels.",
		"It improves performance on all sexual assignments, though it affects public service or working in the club most.",
		"Training methods include schooling (up to level one), personal attention (up to level one), Head Girl attention (up to the Head Girl's skill), and on the job experience (unlimited)."
	], "div");
	return t;
}, "SlaveSkills");

App.Encyclopedia.addArticle("Oral Skill", function() {
	const t = new DocumentFragment();
	App.Events.addNode(t, [
		App.UI.DOM.makeElement("span", "Oral skill", ["bold"]), "improves performance on sexual assignments and is available in three levels.",
		"Training methods include schooling (up to level one), gags (up to level one), personal attention (unlimited), Head Girl attention (up to the Head Girl's skill), and on the job experience (unlimited).",
		App.Encyclopedia.link("Lip", "Lips"), "surgery can reduce this skill."
	], "div");
	return t;
}, "SlaveSkills");

App.Encyclopedia.addArticle("Vaginal Skill", function() {
	const t = new DocumentFragment();
	App.Events.addNode(t, [
		App.UI.DOM.makeElement("span", "Vaginal skill", ["bold"]), "improves performance on sexual assignments and is available in three levels.",
		"Training methods include schooling (up to level one), plugs (up to level one), personal attention (unlimited), Head Girl attention (up to the Head Girl's skill), and on the job experience (unlimited).",
		"Slaves without vaginas cannot learn or teach this skill, limiting their ultimate skill ceiling.",
		App.Encyclopedia.link("Vagina", "Vaginas"), "surgery can reduce this skill."
	], "div");
	return t;
}, "SlaveSkills");

App.Encyclopedia.addArticle("Whoring Skill", function() {
	const t = new DocumentFragment();
	App.Events.addNode(t, [
		App.UI.DOM.makeElement("span", "Whoring skill", ["bold"]), "is available in three levels.",
		"It improves performance on all sexual assignments, though it affects whoring or working in the brothel most.",
		"Training methods include schooling (up to level one), personal attention (up to level one), Head Girl attention (up to the Head Girl's skill), and on the job experience (unlimited)."
	], "div");
	return t;
}, "SlaveSkills");

App.Encyclopedia.addCategory("SlaveSkills", function() {
	const r = [];
	r.push(App.Encyclopedia.link("Skills"));
	r.push(App.Encyclopedia.link("Anal Skill"));
	r.push(App.Encyclopedia.link("Combat Skill"));
	r.push(App.Encyclopedia.link("Entertainment Skill"));
	r.push(App.Encyclopedia.link("Oral Skill"));
	r.push(App.Encyclopedia.link("Vaginal Skill"));
	r.push(App.Encyclopedia.link("Whoring Skill"));
	r.push(App.Encyclopedia.link("Career Experience"));
	return App.UI.DOM.generateLinksStrip(r);
});
