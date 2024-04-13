App.Data.WardrobeShopping = {};

App.Data.WardrobeShopping.Clothing = {
	/**
	 * @typedef {object} wardrobeItem
	 * @property {string} title
	 * @property {number} cost
	 * @property {string} [note] italicize note about a purchase
	 * @property {string[]} contains
	 * @property {string} owned
	 * @property {object} [modelUpdate]
	 * @property {boolean} [requirements] requirements met
	 */

	/**
	 * @type {{[key: string]: wardrobeItem}} String will be the property checked to see if the item is owned. So for "bunny", it will check V.boughtItem.clothing["bunny"].
	 */
	FS: {
		"bunny": {
			title: "a shipment of bunny suits",
			cost: 7500,
			contains: ["a bunny outfit"],
			owned: "You are well stocked with classic bunny suits and bowties.",
		},
		"conservative": {
			title: "a shipment of conservative clothes",
			cost: 7500,
			contains: ["conservative clothing"],
			owned: "You are well stocked with modest outfits.",
		},
		"bimbo": {
			title: "a shipment of outfits suitable for bimbos",
			cost: 7500,
			contains: ["a bimbo outfit"],
			owned: "You are well stocked with bimbo attire.",
		},
		"courtesan": {
			title: "a shipment of courtesan dresses",
			cost: 7500,
			contains: ["a courtesan dress"],
			owned: "You are well stocked with courtesan dresses.",
		},
		"chains": {
			title: "a shipment of chains",
			cost: 7500,
			contains: ["chains"],
			owned: "You are well stocked with various lengths of binding chains.",
		},
		"western": {
			title: "a shipment of western outfits",
			cost: 7500,
			contains: ["Western clothing"],
			owned: "You are well stocked with cowgirl outfits.",
		},
		"oil": {
			title: "a shipment of body oil",
			cost: 7500,
			contains: ["body oil"],
			owned: "You are well stocked with various body oils.",
		},
		"lazyClothes": {
			title: "a shipment of comfortable, rather stretchy, clothes",
			cost: 7500,
			contains: ["stretch pants and a crop-top"],
			owned: "You are well stocked with various comfy pants and rather tight crop-tops.",
		},
		"habit": {
			title: "a shipment of chattel habits",
			cost: 7500,
			contains: ["a chattel habit"],
			owned: "You are well stocked with habits from the chattel religion.",
		},
		"maternityDress": {
			title: "a shipment of maternity dresses",
			cost: 7500,
			contains: ["a maternity dress"],
			owned: "You are well stocked with dresses specially tailored for pregnant women.",
		},
		"maternityLingerie": {
			title: "a shipment of maternity lingerie",
			cost: 7500,
			contains: ["attractive lingerie for a pregnant woman"],
			owned: "You are well stocked with sexy silken lingerie designed for pregnant women.",
		},
	},
	FSrevivalist: {
		"egypt": {
			title: "a shipment of Egyptian necklaces",
			cost: 7500,
			contains: ["no clothing"],
			owned: "You are well stocked with ancient Egyptian necklaces.",
			modelUpdate: {collar: "ancient Egyptian"}
		},
		"toga": {
			title: "a shipment of togas and stolas",
			cost: 7500,
			contains: ["a toga"],
			owned: "You are well stocked with fine roman-styled togas and stolas.",
		},
		"huipil": {
			title: "a shipment of huipil",
			cost: 7500,
			contains: ["a huipil"],
			owned: "You are well stocked with exquisite Aztec huipils.",
		},
		"kimono": {
			title: "a shipment of kimonos",
			cost: 7500,
			contains: ["a kimono"],
			owned: "You are well stocked with elegant Japanese kimonos.",
		},
		"harem": {
			title: "a shipment of harem outfits",
			cost: 7500,
			contains: ["harem gauze"],
			owned: "You are well stocked with Arabic harem garb made from the finest available silks.",
		},
		"qipao": {
			title: "a shipment of qipaos",
			cost: 7500,
			contains: ["a slutty qipao"],
			owned: "You are well stocked with slutty Chinese qipaos.",
		},
		"imperialarmor": {
			title: "a shipment of bulky Imperial armor",
			cost: 12500,
			contains: ["Imperial Plate"],
			owned: "You are well stocked with spare sets of bulky powered armor of the same kind worn by your Imperial Knights.",
		},
		"imperialsuit": {
			title: "a shipment of tight Imperial bodysuits",
			cost: 7500,
			contains: ["a tight Imperial bodysuit"],
			owned: "You are well stocked with tight-fitting cybernetic bodysuits clearly bearing your family crest.",
		},
		"antebellum": {
			title: "a shipment of dresses in the Antebellum fashion",
			cost: 7500,
			contains: ["a confederate army uniform", "an evening dress"],
			owned: "You are well stocked with extravagant Antebellum dresses."
		}
	},
	other: {
		"military": {
			title: "a shipment of military themed clothing",
			cost: 5000,
			contains: ["a military uniform", "a red army uniform", "battlearmor", "battledress"],
			owned: "You are well stocked with a variety of military themed garb.",
		},
		"cultural": {
			title: "a shipment of cultural outfits",
			cost: 15000,
			contains: ["a biyelgee costume", "a dirndl", "a hanbok", "a long qipao", "a mounty outfit", "lederhosen"],
			owned: "You are well stocked with a variety of signature outfits from a variety of countries.",
		},
		"middleEastern": {
			title: "a shipment of burqas and similar garb",
			cost: 5000,
			contains: ["a burqa", "a niqab and abaya"],
			owned: "You are well stocked with a number of burqas and similar clothing.",
		},
		"casual": {
			title: "an extra large shipment of casual clothing",
			cost: 5000,
			contains: ["a button-up shirt and panties", "a button-up shirt", "a sweater and cutoffs", "a sweater and panties", "a sweater", "a t-shirt and jeans", "a t-shirt and panties", "a t-shirt", "a tank-top and panties", "a tank-top", "a tube top", "an oversized t-shirt", "cutoffs", "jeans", "leather pants and a tube top", "leather pants"],
			owned: "You are well stocked with casual clothing.",
		},
		"career": {
			title: "a shipment of professional garments",
			cost: 2500,
			contains: ["a nice nurse outfit", "a police uniform", "nice business attire"],
			owned: "You are well stocked with a selection of professional outfits.",
		},
		"dresses": {
			title: "a shipment of professionally tailored dresses",
			cost: 15000,
			contains: ["a ball gown", "a gothic lolita dress"],
			owned: "You are well stocked with a selection of fine dresses.",
		},
		"bodysuits": {
			title: "a shipment of exotic bodysuits",
			cost: 7500,
			contains: ["a cybersuit", "a latex catsuit"],
			owned: "You are well stocked with a selection of bodysuits.",
		},
		"underwear": {
			title: "a shipment of undergarments",
			cost: 5000,
			contains: ["a bra", "a skimpy loincloth", "a thong", "boyshorts", "kitty lingerie", "panties and pasties", "pasties"],
			owned: "You are well stocked with underwear.",
		},
		"sports": {
			title: "a shipment of exercise wear",
			cost: 2500,
			contains: ["a sports bra", "sport shorts and a sports bra", "sport shorts"],
			owned: "You are well stocked with exercise wear.",
		},
		"swimwear": {
			title: "a shipment of swimwear",
			cost: 3500,
			contains: ["a monokini", "a one-piece swimsuit"],
			owned: "You are well stocked with swimwear.",
		},
		"pony": {
			title: "a shipment of specialized latex ponygirl outfits",
			cost: 10000,
			contains: ["a nice pony outfit", "a slutty pony outfit"],
			owned: "You are well stocked with ponygirl bodysuits.",
		},
		"pol": {
			title: "a shipment of politically incorrect clothing",
			cost: 15000,
			contains: ["a klan robe", "a schutzstaffel uniform", "a slutty klan robe", "a slutty schutzstaffel uniform"],
			owned: "You are well stocked with a selection of outfits once considered distasteful.",
		},
		"costume": {
			title: "a shipment of colorful and revealing costumes",
			cost: 15000,
			contains: ["a Santa dress"],
			owned: "You are well stocked with a variety of costume party supplies.",
		},
		"pantsu": {
			title: "a large crate of panties from Japan",
			cost: 2500,
			contains: ["a striped bra", "striped panties", "striped underwear"],
			owned: "You have an impressive stash of panties and other striped underwear that may or may not be have at one point been used.",
		},
	}
};
/**
 * @type {{[key: string]: wardrobeItem}} String will be the property checked to see if the item is owned. So for "bunny", it will check V.boughtItem.clothing["bunny"].
 */
App.Data.WardrobeShopping.Accessories = {
	"shoes.heels": {
		title: "a shipment of platform shoes",
		cost: 7500,
		contains: ["platform heels"],
		owned: "You have shelves dedicated to your collection of platform shoes.",
	},
	"clothing.belly": {
		title: "a shipment of fake pregnancy bellies",
		cost: 15000,
		contains: ["a small empathy belly"],
		owned: "You are well stocked with silicone pregnancy bellies modeled after variously sized women.",
	},
	"toys.dildos": {
		title: "a shipment of extra long dildos and bullet vibes",
		cost: 10000,
		contains: ["long dildo"],
		owned: "You are well stocked with extra long dildos in a variety of sizes, as well as a good amount of bullet vibrators.",
	},
	"toys.smartVibes": {
		title: `the "smart" variant of the bullet vibrators`,
		cost: 5000,
		contains: ["long dildo"],
		get requirements() { return V.boughtItem.toys.dildos !== 0; },
		owned: `Some of the bullet vibes are of the "smart" variety, interfaced to the arcology's systems.`,
	},
	"toys.vaginalAttachments": {
		title: "a shipment of vibrating dildo attachments",
		cost: 10000,
		contains: [],
		owned: "You are well stocked with attachments that allow dildos to vibrate.",
	},
	"toys.smartVaginalAttachments": {
		title: `the "smart" variant of the vibrating dildo attachments`,
		cost: 5000,
		contains: [],
		get requirements() { return V.boughtItem.toys.vaginalAttachments !== 0; },
		owned: `Some of the vibrating dildo attachments are of the "smart" variety, interfaced to the arcology's systems.`,
	},
	"toys.buttPlugs": {
		title: "a shipment of extra long buttplugs",
		cost: 10000,
		contains: [],
		owned: "You are well stocked with extra long buttplugs in a variety of sizes.",
	},
	"toys.buttPlugTails": {
		title: "a shipment of attachable tails",
		cost: 5000,
		contains: [],
		owned: "You are well stocked with tails to attach to your buttplugs.",
	},
	"toys.gags": {
		title: "a shipment of massive dildo gags",
		cost: 5000,
		contains: [],
		owned: "You are well stocked with massive dildo gags.",
	},
	"toys.buckets": {
		title: "everything you need to force-feed slaves",
		note: `Some supplies from the cafeteria and a slight adjustment to the feeder settings is all it would take.`,
		cost: 0,
		contains: [],
		owned: "You have everything you need in one place to force-feed slaves. You've also adjusted the feeders to cheaply produce filler food to save on money. However, said food is just empty calories and probably bad for a slave's waistline.",
	},
	"toys.enema": {
		title: "enema supplies",
		cost: 5000,
		contains: [],
		owned: "You are well stocked with specially formulated liquids to be used safely for long term enemas along with the tools needed to keep a slave bloated for extended periods of time",
	},
	"toys.medicalEnema": {
		title: `medical enema supplies`,
		cost: 5000,
		contains: [],
		get requirements() { return (V.boughtItem.toys.enema !== 0); },
		owned: "You are also well stocked with drugs to be mixed with the enema water for use in medical enemas.",
	},
};
