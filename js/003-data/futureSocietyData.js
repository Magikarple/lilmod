App.Data.FutureSociety = {
	/**
	 * Each future society contains a record here, along with a noun and adjective form for use in printed text, and the decoration string (normally also an adjective form).
	 * Most of the automatic mechanics for FS adoption, influence, facility decoration, etc, are handled directly from this data; flavor text is not.
	 * @type {Record<FC.FutureSociety, {noun: FC.FutureSocietyNoun, adj: FC.FutureSocietyAdj, deco: FC.FutureSocietyDeco, NPCOnly?: boolean, language?: string, nationality?: string}>} */
	records: ({
		FSSupremacist: {noun: "Racial Supremacism", adj: "Supremacist", deco: "Supremacist"},
		FSSubjugationist: {noun: "Racial Subjugationism", adj: "Subjugationist", deco: "Subjugationist"},
		FSGenderRadicalist: {noun: "Gender Radicalism", adj: "Gender Radicalist", deco: "Gender Radicalist"},
		FSGenderFundamentalist: {noun: "Gender Fundamentalism", adj: "Gender Fundamentalist", deco: "Gender Fundamentalist"},
		FSDegradationist: {noun: "Degradationism", adj: "Degradationist", deco: "Degradationist"},
		FSPaternalist: {noun: "Paternalism", adj: "Paternalist", deco: "Paternalist"},
		FSBodyPurist: {noun: "Body Purism", adj: "Body Purist", deco: "Body Purist"},
		FSTransformationFetishist: {noun: "Transformation Fetishism", adj: "Transformation Fetishist", deco: "Transformation Fetishist"},
		FSYouthPreferentialist: {noun: "Youth Preferentialism", adj: "Youth Preferentialist", deco: "Youth Preferentialist"},
		FSMaturityPreferentialist: {noun: "Maturity Preferentialism", adj: "Maturity Preferentialist", deco: "Maturity Preferentialist"},
		FSSlimnessEnthusiast: {noun: "Slimness Enthusiasm", adj: "Slimness Enthusiast", deco: "Slimness Enthusiast"},
		FSAssetExpansionist: {noun: "Asset Expansionism", adj: "Asset Expansionist", deco: "Asset Expansionist"},
		FSPastoralist: {noun: "Pastoralism", adj: "Pastoralist", deco: "Pastoralist"},
		FSCummunism: {
			noun: "Cummunism",
			adj: "Cummunist",
			deco: undefined,
			NPCOnly: true
		},
		FSPhysicalIdealist: {noun: "Physical Idealism", adj: "Physical Idealist", deco: "Physical Idealist"},
		FSHedonisticDecadence: {noun: "Decadent Hedonism", adj: "Decadent Hedonist", deco: "Hedonistic"},
		FSChattelReligionist: {noun: "Chattel Religionism", adj: "Chattel Religionist", deco: "Chattel Religionist"},
		FSNull: {noun: "Multiculturalism", adj: "Multiculturalist", deco: undefined},
		FSIncestFetishist: {
			noun: "Incest Fetishism",
			adj: "Incest Fetishist",
			deco: undefined,
			NPCOnly: true
		},
		FSRomanRevivalist: {
			noun:			"Roman Revivalism",
			adj:			"Roman Revivalist",
			deco:			"Roman Revivalist",
			nationality:	"Roman Revivalist",
			language:		"Latin",
		},
		FSNeoImperialist: {
			noun:			"Neo-Imperialism",
			adj:			"Neo-Imperialist",
			deco:			"Neo-Imperialist",
		},
		FSEgyptianRevivalist: {
			noun:			"Egyptian Revivalism",
			adj:			"Egyptian Revivalist",
			deco:			"Egyptian Revivalist",
			nationality:	"Ancient Egyptian Revivalist",
			language:		"Ancient Egyptian",
		},
		FSEdoRevivalist: {
			noun:			"Edo Revivalism",
			adj:			"Edo Revivalist",
			deco:			"Edo Revivalist",
			nationality:	"Edo Revivalist",
			language:		"Japanese",
		},
		FSArabianRevivalist: {
			noun:			"Arabian Revivalism",
			adj:			"Arabian Revivalist",
			deco:			"Arabian Revivalist",
			nationality:	"Arabian Revivalist",
			language:		"Arabic",
		},
		FSChineseRevivalist: {
			noun:			"Chinese Revivalism",
			adj:			"Chinese Revivalist",
			deco:			"Chinese Revivalist",
			nationality:	"Ancient Chinese Revivalist",
			language:		"Chinese",
		},
		FSAztecRevivalist: {
			noun:			"Aztec Revivalism",
			adj:			"Aztec Revivalist",
			deco:			"Aztec Revivalist",
			nationality:	"Aztec Revivalist",
			language:		"Nahuatl",
		},
		FSAntebellumRevivalist: {
			noun: 			"Antebellum Revivalism",
			adj: 			"Antebellum Revivalist",
			deco: 			"Antebellum Revivalist",
			nationality:	"Antebellum Revivalist",
			language:		"English",
		},
		FSRepopulationFocus: {noun: "Repopulation Focus", adj: "Repopulationist", deco: "Repopulationist"},
		FSRestart: {noun: "Eugenics", adj: "Eugenics", deco: "Eugenics"},
		FSIntellectualDependency: {noun: "Intellectual Dependency", adj: "Intellectual Dependency", deco: "Intellectual Dependency"},
		FSSlaveProfessionalism: {noun: "Slave Professionalism", adj: "Slave Professional", deco: "Slave Professionalism"},
		FSPetiteAdmiration: {noun: "Petite Admiration", adj: "Petite Admiration", deco: "Petite Admiration"},
		FSStatuesqueGlorification: {noun: "Statuesque Glorification", adj: "Statuesque Glorification", deco: "Statuesque Glorification"}
	}),

	/** Each subarray in this array contains a set of Future Societies which are to be considered mutually exclusive.
	 * They cannot be adopted at the same time by the same arcology, and if adopted by different arcologies,
	 * will automatically conflict and reduce diplomatic relations. */
	mutexGroups: (/** @returns {FC.FutureSociety[][]} */ function() {
		/* this tiny-but-hideous IIFE is the only way I can get typechecking to work properly here, without a JSDoc equivalent to TS "as const" to prevent literal type widening */
		return [
			["FSSupremacist"],
			["FSSubjugationist"],
			["FSGenderRadicalist", "FSGenderFundamentalist"],
			["FSDegradationist", "FSPaternalist"],
			["FSBodyPurist", "FSTransformationFetishist"],
			["FSYouthPreferentialist", "FSMaturityPreferentialist"],
			["FSSlimnessEnthusiast", "FSAssetExpansionist"],
			["FSPastoralist", "FSCummunism"],
			["FSPhysicalIdealist", "FSHedonisticDecadence"],
			["FSChattelReligionist", "FSNull"],
			["FSIncestFetishist"],
			["FSRomanRevivalist", "FSNeoImperialist", "FSEgyptianRevivalist", "FSEdoRevivalist", "FSArabianRevivalist", "FSChineseRevivalist", "FSAztecRevivalist", "FSAntebellumRevivalist"],
			["FSRepopulationFocus", "FSRestart"],
			["FSIntellectualDependency", "FSSlaveProfessionalism"],
			["FSPetiteAdmiration", "FSStatuesqueGlorification"]
		];
	})(),

	/** @type {FC.FutureSociety[]} */
	fsNames: [],

	/** @type {FC.FutureSociety[]} */
	playerFSNames: []
};

/* -- auto-populate derived lists from records -- */
App.Data.FutureSociety.fsNames = /** @type {FC.FutureSociety[]} */ (Object.keys(App.Data.FutureSociety.records));
App.Data.FutureSociety.playerFSNames = App.Data.FutureSociety.fsNames.filter(fs => !App.Data.FutureSociety.records[fs].NPCOnly);
