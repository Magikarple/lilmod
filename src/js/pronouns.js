App.Utils.Pronouns = class {
	/**
	 * @param {{pronoun: number}} obj
	 */
	constructor(obj) {
		/** @type {FC.Data.Pronouns.Definition} */
		this._pronouns = obj.pronoun < App.Data.Pronouns.Kind.custom
			? App.Data.Pronouns.Std[obj.pronoun]
			: V.customPronouns[obj.pronoun];
	}

	get pronoun() { return this._pronouns.pronoun; }
	get possessivePronoun() { return this._pronouns.possessivePronoun; }
	get possessive() { return this._pronouns.possessive; }
	get object() { return this._pronouns.object; }
	get objectReflexive() { return this._pronouns.objectReflexive; }
	get noun() { return this._pronouns.noun; }

	get Pronoun() { return capFirstChar(this.pronoun); }
	get PossessivePronoun() { return capFirstChar(this.possessivePronoun); }
	get Possessive() { return capFirstChar(this.possessive); }
	get Object() { return capFirstChar(this.object); }
	get ObjectReflexive() { return capFirstChar(this.objectReflexive); }
	get Noun() { return capFirstChar(this.noun); }

	get he() { return this.pronoun; }
	get him() { return this.object; }
	get his() { return this.possessive; }
	get himself() { return this.objectReflexive; }
	get boy() { return this.noun; }

	get He() { return this.Pronoun; }
	get Him() { return this.Object; }
	get His() { return this.Possessive; }
	get Himself() { return this.ObjectReflexive; }
	get Boy() { return this.Noun; }

	get she() { return this.pronoun; }
	get her() { return this.object; }
	get hers() { return this.possessivePronoun; }
	get herself() { return this.objectReflexive; }
	get girl() { return this.noun; }

	get She() { return this.Pronoun; }
	get Her() { return this.Object; }
	get Hers() { return this.PossessivePronoun; }
	get Herself() { return this.ObjectReflexive; }
	get Girl() { return this.Noun; }

	get woman() { return this.noun === "girl" ? "woman" : "man"; }
	get women() { return this.noun === "girl" ? "women" : "men"; }
	get loli() { return this.noun === "girl" ? "loli" : "shota"; }

	get Woman() { return capFirstChar(this.woman); }
	get Women() { return capFirstChar(this.women); }
	get Loli() { return capFirstChar(this.loli); }

	get daughter() { return this.noun === "girl" ? "daughter" : "son"; }
	get Daughter() { return capFirstChar(this.daughter); }

	get sister() { return this.noun === "girl" ? "sister" : "brother"; }
	get Sister() { return capFirstChar(this.sister); }

	// TODO: remove this once overhauled
	// eslint-disable-next-line sonarjs/no-all-duplicated-branches
	get wife() { return this.noun === "girl" ? "wife" : "wife"; }
	get Wife() { return capFirstChar(this.wife); }
	// TODO: remove this once overhauled
	// eslint-disable-next-line sonarjs/no-all-duplicated-branches
	get wives() { return this.noun === "girl" ? "wives" : "wives"; }
	get Wives() { return capFirstChar(this.wives); }

	get mother() { return this.noun === "girl" ? "mother" : "father"; }
	get Mother() { return capFirstChar(this.mother); }

	get father() { return this.noun === "girl" ? "mother" : "father"; }
	get Father() { return capFirstChar(this.father); }

	/**
	 * @param {string} suffix
	 * @returns {{[key: string]: string}}
	 */
	appendSuffix(suffix) {
		/** @type {{[key: string]: string}} */
		const r = {};
		// "constructor" will be the first property. slice(1) to skip it
		for (const prop of Object.getOwnPropertyNames(Object.getPrototypeOf(this)).slice(1)) {
			r[prop + suffix] = this[prop];
		}
		return r;
	}
};

/**
 * @param {{pronoun: number}} obj
 * @returns {App.Utils.Pronouns}
 */
globalThis.getPronouns = function(obj) {
	return new App.Utils.Pronouns(obj);
};

/**
 * @param {{pronoun: number}} obj
 * @param {App.Entity.SlaveState} spokenBy
 * @returns {App.Utils.Pronouns}
 */
globalThis.getSpokenPronouns = function(obj, spokenBy) {
	const lispHandler = {
		get: function(obj, prop) {
			const result = obj[prop];
			if (typeof result === "string" && lisps) {
				return lispReplace(result);
			} else {
				return result;
			}
		}
	};

	const lisps = SlaveStatsChecker.checkForLisp(spokenBy);
	return new Proxy(new App.Utils.Pronouns(obj), lispHandler);
};

/**
 * @param {number} dickRatio
 * @returns {App.Utils.Pronouns}
 */
globalThis.getNonlocalPronouns = function(dickRatio) {
	/* a fake slave object, we need the .pronoun attribute only */
	const slave = {pronoun: App.Data.Pronouns.Kind.female};
	/* Used for generic slaves, citizens, security, etc. */
	if (V.diversePronouns === 1 && dickRatio > 0 && (dickRatio >= 100 || random(1, 100) <= dickRatio)) {
		slave.pronoun = App.Data.Pronouns.Kind.male;
	}

	return getPronouns(slave);
};

/** Get a property for a given slave, with the correct pronouns.
 * @param {FC.HumanState} slave
 * @param {string} prop
 * @returns {string}
 */
globalThis.pronounsForSlaveProp = function(slave, prop) {
	const pronouns = getPronouns(slave);
	return prop.replace(/\$([A-Z]?[a-z]+)/g, (match, cap1) => pronouns[cap1] || match);
};
