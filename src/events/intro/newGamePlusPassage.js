App.Intro.newGamePlus = function() {
	const node = new DocumentFragment();
	V.ui = "start";
	V.slavesToImportMax = V.slavesToImportMax || 5;

	const fee = 50000 + (V.slavesToImportMax * 10000);
	setupLastWeeksCash();
	setupLastWeeksRep();

	App.UI.DOM.appendNewElement("p", node, `You have decided to start over and will be able to take a few things with you: a few slaves, a small fraction of your current reserves of money, and possibly even your experience as an arcology owner, which will give you a very powerful career background. Many of your other customizations and settings will be carried over as the defaults for your new game, but can be revised freely.`);

	if (V.cash >= fee) {
		App.Events.addNode(node, [`You have allocated funds to bring up to ${V.slavesToImportMax} slaves with you (or your equivalent) to a new arcology. It will cost <span class="yellowgreen">${cashFormat(fee)}</span> to ensure another slave's safe transfer. You have <span class="yellowgreen">${cashFormat(V.cash)}</span> to spend.`], "div");
		App.UI.DOM.appendNewElement("div", node, makePurchase(
			"Increase slave import capacity by 1.", fee, "capEx",
			{handler: () => { V.slavesToImportMax++; }}
		));
	} else {
		App.Events.addNode(node, [`You lack the <span class="yellowgreen">${cashFormat(fee)}</span> needed to bring any more than ${V.slavesToImportMax} slaves with you (or your equivalent) to a new arcology.`], "div");
	}

	V.ngpParams = {nationality: getRevivalistNationality(), prosperity: (250 * V.arcologies[0].prosperity * V.arcologies[0].ownership)};
	if (V.freshPC === 0) {
		if (V.retainCareer === 1 && V.PC.career !== "arcology owner") {
			if (V.week > 52 || (V.PC.skill.slaving >= 100 && V.PC.skill.trading >= 100 && V.PC.skill.warfare >= 100 && V.PC.skill.engineering >= 100 && V.PC.skill.medicine >= 100 && V.PC.skill.hacking >= 100)) {
				App.Events.addNode(node, [`You have acquired a fair amount of knowledge regarding arcologies and their day-to-day management in your time spent as one's owner qualifying you as an <span class="orange">"arcology owner"!</span> Benefits include:`], "div");
				for (const text of [
					`20% reduced cost of construction.`,
					`Free additional starting rep along with easy rep maintenance.`,
					`Reduced mercenary costs.`,
					`An eye for gingered slaves.`,
					`An edge in all things data.`
				]) {
					App.UI.DOM.appendNewElement("div", node, text, ["lime"]);
				}
				V.oldCareer = V.PC.career;
				if (V.retainCareer === 1) {
					App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
						"Change career.",
						() => {
							V.retainCareer = 0;
							V.PC.career = "arcology owner";
							App.UI.reload();
						}
					));
				}
			} else {
				App.UI.DOM.appendNewElement("div", node, `You lack the experience needed to qualify for a career change to "arcology owner".`);
			}
		}
		if (V.retainCareer === 0 && V.PC.career === "arcology owner") {
			App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
				"Don't change career.",
				() => {
					V.retainCareer = 1;
					V.PC.career = V.oldCareer;
					App.UI.reload();
				}
			));
		}
		App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
			"Start over with a new player character.",
			() => {
				V.freshPC = 1;
				V.retainCareer = 1;
				App.UI.reload();
			}
		));
	} else {
		App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
			"Use existing player character.",
			() => {
				V.freshPC = 0;
				App.UI.reload();
			}
		));
	}

	if (V.cheatMode === 1) {
		App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
			"DEBUG: Add all slaves to import list",
			() => {
				V.slaves.forEach(s => assignJob(s, Job.IMPORTED));
				App.UI.reload();
			}
		));
	}
	App.UI.DOM.appendNewElement("div", node, App.Events.makeNode([
		`Select up to ${V.slavesToImportMax} slaves to be imported into a new game and then click`,
		App.UI.DOM.link(
			"here.",
			() => {
				V.saveImported = 1;
				V.oldCareer = "undefined";
			}, [], "Alpha disclaimer",
		)
	]));
	node.append(App.UI.SlaveList.listNGPSlaves());

	return node;
};
