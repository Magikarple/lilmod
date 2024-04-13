/**
 * @type {FC.Rules.LivingFreezed}
 * @enum {string}
 */
globalThis.LivingRule = Object.freeze({LUXURIOUS: 'luxurious', NORMAL: 'normal', SPARE: 'spare'});
/**
 * @type {FC.Rules.RestFreezed}
 * @enum {string}
 */
globalThis.RestRule = Object.freeze({
	MANDATORY: 'mandatory', MAX: 'permissive', MID: 'restrictive', MIN: 'cruel', NONE: 'none'
});
/**
 * @type {FC.AssignmentFreeze}
 * @enum {string}
 */
globalThis.Job = Object.freeze({
	// Penthouse Assignments
	REST: 'rest',
	FUCKTOY: 'please you',
	CLASSES: 'take classes',
	HOUSE: 'be a servant',
	WHORE: 'whore',
	PUBLIC: 'serve the public',
	SUBORDINATE: 'be a subordinate slave',
	MILKED: 'get milked',
	GLORYHOLE: 'work a glory hole',
	CONFINEMENT: 'stay confined',
	// Leadership Assignments
	BODYGUARD: 'guard you',
	HEADGIRL: 'be your Head Girl',
	HEADGIRLSUITE: 'live with your Head Girl',
	RECRUITER: 'recruit girls',
	AGENT: 'be your agent',
	AGENTPARTNER: 'live with your agent',
	// Facility Assignments
	ARCADE: 'be confined in the arcade',
	MADAM: 'be the Madam',
	BROTHEL: 'work in the brothel',
	WARDEN: 'be the Wardeness',
	CELLBLOCK: 'be confined in the cellblock',
	DJ: 'be the DJ',
	CLUB: 'serve in the club',
	NURSE: 'be the Nurse',
	CLINIC: 'get treatment in the clinic',
	MILKMAID: 'be the Milkmaid',
	DAIRY: 'work in the dairy',
	FARMER: 'be the Farmer',
	FARMYARD: 'work as a farmhand',
	CONCUBINE: 'be your Concubine',
	MASTERSUITE: 'serve in the master suite',
	MATRON: 'be the Matron',
	NURSERY: 'work as a nanny',
	TEACHER: 'be the Schoolteacher',
	SCHOOL: 'learn in the schoolroom',
	STEWARD: 'be the Stewardess',
	QUARTER: 'work as a servant',
	ATTENDANT: 'be the Attendant',
	SPA: 'rest in the spa',
	// Does this one exist?
	BABY_FACTORY: 'labor in the production line',
	// Other
	CHOICE: 'choose her own job',
	// Pseudo-jobs
	LURCHER: '@Lurcher',
	PIT: '@Pit',
	ARENA: "@Arena",
	IMPORTED: '@be imported',
	TANK: '@lay in tank'
});

/**
 * @enum {string}
 */
globalThis.PersonalAttention = Object.freeze({
	TRADE: 'trading',
	WAR: 'warfare',
	SLAVING: 'slaving',
	ENGINEERING: 'engineering',
	MEDICINE: 'medicine',
	MAID: 'upkeep',
	HACKING: 'hacking',
	SUPPORT_HG: 'HG',
	WHORING: 'whoring',
	BUSINESS: 'business',
	SMUGGLING: 'smuggling',
	SURVEY: 'defensive survey',
	DEVELOPMENT: 'development project',
	TECH: 'technical accidents',
	FIGHT: 'fighting',
	SEX: 'sex',
	RELAX: 'rest and relaxation',
	PROCLAMATION: 'proclamation',
	TRAINING: 'slave training',
	IMAGE: 'popularity',
	STUDY: 'education',
	GED: 'degree',
	EDUCATION: 'advanced education',
	TEST: 'advanced degree',
});

/**
 * @enum {string}
 */
globalThis.DescType = Object.freeze({
	NORMAL: "normal",
	MARKET: "market",
	EVENT: "event",
	SURGERY: "surgery"
});

/**
 * @type {FC.FetishFreeze}
 * @enum {string}
 */
globalThis.Fetish = Object.freeze({
	NONE: "none",
	MINDBROKEN: "mindbroken",
	SUBMISSIVE: "submissive",
	CUMSLUT: "cumslut",
	HUMILIATION: "humiliation",
	BUTTSLUT: "buttslut",
	BOOBS: "boobs",
	SADIST: "sadist",
	MASOCHIST: "masochist",
	DOM: "dom",
	PREGNANCY: "pregnancy",
	BESTIALITY: "bestiality",
});

/**
 * @type {FC.BehavioralFlawFreeze}
 * @enum {string}
 */
globalThis.BehavioralFlaw = Object.freeze({
	NONE: "none",
	ARROGANT: "arrogant",
	BITCHY: "bitchy",
	ODD: "odd",
	HATESMEN: "hates men",
	HATESWOMEN: "hates women",
	GLUTTONOUS: "gluttonous",
	ANOREXIC: "anorexic",
	DEVOUT: "devout",
	LIBERATED: "liberated",
});

/**
 * @type {FC.BehavioralQuirkFreeze}
 * @enum {string}
 */
globalThis.BehavioralQuirk = Object.freeze({
	NONE: "none",
	CONFIDENT: "confident",
	CUTTING: "cutting",
	FUNNY: "funny",
	FITNESS: "fitness",
	ADORESWOMEN: "adores women",
	ADORESMEN: "adores men",
	INSECURE: "insecure",
	SINFUL: "sinful",
	ADVOCATE: "advocate",
});

/**
 * @type {FC.SexualFlawFreeze}
 * @enum {string}
 */
globalThis.SexualFlaw = Object.freeze({
	NONE: "none",
	HATESORAL: "hates oral",
	HATESANAL: "hates anal",
	HATESPEN: "hates penetration",
	SHAMEFAST: "shamefast",
	IDEAL: "idealistic",
	REPRESSED: "repressed",
	APATHETIC: "apathetic",
	CRUDE: "crude",
	JUDGEMENT: "judgemental",
	NEGLECT: "neglectful",
	CUMADDICT: "cum addict",
	ANALADDICT: "anal addict",
	ATTENTION: "attention whore",
	BREASTEXP: "breast growth",
	ABUSIVE: "abusive",
	MALICIOUS: "malicious",
	SELFHATING: "self hating",
	BREEDER: "breeder",
	ANIMALLOVER: "animal lover",
});

/**
 * @type {FC.SexualQuirkFreeze}
 * @enum {string}
 */
globalThis.SexualQuirk = Object.freeze({
	NONE: "none",
	GAGFUCK: "gagfuck queen",
	PAINAL: "painal queen",
	STRUGGLE: "strugglefuck queen",
	TEASE: "tease",
	ROMANTIC: "romantic",
	PERVERT: "perverted",
	CARING: "caring",
	UNFLINCHING: "unflinching",
	SIZEQUEEN: "size queen",
});

/**
 * @type {FC.BreastShapeFreeze}
 * @enum {string}
 */
globalThis.BreastShape = Object.freeze({
	NORMAL: "normal",
	PERKY: "perky",
	SAGGY: "saggy",
	TORPEDO: "torpedo-shaped",
	DOWNWARD: "downward-facing",
	WIDE: "wide-set",
	SPHERICAL: "spherical",
});

/**
 * @type {FC.DietFreeze}
 * @enum {string}
 */
globalThis.Diet = Object.freeze({
	HEALTHY: "healthy",
	RESTRICTED: "restricted",
	CORRECTIVE: "corrective",
	MUSCLE: "muscle building",
	FATTEN: "fattening",
	SLIM: "slimming",
	FEMALE: "XX",
	MALE: "XY",
	FUTA: "XXY",
	CUM: "cum production",
	CLEANSE: "cleansing",
	FERTILITY: "fertility",
	CALORIC: "high caloric",
});

/**
 * @type {FC.PCDietFreeze}
 * @enum {string}
 */
globalThis.PCDiet = Object.freeze({
	HEALTHY: "healthy",
	RESTRICTED: "restricted",
	CORRECTIVE: "corrective",
	MUSCLE: "muscle building",
	FATTEN: "fattening",
	SLIM: "slimming",
	FEMALE: "XX",
	MALE: "XY",
	FUTA: "XXY",
	CUM: "cum production",
	CLEANSE: "cleansing",
	FERTILITY: "fertility",
	CALORIC: "high caloric",
	EXOTIC: "exotic",
	MEDICINAL: "medicinal",
	WEANING: "weaning",
});

// TODO

/**
 * @type {FC.DrugFreeze}
 * @enum {string}
 */
globalThis.Drug = Object.freeze({
	NONE: "no drugs",
	GROWBREAST: "breast injections",
	GROWBUTT: "butt injections",
	GROWLIP: "lip injections",
	GROWNIPPLE: "nipple enhancers",
	GROWPENIS: "penis enhancement",
	GROWTESTICLE: "testicle enhancement",
	INTENSIVEBREAST: "intensive breast injections",
	INTENSIVEBUTT: "intensive butt injections",
	INTENSIVEPENIS: "intensive penis enhancement",
	INTENSIVETESTICLE: "intensive testicle enhancement",
	FERTILITY: "fertility drugs",
	SUPERFERTILITY: "super fertility drugs",
	PSYCHOSUPP: "psychosuppressants",
	PSYCHOSTIM: "psychostimulants",
	STEROID: "steroids",
	HYPERBREAST: "hyper breast injections",
	HYPERBUTT: "hyper butt injections",
	HYPERPENIS: "hyper penis enhancement",
	HYPERTESTICLE: "hyper testicle enhancement",
	HORMONEFEMALE: "female hormone injections",
	HORMONEMALE: "male hormone injections",
	PRIAPISM: "priapism agents",
	ANTIAGE: "anti-aging cream",
	APPETITESUPP: "appetite suppressors",
	HORMONEENHANCE: "hormone enhancers",
	HORMONEBLOCK: "hormone blockers",
	ATROPHYPENIS: "penis atrophiers",
	ATROPHYTESTICLE: "testicle atrophiers",
	ATROPHYCLIT: "clitoris atrophiers",
	ATROPHYLABIA: "labia atrophiers",
	ATROPHYNIPPLE: "nipple atrophiers",
	ATROPHYLIP: "lip atrophiers",
	REDISTBREAST: "breast redistributors",
	REDISTBUTT: "butt redistributors",
	SAGBGONE: "sag-B-gone",
	GROWTHSTIM: "growth stimulants",
	STIM: "stimulants",
});

/**
 * @type {FC.FaceShapeFreeze}
 * @enum {string}
 */
globalThis.FaceShape = Object.freeze({
	MASC: "masculine",
	ANDRO: "androgynous",
	NORMAL: "normal",
	CUTE: "cute",
	SENSUAL: "sensual",
	EXOTIC: "exotic",
});

/**
 * @type {FC.GenderGenesFreeze}
 * @enum {string}
 */
globalThis.GenderGenes = Object.freeze({
	FEMALE: "XX",
	MALE: "XY",
	INVIABLE: "YY",
});

/**
 * @type {FC.GestationDrugFreeze}
 * @enum {string}
 */
globalThis.GestationDrug = Object.freeze({
	SLOW: "slow gestation",
	FAST: "speed up",
	LABOR: "labor suppressors",
});

/**
 * @type {FC.InflationLiquidFreeze}
 * @enum {string}
 */
globalThis.InflationLiquid = Object.freeze({
	NONE: "none",
	WATER: "water",
	CUM: "cum",
	MILK: "milk",
	FOOD: "food",
	APHRO: "aphrodisiac",
	CURATIVE: "curative",
	TIGHTEN: "tightener",
	URINE: "urine",
	STIM: "stimulant",
});

/**
 * @type {FC.ToyHoleFreeze}
 * @enum {string}
 */
globalThis.ToyHole = Object.freeze({
	ALL: "all her holes",
	MOUTH: "mouth",
	BOOBS: "boobs",
	PUSSY: "pussy",
	ASS: "ass",
	DICK: "dick",
});

/**
 * @type {FC.OvaryImplantTypeFreeze}
 * @enum {string}
 */
globalThis.OvaryImplantType = Object.freeze({
	NONE: 0,
	FERTILITY: "fertility",
	SYMPATHY: "sympathy",
	ASEXUAL: "asexual",
});

/**
 * @type {FC.NippleShapeFreeze}
 * @enum {string}
 */
globalThis.NippleShape = Object.freeze({
	HUGE: "huge",
	PUFFY: "puffy",
	INVERTED: "inverted",
	TINY: "tiny",
	CUTE: "cute",
	PARTIAL: "partially inverted",
	FUCKABLE: "fuckable",
	FLAT: "flat",
});

/**
 * @type {FC.SizingImplantTypeFreeze}
 * @enum {string}
 */
globalThis.SizingImplantType = Object.freeze({
	NORMAL: "normal",
	STRING: "string",
	FILLABLE: "fillable",
	ADVANCED: "advanced fillable",
	HYPER: "hyper fillable",
});

/**
 * @type {FC.SmartPiercingSettingFreeze}
 * @enum {string}
 */
globalThis.SmartPiercingSetting = Object.freeze({
	NONE: "none",
	OFF: "off",
	ALL: "all",
	NODEFAULT: "no default setting",
	RANDOM: "random",
	WOMEN: "women",
	MEN: "men",
	VANILLA: "vanilla",
	ORAL: "oral",
	ANAL: "anal",
	BOOBS: "boobs",
	SUBMISSIVE: "submissive",
	HUMILIATION: "humiliation",
	PREGNANCY: "pregnancy",
	DOM: "dom",
	MASOCHIST: "masochist",
	SADIST: "sadist",
	ANTIWOMEN: "anti-women",
	ANTIMEN: "anti-men",
});

/**
 * @type {Readonly<{MASTERED_XP: number, SEX_SLAVE_CONTRACT_COST: number}>}
 */
globalThis.Constant = Object.freeze({
	MASTERED_XP: 200,
	SEX_SLAVE_CONTRACT_COST: 1000,
});

/**
 * @type {FC.RevivalSocietyFreeze}
 * @enum {number}
 */
globalThis.RevivalSociety = Object.freeze({
	ANTEBELLUM: 0,
	ARABIAN: 1,
	AZTEC: 2,
	CHINESE: 3,
	EDO: 4,
	EGYPTIAN: 5,
	NEO_IMPERIAL: 6,
	ROMAN: 7
});

/**
 * @type {FC.FSHumanDevelopmentVectorFreeze}
 * @enum {number}
 */
globalThis.FSHumanVector = Object.freeze({
	AGE: 0,
	HEIGHT: 1,
	WEIGHT: 2,
	MODIFICATIONS: 3,
	ASSETS: 4,
	INTELLIGENCE: 5,
	GENDER: 6,
	BREEDING: 7,
	LIFE_QUALITY: 8,
});
