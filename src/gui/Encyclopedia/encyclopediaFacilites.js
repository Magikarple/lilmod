// cSpell:ignore devs, FCHW

App.Encyclopedia.addArticle("Facilities Overview", function() {
	const basic = [App.Encyclopedia.link("Arcade"), App.Encyclopedia.link("Brothel"), App.Encyclopedia.link("Club"), App.Encyclopedia.link("Dairy"), App.Encyclopedia.link("Servants' Quarters")];
	const unique = [App.Encyclopedia.link("Head Girl Suite"), App.Encyclopedia.link("Master Suite"), App.Encyclopedia.link("Farmyard"), App.Encyclopedia.link("Incubation Facility", "The Incubation Facility"), App.Encyclopedia.link("Pit")];
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push("The arcology can be upgraded with a variety of facilities for slaves to live and work from. Each of the facilities is associated with an assignment. Sending a slave to a facility removes her from the main menu, removes her from the end of week report, and automates most management of her. Her clothes, drugs, rules, and other management tools are automatically run by the facility. However, her impact on your affairs will be substantially the same as if she were assigned to the corresponding assignment outside the facility. This means that things like", App.Encyclopedia.link("reputation", "Arcologies and Reputation", "green"), "effects, future society developments, and branding are all still active.");
	r.toParagraph();

	r.push("Use facilities sparingly until you're familiar with what assignments do so you don't miss important information. When you're confident enough to ignore a slave for long periods, sending her to a facility becomes a good option. Sending a slave to a facility heavily reduces the player's interaction with her, keeps the main menu and end week report manageable, and prevents most events from featuring her, which can be useful when she's so well trained that events aren't as beneficial for her. Also, many facilities have leadership positions that can apply powerful multipliers to a slave's performance.");
	r.toParagraph();

	r.push("The", App.UI.DOM.toSentence(basic), "all correspond to basic productive assignments.");
	r.push("The",  App.UI.DOM.toSentence([App.Encyclopedia.link("Spa"), App.Encyclopedia.link("Cellblock"), App.Encyclopedia.link("Schoolroom")]), "are a little different in that they focus on improving their occupants rather than producing something useful, since they correspond to the rest, confinement, and class assignments.");
	r.push("As such, only slaves that can benefit from these facilities' services can be sent to them. When slaves in these facilities have received all the benefits they can from the facility, they will be automatically ejected, assigned to rest, and returned to the main menu.");
	r.push("The", App.UI.DOM.toSentence(unique), "are all completely unique.");
	r.toParagraph();
	return f;
}, "facilities");

App.Encyclopedia.addArticle("Arcade", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push("It is every slave's final duty to go into the arcade, and to become one with all the arcology.");
	r.toNode("div", ["note"]);
	App.Events.addNode(f, ["— Anonymous slaveowner", "note"], "div", ["indent"]);

	r.push(`The arcade (sometimes colloquially referred to as "the wallbutts") is an excellent example of one of the many ideas that was confined to the realm of erotic fantasy until modern slavery began to take shape. It has rapidly turned from an imaginary fetishistic construction into a common sight in the more 'industrial' slaveowning arcologies. Most arcades are built to do one thing: derive profit from the holes of low-value slaves.`);
	r.toNode("p", ["note"]);

	r.push("Upon entering an arcade, one is typically presented with a clean, utilitarian wall like in a well-kept public restroom. Some have stalls, but many do not. In either case, at intervals along this wall, slaves' naked hindquarters protrude through. They are completely restrained on the inside of the wall, and available for use. Usually, the wall has an opposite side on which the slaves' throats may be accessed. The slaves' holes are cleaned either by mechanisms that withdraw them into the wall for the purpose, shields which extend between uses, or rarely, by attendants.");
	r.toNode("p", ["note"]);

	r.push("Arcades have become so common that most arcade owners attempt to differentiate themselves with something special. Some arcades have only a low wall so that conversations may be had between persons using either end of a slave; business meetings are an advertised possibility. Many specialize in a specific genital arrangement; others shield the pubic area so as to completely disguise it, reducing the slaves' identities to an anus and a throat only. Some attempt to improve patrons' experiences by using slaves who retain enough competence to do more than simply accept penetration, while others pursue the same goal by applying muscular electrostimulus for a tightening effect.");
	r.toNode("p", ["note"]);

	App.Encyclopedia.addArticleSource(r.container(), "Guide to Modern Slavery, 2037 Edition", "Lawrence, W. G.");

	r.push("The", App.UI.DOM.makeElement("span", "Arcade", ["bold"]), "is the", noteFacilityName(App.Encyclopedia.link("Glory hole"), " facility."));
	r.push("Extracts", App.Encyclopedia.link("money", "Money", "yellowgreen"), "from slaves; has extremely deleterious mental and physical effects.");
	r.push("Arcades can be furnished according to", App.Encyclopedia.link("future society", "Future Societies"), "styles, and doing so will add a tiny amount of future society progress for each customer who visits.");
	r.toNode("div");
	return f;
}, "facilities");

App.Encyclopedia.addArticle("Brothel", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push("The", App.UI.DOM.makeElement("span", "Brothel", ["bold"]), "is the", noteFacilityName(App.Encyclopedia.link("Whoring"), "facility."));
	r.push("Slaves will make", App.Encyclopedia.link("money", "Money", "yellowgreen"), "based on beauty and skills.");
	r.push("Brothels can be the subject of an", App.Encyclopedia.link("ad campaign.", "Advertising"));
	r.push("Brothels can be furnished according to", App.Encyclopedia.link("future society", "Future Societies"), "styles, and doing so will add a tiny amount of future society progress for each customer who visits.");
	r.toNode("div");
	return f;
}, "facilities");

App.Encyclopedia.addArticle("Cellblock", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push("The", App.UI.DOM.makeElement("span", "Cellblock", ["bold"]), "is the", noteFacilityName(App.Encyclopedia.link("Confinement"), "facility."));
	r.push("Will break slaves and return them to the main menu after they are obedient.");
	r.push("The Cellblock can be furnished according to", App.Encyclopedia.link("future society", "Future Societies"), "styles, and doing so will add a slight", App.Encyclopedia.link("devotion", "From Rebellious to Devoted", "hotpink"), "boost to slaves incarcerated there.");
	r.toNode("div");
	return f;
}, "facilities");

App.Encyclopedia.addArticle("Clinic", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push("The", App.UI.DOM.makeElement("span", "Clinic", ["bold"]), "is one of two", noteFacilityName(App.Encyclopedia.link("Rest"), "facilities,"), "it focuses on slaves' health.");
	r.push("The Clinic will treat slaves until they are", App.Encyclopedia.link("Healthy", "Health"), ",", "and will cure both injuries and illness.");
	r.push("The Clinic can be furnished according to", App.Encyclopedia.link("future society", "Future Societies"), "styles, and doing so will add a slight", App.Encyclopedia.link("devotion", "From Rebellious to Devoted", "hotpink"), "boost to slaves getting treatment there.");
	r.toNode("div");
	return f;
}, "facilities");

App.Encyclopedia.addArticle("Club", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push("The", App.UI.DOM.makeElement("span", "Club", ["bold"]), "is the", noteFacilityName(App.Encyclopedia.link("Public Service"), "facility."));
	r.push("Slaves will generate", App.Encyclopedia.link("reputation", "Arcologies and Reputation", "green"), "based on beauty and skills.");
	r.push("Clubs can be the subject of an", App.Encyclopedia.link("ad campaign.", "Advertising"));
	r.push("Clubs can be furnished according to", App.Encyclopedia.link("future society", "Future Societies"), "styles, and doing so will add a tiny amount of future society progress for each citizen who visits.");
	r.toNode("div");
	return f;
}, "facilities");

App.Encyclopedia.addArticle("Dairy", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push("This is the very first", App.UI.DOM.makeElement("span", "Free Cities Husbandry Weekly", ["note"]), "ever.");
	r.push("I'm Val Banaszewski, and I'm the FCHW staff writer for dairy and dairy-related subjects. So, why do I do this, and why should you? Human breast milk is never going to be as", App.Encyclopedia.link("cheap", "Money", "yellowgreen"), "and common as normal milk. Why bother?");
	r.toNode("div", ["note"]);

	r.push("First, it's really tasty! If you've never tried it, put FCHW no. 1 down now and go try it. Buy it bottled if you have to, but make an effort to take your first drink right from the teat. You'll only ever take your first sip of mother's milk once, and it should really be special. Everyone describes it a little differently, but I'd say it's a warm, rich and comforting milk with vanilla and nutty flavors.");
	r.toNode("p", ["note"]);

	r.push("Second, it's sexy! Decadence is in, folks. Many people move to the Free Cities to get away from the old world, but some come here to experience real freedom. The experience of drinking a woman's milk before, during, and after you use her just isn't something you pass up. Try it today.");
	r.toNode("p", ["note"]);

	App.Encyclopedia.addArticleSource(r.container(), "Free Cities Husbandry Weekly, February 2, 2032", "Banaszewski, Valerie P.");

	r.push("The", App.UI.DOM.makeElement("span", "Dairy", ["bold"]), "is the", noteFacilityName(App.Encyclopedia.link("Milking"), "facility."));
	r.push(`Only lactating ${V.seeDicks > 0 ? '' : 'or semen producing'} slaves can be assigned; will use drugs to increase natural breast size${V.seeDicks > 0 ? ' and ball size, if present' : ''}.`);
	r.push("All Dairy upgrades have three settings, once installed: Inactive, Active, and Industrial. Inactive and Active are self-explanatory. Industrial settings require that the restraint upgrade be installed and maximized, and that extreme content be enabled. They massively improve production, but will produce severe mental and physical damage. Younger slaves will be able to survive more intense industrial output, but drug side effects will eventually force an increasingly large fraction of drug focus towards curing the slave's ills, reducing production. Dairies can be furnished according to", App.Encyclopedia.link("future society", "Future Societies"), "styles, and doing so will add a tiny amount of future society progress for each unit of fluid produced.");
	r.toParagraph();
	return f;
}, "facilities");

App.Encyclopedia.addArticle("Head Girl Suite", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push("The", App.UI.DOM.makeElement("span", "Head Girl Suite"), "is a", App.UI.DOM.makeElement("span", "unique facility.", ["note"]));
	r.push("Only a single slave can be assigned, and this slave will be subject to the", App.Encyclopedia.link("Head Girl"), "'s decisions rather than the player's.");
	r.toNode("div");
	return f;
}, "facilities");

App.Encyclopedia.addArticle("Master Suite", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push("The", App.UI.DOM.makeElement("span", "Master Suite", ["bold"]), "is the", noteFacilityName(App.Encyclopedia.link("Fucktoy"), "facility."));
	r.push("Slaves will generate", App.Encyclopedia.link("reputation", "Arcologies and Reputation", "green"), "but at a lower efficiency than on the club. The Suite can be furnished according to", App.Encyclopedia.link("future society", "Future Societies"), "styles, and doing so will add a slight", App.Encyclopedia.link("devotion", "From Rebellious to Devoted", "hotpink"), "boost to slaves serving there.");
	r.toNode("div");
	return f;
}, "facilities");

App.Encyclopedia.addArticle("Pit", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push("The", App.UI.DOM.makeElement("span", "Pit", ["bold"]), "is a", App.UI.DOM.makeElement("span", "unique facility.", ["note"]));
	r.push("Unique in that slaves can perform standard duties in addition to being scheduled for fights in this facility.");
	r.toNode("div");
	return f;
}, "facilities");

App.Encyclopedia.addArticle("Schoolroom", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push("The", App.UI.DOM.makeElement("span", "Schoolroom", ["bold"]), "is the", noteFacilityName(App.Encyclopedia.link("Learning", "Attending Classes"), "facility."));
	r.push("Will educate slaves and return them to the penthouse after they are educated. The Schoolroom can be furnished according to", App.Encyclopedia.link("future society", "Future Societies"), "styles, and doing so will add a slight", App.Encyclopedia.link("devotion", "From Rebellious to Devoted", "hotpink"), "boost to slaves studying there.");
	r.toNode("div");
	return f;
}, "facilities");

App.Encyclopedia.addArticle("Servants' Quarters", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push("The", App.UI.DOM.makeElement("span", "Servants' Quarters", ["bold"]), "is the", noteFacilityName(App.Encyclopedia.link("Servitude"), "facility."));
	r.push("Reduces weekly upkeep according to servants' obedience. Accepts most slaves and is insensitive to beauty and skills. The Quarters can be furnished according to", App.Encyclopedia.link("future society", "Future Societies"), "styles, and doing so will add a slight", App.Encyclopedia.link("devotion", "From Rebellious to Devoted", "hotpink"), "boost to slaves serving there.");
	r.toNode("div");
	return f;
}, "facilities");

App.Encyclopedia.addArticle("Spa", function() {
	const spaConditions = [App.Encyclopedia.link("Healthy", "Health"), "happy", App.Encyclopedia.link("free of flaws.", "Flaws")];
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push("The", App.UI.DOM.makeElement("span", "Spa", ["bold"]), "is one of two", noteFacilityName(App.Encyclopedia.link("Rest"), "facilities;"), "it focuses on slaves' mental well-being.");
	r.push("The Spa will heal, rest, and reassure slaves until they are at least reasonably", App.UI.DOM.toSentence(spaConditions), "The Spa can be furnished according to", App.Encyclopedia.link("future society", "Future Societies"), "styles, and doing so will add a slight", App.Encyclopedia.link("devotion", "From Rebellious to Devoted", "hotpink"), "boost to slaves resting there.");
	r.toNode("div");
	return f;
}, "facilities");

App.Encyclopedia.addArticle("Nursery", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push("The", App.UI.DOM.makeElement("span", "Nursery", ["bold"]), "is used to raise children from birth naturally. Once a spot is reserved for the child, they will be placed in the Nursery upon birth and ejected once they are old enough. The Nursery can be furnished according to", App.Encyclopedia.link("future society", "Future Societies"), "styles, and doing so can add a slight", App.Encyclopedia.link("devotion", "From Rebellious to Devoted", "hotpink"), "boost to slaves working there.");
	r.toNode("div");
	return f;
}, "facilities");

App.Encyclopedia.addArticle("Farmyard", function() {
	// TODO: this will need more information
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push("The", App.UI.DOM.makeElement("span", "Farmyard", ["bold"]), "is where the majority of the", App.Encyclopedia.link("food"), `in your arcology is grown, once it is built. It also allows you to house animals${V.seeBestiality === 1 ? ', which you can have interact with your slaves' : ''}. The Farmyard can be furnished according to`, App.Encyclopedia.link("future society", "Future Societies"), "styles, and doing so can add a slight", App.Encyclopedia.link("devotion", "From Rebellious to Devoted", "hotpink"), "boost to slaves working there."); // TODO: this may need to be changed
	r.toNode("div");

	r.push("This entry still needs work and will be updated with more information as it matures. If this message is still here, remind one of the devs to remove it.");
	r.toNode("div", ["note"]);
	return f;
}, "facilities");

App.Encyclopedia.addArticle("Advertising", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push(App.UI.DOM.makeElement("span", "Ad campaigns", ["bold"]), "can be run for both the", App.Encyclopedia.link("Brothel"), "and the", App.Encyclopedia.link("Club.", "Club"));
	r.push("Naturally, these advertisements will feature lots of naked girls, providing the opportunity to give either facility a cachet for offering a specific kind of girl.");
	r.push("Under the default, nonspecific settings, all slaves in the facilities will receive minor bonuses to performance.");
	r.push("If specific body types are advertised, slaves that match the advertisements will receive an enhanced bonus, while slaves that do not will get a small penalty.");
	r.push("However, instituting a specific ad campaign will prevent slaves in that facility from getting", App.Encyclopedia.link("Variety"), "bonuses.");
	r.toNode("div");
	return f;
}, "facilities");

App.Encyclopedia.addArticle("Variety", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push(App.UI.DOM.makeElement("span", "Variety", ["bold"]), "bonuses are available for slaves in the", App.Encyclopedia.link("Brothel"), "and the", App.Encyclopedia.link("Club.", "Club"));
	r.push("Offering a variety of slaves will provide a small bonus to performance for everyone in the facility, regardless of which qualities they possess:");
	r.toNode("div");

	App.Events.addNode(f, ["Slim vs. Stacked"], "div", ["indent"]);
	App.Events.addNode(f, ["Modded (heavily pierced and tattooed) vs. Unmodded"], "div", ["indent"]);
	App.Events.addNode(f, ["Natural Assets vs. Implants"], "div", ["indent"]);
	App.Events.addNode(f, [`Young vs. Old${V.seeDicks !== 0 ? '- Pussies and Dicks' : ''}`], "div", ["indent"]);

	r.push("Variety bonuses, if any, will be called out in the facility report at the end of the week.", App.Encyclopedia.link("Advertising"), "that the facility specializes in any of these areas will supersede variety bonuses for the related qualities. Staffing a facility to appeal to all tastes can be more challenging than building a homogeneous stable and advertising it, but is both powerful and free.");
	r.toParagraph();
	return f;
}, "facilities");

App.Encyclopedia.addCategory("facilities", function() {
	const f = new DocumentFragment();
	let r = [];
	r.push(App.Encyclopedia.link("Overview", "Facilities Overview"));
	r.push(App.Encyclopedia.link("Arcade"));
	r.push(App.Encyclopedia.link("Brothel"));
	r.push(App.Encyclopedia.link("Cellblock"));
	r.push(App.Encyclopedia.link("Clinic"));
	r.push(App.Encyclopedia.link("Club"));
	r.push(App.Encyclopedia.link("Dairy"));
	r.push(App.Encyclopedia.link("Head Girl Suite"));
	r.push(App.Encyclopedia.link("Master Suite"));
	r.push(App.Encyclopedia.link("Pit"));
	r.push(App.Encyclopedia.link("Schoolroom"));
	r.push(App.Encyclopedia.link("Servants' Quarters"));
	r.push(App.Encyclopedia.link("Spa"));
	r.push(App.Encyclopedia.link("Nursery"));
	r.push(App.Encyclopedia.link("Farmyard"));
	r.push(App.Encyclopedia.link("The Incubation Facility"));
	App.Events.addNode(f, ["Arcology Facilities:", App.UI.DOM.generateLinksStrip(r)], "div");

	r = [];
	r.push(App.Encyclopedia.link("Advertising"));
	r.push(App.Encyclopedia.link("Variety"));
	App.Events.addNode(f, ["Facility Bonuses:", App.UI.DOM.generateLinksStrip(r)], "div", ["note"]);
	return f;
});

function noteFacilityName(...text) {
	const f = new DocumentFragment();
	App.Events.addNode(f, text, "span", ["note"]);
	return f;
}
