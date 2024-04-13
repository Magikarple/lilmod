App.Encyclopedia.addArticle("Relationships", function() {
	const t = new DocumentFragment();
	App.Events.addNode(t, [
		"Slaves can develop many different", App.UI.DOM.makeElement("span", "relationships", ["bold"]), "as they become accustomed to their lives, which offer many benefits and some downsides.",
		"It is possible for the player to push slaves towards one kind of relationship or another, but slaves' feelings are less susceptible to complete control than their bodies.",
		"All relationships in Free Cities are one-to-one, which is a limitation imposed by Twine."
	], "div");
	return t;
}, "SlaveRelationships");

App.Encyclopedia.addArticle("Rivalries", function() {
	const t = new DocumentFragment();
	App.Events.addNode(t, [
		App.UI.DOM.makeElement("span", "Rivalries", ["bold"]), "tend to arise naturally between slaves on the same assignment.",
		"Slaves may enjoy rivals' misfortunes, but bickering on the job between rivals will impede performance if the rivals remain on the same assignment.",
		"Rivals will also dislike working with each other.",
		"Rivalries may be defused naturally with time apart, or suppressed by rules.",
		"Rivalries impede the formation of", App.Encyclopedia.link("romances"), ", but a romance can defuse a rivalry."
	], "div");
	return t;
}, "SlaveRelationships");

App.Encyclopedia.addArticle("Romances", function() {
	const t = new DocumentFragment();
	App.Events.addNode(t, [
		App.UI.DOM.makeElement("span", "Romances", ["bold"]), "tend to arise naturally between slaves on the same assignment, and between slaves having a lot of sex with each other.",
		"Slaves will be saddened by their romantic partners' misfortunes, but will do better on public sexual assignments if assigned to work at the same job as a romantic partner.",
		"Slaves will also derive various mental effects from being in a relationship: they can rely on each other, take solace in each other's company, and even learn fetishes from each other.",
		"Romances can be suppressed by the rules, or fall apart naturally.",
		"On the other hand, romances can develop from friendships, to best friendships, to friendships with benefits, to loving relationships.",
		"Romances impede the formation of", App.Encyclopedia.link("rivalries"), "and can defuse them.",
		"Once a romance has advanced to where the slaves are lovers, its members are eligible for several events in which the couple can be", App.Encyclopedia.link("married.", "Slave Marriages")
	], "div");
	return t;
}, "SlaveRelationships");

App.Encyclopedia.addArticle("Emotionally Bonded", function() {
	const devotion = (text) => App.Encyclopedia.link(text, "From Rebellious to Devoted", "hotpink");
	const trust = (text) => App.Encyclopedia.link(text, "Trust", "mediumaquamarine");
	const t = new DocumentFragment();
	App.Events.addNode(t, [
		App.UI.DOM.makeElement("span", "Emotionally Bonded", ["bold"]), "slaves have become so", devotion("devoted"), "to the player character that they define their own happiness mostly in terms of pleasing the PC.",
		"Slaves may become emotionally bonded if they become perfectly", devotion("devoted"), "and", trust("trusting"), "without being part of a", App.Encyclopedia.link("romance.", "Romances"),
		"They receive powerful mental benefits — in fact, they are likely to accept anything short of sustained intentional abuse without lasting displeasure — and perform better at the",
		App.Encyclopedia.link("servitude"), "and", App.Encyclopedia.link("fucktoy"), "assignments.",
		"The most reliable way of ensuring a slave's development of emotional bonds is to have her assigned as a fucktoy or to the",
		App.Encyclopedia.link("Master suite"), "as she becomes perfectly", devotion("devoted"), "and", trust("trusting.")
	], "div");
	return t;
}, "SlaveRelationships");

App.Encyclopedia.addArticle("Emotional Slut", function() {
	const devotion = (text) => App.Encyclopedia.link(text, "From Rebellious to Devoted", "hotpink");
	const trust = (text) => App.Encyclopedia.link(text, "Trust", "mediumaquamarine");
	const t = new DocumentFragment();
	App.Events.addNode(t, [
		App.UI.DOM.makeElement("span", "Emotional sluts", ["bold"]), "are slaves who have lost track of normal human emotional attachments, seeing sex as the only real closeness.",
		"Slaves may become emotional sluts if they become perfectly", devotion("devoted"), "and", trust("trusting"), "without being part of a", App.Encyclopedia.link("romance.", "Romances"),
		"They receive powerful mental benefits, though they will be disappointed if they are not on assignments that allow them to be massively promiscuous, and perform better at the", App.Encyclopedia.link("whoring"), "and", App.Encyclopedia.link("public service", "Public Service"), "assignments.",
		"The most reliable way of ensuring a slave's development into an emotional slut is to have her assigned as a public servant or to the", App.Encyclopedia.link("Club"), "as she becomes perfectly", devotion("devoted"), "and", trust("trusting"), "."
	], "div");
	return t;
}, "SlaveRelationships");

App.Encyclopedia.addArticle("Slave Marriages", function() {
	const t = new DocumentFragment();
	App.Events.addNode(t, [
		App.UI.DOM.makeElement("span", "Slave Marriages", ["bold"]), "take place between two slaves.",
		"Several random events provide the opportunity to marry slave lovers. Slave Marriages function as an end state for slave",
		App.Encyclopedia.link("romances"), ";", "slave wives receive the best relationship bonuses, and can generally be depended upon to help each other be good slaves in various ways. The alternative end states for slaves' emotional attachments are the",
		App.Encyclopedia.link("emotional slut", "Emotional Slut"), "and", App.Encyclopedia.link("emotionally bonded", "Emotionally Bonded"), "statuses, both of which are for a single slave alone."
	], "div");
	return t;
}, "SlaveRelationships");

App.Encyclopedia.addArticle("Slaveowner Marriages", function() {
	const t = new DocumentFragment();
	App.Events.addNode(t, [
		App.UI.DOM.makeElement("span", "Slaveowner Marriages", ["bold"]), ", marriages between a", App.Encyclopedia.link("devoted", "From Rebellious to Devoted", "hotpink"), "slave and the player character, require passage of a slaveowner marriage policy unlocked by advanced", App.Encyclopedia.link("paternalism"), ". Once this policy is in place,",
		App.Encyclopedia.link("emotionally bonded", "Emotionally Bonded"), "slaves can be married.",
		"There is no limit to the number of slaves a paternalist player character can marry.",
		"Marriage to the player character functions as a direct upgrade to being emotionally bonded."
	], "div");
	return t;
}, "SlaveRelationships");

App.Encyclopedia.addCategory("SlaveRelationships", function() {
	const r = [];
	r.push(App.Encyclopedia.link("Relationships"));
	r.push(App.Encyclopedia.link("Rivalries"));
	r.push(App.Encyclopedia.link("Romances"));
	r.push(App.Encyclopedia.link("Emotionally Bonded"));
	r.push(App.Encyclopedia.link("Emotional Slut"));
	r.push(App.Encyclopedia.link("Slave Marriages"));
	r.push(App.Encyclopedia.link("Slaveowner Marriages"));
	return App.UI.DOM.generateLinksStrip(r);
});
