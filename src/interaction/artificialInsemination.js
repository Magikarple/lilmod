/**
 * @returns {DocumentFragment}
 */
App.UI.SlaveInteract.artificialInsemination = function() {
	const f = new DocumentFragment();
	let r;

	App.UI.DOM.appendNewElement("p", f, `${getSlave(V.AS).slaveName} is prepped for fertilization; now you must select a target to harvest sperm from.`, "scene-intro");

	App.UI.DOM.appendNewElement("h2", f, "Select an eligible slave to serve as the semen donor");

	r = [];
	let any = false;
	for (const slave of V.slaves) {
		if (slave.balls > 0 && slave.pubertyXY === 1 && canBreed(getSlave(V.AS), slave)) {
			const {his} = getPronouns(slave);

			const name = App.UI.DOM.makeElement("span", SlaveFullName(slave), "has-tooltip");
			tippy(name, {
				content: App.UI.DOM.slaveDescriptionDialog(slave, "Pop-up", {noArt: true}),
				interactive: true,
			});
			r.push(App.UI.DOM.makeElement("div", name));

			r.push(App.UI.DOM.makeElement("div",
				App.Medicine.Surgery.makeLink(
					new App.Medicine.Surgery.Procedures.Insemination(getSlave(V.AS), `Use ${his} sperm.`, slave),
					exit, false)
			));

			any = true;
		}
	}
	if (r.length > 0) {
		App.Events.addNode(f, r, "div", "grid-2columns-auto");
	} else {
		App.UI.DOM.appendNewElement("p", f, "You have no slaves with potent sperm.", "note");
	}

	if (V.incubator.tanks.length > 0 && V.incubator.upgrade.reproduction === 1) {
		r = [];
		any = false;
		for (const tank of V.incubator.tanks) {
			if (tank.balls > 0 && tank.dick > 0 && tank.incubatorSettings.reproduction === 2 && canBreed(getSlave(V.AS), tank)) {
				if (any === false) {
					App.UI.DOM.appendNewElement("h2", f, "Select an eligible incubatee to milk for semen");
					App.UI.DOM.appendNewElement("p", f, "Incubator settings are resulting in large-scale fluid secretion.", "scene-intro");
					any = true;
				}
				r.push(App.UI.DOM.makeElement("div",
					App.Medicine.Surgery.makeLink(
						new App.Medicine.Surgery.Procedures.Insemination(getSlave(V.AS), `Use ${tank.slaveName}'s sperm.`, tank),
						exit, false)
				));
			}
		}

		if (any) {
			App.Events.addParagraph(f, r);
		} else {
			App.UI.DOM.appendNewElement("p", f, "You have no growing slaves producing sperm.", "note");
		}
	}

	if (V.PC.balls !== 0) {
		App.UI.DOM.appendNewElement("p", f,
			App.Medicine.Surgery.makeLink(
				new App.Medicine.Surgery.Procedures.Insemination(getSlave(V.AS), "Use your own", V.PC),
				exit, false)
		);
	} else if (V.PC.counter.storedCum > 0) {
		r = [];
		r.push(App.Medicine.Surgery.makeLink(
			new App.Medicine.Surgery.Procedures.InseminationFromStored(getSlave(V.AS), "Use a vial of your own", V.PC),
			exit, false));
		r.push(`<span class="detail">You have enough sperm stored away to inseminate ${V.PC.counter.storedCum} more ${V.PC.counter.storedCum > 1 ? "slaves" : "slave"}.</span>`);
		App.Events.addParagraph(f, r);
	}

	function exit() {
		Engine.play("Remote Surgery");
	}

	return f;
};
