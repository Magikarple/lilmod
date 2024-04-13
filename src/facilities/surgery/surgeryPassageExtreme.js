/**
 * UI for performing surgery. Refreshes without refreshing the passage.
 * @param {App.Entity.SlaveState} slave
 * @param {()=>void} refresh
 * @param {boolean} [cheat=false]
 * @returns {HTMLElement}
 */
App.UI.surgeryPassageExtreme = function(slave, refresh, cheat = false) {
	const container = document.createElement("span");
	container.append(content());
	return container;

	function content() {
		const frag = new DocumentFragment();
		const {
			His, He,
			his, he
		} = getPronouns(slave);

		if (V.seeExtreme === 1) {
			frag.append(fuckdoll(), chemLobotomy());
		}

		return frag;

		function fuckdoll() {
			const el = new DocumentFragment();
			const r = [];
			const linkArray = [];
			if (slave.fuckdoll === 0) {
				r.push(`${He} is a normal sex slave, not a living sex toy.`);
				if (slave.indentureRestrictions < 1 && (slave.breedingMark !== 1 || V.propOutcome === 0 || V.eugenicsFullControl === 1 || !FutureSocieties.isActive('FSRestart'))) {
					linkArray.push(App.Medicine.Surgery.makeLink(
						new App.Medicine.Surgery.Procedures.Fuckdoll(slave),
						refresh, cheat));
				}
			} else {
				r.push(`${He} is encased in a Fuckdoll suit.`);
				linkArray.push(App.Medicine.Surgery.makeLink(
					new App.Medicine.Surgery.Procedures.FuckdollExtraction(slave),
					refresh, cheat));
			}
			App.Events.addNode(el, r, "div");
			App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray), "choices");
			return el;
		}

		function chemLobotomy() {
			const el = new DocumentFragment();
			const r = [];
			const linkArray = [];
			if (slave.fetish !== Fetish.MINDBROKEN) {
				r.push(`${He} is mentally competent.`);
			} else if (slave.fetish === Fetish.MINDBROKEN) {
				r.push(`${His} mind is gone; ${he} has either been chemically lobotomized, or has lost ${his} mind due to extreme abuse.`);
			}
			if (slave.indentureRestrictions < 1 && (slave.breedingMark !== 1 || V.propOutcome === 0 || V.eugenicsFullControl === 1 || !FutureSocieties.isActive('FSRestart'))) {
				if (slave.fetish !== Fetish.MINDBROKEN) {
					linkArray.push(App.Medicine.Surgery.makeLink(
						new App.Medicine.Surgery.Procedures.Mindbreak(slave),
						refresh, cheat));
				}
			}
			App.Events.addNode(el, r, "div");
			App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray), "choices");
			return el;
		}
	}
};
