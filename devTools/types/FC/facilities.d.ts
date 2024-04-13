declare namespace FC {
	export type Upgrade = InstanceType<typeof App.Upgrade>;

	interface IUpgrade {
		/** The variable name of the upgrade. */
		property: string;
		/** Properties pertaining to any tiers available. */
		tiers: IUpgradeTier[];
		/** Any object the upgrade property is part of, if not the default `V`. */
		object?: Object;
	}

	interface IUpgradeTier {
		/** The value `property` must be set to in order to display this tier. */
		value: any;
		/** The value to set `property` to upon purchase of the upgrade, if any. */
		upgraded?: any;
		/** The link text. */
		link?: string;
		/** The text to display for the current tier of the upgrade. */
		text: string;
		/**
		 * How much the upgrade costs.
		 *
		 * If one is not provided, the upgrade will be free.
		 */
		cost?: number;
		/** Any handler to run upon purchase. */
		handler?: () => void;
		/** Any additional information to display upon hover on the link. */
		notes?: string[];
		/**
		 * Any prerequisites that must be met before the upgrade is available.
		 *
		 * If none are given, the upgrade will always be available.
		 */
		prereqs?: boolean[];
		/** Any additional nodes to attach. */
		nodes?: Array<string|HTMLElement|DocumentFragment>;
	}

	interface IFacilityAssignment {
		/** The name of the assignment. */
		position: string;
		/** The assignment type. */
		assignment: Assignment;
		/** Whether the assigned slaves engage in sex with the public. */
		publicSexUse: boolean;
		/** Whether fuckdolls can work here. */
		fuckdollAccepted: boolean;
		/** Whether slaves assigned here can work at another assignment at the same time. */
		partTime?: boolean;
	}

	interface IManagerAssignment {
		/** The name of the assignment. */
		position: string;
		/** The assignment name's abbreviated form, if any. */
		positionAbbreviation?: string;
		/** The assignment type. */
		assignment: Assignment;
		/** A list of careers that count towards past experience. */
		careers: string[];
		/** Which of a slave's manager skills is affected. */
		skill: string;
		/** Whether the assigned slaves engage in sex with the public. */
		publicSexUse: boolean;
		/** Whether fuckdolls can work here. */
		fuckdollAccepted: boolean;
		/** Whether broodmothers can work here. */
		broodmotherAccepted: boolean;
		/** If slaves assigned here must be able to walk. */
		shouldWalk: boolean;
		/** If slaves assigned here must be able to hold items. */
		shouldHold: boolean;
		/** If slaves assigned here must be able to see. */
		shouldSee: boolean;
		/** If slaves assigned here must be able to hear. */
		shouldHear: boolean;
		/** If slaves assigned here must be able to talk. */
		shouldTalk: boolean;
		/** If slaves assigned here must have cognitive function. */
		shouldThink: boolean;
		/** The minimum required devotion level to be assigned here. */
		requiredDevotion: number;
	}

	interface FacilityFramework {
		/** The variable name of the facility. */
		baseName: string;
		/** The generic form of the facility. */
		genericName: string|null;
		/** An object listing all the available positions in the facility. */
		jobs: Record<string, IFacilityAssignment>;
		/** The default job in the facility. */
		defaultJob: string;
		/** Properties pertaining to the facility's manager. */
		manager: IManagerAssignment;
		/** Whether the facility can use FS decorations. */
		decorated: boolean;
	}

	namespace Facilities {
		export type Facility = InstanceType<typeof App.Facilities.Facility>;
		export type Animal = InstanceType<typeof App.Entity.Animal>;

		interface Decoration extends Record<FC.FutureSocietyDeco, string> {}

		interface Rule {
			/** The variable name of the rule. */
			property: string;
			/** Any prerequisites that must be met for the rule to be displayed. */
			prereqs: boolean[];
			/** Properties pertaining to any options available. */
			options: Array<{
				/** The text displayed when the rule is active. */
				text: string;
				/** The link text to set the rule to active. */
				link: string;
				/** The value to set `property` to when the rule is active. */
				value: any;
				/** Any handler to run upon setting the value. */
				handler?: (value: any) => void;
				/** Any additional information to display with on the link. */
				note?: string;
				/** Any prerequisites that must be met for the option to be displayed. */
				prereqs?: boolean[];
			}>;
			/** Any additional nodes to attach. */
			nodes?: Array<string|HTMLElement|DocumentFragment>;
			/** Any object the rule property is part of, if not the default `V`. */
			object?: Object;
		}

		interface Expand {
			/**
			 * The number of spots to add per expansion.
			 *
			 * Defaults to 5.
			 */
			amount?: number;
			/**
			 * How much expanding the facility costs.
			 *
			 * Defaults to 1000 times the number of slaves the facility can currently support.
			 */
			cost?: number;
			/**
			 * A short description of how many slaves are in the facility out of how many possible.
			 *
			 * Defaults to `"${facilityName} can support ${possible} slaves. It currently has ${current} slaves."`.
			 */
			desc?: string;
			/** The maximum number of times the facility can be expanded, if any. */
			maximum?: number;
			/** Any link to remove all slaves from the facility, if not the default. */
			removeAll?: HTMLDivElement;
			/**
			 * The assignment to assign the facility's manager to upon decommission.
			 *
			 * Defaults to `"rest"`.
			 */
			removeManager?: FC.Assignment;
			/**
			 * The assignment to assign the facility's employees to upon decommission.
			 *
			 * Defaults to `"rest"`.
			 */
			removeSlave?: FC.Assignment;
			/**
			 * Whether the facility cannot be expanded.
			 *
			 * Defaults to `false`.
			 */
			unexpandable?: boolean;
		}

		interface Pit {
			/** Defaults to "the Pit" if not otherwise set. */
			name: string;
			// Arena section
			trainingIDs: number[];

			// Pit section
			/**
			 * If there is a fight event at the end of the week.
			 */
			active: boolean
			/** The type of audience the Pit has. */
			audience: "none" | "free" | "paid";
			/** The type of decoration the Pit is using. */
			decoration: FC.FutureSocietyDeco;
			/** An array of the IDs of slaves assigned to the Pit. */
			fighterIDs: number[];
			/** Whether or not a fight has taken place during the week. */
			fought: boolean;
			/**
			 * Base for the max number of fights that can be held each week.
			 * fightNum = 3 + 2 * fightsBase
			 */
			fightsBase: 0 | 1 | 2
			/**
			 * How many can watch the fight. Influences rep/cash generation
			 */
			seats: 0 | 1 | 2
			/**
			 * * 0: no lethal fights allowed
			 * * 1: lethal and nonlethal fights allowed
			 * * 2: only lethal fights allowed
			 */
			lethal: 0 | 1 | 2
			/**
			 * Which virginities will be respected
			 */
			virginities: "none" | "vaginal" | "anal" | "all"
			/**
			 * Whether slaves fighting must be in somewhat fair health and generally able to do combat.
			 */
			minimumHealth: boolean
			/**
			 * Schedule a slave to fight the BG
			 */
			slaveFightingBodyguard: number
			/**
			 * Schedule two slaves to fight each other
			 */
			slavesFighting: [number, number]
		}
	}
}
