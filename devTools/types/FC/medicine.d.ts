
declare namespace FC {
	type prostheticID = "interfaceP1" | "interfaceP2" | "interfaceP3" | "basicL" | "sexL" | "beautyL" | "combatL" | "felidaeL" | "canidaeL" | "felidaeCL" | "canidaeCL" | "cyberneticL"
		| "ocular" | "cochlear" | "electrolarynx" | "interfaceTail" | "modT" | "sexT" | "combatT" | "combatT2" |/* "erectile" |*/ "interfaceBack" | "modW" | "flightW"
		| "sexA" | "combatW" | "combatA1" | "combatA2";

	type prostheticName = "basic prosthetic interface" | "advanced prosthetic interface" | "quadrupedal prosthetic interface" | "set of basic prosthetic limbs" | "set of advanced sex limbs"
		| "set of advanced beauty limbs" | "set of advanced combat limbs" | "set of quadruped feline limbs" | "set of quadruped canine limbs" | "set of feline combat limbs"
		| "set of canine combat limbs" | "set of cybernetic limbs" | "ocular implant" | "cochlear implant" | "electrolarynx" | "prosthetic tail interface" | "modular tail"
		| "pleasure tail" | "combat tail" | `combat tail, type "Stinger"` | "prosthetic back interface" | "modular pair of wings" | "pair of flight capable wings"
		| "set of pleasure appendages" | `"set of combat appendages, type "Falcon"` | `set of combat appendages, type "Arachnid"` | `set of combat appendages, type "Kraken"`;


	type LimbArgument = "left arm" | "right arm" | "left leg" | "right leg"
	type LimbArgumentAll = "all" | LimbArgument

	type BodySide = "left" | "right"
	type BodySideAll = "both" | BodySide

	interface AdjustProsthetics {
		id: prostheticID;
		workLeft: number;
		slaveID: number;
	}

	type TaskType = "research" | "craft" | "craftFit";

	interface Tasks {
		type: TaskType;
		id: prostheticID;
		workLeft: number;
		craftFit?: number;
	}

	interface ResearchLab {
		level: number;
		aiModule: number;
		tasks: Tasks;
		maxSpace: number;
		hired: number;
		menials: number;
	}

	namespace Data.Medicine.SizingImplants {
		type DynamicName = (volume: number) => string;
		type DynamicCostFactor = (volume: number) => number;

		interface FillDrainData {
			limit: number;
			step: number[];
			healthCost: number;
			materialCostFactor: number;
		}
		interface ImplantType {
			name: string | DynamicName;
			specificMaterialCost: number | DynamicCostFactor;
			workCostFactor: {
				installation: number;
				removal: number;
			}
			healthCostFactor: {
				installation: number;
				removal: number;
			},
			availableSizes: number[] | (() => number[]);
			/** If defined the implant is fillable and can be filled up to the given size */
			fill?: FillDrainData;
			/** If defined the implant is drainable and can be drained down to the given size */
			drain?: FillDrainData;
		}

		type SizingImplantDatabase = {
			[K in SizingImplantTarget]: Record<BodyPartImplantTypeMap[K], FC.Data.Medicine.SizingImplants.ImplantType>;
		}
	}

	namespace Medicine {

		type ProcedureInstance = InstanceType<typeof App.Medicine.Surgery.Procedure>;
		type SizingImplantProcedure = InstanceType<typeof App.Medicine.Surgery.Procedures.SizingImplantProcedure>;

		type SizingImplantProcedureConstructor<T extends SizingImplantProcedure = SizingImplantProcedure> = new (...args: any[]) => T;

		interface ImplantProcedureCreators {
			install: (slave: FC.SlaveState, implantType: SizingImplantType, volume: number, fleshExcess: number) => ProcedureInstance;
			remove: (slave: FC.SlaveState) => ProcedureInstance;
			replace: (slave: FC.SlaveState, implantType: SizingImplantType, volume: number, fleshExcess: number) => ProcedureInstance;

			fill: (slave: FC.SlaveState, amount: number) => ProcedureInstance;
			drain: (slave: FC.SlaveState, amount: number) => ProcedureInstance;
		}

		type ImplantInfo<Target extends SizingImplantTarget> = {
			type: BodyPartInstalledImplantType<Target>;
			volume: number;
		}

		interface AssetSizingProcedureSet extends ImplantProcedureCreators {
			reduce: (slave: SlaveState, name: string, amount: number) => ProcedureInstance;
		}

		namespace Surgery {
			/**
			 * Describes surgical procedure
			 */
			interface Procedure {
				/**
				 * Type code that identifies this kind of procedure.
				 * Currently unused, but planned for future use by RA for prioritizing procedures
				 */
				typeId: string;
				/**
				 * Short label for the procedure. Can be used as a link text.
				 */
				label: string;
				/**
				 * If procedure is targeted at changing object characteristic, this is the net change (signed)
				 */
				targetEffect: number;
				/**
				 * Description of the procedure, more or less detailed
				 */
				description: string;
				/**
				 * Money costs (positive when you pay for it)
				 */
				costs: number;
				/**
				 * Projected health loss (positive when health decreases)
				 */
				healthCosts: number;
				/**
				 * Function to perform the procedure
				 * If action is undefined, the procedure can't be applied (and .description contains the reason)
				 */
				action: slaveOperation;
				/**
				 * surgery type for passages like "Surgery Degradation"
				 */
				surgeryType: string;
			}

			type SizingOptions<Target extends SizingImplantTarget> = {
				targetSize?: NumericRange;
				/**
				 * Allowed procedures for given implant type
				 */
				allowedTypes?: Set<BodyPartInstalledImplantType<Target>>;
				/** include options with implant change */
				replace?: boolean;
			}

			type DefinitiveSizedOptions<Target extends SizingImplantTarget> = Required<SizingOptions<Target>>;
		}
		namespace OrganFarm {
			interface GrowingOrgan {
				type: string;
				weeksToCompletion: number;
				ID: number;
			}
			namespace Organs {
			}
		}
	}
}
