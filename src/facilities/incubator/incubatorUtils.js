/**
 * Sends a child to the Incubator if it has room
 * @param {App.Entity.SlaveState} child
 */
App.Facilities.Incubator.newChild = function(child, settingsOverride = null) {
	let fullAdapt;
	const setting = settingsOverride !== null ? settingsOverride : (child.genes === "XX" ? V.incubator.femaleSetting : V.incubator.maleSetting);

	if (setting.pregAdaptationPower === 1) {
		fullAdapt = 45000 / 2000;	// 22.5
	} else if (setting.pregAdaptationPower === 2) {
		fullAdapt = 100000 / 2000;	// 50
	} else if (setting.pregAdaptationPower === 3) {
		fullAdapt = 150000 / 2000;	// 75
	} else {
		fullAdapt = 15000 / 2000;	// 7.5
	}

	V.incubator.tanks.push(child);
	child.incubatorSettings = {
		imprint: setting.imprint,
		weight: setting.weight,
		muscles: setting.muscles,
		growthStims: setting.growthStims,
		reproduction: setting.reproduction,
		growTime: Math.trunc(setting.targetAge * 52),
		pregAdaptation: setting.pregAdaptation,
		pregAdaptationPower: setting.pregAdaptationPower,
		pregAdaptationInWeek: Math.max(((fullAdapt - child.pregAdaptation) / Math.trunc(setting.targetAge * 52)), 0)
	};
};

App.Facilities.Incubator.init = function(state) {
	if (state === 'base') {
		return V.incubator = {capacity: 0, tanks: []};
	}

	V.incubator = {
		capacity: 1,
		tanks: [],
		bulkRelease: 0,
		name: "the Incubator",
		organs: [],
		readySlaves: 0,
		upgrade: {
			speed: 5,
			weight: 0,
			muscles: 0,
			growthStims: 0,
			reproduction: 0,
			organs: 0,
			pregAdaptation: 0,
		},
		maleSetting: {
			imprint: "trust",
			targetAge: V.minimumSlaveAge,
			weight: 0,
			muscles: 0,
			growthStims: 0,
			reproduction: 0,
			pregAdaptation: 0,
			pregAdaptationPower: 0,
		},
		femaleSetting: {
			imprint: "trust",
			targetAge: V.minimumSlaveAge,
			weight: 0,
			muscles: 0,
			growthStims: 0,
			reproduction: 0,
			pregAdaptation: 0,
			pregAdaptationPower: 0,
		},
	};
};
