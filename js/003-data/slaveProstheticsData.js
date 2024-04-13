/**
 * do not change order, order = display order
 *
 * @type {FC.prostheticID[]}
 */
App.Data.prostheticIDs =
	["interfaceP1", "interfaceP2", "interfaceP3", "basicL", "sexL", "beautyL", "combatL", "felidaeL", "canidaeL", "felidaeCL", "canidaeCL", "cyberneticL", "ocular", "cochlear",
		"electrolarynx", "interfaceTail", "modT", "sexT", "combatT", "combatT2", /* "erectile",*/"interfaceBack", "modW", "flightW", "sexA", "combatW", "combatA1", "combatA2"];
/**
 * @typedef {object} prosthetics
 * @property {string} name expected to singular and lowercase
 * @property {number} adjust time required to adjust an existing prosthetic to a slave
 * @property {number} craft time required to create a new, not to a specific slave fitted prosthetic
 * @property {number} research time required to research the prosthetic
 * @property {number} level minimum level the prosthetics lab needs to research/craft the prosthetic
 * @property {number} costs cash required to buy the prosthetic
 *
 * For all time values: 10 = 1 week without upgrades
 */

/**
 * @type {Record<FC.prostheticID, prosthetics>}
 */
App.Data.prosthetics = {
	interfaceP1: {
		name: "basic prosthetic interface",
		adjust: 40,
		craft: 50,
		research: 100,
		level: 1,
		costs: 5000
	},
	interfaceP2: {
		name: "advanced prosthetic interface",
		adjust: 80,
		craft: 80,
		research: 160,
		level: 2,
		costs: 10000
	},
	interfaceP3: {
		name: "advanced quadrupedal prosthetic interface",
		adjust: 60,
		craft: 60,
		research: 140,
		level: 4,
		costs: 10000
	},
	basicL: {
		name: "set of basic prosthetic limbs",
		adjust: 40,
		craft: 40,
		research: 80,
		level: 1,
		costs: 7000
	},
	sexL: {
		name: "set of advanced sex limbs",
		adjust: 60,
		craft: 70,
		research: 140,
		level: 2,
		costs: 15000
	},
	beautyL: {
		name: "set of advanced beauty limbs",
		adjust: 60,
		craft: 70,
		research: 140,
		level: 2,
		costs: 15000
	},
	combatL: {
		name: "set of advanced combat limbs",
		adjust: 60,
		craft: 70,
		research: 140,
		level: 2,
		costs: 15000
	},
	felidaeL: {
		name: "set of quadruped feline limbs",
		adjust: 60,
		craft: 70,
		research: 140,
		level: 4,
		costs: 20000
	},
	canidaeL: {
		name: "set of quadruped canine limbs",
		adjust: 60,
		craft: 80,
		research: 140,
		level: 4,
		costs: 15000
	},
	felidaeCL: {
		name: "set of feline combat limbs",
		adjust: 100,
		craft: 80,
		research: 180,
		level: 4,
		costs: 15000
	},
	canidaeCL: {
		name: "set of canine combat limbs",
		adjust: 100,
		craft: 80,
		research: 180,
		level: 4,
		costs: 20000
	},
	cyberneticL: {
		name: "set of cybernetic limbs",
		adjust: 80,
		craft: 150,
		research: 250,
		level: 3,
		costs: 25000
	},
	ocular: {
		name: "ocular implant",
		adjust: 60,
		craft: 80,
		research: 150,
		level: 2,
		costs: 20000
	},
	cochlear: {
		name: "cochlear implant",
		adjust: 40,
		craft: 40,
		research: 80,
		level: 1,
		costs: 5000
	},
	electrolarynx: {
		name: "electrolarynx",
		adjust: 40,
		craft: 40,
		research: 40,
		level: 1,
		costs: 5000
	},
	interfaceTail: {
		name: "prosthetic tail interface",
		adjust: 50,
		craft: 60,
		research: 120,
		level: 1,
		costs: 5000
	},
	modT: {
		name: "modular tail",
		adjust: 40,
		craft: 40,
		research: 80,
		level: 1,
		costs: 5000
	},
	combatT: {
		name: "combat tail",
		adjust: 70,
		craft: 70,
		research: 140,
		level: 2,
		costs: 15000
	},
	combatT2: {
		name: `combat tail, type "Stinger"`,
		adjust: 70,
		craft: 70,
		research: 140,
		level: 3,
		costs: 15000
	},
	sexT: {
		name: "pleasure tail",
		adjust: 60,
		craft: 60,
		research: 120,
		level: 2,
		costs: 10000
	},
	/*
	erectile: {
		name: "erectile implant",
		adjust: 40,
		craft: 50,
		research: 100,
		level: 1,
		costs: 7000
	},
	*/
	interfaceBack: {
		name: "prosthetic back interface",
		adjust: 100,
		craft: 120,
		research: 240,
		level: 2,
		costs: 10000
	},
	modW: {
		name: "modular pair of wings",
		adjust: 80,
		craft: 80,
		research: 120,
		level: 2,
		costs: 10000
	},
	flightW: {
		name: "pair of flight capable wings",
		adjust: 120,
		craft: 120,
		research: 240,
		level: 2,
		costs: 20000
	},
	sexA: {
		name: "set of pleasure appendages",
		adjust: 120,
		craft: 120,
		research: 240,
		level: 2,
		costs: 20000
	},
	combatW: {
		name: `set of combat appendages, type "Falcon"`,
		adjust: 140,
		craft: 140,
		research: 280,
		level: 3,
		costs: 30000
	},
	combatA1: {
		name: `set of combat appendages, type "Arachnid"`,
		adjust: 140,
		craft: 140,
		research: 280,
		level: 3,
		costs: 30000
	},
	combatA2: {
		name: `set of combat appendages, type "Kraken"`,
		adjust: 140,
		craft: 140,
		research: 280,
		level: 3,
		costs: 30000
	}
};
/**
 * @type {Map<FC.TailShape, {animal: string, desc: string}>}
 */
App.Data.modTails = new Map([
	["cat", {animal: "Cat", desc: `a long, slender cat tail`}],
	["leopard", {animal: "Leopard", desc: "a long, fluffy leopard tail"}],
	["tiger", {animal: "Tiger", desc: "a long, fluffy tiger tail"}],
	["jaguar", {animal: "Jaguar", desc: "a long, fluffy jaguar tail"}],
	["lion", {animal: "Lion", desc: "a long, slender lion tail"}],
	["dog", {animal: "Dog", desc: `a bushy dog tail`}],
	["wolf", {animal: "Wolf", desc: "a long and fluffy wolf tail"}],
	["jackal", {animal: "Jackal", desc: "a bushy jackal tail"}],
	["fox", {animal: "Fox", desc: "a soft, fluffy fox tail"}],
	["kitsune", {animal: "Kitsune", desc: `nine incredibly soft, fluffy fox tails`}],
	["tanuki", {animal: "Tanuki", desc: `a long, fluffy tanuki tail`}],
	["raccoon", {animal: "Raccoon", desc: `a long, fluffy raccoon tail`}],
	["rabbit", {animal: "Rabbit", desc: `a short rabbit tail`}],
	["squirrel", {animal: "Squirrel", desc: `a large squirrel tail`}],
	["horse", {animal: "Horse", desc: `a long horse tail`}],
	["bird", {animal: "Bird", desc: "a bundle of tail feathers"}],
	["phoenix", {animal: "Phoenix", desc: "a magnificent bundle of luminescent tail feathers"}],
	["peacock", {animal: "Peacock", desc: "a gorgeous bundle of peacock tail feathers"}],
	["raven", {animal: "Raven", desc: "a bundle of crow tail feathers"}],
	["swan", {animal: "Swan", desc: "a small bundle of short swan tail feathers"}],
	["sheep", {animal: "Sheep", desc: "a short, woolly sheep tail"}],
	["cow", {animal: "Cow", desc: `a long cow tail`}],
	["gazelle", {animal: "Gazelle", desc: "a short, silky gazelle tail"}],
	["deer", {animal: "Deer", desc: "a short deer tail"}],
	["succubus", {animal: "Succubus", desc: "a long, slender succubus tail"}],
	["dragon", {animal: "Dragon", desc: "a long, thick dragon tail"}]
]);
/**
 * @type {Map<FC.WingsShape, {animal: string, desc: string}>}
 */

App.Data.modWings = new Map([
	["angel", {animal: "Angel", desc: "a pair of elegant angelic wings"}],
	["seraph", {animal: "Seraph", desc: "three pairs of majestic-looking angels wings"}],
	["demon", {animal: "Demon", desc: "a pair of sexy and sleek demonic wings"}],
	["dragon", {animal: "Dragon", desc: "a pair of imposing draconic wings"}],
	["phoenix", {animal: "Phoenix", desc: "a pair of magnificent, luminescent phoenix wings"}],
	["bird", {animal: "Bird", desc: "a pair of feathered wings"}],
	["fairy", {animal: "Fairy", desc: "a pair of translucent, leaf-like fairy wings"}],
	["butterfly", {animal: "Butterfly", desc: "a pair of beautiful butterfly wings"}],
	["moth", {animal: "Moth", desc: "a pair of soft moth wings"}],
	["insect", {animal: "Insect", desc: "a pair of transparent insect wings"}],
	["evil", {animal: "Fiend", desc: "a pair of fiendish wings"}]


]);
/**
 * @typedef {object} prostheticLimb
 * @property {string} short
 * @property {FC.prostheticID} prostheticKey
 * @property {number[]} allowedInterfaces
 */

/**
 * @type {Map<number, prostheticLimb>}
 */
App.Data.prostheticLimbs = new Map([
	[2, {
		short: "basic prosthetic",
		prostheticKey: "basicL",
		allowedInterfaces: [1, 2]
	}],
	[3, {
		short: "advanced sex",
		prostheticKey: "sexL",
		allowedInterfaces: [1, 2]
	}],
	[4, {
		short: "advanced beauty",
		prostheticKey: "beautyL",
		allowedInterfaces: [1, 2]
	}],
	[5, {
		short: "advanced combat",
		prostheticKey: "combatL",
		allowedInterfaces: [1, 2]
	}],
	[6, {
		short: "cybernetic",
		prostheticKey: "cyberneticL",
		allowedInterfaces: [2]
	}],
	[7, {
		short: "quadruped feline",
		prostheticKey: "felidaeL",
		allowedInterfaces: [3]
	}],
	[8, {
		short: "quadruped canine",
		prostheticKey: "canidaeL",
		allowedInterfaces: [3]
	}],
	[9, {
		short: "feline combat",
		prostheticKey: "felidaeCL",
		allowedInterfaces: [3]
	}],
	[10, {
		short: "canine combat",
		prostheticKey: "canidaeCL",
		allowedInterfaces: [3]
	}],
]);

