App.UI.surrogacyWorkaround = function() {
	const node = new DocumentFragment();

	const donatrix = V.donatrix;
	const impregnatrix = V.impregnatrix;
	const receptrix = V.receptrix;

	let eligibility = 0;
	let eligibilityI = 0;
	let eligibility2 = 0;

	let impreg = "undecided";
	if (impregnatrix === -1) {
		impreg = PlayerName();
	} else if (impregnatrix !== 0) {
		impreg = SlaveFullName(getSlave(impregnatrix));
	}

	let receive = "undecided";
	if (receptrix === -1) {
		receive = PlayerName();
	} else if (receptrix !== 0) {
		receive = SlaveFullName(getSlave(receptrix));
	}

	App.UI.DOM.appendNewElement("p", node, `${(donatrix === -1) ? `You've prepared yourself to have an egg taken from your ovaries;` : `${getSlave(V.AS).slaveName} is prepped to have an egg harvested from ${getPronouns(getSlave(V.AS)).possessive} ovaries;`} now you must select a target to fertilize it and who will carry it to term.`, "scene-intro");

	if (impreg !== "undecided" || receive !== "undecided") {
		const bearers = [];
		if (impreg !== "undecided") {
			bearers.push(`${impreg} will provide the seed`);
		}
		if (receive !== "undecided") {
			bearers.push(`${receive} shall carry it`);
		}
		App.UI.DOM.appendNewElement("div", node, `${toSentence(bearers)}.`);

		if (impreg !== "undecided" && receive !== "undecided") {
			App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
				"Implant fertilized ovum",
				() => {
					cashX(forceNeg(V.surgeryCost * 2), "slaveSurgery");
					V.surgeryType = "surrogacy";
					App.UI.reload();
				}, [], "Surrogacy",
			));
		}
	}


	App.UI.DOM.appendNewElement("h2", node, `Semen donatrix: ${impreg}`);

	for (const slave of V.slaves) {
		if (slave.balls > 0 && slave.pubertyXY === 1 && isSlaveAvailable(slave) && canBreed(getSlave(donatrix), slave)) {
			const div = App.UI.DOM.appendNewElement("div", node, App.UI.DOM.referenceSlaveWithPreview(slave, SlaveFullName(slave)));
			div.append(" ", App.UI.DOM.link(
				"Select",
				() => {
					V.impregnatrix = slave.ID;
					App.UI.reload();
				}
			));
			eligibility = 1;
		}
	}
	if (eligibility === 0) {
		App.UI.DOM.appendNewElement("div", node, "You have no slaves with potent sperm.");
	}

	if (V.incubator.tanks.length > 0 && V.incubator.upgrade.reproduction === 1) {
		for (const tank of V.incubator.tanks) {
			if (tank.balls > 0 && tank.dick > 0 && tank.incubatorSettings.reproduction === 2 && canBreed(getSlave(donatrix), tank)) {
				if (eligibilityI === 0) {
					App.UI.DOM.appendNewElement("h2", node, `Incubator settings are resulting in large-scale fluid secretion. Select an eligible incubatee to milk for semen:`);
					eligibilityI = 1;
				}
				App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
					tank.slaveName,
					() => {
						V.impregnatrix = tank.ID;
						App.UI.reload();
					}
				));
			}
		}
		if (eligibilityI === 0) {
			App.UI.DOM.appendNewElement("div", node, "You have no growing slaves producing sperm.");
		}
	}

	if (V.PC.balls !== 0) {
		App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
			"Use your own",
			() => {
				V.impregnatrix = V.PC.ID;
				App.UI.reload();
			}
		));
	} else if (V.PC.counter.storedCum > 0) {
		App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
			"Use a vial of your own",
			() => {
				V.impregnatrix = V.PC.ID;
				V.PC.counter.storedCum--;
				App.UI.reload();
			}
		));
	}

	App.UI.DOM.appendNewElement("h2", node, `Chosen surrogate: ${receive}`);

	for (const slave of V.slaves) {
		if (canBeReceptrix(slave)) {
			const div = App.UI.DOM.appendNewElement("div", node, App.UI.DOM.referenceSlaveWithPreview(slave, SlaveFullName(slave)));
			div.append(" ", App.UI.DOM.link(
				"Select",
				() => {
					V.receptrix = slave.ID;
					App.UI.reload();
				}, [], "",
				(slave.pregType >= 4) ? `Using a slave carrying multiples is inadvisable` : ``
			));
			eligibility2 = 1;
		}
	}
	if (eligibility2 === 0) {
		App.UI.DOM.appendNewElement("div", node, "You have no slaves capable of acting as a surrogate.");
	}

	if (V.PC.vagina !== -1 && V.PC.preg >= 0 && V.PC.preg < 4 && V.PC.pregType < 8 && V.PC.physicalAge < 70) {
		App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
			"Use your own womb",
			() => {
				V.receptrix = V.PC.ID;
				App.UI.reload();
			}
		));
	}

	return node;
};
