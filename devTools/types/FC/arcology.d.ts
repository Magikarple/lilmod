declare namespace FC {
	/**
	 * This interface defines all (almost, see ArcologyStateFSPeculiarities below) the FS-related
	 * arcology properties.
	 * * `research`: FS provides -Research property [Bool], otherwise has to be set to `undefined`
	 * * `SMR`: FS provides SMR policy, [Bool], otherwise has to be set to `undefined`
	 * * `policy`: string union of boolean laws and other policies, otherwise has to be set to `undefined`
	 * * `choice`: string union of numeric laws and choices, that may have other values except `0` and `1`.
	 */
	interface FutureSocietyIdMap {
		FSSupremacist: {
			noun: "Racial Supremacism", adj: "Supremacist", deco: "Supremacist",
			research: undefined, SMR: true, policy: "LawME", choice: undefined
		};
		FSSubjugationist: {
			noun: "Racial Subjugationism", adj: "Subjugationist", deco: "Subjugationist",
			research: undefined, SMR: true, policy: "LawME", choice: undefined
		};
		FSGenderRadicalist: {
			noun: "Gender Radicalism", adj: "Gender Radicalist", deco: "Gender Radicalist",
			research: true, SMR: undefined, policy: "LawBeauty", choice: "LawFuta"
		};
		FSGenderFundamentalist: {
			noun: "Gender Fundamentalism", adj: "Gender Fundamentalist", deco: "Gender Fundamentalist",
			research: true, SMR: true, policy: "LawBimbo" | "LawBeauty", choice: undefined
		};
		FSDegradationist: {
			noun: "Degradationism", adj: "Degradationist", deco: "Degradationist",
			research: true, SMR: true, policy: "Law", choice: undefined
		};
		FSPaternalist: {
			noun: "Paternalism", adj: "Paternalist", deco: "Paternalist",
			research: true, SMR: true, policy: "Law", choice: undefined
		};
		FSBodyPurist: {
			noun: "Body Purism", adj: "Body Purist", deco: "Body Purist",
			research: true, SMR: true, policy: "Law" | "CatLaw", choice: undefined
		};
		FSTransformationFetishist: {
			noun: "Transformation Fetishism", adj: "Transformation Fetishist", deco: "Transformation Fetishist",
			research: true, SMR: true, policy: undefined, choice: undefined
		};
		FSYouthPreferentialist: {
			noun: "Youth Preferentialism", adj: "Youth Preferentialist", deco: "Youth Preferentialist",
			research: true, SMR: true, policy: "Law", choice: undefined
		};
		FSMaturityPreferentialist: {
			noun: "Maturity Preferentialism", adj: "Maturity Preferentialist", deco: "Maturity Preferentialist",
			research: true, SMR: true, policy: "Law", choice: undefined
		};
		FSSlimnessEnthusiast: {
			noun: "Slimness Enthusiasm", adj: "Slimness Enthusiast", deco: "Slimness Enthusiast",
			research: true, SMR: true, policy: "Law" | "FoodLaw", choice: undefined
		};
		FSAssetExpansionist: {
			noun: "Asset Expansionism", adj: "Asset Expansionist", deco: "Asset Expansionist",
			research: true, SMR: true, policy: undefined, choice: undefined
		};
		FSPastoralist: {
			noun: "Pastoralism", adj: "Pastoralist", deco: "Pastoralist",
			research: true, SMR: true, policy: "Law", choice: undefined
		};
		FSCummunism: {
			noun: "Cummunism", adj: "Cummunist", deco: undefined,
			research: true, SMR: undefined, policy: undefined, choice: undefined
		};
		FSPhysicalIdealist: {
			noun: "Physical Idealism", adj: "Physical Idealist", deco: "Physical Idealist",
			research: true, SMR: true, policy:	"Law" | "StrongFat", choice: undefined
		};
		FSHedonisticDecadence: {
			noun: "Decadent Hedonism", adj: "Decadent Hedonist", deco: "Hedonistic",
			research: "" | "Diet", SMR: true, policy: "Law" | "Law2", choice: "StrongFat"
		};
		FSChattelReligionist: {
			noun: "Chattel Religionism", adj: "Chattel Religionist", deco: "Chattel Religionist",
			research: undefined, SMR: true, policy: "Law" | "Law2", choice: undefined
		};
		FSNull: {
			noun: "Multiculturalism", adj: "Multiculturalist", deco: undefined,
			research: undefined, SMR: undefined, policy: undefined, choice: undefined
		};
		FSIncestFetishist: {
			noun: "Incest Fetishism", adj: "Incest Fetishist", deco: undefined,
			research: true, SMR: undefined, policy: undefined, choice: undefined
		};
		FSRomanRevivalist: {
			noun: "Roman Revivalism", adj: "Roman Revivalist", deco: "Roman Revivalist",
			research: undefined, SMR: true, policy: "Law", choice: undefined
		};
		FSNeoImperialist: {
			noun: "Neo-Imperialism", adj: "Neo-Imperialist", deco: "Neo-Imperialist",
			research: undefined, SMR: true, policy: "Law1" | "Law2", choice: undefined
		};
		FSEgyptianRevivalist: {
			noun: "Egyptian Revivalism", adj: "Egyptian Revivalist", deco: "Egyptian Revivalist",
			research: undefined, SMR: true, policy: "Law" | "IncestPolicy", choice: undefined
		};
		FSEdoRevivalist: {
			noun: "Edo Revivalism", adj: "Edo Revivalist", deco: "Edo Revivalist",
			research: undefined, SMR: true, policy: "Law", choice: undefined
		};
		FSArabianRevivalist: {
			noun: "Arabian Revivalism", adj: "Arabian Revivalist", deco: "Arabian Revivalist",
			research: undefined, SMR: true, policy: "Law", choice: undefined
		};
		FSChineseRevivalist: {
			noun: "Chinese Revivalism", adj: "Chinese Revivalist", deco: "Chinese Revivalist",
			research: undefined, SMR: true, policy: "Law", choice: undefined
		};
		FSAztecRevivalist: {
			noun: "Aztec Revivalism", adj: "Aztec Revivalist", deco: "Aztec Revivalist",
			research: undefined, SMR: true, policy: "Law", choice: undefined
		};
		FSAntebellumRevivalist: {
			noun: "Antebellum Revivalism", adj: "Antebellum Revivalist", deco: "Antebellum Revivalist",
			research: undefined, SMR: true, policy: "Law1" | "Law2", choice: undefined
		};
		FSRepopulationFocus: {
			noun: "Repopulation Focus", adj: "Repopulationist", deco: "Repopulationist",
			research: true, SMR: true, policy: "Law", choice: undefined
		};
		FSRestart: {
			noun: "Eugenics", adj: "Eugenics", deco: "Eugenics",
			research: true, SMR: true, policy: "Law", choice: undefined
		};
		FSIntellectualDependency: {
			noun: "Intellectual Dependency", adj: "Intellectual Dependency", deco: "Intellectual Dependency",
			research: true, SMR: true, policy: "Law" | "LawBeauty", choice: undefined
		};
		FSSlaveProfessionalism: {
			noun: "Slave Professionalism", adj: "Slave Professional", deco: "Slave Professionalism",
			research: true, SMR: true, policy: "Law", choice: undefined
		};
		FSPetiteAdmiration: {
			noun: "Petite Admiration", adj: "Petite Admiration", deco: "Petite Admiration",
			research: true, SMR: true, policy: "Law" | "Law2", choice: undefined
		};
		FSStatuesqueGlorification: {
			noun: "Statuesque Glorification", adj: "Statuesque Glorification", deco: "Statuesque Glorification",
			research: true, SMR: true, policy: "Law" | "Law2", choice: undefined
		}
	}

	type FutureSociety = keyof FutureSocietyIdMap;
	type FutureSocietyNoun = FutureSocietyIdMap[keyof FutureSocietyIdMap]["noun"];
	type FutureSocietyAdj = FutureSocietyIdMap[keyof FutureSocietyIdMap]["adj"];
	type FutureSocietyDeco = FutureSocietyIdMap[keyof FutureSocietyIdMap]["deco"] | "standard";

	type FutureSocietyWithResearchMap = {
		[K in keyof FutureSocietyIdMap]: FutureSocietyIdMap[K]["research"] extends true ? `${K}Research`
		: FutureSocietyIdMap[K]["research"] extends string ? `${K}${FutureSocietyIdMap[K]["research"]}Research`
		: never;
	}

	type FutureSocietyPolicy = {
		[K in keyof FutureSocietyIdMap]: FutureSocietyIdMap[K]["policy"] extends string ?
		`${K}${FutureSocietyIdMap[K]["policy"]}` : never;
	}

	type FutureSocietyChoice = {
		[K in keyof FutureSocietyIdMap]: FutureSocietyIdMap[K]["choice"] extends string ?
		`${K}${FutureSocietyIdMap[K]["choice"]}` : never;
	}

	type FutureSocietyHasResearchAny = FutureSocietyWithResearchMap[FutureSociety];
	type FutureSocietyPolicyAny = FutureSocietyPolicy[FutureSociety];
	type FutureSocietyChoiceAny = FutureSocietyChoice[FutureSociety];

	type FSDecoName<T extends FutureSociety> = FutureSocietyIdMap[T]["deco"] extends undefined ? never : `${T}Decoration`
	type FSSMRName<T extends FutureSociety> = FutureSocietyIdMap[T]["SMR"] extends undefined ? never : `${T}SMR`

	type FSPolicyValue = number | null;

	type FSName<T extends string> = T extends `FS${infer Name}` ? Name : never;

	// direction with respect to the player's arcology
	type ArcologyDirection = 0 /* player */ | "east" | "north" | "northeast" | "northwest" | "south" | "southeast" | "southwest" | "west";

	type ArcologyStateBase = {
		name: string;
		direction: ArcologyDirection;
		government: string;
		leaderID: number;
		honeymoon: number;
		prosperity: number;
		ownership: number;
		minority: number;
		PCminority: number;
		demandFactor: number;
		embargo: number;
		embargoTarget: -1|ArcologyDirection;
		influenceTarget: -1|ArcologyDirection;
		influenceBonus: number;
		CyberEconomic: number;
		CyberEconomicTarget: -1|ArcologyDirection;
		CyberReputation: number;
		CyberReputationTarget: -1|ArcologyDirection;
		rival: number;
		childhoodFertilityInducedNCSResearch: Bool;
		weeks: number;
	}

	type ArcologyStateFSPeculiarities = {
		FSSupremacistRace: Zeroable<Race>;
		FSSubjugationistRace: Zeroable<Race>;

		FSEgyptianRevivalistInterest: number;

		FSRepopulationFocusPregPolicy: number;
		FSRepopulationFocusMilfPolicy: number;
		FSRepopulationFocusInterest: number;

		FSEugenicsChastityPolicy: number;
		FSEugenicsSterilizationPolicy: number;
		FSEugenicsInterest: number;

		FSChattelReligionistCreed: number;
	}

	type ArcologyStateFS = ArcologyStateFSPeculiarities &
		Record<FutureSociety, FSPolicyValue> &
		Record<FutureSocietyHasResearchAny, Bool> &
		Record<FSDecoName<FutureSociety>, number> &
		Record<FSSMRName<FutureSociety>, Bool> &
		Record<FutureSocietyPolicyAny, number> &
		Record<FutureSocietyChoiceAny, number>;

	type ArcologyState = ArcologyStateBase & ArcologyStateFS;

	const enum RevivalSocietyFreezeValue {
		Antebellum,
		Arabian,
		Aztec,
		Chinese,
		Edo,
		Egyptian,
		NeoImperial,
		Roman,
	}
	interface RevivalSocietyFreeze extends Record<string, RevivalSocietyFreezeValue> {
		ANTEBELLUM: RevivalSocietyFreezeValue.Antebellum,
		ARABIAN: RevivalSocietyFreezeValue.Arabian,
		AZTEC: RevivalSocietyFreezeValue.Aztec,
		CHINESE: RevivalSocietyFreezeValue.Chinese,
		EDO: RevivalSocietyFreezeValue.Edo,
		EGYPTIAN: RevivalSocietyFreezeValue.Egyptian,
		NEO_IMPERIAL: RevivalSocietyFreezeValue.NeoImperial,
		ROMAN: RevivalSocietyFreezeValue.Roman,
	}

	const enum FSHumanDevelopmentVector {
		/** Positive for mature preference, negative for young */
		Age,
		/** Positive for statuesque preference, negative for petite */
		Height,
		/** Positive for decadence preference negative for physical idealist */
		Weight,
		/** Positive for transformation preference, negative for body purism */
		Modifications,
		/** Positive for expansionist preference, negative for slim */
		Assets,
		/** Positive for professionalism, negative for intellectual dependency */
		Intelligence,
		/** Positive for radicalism, negative for fundamentalism */
		Gender,
		/** Positive for repopulation, negative for eugenics */
		Breeding,
		/** Positive for paternalism, negative for degradationism */
		LifeQuality,
	}

	interface FSHumanDevelopmentVectorFreeze extends Record<string, FSHumanDevelopmentVector> {
		AGE: FSHumanDevelopmentVector.Age,
		HEIGHT: FSHumanDevelopmentVector.Height,
		WEIGHT: FSHumanDevelopmentVector.Weight,
		MODIFICATIONS: FSHumanDevelopmentVector.Modifications,
		ASSETS: FSHumanDevelopmentVector.Assets,
		INTELLIGENCE: FSHumanDevelopmentVector.Intelligence,
		GENDER: FSHumanDevelopmentVector.Gender,
		BREEDING: FSHumanDevelopmentVector.Breeding,
		LIFE_QUALITY: FSHumanDevelopmentVector.LifeQuality,
	}

	interface SlaveSocialEffect {
		/** FS */
		FS: FutureSocietyDeco | "";
		/** positive or negative value (a small integer, or a fraction between -1 and 1) */
		magnitude: number;
		/** for compact/list mode (plain text string) */
		shortDesc: string;
		/** for expanded mode (HTML string) */
		longDesc: string;
		/** true if the effect is only due to the facility she's assigned to */
		creditFacility?: boolean;
	}
}
