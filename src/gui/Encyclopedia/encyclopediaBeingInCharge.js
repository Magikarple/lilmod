App.Encyclopedia.addArticle("Being in Charge", function() {
	const f = new DocumentFragment();
	App.UI.DOM.appendNewElement("p", f, "Future room for lore text", ["scene-intro"]);
	App.UI.DOM.appendNewElement("p", f, "Choose a more particular entry below:");
	return f;
}, "beingInCharge");

App.Encyclopedia.addArticle("Arcologies and Reputation", function() {
	const f = new DocumentFragment();
	let r;

	const intro = App.UI.DOM.appendNewElement("div", f, "", ["scene-intro"]);
	App.UI.DOM.appendNewElement("p", intro, "Arcologies are the urban buildings of the future: almost completely self-contained, almost completely self sufficient. In the anarcho-liberal 'paradise' of the Free Cities, as owner of your own arcology you are like a modern-day feudal suzerain, lord and master.");

	App.UI.DOM.appendNewElement("p", intro, "Your arcology is a flared structure, needle thin at the top where you live in your penthouse, and broad at the base. The base below ground contains storage and machinery. The lowest aboveground levels are commercial; above them are the residential areas. The entire structure is jacketed in dense gardens and solar arrays, cleverly structured to create naturally lit corridors and beautiful park-like balconies.");

	App.Encyclopedia.addArticleSource(intro, "Owner's Report");

	App.UI.DOM.appendNewElement("p", f, "You may wish to improve your arcology, but should be able to ignore its development, if you wish.");

	r = [];
	r.push("Your <span class='reputation inc'>reputation</span> is, of course, already quite impressive. The <span class='reputation inc'>reputation</span> tracked in the sidebar is specifically your <span class='reputation inc'>reputation</span> as a slaveowner. It can be raised through decadent actions that display your munificence and opulence. Some random events can increase it, but the most reliable way to improve your <span class='reputation inc'>reputation</span> is to send sexually skilled slaves out into the arcology to offer free sexual services. This assignment is very similar to prostitution, but produces <span class='reputation inc'>reputation</span> rather than");
	r.push(App.Encyclopedia.link("money.", "Money", "cash"));
	r.push(`Your`, App.Encyclopedia.link("Concubine"), `and to a lesser extent, other slaves assigned to your personal sexual service, also have a direct impact on your <span class='reputation inc'>reputation.</span> Maintaining an exclusive harem of beautiful, talented girls is not just one of the greatest perks of being an arcology owner, it's also a grand statement to the world about your personal standing and power.`);
	App.Events.addParagraph(f, r);

	r = [];
	r.push("As your <span class='reputation inc'>reputation</span> develops, you may have the opportunity to guide the future of your arcology's society. Successfully doing so will increase your <span class='reputation inc'>reputation</span> in turn, which will duly enable you to further shape society. Managing societal development well will have a recursive effect on your <span class='reputation inc'>reputation,</span> and can drive it to great heights.");
	App.Events.addParagraph(f, r);

	r = [];
	r.push("Because societal development and reputation build upon each other, arcology owners who have a natural reputation disadvantage (such as young women) may find it best to develop a future society model for which they can easily build wide support early on in their arcology's development. Arcology owners who choose to focus on an especially challenging path at the start of their career, such as");
	r.push(App.Encyclopedia.link("Repopulation", "Repopulationism"), "or", App.Encyclopedia.link("Eugenics,", "Eugenics Focus"));
	r.push("may find that they have difficulty accumulating and maintaining enough <span class='reputation inc'>reputation</span> to shape additional societal development.");
	App.Events.addParagraph(f, r);

	r = [];
	r.push("The benefits of high <span class='reputation inc'>reputation</span> are numerous. Many business and enslavement opportunities will open to you once you are reputable. Some of the most advanced technology is only available to those with impeccable <span class='reputation inc'>reputations</span> as slaveowners, and many of the finer slave markets will only consider reputable buyers. You may eventually become so renowned that merely branding a slave with your mark will increase her value on the open market.");
	App.Events.addParagraph(f, r);

	r = [];
	r.push("However, your <span class='reputation inc'>reputation</span> will not look after itself. At a certain point, you will become so reputable that continual effort will be necessary to maintain your renown and greater feats will be needed to cultivate it further. The old world question <span class='clear-formatting'>\"What have you done for me lately?\"</span> is asked with twice the force in the Free Cities! You will quickly find that this natural decay of <span class='reputation inc'>reputation</span> can overwhelm your efforts to improve it by the end of the week. A concerted strategy will be necessary to overcome this.");
	App.Events.addParagraph(f, r);

	return f;
}, "beingInCharge");

App.Encyclopedia.addArticle("Random Events", function() {
	const f = new DocumentFragment();
	let r;

	r = [];
	r.push("At the end of every turn, a random event may occur. Almost all random events are tied to necessary preconditions. For example, events concerning");
	r.push(App.Encyclopedia.link("rebellious", "From Rebellious to Devoted", "devotion resistant"));
	r.push("slaves will stop happening if all the player's slaves become obedient.");
	App.Events.addParagraph(f, r);

	r = [];
	r.push("Usually, a situation will be presented and the player may choose one of two or three resolutions. Please note that the player may also to choose none of these by using the <span class='encyclopedia interaction'>Continue</span> button in the sidebar; in effect, this usually means the player's character has simply declined to involve himself.");
	App.Events.addParagraph(f, r);

	r = [];
	r.push("Almost all choices will result in small effects. The most common are changes to a slave's attitude towards the player's character, but there are others.");
	App.Events.addParagraph(f, r);

	r = [];
	r.push("Finally, there are events that can result in the player being offered the chance to acquire new slaves, some of which can be unique or valuable. Generally, these events offer this livestock at an extremely discounted price. These events will appear more often the higher the player's");
	r.push(App.Encyclopedia.link("reputation", "Arcologies and Reputation", "reputation inc"));
	r.push("becomes.");
	App.Events.addParagraph(f, r);

	return f;
}, "beingInCharge");

App.Encyclopedia.addArticle("Costs Summary", function() {
	const f = new DocumentFragment();
	let r;

	const basicDrugCost = V.drugsCost ? V.drugsCost : 100;
	const basicRulesCost = V.rulesCost ? V.rulesCost : 100;

	r = [];
	r.push("Aphrodisiacs are");
	r.push(App.Encyclopedia.link("cheap", "Money", "cash"));
	r.push(`and cost <span class='cash'>${cashFormat(basicDrugCost)}</span> weekly; curatives are expensive and cost <span class='cash'>${cashFormat(basicDrugCost * 3)}</span> weekly; while all other drug regimes cost <span class='cash'>${cashFormat(basicDrugCost * 2)}.</span> Standard hormone regimens cost <span class='cash'>${Math.trunc(basicDrugCost * 0.5)}</span> while intensive hormone treatment costs <span class='cash'>${Math.trunc(basicDrugCost * 2 * 0.5)}.</span> Contraceptives cost <span class='cash'>${Math.trunc(basicDrugCost * 0.5)}.</span>`);
	App.Events.addParagraph(f, r);

	r = [];
	r.push(`Slaves on spare living standards are fed a bland diet and obliged to sleep on bedrolls. Keeping a slave under restrictive rules costs <span class='cash'>${cashFormat(getLivingExpenses(LivingRule.SPARE, basicRulesCost))}</span> weekly.`);
	App.Events.addParagraph(f, r);

	r = [];
	r.push(`Slaves enjoying luxurious living standards on the other hand are fed a tasty diet and permitted to sleep in comfortable beds in individual rooms, and are generally pampered. The increased luxury of permissive rules costs <span class='cash'>${cashFormat(getLivingExpenses(LivingRule.LUXURIOUS, basicRulesCost))}</span> weekly for one slave in one room, or <span class='cash'>${cashFormat(2*getLivingExpenses(LivingRule.LUXURIOUS, basicRulesCost, 4))}</span> weekly for two slaves sharing one room.`);
	// room-sharing logic in occupiesRoom() in src/js/utilsSlaves.js#L224
	App.Events.addParagraph(f, r);

	if (V.difficultySwitch) {
		App.UI.DOM.appendNewElement("p", f, "These costs are likely to increase over time as the outside economy continues to fall apart. These costs may also come down somewhat, if the outside economy rallies.");
	}

	App.UI.DOM.appendNewElement("p", f, "An on-site pharmaceutical fabricator can reduce your pharmaceutical expenses by a fourth or even by half, but will not fully insulate you from the need to buy materials on the open market.");

	App.UI.DOM.appendNewElement("p", f, "Costs given are only the base costs, they can be affected by a variety of modifiers, for example economy settings, player background and arcology upgrades. Some upgrades may have associated upkeep costs as well.");
	// Does player background actually affect these costs at all? I don't think that's true.
	// Some upgrades may have associated upkeep costs, but the pharmaceutical fabricator doesn't, so why are we bringing that up?

	return f;
}, "beingInCharge");

App.Encyclopedia.addArticle("Rules Assistant", function() {
	const f = new DocumentFragment();
	let r;

	r = [];
	r.push(App.Encyclopedia.topic("The Rules Assistant"));
	r.push("is a system to apply multiple rule sets to multiple slaves at once. You can apply rules to slaves based on slave");
	r.push(App.UI.DOM.makeElement("span", App.UI.DOM.combineNodes(App.Encyclopedia.link("devotion", "From Rebellious to Devoted"), ","), ["devotion", "accept"]));
	r.push(App.UI.DOM.makeElement("span", App.UI.DOM.combineNodes(App.Encyclopedia.link("trust", "Trust"), ","), ["trust", "careful"]));
	r.push("sex drive, health,");
	r.push(App.UI.DOM.combineNodes(App.Encyclopedia.link("weight", "Weight"), ","));
	r.push(App.UI.DOM.combineNodes(App.Encyclopedia.link("muscles", "Musculature"), ","));
	r.push("lactation, pregnancy, number of fetuses, abdominal implants and age.");
	App.Events.addParagraph(f, r);

	r = [];
	r.push(App.Encyclopedia.topic("Rule settings"));
	r.push("Rules can be used to control certain aspects of slaves everyday lives, for example to automatically give slaves a certain clothing option, collar, footwear or allow slaves to choose their own outfit. They can be used to give unhealthy slaves curatives to improve their health or to put slaves on a diet so that their");
	r.push(App.Encyclopedia.link("weight"));
	r.push("can be closer to the ideal weight. Rules set to <span class='encyclopedia interaction'>No default setting</span> will not apply that particular condition to slaves. Rules can also be renamed to be more indicative of their intended purpose.");
	App.Events.addParagraph(f, r);

	r = [];
	r.push(App.Encyclopedia.topic("Rule activation"));
	r.push("In order to apply a rule to slaves, the activation will need to be set. Choose an activation type");
	r.push(App.UI.DOM.combineNodes("(",
		App.UI.DOM.makeElement("span", App.UI.DOM.combineNodes(App.Encyclopedia.link("devotion", "From Rebellious to Devoted"), ","), ["devotion", "accept"])));
	r.push(App.UI.DOM.makeElement("span", App.UI.DOM.combineNodes(App.Encyclopedia.link("trust", "Trust"), ","), ["trust", "careful"]));
	r.push("sex drive,");
	r.push(App.UI.DOM.combineNodes(App.Encyclopedia.link("health", "Health"), ","));
	r.push(App.UI.DOM.combineNodes(App.Encyclopedia.link("weight", "Weight"), ","));
	r.push(App.UI.DOM.combineNodes(App.Encyclopedia.link("muscles", "Musculature"), ","));
	r.push("lactation, pregnancy, fetuses, implant size, or age) and then choose the level at which to apply. For example to apply a rule to obedient slaves, choose");
	r.push(App.Encyclopedia.link("devotion", "From Rebellious to Devoted", "devotion accept"));
	r.push("for the activation and 4 or more for the lower limit by selecting <span class='encyclopedia interaction'>&gt;=.</span>");
	r.push(`You can also create custom conditions using any property of a slave, which you can find documented <a target='_blank' class='link-external' href='https://gitgud.io/pregmodfan/fc-pregmod/-/raw/pregmod-master/devNotes/legacy files/slave%20variables%20documentation.md'>here.</a>`);
	App.Events.addParagraph(f, r);

	r = [];
	r.push(App.Encyclopedia.topic("Selecting or excluding slaves from a rule"));
	r.push("Slaves can be selected for a rule by selecting slaves from the list so that a rule can apply only to them. Slaves can similarly be excluded from a rule.");
	App.Events.addParagraph(f, r);

	r = [];
	r.push(App.Encyclopedia.topic("Applying a rule to specific assignments"));
	r.push("You can apply a rule only to slaves on individual assignments by selecting them under <span class='encyclopedia interaction'>Apply to assignments.</span> For example a rule can give aphrodisiacs to slaves on whoring assignments. <span class='note'>This is mutually exclusive to automatically giving an assignment to slaves.</span>");
	App.Events.addParagraph(f, r);

	r = [];
	r.push(App.Encyclopedia.topic("Automatically giving an assignment"));
	r.push("A rule can be set to automatically set a slave to an assignment when activated. For example a");
	r.push(App.Encyclopedia.link("devoted", "From Rebellious to Devoted", "devotion accept"));
	r.push("slave can be set to automatically be put on the whoring assignment. <span class='note'>This is mutually exclusive to applying a rule to assignments.</span>");
	App.Events.addParagraph(f, r);

	r = [];
	r.push(App.Encyclopedia.topic("Applying a rule to facilities"));
	r.push("You can apply a rule to slaves in any or all facilities as long as that facility has been constructed. The rule will only apply to slaves within the selected facilities. <span class='note'>This is mutually exclusive to automatically putting slaves into a facility.</span>");
	App.Events.addParagraph(f, r);

	r = [];
	r.push(App.Encyclopedia.topic("Automatically assigning slaves to a facility"));
	r.push("A rule can be set to automatically put a slave into a facility when activated. For example disobedient slaves can be set to automatically be confined in the arcade if it has been constructed. <span class='note'>This is mutually exclusive to applying a rule to facilities.</span>");
	App.Events.addParagraph(f, r);

	r = [];
	r.push(App.Encyclopedia.topic("Saving a rule"));
	r.push("If you are finished setting up a rule <em>make sure to save it</em> by clicking <span class='encyclopedia interaction'>Save rule</span> at the bottom before clicking another link otherwise your settings will be lost.");
	App.Events.addParagraph(f, r);

	r = [];
	r.push(App.Encyclopedia.topic("Applying a rule"));
	r.push("Clicking on <span class='encyclopedia interaction'>Apply rules</span> will automatically save the current rule and apply all rules to slaves at once.");
	App.Events.addParagraph(f, r);

	r = [];
	r.push(App.Encyclopedia.topic("Adding or removing a rule"));
	r.push("The game starts with 3 basic default rule settings but more can be added and/or removed as needed. To add a new rule, click <span class='encyclopedia interaction'>Add a new rule</span> at the bottom, removing a rule is the same by clicking <span class='encyclopedia interaction'>Remove rule.</span>");
	App.Events.addParagraph(f, r);

	return f;
}, "beingInCharge");

App.Encyclopedia.addArticle("The Corporation", function() {
	const f = new DocumentFragment();
	let r;

	r = [];
	r.push("Once you are fairly reputable and have a large sum of cash in the bank, you will receive a brief end of turn event that unlocks the ability to found a corporation dedicated to slaving. Once this happens, you can incorporate from the <span class='encyclopedia interaction'>Manage Corporation</span> link on the sidebar, and once you've done that, you can manage your corporation every week from the same place.");
	App.Events.addParagraph(f, r);

	App.UI.DOM.appendNewElement("h3", f, "Shares");
	r = [];
	r.push("Buying shares from the corporation or issuing new shares will create new shares in the corporation. If you buy them yourself, cash will be transferred from you to the corporation in return for the shares; if you direct the corporation to issue new public shares,");
	r.push(App.Encyclopedia.link("money", "Money", "cash"));
	r.push("will come into the corporation from the market. If you direct the corporation to buy back shares from the public, cash will be transferred from the corporation to reduce the number of public shares, which will increase your ownership percentage. You are not permitted to give up majority ownership of the corporation. Selling your shares or buying publicly held shares are both transactions between you and your shares and shareholders and their shares. All transactions impact the stock price.");
	App.Events.addParagraph(f, r);

	App.UI.DOM.appendNewElement("h3", f, "Divisions");
	App.UI.DOM.appendNewElement("p", f, "The corporation consists of divisions. Starting up your corporation requires you to choose a single division as starting point and you will be able to expand into linked divisions once you have grown sufficiently in size. There are 3 general categories of divisions; acquisition, modification and exploitation. The first consists of legal and extralegal enslavement and they feed fresh slaves into either your corporation or the market at large. Investing in one of these is a good starting point when slave prices are high. Do note that each slave acquired and sold reduces the demand for slaves on the market. This means little at first, but when large enough will impact the market significantly.");
	App.UI.DOM.appendNewElement("p", f, "The second category consists of slave breaking, physical slave modifications and slave training. These divisions either take improvable slaves from your acquisition divisions or the slave market and improve them. Slaves can go from breaking to physical modifications to training and become highly valuable slaves by the end of it. If the slave market is balanced or you are looking for a safe initial investment these divisions are a good choice. Their market impact is neutral, buying slaves reduces supply but selling them back onto the market reduces demand by the same amount.");
	App.UI.DOM.appendNewElement("p", f, "The final category consists of an arcade, menial services, dairy and escort division. These divisions require a particular quality of slave and then put them to work in their respective fields. As these divisions operate they will have to write off some of their slaves and replace them with fresh ones, you can provide these slaves through your acquisition or modification divisions or the market. Whenever prices are low these divisions operate at a higher margin, making them a great first division when slave prices are low. Do note that each slave bought from the market reduces the supply of slaves. As these divisions grow and write off more and more slaves each week, replenishing them from the market will begin to impact the market significantly.");

	App.UI.DOM.appendNewElement("h3", f, "Management");
	App.UI.DOM.appendNewElement("p", f, "Your first division will automatically buy and/or sell slaves in order to do business and make money. It is up to you to decide when to expand the division's capacity, but investing aggressively early will pay off in the long run. Once your corporation has gotten a little time to grow its value (the sum of slave value, division value, cash on hand and dividends reserved) the end of week report will prompt you that a new division can be added. This requires a significant cash investment so you may have to save up a little. Adding divisions comes with efficiency benefits, but also adds overhead costs. Adding a second division will hardly slow you down, but as you grow these costs grow ever larger; depending on the number of divisions, but also the size of them.");
	App.UI.DOM.appendNewElement("p", f, "Any new division will have at least one direct link to your current divisions, meaning it can either use slaves from a division or provide them to another division. New divisions are not automatically set to buy and/or sell slaves from the market. It is expected you either manually move slaves between divisions or sets up automatic links between them using several rules.");
	App.UI.DOM.appendNewElement("p", f, "You have the ability to reduce the size of your divisions or dissolve them entirely. While this only recoups 80% of the investment it may sometimes be prudent to do so, i.e. in case market conditions have become unfavorable for the division and/or overhead costs are becoming oppressively high. Also note that divisions become less efficient the larger they get (even without considering overhead), eventually growing it further will hurt your profit, not improve it. You will want to cut your losses early or otherwise suffer the consequences.");
	App.UI.DOM.appendNewElement("p", f, "In order to personally benefit monetarily from your corporation you will have to decide how much of its profit will be set aside to be paid out as dividends. Setting low or no dividends allows for rapid development, while siphoning a lot of profits away from the corporation will slow it down significantly. Please note that the corporation does not pay out every week but only every quarter (13 weeks).");

	App.UI.DOM.appendNewElement("h3", f, "Slave Sales");
	App.UI.DOM.appendNewElement("p", f, "Once a corporation is created, it will get its own establishment in the slave market. As the corporation's value increase, it can be given direction about what kind of slaves it should train and how it should train them, which will affect the slaves seen in the corporate catalog. As with divisions; the higher your corporation's value, the more specializations you are allowed to choose. Your corporation's divisions determine which specialization options are available. Each division has a unique specialization associated with it while many others are slightly more general and linked to either acquisition or modification. All kinds of restrictions may apply depending on Future Society choices and the size of your divisions. Several specializations can be enhanced beyond the first choice, but again you may need to satisfy certain conditions first.");
	r = [];
	r.push("If the corporation's slaves have qualities that make them especially appealing to an arcology's citizens, the corporation will enjoy increased profits, and the");
	r.push(App.Encyclopedia.link("future society", "Future Societies"));
	r.push("creating the demand will progress more rapidly due to the supply of appealing slaves. All arcologies present in the Free City will interact with the corporation this way, making shares in a corporation which supplies girls that appeal to the whole city extremely lucrative.");
	App.Events.addParagraph(f, r);

	return f;
}, "beingInCharge");

App.Encyclopedia.addArticle("Sexual Energy", function() {
	const f = new DocumentFragment();
	let r;

	App.UI.DOM.appendNewElement("p", f, `Though you're (naturally) a virile, oversexed oligarch, even your reserves of sexual energy are not infinite. They're impressive, but not infinite. Since one turn represents one week, the game does not allow you direct control over every sexual interaction between you character and your slaves. Put another way, the game assumes there's an impressive amount of off-screen sex going on between the you and your chattel.`);

	r = [];
	r.push(`Your sexual energy can have gameplay effects. Though of course all slaves are at the owner's sexual beck and call, some assignments and training methods involve close sexual attention by yourself. If a large number of slaves are subject to this, your attention will be somewhat diluted, and the effects on each slave will be reduced. Slaves assigned to be <em>fucktoys</em> and serve in the <em>master suite</em> count towards a hidden estimation of your sexual foci. With two or fewer such slaves, the your sexual attention on these slaves will be intense and have intense effects. With five or more, the you may have some difficulty in using every slave every day, diluting the mental effects of being one's personal sex toy.`);
	App.Events.addParagraph(f, r);

	App.UI.DOM.appendNewElement("p", f, `It is possible to raise these limits by focusing on sexual decadence for the week. By paying less attention to business and not using sexual training on specific slaves, you will have more energy to spare and can offer intense sexual attention to three slaves or give sexual attention to up to seven slaves without dilution.`);

	App.UI.DOM.appendNewElement("p", f, `There exist several other ways to raise your sexual energy as well.`);

	return f;
}, "beingInCharge");

App.Encyclopedia.addArticle("PC Skills", function() {
	const f = new DocumentFragment();
	let r;

	r = [];
	r.push(App.Encyclopedia.topic("Trading"));
	r.push("signifies how efficient you are at making exchanges. Provides more passive income the higher it is. Can be increased through acquiring slaves.");
	App.Events.addParagraph(f, r);

	r = [];
	r.push(App.Encyclopedia.topic("Warfare"));
	r.push("is an indication your combat prowess. Cuts cost of housing mercs in half. Can be increased through use in relevant situations.");
	App.Events.addParagraph(f, r);

	r = [];
	r.push(App.Encyclopedia.topic("Hacking"));
	r.push("is an indication of your effectiveness at manipulating computer systems. Higher levels make technological upgrades");
	r.push(App.Encyclopedia.link("cheaper", "Money", "cash"));
	r.push("or free, provides a boost situations where fame is measured digitally. Can be increased through choosing to <span class='encyclopedia interaction'>Sell your intrusion services to the highest bidder</span> once the option becomes available after having <em>some</em> skill and purchasing technological upgrades.");
	App.Events.addParagraph(f, r);

	r = [];
	r.push(App.Encyclopedia.topic("Slaving"));
	r.push("improves your effectiveness as a slave driver. At max level it allows you to more easily spot");
	r.push(App.UI.DOM.combineNodes(App.Encyclopedia.link("gingering", "Gingering"), "."));
	r.push("Can be increased through acquiring performing the duties of a slave driver.");
	App.Events.addParagraph(f, r);

	r = [];
	r.push(App.Encyclopedia.topic("Engineering"));
	r.push("is a sign of how effective you are building and maintenance. Mastering the skill reduces the cost of <span class='cash'>arcology upgrades and expansions.</span> Can be increased through purchasing arcology upgrades or expanding facility capacity. If the");
	r.push(App.Encyclopedia.link("Security Expansion"));
	r.push("mod is enabled, the skill is also increased by repairing your arcology.");
	App.Events.addParagraph(f, r);

	r = [];
	r.push(App.Encyclopedia.topic("Medicine"));
	r.push("shows how effective you are treating wounds. Max level reduces a slave's health and");
	r.push(App.Encyclopedia.link("trust", "Trust", "trust careful"));
	r.push("loss during surgery.");
	App.Events.addParagraph(f, r);

	r = [];
	r.push("In addition to the above methods of increasing a skill (if any), all of them can be learnt by retaining a trainer");
	if (V.SF.Toggle && V.SF.Active >= 1) {
		r.push("or by talking to/learning from The Colonel");
	}
	r.push(r.pop() + ".");
	App.Events.addParagraph(f, r);

	return f;
}, "beingInCharge");

App.Encyclopedia.addArticle("Drug grades and you", function() {
	const f = new DocumentFragment();
	App.Events.addNode(f, ["There exist a trio of important differences between consumer-grade drugs made for citizens and slave-grade drugs reserved for chattel:"], "div");
	App.Events.addNode(f, [App.UI.DOM.makeElement("span", "Health:", ["strong"]), `Consumer drugs generally lack the side-effects associated with long term slave-grade drug use. It is also far more difficult to accidentally ruin your body with their use.`], "div");
	App.Events.addNode(f, [App.UI.DOM.makeElement("span", "Strength:", ["strong"]), `Overall, consumer drugs are weaker by comparison as a trade off for the improved health benefits. This does not mean they are necessarily worse, however; they are slower, but more consistent and able to confer their benefits past the point that slave-grade injections would cease to be reasonable.`], "div");
	App.Events.addNode(f, [App.UI.DOM.makeElement("span", "Price:", ["strong"]), `With most production focused on cheap slave-grade drugs, consumer drugs run at a premium and usually require a physician to prescribe them.`], "div");
	return f;
}, "beingInCharge");

App.Encyclopedia.addCategory("beingInCharge", function() {
	const links = [];
	links.push(App.Encyclopedia.link("Arcologies and Reputation"));
	links.push(App.Encyclopedia.link("Random Events"));
	links.push(App.Encyclopedia.link("Costs Summary"));
	links.push(App.Encyclopedia.link("Rules Assistant"));
	links.push(App.Encyclopedia.link("RA Condition Editor"));
	links.push(App.Encyclopedia.link("The Corporation"));
	links.push(App.Encyclopedia.link("Sexual Energy"));
	links.push(App.Encyclopedia.link("PC Skills"));
	links.push(App.Encyclopedia.link("Drug grades and you"));
	return App.UI.DOM.generateLinksStrip(links);
});
