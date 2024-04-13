/**
 * Reputation budget passage
 * @returns {DocumentFragment}
 */
App.Budget.rep = function() {
	const f = new DocumentFragment();

	// App.UI.DOM.appendNewElement("h1", f, `Reputation Budget`);

	f.append(intro());
	f.append(settings());
	// Table of Totals
	if (!V.lastWeeksRepIncome) {
		App.UI.DOM.appendNewElement("p", f, "Reputation data currently unavailable.");
	} else {
		App.UI.DOM.appendNewElement("p", f, App.Budget.table("rep"));
	}

	errors(f);
	return f;

	/**
	 * @returns {HTMLParagraphElement}
	 */
	function intro() {
		const p = document.createElement("p");
		p.classList.add("scene-intro");
		p.append(`Reputation is a difficult thing to quantify, ${properTitle()}. Here you see an overview of topics that interest people in the arcology, and in turn, reflect on your own reputation. Much like a finance report, you can see here how your choices last week moved you closer to or further from your goals, and head any issues off before they get worse.`);
		if (V.assistant.power >= 3) {
			p.append(" Thanks to the arcology's powerful power computer core it is possible to track reputation changes to an unprecedented degree.");
		}
		return p;
	}

	/**
	 * @returns {HTMLParagraphElement}
	 */
	function settings() {
		const p = document.createElement("p");
		App.UI.DOM.appendNewElement("div", p, "Your weekly reputation changes are as follows:", ["detail"]);

		let options = new App.UI.OptionsGroup();
		options.addOption("", "repBudget", V.showAllEntries)
			.addValue("Normal", 0).on().addValue("Show Empty Entries", 1);
		p.append(options.render());

		return p;
	}

	/**
	 * @param {DocumentFragment} container
	 */
	function errors(container) {
		if (V.lastWeeksRepErrors.length > 0) {
			const p = document.createElement("p");
			p.append(App.UI.DOM.passageLink("Reset", "Rep Budget",
				() => { V.lastWeeksRepErrors = []; }));
			App.UI.DOM.appendNewElement("div", p, "Errors:", "error");
			for (const error of V.lastWeeksRepErrors) {
				App.UI.DOM.appendNewElement("div", p, error, "error");
			}
			container.append(p);
		}
	}
};
