App.Facilities.Pit.workaround = function() {
	const f = new DocumentFragment();

	// Warning:
	// In this passage the V.pit.slavesFighting array is constructed. This means that during this passage the length of
	// the array cannot be assumed to be 2. Once leaving this passage it has to be ensured that V.pit.slavesFighting is
	// in a valid state first.
	if (V.pit.slavesFighting === null) {
		// @ts-ignore
		V.pit.slavesFighting = [];
	}

	App.Utils.PassageSwitchHandler.set(passageHandler);

	const slave1 = getSlave(V.pit.slavesFighting[0]);
	const slave2 = getSlave(V.pit.slavesFighting[1]);

	f.append(App.UI.DOM.makeElement("h1", `Slaves Fighting`));

	if (V.pit.slavesFighting.length > 1) {
		f.append(`${slave1.slaveName} is fighting ${slave2.slaveName} this week.`);
		const winRate = fightProbability(deadliness(slave1).value, deadliness(slave2).value);
		const cutoff = 10;
		if (winRate < cutoff) {
			f.append(App.UI.DOM.makeElement("div", `Bad Match! ${slave2.slaveName} will easily overpower ${slave1.slaveName}.`, ["warning"]));
		} else if (winRate > (100 - cutoff)) {
			f.append(App.UI.DOM.makeElement("div", `Bad Match! ${slave1.slaveName} will easily overpower ${slave2.slaveName}.`, ["warning"]));
		}
	} else {
		f.append(`Choose two slaves to fight.`);
	}

	f.append(App.UI.DOM.makeElement("h2", `Choose slaves`, ['margin-top']));

	const grid = document.createElement("div");
	grid.classList.add("grid-3columns-auto");

	grid.append(document.createElement("div"));
	App.UI.DOM.appendNewElement("div", grid, "Slave");
	App.UI.DOM.appendNewElement("div", grid, "Deadliness");

	for (const slave of V.slaves) {
		const div = document.createElement("div");
		if (V.pit.slavesFighting.includes(slave.ID)) {
			div.append("Assign");
		} else {
			div.append(App.UI.DOM.link("Assign", () => {
				if (V.pit.slavesFighting.length > 1) {
					V.pit.slavesFighting.shift();
				}
				V.pit.slavesFighting.push(slave.ID);

				App.Utils.PassageSwitchHandler.clear();
				App.UI.reload();
			}));
		}
		grid.append(div);
		App.UI.DOM.appendNewElement("div", grid, App.UI.DOM.referenceSlaveWithPreview(slave, SlaveFullName(slave)));
		App.UI.DOM.appendNewElement("div", grid, DeadlinessTooltip(slave));
	}

	f.append(grid);

	function passageHandler() {
		if (V.pit.slavesFighting.length !== 2) {
			V.pit.slavesFighting = null;
		}
	}

	return f;
};
