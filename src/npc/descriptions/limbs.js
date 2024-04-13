App.Medicine.Limbs = {};

/**
 * Generates an object usable with the standard limb check functions.
 * @param {App.Entity.SlaveState} slave
 * @returns {FC.LimbsState}
 */
App.Medicine.Limbs.currentLimbs = function(slave) {
	let s = {arm: {left: {type: 1}, right: {type: 1}}, leg: {left: {type: 1}, right: {type: 1}}, PLimb: 0};
	if (hasLeftArm(slave)) {
		s.arm.left.type = getLeftArmID(slave);
	} else {
		s.arm.left = null;
	}
	if (hasRightArm(slave)) {
		s.arm.right.type = getRightArmID(slave);
	} else {
		s.arm.right = null;
	}
	if (hasLeftLeg(slave)) {
		s.leg.left.type = getLeftLegID(slave);
	} else {
		s.leg.left = null;
	}
	if (hasRightLeg(slave)) {
		s.leg.right.type = getRightLegID(slave);
	} else {
		s.leg.right = null;
	}
	s.PLimb = slave.PLimb;
	return s;
};

/**
 * Displays a selector for prosthetic limbs of slave
 * @param {App.Entity.SlaveState} slave
 * @param {FC.LimbsState} oldLimbs
 * @returns {HTMLSpanElement|DocumentFragment}
 */
App.Medicine.Limbs.selector = function(slave, oldLimbs) {
	const {her} = getPronouns(slave);
	if (hasAllNaturalLimbs(slave)) {
		return App.UI.DOM.makeElement("span", `You must amputate ${her} limbs before you can attach prosthetics.`, ["detail"]);
	}
	if (slave.PLimb < 1) {
		return App.UI.DOM.makeElement("span", `You must surgically install a prosthetic interface before you can attach prosthetics.`, ["detail"]);
	}

	const {his} = getPronouns(slave);
	const newState = currentState(slave);

	const f = document.createDocumentFragment();

	const limbSelector = document.createElement("div");
	limbSelector.classList.add("limb-selector");

	App.UI.DOM.appendNewElement("div", limbSelector, "");
	App.UI.DOM.appendNewElement("div", limbSelector, "Left Arm");
	App.UI.DOM.appendNewElement("div", limbSelector, "Right Arm");
	App.UI.DOM.appendNewElement("div", limbSelector, "Left Leg");
	App.UI.DOM.appendNewElement("div", limbSelector, "Right Leg");
	App.UI.DOM.appendNewElement("div", limbSelector, "All");

	const radiosAll = [];

	limbSelector.append(row("None", 0));
	App.Data.prostheticLimbs.forEach((limb, key) => {
		if (isProstheticAvailable(slave, limb.prostheticKey)) {
			if (limb.allowedInterfaces.includes(slave.PLimb)) {
				limbSelector.append(row(capFirstChar(limb.short), key));
			} else {
				App.UI.DOM.appendNewElement("div", limbSelector,
					`You need to upgrade ${his} prosthetic interface to attach ${limb.short} limbs.`, ["full",
						"detail"]);
			}
		}
	});

	f.append(limbSelector);
	f.append(
		App.UI.DOM.link("Apply", () => {
			applySelector(slave, newState);
			App.UI.DOM.replace("#selector", App.Medicine.Limbs.reaction(slave, oldLimbs));
		})
	);

	return f;

	/**
	 * Generates an array with the current limbs of a slave.
	 * @param {App.Entity.SlaveState} slave
	 * @returns {number[]}
	 */
	function currentState(slave) {
		return [getLeftArmID(slave), getRightArmID(slave), getLeftLegID(slave), getRightLegID(slave)];
	}

	/**
	 * @param {string} title
	 * @param {number} id
	 * @returns {DocumentFragment}
	 */
	function row(title, id) {
		const f = document.createDocumentFragment();

		App.UI.DOM.appendNewElement("div", f, title);

		const radios = [];
		for (let i = 0; i < newState.length; i++) {
			const div = document.createElement("div");

			if (newState[i] !== 1) {
				const radio = document.createElement("input");
				radios.push(radio);
				radio.type = "radio";
				radio.name = "limb" + i;
				if (newState[i] === id) {
					radio.checked = true;
				}
				radio.onclick = () => {
					newState[i] = id;
					radiosAll.forEach(r => r.checked = false);
				};
				div.append(radio);
			}

			f.append(div);
		}

		const div = document.createElement("div");

		const radio = document.createElement("input");
		radiosAll.push(radio);
		radio.type = "radio";
		radio.name = "limb_all";
		radio.checked = newState.reduce((acc, cur) => acc && (cur === 1 || cur === id), true);
		radio.onclick = () => {
			for (let i = 0; i < newState.length; i++) {
				if (newState[i] !== 1) {
					newState[i] = id;
				}
				radios.forEach(r => r.checked = true);
			}
		};
		div.append(radio);

		f.append(div);

		return f;
	}

	/**
	 *
	 * @param {App.Entity.SlaveState} slave
	 * @param {number[]} newState
	 */
	function applySelector(slave, newState) {
		if (getLeftArmID(slave) !== newState[0]) {
			if (getLeftArmID(slave) > 1) {
				removeLimbs(slave, "left arm");
			}
			if (newState[0] > 1) {
				attachLimbs(slave, "left arm", newState[0]);
			}
		}
		if (getRightArmID(slave) !== newState[1]) {
			if (getRightArmID(slave) > 1) {
				removeLimbs(slave, "right arm");
			}
			if (newState[1] > 1) {
				attachLimbs(slave, "right arm", newState[1]);
			}
		}
		if (getLeftLegID(slave) !== newState[2]) {
			if (getLeftLegID(slave) > 1) {
				removeLimbs(slave, "left leg");
			}
			if (newState[2] > 1) {
				attachLimbs(slave, "left leg", newState[2]);
			}
		}
		if (getRightLegID(slave) !== newState[3]) {
			if (getRightLegID(slave) > 1) {
				removeLimbs(slave, "right leg");
			}
			if (newState[3] > 1) {
				attachLimbs(slave, "right leg", newState[3]);
			}
		}
	}
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {FC.LimbsState} oldLimbs
 * @param {string} returnTo
 * @returns {DocumentFragment}
 */
App.Medicine.Limbs.reaction = function(slave, oldLimbs, returnTo = "") {
	let r = "";
	if (getLeftArmID(oldLimbs) !== getLeftArmID(slave)) {
		r += `Left arm was ${idToDescription(getLeftArmID(oldLimbs))} and is now ${idToDescription(getLeftArmID(slave))}. `;
	}
	if (getRightArmID(oldLimbs) !== getRightArmID(slave)) {
		r += `Right arm was ${idToDescription(getRightArmID(oldLimbs))} and is now ${idToDescription(getRightArmID(slave))}. `;
	}
	if (getLeftLegID(oldLimbs) !== getLeftLegID(slave)) {
		r += `Left leg was ${idToDescription(getLeftLegID(oldLimbs))} and is now ${idToDescription(getLeftLegID(slave))}. `;
	}
	if (getRightLegID(oldLimbs) !== getRightLegID(slave)) {
		r += `Right leg was ${idToDescription(getRightLegID(oldLimbs))} and is now ${idToDescription(getRightLegID(slave))}. `;
	}

	const f = document.createDocumentFragment();

	App.UI.DOM.appendNewElement("p", f, r,);
	App.UI.DOM.appendNewElement("p", f, "Slave's reaction", "note");

	if (returnTo) {
		f.append(App.UI.DOM.passageLink("Continue", returnTo));
	}

	return f;
};
