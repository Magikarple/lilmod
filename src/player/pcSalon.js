/**
 * UI for the Salon. Refreshes without refreshing the passage.
 * @param {App.Entity.PlayerState} PC
 */
App.UI.playerSalon = function(PC) {
	const container = document.createElement("span");
	container.id = "salon";

	container.append(createPage());
	return container;

	function createPage() {
		const el = new DocumentFragment();

		el.append(intro());
		el.append(eyewear());
		if (getBestVision(PC) > 0) {
			if (
				(["leopard", "tiger", "jaguar"].includes(PC.earT) && PC.earTColor !== "hairless") ||
				["leopard", "tiger", "jaguar", "gazelle", "tanuki", "raccoon"].includes(PC.tailShape) ||
				PC.wingsShape === "moth"
			) {
				el.append(pattern());
			}
			el.append(ears());
			if (PC.horn !== "none") {
				el.append(horns());
			}
			el.append(hair());
			/*
			el.append(makeup());
			el.append(nails());
			*/
			el.append(bodyHair());
			if (PC.tail !== "none") {
				el.append(tail());
			}
			/*
			if (PC.appendages !== "none") {
				el.append(appendages());
			}
			*/
			el.append(skin());
		}
		return el;
	}

	function intro() {
		const el = new DocumentFragment();
		App.UI.DOM.appendNewElement("h1", el, "Personal Salon");
		App.UI.DOM.appendNewElement("div", el, `You unpack your personal salon kit so that you may adjust your appearance.`, "scene-intro");
		return el;
	}

	function eyewear() {
		const el = new DocumentFragment();
		App.UI.DOM.appendNewElement("h3", el, "Eyewear");
		const r = [];
		const options = new App.UI.OptionsGroup();

		if (getBestVision(PC) === 0) {
			r.push(`You are blind; you have no idea what any of this stuff is. Oh hey! Glasses!`);
		} else if (anyVisionEquals(PC, 1)) {
			r.push(`You are nearsighted`);
		} else {
			r.push(`Your vision is normal`);
		}

		const option = options.addOption(r.join(" "), "eyewear", PC)
			.addValue("None", "none")
			.addValue("Cosmetic glasses", "glasses");
		if (getBestVision(PC) !== 0 && anyVisionEquals(PC, 1)) {
			option.addValue("Corrective glasses", "corrective glasses");
			if (hasAnyEyes(PC)) {
				option.addValue("Corrective contacts", "corrective contacts");
			}
		}
		el.append(options.render());

		el.append(App.Medicine.Modification.eyeSelector(PC));
		return el;
	}

	function pattern() {
		const el = new DocumentFragment();
		App.UI.DOM.appendNewElement("h3", el, "Pattern");

		el.append(App.Medicine.Salon.pattern(PC));

		return el;
	}

	function ears() {
		const el = new DocumentFragment();
		App.UI.DOM.appendNewElement("h3", el, "Ears");
		const r = [];
		const options = new App.UI.OptionsGroup();

		if (PC.earImplant === 1) {
			r.push(`You have artificial inner ear implants`);
		} else if (PC.hears < -1) {
			r.push(`You are deaf`);
		} else if (PC.hears > -1) {
			r.push(`Your hearing is normal`);
		} else {
			r.push(`You are hard of hearing`);
		}
		const option = options.addOption(r.join(" "), "earwear", PC)
			.addValue("None", "none");
		// Hard of hearing
		if (PC.hears === -1 && PC.earImplant !== 1) {
			option.addValue("Hearing aids", "hearing aids");
		}

		// Top ear Color
		if (PC.earT !== "none" && PC.earTColor !== "hairless") {
			let title;
			let option;
			let showChoices = true;
			const filtered = App.Medicine.Modification.Color.Primary.filter(c => ![PC.earTColor].includes(c.value));

			title = `You have ${PC.earTColor} ears${PC.earTEffect === "none" ? `.` : ` with ${PC.earTEffect}.`}`;
			App.UI.DOM.appendNewElement("div", el, title);

			if (showChoices) {
				if (PC.earTEffect !== "none" || PC.earTEffectColor !== "none") {
					options.addCustomOption("")
						.addButton("Remove effect", () => {
							PC.earTEffect = "none";
							PC.earTEffectColor = "none";
							App.UI.reload();
						});
				}

				option = options.addOption("Fur Color", "earTColor", PC);
				for (const color of App.Medicine.Modification.Color.Primary) {
					option.addValue(capFirstChar(color.value), color.value);
				}
				option.pulldown();

				option = options.addOption("Effect color", "earTEffectColor", PC);
				for (const color of filtered) {
					option.addValue(capFirstChar(color.value), color.value);
				}
				option.pulldown();

				option = options.addOption("Effect", "earTEffect", PC);
				for (const color of App.Medicine.Modification.Color.Effect) {
					option.addValue(capFirstChar(color.value), `${PC.earTEffectColor} ${color.value}`);
				}
				option.pulldown();
			}
		}
		el.append(options.render());

		return el;
	}

	function horns() {
		const el = new DocumentFragment();
		App.UI.DOM.appendNewElement("h3", el, "Horns");
		const options = new App.UI.OptionsGroup();

		const option = options.addOption(`Dye your ${PC.horn}`, "hornColor", PC);
		for (const hornColor of App.Medicine.Modification.hornColor) {
			option.addValue(capFirstChar(hornColor), hornColor);
		}

		el.append(options.render());

		return el;
	}

	function makeup() {
		const el = new DocumentFragment();
		App.UI.DOM.appendNewElement("h3", el, "Makeup");
		const r = [];
		const options = new App.UI.OptionsGroup();

		// Needs descriptions
		options.addOption(r.join(" "), "makeup", PC)
			.addValue("Makeup free", 0)
			.addValue("Nice", 1)
			.addValue("Gorgeous", 2)
			.addValue("Slutty", 4)
			.addValue("Color-coordinate with hair", 3);

		options.addOption("", "makeup", PC)
			.addValue("Neon", 5)
			.addValue("Neon, color-coordinate with hair", 6);

		options.addOption("", "makeup", PC)
			.addValue("Metallic", 7)
			.addValue("Metallic, color-coordinate with hair", 8);

		el.append(options.render());

		return el;
	}

	function nails() {
		const el = new DocumentFragment();
		App.UI.DOM.appendNewElement("h3", el, "Nails");
		const r = [];
		const options = new App.UI.OptionsGroup();

		// Needs descriptions
		options.addOption(r.join(" "), "nails", PC)
			.addValue("Neatly clipped", 0)
			.addValue("Long and elegant", 1)
			.addValue("Sharp and claw-like", 3)
			.addValue("Bright and glittery", 4)
			.addValue("Very long and garish", 5)
			.addValue("Color-coordinate with hair", 2);

		options.addOption("", "nails", PC)
			.addValue("Neon", 6)
			.addValue("Neon, color-coordinate with hair", 7);

		options.addOption("", "nails", PC)
			.addValue("Metallic", 8)
			.addValue("Metallic, color-coordinate with hair", 9);

		el.append(options.render());

		return el;
	}

	function hair() {
		const el = new DocumentFragment();
		let option;
		App.UI.DOM.appendNewElement("h3", el, "Hair");
		const options = new App.UI.OptionsGroup();
		let title;
		let showChoices = true;
		const hasWig = (PC.bald === 1 && PC.hStyle !== "bald");
		const filtered = App.Medicine.Modification.Color.Primary.filter(c => ![PC.hColor].includes(c.value));

		if (PC.bald === 1) {
			if (PC.hStyle === "bald") {
				title = `You are completely bald.`;
				showChoices = false;
			} else {
				title = `You're wearing a ${PC.hColor}${PC.hEffect === "none" ? `` : ` with ${PC.hEffect}`} wig.`;
			}
		} else {
			title = `You have ${PC.hColor} hair${PC.hEffect === "none" ? `` : ` with ${PC.hEffect}`}.`;
		}
		App.UI.DOM.appendNewElement("div", el, title);

		if (PC.bald === 1) {
			options.addOption(`Use a wig`, "hStyle", PC)
				.addValue("Enable", "neat").on()
				.addValue("Disable", "bald").off();
		}

		if (showChoices) {
			if (PC.hLength > 1) {
				// Color
				if (PC.hEffectColor !== "none" || PC.hEffect !== "none") {
					options.addCustomOption("")
						.addButton("Remove effects", () => {
							PC.hEffectColor = "none";
							PC.hEffect = "none";
							App.UI.reload();
						});
				}
				option = options.addOption("Primary color", "hColor", PC);
				if (PC.origHColor !== PC.hColor) {
					option.addValue("Restore your natural color", PC.origHColor);
				}
				for (const color of App.Medicine.Modification.Color.Primary) {
					option.addValue(capFirstChar(color.value), color.value);
				}
				option.pulldown();

				option = options.addOption("Effect", "hEffect", PC);
				for (const color of App.Medicine.Modification.Color.Effect) {
					option.addValue(capFirstChar(color.value), `${PC.hEffectColor} ${color.value}`);
				}
				option.pulldown();

				option = options.addOption("Effect color", "hEffectColor", PC);
				for (const color of filtered) {
					option.addValue(capFirstChar(color.value), color.value);
				}
				option.pulldown();
			}
			/*
			// Style
			if (PC.hLength > 1) {
				title = `Go get your ${hasWig ? "wig" : "hair"} styled `;
			} else {
				title = `Your ${hasWig ? "wig" : "hair"} is too short to style meaningfully`;
			}
			option = options.addOption(title, "hStyle", PC);
			if (PC.hLength > 1) {
				for (const style of App.Medicine.Modification.hairStyles.Normal) {
					option.addValue(style.title, style.value, billMod);
				}
				option.pulldown();
			}

			// Style + Cut
			if (PC.hLength > 1) {
				option = options.addOption(`${hasWig ? "Change wig style and length" : "Cut and style hair"}`, "hStyle", PC);
				if (PC.hLength > 1) {
					for (const style of App.Medicine.Modification.hairStyles.Cut) {
						option.addValue(
							style.title,
							style.value,
							() => {
								PC.hLength = style.hLength;
								billMod();
							});
					}
				}
			}
			*/

			// Length
			option = options.addOption(`${hasWig ? "Choose a longer or shorter wig" : "Cut or lengthen hair"}`, "hLength", PC);
			if (PC.hLength > 0) {
				for (const style of App.Medicine.Modification.hLength) {
					if (
						(style.hasOwnProperty("requirements") && !style.requirements(PC)) ||
						(style.hLength && style.hLength > PC.hLength)
					) {
						continue;
					}
					option.addValue(style.title, style.hLength);
				}
				if (!PC.bald && PC.hLength < 150) {
					option.addValue("Apply extensions", PC.hLength + 10);
				}
			} else {
				option.addValue("Apply hair growth stimulating treatment", 1);
			}

			option.showTextBox();

			// Maintain
			if (!hasWig) {
				options.addOption(`Keep your hair this length`, "haircuts", PC)
					.addValue("Enable", 1).on()
					.addValue("Disable", 0).off();
			}
		}

		el.append(options.render());
		return el;
	}

	function bodyHair() {
		const el = new DocumentFragment();
		const options = new App.UI.OptionsGroup();
		let option;
		let r = [];
		App.UI.DOM.appendNewElement("h3", el, "Body hair");

		// Eyebrows
		if (PC.eyebrowHStyle !== "bald") {
			// Describe and change color
			if (PC.eyebrowHStyle === "shaved" || PC.eyebrowHStyle === "bald") {
				r.push(`Your eyebrows would be ${PC.eyebrowHColor} if you had any.`);
			} else {
				r.push(`You have ${PC.eyebrowHColor} eyebrows.`);
			}

			option = options.addOption(r.join(" "), "eyebrowHColor", PC);
			if (PC.eyebrowHColor !== PC.hColor) {
				option.addValue("Match your hair", PC.hColor);
			}
			option.addValueList(makeAList(App.Medicine.Modification.Color.Primary.map(color => color.value)));
			option.pulldown();

			// Style
			option = options.addOption(`Style your ${PC.eyebrowHStyle} eyebrows`, "eyebrowHStyle", PC).showTextBox();
			for (const fullness of App.Medicine.Modification.eyebrowStyles) {
				option.addValue(capFirstChar(fullness), fullness);
			}
			option.pulldown();

			// Fullness
			option = options.addOption(`Adjust your ${PC.eyebrowFullness} eyebrows' fullness`, "eyebrowFullness", PC);
			for (const fullness of App.Medicine.Modification.eyebrowFullness) {
				option.addValue(capFirstChar(fullness), fullness);
			}
			option.pulldown();
		} else {
			options.addComment(`You have no eyebrows.`);
		}

		// Pubic hair
		const pubertyAge = Math.min(PC.pubertyAgeXX, PC.pubertyAgeXY);
		r = [];
		const hasPubes = (PC.pubicHStyle !== "bald" && PC.pubicHStyle !== "hairless" && PC.physicalAge >= pubertyAge - 1);
		const hasPitHair = (PC.underArmHStyle !== "bald" && PC.underArmHStyle !== "hairless" && PC.physicalAge >= pubertyAge - 1);
		if (hasPubes) {
			if (PC.physicalAge < pubertyAge) {
				r.push(`You've got a growing patch of wispy ${PC.pubicHColor} pubic hair.`);
			} else if (PC.pubicHStyle === "in a strip") {
				r.push(`You have a shaved strip of ${PC.pubicHColor} pubic hair.`);
			} else if (PC.pubicHStyle === "waxed") {
				r.push(`Your pubes would be ${PC.pubicHColor} if you stopped waxing them.`);
			} else {
				r.push(`Your ${PC.pubicHStyle} pubic hair is ${PC.pubicHColor}.`);
			}
		} else {
			r.push(`Your groin ${!hasPitHair ? "and underarms are" : "is"} completely hairless.`);
		}
		option = options.addOption(r.join(" "), "pubicHColor", PC);
		if (hasPubes) {
			if (PC.pubicHColor !== PC.hColor) {
				option.addValue("Match the curtains", PC.hColor);
			}
			option.addValueList(makeAList(App.Medicine.Modification.Color.Primary.map(color => color.value)))
				.pulldown();
			// Style
			option = options.addOption(`Style your pubic hair`, "pubicHStyle", PC);
			for (const fullness of App.Medicine.Modification.pubicStyles) {
				option.addValue(capFirstChar(fullness), fullness);
			}
			option.pulldown();
		}

		// Armpit hair
		r = [];
		if (hasPitHair) {
			r.push(`Your`);
			if (PC.physicalAge < pubertyAge) {
				r.push(`wispy underarm hair`);
			} else {
				r.push(`${PC.underArmHStyle} underarm hair`);
			}
			if (PC.underArmHStyle === "waxed") {
				r.push(`would be ${PC.underArmHColor} if left unwaxed.`);
			} else {
				r.push(`is ${PC.underArmHColor}.`);
			}
		} else if (hasPubes) {
			r.push(`Your underarms are completely hairless.`);
		}
		option = options.addOption(r.join(" "), "underArmHColor", PC);
		if (hasPitHair) {
			if (PC.underArmHColor !== PC.hColor) {
				option.addValue("Match the hair", PC.hColor);
			}
			option.addValueList(makeAList(App.Medicine.Modification.Color.Primary.map(color => color.value)))
				.pulldown();
			// Style
			option = options.addOption(`Style your armpit hair`, "underArmHStyle", PC);
			for (const fullness of App.Medicine.Modification.armpitStyles) {
				option.addValue(capFirstChar(fullness), fullness);
			}
			option.pulldown();
		}

		el.append(options.render());
		return el;
	}

	function tail() {
		const el = new DocumentFragment();
		App.UI.DOM.appendNewElement("h3", el, "Tail");
		const options = new App.UI.OptionsGroup();
		let title;
		let option;
		const filtered = App.Medicine.Modification.Color.Primary.filter(c => ![PC.tailColor].includes(c.value));

		title = `Your tail is ${PC.tailColor}${PC.tailEffect === "none" ? `` : ` with ${PC.tailEffect}`}.`;
		App.UI.DOM.appendNewElement("div", el, title);

		if (PC.earT !== "none" && (PC.earTColor !== PC.tailColor || PC.earTEffect !== PC.tailEffect)) {
			options.addCustomOption("")
				.addButton("Match your ears", () => {
					PC.tailColor = PC.earTColor;
					PC.tailEffect = PC.earTEffect;
					App.UI.reload();
				});
		} else if (PC.tailColor !== PC.hColor) {
			options.addCustomOption("")
				.addButton("Match your hair", () => {
					PC.tailColor = PC.hColor;
					PC.tailEffect = PC.hEffect;
					App.UI.reload();
				});
		}

		if (PC.tailEffect !== "none" || PC.tailEffectColor !== "none") {
			options.addCustomOption("")
				.addButton("Remove effects", () => {
					PC.tailEffect = "none";
					PC.tailEffectColor = "none";
					App.UI.reload();
				});
		}

		option = options.addOption("Fur Color", "tailColor", PC);
		for (const color of App.Medicine.Modification.Color.Primary) {
			option.addValue(capFirstChar(color.value), color.value);
		}
		option.pulldown();

		option = options.addOption("Effect", "tailEffect", PC);
		for (const color of App.Medicine.Modification.Color.Effect) {
			option.addValue(capFirstChar(color.value), `${PC.tailEffectColor} ${color.value}`);
		}
		option.pulldown();

		option = options.addOption("Effect color", "tailEffectColor", PC);
		for (const color of filtered) {
			option.addValue(capFirstChar(color.value), color.value);
		}
		option.pulldown();

		el.append(options.render());

		return el;
	}

	function appendages() {
		const el = new DocumentFragment();
		App.UI.DOM.appendNewElement("h3", el, "Appendages");
		const options = new App.UI.OptionsGroup();
		let title;
		let option;
		const filtered = App.Medicine.Modification.Color.Primary.filter(c => ![PC.appendagesColor].includes(c.value));

		title = `Your appendages are ${PC.appendagesColor}${PC.appendagesEffect === "none" ? `` : ` with ${PC.appendagesEffect}`}.`;
		App.UI.DOM.appendNewElement("div", el, title);

		if (PC.appendagesEffect !== "none" || PC.appendagesEffectColor !== "none") {
			options.addCustomOption("")
				.addButton("Remove effects", () => {
					PC.appendagesEffect = "none";
					PC.appendagesEffectColor = "none";
					App.UI.reload();
				});
		}

		option = options.addOption("Fur Color", "appendagesColor", PC);
		for (const color of App.Medicine.Modification.Color.Primary) {
			option.addValue(capFirstChar(color.value), color.value);
		}
		option.pulldown();

		option = options.addOption("Effect color", "appendagesEffectColor", PC);
		for (const color of filtered) {
			option.addValue(capFirstChar(color.value), color.value);
		}
		option.pulldown();

		option = options.addOption("Effect", "appendagesEffect", PC);
		for (const color of App.Medicine.Modification.Color.Effect) {
			option.addValue(capFirstChar(color.value), `${PC.appendagesEffectColor} ${color.value}`);
		}
		option.pulldown();

		el.append(options.render());

		return el;
	}

	function skin() {
		const el = new DocumentFragment();
		let option;
		App.UI.DOM.appendNewElement("h3", el, "Skin");
		const options = new App.UI.OptionsGroup();
		let comment = [];

		if (!isMovable(PC)) {
			App.UI.DOM.appendNewElement("div", el, `You can't do anything more as you are too large to leave your bed.`, "scene-intro");
		} else {
			App.UI.DOM.appendNewElement("div", el, `You can use the auto salon to modify yourself further.`, "skin-intro");

			option = options.addOption(`You have ${PC.skin} skin.`, "skin", PC);
			if (App.Medicine.Modification.dyedSkins.includes(PC.skin)) {
				option.addValue("Remove coloring", PC.origSkin, billMod);
			} else if ((PC.skin === "sun tanned") || (PC.skin === "spray tanned")) {
				option.addValue("Remove tanning", PC.origSkin, billMod);
			}

			if (!App.Medicine.Modification.dyedSkins.includes(PC.skin)) {
				if (PC.skin !== "sun tanned") {
					if (skinToneLevel(PC.skin) < 6) {
						comment.push(`Your skin is so light in color that any attempt at natural tanning is likely to damage your skin.`);
					} else if ((skinToneLevel(PC.skin) > 20)) {
						comment.push(`Your skin is so dark in color that any attempt at natural tanning is not likely to appear on your skin.`);
					} else {
						option.addValue("Sun tan", "sun tanned", billMod);
					}
				}
				if (PC.skin !== "spray tanned") {
					option.addValue("Spray tan", "sun tanned", billMod);
				}
				option.addComment(comment.join(" "));
			}

			option = options.addOption(`Dye or paint`, "skin", PC).showTextBox();
			for (const dye of App.Medicine.Modification.dyedSkins) {
				option.addValue(capFirstChar(dye), dye, billMod);
			}
			option.pulldown();

			if (PC.markings === "beauty mark") {
				option = options.addOption(`You have a prominent mole on your face`, "markings", PC)
					.addValue("Remove it", "none", billMod);
				if (PC.face > 40) {
					option.addComment(`Your face is so attractive that the mole qualifies as a beauty mark and enhances your allure.`);
				} else if (PC.face < -10) {
					option.addComment(`It isn't very attractive.`);
				} else {
					option.addComment(`It makes you stand out more, but that's all.`);
				}
			}
			if (PC.markings === "birthmark") {
				option = options.addOption(`You have a large visible birthmark`, "markings", PC)
					.addValue("Bleach it", "none", billMod);
				if (PC.prestige > 0) {
					option.addComment(`It makes you look unique among your peers.`);
				}
			}
		}
		el.append(options.render());

		return el;
	}

	function billMod() {
		cashX(forceNeg(V.modCost), "PCcosmetics", PC);
	}

	function makeAList(iterable) {
		return Array.from(iterable, (k => [capFirstChar(k), k]));
	}
};
