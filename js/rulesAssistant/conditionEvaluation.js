/* eslint-disable sonarjs/no-identical-expressions */
// cSpell:ignore unaccelerated

App.RA.Activation.Context = class {
	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	constructor(slave) {
		this._slave = slave;
	}

	get slave() {
		return this._slave;
	}
};

/**
 * @template {boolean|number|string} T
 * @typedef {object} Getter
 * @property {string} name
 * @property {string} description Should include possible values if applicable.
 * @property {string} [requirements] Plaintext description of requirements to use this getter.
 * @property {()=>boolean} [enabled] Whether the getter can be used.
 * @property {()=>boolean} [visible] Whether the getter should be shown. Mainly intended for disabled mods.
 * @property {(s: App.RA.Activation.Context) =>T} val
 */

App.RA.Activation.getterManager = (function() {
	class GetterManager {
		constructor() {
			/**
			 * @private
			 * @type {Map<string, Getter<boolean>>}
			 */
			this._booleanGetters = new Map();
			/**
			 * @private
			 * @type {Map<string, Getter<boolean>>}
			 */
			this._assignmentGetters = new Map();
			/**
			 * @private
			 * @type {Map<string, Getter<number>>}
			 */
			this._numberGetters = new Map();
			/**
			 * @private
			 * @type {Map<string, Getter<string>>}
			 */
			this._stringGetters = new Map();
		}

		/**
		 * @param {string} key
		 * @private
		 */
		_validateKey(key) {
			if (!/[a-zA-Z]/.test(key.first())) {
				throw new Error(`Invalid Key: ${key}; The first character of a getter key has to be alphabetic`);
			}
		}

		/**
		 * @param {string} key
		 * @param {Getter<boolean>} getter
		 */
		addBoolean(key, getter) {
			this._validateKey(key);
			this._booleanGetters.set(key, getter);
		}

		/**
		 * @param {string} key
		 * @param {Getter<boolean>} getter
		 */
		addAssignment(key, getter) {
			this._validateKey(key);
			this._assignmentGetters.set(key, getter);
		}

		/**
		 * @param {string} key
		 * @param {Getter<number>} getter
		 */
		addNumber(key, getter) {
			this._validateKey(key);
			this._numberGetters.set(key, getter);
		}

		/**
		 * @param {string} key
		 * @param {Getter<string>} getter
		 */
		addString(key, getter) {
			this._validateKey(key);
			this._stringGetters.set(key, getter);
		}

		/**
		 * @param {string} key
		 * @returns {boolean}
		 */
		has(key) {
			return this._booleanGetters.has(key) || this._assignmentGetters.has(key) ||
				this._numberGetters.has(key) || this._stringGetters.has(key);
		}

		/**
		 * @param {string} key
		 * @returns {boolean}
		 */
		isBoolean(key) {
			return this._booleanGetters.has(key);
		}

		/**
		 * @param {string} key
		 * @returns {boolean}
		 */
		isAssignment(key) {
			return this._assignmentGetters.has(key);
		}

		/**
		 * @param {string} key
		 * @returns {boolean}
		 */
		isNumber(key) {
			return this._numberGetters.has(key);
		}

		/**
		 * @param {string} key
		 * @returns {boolean}
		 */
		isString(key) {
			return this._stringGetters.has(key);
		}

		/**
		 * @returns {ReadonlyMap<string, Getter<boolean>>}
		 */
		get booleanGetters() {
			return this._booleanGetters;
		}

		/**
		 * @returns {ReadonlyMap<string, Getter<boolean>>}
		 */
		get assignmentGetters() {
			return this._assignmentGetters;
		}

		/**
		 * @returns {ReadonlyMap<string, Getter<number>>}
		 */
		get numberGetters() {
			return this._numberGetters;
		}

		/**
		 * @returns {ReadonlyMap<string, Getter<string>>}
		 */
		get stringGetters() {
			return this._stringGetters;
		}

		/**
		 * @returns {string}
		 */
		get booleanDefault() {
			return this._booleanGetters.keys().next().value;
		}

		/**
		 * @returns {string}
		 */
		get assignmentDefault() {
			return this._assignmentGetters.keys().next().value;
		}

		/**
		 * @returns {string}
		 */
		get numberDefault() {
			return this._numberGetters.keys().next().value;
		}

		/**
		 * @returns {string}
		 */
		get stringDefault() {
			return this._stringGetters.keys().next().value;
		}

		/**
		 * @param {App.RA.Activation.Stack} stack
		 * @param {App.RA.Activation.Context} context
		 * @param {string} key
		 * @returns {boolean} True, if a getter exists for the given key
		 */
		read(stack, context, key) {
			let getterB = this._booleanGetters.get(key);
			if (getterB !== undefined) {
				stack.pushBoolean(getterB.val(context));
				return true;
			}
			getterB = this._assignmentGetters.get(key);
			if (getterB !== undefined) {
				stack.pushBoolean(getterB.val(context));
				return true;
			}
			const getterN = this._numberGetters.get(key);
			if (getterN !== undefined) {
				stack.pushNumber(getterN.val(context));
				return true;
			}
			const getterS = this._stringGetters.get(key);
			if (getterS !== undefined) {
				stack.pushString(getterS.val(context));
				return true;
			}
			return false;
		}
	}

	return new GetterManager();
})();

App.RA.Activation.populateGetters = function() {
	const gm = App.RA.Activation.getterManager;
	// Note: The first value of each type being added is taken as the default.

	// Booleans
	gm.addBoolean("isfertile", {
		name: "Is Fertile?", description: "Whether or not the slave is fertile.",
		val: c => isFertile(c.slave)
	});
	gm.addBoolean("isvirile", {
		name: "Is Virile?", description: "Whether or not the slave is virile, has fertile sperm.",
		val: c => isVirile(c.slave)
	});
	gm.addBoolean("isamputee", {
		name: "Is Amputee?", description: "Whether or not the slave has no limbs.",
		val: c => isAmputee(c.slave)
	});
	gm.addBoolean("ispregnant", {
		name: "Is Pregnant?", description: "Whether or not the slave is pregnant.",
		val: c => c.slave.preg > 0
	});
	gm.addBoolean("isslim", {
		name: "Is Slim?", description: "If the slave is considered slim or not by arcology standards.",
		val: c => isSlim(c.slave)
	});
	gm.addBoolean("isstacked", {
		name: "Is Stacked?", description: "If the slave is considered stacked (big T&A) or not.",
		val: c => isStacked(c.slave)
	});
	gm.addBoolean("ismodded", {
		name: "Is Modded?", description: "If the slave is considered heavily modded or not.",
		val: c => SlaveStatsChecker.isModded(c.slave)
	});
	gm.addBoolean("isunmodded", {
		name: "Is Unmodded?", description: "If the slave is (relatively) unmodded.",
		val: c => SlaveStatsChecker.isUnmodded(c.slave)
	});
	gm.addBoolean("canmove", {
		name: "Can Move?", description: "Can the slave move at all?",
		val: c => canMove(c.slave)
	});
	gm.addBoolean("canstand", {
		name: "Can Stand?", description: "Can the slave stand independently?",
		val: c => canStand(c.slave)
	});
	gm.addBoolean("canwalk", {
		name: "Can Walk?", description: "Can the slave walk independently; if they can, they can move and stand too.",
		val: c => canWalk(c.slave)
	});
	gm.addBoolean("hasinternalballs", {
		name: "Has Internal Balls?", description: "If the slave has internal balls. False, if the slave has no balls",
		val: c => c.slave.balls > 0 && c.slave.scrotum === 0
	});
	gm.addBoolean("ismindbroken", {
		name: "Is Mindbroken?", description: "If the slave is mindbroken",
		val: c => isMindbroken(c.slave)
	});

	// Assignments
	// Groups
	gm.addAssignment("any_penthouse", {
		name: "Penthouse", description: "Serving in your penthouse.",
		val: c =>
			[
				Job.REST, Job.FUCKTOY, Job.HOUSE, Job.WHORE, Job.PUBLIC, Job.SUBORDINATE, Job.MILKED, Job.GLORYHOLE,
				Job.CONFINEMENT, Job.CHOICE
			].includes(c.slave.assignment)
	});
	gm.addAssignment("any_leader", {
		name: "Leader", description: "Serving in any leadership position.",
		val: c =>
			[
				Job.BODYGUARD, Job.HEADGIRL, Job.RECRUITER, Job.AGENT, Job.AGENTPARTNER, Job.MADAM, Job.WARDEN, Job.DJ,
				Job.NURSE, Job.MILKMAID, Job.FARMER, Job.CONCUBINE, Job.MATRON, Job.TEACHER, Job.STEWARD, Job.ATTENDANT
			].includes(c.slave.assignment)
	});
	gm.addAssignment("any_facility", {
		name: "Facility", description: "Serving in any facility.",
		val: c =>
			[
				Job.ARCADE, Job.BROTHEL, Job.CELLBLOCK, Job.CLUB, Job.CLINIC, Job.DAIRY, Job.FARMYARD,
				Job.HEADGIRLSUITE, Job.MASTERSUITE, Job.NURSERY, Job.SCHOOL, Job.QUARTER, Job.SPA
			].includes(c.slave.assignment)
	});
	// Penthouse Assignments
	gm.addAssignment("rest", {
		name: "Resting", description: "Resting in the penthouse.",
		val: c => c.slave.assignment === Job.REST
	});
	gm.addAssignment("fucktoy", {
		name: "Fucktoy", description: "Pleasing the master.",
		val: c => c.slave.assignment === Job.FUCKTOY
	});
	gm.addAssignment("classes", {
		name: "Taking classes", description: "Taking classes to better serve.",
		val: c => c.slave.assignment === Job.CLASSES
	});
	gm.addAssignment("house", {
		name: "Cleaning", description: "Cleaning the penthouse.",
		val: c => c.slave.assignment === Job.HOUSE
	});
	gm.addAssignment("whore", {
		name: "Whoring", description: "Whoring themself out.",
		val: c => c.slave.assignment === Job.WHORE
	});
	gm.addAssignment("public", {
		name: "Serving public", description: "Serving the public.",
		val: c => c.slave.assignment === Job.PUBLIC
	});
	gm.addAssignment("subordinate", {
		name: "Subordinate", description: "Subordinate to other slaves.",
		val: c => c.slave.assignment === Job.SUBORDINATE
	});
	gm.addAssignment("milked", {
		name: "Milked", description: "Getting milked.",
		val: c => c.slave.assignment === Job.MILKED
	});
	gm.addAssignment("gloryhole", {
		name: "Glory hole", description: "Working as a glory hole.",
		val: c => c.slave.assignment === Job.GLORYHOLE
	});
	gm.addAssignment("confinement", {
		name: "Confined", description: "Confined at the penthouse.",
		val: c => c.slave.assignment === Job.CONFINEMENT
	});
	gm.addAssignment("choice", {
		name: "Choose own", description: "Allowed to choose their own job.",
		val: c => c.slave.assignment === Job.CHOICE
	});
	// Leadership Assignments
	gm.addAssignment("bodyguard", {
		name: "Bodyguard", description: "Serving as Bodyguard.",
		requirements: "Armory is built.", enabled: () => App.Entity.facilities.armory.established,
		val: c => c.slave.assignment === Job.BODYGUARD
	});
	gm.addAssignment("headgirl", {
		name: "Head Girl", description: "Serving as Head Girl",
		val: c => c.slave.assignment === Job.HEADGIRL
	});
	gm.addAssignment("recruiter", {
		name: "Recruiter", description: "Recruiting new slaves.",
		val: c => c.slave.assignment === Job.RECRUITER
	});
	gm.addAssignment("agent", {
		name: "Agent", description: "Serving as an Agent in another arcology.",
		val: c => c.slave.assignment === Job.AGENT
	});
	gm.addAssignment("agentpartner", {
		name: "Agent partner", description: "Serving an agent living in another arcology.",
		val: c => c.slave.assignment === Job.AGENTPARTNER
	});
	// Facility Assignments
	gm.addAssignment("arcade", {
		name: "Confined in arcade", description: "Confined in the arcade.",
		requirements: "Arcade is built.", enabled: ()=>App.Entity.facilities.arcade.established,
		val: c => c.slave.assignment === Job.ARCADE
	});
	gm.addAssignment("madam", {
		name: "Madam", description: "Serving as Madam.",
		requirements: "Brothel is built.", enabled: ()=>App.Entity.facilities.brothel.established,
		val: c => c.slave.assignment === Job.MADAM
	});
	gm.addAssignment("brothel", {
		name: "Brothel whoring?", description: "Working in the brothel.",
		requirements: "Brothel is built.", enabled: ()=>App.Entity.facilities.brothel.established,
		val: c => c.slave.assignment === Job.BROTHEL
	});
	gm.addAssignment("warden", {
		name: "Wardeness", description: "Serving as Wardeness.",
		requirements: "Cellblock is built.", enabled: ()=>App.Entity.facilities.cellblock.established,
		val: c => c.slave.assignment === Job.WARDEN
	});
	gm.addAssignment("cellblock", {
		name: "Confined in cellblock?", description: "Confined in the cellblock.",
		requirements: "Cellblock is built.", enabled: ()=>App.Entity.facilities.cellblock.established,
		val: c => c.slave.assignment === Job.CELLBLOCK
	});
	gm.addAssignment("dj", {
		name: "DJ", description: "Serving as DJ.",
		requirements: "Club is built.", enabled: ()=>App.Entity.facilities.club.established,
		val: c => c.slave.assignment === Job.DJ
	});
	gm.addAssignment("club", {
		name: "Serving club", description: "Serving in the club.",
		requirements: "Club is built.", enabled: ()=>App.Entity.facilities.club.established,
		val: c => c.slave.assignment === Job.CLUB
	});
	gm.addAssignment("nurse", {
		name: "Nurse", description: "Serving as Nurse.",
		requirements: "Clinic is built.", enabled: ()=>App.Entity.facilities.clinic.established,
		val: c => c.slave.assignment === Job.NURSE
	});
	gm.addAssignment("clinic", {
		name: "Getting treatment", description: "Getting treatment in the clinic.",
		requirements: "Clinic is built.", enabled: ()=>App.Entity.facilities.clinic.established,
		val: c => c.slave.assignment === Job.CLINIC
	});
	gm.addAssignment("milkmaid", {
		name: "Milkmaid", description: "Serving as Milkmaid",
		requirements: "Dairy is built.", enabled: ()=>App.Entity.facilities.dairy.established,
		val: c => c.slave.assignment === Job.MILKMAID
	});
	gm.addAssignment("dairy", {
		name: "Work dairy", description: "Working in the dairy",
		requirements: "Dairy is built.", enabled: ()=>App.Entity.facilities.dairy.established,
		val: c => c.slave.assignment === Job.DAIRY
	});
	gm.addAssignment("farmer", {
		name: "Farmer", description: "Serving as Farmer",
		requirements: "Farmyard is built.", enabled: ()=>App.Entity.facilities.farmyard.established,
		val: c => c.slave.assignment === Job.FARMER
	});
	gm.addAssignment("farmyard", {
		name: "Farmhand", description: "Working as a farmhand.",
		requirements: "Farmyard is built.", enabled: ()=>App.Entity.facilities.farmyard.established,
		val: c => c.slave.assignment === Job.FARMYARD
	});
	gm.addAssignment("headgirlsuite", {
		name: "Head Girl Servant", description: "Living with the Head Girl.",
		requirements: "Head Girl Suite is built.", enabled: ()=>App.Entity.facilities.headGirlSuite.established,
		val: c => c.slave.assignment === Job.HEADGIRLSUITE
	});
	gm.addAssignment("concubine", {
		name: "Concubine", description: "Serving as Concubine.",
		requirements: "Master suite is built.", enabled: ()=>App.Entity.facilities.masterSuite.established,
		val: c => c.slave.assignment === Job.CONCUBINE
	});
	gm.addAssignment("mastersuite", {
		name: "Master suite servant", description: "Serving in the master suite.",
		requirements: "Master suite is built.", enabled: ()=>App.Entity.facilities.masterSuite.established,
		val: c => c.slave.assignment === Job.MASTERSUITE
	});
	gm.addAssignment("matron", {
		name: "Matron", description: "Serving as Matron.",
		requirements: "Nursery is built.", enabled: ()=>App.Entity.facilities.nursery.established,
		visible: () => V.experimental.nursery > 0,
		val: c => c.slave.assignment === Job.MATRON
	});
	gm.addAssignment("nursery", {
		name: "Nanny", description: "Working as a nanny.",
		requirements: "Nursery is built.", enabled: ()=>App.Entity.facilities.nursery.established,
		visible: () => V.experimental.nursery > 0,
		val: c => c.slave.assignment === Job.NURSERY
	});
	gm.addAssignment("teacher", {
		name: "Schoolteacher", description: "Serving as Schoolteacher.",
		requirements: "Schoolroom is built.", enabled: ()=>App.Entity.facilities.schoolroom.established,
		val: c => c.slave.assignment === Job.TEACHER
	});
	gm.addAssignment("school", {
		name: "Learning", description: "Learning in the schoolroom.",
		requirements: "Schoolroom is built.", enabled: ()=>App.Entity.facilities.schoolroom.established,
		val: c => c.slave.assignment === Job.SCHOOL
	});
	gm.addAssignment("steward", {
		name: "Stewardess", description: "Serving as Stewardess.",
		requirements: "Servants Quarters are built.",
		enabled: ()=>App.Entity.facilities.servantsQuarters.established,
		val: c => c.slave.assignment === Job.STEWARD
	});
	gm.addAssignment("quarter", {
		name: "Servant", description: "Working as a servant in the Servants Quarters.",
		requirements: "Servants Quarters are built.",
		enabled: ()=>App.Entity.facilities.servantsQuarters.established,
		val: c => c.slave.assignment === Job.QUARTER
	});
	gm.addAssignment("attendant", {
		name: "Attendant", description: "Serving as Attendant.",
		requirements: "Spa is built.", enabled: ()=>App.Entity.facilities.spa.established,
		val: c => c.slave.assignment === Job.ATTENDANT
	});
	gm.addAssignment("spa", {
		name: "Spa resting", description: "Resting in the spa.",
		requirements: "Spa is built.", enabled: () => App.Entity.facilities.spa.established,
		val: c => c.slave.assignment === Job.SPA
	});

	// Numbers
	gm.addNumber("devotion", {
		name: "Devotion",
		description: "Very Hateful: (-∞, -95), Hateful: [-95, -50), Resistant: [-50, -20), Ambivalent: [-20, 20], " +
			"Accepting: (20, 50], Devoted: (50, 95], Worshipful: (95, ∞)",
		val: c => c.slave.devotion
	});
	gm.addNumber("trust", {
		name: "Trust",
		description: "Extremely terrified: (-∞, -95), Terrified: [-95, -50), Frightened: [-50, -20), " +
			"Fearful: [-20, 20], Careful: (20, 50], Trusting: (50, 95], Total trust: (95, ∞)",
		val: c => c.slave.trust
	});
	gm.addNumber("health", {
		name: "Health",
		description: "Death: (-∞, -100), Near Death: [-100, -90), Extremely Unhealthy: [-90, -50), " +
			"Unhealthy: [-50, -20), Healthy: [-20, 20], Very Healthy: (20, 50], Extremely Healthy: (50, 90], " +
			"Unnaturally Healthy: (90, ∞)",
		val: c => c.slave.health.condition
	});
	gm.addNumber("fatigue", {
		name: "Fatigue",
		description: "Energetic: (-∞, 0], Rested: (0, 30], Tired: (30, 60], Fatigued: (60, 90], Exhausted: (90, ∞)",
		val: c => c.slave.health.tired
	});
	gm.addNumber("illness", {
		name: "Illness",
		description: "0: Not ill, 1: A little under the weather, 2: Slightly ill, can be treated at the clinic, " +
			"3: Ill, can be treated at the clinic, 4: Very ill, can be treated at the clinic, " +
			"5: Terribly ill, can be treated at the clinic",
		val: c => c.slave.health.illness
	});
	gm.addNumber("energy", {
		name: "Sex drive",
		description: "Frigid: (-∞, 20], Poor: (20, 40], Average: (40, 60], Powerful: (60, 80], " +
			"Sex Addict: (80, 100), Nympho: 100",
		val: c => c.slave.energy
	});
	gm.addNumber("weight", {
		name: "Weight",
		description: "Emaciated: (-∞, -95), Skinny: [-95, -30), Thin: [-30, -10), Average: [-10, 10], " +
			"Plush: (10, 30], Overweight: (30, 95], Fat: (95, 130], Obese: (130, 160], Super Obese: (160, 190], " +
			"Dangerously Obese: (190, ∞)",
		val: c => c.slave.weight
	});
	gm.addNumber("height", {name: "Height", description: "Slave height in cm.", val: c => c.slave.height});
	gm.addNumber("age", {name: "Age", description: "Real slave age", val: c => c.slave.actualAge});
	gm.addNumber("physicalAge", {
		name: "Body Age", description: "Age of the slave's body.",
		val: c => c.slave.physicalAge
	});
	gm.addNumber("visualAge", {
		name: "Visible Age", description: "How old the slave looks.",
		val: c => c.slave.visualAge
	});
	gm.addNumber("muscles", {
		name: "Muscles",
		description: "Frail: (-∞, -96), Very weak: [-96, -31], Weak: [-31, -6), Soft: [-6, 5), Toned: [5, 30), " +
			"Fit: [30, 50), Muscular: [50, 95), Hugely muscular: [95, ∞)",
		val: c => c.slave.muscles
	});
	gm.addNumber("lactation", {
		name: "Lactation", description: "0: None, 1: Natural, 2: Lactation implant",
		val: c => c.slave.lactation
	});
	gm.addNumber("pregType", {
		name: "Pregnancy Multiples", description: "Fetus count, known only after the 10th week of pregnancy",
		val: c => c.slave.pregType
	});
	gm.addNumber("pregWeeks", {
		name: "Pregnancy Progress", description: "Fetal development status, in weeks equivalent to unaccelerated pregnancy. Negative is postpartum.",
		val: c => c.slave.pregWeek
	});
	gm.addNumber("bellyImplant", {
		name: "Belly Implant", description: "Volume in CCs. None: -1",
		val: c => c.slave.bellyImplant
	});
	gm.addNumber("belly", {
		name: "Belly Size", description: "Volume in CCs, any source",
		val: c => c.slave.belly
	});
	gm.addNumber("intelligenceImplant", {
		name: "Education",
		description: "Education level. 0: uneducated, 15: educated, 30: advanced education, " +
			"(0, 15): incomplete education.",
		val: c => c.slave.intelligenceImplant
	});
	gm.addNumber("intelligence", {
		name: "Intelligence", description: "From moronic to brilliant: [-100, 100]",
		val: c => c.slave.intelligence
	});
	gm.addNumber("face", {
		name: "Face", description: "Very Ugly: (-∞, -96), Ugly: [-96, -40), Unattractive: [-40, -10), " +
			"Average: [-10, 10), Attractive: [10, 40), Beautiful: [40, 95), Very beautiful: [95, ∞)",
		val: c => c.slave.face
	});
	gm.addNumber("beautyscore", {
		name: "Beauty Score", description: "As seen in the slave description",
		val: c => Beauty(c.slave)
	});
	gm.addNumber("sexscore", {
		name: "Sexual Score", description: "As seen in the slave description",
		val: c => FResult(c.slave)
	});
	gm.addNumber("accent", {
		name: "Accent", description: "No accent: 0, Nice accent: 1, Bad accent: 2, Can't speak language: 3 and above",
		val: c => c.slave.accent
	});
	gm.addNumber("waist", {
		name: "Waist",
		description: "Masculine waist: (95, ∞), Ugly waist: (40, 95], Unattractive waist: (10, 40], " +
			"Average waist: [-10, 10], Feminine waist: [-40, -10), Wasp waist: [-95, -40), Absurdly narrow: (-∞, -95)",
		val: c => c.slave.waist
	});
	gm.addNumber("chem", {
		name: "Carcinogen Buildup",
		description: "Side effects from drug use. If greater than 10 will have negative consequences.",
		val: c => c.slave.chem
	});
	gm.addNumber("addict", {
		name: "Aphrodisiac Addiction",
		description: "No addiction: 0, Minor addiction: 1-2, Serious addiction: 3 and above",
		val: c => c.slave.addict
	});
	gm.addNumber("boobs", {
		name: "Breasts",
		description: "0-299: Flat, 300-399: A-cup, 400-499: B-cup, 500-649: C-cup, 650-799: D-cup, 00-999: DD-cup, " +
			"1000-1199: F-cup, 1200-1399: G-cup, 1400-1599: H-cup, 1600-1799: I-cup, 1800-2049: J-cup, " +
			"2050-2299: K-cup, 2300-2599: L-cup, 2600-2899: M-cup, 2900-3249: N-cup, 3250-3599: O-cup, " +
			"3600-3949: P-cup, 3950-4299: Q-cup, 4300-4699: R-cup, 4700-5099: S-cup, 5100-10499: Massive",
		val: c => c.slave.boobs
	});
	gm.addNumber("dick", {
		name: "Dick",
		description: "None: 0, Tiny: 1, Little: 2, Normal: 3, Big: 4, Huge: 5, Gigantic: 6, Massive: 7, Titanic: 8, " +
			"Monstrous: 9, Inhuman: 10, Hypertrophied: 11+",
		val: c => c.slave.dick
	});
	gm.addNumber("balls", {
		name: "Balls",
		description: "None: 0, Vestigial: 1, Small: 2, Average: 3, Large: 4, Massive: 5, Huge: 6, Gigantic: 7, " +
			"Enormous: 8, Monstrous: 9, Hypertrophied: 11+",
		val: c => c.slave.balls
	});
	gm.addNumber("clit", {
		name: "Clit",
		description: "Normal: 0, Large: 1, Huge: 2, Enormous: 3, Gigantic: 4, Massive: 5",
		val: c => c.slave.clit
	});
	gm.addNumber("labia", {
		name: "Labia",
		description: "Minimal: 0, Normal: 1, Large: 2, Huge: 3",
		val: c => c.slave.labia
	});
	gm.addNumber("lips", {
		name: "Lips",
		description: "Thin: (-∞, 10), Normal: [10, 20), Pretty: [20, 40), Plush: [40, 70), Huge (lisping): [70, 95), " +
			"Facepussy (mute): [95, ∞)",
		val: c => c.slave.lips
	});
	gm.addNumber("butt", {
		name: "Butt",
		description: "Flat: 0, Less flat: 1, Small: 2, Big: 3, Large: 4, Huge: 5, Enormous: 6, Gigantic: 7, " +
			"Ridiculous: 8, Immense: 9-10, Inhuman: 11-20",
		val: c => c.slave.butt
	});
	gm.addNumber("hips", {
		name: "Hips",
		description: "Very narrow: -2, Narrow: -1, Normal: 0, Wide hips: 1, Very wide hips: 2, Inhumanly wide hips: 3",
		val: c => c.slave.hips
	});
	gm.addNumber("shoulders", {
		name: "Shoulders",
		description: "Very narrow: -2, Narrow: -1, Feminine: 0, Broad: 1, Very broad: 2",
		val: c => c.slave.shoulders
	});
	gm.addNumber("vagina", {
		name: "Vagina Size",
		description: "No Vagina: -1, Virgin: 0, Tight: 1, higher numbers are looser.",
		val: c => c.slave.vagina
	});
	gm.addNumber("anus", {
		name: "Anus Size",
		description: "Virgin: 0, Tight: 1, higher numbers are looser.",
		val: c => c.slave.anus
	});
	gm.addNumber("wetness", {
		name: "Vaginal Wetness",
		description: "How easily the slave gets wet: dry: 0, wet: 1, soaking wet: 2",
		val: c => c.slave.vaginaLube
	});
	gm.addNumber("hormonebalance", {
		name: "Hormone Balance",
		description: "Absolutely masculine: (-∞, -500], Overwhelmingly masculine: (-500, -400], " +
			"Extremely masculine: (-400, -300], Heavily masculine: (-300, -200], Very masculine: (-200, -100], " +
			"Masculine: (-100, -20), Neutral: [-20, 20], Feminine: (20, 100), Very feminine: [100, 200), " +
			"Heavily feminine: [200, 300), Extremely feminine: [300, 400), Overwhelmingly feminine: [400, 500), " +
			"Absolutely feminine: [500, ∞)",
		val: c => c.slave.hormoneBalance
	});
	gm.addNumber("oralskill", {
		name: "Oral Skill",
		description: "Unskilled: (-∞, 10), Basic: [10, 30), Skilled: [30, 60), Expert: [60, 99), Master: [99, ∞)",
		val: c => c.slave.skill.oral
	});
	gm.addNumber("analskill", {
		name: "Anal Skill",
		description: "Unskilled: (-∞, 10), Basic: [10, 30), Skilled: [30, 60), Expert: [60, 99), Master: [99, ∞)",
		val: c => c.slave.skill.anal
	});
	gm.addNumber("vaginalskill", {
		name: "Vaginal Skill",
		description: "Unskilled: (-∞, 10), Basic: [10, 30), Skilled: [30, 60), Expert: [60, 99), Master: [99, ∞)",
		val: c => c.slave.skill.vaginal
	});
	gm.addNumber("penetrativeskill", {
		name: "Penetrative Skill",
		description: "Unskilled: (-∞, 10), Basic: [10, 30), Skilled: [30, 60), Expert: [60, 99), Master: [99, ∞)",
		val: c => c.slave.skill.penetrative
	});
	gm.addNumber("whoringskill", {
		name: "Whoring Skill",
		description: "Unskilled: (-∞, 10), Basic: [10, 30), Skilled: [30, 60), Expert: [60, 99), Master: [99, ∞)",
		val: c => c.slave.skill.whoring
	});
	gm.addNumber("entertainmentskill", {
		name: "Entertainment Skill",
		description: "Unskilled: (-∞, 10), Basic: [10, 30), Skilled: [30, 60), Expert: [60, 99), Master: [99, ∞)",
		val: c => c.slave.skill.entertainment
	});
	gm.addNumber("combatskill", {
		name: "Combat Skill",
		description: "Unskilled: (-∞, 10), Basic: [10, 30), Skilled: [30, 60), Expert: [60, 99), Master: [99, ∞)",
		val: c => c.slave.skill.combat
	});

	// Strings
	gm.addString("label", {name: "Label", description: "Assigned Label", val: c => c.slave.custom.label});
	gm.addString("genes", {
		name: "Genetic sex", description: "Genetic sex: Female: XX, Male: XY",
		val: c => c.slave.genes
	});
	gm.addString("phenotypesex", {
		name: "Phenotype sex",
		description: "A three-character string that encodes state of sexual organs" +
			" as female('X'), male('Y'), both ('H'), or absent ('-'): vagina/dick, ovaries/balls, tits",
		val: c => phenotypeSex(c.slave)
	});
	gm.addString("fetish", {
		name: "Fetish",
		description: "One of 'buttslut', 'cumslut', 'masochist', 'sadist', 'dom', 'submissive', 'boobs', " +
			"'pregnancy', 'none' (AKA vanilla)",
		val: c => c.slave.fetish
	});
	gm.addString("teeth", {
		name: "Teeth",
		description: "One of 'normal', 'crooked', 'gapped', 'straightening braces', 'cosmetic braces', 'removable', 'pointy', 'fangs', 'fang', 'baby', 'mixed'",
		val: c => c.slave.teeth
	});
	gm.addString("faceshape", {
		name: "Face Shape",
		description: "One of 'normal', 'masculine', 'androgynous', 'cute', 'sensual', 'exotic', 'feline' (catmod only)",
		val: c => c.slave.faceShape
	});
	gm.addString("nippleshape", {
		name: "Nipple Shape",
		description: "One of 'huge', 'puffy', 'inverted', 'tiny', 'cute', 'partially inverted', 'fuckable', 'flat'",
		val: c => c.slave.nipples
	});
	gm.addString("title", {
		name: "Title",
		description: "Slave title (class) without adjectives (slavegirl, MILF, bimbo, shemale, herm, etc.). ",
		requirements: "The alternate titles game option is enabled",
		enabled: () => V.newDescriptions === 1,
		val: c => SlaveTitle(c.slave, false, false)
	});
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {FC.RA.PostFixRule} rule
 * @returns {boolean} If the rule should be applied to the given slave
 */
App.RA.Activation.evaluate = function(slave, rule) {
	const gm = App.RA.Activation.getterManager;
	const context = new App.RA.Activation.Context(slave);
	const stack = new App.RA.Activation.Stack();

	/**
	 * @type {Map<string, function(): void>}
	 */
	const operators = new Map([
		// and, or, +, * can take arbitrarily many arguments, so the first one describes the argument count
		["and", () => {
			const length = stack.popNumber();
			let value = 1;
			for (let i = 0; i < length; i++) {
				value &= stack.popAsBoolean();
			}
			stack.pushNumber(value);
		}],
		["or", () => {
			const length = stack.popNumber();
			let value = 0;
			for (let i = 0; i < length; i++) {
				value |= stack.popAsBoolean();
			}
			stack.pushNumber(value);
		}],
		["add", () => {
			const length = stack.popNumber();
			let value = 0;
			for (let i = 0; i < length; i++) {
				value += stack.popNumber();
			}
			stack.pushNumber(value);
		}],
		["mul", () => {
			const length = stack.popNumber();
			let value = 1;
			for (let i = 0; i < length; i++) {
				value *= stack.popNumber();
			}
			stack.pushNumber(value);
		}],
		["max", () => {
			const length = stack.popNumber();
			let value = stack.popNumber();
			for (let i = 1; i < length; i++) {
				value = Math.max(value, stack.popNumber());
			}
			stack.pushNumber(value);
		}],
		["min", () => {
			const length = stack.popNumber();
			let value = stack.popNumber();
			for (let i = 1; i < length; i++) {
				value = Math.min(value, stack.popNumber());
			}
			stack.pushNumber(value);
		}],
		["sub", () => {
			const subtract = stack.popNumber();
			stack.pushNumber(stack.popNumber() - subtract);
		}],
		["div", () => {
			const divisor = stack.popNumber();
			stack.pushNumber(stack.popNumber() / divisor);
		}],
		["eqstr", () => stack.pushBoolean(stack.popString() === stack.popString())],
		["neqstr", () => stack.pushBoolean(stack.popString() !== stack.popString())],
		["eqnum", () => stack.pushBoolean(stack.popNumber() === stack.popNumber())],
		["neqnum", () => stack.pushBoolean(stack.popNumber() === stack.popNumber())],
		["gt", () => stack.pushBoolean(stack.popNumber() < stack.popNumber())],
		["gte", () => stack.pushBoolean(stack.popNumber() <= stack.popNumber())],
		["lt", () => stack.pushBoolean(stack.popNumber() > stack.popNumber())],
		["lte", () => stack.pushBoolean(stack.popNumber() >= stack.popNumber())],
		["substr", () => {
			const value = stack.popString();
			stack.pushBoolean(stack.popString().includes(value));
		}],
		["match", () => {
			const value = stack.popString();
			stack.pushBoolean(stack.popString().match(value) !== null);
		}],
		["not", () => stack.pushBoolean(stack.popNumber() === 0)],
		["ternarystr", () => {
			const ifFalse = stack.popString();
			const ifTrue = stack.popString();
			stack.pushString(stack.popNumber() ? ifTrue : ifFalse);
		}],
		["ternarynum", () => {
			const ifFalse = stack.popNumber();
			const ifTrue = stack.popNumber();
			stack.pushNumber(stack.popNumber() ? ifTrue : ifFalse);
		}],
	]);

	/**
	 * Custom getters start with "?" and then "b", "n" or "s" depending on return type
	 * @param {string} rulePart
	 */
	function evalCustom(rulePart) {
		const expectedType = rulePart.charAt(1) === "b" ? "boolean"
			: rulePart.charAt(1) === "n" ? "number"
				: "string";
		try {
			// TODO: Can we cache the function (and is that useful)?
			const value = (new Function("c", `return (${rulePart.slice(2)})(c)`))(context);
			if (expectedType === "boolean") {
				stack.pushNumber(value ? 1 : 0);
			} else if (expectedType === "number") {
				stack.pushNumber(value);
			} else {
				// no guarantee we are getting a string, and it's easy to ensure it is one.
				stack.pushString(value.toString());
			}
		} catch (e) {
			throw new Error(`Custom condition '${rulePart.slice(2)}' failed: '${e.message}'`);
		}
	}

	for (const rulePart of rule) {
		if (typeof rulePart === "string") {
			const operation = operators.get(rulePart);
			if (operation !== undefined) {
				operation();
			} else {
				const result = gm.read(stack, context, rulePart);
				if (!result) {
					if (rulePart.startsWith("?")) {
						evalCustom(rulePart);
					} else {
						stack.pushString(rulePart.slice(1));
					}
				}
			}
		} else if (typeof rulePart === "number") {
			stack.pushNumber(rulePart);
		} else {
			stack.pushBoolean(rulePart);
		}
	}
	return !!stack.popNumber();
};
