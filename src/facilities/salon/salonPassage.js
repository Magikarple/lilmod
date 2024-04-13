/**
 * UI for the Salon. Refreshes without refreshing the passage.
 * @param {App.Entity.SlaveState} slave
 * @param {boolean} [cheat=false] if true, will hide scenes and keep the player from being billed for changes.
 * @param {boolean} [startingGirls=false] change systems for starting girls
 */
App.UI.salon = function(slave, cheat = false, startingGirls = false) {
	const container = document.createElement("span");
	container.id = "salon";
	const {
		He, His,
		he, his, him
	} = getPronouns(slave);

	container.append(createPage());
	return container;

	function createPage() {
		const el = new DocumentFragment();
		if (!cheat) {
			App.Events.drawEventArt(el, slave);
			el.append(intro());
		}
		if (!startingGirls) {
			// Starting girls has its own, more powerful, eye modifier which interferes with this one.
			// TODO: unify them
			el.append(eyewear());
		}
		if (
			(["leopard", "tiger", "jaguar"].includes(slave.earT) && slave.earTColor !== "hairless") ||
			["leopard", "tiger", "jaguar", "gazelle", "tanuki", "raccoon"].includes(slave.tailShape) ||
			slave.wingsShape === "moth"
		) {
			el.append(pattern());
		}
		el.append(ears());
		if (slave.horn !== "none") {
			el.append(horns());
		}
		el.append(hair());
		el.append(makeup());
		el.append(nails());
		el.append(skin());
		el.append(bodyHair());
		if (slave.tail !== "none") {
			el.append(tail());
		}
		if (slave.appendages !== "none") {
			el.append(appendages());
		}
		return el;
	}

	function intro() {
		const el = new DocumentFragment();
		App.UI.DOM.appendNewElement("h1", el, "The Auto Salon");
		App.UI.DOM.appendNewElement("div", el, `${SlaveFullName(slave)} is seated in the auto salon. ${He} is awaiting your artistic pleasure.`, "scene-intro");
		return el;
	}

	function eyewear() {
		const el = new DocumentFragment();
		App.UI.DOM.appendNewElement("h3", el, "Eyewear");
		const r = [];
		const options = new App.UI.OptionsGroup();

		if (getBestVision(slave) === 0) {
			r.push(`${He} is blind`);
		} else if (anyVisionEquals(slave, 1)) {
			r.push(`${He} is nearsighted`);
		} else {
			r.push(`${His} vision is normal`);
		}

		const option = options.addOption(r.join(" "), "eyewear", slave)
			.addValue("None", "none")
			.addValue("Cosmetic glasses", "glasses", billMod);
		if (getBestVision(slave) !== 0 && anyVisionEquals(slave, 1)) {
			option.addValue("Corrective glasses", "corrective glasses", billMod);
			if (hasAnyEyes(slave)) {
				option.addValue("Corrective contacts", "corrective contacts", billMod);
			}
		} else {
			option.addValue("Blurring glasses", "blurring glasses", billMod);
			if (hasAnyEyes(slave)) {
				option.addValue("Blurring contacts", "blurring contacts", billMod);
			}
			if (getBestVision(slave) !== 0) {
				option.addComment("Blurring options are annoying and impede performance on some assignments.");
			}
		}
		el.append(options.render());

		el.append(App.Medicine.Modification.eyeSelector(slave, cheat));
		return el;
	}

	function pattern() {
		const el = new DocumentFragment();
		App.UI.DOM.appendNewElement("h3", el, "Pattern");

		el.append(App.Medicine.Salon.pattern(slave, cheat));

		return el;
	}

	function ears() {
		const el = new DocumentFragment();
		App.UI.DOM.appendNewElement("h3", el, "Ears");
		const r = [];
		const options = new App.UI.OptionsGroup();

		if (slave.earImplant === 1) {
			r.push(`${He} has artificial inner ear implants`);
		} else if (slave.hears < -1) {
			r.push(`${He} is deaf`);
		} else if (slave.hears > -1) {
			r.push(`${His} hearing is normal`);
		} else {
			r.push(`${He} is hearing impaired`);
		}
		const option = options.addOption(r.join(" "), "earwear", slave)
			.addValue("None", "none");
		// Hard of hearing
		if (slave.hears === -1 && slave.earImplant !== 1) {
			option.addValue("Hearing aids", "hearing aids", billMod);
		}
		// Is not deaf
		if (slave.hears > -2 || slave.earImplant === 1) {
			option.addValue("Muffling ear plugs", "muffling ear plugs", billMod);
			option.addValue("Deafening ear plugs", "deafening ear plugs", billMod);
		}

		// Top ear Color
		if (slave.earT !== "none" && slave.earTColor !== "hairless") {
			let title;
			let option;
			let showChoices = true;
			const filtered = App.Medicine.Modification.Color.Primary.filter(c => ![slave.earTColor].includes(c.value));

			title = `${His} ears are ${slave.earTColor}${slave.earTEffect === "none" ? `.` : ` and have ${slave.earTEffect}.`}`;
			App.UI.DOM.appendNewElement("div", el, title);

			if (showChoices) {
				if (cheat) {
					if (slave.tail !== "none" && (slave.earTColor !== slave.tailColor || slave.earTEffect !== slave.tailEffect)) {
						options.addCustomOption("")
							.addButton("Match tail", () => {
								slave.earTColor = slave.tailColor;
								slave.earTEffect = slave.tailEffect;
								App.UI.reload();
							});
					} else if (slave.earTColor !== slave.hColor) {
						options.addCustomOption("")
							.addButton("Match current hair", () =>{
								slave.earTColor = slave.hColor;
								App.UI.reload();
							});
					}
				}

				if (slave.earTEffect !== "none" || slave.earTEffectColor !== "none") {
					options.addCustomOption("")
						.addButton("Remove effect", () => {
							slave.earTEffect = "none";
							slave.earTEffectColor = "none";
							App.UI.reload();
						});
				}

				option = options.addOption("Fur Color", "earTColor", slave);
				for (const color of App.Medicine.Modification.Color.Primary) {
					option.addValue(capFirstChar(color.value), color.value, billMod);
				}
				option.pulldown();

				option = options.addOption("Effect color", "earTEffectColor", slave);
				for (const color of filtered) {
					option.addValue(capFirstChar(color.value), color.value, billMod);
				}
				option.pulldown();

				option = options.addOption("Effect", "earTEffect", slave);
				for (const color of App.Medicine.Modification.Color.Effect) {
					option.addValue(capFirstChar(color.value), `${slave.earTEffectColor} ${color.value}`, billMod);
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

		const option = options.addOption(`Set the color of ${his} ${slave.horn}`, "hornColor", slave);
		for (const hornColor of App.Medicine.Modification.hornColor) {
			option.addValue(capFirstChar(hornColor), hornColor, billMod);
		}

		el.append(options.render());

		return el;
	}

	function makeup() {
		const el = new DocumentFragment();
		App.UI.DOM.appendNewElement("h3", el, "Makeup");
		const options = new App.UI.OptionsGroup();

		options.addOption(App.Desc.makeup(slave), "makeup", slave)
			.addValue("Makeup free", 0)
			.addValue("Nice", 1, billMod)
			.addValue("Gorgeous", 2, billMod)
			.addValue("Slutty", 4, billMod)
			.addValue("Color-coordinate with hair", 3, billMod);

		options.addOption("", "makeup", slave)
			.addValue("Neon", 5, billMod)
			.addValue("Neon, color-coordinate with hair", 6, billMod);

		options.addOption("", "makeup", slave)
			.addValue("Metallic", 7, billMod)
			.addValue("Metallic, color-coordinate with hair", 8, billMod);

		el.append(options.render());

		return el;
	}

	function nails() {
		const el = new DocumentFragment();
		App.UI.DOM.appendNewElement("h3", el, "Nails");
		const options = new App.UI.OptionsGroup();

		options.addOption(App.Desc.nails(slave), "nails", slave)
			.addValue("Neatly clipped", 0, billMod)
			.addValue("Long and elegant", 1, billMod)
			.addValue("Sharp and claw-like", 3, billMod)
			.addValue("Bright and glittery", 4, billMod)
			.addValue("Very long and garish", 5, billMod)
			.addValue("Color-coordinate with hair", 2, billMod);

		options.addOption("", "nails", slave)
			.addValue("Neon", 6, billMod)
			.addValue("Neon, color-coordinate with hair", 7, billMod);

		options.addOption("", "nails", slave)
			.addValue("Metallic", 8, billMod)
			.addValue("Metallic, color-coordinate with hair", 9, billMod);

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
		const hasWig = (slave.bald === 1 && slave.hStyle !== "bald");
		const filtered = App.Medicine.Modification.Color.Primary.filter(c => ![slave.hColor].includes(c.value));

		if (slave.bald === 1) {
			if (slave.hStyle === "bald") {
				title = `${He} is completely bald.`;
				showChoices = false;
			} else {
				title = `${His} wig is ${slave.hColor}${slave.hEffect === "none" ? `` : ` with ${slave.hEffect}`}.`;
			}
		} else {
			title = `${His} hair is ${slave.hColor}${slave.hEffect === "none" ? `` : ` with ${slave.hEffect}`}.`;
		}
		App.UI.DOM.appendNewElement("div", el, title);

		if (slave.bald === 1) {
			options.addOption(`Use a wig`, "hStyle", slave)
				.addValue("Enable", "neat").on()
				.addValue("Disable", "bald").off();
		}

		if (showChoices || cheat) {
			if (slave.hLength > 1) {
				// Original color
				if (cheat) {
					option = options.addOption("Natural color", "origHColor", slave)
						.showTextBox();
					for (const color of App.Medicine.Modification.Color.Primary) {
						option.addValue(capFirstChar(color.value), color.value, billMod);
					}
					option.pulldown();

					options.addCustomOption("")
						.addButton("Sync body hair color", () => {
							slave.eyebrowHColor = slave.origHColor;
							slave.pubicHColor = slave.origHColor;
							slave.underArmHColor = slave.origHColor;
							App.UI.reload();
						});
				}
				// Color
				if (slave.hEffectColor !== "none" || slave.hEffect !== "none") {
					options.addCustomOption("")
						.addButton("Remove effects", () => {
							slave.hEffectColor = "none";
							slave.hEffect = "none";
							App.UI.reload();
						});
				}
				option = options.addOption("Primary color", "hColor", slave);
				if (slave.origHColor !== slave.hColor) {
					option.addValue("Restore natural color", slave.origHColor, billMod);
				}
				for (const color of App.Medicine.Modification.Color.Primary) {
					option.addValue(capFirstChar(color.value), color.value, billMod);
				}
				option.pulldown();

				option = options.addOption("Effect color", "hEffectColor", slave);
				for (const color of filtered) {
					option.addValue(capFirstChar(color.value), color.value, billMod);
				}
				option.pulldown();

				option = options.addOption("Effect", "hEffect", slave);
				for (const color of App.Medicine.Modification.Color.Effect) {
					option.addValue(capFirstChar(color.value), `${slave.hEffectColor} ${color.value}`, billMod);
				}
				option.pulldown();
			}
			// Style
			if (slave.hLength > 1) {
				title = `Style ${hasWig ? "wig" : "hair"} `;
			} else {
				title = `${His} ${hasWig ? "wig" : "hair"} is too short to style meaningfully`;
			}
			option = options.addOption(title, "hStyle", slave);
			if (slave.hLength > 1) {
				for (const style of App.Medicine.Modification.hairStyles.Normal) {
					option.addValue(style.title, style.value, billMod);
				}
				option.pulldown();
			}

			// Style + Cut
			if (slave.hLength > 1) {
				option = options.addOption(`${hasWig ? "Change wig style and length" : "Cut and style hair"}`, "hStyle", slave);
				if (slave.hLength > 1) {
					for (const style of App.Medicine.Modification.hairStyles.Cut) {
						option.addValue(
							style.title,
							style.value,
							() => {
								slave.hLength = style.hLength;
								billMod();
							});
					}
				}
			}

			// Length
			option = options.addOption(`${hasWig ? "Find longer or shorter wig" : "Cut or lengthen hair"}`, "hLength", slave);
			if (slave.hLength > 0) {
				for (const style of App.Medicine.Modification.hLength) {
					if (
						(style.hasOwnProperty("requirements") && !style.requirements(slave)) ||
						(style.hLength && style.hLength > slave.hLength)
					) {
						continue;
					}
					option.addValue(style.title, style.hLength, billMod);
				}
				if (!slave.bald && slave.hLength < 150) {
					option.addValue("Apply extensions", slave.hLength + 10, billMod);
				}
			} else {
				option.addValue("Apply hair growth stimulating treatment", 1);
			}

			option.showTextBox();

			// Maintain
			if (!hasWig) {
				options.addOption(`Maintain this length`, "haircuts", slave)
					.addValue("Enable", 1).on()
					.addValue("Disable", 0).off();
			}
		}

		el.append(options.render());
		return el;
	}

	function skin() {
		const el = new DocumentFragment();
		let option;
		App.UI.DOM.appendNewElement("h3", el, "Skin");
		const options = new App.UI.OptionsGroup();
		let comment = [];

		if (cheat) {
			option = options.addOption(`${His} natural skin color is`, "origSkin", slave).showTextBox().pulldown();
			const naturalSkins = slave.race === "catgirl" ? App.Medicine.Modification.catgirlNaturalSkins : App.Medicine.Modification.naturalSkins;
			for (const skin of naturalSkins) {
				option.addValue(capFirstChar(skin), skin, () => slave.skin = slave.origSkin);
			}
		}

		option = options.addOption(`${His} skin is ${slave.skin}.`, "skin", slave);
		if (App.Medicine.Modification.dyedSkins.includes(slave.skin)) {
			option.addValue("Remove coloring", slave.origSkin, billMod);
		} else if ((slave.skin === "sun tanned") || (slave.skin === "spray tanned")) {
			option.addValue("Remove tanning", slave.origSkin, billMod);
		}

		if (!App.Medicine.Modification.dyedSkins.includes(slave.skin)) {
			if (slave.skin === "sun tanned" || slave.skin === "spray tanned") {
				comment.push(`${His} skin tanning must be removed before any advanced procedure to change ${his} skin color.`);
			} else {
				if (skinToneLevel(slave.skin) > 1) {
					option.addValue("Bleach", changeSkinTone(slave.skin, -2), billMod);
				}
				if (skinToneLevel(slave.skin) > 8) {
					option.addValue("Lighten", changeSkinTone(slave.skin, -1), billMod);
				}
				if (skinToneLevel(slave.skin) < 18) {
					option.addValue("Darken", changeSkinTone(slave.skin, 1), billMod);
				}
				if (skinToneLevel(slave.skin) < 25) {
					option.addValue("Blacken", changeSkinTone(slave.skin, 2), billMod);
				}
			}
			if (slave.skin !== "sun tanned") {
				if (skinToneLevel(slave.skin) < 6) {
					comment.push(`${His} skin is so light in color that any attempt at natural tanning is more likely to damage ${his} skin.`);
				} else if ((skinToneLevel(slave.skin) > 20)) {
					comment.push(`${His} skin is so dark in color that any attempt at natural tanning is not likely to appear on ${his} skin.`);
				} else {
					option.addValue("Sun tan", "sun tanned", billMod);
				}
			}
			if (slave.skin !== "spray tanned") {
				option.addValue("Spray tan", "sun tanned", billMod);
			}
			option.addComment(comment.join(" "));
		}

		option = options.addOption(`Dye or paint`, "skin", slave).showTextBox();
		for (const dye of App.Medicine.Modification.dyedSkins) {
			option.addValue(capFirstChar(dye), dye, billMod);
		}

		if (cheat) {
			options.addOption(`${His} skin's marks are`, "markings", slave)
				.addValueList([
					["None", "none"],
					["Freckles", "freckles"],
					["Heavily freckled", "heavily freckled"],
					["Beauty mark", "beauty mark"],
					["Birthmark", "birthmark"],
				]);
		}
		option.pulldown();

		if (slave.markings === "beauty mark") {
			option = options.addOption(`${He} has a prominent mole on ${his} face`, "markings", slave)
				.addValue("Remove it", "none", billMod);
			if (slave.face > 40) {
				option.addComment(`The mole qualifies as a beauty mark and enhances ${his} attractiveness due to ${his} facial beauty.`);
			} else if (slave.face < -10) {
				option.addComment(`The mole makes ${him} even less attractive.`);
			} else {
				option.addComment(`The mole qualifies as a beauty mark since ${he}'s pretty, having no significant impact on ${his} beauty.`);
			}
		}
		if (slave.markings === "birthmark") {
			option = options.addOption(`${He} has a large birthmark`, "markings", slave)
				.addValue("Bleach it", "none", billMod);
			if (slave.prestige > 0 || slave.porn.prestige > 1) {
				option.addComment(`The birthmark enhances ${his} attractiveness due to ${his} prestige.`);
			} else {
				option.addComment(`The birthmark detracts from ${his} attractiveness.`);
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
		if (slave.eyebrowHStyle !== "bald" || cheat) {
			// Describe and change color
			r.push(`${His} eyebrows`);
			if (slave.eyebrowHStyle === "shaved" || slave.eyebrowHStyle === "bald") {
				r.push(`would be ${slave.eyebrowHColor} if present.`);
			} else {
				r.push(`are ${slave.eyebrowHColor}.`);
			}

			option = options.addOption(r.join(" "), "eyebrowHColor", slave);
			if (slave.eyebrowHColor !== slave.hColor) {
				option.addValue("Match the hair", slave.hColor);
			}
			option.addValueList(makeAList(App.Medicine.Modification.Color.Primary.map(color => color.value)));
			option.addGlobalCallback(billMod);
			option.pulldown();

			// Style
			option = options.addOption(`Style ${his} eyebrow hair`, "eyebrowHStyle", slave).showTextBox();
			for (const fullness of App.Medicine.Modification.eyebrowStyles) {
				option.addValue(capFirstChar(fullness), fullness, billMod);
			}
			if (cheat) {
				option.addValue("Bald", "bald");
			}
			option.pulldown();

			// Fullness
			option = options.addOption(`Fullness of ${his} eyebrow hair`, "eyebrowFullness", slave);
			for (const fullness of App.Medicine.Modification.eyebrowFullness) {
				option.addValue(capFirstChar(fullness), fullness, billMod);
			}
			option.pulldown();
		} else {
			options.addComment(`${His} eyebrows are completely hairless.`);
		}

		// Pubic hair
		const pubertyAge = Math.min(slave.pubertyAgeXX, slave.pubertyAgeXY);
		r = [];
		const hasPubes = (slave.pubicHStyle !== "bald" && slave.pubicHStyle !== "hairless" && slave.physicalAge >= pubertyAge - 1);
		if (hasPubes) {
			r.push(`${His}`);
			if (slave.physicalAge < pubertyAge) {
				r.push(`wispy pubic hair, which is just starting to grow in,`);
			} else if (slave.pubicHStyle === "in a strip") {
				r.push(`pubic hair, which is shaved into a strip,`);
			} else {
				r.push(`${slave.pubicHStyle} pubic hair`);
			}
			if (slave.pubicHStyle === "waxed") {
				r.push(`would be ${slave.pubicHColor} if present.`);
			} else {
				r.push(`is ${slave.pubicHColor}.`);
			}
		} else {
			r.push(`${His} groin is completely hairless.`);
		}
		option = options.addOption(r.join(" "), "pubicHColor", slave);
		if (hasPubes) {
			if (slave.pubicHColor !== slave.hColor) {
				option.addValue("Match the curtains", slave.hColor);
			}
			option.addValueList(makeAList(App.Medicine.Modification.Color.Primary.map(color => color.value)))
				.addGlobalCallback(billMod)
				.pulldown();
		}
		if (hasPubes || cheat) {
			// Style
			option = options.addOption(`Style ${his} pubic hair`, "pubicHStyle", slave);
			for (const fullness of App.Medicine.Modification.pubicStyles) {
				option.addValue(capFirstChar(fullness), fullness, billMod);
			}
			if (cheat) {
				option.addValue("Bald", "bald");
			}
			option.pulldown();
		}

		// Armpit hair
		r = [];
		const hasPitHair = (slave.underArmHStyle !== "bald" && slave.underArmHStyle !== "hairless" && slave.physicalAge >= pubertyAge - 1);
		if (hasPitHair) {
			r.push(`${His}`);
			if (slave.physicalAge < pubertyAge) {
				r.push(`wispy underarm hair`);
			} else {
				r.push(`${slave.underArmHStyle} underarm hair`);
			}
			if (slave.underArmHStyle === "waxed") {
				r.push(`would be ${slave.underArmHColor} if present.`);
			} else {
				r.push(`is ${slave.underArmHColor}.`);
			}
		} else {
			r.push(`${His} underarms are completely hairless.`);
		}
		option = options.addOption(r.join(" "), "underArmHColor", slave);
		if (hasPitHair) {
			if (slave.underArmHColor !== slave.hColor) {
				option.addValue("Match the hair", slave.hColor);
			}
			option.addValueList(makeAList(App.Medicine.Modification.Color.Primary.map(color => color.value)))
				.addGlobalCallback(billMod)
				.pulldown();
		}
		if (hasPitHair || cheat) {
			// Style
			option = options.addOption(`Style ${his} armpit hair`, "underArmHStyle", slave);
			for (const fullness of App.Medicine.Modification.armpitStyles) {
				option.addValue(capFirstChar(fullness), fullness, billMod);
			}
			if (cheat) {
				option.addValue("Bald", "bald");
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
		let showChoices = true;
		const filtered = App.Medicine.Modification.Color.Primary.filter(c => ![slave.tailColor].includes(c.value));

		title = `${He} has a tail that is ${slave.tailColor}${slave.tailEffect === "none" ? `` : ` and has ${slave.tailEffect}`}.`;
		App.UI.DOM.appendNewElement("div", el, title);

		if (showChoices) {
			if (cheat) {
				if (slave.earT !== "none" && (slave.earTColor !== slave.tailColor || slave.earTEffect !== slave.tailEffect)) {
					options.addCustomOption("")
						.addButton("Match ears", () => {
							slave.tailColor = slave.earTColor;
							slave.tailEffect = slave.earTEffect;
							App.UI.reload();
						});
				} else if (slave.tailColor !== slave.hColor) {
					options.addCustomOption("")
						.addButton("Match current hair", () => {
							slave.tailColor = slave.hColor;
							slave.tailEffect = slave.hEffect;
							App.UI.reload();
						});
				}
			}

			if (slave.tailEffect !== "none" || slave.tailEffectColor !== "none") {
				options.addCustomOption("")
					.addButton("Remove effect", () => {
						slave.tailEffect = "none";
						slave.tailEffectColor = "none";
						App.UI.reload();
					});
			}

			option = options.addOption("Fur Color", "tailColor", slave);
			for (const color of App.Medicine.Modification.Color.Primary) {
				option.addValue(capFirstChar(color.value), color.value, billMod);
			}
			option.pulldown();

			option = options.addOption("Effect color", "tailEffectColor", slave);
			for (const color of filtered) {
				option.addValue(capFirstChar(color.value), color.value, billMod);
			}
			option.pulldown();

			option = options.addOption("Effect", "tailEffect", slave);
			for (const color of App.Medicine.Modification.Color.Effect) {
				option.addValue(capFirstChar(color.value), `${slave.tailEffectColor} ${color.value}`, billMod);
			}
			option.pulldown();
		}
		el.append(options.render());

		return el;
	}

	function appendages() {
		const el = new DocumentFragment();
		App.UI.DOM.appendNewElement("h3", el, "Appendages");
		const options = new App.UI.OptionsGroup();
		let title;
		let option;
		let showChoices = true;
		const filtered = App.Medicine.Modification.Color.Primary.filter(c => ![slave.appendagesColor].includes(c.value));

		title = `${He} has ${slave.appendagesColor} appendages${slave.appendagesEffect === "none" ? `` : ` that have ${slave.appendagesEffect}`}.`;
		App.UI.DOM.appendNewElement("div", el, title);

		if (showChoices) {
			if (slave.appendagesEffect !== "none" || slave.appendagesEffectColor !== "none") {
				options.addCustomOption("")
					.addButton("Remove effect", () => {
						slave.appendagesEffect = "none";
						slave.appendagesEffectColor = "none";
						App.UI.reload();
					});
			}

			option = options.addOption("Fur Color", "appendagesColor", slave);
			for (const color of App.Medicine.Modification.Color.Primary) {
				option.addValue(capFirstChar(color.value), color.value, billMod);
			}
			option.pulldown();

			option = options.addOption("Effect color", "appendagesEffectColor", slave);
			for (const color of filtered) {
				option.addValue(capFirstChar(color.value), color.value, billMod);
			}
			option.pulldown();

			option = options.addOption("Effect", "appendagesEffect", slave);
			for (const color of App.Medicine.Modification.Color.Effect) {
				option.addValue(capFirstChar(color.value), `${slave.appendagesEffectColor} ${color.value}`, billMod);
			}
			option.pulldown();
		}
		el.append(options.render());

		return el;
	}

	function billMod() {
		if (!cheat) {
			cashX(forceNeg(V.modCost), "slaveMod", slave);
		}
	}

	function makeAList(iterable) {
		return Array.from(iterable, (k => [capFirstChar(k), k]));
	}
};
