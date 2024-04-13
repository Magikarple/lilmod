/*
This is a womb processor/simulator script. It takes care of calculation of belly sizes based on individual fetus sizes, with full support of broodmothers implant random turning on and off possibility. Also this can be expanded to store more parents data in each individual fetus in future.
Design limitations:
- Mother can't gestate children with different speeds at same time. All speed changes apply to all fetuses.
- Sizes of individual fetuses updated only on call of WombGetVolume - not every time as called WombProgress. This is for better overall code speed.
- For broodmothers we need actual "new ova release" code now. But it's possible to control how many children will be added each time, and so - how much children is ready to birth each time.

Usage from SugarCube code (samples):

WombInit(V.slave) - before first pregnancy, at slave creation, of as backward compatibility update.

WombImpregnate(V.slave, V.fetus_count, V.fatherID, V.initial_age) - should be added after normal impregnation code, with already calculated fetus count. ID of father - can be used in future for processing children from different fathers in one pregnancy. Initial age normally 1 (as .preg normally set to 1), but can be raised if needed. Also should be called at time as broodmother implant add another fetus(es), or if new fetuses added from other sources in future (transplanting maybe?)

WombProgress(V.slave, V.time_to_add_to_fetuses, V.real_time_to_add_to_fetuses) - after code that update V.slave.preg, time to add should be the same.

V.isReady = WombBirthReady(V.slave, V.birth_ready_age) - how many children ready to be birthed if their time to be ready is V.birth_ready_age (40 is for normal length pregnancy). Return int - count of ready to birth children, or 0 if no ready exists.

WombFlush(V.slave) - clean womb (array). Can be used at broodmother birthstorm or abortion situations in game. But birthstorm logically should use WombBirth(V.slave, 35) or so before - some children in this event is live capable, others is not.

V.slave.bellyPreg = WombGetVolume(V.slave) - return double, with current womb volume in CC - for updating V.slave.bellyPreg, or if need to update individual fetuses sizes.

*/

/**
 * Init womb system.
 * @param {FC.HumanState} actor
 */
globalThis.WombInit = function(actor) {
	let i;

	if (!Array.isArray(actor.womb)) {
		// alert("creating new womb"); // debugging
		actor.womb = [];
	}

	// console.log("broodmother:" + typeof actor.broodmother);

	if (typeof actor.broodmother !== "number") {
		actor.broodmother = 0;
		actor.broodmotherFetuses = 0;
	}

	if (typeof actor.readyOva !== "number") {
		actor.readyOva = 0;
	}

	if (actor.pregData === undefined) {
		actor.pregData = clone(App.Data.misc.pregData.human);
		// Setup should be through deep copy, so in future, if we like, these values can be changed individually. Gameplay expansion possibilities. But for dev time to simplify debugging:
		// actor.pregData = App.Data.misc.pregData.human; // any changes in App.Data.misc pregData template will be applied immediately to all. But can't be made separate changes.
	}

	if (typeof actor.eggType !== 'string') {
		actor.eggType = "human";
	}

	// backward compatibility setup. Fully accurate for normal pregnancy only.
	if (actor.womb.length > 0 && actor.womb[0].genetics === undefined) {
		i = 0;
		actor.womb.forEach(function(fetus) {
			if (typeof fetus.reserve !== 'string') {
				fetus.reserve = "";
			}
			if (typeof fetus.motherID !== 'number') { // setting missing biological mother ID for fetus.
				fetus.motherID = actor.ID;
			}
			if (fetus.ID === undefined) {
				fetus.ID = generateNewID();
			}
			if (typeof fetus.realAge !== 'number') { // setting missing chronological age
				fetus.realAge = fetus.age;
			}

			fetus.genetics = generateGenetics(actor, actor.pregSource, i);
			i++;
		});
	} else if (actor.womb.length === 0 && actor.pregType > 0 && actor.broodmother === 0) {
		WombImpregnate(actor, actor.pregType, actor.pregSource, actor.preg);
	} else if (actor.womb.length === 0 && actor.pregType > 0 && actor.broodmother > 0 && actor.broodmotherOnHold < 1) {
		// sorry but for already present broodmothers it's impossible to calculate fully, approximation used.
		let pregWeek = actor.preg;
		if (pregWeek > actor.pregData.normalBirth) { pregWeek = actor.pregData.normalBirth; } // to avoid disaster.
		const bCount = Math.floor(actor.pregType / pregWeek);
		const bLeft = actor.pregType - (bCount * pregWeek);
		if (pregWeek > actor.pregType) {
			pregWeek = actor.pregType; // low children count broodmothers not supported here. It's emergency/backward compatibility code, and they not in game anyway. So minimum is 1 fetus in week.
			actor.preg = pregWeek; // fixing initial pregnancy week.
		}
		for (i = 0; i < pregWeek; i++) {
			WombImpregnate(actor, bCount, actor.pregSource, i); // setting fetuses for every week, up to 40 week at max.
		}

		if (bLeft > 0) {
			WombImpregnate(actor, bLeft, actor.pregSource, i + 1); // setting up leftover of fetuses.
		}
	}

	actor.womb.forEach(fetus => {
		if (!jsDef(fetus.genetics.inbreedingCoeff)) {
			fetus.genetics.inbreedingCoeff = ibc.coeff(
				{ID: null, mother: fetus.genetics.mother, father: fetus.genetics.father}
			);
		}
		if (!jsDef(fetus.genetics.artSeed)) {
			// probably could detect and fix clones/twins here too, but I'm not bothering
			fetus.genetics.artSeed = jsRandom(0, 10 ** 14);
		}
		if (!jsDef(fetus.genetics.adultHeight)) {
			fetus.genetics.adultHeight = Height.randomAdult({
				nationality: fetus.genetics.nationality, race: fetus.genetics.race, genes: fetus.genetics.gender, physicalAge: 20, birthWeek: 0
			});
		}
		if (!jsDef(fetus.genetics.boobPotential)) {
			fetus.genetics.boobPotential = adjustBreastSize(fetus.genetics);
		}
	});
};

App.Entity.Fetus = class {
	/** Construct a new fetus
	 * @param {number} age - initial age, after conception, in weeks
	 * @param {number} fatherID
	 * @param {FC.HumanState} mother
	 */
	constructor(age, fatherID, mother) {
		/** Unique identifier for this fetus */
		this.ID = generateNewID();
		/** Week since conception */
		this.age = age;
		/** Week in mother (age since implantation) */
		this.realAge = 1;
		this.fatherID = fatherID;
		this.volume = 1;
		/** @type {(""|"incubator"|"nursery")} */
		this.reserve = "";
		// used by App.Events.PregnancyNotice.Event
		this.noticeData = {
			/** @type {("undecided"|"nothing"|"terminate"|"transplant"|"incubator"|"nursery"|"wait")} */
			fate: "undecided",
			/** If true then the fetus' cheat menu accordion is collapsed */
			cheatAccordionCollapsed: true,
			/** @type {App.Entity.SlaveState} This is used by the descriptors and is used by generateChild() when the slave is born */
			child: undefined,
		};
		/** All identical multiples share the same twinID */
		this.twinID = "";
		this.motherID = mother.ID;
		const childNumber = ordinalSuffix(mother.counter.birthsTotal + mother.womb.length + 1);
		const name = `${SlaveFullName(mother)}'s ${childNumber} child`;
		this.genetics = generateGenetics(mother, fatherID, name);
	}
};

/**
 * @param {FC.HumanState} actor
 * @param {number} fCount
 * @param {number} fatherID
 * @param {number} age
 * @param {FC.HumanState} [surrogate] genetic mother
 */
globalThis.WombImpregnate = function(actor, fCount, fatherID, age, surrogate) {
	for (let i = 0; i < fCount; i++) {
		const tf = new App.Entity.Fetus(age, fatherID, surrogate || actor);
		try {
			if (actor.womb.length === 0) {
				actor.pregWeek = age;
				actor.preg = age;
			}
			actor.womb.push(tf);
		} catch (err) {
			WombInit(actor);
			actor.womb.push(tf);
			alert("WombImpregnate warning - " + actor.slaveName + " " + err);
		}
	}
	MissingParentIDCorrection(actor);
	WombUpdatePregVars(actor);
};

/**
 * @param {FC.HumanState} actor (surrogate mother)
 * @param {number} fCount
 * @param {FC.HumanState} mother (genetic mother)
 * @param {number} fatherID
 * @param {number} age
 */
globalThis.WombSurrogate = function(actor, fCount, mother, fatherID, age) {
	WombImpregnate(actor, fCount, fatherID, age, mother);
};

/**
 * @param {FC.HumanState} actor (surrogate mother)
 * @param {number} fCount
 * @param {FC.HumanState} mother (genetic parent being cloned)
 * @param {number} age
 */
globalThis.WombImpregnateClone = function(actor, fCount, mother, age) {
	setMissingParents(mother);
	const motherOriginal = V.genePool.find(s => s.ID === mother.ID) || mother;

	for (let i = 0; i < fCount; i++) {
		const tf = new App.Entity.Fetus(age, mother.ID, mother);

		// gene corrections
		tf.fatherID = -7;
		tf.genetics.gender = mother.genes;
		tf.genetics.mother = mother.mother;
		tf.genetics.father = mother.father;
		tf.genetics.motherName = mother.slaveName;
		tf.genetics.fatherName = mother.slaveName;
		tf.genetics.cloneID = mother.ID;
		if (mother.ID === -1) {
			tf.genetics.clone = PlayerName();
		} else {
			tf.genetics.clone = SlaveFullName(asSlave(mother));
		}
		tf.genetics.inbreedingCoeff = mother.inbreedingCoeff;
		tf.genetics.intelligence = motherOriginal.intelligence;
		tf.genetics.face = motherOriginal.face;
		tf.genetics.faceShape = motherOriginal.faceShape;
		tf.genetics.geneticQuirks = clone(mother.geneticQuirks);
		tf.genetics.skin = motherOriginal.skin;
		tf.genetics.artSeed = mother.natural.artSeed;

		try {
			if (actor.womb.length === 0) {
				actor.pregWeek = age;
				actor.preg = age;
				actor.pregSource = -7;
			}
			actor.womb.push(tf);
		} catch (err) {
			WombInit(actor);
			actor.womb.push(tf);
			alert("WombImpregnate warning - " + actor.slaveName + " " + err);
		}
	}
	WombUpdatePregVars(actor);
};

/**
 * Should be used to set biological age for fetus (ageToAdd), AND chronological (realAgeToAdd).
 * Speed up or slow down gestation drugs should affect ONLY biological.
 * @param {FC.HumanState} actor
 * @param {number} ageToAdd
 * @param {number} realAgeToAdd
 */
globalThis.WombProgress = function(actor, ageToAdd, realAgeToAdd = ageToAdd) {
	ageToAdd = Math.ceil(ageToAdd * 10) / 10;
	realAgeToAdd = Math.ceil(realAgeToAdd * 10) / 10;
	try {
		actor.womb.forEach(ft => {
			ft.age += ageToAdd;
			ft.realAge += realAgeToAdd;
		});
	} catch (err) {
		WombInit(actor);
		alert("WombProgress warning - " + actor.slaveName + " " + err);
	}
};

globalThis.WombBirth = function(actor, readyAge) {
	try {
		WombSort(actor); // For normal processing fetuses that more old should be first. Now - they are.
	} catch (err) {
		WombInit(actor);
		alert("WombBirth warning - " + actor.slaveName + " " + err);
	}

	let birthed = [];
	let ready = WombBirthReady(actor, readyAge);
	let i;

	for (i = 0; i < ready; i++) { // here can't be used "for .. in .." syntax.
		birthed.push(actor.womb.shift());
	}

	return birthed;
};

globalThis.WombFlush = function(actor) {
	actor.womb = [];
	WombUpdatePregVars(actor);
};

globalThis.WombBirthReady = function(actor, readyAge) {
	let readyCnt = 0;
	try {
		readyCnt += actor.womb.filter(ft => ft.age >= readyAge).length;
	} catch (err) {
		WombInit(actor);
		alert("WombBirthReady warning - " + actor.slaveName + " " + err);
		return 0;
	}

	return readyCnt;
};

/**
 * @param {FC.PregnancyData} pregData
 * @param {number} age
 */
globalThis.PregDataAtAge = function(pregData, age) {
	let i = 0;
	while (pregData.fetusWeek[i + 1] < age && i < pregData.fetusWeek.length - 1) {
		i++;
	}

	const min = pregData.fetusSize[i];
	const max = pregData.fetusSize[i + 1];
	const ageMin = pregData.fetusWeek[i];
	const ageMax = pregData.fetusWeek[i + 1];
	const rateMin = pregData.fetusRate[i];
	const rateMax = pregData.fetusRate[i + 1];

	const cAge = age - ageMin;

	const one = (max - min) / (ageMax - ageMin);
	const rateOne = (rateMax - rateMin) / (ageMax - ageMin);

	const rate = rateMin + (rateOne * cAge);
	const size = min + (one * cAge);
	// console.log("min:"+min+" max:"+max+" ageMin:"+ageMin+" ageMax:"+ageMax+" one:"+one+" rateOne:"+rateOne+" cAge:"+cAge+" rate:"+rate+" cSize:"+cSize+" final size:"+cSize*rate);

	return {rate, size};
};

/** @param {FC.HumanState} actor */
globalThis.WombGetVolume = function(actor) {
	let cache = {age: -1, size: -1, rate: -1};
	let vol = 0;

	if (actor.pregData.sizeType === 0) {
		vol = getVolByLen();
	} else if (actor.pregData.sizeType === 1) {
		vol = getVolByWeight();
	} else if (actor.pregData.sizeType === 2) {
		vol = getVolByRaw();
	}

	// must be positive
	return vol >= 0 ? vol : 0;

	/** @param {number} age */
	function getCurData(age) {
		if (age !== cache.age) {
			const {size, rate} = PregDataAtAge(actor.pregData, age);
			// the next baby in this litter will probably want exactly the same data, don't calculate it again
			cache = {age, size, rate};
		}

		return cache;
	}

	function getVolByLen() {
		const phi = 1.618;
		let wombSize = 0;
		actor.womb.forEach(ft => {
			/* legacy block for debug only
			let gestationWeek = ft.age;
			let oldLen;
			let oldVol;
			if (gestationWeek <= 32) {
				oldLen = (0.00006396 * Math.pow(gestationWeek, 4)) -
					(0.005501 * Math.pow(gestationWeek, 3)) +
					(0.161 * Math.pow(gestationWeek, 2)) -
					(0.76 * gestationWeek) +
					0.208;
			} else if (gestationWeek <= 106) {
				oldLen = (-0.0000004675 * Math.pow(gestationWeek, 4)) +
					(0.0001905 * Math.pow(gestationWeek, 3)) -
					(0.029 * Math.pow(gestationWeek, 2)) +
					(2.132 * gestationWeek) -
					16.575;
			} else {
				oldLen = (-0.00003266 * Math.pow(gestationWeek,2)) +
					(0.076 * gestationWeek) +
					43.843;
			}
			*/

			const targetData = getCurData(ft.age);
			const len = targetData.size * targetData.rate;

			ft.volume = ((4 / 3) * (Math.PI) * (phi / 2) * (Math.pow((len / 2), 3)));
			wombSize += ft.genetics.geneticQuirks.polyhydramnios === 2 ? ft.volume * 2 : ft.volume;

			// oldVol = ((4 / 3) * (Math.PI) * (phi / 2) * (Math.pow((oldLen / 2), 3))); // for debug

			// console.log("fetus.age:" + ft.age + " oldLen:"+oldLen+" len:"+len+" ft.volume:"+ft.volume+ " old volume:"+oldVol );
			/*
				I found, that previous targetLen calculation not exactly accurate if compared to the actual medical data chart for fetal length. It's been rough approximation based only on pregnancy week (giving smaller fetus size then it should in most cases). So I need all this debug code to compare data and verify calculations. After final tweaking I will remove or comment out legacy code. Please not touch this before it.
				Pregmodfan.
			*/
		});
		return wombSize;
	}

	function getVolByWeight() {
		let wombSize = 0;

		actor.womb.forEach(ft => {
			const targetData = getCurData(ft.age);
			ft.volume = targetData.size * targetData.rate;
			wombSize += ft.genetics.geneticQuirks.polyhydramnios === 2 ? ft.volume * 2 : ft.volume;
		});
		return wombSize;
	}

	function getVolByRaw() {
		let wombSize = 0;

		actor.womb.forEach(ft => {
			const targetData = getCurData(ft.age);
			ft.volume = targetData.size;
			wombSize += ft.genetics.geneticQuirks.polyhydramnios === 2 ? ft.volume * 2 : ft.volume;
		});
		return wombSize;
	}
};

/**
 * @param {FC.HumanState} actor
 * @param {number} age
 */
globalThis.FetusGetPrediction = function(actor, age) {
	const targetData = PregDataAtAge(actor.pregData, age);
	let vol = 0.1;

	if (actor.pregData.sizeType === 0) {
		vol = getVolByLen();
	} else if (actor.pregData.sizeType === 1) {
		vol = getVolByWeight();
	} else if (actor.pregData.sizeType === 2) {
		vol = getVolByRaw();
	}

	return vol >= 0.1 ? vol : 0.1;

	function getVolByLen() {
		const phi = 1.618;
		const targetLen = targetData.size * targetData.rate;
		const volume = ((4 / 3) * (Math.PI) * (phi / 2) * (Math.pow((targetLen / 2), 3)));
		/*
		if (targetData.genetics.geneticQuirks.polyhydramnios === 2) {
			volume *= 2;
		}
		*/

		return volume;
	}

	function getVolByWeight() {
		const volume = targetData.size * targetData.rate;
		/*
		if (targetData.genetics.geneticQuirks.polyhydramnios === 2) {
			volume *= 2;
		}
		*/

		return volume;
	}

	function getVolByRaw() {
		const volume = targetData.size;
		/*
		if (targetData.genetics.geneticQuirks.polyhydramnios === 2) {
			volume *= 2;
		}
		*/

		return volume;
	}
};

globalThis.WombUpdatePregVars = function(actor) {
	WombSort(actor);
	if (actor.womb.length > 0) {
		if (actor.preg > 0 && actor.womb[0].age > 0) {
			actor.preg = actor.womb[0].age;
		}
		actor.pregType = actor.womb.length;
		actor.bellyPreg = WombGetVolume(actor);

		if (actor.womb[0].age >= 10 && actor.pregKnown === 0) {
			actor.pregKnown = 1;
		}
	} else {
		actor.pregType = 0;
		WombNormalizePreg(actor);
	}
};

globalThis.WombMinPreg = function(actor) {
	WombSort(actor);
	if (actor.womb.length > 0) {
		return actor.womb[actor.womb.length - 1].age;
	} else {
		return 0;
	}
};

globalThis.WombMaxPreg = function(actor) {
	WombSort(actor);
	if (actor.womb.length > 0) {
		return actor.womb[0].age;
	} else {
		return 0;
	}
};

/**
 * @param {FC.HumanState} mother
 */
globalThis.WombNormalizePreg = function(mother) {
	WombInit(mother);

	// this is broodmother on hold.
	if (mother.womb.length === 0 && mother.broodmother >= 1) {
		mother.pregType = 0;
		mother.pregKnown = 0;

		// to avoid legacy code conflicts - broodmother on hold
		// can't be impregnated, but she is not on normal contraceptives.
		// So we set this for special case.
		if (mother.preg >= 0) {
			mother.preg = 0.1;
		}

		if (mother.pregSource !== 0) {
			mother.pregSource = 0;
		}

		if (mother.pregWeek > 0) {
			mother.pregWeek = 0;
		}

		mother.broodmotherCountDown = 0;
	}

	if (mother.womb.length > 0) {
		let max = WombMaxPreg(mother);
		// console.log("max: " + max);
		// console.log(".preg: "+ actor.preg);
		if (mother.pregWeek < 1) {
			mother.pregWeek = 1;
		}

		if (max < mother.preg) {
			WombProgress(mother, mother.preg - max, mother.preg - max);
			// console.log("progress in womb");
		} else if (max > mother.preg) {
			mother.preg = max;
			// console.log("advancing .preg");
		}

		if (mother.womb[0].age >= 10 && mother.pregKnown === 0) {
			mother.pregKnown = 1;
		}

		mother.pregType = mother.womb.length;
		mother.pregSource = mother.womb[0].fatherID;
	} else if (mother.womb.length === 0 && mother.broodmother < 1) {
		// not broodmother
		// console.log("preg fixing");
		mother.pregType = 0;
		mother.pregKnown = 0;

		if (mother.preg > 0) {
			mother.preg = 0;
		}

		if (mother.pregSource !== 0) {
			mother.pregSource = 0;
		}

		// We can't properly set postpartum here,
		// but can normalize obvious error with forgotten property.
		if (mother.pregWeek > 0) {
			mother.pregWeek = 0;
		}
	}
	mother.bellyPreg = WombGetVolume(mother);
};

globalThis.WombChangeID = function(actor, fromID, toID) {
	WombInit(actor);
	for (const ft of actor.womb) {
		if (ft.fatherID === fromID) {
			ft.fatherID = toID;
		}
		if (ft.genetics.father === fromID) {
			ft.genetics.father = toID;
		}
		if (ft.genetics.mother === fromID) {
			ft.genetics.mother = toID;
		}
	}
	WombNormalizePreg(actor);
};

globalThis.WombForceFatherID = function(actor, ID) {
	WombInit(actor);
	for (const ft of actor.womb) {
		ft.fatherID = ID;
		ft.genetics.father = ID;
	}
	WombNormalizePreg(actor);
};

/* Sorts the womb object by age with oldest and thus soonest to be born, first. This will be needed in the future once individual fertilization is a possibility.*/
globalThis.WombSort = function(actor) {
	actor.womb.sort((a, b) => {
		return b.age - a.age;
	});
};

/** Split fetuses into identical twins based on chance
 * @param {FC.HumanState} actor
 * @param {number} chance
 */
globalThis.fetalSplit = function(actor, chance) {
	for (const s of actor.womb) {
		if (jsRandom(1, chance) >= chance || (actor.geneticQuirks.twinning === 2 && (actor.womb.length < Math.floor(actor.pregAdaptation / 32) || actor.womb.length === 1) && (s.twinID === "" || s.twinID === undefined))) {
			let twinsAlreadyExist = (s.twinID !== undefined && s.twinID !== "");
			// if this fetus is not already an identical, generate a new twin ID before cloning it
			if (!twinsAlreadyExist) {
				s.twinID = generateNewID();
			}

			// clone the fetus with a new fetus ID
			const nft = clone(s);
			nft.ID = generateNewID();
			nft.reserve = ""; // new fetus does not inherit reserve status

			// add cloned fetus to the womb
			actor.womb.push(nft);

			// rename twinned fetuses to be `${fetus.name} (twin ${letter})`
			if (twinsAlreadyExist) {
				let count = actor.womb.filter((fetus) => (fetus.twinID === s.twinID)).length;
				// check if original twin has lettering
				if (s.genetics.name.match(/ \(twin [A-Z]\)$/) === null) {
					// if they don't then add it
					s.genetics.name = `${s.genetics.name} (twin ${getLetterFromNumber(count -1, false)})`;
				}
				// rename new twin
				nft.genetics.name = `${nft.genetics.name.replace(/ \(twin [A-Z]\)$/, "")} (twin ${getLetterFromNumber(count, false)})`;
			} else {
				actor.womb
					.filter((fetus) => (fetus.twinID === s.twinID))
					.forEach((fetus, index) => {
						fetus.genetics.name = `${fetus.genetics.name} (twin ${getLetterFromNumber(index)})`;
					});
			}
		}
	}
	WombNormalizePreg(actor);

	/**
	 * Returns the letter of the alphabet that matches the number
	 * with startingAtZero = false: 1 = A, 26 = Z, etc
	 * with startingAtZero = true: 0 = A, 25 = Z, etc
	 * // Going over the amount of letters in the alphabet will throw an error
	 * @param {number} number
	 * @param {boolean} startingAtZero
	 * @returns {string}
	 */
	function getLetterFromNumber(number, startingAtZero = true) {
		// TODO:@franklygeorge move this to somewhere in the global space
		if (startingAtZero === false) {
			number -= 1;
		}
		if (number >= 26) {
			throw new Error(`Number cannot be greater than ${startingAtZero ? "25": "26"}`);
		} else if (number < 0) {
			throw new Error(`Number cannot be less than ${startingAtZero ? "0": "1"}`);
		}
		return (number + 10).toString(36).toUpperCase();
	}
};

// safe alternative to .womb.length.
globalThis.WombFetusCount = function(actor) {
	WombInit(actor);
	return actor.womb.length;
};

// give reference to fetus object, but not remove fetus, use for manipulation in the womb.
globalThis.WombGetFetus = function(actor, fetusNum) {
	WombInit(actor);
	if (actor.womb.length >= fetusNum) {
		return actor.womb[fetusNum];
	} else {
		return null;
	}
};

/**
 * give reference to fetus object, and remove it from the womb.
 * @param {FC.HumanState} mother
 * @param {number} fetusIndex the index number of the fetus
 * @returns {App.Entity.Fetus|null}
 */
globalThis.WombRemoveFetus = function(mother, fetusIndex) {
	WombInit(mother);
	if (mother.womb.length - 1 >= fetusIndex) {
		let fetus = mother.womb[fetusIndex];
		mother.womb.splice(fetusIndex, 1);
		WombUpdatePregVars(mother);
		return fetus;
	} else {
		return null;
	}
};

/* to add fetus object in the womb. Be warned - you can add one single fetus to many wombs, or even add it many times to one womb. It will not show error, but behavior becomes strange, as fetus object will be the same - it's reference, not full copies. If this is not desired - use clone() on fetus before adding.*/
globalThis.WombAddFetus = function(actor, fetus) {
	WombInit(actor);
	actor.womb.push(fetus);
	WombSort(actor);
};

// change property for all fetuses. Like fetus.age = X.
globalThis.WombChangeFetus = function(actor, propName, newValue) {
	WombInit(actor);
	actor.womb.forEach(ft => ft[propName] = newValue);
};

// change genetic property of all fetuses. Like fetus.genetic.intelligence = X
globalThis.WombChangeGene = function(actor, geneName, newValue) {
	WombInit(actor);
	actor.womb.forEach(ft => ft.genetics[geneName] = newValue);
};

/**
 * Returns a list of twins that this fetus has or null if the fetus has no twins
 * @param {App.Entity.Fetus} fetus
 * @returns {App.Entity.Fetus[]|null}
 */
globalThis.getFetusTwins = function(fetus) {
	if (fetus.twinID && fetus.twinID !== "") {
		return getSlave(fetus.motherID).womb.filter((tFetus) => (tFetus.twinID === fetus.twinID && tFetus !== fetus));
	}
	return null;
};

// change genetic property of all fetuses based on race
globalThis.WombFatherRace = function(actor, raceName) {
	let skinColor = randomRaceSkin(raceName);
	let eyeColor = randomRaceEye(raceName);
	let hairColor = randomRaceHair(raceName);
	WombChangeGene(actor, "race", raceName);
	WombChangeGene(actor, "skin", skinColor);
	WombChangeGene(actor, "eyeColor", eyeColor);
	WombChangeGene(actor, "hColor", hairColor);
};

// replaces untraceable fatherIDs with missingParentID. Required for concurrent pregnancy to differentiate between siblings.
globalThis.MissingParentIDCorrection = function(actor) {
	WombInit(actor);
	actor.womb
		.filter(ft => !specificCharacterID(ft.genetics.father))
		.forEach(ft => ft.genetics.father = V.missingParentID);
	V.missingParentID--;
};

globalThis.WombCleanYYFetuses = function(actor) {
	let reserved = [];

	let i = actor.womb.length - 1;
	let ft;

	while (i >= 0) {
		ft = actor.womb[i];

		if (ft.genetics.gender === "YY") {
			reserved.push(ft);
			actor.womb.splice(i, 1);
		}

		i--;
	}
	WombUpdatePregVars(actor);

	return reserved;
};

/**
 * Returns the amount of fetuses currently destined (reserved) for the given location
 * @param {"incubator"|"nursery"} reserveType
 * @returns {number}
 */
globalThis.FetusGlobalReserveCount = function(reserveType) {
	let cnt = 0;

	if (typeof reserveType !== 'string') {
		return 0;
	}

	V.slaves.forEach(function(slave) {
		slave.womb.forEach(function(ft) {
			if (ft.reserve === reserveType) {
				cnt++;
			}
		});
	});

	V.PC.womb.forEach(function(ft) {
		if (ft.reserve === reserveType) {
			cnt++;
		}
	});

	return cnt;
};

globalThis.WombSetGenericReserve = function(actor, type, count) {
	// console.log ("actor: " + actor + " type: " + type + " typeof: " + typeof type + " count: " + count);
	actor.womb.forEach(function(ft) {
		// console.log (" type: " + ft.reserve + " typeof: " + typeof ft.reserve);
		if ((ft.reserve === "" || ft.reserve === type) && count > 0) {
			// console.log ("!trigger");
			ft.reserve = type;
			if (type !== "incubator") {
				delete ft.tankSetting;
			}
			count--;
		}
	});
};

globalThis.WombAddToGenericReserve = function(actor, type, count) {
	WombSetGenericReserve(actor, type, (WombReserveCount(actor, type) + count));
};

globalThis.WombChangeReserveType = function(actor, oldType, newType) {
	let count = 0;

	actor.womb.forEach(function(ft) {
		if (ft.reserve === oldType) {
			ft.reserve = newType;
			if (newType !== "incubator") {
				delete ft.tankSetting;
			}
			count++;
		}
	});

	return count;
};

globalThis.WombCleanGenericReserve = function(actor, type, count) {
	actor.womb.forEach(function(ft) {
		if (ft.reserve === type && count > 0) {
			ft.reserve = "";
			delete ft.tankSetting;
			count--;
		}
	});
};

globalThis.WombReserveCount = function(actor, type) {
	let cnt = 0;

	actor.womb.forEach(function(ft) {
		if (ft.reserve === type) /* the lazy equality will catch "" case */ {
			cnt++;
		}
	});

	return cnt;
};

globalThis.WombGetReservedFetuses = function(actor, type) {
	let reserved = [];

	actor.womb.forEach(function(ft) {
		if (ft.reserve === type) {
			reserved.push(ft);
		}
	});

	return reserved;
};

globalThis.WombRemoveReservedFetuses = function(actor, type) {
	let reserved = [];

	let i = actor.womb.length - 1;
	let ft;

	while (i >= 0) {
		ft = actor.womb[i];

		if (ft.reserve === type) {
			reserved.push(ft);
			actor.womb.splice(i, 1);
		}

		i--;
	}

	return reserved;
};

globalThis.WombCleanAllReserve = function(actor) {
	actor.womb.forEach(function(ft) {
		ft.reserve = "";
		delete ft.tankSetting;
	});
};

/** Return object with data about litters in actor womb. This data can be used for descriptions of pregnancy with complicated structure.
 * @param {FC.HumanState} actor
 * @returns {{litters: Array<number>, litterData: Array<Array<App.Entity.Fetus>>}}
 *
 * Return contents:
 * - data.litters.length = summary count of separate litters in the womb.
 * - data.litters[x] = age (.realAge) of litter "x".
 * - data.litterData[x].length = count of fetuses in "x" litter.
 * - data.litterData[x] = array with actual fetuses that belong to a litter "x". Can be used to check anything related to fetus. (This is not a copy, but a reference to actual fetuses, so be careful with changes).
 */
globalThis.WombGetLittersData = function(actor) {
	let unicLiters = []; // array with realAges of separate litters.
	let litterData = [];

	// we need to know how many litters here (Assuming that unique litters have similar .realAge). Also we will know their ages.
	for (const ft of actor.womb) {
		const age = Math.ceil(ft.realAge);
		if (!unicLiters.includes(age)) {
			unicLiters.push(age);
			litterData.push(actor.womb.filter(f2 => Math.ceil(f2.realAge) === age));
		}
	}

	return {litters: unicLiters, litterData: litterData};
};

/** simple function used for splitting actual size from total size due to polyhydramnios.
 * @param {FC.HumanState} actor
 * @returns {number}
 */
globalThis.WombGetFetalSizeSum = function(actor) {
	return actor.womb.reduce((acc, cur) => acc + cur.volume, 0);
};
