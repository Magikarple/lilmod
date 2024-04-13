App.Events.PregnancyNotice = {};

/**
 * Notifies the player of a slave pregnancy at 2 weeks of gestation
 * This event is controlled by the v.pregnancyNotice.enabled variable, which must be true
 * This event is also requires V.pregnancyMonitoringUpgrade to be 1
 */
App.Events.PregnancyNotice.SlavePregnant = class PregnancyNotice extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	actorPrerequisites() {
		return [[(s) => {
			return App.Events.PregnancyNotice.ValidActor(s);
		}]];
	}

	eventPrerequisites() {
		return [
			() => App.Events.PregnancyNotice.CanShow(),
		];
	}

	execute(node) {
		return App.Events.PregnancyNotice.Event(node, getSlave(this.actors[0]));
	}
};

/**
 * Notifies the player of their own pregnancy at 2 weeks of gestation
 * This event is controlled by the v.pregnancyNotice.enabled variable, which must be true
 * This event is also requires V.pregnancyMonitoringUpgrade to be 1
 */
App.Events.PregnancyNotice.PlayerPregnant = class PlayerPregnancyNotice extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	/** we cast the player as an actor if they meet the requirements */
	castActors() {
		if (App.Events.PregnancyNotice.ValidActor(V.PC) === true) {
			this.actors = [V.PC.ID];
			return true;
		} else {
			return false;
		}
	}

	eventPrerequisites() {
		return [
			() => App.Events.PregnancyNotice.CanShow(),
		];
	}

	execute(node) {
		return App.Events.PregnancyNotice.Event(node, V.PC);
	}
};

/**
 * @returns {boolean} true if the pregnancy notice events can happen
 */
App.Events.PregnancyNotice.CanShow = () => {
	if (
		V.pregnancyMonitoringUpgrade === 1 &&
		V.pregnancyNotice.enabled === true
	) {
		return true;
	}
	return false;
};

App.Events.PregnancyNotice.unreservedTanks = () => {
	if (V.incubator.capacity > 0) { return 0; }
	return (V.incubator.capacity - V.incubator.tanks.length) - FetusGlobalReserveCount("incubator");
};

App.Events.PregnancyNotice.unreservedCribs = () => {
	if (V.nurseryCribs > 0) { return 0; }
	return (V.nurseryCribs - V.cribs.length) - FetusGlobalReserveCount("nursery");
};

/**
 * @param {FC.HumanState} mother
 * @param {App.Entity.Fetus} fetus
 * @returns {boolean}
 */
App.Events.PregnancyNotice.validFetus = (mother, fetus) => {
	return (
		fetus.age === 2 ||
		(fetus.age === 6 && ["wait", "undecided"].includes(fetus.noticeData.fate)) ||
		// slaves that we have acquired this week with a pregnancy over 6 weeks are also valid
		// @ts-expect-error weekAcquired doesn't exist on PlayerState
		(mother.ID !== -1 && mother.weekAcquired === V.week && fetus.age > 6)
	);
};

/**
 * sets the default fate and reserved place for a fetus based off the mothers `pregNoticeDefault` property
 * @param {FC.HumanState} mother
 */
App.Events.PregnancyNotice.setFetusDefaults = (mother) => {
	if (mother.pregNoticeDefault !== "none") {
		mother.womb.filter((fetus) => App.Events.PregnancyNotice.validFetus(mother, fetus)).forEach(fetus => {
			if (mother.pregNoticeDefault === "incubator") {
				// if there is space in the incubator
				if (App.Events.PregnancyNotice.unreservedTanks() > 0) {
					// reserve incubator space
					fetus.noticeData.fate = "incubator";
					fetus.reserve = "incubator";
				// else if they are 2 weeks old
				} else if (fetus.age === 2) {
					// wait and try again at 6 weeks
					fetus.noticeData.fate = "wait";
				} else {
					// set them to nothing
					fetus.noticeData.fate = "nothing";
				}
			} else if (mother.pregNoticeDefault === "nursery") {
				// if there is space in the nursery
				if (App.Events.PregnancyNotice.unreservedCribs() > 0) {
					// reserve nursery space
					fetus.noticeData.fate = "nursery";
					fetus.reserve = "nursery";
				// else if they are 2 weeks old
				} else if (fetus.age === 2) {
					// wait and try again at 6 weeks
					fetus.noticeData.fate = "wait";
				} else {
					// set them to nothing
					fetus.noticeData.fate = "nothing";
				}
			} else if (mother.pregNoticeDefault === "nothing") {
				fetus.noticeData.fate = "nothing";
			} else {
				console.error(`Unhandled slave.pregNoticeDefault of "${mother.pregNoticeDefault}"`);
			}
		});
	}
};

/**
 * @param {FC.HumanState} actor
 * @returns {boolean} true if the given actor is valid for the pregnancy notice event
 */
App.Events.PregnancyNotice.ValidActor = (actor) => {
	// return false if the actor is set to bypass the pregnancy notice
	if (actor.pregNoticeBypass === true) {
		// but make sure to set the fetuses defaults firsts
		App.Events.PregnancyNotice.setFetusDefaults(actor);
		return false;
	}
	// return false if we have already processed this actor this week
	if (V.pregnancyNotice.processedSlaves.includes(actor.ID)) { return false; }
	// return false if the actor doesn't have any fetuses
	if (actor.womb.length === 0) { return false; }
	// return true if one or more of the fetuses are valid
	let validFetus = false;
	actor.womb.forEach(fetus => {
		if (App.Events.PregnancyNotice.validFetus(actor, fetus) === true) {
			validFetus = true;
		}
	});
	return validFetus;
};

/**
 * @typedef {object} App.Events.PregnancyNotice.Accordion
 * @property {HTMLDivElement} contentDiv the content of the accordion
 * @property {HTMLSpanElement} titleSpan the title
 * @property {HTMLSpanElement} noteSpan the note to the right of the title
 * @property {DocumentFragment} accordion the accordion. This should be attached to the dom
 */

/**
 * @param {string|Node} titleContent
 * @param {string|Node} [titleNote=undefined] shown to the right of the title
 * @param {boolean} [collapsed=true] if true the accordion starts in a collapsed state
 * @returns {App.Events.PregnancyNotice.Accordion}
 */
App.Events.PregnancyNotice.createAccordion = (titleContent, titleNote = undefined, collapsed = true) => {
	const title = document.createDocumentFragment();
	const titleSpan = App.UI.DOM.makeElement("span", titleContent, ["title"]);
	title.appendChild(titleSpan);
	const noteSpan = App.UI.DOM.makeElement("span", titleNote, ["info"]); // shows amount of slaves there
	title.appendChild(noteSpan);
	const contentDiv = App.UI.DOM.makeElement("div");
	return {
		contentDiv: contentDiv,
		titleSpan: titleSpan,
		noteSpan: noteSpan,
		accordion: App.UI.DOM.accordion(title, contentDiv, collapsed)
	};
};

/**
 * Creates a button for the pregnancy notices options
 * @param {FC.HumanState} mother The slave to show options for
 * @param {boolean} [inPregnancyNotice=false] should be true if this is being called from the pregnancy notice, false otherwise
 * @param {HTMLDivElement} [existingDiv=undefined] used internally
 * @param {object} [state=undefined] used internally
 * @returns {HTMLDivElement}
 */
App.Events.PregnancyNotice.options = (mother, inPregnancyNotice = false, existingDiv = undefined, state = undefined) => {
	let text = inPregnancyNotice ? "Options" : "Pregnancy Notice Options";
	let mainDiv = existingDiv ?? App.UI.DOM.makeElement("div");
	mainDiv.innerHTML = ""; // clear it if it is an existing div
	state = state ?? {
		open: false,
	};
	const options = new App.UI.OptionsGroup();
	options.customRefresh(() => {
		App.Events.PregnancyNotice.options(mother, inPregnancyNotice, mainDiv, state);
	});
	let option = options.addOption("", "open", state);
	if (inPregnancyNotice === true) {
		option.addComment("These options are also avaliable in each slave's Rules tab.");
	}
	if (state.open === true) {
		option.addValue(`Close ${text}`, false)
			.addCallback(() => {
				state.open = false;
				App.Events.PregnancyNotice.options(mother, inPregnancyNotice, mainDiv, state);
			});
		option = options.addOption("Default action for this slaves children is", "pregNoticeDefault", mother)
			.addValue("No default", "none")
			.addValue("Do Nothing", "nothing")
			.addValue("Send to the incubator", "incubator")
			.addValue("Send to the nursery", "nursery");
		if (["incubator", "nursery"].includes(mother.pregNoticeDefault)) {
			option.addComment("If there isn't enough room then this will fall back to doing nothing.");
		}
		option = options.addOption("End of week pregnancy notice for this slave is", "pregNoticeBypass", mother)
			.addValue("Enabled", false).on()
			.addValue("Disabled", true).off();
		if (mother.pregNoticeBypass === true) {
			option.addComment("The default action above will still happen, but the notice will not be shown.");
		}
		if (inPregnancyNotice === true) {
			// TODO:@franklygeorge: auto collapse processed option
		}
	} else {
		option.addValue(text, true)
			.addCallback(() => {
				state.open = true;
				App.Events.PregnancyNotice.options(mother, inPregnancyNotice, mainDiv, state);
			});
	}
	mainDiv.append(options.render());
	return mainDiv;
};

/**
 * The actual event
 * @param {ParentNode} node
 * @param {FC.HumanState} mother
 * @returns {ParentNode}
 */
App.Events.PregnancyNotice.Event = (node, mother) => {
	// mark the slave as processed
	V.pregnancyNotice.processedSlaves.push(mother.ID);

	// set default fetus fates
	App.Events.PregnancyNotice.setFetusDefaults(mother);

	const cheating = (V.cheatMode || V.debugMode);

	const motherIsPC = (mother.ID === -1);
	// @ts-expect-error weekAcquired doesn't exist on PlayerState
	const motherIsNew = (mother.ID === -1) ? false : (mother.weekAcquired === V.week);
	const totalBabyCount = mother.womb.length;
	const fetuses = mother.womb.filter((fetus) => App.Events.PregnancyNotice.validFetus(mother, fetus));
	const nurseryName = App.Entity.facilities.nursery.name.replace(/^the /i, "").trim();
	const incubatorName = App.Entity.facilities.incubator.name.replace(/^the /i, "").trim();
	const hasIncubator = (V.incubator.capacity > 0);
	const hasNursery = (V.nurseryCribs > 0);
	let motherDiv = App.UI.DOM.makeElement("div");
	if (motherIsPC) {
		motherDiv.append(App.UI.DOM.makeElement(
			"div",
			`You are pregnant with ${num(totalBabyCount)} ${(totalBabyCount === 1) ? "baby": "babies"}.`),
		);
		if (totalBabyCount !== fetuses.length) {
			motherDiv.append(App.UI.DOM.makeElement(
				"div",
				` ${num(fetuses.length)} of them are listed below.`),
			);
		}
	} else {
		// @ts-expect-error FC.HumanState is not accepted by drawEventArt
		App.Events.drawEventArt(motherDiv, mother, undefined, undefined, true);
		// @ts-expect-error saSlaveName will not accept FC.HumanState
		motherDiv.append(App.SlaveAssignment.saSlaveName(mother));
		if (cheating) {
			motherDiv.append(` (ID: ${mother.ID})`);
		}
		if (motherIsNew) {
			motherDiv.append(` was acquired this week and`);
		}
		motherDiv.append(` is pregnant with ${num(totalBabyCount)} ${(totalBabyCount === 1) ? "baby": "babies"}.`);
		if (totalBabyCount !== fetuses.length) {
			motherDiv.append(` ${num(fetuses.length)} of them are listed below.`);
		}
	}
	const transplantedBabyCount = mother.womb.filter((fetus) => (fetus.motherID !== mother.ID)).length;
	if (transplantedBabyCount !== 0) {
		motherDiv.append(App.UI.DOM.makeElement(
			"div",
			`${num(transplantedBabyCount)} of them ${(transplantedBabyCount === 1) ? "was": "are"} transplanted.`),
		);
	}
	// TODO:@franklygeorge mother's (If not PC) info (Same as main screen).
	// TODO:@franklygeorge list out each group of babies and how old they are (See how the slave description does it for superfetation)

	let unprocessedDiv = App.UI.DOM.makeElement("div");

	function updateProcessed() {
		// clear unprocessedDiv's contents
		unprocessedDiv.innerHTML = "";
		let unprocessedFetuses =  mother.womb.filter((fetus) => (
			App.Events.PregnancyNotice.validFetus(mother, fetus) &&
			(
				fetus.noticeData.fate === "undecided" ||
				(fetus.age >= 6 && fetus.noticeData.fate === "wait") ||
				fetus.noticeData.fate === "terminate" ||
				fetus.noticeData.fate === "transplant"
			)
		));
		if (unprocessedFetuses.length === 0) {
			unprocessedDiv.append(`There are no unprocessed children.`);
			V.nextButton = "Apply";
			App.Utils.updateUserButton();
		} else {
			let unprocessedFetusNames = unprocessedFetuses.map((fetus) => (fetus.genetics.name));
			let terminatableFetuses = unprocessedFetuses.filter((fetus) => (mother.womb.indexOf(fetus) !== -1) && canTerminateFetus(mother, fetus));
			let transplantableFetuses = unprocessedFetuses.filter((fetus) => canTransplantFetus(mother, fetus) === 1);
			unprocessedDiv.append(`${toSentence(unprocessedFetusNames, ", ", " and ")} ${(unprocessedFetuses.length === 1) ? "has": "have"} not been processed yet.`);
			if (V.pregnancyNotice.nextLockout === true) {
				V.nextButton = " ";
			} else {
				V.nextButton = "Apply";
			}
			App.Utils.updateUserButton();

			let bulkOptions = new App.UI.OptionsGroup;
			let bulkChoice = {
				/** @type {"incubator"|"nursery"|"nothing"|"wait"|"undecided"|"terminate"|"transplant"} */
				choice: "undecided"
			};
			bulkOptions.customRefresh(() => {
				unprocessedFetuses.forEach((fetus) => {
					if (bulkChoice.choice === "incubator") {
						if (App.Events.PregnancyNotice.unreservedTanks() > 0) {
							fetus.noticeData.fate = bulkChoice.choice;
							// @ts-ignore
							fetus.reserve = bulkChoice.choice;
						}
					} else if (bulkChoice.choice === "nursery") {
						if (App.Events.PregnancyNotice.unreservedCribs() > 0) {
							fetus.noticeData.fate = bulkChoice.choice;
							// @ts-ignore
							fetus.reserve = bulkChoice.choice;
						}
					} else {
						fetus.noticeData.fate = bulkChoice.choice;
					}
					let noteSpan = $(`#${fetus.ID}-note-span`)[0];
					fetusInfo(fetus, noteSpan);
				});
				if (bulkChoice.choice === "transplant") {
					let bulkTransplantDiv = App.UI.DOM.makeElement("div");
					unprocessedDiv.append(bulkTransplantDiv);
					transplantingTool(mother, unprocessedFetuses, bulkTransplantDiv, transplantableFetuses.length, updateProcessed, undefined, true);
				} else if (bulkChoice.choice === "terminate") {
					let bulkTerminateDiv = App.UI.DOM.makeElement("div");
					unprocessedDiv.append(bulkTerminateDiv);
					BulkTerminateTool(mother, unprocessedFetuses, bulkTerminateDiv, terminatableFetuses.length, updateProcessed);
				}
			});
			let bulkOption = bulkOptions.addOption("Change all unprocessed to: ", "choice", bulkChoice);
			if (App.Events.PregnancyNotice.unreservedTanks() >= unprocessedFetuses.length) {
				bulkOption.addValue(`Reserve ${incubatorName} tanks`, "incubator");
			}
			if (App.Events.PregnancyNotice.unreservedCribs() >= unprocessedFetuses.length) {
				bulkOption.addValue(`Reserve ${nurseryName} cribs`, "nursery");
			}
			if (unprocessedFetuses.filter((fetus) => fetus.age === 2).length !== 0) {
				bulkOption.addValue(`Ask me again in ${num(4)} more weeks.`, "wait");
			}
			if (transplantableFetuses.length !== 0) {
				bulkOption.addValue("Transplant fetuses", "transplant");
			}
			if (terminatableFetuses.length !== 0) {
				bulkOption.addValue(`Terminate fetuses`, "terminate");
			}
			bulkOption.addValue("Do nothing", "nothing");

			unprocessedDiv.append(bulkOptions.render());
		}
	}

	let fetusesDiv = App.UI.DOM.makeElement("div");
	_.forEachRight(fetuses, fetus => {
		// we use forEachRight to do this in reverse order. If the user is using AI art generation this puts the first fetus on the top of the queue instead of the bottom
		let fetusAccordion = App.Events.PregnancyNotice.createAccordion(
			fetus.genetics.name,
			``,
			V.useAccordion > 0,
		);
		fetusAccordion.noteSpan.id = `${fetus.ID}-note-span`;
		fetusAccordion.contentDiv.append(fetusInfo(fetus, fetusAccordion.noteSpan));
		fetusesDiv.prepend(fetusAccordion.accordion);
	});

	node.append(motherDiv);
	const hr = App.UI.DOM.makeElement("hr");
	hr.style.clear = "both";
	node.append(hr);
	node.append(unprocessedDiv);
	node.append(App.Events.PregnancyNotice.options(mother, true));
	node.append(App.UI.DOM.makeElement("hr"));
	node.append(fetusesDiv);
	// TODO:@franklygeorge also show unprocessedDiv here (below fetusesDiv)

	return node;

	/**
	 * @param {App.Entity.Fetus} fetus
	 * @param {HTMLSpanElement} noteSpan
	 * @returns {DocumentFragment}
	 */
	function fetusInfo(fetus, noteSpan) {
		let noteSpanContent = `Place Reserved: ${(fetus.reserve !== "") ? (fetus.reserve === "incubator") ? incubatorName + " tank": nurseryName + " crib": "None"}`;
		const frag = new DocumentFragment();
		const cheating = (V.cheatMode === 1);

		const father = getParent(fetus.fatherID, false);
		const fatherIsPC = (typeof father !== "string" && father.ID === -1);
		const fatherName = (typeof father === "string") ? father: SlaveFullName(father);

		const canTerminate = (mother.womb.indexOf(fetus) !== -1) && canTerminateFetus(mother, fetus);
		const canTransplant = canTransplantFetus(mother, fetus);

		const twins = getFetusTwins(fetus);

		if (fetus.noticeData.child === undefined) {
			// @ts-expect-error As long as generateChild's code is not changed incubator = true will return a SlaveState object
			fetus.noticeData.child = generateChild(mother, fetus, true); // used for descriptions and art
		}

		// make fake child a clone of fetus.noticeData.child
		const fakeChild = clone(fetus.noticeData.child);
		// Age fake child up to the ideal age
		while (fakeChild.actualAge < V.idealAge) {
			ageSlave(fakeChild, true);
		}

		const {
			His, He, his, he
		} = getPronouns(fakeChild);

		let intro = new SpacedTextAccumulator();
		if (V.geneticMappingUpgrade < 1 && cheating === false) {
			intro.push(`You do not have the equipment needed to detect genetic details.`);
			intro.push("You need a basic genetic sequencer to view more info.");
		} else {
			// add child image to intro
			if (V.pregnancyNotice.renderFetus === true && (V.geneticMappingUpgrade >= 1 || cheating)) {
				let childArtDiv = App.UI.DOM.makeElement("div");
				App.Events.drawEventArt(childArtDiv, fakeChild, "no clothing", undefined, true);
				intro.push(childArtDiv);
			}

			intro.push(`The child${cheating ? " (wombIndex: " + mother.womb.indexOf(fetus) + ")": ""} is ${geneToGender(fetus.genetics.gender, {keepKaryotype: false, lowercase: true})} and`);
			if (fetus.age === 2) {
				intro.push(`it is too early to know who the father${(cheating === true) ? " (" + fatherName + ")" : ""} is.`);
			} else {
				if (fatherIsPC) {
					intro.push(`you are the father.`);
					noteSpanContent += "; Father: You";
				} else if (father === "unknown") {
					intro.push(" the father is unknown.");
					noteSpanContent += "; Father: Unknown";
				} else {
					intro.push(
						// @ts-ignore
						(typeof father === "string") ? father: App.SlaveAssignment.saSlaveName(father),
						(fetus.fatherID === -6 || fetus.fatherID === -7) ? "are": "is",
						`the father.`
					);
					noteSpanContent += `; Father ${(typeof father === "string") ? father: SlaveFullName(father)}`;
				}
			}
		}

		noteSpan.textContent = noteSpanContent;

		if (canTransplant === -1) {
			if (fetus.motherID === -1) {
				intro.push(`The child was transplanted from your womb.`);
			} else {
				intro.push(`The child was transplanted from`, App.SlaveAssignment.saSlaveName(getSlave(fetus.motherID)), `'s womb.`);
			}
		}

		if (twins) {
			intro.push(`The child is twins with ${toSentence(twins.map((tFetus) => tFetus.genetics.name), ", ", ", and ")}.`);
		}

		intro.toParagraph();

		if (V.geneticMappingUpgrade >= 1 || cheating) {
			intro.push(App.Desc.geneticQuirkAssessment(fakeChild));
			intro.toParagraph();

			intro.push(`<b>Below describes what ${he} will likely look like at age ${num(fakeChild.actualAge)}.</b>`);
			intro.toParagraph();

			if (cheating) {
				const rerollChild = new App.UI.OptionsGroup();
				rerollChild.customRefresh(() => {
					// @ts-expect-error As long as generateChild's code is not changed incubator = true will return a SlaveState object
					fetus.noticeData.child = generateChild(mother, fetus, true); // rebuild the child object
					fetusInfo(fetus, noteSpan);
				});
				rerollChild.addOption("", "do", {do: false})
					.addValue("Reroll child traits", true);
				intro.push(rerollChild.render());
				intro.toParagraph();
			}

			if (fetus.age >= 6) {
				intro.push(App.Desc.family(fakeChild, false));
				intro.toParagraph();
			} else if (V.inbreeding && fakeChild.inbreedingCoeff > 0) {
				intro.push(`${He} is`);
				if (fakeChild.inbreedingCoeff >= 0.5) {
					intro.push("extremely");
				} else if (fakeChild.inbreedingCoeff >= 0.25) {
					intro.push("very");
				} else if (fakeChild.inbreedingCoeff >= 0.125) {
					// no adjective here
				} else if (fakeChild.inbreedingCoeff >= 0.0625) {
					intro.push("somewhat");
				} else {
					intro.push("slightly");
				}
				intro.push(`inbred, with a CoI of ${fakeChild.inbreedingCoeff}.`);
				intro.toParagraph();
			}

			if (V.showScores !== 0) {
				intro.push(`Currently, ${he} has an`);
				intro.push(App.UI.DOM.makeElement("span", `attractiveness score`, ["pink", "bold"]));
				intro.push(App.UI.DOM.makeElement("span", `of`, ["pink"]));
				intro.push(BeautyTooltip(fakeChild));
				intro.toParagraph();
			}

			const descType =  DescType.NORMAL;
			intro.push(App.Desc.arms(fakeChild));
			intro.push(App.Desc.legs(fakeChild));
			intro.push(App.Desc.skin(fakeChild, descType));
			// birthmark
			if (fakeChild.markings === "birthmark" && fakeChild.prestige === 0 && fakeChild.porn.prestige < 2) {
				intro.push(`${He} has a large, liver-colored birthmark, detracting from ${his} beauty.`);
			}


			intro.push(App.Desc.ears(fakeChild));
			// hair
			intro.push(`${His} hair is`);
			if (fakeChild.hColor !== fakeChild.eyebrowHColor) {
				intro.push(`${fakeChild.hColor}, with ${fakeChild.eyebrowHColor} eyebrows.`);
			} else {
				intro.push(`${fakeChild.hColor}.`);
			}

			// freckled redhead
			if (App.Data.misc.redheadColors.includes(fakeChild.hColor)) {
				if (fakeChild.hLength >= 10) {
					if (fakeChild.markings === "freckles" || fakeChild.markings === "heavily freckled") {
						if (App.Medicine.Modification.naturalSkins.includes(fakeChild.skin) && skinToneLevel(fakeChild.skin).isBetween(5, 10)) {
							intro.push(`It goes perfectly with ${his} ${fakeChild.skin} skin and freckles.`);
						}
					}
				}
			}
			intro.push(App.Desc.armpitHair(fakeChild));
			intro.push(App.Desc.horns(fakeChild)); // is it even possible for a slave to have horns without surgery? Leaving this here for potential future support
			intro.push(App.Desc.face(fakeChild, false));
			intro.push(App.Desc.mouth(fakeChild));
			intro.push(App.Desc.eyes(fakeChild));
			intro.toParagraph();

			intro.push(He);
			intro.push(App.Desc.dimensions(fakeChild));
			intro.toParagraph();

			intro.push(App.Desc.boobs(fakeChild, descType));
			intro.push(App.Desc.boobsShape(fakeChild));
			intro.push(App.Desc.shoulders(fakeChild));
			if (fakeChild.appendages !== "none" || fakeChild.wingsShape !== "none") {
				intro.push(App.Desc.upperBack(fakeChild));
			}
			intro.push(App.Desc.nipples(fakeChild, descType));
			intro.push(App.Desc.areola(fakeChild, descType));
			intro.push(App.Desc.belly(fakeChild, descType));
			intro.push(App.Desc.butt(fakeChild, descType));
			intro.toParagraph();

			intro.push(App.Desc.crotch(fakeChild, descType));
			intro.push(App.Desc.dick(fakeChild, descType, false));
			intro.push(App.Desc.vagina(fakeChild, false));
			intro.push(App.Desc.anus(fakeChild, descType, false));
			intro.toParagraph();
		}

		/** @type {FC.FetusGenetics} */
		const genes = fetus.genetics;

		let cheatOption;
		const cheatOptions = new App.UI.OptionsGroup();
		cheatOptions.customRefresh(() => {
			// @ts-expect-error As long as generateChild's code is not changed incubator = true will return a SlaveState object
			fetus.noticeData.child = generateChild(mother, fetus, true); // rebuild the child object with the new fetus data
			fetusInfo(fetus, noteSpan);
		});
		// let the cheaters change things to their liking
		cheatOption = cheatOptions.addOption(`Name: ${genes.name}`, "name", genes);
		cheatOption.showTextBox();
		cheatOption = cheatOptions.addOption(`Surname: ${genes.surname}`, "surname", genes);
		cheatOption.showTextBox();
		cheatOption = cheatOptions.addOption(`Gender: ${geneToGender(genes.gender, {keepKaryotype: true, lowercase: false})}`, "gender", genes);
		cheatOption.addValue("Female", "XX");
		cheatOption.addValue("Male", "XY");
		cheatOption = cheatOptions.addOption(`Father name: ${(genes.fatherName) ? genes.fatherName : `name not registered`}; ID: ${genes.father}`, "father", genes);
		cheatOption.showTextBox(); // TODO:@franklygeorge dropdown slave selectors (Also apply this to analyzePregnancy and the cheat genetic editor)
		cheatOption = cheatOptions.addOption(`Mother name: ${(genes.motherName) ? genes.motherName : `name not registered`}; ID: ${genes.mother}`, "mother", genes);
		cheatOption.showTextBox(); // TODO:@franklygeorge dropdown slave selectors (Also apply this to analyzePregnancy and the cheat genetic editor)
		cheatOption = cheatOptions.addOption(`Nationality: ${genes.nationality}`, "nationality", genes);
		cheatOption.showTextBox();
		if (V.seeRace === 1) {
			cheatOption = cheatOptions.addOption(`Race: ${capFirstChar(genes.race)}`, "race", genes);
			cheatOption.showTextBox().pulldown().addValueList(Array.from(App.Data.misc.filterRaces, (k => [k[1], k[0]])));
		}
		cheatOption = cheatOptions.addOption(`Skin tone: ${capFirstChar(genes.skin)}`, "skin", genes);
		cheatOption.showTextBox().pulldown().addValueList(genes.race === "catgirl" ? App.Medicine.Modification.catgirlNaturalSkins : App.Medicine.Modification.naturalSkins);
		cheatOption = cheatOptions.addOption(`Intelligence index: ${genes.intelligence} out of 100`, "intelligence", genes);
		cheatOption.showTextBox();
		cheatOption = cheatOptions.addOption(`Face index: ${genes.face} out of 100`, "face", genes);
		cheatOption.showTextBox();
		cheatOption = cheatOptions.addOption(`Expected adult height: ${heightToEitherUnit(genes.adultHeight)}`, "adultHeight", genes);
		cheatOption.showTextBox();
		cheatOption = cheatOptions.addOption(`Estimated potential breast size: ${genes.boobPotential}cc`, "boobPotential", genes);
		cheatOption.showTextBox();
		cheatOption = cheatOptions.addOption(`Eye Color: ${capFirstChar(genes.eyeColor)}`, "eyeColor", genes);
		cheatOption.showTextBox().pulldown();
		for (const color of App.Medicine.Modification.eyeColor.map(color => color.value)) {
			cheatOption.addValue(capFirstChar(color), color);
		}
		cheatOption = cheatOptions.addOption(`Hair Color: ${capFirstChar(genes.hColor)}`, "hColor", genes);
		cheatOption.showTextBox().pulldown();
		for (const color of App.Medicine.Modification.Color.Primary.map(color => color.value)) {
			cheatOption.addValue(capFirstChar(color), color);
		}
		cheatOption = cheatOptions.addOption(`Pubic hair: ${capFirstChar(genes.pubicHStyle)}`, "pubicHStyle", genes);
		cheatOption.showTextBox().pulldown()
			.addValue("hairless")
			.addValue("bushy");
		cheatOption = cheatOptions.addOption(`Armpit hair: ${capFirstChar(genes.underArmHStyle)}`, "underArmHStyle", genes);
		cheatOption.showTextBox().pulldown()
			.addValue("hairless")
			.addValue("bushy");
		cheatOption = cheatOptions.addOption(`Markings: ${capFirstChar(genes.markings)}`, "markings", genes);
		cheatOption.addValueList([
			["None", "none"],
			["Freckles", "freckles"],
			["Heavily freckled", "heavily freckled"],
			["Beauty mark", "beauty mark"],
			["Birthmark", "birthmark"],
		]);
		cheatOption = cheatOptions.addOption(`Inbreeding coefficient: ${genes.inbreedingCoeff}`, "inbreedingCoeff", genes);
		cheatOption.showTextBox();

		let fetusOption;
		const fetusOptions = new App.UI.OptionsGroup();
		fetusOptions.customRefresh(() => {
			fetusInfo(fetus, noteSpan);
		});
		if (fetus.reserve !== "") {
			fetus.noticeData.fate = fetus.reserve;
		}
		fetusOption = fetusOptions.addOption("What do you want to do?", "fate", fetus.noticeData);
		if (App.Events.PregnancyNotice.unreservedTanks() > 0 || fetus.reserve === "incubator") {
			fetusOption.addValue(`Reserve a ${incubatorName} tank`, "incubator", () => {
				fetus.reserve = "incubator";
			});
		}
		if (App.Events.PregnancyNotice.unreservedCribs() > 0 || fetus.reserve === "nursery") {
			fetusOption.addValue(`Reserve a ${nurseryName} crib`, "nursery", () => {
				fetus.reserve = "nursery";
			});
		}
		if (fetus.age === 2) {
			fetusOption.addValue(`Ask me again in ${num(4)} more weeks`, "wait", () => {
				fetus.reserve = "";
			});
		}
		fetusOption.addValue("Do nothing", "nothing", () => {
			fetus.reserve = "";
		});
		if (canTransplant !== 0) {
			fetusOption.addValue("Transplant Fetus", "transplant", () => {
				fetus.reserve = "";
			});
		}
		if (canTerminate) {
			fetusOption.addValue("Terminate Fetus", "terminate", () => {
				fetus.reserve = "";
			});
		}
		fetusOption.addValue("Undecided", "undecided", () => {
			fetus.reserve = "";
		});

		// create div
		let fetusDiv = App.UI.DOM.makeElement("div");
		fetusDiv.id = `fetus-id-${fetus.ID}`;
		const oldDiv = $(`#fetus-id-${fetus.ID}`);
		if (oldDiv.length) {
		// if old div exists replace it
			oldDiv.replaceWith(fetusDiv);
		} else {
		// otherwise add div to frag
			frag.append(fetusDiv);
		}
		// add intro to div
		fetusDiv.append(intro.container());

		// add main choice to div
		fetusDiv.append(fetusOptions.render());

		if (!["terminate", "transplant"].includes(fetus.noticeData.fate)) {
			if (hasIncubator) {
				const countString = `There are ${num(App.Events.PregnancyNotice.unreservedTanks())} unreserved tanks in the ${incubatorName}.`;
				let freeCountDiv = App.UI.DOM.makeElement(
					"div",
					countString,
					["note"]
				);
				freeCountDiv.classList.add(`incubator-free-count`);
				fetusDiv.append(freeCountDiv);
				// update all counts
				$(".incubator-free-count").each((index, element) => {
					element.innerHTML = countString;
				});
			}
			if (hasNursery) {
				const countString = `There are ${num(App.Events.PregnancyNotice.unreservedCribs())} unreserved cribs in the ${nurseryName}.`;
				let freeCountDiv = App.UI.DOM.makeElement(
					"div",
					countString,
					["note"]
				);
				freeCountDiv.classList.add(`nursery-free-count`);
				fetusDiv.append(freeCountDiv);
				// update all counts
				$(".nursery-free-count").each((index, element) => {
					element.innerHTML = countString;
				});
			}
		}

		if (fetus.noticeData.fate === "wait") {
			fetusDiv.append(App.UI.DOM.makeElement(
				"div",
				`You will not be able to terminate this fetus later.`,
				["note"]
			));
		}

		if (["incubator", "nursery"].includes(fetus.noticeData.fate)) {
			fetusDiv.append(App.UI.DOM.makeElement(
				"div",
				`A ${(fetus.reserve === "incubator") ? "tank": "crib"} is being reserved for the child in the ${(fetus.reserve === "incubator") ? incubatorName : nurseryName}.`,
				["note"]
			));
			if (fetus.noticeData.fate === "nursery") {
				fetusDiv.append(App.UI.DOM.makeElement(
					"div",
					`If they are sent to the nursery then the description above will not match when the child is born.`,
					["note"]
					// TODO:@franklygeorge fix this. Probably need to make InfantState an extension of SlaveState or just convert it to SlaveState instead
				));
			}
		}

		if (fetus.noticeData.fate === "terminate") {
			const options = new App.UI.OptionsGroup();
			options.customRefresh(() => {
				terminateFetus(mother, fetus);
				let jDiv = $(`#fetus-id-${fetus.ID}`);
				jDiv.empty().append("Fetus terminated");
				updateProcessed();
			});
			options.addOption("", "do", {do: false})
				.addValue("Terminate", true);
			fetusDiv.append(options.render());
		}

		if (fetus.noticeData.fate === "transplant") {
			if (canTransplant === -1) {
				let originalMother = (fetus.motherID === -1) ? V.PC : getSlave(fetus.motherID);
				// @ts-expect-error PlayerState not assignable to SlaveState
				const popup = (originalMother.ID === -1) ? App.UI.DOM.makeElement("div", "yourself"): App.UI.DOM.slaveDescriptionDialog(originalMother, SlaveFullName(originalMother));
				popup.classList.add("slave-name", "bold");
				App.UI.DOM.appendNewElement("span", fetusDiv, `Fetus cannot be transplanted because it has already been transplanted. The original mother was `);
				App.UI.DOM.appendNewElement("span", fetusDiv, popup);
			} else {
				let transplantDiv = App.UI.DOM.makeElement("div");
				fetusDiv.append(transplantDiv);
				transplantingTool(mother, fetus, transplantDiv, 1, fetusInfo, [fetus, noteSpan], true);
			}
		}

		if (cheating) {
			let cheatingAccordion = App.Events.PregnancyNotice.createAccordion(
				"Cheat Menu",
				"",
				fetus.noticeData.cheatAccordionCollapsed,
			);

			// change fetus.noticeData.cheatAccordionCollapsed when the cheat menu is toggled
			const attrObserver = new MutationObserver((mutations) => {
				mutations.forEach(mu => {
					if (mu.type !== "attributes" && mu.attributeName !== "class") { return; }
					// @ts-expect-error mu.target returns an element not a node
					if (mu.target.classList.contains("closed")) {
						fetus.noticeData.cheatAccordionCollapsed = true;
					} else {
						fetus.noticeData.cheatAccordionCollapsed = false;
					}
				});
			});
			attrObserver.observe(cheatingAccordion.noteSpan.parentElement, {attributes: true});

			cheatingAccordion.contentDiv.append(cheatOptions.render());
			App.UI.DOM.appendNewElement("h4", cheatingAccordion.contentDiv, "Genetic quirks");
			cheatingAccordion.contentDiv.append(App.UI.SlaveInteract.geneticQuirks(
				fetus.genetics,
				true,
				undefined,
				false,
				{
					function: fetusInfo,
					variables: [fetus, noteSpan],
				}
			));
			fetusDiv.append(cheatingAccordion.accordion);
		}
		updateProcessed();
		return frag;
	}
};
