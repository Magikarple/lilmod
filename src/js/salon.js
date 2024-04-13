/**
 * @param {FC.HumanState} entity
 * @param {boolean} [cheat=false]
 * @returns {HTMLDivElement}
 */
App.Medicine.Modification.eyeSelector = function(entity, cheat = false) {
	const {He, him, his} = getPronouns(entity);

	const player = entity === V.PC;

	let selectedSide = "none";
	let selectedIris = "none";
	let selectedPupil = "none";
	let selectedSclera = "none";

	let r = player ? "You have " : `${He} has `;
	r += App.Desc.eyesColorLong(entity);
	if (hasAnyEyes(entity)) {
		r += `, ${hasBothEyes(entity) ? "they are" : "it is"} ${App.Desc.eyesType(entity)}`;
	}
	r += ".";

	let cosmetics = [];
	if (hasAnyEyes(entity)) {
		cosmetics.push("contact lenses");
	}
	if (!hasBothEyes(entity)) {
		cosmetics.push("glass eyes");
	}

	let removeDiv = document.createElement("div");
	removeDiv.classList.add("choices");
	let applyDiv = document.createElement("div");

	const container = document.createElement("div");

	container.append(
		r,
		removeDiv, `You have a number of ${toSentence(cosmetics)} in various colors available. `,
		App.UI.DOM.makeElement("span", `You can change what ${player ? "your" : his} eyes look like.`, "note"),
		assembleLinks(), applyDiv
	);
	updateRemoveDiv();
	updateApplyDiv();
	return container;

	function assembleLinks() {
		const sides = ["left", "right", "both"];
		const irisColors = App.Medicine.Modification.eyeColor.map(color => color.value);
		const pupilShapes = ["none"].concat(App.Medicine.Modification.eyeShape.map(shape => shape.value));
		const scleraColors = ["none"].concat(App.Medicine.Modification.eyeColor.map(color => color.value));
		const div = document.createDocumentFragment();
		div.append(
			assembleList("Side: ", sides, value => selectedSide = value, selectedIris),
			assembleList("Iris: ", irisColors, value => selectedIris = value, selectedSide),
			assembleList("Pupil: ", pupilShapes, value => selectedPupil = value, selectedPupil),
			assembleList("Sclera: ", scleraColors, value => selectedSclera = value, selectedSclera)
		);
		return div;
	}

	/**
	 * @param {string} name
	 * @param {Array<string>} list
	 * @param {function(string):void} callback
	 * @param {string} selected
	 * @returns {HTMLDivElement}
	 */
	function assembleList(name, list, callback, selected) {
		const links = [];

		for (const item of list) {
			addToggle(item, callback, links, item === selected);
		}

		const div = document.createElement("div");
		div.classList.add("choices");
		div.append(name, App.UI.DOM.generateLinksStrip(links));
		return div;
	}

	/**
	 * @param {string} value
	 * @param {(value: string) => void} callback
	 * @param {Array<HTMLAnchorElement>} links
	 * @param {boolean} [disabled]
	 */
	function addToggle(value, callback, links, disabled = false) {
		const a = document.createElement("a");
		a.append(capFirstChar(value));
		if (disabled) {
			a.classList.add("disabled");
		}
		a.onclick = () => {
			for (let link of links) {
				link.classList.remove("disabled");
			}
			a.classList.add("disabled");
			callback(value);
			updateRemoveDiv();
			updateApplyDiv();
		};
		links.push(a);
	}

	function updateApplyDiv() {
		$(applyDiv).empty();
		if (selectedSide !== "none" && selectedIris !== "none") {
			// make the following easier to read
			let both = selectedSide === "both";
			let leftGlass = !hasLeftEye(entity) || getLeftEyeType(entity) === 2;
			let rightGlass = !hasRightEye(entity) || getRightEyeType(entity) === 2;

			// base eye
			let r = player ? "" : ` ${him}`;
			if (both) {
				if (leftGlass && rightGlass) {
					r += ` ${selectedIris} glass eyes`;
				} else if (leftGlass || rightGlass) {
					r += ` a glass eye and a ${selectedIris} lens`;
				} else {
					r += ` ${selectedIris} lenses`;
				}
			} else {
				r += " a";
				if ((selectedSide === "left" && leftGlass) || (selectedSide === "right" && rightGlass)) {
					r += ` ${selectedIris} glass eye`;
				} else {
					r += ` ${selectedIris} lens`;
				}
			}
			// pupil & sclera
			if (selectedPupil !== "none" || selectedSclera !== "none") {
				r += " with";
				if (selectedPupil !== "none") {
					r += ` ${both ? selectedPupil : addA(selectedPupil)}`;
					if (both) {
						r += " pupils";
					} else {
						r += " pupil";
					}
					if (selectedSclera !== "none") {
						r += " and";
					}
				}
				if (selectedSclera !== "none") {
					r += ` ${selectedSclera}`;
					if (both) {
						r += " sclerae";
					} else {
						r += " sclera";
					}
				}
			}
			if (!both) {
				r += ` for ${player ? "your" : his} ${selectedSide} eye`;
			}
			r += "?";

			const a = document.createElement("a");
			a.append(player ? "Take" : "Give");
			a.onclick = applyLink;
			applyDiv.append(a, r);
			if (!player) {
				applyDiv.append(" ",
					App.UI.DOM.makeElement("span", "This is independent from eyewear choices.", "note"));
			}
		}
	}

	function applyLink() {
		// make sure the eye exists; give glass eye if there is none
		if ((selectedSide === "left" || selectedSide === "both") && getLeftEyeType(entity) === 0) {
			eyeSurgery(entity, "left", "glass");
		}
		if ((selectedSide === "right" || selectedSide === "both") && getRightEyeType(entity) === 0) {
			eyeSurgery(entity, "right", "glass");
		}

		// apply modifications
		setEyeColorFull(entity, selectedIris,
			selectedPupil === "none" ? "circular" : selectedPupil,
			selectedSclera === "none" ? "white" : selectedSclera,
			selectedSide);
		if (!cheat) {
			cashX(forceNeg(V.modCost), "slaveMod", entity);
		}

		App.UI.reload();
	}

	function updateRemoveDiv() {
		$(removeDiv).empty();
		const links = [];
		let linkCount = 0;

		// remove lenses
		if (hasLeftEye(entity) && getLeftEyeType(entity) !== 2 &&
			(getLeftEyeColor(entity) !== getGeneticEyeColor(entity, "left") ||
				entity.eye.left.pupil !== "circular" ||
				entity.eye.left.sclera !== "white")) {
			linkCount++;
			links.push(removeLink("Remove left lens", () => resetEyeColor(entity, "left")));
		}
		if (hasRightEye(entity) && getRightEyeType(entity) !== 2 &&
			(getRightEyeColor(entity) !== getGeneticEyeColor(entity, "right") ||
				entity.eye.right.pupil !== "circular" ||
				entity.eye.right.sclera !== "white")) {
			linkCount++;
			links.push(removeLink("Remove right lens", () => resetEyeColor(entity, "right")));
		}
		if (linkCount === 2) {
			links.push(removeLink("Remove both lenses", () => resetEyeColor(entity, "both")));
		}

		// remove glass eyes
		linkCount = 0;
		if (getLeftEyeType(entity) === 2) {
			linkCount++;
			links.push(removeLink("Remove left glass eye", () => eyeSurgery(entity, "left", "remove")));
		}
		if (getRightEyeType(entity) === 2) {
			linkCount++;
			links.push(removeLink("Remove right glass eye", () => eyeSurgery(entity, "right", "remove")));
		}
		if (linkCount === 2) {
			links.push(removeLink("Remove both glass eyes", () => eyeSurgery(entity, "both", "remove")));
		}
		if (links.length > 0) {
			removeDiv.append(App.UI.DOM.generateLinksStrip(links));
		}
	}

	/**
	 * @param {string} text
	 * @param {() => void} callback
	 */
	function removeLink(text, callback) {
		const a = document.createElement("a");
		a.append(text);
		a.onclick = () => {
			callback();
			App.UI.reload();
		};
		return a;
	}
};

/**
 * Update patternColor in salon
 * @param {App.Entity.SlaveState} slave
 * @param {boolean} [cheat=false]
 * @returns {HTMLElement}
 */
App.Medicine.Salon.pattern = function(slave, cheat = false) {
	let patternColor = 0;
	let updatePatternColor = (newVal) => {
		patternColor = newVal;
		apply();
	};
	const container = document.createElement("div");
	container.append(pattern());
	return container;

	function pattern() {
		const frag = new DocumentFragment();
		const {His, his} = getPronouns(slave);
		let div;
		let p;
		frag.append(`${His} pattern color is ${slave.patternColor}.`);

		div = document.createElement("div");
		div.classList.add("choices");
		if (slave.patternColor !== "black") {
			div.append(
				App.UI.DOM.link(
					"Return them to their natural color",
					() => {
						slave.patternColor = "black";
						App.Events.refreshEventArt(slave);
						apply();
					}
				)
			);
			div.append(" or ");
			App.UI.DOM.appendNewElement("span", div, "choose a new one: ", "note");
		} else {
			App.UI.DOM.appendNewElement("span", div, `Choose a dye color before dyeing ${his} pattern:`, "note");
		}
		frag.append(div);

		div = document.createElement("div");
		div.classList.add("choices");
		div.append(`Colors:`);
		div.append(createList(App.Medicine.Modification.Color.Pattern, updatePatternColor));
		frag.append(div);

		if (patternColor !== 0) {
			p = document.createElement("p");
			p.classList.add("choices");
			p.append(
				App.UI.DOM.link(
					`Color ${his} pattern`,
					() => {
						// @ts-ignore
						slave.patternColor = (patternColor);
						if (!cheat) {
							cashX(forceNeg(V.modCost), "slaveMod", slave);
						}
						App.UI.reload();
					}
				)
			);
			p.append(` ${patternColor} now?`);
			frag.append(p);
		}
		return frag;
	}

	function createList(array, method) {
		const links = [];
		for (const item of array) {
			const title = item.title || capFirstChar(item.value);
			links.push(
				App.UI.DOM.link(
					title,
					() => method(item.value)
				)
			);
		}
		return App.UI.DOM.generateLinksStrip(links);
	}

	function apply() {
		App.Events.refreshEventArt(slave);
		jQuery(container).empty().append(pattern());
	}
};

