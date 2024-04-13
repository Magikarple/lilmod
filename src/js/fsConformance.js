/** Utilities to list slave basing on their conformance to FS policies */
App.FSConformance = function() {
	/** @type {Record<FC.FSHumanDevelopmentVector, [FC.FutureSocietyDeco, FC.FutureSocietyDeco]>} */
	const decosForVector = {
		[FSHumanVector.AGE]: ['Maturity Preferentialist', 'Youth Preferentialist'],
		[FSHumanVector.HEIGHT]: ['Statuesque Glorification', 'Petite Admiration'],
		[FSHumanVector.WEIGHT]: ['Hedonistic', 'Physical Idealist'],
		[FSHumanVector.MODIFICATIONS]: ['Transformation Fetishist', 'Body Purist'],
		[FSHumanVector.ASSETS]: ['Asset Expansionist', 'Slimness Enthusiast'],
		[FSHumanVector.INTELLIGENCE]: ['Slave Professionalism', 'Intellectual Dependency'],
		[FSHumanVector.GENDER]: ['Gender Radicalist', 'Gender Fundamentalist'],
		[FSHumanVector.BREEDING]: ['Repopulationist', 'Eugenics'],
		[FSHumanVector.LIFE_QUALITY]: ['Paternalist', 'Degradationist'],
	};

	function anyVectorsDefined() {
		return Object.values(FSHumanVector).some(v => FutureSocieties.humanVector(v, V.arcologies[0]) !== null);
	}

	/**
	 * @param {{slave: FC.ReportSlave, effects: FC.SlaveSocialEffect[]}[]} slavesWithEffects
	 * @param {FC.FutureSocietyDeco} fsDeco
	 * @returns {{slave: FC.ReportSlave, magnitude: number}[]}
	 */
	function affectedSlaves(slavesWithEffects, fsDeco) {
		return slavesWithEffects
			.filter(item => item.effects.some(ef => fsDeco === ef.FS))
			.map(item => {
				const totalMagnitude = item.effects.filter(ef => fsDeco === ef.FS).reduce((total, ef) => total + ef.magnitude, 0);
				return {slave: item.slave, magnitude: totalMagnitude};
			});
	}

	/**
	 * @param {{slave: FC.ReportSlave, magnitude: number}[]} slavesWithEffects
	 * @param {FC.FutureSocietyDeco} deco
	 * @param {boolean} top
	 */
	function listSlaves(slavesWithEffects, deco, top) {
		if (top) {
			slavesWithEffects.sort((left, right) => right.magnitude - left.magnitude);
		} else {
			slavesWithEffects.sort((left, right) => left.magnitude - right.magnitude);
		}

		return App.UI.SlaveList.render(
			slavesWithEffects.slice(0, V.underperformersCount).map(item => item.slave.ID),
			[],
			App.UI.SlaveList.SlaveInteract.stdInteract,
		);
	}

	function slaveConformancePassage() {
		const node = new DocumentFragment();
		const r = [];
		r.push(App.UI.DOM.makeElement("div", `${properMaster()}, while you spend numerous hours and put a lot of efforts to shape the society in your arcology for the envisioned future, you might be interested to know how well your own slaves conform to that vision.`));

		App.Events.addParagraph(node, r);

		/** @type {{slave: FC.ReportSlave, effects: FC.SlaveSocialEffect[]}[]} */
		const slaveSocialEffects = [];
		for (const rpSlave of App.SlaveAssignment.reportSlaves(V.slaves)) {
			slaveSocialEffects.push({slave: rpSlave, effects: App.SlaveAssignment.saSocialEffects(rpSlave).effects()});
		}

		const conformandDiv = App.UI.DOM.makeElement("div");
		const conformantTabBar = new App.UI.Tabs.TabBar("fs-conformance-list");

		const nonConformantDiv = App.UI.DOM.makeElement("div");
		const nonConformantTabBar = new App.UI.Tabs.TabBar("fs-non-conformance-list");

		for (const vector of Object.values(FSHumanVector)) {
			const vectorValue = FutureSocieties.humanVector(vector, V.arcologies[0]);
			if (vectorValue === null) { continue; }
			const deco = vectorValue > 0 ? decosForVector[vector][0] : decosForVector[vector][1];

			const slavesForDeco = affectedSlaves(slaveSocialEffects, deco);

			conformantTabBar.addTab(deco, `${deco}-conform`, listSlaves(slavesForDeco.filter(item => item.magnitude > 0), deco, true));
			nonConformantTabBar.addTab(deco, `${deco}-non-conform`, listSlaves(slavesForDeco.filter(item => item.magnitude <= 0), deco, false));
		}

		conformandDiv.append(conformantTabBar.render());
		nonConformantDiv.append(nonConformantTabBar.render());

		node.append(App.UI.DOM.accordion("Conformant", conformandDiv));
		node.append(App.UI.DOM.accordion("Non-conformant", nonConformantDiv));

		const g = new App.UI.OptionsGroup();
		g.addOption("Maximum number of slaves", "underperformersCount")
			.addValue("Default", 7).showTextBox();
		node.append(g.render());

		V.nextButton = "Back";
		V.nextLink = "Future Society";

		return node;
	}

	return {
		anyVectorsDefined,
		slaveConformancePassage,
	};
}();
