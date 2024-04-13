// cSpell:ignore maskirovka

App.Intro.takeoverTarget = function() {
	const slavesImported = V.slaves.filter(s => s.newGamePlus === 1);
	if (slavesImported.length > 0) {
		V.retirementAge = Math.max(V.retirementAge, _.max(slavesImported.map(s => s.actualAge)) + 2);
		const highestActualAge = _.max(slavesImported.map(s => s.actualAge));
		const highestPhysicalAge = _.max(slavesImported.map(s => s.physicalAge));
		if (highestActualAge > 65) {
			V.retirementAge = highestPhysicalAge + 2;
			V.policies.retirement.physicalAgePolicy = 1;
			if (highestPhysicalAge > 65) {
				V.retirementAge = highestActualAge + 2;
				V.policies.retirement.physicalAgePolicy = 0;
			}
		}
	}
	const node = new DocumentFragment();
	const r = [];

	r.push(`Before you deploy the`);
	if (V.PC.rumor === "wealth") {
		r.push(`financial reserves that`);
	} else if (V.PC.rumor === "diligence") {
		r.push(`carefully constructed plan that`);
	} else if (V.PC.rumor === "force") {
		r.push(`mercenaries and`);
		if (V.continent === "Eastern Europe") {
			r.push(`maskirovka`);
		} else {
			r.push(`cover plan`);
		}
		r.push(`that`);
	} else if (V.PC.rumor === "social engineering") {
		r.push(`clever social manipulation that`);
	} else {
		r.push(`optimistic plan you hope`);
	}
	r.push(`will allow you to take over an arcology, you need to select a target. There are a number of vulnerable arcologies that you could`);
	if (V.PC.rumor === "wealth") {
		r.push(`attempt a hostile takeover of`);
	} else if (V.PC.rumor === "diligence") {
		r.push(`work to take over`);
	} else if (V.PC.rumor === "force") {
		r.push(`attack`);
	} else if (V.PC.rumor === "social engineering") {
		r.push(`infiltrate`);
	} else {
		r.push(`aspire to take over`);
	}
	r.push(`with a reasonable chance of success. Free Cities are volatile places, even compared to the troubled state of the rest of the world. There are always arcologies whose owners are on the brink of failure, and you could target one of them.`);
	if (V.PC.career === "arcology owner") {
		r.push(`(Since you've <span class="springgreen">owned an arcology before,</span> you identify more potential target arcologies than a novice might.)`);
	}
	r.push(`Alternatively, arcologies are being built every day, and their owners' control is often uncertain.`);

	r.push(App.UI.DOM.makeElement("div", `Which arcology will you target?`, ["intro", "question"]));
	App.Events.addParagraph(node, r);

	const arcologiesNode = App.UI.DOM.appendNewElement('div', node);

	const generateArcologiesSet = (container) => {
		const card = App.UI.DOM.appendNewElement("div", container, null, ["card"]);
		card.append(App.UI.DOM.passageLink(
			"A newly constructed arcology",
			"Terrain Intro",
			() => V.targetArcology.fs = "New"
		));
		App.UI.DOM.appendNewElement("div", card, `With many new arcologies being constructed, you will be able to select which area of the world and type of Free City you'd like your target arcology to be located in.`, ["indent", "note"]);
		App.UI.DOM.appendNewElement("div", card, `Recommended for new players.`, ["indent", "note"]);

		container.append(App.Intro.generateEstablishedArcologies(true));
	};

	generateArcologiesSet(arcologiesNode);

	node.append(App.UI.DOM.link('Consider more options', () => {
		arcologiesNode.innerHTML = '';
		generateArcologiesSet(arcologiesNode);
	}));

	return node;
};
