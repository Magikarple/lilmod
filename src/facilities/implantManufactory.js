App.UI.implantManufactory = function() {
	const node = new DocumentFragment();

	const PCSkillCheck = Math.min(V.upgradeMultiplierMedicine, V.HackingSkillMultiplier);

	/**
	 * @param {ParentNode} node
	 * @param {number} reputationReqBase
	 * @param {string} label
	 * @param {string[]} notes
	 * @param {number} costsBase
	 * @param {function(): void} handler
	 * @param {string} [lackRepSubject]
	 */
	const upgradeOption = (node, reputationReqBase, label, notes, costsBase, handler, lackRepSubject = '') => {
		const lackRepText = () => lackRepSubject ? lackRepSubject : `access ${label}`;

		if (V.rep < reputationReqBase * PCSkillCheck) {
			App.UI.DOM.appendNewElement('div', node, `You lack the reputation to ${lackRepText()}.`, ['note']);
		} else {
			node.appendChild(makePurchase(`Purchase ${label}`, costsBase * PCSkillCheck, "capEx", {
				notes,
				handler,
			}));
		}
	};

	App.UI.DOM.appendNewElement("h1", node, "The Implant Manufactory");

	App.UI.DOM.appendNewElement("p", node, `The implant manufactory is running smoothly. It can cheaply produce advanced implants and has freed you from relying on outside sources for specialty implants. It can easily produce more complex implants should you obtain the schematics necessary to build them.`, ["scene-intro"]);

	App.UI.DOM.appendNewElement("h2", node, "Implant Production");

	App.UI.DOM.appendNewElement("div", node, "The manufactory is capable of producing customized fillable implants.");

	if (V.meshImplants > 0) {
		App.UI.DOM.appendNewElement("div", node, "The manufactory is capable of producing supportive mesh breast implants.");
	} else {
		upgradeOption(node, 10_000, "plans for supportive mesh breast implants", ["will allow the construction of organic and supportive mesh breast implants."],
			40_000, () => { V.meshImplants = 1; });
	}

	if (V.UterineRestraintMesh === 1) {
		App.UI.DOM.appendNewElement("div", node, "The manufactory is capable of producing supportive mesh uterine implants.");
	}

	if (V.bellyImplants === 0) {
		upgradeOption(node, 2000, "schematics for fillable abdominal implants", ["will allow the construction of fillable abdominal implants for the autosurgery."],
			30_000, () => { V.bellyImplants = 1; },
			"access experimental schematics for fillable abdominal implants");
	} else if (V.bellyImplants > 0) {
		App.UI.DOM.appendNewElement("div", node, "The manufactory is capable of crafting fillable abdominal implants.");
		if (V.bellyImplants === 1 && V.cervixImplants === 0) { /* show only after belly implants already researched */
			/* nanotech like technology much more impressive and costly than simple implant */
			upgradeOption(node, 6000, "schematics for cervix filter micropumps", ["will allow the construction of cervix filter micropumps for fillable abdominal implants using the autosurgery."],
				70_000, () => { V.cervixImplants = 1; },
				"access experimental cervix filter micropumps schematics for abdominal implants");
		} else if (V.cervixImplants === 1) {
			App.UI.DOM.appendNewElement("div", node, "The manufactory is capable of crafting cervix filter micropumps for fillable abdominal implants.");
			upgradeOption(node, 8_000, "conversion kits for rectal filter micropumps", ["will allow the construction of the anal equivalent of the cervix micropumps using the autosurgery."],
				60_000, () => { V.cervixImplants = 2; },
				"obtain conversion kits for rectal filter micropumps"
			);
		} else if (V.cervixImplants > 1) {
			App.UI.DOM.appendNewElement("div", node, "The manufactory is capable of crafting cervix and rectal filter micropumps for fillable abdominal implants.");
		}
	}

	if (V.seePreg !== 0) {
		App.UI.DOM.appendNewElement("h2", node, "Fertility Implants");

		if (V.fertilityImplant === 1) {
			App.UI.DOM.appendNewElement("div", node, "The manufactory is capable of crafting fertility enhancing implants for ovaries.");
		} else {
			upgradeOption(node, 3_000, "fertility enhancing ovarian implants", ["will allow the construction of implants that encourage multiple eggs being released during ovulation."],
				10_000, () => { V.fertilityImplant = 1; },
				"access fertility boosting ovarian implants"
			);
		}

		if (V.sympatheticOvaries === 1) {
			App.UI.DOM.appendNewElement("div", node, "The manufactory is capable of crafting implants that synchronize ovum release.");
		}

		if (V.seeHyperPreg === 1 && V.seeExtreme === 1) {
			if (V.permaPregImplant === 0) {
				upgradeOption(node, 4_000, "schematics for an experimental implantable pregnancy generator", ["will allow the construction of implants that force perpetual pregnancy."],
					40_000, () => { V.permaPregImplant = 1; },
					"access experimental pregnancy generator schematics");
			} else if (V.permaPregImplant > 0) {
				App.UI.DOM.appendNewElement("div", node, "The manufactory is capable of crafting pregnancy generators.");
			}
			if (V.PGHack === 1) {
				App.UI.DOM.appendNewElement("div", node, "The tools required to hack the firmware of basic pregnancy generator implants have been produced by the manufactory for use in the remote surgery.");
			}
		}
	}

	App.UI.DOM.appendNewElement("h2", node, "Fluid Production Implants");

	if (V.prostateImplants !== 1) {
		upgradeOption(node, 3_000, "plans for ejaculation enhancing prostate implants",
			["will allow the construction of a prostate implant designed to stimulate fluid production for massive ejaculations. Beware of leaking and dehydration."],
			30_000, () => { V.prostateImplants = 1; },
			"access plans for prostate implants"
		);
	} else if (V.prostateImplants > 0) {
		App.UI.DOM.appendNewElement("div", node, "The manufactory is capable of producing ejaculation enhancing prostate implants.");
	}
	return node;
};
