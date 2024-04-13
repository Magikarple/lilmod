App.Encyclopedia.addArticle("Playing Free Cities", function() {
	const f = new DocumentFragment();
	App.UI.DOM.appendNewElement("p", f, `Welcome to the Free Cities, ${PlayerName()}!`);
	App.UI.DOM.appendNewElement("p", f, "Future room for lore text", ["note"]);
	App.UI.DOM.appendNewElement("p", f, "Choose a more particular entry below:");
	return f;
}, "guide");

App.Encyclopedia.addArticle("First Game Guide", function() {
	const f = new DocumentFragment();
	let r;

	App.UI.DOM.appendNewElement("p", f, "Unfortunately, Twine doesn't have a solid tooltip system at the moment. So, a certain amount of confusion is to be expected. Sorry about that. Flip through the encyclopedia, or at least this gameplay section. It answers a lot of frequently asked questions, and if you read it you can save yourself the trouble of asking your frequently asked question on /d/ or the blog and getting told to read the encyclopedia. If you've still got questions, start a game and read what it says. The game is reasonably good about telling you what's happening to your slaves, and why. It bears repetition that almost all stat effects are called out with colored text. Try this opening strategy if you don't know where to start. It isn't an optimal build, but it works reliably and will show you the basics.");

	App.UI.DOM.appendNewElement("h3", f, "Starting options");
	r = [];
	r.push("Start the game and select any of the world options; choose normal difficulty, since it's pretty forgiving and this opener will make good");
	r.push(App.Encyclopedia.link("money.", "Money", "cash"));
	r.push("Build a completely male PC for your first game; it makes");
	r.push(App.Encyclopedia.link("reputation", "Arcologies and Reputation", "reputation inc"));
	r.push("maintenance much easier. Choose wealth for both your career and your rumored method of obtaining the arcology; the other options are fun but a full wealth build will set you up quickly to get started.");
	App.Events.addParagraph(f, r);

	App.UI.DOM.appendNewElement("p", f, "Now, customize your starting slaves.");
	r = [];
	r.push("For your first, make her as <span class='intelligent'>intelligent, educated,</span> and old as possible. Make her");
	r.push(App.UI.DOM.makeElement("span", App.UI.DOM.combineNodes(App.Encyclopedia.link("devoted", "From Rebellious to Devoted"), "."), ["devotion", "accept"]));
	r.push("but save");
	r.push(App.Encyclopedia.link("money", "Money", "cash"));
	r.push(`by giving her flaws, an unknown fetish, and <span class='trust dec'>making her afraid of you.</span> (These are easy to fix.) You can customize the rest of her as you wish, but try to keep her under <span class='cash'>${cashFormat(5000)}.</span> Don't worry about skills, since with two of them you'll be able to rotate Head Girl duty so the other can learn skills. Commit her, base another slave off her, and commit that one too. Those are your`);
	r.push(App.UI.DOM.combineNodes(App.Encyclopedia.link("Head Girls", "Head Girl"), "."));
	App.Events.addParagraph(f, r);

	r = [];
	r.push("Spend the rest of your");
	r.push(App.Encyclopedia.link("money", "Money", "cash"));
	r.push("on prospects: slaves that are");
	r.push(App.Encyclopedia.link("cheap", "Money", "cash"));
	r.push("now, but can be improved quickly. As long as you keep <span class='devotion accept'>devotion</span> pretty high, low");
	r.push(App.Encyclopedia.link("trust", "Trust", "trust inc"));
	r.push("can be fixed reliably. Unknown fetishes, emaciated or fat, flaws, deep voice, and poor skills are all good ways to drive prices down, and can all be fixed quickly. Virginities are a bad idea because they drive costs up and are easy to break. <span class='intelligent'>Education</span> can take a while and will take slaves away from other jobs, so make them all educated for now, and keep their <span class='intelligent'>intelligence</span> reasonably high.");
	App.Events.addParagraph(f, r);

	App.UI.DOM.appendNewElement("h3", f, "First turn");
	r = [];
	r.push("Assign one of your Head Girls to be <strong>the</strong> Head Girl and make the other whore. Assign everyone else to whore. The");
	r.push(App.Encyclopedia.link("rules assistant", "Rules Assistant"));
	r.push("will speed things up a lot when you know the basics, but leave it off for now; it's easy to miss a lot of stuff if you set it up without a bit of experience. Go through your girls one by one and experiment with their options, but anyone who's <span class='devotion accept'>Accepting</span> or better should get nice clothes, accessories, and");
	r.push(App.Encyclopedia.link("living conditions", "Living Conditions"));
	r.push("anyone who's not should not. When slaves tip over into <span class='devotion accept'>Accepting,</span> switch them over from bedrolls and uncomfortable straps; until then, the good life is a waste of");
	r.push(App.Encyclopedia.link("money", "Money", "cash"));
	r.push("and will spoil them. Give <span class='health dec'>unhealthy</span> slaves curatives, and give everyone hormones, since they're");
	r.push(App.Encyclopedia.link("cheap", "Money", "cash"));
	r.push("and have good front end benefits. Get everyone working out or dieting to reach a basic fitness level and an attractive (not <span class='warning'>red</span>)");
	r.push(App.UI.DOM.combineNodes(App.Encyclopedia.link("weight"), "."));
	r.push("Sell the girl(s) your predecessor left behind for seed");
	r.push(App.Encyclopedia.link("money", "Money", "cash"));
	r.push("and choose the most profitable option; there are ways to maximize this, but worry about that later. Check out the arcology management menu. You should have the");
	r.push(App.Encyclopedia.link("money", "Money", "cash"));
	r.push("to upgrade the security systems, build the");
	r.push(App.UI.DOM.combineNodes(App.Encyclopedia.link("Head Girl suite"), ","));
	r.push(`and to buy the kitchen upgrade; this will make dieting work faster. Check out the slave market, and buy a single bargain slave: <span class="cash">${cashFormat(2000)}</span> is good. Put her in the suite: if she won't go, abuse her until she will. Open the personal attention menu, and fix your Head Girl's flaws; softening is powerful but it takes longer and we're focusing on the basics. <strong>Save the game</strong> and end the turn.`);
	App.Events.addParagraph(f, r);

	App.UI.DOM.appendNewElement("h3", f, "The end turn report");
	r = [];
	r.push("Read this, and note all the colored text. Pay particular attention to <span class='warning'>red,</span> <span class='trust dec'>gold,</span> or <span class='devotion dec'>orchid</span> text; these are generally bad. Being a slave whore is a hard life, and some trouble is inevitable. But take particular note of things like slaves losing");
	r.push(App.UI.DOM.combineNodes(App.Encyclopedia.link("health"), ","));
	r.push("becoming");
	r.push(App.UI.DOM.combineNodes(App.Encyclopedia.link("fearful", "Trust"), ","));
	r.push("or");
	r.push(App.Encyclopedia.link("hating", "From Rebellious to Devoted"));
	r.push("you due to their");
	r.push(App.UI.DOM.combineNodes(App.Encyclopedia.link("rules", "Rules Assistant"), ","));
	r.push(App.UI.DOM.combineNodes(App.Encyclopedia.link("conditions", "Living Conditions"), ","));
	r.push("or other slaves — these things you can control. Reload your save and fiddle around with the options to address these areas. (The Head Girl's girl may have a rough time; you can't affect that.) Since your Head Girl has her own slave to help her around the house, she'll work with two of your slaves.");
	App.Events.addParagraph(f, r);

	App.UI.DOM.appendNewElement("h3", f, "Economics and events");
	r = [];
	r.push("The economics report offers some flavor, but you should leave the options it offers alone until you've got some spare cash. An event or two will follow; feel free to reload the page on each (F5 on most browsers) to see what the different options do. Generally, try to pick options that give you");
	r.push(App.Encyclopedia.link("money", "Money", "cash"));
	r.push("and improve");
	r.push(App.UI.DOM.makeElement("span", App.UI.DOM.combineNodes(App.Encyclopedia.link("devotion", "From Rebellious to Devoted"), "."), ["devotion", "inc"]));
	r.push(App.Encyclopedia.link("Trust", "Trust", "trust inc"));
	r.push("and");
	r.push(App.Encyclopedia.link("reputation", "Arcologies and Reputation", "reputation inc"));
	r.push("can wait.");
	App.Events.addParagraph(f, r);

	App.UI.DOM.appendNewElement("h3", f, "Moving forward");
	r = [];
	r.push("Hopefully, many of your slaves learned skills during their week of");
	r.push(App.UI.DOM.combineNodes(App.Encyclopedia.link("whoring"), "."));
	r.push("Three levels of skill (<span class='cyan'>Veteran Whore</span> or <span class='cyan'>W+++</span> for example) is the maximum, though slaves without vaginas will only acquire two complete levels of sexual skills. As you move through the first ten weeks or so, many of your slaves will max out their whoring and sexual skills. When they do, switch them over to");
	r.push(App.Encyclopedia.link("public service", "Public Service"));
	r.push("until they achieve maximum");
	r.push(App.UI.DOM.combineNodes(App.Encyclopedia.link("entertainment skill", "Entertainment Skill"), ","));
	r.push("and then put them back on whoring, since cross training will improve their whoring performance. When your Head Girl alternate has maxed skills, make her the Head Girl and train up the MILF she replaced. Switch your personal attention around; for now, fix the");
	r.push(App.Encyclopedia.link("quirks"));
	r.push("of the most");
	r.push(App.Encyclopedia.link("devoted", "From Rebellious to Devoted", "devotion accept"));
	r.push("slave who has any, since that's the best way to maximize your chances of success each turn.");
	App.Events.addParagraph(f, r);

	r = [];
	r.push(`Pay attention to your cash flow. If it's positive and you have a decent buffer of <span class='cash'>${cashFormat(10000)}</span> or so built up, wait for the slave market prices to naturally dip, and then purchase a girl or two to work on once your starting stable is well trained, though you may have to confine or rest new purchases for a while if they're`);
	r.push(App.Encyclopedia.link("rebellious", "From Rebellious to Devoted", "devotion resistant"));
	r.push("or sick. If you get a virgin, consider applying chastity to preserve value for resale. When prices are high, consider selling anyone who's free of flaws and has a discovered sexual fetish, since this maximizes value bonuses. Within ten turns, you should be making decent weekly profit, with resale of slaves building up your bank when prices favor sale. Once you're confident of the whoring mechanics, consider building a");
	r.push(App.UI.DOM.combineNodes(App.Encyclopedia.link("brothel"), "."));
	r.push("Your alternate Head Girl will make a good");
	r.push(App.UI.DOM.combineNodes(App.Encyclopedia.link("madam"), "."));
	App.Events.addParagraph(f, r);

	return f;
}, "guide");

App.Encyclopedia.addArticle("How to Play", function() {
	const f = new DocumentFragment();
	let r;

	r = [];
	r.push("This is not a game in which the PC slaveowner is some magical sexual god whose mere presence turns women into submissives. This means that sane slaves will tend to lose obedience and");
	r.push(App.Encyclopedia.link("trust", "Trust", "trust inc"));
	r.push("over time if you don't take any steps to maintain their mental state. Mental stats have maximum and minimum values. These are somewhat 'sticky,' so slaves at minimum");
	r.push(App.Encyclopedia.link("devotion", "From Rebellious to Devoted", "devotion accept"));
	r.push("for example may require an extra jolt to break free of this state.");
	App.Events.addParagraph(f, r);

	r = [];
	r.push("Maximized");
	r.push(App.Encyclopedia.link("devotion", "From Rebellious to Devoted", "devotion accept"));
	r.push("and");
	r.push(App.Encyclopedia.link("trust", "Trust", "trust careful"));
	r.push("are not useless; if one of these stats is maximized and the other is not, the extra");
	r.push(App.Encyclopedia.link("devotion", "From Rebellious to Devoted", "devotion accept"));
	r.push("or");
	r.push(App.Encyclopedia.link("trust", "Trust", "trust careful"));
	r.push("will boost the other. If both are maximized, the player gains");
	r.push(App.Encyclopedia.link("reputation", "Arcologies and Reputation", "reputation inc"));
	r.push("instead. However if both are low the slave in question is liable to experience breakdowns and generally be useless.");
	App.Events.addParagraph(f, r);

	r = [];
	r.push("A slave's health is extremely important. Being healthy generally improves beauty and job performance. Most transformative drugs and surgeries can damage health, while curative drugs and rest will restore it. Extremely unhealthy slaves can die, while extremely healthy slaves enjoy considerable bonuses on many assignments. Health damage is generally scaled to a slave's current health, so if a slave is already unhealthy, injuries will hurt her more severely. Pulling a slave with red health indicators off work for a week of rest is generally advisable.");
	App.Events.addParagraph(f, r);

	r = [];
	r.push("The first button in the left-side UI bar will always continue the game without taking any actions. If you wish to advance the game rapidly, click that button repeatedly. If you are presented with a menu and do not wish to select any of the options, that button will also serve as a none of the above choice. <strong>The spacebar will also advance the game.</strong>");
	App.Events.addParagraph(f, r);

	r = [];
	r.push("The author has played several otherwise good H-Games in which it can be hard to parse exactly what the flavor descriptions mean in terms of stats. Therefore, this game will usually flag stat impacts in descriptions by means of colored text. For example:");
	const ul = document.createElement("ul");
	App.Events.addNode(ul, ["<span class='green'>Green text</span> means something good, like a <span class='health inc'>healthy</span> slave."], "li");
	App.Events.addNode(ul, ["<span class='red'>Red text</span> means something bad, like a sick or injured slave. "], "li");
	App.Events.addNode(ul, ["<span class='yellow'>Yellow text</span> means something neutral but noteworthy. "], "li");
	App.Events.addNode(ul, ["<span class='hotpink'>pink text</span> means an increase in a slave's regard for to you. "], "li");
	App.Events.addNode(ul, ["<span class='mediumorchid'>Orchid text</span> means a decrease in a slave's regard for to you. "], "li");
	App.Events.addNode(ul, ["<span class='trust inc'>Aquamarine text</span> means an increase in a slave's",
		App.Encyclopedia.link("trust", "Trust", "trust inc"), "of to you, and a reduction in her fear of you. "], "li");
	App.Events.addNode(ul, ["<span class='trust dec'>Gold text</span> means a decrease in the slave's",
		App.Encyclopedia.link("trust", "Trust", "trust dec"), " of you, and an increase in her fear of you. "], "li");
	App.Events.addNode(ul, ["<span class='orangered'>Orange-red text</span> means a decrease in a hateful slave's fear of you. "], "li");
	App.Events.addNode(ul, ["<span class='lime'>Lime text</span> means something has grown or improved, which is usually, but not always, good. "], "li");
	App.Events.addNode(ul, ["<span class='orange'>Orange text</span> means something has shrunk or degraded, which is usually, but not always, bad. "], "li");
	App.Events.addNode(ul, ["<span class='cash'>Yellow-green text</span> is for a",
		App.UI.DOM.combineNodes(App.Encyclopedia.link("money", "Money", "cash"), "-related"), "event. "], "li");
	App.Events.addNode(ul, ["<span class='coral'>Coral text</span> is used for simple identifiers that can be used to check a slave's general type at a glance, also weakening fetishes. "], "li");
	App.Events.addNode(ul, ["<span class='lightcoral'>Light coral text</span> is used when a slave's fetish strengthens or develops. "], "li");
	App.Events.addNode(ul, ["<span class='lightgreen'>Light green text</span> is used to indicate positive relationships. "], "li");
	App.Events.addNode(ul, ["<span class='lightsalmon'>Light salmon text</span> is used when a rivalry develops or strengthens. "], "li");
	App.Events.addNode(ul, ["<span class='libido inc'>Violet text</span> means an increase in sex drive. "], "li");
	App.Events.addNode(ul, ["<span class='libido dec'>Khaki text</span> means a decrease in sex drive. "], "li");
	r.push(ul);
	App.Events.addParagraph(f, r);

	r = [];
	r.push("<strong>It is important to note</strong> that if a scene doesn't have colored text, it doesn't impact a slave's stats. For example, the short sex scenes available from the main screen are for the most part unlimited and have no real gameplay effect: they are for fun and flavor only.");
	App.Events.addParagraph(f, r);

	r = [];
	r.push("This game produces less visible text than a lot of text-based H-Games; this is because most text has numerous variations that change based on a slave's body, mental state etc. The author has deliberately made some of the variations available only with extreme stats so that new content will still be out there even if you play for a while.");
	App.Events.addParagraph(f, r);

	r = [];
	r.push("Things that increase income from");
	r.push(App.UI.DOM.combineNodes(App.Encyclopedia.link("prostitution", "Whoring"), ","));
	r.push(App.Encyclopedia.link("reputation", "Arcologies and Reputation", "reputation inc"));
	r.push("gain from");
	r.push(App.UI.DOM.combineNodes(App.Encyclopedia.link("slutting", "Public Service"), ","));
	r.push("and performance in most jobs include all appearance stats (that's right, every one; though some are more or less important),");
	r.push(App.UI.DOM.combineNodes(App.Encyclopedia.link("sexual skills", "Skills"), ","));
	r.push("a slave's");
	r.push(App.UI.DOM.combineNodes(App.Encyclopedia.link("health"), ","));
	r.push("and the state of a slave's holes. Going from a novice to a veteran whore will have non-linear impacts on income, since a novice will get good");
	r.push(App.Encyclopedia.link("money", "Money", "cash"));
	r.push("for being fresh and little");
	r.push(App.Encyclopedia.link("money", "Money", "cash"));
	r.push("for her skills, and a veteran will get the reverse. The");
	r.push(App.Encyclopedia.link("fetishes"));
	r.push("and physical statuses that get pink text on the main menu (huge tits, bisexual, etc.) give bonuses.");
	App.Events.addParagraph(f, r);

	r = [];
	r.push("The game is not intended to be crushingly difficult, but it is balanced so that in order to achieve some of the best event outcomes, and eventually in order to survive, the player must build a business empire that turns a significant profit. Profits are necessary because the player will want to be able to make some major expenditures in the late game. Buy low, sell high, and always try to improve your slaves. Even something as simple as a few weeks' personal attention to fix");
	r.push(App.Encyclopedia.link("mental flaws", "Flaws"));
	r.push("and boost");
	r.push(App.Encyclopedia.link("devotion", "From Rebellious to Devoted", "devotion accept"));
	r.push("can produce significant profits when a slave is resold.");
	App.Events.addParagraph(f, r);

	return f;
}, "guide");

App.Encyclopedia.addArticle("Keyboard Shortcuts", function() {
	const f = new DocumentFragment();
	let r;

	r = [];
	r.push(`The uppermost button (in events and reports it continues the game, while in menus it functions as a back button) in the left-side UI bar can be activated via context sensitive keybinds; <strong>${App.UI.Hotkeys.hotkeys("endWeek")}</strong> is used to end the week from the main menu, and <strong>${App.UI.Hotkeys.hotkeys("nextLink")}</strong> is used to continue in all other situations.`);
	App.Events.addParagraph(f, r);

	r = [];
	r.push(`Within slaves' individual menus <strong>${App.UI.Hotkeys.hotkeys("prev-slave")}</strong> will move to the last slave and <strong>${App.UI.Hotkeys.hotkeys("next-slave")}</strong> to the next.`);
	r.push(`Review your personal affairs with <strong>${App.UI.Hotkeys.hotkeys("Manage Personal Affairs")}</strong> and weekly actions with <strong>${App.UI.Hotkeys.hotkeys("Personal Attention Select")}</strong>.`);
	const ul = document.createElement("ul");
	App.Events.addNode(ul, [`<strong>${App.UI.Hotkeys.hotkeys("Rules Assistant")}</strong> will open RA Rules.`], "li");
	App.Events.addNode(ul, [`<strong>${App.UI.Hotkeys.hotkeys("Manage Arcology")}</strong> will open arcology management.`], "li");
	App.Events.addNode(ul, [`<strong>${App.UI.Hotkeys.hotkeys("Options")}</strong> will opens the options menu.`], "li");
	App.Events.addNode(ul, [`<strong>${App.UI.Hotkeys.hotkeys("Buy Slaves")}</strong> will open the slave markets.`], "li");
	App.Events.addNode(ul, [`<strong>${App.UI.Hotkeys.hotkeys("BG Select")}</strong> will open Bodyguard management.`], "li");
	App.Events.addNode(ul, [`<strong>${App.UI.Hotkeys.hotkeys("Future Society")}</strong> will open Future Societies.`], "li");
	App.Events.addNode(ul, [`<strong>${App.UI.Hotkeys.hotkeys("Manage Penthouse")}</strong> will open Manage Penthouse.`], "li");
	App.Events.addNode(ul, [`<strong>${App.UI.Hotkeys.hotkeys("Manage Penthouse")}</strong> will <strong>only open</strong> Head Girl management on the main page.`], "li");
	r.push(ul);
	App.Events.addParagraph(f, r);

	r = [];
	r.push("Nearly every key can be rebound in Hotkey Settings which can be accessed in game via SideBar -> Options -> Hotkey Settings.");
	App.Events.addParagraph(f, r);

	return f;
}, "guide");

App.Encyclopedia.addArticle("The Arcology Interface", function() {
	const f = new DocumentFragment();
	let r;

	r = [];
	r.push("The Arcology Interface is the large table-based display at the top of the main menu. It's designed as an abstract representation of the arcology.");
	App.Events.addParagraph(f, r);

	r = [];
	r.push("It is divided into levels and sectors. Levels are the horizontal rows. An arcology is a very large building, and each Level includes many floors. Sectors are slices of those levels. For example, on Levels with four Sectors, each sector includes a quarter of each floor that's part of that Level. Each Sector has its own cell in the interface, and each Sector is occupied by facilities, tenants, or both. Each type of Sector occupant is bordered in a different color. The contents of a Sector can be viewed and changed by clicking on the text inside a Sector.");
	App.Events.addParagraph(f, r);

	r = [];
	r.push("The uppermost level is the Penthouse. It's where the player character and the slaves under their direct supervision live, and it can be upgraded with a number of facilities that can be accessed through shortcuts that are added to the Penthouse in the interface once they're installed. Some of these facilities can house some of the player character's sex slaves. Unlike every other Sector, the Penthouse is always owned by the player and cannot be sold. Every other Sector can be privately owned, reducing the player's control of the arcology. Privately owned Sectors can be purchased, or acquired using");
	r.push(App.Encyclopedia.link("reputation", "Arcologies and Reputation", "reputation inc"));
	r.push("if the player character's");
	r.push(App.Encyclopedia.link("reputation", "Arcologies and Reputation", "reputation inc"));
	r.push("is extremely high. Privately owned sectors are bordered in red regardless of what's in them.");
	App.Events.addParagraph(f, r);

	r = [];
	r.push("The next level down, with three Sectors, is the Promenade, which is a major social area and hosts most of the businesses which cater to the arcology's citizens. Promenade Sectors are occupied by Shops by default, which will automatically be filled by business tenants that will pay the player character rent if they own the Sector. Promenade Sectors can be upgraded into");
	r.push(App.UI.DOM.combineNodes(App.Encyclopedia.link("brothels", "Brothel"), ","));
	r.push(App.UI.DOM.combineNodes(App.Encyclopedia.link("clubs", "Club"), ","));
	r.push("or an enhanced version of shops which will attract business tenants that help advance a specific");
	r.push(App.Encyclopedia.link("future society", "Future Societies"));
	r.push("model, and still provide rent.");
	App.Events.addParagraph(f, r);

	r = [];
	r.push("The next three levels have four sectors and are living areas that are occupied by apartments by default. These house arcology citizens, who pay rent, and who are indirectly very important because they determine the level of local demand for sexual services provided by whores, public servants, and other sex slaves doing sexual jobs. Apartments can be upgraded for either density or luxury. Dense Apartments increase the citizen population, and are therefore useful to keep demand up if the player is relying on selling or giving away sexual services. Luxury apartments increase the arcology's prosperity, and are therefore a better choice if demand for sexual services isn't a priority.");
	App.Events.addParagraph(f, r);

	r = [];
	r.push("The first level with five Sectors is the Concourse. Like the Promenade, it hosts businesses, but these focus more on bulk trade and less on citizens' luxury needs, and include the arcology's slave markets. Its sectors are occupied by Markets by default, which pay rent. Concourse sectors can be upgraded into a");
	r.push(App.Encyclopedia.link("pit"));
	r.push("for fighting slaves, an");
	r.push(App.UI.DOM.combineNodes(App.Encyclopedia.link("arcade"), ","));
	r.push("or into a flagship store for the player character's");
	r.push(App.UI.DOM.combineNodes(App.Encyclopedia.link("corporation", "The Corporation"), "."));
	App.Events.addParagraph(f, r);

	r = [];
	r.push("The lowest level, also with five Sectors, is the Service level. Its Sectors are occupied by Manufacturing by default, which of course pay rent. If the player is focusing on menial slaves, its Sectors can be upgraded into pens, to increase the total number of");
	r.push(App.Encyclopedia.link("menial slaves", "Menial Slaves"));
	r.push("that can be kept in the arcology, or into Sweatshops, to put the labor of menial slaves in the arcology to use. Alternatively, these Sectors can be upgraded into a");
	r.push(App.UI.DOM.combineNodes(App.Encyclopedia.link("dairy"), ","));
	r.push("or into a barracks, which will reduce the weekly upkeep of any mercenaries the player character has hired.");
	App.Events.addParagraph(f, r);

	return f;
}, "guide");

App.Encyclopedia.addArticle("Tips and Tricks", function() {
	const f = new DocumentFragment();
	let r;

	App.UI.DOM.appendNewElement("p", f, "Buy low, sell high.");

	r = [];
	r.push("Slaves will sometimes default to the resting assignment after they're done with something else. If a slave is resting and the game suspects that she shouldn't be, her assignment will be <span class='freeAssignment'>lime, bold, and underlined</span> on the main menu to indicate that.");
	App.Events.addParagraph(f, r);

	r = [];
	r.push("If a new slave isn't afraid of you, make her. Then and only then build her");
	r.push(App.UI.DOM.makeElement("span", App.UI.DOM.combineNodes(App.Encyclopedia.link("devotion", "From Rebellious to Devoted"), "."), ["devotion", "accept"]));
	App.Events.addParagraph(f, r);

	r = [];
	r.push("The personal attention assignment should be used tactically. It is the most powerful single way of improving slaves because it's reliable. Devotion and");
	r.push(App.Encyclopedia.link("trust", "Trust"));
	r.push("gains during a single week are normally capped. However, personal attention removes these caps. This is most powerful for slaves that are already well broken and are enjoying fairly luxurious lives. With so many things driving up devotion and");
	r.push(App.UI.DOM.combineNodes(App.Encyclopedia.link("trust", "Trust"), ","));
	r.push("using personal attention to remove the caps can quickly maximize both stats. Focusing on business instead (by selecting no slave for personal attention) is also powerful. Doing so produces");
	r.push(App.Encyclopedia.link("money", "Money", "cash"));
	r.push("proportional to the amount of");
	r.push(App.Encyclopedia.link("money", "Money", "cash"));
	r.push("on hand, <strong>and</strong> improves prosperity growth, which improves future income from rents.");
	App.Events.addParagraph(f, r);

	return f;
}, "guide");

App.Encyclopedia.addArticle("Design Your Master", function() {
	const outer = document.createElement("p");
	const showSecExp = V.secExpEnabled > 0;

	outer.append(content(showSecExp));

	return outer;

	/**
	 * @param {boolean} showSecExp
	 * @returns {DocumentFragment}
	 */
	function content(showSecExp) {
		const f = new DocumentFragment();
		let r;

		r = [];
		r.push("This happens at the start of a game of FC: it is not possible to change the PC during the main game. The player must select a career background, a rumored method of acquiring the arcology, and their age group; then choose between some broad body and gender options.");
		App.Events.addParagraph(f, r);

		r = [];
		r.push(`<strong>Wealth</strong> is a choice for both the <strong>career background</strong> and <strong>rumored method of acquiring the arcology</strong> options. Both provide you with <span class="cash">${cashFormat(10000)}</span> each for a total of <span class="cash">${cashFormat(30000)}</span> if both are chosen. As a <strong>background option</strong> it means that your starting slaves will have two free levels of sex skills available`);
		if (showSecExp) {
			r.push("and maintaining");
			r.push(App.Encyclopedia.link("authority", "Security Expansion", "darkviolet"));
			r.push("will be harder, but upgrades in the propaganda hub will be");
			r.push(App.Encyclopedia.link("cheaper.", "Money", "cash"));
		} else {
			r.push(r.pop() + ".");
		}
		App.Events.addParagraph(f, r);

		App.UI.DOM.appendNewElement("h3", f, "Career background options");
		const p = document.createElement("p");
		p.append("Being an ex-");
		let ul = document.createElement("ul");

		r = [];
		r.push("<strong>business owner</strong> <span class='note'>(also referred to as capitalist)</span> enhances the business-focused personal attention, increasing the");
		r.push(App.Encyclopedia.link("money", "Money", "cash"));
		r.push("it produces and improving arcology prosperity when business-focused personal attention is selected. Also,");
		if (showSecExp) {
			r.push("upgrades in the propaganda hub will be");
			r.push(App.Encyclopedia.link("cheaper", "Money", "cash"));
			r.push("and");
		}
		r.push("your starting slaves will have a free level of prostitution skill available. Starts having already mastered");
		r.push(App.UI.DOM.combineNodes(App.Encyclopedia.link("Trading", "PC Skills"), "."));
		App.Events.addNode(ul, r, "li");

		r = [];
		r.push("<strong>private security contractor</strong> <span class='note'>(also referred to as mercenary background)</span> greatly reduces the cost of keeping mercenaries in your employ.");
		if (showSecExp) {
			r.push("Upgrades in the security HQ will be");
			r.push(App.Encyclopedia.link("cheaper.", "Money", "cash"));
		}
		r.push("Your starting slaves will have free");
		r.push(App.Encyclopedia.link("trust", "Trust", "trust careful"));
		r.push("available. Starts having already mastered");
		r.push(App.UI.DOM.combineNodes(App.Encyclopedia.link("Warfare", "PC Skills"), "."));
		App.Events.addNode(ul, r, "li");

		r = [];
		r.push("<strong>slave driver</strong> enhances slave-focused personal attention, adding bonus");
		r.push(App.Encyclopedia.link("devotion", "From Rebellious to Devoted", "devotion accept"));
		r.push("or");
		r.push(App.Encyclopedia.link("trust", "Trust", "trust careful"));
		r.push("to many training applications or preventing their loss.");
		if (showSecExp) {
			r.push(App.Encyclopedia.link("Authority", "Security Expansion", "darkviolet"));
			r.push("will be easier to maintain. Plus upgrades in the security HQ will be");
			r.push(App.Encyclopedia.link("cheaper.", "Money", "cash"));
		}
		r.push("Starting slaves will be cheaper, in addition having already mastered");
		r.push(App.UI.DOM.combineNodes(App.Encyclopedia.link("Slaving", "PC Skills"), "."));
		App.Events.addNode(ul, r, "li");

		r = [];
		r.push("<strong>arcology engineer</strong> provides a significant discount on many <span class='cash'>arcology upgrades and expansions.</span> In addition to the arcology starting off with <span class='positive'>basic economic upgrades</span> already installed. Starts having already mastered");
		r.push(App.UI.DOM.combineNodes(App.Encyclopedia.link("Engineering", "PC Skills"), "."));
		App.Events.addNode(ul, r, "li");

		r = [];
		r.push("<strong>doctor</strong> allows the player character to perform surgery personally, providing a <span class='cash'>discount on surgery costs</span> and a <span class='positive'>reduction to resulting health damage.</span> Additionally, slaves may react differently to surgery if the player character performs it and starting slaves will have free implants available. Starts having already mastered");
		r.push(App.UI.DOM.combineNodes(App.Encyclopedia.link("Medicine", "PC Skills"), "."));
		App.Events.addNode(ul, r, "li");

		r = [];
		r.push("<strong>escort</strong> provides a one-time bonus to a slave's entertainment, whoring, and two sexual skills when a new slave is acquired. Furthermore, society will not take lightly to being run by an ex-whore, and you will receive heavy");
		r.push(App.Encyclopedia.link("reputation", "Arcologies and Reputation", "reputation inc"));
		if (showSecExp) {
			r.push("and");
			r.push(App.Encyclopedia.link("authority", "Security Expansion", "darkviolet"));
		}
		r.push("losses each week. You can spend your free time selling your body for");
		r.push(App.Encyclopedia.link("money,", "Money", "cash"));
		r.push("at the cost of a large amount of");
		r.push(App.Encyclopedia.link("reputation", "Arcologies and Reputation", "reputation inc"));
		App.Events.addNode(ul, r, "li");

		r = [];
		r.push("<strong>celebrity</strong> provides extra");
		r.push(App.Encyclopedia.link("reputation", "Arcologies and Reputation", "reputation inc"));
		r.push("at game start");
		if (showSecExp) {
			r.push("and upgrades in the propaganda hub will be");
			r.push(App.Encyclopedia.link("cheaper.", "Money", "cash"));
		} else {
			r.push(r.pop() + ".");
		}
		r.push("Starting slaves will have a free level of entertainment skill available.");
		App.Events.addNode(ul, r, "li");

		r = [];
		r.push("<strong>servant</strong> provides a one-time bonus to a slave's");
		r.push(App.Encyclopedia.link("trust", "Trust", "trust careful"));
		r.push("and");
		r.push(App.UI.DOM.makeElement("span", App.UI.DOM.combineNodes(App.Encyclopedia.link("devotion", "From Rebellious to Devoted"), "."), ["devotion", "accept"]));
		r.push("Furthermore, society will not approve of being run by an ex-servant, and you will face");
		r.push(App.Encyclopedia.link("reputation", "Arcologies and Reputation", "reputation inc"));
		if (showSecExp) {
			r.push("and");
			r.push(App.Encyclopedia.link("authority", "Security Expansion", "darkviolet"));
		}
		r.push("losses each week. You can spend your free time, putting your previous experience to use, by greatly reducing the costs of your penthouse. You also passively reduce costs when not focusing on doing so.");
		App.Events.addNode(ul, r, "li");

		r = [];
		r.push("<strong>gang leader</strong> provides a one-time bonus to a slave's health and a free level of combat skill. Furthermore, society will not approve of being run by a gang-banger, and you will face");
		r.push(App.Encyclopedia.link("reputation", "Arcologies and Reputation", "reputation inc"));
		r.push("losses each week. New slaves will likely have heard of your previous exploits and fear you.");
		if (showSecExp) {
			r.push("You know how to haggle slaves and assert your");
			r.push(App.UI.DOM.makeElement("span", App.UI.DOM.combineNodes(App.Encyclopedia.link("authority", "Security Expansion"), "."), "darkviolet"));
			r.push("Plus upgrades in the security HQ will be");
			r.push(App.Encyclopedia.link("cheaper.", "Money", "cash"));
		}
		r.push("You know how to haggle slaves. You can spend your free time putting your previous experience to use, proving another source of income however this isn't guaranteed.");
		App.Events.addNode(ul, r, "li");

		r = [];
		r.push("<strong>incursion specialist</strong> provides starting slaves with a free level of <span class='intelligent'>intelligence.</span> Also certain upgrades may be");
		r.push(App.Encyclopedia.link("cheaper", "Money", "cash"));
		r.push("and you may find alternative approaches to");
		if (showSecExp) {
			r.push("problems, but you will find");
			r.push(App.Encyclopedia.link("authority", "Security Expansion", "darkviolet"));
			r.push("quite hard to maintain.");
		} else {
			r.push("problems.");
		}
		r.push("Starts having already mastered");
		r.push(App.UI.DOM.combineNodes(App.Encyclopedia.link("Hacking", "PC Skills"), "."));
		App.Events.addNode(ul, r, "li");

		p.append(ul);
		f.append(p);

		r = [];
		let text;
		if (showSecExp) {
			text = "Hide SecExp details";
		} else {
			r.push("Players using the");
			r.push(App.Encyclopedia.link("Security Expansion", "Security Expansion"));
			r.push("mod may want to view this page with");
			text = "additional details";
		}
		r.push(App.UI.DOM.combineNodes(App.UI.DOM.link(text, () => {
			$(outer).empty().append(content(!showSecExp));
		}), "."));
		App.Events.addParagraph(f, r);

		App.UI.DOM.appendNewElement("h3", f, "Rumored acquisition options");
		ul = document.createElement("ul");
		r = [];
		r.push("<strong>Hard Work</strong> provides a one-time bonus to both");
		r.push(App.Encyclopedia.link("devotion", "From Rebellious to Devoted", "devotion accept"));
		r.push("and");
		r.push(App.Encyclopedia.link("trust", "Trust", "trust accept"));
		r.push("when a new slave is acquired.");
		App.Events.addNode(ul, r, "li");

		r = [];
		r.push("<strong>Force</strong> means that if a slave does not have enough");
		r.push(App.Encyclopedia.link("devotion", "From Rebellious to Devoted", "devotion accept"));
		r.push("to obey when acquired, this option will terrify her and reduce her");
		r.push(App.Encyclopedia.link("trust", "Trust", "trust accept"));
		r.push("to the point where she should comply.");
		App.Events.addNode(ul, r, "li");

		r = [];
		r.push("<strong>Social Engineering</strong> means that you will start with the first societal option unlocked, since you manipulated the arcology's citizens.");
		App.Events.addNode(ul, r, "li");

		r = [];
		r.push("<strong>Luck</strong> provides extra");
		r.push(App.Encyclopedia.link("reputation", "Arcologies and Reputation", "reputation inc"));
		r.push("at game start, but no ongoing advantages once the main game begins.");
		App.Events.addNode(ul, r, "li");

		App.UI.DOM.appendNewElement("p", f, ul);

		App.UI.DOM.appendNewElement("h3", f, "Age groups");
		r = [];
		r.push("Older PCs enjoy easier");
		r.push(App.Encyclopedia.link("reputation", "Arcologies and Reputation", "reputation inc"));
		r.push("maintenance, but possess lower");
		r.push(App.Encyclopedia.link("sexual energy", "Sexual Energy"));
		r.push("while younger PC's are the opposite.");
		App.Events.addParagraph(f, r);

		App.UI.DOM.appendNewElement("h3", f, "Body and gender options");
		r = [];
		r.push("All PC body changes will alter scenes, but their main mechanical effect is on");
		r.push(App.Encyclopedia.link("reputation", "Arcologies and Reputation", "reputation inc"));
		r.push("maintenance. Feminine options will make it harder to maintain");
		r.push(App.Encyclopedia.link("reputation", "Arcologies and Reputation", "reputation inc"));
		r.push("without providing any gameplay advantage, making playing as a feminine PC a form of increased difficulty. There are other minor gameplay differences including differing slave reactions to the PC based on attraction, but these are fairly minor.");
		App.Events.addParagraph(f, r);

		return f;
	}
}, "guide");

App.Encyclopedia.addArticle("Guide to Eugenics", function() {
	const outer = document.createElement("div");
	const r = new SpacedTextAccumulator(outer);

	r.push("Unlike most other Future Societies, Eugenics substantially changes the tone and mechanics of the game. It's advisable to get comfortable with Free Cities and Future Societies in general before trying Eugenics. This guide will help you understand some of the mechanical differences involved in playing with Eugenics active.");
	r.toParagraph();

	r.push("The Societal Elite");
	r.toNode("h3");

	r.push("The premise of the Eugenics Future Society is that the Societal Elite are a superior class of people. Although the name 'Eugenics' suggests genetic superiority, the real focus of the Eugenics movement is around maintaining a power gradient, not genetics, just like most real-world eugenics movements.");
	r.toParagraph();

	r.push("By granting their influence to the Societal Elite, you can join them, but the cost is the control of your arcology. Unlike other FSes, when you accept Eugenics, you are subordinating your absolute control over your own arcology to the Societal Elite. In exchange, they grant you significant boons through their connections, including discounts to arcology upgrades and medical procedures, debt protection, and early access to advanced technology such as cloning and organ implants.");
	r.toParagraph();

	r.push("In", App.Encyclopedia.link("Neo-imperialist arcologies,", "Neo-Imperialism"), "the Societal Elite also serve as your <strong>Barons</strong>; they function in a mostly-identical manner from a mechanical perspective.");
	r.toParagraph();

	r.push("First Phase: Building a Eugenics Society");
	r.toNode("h3");

	r.push("When you first adopt Eugenics, you should do everything possible to encourage rapid adoption of the FS and satisfy the Societal Elite. This phase is similar to the adoption phase in other Future Societies, but the penalties for failure are much more severe: you will lose a huge amount of reputation, many wealthy citizens will leave your arcology, your prosperity will drop, and the FS will be placed on a timer during which it cannot be adopted again. Details of what the Societal Elite expect from you can be found in the", App.Encyclopedia.link("Eugenics", "Eugenics Focus"), "section of the Encyclopedia. Keeping your slaves in chastity belts and/or fully sterilizing them (especially male slaves) is the most important factor. Under no circumstances should you permit a slave under your control to become pregnant in this phase, and existing slave pregnancies should be aborted before adopting Eugenics.");
	r.toParagraph();

	r.push("Second Phase: Satisfying the Societal Elite");
	r.toNode("h3");

	r.push("Once Eugenics is fully adopted, you'll probably want to keep the Societal Elite happy for a little while. Adopting the Eugenics Slave Market Regulations will help with this. At this point, you can also begin breeding slaves if you have enough reputation. Enact the \"Elite Breeder Eligibility\" policy and play through the mini-event. After that, the requirements for getting slaves approved as a breeder are found in Personal Affairs in the \"Elite Breeder Qualifications\" section; this will be customized for your arcology based on your other Future Societies. Select a slave you think will pass, and choose \"Breeder Eligibility Exam\" in their Physical Regimen. If they pass, they'll get a breeding mark and the Elite will be happy instead of angry when you get them pregnant. Do not let the public get your breeding slaves pregnant; only you and the Societal Elite should father their babies. Also note that marked breeding slaves have additional restrictions placed on them (certain types of damaging surgery, hormone treatments, participation in combat, and large sex toys are prohibited, among other things).");
	r.toParagraph();

	r.push("If you are playing a PC with female sex organs, the Societal Elite will ask you to carry a child for them. If they're otherwise happy with you, you'll be able to turn them down and still get slaves approved as breeders. Agreeing to carry an Elite child is also a good way to keep them happy.");
	r.toParagraph();

	r.push("Third Phase: The Takeover Attempt");
	r.toNode("h3");

	r.push("You can continue working with the Societal Elite as long as you want, but at some point you will probably want full control of your arcology back. Fortunately, once Eugenics is fully entrenched in your arcology, your Societal Elites cannot leave...they can only try to rebel. If you irritate the Societal Elite sufficiently, they will attempt to violently depose you. Make sure you have a loyal and capable", App.Encyclopedia.link("bodyguard", "Bodyguard"), "before angering them. Having mercenaries quartered in your arcology");
	if (V.SF.Toggle) {
		r.push("or the Special Forces active");
	}
	r.push("will also let you obtain more positive outcomes when it comes down to the wire. After you've eliminated the troublesome Elite, you will once again have total control of your arcology, and the various slave restrictions will be lifted.");
	r.toParagraph();

	return outer;
}, "guide");

App.Encyclopedia.addCategory("guide", function() {
	const r = [];
	r.push(App.Encyclopedia.link("First Game Guide"));
	r.push(App.Encyclopedia.link("How to Play"));
	r.push(App.Encyclopedia.link("Keyboard Shortcuts"));
	r.push(App.Encyclopedia.link("The Arcology Interface"));
	r.push(App.Encyclopedia.link("Tips and Tricks"));
	r.push(App.Encyclopedia.link("Design Your Master"));
	r.push(App.Encyclopedia.link("Guide to Eugenics"));
	return App.UI.DOM.generateLinksStrip(r);
});
