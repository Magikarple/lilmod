/**
 * Creates a user-facing link or button allowing the user to purchase something.
 * @param {string} text The text to display.
 * @param {number} cost The amount of ¤ the purchase costs.
 * @param {keyof App.Data.Records.LastWeeksCash} what What the purchase is for.
 * @param {object} [args] Any additional arguments to pass.
 * @param {string[]} [args.notes] Any additional information to display. Must be lowercase and end in no punctuation.
 * @param {function():void} args.handler Any custom handler to run upon purchase.
 * @param {[boolean, string][]} [args.prereqs] Any prerequisites that must be met for the purchase to be available, with a note for when the prerequisites are not met.
 * @param {function():void} [args.refresh] Any function to run that updates the screen, if not the default `App.UI.reload()`.
 */
globalThis.makePurchase = function(text, cost, what, {notes, handler, prereqs, refresh}) {
	return App.UI.DOM.makeElement("div", V.purchaseStyle === 'button' ? renderButton() : renderLink());

	function execute() {
		cashX(forceNeg(cost), what);

		if (handler) {
			handler();
		}

		if (!refresh) {
			App.UI.reload();
		} else {
			refresh();
		}
	}

	function renderButton() {
		const span = App.UI.DOM.makeElement("span", null, ['note']);
		const price = cost !== 0 ? `${cashFormat(Math.trunc(cost))}` : `free`;
		const button = App.UI.DOM.makeElement("button", capFirstChar(price), ['purchase-button']);

		const disabledReasons = isDisabled();

		if (disabledReasons.length === 0) {
			button.onclick = execute;

			if (notes) {
				const span = document.createElement("span");
				const ul = document.createElement("ul");

				if (notes.length > 1) {
					ul.append(...notes.map(note => {
						const li = document.createElement("li");
						li.append(capFirstChar(note));

						return li;
					}));

					span.append(ul);
				} else {
					span.append(capFirstChar(notes[0]));
				}

				tippy(button, {
					content: span,
				});
			}
		} else {
			const span = document.createElement("span");
			const ul = document.createElement("ul");

			if (disabledReasons.length > 1) {
				for (const li of disabledReasons.map(reason => {
					const li = document.createElement("li");
					li.append(reason);
					return li;
				})) {
					ul.append(li);
				}

				span.append(ul);
			} else {
				span.append(disabledReasons[0]);
			}

			button.classList.add("disabled");

			tippy(button, {
				content: span,
			});
		}

		span.append(
			button,
			text,
		);

		return span;
	}

	function renderLink() {
		const span = App.UI.DOM.makeElement("span", null, ['indent']);
		const price = [`${cost !== 0 ? `Costs ${cashFormatColor(Math.trunc(cost), V.cash < cost)}` : `Free`}`];

		if (notes) {
			price.push(...notes);
		}

		const disabledReasons = isDisabled();

		if (disabledReasons.length === 0) {
			span.append(App.UI.DOM.link(text, execute), " ");
		} else {
			span.append(App.UI.DOM.disabledLink(text, disabledReasons), " ");
		}

		App.Events.addNode(span, [toSentence(price)], "span", ["note"]);

		return span;
	}

	function isDisabled() {
		const disabledReasons = [];
		if (V.cash < cost) {
			disabledReasons.push(`You cannot afford this purchase`);
		}
		if (prereqs) {
			prereqs.forEach(prereq => {
				if (prereq[0] !== true) {
					disabledReasons.push(prereq[1]);
				}
			});
		}
		return disabledReasons;
	}
};
