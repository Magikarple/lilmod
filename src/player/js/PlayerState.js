/**
 * Encapsulates the full description of a player state. Serializable by the SugarCube state
 * management.
 */

/**
 * Encapsulates your skills. Used inside of the
 * App.Entity.PlayerState class.
 * @see App.Entity.PlayerState
 */
App.Entity.PlayerSkillsState = class {
	constructor() {
		/** exclusive variables */
		/** Your skill in trading. */
		this.trading = 0;
		/** Your skill in warfare. */
		this.warfare = 0;
		/** Your skill in slaving. */
		this.slaving = 0;
		/** Your skill in engineering. */
		this.engineering = 0;
		/** Your skill in medicine. */
		this.medicine = 0;
		/** Your skill in hacking. */
		this.hacking = 0;
		/** Your skill in combat. */
		this.combat = 0;
		/** Your expected skill in arena fights */
		this.fighting = 0;
		/** Your skill in taking huge loads. */
		this.cumTap = 0;
	}
};

/**
 * Encapsulates your sexual preferences. Used inside of the
 * App.Entity.PlayerState class.
 * @see App.Entity.PlayerState
 */
App.Entity.PlayerReleaseRulesState = class {
	constructor() {
		/** Can you masturbate? */
		this.masturbation = 1;
		/** Can you fuck your romantic partner (relationship = FWB or higher)? */
		this.partner = 1;
		/** Can a development facility leader (Nurse, Attendant, etc) fuck you if you need it? */
		this.facilityLeader = 1;
		/** Can you fuck your close family members (siblings/parents/children)? */
		this.family = 1;
		/** Can you fuck the general slave population? */
		this.slaves = 1;
		/** Just here for compatibility with the slave version of ReleaseRulesState, should always be 1. */
		this.master = 1;
	}
};

/**
 * Encapsulates your preferences. Used inside of the
 * App.Entity.PlayerState class.
 * @see App.Entity.PlayerState
 */
App.Entity.PlayerRulesState = class {
	constructor() {
		/**
		 * Your starting expenses.
		 * * "spare"
		 * * "normal"
		 * * "luxurious"
		 */
		this.living = "luxurious";
		this.rest = "permissive";
		this.speech = "permissive";
		this.release = new App.Entity.PlayerReleaseRulesState();
		this.relationship = "permissive";
		/**
		 * How you are handling your lactation
		 * * "none"
		 * * "induce"
		 * * "maintain"
		 * * "sell"
		 */
		this.lactation = "none";
		this.punishment = "situational";
		this.reward = "relaxation";
	}
};

App.Entity.PlayerActionsCountersState = class {
	constructor() {
		/** exclusive variables */
		/** how many children you've carried for the SE */
		this.birthElite = 0;
		/** how many children you've carried for your former master (servant start only) */
		this.birthMaster = 0;
		/** how many slave babies you've had */
		this.birthDegenerate = 0;
		/** how many whoring babies you've had */
		this.birthClient = 0;
		/** how many children you've carried for other arc owners */
		this.birthArcOwner = 0;
		/** how many children you've had by sex with citizens (not whoring) */
		this.birthCitizen = 0;
		/** how many children you've had with the Sisters */
		this.birthFutaSis = 0;
		/** how many times you've giving birth to your own selfcest babies */
		this.birthSelf = 0;
		/** how many designer babies you've produced */
		this.birthLab = 0;
		/** hoy many children you've had fruit of unknown rapists */
		this.birthRape = 0;
		/** untracked births */
		this.birthOther = 0;
		/** how many units of your cum are stored away for artificially inseminating slaves */
		this.storedCum = 0;
		/** how many times you've been raped of forced to sex */
		this.raped = 0;
		/** shared variables */
		/** amount of milk given */
		this.milk = 0;
		/** amount of cum given */
		this.cum = 0;
		/** number of births as your slave */
		this.birthsTotal = 0;
		/** number of abortions as your slave */
		this.abortions = 0;
		/** number of miscarriages as your slave */
		this.miscarriages = 0;
		this.laborCount = 0;
		/** How many slaves you have sired. */
		this.slavesFathered = 0;
		/** How many slaves you have knocked up. */
		this.slavesKnockedUp = 0;
		/** amount of oral sex given */
		this.oral = 0;
		/** amount of vaginal sex received */
		this.vaginal = 0;
		/** amount of anal sex received */
		this.anal = 0;
		/** amount of mammary sex received */
		this.mammary = 0;
		/** amount of dicking done */
		this.penetrative = 0;
		/** number of fights won */
		this.pitWins = 0;
		/** number of fights lost */
		this.pitLosses = 0;
		/** number of hymen reconstructions */
		this.reHymen = 0;


		/** content for pInsemination */
		this.moves = 0;
		this.quick = 0;
		this.crazy = 0;
		this.virgin = 0;
		this.futa = 0;
		this.preggo = 0;
	}
};

/**
 * Encapsulates various custom properties, set by users
 */
App.Entity.PlayerCustomAddonsState = class PlayerCustomAddonsState {
	constructor() {
		/** adds a custom tattoo */
		this.tattoo = "";
	}
};

App.Entity.PlayerRelationshipsState = class PlayerRelationshipsState {
	// in the future this will be used to determine who will be used to sate player lust
	constructor() {
		/** player's wives */
		this.marriage = [];
		/** player's lovers */
		this.lovers = [];
		/** player's friends with benefits */
		this.FWBs = [];
		/** player's best friends */
		this.BFFs = [];
		/** player's friends */
		this.friends = [];
		/** slaves player likes */
		this.likes = [];
		/** slaves player dislikes */
		this.dislikes = [];
		/** slaves player hates */
		this.hates = [];
		/** slaves player loathes */
		this.loathes = [];
		/**
		 * player's emotional obsession
		 * * -2: emotionally bound to you
		 * * -1: emotional slut
		 * * 0: none
		 * * (ID): target of obsession
		 */
		this.obsession = 0;
	}
};

App.Entity.PlayerPornPerformanceState = class {
	constructor() {
		this.feed = 0;
		this.viewerCount = 0;
		this.spending = 0;
		this.prestige = 0;
		this.prestigeDesc = 0;
		/** what porn you are known for */
		this.fameType = "none";
		/** what aspect of you is being focused on for porn */
		this.focus = "none";
		/** your fame in each porn genre */
		this.fame = {};
		for (const genre of App.Porn.getAllGenres()) {
			this.fame[genre.fameVar] = 0;
		}
	}
};

App.Entity.PlayerState = class PlayerState {
	constructor() {
		/** Player's current name */
		this.slaveName = "Anonymous";
		/** Player's current surname
		 * @type {FC.Zeroable<string>} */
		this.slaveSurname = 0;
		/** Player's original name */
		this.birthName = "Anonymous";
		/** Player's original surname
		 * @type {FC.Zeroable<string>} */
		this.birthSurname = "";
		/** Player sex ("XX", "XY")
		 * @type {FC.GenderGenes} */
		this.genes = "XY";
		// exclusive major player variables here
		/** your title's gender
		 *
		 * 0: female; 1: male */
		this.title = 1;
		/**
		 * How strong/are there rumors about you doing unsavory things with your slaves
		 * * 0 - 10: occasional whispers
		 * * 11	- 25: minor rumors
		 * * 26	- 50: rumors
		 * * 51	- 75: bad rumors
		 * * 70	- 100: severe rumors
		 * * 101+: life ruining rumors
		 */
		this.degeneracy = 0;
		/** your favorite refreshment
		 * @type {string} */
		this.refreshment = "cigar";
		/**
		 * * The method of consumption of .refreshment
		 * * 0: smoked
		 * * 1: drunk
		 * * 2: eaten
		 * * 3: snorted
		 * * 4: injected
		 * * 5: popped
		 * * 6: orally dissolved
		 */
		this.refreshmentType = 0;
		/** @type {number} */
		this.pronoun = App.Data.Pronouns.Kind.male;
		/** player's natural genetic properties */
		this.natural = new App.Entity.GeneticState();
		/**
		 * * career prior to becoming owner
		 * * (22+)			(14+)					(10+)
		 * * "wealth"		("trust fund")			("rich kid")
		 * * "capitalist"	("entrepreneur")		("business kid")
		 * * "mercenary"	("recruit")				("child soldier")
		 * * "slaver"		("slave overseer")		("slave tender")
		 * * "engineer"		("construction")		("worksite helper")
		 * * "medicine" 	("medical assistant")	("nurse")
		 * * "celebrity"	("rising star")			("child star")
		 * * "escort"		("prostitute")			("child prostitute")
		 * * "servant"		("handmaiden")			("child servant")
		 * * "gang"			("hoodlum")				("street urchin")
		 * * "BlackHat"		("hacker")				("script kiddy")
		 * * "arcology owner"
		 */
		this.career = "capitalist";
		/**
		 * * how player became owner
		 * * "wealth"
		 * * "diligence"
		 * * "force"
		 * * "social engineering"
		 * * "luck"
		 */
		this.rumor = "wealth";
		/** Player's ID
		 * @type {-1} */
		this.ID = -1;
		/** your ability to function normally in day to day affairs
		 *
		 * 0: normal, 1: hindered, 2: unable */
		this.physicalImpairment = 0;
		/** Player's prestige */
		this.prestige = 0;
		/** reason for prestige
		 * @type {FC.Zeroable<string>} */
		this.prestigeDesc = 0;
		this.relationships = new App.Entity.PlayerRelationshipsState();
		this.father = 0;
		this.mother = 0;
		this.daughters = 0;
		this.sisters = 0;
		/** how far your training has progressed (education/sparring) */
		this.training = 0;
		/** week you was born (int between 0-51) */
		this.birthWeek = jsRandom(0, 51);
		/** How old you really are. */
		this.actualAge = 35;
		/** How old your body looks. */
		this.visualAge = 35;
		/** How old your body is. */
		this.physicalAge = 35;
		/** How old your ovaries are. (used to trick menopause) */
		this.ovaryAge = 35;
		/** has had facial surgery to reduce age. 0: no, 1: yes
		 * @type {FC.Bool} */
		this.ageImplant = 0;
		/** compatibility **/
		this.devotion = 0;
		this.health = {
			/**
			 * your health
			 * * -90 - : On the edge of death
			 * * -90 - -51: Extremely unhealthy
			 * * -50 - -21: Unhealthy
			 * * -20 -  20: Healthy
			 * * 21  -  50: Very healthy
			 * * 50  -  90: Extremely healthy
			 * * 90  -  : Unnaturally healthy
			 */
			condition: 60,
			/** your short term health damage, used to determine how long you are in recovery */
			shortDamage: 0,
			/** your long term health damage */
			longDamage: 0,
			/**
			 * your current illness status
			 * * 0 : Not ill
			 * * 1 : A little under the weather
			 * * 2 : Minor illness
			 * * 3 : Ill
			 * * 4 : serious illness
			 * * 5 : dangerous illness
			 */
			illness: 0,
			/**
			 * your current level of exhaustion
			 * * 0  - 50 : Perfectly fine
			 * * 50 - 80 : tired
			 * * 80 - 100 : exhausted
			 */
			tired: 0,
			/** your combined health (condition - short - long) */
			health: 0
		};
		/**
		 * you have a minor injury ("black eye", "bruise", "split lip")
		 * @type {FC.MinorInjury}
		 */
		this.minorInjury = 0;
		/**
		 * you have taken a major injury
		 * number of weeks laid up in bed until recovery
		 */
		this.majorInjury = 0;
		/**
		 * you have a life-changing injury/malaise
		 * @type {number | string}
		 */
		this.criticalDamage = 0;
		/**
		 * your weight
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
		 * your musculature
		 * * 96+ : extremely muscular
		 * * 31 - 95: muscular
		 * * 6 - 30: toned
		 * * -5 - 5: none
		 * * -30 - -6: weak
		 * * -95 - -31: very weak
		 * * -96- : frail
		 */
		this.muscles = 30;
		/**
		 * your height in cm
		 * * < 150: petite
		 * * 150 - 159: short
		 * * 160 - 169: average
		 * * 170 - 185: tall
		 * * 186+ : very tall
		 */
		this.height = 185;
		/** you have height implant
		 * -1: -10 cm, 0: none, 1: +10 cm */
		this.heightImplant = 0;
		/** your nationality */
		this.nationality = "Stateless";
		/** your race
		 * @type {FC.Race}
		 */
		this.race = "white";
		/** your original race */
		this.origRace = "white";
		/**
		 * your markings
		 * * "beauty mark"
		 * * "birthmark"
		 * * "freckles"
		 * * "heavily freckled"
		 * @type {FC.Markings}
		 */
		this.markings = "none";
		/** "none", "glasses", "corrective glasses", "corrective contacts" */
		this.eyewear = "none";
		/**
		 * your eyes
		 */
		this.eye = new App.Entity.EyeState();
		/** your hearing
		 * @type {FC.Hearing}
		 * -2: deaf; -1: hard of hearing; 0: normal */
		this.hears = 0;
		/** "none", "hearing aids", "muffling ear plugs", "deafening ear plugs" */
		this.earwear = "none";
		/** is there an inner ear implant device
		 * @type {FC.Bool}
		 * 0: no; 1: yes */
		this.earImplant = 0;
		/** the shape of your outer ears
		 * "none", "damaged", "normal", "pointy", "elven", "ushi" */
		this.earShape = "normal";
		/** type of kemonomimi ears if any
		 * "cat", "dog", "fox", "tanuki", "cow" */
		this.earT = "none";
		/** kemonomimi ear color
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
		 * "none", "curved succubus horns", "backswept horns", "cow horns", "one long oni horn", "two long oni horns", "small horns" */
		this.horn = "none";
		/** horn color */
		this.hornColor = "none";
		/** type of tail installed
		 * "none", "mod", "combat", "sex"*/
		this.tail = "none";
		/**
		 * Do you have a tail interface installed
		 * * 0: no
		 * * 1: yes
		 */
		this.PTail = 0;
		/** the current shape of your modular tail
		 * "none", "cat", "dog", "fox", "kitsune", "tanuki", "cow", "rabbit", "squirrel", "horse" */
		this.tailShape = "none";
		/** tail color */
		this.tailColor = "none";
		/** tail effect color */
		this.tailEffectColor = "none";
		/** tail effect */
		this.tailEffect = "none";
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
		/** your original hair color, defaults to your initial hair color. */
		this.origHColor = "blonde";
		/** hair color */
		this.hColor = "blonde";
		/** hair effect color */
		this.hEffectColor = "none";
		/** hair effect */
		this.hEffect = "none";
		/** pubic hair color */
		this.pubicHColor = "blonde";
		/** armpit hair style */
		this.underArmHColor = "blonde";
		/** eyebrowHColor*/
		this.eyebrowHColor = "blonde";
		/** your original skin color. */
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
		this.hLength = 2;
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
		this.pubicHStyle = "hairless";
		/** armpit hair style */
		this.underArmHStyle = "hairless";
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
		 * What level of prosthetic interface you have installed
		 * * 0: no interface
		 * * 1: basic interface
		 * * 2: advanced interface
		 * * 3: quadruped interface
		 * @type {0 | 1 | 2 | 3}
		 */
		this.PLimb = 0;
		/**
		 * your legs
		 */
		this.leg = {
			left: new App.Entity.LegState(),
			right: new App.Entity.LegState()
		};
		/**
		 * your arms
		 */
		this.arm = {
			left: new App.Entity.ArmState(),
			right: new App.Entity.ArmState()
		};
		/** are your heels clipped
		 * @type {FC.Bool}
		 * 0: no, 1: yes */
		this.heels = 0;
		/** your voice
		 *
		 * 0: mute, 1: deep, 2: feminine, 3: high, girly */
		this.voice = 1;
		/** has voice implant
		 *
		 * 0: no; 1: yes, high; -1: yes, low */
		this.voiceImplant = 0;
		/** have cybernetic voicebox
		 * @type {FC.Bool}
		 * 0: no; 1: yes */
		this.electrolarynx = 0;
		/**
		 * your accent
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
		 * have shoulder implant
		 *
		 * * -1: shoulders -1
		 * * 0: none
		 * * 1: shoulders +1
		 */
		this.shouldersImplant = 0;
		/**
		 * your boob size (in cc)
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
		 * * 8500-8999 - ZZ-cup
		 * * 9000-9999 - ZZZ-cup
		 * * 10000-14999 - obscenely massive
		 * * 15000-24999 - arm filling
		 * * 25000-39999 - figure dominating
		 * * 40000-54999 - beachball-sized
		 * * 55000-69999 - lap filling
		 * * 70000-89999 - door-crowding
		 * * 90000-100000 - door-jamming
		 */
		this.boobs = 200;
		/** breast engorgement from unmilked tits */
		this.boobsMilk = 0;
		/**
		 * your implant size
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
		 * @type {FC.BreastShape}
		 */
		this.boobShape = "perky";
		/**
		 * nipple shape
		 * * "huge"
		 * * "puffy"
		 * * "inverted"
		 * * "tiny"
		 * * "cute"
		 * * "partially inverted"
		 * * "fuckable"
		 * @type {FC.NippleShape}
		 */
		this.nipples = "cute";
		/** what accessory, if any, are on your nipples */
		this.nipplesAccessory = "none";
		/** slave areolae
		 *
		 * 0: normal; 1: large; 2: unusually wide; 3: huge, 4: massive */
		this.areolae = 0;
		/** your areolae shape ("heart"; "star"; "circle") */
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
		/** your lactation
		 *
		 * 0: none; 1: natural; 2: implant */
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
		/** you have hip implant
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
		this.butt = 2;
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
		this.face = 100;
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
		 * * "straightening braces"
		 * * "cosmetic braces"
		 * * "removable"
		 * * "pointy"
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
		this.vagina = -1;
		/** have has your vagina improved
		 * @type {FC.Bool}
		 * 0: no; 1: yes; */
		this.newVag = 0;
		/** exclusive variable
		 * how wet you are
		 *
		 * 0: dry; 1: wet; 2: soaking wet */
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
		this.preg = 0;
		/**
		 * accepts ID See Pregnancy Control section for more.
		 *
		 * Who sired your pregnancy
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
		 * Number of ready to be impregnated ova (override normal cases),
		 *
		 * For delayed impregnations with multiples.Used onetime on next call of the SetPregType
		 * widget. After SetPregType use it to override .pregType, it set back to 0 automatically.
		 */
		this.readyOva = 0;
		/** exclusive variable
		 * (uncommon in events)(V.PC.preg >= 28)
		 * how you act when heavily pregnant
		 * * 0 - no change
		 * * 1 - submissive and motherly
		 * * 2 - aggressive and dominant
		 */
		this.pregMood = 0;
		/**
		 * How adapted you are to being pregnant (allows for larger, safer pregnancies)
		 */
		this.pregAdaptation = 50;
		/**
		 * Ovary implant type.
		 * @type {number|string}
		 *
		 * * 0: no implants
		 * * "fertility": higher chance of twins (or more)
		 * * "sympathy": doubles eggs released
		 * * "asexual": self-fertilizing
		 */
		this.ovaImplant = 0;
		/**
		 * Womb focused enhancements.
		 *
		 * * "none"
		 * * "restraint": Provides structural support for extremely oversized pregnancies
		 */
		this.wombImplant = "none";
		/**
		 * Menstrual cycle known variable. To be used for fert cycle discover and things like pregnancy without a first period
		 * @type {FC.Bool}
		 * * 0: no
		 * * 1: yes
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
		 * are you a broodmother
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
		 * 1: birth this week; 0: not time yet */
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
		 */
		this.bellyAccessory = "none";
		/**
		 * labia type
		 * * 0: minimal
		 * * 1: big
		 * * 2: huge
		 * * 3: huge dangling
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
		 */
		this.clit = 0;
		/** 0: circumcised; 1+:uncut, also affects foreskin size */
		this.foreskin = 0;
		/**
		 * anus size
		 * * 0: virgin
		 * * 1: tight
		 * * 2: loose
		 * * 3: very loose
		 * * 4: gaping
		 */
		this.anus = 0;
		/** used to calculate size of area around anus. */
		this.analArea = 1;
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
		this.dick = 4;
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
		 */
		this.prostate = 1;
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
		this.balls = 3;
		/** Exclusive variable
		 * ball size booster
		 * * 0: none
		 */
		this.ballsImplant = 0;
		/**
		 * scrotum size
		 *
		 * function relative to .balls
		 *
		 * *If .balls > 0 and .scrotum === 0, balls are internal*
		 */
		this.scrotum = 4;
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
		/**
		 * brand
		 *
		 * @type {{[key: string]: string}} */
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
		/**
		 * * "healthy"
		 * * "restricted"
		 * * "muscle building"
		 * * "fattening"
		 * * "slimming"
		 * * "XX"
		 * * "XY"
		 * * "XXY"
		 * * "cum production"
		 * * "cleansing"
		 * * "fertility"
		 * @type {FC.PCDiet}
		 */
		this.diet = "healthy";
		/**
		 * * "normal"
		 * * "atrophied"
		 */
		this.digestiveSystem = "normal";
		/** progress until .digestiveSystem is swapped to "normal". Completes at 20.*/
		this.weaningDuration = 0;
		/**
		 * * -2: heavy male hormones
		 * * -1: male hormones
		 * * 0: none
		 * * 1: female hormones
		 * * 2: heavy female hormones
		 */
		this.hormones = 0;
		/** compatibility */
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
		/**
		 * may accept strings, use at own risk
		 *
		 * * "a nice maid outfit"
		 * * "a slutty outfit"
		 * * "nice business attire"
		 * * "no clothing"
		 * @type {FC.Clothes} */
		this.clothes = "nice business attire";
		/**
		 * may accept strings, use at own risk
		 * * "none"
		 */
		this.collar = "none";
		/**
		 * may accept strings, use at own risk
		 * * "none"
		 * * "flats"
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
		 * Do you have an attachment on your buttplug
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
		 * your intelligence
		 * * -100 - -96: borderline retarded
		 * * -95 - -51: very slow
		 * * -50 - -16: slow
		 * * -15 - 15: average
		 * * 16 - 50: smart
		 * * 51 - 95: very smart
		 * * 96 - 100: brilliant
		 */
		this.intelligence = 100;
		/**
		 * Degree of your education
		 * * -15+: miseducated (you appear to be dumber than you really are)
		 * * 0: uneducated
		 * * 1+: partial education (not really used)
		 * * 15+: educated
		 * * 30: well educated
		 */
		this.intelligenceImplant = 30;
		/**
		 * sex drive
		 * * 0 - 20: no sex drive
		 * * 21 - 40: poor sex drive
		 * * 41 - 60: average sex drive
		 * * 61 - 80: good sex drive
		 * * 81 - 95: powerful sex drive
		 * * 96+: nymphomaniac
		 */
		this.energy = 65;
		/**
		 * Used to give feedback on energy changes
		 */
		this.oldEnergy = 0;
		/**
		 * how badly you need sex. Will be how much sex you can have a week
		 *
		 * 0: sated
		 */
		this.need = 0;
		/**
		 * Used in endWeek to store .need adjustments
		 */
		this.deferredNeed = 0;
		/**
		 * If sexual need is not met, apply punishment for following week.
		 *
		 * 1: overtly horny
		 * 0: sated
		 */
		this.lusty = 0;
		/**
		 * A list of IDs of anyone the PC has ever slept with.
		 *
		 * Only contains unique entries.
		 *
		 * | ***ID*** | **Type**               |
		 * |---------:|:-----------------------|
		 * | *1+*     | Normal slave		   |
		 * | *-2*     | Citizen*               |
		 * | *-3*     | PC's former master*    |
		 * | *-4*     | Fellow arcology owner* |
		 * | *-6*     | Societal Elite*        |
		 * | *-8*     | Animal*                |
		 * | *-9*     | Futanari Sister*       |
		 * | *-10*    | Rapist*                |
		 *
		 * **not currently implemented*
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
		 * *if both attrXX and attrXY > 95, you will be omnisexual*
		 *
		 * *if energy > 95 and either attrXX or attrXY > 95, you will be nymphomaniac*
		 */
		this.attrXX = 100;
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
		 * *if both attrXX and attrXY > 95, you will be omnisexual*
		 *
		 * *if energy > 95 and either attrXX or attrXY > 95, you will be nymphomaniac*
		 */
		this.attrXY = 100;
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
		 * @type {FC.Fetish}
		 */
		this.fetish = "none";
		/** how strong your fetish is (10-100)
		 *
		 * 10+: enjoys fetish; 60+: likes fetish; 95+: loves fetish */
		this.fetishStrength = 70;
		/**
		 * * "none"
		 * * "arrogant": clings to her dignity, thinks slavery is beneath her
		 * * "bitchy": can 't keep her opinions to herself
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
			/** may have mismatched eyes */
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
		/** Counts various thing you have done in */
		this.counter = new App.Entity.PlayerActionsCountersState();
		/** Values provided by players */
		this.custom = new App.Entity.PlayerCustomAddonsState();
		/**
		 * You have a tattoo that is only recognizable when you have a big belly.
		 * * "a heart"
		 * * "a star"
		 * * "a butterfly"
		 * @type {FC.Zeroable<string>} */
		this.bellyTat = 0;
		/**
		 * You have a series of tattoos to denote how many abortions you've had.
		 * * -1: no tattoo
		 * *  0: assigned to have tattoo, may not have one yet
		 * * 1+: number of abortion tattoos she has
		 */
		this.abortionTat = -1;
		/**
		 * You have a series of tattoos to denote how many times you've given birth.
		 * * -1: no tattoo
		 * *  0: assigned to have tattoo, may not have one yet
		 * * 1+: number of birth tattoos she has
		 */
		this.birthsTat = -1;
		/** You will give birth this week.
		 * @type {FC.Bool}
		 * 1: true; 0: false */
		this.induce = 0;
		/** You have an anal womb and can get pregnant.
		 * @type {FC.Bool}
		 * 1: true; 0: false */
		this.mpreg = 0;
		/** How much fluid is distending your middle.
		 *
		 * 1: 2L; 2: 4L; 3: 8L */
		this.inflation = 0;
		/**
		 * What kind of fluid is in you.
		 * * "none"
		 * * "water"
		 * * "cum"
		 * * "milk"
		 * * "food"
		 * * "aphrodisiac"
		 * * "curative"
		 * * "tightener"
		 * * "urine"
		 */
		this.inflationType = "none";
		/**
		 * How you are being filled.
		 * * 0: not
		 * * 1: oral
		 * * 2: anal
		 * * 3: orally by another slave
		 */
		this.inflationMethod = 0;
		/** If inflationMethod === 3, ID of the slave filling you with milk. */
		this.milkSource = 0;
		/** If inflationMethod 3, ID of the slave filling you with cum. */
		this.cumSource = 0;
		/** Your internals have ruptured. Used with poor health and overinflation.
		 * @type {FC.Bool}
		 * 1: true; 0: false */
		this.burst = 0;
		/** Do you know you are pregnant.
		 * @type {FC.Bool}
		 * 0: no; 1: yes */
		this.pregKnown = 0;
		/** How long you have been pregnant
		 *
		 * used in place of .preg when pregnancy speed up and slow down are used
		 *
		 * if negative, designates postpartum. */
		this.pregWeek = 0;
		/**
		 * how big your belly is in CCs
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
		 * how big your belly is in CCs (pregnancy only)
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
		 * how big your belly is in CCs (fluid distension only)
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
		 * Do you have a fillable abdominal implant.
		 * * -1: no
		 * * 0+: yes
		 * * 2000+: Early pregnancy
		 * * 4000+: looks pregnant
		 * * 8000+: looks full term
		 * * 16000+: hyperpregnant 1
		 * * 32000+: hyperpregnant 2
		 */
		this.bellyImplant = -1;
		/** How saggy your belly is after being distended for too long.
		 *
		 * 1+ changes belly description */
		this.bellySag = 0;
		/** How saggy your belly is from being too pregnant.
		 *
		 * 1+ changes belly description and overrides/coincides with bellySag */
		this.bellySagPreg = 0;
		/**
		 * Has the your belly implant been filled this week. Causes health damage for overfilling.
		 *
		 * 0: no pain; 1: will experience pain; 2: cannot be filled this week */
		this.bellyPain = 0;
		/** Do you have a cervical implant that slowly feeds cum from being fucked into a fillable implant.
		 *
		 * 0: no; 1: vaginal version only; 2: anal version only; 3: both vaginal and anal */
		this.cervixImplant = 0;
		/** Target .physicalAge for female puberty to occur. */
		this.pubertyAgeXX = 13;
		/** Have you gone through female puberty.
		 * @type {FC.Bool}
		 * 0: no; 1: yes */
		this.pubertyXX = 0;
		/** Target .physicalAge for male puberty to occur. */
		this.pubertyAgeXY = 13;
		/** Have you slave gone through male puberty.
		 * @type {FC.Bool}
		 * 0: no; 1: yes */
		this.pubertyXY = 0;
		/**
		 * scar
		 * Sub-object:
		 * the body part in question, such as back or left hand
		 * the key of that part is the type of scar they can have and the value is how serious it is, from 0 up
		 * @type {{[key: string]: object}} */
		this.scar = {};
		/**
		 * In a eugenics society, you are a designated breeder.
		 * @type {FC.Bool}
		 * 1: yes; 0: no */
		this.breedingMark = 0;
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
		/**
		 * Is she on gestation altering drugs?
		 * * "none"
		 * * "labor suppressors"
		 * @type {FC.WithNone<FC.GestationDrug>}
		 */
		this.pregControl = "none";
		/** */
		this.ageAdjust = 0;
		/** You are bald
		 * @type {FC.Bool}
		 * 0: no; 1: yes */
		this.bald = 0;
		/** You are in your original body.
		 *
		 * 0: yes; 1+: number of swaps (increases upkeep each time) */
		this.bodySwap = 0;
		/** Who, if relevant, the body belonged to. */
		this.origBodyOwner = "";
		/** Who, if relevant, the body belonged to. */
		this.origBodyOwnerID = 0;
		/**
		 * Player's current hormonal balance, directs saHormones changes
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
		/** Do you have the breast shape maintaining mesh implant.
		 * @type {FC.Bool}
		 * 0: no; 1: yes */
		this.breastMesh = 0;
		/** Used to denote you are giving birth prematurely.
		 * @type {FC.Bool}
		 * 0: no; 1: yes */
		this.prematureBirth = 0;
		/** Were you born prematurely?
		 * @type {FC.Bool}
		 * 0: no; 1: yes */
		this.premature = 0;
		/** Have you had a vasectomy?
		 * @type {FC.Bool}
		 * 0: no; 1: yes */
		this.vasectomy = 0;
		/** Is the slave's hair under constant maintenance?
		 * @type {FC.Bool}
		 * 0: no; 1: yes */
		this.haircuts = 0;
		/** Your skills */
		this.skill = new App.Entity.PlayerSkillsState();
		/** Your Preferences */
		this.rules = new App.Entity.PlayerRulesState();
		/** Whether she was put in the incubator at birth
		 *
		 * 0: no; 1: yes, comforting; 2: yes, terrifying */
		this.tankBaby = 0;
		/** Are you a clone, and of whom?
		 * @type {FC.Zeroable<string>} */
		this.clone = 0;
		/** */
		this.geneMods = {
			/** Do you have induced NCS?
			 * @type {FC.Bool}
			 * 0: no; 1: yes */
			NCS: 0,
			/** Have you undergone the elasticity (plasticity) treatment?
			 * @type {FC.Bool}
			 * 0: no; 1: yes */
			rapidCellGrowth: 0,
			/** Are you immortal?
			 * @type {FC.Bool}
			 * 0: no; 1: yes */
			immortality: 0,
			/** Is your milk flavored?
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
		/** erratic weight gain
		 *
		 * 0: stable; 1: gaining; -1: losing */
		this.weightDirection = 0;
		/** Stores the exact colors of the albinism quirk
		 * @type {{skin:string, eyeColor:string, hColor:string}}
		 */
		this.albinismOverride = null;
		// exclusive minor player variables (probably) here
		/** have you been drugged with fertility drugs
		 *
		 * 0: no; 1+: how many weeks they will remain in your system */
		this.forcedFertDrugs = 0;
		/** Player's coefficient of inbreeding */
		this.inbreedingCoeff = 0;
		/** Controls if femPC lost virginity before or after taking over */
		this.trueVirgin = 0;

		// HACK to add property declarations for TypeScript
		if (false) { // eslint-disable-line
			/** @type {string|undefined} */
			this.customTitle = undefined;
			/** @type {string|undefined} */
			this.customTitleLisp = undefined;
			/** @type {FC.PregnancyData | undefined} */
			this.pregData = undefined;
			/** @type {App.Entity.Fetus[] | undefined} */
			this.womb = undefined;
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
			counter: {},
			brand: {},
			scar: {},
			skill: {},
			rules: {},
			custom: {},
		};
	}
};

/**
 * @callback playerOperation
 * @param {App.Entity.PlayerState} s
 * @returns {void}
 */

/**
 * @callback playerTestCallback
 * @param {App.Entity.PlayerState} PC
 * @returns {boolean}
 */
