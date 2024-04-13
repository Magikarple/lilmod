// cSpell:ignore unpierced

/**
 * UI for the Body Modification system/studio. Refreshes without refreshing the passage.
 * @param {App.Entity.SlaveState} slave
 * @param {boolean} cheat if true, will hide scenes, prevent damage to slaves, and keep the player from being billed for mods.
 */
App.UI.bodyModification = function(slave, cheat = false) {
	const container = document.createElement("span");
	container.id = "body-modification";
	const {
		He, His,
		he, his, him, himself
	} = getPronouns(slave);
	let piercingLevel = 1;
	let modReaction = "";
	/** @type {string|0} */
	let tattooChoice = "";
	let scarApplied = false;
	let brandApplied = false;
	let degradation = 0;

	container.append(createPage());
	return container;

	function createPage() {
		const el = new DocumentFragment();
		if (!cheat) {
			App.Events.drawEventArt(el, slave);
			el.append(intro());
			el.append(reaction());
		}
		el.append(piercings());
		el.append(tattoos());
		el.append(branding());
		el.append(scar());
		return el;
	}

	function intro() {
		const el = new DocumentFragment();
		App.UI.DOM.appendNewElement("h1", el, "Body Modification Studio");
		App.UI.DOM.appendNewElement("div", el, `${SlaveFullName(slave)} is lying strapped down on the table in your body modification studio. ${He} is entirely at your mercy.`, "scene-intro");
		return el;
	}

	function reaction() {
		const el = new DocumentFragment();
		let r = [];
		if (brandApplied || degradation || scarApplied || modReaction) {
			if (slave.fuckdoll === 0) {
				if (canSee(slave)) {
					r.push(`There's a mirror on the ceiling, so ${he} can see`);
				} else {
					r.push(`${He} can't see, so `);
					if (canHear(slave)) {
						r.push(`you're careful to describe`);
					} else {
						r.push(`${he} must, by ${himself}, get a feel for`);
					}
				}
				r.push(`${his} new appearance.`);
			}
			if (brandApplied) {
				r.push(`The smell of burnt flesh hangs in the air. Being branded <span class="health dec">has hurt ${his} health a little.</span>`);
				healthDamage(slave, 10);
				brandApplied = false;
			}
			if (scarApplied) {
				if (V.scarTarget.local === "entire body") {
					switch (V.scarDesign.local) {
						case "burn":
							r.push(`Your goal wasn't to make the distinct shape of a brand, but rather to permanently mar the skin with an open flame.`);
							break;
						case "surgical":
							if (V.PC.skill.medicine >= 100) {
								r.push(`Your medical mastery is perfect, so creating Frankenstein's monster was a deliberate work of art.`);
							} else if (V.PC.skill.medicine > 0) {
								r.push(`Your medical skills are progressing, and the Frankenstein effect reminds you of your earliest attempts.`);
							} else {
								r.push(`You really slashed away with your knife, but were careful not to allow ${him} to bleed out.`);
							}
							break;
						default:
							r.push(`The best way to apply scarring to the entire body is with a good old fashioned whip. ${His} body is a mess of crisscrossed `);
							if (hasAnyNaturalLimbs(slave)) {
								r.push(`lines, and ${his} `);
								if (getLimbCount(slave, piercingLevel) > 1) {
									r.push(`limbs twisted so violently in their restraints that they too have`);
								} else {
									r.push(`only limb twists so violently in its restraints that it too has`);
								}
								r.push(`become scarred.`);
							} else {
								r.push(`lines.`);
							}
					}
					r.push(`No matter how you chose to apply it, scarring so much of ${his} body has <span class="health dec"> hurt ${his} health.</span>`);
					healthDamage(slave, 20);
				} else {
					if (App.Medicine.Modification.scarRecord(slave)[V.scarTarget.local][V.scarDesign.local] > 0) {
						r.push(`This is not the first time ${he} was scarred like this.`);
					}
					switch (V.scarDesign.local) {
						case "whip":
							r.push(`Targeting a single area with a whip is not easy. You set the mood by carefully arranging candles dripping on to a whimpering ${slave.slaveName}, then got ${his} attention with a quick`);
							if (canSee(slave)) {
								r.push(`wave`);
							} else if (canHear(slave)) {
								r.push(`crack`);
							} else {
								r.push(`tap`);
							}
							r.push(`of the whip. One by one, you carefully snuffed out the candles, flicking hot wax as you went. After pausing a moment, you prepared to leave your mark.`);
							if (["penis", "vagina"].includes(V.scarTarget.local)) {
								if (slave.dick > 4 && V.seeDicks) {
									r.push(`${His} dick was large enough that it was not too difficult to hit,`);
								} else if (slave.dick > 0 && V.seeDicks) {
									r.push(`${His} dick was a challengingly small target,`);
								} else {
									if (slave.clit > 0) {
										r.push(`${His} clit was a difficult target,`);
									} else {
										r.push(`${His} clit was an impossibly tiny target,`);
									}
								}
								r.push(`but the end was never in doubt. The tip connected with ${his} most intimate place on the first try, and plunged ${him} into absolute agony.`);
							} else {
								r.push(`The	end was never in doubt. A few strokes of the whip plunged ${him} into agony ${his} body will not allow ${him} to forget.`);
							}
							break;
						case "burn":
							r.push(`Your goal wasn't to make the distinct shape of a brand, but rather to permanently mar the ${slave.skin} skin of ${his} ${V.scarTarget.local} with an open flame.`);
							break;
						case "surgical":
							if (V.PC.skill.medicine >= 100) {
								r.push(`Your medical mastery is perfect, so creating such a scar was a deliberate act of degradation.`);
							} else if (V.PC.skill.medicine > 0) {
								r.push(`Your medical skills are progressing, and the sloppy scar reminds you of your earliest attempts.`);
							} else {
								r.push(`You really slashed away at ${V.scarTarget.local} with your knife, but were careful not to allow ${him} to bleed out.`);
							}
							break;
						default:
							r.push(`You had no shortage of kinky and medical tools for applying scars. ${His} ${slave.skin} ${V.scarTarget.local} is bleeding profusely.`);
					}

					r.push(`No matter how you chose to apply it, being scarred <span class="health dec"> hurt ${his} health a little.</span>`);
					healthDamage(slave, 10);
				}
				r.push(`Afterwards you seal the wounds with a white medical spray. Infection is no risk to ${slave.slaveName} thanks to your curatives, but in order to form obvious scar tissue you had to keep air out and delay normal healing as long as possible.`);
				scarApplied = false;
			}
			if (slave.fetish !== Fetish.MINDBROKEN && slave.fuckdoll === 0) {
				if (degradation > 1) {
					if (degradation > 5) {
						if (slave.devotion <= 50 && slave.trust < -50) {
							r.push(`${He} is appalled by the whorish spectacle you have made of ${him}. ${He} <span class="gold">fears</span> you all the more for this but is so terrified of you it does not affect ${his} submission.`);
							slave.trust -= 10;
						} else if (slave.devotion <= 50) {
							r.push(`${He} is appalled by the whorish spectacle you have made of ${him}. ${He} <span class="mediumorchid">hates</span> and <span class="gold">fears</span> you for this.`);
							slave.devotion -= 10;
							slave.trust -= 10;
						} else {
							r.push(`${He} is shocked by the whorish spectacle you have made of ${him}. However, ${he} is so submissive to your will that ${he} <span class="hotpink">accepts</span> that the slave `);
							if (canSee(slave)) {
								r.push(`in the mirror`);
							} else {
								r.push(`${he} pictures`);
							}
							r.push(`is who ${he} is now.`);
							slave.devotion += 4;
						}
					} else {
						if (slave.devotion < -20 && slave.trust < 20) {
							r.push(`${He} is <span class="gold">afraid</span> that ${he} has been permanently altered against ${his} will, but is also scared of your reaction to any objection and suppresses ${his} disgust.`);
							slave.trust -= 5;
						} else if (slave.devotion < -20) {
							r.push(`${He} is <span class="mediumorchid">angry</span> and <span class="gold">afraid</span> that ${he} has been permanently altered against ${his} will.`);
							slave.devotion -= 5;
							slave.trust -= 5;
						} else {
							r.push(`${He} is saddened to have been altered against ${his} will. However, ${he} realizes that ${he} is a slave, so ${he} <span class="hotpink">accepts</span> your work.`);
							slave.devotion += 2;
						}
					}
					degradation = 0;
				}
				if (modReaction) {
					r.push(modReaction);
				}
			}
			modReaction = "";
		}
		App.Events.addNode(el, r, "p");
		return el;
	}

	function piercings() {
		const el = new DocumentFragment();
		let r = [];
		const piercingLocations = Object.keys(App.Data.Piercings);
		// DESCRIPTIONS
		App.UI.DOM.appendNewElement("h2", el, "Piercings");

		let pierced = false;
		let options = new App.UI.OptionsGroup();
		for (const piercing in slave.piercing) {
			if (slave.piercing[piercing].weight > 0) {
				const option = options.addOption(`${slave.piercing[piercing].weight === 1 ? 'L': 'H'} ${capFirstChar(piercing)} `, "desc", slave.piercing[piercing]);
				if (slave.piercing[piercing].desc) {
					option.addValue("Default", "")
						.showTextBox({large:true});
				} else {
					option.addValue("Edit", " ")
						.addComment(App.Desc.piercing(slave, piercing));
				}
				pierced = true;
			}
		}
		const chastity = App.Desc.piercing(slave, "chastity");
		if (chastity) {
			options.addComment(chastity);
			pierced = true;
		}

		if (pierced) {
			App.UI.DOM.appendNewElement("div", el, `Reminder for writing custom content: slave pronouns are usually written in the masculine, and start with '$'. "$His earlobes" becomes "Her earlobes" in text.`, "note");
		} else {
			options.addComment(`${His} smooth ${slave.skin} skin is completely unpierced.`);
		}
		el.append(options.render());

		// Apply piercings
		r.push(`Choose piercing style:`);
		const piercingLevelNames = new Map([
			["Remove", 0],
			["Light", 1],
			["Heavy", 2],
		]);
		let linkArray = [];
		for (const [title, num] of piercingLevelNames) {
			if (piercingLevel === num) {
				linkArray.push(App.UI.DOM.disabledLink(title, ["Currently selected"]));
			} else {
				linkArray.push(
					App.UI.DOM.link(
						title,
						() => {
							piercingLevel = num;
							refresh();
						}
					)
				);
			}
		}
		r.push(App.UI.DOM.generateLinksStrip(linkArray));
		App.Events.addNode(el, r, "div");
		r = [];

		// Determine parts that cannot be pierced
		let validPiercingLocations;

		if (piercingLevel === 0) { // Sometimes a piercing winds up in a place that is no longer valid. Make sure players can always remove an existing piercing.
			validPiercingLocations = Array.from(piercingLocations);
		} else {
			validPiercingLocations = [];
			for (const location of piercingLocations) {
				const locationData = App.Data.Piercings[location];
				if (locationData.hasOwnProperty("requirements") && !locationData.requirements(slave)) {
					continue;
				} else {
					validPiercingLocations.push(location);
				}
			}
		}

		if (piercingLevel === 0) {
			r.push(`Remove piercings from:`);
		} else if (piercingLevel === 1) {
			r.push(`Lightly pierce ${his}:`);
		} else if (piercingLevel === 2) {
			r.push(`Heavily pierce ${his}:`);
		}
		// Entire body
		linkArray = [];
		linkArray.push(
			App.UI.DOM.link(
				"Entire body",
				() => {
					for (const location of validPiercingLocations) {
						if (slave.piercing[location].weight !== piercingLevel) {
							modReaction += App.Medicine.Modification.setPiercing(slave, location, piercingLevel);
							billPiercing();
							if (piercingLevel > 1) {
								degradation += 1;
							}
						}
					}
					refresh();
				}
			)
		);

		// Each individual piercing
		for (const location of validPiercingLocations) {
			if (slave.piercing[location].weight !== piercingLevel) {
				linkArray.push(
					App.UI.DOM.link(
						capFirstChar(location),
						() => {
							modReaction = App.Medicine.Modification.setPiercing(slave, location, piercingLevel);
							billPiercing();
							if (piercingLevel > 1) {
								degradation += 1;
							}
							refresh();
						}
					)
				);
			}
		}
		r.push(App.UI.DOM.generateLinksStrip(linkArray));
		App.Events.addNode(el, r, "div");
		options = new App.UI.OptionsGroup();
		if (slave.piercing.genitals.weight) {
			options.addOption(`Smart vibe for ${his} genital piercing`, "smart", slave.piercing.genitals)
				.addValue("Installed", true).on().addCallback(() => billSP())
				.addValue("Empty", false).off();
		}
		el.append(options.render());
		return el;
	}

	function tattoos() {
		const el = new DocumentFragment();
		let r = [];
		let noTats;
		const tattooLocations = new Map([
			["shoulder", "shoulders"],
			["lips", "lips"],
			["breast", "boobs"],
			["upper arm", "arms"],
			["back", "back"],
			["lower back", "stamp"],
			["buttock", "butt"],
			["vagina", "vagina"],
			["dick", "dick"],
			["anus", "anus"],
			["leg", "legs"]
		]);
		// DESCRIPTIONS
		App.UI.DOM.appendNewElement("h2", el, "Tattoos");

		for (let name of tattooLocations.keys()) {
			name = (name === "leg") ? "thigh" : name; // Leg/thigh is a weird naming exception for now.
			const desc = App.Desc.tattoo(slave, name);
			if (desc) {
				r.push(App.UI.DOM.makeElement("div", desc));
			}
		}
		if (r.length === 0) {
			r.push(App.UI.DOM.makeElement("div", `${His} smooth ${slave.skin} skin is completely unmarked.`));
			noTats = true;
		}
		App.Events.addNode(el, r);
		r = [];

		// Apply tattoos
		r.push(`Choose a tattoo style:`);
		const tattooChoiceNames = new Set([
			"tribal patterns",
			"flowers",
			"counting",
			"advertisements",
			"rude words",
			"degradation",
			"Asian art",
			"scenes",
			"bovine patterns",
			"permanent makeup",
			"sacrilege",
			"sacrament",
			"possessive",
			"paternalist",
		]);
		if (slave.vaginaTat === 0) {
			tattooChoiceNames.add("lewd crest");
		}
		if (slave.anusTat === 0) {
			tattooChoiceNames.add("bleached");
		}
		const sortedTattooChoiceNames = Array.from(tattooChoiceNames).sort((a, b) => a > b ? 1 : -1);
		let linkArray = [];
		for (const style of sortedTattooChoiceNames) {
			if (tattooChoice === style) {
				linkArray.push(App.UI.DOM.disabledLink(capFirstChar(style), ["Currently selected"]));
			} else {
				linkArray.push(
					App.UI.DOM.link(
						capFirstChar(style),
						() => {
							tattooChoice = style;
							refresh();
						}
					)
				);
			}
		}
		if (!noTats) {
			linkArray.push(
				App.UI.DOM.link(
					"Remove a tattoo",
					() => {
						tattooChoice = 0;
						refresh();
					}
				)
			);
		}
		r.push(App.UI.DOM.generateLinksStrip(linkArray));
		App.Events.addNode(el, r, "div");
		r = [];

		// Determine parts that cannot be marked
		let validTattooLocations;
		if (tattooChoice === "bleached") {
			validTattooLocations = ["anus"];
		} else if (tattooChoice === "permanent makeup") {
			validTattooLocations = ["lips"];
		} else if (tattooChoice === "lewd crest") {
			validTattooLocations = ["vagina"];
		} else {
			validTattooLocations = Array.from(tattooLocations.keys());
			if (!hasAnyNaturalArms(slave)) {
				removeTattooLocation("upper arm");
			}
			if (!hasAnyNaturalArms(slave)) {
				removeTattooLocation("thigh");
			}

			if (slave.dick === 0 || tattooChoice === "scenes") {
				removeTattooLocation("dick");
			}
			if (tattooChoice === "scenes") {
				removeTattooLocation("lips");
			}
			if ((tattooChoice === "Asian art" || tattooChoice === "scenes") || slave.anusTat === "bleached") { // leave existing bleached anus alone
				removeTattooLocation("anus");
			}
		}

		function removeTattooLocation(location) {
			const index = validTattooLocations.indexOf(location);
			validTattooLocations.splice(index, 1);
		}

		if (tattooChoice === 0) {
			r.push(`Clean the ink off of ${his}:`);
		} else if (tattooChoice === "counting") {
			r.push(`Add tallies of ${his} sexual exploits to ${his}:`);
		} else if (tattooChoice === "bleached") {
			r.push(`Bleach ${his}:`);
		} else if (tattooChoice) {
			r.push(`Add ${tattooChoice} to ${his}:`);
		}
		// Entire body
		linkArray = [];
		if (tattooChoice !== undefined && validTattooLocations.length > 1) {
			linkArray.push(
				App.UI.DOM.link(
					"Entire body",
					() => {
						for (const location of validTattooLocations) {
							if (slave[`${location}tattoo`] !== tattooChoice) {
								applyTat(location, tattooChoice);
							}
						}
						refresh();
					}
				)
			);
		}
		// Each individual tattoo
		for (const location of validTattooLocations) {
			if (slave[`${tattooLocations.get(location)}Tat`] !== tattooChoice) {
				linkArray.push(
					App.UI.DOM.link(
						capFirstChar(location),
						() => {
							applyTat(location, tattooChoice);
							refresh();
						}
					)
				);
			}
		}
		r.push(App.UI.DOM.generateLinksStrip(linkArray));
		App.Events.addNode(el, r, "div");

		el.append(oddTattoos());

		const customEl = document.createElement("div");
		customEl.id = "custom-el";
		App.UI.DOM.appendNewElement("div", customEl, App.UI.DOM.link(
			"Show custom tattoo locations",
			() => {
				jQuery("#custom-el").empty().append(customTats());
			}
		), ['indent']);
		if (V.cheatMode && cheat) { // check both cheat gates so it does not show in SG.
			const options = new App.UI.OptionsGroup();
			options.addOption("Breeding mark", "breedingMark", slave)
				.addValue("On", 1).on()
				.addValue("Off", 0).off();
			el.append(options.render());
		}
		el.append(customEl);

		return el;

		function applyTat(location, style) {
			modReaction += App.Medicine.Modification.setTattoo(slave, tattooLocations.get(location), style, cheat);
			if (!["flowers", "paternalist", "tribal patterns", 0].includes(style)) {
				degradation += 1;
			}
		}

		function oddTattoos() {
			const frag = new DocumentFragment();
			let linkArray = [];
			let r = [];

			// Has tat, display option to remove
			if (slave.bellyTat !== 0) {
				r.push(`${His} navel is tattooed with ${slave.bellyTat}.`);
				linkArray.push(
					App.UI.DOM.link(
						"Remove tattoos",
						() => {
							tattooChoice = 0;
							modReaction += App.Medicine.Modification.setTattoo(slave, "belly", tattooChoice, cheat);
							refresh();
						}
					)
				);
			}

			if (slave.belly >= 10000 && slave.bellyPreg < 450000 && slave.bellyFluid < 5000) {
				if (slave.bellyTat === 0) {
					const bellyTats = new Map([
						["Heart", "a heart"],
						["Star", "a star"],
						["Butterfly", "a butterfly"],
					]);
					r.push(`${He} has no navel tattoos.`);
					for (const [title, value] of bellyTats) {
						linkArray.push(
							App.UI.DOM.link(
								title,
								() => {
									tattooChoice = value;
									modReaction += App.Medicine.Modification.setTattoo(slave, "belly", tattooChoice, cheat);
									refresh();
								}
							)
						);
					}
				}
			} else if (slave.bellyPreg >= 450000) {
				r.push(`${His} middle is large and taut enough to be a suitable canvas for a navel-focused tattoo, but ${his} brood is too active to permit the needle to do its work.`);
			} else if (slave.bellyFluid >= 10000) {
				r.push(`${His} middle is large and taut enough to be a suitable canvas for a navel-focused tattoo, but the pressure applied to ${his} stomach will likely force ${him} to release its contents.`);
			} else {
				r.push(`${His} middle isn't large enough to be a suitable canvas for a navel-focused tattoo.`);
			}
			r.push(App.UI.DOM.generateLinksStrip(linkArray));
			App.Events.addNode(frag, r, "div");

			r = [];
			linkArray = [];
			if (slave.birthsTat === -1) {
				r.push(`Have ${him} receive a tattoo each time ${he} gives birth.`);
				linkArray.push(
					App.UI.DOM.link(
						"Begin keeping track",
						() => {
							slave.birthsTat = 0;
							refresh();
						}
					)
				);
			} else {
				if (slave.birthsTat > 0) {
					if (slave.birthsTat > 1) {
						r.push(`${He} has a series of ${num(slave.birthsTat)} baby-shaped tattoos adorning ${his} stomach; one for each successful`);
						if (slave.pregKnown === 1) {
							r.push(`pregnancy and a temporary one for ${his} current pregnancy.`);
						} else {
							r.push(`pregnancy.`);
						}
					} else {
						r.push(`${He} has a single baby-shaped tattoo${(slave.pregKnown === 1) ? `, and one temporary one,` : ``} adorning ${his} stomach.`);
					}
					linkArray.push(
						App.UI.DOM.link(
							"Remove tattoos",
							() => {
								slave.birthsTat = -1;
								billMod();
								refresh();
							}
						)
					);
				} else if (slave.birthsTat === 0) {
					if (slave.pregKnown === 1) {
						r.push(`${He} has a single baby-shaped temporary tattoo adorning ${his} stomach.`);
						linkArray.push(
							App.UI.DOM.link(
								"Remove it",
								() => {
									slave.birthsTat = -1;
									refresh();
								}
							)
						);
					} else {
						r.push(`${He} is scheduled to receive a tattoo each time ${he} gives birth.`);
						linkArray.push(
							App.UI.DOM.link(
								"Cancel",
								() => {
									slave.birthsTat = -1;
									refresh();
								}
							)
						);
					}
				}
				if (slave.birthsTat !== slave.counter.births) {
					linkArray.push(
						App.UI.DOM.link(
							`Add tattoos to match (total) births (${slave.counter.births})`,
							() => {
								slave.birthsTat = slave.counter.births;
								billMod();
								refresh();
							}
						)
					);
				}
				if (slave.birthsTat > 1) {
					r.push(`Remove some marks:`);
					r.push(
						App.UI.DOM.makeTextBox(
							0,
							v => {
								if (slave.birthsTat > v) {
									slave.birthsTat -= v;
									if (v) {
										billMod();
									}
								}
								refresh();
							},
							true
						)
					);
				}
			}
			r.push(App.UI.DOM.generateLinksStrip(linkArray));
			App.Events.addNode(frag, r, "div");

			r = [];
			linkArray = [];
			if (slave.abortionTat === -1) {
				r.push(`Have ${him} receive a tattoo for each abortion or miscarriage ${he} has.`);
				linkArray.push(
					App.UI.DOM.link(
						"Begin keeping track",
						() => {
							slave.abortionTat = 0;
							refresh();
						}
					)
				);
			} else {
				if (slave.abortionTat > 0) {
					if (slave.abortionTat > 1) {
						r.push(`${He} has a series of ${num(slave.abortionTat)} crossed out baby-shaped tattoos${(slave.pregKnown === 1) ? `, and one uncrossed one,` : ``} adorning ${his} stomach.`);
					} else {
						r.push(`${He} has a single crossed out baby-shaped tattoo${(slave.pregKnown === 1) ? `, and one uncrossed one,` : ``} adorning ${his} stomach.`);
					}
					linkArray.push(
						App.UI.DOM.link(
							"Remove tattoos",
							() => {
								slave.abortionTat = -1;
								billMod();
								refresh();
							}
						)
					);
				} else if (slave.abortionTat === 0) {
					if (slave.pregKnown === 1) {
						r.push(`${He} has a single baby-shaped temporary tattoo adorning ${his} stomach.`);
						linkArray.push(
							App.UI.DOM.link(
								"Remove it",
								() => {
									slave.abortionTat = -1;
									refresh();
								}
							)
						);
					} else {
						r.push(`${He} is scheduled to receive a tattoo each time ${he} gets an abortion or miscarries.`);
						linkArray.push(
							App.UI.DOM.link(
								"Cancel",
								() => {
									slave.abortionTat = -1;
									refresh();
								}
							)
						);
					}
				}
				if (slave.abortionTat !== slave.counter.abortions + slave.counter.miscarriages) {
					linkArray.push(
						App.UI.DOM.link(
							`Add tattoos to match (total) abortion/miscarriage (${slave.counter.abortions + slave.counter.miscarriages})`,
							() => {
								slave.abortionTat = slave.counter.abortions + slave.counter.miscarriages;
								billMod();
								refresh();
							}
						)
					);
				}
				if (slave.abortionTat > 1) {
					r.push(`Remove some marks:`);
					r.push(
						App.UI.DOM.makeTextBox(
							0,
							v => {
								if (slave.abortionTat > v) {
									slave.abortionTat -= v;
									if (v) {
										billMod();
									}
								}
								refresh();
							},
							true
						)
					);
				}
			}

			r.push(App.UI.DOM.generateLinksStrip(linkArray));
			App.Events.addNode(frag, r, "div");
			return frag;
		}

		function customTats() {
			const frag = new DocumentFragment();
			App.UI.DOM.appendNewElement("h3", frag, "Custom Tattoos");
			const r = [];
			for (const location of validTattooLocations) {
				const varName = tattooLocations.get(location);
				if (varName) {
					r.push(App.UI.DOM.makeElement("div", `${capFirstChar(location)}: `));
					r.push(
						App.UI.DOM.makeElement(
							"div",
							App.UI.DOM.makeTextBox(
								slave[`${varName}Tat`],
								(v) => {
									modReaction += App.Medicine.Modification.setTattoo(slave, varName, v, cheat);
									refresh();
								}
							)
						)
					);
				}
			}

			r.push(App.UI.DOM.makeElement("div", `Custom: `));
			r.push(
				App.UI.DOM.makeElement(
					"div",
					App.UI.DOM.makeTextBox(
						slave.custom.tattoo,
						(v) => {
							slave.custom.tattoo = v;
							billMod();
							refresh();
						}
					)
				)
			);
			App.Events.addNode(frag, r, "div", "grid-2columns-auto");
			if (slave.custom.tattoo !== "") {
				frag.append(
					App.UI.DOM.link(
						"Remove custom Tattoo",
						() => {
							slave.custom.tattoo = "";
							billMod();
							refresh();
						}
					)
				);
			}
			return frag;
		}
	}

	function branding() {
		const el = new DocumentFragment();
		const selection = document.createElement("span");
		selection.id = "brand-selection";
		selection.append(brand());
		el.append(selection);

		if (slave.breedingMark === 1 && (V.propOutcome === 0 || V.eugenicsFullControl === 1 || !FutureSocieties.isActive('FSRestart'))) {
			const r = [];
			r.push(`${He} has an intricate tattoo on ${his} lower belly that suggests ${he} was made to be bred.`);
			r.push(
				App.UI.DOM.link(
					"Remove it",
					() => {
						slave.breedingMark = 0;
						refresh();
					}
				)
			);
			App.Events.addNode(el, r, "div");
		}
		return el;
	}

	function scar() {
		const el = new DocumentFragment();
		App.UI.DOM.appendNewElement("h2", el, "Scars");
		let r = [];
		const bodyPartData = App.Data.Slave.body.get(V.scarTarget.local);

		for (const scarLocation in App.Medicine.Modification.scarRecord(slave)) {
			const scarDiv = document.createElement("div");
			scarDiv.append(`${His} ${scarLocation} is marked with ${App.Desc.expandScarString(slave, scarLocation)}: `);
			scarDiv.append(
				App.UI.DOM.link(
					"Remove Scar",
					() => {
						scarApplied = false;
						App.Medicine.Modification.removeAllScars(slave, scarLocation);
						billSurgery();
						degradation -= 10;
						refresh();
					}
				)
			);
			r.push(scarDiv);
		}
		if (r.length > 0) {
			App.Events.addNode(el, r, "div");
		} else {
			App.UI.DOM.appendNewElement("div", el, `${His} skin is not scarred.`);
		}

		el.append(App.UI.scarSelect("local", slave, cheat));
		r = [];
		if (["exotic", "menacing"].includes(V.scarDesign.local) && !V.scarTarget.local.endsWith("cheek")) {
			r.push(`"${capFirstChar(V.scarDesign.local)}" scars can only be applied to cheeks.`);
		} else if (bodyPartData && bodyPartData.isPair) {
			r.push(`Choose a side to scar.`);
		} else {
			if (App.Medicine.Modification.scarRecord(slave).hasOwnProperty(V.scarTarget.local)) {
				if (App.Medicine.Modification.scarRecord(slave)[V.scarTarget.local][V.scarDesign.local]) {
					r.push(`${He} already has ${V.scarDesign.local} scars on ${his} ${V.scarTarget.local}. You can make it worse.`);
				} else {
					// check how much scarring is on this part
					const scarTotalValue = (Object.values(App.Medicine.Modification.scarRecord(slave)[V.scarTarget.local])).reduce((a, b) => a + b, 0);
					if (scarTotalValue) {
						r.push(`That would be a new kind of scar to add to the growing collection on ${his} ${V.scarTarget.local}. Life can always be worse for a slave.`);
					}
				}
			}
			r.push(
				App.UI.DOM.link(
					"Scar",
					() => {
						let scarArray;
						if (V.scarTarget.local === "entire body" && V.scarDesign.local.includes("whip")) {
							// Special case for whipping scene, produces two kinds of scars
							App.Medicine.Modification.addScourged(slave);
						} else {
							// Normal entire body scarring
							if (V.scarTarget.local === "entire body") {
								scarArray = ["left breast", "right breast", "back", "lower back", "left buttock",
									"right buttock", "left upper arm", "right upper arm", "left thigh", "right thigh"];
							} else { // Single scar
								scarArray = [V.scarTarget.local];
							}
							for (const scar of scarArray) {
								App.Medicine.Modification.addScar(slave, scar, V.scarDesign.local);
								degradation += 10;
							}
						}
						billMod();
						scarApplied = true;
						degradation += 10;
						refresh();
					}
				)
			);
			r.push(`with ${V.scarDesign.local} on the ${V.scarTarget.local}${(App.Medicine.Modification.scarRecord(slave)[V.scarTarget.local]) ? `, adding to the scars that are already there?` : `.`}`);
		}
		App.Events.addNode(el, r, "div");

		return el;
	}

	function brand() {
		const el = new DocumentFragment();
		let p = document.createElement('p');
		let div = document.createElement('div');
		const bodyPartData = App.Data.Slave.body.get(V.brandTarget.local);

		App.UI.DOM.appendNewElement("h2", el, "Branding");

		const brands = App.Medicine.Modification.brandRecord(slave);
		for (const brandPlace in brands) {
			div = document.createElement('div');
			div.append(`${His} ${brandPlace} is marked with ${brands[brandPlace]}`);
			if (brands[brandPlace] === V.brandDesign.official) {
				div.append(`, your `);
				div.append(App.UI.DOM.passageLink("official brand", "Universal Rules"));
			}
			div.append(": ");
			div.append(
				App.UI.DOM.link(
					"Remove Brand",
					() => {
						if (!cheat) {
							brandApplied = false;
							billSurgery();
							degradation -= 10;
						}
						App.Medicine.Modification.removeBrand(slave, brandPlace);
						refresh();
					},
				)
			);
			p.append(div);
		}

		if (jQuery.isEmptyObject(brands)) {
			App.UI.DOM.appendNewElement("div", p, `${His} skin is unmarked.`);
		}

		if (!(Object.values(brands).includes(V.brandDesign.official)) && !cheat) {
			div = document.createElement('div');
			div.append(`${He} lacks your `);
			div.append(App.UI.DOM.passageLink("official brand", "Universal Rules"));
			div.append(`, ${V.brandDesign.official}.`);
			p.append(div);
		}

		el.append(p);
		el.append(App.UI.brandSelect("local", slave, cheat));

		p = document.createElement('p');


		if (brands[V.brandTarget.local] === V.brandDesign.local) {
			p.append(`${He} already has ${V.brandDesign.local} on ${his} ${V.brandTarget.local}.`);
		} else if (bodyPartData && bodyPartData.isPair) {
			p.append(`Choose a side to brand.`);
		} else {
			p.append(
				App.UI.DOM.link(
					"Brand",
					() => {
						if (!cheat) {
							brandApplied = true;
							billMod();
							degradation += 10;
						}
						App.Medicine.Modification.addBrand(slave, V.brandTarget.local, V.brandDesign.local);
						refresh();
					},
				)
			);
			p.append(` with ${V.brandDesign.local} on the ${V.brandTarget.local}`);
			if (brands[V.brandTarget.local]) {
				p.append(`, covering the "${brands[V.brandTarget.local]}" that is already there? `);
			} else {
				p.append(`. `);
			}
			App.UI.DOM.appendNewElement("span", p, `Branding will slightly reduce ${his} beauty but may slowly increase your reputation.`, "note");
		}
		el.append(p);
		return el;
	}

	function refresh() {
		jQuery("#body-modification").empty().append(createPage());
	}

	function billPiercing() {
		if (!cheat) {
			cashX(forceNeg(V.modCost), "slaveMod", slave);
		}
	}

	function billSP() {
		if (!cheat) {
			cashX(forceNeg(V.SPcost), "slaveMod", slave);
		}
	}

	function billMod() {
		if (!cheat) {
			cashX(forceNeg(V.modCost), "slaveMod", slave);
		}
	}

	function billSurgery() {
		if (!cheat) {
			cashX(forceNeg(V.surgeryCost), "slaveSurgery", slave);
		}
	}
};
/**
 * UI for the Body Modification system/studio. Refreshes without refreshing the passage.
 * @param {"local"|"official"} category
 * @param {App.Entity.SlaveState} [slave]
 * @param {boolean} [cheat] if true, will hide scenes, prevent damage to slaves, and keep the player from being billed for mods.
 * @returns {DocumentFragment}
 */
App.UI.brandSelect = function(category, slave, cheat = false) {
	const el = new DocumentFragment();
	let r = [];
	const isOfficial = category === "official";

	r.push(`Use <strong>${V.brandDesign[category]}</strong> or choose another brand:`);
	r.push(symbolOptions("personal"));
	App.Events.addNode(el, r, "div");
	r = [];

	r.push(symbolBlock("dirtyWord"));
	r.push(symbolBlock("genitalSymbol"));
	r.push(symbolBlock("silhouettes"));
	r.push(symbolBlock("FS"));
	App.Events.addNode(el, r, "div");
	r = [];

	r.push(`Or design your own: `);
	r.push(
		App.UI.DOM.makeTextBox(
			V.brandDesign[category],
			v => {
				V.brandDesign[category] = v;
				App.UI.reload();
			},
		)
	);
	App.Events.addNode(el, r, "div");
	r = [];

	App.UI.DOM.appendNewElement("div", el, "Choose a site for branding: ");
	if (category === "local") {
		r.push(App.UI.bodyPartSelector(V.brandTarget, "local", slave));
	} else {
		r.push(
			App.UI.DOM.makeElement("div", `One 'welcome' for a new slave is to have them branded. Where would you like such brands to be applied?`),
			App.UI.bodyPartSelector(V.brandTarget, "primary", true)
		);
		const bodyPartRoot = App.UI.bodyPartRoot(V.brandTarget.primary);
		const bodyPartData = App.Data.Slave.body.get(bodyPartRoot);
		if (bodyPartData && (bodyPartData).hasOwnProperty("requirements")) {
			r.push(`It's possible that <strong>${V.brandTarget.primary}</strong> may be missing from a slave. Choose a fallback in case it is not available: Current backup is <strong>${V.brandTarget.secondary}</strong>:`);
			App.Events.addNode(el, r, "div");
			r = [];
			r.push(App.UI.bodyPartSelector(V.brandTarget, "secondary", false));
		}
	}

	App.Events.addNode(el, r, "div");
	return el;

	function symbolBlock(brandList) {
		const div = document.createElement('div');
		div.classList.add("choices");
		div.append(symbolOptions(brandList));
		return div;
	}

	function symbolOptions(brandList) {
		const list = App.Medicine.Modification.Brands[brandList];
		const sortedKeys = Object.keys(list).sort((a, b) => list[a].displayName > list[b].displayName ? 1 : -1);
		const linkArray = [];
		for (const brand of sortedKeys) {
			const frag = new DocumentFragment();
			if (!cheat && list[brand].hasOwnProperty("requirements")) {
				if (!isOfficial && !list[brand].requirements(slave)) {
					continue;
				}
			}
			if (brandList === "FS") {
				App.UI.DOM.appendNewElement("span", frag, "FS ", "note");
			}
			frag.append(
				App.UI.DOM.link(
					list[brand].displayName,
					() => {
						V.brandDesign[category] = check(brand);
						App.UI.reload();
					}
				)
			);
			linkArray.push(frag);
		}
		return App.UI.DOM.generateLinksStrip(linkArray);
	}

	function check(brand) {
		switch (brand) {
			case "a big helping of your favorite food":
				return "a big helping of " + V.PC.refreshment;
			default:
				return brand;
		}
	}
};

/**
 * @param {"local"|"official"} category
 * @param {App.Entity.SlaveState} [slave]
 * @param {boolean} [cheat] if true, will hide scenes, prevent damage to slaves, and keep the player from being billed for mods.
 * @returns {DocumentFragment}
 */
App.UI.scarSelect = function(category, slave, cheat = false) {
	const el = new DocumentFragment();
	let r = [];
	r.push(`Use <strong>${V.scarDesign.local}</strong> or choose another scar:`);
	const scarTypes = new Set([
		"whip",
		"burn",
		"surgical",
		"menacing",
		"exotic"
	]); // Other common scars might be battle scars or c-Section, but it makes little sense to include them here
	let linkArray = [];
	for (const scarType of scarTypes) {
		linkArray.push(
			App.UI.DOM.link(
				capFirstChar(scarType),
				() => {
					V.scarDesign.local = scarType;
					App.UI.reload();
				}
			)
		);
	}
	r.push(App.UI.DOM.generateLinksStrip(linkArray));
	App.Events.addNode(el, r, "div");

	r = [];
	r.push(`Or design your own:`);
	r.push(
		App.UI.DOM.makeTextBox(
			V.scarDesign.local,
			(v) => {
				V.scarDesign.local = v;
				App.UI.reload();
			}
		)
	);
	App.Events.addNode(el, r, "div");

	r = [];
	r.push(`Choose a site for scarring:`);
	if (category === "local") {
		r.push(App.UI.bodyPartSelector(V.scarTarget, "local", slave));
	} else {
		r.push(
			App.UI.DOM.makeElement("div", `One 'welcome' for a new slave is to have them scarred. Where would you like such scars to be applied?`),
			App.UI.bodyPartSelector(V.scarTarget, "primary", true)
		);
		const bodyPartRoot = App.UI.bodyPartRoot(V.scarTarget.primary);
		const bodyPartData = App.Data.Slave.body.get(bodyPartRoot);
		if (bodyPartData && bodyPartData.hasOwnProperty("requirements")) {
			r.push(`It's possible that <strong>${V.scarTarget.primary}</strong> may be missing from a slave. Choose a fallback in case it is not available: Current backup is <strong>${V.scarTarget.secondary}</strong>:`);
			App.Events.addNode(el, r, "div");
			r = [];
			r.push(App.UI.bodyPartSelector(V.scarTarget, "secondary", false));
		}
	}
	App.Events.addNode(el, r, "div");
	return el;
};

/**
 *
 * @param {object} variable
 * @param {string} property
 * @param {boolean | App.Entity.SlaveState} selector false means missing limbs. True means no missing limbs. Slave state checks the slave.
 * @returns {HTMLElement}
 */
App.UI.bodyPartSelector = function(variable, property, selector) {
	let el = document.createElement("div");
	const links = {
		head: [],
		torso: [],
		arms: [],
		legs: [],
	};

	const makeLink = (bodyKey, bodyObj) => {
		links[bodyObj.category].push(
			App.UI.DOM.link(
				capFirstChar(bodyKey),
				() => {
					variable[property] = bodyKey;
					App.UI.reload();
				}
			)
		);
	};
	for (const [bodyKey, bodyObj] of App.Data.Slave.body) {
		if (selector === true) { // Always show all parts
			makeLink(bodyKey, bodyObj);
		} else if (selector === false) { // Looking for a backup slot for every slave, hide all parts that could be amputated
			if (!bodyObj.hasOwnProperty("requirements")) {
				makeLink(bodyKey, bodyObj);
			}
		} else if (!(bodyObj.hasOwnProperty("requirements")) || bodyObj.requirements(selector)) { // We have an actual slave here, run the check on them
			makeLink(bodyKey, bodyObj);
		}
	}
	for (const category in links) {
		App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(links[category]), "choices");
	}

	// Choose a side
	const bodyPartData = App.Data.Slave.body.get(variable[property]);
	if (bodyPartData && bodyPartData.isPair) {
		const linkArray = [];
		for (const side of ["left", "right"]) {
			linkArray.push(App.UI.DOM.link(capFirstChar(side), () => {
				variable[property] = `${side} ${variable[property]}`;
				App.UI.reload();
			}));
		}
		App.UI.DOM.appendNewElement("div", el, "Side: ", "indent")
			.append(App.UI.DOM.generateLinksStrip(linkArray));
	}

	let div = document.createElement('div');
	div.append(`Or a custom site: `);
	div.append(
		App.UI.DOM.makeTextBox(
			variable[property],
			v => {
				variable[property] = v;
				App.UI.reload();
			},
		)
	);
	el.append(div);

	return el;
};

/**
 * Find the root of a string that may start with "left" or "right"
 * @param {string} bodyPart
 * @returns {string}
 */
App.UI.bodyPartRoot = function(bodyPart) {
	if (bodyPart.startsWith("left")) {
		bodyPart = (bodyPart.replace(/left /g, ""));
	} else if (bodyPart.startsWith("right")) {
		bodyPart = (bodyPart.replace(/right /g, ""));
	}
	return bodyPart;
};
