/** Replaces <<SetFacilityDecoration>> widget
 * @returns {DocumentFragment}
 */
App.UI.facilityRedecoration = function() {
	const el = new DocumentFragment();
	const options = new App.UI.OptionsGroup();
	const arc = V.arcologies[0];

	FutureSocieties.DecorationCleanup();

	const applicableFS = FutureSocieties.activeFSes(arc).filter(name => (arc[name] > 20));
	const decorationNames = Array.from(applicableFS, FS => FutureSocieties.decorationName(FS)).filter(Boolean);

	const activeFacilities = Object.values(App.Entity.facilities).filter(f => f.isDecorated && f.established);

	// dummy variable to make sure the first option is selected by default
	const currentSelected = {value: "none"};
	let option = options.addOption(`Set decoration value for all facilities to`, "value", currentSelected)
		.addValue("(Select option)", "none")
		.addValue("Standard", "standard");
	if (decorationNames.length > 0) {
		option.addValueList(decorationNames);
		if (decorationNames.length > 1) {
			option.addValue("Distribute Evenly", "even");
		}
	}
	option.addGlobalCallback(value => {
		console.log(value);
		let totalCost = 0;
		if (value === "even") { // Cycles through the list of available FS decorations, and distributes them to facilities round robin style.
			let i = 0;
			for (const facility of activeFacilities) {
				if (facility.decoration !== decorationNames[i]) {
					totalCost += 5000;
					facility.decoration = decorationNames[i];
				}
				i++;
				if (i >= decorationNames.length) {
					i = 0;
				}
			}
		} else if (value !== "none") {
			for (const facility of activeFacilities) {
				if (value !== "standard" && value !== facility.decoration) {
					totalCost += 5000;
				}
				facility.decoration = value;
			}
		}
		if (totalCost > 0) {
			cashX(-totalCost, "capEx");
		}
	}).pulldown();

	for (const facility of activeFacilities) {
		options.addOption(`The decoration style of ${facility.name} is`, "decoration", facility)
			.addValue("Standard", "standard")
			.addValueList(decorationNames)
			.addGlobalCallback(value => {
				if (value !== "standard") {
					cashX(-5000, "capEx");
				}
			})
			.pulldown();
	}
	el.append(options.render());

	return el;
};

/**
 *
 * @param {FC.FutureSociety} FS
 * @param {Array} [items]
 * @returns {HTMLElement}
 */
App.UI.FSChangeDecoration = function(FS, items = []) {
	const el = document.createElement("div");
	el.classList.add("indent");
	const FSDecoration = FS + "Decoration";
	let costs;
	switch (V.arcologies[0][FSDecoration]) {
		case 20:
			costs = 2500;
			el.append(`${V.arcologies[0].name} is not customized to support this goal. `);
			if (V.arcologies[0][FS] >= 10) {
				el.append(
					makePurchase(`Modify your arcology's internal media to support this goal`, costs, "capEx", {
						handler: () => {
							V.arcologies[0][FSDecoration] = 40;
						},
					}),
				);
			} else {
				el.append(`You must advance this goal before customization to support it becomes available. `);
			}
			break;
		case 40:
			el.append(`${V.arcologies[0].name}'s media is supporting this goal. `);
			if (V.arcologies[0][FS] >= 30) {
				costs = 10000;
				el.append(
					makePurchase(`Redecorate your arcology's public spaces to support this goal`, costs, "capEx", {
						handler: () => {
							V.arcologies[0][FSDecoration] = 60;
						}
					}),
				);
			} else {
				el.append(`You must advance this goal before further customization to support it becomes available. `);
			}
			break;
		case 60:
			el.append(`${V.arcologies[0].name}'s media is supporting this goal, and ${V.arcologies[0].name}'s public spaces are decorated to support it too. `);
			if (V.arcologies[0][FS] >= 50) {
				costs = 10000;
				el.append(
					makePurchase(`Station slaves in your arcology's public spaces to promote this goal`, costs, "capEx", {
						handler: () => {
							V.arcologies[0][FSDecoration] = 80;
						}
					}),
				);
			} else {
				el.append(`You must advance this goal before further customization to support it becomes available. `);
			}
			break;
		case 80:
			el.append(`${V.arcologies[0].name}'s media is supporting this goal; ${V.arcologies[0].name}'s public spaces are decorated to support it, and have slaves stationed in them to support it too. `);
			if (V.arcologies[0][FS] >= 70) {
				if (FS === "FSRestart") {
					costs = 75000;
					el.append(
						makePurchase(`Customize the exterior of the arcology to support this goal and fully establish the Societal Elite`, costs, "capEx", {
							handler: () => {
								V.arcologies[0][FSDecoration] = 100;
								V.upgradeMultiplierArcology = upgradeMultiplier('engineering');
								V.upgradeMultiplierMedicine = upgradeMultiplier('medicine');
								for (const item of items) {
									_.set(V, item, 1);
								}
							}
						}),
					);
				} else {
					costs = 10000;
					el.append(
						makePurchase(`Customize the exterior of the arcology to support this goal`, costs, "capEx", {
							handler: () => {
								V.arcologies[0][FSDecoration] = 100;
								for (const item of items) {
									_.set(V, item, 1);
								}
							}
						}),
					);
				}
			} else {
				el.append(`You must advance this goal before further customization to support it becomes available. `);
			}
			break;
		case 100:
			el.append(`${V.arcologies[0].name}'s media is supporting this goal; ${V.arcologies[0].name}'s public spaces are decorated to support it, and have slaves stationed in them to support it. The exterior of the arcology has been remodeled to support it as well; the arcology is fully customized for this goal. `);
	}
	return el;
};
