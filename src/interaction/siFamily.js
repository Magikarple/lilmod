/**
 * @param {App.Entity.SlaveState} slave
 * @returns {HTMLParagraphElement}
 */
App.UI.SlaveInteract.family = function(slave) {
	const p = document.createElement("p");
	p.id = "family";
	p.append(renderFamilyTree(V.slaves, slave.ID));

	return p;
};
