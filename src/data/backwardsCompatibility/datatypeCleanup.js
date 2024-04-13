/**
 * Applies data scheme updates to the slave object
 *
 * This function only handles data scheme changes (attribute renaming, other reorganizations)
 * and in general pays no attention to the property values unless they need to be changed due
 * to the schema change.
 */
App.Entity.Utils.SlaveDataSchemeCleanup = (function() {
	"use strict";
	return SlaveDataSchemeCleanup;

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function SlaveDataSchemeCleanup(slave) {
		migrateRules(slave);
		migrateReleaseRules(slave.rules);
		migratePorn(slave);
		migrateSkills(slave);
		migrateCounters(slave);
		migrateCustomProperties(slave);
		if (V.releaseID < 1161) {
			migrateBrand(slave);
			migrateScars(slave);
		}
		migrateHealth(slave);
		App.Entity.Utils.migratePronouns(slave);

		App.Update.deleteProperties(slave, ["assignmentVisible", "tired"]);
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function migrateHealth(slave) {
		if (typeof slave.health === "number") {
			const condition = slave.health;
			slave.health = {
				condition: condition,
				shortDamage: 0,
				longDamage: 0,
				illness: 0,
				tired: 0,
				health: condition
			};
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function migrateRules(slave) {
		if (!slave.hasOwnProperty("rules")) {
			slave.rules = new App.Entity.RuleState();
			App.Update.moveProperties(slave.rules, slave, {
				lactation: "lactationRules",
				living: "livingRules",
				relationship: "relationshipRules",
				release: "releaseRules",
				speech: "speechRules",
				punishment: "standardPunishment",
				reward: "standardReward"
			});
		}
	}

	/**
	 * Must be run AFTER migrateRules
	 * @param {App.Entity.RuleState} rulestate
	 */
	function migrateReleaseRules(rulestate) {
		if (typeof rulestate.release === "string") {
			let newRule = new App.Entity.ReleaseRulesState();
			switch (rulestate.release) {
				case "chastity":
					newRule.masturbation = 0;
					newRule.partner = 0;
					newRule.facilityLeader = 0;
					newRule.family = 0;
					newRule.slaves = 0;
					newRule.master = 0;
					break;
				case "restrictive":
					newRule.masturbation = 0;
					newRule.partner = 1;
					newRule.facilityLeader = 1;
					newRule.family = 0;
					newRule.slaves = 0;
					newRule.master = 1;
					break;
				case "masturbation":
					newRule.masturbation = 1;
					newRule.partner = 0;
					newRule.facilityLeader = 1;
					newRule.family = 0;
					newRule.slaves = 0;
					newRule.master = 1;
					break;
				case "sapphic":
					newRule.masturbation = 0;
					newRule.partner = 1;
					newRule.facilityLeader = 1;
					newRule.family = 1;
					newRule.slaves = 1;
					newRule.master = 1;
					break;
				case "permissive":
					newRule.masturbation = 1;
					newRule.partner = 1;
					newRule.facilityLeader = 1;
					newRule.family = 1;
					newRule.slaves = 1;
					newRule.master = 1;
					break;
			}
			rulestate.release = newRule;
		} else if (typeof rulestate.release !== "object" || rulestate.release === null) {
			rulestate.release = new App.Entity.ReleaseRulesState();
		} else if (typeof rulestate.release.facilityLeader !== "number") {
			rulestate.release.facilityLeader = 1;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function migratePorn(slave) {
		if (!slave.hasOwnProperty("porn")) {
			slave.porn = new App.Entity.SlavePornPerformanceState();
			const pornType = "pornType";
			const pornTypeLength = pornType.length;
			for (let prop in slave) {
				if (prop.startsWith("pornType")) {
					let fameName = prop.substr(pornTypeLength);
					// lowercase first character
					fameName = fameName.charAt(0).toLowerCase() + fameName.substr(1);
					slave.porn.fame[fameName] = slave[prop];
					delete slave[prop];
				}
			}
			App.Update.moveProperties(slave.porn, slave, {
				fameType: "pornFameType",
				focus: "pornFocus"
			});
		}

		App.Update.moveProperties(slave.porn, slave, {
			feed: "pornFeed",
			viewerCount: "pornFame",
			spending: "pornFameSpending",
			prestige: "pornPrestige",
			prestigeDesc: "pornPrestigeDesc",
		});
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function migrateSkills(slave) {
		if (!slave.hasOwnProperty("skill")) {
			slave.skill = new App.Entity.SlaveSkillsState();
			App.Update.moveProperties(slave.skill, slave, {
				anal: "analSkill",
				combat: "combatSkill",
				entertainment: "entertainSkill",
				oral: "oralSkill",
				vaginal: "vaginalSkill",
				whoring: "whoreSkill"
			});

			const nameMap = {
				"HG": "headGirl",
				"RC": "recruiter",
				"BG": "bodyguard",
				"MD": "madam",
				"DJ": "DJ",
				"NU": "nurse",
				"TE": "teacher",
				"AT": "attendant",
				"MT": "matron",
				"ST": "stewardess",
				"MM": "milkmaid",
				"FA": "farmer",
				"WA": "wardeness",
				"S": "servant",
				"E": "entertainer",
				"W": "whore"
			};
			for (let prop in slave) {
				const skillStr = "skill";
				if (prop.length > skillStr.length && prop.startsWith(skillStr)) {
					let skillName = prop.substr(skillStr.length);
					slave.skill[nameMap[skillName]] = slave[prop];
					delete slave[prop];
				}
			}
		}
		if (!slave.skill.hasOwnProperty("penetrative")) {
			slave.skill.penetrative = 0;
			if (slave.pubertyXY === 1) {
				slave.skill.penetrative += 15;
			}
			if (slave.dick > 0 || slave.clit >= 3) {
				slave.skill.penetrative += 15;
			}
			if (slave.fetish === Fetish.DOM) {
				slave.skill.penetrative += 15;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function migrateCounters(slave) {
		if (!slave.hasOwnProperty("counter")) {
			slave.counter = new App.Entity.SlaveActionsCountersState();
			App.Update.moveProperties(slave.counter, slave, { // new <= old
				anal: "analCount",
				mammary: "mammaryCount",
				oral: "oralCount",
				penetrative: "penetrativeCount",
				vaginal: "vaginalCount",
				publicUse: "publicCount",
				pitKills: "pitKills",
				milk: "milk",
				cum: "cum",
				births: "births",
				birthsTotal: "birthsTotal",
				laborCount: "laborCount",
				slavesFathered: "slavesFathered",
				PCChildrenFathered: "PCChildrenFathered",
				slavesKnockedUp: "slavesKnockedUp",
				PCKnockedUp: "PCKnockedUp",
			});
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function migrateCustomProperties(slave) {
		if (!slave.hasOwnProperty("custom")) {
			slave.custom = new App.Entity.SlaveCustomAddonsState();
			const c = slave.custom;
			// custom image and format compose an object together
			if (slave.customImage !== "" && slave.customImage !== undefined) {
				c.image = {
					filename: slave.customImage,
					format: slave.customImageFormat || "png"
				};
			}
			App.Update.deleteProperties(slave, ["customImageFormat", "customImage"]);

			App.Update.moveProperties(c, slave, { // new <= old
				tattoo: "customTat",
				label: "customLabel",
				desc: "customDesc",
				title: "customTitle",
				titleLisp: "customTitleLisp",
				hairVector: "customHairVector"
			});
		}

		if (!slave.custom.hasOwnProperty("name")) {
			slave.custom.name = "";
		}

		if (!slave.custom.hasOwnProperty("aiImageIds")) {
			if (slave.custom.hasOwnProperty("aiImageId") && slave.custom.aiImageId !== null) {
				slave.custom.aiImageIds = [slave.custom.aiImageId];
				slave.custom.aiDisplayImageIdx = 0;
				delete slave.custom.aiImageId;
			} else {
				slave.custom.aiImageIds = [];
				slave.custom.aiDisplayImageIdx = -1;
			}
		}

		if (slave.custom.aiPrompts?.aiAutoRegenExclude) {
			slave.custom.aiAutoRegenExclude = 1;
			delete slave.custom.aiPrompts.aiAutoRegenExclude;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function migrateBrand(slave) {
		if (typeof slave.brand !== "object") {
			let brand = {};
			if (slave.brand !== 0) {
				brand["left buttock"] = slave.brand;
			}
			slave.brand = brand;
		} else if (typeof slave.brand === "object") { // Make sure key and value are strings
			for (let [key, value] of Object.entries(slave.brand)) {
				if (typeof key !== "string" || typeof value !== "string") {
					delete slave.brand[key];
				}
			}
		}

		/* Head */
		if (slave.brand.cheeks) {
			slave.brand["left cheek"] = slave.brand.cheeks;
			slave.brand["right cheek"] = slave.brand.cheeks;
			delete slave.brand.cheeks;
		}
		if (slave.brand.ears) {
			slave.brand["left ear"] = slave.brand.ears;
			slave.brand["right ear"] = slave.brand.ears;
			delete slave.brand.ears;
		}

		/* Torso */
		if (slave.brand.breasts) {
			slave.brand["left breast"] = slave.brand.breasts;
			slave.brand["right breast"] = slave.brand.breasts;
			delete slave.brand.breasts;
		}

		/* Arms */
		if (slave.brand.shoulders) {
			slave.brand["left shoulder"] = slave.brand.shoulders;
			slave.brand["right shoulder"] = slave.brand.shoulders;
			delete slave.brand.shoulders;
		}
		if (slave.brand["upper arms"]) {
			slave.brand["left upper arm"] = slave.brand["upper arms"];
			slave.brand["right upper arm"] = slave.brand["upper arms"];
			delete slave.brand["upper arms"];
		}
		if (slave.brand["lower arms"]) {
			slave.brand["left lower arm"] = slave.brand["lower arms"];
			slave.brand["right lower arm"] = slave.brand["lower arms"];
			delete slave.brand["lower arms"];
		}
		if (slave.brand.wrists) {
			slave.brand["left wrist"] = slave.brand.wrists;
			slave.brand["right wrist"] = slave.brand.wrists;
			delete slave.brand.wrists;
		}
		if (slave.brand.hands) {
			slave.brand["left hand"] = slave.brand.hands;
			slave.brand["right hand"] = slave.brand.hands;
			delete slave.brand.hands;
		}

		/* Legs */
		if (slave.brand.buttocks) {
			slave.brand["left buttock"] = slave.brand.buttocks;
			slave.brand["right buttock"] = slave.brand.buttocks;
			delete slave.brand.buttocks;
		}
		if (slave.brand.thighs) {
			slave.brand["left thigh"] = slave.brand.thighs;
			slave.brand["right thigh"] = slave.brand.thighs;
			delete slave.brand.thigh;
		}
		if (slave.brand.calves) {
			slave.brand["left calf"] = slave.brand.calves;
			slave.brand["right calf"] = slave.brand.calves;
			delete slave.brand.calves;
		}
		if (slave.brand.ankles) {
			slave.brand["left ankle"] = slave.brand.ankles;
			slave.brand["right ankle"] = slave.brand.ankles;
			delete slave.brand.ankles;
		}
		if (slave.brand.feet) {
			slave.brand["left foot"] = slave.brand.feet;
			slave.brand["right foot"] = slave.brand.feet;
			delete slave.brand.feet;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function migrateScars(slave) {
		if (!slave.hasOwnProperty("scar")) {
			slave.scar = {}; // switching to singular to match .brand and someday others.
		}
		if (slave.hasOwnProperty("scars")) { // even if it's 0
			if (slave.scars === 5) {
				App.Medicine.Modification.addScar(slave, "left cheek", "menacing"); // old location was not defined, but surgery described it as facial. Putting it on left cheek for a default.
			} else if (slave.scars === 6) {
				App.Medicine.Modification.addScar(slave, "left cheek", "exotic");
			} else if (slave.scars) { // not 0
				App.Medicine.Modification.addScar(slave, "left cheek", "generic");
			}
			delete slave.scars;
		}
		if (slave.hasOwnProperty("cSec")) { // if it's not 0
			if (slave.cSec) { // not 0
				App.Medicine.Modification.addScar(slave, "belly", "c-section");
			}
			delete slave.cSec; // delete even if 0
		}
	}
})();

/*
	This function does not ensure values make sense. For example, it does not fix weird relations/relationships/rivalries/pregnancies/prosthetics.
	It only makes sure most datatypes are correct, and sets to default if not. Number values are clamped to the correct bounds.
	Any values that are supposed to be objects or arrays are not handled (yet).

	A tutorial on how to add to this passage:
		The || operator can be very useful for setting default values. To be precise,
			x = y || z
		is the same thing as
			if (y) {x = y}
			else {x = z}
		This means that if z is the default value, in the ideal case you could write x = x || z. If x is already in use, this won't change it, and if x is not defined it will set it to z.
		However, for example, if x is 0 but the default is -1 this will actually set x to -1! So care must be taken.

		Let's say you want to add slave.value to this function, and you want it to be a number.
		First, you need to take whatever slave.value currently is, and turn it into a number. You can use either +slave.value or Number(slave.value) to do this.
		Second, you need to determine what range to restrict slave.value to. You'll either use Math.max, Math.min, Math.clamp, or none of them.
		Finally, you need to consider the default value if the .max/.min/.clamp returned 0 (or NaN). To make a long story short,
			Use slave.value = Math.max(+slave.value, a) || default; if you need slave.value >= a.
			Use slave.value = Math.min(+slave.value, a) || default; if you need slave.value <= a.
			Use slave.value = Math.clamp(+slave.value, a, b) || default; if you need a <= slave.value <= b.
			Use slave.value = +slave.value || default; if slave.value can be any number.
		The exception to this is if the default !== 0. In this case, it's usually good enough to just check if slave.value !== 0 first. The strict equality is important!

		If you want slave.value to be a string, there's no easy tricks to make sure it's already an accepted value. The simplest way is the following
			if (typeof slave.value !== "string") slave.value = default;
*/
globalThis.SlaveDatatypeCleanup = (function SlaveDatatypeCleanup() {
	"use strict";

	return SlaveDatatypeCleanup;

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {boolean} [isIncubatorSlave]
	 */
	function SlaveDatatypeCleanup(slave, isIncubatorSlave = false) {
		const oldSlave = (V.debugMode) ? clone(slave) : null;
		if (!isIncubatorSlave && !slave.tankBaby) {
			slaveAgeDatatypeCleanup(slave);
		}
		slavePhysicalDatatypeCleanup(slave);
		slaveFaceDatatypeCleanup(slave);
		slaveHairDatatypeCleanup(slave);
		slaveBoobsDatatypeCleanup(slave);
		slaveButtDatatypeCleanup(slave);
		slaveNekoDatatypeCleanup(slave);
		slavePregnancyDatatypeCleanup(slave);
		slaveBellyDatatypeCleanup(slave);
		slaveGenitaliaDatatypeCleanup(slave);
		slaveImplantsDatatypeCleanup(slave);
		App.Update.slavePiercingsDatatypeCleanup(slave);
		slaveTattooDatatypeCleanup(slave);
		slaveCosmeticsDatatypeCleanup(slave);
		slaveDietDatatypeCleanup(slave);
		slavePornDatatypeCleanup(slave);
		slaveRelationDatatypeCleanup(slave);
		slaveSkillsDatatypeCleanup(slave);
		slaveStatCountDatatypeCleanup(slave);
		slavePreferencesDatatypeCleanup(slave);
		slaveRulesDatatypeCleanup(slave);
		slaveCustomStatsDatatypeCleanup(slave);
		slaveMiscellaneousDatatypeCleanup(slave);
		if (typeof (slave.pronoun) !== "number") {
			generatePronouns(slave);
		}
		if (V.debugMode) {
			App.Utils.showSlaveChanges(slave, oldSlave, console.log);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function slaveAgeDatatypeCleanup(slave) {
		if (slave.birthWeek > 51) {
			slave.birthWeek = slave.birthWeek % 52;
		}
		slave.birthWeek = Math.clamp(+slave.birthWeek, 0, 51) || 0;
		if (slave.age > 0) {
			slave.actualAge = Math.clamp(+slave.actualAge, V.minimumSlaveAge, Infinity) || slave.age; /* if undefined, this sets to slave.age */
			delete slave.age;
		} else {
			slave.actualAge = Math.clamp(+slave.actualAge, V.minimumSlaveAge, Infinity) || 18;
		}
		slave.visualAge = Math.max(+slave.visualAge, 0) || slave.actualAge;
		slave.physicalAge = Math.max(+slave.physicalAge, 0) || slave.actualAge;
		if (typeof slave.ovaryAge !== "number") { // immortalOvaries intentionally sets ovaryAge to a negative number, so treat it more leniently
			slave.ovaryAge = slave.physicalAge;
		}
		slave.pubertyAgeXX = Math.max(+slave.pubertyAgeXX, 0) || V.fertilityAge;
		slave.pubertyAgeXY = Math.max(+slave.pubertyAgeXY, 0) || V.potencyAge;
		slave.ageAdjust = Math.clamp(+slave.ageAdjust, -40, 40) || 0;
		slave.NCSyouthening = Math.max(+slave.NCSyouthening, 0) || 0;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function slavePhysicalDatatypeCleanup(slave) {
		if (typeof slave.nationality !== "string") {
			slave.nationality = "slave";
		}
		if (typeof slave.race !== "string") {
			nationalityToRace(slave);
		}
		if (typeof slave.origRace !== "string") {
			slave.origRace = slave.race;
		}
		if (typeof slave.skin !== "string") {
			slave.skin = "light";
		}
		if (typeof slave.origSkin !== "string") {
			slave.origSkin = slave.skin;
		}
		if (typeof slave.minorInjury !== "string") {
			slave.minorInjury = 0;
		}

		slave.health.condition = Math.clamp(slave.health.condition, -100, 200) || 0;
		slave.health.shortDamage = Math.max(+slave.health.shortDamage, 0) || 0;
		slave.health.longDamage = Math.max(+slave.health.longDamage, 0) || 0;
		slave.health.illness = Math.max(+slave.health.illness, 0) || 0;
		slave.health.tired = Math.clamp(+slave.health.tired, 0, 100) || 0;
		updateHealth(slave);

		slave.muscles = Math.clamp(+slave.muscles, -100, 100) || 0;
		slave.weight = Math.clamp(+slave.weight, -100, 200) || 0;
		slave.waist = Math.clamp(+slave.waist, -100, 100) || 0;
		slave.height = Math.round(Math.max(+slave.height, 0)) || Height.mean(slave);
		slave.shoulders = Math.clamp(+slave.shoulders, -2, 2) || 0;
		slave.hips = Math.clamp(+slave.hips, -2, 3) || 0;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function slaveFaceDatatypeCleanup(slave) {
		slave.face = Math.clamp(+slave.face, -100, 100) || 0;
		if (typeof slave.faceShape !== "string") {
			slave.faceShape = "normal";
		}
		if (slave.lips !== 0) {
			slave.lips = Math.clamp(+slave.lips, 0, 100) || 15;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function slaveHairDatatypeCleanup(slave) {
		if (typeof slave.hColor !== "string") {
			slave.hColor = "brown";
		}
		if (typeof slave.origHColor !== "string") {
			slave.origHColor = slave.hColor;
		}
		if (slave.hLength !== 0) {
			slave.hLength = Math.clamp(+slave.hLength, 0, 300) || 60;
		}
		if (typeof slave.hStyle !== "string") {
			slave.hStyle = "neat";
		}
		slave.haircuts = Math.clamp(+slave.haircuts, 0, 1) || 0;
		slave.bald = Math.clamp(+slave.bald, 0, 1) || 0;
		if (typeof slave.pubicHColor !== "string") {
			slave.pubicHColor = slave.hColor;
		}
		if (typeof slave.pubicHStyle !== "string") {
			slave.pubicHStyle = "neat";
		}
		if (typeof slave.underArmHColor !== "string") {
			slave.underArmHColor = slave.hColor;
		}
		if (typeof slave.underArmHStyle !== "string") {
			slave.underArmHStyle = "waxed";
		}
		if (typeof slave.eyebrowHColor !== "string") {
			slave.eyebrowHColor = slave.hColor;
		}
		if (typeof slave.eyebrowHStyle !== "string") {
			slave.eyebrowHStyle = "natural";
		}
		if (typeof slave.eyebrowFullness !== "string") {
			slave.eyebrowFullness = "natural";
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function slaveBoobsDatatypeCleanup(slave) {
		slave.boobs = Math.max(+slave.boobs, 100) || 200;
		if (typeof slave.boobShape !== "string") {
			slave.boobShape = "normal";
		}
		if (slave.boobShape === "spherical" && slave.boobsImplant === 0) {
			slave.boobShape = "normal";
		}
		if (typeof slave.nipples !== "string") {
			slave.nipples = "cute";
		}
		if (typeof slave.nipplesAccessory !== "string") {
			slave.nipplesAccessory = "none";
		}
		slave.areolae = Math.clamp(+slave.areolae, 0, 4) || 0;
		if (typeof slave.areolaeShape !== "string") {
			slave.areolaeShape = "circle";
		}
		slave.lactation = Math.clamp(+slave.lactation, 0, 2) || 0;
		slave.boobsMilk = Math.max(+slave.boobsMilk, 0) || 0;
		if (slave.boobsMilk > 0 && App.Medicine.fleshSize(slave, 'boobs') < 0) {
			// should never get here, but if it does, just immediately abort!
			slave.boobsMilk = 0;
		}
		slave.lactationAdaptation = Math.clamp(+slave.lactationAdaptation, 0, 200) || 0;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function slaveButtDatatypeCleanup(slave) {
		if (slave.butt !== 0) {
			slave.butt = Math.clamp(+slave.butt, 0, 20) || 1;
		}
		slave.anus = Math.clamp(+slave.anus, 0, 4) || 0;
		slave.analArea = Math.max(+slave.analArea, 0) || 0;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function slaveNekoDatatypeCleanup(slave) {
		if (typeof slave.earShape !== "string") {
			slave.earShape = "normal";
		}
		if (typeof slave.earT !== "string") {
			slave.earT = "none";
		}
		if (typeof slave.earTColor !== "string") {
			slave.earTColor = "none";
		}
		if (typeof slave.horn !== "string") {
			slave.horn = "none";
		}
		if (typeof slave.hornColor !== "string") {
			slave.hornColor = "none";
		}
		if (typeof slave.tail !== "string") {
			slave.tail = "none";
		}
		if (typeof slave.tailShape !== "string") {
			slave.tailShape = "none";
		}
		if (typeof slave.tailColor !== "string") {
			slave.tailColor = "none";
		}
		if (typeof slave.appendages !== "string") {
			slave.appendages = "none";
		}
		if (typeof slave.wingsShape !== "string") {
			slave.wingsShape = "none";
		}
		if (typeof slave.appendagesColor !== "string") {
			slave.appendagesColor = "none";
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function slavePregnancyDatatypeCleanup(slave) {
		slave.induce = Math.clamp(+slave.induce, 0, 1) || 0;
		slave.labor = Math.clamp(+slave.labor, 0, 1) || 0;
		slave.prematureBirth = Math.clamp(+slave.prematureBirth, 0, 1) || 0;
		slave.ovaries = Math.clamp(+slave.ovaries, 0, 1) || 0;
		slave.vasectomy = Math.clamp(+slave.vasectomy, 0, 1) || 0;
		slave.mpreg = Math.clamp(+slave.mpreg, 0, 1) || 0;
		if (slave.pregAdaptation !== 0) {
			slave.pregAdaptation = Math.max(+slave.pregAdaptation, 0) || 50;
		}
		if (typeof slave.ovaImplant !== "string") {
			slave.ovaImplant = 0;
		}
		if (slave.pubertyXX === 0 && slave.ovaries > 0 && slave.preg === -1) {
			slave.preg = 0; // no contraceptives for prepubescent slaves
		}
		slave.fertPeak = Math.clamp(+slave.fertPeak, 0, 4) || 0;
		slave.broodmother = Math.clamp(+slave.broodmother, 0, 3) || 0;
		slave.broodmotherFetuses = Math.max(+slave.broodmotherFetuses, 0) || 0;
		slave.broodmotherOnHold = Math.clamp(+slave.broodmotherOnHold, 0, 1) || 0;
		slave.pregSource = +slave.pregSource || 0;
		if (typeof slave.pregControl !== "string") {
			slave.pregControl = "none";
		}
		WombNormalizePreg(slave);
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function slaveBellyDatatypeCleanup(slave) {
		slave.inflation = Math.clamp(+slave.inflation, 0, 3) || 0;
		if (typeof slave.inflationType !== "string") {
			slave.inflationType = "none";
		}
		slave.inflationMethod = Math.clamp(+slave.inflationMethod, 0, 3) || 0;
		slave.milkSource = Math.max(+slave.milkSource, 0) || 0;
		slave.cumSource = Math.max(+slave.cumSource, 0) || 0;
		slave.burst = Math.clamp(+slave.burst, 0, 1) || 0;
		if (slave.bellyImplant !== 0) {
			slave.bellyImplant = Math.max(+slave.bellyImplant, -1) || -1;
		}
		slave.cervixImplant = Math.clamp(+slave.cervixImplant, 0, 3) || 0;
		slave.bellySag = Math.max(+slave.bellySag, 0) || 0;
		slave.bellySagPreg = Math.max(+slave.bellySagPreg, 0) || slave.bellySag;
		slave.bellyPain = Math.clamp(+slave.bellyPain, 0, 2) || 0;
		SetBellySize(slave);
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function slaveGenitaliaDatatypeCleanup(slave) {
		slave.vagina = Math.clamp(+slave.vagina, -1, 10) || 0;
		slave.vaginaLube = Math.clamp(+slave.vaginaLube, 0, 2) || 0;
		slave.labia = Math.clamp(+slave.labia, 0, 3) || 0;
		slave.clit = Math.clamp(+slave.clit, 0, 5) || 0;
		slave.foreskin = Math.max(+slave.foreskin, 0) || 0;
		slave.dick = Math.max(+slave.dick, 0) || 0;
		if (slave.dick && slave.prostate !== 0) {
			slave.prostate = Math.clamp(+slave.prostate, 0, 3) || 1;
		} else {
			slave.prostate = Math.clamp(+slave.prostate, 0, 3) || 0;
		}
		slave.balls = Math.max(+slave.balls, 0) || 0;
		if (slave.scrotum !== 0) {
			slave.scrotum = Math.max(+slave.scrotum, 0) || slave.balls;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function slaveImplantsDatatypeCleanup(slave) {
		slave.ageImplant = Math.clamp(+slave.ageImplant, 0, 1) || 0;
		slave.faceImplant = Math.clamp(+slave.faceImplant, 0, 100) || 0;
		slave.lipsImplant = Math.clamp(+slave.lipsImplant, 0, 100) || 0;
		slave.voiceImplant = Math.clamp(+slave.voiceImplant, -1, 1) || 0;
		slave.boobsImplant = Math.clamp(+slave.boobsImplant, 0, slave.boobs) || 0;
		if (slave.boobsImplant === 0) {
			slave.boobsImplantType = "none";
		} else if (slave.boobsImplant > 0 && slave.boobsImplantType === "none") {
			if (slave.boobsImplant > 10000) {
				slave.boobsImplantType = "hyper fillable";
			} else if (slave.boobsImplant > 2200) {
				slave.boobsImplantType = "advanced fillable";
			} else if (slave.boobsImplant > 1000) {
				slave.boobsImplantType = "fillable";
			} else {
				slave.boobsImplantType = "normal";
			}
		}
		slave.breastMesh = Math.clamp(+slave.breastMesh, 0, 1) || 0;
		slave.buttImplant = Math.clamp(+slave.buttImplant, 0, Math.min(slave.butt, 20)) || 0;
		if (typeof slave.buttImplantType !== "string") {
			if (slave.buttImplant === 0) {
				slave.buttImplantType = "none";
			} else if (slave.buttImplant > 0) {
				slave.buttImplantType = "normal";
			}
		}
		slave.heightImplant = Math.clamp(+slave.heightImplant, -10, 10) || 0;
		slave.earImplant = Math.clamp(+slave.earImplant, 0, 1) || 0;
		slave.shouldersImplant = Math.clamp(+slave.shouldersImplant, -10, 10) || 0;
		slave.hipsImplant = Math.clamp(+slave.hipsImplant, -10, 10) || 0;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function slaveTattooDatatypeCleanup(slave) {
		if (typeof slave.shouldersTat !== "string") {
			slave.shouldersTat = 0;
		}
		if (typeof slave.lipsTat !== "string") {
			slave.lipsTat = 0;
		}
		if (typeof slave.boobsTat !== "string") {
			slave.boobsTat = 0;
		}
		if (typeof slave.armsTat !== "string") {
			slave.armsTat = 0;
		}
		if (typeof slave.backTat !== "string") {
			slave.backTat = 0;
		}
		if (typeof slave.stampTat !== "string") {
			slave.stampTat = 0;
		}
		if (typeof slave.buttTat !== "string") {
			slave.buttTat = 0;
		}
		if (typeof slave.vaginaTat !== "string") {
			slave.vaginaTat = 0;
		}
		if (typeof slave.dickTat !== "string") {
			slave.dickTat = 0;
		}
		if (typeof slave.anusTat !== "string") {
			slave.anusTat = 0;
		}
		if (typeof slave.legsTat !== "string") {
			slave.legsTat = 0;
		}
		if (typeof slave.bellyTat !== "string") {
			slave.bellyTat = 0;
		}
		if (typeof slave.custom.tattoo !== "string" || slave.custom.tattoo === " ") {
			slave.custom.tattoo = "";
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function slaveCosmeticsDatatypeCleanup(slave) {
		slave.makeup = Math.clamp(+slave.makeup, 0, 8) || 0;
		slave.nails = Math.clamp(+slave.nails, 0, 9) || 0;
		slave.chastityAnus = Math.clamp(+slave.chastityAnus, 0, 1) || 0;
		slave.chastityPenis = Math.clamp(+slave.chastityPenis, 0, 1) || 0;
		slave.chastityVagina = Math.clamp(+slave.chastityVagina, 0, 1) || 0;
		slave.choosesOwnClothes = Math.clamp(+slave.choosesOwnClothes, 0, 1) || 0;
		if (typeof slave.clothes !== "string" || slave.clothes === "choosing her own clothes") {
			slave.clothes = "no clothing";
		}
		if (typeof slave.collar !== "string") {
			slave.collar = "none";
		}
		if (typeof slave.shoes !== "string") {
			slave.shoes = "none";
		}
		if (typeof slave.eyewear !== "string") {
			slave.eyewear = "none";
		}
		if (typeof slave.markings !== "string") {
			slave.markings = "none";
		}
		if (typeof slave.bellyAccessory !== "string") {
			slave.bellyAccessory = "none";
		}
		if (typeof slave.vaginalAccessory !== "string") {
			slave.vaginalAccessory = "none";
		}
		if (typeof slave.vaginalAttachment !== "string") {
			slave.vaginalAttachment = "none";
		}
		if (typeof slave.dickAccessory !== "string") {
			slave.dickAccessory = "none";
		}
		if (typeof slave.armAccessory !== "string") {
			slave.armAccessory = "none";
		}
		if (typeof slave.legAccessory !== "string") {
			slave.legAccessory = "none";
		}
		if (typeof slave.buttplug !== "string") {
			slave.buttplug = "none";
		}
		if (typeof slave.buttplugAttachment !== "string") {
			slave.buttplugAttachment = "none";
		}
		if (typeof slave.faceAccessory !== "string") {
			slave.faceAccessory = "none";
		}
		if (typeof slave.mouthAccessory !== "string") {
			slave.mouthAccessory = "none";
		}
		for (const acc of ["headAccessory", "rearAccessory", "backAccessory"]) {
			delete slave[acc];
		}
		switch (slave.collar) {
			case "porcelain mask":
				slave.faceAccessory = slave.collar;
				slave.collar = "none";
				break;
			case "bit gag":
			case "dildo gag":
			case "massive dildo gag":
			case "ball gag":
			case "ring gag":
				slave.mouthAccessory = slave.collar;
				slave.collar = "none";
				break;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function slaveDietDatatypeCleanup(slave) {
		if (typeof slave.diet !== "string") {
			slave.diet = "healthy";
		}
		slave.dietCum = Math.clamp(+slave.dietCum, 0, 2) || 0;
		slave.dietMilk = Math.clamp(+slave.dietMilk, 0, 2) || 0;
		slave.onDiet = Math.clamp(+slave.onDiet, 0, 1) || 0;
		slave.hormones = Math.clamp(+slave.hormones, -2, 2) || 0;
		slave.hormoneBalance = Math.clamp(+slave.hormoneBalance, -500, 500) || 0;
		if (typeof slave.drugs !== "string" || slave.drugs === "none") {
			slave.drugs = "no drugs";
		}
		slave.aphrodisiacs = Math.clamp(+slave.aphrodisiacs, -1, 2) || 0;
		slave.curatives = Math.clamp(+slave.curatives, 0, 2) || 0;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function slavePornDatatypeCleanup(slave) {
		slave.porn.feed = Math.clamp(+slave.porn.feed, 0, 1) || 0;
		slave.porn.viewerCount = Math.max(+slave.porn.viewerCount, 0) || 0;
		slave.porn.spending = Math.max(+slave.porn.spending, 0) || 0;
		slave.porn.prestige = Math.clamp(+slave.porn.prestige, 0, 3) || 0;
		if (typeof slave.porn.prestigeDesc !== "string") {
			slave.porn.prestigeDesc = 0;
		}
		if (typeof slave.porn.fameType !== "string") {
			slave.porn.fameType = "none";
		}
		if (slave.porn.fameType === "none") {
			slave.porn.prestige = 0;
			slave.porn.prestigeDesc = 0;
		}
		if (typeof slave.porn.focus !== "string") {
			slave.porn.focus = "none";
		}
		for (const genre of App.Porn.getAllGenres()) {
			slave.porn.fame[genre.fameVar] = Math.max(+slave.porn.fame[genre.fameVar], 0) || 0;
		}

		// there was a bug where the ui would set focus to "well hung" instead of "stud" for the "big dick" genre.
		if (slave.porn.focus === "well hung") {
			slave.porn.focus = "stud";
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function slaveRelationDatatypeCleanup(slave) {
		slave.mother = +slave.mother || 0;
		slave.father = +slave.father || 0;
		slave.canRecruit = Math.clamp(+slave.canRecruit, 0, 1) || 0;
		slave.relationship = Math.clamp(+slave.relationship, -3, 5) || 0;
		slave.relationshipTarget = Math.max(+slave.relationshipTarget, 0) || 0;
		slave.rivalryTarget = Math.max(+slave.rivalryTarget, 0) || 0;
		slave.rivalry = Math.clamp(+slave.rivalry, 0, 3) || 0;
		slave.cloneID = +slave.cloneID || 0;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function slaveSkillsDatatypeCleanup(slave) {
		slave.skill.oral = Math.clamp(+slave.skill.oral, 0, 100) || 0;
		slave.skill.vaginal = Math.clamp(+slave.skill.vaginal, 0, 100) || 0;
		slave.skill.penetrative = Math.clamp(+slave.skill.penetrative, 0, 100) || 0;
		slave.skill.anal = Math.clamp(+slave.skill.anal, 0, 100) || 0;
		slave.skill.whoring = Math.clamp(+slave.skill.whoring, 0, 100) || 0;
		slave.skill.entertainment = Math.clamp(+slave.skill.entertainment, 0, 100) || 0;
		slave.skill.combat = Math.clamp(+slave.skill.combat, 0, 100) || 0;
		slave.skill.headGirl = Math.clamp(+slave.skill.headGirl, 0, 200) || 0;
		slave.skill.recruiter = Math.clamp(+slave.skill.recruiter, 0, 200) || 0;
		slave.skill.bodyguard = Math.clamp(+slave.skill.bodyguard, 0, 200) || 0;
		slave.skill.madam = Math.clamp(+slave.skill.madam, 0, 200) || 0;
		slave.skill.DJ = Math.clamp(+slave.skill.DJ, 0, 200) || 0;
		slave.skill.nurse = Math.clamp(+slave.skill.nurse, 0, 200) || 0;
		slave.skill.teacher = Math.clamp(+slave.skill.teacher, 0, 200) || 0;
		slave.skill.attendant = Math.clamp(+slave.skill.attendant, 0, 200) || 0;
		slave.skill.matron = Math.clamp(+slave.skill.matron, 0, 200) || 0;
		slave.skill.stewardess = Math.clamp(+slave.skill.stewardess, 0, 200) || 0;
		slave.skill.milkmaid = Math.clamp(+slave.skill.milkmaid, 0, 200) || 0;
		slave.skill.farmer = Math.clamp(+slave.skill.farmer, 0, 200) || 0;
		slave.skill.wardeness = Math.clamp(+slave.skill.wardeness, 0, 200) || 0;
		slave.skill.servant = Math.clamp(+slave.skill.servant, 0, 200) || 0;
		slave.skill.entertainer = Math.clamp(+slave.skill.entertainer, 0, 200) || 0;
		slave.skill.whore = Math.clamp(+slave.skill.whore, 0, 200) || 0;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function slaveStatCountDatatypeCleanup(slave) {
		slave.counter.oral = Math.max(+slave.counter.oral, 0) || 0;
		slave.counter.vaginal = Math.max(+slave.counter.vaginal, 0) || 0;
		slave.counter.anal = Math.max(+slave.counter.anal, 0) || 0;
		slave.counter.publicUse = Math.max(+slave.counter.publicUse, 0) || 0;
		slave.counter.mammary = Math.max(+slave.counter.mammary, 0) || 0;
		slave.counter.penetrative = Math.max(+slave.counter.penetrative, 0) || 0;
		slave.counter.pitKills = Math.max(+slave.counter.pitKills, 0) || 0;
		slave.counter.pitWins = Math.max(+slave.counter.pitWins, 0) || 0;
		slave.counter.pitLosses = Math.max(+slave.counter.pitLosses, 0) || 0;
		slave.counter.milk = Math.max(+slave.counter.milk, 0) || 0;
		slave.counter.cum = Math.max(+slave.counter.cum, 0) || 0;
		slave.counter.births = Math.max(+slave.counter.births, 0) || 0;
		slave.counter.birthsTotal = Math.max(+slave.counter.birthsTotal, 0) || slave.counter.births;
		slave.counter.abortions = Math.max(+slave.counter.abortions, 0) || 0;
		slave.counter.miscarriages = Math.max(+slave.counter.miscarriages, 0) || 0;
		slave.counter.laborCount = Math.max(+slave.counter.laborCount, 0) || slave.counter.birthsTotal;
		slave.counter.slavesFathered = Math.max(+slave.counter.slavesFathered, 0) || 0;
		slave.counter.PCChildrenFathered = Math.max(+slave.counter.PCChildrenFathered, 0) || 0;
		slave.counter.slavesKnockedUp = Math.max(+slave.counter.slavesKnockedUp, 0) || 0;
		slave.counter.PCKnockedUp = Math.max(+slave.counter.PCKnockedUp, 0) || 0;
		slave.counter.bestiality = Math.max(+slave.counter.bestiality, 0) || 0;
		slave.counter.PCChildrenBeared = Math.max(+slave.counter.PCChildrenBeared, 0) || 0;
		slave.counter.timesBred = Math.max(+slave.counter.timesBred, 0) || 0;
		slave.counter.reHymen = Math.max(+slave.counter.reHymen, 0) || 0;
		slave.bodySwap = Math.max(+slave.bodySwap, 0) || 0;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function slavePreferencesDatatypeCleanup(slave) {
		slave.energy = Math.clamp(+slave.energy, 0, 100) || 0;
		slave.need = Math.max(+slave.need, 0) || 0;
		slave.attrXY = Math.clamp(+slave.attrXY, 0, 100) || 0;
		slave.attrXX = Math.clamp(+slave.attrXX, 0, 100) || 0;
		slave.attrKnown = Math.clamp(+slave.attrKnown, 0, 1) || 0;
		slave.fetishStrength = Math.clamp(+slave.fetishStrength, 0, 100) || 0;
		slave.fetishKnown = Math.clamp(+slave.fetishKnown, 0, 1) || 0;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function slaveRulesDatatypeCleanup(slave) {
		if (slave.useRulesAssistant !== 0) {
			slave.useRulesAssistant = 1;
		}
		slave.choosesOwnAssignment = Math.clamp(+slave.choosesOwnAssignment, 0, 1) || 0;
		slave.PCExclude = Math.clamp(+slave.PCExclude, 0, 1) || 0;
		slave.HGExclude = Math.clamp(+slave.HGExclude, 0, 1) || 0;
		slave.StudExclude = Math.clamp(+slave.StudExclude, 0, 1) || 0;
		slave.choosesOwnChastity = Math.clamp(+slave.choosesOwnChastity, 0, 1) || 0;
		slave.breedingMark = Math.clamp(+slave.breedingMark, 0, 1) || 0;
		slave.rudeTitle = Math.clamp(+slave.rudeTitle, 0, 1) || 0;
		if (typeof slave.rules.mobility !== "string") {
			slave.rules.mobility = "restrictive";
		}
		if (typeof slave.rules.punishment !== "string" || slave.rules.punishment === "orgasm" /* fix SI bug */) {
			slave.rules.punishment = "situational";
		}
		if (typeof slave.rules.reward !== "string") {
			slave.rules.reward = "situational";
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function slaveCustomStatsDatatypeCleanup(slave) {
		if (typeof slave.custom.label !== "string") {
			slave.custom.label = "";
		}
		if (typeof slave.custom.desc !== "string") {
			slave.custom.desc = "";
		}
		if (typeof slave.custom.title !== "string") {
			slave.custom.title = "";
		}
		if (typeof slave.custom.titleLisp !== "string") {
			slave.custom.titleLisp = "";
		}
		if (slave.custom.image !== null) {
			if (typeof slave.custom.image.filename !== "string") {
				slave.custom.image = null;
			}
		}
		if (slave.custom.aiPrompts) {
			if (typeof slave.custom.aiPrompts.expressionPositive !== "string") {
				slave.custom.aiPrompts.expressionPositive = "";
			}
			if (typeof slave.custom.aiPrompts.expressionNegative !== "string") {
				slave.custom.aiPrompts.expressionNegative = "";
			}
			if (typeof slave.custom.aiPrompts.positiveRA !== "string") {
				slave.custom.aiPrompts.positiveRA = "";
			}
			if (typeof slave.custom.aiPrompts.negativeRA !== "string") {
				slave.custom.aiPrompts.negativeRA = "";
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function slaveMiscellaneousDatatypeCleanup(slave) {
		slave.slaveName = slave.slaveName || "Nameless";
		slave.slaveSurname = slave.slaveSurname || 0;
		slave.weekAcquired = +slave.weekAcquired || 0;
		slave.newGamePlus = Math.clamp(+slave.newGamePlus, 0, 1) || 0;
		slave.prestige = Math.clamp(+slave.prestige, 0, 3) || 0;
		slave.devotion = Math.clamp(+slave.devotion, -100, 100) || 0;
		slave.oldDevotion = Math.clamp(+slave.oldDevotion, -100, 100) || 0;
		slave.trust = Math.clamp(+slave.trust, -100, 100) || 0;
		slave.oldTrust = Math.clamp(+slave.oldTrust, -100, 100) || 0;
		slave.fuckdoll = Math.clamp(+slave.fuckdoll, 0, 100) || 0;
		slave.chem = Math.max(+slave.chem, 0) || 0;
		slave.addict = Math.max(+slave.addict, 0) || 0;
		slave.intelligence = Math.clamp(+slave.intelligence, -100, 100) || 0;
		slave.intelligenceImplant = Math.clamp(+slave.intelligenceImplant, -15, 30) || 0;
		slave.premature = Math.clamp(+slave.premature, 0, 1) || 0;
		slave.tankBaby = Math.clamp(+slave.tankBaby, 0, 3) || 0;
		slave.subTarget = Math.max(+slave.subTarget, -1) || 0;
		slave.sentence = Math.max(+slave.sentence, 0) || 0;
		slave.training = Math.clamp(+slave.training, 0, 150) || 0;
		if (slave.indenture !== 0) {
			slave.indenture = Math.max(+slave.indenture, -1) || -1;
		}
		slave.indentureRestrictions = Math.clamp(+slave.indentureRestrictions, 0, 2) || 0;
		slave.hears = Math.clamp(+slave.hears, -2, 0) || 0;
		slave.smells = Math.clamp(+slave.smells, -1, 0) || 0;
		slave.tastes = Math.clamp(+slave.tastes, -1, 0) || 0;
		if (typeof slave.earwear !== "string") {
			slave.earwear = "none";
		}
		slave.heels = Math.clamp(+slave.heels, 0, 1) || 0;
		slave.PLimb = Math.clamp(+slave.PLimb, 0, 3) || 0;
		slave.PTail = Math.clamp(+slave.PTail, 0, 1) || 0;
		slave.PBack = Math.clamp(+slave.PBack, 0, 1) || 0;
		if (slave.voice !== 0) {
			slave.voice = Math.clamp(+slave.voice, 0, 3) || 1;
		}
		slave.electrolarynx = Math.clamp(+slave.electrolarynx, 0, 1) || 0;
		slave.accent = Math.clamp(+slave.accent, 0, 4) || 0;
		if (typeof slave.ballType !== "string") {
			slave.ballType = "human";
		}
		if (typeof slave.eggType !== "string") {
			slave.eggType = "human";
		}
		if (typeof slave.origBodyOwner !== "string") {
			slave.origBodyOwner = "";
		}
		slave.origBodyOwnerID = Math.max(+slave.origBodyOwnerID, 0) || 0;
		if (slave.hasOwnProperty("death")) {
			switch (slave.death) {
				case "health":
					planDeath(slave, "lowHealth");
					break;
				case "od":
					planDeath(slave, "overdosed");
					break;
				case "old":
					planDeath(slave, "oldAge");
			}
			delete slave.death;
		}
		if (slave.slaveCost !== 0) {
			slave.slaveCost = Math.min(+slave.slaveCost, 1) || 1;
		}
		slave.lifetimeCashExpenses = Math.min(+slave.lifetimeCashExpenses, 0) || 0;
		slave.lifetimeCashIncome = Math.max(+slave.lifetimeCashIncome, 0) || 0;
		slave.lastWeeksCashIncome = Math.max(+slave.lastWeeksCashIncome, 0) || 0;
		slave.lifetimeRepExpenses = Math.min(+slave.lifetimeRepExpenses, 0) || 0;
		slave.lifetimeRepIncome = Math.max(+slave.lifetimeRepIncome, 0) || 0;
		slave.lastWeeksRepExpenses = Math.min(+slave.lastWeeksRepExpenses, 0) || 0;
		slave.lastWeeksRepIncome = Math.max(+slave.lastWeeksRepIncome, 0) || 0;
		slave.sexAmount = Math.max(+slave.sexAmount, 0) || 0;
		slave.sexQuality = Math.max(+slave.sexQuality, 0) || 0;
		slave.whoreClass = Math.max(+slave.whoreClass, 0) || 0;
		if (!Object.values(Job).includes(slave.assignment)) {
			slave.assignment = Job.REST;
		}
		if (typeof slave.partners !== "object") {
			slave.partners = new Set();
		}
		for (const partner of slave.partners) {
			if (typeof partner !== "number") {
				slave.partners.delete(partner);
			}
		}
	}
})();

/* See slave datatype cleanup for details */
globalThis.PCDatatypeCleanup = (function PCDatatypeCleanup() {
	"use strict";

	return PCDatatypeCleanup;

	/**
	 * @param {App.Entity.PlayerState} PC
	 */
	function PCDatatypeCleanup(PC) {
		PCAgeDatatypeCleanup(PC);
		PCPhysicalDatatypeCleanup(PC);
		PCFaceDatatypeCleanup(PC);
		PCHairDatatypeCleanup(PC);
		PCBoobsDatatypeCleanup(PC);
		PCButtDatatypeCleanup(PC);
		PCPregnancyDatatypeCleanup(PC);
		PCBellyDatatypeCleanup(PC);
		PCGenitaliaDatatypeCleanup(PC);
		PCImplantsDatatypeCleanup(PC);
		App.Update.slavePiercingsDatatypeCleanup(PC);
		PCCosmeticsDatatypeCleanup(PC);
		PCDietDatatypeCleanup(PC);
		PCRelationDatatypeCleanup(PC);
		PCSkillsDatatypeCleanup(PC);
		PCStatCountDatatypeCleanup(PC);
		PCPreferencesDatatypeCleanup(PC);
		PCRulesDatatypeCleanup(PC);
		PCCustomStatsDatatypeCleanup(PC);
		PCMiscellaneousDatatypeCleanup(PC);
		if (typeof PC.pronoun !== "number") {
			App.Entity.Utils.migratePronouns(PC);
			generatePlayerPronouns(PC);
		}
	}

	/**
	 * @param {App.Entity.PlayerState} PC
	 */
	function PCAgeDatatypeCleanup(PC) {
		if (PC.birthWeek > 51) {
			PC.birthWeek = PC.birthWeek % 52;
		}
		PC.birthWeek = Math.clamp(+PC.birthWeek, 0, 51) || 0;
		if (PC.age > 0) {
			PC.actualAge = Math.clamp(+PC.actualAge, 10, 80) || PC.age; /* if undefined, this sets to PC.age */
			delete PC.age;
		} else {
			PC.actualAge = Math.clamp(+PC.actualAge, 10, Infinity) || 35;
		}
		PC.physicalAge = Math.clamp(+PC.physicalAge, 10, Infinity) || PC.actualAge;
		PC.visualAge = Math.clamp(+PC.visualAge, 10, Infinity) || PC.actualAge;
		if (typeof PC.ovaryAge !== "number") { // immortalOvaries intentionally sets ovaryAge to a negative number, so treat it more leniently
			PC.ovaryAge = PC.physicalAge;
		}
		if (V.playerAging !== 0) {
			V.playerAging = Math.clamp(+V.playerAging, 0, 2) || 2;
		}
		PC.pubertyAgeXX = Math.max(+PC.pubertyAgeXX, 0) || 13;
		if (PC.actualAge > PC.pubertyAgeXX || PC.preg > 0) {
			PC.pubertyXX = 1;
		}
		PC.pubertyAgeXY = Math.max(+PC.pubertyAgeXY, 0) || 13;
		if (PC.actualAge > PC.pubertyAgeXY) {
			PC.pubertyXY = 1;
		}
		PC.NCSyouthening = Math.max(+PC.NCSyouthening, 0) || 0;
	}

	/**
	 * @param {App.Entity.PlayerState} PC
	 */
	function PCPhysicalDatatypeCleanup(PC) {
		if (PC.title !== 0) {
			PC.title = Math.clamp(+PC.title, 0, 1) || 1;
		}
		if (typeof PC.genes !== "string") {
			PC.genes = "XY";
		}
		if (typeof PC.nationality !== "string") {
			PC.nationality = "Stateless";
		}
		if (typeof PC.race !== "string") {
			PC.race = "white";
		}
		if (typeof PC.origRace !== "string") {
			PC.origRace = PC.race;
		}
		if (typeof PC.skin !== "string") {
			PC.skin = "light";
		}
		if (typeof PC.origSkin !== "string") {
			PC.origSkin = PC.skin;
		}

		if (typeof PC.health === "number") {
			const condition = PC.health;
			PC.health = {};
			PC.health.condition = condition;
		}
		PC.majorInjury = Math.max(+PC.majorInjury, 0) || 0;
		PC.health.condition = Math.clamp(PC.health.condition, -100, 100) || 0;
		PC.health.shortDamage = Math.max(+PC.health.shortDamage, 0) || 0;
		PC.health.longDamage = Math.max(+PC.health.longDamage, 0) || 0;
		PC.health.illness = Math.max(+PC.health.illness, 0) || 0;
		PC.health.tired = Math.clamp(+PC.health.tired, 0, 100) || 0;
		updateHealth(PC);

		PC.muscles = Math.clamp(+PC.muscles, -100, 100) || 0;
		PC.weight = Math.clamp(+PC.weight, -100, 200) || 0;
		PC.waist = Math.clamp(+PC.waist, -100, 100) || 0;
		PC.height = Math.round(Math.max(+PC.height, 0)) || Height.mean(PC);
		PC.shoulders = Math.clamp(+PC.shoulders, -2, 2) || 0;
		PC.hips = Math.clamp(+PC.hips, -2, 3) || 0;
	}

	/**
	 * @param {App.Entity.PlayerState} PC
	 */
	function PCFaceDatatypeCleanup(PC) {
		if (typeof PC.eye.origColor !== "string") {
			PC.eye.origColor = "blue";
		}
		PC.face = 100;
		if (PC.lips !== 0) {
			PC.lips = Math.clamp(+PC.lips, 0, 100) || 15;
		}
	}

	/**
	 * @param {App.Entity.PlayerState} PC
	 */
	function PCHairDatatypeCleanup(PC) {
		if (typeof PC.hColor !== "string") {
			PC.hColor = "blonde";
		}
		if (typeof PC.origHColor !== "string") {
			PC.origHColor = PC.hColor;
		}
		if (PC.hLength !== 0) {
			PC.hLength = Math.clamp(+PC.hLength, 0, 300) || 2;
		}
		if (typeof PC.hStyle !== "string") {
			PC.hStyle = "neat";
		}
		if (typeof PC.pubicHColor !== "string") {
			PC.pubicHColor = PC.hColor;
		}
		if (typeof PC.pubicHStyle !== "string") {
			PC.pubicHStyle = "hairless";
		}
		if (typeof PC.underArmHColor !== "string") {
			PC.underArmHColor = PC.hColor;
		}
		if (typeof PC.underArmHStyle !== "string") {
			PC.underArmHStyle = "hairless";
		}
		if (typeof PC.eyebrowHColor !== "string") {
			PC.eyebrowHColor = PC.hColor;
		}
		if (typeof PC.eyebrowHStyle !== "string") {
			PC.eyebrowHStyle = "natural";
		}
		if (typeof PC.eyebrowFullness !== "string") {
			PC.eyebrowFullness = "natural";
		}
	}

	/**
	 * @param {App.Entity.PlayerState} PC
	 */
	function PCBoobsDatatypeCleanup(PC) {
		PC.boobs = Math.max(+PC.boobs, 200) || 200;
		if (typeof PC.boobShape !== "string") {
			PC.boobShape = "normal";
		}
		if (PC.boobShape === "spherical" && PC.boobsImplant === 0) {
			PC.boobShape = "normal";
		}
		if (typeof PC.nipples !== "string") {
			PC.nipples = "tiny";
		}
		PC.areolae = Math.clamp(+PC.areolae, 0, 4) || 0;
		PC.lactation = Math.max(+PC.lactation, 0) || 0;
		PC.lactationDuration = Math.max(+PC.lactationDuration, 0) || 0;
		if (PC.boobsMilk > 0 && PC.boobs - PC.boobsMilk - PC.boobsImplant < 0) {
			// should never get here, but if it does, just immediately abort!
			PC.boobsMilk = 0;
		}
		PC.lactationAdaptation = Math.clamp(+PC.lactationAdaptation, 0, 200) || 0;
	}

	/**
	 * @param {App.Entity.PlayerState} PC
	 */
	function PCButtDatatypeCleanup(PC) {
		if (PC.butt !== 0) {
			PC.butt = Math.clamp(+PC.butt, 0, 20) || 2;
		}
		PC.anus = Math.clamp(+PC.anus, 0, 4) || 0;
		PC.analArea = Math.max(+PC.analArea, 0) || 0;
	}

	/**
	 * @param {App.Entity.PlayerState} PC
	 */
	function PCPregnancyDatatypeCleanup(PC) {
		PC.induce = Math.clamp(+PC.induce, 0, 1) || 0;
		PC.labor = Math.clamp(+PC.labor, 0, 1) || 0;
		PC.prematureBirth = Math.clamp(+PC.prematureBirth, 0, 1) || 0;
		PC.ovaries = Math.clamp(+PC.ovaries, 0, 1) || 0;
		PC.vasectomy = Math.clamp(+PC.vasectomy, 0, 1) || 0;
		PC.mpreg = Math.clamp(+PC.mpreg, 0, 1) || 0;
		if (PC.pregAdaptation !== 0) {
			PC.pregAdaptation = Math.max(+PC.pregAdaptation, 0) || 50;
		}
		if (PC.pubertyXX === 0 && (PC.ovaries > 0 || PC.mpreg > 0) && PC.preg === -1) {
			PC.preg = 0; // no contraceptives for prepubescent slaves
		}
		PC.fertPeak = Math.clamp(+PC.fertPeak, 0, 4) || 0;
		PC.pregSource = +PC.pregSource || 0;
		PC.pregMood = Math.clamp(+PC.pregMood, 0, 2) || 0;
		if (typeof PC.pregControl !== "string") {
			PC.pregControl = "none";
		}
		PC.forcedFertDrugs = Math.max(+PC.forcedFertDrugs, 0) || 0;
		WombNormalizePreg(PC);
	}

	/**
	 * @param {App.Entity.PlayerState} PC
	 */
	function PCBellyDatatypeCleanup(PC) {
		PC.inflation = Math.clamp(+PC.inflation, 0, 3) || 0;
		if (typeof PC.inflationType !== "string") {
			PC.inflationType = "none";
		}
		PC.inflationMethod = Math.clamp(+PC.inflationMethod, 0, 3) || 0;
		PC.milkSource = Math.max(+PC.milkSource, 0) || 0;
		PC.cumSource = Math.max(+PC.cumSource, 0) || 0;
		if (PC.bellyImplant !== 0) {
			PC.bellyImplant = Math.max(+PC.bellyImplant, -1) || -1;
		}
		PC.cervixImplant = Math.clamp(+PC.cervixImplant, 0, 3) || 0;
		PC.bellySag = Math.max(+PC.bellySag, 0) || 0;
		PC.bellySagPreg = Math.max(+PC.bellySagPreg, 0) || PC.bellySag;
		PC.bellyPain = Math.clamp(+PC.bellyPain, 0, 2) || 0;
		SetBellySize(PC);
	}

	/**
	 * @param {App.Entity.PlayerState} PC
	 */
	function PCGenitaliaDatatypeCleanup(PC) {
		PC.newVag = Math.clamp(+PC.newVag, 0, 1) || 0;
		if (PC.vagina !== -1 && PC.vagina !== 0) {
			PC.vagina = Math.clamp(+PC.vagina, 0, 10) || 1;
		}
		PC.vaginaLube = Math.clamp(+PC.vaginaLube, 0, 2) || 0;
		PC.labia = Math.clamp(+PC.labia, 0, 3) || 0;
		PC.clit = Math.clamp(+PC.clit, 0, 5) || 0;
		PC.foreskin = Math.max(+PC.foreskin, 0) || 0;
		if (PC.dick !== 0) {
			PC.dick = Math.max(+PC.dick, 1) || 4;
			PC.prostate = Math.clamp(+PC.prostate, 0, 3) || 1;
			PC.balls = Math.max(+PC.balls, 0) || 3;
		} else {
			PC.prostate = Math.clamp(+PC.prostate, 0, 3) || 0;
			PC.balls = Math.max(+PC.balls, 0) || 0;
		}
		if (PC.scrotum !== 0) {
			PC.scrotum = Math.max(+PC.scrotum, 0) || PC.balls;
		}
	}

	/**
	 * @param {App.Entity.PlayerState} PC
	 */
	function PCImplantsDatatypeCleanup(PC) {
		PC.ageImplant = Math.clamp(+PC.ageImplant, 0, 1) || 0;
		PC.faceImplant = Math.clamp(+PC.faceImplant, 0, 100) || 0;
		PC.lipsImplant = Math.clamp(+PC.lipsImplant, 0, 100) || 0;
		PC.voiceImplant = Math.clamp(+PC.voiceImplant, -1, 1) || 0;
		PC.boobsImplant = Math.clamp(+PC.boobsImplant, 0, PC.boobs) || 0;
		if (PC.boobsImplant === 0) {
			PC.boobsImplantType = "none";
		} else if (PC.boobsImplant > 0 && PC.boobsImplantType === "none") {
			if (PC.boobsImplant > 10000) {
				PC.boobsImplantType = "hyper fillable";
			} else if (PC.boobsImplant > 2200) {
				PC.boobsImplantType = "advanced fillable";
			} else if (PC.boobsImplant > 1000) {
				PC.boobsImplantType = "fillable";
			} else {
				PC.boobsImplantType = "normal";
			}
		}
		PC.breastMesh = Math.clamp(+PC.breastMesh, 0, 1) || 0;
		PC.buttImplant = Math.clamp(+PC.buttImplant, 0, Math.min(PC.butt, 20)) || 0;
		if (typeof PC.buttImplantType !== "string") {
			if (PC.buttImplant === 0) {
				PC.buttImplantType = "none";
			} else if (PC.buttImplant > 0) {
				PC.buttImplantType = "normal";
			}
		}
		PC.heightImplant = Math.clamp(+PC.heightImplant, -10, 10) || 0;
		PC.earImplant = Math.clamp(+PC.earImplant, 0, 1) || 0;
		PC.shouldersImplant = Math.clamp(+PC.shouldersImplant, -10, 10) || 0;
		PC.hipsImplant = Math.clamp(+PC.hipsImplant, -10, 10) || 0;
		PC.ballsImplant = Math.clamp(+PC.ballsImplant, 0, 100) || 0;
	}

	/**
	 * @param {App.Entity.PlayerState} PC
	 */
	function PCCosmeticsDatatypeCleanup(PC) {
		if (typeof PC.clothes !== "string") {
			PC.clothes = "nice business attire";
		}
		if (typeof PC.eyewear !== "string") {
			PC.eyewear = "none";
		}
		if (typeof PC.markings !== "string") {
			PC.markings = "none";
		}
	}

	/**
	 * @param {App.Entity.PlayerState} PC
	 */
	function PCDietDatatypeCleanup(PC) {
		if (typeof PC.refreshment !== "string") {
			PC.refreshment = "cigar";
		}
		if (!(V.ver.startsWith("0.10"))) {
			if (PC.refreshment === "cigar") {
				PC.refreshmentType = 0;
			} else {
				PC.refreshmentType = 1;
			}
		}
		PC.refreshmentType = Math.clamp(+PC.refreshmentType, 0, 6) || 0;
		if (typeof PC.diet !== "string") {
			PC.diet = "healthy";
		}
		PC.hormones = Math.clamp(+PC.hormones, -2, 2) || 0;
		PC.hormoneBalance = Math.clamp(+PC.hormoneBalance, -500, 500) || 0;
		if (typeof PC.drugs !== "string") {
			PC.drugs = "no drugs";
		}
		PC.aphrodisiacs = Math.clamp(+PC.aphrodisiacs, -1, 2) || 0;
	}

	/**
	 * @param {App.Entity.PlayerState} PC
	 */
	function PCRelationDatatypeCleanup(PC) {
		PC.mother = +PC.mother || 0;
		PC.father = +PC.father || 0;
	}

	/**
	 * @param {App.Entity.PlayerState} PC
	 */
	function PCSkillsDatatypeCleanup(PC) {
		PC.skill.trading = Math.clamp(+PC.skill.trading, -100, 100) || 0;
		PC.skill.warfare = Math.clamp(+PC.skill.warfare, -100, 100) || 0;
		PC.skill.slaving = Math.clamp(+PC.skill.slaving, -100, 100) || 0;
		PC.skill.engineering = Math.clamp(+PC.skill.engineering, -100, 100) || 0;
		PC.skill.medicine = Math.clamp(+PC.skill.medicine, -100, 100) || 0;
		PC.skill.hacking = Math.clamp(+PC.skill.hacking, -100, 100) || 0;
		PC.skill.combat = Math.clamp(+PC.skill.combat, 0, 100) || 0;
		PC.skill.fighting = Math.clamp(+PC.skill.fighting, -1000, 1000) || 0;
		PC.skill.cumTap = Math.max(+PC.skill.cumTap, 0) || 0;
	}

	/**
	 * @param {App.Entity.PlayerState} PC
	 */
	function PCStatCountDatatypeCleanup(PC) {
		PC.counter.oral = Math.max(+PC.counter.oral, 0) || 0;
		PC.counter.vaginal = Math.max(+PC.counter.vaginal, 0) || 0;
		PC.counter.anal = Math.max(+PC.counter.anal, 0) || 0;
		PC.counter.mammary = Math.max(+PC.counter.mammary, 0) || 0;
		PC.counter.penetrative = Math.max(+PC.counter.penetrative, 0) || 0;
		PC.counter.milk = Math.max(+PC.counter.milk, 0) || 0;
		PC.counter.cum = Math.max(+PC.counter.cum, 0) || 0;
		PC.counter.pitWins = Math.max(+PC.counter.pitWins, 0) || 0;
		PC.counter.pitLosses = Math.max(+PC.counter.pitLosses, 0) || 0;
		PC.counter.birthsTotal = Math.max(+PC.counter.birthsTotal, 0) || 0;
		PC.counter.birthElite = Math.max(+PC.counter.birthElite, 0) || 0;
		PC.counter.birthMaster = Math.max(+PC.counter.birthMaster, 0) || 0;
		PC.counter.birthDegenerate = Math.max(+PC.counter.birthDegenerate, 0) || 0;
		PC.counter.birthClient = Math.max(+PC.counter.birthClient, 0) || 0;
		PC.counter.birthOther = Math.max(+PC.counter.birthOther, 0) || 0;
		PC.counter.birthArcOwner = Math.max(+PC.counter.birthArcOwner, 0) || 0;
		PC.counter.birthCitizen = Math.max(+PC.counter.birthCitizen, 0) || 0;
		PC.counter.birthSelf = Math.max(+PC.counter.birthSelf, 0) || 0;
		PC.counter.birthLab = Math.max(+PC.counter.birthLab, 0) || 0;
		PC.counter.birthFutaSis = Math.max(+PC.counter.birthFutaSis, 0) || 0;
		PC.counter.abortions = Math.max(+PC.counter.abortions, 0) || 0;
		PC.counter.miscarriages = Math.max(+PC.counter.miscarriages, 0) || 0;
		PC.counter.slavesFathered = Math.max(+PC.counter.slavesFathered, 0) || 0;
		PC.counter.slavesKnockedUp = Math.max(+PC.counter.slavesKnockedUp, 0) || 0;
		PC.counter.storedCum = Math.max(+PC.counter.storedCum, 0) || 0;
		PC.counter.reHymen = Math.max(+PC.counter.reHymen, 0) || 0;
		PC.counter.raped = Math.max(+PC.counter.raped, 0) || (V.raped && (V.raped > 0) ? 1 : 0);

		PC.counter.moves = Math.max(+PC.counter.moves, 0) || 0;
		PC.counter.quick = Math.max(+PC.counter.quick, 0) || 0;
		PC.counter.crazy = Math.max(+PC.counter.crazy, 0) || 0;
		PC.counter.virgin = Math.max(+PC.counter.virgin, 0) || 0;
		PC.counter.futa = Math.max(+PC.counter.futa, 0) || 0;
		PC.counter.preggo = Math.max(+PC.counter.preggo, 0) || 0;

		PC.bodySwap = Math.max(+PC.bodySwap, 0) || 0;
	}

	/**
	 * @param {App.Entity.PlayerState} PC
	 */
	function PCPreferencesDatatypeCleanup(PC) {
		if (PC.sexualEnergy !== 0) {
			PC.sexualEnergy = +PC.sexualEnergy || 4;
		}
		PC.energy = Math.clamp(+PC.energy, 0, 100) || 80;
		PC.need = Math.max(+PC.need, 0) || 0;
		PC.degeneracy = Math.max(+PC.degeneracy, 0) || 0;
	}

	/**
	 * @param {App.Entity.PlayerState} PC
	 */
	function PCRulesDatatypeCleanup(PC) {
		if (typeof PC.rules.living !== "string") {
			PC.rules.living = "normal";
		}
		if (typeof PC.rules.lactation !== "string") {
			PC.rules.lactation = "none";
		}
		if (typeof PC.rules.rest !== "string") {
			PC.rules.rest = "permissive";
		}
	}

	/**
	 * @param {App.Entity.PlayerState} PC
	 */
	function PCCustomStatsDatatypeCleanup(PC) {
		if (PC.customTitle === "") {
			PC.customTitle = undefined;
			PC.customTitleLisp = undefined;
		}
	}

	/**
	 * @param {App.Entity.PlayerState} PC
	 */
	function PCMiscellaneousDatatypeCleanup(PC) {
		if (typeof PC.ID === "undefined") {
			PC.ID = -1;
		}
		PC.chem = Math.max(+PC.chem, 0) || 0;
		PC.addict = Math.max(+PC.addict, 0) || 0;
		PC.intelligence = 100;
		if (PC.intelligenceImplant !== 0) {
			PC.intelligenceImplant = Math.clamp(+PC.intelligenceImplant, -15, 30) || 30;
		}
		PC.hears = Math.clamp(+PC.hears, -2, 0) || 0;
		PC.smells = Math.clamp(+PC.smells, -1, 0) || 0;
		PC.tastes = Math.clamp(+PC.tastes, -1, 0) || 0;
		PC.PLimb = Math.clamp(+PC.PLimb, 0, 2) || 0;
		if (PC.voice !== 0) {
			PC.voice = Math.clamp(+PC.voice, 0, 3) || 1;
		}
		PC.electrolarynx = Math.clamp(+PC.electrolarynx, 0, 1) || 0;
		if (typeof PC.origBodyOwner !== "string") {
			PC.origBodyOwner = "";
		}
		PC.origBodyOwnerID = Math.max(+PC.origBodyOwnerID, 0) || 0;
		App.Update.deleteProperties(PC, ["indenture", "indentureRestrictions"]);

		if (typeof PC.partners !== "object") {
			PC.partners = new Set();
		}
		PC.training = Math.clamp(+PC.training, 0, 100) || 0;
		PC.accent = 0; // Might not use? Would be related to changing languages. Might not work out.
	}
})();

globalThis.EconomyDatatypeCleanup = function() {
	V.AProsperityCap = Math.max(+V.AProsperityCap, 0) || 0;
	if (V.economy === 0.5) {
		V.economy = 200;
	} else if (V.economy === 1) {
		V.economy = 100;
	} else if (V.economy === 1.5) {
		V.economy = 67;
	} else {
		V.economy = Math.max(+V.economy, 20) || 100;
	}
	V.difficultySwitch = Math.clamp(+V.difficultySwitch, 0, 1) || 0;
	if (V.baseDifficulty) {
		V.baseDifficulty = Math.clamp(+V.baseDifficulty, 1, 5) || 3;
	} else if (V.economy > 125) {
		V.baseDifficulty = 1;
	} else if (V.economy > 100) {
		V.baseDifficulty = 2;
	} else if (V.economy > 80) {
		V.baseDifficulty = 3;
	} else if (V.economy > 67) {
		V.baseDifficulty = 4;
	} else {
		V.baseDifficulty = 5;
	}
	V.localEcon = Math.max(+V.localEcon, 20) || V.economy;
	V.econRate = Math.clamp(+V.econRate, 1, 4) || 2;
	V.slaveCostFactor = Math.max(+V.slaveCostFactor, 0) || 1;
	if (V.menialSupplyFactor !== 0) {
		V.menialSupplyFactor = Math.clamp(+V.menialSupplyFactor, -50000, 50000) || (1 - V.slaveCostFactor) * 400 * 1000 * 0.5; /* (1 - slaveCostFactor) * price elasticity * base price * 0.5 */
	}
	if (V.menialDemandFactor !== 0) {
		V.menialDemandFactor = Math.clamp(+V.menialDemandFactor, -50000, 50000) || -V.menialSupplyFactor;
	}
	V.slaveCostRandom = Math.clamp(+V.slaveCostRandom, -3, 3) || 0;
	V.demandTimer = Math.max(+V.demandTimer, 0) || 0;
	V.elapsedDemandTimer = Math.max(+V.elapsedDemandTimer, 0) || 0;
	V.supplyTimer = Math.max(+V.supplyTimer, 0) || 0;
	V.elapsedSupplyTimer = Math.max(+V.elapsedSupplyTimer, 0) || 0;
	V.deltaSupply = Math.clamp(+V.deltaSupply, -6500, 6500) || 0;
	V.deltaDemand = Math.clamp(+V.deltaDemand, -6500, 6500) || 0;
	V.deltaSupplyOld = Math.clamp(+V.deltaSupply, -6500, 6500) || 0;
	V.deltaDemandOld = Math.clamp(+V.deltaDemand, -6500, 6500) || 0;
	V.sexSubsidies.lowerClass = Math.clamp(+V.sexSubsidies.lowerClass, 0, 4) || 0;
	V.sexSubsidies.middleClass = Math.clamp(+V.sexSubsidies.middleClass, 0, 4) || 0;
	V.sexSubsidies.upperClass = Math.clamp(+V.sexSubsidies.upperClass, 0, 4) || 0;
	V.sexSubsidies.topClass = Math.clamp(+V.sexSubsidies.topClass, 0, 4) || 0;
	V.sexSupplyBarriers.lowerClass = Math.clamp(+V.sexSupplyBarriers.lowerClass, 0, 4) || 0;
	V.sexSupplyBarriers.middleClass = Math.clamp(+V.sexSupplyBarriers.middleClass, 0, 4) || 0;
	V.sexSupplyBarriers.upperClass = Math.clamp(+V.sexSupplyBarriers.upperClass, 0, 4) || 0;
	V.sexSupplyBarriers.topClass = Math.clamp(+V.sexSupplyBarriers.topClass, 0, 4) || 0;
	V.NPCSexSupply.lowerClass = Math.max(+V.NPCSexSupply.lowerClass, 500) || 3000;
	V.NPCSexSupply.middleClass = Math.max(+V.NPCSexSupply.middleClass, 500) || 3000;
	V.NPCSexSupply.upperClass = Math.max(+V.NPCSexSupply.upperClass, 500) || 3000;
	V.NPCSexSupply.topClass = Math.max(+V.NPCSexSupply.topClass, 500) || 3000;

	V.rentDefaults.lowerClass = Math.max(+V.rentDefaults.lowerClass, 0) || 20; /* nowhere modified */
	V.rentDefaults.middleClass = Math.max(+V.rentDefaults.middleClass, 0) || 50; /* nowhere modified */
	V.rentDefaults.upperClass = Math.max(+V.rentDefaults.upperClass, 0) || 180; /* nowhere modified */
	V.rentDefaults.topClass = Math.max(+V.rentDefaults.topClass, 0) || 650; /* nowhere modified */

	if (!V.whoreBudget) {
		V.whoreBudget = {};
	}
	if (V.whoreBudget.lowerClass) {
		V.whoreBudget.lowerClass = Math.max(+V.whoreBudget.lowerClass, 8) || 10;
	} else {
		V.whoreBudget.lowerClass = (0.8 + (V.rent.lowerClass / V.rentDefaults.lowerClass) / 5) * 7;
	}
	if (V.whoreBudget.middleClass) {
		V.whoreBudget.middleClass = Math.max(+V.whoreBudget.middleClass, 40) || 50;
	} else {
		V.whoreBudget.middleClass = (0.8 + (V.rent.middleClass / V.rentDefaults.middleClass) / 5) * 40;
	}
	if (V.whoreBudget.upperClass) {
		V.whoreBudget.upperClass = Math.max(+V.whoreBudget.upperClass, 200) || 250;
	} else {
		V.whoreBudget.upperClass = (0.8 + (V.rent.upperClass / V.rentDefaults.upperClass) / 5) * 200;
	}
	if (V.whoreBudget.topClass) {
		V.whoreBudget.topClass = Math.max(+V.whoreBudget.topClass, 1200) || 1500;
	} else {
		V.whoreBudget.topClass = (0.8 + (V.rent.topClass / V.rentDefaults.topClass) / 5) * 1500;
	}
	if (!V.NPCMarketShare) {
		V.NPCMarketShare = {};
	}

	// fixing potential massive oversupply
	if (V.NPCSexSupply.lowerClass > V.lowerClass * V.whoreBudget.lowerClass) {
		V.NPCSexSupply.lowerClass = V.lowerClass * V.whoreBudget.lowerClass;
	}

	V.NPCMarketShare.lowerClass = Math.clamp(+V.NPCMarketShare.lowerClass, 0, 1000) || 0;
	V.NPCMarketShare.middleClass = Math.clamp(+V.NPCMarketShare.middleClass, 0, 1000) || 0;
	V.NPCMarketShare.upperClass = Math.clamp(+V.NPCMarketShare.upperClass, 0, 1000) || 0;
	V.NPCMarketShare.topClass = Math.clamp(+V.NPCMarketShare.topClass, 0, 1000) || 0;
	V.econWeatherDamage = Math.max(+V.econWeatherDamage, 0) || 0;
	V.disasterResponse = Math.clamp(+V.disasterResponse, 0, 2) || 0;
	V.antiWeatherFreeze = Math.clamp(+V.antiWeatherFreeze, 0, 2) || 0;
	V.GDP = Math.max(+V.GDP, 1) || 278.6;
	V.NPCSlaves = Math.max(+V.NPCSlaves, 0) || 0;
	V.visitors = Math.max(+V.visitors, 0) || 0;

	V.LSCBase = Math.max(+V.LSCBase, 0) || 800; /* nowhere modified */
	V.rentEffectL = Math.max(+V.rentEffectL, 0) || 1;
	if (V.lowerClass !== 0) {
		V.lowerClass = Math.max(+V.lowerClass, 0) || 3120;
	}

	V.MCBase = Math.max(+V.MCBase, 0) || 200; /* nowhere modified */
	V.rentEffectM = Math.max(+V.rentEffectM, 0) || 1;
	if (V.middleClass !== 0) {
		V.middleClass = Math.max(+V.middleClass, 0) || 890;
	}

	V.UCBase = Math.max(+V.UCBase, 0) || 40; /* nowhere modified */
	V.rentEffectU = Math.max(+V.rentEffectU, 0) || 1;
	if (V.upperClass !== 0) {
		V.upperClass = Math.max(+V.upperClass, 0) || 200;
	}

	V.TCBase = Math.max(+V.TCBase, 0) || 20; /* nowhere modified */
	V.rentEffectT = Math.max(+V.rentEffectT, 0) || 1;
	if (V.topClass !== 0) {
		V.topClass = Math.max(+V.topClass, 0) || 40;
	}
};

App.Update.playerArcologyDatatypeCleanup = function() {
	V.arcologies[0].ownership = Math.clamp(+V.arcologies[0].ownership, 0, 100) || 0;
	V.arcologies[0].minority = Math.clamp(+V.arcologies[0].minority, 0, 100) || 0;
	V.arcologies[0].prosperity = Math.clamp(+V.arcologies[0].prosperity, 1, V.AProsperityCap) || 1;
	V.arcologies[0].childhoodFertilityInducedNCSResearch = V.arcologies[0].childhoodFertilityInducedNCSResearch || V.arcologies[0].childFertilityInducedNCSResearch || 0;
};

globalThis.FacilityDatatypeCleanup = (function() {
	"use strict";

	return FacilityDatatypeCleanup;

	function replaceSlaveStateWithId(stateVar, idVar) {
		idVar = idVar || `${stateVar}ID`;
		if (V[stateVar] !== undefined) {
			V[idVar] = V[stateVar] === 0 ? 0 : V[stateVar].ID;
		}
	}

	/**
	 * @param {function(App.Entity.SlaveState):boolean} predicate
	 * @returns {number} ID of the first matched slave or 0 if no match was found
	 */
	function findSlaveId(predicate) {
		const s = V.slaves.find(predicate);
		return s ? s.ID : 0;
	}

	function FacilityDatatypeCleanup() {
		/* common variables */
		FutureSocieties.DecorationCleanup();
		FacilityNameCleanup();
		/* facility specific variables */
		BrothelDatatypeCleanup();
		DairyDatatypeCleanup();
		FarmyardDatatypeCleanup();
		ClubDatatypeCleanup();
		ServantsQuartersDatatypeCleanup();
		SchoolroomDatatypeCleanup();
		SpaDatatypeCleanup();
		ClinicDatatypeCleanup();
		ArcadeDatatypeCleanup();
		CellblockDatatypeCleanup();
		MasterSuiteDatatypeCleanup();
		HeadGirlSuiteDatatypeCleanup();
		NurseryDatatypeCleanup();

		V.RecruiterID = findSlaveId(s => s.assignment === Job.RECRUITER);
		V.BodyguardID = findSlaveId(s => s.assignment === Job.BODYGUARD);

		replaceSlaveStateWithId("Lurcher");
		replaceSlaveStateWithId("Stud");
	}

	function FacilityNameCleanup() {
		V.arcologies[0].name = V.arcologies[0].name || "Arcology X-4";
		V.brothelName = V.brothelName || "the Brothel";
		V.dairyName = V.dairyName || "the Dairy";
		V.clubName = V.clubName || "the Club";
		V.servantsQuartersName = V.servantsQuartersName || "the Servants' Quarters";
		V.schoolroomName = V.schoolroomName || "the Schoolroom";
		V.spaName = V.spaName || "the Spa";
		V.nurseryName = V.nurseryName || "the Nursery";
		V.clinicName = V.clinicName || "the Clinic";
		V.arcadeName = V.arcadeName || "the Arcade";
		V.cellblockName = V.cellblockName || "the Cellblock";
		V.masterSuiteName = V.masterSuiteName || "the Master Suite";
		V.HGSuiteName = V.HGSuiteName || "the Head Girl Suite";
		V.farmyardName = V.farmyardName || "the Farmyard";
	}

	function BrothelDatatypeCleanup() {
		/* ads */
		V.brothelAdsSpending = Math.clamp(+V.brothelAdsSpending, 0, 5000) || 0;
		V.brothelAdsStacked = Math.clamp(+V.brothelAdsStacked, -1, 1) || 0;
		V.brothelAdsImplanted = Math.clamp(+V.brothelAdsImplanted, -1, 1) || 0;
		V.brothelAdsModded = Math.clamp(+V.brothelAdsModded, -1, 1) || 0;
		V.brothelAdsPreg = Math.clamp(+V.brothelAdsPreg, -1, 1) || 0;
		V.brothelAdsOld = Math.clamp(+V.brothelAdsOld, -3, 1) || 0;
		V.brothelAdsXX = Math.clamp(+V.brothelAdsXX, -1, 1) || 0;
		/* upgrades */
		V.brothel = Math.max(+V.brothel, 0) || 0;
		V.brothelUpgradeDrugs = Math.clamp(+V.brothelUpgradeDrugs, 0, 2) || 0;
		V.brothelBoost.selected = Math.clamp(+V.brothelBoost.selected, 0, 10) || 0;
		App.Update.moveProperties(V.brothelBoost, V.brothelBoost, { // FFS, spell it right...
			eligible: "eligable"
		});
		V.brothelBoost.eligible = Math.clamp(+V.brothelBoost.eligible, 0, 10) || 0;
		/* madam */
		V.MadamID = findSlaveId(s => s.assignment === Job.MADAM);
		V.MadamIgnoresFlaws = Math.clamp(+V.MadamIgnoresFlaws, 0, 1) || 0;
	}

	function DairyDatatypeCleanup() {
		/* upgrades */
		V.dairy = Math.max(+V.dairy, 0) || 0;
		V.dairyFeedersUpgrade = Math.clamp(+V.dairyFeedersUpgrade, 0, 1) || 0;
		V.dairyFeedersSetting = Math.clamp(+V.dairyFeedersSetting, 0, 2) || 0;
		V.dairyPregUpgrade = Math.clamp(+V.dairyPregUpgrade, 0, 1) || 0;
		V.dairyPregSetting = Math.clamp(+V.dairyPregSetting, 0, 3) || 0;
		V.dairyStimulatorsUpgrade = Math.clamp(+V.dairyStimulatorsUpgrade, 0, 1) || 0;
		V.dairyStimulatorsSetting = Math.clamp(+V.dairyStimulatorsSetting, 0, 2) || 0;
		V.dairyRestraintsUpgrade = Math.clamp(+V.dairyRestraintsUpgrade, 0, 1) || 0;
		V.dairyRestraintsSetting = Math.clamp(+V.dairyRestraintsSetting, 0, 2) || 0;
		V.dairySlimMaintainUpgrade = Math.clamp(+V.dairySlimMaintainUpgrade, 0, 1) || 0;
		V.dairySlimMaintain = Math.clamp(+V.dairySlimMaintain, 0, 1) || 0;
		V.dairyPrepUpgrade = Math.clamp(+V.dairyPrepUpgrade, 0, 1) || 0;
		V.dairyHyperPregRemodel = Math.clamp(+V.dairyHyperPregRemodel, 0, 1) || 0;
		V.dairyImplantsSetting = Math.clamp(+V.dairyImplantsSetting, 0, 3) || 0;
		V.dairyWeightSetting = Math.clamp(+V.dairyWeightSetting, -1, 4) || 0;
		V.dairyHormonesSetting = Math.clamp(+V.dairyHormonesSetting, -1, 2) || 0;
		/* bioreactors */
		V.bioreactorsAnnounced = Math.clamp(+V.bioreactorsAnnounced, 0, 1) || 0;
		V.createBioreactors = Math.clamp(+V.createBioreactors, 0, 1) || 0;
		V.dairyUpgradeMenials = Math.clamp(+V.dairyUpgradeMenials, 0, 1) || 0;
		V.bioreactorsHerm = Math.max(+V.bioreactorsHerm, 0) || 0;
		V.bioreactorsXX = Math.max(+V.bioreactorsXX, 0) || 0;
		V.bioreactorsXY = Math.max(+V.bioreactorsXY, 0) || 0;
		V.bioreactorsBarren = Math.max(+V.bioreactorsBarren, 0) || 0;
		/* milkmaid */
		V.MilkmaidID = findSlaveId(s => s.assignment === Job.MILKMAID);
		V.milkmaidImpregnates = Math.clamp(+V.milkmaidImpregnates, 0, 1) || 0;
	}

	function FarmyardDatatypeCleanup() {
		V.farmyard = Math.max(+V.farmyard, 0) || 0;
		V.farmyardBreeding = Math.clamp(+V.farmyardBreeding, 0, 1) || 0;
		V.farmyardShows = Math.clamp(+V.farmyardShows, 0, 2) || 0;
		/* farmer */
		V.FarmerID = findSlaveId(s => s.assignment === Job.FARMER);
	}

	function ClubDatatypeCleanup() {
		/* ads */
		V.clubAdsSpending = Math.clamp(+V.clubAdsSpending, 0, 5000) || 0;
		V.clubAdsStacked = Math.clamp(+V.clubAdsStacked, -1, 1) || 0;
		V.clubAdsImplanted = Math.clamp(+V.clubAdsImplanted, -1, 1) || 0;
		V.clubAdsModded = Math.clamp(+V.clubAdsModded, -1, 1) || 0;
		V.clubAdsPreg = Math.clamp(+V.clubAdsPreg, -1, 1) || 0;
		V.clubAdsOld = Math.clamp(+V.clubAdsOld, -3, 1) || 0;
		V.clubAdsXX = Math.clamp(+V.clubAdsXX, -1, 1) || 0;
		/* upgrades */
		V.club = Math.max(+V.club, 0) || 0;
		V.clubUpgradePDAs = Math.clamp(+V.clubUpgradePDAs, 0, 1) || 0;
		/* madam */
		V.djID = findSlaveId(s => s.assignment === Job.DJ);
		V.DJignoresFlaws = Math.clamp(+V.DJignoresFlaws, 0, 1) || 0;
	}

	function ServantsQuartersDatatypeCleanup() {
		/* upgrades */
		V.servantsQuarters = Math.max(+V.servantsQuarters, 0) || 0;
		V.servantsQuartersUpgradeMonitoring = Math.clamp(+V.servantsQuartersUpgradeMonitoring, 0, 1) || 0;
		/* stewardess */
		V.StewardessID = findSlaveId(s => s.assignment === Job.STEWARD);
		V.stewardessImpregnates = Math.clamp(+V.stewardessImpregnates, 0, 1) || 0;
	}

	function SchoolroomDatatypeCleanup() {
		/* upgrades */
		V.schoolroom = Math.max(+V.schoolroom, 0) || 0;
		V.schoolroomUpgradeSkills = Math.clamp(+V.schoolroomUpgradeSkills, 0, 1) || 0;
		V.schoolroomUpgradeLanguage = Math.clamp(+V.schoolroomUpgradeLanguage, 0, 1) || 0;
		V.schoolroomUpgradeRemedial = Math.clamp(+V.schoolroomUpgradeRemedial, 0, 1) || 0;
		/* schoolteacher */
		V.SchoolteacherID = findSlaveId(s => s.assignment === Job.TEACHER);
	}

	function SpaDatatypeCleanup() {
		/* upgrades */
		V.spa = Math.max(+V.spa, 0) || 0;
		V.spaUpgrade = Math.clamp(+V.spaUpgrade, 0, 1) || 0;
		/* attendant */
		V.AttendantID = findSlaveId(s => s.assignment === Job.ATTENDANT);
		V.spaFix = Math.clamp(+V.spaFix, 0, 2) || 0;
	}

	function ClinicDatatypeCleanup() {
		/* upgrades */
		V.clinic = Math.max(+V.clinic, 0) || 0;
		V.clinicUpgradeScanner = Math.clamp(+V.clinicUpgradeScanner, 0, 1) || 0;
		V.clinicUpgradeFilters = Math.clamp(+V.clinicUpgradeFilters, 0, 1) || 0;
		V.clinicUpgradePurge = Math.clamp(+V.clinicUpgradePurge, 0, 2) || 0;
		if (V.clinicObservePregnancy !== 0) {
			V.clinicObservePregnancy = Math.clamp(+V.clinicObservePregnancy, 0, 2) || 1;
		}
		V.clinicInflateBelly = Math.clamp(+V.clinicInflateBelly, 0, 1) || 0;
		V.clinicSpeedGestation = Math.clamp(+V.clinicSpeedGestation, 0, 1) || 0;
		/* nurse */
		V.NurseID = findSlaveId(s => s.assignment === Job.NURSE);
	}

	function ArcadeDatatypeCleanup() {
		/* upgrades */
		V.arcade = Math.max(+V.arcade, 0) || 0;
		V.arcadeUpgradeInjectors = Math.clamp(+V.arcadeUpgradeInjectors, 0, 1) || 0;
		V.arcadeUpgradeCollectors = Math.clamp(+V.arcadeUpgradeCollectors, 0, 1.5) || 0;
		V.arcadeUpgradeFuckdolls = Math.clamp(+V.arcadeUpgradeFuckdolls, 0, 3) || 0;
		V.arcadeUpgradeHealth = Math.clamp(+V.arcadeUpgradeHealth, -1, 2) || 0;
	}

	function CellblockDatatypeCleanup() {
		/* upgrades */
		V.cellblock = Math.max(+V.cellblock, 0) || 0;
		V.cellblockUpgrade = Math.clamp(+V.cellblockUpgrade, 0, 1) || 0;
		/* wardeness */
		V.WardenessID = findSlaveId(s => s.assignment === Job.WARDEN);
		V.cellblockWardenCumsInside = Math.clamp(+V.cellblockWardenCumsInside, 0, 1) || 0;
	}

	function MasterSuiteDatatypeCleanup() {
		/* upgrades */
		V.masterSuite = Math.max(+V.masterSuite, 0) || 0;
		V.masterSuiteUpgradeLuxury = Math.clamp(+V.masterSuiteUpgradeLuxury, 0, 2) || 0;
		V.masterSuiteUpgradePregnancy = Math.clamp(+V.masterSuiteUpgradePregnancy, 0, 1) || 0;
		V.masterSuitePregnancyFertilitySupplements = Math.clamp(+V.masterSuitePregnancyFertilitySupplements, 0, 1) || 0;
		V.masterSuitePregnancySlaveLuxuries = Math.clamp(+V.masterSuitePregnancySlaveLuxuries, 0, 1) || 0;
		V.masterSuitePregnancyFertilityDrugs = Math.clamp(+V.masterSuitePregnancyFertilityDrugs, 0, 1) || 0;
		V.masterSuiteHyperPregnancy = Math.clamp(+V.masterSuiteHyperPregnancy, 0, 1) || 0;
		/* concubine */
		V.ConcubineID = findSlaveId(s => s.assignment === Job.CONCUBINE);
	}

	function HeadGirlSuiteDatatypeCleanup() {
		/* headgirl */
		V.HeadGirlID = findSlaveId(s => s.assignment === Job.HEADGIRL);
		V.HGSuiteEquality = Math.clamp(+V.HGSuiteEquality, 0, 1) || 0;
		if (V.HGSuiteSurgery !== 0) {
			V.HGSuiteSurgery = 1;
		}
		if (V.HGSuiteDrugs !== 0) {
			V.HGSuiteDrugs = 1;
		}
		if (V.HGSuiteAbortion !== 0) {
			V.HGSuiteAbortion = 1;
		}
		if (V.HGSuiteHormones !== 0) {
			V.HGSuiteHormones = 1;
		}
	}

	function NurseryDatatypeCleanup() {
		/* matron */
		V.MatronID = findSlaveId(s => s.assignment === Job.MATRON);
	}
})();


/**
 * Cleans up a slave record assuming it is used for the gene pool.
 *
 * It removes all the unneeded properties for the gene pool attributes.
 * TODO: remove after refactoring the slave state class
 */
App.Entity.Utils.GenePoolRecordCleanup = (function() {
	"use strict";
	return GenePoolRecordCleanup;

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function GenePoolRecordCleanup(slave) {
		if (slave.ID !== -1) {
			App.Entity.Utils.SlaveDataSchemeCleanup(slave);
		}

		// the following attributes are unneeded for gene pool records
		App.Update.deleteProperties(slave, [
			"counter", "custom", "porn",
			"prestige", "prestigeDesc",
			"subTarget", "relationship", "relationshipTarget", "rivalry", "rivalryTarget",
			"weekAcquired", "PCExclude", "HGExclude", "StudExclude",
			"daughters", "sisters", "origin",
			"canRecruit",
			"choosesOwnAssignment", "assignment",
			"sentence", "training", "toyHole",
			"indenture", "indentureRestrictions",
			"minorInjury",
			"oldTrust", "oldDevotion",
			"eyewear", "earwear",
			"preg", "pregSource", "pregType", "pregAdaptation", "labor",
			"bellyAccessory",
			"breedingMark",
			"clitSetting",
			"rules",
			"useRulesAssistant",
			"diet", "dietCum", "dietMilk",
			"drugs", "curatives", "aphrodisiacs",
			"choosesOwnClothes", "clothes", "collar", "mouthAccessory", "faceAccessory", "shoes",
			"makeup", "nails",
			"vaginalAccessory", "vaginalAttachment", "dickAccessory", "nipplesAccessory", "armAccessory", "legAccessory",
			"buttplug", "buttplugAttachment",
			"fetishKnown", "attrKnown",
			"rudeTitle",
			"currentRules",
			"induce",
			"induceLactation", "boobsMilk", "lactation", "lactationAdaptation", "lactationDuration",
			"mpreg",
			"inflation", "inflationType", "inflationMethod", "milkSource", "cumSource",
			"burst",
			"pregKnown", "pregWeek",
			"belly", "bellyPreg", "bellyFluid", "bellyImplant", "bellySag", "bellySagPreg", "bellyPain",
			"cervixImplant",
			"scar",
			"choosesOwnChastity",
			"pregControl",
			"death",
			"onDiet", "weightDirection",
			"prematureBirth",
			"slaveCost",
			"NCSyouthening",
			"lastWeeksCashIncome", "lastWeeksRepIncome", "lastWeeksRepExpenses",
			"lifetimeCashIncome", "lifetimeCashExpenses", "lifetimeRepIncome", "lifetimeRepExpenses",
			// player stuff
			"degeneracy", "refreshment", "refreshmentType",
			"relationships",
			"criticalDamage",
			"fertKnown", "forcedFertDrugs"
		]);
	}
})();

App.Entity.Utils.RARuleDatatypeCleanup = function() {
	"use strict";

	return ruleCleanup;

	/**
	 * @param {FC.RA.Rule} rule
	 * @returns {FC.RA.Rule}
	 */
	function ruleCleanup(rule) {
		// ensure rule has all required properties
		let newRule = App.RA.ruleDeepAssign(emptyDefaultRule(), rule, {}, "");
		cleanupConditions(newRule.condition);
		cleanupSetters(newRule.set);
		return newRule;
	}

	/** @param {FC.RA.RuleConditions} cond */
	function cleanupConditions(cond) {
		if (cond.excludeSpecialSlaves !== undefined) {
			if (cond.excludeSpecialSlaves) {
				cond.specialSlaves = 0;
			} else {
				cond.specialSlaves = -1;
			}
			delete cond.excludeSpecialSlaves;
		}

		if (cond.specialSlaves !== undefined) {
			const f = App.Data.Facilities;
			// facilities with heads
			/** @type {FC.Data.FacilityDesc[]} */
			const fwh = [
				f.brothel,
				f.cellblock,
				f.clinic,
				f.club,
				f.dairy,
				f.farmyard,
				f.headGirlSuite,
				f.masterSuite,
				f.nursery,
				f.schoolroom,
				f.servantsQuarters,
				f.spa
			];

			// migrate .specialSlaves to assignments list
			if (cond.specialSlaves === -1) { // include: duplicate regular assignments
				for (const f of fwh) {
					if (cond.assignment.includes(f.jobs[f.defaultJob].assignment)) {
						cond.assignment.push(f.manager.assignment);
					}
				}
			} else if (cond.specialSlaves === 1) { // only: replace regular assignments
				let newAssignments = [];
				for (const a of cond.assignment) {
					let found = false;
					for (const f of fwh) {
						if (a === f.jobs[f.defaultJob].assignment) {
							newAssignments.push(f.manager.assignment);
							found = true;
							break;
						}
					}
					if (!found) {
						newAssignments.push(a);
					}
				}
				// now if newAssignments is empty, we add all facility heads and special slaves
				if (newAssignments.length === 0) {
					fwh.forEach(f => newAssignments.push(f.manager.assignment));
					newAssignments.push(Job.RECRUITER);
					newAssignments.push(Job.BODYGUARD);
				}
				cond.assignment = newAssignments;
			}
			delete cond.specialSlaves;
		}

		if (cond.function !== undefined) {
			try {
				if (typeof cond.function === "boolean") {
					cond.activation = [cond.function, 1, "and"];
				} else if (cond.function === "custom") {
					cond.activation = ["?bc=>(" + cond.data + ")(c.slave)", 1, "and"];
				} else if (cond.function === "belongs") {
					switch (cond.data.attribute) {
						case "amp":
							cond.activation = cond.data.value[0] === 1
								? ["isamputee", 1, "and"]
								: ["isamputee", "not", 1, "and"];
							break;
						case "genes":
							cond.activation = ["genes", "!" + cond.data.value[0], "eqstr", 1, "and"];
							break;
						case "fetish":
							cond.activation = [];
							// eslint-disable-next-line no-case-declarations
							let count = 0;
							for (const fetish of cond.data.value) {
								count++;
								cond.activation.push("fetish", "!" + fetish, "eqstr");
							}
							cond.activation.push(count, "or", 1, "and");
					}
				} else if (cond.function === "between") {
					let count = convertBetween();
					if (count === 0) {
						count++;
						cond.activation = [false];
						console.log("no match", JSON.parse(JSON.stringify(cond)));
					}
					cond.activation.push(count, "and");
				}

				if (!App.RA.Activation.Editor.validateRule(cond.activation)) {
					cond.activation = [false, 1, "and"];
				}
			} catch (e) {
				console.log("condition broke", e.message, JSON.parse(JSON.stringify(cond)));
				cond.activation = [false, 1, "and"];
			} finally {
				delete cond.function;
				delete cond.data;
			}

			// assignments
			try {
				if (cond.assignment.length > 0) {
					let rule = [];
					for (const assignment of cond.assignment) {
						rule.push(assigmentToKey(assignment));
					}
					rule.push(rule.length, "or");

					if (!App.RA.Activation.Editor.validateRule(rule)) {
						rule = [false, 1, "or"];
					}

					cond.activation.pop();
					const length = cond.activation.pop();
					cond.activation.push(...rule);
					cond.activation.push(length + 1, "and");
					if (!App.RA.Activation.Editor.validateRule(cond.activation)) {
						cond.activation = [false, 1, "and"];
					}
				}
			} catch (e) {
				console.log("assignments broke", e.message, JSON.parse(JSON.stringify(cond)));
			} finally {
				delete cond.assignment;
			}
		}

		function convertBetween() {
			const values = {
				"devotion": "devotion",
				"trust": "trust",
				"health.condition": "health",
				"health.tired": "fatigue",
				"energy": "energy",
				"height": "height",
				"weight": "weight",
				"actualAge": "age",
				"physicalAge": "physicalAge",
				"visualAge": "visualAge",
				"muscles": "muscles",
				"pregType": "pregType",
				"bellyImplant": "bellyImplant",
				"belly": "belly",
				"intelligenceImplant": "intelligenceImplant",
				"intelligence": "intelligence",
				"accent": "accent",
				"waist": "waist",
				"chem": "chem",
				"lactation": "lactation",
			};
			if (values.hasOwnProperty(cond.data.attribute)) {
				return addBetween(values[cond.data.attribute]);
			}
			return 0;
		}

		function addBetween(key) {
			let count = 0;
			if (cond.data.value[0] !== null) {
				cond.activation.push(key, cond.data.value[0], "gte");
				count++;
			}
			if (cond.data.value[1] !== null) {
				cond.activation.push(key, cond.data.value[1], "lte");
				count++;
			}
			return count;
		}

		function assigmentToKey(assignment) {
			const jobs = {
				[Job.REST]: "rest",
				[Job.CHOICE]: "choice",
				[Job.FUCKTOY]: "fucktoy",
				[Job.CLASSES]: "classes",
				[Job.HOUSE]: "house",
				[Job.WHORE]: "whore",
				[Job.PUBLIC]: "public",
				[Job.SUBORDINATE]: "subordinate",
				[Job.MILKED]: "milked",
				[Job.GLORYHOLE]: "gloryhole",
				[Job.CONFINEMENT]: "confinement",
				[Job.BODYGUARD]: "bodyguard",
				[Job.RECRUITER]: "recruiter",
				[Job.HEADGIRL]: "headgirl",
				[Job.ARCADE]: "arcade",
				[Job.MADAM]: "madam",
				[Job.BROTHEL]: "brothel",
				[Job.WARDEN]: "warden",
				[Job.CELLBLOCK]: "cellblock",
				[Job.DJ]: "dj",
				[Job.CLUB]: "club",
				[Job.NURSE]: "nurse",
				[Job.CLINIC]: "clinic",
				[Job.MILKMAID]: "milkmaid",
				[Job.DAIRY]: "dairy",
				[Job.FARMER]: "farmer",
				[Job.FARMYARD]: "farmyard",
				[Job.HEADGIRLSUITE]: "headgirlsuite",
				[Job.CONCUBINE]: "concubine",
				[Job.MASTERSUITE]: "mastersuite",
				[Job.MATRON]: "matron",
				[Job.NURSERY]: "nursery",
				[Job.TEACHER]: "teacher",
				[Job.SCHOOL]: "school",
				[Job.STEWARD]: "steward",
				[Job.QUARTER]: "quarter",
				[Job.ATTENDANT]: "attendant",
				[Job.SPA]: "spa"
			};
			return jobs[assignment];
		}

		if (V.releaseID < 1173) {
			cond.advancedMode = true;
		}
	}

	/** @param {object} o */
	function replaceDefaultValues(o) {
		for (const [k, v] of Object.entries(o)) {
			if (v === "no default setting" || v === "no default change" || Number.isNaN(v) || v === undefined) {
				o[k] = null;
			} else if (v !== null && typeof v === 'object') {
				replaceDefaultValues(v);
			}
		}
	}

	/** @param {FC.RA.RuleSetters} set */
	function settersSchemeCleanup(set) {
		/**
		 * Moves properties of the given object, whose names start with prefix to the subject newProp
		 * @param {object} obj
		 * @param {string} prefix
		 * @param {string} newProp
		 */
		function moveProperties(obj, prefix, newProp) {
			if (!obj.hasOwnProperty(newProp)) {
				obj[newProp] = {};
			}
			let dest = obj[newProp];
			for (const p of Object.keys(obj)) {
				if (p.startsWith(prefix)) {
					dest[p.slice(prefix.length)] = obj[p];
					delete obj[p];
				}
			}
		}

		moveProperties(set, 'growth_', 'growth');
		moveProperties(set, 'surgery_', 'surgery');
	}

	/**
	 * @param {FC.RA.RuleSetters} set
	 */
	function correctStringValues(set) {
		for (const [k, v] of Object.entries(set)) {
			if (typeof v !== 'string') {
				continue;
			}
			if (["XX", "XY", "XXY"].includes(v)) {
				continue;
			}
			if (v === "null") {
				set[k] = null;
			}
			if (k === 'assignment' || k === 'clothes' || k === 'label' || k === 'removeLabel' || k === 'brandDesign') {
				continue;
			}
			if (v[0] === undefined) {
				continue;
			}
			if (v[0].toLowerCase() !== v[0]) {
				set[k] = v.charAt(0).toLowerCase() + v.substr(1);
			}
		}
	}

	/**
	 * @param {FC.RA.RuleReleaseSetters} rr
	 * @returns {FC.RA.RuleReleaseSetters}
	 */
	function convertReleaseRules(rr) {
		if (typeof rr === 'string') {
			switch (rr) {
				case "chastity":
					return {
						facilityLeader: 0,
						masturbation: 0,
						partner: 0,
						family: 0,
						slaves: 0,
						master: 0
					};
				case "restrictive":
					return {
						facilityLeader: 1,
						masturbation: 0,
						partner: 1,
						family: 0,
						slaves: 0,
						master: 1
					};
				case "masturbation":
					return {
						facilityLeader: 1,
						masturbation: 1,
						partner: 0,
						family: 0,
						slaves: 0,
						master: 1
					};
				case "sapphic":
					return {
						facilityLeader: 1,
						masturbation: 0,
						partner: 1,
						family: 1,
						slaves: 1,
						master: 1,
					};
				case "permissive":
					return {
						facilityLeader: 1,
						masturbation: 1,
						partner: 1,
						family: 1,
						slaves: 1,
						master: 1,
					};
			}
		}
		return rr;
	}

	/** @param {FC.RA.RuleSetters} set */
	function cleanupSetters(set) {
		settersSchemeCleanup(set);
		set.releaseRules = convertReleaseRules(set.releaseRules);
		replaceDefaultValues(set);

		function transformValues(obj, props, cb) {
			props.forEach(p => {
				let v = obj[p];
				if (v !== null) {
					obj[p] = cb(v);
				}
			});
		}

		function ensureNumTarget(val) {
			switch (typeof val) {
				case 'number':
					return Number.isNaN(val) ? null : App.RA.makeTarget('==', val);
				case 'string':
					return App.RA.makeTarget('==', parseInt(val));
				case 'object':
					if (val.hasOwnProperty('val') && (val.val === null || Number.isNaN(val.val))) {
						return null;
					}
					return val;
				default:
					return val;
			}
		}

		/**
		 * Converts numeric target to range.
		 * Conversion is valid only for integer targets
		 * @param {FC.RA.NumericTarget} tgt
		 * @returns {FC.NumericRange}
		 */
		function targetToRange(tgt) {
			switch (tgt.cond) {
				case '==':
					return App.Utils.makeRange(tgt.val, tgt.val);
				case "<=":
					return App.Utils.makeRange(Number.NEGATIVE_INFINITY, tgt.val);
				case "<":
					return App.Utils.makeRange(Number.NEGATIVE_INFINITY, tgt.val - 1);
				case ">=":
					return App.Utils.makeRange(tgt.val, Number.POSITIVE_INFINITY);
				case ">":
					return App.Utils.makeRange(tgt.val + 1, Number.POSITIVE_INFINITY);
			}
		}

		if (!([true, false, null].includes(set.preg))) {
			set.preg = (set.preg === -1);
		}

		if (set.pornFameSpending === undefined || set.pornFameSpending === -1) {
			set.pornFameSpending = null;
		}

		transformValues(set.growth,
			['boobs', 'butt', 'lips', 'dick', 'balls'],
			ensureNumTarget
		);

		transformValues(set, ['muscles'], ensureNumTarget);
		transformValues(set.surgery, ['butt', 'boobs', 'lips'], ensureNumTarget);

		set.growth.intensity = Math.clamp(+set.growth.intensity, 0, 1) || 0;

		correctStringValues(set);

		// moving numeric diets to the 'weight' attribute
		if (typeof set.diet === 'number') {
			set.weight = App.Utils.makeRange(set.diet, set.diet);
			set.diet = null;
		}

		// Fix particular rules where a setting might no longer be valid
		if (set.drug === "none") {
			set.drug = "no drugs";
		}
		if (set.brandDesign === "") {
			set.brandDesign = null;
		}
		if (set.label === "") {
			set.label = null;
		}
		if (set.removeLabel === "") {
			set.removeLabel = null;
		}
		if (typeof (set.abortion) === "string") {
			set.abortion = [set.abortion];
		}
		switch (set.collar) {
			case "porcelain mask":
				set.faceAccessory = set.collar;
				set.collar = null;
				break;
			case "bit gag":
			case "dildo gag":
			case "massive dildo gag":
			case "ball gag":
			case "ring gag":
				set.mouthAccessory = set.collar;
				set.collar = null;
				break;
		}
		delete set.eyeColor;
		delete set.autoSurgery;

		// Look for and remove pieces of a rule that would apply an accessory that is not in data. A common example is the old "chastity" accessories, which have now been moved to a different system
		const vaginalAccessories = new Set([
			"virginAccessory",
			"aVirginAccessory",
			"vaginalAccessory",
		]);

		for (const acc of vaginalAccessories) {
			if (set[acc] && !(App.Data.vaginalAccessory.get(set[acc]) || V.customItem.vaginalAccessory.get(set[acc]))) {
				set[acc] = null;
			}
		}

		const dickAccessories = new Set([
			"aVirginDickAccessory",
			"dickAccessory"
		]);

		for (const acc of dickAccessories) {
			if (set[acc] && !(App.Data.slaveWear.dickAccessory.get(set[acc]))) {
				set[acc] = null;
			}
		}
		if (set.clothes === "choosing her own clothes") {
			set.clothes = null;
			set.choosesOwnClothes = 1;
		}

		const oldPiercings = new Map([
			["nipple", "nipples"],
			["areola", "areolae"],
			["genitals", "clit"]
		]);
		if (set.piercing === undefined) {
			set.piercing = new App.Entity.completePiercingState();
			for (const piercing of Object.keys(App.Data.Piercings)) {
				const oldPiercing = `${oldPiercings.get(piercing) || piercing}Piercing`; // the old variable names were sometimes plural and sometimes singular. The new standard is to use singular when possible.
				set.piercing[piercing].desc = null;
				if (piercing === "genitals" && set.piercing[piercing].smart === undefined) {
					set.piercing[piercing].smart = null;
				}
				if (set.hasOwnProperty(oldPiercing)) {
					if (set[oldPiercing] === 3) { // 3 used to indicate a smart piercing. We now track this on a separate property as a bool.
						set.piercing[piercing].weight = 2;
						set.piercing[piercing].smart = true;
					} else {
						set.piercing[piercing].weight = set[oldPiercing];
					}
					delete set[oldPiercing];
				}
			}
		}

		for (const n of ["boobs", "butt", "lips"]) {
			if (set.surgery[n] && typeof set.surgery[n].cond !== "undefined") {
				set.surgery[n] = targetToRange(set.surgery[n]);
			}
		}
	}
}();

App.Entity.Utils.validateRules = function() {
	const rules = V.defaultRules;

	function testObject(o, path) {
		for (const p in o) {
			const v = o[p];
			if (v === undefined) {
				throw Error(`Property ${path}.${p} is undefined`);
			}
			if (v !== null && typeof v === 'object') {
				testObject(v, `${path}.${p}`);
			}
		}
	}

	for (const rule of rules) {
		try {
			testObject(rule.set, "set");
		} catch (e) {
			// eslint-disable-next-line no-console
			console.error(`Error in rule ${rule.name}: ${e}`);
		}
	}
};

/** @param {object} subject */
App.Entity.Utils.migratePronouns = function(subject) {
	if (subject.pronoun === undefined || typeof subject.pronoun === 'number') {
		return;
	}

	switch (subject.pronoun) {
		case "she":
			subject.pronoun = App.Data.Pronouns.Kind.female;
			break;
		case "he":
			subject.pronoun = App.Data.Pronouns.Kind.male;
			break;
		case "it":
			subject.pronoun = App.Data.Pronouns.Kind.neutral;
			break;
		default:
			throw Error(`Unrecognized custom pronoun "${subject.pronoun}"`);
	}

	/* eslint-disable dot-notation */
	delete subject["possessive"];
	delete subject["possessivePronoun"];
	delete subject["possessivePronoun"];
	delete subject["objectReflexive"];
	delete subject["object"];
	delete subject["noun"];
	/* eslint-enable dot-notation */
};

App.Update.playerFSDatatypeCleanup = function() {
	for (const society of App.Data.FutureSociety.playerFSNames) {
		if (!(V.arcologies[0][society] > 0)) {
			FutureSocieties.remove(society);
		}

		const decoName = `${society}Decoration`;
		V.arcologies[0][decoName] = Math.clamp(+V.arcologies[0][decoName], 0, 100) || 0;

		// reset any FS policies that are set to some value that you can't pick from the UI
		/** @type {PolicySelectorGroup} */
		const FSPolicies = App.Data.Policies.Selection[society];
		if (FSPolicies) {
			for (const [key, settings] of Object.entries(FSPolicies)) {
				const currentValue = _.get(V, key);
				if (currentValue !== 0) { // assume 0 is a valid setting for all policies
					if (!settings.some(s => currentValue === (("enable" in s) ? s.enable : 1))) {
						_.set(V, key, 0);
						console.log("Reset bad policy value", key, currentValue);
					}
				}
			}
		}
	}
};

App.Update.arcologiesDatatypeCleanup = function() {
	/** validate or reset a diplomatic target
	 * @param {FC.Zeroable<FC.ArcologyDirection>} direction
	 * @returns {FC.Zeroable<FC.ArcologyDirection>}
	 */
	function validTarget(direction) {
		if (!["east", "north", "northeast", "northwest", "south", "southeast", "southwest", "west", 0, -1].includes(direction)) {
			return -1;
		}
		if (!V.arcologies.find(a => a.direction === direction)) {
			return -1;
		}
		return direction;
	}

	for (const arc of V.arcologies) {
		if (typeof arc.government !== 'string') {
			arc.government = "an individual";
		}
		arc.honeymoon = Number(arc.honeymoon) || 0;
		arc.prosperity = Number(arc.prosperity) || 0;
		arc.ownership = Number(arc.ownership) || 0;
		arc.minority = Number(arc.minority) || 0;
		arc.PCminority = Number(arc.PCminority) || 0;
		arc.demandFactor = Number(arc.demandFactor) || 0;

		for (const fs of Object.keys(App.Data.FutureSociety.records)) {
			// @ts-expect-error
			if (arc[fs] === "unset") {
				arc[fs] = null;
			}
		}

		// enforce future society mutual exclusion rules
		for (const group of App.Data.FutureSociety.mutexGroups) {
			for (const fs1 of group) {
				if (arc[fs1] !== null) {
					arc[fs1] = Number(arc[fs1]) || null;
				}
				if (arc[fs1] !== null /* check again, may have just changed */) {
					for (const fs2 of group) {
						if (fs1 !== fs2) {
							arc[fs2] = null;
						}
					}
				}
			}
		}
		const raceArray = Array.from(App.Data.misc.filterRaces.keys());
		if (!raceArray.includes(arc.FSSupremacistRace)) {
			if (arc.FSSupremacist !== null) {
				arc.FSSupremacistRace = raceArray.random();
			} else {
				arc.FSSupremacistRace = 0;
			}
		}
		if (!raceArray.includes(arc.FSSubjugationistRace)) {
			if (arc.FSSubjugationist !== null) {
				arc.FSSubjugationistRace = raceArray.random();
			} else {
				arc.FSSubjugationistRace = 0;
			}
		}

		arc.embargo = Math.clamp(+arc.embargo, 1, 3) || 1;
		arc.embargoTarget = validTarget(arc.embargoTarget);
		arc.CyberEconomic = Math.clamp(+arc.CyberEconomic, 1, 3) || 1;
		arc.CyberEconomicTarget = validTarget(arc.CyberEconomicTarget);
		arc.CyberReputation = Math.clamp(+arc.CyberReputation, 1, 3) || 1;
		arc.CyberReputationTarget = validTarget(arc.CyberReputationTarget);
		arc.influenceBonus = Number(arc.influenceBonus) || 0;
		arc.influenceTarget = validTarget(arc.influenceTarget);
		arc.rival = Math.clamp(arc.rival, 0, 1) || 0;
	}
};

App.Entity.Utils.PCCheatCleanup = function() {
	V.PC.preg = Number(V.PC.preg) || 0;
	V.PC.pregSource = Number(V.PC.pregSource) || 0;
	V.PC.pregType = Number(V.PC.pregType) || 0;
	WombInit(V.PC); // just to make sure
	V.PC.womb.length = 0; // simple way to delete all fetuses
	WombImpregnate(V.PC, V.PC.pregType, V.PC.pregSource, V.PC.preg);// recreates fetuses
	if (V.PC.preg > 0) {
		V.PC.belly = WombGetVolume(V.PC);
		V.PC.pregWeek = V.PC.preg;
	} else {
		V.PC.belly = 0;
		V.PC.pregWeek = 0;
	}

	if (V.PC.boobsImplant > V.PC.boobs) {
		V.PC.boobsImplant = V.PC.boobs;
	}
	if (V.PC.butt < 2) {
		V.PC.butt = 2;
		V.PC.buttImplant = 0;
	}
	if (V.PC.buttImplant > V.PC.butt) {
		V.PC.buttImplant = V.PC.butt;
	}
	if (V.PC.dick === 0) {
		V.PC.balls = 0;
		V.PC.ballsImplant = 0;
		V.PC.scrotum = 0;
		V.PC.prostate = 0;
	}
	if (V.PC.ballsImplant > V.PC.balls) {
		V.PC.ballsImplant = V.PC.balls;
	}
	if (V.PC.vagina === -1) {
		V.PC.newVag = 0;
		V.PC.ovaries = 0;
		V.PC.vaginaLube = 0;
	}
	if (V.PC.lactation > 0 && V.PC.lactationDuration === 0) {
		V.PC.lactationDuration = 2;
	} else if (V.PC.lactation === 0 && V.PC.lactationDuration > 0) {
		V.PC.lactationDuration = 0;
	}

	ibc.recalculate_coeff_id(-1);
	PCDatatypeCleanup(V.PC);
	V.upgradeMultiplierArcology = upgradeMultiplier('engineering');
	V.upgradeMultiplierMedicine = upgradeMultiplier('medicine');
	V.upgradeMultiplierTrade = upgradeMultiplier('trading');
	V.HackingSkillMultiplier = upgradeMultiplier('hacking');
};


/**
 * @param {FC.HumanState} slave
 */
App.Update.slavePiercingsDatatypeCleanup = function(slave) {
	slave.piercing = slave.piercing || new App.Entity.completePiercingState();
	const oldPiercings = new Map([
		["nipple", "nipples"],
		["areola", "areolae"],
		["genitals", "clit"]
	]);
	for (const piercing in App.Data.Piercings) {
		slave.piercing[piercing] = slave.piercing[piercing] || new App.Entity.piercingState();
		const oldPiercing = `${oldPiercings.get(piercing) || piercing}Piercing`; // the old variable names were sometimes plural and sometimes singular. The new standard is to use singular when possible.
		if (App.Data.Piercings[piercing].smart) {
			slave.piercing[piercing].smart = slave.piercing[piercing].smart || false;
		}
		if (slave.hasOwnProperty(oldPiercing)) {
			if (slave[oldPiercing] === 3) { // 3 used to indicate a smart piercing. We now track this on a separate property as a bool.
				slave.piercing[piercing].weight = 2;
				slave.piercing[piercing].smart = true;
			} else if (slave[oldPiercing]) {
				slave.piercing[piercing].weight = slave[oldPiercing];
			}
			delete slave[oldPiercing];
		}
	}
};
