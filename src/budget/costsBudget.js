/**
 * Costs Budget Passage
 * @returns {DocumentFragment}
 */
App.Budget.costs = function() {
	const frag = new DocumentFragment();

	App.UI.DOM.appendNewElement("h1", frag, `Budget`);

	frag.append(
		intro(),
		loans(),
		netWorth(),
	);
	if (V.difficultySwitch === 1) {
		frag.append(economy());
	}
	frag.append(settings());

	// Table of Totals
	if (!V.lastWeeksCashIncome) {
		App.UI.DOM.appendNewElement("p", frag, "Financial data currently unavailable.");
	} else {
		App.UI.DOM.appendNewElement("p", frag, App.Budget.table("cash"));
	}

	errors(frag);
	return frag;

	/**
	 * @returns {DocumentFragment}
	 */
	function loans() {
		const frag = new DocumentFragment();

		frag.append(App.Budget.loans());

		return frag;
	}

	/**
	 * @returns {HTMLParagraphElement}
	 */
	function intro() {
		return App.UI.DOM.makeElement("p", `Here you can view many of the financial details of your arcology, ${properTitle()}. Proper cash flow is critical to the success of your long term goals. Find expensive waste here and you can change the right policies or sell off slackers. Find your next profit center and invest in new equipment, advertising, or flesh to maximize your assets.`, ["scene-intro"]);
	}

	/**
	 * @returns {DocumentFragment}
	 */
	function netWorth() {
		const frag = new DocumentFragment();

		frag.append(
			App.UI.DOM.makeElement("h2", `Net worth`),
			`You have a total net worth of ${cashFormat(Math.trunc(App.Utils.totalNetWorth()))}.`
		);

		if (V.debugMode) {
			App.UI.DOM.appendNewElement("div", frag, App.UI.DOM.link(`Recalculate net worth`, () => {
				App.UI.reload();
			}), ['indent']);
		}

		return frag;
	}

	/**
	 * @returns {DocumentFragment}
	 */
	function economy() {
		const frag = new DocumentFragment();

		App.UI.DOM.appendNewElement("h2", frag, `Economy`);

		const p = document.createElement("p");

		App.UI.DOM.appendNewElement("div", p, `The Local Economy score effects some prices in your ecology. The lower the score, the higher the prices. The base score is 100.`, ["detail"]);

		const grid = document.createElement("div");
		grid.className = "grid-2columns-auto";

		App.UI.DOM.appendNewElement("div", grid, "Global Economy", ["cash"]);
		if (V.cheatMode && V.cheatModeM) {
			const div = document.createElement("div");
			div.append(App.UI.DOM.makeTextBox(V.economy, v => {
				V.economy = v;
				V.cheater = 1;
			}, true));
			grid.append(div);
		} else {
			App.UI.DOM.appendNewElement("div", grid, String(V.economy));
		}

		App.UI.DOM.appendNewElement("div", grid, "Local Economy", ["cash"]);
		if (V.cheatMode && V.cheatModeM) {
			const div = document.createElement("div");
			div.append(App.UI.DOM.makeTextBox(V.localEcon, v => {
				V.localEcon = v;
				V.cheater = 1;
			}, true));
			grid.append(div);
		} else {
			App.UI.DOM.appendNewElement("div", grid, String(V.localEcon));
		}

		p.append(grid);

		const r = [];
		r.push("The current score is");
		if (V.localEcon > 100) {
			let econPercent = Math.trunc(1000 - 100000 / V.localEcon) / 10;
			r.push(`reducing prices by <span class="cash inc">${econPercent}%.</span>`);
		} else if (V.localEcon === 100) {
			r.push("equal to the base score. There are no price modifications.");
		} else {
			let econPercent = Math.trunc(100000 / V.localEcon - 1000) / 10;
			r.push(`increasing prices by <span class="cash dec">${econPercent}%.</span>`);
		}
		$(p).append(...App.Events.spaceSentences(r));

		frag.append(p);

		return frag;
	}

	/**
	 * @returns {HTMLParagraphElement}
	 */
	function settings() {
		const p = document.createElement("p");
		App.UI.DOM.appendNewElement("h2", p, `Weekly costs`);

		let options = new App.UI.OptionsGroup();
		options.addOption("", "costsBudget", V.showAllEntries)
			.addValue("Normal", 0).on().addValue("Show Empty Entries", 1);
		p.append(options.render());

		return p;
	}

	/**
	 * @param {DocumentFragment} container
	 */
	function errors(container) {
		if (V.lastWeeksCashErrors.length > 0) {
			const p = document.createElement("p");
			p.append(App.UI.DOM.passageLink("Reset", "Costs Budget",
				() => { V.lastWeeksCashErrors = []; }));
			App.UI.DOM.appendNewElement("div", p, "Errors:", ["error"]);
			for (const error of V.lastWeeksCashErrors) {
				App.UI.DOM.appendNewElement("div", p, error, ["error"]);
			}
			container.append(p);
		}
	}
};
