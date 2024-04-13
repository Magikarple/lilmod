/**
 * Gives all pit fights
 * @returns {Array<App.Facilities.Pit.Fights.BaseFight>}
 */
App.Facilities.Pit.getFights = function() {
	return [
		// new App.Facilities.Pit.Fights.TestFight(),
		new App.Facilities.Pit.Fights.NlR1v1(),
		new App.Facilities.Pit.Fights.NlBg1v1(),
		new App.Facilities.Pit.Fights.LR1v1(),
		new App.Facilities.Pit.Fights.LBg1v1(),
		new App.Facilities.Pit.Fights.LSchBg1v1(),
		new App.Facilities.Pit.Fights.LSch1v1(),
		new App.Facilities.Pit.Fights.NlSch1v1(),
	];
};
/**
 * Gives all pit fights as a map
 * @returns {Map<string, App.Facilities.Pit.Fights.BaseFight>}
 */
App.Facilities.Pit.getFightsMap = function() {
	const m = new Map();
	for (const f of App.Facilities.Pit.getFights()) {
		m.set(f.key, f);
	}
	return m;
};
