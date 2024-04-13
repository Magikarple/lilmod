App.Markets["Custom Slave"] = function() {
	const el = document.createElement("p");
	const slave = V.customSlave;
	el.append(intro());
	el.append(age());
	el.append(health());
	el.append(muscles());
	el.append(lips());
	el.append(voice());
	el.append(height());
	el.append(weight());
	el.append(face());
	el.append(race());
	el.append(skin());
	el.append(hairColor());
	el.append(eyesColor());
	el.append(boobs());
	el.append(butt());
	el.append(sex());
	el.append(virgin());
	el.append(dick());
	el.append(balls());
	el.append(clit());
	el.append(labia());
	el.append(vaginaLube());
	el.append(analVirgin());
	el.append(skills());
	el.append(skillWhore());
	el.append(skillCombat());
	el.append(intelligence());
	el.append(intelligenceImplant());
	el.append(eyes());
	el.append(hears());
	el.append(smells());
	el.append(tastes());
	el.append(limbs());
	el.append(nationality());

	// Links to reset things
	el.append(reset());
	el.append(orderControls());

	return el;

	function intro() {
		const {heA} = getPronouns(assistant.pronouns().main).appendSuffix('A');
		let r = [];
		if (V.customSlaveOrdered === 0) {
			r.push(`You work up a new slave order for posting where slave merchants can work to fulfill it.`);
		} else {
			r.push(`You review your posted slave order.`);
		}
		if (V.assistant.personality === 1) {
			r.push(`As you work, ${V.assistant.name} makes lewd comments about what ${heA} looks forward to doing to this new slave.`);
		}
		r.push(`Your order requests a slave with the following characteristics:`);
		return App.UI.DOM.makeElement("p", r.join(" "));
	}

	function age() {
		const el = document.createElement("div");
		const ages = [2, 4, 6, 9, 12, 14, 17, 19, 24, 29, 39, 49, 59, 69, 79, 89, 99, 109, 119, 129, 130];

		createDescription(el, description, "age");

		// Choices
		const options = [];
		for (let i = 0; i < ages.length; i++) {
			const high = ages[i];
			const low = (ages[i - 1] + 1) || (ages[i] - 1); // First element of array has nothing before it, obviously, so display low as one less than high.
			if (low < V.minimumSlaveAge) {
				continue;
			} else if (high > V.retirementAge) {
				options.push({key: low.toString(), name: `${low}+`});
				break;
			}

			options.push({key: high.toString(), name: `${low}-${high}`});
		}
		el.append(App.UI.DOM.makeSelect(options, slave.age.toString(), a => {
			slave.age = Number(a);
			jQuery("#age-text").empty().append(description());
		}));
		return el;

		function description() {
			// Age is displayed as a range, but recorded as the higher of the two numbers in the range
			const highIndex = ages.indexOf(slave.age);

			if (highIndex === 0) {
				return `${(ages[highIndex] - 1)}-${ages[highIndex]} years old. `;
			} else if (highIndex === ages.length) {
				// Highest possible number
				return `${ages[highIndex]}+ years old. `;
			} else {
				// Lower age should be the previous number in the array, +1
				return `${(ages[highIndex - 1]) + 1}-${ages[highIndex]} years old. `;
			}
		}
	}

	function health() {
		const el = document.createElement("div");
		const slaveProperty = "health";
		const choices = new Map([
			[1, "Extremely healthy"],
			[0, "Healthy"],
		]);
		createDescription(el, description, slaveProperty);
		el.append(choicesMaker(slaveProperty, choices, description));

		function description() {
			for (const [value, text] of choices) {
				if (slave.health === value) {
					return `${text}. `;
				}
			}
		}

		return el;
	}

	function muscles() {
		const el = document.createElement("div");
		const slaveProperty = "muscles";
		const choices = new Map([
			[96, "Ripped"],
			[65, "Muscular"],
			[45, "Well built"],
			[20, "Toned"],
			[0, "Normal"],
			[-21, "Weak"],
			[-51, "Very weak"],
			[-97, "Frail"],
		]);

		createDescription(el, description, slaveProperty);
		el.append(choicesMaker(slaveProperty, choices, description));

		function description() {
			for (const [value, text] of choices) {
				if (slave.muscles >= value) {
					return `${text}. `;
				}
			}
		}

		return el;
	}

	function lips() {
		const el = document.createElement("div");
		const slaveProperty = "lips";
		const choices = new Map([
			[100, "Facepussy"],
			[85, "Enormous"],
			[65, "Big"],
			[35, "Plush"],
			[15, "Normal"],
			[5, "Thin"],
		]);

		createDescription(el, description, slaveProperty);
		el.append(choicesMaker(slaveProperty, choices, description));

		function description() {
			for (const [value, text] of choices) {
				if (slave.lips >= value) {
					if (value < 100) {
						return `Lips are ${text.toLowerCase()}. `;
					} else {
						return `Lips are a ${text.toLowerCase()}. `;
					}
				}
			}
		}

		return el;
	}

	function voice() {
		const el = document.createElement("div");
		const slaveProperty = "voice";
		const choices = new Map([
			[3, "High, girly"],
			[2, "Feminine"],
			[1, "Deep"],
			[0, "Mute"],
			[-1, "Voice is unimportant"],
		]);

		createDescription(el, description, slaveProperty);
		el.append(choicesMaker(slaveProperty, choices, description));

		function description() {
			for (const [value, text] of choices) {
				if (slave.voice === value) {
					if (slave.voice === -1) {
						return `${text}. `;
					} else {
						return `${text} voice. `;
					}
				}
			}
			return `Voice is unimportant. `;
		}

		return el;
	}

	function height() {
		const el = document.createElement("div");
		const slaveProperty = "heightMod";
		const choices = new Map([
			["greatly below average", "Petite"],
			["below average", "Short"],
			["normal", "Average"],
			["above average", "Tall"],
			["greatly above average", "Very tall"],
		]);

		createDescription(el, description, slaveProperty);
		el.append(choicesMaker(slaveProperty, choices, description));

		function description() {
			for (const [value, text] of choices) {
				if (slave.heightMod === value) {
					return `${text} height. `;
				}
			}
		}

		return el;
	}

	function weight() {
		const el = document.createElement("div");
		const slaveProperty = "weight";
		const choices = new Map([
			[200, "Immobile"],
			[150, "Very Fat"],
			[100, "Fat"],
			[50, "Chubby"],
			[15, "Plush"],
			[0, "Average"],
			[-15, "Thin"],
			[-50, "Very thin"],
		]);

		createDescription(el, description, slaveProperty);
		el.append(choicesMaker(slaveProperty, choices, description));

		function description() {
			for (const [value, text] of choices) {
				if (slave.weight >= value) {
					return `${text} weight. `;
				}
			}
		}

		return el;
	}

	function face() {
		const el = document.createElement("div");
		const slaveProperty = "face";
		const choices = new Map([
			[55, "Very attractive"],
			[15, "Attractive"],
			[0, "Average"],
			[-15, "Unattractive"],
			[-55, "Very unattractive"],
		]);

		createDescription(el, description, slaveProperty);
		el.append(choicesMaker(slaveProperty, choices, description));

		function description() {
			for (const [value, text] of choices) {
				if (slave.face >= value) {
					return `${text} face. `;
				}
			}
		}

		return el;
	}

	function race() {
		const el = document.createElement("div");
		const slaveProperty = "race";
		const choices = [{key: "ethnicity is unimportant", name: "Ethnicity is unimportant"}];
		for (const [race, capRace] of App.Data.misc.filterRacesPublic) {
			choices.push({key: race, name: capRace});
		}

		createDescription(el, description, slaveProperty);

		// Choices
		el.append(App.UI.DOM.makeSelect(choices, slave.race, r => {
			slave.race = r;
			jQuery("#race-text").empty().append(description());
		}));

		function description() {
			const el = new DocumentFragment();
			el.append("Ethnicity: ");
			el.append(
				App.UI.DOM.makeTextBox(
					slave.race,
					(v) => {
						slave.race = v;
						jQuery("#race-text").empty().append(description());
					}
				)
			);
			return el;
		}

		return el;
	}

	function skin() {
		const el = document.createElement("div");
		const slaveProperty = "skin";
		const choices = [{key: "left natural", name: "Left natural"}];
		for (const skin of App.Medicine.Modification.naturalSkins) {
			choices.push({key: skin, name: capFirstChar(skin)});
		}

		createDescription(el, description, slaveProperty);

		// Choices
		el.append(App.UI.DOM.makeSelect(choices, slave.skin, s => {
			slave.skin = s;
			jQuery("#skin-text").empty().append(description());
		}));

		function description() {
			const el = new DocumentFragment();
			el.append("Skin tone: ");
			el.append(
				App.UI.DOM.makeTextBox(
					slave.skin,
					(v) => {
						slave.skin = v;
						jQuery("#skin-text").empty().append(description());
					}
				)
			);
			return el;
		}

		return el;
	}


	function hairColor() {
		const el = document.createElement("div");
		const slaveProperty = "hairColor";
		const choices = [{key: "hair color is unimportant", name: "Hair color is unimportant"}];
		for (const hair of App.Medicine.Modification.Color.Primary) {
			choices.push({key: hair.value, name: capFirstChar(hair.value)});
		}

		createDescription(el, description, slaveProperty);

		// Choices
		el.append(App.UI.DOM.makeSelect(choices, slave.hairColor, h => {
			slave.hairColor	= h;
			jQuery("#hairColor-text").empty().append(description());
		}));

		function description() {
			const el = new DocumentFragment();
			el.append("Natural hair color: ");
			el.append(
				App.UI.DOM.makeTextBox(
					slave.hairColor,
					(v) => {
						slave.hairColor = v;
						jQuery("#hairColor-text").empty().append(description());
					}
				)
			);
			return el;
		}

		return el;
	}


	function eyesColor() {
		const el = document.createElement("div");
		const slaveProperty = "eyesColor";
		const choices = [{key: "eye color is unimportant", name: "Eye color is unimportant"}];
		for (const eyes of App.Medicine.Modification.eyeColor) {
			choices.push({key: eyes.value, name: capFirstChar(eyes.value)});
		}

		createDescription(el, description, slaveProperty);

		// Choices
		el.append(App.UI.DOM.makeSelect(choices, slave.eyesColor, e => {
			slave.eyesColor = e;
			jQuery("#eyesColor-text").empty().append(description());
		}));

		function description() {
			const el = new DocumentFragment();
			el.append("Natural eye color: ");
			el.append(
				App.UI.DOM.makeTextBox(
					slave.eyesColor,
					(v) => {
						slave.eyesColor = v;
						jQuery("#eyesColor-text").empty().append(description());
					}
				)
			);
			return el;
		}

		return el;
	}


	function boobs() {
		const el = document.createElement("div");
		const slaveProperty = "boobs";
		const choices = new Map([
			[6000, "Massive"],
			[2100, "Giant"],
			[1400, "Huge"],
			[800, "Big"],
			[500, "Healthy"],
			[200, "Flat"],
		]);

		createDescription(el, description, slaveProperty);
		el.append(choicesMaker(slaveProperty, choices, description));

		function description() {
			for (const [value, text] of choices) {
				if (slave.boobs >= value) {
					if (slave.boobs <= 200) {
						return `${text} chest. `;
					} else {
						return `${text} breasts. `;
					}
				}
			}
		}

		return el;
	}

	function butt() {
		const el = document.createElement("div");
		const slaveProperty = "butt";
		const choices = new Map([
			[8, "Massive"],
			[5, "Huge"],
			[3, "Healthy"],
			[1, "Flat"],
		]);

		createDescription(el, description, slaveProperty);
		el.append(choicesMaker(slaveProperty, choices, description));

		function description() {
			for (const [value, text] of choices) {
				if (slave.butt >= value) {
					return `${text} buttocks. `;
				}
			}
		}

		return el;
	}

	function sex() {
		const el = document.createElement("div");
		const slaveProperty = "sex";
		const choices = new Map([
			[3, "Both"],
			[2, "Male"],
			[1, "Female"],
		]);

		createDescription(el, description, slaveProperty);
		el.append(choicesMaker(slaveProperty, choices, description));

		function description() {
			switch (slave.sex) {
				case 3:
					return `Futanari (clit options not applied). `;
				case 2:
					return `Male (pussy options not applied). `;
				case 1:
					return `Female (cock & balls options not applied). `;
			}
		}

		return el;
	}

	function virgin() {
		const el = document.createElement("div");
		const slaveProperty = "virgin";
		const choices = new Map([
			[1, "Not Important"],
			[0, "Vaginal virgin"],
		]);

		createDescription(el, description, slaveProperty);
		el.append(choicesMaker(slaveProperty, choices, description));

		function description() {
			for (const [value, text] of choices) {
				if (slave.virgin === value) {
					return `${text}. `;
				}
			}
			return `Virginity not important. `;
		}

		return el;
	}

	function dick() {
		const el = document.createElement("div");
		const slaveProperty = "dick";
		const choices = new Map([
			[4, "Large penis"],
			[2, "Small penis"],
			[0, "No penis"],
		]);

		createDescription(el, description, slaveProperty);
		el.append(choicesMaker(slaveProperty, choices, description));

		function description() {
			for (const [value, text] of choices) {
				if (slave.dick >= value) {
					return `${text}. `;
				}
			}
		}

		return el;
	}

	function balls() {
		const el = document.createElement("div");
		const slaveProperty = "balls";
		const choices = new Map([
			[6, "Huge testicles"],
			[4, "Large testicles"],
			[2, "Small testicles"],
			[0, "No testicles"],
		]);

		createDescription(el, description, slaveProperty);
		el.append(choicesMaker(slaveProperty, choices, description));

		function description() {
			for (const [value, text] of choices) {
				if (slave.balls >= value) {
					return `${text}. `;
				}
			}
		}

		return el;
	}

	function clit() {
		const el = document.createElement("div");
		const slaveProperty = "clit";
		const choices = new Map([
			[5, "Clit dick"],
			[3, "Enormous clitoris"],
			[1, "Big clitoris"],
			[0, "Normal clitoris"],
		]);

		createDescription(el, description, slaveProperty);
		el.append(choicesMaker(slaveProperty, choices, description));

		function description() {
			for (const [value, text] of choices) {
				if (slave.clit === 5) {
					return `Pseudophallus. `;
				} else {
					if (slave.clit >= value) {
						return `${text}. `;
					}
				}
			}
		}

		return el;
	}

	function labia() {
		const el = document.createElement("div");
		const slaveProperty = "labia";
		const choices = new Map([
			[3, "Enormous labia"],
			[2, "Huge labia"],
			[1, "Big labia"],
			[0, "Normal labia"],
		]);

		createDescription(el, description, slaveProperty);
		el.append(choicesMaker(slaveProperty, choices, description));

		function description() {
			for (const [value, text] of choices) {
				if (slave.labia === value) {
					return `${text}. `;
				}
			}
		}

		return el;
	}

	function vaginaLube() {
		const el = document.createElement("div");
		const slaveProperty = "vaginaLube";
		const choices = new Map([
			[2, "Sopping wet vagina"],
			[1, "Wet vagina"],
			[0, "Dry vagina"],
		]);

		createDescription(el, description, slaveProperty);
		el.append(choicesMaker(slaveProperty, choices, description));

		function description() {
			for (const [value, text] of choices) {
				if (slave.vaginaLube === value) {
					return `${text}. `;
				}
			}
		}

		return el;
	}

	function analVirgin() {
		const el = document.createElement("div");
		const slaveProperty = "analVirgin";
		const choices = new Map([
			[1, "Anal virginity is not important"],
			[0, "Anal virgin"],
		]);

		createDescription(el, description, slaveProperty);
		el.append(choicesMaker(slaveProperty, choices, description));

		function description() {
			for (const [value, text] of choices) {
				if (slave.analVirgin === value) {
					return `${text}. `;
				}
			}
		}

		return el;
	}

	function skills() {
		const el = document.createElement("div");
		const slaveProperty = "skills";
		const choices = new Map([
			[65, "Expert"],
			[35, "Skilled"],
			[0, "Unskilled"],
		]);

		createDescription(el, description, slaveProperty);
		el.append(choicesMaker(slaveProperty, choices, description));

		function description() {
			if (slave.skills < 35) {
				return `Sexually unskilled. `;
			} else if (slave.skills < 65) {
				return `Sexually skilled. `;
			} else {
				return `Sexually expert. `;
			}
		}

		return el;
	}

	function skillWhore() {
		const el = document.createElement("div");
		const slaveProperty = "skill.whore";
		const choices = new Map([
			[35, "Expert"],
			[15, "Skilled"],
			[0, "Unskilled"],
		]);

		createDescription(el, description, slaveProperty);
		el.append(choicesMaker(slaveProperty, choices, description));

		function description() {
			if (slave.skill.whore <= 10) {
				return `Unskilled at prostitution and entertainment. `;
			} else if (slave.skill.whore <= 15) {
				return `Basic skills at prostitution and entertainment. `;
			} else {
				return `Skilled at prostitution and entertainment. `;
			}
		}

		return el;
	}

	function skillCombat() {
		const el = document.createElement("div");
		const slaveProperty = "skill.combat";
		const choices = new Map([
			[35, "Expert"],
			[15, "Skilled"],
			[0, "Unskilled"],
		]);

		createDescription(el, description, slaveProperty);
		el.append(choicesMaker(slaveProperty, choices, description));

		function description() {
			if (slave.skill.combat <= 10) {
				return `Unskilled at fighting. `;
			} else if (slave.skill.combat <= 30) {
				return `Basic skills at fighting. `;
			} else {
				return `Skilled at fighting. `;
			}
		}

		return el;
	}

	function intelligence() {
		const el = document.createElement("div");
		const slaveProperty = "intelligence";
		const choices = new Map([
			[-3, "Moronic"],
			[-2, "Very stupid"],
			[-1, "Stupid"],
			[0, "Average intelligence"],
			[1, "Smart"],
			[2, "Very smart"],
			[3, "Brilliant"],
		]);

		createDescription(el, description, slaveProperty);
		el.append(choicesMaker(slaveProperty, choices, description));

		function description() {
			for (const [value, text] of choices) {
				if (slave.intelligence === value) {
					return `${text}. `;
				}
			}
		}

		return el;
	}

	function intelligenceImplant() {
		const el = document.createElement("div");
		const slaveProperty = "intelligenceImplant";
		const choices = new Map([
			[30, "Well educated"],
			[15, "Educated"],
			[0, "Uneducated"],
		]);

		createDescription(el, description, slaveProperty);
		el.append(choicesMaker(slaveProperty, choices, description));

		function description() {
			for (const [value, text] of choices) {
				if (slave.intelligenceImplant >= value) {
					return `${text}. `;
				}
			}
		}

		return el;
	}

	function eyes() {
		const el = document.createElement("div");

		// Desc setup
		const descText = document.createElement("span");
		descText.id = (`eye-text`);
		descText.append(description());
		el.append(descText);

		const linkArray = [];
		if (V.seeExtreme) {
			linkArray.push(
				App.UI.DOM.link(
					"Blind",
					() => {
						eyeSurgery(slave, "both", "blind");
						jQuery(`#${descText.id}`).empty().append(description());
					}
				)
			);
		}
		linkArray.push(
			App.UI.DOM.link(
				"Nearsighted",
				() => {
					eyeSurgery(slave, "both", "blur");
					jQuery(`#${descText.id}`).empty().append(description());
				}
			)
		);
		linkArray.push(
			App.UI.DOM.link(
				"Normal Vision",
				() => {
					eyeSurgery(slave, "both", "fix");
					jQuery(`#${descText.id}`).empty().append(description());
				}
			)
		);
		el.append(App.UI.DOM.generateLinksStrip(linkArray));

		function description() {
			const vision = getBestVision(slave);
			switch (vision) {
				case 2:
					return "Normal Vision. ";
				case 1:
					return "Nearsighted. ";
				case 0:
					return "Blind. ";
				default:
					return `Error: ${vision}. `;
			}
		}

		return el;
	}

	function hears() {
		const el = document.createElement("div");
		const slaveProperty = "hears";
		const choices = new Map([
			[0, "Normal Hearing"],
			[-1, "Hard of Hearing"],
		]);
		if (V.seeExtreme) {
			choices.set(-2, "Deaf");
		}

		createDescription(el, description, slaveProperty);
		el.append(choicesMaker(slaveProperty, choices, description));

		function description() {
			for (const [value, text] of choices) {
				if (slave.hears === value) {
					return `${text}. `;
				}
			}
			return `Hard of hearing. `;
		}

		return el;
	}

	function smells() {
		const el = document.createElement("div");
		const slaveProperty = "smells";
		const choices = new Map([
			[0, "Normal Sense of smell"],
			[-1, "No Sense of smell"],
		]);

		createDescription(el, description, slaveProperty);
		el.append(choicesMaker(slaveProperty, choices, description));

		function description() {
			for (const [value, text] of choices) {
				if (slave.smells === value) {
					return `${text}.`;
				}
			}
			return `Normal Sense of smell. `;
		}

		return el;
	}

	function tastes() {
		const el = document.createElement("div");
		const slaveProperty = "tastes";
		const choices = new Map([
			[0, "Normal Sense of taste"],
			[-1, "No Sense of taste"],
		]);

		createDescription(el, description, slaveProperty);
		el.append(choicesMaker(slaveProperty, choices, description));

		function description() {
			for (const [value, text] of choices) {
				if (slave.tastes === value) {
					return `${text}.`;
				}
			}
			return `Normal Sense of taste. `;
		}

		return el;
	}

	function limbs() {
		const el = new DocumentFragment();
		const limbs = new Map([
			["arm.left", "Left arm"],
			["arm.right", "Right arm"],
			["leg.left", "Left leg"],
			["leg.right", "Right leg"],
		]);

		for (const [value, text] of limbs) {
			const div = document.createElement("div");

			// Desc setup
			const descText = document.createElement("span");
			descText.id = (`${value}-text`).replace(/\./g, "-");
			const hasLimb = (_.get(slave, value) !== null);
			descText.append(description(hasLimb, text));
			div.append(descText);

			const linkArray = [];
			linkArray.push(
				App.UI.DOM.link(
					"Add",
					() => {
						const limb = value.startsWith("leg.") ? new App.Entity.LegState() : new App.Entity.ArmState();
						_.set(slave, value, limb);
						jQuery(`#${descText.id}`).empty().append(description(true, text));
					}
				)
			);
			linkArray.push(
				App.UI.DOM.link(
					"Remove",
					() => {
						_.set(slave, value, null);
						jQuery(`#${descText.id}`).empty().append(description(false, text));
					}
				)
			);
			div.append(App.UI.DOM.generateLinksStrip(linkArray));

			el.append(div);
		}

		function description(hasLimb, text) {
			return `${text}: ${(hasLimb) ? `Yes` : `No`}. `;
		}

		return el;
	}

	function nationality() {
		const el = document.createElement("div");
		const slaveProperty = "nationality";
		const choices = [{key: "slave", name: "Slave"},
			{key: "Stateless", name: "Stateless"},
			{key: "Nationality is unimportant", name: "Nationality is unimportant"},
		];
		for (const nationality of App.Data.misc.baseNationalities) {
			choices.push({key: nationality, name: nationality});
		}

		createDescription(el, description, slaveProperty);

		// Choices
		el.append(App.UI.DOM.makeSelect(choices, slave.nationality, nat => {
			slave.nationality = nat;
			jQuery("#nationality-text").empty().append(description());
		}));

		function description() {
			for (const choice of choices) {
				if (slave.nationality === choice.key) {
					return `${choice.name}. `;
				}
			}
		}

		return el;
	}

	function reset() {
		return App.UI.DOM.makeElement(
			"p",
			App.UI.DOM.link(
				"Reset custom order form",
				() => {
					V.customSlave = new App.Entity.CustomSlaveOrder();
					V.market = new App.Markets.Global("Custom Slave");
				},
				[],
				"Market"
			)
		);
	}

	function orderControls() {
		const linkArray = [];
		if (V.customSlaveOrdered === 1) {
			linkArray.push(
				App.UI.DOM.passageLink(
					"Update custom slave order",
					"Buy Slaves"
				)
			);
			linkArray.push(
				App.UI.DOM.link(
					"Withdraw custom slave order",
					() => { V.customSlaveOrdered = 0; },
					[],
					"Buy Slaves"
				)
			);
		} else {
			linkArray.push(
				App.UI.DOM.link(
					"Post custom slave order",
					() => { V.customSlaveOrdered = 1; },
					[],
					"Buy Slaves"
				)
			);
		}

		return App.UI.DOM.makeElement("p", App.UI.DOM.generateLinksStrip(linkArray));
	}

	/**
	 *
	 * @param {HTMLElement} element
	 * @param {Function} text
	 * @param {string} id
	 */
	function createDescription(element, text, id) {
		const span = document.createElement('span');
		span.id = (`${id}-text`).replace(/\./g, "-");
		span.append(text());
		element.append(span);
	}

	/**
	 *
	 * @param {string} slaveParam
	 * @param {Map} choices
	 * @param {Function} description
	 */
	function choicesMaker(slaveParam, choices, description) {
		const linkArray = [];
		for (const [value, text] of choices) {
			linkArray.push(
				App.UI.DOM.link(
					text,
					() => {
						_.set(slave, slaveParam, value);
						jQuery(`#${(slaveParam).replace(/\./g, "-")}-text`).empty().append(description());
					}
				)
			);
		}
		return App.UI.DOM.generateLinksStrip(linkArray);
	}
};
