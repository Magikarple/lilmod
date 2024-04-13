/**
 * Currently setup for the Incubator and Nursery
 * @param {string} facility
 * @returns {DocumentFragment}
 */
App.UI.facilityRetrievalWorkaround = function(facility) {
	const isIncubator = facility === "Incubator";
	const facilityName = isIncubator ? V.incubator.name : V.nurseryName;
	if (isIncubator) {
		V.incubator.readySlaves = 0;
	}

	const node = new DocumentFragment();
	if (V.readySlave) {
		const {he, his, him} = getPronouns(V.readySlave);
		animalBabyWarning(V.readySlave);
		App.UI.DOM.appendNewElement("p", node, `${V.readySlave.slaveName} has been discharged from ${facilityName} and is ready for ${his} first ever inspection.`);
		if (isIncubator) {
			App.UI.DOM.appendNewElement("div", node, App.Desc.longSlave(V.readySlave));
			if (V.readySlave.tankBaby !== 3) {
				checkOrgans(V.readySlave);
				App.UI.DOM.appendNewElement("div", node, App.UI.newChildIntro(V.readySlave));
			} else {
				const price = Math.trunc(slaveCost(V.readySlave)/3);
				V.activeSlave = V.readySlave; // V.activeSlave is used by Husk Slave Swap Workaround
				node.append(`A husk is ready to be used.`);
				App.UI.DOM.appendNewElement("div", node, `As expected, ${he} is a complete vegetable, but that is what you wanted after all. You lack the facilities to care for ${him} in this state, so you should do what you are planning quickly. Or you could sell ${him} to the Flesh Heap.`, "note");
				if (V.cash >= V.surgeryCost) {
					App.UI.DOM.appendNewElement("div", node, App.UI.DOM.passageLink("Contact the bodyswap surgeon.", "Husk Slave Swap Workaround", null, "Will significantly increase the selected slave's upkeep."));
					App.UI.DOM.appendNewElement("div", node, App.UI.DOM.passageLink("Sell the husk to Flesh Heap.", "Main", () => { cashX(price, "slaveTransfer"); }, `This body can be bought by the Flesh Heap for ${cashFormat(price)}.`));
				} else {
					cashX(price, "slaveTransfer");
					App.UI.DOM.appendNewElement("span", node, `You can't sustain ${him} and thus must sell ${him} for ${cashFormat(price)}.`, "note");
				}
			}
		}
	} else if (V.newSlavePool) {
		App.UI.DOM.appendNewElement("p", node, `The following slaves were discharged from ${facilityName}:`);
		for (const slave of V.newSlavePool) {
			App.UI.DOM.appendNewElement("div", node, `Name: ${SlaveFullName(slave)}`);
			App.UI.DOM.appendNewElement("div", node, parent(slave, "mother"));
			App.UI.DOM.appendNewElement("div", node, parent(slave, "father"));
			newSlave(slave);
			checkOrgans(slave);
		}
		delete V.newSlavePool;
	}

	return node;

	function animalBabyWarning(slave) {
		if (slave.father === -8) {
			Dialog.setup("Attention");
			const frag = new DocumentFragment();
			frag.append(`As the Farmyard is currently WIP, animal-fathered children shouldn't be here! Affected slave: ${slave.slaveName}.`);
			App.UI.DOM.appendNewElement("div", frag, "Please either close this dialog, load a previous save and abort the pregnancy, or sell/discard this slave.");
			App.UI.DOM.appendNewElement("div", frag,
				App.UI.DOM.link("Alternatively, remove this slave and try again.", () => {
					if (V.readySlave) {
						V.readySlave = 0;
					} else if (V.newSlavePool) {
						V.newSlavePool.deleteAt(slave);
					}
					if (Dialog.isOpen()) {
						Dialog.close();
					}
				}, [], (V.readySlave ? facility : `${facility} Retrieval Workaround`))
			);
			$(Dialog.body()).empty().append(frag);
			Dialog.open();
		}
	}

	/**
	 * @param {FC.SlaveState} slave
	 * @param {"father"|"mother"} type
	 */
	function parent(slave, type) {
		const r = new DocumentFragment();
		const missingTableEntry = V.missingTable[slave[type]];
		const missingSlave = missingTableEntry ? `Your former slave, ${missingTableEntry.slaveName}.` : `Unknown.`;
		animalBabyWarning(slave);
		r.append(`${capFirstChar(type)}: `);
		if (slave[type] > 0) {
			const tempParent = getSlave(slave[type]);
			if (!tempParent) {
				r.append(`Unknown.`);
			} else {
				r.append(SlaveFullName(tempParent));
			}
		} else if (slave[type] === -1) {
			r.append(PlayerName());
		} else if (type === "father") {
			if (slave.father === -2) {
				r.append(`Unknown citizen.`);
			} else if (slave.father === -3) {
				r.append(`Your former Master.`);
			} else if (slave.father === -4) {
				r.append(`Another arcology's owner.`);
			} else if (slave.father === -5) {
				r.append(`One of your clients.`);
			} else if (slave.father === -6) {
				r.append(`Societal Elite.`);
			} else if (slave.father === -7) {
				r.append(`Lab crafted.`);
			} else if (slave.father === -9) {
				r.append(`Futanari Sister.`);
			} else if (slave.father === -10) {
				r.append(`Your rapist.`);
			} else {
				r.append(missingSlave);
			}
		} else {
			r.append(missingSlave);
		}
		return r;
	}

	function checkOrgans(slave) {
		const movedOrgans = V.incubator.organs.deleteWith(o => o.ID === slave.ID);
		for (const organ of movedOrgans) {
			if (organ.weeksToCompletion <= 0) {
				V.completedOrgans.push(organ);
			} else {
				V.organs.push(organ);
			}
		}
	}
};
