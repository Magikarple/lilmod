declare namespace FC {
	namespace RA {

		interface GenericNumericTarget<T> {
			cond: "==" | ">=" | "<=" | ">" | "<";
			val: T;
		}
		type NumericTarget = GenericNumericTarget<number>;
		type ExpressiveNumericTarget = GenericNumericTarget<number | string>;

		interface RuleConditionEditorArguments {
			activation: PostFixRule;
			advancedMode: boolean;
		}

		interface RuleConditions extends RuleConditionEditorArguments{
			selectedSlaves: number[];
			excludedSlaves: number[];
			applyRuleOnce: boolean;
		}

		interface RuleSurgerySettings {
			voice: number;
			eyes: number;
			heels: number;
			hears: number;
			smells: number;
			tastes: number;
			lactation: number;
			prostate: number;
			ovaImplant: number;
			ovaImplantAllowReplacing: boolean;
			cosmetic: number;
			accent: number;
			shoulders: number;
			shouldersImplant: number;
			boobs: NumericRange;
			boobsImplantTypes: SizingImplantType[];
			boobsImplantAllowReplacing: boolean;
			hips: number;
			hipsImplant: number;
			butt: NumericRange;
			buttImplantTypes: SizingImplantType[];
			buttImplantAllowReplacing: boolean;
			faceShape: FaceShape;
			lips: NumericRange;
			holes: number;
			hair: number;
			bodyhair: number;
			vasectomy: boolean;
			bellyImplant: string;
			tummy: number;
			earShape: number;
			horn: number;
			genes: RuleGenesSettings;
		}

		interface RuleGenesSettings {
			NCS: number,
			rapidCellGrowth: number,
			immortality: number,
			flavoring: number,
			aggressiveSperm: number,
			livestock: number,
			progenitor: number,
			macromastia: number,
			gigantomastia: number,
			potent: number,
			fertility: number,
			hyperFertility: number,
			superfetation: number,
			polyhydramnios: number,
			uterineHypersensitivity: number,
			galactorrhea: number,
			gigantism: number,
			dwarfism: number,
			neoteny: number,
			progeria: number,
			albinism: number,
			rearLipedema: number,
			wellHung: number,
			wGain: number,
			wLoss: number,
			androgyny: number,
			mGain: number,
			mLoss: number,
		}

		interface RuleGrowthSetters {
			boobs: ExpressiveNumericTarget;
			butt: ExpressiveNumericTarget;
			lips: ExpressiveNumericTarget;
			dick: ExpressiveNumericTarget;
			balls: ExpressiveNumericTarget;
			intensity: number;
		}

		interface RuleReleaseSetters {
			masturbation: number;
			partner: number;
			facilityLeader: number;
			family: number;
			slaves: number;
			master: number;
		}

		//type Piercings = ;

		interface RuleSetters {
			releaseRules: RuleReleaseSetters;
			lactationRules: WithNone<"induce" | "maintain"> | null;
			mobilityRules: Rules.Mobility;
			restRules: FC.Rules.Rest;
			toyHole: FC.ToyHole;
			clitSetting: SmartPiercingSetting;
			clitSettingXY: number;
			clitSettingXX: number;
			clitSettingEnergy: number;
			speechRules: Rules.Speech;
			clothes: FC.Clothes;
			collar: FC.Collar;
			faceAccessory: string;
			mouthAccessory: WithNone<MouthAccessory>;
			shoes: WithNone<Shoes>;
			armAccessory: string;
			legAccessory: string;
			chastityVagina: 0 | 1 | 2;
			chastityAnus: 0 | 1 | 2;
			chastityPenis: number;
			virginAccessory: string;
			aVirginAccessory: string;
			vaginalAccessory: string;
			aVirginDickAccessory: string;
			dickAccessory: string;
			bellyAccessory: FC.BellyAccessory;
			buttplug: string;
			aVirginButtplug: string;
			vaginalAttachment: string;
			buttplugAttachment: string;
			iris: string;
			pupil: string;
			sclera: string;
			makeup: number;
			nails: number;
			hColor: string;
			hLength: number;
			haircuts: number;
			hStyle: FC.HairStyle;
			eyebrowHColor: string;
			eyebrowHStyle: string;
			eyebrowFullness: FC.EyebrowThickness;
			markings: "remove beauty marks" | "remove birthmarks" | "remove both";
			pubicHColor: string;
			pubicHStyle: string;
			piercing: InstanceType<typeof App.Entity.completePiercingStateRA>;
			vaginaLube: number;
			boobsTat: string | number;
			buttTat: string | number;
			vaginaTat: string | number;
			dickTat: string | number;
			lipsTat: string | number;
			anusTat: string | number;
			shouldersTat: string | number;
			armsTat: string | number;
			legsTat: string | number;
			backTat: string | number;
			stampTat: string | number;
			birthsTat: string | number;
			abortionTat: string | number;
			pitRules: number;
			arenaRules: number;
			curatives: number;
			livingRules: Rules.Living;
			relationshipRules: Rules.Relationship;
			standardPunishment: Rules.Punishment;
			standardReward: Rules.Reward;
			weight: NumericRange;
			diet: string;
			dietCum: 0 | 1 | 2;
			dietMilk: FC.dietMilkType;
			onDiet: number;
			muscles: NumericTarget;
			XY: number;
			XX: number;
			gelding: number;
			preg: boolean;
			abortion: string[];
			growth: RuleGrowthSetters;
			hyper_drugs: number;
			aphrodisiacs: number;
			autoBrand: number;
			pornFeed: number;
			pornFameSpending: number;
			dietGrowthSupport: number;
			eyewear: string;
			earwear: string;
			setAssignment: Assignment;
			facilityRemove: boolean;
			removalAssignment: Assignment;
			surgery: RuleSurgerySettings;
			underArmHColor: string;
			underArmHStyle: string;
			drug: FC.Drug;
			eyes: string;
			pregSpeed: string;
			bellyImplantVol: number;
			teeth: string;
			label: string;
			removeLabel: string;
			skinColor: string;
			inflationType: FC.InflationLiquid;
			brandTarget: string;
			brandDesign: string;
			scarTarget: string;
			scarDesign: string;
			hornColor: string;
			labelTagsClear: boolean;
			choosesOwnClothes: 0 | 1;
			pronoun: number;
			posePrompt: string;
			expressionPositivePrompt: string;
			expressionNegativePrompt: string;
			positivePrompt: string;
			negativePrompt: string;
			overridePrompts: boolean;
			openPoseType: "Library" | "JSON" | "PNG";
			openPoseName: string;
			aiAutoRegenExclude: FC.Bool;
		}

		interface Rule {
			ID: string;
			name: string;
			condition: RuleConditions;
			set: RuleSetters;
		}

		type PostFixRule = Array<string | number | boolean>
	}
}
