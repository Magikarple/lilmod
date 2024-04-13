// cSpell:ignore prgntr, lvstck, fmilk, imrtl, grls, twns, myot, lipe, bigd, rlact, gmast, mmast, uthyp, polyhyd, supfet
// cSpell:ignore hfert, ptnt, ufce, pfce, hetchrom, ntny, dwrf

/**
 * @typedef {object} geneData
 * @property {string} title
 * @property {string} abbreviation
 * @property {string} description
 * @property {boolean} [goodTrait]
 * @property {boolean} [requirements]
 * @property {boolean} [pubertyActivated]
 * @property {boolean} [restricted]
 */
/** @type {Map.<keyof FC.GeneticQuirks, geneData>} */
App.Data.geneticQuirks = new Map([
	["albinism",
		{
			title: "albinism",
			abbreviation: "alb",
			goodTrait: true,
			description: "lack of pigmentation"
		}
	],
	["gigantism",
		{
			title: "gigantism",
			abbreviation: "gnt",
			description: "extreme rate of growth during physical development"
		}
	],
	["dwarfism",
		{
			title: "dwarfism",
			abbreviation: "dwrf",
			description: "stunted rate of growth during physical development"
		}
	],
	["neoteny",
		{
			title: "neoteny",
			abbreviation: "ntny",
			description: "retention of childlike characteristics",
			get requirements() { return (V.seeAge === 1); },
			pubertyActivated: true
		}
	],
	["progeria",
		{
			title: "progeria",
			abbreviation: "progeria",
			description: "rapid bodily aging",
			get requirements() { return (V.seeAge === 1); },
			pubertyActivated: true
		}
	],
	["heterochromia",
		{
			title: "heterochromia",
			abbreviation: "hetchrom",
			goodTrait: true,
			description: "mismatched eye colors",
			restricted: true
		}
	],
	["androgyny",
		{
			title: "androgyny",
			abbreviation: "andr",
			description: "lack of natural hormone production"
		}
	],
	["pFace",
		{
			title: "perfect face",
			abbreviation: "pfce",
			goodTrait: true,
			description: "a naturally flawless face",
			restricted: true
		}
	],
	["uFace",
		{
			title: "hideous face",
			abbreviation: "ufce",
			description: "a naturally hideous face",
			restricted: true
		}
	],
	["potent",
		{
			title: "potency",
			abbreviation: "ptnt",
			goodTrait: true,
			description: "a heightened impregnation rate"
		}
	],
	["fertility",
		{
			title: "fertility",
			abbreviation: "fert",
			goodTrait: true,
			description: "a heightened rate of multiple birth"
		}
	],
	["hyperFertility",
		{
			title: "hyper fertility",
			abbreviation: "hfert",
			goodTrait: true,
			description: "an extremely heightened rate of multiple birth"
		}
	],
	["superfetation",
		{
			title: "superfetation",
			abbreviation: "supfet",
			description: "continued ovulation despite pregnancy"
		}
	],
	["polyhydramnios",
		{
			title: "polyhydramnios",
			abbreviation: "polyhyd",
			description: "abnormal production of amniotic fluid",
			get requirements() { return (V.dangerousPregnancy === 1); }
		}
	],
	["uterineHypersensitivity",
		{
			title: "uterine hypersensitivity",
			abbreviation: "uthyp",
			description: "pleasurable pregnancy and orgasmic birth"
		}
	],

	["macromastia",
		{
			title: "macromastia",
			abbreviation: "mmast",
			description: "an abnormal rate of breast growth",
			pubertyActivated: true
		}
	],
	["gigantomastia",
		{
			title: "gigantomastia",
			abbreviation: "gmast",
			description: "an abnormally high rate of breast growth",
			pubertyActivated: true
		}
	],
	["galactorrhea",
		{
			title: "galactorrhea",
			abbreviation: "rlact",
			description: "the onset of unexpected lactation",
			pubertyActivated: true
		}
	],
	["wellHung",
		{
			title: "large penile development",
			abbreviation: "bigd",
			goodTrait: true,
			description: "heightened penile development during puberty"
		}
	],
	["rearLipedema",
		{
			title: "rear lipedema",
			abbreviation: "lipe",
			description: "an abnormal rate of ass growth"
		}
	],
	["wGain",
		{
			title: "hyperleptinemia",
			abbreviation: "lepti+",
			description: "constant weight gain"
		}
	],
	["wLoss",
		{
			title: "hypoleptinemia",
			abbreviation: "lepti-",
			description: "constant weight loss"
		}
	],
	["mGain",
		{
			title: "myotonic hypertrophy",
			abbreviation: "myot+",
			description: "constant muscle gain"
		}
	],
	["mLoss",
		{
			title: "myotonic dystrophy",
			abbreviation: "myot-",
			description: "constant muscle loss"
		}
	],
	["twinning",
		{
			title: "twinning",
			abbreviation: "twns",
			description: "ova split when space permits",
			restricted: true
		}
	],
	["girlsOnly",
		{
			title: "girls only",
			abbreviation: "grls",
			description: "cannot bear male children",
			restricted: true
		}
	],
]);

/** @type {Map.<FC.GeneticMods|string, geneData>} */
App.Data.geneticMods = new Map([
	["NCS",
		{
			title: "induced NCS",
			abbreviation: "ncs",
			goodTrait: true,
			description: ""
		},
	],
	["rapidCellGrowth",
		{
			title: "rapid cell growth",
			abbreviation: "rcg",
			goodTrait: true,
			description: "elasticity (plasticity) treatment"
		},
	],
	["immortality",
		{
			title: "immortal",
			abbreviation: "imrtl",
			goodTrait: true,
			description: "slave stops aging. Can still die of other causes."
		},
	],
	["flavoring",
		{
			title: "flavored milk",
			abbreviation: "fmilk",
			goodTrait: true,
			description: "altered milk flavor"
		},
	],
	["aggressiveSperm",
		{
			title: "enhanced potency",
			abbreviation: "pot",
			goodTrait: true,
			description: "sperm optimization treatment"
		},
	],
	["livestock",
		{
			title: "production optimization",
			abbreviation: "lvstck",
			goodTrait: true,
			description: "production optimization treatment"
		},
	],
	["progenitor",
		{
			title: "progenitor",
			abbreviation: "prgntr",
			goodTrait: true,
			description: "breeding optimization treatment"
		},
	],
]);

App.Data.milk = {
	Flavors: [
		{value: "almond"},
		{value: "apricot"},
		{value: "banana"},
		{value: "blackberry"},
		{value: "blueberry"},
		{value: "caramel"},
		{value: "cherry"},
		{value: "chocolate"},
		{value: "cinnamon"},
		{value: "coconut"},
		{value: "coffee"},
		{value: "honey"},
		{value: "mango"},
		{value: "melon"},
		{value: "mint"},
		{value: "peach"},
		{value: "peanut butter"},
		{value: "pineapple"},
		{value: "raspberry"},
		{value: "strawberry"},
		{value: "vanilla"}
	]
};
