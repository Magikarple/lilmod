/**
 * Choose which slave will feed the selected slave
 * @param {App.Entity.SlaveState} slave
 */
App.UI.SlaveInteract.slaveOnSlaveFeedingSelection = function(slave) {
	const el = document.createElement("span");
	el.id = "scene";

	el.append(intro());

	tabs();

	return el;

	function intro() {
		const el = new DocumentFragment();
		const {his} = getPronouns(slave);

		App.UI.DOM.appendNewElement("div", el, `${slave.slaveName} is prepped to drink ${his} fill; now you must select a slave capable of producing the required amount of milk or ejaculate.`);
		App.UI.DOM.appendNewElement("h2", el, "Select an eligible slave to serve as the tap");
		return el;
	}

	function slaveChoice(inflationType) {
		const el = new DocumentFragment();
		const twoLiterSlaves = [];
		const fourLiterSlaves = [];
		const eightLiterSlaves = [];
		const {he, his} = getPronouns(slave);

		const table = document.createElement("table");
		table.classList.add("slave-on-slave-feeding");

		const header = table.createTHead();
		table.append(header);
		el.append(table);

		const columnNames = ["2 Liter", "4 Liter", "8 Liter"];
		for (const name of columnNames) {
			header.append(App.UI.DOM.makeElement("th", name));
		}

		for (const tapSlave of V.slaves) {
			let output;
			if (inflationType === "milk") {
				output = (tapSlave.lactation > 0) ? milkLoad(tapSlave) : 0;
			} else if (inflationType === "cum") {
				output = (tapSlave.balls > 0 && tapSlave.dick > 0 && tapSlave.chastityPenis !== 1) ? cumLoad(tapSlave) : 0;
			} else {
				throw Error(`inflationType "${inflationType}" not found`);
			}
			if (tapSlave.ID !== slave.ID && (inflationType !== "milk" || tapSlave.nipples !== "fuckable")) {
				if (output >= 2) {
					twoLiterSlaves.push(createTapLink(tapSlave, 1, inflationType));
					if (output >= 4 && slave.pregKnown === 0) {
						fourLiterSlaves.push(createTapLink(tapSlave, 2, inflationType));
						if (output >= 8) {
							eightLiterSlaves.push(createTapLink(tapSlave, 3, inflationType));
						}
					}
				}
			}
		}

		if (twoLiterSlaves.length === 0) {
			twoLiterSlaves.push(App.UI.DOM.makeElement("td", `You have no slaves capable of producing two liters of ${inflationType}.`));
		} else {
			if (slave.pregKnown !== 0) {
				fourLiterSlaves.push(App.UI.DOM.makeElement("td", `Due to ${his} pregnancy, ${he} is incapable of keeping down more than two liters of ${inflationType}.`));
			} else {
				if (fourLiterSlaves.length === 0) {
					fourLiterSlaves.push(App.UI.DOM.makeElement("td", `You have no slaves capable of producing four liters of ${inflationType}.`));
				}
				if (eightLiterSlaves.length === 0) {
					eightLiterSlaves.push(App.UI.DOM.makeElement("td", `You have no slaves capable of producing eight liters of ${inflationType}.`));
				}
			}
		}

		const dataRow = document.createElement("tr");
		dataRow.append(makeColumn(twoLiterSlaves));
		dataRow.append(makeColumn(fourLiterSlaves));
		dataRow.append(makeColumn(eightLiterSlaves));
		table.append(dataRow);

		return el;
	}

	/**
	 * @param {App.Entity.SlaveState} tapSlave
	 * @param {number} inflation
	 * @param {FC.InflationLiquid} inflationType
	 */
	function createTapLink(tapSlave, inflation, inflationType) {
		const el = document.createElement("div");
		el.append(
			App.UI.DOM.link(
				tapSlave.slaveName,
				() => {
					slave.inflation = inflation;
					slave.inflationType = inflationType;
					slave.inflationMethod = 3;
					jQuery("#scene").empty().append(FSlaveFeed(slave, tapSlave));
				},
			)
		);
		const relTerm = relativeTerm(slave, tapSlave);
		if (relTerm) {
			el.append(` ${relTerm}`);
		}
		if (tapSlave.relationshipTarget === slave.ID) {
			const {wife} = getPronouns(tapSlave);
			switch (tapSlave.relationship) {
				case 1:
					el.append(` friends`);
					break;
				case 2:
					el.append(` best friends`);
					break;
				case 3:
					el.append(` friends with benefits`);
					break;
				case 4:
					el.append(` lover`);
					break;
				case 5:
					el.append(` slave${wife}`);
					break;
			}
		}
		if (tapSlave.rivalryTarget === slave.ID) {
			switch (tapSlave.relationship) {
				case 1:
					el.append(`dislikes`);
					break;
				case 2:
					el.append(`rival`);
					break;
				case 3:
					el.append(`bitterly hates`);
					break;
			}
		}
		return el;
	}

	function makeColumn(array) {
		const td = document.createElement("td");
		for (const cell of array) {
			td.append(cell);
		}
		return td;
	}

	function tabs() {
		const tabBar = new App.UI.Tabs.TabBar("SlaveOnSlaveFeeding");
		tabBar.addTab("Milk Slaves", "milk", slaveChoice("milk"));
		tabBar.addTab("Cum Slaves", "cum", slaveChoice("cum"));
		el.append(tabBar.render());
	}
};
