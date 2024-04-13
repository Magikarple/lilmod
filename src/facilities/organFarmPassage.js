App.UI.organFarm = function() {
	const node = new DocumentFragment();
	const PCSkillCheck = Math.min(V.upgradeMultiplierMedicine, V.HackingSkillMultiplier);

	App.UI.DOM.appendNewElement("h1", node, "The Organ Farm");

	const status = {
		1: "The organ farm is running smoothly. It can grow tailored organs for implantation in slaves. It can easily produce altered variants should you obtain the data necessary to create them.",
		2: "The organ farm is running smoothly. It can quickly grow tailored organs for implantation in slaves, though there will be side-effects. It can easily produce altered variants should you obtain the data necessary to create them.",
		3: "The organ farm is running smoothly. It can rapidly grow tailored organs for implantation in slaves. It can easily produce altered variants should you obtain the data necessary to create them."
	};

	App.UI.DOM.appendNewElement('div', node, App.Ratings.numeric(status, V.organFarmUpgrade), ['scene-intro']);

	/**
	 * @param {string} note
	 * @param {ParentNode} parentNode
	 */
	const appendNote = (note, parentNode) => {
		App.UI.DOM.appendNewElement("div", parentNode, note, "note");
	};

	/**
	 * @param {string} message
	 * @param {ParentNode} [parentNode]
	 */
	const upgradeImpossible = (message, parentNode) => {
		appendNote(message, parentNode ?? node);
	};

	/**
	 * @param {ParentNode} node
	 * @param {number} reputationReqBase
	 * @param {string} label
	 * @param {string[]} notes
	 * @param {number} costsBase
	 * @param {function(): void} handler
	 * @param {string} lackRepSubject
	 */
	const upgradeOption = (node, reputationReqBase, label, notes, costsBase, handler, lackRepSubject = '') => {
		if (V.rep < reputationReqBase * PCSkillCheck) {
			upgradeImpossible(`You lack the reputation to ${lackRepSubject}.`, node);
		} else {
			node.appendChild(makePurchase(label, costsBase * PCSkillCheck, "capEx", {
				notes,
				handler,
			}));
		}
	};

	if (V.organFarmUpgrade < 3 && V.rep <= 10000 * PCSkillCheck) {
		upgradeImpossible("You lack the reputation to access experimental organ farm parts.");
	} else if (V.dispensary === 0 && V.organFarmUpgrade === 2) {
		upgradeImpossible("An upgraded pharmaceutical fabricator is required by the perfected organ farm.");
	} else if (V.dispensary === 0 && V.organFarmUpgrade === 1) {
		upgradeImpossible("A pharmaceutical fabricator is required to produce the chemicals for the accelerated organ farm.");
	} else if (V.dispensaryUpgrade === 0 && V.organFarmUpgrade === 2) {
		upgradeImpossible("The pharmaceutical fabricator must be upgraded in order to produce the drugs required by the perfected organ farm.");
	} else if (V.organs.length > 0) {
		upgradeImpossible("The organ farm cannot be upgraded while it is use.");
	} else if (V.rep > 10000 * PCSkillCheck) {
		if (V.organFarmUpgrade === 2) {
			upgradeOption(node, 10_000, "Upgrade the organ farm to the cutting edge model",
				["will allow the organ farm to rapidly grow organs without risk to the implantee's health."],
				150_000, () => { V.organFarmUpgrade = 3; },
				""
			);
		} else if (V.organFarmUpgrade === 1) {
			upgradeOption(node, 10_000, "Upgrade the organ farm with an experimental growth accelerator",
				["will allow the organ farm to quickly grow organs. Implanted organs may cause health issues."],
				75_000, () => { V.organFarmUpgrade = 2; },
				""
			);
		}
	}

	if (V.youngerOvaries > 0) {
		App.UI.DOM.appendNewElement("div", node, "The organ farm is capable of growing fertile ovaries for postmenopausal slaves.");
	} else {
		upgradeOption(node, 10_000, "Purchase designs for cloning fertile ovaries for menopausal slaves",
			["will allow the growth of younger, fertile ovaries for menopausal slaves. Restored fertility will only last for a couple years at most."],
			30_000, () => { V.youngerOvaries = 1; },
			"access designs for cloning fertile ovaries for menopausal slaves"
		);
	}

	if (V.immortalOvaries > 0) {
		App.UI.DOM.appendNewElement("div", node, "The organ farm is capable of growing genetically modified ovaries that will never undergo menopause.");
	} else if (V.immortalityFormula > 0 && V.youngerOvaries > 0) {
		upgradeOption(node, 10_000, "Fund research into applying the immortality formula to ovaries",
			["will allow the growth of genetically modified ovaries that continually regenerate their ovarian follicles, thus never undergoing menopause. As long as the body remains young, it shall remain fertile."],
			1_000_000, () => { V.immortalOvaries = 1; },
			"fund additional fertility-focused research into the immortality project"
		);
	} else if (V.immortalityFormula > 0) {
		appendNote("You must acquire the designs to clone younger ovaries before you can research ovary immortality.", node);
	} // invisible without immortality formula

	if (V.asexualReproduction === 1) {
		App.UI.DOM.appendNewElement("div", node, "The organ farm is capable of growing modified ovary pairs capable of self-fertilization.");
	}

	if (V.seePreg !== 0 && V.seeBestiality === 1 && V.experimental.animalOvaries === 1) {
		if (V.animalOvaries < 1) {
			appendNote("You lack the required designs for cloning animal ovaries for slaves.", node);
		} else {
			App.UI.DOM.appendNewElement('div', node, "The organ farm is capable of growing animal ovaries for slaves.");
		}

		if (V.animalTesticles < 1) {
			appendNote("You lack the required designs for cloning animal testicles for slaves.", node);
		} else {
			App.UI.DOM.appendNewElement("div", node, "The organ farm is capable of growing animal testicles for slaves.");
		}

		if (V.arcologies[0].FSGenderRadicalistResearch === 1) {
			if (V.animalMpreg < 1) {
				appendNote("You lack the required designs for cloning animal anal wombs and ovaries for slaves.", node);
			} else {
				App.UI.DOM.appendNewElement("div", node, "The organ farm is capable of growing animal anal wombs and ovaries for slaves.");
			}
		}
	}

	App.UI.DOM.appendNewElement("h2", node, "Organ Production");
	App.UI.DOM.appendNewElement("p", node, App.Medicine.OrganFarm.currentlyGrowing());

	App.UI.DOM.appendNewElement("h2", node, "Future Societies Research");

	if (V.seePreg !== 0) {
		if (V.arcologies[0].FSGenderRadicalistDecoration === 100) {
			if (V.arcologies[0].FSGenderRadicalistResearch === 0) {
				upgradeOption(node, 10_000, "Fund research into developing male pregnancy methods",
					["will allow cloning and production of anal uteri and ovaries."],
					50_000, () => { V.arcologies[0].FSGenderRadicalistResearch = 1; },
					"access the research necessary to develop anal uteri and ovaries"
				);
			} else {
				App.UI.DOM.appendNewElement("div", node, "The organ farm has been upgraded with schematics for modified uteri and ovaries.");
			}
		} else {
			appendNote("Gender Radicalist focused research unavailable.", node);
		}
	}
	return node;
};
