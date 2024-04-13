App.SlaveAssignment.SmartPiercing = {};

/* -- Normal settings -- */

App.SlaveAssignment.SmartPiercing.BASE = class {
	/** Base class for smart piercing settings; encapsulates shared logic and interface
	 * @param {App.Entity.SlaveState} slave */
	constructor(slave) {
		this.slave = slave;
	}

	/** Activate effect for this setting at a given magnitude.
	 * @param {number} magnitude 1: vibe/piercing, 2: smart vibe, or vibe+piercing, 3: smart vibe+piercing
	 */
	effect(magnitude) {
		throw Error("abstract");
	}

	/** Return text for slave effect for this setting.
	 * @param {boolean} plural was more than one device used.
	 * @returns {string} predicate phrase for a sentence describing the results. note that the subject is provided.
	 */
	text(plural) {
		return `<span class="error">ABSTRACT</span>`;
	}

	/** Condition under which the trigger evaluates
	 * @returns {boolean} whether to evaluate the trigger
	 */
	valid() {
		return true;
	}

	/** Activate effect and return text for a slave. Typically should be inherited without changes.
	 * @param {number} magnitude 1: vibe/piercing, 2: smart vibe, or vibe+piercing, 3: smart vibe+piercing
	 * @param {boolean} plural was more than one device used.
	 * @returns {string} predicate phrase for a sentence describing the results. note that the subject is provided.
	 */
	trigger(magnitude, plural) {
		if (this.valid()) {
			const ret = this.text(plural);
			this.effect(magnitude);
			return ret;
		}
		return '';
	}
};

App.SlaveAssignment.SmartPiercing.none = class extends App.SlaveAssignment.SmartPiercing.BASE {
	effect(magnitude) {
		this.slave.devotion -= 1 + magnitude; // 2, 3, or 4
		this.slave.energy -= 10 + 3 * magnitude; // 10, 13, or 16
	}

	text(plural) {
		const {his, him} = getPronouns(this.slave);
		return `${plural ? "disrupt" : "disrupts"} arousal, <span class="libido dec">reducing ${his} sex drive</span> and <span class="devotion dec">infuriating ${him}.</span>`;
	}
};

App.SlaveAssignment.SmartPiercing.all = class extends App.SlaveAssignment.SmartPiercing.BASE {
	effect(magnitude) {
		this.slave.energy += 1 + 2 * magnitude; // 3, 5, or 7
	}

	valid() {
		return this.slave.energy <= 95;
	}

	text(plural) {
		const {his} = getPronouns(this.slave);
		return `${plural ? "encourage" : "encourages"} sex of all kinds, <span class="libido inc">increasing ${his} sex drive.</span>`;
	}
};

App.SlaveAssignment.SmartPiercing.GENDERBASE = class extends App.SlaveAssignment.SmartPiercing.BASE {
	/** Base class for gender settings; encapsulates shared logic for attraction modification
	 * @param {App.Entity.SlaveState} slave
	 * @param {string} property slave property to adjust
	 * @param {boolean} positive whether the impact of the attraction change is positive or negative
	 */
	constructor(slave, property, positive) {
		super(slave);
		this.property = property;
		this.positive = positive;
	}

	effect(magnitude) {
		const bonus = 2 * V.assistant.power;
		if (this.positive) {
			this.slave[this.property] += (2 + 2 * magnitude + bonus); // 4, 6, or 8, plus assistant bonus
		} else {
			this.slave[this.property] -= (2 + 2 * magnitude + bonus); // same as above
		}
		this.slave[this.property] = Math.clamp(this.slave[this.property], 0, 100);
	}

	valid() {
		if (this.positive) {
			return this.slave[this.property] < 95;
		} else {
			return this.slave[this.property] > 0;
		}
	}

	trigger(magnitude, plural) {
		if (this.valid()) {
			let ret = this.text(plural);
			this.effect(magnitude);
			// special side effect for gender settings only
			const {his} = getPronouns(this.slave);
			if (this.positive) {
				if (this.slave.energy < 80) {
					ret += ` This has the secondary effect of slightly <span class="libido inc">enhancing ${his} libido.</span>`;
					this.slave.energy += (magnitude === 1 ? 1 : 2);
				}
			} else {
				if (this.slave.energy > 0) {
					ret += ` This has the secondary effect of slightly <span class="libido dec">reducing ${his} libido.</span>`;
					this.slave.energy -= (magnitude === 1 ? 1 : 2);
				}
			}
			return ret;
		}
		return '';
	}
};

App.SlaveAssignment.SmartPiercing.women = class extends App.SlaveAssignment.SmartPiercing.GENDERBASE {
	constructor(slave) {
		super(slave, "attrXX", true);
	}

	text(plural) {
		const {his, him, he} = getPronouns(this.slave);
		return `successfully <span class="improvement">${plural ? "increase" : "increases"} ${his} attraction to girls</span> by pleasuring ${him} when ${he}'s around them.`;
	}
};

App.SlaveAssignment.SmartPiercing["anti-women"] = class extends App.SlaveAssignment.SmartPiercing.GENDERBASE {
	constructor(slave) {
		super(slave, "attrXX", false);
	}

	text(plural) {
		const {his, he} = getPronouns(this.slave);
		return `successfully <span class="improvement">${plural ? "suppress" : "suppresses"} ${his} attraction to girls</span> by making ${his} private parts very uncomfortable when ${he}'s around them.`;
	}
};

App.SlaveAssignment.SmartPiercing.men = class extends App.SlaveAssignment.SmartPiercing.GENDERBASE {
	constructor(slave) {
		super(slave, "attrXY", true);
	}

	text(plural) {
		const {his, him, he} = getPronouns(this.slave);
		return `successfully <span class="improvement">${plural ? "increase" : "increases"} ${his} attraction to guys</span> by pleasuring ${him} when ${he}'s around cocks.`;
	}
};

App.SlaveAssignment.SmartPiercing["anti-men"] = class extends App.SlaveAssignment.SmartPiercing.GENDERBASE {
	constructor(slave) {
		super(slave, "attrXY", false);
	}

	text(plural) {
		const {his, he} = getPronouns(this.slave);
		return `successfully <span class="improvement">${plural ? "suppress" : "suppresses"} ${his} attraction to guys</span> by making ${his} private parts very uncomfortable when ${he}'s around them.`;
	}
};


/* -- Fetish settings -- */

App.SlaveAssignment.SmartPiercing.FETISHBASE = class extends App.SlaveAssignment.SmartPiercing.BASE {
	/** Base class for fetish settings; encapsulates shared logic for fetishes
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.Fetish} fetishName name of fetish controlled by this class
	 */
	constructor(slave, fetishName) {
		super(slave);
		this.fetish = fetishName;
	}

	/** Return text for slave effect for this fetish setting.
	 * @param {boolean} plural was more than one device used.
	 * @param {string} which text type to return - "decrease" (of opposing fetish), "change" (to this fetish), or "increase" (of this fetish)
	 * @returns {string} predicate phrase for a sentence describing the results. note that the subject is provided.
	 */
	fetishText(plural, which) {
		return `<span class="error">ABSTRACT</span>`;
	}

	// no point in separating effect for fetishes
	trigger(magnitude, plural) {
		if (this.slave.fetish !== this.fetish) {
			if (this.slave.fetishStrength >= 10) {
				this.slave.fetishStrength -= 15 + 5 * magnitude; // 20, 25, or 30
				return this.fetishText(plural, "decrease");
			} else if (fetishChangeChance(this.slave) > (jsRandom(0, 100) - 20 * V.assistant.power)) {
				this.slave.fetish = this.fetish;
				this.slave.fetishKnown = 1;
				this.slave.fetishStrength = 5 + 5 * magnitude;
				return this.fetishText(plural, "change");
			}
		} else if (this.slave.fetishStrength <= 95) {
			this.slave.fetishStrength += 2 + 2 * magnitude; // 4, 6, or 8
			return this.fetishText(plural, "increase");
		}
		return '';
	}
};

App.SlaveAssignment.SmartPiercing.vanilla = class extends App.SlaveAssignment.SmartPiercing.FETISHBASE {
	constructor(slave) {
		super(slave, Fetish.NONE);
	}

	trigger(magnitude, plural) {
		// Vanilla does NOT increase the strength of the "none" fetish, but otherwise behaves like any other fetish setting
		if (this.slave.fetish !== Fetish.NONE) {
			return super.trigger(magnitude, plural);
		}
		return '';
	}

	fetishText(plural, which) {
		const {him, his} = getPronouns(this.slave);
		if (which === "decrease") {
			return `${plural ? "act" : "acts"} to <span class="fetish loss">suppress ${his} current fetish,</span> encouraging ${him} to orgasm only during normal sex.`;
		} else if (which === "change") {
			return `${plural ? "encourage" : "encourages"} many orgasms during straightforward oral sex, and <span class="fetish loss">${his} sexuality returns to normal.</span>`;
		}
		throw Error("Unexpected fetish effect");
	}
};

App.SlaveAssignment.SmartPiercing.oral = class extends App.SlaveAssignment.SmartPiercing.FETISHBASE {
	constructor(slave) {
		super(slave, Fetish.CUMSLUT);
	}

	fetishText(plural, which) {
		const {he, him, his} = getPronouns(this.slave);
		if (which === "decrease") {
			return `${plural ? "act" : "acts"} to <span class="fetish loss">suppress ${his} current fetish,</span> encouraging ${him} to orgasm when ${he}'s using ${his} mouth.`;
		} else if (which === "change") {
			return `${plural ? "encourage" : "encourages"} many orgasms as ${he} performs oral sex, and <span class="fetish gain">${he} develops a fetish for cum.</span>`;
		} else if (which === "increase") {
			return `<span class="fetish gain">${plural ? "advance" : "advances"} ${his} oral fetish.</span>`;
		}
	}
};

App.SlaveAssignment.SmartPiercing.anal = class extends App.SlaveAssignment.SmartPiercing.FETISHBASE {
	constructor(slave) {
		super(slave, Fetish.BUTTSLUT);
	}

	fetishText(plural, which) {
		const {he, him, his} = getPronouns(this.slave);
		if (which === "decrease") {
			return `${plural ? "act" : "acts"} to <span class="fetish loss">suppress ${his} current fetish,</span> encouraging ${him} to orgasm when ${his} rear hole is being fucked.`;
		} else if (which === "change") {
			return `${plural ? "encourage" : "encourages"} many orgasms when ${his} ass is being stimulated, and <span class="fetish gain">${he} develops a fetish for being an anal bottom.</span>`;
		} else if (which === "increase") {
			return `<span class="fetish gain">${plural ? "advance" : "advances"} ${his} anal fetish.</span>`;
		}
	}
};

App.SlaveAssignment.SmartPiercing.boobs = class extends App.SlaveAssignment.SmartPiercing.FETISHBASE {
	constructor(slave) {
		super(slave, Fetish.BOOBS);
	}

	fetishText(plural, which) {
		const {he, him, his} = getPronouns(this.slave);
		if (which === "decrease") {
			return `${plural ? "act" : "acts"} to <span class="fetish loss">suppress ${his} current fetish,</span> encouraging ${him} to orgasm when ${his} tits are being touched.`;
		} else if (which === "change") {
			return `${plural ? "encourage" : "encourages"} many orgasms when ${his} nipples are being stimulated, and <span class="fetish gain">${he} develops a fetish for ${his} tits.</span>`;
		} else if (which === "increase") {
			return `<span class="fetish gain">${plural ? "advance" : "advances"} ${his} boob fetish.</span>`;
		}
	}
};

App.SlaveAssignment.SmartPiercing.submissive = class extends App.SlaveAssignment.SmartPiercing.FETISHBASE {
	constructor(slave) {
		super(slave, Fetish.SUBMISSIVE);
	}

	fetishText(plural, which) {
		const {he, him, his} = getPronouns(this.slave);
		if (which === "decrease") {
			return `${plural ? "act" : "acts"} to <span class="fetish loss">suppress ${his} current fetish,</span> encouraging ${him} to orgasm when ${he}'s being held down and used.`;
		} else if (which === "change") {
			return `${plural ? "encourage" : "encourages"} many orgasms when ${he} is restrained, and <span class="fetish gain">${he} develops a fetish for submission.</span>`;
		} else if (which === "increase") {
			return `<span class="fetish gain">${plural ? "advance" : "advances"} ${his} submission.</span>`;
		}
	}
};

App.SlaveAssignment.SmartPiercing.humiliation = class extends App.SlaveAssignment.SmartPiercing.FETISHBASE {
	constructor(slave) {
		super(slave, Fetish.HUMILIATION);
	}

	fetishText(plural, which) {
		const {he, him, his} = getPronouns(this.slave);
		if (which === "decrease") {
			return `${plural ? "act" : "acts"} to <span class="fetish loss">suppress ${his} current fetish,</span> encouraging ${him} to orgasm when ${he}'s got an audience.`;
		} else if (which === "change") {
			return `${plural ? "encourage" : "encourages"} many orgasms when ${he} is being humiliated, and <span class="fetish gain">${he} develops a fetish for humiliation.</span>`;
		} else if (which === "increase") {
			return `<span class="fetish gain">${plural ? "advance" : "advances"} ${his} humiliation fetish.</span>`;
		}
	}
};

App.SlaveAssignment.SmartPiercing.pregnancy = class extends App.SlaveAssignment.SmartPiercing.FETISHBASE {
	constructor(slave) {
		super(slave, Fetish.PREGNANCY);
	}

	fetishText(plural, which) {
		const {he, him, his} = getPronouns(this.slave);
		if (which === "decrease") {
			return `${plural ? "act" : "acts"} to <span class="fetish loss">suppress ${his} current fetish,</span> encouraging ${him} to orgasm when ${he} feels like ${he}'s being bred.`;
		} else if (which === "change") {
			let activities = ''; // FIXME: no text for null PCs. Is that a thing?
			if (V.PC.dick !== 0) {
				activities = "unprotected sex";
				if (V.PC.vagina !== -1) {
					activities += " and ";
				}
			}
			if (V.PC.vagina !== -1) {
				activities += "loving contact with the female anatomy";
			}
			return `${plural ? "encourage" : "encourages"} many orgasms during ${activities}, and <span class="fetish gain">${he} begins to fantasize about pregnancy.</span>`;
		} else if (which === "increase") {
			return `<span class="fetish gain">${plural ? "advance" : "advances"} ${his} pregnancy fetish.</span>`;
		}
	}
};

App.SlaveAssignment.SmartPiercing.dom = class extends App.SlaveAssignment.SmartPiercing.FETISHBASE {
	constructor(slave) {
		super(slave, Fetish.DOM);
	}

	fetishText(plural, which) {
		const {he, him, his} = getPronouns(this.slave);
		if (which === "decrease") {
			return `${plural ? "act" : "acts"} to <span class="fetish loss">suppress ${his} current fetish,</span> encouraging ${him} to orgasm when another slave is servicing ${him}.`;
		} else if (which === "change") {
			return `${plural ? "encourage" : "encourages"} many orgasms while ${he}'s taking an active, dominant sexual role, and <span class="fetish gain">${he} begins to enjoy dominance.</span>`;
		} else if (which === "increase") {
			return `<span class="fetish gain">${plural ? "advance" : "advances"} ${his} dominance.</span>`;
		}
	}
};

App.SlaveAssignment.SmartPiercing.masochist = class extends App.SlaveAssignment.SmartPiercing.FETISHBASE {
	constructor(slave) {
		super(slave, Fetish.MASOCHIST);
	}

	fetishText(plural, which) {
		const {he, him, his} = getPronouns(this.slave);
		if (which === "decrease") {
			return `${plural ? "act" : "acts"} to <span class="fetish loss">suppress ${his} current fetish,</span> encouraging ${him} to orgasm when ${he}'s being hurt.`;
		} else if (which === "change") {
			return `${plural ? "encourage" : "encourages"} many orgasms while ${he}'s being beaten, and <span class="fetish gain">${he} begins to enjoy pain.</span>`;
		} else if (which === "increase") {
			return `<span class="fetish gain">${plural ? "advance" : "advances"} ${his} masochism.</span>`;
		}
	}
};

App.SlaveAssignment.SmartPiercing.sadist = class extends App.SlaveAssignment.SmartPiercing.FETISHBASE {
	constructor(slave) {
		super(slave, Fetish.SADIST);
	}

	fetishText(plural, which) {
		const {he, him, his} = getPronouns(this.slave);
		if (which === "decrease") {
			return `${plural ? "act" : "acts"} to <span class="fetish loss">suppress ${his} current fetish,</span> encouraging ${him} to orgasm when ${he} witnesses or even takes part in another slave's pain.`;
		} else if (which === "change") {
			return `${plural ? "encourage" : "encourages"} many orgasms while ${he}'s involved in the abuse of other slaves, and <span class="fetish gain">${he} begins to develop a sadistic streak.</span>`;
		} else if (which === "increase") {
			return `<span class="fetish gain">${plural ? "advance" : "advances"} ${his} sadism.</span>`;
		}
	}
};


/* -- Dispatch -- */

/** Apply and return description of smart piercing effects
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.SlaveAssignment.saSmartPiercingEffects = function(slave) {
	const {he, his, His, him} = getPronouns(slave);
	const hasBV = slave.vaginalAccessory === "bullet vibrator" || slave.dickAccessory === "bullet vibrator";
	const hasSmartBV = dildoVibeLevel(slave) > 1 || slave.dickAccessory === "smart bullet vibrator";
	const hasDildoVibe = slave.vaginalAttachment === "vibrator";
	const hasSmartDildoVibe = slave.vaginalAttachment === "smart vibrator";
	const hasSP = slave.piercing.genitals.smart;
	const piercing = hasSP ? `smart ${(slave.vagina > -1) ? "clit" : "frenulum"} piercing` : ``;
	const hasSmartVibe = hasSmartDildoVibe || hasSmartBV;
	const hasDumbVibe = hasDildoVibe || hasBV;
	const vibrator = `${hasSmartVibe ? "smart " : ""}${(hasBV || hasSmartBV) ? "bullet vibrator" : (hasDildoVibe || hasSmartDildoVibe) ? "vibrating dildo" : ""}`;

	// should we bail early because the slave can't be affected?
	if (hasSP) {
		if (slave.fuckdoll > 0) {
			return `${His} ${piercing} is slaved to ${his} stimulation systems.`;
		} else if (slave.fetish === Fetish.MINDBROKEN) {
			return `The effects of ${his} ${piercing} cannot reach ${his} shattered mind.`;
		}
	} else if (hasSmartVibe || hasDumbVibe) {
		if (hasSmartVibe && slave.fuckdoll > 0) { // note: ordinary vibes DO affect fuckdolls
			return `${His} ${vibrator} is slaved to ${his} stimulation systems.`;
		} else if (slave.fetish === Fetish.MINDBROKEN) {
			return `The effects of the ${vibrator} ${he} is wearing cannot reach ${his} shattered mind.`;
		}
	}

	let r = [];

	// smart toys act only when turned on
	if ((hasSP || hasSmartVibe) && slave.clitSetting !== SmartPiercingSetting.OFF) {
		r.push(doSmartToys());
	}

	// dumb toys act regardless of what the smart toys are doing
	if (hasDumbVibe) {
		r.push(doDumbToys());
	}

	return r.join(' ');

	function doSmartToys() {
		// figure out how the slave is affected by smart toys
		let magnitude = 0;
		let plural = false;
		let subjectPhrase = '';
		if (hasSP && hasSmartVibe) {
			magnitude = 3;
			plural = true;
			subjectPhrase = `${His} ${piercing} and the ${vibrator} ${he} is wearing`;
		} else if (hasSmartVibe) {
			magnitude = 2;
			subjectPhrase = `The ${vibrator} ${he} is wearing`;
		} else if (hasSP) {
			magnitude = 1;
			subjectPhrase = `${His} ${piercing}`;
		}

		if (magnitude) {
			const ctor = App.SlaveAssignment.SmartPiercing[slave.clitSetting];
			if (typeof ctor !== "function") { // uninstantiated classes are really just functions. JS is weird.
				throw new Error(`Unrecognized smart clit/vibe setting ${slave.clitSetting}`);
			}
			/** @type {App.SlaveAssignment.SmartPiercing.BASE} */
			const setting = new ctor(slave);
			const predicatePhrase = setting.trigger(magnitude, plural);
			if (predicatePhrase !== "") { // no predicate means no sentence
				return subjectPhrase + " " + predicatePhrase;
			}
		}

		return ``;
	}

	function doDumbToys() {
		// all dumb vibrators do exactly the same thing: dampen any existing fetish, and push libido into the average (40-60) range
		const intro = `${His} ${vibrator} intermittently stimulates ${him} no matter what ${he}'s doing, which `;
		const effects = [];
		if (slave.fetish !== Fetish.NONE) {
			if (slave.fetishKnown === 1) {
				effects.push(`<span class="fetish loss">weakens</span> ${his} fetish`);
			}
			slave.fetishStrength -= Math.min(15, slave.fetishStrength);
		}
		if (slave.energy <= 40) {
			effects.push(`<span class="libido inc">increases</span> ${his} below-average sex drive`);
			slave.energy += 3;
		} else if (slave.energy >= 60) {
			effects.push(`<span class="libido dec">reduces</span> ${his} overcharged libido`);
			slave.energy -= 3;
		}
		return effects.length > 0 ? intro + toSentence(effects) + "." : "";
	}
};
