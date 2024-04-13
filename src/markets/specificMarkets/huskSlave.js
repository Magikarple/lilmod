App.Markets["Husk Slave"] = function() {
	const el = new DocumentFragment();
	let r = [];

	if (V.huskSlaveOrdered === 0) {
		r.push(`You lay out a new order for a braindead slave to be put aside for your use.`);
	} else {
		r.push(`You review your posted husk order.`);
	}
	r.push(`Your order requests a body with the following characteristics:`);

	App.UI.DOM.appendNewElement("p", el, r.join(" "));

	setupHusk();
	el.append(age());
	el.append(sex());
	el.append(nationality());
	el.append(raceSelect());
	el.append(virginity());
	App.UI.DOM.appendNewElement("h2", el, "Reservations");
	el.append(reserve());
	return el;

	function setupHusk() {
		if (V.huskSlave.dick === 0 && V.huskSlave.vagina === -1) {
			V.huskSlave.vagina = 0;
		}
		V.huskSlave.age = Math.clamp(V.huskSlave.age, V.minimumSlaveAge, V.retirementAge - 1);
	}
	function age() {
		const p = document.createElement("p");
		App.UI.DOM.appendNewElement("div", p, "Age:");
		App.UI.DOM.appendNewElement(
			"div",
			p,
			App.UI.DOM.makeTextBox(
				V.huskSlave.age,
				v => {
					V.huskSlave.age = v;
					refresh();
				},
				true
			)
		);
		return p;
	}
	function sex() {
		const p = document.createElement("p");
		p.append("Sex: ");
		if (V.huskSlave.sex === 1) {
			p.append(`Female.`);
		} else if (V.huskSlave.sex === 2) {
			p.append(`Male.`);
		} else if (V.huskSlave.sex === 3) {
			p.append(`Futanari.`);
		}
		const choices = {
			Female: 1,
			Male: 2,
			Both: 3
		};
		p.append(links(choices, "sex"));
		return p;
	}

	function nationality() {
		const p = document.createElement("p");
		App.UI.DOM.appendNewElement("div", p, "Nationality:");
		App.UI.DOM.appendNewElement(
			"div",
			p,
			App.UI.DOM.makeTextBox(
				V.huskSlave.nationality,
				v => {
					V.huskSlave.nationality = v;
					refresh();
				},
			)
		);
		p.append(links(App.Data.misc.baseNationalities.concat(["Stateless"]), "nationality"));
		return p;
	}

	function raceSelect() {
		const p = document.createElement("p");
		App.UI.DOM.appendNewElement("div", p, "Race: ");
		App.UI.DOM.appendNewElement(
			"div",
			p,
			App.UI.DOM.makeTextBox(
				V.huskSlave.race,
				v => {
					V.huskSlave.race = v;
					refresh();
				},
			)
		);

		const linkArray = [];
		const races = new Map(App.Data.misc.filterRacesPublic);
		races.set("not important", "Not Important");
		for (const [race, capRace] of races) {
			if (V.huskSlave.race === race) {
				linkArray.push(
					App.UI.DOM.disabledLink(
						capRace,
						["current selection"]
					)
				);
			} else {
				linkArray.push(
					App.UI.DOM.link(
						capRace,
						() => {
							V.huskSlave.race = race;
							refresh();
						}
					)
				);
			}
		}
		App.UI.DOM.appendNewElement("div", p, App.UI.DOM.generateLinksStrip(linkArray));
		return p;
	}
	function virginity() {
		const p = document.createElement("p");
		p.append("Virginity: ");
		if (V.huskSlave.sex === 1) {
			p.append(`Female.`);
		} else if (V.huskSlave.sex === 2) {
			p.append(`Male.`);
		} else if (V.huskSlave.sex === 3) {
			p.append(`Futanari.`);
		}
		const choices = {
			"Important": 0,
			"Not Important": 1,
		};
		p.append(links(choices, "virgin"));
		return p;
	}

	function reserve() {
		const p = document.createElement("p");
		App.UI.DOM.appendNewElement("div", p, `Reserving a body will cost ${cashFormat(10000)} up front. Canceling an order will refund your money; however, if a delivered body is rejected, your money will not be refunded.`);

		if (V.huskSlaveOrdered === 1) {
			p.append(
				App.UI.DOM.link(
					`Withdraw body order`,
					() => {
						V.huskSlaveOrdered = 0;
						cashX(10000, "slaveTransfer");
					},
					[],
					"Main"
				)
			);
		} else if (V.cash < 10000) {
			App.UI.DOM.appendNewElement("span", p, `You lack the credits to place a body reservation.`, "note");
		} else {
			p.append(
				App.UI.DOM.link(
					`Post body order`,
					() => {
						V.huskSlaveOrdered = 1;
						cashX(-10000, "slaveTransfer");
					},
					[],
					"Main"
				)
			);
		}

		return p;
	}

	function links(choices, global) {
		const linkArray = [];
		if (Array.isArray(choices)) {
			for (let i = 0; i < choices.length; i++) {
				makeLink(choices[i], choices[i]);
			}
		} else {
			for (const choice in choices) {
				makeLink(choice, choices[choice]);
			}
		}
		return App.UI.DOM.makeElement("div", App.UI.DOM.generateLinksStrip(linkArray));

		function makeLink(title, value) {
			if (V.huskSlave[global] === value) {
				linkArray.push(
					App.UI.DOM.disabledLink(
						title,
						["current selection"]
					)
				);
			} else {
				linkArray.push(
					App.UI.DOM.link(
						title,
						() => {
							V.huskSlave[global] = value;
							refresh();
						}
					)
				);
			}
		}
	}

	function refresh() {
		jQuery("#slave-markets").empty().append(App.Markets["Husk Slave"]);
	}
};
