/**
 * @typedef {object} BrandStyle
 * @property {string} displayName The way the brand is displayed as a choice in the UI
 * @property {function(void):boolean} [requirements] Function to determine if a brand symbol can be used.
 */
/**
 * @typedef {{[key: string]: BrandStyle[]}} BrandStyleList
 * How the brand is saved in the variable.
 */

/** @type {{[key: string]: BrandStyleList}} */
App.Medicine.Modification.Brands = {
	personal: {
		"your personal symbol": {displayName: "Your slaving emblem"},
		"your initials": {displayName: "Your initials"},
	},
	dirtyWord: {
		"SLUT": {displayName: "SLUT"},
		"WHORE": {displayName: "WHORE"},
		"SLAVE": {displayName: "SLAVE"},
		"COW": {displayName: "COW"},
		"MEAT": {displayName: "MEAT"},
		"CUMDUMP": {displayName: "CUMDUMP"},
		"LOVER": {displayName: "LOVER"},
	},
	genitalSymbol: {
		"a pussy symbol": {displayName: "Pussy symbol"},
		"an anus symbol": {displayName: "Anus symbol"},
		"a penis symbol": {displayName: "Penis symbol"},
	},
	silhouettes: {
		"a lady silhouette": {displayName: "Lady"},
		"a princess silhouette": {displayName: "Princess"},
		"a queen silhouette": {displayName: "Queen"},
		"an angel silhouette": {displayName: "Angel"},
		"a devil silhouette": {displayName: "Devil"},
	},
	FS: {
		"a racial slur": {
			displayName: "Racial Slur",
			requirements: function(slave) {
				return (
					(FutureSocieties.isActive('FSSupremacist') && slave.race !== V.arcologies[0].FSSupremacistRace) ||
					(FutureSocieties.isActive('FSSubjugationist') && slave.race === V.arcologies[0].FSSubjugationistRace)
				);
			}
		},
		"how much sex $he needs per day": {
			displayName: "Scores",
			requirements: function(slave) {
				return (FutureSocieties.isActive('FSIntellectualDependency'));
			}
		},
		"$his average slave aptitude test scores": {
			displayName: "Scores",
			requirements: function(slave) {
				return (FutureSocieties.isActive('FSSlaveProfessionalism'));
			}
		},
		"the number of children $he has birthed": {
			displayName: "Birth Count",
			requirements: function(slave) {
				return (FutureSocieties.isActive('FSRepopulationFocus'));
			}
		},
		"a gender symbol": {
			displayName: "Gender Symbol",
			requirements: function(slave) {
				return ((FutureSocieties.isActive('FSGenderRadicalist')) || (FutureSocieties.isActive('FSGenderFundamentalist')));
			}
		},
		"$his own personal symbol": {
			displayName: "Personal Symbol",
			requirements: function(slave) {
				return (FutureSocieties.isActive('FSPaternalist'));
			}
		},
		"a chain symbol": {
			displayName: "Chain Symbol",
			requirements: function(slave) {
				return (FutureSocieties.isActive('FSDegradationist'));
			}
		},
		"a Vitruvian man": {
			displayName: "Vitruvian Man",
			requirements: function(slave) {
				return (FutureSocieties.isActive('FSBodyPurist'));
			}
		},
		"a scalpel": {
			displayName: "Scalpel",
			requirements: function(slave) {
				return (FutureSocieties.isActive('FSTransformationFetishist'));
			}
		},
		"$his virginity status": {
			displayName: "Virginity Status",
			requirements: function(slave) {
				return (FutureSocieties.isActive('FSYouthPreferentialist'));
			}
		},
		"$his sexual skills": {
			displayName: "Sexual Skill Info",
			requirements: function(slave) {
				return (FutureSocieties.isActive('FSMaturityPreferentialist'));
			}
		},
		"$his current height": {
			displayName: "Current height",
			requirements: function(slave) {
				return ((FutureSocieties.isActive('FSPetiteAdmiration')) || (FutureSocieties.isActive('FSStatuesqueGlorification')));
			}
		},
		"$his absolute minimum breast size": {
			displayName: "Breast Floor",
			requirements: function(slave) {
				return (FutureSocieties.isActive('FSSlimnessEnthusiast'));
			}
		},
		"$his absolute maximum breast size": {
			displayName: "Breast Ceiling",
			requirements: function(slave) {
				return (FutureSocieties.isActive('FSAssetExpansionist'));
			}
		},
		"$his highest weigh-in": {
			displayName: "Weight Record",
			requirements: function(slave) {
				return (FutureSocieties.isActive('FSHedonisticDecadence'));
			}
		},
		"a big helping of your favorite food": {
			displayName: "Favorite Food",
			requirements: function(slave) {
				return ((FutureSocieties.isActive('FSHedonisticDecadence')) && V.PC.refreshmentType === 2);
			}
		},
		"$his body product quality": {
			displayName: "Product Quality",
			requirements: function(slave) {
				return (FutureSocieties.isActive('FSPastoralist'));
			}
		},
		"$his deadlift record": {
			displayName: "Deadlift Info",
			requirements: function(slave) {
				return (FutureSocieties.isActive('FSPhysicalIdealist'));
			}
		},
		"a religious symbol": {
			displayName: "Religious Symbol",
			requirements: function(slave) {
				return (FutureSocieties.isActive('FSChattelReligionist'));
			}
		},
		"the crest of your Republic": {
			displayName: "Republican Crest",
			requirements: function(slave) {
				return (FutureSocieties.isActive('FSRomanRevivalist'));
			}
		},
		"the symbol of the Aztec gods": {
			displayName: "Seven Serpents",
			requirements: function(slave) {
				return (FutureSocieties.isActive('FSAztecRevivalist'));
			}
		},
		"the sigil of your Dynasty": {
			displayName: "Dynastic Sigil",
			requirements: function(slave) {
				return (FutureSocieties.isActive('FSEgyptianRevivalist'));
			}
		},
		"the Shogunate's mon": {
			displayName: "Mon",
			requirements: function(slave) {
				return (FutureSocieties.isActive('FSEdoRevivalist'));
			}
		},
		"a symbol of the Caliphate": {
			displayName: "Caliphate Symbol",
			requirements: function(slave) {
				return (FutureSocieties.isActive('FSArabianRevivalist'));
			}
		},
		"your Family Crest": {
			displayName: "Imperial Family Crest",
			requirements: function(slave) {
				return (FutureSocieties.isActive('FSNeoImperialist'));
			}
		},
		"your Imperial Seal": {
			displayName: "Imperial Seal",
			requirements: function(slave) {
				return (FutureSocieties.isActive('FSChineseRevivalist'));
			}
		},
		"fleur-de-lis": {
			displayName: "Fleur-de-lis",
			requirements: function(slave) {
				return (FutureSocieties.isActive('FSAntebellumRevivalist'));
			}
		}
	}
};

App.Medicine.Modification.Color = {
	Primary: [
		{value: "amber"},
		{value: "auburn"},
		{value: "black"},
		{value: "blazing red"},
		{value: "blonde"},
		{value: "blue-violet"},
		{value: "blue"},
		{value: "brown"},
		{value: "burgundy"},
		{value: "chestnut"},
		{value: "chocolate brown"},
		{value: "copper"},
		{value: "dark blue"},
		{value: "dark brown"},
		{value: "dark orchid"},
		{value: "deep red"},
		{value: "ginger"},
		{value: "golden"},
		{value: "green-yellow"},
		{value: "green"},
		{value: "grey"},
		{value: "hazel"},
		{value: "jet black"},
		{value: "neon blue"},
		{value: "neon green"},
		{value: "neon pink"},
		{value: "pink"},
		{value: "platinum blonde"},
		{value: "purple"},
		{value: "rainbow"},
		{value: "red"},
		{value: "sea green"},
		{value: "silver"},
		{value: "strawberry-blonde"},
		{value: "white"},
	],
	Pattern: [
		{value: "blue"},
		{value: "brown"},
		{value: "green"},
		{value: "grey"},
		{value: "orange"},
		{value: "pink"},
		{value: "purple"},
		{value: "red"},
		{value: "white"},
		{value: "yellow"},
	],
	Effect: [
		{value: "fading"},
		{value: "camouflage"},
		{value: "speckles"},
		{value: "blotches"},
		{value: "stripes"},
		{value: "veins"},
		{value: "highlights"},
		{value: "undercoloring"},
	],
};
/**
 * @typedef {object} hairStyle
 * @property {string} title
 * @property {FC.HairStyle} value
 * @property {number} [hLength]
 */

/**
 * @type {{[key: string]: hairStyle[]}}
 */
App.Medicine.Modification.hairStyles = {
	Normal: [
		{
			title: "Afro",
			value: "afro"
		},
		{
			title: "Braided",
			value: "braided"
		},
		{
			title: "Cornrows",
			value: "cornrows"
		},
		{
			title: "Curled",
			value: "curled"
		},
		{
			title: "Dreadlocks",
			value: "dreadlocks"
		},
		{
			title: "Eary",
			value: "eary"
		},
		{
			title: "In a bun",
			value: "bun"
		},
		{
			title: "In a messy bun",
			value: "messy bun"
		},
		{
			title: "in double buns",
			value: "double buns"
		},
		{
			title: "In a chignon",
			value: "chignon"
		},
		{
			title: "In a french twist",
			value: "french twist"
		},
		{
			title: "In a ponytail",
			value: "ponytail"
		},
		{
			title: "In pigtails",
			value: "tails"
		},
		{
			title: "Coiled",
			value: "drills"
		},
		{
			title: "Luxurious",
			value: "luxurious"
		},
		{
			title: "Messy",
			value: "messy"
		},
		{
			title: "Neat",
			value: "neat"
		},
		{
			title: "Permed",
			value: "permed"
		},
		{
			title: "Bangs",
			value: "bangs"
		},
		{
			title: "Hime cut",
			value: "hime"
		},
		{
			title: "Shaved sides",
			value: "strip"
		},
		{
			title: "Up",
			value: "up"
		},
		{
			title: "Half-Shaved",
			value: "undercut"
		},
		{
			title: "in a crown braid",
			value: "crown braid"
		},
		{
			title: "Single dutch braid",
			value: "dutch braid"
		},
		{
			title: "Double dutch braids",
			value: "double dutch braid"
		},
	],
	Cut: [
		{
			title: "Shaved",
			value: "shaved",
			hLength: 0
		},
		{
			title: "Trimmed short",
			value: "trimmed",
			hLength: 10
		},
		{
			title: "Buzzcut",
			value: "buzzcut",
			hLength: 1
		},
		{
			title: "Pixie cut",
			value: "pixie cut",
			hLength: 10
		},
		{
			title: "Bob cut",
			value: "bob cut",
			hLength: 15
		},
	],
};

App.Medicine.Modification.hLength = [
	{
		title: "Very short",
		hLength: 5
	},
	{
		title: "Short",
		hLength: 10
	},
	{
		title: "Shoulder length",
		hLength: 30
	},
	{
		title: "Long",
		hLength: 60
	},
	{
		title: "Very long",
		hLength: 100
	},
];

/**  the Hex codes for the added colors can be found in
 * @param {FC.ColorHex} codes
 */
App.Medicine.Modification.eyeColor = [
	{value: "amber"},
	{value: "amaranth"},
	{value: "amethyst"},
	{value: "aquamarine"},
	{value: "azure"},
	{value: "black"},
	{value: "blue"},
	{value: "brown"},
	{value: "citrine"},
	{value: "crimson"},
	{value: "emerald"},
	{value: "gold"},
	{value: "green"},
	{value: "hazel"},
	{value: "ivory"},
	{value: "jade"},
	{value: "orange"},
	{value: "pale-grey"},
	{value: "pink"},
	{value: "platinum"},
	{value: "onyx"},
	{value: "red"},
	{value: "ruby"},
	{value: "sapphire"},
	{value: "silver"},
	{value: "sky-blue"},
	{value: "turquoise"},
	{value: "white"},
	{value: "yellow"}
];

App.Medicine.Modification.eyeShape = [
	{value: "circular"},
	{value: "almond-shaped"},
	{value: "bright"},
	{value: "catlike"},
	{value: "demonic"},
	{value: "devilish"},
	{value: "goat-like"},
	{value: "heart-shaped"},
	{value: "hypnotic"},
	{value: "serpent-like"},
	{value: "star-shaped"},
	{value: "teary"},
	{value: "vacant"},
	{value: "wide-eyed"}
];

App.Medicine.Modification.naturalSkins = ["pure white", "ivory", "white", "extremely pale", "very pale", "pale", "extremely fair", "very fair", "fair", "light", "light olive", "tan", "olive", "bronze", "dark olive", "dark", "light beige", "beige", "dark beige", "light brown", "brown", "dark brown", "black", "ebony", "pure black"];
App.Medicine.Modification.catgirlNaturalSkins = ["white", "brown", "black", "red", "yellow", "black and white striped"];
App.Medicine.Modification.dyedSkins = ["camouflage patterned", "dyed blue", "dyed white", "dyed gray", "dyed black", "dyed green", "dyed pink", "dyed red", "tiger striped", "dyed purple", "clown"];
App.Medicine.Modification.naturalNippleColors = ["black", "brown", "dark brown", "ebony", "ivory", "light brown", "pale pink", "pink"];
App.Medicine.Modification.eyebrowStyles = new Set(["shaved", "straight", "rounded", "natural", "slanted inwards", "slanted outwards", "high-arched", "elongated", "shortened", "curved"]);
App.Medicine.Modification.eyebrowFullness = new Set(["pencil-thin", "thin", "threaded", "natural", "tapered", "thick", "bushy"]);
App.Medicine.Modification.pubicStyles = new Set(["waxed", "in a strip", "neat", "bushy", "bushy in the front and neat in the rear", "very bushy"]);
App.Medicine.Modification.armpitStyles = new Set(["waxed", "shaved", "neat", "bushy"]);
App.Medicine.Modification.hornColor = new Set(["golden", "copper", "red", "deep red", "green", "pink", "dark brown", "brown", "burgundy", "jet black", "black", "grey", "silver", "white", "blue-violet", "purple", "dark orchid", "sea green", "green-yellow", "dark blue", "blazing red", "neon green", "neon blue", "neon pink"]);
App.Medicine.Modification.faceShape = new Map([
	["normal", {
		desc: `faces have no impact on beauty; the slave's face affects beauty based on its attractiveness alone.`
	}],
	["exotic", {
		desc: `faces exaggerate the impact of facial attractiveness on beauty: being exotic will make an ugly face worse and a beautiful face better.`
	}],
	["sensual", {
		desc: `faces exaggerate the impact of facial attractiveness on beauty, but less than exotic faces do, and also add a small fixed bonus to attractiveness.`
	}],
	["cute", {
		desc: `faces add a larger fixed bonus to attractiveness.`
	}],
	["androgynous", {
		desc: `faces are moderately bad for attractiveness`
	}],
	["masculine", {
		// TODO desc: ``,
		get requirements() { return V.seeDicks !== 0; }
	}]
]);
App.Medicine.Modification.teeth = new Map([
	["normal", {
		get desc() {
			return App.UI.DOM.combineNodes(
				`teeth have a minor positive impact on, `,
				App.Encyclopedia.link("attractiveness", "Slave Score (Attractiveness)"),
				`.`
			);
		}
	}],
	["crooked", {
		desc: `teeth have a minor negative impact on attractiveness. They can be fixed with braces, applied from the surgery.`
	}],
	["gapped", {
		desc: `teeth can cause a slave to lisp. They can be fixed with braces, applied from the surgery.`
	}],
	["straightening braces", {
		desc: `have a negative impact on attractiveness, but less than crooked teeth, and will eventually straighten the slave's teeth. They can be applied to straight teeth or left on after they are no longer useful, if desired.`
	}],
	["cosmetic braces", {
		// TODO desc: ``
	}],
	["removable", {
		desc: `teeth can pass as normal teeth and thus have no attractiveness impact, but do alter some sex scenes.`,
		get requirements() { return (V.seeExtreme === 1); }
	}],
	["pointy", {
		get desc() {
			return App.UI.DOM.combineNodes(
				`teeth have a minor negative impact on attractiveness, but are intimidating, offering slight improvements to combat effectiveness and performance as a `,
				App.Encyclopedia.link("Bodyguard"),
				`.`
			);
		},
		get requirements() { return (V.seeExtreme === 1); },
		sharp: true
	}],
	["fangs", {
		// TODO desc: ``,
		sharp: true
	}],
	["fang", {
		// TODO desc: ``,
		sharp: true
	}],
	["baby", {
		// TODO desc: ``,
	}],
	["mixed", {
		// TODO desc: ``,
	}],
]);
/**
 * Use singular when possible
 * @type {Record<FC.Piercing, {smart?: boolean, requirements?: (slave: FC.SlaveState) => boolean}>}
 */
App.Data.Piercings = {
	"ear": {
	},
	"nose": {
	},
	"eyebrow": {
	},
	"lips": {
	},
	"tongue": {
	},
	"nipple": {
		requirements: (s) => s.nipples !== "fuckable",
	},
	"areola": {
	},
	"navel": {
	},
	"corset": {
	},
	"genitals": {
		smart: true,
	},
	"vagina": {
		requirements: (s) => s.vagina > -1,
	},
	"dick": {
		requirements: (s) => s.dick > 0,
	},
	"anus": {
	},
};
