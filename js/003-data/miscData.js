// cSpell:ignore Fucktard, Fucko

App.Data.misc = {
	/** * pregmod exclusive start ***/

	/* Double 20 week point for human data — not a bug. Do not change! (It's transfer point in data source, from data without CTR to with CTR) */
	/* Any profile graph data should begin from week 0. Size can be 0 or 1, but CTR should be set to the same value as next graph point.*/
	pregData: {

		human: {
			type: "human",
			normalOvaMin: 1,
			normalOvaMax: 1,
			normalBirth: 40,
			minLiveBirth: 32,
			drugsEffect: 1,
			fetusWeek: [0, 9, 20, 20, 40, 52, 64, 80, 384, 99999],
			fetusSize: [1, 3, 16, 25.6, 51, 60, 67.5, 71.6, 129.5, 130],
			fetusRate: [1, 1, 1, 0.64, 0.6513, 0.6459, 0.644, 0.6393, 0.58, 0.51],
			sizeType: 0
		},

		humanWG: {
			type: "humanWG",
			normalOvaMin: 1,
			normalOvaMax: 1,
			normalBirth: 40,
			minLiveBirth: 32,
			drugsEffect: 1,
			fetusWeek: [0, 8, 11, 15, 20, 28, 34, 38, 40, 42, 52, 64, 76, 88, 384, 99999],
			fetusSize: [0, 1, 7, 70, 300, 1005, 2146, 3088, 3462, 3685, 6300, 7700, 8400, 8800, 65000, 65000],
			fetusRate: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
			sizeType: 1
		},

		canineM: {
			type: "canineM",
			normalOvaMin: 4,
			normalOvaMax: 8,
			normalBirth: 9,
			minLiveBirth: 8,
			drugsEffect: 0.3,
			fetusWeek: [0, 4, 5, 9, 9 + 4 * 4, 9 + 12 * 4, 24 * 4, 99999],
			fetusSize: [0, 1, 165, 300, 9525, 17236, 18000, 18000],
			fetusRate: [4, 4, 4, 4, 4, 4, 4, 4],
			sizeType: 1
		},

		canineL: {
			type: "canineL",
			normalOvaMin: 2,
			normalOvaMax: 6,
			normalBirth: 9,
			minLiveBirth: 8,
			drugsEffect: 0.3,
			fetusWeek: [0, 4, 5, 9, 9 + 4 * 4, 9 + 12 * 4, 24 * 4, 99999],
			fetusSize: [0, 1, 165, 453, 17236, 31751, 34000, 34000],
			fetusRate: [4, 4, 4, 4, 4, 4, 4, 4],
			sizeType: 1
		},

		pig: {
			type: "pig",
			normalOvaMin: 8,
			normalOvaMax: 12,
			normalBirth: 16,
			minLiveBirth: 14,
			drugsEffect: 0.5,
			fetusWeek: [0, 3, 16, 16 + 28, 16 + 48, 99999],
			fetusSize: [0, 1, 1700, 94000, 170000, 170000],
			fetusRate: [4, 4, 4, 4, 4, 4],
			sizeType: 1
		},

		cow: {
			type: "cow",
			normalOvaMin: 1,
			normalOvaMax: 1,
			normalBirth: 41,
			minLiveBirth: 38,
			drugsEffect: 0.05,
			fetusWeek: [0, 1 * 4, 2 * 4, 3 * 4, 4 * 4, 5 * 4, 6 * 4, 7 * 4, 8 * 4, 9 * 4, 9 * 4 + 90, 9 * 4 + 180, 99999],
			fetusSize: [0, 1, 20, 280, 1500, 3200, 6100, 15000, 23000, 50000, 350000, 500000, 500000],
			fetusRate: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
			sizeType: 1
		},

		equine: {
			type: "equine",
			normalOvaMin: 1,
			normalOvaMax: 1,
			normalBirth: 48,
			minLiveBirth: 44,
			drugsEffect: 0.05,
			fetusWeek: [0, 5.7, 8.5, 11.4, 14.2, 21.4, 25.7, 34.2, 38.5, 45.7, 48, 192, 99999],
			fetusSize: [0, 14.1, 28.3, 56.7, 453, 2721, 11339, 20411, 34019, 54431, 57000, 600000, 600000],
			fetusRate: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
			sizeType: 1
		},

		// fantasy stuff for those feeling adventurous with variables
		tentacle: {
			type: "tentacle",
			normalOvaMin: 1,
			normalOvaMax: 1,
			normalBirth: 4,
			minLiveBirth: 4,
			drugsEffect: 2,
			fetusWeek: [0, 1, 2, 3, 4, 5, 6, 99999],
			fetusSize: [5000, 11000, 19000, 30000, 45000, 60000, 60000],
			fetusRate: [4, 4, 4, 4, 4, 4, 4, 4],
			sizeType: 2
		},

		tentacleN: {
			type: "tentacleN",
			normalOvaMin: 1,
			normalOvaMax: 1,
			normalBirth: 3,
			minLiveBirth: 1,
			drugsEffect: 0,
			fetusWeek: [0, 1, 2, 3, 4, 5, 6, 99999],
			fetusSize: [100, 500, 1000, 2000, 5000, 10000, 25000, 100000],
			fetusRate: [4, 4, 4, 4, 4, 4, 4, 4],
			sizeType: 2
		},

		slime: {
			type: "slime",
			normalOvaMin: 1,
			normalOvaMax: 1,
			normalBirth: 2,
			minLiveBirth: 0,
			drugsEffect: 0,
			fetusWeek: [0, 99999],
			fetusSize: [10000, 10000],
			fetusRate: [4, 4, 4, 4, 4, 4, 4, 4],
			sizeType: 2
		},

		insect: {
			type: "insect",
			normalOvaMin: 50,
			normalOvaMax: 500,
			normalBirth: 2,
			minLiveBirth: 1,
			drugsEffect: 0.0,
			fetusWeek: [0, 1, 2, 3, 4, 99999],
			fetusSize: [20, 350, 400, 800, 5000, 5000],
			fetusRate: [4, 4, 4, 4, 4, 4],
			sizeType: 2
		},

		maggotHuge: {
			type: "maggotHuge",
			normalOvaMin: 1,
			normalOvaMax: 3,
			normalBirth: 42,
			minLiveBirth: 20,
			drugsEffect: 0.0,
			fetusWeek: [0, 8, 11, 15, 20, 28, 34, 38, 42, 52, 64, 76, 88, 384, 99999],
			fetusSize: [0, 150, 300, 800, 4000, 8000, 15000, 17500, 20000, 22000, 30000, 40000, 52000, 150000, 150000],
			fetusRate: [4, 4, 4, 4, 4, 4, 4, 4],
			sizeType: 2
		},

		facehugger2: {
			type: "facehugger2",
			normalOvaMin: 10,
			normalOvaMax: 10,
			normalBirth: 1,
			minLiveBirth: 1,
			drugsEffect: 0.0,
			fetusWeek: [0, 99999],
			fetusSize: [2000, 150000],
			fetusRate: [4, 4],
			sizeType: 2
		},

		elven: {
			type: "elven",
			normalOvaMin: 1,
			normalOvaMax: 1,
			normalBirth: 94,
			minLiveBirth: 80,
			drugsEffect: .5,
			fetusWeek: [0, 21, 43, 43, 94, 102, 114, 130, 434, 99999],
			fetusSize: [1, 3, 16, 25.6, 51, 60, 67.5, 71.6, 129.5, 130],
			fetusRate: [1, 1, 1, 0.64, 0.6513, 0.6459, 0.644, 0.6393, 0.58, 0.51],
			sizeType: 0
		},

		eggS: {
			type: "eggModS",
			normalOvaMin: 30,
			normalOvaMax: 100,
			normalBirth: 4,
			minLiveBirth: 1,
			drugsEffect: 0.05,
			fetusWeek: [0, 1, 2, 3, 4, 99999],
			fetusSize: [1, 100, 225, 350, 500, 500],
			fetusRate: [4, 4, 4, 4, 4, 4],
			sizeType: 2
		},

		eggM: {
			type: "eggModM",
			normalOvaMin: 5,
			normalOvaMax: 30,
			normalBirth: 4,
			minLiveBirth: 1,
			drugsEffect: 0.05,
			fetusWeek: [0, 1, 2, 3, 4, 99999],
			fetusSize: [1, 500, 1000, 1500, 2000, 2000],
			fetusRate: [4, 4, 4, 4, 4, 4],
			sizeType: 2
		},

		eggL: {
			type: "eggModL",
			normalOvaMin: 5,
			normalOvaMax: 15,
			normalBirth: 4,
			minLiveBirth: 1,
			drugsEffect: 0.05,
			fetusWeek: [0, 1, 2, 3, 4, 99999],
			fetusSize: [1, 500, 2000, 5000, 10000, 10000],
			fetusRate: [4, 4, 4, 4, 4, 4],
			sizeType: 2
		},

		eggXL: {
			type: "eggModXL",
			normalOvaMin: 1,
			normalOvaMax: 1,
			normalBirth: 4,
			minLiveBirth: 1,
			drugsEffect: 0.05,
			fetusWeek: [0, 1, 2, 3, 4, 99999],
			fetusSize: [1, 1000, 5000, 10000, 30000, 30000],
			fetusRate: [4, 4, 4, 4, 4, 4],
			sizeType: 2
		},

	},
	/* Source data for canine include CTR (not head to toe size), so CTR do not apply anywhere, always 1.*/
	/* sizeType: control of source data type 0 - length in centimeters for fetusSize and CTR for fetusRate, 1 - weight in grams and womb to fetus rate, 2 - direct volume in cc, fetusRate not used*/

	/* equine: {type: "equine", normalOvaMin:1, normalOvaMax: 1, normalBirth: 48, minLiveBirth: 44, fetusWeek: [0, 4, 7, 9, 10, 12, 17, 21, 25, 34, 38, 48, 192, 99999], fetusSize: [0, 2.5, 3, 4, 6.3, 14, 17.7, 30, 61, 76.2, 92, 121, 235, 235], fetusRate: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] sizeType: 0} */

	/**
	 * @type {Map<FC.Race, string>}
	 */
	filterRacesBase: (/** @returns {Map<FC.Race, string>} IIFE required to avoid type widening */ function() {
		return new Map([
			["amerindian", "Amerindian"],
			["asian", "Asian"],
			["black", "Black"],
			["indo-aryan", "Indo-Aryan"],
			["latina", "Latina"],
			["malay", "Malay"],
			["middle eastern", "Middle Eastern"],
			["mixed race", "Mixed Race"],
			["pacific islander", "Pacific Islander"],
			["semitic", "Semitic"],
			["southern european", "Southern European"],
			["white", "White"],
		]);
	})(),

	/**
	 * All active races
	 * @returns {Map<FC.Race, string>}
	 */
	get filterRaces() {
		const map = new Map(App.Data.misc.filterRacesBase);
		if (V.seeCats) {
			map.set("catgirl", "Catgirl");
		}
		return map;
	},

	/**
	 * All races that are publicly available
	 * @returns {Map<FC.Race, string>}
	 */
	get filterRacesPublic() {
		const map = new Map(App.Data.misc.filterRacesBase);
		if (V.seeCats && V.projectN.techReleased) {
			map.set("catgirl", "Catgirl");
		}
		return map;
	},

	filterRegions: ["Africa", "Asia", "Australia", "Europe", "Middle East", "North America", "South America"],

	/* START Custom Nationalities region filter */
	/* Not currently weighted, but will accept weights */
	northAmericaNationalities: {
		"American": 1,
		"Antiguan": 1,
		"Aruban": 1,
		"Bahamian": 1,
		"Barbadian": 1,
		"Belizean": 1,
		"Bermudian": 1,
		"Canadian": 1,
		"Costa Rican": 1,
		"Cuban": 1,
		"Curaçaoan": 1,
		"Dominican": 1,
		"Dominiquais": 1,
		"Greenlandic": 1,
		"Grenadian": 1,
		"Guatemalan": 1,
		"Haitian": 1,
		"Honduran": 1,
		"Jamaican": 1,
		"Kittitian": 1,
		"Mexican": 1,
		"Nicaraguan": 1,
		"Panamanian": 1,
		"Puerto Rican": 1,
		"Saint Lucian": 1,
		"Salvadoran": 1,
		"Trinidadian": 1,
		"Vincentian": 1
	},

	southAmericaNationalities: {
		"Argentinian": 1,
		"Bolivian": 1,
		"Brazilian": 1,
		"Chilean": 1,
		"Colombian": 1,
		"Ecuadorian": 1,
		"French Guianan": 1,
		"Guyanese": 1,
		"Paraguayan": 1,
		"Peruvian": 1,
		"Surinamese": 1,
		"Uruguayan": 1,
		"Venezuelan": 1
	},

	europeNationalities: {
		"Albanian": 1,
		"Andorran": 1,
		"Austrian": 1,
		"Belarusian": 1,
		"Belgian": 1,
		"Bosnian": 1,
		"British": 1,
		"Bulgarian": 1,
		"Catalan": 1,
		"Croatian": 1,
		"Czech": 1,
		"Danish": 1,
		"Dutch": 1,
		"Estonian": 1,
		"Finnish": 1,
		"French": 1,
		"German": 1,
		"Greek": 1,
		"Hungarian": 1,
		"Icelandic": 1,
		"Irish": 1,
		"Italian": 1,
		"Kosovan": 1,
		"Latvian": 1,
		"a Liechtensteiner": 1,
		"Lithuanian": 1,
		"Luxembourgian": 1,
		"Macedonian": 1,
		"Maltese": 1,
		"Moldovan": 1,
		"Monégasque": 1,
		"Montenegrin": 1,
		"Norwegian": 1,
		"Polish": 1,
		"Portuguese": 1,
		"Romanian": 1,
		"Russian": 1,
		"Sammarinese": 1,
		"Scottish": 1,
		"Serbian": 1,
		"Slovak": 1,
		"Slovene": 1,
		"Spanish": 1,
		"Swedish": 1,
		"Swiss": 1,
		"Ukrainian": 1,
		"Vatican": 1
	},

	asiaNationalities: {
		"Bangladeshi": 1,
		"Bhutanese": 1,
		"Bruneian": 1,
		"Burmese": 1,
		"Cambodian": 1,
		"Chinese": 1,
		"East Timorese": 1,
		"Filipina": 1,
		"Indian": 1,
		"Indonesian": 1,
		"Japanese": 1,
		"Kazakh": 1,
		"Korean": 1,
		"Kyrgyz": 1,
		"Laotian": 1,
		"Malaysian": 1,
		"Maldivian": 1,
		"Mongolian": 1,
		"Nepalese": 1,
		"Pakistani": 1,
		"Singaporean": 1,
		"Sri Lankan": 1,
		"Taiwanese": 1,
		"Tajik": 1,
		"Thai": 1,
		"Tibetan": 1,
		"Turkmen": 1,
		"Uzbek": 1,
		"Vietnamese": 1
	},

	middleEastNationalities: {
		"Afghan": 1,
		"Armenian": 1,
		"Azerbaijani": 1,
		"Bahraini": 1,
		"Cypriot": 1,
		"Egyptian": 1,
		"Emirati": 1,
		"Georgian": 1,
		"Iranian": 1,
		"Iraqi": 1,
		"Israeli": 1,
		"Jordanian": 1,
		"Kurdish": 1,
		"Kuwaiti": 1,
		"Lebanese": 1,
		"Omani": 1,
		"Palestinian": 1,
		"Qatari": 1,
		"Saudi": 1,
		"Syrian": 1,
		"Turkish": 1,
		"Yemeni": 1
	},

	africaNationalities: {
		"Algerian": 1,
		"Angolan": 1,
		"Beninese": 1,
		"Bissau-Guinean": 1,
		"Burkinabé": 1,
		"Burundian": 1,
		"Cameroonian": 1,
		"Cape Verdean": 1,
		"Central African": 1,
		"Chadian": 1,
		"Comorian": 1,
		"Congolese": 1,
		"Djiboutian": 1,
		"Equatoguinean": 1,
		"Eritrean": 1,
		"Ethiopian": 1,
		"Gabonese": 1,
		"Gambian": 1,
		"Ghanan": 1,
		"Guinean": 1,
		"Ivorian": 1,
		"Kenyan": 1,
		"Liberian": 1,
		"Libyan": 1,
		"Malagasy": 1,
		"Malawian": 1,
		"Malian": 1,
		"Mauritanian": 1,
		"Mauritian": 1,
		"Moroccan": 1,
		"Mosotho": 1,
		"Motswana": 1,
		"Mozambican": 1,
		"Namibian": 1,
		"Nigerian": 1,
		"Nigerien": 1,
		"Rwandan": 1,
		"Sahrawi": 1,
		"São Toméan": 1,
		"Senegalese": 1,
		"Seychellois": 1,
		"Sierra Leonean": 1,
		"Somali": 1,
		"South African": 1,
		"South Sudanese": 1,
		"Sudanese": 1,
		"Swazi": 1,
		"Tanzanian": 1,
		"Togolese": 1,
		"Tunisian": 1,
		"Ugandan": 1,
		"Zairian": 1,
		"Zambian": 1,
		"Zimbabwean": 1
	},

	australiaNationalities: {
		"Australian": 1,
		"a Cook Islander": 1,
		"Fijian": 1,
		"French Polynesian": 1,
		"Guamanian": 1,
		"I-Kiribati": 1,
		"Marshallese": 1,
		"Micronesian": 1,
		"Nauruan": 1,
		"New Caledonian": 1,
		"a New Zealander": 1,
		"Ni-Vanuatu": 1,
		"Niuean": 1,
		"Palauan": 1,
		"Papua New Guinean": 1,
		"Samoan": 1,
		"a Solomon Islander": 1,
		"Tongan": 1,
		"Tuvaluan": 1
	},

	/* END Custom Nationalities region filter */

	/** * pregmod exclusive end ***/

	/* Nationality-to-race weighted objects */
	raceSelector: {
		"Afghan": {"indo-aryan": 28, "middle eastern": 2, "mixed race": 2},
		"Albanian": {
			"indo-aryan": 1,
			"mixed race": 1,
			"southern european": 1,
			"white": 42
		},
		"Algerian": {"middle eastern": 38, "mixed race": 2, "southern european": 1},
		"American": {
			"amerindian": 1,
			"asian": 4,
			"black": 10,
			"indo-aryan": 3,
			"latina": 8,
			"malay": 1,
			"middle eastern": 4,
			"mixed race": 2,
			"pacific islander": 1,
			"semitic": 3,
			"southern european": 4,
			"white": 30
		},
		"Andorran": {
			"middle eastern": 1,
			"mixed race": 2,
			"southern european": 8,
			"white": 3
		},
		"Angolan": {"black": 14, "mixed race": 1, "white": 1},
		"Antiguan": {
			"black": 17,
			"indo-aryan": 1,
			"latina": 2,
			"mixed race": 4,
			"white": 1
		},
		"Argentinian": {
			"amerindian": 1,
			"latina": 8,
			"mixed race": 2,
			"southern european": 5,
			"white": 3
		},
		"Armenian": {
			"indo-aryan": 4,
			"mixed race": 2,
			"semitic": 9,
			"southern european": 1,
			"white": 2
		},
		"Aruban": {
			"amerindian": 2,
			"black": 4,
			"latina": 2,
			"mixed race": 12,
			"white": 2
		},
		"Australian": {
			"asian": 4,
			"black": 2,
			"indo-aryan": 1,
			"malay": 1,
			"mixed race": 2,
			"pacific islander": 6,
			"southern european": 1,
			"white": 18
		},
		"Austrian": {"indo-aryan": 1, "mixed race": 1, "white": 10},
		"Azerbaijani": {
			"indo-aryan": 14,
			"mixed race": 1,
			"semitic": 4,
			"white": 1
		},
		"Bahamian": {
			"asian": 1,
			"black": 36,
			"latina": 1,
			"mixed race": 1,
			"white": 1
		},
		"Bahraini": {"indo-aryan": 9, "middle eastern": 10, "mixed race": 2},
		"Bangladeshi": {"asian": 1, "indo-aryan": 32, "mixed race": 2},
		"Barbadian": {
			"black": 26,
			"indo-aryan": 1,
			"mixed race": 2,
			"white": 1
		},
		"Belarusian": {
			"indo-aryan": 1,
			"mixed race": 1,
			"semitic": 1,
			"white": 17
		},
		"Belgian": {
			"middle eastern": 1,
			"mixed race": 1,
			"southern european": 2,
			"white": 10
		},
		"Belizean": {
			"amerindian": 1,
			"black": 2,
			"indo-aryan": 1,
			"latina": 8,
			"mixed race": 2,
			"white": 1
		},
		"Beninese": {"black": 22, "indo-aryan": 1, "mixed race": 2},
		"Bermudian": {
			"asian": 1,
			"black": 8,
			"mixed race": 2,
			"white": 5
		},
		"Bhutanese": {"asian": 12, "indo-aryan": 2, "mixed race": 1},
		"Bissau-Guinean": {"black": 47, "mixed race": 2, "southern european": 1},
		"Bolivian": {
			"amerindian": 9,
			"latina": 9,
			"mixed race": 3,
			"white": 1
		},
		"Bosnian": {"indo-aryan": 1, "mixed race": 1, "white": 23},
		"Brazilian": {
			"amerindian": 1,
			"asian": 1,
			"black": 2,
			"latina": 3,
			"mixed race": 4,
			"white": 6
		},
		"British": {
			"asian": 2,
			"black": 3,
			"indo-aryan": 3,
			"malay": 1,
			"middle eastern": 2,
			"mixed race": 2,
			"semitic": 2,
			"southern european": 4,
			"white": 34
		},
		"Bruneian": {
			"asian": 10,
			"indo-aryan": 5,
			"malay": 28,
			"mixed race": 1
		},
		"Bulgarian": {
			"indo-aryan": 4,
			"middle eastern": 1,
			"mixed race": 1,
			"white": 44
		},
		"Burkinabé": {"black": 12, "middle eastern": 1, "mixed race": 1},
		"Burmese": {
			"asian": 8,
			"indo-aryan": 4,
			"malay": 1,
			"mixed race": 2
		},
		"Burundian": {"black": 48, "mixed race": 1, "white": 1},
		"Cambodian": {"asian": 23, "malay": 1, "mixed race": 1},
		"Cameroonian": {"black": 60, "middle eastern": 1, "mixed race": 1},
		"Canadian": {
			"amerindian": 2,
			"asian": 2,
			"black": 2,
			"indo-aryan": 2,
			"latina": 1,
			"middle eastern": 1,
			"mixed race": 2,
			"southern european": 2,
			"white": 28
		},
		"Cape Verdean": {
			"black": 6,
			"mixed race": 30,
			"southern european": 2,
			"white": 1
		},
		"Catalan": {
			"latina": 1,
			"middle eastern": 1,
			"mixed race": 1,
			"southern european": 14,
			"white": 1
		},
		"Central African": {"black": 14, "middle eastern": 1, "mixed race": 1},
		"Chadian": {"black": 15, "middle eastern": 3, "mixed race": 2},
		"Chilean": {
			"amerindian": 1,
			"latina": 6,
			"mixed race": 2,
			"southern european": 3,
			"white": 2
		},
		"Chinese": {"asian": 70, "indo-aryan": 1, "mixed race": 1},
		"Colombian": {
			"amerindian": 1,
			"black": 2,
			"latina": 20,
			"mixed race": 2,
			"southern european": 1,
			"white": 1
		},
		"Comorian": {"black": 11, "middle eastern": 2, "mixed race": 2},
		"Congolese": {"black": 18, "mixed race": 1, "white": 1},
		"a Cook Islander": {"mixed race": 2, "pacific islander": 30, "white": 1},
		"Costa Rican": {
			"amerindian": 1,
			"black": 1,
			"latina": 11,
			"mixed race": 2,
			"white": 2
		},
		"Croatian": {
			"indo-aryan": 1,
			"mixed race": 1,
			"southern european": 1,
			"white": 27
		},
		"Cuban": {
			"black": 3,
			"latina": 10,
			"mixed race": 4,
			"southern european": 2,
			"white": 1
		},
		"Curaçaoan": {
			"black": 7,
			"indo-aryan": 1,
			"latina": 1,
			"malay": 1,
			"mixed race": 1,
			"white": 1
		},
		"Cypriot": {
			"indo-aryan": 4,
			"middle eastern": 1,
			"mixed race": 1,
			"southern european": 6
		},
		"Czech": {
			"indo-aryan": 1,
			"mixed race": 1,
			"semitic": 1,
			"southern european": 1,
			"white": 26
		},
		"Danish": {
			"amerindian": 1,
			"indo-aryan": 2,
			"middle eastern": 2,
			"mixed race": 1,
			"white": 16
		},
		"Djiboutian": {
			"black": 18,
			"middle eastern": 4,
			"mixed race": 2,
			"southern european": 1,
			"white": 1
		},
		"Dominican": {
			"black": 2,
			"latina": 7,
			"mixed race": 2,
			"white": 2
		},
		"Dominiquais": {
			"amerindian": 1,
			"black": 11,
			"mixed race": 3,
			"white": 1
		},
		"Dutch": {
			"indo-aryan": 1,
			"malay": 1,
			"middle eastern": 1,
			"mixed race": 1,
			"white": 16
		},
		"East Timorese": {
			"asian": 1,
			"mixed race": 2,
			"malay": 8,
			"pacific islander": 3
		},
		"Ecuadorian": {
			"amerindian": 2,
			"black": 2,
			"latina": 9,
			"mixed race": 2,
			"southern european": 1,
			"white": 2
		},
		"Egyptian": {
			"black": 2,
			"indo-aryan": 1,
			"middle eastern": 25,
			"mixed race": 2,
			"semitic": 1
		},
		"Emirati": {
			"asian": 1,
			"black": 1,
			"indo-aryan": 16,
			"middle eastern": 6,
			"mixed race": 2
		},
		"Equatoguinean": {"black": 22, "mixed race": 2, "southern european": 1},
		"Eritrean": {
			"black": 14,
			"middle eastern": 6,
			"mixed race": 2,
			"semitic": 2,
			"southern european": 1
		},
		"Estonian": {"mixed race": 1, "semitic": 1, "white": 23},
		"Ethiopian": {
			"black": 10,
			"middle eastern": 3,
			"mixed race": 1,
			"semitic": 2
		},
		"Fijian": {
			"asian": 1,
			"indo-aryan": 6,
			"mixed race": 1,
			"pacific islander": 8,
			"white": 1
		},
		"Filipina": {
			"asian": 4,
			"latina": 1,
			"malay": 10,
			"pacific islander": 4,
			"mixed race": 2,
			"southern european": 1
		},
		"Finnish": {
			"indo-aryan": 1,
			"middle eastern": 1,
			"mixed race": 1,
			"white": 32
		},
		"French": {
			"asian": 1,
			"black": 1,
			"indo-aryan": 1,
			"middle eastern": 1,
			"mixed race": 1,
			"semitic": 1,
			"southern european": 2,
			"white": 22
		},
		"French Guianan": {
			"amerindian": 1,
			"asian": 1,
			"black": 3,
			"mixed race": 10,
			"southern european": 1,
			"white": 3
		},
		"French Polynesian": {
			"asian": 3,
			"mixed race": 1,
			"pacific islander": 15,
			"white": 1
		},
		"Gabonese": {"black": 21, "mixed race": 2, "white": 2},
		"Gambian": {"black": 28, "middle eastern": 1, "mixed race": 2},
		"Georgian": {
			"indo-aryan": 6,
			"mixed race": 1,
			"semitic": 7,
			"southern european": 1,
			"white": 2
		},
		"German": {
			"asian": 1,
			"black": 1,
			"indo-aryan": 2,
			"middle eastern": 1,
			"mixed race": 1,
			"semitic": 1,
			"southern european": 2,
			"white": 20
		},
		"Ghanan": {
			"asian": 1,
			"black": 14,
			"indo-aryan": 1,
			"middle eastern": 1,
			"mixed race": 2,
			"semitic": 1
		},
		"Greek": {
			"indo-aryan": 2,
			"mixed race": 1,
			"southern european": 11,
			"white": 3
		},
		"Greenlandic": {"amerindian": 44, "mixed race": 1, "white": 6},
		"Grenadian": {
			"black": 18,
			"indo-aryan": 1,
			"mixed race": 2,
			"white": 1
		},
		"Guamanian": {
			"asian": 2,
			"malay": 1,
			"mixed race": 1,
			"pacific islander": 6,
			"white": 1
		},
		"Guatemalan": {
			"amerindian": 8,
			"latina": 9,
			"mixed race": 2,
			"white": 2
		},
		"Guinean": {"black": 33, "middle eastern": 1, "mixed race": 1},
		"Guyanese": {
			"amerindian": 2,
			"black": 4,
			"indo-aryan": 3,
			"mixed race": 1
		},
		"Haitian": {"black": 18, "mixed race": 1, "white": 1},
		"Honduran": {
			"amerindian": 10,
			"black": 1,
			"latina": 48,
			"mixed race": 4,
			"white": 1
		},
		"Hungarian": {"indo-aryan": 2, "mixed race": 1, "white": 9},
		"I-Kiribati": {"asian": 1, "mixed race": 2, "pacific islander": 22},
		"Icelandic": {"asian": 1, "mixed race": 1, "white": 50},
		"Indian": {
			"asian": 1,
			"indo-aryan": 70,
			"mixed race": 1,
			"white": 1
		},
		"Indonesian": {
			"asian": 4,
			"indo-aryan": 1,
			"malay": 39,
			"middle eastern": 2,
			"mixed race": 2,
			"pacific islander": 2
		},
		"Iranian": {
			"indo-aryan": 15,
			"middle eastern": 1,
			"mixed race": 1,
			"semitic": 1
		},
		"Iraqi": {
			"black": 1,
			"indo-aryan": 2,
			"middle eastern": 8,
			"mixed race": 1,
			"semitic": 2
		},
		"Irish": {"indo-aryan": 1, "mixed race": 1, "white": 28},
		"Israeli": {
			"black": 1,
			"indo-aryan": 1,
			"middle eastern": 2,
			"mixed race": 1,
			"semitic": 9,
			"white": 2
		},
		"Italian": {
			"asian": 1,
			"indo-aryan": 1,
			"middle eastern": 1,
			"mixed race": 1,
			"southern european": 10,
			"white": 4
		},
		"Ivorian": {
			"black": 16,
			"middle eastern": 1,
			"mixed race": 2,
			"white": 1
		},
		"Jamaican": {"black": 11, "indo-aryan": 1, "mixed race": 2},
		"Japanese": {
			"asian": 71,
			"latina": 1,
			"mixed race": 1,
			"pacific islander": 1,
			"white": 1
		},
		"Jordanian": {
			"indo-aryan": 1,
			"middle eastern": 15,
			"mixed race": 3,
			"semitic": 3
		},
		"Kazakh": {
			"asian": 2,
			"indo-aryan": 6,
			"mixed race": 1,
			"semitic": 1,
			"white": 2
		},
		"Kenyan": {
			"black": 16,
			"indo-aryan": 1,
			"middle eastern": 1,
			"mixed race": 1,
			"white": 1
		},
		"Kittitian": {
			"black": 18,
			"indo-aryan": 1,
			"mixed race": 2,
			"white": 1
		},
		"Korean": {"asian": 28, "indo-aryan": 1, "mixed race": 1},
		"Kosovan": {
			"indo-aryan": 2,
			"middle eastern": 1,
			"mixed race": 2,
			"white": 20
		},
		"Kurdish": {
			"indo-aryan": 10,
			"middle eastern": 1,
			"mixed race": 1,
			"semitic": 2
		},
		"Kuwaiti": {
			"black": 1,
			"indo-aryan": 5,
			"middle eastern": 12,
			"mixed race": 2
		},
		"Kyrgyz": {
			"asian": 5,
			"indo-aryan": 9,
			"mixed race": 2,
			"white": 4
		},
		"Laotian": {"asian": 38, "malay": 1, "mixed race": 1},
		"Latvian": {
			"indo-aryan": 1,
			"mixed race": 2,
			"semitic": 1,
			"white": 51
		},
		"Lebanese": {
			"indo-aryan": 1,
			"middle eastern": 9,
			"mixed race": 2,
			"semitic": 2
		},
		"Liberian": {"black": 11, "middle eastern": 1, "mixed race": 2},
		"Libyan": {"black": 1, "middle eastern": 58, "mixed race": 1},
		"a Liechtensteiner": {
			"indo-aryan": 2,
			"middle eastern": 1,
			"mixed race": 1,
			"southern european": 1,
			"white": 20
		},
		"Lithuanian": {
			"indo-aryan": 1,
			"mixed race": 2,
			"semitic": 1,
			"white": 56
		},
		"Luxembourgian": {"mixed race": 1, "southern european": 3, "white": 7},
		"Macedonian": {"indo-aryan": 2, "mixed race": 1, "white": 16},
		"Malagasy": {
			"asian": 1,
			"black": 10,
			"indo-aryan": 4,
			"mixed race": 2,
			"white": 1
		},
		"Malawian": {"black": 18, "indo-aryan": 1, "mixed race": 1},
		"Malaysian": {
			"asian": 2,
			"indo-aryan": 1,
			"malay": 7,
			"mixed race": 1
		},
		"Maldivian": {"indo-aryan": 14, "middle eastern": 1, "mixed race": 1},
		"Malian": {"black": 12, "middle eastern": 2, "mixed race": 1},
		"Maltese": {
			"middle eastern": 1,
			"mixed race": 1,
			"semitic": 1,
			"southern european": 20,
			"white": 5
		},
		"Marshallese": {"asian": 1, "mixed race": 1, "pacific islander": 10},
		"Mauritanian": {"black": 8, "middle eastern": 5, "mixed race": 1},
		"Mauritian": {
			"asian": 1,
			"black": 4,
			"indo-aryan": 8,
			"mixed race": 3,
			"white": 1
		},
		"Mexican": {
			"amerindian": 2,
			"asian": 1,
			"black": 2,
			"latina": 10,
			"middle eastern": 1,
			"mixed race": 2,
			"white": 5
		},
		"Micronesian": {
			"asian": 1,
			"mixed race": 1,
			"pacific islander": 22,
			"white": 1
		},
		"Moldovan": {
			"indo-aryan": 1,
			"mixed race": 1,
			"semitic": 1,
			"white": 15
		},
		"Monégasque": {
			"middle eastern": 1,
			"mixed race": 1,
			"southern european": 14,
			"white": 14
		},
		"Mongolian": {"asian": 21, "indo-aryan": 2, "mixed race": 2},
		"Montenegrin": {"indo-aryan": 1, "mixed race": 1, "white": 14},
		"Moroccan": {
			"asian": 1,
			"black": 3,
			"middle eastern": 30,
			"mixed race": 2,
			"southern european": 1
		},
		"Mosotho": {"black": 68, "mixed race": 1, "white": 1},
		"Motswana": {"black": 38, "mixed race": 1, "white": 1},
		"Mozambican": {
			"black": 41,
			"indo-aryan": 1,
			"mixed race": 2,
			"southern european": 1
		},
		"Namibian": {"black": 21, "mixed race": 2, "white": 2},
		"Nauruan": {"asian": 1, "mixed race": 1, "pacific islander": 42},
		"Nepalese": {"asian": 8, "indo-aryan": 3, "mixed race": 1},
		"New Caledonian": {
			"asian": 1,
			"malay": 1,
			"mixed race": 1,
			"pacific islander": 6,
			"white": 3
		},
		"a New Zealander": {
			"asian": 3,
			"mixed race": 1,
			"pacific islander": 5,
			"white": 17
		},
		"Ni-Vanuatu": {"mixed race": 1, "pacific islander": 48, "white": 1},
		"Nicaraguan": {
			"amerindian": 1,
			"black": 3,
			"latina": 10,
			"mixed race": 1,
			"white": 6
		},
		"Nigerian": {
			"black": 36,
			"middle eastern": 1,
			"mixed race": 2,
			"white": 1
		},
		"Nigerien": {"black": 18, "middle eastern": 1, "mixed race": 1},
		"Niuean": {
			"asian": 3,
			"pacific islander": 20,
			"mixed race": 5,
			"white": 3
		},
		"Norwegian": {
			"black": 1,
			"indo-aryan": 1,
			"mixed race": 1,
			"white": 27
		},
		"Omani": {
			"black": 3,
			"indo-aryan": 9,
			"malay": 2,
			"middle eastern": 9,
			"mixed race": 2
		},
		"Pakistani": {"indo-aryan": 28, "mixed race": 2, "semitic": 2},
		"Palauan": {"asian": 7, "mixed race": 1, "pacific islander": 25},
		"Palestinian": {
			"indo-aryan": 1,
			"middle eastern": 9,
			"mixed race": 1,
			"semitic": 2
		},
		"Panamanian": {
			"amerindian": 3,
			"asian": 1,
			"black": 2,
			"latina": 12,
			"mixed race": 2,
			"white": 3
		},
		"Papua New Guinean": {"malay": 6, "mixed race": 1, "pacific islander": 3},
		"Paraguayan": {
			"asian": 1,
			"black": 1,
			"latina": 15,
			"mixed race": 2,
			"white": 5
		},
		"Peruvian": {
			"amerindian": 12,
			"asian": 1,
			"latina": 9,
			"mixed race": 4,
			"southern european": 2
		},
		"Polish": {
			"asian": 1,
			"mixed race": 1,
			"southern european": 1,
			"white": 52
		},
		"Portuguese": {
			"black": 1,
			"indo-aryan": 1,
			"latina": 1,
			"mixed race": 2,
			"southern european": 11,
			"white": 2
		},
		"Puerto Rican": {
			"amerindian": 1,
			"asian": 1,
			"black": 2,
			"latina": 20,
			"mixed race": 2,
			"white": 12
		},
		"Qatari": {
			"asian": 2,
			"indo-aryan": 7,
			"middle eastern": 10,
			"mixed race": 1
		},
		"Romanian": {
			"indo-aryan": 3,
			"mixed race": 1,
			"semitic": 2,
			"white": 20
		},
		"Russian": {
			"amerindian": 1,
			"asian": 2,
			"indo-aryan": 5,
			"mixed race": 2,
			"semitic": 2,
			"southern european": 2,
			"white": 50
		},
		"Rwandan": {"black": 48, "mixed race": 1, "white": 1},
		"Sahrawi": {"black": 5, "middle eastern": 7, "mixed race": 2},
		"Saint Lucian": {"black": 11, "indo-aryan": 1, "mixed race": 3},
		"Salvadoran": {"latina": 9, "mixed race": 1, "white": 2},
		"Sammarinese": {"mixed race": 1, "southern european": 10, "white": 1},
		"Samoan": {"mixed race": 2, "pacific islander": 49, "white": 1},
		"São Toméan": {
			"asian": 1,
			"black": 6,
			"mixed race": 6,
			"southern european": 1
		},
		"Saudi": {
			"asian": 2,
			"black": 2,
			"indo-aryan": 2,
			"middle eastern": 20,
			"mixed race": 1
		},
		"Scottish": {
			"asian": 1,
			"black": 1,
			"indo-aryan": 2,
			"middle eastern": 1,
			"mixed race": 2,
			"southern european": 1,
			"white": 52
		},
		"Senegalese": {
			"asian": 1,
			"black": 42,
			"middle eastern": 2,
			"mixed race": 3,
			"white": 2
		},
		"Serbian": {"indo-aryan": 1, "mixed race": 1, "white": 10},
		"Seychellois": {
			"asian": 1,
			"black": 4,
			"indo-aryan": 1,
			"mixed race": 9,
			"southern european": 1,
			"white": 3
		},
		"Sierra Leonean": {"black": 15, "middle eastern": 1, "mixed race": 2},
		"Singaporean": {
			"asian": 16,
			"indo-aryan": 4,
			"malay": 6,
			"mixed race": 1
		},
		"Slovak": {"indo-aryan": 2, "mixed race": 1, "white": 22},
		"Slovene": {
			"indo-aryan": 1,
			"mixed race": 1,
			"southern european": 1,
			"white": 22
		},
		"a Solomon Islander": {
			"asian": 1,
			"mixed race": 1,
			"pacific islander": 22,
			"white": 1
		},
		"Somali": {
			"black": 56,
			"indo-aryan": 1,
			"middle eastern": 2,
			"mixed race": 1
		},
		"South African": {
			"asian": 1,
			"black": 22,
			"indo-aryan": 1,
			"malay": 1,
			"mixed race": 5,
			"semitic": 1,
			"southern european": 1,
			"white": 5
		},
		"South Sudanese": {"black": 16, "middle eastern": 3, "mixed race": 1},
		"Spanish": {
			"asian": 1,
			"indo-aryan": 1,
			"latina": 1,
			"middle eastern": 1,
			"mixed race": 2,
			"semitic": 1,
			"southern european": 15,
			"white": 3
		},
		"Sri Lankan": {
			"indo-aryan": 34,
			"malay": 1,
			"middle eastern": 1,
			"mixed race": 2,
			"southern european": 1,
			"white": 1
		},
		"Sudanese": {"black": 3, "middle eastern": 16, "mixed race": 1},
		"Surinamese": {
			"amerindian": 1,
			"black": 7,
			"indo-aryan": 7,
			"malay": 4,
			"mixed race": 3
		},
		"Swazi": {
			"black": 32,
			"indo-aryan": 1,
			"mixed race": 1,
			"white": 1
		},
		"Swedish": {
			"black": 1,
			"indo-aryan": 2,
			"middle eastern": 2,
			"mixed race": 1,
			"white": 18
		},
		"Swiss": {
			"indo-aryan": 1,
			"mixed race": 1,
			"southern european": 2,
			"white": 10
		},
		"Syrian": {
			"indo-aryan": 2,
			"middle eastern": 8,
			"mixed race": 1,
			"semitic": 2
		},
		"Taiwanese": {"asian": 18, "malay": 1, "mixed race": 1},
		"Tajik": {
			"asian": 2,
			"indo-aryan": 11,
			"mixed race": 1,
			"white": 1
		},
		"Tanzanian": {
			"black": 46,
			"middle eastern": 2,
			"mixed race": 1,
			"semitic": 1
		},
		"Thai": {
			"asian": 25,
			"indo-aryan": 1,
			"malay": 4,
			"mixed race": 1,
			"white": 1
		},
		"Tibetan": {"asian": 14, "indo-aryan": 1, "mixed race": 1},
		"Togolese": {
			"black": 27,
			"middle eastern": 1,
			"mixed race": 1,
			"white": 1
		},
		"Tongan": {
			"asian": 1,
			"mixed race": 1,
			"pacific islander": 47,
			"white": 1
		},
		"Trinidadian": {
			"black": 3,
			"indo-aryan": 3,
			"mixed race": 2,
			"white": 1
		},
		"Tunisian": {"middle eastern": 33, "mixed race": 1, "southern european": 1},
		"Turkish": {
			"indo-aryan": 33,
			"middle eastern": 2,
			"mixed race": 1,
			"semitic": 2,
			"southern european": 1,
			"white": 1
		},
		"Turkmen": {
			"asian": 2,
			"indo-aryan": 11,
			"mixed race": 1,
			"semitic": 1,
			"white": 3
		},
		"Tuvaluan": {"mixed race": 1, "pacific islander": 48, "white": 1},
		"Ugandan": {"black": 19, "indo-aryan": 1, "mixed race": 2},
		"Ukrainian": {
			"indo-aryan": 1,
			"mixed race": 1,
			"semitic": 1,
			"white": 25
		},
		"Uruguayan": {
			"amerindian": 1,
			"black": 2,
			"latina": 12,
			"mixed race": 1,
			"southern european": 2,
			"white": 1
		},
		"Uzbek": {
			"asian": 3,
			"indo-aryan": 9,
			"mixed race": 1,
			"semitic": 2,
			"white": 3
		},
		"Vatican": {
			"latina": 2,
			"mixed race": 1,
			"southern european": 5,
			"white": 5
		},
		"Venezuelan": {
			"amerindian": 1,
			"black": 1,
			"latina": 15,
			"mixed race": 5,
			"white": 3
		},
		"Vietnamese": {"asian": 10, "malay": 1, "mixed race": 1},
		"Vincentian": {
			"black": 12,
			"indo-aryan": 2,
			"mixed race": 5,
			"white": 1
		},
		"Yemeni": {
			"black": 2,
			"indo-aryan": 1,
			"middle eastern": 8,
			"mixed race": 1,
			"semitic": 2
		},
		"Zairian": {"black": 23, "mixed race": 1, "white": 1},
		"Zambian": {
			"black": 38,
			"indo-aryan": 1,
			"mixed race": 2,
			"white": 1
		},
		"Zimbabwean": {"black": 28, "mixed race": 1, "white": 1},
		"": {"mixed race": 1, "white": 9} /* default mix */
	},

	servantMilkersJobs: [Job.HOUSE, Job.SUBORDINATE, Job.FUCKTOY, Job.RECRUITER, Job.REST, Job.CONFINEMENT, Job.CLASSES, Job.QUARTER],

	// only these specific "development" facility leaders will do anything to satisfy their employees' sexual needs.
	// "production" facilities need their employees to stay horny to be more effective workers.
	sexFromDevelopmentLeaders: [Job.NURSE, Job.ATTENDANT, Job.MATRON, Job.WARDEN, Job.TEACHER],

	pettyCriminalPool: ["armed robbery", "arson", "assault", "battery", "blackmail", "burglary", "cat burglar", "child abuse", "child molestation", "domestic abuse", "illegal immigrant", "manslaughter", "mule", "murder", "petty theft", "pickpocketing", "rape", "robbery", "tax evasion", "theft"],

	gangCriminalPool: ["arms smuggler", "assassin", "attempted murder", "drug peddler", "drug smuggler", "fence", "gang assaulter", "gang bruiser", "gang murderer", "gang thief", "hitman", "manslaughter", "mule", "murder", "smuggler"],

	whiteCollarCriminalPool: ["abuse of power", "blackmail", "bribery", "confidence", "embezzlement", "fraud", "malpractice", "racketeering", "tax evasion", "records tampering"],

	militaryCriminalPool: ["deserter", "gunner", "officer", "private", "sniper", "soldier", "specOps", "spy", "terrorist", "war criminal"],

	juvenileCriminalPool: ["assault", "curfew", "manslaughter", "mule", "pickpocketing", "prostitution", "robbery", "smuggling", "theft", "truancy"],

	fakeBellies: ["a huge empathy belly", "a large empathy belly", "a medium empathy belly", "a small empathy belly"],
	/* lets fake bellies be separated from other .bellyAccessory */

	paraphiliaList: ["abusive", "anal addict", "attention whore", "breast growth", "breeder", "cum addict", "malicious", "neglectful", "self hating"],

	baseNationalities: ["Afghan", "Albanian", "Algerian", "American", "Andorran", "Angolan", "Antiguan", "Argentinian", "Armenian", "Aruban", "Australian", "Austrian", "Azerbaijani", "Bahamian", "Bahraini", "Bangladeshi", "Barbadian", "Belarusian", "Belgian", "Belizean", "Beninese", "Bermudian", "Bhutanese", "Bissau-Guinean", "Bolivian", "Bosnian", "Brazilian", "British", "Bruneian", "Bulgarian", "Burkinabé", "Burmese", "Burundian", "Cambodian", "Cameroonian", "Canadian", "Cape Verdean", "Catalan", "Central African", "Chadian", "Chilean", "Chinese", "Colombian", "Comorian", "Congolese", "a Cook Islander", "Costa Rican", "Croatian", "Cuban", "Curaçaoan", "Cypriot", "Czech", "Danish", "Djiboutian", "Dominican", "Dominiquais", "Dutch", "East Timorese", "Ecuadorian", "Egyptian", "Emirati", "Equatoguinean", "Eritrean", "Estonian", "Ethiopian", "Fijian", "Filipina", "Finnish", "French", "French Guianan", "French Polynesian", "Gabonese", "Gambian", "Georgian", "German", "Ghanan", "Greek", "Greenlandic", "Grenadian", "Guamanian", "Guatemalan", "Guinean", "Guyanese", "Haitian", "Honduran", "Hungarian", "I-Kiribati", "Icelandic", "Indian", "Indonesian", "Iranian", "Iraqi", "Irish", "Israeli", "Italian", "Ivorian", "Jamaican", "Japanese", "Jordanian", "Kazakh", "Kenyan", "Kittitian", "Korean", "Kosovan", "Kurdish", "Kuwaiti", "Kyrgyz", "Laotian", "Latvian", "Lebanese", "Liberian", "Libyan", "a Liechtensteiner", "Lithuanian", "Luxembourgian", "Macedonian", "Malagasy", "Malawian", "Malaysian", "Maldivian", "Malian", "Maltese", "Marshallese", "Mauritanian", "Mauritian", "Mexican", "Micronesian", "Moldovan", "Monégasque", "Mongolian", "Montenegrin", "Moroccan", "Mosotho", "Motswana", "Mozambican", "Namibian", "Nauruan", "Nepalese", "New Caledonian", "a New Zealander", "Ni-Vanuatu", "Nicaraguan", "Nigerian", "Nigerien", "Niuean", "Norwegian", "Omani", "Pakistani", "Palauan", "Palestinian", "Panamanian", "Papua New Guinean", "Paraguayan", "Peruvian", "Polish", "Portuguese", "Puerto Rican", "Qatari", "Romanian", "Russian", "Rwandan", "Sahrawi", "Saint Lucian", "Salvadoran", "Sammarinese", "Samoan", "São Toméan", "Saudi", "Scottish", "Senegalese", "Serbian", "Seychellois", "Sierra Leonean", "Singaporean", "Slovak", "Slovene", "a Solomon Islander", "Somali", "South African", "South Sudanese", "Spanish", "Sri Lankan", "Sudanese", "Surinamese", "Swazi", "Swedish", "Swiss", "Syrian", "Taiwanese", "Tajik", "Tanzanian", "Thai", "Tibetan", "Togolese", "Tongan", "Trinidadian", "Tunisian", "Turkish", "Turkmen", "Tuvaluan", "Ugandan", "Ukrainian", "Uruguayan", "Uzbek", "Vatican", "Venezuelan", "Vietnamese", "Vincentian", "Yemeni", "Zairian", "Zambian", "Zimbabwean"],

	royalNationalities: ["Bahraini", "Belgian", "Bhutanese", "British", "Bruneian", "Cambodian", "Danish", "Dutch", "Emirati", "Japanese", "Jordanian", "Kuwaiti", "Luxembourgian", "Malaysian", "Monégasque", "Moroccan", "Mosotho", "Norwegian", "Omani", "Qatari", "Saudi", "Spanish", "Swazi", "Swedish", "Thai", "Tongan"],

	nationalitiesByRace: {
		"amerindian": {
			"Bolivian": 1,
			"Greenlandic": 1,
			"Guatemalan": 1,
			"Peruvian": 1
		},

		"asian": {
			"Bhutanese": 1,
			"Burmese": 1,
			"Cambodian": 1,
			"Chinese": 1,
			"Japanese": 1,
			"Korean": 1,
			"Laotian": 1,
			"Mongolian": 1,
			"Nepalese": 1,
			"Singaporean": 1,
			"Taiwanese": 1,
			"Thai": 1,
			"Tibetan": 1,
			"Vietnamese": 1
		},

		"black": {
			"American": 1,
			"Angolan": 1,
			"Antiguan": 1,
			"Bahamian": 1,
			"Barbadian": 1,
			"Beninese": 1,
			"Bermudian": 1,
			"Bissau-Guinean": 1,
			"Burkinabé": 1,
			"Burundian": 1,
			"Cameroonian": 1,
			"Central African": 1,
			"Chadian": 1,
			"Comorian": 1,
			"Congolese": 1,
			"Curaçaoan": 1,
			"Djiboutian": 1,
			"Dominiquais": 1,
			"Equatoguinean": 1,
			"Eritrean": 1,
			"Ethiopian": 1,
			"Gabonese": 1,
			"Gambian": 1,
			"Ghanan": 1,
			"Grenadian": 1,
			"Guinean": 1,
			"Guyanese": 1,
			"Haitian": 1,
			"Ivorian": 1,
			"Jamaican": 1,
			"Kenyan": 1,
			"Kittitian": 1,
			"Liberian": 1,
			"Malagasy": 1,
			"Malawian": 1,
			"Malian": 1,
			"Mauritanian": 1,
			"Mosotho": 1,
			"Motswana": 1,
			"Mozambican": 1,
			"Namibian": 1,
			"Nigerian": 1,
			"Nigerien": 1,
			"Rwandan": 1,
			"Saint Lucian": 1,
			"São Toméan": 1,
			"Senegalese": 1,
			"Sierra Leonean": 1,
			"Somali": 1,
			"South African": 1,
			"South Sudanese": 1,
			"Surinamese": 1,
			"Swazi": 1,
			"Tanzanian": 1,
			"Togolese": 1,
			"Trinidadian": 1,
			"Ugandan": 1,
			"Vincentian": 1,
			"Zairian": 1,
			"Zambian": 1,
			"Zimbabwean": 1
		},

		"indo-aryan": {
			"Afghan": 1,
			"Azerbaijani": 1,
			"Bahraini": 1,
			"Bangladeshi": 1,
			"Burmese": 1,
			"Emirati": 1,
			"Georgian": 1,
			"Guyanese": 1,
			"Indian": 1,
			"Iranian": 1,
			"Kazakh": 1,
			"Kurdish": 1,
			"Kyrgyz": 1,
			"Maldivian": 1,
			"Mauritian": 1,
			"Omani": 1,
			"Pakistani": 1,
			"Sri Lankan": 1,
			"Surinamese": 1,
			"Tajik": 1,
			"Trinidadian": 1,
			"Turkish": 1,
			"Turkmen": 1,
			"Uzbek": 1
		},

		"latina": {
			"American": 1,
			"Argentinian": 1,
			"Belizean": 1,
			"Bolivian": 1,
			"Brazilian": 1,
			"Chilean": 1,
			"Colombian": 1,
			"Costa Rican": 1,
			"Cuban": 1,
			"Dominican": 1,
			"Ecuadorian": 1,
			"Guatemalan": 1,
			"Honduran": 1,
			"Mexican": 1,
			"Nicaraguan": 1,
			"Panamanian": 1,
			"Paraguayan": 1,
			"Peruvian": 1,
			"Puerto Rican": 1,
			"Salvadoran": 1,
			"Uruguayan": 1,
			"Venezuelan": 1
		},

		"malay": {
			"Bruneian": 1,
			"East Timorese": 1,
			"Filipina": 1,
			"Indonesian": 1,
			"Malaysian": 1,
			"Papua New Guinean": 1
		},

		"middle eastern": {
			"Algerian": 1,
			"Bahraini": 1,
			"Egyptian": 1,
			"Iraqi": 1,
			"Jordanian": 1,
			"Kuwaiti": 1,
			"Lebanese": 1,
			"Libyan": 1,
			"Moroccan": 1,
			"Omani": 1,
			"Palestinian": 1,
			"Qatari": 1,
			"Sahrawi": 1,
			"Saudi": 1,
			"Sudanese": 1,
			"Syrian": 1,
			"Tunisian": 1,
			"Yemeni": 1
		},

		"mixed race": {
			"Aruban": 1,
			"Cape Verdean": 1,
			"French Guianan": 1,
			"São Toméan": 1,
			"Seychellois": 1
		},

		"pacific islander": {
			"a Cook Islander": 1,
			"Fijian": 1,
			"French Polynesian": 1,
			"Guamanian": 1,
			"I-Kiribati": 1,
			"Marshallese": 1,
			"Micronesian": 1,
			"Nauruan": 1,
			"New Caledonian": 1,
			"Ni-Vanuatu": 1,
			"Niuean": 1,
			"Palauan": 1,
			"Samoan": 1,
			"a Solomon Islander": 1,
			"Tongan": 1,
			"Tuvaluan": 1
		},

		"semitic": {"Armenian": 1, "Georgian": 1, "Israeli": 1},

		"southern european": {
			"Andorran": 1,
			"Catalan": 1,
			"Cypriot": 1,
			"Greek": 1,
			"Italian": 1,
			"Maltese": 1,
			"Monégasque": 1,
			"Portuguese": 1,
			"Sammarinese": 1,
			"Spanish": 1,
			"Vatican": 1
		},

		"white": {
			"Albanian": 1,
			"American": 1,
			"Austrian": 1,
			"Belarusian": 1,
			"Belgian": 1,
			"Bosnian": 1,
			"Brazilian": 1,
			"British": 1,
			"Bulgarian": 1,
			"Canadian": 1,
			"Croatian": 1,
			"Czech": 1,
			"Danish": 1,
			"Dutch": 1,
			"Estonian": 1,
			"Finnish": 1,
			"French": 1,
			"German": 1,
			"Hungarian": 1,
			"Icelandic": 1,
			"Irish": 1,
			"Kosovan": 1,
			"Latvian": 1,
			"a Liechtensteiner": 1,
			"Lithuanian": 1,
			"Luxembourgian": 1,
			"Macedonian": 1,
			"Moldovan": 1,
			"Monégasque": 1,
			"Montenegrin": 1,
			"a New Zealander": 1,
			"Norwegian": 1,
			"Polish": 1,
			"Romanian": 1,
			"Russian": 1,
			"Scottish": 1,
			"Serbian": 1,
			"Slovak": 1,
			"Slovene": 1,
			"Swedish": 1,
			"Swiss": 1,
			"Ukrainian": 1,
			"Vatican": 1
		},
	},

	redheadColors: ["auburn", "blazing red", "copper", "chestnut", "deep red", "ginger", "red", "strawberry-blonde"],

	badWords: ["anus", "ass", "bitch", "boob", "butt", "cock", "crap", "cum", "cunny", "cunt", "dick", "fuck", "jizz", "junk", "piss", "prick", "pussy", "shit", "slave", "slut", "tit", "trash", "whore"],

	badNames: ["Ass Kisser", "Ass Licker", "Ass", "Assfucker", "Asshole", "Ballsack", "Bastard", "Beta", "Bitch", "Cock", "Cocksucker", "Coward", "Creep", "Cum Rag", "Cunt", "Degenerate", "Despoiler", "Dick", "Dickhead", "Dicksucker", "Dickweed", "Dipshit", "Douchebag", "Dumbass", "DumbFuck", "Dunderfuck", "Dyke", "Faggot", "Fucker", "Fuckface", "Fuckhead", "Fucko", "Fucktard", "Fuckwit", "Idiot", "Inbred", "Jackass", "Jerk", "Jizz Stain", "Loser", "Moron", "Motherfucker", "Nutsack", "Pissbaby", "Prick", "Pussy", "Rapist", "Ratfuck", "Retard", "Ruiner", "Schmuck", "Scumbag", "Shitbird", "Shithead", "Slave", "Slaver", "Sleazeball", "Slut", "Sodomite", "Thundercunt", "Traitor", "Trash", "Whore", "Wimp"],

	facilityCareers: [Job.ARCADE, Job.CELLBLOCK, Job.ATTENDANT, Job.DJ, Job.FARMER, Job.MADAM, Job.MATRON, Job.MILKMAID, Job.NURSE, Job.TEACHER, Job.STEWARD, Job.WARDEN, Job.CONCUBINE, Job.CLINIC, Job.SCHOOL, Job.HEADGIRLSUITE, Job.SPA, Job.CLUB, Job.MASTERSUITE, Job.FARMYARD, Job.NURSERY, Job.QUARTER, Job.BROTHEL, Job.DAIRY],

	facilityHeads: [Job.ATTENDANT, Job.DJ, Job.FARMER, Job.MADAM, Job.MATRON, Job.MILKMAID, Job.NURSE, Job.TEACHER, Job.STEWARD, Job.WARDEN, Job.CONCUBINE],

	healthRecoveringAssignments: [Job.REST, Job.CLINIC],
	whoringAssignments: [Job.WHORE, Job.BROTHEL, Job.PUBLIC, Job.CLUB],

	secExCombatPrestige: ["$He is well known for being a great commander.", "$He is famous for being an incredible commander.", "$He is known as a legendary commander all over the world."],

	bioreactorFluids: {
		XX: {
			femCum: 2,
			milk: 800
		},
		XY: {
			cum: 100,
			milk: 600
		},
		herm: {
			cum: 100,
			femCum: 2,
			milk: 600
		},
		barren: {
			milk: 700
		}
	}
};

/** @type {Map<FC.SlaveSchoolName, FC.SlaveSchool>} */
App.Data.misc.schools = new Map([
	// Medical feel
	["GRI", {
		title: "Growth Research Institute",
		nickname: "institute",
		branchName: "subsidiary lab",
		slaveNoun: "test subjects",
		get requirements() { return (V.seeDicks !== 100); }
	}],

	// Cowgirls
	["TCR", {
		title: "The Cattle Ranch",
		nickname: "farm",
		branchName: "local pasture",
		slaveNoun: "stock",
		get requirements() { return (V.seeDicks !== 100); }
	}],

	// Futa
	["TFS", {
		title: "The Futanari Sisters",
		nickname: "community",
		branchName: "community",
		slaveNoun: "graduates",
		get requirements() { return (V.seeDicks !== 0); }
	}],

	// Standard
	["HA", {
		title: "The Hippolyta Academy",
		nickname: "school",
		branchName: "branch campus",
		slaveNoun: "graduates",
		get requirements() { return (V.seeDicks !== 100); }
	}],
	["NUL", {
		title: "Nueva Universidad de Libertad",
		nickname: "school",
		branchName: "branch campus",
		slaveNoun: "graduates",
		requirements: true
	}],
	["SCP", {
		title: "St. Claver Preparatory",
		nickname: "school",
		branchName: "branch campus",
		slaveNoun: "graduates",
		get requirements() { return (V.seeDicks !== 100); }
	}],
	["TGA", {
		title: "The Gymnasium-Academy",
		nickname: "school",
		branchName: "branch campus",
		slaveNoun: "graduates",
		get requirements() { return (V.seeDicks !== 0); }
	}],
	["TSS", {
		title: "The Slavegirl School",
		nickname: "school",
		branchName: "branch campus",
		slaveNoun: "graduates",
		get requirements() { return (V.seeDicks !== 100); }
	}],
	["LDE", {
		title: "L'École des Enculées",
		nickname: "school",
		branchName: "branch campus",
		slaveNoun: "graduates",
		get requirements() { return (V.seeDicks !== 0); }
	}],
	["TUO", {
		title: "The Utopian Orphanage",
		nickname: "school",
		branchName: "branch campus",
		slaveNoun: "graduates",
		get requirements() { return (V.seeDicks !== 100); }
	}],
]);

/* Nationalities based on V.continent value. Note that V.continent can be undefined! */
App.Data.misc.nationalityPoolSelector = {
	"North America": App.Data.misc.northAmericaNationalities,
	"South America": App.Data.misc.southAmericaNationalities,
	"Eastern Europe": App.Data.misc.europeNationalities,
	"Central Europe": App.Data.misc.europeNationalities,
	"Western Europe": App.Data.misc.europeNationalities,
	"Southern Europe": App.Data.misc.europeNationalities,
	"Scandinavia": App.Data.misc.europeNationalities,
	"Asia": App.Data.misc.asiaNationalities,
	"the Middle East": App.Data.misc.middleEastNationalities,
	"Africa": App.Data.misc.africaNationalities,
	"Australia": App.Data.misc.australiaNationalities,
	"Japan": App.Data.misc.asiaNationalities,
	"Brazil": App.Data.misc.southAmericaNationalities
};

// these markets are exempt from law compliance
App.Data.misc.lawlessMarkets = [
	"generic",
	"special",
	"gangs and smugglers",
	"heap",
	"indentures",
	"low tier criminals",
	"military prison",
	"juvenile detention",
	"neighbor",
	"wetware",
	"white collar",
	...App.Data.misc.schools.keys()
];
