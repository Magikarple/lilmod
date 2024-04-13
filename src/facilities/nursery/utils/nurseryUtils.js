/**
 * Displays a list of the children in the Nursery
 * @returns {DocumentFragment}
 */
App.Facilities.Nursery.childList = function childList() {
	const cribs = V.cribs;

	let frag = document.createDocumentFragment();
	let r = [];

	if (V.nurseryChildren) {
		App.UI.DOM.appendNewElement("h3", frag, `Children in ${V.nurseryName}`, "indent");

		const list = App.UI.DOM.appendNewElement("p", frag, '', "indent");

		for (const child of cribs) {
			const weeksOwned = V.week - child.weekAcquired;
			const weeksLeft = (V.targetAgeNursery * 52) - weeksOwned;
			const {he, him, He} = getPronouns(child);
			const hr = document.createElement("hr");

			hr.style.margin = "0";
			list.appendChild(hr);

			if (child.actualAge < 3) {
				$(list).append(App.UI.DOM.link(SlaveFullName(child), (id) => V.activeChild = getChild(id), [child.ID], "Infant Interact"));
				$(list).append(App.Facilities.Nursery.InfantSummary(child));
			} else {
				$(list).append(App.UI.DOM.link(SlaveFullName(child), (id) => V.activeChild = getChild(id), [child.ID], "Child Interact"));
				$(list).append(App.Facilities.Nursery.ChildSummary(child));
			}

			if (child.actualAge >= 18) {
				if (child.targetLocation === "freedom") {
					V.freedSlaves.push(child);
				}

				V.readySlave = cribs.pluck();
				r.push(`<<goto "Nursery Retrieval Workaround">>`);
				return r;
			}

			if (child.growTime <= 0 || child.actualAge >= V.targetAgeNursery) {
				const targetText = child.targetLocation === "slavery" ? `"Introduce ${him} to life as a slave"` : `"Set ${him} free"`;

				list.appendChild(document.createElement("br"));

				r.push(`${He} is ready to leave ${V.nurseryName} and ${child.targetLocation === "slavery" ? `join your ménage` : `become a free citizen`}.`);
				$(list).append(App.UI.DOM.passageLink(targetText, "Nursery Retrieval Workaround", () => { V.readySlave = child; }));
			} else {
				list.appendChild(document.createElement("br"));

				r.push(`${He} is to continue staying in ${V.nurseryName} for another ${years(weeksLeft)}. ${He} is destined for ${child.targetLocation} once ${he} is of age.`);
			}

			$(list).append(r.join(' '));

			r = [];	// reset for next child
		}
	}

	return frag;
};

/**
 * Converts the infant object into a new child object
 * @param {object} child
 * @returns {object}
 */
App.Facilities.Nursery.infantToChild = function infantToChild(child) {
	child.abortionTat = -1;
	child.accent = 0;
	child.ageImplant = 0;
	child.arm = {
		left: new App.Entity.ArmState(),
		right: new App.Entity.LegState()
	};
	child.leg = {
		left: new App.Entity.LegState(),
		right: new App.Entity.LegState()
	};
	child.analArea = 0;
	child.anus = 0;
	child.piercing = new App.Entity.completePiercingState();
	child.anusTat = 0;
	child.aphrodisiacs = 0;
	child.areolae = 0;
	child.areolaeShape = "circle";
	child.armAccessory = "none";
	child.armsTat = 0;
	child.attrKnown = 0;
	child.attrXX = 0;
	child.attrXY = 0;
	child.backTat = 0;
	child.bald = 0;
	child.balls = 0;
	child.behavioralFlaw = "none";
	child.belly = 0;
	child.bellyAccessory = "none";
	child.bellyFluid = 0;
	child.bellyImplant = -1;
	child.bellyPreg = 0;
	child.bellySag = 0;
	child.bellySagPreg = 0;
	child.bellyTat = 0;
	child.bodySwap = 0;
	child.boobShape = jsEither(["normal", "normal", "normal", "perky", "perky", "perky", "torpedo-shaped", "downward-facing", "wide-set"]);
	child.boobs = jsRandom(200, 500);
	child.boobsImplant = 0;
	child.boobsImplantType = "none";
	child.boobsTat = 0;
	child.brand = {};
	child.breastMesh = 0;
	child.breedingMark = 0;
	child.butt = jsRandom(0, 3);
	child.buttImplant = 0;
	child.buttImplantType = "none";
	child.buttTat = 0;
	child.buttplug = "none";
	child.buttplugAttachment = "none";
	child.canRecruit = 0;
	child.chastityAnus = 0;
	child.chastityPenis = 0;
	child.chastityVagina = 0;
	child.chem = 0;
	child.choosesOwnClothes = 0;
	child.clit = jsRandom(0, 2);
	child.clothes = "no clothing";
	child.collar = "none";
	child.counter = {
		PCChildrenFathered: 0,
		PCKnockedUp: 0,
		anal: 0,
		births: 0,
		birthsTotal: 0,
		cum: 0,
		laborCount: 0,
		mammary: 0,
		milk: 0,
		oral: 0,
		penetrative: 0,
		pitKills: 0,
		publicUse: 0,
		slavesFathered: 0,
		slavesKnockedUp: 0,
		vaginal: 0
	};
	child.curatives = 0;
	child.custom = {
		desc: "",
		hairVector: "",
		image: null,
		label: "",
		tattoo: "",
		title: "",
		titleLisp: ""
	};
	child.daughters = 0;
	child.devotion = 40;
	child.dick = 0;
	child.dickAccessory = "none";
	child.dickTat = 0;
	child.diet = "healthy";
	child.dietCum = 0;
	child.dietMilk = 0;
	child.drugs = "no drugs";
	if (child.race !== "catgirl") {
		child.earImplant = 0;
		child.earShape = "normal";
		child.earT = "none";
		child.earTColor = "hairless";
	}
	if (child.race === "catgirl") {
		child.earImplant = 1;
		child.earShape = "none";
		child.earT = "cat";
		child.earTColor = child.hColor;
	}
	child.earwear = "none";
	child.electrolarynx = 0;
	child.energy = 0;
	child.eyebrowFullness = "natural";
	child.eyebrowHStyle = "natural";
	child.eyewear = "none";
	child.faceImplant = 0;
	child.fertKnown = 1;
	child.fertPeak = 0;
	child.fetishKnown = 0;
	child.fetishStrength = 0;
	child.foreskin = 0;
	child.geneMods = {
		NCS: 0,
		rapidCellGrowth: 0,
		immortality: 0
	};
	child.hLength = jsRandom(30, 70);
	child.hStyle = "long";
	child.haircuts = 0;
	child.health = {};
	setHealth(child, jsRandom(80, 100), 0, 0, 0, 0);
	child.hears = 0;
	child.heels = 0;
	child.hips = 0;
	child.hormoneBalance = 0;
	child.hormones = 0;
	child.horn = "none";
	child.hornColor = "none";
	child.induce = 0;
	child.induceLactation = 0;
	child.intelligence = 100;
	child.intelligenceImplant = 0;
	child.labia = jsRandom(0, 2);
	child.labor = 0;
	child.lactation = 0;
	child.lactationAdaptation = 0;
	child.lactationDuration = 0;
	child.rules = new App.Entity.RuleState();
	child.rules.lactation = "none";
	child.legAccessory = "none";
	child.legsTat = 0;
	child.lips = jsRandom(10, 30);
	child.lipsImplant = 0;
	child.lipsTat = 0;
	child.rules.living = "normal";
	child.makeup = 0;
	child.markings = "none";
	child.minorInjury = 0;
	child.mpreg = 0;
	child.muscles = jsRandom(-10, 10);
	child.nails = 0;
	child.need = 0;
	if (child.boobs > 500 || child.weight > 95) {
		child.nipples = jsEither(["cute", "puffy", "partially inverted", "inverted", "tiny"]);
	} else {
		child.nipples = jsEither(["cute", "cute", "cute", "tiny"]);
	}
	child.nipplesAccessory = "none";
	child.oldDevotion = 0;
	child.oldTrust = 0;
	child.onDiet = 0;
	child.origRace = child.race;
	child.eye = new App.Entity.EyeState();
	child.eye.origColor = child.eyeColor;
	child.origHColor = child.hColor;
	child.origSkin = child.skin;
	child.ovaries = child.genes === "XX" ? 1 : 0;
	child.ovaryAge = child.actualAge;
	/* eslint-disable camelcase */
	child.override_Arm_H_Color = 0;
	child.override_Brow_H_Color = 0;
	child.override_Eye_Color = 0;
	child.override_H_Color = 0;
	child.override_Pubic_H_Color = 0;
	child.override_Race = 0;
	child.override_Skin = 0;
	/* eslint-enable camelcase */
	child.physicalAge = child.actualAge;
	child.porn = new App.Entity.SlavePornPerformanceState();
	child.pregAdaptation = 50;
	child.pregControl = "none";
	child.pregData = {
		drugsEffect: 1,
		fetusRate: [1, 1, 1, 0.64, 0.6513, 0.6459, 0.644, 0.6393, 0.58, 0.51],
		fetusSize: [1, 3, 16, 25.6, 51, 60, 67.5, 71.6, 129.5, 130],
		fetusWeek: [0, 9, 20, 20, 40, 52, 64, 80, 384, 99999],
		minLiveBirth: 32,
		normalBirth: 40,
		normalOvaMax: 1,
		normalOvaMin: 1,
		sizeType: 0,
		type: "human"
	};
	child.pregKnown = 0;
	child.pregSource = 0;
	child.pregType = 0;
	child.pregWeek = 0;
	child.prematureBirth = 0;
	child.prestige = 0;
	child.prostate = 0;
	child.pubertyAgeXX = 10;
	child.pubertyAgeXY = 12;
	child.pubertyXX = 1;
	child.pubicHColor = "black";
	child.pubicHStyle = "bushy";
	child.readyOva = 0;
	child.relationship = 0;
	child.rules.relationship = "restrictive";
	child.relationshipTarget = 0;
	child.rules.release = new App.Entity.ReleaseRulesState();
	child.rivalry = 0;
	child.rivalryTarget = 0;
	child.rudeTitle = 0;
	child.scar = {};
	child.scrotum = 0;
	child.shoes = "none";
	child.shoulders = 0;
	child.shouldersTat = 0;
	child.sisters = 0;
	child.skill = {
		DJ: 0,
		anal: 0,
		attendant: 0,
		bodyguard: 0,
		combat: 0,
		entertainer: 0,
		entertainment: 0,
		farmer: 0,
		headGirl: 0,
		madam: 0,
		matron: 0,
		milkmaid: 0,
		nurse: 0,
		oral: 0,
		recruiter: 0,
		servant: 0,
		stewardess: 0,
		teacher: 0,
		vaginal: 0,
		penetrative: 0,
		wardeness: 0,
		whore: 0,
		whoring: 8
	};
	child.smells = 0;
	child.rules.speech = "restrictive";
	child.stampTat = 0;
	child.rules.punishment = "situational";
	child.rules.reward = "situational";
	if (child.race !== "catgirl") {
		child.tailColor = "none";
		child.tailShape = "none";
	} else {
		child.tailColor = child.hColor;
		child.tailShape = "cat";
	}
	child.tastes = 0;
	child.teeth = "baby";
	child.training = 0;
	child.trust = 0;
	child.underArmHStyle = "natural";
	child.vagina = child.genes === "XX" ? 0 : -1;
	child.vaginaLube = 0;
	child.vaginaTat = 0;
	child.vaginalAccessory = "none";
	child.vaginalAttachment = "none";
	child.vasectomy = 0;
	child.visualAge = child.actualAge;
	child.voice = 1;
	child.voiceImplant = 0;
	child.waist = 0;
	child.weeksLeft = 0;
	child.weight = jsRandom(-10, 10);
	child.womb = [];
	child.wombImplant = "none";
	resetEyeColor(child, "both");
	generatePronouns(child);
	child.height = Height.forAge(child.natural.height, child);

	return child;
};

/**
 * Allows the player to name the infant
 * FIXME: Does not currently work
 * @param {object} child
 * @returns {string}
 */
App.Facilities.Nursery.nameChild = function nameChild(child) {
	const PC = V.PC;
	const arcology = V.arcologies[0];
	const girl = child.genes === "XX" ? "girl" : "boy";

	let r = ``;
	/** @type {App.Entity.SlaveState} */
	let father = 0;
	/** @type {App.Entity.SlaveState} */
	let mother = 0;

	const {him, his, he} = getPronouns(child);

	if (child.father === -1 && child.mother === -1) {
		father = PC;
		mother = PC;
	} else {
		if (child.father === -1) {
			father = PC;
			mother = getSlave(child.mother);
		} else if (child.mother === -1) {
			father = getSlave(child.father);
			mother = PC;
		} else {
			father = getSlave(child.father);
			mother = getSlave(child.mother);
		}
	}

	function newChildName(child) {
		child.birthName = generateName(child.nationality, child.race, child.genes === "XY");

		if (child.genes === "XY" && !V.allowMaleSlaveNames && isMaleName(child.birthName, child.nationality, child.race)) {
			child.slaveName = generateName(child.nationality, child.race, false);
		} else {
			child.slaveName = child.birthName;
		}
	}

	r += `You can name the new child, if you so desire. `;

	r += `<br><<textbox "${child.slaveName}" ${child.slaveName}>>`;
	r += App.UI.passageLink("Commit name", "Nursery Workaround", `${child.birthName = child.slaveName}, ${App.UI.replace("#naming", `You instruct ${V.assistant.name} to register the new ${girl} as "${child.slaveName}" in the slave registry.`)}`);
	r += `<br>`;
	r += App.UI.passageLink(`Have your PA assign ${him} a random name`, "Nursery Workaround", `${App.UI.replace("#naming", `${newChildName(child)}<br>${V.assistant.name} registers the new ${girl} as "${child.slaveName}" in your registry.`)}`);

	if (FutureSocieties.isActive('FSPastoralist', arcology)) {
		if (child.lactation > 0) {
			r += `<br>
			<<link "Have your PA assign ${him} a random cow name">>
			<<replace "#naming">>`;
			child.slaveName = App.Data.misc.cowSlaveNames.random();
			child.birthName = child.slaveName;
			r += `${V.assistant.name} registers the new ${girl} as "${child.slaveName}" in your registry.
			<</replace>>
			<</link>>`;
		}
	}
	if (child.race === "catgirl") {
		r += `<br>
		<<link "Have your PA assign ${him} a random cat name">>
		<<replace "#naming">>`;
		child.slaveName = App.Data.misc.catSlaveNames.random();
		child.birthName = child.slaveName;
		r += `${V.assistant.name} registers the new ${girl} as "${child.slaveName}" in your registry.
		<</replace>>
		<</link>>`;
	}
	if (FutureSocieties.isActive('FSChattelReligionist', arcology)) {
		r += `<br>
		<<link "Have your PA assign ${him} a random devotional name">>
			<<replace "#naming">>`;
		child.slaveName = App.Data.misc.chattelReligionistSlaveNames.random();
		child.birthName = child.slaveName;
		r += `${V.assistant.name} registers the new ${girl} as "${child.slaveName}" in your registry.
			<</replace>>
		<</link>>`;
	}
	if (FutureSocieties.isActive('FSRomanRevivalist', arcology)) {
		r += `<br>
		<<link "Have your PA assign ${him} a random Roman name">>
			<<replace "#naming">>`;
		child.slaveName = App.Data.misc.romanSlaveNames.random();
		child.birthName = child.slaveName;
		r += `${V.assistant.name} registers the new ${girl} as "${child.slaveName}" in your registry.
			<</replace>>
		<</link>>`;
	} else if (FutureSocieties.isActive('FSAztecRevivalist', arcology)) {
		r += `<br>
		<<link "Have your PA assign ${him} a random Aztec name">>
			<<replace "#naming">>`;
		child.slaveName = App.Data.misc.aztecSlaveNames.random();
		child.birthName = child.slaveName;
		r += `${V.assistant.name} registers the new ${girl} as "${child.slaveName}" in your registry.
			<</replace>>
		<</link>>`;
	} else if (FutureSocieties.isActive('FSEgyptianRevivalist', arcology)) {
		r += `<br>
		<<link "Have your PA assign ${him} a random ancient Egyptian name">>
			<<replace "#naming">>`;
		child.slaveName = App.Data.misc.ancientEgyptianSlaveNames.random();
		child.birthName = child.slaveName;
		r += `${V.assistant.name} registers the new ${girl} as "${child.slaveName}" in your registry.
			<</replace>>
		<</link>>`;
	} else if (FutureSocieties.isActive('FSEdoRevivalist', arcology)) {
		r += `<br>
		<<link "Have your PA assign ${him} a random feudal Japanese name">>
			<<replace "#naming">>`;
		child.slaveName = App.Data.misc.edoSlaveNames.random();
		child.birthName = child.slaveName;
		r += `${V.assistant.name} registers the new ${girl} as "${child.slaveName}" in your registry.
			<</replace>>
		<</link>>`;
	}
	if (FutureSocieties.isActive('FSDegradationist', arcology)) {
		r += `<br>
		<<link "Have your PA assign ${him} a degrading name">>
			<<replace "#naming">>`;
		DegradingName(child);
		child.birthName = child.slaveName;
		r += `${V.assistant.name} registers the new ${girl} as "${child.slaveName}" in your registry.
			<</replace>>
		<</link>>`;
	}
	if (mother !== PC && mother !== 0) {
		const {He2, he2, his2} = getPronouns(mother).appendSuffix('2');
		if (mother.ID === V.ConcubineID) {
			r += `<br>
			<<link "Permit your Concubine to name ${his2} daughter">>
				<<replace "#naming">>`;
			parentNames(mother, child);
			child.birthName = child.slaveName;
			r += `After some careful consideration, ${mother.slaveName} picks a name ${he2} thinks you might find attractive; from now on ${his2} daughter will be known as "${child.slaveName}".
				<</replace>>
			<</link>>`;
		} else if (mother.relationship === -3 && mother.devotion >= -20) {
			r += `<br>
			<<link "Permit your wife to name ${his2} daughter">>
				<<replace "#naming">>`;
			parentNames(mother, child);
			child.birthName = child.slaveName;
			r += `After some careful consideration, ${mother.slaveName} picks a name suitable for your daughter; from now on ${he2} will be known as "${child.slaveName}".
				<</replace>>
			<</link>>`;
		} else if (mother.ID === V.BodyguardID) {
			r += `<br>
			<<link "Permit your bodyguard to name ${his2} daughter">>
				<<replace "#naming">>`;
			parentNames(mother, child);
			child.birthName = child.slaveName;
			r += `After some careful consideration, ${mother.slaveName} decides on "${child.slaveName}" for ${his2} daughter. ${He2} hopes you'll find it fitting ${his} station.
				<</replace>>
			<</link>>`;
		} else if (mother.ID === V.HeadGirlID) {
			r += `<br>
			<<link "Permit your Head Girl to name ${his2} daughter">>
				<<replace "#naming">>`;
			parentNames(mother, child);
			child.birthName = child.slaveName;
			r += `After some careful consideration, ${mother.slaveName} decides on "${child.slaveName}" for ${his2} daughter, and hopes it will be a name your other slaves will learn to respect.
				<</replace>>
			<</link>>`;
		} else if (mother.devotion > 50 && mother.trust > 50) {
			r += `<br>
			<<link "Permit ${his} devoted mother to name ${his2} daughter">>
				<<replace "#naming">>`;
			parentNames(mother, child);
			child.birthName = child.slaveName;
			r += `After some careful consideration, ${mother.slaveName} picks a name ${he2} hopes you'll like; from now on ${his2} daughter will be known as "${child.slaveName}".
				<</replace>>
			<</link>>`;
		}
	}
	if (father !== PC && father !== 0 && father !== mother) {
		const {He2, he2, his2} = getPronouns(father).appendSuffix('2');
		if (father.ID === V.ConcubineID) {
			r += `<br>
			<<link "Permit your Concubine to name ${his2} daughter">>
				<<replace "#naming">>`;
			parentNames(father, child);
			child.birthName = child.slaveName;
			r += `After some careful consideration, ${father.slaveName} picks a name ${he2} thinks you might find attractive; from now on ${his2} daughter will be known as "${child.slaveName}".
				<</replace>>
			<</link>>`;
		} else if (father.relationship === -3 && father.devotion >= -20) {
			r += `<br>
			<<link "Permit your wife to name ${his2} daughter">>
				<<replace "#naming">>`;
			parentNames(father, child);
			child.birthName = child.slaveName;
			r += `After some careful consideration, ${father.slaveName} picks a name suitable for your daughter; from now on ${he} will be known as "${child.slaveName}".
				<</replace>>
			<</link>>`;
		} else if (father.ID === V.BodyguardID) {
			r += `<br>
			<<link "Permit your bodyguard to name ${his2} daughter">>
				<<replace "#naming">>`;
			parentNames(father, child);
			child.birthName = child.slaveName;
			r += `After some careful consideration, ${father.slaveName} decides on "${child.slaveName}" for ${his2} daughter. ${He2} hopes you'll find it fitting ${his} station.
				<</replace>>
			<</link>>`;
		} else if (father.ID === V.HeadGirlID) {
			r += `<br>
			<<link "Permit your Head Girl to name ${his2} daughter">>
				<<replace "#naming">>`;
			parentNames(father, child);
			child.birthName = child.slaveName;
			r += `After some careful consideration, ${father.slaveName} decides on "${child.slaveName}" for ${his2} daughter, and hopes it will be a name your other slaves will learn to respect.
				<</replace>>
			<</link>>`;
		} else if (father.devotion > 50 && father.trust > 50) {
			r += `<br>
			<<link "Permit ${his} devoted father to name ${his2} daughter">>
				<<replace "#naming">>`;
			parentNames(father, child);
			child.birthName = child.slaveName;
			r += `After some careful consideration, ${father.slaveName} picks a name ${he2} hopes you'll like; from now on ${his2} daughter will be known as "${child.slaveName}".
				<</replace>>
			<</link>>`;
		}
	}

	return r;
};

/**
 * Adds an infant to a the cribs
 * @param {App.Facilities.Nursery.InfantState} child
 */
App.Facilities.Nursery.newChild = function newChild(child) {
	child.ID = generateSlaveID();

	child.actualAge = 0;
	child.birthWeek = 0;

	if (child.override_Race !== 1) {
		child.origRace = child.race;
	}

	if (child.override_H_Color !== 1) {
		child.hColor = getGeneticHairColor(child);
	}
	if (child.override_Arm_H_Color !== 1) {
		child.underArmHColor = getGeneticHairColor(child);
	}
	if (child.override_Pubic_H_Color !== 1) {
		child.pubicHColor = getGeneticHairColor(child);
	}
	if (child.override_Brow_H_Color !== 1) {
		child.eyebrowHColor = getGeneticHairColor(child);
	}
	if (child.override_Skin !== 1) {
		child.origSkin = getGeneticSkinColor(child);
	}
	/* eslint-disable camelcase*/
	child.override_Race = 0;
	child.override_H_Color = 0;
	child.override_Arm_H_Color = 0;
	child.override_Pubic_H_Color = 0;
	child.override_Brow_H_Color = 0;
	child.override_Skin = 0;
	child.override_Eye_Color = 0;
	/* eslint-enable */

	child.arm = {
		left: new App.Entity.ArmState(),
		right: new App.Entity.ArmState()
	};
	child.leg = {
		left: new App.Entity.LegState(),
		right: new App.Entity.LegState()
	};

	if (V.surnamesForbidden === 1) {
		child.slaveSurname = 0;
	}

	if (child.clone !== 0) {
		child.canRecruit = 0;
	}
	generatePronouns(child);
	child.origin = `$He was born and raised in your arcology. `;
	child.targetLocation = "slavery";
	child.growTime = V.targetAgeNursery * 52;
	V.cribs.push(child);
	V.cribsIndices = App.Facilities.Nursery.cribsToIndices();
	V.nurseryChildren++;
};

/**
 * @param {App.Entity.ChildState[]} [cribs]
 * @returns {{[key: number]: number}}
 */
App.Facilities.Nursery.cribsToIndices = function cribsToIndices(cribs = V.cribs) {
	return cribs.reduce((acc, child, i) => { acc[child.ID] = i; return acc; }, {});
};

/**
 * Returns index in the children array for the given ID
 * @param {number} id child's ID
 * @returns {number}
 */
App.Facilities.Nursery.childIndexForID = function childIndexForID(id) {
	return V.cribsIndices[id];
};

/**
 * Removes the child using the child's ID
 * @param {number} index
 * @returns {Array}
 */
App.Facilities.Nursery.removeChild = function removeChild(index) {
	return V.cribs.deleteAt(index);
};

/**
 * Displays a list of slaves with children eligible for the Nursery
 * FIXME: Does not currently work
 * @returns {string}
 */
App.Facilities.Nursery.nurserySort = function nurserySort() {
	const PC = V.PC;
	const SL = V.slaves.length;
	const arcology = V.arcologies[0];
	const freeCribs = (V.nurseryCribs - V.cribs.length);

	let r = ``;
	let eligibility = 0;
	let sortNurseryList = V.sortNurseryList || "Unsorted";
	let nurseryHasReservedChildren = false;
	let reservedChildrenNursery = FetusGlobalReserveCount("nursery");

	r += `<br><i>Sorting:</i> <b><span id="ql-nursery-sort">${sortNurseryList}.</span></b> `;
	r += `${App.UI.passageLink("Sort by Name", "Nursery", `${sortNurseryList = "Name"}, ${App.UI.replace(`#ql-nursery-sort`, sortNurseryList)}, ${byName()}`)} | `;
	r += `${App.UI.passageLink("Sort by Reserved Nursery Spots", "Nursery", `${sortNurseryList = "Reserved Nursery Spots"}, ${App.UI.replace(`#ql-nursery-sort`, sortNurseryList)}, ${byReservedSpots()}`)} | `;
	r += `${App.UI.passageLink("Sort by Pregnancy Week", "Nursery", `${sortNurseryList = "Pregnancy Week"}, ${App.UI.replace(`#ql-nursery-sort`, sortNurseryList)}, ${byPregnancyWeek()}`)} | `;
	r += `${App.UI.passageLink("Sort by Number of Children", "Nursery", `${sortNurseryList = "Number of Children"}, ${App.UI.replace(`#ql-nursery-sort`, sortNurseryList)}, ${byPregnancyCount()}`)}`;
	r += `<br>`;

	r += `<div id="ql-nursery">`;

	for (const slave of V.slaves) {
		const {His, his} = getPronouns(slave);

		if (slave.preg > 0 && !slave.broodmother && slave.pregKnown && slave.eggType === "human") {
			if (slave.assignment !== Job.DAIRY && V.dairyPregSetting <= 0) {
				const slaveID = "slave-" + slave.ID;
				const WL = slave.womb.length;
				const reservedNursery = WombReserveCount(slave, "nursery");
				const reservedIncubator = WombReserveCount(slave, "incubator");
				const pregWeek = slave.pregWeek;
				const slaveName = SlaveFullName(slave);

				r += `<div class="possible" @id="${slaveID}" @data-preg-count="${WL}" @data-reserved-spots="${reservedNursery}" @data-preg-week="${pregWeek}" @data-name="${slaveName}">`;

				r += `${App.UI.SlaveDescriptionDialog(slave)} is ${pregWeek} weeks pregnant with `;

				switch (slave.pregSource) {
					case 0:
						r += `someone's${slave.preg <= 5 ? `, though it is too early to tell whose,` : ``}`;
						break;
					case -1:
						r += `your`;
						break;
					case -2:
						r += `a citizen's`;
						break;
					case -3:
						r += `your Master's`;
						break;
					case -4:
						r += `another arcology owner's`;
						break;
					case -5:
						r += `your client's`;
						break;
					case -6:
						r += `the Societal Elite's`;
						break;
					case -7:
						r += `the lab's`;
						break;
					case -9:
						r += `the Futanari Sister's`;
						break;
					case -10:
						r += `your rapist`;
						break;
					default:
						if (slave.preg <= 5) {
							r += `someone's, though it is too early to tell whose,`;
						} else {
							let source = getSlave(slave.pregSource);
							if (source !== undefined) {
								r += `${source.slaveName}'s`;
							}
						}
						break;
				}
				r += ` ${WL > 1 ? `babies` : `baby`}. `;

				if (reservedNursery > 0) {
					nurseryHasReservedChildren = true;
					if (WL === 1) {
						r += `${His} child will be placed in ${V.nurseryName}. `;
					} else if (reservedNursery < WL) {
						r += `${reservedNursery} of ${his} children will be placed in ${V.nurseryName}. `;
					} else if (WL === 2) {
						r += `Both of ${his} children will be placed in ${V.nurseryName}. `;
					} else {
						r += `All ${reservedNursery} of ${his} children will be placed in ${V.nurseryName}. `;
					}

					if ((reservedIncubator + reservedNursery < WL) && (reservedChildrenNursery < freeCribs)) {
						r += `<br>&nbsp;&nbsp;&nbsp;&nbsp;`;
						r += App.UI.passageLink("Keep another child", "Nursery", `${WombAddToGenericReserve(slave, "nursery", 1)}`);
						if (reservedNursery > 0) {
							r += ` | ${App.UI.passageLink("Keep one less child", "Nursery", `${WombCleanGenericReserve(slave, "nursery", 1)}`)}`;
						}
						if (reservedNursery > 1) {
							r += ` | ${App.UI.passageLink(`Keep none of ${his} children`, "Nursery", `${WombCleanGenericReserve(slave, "nursery", 9999)}`)}`;
						}
						if (reservedChildrenNursery + WL - reservedNursery <= freeCribs) {
							r += ` | ${App.UI.passageLink(`Keep the rest of ${his} children`, "Nursery", `${WombAddToGenericReserve(slave, "nursery", 9999)}`)}`;
						}
					} else if (reservedNursery === WL || reservedChildrenNursery === freeCribs || reservedIncubator + reservedNursery === WL) {
						r += `<br>&nbsp;&nbsp;&nbsp;&nbsp;`;
						r += App.UI.passageLink("Keep one less child", "Nursery", `${WombCleanGenericReserve(slave, "nursery", 1)}`);
						if (reservedNursery > 1) {
							r += ` | ${App.UI.passageLink(`Keep none of ${his} children`, "Nursery", `${WombCleanGenericReserve(slave, "nursery", 9999)}`)}`;
						}
					}
				} else if (reservedChildrenNursery < freeCribs && freeCribs > WL) {
					if (WL - reservedIncubator === 0) {
						r += `<i>${His} children are already reserved for ${V.incubator.name}</i>`;
						r += `<br>&nbsp;&nbsp;&nbsp;&nbsp;`;
						r += App.UI.passageLink(`Keep ${his} child${WL > 1 ? `ren` : ``} here instead`, "Nursery", `${WombAddToGenericReserve(slave, "nursery", 1)}`);
					} else {
						r += `You have ${freeCribs === 1 ? `an ` : ``}<span class="lime">available room${freeCribs > 1 ? `s` : ``}.</span> `;
						r += `<br>&nbsp;&nbsp;&nbsp;&nbsp;`;
						r += App.UI.passageLink(`Keep ${WL > 1 ? `a` : `the`} child`, "Nursery", `${WombAddToGenericReserve(slave, "nursery", 1)}`);
						if (WL > 1 && (reservedChildrenNursery + WL - reservedNursery <= freeCribs)) {
							r += ` | ${App.UI.passageLink(`Keep all of ${his} children`, "Nursery", `${WombAddToGenericReserve(slave, "nursery", 9999)}`)}`;
						}
					}
				} else if (reservedChildrenNursery === freeCribs) {
					r += `<br>&nbsp;&nbsp;&nbsp;&nbsp;`;
					r += `You have <span class="red">no room for ${his} offspring.</span> `;
				}

				eligibility = 1;
				r += `</div>`;
			}
		}
	}

	r += `</div>`;

	$('div#ql-nursery').ready(byPreviousSort);

	if (!eligibility) {
		r += `<br>`;
		r += `<i>You have no pregnant slave bearing eligible children</i>`;
	}

	if (PC.pregKnown && (!FutureSocieties.isActive('FSRestart', arcology) || V.eugenicsFullControl || (PC.pregSource !== -1 && PC.pregSource !== -6))) {
		const WL = PC.womb.length;

		let reservedIncubator = WombReserveCount(PC, "incubator");
		let reservedNursery = WombReserveCount(PC, "nursery");

		r += `<br><b><span class="pink">You're pregnant</span></b> and going to have ${WL === 1 ? `a baby. ` : pregNumberName(WL, 1)} `;

		if (reservedNursery > 0) {
			nurseryHasReservedChildren = true;
			if (WL === 1) {
				r += `Your child will be placed in ${V.nurseryName}.`;
			} else if (reservedNursery < WL) {
				r += `${reservedNursery} of your children will be placed in ${V.nurseryName}.`;
			} else if (WL === 2) {
				r += `Both of your children will be placed in ${V.nurseryName}.`;
			} else {
				r += `All ${reservedNursery} of your children will be placed in ${V.nurseryName}.`;
			}

			if (reservedNursery < WL && reservedChildrenNursery < freeCribs && reservedNursery - reservedIncubator > 0) {
				r += `<br>&nbsp;&nbsp;&nbsp;&nbsp;`;
				r += App.UI.passageLink("Keep another child", "Nursery", `${reservedNursery += 1}, ${reservedChildrenNursery += 1}`);
				if (reservedNursery > 0) {
					r += ` | ${App.UI.passageLink("Keep one less child", "Nursery", `${reservedNursery -= 1}, ${reservedChildrenNursery -= 1}`)}`;
				}

				if (reservedNursery > 1) {
					r += ` | ${App.UI.passageLink("Keep none of your children", "Nursery", `${reservedChildrenNursery -= reservedNursery}, ${reservedChildrenNursery = 0}`)}`;
				}

				if (reservedChildrenNursery + WL - reservedNursery <= freeCribs) {
					r += ` | ${App.UI.passageLink("Keep the rest of your children", "Nursery", `${reservedChildrenNursery += (WL - reservedNursery)}, ${reservedNursery += (WL - reservedNursery)}`)}`;
				}
			} else if (reservedNursery === WL || reservedChildrenNursery === freeCribs || reservedNursery - reservedIncubator >= 0) {
				r += `<br>&nbsp;&nbsp;&nbsp;&nbsp;`;
				r += App.UI.passageLink("Keep one less child", "Nursery", `${reservedNursery -= 1}, ${reservedChildrenNursery -= 1}`);
				if (reservedNursery > 1) {
					r += App.UI.passageLink("Keep none of your children", "Nursery", `${reservedChildrenNursery -= reservedNursery}, ${reservedNursery = 0}`);
				}
			}
		} else if (reservedChildrenNursery < freeCribs) {
			if (WL - reservedIncubator === 0) {
				r += `<i>Your child${WL > 1 ? `ren are` : ` is`} already reserved for ${V.incubator.name}</i>`;
				r += App.UI.passageLink(`Keep your child${WL > 1 ? `ren` : ``} here instead`, "Nursery", `${reservedNursery += WL}, ${reservedIncubator = 0}`);
			} else {
				r += `You have ${freeCribs === 1 ? `an ` : ``}<span class="lime">available room${freeCribs > 1 ? `s` : ``}. `;
				r += `<br>&nbsp;&nbsp;&nbsp;&nbsp;`;
				r += App.UI.passageLink(`Keep ${WL > 1 ? `a` : `your`} child`, "Nursery", `${reservedNursery += 1}, ${reservedChildrenNursery += 1}`);
				if (WL > 1 && (reservedChildrenNursery + WL - reservedNursery <= freeCribs)) {
					r += ` | ${App.UI.passageLink("Keep all of your children", "Nursery", `${reservedChildrenNursery += WL}, ${reservedNursery += WL}`)}`;
				}
			}
		} else if (reservedChildrenNursery === freeCribs) {
			r += `<br>&nbsp;&nbsp;&nbsp;&nbsp;`;
			r += `You have <span class="red">no room for your offspring.</span> `;
		}
	}

	if (reservedChildrenNursery || nurseryHasReservedChildren) {
		r += `<br>`;
		r += App.UI.passageLink("Clear all reserved children", "Nursery", `${V.slaves.forEach((slave) => WombCleanGenericReserve(slave, "nursery", 9999))}, ${WombCleanGenericReserve(PC, "nursery", 9999)}`);
	}

	function byName() {
		let sortedNurseryPossibles = $('#ql-nursery div.possible').detach();
		sortedNurseryPossibles = sortDomObjects(sortedNurseryPossibles, 'data-name');
		$(sortedNurseryPossibles).appendTo($('#ql-nursery'));
	}

	function byReservedSpots() {
		let sortedNurseryPossibles = $('#ql-nursery div.possible').detach();
		sortedNurseryPossibles = sortDomObjects(sortedNurseryPossibles, 'data-reserved-spots');
		$(sortedNurseryPossibles).appendTo($('#ql-nursery'));
	}

	function byPregnancyWeek() {
		let sortedNurseryPossibles = $('#ql-nursery div.possible').detach();
		sortedNurseryPossibles = sortDomObjects(sortedNurseryPossibles, 'data-preg-week');
		$(sortedNurseryPossibles).appendTo($('#ql-nursery'));
	}

	function byPregnancyCount() {
		let sortedNurseryPossibles = $('#ql-nursery div.possible').detach();
		sortedNurseryPossibles = sortDomObjects(sortedNurseryPossibles, 'data-preg-count');
		$(sortedNurseryPossibles).appendTo($('#ql-nursery'));
	}

	function byPreviousSort() {
		let sort = V.sortNurseryList;
		if (sort !== 'unsorted') {
			if (sort === 'Name') {
				sortNurseryPossiblesByName();
			} else if (sort === 'Reserved Nursery Spots') {
				sortNurseryPossiblesByReservedSpots();
			} else if (sort === 'Pregnancy Week') {
				sortNurseryPossiblesByPregnancyWeek();
			} else if (sort === 'Number of Children') {
				sortNurseryPossiblesByPregnancyCount();
			}
		}
	}

	return r;
};
