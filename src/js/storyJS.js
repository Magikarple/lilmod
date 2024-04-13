// cSpell:ignore plet, novemcentu, octocentu, septemcentu, sexcentu, quincentu, quadricentu, tricentu, bicentu, centu
// cSpell:ignore nonagint, octogint, sexagint, vigint, nonu, octu, septu, sextu, quintu, quadru
// cSpell:ignore akth, ekth, ikth, okth, ukth, ykth
// cSpell:ignore intimidatee, intimidater

globalThis.peacekeepersCanBeEstablished = function() {
	return V.invasionVictory > 0 && App.Events.effectiveWeek() > 48;
};

/**
 * @param {number} x
 * @param {number} minValue
 * @param {number} maxValue
 * @param {number} [defaultValue=0]
 * @returns {number}
 */
globalThis.variableAsNumber = function(x, minValue, maxValue, defaultValue = 0) {
	x = Number(x);
	if (isNaN(x)) {
		return defaultValue;
	}
	if (x < minValue) { // Works even if minValue is undefined.
		return minValue;
	}
	if (x > maxValue) { // Works even if maxValue is undefined.
		return maxValue;
	}
	return x;
};

if (typeof interpolate === "undefined") {
	globalThis.interpolate = function(x0, y0, x1, y1, x) {
		if (x <= x0) {
			return y0;
		} else if (x >= x1) {
			return y1;
		} else {
			return (x - x0) * ((y1 - y0) / (x1 - x0)) + y0;
		}
	};
}

/**
 * @param {any[]} arr
 * @param {any} val
 * @returns {any[]}
 */
globalThis.removeFromArray = function(arr, val) {
	for (let i = 0; i < arr.length; i++) {
		if (val === arr[i]) {
			return arr.splice(i, 1);
		}
	}
	return null;
};

/**
 * @param {any[]} arr
 * @param {any} callback
 * @param {any} thisArg
 * @returns {Array}
 */
globalThis.filterInPlace = function(arr, callback, thisArg) {
	let j = 0;

	arr.forEach(function(e, i) {
		if (callback.call(thisArg, e, i, arr)) {
			arr[j++] = e;
		}
	});

	arr.length = j;
	return arr;
};

/** pregmod: are slave2's sperm compatible with slave1's eggs?
 * @param {FC.HumanState} slave1
 * @param {FC.HumanState|FC.AnimalState} slave2
 * @returns {boolean}
 */
globalThis.canBreed = function(slave1, slave2) {
	if (!slave1 || !slave2) {
		return null;
	}
	return (slave1.eggType === slave2.ballType);
};

/** assuming slave1 is fertile, could slave2 impregnate slave1?
 * slave2 must have dick and balls with compatible sperm;
 * both slaves must not be in chastity; slave2 need not achieve erection
 * @param {FC.HumanState} slave1
 * @param {FC.HumanState} slave2
 * @returns {boolean}
 */
globalThis.canImpreg = function(slave1, slave2) {
	if (!slave1 || !slave2) {
		return null;
	} else if (slave2.dick < 1) {
		return false;
	} else if (slave2.balls < 1) {
		return false;
	} else if (slave2.chastityPenis === 1) {
		return false;
	} else if (slave2.pubertyXY === 0) {
		/* pregmod start */
		return false;
	} else if (slave2.vasectomy === 1) {
		return false;
	} else if (!canBreed(slave1, slave2)) {
		return false; /* pregmod end */
	} else if (!canGetPregnant(slave1)) {
		/* includes chastity checks */
		return false;
	} else {
		return true;
	}
};

/** assuming slave1 is fertile, could slave2 impregnate slave1?
 * slave2 must have balls with compatible sperm;
 * a special function intended for tribbing scenes;
 * @param {FC.HumanState} slave1
 * @param {FC.HumanState} slave2
 * @returns {boolean}
 */
globalThis.canFemImpreg = function(slave1, slave2) {
	if (!slave1 || !slave2) {
		return null;
	} else if (slave2.penis > 0) {
		return false;
	} else if (slave2.balls < 1) {
		return false;
	} else if (slave2.chastityVagina === 1) {
		return false;
	} else if (slave2.pubertyXY === 0) {
		/* pregmod start */
		return false;
	} else if (slave2.vasectomy === 1) {
		return false;
	} else if (!canBreed(slave1, slave2)) {
		return false; /* pregmod end */
	} else if (!canGetPregnant(slave1)) {
		/* includes chastity checks */
		return false;
	} else {
		return true;
	}
};

/** assuming slave1 is fertile, could slave2 impregnate slave1?
 * slave2 must have balls with compatible sperm;
 * a special function intended for nulls intent on fathering children;
 * @param {FC.HumanState} slave1
 * @param {FC.HumanState} slave2
 * @returns {boolean}
 */
globalThis.canNullImpreg = function(slave1, slave2) { // DO NOT USE YET!
	if (!slave1 || !slave2) {
		return null;
	} else if (slave2.penis > 0) {
		return false;
	} else if (slave2.vagina >= 0) {
		return false;
	} else if (slave2.balls < 1) {
		return false;
	} else if (slave2.chastityVagina === 1) {
		return false;
	} else if (slave2.pubertyXY === 0) {
		/* pregmod start */
		return false;
	} else if (slave2.vasectomy === 1) {
		return false;
	} else if (!canBreed(slave1, slave2)) {
		return false; /* pregmod end */
	} else if (!canGetPregnant(slave1)) {
		/* includes chastity checks */
		return false;
	} else if ((slave2.chastityAnus !== 0 && slave2.anus > 0 && slave2.prostate > 0) || (slave2.prostateImplant === "stimulator")) {
		return false;
	} else {
		return true;
	}
};

/**
 * The amount of milk a slave produces in liters/week
 * @param {FC.HumanState} slave
 * @returns {number}
 */
globalThis.milkAmount = function(slave) {
	let milk;
	let calcs = App.Medicine.fleshSize(slave, 'boobs');
	if (calcs > 40000) {
		milk = (158 + ((calcs - 40000) / 600));
	} else if (calcs > 25000) {
		milk = (128 + ((calcs - 25000) / 500));
	} else if (calcs > 10000) {
		milk = (78 + ((calcs - 10000) / 300));
	} else if (calcs > 5000) {
		milk = (53 + ((calcs - 5000) / 200));
	} else if (calcs > 2000) {
		milk = (29 + ((calcs - 2000) / 125));
	} else if (calcs > 800) {
		milk = (16 + ((calcs - 800) / 80));
	} else {
		milk = (8 + ((calcs - 400) / 50));
	}
	if (slave.boobsImplant > 0) {
		milk *= Math.max(0.25, (1 - (slave.boobsImplant / slave.boobs)));
	}
	if (slave.lactation === 2) {
		milk *= 1.2;
	}
	milk += (milk * ((slave.devotion - 50) / 200));
	calcs = (slave.hormoneBalance / 50);
	if (slave.balls !== 0 && calcs > -2) {
		calcs -= 1;
	} else if (slave.ovaries !== 1 && calcs < 2) {
		calcs += 1;
	}
	milk *= (1 + (calcs * 0.1));
	milk *= (1 + (slave.preg / 100));
	milk *= (1 + (slave.health.condition / 50));
	milk *= (1 + (slave.weight / 500));
	milk *= (1 + (slave.lactationAdaptation / 500));
	if (slave.geneMods.livestock === 1) {
		milk *= 1.1;
	}
	milk += (slave.boobsMilk / 100);
	milk *= healthPenalty(slave);
	milk = Math.trunc(milk);
	milk = Math.clamp(milk, 1, 1000000000000000000);
	return milk;
};

/**
 * The amount of milk a slave produces in liters in a single milking
 * @param {FC.HumanState} slave
 * @returns {number}
 */
globalThis.milkLoad = function(slave) {
	return Math.trunc(milkAmount(slave) / 14);
};

/**
 * The amount of cum a slave produces in deciliters/week
 * @param {FC.HumanState} slave
 * @returns {number}
 */
globalThis.cumAmount = function(slave) {
	let cum = 1;
	if (slave.vasectomy !== 1) {
		if (isVirile(slave)) {
			if (slave.drugs === "testicle enhancement") {
				cum += (slave.balls * 3.5);
			} else if (slave.drugs === "hyper testicle enhancement") {
				cum += (slave.balls * 5);
			} else {
				cum += (slave.balls * 2.5);
			}
			if (slave.scrotum === 0) {
				cum *= 0.8;
			}
			if (slave.geneMods.livestock === 1) {
				cum *= 1.5;
			}
			if (slave.diet === "cum production") {
				cum *= 1.2;
			}
		}
		if (slave.ballType === "sterile") {
			cum *= 0.8;
		} else if (slave.geneMods.aggressiveSperm === 1 && isVirile(slave)) {
			cum *= 0.5;
		}
	}

	const calcs = (slave.hormoneBalance / 50);
	cum *= (1 - (calcs * 0.1));

	if (slave.prostate === 0) {
		cum *= 0.2; // being generous here
	} else if (slave.prostate === 2) {
		cum *= 1.2;
	} else if (slave.prostate === 3) {
		cum *= 1.5;
	}

	if (slave.devotion > 50) {
		cum += (cum * (slave.devotion / 100));
	} else if (slave.devotion < -50) {
		cum += (cum * (slave.devotion / 100));
	}
	if (slave.health.condition > 50) {
		cum += (cum * (slave.health.condition / 50));
	} else if (slave.health.condition < -50) {
		cum += (cum * (slave.health.condition / 50));
	}
	cum *= healthPenalty(slave);
	cum = Math.trunc(cum);
	cum = Math.clamp(cum, 1, 1_000_000_000_000_000);
	return cum;
};

/**
 * The amount of cum a slave produces in liters in a single ejaculation
 * @param {FC.HumanState} slave
 * @returns {number}
 */
globalThis.cumLoad = function(slave) {
	return Math.trunc(cumAmount(slave) / 70);
};

/**
 * The amount of fem cum a slave produces in deciliters
 * @param {FC.HumanState} slave
 * @returns {number}
 */
globalThis.girlCumAmount = function(slave) {
	let fluid = ((slave.prostate * (slave.energy / 5)) + 1);
	if (slave.vagina >= 0) {
		if (slave.vaginaLube === 2) {
			fluid *= 1.3;
		} else if (slave.vaginaLube === 1) {
			fluid *= 1.1;
		}
	}
	if (slave.energy > 10) {
		if (slave.health.condition > 50) {
			fluid *= (slave.health.condition / 50);
		} else if (slave.health.condition < -50) {
			fluid *= (1 + (slave.health.condition / 50));
		}
	}
	if (slave.geneMods.livestock === 1) {
		fluid *= 1.2;
	}
	fluid = Math.trunc(fluid);
	if (fluid < 1) {
		fluid = 1;
	}
	return fluid;
};

/**
 * @param {string} text
 * @returns {string}
 */
globalThis.lispReplace = function(text) {
	text = text.replace(/Sh/g, "Th");
	text = text.replace(/SS/g, "Th");
	text = text.replace(/Ss/g, "Th");
	text = text.replace(/sS/g, "Th");
	text = text.replace(/S/g, "Th");
	text = text.replace(/aX/g, "aKTH");
	text = text.replace(/eX/g, "eKTH");
	text = text.replace(/iX/g, "iKTH");
	text = text.replace(/oX/g, "oKTH");
	text = text.replace(/uX/g, "uKTH");
	text = text.replace(/yX/g, "yKTH");
	text = text.replace(/AX/g, "AKTH");
	text = text.replace(/EX/g, "EKTH");
	text = text.replace(/IX/g, "IKTH");
	text = text.replace(/OX/g, "OKTH");
	text = text.replace(/UX/g, "UKTH");
	text = text.replace(/YX/g, "YKTH");
	text = text.replace(/Xa/g, "Tha");
	text = text.replace(/Xe/g, "The");
	text = text.replace(/Xi/g, "Thi");
	text = text.replace(/Xo/g, "Tho");
	text = text.replace(/Xu/g, "Thu");
	text = text.replace(/Xy/g, "Thy");
	text = text.replace(/XA/g, "THA");
	text = text.replace(/XE/g, "THE");
	text = text.replace(/XI/g, "THI");
	text = text.replace(/XO/g, "THO");
	text = text.replace(/XU/g, "THU");
	text = text.replace(/XY/g, "THY");
	text = text.replace(/X/g, "EKTH");
	text = text.replace(/zZ/g, "Th");
	text = text.replace(/Zz/g, "Th");
	text = text.replace(/ZZ/g, "TH");
	text = text.replace(/Z/g, "Th");
	text = text.replace(/Cia/g, "Tha");
	text = text.replace(/Ci/g, "Thi");
	text = text.replace(/Ce/g, "The");
	text = text.replace(/Cy/g, "Thy");
	text = text.replace(/CIA/g, "THA");
	text = text.replace(/CI/g, "THI");
	text = text.replace(/CE/g, "THE");
	text = text.replace(/CY/g, "THY");
	text = text.replace(/ss/g, "th");
	text = text.replace(/sh/g, "th");
	text = text.replace(/s/g, "th");
	text = text.replace(/zz/g, "th");
	text = text.replace(/z/g, "th");
	text = text.replace(/ax/g, "akth");
	text = text.replace(/ex/g, "ekth");
	text = text.replace(/ix/g, "ikth");
	text = text.replace(/ox/g, "okth");
	text = text.replace(/ux/g, "ukth");
	text = text.replace(/yx/g, "ykth");
	text = text.replace(/Ax/g, "Akth");
	text = text.replace(/Ex/g, "Ekth");
	text = text.replace(/Ix/g, "Ikth");
	text = text.replace(/Ox/g, "Okth");
	text = text.replace(/Ux/g, "Ukth");
	text = text.replace(/Yx/g, "Ykth");
	text = text.replace(/xa/g, "tha");
	text = text.replace(/xe/g, "the");
	text = text.replace(/xi/g, "thi");
	text = text.replace(/xo/g, "tho");
	text = text.replace(/xu/g, "thu");
	text = text.replace(/xy/g, "thy");
	text = text.replace(/xA/g, "thA");
	text = text.replace(/xE/g, "thE");
	text = text.replace(/xI/g, "thI");
	text = text.replace(/xO/g, "thO");
	text = text.replace(/xU/g, "thU");
	text = text.replace(/xY/g, "thY");
	text = text.replace(/x/g, "ekth");
	text = text.replace(/cia/g, "tha");
	text = text.replace(/ci/g, "thi");
	text = text.replace(/ce/g, "the");
	text = text.replace(/cy/g, "thy");
	text = text.replace(/cI/g, "thI");
	text = text.replace(/cE/g, "thE");
	text = text.replace(/cY/g, "thY");
	return text;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {object} arcology
 * @returns {number}
 */
globalThis.repGainSacrifice = function(slave, arcology) {
	if (!slave || !arcology || !FutureSocieties.isActive('FSAztecRevivalist', arcology) || arcology.FSAztecRevivalist <= 0) {
		return 0;
	}
	return Math.ceil(
		(Math.min(100, Math.pow(1.0926, V.week - slave.weekAcquired)) + slave.prestige * 30) * arcology.FSAztecRevivalist / 100 / ((V.slavesSacrificedThisWeek || 0) + 1));
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
globalThis.bodyguardSuccessorEligible = function(slave) {
	if (!slave) {
		return false;
	}
	return (slave.devotion > 50 && slave.muscles >= 0 && slave.weight < 130 && slave.boobs < 8000 && slave.butt < 10 && slave.belly < 5000 && slave.balls < 10 && slave.dick < 10 && slave.preg < 20 && slave.fuckdoll === 0 && slave.fetish !== Fetish.MINDBROKEN && canWalk(slave) && canHold(slave) && canSee(slave) && canHear(slave));
};

/**
 * @param {any} obj
 * @returns {string}
 */
globalThis.toJson = function(obj) {
	let jsontext = JSON.stringify(obj);
	jsontext = jsontext.replace(/^{/, "");
	jsontext = jsontext.replace(/}$/, "");
	return jsontext;
};

/**
 * @param {FC.HumanState} slave
 * @returns {string}
 */
globalThis.nippleColor = function(slave) {
	if (skinToneLevel(slave.skin) < 8) {
		if (slave.preg > slave.pregData.normalBirth / 4 || (slave.counter.birthsTotal > 0 && slave.lactation > 0)) {
			return "brown";
		} else {
			return "pink";
		}
	} else if (skinToneLevel(slave.skin) < 14) {
		if (slave.preg > slave.pregData.normalBirth / 4 || (slave.counter.birthsTotal > 0 && slave.lactation > 0)) {
			return "dark brown";
		} else {
			return "pink";
		}
	} else if (skinToneLevel(slave.skin) > 20) {
		if (slave.preg > slave.pregData.normalBirth / 4 || (slave.counter.birthsTotal > 0 && slave.lactation > 0)) {
			return "black";
		} else {
			return "dark brown";
		}
	} else {
		if (slave.preg > slave.pregData.normalBirth / 4 || (slave.counter.birthsTotal > 0 && slave.lactation > 0)) {
			return "dark brown";
		} else {
			return "brown";
		}
	}
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {App.Entity.PlayerState} PC
 * @returns {number}
 */
globalThis.overpowerCheck = function(slave, PC) {
	let strength = 0;
	strength += (PC.muscles - slave.muscles);
	strength += (PC.height - slave.height);
	strength += ((PC.weight / 5) - (slave.weight / 5));
	strength -= (PC.bellyPreg / 1000);
	strength += (PC.skill.combat - slave.skill.combat);
	// strength -= (PC.health.shortDamage);
	strength -= (PC.health.longDamage);
	strength -= (PC.health.illness * 10);
	if (!canMove(V.PC)) {
		strength -= 100;
	} else if (!canWalk(V.PC)) {
		strength -= 50;
	}

	return strength;
};

/**
 * returns the degree than the intimidatee is intimidated by the intimidater.
 * @param {FC.HumanState} intimidatee
 * @param {FC.HumanState} intimidater
 * @returns {number}
 */
globalThis.intimidationDegree = function(intimidatee, intimidater) {
	let degree = 0;

	if (intimidater.ID === -1) {
		if (isPCCareerInCategory("servant") || isPCCareerInCategory("escort")) {
			degree -= 1;
		} else if (isPCCareerInCategory("slaver") || isPCCareerInCategory("gang") || isPCCareerInCategory("mercenary")) {
			degree += 1;
		}
		if (intimidater.rumor === "force") {
			degree += 1;
		}
	}
	if (!canWalk(intimidater) && canWalk(intimidatee)) {
		degree -= 2;
	} else if (canWalk(intimidater) && !canWalk(intimidatee)) {
		degree += 2;
	}
	if (intimidater.visualAge < intimidatee.visualAge && intimidater.visualAge < 18) {
		degree--;
		if (intimidater.visualAge < 13) {
			degree -= 3;
		}
	}
	if (intimidater.muscles >= intimidatee.muscles + 10 && intimidater.muscles >= 0) {
		degree++;
	} else if (intimidatee.muscles >= intimidater.muscles + 10) {
		degree--;
	}
	if (intimidater.teeth === "pointy") {
		degree++;
	}
	if (degree > 0 && intimidater.height >= intimidatee.height + 10) {
		degree++;
	} else if (degree < 0 && intimidater.height + 10 <= intimidatee.height) {
		degree--;
	}
	if (getLeftArmID(intimidater) >= 5 || getRightArmID(intimidater) >= 5) {
		degree += 10;
	}
	if (intimidater.bellyPreg >= 5000) {
		degree -= Math.min(Math.trunc(intimidater.bellyPreg / 5000), 5);
	}

	return degree;
};

/**
 * returns if arg2 can pick up and carry arg1
 * @param {FC.HumanState} liftee
 * @param {FC.HumanState} lifter
 * @returns {boolean}
 */
globalThis.canLift = function(liftee, lifter) {
	let sumWeight;

	if (lifter.belly >= 10000) {
		return false;
	}
	if (lifter.boobs >= 15000 || lifter.boobsImplants >= 10000) {
		return false;
	}
	sumWeight = liftee.height - lifter.height;
	sumWeight += liftee.weight / 2;
	sumWeight += liftee.boobs / 500;
	sumWeight += liftee.belly / 1000;
	sumWeight += liftee.butt / 2;
	if (liftee.hips > 0) {
		sumWeight += Math.pow(liftee.hips, 2);
	}
	if (liftee.dick >= 20) {
		sumWeight += Math.trunc(liftee.dick / 10);
	}
	if (liftee.balls >= 10) {
		sumWeight += Math.pow(Math.trunc(liftee.balls / 10), 3);
	}

	return 20 + lifter.muscles >= sumWeight && hasBothArms(lifter);
};

/**
 * returns array of IDs of all characters who impregnated slave
 * @param {FC.HumanState} slave
 * @param {boolean} [genepool=false]
 * @returns {number[]}
 */
globalThis.impregnatedBy = function(slave, genepool = false) {
	const IDArray = [];
	if (!Array.isArray(slave.womb)) {
		if (genepool) {
			slave.womb = [];
		} else {
			WombInit(slave);
		}
	}
	for (let i = 0; i < slave.womb.length; i++) {
		IDArray.push(slave.womb[i].fatherID);
	}
	return IDArray;
};

/**
 * returns true if mother was impregnated by father
 * @param {FC.HumanState} mother
 * @param {FC.HumanState} father
 * @param {boolean} [genepool=false]
 * @returns {boolean}
 */
globalThis.isImpregnatedBy = function(mother, father, genepool = false) {
	return impregnatedBy(mother, genepool).includes(father.ID);
};

/**
 * @param {App.Entity.SlaveState} slave
 */
globalThis.SoftenBehavioralFlaw = function(slave) {
	switch (slave.behavioralFlaw) {
		case "arrogant":
			slave.behavioralQuirk = "confident";
			break;
		case "bitchy":
			slave.behavioralQuirk = "cutting";
			break;
		case "odd":
			slave.behavioralQuirk = "funny";
			break;
		case "hates men":
			slave.behavioralQuirk = "adores women";
			break;
		case "hates women":
			slave.behavioralQuirk = "adores men";
			break;
		case "gluttonous":
			slave.behavioralQuirk = "fitness";
			break;
		case "anorexic":
			slave.behavioralQuirk = "insecure";
			break;
		case "devout":
			slave.behavioralQuirk = "sinful";
			break;
		case "liberated":
			slave.behavioralQuirk = "advocate";
			break;
	}
	slave.behavioralFlaw = "none";
};

/**
 * @param {App.Entity.SlaveState} slave
 */
globalThis.SoftenSexualFlaw = function(slave) {
	switch (slave.sexualFlaw) {
		case "hates oral":
			slave.sexualQuirk = "gagfuck queen";
			break;
		case "hates anal":
			slave.sexualQuirk = "painal queen";
			break;
		case "hates penetration":
			slave.sexualQuirk = "strugglefuck queen";
			break;
		case "shamefast":
			slave.sexualQuirk = "tease";
			break;
		case "idealistic":
			slave.sexualQuirk = "romantic";
			break;
		case "repressed":
			slave.sexualQuirk = "perverted";
			break;
		case "apathetic":
			slave.sexualQuirk = "caring";
			break;
		case "crude":
			slave.sexualQuirk = "unflinching";
			break;
		case "judgemental":
			slave.sexualQuirk = "size queen";
			break;
	}
	slave.sexualFlaw = "none";
};

/**
 * @param {App.Entity.PlayerState} PC
 */
globalThis.generatePlayerPronouns = function(PC) {
	if (PC.title === 0) {
		PC.pronoun = App.Data.Pronouns.Kind.female;
	} else {
		PC.pronoun = App.Data.Pronouns.Kind.male;
	}
};

/**
 * @param {number} number1
 * @param {number} number2
 */
globalThis.pregNumberName = function(number1, number2) {
	let pt = "";
	let p1 = number1 % 10;
	let p2 = ((number1 % 100) - (number1 % 10)) / 10;
	let p3 = ((number1 % 1000) - (number1 % 100)) / 100;
	switch (number1) {
		case 1:
			pt += "bab";
			break;
		case 2:
			pt += "twin";
			break;
		default:
			switch (number1) {
				case 3:
					pt += "tri";
					break;
				case 4:
					pt += "quadru";
					break;
				case 5:
					pt += "quintu";
					break;
				case 6:
					pt += "sextu";
					break;
				case 7:
					pt += "septu";
					break;
				case 8:
					pt += "octu";
					break;
				case 9:
					pt += "nonu";
					break;
				default:
					switch (p1) {
						case 1:
							pt += "un";
							break;
						case 2:
							pt += "duo";
							break;
						case 3:
							pt += "tre";
							break;
						case 4:
							pt += "quattuor";
							break;
						case 5:
							pt += "quin";
							break;
						case 6:
							pt += "sex";
							break;
						case 7:
							pt += "septen";
							break;
						case 8:
							pt += "octo";
							break;
						case 9:
							pt += "novem";
							break;
					}
					switch (p2) {
						case 1:
							pt += "dec";
							break;
						case 2:
							pt += "vigint";
							break;
						case 3:
							pt += "trigint";
							break;
						case 4:
							pt += "quadragint";
							break;
						case 5:
							pt += "quinquagint";
							break;
						case 6:
							pt += "sexagint";
							break;
						case 7:
							pt += "septuagint";
							break;
						case 8:
							pt += "octogint";
							break;
						case 9:
							pt += "nonagint";
							break;
					}
					if (number1 >= 100) {
						if (p2 !== 0) {
							pt += "i";
						}
						switch (p3) {
							case 1:
								pt += "centu";
								break;
							case 2:
								pt += "bicentu";
								break;
							case 3:
								pt += "tricentu";
								break;
							case 4:
								pt += "quadricentu";
								break;
							case 5:
								pt += "quincentu";
								break;
							case 6:
								pt += "sexcentu";
								break;
							case 7:
								pt += "septemcentu";
								break;
							case 8:
								pt += "octocentu";
								break;
							case 9:
								pt += "novemcentu";
								break;
						}
					} else {
						pt += "u";
					}
			}
			pt += "plet";
	}
	if (number2 === 2) {
		if (number1 === 1) {
			pt += "ie";
		}
		pt += "s";
	} else {
		if (number1 === 1) {
			pt += "y";
		}
	}
	return pt;
};

/** Returns the description of the part of body a slave/PC uses to penetrate, if they can, or a description for "dildo"
 * @param {FC.HumanState} slave
 * @param {boolean} includeClit
 * @returns {string}
 */
globalThis.penetrationTool = function(slave, includeClit = true) {
	if (!slave || !slave.hasOwnProperty("dick")) {
		return "ERROR";
	}
	if (slave.dick > 0 && canPenetrate(slave)) {
		return dickDesc(slave);
	}
	if (slave.clit >= 3 && includeClit) {
		return clitDesc(slave);
	}
	let adj = ["big", "fat", "huge", "large", "long", "realistic"];
	let use = (slave.vagina === 0) ? ["strap-on", "", ""] : ["double-sided", "strap-on double", "double-headed", "double-ended", "strapless double"];
	let noun = ["dildo", "dildo", "dildo", "dildo", "fake cock", "vibrator", "vibrator"];
	return `${jsEither(adj)} ${jsEither(use)} ${jsEither(noun)}`;
};

/** Is the dick too big (1), too small(-1), or just right(0)?
 * @param {FC.HumanState} catcher
 * @param {FC.HumanState} pitcher
 * @param {string} hole
 * @returns {number}
 */
globalThis.relativeDickSize = function(catcher, pitcher, hole) {
	let size = 0;
	if (pitcher.dick === 1 || (pitcher.dick < 3 && catcher.physicalAge > 12) || (catcher[hole] >= pitcher.dick + 3)) {
		size = -1;
	}
	if (pitcher.dick > 5 || (pitcher.dick - catcher[hole] > 3) || (catcher.physicalAge <= 12 && pitcher.dick > 2)) {
		size = 1;
	}
	if (catcher.sexualQuirk === SexualQuirk.SIZEQUEEN) {
		if (pitcher.dick < 4) {
			size = -1;
		} else if (size !== -1) {
			size = 0;
		}
	}
	return size;
};