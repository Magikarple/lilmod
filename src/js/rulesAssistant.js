/**
 * @param {App.Entity.SlaveState} slave
 * @param {object[]} rules
 * @returns {boolean}
 */
globalThis.hasSurgeryRule = function(slave, rules) {
	return rules.some(rule => ruleApplied(slave, rule));
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {object[]} rules
 * @param {string} what
 * @returns {boolean}
 */
globalThis.hasRuleFor = function(slave, rules, what) {
	return rules.some(
		rule => ruleApplied(slave, rule) && rule[what] !== null);
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {object[]} rules
 * @returns {boolean}
 */
globalThis.hasHColorRule = function(slave, rules) {
	return hasRuleFor(slave, rules, "hColor");
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {FC.RA.Rule[]} rules
 * @returns {boolean}
 * */
globalThis.hasHStyleRule = function(slave, rules) {
	return hasRuleFor(slave, rules, "hStyle");
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {FC.RA.Rule[]} rules
 * @returns {boolean}
 * */
globalThis.hasEyeColorRule = function(slave, rules) {
	return hasRuleFor(slave, rules, "eyeColor");
};

/**
 * True, if the slave should be on contraceptives based on applied rules.
 *
 * @param {App.Entity.SlaveState} slave
 * @param {FC.RA.Rule[]} rules
 * @returns {boolean}
 */
globalThis.rulesDemandContraceptives = function(slave, rules) {
	// iterate over rules backwards, as the last rule has the highest priority
	for (let i = 0; i < rules.length; i++) {
		const rule = rules[rules.length - i - 1];
		if (ruleApplied(slave, rule) && rule.set.preg != null) {
			return rule.set.preg;
		}
	}
	return false;
};

/**
 * @param {Array<[FC.RA.RuleSetters, string]>} rules
 * @returns {[FC.RA.RuleSetters,object]}
 */
globalThis.mergeRules = function(rules) {
	if (rules.length === 0) {
		return [App.RA.newRule.setters(), {}];
	}

	const combinedRule = App.RA.newRule.setters();
	const sourceRecord = {};

	rules.forEach(rule => {
		App.RA.ruleDeepAssign(combinedRule, rule[0], sourceRecord, rule[1]);
	});
	return [combinedRule, sourceRecord];
};

/**
 * return if a rule is applied on a slave
 * @param {App.Entity.SlaveState} slave
 * @param {FC.RA.Rule} rule
 * @returns {boolean}
 */
globalThis.ruleApplied = function(slave, rule) {
	return slave.currentRules.includes(rule.ID);
};

/**
 * remove slave from the facility described by the rule
 * @param {App.Entity.SlaveState} slave
 * @param {object} rule
 * @returns {string}
 */
globalThis.RAFacilityRemove = function(slave, rule) {
	let r = "";
	if (!rule.facilityRemove) { return r; }
	if (slave.assignment === rule.setAssignment) {
		const facilityName = App.Utils.jobForAssignment(rule.setAssignment).facility.name;
		r += `<br>${slave.slaveName} has been removed from ${facilityName} and has been assigned to ${rule.removalAssignment}.`;
		assignJob(slave, rule.removalAssignment);
	}
	return r;
};

/**
 * return whether the rule applies to the slave
 * @param {FC.RA.Rule} rule
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean} flag */
globalThis.ruleAppliesP = function(rule, slave) {
	let V = State.variables;
	let cond = rule.condition;

	// Check if slave should be excluded from having rule applied to again
	if (cond.applyRuleOnce) {
		if (!V.rulesToApplyOnce[rule.ID]) {
			V.rulesToApplyOnce[rule.ID] = [];
		}
		if (V.rulesToApplyOnce[rule.ID].includes(slave.ID)) {
			return false;
		}
	} else {
		if (V.rulesToApplyOnce[rule.ID]) {
			delete V.rulesToApplyOnce[rule.ID];
		}
	}

	//  special slaves / specific slaves check
	if (cond.selectedSlaves.length > 0 && !cond.selectedSlaves.includes(slave.ID)) {
		return false;
	} else if (cond.excludedSlaves.includes(slave.ID)) {
		return false;
	}

	// attribute / function check
	if (!App.RA.Activation.evaluate(slave, cond.activation)) {
		return false;
	}

	if (cond.applyRuleOnce) {
		V.rulesToApplyOnce[rule.ID].push(slave.ID);
	}
	// If rule always applies.
	if (cond.applyRuleOnce && !V.rulesToApplyOnce[rule.ID].includes(slave.ID)) {
		V.rulesToApplyOnce[rule.ID].push(slave.ID);
	}

	return true;
};

App.RA.newRule = function() {
	return {
		rule: emptyRule,
		conditions: emptyConditions,
		setters: emptySetters,
		growth: emptyGrowth,
		surgery: emptySurgery,
		genes: emptyGenes
	};

	/** @returns {FC.RA.Rule} */
	function emptyRule() {
		const id = generateNewID();
		return {
			ID: id,
			name: `Rule ${id}`,
			condition: emptyConditions(),
			set: emptySetters()
		};
	}

	/** @returns {FC.RA.RuleConditions} */
	function emptyConditions() {
		return {
			activation: ["devotion", 20, "gt", 1, "and"],
			advancedMode: V.raDefaultMode === 1,
			selectedSlaves: [],
			excludedSlaves: [],
			applyRuleOnce: false,
		};
	}
	/** @returns {FC.RA.RuleSetters} */
	function emptySetters() {
		return {
			releaseRules: emptyRelease(),
			toyHole: null,
			clitSetting: null,
			clitSettingXY: null,
			clitSettingXX: null,
			clitSettingEnergy: null,
			speechRules: null,
			choosesOwnClothes: null,
			clothes: null,
			collar: null,
			faceAccessory: null,
			mouthAccessory: null,
			shoes: null,
			armAccessory: null,
			legAccessory: null,
			chastityVagina: null,
			chastityAnus: null,
			chastityPenis: null,
			virginAccessory: null,
			vaginaLube: null,
			aVirginAccessory: null,
			vaginalAccessory: null,
			aVirginDickAccessory: null,
			dickAccessory: null,
			bellyAccessory: null,
			aVirginButtplug: null,
			buttplug: null,
			buttplugAttachment: null,
			vaginalAttachment: null,
			iris: null,
			sclera: null,
			pupil: null,
			makeup: null,
			nails: null,
			hColor: null,
			hornColor: null,
			hLength: null,
			haircuts: null,
			hStyle: null,
			eyebrowHColor: null,
			eyebrowHStyle: null,
			eyebrowFullness: null,
			markings: null,
			pubicHColor: null,
			pubicHStyle: null,
			piercing: new App.Entity.completePiercingStateRA(),
			boobsTat: null,
			buttTat: null,
			vaginaTat: null,
			dickTat: null,
			lipsTat: null,
			anusTat: null,
			shouldersTat: null,
			armsTat: null,
			legsTat: null,
			backTat: null,
			stampTat: null,
			birthsTat: null,
			abortionTat: null,
			brandDesign: null,
			brandTarget: null,
			scarTarget: null,
			scarDesign: null,
			curatives: null,
			livingRules: null,
			restRules: null,
			mobilityRules: null,
			relationshipRules: null,
			lactationRules: null,
			standardPunishment: null,
			standardReward: null,
			weight: null,
			diet: null,
			dietCum: null,
			dietMilk: null,
			onDiet: null,
			muscles: null,
			XY: null,
			XX: null,
			gelding: null,
			preg: null,
			abortion: null,
			growth: emptyGrowth(),
			// TODO: rename snake_case to camelCase?
			// eslint-disable-next-line camelcase
			hyper_drugs: 0,
			aphrodisiacs: null,
			autoBrand: 0,
			pornFeed: null,
			pornFameSpending: null,
			dietGrowthSupport: 0,
			eyewear: null,
			earwear: null,
			setAssignment: null,
			pitRules: null,
			arenaRules: null,
			facilityRemove: false,
			removalAssignment: Job.REST,
			surgery: emptySurgery(),
			underArmHColor: null,
			underArmHStyle: null,
			drug: null,
			eyes: null,
			pregSpeed: null,
			bellyImplantVol: -1,
			teeth: null,
			label: null,
			removeLabel: null,
			skinColor: null,
			inflationType: null,
			labelTagsClear: null,
			pronoun: null,
			posePrompt: null,
			expressionPositivePrompt: null,
			expressionNegativePrompt: null,
			positivePrompt: null,
			negativePrompt: null,
			overridePrompts: null,
			openPoseName: null,
			openPoseType: null,
			aiAutoRegenExclude: null,
		};
	}

	/** @returns {FC.RA.RuleReleaseSetters} */
	function emptyRelease() {
		return {
			masturbation: null,
			partner: null,
			facilityLeader: null,
			family: null,
			slaves: null,
			master: null
		};
	}

	/** @returns {FC.RA.RuleGrowthSetters} */
	function emptyGrowth() {
		return {
			boobs: null,
			butt: null,
			lips: null,
			dick: null,
			balls: null,
			intensity: 0
		};
	}

	/** @returns {FC.RA.RuleSurgerySettings} */
	function emptySurgery() {
		return {
			voice: null,
			eyes: null,
			hears: null,
			smells: null,
			tastes: null,
			lactation: null,
			prostate: null,
			ovaImplant: null,
			ovaImplantAllowReplacing: true,
			cosmetic: null,
			accent: null,
			shoulders: null,
			shouldersImplant: null,
			boobs: null,
			boobsImplantTypes: null,
			boobsImplantAllowReplacing: true,
			hips: null,
			hipsImplant: null,
			butt: null,
			buttImplantTypes: null,
			buttImplantAllowReplacing: true,
			faceShape: null,
			lips: null,
			holes: null,
			tummy: null,
			hair: null,
			bodyhair: null,
			vasectomy: null,
			earShape: null,
			horn: null,
			bellyImplant: null,
			genes: emptyGenes()
		};
	}

	/** @returns {FC.RA.RuleGenesSettings} */
	function emptyGenes() {
		return {
			NCS: null,
			rapidCellGrowth: null,
			immortality: null,
			flavoring: null,
			aggressiveSperm: null,
			livestock: null,
			progenitor: null,
			macromastia: null,
			gigantomastia: null,
			potent: null,
			fertility: null,
			hyperFertility: null,
			superfetation: null,
			polyhydramnios: null,
			uterineHypersensitivity: null,
			galactorrhea: null,
			gigantism: null,
			dwarfism: null,
			neoteny: null,
			progeria: null,
			albinism: null,
			rearLipedema: null,
			wellHung: null,
			wGain: null,
			wLoss: null,
			androgyny: null,
			mGain: null,
			mLoss: null,
		};
	}
}();

/**
 * @returns {FC.RA.Rule}
 */
globalThis.emptyDefaultRule = App.RA.newRule.rule;


/**
 * Creates RA target object used in rules for body properties
 * @param {"=="|">="|"<="|">"|"<"} condition comparison condition.
 * @param {number} val target value
 * @returns {FC.RA.NumericTarget}
 */
App.RA.makeTarget = function(condition, val) {
	return {
		cond: condition,
		val: val
	};
};

/**
 * Shall the current value be increased according to the target and condition
 * @param {number} current
 * @param {FC.RA.NumericTarget} target
 * @param {number} [step=1] change step
 * @returns {boolean}
 */
App.RA.shallGrow = function(current, target, step = 1) {
	return target && (((current + step <= target.val) && (target.cond === '==')) ||
		((current < target.val) && (target.cond === '>=' || target.cond === '>')) ||
		(current === target.val && target.cond === '>'));
};

/**
 * Shall the current value be decreased according to the target and condition
 * @param {number} current
 * @param {FC.RA.NumericTarget} target
 * @param {number} [step=1]
 * @returns {boolean}
 */
App.RA.shallShrink = function(current, target, step = 1) {
	return target && (((current - step >= target.val) && (target.cond === '==')) ||
		((current > target.val) && (target.cond === '<=' || target.cond === '<')) ||
		(current === target.val && target.cond === '<'));
};

/**
 * @template {object} T
 * @param {object} target Rule or rule part
 * @param {T} source Rule or rule part, describes the same part as target
 * @param {object} sourceRecord record what was overwritten. Overwrites are located the same as in target, marked with
 * sourceName. Describes the same rule(part) as target.
 * @param {string} sourceName Name for the source object.
 * @returns {T}
 */
App.RA.ruleDeepAssign = function deepAssign(target, source, sourceRecord, sourceName) {
	function isObject(o) {
		return (o !== undefined && o !== null && typeof o === 'object' && !Array.isArray(o));
	}

	for (const key in source) {
		if (!source.hasOwnProperty(key)) {
			continue;
		}
		if (isObject(source[key])) {
			if (!target.hasOwnProperty(key) || target[key] === null) {
				target[key] = {};
			}
			if (!sourceRecord.hasOwnProperty(key)) {
				sourceRecord[key] = {};
			}
			deepAssign(target[key], source[key], sourceRecord[key], sourceName);
		} else if (key === "label" || key === "removeLabel") {
			if (source[key] != null) {
				if (target[key] != null) {
					target[key] += "|" + source[key];
					sourceRecord[key] += "+" + sourceName;
				} else {
					target[key] = source[key];
					sourceRecord[key] = sourceName;
				}
			}
		} else if ((key === "positivePrompt" || key === "negativePrompt") && source[key] !== null) {
			if (source.overridePrompts) {
				target[key] = source[key];
				sourceRecord[key] = sourceName;
			} else {
				if (target[key] != null) {
					target[key] = source[key] + ", " + target[key];
					sourceRecord[key] += "+" + sourceName;
				} else {
					target[key] = source[key];
					sourceRecord[key] = sourceName;
				}
			}
		} else {
			// A rule overrides any preceding ones if,
			// * there are no preceding ones,
			// * or it sets autoBrand,
			// * or it does not set autoBrand and is not null
			const overrides = (
				target[key] === undefined || target[key] === null ||
				(key === "autoBrand" && source[key]) ||
				(key !== "autoBrand" && source[key] !== null));
			if (overrides) {
				target[key] = source[key];
				if (source[key] !== null) {
					sourceRecord[key] = sourceName;
				}
			}
		}
	}
	return target;
};

globalThis.initRules = function() {
	const rule = emptyDefaultRule();
	rule.name = "Obedient Slaves";
	rule.condition.activation = ["devotion", 20, "gte", 1, "and"];

	V.defaultRules = [rule];
	V.rulesToApplyOnce = {};
};
