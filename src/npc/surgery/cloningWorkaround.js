App.UI.cloningWorkaround = function() {
	const node = new DocumentFragment();

	let eligibility = 0;
	const donatrix = V.donatrix;
	const receptrix = V.receptrix;

	let impreg = "undecided";
	if (donatrix === -1) {
		impreg = PlayerName();
	} else if (donatrix !== 0) {
		impreg = SlaveFullName(getSlave(donatrix));
	}

	let receive = "undecided";
	if (receptrix === -1) {
		receive = PlayerName();
	} else if (receptrix !== 0) {
		receive = SlaveFullName(getSlave(receptrix));
	}

	App.UI.DOM.appendNewElement("h2", node, `Genetic Source`);
	App.UI.DOM.appendNewElement("div", node, "Blank ovum prepared, please select genetic source and surrogate.", "note");
	App.UI.DOM.appendNewElement("div", node, `Chosen source: ${impreg}`);

	App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
		"Yourself",
		() => {
			V.donatrix = V.PC.ID;
			App.UI.reload();
		}
	));
	for (const slave of V.slaves) {
		const div = App.UI.DOM.appendNewElement("div", node, App.UI.DOM.referenceSlaveWithPreview(slave, SlaveFullName(slave)));
		if (donatrix === slave.ID) {
			div.classList.add("note");
		} else {
			div.append(" ", App.UI.DOM.link(
				"Select",
				() => {
					V.donatrix = slave.ID;
					App.UI.reload();
				}
			));
		}
	}
	App.UI.DOM.appendNewElement("h2", node, `Surrogate`);
	App.UI.DOM.appendNewElement("div", node, `Chosen surrogate: ${receive}`);

	for (const slave of V.slaves) {
		if (canBeReceptrix(slave)) {
			const div = App.UI.DOM.appendNewElement("div", node, App.UI.DOM.referenceSlaveWithPreview(slave, SlaveFullName(slave)));
			if (receptrix === slave.ID) {
				div.classList.add("note");
			} else {
				div.append(" ", App.UI.DOM.link(
					"Select",
					() => {
						V.receptrix = slave.ID;
						App.UI.reload();
					}
				));
				if (slave.pregType >= 4) {
					App.UI.DOM.appendNewElement("span", div, `Using a slave carrying multiples is inadvisable`, ["note"]);
				}
			}
			eligibility = 1;
		}
	}
	if (eligibility === 0) {
		App.UI.DOM.appendNewElement("div", node, `You have no slaves capable of acting as a surrogate.`, "note");
	}

	if (V.PC.vagina !== -1 && V.PC.preg >= 0 && V.PC.preg < 4 && V.PC.pregType < 8 && V.PC.physicalAge < 70) {
		if (receptrix === V.PC.ID) {
			App.UI.DOM.appendNewElement("div", node, `Yourself`, "note");
		} else {
			App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
				"Use your own womb",
				() => {
					V.receptrix = V.PC.ID;
					App.UI.reload();
				}
			));
		}
	}
	App.UI.DOM.appendNewElement("h2", node, `Implantation`);

	if (impreg !== "undecided" && receive !== "undecided") {
		App.UI.DOM.appendNewElement("div", node, `${impreg} will be cloned and ${receive} shall act as the incubator.`);
		App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
			"Implant clone ovum",
			() => {
				cashX(forceNeg(V.surgeryCost * 2), "slaveSurgery");
				V.surgeryType = "clone";
			}, [], "Surrogacy",
		));
	} else if (impreg !== "undecided") {
		App.Events.addNode(node, [
			`${impreg} will be cloned.`,
			App.UI.DOM.makeElement("span", "Please select a surrogate", "note")
		]);
	} else if (receive !== "undecided") {
		App.Events.addNode(node, [
			`${receive} shall act as the incubator.`,
			App.UI.DOM.makeElement("span", "Please select a genetic source", "note")
		]);
	} else {
		App.UI.DOM.appendNewElement("div", node, `Please select a genetic source and surrogate`, "note");
	}

	return node;
};
