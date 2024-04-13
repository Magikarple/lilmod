// cSpell:ignore glowy

App.UI.Player = {};

App.UI.Player.appearance = function(options, summary = false) {
	let option;

	options.addOption("Your nationality is", "nationality", V.PC).showTextBox()
		.addValueList(App.Data.misc.baseNationalities)
		.addComment("For best result capitalize it.").pulldown();

	options.addOption(`Your current ethnicity is`, "race", V.PC).showTextBox()
		.addValueList(Array.from(App.Data.misc.filterRacesBase, (k => [k[1], k[0]])));

	if (V.cheatMode) {
		options.addOption("Your original ethnicity is", "origRace", V.PC).showTextBox()
			.addValueList(Array.from(App.Data.misc.filterRacesBase, (k => [k[1], k[0]])));
	}

	options.addOption("You are genetically", "genes", V.PC)
		.addValue("XY").addValue("XX");

	if (V.PC.physicalAge >= 20) {
		options.addOption(`You are`, "height", V.PC.natural).showTextBox({unit: "cm"})
			.addRange(145, 150, "<", "Petite")
			.addRange(155, 160, "<", "Short")
			.addRange(165, 170, "<", "Average")
			.addRange(180, 185, "<", "Tall")
			.addRange(190, 185, ">=", "Very tall")
			.addComment(`Average height is ${heightToEitherUnit(Height.mean(V.PC))}`)
			.addGlobalCallback(() => V.PC.height = V.PC.natural.height);
	} else {
		options.addOption(`When full-grown, you will be`, "height", V.PC.natural).showTextBox({unit: "cm"})
			.addRange(145, 150, "<", "Petite")
			.addRange(155, 160, "<", "Short")
			.addRange(165, 170, "<", "Average")
			.addRange(180, 185, "<", "Tall")
			.addRange(190, 185, ">=", "Very tall");
	}
	option = options.addCustomOption()
		.addButton(
			"Make average",
			() => resyncSlaveHeight(V.PC),
			""
		);
	if (V.PC.physicalAge < 20) {
		options.addOption(`But right now, you are`, "height", V.PC).showTextBox({unit: "cm"})
			.addRange(Height.forAge(145, V.PC), Height.forAge(150, V.PC), "<", "Petite for your age")
			.addRange(Height.forAge(155, V.PC), Height.forAge(160, V.PC), "<", "Short for your age")
			.addRange(Height.forAge(165, V.PC), Height.forAge(170, V.PC), "<", "Average for your age")
			.addRange(Height.forAge(180, V.PC), Height.forAge(185, V.PC), "<", "Tall for your age")
			.addRange(Height.forAge(190, V.PC), Height.forAge(185, V.PC), ">=", "Very tall for your age")
			.addComment(`Average height for a ${V.PC.physicalAge} year old is ${heightToEitherUnit(Height.mean(V.PC))}`);
		option = options.addCustomOption()
			.addButton(
				"Scale for age from adult height",
				() => V.PC.height = Height.forAge(V.PC.natural.height, V.PC),
				""
			);
	}

	options.addOption("Your skin tone is", "skin", V.PC).showTextBox()
		.addValueList(makeAList(V.PC.race === "catgirl" ? App.Medicine.Modification.catgirlNaturalSkins : App.Medicine.Modification.naturalSkins));

	if (V.cheatMode) {
		options.addOption("Your genetic skin tone is", "origSkin", V.PC).showTextBox()
			.addValueList(makeAList(V.PC.race === "catgirl" ? App.Medicine.Modification.catgirlNaturalSkins : App.Medicine.Modification.naturalSkins));
	}

	if (V.cheatMode) {
		options.addOption("Your original hair is", "origHColor", V.PC).showTextBox()
			.addValueList(makeAList(App.Medicine.Modification.Color.Primary.map(color => color.value)));
	} else {
		options.addOption("Your hair is", "hColor", V.PC).showTextBox()
			.addValueList(makeAList(App.Medicine.Modification.Color.Primary.map(color => color.value)));
	}

	options.addOption("Your genetic eye color is", "origColor", V.PC.eye).showTextBox()
		.addValueList(makeAList(App.Medicine.Modification.eyeColor.map(color => color.value)));

	options.addOption("You", "vision", V.PC.eye.right)
		.addValueList([
			["Need glasses to see properly", 1, () => { V.PC.eye.right.vision = 1; V.PC.eye.left.vision = 1; }],
			["have normal vision", 2, () => { V.PC.eye.right.vision = 2; V.PC.eye.left.vision = 2; }]
		]);

	options.addOption("Your face is", "faceShape", V.PC)
		.addValueList([
			["Normal", "normal"],
			["Androgynous", "androgynous"],
			["Masculine", "masculine"],
			["Cute", "cute"],
			["Sensual", "sensual"],
			["Exotic", "exotic"]
		]);

	options.addOption("Your body", "markings", V.PC)
		.addValueList([["Is clear of blemishes", "none"], ["Has light freckling", "freckles"], ["Has heavy freckling", "heavily freckled"]]);

	if (V.PC.geneticQuirks.albinism === 2 || V.PC.skin === "pure white" || V.PC.eye.origColor === "red" || V.PC.hColor === "white") {
		options.addOption("You are", "albinism", V.PC.geneticQuirks)
			.addValueList([
				["An albino", 2],
				["Not an albino", 0],
			])
			.addGlobalCallback((val) => induceAlbinism(V.PC, val))
			.addComment("Once this is set, you may change your hair/eyes/skin without worry. You will generate as an albino.");
	}

	options.addOption("You have", "lips", V.PC).addValue("Thin lips", 5)
		.addValueList([
			["Normal lips", 15],
			["Kissable lips", 25],
			["Plush lips", 45],
		]);

	/* Handled by career currently
	options.addOption("You are", "weight", V.PC).addValue("Very thin", -50);
	options.addValueList([
		["Thin", -20],
		["Healthy", 0],
		["Curvy", 20],
		["Chubby", 60],
		["Fat", 100],
	])
	.showTextBox();
	*/

	option = options.addOption("Your shoulders are", "shoulders", V.PC).addValue("Very narrow", -2);
	option.addValueList([
		["Narrow", -1],
		["Average", 0],
	]);
	if (V.PC.physicalAge > 13) {
		option.addValue("Broad", 1);
	}
	if (V.PC.physicalAge > 18) {
		option.addValue("Very broad", 2);
	}

	options.addOption(`Your armpits`, "underArmHStyle", V.PC)
		.addValueList([["Are naturally hairless", "hairless"], ["Can grow hair", "neat"]]);

	if (V.PC.boobs >= 200 || summary) {
		if (V.PC.title === 1 && V.PC.boobs <= 200) {
			option = options.addOption("Your chest is", "boobs", V.PC).addValue("Manly", 200, () => { V.PC.boobsImplant = 0; V.PC.boobsImplantType = "none"; });
		} else {
			option = options.addOption("Your breasts are", "boobs", V.PC).addValue("Non-existent", 200, () => { V.PC.boobsImplant = 0; V.PC.boobsImplantType = "none"; });
		}
		option.addValueList([
			["A-cups", 300],
			["B-cups", 400],
			["C-cups", 500],
		]);
		if (V.PC.physicalAge <= 13) {
			option.addValueList([
				["hefty D-cups", 650],
				["heavy DD-cups", 900],
			]);
		} else {
			option.addValueList([
				["D-cups", 650],
				["DD-cups", 900],
				["F-cups", 1100],
				["G-cups", 1300]
			]);
		}
		option.showTextBox({unit: "CCs"});
		option.addCallback(() => V.PC.natural.boobs = V.PC.boobs);
		if (V.PC.boobs >= 500) {
			options.addOption("Your breasts are", "boobsImplant", V.PC)
				.addValueList([
					["All natural", 0, () => { V.PC.boobsImplant = 0; V.PC.boobsImplantType = "none"; }],
					["Fake", V.PC.boobs / 2, () => V.PC.boobsImplantType = "normal"]
				]);
		}
		if (V.PC.boobsImplant > 0) {
			option = options.addOption("You have", "boobsImplantType", V.PC).addValue("Regular implants", "normal");
			if (V.PC.boobsImplant > 400) {
				option.addValue("string implants", "string");
			}
			if (V.PC.boobsImplant > 600) {
				option.addValue("Fillable implants", "fillable");
			}
		}
		if (V.PC.boobs >= 300) {
			option = options.addOption("Your nipples are", "nipples", V.PC).addValue("Tiny", "tiny");
			option.addValue("Cute", "cute");
			if (V.PC.boobs >= 500) {
				option.addValue("Puffy", "puffy");
				option.addValue("Partially inverted", "partially inverted");
			}
			if (V.PC.boobs >= 1000) {
				option.addValue("Inverted", "inverted");
				option.addValue("Huge", "huge");
			}
		}
		if (V.PC.genes === "XY" && V.PC.boobs <= 200) {
			option = options.addOption("If you were a woman, there is no doubt your breasts would be", "boobs", V.PC.natural);
		} else if (V.PC.physicalAge < 18) {
			option = options.addOption("When you finish growing, you feel like your breasts would be", "boobs", V.PC.natural);
		} else {
			option = options.addOption("If you were to grow up all over again, your breasts would be", "boobs", V.PC.natural);
		}
		option.addValueList([
			["non-existent", 200],
			["A-cups", 300],
			["B-cups", 400],
			["C-cups", 500],
			["D-cups", 650],
			["DD-cups", 900],
			["F-cups", 1100],
			["G-cups", 1300],
			["H-cups", 1500],
			["I-cups", 1700],
			["J-cups", 2000]
		]);
		option.showTextBox({unit: "CCs"});
		option.addComment(`Your genetic breast size`);
	}

	option = options.addOption("Your hips are", "hips", V.PC).addValue("Very narrow", -2);
	option.addValueList([
		["Narrow", -1],
		["Average", 0],
	]);
	if (V.PC.physicalAge > 13) {
		option.addValue("Wide", 1);
	}
	if (V.PC.physicalAge > 18) {
		option.addValue("Very Wide", 2);
	}


	option = options.addOption("Your butt is", "butt", V.PC).addValue("Flat", 0, () => { V.PC.buttImplant = 0; V.PC.buttImplantType = "none"; });
	option.addValueList([
		["Small", 1],
		["Plump", 2],
		["Big", 3],
	]);
	if (V.PC.physicalAge > 13) {
		option.addValue("Huge", 4);
	}
	if (V.PC.physicalAge > 18) {
		option.addValueList([
			["Enormous", 5],
			["Gigantic", 6],
		]);
	}
	if (V.PC.butt >= 3) {
		options.addOption("Your ass is", "buttImplant", V.PC)
			.addValueList([
				["All natural", 0, () => V.PC.buttImplantType = "none"],
				["Fake", Math.round(V.PC.butt / 2), () => V.PC.buttImplantType = "normal"]
			]);
	}
	if (V.PC.buttImplant > 0) {
		option = options.addOption("You have", "buttImplantType", V.PC).addValue("Regular implants", "normal");
		if (V.PC.buttImplant > 1) {
			option.addValue("string implants", "string");
			option.addValue("Fillable implants", "fillable");
		}
	}

	if (V.PC.dick !== 0) {
		option = options.addOption("Your dick is", "dick", V.PC).addValue("Tiny", 1, () => V.PC.foreskin = 2);
		option.addValueList([
			["Small", 2, () => V.PC.foreskin = 3],
			["Average", 3, () => V.PC.foreskin = 3],
			["Big", 4, () => V.PC.foreskin = 4],
		]);
		if (V.PC.physicalAge > 13) {
			option.addValue("Huge", 5, () => V.PC.foreskin = 5);
		}
		if (V.PC.physicalAge > 18) {
			option.addValue("Gigantic", 6, () => V.PC.foreskin = 5);
		}
		options.addOption("You are", "foreskin", V.PC)
			.addValueList([
				["Cut", 0],
				["Uncut", V.PC.dick]
			])
			.showTextBox()
			.addComment("Any value above 0 is uncircumcised. For comfort, keep equal or one greater than dick size.");
	}

	if (V.PC.balls !== 0) {
		option = options.addOption("Your balls are", "balls", V.PC).addValue("Small", 2, () => V.PC.scrotum = 2);
		option.addValueList([
			["Average", 3, () => V.PC.scrotum = 4],
			["Large", 4, () => V.PC.scrotum = 5],
		]);
		if (V.PC.physicalAge > 13) {
			option.addValue("Huge", 5, () => V.PC.scrotum = 5);
		}
		if (V.PC.physicalAge > 18) {
			option.addValue("Massive", 6, () => V.PC.scrotum = 6);
		}
		option.addComment("Small balls may be located internally.");
		if (V.PC.balls <= 2) {
			options.addOption("Your balls are", "scrotum", V.PC)
				.addValueList([
					["Internal", 0],
					["External", V.PC.balls]
				])
				.showTextBox()
				.addComment("Any value above 0 is external. For comfort, keep equal or one greater than ball size.");
		}
		if (V.PC.physicalAge < 14) {
			options.addOption("You are", "pubertyXY", V.PC)
				.addValueList([["Not producing potent sperm yet", 0], ["Producing potent sperm", 1]]);
		}
		if (V.PC.pubertyXY === 1) {
			options.addOption("You went through puberty when you were", "pubertyAgeXY", V.PC).showTextBox({unit: "years old."});
		}
	}

	if (V.PC.vagina !== -1) {
		if (V.PC.dick === 0 && V.PC.physicalAge > 13) {
			options.addOption("Your clit is", "clit", V.PC)
				.addValueList([["Normal", 0], ["Large", 1], ["Huge", 2]]);
			options.addOption("It is", "foreskin", V.PC)
				.addValueList([["Exposed by a circumcision", 0], ["Covered by a hood", 1]]);
		}
		if (V.PC.physicalAge <= 18) {
			options.addOption("You are", "vagina", V.PC)
				.addValueList([["A virgin", 0], ["Not a virgin", 1]]);
			if (V.PC.physicalAge < 14 && V.PC.preg <= 0) {
				options.addOption("You have", "pubertyXX", V.PC)
					.addValueList([["Not had your first period", 0], ["Had your first period", 1]]);
			}
		}
		if (V.PC.pubertyXX === 1) {
			options.addOption(`You ${V.PC.pubertyXY === 1 ? "had your first period" : "went through puberty"} when you were`, "pubertyAgeXX", V.PC).showTextBox({unit: "years old."});
		}
	}

	options.addOption(`You`, "pubicHStyle", V.PC)
		.addValueList([["Are naturally hairless", "hairless"], ["Can grow pubic hair", "neat"]]);

	options.addOption(`Your pubic hair ${V.PC.physicalAge >= Math.min(V.PC.pubertyAgeXX, V.PC.pubertyAgeXY) - 2 && !["bald", "hairless", "waxed"].includes(V.PC.pubicHStyle) ? "is" : "would be"}`, "pubicHColor", V.PC).showTextBox()
		.addValueList(makeAList(App.Medicine.Modification.Color.Primary.map(color => color.value)))
		.addValue("Match the drapes", V.PC.hColor);

	options.addOption("You are", "anus", V.PC)
		.addValueList([["An anal virgin", 0], ["Not an anal virgin", 1]]);

	function makeAList(iterable) {
		return Array.from(iterable, (k => [capFirstChar(k), k]));
	}
};

App.UI.Player.syncAgeBasedParameters = function() {
	V.PC.actualAge = Math.clamp(V.PC.actualAge, 10, 80);
	V.PC.physicalAge = V.PC.actualAge;
	V.PC.visualAge = V.PC.actualAge;
	V.PC.ovaryAge = V.PC.actualAge;
	V.PC.height = Height.forAge(V.PC.natural.height, V.PC);
	if (V.PC.genes === "XY") {
		if (V.PC.physicalAge <= 13) {
			V.PC.hips = -2;
			V.PC.shoulders = -1;
			V.PC.butt = 0;
			V.PC.boobs = 100;
			if (V.PC.vagina !== -1) {
				V.PC.vagina = 0;
				V.PC.vaginaLube = 0;
				if (V.PC.preg <= 0) {
					V.PC.pubertyXX = 0;
				}
			}
			V.PC.pregAdaptation = 10;
			if (V.PC.dick !== 0) {
				V.PC.dick = 2;
				V.PC.balls = 2;
				V.PC.scrotum = V.PC.balls + 1;
				V.PC.foreskin = V.PC.dick;
				V.PC.pubertyXY = 0;
			}
		} else if (V.PC.physicalAge <= 18) {
			V.PC.hips = -2;
			V.PC.shoulders = 0;
			V.PC.butt = 1;
			V.PC.boobs = 200;
			if (V.PC.vagina !== -1) {
				V.PC.vagina = 1;
				V.PC.vaginaLube = 0;
				V.PC.pubertyXX = 1;
			}
			V.PC.pregAdaptation = 15;
			if (V.PC.dick !== 0) {
				V.PC.dick = 3;
				V.PC.balls = 3;
				V.PC.scrotum = V.PC.balls;
				V.PC.foreskin = V.PC.dick;
				V.PC.pubertyXY = 1;
			}
		} else {
			V.PC.hips = -1;
			V.PC.shoulders = 1;
			V.PC.butt = 2;
			V.PC.boobs = 200;
			if (V.PC.vagina !== -1) {
				V.PC.vagina = 1;
				V.PC.vaginaLube = 1;
				V.PC.pubertyXX = 1;
			}
			V.PC.pregAdaptation = 20;
			if (V.PC.dick !== 0) {
				V.PC.dick = 4;
				V.PC.balls = 3;
				V.PC.scrotum = V.PC.balls + 1;
				V.PC.foreskin = V.PC.dick;
				V.PC.pubertyXY = 1;
			}
		}
	} else {
		if (V.PC.physicalAge <= 13) {
			V.PC.hips = -2;
			V.PC.shoulders = -2;
			V.PC.butt = 0;
			V.PC.boobs = 350;
			if (V.PC.vagina !== -1) {
				V.PC.vagina = 0;
				V.PC.vaginaLube = 0;
				if (V.PC.preg <= 0) {
					V.PC.pubertyXX = 0;
				}
			}
			V.PC.pregAdaptation = 30;
			if (V.PC.dick !== 0) {
				V.PC.dick = 2;
				V.PC.balls = 2;
				V.PC.scrotum = V.PC.balls + 1;
				V.PC.foreskin = V.PC.dick;
				V.PC.pubertyXY = 0;
			}
		} else if (V.PC.physicalAge <= 18) {
			V.PC.hips = 0;
			V.PC.shoulders = -1;
			V.PC.butt = 1;
			V.PC.boobs = 600;
			if (V.PC.vagina !== -1) {
				V.PC.vagina = 1;
				V.PC.vaginaLube = 1;
				V.PC.pubertyXX = 1;
			}
			V.PC.pregAdaptation = 50;
			if (V.PC.dick !== 0) {
				V.PC.dick = 3;
				V.PC.balls = 3;
				V.PC.scrotum = V.PC.balls;
				V.PC.foreskin = V.PC.dick;
				V.PC.pubertyXY = 1;
			}
		} else {
			V.PC.hips = 1;
			V.PC.shoulders = 0;
			V.PC.butt = 2;
			V.PC.boobs = 900;
			if (V.PC.vagina !== -1) {
				V.PC.vagina = 1;
				V.PC.vaginaLube = 1;
				V.PC.pubertyXX = 1;
			}
			V.PC.pregAdaptation = 50;
			if (V.PC.dick !== 0) {
				V.PC.dick = 4;
				V.PC.balls = 3;
				V.PC.scrotum = V.PC.balls + 1;
				V.PC.foreskin = V.PC.dick;
				V.PC.pubertyXY = 1;
			}
		}
		if (V.PC.dick === 0 && V.PC.vagina >= 0) {
			V.PC.foreskin = V.PC.clit + 1;
		}
		if (V.PC.boobs < 250) {
			V.PC.nipples = "tiny";
		} else if (V.PC.boobs < 1000) {
			V.PC.nipples = "cute";
		} else {
			V.PC.nipples = "puffy";
		}
	}
};

App.UI.Player.assignCareerByAge = function(selection) {
	let career;

	if (V.disableForcedCareers) {
		career = selection;
	} else {
		for (const data of App.Data.player.career.values()) {
			if (Object.values(data).includes(selection)) {
				if (V.PC.actualAge <= 13) {
					career = data.child;
				} else if (V.PC.actualAge <= 21) {
					career = data.apprentice;
				}
				career = career || data.master;
			}
		}
	}

	V.disableForcedCareers = null;

	return career;
};

App.UI.Player.refreshmentChoice = function(options) {
	let option = options.addOption("Your preferred refreshment is", "refreshmentType", V.PC);
	for (const [key, value] of App.Data.player.refreshmentType) {
		option.addValue(value.name, key, () => { V.PC.refreshment = value.suggestions.values().next().value; } );
	}
	let comment = `Flavor only; no mechanical effect. If entering a custom refreshment, please assign proper usage.`;
	if (V.PC.refreshmentType === 0) {
		comment += ` "Smoked" must fit into the following sentence: "I smoked a ${V.PC.refreshment}" to fit events properly.`;
	} else if (V.PC.refreshmentType === 5) {
		comment += ` "Popped" must fit into the following sentence: "I shook the bottle of ${V.PC.refreshment}" to fit events properly.`;
	} else if (V.PC.refreshmentType === 6) {
		comment += ` "Orally Dissolved" must fit into the following sentence: "I placed a tab of ${V.PC.refreshment} under my tongue" to fit events properly.`;
	}
	option.addComment(comment);

	option = options.addOption("Specifically", "refreshment", V.PC).showTextBox().pulldown();
	for (const refreshment of App.Data.player.refreshmentType.get(V.PC.refreshmentType).suggestions) {
		option.addValue(capFirstChar(refreshment), refreshment);
	}
};

App.UI.Player.names = function(options) {
	options.addCustomOption(`Everyone calls you <b>${PlayerName()}.</b>`);
	options.addOption("Your given name is", "slaveName", V.PC).showTextBox();

	if (V.cheatMode) {
		options.addOption("Birth Name", "birthName", V.PC).showTextBox();
	}

	if (V.PC.slaveSurname === 0) {
		options.addOption("And no surname", "slaveSurname", V.PC)
			.addValue("Add a surname", "Anon")
			.addComment("Surnames cannot be changed during the game outside of special circumstances.");
	} else {
		options.addOption("And your surname is", "slaveSurname", V.PC).showTextBox()
			.addValue("Go by a single name", 0)
			.addComment("Surnames cannot be changed during the game outside of special circumstances.");
		if (V.cheatMode) {
			options.addOption("Birth Surname", "birthSurname", V.PC).showTextBox();
		}
	}
};

App.UI.Player.design = function() {
	const el = new DocumentFragment();
	let options = new App.UI.OptionsGroup();
	let option;
	let r;
	let linkArray;
	const allowEdits = (V.freshPC === 1 || V.saveImported === 0 || V.cheatMode);

	// Title / age
	if (allowEdits) {
		options.addOption("You are a", "title", V.PC)
			.addValue("Masculine Master", 1, () => V.PC.genes = "XY").addValue("Feminine Mistress", 0, () => V.PC.genes = "XX");

		App.UI.Player.names(options);

		V.PC.physicalAge = V.PC.actualAge;
		V.PC.visualAge = V.PC.actualAge;
		V.PC.ovaryAge = V.PC.actualAge;
		if (V.cheatMode) {
			options.addOption("Actual Age", "actualAge", V.PC).showTextBox();
			options.addOption("Physical Age", "physicalAge", V.PC).showTextBox();
			options.addOption("Visual Age", "visualAge", V.PC).showTextBox();
			options.addOption("Ovary Age", "ovaryAge", V.PC).showTextBox();
			options.addOption("Age Implant", "ageImplant", V.PC).addValue("Age altering surgery", 1).on().addValue("No surgery", 0).off();
		} else {
			options.addOption("You are", "actualAge", V.PC).showTextBox()
				.addRange(25, 35, "<", "Surprisingly young").addRange(40, 50, "<", "Entering middle age")
				.addRange(55, 65, "<", "Well into middle age").addRange(70, 65, ">=", "Old");

			options.addOption(`Your birthday was <strong>${V.PC.birthWeek}</strong> weeks ago.`, "birthWeek", V.PC).showTextBox();
			option = options.addCustomOption()
				.addButton(
					"Adjust body to match age",
					() => App.UI.Player.syncAgeBasedParameters(),
					""
				);
		}
	} else {
		r = [];
		r.push(`You are a`);
		if (V.PC.title === 1) {
			r.push(`masculine <strong>Master</strong>`);
		} else {
			r.push(`feminine <strong>Mistress</strong>`);
		}
		r.push(`and everyone that matters calls you	${PlayerName()}.`);

		r.push(`You are ${V.PC.actualAge} years old, which is`);
		if (V.PC.actualAge >= 65) {
			r.push(`<strong>old</strong>.`);
		} else if (V.PC.actualAge >= 50) {
			r.push(`<strong>well into middle age</strong>.`);
		} else if (V.PC.actualAge >= 35) {
			r.push(`<strong>entering middle age</strong>.`);
		} else if (V.PC.actualAge >= 22) {
			r.push(`<strong>surprisingly young</strong>.`);
		} else if (V.PC.actualAge >= 14) {
			r.push(`<strong>exceedingly young</strong>.`);
		} else {
			r.push(`<strong>merely a child</strong>.`);
		}
		App.Events.addNode(el, r, "p");
	}

	option = options.addOption("Player aging is", "playerAging")
		.addValue("Enabled", 2).on().addValue("Celebrate birthdays, but don't age.", 1).addValue("Disabled", 0).off();
	if (!V.cheatMode) {
		option.addComment("This option cannot be changed during the game.");
	}

	if (V.PC.customTitle) {
		options.addOption("Custom title", "customTitle", V.PC).showTextBox()
			.addValue("Reset to default", "", () => {
				delete V.PC.customTitle;
				delete V.PC.customTitleLisp;
			});

		options.addOption("Lisped custom title", "customTitleLisp", V.PC).showTextBox()
			.addComment('If using a custom title, select Master or Mistress to set the gender of your title. Make sure to replace your "s"s with "th"s to have working lisps in your lisped title.');
	} else {
		options.addCustomOption("Custom title")
			.addButton("Set custom title", () => {
				V.PC.customTitle = "Master";
				V.PC.customTitleLisp = 'Mather';
			});
	}

	// Appearance
	if (allowEdits) {
		if (V.PC.vagina !== -1 && V.PC.dick !== 0) {
			State.temporary.vaginaPenis = 2;
		} else if (V.PC.vagina !== -1) {
			State.temporary.vaginaPenis = 1;
		} else {
			State.temporary.vaginaPenis = 0;
		}

		option = options.addOption("You have a", "vaginaPenis", State.temporary)
			.addValue("Penis", 0, () => {
				V.PC.preg = 0;
				V.PC.pregType = 0;
				V.PC.dick = 4;
				V.PC.balls = 3;
				V.PC.scrotum = 3;
				V.PC.prostate = 1;
				V.PC.vagina = -1;
				V.PC.ovaries = 0;
			}).addValue("Vagina", 1, () => {
				V.PC.dick = 0;
				V.PC.balls = 0;
				V.PC.scrotum = 0;
				V.PC.prostate = 0;
				V.PC.vagina = 1;
				V.PC.ovaries = 1;
			}).addValue("Penis and Vagina", 2, () => {
				V.PC.dick = 4;
				V.PC.balls = 3;
				V.PC.scrotum = 3;
				V.PC.prostate = 1;
				V.PC.vagina = 1;
				V.PC.ovaries = 1;
			});
		if (State.temporary.vaginaPenis === 0) {
			option.addComment("Standard sex scenes; easiest reputation maintenance.");
		} else if (State.temporary.vaginaPenis === 1) {
			option.addComment("Sex scene variations; most difficult reputation maintenance.");
		} else {
			option.addComment("Sex scene variations; more difficult reputation maintenance; some unique opportunities, especially with breasts.");
		}
		App.UI.Player.appearance(options, true);
	} else {
		r = [];

		r.push(`You are a ${heightToEitherUnit(V.PC.height)} tall ${V.PC.nationality} ${V.PC.race} with`);
		if (V.PC.markings === "heavily freckled") {
			r.push(`heavily freckled`);
		} else if (V.PC.markings === "freckles") {
			r.push(`lightly freckled`);
		} else {
			r.push(`clear`);
		}
		r.push(`${V.PC.skin} skin, ${V.PC.hColor} hair and ${App.Desc.eyesColor(V.PC)}. You have a ${V.PC.faceShape}`);
		if (V.PC.lips > 95) {
			r.push(`face with way too much lip; you can't shut your mouth properly anymore.`);
		} else if (V.PC.lips > 70) {
			r.push(`face with truly massive lips.`);
		} else if (V.PC.lips > 40) {
			r.push(`face with plump lips.`);
		} else if (V.PC.lips > 20) {
			r.push(`face with full lips.`);
		} else {
			r.push(`face.`);
		}
		App.Events.addNode(el, r, "p");
	}

	// Refresh
	App.UI.Player.refreshmentChoice(options);

	// History
	if (allowEdits) {
		option = options.addOption("Before you came to the Free Cities, you were a", "career", V.PC);
		// option.addValue("Test subject", "test subject");
		if (V.PC.career === "arcology owner") {
			option.addValue("Arcology owner", "arcology owner");
		} else {
			option.addValueList([
				["Member of the idle wealthy", "wealth"],
				["Business leader", "capitalist"],
				["Mercenary", "mercenary"],
				["Slaver", "slaver"],
				["Engineer", "engineer"],
				["Doctor", "medicine"],
				["Hacker", "BlackHat"],
				["Minor celebrity", "celebrity"],
				["Escort", "escort"],
				["Servant", "servant"],
				["Gang leader", "gang"]]
			);
			if (PCCareerTier() === "child") {
				option.addValueList([
					["Kid with a lot of money", "rich kid"],
					["Business kid", "business kid"],
					["Child soldier", "child soldier"],
					["Slave tender", "slave tender"],
					["Worksite helper", "worksite helper"],
					["Nurse", "nurse"],
					["Wannabe hacker", "script kiddy"],
					["Child star", "child star"],
					["Child prostitute", "child prostitute"],
					["Child servant", "child servant"],
					["Street urchin", "street urchin"]]
				);
			} else if (PCCareerTier() === "apprentice") {
				option.addValueList([
					["Trust funder", "trust fund"],
					["Entrepreneur", "entrepreneur"],
					["Mercenary recruit", "recruit"],
					["Slaver overseer", "slave overseer"],
					["Construction worker", "construction"],
					["Medical assistant", "medical assistant"],
					["Minor hacker", "hacker"],
					["Rising star", "rising star"],
					["Prostitute", "prostitute"],
					["Handmaiden", "handmaiden"],
					["Hoodlum", "hoodlum"]]
				);
			}
			option = options.addCustomOption("")
				.addButton(
					"Adjust career for age",
					() => V.PC.career = App.UI.Player.assignCareerByAge(V.PC.career),
					""
				);
			if (V.secExpEnabled > 0) {
				if (isPCCareerInCategory("capitalist")) {
					option.addComment(`<div><span class="yellowgreen">The propaganda hub's upgrades will be cheaper.</span></div>`);
				} else if (isPCCareerInCategory("mercenary")) {
					option.addComment(`<div><span class="positive">Easier to maintain security</span> and <span class="yellowgreen">the security HQ's upgrades will be cheaper.</span></div>`);
				} else if (isPCCareerInCategory("slaver")) {
					option.addComment(`<div><span class="positive">Easier to maintain authority</span> and <span class="yellowgreen">the security HQ's upgrades will be cheaper.</span></div>`);
				} else if (isPCCareerInCategory("engineer")) {
					option.addComment(`<div><span class="yellowgreen">construction and upgrade of facilities will be cheaper.</span></div>`);
				} else if (isPCCareerInCategory("medicine")) {
					option.addComment(`<div><span class="yellowgreen">Drug upgrades will be cheaper.</span></div>`);
				} else if (isPCCareerInCategory("celebrity")) {
					option.addComment(`<div><span class="yellowgreen">The propaganda hub's upgrades will be cheaper.</span></div>`);
				} else if (isPCCareerInCategory("escort")) {
					option.addComment(`<div><span class="red">Harder to maintain authority.</span></div>`);
				} else if (isPCCareerInCategory("servant")) {
					option.addComment(`<div><span class="red">Harder to maintain authority.</span></div>`);
				} else if (isPCCareerInCategory("gang")) {
					option.addComment(`<div><span class="positive">Easier to maintain authority</span> and <span class="yellowgreen">the security HQ's upgrades will be cheaper.</span></div>`);
				} else if (isPCCareerInCategory("BlackHat")) {
					option.addComment(`<div><span class="red">Harder to maintain authority.</span></div>`);
				} else {
					option.addComment(`<div><span class="red">Harder to maintain authority,</span> but <span class="yellowgreen">the propaganda hub's upgrades will be cheaper.</span></div>`);
				}
			}
		}

		options.addOption("It is rumored that you acquired your arcology through", "rumor", V.PC)
			.addValueList([
				["Wealth", "wealth"],
				["Hard work", "diligence"],
				["Force", "force"],
				["Social engineering", "social engineering"],
				["Blind luck", "luck"]
			]);

		el.append(options.render());
	} else {
		r = [];
		switch (V.PC.career) {
			case "wealth":
			case "trust fund":
			case "rich kid":
				r.push(`Prior to being an arcology owner, you were a member of the idle wealthy.`);
				break;
			case "capitalist":
				r.push(`Prior to being an arcology owner, you were a business leader.`);
				break;
			case "entrepreneur":
			case "business kid":
				r.push(`Prior to being an arcology owner, you were a cunning entrepreneur.`);
				break;
			case "mercenary":
			case "recruit":
				r.push(`Prior to being an arcology owner, you were a mercenary.`);
				break;
			case "child soldier":
				r.push(`Prior to being an arcology owner, you were a disposable conscript.`);
				break;
			case "slaver":
			case "slave overseer":
				r.push(`Prior to being an arcology owner, you were a slaver.`);
				break;
			case "slave tender":
				r.push(`Prior to being an arcology owner, you were a slaver tasked with looking after fresh captures.`);
				break;
			case "engineer":
				r.push(`Prior to being an arcology owner, you were an engineer.`);
				break;
			case "construction":
			case "worksite helper":
				r.push(`Prior to being an arcology owner, you built buildings.`);
				break;
			case "medicine":
				r.push(`Prior to being an arcology owner, you were a surgeon.`);
				break;
			case "medical assistant":
				r.push(`Prior to being an arcology owner, you assisted with surgeries.`);
				break;
			case "nurse":
				r.push(`Prior to being an arcology owner, you were a nurse.`);
				break;
			case "celebrity":
				r.push(`Prior to being an arcology owner, you were a minor celebrity.`);
				break;
			case "rising star":
				r.push(`Prior to being an arcology owner, you were an up-and-coming star.`);
				break;
			case "child star":
				r.push(`Prior to being an arcology owner, you were a child actor.`);
				break;
			case "BlackHat":
			case "hacker":
			case "script kiddy":
				r.push(`Prior to being an arcology owner, you specialized in cracking databases and making mockeries of cyber security.`);
				break;
			case "arcology owner":
				r.push(`Being an arcology owner defines your life now.`);
				break;
			case "escort":
			case "prostitute":
				r.push(`Prior to being an arcology owner, you knew how to survive off your looks and body.`);
				break;
			case "child prostitute":
				r.push(`Prior to being an arcology owner, you had no choice but to sell your body to survive.`);
				break;
			case "servant":
			case "handmaiden":
			case "child servant":
				r.push(`Prior to being an arcology owner, you served a well-off`);
				if (V.PC.counter.birthMaster >= 8) {
					r.push(`master as his breeder.`);
				} else if (V.PC.counter.birthMaster >= 2) {
					r.push(`master and bore him several children.`);
				} else if (V.PC.counter.birthMaster >= 1) {
					r.push(`master and bore him a child.`);
				} else {
					r.push(`master.`);
				}
				break;
			case "gang":
				r.push(`Prior to being an arcology owner, you were the leader of a ruthless gang.`);
				break;
			case "hoodlum":
				r.push(`Prior to being an arcology owner, you were a troublemaker in a gang.`);
				break;
			case "street urchin":
				r.push(`Prior to being an arcology owner, you lived a hard life on the streets.`);
				break;
		}

		r.push(`Word in the arcology is you acquired it through`);
		switch (V.PC.rumor) {
			case "wealth":
				r.push(`a rather ridiculous amount of money.`);
				break;
			case "diligence":
				r.push(`sheer effort.`);
				break;
			case "force":
				r.push(`brutal force.`);
				break;
			case "social engineering":
				r.push(`clever social manipulation.`);
				break;
			case "luck":
				r.push(`blind luck.`);
				break;
		}
		App.Events.addNode(el, r, "p");
	}

	// Sexuality
	App.UI.DOM.appendNewElement("h2", el, "Sexuality");

	if (allowEdits) {
		options = new App.UI.OptionsGroup();

		// obsolete?
		if (V.cheatMode) {
			options.addOption("Vagina", "vagina", V.PC).showTextBox();
			options.addOption("New vagina", "newVag", V.PC).showTextBox();
			options.addOption("Dick", "dick", V.PC).showTextBox();
			options.addOption("Balls", "balls", V.PC).addValueList([
				["Normal", 3],
				["Big", 5],
				["Huge", 9],
				["Monstrous", 30]
			])
				.showTextBox();
			options.addOption("Balls implant", "ballsImplant", V.PC).showTextBox();
		}

		if (V.PC.vagina !== -1 && V.PC.pubertyXX === 1) {
			option = options.addOption("You are", "preg", V.PC)
				.addValue("Taking contraceptives", -1, () => { V.PC.pregType = 0; V.PC.labor = 0; })
				.addValue("Not taking contraceptives", 0, () => { V.PC.pregType = 0; V.PC.labor = 0; })
				.addRange(16, 37, "<=", "Pregnant").addCallback(() => { V.PC.pregType = 1; V.PC.labor = 0; })
				.addRange(40, 42, "<=", "Ready to drop").addCallback(() => { V.PC.pregType = 1; V.PC.labor = 0; })
				.addRange(43, 42, ">", "Ready to drop with octuplets").addCallback(() => { V.PC.pregType = 8; V.PC.labor = 1; });
			const r =[];
			if (V.cheatMode) {
				option.showTextBox();
				r.push(`How far along your pregnancy is (pregMood kicks in at 24+ weeks) - -2: infertile, -1: contraceptives, 0: not pregnant, 1 - 42: pregnant, 43+: giving birth.`);
			}
			if (V.PC.preg === -1) {
				r.push("You can't get pregnant, however there will be a slight increase to living expenses.");
			}

			if (V.PC.counter.birthsTotal > 0) {
				r.push(`You have given birth to <strong>${V.PC.counter.birthsTotal}</strong> babies.`);
			}
			if (r.length >0) {
				option.addComment(r.join(" "));
			}

			option = options.addOption("Hormone effects", "pregMood", V.PC)
				.addValueList([
					["None", 0],
					["Caring and motherly", 1],
					["Aggressive and domineering", 2]
				]);
			if (V.PC.pregMood === 1) {
				option.addComment("Sex scene alterations; slaves will trust you more, but may try to take advantage of your mercy.");
			} else if (V.PC.pregMood === 2) {
				option.addComment("Sex scene alterations; slaves will fear you more, but will become more submissive to you.");
			}

			if (V.cheatMode) {
				options.addOption("Fetus Count", "pregType", V.PC).showTextBox().addComment(`how many you're having (1-8)`);
				options.addOption("Pregnancy Source", "pregSource", V.PC)
					.addValueList([
						["Unknown", 0],
						["Self-impregnation", -1],
						["Citizen", -2],
						["Former Master", -3],
						["Male arc owner", -4],
						["Client", -5],
						["Societal Elite", -6],
						["Designer baby", -7],
						["Futanari Sister", -9],
						["Rapist", -10],
					])
					.showTextBox();
			}
		}

		el.append(options.render());
	} else {
		r = [];

		if (V.PC.boobs >= 300) {
			r.push(`You have a`);
			if (V.PC.title > 0) {
				r.push(`masculine`);
			} else {
				r.push(`feminine`);
			}
			r.push(`body with`);
			if (V.PC.shoulders > 1) {
				r.push(`very broad shoulders`);
			} else if (V.PC.shoulders > 0) {
				r.push(`broad shoulders`);
			} else if (V.PC.shoulders < -1) {
				r.push(`very narrow shoulders`);
			} else if (V.PC.shoulders < 0) {
				r.push(`narrow shoulders`);
			}
			if (V.PC.shoulders !== 0) {
				r.push(`and`);
			}
			let breastShapeDesc = "";
			if (V.PC.boobShape === "saggy") {
				breastShapeDesc = ` that sag a bit`;
			} else if (V.PC.boobShape === "spherical") {
				breastShapeDesc = ` that might just be a little too much implant now.`;
			}
			if (V.PC.boobs >= 1400) {
				r.push(`giant${(V.PC.boobsImplant !== 0) ? `, fake` : ``} cow tits${breastShapeDesc}.`);
			} else if (V.PC.boobs >= 1200) {
				r.push(`huge`);
				if (V.PC.boobsImplant !== 0) {
					r.push(`fake`);
				}
				r.push(`breasts${breastShapeDesc}.`);
			} else if (V.PC.boobs >= 1000) {
				r.push(`big`);
				if (V.PC.boobsImplant !== 0) {
					r.push(`fake`);
				}
				r.push(`breasts${breastShapeDesc}.`);
			} else if (V.PC.boobs >= 800) {
				r.push(`noticeable breasts${breastShapeDesc}.`);
			} else if (V.PC.boobs >= 650) {
				r.push(`unremarkable breasts${breastShapeDesc}.`);
			} else if (V.PC.boobs >= 500) {
				r.push(`average breasts${breastShapeDesc}.`);
			} else {
				r.push(`small breasts${breastShapeDesc}.`);
			}
		} else {
			if (V.PC.title > 0) {
				r.push(`You have a manly chest.`);
			} else {
				r.push(`You are flat as a board.`);
			}
		}
		r.push(`Around back, you have`);
		if (V.PC.butt > 10) {
			r.push(`a disproportionate swelling of flesh`);
		} else if (V.PC.butt > 7) {
			r.push(`an absurdly large butt`);
		} else if (V.PC.butt > 6) {
			r.push(`a ridiculous ass`);
		} else if (V.PC.butt > 5) {
			r.push(`a gigantic ass`);
		} else if (V.PC.butt > 4) {
			r.push(`an enormous ass`);
		} else if (V.PC.butt > 3) {
			r.push(`a huge ass`);
		} else if (V.PC.butt > 2) {
			r.push(`a big butt`);
		} else if (V.PC.butt > 1) {
			r.push(`a shapely rear`);
		} else if (V.PC.butt > 0) {
			r.push(`a trim rear`);
		} else {
			r.push(`a flat ass`);
		}
		r.push(`attached to a pair of`);
		if (V.PC.hips > 2) {
			r.push(`inhumanly wide hips.`);
		} else if (V.PC.hips > 1) {
			r.push(`very wide hips.`);
		} else if (V.PC.hips > 0) {
			r.push(`wide hips.`);
		} else if (V.PC.hips > -1) {
			r.push(`average hips.`);
		} else if (V.PC.hips > -2) {
			r.push(`narrow hips.`);
		} else {
			r.push(`very narrow hips.`);
		}

		r.push(`Between your legs, you have`);
		if (V.PC.dick !== 0) {
			if (V.PC.dick === 1) {
				r.push(`a tiny, humiliating`);
			} else if (V.PC.dick === 2) {
				r.push(`a small`);
			} else if (V.PC.dick === 3) {
				r.push(`an average`);
			} else if (V.PC.dick === 4) {
				r.push(`a big`);
			} else if (V.PC.dick === 5) {
				r.push(`a huge`);
			} else if (V.PC.dick === 6) {
				r.push(`a pussy wrecking`);
			} else if (V.PC.dick === 7) {
				r.push(`a massive, unusable`);
			} else if (V.PC.dick === 8) {
				r.push(`an imposing, if unusable,`);
			} else if (V.PC.dick === 9) {
				r.push(`a monster of a`);
			} else if (V.PC.dick === 10) {
				r.push(`an inhuman`);
			} else {
				r.push(`an unusable slab of sensitive flesh you call a`);
			}
			r.push(`dick`);
			if (V.PC.balls !== 0) {
				r.push(r.pop() + ",");
			}
			if (V.PC.balls === 1) {
				if (V.PC.scrotum === 0) {
					r.push(`a tiny pair of internal balls`);
				} else {
					r.push(`vestigial testicles`);
				}
			} else if (V.PC.balls === 2) {
				if (V.PC.scrotum === 0) {
					r.push(`a pair of internal balls`);
				} else {
					r.push(`a pair of small testicles`);
				}
			} else if (V.PC.balls === 3) {
				r.push(`a pair of average testicles`);
			} else if (V.PC.balls === 4) {
				r.push(`a dangling pair of large balls`);
			} else if (V.PC.balls === 5) {
				r.push(`a dangling pair of heavy testicles`);
			} else if (V.PC.balls === 6) {
				r.push(`a heavy pair of huge balls`);
			} else if (V.PC.balls === 7) {
				r.push(`a ponderous set of giant testicles`);
			} else if (V.PC.balls === 8) {
				r.push(`a ponderous set of enormous testicles`);
			} else if (V.PC.balls === 9) {
				r.push(`a monstrous pair of testicles`);
			} else {
				r.push(`an inhuman pair of testicles`);
			}
			if (V.PC.vagina !== -1) {
				r.push(`and`);
			} else {
				r.push(r.pop() + ".");
			}
		}
		if (V.PC.vagina !== -1) {
			if (V.PC.vagina === 0) {
				r.push(`an unsullied`);
			} else if (V.PC.vagina === 1 || V.PC.newVag === 1) {
				// nothing
			} else if (V.PC.vagina === 2) {
				r.push(`an experienced`);
			} else if (V.PC.vagina === 3) {
				r.push(`a loose`);
			} else if (V.PC.vagina === 4) {
				r.push(`a very well-traveled`);
			} else {
				r.push(`a ruined`);
			}
			r.push(`vagina.`);
		}
		if (V.PC.vagina !== -1 && V.PC.mpreg !== 0) {
			r.push(`You are`);
			if (V.PC.pregWeek < 0) {
				r.push(`currently recovering from your last pregnancy.`);
			} else if (V.PC.preg === -2) {
				r.push(`infertile and can't get pregnant.`);
			} else if (V.PC.preg === -1) {
				r.push(`taking contraceptives to avoid potential pregnancy.`);
			} else if (V.PC.preg === 0) {
				if (V.PC.pubertyXX === 0) {
					r.push(`not yet fertile.`);
				} else {
					r.push(`fertile and capable of becoming pregnant.`);
				}
			} else if (V.PC.preg > 37) {
				r.push(`extremely pregnant and likely to give birth soon.`);
			} else if (V.PC.preg > 0) {
				r.push(`currently pregnant.`);
			}

			linkArray = [];
			if (V.PC.preg > 20 || V.PC.counter.birthsTotal > 0) {
				if (V.PC.pregMood === 1) {
					r.push(`You tend to be caring and motherly when you're pregnant.`);
					linkArray.push(noChange(), aggressive());
				} else if (V.PC.pregMood === 0) {
					r.push(`Pregnancy doesn't really affect your mood.`);
					linkArray.push(motherly(), aggressive());
				} else {
					r.push(`You tend to be very demanding and aggressive when you're pregnant.`);
					linkArray.push(noChange(), motherly());
				}
			} else {
				if (V.PC.pregMood === 1) {
					r.push(`You tend to be caring and motherly when you're hormonal.`);
					linkArray.push(noChange(), aggressive());
				} else if (V.PC.pregMood === 0) {
					r.push(`Your mood isn't tied to your hormones.`);
					linkArray.push(motherly(), aggressive());
				} else {
					r.push(`You tend to be very demanding and aggressive when you're hormonal.`);
					linkArray.push(noChange(), motherly());
				}
			}

			r.push(App.UI.DOM.generateLinksStrip(linkArray));
			if (V.PC.counter.birthsTotal > 0) {
				r.push(`You have given birth to ${V.PC.counter.birthsTotal} babies.`);
			}
		}

		App.Events.addNode(el, r, "p");
	}


	if (V.cheatMode) {
		// Skills
		App.UI.DOM.appendNewElement("h2", el, "Skills");
		options = new App.UI.OptionsGroup();
		options.addOption(`Trading: ${tradingDescription()}`, "trading", V.PC.skill).addValueList([
			["Economics master", 100],
			["Economics expert", 90],
			["Skilled in economics", 70],
			["Amateur economist", 50],
			["Economics beginner", 30],
			["Basic trader", 0],
			["Haggler", -10],
			["Shopper", -30],
			["Weak saver", -50],
			["Money sieve", -70],
			["What's a trading?", -90],
		]).showTextBox();

		options.addOption(`Warfare: ${warfareDescription()}`, "warfare", V.PC.skill).addValueList([
			["Warfare master", 100],
			["Warfare expert", 90],
			["Skilled in warfare", 70],
			["Amateur combatant", 50],
			["Combat beginner", 30],
			["Basic fighter", 0],
			["Gun haver", -10],
			["Knife holder", -30],
			["Throat puncher", -50],
			["Groin kicker?", -70],
			["Most likely to be raped", -90]
		]).showTextBox();

		options.addOption(`Slaving: ${slavingDescription()}`, "slaving", V.PC.skill).addValueList([
			["Master slaver", 100],
			["Expert slaver", 90],
			["Skilled in slaving", 70],
			["Amateur slaver", 50],
			["Slaving beginner", 30],
			["Basic slaver", 0],
			["Can't make me a slave", -10],
			["Can read contracts", -30],
			["Careful now", -50],
			["Don't trust that guy", -70],
			["Potential slave", -90]
		]).showTextBox();

		options.addOption(`Engineering: ${engineeringDescription()}`, "engineering", V.PC.skill).addValueList([
			["Master engineer", 100],
			["Expert engineer", 90],
			["Skilled in engineering", 70],
			["Amateur engineer", 50],
			["Engineering beginner", 30],
			["Basic engineer", 0],
			["Gingerbread house", -10],
			["Knot tyer", -30],
			["You can use glue", -50],
			["You aren't handy", -70],
			["My hovercraft is full of eels", -90]
		]).showTextBox();

		options.addOption(`Medicine: ${medicineDescription()}`, "medicine", V.PC.skill).addValueList([
			["Master surgeon", 100],
			["Expert surgeon", 90],
			["Skilled in medicine", 70],
			["Amateur surgeon", 50],
			["Medical beginner", 30],
			["Basic medic", 0],
			["Can treat wounds", -10],
			["First-aid kit user", -30],
			["Band-aid applier", -50],
			["MEDIC!", -70],
			["Give me another beer", -90]
		]).showTextBox();

		options.addOption(`Hacking: ${hackingDescription()}`, "hacking", V.PC.skill).addValueList([
			["Master hacker", 100],
			["Expert hacker", 90],
			["Skilled hacker", 70],
			["Amateur hacker", 50],
			["Hacking beginner", 30],
			["Basic hacker", 0],
			["Mouse clicker", -10],
			["You can press Enter", -30],
			[`Where's the "any" key?`, -50],
			["Main screen turn on?", -70],
			["Ooh, cool glowy thingy!", -90]
		]).showTextBox();

		el.append(options.render());

		// Potential
		App.UI.DOM.appendNewElement("h2", el, "Misc");
		options = new App.UI.OptionsGroup();
		options.addOption(`Sexual Energy`, "sexualEnergy", V.PC).showTextBox();
		options.addOption(`Cum Tap`, "cumTap", V.PC.skill).showTextBox();
		options.addOption(`Stored Cum`, "storedCum", V.PC.counter).showTextBox();
		options.addOption(`Forced Fertility Drugs`, "forcedFertDrugs", V.PC).showTextBox();
		el.append(options.render());
	}

	return el;

	function noChange() {
		return App.UI.DOM.link(
			"Change to no change",
			() => { V.PC.pregMood = 0; },
			[],
			"Intro Summary"
		);
	}

	function motherly() {
		return App.UI.DOM.link(
			"Change to motherly",
			() => { V.PC.pregMood = 1; },
			[],
			"Intro Summary"
		);
	}

	function aggressive() {
		return App.UI.DOM.link(
			"Change to aggressive",
			() => { V.PC.pregMood = 2; },
			[],
			"Intro Summary"
		);
	}

	function tradingDescription() {
		if (V.PC.skill.trading >= 100) {
			return `You are a master at economics and trading.`;
		} else if (V.PC.skill.trading >= 80) {
			return `You are an expert at economics and trading.`;
		} else if (V.PC.skill.trading >= 60) {
			return `You are skilled in economics and trading.`;
		} else if (V.PC.skill.trading >= 40) {
			return `You know some things about economics and trading.`;
		} else if (V.PC.skill.trading >= 20) {
			return `You are a beginner in economics.`;
		} else if (V.PC.skill.trading >= 0) {
			return `You know only the basics of trading.`;
		} else if (V.PC.skill.trading >= -20) {
			return `You know how to haggle a little.`;
		} else if (V.PC.skill.trading >= -40) {
			return `You know how to shop around.`;
		} else if (V.PC.skill.trading >= -60) {
			return `You know not to pay sticker price.`;
		} else if (V.PC.skill.trading >= -80) {
			return 	`People always give you discounts, but you never save any money.`;
		} else {
			return `They said it was a bear market, so where are the bears?`;
		}
	}

	function warfareDescription() {
		if (V.PC.skill.warfare >= 100) {
			return `You are a master of warfare.`;
		} else if (V.PC.skill.warfare >= 80) {
			return `You are an expert at tactics and strategy.`;
		} else if (V.PC.skill.warfare >= 60) {
			return `You are skilled in combat.`;
		} else if (V.PC.skill.warfare >= 40) {
			return `You know some things about combat.`;
		} else if (V.PC.skill.warfare >= 20) {
			return `You are a beginner in tactics and strategy.`;
		} else if (V.PC.skill.warfare >= 0) {
			return `You know only the basics of fighting.`;
		} else if (V.PC.skill.warfare >= -20) {
			return `You know how to hold a gun.`;
		} else if (V.PC.skill.warfare >= -40) {
			return `You know how to stab with a knife.`;
		} else if (V.PC.skill.warfare >= -60) {
			return `Go for the throat?`;
		} else if (V.PC.skill.warfare >= -80) {
			return `Just kick them in the balls, right?`;
		} else {
			return `People like you are usually the first raped in a war.`;
		}
	}

	function slavingDescription() {
		if (V.PC.skill.slaving >= 100) {
			return `You are a master slaver.`;
		} else if (V.PC.skill.slaving >= 80) {
			return `You are an expert at enslaving.`;
		} else if (V.PC.skill.slaving >= 60) {
			return `You are skilled in slaving.`;
		} else if (V.PC.skill.slaving >= 40) {
			return `You know some things about getting slaves.`;
		} else if (V.PC.skill.slaving >= 20) {
			return `You are a beginner in slaving.`;
		} else if (V.PC.skill.slaving >= 0) {
			return `You know only the basics of slaving.`;
		} else if (V.PC.skill.slaving >= -20) {
			return `You know how to avoid becoming a slave.`;
		} else if (V.PC.skill.slaving >= -40) {
			return `You know to read contracts before you sign them.`;
		} else if (V.PC.skill.slaving >= -60) {
			return `You know to be careful.`;
		} else if (V.PC.skill.slaving >= -80) {
			return `You know better than to trust anyone.`;
		} else {
			return `It would be easy to enslave you.`;
		}
	}

	function engineeringDescription() {
		if (V.PC.skill.engineering >= 100) {
			return `You are a master engineer.`;
		} else if (V.PC.skill.engineering >= 80) {
			return `You are an expert at engineering.`;
		} else if (V.PC.skill.engineering >= 60) {
			return `You are skilled in engineering.`;
		} else if (V.PC.skill.engineering >= 40) {
			return `You know some things about engineering.`;
		} else if (V.PC.skill.engineering >= 20) {
			return `You are a beginner in engineering.`;
		} else if (V.PC.skill.engineering >= 0) {
			return `You know only the basics of engineering.`;
		} else if (V.PC.skill.engineering >= -20) {
			return `You can build a gingerbread house that doesn't collapse.`;
		} else if (V.PC.skill.engineering >= -40) {
			return `You can tie a tight knot, does that count?`;
		} else if (V.PC.skill.engineering >= -60) {
			return `Glue is your friend; lots of it.`;
		} else if (V.PC.skill.engineering >= -80) {
			return `You know better than to even try to build something.`;
		} else {
			return `You can cook; that's sort of like building something, right?`;
		}
	}

	function medicineDescription() {
		if (V.PC.skill.medicine >= 100) {
			return `You are a master surgeon.`;
		} else if (V.PC.skill.medicine >= 80) {
			return `You are an expert at medicine and surgery.`;
		} else if (V.PC.skill.medicine >= 60) {
			return `You are skilled in surgery.`;
		} else if (V.PC.skill.medicine >= 40) {
			return `You know some things about medicine.`;
		} else if (V.PC.skill.medicine >= 20) {
			return `You are a beginner in medicine.`;
		} else if (V.PC.skill.medicine >= 0) {
			return `You know the basics of treating injuries.`;
		} else if (V.PC.skill.medicine >= -20) {
			return `You can stop a wound from getting infected.`;
		} else if (V.PC.skill.medicine >= -40) {
			return `Gauze is your friend. Just keep wrapping.`;
		} else if (V.PC.skill.medicine >= -60) {
			return `You know how to apply a band-aid.`;
		} else if (V.PC.skill.medicine >= -80) {
			return `Cure-alls are wonderful. Why aren't they sold in stores, though?`;
		} else {
			return `Alcohol makes pain go away, right?`;
		}
	}

	function hackingDescription() {
		if (V.PC.skill.hacking >= 100) {
			return `You are a master of hacking.`;
		} else if (V.PC.skill.hacking >= 80) {
			return `You are an expert at hacking.`;
		} else if (V.PC.skill.hacking >= 60) {
			return `You are skilled in hacking.`;
		} else if (V.PC.skill.hacking >= 40) {
			return `You know some things about hacking.`;
		} else if (V.PC.skill.hacking >= 20) {
			return `You are a beginner in hacking.`;
		} else if (V.PC.skill.hacking >= 0) {
			return `You know only the basics of hacking.`;
		} else if (V.PC.skill.hacking >= -20) {
			return `You know how to click a mouse.`;
		} else if (V.PC.skill.hacking >= -40) {
			return `Enter does something?`;
		} else if (V.PC.skill.hacking >= -60) {
			return `Where is the "any" key?`;
		} else if (V.PC.skill.hacking >= -80) {
			return `You can push the power button, good job.`;
		} else {
			return `This black box thingy is magical.`;
		}
	}
};
