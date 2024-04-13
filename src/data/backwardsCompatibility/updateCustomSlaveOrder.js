/** Update custom slave orders (customSlave/huskSlave).
 * @param {App.Entity.CustomSlaveOrder} customSlaveOrder
 */
App.Update.CustomSlaveOrder = function(customSlaveOrder) {
	if (!customSlaveOrder.hasOwnProperty("leg")) {
		if (jsDef(customSlaveOrder.amp) && customSlaveOrder.amp === 1) {
			customSlaveOrder.leg = {left: null, right: null};
		} else {
			customSlaveOrder.leg = {left: new App.Entity.LegState(), right: new App.Entity.LegState()};
		}
	}

	if (!customSlaveOrder.hasOwnProperty("arm")) {
		if (jsDef(customSlaveOrder.amp) && customSlaveOrder.amp === 1) {
			customSlaveOrder.arm = {left: null, right: null};
		} else {
			customSlaveOrder.arm = {left: new App.Entity.LegState(), right: new App.Entity.LegState()};
		}
	}

	App.Update.deleteProperties(customSlaveOrder, ["amp"]);

	App.Update.setNonexistentProperties(customSlaveOrder, {
		skill: {whore: 15, combat: 0},
		hairColor: "hair color is unimportant",
		eyesColor: "eye color is unimportant"

	});

	App.Update.moveProperties(customSlaveOrder.skill, customSlaveOrder, {
		whore: "whoreSkills",
		combat: "combatSkills"
	});

	if (V.releaseID < 1059) {
		customSlaveOrder.eye = new App.Entity.EyeState();
		App.Update.deleteProperties(customSlaveOrder, ["eyes"]);
	}
};
