/** @type {FC.Data.Medicine.SizingImplants.SizingImplantDatabase} */
App.Data.Medicine.sizingImplants = {
	boobs: {
		normal: {
			name: volume => volume > 500
				? "large"
				: (volume < 300 ? "small" : "standard"),
			specificMaterialCost: () => V.ImplantProductionUpgrade ? 0.1 : 1.3,
			workCostFactor: {
				installation: 1,
				removal: 0.5
			},
			healthCostFactor: {
				installation: 0.06,
				removal: 0.03
			},
			availableSizes: () => _.range(200, V.ImplantProductionUpgrade ? 601 : 401, 200)
		},
		fillable: {
			name: "fillable",
			availableSizes: [800],
			specificMaterialCost: () => V.ImplantProductionUpgrade ? 0.15 : 1.5,
			workCostFactor: {
				installation: 1.5,
				removal: 0.7
			},
			healthCostFactor: {
				installation: 0.05,
				removal: 0.03
			},
			fill: {
				limit: 1800,
				step: [200],
				healthCost: 10,
				materialCostFactor: 0,
			},
			drain: {
				limit: 800,
				step: [200],
				healthCost: 10,
				materialCostFactor: 0,
			}
		},
		"advanced fillable": {
			name: () => V.ImplantProductionUpgrade > 0 ? "advanced fillable" : "advanced fillable (special order)",
			availableSizes: [2200],
			specificMaterialCost: () => V.ImplantProductionUpgrade > 0 ? 0.4 : 4.5,
			workCostFactor: {
				installation: 1.5,
				removal: 0.7
			},
			healthCostFactor: {
				installation: 0.005,
				removal: 0.003
			},
			fill: {
				limit: 10000,
				step: [200, 400, 1000],
				healthCost: 10,
				materialCostFactor: 0,
			},
			drain: {
				limit: 2200,
				step: [200, 400, 1000],
				healthCost: 5,
				materialCostFactor: 0,
			}
		},
		"hyper fillable": {
			name: "hyper fillable",
			availableSizes: () => FutureSocieties.researchAvailable("TransformationFetishist")
				? [11000] : [],
			specificMaterialCost: 0.5,
			workCostFactor: {
				installation: 0.5,
				removal: 0.25
			},
			healthCostFactor: {
				installation: 0.01,
				removal: 0.005
			},
			fill: {
				limit: 50000,
				step: [1000],
				healthCost: 10,
				materialCostFactor: 0.1,
			},
			drain: {
				limit: 11000,
				step: [1000],
				healthCost: 5,
				materialCostFactor: 0,
			}
		},
		string: {
			name: "string",
			availableSizes: [400],
			specificMaterialCost: () => V.ImplantProductionUpgrade > 0 ? 0.4 : 4,
			workCostFactor: {
				installation: 2,
				removal: 5,
			},
			healthCostFactor: {
				installation: 0.1,
				removal: 0.005
			},
			drain: {
				limit: 600, // yes, can't be drained dry
				step: [200],
				healthCost: 5,
				materialCostFactor: 0,
			}
		}
	},
	butt: {
		normal: {
			name: volume => volume > 1 ? "large" : "standard",
			specificMaterialCost: () => V.ImplantProductionUpgrade ? 100 : 130,
			workCostFactor: {
				installation: 100,
				removal: 50
			},
			healthCostFactor: {
				installation: 10,
				removal: 5
			},
			availableSizes: () => V.ImplantProductionUpgrade ? [1, 2] : [1]
		},
		fillable: {
			name: "fillable",
			availableSizes: [3],
			specificMaterialCost: () => V.ImplantProductionUpgrade ? 150 : 1500,
			workCostFactor: {
				installation: 150,
				removal: 70
			},
			healthCostFactor: {
				installation: 5,
				removal: 5
			},
			fill: {
				limit: 4,
				step: [1],
				healthCost: 10,
				materialCostFactor: 0,
			},
			drain: {
				limit: 3,
				step: [1],
				healthCost: 5,
				materialCostFactor: 0,
			}
		},
		"advanced fillable": {
			name: () => V.ImplantProductionUpgrade > 0 ? "advanced fillable" : "advanced fillable (special order)",
			availableSizes: [5],
			specificMaterialCost: () => V.ImplantProductionUpgrade > 0 ? 150 : 1500,
			workCostFactor: {
				installation: 600,
				removal: 300
			},
			healthCostFactor: {
				installation: 2.5,
				removal: 0.3
			},
			fill: {
				limit: 8,
				step: [1],
				healthCost: 10,
				materialCostFactor: 0,
			},
			drain: {
				limit: 5,
				step: [1],
				healthCost: 5,
				materialCostFactor: 0,
			}
		},
		"hyper fillable": {
			name: "hyper fillable",
			availableSizes: () => FutureSocieties.researchAvailable("TransformationFetishist")
				? [9] : [],
			specificMaterialCost: 400,
			workCostFactor: {
				installation: 100,
				removal: 50
			},
			healthCostFactor: {
				installation: 2,
				removal: 1
			},
			fill: {
				limit: 20,
				step: [1],
				healthCost: 10,
				materialCostFactor: 100,
			},
			drain: {
				limit: 9,
				step: [1],
				healthCost: 5,
				materialCostFactor: 0,
			}
		},
		string: {
			name: "string",
			availableSizes: [1],
			specificMaterialCost: () => V.ImplantProductionUpgrade > 0 ? 150 : 1500,
			workCostFactor: {
				installation: 800,
				removal: 500,
			},
			healthCostFactor: {
				installation: 80,
				removal: 10
			},
			drain: {
				limit: 1,
				step: [1],
				healthCost: 5,
				materialCostFactor: 0,
			}
		}
	},
	lips: {
		normal: {
			availableSizes: [10],
			name: (volume) => {
				const names = {
					10: "moderate",
					20: "large",
					100: "enormous"
				};
				return App.Ratings.numeric(names, volume);
			},
			healthCostFactor: {
				installation: 1,
				removal: 0.01,
			},
			specificMaterialCost: 0,
			workCostFactor: {
				installation: 0,
				removal: 0,
			},
			// this is a fake fill data to implement implant sizing
			// used because there are no names for large implants and they
			// can be installed in steps only
			fill: {
				healthCost: 10,
				limit: 90,
				materialCostFactor: 0,
				step: [10],
			}
		}
	}
};
