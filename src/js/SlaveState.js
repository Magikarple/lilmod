/**
 * Encapsulates the full description of a slave state. Serializable by the SugarCube state
 * management.
 */

/**
 * Encapsulates sexual release rules to be followed by a slave. Used inside of the
 * App.Entity.RuleState class.
 * @see App.Entity.RuleState
 */
App.Entity.ReleaseRulesState = class ReleaseRulesState {
	constructor() {
		/** Can the slave masturbate?
		 * @type {FC.Bool} */
		this.masturbation = 0;
		/** Can the slave fuck her romantic partner (relationship = FWB or higher)?
		 * @type {FC.Bool} */
		this.partner = 1;
		/** Can the slave's development facility leader (Nurse, Attendant, etc) fuck her if she needs it?
		 * @type {FC.Bool} */
		this.facilityLeader = 1;
		/** Can the slave fuck her close family members (siblings/parents/children)?
		 * @type {FC.Bool} */
		this.family = 0;
		/** Can the slave fuck the general slave population?
		 * @type {FC.Bool} */
		this.slaves = 0;
		/** Will the master allow her to solicit sex from him?
		 * @type {FC.Bool} */
		this.master = 1;
	}
};

/**
 * Encapsulates rules to be followed by a slave. Used inside of the
 * App.Entity.SlaveState class.
 * @see App.Entity.SlaveState
 */
App.Entity.RuleState = class RuleState {
	constructor() {
		/**
		 * * "spare"
		 * * "normal"
		 * * "luxurious"
		 * @type {FC.Rules.Living}
		 */
		this.living = "spare";
		/**
		 * * "none"
		 * * "cruel"
		 * * "restrictive"
		 * * "permissive"
		 * * "mandatory"
		 * @type {FC.Rules.Rest}
		 */
		this.rest = "restrictive";
		/**
		 * Is the slave allowed to use mobility aids
		 * * "restrictive"
		 * * "permissive"
		 * @type {FC.Rules.Mobility}
		 */
		this.mobility = "restrictive";
		/**
		 * * "restrictive"
		 * * "permissive"
		 * * "accent elimination"
		 * * "language lessons"
		 * @type {FC.Rules.Speech}
		 */
		this.speech = "restrictive";
		/** release rules */
		this.release = new App.Entity.ReleaseRulesState();
		/**
		 * * "restrictive"
		 * * "just friends"
		 * * "permissive"
		 * @type {FC.Rules.Relationship}
		 */
		this.relationship = "restrictive";
		/**
		 * * "none"
		 * * "induce"
		 * * "maintain"
		 * @type {FC.Rules.Lactation}
		 */
		this.lactation = "none";
		/**
		 * * "confinement"
		 * * "whipping"
		 * * "chastity"
		 * * "situational"
		 * @type {FC.Rules.Punishment}
		 */
		this.punishment = "situational";
		/**
		 * * "relaxation"
		 * * "drugs"
		 * * "orgasm"
		 * * "situational"
		 * @type {FC.Rules.Reward}
		 */
		this.reward = "situational";
	}
};

/**
 * Encapsulates porn performance of a slave. Used inside of the
 * App.Entity.SlaveState class.
 * @see App.Entity.SlaveState
 */
App.Entity.SlavePornPerformanceState = class {
	constructor() {
		/** is the studio outputting porn of her?
		 * 0: no; 1: yes
		 * @type {FC.Bool} */
		this.feed = 0;
		/** how famous her porn is? */
		this.viewerCount = 0;
		/** how much money is being spent on promoting her porn */
		this.spending = 0;
		/**
		 * how famous she is in porn
		 * * 0: not
		 * * 1: some
		 * * 2: recognized
		 * * 3: world renowned
		 */
		this.prestige = 0;
		/** description to go with @see pornPrestige
		 * @type {FC.Zeroable<string>} */
		this.prestigeDesc = 0;

		/** what porn she is known for */
		this.fameType = "none";
		/** what aspect of her the upgraded studio is focusing on for porn */
		this.focus = "none";

		/** fame values for each porn genre */
		this.fame = {};
		for (const genre of App.Porn.getAllGenres()) {
			this.fame[genre.fameVar] = 0;
		}
	}
};

/**
 * Encapsulates skills of a slave. Used inside of the
 * App.Entity.SlaveState class.
 * @see App.Entity.SlaveState
 */
App.Entity.SlaveSkillsState = class {
	constructor() {
		/**
		 * skill in vaginal sex
		 * * 0-10: unskilled
		 * * 11-30: basic
		 * * 31-60: skilled
		 * * 61-99: expert
		 * * 100+: master
		 */
		this.vaginal = 0;
		/**
		 * skill in penetrative sex
		 * * 0-10: unskilled
		 * * 11-30: basic
		 * * 31-60: skilled
		 * * 61-99: expert
		 * * 100+: master
		 */
		this.penetrative = 0;
		/**
		 * skill in oral sex
		 * * 0-10: unskilled
		 * * 11-30: basic
		 * * 31-60: skilled
		 * * 61-99: expert
		 * * 100+: master
		 */
		this.oral = 0;
		/**
		 * skill in anal sex
		 * * 0-10: unskilled
		 * * 11-30: basic
		 * * 31-60: skilled
		 * * 61-99: expert
		 * * 100+: master
		 */
		this.anal = 0;
		/**
		 * whoring skill
		 * * 0-10: unskilled
		 * * 11-30: basic
		 * * 31-60: skilled
		 * * 61-99: expert
		 * * 100+: master
		 */
		this.whoring = 0;
		/**
		 * entertaining skill
		 * * 0-10: unskilled
		 * * 11-30: basic
		 * * 31-60: skilled
		 * * 61-99: expert
		 * * 100+: master
		 */
		this.entertainment = 0;
		/**
		 * combating skill
		 * * 0-10: unskilled
		 * * 11-30: basic - Basic weapon handling, no tactics
		 * * 31-60: skilled - Good weapon handling, basic tactics
		 * * 61-99: expert - Expert weapon handling, good tactics
		 * * 100+: master - Master weapon handling, master tactics
		 *
		 * Notably, tactics lags behind weapon skill.
		 * Weapon skill includes hand-to-hand, melee and ranged.
		 *
		 * For reference:
		 * * Stick 'em with the pointy end: 0
		 * * Can shoot, hit and reload: 20
		 * * Well trained thug: 40
		 * * Trained soldier: 70
		 * * Special Ops: 100
		 */
		this.combat = 0;

		/** Her skill as a Head Girl
		 *
		 * default cap is 200 */
		this.headGirl = 0;
		/** Her skill as a recruiter
		 *
		 * default cap is 200 */
		this.recruiter = 0;
		/** Her skill as a bodyguard
		 *
		 * default cap is 200 */
		this.bodyguard = 0;
		/** Her skill as a brothel madam
		 *
		 * default cap is 200 */
		this.madam = 0;
		/** Her skill as a DJ
		 *
		 * default cap is 200 */
		this.DJ = 0;
		/** Her skill as a nurse
		 *
		 * default cap is 200 */
		this.nurse = 0;
		/** Her skill as a teacher
		 *
		 * default cap is 200 */
		this.teacher = 0;
		/** Her skill as an attendant
		 *
		 * default cap is 200 */
		this.attendant = 0;
		/** Her skill as a matron
		 *
		 * default cap is 200 */
		this.matron = 0;
		/** Her skill as a stewardess
		 *
		 * default cap is 200 */
		this.stewardess = 0;
		/** Her skill as a milkmaid
		 *
		 * default cap is 200 */
		this.milkmaid = 0;
		/** Her skill as a farmer
		 *
		 * default cap is 200 */
		this.farmer = 0;
		/** Her skill as a wardeness
		 *
		 * default cap is 200 */
		this.wardeness = 0;
		/** Her skill as a servant.
		 *
		 * default cap is 200 */
		this.servant = 0;
		/** Her skill as an entertainer
		 *
		 * default cap is 200 */
		this.entertainer = 0;
		/** Her skill as a whore
		 *
		 * default cap is 200 */
		this.whore = 0;
	}
};

App.Entity.SlaveActionsCountersState = class {
	constructor() {
		/** amount of milk given */
		this.milk = 0;
		/** amount of cum given */
		this.cum = 0;
		/** number of births as your slave */
		this.births = 0;
		/** How many known times the slave has given birth. */
		this.birthsTotal = 0;
		/** number of abortions as your slave */
		this.abortions = 0;
		/** number of miscarriages as your slave */
		this.miscarriages = 0;
		/** number of labors slave has undergone */
		this.laborCount = 0;
		/** The number of times the actor has had oral sex.
		 *
		 * Use only for logic checks. To increment, use `seX()`.
		 */
		this.oral = 0;
		/** The number of times the actor has had vaginal sex.
		 *
		 * Use only for logic checks. To increment, use `seX()`.
		 */
		this.vaginal = 0;
		/** The number of times the actor has had anal sex.
		 *
		 * Use only for logic checks. To increment, use `seX()`.
		 */
		this.anal = 0;
		/** The number of times the actor has given a titjob.
		 *
		 * Use only for logic checks. To increment, use `seX()`.
		 */
		this.mammary = 0;
		/** The number of times the actor has penetrated an orifice.
		 *
		 * Use only for logic checks. To increment, use `seX()`.
		 */
		this.penetrative = 0;
		/** number of times used by the general public */
		this.publicUse = 0;
		/** number of slaves killed in pit fights*/
		this.pitKills = 0;
		/** number of pit fights won */
		this.pitWins = 0;
		/** number of pit fights lost */
		this.pitLosses = 0;
		/** number of bestiality encounters */
		this.bestiality = 0;
		/** How many slaves she has sired under your ownership. */
		this.slavesFathered = 0;
		/** How many children she has fucked into you that you later birthed. */
		this.PCChildrenFathered = 0;
		/** How many of your slaves she has knocked up. */
		this.slavesKnockedUp = 0;
		/** How many times she has knocked you up. */
		this.PCKnockedUp = 0;
		/** How many times you've knocked her up. */
		this.timesBred = 0;
		/** How many of your children has she borne. */
		this.PCChildrenBeared = 0;
		/** How many times her hymen has been reconstructed */
		this.reHymen = 0;
	}
};

/**
 * Encapsulates custom AI prompts
 */
App.Entity.SlaveCustomAIPrompts = class SlaveCustomAIPrompts {
	constructor() {
		/** replaces the slave's posture prompts with a custom string for user-specified poses */
		this.pose = "";
		/** replaces the slave's expression positive prompt with a custom string for user-specified expressions */
		this.expressionPositive = "";
		/** replaces the slave's expression negative prompt with a custom string for user-specified expressions */
		this.expressionNegative = "";
		/** automatically adds to the dynamic positive prompt string */
		this.positiveRA = "";
		/** automatically adds to the dynamic positive prompt string */
		this.negativeRA = "";
		/** manually adds to the dynamic positive prompt string */
		this.positive = "";
		/** manually adds to the dynamic negative prompt string */
		this.negative = "";
	}
};

/**
 * Encapsulates custom poses
 */
App.Entity.SlaveCustomAIPose = class SlaveCustomAIPose {
	constructor() {
		/** custom pose type selected. JSON or PNG for completely custom poses from file (see filename), Library to pick by name (see name).
		 * @type {"Library"|"JSON"|"PNG"}
		 */
		this.type = "Library";
		/** pick a custom pose from the library
		 * @type {keyof App.Data.Art.Poses}
		 */
		this.name = "Standing, Neutral";
		/** load a custom pose from file
		 * @type {string}
		 */
		this.filename = "";
	}
};

/**
 * Encapsulates various custom properties, set by users
 */
App.Entity.SlaveCustomAddonsState = class SlaveCustomAddonsState {
	constructor() {
		/** adds a custom tattoo */
		this.tattoo = "";
		/** a label appended after the slave's name */
		this.label = "";
		/** adds a custom description */
		this.desc = "";
		/** What the slave refers to you as. */
		this.title = "";
		/** Replaces SlaveTitle() if set. */
		this.name = "";
		/** What the slave refers to you as, with a lisp.*/
		this.titleLisp = "";
		/**
		 * holds the custom slave image file name (used if images are enabled)
		 *
		 * null: no custom image
		 * @type {FC.CustomImage}
		 */
		this.image = null;
		/**
		 * holds the custom hair vector base file name
		 *
		 * used if vector images are enabled
		 * @type {FC.Zeroable<string>}
		 */
		this.hairVector = 0;
		/** skips this slave's image in the weekly ai auto regeneration
		 * @type {FC.Bool}
		 * 0: no; 1: yes */
		this.aiAutoRegenExclude = 0;
		/**
		 * holds the ai image ID
		 *
		 * used if ai images are enabled
		 * @type {Array<number>}
		 */
		this.aiImageIds = [];
		/**
		 * holds the index of the displayed AI image in aiImageIds
		 *
		 * used if ai images are enabled
		 * @type {number}
		 */
		this.aiDisplayImageIdx = -1;
		/**
		 * custom AI prompts; may be null or absent
		 * @type {App.Entity.SlaveCustomAIPrompts}
		 */
		this.aiPrompts = null;
		/**
		 * custom AI pose for OpenPose; may be null or absent.
		 * @type {App.Entity.SlaveCustomAIPose}
		 */
		this.aiPose = null;
	}
};

App.Entity.ScarState = class {
	constructor() {
		/**
		 * generic scar
		 * * 0: no scar
		 * * 1+: increasing intensity of scar
		 */
		this.generic = 0;
		/**
		 * whip scar
		 * * 0: no scar
		 * * 1+: increasing intensity of scar
		 */
		this.whip = 0;
		/**
		 * burn scar
		 * * 0: no scar
		 * * 1+: increasing intensity of scar
		 */
		this.burn = 0;
		/**
		 * surgical scar
		 * * 0: no scar
		 * * 1+: increasing intensity of scar
		 */
		this.surgical = 0;
		/**
		 * cutting scar
		 * * 0: no scar
		 * * 1+: increasing intensity of scar
		 */
		this.cutting = 0;
		/**
		 * chain/manacles scar, focused on wrists ankles or neck
		 * * 0: no scar
		 * * 1+: increasing intensity of scar
		 */
		this.chain = 0;
		/**
		 * exotic scar for the face
		 * * 0: no scar
		 * * 1: scar
		 */
		this.exotic = 0;
		/**
		 * menacing scar for the face
		 * * 0: no scar
		 * * 1: scar
		 */
		this.menacing = 0;
		/**
		 * custom scars can vary in number and will have to be defined when created.
		 */
	}
};

App.Entity.piercingState = class {
	constructor() {
		/** @type {FC.PiercingType} */
		this.weight = 0;
		/**
		 * String describing piercing. Leave empty to use default description.
		 * @type {string}
		 */
		this.desc = "";
	}
};

App.Entity.genitalPiercingState = class extends App.Entity.piercingState {
	constructor() {
		super();
		/** @type {boolean} */
		this.smart = false;
	}
};

App.Entity.piercingStateRA = class {
	constructor() {
		/** @type {FC.PiercingType} */
		this.weight = null;
		/**
		 * String describing piercing. Leave empty to use default description.
		 * @type {string}
		 */
		this.desc = null;
	}
};

App.Entity.genitalPiercingStateRA = class extends App.Entity.piercingStateRA {
	constructor() {
		super();
		/** @type {boolean} */
		this.smart = null;
	}
};

App.Entity.completePiercingState = class {
	constructor() {
		this.ear = new App.Entity.piercingState();
		this.nose = new App.Entity.piercingState();
		this.eyebrow = new App.Entity.piercingState();
		this.lips = new App.Entity.piercingState();
		this.tongue = new App.Entity.piercingState();
		this.nipple = new App.Entity.piercingState();
		this.areola = new App.Entity.piercingState();
		this.navel = new App.Entity.piercingState();
		this.corset = new App.Entity.piercingState();
		this.genitals = new App.Entity.genitalPiercingState();
		this.vagina = new App.Entity.piercingState();
		this.dick = new App.Entity.piercingState();
		this.anus = new App.Entity.piercingState();
	}
};

App.Entity.completePiercingStateRA = class {
	constructor() {
		this.ear = new App.Entity.piercingStateRA();
		this.nose = new App.Entity.piercingStateRA();
		this.eyebrow = new App.Entity.piercingStateRA();
		this.lips = new App.Entity.piercingStateRA();
		this.tongue = new App.Entity.piercingStateRA();
		this.nipple = new App.Entity.piercingStateRA();
		this.areola = new App.Entity.piercingStateRA();
		this.navel = new App.Entity.piercingStateRA();
		this.corset = new App.Entity.piercingStateRA();
		this.genitals = new App.Entity.genitalPiercingStateRA();
		this.vagina = new App.Entity.piercingStateRA();
		this.dick = new App.Entity.piercingStateRA();
		this.anus = new App.Entity.piercingStateRA();
	}
};

/**
 * To ensure that all new limbs contain expected attributes
 */
App.Entity.LimbState = class LimbState {
	constructor() {
		/**
		 * type of limb
		 * * 1: normal
		 * * 2: simple prosthetic
		 * * 3: advanced - Sex
		 * * 4: advanced - Beauty
		 * * 5: advanced - Combat
		 * * 6: cybernetic
		 * @type {FC.LimbType}
		 */
		this.type = 1;
		/**
		 * Partial ScarState:
		 * The body part in question, such as back or left hand.
		 * The key of that part is the type of scar they can have and the value is how serious it is, from 0 up.
		 * @type {{[key: string]: Partial<App.Entity.ScarState>}} */
		this.scar = {};
		/**
		 * Key: body part
		 * Value: Brand description
		 * @type {{[key: string]: string}} */
		this.brand = {};
	}
};

/**
 * To ensure that all new arms contain expected attributes
 */
App.Entity.ArmState = class extends App.Entity.LimbState {
	constructor() {
		super();
	}
};

/**
 * To ensure that all new legs contain expected attributes
 */
App.Entity.LegState = class extends App.Entity.LimbState {
	constructor() {
		super();
	}
};

/**
 * To ensure that all new eyes contain expected attributes
 */
App.Entity.SingleEyeState = class SingleEyeState {
	constructor() {
		/**
		 * type of eye
		 * * 1: normal
		 * * 2: glass
		 * * 3: cybernetic
		 */
		this.type = 1;
		/**
		 * vision of eye
		 * * 0: blind
		 * * 1: impaired
		 * * 2: normal
		 */
		this.vision = 2;
		/**
		 * current eye color
		 */
		this.iris = "brown";
		/**
		 * pupil shape
		 */
		this.pupil = "circular";
		/**
		 * sclera color
		 */
		this.sclera = "white";
	}
};

App.Entity.EyeState = class EyeState {
	constructor() {
		this.left = new App.Entity.SingleEyeState();
		this.right = new App.Entity.SingleEyeState();
		this.origColor = "brown";
	}
};

/** Genetic "natural targets" for this individual when full grown, without influence from drugs, surgery, etc */
App.Entity.GeneticState = class GeneticState {
	constructor() {
		// TODO: move origHColor, origSkin, origRace here, as hColor, skin, race?
		/** adult, natural height; expected height when full-grown/no drugs/no surgery
		 * @type {number} */
		this.height = 170;
		this.boobs = 500;
		this.artSeed = jsRandom(0, 10 ** 14);
	}
};

App.Entity.SlaveState = class SlaveState {
	constructor() {
		/** Slave's current name */
		this.slaveName = "blank";
		/** Slave's current surname
		 * @type {FC.Zeroable<string>} */
		this.slaveSurname = 0;
		/** slave's original name */
		this.birthName = "blank";
		/** slave's original surname
		 * @type {FC.Zeroable<string>} */
		this.birthSurname = 0;
		/** slave sex ("XX", "XY")
		 * @type {FC.GenderGenes} */
		this.genes = "XX";
		/** @type {number} */
		this.pronoun = App.Data.Pronouns.Kind.female;
		/** slave's natural genetic properties */
		this.natural = new App.Entity.GeneticState();
		/** game week slave was acquired.
		 *
		 * _0: Obtained prior to game start / at game start_ */
		this.weekAcquired = 0;
		/** slave's origin
		 * @type {string} */
		this.origin = "";
		/** career prior to enslavement
		 * @type {string} */
		this.career = "a slave";
		/** slave's ID */
		this.ID = 0;
		/** slave's prestige */
		this.prestige = 0;
		/** porn fame */
		this.porn = new App.Entity.SlavePornPerformanceState();
		/** rules */
		this.rules = new App.Entity.RuleState();
		/** reason for prestige
		 * @type {FC.Zeroable<string>} */
		this.prestigeDesc = 0;
		/**
		 * slave's relationship
		 * * -3: married to you
		 * * -2: emotionally bound to you
		 * * -1: emotional slut
		 * * 0: none
		 * * 1: friends with relationshipTarget
		 * * 2: best friends with relationshipTarget
		 * * 3: friends with benefits with relationshipTarget
		 * * 4: lover with relationshipTarget
		 * * 5: relationshipTarget 's slave wife
		 * @type {FC.RelationShipKind}
		 */
		this.relationship = 0;
		/** target of relationship (ID) */
		this.relationshipTarget = 0;
		/**
		 * slave's rivalry
		 * * 0: none
		 * * 1: dislikes rivalryTarget
		 * * 2: rival of rivalryTarget
		 * * 3: bitterly hates rivalryTarget
		 * @type {FC.RivalryType}
		 */
		this.rivalry = 0;
		/** target of rival (ID) */
		this.rivalryTarget = 0;
		/** slave will serve subTarget (ID - 0 is all slaves, -1 is stud) */
		this.subTarget = 0;
		/** ID of father */
		this.father = 0;
		/** ID of mother */
		this.mother = 0;
		/** number of slave's children that are your in your stock */
		this.daughters = 0;
		/** number of slave's siblings that are your in your stock */
		this.sisters = 0;
		/** Can the slave recruit relatives. Non-random slaves should be left off. */
		this.canRecruit = 0;
		/**
		 * can slave choose own assignment
		 * @type {FC.Bool}
		 * 0: no; 1: yes */
		this.choosesOwnAssignment = 0;
		/** slave's assignment
		 * @type {FC.Assignment} */
		this.assignment = Job.REST;
		/** how many weeks a slave is sentenced to work a job */
		this.sentence = 0;
		/** how far along slave is with being trained (skills, flaws, quirks) */
		this.training = 0;
		/** which hole to focus on when serving you
		 * @type {FC.ToyHole} */
		this.toyHole = "all her holes";
		/**
		 * How long her servitude will be.
		 *
		 * -1: not; 0+: number of weeks remaining */
		this.indenture = -1;
		/** 2: complete protection; 1: some protection; 0: no protection
		 * @type {FC.IndentureType} */
		this.indentureRestrictions = 0;
		/** week she was born (int between 0-51) */
		this.birthWeek = jsRandom(0, 51);
		/** How old she really is. */
		this.actualAge = 18;
		/** How old her body looks. */
		this.visualAge = 18;
		/** How old her body is. */
		this.physicalAge = 18;
		/** How old her ovaries are. (used to trick menopause) */
		this.ovaryAge = 18;
		/** has had facial surgery to reduce age. 0: no, 1: yes
		 * @type {FC.Bool} */
		this.ageImplant = 0;
		this.health = {
			/**
			 * slave 's health
			 * * -90 -	: On the edge of death
			 * * -90 -	-51: Extremely unhealthy
			 * * -50 -	-21: Unhealthy
			 * * -20 -	20: Healthy
			 * * 21	-	50: Very healthy
			 * * 50	-	90: Extremely healthy
			 * * 90	-	: Unnaturally healthy
			 */
			condition: 0,
			/** slave 's short term health damage */
			shortDamage: 0,
			/** slave 's long term health damage */
			longDamage: 0,
			/**
			 * slave 's current illness status
			 * * 0 : Not ill
			 * * 1 : A little under the weather
			 * * 2 : Minor illness
			 * * 3 : Ill
			 * * 4 : serious illness
			 * * 5 : dangerous illness
			 */
			illness: 0,
			/**
			 * slave 's current level of exhaustion
			 * * 0  - 30 : Perfectly fine
			 * * 31 - 60 : tired
			 * * 61 - 90 : fatigued
			 * * 91 - 100 : exhausted
			 */
			tired: 0,
			/** slave 's combined health (condition - short - long) */
			health: 0
		};
		/**
		 * slave has a minor injury ("black eye", "bruise", "split lip")
		 * @type {number | string}
		 */
		this.minorInjury = 0;
		/**
		 * slave 's trust.
		 * * -96-: abjectly terrified
		 * * -95 - -51: terrified
		 * * -50 - -21: frightened
		 * * -20 - 20: fearful
		 * * 21 - 50: careful
		 * * 51 - 95: trusting
		 * * 96+: profoundly trusting
		 */
		this.trust = 0;
		/** used to calculate trust loss/gain */
		this.oldTrust = 0;
		/**
		 * slave 's devotion
		 * * -96 - : hate-filled
		 * * -95 - -51: hateful
		 * * -50 - -21: reluctant
		 * * -20 - 20: careful
		 * * 21 - 50: accepting
		 * * 51 - 95: devoted
		 * * 96+: worshipful */
		this.devotion = 0;
		/** used to calculate devotion loss/gain */
		this.oldDevotion = 0;
		/**
		 * slave 's weight
		 * * 191+: dangerously obese
		 * * 190 - 161: super obese
		 * * 160 - 131: obese
		 * * 130 - 96: fat
		 * * 95 - 31: overweight
		 * * 30 - 11: curvy
		 * * 10 - -10: neither too fat nor too skinny
		 * * -11 - -30: thin
		 * * -31 - -95: very thin
		 * * -96 - : emaciated
		 */
		this.weight = 0;
		/**
		 * slave 's muscles
		 * * 96+ : extremely muscular
		 * * 31 - 95: muscular
		 * * 6 - 30: toned
		 * * -5 - 5: none
		 * * -30 - -6: weak
		 * * -95 - -31: very weak
		 * * -96- : frail
		 */
		this.muscles = 0;
		/**
		 * slave's height in cm
		 * * < 150: petite
		 * * 150 - 159: short
		 * * 160 - 169: average
		 * * 170 - 185: tall
		 * * 186+ : very tall
		 */
		this.height = 170;
		/** slave has height implant
		 * -1: -10 cm, 0: none, 1: +10 cm
		 * @type {FC.HeightImplant} */
		this.heightImplant = 0;
		/** slave's nationality
		 * @type {string} */
		this.nationality = "slave";
		/** slave's race
		 * @type {FC.Race} */
		this.race = "white";
		/** slave's original race
		 * @type {FC.Race} */
		this.origRace = "white";
		/**
		 * slave markings
		 * * "beauty mark"
		 * * "birthmark"
		 * * "freckles"
		 * * "heavily freckled"
		 * @type {FC.Markings}
		 */
		this.markings = "none";
		/**
		 * Eyes of the slave.
		 * @type {App.Entity.EyeState}
		 */
		this.eye = new App.Entity.EyeState();
		/** "none", "glasses", "blurring glasses", "corrective glasses", "blurring contacts", "corrective contacts"
		 * @type {FC.EyeWear} */
		this.eyewear = "none";
		/** slave hearing
		 * @type {FC.Hearing}
		 * -2: deaf; -1: hard of hearing; 0: normal */
		this.hears = 0;
		/** "none", "hearing aids", "muffling ear plugs", "deafening ear plugs"
		 * @type {FC.EarWear} */
		this.earwear = "none";
		/** is there an inner ear implant device
		 * 0: no; 1: yes
		 * @type {FC.Bool} */
		this.earImplant = 0;
		/** the shape of their outer ears
		 * @type {FC.EarShape} */
		this.earShape = "normal";
		/** type of top ears if any
		 * @type {FC.EarTopType}*/
		this.earT = "none";
		/** top ear color
		 * "hairless" */
		this.earTColor = "hairless";
		/** top ear effect color */
		this.earTEffectColor = "none";
		/** top ear effect */
		this.earTEffect = "none";
		/** sense of smell
		0 - yes, -1 - no */
		this.smells = 0;
		/** sense of taste
		0 - yes, -1 - no */
		this.tastes = 0;
		/** horn type if any
		 * "none", "curved succubus horns", "backswept horns", "cow horns", "one long oni horn", "two long oni horns", "small horns"
		 * @type {FC.HornType} */
		this.horn = "none";
		/** horn color */
		this.hornColor = "none";
		/** type of tail installed
		 * @type {FC.TailType}*/
		this.tail = "none";
		/**
		 * Does she have a tail interface installed
		 * * 0: no
		 * * 1: yes
		 * @type {FC.Bool}
		 */
		this.PTail = 0;
		/** the current shape of their modular tail
		 * @type {FC.TailShape} */
		this.tailShape = "none";
		/** tail color */
		this.tailColor = "none";
		/** tail effect color */
		this.tailEffectColor = "none";
		/** tail effect */
		this.tailEffect = "none";
		/** type of dorsal appendages installed
		 * @type {FC.AppendagesType}*/
		this.appendages = "none";
		/**
		 * Does she have a back interface installed
		 * * 0: no
		 * * 1: yes
		 * @type {FC.Bool}
		 */
		this.PBack = 0;
		/** the current shape of their modular wings
		 * @type {FC.WingsShape} */
		this.wingsShape = "none";
		/** tail color */
		this.appendagesColor = "none";
		/** appendages effect color */
		this.appendagesEffectColor = "none";
		/** appendages effect */
		this.appendagesEffect = "none";
		/** The color of their pattern
		 * @type {FC.PatternColor}
		 * applies to:
		 * @param {FC.PatternedEars} ears
		 * @param {FC.PatternedTails} tails
		 * @param {FC.PatternedAppendages} appendages
		 */
		this.patternColor = "black";
		/** slave's original hair color, defaults to their initial hair color. */
		this.origHColor = "brown";
		/** hair color */
		this.hColor = "brown";
		/** hair effect color */
		this.hEffectColor = "none";
		/** hair effect */
		this.hEffect = "none";
		/** pubic hair color */
		this.pubicHColor = "brown";
		/** armpit hair style */
		this.underArmHColor = "brown";
		/** eyebrowHColor*/
		this.eyebrowHColor = "brown";
		/** Slave's original skin color. */
		this.origSkin = "light";
		/** skin color */
		this.skin = "light";
		/**
		 * hair length
		 * * 150: calf-length
		 * * 149-100: ass-length
		 * * 99-30: long
		 * * 29-10: shoulder-length
		 * * 9-0: short
		 */
		this.hLength = 60;
		/**
		 * eyebrow thickness
		 * * "pencil-thin"
		 * * "thin"
		 * * "threaded"
		 * * "natural"
		 * * "tapered"
		 * * "thick"
		 * * "bushy"
		 * @type {FC.EyebrowThickness}
		 */
		this.eyebrowFullness = "natural";
		/** hair style
		 * @type {FC.HairStyle}
		 */
		this.hStyle = "neat";
		/** pubic hair style */
		this.pubicHStyle = "neat";
		/** armpit hair style */
		this.underArmHStyle = "neat";
		/** eyebrowHStyle */
		this.eyebrowHStyle = "natural";
		/**
		 * slave waist
		 * * 96+: masculine
		 * * 95 - 41: ugly
		 * * 40 - 11: unattractive
		 * * 10 - -10: average
		 * * -11 - -40: feminine
		 * * -40 - -95: hourglass
		 * * -96-: absurd
		 */
		this.waist = 0;
		/**
		 * What level of prosthetic interface she has installed
		 * * 0: no interface
		 * * 1: basic interface
		 * * 2: advanced interface
		 * * 3: quadruped interface
		 * @type {0 | 1 | 2 | 3}
		 */
		this.PLimb = 0;
		/**
		 * legs of the slave
		 */
		this.leg = {
			left: new App.Entity.LegState(),
			right: new App.Entity.LegState()
		};
		/**
		 * arms of the slave
		 */
		this.arm = {
			left: new App.Entity.ArmState(),
			right: new App.Entity.ArmState()
		};
		/** are heels clipped
		 * @type {FC.Bool}
		 * 0: no, 1: yes */
		this.heels = 0;
		/** slave voice
		 *
		 * 0: mute, 1: deep, 2: feminine, 3: high, girly */
		this.voice = 2;
		/** has voice implant
		 *
		 * 0: no; 1: yes, high; -1: yes, low */
		this.voiceImplant = 0;
		/** has cybernetic voicebox
		 * @type {FC.Bool}
		 * 0: no; 1: yes */
		this.electrolarynx = 0;
		/**
		 * slave accent
		 * * 0: none
		 * * 1: attractive
		 * * 2: heavy
		 * * 3: does not speak language
		 */
		this.accent = 0;
		/**
		 * shoulder width
		 * * -2: very narrow
		 * * -1: narrow
		 * * 0: feminine
		 * * 1: broad
		 * * 2: very broad
		 */
		this.shoulders = 0;
		/**
		 * has shoulder implant
		 *
		 * * -1: shoulders -1
		 * * 0: none
		 * * 1: shoulders +1
		 */
		this.shouldersImplant = 0;
		/**
		 * slave boob size (in cc)
		 * * 0-299	- flat;
		 * * 300-399   - A-cup;
		 * * 400-499   - B-cup
		 * * 500-649   - C-cup
		 * * 650-799   - D-cup
		 * * 800-999   - DD-cup
		 * * 1000-1199 - F-cup
		 * * 1200-1399 - G-cup
		 * * 1400-1599 - H-cup
		 * * 1600-1799 - I-cup
		 * * 1800-2049 - J-cup
		 * * 2050-2299 - K-cup
		 * * 2300-2599 - L-cup
		 * * 2600-2899 - M-cup
		 * * 2900-3249 - N-cup
		 * * 3250-3599 - O-cup
		 * * 3600-3949 - P-cup
		 * * 3950-4299 - Q-cup
		 * * 4300-4699 - R-cup
		 * * 4700-5099 - S-cup
		 * * 5100-5499 - T-cup
		 * * 5500-6499 - U-cup
		 * * 6500-6999 - V-cup
		 * * 7000-7499 - X-cup
		 * * 7500-7999 - Y-cup
		 * * 8000-8499 - Z-cup
		 * * 8500-14999 - obscenely massive
		 * * 15000-24999 - arm filling
		 * * 25000-39999 - figure dominating
		 * * 40000-54999 - beanbag sized
		 * * 55000-69999 - door jamming
		 * * 70000-89999 - hall clearing
		 * * 90000-100000 - hall jamming
		 */
		this.boobs = 0;
		/** breast engorgement from unmilked tits */
		this.boobsMilk = 0;
		/**
		 * slave implant size
		 * * 0: no implants;
		 * * 1-199: small implants;
		 * * 200-399: normal implants;
		 * * 400-599: large implants;
		 * * 600+: boobsImplant size fillable implants
		 */
		this.boobsImplant = 0;
		/**
		 * Implant type
		 * * "none"
		 * * "normal"
		 * * "string"
		 * * "fillable"
		 * * "advanced fillable"
		 * * "hyper fillable"
		 * @type {FC.InstalledSizingImplantType}
		 */
		this.boobsImplantType = "none";
		/**
		 * breast shape
		 * * "normal"
		 * * "perky"
		 * * "saggy"
		 * * "torpedo-shaped"
		 * * "downward-facing"
		 * * "wide-set"
		 * * "spherical"
		 * @type {FC.BreastShape}
		 */
		this.boobShape = "normal";
		/**
		 * nipple shape
		 * * "huge"
		 * * "puffy"
		 * * "inverted"
		 * * "tiny"
		 * * "cute"
		 * * "partially inverted"
		 * * "fuckable"
		 * * "flat"
		 * @type {FC.NippleShape}
		 */
		this.nipples = "cute";
		/** what accessory, if any, or on her nipples */
		this.nipplesAccessory = "none";
		/** slave areolae
		 *
		 * 0: normal; 1: large; 2: unusually wide; 3: huge, 4: massive */
		this.areolae = 0;
		/** slave areolae shape ("heart"; "star"; "circle") */
		this.areolaeShape = "circle";
		/**
		 * boobs tattoo
		 * * "tribal patterns"
		 * * "flowers"
		 * * "scenes"
		 * * "Asian art"
		 * * "degradation"
		 * * "counting"
		 * * "advertisements"
		 * * "rude words"
		 * * "bovine patterns"
		 * * "sacrament"
		 * * "Sacrilege"
		 * * "Possessive"
		 * * "Paternalist"
		 * @type {FC.Zeroable<string>}
		 */
		this.boobsTat = 0;
		/** slave lactation
		 *
		 * 0: none; 1: natural; 2: implant
		 * @type {FC.LactationType} */
		this.lactation = 0;
		/** how many more weeks until lactation dries up
		 *
		 * usually 2 as interactions and lactation implant reset it to 2 */
		this.lactationDuration = 0;
		/**
		 * odds of inducing lactation
		 *
		 * begins trying on breast play if over 10 */
		this.induceLactation = 0;
		/** 0: 10: not used to producing milk(no bonuses);
		 * 11: 50: used to producing milk;
		 * 51: 100: heavily adapted to producing milk(big bonus) */
		this.lactationAdaptation = 0;
		/**
		 * hip size
		 * * -2: very narrow
		 * * -1: narrow
		 * * 0: normal
		 * * 1: wide hips
		 * * 2: very wide hips
		 * * 3: inhumanly wide hips
		 */
		this.hips = 0;
		/** slave has hip implant
		 *
		 * -1: hips -1; 0: none; 1: hips +1 */
		this.hipsImplant = 0;
		/**
		 * butt size
		 * * 0	: flat
		 * * 1	: small
		 * * 2   : plump *
		 * * 3	: big bubble butt
		 * * 4	: huge
		 * * 5	: enormous
		 * * 6	: gigantic
		 * * 7	: ridiculous
		 * * 8 - 10: immense
		 * * 11 - 20: inhuman
		 *
		 * _* Descriptions vary for just how big 2 is, as such, it may be better to just go with 3_
		 */
		this.butt = 0;
		/**
		 * butt implant type and size
		 *
		 * * 0: none
		 * * 1: butt implant
		 * * 2: big butt implant
		 * * 3: fillable butt implants
		 * * 5 - 8: advanced fillable implants
		 * * 9+: hyper fillable implants
		 */
		this.buttImplant = 0;
		/**
		 * Implant type
		 * * "none"
		 * * "normal"
		 * * "string"
		 * * "fillable"
		 * * "advanced fillable"
		 * * "hyper fillable"
		 * @type {FC.InstalledSizingImplantType}
		 */
		this.buttImplantType = "none";
		/**
		 * butt tattoo
		 *
		 * takes one of the following strings or 0
		 * * "tribal patterns"
		 * * "flowers"
		 * * "scenes"
		 * * "Asian art"
		 * * "degradation"
		 * * "counting"
		 * * "advertisements"
		 * * "rude words"
		 * * "bovine patterns"
		 * * "sacrament"
		 * * "Sacrilege"
		 * * "Possessive"
		 * * "Paternalist"
		 * @type {FC.Zeroable<string>} */
		this.buttTat = 0;
		/**
		 * face attractiveness
		 *
		 * * -96 - : very ugly
		 * * -95 - -41: ugly
		 * * -40 - -11: unattractive
		 * * -10 - 10: attractive
		 * * 11 - 40: very pretty
		 * * 41 - 95: gorgeous
		 * * 96+: mind blowing
		 */
		this.face = 0;
		/**
		 * facial surgery degree
		 *
		 * * 0 - 14: none
		 * * 15 - 34: Subtle Improvements
		 * * 35 - 64: Noticeable Work
		 * * 65 - 99: Heavily Reworked
		 * * 100: Uncanny Valley
		 */
		this.faceImplant = 0;
		/**
		 * accepts string (will be treated as "normal")
		 * * "normal"
		 * * "masculine"
		 * * "androgynous"
		 * * "cute"
		 * * "sensual"
		 * * "exotic"
		 * * "feline" (catmod exclusive)
		 */
		this.faceShape = "normal";
		/**
		 * lip size (0 - 100)
		 * * 0 - 10: thin
		 * * 11 - 20: normal
		 * * 21 - 40: pretty
		 * * 41 - 70: plush
		 * * 71 - 95: huge(lisps)
		 * * 96 - 100: facepussy(mute)
		 */
		this.lips = 15;
		/**
		 * how large her lip implants are
		 * @see lips
		 */
		this.lipsImplant = 0;
		/**
		 * lip tattoo
		 *
		 * takes one of the following strings or 0
		 * * "tribal patterns"
		 * * "flowers"
		 * * "permanent makeup"
		 * * "degradation"
		 * * "counting"
		 * * "advertisements"
		 * * "rude words"
		 * * "bovine patterns"
		 * * "sacrament"
		 * * "Sacrilege"
		 * * "Possessive"
		 * * "Paternalist"
		 * @type {FC.Zeroable<string>} */
		this.lipsTat = 0;
		/**
		 * teeth type
		 * * "normal"
		 * * "crooked"
		 * * "gapped"
		 * * "straightening braces"
		 * * "cosmetic braces"
		 * * "removable"
		 * * "pointy"
		 * * "fangs"
		 * * "fang"
		 * * "baby"
		 * * "mixed"
		 * @type {FC.TeethType}
		 */
		this.teeth = "normal";
		/**
		 * vagina type
		 * * -1: no vagina
		 * * 0: virgin
		 * * 1: tight
		 * * 2: reasonably tight
		 * * 3: loose
		 * * 4: cavernous
		 * * 10: ruined
		 */
		this.vagina = 0;
		/** how wet she is
		 *
		 * 0: dry; 1: wet; 2: soaking wet
		 * @type {FC.VaginaLubeType} */
		this.vaginaLube = 0;
		/**
		 * vagina tattoo
		 *
		 * takes one of the following strings or 0
		 * * "tribal patterns"
		 * * "flowers"
		 * * "scenes"
		 * * "Asian art"
		 * * "degradation"
		 * * "counting"
		 * * "advertisements"
		 * * "rude words"
		 * * "bovine patterns"
		 * * "sacrament"
		 * * "Sacrilege"
		 * * "Possessive"
		 * * "Paternalist"
		 * * "lewd crest"
		 * @type {FC.Zeroable<string>} */
		this.vaginaTat = 0;
		/**
		 * pregnancy time or state.See Pregnancy Control section for more.
		 * * -3: sterilized
		 * * -2: sterile
		 * * -1: contraceptives
		 * * 0: fertile
		 * * 1 - 10: pregnant, not showing
		 * * 11 - 20: showing
		 * * 21 - 30: pregnant
		 * * 30 - 35: very pregnant
		 */
		this.preg = -1;
		/**
		 * accepts ID See Pregnancy Control section for more.
		 *
		 * Who sired her pregnancy
		 * * -10: a rapist
		 * * -9: a futanari sister
		 * * -8: an animal
		 * * -7: designer baby
		 * * -6: a member of the Societal Elite
		 * * -5: one of your clients
		 * * -4: another arcology owner
		 * * -3: your former Master
		 * * -2: citizen of your arcology
		 * * -1: you
		 * * 0: Unidentifiable
		 */
		this.pregSource = 0;
		/**
		 * Number of children.
		 *
		 * **Warning!** Should be not changed after initial impregnation setup.
		 * See Pregnancy Control section for more.
		 */
		this.pregType = 0;
		/**
		 * For function compatibility.
		 */
		this.pregMood = 0;
		/**
		 * How adapted a slave's body is to being pregnant. 1 pregAdaption supports 1000cc of pregnancy. A normal singleton pregnancy is about 15 pregAdaption.
		 */
		this.pregAdaptation = 50;
		/**
		 * Ovary implant type.
		 *
		 * * 0: no implants
		 * * "fertility": higher chance of twins (or more)
		 * * "sympathy": doubles eggs released
		 * * "asexual": self-fertilizing
		 * @type {FC.OvaryImplantType}
		 */
		this.ovaImplant = 0;
		/**
		 * Womb focused enhancements.
		 *
		 * * "none"
		 * * "restraint": Provides structural support for extremely oversized pregnancies
		 * @type {FC.WombImplantType}
		 */
		this.wombImplant = "none";
		/**
		 * Menstrual cycle known variable. To be used for fert cycle discover and things like pregnancy without a first period
		 * @type {FC.Bool}
		 * * 0: no; 1: yes
		 */
		this.fertKnown = 0;
		/**
		 * Menstrual cycle control variable.
		 *
		 * * 0: Danger week
		 * * 1+: safe week
		 */
		this.fertPeak = 0;
		/**
		 * has the slave been turned into a broodmother
		 *
		 * * 0: no
		 * * 1: standard 1 birth / week
		 * * 2: black market 12 births / week
		 * * 3: black market upgrade for implant firmware, to allow change weekly number
		 * of ova in range of 1 to 12 in remote surgery block. (broodmotherFetuses change
		 * through remote surgery). (future usage)
		 */
		this.broodmother = 0;
		/**
		 * count of ova that broodmother implant force to release.
		 *
		 * Should be set with "broodmother" property together. If broodmother === 0 has no meaning.
		 */
		this.broodmotherFetuses = 0;
		/**
		 * If broodmother implant set to pause its work.
		 *
		 * 1: implant on pause !1: working.
		 *
		 * If broodmother birth her last baby and her implant is on pause, she will be in contraception like state.
		 */
		this.broodmotherOnHold = 0;
		/**
		 * Number of weeks left until last baby will be birthed.
		 *
		 * Mainly informative only. Updated automatically at birth process based on remaining fetuses. 0 - 37
		 */
		this.broodmotherCountDown = 0;
		/**
		 * variable used to set off the birth events
		 *
		 * 1: birth this week; 0: not time yet
		 * @type {FC.Bool} */
		this.labor = 0;
		/**
		 * This sets the default option for the pregnancy notice
		 * @type {"none"|"incubator"|"nursery"|"nothing"}
		 */
		this.pregNoticeDefault = "none";
		/**
		 * If true the end of week pregnancy report will be bypassed
		 */
		this.pregNoticeBypass = false;
		/**
		 * may accept strings, use at own risk
		 *
		 * * "none"
		 * * "a small empathy belly"
		 * * "a medium empathy belly"
		 * * "a large empathy belly"
		 * * "a huge empathy belly"
		 * * "a corset"
		 * * "an extreme corset"
		 * * "a support band"
		 * @type {FC.BellyAccessory}
		 */
		this.bellyAccessory = "none";
		/**
		 * labia type
		 * * 0: minimal
		 * * 1: big
		 * * 2: huge
		 * * 3: huge dangling
		 * @type {FC.LabiaType}
		 */
		this.labia = 0;
		/**
		 * clit size
		 * * 0: normal
		 * * 1: large
		 * * 2: huge
		 * * 3: enormous
		 * * 4: penis-like
		 * * 5: like a massive penis
		 * @type {FC.ClitType}
		 */
		this.clit = 0;
		/**
		 * smart piercing setting
		 * * "off"
		 * * "none"
		 * * "all"
		 * * "no default setting"
		 * * "women"
		 * * "men"
		 * * "vanilla"
		 * * "oral"
		 * * "anal"
		 * * "boobs"
		 * * "submissive"
		 * * "humiliation"
		 * * "pregnancy"
		 * * "dom"
		 * * "masochist"
		 * * "sadist"
		 * @type {FC.SmartPiercingSetting}
		 */
		this.clitSetting = "vanilla";
		/** 0: circumcised; 1+:uncut, also affects foreskin size */
		this.foreskin = 0;
		/**
		 * anus size
		 * * 0: virgin
		 * * 1: tight
		 * * 2: loose
		 * * 3: very loose
		 * * 4: gaping
		 * @type {FC.AnusType} */
		this.anus = 0;
		/**
		 * dick size
		 * * 0: none
		 * * 1: tiny
		 * * 2: little
		 * * 3: normal
		 * * 4: big
		 * * 5: huge
		 * * 6: gigantic
		 * * 7: massive/gigantic
		 * * 8: truly imposing/titanic
		 * * 9: monstrous/absurd
		 * * 10: awe-inspiring/inhuman
		 * * 11+: hypertrophied
		 */
		this.dick = 0;
		/** used to calculate size of area around anus. */
		this.analArea = 1;
		/**
		 * dick tattoo
		 *
		 * takes one of the following strings or 0
		 * * "tribal patterns"
		 * * "flowers"
		 * * "scenes"
		 * * "Asian art"
		 * * "degradation"
		 * * "counting"
		 * * "advertisements"
		 * * "rude words"
		 * * "bovine patterns"
		 * * "sacrament"
		 * * "Sacrilege"
		 * * "Possessive"
		 * * "Paternalist"
		 * @type {FC.Zeroable<string>} */
		this.dickTat = 0;
		/**
		 * does the slave have a prostate?
		 * * 0: no
		 * * 1: normal
		 * * 2: hyperstimulated +20%
		 * * 3: modified hyperstimulated +50%
		 * @type {FC.ProstateType} */
		this.prostate = 0;
		/**
		 * Prostate implant type.
		 * @type {number|string}
		 *
		 * * 0: no implants
		 * * "stimulator": Stimulates a prostate orgasm. A null's best friend!
		 */
		this.prostateImplant = 0;
		/**
		 * ball size
		 * * 0: none
		 * * 1: vestigial
		 * * 2: small
		 * * 3: average
		 * * 4: large
		 * * 5: massive
		 * * 6: huge
		 * * 7: giant
		 * * 8: enormous
		 * * 9: monstrous
		 * * 10: inhuman
		 * * 11+: hypertrophied
		 */
		this.balls = 0;
		/**
		 * scrotum size
		 *
		 * function relative to .balls
		 *
		 * *If .balls > 0 and .scrotum === 0, balls are internal*
		 */
		this.scrotum = 0;
		/** has ovaries
		 * @type {FC.Bool}
		 * 0: no; 1: yes */
		this.ovaries = 0;
		/**
		 * anus tattoo
		 *
		 * takes one of the following strings or 0
		 * * "bleached"
		 * * "tribal patterns"
		 * * "flowers"
		 * * "degradation"
		 * * "counting"
		 * * "advertisements"
		 * * "rude words"
		 * * "bovine patterns"
		 * * "sacrament"
		 * * "Sacrilege"
		 * * "Possessive"
		 * * "Paternalist"
		 * @type {FC.Zeroable<string>} */
		this.anusTat = 0;
		/**
		 * has makeup
		 * * 0: none
		 * * 1: minimal
		 * * 2: expensive, luxurious
		 * * 3: color-coordinated with hair
		 * * 4: heavy
		 * * 5: neon
		 * * 6: color-coordinated neon
		 * * 7: metallic
		 * * 8: color-coordinated metallic
		 */
		this.makeup = 0;
		/**
		 * nail type
		 * * 0: neatly clipped
		 * * 1: long and elegant
		 * * 2: color-coordinated with hair
		 * * 3: sharp and claw-like
		 * * 4: bright and glittery
		 * * 5: very long and garish
		 * * 6: neon
		 * * 7: color-coordinated neon
		 * * 8: metallic
		 * * 9: color-coordinated metallic
		 */
		this.nails = 0;
		/** @type {{[key: string]: string}} */
		this.brand = {};
		this.piercing = new App.Entity.completePiercingState();
		/**
		 * shoulder tattoo
		 *
		 * takes one of the following strings or 0
		 * * "tribal patterns"
		 * * "flowers"
		 * * "scenes"
		 * * "Asian art"
		 * * "degradation"
		 * * "counting"
		 * * "advertisements"
		 * * "rude words"
		 * * "bovine patterns"
		 * * "sacrament"
		 * * "Sacrilege"
		 * * "Possessive"
		 * * "Paternalist"
		 * @type {FC.Zeroable<string>} */
		this.shouldersTat = 0;
		/**
		 * arm tattoo
		 *
		 * takes one of the following strings or 0
		 * * "tribal patterns"
		 * * "flowers"
		 * * "scenes"
		 * * "Asian art"
		 * * "degradation"
		 * * "counting"
		 * * "advertisements"
		 * * "rude words"
		 * * "bovine patterns"
		 * * "sacrament"
		 * * "Sacrilege"
		 * * "Possessive"
		 * * "Paternalist"
		 * @type {FC.Zeroable<string>} */
		this.armsTat = 0;
		/**
		 * leg tattoo
		 *
		 * takes one of the following strings or 0
		 * * "tribal patterns"
		 * * "flowers"
		 * * "scenes"
		 * * "Asian art"
		 * * "degradation"
		 * * "counting"
		 * * "advertisements"
		 * * "rude words"
		 * * "bovine patterns"
		 * * "sacrament"
		 * * "Sacrilege"
		 * * "Possessive"
		 * * "Paternalist"
		 * @type {FC.Zeroable<string>} */
		this.legsTat = 0;
		/**
		 * back tattoo
		 *
		 * takes one of the following strings or 0
		 * * "tribal patterns"
		 * * "flowers"
		 * * "scenes"
		 * * "Asian art"
		 * * "degradation"
		 * * "counting"
		 * * "advertisements"
		 * * "rude words"
		 * * "bovine patterns"
		 * * "sacrament"
		 * * "Sacrilege"
		 * * "Possessive"
		 * * "Paternalist"
		 * @type {FC.Zeroable<string>} */
		this.backTat = 0;
		/**
		 * tramp stamp
		 *
		 * takes one of the following strings or 0
		 * * "tribal patterns"
		 * * "flowers"
		 * * "scenes"
		 * * "Asian art"
		 * * "degradation"
		 * * "counting"
		 * * "advertisements"
		 * * "rude words"
		 * * "bovine patterns"
		 * * "sacrament"
		 * * "Sacrilege"
		 * * "Possessive"
		 * * "Paternalist"
		 * @type {FC.Zeroable<string>} */
		this.stampTat = 0;
		/** follows rules or is exempt from them
		 *
		 * 0: exempt; 1: obeys
		 * @type {FC.Bool} */
		this.useRulesAssistant = 1;
		/**
		 * * "healthy"
		 * * "restricted"
		 * * "corrective"
		 * * "muscle building"
		 * * "fattening"
		 * * "slimming"
		 * * "XX"
		 * * "XY"
		 * * "XXY"
		 * * "cum production"
		 * * "cleansing"
		 * * "fertility"
		 * * "high caloric" (planned)
		 * @type {FC.Diet}
		 */
		this.diet = "healthy";
		/**
		 * how much of her diet is cum
		 * 0: none; 1: supplemented; 2: nearly entirely
		 * @type {FC.dietCumType}*/
		this.dietCum = 0;
		/** how much of her diet is milk
		 *
		 * 0: none; 1: supplemented; 2: nearly entirely
		 * @type {FC.dietMilkType}
		 * */
		this.dietMilk = 0;
		/**
		 * * -2: heavy male hormones
		 * * -1: male hormones
		 * * 0: none
		 * * 1: female hormones
		 * * 2: heavy female hormones
		 */
		this.hormones = 0;
		/**
		 * * "no drugs"
		 * * "breast injections"
		 * * "butt injections"
		 * * "lip injections"
		 * * "fertility drugs"
		 * * "penis enhancement"
		 * * "testicle enhancement"
		 * * "psychosuppressants"
		 * * "psychostimulants"
		 * * "steroids"
		 * * "hormone enhancers"
		 * * "hormone blockers"
		 * * "super fertility drugs"
		 * * "hyper breast injections"
		 * * "hyper butt injections"
		 * * "hyper penis enhancement"
		 * * "hyper testicle enhancement"
		 * * "female hormone injections"
		 * * "male hormone injections"
		 * * "anti-aging cream"
		 * * "appetite suppressors"
		 * * "penis atrophiers"
		 * * "testicle atrophiers"
		 * * "clitoris atrophiers"
		 * * "labia atrophiers"
		 * * "nipple atrophiers"
		 * * "lip atrophiers"
		 * * "breast redistributors"
		 * * "butt redistributors"
		 * * "sag-B-gone"
		 * * "growth stimulants"
		 * * "stimulants" (planned)
		 * @type {FC.Drug}
		 */
		this.drugs = "no drugs";
		/** 0: none; 1: preventatives; 2: curatives */
		this.curatives = 0;
		/** if greater than 10 triggers side effects from drug use. */
		this.chem = 0;
		/** 0: none; 1: standard; 2: powerful */
		this.aphrodisiacs = 0;
		/**
		 * how addict to aphrodisiacs slave is
		 * * 0: not
		 * * 1-2: new addict
		 * * 3-9: confirmed addict
		 * * 10+: dependent
		 */
		this.addict = 0;
		/** Fuckdoll degree
		 *
		 * 0: not; 1+: Fuckdoll */
		this.fuckdoll = 0;
		/** 0: no; 1: yes
		 * @type {FC.Bool} */
		this.choosesOwnClothes = 0;
		/**
		 * may accept strings, use at own risk
		 *
		 * * "a ball gown"
		 * * "a biyelgee costume"
		 * * "a bra"
		 * * "a bunny outfit"
		 * * "a burkini"
		 * * "a burqa"
		 * * "a button-up shirt"
		 * * "a button-up shirt and panties"
		 * * "a chattel habit"
		 * * "a cheerleader outfit"
		 * * "a comfortable bodysuit"
		 * * "a tight Imperial bodysuit"
		 * * "a cybersuit"
		 * * "a dirndl"
		 * * "a fallen nuns habit"
		 * * "a Fuckdoll suit"
		 * * "a gothic lolita dress"
		 * * "a halter top dress"
		 * * "a hanbok"
		 * * "a hijab and abaya"
		 * * "a hijab and blouse"
		 * * "a huipil"
		 * * "a kimono"
		 * * "a klan robe"
		 * * "a latex catsuit"
		 * * "a leotard"
		 * * "a long qipao"
		 * * "a maternity dress"
		 * * "a military uniform"
		 * * "a mini dress"
		 * * "a monokini"
		 * * "a mounty outfit"
		 * * "a nice maid outfit"
		 * * "a nice nurse outfit"
		 * * "a nice pony outfit"
		 * * "a niqab and abaya"
		 * * "a one-piece swimsuit"
		 * * "a penitent nuns habit"
		 * * "a police uniform"
		 * * "a red army uniform"
		 * * "a Santa dress"
		 * * "a scalemail bikini"
		 * * "a schoolgirl outfit"
		 * * "a schutzstaffel uniform"
		 * * "a skimpy loincloth"
		 * * "a slave gown"
		 * * "a slutty klan robe"
		 * * "a slutty maid outfit"
		 * * "a slutty nurse outfit"
		 * * "a slutty outfit"
		 * * "a slutty pony outfit"
		 * * "a slutty qipao"
		 * * "a slutty schutzstaffel uniform"
		 * * "a sports bra"
		 * * "a string bikini"
		 * * "a striped bra"
		 * * "a succubus outfit"
		 * * "a sweater"
		 * * "a sweater and cutoffs"
		 * * "a sweater and panties"
		 * * "a t-shirt"
		 * * "a t-shirt and jeans"
		 * * "a t-shirt and panties"
		 * * "a t-shirt and thong"
		 * * "a tank-top"
		 * * "a tank-top and panties"
		 * * "a thong"
		 * * "a toga"
		 * * "a tube top"
		 * * "a tube top and thong"
		 * * "a confederate army uniform"
		 * * "an apron"
		 * * "an oversized t-shirt"
		 * * "an oversized t-shirt and boyshorts"
		 * * "an evening dress"
		 * * "attractive lingerie"
		 * * "attractive lingerie for a pregnant woman"
		 * * "battlearmor"
		 * * "Imperial Plate"
		 * * "battledress"
		 * * "body oil"
		 * * "boyshorts"
		 * * "chains"
		 * * "clubslut netting"
		 * * "conservative clothing"
		 * * "cutoffs"
		 * * "cutoffs and a t-shirt"
		 * * "harem gauze"
		 * * "jeans"
		 * * "kitty lingerie"
		 * * "leather pants"
		 * * "leather pants and a tube top"
		 * * "leather pants and pasties"
		 * * "lederhosen"
		 * * "nice business attire"
		 * * "no clothing"
		 * * "overalls"
		 * * "panties"
		 * * "panties and pasties"
		 * * "restrictive latex"
		 * * "shibari ropes"
		 * * "slutty business attire"
		 * * "slutty jewelry"
		 * * "spats and a tank top"
		 * * "sport shorts"
		 * * "sport shorts and a sports bra"
		 * * "sport shorts and a t-shirt"
		 * * "stretch pants and a crop-top"
		 * * "striped panties"
		 * * "striped underwear"
		 * * "uncomfortable straps"
		 * * "Western clothing"
		 * @type {FC.Clothes} */
		this.clothes = "no clothing";
		/**
		 * may accept strings, use at own risk
		 * * "none"
		 * * "ancient Egyptian"
		 * * "cruel retirement counter"
		 * * "uncomfortable leather"
		 * * "tight steel"
		 * * "shock punishment"
		 * * "heavy gold"
		 * * "pretty jewelry"
		 * * "nice retirement counter"
		 * * "bell collar"
		 * * "leather with cowbell"
		 * * "bowtie"
		 * * "neck tie"
		 * * "neck corset"
		 * * "stylish leather"
		 * * "satin choker"
		 * * "preg biometrics"
		 * * "silk ribbon"
		 * @type {FC.Collar}
		 */
		this.collar = "none";
		/**
		 * may accept strings, use at own risk
		 * * "none"
		 * * "porcelain mask"
		 */
		this.faceAccessory = "none";
		/**
		 * may accept strings, use at own risk
		 * @type {FC.WithNone<FC.MouthAccessory>}
		 */
		this.mouthAccessory = "none";
		/**
		 * may accept strings, use at own risk
		 * @type {FC.WithNone<FC.Shoes>}
		 */
		this.shoes = "none";
		/**
		 * may accept strings, use at own risk
		 * * "none"
		 * * "bullet vibrator"
		 * * "smart bullet vibrator"
		 * * "dildo"
		 * * "large dildo"
		 * * "huge dildo"
		 * * "long dildo"
		 * * "long, large dildo"
		 * * "long, huge dildo"
		 */
		this.vaginalAccessory = "none";
		/**
		 * may accept strings, use at own risk
		 * * "none"
		 * * "vibrator"
		 * * "smart vibrator"
		 */
		this.vaginalAttachment = "none";
		/**
		 * may accept strings, use at own risk
		 * * "none"
		 * * "sock"
		 * * "bullet vibrator"
		 * * "smart bullet vibrator"
		 */
		this.dickAccessory = "none";
		/**
		 * whether the slave has a chastity device on their anus
		 * 0 - no
		 * 1 - yes
		 * @type {FC.Bool}
		 */
		this.chastityAnus = 0;
		/**
		 * whether the slave has a chastity device on their penis
		 * 0 - no
		 * 1 - yes
		 * @type {FC.Bool}
		 */
		this.chastityPenis = 0;
		/**
		 * whether the slave has a chastity device on their vagina
		 * 0 - no
		 * 1 - yes
		 * @type {FC.Bool}
		 */
		this.chastityVagina = 0;
		/**
		 * may accept strings, use at own risk
		 * * "none"
		 * * "hand gloves"
		 * * "elbow gloves"
		 */
		this.armAccessory = "none";
		/**
		 * may accept strings, use at own risk
		 * * "none"
		 * * "short stockings"
		 * * "long stockings"
		 */
		this.legAccessory = "none";
		/**
		 * may accept strings, use at own risk
		 * * "none"
		 * * "plug"
		 * * "large plug"
		 * * "huge plug"
		 * * "long plug"
		 * * "long, large plug"
		 * * "long, huge plug"
		 */
		this.buttplug = "none";
		/**
		 * Does the slave have an attachment on their buttplug
		 *
		 * may accept strings, use at own risk
		 * * "none"
		 * * "tail"
		 * * "fox tail"
		 * * "cat tail"
		 * * "cow tail"
		 */
		this.buttplugAttachment = "none";
		/**
		 * slave intelligence
		 * * -100 - -96: borderline retarded
		 * * -95 - -51: very slow
		 * * -50 - -16: slow
		 * * -15 - 15: average
		 * * 16 - 50: smart
		 * * 51 - 95: very smart
		 * * 96 - 100: brilliant
		 */
		this.intelligence = 0;
		/**
		 * Degree of slave 's education
		 * * -15+: miseducated (slave appears to be dumber than they really are)
		 * * 0: uneducated
		 * * 1+: partial education (not really used)
		 * * 15+: educated
		 * * 30: well educated
		 */
		this.intelligenceImplant = 0;
		/**
		 * sex drive
		 * * 0 - 20: no sex drive
		 * * 21 - 40: poor sex drive
		 * * 41 - 60: average sex drive
		 * * 61 - 80: good sex drive
		 * * 81 - 95: powerful sex drive
		 * * 96+: nymphomaniac
		 */
		this.energy = 50;
		/**
		 * The amount of sex the slave had with customers for certain jobs during a week
		 */
		this.sexAmount = 0;
		/**
		 * The 'quality' of the sex a slave had with customers. High quality means they fetch a higher price for their services
		 */
		this.sexQuality = 0;
		/**
		 * how badly she needs sex.
		 * 0: sated
		 */
		this.need = 0;
		/**
		 * A list of IDs of anyone the slave has ever slept with.
		 *
		 * Only contains unique entries.
		 *
		 * | ***ID*** | **Type**              |
		 * |---------:|:----------------------|
		 * | *1+*     | Normal slave		  |
		 * | *-1*     | PC                    |
		 * | *-2*     | Citizen               |
		 * | *-3*     | PC's former master    |
		 * | *-4*     | Fellow arcology owner |
		 * | *-6*     | Societal Elite        |
		 * | *-8*     | Animal                |
		 * | *-9*     | Futanari Sister       |
		 * | *-10*    | Rapist                |
		 * @type {Set<number>}
		 */
		this.partners = new Set();
		/**
		 * attraction to women
		 * * 0 - 5: disgusted by women
		 * * 6 - 15: turned off by women
		 * * 15 - 35: not attracted to women
		 * * 36 - 65: indifferent to women
		 * * 66 - 85: attracted to women
		 * * 86 - 95: aroused by women
		 * * 96+: passionate about women
		 *
		 * *if both attrXX and attrXY > 95, slave will be omnisexual*
		 *
		 * *if energy > 95 and either attrXX or attrXY > 95, slave will be nymphomaniac*
		 */
		this.attrXX = 0;
		/**
		 * attraction to men
		 * * 0 - 5: disgusted by men
		 * * 6 - 15: turned off by men
		 * * 15 - 35: not attracted to men
		 * * 36 - 65: indifferent to men
		 * * 66 - 85: attracted to men
		 * * 86 - 95: aroused by men
		 * * 96+: passionate about men
		 *
		 * *if both attrXX and attrXY > 95, slave will be omnisexual*
		 *
		 * *if energy > 95 and either attrXX or attrXY > 95, slave will be nymphomaniac*
		 */
		this.attrXY = 0;
		/** 0: no; 1: yes
		 * @type {FC.Bool} */
		this.attrKnown = 0;
		/**
		 * * "none"
		 * * "mindbroken"
		 * * "submissive"
		 * * "cumslut"
		 * * "humiliation"
		 * * "buttslut"
		 * * "boobs"
		 * * "sadist"
		 * * "masochist"
		 * * "dom"
		 * * "pregnancy"
		 * * "bestiality"
		 * @type {FC.Fetish}
		 */
		this.fetish = "none";
		/** how strong her fetish is (10-100)
		 *
		 * 10+: enjoys fetish; 60+: likes fetish; 95+: loves fetish */
		this.fetishStrength = 70;
		/** is fetish known to player
		 * @type {FC.Bool}
		 * 0: no; 1: yes */
		this.fetishKnown = 0;
		/**
		 * * "none"
		 * * "arrogant": clings to her dignity, thinks slavery is beneath her
		 * * "bitchy": can't keep her opinions to herself
		 * * "odd": says and does odd things
		 * * "hates men": hates men
		 * * "hates women": hates women
		 * * "gluttonous": likes eating, gains weight
		 * * "anorexic": dislikes eating and being forced to eat, loses weight
		 * * "devout": resistance through religious faith
		 * * "liberated": believes slavery is wrong
		 * @type {FC.BehavioralFlaw}
		 */
		this.behavioralFlaw = "none";
		/**
		 * * "none"
		 * * "confident": believes she has value as a slave
		 * * "cutting": often has as witty or cunning remark ready, knows when to say it
		 * * "funny": is funny
		 * * "fitness": loves working out
		 * * "adores women": likes spending time with women
		 * * "adores men": likes spending time with men
		 * * "insecure": defines herself on the thoughts of others
		 * * "sinful": breaks cultural norms
		 * * "advocate": advocates slavery
		 * @type {FC.BehavioralQuirk}
		 */
		this.behavioralQuirk = "none";
		/**
		 * * "none"
		 * * "hates oral": hates oral sex
		 * * "hates anal": hates anal sex
		 * * "hates penetration": dislikes penetrative sex
		 * * "shamefast": nervous when naked
		 * * "idealistic": believes sex should be based on love and consent
		 * * "repressed": dislikes sex
		 * * "apathetic": inert during sex
		 * * "crude": sexually crude and has little sense of what partners find disgusting during sex
		 * * "judgemental": sexually judgemental and often judges her sexual partners' performance
		 * * "neglectful": disregards herself in sex
		 * * "cum addict": addicted to cum
		 * * "anal addict": addicted to anal
		 * * "attention whore": addicted to being the center of attention
		 * * "breast growth": addicted to her own breasts
		 * * "abusive": sexually abusive
		 * * "malicious": loves causing pain and suffering
		 * * "self hating": hates herself
		 * * "breeder": addicted to being pregnant
		 * * "animal lover" addicted to fucking animals
		 * @type {FC.SexualFlaw}
		 */
		this.sexualFlaw = "none";
		/**
		 * * "none"
		 * * "gagfuck queen": can take a facefucking
		 * * "painal queen": knows how far she can go without getting hurt
		 * * "strugglefuck queen": knows how much resistance her partners want
		 * * "tease": is a tease
		 * * "romantic": enjoys the closeness of sex
		 * * "perverted": enjoys breaking sexual boundaries
		 * * "caring": enjoys bring her partners to orgasm
		 * * "unflinching": willing to do anything
		 * * "size queen": prefers big cocks
		 * @type {FC.SexualQuirk}
		 */
		this.sexualQuirk = "none";
		/** 0: does not have; 1: carrier; 2: active
		 * * heterochromia is an exception. String = active
		 * @type {FC.GeneticQuirks}
		 */
		this.geneticQuirks = {
			/** Oversized breasts. Increased growth rate, reduced shrink rate. Breasts try to return to oversized state if reduced. */
			macromastia: 0,
			/** Greatly oversized breasts. Increased growth rate, reduced shrink rate. Breasts try to return to oversized state if reduced.
			 *
			 * **macromastia + gigantomastia** - Breasts never stop growing. Increased growth rate, no shrink rate. */
			gigantomastia: 0,
			/** sperm is much more likely to knock someone up */
			potent: 0,
			/** is prone to having twins, shorter pregnancy recovery rate */
			fertility: 0,
			/** is prone to having multiples, even shorter pregnancy recovery rate
			 *
			 * **fertility + hyperFertility** - will have multiples, even shorter pregnancy recovery rate */
			hyperFertility: 0,
			/** pregnancy does not block ovulation, slave can become pregnant even while pregnant */
			superfetation: 0,
			/** abnormal production of amniotic fluid
			 *  only affects fetuses */
			polyhydramnios: 0,
			/** Pleasurable pregnancy and orgasmic birth. Wider hips, looser and wetter vagina. High pregadaptation and low birth damage. */
			uterineHypersensitivity: 0,
			/** inappropriate lactation*/
			galactorrhea: 0,
			/** is abnormally tall. gigantism + dwarfism - is very average*/
			gigantism: 0,
			/** is abnormally short. gigantism + dwarfism - is very average*/
			dwarfism: 0,
			/** retains childlike characteristics*/
			neoteny: 0,
			/** rapid aging
			 *
			 * **neoteny + progeria** - progeria wins, not that she'll make it to the point that neoteny really kicks in */
			progeria: 0,
			/** has a flawless face. pFace + uFace - Depends on carrier status, may swing between average and above/below depending on it */
			pFace: 0,
			/** has a hideous face. pFace + uFace - Depends on carrier status, may swing between average and above/below depending on it */
			uFace: 0,
			/** has pale skin, white hair and red eyes */
			albinism: 0,
			/** may have mismatched eyes, the eye color stored here is always the left eye */
			heterochromia: 0,
			/** ass never stops growing. Increased growth rate, reduced shrink rate. */
			rearLipedema: 0,
			/** has (or will have) a huge dong */
			wellHung: 0,
			/** constantly gains weight unless dieting, easier to gain weight. wGain + wLoss - weight gain/loss fluctuates randomly */
			wGain: 0,
			/** constantly loses weight unless gaining, easier to lose weight. wGain + wLoss - weight gain/loss fluctuates randomly */
			wLoss: 0,
			/** body attempts to normalize to an androgynous state */
			androgyny: 0,
			/** constantly gains muscle mass, easier to gain muscle. mGain + mLoss - muscle gain/loss amplified, passively lose muscle unless building */
			mGain: 0,
			/** constantly loses muscle mass, easier to gain muscle. mGain + mLoss - muscle gain/loss amplified, passively lose muscle unless building */
			mLoss: 0,
			/** ova will split if room is available
			 *  only affects fetuses */
			twinning: 0,
			/** slave can only ever birth girls */
			girlsOnly: 0
		};
		/** chance of generating sperm with a Y chromosome (yields male baby). inherited by sons, with mutation */
		this.spermY = 50;
		/** Counts various acts slave participated in */
		this.counter = new App.Entity.SlaveActionsCountersState();
		/** Values provided by players */
		this.custom = new App.Entity.SlaveCustomAddonsState();
		/** Does this slave refer to you rudely?
		 * @type {FC.Bool}
		 * 0: not being rude; 1: insists on calling you a rude title */
		this.rudeTitle = 0;
		/** @type {string[]} */
		this.currentRules = [];
		/**
		 * Slave has a tattoo that is only recognizable when she has a big belly.
		 * * "a heart"
		 * * "a star"
		 * * "a butterfly"
		 * @type {FC.Zeroable<string>} */
		this.bellyTat = 0;
		/**
		 * Slave has a series of tattoos to denote how many abortions she has had.
		 * * -1: no tattoo
		 * *  0: assigned to have tattoo, may not have one yet
		 * * 1+: number of abortion tattoos she has
		 */
		this.abortionTat = -1;
		/**
		 * Slave has a series of tattoos to denote how many times she has given birth.
		 * * -1: no tattoo
		 * *  0: assigned to have tattoo, may not have one yet
		 * * 1+: number of birth tattoos she has
		 */
		this.birthsTat = -1;
		/** Slave will give birth this week.
		 * @type {FC.Bool}
		 * 1: true; 0: false */
		this.induce = 0;
		/** Male slave has an anal womb and can get pregnant.
		 * @type {FC.Bool}
		 * 1: true; 0: false */
		this.mpreg = 0;
		/** How much fluid is distending the slave.
		 *
		 * 1: 2L; 2: 4L; 3: 8L */
		this.inflation = 0;
		/**
		 * What kind of fluid is in the slave.
		 * * "none"
		 * * "water"
		 * * "cum"
		 * * "milk"
		 * * "food"
		 * * "aphrodisiac"
		 * * "curative"
		 * * "tightener"
		 * * "urine"
		 * @type {FC.InflationLiquid}
		 */
		this.inflationType = "none";
		/**
		 * How she is being filled.
		 * * 0: not
		 * * 1: oral
		 * * 2: anal
		 * * 3: orally by another slave
		 */
		this.inflationMethod = 0;
		/** If inflationMethod === 3, ID of the slave filling her with milk. */
		this.milkSource = 0;
		/** If inflationMethod 3, ID of the slave filling her with cum. */
		this.cumSource = 0;
		/** Slave's internals have ruptured. Used with poor health and overinflation.
		 * @type {FC.Bool}
		 * 1: true; 0: false */
		this.burst = 0;
		/** Do you and the slave know she is pregnant.
		 * @type {FC.Bool}
		 * 0: no; 1: yes */
		this.pregKnown = 0;
		/** How long she has been pregnant
		 *
		 * used in place of .preg when pregnancy speed up and slow down are used on a slave
		 *
		 * if negative, designates postpartum. */
		this.pregWeek = 0;
		/**
		 * how big their belly is in CCs
		 *
		 * ||thresholds:|
		 * |-|-|
		 * 100	| bloated
		 * 1500   | early pregnancy
		 * 5000   | obviously pregnant
		 * 10000  | very pregnant
		 * 15000  | full term
		 * 30000  | full term twins
		 * 45000  | full term triplets
		 * 60000  | full term quads
		 * 75000  | full term quints
		 * 90000  | full term sextuplets
		 * 105000 | full term septuplets
		 * 120000 | full term octuplets
		 * 150000 | oversized pregnancy
		 * 300000 | hyperpreg state 1
		 * 450000 | hyperpreg state 2
		 * 600000 | hyperpreg state 3
		 * 750000 | hyperpreg state 4
		 */
		this.belly = 0;
		/**
		 * how big their belly is in CCs (pregnancy only)
		 *
		 * ||thresholds|
		 * |-|-|
		 * 100	| bloated
		 * 1500   | early pregnancy
		 * 5000   | obviously pregnant
		 * 10000  | very pregnant
		 * 15000  | full term
		 * 30000  | full term twins
		 * 45000  | full term triplets
		 * 60000  | full term quads
		 * 75000  | full term quints
		 * 90000  | full term sextuplets
		 * 105000 | full term septuplets
		 * 120000 | full term octuplets
		 * 150000 | oversized pregnancy (9+ babies)
		 * 300000 | hyperpreg state 1 (20+ babies)
		 * 450000 | hyperpreg state 2 (30+ babies)
		 * 600000 | hyperpreg state 3 (40+ babies)
		 * 750000 | hyperpreg state 4 (50+ babies)
		 */
		this.bellyPreg = 0;
		/**
		 * how big their belly is in CCs (fluid distension only)
		 *
		 * ||thresholds|
		 * |-|-|
		 * 100   | bloated
		 * 2000  | clearly bloated (2 L)
		 * 5000  | very full (~1 gal)
		 * 10000 | full to bursting (~2 gal)
		 */
		this.bellyFluid = 0;
		/**
		 * Does the slave have a fillable abdominal implant.
		 * * -1: no
		 * * 0+: yes
		 * * 2000+: Early pregnancy
		 * * 4000+: looks pregnant
		 * * 8000+: looks full term
		 * * 16000+: hyperpregnant 1
		 * * 32000+: hyperpregnant 2
		 */
		this.bellyImplant = -1;
		/** How saggy her belly is after being distended for too long.
		 *
		 * 1+ changes belly description */
		this.bellySag = 0;
		/** How saggy her belly is from being too pregnant.
		 *
		 * 1+ changes belly description and overrides/coincides with bellySag */
		this.bellySagPreg = 0;
		/**
		 * Has the slave 's belly implant been filled this week. Causes health damage for overfilling.
		 *
		 * 0: no pain; 1: will experience pain; 2: cannot be filled this week */
		this.bellyPain = 0;
		/** Does the slave have a cervical implant that slowly feeds cum from being fucked into a fillable implant.
		 *
		 * 0: no; 1: vaginal version only; 2: anal version only; 3: both vaginal and anal */
		this.cervixImplant = 0;
		/** Target .physicalAge for female puberty to occur. */
		this.pubertyAgeXX = 13;
		/** Has the slave gone through female puberty.
		 * @type {FC.Bool}
		 * 0: no; 1: yes */
		this.pubertyXX = 0;
		/** Target .physicalAge for male puberty to occur. */
		this.pubertyAgeXY = 13;
		/** Has the slave gone through male puberty.
		 * @type {FC.Bool}
		 * 0: no; 1: yes */
		this.pubertyXY = 0;
		/**
		 * scar
		 * Sub-object:
		 * the body part in question, such as back or left hand
		 * the key of that part is the type of scar they can have and the value is how serious it is, from 0 up
		 * @type {{[key: string]: Partial<App.Entity.ScarState>}} */
		this.scar = {};
		/**
		 * In a eugenics society, this slave is a designated breeder.
		 * @type {FC.Bool}
		 * * 1: yes
		 * * 0: no */
		this.breedingMark = 0;
		/** Is the PC permitted to fuck this slave pregnant.
		 *  MB Cattle Ranch bulls will ignore this.
		 * @type {FC.Bool}
		 * * 0: no
		 * * 1: yes */
		this.PCExclude = 0;
		/** Is the Head Girl permitted to fuck this slave pregnant.
		 * @type {FC.Bool}
		 * * 0: no
		 * * 1: yes */
		this.HGExclude = 0;
		/** Is the Stud permitted to fuck this slave pregnant.
		 *  MB Cattle Ranch bulls will ignore this.
		 * @type {FC.Bool}
		 * * 0: no
		 * * 1: yes */
		this.StudExclude = 0;
		/** Is this slave excluded from insemination roulette.
		 * @type {FC.Bool}
		 * * 0: no
		 * * 1: yes */
		this.inseminationExclude = 0;
		/**
		 * What species of sperm she produces.
		 * * "human"
		 * * "sterile"
		 * * "dog"
		 * * "pig"
		 * * "horse"
		 * * "cow"
		 * @type {FC.SpermType}
		 */
		this.ballType = "human";
		/**
		 * What species of ovum she produces.
		 * * "human"
		 * * "dog"
		 * * "pig"
		 * * "horse"
		 * * "cow"
		 * @type {FC.AnimalType}
		 */
		this.eggType = "human";
		/** Eugenics variable. Is the slave allowed to choose to wear chastity.
		 * @type {FC.Bool}
		 * 0: no; 1: yes */
		this.choosesOwnChastity = 0;
		/**
		 * Is she on gestation altering drugs?
		 * * "none"
		 * * "slow gestation"
		 * * "speed up"
		 * * "labor suppressors"
		 * @type {FC.WithNone<FC.GestationDrug>}
		 */
		this.pregControl = "none";
		/**
		 * Array that holds a slaves fitted prosthetics. Objects are used to ensure easier expansion later (tattoos for limbs and similar).
		 *
		 * Elements of the array should be objects.
		 * * .id: ID of the prosthetic, see App.Data.prostheticIDs
		 * @type {Array.<{id:string}>} */
		this.readyProsthetics = [];
		/** */
		this.ageAdjust = 0;
		/** Slave has undergone hair removal surgery
		 * @type {FC.Bool}
		 * 0: no; 1: yes */
		this.bald = 0;
		/** Slave is in original body.
		 *
		 * 0: yes; 1+: number of swaps (increases upkeep each time) */
		this.bodySwap = 0;
		/** Who, if relevant, this slave's current body belonged to originally. */
		this.origBodyOwner = "";
		/** Who, if relevant, this slave's original body currently belongs to (i.e. the exact opposite of the variable above). */
		this.origBodyOwnerID = 0;
		/**
		 * Slave's current hormonal balance, directs saHormones changes
		 *
		 * ||thresholds|
		 * |-|-|
		 * -500 | absolutely masculine
		 * -499 - -400 | overwhelmingly masculine
		 * -399 - -300 | extremely masculine
		 * -299 - -200 | heavily masculine
		 * -199 - -100 | very masculine
		 * -99 - -21 | masculine
		 * -20 - 20 | neutral
		 * 21 - 99 | feminine
		 * 100 - 199 | very feminine
		 * 200 - 299 | heavily feminine
		 * 300 - 399 | extremely feminine
		 * 400 - 499 | overwhelmingly feminine
		 * 500 | absolutely feminine
		 */
		this.hormoneBalance = 0;
		/** Whether a slave is permitted to eat Hedonistic Decadence's specialized slave food.
		 * @type {FC.Bool}
		 * 0: no; 1: yes */
		this.onDiet = 0;
		/** Does the slave have the breast shape maintaining mesh implant.
		 * @type {FC.Bool}
		 * 0: no; 1: yes */
		this.breastMesh = 0;
		/** Used to denote a slave giving birth prematurely.
		 * @type {FC.Bool}
		 * 0: no; 1: yes */
		this.prematureBirth = 0;
		/** Was the slave born prematurely?
		 * @type {FC.Bool}
		 * 0: no; 1: yes */
		this.premature = 0;
		/** Has the slave had a vasectomy?
		 * @type {FC.Bool}
		 * 0: no; 1: yes */
		this.vasectomy = 0;
		/** Is the slave's hair under constant maintenance?
		 * @type {FC.Bool}
		 * 0: no; 1: yes */
		this.haircuts = 0;
		/** Used to tell if the slave is from this game or a previous.
		 * @type {FC.Bool}
		 * 0: no; 1: yes */
		this.newGamePlus = 0;
		/** Her skills */
		this.skill = new App.Entity.SlaveSkillsState();
		/** Whether she was put in the incubator at birth
		 *
		 * 0: no; 1: yes, comforting; 2: yes, terrifying */
		this.tankBaby = 0;
		/** Is the slave a clone? If so, what is the original slave's name?
		 * @type {FC.Zeroable<string>}
		 * 0: no; 1: yes */
		this.clone = 0;
		/** ID she was cloned from */
		this.cloneID = 0;
		/** */
		this.geneMods = {
			/** Does slave have induced NCS?
			 * @type {FC.Bool}
			 * 0: no; 1: yes */
			NCS: 0,
			/** Has the slave undergone the elasticity (plasticity) treatment?
			 * @type {FC.Bool}
			 * 0: no; 1: yes */
			rapidCellGrowth: 0,
			/** Is the slave immortal?
			 * @type {FC.Bool}
			 * 0: no; 1: yes */
			immortality: 0,
			/** Has the slave been treated to produce flavored milk?
			 * @type {FC.Bool}
			 * 0: no; 1: yes */
			flavoring: 0,
			/** Has the slave's sperm been optimized?
			 * @type {FC.Bool}
			 * 0: no; 1: yes */
			aggressiveSperm: 0,
			/** Has the slave been optimized for production?
			 * @type {FC.Bool}
			 * 0: no; 1: yes */
			livestock: 0,
			/** Has the slave been optimized for child bearing?
			 * @type {FC.Bool}
			 * 0: no; 1: yes */
			progenitor: 0
		};
		/** flavor of their milk*/
		this.milkFlavor = "none";
		/* eslint-disable camelcase*/
		this.NCSyouthening = 0;
		this.override_Race = 0;
		this.override_Skin = 0;
		this.override_Eye_Color = 0;
		this.override_H_Color = 0;
		this.override_Pubic_H_Color = 0;
		this.override_Arm_H_Color = 0;
		this.override_Brow_H_Color = 0;
		/* eslint-enable */
		/** erratic weight gain
		 *
		 * 0: stable; 1: gaining; -1: losing */
		this.weightDirection = 0;
		/** Stores the exact colors of the albinism quirk
		 * @type {{skin:string, eyeColor:string, hColor:string}}
		 */
		this.albinismOverride = null;
		/** Amount of cash paid to acquire the slave
		 *
		 * accepts negative numbers, 0, or 1.
		 * 1: unknown price; 0: free; negative: amount paid */
		this.slaveCost = 0;
		/** Amount of cash you have spent because of this slave
		 *
		 * accepts negative numbers or 0 */
		this.lifetimeCashExpenses = 0;
		/** Total amount of cash you have earned because of this slave
		 *
		 * accepts positive numbers or 0 */
		this.lifetimeCashIncome = 0;
		/** Amount of cash you have earned because of this slave last week.
		 *
		 * Accepts positive numbers or 0 */
		this.lastWeeksCashIncome = 0;
		/** Not currently used, will work similarly to the cash variables above */
		this.lifetimeRepExpenses = 0;
		/** Not currently used, will work similarly to the cash variables above */
		this.lifetimeRepIncome = 0;
		/** Not currently used, will work similarly to the cash variables above */
		this.lastWeeksRepIncome = 0;
		/** Not currently used, will work similarly to the cash variables above */
		this.lastWeeksRepExpenses = 0;
		/** Player selected class for whore to target
		 * * 1: Lower class
		 * * 2: Middle class
		 * * 3: Upper class
		 * * 4: Top class
		 */
		this.whoreClass = 0;
		/** Slave's inbreeding coefficient */
		this.inbreedingCoeff = 0;

		// HACK to add property declarations for TypeScript
		if (false) { // eslint-disable-line
			/** @type {FC.PregnancyData | undefined} */
			this.pregData = undefined;
			/** @type {App.Entity.Fetus[] | undefined} */
			this.womb = undefined;
			/** @type {string | undefined} */
			this.clothingBaseColor = undefined;
			/** @type {string | undefined} */
			this.glassesColor = undefined;
			/** @type {string | undefined} */
			this.shoeColor = undefined;
			/** @type {number | undefined} */
			this.readyOva = undefined;
			/** @type {number | undefined} */
			this.kindness = undefined;
			/** @type {FC.Bool | undefined} */
			this.trueVirgin = 0;
		}
	}

	/** Creates an object suitable for setting nested attributes as it would be a SlaveState
	 * @returns {object} object containing all the attributes
	 * that are complex objects in the SlaveState class
	 */
	static makeSkeleton() {
		return {
			arm: {left: {}, right: {}},
			leg: {left: {}, right: {}},
			eye: {left: {}, right: {}},
			readyProsthetics: [], // yes, not an object, but needed for hero slaves
			health: {},
			counter: {},
			brand: {},
			scar: {},
			porn: {
				fame: {}
			},
			rules: {
				release: {}
			},
			skill: {},
			custom: {},
		};
	}
};

/**
 * @callback slaveOperation
 * @param {App.Entity.SlaveState} s
 * @returns {void}
 */

/**
 * @callback slaveTestCallback
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
