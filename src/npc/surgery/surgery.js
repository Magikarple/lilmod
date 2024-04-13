/**
 * @param {App.Medicine.Surgery.Procedure} procedure
 * @param {function():void} refresh
 * @param {boolean} cheat
 * @param {(slave: App.Entity.SlaveState)=>void} [onApply] function to execute on clicking the link before any other action
 * @returns {HTMLAnchorElement|HTMLSpanElement}
 */
App.Medicine.Surgery.makeLink = function(procedure, refresh, cheat, onApply) {
	if (procedure.disabledReasons.length > 0) {
		return App.UI.DOM.disabledLink(procedure.name, procedure.disabledReasons);
	}

	const note = procedure.note;
	const slave = procedure.originalSlave;
	const res = App.UI.DOM.link(procedure.name, apply, [], "", tooltip());
	if (note) {
		res.classList.add("with-note");
	}
	return res;

	function healthCosts() {
		const hc = (V.PC.skill.medicine >= 100) ? Math.round(procedure.healthCost / 2) : procedure.healthCost;
		if (hc > 35) {
			return 'substantial';
		} else if (hc > 20) {
			return 'significant';
		} else if (hc > 10) {
			return 'moderate';
		} else if (hc > 5) {
			return 'light';
		}
		return 'insignificant';
	}

	function tooltip() {
		const tooltip = new DocumentFragment();
		const desc = procedure.description;
		if (desc !== "") {
			App.UI.DOM.appendNewElement("div", tooltip, `${capFirstChar(desc)}.`);
		}
		if (!cheat) {
			App.UI.DOM.appendNewElement("div", tooltip, `Surgery costs: ${cashFormat(procedure.cost)}.`);
			App.UI.DOM.appendNewElement("div", tooltip, `Projected health damage: ${healthCosts()}.`);
		}
		if (note) {
			App.UI.DOM.appendNewElement("div", tooltip, typeof note === "string" ? `${capFirstChar(note)}.` : note);
		}
		return tooltip;
	}

	function apply() {
		if (onApply) {
			// TODO find a better way to do this.
			onApply(procedure._slave);
		}

		const result = App.Medicine.Surgery.apply(procedure, cheat);
		if (result === null) {
			Engine.play("Surgery Death");
			return;
		}

		const [diff, reaction] = result;

		const f = App.Medicine.Surgery.makeSlaveReaction(slave, diff, reaction);

		App.Utils.Diff.applyDiff(slave, diff);

		// Refresh the surgery options or wherever the surgery originated
		refresh();

		// Finally show the slaves reaction
		Dialog.setup(procedure.name);
		Dialog.append(f);
		Dialog.open();
	}
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {Partial<App.Entity.SlaveState>} diff
 * @param {App.Medicine.Surgery.SimpleReaction} reaction
 * @returns {DocumentFragment}
 */
App.Medicine.Surgery.makeSlaveReaction = function(slave, diff, reaction) {
	const f = new DocumentFragment();
	let r = [];

	r.push(...reaction.intro(slave, diff));

	const resultMain = reaction.reaction(slave, diff);
	for (const p of resultMain.longReaction) {
		r.push(...p);
		App.Events.addParagraph(f, r);
		r = [];
	}
	slave.devotion += resultMain.devotion;
	slave.trust += resultMain.trust;

	const resultOutro = reaction.outro(slave, diff, resultMain);
	for (const p of resultOutro.longReaction) {
		r.push(...p);
		App.Events.addParagraph(f, r);
		r = [];
	}
	slave.devotion += resultOutro.devotion;
	slave.trust += resultOutro.trust;

	return f;
};

/**
 * if null is returned the slave died
 *
 * @param {App.Medicine.Surgery.Procedure} procedure
 * @param {boolean} cheat
 * @returns {[Partial<App.Entity.SlaveState>, App.Medicine.Surgery.SimpleReaction]}
 */
App.Medicine.Surgery.apply = function(procedure, cheat) {
	const slave = procedure.originalSlave;
	if (!cheat) {
		cashX(-procedure.cost, "slaveSurgery", slave);
		surgeryDamage(slave, procedure.healthCost, cheat);
		if (procedure.invasive && slave.health.health < random(-100, -80)) {
			return null;
		}
	}

	const [diff, reaction] = procedure.apply(cheat);

	if (reaction.removeJob) {
		removeJob(slave, Job.LURCHER, true);
		removeJob(slave, Job.ARENA, true);
		removeJob(slave, Job.PIT, true);
		removeJob(slave, slave.assignment);
	}

	return [diff, reaction];
};

/**
 * Returns options to accept all possible surgeries
 * @returns {FC.Medicine.Surgery.SizingOptions}
 */
App.Medicine.Surgery.allSizingOptions = function() {
	return {
		replace: true,
	};
};

App.Medicine.Surgery.sizingProcedures = function() {
	class ForbiddenDummy extends App.Medicine.Surgery.Procedure {
		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {string} name
		 * @param {string} forbidden why the surgery can't be used
		 */
		constructor(slave, name, forbidden) {
			super(slave);
			this._name = name;
			this._forbidden = forbidden;
		}

		get name() {
			return this._name;
		}

		get disabledReasons() {
			return super.disabledReasons.concat(this._forbidden);
		}
	}

	return {
		bodyPart: bodyPart,
		boobs: boobSizingProcedures,
		butt: buttSizingProcedures,
		lips: lipsSizingProcedures,
	};

	/**
	 * Returns list of available surgeries targeted at changing size of the given body part
	 * @template {FC.SizingImplantTarget} T
	 * @param {FC.SizingImplantTarget} bodyPart
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.Medicine.Surgery.SizingOptions<T>} [options]
	 * @returns {App.Medicine.Surgery.Procedure[]}
	 */
	function bodyPart(bodyPart, slave, options) {
		switch (bodyPart) {
			case "boobs":
				return boobSizingProcedures(slave, options);
			case "butt":
				return buttSizingProcedures(slave, options);
			case "lips":
				return lipsSizingProcedures(slave, options);
			default:
				throw Error(`No sizing procedures for ${bodyPart}`);
		}
	}

	/**
	 * @template {FC.SizingImplantTarget} T
	 * @param {FC.BodyPartInstalledImplantType<T>} type
	 * @param {FC.Data.Medicine.SizingImplants.ImplantType} implantData
	 * @param {number} volume
	 * @param {FC.Medicine.ImplantInfo<T>} implantInfo
	 * @returns {boolean}
	 */
	function implantsAreSame(type, implantData, volume, implantInfo) {
		if (implantInfo.type !== type) {
			return false;
		}
		if (!implantData.fill) {
			return volume === implantInfo.volume;
		}
		return implantInfo.volume.isBetween(volume, implantData.fill.limit, true);
	}

	/**
	 * @template {FC.SizingImplantTarget} Target
	 * @param {FC.Medicine.Surgery.SizingOptions<Target>} options
	 * @param {FC.SizingImplantTarget} target
	 * @returns {FC.Medicine.Surgery.DefinitiveSizedOptions<Target>}
	 */
	function substituteImplicitOptions(options, target) {
		return {
			allowedTypes: options.allowedTypes || new Set(["none", ...App.Medicine.implantTypesForTarget(target)]),
			replace: options.replace || false,
			// reversed range to include all sizing options
			targetSize: options.targetSize || App.Utils.makeRange(App.Medicine.maxAssetSize(target), 0),
		};
	}

	/**
	 * @param {number} value
	 * @param {FC.NumericRange} range
	 * @returns {number}
	 */
	function distanceToRange(value, range) {
		if (range.max >= range.min) {
			return App.Utils.distanceToRange(value, range);
		} else { // reversed range
			return App.Utils.distanceToRange(value, App.Utils.makeRange(range.max, range.min));
		}
	}

	/**
	 * @param {number} d1
	 * @param {number} d2
	 * @param {FC.NumericRange} range
	 * @returns {boolean}
	 */
	function distanceToRangeDecreased(d1, d2, range) {
		return range.max >= range.min ? Math.abs(d2) < Math.abs(d1) : Math.abs(d2) <= Math.abs(d1);
	}

	/**
	 * @param {number} p1
	 * @param {number} p2
	 * @param {FC.NumericRange} range
	 * @returns {boolean}
	 */
	function pointIsCloserToRange(p1, p2, range) {
		return distanceToRangeDecreased(distanceToRange(p1, range), distanceToRange(p2, range), range);
	}

	/**
	 * @template {FC.SizingImplantTarget} T
	 * @param {FC.SlaveState} slave
	 * @param {T} target
	 * @param {FC.Medicine.Surgery.DefinitiveSizedOptions<T>} options
	 * @param {FC.Medicine.ImplantProcedureCreators} creators
	 * @returns {App.Medicine.Surgery.Procedure[]}
	 */
	function implantSizingProcedures(slave, target, options, creators) {
		/** @type {App.Medicine.Surgery.Procedure[]} */
		const procedures = [];

		const current = App.Medicine.implantInfo(slave, target);
		const currentDistance = distanceToRange(current.volume, options.targetSize);
		const curImplantData = current.type !== "none" ? App.Data.Medicine.sizingImplants[target][current.type] : null;
		const curFleshSize = App.Medicine.fleshSize(slave, target);
		const maxVolume = App.Medicine.pocketVolume[target](slave);
		const maxPureImplantVolume = maxVolume - curFleshSize;
		const maxAssetVolume = App.Medicine.maxAssetSize(target);

		const addMaxAssetSizeReachedDummy = (name) => {
			const {His} = getPronouns(slave);
			procedures.push(new ForbiddenDummy(slave, name, `${His} ${target} size reached the limit.`));
		};

		const distanceDecreased = (newValue) => {
			return distanceToRangeDecreased(Math.abs(currentDistance), Math.abs(distanceToRange(newValue, options.targetSize)), options.targetSize);
		};

		/**
		 * @param {FC.Data.Medicine.SizingImplants.ImplantType} data
		 * @returns {number[]}
		 */
		const availableSizes = (data) => {
			const sizes = data.availableSizes;
			return typeof sizes === "function" ? sizes() : sizes;
		};

		/**
		 * @param {FC.Data.Medicine.SizingImplants.FillDrainData} fd
		 */
		const indenturePermitsFillDrain = (fd) => {
			return slave.indentureRestrictions < 2 || fd.healthCost === 0;
		};

		// filling/draining the current implants go first
		if (curImplantData && options.allowedTypes.has(current.type)) {
			if (curImplantData.fill && current.volume < options.targetSize.min && indenturePermitsFillDrain(curImplantData.fill)) {
				let maxVolumeReached = true;
				let fillingPossible = false;
				for (const fillVolume of curImplantData.fill.step) {
					const newVolume = current.volume + fillVolume;
					if (curImplantData.fill.limit >= newVolume && distanceDecreased(newVolume)) {
						if (slave[target] + fillVolume <= maxAssetVolume) {
							maxVolumeReached = false;
							if (newVolume <= maxPureImplantVolume) {
								procedures.push(creators.fill(slave, fillVolume));
								fillingPossible = true;
							}
						}
					}
				}
				if (!fillingPossible) {
					const {His} = getPronouns(slave);
					procedures.push(new ForbiddenDummy(slave, "Fill up", `${His} ${target} implants are filled to capacity.`));
				} else if (maxVolumeReached) {
					addMaxAssetSizeReachedDummy("Fill up");
				}
			}
			if (curImplantData.drain && indenturePermitsFillDrain(curImplantData.drain)) {
				for (const drainVolume of curImplantData.drain.step) {
					if (curImplantData.drain.limit <= current.volume - drainVolume && distanceDecreased(current.volume - drainVolume)) {
						procedures.push(creators.drain(slave, drainVolume));
					}
				}
			}
		}

		// all the other procedures require indentureRestrictions < 2
		if (slave.indentureRestrictions >= 2) {
			const {His} = getPronouns(slave);
			procedures.push(new ForbiddenDummy(slave, "Implantation", `${His} indenture forbids invasive surgery.`));
			return procedures;
		}

		// change implant type if required
		if (curImplantData && options.replace && !options.allowedTypes.has(current.type)) {
			for (const type of options.allowedTypes.values()) {
				if (type === "none") {
					continue; // handled below
				}
				const data = App.Data.Medicine.sizingImplants[target][type];
				for (const volume of availableSizes(data)) {
					if (App.Utils.distanceToRange(volume, options.targetSize) === 0) {
						const fleshExcess = Math.ceil(volume - maxPureImplantVolume);
						if (volume <= maxPureImplantVolume || options.allowedTypes.has("none")) {
							procedures.push(creators.replace(slave, type, volume, fleshExcess));
						}
					}
				}
			}
		}

		// install an implant or replace with a bigger one
		if (distanceDecreased(current.volume + 1)) {
			let maxVolumeReached = true;
			const curAssetSize = App.Medicine.assetSize(slave, target);
			const currentCanBeReplaced = options.replace || options.allowedTypes.has(current.type);
			for (const [type, data] of Object.entries(App.Data.Medicine.sizingImplants[target])) {
				if (!options.allowedTypes.has(type)) {
					continue;
				}
				for (const volume of availableSizes(data)) {
					if (!distanceDecreased(volume)) {
						continue;
					}
					if (curAssetSize - current.volume + volume <= maxVolume) {
						maxVolumeReached = false;
					} else {
						continue;
					}
					const fleshExcess = Math.ceil(volume - maxPureImplantVolume);
					if (volume >= current.volume && distanceDecreased(volume) && (volume <= maxPureImplantVolume ||
						(options.allowedTypes.has("none")))) {
						maxVolumeReached = false;
						if (current.volume > 0) {
							if (currentCanBeReplaced && !implantsAreSame(type, data, volume, current)) {
								procedures.push(creators.replace(slave, type, volume, fleshExcess));
							}
						} else {
							procedures.push(creators.install(slave, type, volume, fleshExcess));
						}
					}
				}
			}
			if (maxVolumeReached) {
				addMaxAssetSizeReachedDummy("Bigger implants");
			}
		}

		// remove the current implant or replace with a smaller one
		if (current.volume > 0 && distanceDecreased(current.volume - 1)) {
			if (options.targetSize.max <= 0) {
				procedures.push(creators.remove(slave));
			}

			if (options.replace) {
				for (const [type, data] of Object.entries(App.Data.Medicine.sizingImplants[target])) {
					if (!options.allowedTypes.has(type)) {
						continue;
					}
					for (const volume of availableSizes(data).filter(s => s < current.volume && distanceDecreased(s))) {
						if (!implantsAreSame(type, data, volume, current)) {
							procedures.push(creators.replace(slave, type, volume, 0));
						}
					}
				}
			}
		}
		return procedures;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.Medicine.Surgery.SizingOptions<"boobs">} [options]
	 * @returns {App.Medicine.Surgery.Procedure[]}
	 */
	function boobSizingProcedures(slave, options = {}) {
		// check if implant-related surgeries are allowed for this slave
		if (slave.breastMesh === 1) {
			const {his, His} = getPronouns(slave);
			return [new ForbiddenDummy(slave, "Implants", `${His} supportive mesh implant blocks resizing ${his} boobs.`)];
		}

		const p = App.Medicine.Surgery.Procedures.boobImplantsProcedure;
		const dOptions = substituteImplicitOptions(options, "boobs");

		const procedures = implantSizingProcedures(slave, "boobs", dOptions, p);

		// boob-specific reduction procedures
		if (slave.indentureRestrictions < 2 && slave.boobsImplant === 0 && dOptions.allowedTypes.has("none")) {
			if (App.Medicine.fleshSize(slave, "boobs") > 300) {
				if (pointIsCloserToRange(slave.boobs, slave.boobs - 200, dOptions.targetSize)) {
					procedures.push(p.reduce(slave, "reduce", 200));
				}
				if (App.Medicine.fleshSize(slave, "boobs") < 675) {
					if (pointIsCloserToRange(slave.boobs, slave.boobs - 25, dOptions.targetSize)) {
						procedures.push(p.reduce(slave, "slightly reduce", 25));
					}
				}
			}
			if ((slave.breedingMark !== 1 || V.propOutcome !== 1 || V.eugenicsFullControl === 1 || !FutureSocieties.isActive('FSRestart'))) {
				if (App.Medicine.fleshSize(slave, "boobs") >= 2000 && pointIsCloserToRange(slave.boobs, 0, dOptions.targetSize)) {
					procedures.push(new App.Medicine.Surgery.Procedures.Mastectomy(slave));
				}
			}
		}
		return procedures;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.Medicine.Surgery.SizingOptions<"butt">} [options]
	 * @returns {App.Medicine.Surgery.Procedure[]}
	 */
	function buttSizingProcedures(slave, options = {}) {
		const dOptions = substituteImplicitOptions(options, "butt");
		const p = App.Medicine.Surgery.Procedures.buttImplantsProcedure;
		const procedures = implantSizingProcedures(slave, "butt", dOptions, p);

		if (slave.buttImplant === 0 && slave.butt > 1 && dOptions.allowedTypes.has("none") &&
			slave.indentureRestrictions < 2 && pointIsCloserToRange(slave.butt, slave.butt - 1, dOptions.targetSize)) {
			procedures.push(p.reduce(slave, "reduce", 1));
		}
		return procedures;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.Medicine.Surgery.SizingOptions<"lips">} [options]
	 * @returns {App.Medicine.Surgery.Procedure[]}
	 */
	function lipsSizingProcedures(slave, options) {
		const dOptions = substituteImplicitOptions(options, "lips");
		const p = App.Medicine.Surgery.Procedures.lipImplantProcedure;
		const procedures = implantSizingProcedures(slave, "lips", dOptions, p);

		if (slave.lips >= 10 && slave.lipsImplant === 0 && slave.indentureRestrictions < 2) {
			procedures.push(p.reduce(slave, "reduce", 10));
		}

		return procedures;
	}
}();

/**
 * Clean up extremities on removal or piercings, tats, and brands
 * For limbs use removeLimbs()
 * @param {App.Entity.SlaveState} slave
 * @param {string} part
 * @param {boolean} [cheat]
 */
globalThis.surgeryAmp = function(slave, part, cheat = false) {
	switch (part) {
		case "left ear":
			App.Medicine.Modification.removeBrand(slave, "left ear");
			slave.earShape = "none";
			slave.earT = "none";
			slave.piercing.ear.weight = 0;
			surgeryDamage(slave, 10, cheat);
			break;
		case "right ear":
			App.Medicine.Modification.removeBrand(slave, "right ear");
			slave.earShape = "none";
			slave.earT = "none";
			slave.piercing.ear.weight = 0;
			surgeryDamage(slave, 10, cheat);
			break;
		case "dick":
			slave.dick = 0;
			slave.foreskin = 0;
			slave.skill.penetrative = Math.clamp(slave.skill.penetrative -= 30, 0, 100);
			slave.dickTat = 0;
			slave.dickAccessory = "none";
			slave.chastityPenis = 0;
			if (slave.vagina === -1) {
				slave.piercing.genitals.weight = 0;
				slave.piercing.genitals.smart = false;
			}
			if (slave.drugs === "penis enhancement" || slave.drugs === "hyper penis enhancement" || slave.drugs === "breast redistributors") {
				slave.drugs = "no drugs";
			}
			surgeryDamage(slave, 20, cheat);
			break;
		case "vagina":
			slave.vagina = -1;
			slave.ovaries = 0;
			slave.preg = -2;
			slave.pregSource = 0;
			slave.skill.vaginal = 0;
			slave.vaginaTat = 0;
			slave.vaginalAccessory = "none";
			slave.vaginalAttachment = "none";
			slave.chastityVagina = 0;
			if (slave.cervixImplant === 1) {
				slave.cervixImplant = 0;
			} else if (slave.cervixImplant === 3) {
				slave.cervixImplant = 2;
			}
			surgeryDamage(slave, 20, cheat);
			break;
		case "voicebox":
			slave.voice = 0;
			slave.voiceImplant = 0;
			surgeryDamage(slave, 10, cheat);
			break;
		default:
			// eslint-disable-next-line no-console
			console.log(`ERROR: Unknown amputation type: ` + part);
	}
};

/**
 * @param {FC.HumanState} slave
 * @param {"both"|"left"|"right"} side
 * @param {"normal"|"glass"|"cybernetic"|"remove"|"blind"|"blur"|"fix"} action
 */
globalThis.eyeSurgery = function(slave, side, action) {
	if (side === "both") {
		eyeSurgery(slave, "left", action);
		eyeSurgery(slave, "right", action);
		return;
	}

	if (side !== "left" && side !== "right") {
		return;
	} // make sure side can be used to access the object
	const eyeExists = slave.eye[side] !== null;

	/* actions that don't need an eye */
	switch (action) {
		case "normal":
			addEye(slave); // color overwritten by genetics
			return;
		case "glass":
			if (!eyeExists) { // color stays the same if possible
				addEye(slave);
			}
			slave.eye[side].type = 2;
			slave.eye[side].vision = 0;
			return;
		case "cybernetic":
			if (!eyeExists) { // color stays the same if possible
				addEye(slave);
			}
			slave.eye[side].type = 3;
			slave.eye[side].vision = 2;
			return;
		case "remove":
			if (eyeExists) {
				slave.eye[side] = null;
			}
			return;
		case "blind":
			if (eyeExists) {
				slave.eye[side].vision = 0;
			}
			return;
		case "blur":
			if (eyeExists) {
				slave.eye[side].vision = 1;
			}
			return;
		case "fix":
			if (eyeExists) {
				slave.eye[side].vision = 2;
			}
			if (["corrective glasses", "corrective contacts"].includes(slave.eyewear)) {
				slave.eyewear = "none";
			}
			return;
		default:
			throw Error(`${typeof action} "${action}" not found`);
	}

	function addEye(slave) {
		slave.eye[side] = new App.Entity.SingleEyeState();
		resetEyeColor(slave, side);
	}
};

/**
 * To be used during slave generation or slave styling (auto salon)
 *
 * @param {App.Entity.SlaveState} slave
 * @param {string} color to set eye to
 * @param {string} [side] "left", "right", "both"
 */
globalThis.setEyeColor = function(slave, color, side = "both") {
	if (side === "both") {
		setEyeColor(slave, color, "left");
		setEyeColor(slave, color, "right");
		return;
	}

	if (side !== "left" && side !== "right") {
		return;
	}

	if (!slave.eye[side]) {
		return;
	}

	slave.eye[side].iris = color;
};

/**
 * Set all colors of the eye.
 *
 * @param {FC.HumanState} slave
 * @param {string} iris
 * @param {string} pupil
 * @param {string} sclera
 * @param {string} side
 */
globalThis.setEyeColorFull = function(slave, iris = "brown", pupil = "circular", sclera = "white", side = "both") {
	if (side === "both") {
		setEyeColorFull(slave, iris, pupil, sclera, "left");
		setEyeColorFull(slave, iris, pupil, sclera, "right");
		return;
	}

	if (side !== "left" && side !== "right") {
		return;
	}

	if (!slave.eye[side]) {
		return;
	}

	if (iris !== "") {
		slave.eye[side].iris = iris;
	}
	if (pupil !== "") {
		slave.eye[side].pupil = pupil;
	}
	if (sclera !== "") {
		slave.eye[side].sclera = sclera;
	}
};

/**
 * Set genetic eye color
 *
 * @param {App.Entity.SlaveState} slave
 * @param {string} color
 * @param {boolean} heterochromia
 */
globalThis.setGeneticEyeColor = function(slave, color, heterochromia = false) {
	if (heterochromia) {
		slave.geneticQuirks.heterochromia = color;
	} else {
		slave.eye.origColor = color;
	}
};

/**
 * Sets the eye color to the genetic color.
 * Takes heterochromia and albinism into account.
 *
 * @param {FC.HumanState} slave
 * @param {FC.BodySideAll} [side="both"]
 */
globalThis.resetEyeColor = function(slave, side = "both") {
	if (side === "both") {
		resetEyeColor(slave, "left");
		resetEyeColor(slave, "right");
		return;
	}

	if (side !== "left" && side !== "right") {
		return;
	}

	slave.eye[side].iris = getGeneticEyeColor(slave, side, "iris");
	slave.eye[side].pupil = getGeneticEyeColor(slave, side, "pupil");
	slave.eye[side].sclera = getGeneticEyeColor(slave, side, "sclera");
};

/**
 * @param {FC.HumanState} slave
 * @param {FC.GeneticQuirk} level
 */
globalThis.induceAlbinism = function(slave, level) {
	slave.geneticQuirks.albinism = level;
	if (level < 2) {
		slave.albinismOverride = null;
		return;
	}
	slave.albinismOverride = makeAlbinismOverride(slave.race);
};

/**
 * Allowed values for limb:
 * left arm, right arm, left leg, right leg, all
 *
 * @param {App.Entity.SlaveState} slave
 * @param {FC.LimbArgumentAll} limb
 */
globalThis.removeLimbs = function(slave, limb) {
	function remove(limb, side) {
		const prosthetic = findProsthetic(slave, limbToProsthetic(slave[limb][side].type));

		if (prosthetic) {
			prosthetic[limb][side] = slave[limb][side];
		}

		slave[limb][side] = null;
	}

	function cleanLegs() {
		if (!hasAnyLegs(slave)) {
			slave.legsTat = 0;
			slave.shoes = "none";
			slave.legAccessory = "none";
			slave.heels = 0;
			if (slave.heightImplant !== 0) {
				slave.height -= slave.heightImplant * 10;
			}
			slave.heightImplant = 0;
		}
	}

	switch (limb) {
		case "left arm":
			if (!hasLeftArm(slave)) {
				return;
			}
			remove("arm", "left");
			// slave.armsTat = 0;
			if (!hasAnyArms(slave)) {
				slave.armAccessory = "none";
				// slave.nails = 0;
			}
			break;
		case "right arm":
			if (!hasRightArm(slave)) {
				return;
			}
			remove("arm", "right");
			// slave.armsTat = 0;
			if (!hasAnyArms(slave)) {
				slave.armAccessory = "none";
				// slave.nails = 0;
			}
			break;
		case "left leg":
			if (!hasLeftLeg(slave)) {
				return;
			}
			remove("leg", "left");
			cleanLegs();
			break;
		case "right leg":
			if (!hasRightLeg(slave)) {
				return;
			}
			remove("leg", "right");
			cleanLegs();
			break;
		case "all":
			removeLimbs(slave, "left arm");
			removeLimbs(slave, "right arm");
			removeLimbs(slave, "left leg");
			removeLimbs(slave, "right leg");
			break;
	}
};

/**
 * Expects amputated limbs. Will overwrite existing limbs.
 *
 * Allowed values for limb:
 * left arm, right arm, left leg, right leg, all
 *
 * @param {App.Entity.SlaveState} slave
 * @param {FC.LimbArgumentAll} limb
 * @param {number} id
 */
globalThis.attachLimbs = function(slave, limb, id) {
	/**
	 * @param {"arm"|"leg"} limb
	 * @param {FC.BodySide} side
	 */
	function attach(limb, side) {
		let prosthetic = findProsthetic(slave, limbToProsthetic(id));

		if (prosthetic) {
			slave[limb][side] = prosthetic[limb][side];
		} else {
			if (limb === "arm") {
				slave[limb][side] = new App.Entity.ArmState();
			} else {
				slave[limb][side] = new App.Entity.LegState();
			}
			slave[limb][side].type = id;
		}
	}

	switch (limb) {
		case "left arm":
			attach("arm", "left");
			break;
		case "right arm":
			attach("arm", "right");
			break;
		case "left leg":
			attach("leg", "left");
			break;
		case "right leg":
			attach("leg", "right");
			break;
		case "all":
			attachLimbs(slave, "left arm", id);
			attachLimbs(slave, "right arm", id);
			attachLimbs(slave, "left leg", id);
			attachLimbs(slave, "right leg", id);
			break;
		default:
			// eslint-disable-next-line no-console
			console.log(`ERROR: Unknown attach point: ` + limb);
	}
};

globalThis.upgradeLimbs = function(slave, newId) {
	let changed = false;

	/**
	 * @param {number} oldId
	 * @returns {number}
	 */
	function computeUpgrade(oldId) {
		if (newId < 2) {
			return oldId;
		} else if (newId === 2 && oldId === 0) {
			return 2;
		} else if (newId < 6 && oldId <= 2) {
			return newId;
		} else if (newId > 6 && oldId <= 7) {
			return newId;
		} else if (newId < 6 && oldId > 6) {
			return newId;
		} else if (newId > oldId && newId < 7) {
			return newId;
		} else {
			return oldId;
		}
	}

	/**
	 * @param {FC.LimbArgumentAll} limb
	 * @param {function(App.Entity.SlaveState): number} idFunction
	 */
	function upgradeLimb(limb, idFunction) {
		let oldId = idFunction(slave);
		if (oldId === 1) {
			return;
		}
		if (oldId > 1) {
			removeLimbs(slave, limb);
		}
		if (newId > 1) {
			attachLimbs(slave, limb, computeUpgrade(oldId));
		}
		if (oldId !== idFunction(slave)) {
			changed = true;
		}
	}

	upgradeLimb("left arm", getLeftArmID);
	upgradeLimb("right arm", getRightArmID);
	upgradeLimb("left leg", getLeftLegID);
	upgradeLimb("right leg", getRightLegID);

	return changed;
};

/**
 * Changes a slaves limbs to the specified value AND sets all related variables.
 * Intended for giving prosthetics during slave generation and events.
 *
 * @param {App.Entity.SlaveState} slave
 * @param {FC.LimbArgumentAll} limb
 * @param {number} id
 * @param {boolean} clean if the slave should be cleaned of all existing
 */
globalThis.configureLimbs = function(slave, limb, id, clean = false) {
	if (limb === "all") {
		configureLimbs(slave, "left arm", id);
		configureLimbs(slave, "right arm", id);
		configureLimbs(slave, "left leg", id);
		configureLimbs(slave, "right leg", id);
		return;
	}

	if (clean) {
		slave.PLimb = 0;
		slave.readyProsthetics = [];
	}

	let p = limbToProsthetic(id);
	if (p) {
		addProsthetic(slave, p);
	}

	if (id === 6 && slave.PLimb < 2) {
		slave.PLimb = 2;
		addProsthetic(slave, "interfaceP2");
	} else if ([2, 3, 4, 5].includes(id) && slave.PLimb < 1) {
		slave.PLimb = 1;
		addProsthetic(slave, "interfaceP1");
	} else if (id > 6 && slave.PLimb < 3) {
		slave.PLimb = 3;
		addProsthetic(slave, "interfaceP3");
	}

	switch (limb) {
		case "left arm":
			if (id !== getLeftArmID(slave)) {
				removeLimbs(slave, "left arm");
				if (id > 0) {
					attachLimbs(slave, "left arm", id);
				}
			}
			break;
		case "right arm":
			if (id !== getRightArmID(slave)) {
				removeLimbs(slave, "right arm");
				if (id > 0) {
					attachLimbs(slave, "right arm", id);
				}
			}
			break;
		case "left leg":
			if (id !== getLeftLegID(slave)) {
				removeLimbs(slave, "left leg");
				if (id > 0) {
					attachLimbs(slave, "left leg", id);
				}
			}
			break;
		case "right leg":
			if (id !== getRightLegID(slave)) {
				removeLimbs(slave, "right leg");
				if (id > 0) {
					attachLimbs(slave, "right leg", id);
				}
			}
			break;
	}
};

/**
 * Prepare and set up for new Fuckdoll
 * @param {App.Entity.SlaveState} slave
 */
globalThis.beginFuckdoll = function(slave) {
	slave.fuckdoll = 1;
	slave.toyHole = "all her holes";
	if ((slave.pubicHStyle !== "bald") && (slave.pubicHStyle !== "hairless")) {
		slave.pubicHStyle = "waxed";
	}
	slave.rules.living = "spare";
	slave.rules.speech = "restrictive";
	slave.rules.release.masturbation = 0;
	slave.rules.release.facilityLeader = 0;
	slave.rules.release.partner = 0;
	slave.rules.release.family = 0;
	slave.rules.release.slaves = 0;
	slave.rules.relationship = "restrictive";
	slave.choosesOwnClothes = 0;
	slave.clothes = "a Fuckdoll suit";
	slave.collar = "none";
	slave.faceAccessory = "none";
	slave.mouthAccessory = "none";
	if ((!hasAnyLegs(slave)) || (slave.shoes !== "none")) {
		slave.shoes = "heels";
	}
	slave.armAccessory = "none";
	slave.legAccessory = "none";
	slave.vaginalAccessory = "none";
	slave.vaginalAttachment = "none";
	slave.dickAccessory = "none";
	slave.buttplug = "none";
	slave.chastityAnus = 0;
	slave.chastityPenis = 0;
	slave.chastityVagina = 0;
	slave.attrKnown = 1;
	slave.fetishKnown = 1;
	slave.subTarget = 0;
	slave.sentence = 0;
	slave.training = 0;
	deflate(slave);
};

/**
 * Calculates the added artificiality a face surgery introduces.
 *
 * @returns {number}
 */
globalThis.faceSurgeryArtificiality = function() {
	return 25 -
		(5 * Math.trunc(V.PC.skill.medicine / 50)) -
		(10 * V.surgeryUpgrade);
};
