App.Encyclopedia.addArticle("Obtaining Slaves", function() {
	const f = new DocumentFragment();
	App.UI.DOM.appendNewElement("p", f, "Future room for lore text", ["note"]);
	App.UI.DOM.appendNewElement("p", f, "Choose a more particular entry below:");
	return f;
}, "obtainingSlaves");

App.Encyclopedia.addArticle("Kidnapped Slaves", function() {
	const f = new DocumentFragment();

	App.Events.addParagraph(f, ["Slavers, from disreputable to noble, visit the Free Cities in droves. Their merchandise is, as a rule, offered as-is and no questions asked. This usually means that their charges have been forcibly kidnapped. These slaves are generally rebellious, often unhealthy, and always cheap."]);

	App.Encyclopedia.addArticleSource(f, "Guide to Modern Slavery, 2037 Edition", "Lawrence, W. G.");

	return f;
}, "obtainingSlaves");

App.Encyclopedia.addArticle("Slave Schools", function() {
	const f = new DocumentFragment();
	let r;

	r = [];
	if (V.minimumSlaveAge) {
		r.push(`It is not legal to own anyone under the age of ${V.minimumSlaveAge} in the Free Cities.`);
		r.push(`It is however legal to hold an interest in future ownership of a child once they reach their ${V.minimumSlaveAge}th birthday.`);
	}
	r.push("The Free Cities host what are referred to as 'orphanages,' but are in fact slave schools.");
	if (V.minimumSlaveAge) {
		r.push("Of course, instruction cannot include sexual training, so it instead focuses on obedience and fitness.");
	}
	App.Events.addParagraph(f, r);

	r = [];
	r.push("The standard slave school produces merchandise to a strict mold. Their stock is guaranteed to be");
	r.push(App.Encyclopedia.link("robustly healthy,", "Health", "health inc"));
	r.push("at a sleek");
	r.push(App.Encyclopedia.link("weight,", "Weight"));
	r.push(App.Encyclopedia.link("body modification", "Slave Modification"));
	r.push("free,");
	if (!V.minimumSlaveAge || V.minimumSlaveAge < 19) {
		r.push(`${V.minimumSlaveAge ? V.minimumSlaveAge : up} to 19 years of age,`);
	}
	r.push("very obedient, and 100% virgin.");
	r.push("A few schools specialize in slaves with non-standard organs or in modified slaves, but most protect brand identity by confining themselves to natural females.");
	App.Events.addParagraph(f, r);

	App.Events.addParagraph(f, ["It has recently become common practice to begin treating such trainees with drugs years before sale. Not all orphanages engage in this questionable practice, usually justified as 'seeing to orphans' medical welfare,' but you will occasionally see fresh slaves sold with breasts and asses unusually well-developed for their age. These are very rare, as the newness of slavery means that few slaves have been so from a young age. Presumably, slaves treated in this way will become more common as the Free Cities mature."]);

	App.Encyclopedia.addArticleSource(f, "Guide to Modern Slavery, 2037 Edition", "Lawrence, W. G.");

	return f;
}, "obtainingSlaves");

App.Encyclopedia.addArticle("Stables", function() {
	const f = new DocumentFragment();

	App.Events.addParagraph(f, ["At any given time, many hundreds of new slaves are listed for sale in the Free City. Since these slaves have come through a training stable, they will tend to be fairly obedient, reasonably healthy, and have basic sexual skill, but will never be virgins."]);

	App.Encyclopedia.addArticleSource(f, "Guide to Modern Slavery, 2037 Edition", "Lawrence, W. G.");

	return f;
}, "obtainingSlaves");

App.Encyclopedia.addArticle("Household Liquidations", function() {
	const f = new DocumentFragment();


	App.Events.addParagraph(f, ["It is natural that where there is a demand for slaves who are related to one another, supply should arise."]);

	App.Events.addParagraph(f, ["Suppliers of slaves from the outside world are well aware that paired slaves, whether mothers and daughters or sisters, command a premium. This special merchandise is best found at dealers that specialize in it. After all, the demand is strong enough that only experienced dealers have the skill and equipment to defeat all the tricks suppliers are willing to use to pass slaves off as relatives."]);

	App.Events.addParagraph(f, ["Nature has contrived that the demand for twin slaves should far outstrip the supply. Since slavery is new, a majority of those now enslaved were born free, so this is difficult for slave trainers to address. However, the coming decades should see a great increase in the number of slave twins as breeders improve fertility treatments."]);

	App.Encyclopedia.addArticleSource(f, "Guide to Modern Slavery, 2037 Edition", "Lawrence, W. G.");

	return f;
}, "obtainingSlaves");

App.Encyclopedia.addArticle("Direct Sales", function() {
	const f = new DocumentFragment();

	App.Events.addParagraph(f, ["On occasion, an established slaveowner will sell a trained and modified slave due to financial need, because he is bored of her, or because he trains unique slaves as a hobby."]);

	App.Events.addParagraph(f, ["Some of the most powerful persons in the Free Cities also maneuver their enemies into selling a favorite slave as a way of bloodlessly showing dominance. The truly powerful occasionally feel the need to show that they can obtain any slave, at any time, regardless of her owners' wishes."]);

	App.Encyclopedia.addArticleSource(f, "Guide to Modern Slavery, 2037 Edition", "Lawrence, W. G.");

	return f;
}, "obtainingSlaves");

App.Encyclopedia.addArticle("Pre-Owned Slaves", function() {
	const f = new DocumentFragment();

	App.Events.addParagraph(f, ["The slaves left behind by the previous owner of your arcology are from a catalog of slaves that can also be accessed through the pre-owned slave vendor."]);

	// TODO: update link
	App.Events.addParagraph(f, ["Most of these slaves were submitted to the game by anons on /d/. If you'd like to submit a slave for addition to the game, you can do so at the GitGud development site."]);

	return f;
}, "obtainingSlaves");


App.Encyclopedia.addArticle("Discarded Slaves", function() {
	const f = new DocumentFragment();
	let r;

	App.Events.addParagraph(f, ["Slaves don't last forever in the Free Cities. Many don't even last until retirement, with broken minds and abused or over-used bodies."]);

	r = [];
	r.push("These slaves which have lost their value are often simply culled from the owners' herds, but may also be sold through");
	r.push(App.Encyclopedia.link("the Flesh Heap"));
	r.push("as discount merchandise for new or cash-strapped slaveowners who can wring some final use out of them. Their new owners may end up using them as discount whores,");
	r.push(App.UI.DOM.combineNodes(App.Encyclopedia.link("living sex toys", "Fuckdolls"), ","));
	r.push("or for medical testing.");
	App.Events.addParagraph(f, r);

	r = [];
	r.push("Some discarded slaves are also");
	r.push(App.Encyclopedia.topic("rescued"));
	r.push("by the so-called Slave Shelters. These charities place the discarded slaves with well-off slaveowners who are willing to invest the time and effort into caring for them, whether to restore them to serviceable condition or simply for humanitarian reasons. Abuse and resale of placed shelter slaves is generally prohibited, and most shelters attempt to enforce these terms with regular inspections.");
	App.Events.addParagraph(f, r);

	App.Encyclopedia.addArticleSource(f, "Guide to Modern Slavery, 2037 Edition", "Lawrence, W. G.");

	return f;
}, "obtainingSlaves");


App.Encyclopedia.addArticle("The Flesh Heap", function() {
	const f = new DocumentFragment();
	let r;

	r = [];
	r.push("More of a trash heap than a slave market, the");
	r.push(App.Encyclopedia.topic("Flesh Heap"));
	r.push("is a dumping ground for thoroughly broken slaves. Relatively healthy bodies are usually scooped up for medical testing or other purposes; several that one wouldn't want to waste a valuable slave on. Anything with some sort of life in it is up for sale, usually at extremely low prices, though one gets what they pay for; most slaves are nothing more than vegetables. One would have to place a reserve should they want a mindless, healthy slave for whatever they seek.");
	App.Events.addParagraph(f, r);

	return f;
}, "obtainingSlaves");


App.Encyclopedia.addArticle("The Job Fulfillment Center", function() {
	const f = new DocumentFragment();
	let r;

	r = [];
	r.push("If you are looking for a slave qualified for a specific role, look no further than the Traders Union that makes up the Job Fulfillment Center. Leave the job description and a list of desired traits and before long a suitable slave will be delivered to your doorstep and ready to serve you. Due to the nature of the business, these slaves are not");
	r.push(App.Encyclopedia.link("cheap", "Money", "cash"));
	r.push("and usually not perfect, but they always fulfill their job adequately and obediently.");
	App.Events.addParagraph(f, r);

	return f;
}, "obtainingSlaves");


App.Encyclopedia.addArticle("Wetware CPUs", function() {
	const f = new DocumentFragment();

	App.Events.addParagraph(f, ["Slaves stripped of all unneeded parts, attached to a VR world, and honed to near perfection. Their minds are peerless, but their bodies are broken; if one is able to overcome such an obstacle, a valuable slave awaits."]);

	return f;
}, "obtainingSlaves");

App.Encyclopedia.addCategory("obtainingSlaves", function() {
	const r = [];
	r.push(App.Encyclopedia.link("Kidnapped Slaves"));
	r.push(App.Encyclopedia.link("Slave Schools"));
	r.push(App.Encyclopedia.link("Stables"));
	r.push(App.Encyclopedia.link("Household Liquidations"));
	r.push(App.Encyclopedia.link("Direct Sales"));
	r.push(App.Encyclopedia.link("Pre-Owned Slaves"));
	r.push(App.Encyclopedia.link("Random Events"));
	r.push(App.Encyclopedia.link("Discarded Slaves"));
	r.push(App.Encyclopedia.link("The Flesh Heap"));
	r.push(App.Encyclopedia.link("The Job Fulfillment Center"));
	r.push(App.Encyclopedia.link("Wetware CPUs"));
	r.push(App.Encyclopedia.link("The Corporation"));
	return App.UI.DOM.generateLinksStrip(r);
});
