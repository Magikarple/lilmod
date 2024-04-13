/**
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.Medicine.OrganFarm.growActions = function(slave) {
	const O = App.Medicine.OrganFarm.Organs;

	// find already being grown/ready to implant organs
	const slaveOrgans = {};
	O.forEach((organ, key) => slaveOrgans[key] = 0);
	V.completedOrgans.forEach(organ => {
		if (organ.ID === slave.ID) {
			slaveOrgans[organ.type] = -1;
		}
	});
	V.organs.forEach(organ => {
		if (organ.ID === slave.ID) {
			slaveOrgans[organ.type] = organ.weeksToCompletion;
		}
	});

	function weeksLeft(time) {
		if (V.organFarmUpgrade === 1) {
			return time;
		} else if (V.organFarmUpgrade === 2) {
			return Math.ceil(time / 2);
		} else {
			return Math.ceil(time / 4);
		}
	}

	// create entries for each organ
	const canImplant = [];
	const cantImplant = [];
	const growing = [];
	let any = false;
	O.forEach((organ, key) => {
		if (slaveOrgans[key] === 0) {
			if (organ.canGrow(slave)) {
				const array = [];
				array.push(App.UI.DOM.makeElement("div", App.UI.DOM.passageLink(organ.name, "Remote Surgery", () => {
					App.Medicine.OrganFarm.growOrgan(slave, key);
				})));

				const tooltip = typeof organ.tooltip === "string" ? organ.tooltip : organ.tooltip(slave);
				array.push(App.UI.DOM.makeElement("div", `Costs ${cashFormat(organ.cost)}${tooltip !== "" ? ` and ${tooltip}` : ""}.`, ["detail"]));

				if (organ.implantActions.some((o) => {
					return o.canImplant(slave);
				})) {
					canImplant.push(...array);
				} else {
					cantImplant.push(...array);
				}
			}
			any = true;
		} else if (slaveOrgans[key] > 0) {
			// in growth organs at the end of the list
			growing.push({
				time: slaveOrgans[key],
				organ: organ.name,
				text: `Ready for implantation in ${weeksLeft(slaveOrgans[key])} weeks.`
			});
			any = true;
		}
	});

	const fragment = new DocumentFragment();

	if (growing.length > 0) {
		App.UI.DOM.appendNewElement("h4", fragment, "Growing");
		const div = App.UI.DOM.appendNewElement("div", fragment);
		div.classList.add("grid-2columns-auto", "choices");
		// nearer to completion => higher up
		growing.sort((a, b) => a.time - b.time);
		for (let i = 0; i < growing.length; i++) {
			App.UI.DOM.appendNewElement("div", div, growing[i].organ);
			App.UI.DOM.appendNewElement("div", div, growing[i].text);
		}
	}
	if (canImplant.length > 0) {
		App.UI.DOM.appendNewElement("h4", fragment, "Can be implanted immediately");
		const div = App.UI.DOM.appendNewElement("div", fragment);
		div.classList.add("grid-2columns-auto", "choices");
		div.append(...canImplant);
	}
	if (cantImplant.length > 0) {
		App.UI.DOM.appendNewElement("h4", fragment, "Cannot be implanted immediately");
		const div = App.UI.DOM.appendNewElement("div", fragment);
		div.classList.add("grid-2columns-auto", "choices");
		div.append(...cantImplant);
	}

	if (any) {
		return fragment;
	} else {
		return null;
	}
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {string} organType
 */
App.Medicine.OrganFarm.growOrgan = function(slave, organType) {
	const organ = App.Medicine.OrganFarm.Organs.get(organType);

	V.organs.push({type: organType, weeksToCompletion: organ.time, ID: slave.ID});

	cashX(-organ.cost, "slaveSurgery", slave);
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {string} organType
 */
App.Medicine.OrganFarm.growIncubatorOrgan = function(slave, organType) {
	const organ = App.Medicine.OrganFarm.Organs.get(organType);

	V.incubator.organs.push({type: organType, weeksToCompletion: organ.time, ID: slave.ID});

	cashX(-organ.cost, "slaveSurgery", slave);
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {()=>void} refresh
 * @param {boolean} cheat
 * @returns {DocumentFragment}
 */
App.Medicine.OrganFarm.implantActions = function(slave, refresh, cheat) {
	let slaveOrgans = V.completedOrgans.filter(o => o.ID === slave.ID);
	if (slaveOrgans.length === 0) {
		return null;
	}

	const F = App.Medicine.OrganFarm;
	const grid = document.createElement("div");
	grid.classList.add("grid-2columns-auto");

	for (const organ of slaveOrgans) {
		App.UI.DOM.appendNewElement("div", grid, F.Organs.get(organ.type).name);

		let links = [];
		for (let i = 0; i < F.Organs.get(organ.type).implantActions.length; i++) {
			const action = F.Organs.get(organ.type).implantActions[i];
			if (action.canImplant(slave)) {
				const link = App.Medicine.Surgery.makeLink(
					App.Medicine.OrganFarm.instantiateProcedure(slave, action), refresh, cheat,
					(s) => App.Medicine.OrganFarm.implantAction(s, organ.type));
				links.push(link);
				if (!F.Organs.get(organ.type).displayMultipleActions) {
					break; // there can only be one implant action
				}
			} else {
				const error = action.implantError(slave);
				if (error !== "") {
					links.push(App.UI.DOM.spanWithTooltip(action.name, error));
				}
			}
		}

		// all links in a row
		const div = document.createElement("div");
		for (let i = 0; i < links.length; i++) {
			div.append(links[i], " | ");
		}

		// last error or implant action has "Discard" after them.
		div.append(App.UI.DOM.link("Discard", App.Medicine.OrganFarm.removeOrgan, [slave, organ.type], "Remote Surgery"));
		grid.append(div);
	}

	return App.UI.DOM.combineNodes(`The fabricator has completed ${slaveOrgans.length} organ(s):`, grid);
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {App.Medicine.OrganFarm.OrganImplantAction} action
 * @returns {App.Medicine.Surgery.Procedure}
 */
App.Medicine.OrganFarm.instantiateProcedure = function(slave, action) {
	return new action.surgeryProcedure(slave, ...action.surgeryProcedureParams);
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {string} organType
 */
App.Medicine.OrganFarm.implantAction = function(slave, organType) {
	App.Medicine.OrganFarm.removeOrgan(slave, organType);
	if (V.organFarmUpgrade >= 2) {
		slave.chem += 20;
	}
};

/**
 * @param {string} organType
 * @param {App.Medicine.Surgery.Procedure} procedure
 * @returns {(DocumentFragment|undefined)}
 */
App.Medicine.OrganFarm.implant = function(organType, procedure) {
	App.Medicine.OrganFarm.implantAction(procedure._slave, organType);

	const result = App.Medicine.Surgery.apply(procedure, false);
	if (result === null) {
		Engine.play("Surgery Death");
		return undefined;
	}

	const [diff, reaction] = result;

	const f = App.Medicine.Surgery.makeSlaveReaction(procedure.originalSlave, diff, reaction);

	App.Utils.Diff.applyDiff(procedure.originalSlave, diff);

	return f;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {string} type
 */
App.Medicine.OrganFarm.removeOrgan = function(slave, type) {
	let organIndex = V.completedOrgans.findIndex(o => (o.ID === slave.ID && o.type === type));

	if (organIndex !== -1) {
		V.completedOrgans.deleteAt(organIndex);
	}
};

/**
 * Organs the that can be implanted on the slave, sorted by dependencies first
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {string[]}
 */
App.Medicine.OrganFarm.getSortedOrgans = function(slave) {
	const F = App.Medicine.OrganFarm;
	/** @type {string[]} */
	const organs = [];
	const dependencies = [];
	V.completedOrgans.forEach(organ => {
		if (organ.ID === slave.ID) {
			organs.push(organ.type);
		}
	});
	organs.forEach(organKey => {
		F.Organs.get(organKey).dependencies.forEach(dependencyKey => {
			if (organs.includes(dependencyKey)) { /* inefficient, is there a better way? */
				dependencies.push([dependencyKey, organKey]);
			}
		});
	});
	try {
		return App.Utils.topologicalSort(organs, dependencies);
	} catch (e) { // closed loop
		console.log(e.message);
		return [];
	}
};

/**
 * Returns the full organ farm menu, hiding empty parts
 *
 * @param {App.Entity.SlaveState} slave
 * @param {()=>void} refresh
 * @param {boolean} cheat
 * @returns {DocumentFragment}
 */
App.Medicine.OrganFarm.fullMenu = function(slave, refresh, cheat) {
	const fragment = document.createDocumentFragment();
	if (!(V.organFarmUpgrade >= 1 && slave.indentureRestrictions < 2)) {
		return fragment;
	}

	const growActions = App.Medicine.OrganFarm.growActions(slave);
	let anyAction = false;
	if (growActions != null) {
		const {him} = getPronouns(slave);
		App.UI.DOM.appendNewElement("h3", fragment, "Grow new organs");
		App.UI.DOM.appendNewElement("div", fragment, `The fabricator is ready to grow an organ for ${him}. Extract tissue to begin growing.`);
		App.UI.DOM.appendNewElement("div", fragment, growActions);
		anyAction = true;
	}

	const implantActions = App.Medicine.OrganFarm.implantActions(slave, refresh, cheat);
	if (implantActions !== null) {
		App.UI.DOM.appendNewElement("h3", fragment, "Implant Organs");
		App.UI.DOM.appendNewElement("div", fragment, implantActions, "indent");
		anyAction = true;
	}

	if (!anyAction) {
		return fragment;
	}

	fragment.prepend(App.UI.DOM.makeElement("h2", "Organ Farm"));
	return fragment;
};

/**
 * Returns a list of currently growing and finished organs.
 *
 * @returns {DocumentFragment}
 */
App.Medicine.OrganFarm.currentlyGrowing = function() {
	function weeksToCompletion(weeks) {
		if (V.organFarmUpgrade === 1) {
			return weeks;
		} else if (V.organFarmUpgrade === 2) {
			return Math.ceil(weeks / 2);
		} else {
			return Math.ceil(weeks / 4);
		}
	}

	/**
	 * @type {Array<string|HTMLSpanElement>}
	 */
	let growLines = [];
	/**
	 * @type {Array<string|HTMLSpanElement>}
	 */
	let finishLines = [];

	V.organs.forEach(o => {
		const slave = getSlave(o.ID);
		if (slave !== undefined) {
			const weeks = weeksToCompletion(o.weeksToCompletion);
			growLines.push(`${slave.slaveName}'s ${App.Medicine.OrganFarm.Organs.get(o.type).name}, ${weeks} ${weeks > 1 ? "weeks" : "week"} left.`);
		} else {
			growLines.push(App.UI.DOM.makeElement("span", `ERROR: No slave with ID ${o.ID} found.`, "error"));
		}
	});
	if (V.incubator.capacity > 0) {
		V.incubator.organs.forEach(o => {
			const tank = V.incubator.tanks.find((t) => t.ID === o.ID);
			if (tank !== undefined) {
				if (o.weeksToCompletion <= 0) {
					finishLines.push(`${tank.slaveName}'s ${App.Medicine.OrganFarm.Organs.get(o.type).name}.`);
				} else {
					growLines.push(`${tank.slaveName}'s ${App.Medicine.OrganFarm.Organs.get(o.type).name}, ${
						weeksToCompletion(o.weeksToCompletion)} week(s) left.`);
				}
			} else {
				growLines.push(App.UI.DOM.makeElement("span", `ERROR: No tank with ID ${o.ID} found.`, "error"));
			}
		});
	}

	V.completedOrgans.forEach(o => {
		const slave = getSlave(o.ID);
		if (slave !== undefined) {
			finishLines.push(`${slave.slaveName}'s ${App.Medicine.OrganFarm.Organs.get(o.type).name}.`);
		} else {
			growLines.push(App.UI.DOM.makeElement("span", `ERROR: No slave with ID ${o.ID} found.`, "error"));
		}
	});

	const frag = document.createDocumentFragment();

	if (growLines.length > 0) {
		App.UI.DOM.appendNewElement("h3", frag, "Growing Organs");

		growLines.forEach(l => {
			App.UI.DOM.appendNewElement("div", frag, l);
		});
	}

	if (finishLines.length > 0) {
		App.UI.DOM.appendNewElement("h3", frag, "Finished Organs");

		finishLines.forEach(l => {
			App.UI.DOM.appendNewElement("div", frag, l);
		});
	}

	if (growLines.length === 0 && finishLines.length === 0) {
		App.UI.DOM.appendNewElement("div", frag, "Organs must be genetically matched to their host slave. To begin growing organs for a slave, take them to the Remote Surgery.", ["detail"]);
	}

	return frag;
};
