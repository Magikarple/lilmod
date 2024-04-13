// cSpell:ignore uncurated

App.Encyclopedia.addArticle("Mods/Pregmod", function() {
	return App.UI.DOM.makeElement("div", "This version of the game includes several optional mods and Pregmod exclusive features. For more information, please select a particular entry below:");
}, "Mods");

App.Encyclopedia.addArticle("Loli Mode", function() {
	return App.UI.DOM.makeElement("div", "This mod which has overtime been incorporated into the base game and expanded into a mode, adds a variety of underage content to the game. This content is purely optional. For more information on certain features, select a more particular entry:");
}, "Mods");

App.Encyclopedia.addArticle("Special Force", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push(App.Encyclopedia.topic("NOTE: The Special Force is an optional mod, and as such will only be initialized in-game if it is enabled at game start or in the options menu."));
	r.toNode("p");

	App.UI.DOM.appendNewElement("div", f, "Man has killed man from the beginning of time, and each new frontier has brought new ways and new places to die. Why should the future be different? Make no mistake friend, the Free Cities are the future, and we can either live like kings inside them, or die in their shadow. I prefer the former. So should you.", ["note", "blockquote"]);
	App.UI.DOM.appendNewElement("div", f, "- The Colonel, standard message to potential recruits", ["indent", "blockquote"]);

	r.push("Once your arcology has been severely tested by external attack, and thus proven that the anti-militaristic principles of anarcho-capitalism might not be sufficient to ensure the physical security of the citizenry, you will receive an event that gives you the opportunity to establish a Special Force (with a customizable name), with The Colonel as its commander under you. This force will be a private military in all but name (unless you want that name). Once activated, you can manage its deployment from the end of week screen. You will be able to issue orders on the force's task and behavior, and this will impact its development. There are numerous events that can trigger depending on development and orders.");
	r.toNode("p");
	r.push("Initially the force will not be very profitable, but once it expands, it can become so. The speed at which this happens, and the degree of profitability, depends both on your orders to the force and the upgrades you purchase in the Barracks. If you had mercenaries, they will still be active for the purposes of events, corporation assistance (if present), and upkeep costs, abstracted as distinct operatives from the Special Force.");
	r.toNode("p");

	App.Events.addNode(f, [App.UI.DOM.makeElement("span", "Orders to The Colonel:", ["underline"]), "Once the force is active, you will be able to give orders to The Colonel. These will affect its income and performance. The orders are:"], "p");
	App.Events.addNode(f, [App.Encyclopedia.topic("Deployment Focus:"), "This will determine the force's main task for the week."], "div");
	App.Events.addNode(f, [App.Encyclopedia.topic("Recruit and Train"), "will focus on increasing manpower and replacing losses incurred over time."], "div", ["indent"]);
	App.Events.addNode(f, [App.Encyclopedia.topic("Secure Trade Routes"), "will increase", App.Encyclopedia.link("reputation", "Arcologies and Reputation", "green"), "and prosperity by amounts that scale with the force's development."], "div", ["indent"]);
	App.Events.addNode(f, [App.Encyclopedia.topic("Slaving and Raiding"), "will directly bring in cash and (occasionally) slaves, with the amounts and quality increasing with the force's development. All three will occur every week, but the focus will determine the primary result."], "div", ["indent"]);

	r.toNode("p");
	r.push(App.Encyclopedia.topic("Rules of Engagement:"), "This will determine how carefully the force uses its weapons, and affect its change in", App.Encyclopedia.link("reputation,", "Arcologies and Reputation", "green"), "as well as events seen. Will they hold their fire unless fired upon? Or will they call in an artillery strike on a refugee convoy that took a potshot at them?");
	r.toNode("div");
	App.Events.addNode(f, [App.Encyclopedia.topic("Hold Fire"), "will restrict the force to only returning fire if they're fired upon."], "div", ["indent"]);
	App.Events.addNode(f, [App.Encyclopedia.topic("Limited Fire"), "will permit some proactive fire from the force (to eliminate known threats)."], "div", ["indent"]);
	App.Events.addNode(f, [App.Encyclopedia.topic("Free Fire"), "will permit the force to shoot at anything/anyone, at any time, for any reason."], "div", ["indent"]);

	r.toNode("p");
	r.push(App.Encyclopedia.topic("Accountability:"), "This will determine how accountable the force is for its actions outside the Arcology, and affect its change in", App.Encyclopedia.link("reputation,", "Arcologies and Reputation", "green"), "as well as events seen. Will you punish them if they massacre a caravan for one choice slave girl? Or shoot random civilians for their valuables?");
	r.toNode("div");
	App.Events.addNode(f, [App.Encyclopedia.topic("Strict Accountability"), "will ensure the force avoids committing atrocities (other than immense collateral damage if free-fire is enabled)."], "div", ["indent"]);
	App.Events.addNode(f, [App.Encyclopedia.topic("Some Accountability"), "will prevent the worst actions, but overlook lesser ones."], "div", ["indent"]);
	App.Events.addNode(f, [App.Encyclopedia.topic("No Accountability"), "will let the force run wild."], "div", ["indent"]);

	r.push("Allowing them to run wild will, over time, change their character, rendering them increasingly depraved as they realize that they can do whatever they want to non-citizens. Giving them rules might correct this, but reversing such behavior once learned would take a long time indeed.");
	r.toNode("p");

	r.push(App.UI.DOM.appendNewElement("div", f, "Barracks:", ["underline"]));
	r.toNode("div");
	r.push("The Barracks are the upgrade and flavor screen for the Special Force. It is treated as a special facility, and slaves cannot be assigned to it. Here you can observe the antics and relaxation behavior of the force, which will, again, change based on your orders and its", App.Encyclopedia.link("reputation.", "Arcologies and Reputation", "green"), "You can visit once a week to receive some extra tribute from The Colonel, specially saved for its patron from its weekly acquired loot, and this 'gift' will improve in quality as the force develops.");
	r.toNode("div");

	r.toNode("p");
	App.UI.DOM.appendNewElement("div", f, "Upgrades:", ["underline"]);
	r.push("Upgrades can be purchased in the Barracks. The upgrades that can be purchased will both increase in effectiveness of the force (i.e. how much");
	r.push(App.Encyclopedia.link("money", "Money", "yellowgreen"), "or", App.Encyclopedia.link("reputation", "Arcologies and Reputation", "green"));
	r.push("it makes). The upgrades focus on improving the force's infantry equipment, vehicles, aircraft, drones, and stimulants. Some upgrades are more helpful at facilitating different tasks (Vehicles/Aircraft for Slaving/Raiding,", App.Encyclopedia.link("Drones", "Security Drones"), "for Securing Trade). Arcology upgrades enable other upgrades to be purchased. Stimulants increase overall effectiveness for the force when assigned to raiding after upgrades are considered, as well as flavor text.");
	r.toNode("div");

	r.push("Explore the options and enjoy the benefits of having a complete private military!");
	r.toNode("p");

	return f;
}, "Mods");

App.Encyclopedia.addArticle("Security Expansion", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push(App.Encyclopedia.topic("Note: The Security Expansion mod is an optional mod. It can be switched freely on and off from the game option menu or at the start of the game."));
	r.toNode("div");

	r.push("The world of Free Cities is not a forgiving one, those who do not seek to dominate it, will inevitably be dominated themselves.");
	r.push("Good rulers need to keep control of its realm, if they want to have long and prosperous lives.");
	r.push("You will have to manage your", App.UI.DOM.appendNewElement("div", f, "authority", ["darkviolet"]), "inside the walls of your arcology, you will have to keep it", App.UI.DOM.appendNewElement("div", f, "secure", ["deepskyblue"]), "and keep in check", App.UI.DOM.appendNewElement("div", f, "crime", ["orangered"]), "and rivals alike, you will have to take up arms and command your troops against those who defy your rule.");
	r.toNode("p");

	r.push("Statistics:");
	r.toNode("p");
	App.Events.addNode(f, [App.UI.DOM.appendNewElement("div", f, "Authority", ["darkviolet", "strong"]), "represents the power the player holds over the arcology. If", App.Encyclopedia.link("reputation", "Arcologies and Reputation", "green"), "is how well the protagonist is known,", App.UI.DOM.appendNewElement("div", f, "authority", ["darkviolet"]), "is how much is feared or respected.", "Authority influences many things, but it is mainly used to enact edicts, who, similarly to policies, allow to shape the sociopolitical profile of your arcology. Like", App.Encyclopedia.link("reputation", "Arcologies and Reputation", "green"), ",", App.UI.DOM.appendNewElement("div", f, "authority", ["darkviolet"]), `has a maximum of ${num(20000)}.`], "div", ["indent"]);
	App.Events.addNode(f, [App.UI.DOM.appendNewElement("div", f, "Security", ["deepskyblue", "strong"]), "represents how safe the arcology is, how likely it is for a citizen to get stabbed, killed or simply mugged in the streets as well as wider concerns like dangerous political organizations, terrorist groups and more. It influences many things, but its main task is to combat", App.UI.DOM.appendNewElement("div", f, "crime", ["orangered"])], "div", ["indent"]);
	App.Events.addNode(f, [App.UI.DOM.appendNewElement("div", f, "Crime", ["orangered", "strong"]), "represents the accumulated power of criminals in the arcology. Rather than representing low level criminal activity, better represented by", App.UI.DOM.appendNewElement("div", f, "security", ["deepskyblue"]), "(or better lack of), but the influence, organization and reach of criminal organizations, be it classic mafia families or high tech hacker groups. Do not let their power run rampant or you'll find your treasury emptier and emptier. Both", App.UI.DOM.appendNewElement("div", f, "security", ["deepskyblue"]), "and", App.UI.DOM.appendNewElement("div", f, "crime", ["orangered"]), "are displayed a 0-100% scale."], "div", ["indent"]);

	r.push("The battles:");
	r.toNode("p");
	App.Events.addNode(f, ["Arcologies are sturdy structures, difficult to assault without preparation or overwhelming numbers.", App.Encyclopedia.link("Security drones"), "can easily handle small incursions and a few well placed mercenary squads can handle the rest.", "However, in order for Free Cities to survive they need many things, many of which are expensive. If you want your arcology to survive the tide of times, you'd better prepare your soldiers and defend the vital lifelines that connect your arcology with the rest of the world.", "For a detailed outlook of how battles work see the relevant page."], "div", ["indent"]);

	r.push("Buildings:");
	r.toNode("p");
	App.Events.addNode(f, [App.Encyclopedia.topic("The Barracks"), "is where troops can be prepared and organized to respond to threats encroaching on the arcology's territory.", "If the old world General is a client state human units can be sent to further improve relations."], "div", ["indent"]);
	App.Events.addNode(f, [App.Encyclopedia.topic("The Security HQ"), "is where your security department will manage the", App.UI.DOM.appendNewElement("div", f, "security", ["deepskyblue"]), "of the arcology."], "div", ["indent"]);
	App.Events.addNode(f, [App.Encyclopedia.topic("The Propaganda Hub"), "is where your propaganda department will expand and deepen your", App.UI.DOM.appendNewElement("div", f, "authority", ["darkviolet"]), "over the arcology."], "div", ["indent"]);
	App.Events.addNode(f, [App.Encyclopedia.topic("The Transport Hub"), "is where trade happens. Mainly intended as a counter to prosperity loss events."], "div", ["indent"]);
	App.Events.addNode(f, [App.Encyclopedia.topic("The Riot Control Center"), "is fairly self explanatory, will help you manage rebellions."], "div", ["indent"]);

	return f;
}, "Mods");

App.Encyclopedia.addArticle("Battles", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push("With the Security Expansion mod enabled there is a small chance each week that an attacking force will be approaching the arcology. Their motives may vary, but their intentions are clear: hit you where it hurts.");
	r.push("You arcology will start being the subject of incursions only when the", App.Encyclopedia.link("security drones", "Security Drones"), "upgrade has been installed.");
	r.toNode("div");

	r.push("Unit types:");
	r.toNode("div", ["strong"]);

	r.push(App.Encyclopedia.topic("Slave units"), "are recruitable from your stockpile of menial slaves. They are cheap, easy to replace troops that will hold the line well enough.");
	r.push("Of the three they have the lowest base stats, but they have the advantage of being available from the beginning, have the lowest upkeep and can be replenished in any moment, provided enough cash is available.");
	r.toNode("p");

	r.push(App.Encyclopedia.topic("Militia units"), "are recruitable only after a special edict is passed. Once the militia is announced recruitment laws will become available and recruits will present themselves to the barracks, waiting to be assigned to a unit.");
	r.push("Militia units are slightly stronger than slave units, but their manpower is limited by the laws enacted and the citizen population.");
	r.toNode("p");

	r.push(App.Encyclopedia.topic("Mercenary Units"));
	r.addToLast(":");
	r.push("installing a permanent platoon in the arcology is a great defensive tool, but if you need muscle outside the walls of your dominion you'll need to hire more.");
	r.push("Mercenary units have the highest base stats (in almost all categories), but are also only available if the arcology is garrisoned by the mercenary platoon, are fairly slow to replenish and have the highest upkeep.");
	r.push("Once garrisoned by the mercenary platoon, more mercenaries will slowly make their way to the arcology. You have little control over their number other than increasing your arcology prosperity or your reputation.");
	r.toNode("p");

	r.push(App.Encyclopedia.topic("The Security Drones"), "are a special unit. You can field more than one unit of this type and their stats (with the exception of their very high morale) are fairly low, however they cheap to replenish and have a low maintenance cost. They do not accumulate experience and are not affected by morale modifiers (for better or worse).");
	r.toNode("p");

	r.toNode("hr");
	r.push("Units statistics:");
	r.toNode("div", ["strong"]);

	r.push(App.Encyclopedia.topic("Troops"));
	r.addToLast(":");
	r.push("The number of active combatants the unit can field. If it reaches zero the unit will cease to be considered active. It may be reformed as a new unit without losing the upgrades given to it, but experience is lost.");
	r.toNode("div");

	r.push(App.Encyclopedia.topic("Maximum Troops"));
	r.addToLast(":");
	r.push("The maximum number of combatants the unit can field. You can increase this number through upgrades.");
	r.toNode("div");

	r.push(App.Encyclopedia.topic("Equipment"));
	r.addToLast(":");
	r.push("The quality of equipment given to the unit. Each level of equipment will increase attack and defense values of the unit by 15%.");
	r.toNode("div");

	r.push(App.Encyclopedia.topic("Experience"));
	r.addToLast(":");
	r.push("The quality of training provide/acquired in battle by the unit. Experience is a 0-100 scale with increasingly high bonuses to attack, defense and morale of the unit, to a maximum of 50% at 100 experience.");
	r.toNode("div");

	r.push(App.Encyclopedia.topic("Medical support"));
	r.addToLast(":");
	r.push("Attaching medical support to human units will decrease the amount of casualties the unit takes in battle.");
	r.toNode("div");

	r.push(App.Encyclopedia.topic("Special Force support"));
	r.addToLast(":");
	r.push("if the", App.Encyclopedia.link("Special Force"), "mod is enabled a squad of troops can be assigned to the human units which will increase their base stats.");
	r.toNode("div");

	r.toNode("hr");
	r.push("Battles:");
	r.toNode("div", ["strong"]);
	r.push("Battles are fought automatically, but you can control various fundamental parameters, here are the most important statistics:");
	r.toNode("div");
	r.push(App.Encyclopedia.topic("Readiness"));
	r.addToLast(":");
	r.push("readiness represents how prepared the arcology is to face an attack. For every point of readiness you can field two units. You can find upgrades for it in the security HQ.");
	r.toNode("div");

	r.push(App.Encyclopedia.topic("Tactics"));
	r.addToLast(":");
	r.push("Tactics are the chosen plan of action. You should carefully choose one depending on the terrain, type of enemy and leader choice, because if applied successfully they can sway a battle in your favor or doom your troops.");
	r.toNode("div");

	r.push(App.Encyclopedia.topic("Terrain"));
	r.addToLast(":");
	r.push("Terrain has a great influence on everything, but mainly on the effectiveness of the tactic chosen.");
	r.toNode("div");

	r.push(App.Encyclopedia.topic("Leader"));
	r.addToLast(":");
	r.push("The leader is who will command the combined troops in the field. Each type of leader has its bonuses and maluses.");
	r.toNode("div");

	r.push(terrainAndTactics());
	r.toNode("p");

	r.toNode("hr");
	r.push("Leaders:");
	r.toNode("div", ["strong"]);
	r.push(App.Encyclopedia.topic("The Assistant"));
	r.addToLast(":");
	r.push("Combat performance depends on available computational power.");
	r.push("Human soldiers will be not happy to be lead by a computer however and will fight with less ardor, unless your own reputation or authority is high enough.");
	r.toNode("div");

	r.push(App.Encyclopedia.topic("The Arcology Owner"));
	r.addToLast(":");
	r.push("You can join the fray yourself. Your performance will depend greatly on your warfare skill and your past. The troops will react to your presence depending on your social standing and your past as well.");
	r.toNode("div");
	App.UI.DOM.appendNewElement("div", f, "Do note however there is the possibility of getting wounded, which makes you unable to focus on any task for a few weeks.", ["indent"]);

	r.push("Your", App.Encyclopedia.topic("Bodyguard"), "or", App.Encyclopedia.topic("Your Head Girl"), "can guide the troops.");
	r.push("Their performance will greatly depend on their intelligence and past.");
	r.push("Be aware that both slaves run the risk of getting wounded, potentially with grave wounds like blindness or limb loss.");
	r.push("Slaves will be happy to be lead by one of them, but militia and mercenaries will not, unless your own authority is high enough to make up for the fact they are being lead by a slave.");
	r.toNode("div");

	r.push(App.Encyclopedia.topic("An outstanding citizen"), "can take the leading role. Their performance will be average; however the militia will be pleased to be guided by one of them.");
	r.toNode("div");
	r.push("To allow slaves to lead troops a specific edict will have to be enacted.");
	r.toNode("div");

	r.push(App.Encyclopedia.topic("A mercenary officer"), "can take the lead. Their performance will be above average and mercenary units will be more confident, knowing they're being lead by someone with experience.");
	r.toNode("div");

	r.push(App.Encyclopedia.topic("The Colonel"));
	r.addToLast(":");
	r.push("The Special Force's colonel can take the lead. Her performance will be above average and mercenary (in addition to hers obviously) units will be more confident, knowing they're being lead by someone with experience. Her tactics have a higher chance of success along with better offense and defense.");
	r.toNode("div");

	return f;
}, "Mods");

App.Encyclopedia.addArticle("FCTV", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push("Free Cities TV, or", App.Encyclopedia.topic("FCTV"), "as it is more commonly called, is a very popular streaming video service. A venture started not long after the first Free Cities were founded, it took advantage of the new lack of regulatory oversight to create and host content that had long been banned in the old world. Under the guidance of 8HGG Inc., FCTV has developed into a popular mixed-mode service, with a variety of live streaming channels as well as a large selection of ready stream content ranging from hyper porn to contemporary broadcast series shows.");
	r.toNode("div");
	r.push("The successful service is largely supported by a combination of subscription and advertising revenue, and to a smaller extent on-demand content payments. Though still targeted at free citizens — or their slaves in the case of for-slave content — FCTV has become very popular in the old world. A combination of the service's eroticism, extreme content, and high production value has given it extraordinary popularity. Savvy execs at 8HGG Inc. and arcology owners alike have realized the benefits of exposing the old world populations to FCTV content, and a carefully-curated selection of content is kept available to old-worlders thanks to revenue from advertisements supporting immigration and voluntary enslavement. The content selection has a glamorized and often romanticized view of slavery, and typically displays common citizens and slaves alike living in opulence beyond the realm of possibility for most old-worlders.");
	r.toNode("p");
	r.push("FCTV has always worked closely with the Free Cities, developing a large network of sponsors and partnerships for content protection. This has increased the breadth of content and popularity of FCTV, while allowing the ruling class to encourage content supporting their vision of the future. While you can access non-citizen FCTV content from just about anywhere, an arcology needs its own", App.Encyclopedia.link("receiver", "FCTV Receiver"), "to access citizen-only content. This measure of content protection does add extra expense, but nearly eliminating the risk of old-worlders seeing uncurated content is viewed as being worth the expense by most arcology owners.");
	r.toNode("p");

	return f;
}, "Mods");

App.Encyclopedia.addArticle("Lolis and the Free Cities", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push("For the most part, the greater world condemns those using underaged girls as sex slaves, but some Free Cities feel otherwise. In those, underage girls may be purchased like any other slave, though they might be more valuable depending on the arcology.");
	r.toNode("div");

	return f;
}, "Mods");

App.Encyclopedia.addArticle("Fertility Age", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push("The normal girl will undergo puberty and become fertile between the ages of 10 and 14, though with hormonal treatments can very easily become fertile earlier. Given the passive female hormones in the slave food, an arcology cluster can practically control the exact age a girl will become fertile.");
	r.toNode("div");

	return f;
}, "Mods");

App.Encyclopedia.addArticle("Male Fertility", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push("The normal boy will undergo puberty and become potent between the ages of 12 and 16, though with hormonal treatments can very easily become potent earlier. Given the passive female hormones in the slave food, boys will generally become fertile later than the average loli, though with the careful application of hormones, the potency age can practically be controlled.");
	r.toNode("div");

	return f;
}, "Mods");

App.Encyclopedia.addArticle("Precocious Puberty", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push("While most girls will grow fertile around $fertilityAge and most boys will become virile around $potencyAge, the mass prevalence of male and female hormones in the Free Cities can have extreme effects on a developing slave's puberty. Hormone injections and hormonal based drugs can lead to early puberty or even delay it indefinitely, something some trainers use to their advantage in keeping their male slaves soft and feminine.");
	r.toNode("div");

	return f;
}, "Mods");

App.Encyclopedia.addArticle("Cradle Robbers", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push("A specialized group of slavers focusing entirely on capturing girls that have not had their first period. Disliked in many arcologies, they only appear before those they feel they can", App.Encyclopedia.link("trust", "Trust", "mediumaquamarine"), "as being sympathetic to their views.");
	r.toNode("div");

	return f;
}, "Mods");

App.Encyclopedia.addArticle("The Incubation Facility", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push("A facility used to rapidly age children kept within its aging tanks using a combination of growth hormones, accelerants, stem cells and other chemicals; slaves that come out of it are rarely healthy. The Incubator requires a massive amount of electricity to run, though once powered contains a battery backup that can last at least a day. It can be upgraded to combat malnutrition and thinness caused by a body growing far beyond any natural rate. Hormones can also be added to encourage puberty and even sex organ development. Growth control systems include cost saving overrides, though enabling them may result in bloated, sex crazed slaves barely capable of moving.");
	r.toNode("div");

	App.Events.addNode(f, ["Please click", App.Encyclopedia.link("here", "Facilities Overview"), "for an overview of other facilities."], "p");
	return f;
}, "Mods");

App.Encyclopedia.addArticle("FCTV Receiver", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push("While nearly indistinguishable from a standard satellite antenna, the satellite dish used to receive FCTV-Citizen content is special because of the unique FCTV Receiver.");
	r.push("Utilizing the latest in matched-pair quantum encryption, it is the only device capable of decrypting and encrypting your arcology-specific FCTV content communication.");
	r.push("Simple additions to your arcology's existing fiber optics extend the", App.Encyclopedia.link("FCTV"), "network to your citizens.");
	r.push("In exchange for bearing the cost of the encrypted network, arcology owners get a certain level of control over available content for cultural purposes, and also discounted rates for local advertisement.");
	r.toNode("div");
	r.push("Some owners choose to have their citizens subsidize the installation: having them pay for fiber to their residence, or possibly even charging for a portion of the receiver. FCTV service experts warn that forcing citizens to bear too much of the cost usually results in angry citizens and many citizens who refuse to pay for access to the service. They suggest that it is in the best interests of FCTV and arcology owners alike to have greater service penetration, as low penetration results in less revenue for 8HGG Inc. and less advertising and cultural benefits for owners.");
	r.toNode("p");

	return f;
}, "Mods");

App.Encyclopedia.addArticle("Catmod", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push("Catmod is an optional modification that focuses on, surprise surprise, adding catgirls to the game. However, as you might have noticed, Free Cities is based on our own universe, and, unfortunately, catgirls don't actually exist. So how is one to acquire fuckable cats in a world sadly devoid of them? Well, multi-million dollar genetic engineering projects, of course! After a massive investment in your genelab and the best old world engineers available, you too will be able to create your very own inhuman abominations of science with cute, twitchy ears and button noses. Catgirls contain a number of mechanical changes and unique features, many of which you will have to find out for yourself through your exciting journey through the world of scientific malpractice. Worth noting for mechanical purposes, however, is that the", App.UI.DOM.makeElement("span", "Feline", ["note"]), "face type is only found on catgirls, and has a similar effect to exotic faces; uglier feline faces are dramatically worse, while beautiful feline faces are significantly better from a beauty perspective.");
	r.toNode("div");

	return f;
}, "Mods");

App.Encyclopedia.addArticle("Catgirls", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push("Part of humanity's dream for thousands of years. As far back as the Ancient Egyptians, humans have looked at the sleek and smug nature of cats, and imagined them as tall, busty catgirls with which they could fornicate. Yet all those men and women of the past lacked the capability to make their dreams come true; you, on the other hand, do not. While the process to splice human and cat DNA, whether you take from common housecats or the more dangerous coding of lion or panther genetics, will undoubtedly be arduous and expensive, the end result of a sleek, dexterous, inhumanly flexible creature that can wrap its tail around your throat as you fuck it is perhaps enough of a prize to make the difficulties worth it. To get started on engineering catgirls, you'll need to contact a team of genetic engineers from a fully upgraded genelab, and give them enough time and money to achieve results within your lab.");
	r.toNode("div");

	return f;
}, "Mods");

App.Encyclopedia.addArticle("Bioengineering", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push("With the technological advancements of 2037, society stands on the precipice of truly transhumanist biological engineering. Those with the will and the resources to get what they want, meaning you, are now uniquely capable of taking the fundamental code of DNA and using it as a building block to create and reshape biology as they desire. That doesn't mean the process of genetic engineering is going to be easy or simple; at minimum, you'll need a fully upgraded genelab and a team of professional, world-class scientists with the resources of a small nation at their disposal to get what you want. But once you've put all the pieces in place, the possibilities that can emerge from your engineering tubes are nearly endless.");
	r.toNode("div");

	return f;
}, "Mods");

App.Encyclopedia.addArticle("Inflation", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push("Future room for lore text");
	r.toNode("div", ["note"]);

	r.push("Choose a more particular entry below:");
	r.toNode("div");

	return f;
}, "Mods");

App.Encyclopedia.addArticle("Hyper-Pregnancy", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push(App.Encyclopedia.topic("Hyper Pregnancy"), "refers to when a slave is carrying ten or more children in one pregnancy. It is largely unhealthy for a slave, and can lead to immobilization and even death, so be sure to keep your overfilled slaves happy and healthy. Due to the size of the pregnancy, a slaves abdomen is greatly stretched, causing it to sag after the pregnancy is complete. Surgery, time, or refilling the slave's belly will eliminate sag, if only temporary. Only achievable via powerful fertility agents researched through the dispensary.");
	r.toNode("div");

	return f;
}, "Mods");

App.Encyclopedia.addArticle("Super Fertility Drugs", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push(App.Encyclopedia.topic("Super Fertility Drugs"), "practically guarantee a slave will bear multiple children, and when combined with female hormones, will generally lead to hyper-pregnancy The also have the side effects of inducing lactation, increasing sex drive, and increasing attraction to men. Researched through the dispensary.");
	r.toNode("div");

	return f;
}, "Mods");

App.Encyclopedia.addArticle("Pregnancy Generator", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push("The", App.Encyclopedia.topic("Pregnancy Generator"), "is a small implant inserted into a slave's womb where it anchors itself and begins pumping the slave full of drugs and hormones with the intent to trick the slave's body into believing it both is and isn't pregnant. The slave's body will begin constantly releasing ovum that, once fertilized, will embed themselves into the uterine lining and begin growing. This will continue for as long as the implant is in place, regardless of how large the slave grows with children. Once the first set of infants is born, the implanted slave will give birth nearly a dozen times per week as her body continuously produces new offspring. Will likely lead to the slave's early death as her body will be consumed to feed her unending brood. Researched through the implant manufactory.");
	r.toNode("div");

	r.push("Extreme content must be enabled.");
	r.toNode("div", ["yellow"]);

	return f;
}, "Mods");

App.Encyclopedia.addArticle("Childbirth and C-Secs", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push("Eventually a pregnant slave will need to give birth. Cesarean sections are an option should a slave's health not permit a safe natural birth, or should a slaveowner want to keep her from being stretched out by her newborn child. A healthy, well rested slave, with wide hips and some knowledge will generally find childbirth easy. Though poor health, tiredness, narrow hips, anorexia, tight vaginas, excessively young motherhood, and lack of experience can complicate things, potentially leading to the loss of both child and mother.");
	r.toNode("div");

	return f;
}, "Mods");

App.Encyclopedia.addArticle("Surrogacy", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push(App.Encyclopedia.topic("Surrogacy"), "is an arrangement whereby a woman agrees or is forced to become pregnant, carry the pregnancy to due term, and give birth to a child or children, all of this for another person or persons, who are or will ultimately become the parent(s) of the newborn child or children. There are two types of surrogacies: traditional and gestational (full). Traditional is mostly used by homosexual couples or if fertility treatments are too expensive. With the exception of societies that embraced Repopulationism or Gender Fundamentalism, full surrogacy is popular among free women, who want children, but don't want pregnancy to impact their careers or physical attributes. It created a market of living incubators — perfectly healthy slaves of safe age for carrying pregnancies with often little to no skills necessary for most other slaves.");
	r.toNode("div");

	return f;
}, "Mods");

App.Encyclopedia.addArticle("Ova Transplantation", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push(App.Encyclopedia.topic("Ova transplantation"), "is a procedure where an already fertilized ova is transplanted from one womb to another of the same species. It requires a remote surgery to perform and an advanced pregnancy monitoring systems to locate the egg, confirm the fertilization and determine that it happened less than four weeks ago, so that the ova is not too attached to the lining. Optimally the new host must be healthy and must not be already pregnant with large number of fetuses or hit menopause, but be old enough to carry children successfully.");
	r.toNode("div");

	return f;
}, "Mods");

App.Encyclopedia.addArticle("Enemas and Force-Feeding", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push("With the proper supplies ordered into your wardrobe, you can distend a slave's belly via enema leaving her notably rounded. Distended slaves are likely to feel discomfort, and if overfilled, face health complications. A standard enema is about 2 liters, though the adventurous may test their limits with a gallon, roughly 4 liters, or nearly burst themselves with a staggering 2 gallons, about 8 liters.");
	r.toNode("div");

	r.push("With a working dairy, pipes can be installed to pump fresh milk and cum directly to your penthouse to be used in inflating slaves. The dairy will have to be producing above a threshold to be able to pump said products into the penthouse. Slaves filled with milk and cum may face additional affects, including", App.Encyclopedia.link("weight gain", "Weight"), ", rejection and obsession of food.");
	r.toNode("p");

	r.push("A final theoretical method involves using another slave as the source of fluid, though she would have to be capable of producing a monumental amount of milk or cum.");
	r.toNode("p");

	r.push("A trio of medical enemas can be purchased after basic enema supplies are acquired.");
	r.toNode("p");

	r.push("Curatives to promote slave health.");
	r.toNode("div", ["indent"]);
	r.push("Aphrodisiacs to drive them wild.");
	r.toNode("div", ["indent"]);
	r.push("Tighteners to make their holes like new.");
	r.toNode("div", ["indent"]);

	r.push("Force feeding is far simpler; you just force the slave to consume food or drink until you are satisfied. All that is needed is enough to feed them and a vessel to store it in in the interim.");
	r.toNode("p");

	return f;
}, "Mods");

App.Encyclopedia.addArticle("Belly Implants", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push("A fillable implant inserted into a slave's uterus following tube tying to prevent ovulation. Can safely be filled with 200cc each week to simulate a growing pregnancy. However, if kept at a full term size (or higher), the slave's body may adjust to the implant causing issues upon removal. Also to note, a slave that lacks a uterus to hold the implant can still be implanted; invasive surgery will be preformed to create a pocket to safely hold the implant without damage to the slave's internals.");
	r.toNode("div");

	return f;
}, "Mods");

App.Encyclopedia.addArticle("Player Pregnancy", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push("Sexual intercourse ending with ejaculation into a fertile cunt ends with a chance of pregnancy. Since arcology owners are expected to be masculine, being pregnant ruins that image. Female arcology owners displaying their pregnancies should expect to face public backlash for it. Luckily, pregnancies are easily prevented via contraceptives and easily dealt with via abortions; a pregnant arcology owner has plenty of means to maintain their image before it becomes a problem.");
	r.toNode("div");

	return f;
}, "Mods");

App.Encyclopedia.addArticle("Cervix Micropump Filter", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push("An implant inserted into a slave's cervix and linked with a fillable belly implant. Converts a portion of semen into usable filler and pumps said substance into the attached implant resulting in a slow, steady increase in size. Once the pressure in the implant reaches a set threshold, filler is outputted by the pump, maintaining the implant's size. Research is currently underway to see if the tubing can be effectively extended to pump filler into fillable butt and breast implants.");
	r.toNode("div");

	return f;
}, "Mods");

App.Encyclopedia.addArticle("Eugenics Breeding Proposal", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push("Eugenics frowns on reproducing with the lower classes, but what about those with good genes that ended up caught in said classes? Would it not make sense to use them as breeders? With the Eugenics Breeding Proposal*, one can propose the use of well-bred slaves as bearers of societies finest children. *Success not guaranteed, some terms and conditions may apply, ask your local Elites for more information.");
	r.toNode("div");

	return f;
}, "Mods");

App.Encyclopedia.addArticle("Gestation Drugs and Labor Suppressants", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push("Not all drugs are applied directly to your slavegirl. In this case, gestation accelerants and retardants are passed through the mother into her unborn children to control the rate of fetal growth. While slightly unhealthy for the mother, gestation slowing drugs are relatively harmless, though an unwilling mother may become more distraught when she realizes her pregnancy will last even longer. Due to the extended duration of the pregnancy, the mother's body may become accustomed to being so round, leading towards a sagging middle once birth occurs. On the other hand, gestation hastening drugs are extremely dangerous to the mother. It is strongly recommended to keep her under the observation and care of an experienced doctor or nurse. Failure to do so will cause her body to struggle to keep up with the rate of growth of her children, harming her physical and mental health, as well as potentially bursting her uterus later in her pregnancy. Labor suppressants are exactly that; they prevent the mother from entering labor, thus allowing the child to grow longer than a normal pregnancy. Excessive use may lead to health complications, especially during childbirth, though going even further may result in the slave's body suddenly entering labor and rapidly birthing her children, often without giving the slave time to prepare or even get undressed.");
	r.toNode("div");

	return f;
}, "Mods");

App.Encyclopedia.addArticle("Organic Mesh Breast Implant", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push("A specialized organic implant produced from the dispensary designed to be implanted into to a slave's natural breast tissue to maintain a slave's breast shape no matter how big her breasts may grow. An expensive and risky procedure proportional to the size of the breasts the mesh will be implanted into. Should health become an issue, the slave in surgery may undergo an emergency mastectomy. Furthermore, once implanted, the mesh cannot be safely removed from the breast. However, total breast removal will rid the slave of the implant; consider strongly when and if you want to implant the mesh before doing so. They are exceedingly difficult to identify once bound to the breast tissue, and combined with their natural shape, are often overlooked.");
	r.toNode("div");

	return f;
}, "Mods");

App.Encyclopedia.addArticle("Repopulationist Breeding School", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push("With the sheer number of children being brought into the world in the average Repopulationist society, society had to come up with a way to rear them all. Breeding schools are publicly funded institutions devoted to raising children into future breeders. Their hormone levels are carefully managed both to encourage early puberty and to maximize fertility. Once a class has become sexual active, boys and girls are encouraged to pair off and explore each other's bodies. Virginities are quickly lost, and more often than not, girls find themselves pregnant, usually with multiples. The pairings, or groups should females outnumber males, are encouraged to stay together and form caring family-like units. In addition, girls are taught to enjoy and idolize motherhood, while boys are taught that it is their duty to mount and fuck any non-gravid slave girls they see until pregnancy is assured. Free women are encouraged to avoid the schools, lest they get pinned and gang raped by horny adolescents. While administration respects rape fetishists and their desire to have a rape baby, doing this sets a poor example to the impressionable youths and may lead to the rape and impregnation of other free women later on in their lives.");
	r.toNode("div");

	return f;
}, "Mods");

App.Encyclopedia.addArticle("Slave Fertility", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push(`When it comes to breeding your slaves, one must ask themselves; "Do I want a single child, or do I want to get her so pregnant she can barely ride me any longer?"`);
	r.toNode("div");
	r.push("Under normal circumstances, a slave will likely bear a single child from a pregnancy, but with a little extra help from a number of fertility boosting methods, that count can easily be pushed higher. While each fertility agent will only add a chance of an additional ovum, combining treatments will yield a cumulative effect, greatly enhancing the likelihood of multiples. One must exercise caution, however, as a slave's body can only support so many offspring without complications. Miscarriage, discarded embryos, and even slave death are all possible with excessive misuse of fertility agents.");
	r.toNode("p");

	return f;
}, "Mods");

App.Encyclopedia.addArticle("Fertility Mix", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push("A simple dietary blend designed to encourage ovulation. Fertile slaves will find themselves subconsciously lusting for loads of cum blasting into their pussies and, once they give in to temptation, will likely find their bellies swelling with twins or even triplets.");
	r.toNode("div");

	return f;
}, "Mods");

App.Encyclopedia.addArticle("Breeders Dietary Blend", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push("When it comes to slave breeding, the natural chance of conception is just too low for your profit margins. The Breeder's Dietary Blend is the end result of the quest to enhance fertility* and potency in slaves. Sperm will live longer and swim harder, eggs will readily implant post fertilization, and pregnancies will be robust and healthy. This diet tweak guarantees your slaves will be a reproductive bunch or your", App.Encyclopedia.link("money", "Money", "yellowgreen"), "back!**");
	r.toNode("p");

	r.push("*Twins became prevalent in test pairings. This is unintended behavior, but not an unwelcome one to the funders.");
	r.toNode("div");
	r.push("**Our guarantee does not cover slaveowners who underestimate their slaves' potency and wind up pregnant.");
	r.toNode("div");

	return f;
}, "Mods");

App.Encyclopedia.addArticle("Artificial Insemination", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push("A simple surgical procedure involving the injection of harvested sperm into a fertile womb. Useful for assuring the conception of a child of the desired union, impregnation without sexual intercourse, circumventing physical and mental quirks in copulation, or just finding the perfect Virgin Mary for the holidays.");
	r.toNode("div");

	return f;
}, "Mods");

App.Encyclopedia.addArticle("Cloning", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push(`A surgical procedure requiring the gene lab that injects the DNA of an individual into an viable egg cell which is then carried to term in a fertile womb. Will create a child with the basic physical traits of the person they are cloned from. While clones will likely be identical to each other, they are unlikely to bear more than a passing resemblance to the person their DNA was harvested from; for that to occur, they would need to be raised in almost the same way. They will, however, be a genetic match with their "parent".`);
	r.toNode("div");

	return f;
}, "Mods");

App.Encyclopedia.addArticle("Inbreeding", function() {
	const f = new DocumentFragment();
	const r = new SpacedTextAccumulator(f);
	r.push("At the intersection of incest and pregnancy lies inbreeding. As seen in royal families throughout history, high levels of inbreeding can result in severe issues, often manifesting as facial deformities or reduced intellectual capacity.");
	r.toNode("div");

	r.push("One metric for quantifying inbreeding is the coefficient of inbreeding (CoI), which is the probability that both copies of a person's genes come from the same common ancestor.");
	r.push("For example, without any previous inbreeding a child from self-fertilization has a CoI of 0.5, a child of two full siblings has a CoI of 0.25, and a child of two first cousins has a CoI of 0.0625.");
	r.toNode("p");

	r.push("Enterprising breeders trying to breed specific traits should be mindful of the inbreeding coefficients of their stock: the higher the coefficient, the higher the chance that children will be slow or deformed.");
	r.toNode("p");

	return f;
}, "Mods");

App.Encyclopedia.addCategory("Mods", function(currentArticle) {
	const f = new DocumentFragment();
	const r = [];
	if (currentArticle !== "Mods/Pregmod") {
		App.Events.addNode(f, [App.Encyclopedia.link("Overview of Mods/Pregmod", "Mods/Pregmod")], "div");
	}
	App.Events.addNode(f, ["Catmod:", App.UI.DOM.generateLinksStrip([App.Encyclopedia.link("Details", "Catmod"), App.Encyclopedia.link("Lore", "Catgirls")])], "div");
	App.Events.addNode(f, ["Special Force Mod:", App.UI.DOM.generateLinksStrip([App.Encyclopedia.link("Details", "Special Force")])], "div");
	App.Events.addNode(f, ["Security Expansion Mod:", App.UI.DOM.generateLinksStrip([App.Encyclopedia.link("Details", "Security Expansion"), App.Encyclopedia.link("Battles")])], "div");

	if ((V.pedo_mode === 0 && V.ui === "start") || V.pedo_mode) {
		r.push(App.Encyclopedia.link("Loli Mode"));
		r.push(App.Encyclopedia.link("Lolis and the Free Cities"));
	}
	r.push(App.Encyclopedia.link("Childhood Fertility Induced NCS"));
	r.push(App.Encyclopedia.link("FCTV"));
	r.push(App.Encyclopedia.link("FCTV Receiver"));
	r.push(App.Encyclopedia.link("Breeders Dietary Blend"));
	r.push(App.Encyclopedia.link("Fertility Mix"));
	r.push(App.Encyclopedia.link("Fertility Age"));
	r.push(App.Encyclopedia.link("Slave Fertility"));
	r.push(App.Encyclopedia.link("Male Fertility"));
	r.push(App.Encyclopedia.link("Super Fertility Drugs"));
	r.push(App.Encyclopedia.link("Precocious Puberty"));
	r.push(App.Encyclopedia.link("Hyper-Pregnancy"));
	r.push(App.Encyclopedia.link("Player Pregnancy"));
	r.push(App.Encyclopedia.link("Pregnancy Generator"));
	r.push(App.Encyclopedia.link("Childbirth and C-Secs"));
	r.push(App.Encyclopedia.link("Artificial Insemination"));
	r.push(App.Encyclopedia.link("Gestation Drugs and Labor Suppressants"));
	r.push(App.Encyclopedia.link("Bioengineering"));
	r.push(App.Encyclopedia.link("Cloning"));
	r.push(App.Encyclopedia.link("Surrogacy"));
	r.push(App.Encyclopedia.link("Ova Transplantation"));
	r.push(App.Encyclopedia.link("Cradle Robbers"));
	r.push(App.Encyclopedia.link("The Incubation Facility"));
	r.push(App.Encyclopedia.link("Repopulationist Breeding School"));
	r.push(App.Encyclopedia.link("Eugenics Breeding Proposal"));
	r.push(App.Encyclopedia.link("Inflation"));
	r.push(App.Encyclopedia.link("Enemas and Force-Feeding"));
	r.push(App.Encyclopedia.link("Belly Implants"));
	r.push(App.Encyclopedia.link("Cervix Micropump Filter"));
	r.push(App.Encyclopedia.link("Organic Mesh Breast Implant"));
	r.push(App.Encyclopedia.link("Inbreeding"));
	App.Events.addNode(f, ["Pregmod:", App.UI.DOM.generateLinksStrip(r)], "p");

	return f;
});
