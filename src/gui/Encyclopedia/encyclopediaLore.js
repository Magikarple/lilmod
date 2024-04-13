// cSpell:ignore Bhalwi, al-sham, asmik, qalbik, abna, Sakhmat, damkun
// cSpell:ignore Feight, Quati, SCFC, Jens, entlemen

App.Encyclopedia.addArticle("Lore", function() {
	const f = new DocumentFragment();
	App.Events.addNode(f, [App.UI.DOM.makeElement("span", "Future room for lore text", ["note"])], "p");
	App.Events.addNode(f, ["Choose a more particular entry below:"], "div");
	return f;
}, "Lore");

App.Encyclopedia.addArticle("Money", function() {
	const t = new DocumentFragment();
	const r = new SpacedTextAccumulator(t);
	r.push("Digital currencies have come a long way in the past twenty years. From the poorly managed, excessively ideological, incompetently run experiments whose failures inspired years of public skepticism, they have matured into a reliable means of exchange. The technical details are unimportant for all but students of economics, since broad diversification and clever design have made them reliable and stable means of exchange. With so many old world currencies collapsing, they are coming to dominate world commerce at last.");
	r.toNode("div", ["note"]);

	r.push(`The diversified bundle of assets that constitutes the unit of exchange that allows the Free Cities to function is commonly referred to as the "credit" and denoted in print by a ¤ symbol. It is unusually valuable for a basic monetary unit, but the extreme wealth concentration seen in most of the Free Cities makes this a feature rather than a flaw. Estimating its value is extremely difficult, since the value of goods and services varies wildly between Free Cities, and even more wildly between any given Free City and the surrounding old world.`);
	r.toNode("p", ["note"]);

	r.push("Direct comparisons of purchasing power across long gulfs of time are often unscientific. Such comparisons usually rely on indexing currencies to a good or a market basket of goods, ignoring the constant shifts in the value of goods and services throughout history. The best that a responsible economist can do for a historical value of the ¤ is to give a range. Depending on the index good, the 2037 ¤ can be argued to be worth anywhere between thirty and several hundred US dollars.");
	r.toNode("p", ["note"]);

	r.push(`— St. Croix, Marianne, "Digital Currencies: A Review,"`, App.UI.DOM.makeElement("span", "Journal of Economics, March 2037", ["note"]));
	r.toNode("p", ["note"]);
	return t;
}, "Lore");

App.Encyclopedia.addArticle("Food", function() {
	const t = new DocumentFragment();
	const r = new SpacedTextAccumulator(t);
	r.push("An army marches on its stomach. Likewise, an arcology cannot function without sustenance.");
	r.toNode("div", ["note"]);
	r.push("Please expand this. I'm not good at writing lore. — DCoded");
	r.toNode("div", ["note"]);

	return t;
}, "Lore");

App.Encyclopedia.addArticle("Disease in the Free Cities", function() {
	const t = new DocumentFragment();
	const r = new SpacedTextAccumulator(t);
	r.push("In light of some recent alarmism, it's time for the medical profession to clear the air about diseases.");
	r.toNode("div", ["note"]);

	r.push("Over the course of the 21st century, diseases and disease treatments have become more powerful, side by side. New disease vectors, antibiotic resistances, and even malicious engineering have combined to make infectious agents tougher. However, medicine has advanced as well, with distributed fabrication techniques and genetic sequencing making tailored drugs widely available to those with the resources to afford them.");
	r.toNode("p", ["note"]);

	r.push("This sounds like balance. In the old world, however, it looks like the bugs may be winning. Life expectancy is beginning to settle to pre-antibiotic levels. Meanwhile, in the Free Cities, medicine is", App.Encyclopedia.link("nymphomania:", "Nymphomania"), "better health care and the ubiquity of modern medicine have nearly eliminated disease as a day-to-day concern.");
	r.toNode("p", ["note"]);

	r.push("If you want simple advice, here it is: fuck your Free Cities slaves bareback, but wrap up if you visit the old world.");
	r.toNode("p", ["note"]);

	r.push("— Dodgson, Jane Elizabeth,", App.UI.DOM.makeElement("span", "FC Med Today, March 25, 2032", ["note"]));
	r.toNode("p", ["note"]);

	return t;
}, "Lore");

App.Encyclopedia.addArticle("Free Cities Justice", function() {
	const t = new DocumentFragment();
	const r = new SpacedTextAccumulator(t);
	r.push("The Free Cities are not lawless.");
	r.toNode("div", ["note"]);

	r.push("The only law respected across all Cities is the enforcement of contracts. Some Cities have limited regulation of other areas, but in general, the only justice available comes when a contract has been breached.");
	r.toNode("p", ["note"]);

	r.push("Different Cities have taken different approaches to the obvious problem of dealing with criminal conduct, which in the old world breaks no traditional contract. The most common approach is to require everyone to sign contracts with the owners of their homes and workplaces to commit no crimes while there. In this way, what would be murder in the old world is a breach of the contract with one's landlord not to murder on his property.");
	r.toNode("p", ["note"]);

	r.push("Penalties for such conduct are usually left to the imagination of the property owner. With the traditional roles of judge, jury, and jailer concentrated into the hands of a single wealthy person, rich potentates of the Cities hold more personal power over their tenants than anyone since the great feudal lords seven centuries ago.");
	r.toNode("p", ["note"]);

	r.push("— Torstein, Jens Learned,", App.UI.DOM.makeElement("span", "The Modern Libertarian Paradise, March 25, 2032", ["note"]));
	r.toNode("p", ["note"]);

	return t;
}, "Lore");

App.Encyclopedia.addArticle("Modern Anal", function() {
	const t = new DocumentFragment();
	const r = new SpacedTextAccumulator(t);
	r.push("The modern acceptance and frequency of heterosexual anal sex has only increased with the return of slavery.");
	r.toNode("div", ["note"]);

	r.push("There are numerous reasons for this. First and most obviously, the fact that many men now own women and can thus dictate sexual relations has popularized a sex act that has always appealed to many men. Second, the extremely libertine culture of the Free Cities has placed slaveowners in a perpetual contest with one another for sexual decadence; voluntarily //not// using a slave in all possible manners is considered unusual and even prudish. Third, the assignment of some persons born without natural vaginas to status as female sex slaves has served to make standard the use of the orifice that all slaves, regardless of biological particulars, share in common.");
	r.toNode("p", ["note"]);

	r.push("Finally, the development of the now-common slave diet has played a part. In addition to providing slaves with bland, featureless and mildly aphrodisiac nutrition, standard slave nutriment is a cleverly designed liquid diet that almost completely stops the normal digestive processes that might interfere with sex of this kind.");
	r.toNode("p", ["note"]);

	r.push("— Lawrence, W. G.,", App.UI.DOM.makeElement("span", "Guide to Modern Slavery, 2037 Edition", ["note"]));
	r.toNode("p", ["note"]);

	return t;
}, "Lore");

App.Encyclopedia.addArticle("Slave Couture", function() {
	const t = new DocumentFragment();
	const r = new SpacedTextAccumulator(t);
	r.push("My name is Danni Diemen, and I'm here today to talk about your slaves' clothes.");
	r.toNode("div", ["note"]);

	r.push("Let's break it right down into categories, shall we?");
	r.toNode("p", ["note"]);

	r.push(App.UI.DOM.makeElement("span", "First, clothes for your disobedient bitches.", ["bold"]), "We must keep them uncomfortable, yes? The old reliable is slave clothes, sometimes referred to as straps. These give her that sex slave allure while keeping her nice and uncomfortable. You can also go for full coverage with latex. A suit of that will keep her totally reliant on your little whims. Plugs are nice sturdy leather affairs with inward-facing dildos for all the holes — and I do mean all. They're good stuff for breaking a bitch, and she might even learn to take dick a bit better! Word to the wise: not a good idea if you want those holes tight, though. Finally, corsets. These will make life tough, but that's good for a", App.Encyclopedia.link("rebellious", "From Rebellious to Devoted", "orangered"), "little cunt, no? And corseting might just narrow that waist. But never mind, on to my favorites.");
	r.toNode("p", ["note"]);

	r.push(App.UI.DOM.makeElement("span", "Second, nice attire for your prize stock.", ["bold"]), "These clothes will keep your good slaves happy. You know, women out in the old world still wear attractive lingerie UNDER clothing? Absurd. It's lovely on its own. If you're looking to be a bit more fun and a bit less classy, go for string lingerie instead. You could even let her choose her own slutty outfits; watching livestock dress itself is always good fun. When you can afford proper slutty jewelry, who needs clothes? I suggest accenting heavy piercings with this. For your hookah fanatics and decadent harem masters, there's sheer gauze. Makes even a clumsy girl look like she's dancing to a zither.");
	r.toNode("p", ["note"]);

	r.push("Finally, chastity belts. Hard to categorize. Different bitches react in different ways to having the front door locked. Depends on how much traffic goes in the back, I find.");
	r.toNode("p", ["note"]);

	r.push("— Van Diemen, D. C. G.,", App.UI.DOM.makeElement("span", "Free Cities Fashion (FCF), March 2032", ["note"]));
	r.toNode("p", ["note"]);

	return t;
}, "Lore");

App.Encyclopedia.addArticle("Slave Marriage", function() {
	const t = new DocumentFragment();
	const r = new SpacedTextAccumulator(t);
	r.push("Marriage between slaves is one of the facets of slave culture that has varied the most between historical slave societies. Many forbade it entirely, considering it a source of sedition. Others permitted it, but accorded it little force of law. A few have offered it some limited protections even against the slaveowner's will.");
	r.toNode("div", ["note"]);

	r.push("Most Free Cities fall into the middle case. Many slaveowners find it amusing to permit their slaves to form and even formalize long term relationships. Slave wives are often permitted to live and work together, sharing a little room and enjoying some measure of sexual exclusivity. Of course, it is just as common for slave wives to be marketed together in brothels.");
	r.toNode("p", ["note"]);

	r.push("To date, none of the Free Cities has extended any real legal protection to slave marriages. There is nothing to stop a slaveowner from separating slave wives by sale.");
	r.toNode("p", ["note"]);

	r.push("— Lawrence, W. G.,", App.UI.DOM.makeElement("span", "Guide to Modern Slavery, 2037 Edition", ["note"]));
	r.toNode("p", ["note"]);

	return t;
}, "Lore");

App.Encyclopedia.addArticle("The Ejaculate Market", function() {
	const t = new DocumentFragment();
	const r = new SpacedTextAccumulator(t);
	r.push("Fun has a price.");
	r.toNode("div", ["note"]);

	r.push("Understanding this is the only way to understand some emerging markets in the Free Cities. This maxim often receives criticism from the uninformed, but all it means is that enjoyment is a good (or service) that can be bought and sold like any other. The market for exotic varieties of fun has never been more open than it is right now.");
	r.toNode("p", ["note"]);

	r.push("The forming market for ejaculate can only be understood in this context. In the old world, a thriving market for semen for insemination purposes has been thriving for a long while. In the Free Cities, however, homogenized ejaculate is now available in quantities and at prices that make it obvious that it's being put to other uses. Semen is nutritionally marginal; it has some cosmetic applications, but like every other natural cosmetic it has long since been eclipsed by artificial means. The only possible explanation is that many citizens of the Free Cities find various combinations of slaves and large volumes of ejaculate an amusing combination.");
	r.toNode("p", ["note"]);

	r.push("Anecdotes abound. Some slaveowners claim that using it as a dietary additive with the knowledge of their slaves enforces an extra layer of degradation and sexual servitude while habituating the unfortunates to oral sex.");
	r.toNode("p", ["note"]);

	r.push("— Editorial,", App.UI.DOM.makeElement("span", "FC Daily Economic Report, October 13, 2031", ["note"]));
	r.toNode("p", ["note"]);

	return t;
}, "Lore");

App.Encyclopedia.addArticle("Gingering", function() {
	const t = new DocumentFragment();
	const r = new SpacedTextAccumulator(t);
	r.push("Like much of the traditional husbandry terminology, 'gingering' is a term whose meaning in the Free Cities is slowly diverging from its original old world definition. In animal husbandry, especially of horses, gingering is the nearly extinct practice of placing an irritant compound (traditionally ginger, hence the term) inside one of the animal's orifices, typically the anus, in order to make the animal step high, be sprightly, and generally behave energetically due to the discomfort. Though it was sometimes used at shows and competitions, the usual application was to make the animal seem more valuable for sale.");
	r.toNode("div", ["note"]);

	r.push("In the Free Cities, 'gingering' is coming to mean any drugging or other temporary adulteration of a slave in order to make her seem more valuable. For poorly broken slaves, stimulants and depressants are both common. These can be applied to make a resistant slave seem less", App.Encyclopedia.link("rebellious,", "From Rebellious to Devoted", "hotpink"), "or a terrified slave more", App.Encyclopedia.link("trusting,", "Trust", "mediumaquamarine"), "though of course this is unreliable.");
	r.toNode("p", ["note"]);

	r.push("More traditional gingering is also sometimes applied. Many new slaves will naturally present their buttocks if an anal irritant is administered in an attempt to relieve the uncomfortable area. Novices to the slave markets may mistake this for sexual promiscuity, though few experienced brokers are likely to be misled, a clue as to why few experienced brokers seriously oppose gingering.");
	r.toNode("p", ["note"]);

	r.push("Some markets attempt to stamp out the practice, but most do not. It is generally accepted as permissible gamesmanship on the part of slave vendors, part of the natural skirmishing between buyers and sellers. In some areas it may even be considered lazy and even offensive for a seller to not doctor his human wares: it denies the buyer an opportunity to exercise his acumen in discovering what has been administered, and might even indicate that the seller is not making an effort in more important areas, too. Finally, many in the Free Cities might ask what proper slave dealer would willingly forgo the amusing sight of a girl bouncing with discomfort because someone has just roughly inserted a finger coated with ginger oil into her rectum.");
	r.toNode("p", ["note"]);

	r.push("— Lawrence, W. G.,", App.UI.DOM.makeElement("span", "Guide to Modern Slavery, 2037 Edition", ["note"]));
	r.toNode("p", ["note"]);

	return t;
}, "Lore");

App.Encyclopedia.addArticle("Dyes", function() {
	const approvedDyes = ["blazing red", "neon green", "neon blue", "neon pink", "platinum blonde", "dark brown", "brown", "auburn", "black", "blonde", "blue", "burgundy", "chestnut", "chocolate", "copper", "ginger", "golden", "green", "grey", "hazel", "pink", "red", "blue-violet", "purple", "dark orchid", "sea green", "green-yellow", "dark blue", "jet black", "silver"];
	const t = new DocumentFragment();
	const r = new SpacedTextAccumulator(t);
	r.push(`Fantastic news for every fashion oriented citizen and slaveowner: Your slave's hair color must no longer be exclusively chosen by one the bland authority-approved colors: ${toSentence(approvedDyes)}.`);
	r.toNode("div", ["note"]);

	r.push(`Today, we are proud to announce that our, the Free Cities Dyes Department, Research and Development team, found 140 new and exciting ways to color your slave's capital hair. The <a target="_blank" href="https://www.w3schools.com/colors/colors_names.asp">extensive list</a> with the names of all the available colors will be made available to the public, soon.`);
	r.toNode("p", ["note"]);

	r.push(`Please be aware, when you place your order on a custom dye, your description should be precise. Preparing, mixing and shipping is a fully automated process. You may put spaces into the color name. For example, "dark violet" will be handled as "darkviolet". Be sure to put the desired color at the beginning of your description. "Dark violet with silver highlights" is a solid description. Avoid anything too exotic or convoluted. With a description like "weird-ass color with a reddish tint", you will probably end up with red hair. Our guesswork is only so good.`);
	r.toNode("p", ["note"]);

	r.push("We hope to extend the applicability to body hair and even skin in the near future, too.");
	r.toNode("p", ["note"]);

	r.push(`- Free Cities Dyes Department R&amp;D, "Announcing exciting Dyes of the Future,"`, App.UI.DOM.makeElement("span", "Press Conference, January 7th 2037", ["note"]));
	r.toNode("p", ["note"]);

	return t;
}, "Lore");

App.Encyclopedia.addArticle("The New Rome", function() {
	const t = new DocumentFragment();
	const r = new SpacedTextAccumulator(t);
	r.push(App.UI.DOM.makeElement("span", "SCFC", ["note"]));
	r.toNode("div", ["note"]);
	App.Events.addNode(t, [`— Free Cities armor pauldron inscription; "Slaveholders and Citizens of the Free Cities"`], "div", ["note"]);

	r.push("In the Free Cities, Rome is come again.");
	r.toNode("p", ["note"]);

	r.push("No people before or since have influenced modern society so deeply as the Romans. The Free Cities are, in return, emulating the Romans more deeply than any other society since their time. Based on the writings, great and low, that have come down to us from that innovative, grasping, and deeply licentious people, it seems that the Romans would likely approve of their posterity.");
	r.toNode("p", ["note"]);

	r.push("Fine historical parallels are probably lost on the person with XY chromosomes who is brought to the Free Cities, enslaved, treated thenceforth as female, and expected to behave as female on pain of severe punishment (sometimes with gender reassignment surgery to match, but often without). This redefinition of gender is common in the Free Cities: being penetrated makes one female, while penetrating makes one male. It almost certainly arose as a way for citizens to partake in all that a slave society has to offer, sexually, without reconsidering their own sexual identity. It is not identical to Roman sexual mores, but the Romans are the closest precedent.");
	r.toNode("p", ["note"]);

	r.push("This new and evolving system of sexual values does not free citizens from all expectations. Quite to the contrary, many find it just as restrictive as old world values, although differently so. For example, a naturally heterosexual female arcology owner who indulges in vanilla sex with masculine slaves will typically find her strength and acumen being questioned for no other reason than that she permits slaves to penetrate her.");
	r.toNode("p", ["note"]);
	App.Events.addNode(t, ["— Lawrence, J. K., and Bolingbroke, D. S.,", App.UI.DOM.makeElement("span", "Trends in Free Cities Culture, 2031", ["underline"]), App.UI.DOM.makeElement("span", "Journal of Modern Social Sciences, International Edition, February 2032", ["note"])], "p", ["note"]);

	return t;
}, "Lore");

App.Encyclopedia.addArticle("The Return of Feudalism", function() {
	const t = new DocumentFragment();
	const r = new SpacedTextAccumulator(t);
	r.push("By the Powers invested in me by the Board of Directors and the Rightful Executive Lord of Arcology F-8, His Majesty King William the First, I proclaim you a Knight, and grant you the right to two slaves, a monthly stipend of six hundred credits and one unit of stock in the Arcology, and the authority to bear a noble Coat of Arms...");
	r.toNode("div", ["note"]);
	App.Events.addNode(t, [App.UI.DOM.makeElement("span", "— Count Felix II von Feight, Knighthood Ceremony recorded in 2032", ["note"])], "div", ["indent"]);

	r.push("Once thought to have been a relic of an ancient, less enlightened time, the simultaneously decentralized and individual-focused corporate power structures of the Free Cities has led to the return of feudal power structures. For many arcologies, this has simply occurred without attention or fanfare, as increasingly serf-like underclasses accept the domination of ever-more-powerful executives and elites; some arcologies, such as F-8, have manifested entire, complex new social systems involving 'Kings' and 'Emperors' from which all corporate authority flows.");
	r.toNode("div", ["note"]);

	r.push("Originally the idea of an individual crowning himself absolute 'Emperor' of a free city seemed absurd, or even totalitarian, and the first Free City petty kings were met with mockery. This mocking tone appears to have quickly faded from popular Free Cities culture, however, likely due to the realization that new 'Imperial' power structures came with a host of benefits to the wealthy and elite of the arcology that adopts them.");
	r.toNode("div", ["note"]);

	r.push("More than simply being rich, the elites of Neo-Feudal, or Neo-Imperial arcologies dub themselves 'Barons' and 'Counts', putting themselves not only monetarily but also socially above the common masses and giving those who hold seats on boards of directors or invest stock in the arcology a physical advantage over their benighted underlings. To the common citizen, the result is ultimately the same, as a factory worker remains a peasant whether he's known as a serf or a citizen. But to the wealthy and distinct within the arcology, the new Feudalism creates a long list of titles and accomplishments to jockey for, manifesting a strange new culture in which junior executives compete with one another for the attention of outright 'Kings' in the hope of one day acquiring the limitless prestige felt by the select caste of neo-Imperial nobility.");
	r.toNode("div", ["note"]);

	App.Events.addNode(t, ["— Lawrence, J. K., and Bolingbroke, D. S.,", App.UI.DOM.makeElement("span", "Trends in Free Cities Culture, 2031", ["underline"]), App.UI.DOM.makeElement("span", "Journal of Modern Social Sciences, International Edition, February 2032", ["note"])], "div", ["note"]);

	return t;
}, "Lore");

App.Encyclopedia.addArticle("Naked, Barefoot, and Pregnant", function() {
	const t = new DocumentFragment();
	const r = new SpacedTextAccumulator(t);
	r.push("...and helpless, and illiterate, and dependent...");
	r.toNode("div", ["note"]);
	App.Events.addNode(t, ["— Anonymous slaveowner, on the ideal woman"], "div", ["indent", "note"]);

	r.push("It must be admitted that some of the boldest statements of early 21st century social justice advocates are now receiving some justification in the Free Cities. A tourist visiting some of the more notorious arcologies is given a public, in-person lesson in precisely what some men are willing to do with women they own. For every misogynist credo there is a Free Cities slaveowner putting it into practice.");
	r.toNode("p", ["note"]);

	r.push("Recent reactionism spawned by 20th century social movements pales in comparison to traditionalism, however. Reactionaries of the early 21st century may have breathlessly taken some extreme positions, but for a return to traditional values, true traditionalists have proven themselves to be the unquestioned masters. There are certainly arcologies in which no free women are permitted. The authors recommend that anyone inclined to hold such arcologies up as the extreme by which all others are to be judged should first visit one of the few arcologies in which no free women are permitted,", App.UI.DOM.makeElement("span", "and", ["note"]), "no contraceptives of any kind are permitted, either.");
	r.toNode("p", ["note"]);
	App.Events.addNode(t, ["— Lawrence, J. K., and Bolingbroke, D. S.,", App.UI.DOM.makeElement("span", "Trends in Free Cities Culture, 2031", ["underline"]), App.UI.DOM.makeElement("span", "Journal of Modern Social Sciences, International Edition, February 2032", ["note"])], "p", ["indent", "note"]);

	return t;
}, "Lore");

App.Encyclopedia.addArticle("The Sons of Sekhmet", function() {
	const t = new DocumentFragment();
	const r = new SpacedTextAccumulator(t);
	r.push("Bhalwi al-sham asmik qalbik, abna Sakhmat damkun. (By the Sun I grasp your Heart, the Sons of Sekhmet have your Blood.)");
	r.toNode("div", ["note"]);
	App.Events.addNode(t, ["— Mantra, unknown author"], "div", ["indent", "note"]);

	r.push(`Described as the "logical continuation of terrorism within the new world" by a prominent arcology owner, The Sons of Sekhmet are a global terrorist organization notorious for its viciousness and worldwide strike capacity. Formed in 2018 by Quati ibn Malek, the leader of a relatively minor sect of cat worshippers within Egypt, the Sons gained notoriety for seizing one of the first arcology clusters in the Sahara Desert and defending it from multiple incursions by old world peacekeeping forces. Ibn Malek was successfully assassinated by the Egyptian government in 2024, but the Sons have been resilient to being dislodged from their desert stronghold, and have used the resources of an arcology cluster to expand their presence and doctrine onto the global stage.`);
	r.toNode("p", ["note"]);

	r.push(`Their use of cell tactics and frequent insurgent action against arcology owners has led to comparisons with the Daughters of Liberty, but this is a misguided comparison. Where the Daughters are an ideologically-motivated anti-slavery organization, the Sons long ago cast off their ideological roots to adopt a brutal, pragmatic approach to terrorism with few considerations other than the expansion of their own power; Sekhmet cells frequently use slaves as foot soldiers and suicide bombers, but their primary approach to recruitment is with the poor and downtrodden of arcologies and old world nations. Basic Sons doctrine holds that the Old World was destroyed by wealthy, hedonistic plutocrats who have fled their failed nations to the arcologies to live out lives of decadence as the world they shattered collapses, leaving the "common people" to starve in their wake. This simple mantra attracts disgruntled individuals from around the world, and the Sons maintain an extremely online presence, with underground cells active in nearly every old world nation.`);
	r.toNode("p", ["note"]);

	r.push("The capability of the Sons to provide manufactured weaponry and training, and their willingness to do so to anyone willing to pledge their life to the Orange Sun, makes them exceptionally dangerous. The Sons seize any possible opportunity to expand their wealth and power, and frequently launch assassination attempts on prominent public figures, sabotage essential facilities, and attempt to stir chaos and unrest in vulnerable regions, often with the intent of stepping in and seizing power for themselves once the area has been sufficiently destabilized. Unlike many smaller-scale terrorist groups, the Sons produce some of the best-trained killers and thugs in the New World, and are almost completely out of the reach of old world nations and arcology owners alike in their scorching desert arcology. Any responsible arcology owner should be aware of the orange sun used as the logo of the Sons of Sekhmet and take care to not expose themselves to any weakness.");
	r.toNode("p", ["note"]);
	App.Events.addNode(t, ["— Lawrence, J. K., and Bolingbroke, D. S.,", App.UI.DOM.makeElement("span", "Trends in Free Cities Culture, 2031", ["underline"]), App.UI.DOM.makeElement("span", "Journal of Modern Social Sciences, International Edition, February 2032", ["note"])], "p", ["indent", "note"]);

	return t;
}, "Lore");

App.Encyclopedia.addArticle("The Top", function() {
	const t = new DocumentFragment();
	const r = new SpacedTextAccumulator(t);
	r.push("The Master never beats me half as hard as the Head Girl. She fucks me harder, too.");
	r.toNode("div", ["note"]);
	App.Events.addNode(t, ["— Anonymous slave"], "div", ["indent", "note"]);

	r.push("The safest slave society is a stratified slave society. Innovative Free Cities slaveowners are carefully differentiating their chattel, ensuring that favored slaves are interposed between them and the masses of their lesser stock. This is one of the oldest principles of leadership, ensuring that the grind of day-to-day direction and correction comes from subordinate leaders, while rewards and planning come from the top. The addition of sexuality to this model simply means that many Free Cities slaves get it, so to speak, from both ends.");
	r.toNode("p", ["note"]);

	r.push("There can be great advantages for talented and hardworking slaves. Out in the old world, crime, war, natural disasters, and simple crushing want often strike with little distinction based on", App.UI.DOM.makeElement("span", "intelligence", ["cyan"]), "skill, or strength. A truly excellent individual serving in a well-thought-out arcology can rise to a position of considerable", App.Encyclopedia.link("trust", "Trust", "mediumaquamarine"), "and power on her merits. It would be foolish to over-romanticize the reality of slavery, however, for all that advancement rests entirely on the whim of her owner. Talent can count for little for girls unlucky enough to find themselves owned by a capricious master.");
	r.toNode("p", ["note"]);
	App.Events.addNode(t, ["— Lawrence, J. K., and Bolingbroke, D. S.,", App.UI.DOM.makeElement("span", "Trends in Free Cities Culture, 2031", ["underline"]), App.UI.DOM.makeElement("span", "Journal of Modern Social Sciences, International Edition, February 2032", ["note"])], "p", ["indent", "note"]);

	return t;
}, "Lore");

App.Encyclopedia.addArticle("The Bottom", function() {
	const t = new DocumentFragment();
	const r = new SpacedTextAccumulator(t);
	r.push("Public servant today, whore tomorrow, glory hole bitch next month.");
	r.toNode("div", ["note"]);
	App.Events.addNode(t, ["— Anonymous slave"], "div", ["indent", "note"]);

	r.push("Slaves at the top of the Free Cities hierarchy enjoy a standard of life far above the average free citizen of the old world. However, slaves at the bottom do not. As the Free Cities redefine what it means to be human, they can be extraordinarily callous to those people who are excluded from the new rubric.");
	r.toNode("p", ["note"]);

	r.push("Free Cities glory holes are perhaps the ultimate expression of the dark side of modern slavery. In the old world, glory holes were mostly a sexual fantasy, and were confined to certain sexual subcultures where they did exist in reality. Free Cities glory holes are different both in that they exist, and are indeed very common; and in that their occupants are almost never present voluntarily.");
	r.toNode("p", ["note"]);

	r.push("Glory holes and slave brothels have a symbiotic existence, and any Free Cities slaveholder who owns a brothel full of pampered prostitutes who claims moral ascendancy for not owning an arcade is ignoring realities. In truth, all slave brothels benefit from the existence of arcades. After all, every slave whore in the Free Cities knows that if she does not perform up to her Master's standards, the arcades exist as a way of extracting value from her body. Every slave brothel receives better efforts out of its slaves due to their knowledge that a worse alternative is always available — if not with their current master, then with some other.");
	r.toNode("p", ["note"]);
	App.Events.addNode(t, ["— Lawrence, J. K., and Bolingbroke, D. S.,", App.UI.DOM.makeElement("span", "Trends in Free Cities Culture, 2031", ["underline"]), App.UI.DOM.makeElement("span", "Journal of Modern Social Sciences, International Edition, February 2032", ["note"])], "p", ["indent", "note"]);

	return t;
}, "Lore");

App.Encyclopedia.addArticle("The Purity of the Human Form", function() {
	const t = new DocumentFragment();
	const r = new SpacedTextAccumulator(t);
	r.push("Twentieth century eugenicists weren't wrong, they just didn't have the tools to be right.");
	r.toNode("div", ["note"]);
	App.Events.addNode(t, ["— Anonymous"], "div", ["indent", "note"]);

	r.push("High quality Free Cities slaves are remarkably healthy. It should be unsurprising that a population of humans selected for beauty, fed perfectly, required to exercise, given modern medical care, and prevented from indulging any non-sexual excess at all, has become quite impressive in this regard. The cultural fallout of this has been less easy to predict.");
	r.toNode("p", ["note"]);

	r.push("Throughout the early part of the 21st century a wide spectra of movements were taking place that have informed the Free Cities ideology of body purism. The left-wing counterculture health movement has found much open ground in a society that allows its adherents to totally control what goes into the bodies of some of its members. On the opposite side of the spectrum, some long-standing reactionary groups have taken this opportunity to experiment with some of their non-racial theories on purity. Finally, many religious or simply moral fundamentalists who believe in some form of purity code now have a captive population to subject to their whims.");
	r.toNode("p", ["note"]);

	r.push("Thousands of unintentional experiments on what really makes the ideal human are now under way in the Free Cities, and whatever the balance of humanity may feel about their morality, it is hard to deny that we as a whole stand to benefit from the experimentation.");
	r.toNode("p", ["note"]);
	App.Events.addNode(t, ["— Lawrence, J. K., and Bolingbroke, D. S.,", App.UI.DOM.makeElement("span", "Trends in Free Cities Culture, 2031", ["underline"]), App.UI.DOM.makeElement("span", "Journal of Modern Social Sciences, International Edition, February 2032", ["note"])], "p", ["indent", "note"]);

	return t;
}, "Lore");

App.Encyclopedia.addArticle("A World Built on Implants", function() {
	const t = new DocumentFragment();
	const r = new SpacedTextAccumulator(t);
	r.push("The earlier a slave gets on advanced growth hormones, the better. After all, good-looking implants are a ratio game. The bigger a girl's natural tits are, the bigger implants she can get without looking ridiculous.");
	r.toNode("div", ["note"]);
	App.Events.addNode(t, ["— standard Free Cities surgical advice"], "div", ["indent", "note"]);

	r.push("One of the most furious ideological divides in the Free Cities is over implants. Most Free Cities arcologies display a mix of slaves with breast and other implants, but some follow the tastes of owners who strongly prefer all-natural slaves, and some fetishize expansionism to the point of near-universal implantation. This can be a remarkably bitter controversy in places, and should Free Cities culture continue to develop, it is not unlikely that some day physical violence may take place in the Free Cities between extremists on opposite sides of the implant debate.");
	r.toNode("p", ["note"]);

	r.push("In any case, the medical technology of implantation has not advanced hugely since the start of the 21st century. The vast majority of implants are still either water-bag or silicone, with silicone generally preferred for its better, more realistic feel. At the more extreme sizes, a variety of fluid-based designs are used, with polypropylene string implants making a return, and newer, fillable adaptive implants becoming more common.");
	r.toNode("p", ["note"]);
	App.Events.addNode(t, ["— Lawrence, J. K., and Bolingbroke, D. S.,", App.UI.DOM.makeElement("span", "Trends in Free Cities Culture, 2031", ["underline"]), App.UI.DOM.makeElement("span", "Journal of Modern Social Sciences, International Edition, February 2032", ["note"])], "p", ["indent", "note"]);

	return t;
}, "Lore");

App.Encyclopedia.addArticle("Slaves as Stock", function() {
	const t = new DocumentFragment();
	const r = new SpacedTextAccumulator(t);
	r.push("Here we have a fine piece for the dairy folks");
	r.toNode("div", ["note"]);
	r.push("Fine dairy cow for you here ladies and ge-entlemen");
	r.toNode("div", ["note"]);
	r.push("Who'll give me ten thousand ¤?");
	r.toNode("div", ["note"]);
	r.push("Ten thousand ¤ bid, now ten thousand five,");
	r.toNode("div", ["note"]);
	r.push("Now ten thousand five, will you give me eleven?");
	r.toNode("div", ["note"]);
	r.push("Thirty-two years old, nipples the size of silver dollars");
	r.toNode("div", ["note"]);
	r.push("Eleven thousand ¤ bid, eleven, eleven?");
	App.Events.addNode(t, ["— Free Cities auctioneer"], "div", ["indent", "note"]);

	r.push("At different points in the history of slavery, slaves have been nearly equal to or even in some cases superior to the lowest classes of free citizen, and have been nearly as low as or even lower than the most valuable categories of animal livestock. Which will become the Free Cities norm remains to be seen; there are arcologies that exemplify either approach. A few arcologies apply both standards, and standards in between, all at once.");
	r.toNode("p", ["note"]);

	r.push("The present, however, is a time of great supply in the slave market. The social collapse of many societies in the old world and the perpetual conflicts in many areas are producing an immense number of captives for sale, keeping prices at historically low levels. Many slaveowners treat their chattel relatively well, but this comes from motivations other than financial necessity. With no laws requiring it and no economic reason to treat slaves as different from livestock, many citizens of the Free Cities see little reason to make a distinction. Spectacular expressions of this callousness, like the restraint of women for use as milk production devices or the usage of dangerous dosages of growth hormones, become more understandable when one realizes that the Free Cities are refining what was once a settled idea: what it means to be human.");
	r.toNode("p", ["note"]);
	App.Events.addNode(t, ["— Lawrence, J. K., and Bolingbroke, D. S.,", App.UI.DOM.makeElement("span", "Trends in Free Cities Culture, 2031", ["underline"]), App.UI.DOM.makeElement("span", "Journal of Modern Social Sciences, International Edition, February 2032", ["note"])], "p", ["indent", "note"]);

	return t;
}, "Lore");

App.Encyclopedia.addArticle("Slavery and the Physical Ideal", function() {
	const t = new DocumentFragment();
	const r = new SpacedTextAccumulator(t);
	r.push("Quoth BRODIN:");
	r.toNode("div", ["note"]);
	r.push("All must lift.");
	r.toNode("div", ["note"]);
	App.Events.addNode(t, ["— Anonymous"], "div", ["indent", "note"]);

	r.push("The medical impacts of the widespread reintroduction of slavery are not at all what might have been predicted twenty years ago. Medicine is not our primary focus in this review of Free Cities cultural trends, but a brief look at the striking medical outcomes is critical to understanding some of the social currents at work. By the second half of the twentieth century, the majority of humanity had reached a state of plenty so great that the health dangers of excess were greater than the health dangers of want.");
	r.toNode("p", ["note"]);

	r.push("For the first time in modern memory, people — slaves — in the Free Cities are, in large numbers, doing exactly what their doctors recommend. Properly managed slaves eat right, exercise regularly, and do not smoke, drink, or do recreational drugs. These simple but revolutionary changes mean that the more valuable classes of slave are healthier, on average, than any group of human beings has ever been.");
	r.toNode("p", ["note"]);

	r.push("Naturally, fetishism, competitiveness, and leisure have intersected to create in the Free Cities a constant escalation of physical one-upmanship when it comes to the training of slaves. Wonderfully muscled specimens have become very common, with feats of athletic prowess cited alongside sexual accomplishments without any distinction. The arcology owners most", App.Encyclopedia.link("devoted", "From Rebellious to Devoted", "hotpink"), "to the human form are creating societies of uniform physical perfection unlike anything in human history.");
	r.toNode("p", ["note"]);
	App.Events.addNode(t, ["— Lawrence, J. K., and Bolingbroke, D. S.,", App.UI.DOM.makeElement("span", "Trends in Free Cities Culture, 2031", ["underline"]), App.UI.DOM.makeElement("span", "Journal of Modern Social Sciences, International Edition, February 2032", ["note"])], "p", ["indent", "note"]);

	return t;
}, "Lore");

App.Encyclopedia.addArticle("Faith in the Free Cities", function() {
	const t = new DocumentFragment();
	const r = new SpacedTextAccumulator(t);
	r.push("I recognize my faults;");
	r.toNode("div", ["note"]);
	r.push("I am always conscious of my sins.");
	r.toNode("div", ["note"]);
	r.push("I have sinned against you, Master and God,");
	r.toNode("div", ["note"]);
	r.push("And done what you consider evil.");
	r.toNode("div", ["note"]);
	r.push("So you are right in judging me;");
	r.toNode("div", ["note"]);
	r.push("You are justified in condemning me.");
	r.toNode("div", ["note"]);
	App.Events.addNode(t, ["— Anonymous slave, 2030"], "div", ["indent", "note"]);

	r.push("There are almost as many approaches to faith in the Free Cities as there are arcologies. For every arcology owner who cynically exploits religion, there is another who truly believes himself to be ordained by God as master of his fellow human beings. Nevertheless, common elements are identifiable. The most notorious arise from literal readings of scriptural passages that reference slavery.");
	r.toNode("p", ["note"]);

	r.push("Each of the three major monotheistic religions arose in a time and place where slavery was common. Thus the institution appears in all three of the great monotheistic holy books. It is childishly simple to find all the scriptural support for a reintroduction of slavery even the most illiberal arcology owner could desire in any one of these. This is presumably not what religious conservatives of the late 20th and early 21st centuries intended when advocating scriptural literalism.");
	r.toNode("p", ["note"]);
	App.Events.addNode(t, ["— Lawrence, J. K., and Bolingbroke, D. S.,", App.UI.DOM.makeElement("span", "Trends in Free Cities Culture, 2031", ["underline"]), App.UI.DOM.makeElement("span", "Journal of Modern Social Sciences, International Edition, February 2032", ["note"])], "p", ["indent", "note"]);

	return t;
}, "Lore");

App.Encyclopedia.addArticle("Slave Whore, Arcology K-2", function() {
	const t = new DocumentFragment();
	const r = new SpacedTextAccumulator(t);
	r.push("Interview with a slave whore");
	r.toNode("div");
	r.push(`"The Rose Petal," Arcology K-2, April 21, 2036`);
	r.toNode("div");

	r.push("Good afternoon. What's your name?");
	r.toNode("p", ["note"]);
	r.push("Um, what? Are, um, you going to fuck me? I mean, whatever you want to do is okay.");
	r.toNode("div");

	r.push("I'd like to learn more about you.");
	r.toNode("p", ["note"]);
	r.push("Um, okay. My name is Candace Ass, I'm twenty years old, and I'm one of the slave whores here at the Petal. Um, what else?");
	r.toNode("div");

	r.push("How did you become a slave? Tell me about how you got here.");
	r.toNode("p", ["note"]);
	r.push("Sure. Well, uh, it's kind of boring. I was at a club, and I guess someone put something in my drink, and I passed out, and well [laughs nervously] here I am, I guess?");
	r.toNode("div");

	r.push("What happened when you woke up?");
	r.toNode("p", ["note"]);
	r.push("Oh, like, you want me to tell you my life story?");
	r.toNode("div");

	r.push("Sure.");
	r.toNode("p", ["note"]);
	r.push("Would it be okay if you fucked me while I tell you? I, uh, can't really think right now. I guess I could also suck — but then I wouldn't be able to talk? Here, please, please stick — oh, okay. Okay! Uh. Yeah. [giggles] That feels better. Thanks!");
	r.toNode("div");

	r.push("Why couldn't you talk without being fucked?");
	r.toNode("p", ["note"]);
	r.push("Well, we're all really horny. I'm really horny. Everything does it. The hormones, and all the training, and the drugs, and it's also kind of a habit, you know? It's been almost an hour! If you do it slow like that I'll be okay. [giggles] Yeah. Thank you!");
	r.toNode("div");

	r.push("You can touch yourself if it helps you think more clearly.");
	r.toNode("p", ["note"]);
	r.push("Oh thanks but, um, no. That's okay. It's actually really sensitive. Like, um, nobody touches it? And we're not allowed to do that alone anyway. So this is, um, good for me. I'm used to it, I get off like this a lot. If you do it much harder I'll cum, but if you just do it like that, I'll edge for a while. Um, so we can talk? Is that what you wanted?");
	r.toNode("div");

	r.push("You were telling me about being enslaved.");
	r.toNode("p", ["note"]);
	r.push("Well, I woke up with a guy on top of me. Kind of like now! But, like, he was really pounding me. It kind of hurt, but I was still really drugged. And I was already on the slave drugs too. And then they put me through a bunch of tests and stuff. That first buttfuck wasn't really a test, it was just a slaver using me. All the new girls get used. But later they tested me a lot, and showed me a bunch of porn and stuff. I think it was to see what I liked. Then they put me in a little room, like a cell, and kept me there for a while.");
	r.toNode("div");

	r.push("How long were you there?");
	r.toNode("p", ["note"]);
	r.push("I don't really know? All I really did was sleep. It's what happens when you're getting a lot of drugs and need curatives to keep them from hurting you. You just sleep a lot. And when you're awake, you're really groggy and can't remember much. It makes it easier.");
	r.toNode("div");

	r.push("It makes what easier?");
	r.toNode("p", ["note"]);
	r.push("Being raped. I mean, um, that was before I was trained a lot? So I didn't like it most of the time guys fucked me in the ass. But I just laid there and let it happen mostly. I heard from girls later that the slave market I was at uses that as a test, actually.");
	r.toNode("div");

	r.push("A test of what?");
	r.toNode("p", ["note"]);
	r.push("Well if a new girl is all drugged up and, you know, gets hard and cums when they fuck her, she gets special treatment. A girl they caught with me, I think she came the first day, and she's, like, a Concubine now? But if a girl still fights on all the drugs they put her in the arcade. Most just lie there like me, which means they need better hormones. So then they clip you.");
	r.toNode("div");

	r.push("Perform an orchiectomy, you mean?");
	r.toNode("p", ["note"]);
	r.push("Yeah, cut your balls off. [giggles] I don't remember. I just noticed one day that I was really soft and they were gone. And then I started getting really soft and growing better boobs, and the slavers who came in and used me seemed cuter. I asked one of he wanted a blowjob, and then they took me out and trained me a little.");
	r.toNode("div");

	r.push("Sexual training?");
	r.toNode("p", ["note"]);
	r.push("No, no, just obedience and stuff. I mean, they trained me by making me suck cock and bend over and take it up the butt, but no, like, sex classes. But still mostly sleeping. It's like, I would wake up being fucked, and when the guy was done and had injected whatever into me and made me follow a few commands, I'd go shower and then go back to bed again. Weeks and weeks like that, and then some surgeries.");
	r.toNode("div");

	r.push("What surgeries have you had?");
	r.toNode("p", ["note"]);
	r.push("Lots! [giggles] Um, lip implants. [kissing noise] Obviously. And some little face stuff, like, bone stuff on my jaw and cheekbones. They did something to my throat, and after not letting me talk for a week my voice was high like it is now. Shoulders and hips, more bone stuff. Those hurt, I slept for like a week after each and they left me alone. Butt implants. And boobs, like, obviously. Three times, bigger each time. If they give you the big kind right away you get stretch marks and it's ugly. They say they're going to do it at least once more, so they're bigger than my head. [giggles]");
	r.toNode("div");

	r.push("When did you move to the brothel?");
	r.toNode("p", ["note"]);
	r.push("Well Mistress bought me! I think they decided I was ready to be sold when I started asking for sex. They fuck you regularly, like, it's on a schedule? To get you into the habit, and also to get your asshole used to being a fuckhole. And I started wanting it more than the schedule, and cumming almost every time. So they sold me. Mistress kept me for a week, and then sent me down to the brothel.");
	r.toNode("div");

	r.push("What was that week like?");
	r.toNode("p", ["note"]);
	r.push("Um, I'm not supposed to talk about that? But, um, she fucked me, of course. That's not a big secret. Most sex slaves on the drugs and the training and stuff need sex, like, a lot. So if we're serving only one person, we have to beg. It's nice working here, I don't have to beg much. Oh! And that's also when Mistress picked my name and style. Since my skin is so pale, and my asshole bleached to pink, I'm pink! Pink hair, pink lips, pink nails, pink collar, pink heels, pink asspussy. Candy Ass!");
	r.toNode("div");

	r.push("How long have you been here?");
	r.toNode("p", ["note"]);
	r.push("Well, ever since Mistress sent me here! So like a year?");
	r.toNode("div");

	r.push("Do you know what you'll be doing in the future?");
	r.toNode("p", ["note"]);
	r.push("Um what? Working here I guess? I don't understand.");
	r.toNode("div");

	r.push("How long do you think you'll be here?");
	r.toNode("p", ["note"]);
	r.push("Well I guess the oldest girl here is around forty? [giggles] She's nice, I like her. She has these huge soft boobs, and her milk is really nice. So I'm twenty, so twenty years I guess?");
	r.toNode("div");

	r.push("How many customers do you see a day?");
	r.toNode("p", ["note"]);
	r.push("It depends, like, it depends on what they want? Like a long fuck or something weird like you, it takes a while, but most just want me to suck them off or take their cock up my butthole. Fifteen maybe?");
	r.toNode("div");

	r.push("That means you're going to have sex in this brothel more than 100,000 times.");
	r.toNode("p", ["note"]);
	r.push("The way you say that make it sound like a lot. Oh! Oh, uh, you want me to -");
	r.toNode("div");

	r.push("Be quiet, slave.");
	r.toNode("p", ["note"]);

	r.push("— Lawrence, W. G.,", App.UI.DOM.makeElement("span", "Guide to Modern Slavery, 2037 Edition", ["note"]));
	r.toNode("p");
	r.push("Appendix A, Interviews");
	r.toNode("div");

	return t;
}, "Lore");

App.Encyclopedia.addArticle("Slave Acolyte, Arcology V-7", function() {
	const t = new DocumentFragment();
	const r = new SpacedTextAccumulator(t);
	r.push("Interview with a Chattel Religionist acolyte");
	r.toNode("div");
	r.push("Main plaza, Arcology V-7, April 28, 2036");
	r.toNode("div");
	r.push("Good morning, honored visitor! I'm Patience; how may I serve you?");
	r.toNode("p");

	r.push(App.UI.DOM.makeElement("span", "Good morning. What do you do here?", ["note"]));
	r.toNode("div");
	r.push("Why, I am an acolyte of the Prophet! I have the ordained and undeserved glory of being one of his slaves. I do my unworthy best to do whatever he in his infinite wisdom commands me. Today I am a public servant on the plaza, and it is my duty and pleasure to greet visitors to his arcology, Sir, and to serve them in whatever way I can.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "You seem very enthusiastic.", ["note"]));
	r.toNode("div");
	r.push("Oh thank you Sir! The Prophet says that the best slave is beautiful and cheerful, but if a slave cannot be both, it is much better for her to be cheerful. [laughs] So I do my best to be cheerful. May I ask what brings you to his arcology, Sir?");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "You may. I travel from arcology to arcology. A tourist, you might say. And I write about what I find.", ["note"]));
	r.toNode("div");
	r.push("That's wonderful! I'd be happy to share anything with you, anything at all. The Prophet says that all slavery is holy, but Sir, I think his arcology must be more holy than most. And the Prophet says that acolytes are to always be honest, for the holy have nothing to hide.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "I see that.", ["note"]));
	r.toNode("div");
	r.push("[laughs] My habit, you mean? You must be joking, Sir! It covers most of me.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "Tell me about it.", ["note"]));
	r.toNode("div");
	r.push("With pleasure, Sir. It is white, because all sex slaves are pure. It covers my head and my shoulders but leaves my face bare so that everyone may see me smile. My breasts are bare because, the Prophet says, they are especially holy things, beautiful, and sexual, and nourishing. They must also be bare so that all can see how they are pure and unspoiled by false implants. My belly is bare to show that I have the very great honor of carrying new slaves for the Prophet. I have a golden belt with a strip of cloth in front and behind, because the Prophet says that sometimes, the imagined sight of a slave's holes are as beautiful as the true sight of them.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "You must be carrying twins.", ["note"]));
	r.toNode("div");
	r.push("Yes, Sir, twins. I hope very much to be blessed with triplets next time.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "Are they the Prophet's?", ["note"]));
	r.toNode("div");
	r.push("[laughs] Oh, no, Sir! I am just an unworthy old acolyte, not one of the Prophet's wives. I was blessed with the seed of one of the Prophet's breeding girls, much better seed than I deserve. She is young and very beautiful, much more beautiful than me, and many acolytes receive her seed so they can make beautiful new slaves.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "Between your pregnancy and your breasts, doesn't standing out here on the plaza tire you out?", ["note"]));
	r.toNode("div");
	r.push("No, Sir. Look here, Sir; [turns sideways] a good acolyte has strong legs, and I exercise twice a day. We must be strong to bear new slaves, work hard, and give pleasure without tiring. I can serve you standing, Sir, even like this. May I show you?");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "Perhaps later. You seem proud of your body.", ["note"]));
	r.toNode("div");
	r.push("I am! The Prophet says that a holy slave may certainly be proud of the way in which she serves. I am not beautiful and I am not young, but I am healthy and strong and I am proud of that. I am blessed to be in an arcology where I can take pride in such things.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "What do you do when you are not being bred or serving in public?", ["note"]));
	r.toNode("div");
	r.push("Well, Sir, those are my roles as one of the Prophet's many slave acolytes. In daily life, do you mean, Sir? Well, as I said I exercise a great deal. To maintain my body I must eat a lot, so I have to work hard or I will become fat. Other than that, I live up above us, Sir, in a lower level of the Prophet's penthouse, in a room with my wife. It's a simple life.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "Your wife?", ["note"]));
	r.toNode("div");
	r.push("Yes, Sir, my wife Perseverance. There she is, Sir, on the other side of the plaza. One of the ones dressed like me. She has bigger boobs, but she isn't as pregnant right now. [points]");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "She looks a lot like you.", ["note"]));
	r.toNode("div");
	r.push("Well, she should, Sir, we're sisters. The Prophet says that slave marriages between sisters are very holy, as long as no seed passes between them, and of course no seed can pass between us, because we both have pussies. I love her very much.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "Did you always?", ["note"]));
	r.toNode("div");
	r.push("Well yes! Oh, I see, Sir. No, no not that way. It was very hard for us, for a long time, but the Prophet is very wise. We were unworthy and slow to accept his wisdom, but he was patient with us and we learned in the end.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "That's certainly impressive. How did he teach you?", ["note"]));
	r.toNode("div");
	r.push("Many ways, of course, Sir, but the Prophet is so wise that he often brings slaves to teach themselves by his wisdom. He has many ways of filling a slave with radiant sexual desire, Sir, so many ways, and they are so powerful, that she must find some way of getting relief. And the Prophet provided that we were each other's only source of relief.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "How was that hard for you?", ["note"]));
	r.toNode("div");
	r.push("The Prophet says that it is natural for it to be hard, and as in all things he was right. We were ashamed, and we cried afterward, every time, for a long time. But we became accustomed to each other's bodies, and we saw that many sister-wives were happy, and no one looked down on us. So we agreed with each other to stop being ashamed.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "You're completely comfortable speaking about being married to your sister, here in the plaza?", ["note"]));
	r.toNode("div");
	r.push("Sir, I'm completely comfortable saying here in the plaza that when I awoke this morning, she was sucking the milk from one of my nipples, and that we brought each other to orgasm twice before we came out to the plaza today. I love her! I hope you will let us serve you together.");
	r.toNode("div");

	r.toNode("p");
	r.push("— Lawrence, W. G.,", App.UI.DOM.makeElement("span", "Guide to Modern Slavery, 2037 Edition", ["note"]));
	r.toNode("div");
	r.push("Appendix A, Interviews");
	r.toNode("div");

	return t;
}, "Lore");

App.Encyclopedia.addArticle("Public Slave, Arcology A-3", function() {
	const t = new DocumentFragment();
	const r = new SpacedTextAccumulator(t);
	r.push("Interview with a public slave subject to Degradationism");
	r.toNode("div");
	r.push("Main plaza, Arcology A-3, April 16, 2036");
	r.toNode("div");
	r.push("P-please, Sir! Please fuck me, Sir!");
	r.toNode("p");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "Very well. I will ask, though: why?", ["note"]));
	r.toNode("div");
	r.push("B-because I'm overdue, Sir. If I d-don't get someone to f-fuck me soon, my c-collar will hurt me, Sir. Oh please, oh — oh thank you Sir, please, please — oh, OH —");
	r.toNode("div");

	r.toNode("p");
	r.push("[Some time later.]");
	r.toNode("div");
	r.push("[Slave collar chimes.]");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "What was that?", ["note"]));
	r.toNode("div");
	r.push("Oh, um, [sniff] Sir, the arcology detected that you came inside me, Sir. That means that I have a little time before I have to get fucked again, Sir. [sniff]");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "All public slaves are subject to this system?", ["note"]));
	r.toNode("div");
	r.push("All of the Mistress's public slaves, Sir. Some other owners use it, some don't. [sniff] It's s-supposed to make us g-good public representatives for the arcology's slaves. B-because it makes us d-desperate. [sniff] Sir.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "You seem articulate, slave. What were you before enslavement?", ["note"]));
	r.toNode("div");
	r.push("I was a s-student, Sir.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "I see. Slave, I would like to learn more about the arcology. You will accompany me as I tour it. If you answer my questions as I do so, I will fuck you when your collar requires it.", ["note"]));
	r.toNode("div");
	r.push("Oh, thank you, Sir. Thank you. Um, how long will you be here, Sir?");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "None of your concern. Who is the person in that cage hanging there?", ["note"]));
	r.toNode("div");
	r.push("I don't know, Sir. And, Sir, that's not, um, a person. She's a slave, Sir.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "I see. What sorts of things are punished that way?", ["note"]));
	r.toNode("div");
	r.push("Oh, lots of things, Sir. Hesitating. Dropping things. Touching a dick or a clit with teeth. Letting cum spill. Anyone can put a slave in one of the cages; they're public, Sir, and anyone can use a slave in them. You see they're kind of shaped so that the slave is positioned so her holes are sticking out, Sir?");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "Follow me.", ["note"]));
	r.toNode("div");
	r.push("Yes, Sir. [winces] Oh. Um, sorry, Sir.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "Does it hurt to walk in those shoes?", ["note"]));
	r.toNode("div");
	r.push("N-no, Sir. I need the heels to walk. It's the chain between my nipples that hurts a little when I walk, Sir, and it bounces around. I was wincing, earlier, partly because I was bouncing around, and it hurt, Sir.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "And yet you orgasmed.", ["note"]));
	r.toNode("div");
	r.push("It's h-hard not to, Sir. I have a smart piercing that makes me orgasm, Sir.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "Why do you need heels to walk?", ["note"]));
	r.toNode("div");
	r.push("Because my tendons have been clipped, Sir.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "What did you do?", ["note"]));
	r.toNode("div");
	r.push("Um, nothing, Sir? It wasn't a punishment, all slaves have their tendons clipped. The heels are a reward. If we're not good, we have to crawl, Sir.");
	r.toNode("div");

	r.push("[Walking.]");
	r.toNode("p");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "Was that fear I just saw?", ["note"]));
	r.toNode("div");
	r.push("Yes, Sir.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "Why?", ["note"]));
	r.toNode("div");
	r.push("That's the main dairy ahead of us, Sir.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "Is it open to the public?", ["note"]));
	r.toNode("div");
	r.push("T-t-to view, yes, Sir.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "Follow me.", ["note"]));
	r.toNode("div");
	r.push("Y-yes, Sir. [sniff]");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "That is quite an impressive sight.", ["note"]));
	r.toNode("div");
	r.push("Yes, Sir.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "Do you know how large they are?", ["note"]));
	r.toNode("div");
	r.push("Th-th-their breasts, Sir? About t-twenty or twenty five liters e-ea-each, S-Sir.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "Why does this frighten you so much?", ["note"]));
	r.toNode("div");
	r.push("W-well, I'll, um, be put in here, Sir. Someday. Oh. [sniff]");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "Why?", ["note"]));
	r.toNode("div");
	r.push("All slaves are p-put in h-here, when they're loose, Sir. All the, the, the", App.UI.DOM.makeElement("span", "sex,", ["note"]), "it's just to loosen us, s-so those", App.UI.DOM.makeElement("span", "things,", ["note"]), "will fit inside...");
	r.toNode("div");

	r.toNode("p");
	r.push("— Lawrence, W. G.,", App.UI.DOM.makeElement("span", "Guide to Modern Slavery, 2037 Edition", ["note"]));
	r.toNode("div");
	r.push("Appendix A, Interviews");
	r.toNode("div");

	return t;
}, "Lore");

App.Encyclopedia.addArticle("Mercenary, Arcology B-2", function() {
	const t = new DocumentFragment();
	const r = new SpacedTextAccumulator(t);
	r.push("Interview with a Free Cities mercenary");
	r.toNode("div");
	r.push("The Wild Goose, Arcology B-2, March 11, 2036");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "Good evening.", ["note"]));
	r.toNode("div");
	r.push("No offense, but I only fuck girls.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "None taken, and I'm just looking for conversation.", ["note"]));
	r.toNode("div");
	r.push("'k, buy the next round and converse away.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "Done. Fine to meet you. I'm touring the arcologies, writing a book. I'd like to ask you about life as a mercenary here in the Free Cities.", ["note"]));
	r.toNode("div");
	r.push("[laughs] Shit, I'm going to be famous.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "If you'd like to be. I'm W.G.; what's your name?", ["note"]));
	r.toNode("div");
	r.push("Well, W.G., I'll answer questions for your book, but I don't actually want to be famous. No names.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "That works fine for me. How did you become a mercenary?", ["note"]));
	r.toNode("div");
	r.push("I was a soldier, and the pay was shit, so instead of re-upping I went merc. Boring, but pretty common, believe me. Half the old world militaries are just merc training camps now. You enlist, and then you get out as soon as you have enough experience that a mercenary group'll take you on.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "Did you have combat experience?", ["note"]));
	r.toNode("div");
	r.push("[laughs] You know your shit. No, no I did not. I wasn't even infantry. Dirty little secret you probably already know: if you're a girl, most merc groups don't give a fuck what experience you actually have, 'cause either way, they win.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "I think I understand, but lay it out for me.", ["note"]));
	r.toNode("div");
	r.push("If you're a good troop, you're a good troop and they come out ahead. Rifle don't care what equipment the merc holding it has. If you're not a good troop, they tie you up in a shipping container, use you 'till they get bored, and then sell you. And they come out ahead. Win-win.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "You obviously came out on the right side of that, but did you suffer any abuse before then?", ["note"]));
	r.toNode("div");
	r.push("Nah. It'd be dumb to do anything to a newbie and then not enslave 'em. What, you're gonna rape somebody and then give 'em two-forty rounds, four frags, and a satchel charge? Fuck no.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "That's what you carry?", ["note"]));
	r.toNode("div");
	r.push("Yeah fuck that subject anyway. And yeah, when taking prisoners isn't on the agenda. I'm a big girl, I can manage eight mags in a double deck chest rig. If we are taking prisoners, then swap out half the frags for gas and half the mags for an underslung S. G. with beanbags and taser rounds. Though you never want to use any of that, nonlethals included.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "Because you might damage the merchandise?", ["note"]));
	r.toNode("div");
	r.push("Because you might damage the merchandise. Did you know it's possible to burst an implant with a beanbag round? Well, it's possible to burst an implant with a beanbag round.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "You know I have to ask about that now.", ["note"]));
	r.toNode("div");
	r.push("And I wouldn't have said it if I didn't want to tell the story. Not a long one anyway. Old world mob boss asshole with a moored yacht full of hoes, all tats and fake tits and shit. We went in quick without enough muscle and the guards resisted. Perfect op is, you go in so heavy that nobody resists, but it was rushed and we had to put 'em down. So all these bitches are running around screaming their heads off and we get the call that the police are coming. Didn't want to shoot it out with them since the tip came from a cop in the first place. So we had a couple of minutes to grab what we could and jet. So, beanbags, zipties, bodybags, and off — we — go, one hoe apiece.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "That sounds risky.", ["note"]));
	r.toNode("div");
	r.push("Yeah it was. I'm not some hothead who does shit like that for the rush. If you run that op once a week you're going to be dead inside a year. I found new employers not long after that one. Funny story and all, but if I hadn't gone with ceramic side plates in my vest that night I would have been fucked.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "This is a quieter outfit?", ["note"]));
	r.toNode("div");
	r.push("Much. Writer, I am now bored. And since I am drunk, and horny, and an incorrigible dyke, I am going to go find a cute slave with freckles and make her eat my pussy until I pass out. You want the other end?");
	r.toNode("div");

	r.toNode("p");
	r.push("— Lawrence, W. G.,", App.UI.DOM.makeElement("span", "Guide to Modern Slavery, 2037 Edition", ["note"]));
	r.toNode("div");
	r.push("Appendix A, Interviews");
	r.toNode("div");

	return t;
}, "Lore");

App.Encyclopedia.addArticle("Slave Trainer, Arcology D-10", function() {
	const t = new DocumentFragment();
	const r = new SpacedTextAccumulator(t);
	r.push("Interview and observation with a Free Cities slave trainer");
	r.toNode("div");
	r.push("Slave Market training plaza, Arcology D-10, May 23, 2036");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "Good morning! I'm Lawrence, W.G. Lawrence.", ["bold"]));
	r.toNode("div");
	r.push(App.UI.DOM.makeElement("span", "Hello. Nice to meet you. I'm Claudia.", ["note"]));
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "I'd like to thank you for being willing to have me along as an observer; it's very kind of you.", ["bold"]));
	r.toNode("div");
	r.push(App.UI.DOM.makeElement("span", "My pleasure. I do good work and I don't mind people knowing it.", ["note"]));
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "May I ask you a few questions before you get back to your routine?", ["bold"]));
	r.toNode("div");
	r.push(App.UI.DOM.makeElement("span", "Sure. We're going to be working with a new slave today, and I've got her in my office, sitting and thinking. There's no rush. Unpredictability is good.", ["note"]));
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "What got you into this career?", ["bold"]));
	r.toNode("div");
	r.push(App.UI.DOM.makeElement("span", "Well, I'm an ex-slave. I served my Mistress, the owner of this arcology, for three years. But I'm getting things out of order. I was a Sister before that. That's a very long story. Do you want to get into that? Every single Sister has the same story. [laughs] That's the beauty of it.", ["note"]));
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "That's all right. You mentioned before that you'd like to be known for what you're doing now.", ["bold"]));
	r.toNode("div");
	r.push(App.UI.DOM.makeElement("span", "Yeah. I'm not ashamed of any of it, and I wouldn't be where I am without it, but I'm my own woman now.", ["note"]));
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "And you became your own woman after retiring from slavery here?", ["bold"]));
	r.toNode("div");
	r.push(App.UI.DOM.makeElement("span", "I did, yes. It was bittersweet, but it was time. Mistress prefers young ladies.", ["note"]));
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "You keep referring to her as Mistress. Is that leftover conditioning?", ["bold"]));
	r.toNode("div");
	r.push(App.UI.DOM.makeElement("span", "[laughs] No, no, that's just what I call her, you know? She'll always be my Mistress in a way. And again, I'm here because she retires her girls incredibly well.", ["note"]));
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "What was your role with her?", ["bold"]));
	r.toNode("div");
	r.push(App.UI.DOM.makeElement("span", "I was her Head Girl, for my last year with her, at least. Before that, her Head Girl's girl. That Head Girl was a Sister, too. I can introduce you, if you'd like; she's a trainer here too. We work together sometimes.", ["note"]));
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "Was that a blush?", ["bold"]));
	r.toNode("div");
	r.push(App.UI.DOM.makeElement("span", "Okay, okay! We spend time together after work sometimes, too. Anyway, slave training. Come with me, my office is back this way.", ["note"]));
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "Who are you training today?", ["bold"]));
	r.toNode("div");
	r.push(App.UI.DOM.makeElement("span", "New slave, just bought her from the kidnappers yesterday. Pretty average. Mid-twenties, student then housewife. Decent tits, but too chubby. We'll work on that. And here we are.", ["note"]));
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "Impressive office, even from the outside.", ["bold"]));
	r.toNode("div");
	r.push(App.UI.DOM.makeElement("span", "Thanks. So, she's in there. Room's soundproof, she can't hear us. Here's how I'd like to play this: just stay out of the light, and you can observe as long as you like. She's under a spotlight, and everything else is dark. She probably won't even know you're there.", ["note"]));
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "That would work very well, thank you.", ["bold"]));
	r.toNode("div");
	r.push(App.UI.DOM.makeElement("span", "You're welcome. After you.", ["note"]));
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "Hello, Suzanne.", ["note"]));
	r.toNode("div");
	r.push("H-hi, Ma'am.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "Stand up.", ["note"]));
	r.toNode("div");
	r.push("Yes, Ma'am. Um, Ma'am, may I please have my pants back? They took them away in the market, and I thought since you gave my sweater back, you'd -");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "Be quiet.", ["note"]));
	r.toNode("div");
	r.push("Yes, Ma'am.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "Hold your hands at your sides like I told you, and stop pulling your sweater down over your pussy.", ["note"]));
	r.toNode("div");
	r.push("Y-yes, Ma'am.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "Turn around.", ["note"]));
	r.toNode("div");
	r.push("Yes, Ma'am.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "Do you like having your big fat naked butt hanging out, bitch?", ["note"]));
	r.toNode("div");
	r.push("Yes, Ma — aaAAH! Oh, ow, oh my God, ow -");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "Be quiet. That was a 2. Your collar goes to 10.", ["note"]));
	r.toNode("div");
	r.push("[sobbing] Yes, Ma'am.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "You just lied to me. I will ask again: do you like having your big fat naked butt hang out?", ["note"]));
	r.toNode("div");
	r.push("N-no, Ma'am.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "Take your sweater off. Good bitch. That's right, blush for me. Now, tear it in half.", ["note"]));
	r.toNode("div");
	r.push("What!? Oh please, no, please no, I'll do it! Please don't shock me again, Ma'am! [frantic tearing]");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "You don't need clothes, bitch. Not anymore. Now, turn back around, and bend over.", ["note"]));
	r.toNode("div");
	r.push("Yes, Ma'am.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "Spread your big fat buttcheeks.", ["note"]));
	r.toNode("div");
	r.push("Yes, Ma'am.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "Ever had a cock up your butthole, Suzie?", ["note"]));
	r.toNode("div");
	r.push("[sobbing]");
	r.toNode("div");

	r.toNode("p");
	r.push("— Lawrence, W. G.,", App.UI.DOM.makeElement("span", "Guide to Modern Slavery, 2037 Edition", ["note"]));
	r.toNode("div");
	r.push("Appendix A, Interviews");
	r.toNode("div");

	return t;
}, "Lore");

App.Encyclopedia.addArticle("Monarch, Arcology F-8", function() {
	const t = new DocumentFragment();
	const r = new SpacedTextAccumulator(t);
	r.push(`Interview with a Free Cities "anarcho-monarch"`);
	r.toNode("div");
	r.push("Arcological Penthouse, Arcology F-8, June 23, 2036");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "Good afternoon. My name is -", ["note"]));
	r.toNode("div");
	r.push("(From Guard) You will address His Highness with proper courtesy, peasant.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "Ah, my apologies. What I meant to say was, your Majesty, my name is W.G. Lawrence, and I'd like to interview you about this arcology, and your role in leading it. Err, for my book, your Highness.", ["note"]));
	r.toNode("div");
	r.push("A scribe. Well, speak quickly. I am a busy man.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "Of course. Just for the record, might you introduce yourself?", ["note"]));
	r.toNode("div");
	r.push("(Gestures to a guard.)");
	r.toNode("div");
	r.push("(From Guard) You are speaking with His Highness King William, First of His name, Savior of the Arcology, Executive Lord and Master of the Board of Directors, Majority Shareholder and Anarcho-Monarch of the most noble Arcology of Feight.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "Yes, yes, right, quite a magnificent title. Might I ask how it came to be that a Monarch took control of a Free City? Isn't strong authority antithetical to the free cities ideal?", ["note"]));
	r.toNode("div");
	r.push("[laughs] Not a monarch, an anarcho-monarch. I did not earn my titles through bullying or force, and certainly not through inheriting it from some decrepit geriatric moron like in the old world. I am the legitimate majority stakeholder of the arcology and the rightful head of its board of directors. My rule is strong because I am strong. Were I to become weak, my position would be ousted and the people would take my place directly.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "Is that what the 'anarcho' means?", ["note"]));
	r.toNode("div");
	r.push("Mmm. I do not simply rule the people. I am the people.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "But you dictate laws down to them - isn't that mutally contradictory?", ["note"]));
	r.toNode("div");
	r.push("No. Peasants do not understand how to govern themselves. Look at the 'pure' anarchies outside our walls, scribe, and you'll see men tearing each other apart for scraps on a bone or a chance with an emaciated crack-whore. Without a strong force to bind a society in place, society falls apart entirely. If my people dislike paying my rents or obeying my Knights, they are free to leave, and take their chances in the ruins of the Old World.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "So your majority ownership and management of the arcology gives you the right to control its populace, who live under the laws you set, and if they disagree with your, ah, symbolic totality, their only option is to leave?", ["note"]));
	r.toNode("div");
	r.push("Now you understand.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "Alright. Well, what about the lesser nobles? The Counts and Barons and Knights of the arcology?", ["note"]));
	r.toNode("div");
	r.push("What about them?");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "Why do they have the right to authority in your free society?", ["note"]));
	r.toNode("div");
	r.push("They are my representatives. To be a Knight is to have my personal trust to act in my name, wherever I cannot be. I am the fountain from which all authority stems. So long as my water flows pure, all steps of the fountain remain clear.");
	r.toNode("div");

	r.toNode("p");
	r.push(App.UI.DOM.makeElement("span", "What about corruption? Doesn't giving so much power to entrenched nobility make it more likely that -", ["note"]));
	r.toNode("div");
	r.push("(From Guard) Alright, that's enough out of you. The King has better things to do than explain his policies all day. Let's go.");
	r.toNode("div");

	r.toNode("p");
	r.push("— Lawrence, W. G.,", App.UI.DOM.makeElement("span", "Guide to Modern Slavery, 2037 Edition", ["note"]));
	r.toNode("div");
	r.push("Appendix A, Interviews");
	r.toNode("div");

	return t;
}, "Lore");

App.Encyclopedia.addCategory("Lore", function(currentArticle) {
	const f = new DocumentFragment();
	let r = [];
	if (currentArticle !== "Lore") {
		r.push(App.Encyclopedia.link("Lore"));
	}
	r.push(App.Encyclopedia.link("Money", "Money", "yellowgreen"));
	r.push(App.Encyclopedia.link("Food"));
	r.push(App.Encyclopedia.link("Disease in the Free Cities"));
	r.push(App.Encyclopedia.link("Free Cities Justice"));
	r.push(App.Encyclopedia.link("Modern Anal"));
	r.push(App.Encyclopedia.link("Slave Couture"));
	r.push(App.Encyclopedia.link("Slave Marriage"));
	r.push(App.Encyclopedia.link("The Ejaculate Market"));
	r.push(App.Encyclopedia.link("Gingering"));
	r.push(App.Encyclopedia.link("Dyes"));
	App.Events.addNode(f, ["The Free Cities today:", App.UI.DOM.generateLinksStrip(r)], "div");

	r = [];
	r.push(App.Encyclopedia.link("The New Rome"));
	r.push(App.Encyclopedia.link("The Return of Feudalism"));
	r.push(App.Encyclopedia.link("Naked, Barefoot, and Pregnant"));
	r.push(App.Encyclopedia.link("The Sons of Sekhmet"));
	r.push(App.Encyclopedia.link("The Top"));
	r.push(App.Encyclopedia.link("The Bottom"));
	r.push(App.Encyclopedia.link("The Purity of the Human Form"));
	r.push(App.Encyclopedia.link("A World Built on Implants"));
	r.push(App.Encyclopedia.link("Slaves as Stock"));
	r.push(App.Encyclopedia.link("Slavery and the Physical Ideal"));
	r.push(App.Encyclopedia.link("Faith in the Free Cities"));
	App.Events.addNode(f, ["Free Cities culture tomorrow:", App.UI.DOM.generateLinksStrip(r)], "div");

	r = [];
	r.push(App.Encyclopedia.link("Slave Whore, Arcology K-2"));
	r.push(App.Encyclopedia.link("Slave Acolyte, Arcology V-7"));
	if (V.seeExtreme !== 0) {
		r.push(App.Encyclopedia.link("Public Slave, Arcology A-3"));
	}
	r.push(App.Encyclopedia.link("Mercenary, Arcology B-2"));
	r.push(App.Encyclopedia.link("Slave Trainer, Arcology D-10"));
	r.push(App.Encyclopedia.link("Monarch, Arcology F-8"));
	App.Events.addNode(f, ["Interviews:", App.UI.DOM.generateLinksStrip(r)], "div");

	return f;
});
