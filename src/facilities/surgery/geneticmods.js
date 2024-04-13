/**
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.UI.SlaveInteract.geneticMods = function(slave) {
	const el = new DocumentFragment();
	const options = new App.UI.OptionsGroup();
	for (const [key, obj] of App.Data.geneticMods) {
		if (obj.hasOwnProperty("requirements") && !obj.requirements) {
			continue;
		}
		options.addOption(capFirstChar(obj.title), key, slave.geneMods)
			.addComment(capFirstChar(obj.description))
			.addValue("off", 0).off()
			.addValue("on", 1).on();
	}
	el.append(options.render());
	return el;
};
