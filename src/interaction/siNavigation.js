/**
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.UI.SlaveInteract.navigation = function(slave) {
	const f = new DocumentFragment();

	if (V.cheatMode) {
		App.UI.DOM.appendNewElement("div", f,
			App.UI.DOM.passageLink("Cheat Edit Slave", "Cheat Edit JS", () => {
				V.cheater = 1;
				delete V.tempSlave;
			}),
			"cheat-menu"
		);
	}

	const p = document.createElement("p");
	p.classList.add("center");

	const placeInLine = App.UI.SlaveInteract.placeInLine(slave);
	const div = App.UI.DOM.appendNewElement("div", p, null);
	const previous = App.UI.DOM.makeElement("span", null, ['margin-right']);
	const next = App.UI.DOM.makeElement("span", null, ['margin-left']);
	const name = App.UI.DOM.makeElement("span", slave.slaveName, ['slave-name', "si-header"]);

	previous.id = "prev-slave";
	next.id = "next-slave";

	previous.append(
		App.UI.DOM.makeElement("span", App.UI.Hotkeys.hotkeys("prev-slave"), ['hotkey']),
		" ",
		App.UI.DOM.makeElement("span", App.UI.DOM.passageLink("Prev", "Slave Interact", () => {
			V.AS = placeInLine[0];
		}), ["adjacent-slave"]),
	);
	next.append(
		App.UI.DOM.makeElement("span", App.UI.DOM.passageLink("Next", "Slave Interact", () => {
			V.AS = placeInLine[1];
		}), ["adjacent-slave"]),
		" ",
		App.UI.DOM.makeElement("span", App.UI.Hotkeys.hotkeys("next-slave"), ['hotkey']),
	);

	function content() {
		const frag = new DocumentFragment();

		frag.append(
			previous,
			name,
			' ',
			App.UI.DOM.makeElement("span", App.UI.favoriteToggle(slave, () => {
				App.UI.DOM.replace(div, content());
			}), ['si-header']),
			next,
		);

		return frag;
	}

	div.append(content());

	f.append(p);

	return f;
};
