App.Encyclopedia.addArticle("Body", function() {
	const fragment = new DocumentFragment();
	App.UI.DOM.appendNewElement("p", fragment, "Future room for lore text", ["note"]);
	App.UI.DOM.appendNewElement("div", fragment, "Choose a more particular entry below:");
	return fragment;
}, "body");

App.Encyclopedia.addArticle("Waist", function() {
	const fragment = new DocumentFragment();
	const r = [];
	r.push(`Slaves'`);
	r.push(App.Encyclopedia.topic("waist"));
	r.push(`contributes to beauty. Waists can be altered permanently by corsets over time, or quickly in the surgery. (wiki: needs more technical detail)`);
	App.Events.addParagraph(fragment, r);
	return fragment;
}, "body");

App.Encyclopedia.addArticle("Anuses", function() {
	const fragment = new DocumentFragment();
	const r = [];
	r.push(`Slaves'`);
	r.push(App.Encyclopedia.topic("anuses"));
	r.push(`are a valuable commodity. Like`);
	r.push(App.UI.DOM.combineNodes(
		App.Encyclopedia.link("vaginas"),
		`,`
	));
	r.push(`they appear in four degrees of tightness: virgin and three increasing levels of looseness. Tighter anuses improve performance at sexual assignments, but most methods of learning `);
	r.push(App.Encyclopedia.link("anal skill", "Anal Skill"));
	r.push(`tend to loosen anuses. Assigning a virgin to sex work will result in a one-time bonus to performance, but may anger her and can result in skipping up one level of looseness. A virgin anus applies a moderate cost multiplier for slave purchase or sale. Anuses can be loosened by events, strenuous sex work, or plug accessories; they can be tightened with rest from strenuous sex work, personal attention, or the autosurgery, though such surgery can reduce`);
	r.push(App.UI.DOM.combineNodes(
		App.Encyclopedia.link("anal skill", "Anal Skill"),
		`.`
	));
	App.Events.addParagraph(fragment, r);
	return fragment;
}, "body");

App.Encyclopedia.addArticle("Areolae", function() {
	const fragment = new DocumentFragment();
	const r = [];
	r.push(`Slaves'`);
	r.push(App.Encyclopedia.topic("areolae"));
	r.push(`can be altered in size or shape through surgery. (wiki: needs more technical detail)`);
	App.Events.addParagraph(fragment, r);
	return fragment;
}, "body");

App.Encyclopedia.addArticle("Breasts", function() {
	const fragment = new DocumentFragment();
	const r = [];
	r.push(`Slaves'`);
	r.push(App.Encyclopedia.topic("breasts"));
	r.push(`contribute to beauty. They can be enlarged with`);
	r.push(App.UI.DOM.combineNodes(
		App.Encyclopedia.link("XX hormones", "Hormones (XX)"),
		`, intense`
	));
	r.push(App.UI.DOM.combineNodes(App.Encyclopedia.link("lactation"), `,`));
	r.push(App.UI.DOM.combineNodes(
		App.Encyclopedia.link("weight gain", "Weight"),
		`, or surgery (which`
	));
	r.push(App.Encyclopedia.link("boob fetishists", "Boob Fetishists"));
	r.push(`will be grateful for).`);
	App.Events.addParagraph(fragment, r);
	return fragment;
}, "body");

App.Encyclopedia.addArticle("Butts", function() {
	return App.UI.DOM.combineNodes(
		`Slaves' `,
		App.UI.DOM.makeElement("span", "butts", ["strong"]),
		` contribute to beauty. They can be enlarged with `,
		App.Encyclopedia.link("XX hormones", "Hormones (XX)"),
		`, `,
		App.Encyclopedia.link("weight gain", "Weight"),
		`, or surgery (which `,
		App.Encyclopedia.link("buttsluts", "Buttsluts"),
		` will be grateful for).`
	);
}, "body");

App.Encyclopedia.addArticle("Clits", function() {
	const fragment = new DocumentFragment();
	const r = [];
	r.push(`Slaves'`);
	r.push(App.Encyclopedia.topic("clits"));
	r.push(`contribute to beauty. (wiki: needs more technical detail)`);
	// TODO: how are clits tied to dicks, vaginas, and hormones?
	App.Events.addParagraph(fragment, r);
	return fragment;
}, "body");

App.Encyclopedia.addArticle("Dicks", function() {
	const fragment = new DocumentFragment();
	let r = [];
	r.push(`Slaves'`);
	r.push(App.Encyclopedia.topic("dicks"));
	r.push(`are less straightforward than`);

	r.push(App.Encyclopedia.link("anuses"));
	r.push(`or `);
	r.push(App.UI.DOM.combineNodes(
		App.Encyclopedia.link("vaginas"), `.`
	));
	r.push(`At game start, larger dicks reduce slave value, though this can be reduced or even reversed by some future society choices. Slaves will remain capable of erection so long as they retain `);
	r.push(App.Encyclopedia.link("testicles"));
	r.push(`and are not on `);
	r.push(App.UI.DOM.combineNodes(App.Encyclopedia.link("female hormone treatments", "Hormones (XX)"), `.`));
	App.Events.addParagraph(fragment, r);
	fragment.append(App.Encyclopedia.link("Clits?", "Clits"));
	// TODO: how do dicks and clits relate, future coder?
	return fragment;
}, "body");

App.Encyclopedia.addArticle("Ethnicity", function() {
	const fragment = new DocumentFragment();
	const r = [];
	r.push(`Slaves'`);
	r.push(App.Encyclopedia.topic("ethnicity"));
	r.push(`affects random slave generation; the game produces bodies according to broad phenotypes. For example, black hair is almost universal among randomly generated Asian slaves. Its only other impact at game start is that white slaves enjoy a minor bonus to beauty, modeling the near-universal reach of western standards of beauty. Racially based future societies can apply ethnic bonuses or penalties to beauty, changing this landscape.`);
	App.Events.addParagraph(fragment, r);
	return fragment;
}, "body");

App.Encyclopedia.addArticle("Faces", function() {
	const fragment = new DocumentFragment();
	let r = [];
	for (const [key, shape] of App.Medicine.Modification.faceShape) {
		if (!shape.hasOwnProperty("requirements") || shape.requirements) {
			r.push(App.UI.DOM.makeElement("span", capFirstChar(key), ["note"]));
			r.push(shape.desc);
			App.Events.addNode(fragment, r, "div");
			r = [];
		}
	}
	r.push(`Slaves'`);
	r.push(App.Encyclopedia.topic("faces"));
	r.push(`contribute heavily to beauty. They occur in six shapes and seven levels of attractiveness, which can be affected by surgery or, if the slave is unattractive or masculine, intensive `);
	r.push(App.UI.DOM.combineNodes(
		App.Encyclopedia.link("XX hormones", "Hormones (XX)"),
		`.`
	));
	r.push(`Unlike most other attributes, a slave's face cannot be improved more than two steps by surgery. The autosurgery upgrade removes this limitation.`);
	App.Events.addParagraph(fragment, r);
	r = [];
	r.push(App.UI.DOM.makeElement("h2", `Facial shapes and beauty`));
	return fragment;
}, "body");

App.Encyclopedia.addArticle("Height", function() {
	const fragment = new DocumentFragment();
	const r = [];
	r.push(`Slaves'`);
	r.push(App.Encyclopedia.topic("height"));
	r.push(`contributes to beauty and improves combat effectiveness. It is measured in`); // TODO: link to CE?
	if (V.showInches === 2) {
		r.push(`inches,`);
	} else {
		r.push(`centimeters,`);
	}
	r.push(`though the game handles it in terms of ranges; beyond ${heightToEitherUnit(190)}, all very tall slaves will be treated almost identically. Height can be affected by surgery, and younger slaves can also see minor hormonal impacts on height. Unlike most other attributes, a slave's height cannot be changed more than one step by surgery.`);
	App.Events.addParagraph(fragment, r);
	return fragment;
}, "body");

App.Encyclopedia.addArticle("Hips", function() {
	const fragment = new DocumentFragment();
	const r = [];
	r.push(`Slaves'`);
	r.push(App.Encyclopedia.topic("hips"));
	r.push(`contribute to beauty. (wiki: needs more technical detail)`);
	// TODO: how are clits tied to dicks, vaginas, and hormones?
	App.Events.addParagraph(fragment, r);
	return fragment;
}, "body");

App.Encyclopedia.addArticle("Lactation", function() {
	const fragment = new DocumentFragment();
	const r = [];
	r.push(`Slaves can begin to`);
	r.push(App.Encyclopedia.topic("lactate"));
	r.push(`two ways: naturally due to pregnancy or constant stimulation, or artificially, through surgical implantation of a slow-release lactation-inducing drug pellet. Drug-induced lactation is more copious, but may damage `);
	r.push(App.UI.DOM.combineNodes(App.Encyclopedia.link("health"), `. Larger `));
	r.push(App.Encyclopedia.link("breasts"));
	r.push(`will produce more milk, but not linearly: diminishing returns apply to bigger tits. Happy and `);
	r.push(App.Encyclopedia.link("healthy", "Health"));
	r.push(`cows are also more productive, and slaves with`);
	r.push(App.Encyclopedia.link("ovaries"));
	r.push(`enjoy a bonus to milk production. Natural lactation will dry up over time if not constantly maintained.`);
	App.Events.addParagraph(fragment, r);
	return fragment;
}, "body");

App.Encyclopedia.addArticle("Lips", function() {
	const fragment = new DocumentFragment();
	const r = [];
	r.push(`Slaves'`);
	r.push(App.Encyclopedia.topic("lips"));
	r.push(`contribute to beauty. At very large sizes, they will alter dialog, though this has no mechanical effect. They can be enlarged with targeted growth hormones or surgery, but such surgery can reduce `);
	r.push(App.UI.DOM.combineNodes(
		App.Encyclopedia.link("oral skill", "Oral Skill"),
		`.`
	));
	App.Events.addParagraph(fragment, r);
	return fragment;
}, "body");

App.Encyclopedia.addArticle("Musculature", function() {
	const fragment = new DocumentFragment();
	let r = [];
	r.push(`Slaves'`);
	r.push(App.Encyclopedia.topic("musculature"));
	r.push(`occurs in seven levels, and affects combat effectiveness, beauty, and the effects of breasts. For combat, the penultimate level is best. At game start, muscles are a minor detriment to beauty, though this can be changed through `);
	r.push(App.Encyclopedia.link("future society", "Future Societies"));
	r.push(`choices. Extremely large breasts can begin to hinder slaves, but the first level will allow them to carry their burdens.`);
	App.Events.addParagraph(fragment, r);
	r = [];

	r.push(`From the slave documentation;`);
	const table = App.UI.DOM.makeElement("table", null, ["invisible"]);
	r.push(table);
	App.UI.DOM.makeRow(table, `96`, `100`, `extremely muscular`);
	App.UI.DOM.makeRow(table, `31`, `95`, `muscular`);
	App.UI.DOM.makeRow(table, `6`, `30`, `toned`);
	App.UI.DOM.makeRow(table, `-5`, `5`, `none`);
	App.UI.DOM.makeRow(table, `-30`, `-6`, `weak`);
	App.UI.DOM.makeRow(table, `-95`, `-31`, `very weak`);
	App.UI.DOM.makeRow(table, `-100`, `-96`, `frail`);

	App.Events.addParagraph(fragment, r);
	r = [];
	r.push(`A standard`);
	r.push(App.Encyclopedia.link("bodyguard"));
	r.push(`is negatively impacted by being weak or extremely muscular and positively impacted by being muscular. A slave that is at the max of tall or very tall (>= 185) can handle being extremely muscular.`);
	App.Events.addParagraph(fragment, r);
	App.UI.DOM.appendNewElement("p", fragment, App.UI.DOM.combineNodes(
		App.Encyclopedia.link("DJ"),
		`'s are more effective when they are just under being muscular and inside being toned.`
	));

	App.UI.DOM.appendNewElement("p", fragment, App.UI.DOM.combineNodes(
		App.Encyclopedia.link("Nurse"),
		`'s are more effective when they are toned or greater.`
	));
	App.UI.DOM.appendNewElement("p", fragment, `Values >= 95 allows slaves with extremely hypertrophied balls (>70) to move around with effort.`);

	return fragment;
}, "body");

App.Encyclopedia.addArticle("Nipples", function() {
	const fragment = new DocumentFragment();
	const r = [];
	r.push(`Slaves'`);
	r.push(App.Encyclopedia.topic("nipples"));
	r.push(`have varying effects, depending on their shape. Tiny nipples have a negative effect on beauty, puffy and inverted nipples improve it, huge nipples improve it more strongly, and all others have no effect. Inverted and partially inverted nipples can be permanently protruded by nipple piercings or milking: this is uncomfortable, and will reduce`);
	r.push(App.Encyclopedia.link("devotion", "From Rebellious to Devoted", "hotpink"));
	r.push(`unless the slave is a`);
	r.push(App.UI.DOM.combineNodes(
		App.Encyclopedia.link("masochist", "Masochists"),
		`. Tiny nipples can be enlarged with `,
		App.Encyclopedia.link("XX hormones", "Hormones (XX)"),
		`, huge nipples can be reduced with `,
		App.Encyclopedia.link("XY hormones", "Hormones (XY)"),
		`, breast growth hormones will grow and may invert nipples, and breast implantation may damage nipples enough to shrink them slightly.`
	));

	App.Events.addParagraph(fragment, r);
	return fragment;
}, "body");

App.Encyclopedia.addArticle("Ovaries", function() {
	const fragment = new DocumentFragment();
	const r = [];
	r.push(`Slaves'`);
	r.push(App.Encyclopedia.topic("ovaries"));
	r.push(`are necessary for pregnancy and provide a small amount of natural XX hormones. An oophorectomy, available with extreme content enabled, will render a slave barren and stop ovaries' hormonal effects, producing a slave with no natural hormones. Barren slaves do suffer penalties under some future society choices, but do not require costly contraceptives to avoid pregnancy. Ovaries grant a bonus to `);
	r.push(App.UI.DOM.combineNodes(App.Encyclopedia.link("lactation"), `.`));
	App.Events.addParagraph(fragment, r);
	return fragment;
}, "body");

App.Encyclopedia.addArticle("Pregnancy", function() {
	const fragment = new DocumentFragment();
	let r = [];
	r.push(`Slaves require both`);
	r.push(App.Encyclopedia.link("vaginas"));
	r.push(`and`);
	r.push(App.Encyclopedia.link("ovaries"));
	r.push(`to become pregnant. However, it's rumored that Gender Radicalist societies have developed a method for `);
	r.push(App.UI.DOM.combineNodes(App.Encyclopedia.link("male impregnation", "Gender Radicalism Research"), "."));
	r.push(`Fertile slaves can be impregnated by the player character or a slave with`);
	r.push(App.Encyclopedia.link("testicles"));
	r.push(`from the fertile slave's individual menu. Otherwise, slaves with vaginas and ovaries who aren't wearing chastity belts or taking contraceptives, and have not had their tubes tied via surgery, will likely become pregnant if performing sexual jobs or if allowed to have sex with slaves with balls. Pregnancy has a number of minor physical effects and will induce`);
	r.push(App.Encyclopedia.link("lactation"));
	App.Events.addParagraph(fragment, r);
	return fragment;
}, "body");

App.Encyclopedia.addArticle("Skin Distinctions", function() {
	const fragment = new DocumentFragment();
	let r = [];
	r.push(`Slaves can have various`);
	r.push(App.Encyclopedia.topic("skin distinctions,"));
	r.push(`including freckles, heavy freckling, beauty marks, and birthmarks. Beauty marks and birthmarks can be removed in the Salon.`);
	App.Events.addParagraph(fragment, r);

	r = [];
	r.push(App.UI.DOM.makeElement("span", "Freckles", ["italics"]));
	r.push(`of both densities will slightly improve a slave's `);
	App.Encyclopedia.link("attractiveness score", "Slave Score (Attractiveness)");
	r.push(`if she has pale or fair skin, and slightly improve it again if she has red hair.`);
	App.Events.addParagraph(fragment, r);

	r = [];
	r.push(App.UI.DOM.makeElement("span", "Beauty marks,", ["italics"]));
	r.push(`otherwise known as facial moles, will improve a slave's`);
	App.Encyclopedia.link("attractiveness score", "Slave Score (Attractiveness)");
	r.push(`if she has a gorgeous `);
	r.push(App.UI.DOM.combineNodes(
		App.Encyclopedia.link("face", "Faces"),
		`, reduce it if she has an average or worse face, and have no effect if she has a very pretty face.`
	));
	App.Events.addParagraph(fragment, r);

	r = [];
	r.push(App.UI.DOM.makeElement("span", "Birthmarks", ["italics"]));
	r.push(`will improve a slave's attractiveness score if she is prestigious, and reduce it if she is not.`);
	App.Events.addParagraph(fragment, r);
	return fragment;
}, "body");

App.Encyclopedia.addArticle("Teeth", function() {
	const fragment = new DocumentFragment();
	App.Events.addParagraph(fragment, [`Slaves'`, App.Encyclopedia.topic("teeth"), `have a variety of impacts and can be customized in several ways.`]);
	for (const [key, teeth] of App.Medicine.Modification.teeth) {
		if (teeth.desc) {
			App.Events.addNode(fragment, [App.UI.DOM.makeElement("span", capFirstChar(key), ["note"]), teeth.desc], "div");
		}
	}
	return fragment;
}, "body");

App.Encyclopedia.addArticle("Testicles", function() {
	const fragment = new DocumentFragment();
	const r = [];
	r.push(`Slaves'`);
	r.push(App.Encyclopedia.topic("testicles"));
	r.push(`are necessary for erection and provide a small amount of natural XY hormones. At game start, larger testicles reduce slave value, though this can be reduced or even reversed by some future society choices. Orchiectomy, available with extreme content enabled, will stop testicles' hormonal effects, producing a slave with no natural hormones. It also has significant mental effects.`);
	App.Events.addParagraph(fragment, r);
	return fragment;
}, "body");

App.Encyclopedia.addArticle("Vaginas", function() {
	const fragment = new DocumentFragment();
	const r = [];
	r.push(`Slaves'`);
	r.push(App.Encyclopedia.topic("vaginas"));
	r.push(`are a valuable commodity. Like `);
	r.push(App.UI.DOM.combineNodes(
		App.Encyclopedia.link("anuses"),
		`, they appear in four degrees of tightness: virgin and three increasing levels of looseness. Tighter vaginas improve performance at sexual assignments, but most methods of learning `
	));

	r.push(App.Encyclopedia.link("anal skill", "Anal Skill"));
	r.push(`tend to loosen anuses. Assigning a virgin to sex work will result in a one-time bonus to performance but may anger her; alternatively, a chastity belt can be used to preserve virginity during sexual assignments. A virgin vagina applies a large cost multiplier for slave purchase or sale. Vaginas can be loosened by events, strenuous sex work, or plug accessories; they can be tightened with rest from strenuous sex work, personal attention, or the autosurgery, though such surgery can reduce`);
	r.push(App.UI.DOM.combineNodes(
		App.Encyclopedia.link("vaginal skill", "Vaginal Skill"),
		`.`
	));
	App.Events.addParagraph(fragment, r);

	fragment.append(App.Encyclopedia.link("Clit?", "Clits"));

	return fragment;
}, "body");

App.Encyclopedia.addArticle("Weight", function() {
	const fragment = new DocumentFragment();
	let r = [];
	r.push(`A slaves'`);
	r.push(App.Encyclopedia.topic("weight"));
	r.push(`contributes to their beauty. The middle three values (thin, average and curvy) are all considered equally good; outside that range, penalties are applied. Gaining and losing weight can cause changes to a slave's`);
	r.push(App.UI.DOM.combineNodes(
		App.Encyclopedia.link("breast", "Breasts"),
		` and `,
		App.Encyclopedia.link("butt", "Butts"),
		` size, and will be different for `,
		App.Encyclopedia.link("anorexics", "Anorexic"),
		`, `,
		App.Encyclopedia.link("gluttons", "Gluttonous"),
		`, and `,
		App.Encyclopedia.link("fitness"),
		` fanatics.`,
	));
	App.Events.addParagraph(fragment, r);

	r = [];
	r.push(`From the slave documentation;`);
	const table = App.UI.DOM.makeElement("table", null, ["invisible"]);
	r.push(table);
	App.UI.DOM.makeRow(table, `191`, `200`, `dangerously obese. This can lead to a slave losing their leadership position.`);
	App.UI.DOM.makeRow(table, `161`, `190`, `super obese`);
	App.UI.DOM.makeRow(table, `131`, `160`, `obese`);
	App.UI.DOM.makeRow(table, `96`, `130`, `fat`);
	App.UI.DOM.makeRow(table, `31`, `95`, `overweight`);
	App.UI.DOM.makeRow(table, `11`, `30`, `curvy`);
	App.UI.DOM.makeRow(table, `-10`, `10`, `neither too fat nor too skinny`);
	App.UI.DOM.makeRow(table, `-30`, `-11`, `thin`);
	App.UI.DOM.makeRow(table, `-95`, `-31`, `very thin`);
	App.UI.DOM.makeRow(table, `-100`, `-96`, `emaciated`);

	App.Events.addParagraph(fragment, r);
	r = [];
	r.push(`he ideal range for a`);
	r.push(App.Encyclopedia.link("bodyguard"));
	r.push(`is -10 to 30, going either way negatively impacts them.`);
	App.Events.addParagraph(fragment, r);
	return fragment;
}, "body");

App.Encyclopedia.addArticle("Hormones (XX)", function() {
	const fragment = new DocumentFragment();
	let r = [];
	r.push(App.UI.DOM.combineNodes(
		App.Encyclopedia.topic("XX Hormones"),
		`are female hormones, either from hormone treatments or from `,
		App.Encyclopedia.link("ovaries"),
		`. A hidden hormonal score is calculated for each slave, with positive values more feminine:`
	));
	App.Events.addNode(fragment, r, "div");

	const list = App.UI.DOM.appendNewElement("ul", fragment);

	App.UI.DOM.appendNewElement("li", list, `normal XX hormones provide +1`);
	App.UI.DOM.appendNewElement("li", list, `heavy XX hormones provide +2`);
	App.UI.DOM.appendNewElement("li", list, App.UI.DOM.combineNodes(
		App.Encyclopedia.link("Ovaries"),
		` provide +1`
	));
	App.UI.DOM.appendNewElement("li", list, App.UI.DOM.combineNodes(
		App.Encyclopedia.link("Testicles"),
		` provide -1`
	));

	r = [];
	r.push(`At a total of +1 with no ovaries present, XY attraction will increase, dicks will shrink, testicles will shrink, deep voices will be raised, small breasts and buttocks will grow, ugly faces will soften, huge clits will shrink, and extreme `);
	r.push(App.Encyclopedia.link("musculature"));
	r.push(`will soften.`);
	App.Events.addParagraph(fragment, r);

	r = [];
	r.push(`At +2, all these effects become more likely and more extreme, and`);
	r.push(App.Encyclopedia.link("devotion", "From Rebellious to Devoted", "hotpink"));
	r.push(`and`);
	r.push(App.Encyclopedia.link("trust", "Trust", "mediumaquamarine"));
	r.push(`can both increase.`);
	App.Events.addParagraph(fragment, r);

	r = [];
	r.push(`Artificial hormonal effects can be accelerated by installing the second `);
	r.push(App.Encyclopedia.link("upgrade", "What the Upgrades Do"));
	r.push(`to the kitchen, which will also stop slave's assets from shrinking due to natural hormonal effects.`);

	App.Events.addParagraph(fragment, r);
	return fragment;
}, "body");

App.Encyclopedia.addArticle("Hormones (XY)", function() {
	const fragment = new DocumentFragment();
	let r = [];
	r.push(App.UI.DOM.combineNodes(
		App.Encyclopedia.topic("XY Hormones"),
		`are male hormones, either from hormone treatments or from `,
		App.Encyclopedia.link("Testicles"),
		`. A hidden hormonal score is calculated for each slave, with negative values more masculine:`
	));
	App.Events.addNode(fragment, r, "div");

	const list = App.UI.DOM.appendNewElement("ul", fragment);

	App.UI.DOM.appendNewElement("li", list, `normal XY hormones provide -1`);
	App.UI.DOM.appendNewElement("li", list, `heavy XY hormones provide -2`);
	App.UI.DOM.appendNewElement("li", list, App.UI.DOM.combineNodes(
		App.Encyclopedia.link("Ovaries"),
		` provide +1`
	));
	App.UI.DOM.appendNewElement("li", list, App.UI.DOM.combineNodes(
		App.Encyclopedia.link("Testicles"),
		` provide -1`
	));

	App.UI.DOM.appendNewElement("p", fragment, `At a total of -1, XY attraction will increase, large breasts and buttocks will shrink, and clits will grow.`);

	r = [];
	r.push(`At +2, all these effects become more likely and more extreme,`);
	r.push(App.Encyclopedia.link("devotion", "From Rebellious to Devoted", "hotpink"));
	r.push(`can decrease, dicks and testicles will grow, voices will deepen, and faces will become uglier.`);
	App.Events.addParagraph(fragment, r);

	r = [];
	r.push(`Artificial hormonal effects can be accelerated by installing the second `);
	r.push(App.Encyclopedia.link("upgrade", "What the Upgrades Do"));
	r.push(`to the kitchen, which will also stop slave's assets from shrinking due to natural hormonal effects.`);

	App.Events.addParagraph(fragment, r);
	return fragment;
}, "body");

App.Encyclopedia.addCategory("body", function() {
	const links = [];
	links.push(App.Encyclopedia.link("Anuses"));
	links.push(App.Encyclopedia.link("Areolae"));
	links.push(App.Encyclopedia.link("Breasts"));
	links.push(App.Encyclopedia.link("Butts"));
	links.push(App.Encyclopedia.link("Clits"));
	links.push(App.Encyclopedia.link("Dicks"));
	links.push(App.Encyclopedia.link("Ethnicity"));
	links.push(App.Encyclopedia.link("Faces"));
	links.push(App.Encyclopedia.link("Height"));
	links.push(App.Encyclopedia.link("Hips"));
	links.push(App.Encyclopedia.link("Lactation"));
	links.push(App.Encyclopedia.link("Lips"));
	links.push(App.Encyclopedia.link("Musculature"));
	links.push(App.Encyclopedia.link("Nipples"));
	links.push(App.Encyclopedia.link("Ovaries"));
	links.push(App.Encyclopedia.link("Pregnancy"));
	links.push(App.Encyclopedia.link("Skin Distinctions"));
	links.push(App.Encyclopedia.link("Teeth"));
	links.push(App.Encyclopedia.link("Testicles"));
	links.push(App.Encyclopedia.link("Vaginas"));
	links.push(App.Encyclopedia.link("Waist"));
	links.push(App.Encyclopedia.link("Weight"));
	links.push(App.Encyclopedia.link("XX", "Hormones (XX)"));
	links.push(App.Encyclopedia.link("XY", "Hormones (XY)"));
	return App.UI.DOM.generateLinksStrip(links);
});
