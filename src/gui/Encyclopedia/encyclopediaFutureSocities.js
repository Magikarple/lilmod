App.Encyclopedia.addArticle("Future Societies", function() {
	const t = new DocumentFragment();
	App.Events.addNode(t, ["The evolution of society has never been linear.",
		"Times of unrest and upheaval produce rapid change, followed by long periods of stasis in the absence of the necessary ingredients for further change.",
		"The world is undoubtedly in the midst of a time of great change: society is certainly evolving. But into what?"], "div", ["note"]);

	App.Events.addNode(t, ["Not since antiquity have single persons held as much practical power over the direction of society as Free Cities arcology owners now have.",
		"Naturally, different Free Cities notables are going different ways with their great power.",
		"Many are building new societies as different from each other as they are from the old world."], "div", ["note"]);

	App.Events.addNode(t, ["One arcology might hold a society that is moving towards a fundamentalist interpretation of an old slaveholding religious tradition.",
		"Another might pay homage to historical racially segregated societies.",
		"A third might see intentional manipulation of gender roles that have held since the start of recorded history.",
		"And these three arcologies might well be each other's neighbors."], "div", ["note"]);

	App.Encyclopedia.addArticleSource(t, "Guide to Modern Slavery, Online Edition. Accessed April 2, 2032", "Lawrence, W. G.");

	App.Events.addNode(t, [
		App.UI.DOM.makeElement("span", "Future Society Models", ["bold"]), `are societal goals the player can select and pursue for the arcology.",
		"It is possible to maintain four future society goals at once.",
		"The first is unlocked after week 5 for players with greater than rumored/${num(3000)}`,
		App.Encyclopedia.link("reputation", "Arcologies and Reputation", "green"),
		"or at game start with the Social Engineering character option; the rest unlock as the player achieves higher",
		App.Encyclopedia.link("reputation", "Arcologies and Reputation", "green"), "levels."], "p");

	App.Events.addNode(t, ["All societies approve of specific things, usually slaves with specific characteristics; some societies also have dislikes.",
		"All societies are advanced by the things they approve of and slowed by the things they disapprove of, and all societies give and take",
		App.Encyclopedia.link("reputation", "Arcologies and Reputation", "green"), "when approving and disapproving.",
		"All societies unlock unique events, arcology upgrades, and slave behaviors; some even unlock special clothing."], "p");

	App.Events.addNode(t, [App.Encyclopedia.link("Money", "Money", "yellowgreen"),
		"can be expended to directly advance future societies; the spending level can be set from the future society submenu of the arcology management menu.",
		"These funds are automatically spent each week.",
		"Once a future society is fully adopted (as noted on the future society submenu), this spending does not advance the society further.",
		"However, it can provide a guarantee against loss of progress should the player do something the society strongly disapproves of.",
		"Also, the spending is applied equally to all active future society models, meaning that there is no loss of efficiency in spending if the player has two maximized models and one still under development."], "p");
	return t;
}, "FutureSocieties");

App.Encyclopedia.addArticle("Ethnic Supremacy", function() {
	const t = new DocumentFragment();
	App.Events.addNode(t, [App.UI.DOM.makeElement("span", "Ethnic Supremacy", ["bold"]),
		"is a future society model which approves of",
		"slaves not of the chosen race and disapproves of slaves of the chosen race."], "div");
	App.Events.addNode(t, ["Improves the perceived beauty of racially superior slaves."], "div", ["indent"]);
	App.Events.addNode(t, ["Drastically lowers the desire of racially superior slaves."], "div", ["indent"]);
	App.Events.addNode(t, ["Can be developed to affect the ethnic balance and economics seen in the slave market."], "div", ["indent"]);
	App.Events.addNode(t, ["Provides demand for slaves of inferior races from",
		App.UI.DOM.combineNodes(App.Encyclopedia.link("The Corporation"), ".")]);
	return t;
}, "FutureSocieties");

App.Encyclopedia.addArticle("Ethnic Subjugationism", function() {
	const t = new DocumentFragment();
	App.Events.addNode(t, [App.UI.DOM.makeElement("span", "Ethnic Subjugationism", ["bold"]),
		"is a future society model which approves of slaves of the chosen race."], "div");
	App.Events.addNode(t, ["Reduces the perceived beauty of racially inferior slaves."], "div", ["indent"]);
	App.Events.addNode(t, ["Drastically increases the desire to use racially inferior slaves."], "div", ["indent"]);
	App.Events.addNode(t, ["Provides demand for slaves of the disfavored race from",
		App.UI.DOM.combineNodes(App.Encyclopedia.link("The Corporation"), ".")]);
	return t;
}, "FutureSocieties");

App.Encyclopedia.addArticle("Gender Radicalism", function() {
	const t = new DocumentFragment();
	App.Events.addNode(t, [App.UI.DOM.makeElement("span", "Gender Radicalism", ["bold"]),
		"is a future society model which approves of",
		"hormonal and surgical feminization and slaves with dicks."], "div");
	App.Events.addNode(t, ["Improves the value of slaves with dicks and slaves with balls."], "div", ["indent"]);
	App.Events.addNode(t, ["Can be developed to affect the biology seen in the slave market, and subtly influence arcology society."], "div", ["indent"]);
	App.Events.addNode(t, [`Provides demand for; slaves with dicks, hormonally treated slaves and futanari${V.seeDicks !== 0 ? ' and ballsless bitches' : ''} from`,
		App.UI.DOM.combineNodes(App.Encyclopedia.link("The Corporation"), ".")]);
	App.Events.addNode(t, ["Mutually exclusive with",
		App.UI.DOM.combineNodes(App.Encyclopedia.link("Gender Fundamentalism"), ".")]);
	return t;
}, "FutureSocieties");

App.Encyclopedia.addArticle("Gender Fundamentalism", function() {
	const t = new DocumentFragment();
	App.Events.addNode(t, [App.UI.DOM.makeElement("span", "Gender Fundamentalism", ["bold"]),
		"is a future society model which approves of",
		"pregnancy and fertility and disapproves of slaves who retain testicles."], "div");
	App.Events.addNode(t, ["Reduces the slave value penalty due to pregnancy and reduces the beauty of slaves with dicks, though gelding can ameliorate this."], "div", ["indent"]);
	App.Events.addNode(t, ["Like Gender Radicalism, can be developed to affect the biology seen in the slave market, and subtly influence arcology society."], "div", ["indent"]);
	App.Events.addNode(t, ["Provides demand for naturally female slaves from",
		App.UI.DOM.combineNodes(App.Encyclopedia.link("The Corporation"), ".")]);
	App.Events.addNode(t, ["Mutually exclusive with",
		App.UI.DOM.combineNodes(App.Encyclopedia.link("Gender Radicalism"), ".")]);
	return t;
}, "FutureSocieties");

App.Encyclopedia.addArticle("Paternalism", function() {
	const t = new DocumentFragment();
	const devotion = (text = "devotion", colour = "hotpink") => App.Encyclopedia.link(text, "From Rebellious to Devoted", colour);
	const PaternalismApproval = [devotion(), "slaves choosing their own assignments", "good education",
		"mental health treatment", App.Encyclopedia.link("high health", "Health")];

	App.Events.addNode(t, [App.UI.DOM.makeElement("span", "Paternalism", ["bold"]),
		"is a future society model which approves of", App.UI.DOM.toSentence(PaternalismApproval),
		"while stupidity and undereducation is disapproved."], "div");
	App.Events.addNode(t, ["Applies a small", devotion(),
		"boost to all slaves and increases fines paid by citizens who injure whores and public servants."], "div", ["indent"]);
	App.Events.addNode(t, ["Increases the", App.Encyclopedia.link("reputation", "Arcologies and Reputation", "green"),
		"penalty for operating an arcade."], "div", ["indent"]);
	App.Events.addNode(t, ["Slows increases in the ratio of slaves to citizens."], "div", ["indent"]);
	App.Events.addNode(t, ["Can be developed to build a",
		App.Encyclopedia.link("trusting", "Trust", "mediumaquamarine"),
		"society that welcomes new slaves."], "div", ["indent"]);
	App.Events.addNode(t, ["Provides demand for careful slave breaking and gentle cosmetic surgeries from",
		App.UI.DOM.combineNodes(App.Encyclopedia.link("The Corporation"), ".")]);
	App.Events.addNode(t, ["Mutually exclusive with",
		App.UI.DOM.combineNodes(App.Encyclopedia.link("Degradationism"), ".")]);
	return t;
}, "FutureSocieties");

App.Encyclopedia.addArticle("Degradationism", function() {
	const t = new DocumentFragment();
	App.Events.addNode(t, [App.UI.DOM.makeElement("span", "Degradationism", ["bold"]),
		"is a future society model which approves of",
		"frightened or mindbroken slaves, glory holes, the arcade, and heavy tattoos and piercings;",
		"it disapproves of", App.Encyclopedia.link("trusting", "Trust", "mediumaquamarine"),
		"(except for the Head Girl and Recruiter) and slaves choosing their own assignments."], "div");
	App.Events.addNode(t, ["Makes intelligent slaves less attractive and stupid slaves more attractive."], "div", ["indent"]);
	App.Events.addNode(t, ["Can apply unique names to slaves."], "div", ["indent"]);
	App.Events.addNode(t, ["Drives an increase in the ratio of slaves to citizens."], "div", ["indent"]);
	App.Events.addNode(t, ["Eliminates the", App.Encyclopedia.link("reputation", "Arcologies and Reputation", "green"),
		"penalty for operating an arcade along with fining citizens who injure whores and public servants."], "div", ["indent"]);
	App.Events.addNode(t, ["Can be developed to increase demand for glory holes and arcades."], "div", ["indent"]);
	App.Events.addNode(t, ["Provides demand for: brutal slave breaking, stupid slaves and cruelly altered slaves from the",
		App.UI.DOM.combineNodes(App.Encyclopedia.link("The Corporation"), ".")]);
	App.Events.addNode(t, ["Mutually exclusive with",
		App.UI.DOM.combineNodes(App.Encyclopedia.link("Paternalism"), ".")]);
	return t;
}, "FutureSocieties");

App.Encyclopedia.addArticle("Body Purism", function() {
	const t = new DocumentFragment();
	App.Events.addNode(t, [App.UI.DOM.makeElement("span", "Body Purism", ["bold"]),
		"is a future society model which approves of",
		"unimplanted slaves and no heavy tattoos or piercings; disapproves of implants."], "div");
	App.Events.addNode(t, ["Improves value of slaves without implants."], "div", ["indent"]);
	App.Events.addNode(t, ["Can be developed to affect goods seen in the slave market and work towards a solution to the long term effects of drug use."], "div", ["indent"]);
	App.Events.addNode(t, ["Provides demand for slaves without implants from",
		App.UI.DOM.combineNodes(App.Encyclopedia.link("The Corporation"), ".")]);
	App.Events.addNode(t, ["Mutually exclusive with",
		App.UI.DOM.combineNodes(App.Encyclopedia.link("Transformation Fetishism"), ".")]);
	return t;
}, "FutureSocieties");

App.Encyclopedia.addArticle("Transformation Fetishism", function() {
	const t = new DocumentFragment();
	App.Events.addNode(t, [App.UI.DOM.makeElement("span", "Transformation Fetishism", ["bold"]),
		"is a future society model which approves of",
		"implants and extreme surgery; disapproves of slaves without implants."], "div");
	App.Events.addNode(t, ["Reduces value of slaves without implants."], "div", ["indent"]);
	App.Events.addNode(t, ["Can be developed to radically affect goods seen in the slave market."], "div", ["indent"]);
	App.Events.addNode(t, ["Provides demand for slaves with implants from",
		App.UI.DOM.combineNodes(App.Encyclopedia.link("The Corporation"), ".")]);
	App.Events.addNode(t, ["Mutually exclusive with",
		App.UI.DOM.combineNodes(App.Encyclopedia.link("Body Purism"), ".")]);
	return t;
}, "FutureSocieties");

App.Encyclopedia.addArticle("Maturity Preferentialism", function() {
	const t = new DocumentFragment();
	App.Events.addNode(t, [App.UI.DOM.makeElement("span", "Maturity Preferentialism", ["bold"]),
		"is a future society model which approves of older slaves."], "div");
	App.Events.addNode(t, ["Improves value of older slaves, but reduces value of young slaves."], "div", ["indent"]);
	App.Events.addNode(t, ["Will not entirely eliminate the usual preference for younger slaves."], "div", ["indent"]);
	App.Events.addNode(t, ["Can be developed to make it easier for older player characters to maintain",
		App.Encyclopedia.link("reputation", "Arcologies and Reputation", "green"),
		"and advance the arcology's prosperity."], "div", ["indent"]);
	App.Events.addNode(t, ["Provides demand for older slaves from",
		App.UI.DOM.combineNodes(App.Encyclopedia.link("The Corporation"), ".")]);
	App.Events.addNode(t, ["Mutually exclusive with",
		App.UI.DOM.combineNodes(App.Encyclopedia.link("Youth Preferentialism"), ".")]);
	return t;
}, "FutureSocieties");

App.Encyclopedia.addArticle("Youth Preferentialism", function() {
	const t = new DocumentFragment();
	App.Events.addNode(t, [App.UI.DOM.makeElement("span", "Youth Preferentialism", ["bold"]),
		"is a future society model which approves of younger slaves."], "div");
	App.Events.addNode(t, ["Improves value of younger slaves, but reduces value of old slaves."], "div", ["indent"]);
	App.Events.addNode(t, ["Can be developed to make it easier for younger player characters to maintain",
		App.Encyclopedia.link("reputation", "Arcologies and Reputation", "green"),
		"and advance the arcology's prosperity."], "div", ["indent"]);
	App.Events.addNode(t, ["Provides demand for young slaves from",
		App.UI.DOM.combineNodes(App.Encyclopedia.link("The Corporation"), ".")]);
	App.Events.addNode(t, ["Mutually exclusive with",
		App.UI.DOM.combineNodes(App.Encyclopedia.link("Maturity Preferentialism"), ".")]);
	return t;
}, "FutureSocieties");

App.Encyclopedia.addArticle("Slimness Enthusiasm", function() {
	const t = new DocumentFragment();
	App.Events.addNode(t, [App.UI.DOM.makeElement("span", "Slimness Enthusiasm", ["bold"]),
		"is a future society model which approves of",
		"slaves with girlish figures; disapproves of slaves with stacked figures."], "div");
	App.Events.addNode(t, ["Improves value of slim slaves, but reduces value of stacked slaves."], "div", ["indent"]);
	App.Events.addNode(t, ["Can be developed to affect goods seen in the slave market and improve slave health."], "div", ["indent"]);
	App.Events.addNode(t, ["Provides demand for unexpanded slaves at a healthy weight from",
		App.UI.DOM.combineNodes(App.Encyclopedia.link("The Corporation"), ".")]);
	App.Events.addNode(t, ["Mutually exclusive with",
		App.UI.DOM.combineNodes(App.Encyclopedia.link("Asset Expansionism"), ".")]);
	return t;
}, "FutureSocieties");

App.Encyclopedia.addArticle("Asset Expansionism", function() {
	const t = new DocumentFragment();
	App.Events.addNode(t, [App.UI.DOM.makeElement("span", "Asset Expansionism", ["bold"]),
		"is a future society model which approves of slaves with very large body parts."], "div");
	App.Events.addNode(t, ["Improves value of stacked slaves."], "div", ["indent"]);
	App.Events.addNode(t, ["Can be developed to radically affect goods seen in the slave market."], "div", ["indent"]);
	App.Events.addNode(t, ["Provides demand for asset expansion from",
		App.UI.DOM.combineNodes(App.Encyclopedia.link("The Corporation"), ".")]);
	App.Events.addNode(t, ["Mutually exclusive with",
		App.UI.DOM.combineNodes(App.Encyclopedia.link("Slimness Enthusiasm"), ".")]);
	return t;
}, "FutureSocieties");

App.Encyclopedia.addArticle("Pastoralism", function() {
	const t = new DocumentFragment();
	App.Events.addNode(t, [App.UI.DOM.makeElement("span", "Pastoralism", ["bold"]),
		"is a future society model which approves of lactation, cockmilking, and the dairy."], "div");
	App.Events.addNode(t, ["Improves value of milk and semen."], "div", ["indent"]);
	App.Events.addNode(t, ["Drives an increase in the ratio of slaves to citizens."], "div", ["indent"]);
	App.Events.addNode(t, ["Can be developed to massively improve value of milk and semen."], "div", ["indent"]);
	App.Events.addNode(t, ["Provides demand for production focused asset expansion from",
		App.UI.DOM.combineNodes(App.Encyclopedia.link("The Corporation"), ".")]);
	return t;
}, "FutureSocieties");

App.Encyclopedia.addArticle("Physical Idealism", function() {
	const t = new DocumentFragment();
	App.Events.addNode(t, [App.UI.DOM.makeElement("span", "Physical Idealism", ["bold"]),
		"is a future society model which approves of musculature, height, and health."], "div");
	App.Events.addNode(t, ["Improves value of slaves with",
		App.UI.DOM.combineNodes(App.Encyclopedia.link("muscles", "Musculature"), ".")]);
	App.Events.addNode(t, ["Can be developed to affect goods seen in the slave market."], "div", ["indent"]);
	App.Events.addNode(t, ["Provides demand for muscular slaves from",
		App.UI.DOM.combineNodes(App.Encyclopedia.link("The Corporation"), ".")]);
	App.Events.addNode(t, ["Mutually exclusive with",
		App.UI.DOM.combineNodes(App.Encyclopedia.link("Hedonistic Decadence"), ".")]);
	return t;
}, "FutureSocieties");

App.Encyclopedia.addArticle("Chattel Religionism", function() {
	const t = new DocumentFragment();
	const devotion = (text = "devotion") => App.Encyclopedia.link(text, "From Rebellious to Devoted", "hotpink");
	const chattelReligionism = ["appropriate clothing", devotion("high devotion"),
		App.Encyclopedia.link("slave marriages", "Slave marriages")];

	App.Events.addNode(t, [App.UI.DOM.makeElement("span", "Chattel Religionism", ["bold"]),
		"is a future society model which approves of", App.UI.DOM.toSentence(chattelReligionism),
		"while disapproving of slutty clothing."], "div");
	App.Events.addNode(t, ["Applies a small", devotion(), "boost to all slaves, and can remove the weekly", devotion(),
		"gain cap."], "div", ["indent"]);
	App.Events.addNode(t, ["Drives an increase in the ratio of slaves to citizens."], "div", ["indent"]);
	App.Events.addNode(t, ["Can be developed to permanently boost",
		App.Encyclopedia.link("reputation", "Arcologies and Reputation", "green"),
		"and quicken slaves' mental conditioning."], "div", ["indent"]);
	App.Events.addNode(t, ["Can be developed to prefer nudity over conservative clothing."]);
	App.Events.addNode(t, ["Provides demand for sexual training from",
		App.UI.DOM.combineNodes(App.Encyclopedia.link("The Corporation"), ".")]);
	App.Events.addNode(t, ["Mutually exclusive with",
		App.UI.DOM.combineNodes(App.Encyclopedia.link("Multiculturalism"), ".")]);
	return t;
}, "FutureSocieties");

App.Encyclopedia.addArticle("Multiculturalism", function() {
	const t = new DocumentFragment();
	App.Events.addNode(t, [App.UI.DOM.makeElement("span", "Multiculturalism", ["bold"]),
		"is a future society model which advances differently than other models: it is improved by the investment of more future society model slots, which can be withdrawn individually if desired.",
		"No other advancement occurs and all benefits at each level are available instantly."], "div");
	App.Events.addNode(t, ["Each week provides free",
		App.Encyclopedia.link("reputation", "Arcologies and Reputation", "green"),
		"and increases arcology prosperity."], "div", ["indent"]);
	App.Events.addNode(t, ["Helps prevent citizens from falling into slavery, slowing population drift towards slaves."], "div", ["indent"]);
	App.Events.addNode(t, ["Mutually exclusive with",
		App.UI.DOM.combineNodes(App.Encyclopedia.link("Chattel Religionism"), ".")]);
	return t;
}, "FutureSocieties");

App.Encyclopedia.addArticle("Roman Revivalism", function() {
	const t = new DocumentFragment();
	App.Events.addNode(t, [App.UI.DOM.makeElement("span", "Roman Revivalism", ["bold"]),
		"is a future society model which approves of",
		"good leadership qualities like wealth and strong defense; disapproves of debt."], "div");
	App.Events.addNode(t, ["Improves rate of prosperity gain and at high levels will drive down all slave prices."], "div", ["indent"]);
	App.Events.addNode(t, ["Can apply unique names to slaves."], "div", ["indent"]);
	App.Events.addNode(t, ["Slows increases in the ratio of slaves to citizens."], "div", ["indent"]);
	App.Events.addNode(t, ["Can be developed to greatly improve the arcology's resistance to insurrection."], "div", ["indent"]);
	App.Events.addNode(t, ["Provides demand for basic educations from",
		App.UI.DOM.combineNodes(App.Encyclopedia.link("The Corporation"), ".")]);
	App.Events.addNode(t, ["Mutually exclusive with the other Revivalist models."], "div", ["indent"]);
	return t;
}, "FutureSocieties");

App.Encyclopedia.addArticle("Egyptian Revivalism", function() {
	const t = new DocumentFragment();
	App.Events.addNode(t, [App.UI.DOM.makeElement("span", "Egyptian Revivalism", ["bold"]),
		"is a future society model which approves of",
		"keeping a large harem, slave incest, and having a wide racial variety of public slaves."], "div");
	App.Events.addNode(t, ["Improves value of slaves in incestuous relationships and efficiency of fucktoys in improving",
		App.Encyclopedia.link("reputation.", "Arcologies and Reputation", "green")]);
	App.Events.addNode(t, ["Can apply unique names to slaves."], "div", ["indent"]);
	App.Events.addNode(t, ["Slows increases in the ratio of slaves to citizens."], "div", ["indent"]);
	App.Events.addNode(t, ["Can be developed to improve the Head Girl position, with an additional bonus for Head Girls married to the Concubine, and a massive bonus if the Head Girl is also related to the Concubine."], "div", ["indent"]);
	App.Events.addNode(t, ["Provides demand for exotic accents from",
		App.UI.DOM.combineNodes(App.Encyclopedia.link("The Corporation"), ".")]);
	App.Events.addNode(t, ["Mutually exclusive with the other Revivalist models."], "div", ["indent"]);
	return t;
}, "FutureSocieties");

App.Encyclopedia.addArticle("Edo Revivalism", function() {
	const t = new DocumentFragment();
	App.Events.addNode(t, [App.UI.DOM.makeElement("span", "Edo Revivalism", ["bold"]),
		"is a future society model which approves of",
		"provision for the arcology's cultural development by providing a large number of public servants or club girls, which increases with",
		App.Encyclopedia.link("reputation", "Arcologies and Reputation", "green"),
		"and disapproves of failure to do so."], "div");
	App.Events.addNode(t, ["Improves efficiency of public servants and club girls."], "div", ["indent"]);
	App.Events.addNode(t, ["Greatly improves beauty of Japanese slaves."], "div", ["indent"]);
	App.Events.addNode(t, ["Can be developed to greatly improve the efficiency of direct spending on future societies."], "div", ["indent"]);
	App.Events.addNode(t, ["Provides demand for unaccented slaves from",
		App.UI.DOM.combineNodes(App.Encyclopedia.link("The Corporation"), ".")]);
	App.Events.addNode(t, ["Mutually exclusive with the other Revivalist models."], "div", ["indent"]);
	return t;
}, "FutureSocieties");

App.Encyclopedia.addArticle("Arabian Revivalism", function() {
	const t = new DocumentFragment();
	App.Events.addNode(t, [App.UI.DOM.makeElement("span", "Arabian Revivalism", ["bold"]),
		"is a future society model which approves of",
		"keeping a large number of fucktoys and slaves in the master suite, which increases with",
		App.Encyclopedia.link("reputation", "Arcologies and Reputation", "green"),
		"and disapproves of failure to do so."], "div");
	App.Events.addNode(t, ["Grants a bonus to the price received when selling slaves."], "div", ["indent"]);
	App.Events.addNode(t, ["Can be developed to improve the efficiency of direct spending on future societies and moderately increase rents."], "div", ["indent"]);
	App.Events.addNode(t, ["Provides demand for more",
		App.Encyclopedia.link("devoted", "From Rebellious to Devoted", "hotpink"), "slaves from",
		App.UI.DOM.combineNodes(App.Encyclopedia.link("The Corporation"), ".")]);
	App.Events.addNode(t, ["Mutually exclusive with the other Revivalist models."], "div", ["indent"]);
	return t;
}, "FutureSocieties");

App.Encyclopedia.addArticle("Chinese Revivalism", function() {
	const t = new DocumentFragment();
	App.Events.addNode(t, [App.UI.DOM.makeElement("span", "Chinese Revivalism", ["bold"]),
		"is a future society model which approves of",
		"maintaining a solid imperial administration by keeping a Head Girl, a Recruiter, and a Bodyguard; disapproves of failure to do so."], "div");
	App.Events.addNode(t, ["Increases prosperity growth when all three of these positions are staffed."], "div", ["indent"]);
	App.Events.addNode(t, ["Greatly improves beauty of Chinese slaves."], "div", ["indent"]);
	App.Events.addNode(t, ["Can be developed to permit the Head Girl to see to an additional slave each week."], "div", ["indent"]);
	App.Events.addNode(t, ["Provides demand for", App.UI.DOM.makeElement("span", "intelligence", ["cyan"]), "from",
		App.UI.DOM.combineNodes(App.Encyclopedia.link("The Corporation"), ".")]);
	App.Events.addNode(t, ["Mutually exclusive with the other Revivalist models."], "div", ["indent"]);
	return t;
}, "FutureSocieties");

App.Encyclopedia.addArticle("Repopulationism", function() {
	const t = new DocumentFragment();
	App.Events.addNode(t, [App.UI.DOM.makeElement("span", "Repopulation Focus", ["bold"]),
		"is a future society model. It:"], "div");
	App.Events.addNode(t, ["Approves of pregnant slaves and slaves that have given birth."], "div", ["indent"]);
	App.Events.addNode(t, ["Improves value and beauty of pregnant slaves."], "div", ["indent"]);
	App.Events.addNode(t, ["Can be developed to radically affect goods seen in the slave market."], "div", ["indent"]);
	App.Events.addNode(t, ["Provides demand for lactating slaves from",
		App.UI.DOM.combineNodes(App.Encyclopedia.link("The Corporation"), ".")]);
	App.Events.addNode(t, ["Provides demand for young slaves from the corporation."], "div", ["indent"]);
	App.Events.addNode(t, ["Is mutually exclusive with",
		App.UI.DOM.combineNodes(App.Encyclopedia.link("Eugenics", "Eugenics Focus"), ".")]);
	App.Events.addNode(t, ["Repopulationism is a difficult Future Society and not recommended for beginners.",
		"Try to keep as many slaves as possible visibly pregnant; if they're pregnant but not showing yet, Pregnancy Biometrics Collars can help."], "p", ["note",
		"yellow"]);
	return t;
}, "FutureSocieties");

App.Encyclopedia.addArticle("Eugenics Focus", function() {
	const t = new DocumentFragment();
	App.Events.addNode(t, [App.UI.DOM.makeElement("span", "Eugenics", ["bold"]),
		"is a future society model. It:"], "div");
	App.Events.addNode(t, ["Disapproves of slave reproduction."], "div", ["indent"]);
	App.Events.addNode(t, ["Drastically reduces value and beauty of pregnant slaves."], "div", ["indent"]);
	App.Events.addNode(t, ["Opens benefits exclusive to the connections made by the powerful individuals attracted to the arcology."], "div", ["indent"]);
	App.Events.addNode(t, ["Provides demand for; gelded, skilled and smart slaves from",
		App.UI.DOM.combineNodes(App.Encyclopedia.link("The Corporation"), ".")]);
	App.Events.addNode(t, ["Is mutually exclusive with",
		App.UI.DOM.combineNodes(App.Encyclopedia.link("Repopulation Focus", "Repopulationism"), ".")]);
	App.Events.addNode(t, ["It is made up of four to five social classes: Slaves, low class citizens, chosen slaves, elite citizens, and the Societal Elite: a group of individuals with vast connections and wealth attracted by the promises of a society built around them. Low class citizens are encouraged to face testing and join the ranks of the elite, though the cost of failing the test is sterilization; a detail that is not revealed until after the test is complete."], "div", ["indent"]);
	App.Events.addNode(t, ["Eugenics is a difficult Future Society and not recommended for beginners.",
		"For a more complete guide to playing with a Eugenics arcology, see the",
		App.UI.DOM.combineNodes(App.Encyclopedia.link("Guide to Eugenics"), ".")], "p", ["note", "yellow"]);
	return t;
}, "FutureSocieties");

App.Encyclopedia.addArticle("Slave Professionalism", function() {
	const t = new DocumentFragment();
	App.Events.addNode(t, [App.UI.DOM.makeElement("span", "Slave Professionalism", ["bold"]),
		"is a future society model. It:"], "div");
	App.Events.addNode(t, ["Approves of intelligent, well-trained slaves."], "div", ["indent"]);
	App.Events.addNode(t, ["Improves value and beauty of smart slaves."], "div", ["indent"]);
	App.Events.addNode(t, ["Dislikes slaves ruled by their libido."], "div", ["indent"]);
	App.Events.addNode(t, ["Can be developed to radically affect goods seen in the slave market"], "div", ["indent"]);
	App.Events.addNode(t, ["Provides demand for; smart, educated and trained",
		App.UI.DOM.combineNodes(App.Encyclopedia.link("The Corporation"), ".")]);
	App.Events.addNode(t, ["Is mutually exclusive with",
		App.UI.DOM.combineNodes(App.Encyclopedia.link("Intellectual Dependency"), ".")]);
	return t;
}, "FutureSocieties");

App.Encyclopedia.addArticle("Intellectual Dependency", function() {
	const t = new DocumentFragment();
	App.Events.addNode(t, [App.UI.DOM.makeElement("span", "Intellectual Dependency", ["bold"]),
		"is a future society model. It:"], "div");
	App.Events.addNode(t, ["Approves of horny, vapid slaves."], "div", ["indent"]);
	App.Events.addNode(t, ["Improves value and beauty of moronic slaves."], "div", ["indent"]);
	App.Events.addNode(t, ["Can be developed to adore bimbo bodies or radically affect goods seen in the slave market."], "div", ["indent"]);
	App.Events.addNode(t, ["Allows for", App.Encyclopedia.link("the Schoolroom", "Schoolroom"),
		"to be radically redesigned."], "div", ["indent"]);
	App.Events.addNode(t, ["Provides demand for; idiotic, young and uneducated slaves from",
		App.UI.DOM.combineNodes(App.Encyclopedia.link("The Corporation"), ".")]);
	App.Events.addNode(t, ["Is mutually exclusive with",
		App.UI.DOM.combineNodes(App.Encyclopedia.link("Slave Professionalism"), ".")]);
	return t;
}, "FutureSocieties");

App.Encyclopedia.addArticle("Petite Admiration", function() {
	const t = new DocumentFragment();
	App.Events.addNode(t, [App.UI.DOM.makeElement("span", "Petite Admiration", ["bold"]),
		"is a future society model. It:"], "div");
	App.Events.addNode(t, [`Approves of slaves shorter than ${lengthToEitherUnit(160)}.`]);
	App.Events.addNode(t, ["Improves value and beauty of sufficiently short slaves."], "div", ["indent"]);
	App.Events.addNode(t, ["Can be developed to accept relative shortness or radically affect goods seen in the slave market."], "div", ["indent"]);
	App.Events.addNode(t, ["Provides demand for shorter slaves from",
		App.UI.DOM.combineNodes(App.Encyclopedia.link("The Corporation"), ".")]);
	App.Events.addNode(t, ["Is mutually exclusive with",
		App.UI.DOM.combineNodes(App.Encyclopedia.link("Statuesque Glorification"), ".")]);
	return t;
}, "FutureSocieties");

App.Encyclopedia.addArticle("Statuesque Glorification", function() {
	const t = new DocumentFragment();
	App.Events.addNode(t, [App.UI.DOM.makeElement("span", "Statuesque Glorification", ["bold"]),
		"is a future society model. It:"], "div");
	App.Events.addNode(t, [`Approves of slaves taller than ${lengthToEitherUnit(170)}.`]);
	App.Events.addNode(t, ["Improves value and beauty of sufficiently tall slaves."], "div", ["indent"]);
	App.Events.addNode(t, ["Can be developed to accept relative tallness or radically affect goods seen in the slave market."], "div", ["indent"]);
	App.Events.addNode(t, ["Provides demand for taller slaves from",
		App.UI.DOM.combineNodes(App.Encyclopedia.link("The Corporation"), ".")]);
	App.Events.addNode(t, ["Is mutually exclusive with",
		App.UI.DOM.combineNodes(App.Encyclopedia.link("Petite Admiration"), ".")]);
	return t;
}, "FutureSocieties");

App.Encyclopedia.addArticle("Hedonistic Decadence", function() {
	const t = new DocumentFragment();
	App.Events.addNode(t, [App.UI.DOM.makeElement("span", "Hedonistic Decadence", ["bold"]),
		"is a future society model. It:"], "div");
	App.Events.addNode(t, ["Approves of overindulgence and luxury."], "div", ["indent"]);
	App.Events.addNode(t, ["Improves value and beauty of heavyset slaves."], "div", ["indent"]);
	App.Events.addNode(t, ["Can be developed to radically affect goods seen in the slave market."], "div", ["indent"]);
	App.Events.addNode(t, ["Provides demand for pampered and skilled slaves from",
		App.UI.DOM.combineNodes(App.Encyclopedia.link("The Corporation"), ".")]);
	App.Events.addNode(t, ["Mutually exclusive with",
		App.UI.DOM.combineNodes(App.Encyclopedia.link("Physical Idealism"), ".")]);
	return t;
}, "FutureSocieties");

App.Encyclopedia.addArticle("Aztec Revivalism", function() {
	const t = new DocumentFragment();
	App.Events.addNode(t, [App.UI.DOM.makeElement("span", "Aztec Revivalism", ["bold"]),
		"is a future society model which approves of",
		"qualities like good military education and an older leader."], "div");
	App.Events.addNode(t, ["Improves all military acquisitions of slaves and allows for the sacrifice of slaves for",
		App.Encyclopedia.link("reputation.", "Arcologies and Reputation", "green")]);
	App.Events.addNode(t, ["Can apply unique names to slaves."], "div", ["indent"]);
	App.Events.addNode(t, ["Slows increases in the ratio of slaves to citizens."], "div", ["indent"]);
	App.Events.addNode(t, ["Can be developed to greatly rely on the Head Girl position as an advisor and assistant."], "div", ["indent"]);
	App.Events.addNode(t, ["Provides demand for menial slaves from",
		App.UI.DOM.combineNodes(App.Encyclopedia.link("The Corporation"), ".")]);
	App.Events.addNode(t, ["Mutually exclusive with the other Revivalist models."], "div", ["indent"]);
	return t;
}, "FutureSocieties");

App.Encyclopedia.addArticle("Neo-Imperialism", function() {
	const t = new DocumentFragment();
	App.Events.addNode(t, [App.UI.DOM.makeElement("span", "Neo-Imperialism", ["bold"]),
		"is a future society model which approves of",
		"high wealth, prosperity, and personal combat skills and disapproves of weakness and poverty in leaders."], "div");
	App.Events.addNode(t, ["Improves rate of prosperity gain and can be developed to increase rents via Imperial Barons."], "div", ["indent"]);
	App.Events.addNode(t, ["Slows increases in the ratio of slaves to citizens."], "div", ["indent"]);
	App.Events.addNode(t, ["Can be developed to improve the Arcology's combat prowess and resistance to insurrection via Imperial Knights."], "div", ["indent"]);
	App.Events.addNode(t, ["Provides demand for healthy slaves from",
		App.UI.DOM.combineNodes(App.Encyclopedia.link("The Corporation"), ".")]);
	App.Events.addNode(t, ["Mutually exclusive with all Revivalist models."], "div", ["indent"]);
	return t;
}, "FutureSocieties");

App.Encyclopedia.addArticle("Antebellum Revivalism", function() {
	const t = new DocumentFragment();
	const r = new SpacedTextAccumulator(t);
	r.push(App.UI.DOM.makeElement("span", "Antebellum Revivalism", ["bold"]), "is a future society model which approves of");
	r.push("maintaining honor and integrity, keeping a large number of slaves and servants, and having skill at breaking slaves.");
	r.toNode("div");
	App.Events.addNode(t, ["Increases prosperity for the upper echelons of society."], "div", ["indent"]);
	App.Events.addNode(t, ["Slows increases in the ratio of slaves to citizens."], "div", ["indent"]);
	App.Events.addNode(t, ["Can be developed to improve the Arcology's defensive capabilities."], "div", ["indent"]);
	App.Events.addNode(t, ["Provides demand for entertaining slaves from", App.UI.DOM.combineNodes(App.Encyclopedia.link("The Corporation"), ".")]);
	App.Events.addNode(t, ["Mutually exclusive with all Revivalist models."], "div", ["indent"]);
	return t;
}, "FutureSocieties");

App.Encyclopedia.addArticle("Gender Radicalism Research", function() {
	const t = new DocumentFragment();
	App.Events.addNode(t, ["Advanced Gender Radicalist societies can fund research to produce modified uteri and ovaries designed to be implanted into male slaves to grant them the ability to become pregnant, thus leaving no gender specific traits remaining."], "div");
	return t;
}, "FutureSocieties");

App.Encyclopedia.addArticle("Slave Professionalism Research", function() {
	const t = new DocumentFragment();
	App.Events.addNode(t, ["Advanced Slave Professionalism societies can fund efforts to synthesize a compound capable of improving mental capacities."], "div");
	return t;
}, "FutureSocieties");

App.Encyclopedia.addArticle("Transformation Fetishism Research", function() {
	const t = new DocumentFragment();
	App.Events.addNode(t, ["Advanced Transformation Fetishist societies can fund research to produce implants capable of reaching previously undocumented sizes."], "div");
	return t;
}, "FutureSocieties");

App.Encyclopedia.addArticle("Asset Expansionist Research", function() {
	const t = new DocumentFragment();
	App.Events.addNode(t, ["Advanced Asset Expansionist societies can fund research to produce extremely powerful growth drugs capable of growing body parts to previously undocumented sizes.",
		"Drugs are also standardized in slave diets to prevent loss of asset size.",
		"Due to the rapid growth in said assets, and the strength of the drug cocktails, slaves are more likely to develop side effects of excessive drug use."], "div");
	return t;
}, "FutureSocieties");

App.Encyclopedia.addArticle("Slimness Enthusiast Research", function() {
	const t = new DocumentFragment();
	App.Events.addNode(t, ["Advanced Slimness Enthusiast societies can fund research into several drugs designed to slim slaves down."], "div");
	App.Events.addNode(t, ["They include:"], "div");
	App.Events.addNode(t, ["Appetite suppressants to make dieting easier."], "div", ["indent"]);
	App.Events.addNode(t, ["Redistributors to draw fat from oversized assets and settle them around the slave's core for easy removal."], "div", ["indent"]);
	App.Events.addNode(t, ["Atrophiers to shrink non-fat based assets."], "div", ["indent"]);
	return t;
}, "FutureSocieties");

App.Encyclopedia.addArticle("Youth Preferentialism Research", function() {
	const t = new DocumentFragment();
	App.Events.addNode(t, ["Specialized creams built off of stem cells and several ingredients known for reducing the ravages of age.",
		"Steady use leaves a slave looking younger, though the effects are literally skin deep; several gossip pieces have run about celebrities bedding youthful slaves just to accidentally find their efforts resulting in a broken hip."], "div");
	return t;
}, "FutureSocieties");

App.Encyclopedia.addArticle("Hedonistic Decadence Research", function() {
	const t = new DocumentFragment();
	App.Events.addNode(t, ["Advanced Hedonistic Decadence societies can purchase plans for specialized slave food.",
		"Said food is shaped to resemble actual food and flavored accordingly, however, its texture can only be described as gooey or gummy.",
		"A plus if that is how the food should be, but a shocker otherwise, given how tantalizing that steak looks after nothing but liquid slave food for so long.",
		"Since the food is essentially compacted liquid slave food, it is highly addictive thanks to the, typically, low presence of aphrodisiacs and can easily lead to excessive",
		App.Encyclopedia.link("weight gain", "Weight"), "as slaves are driven to gorge themselves on it.",
		"They'll be happy, at least, as they steadily outgrow their clothes.",
		"Alterations to the recipe exist to prevent", App.Encyclopedia.link("weight gain", "Weight"),
		"for Slimness Enthusiast societies and to cause gastric distress in Degradationist societies."], "div");
	return t;
}, "FutureSocieties");

App.Encyclopedia.addCategory("FutureSocieties", function(currentArticle) {
	const t = new DocumentFragment();
	const vanilla = [];
	const modded = [];
	const research = [];

	vanilla.push(App.Encyclopedia.link("Ethnic Supremacy"));
	vanilla.push(App.Encyclopedia.link("Ethnic Subjugationism"));
	vanilla.push(App.Encyclopedia.link("Gender Radicalism"));
	vanilla.push(App.Encyclopedia.link("Gender Fundamentalism"));
	vanilla.push(App.Encyclopedia.link("Paternalism"));
	vanilla.push(App.Encyclopedia.link("Degradationism"));
	vanilla.push(App.Encyclopedia.link("Body Purism"));
	vanilla.push(App.Encyclopedia.link("Transformation Fetishism"));
	vanilla.push(App.Encyclopedia.link("Maturity Preferentialism"));
	vanilla.push(App.Encyclopedia.link("Youth Preferentialism"));
	vanilla.push(App.Encyclopedia.link("Slimness Enthusiasm"));
	vanilla.push(App.Encyclopedia.link("Asset Expansionism"));
	vanilla.push(App.Encyclopedia.link("Pastoralism"));
	vanilla.push(App.Encyclopedia.link("Physical Idealism"));
	vanilla.push(App.Encyclopedia.link("Chattel Religionism"));
	vanilla.push(App.Encyclopedia.link("Multiculturalism"));
	vanilla.push(App.Encyclopedia.link("Roman Revivalism"));
	vanilla.push(App.Encyclopedia.link("Egyptian Revivalism"));
	vanilla.push(App.Encyclopedia.link("Edo Revivalism"));
	vanilla.push(App.Encyclopedia.link("Arabian Revivalism"));
	vanilla.push(App.Encyclopedia.link("Chinese Revivalism"));

	modded.push(App.Encyclopedia.link("Repopulationism"));
	modded.push(App.Encyclopedia.link("Eugenics Focus"));
	modded.push(App.Encyclopedia.link("Slave Professionalism"));
	modded.push(App.Encyclopedia.link("Intellectual Dependency"));
	modded.push(App.Encyclopedia.link("Petite Admiration"));
	modded.push(App.Encyclopedia.link("Statuesque Glorification"));
	modded.push(App.Encyclopedia.link("Hedonistic Decadence"));
	modded.push(App.Encyclopedia.link("Aztec Revivalism"));
	modded.push(App.Encyclopedia.link("Neo-Imperialism"));
	modded.push(App.Encyclopedia.link("Antebellum Revivalism"));

	research.push(App.Encyclopedia.link("Gender Radicalism Research"));
	research.push(App.Encyclopedia.link("Slave Professionalism Research"));
	research.push(App.Encyclopedia.link("Transformation Fetishism Research"));
	research.push(App.Encyclopedia.link("Asset Expansionist Research"));
	research.push(App.Encyclopedia.link("Slimness Enthusiast Research"));
	research.push(App.Encyclopedia.link("Youth Preferentialism Research"));
	research.push(App.Encyclopedia.link("Hedonistic Decadence Research"));

	if (currentArticle !== "Future Societies") {
		App.Events.addNode(t, ["Future Societies"], "div");
	}
	App.Events.addNode(t, ["Vanilla Future Societies:", App.UI.DOM.generateLinksStrip(vanilla)], "div");
	App.Events.addNode(t, ["Modded Future Societies:", App.UI.DOM.generateLinksStrip(modded)], "div");
	App.Events.addNode(t, ["Research:", App.UI.DOM.generateLinksStrip(research)], "div");
	return t;
});
