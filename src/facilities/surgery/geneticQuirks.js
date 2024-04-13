/**
 * @typedef {object} App.UI.SlaveInteract.geneticQuirks.ReloadData
 * @property {Function} function the function to be called when a page reload is requested
 * @property {any[]|undefined} variables a list of variables to pass to the function or undefined to pass nothing
 */

/**
 * @param {App.Entity.SlaveState|FC.FetusGenetics} slave
 * @param {boolean} allInactive If false then we only show the active genetic quirks
 * @param {function(keyof FC.GeneticQuirks):boolean} [filter]
 * @param {boolean} [changePhysicalTraitsToMatch=false] If true then we change the slaves physical traits to match what you would expect from their genetics.
 * @param {App.UI.SlaveInteract.geneticQuirks.ReloadData} reloadData used to supply an alterative to reloading the page
 * @returns {DocumentFragment}
 */
App.UI.SlaveInteract.geneticQuirks = function(
	slave,
	allInactive,
	filter,
	changePhysicalTraitsToMatch = false,
	reloadData = {
		function: undefined,
		variables: undefined,
	}
) {
	const el = new DocumentFragment();
	const options = new App.UI.OptionsGroup();
	if (reloadData.function !== undefined) {
		options.customRefresh(() => {
			if (reloadData.variables === undefined) {
				reloadData.function();
			} else {
				reloadData.function(...reloadData.variables);
			}
		});
	}
	for (const [key, obj] of App.Data.geneticQuirks) {
		if (obj.hasOwnProperty("requirements") && !obj.requirements) {
			continue;
		}
		if (filter && !filter(key)) {
			continue;
		}
		const option = options.addOption(capFirstChar(obj.title), key, slave.geneticQuirks)
			.addComment(capFirstChar(obj.description))
			.addValue("off", 0).off()
			.addValue("carrier", 1);
		if (key === "heterochromia") {
			option.pulldown();
			for (const color of App.Medicine.Modification.eyeColor.map(color => color.value)) {
				option.addValue(capFirstChar(color), color);
			}
			if (!changePhysicalTraitsToMatch) {
				// @ts-ignore
				option.addGlobalCallback(() => resetEyeColor(slave));
			}
			option.comment += `. The color specified here is the natural color of the left eye.`;
		} else {
			if (allInactive) {
				option.addValue("active", obj.pubertyActivated ? 3 : 2).on();
			} else {
				option.addValue("active", 2).on();
				if (obj.pubertyActivated) {
					option.addValue("inactive", 3);
					option.comment += `. "inactive" is for dominant genes that are not yet taking effect (age, hormones, etc)`;
				}
			}
			if (key === "albinism" && "albinismOverride" in slave) {
				option.addGlobalCallback((val) => induceAlbinism(slave, val));
			}
		}
	}
	el.append(options.render());
	return el;
};
