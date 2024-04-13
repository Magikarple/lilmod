/**
 * checks V.slaves for consistency
 * @param {JQuery.PassageRenderingEvent} event
 */
App.Debug.slavesConsistency = function(event) {
	if (V.slaves !== undefined) { // no V.slaves at game start
		if (V.slaves.includes(null)) {
			const p = document.createElement("p");
			p.append(App.UI.DOM.makeElement("span", "ERROR: Main slaves array contains a null entry! Please report this. ", "error"),
				// we can't reload the passage as we could be on a passage that changes the game state.
				App.UI.DOM.link("Fix for next passage.", () => { V.slaves.delete(null); }));
			event.content.append(p);
		} else {
			// This part would break with a null entry.
			_(V.slaves).countBy(s => s.ID)
				.pickBy(count => count > 1)
				.keys()
				.map(id => Number(id))
				.value()
				.forEach(id => {
					event.content.append(App.UI.DOM.makeElement("p", `Duplicate slave ID ${id} at indices ${
						_(V.slaves)
							.map((s, idx) => ({
								ID: s.ID, idx: idx, name: s.slaveName, assignment: s.assignment
							}))
							.filter(s => s.ID === id)
							.map(s => `${s.idx}: ${s.name} (${s.assignment})`)
							.join(", ")
					}`, "error"));
				});
		}
	}
};
