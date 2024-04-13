App.Encyclopedia.addArticle("Leadership Positions", function() {
	const r = new DocumentFragment();
	App.Events.addParagraph(r, ["Slave assignments are stratified into ordinary", App.Encyclopedia.link("assignments", "Slave Assignments"), "and leadership positions."]);
	App.Events.addParagraph(r, ["Choose a more particular entry below:"]);

	return r;
}, "slaveLeaders");

App.Encyclopedia.addArticle("Career Experience", function() {
	const link = (text, article, className) => App.Encyclopedia.link(text, article, className);
	const devotion = (text = "devotion") => link(text, "From Rebellious to Devoted", "hotpink");
	const trust = (text = "trust") => link(text, "Trust", "mediumaquamarine");
	/** @type {[string, HTMLElement, string, string?][]} */
	const careerData = [
		["Grateful", trust(), "grateful"],
		["Menial", devotion(), "menial"],
		["Servant", link("keeping your estate", "Servitude"), "servant"],
		["Entertainment", link("public service", "Public Service"), "entertainment", "If a slave has a lot of entertainment experience, she can qualify for this bonus without career experience."],
		["Sex work", link("whoring"), "entertainment", "If a slave is very sexually experienced, she can qualify for this bonus without career experience."],
		["Leadership", link("Head Girl"), "HG"],
		["Procuring", link("Madam"), "madam"],
		["Musical", link("DJ"), "DJ"],
		["Defensive", link("Bodyguard"), "bodyguard"],
		["Convincing", link("Recruiter"), "recruiter"],
		["Security", link("Wardeness"), "wardeness"],
		["Medical", link("Nurse"), "nurse"],
		["Counseling", link("Attendant"), "attendant"],
		["Nannying", link("Matron"), "matron"],
		["Accounting", link("Stewardess"), "stewardess"],
		["Husbandry", link("Milkmaid"), "milkmaid"],
		["Farming", link("Farmer"), "farmer"],
		["Teaching", link("Schoolteacher"), "schoolteacher"],
	];
	const t = new DocumentFragment();
	const r = [];

	t.append("Slaves may retain useful experience from their lives before enslavement. Freedom and slavery are so different that the bonuses slaves get are minor. Careers fall into categories, each with its own bonus; these are:");
	for (const [boldItem, bonus, career, note] of careerData) {
		App.Events.addParagraph(t, [CareerBonus(boldItem, bonus, career, note)]);
	}
	r.push("Slaves who have been in slavery long enough that it is effectively their career get a bonus to", devotion("devotion."));
	r.push("Slaves can forget their career experience in an industrialized Dairy, but if they do so and remain sane, they will get a special bonus to both", devotion(), "and", trust("trust."));
	App.Events.addParagraph(t, r);

	App.Events.addParagraph(t, ["Facility heads and working slaves can gain work experience to provide the same benefit as having a relevant career. Intelligence is the deciding factor in how long this will take, brilliant slaves can achieve this ideally in about fourteen weeks, while borderline retarded slaves can take up two hundred weeks (Assuming that the slave's intelligence doesn't change at all and the dice roll is consistent)."]);

	return t;

	/**
	 * @param {string} career
	 * @param {HTMLElement} bonus
	 * @param {string} list
	 * @param {string} [note]
	 */
	function CareerBonus(career, bonus, list, note) {
		const r = new SpacedTextAccumulator();
		const notLeader = ["Grateful", "Menial", "Servant", "Entertainment", "Sex work"].includes(career);
		const applicable = notLeader ? App.Data.Careers.General[list] : App.Data.Careers.Leader[list];

		r.push(App.UI.DOM.makeElement("span", career, ["underline"]), `which offers a ${career === "Grateful" || career === "Menial" ? 'potential' : ''} bonus to`, bonus, `includes slaves who were: ${toSentence(applicable)}.`);
		r.toNode("div");
		if (note) {
			r.push(note);
			r.toNode("div");
		}
		return r.container();
	}
}, "slaveLeaders");

App.Encyclopedia.addArticle("Attendant", function() {
	const t = new DocumentFragment();
	const r = [];
	const link = (text, article, className) => App.Encyclopedia.link(text, article, className);
	const goodAttendant = [App.UI.DOM.makeElement("span", "intelligent", ["cyan"]), "naturally female", "appear older than 35", "have a calm libido and a motherly air."];

	r.push("An", App.UI.DOM.makeElement("span", "Attendant", ["bold"]), "can be selected once the", link("Spa"), "facility has been built.");
	r.push("Attendants provide emotional help to slaves in the spa, and can also soften flaws and even fix mindbroken slaves.");
	r.push("Good Attendants are", link("submissive", "Submissives"), "or free of", App.UI.DOM.combineNodes(link("fetishes"), ","), App.UI.DOM.toSentence(goodAttendant));
	App.Events.addNode(t, r, "div");

	return t;
}, "slaveLeaders");

App.Encyclopedia.addArticle("Matron", function() { // TODO: will still need more updating
	const t = new DocumentFragment();
	const r = [];
	const link = (text, article, className) => App.Encyclopedia.link(text, article, className);
	const goodMatron = [link("caring"), link("funny"), link("intelligent", "Intelligence"), "has given birth before."];

	r.push("A", App.UI.DOM.makeElement("span", "Matron", ["bold"]), "can be selected once the", link("Nursery"), "facility has been built.");
	r.push("Matrons oversee the day-to-day activities of the Nursery, and can soften flaws of nannies working under them. A good Matron is:", App.UI.DOM.toSentence(goodMatron));
	App.Events.addNode(t, r, "div");

	return t;
}, "slaveLeaders");

App.Encyclopedia.addArticle("Bodyguard", function() {
	const t = new DocumentFragment();
	let r = [];
	const link = (text, article, className) => App.Encyclopedia.link(text, article, className);
	const reduceDeadliness = [link("Big breasts", "Breasts"), link("butts"), link("poor health", "Health"), link("excess weight", "Weight"), link("pregnancy")];
	const bodyguardTrainees = ["her lover or wife if she has one", link("the Head Girl", "Head Girl"), link("the Wardeness", "Wardeness"), link("your Concubine.", "Concubine")];

	App.UI.DOM.appendNewElement("div", t, "Slave bodyguards are best understood not as protection for a slaveowner's person, but rather as a projection of their skill at slave breaking.", ["note"]);

	r.push("By giving a slave the means and position to easily kill her master, that master displays their total trust in them. The simple fact that an armed slave is near a slaveowner at all times is proof that that slaveowner has produced at least one slave that never wavers in her");
	r.push(link("devotion.", "From Rebellious to Devoted", "hotpink"));
	r.push("After all, if she ever wavered, the slaveowner would likely be dead.");
	App.Events.addNode(t, r, "p", "note");

	App.UI.DOM.appendNewElement("p", t, "It is obvious to any real security professional that slave bodyguards are mostly for show, from the moment of seeing one. After all, they are not equipped with modern sensors, armor, and weapons; if they were so attired and loaded down it would be quite impossible to tell if they were even female: the huge weight and bulk of modern combat gear gives an androgynous appearance. Instead, they are usually kept scantily clad or even naked, and armed with visually impressive weapons.", ["note"]);

	App.Encyclopedia.addArticleSource(t, "Guide to Modern Slavery, 2037 Edition", "Lawrence, W. G.");

	r = [];
	r.push("A", App.UI.DOM.makeElement("span", "Bodyguard", ["bold"]));
	r.push("can be selected once the Armory upgrade is purchased. Duties include protection of the player character during violent events; good bodyguards produce some");
	r.push(link("reputation", "Arcologies and Reputation", "green"));
	r.push("as well, based on how deadly they are.", "Toned but not excessive", link("muscles", "Musculature"));
	r.push(link("combat skill", "Combat Skill"), "and", link("height"));
	r.push("contribute to deadliness.");
	r.push(App.UI.DOM.toSentence(reduceDeadliness), "all detract from deadliness.");
	App.Events.addParagraph(t, r);

	r = [];
	r.push("Skilled", App.UI.DOM.makeElement("span", "intelligent", ["cyan"]), "and", link("devoted", "From Rebellious to Devoted", "hotpink"));
	r.push("Bodyguards may become concerned that they have no potential successor if you do not keep several other combat capable slaves in your penthouse.");
	r.push("Such a Bodyguard will do her best to find responsible and physically capable slaves to teach self defense to when she can.");
	r.push("Potential recipients of this training include:", App.UI.DOM.toSentence(bodyguardTrainees));
	App.Events.addNode(t, r, "div");

	return t;
}, "slaveLeaders");

App.Encyclopedia.addArticle("Concubine", function() {
	const link = (text, article, className) => App.Encyclopedia.link(text, article, className);
	const t = new DocumentFragment();
	const r = [];

	r.push("A", App.UI.DOM.makeElement("span", "Concubine", ["bold"]));
	r.push("can be selected once the", link("Master Suite"), "facility is built.");
	r.push("Concubines benefit from high beauty and sexual skills in the same way as public servants;");
	r.push("they should also be extremely", link("devoted.", "From Rebellious to Devoted", "hotpink"));
	r.push("Concubines do not apply any bonuses to other slaves in the", link("Master suite"), "rather,");
	r.push("they are the game's single most efficient production of", link("reputation", "Arcologies and Reputation", "green"), "themselves.");
	App.Events.addNode(t, r, "div");

	return t;
}, "slaveLeaders");

App.Encyclopedia.addArticle("DJ", function() {
	const link = (text, article, className) => App.Encyclopedia.link(text, article, className);
	const t = new DocumentFragment();
	let r = [];

	r.push(`My name is Danni Diemen, and I'm here today to talk about the prettiest girls in the Free Cities. That's right, DJs! When a slave bitch says, "Sweetie, I'm not that kind of girl," she's lying. She's a slave, and she is that kind of girl! So, have your way with her.`);
	App.Events.addNode(t, r, "p", "note");

	r = [];
	r.push("Except if she's a DJ. Then she probably isn't that kind of girl after all! Rare, I know. That's what makes them so hot! Some of the Free Cities' most prominent slaveowners have taken sluttery to the next level. They're building clubs designed around constant beats and constant sex, so it pays to have a hot girl maintain the party, whether it's up on stage, in the DJ booth, or down on the floor!");
	App.Events.addNode(t, r, "p", "note");

	r = [];
	r.push("As for what makes a good DJ, beauty is obvious. But I also I hear the best trend a little older, too. Let's be honest, there's something a high-class woman has that a high-class girl doesn't.");
	App.Events.addNode(t, r, "p", "note");

	App.Encyclopedia.addArticleSource(t, "Free Cities Fashion (FCF), January 2032", "Van Diemen, D. C. G.");

	r = [];
	r.push("A", App.UI.DOM.makeElement("span", "DJ", ["bold"]));
	r.push("can be selected once the", link("Club"), "facility is built.");
	r.push("DJs apply a multiplier to", link("reputation", "Arcologies and Reputation", "green"), "gains from serving in the club.");
	r.push("Entertainment skills, toned but not massive", link("muscles", "Musculature"), App.UI.DOM.makeElement("span", "intelligence", ["cyan"]), "and a pretty face make a good DJ.");
	App.Events.addParagraph(t, r);

	r = [];
	r.push("If a DJ isn't responsible for enough sluts to occupy her full time, she'll spend time fucking citizens herself. This is exactly the same as", link("Public Service"), "out of the Club: she'll benefit from any", link("Advertising"), "or", link("Variety"), "bonuses available, and will even benefit from her own leadership skills.");
	App.Events.addNode(t, r, "div");

	return t;
}, "slaveLeaders");

App.Encyclopedia.addArticle("Farmer", function() {
	const link = (text, article, className) => App.Encyclopedia.link(text, article, className);
	const t = new DocumentFragment();
	let r = [];

	r.push("A", App.UI.DOM.makeElement("span", "Farmer", ["bold"]), "can be selected once the", link("Farmyard"), "facility is built.");
	r.push("Having applicable", link("career experience", "Career Experience"), "and strong", link("muscles", "Musculature"), "allow a Farmer to maintain the different crops and animals.");
	App.Events.addNode(t, r, "div");

	App.Events.addNode(t, ["This description needs to be expanded."], "div", "note");

	return t;
}, "slaveLeaders");

App.Encyclopedia.addArticle("Head Girl", function() {
	const link = (text, article, className) => App.Encyclopedia.link(text, article, className);
	const devotion = (text = "devotion", colour = "hotpink") => link(text, "From Rebellious to Devoted", colour);
	const trust = (text = "trust") => link(text, "Trust", "mediumaquamarine");
	const t = new DocumentFragment();
	let r = [];

	r.push("Most Free Cities slaveowners eventually find it convenient to promote a", trust("trusting"), "slave to a position over others.");
	r.push("The stable of slaves necessary to present a proper public image has become so large that assistance managing and overseeing slaves is quite useful.");
	r.push("In addition, such a slave can be an example to lesser livestock.");
	App.Events.addNode(t, r, "div", "note");

	r = [];
	r.push("A good Head Girl will be", devotion("devoted"), "to her master and sexually skilled.");
	r.push("Experienced slaveowners have also found that an older slave girl is often more effective than a young one.");
	r.push("Since slavery is new, older slave girls will have spent part of their adult lives as free women, and have a deeper body of life experience to draw on.");
	App.Events.addNode(t, r, "p", "note");

	r = [];
	r.push("Naturally, some slaveowners form a strong emotional bond with their Head Girl.");
	r.push(trust("Trusting"), "and relying on a close companion can begin to resemble old world relationships.");
	r.push("It is a paradox of modern Free Cities life that such closeness is strongly frowned upon.");
	r.push("Rumors that a prominent person is emotionally involved with his or her Head Girl can be as socially devastating as rumors of infidelity were a hundred years ago.");
	App.Events.addNode(t, r, "p", "note");

	App.Encyclopedia.addArticleSource(t, "Guide to Modern Slavery, 2037 Edition", "Lawrence, W. G.");

	r = [];
	r.push("A", App.UI.DOM.makeElement("span", "Head Girl", ["bold"]));
	r.push("can be selected from among your", devotion("devoted"), "slaves immediately.");
	r.push("Duties are numerous, but mostly involve training slaves.");
	r.push("They will generally train whichever girls they think appropriate, but can be given some direction on the same menu used to select one.");
	r.push("Giving your", link("Head Girl a suite", "Head Girl Suite"), "and a personal slave will allow her to train an extra slave each week, an extremely powerful ability.");
	App.Events.addParagraph(t, r);

	r = [];
	r.push(devotion(), App.UI.DOM.makeElement("span", "intelligence", ["cyan"]), "and age over 30 all help Head Girls do well.");
	r.push("Head Girls will do better if they are comfortable with the arcology's", link("lingua franca"), ".");
	r.push("Skills are required when teaching that skill, meaning that slaves without vaginas cannot teach vaginal skills.");
	r.push("Conversely, slaves with functional dicks are better at teaching other sexual skills.");
	r.push("Also having max sex skills, dom as their fetish and being your wife provide more boosts.");
	App.Events.addNode(t, r, "div");

	return t;
}, "slaveLeaders");

App.Encyclopedia.addArticle("Madam", function() {
	const link = (text, article, className) => App.Encyclopedia.link(text, article, className);
	const t = new DocumentFragment();
	let r = [];

	r.push("Prostitution is indeed the oldest profession. It follows that the madam is probably the oldest managerial position.");
	App.Events.addNode(t, r, "div", "note");

	r = [];
	r.push("Free madams are very common in the Free Cities. As free prostitutes are priced out of their profession by slaves, many of the wealthiest are purchasing slaves and setting themselves up as madams. However, slave madams are becoming common as well.");
	App.Events.addNode(t, r, "p", "note");

	r = [];
	r.push("The selling of sex is one of the largest growth markets in the Free Cities. As has been confidently predicted by economists since the first Free City was founded, the near-anarchy of these new polities has accelerated the concentration of wealth that began in the final years of the twentieth century. Thus, the majority of free citizens of the Cities own no slaves, while the majority of slaves are owned by a very few extremely wealthy persons. Extremely large stables of slave whores are becoming common for those in the industry.");
	App.Events.addNode(t, r, "p", "note");

	r = [];
	r.push("Managing this many prostitutes is a science and an art. Naturally, it is not difficult to find slaves that are experienced in the sex trade. Setting slaves over other slaves has been a part of human slavery for all of recorded history; all of the tropes that once applied to the slave overseer in the field or the quarry now apply to the slave Madam in the brothel. The more experience they have in the field, the better they do.");
	App.Events.addNode(t, r, "p", "note");

	App.Encyclopedia.addArticleSource(t, "Guide to Modern Slavery, 2037 Edition", "Lawrence, W. G.");

	r = [];
	r.push("A", App.UI.DOM.makeElement("span", "Madam", ["bold"]), "can be selected once the", link("Brothel"), "facility is built.");
	r.push("Madams apply a multiplier to", link("income", "Money", "yellowgreen"), "from the brothel.");
	App.Events.addParagraph(t, r);

	r = [];
	r.push("Whoring skills, age over 35", App.UI.DOM.makeElement("span", "intelligence", ["cyan"]), "being your wife and a functional cock help a Madam.");
	App.Events.addParagraph(t, r);

	r = [];
	r.push("If a Madam isn't managing enough whores to occupy her full time, she'll sell herself as much as she has time for.");
	r.push("This is exactly the same as", link("whoring"), "out of the Brothel: she'll benefit from any", link("Advertising"), "or", link("Variety"), "bonuses available, and will even benefit from her own management skills.");
	App.Events.addNode(t, r, "div");

	return t;
}, "slaveLeaders");

App.Encyclopedia.addArticle("Milkmaid", function() {
	const link = (text, article, className) => App.Encyclopedia.link(text, article, className);
	const devotion = (text = "devotion", colour = "hotpink") => link(text, "From Rebellious to Devoted", colour);
	const trust = (text = "trust") => link(text, "Trust", "mediumaquamarine");
	const t = new DocumentFragment();
	let r = [];

	r.push("Most slaveowners get into dairy as a hobby. Why not? It's fun, tasty, and sexy. But sooner or later, almost everyone who starts out with a few low-volume milkers hears the call of mass production. After all, if it's hot to have one slave to use as the milking machine holds her down, it's hotter to have a whole row of moaning milkers at your mercy.");
	App.Events.addNode(t, r, "div");

	r = [];
	r.push("Unfortunately, the everyday work of husbandry goes from an amusement to a chore as a herd grows. Helping a tired slave cow with huge tits up from a long milking is fun once a day, but it gets bothersome and backbreaking the tenth time one does it. What's to be done?");
	App.Events.addParagraph(t, r);

	r = [];
	r.push("Train a milkmaid! Any decently obedient slave will do, but the stronger the better. As you probably know by now, just because slave husbandry involves human stock doesn't mean it isn't hard work, just like traditional stock keeping! The traditional image of milkmaids might be girly and innocent, but we're after a good hale bitch that can lift, carry and scrub from dawn to dusk. If you're looking to economize, you can even use a slave too old or ugly to appeal in other, more sexual jobs. After all, when it comes to the third milking of the day, cows don't care how pretty the hands that examine their tits are.");
	App.Events.addParagraph(t, r);

	App.Encyclopedia.addArticleSource(t, "Free Cities Husbandry Weekly, February 16, 2032", "Banaszewski, Valerie P.");

	r = [];
	r.push("A", App.UI.DOM.makeElement("span", "Milkmaid", ["bold"]), "can be selected once the", link("Dairy"), "facility is built.");
	r.push("Having applicable", link("career experience", "Career Experience"), "and strong", link("muscles", "Musculature"), "allow a Milkmaid to help cows maintain their health.");
	r.push("If a Milkmaid is Funny or Caring, she can improve cow's", trust("trusting"), "resting point; if she has oral skills, she can improve their", devotion(), "resting point.");
	if (V.seeDicks !== 0) {
		r.push("If she has a very large dick capable of erection, a Milkmaid can assist cows with ejaculation if the Dairy is not already stimulating prostates.");
	}
	App.Events.addNode(t, r, "div");

	return t;
}, "slaveLeaders");

App.Encyclopedia.addArticle("Nurse", function() {
	const link = (text, article, className) => App.Encyclopedia.link(text, article, className);
	const t = new DocumentFragment();
	const r = [];

	r.push("A", App.UI.DOM.makeElement("span", "Nurse", ["bold"]), "can be selected once the", link("Clinic"), "facility is built.");
	r.push("Nurses increase", link("health"), "gains in the Clinic, and play a major role in the prevention and treatment of", "illness among slaves.");
	r.push("Good Nurses are", link("nymphomaniacs", "Nymphomania"), ", highly", App.UI.DOM.makeElement("span", "intelligent,", ["cyan"]), "physically fit, and very beautiful.");
	App.Events.addNode(t, r, "div");

	return t;
}, "slaveLeaders");

App.Encyclopedia.addArticle("Recruiter", function() {
	const link = (text, article, className) => App.Encyclopedia.link(text, article, className);
	const devotion = (text = "devotion", colour = "hotpink") => link(text, "From Rebellious to Devoted", colour);
	const rep = (text = "reputation") => link(text, "Arcologies and Reputation", "green");
	const t = new DocumentFragment();
	let r = [];

	r.push("A", App.UI.DOM.makeElement("span", "Recruiter", ["bold"]), "can be selected from among your", devotion("devoted"), "slaves immediately.");
	r.push(App.UI.DOM.makeElement("span", "Intelligence", ["cyan"]), "entertainment skills, and luxurious living standards help a recruiter convince vulnerable people to submit to voluntary enslavement.");
	r.push("Each targetable group is also more sympathetic to an appropriate recruiter.");
	App.Events.addNode(t, r, "div");
	App.Events.addNode(t, ["Desperate whores: a sexual veteran."], "div", ["indent"]);
	App.Events.addNode(t, ["Expectant mothers: visibly pregnant."], "div", ["indent"]);
	App.Events.addNode(t, ["Young migrants:", link("healthy"), "and pretty."], "div", ["indent"]);
	App.Events.addNode(t, ["Dissolute sissies: with a working dick."], "div", ["indent"]);
	App.Events.addNode(t, ["Reassignment candidates: pretty without working female reproductive organs."], "div", ["indent"]);
	App.Events.addNode(t, [], "p");

	r = [];
	r.push("Once your household reaches a significant number of slaves you may direct the Recruiter to do publicity instead of acquisitions, for a boost to");
	r.push(rep());
	r.push("and possibly advancing");
	r.push(link("future societies", "Future Societies"));
	r.push(". Activating this ability does not influence any other means of obtaining new slaves. (Note that 'Facilities & leadership' includes the Recruiter herself and a slot for Head Girl, two positions that do not require a facility.)");
	App.Events.addNode(t, r, "div");

	return t;
}, "slaveLeaders");

App.Encyclopedia.addArticle("Schoolteacher", function() {
	const link = (text, article, className) => App.Encyclopedia.link(text, article, className);
	const t = new DocumentFragment();
	const r = [];

	r.push("A", App.UI.DOM.makeElement("span", "schoolteacher", ["bold"]), "can be selected once the", link("Schoolroom"), "facility is built.");
	r.push("Schoolteachers increase the rate at which students in the schoolroom learn.");
	r.push("Good schoolteachers appear older than 35, beautiful,", App.UI.DOM.makeElement("span", "intelligent", ["cyan"]), "and educated.");
	App.Events.addNode(t, r, "div");

	return t;
}, "slaveLeaders");

App.Encyclopedia.addArticle("Stewardess", function() {
	const link = (text, article, className) => App.Encyclopedia.link(text, article, className);
	const devotion = (text = "devotion", colour = "hotpink") => link(text, "From Rebellious to Devoted", colour);
	const trust = (text = "trust") => link(text, "Trust", "mediumaquamarine");
	const t = new DocumentFragment();
	let r = [];

	r.push("Throughout recorded history, wherever there have been mature slave societies, there have been slave overseers set over their peers by their masters. Naturally, these individuals have simultaneously been among the most");
	r.push(trust("trusted"));
	r.push("to their masters, and among the most hated to their compatriots in slavery. They have perhaps the greatest interest in preservation of a slave society, since the masters have only the loss of property to fear by abolition; slave overseers would likely be less lucky.");
	App.Events.addNode(t, r, "p", "note");

	r = [];
	r.push("The stewardess is the modern, domestic expression of the old overseer. Many wealthy slaveowners keep an extensive stable of less valuable slaves around their estates to serve as labor, raw material for slave training, and targets for recreational abuse. Successful oversight of this often mulish mass of stock requires a high degree of");
	r.push(devotion());
	r.push("to the master's will, of course. Good health to put in the necessarily long hours also helps. Some slaveowners also find that a functional dick allows a Stewardess to add a useful element of sexual abuse to her ministrations.");
	App.Events.addNode(t, r, "p", "note");

	App.Encyclopedia.addArticleSource(t, "Guide to Modern Slavery, 2037 Edition", "Lawrence, W. G.");

	r = [];
	r.push("A", App.UI.DOM.makeElement("span", "Stewardess", ["bold"]), "can be selected once the", link("Servants' Quarters"), "facility is built.");
	r.push("Stewardesses increase the upkeep reduction effects of servants working out of the servants' quarters. Being older than 35, having good");
	r.push(link("health"), ",");
	r.push(App.UI.DOM.makeElement("span", "intelligence", ["cyan"]), "and");
	r.push(link("nymphomania"), "or");
	r.push(link("dominance", "Doms"));
	r.push("make a good Stewardess.");
	App.Events.addNode(t, r, "div");

	return t;
}, "slaveLeaders");

App.Encyclopedia.addArticle("Wardeness", function() {
	const link = (text, article, className) => App.Encyclopedia.link(text, article, className);
	const devotion = (text = "devotion", colour = "hotpink") => link(text, "From Rebellious to Devoted", colour);
	const t = new DocumentFragment();
	const r = [];

	r.push("A", App.UI.DOM.makeElement("span", "Wardeness", ["bold"]), "can be selected once the");
	r.push(link("Cellblock"));
	r.push("facility is built. Wardenesses increase the rate at which slaves in the cellblock are broken. Very high");
	r.push(devotion(), ",", link("nymphomania"), "or");
	r.push(link("sadism", "Sadists"), ", strong");
	r.push(link("muscles", "Musculature"), ", applicable");
	r.push(link("career experience"), ", and a solid dick make a powerful Wardeness.");
	App.Events.addNode(t, r, "div");

	return t;
}, "slaveLeaders");

App.Encyclopedia.addCategory("slaveLeaders", function() {
	const r = [];
	r.push(App.Encyclopedia.link("Leadership Positions"));
	r.push(App.Encyclopedia.link("Career Experience"));
	r.push(App.Encyclopedia.link("Attendant"));
	r.push(App.Encyclopedia.link("Matron"));
	r.push(App.Encyclopedia.link("Bodyguard"));
	r.push(App.Encyclopedia.link("Concubine"));
	r.push(App.Encyclopedia.link("DJ"));
	r.push(App.Encyclopedia.link("Farmer"));
	r.push(App.Encyclopedia.link("Head Girl"));
	r.push(App.Encyclopedia.link("Madam"));
	r.push(App.Encyclopedia.link("Milkmaid"));
	r.push(App.Encyclopedia.link("Nurse"));
	r.push(App.Encyclopedia.link("Recruiter"));
	r.push(App.Encyclopedia.link("Schoolteacher"));
	r.push(App.Encyclopedia.link("Stewardess"));
	r.push(App.Encyclopedia.link("Wardeness"));
	return App.UI.DOM.generateLinksStrip(r);
});
