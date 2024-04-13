// cSpell:ignore Kombinezon-B, unvoidable

App.Encyclopedia.addArticle("Slaves", function() {
	const f = new DocumentFragment();
	App.UI.DOM.appendNewElement("p", f, "Future room for lore text", ["note"]);
	App.UI.DOM.appendNewElement("p", f, "Choose a more particular entry below:");
	return f;
}, "slaves");


App.Encyclopedia.addArticle("Demand for Sex", function() {
	const f = new DocumentFragment();

	App.Events.addParagraph(f, ["The Free Cities naturally facilitate a healthy sex industry which provides lucrative business opportunities. But you are not the only one who can provide sexual services and you may find yourself in competition for the large, but ultimately limited, amount of sexual desires within the arcology. Clever manipulations can influence both the demand as well as the supply to improve the attractiveness of your arcology and fill your coffers."]);

	App.Events.addParagraph(f, ["The demand comes directly from the arcology's citizens and visiting tourists and traders. Growing your arcology is the most straightforward way of increasing the amount of sex demanded. The lower class are fairly easy to attract in large numbers, but their individual spending is limited and a good whore is wasted on them. The wealthiest citizens on the other hand have a lot more to spend, but also require whores that are up to their standards. You may want to choose your policies, future society and rent choices accordingly."]);

	App.Events.addParagraph(f, ["From the supply side you have to contend with competitors trying to gobble up large chunks of the sex market. You may choose to compete with them on somewhat even terms and let the free market sort it out, but you may also try your hand at nudging other suppliers into serving your purposes. You can either subsidize sexual services, making outside suppliers more willing to provide inside your arcology or use your influence and position to stifle them by having to comply with bothersome rules and regulations to dissuade them instead."]);

	App.Events.addParagraph(f, ["Slaves assigned as whores can be used to satisfy any of the different classes of citizens, if they are desirable and skilled enough, that is. Slaves assigned to serve the public are suitable for the sexual relief of the lower half of your citizenry and the arcade generally only serves the very bottom of your arcology."]);


	return f;
}, "slaves");


App.Encyclopedia.addArticle("Living Conditions", function() {
	const f = new DocumentFragment();

	App.Events.addParagraph(f, ["Slaves can be assigned different living conditions which affect their mental state and well-being. Some Facilities may overwrite manually set living conditions."]);

	const dl = document.createElement("dl");
	App.Events.addNode(dl, ["<dt>Spare</dt><dd>The cheapest and the default but may cause some issues.</dd>"], );
	App.Events.addNode(dl, ["<dt>Normal</dt><dd>Is more expensive but doesn't provide anything.</dd>"], );
	App.Events.addNode(dl, ["<dt>Luxurious</dt><dd>As the name implies, it is the most expensive however it may provide devotion and trust bonuses. A recruiter benefits from this.</dd>"], );
	f.append(dl);

	return f;
}, "slaves");


App.Encyclopedia.addArticle("Enslaving People", function() {
	const f = new DocumentFragment();

	App.Events.addParagraph(f, ["As you grow in economic power and social influence, opportunities to enslave people may appear. I will certainly do my best to bring them to your attention as they appear."]);

	let r = [];
	r.push("Despite their extreme anarcho-libertarianism, the Free Cities observe some limited legalities surrounding enslavement.");
	if (V.minimumSlaveAge) {
		r.push(`Most obviously, no one under the age of ${V.minimumSlaveAge} can be a sex slave under any circumstances.`);
	}
	r.push("The most generally accepted way to enslave someone is to put them in a situation where they owe you a large sum of");
	r.push(App.Encyclopedia.link("money", "Money", "cash"));
	r.push("that they cannot pay. You can then demand payment and force them to sell themselves to you when they fail to make it.");
	if (V.minimumSlaveAge) {
		r.push("(This is also how");
		r.push(App.Encyclopedia.link("slave schools", "Slave Schools", ""));
		r.push("dodge around the ban on underage sex slaves; minors can make unvoidable contracts for 'necessities' such as food and shelter, and thereby incur debts. After they come of age, those debts can be used to enslave them.)");
	}
	r.push("Of course, that means if someone is in debt to another person, you can purchase the debt from its holder and then enslave the debtor.");
	r.push("Even if you are in a situation where you have a right to enslave someone, the necessary formalities and biometric scanning for a sex slave are not");
	r.push(App.Encyclopedia.link("cheap.", "Money", "cash"));
	r.push("You will have to pay");
	r.push(App.UI.DOM.cashFormat(sexSlaveContractCost()));
	r.push("to enslave someone as a sex slave.");
	r.push("The legalities are looser for");
	r.push(App.Encyclopedia.link("menial slaves;", "Menial Slaves", ""));
	r.push("indeed, in many");
	r.push(App.Encyclopedia.link("Free Cities carved out of the collapse of old world cities,", "Urban Terrain", ""));
	r.push("even the most");
	r.push(App.Encyclopedia.link("disreputable", "Arcologies and Reputation", ""));
	r.push("buyer can place an order for an able-bodied menial slave with no major behavioral problems and expect fulfillment within the week, all for");
	r.push(App.UI.DOM.cashFormat(menialSlaveCostInTheory(-30000, 30000)));
	r.push(". Arcology owners often enslave a few people as menial slaves in any given week, simply because someone always fails to pay their bills.");
	App.Events.addParagraph(f, r);

	return f;
}, "slaves");

App.Encyclopedia.addArticle("From Rebellious to Devoted", function() {
	const f = new DocumentFragment();
	let r;

	r = [];
	r.push("Almost everything can affect a slave's willingness to obey. Increases in obedience <span class='devotion inc'>are in hot pink,</span> while decreases <span class='devotion dec'>are in orchid.</span> Meanwhile, increases in");
	r.push(App.Encyclopedia.link("trust", "Trust", "trust careful"));
	r.push("(and decreases in fear) <span class='trust inc'>are in aquamarine,</span> while decreases in");
	r.push(App.Encyclopedia.link("trust", "Trust", "trust careful"));
	r.push("(and increases in fear) <span class='trust dec'>are in gold.</span>");
	App.Events.addParagraph(f, r);

	r = [];
	r.push("High");
	r.push(App.Encyclopedia.link("devotion", "Devotion", "devotion accept"));
	r.push("will naturally degrade; it takes at least some outside impetus to maintain slavish");
	r.push(App.Encyclopedia.link("devotion", "Devotion", "devotion accept"));
	r.push("in a sane mind. The higher a slave's");
	r.push(App.Encyclopedia.link("devotion", "Devotion", "devotion accept"));
	r.push("rises, the higher this natural rate of decay will become. Generally, this should not be a concern. As long as you treat your");
	r.push(App.Encyclopedia.link("devoted", "Devotion", "devotion accept"));
	r.push("slaves decently, they will remain");
	r.push(App.Encyclopedia.link("devoted", "Devotion", "devotion accept"));
	r.push("to you.");
	App.Events.addParagraph(f, r);

	r = [];
	r.push("Slaves with");
	r.push(App.Encyclopedia.link("devotion", "Devotion", "devotion accept"));
	r.push("and");
	r.push(App.Encyclopedia.link("trust", "Trust", "trust careful"));
	r.push("that do not agree with each other (for example, a slave that is terrified of her Master, but also loves him) will see both characteristics move towards the middle.");
	App.Events.addParagraph(f, r);

	r = [];
	r.push("Finally,");
	r.push(App.Encyclopedia.link("devotion", "Devotion", "devotion accept"));
	r.push("and");
	r.push(App.Encyclopedia.link("trust", "Trust", "trust careful"));
	r.push("both have minimum and maximum values. However, raising a slave's");
	r.push(App.Encyclopedia.link("trust", "Trust", "trust careful"));
	r.push("or");
	r.push(App.Encyclopedia.link("devotion", "Devotion", "devotion accept"));
	r.push("over the maximum value isn't pointless. If either");
	r.push(App.Encyclopedia.link("trust", "Trust", "trust careful"));
	r.push("or");
	r.push(App.Encyclopedia.link("devotion", "Devotion", "devotion accept"));
	r.push("goes over the cap, and the other characteristic is still under the cap, the excess will overflow into that characteristic and improve it at a lowered efficiency. If both characteristics have been perfected, the player will instead gain a small");
	r.push(App.Encyclopedia.link("reputation", "Arcologies and Reputation", "reputation inc"));
	r.push("boost from the slave's perfect mental conditioning.");
	App.Events.addParagraph(f, r);

	return f;
}, "slaves");

App.Encyclopedia.addArticle("Health", function() {
	const f = new DocumentFragment();
	let r;

	App.Events.addParagraph(f, ["Slaves' <span class='encyclopedia topic'>health</span> is extremely important for the performance of your slaves and there are many ins and outs interacting with a slave's health. While slaves have an overarching health value it is good to be aware of the individual components; <span class='encyclopedia topic'>condition, short term damage</span> and <span class='encyclopedia topic'>long term damage.</span> A slave's <span class='encyclopedia topic'>tiredness</span> and <span class='encyclopedia topic'>illness</span> are also related and interact with <span class='encyclopedia topic'>health.</span>"]);

	App.UI.DOM.appendNewElement("h3", f, "Condition");
	r = [];
	r.push("An overall indication of health and well-being; indicating how the slave is feeling physically. A poor condition often reduces a slave's effectiveness while a slave in excellent condition will perform better. The");
	r.push(App.Encyclopedia.link("Rest", "Rest"));
	r.push("or");
	r.push(App.Encyclopedia.link("Spa", "Spa"));
	r.push("assignment will increase condition; curative drugs will increase it, while preventative drugs can stop assignment-related health losses. Curatives and rest will synergize and add additional condition if applied simultaneously.");
	App.Events.addParagraph(f, r);

	App.UI.DOM.appendNewElement("h3", f, "Short Term Damage");
	App.Events.addParagraph(f, ["Whenever something hurts a slave, be it their assignment, an event or perhaps surgery, they will incur short term damage. Short term damage tends to accumulate throughout the week and gets reduced at the end of the week. This process also lessens a slave's condition, but the condition impact can be lessened by the use of curatives or preventatives. Small amounts of short term damage are relatively harmless for a slave's overall health and will quickly heal, however large amounts of damage are dangerous."]);

	App.UI.DOM.appendNewElement("h3", f, "Long Term Damage");
	App.Events.addParagraph(f, ["Long term damage stays with your slaves and is therefore something to be aware of and try to avoid. While some long term damage accumulates passively as slaves start to get old, the most likely source of long term damage comes from slaves taking a lot of abuse without enough time to recover or from a particularly invasive surgery. While curatives and preventatives help avoid long term damage, too much short term damage will eventually bleed over and become long term damage. So even when a slave is perfectly healthy you may want to spread out surgical enhancements and allow for recovery."]);

	App.UI.DOM.appendNewElement("h3", f, "Tiredness");
	r = [];
	r.push("Working hard will eventually make your slaves tired, this is only natural. Once tired they will no longer be able to perform to the best of their abilities and therefore this may be something to avoid, though a tired slave is more malleable and less capable of resisting their master. A slave can either be perfectly fine, tired, fatigued or exhausted. Excessive tiredness will negatively impact a slave's condition. Avoiding exhaustion can be done by taking them off tiresome assignments, assigning more lenient resting rules, letting them have time off, preferably in the");
	r.push(App.Encyclopedia.link("Spa", "Spa"));
	r.push("and providing them with comfortable living conditions. The spa is particularly useful as it is not just really effective at reducing tiredness as an assignment, but also as a relaxation reward or to a lesser degree a situational reward. Be sure to have enough room in your spa for slaves deserving such rewards. A good attendant will also help. It's worth keeping in mind that not all assignments are tiring and not all slaves are good at managing their time.");
	App.Events.addParagraph(f, r);

	App.UI.DOM.appendNewElement("h3", f, "Illness");
	r = [];
	r.push("Whether we like it or not, sometimes slaves get sick. Most of the time an illness will be nothing more than a minor inconvenience that clears up by the end of the week, but occasionally a slave might catch something that is best handled with the help of a");
	r.push(App.UI.DOM.combineNodes(App.Encyclopedia.link("Clinic"), "."));
	r.push("Keeping slaves in good condition goes a long way to preventing too many issues, but one thing to be aware of is that chemical carcinogen buildup is particularly dangerous and can cause illnesses to become quite serious. A simple illness may be harmless but once a slave is seriously ill their condition will rapidly deteriorate.");
	App.Events.addParagraph(f, r);
	r = [];
	r.push("Slaves with serious illness left in their normal workplaces will also spread that illness to other slaves they come into contact with; this can be prevented by quarantining them in the Clinic.");
	r.push(App.Encyclopedia.link("Preventatives", "Drugs and Their Effects"));
	r.push("are another effective way to limit the introduction and transmission of illness in your arcology; since slaves in");
	r.push(App.Encyclopedia.link("assignments", "Slave Assignments"));
	r.push("with contact with the outside world (such as whores and public sluts) are much more likely than others to contract new illnesses, placing those slaves on a regimen of preventatives can improve your long-term profits.");
	App.Events.addParagraph(f, r);

	return f;
}, "slaves");

App.Encyclopedia.addArticle("Devotion", function() {
	// TODO: link to from other parts of the encyclopedia
	const f = new DocumentFragment();

	let r = [];
	r.push("<span class='encyclopedia topic'>Devotion</span> is a measure of a slave's liking for the player character, and secondarily, how accepting she is of her place in life. (Low Devotion is also referred to as hatred.) Along with");
	r.push(App.Encyclopedia.link("trust", "Trust", "trust careful"));
	r.push("it is the main measure of a slave's mental state. A highly <span class='devotion accept'>devoted</span> slave will always obey and will do her best on assignments. With low Devotion, obedience depends on trust: if trust is high, the slave will generally resist and do badly, but if trust is low enough the slave will obey out of fear. Almost everything in the game can effect Devotion in some way: <span class='devotion dec'>orchid text</span> indicates a Devotion loss, while <span class='devotion inc'>hot pink</span> text indicates a Devotion gain. Maximized or minimized Devotion is somewhat sticky: lightly abusing a perfectly <span class='devotion accept'>devoted</span> slave will not damage Devotion, while minor kindnesses will not affect a hateful slave. If a slave is very");
	r.push(App.Encyclopedia.link("trusting", "Trust", "trust careful"));
	r.push("extremely high Devotion will boost trust weekly (extremely low Devotion will do the reverse), and any Devotion gains that push it over its maximum value will overflow into trust. However, if a slave is very frightened, high Devotion will not impact trust. If both trust and Devotion are maximized, the slave's sex drive will be increased. If she's already a nympho,");
	r.push(App.Encyclopedia.link("reputation", "Arcologies and Reputation", "reputation inc"));
	r.push("is increased instead.");
	App.Events.addParagraph(f, r);

	return f;
}, "slaves");

App.Encyclopedia.addArticle("Trust", function() {
	const f = new DocumentFragment();
	let r;

	r = [];
	r.push("<span class='encyclopedia topic'>Trust</span> is a measure of a slave's expectations of the player character, and secondarily, how confident she is of her ability to do well. (Low trust is also referred to as fear.) Along with");
	r.push(App.Encyclopedia.link("devotion,", "From Rebellious to Devoted", "devotion accept"));
	r.push("it is the main measure of a slave's mental state. A highly trusting slave is often more expensive to keep, but will do better in a leadership position and is more valuable. Slaves who are not intended for special assignments or resale can usually be kept terrified.");
	App.Events.addParagraph(f, r);

	r = [];
	r.push("This can become negative if a slave is not sufficiently");
	r.push(App.Encyclopedia.link("devoted:", "From Rebellious to Devoted", "devotion accept"));
	r.push("in this case, she will not obey since she neither likes nor fears the player character. Many game mechanics can effect trust in some way: <span class='trust inc'>aquamarine text</span> text indicates a trust gain, while <span class='trust dec'>gold</span> indicates a trust loss. Maximized or minimized trust is somewhat sticky: lightly abusing a perfectly trusting slave will not damage trust, while minor confidence boosts will not affect an abjectly terrified slave. Extremely high trust will boost Devotion weekly, and any trust gains that push it over its maximum value will overflow into Devotion. If both are maximized, the slave's sex drive is increased. If she's already a nympho, Reputation is increased instead.");
	App.Events.addParagraph(f, r);

	return f;
}, "slaves");

App.Encyclopedia.addArticle("Drugs and Their Effects", function() {
	const f = new DocumentFragment();
	let r;

	App.Events.addParagraph(f, ["A variety of new pharmaceuticals are becoming available in the regulatory desert of the Free Cities. Many are untested, most are extremely powerful, and none have undergone long-term testing. Long-term use of any combination of these drugs is likely to have some minor but still concerning cumulative health impact. Ceasing use may only prove partially effective in reversing these effects."]);

	App.Events.addParagraph(f, ["<span class='encyclopedia topic'>Curatives,</span> cocktails of powerful drugs that promote healing, retard natural genetic decay, improve metabolism, and offer a host of other clinical benefits. They reliably and safely improve health. The only thing preventing their exhibition in all cases is their extremely high cost and unknown long-term effect."]);

	App.Events.addParagraph(f, ["<span class='encyclopedia topic'>Preventatives,</span> a cocktail of drugs similar to curatives that build up in the body and only become active when the body is stressed. These can often prevent disease or injury. They are not as expensive as the full curative regime, but only help prevent loss of health rather than promoting its increase. It should be noted that they cannot affect major trauma such as invasive surgery."]);

	App.Events.addParagraph(f, ["<span class='encyclopedia topic'>Enhancement injections,</span> improvements on 20th century legacy steroids. These often include an element not dissimilar to liposuction in which a slurry of the patient's own tissues is included in the injection to promote tissue growth at the injection site. These drugs increase cosmetic body area size faster than any other option other than plastic surgery, but can have negative health consequences."]);

	r = [];
	r.push("<span class='encyclopedia topic'>Psychosuppressants,</span> cocktails of legacy mental health treatments delivered in extremely high doses designed to reduce the patient's ability to think independently. The most common set of effects include increased obedience, reduced");
	r.push(App.Encyclopedia.link("rebelliousness,", "From Rebellious to Devoted", "defiant bold"));
	r.push("and irreversible damage to mental faculties.");
	App.Events.addParagraph(f, r);

	App.Events.addParagraph(f, ["<span class='encyclopedia topic'>Aphrodisiacs,</span> powerful, addictive sexual enhancers that cause a mental and physical state not dissimilar to traditional hypersexuality. These drugs are based on female hormones, and may have long-term effects similar to female hormone reassignment treatment. They are strongly addictive, both physically and mentally, and the usual recommendation to slaveowners is that slaves should be put on aphrodisiacs only for a brief time, or permanently. Aphrodisiac addiction can typically only be overcome by supporting a slave through withdrawal for a similar period to the amount of time she was on the drugs."]);
	r = [];
	r.push("Aphrodisiacs can also be administered in extreme doses. This is medically dangerous, but is sometimes used by unscrupulous slaveowners. Slaves so dosed will feel an extreme need for sex regardless of their emotional state; for example,");
	r.push(App.Encyclopedia.link("rebellious,", "From Rebellious to Devoted", "defiant bold"));
	r.push("virgin slaves on extreme aphrodisiac doses will typically enjoy having their virginity sold.");
	App.Events.addParagraph(f, r);

	App.Events.addParagraph(f, ["<span class='encyclopedia topic'>Anaphrodisiacs</span> are in many ways the opposite of aphrodisiacs, in that they limit the slave's libido. However, their method of action is generally slower, gentler and less damaging to the body's chemistry. They still allow for a healthy appetite."]);

	App.Encyclopedia.addArticleSource(f, "Pharmaceutical Review '32", "Dodgson, Jane Elizabeth");

	return f;
}, "slaves");

App.Encyclopedia.addArticle("Gender", function() {
	const f = new DocumentFragment();
	let r;

	App.Events.addParagraph(f, ["Slavery in the Free Cities has begun to affect perceptions of gender in ways that should be unsurprising to the student of history."]);

	App.Events.addParagraph(f, ["The last great Western civilization in which slavery was as prominent and universal as it is in the Free Cities was Rome. It is inevitable that Roman mores regarding sexual propriety and orientation should reappear organically in the Free Cities, albeit with some modern variations."]);

	r = [];
	r.push("The founders of the Free Cities were overwhelmingly male; many among the few that were not found it convenient to affect male attitudes and tastes.");
	r.push("Femininity became associated with sex slaves.");
	if (V.seeDicks) {
		r.push(`It rapidly became common to treat all slaves${V.seeDicks < 100 ? ", regardless of their biological situation," : ""} as female; in some of the Free Cities this has even become law.`);
		r.push("To describe the idea crudely, slaves get fucked, and are therefore female.");
		if (V.seeDicks === 100) {
			r.push("The Free Cities that came to predominate strongly favored societal feminization of slaves born male; today, biologically female slaves are a rare sight.");
		}
	}
	App.Events.addParagraph(f, r);

	r = [];
	r.push("There are almost as many variations in how this plays out in practice as there are slaveowners.");
	r.push(`Generally, however, the trend in the Free Cities is strongly in favor of feminizing all slaves${(V.seeDicks && V.seeDicks < 100) ? " regardless of sex" : ""}.`);
	r.push("Persons in");
	r.push(App.Encyclopedia.link("slave orphanages", "Slave Schools", ""));
	r.push("(who will be enslaved at their majority to clear the debt they incur by being raised there) are often raised on heavy");
	r.push(App.Encyclopedia.link("hormonal", "Hormones (XX)"));
	r.push("doses. If this is no longer possible,");
	r.push(App.Encyclopedia.link("drugs", "Drugs and Their Effects"));
	r.push("and surgery are often applied instead.");

	App.Events.addParagraph(f, r);

	App.Events.addParagraph(f, ["The ignorant tourist common to the Free Cities often wonders why the vast majority of people going about their public business in a Free Cities arcology are female."]);
	// Notes for potentially revisiting the above sentence:
	// An established arcology with an unusually *low* ratio of citizens to sex slaves has about 24% slaves.
	// An established arcology with an unusually *high* ratio of citizens to sex slaves has about 19% slaves.
	// A newly constructed arcology has about 21% slaves.
	// And presumably most of those are menial slaves, not sex slaves.
	// Even if every last slave looked female, if the citizens are half-and-half, the slaves can only swing it to 60% women.
	// New York City is about 52% women. Washington, D.C., is about 53% women. So is Florence, Italy. Budapest and Warsaw are each 54% women.
	// 60% is more than 54%. On the other hand, how many tourists even notice the skewed gender ratios above?
	// On the *other* other hand, maybe the citizens aren't half-and-half. Urban areas tend to have more women, and arcologies are hyper-urban.

	App.Encyclopedia.addArticleSource(f, "Guide to Modern Slavery, 2037 Edition", "Lawrence, W. G.");

	App.Events.addParagraph(f, ["Slaves can have vaginas, dicks, or both. Slaves can work well with any of these. However, there are a few major effects. Naturally, slaves not born with a vagina cannot become pregnant. Slaves without a pussy cannot learn related sexual skills, and cannot teach them. However, slaves with dicks are better at training other slaves in many sexual skills. Finally, slaves without vaginas will often find public sexual slavery, whether for profit or not, more physically taxing."]);

	return f;
}, "slaves");

App.Encyclopedia.addArticle("Nymphomania", function() {
	const f = new DocumentFragment();
	let r;

	r = [];
	r.push("The term");
	r.push(App.Encyclopedia.topic("nymphomania"));
	r.push("as used in the Free Cities' slave society refers to a very different phenomenon than the clinically diagnosable condition of hypersexuality that it traditionally denoted.");
	App.Events.addParagraph(f, r);

	r = [];
	r.push("The long-standing use of");
	r.push(App.Encyclopedia.topic("nympho"));
	r.push("to refer to a sexually eager female as a desirable thing has led it to be used in the Free Cities to describe the most desirable mental state for a sex slave to possess. Though what Free Cities slaveowners mean when they refer to a slave as a nymphomaniac certainly includes a strong sex drive, it also means that the slave in question defines her sexuality in terms of the wishes of others. In effect it refers to a kind of submissive 'all of the above' sexuality: a Free Cities nymphomaniac slave can be expected to enjoy public sex with all the arousal of a humiliation fetishist one moment, and then consume ejaculate with all the eagerness of a cum fetishist the next.");
	App.Events.addParagraph(f, r);

	App.Encyclopedia.addArticleSource(f, "Guide to Modern Slavery, 2037 Edition", "Lawrence, W. G.");

	App.Events.addParagraph(f, ["Nymphomania as used in game refers to the best possible mental status for a slave in game terms."]);

	return f;
}, "slaves");

App.Encyclopedia.addArticle("Indentured Servants", function() {
	const f = new DocumentFragment();
	let r;

	r = [];
	r.push(App.Encyclopedia.topic("Indentured Servants"));
	r.push("are slaves who are held by temporary contract. When the time on their contract expires, they are freed. For obvious reasons, Indentured Servants' value is heavily affected by how much time remains until they are to be freed. When their emancipation arrives, Indentured Servants can react in varying ways, depending on their feelings about the player character.");
	App.Events.addParagraph(f, r);

	App.Events.addParagraph(f, ["To prevent the obvious exploitative use of Indentured Servants, using them without mercy since they are of no long term value anyway, most indentures contain limitation clauses that restrict the indenture owner from various harsh actions. The most restrictive indentures prevent almost all drugs and surgery, and many of the least pleasant jobs. On the other hand, stupidity, ignorance, or duress can lead some Indentured Servants to sign contracts with barely any protections at all."]);

	return f;
}, "slaves");

App.Encyclopedia.addArticle("Menial Slaves", function() {
	const f = new DocumentFragment();
	let r;

	r = [];
	r.push(App.Encyclopedia.topic("Menial slaves"));
	r.push("in general are the numerous slaves in the arcology that are not considered sex slaves, due to advanced age, unattractiveness, or other unsuitability. Their duties in the arcology vary widely from slave to slave and from arcology to arcology. Automation has done away with many traditional jobs in strictly economic terms, but some slaveowning societies prefer to have unskilled tasks done by slaves anyway for reasons of appeal or prestige. Also, the advancement of automation has been beaten back in some areas due to the obviously low practical labor costs in Free Cities with");
	r.push(App.Encyclopedia.link("cheap", "Money", "cash"));
	r.push("slaves.");
	App.Events.addParagraph(f, r);

	r = [];
	r.push("Menials remain almost entirely off-screen. The game will track the arcology's population of menial slaves, and many of your decisions can affect the menial population. You can also buy, keep, and sell menial slaves yourself, from the slave markets menu. They will produce a small profit each week through their (unspecified) labors. Alternatively, a tidy profit can be made from playing the slave market for menials. There are also two subtypes of menial slave, both of which become inaccessible if");
	r.push(App.Encyclopedia.link("Paternalism"));
	r.push("is selected as a societal goal.");
	App.Events.addParagraph(f, r);

	r = [];
	r.push(App.Encyclopedia.topic("Fuckdolls"));
	r.push("are slaves immured in permanent latex suits with holes over their orifices, turning them into living sex toys. They are more valuable than menial slaves proper, mostly due to the cost of the various compliance and drug components of the suits, which make them quite expensive. The weekly profit from owning Fuckdolls can be improved though a policy unlocked by");
	r.push(App.UI.DOM.combineNodes(App.Encyclopedia.link("Degradationism"), "."));
	r.push("Normal menials can be converted into Fuckdolls if an upgraded");
	r.push(App.Encyclopedia.link("Arcade"));
	r.push("is available.");
	App.Events.addParagraph(f, r);

	r = [];
	r.push(App.Encyclopedia.topic("Standard Bioreactors"));
	r.push("are slaves who are permanently attached to the arcology for industrial use, which can vary from milking to drug testing to organ farming. They are slightly less valuable than menial slaves proper. The weekly profit from owning Bioreactors can be improved though a policy unlocked by");
	r.push(App.UI.DOM.combineNodes(App.Encyclopedia.link("Pastoralism"), "."));
	r.push("Normal menials can be converted into Bioreactors if an industrialized");
	r.push(App.Encyclopedia.link("Dairy"));
	r.push("is available.");
	App.Events.addParagraph(f, r);

	return f;
}, "slaves");

App.Encyclopedia.addArticle("Fuckdolls", function() {
	const f = new DocumentFragment();

	App.Events.addParagraph(f, ["Basis of the Kombinezon-B bodysuit is a durable advanced material. Bodysuit protects, temperature-regulates, cleans, and restrains inhabitant. Material is of such strength that inhabitant is well protected, and of such thickness that inhabitant cannot feel any touch."]);

	App.Events.addParagraph(f, ["Bodysuit is plumbed for nutrition, drug application, and waste removal. Inhabitant's digestive tract should be reoriented to cannulae of complex ?-2 for nutrition intake at left rib cage and waste removal at front abdomen. Drug application is by direct bloodstream. Bodysuit includes monitoring systems to maintain vital signs of inhabitant."]);

	App.Events.addParagraph(f, ["For use, bodysuit possesses apertures at anus, mouth, and where appropriate, vagina. No provision for silencing is made, so surgical muting is recommended before application of bodysuit. Closure of jaws remains somewhat possible, so surgical dentition reduction is recommended before application of bodysuit. No other apertures are discernible to inhabitant. Inhabitant's only source of stimulation is penetration."]);

	App.Events.addParagraph(f, ["Revision ?-7 of bodysuit for inhabitant without limbs exists. Nutritional requirements are reduced. Drugs required for vital sign maintenance are increased."]);

	App.Encyclopedia.addArticleSource(f, "Product Manual: Kombinezon-B Fuckdoll bodysuit manual");

	App.Events.addParagraph(f, ["When the Fuckdoll upgrade to the arcade is purchased, any mindbroken slaves that exceed the arcade's capacity will be converted into Fuckdolls and sold."]);

	return f;
}, "slaves");

App.Encyclopedia.addArticle("Lingua Franca", function() {
	const f = new DocumentFragment();

	App.Events.addParagraph(f, ["At the beginning of the game, the lingua franca of the arcology will be determined, either by customization or by default to the most common language of the selected continent. When slaves are generated during the game, they will be assigned a familiarity with the lingua franca based on their nationality, <span class='intelligent'>intelligence,</span> education, and in some cases, ethnicity. This accent can range from nonexistent (typical for slaves from the country where the language originated) to crippling, rendering the slave more or less unable to speak and only able to understand basic orders. The latter will reduce a slave's attractiveness. Slaves will learn the lingua franca naturally, a process that is faster for intelligent slaves. It can be sped up by allowing slaves to speak and providing basic slave education. Light accents are considered attractive, but can be eliminated using speech rules that encourage unaccented speech. A thick accent will impede a Head Girl."]);

	return f;
}, "slaves");

App.Encyclopedia.addArticle("Slave Score (Attractiveness)", function() {
	const f = new DocumentFragment();
	let r;

	r = [];
	r.push("A slave's");
	r.push(App.Encyclopedia.topic("Attractiveness Score"));
	r.push("is a derived stat used to determine a slave's performance at many assignments. It also plays a major role in her price if bought or sold. It's a rough measure, but it's intended to serve as a rough count of how many of your arcology's citizens would be interested in paying to fuck her over the course of a week. The amount they would be willing to pay is determined by her");
	r.push(App.UI.DOM.combineNodes(App.Encyclopedia.link("Sexual Score", "Slave Score (Sexual)"), "."));
	r.push("Attractiveness Score is affected by virtually every physical trait a slave has, some skills, and societal tastes.");
	App.Events.addParagraph(f, r);

	return f;
}, "slaves");

App.Encyclopedia.addArticle("Slave Score (Sexual)", function() {
	const f = new DocumentFragment();
	let r;

	r = [];
	r.push("A slave's");
	r.push(App.Encyclopedia.topic("Sexual Score"));
	r.push("is a derived stat used to determine a slave's performance at many assignments. It also plays a major role in her price if bought or sold. It's a rough measure, but it's intended to serve as an estimate of the average price she would command as a street whore over the course of a week. The number of your arcology citizens who might be willing to pay that price is determined by her");
	r.push(App.UI.DOM.combineNodes(App.Encyclopedia.link("Attractiveness Score", "Slave Score (Attractiveness)"), "."));
	r.push("Sexual Score is affected by sexual skills, some physical traits,");
	r.push(App.Encyclopedia.link("Health"));
	r.push("and");
	r.push(App.Encyclopedia.link("devotion,", "From Rebellious to Devoted", "devotion accept"));
	r.push("and societal tastes.");
	App.Events.addParagraph(f, r);

	return f;
}, "slaves");

App.Encyclopedia.addCategory("slaves", function() {
	const r = [];
	r.push(App.Encyclopedia.link("Enslaving People"));
	r.push(App.Encyclopedia.link("Living Conditions"));
	r.push(App.Encyclopedia.link("Health"));
	r.push(App.Encyclopedia.link("Devotion", "Devotion", "devotion accept"));
	r.push(App.Encyclopedia.link("Trust", "Trust", "trust careful"));
	r.push(App.Encyclopedia.link("From Rebellious to Devoted"));
	r.push(App.Encyclopedia.link("Drugs and Their Effects"));
	r.push(App.Encyclopedia.link("Gender"));
	r.push(App.Encyclopedia.link("Nymphomania"));
	r.push(App.Encyclopedia.link("Indentured Servants"));
	r.push(App.Encyclopedia.link("Menial Slaves"));
	r.push(App.Encyclopedia.link("Fuckdolls"));
	r.push(App.Encyclopedia.link("Lingua Franca"));
	r.push(App.Encyclopedia.link("Slave Score (Attractiveness)", "Slave Score (Attractiveness)"));
	r.push(App.Encyclopedia.link("Slave Score (Sexual)", "Slave Score (Sexual)"));
	r.push(App.Encyclopedia.link("Demand for Sex"));
	return App.UI.DOM.generateLinksStrip(r);
});
