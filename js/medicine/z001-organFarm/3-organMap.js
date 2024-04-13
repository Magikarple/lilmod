/**
 * Organs will usually be displayed in this order.
 *
/** @type {Map<string, App.Medicine.OrganFarm.Organ>} */
App.Medicine.OrganFarm.Organs = new Map([
	["penis",
		new App.Medicine.OrganFarm.Organ({
			name: "Penis", cost: 5000, time: 5,
			canGrow: () => V.seeDicks !== 0 || V.makeDicks === 1,
			actions: [
				new App.Medicine.OrganFarm.OrganImplantAction({
					name: "Implant",
					surgeryProcedure: App.Medicine.Surgery.Procedures.OFAddDick,
					canImplant: slave => slave.dick <= 0,
					implantError: () => "this slave already has a penis",
				})
			]
		})],
	["testicles",
		new App.Medicine.OrganFarm.Testicles({
			name: "Testicles", ballType: "human"
		})],
	["pigTesticles",
		new App.Medicine.OrganFarm.Testicles({
			name: "Pig testicles", ballType: "pig"
		})],
	["dogTesticles",
		new App.Medicine.OrganFarm.Testicles({
			name: "Dog testicles", ballType: "dog"
		})],
	["horseTesticles",
		new App.Medicine.OrganFarm.Testicles({
			name: "Horse testicles", ballType: "horse"
		})],
	["cowTesticles",
		new App.Medicine.OrganFarm.Testicles({
			name: "Cow testicles", ballType: "cow"
		})],
	["scrotum",
		new App.Medicine.OrganFarm.Organ({
			name: "Scrotum", tooltip: "requires balls for successful implantation", cost: 2500, time: 5,
			dependencies: ["testicles", "pigTesticles", "dogTesticles", "horseTesticles", "cowTesticles"],
			actions: [
				new App.Medicine.OrganFarm.OrganImplantAction({
					name: "Graft on",
					surgeryProcedure: App.Medicine.Surgery.Procedures.OFAddScrotum,
					canImplant: slave => slave.scrotum <= 0 && slave.balls > 0,
					implantError: slave => slave.scrotum > 0 ? "This slave already has a scrotum." : "This slave lacks the balls necessary to accept a scrotum.",
				})
			]
		})],
	["foreskin",
		new App.Medicine.OrganFarm.Organ({
			name: "Foreskin", cost: 2500, time: 5,
			actions: [
				new App.Medicine.OrganFarm.OrganImplantAction({
					name: "Graft on",
					surgeryProcedure: App.Medicine.Surgery.Procedures.OFAddForeskin,
					canImplant: slave => slave.foreskin <= 0,
					implantError: slave => `This slave already has a ${slave.dick > 0 ? "foreskin" : "clitoral hood"}.`,
				})
			]
		})],
	["prostate",
		new App.Medicine.OrganFarm.Organ({
			name: "Prostate", cost: 5000, time: 5,
			actions: [
				new App.Medicine.OrganFarm.OrganImplantAction({
					name: "Implant",
					surgeryProcedure: App.Medicine.Surgery.Procedures.OFAddProstate,
					canImplant: s => s.prostate === 0,
					implantError: () => "This slave already has a prostate.",
				})
			]
		})],
	["ovaries",
		new App.Medicine.OrganFarm.Ovaries({
			name: "Ovaries", eggType: "human", pregData: "human"
		})],
	["freshOvaries",
		new App.Medicine.OrganFarm.Organ({
			name: "Younger Ovaries",
			tooltip: "requires a womb for successful implantation",
			cost: 10000, time: 10,
			canGrow: () => V.youngerOvaries === 1,
			dependencies: ["ovaries", "pigOvaries", "dogOvaries", "horseOvaries", "cowOvaries", "mpreg", "mpregPig", "mpregDog", "mpregHorse", "mpregCow"],
			actions: [
				new App.Medicine.OrganFarm.OrganImplantAction({
					name: "Implant",
					surgeryProcedure: App.Medicine.Surgery.Procedures.OFFreshOvaries,
					canImplant: s => (s.mpreg !== 0 || s.ovaries !== 0) && s.bellyImplant === -1 && s.physicalAge < 70 && s.ovaryAge >= 45,
					implantError: s =>
						s.ovaryAge < 45
							? "This slave's ovaries are too young to benefit from rejuvenation."
							: s.physicalAge >= 70
								? "This slave's body is too old to handle pregnancy."
								: "This slave lacks a viable womb.",
				})
			]
		})],
	["immortalOvaries",
		new App.Medicine.OrganFarm.Organ({
			name: "Immortal Ovaries",
			tooltip: "requires a womb for successful implantation",
			cost: 50000, time: 20,
			canGrow: () => V.immortalOvaries === 1,
			dependencies: ["ovaries", "pigOvaries", "dogOvaries", "horseOvaries", "cowOvaries", "mpreg", "mpregPig", "mpregDog", "mpregHorse", "mpregCow"],
			actions: [
				new App.Medicine.OrganFarm.OrganImplantAction({
					name: "Implant",
					surgeryProcedure: App.Medicine.Surgery.Procedures.OFImmortalOvaries,
					canImplant: s => (s.mpreg !== 0 || s.ovaries !== 0) && s.bellyImplant === -1 && s.physicalAge < 70 && s.ovaryAge >= 0,
					implantError: s =>
						s.ovaryAge < 0
							? "This slave already has immortal ovaries."
							: s.physicalAge >= 70
								? "This slave's body is too old to handle pregnancy."
								: "This slave lacks a viable womb.",
				})
			]
		})],
	["asexualReproOvaries",
		new App.Medicine.OrganFarm.Organ({
			name: "Asexual reproduction modification",
			tooltip: "requires existing ovaries for successful implantation",
			cost: 10000, time: 10,
			canGrow: () => V.asexualReproduction === 1,
			dependencies: ["ovaries", "pigOvaries", "dogOvaries", "horseOvaries", "cowOvaries", "mpreg", "mpregPig", "mpregDog", "mpregHorse", "mpregCow"],
			actions: [
				new App.Medicine.OrganFarm.OrganImplantAction({
					name: "Implant",
					surgeryProcedure: App.Medicine.Surgery.Procedures.OFAsexualReproOvaries,
					canImplant: s => s.mpreg !== 0 || s.ovaries !== 0,
					implantError: () => "This slave lacks ovaries.",
				})
			]
		})],
	["pigOvaries",
		new App.Medicine.OrganFarm.Ovaries({
			name: "Pig ovaries", eggType: "pig", pregData: "pig"
		})],
	["dogOvaries",
		new App.Medicine.OrganFarm.Ovaries({
			name: "Dog ovaries", eggType: "dog", pregData: "canineM",
		})],
	["horseOvaries",
		new App.Medicine.OrganFarm.Ovaries({
			name: "Horse ovaries", eggType: "horse", pregData: "equine",
		})],
	["cowOvaries",
		new App.Medicine.OrganFarm.Ovaries({
			name: "Cow ovaries", eggType: "cow", pregData: "cow"
		})],
	["leftEye",
		new App.Medicine.OrganFarm.Organ({
			name: "Left Eye", cost: 5000, time: 10,
			tooltip: s => getLeftEyeVision(s) === 2 ? "would not improve this slave" : "",
			actions: [
				new App.Medicine.OrganFarm.OrganImplantAction({
					name: "Implant",
					surgeryProcedure: App.Medicine.Surgery.Procedures.OFNewEyes,
					surgeryProcedureParams: ["left"],
					canImplant: s => getLeftEyeVision(s) === 0 && getBestVision(s) !== 0 && getLeftEyeType(s) !== 2,
					implantError: s => getLeftEyeVision(s) !== 0 ? "Slave has a working left eye." : "",
				}),
				new App.Medicine.OrganFarm.OrganImplantAction({
					name: "Implant",
					surgeryProcedure: App.Medicine.Surgery.Procedures.OFUnblind,
					surgeryProcedureParams: ["left"],
					canImplant: s => getBestVision(s) === 0 && getLeftEyeType(s) !== 2,
					implantError: () => "",
				}),
				new App.Medicine.OrganFarm.OrganImplantAction({
					name: "Replace", autoImplant: false,
					surgeryProcedure: App.Medicine.Surgery.Procedures.OFNewEyes,
					surgeryProcedureParams: ["left"],
					canImplant: s => getLeftEyeType(s) === 2,
					implantError: () => "",
				})
			]
		})],
	["rightEye",
		new App.Medicine.OrganFarm.Organ({
			name: "Right Eye", cost: 5000, time: 10,
			tooltip: s => getRightEyeVision(s) === 2 ? "would not improve this slave" : "",
			actions: [
				new App.Medicine.OrganFarm.OrganImplantAction({
					name: "Implant",
					surgeryProcedure: App.Medicine.Surgery.Procedures.OFNewEyes,
					surgeryProcedureParams: ["right"],
					canImplant: s => getRightEyeVision(s) === 0 && getBestVision(s) !== 0 && getRightEyeType(s) !== 2,
					implantError: s => getRightEyeVision(s) !== 0 ? "Slave has a working right eye." : "",
				}),
				new App.Medicine.OrganFarm.OrganImplantAction({
					name: "Implant",
					surgeryProcedure: App.Medicine.Surgery.Procedures.OFUnblind,
					surgeryProcedureParams: ["right"],
					canImplant: s => getBestVision(s) === 0 && getRightEyeType(s) !== 2,
					implantError: () => "",
				}),
				new App.Medicine.OrganFarm.OrganImplantAction({
					name: "Replace", autoImplant: false,
					surgeryProcedure: App.Medicine.Surgery.Procedures.OFNewEyes,
					surgeryProcedureParams: ["right"],
					canImplant: s => getRightEyeType(s) === 2,
					implantError: () => "",
				})
			]
		})],
	["ears",
		new App.Medicine.OrganFarm.Organ({
			name: "Normal Ears", cost: 1000, time: 2,
			actions: [
				new App.Medicine.OrganFarm.OrganImplantAction({
					name: "Attach",
					surgeryProcedure: App.Medicine.Surgery.Procedures.OFImplantEars,
					canImplant: s => s.earShape === "none",
					implantError: () => "This slave already has ears."
				}),
				new App.Medicine.OrganFarm.OrganImplantAction({
					name: "Replace",
					surgeryProcedure: App.Medicine.Surgery.Procedures.OFImplantEars,
					autoImplant: false,
					canImplant: s => s.earShape !== "normal",
					implantError: () => "This slave already has normal ears."
				})
			]
		})],
	["topEars",
		new App.Medicine.OrganFarm.Organ({
			name: "Top Ears", cost: 1000, time: 2,
			canGrow: () => V.surgeryUpgrade >= 1,
			actions: [
				new App.Medicine.OrganFarm.OrganImplantAction({
					name: "Attach",
					surgeryProcedure: App.Medicine.Surgery.Procedures.OFImplantTopEars,
					canImplant: s => s.earT === "none",
					implantError: () => "This slave already has ears at the top of the head."
				}),
				new App.Medicine.OrganFarm.OrganImplantAction({
					name: "Replace",
					surgeryProcedure: App.Medicine.Surgery.Procedures.OFImplantTopEars,
					autoImplant: false,
					canImplant: s => s.earT !== "normal",
					implantError: () => "This slave already has normal ears at the top of the head."
				})
			]
		})],
	["cochleae",
		new App.Medicine.OrganFarm.Organ({
			name: "Cochleae", cost: 8000, time: 6,
			actions: [
				new App.Medicine.OrganFarm.OrganImplantAction({
					name: "Implant",
					surgeryProcedure: App.Medicine.Surgery.Procedures.OFUndeafen,
					canImplant: s => s.hears <= -2 && s.earImplant === 0,
					implantError: () => "This slave already has working ears.",
				}),
				new App.Medicine.OrganFarm.OrganImplantAction({
					name: "Replace", autoImplant: false,
					surgeryProcedure: App.Medicine.Surgery.Procedures.OFNewEars,
					canImplant: s => s.earImplant === 1,
					implantError: () => "",
				})
			]
		})],
	["voicebox",
		new App.Medicine.OrganFarm.Organ({
			name: "Vocal Cords", cost: 5000, time: 5,
			actions: [
				new App.Medicine.OrganFarm.OrganImplantAction({
					name: "Implant",
					surgeryProcedure: App.Medicine.Surgery.Procedures.OFRestoreVoice,
					canImplant: s => s.voice === 0 && s.electrolarynx === 0,
					implantError: () => "This slave is not mute.",
				}),
				new App.Medicine.OrganFarm.OrganImplantAction({
					name: "Replace", autoImplant: false,
					surgeryProcedure: App.Medicine.Surgery.Procedures.OFNewVoice,
					canImplant: s => s.electrolarynx === 1,
					implantError: () => "",
				})
			]
		})],
	["hair",
		new App.Medicine.OrganFarm.Organ({
			name: "Hair Follicles", cost: 500, time: 2, displayMultipleActions: true,
			actions: [
				new App.Medicine.OrganFarm.OrganImplantAction({
					name: "Scalp",
					surgeryProcedure: App.Medicine.Surgery.Procedures.OFRestoreHairHead,
					canImplant: s => s.bald !== 0,
					implantError: () => "This slave already has hair.",
				}),
				/* So apparently hair is tracked via the .earTColor variable with no differential between possible hair origin. Not worth the variable, currently.
				new App.Medicine.OrganFarm.OrganImplantAction({
					name: "Ears", healthImpact: 5,
					surgeryType: "addHairEarsH", autoImplant: false,
					canImplant: s => (s.earTShape !== "normal"),
					implantError: "",
					implant: s => {
						s.earTColor = getGeneticHairColor(s);
					}
				}),
				*/
				new App.Medicine.OrganFarm.OrganImplantAction({
					name: "Brow", autoImplant: false,
					surgeryProcedure: App.Medicine.Surgery.Procedures.OFRestoreHairBrow,
					canImplant: s => s.eyebrowHStyle === "bald",
					implantError: () => "",
				}),
				new App.Medicine.OrganFarm.OrganImplantAction({
					name: "Axillary", autoImplant: false,
					surgeryProcedure: App.Medicine.Surgery.Procedures.OFRestoreHairPits,
					canImplant: s => s.underArmHStyle === "bald" || s.underArmHStyle === "hairless",
					implantError: () => "",
				}),
				new App.Medicine.OrganFarm.OrganImplantAction({
					name: "Pubic", autoImplant: false,
					surgeryProcedure: App.Medicine.Surgery.Procedures.OFRestoreHairPubes,
					canImplant: s => s.pubicHStyle === "bald" || s.pubicHStyle === "hairless",
					implantError: () => "",
				})
			]
		})],
	["mpreg",
		new App.Medicine.OrganFarm.AnalWomb({
			name: "Anal womb and ovaries", eggType: "human", pregData: "human",
		})],
	["mpregPig",
		new App.Medicine.OrganFarm.AnalWomb({
			name: "Anal pig womb and ovaries", eggType: "pig", pregData: "pig",
		})],
	["mpregDog",
		new App.Medicine.OrganFarm.AnalWomb({
			name: "Anal dog womb and ovaries", eggType: "dog", pregData: "canineM",
		})],
	["mpregHorse",
		new App.Medicine.OrganFarm.AnalWomb({
			name: "Anal horse womb and ovaries", eggType: "horse", pregData: "equine",
		})],
	["mpregCow",
		new App.Medicine.OrganFarm.AnalWomb({
			name: "Anal cow womb and ovaries", eggType: "cow", pregData: "cow",
		})],
]);
