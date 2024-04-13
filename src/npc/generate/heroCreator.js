// cSpell:ignore Dextreme

/** creates an array from App.Data.HeroSlaves that will be similar to the old $heroSlaves.
 * @returns {Array}
 */
App.Utils.buildHeroArray = function() {
	let chunks = [];
	if (V.seeDicks < 100) { // dickless slaves
		chunks.push(App.Data.HeroSlaves.D);
		chunks.push(App.Data.HeroSlaves.DF);
		if (V.seeExtreme === 1) {
			chunks.push(App.Data.HeroSlaves.Dextreme);
			chunks.push(App.Data.HeroSlaves.DFextreme);
		}
	}
	if (V.seeDicks > 0) { // dicked slaves
		chunks.push(App.Data.HeroSlaves.DD);
		if (V.seeExtreme === 1) {
			chunks.push(App.Data.HeroSlaves.DDextreme);
		}
	}
	App.UI.DOM.renderPassage("custom Slaves Database"); // populate V.heroSlaves from user DB
	chunks.push(V.heroSlaves);
	let array = [].concat(...chunks);
	delete V.heroSlaves;

	/** @type {function(App.Entity.SlaveState):boolean} */
	const disallowedPregnantSlave = (s) => (V.seePreg !== 1 && s.preg > 0);
	/** @type {function(App.Entity.SlaveState):boolean} */
	const underAgedSlave = (s) => (s.actualAge < V.minimumSlaveAge);
	array.deleteWith((s) => V.heroSlavesPurchased.includes(s.ID) || disallowedPregnantSlave(s) || underAgedSlave(s));

	const collator = new Intl.Collator('en', {usage: "sort", ignorePunctuation: true});
	return array.sort((a, b) => collator.compare(a.slaveName, b.slaveName));
};

/**
 * @param {App.Entity.SlaveState} heroSlave
 * @returns {App.Entity.SlaveState}
 */
App.Utils.getHeroSlave = function(heroSlave) {
	function repairLimbs(slave) {
		if (slave.hasOwnProperty("removedLimbs")) {
			if (slave.removedLimbs[0] === 1) {
				removeLimbs(slave, "left arm");
			}
			if (slave.removedLimbs[1] === 1) {
				removeLimbs(slave, "right arm");
			}
			if (slave.removedLimbs[2] === 1) {
				removeLimbs(slave, "left leg");
			}
			if (slave.removedLimbs[3] === 1) {
				removeLimbs(slave, "right leg");
			}
			delete slave.removedLimbs;
		}
	}

	if (!heroSlave.hasOwnProperty("birthWeek")) {
		heroSlave.birthWeek = random(0, 51);
	}
	// Nationalities, races, surnames random fill
	if (!heroSlave.nationality) {
		// Check for a pre-set race and if the nationality fits, else regenerate
		if (heroSlave.race && App.Data.misc.filterRaces.has(heroSlave.race)) {
			raceToNationality(heroSlave);
		} else {
			heroSlave.nationality = hashChoice(V.nationalities);
		}
	}
	if (!heroSlave.race || !App.Data.misc.filterRaces.has(heroSlave.race)) {
		nationalityToRace(heroSlave);
	}
	if (!heroSlave.birthSurname && heroSlave.birthSurname !== "") {
		heroSlave.birthSurname = (App.Data.misc.surnamePoolSelector[heroSlave.nationality + "." + heroSlave.race] ||
			App.Data.misc.surnamePoolSelector[heroSlave.nationality] ||
			App.Data.misc.whiteAmericanSlaveSurnames).random();
	}
	if (!heroSlave.birthName && heroSlave.birthName !== "") {
		heroSlave.birthName = (App.Data.misc.namePoolSelector[heroSlave.nationality + "." + heroSlave.race] ||
			App.Data.misc.namePoolSelector[heroSlave.nationality] ||
			App.Data.misc.whiteAmericanSlaveNames).random();
	}
	if (heroSlave.slaveName === -1) {
		heroSlave.slaveName = heroSlave.birthName;
	}
	if (heroSlave.slaveSurname === -1) {
		heroSlave.slaveSurname = heroSlave.birthSurname;
	}
	generatePronouns(heroSlave);
	heroSlave.geneMods = Object.assign({
		NCS: 0, rapidCellGrowth: 0, immortality: 0, flavoring: 0, aggressiveSperm: 0, livestock: 0, progenitor: 0
	}, heroSlave.geneMods);

	// WombInit(heroSlave);
	const newSlave = BaseSlave();
	deepAssign(newSlave, heroSlave);
	newSlave.ID = generateSlaveID();
	repairLimbs(newSlave);
	generatePuberty(newSlave);
	newSlave.weekAcquired = V.week;
	if (!heroSlave.pubicHColor) {
		newSlave.pubicHColor = newSlave.hColor;
	}
	if (!heroSlave.underArmHColor) {
		newSlave.underArmHColor = newSlave.hColor;
	}
	if (newSlave.override_Race !== 1) {
		newSlave.origRace = newSlave.race;
	}
	if (newSlave.override_Eye_Color !== 1) {
		resetEyeColor(newSlave, "both");
	}
	if (newSlave.override_H_Color !== 1) {
		newSlave.hColor = getGeneticHairColor(newSlave);
	}
	if (newSlave.override_Arm_H_Color !== 1) {
		newSlave.underArmHColor = getGeneticHairColor(newSlave);
	}
	if (newSlave.override_Pubic_H_Color !== 1) {
		newSlave.pubicHColor = getGeneticHairColor(newSlave);
	}
	if (newSlave.override_Brow_H_Color !== 1) {
		newSlave.eyebrowHColor = getGeneticHairColor(newSlave);
	}
	if (newSlave.override_Skin !== 1) {
		newSlave.skin = getGeneticSkinColor(newSlave);
	}
	if (!heroSlave.natural?.height) {
		// assumes adult - child hero slaves MUST specify natural height separately!
		newSlave.natural.height = newSlave.height - newSlave.heightImplant * 10;
	}
	if (!heroSlave.natural?.boobs) {
		// assumes a natural chest- child and male hero slaves, as well as those with unnatural busts, MUST specify natural size separately!
		newSlave.natural.boobs = newSlave.boobs;
	}
	if (!heroSlave.natural?.artSeed) {
		newSlave.natural.artSeed = jsRandom(0, 10 ** 14);
	}
	setHealth(newSlave, newSlave.health.condition, 0, 0, 0, newSlave.health.tired);

	SetBellySize(newSlave);

	let slave; 	// special slaves exceptions to keep siblings sensible
	if (newSlave.mother === -9999 && newSlave.father === -9998) { // The twins — Camille & Kennerly
		slave = V.slaves.find(s => areSisters(s, newSlave) > 0);
		if (slave) {
			newSlave.actualAge = slave.actualAge;
			newSlave.physicalAge = newSlave.actualAge;
			newSlave.visualAge = newSlave.actualAge;
			newSlave.ovaryAge = newSlave.actualAge;
			newSlave.birthWeek = slave.birthWeek;
		}
	}
	if (newSlave.mother === -9997 && newSlave.father === -9996) { // The siblings — Elisa & Martin
		slave = V.slaves.find(s => areSisters(s, newSlave) > 0);
		if (slave) {
			if (newSlave.birthName === "Elisa") {
				newSlave.actualAge = slave.actualAge - 1;
			} else if (newSlave.birthName === "Martin") {
				newSlave.actualAge = slave.actualAge + 1;
			}
			newSlave.physicalAge = newSlave.actualAge;
			newSlave.visualAge = newSlave.actualAge;
			newSlave.ovaryAge = newSlave.actualAge;
		}
	}
	if (newSlave.mother === -9995 && newSlave.father === -9994) { // The fruit siblings — Green & Purple Grape
		slave = V.slaves.find(s => areSisters(s, newSlave) > 0);
		if (slave) {
			if (newSlave.birthName === "Green Grape") {
				newSlave.actualAge = slave.actualAge - 5;
			} else if (newSlave.birthName === "Purple Grape") {
				newSlave.actualAge = slave.actualAge + 5;
			}
			newSlave.physicalAge = newSlave.actualAge;
			newSlave.visualAge = newSlave.actualAge;
			newSlave.ovaryAge = newSlave.actualAge;
		}
	}

	nationalityToAccent(newSlave);
	return newSlave;
};

/**
 * Marks limbs to be removed when going trough App.Utils.getHeroSlave.
 * Does not actually remove limbs, only use on slaves that go through App.Utils.getHeroSlave!!
 * @param {object} hero
 * @param {FC.LimbArgumentAll} [limb="all"]
 */
App.Utils.removeHeroLimbs = function(hero, limb = "all") {
	if (!hero.hasOwnProperty("removedLimbs")) {
		hero.removedLimbs = [0, 0, 0, 0];
	}

	switch (limb) {
		case "all":
			hero.removedLimbs = [1, 1, 1, 1];
			break;
		case "left arm":
			hero.removedLimbs[0] = 1;
			break;
		case "right arm":
			hero.removedLimbs[1] = 1;
			break;
		case "left leg":
			hero.removedLimbs[2] = 1;
			break;
		case "right leg":
			hero.removedLimbs[3] = 1;
			break;
	}
};
