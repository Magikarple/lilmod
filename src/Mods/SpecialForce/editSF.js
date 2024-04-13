App.UI.editSF = function() {
	const node = new DocumentFragment();

	for (let i in V.SF.Squad) {
		const v = String([i]);
		if (V.SF.Squad[i] > App.Mods.SF.upgrades.currentUnitMax(v)) {
			V.SF.Squad[i] = App.Mods.SF.upgrades.currentUnitMax(v);
		}
	}

	const max = App.Mods.SF.upgrades.max();
	const T1 = App.Mods.SF.unlocked.secondTier();
	const size = App.Mods.SF.upgrades.total();

	let options = new App.UI.OptionsGroup();

	App.UI.DOM.appendNewElement("h2", node, `Upgrades: ${size}/${max} (${(100 * size / max).toFixed(2)}%)`);

	options.addOption(`Firebase`, "Firebase", V.SF.Squad).showTextBox()
		.addComment(`current max ${App.Mods.SF.upgrades.currentUnitMax('Firebase')}`);
	options.addOption(`Armoury`, "Armoury", V.SF.Squad).showTextBox()
		.addComment(`current max ${App.Mods.SF.upgrades.currentUnitMax('Armoury')}`);
	options.addOption(`Drugs`, "Drugs", V.SF.Squad).showTextBox()
		.addComment(`current max ${App.Mods.SF.upgrades.currentUnitMax('Drugs')}`);

	if (V.SF.Squad.Firebase >= 2) {
		options.addOption(`Drones`, "Drones", V.SF.Squad).showTextBox()
			.addComment(`current max ${App.Mods.SF.upgrades.currentUnitMax('Drones')}`);
	}

	if (App.Mods.SF.unlocked.garage()) {
		options.addCustom(App.UI.DOM.makeElement("h2", `Garage`));
		options.addOption(`Attack Vehicles`, "AV", V.SF.Squad).showTextBox()
			.addComment(`current max ${App.Mods.SF.upgrades.currentUnitMax('AV')}`);
		options.addOption(`Transport Vehicles`, "TV", V.SF.Squad).showTextBox()
			.addComment(`current max ${App.Mods.SF.upgrades.currentUnitMax('TV')}`);
		if (T1) {
			options.addOption(`Prototype Goliath Tank`, "PGT", V.SF.Squad).showTextBox()
				.addComment(`current max ${App.Mods.SF.upgrades.currentUnitMax('PGT')}`);
		}
	}

	if (App.Mods.SF.unlocked.hangar()) {
		options.addCustom(App.UI.DOM.makeElement("h2", `Hangar`));
		options.addOption(`Attack Planes`, "AA", V.SF.Squad).showTextBox()
			.addComment(`current max ${App.Mods.SF.upgrades.currentUnitMax('AA')}`);
		options.addOption(`Transport Planes`, "TA", V.SF.Squad).showTextBox()
			.addComment(`current max ${App.Mods.SF.upgrades.currentUnitMax('TA')}`);
		if (T1) {
			options.addOption(`Spaceplane`, "SpacePlane", V.SF.Squad).showTextBox()
				.addComment(`current max ${App.Mods.SF.upgrades.currentUnitMax('SpacePlane')}`);
			options.addOption(`Gunship`, "GunS", V.SF.Squad).showTextBox()
				.addComment(`current max ${App.Mods.SF.upgrades.currentUnitMax('GunS')}`);
		}
	}

	if (App.Mods.SF.unlocked.launchBay()) {
		options.addCustom(App.UI.DOM.makeElement("h2", `Launch Bay`));
		options.addOption(`Satellite`, "Satellite", V.SF.Squad).showTextBox()
			.addComment(`current max ${App.Mods.SF.upgrades.currentUnitMax('Satellite')}`);
		if (V.terrain !== "oceanic") {
			options.addOption(`Giant Robot`, "GiantRobot", V.SF.Squad).showTextBox()
				.addComment(`current max ${App.Mods.SF.upgrades.currentUnitMax('GiantRobot')}`);
			options.addOption(`Cruise Missile`, "MissileSilo", V.SF.Squad).showTextBox()
				.addComment(`current max ${App.Mods.SF.upgrades.currentUnitMax('MissileSilo')}`);
		}
	}

	if (App.Mods.SF.unlocked.navalYard()) {
		options.addCustom(App.UI.DOM.makeElement("h2", `Naval Yard`));
		options.addOption(`Aircraft Carrier`, "AircraftCarrier", V.SF.Squad).showTextBox()
			.addComment(`current max ${App.Mods.SF.upgrades.currentUnitMax('AircraftCarrier')}`);
		options.addOption(`Submarine`, "Sub", V.SF.Squad).showTextBox()
			.addComment(`current max ${App.Mods.SF.upgrades.currentUnitMax('Sub')}`);
		options.addOption(`Amphibious Transport`, "HAT", V.SF.Squad).showTextBox()
			.addComment(`current max ${App.Mods.SF.upgrades.currentUnitMax('HAT')}`);
	}

	node.append(options.render());

	if (V.SF.FS.Tension !== -1) {
		App.Events.addParagraph(node, [
			`The Colonel's current Tension:`,
			App.UI.DOM.makeTextBox(V.SF.FS.Tension, (v) => {
				V.SF.FS.Tension = v;
				App.UI.reload();
			}, true)
		]);
	}

	return node;
};
