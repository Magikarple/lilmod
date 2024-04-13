declare namespace FC {
	namespace Data {

		namespace Wardrobe {
			interface ClothingOptionBase {
				name: string;
				fs?: string; // FSPolicy;
			}
			interface ClothingOption extends ClothingOptionBase {
				value: string;
			}

			interface UpdatingClothingOption extends ClothingOptionBase {
				updateSlave: DeepPartialSlaveState;
			}
		}
		namespace Pronouns {
			interface Definition {
				pronoun: string;
				possessive: string;
				possessivePronoun: string;
				object: string;
				objectReflexive: string;
				noun: string;
			}
		}

		interface JobDesc {
			position: string;
			assignment: Assignment;
			publicSexUse: boolean;
			fuckdollAccepted: boolean;
			broodmotherAccepted?: boolean;
			/** workers can take part time jobs in addition to their main (full-time) one */
			partTime?: boolean;
		}

		interface ManagerJobDesc extends JobDesc {
			shouldWalk: boolean;
			shouldHold: boolean;
			shouldSee: boolean;
			shouldHear: boolean;
			shouldTalk: boolean;
			shouldThink: boolean;
			requiredDevotion: number;
			/** Applicable careers */
			careers: string[];
			/** Applicable skill name */
			skill: string;
			positionAbbreviation?: string;
		}

		interface FacilityDesc {
			/** Base name for state variables */
			baseName: string;
			/** Generic name for UI (Brothel, Club, etc.)
			 * If null, baseName is used instead
			 */
			genericName: string | null;
			jobs: Record<string, JobDesc>;
			defaultJob: string;
			manager: ManagerJobDesc | null;
			decorated: boolean;
		}

		namespace SlaveSummary {
			interface SmartVibrator {
				setting: {
					off: string,
					submissive: string,
					lesbian: string,
					oral: string,
					humiliation: string,
					anal: string,
					boobs: string,
					sadist: string,
					masochist: string,
					dom: string,
					pregnancy: string,
					vanilla: string,
					all: string,
					none: string,
					monitoring: string,
					men: string,
					women: string,
					"anti-men": string,
					"anti-women": string,
				},
				system: {
					"piercing": string,
					"bullet": string,
					"vibe": string
				}
			}
		}
	}
}
