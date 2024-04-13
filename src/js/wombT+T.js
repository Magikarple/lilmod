/** @file defines functions that have to do with transplanting and termination of fetuses */

/**
 * @param {FC.HumanState} mother the mother of the fetus
 * @param {App.Entity.Fetus} fetus the fetus to check
 * @returns {boolean} true if the fetus can be terminated, false otherwise
 */
globalThis.canTerminateFetus = (mother, fetus) => {
	if (mother.womb.indexOf(fetus) === -1) { throw new Error("mother.womb must contain fetus"); }
	return (
		(
			fetus.age <= 4 &&
			(
				!FutureSocieties.isActive('FSRestart') ||
				V.eugenicsFullControl === 1 ||
				mother.breedingMark === 0 ||
				V.propOutcome === 0 ||
				fetus.fatherID !== -6
			)
		) ||
		V.cheatMode === 1
	);
};

/**
 * @param {FC.HumanState} mother the mother of the fetus
 * @param {App.Entity.Fetus} fetus the fetus to check
 * @returns {-1|0|1} -1 = has already been transpanted, 0 = cannot be transpanted, 1 = can be transplanted
 */
globalThis.canTransplantFetus = (mother, fetus) => {
	if (fetus.motherID !== mother.ID) {
		return -1;
	} else if (
		(
			fetus.age <= 6 &&
			V.surgeryUpgrade > 0 &&
			(
				!FutureSocieties.isActive('FSRestart') ||
				V.eugenicsFullControl === 1 ||
				mother.breedingMark === 0 ||
				V.propOutcome === 0 ||
				fetus.fatherID !== -6
			)
		) ||
		V.cheatMode === 1
	) {
		return 1;
	}
	return 0;
};

/**
 * @param {number} fetusCount the amount of fetuses being transplanted
 * @returns {number} the cost of the operation
 */
globalThis.calculateTransplantingCost = (fetusCount) => {
	let transplantingCost = V.surgeryCost * 2;
	if (fetusCount > 1) {
		// bulk transplanting cost more per each fetus transplanted, but is cheaper than transplanting them one at a time
		transplantingCost += Math.floor(Math.max(1, V.surgeryCost/10)) * fetusCount - 1;
	}
	return transplantingCost;
};

/**
 * @param {FC.HumanState} mother
 * @param {App.Entity.Fetus[]|App.Entity.Fetus} fetuses fetus to terminate or array of fetuses to terminate
 */
globalThis.terminateFetus = (mother, fetuses) => {
	if (!Array.isArray(fetuses)) {
		fetuses = [fetuses];
	}

	fetuses.reverse().forEach((fetus) => {
		const fetusIndex = mother.womb.indexOf(fetus);
		if (fetusIndex === -1) { return; }
		WombRemoveFetus(mother, fetusIndex);
	});
	if (mother.preg === 0) {
		mother.pregWeek = -1;
	}
};

/**
 * @param {FC.HumanState} mother
 * @param {App.Entity.Fetus[]} fetuses
 * @param {HTMLDivElement} bulkTerminateDiv
 * @param {number} terminatingCount
 * @param {Function} [terminatedCallback=undefined]
 * @param {any[]} [terminatedCallbackArgs=undefined]
 */
globalThis.BulkTerminateTool = (mother, fetuses, bulkTerminateDiv, terminatingCount, terminatedCallback = undefined, terminatedCallbackArgs = undefined) => {
	bulkTerminateDiv.innerHTML = "";
	let terminatableFetuses = fetuses.filter((fetus) => canTerminateFetus(mother, fetus));
	let r = new SpacedTextAccumulator();

	r.push("Terminating");
	r.push(App.UI.DOM.makeTextBox(
		terminatingCount,
		(value) => {
			if (value > terminatableFetuses.length) { value = terminatableFetuses.length; }
			if (value < 1) { value = 1; }
			// refresh
			BulkTerminateTool(mother, fetuses, bulkTerminateDiv, value, terminatedCallback, terminatedCallbackArgs);
		},
		true
	));
	r.push(`out of ${terminatableFetuses.length} fetuses`);
	r.toParagraph();
	bulkTerminateDiv.append(r.container());
	const options = new App.UI.OptionsGroup();
	options.customRefresh(() => {
		// take terminatingCount fetuses out of terminatableFetuses
		let processing = terminatableFetuses.slice(0, terminatingCount);
		// remove contents for each terminated fetus
		processing.forEach(fetus => {
			let jDiv = $(`#fetus-id-${fetus.ID}`);
			if (jDiv && jDiv.length !== 0) {
				jDiv.empty().append("Fetus terminated");
			}
		});
		// terminate fetuses
		terminateFetus(mother, processing);
		if (terminatedCallback) {
			if (terminatedCallbackArgs) {
				terminatedCallback(...terminatedCallbackArgs);
			} else {
				terminatedCallback();
			}
		}
	});
	options.addOption("", "do", {do: false})
		.addValue(`Terminate ${num(terminatingCount)} fetuses`, true);
	bulkTerminateDiv.append(options.render());
};

/**
 * Sets everything up and then calls App.UI.surrogacy()
 * @param {FC.HumanState} mother
 * @param {FC.HumanState} receptrix
 * @param {App.Entity.Fetus[]|App.Entity.Fetus} fetuses fetus to transplant or array of fetuses to transplant
 * @param {boolean} [dialogInsteadOfPassageTraversal=false] if true use a dialog box, otherwise traverse to App.UI.surrogacy()
 */
globalThis.transplantFetus = (mother, receptrix, fetuses, dialogInsteadOfPassageTraversal = false) => {
	if (!Array.isArray(fetuses)) {
		fetuses = [fetuses];
	}
	if (fetuses.length === 0) { return; }
	if (V.donatrix !== mother.ID) {
		V.donatrix = mother.ID;
	}
	if (V.receptrix !== receptrix.ID) {
		V.receptrix = receptrix.ID;
	}
	if (V.transplantFetuses !== fetuses) {
		V.transplantFetuses = fetuses;
	}
	cashX(forceNeg(calculateTransplantingCost(fetuses.length)), (receptrix.ID === -1) ? "PCmedical": "slaveSurgery");
	V.surgeryType = "transplant";
	if (dialogInsteadOfPassageTraversal) {
		Dialog.setup("Transplant Fetus");
		Dialog.append(App.UI.surrogacy());
		Dialog.open();
	} else {
		V.nextLink = passage();
		// traverse to App.UI.surrogacy()
		Engine.play("Surrogacy");
	}
};

/**
 * @param {FC.HumanState} mother
 * @param {App.Entity.Fetus[]|App.Entity.Fetus} fetuses
 * @param {HTMLDivElement} transplantDiv
 * @param {number} transplantingCount
 * @param {Function} [transplantedCallback=undefined]
 * @param {any[]} [transplantedCallbackVariables=undefined] variables to pass to transplantedCallback
 * @param {boolean} [dialogInsteadOfPassageTraversal=false] passed to transplantFetus()
 */
globalThis.transplantingTool = (
	mother, fetuses,
	transplantDiv, transplantingCount,
	transplantedCallback = undefined, transplantedCallbackVariables = undefined,
	dialogInsteadOfPassageTraversal = false
) => {
	if (!Array.isArray(fetuses)) { fetuses = [fetuses]; }

	transplantDiv.innerHTML = "";
	let transplantableFetuses = fetuses.filter((fetus) => canTransplantFetus(mother, fetus) === 1);
	let r = new SpacedTextAccumulator();

	r.push("Transplanting");
	if (transplantableFetuses.length > 1) {
		r.push(App.UI.DOM.makeTextBox(
			transplantingCount,
			(value) => {
				if (value > transplantableFetuses.length) { value = transplantableFetuses.length; }
				if (value < 1) { value = 1; }
				// refresh
				transplantingTool(
					mother, fetuses,
					transplantDiv, value,
					transplantedCallback, transplantedCallbackVariables,
					dialogInsteadOfPassageTraversal
				);
			},
			true
		));
		r.push(`out of ${transplantableFetuses.length}`);
	} else {
		transplantingCount = 1;
		r.push(num(transplantingCount));
	}
	r.push((transplantingCount === 1) ? "fetus.": "fetuses.");
	r.toParagraph();
	transplantDiv.append(r.container());

	// Slave selector
	let eligibility = 0;
	let options = new App.UI.OptionsGroup();
	options.customRefresh(() => {
		// refresh
		transplantingTool(
			mother, fetuses,
			transplantDiv, transplantingCount,
			transplantedCallback, transplantedCallbackVariables,
			dialogInsteadOfPassageTraversal
		);
	});
	let option = options.addOption(`Select a host`, "receptrix");

	App.UI.DOM.appendNewElement("h4", transplantDiv, "Slave details");
	for (const slave of V.slaves) {
		if ((mother.ID !== slave.ID && slave.ovaries > 0 || slave.mpreg > 0) &&
			isSlaveAvailable(slave) && slave.preg >= 0 && slave.preg < slave.pregData.normalBirth / 10 &&
			slave.pregWeek >= 0 && slave.pubertyXX === 1 && slave.pregType < 12 &&
			slave.bellyImplant === -1 && slave.broodmother === 0 && slave.inflation <= 2 && slave.physicalAge < 70
		) {
			const slaveView = App.UI.DOM.appendNewElement("div", transplantDiv, App.SlaveAssignment.saSlaveName(slave));
			if (slave.pregType === 0) { // TODO:@franklygeorge adaptive to the amount of fetuses selected for transplanting
				App.UI.DOM.appendNewElement("span", slaveView, "  Their womb is empty", ["note", "green"]);
			} else if (slave.pregType >= 4) { // TODO:@franklygeorge adaptive to the amount of fetuses selected for transplanting
				App.UI.DOM.appendNewElement("span", slaveView, `  Using a slave carrying multiples is inadvisable; Their womb already has ${num(slave.pregType)} fetuses in it`, ["note", "red"]);
			} else { // TODO:@franklygeorge adaptive to the amount of fetuses selected for transplanting
				App.UI.DOM.appendNewElement("span", slaveView, `  Their womb already has ${num(slave.pregType)} fetuses in it`, ["note", "yellow"]);
			}
			option.addValue(SlaveFullName(slave), slave.ID);
			eligibility = 1;
		}
	}
	if (eligibility === 0) {
		App.UI.DOM.appendNewElement("div", transplantDiv, "You have no slaves capable of acting as a surrogate.");
	}

	if (V.PC.vagina !== -1 && mother.ID !== -1 && V.PC.preg >= 0 && V.PC.preg < 4 && V.PC.pregType < 8 && V.PC.physicalAge < 70) {
		if (V.PC.womb.length === 0) { // TODO:@franklygeorge adaptive to the amount of fetuses selected for transplanting
			App.UI.DOM.appendNewElement("h4", transplantDiv, "Your womb is empty.", ["green"]);
		} else if (V.PC.pregType >= 4) { // TODO:@franklygeorge adaptive to the amount of fetuses selected for transplanting
			App.UI.DOM.appendNewElement("span", transplantDiv, `Putting another child in your womb is inadvisable; Your womb already has ${num(V.PC.pregType)} fetuses in it.`, ["red"]);
		} else { // TODO:@franklygeorge adaptive to the amount of fetuses selected for transplanting
			App.UI.DOM.appendNewElement("h4", transplantDiv, `Your womb has enough room for ${(transplantingCount === 1) ? "another child": "more children"}.`, ["yellow"]);
		}
		option.addValue("Use your own womb", -1);
	}
	option.addValue("Undecided", 0);
	transplantDiv.append(options.render());

	// finalize button
	if (V.receptrix !== 0) {
		let transplantCommitButton = new App.UI.OptionsGroup();
		transplantCommitButton.customRefresh(() => {
			// take transplantingCount fetuses out of transplantableFetuses
			let processing = transplantableFetuses.slice(0, transplantingCount);
			// remove contents for each transplanted fetus
			processing.forEach(fetus => {
				let jDiv = $(`#fetus-id-${fetus.ID}`);
				if (jDiv && jDiv.length !== 0) {
					// change the id of div
					// this fixes a bug where the old div is still on the dom but not visible anymore (SugarCube's history functionality)
					// and so it gets the new contents that we don't want it to get
					jDiv.attr('id', `#fetus-id-${fetus.ID}-transplanted`);

					// notify the user that the transplanting was successful
					jDiv.empty().append(
						"Fetus has been transplanted into ",
						(V.receptrix === -1) ? "your": App.SlaveAssignment.saSlaveName(getSlave(V.receptrix)),
						(V.receptrix === -1) ? "": "'s",
						" womb."
					);
				}
				// Set fate to "undecided" so that the event will come up for the new mother. Also stops an infinite recursion loop, so don't remove it unless you know what you are doing
				fetus.noticeData.fate = "undecided";
			});

			// If new mother is in the list of already processed slaves remove them from the list
			V.pregnancyNotice.processedSlaves = V.pregnancyNotice.processedSlaves.filter((id) => {
				return (id !== V.receptrix);
			});

			// transplant fetuses
			transplantFetus(mother, (V.receptrix === -1) ? V.PC : getSlave(V.receptrix), processing, dialogInsteadOfPassageTraversal);

			if (transplantedCallback) {
				if (Array.isArray(transplantedCallbackVariables)) {
					transplantedCallback(...transplantedCallbackVariables);
				} else {
					transplantedCallback();
				}
			}
		});
		let transplantCommitOption = transplantCommitButton.addOption("", "do", {do: false});
		if (transplantingCount === 1) {
			transplantCommitOption.addValue(`Transplant fetus into ${(V.receptrix === -1) ? "your womb" : SlaveFullName(getSlave(V.receptrix)) + "'s womb"}`, true);
		} else {
			transplantCommitOption.addValue(`Transplant ${num(transplantingCount)} fetuses into ${(V.receptrix === -1) ? "your womb" : SlaveFullName(getSlave(V.receptrix)) + "'s womb"}`, true);
		}
		transplantCommitButton.addComment(`This will cost ${cashFormat(calculateTransplantingCost(transplantingCount))}`);
		transplantDiv.append(transplantCommitButton.render());
	}
};

/**
 * @typedef {object} transplantAndTerminateButtonsOptions
 * @property {string} [transplantText]
 * @property {string} [transplantAllText]
 * @property {string} [terminateText]
 * @property {string} [terminateAllText]
 * @property {"both"|"terminate"|"transplant"} [mode="both"]
 * @property {App.Entity.Fetus} [fetus] the fetus to process, if undefined then we will process all eligible fetuses
 * @property {Function} [callback] calls Engine.play(passage()) if not defined
 * @property {any[]} [callbackArgs]
 */

/**
 * @param {FC.HumanState} mother
 * @param {HTMLElement|DocumentFragment} element the element to attach elements to
 * @param {transplantAndTerminateButtonsOptions} options
 */
globalThis.transplantAndTerminateButtons = function(mother, element, options = {}) {
	/** @type {transplantAndTerminateButtonsOptions} */
	const defaultOptions = {
		transplantText: "",
		transplantAllText: undefined,
		terminateText: "",
		terminateAllText: undefined,
		mode: "both",
		fetus: undefined,
		callback: Engine.play,
		callbackArgs: [passage()],
	};
	options = options || {};
	for (const key in defaultOptions) {
		if (!(key in options)) {
			options[key] = defaultOptions[key];
		}
	}

	/** @type {App.Entity.Fetus[]} */
	let fetuses = [];
	if (options.fetus) {
		fetuses = [options.fetus];
	} else {
		fetuses = mother.womb;
	}

	const terminatable = fetuses.filter((fetus) => canTerminateFetus(mother, fetus) || V.cheatMode !== 0);
	const transplantable = fetuses.filter((fetus) => canTransplantFetus(mother, fetus) === 1 || V.cheatMode !== 0);

	let div = App.UI.DOM.makeElement("div");

	let optionGroup = new App.UI.OptionsGroup();
	let choice = {
		/** @type {"close"|"terminate"|"transplant"} */
		choice: "close"
	};
	optionGroup.customRefresh(() => {
		div.innerHTML = "";
		if (choice.choice === "terminate") {
			if (terminatable.length === 1) {
				const terminateButton = new App.UI.OptionsGroup();
				terminateButton.customRefresh(() => {
					terminateFetus(mother, terminatable);
					if (options.callbackArgs) {
						options.callback(...options.callbackArgs);
					} else {
						options.callback();
					}
				});
				terminateButton.addOption("", "do", {do: false})
					.addValue(`Terminate fetus`, true);
				div.append(terminateButton.render());
			} else {
				BulkTerminateTool(mother, terminatable, div, terminatable.length, options.callback, options.callbackArgs);
			}
		} else if (choice.choice === "transplant") {
			transplantingTool(mother, transplantable, div, transplantable.length, options.callback, options.callbackArgs, false);
		}
	});

	if ((V.pregnancyMonitoringUpgrade && V.surgeryUpgrade === 1) || V.cheatMode !== 0) {
		["transplantText", "transplantAllText"].forEach(key => {
			if (options[key] && options[key] !== "") {
				options[key] = options[key].replace(/#transplantable/g, num(transplantable.length));
				options[key] = options[key].replace(/#fetuses/g, (transplantable.length === 1) ? "fetus" : "fetuses");
			}
		});

		["terminateText", "terminateAllText"].forEach(key => {
			if (options[key] && options[key] !== "") {
				options[key] = options[key].replace(/#terminatable/g, num(terminatable.length));
				options[key] = options[key].replace(/#fetuses/g, (terminatable.length === 1) ? "fetus" : "fetuses");
			}
		});
		let buttons = optionGroup.addOption("", "choice", choice);
		if (transplantable.length > 0 && options.mode !== "terminate") {
			if (transplantable.length === fetuses.length && options.transplantAllText) {
				buttons.addValue(options.transplantAllText, "transplant");
			} else {
				buttons.addValue(options.transplantText, "transplant");
			}
		}
		if (terminatable.length > 0 && options.mode !== "transplant") {
			if (terminatable.length === fetuses.length && options.terminateAllText) {
				buttons.addValue(options.terminateAllText, "terminate");
			} else {
				buttons.addValue(options.terminateText, "terminate");
			}
		}
		if (choice.choice !== "close") {
			buttons.addValue("Close", "close");
		}
	}
	// add buttons to dom
	element.append(optionGroup.render());
	// add div to dom
	element.append(div);

	return optionGroup;
};
