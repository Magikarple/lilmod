App.Interact.BaseChoosePartnerRenderer = class {
	/** Set up selection of a second slave for an interaction (i.e. Slave/Slave or threesome with PC)
	 * @param {App.Entity.SlaveState} slave
	 */
	constructor(slave) {
		this.slave = slave;
		this.intro = "";
		this.instructions = "Select an eligible slave";
		this.noneEligible = "You have no slaves capable of this act.";
		this.execute = (/** @type {App.Entity.SlaveState} */ slave, /** @type {App.Entity.SlaveState} */ partner) => new DocumentFragment();
	}

	/** Determines whether a particular candidate is eligible to join slave for this interaction
	 * @param {App.Entity.SlaveState} candidate
	 * @returns {boolean}
	 */
	eligible(candidate) {
		return true;
	}

	/** Details to render for a particular candidate entry, which will be relevant for the player's decision
	 * @param {App.Entity.SlaveState} candidate
	 * @param {ParentNode} container
	 */
	renderDetail(candidate, container) {
	}
};

/** Allows the player to choose a second slave to participate in a slave interaction.
 * @param {App.Interact.BaseChoosePartnerRenderer} renderer
 * @param {string} target
 * @param {function(void):void} [refresh]
 */
App.Interact.choosePartner = function(renderer, target, refresh) {
	Dialog.setup(renderer.instructions);
	Dialog.open();
	Dialog.append(renderChoices());

	function renderChoices() {
		const node = new DocumentFragment();
		App.UI.DOM.appendNewElement("div", node, renderer.intro);
		const slave = renderer.slave;

		const eligibles = V.slaves.filter((s) => (s.ID !== slave.ID) && renderer.eligible(s));
		for (const eligible of eligibles) {
			const div = App.UI.DOM.appendNewElement("div", node);
			div.append(App.UI.DOM.link(
				SlaveFullName(eligible),
				() => {
					Dialog.close();
					// first, run the renderer and let any effects take place on the slave
					const contents = renderer.execute(slave, eligible);
					// refresh the host passage if necessary, to pick up changes to slave
					if (refresh) {
						refresh();
					}
					// then replace the target with the scene's output
					document.getElementById(target).replaceChildren(contents);
				}
			));
			if (eligible.custom.label) {
				App.UI.DOM.appendNewElement("span", div, ` ${eligible.custom.label}`, ["custom-label"]);
			}
			if (totalRelatives(slave) > 0) {
				const relTerm = relativeTerm(slave, eligible);
				if (relTerm !== null) {
					App.UI.DOM.appendNewElement("span", div, ` ${capFirstChar(relTerm)}`, ["relationship"]);
				}
			}
			renderer.renderDetail(eligible, div);
		}

		if (eligibles.length === 0) {
			App.UI.DOM.appendNewElement("div", node, renderer.noneEligible, ["note"]);
		}

		return node;
	}
};
