/* TODO: add entries for Nursery */

App.Encyclopedia.Assignments = {
	/**
	 * @returns {DocumentFragment}
	 */
	attendingClasses() {
		return App.UI.DOM.combineNodes(
			App.Encyclopedia.topic("Attending classes"),
			" is an assignment which educates the slave, raising intelligence if possible. Being educated raises value and is useful for some jobs and leadership positions."
		);
	},

	/**
	 * @returns {DocumentFragment}
	 */
	confinement() {
		return App.UI.DOM.combineNodes(
			App.Encyclopedia.topic("Confinement"),
			" is an assignment which accelerates breaking for disobedient slaves. If a slave isn't obedient enough to work and isn't ",
			App.Encyclopedia.link("unhealthy", "Health"),
			" enough to need rest, this will make them useful sooner."
		);
	},

	/**
	 * @returns {DocumentFragment}
	 */
	fucktoy() {
		return App.UI.DOM.combineNodes(
			App.Encyclopedia.topic("Fucktoy service"),
			" is an assignment which keeps the slave close and under the player's eye. It's mostly just for fun, but fucktoys can improve ",
			App.Encyclopedia.link("reputation", "Arcologies and Reputation", "reputation inc"),
			" based on their beauty, and the player character's attention can be targeted to areas of the slave's body with possible fetish effects on happy slaves."
		);
	},

	/**
	 * @returns {DocumentFragment}
	 */
	gloryHole() {
		return App.UI.DOM.combineNodes(
			App.Encyclopedia.topic("Occupying a glory hole"),
			" is an assignment which makes money off of slaves regardless of their beauty, skills, or feelings; it's not fun or ",
			App.Encyclopedia.link("healthy", "Health"),
			" but very powerful for extracting ¤ out of otherwise useless slaves."
		);
	},

	/**
	 * @returns {DocumentFragment}
	 */
	milking() {
		const fragment = document.createDocumentFragment();

		fragment.append(
			App.Encyclopedia.topic("Getting milked"),
			" is an assignment which makes money from lactation based on a slave's breasts, ",
			App.Encyclopedia.link("health"),
			" and hormonal status."
		);
		if (V.seeDicks > 0) {
			fragment.append(" Cows with balls will also give semen.");
		}
		fragment.append(` Creates profit quickly from slaves with big tits${V.seeDicks ? " or balls" : ""}.`);

		return fragment;
	},

	/**
	 * @returns {DocumentFragment}
	 */
	farming() {
		const fragment = document.createDocumentFragment();
		fragment.append(
			App.Encyclopedia.topic("Farming"),
			" is an assignment which produces ",
			App.Encyclopedia.link("food"),
			" from your slaves' hard work"
		);
		if (V.seeBestiality) {
			fragment.append(" and allows you to breed slaves with animals");
		}
		fragment.append(
			". Can also reduce arcology upkeep with upgrades in the ",
			App.Encyclopedia.link("Farmyard")
		);
		return fragment;
	},

	/**
	 * @returns {DocumentFragment}
	 */
	publicService() {
		return App.UI.DOM.combineNodes(
			App.Encyclopedia.topic("Public Service"),
			" is an assignment which increases reputation based on a slave's beauty, sexual appeal, and skills. Very similar to whoring, but for reputation rather than money."
		);
	},

	/**
	 * @returns {DocumentFragment}
	 */
	rest() {
		return App.UI.DOM.combineNodes(
			App.Encyclopedia.topic("Rest"),
			" is an assignment mostly used to improve ",
			App.Encyclopedia.link("health"),
			". It can be useful to order slaves you wish to intensively modify to rest, since most modifications damage health. It will synergize with curative treatments, providing bonus healing when both are simultaneously applied."
		);
	},

	/**
	 * @returns {DocumentFragment}
	 */
	sexualServitude() {
		return App.UI.DOM.combineNodes(
			App.Encyclopedia.topic("Sexual servitude"),
			" is an assignment which pleases other slaves by forcing the slave to service them sexually. Useful for driving the targeted slave's ",
			App.Encyclopedia.link("devotion"),
			" up quickly."
		);
	},

	/**
	 * @returns {DocumentFragment}
	 */
	servitude() {
		return App.UI.DOM.combineNodes(
			App.Encyclopedia.topic("Servitude"),
			" is an assignment which reduces your upkeep based on the slave's ",
			App.Encyclopedia.link("devotion"),
			". Available at lower obedience than other jobs, is insensitive to the quality of a slave's body, and doesn't require skills; a good transitional assignment. Unusually, low sex drive is advantageous as a servant, since it reduces distraction. Lactating slaves are slightly better at this job, since they can contribute to their fellow slaves' nutrition."
		);
	},

	/**
	 * @returns {DocumentFragment}
	 */
	whoring() {
		return App.UI.DOM.combineNodes(
			App.Encyclopedia.topic("Whoring"),
			" is an assignment which makes money based on a slave's beauty, sexual appeal, and skills. Good whores take a long time to train and beautify but become very profitable."
		);
	}
};

App.Encyclopedia.addArticle("Slave Assignments", function() {
	const frag = new DocumentFragment();
	const r = [];
	r.push("Slave assignments are stratified into ordinary assignments and");
	r.push(App.UI.DOM.combineNodes(App.Encyclopedia.link("leadership positions", "Leadership Positions"), "."));
	App.Events.addParagraph(frag, r);

	App.UI.DOM.appendNewElement("p", frag, "Choose a more particular entry below:");

	return frag;
}, "assignmentCommon");

App.Encyclopedia.addArticle("Attending Classes", function() {
	const frag = new DocumentFragment();
	const r = [];
	r.push(App.Encyclopedia.Assignments.attendingClasses());
	r.push(App.UI.DOM.makeElement("span",
		App.UI.DOM.combineNodes("Associated facility: ", App.Encyclopedia.link("Schoolroom")),
		"note"));
	frag.append(...App.Events.spaceSentences(r));
	return frag;
}, "assignmentCommon");

App.Encyclopedia.addArticle("Confinement", function() {
	const frag = new DocumentFragment();
	const r = [];
	r.push(App.Encyclopedia.Assignments.confinement());
	r.push(App.UI.DOM.makeElement("span",
		App.UI.DOM.combineNodes("Associated facility: ", App.Encyclopedia.link("Cellblock")),
		"note"));
	frag.append(...App.Events.spaceSentences(r));
	return frag;
}, "assignmentCommon");

App.Encyclopedia.addArticle("Fucktoy", function() {
	const frag = new DocumentFragment();
	const r = [];
	r.push(App.Encyclopedia.Assignments.fucktoy());
	r.push(App.UI.DOM.makeElement("span",
		App.UI.DOM.combineNodes("Associated facility: ", App.Encyclopedia.link("Master Suite")),
		"note"));
	frag.append(...App.Events.spaceSentences(r));
	return frag;
}, "assignmentCommon");

App.Encyclopedia.addArticle("Glory Hole", function() {
	const frag = new DocumentFragment();
	const r = [];
	r.push(App.Encyclopedia.Assignments.gloryHole());
	r.push(App.UI.DOM.makeElement("span",
		App.UI.DOM.combineNodes("Associated facility: ", App.Encyclopedia.link("Arcade")),
		"note"));
	frag.append(...App.Events.spaceSentences(r));
	return frag;
}, "assignmentCommon");

App.Encyclopedia.addArticle("Milking", function() {
	const frag = document.createDocumentFragment();
	const r = [];

	r.push(App.Encyclopedia.Assignments.milking());

	r.push(App.UI.DOM.makeElement("span",
		App.UI.DOM.combineNodes("Associated facility: ", App.Encyclopedia.link("Dairy")),
		"note"));
	frag.append(...App.Events.spaceSentences(r));
	return frag;
}, "assignmentCommon");

App.Encyclopedia.addArticle("Farming", function() {
	const frag = document.createDocumentFragment();
	const r = [];
	r.push(App.Encyclopedia.Assignments.farming());

	r.push(App.UI.DOM.makeElement("span",
		App.UI.DOM.combineNodes("Associated facility: ", App.Encyclopedia.link("Farmyard")),
		"note"));
	frag.append(...App.Events.spaceSentences(r));
	return frag;
}, "assignmentCommon");

App.Encyclopedia.addArticle("Public Service", function() {
	const frag = new DocumentFragment();
	const r = [];
	r.push(App.Encyclopedia.Assignments.publicService());

	r.push(App.UI.DOM.makeElement("span",
		App.UI.DOM.combineNodes("Associated facility: ", App.Encyclopedia.link("Club")),
		"note"));
	frag.append(...App.Events.spaceSentences(r));
	return frag;
}, "assignmentCommon");

App.Encyclopedia.addArticle("Rest", function() {
	const frag = new DocumentFragment();
	const r = [];
	r.push(App.Encyclopedia.Assignments.rest());

	r.push(App.UI.DOM.makeElement("span",
		App.UI.DOM.combineNodes("Associated facilities: ", App.Encyclopedia.link("Spa"),
			", ", App.Encyclopedia.link("Clinic")),
		"note"));
	frag.append(...App.Events.spaceSentences(r));
	return frag;
}, "assignmentCommon");

App.Encyclopedia.addArticle("Sexual Servitude", App.Encyclopedia.Assignments.sexualServitude, "assignmentCommon");

App.Encyclopedia.addArticle("Servitude", function() {
	const frag = new DocumentFragment();
	const r = [];
	r.push(App.Encyclopedia.Assignments.servitude());

	r.push(App.UI.DOM.makeElement("span",
		App.UI.DOM.combineNodes("Associated facility: ", App.Encyclopedia.link("Servants' Quarters")),
		"note"));
	frag.append(...App.Events.spaceSentences(r));
	return frag;
}, "assignmentCommon");

App.Encyclopedia.addArticle("Whoring", function() {
	const frag = new DocumentFragment();
	const r = [];
	r.push(App.Encyclopedia.Assignments.whoring());

	r.push(App.UI.DOM.makeElement("span",
		App.UI.DOM.combineNodes("Associated facility: ", App.Encyclopedia.link("Brothel")),
		"note"));
	frag.append(...App.Events.spaceSentences(r));
	return frag;
}, "assignmentCommon");

App.Encyclopedia.addCategory("assignmentCommon", function() {
	const r = [];
	r.push(App.Encyclopedia.link("Common Assignments", "Slave Assignments"));
	r.push(App.Encyclopedia.link("Career Experience"));
	r.push(App.Encyclopedia.link("Attending Classes"));
	r.push(App.Encyclopedia.link("Confinement"));
	r.push(App.Encyclopedia.link("Farming"));
	r.push(App.Encyclopedia.link("Fucktoy"));
	r.push(App.Encyclopedia.link("Glory Hole"));
	r.push(App.Encyclopedia.link("Milking"));
	r.push(App.Encyclopedia.link("Public Service"));
	r.push(App.Encyclopedia.link("Rest"));
	r.push(App.Encyclopedia.link("Servitude, Sexual", "Sexual Servitude"));
	r.push(App.Encyclopedia.link("Servitude"));
	r.push(App.Encyclopedia.link("Whoring"));
	return App.UI.DOM.generateLinksStrip(r);
});
