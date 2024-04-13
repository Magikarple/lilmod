// cSpell:ignore Franz-Crekcht

App.Encyclopedia.addArticle("The X-Series Arcology", function() {
	const t = new DocumentFragment();
	const r = new SpacedTextAccumulator(t);

	r.push(`The X-Series Arcology is the latest model of 'arcology', designed in 2037 based off the model of keeping Free Cities as independent from the old world as fiscally viable. The first arcology was designed in early 2016 by the Berlin-based architecture firm Franz-Crekcht as a "Skyscraper for the next generation" - the A-Series. The original A-Series was made to exist as an arcology integrated within old world nations, but capable of producing its own energy, food, and housing for the population contained within, marketed as buildings you could "Live, work, eat and shop at without ever having to leave".`);
	r.push(`These first arcology units were rolled out by the end of the year based on a standard design prototype, and cheap housing prices combined with the promise of stable white-collar work immediately attracted a sizeable population to the A-series arcologies. Based off of these designs, F-C continued to produce arcology schematics, including the K-series and B-series, and formulated plans for arcologies that could operate in rural, maritime, and even oceanic environments. When the popularity of the Arcology model became evident, other design firms replicated their own takes, producing designs like the V-series, D-series, F-series, and finally the ultra-modern X-series that you presently inhabit, designed more as a quasi-independent city-state than the original "next-generation skyscrapers".`);
	r.toParagraph();
	r.push("It wasn't long before arcologies began to form 'clusters' together, relying more on each other for trade and cultural exchange than the old world that surrounded them; increasingly complex infrastructure and surrounding networks began to connect the clusters, tying them together and making them stand apart from the rest of society, largely free from the purview of bureaucrats and old cultural mores. As the world outside the increasingly self-sufficient arcologies began to deteriorate, it wasn't long after that before the first arcologies declared independence from their parent nations, creating the original Free Cities we know today.");
	r.toParagraph();

	r.push("Choose a more particular entry below:");
	r.toNode("div");

	return t;
}, "X-SeriesArcology");

App.Encyclopedia.addArticle("What the Upgrades Do", function() {
	const t = new DocumentFragment();
	const r = new SpacedTextAccumulator(t);
	/**
	 * @param {string} text
	 * @param {string} [article]
	 * @param {string} [className]
	 */
	const link = (text, article, className) => App.Encyclopedia.link(text, article, className);
	/**
	 * @param {string|HTMLSpanElement} text
	 * @param {string[]} [tag]
	 */
	const highlight = (text, tag = ["bold"]) => App.UI.DOM.makeElement("span", text, tag);

	App.Events.addNode(t, [`There are a lot of upgrades available for your arcology, ${properTitle()}. Please relax; some panic upon reviewing the options is normal. This list should familiarize you with your choices.`], "div", "note");

	t.append(App.UI.DOM.makeElement("h3", "Construction"));
	r.push("The first upgrade section on the arcology management menu offers an escalating series of generic upgrades for the arcology. A few of these have minor beneficial side effects, but all share the same main effect: they raise the arcology's maximum prosperity level. You will be informed on the end of week report if your arcology is nearing, at, or over this level. Upgrading early is", highlight("not", ["note"]), "useless, since prosperity will increase more rapidly if the cap is much higher than the current prosperity level.");
	r.toParagraph();

	t.append(App.UI.DOM.makeElement("h3", "Facilities"));
	r.push("These upgrades unlock the various facilities, which are detailed", link("here.", "Facilities Overview"));
	r.toParagraph();

	t.append(App.UI.DOM.makeElement("h3", "Penthouse Improvements"));
	r.push("The master suite and Head Girl suite options function like facilities. The master suite is the facility for the fucktoy assignment, and the Head Girl suite can house a single slave for her use.");
	r.toNode("div");

	App.Events.addNode(t, [highlight("Kitchen upgrade:", ["bold", "note"]), "this increases the chances of success for dieting and opens up additional dietary options."], "div", ["indent"]);
	App.Events.addNode(t, [highlight("Feeding phalli:", ["bold", "note"]), "unbroken slaves will find this disgusting, but it can cause beneficial oral fetishes to appear."], "div", ["indent"]);
	App.Events.addNode(t, [highlight("Drug fuckmachines:", ["bold", "note"]), "unbroken slaves will resent this, but it may cause beneficial anal fetishes to appear."], "div", ["indent"]);
	App.Events.addNode(t, [highlight("Personal armory:", ["bold", "note"]), "unlocks bodyguard options on the main menu."], "div", ["indent"]);
	App.Events.addNode(t, [highlight("Pharmaceutical Fabricator:", ["bold", "note"]), "requires a lot of", link("reputation", "Arcologies and Reputation"), "green", "to buy and use; unlocks powerful drug upgrades."], "div", ["indent"]);
	App.Events.addNode(t, [highlight("Surgery upgrade:", ["bold", "note"]), "enables several extreme surgical options like virginity restoration and hermaphrodite creation."], "div", ["indent"]);
	App.Events.addNode(t, [highlight("Media Hub:", ["bold", "note"]), "allows you to produce, encode, and stream videos of your slaves' daily lives to popular online pornography sites."], "div", ["indent"]);

	t.append(App.UI.DOM.makeElement("h3", "Special Upgrades"));
	r.push("Upgrades obtained during special events are listed here for reference. They cannot be purchased normally. Week:");
	r.toNode("div");
	App.Events.addNode(t, [highlight("24:"), "Arming yourself and or your", link("drones", "Security Drones"), "if installed."], "div", ["indent"]);
	App.Events.addNode(t, [highlight("62:"), "Establishing mercs."], "div", ["indent"]);
	App.Events.addNode(t, [highlight("65:"), "Giving your established mercs a unique title."], "div", ["indent"]);
	App.Events.addNode(t, [highlight("72 or later:"), "Establish the", link("Special Force"), "(if the mod is enabled)."], "div", ["indent"]);

	return t;
}, "X-SeriesArcology");

App.Encyclopedia.addArticle("Personal Assistant", function() {
	const t = new DocumentFragment();
	const r = new SpacedTextAccumulator(t);

	App.Events.addNode(t, [`${properTitle()}, "I am your personal assistant."`], "p", "note");

	r.push("Though I am a highly advanced program, I am not a true AI. I am neither sentient nor self-aware. My chief usefulness lies in my computing power, which is sufficient to run the arcology and all of its systems, and to monitor its huge suite of internal sensors. If it happens here, I know about it, and if it's important, I'll tell you. Through me, you are effectively omniscient within your arcology. Omnipotence will have to wait until I implant your slaves with control chips to convert them into my mindless fuckpuppet soldiery.");
	r.toNode("p", ["note"]);

	App.Events.addNode(t, ["That was a joke."], "p", "note");

	r.push("I have been watching you and your slaves with close attention, so I have one other function to mention. I have learned a little of what constitutes successful slave training and husbandry. If you select the 'Rules Assistant' option on the main menu, I will review the rules your slaves are under and address any obvious problems. For example, I will place all disobedient slaves under restrictive rules.");
	r.toNode("p", ["note"]);

	r.push("I would say that it is a pleasure to serve, but you are no doubt", App.UI.DOM.makeElement("span", "intelligent", ["cyan"]), `enough to know that I cannot feel pleasure, making that a pointless pleasantry. Good day, ${properTitle()}.`);
	r.toNode("p", ["note"]);

	return t;
}, "X-SeriesArcology");

App.Encyclopedia.addArticle("The Wardrobe", function() {
	const t = new DocumentFragment();
	const r = new SpacedTextAccumulator(t);

	r.push("The Wardrobe is a dressing area for all of your slaves, and a place where unused outfits are stored. Tailoring is available to make sure outfits fit each slave to your specifications. Here, players make choices about how slaves will appear in their dress, or lack of it. Choose outfits wisely to correspond to the culture that your citizens approve of, and your", App.Encyclopedia.link("reputation", "Arcologies and Reputation", "green"), "will increase more quickly. Items that stretch or constrict such as plugs or corsets will eventually have a lasting impact on slaves anatomy.");
	r.toNode("div", ["note"]);

	r.push("The wardrobe has two functions: First, individual slaves can be selected and then dressed in the wardrobe with anything from the basic clothing or shoes to the more exotic plugs and corsets. Secondly, players can access the wardrobe directly from the penthouse, and unlock collections of new outfits with ¤.");
	r.toParagraph();

	return t;
}, "X-SeriesArcology");

App.Encyclopedia.addArticle("The Auto Salon", function() {
	const t = new DocumentFragment();
	const r = new SpacedTextAccumulator(t);

	r.push("Your auto salon is similar to the studio and the remote surgery, but is far less intimidating.");
	r.push("It is set up like a single seat from an old world beauty salon, except that a series of manipulators descend from the ceiling towards the chair.");
	r.push("It can perform any of the usual cosmetic services. The only special capability it has is to automatically color coordinate nails and makeup with a slave's hair.");
	r.push("It is fashionable to apply color schemes to slaves, and this function will make following the trend easy. Your salon will cost");
	r.push(App.UI.DOM.makeElement("span", `${cashFormat(V.modCost)}`, ["yellowgreen"]), "per use. These procedures are not especially invasive, and you can perform as many of them as you wish during a single week without fear for your slave's health.");
	r.toNode("div", ["note"]);

	r.push("The auto salon is mostly available for the player's experimentation. Some combinations of cosmetic options can have minor effects on some assignments and events, but these are very marginal. Slaves' appearances will differ in many scenes and events based on the player's cosmetic choices, but these details are for flavor only. As usual, gameplay effects are usually called out in explicit colored text; if they aren't, no major gameplay effects are happening.");
	r.toParagraph();

	return t;
}, "X-SeriesArcology");

App.Encyclopedia.addArticle("The Body Mod Studio", function() {
	const t = new DocumentFragment();
	const r = new SpacedTextAccumulator(t);

	r.push("Your studio was sadly neglected by the previous owner of the arcology, but is in great shape and ready for use.");
	r.toNode("div", ["note"]);

	r.push("There are remote surgical and tattoo implements if you wish to hire an artist to do the work for you, but there are also sophisticated piercing and tattoo implements that can help you plan and apply the work yourself. Select a body part and a desired modification, and they'll do the rest.");
	r.toNode("p", ["note"]);

	r.push("Your equipment will cost", App.UI.DOM.makeElement("span", `${cashFormat(V.modCost)}`, ["yellowgreen"]), "per use. These procedures are not especially invasive, and you can perform as many of them as you wish during a single week without fear for your slave's health.");
	r.toNode("p", ["note"]);

	return t;
}, "X-SeriesArcology");

App.Encyclopedia.addArticle("The Remote Surgery", function() {
	const t = new DocumentFragment();
	const r = new SpacedTextAccumulator(t);

	r.push("Congratulations on your purchase of a Caduceus model remote surgical unit. This is the very last word in slave surgical alteration.");
	r.toParagraph();

	r.push("To use your remote surgery, simply strap a slave to the operating table and purchase surgical services. Any doctor can take control of the remote surgery by telepresence and operate on your slave. You have all the options of a modern hospital, right in the comfort of your own home.");
	r.toParagraph();

	App.Encyclopedia.addArticleSource(r.container(), "Owner's Manual, Remote Surgical Unit model 'Caduceus'");

	r.push("It will cost", App.UI.DOM.makeElement("span", `${cashFormat(V.surgeryCost)}`, ["yellowgreen"]), "to purchase a doctor's telepresence and keep the equipment charged with the necessary materials. These procedures are invasive and will reduce a slave's health. Use drugs or rest to counteract this.");
	r.toNode("p", ["note"]);

	return t;
}, "X-SeriesArcology");

App.Encyclopedia.addArticle("The Pharmaceutical Fab", function() {
	const t = new DocumentFragment();
	const r = new SpacedTextAccumulator(t);

	r.push("Pharmaceutical fabricators are the cutting edge of modern medicine. They are in short supply and are therefore ruinously expensive, but can greatly reduce the cost of maintaining a large stable of slaves by cutting drug overhead. They are also the only source of a new generation of advanced drugs that must be tailored to the individual patient's biochemistry.");
	r.toParagraph();

	App.Encyclopedia.addArticleSource(r.container(), "Pharmaceutical Review '32", "Dodgson, Jane Elizabeth");

	return t;
}, "X-SeriesArcology");

App.Encyclopedia.addArticle("Security Drones", function() {
	const t = new DocumentFragment();
	const r = new SpacedTextAccumulator(t);

	r.push("As built, X-Series arcologies are equipped with basic security systems, and a complement of maintenance and cleaning drones.");
	r.toNode("div", ["note"]);

	r.push("The infrastructure that supports these drones is designed to be easily retrofittable to support new designs and classes of drones. One optional upgrade that may suit some owners particularly well is the addition of security drones. These are radically different than the slow, robust utility drones.");
	r.toNode("p", ["note"]);

	r.push("The X-Series security drone is undergoing a yearly upgrade cycle, but the entire family has some major features in common. All are light, multi-rotor flying drones with between three and six propulsors. Generally speaking, they favor speed and ease of handling over armor or endurance.");
	r.toNode("p", ["note"]);

	r.push("Their mobility is such that they can typically reach any point within the arcology in minutes. They are robust to damage but unarmored, and generally carry payloads of between two and five kilograms. Since they are designed to operate within or very close to the arcology, they have an autonomous endurance of less than an hour.");
	r.toNode("p", ["note"]);

	r.push("Standard kit includes hardened communications links to the arcology's computer systems, loudspeakers for public interface, and nonlethal compliance systems including tasers and chemical emitters.");
	r.toNode("p", ["note"]);

	App.Encyclopedia.addArticleSource(r.container(), "X-Series Arcology Owners' Manual");
	r.toParagraph();

	return t;
}, "X-SeriesArcology");

App.Encyclopedia.addArticle("Water Filtration", function() {
	const t = new DocumentFragment();
	const r = new SpacedTextAccumulator(t);

	r.push(`X-Series arcologies are, in many ways, comparable to massive organisms. Under this metaphor, their circulatory systems include thousands of ${V.showInches === 2 ? 'miles' : 'kilometers'} of plumbing for water distribution and waste removal.`);
	r.toNode("div", ["note"]);

	r.push("The X-Series has established a new state of the art in arcology moisture reclamation. Air conditioning, hydrofarming, sewage treatment, and plumbing systems work together to recycle water with an efficiency greater than 99.99%. When combined with the arcology's skin, which is cleverly shaped to catch and retain almost all rain that falls on it, importing water will become a thing of the past.");
	r.toNode("p", ["note"]);

	r.push("This system is carefully balanced. It is designed to work for decades without major maintenance, but it is limited to a certain maximum population. Major upgrades will be necessary should the arcology population exceed this figure. Fortunately, the system is designed to be almost infinitely expandable.");
	r.toNode("p", ["note"]);

	r.push("Finally, the X-Series has been designed from the ground up by slaveowners, for slaveowners. The standard X-Series arcology is not equipped for dairy operations, but the water filtration system has been designed to support dairy upgrades. With minimal additions, X-Series owners will be able to Pasteurize and store a nearly unlimited quantity of nature's bounty.");
	r.toNode("p", ["note"]);

	App.Encyclopedia.addArticleSource(r.container(), "X-Series Arcology Owners' Manual");

	return t;
}, "X-SeriesArcology");

App.Encyclopedia.addArticle("Slave Nutrition", function() {
	const t = new DocumentFragment();
	const r = new SpacedTextAccumulator(t);

	r.push("Your X-Series arcology is designed to produce large quantities of high quality foodstuffs, from fresh vegetables to basic nutritive protein. The X-Series also produces the most advanced nutrition in the world. Our proprietary special slave nutrition system has been designed by slaveowners, for slaveowners, and truly makes the X-Series special.");
	r.toNode("div", ["note"]);

	r.push("This system produces a protein-rich drink that provides the physically active female body all its necessary nutrients. The artificial flavoring is specially designed to provide a palatable taste and texture while avoiding too much enjoyment and preventing excessive boredom. It supports a strong immune system and an energetic outlook.");
	r.toNode("p", ["note"]);

	r.push("It even causes a mild increase in sex drive. Our development team found that the slave body experiences a slight gain in libido merely from being so perfectly fed. It was simple and healthy to reinforce this effect with additives.");
	r.toNode("p", ["note"]);

	r.push("Our slave nutrition accomplishes all this while leaving the lower digestive tract extremely clean. We recommend your slaves undergo an occasional deep enema: under this regimen, slaveowners can be forgiven for forgetting that their slaves' anuses are involved in digestion at all. The designers of the X-Series trust that their clients can find other uses for them.");
	r.toNode("p", ["note"]);

	App.Encyclopedia.addArticleSource(r.container(), "X-Series Arcology Owners' Manual");

	return t;
}, "X-SeriesArcology");

App.Encyclopedia.addArticle("Media Hub", function() {
	const r = new SpacedTextAccumulator();

	r.push("Not everyone can be a Free Cities titan. But thanks to the power of the internet, everyone can watch!");
	r.toNode("div", ["note"]);

	App.Encyclopedia.addArticleSource(r.container(), `Porn Insider magazine, October 2035: "Free Cities Pornography: a new era of sex slave voyeurism"`);

	r.push("Constructing and upgrading the Media Hub allows you to produce and stream pornographic videos featuring your slaves for the world to see (and pay for).");
	r.toParagraph();

	r.push("Slaves featured in pornography will gain viewers and fame over time. Some may even become world-famous porn stars in their own right, with a little help.");
	r.toParagraph();

	r.push("Slaves with pretty faces will gain viewership significantly faster. Particularly ugly slaves may benefit from having their faces covered with a mask, or covered by a", App.Encyclopedia.link("fuckdoll", "Fuckdolls"), "suit.");
	r.push("Viewership can also be driven by investing cash in promotion and advertising, or by search engine optimization and feed hacking.");
	r.toParagraph();

	r.push("Slaves will produce porn in a variety of genres based on their characteristics. By default, her viewers will decide what she focuses on with their views and credits, but you can upgrade the media hub to allow you to choose a particular genre for a slave to focus on. Having too many slaves focusing on a particular genre will decrease the ability of that genre to draw new viewers. Genres associated with", App.Encyclopedia.link("paraphilias", "Paraphilias Overview"), "will have their viewership increase fastest, followed by", App.Encyclopedia.link("fetish", "Fetishes"), "genres. More general genres (such as those based on age, weight, and build) grow slowly, and genres associated with sexual", App.Encyclopedia.link("quirks", "Quirks"), "grow slowest of all, and are likely to require investment to promote.");
	r.toParagraph();

	r.push("If you stop producing porn of a particular slave, her viewership will decline over time, until she is once again unknown.");
	r.toParagraph();

	return r.container();
}, "X-SeriesArcology");

App.Encyclopedia.addCategory("X-SeriesArcology", function(currentArticle) {
	const r = [];
	if (currentArticle !== "The X-Series Arcology") {
		r.push(App.Encyclopedia.link("The X-Series Arcology"));
	}
	r.push(App.Encyclopedia.link("What the Upgrades Do"));
	r.push(App.Encyclopedia.link("Personal Assistant"));
	r.push(App.Encyclopedia.link("The Wardrobe"));
	r.push(App.Encyclopedia.link("The Auto Salon"));
	r.push(App.Encyclopedia.link("The Body Mod Studio"));
	r.push(App.Encyclopedia.link("The Remote Surgery"));
	r.push(App.Encyclopedia.link("The Pharmaceutical Fab"));
	r.push(App.Encyclopedia.link("Security Drones"));
	r.push(App.Encyclopedia.link("Water Filtration"));
	r.push(App.Encyclopedia.link("Slave Nutrition"));
	return App.UI.DOM.generateLinksStrip(r);
});
