declare namespace FC {
	/**@deprecated */
	type SlaveStateOrZero = Zeroable<SlaveState>;
	/**@deprecated */
	type HumanStateOrZero = Zeroable<HumanState>;

	type DefaultGameStateVariables = typeof App.Data.defaultGameStateVariables;
	type ResetOnNGPVariables = typeof App.Data.resetOnNGPlus;

	interface Enunciation {
		title: string;
		say: string;
	}

	interface Rival {
		/**
		- 0: Init
		- 1: Not established
		- 2: Established
		- 3: Captured
		- 4: Killed / Accepted offer
		- 5: Enslaved
		 */
		state: number;
		duration: number;
		prosperity: number;
		power: number;
		race?: FC.Race;
		/**
		- 1: Female
		- 2: Male
		 */
		gender?: number;
		ID?: number;
		FS: {
			name: string;
			race?: FC.Race;
			adopted?: number;
		}
		/**
			- 0: Unknown / Gone
			- 1: Announced
			- 2: Rescued
			- 3: Given in. Currently unused, is checked but commented out within src/endWeek/saDevotion.js
			*/
		hostageState: number,
	}

	interface Peacekeepers {
		/**
		- 0: Gone
		- 1: Not established
		- 2: Established
		- 3: Independent
		 */
		state: number;
		generalName?: string;
		strength?: number;
		attitude?: number;
		undermining?: number;
		influenceAnnounced?: number;
		tastes?: string;
	}

	export type RecruiterTarget = "desperate whores" | "young migrants" | "recent divorcees" |
		"expectant mothers" | "dissolute sissies" | "reassignment candidates" | "other arcologies";

	interface DeprecatedGameVariables {
		/** @deprecated */
		surgeryType: string;

		relationLinks?: Record<number, {father: number, mother: number}>;

		spire: number;
		customPronouns?: Record<number, Data.Pronouns.Definition>;
	}

	export type HeadGirlTraining = "health" | "paraphilia" | "soften" | "flaw" | "obedience" |
		"entertain skill" | "oral skill" | "fuck skill" | "penetrative skill" | "anal skill" | "whore skill";

	export interface HeadGirlTrainee {
		ID: number;
		training: HeadGirlTraining;
	}

	export interface ReminderEntry {
		message: string | Node;
		week: number;
		category: string;
		slaveID?: number;
	}

	export interface TrinketData {
		name: string,
		id?: number | null
		extra?: string,
		napkinShape?: string
	}

	/**
	 * These variables shall not be in the game state and there is a hope they will be exterminated in the future
	 */
	interface TemporaryVariablesInTheGameState {
		gameover?: string;
		/** @deprecated */
		returnTo: string;

		slavesToImportMax?: number;

		activeArcologyIdx?: number;

		showAllEntries: {
			costsBudget: number;
			repBudget: number;
		};

		brothelSpots?: number;
		clubSpots?: number;
		dairySpots?: number;
		servantsQuartersSpots?: number;
		brothelSlavesGettingHelp?: number;
		clubSlavesGettingHelp?: number;

		arcadeDemandDegResult?: 1 | 2 | 3 | 4 | 5;

		FarmerDevotionThreshold?: number;
		FarmerDevotionBonus?: number;
		FarmerTrustThreshold?: number;
		FarmerTrustBonus?: number;
		FarmerHealthBonus?: number;

		milkmaidDevotionThreshold?: number;
		milkmaidDevotionBonus?: number;
		milkmaidTrustThreshold?: number;
		milkmaidTrustBonus?: number;
		milkmaidHealthBonus?: number;

		activeSlave: Zeroable<SlaveState>;
		readySlave: Zeroable<SlaveState>;
		newSlavePool: Array<FC.SlaveState>
		event?: InstanceType<typeof App.Events.BaseEvent>;
		AS: number;
		seed?: string;
		applyCareerBonus?: Bool;
		careerBonusNeeded?: number[];
		prostheticsConfig?: string;

		oldLimbs: any;

		heroSlaves: SlaveTemplate[];
		limitedCheatStart?: Bool
		lastCashTransaction?: number;
	}

	export interface GameVariables extends DefaultGameStateVariables, ResetOnNGPVariables,
		DeprecatedGameVariables, TemporaryVariablesInTheGameState {}
}
