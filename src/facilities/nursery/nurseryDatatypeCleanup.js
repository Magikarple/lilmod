App.Facilities.Nursery.ChildDatatypeCleanup = function(child) {
	childAgeDatatypeCleanup(child);
	childPhysicalDatatypeCleanup(child);
	childFaceDatatypeCleanup(child);
	childHairDatatypeCleanup(child);
	childBoobsDatatypeCleanup(child);
	childButtDatatypeCleanup(child);
	childPregnancyDatatypeCleanup(child);
	childBellyDatatypeCleanup(child);
	childGenitaliaDatatypeCleanup(child);
	childImplantsDatatypeCleanup(child);
	childPiercingsDatatypeCleanup(child);
	childTattooDatatypeCleanup(child);
	childCosmeticsDatatypeCleanup(child);
	childDietDatatypeCleanup(child);
	childPornDatatypeCleanup(child);
	childRelationDatatypeCleanup(child);
	childSkillsDatatypeCleanup(child);
	childStatCountDatatypeCleanup(child);
	childPreferencesDatatypeCleanup(child);
	childRulesDatatypeCleanup(child);
	childCustomStatsDatatypeCleanup(child);
	childMiscellaneousDatatypeCleanup(child);
	generatePronouns(child);

	function childAgeDatatypeCleanup(child) {
		child.birthWeek = Math.clamp(+child.birthWeek, 0, 51) || 0;
		if (child.age > 0) {
			child.actualAge = Math.clamp(+child.actualAge, 0, Infinity) || child.age; /* if undefined, this sets to child.age */
			delete child.age;
		} else {
			child.actualAge = Math.clamp(+child.actualAge, 0, Infinity) || 3;
		}
		child.visualAge = Math.max(+child.visualAge, 0) || child.actualAge;
		child.physicalAge = Math.max(+child.physicalAge, 0) || child.actualAge;
		child.ovaryAge = Math.max(+child.ovaryAge, 0) || child.physicalAge;
		child.pubertyAgeXX = Math.max(+child.pubertyAgeXX, 0) || V.fertilityAge;
		child.pubertyAgeXY = Math.max(+child.pubertyAgeXY, 0) || V.potencyAge;
	}

	function childPhysicalDatatypeCleanup(child) {
		if (typeof child.nationality !== "string" || child.nationality === "child") {
			child.nationality = "slave";
		}
		if (typeof child.race !== "string") {
			nationalityToRace(child);
		}
		if (typeof child.origRace !== "string") {
			child.origRace = child.race;
		}
		if (typeof child.skin !== "string") {
			child.skin = "light";
		}
		if (typeof child.origSkin !== "string") {
			child.origSkin = child.skin;
		}
		if (typeof child.minorInjury !== "string") {
			child.minorInjury = 0;
		}
		if (typeof child.health === "number") {
			const condition = child.health;
			child.health = {};
			child.health.condition = condition;
		}
		child.health.condition = Math.clamp(+child.health.condition, -100, 100) || 0;
		child.health.shortDamage = Math.max(+child.health.shortDamage, 0) || 0;
		child.health.longDamage = Math.max(+child.health.longDamage, 0) || 0;
		child.health.illness = Math.max(+child.health.illness, 0) || 0;
		child.health.tired = Math.clamp(+child.health.tired, 0, 100) || 0;
		child.muscles = Math.clamp(+child.muscles, -100, 100) || 0;
		child.weight = Math.clamp(+child.weight, -100, 200) || 0;
		child.waist = Math.clamp(+child.waist, -100, 100) || 0;
		child.height = Math.round(Math.max(+child.height, 0)) || Height.mean(child);
		child.shoulders = Math.clamp(+child.shoulders, -2, 2) || 0;
		child.hips = Math.clamp(+child.hips, -2, 3) || 0;
	}

	function childFaceDatatypeCleanup(child) {
		child.face = Math.clamp(+child.face, -100, 100) || 0;
		if (typeof child.faceShape !== "string") {
			child.faceShape = "normal";
		}
		if (child.lips !== 0) {
			child.lips = Math.clamp(+child.lips, 0, 100) || 15;
		}
	}

	function childHairDatatypeCleanup(child) {
		if (typeof child.hColor !== "string") {
			child.hColor = "brown";
		}
		if (typeof child.origHColor !== "string") {
			child.origHColor = child.hColor;
		}
		if (child.hLength !== 0) {
			child.hLength = Math.clamp(+child.hLength, 0, 300) || 60;
		}
		if (typeof child.hStyle !== "string") {
			child.hStyle = "long";
		}
		child.haircuts = Math.clamp(+child.haircuts, 0, 1) || 0;
		child.bald = Math.clamp(+child.bald, 0, 1) || 0;
		if (typeof child.pubicHColor !== "string") {
			child.pubicHColor = child.hColor;
		}
		if (typeof child.pubicHStyle !== "string") {
			child.pubicHStyle = "neat";
		}
		if (typeof child.underArmHColor !== "string") {
			child.underArmHColor = child.hColor;
		}
		if (typeof child.underArmHStyle !== "string") {
			child.underArmHStyle = "waxed";
		}
		if (typeof child.eyebrowHColor !== "string") {
			child.eyebrowHColor = child.hColor;
		}
		if (typeof child.eyebrowHStyle !== "string") {
			child.eyebrowHStyle = "natural";
		}
		if (typeof child.eyebrowFullness !== "string") {
			child.eyebrowFullness = "natural";
		}
	}

	function childBoobsDatatypeCleanup(child) {
		child.boobs = Math.max(+child.boobs, 100) || 200;
		if (typeof child.boobShape !== "string") {
			child.boobShape = "normal";
		}
		if (typeof child.nipples !== "string") {
			child.nipples = "cute";
		}
		if (typeof child.nipplesAccessory !== "string") {
			child.nipplesAccessory = "none";
		}
		child.areolae = Math.clamp(+child.areolae, 0, 4) || 0;
		if (typeof child.areolaeShape !== "string") {
			child.areolaeShape = "circle";
		}
		child.lactation = Math.clamp(+child.lactation, 0, 2) || 0;
		child.lactationAdaptation = Math.clamp(+child.lactationAdaptation, 0, 100) || 0;
	}

	function childButtDatatypeCleanup(child) {
		if (child.butt !== 0) {
			child.butt = Math.clamp(+child.butt, 0, 20) || 1;
		}
		child.anus = Math.clamp(+child.anus, 0, 4) || 0;
		child.analArea = Math.max(+child.analArea, 0) || 0;
	}

	function childPregnancyDatatypeCleanup(child) {
		child.induce = Math.clamp(+child.induce, 0, 1) || 0;
		child.labor = Math.clamp(+child.labor, 0, 1) || 0;
		if (child.hasOwnProperty("cSec")) {
			if (child.cSec > 0) {
				App.Medicine.Modification.addScar(child, "belly", "c-section");
			}
			delete child.cSec;
		}
		child.prematureBirth = Math.clamp(+child.prematureBirth, 0, 1) || 0;
		child.ovaries = Math.clamp(+child.ovaries, 0, 1) || 0;
		child.vasectomy = Math.clamp(+child.vasectomy, 0, 1) || 0;
		child.mpreg = Math.clamp(+child.mpreg, 0, 1) || 0;
		if (child.pregAdaptation !== 0) {
			child.pregAdaptation = Math.max(+child.pregAdaptation, 0) || 50;
		}
		child.pregSource = +child.pregSource || 0;
		if (typeof child.pregControl !== "string") {
			child.pregControl = "none";
		}
		child.fertPeak = Math.clamp(+child.fertPeak, 0, 4) || 0;
		WombNormalizePreg(child);
	}

	function childBellyDatatypeCleanup(child) {
		child.bellySag = Math.max(+child.bellySag, 0) || 0;
		child.bellySagPreg = Math.max(+child.bellySagPreg, 0) || child.bellySag;
		SetBellySize(child);
	}

	function childGenitaliaDatatypeCleanup(child) {
		child.vagina = Math.clamp(+child.vagina, -1, 10) || 0;
		child.vaginaLube = Math.clamp(+child.vaginaLube, 0, 2) || 0;
		child.labia = Math.clamp(+child.labia, 0, 3) || 0;
		child.clit = Math.clamp(+child.clit, 0, 5) || 0;
		child.foreskin = Math.max(+child.foreskin, 0) || 0;
		child.dick = Math.max(+child.dick, 0) || 0;
		if (child.dick && child.prostate !== 0) {
			child.prostate = Math.clamp(+child.prostate, 0, 3) || 1;
		} else {
			child.prostate = Math.clamp(+child.prostate, 0, 3) || 0;
		}
		child.balls = Math.max(+child.balls, 0) || 0;
		if (child.scrotum !== 0) {
			child.scrotum = Math.max(+child.scrotum, 0) || child.balls;
		}
	}

	function childImplantsDatatypeCleanup(child) {
		child.ageImplant = Math.clamp(+child.ageImplant, 0, 1) || 0;
		child.faceImplant = Math.clamp(+child.faceImplant, 0, 100) || 0;
		child.lipsImplant = Math.clamp(+child.lipsImplant, 0, 100) || 0;
		child.voiceImplant = Math.clamp(+child.voiceImplant, -1, 1) || 0;
		child.boobsImplant = Math.max(+child.boobsImplant, 0) || 0;
		if (child.boobsImplant === 0) {
			child.boobsImplantType = "none";
		} else if (child.boobsImplantType === "none") {
			child.boobsImplantType = "normal";
		}
		child.breastMesh = Math.clamp(+child.breastMesh, 0, 1) || 0;
		child.buttImplant = Math.clamp(+child.buttImplant, 0, 3) || 0;
		if (child.buttImplant === 0) {
			child.buttImplantType = "none";
		} else if (child.buttImplantType === "none") {
			child.buttImplantType = "normal";
		}
		child.earImplant = Math.clamp(+child.earImplant, 0, 1) || 0;
	}

	function childPiercingsDatatypeCleanup(child) {
		child.piercing = child.piercing || {}; // areolae and nipples
		const oldPiercings = new Map([
			["nipple", "nipples"],
			["areola", "areolae"],
		]);
		for (const piercing of Object.keys(App.Data.Piercings)) {
			child.piercing[piercing] = child.piercing[piercing] || new App.Entity.piercingState();
			const oldPiercing = `${oldPiercings.get(piercing) || piercing}Piercing`; // the old variable names were sometimes plural and sometimes singular. The new standard is to use singular when possible.
			if (child.hasOwnProperty(oldPiercing)) {
				if (child[oldPiercing] === 3) { // 3 used to indicate a smart piercing. We now track this on a separate property as a bool.
					child.piercing[piercing].weight = 2;
					child.piercing[piercing].smart = true;
				} else if (child[oldPiercing]) {
					child.piercing[piercing].weight = child[oldPiercing];
				}
				delete child[oldPiercing];
			}
		}
	}

	function childTattooDatatypeCleanup(child) {
		if (typeof child.shouldersTat !== "string") {
			child.shouldersTat = 0;
		}
		if (typeof child.lipsTat !== "string") {
			child.lipsTat = 0;
		}
		if (typeof child.boobsTat !== "string") {
			child.boobsTat = 0;
		}
		if (typeof child.armsTat !== "string") {
			child.armsTat = 0;
		}
		if (typeof child.backTat !== "string") {
			child.backTat = 0;
		}
		if (typeof child.stampTat !== "string") {
			child.stampTat = 0;
		}
		if (typeof child.buttTat !== "string") {
			child.buttTat = 0;
		}
		if (typeof child.vaginaTat !== "string") {
			child.vaginaTat = 0;
		}
		if (typeof child.dickTat !== "string") {
			child.dickTat = 0;
		}
		if (typeof child.anusTat !== "string") {
			child.anusTat = 0;
		}
		if (typeof child.legsTat !== "string") {
			child.legsTat = 0;
		}
		if (typeof child.bellyTat !== "string") {
			child.bellyTat = 0;
		}
		if (typeof child.custom.tattoo !== "string") {
			child.custom.tattoo = "";
		}
	}

	function childCosmeticsDatatypeCleanup(child) {
		child.makeup = Math.clamp(+child.makeup, 0, 8) || 0;
		child.nails = Math.clamp(+child.nails, 0, 9) || 0;
		child.scars = Math.clamp(+child.scars, 0, 6) || 0;
		child.chastityAnus = Math.clamp(+child.chastityAnus, 0, 1) || 0;
		child.chastityPenis = Math.clamp(+child.chastityPenis, 0, 1) || 0;
		child.chastityVagina = Math.clamp(+child.chastityVagina, 0, 1) || 0;
		child.choosesOwnClothes = Math.clamp(+child.choosesOwnClothes, 0, 1) || 0;
		if (typeof child.clothes !== "string") {
			child.clothes = "no clothing";
		}
		if (typeof child.collar !== "string") {
			child.collar = "none";
		}
		if (typeof child.shoes !== "string") {
			child.shoes = "none";
		}
		if (typeof child.eyewear !== "string") {
			child.eyewear = "none";
		}
		if (typeof child.brand !== "object") {
			let brand = {};
			if (child.brand !== 0) {
				brand["left buttock"] = child.brand;
			}
			child.brand = brand;
		} else if (typeof child.brand === "object") { // Make sure key and value are strings
			for (let [key, value] of Object.entries(child.brand)) {
				if (typeof key !== "string" || typeof value !== "string") {
					delete child.brand[key];
				}
			}
		}
		if (typeof child.markings !== "string") {
			child.markings = "none";
		}
		if (typeof child.bellyAccessory !== "string") {
			child.bellyAccessory = "none";
		}
		if (typeof child.vaginalAccessory !== "string") {
			child.vaginalAccessory = "none";
		}
		if (typeof child.vaginalAttachment !== "string") {
			child.vaginalAttachment = "none";
		}
		if (typeof child.dickAccessory !== "string") {
			child.dickAccessory = "none";
		}
		if (typeof child.legAccessory !== "string") {
			child.legAccessory = "none";
		}
		if (typeof child.buttplug !== "string") {
			child.buttplug = "none";
		}
		if (typeof child.buttplugAttachment !== "string") {
			child.buttplugAttachment = "none";
		}
		if (typeof child.faceAccessory !== "string") {
			child.faceAccessory = "none";
		}
		if (typeof child.mouthAccessory !== "string") {
			child.mouthAccessory = "none";
		}
		switch (child.collar) {
			case "porcelain mask":
				child.faceAccessory = child.collar;
				child.collar = "none";
				break;
			case "bit gag":
			case "dildo gag":
			case "massive dildo gag":
			case "ball gag":
			case "ring gag":
				child.mouthAccessory = child.collar;
				child.collar = "none";
				break;
		}
	}

	function childDietDatatypeCleanup(child) {
		if (typeof child.diet !== "string") {
			child.diet = "healthy";
		}
		child.dietCum = Math.clamp(+child.dietCum, 0, 2) || 0;
		child.dietMilk = Math.clamp(+child.dietMilk, 0, 2) || 0;
		child.onDiet = Math.clamp(+child.onDiet, 0, 1) || 0;
		child.hormones = Math.clamp(+child.hormones, -2, 2) || 0;
		child.hormoneBalance = Math.clamp(+child.hormoneBalance, -400, 400) || 0;
		if (typeof child.drugs !== "string") {
			child.drugs = "no drugs";
		}
		child.aphrodisiacs = Math.clamp(+child.aphrodisiacs, 0, 2) || 0;
		child.curatives = Math.clamp(+child.curatives, 0, 2) || 0;
	}

	function childPornDatatypeCleanup(child) {
		child.porn.feed = Math.clamp(+child.porn.feed, 0, 1) || 0;
		child.porn.viewerCount = Math.max(+child.porn.viewerCount, 0) || 0;
		child.porn.spending = Math.max(+child.porn.spending, 0) || 0;
		child.porn.prestige = Math.clamp(+child.porn.prestige, 0, 3) || 0;
		if (typeof child.porn.prestigeDesc !== "string") {
			child.porn.prestigeDesc = 0;
		}
		if (typeof child.porn.fameType !== "string") {
			child.porn.fameType = "none";
		}
		if (typeof child.porn.focus !== "string") {
			child.porn.focus = "none";
		}
		for (const genre of App.Porn.getAllGenres()) {
			child.porn.fame[genre.fameVar] = Math.max(+child.porn.fame[genre.fameVar], 0) || 0;
		}
	}

	function childRelationDatatypeCleanup(child) {
		child.mother = +child.mother || 0;
		child.father = +child.father || 0;
		child.canRecruit = Math.clamp(+child.canRecruit, 0, 1) || 0;
		child.relationship = Math.clamp(+child.relationship, -3, 5) || 0;
		child.relationshipTarget = Math.max(+child.relationshipTarget, 0) || 0;
		child.rivalryTarget = Math.max(+child.rivalryTarget, 0) || 0;
		child.rivalry = Math.clamp(+child.rivalry, 0, 3) || 0;
	}

	function childSkillsDatatypeCleanup(child) {
		child.skill.oral = Math.clamp(+child.skill.oral, 0, 100) || 0;
		child.skill.vaginal = Math.clamp(+child.skill.vaginal, 0, 100) || 0;
		child.skill.penetrative = Math.clamp(+child.skill.penetrative, 0, 100) || 0;
		child.skill.anal = Math.clamp(+child.skill.anal, 0, 100) || 0;
		child.skill.whoring = Math.clamp(+child.skill.whoring, 0, 100) || 0;
		child.skill.entertainment = Math.clamp(+child.skill.entertainment, 0, 100) || 0;
		child.skill.combat = Math.clamp(+child.skill.combat, 0, 100) || 0;
		child.skill.headGirl = Math.clamp(+child.skill.headGirl, 0, 200) || 0;
		child.skill.recruiter = Math.clamp(+child.skill.recruiter, 0, 200) || 0;
		child.skill.bodyguard = Math.clamp(+child.skill.bodyguard, 0, 200) || 0;
		child.skill.madam = Math.clamp(+child.skill.madam, 0, 200) || 0;
		child.skill.DJ = Math.clamp(+child.skill.DJ, 0, 200) || 0;
		child.skill.nurse = Math.clamp(+child.skill.nurse, 0, 200) || 0;
		child.skill.teacher = Math.clamp(+child.skill.teacher, 0, 200) || 0;
		child.skill.attendant = Math.clamp(+child.skill.attendant, 0, 200) || 0;
		child.skill.matron = Math.clamp(+child.skill.matron, 0, 200) || 0;
		child.skill.stewardess = Math.clamp(+child.skill.stewardess, 0, 200) || 0;
		child.skill.milkmaid = Math.clamp(+child.skill.milkmaid, 0, 200) || 0;
		child.skill.farmer = Math.clamp(+child.skill.farmer, 0, 200) || 0;
		child.skill.wardeness = Math.clamp(+child.skill.wardeness, 0, 200) || 0;
		child.skill.servant = Math.clamp(+child.skill.servant, 0, 200) || 0;
		child.skill.entertainer = Math.clamp(+child.skill.entertainer, 0, 200) || 0;
		child.skill.whore = Math.clamp(+child.skill.whore, 0, 200) || 0;
	}

	function childStatCountDatatypeCleanup(child) {
		child.counter.oral = Math.max(+child.counter.oral, 0) || 0;
		child.counter.vaginal = Math.max(+child.counter.vaginal, 0) || 0;
		child.counter.anal = Math.max(+child.counter.anal, 0) || 0;
		child.counter.publicUse = Math.max(+child.counter.publicUse, 0) || 0;
		child.counter.mammary = Math.max(+child.counter.mammary, 0) || 0;
		child.counter.penetrative = Math.max(+child.counter.penetrative, 0) || 0;
		child.counter.pitKills = Math.max(+child.counter.pitKills, 0) || 0;
		child.counter.milk = Math.max(+child.counter.milk, 0) || 0;
		child.counter.cum = Math.max(+child.counter.cum, 0) || 0;
		child.counter.births = Math.max(+child.counter.births, 0) || 0;
		child.counter.birthsTotal = Math.max(+child.counter.birthsTotal, 0) || child.counter.births;
		child.counter.laborCount = Math.max(+child.counter.laborCount, 0) || child.counter.birthsTotal;
		child.counter.PCChildrenFathered = Math.max(+child.counter.PCChildrenFathered, 0) || 0;
		child.counter.PCKnockedUp = Math.max(+child.counter.PCKnockedUp, 0) || 0;
		child.bodySwap = Math.max(+child.bodySwap, 0) || 0;
	}

	function childPreferencesDatatypeCleanup(child) {
		child.energy = Math.clamp(+child.energy, 0, 100) || 0;
		child.need = Math.max(+child.need, 0) || 0;
		child.attrXY = Math.clamp(+child.attrXY, 0, 100) || 0;
		child.attrXX = Math.clamp(+child.attrXX, 0, 100) || 0;
		child.attrKnown = Math.clamp(+child.attrKnown, 0, 1) || 0;
		child.fetishStrength = Math.clamp(+child.fetishStrength, 0, 100) || 0;
		child.fetishKnown = Math.clamp(+child.fetishKnown, 0, 1) || 0;
	}

	function childRulesDatatypeCleanup(child) {
		child.breedingMark = Math.clamp(+child.breedingMark, 0, 1) || 0;
		child.rudeTitle = Math.clamp(+child.rudeTitle, 0, 1) || 0;
	}

	function childCustomStatsDatatypeCleanup(child) {
		if (typeof child.custom.label !== "string") {
			child.custom.label = "";
		}
		if (typeof child.custom.desc !== "string") {
			child.custom.desc = "";
		}
		if (typeof child.custom.title !== "string") {
			child.custom.title = "";
		}
		if (typeof child.custom.titleLisp !== "string") {
			child.custom.titleLisp = "";
		}
		if (child.custom.image !== null) {
			if (typeof child.custom.image.filename !== "string") {
				child.custom.image = null;
			}
		}
	}

	function childMiscellaneousDatatypeCleanup(child) {
		child.weekAcquired = Math.max(+child.weekAcquired, 0) || 0;
		child.prestige = Math.clamp(+child.prestige, 0, 3) || 0;
		child.devotion = Math.clamp(+child.devotion, -100, 100) || 0;
		child.oldDevotion = Math.clamp(+child.oldDevotion, -100, 100) || 0;
		child.trust = Math.clamp(+child.trust, -100, 100) || 0;
		child.oldTrust = Math.clamp(+child.oldTrust, -100, 100) || 0;
		child.chem = Math.max(+child.chem, 0) || 0;
		child.addict = Math.max(+child.addict, 0) || 0;
		child.intelligence = Math.clamp(+child.intelligence, -100, 100) || 0;
		child.intelligenceImplant = Math.clamp(+child.intelligenceImplant, 0, 30) || 0;
		child.premature = Math.clamp(+child.premature, 0, 1) || 0;
		child.training = Math.clamp(+child.training, 0, 150) || 0;
		child.hears = Math.clamp(+child.hears, -2, 0) || 0;
		child.smells = Math.clamp(+child.smells, -1, 0) || 0;
		child.tastes = Math.clamp(+child.tastes, -1, 0) || 0;
		if (typeof child.earwear !== "string") {
			child.earwear = "none";
		}
		if (child.voice !== 0) {
			child.voice = Math.clamp(+child.voice, 0, 3) || 1;
		}
		child.electrolarynx = Math.clamp(+child.electrolarynx, 0, 1) || 0;
		child.accent = Math.clamp(+child.accent, 0, 3) || 0;
	}
};

App.Facilities.Nursery.InfantDatatypeCleanup = function(child) {
	"use strict";

	ageDatatypeCleanup(child);
	physicalDatatypeCleanup(child);
	faceDatatypeCleanup(child);
	hairDatatypeCleanup(child);
	relationDatatypeCleanup(child);
	originDatatypeCleanup(child);
	generatePronouns(child);

	child.premature = Math.clamp(+child.premature, 0, 1) || 0;
	child.addict = Math.max(+child.addict, 0) || 0;

	// old versions of FC assign overlapping IDs to infants and other slaves, which needs to be fixed
	// resolve conflicting IDs between infants and older children/tank babies/adults by reassigning the infant's ID
	if (V.cribs.find((s) => s.ID === child.ID && (s.birthWeek !== child.birthWeek || s.actualAge !== child.actualAge)) !== undefined ||
	 V.slaves.find((s) => s.ID === child.ID) !== undefined || (V.incubator.tanks.find((s) => s.ID === child.ID) !== undefined)) {
		child.ID = generateSlaveID();
	}

	function ageDatatypeCleanup(child) {
		child.birthWeek = Math.clamp(+child.birthWeek, 0, 51) || 0;
		child.actualAge = Math.clamp(+child.actualAge, 0, Infinity) || 0;
	}

	function physicalDatatypeCleanup(child) {
		if (typeof child.nationality !== "string" || child.nationality === "child") {
			child.nationality = "slave";
		}
		if (typeof child.race !== "string") {
			nationalityToRace(child);
		}
		if (typeof child.skin !== "string") {
			child.skin = "light";
		}
		child.weight = Math.clamp(+child.weight, -100, 200) || 0;
	}

	function faceDatatypeCleanup(child) {
		child.face = Math.clamp(+child.face, -100, 100) || 0;
		if (typeof child.faceShape !== "string") {
			child.faceShape = "normal";
		}
	}

	function hairDatatypeCleanup(child) {
		if (typeof child.hColor !== "string") {
			child.hColor = "brown";
		}
		if (typeof child.pubicHStyle !== "string") {
			child.pubicHStyle = "neat";
		}
		if (typeof child.eyebrowHColor !== "string") {
			child.eyebrowHColor = child.hColor;
		}
	}

	function relationDatatypeCleanup(child) {
		child.mother = +child.mother || 0;
		child.father = +child.father || 0;
		child.cloneID = +child.cloneID || 0;
	}

	function originDatatypeCleanup(child) {
		if (typeof child.origin !== "string") {
			child.origin = `${capFirstChar(child.pronoun)} was born and raised in your arcology. `;
		}
	}
};
