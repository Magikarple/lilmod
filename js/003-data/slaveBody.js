/**
 * @typedef {object} bodyPart
 * @property {"head"|"torso"|"arms"|"legs"} category
 * @property {function(App.Entity.SlaveState):boolean} [requirements]
 * @property {boolean} [isPair]
 */

/**
 * @type {Map.<string, bodyPart>}
 */
App.Data.Slave.body = new Map([
	// Head
	["ears", {
		category: "head",
		requirements: (slave) => slave.earShape !== "none",
		isPair: true,
	}],
	["cheek", {
		category: "head",
		isPair: true
	}],
	["neck", {
		category: "head",
	}],

	// Torso
	["chest", {
		category: "torso",
	}],
	["breast", {
		category: "torso",
		isPair: true
	}],
	["back", {
		category: "torso",
	}],
	["lower back", {
		category: "torso",
	}],
	["pubic mound", {
		category: "torso",
	}],
	["penis", {
		category: "torso",
		requirements: (slave) => slave.dick > 0,
	}],
	["testicle", {
		category: "torso",
		requirements: (slave) => slave.scrotum > 0 && slave.balls > 0,
		isPair: true
	}],

	// Arms
	["shoulder", {
		category: "arms",
		requirements: (slave) => hasAnyNaturalArms(slave),
		isPair: true
	}],
	["upper arm", {
		category: "arms",
		requirements: (slave) => hasAnyNaturalArms(slave),
		isPair: true
	}],
	["lower arm", {
		category: "arms",
		requirements: (slave) => hasAnyNaturalArms(slave),
		isPair: true
	}],
	["wrist", {
		category: "arms",
		requirements: (slave) => hasAnyNaturalArms(slave),
		isPair: true
	}],
	["hand", {
		category: "arms",
		requirements: (slave) => hasAnyNaturalArms(slave),
		isPair: true
	}],

	// Legs
	["buttock", {
		category: "legs",
		isPair: true
	}],
	["thigh", {
		category: "legs",
		requirements: (slave) => hasAnyNaturalLegs(slave),
		isPair: true
	}],
	["calf", {
		category: "legs",
		requirements: (slave) => hasAnyNaturalLegs(slave),
		isPair: true
	}],
	["ankle", {
		category: "legs",
		requirements: (slave) => hasAnyNaturalLegs(slave),
		isPair: true
	}],
	["foot", {
		category: "legs",
		requirements: (slave) => hasAnyNaturalLegs(slave),
		isPair: true
	}],
]);

/** @type {Object<FC.EarShape, Object>} */
App.Data.Slave.FancyEars = {
	elven: {title: "long elf"},
	cow: {
		get title() {
			return `floppy ${App.Utils.translate("cow")}`;
		}
	},
	robot: {title: "robot"},
	orcish: {title: "sharp orc"},
	sheep: {title: "cupped sheep"},
	deer: {title: "cupped deer"},
	gazelle: {title: "cupped gazelle"},
	bird: {title: "feathery"},
	dragon: {title: "elongated draconic"},
};

/** @type {Object<FC.EarShape, Object>} */
App.Data.Slave.Ears = {
	pointy: {title: ""},
	damaged: {title: ""},
	normal: {title: ""},
	...App.Data.Slave.FancyEars
};

App.Data.Slave.Races = ["amerindian", "asian", "black", "indo-aryan", "latina", "malay", "middle eastern", "mixed race", "pacific islander", "semitic", "southern european", "white"];
