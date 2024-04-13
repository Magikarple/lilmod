App.Encyclopedia.addArticle("The Black Market", function() {
	const t = new DocumentFragment();
	const r = new SpacedTextAccumulator(t);

	r.push("You may be the ruler of your arcology, but you don't exist in a vacuum. You can do all kinds of thing and get lots of things that regular citizens can't. So the Black Market, is a chance for less prominent citizens to do or get stuff like an arcology leader might experience. But for a ruler like yourself, it's a chance to avoid the severe scrutiny you're subject to on a regular basis, and to get a hold of bleeding edge or illegal research and technologies. The market itself is always moving from place to place, but if you're reputable enough, you can find it when you need it.");
	r.toNode("div");

	r.push("You will be able to find all manner of Future Society technologies which are not exactly illegal, but difficult to get through regular channels. Every week, the dealers will have a few for you to purchase, but for the truly illegal or unethical items, your only choice is to go to the Black Market.");
	r.toNode("p");

	r.push("Specialty goods:", App.Encyclopedia.link("Childhood Fertility Induced NCS"));
	r.toNode("p");

	return t;
}, "BlackMarket");

App.Encyclopedia.addArticle("Contraband and Illegal Goods", function() {
	const t = new DocumentFragment();
	const r = new SpacedTextAccumulator(t);

	r.push("While there is little to no issue with possessing nearly anything, getting your hands on it may not always be feasible. Be it local policy or overreaching business deals, certain goods may not be found for sale in the Free City. This does not stop some of the shadier dealers from risking the sale of them, of course; this is where smugglers come in. There is always a market for contraband and illicit goods and never a shortage of people looking to buy them. Not all smugglers are successful, and those that aren't soon find themselves up for sale in the slave markets.");
	r.toNode("div");

	return t;
}, "BlackMarket");

App.Encyclopedia.addArticle("Childhood Fertility Induced NCS", function() {
	const t = new DocumentFragment();
	const r = new SpacedTextAccumulator(t);

	r.push("This uses a designer retrograde virus to set the genetic markers for the Neotenic Complex Syndrome, a syndrome originally called Syndrome X discovered in the early 2000s.");
	r.push("In layman's terms, it", App.UI.DOM.makeElement("span", "suppresses the growth and secondary sexual characteristics of slaves", ["gold"]), "both male and female.");
	r.push("The original condition was usually fatal or dangerous.");
	r.push("This modified version of the genetic flaw is not harmful (relatively speaking), and in addition to the growth blockage, it permits the slave to continue the", App.UI.DOM.makeElement("span", "development of gonads", ["lime"]), "at a slightly faster than normal pace.");
	r.push("Secondary sexual characteristics are also reversed, though interestingly enough, pregnancy is still possible.Slaves put on this genetic engineered blend will be permanently changed and will no longer grow in stature or assets without severe chemical assistance, and even then at a reduced rate when compared to non-NCS-induced slaves, and should their ongoing growth treatments stop they will slowly regress back to the physicality of a child.");
	r.toNode("div");

	r.push(App.UI.DOM.makeElement("span", "The genetic tampering is considered illegal,", ["red"]), "but there is also a", App.UI.DOM.makeElement("span", "moral question as this abrogates the rights of slaves to ever grow up.", ["yellow"]));
	r.toNode("p");

	r.push("Can only be purchased in", App.Encyclopedia.link("The Black Market"));
	r.addToLast(".");
	r.toNode("p");

	return t;
}, "BlackMarket");

App.Encyclopedia.addCategory("BlackMarket", function() {
	const r = [];
	r.push(App.Encyclopedia.link("The Black Market"));
	r.push(App.Encyclopedia.link("Contraband and Illegal Goods"));
	r.push(App.Encyclopedia.link("Gender Radicalism Research"));
	r.push(App.Encyclopedia.link("Slave Professionalism Research"));
	r.push(App.Encyclopedia.link("Transformation Fetishism Research"));
	r.push(App.Encyclopedia.link("Asset Expansionist Research"));
	r.push(App.Encyclopedia.link("Slimness Enthusiast Research"));
	r.push(App.Encyclopedia.link("Youth Preferentialism Research"));
	r.push(App.Encyclopedia.link("Hedonistic Decadence Research"));
	r.push(App.Encyclopedia.link("Childhood Fertility Induced NCS"));
	return App.UI.DOM.generateLinksStrip(r);
});
