declare namespace FC {
	namespace Mods {
		/** The base mod interface, from which all mod interfaces inherit. */
		interface Base {
			/** Whether the mod is enabled. */
			enabled: boolean;
		}

		/** Properties relating to the food system mod. */
		interface Food extends Base {
			/** How much food the arcology has, in kg. */
			amount: number;
			/** The base price of 1kg of food. */
			cost: number;
			/** How much food the arcology had at the end of last week, in kg. */
			lastWeek: number;
			/** Whether the food market has been established. */
			market: boolean;
			/** The amount of food produced this week, in kg. */
			produced: number;
			/** The amount of food each class consumes in a week. */
			rate: {
				/** The amount of food a slave consumes in a week, in kg. */
				slave: 8,
				/** The amount of food the lower class consumes in a week, in kg. */
				lower: 14.5,
				/** The amount of food the middle class consumes in a week, in kg. */
				middle: 16,
				/** The amount of food the upper class consumes in a week, in kg. */
				upper: 17.5,
				/** The amount of food the elite class consumes in a week, in kg. */
				top: 19,
			},
			/**
			 * How much food you are providing your citizens weekly.
			 *
			 * Not in kg.
			 */
			rations: 0 | 1 | 2 | 3 | 4 | 5;
			/** How much food the arcology has produced in total, in kg. */
			total: number;
			/** Whether the player has received a warning about a lack of food. */
			warned: boolean;
		}
	}
}
