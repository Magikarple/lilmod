App.Medicine.OrganFarm.TesticlesImplantAction = class extends App.Medicine.OrganFarm.OrganImplantAction {
	/**
	 * @param {object} params
	 * @param {string} params.name
	 * @param {boolean} params.animal
	 * @param {typeof App.Medicine.Surgery.Procedure} params.surgeryProcedure
	 * @param {Array} [params.surgeryProcedureParams]
	 * @param {boolean} [params.autoImplant]
	 * @param {function(App.Entity.SlaveState):boolean} params.canImplant
	 * @param {function(App.Entity.SlaveState):string} params.implantError
	 */
	constructor({
		name,
		animal,
		surgeryProcedure,
		surgeryProcedureParams,
		autoImplant = true,
		canImplant,
		implantError,
	}) {
		super({
			name: name,
			surgeryProcedure: surgeryProcedure,
			surgeryProcedureParams: surgeryProcedureParams,
			autoImplant: autoImplant,
			canImplant: s => (!this.animal || V.animalTesticles > 0) && canImplant(s),
			implantError: s => (this.animal && V.animalTesticles === 0) ? "" : implantError(s),
		});
		this.animal = animal;
	}
};

App.Medicine.OrganFarm.Testicles = class extends App.Medicine.OrganFarm.Organ {
	/**
	 * @param {object} params
	 * @param {string} params.name
	 * @param {FC.AnimalType} params.ballType
	 */
	constructor({name, ballType}) {
		super({
			name: name,
			tooltip: "will add a prostate if one is not already present; requires a penis for successful implantation",
			cost: 5000, time: 10,
			canGrow: () => (this.ballType === "human" || V.animalTesticles > 0), dependencies: ["penis"],
			actions: [
				new App.Medicine.OrganFarm.TesticlesImplantAction({
					name: "Implant", animal: ballType !== "human",
					surgeryProcedure: App.Medicine.Surgery.Procedures.OFAddBalls,
					surgeryProcedureParams: [ballType],
					canImplant: slave => (slave.balls <= 0 && slave.dick > 0),
					implantError: slave => {
						if (slave.dick === 0) {
							return "This slave lacks the penis necessary to accept testicles.";
						} else {
							return "This slave already has testicles.";
						}
					},
				}),
				new App.Medicine.OrganFarm.TesticlesImplantAction({
					name: "Implant",
					animal: ballType !== "human", autoImplant: false,
					surgeryProcedure: App.Medicine.Surgery.Procedures.OFAddTesticles,
					surgeryProcedureParams: [ballType],
					canImplant: slave => (slave.dick === 0 && slave.balls <= 0),
					implantError: slave => ((slave.balls > 0) ? "This slave already has testicles." : ""),
				}),
				new App.Medicine.OrganFarm.TesticlesImplantAction({
					name: "Replace",
					animal: ballType !== "human", autoImplant: false,
					surgeryProcedure: App.Medicine.Surgery.Procedures.OFReplaceTesticles,
					surgeryProcedureParams: [ballType],
					canImplant: slave => (slave.balls > 0 && slave.ballType !== this.ballType),
					implantError: slave => (slave.balls > 0 ? `This slave already has ${this.ballType} testicles.` : ""),

				})
			]
		});
		this.ballType = ballType;
	}
};

App.Medicine.OrganFarm.OvariesImplantAction = class extends App.Medicine.OrganFarm.OrganImplantAction {
	/**
	 * @param {object} params
	 * @param {string} params.name
	 * @param {boolean} params.animal
	 * @param {typeof App.Medicine.Surgery.Procedure} params.surgeryProcedure
	 * @param {Array} [params.surgeryProcedureParams]
	 * @param {boolean} [params.autoImplant]
	 * @param {function(App.Entity.SlaveState):boolean} params.canImplant
	 * @param {function(App.Entity.SlaveState):string} params.implantError
	 */
	constructor({
		name,
		animal,
		surgeryProcedure,
		surgeryProcedureParams,
		autoImplant = true,
		canImplant,
		implantError
	}) {
		super({
			name: name, autoImplant: autoImplant,
			surgeryProcedure: surgeryProcedure,
			surgeryProcedureParams: surgeryProcedureParams,
			canImplant: s => (!this.animal || V.animalTesticles > 0) && canImplant(s),
			implantError: s => (this.animal && V.animalTesticles === 0) ? "" : implantError(s),
		});
		this.animal = animal;
	}
};

App.Medicine.OrganFarm.Ovaries = class extends App.Medicine.OrganFarm.Organ {
	/**
	 * @param {object} params
	 * @param {string} params.name
	 * @param {FC.AnimalType} params.eggType
	 * @param {string} params.pregData
	 */
	constructor({name, eggType, pregData}) {
		super({
			name: name, tooltip: "requires a vagina for successful implantation",
			cost: 10000, time: 10,
			canGrow: () => (this.eggType === "human" || V.animalOvaries > 0),
			actions: [
				new App.Medicine.OrganFarm.OvariesImplantAction({
					name: "Implant", animal: eggType !== "human",
					surgeryProcedure: App.Medicine.Surgery.Procedures.OFAddOvaries,
					surgeryProcedureParams: [eggType, pregData],
					canImplant: s => (s.vagina >= 0 && s.ovaries <= 0 && s.mpreg === 0 && s.bellyImplant === -1),
					implantError: s => {
						if (s.vagina < 0) {
							return "This slave lacks the vagina necessary to accept ovaries.";
						}
						if (s.ovaries > 0 || s.mpreg > 0) {
							return "This slave already has ovaries.";
						}
						return "This slave's body cavity is filled with another organ.";
					},
				}),
				new App.Medicine.OrganFarm.OvariesImplantAction({
					name: "Replace", animal: eggType !== "human",
					autoImplant: false,
					surgeryProcedure: App.Medicine.Surgery.Procedures.OFReplaceOvaries,
					surgeryProcedureParams: [eggType, pregData],
					canImplant: s => (s.vagina >= 0 && s.mpreg === 0 && s.bellyImplant === -1 && (s.eggType !== this.eggType || s.preg === -3)),
					implantError: s => (s.eggType === this.eggType) ? `This slave already has ${s.eggType} ovaries.` : "",
				})
			]
		});
		this.eggType = eggType;
		this.pregData = pregData;
	}
};

App.Medicine.OrganFarm.AnalWombImplantAction = class extends App.Medicine.OrganFarm.OrganImplantAction {
	/**
	 * @param {object} params
	 * @param {FC.AnimalType} params.eggType
	 * @param {string} params.pregData
	 */
	constructor({eggType, pregData}) {
		super({
			name: "Implant",
			surgeryProcedure: App.Medicine.Surgery.Procedures.OFAddMPreg,
			surgeryProcedureParams: [eggType, pregData],
			canImplant: s => ((this.eggType === "human" || V.animalTesticles > 0) && s.ovaries === 0 && s.vagina <= -1 && s.mpreg === 0 && s.bellyImplant < 0),
			implantError: s => {
				if (this.eggType !== "human" && V.animalTesticles === 0) {
					return "";
				}
				if (s.bellyImplant >= 0) {
					return "This slave has a fillable abdominal implant.";
				}
				return "This slave has existing reproductive Organs.";
			},
		});
		this.eggType = eggType;
		this.pregData = pregData;
	}
};

App.Medicine.OrganFarm.AnalWomb = class extends App.Medicine.OrganFarm.Organ {
	/**
	 * @param {object} params
	 * @param {string} params.name
	 * @param {FC.AnimalType} params.eggType
	 * @param {string} params.pregData
	 */
	constructor({name, eggType, pregData}) {
		super({
			name: name,
			tooltip: "the slave must not have female reproductive organs for successful implantation",
			cost: 20000, time: 10,
			canGrow: () => (V.arcologies[0].FSGenderRadicalistResearch === 1 && (eggType === "human" || V.animalMpreg > 0)),
			actions: [
				new App.Medicine.OrganFarm.AnalWombImplantAction({
					eggType: eggType,
					pregData: pregData
				})
			]
		});
	}
};
