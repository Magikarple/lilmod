App.Mods.SecExp.transportHub = (function() {
	return {
		Init,
		GUI
	};

	function Init() {
		V.SecExp.buildings.transportHub = {
			airport: 1,
			security: 1,
			surfaceTransport: 1,
		};
	}
	function GUI() {
		const frag = new DocumentFragment();
		V.nextButton = "Back";
		V.nextLink = "Main";
		frag.append(
			intro(),
			trade(),
			upgrades(),
		);
		return frag;

		function intro() {
			const div = document.createElement("div");
			const text = [];

			text.push(`You quickly reach the transport hub, where a constant stream of vehicles, people and goods greets you. Part of the structure is dedicated to air travel and the other is mainly occupied by the ${V.terrain !== "oceanic" && V.terrain !== "marine" ? `monorail station` : `docks`}.`);

			if (V.SecExp.edicts.limitImmigration || V.policies.immigrationRep === -1) {
				text.push(`Due to your strict policies concerning immigration, very few new citizens arrive in the transport hub.`);
			} else if (V.SecExp.edicts.openBorders || V.policies.immigrationCash) {
				text.push(`Due to your liberal policies concerning immigration, the transport hub is filled with a flow of new citizens.`);
			}

			App.Events.addNode(div, text, "div", ['scene-intro']);
			App.UI.DOM.appendNewElement("div", div, App.UI.DOM.passageLink(`Decommission the Transport Hub`, "Main", () => {
				delete V.SecExp.buildings.transportHub;

				App.Arcology.cellUpgrade(V.building, App.Arcology.Cell.Market, "Transport Hub", "Markets");
			}), ['indent']);
			return div;
		}

		function trade() {
			const div = document.createElement("div");
			const text = [];

			App.UI.DOM.appendNewElement("h2", div, `Trade`);
			if (V.SecExp.core.trade <= 20) {
				text.push(`Trade is <span class="red">almost non-existent.</span> Outside the supplies for the arcology's domestic consumption little else crosses the territory of the free city.`);
			} else if (V.SecExp.core.trade <= 40) {
				text.push(`Trade is <span class="orange">low.</span> There's some but limited commercial activity crossing the territory of the free city.`);
			} else if (V.SecExp.core.trade <= 60) {
				text.push(`Trade is at <span class="yellow">positive levels.</span> There's a good amount commercial activity outside the supplies for the arcology's domestic consumption.`);
			} else if (V.SecExp.core.trade <= 80) {
				text.push(`Trade is at <span class="limegreen">high levels.</span> There's a lot of commercial activity outside the supplies for the arcology's domestic consumption.`);
			} else {
				text.push(`Trade is at <span class="green">extremely high levels.</span> There's a constant stream of commercial activity crossing the arcology.`);
			}
			App.Events.addNode(div, text);
			return div;
		}

		function upgrades() {
			const div = document.createElement("div");
			const price = cost => Math.trunc(cost * V.upgradeMultiplierArcology);
			App.UI.DOM.appendNewElement("h2", div, `Upgrades`);
			div.append(
				airport(),
				V.terrain !== "oceanic" && V.terrain !== "marine"
					? land()
					: sea(),
				security(),
			);
			return div;

			function airport() {
				const div = document.createElement("div");
				const text = [];
				const links = [];

				if (V.SecExp.buildings.transportHub.airport === 1) {
					text.push(`The arcology's airport is relatively small and poorly equipped. It can handle some traffic, but nothing noteworthy.`);
					links.push(App.UI.DOM.link(`Modernize the airport`, () => {
						V.SecExp.buildings.transportHub.airport = 2;
						cashX(forceNeg(price(5000)), "capEx");

						App.UI.reload();
					}, [], '', `Costs ${cashFormat(price(5000))} and will increase trade, but will affect security.`));
				} else if (V.SecExp.buildings.transportHub.airport === 2) {
					text.push(`The arcology's airport is relatively small, but fairly well equipped. It can handle some traffic, but nothing too serious.`);
					links.push(App.UI.DOM.link(`Enlarge the airport`, () => {
						V.SecExp.buildings.transportHub.airport = 3;
						cashX(forceNeg(price(15000)), "capEx");

						App.UI.reload();
					}, [], '', `Costs ${cashFormat(price(15000))} and will increase trade, but will affect security.`));
				} else if (V.SecExp.buildings.transportHub.airport === 3) {
					text.push(`The arcology's airport is good sized and well equipped. It can handle a good amount of traffic.`);
					links.push(App.UI.DOM.link(`Further modernize the airport`, () => {
						V.SecExp.buildings.transportHub.airport = 4;
						cashX(forceNeg(price(45000)), "capEx");

						App.UI.reload();
					}, [], '', `Costs ${cashFormat(price(45000))} and will increase trade, but will affect security.`));
				} else if (V.SecExp.buildings.transportHub.airport === 4) {
					links.push(App.UI.DOM.link(`Further enlarge the airport`, () => {
						V.SecExp.buildings.transportHub.airport = 5;
						cashX(forceNeg(price(85000)), "capEx");

						App.UI.reload();
					}, [], '', `Costs ${cashFormat(price(85000))} and will increase trade, but will affect security.`));
					text.push(`The arcology's airport is good sized and very well equipped. It can handle a lot of traffic.`);
				} else {
					text.push(`The arcology's airport is huge and very well equipped. It can handle an impressive amount of traffic.`);
				}

				App.Events.addNode(div, text);
				App.UI.DOM.appendNewElement("div", div, App.UI.DOM.generateLinksStrip(links), ['indent']);
				return div;
			}

			function land() {
				const div = document.createElement("div");
				const text = [];
				const links = [];

				if (V.SecExp.buildings.transportHub.surfaceTransport === 1) {
					text.push(`The railway network is old and limited. It can handle some traffic, but not sustain commercial activity.`);
					links.push(App.UI.DOM.link(`Modernize the railway`, () => {
						V.SecExp.buildings.transportHub.surfaceTransport = 2;
						cashX(forceNeg(price(10000)), "capEx");

						App.UI.reload();
					}, [], '', `Costs ${cashFormat(price(10000))} and will increase trade, but will affect security.`));
				} else if (V.SecExp.buildings.transportHub.surfaceTransport === 2) {
					text.push(`The railway network is modern and efficient, but limited in reach. It can handle some traffic, but not sustain commercial activity of any significant size.`);
					links.push(App.UI.DOM.link(`Enlarge the railway`, () => {
						V.SecExp.buildings.transportHub.surfaceTransport = 3;
						cashX(forceNeg(price(25000)), "capEx");

						App.UI.reload();
					}, [], '', `Costs ${cashFormat(price(25000))} and will increase trade, but will affect security.`));
				} else if (V.SecExp.buildings.transportHub.surfaceTransport === 3) {
					text.push(`The railway network is modern, efficient and expansive. It can handle a significant amount of traffic.`);
					links.push(App.UI.DOM.link(`Further modernize the railway`, () => {
						V.SecExp.buildings.transportHub.surfaceTransport = 4;
						cashX(forceNeg(price(65000)), "capEx");

						App.UI.reload();
					}, [], '', `Costs ${cashFormat(price(65000))} and will increase trade, but will affect security.`));
				} else {
					text.push(`The railway network is high tech and very far reaching. It can handle an enormous amount of traffic.`);
				}

				App.Events.addNode(div, text);
				App.UI.DOM.appendNewElement("div", div, App.UI.DOM.generateLinksStrip(links), ['indent']);
				return div;
			}

			function sea() {
				const div = document.createElement("div");
				const text = [];
				const links = [];

				if (V.SecExp.buildings.transportHub.surfaceTransport === 1) {
					text.push(`The docks are old and small. They can handle some traffic, but not sustain commercial activity.`);
					links.push(App.UI.DOM.link(`Modernize the docks`, () => {
						V.SecExp.buildings.transportHub.surfaceTransport = 2;
						cashX(forceNeg(price(10000)), "capEx");

						App.UI.reload();
					}, [], '', `Costs ${cashFormat(price(10000))} and will increase trade, but will affect security.`));
				} else if (V.SecExp.buildings.transportHub.surfaceTransport === 2) {
					text.push(`The docks are modern and efficient, but limited in size. They can handle some traffic, but not sustain commercial activity of significant size.`);
					links.push(App.UI.DOM.link(`Enlarge the docks`, () => {
						V.SecExp.buildings.transportHub.surfaceTransport = 3;
						cashX(forceNeg(price(25000)), "capEx");

						App.UI.reload();
					}, [], '', `Costs ${cashFormat(price(25000))} and will increase trade, but will affect security.`));
				} else if (V.SecExp.buildings.transportHub.surfaceTransport === 3) {
					text.push(`The docks are modern, efficient and expansive. They can handle a significant amount of traffic.`);
					links.push(App.UI.DOM.link(`Further modernize the docks`, () => {
						V.SecExp.buildings.transportHub.surfaceTransport = 4;
						cashX(forceNeg(price(65000)), "capEx");

						App.UI.reload();
					}, [], '', `Costs ${cashFormat(price(65000))} and will increase trade, but will affect security.`));
				} else {
					text.push(`The docks are huge in size and high tech. They can handle an enormous amount of traffic.`);
				}

				App.Events.addNode(div, text);
				App.UI.DOM.appendNewElement("div", div, App.UI.DOM.generateLinksStrip(links), ['indent']);
				return div;
			}

			function security() {
				const div = document.createElement("div");
				const text = [];
				const links = [];

				if (V.SecExp.buildings.transportHub.security === 1) {
					text.push(`The security of the hub is limited to a few cameras and the occasional guard.`);
					links.push(App.UI.DOM.link(`Expand and modernize the surveillance system`, () => {
						V.SecExp.buildings.transportHub.security = 2;
						cashX(forceNeg(price(15000)), "capEx");

						App.UI.reload();
					}, [], '', `Costs ${cashFormat(price(15000))}, increases upkeep costs, and will increase security.`));
				} else if (V.SecExp.buildings.transportHub.security === 2) {
					text.push(`The security of the hub is guaranteed by a powerful camera surveillance system.`);
					links.push(App.UI.DOM.link(`Establish a rapid response team`, () => {
						V.SecExp.buildings.transportHub.security = 3;
						cashX(forceNeg(price(35000)), "capEx");

						App.UI.reload();
					}, [], '', `Costs ${cashFormat(price(35000))}, increases upkeep costs, and will increase security.`));
				} else if (V.SecExp.buildings.transportHub.security === 3) {
					text.push(`The security of the hub is guaranteed by a powerful camera surveillance system and a rapid response team constantly patrolling the structure.`);
					links.push(App.UI.DOM.link(`Add additional security drones to the structure`, () => {
						V.SecExp.buildings.transportHub.security = 4;
						cashX(forceNeg(price(55000)), "capEx");

						App.UI.reload();
					}, [], '', `Costs ${cashFormat(price(55000))}, increases upkeep costs, and will increase security.`));
				} else {
					text.push(`The security of the hub is guaranteed by a powerful camera surveillance system, a rapid response team constantly patrolling the building and additional security drones making the rounds around the exterior.`);
				}

				App.Events.addNode(div, text);
				App.UI.DOM.appendNewElement("div", div, App.UI.DOM.generateLinksStrip(links), ['indent']);
				return div;
			}
		}
	}
})();
