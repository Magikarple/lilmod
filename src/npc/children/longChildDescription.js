/**
 * Displays a detailed description of the child
 * @param {App.Entity.SlaveState} child
 * @returns {string}
 */
App.Facilities.Nursery.LongChildDescription = function(child, {market = 0, eventDescription = 0} = {}) {
	// MARK: Declarations
	const arcology = V.arcologies[0];
	const PC = V.PC;
	const slaves = V.slaves;
	const desc = child.actualAge < 13 ? `child` : `teen`; // TODO:
	const father = child.father === -1 ? PC : getSlave(child.father);
	const mother = child.mother === -1 ? PC : getSlave(child.mother);

	let r = ``;

	const {
		he, him, his, hers, himself, boy, He, His, girl
	} = getPronouns(child);

	const skintype = (child.race === "catgirl") ? "skin" : "fur";
	const freckled = (child.race === "catgirl") ? "freckled" : "spotted";

	// helper functions
	function accent(child) {
		let r = ``;
		let accent;
		let nationality;

		switch (child.nationality) {
			case "a Cook Islander":
				nationality = `Cook Islander`;
				break;
			case "a Liechtensteiner":
				nationality = `Liechtensteiner`;
				break;
			case "a New Zealander":
				nationality = `New Zealander`;
				break;
			case "a Solomon Islander":
				nationality = `Solomon Islander`;
				break;
			default:
				nationality = child.nationality;
				break;
		}

		if (child.accent !== 0) {
			if (child.accent === 1) {
				accent = either("a beautiful", "a distinctive", "an intriguing", "a light", "a lovely", "a mild", "a pleasant", "a rich", "a slight", "a smooth");
				r += `${He} speaks ${V.language} in ${accent} ${nationality} accent${child.rules.speech === "accent elimination" ? `, which the rules encourage ${him} to suppress` : ``}. `;
			} else if (child.accent === 2) {
				accent = either("a broad", "a harsh", "a heavy", "an intense", "a marked", "a noticeable", "a rough", "a significant", "a stressed", "a strong", "a thick");
				r += `${He} speaks ${V.language} in ${accent} ${nationality} accent that can be hard to understand${child.rules.speech === "accent elimination" ? `, and the rules encourage ${him} to make an effort to suppress it` : ``}. `;
			} else {
				r += `${He} speaks little ${V.language}, but understands enough to be given orders. `;
			}
		}

		return r;
	}

	function accessories() {
		function buttplug(child) {
			let r = ``;

			if (V.showClothing && !market) {
				switch (child.clothes) {
					case "a slave gown":
						if (child.chastityAnus) {
							r += `${His} pretty gown hides ${his} anal chastity accessory underneath. `;
						} else {
							r += `Though ${his} gown is very pretty, ${his} asshole is bare beneath it. `;
						}
						break;
					case "a ball gown":
						if (child.chastityAnus) {
							r += `${His} fabulous silken ball gown hides ${his} anal chastity accessory underneath. `;
						} else {
							r += `Though ${his} silken ball gown is fabulous, ${his} asshole is bare beneath it. `;
						}
						break;
					case "a mini dress":
						r += `If ${he} bends over even slightly, the hem of ${his} short dress rides up to reveal ${his} `;
						if (child.chastityAnus) {
							r += `anal chastity accessory underneath. `;
						} else {
							if (child.anus > 1) {
								r += `lewd butthole. `;
							} else {
								r += `tight anus. `;
							}
						}
						break;
					case "a schoolgirl outfit":
						r += `The skirt is so short that it `;
						if (child.chastityAnus) {
							r += `reveals ${his} anal chastity accessory. `;
						} else {
							r += `doesn't even have to be lifted to fuck ${his} schoolgirl ass. `;
						}
						break;
					case "a tank-top":
					case "a tube top":
					case "a t-shirt":
					case "an oversized t-shirt":
						break;
					default:
						if (child.anus > 2) {
							if (child.chastityAnus) {
								r += `${His} bare buttocks and ${his} anal chastity accessory are very visible from the rear. `;
							} else {
								r += `With ${his} ass bare, ${his} huge asshole is very visible from the rear. `;
							}
						} else if (child.anus > 1) {
							if (child.chastityAnus) {
								r += `${His} bare buttocks and ${his} anal chastity accessory are very visible from the rear. `;
							} else {
								r += `With ${his} ass bare, ${his} loose asshole is visible from the rear. `;
							}
						} else {
							if (child.chastityAnus) {
								r += `${His} bare buttocks and ${his} anal chastity accessory are visible. `;
							} else {
								r += `With ${his} ass bare, there is an occasional glimpse of ${his} asshole. `;
							}
						}
						break;
				}
			}

			switch (child.buttplug) {
				case "plug":
					r += `It's filled by a standard `;
					if (child.anus > 2) {
						r += `buttplug, which is on the verge of falling out. `;
					} else {
						r += `buttplug. `;
					}

					if (child.buttplugAttachment === "tail") {
						r += `A tail protrudes from the back of the plug and dangles from ${his} rear. `;
					} else if (child.buttplugAttachment === "fox tail") {
						r += `A bushy ${child.hColor} tail with a white tip protrudes from the back of the plug and dangles from ${his} rear. `;
					} else if (child.buttplugAttachment === "cow tail") {
						r += `A slim, spotted tail with a cute tuft at its tip protrudes from the back of the plug and dangles from ${his} rear. `;
					} else if (child.buttplugAttachment === "cat tail") {
						r += `A tail protrudes from the back of the plug and springs upwards from ${his} rear. `;
					}
					break;
				case "long plug":
					r += `It's filled by a standard sized, overly long `;
					if (child.anus > 2) {
						r += `buttplug, which is on the verge of sliding out ${his} rear. `;
					} else {
						r += `buttplug. `;
					}
					r += `It causes a noticeable bulge in ${his} belly. `;

					if (child.buttplugAttachment === "tail") {
						r += `A tail protrudes from the back of the plug and dangles from ${his} rear. `;
					} else if (child.buttplugAttachment === "fox tail") {
						r += `A bushy ${child.hColor} tail with a white tip protrudes from the back of the plug and dangles from ${his} rear. `;
					} else if (child.buttplugAttachment === "cow tail") {
						r += `A slim, spotted tail with a cute tuft at its tip protrudes from the back of the plug and dangles from ${his} rear. `;
					} else if (child.buttplugAttachment === "cat tail") {
						r += `A tail protrudes from the back of the plug and springs upwards from ${his} rear. `;
					}
					break;
				case "large plug":
					r += `It's `;
					if (child.anus < 2) {
						r += `agonizingly stretched `;
					} else if (child.anus < 3) {
						r += `uncomfortably stretched `;
					} else {
						r += `comfortably stretched `;
					}
					r += `by a large buttplug. `;

					if (child.buttplugAttachment === "tail") {
						r += `${He} swings the tail from side to side with every shift of ${his} rear. `;
					} else if (child.buttplugAttachment === "fox tail") {
						r += `${He} swings the bushy ${child.hColor} tail from side to side with every shift of ${his} rear. `;
					} else if (child.buttplugAttachment === "cow tail") {
						r += `${He} swings the spotted tail from side to side with every shift of ${his} rear. `;
					} else if (child.buttplugAttachment === "cat tail") {
						r += `${He} bounces the tail from side to side with every shift of ${his} rear. `;
					}
					break;
				case "long, large plug":
					r += `It's `;
					if (child.anus < 2) {
						r += `agonizingly stretched `;
					} else if (child.anus < 3) {
						r += `uncomfortably stretched `;
					} else {
						r += `comfortably stretched `;
					}
					r += `by a large and long buttplug. It causes a noticeable bulge in ${his} belly. `;

					if (child.buttplugAttachment === "tail") {
						r += `${He} swings the tail from side to side with every shift of ${his} rear. `;
					} else if (child.buttplugAttachment === "fox tail") {
						r += `${He} swings the bushy ${child.hColor} tail from side to side with every shift of ${his} rear. `;
					} else if (child.buttplugAttachment === "cow tail") {
						r += `${He} swings the spotted tail from side to side with every shift of ${his} rear. `;
					} else if (child.buttplugAttachment === "cat tail") {
						r += `${He} bounces the tail from side to side with every shift of ${his} rear. `;
					}
					break;
				case "huge plug":
					if (child.anus < 4) {
						r += `It's agonizingly stretched by a plug so huge ${his} anus is probably being stretched into a permanent gape. `;
						if (child.fetish === "masochist" && child.fetishKnown && child.fetishStrength > 60) {
							r += `${He}'s frequently in tears from the pain, which is so sharp it often tips ${him} over into spontaneous orgasm. `;
						} else {
							r += `${He} spends much of ${his} time sobbing with anal pain and fear at having ${his} hole ruined. `;
						}
					} else {
						r += `Its ridiculous gape is comfortably filled by a huge buttplug. `;
					}

					if (child.buttplugAttachment === "tail") {
						r += `${He} sways the tail back and forth with every ginger movement of ${his} rear. `;
					} else if (child.buttplugAttachment === "fox tail") {
						r += `${He} sways the bushy ${child.hColor} tail back and forth with every ginger movement of ${his} rear. `;
					} else if (child.buttplugAttachment === "cow tail") {
						r += `${He} sways the spotted tail back and forth with every ginger movement of ${his} rear. `;
					} else if (child.buttplugAttachment === "cat tail") {
						r += `${He} jiggles the tail back and forth with every ginger movement of ${his} rear. `;
					}
					break;
				case "long, huge plug":
					if (child.anus < 4) {
						r += `It's agonizingly stretched by a plug so huge it causes ${his} belly to bulge and is likely stretching ${his} anus into a permanent gape. `;
						if (child.fetish === "masochist" && child.fetishKnown && child.fetishStrength > 60) {
							r += `${He}'s frequently in tears from the pain, which is so sharp it often tips ${him} over into spontaneous orgasm. `;
						} else {
							r += `${He} spends much of ${his} time sobbing with anal pain and fear at having ${his} hole ruined. `;
						}
					} else {
						r += `Its ridiculous gape is comfortably filled by a wide and long buttplug. It causes a noticeable bulge in ${his} belly. `;
					}

					if (child.buttplugAttachment === "tail") {
						r += `${He} sways the tail back and forth with every ginger movement of ${his} rear. `;
					} else if (child.buttplugAttachment === "fox tail") {
						r += `${He} sways the bushy ${child.hColor} tail back and forth with every ginger movement of ${his} rear. `;
					} else if (child.buttplugAttachment === "cow tail") {
						r += `${He} sways the spotted tail back and forth with every ginger movement of ${his} rear. `;
					} else if (child.buttplugAttachment === "cat tail") {
						r += `${He} jiggles the tail back and forth with every ginger movement of ${his} rear. `;
					}
					break;
			}

			return r;
		}

		accessories.buttplug = buttplug;

		function dick(child) {
			let r = ``;

			if (child.chastityPenis) {
				r += `${His} cock is encased in a tight chastity cage, which is designed to be comfortable as long as ${he} remains soft. `;
				if (child.energy > 95) {
					r += `The poor nympho looks painfully frustrated by this, and a long string of precum is dangling from the hole in the bottom of the cage. `;
				}
				if (FutureSocieties.isActive('FSRestart', arcology)) {
					r += `This pleases the Societal Elite. `;
				}
			}

			return r;
		}

		accessories.dick = dick;

		function vaginal(child) {
			let r = ``;
			let held;

			if (child.chastityVagina) {
				held = `held in place by a chastity belt`;
			} else if (child.vaginalAccessory === "bullet vibrator" || child.vaginalAccessory === "smart bullet vibrator") {
				held = `held in place by a strap`;
			} else {
				held = `held in place by a strap, which ${he} can remove for vaginal intercourse`;
			}

			switch (child.vaginalAccessory) {
				case "bullet vibrator":
				case "smart bullet vibrator":
					r += `A bullet vibrator is attached on ${his} clit, ${held}. `;
					break;
				case "dildo":
					r += `${His} pussy is filled by a dildo ${held}. `;
					break;
				case "long dildo":
					r += `${His} pussy is filled by a very long dildo ${held}. It noticeably bulges ${his} stomach. `;
					break;
				case "large dildo":
					r += `${His} pussy is ${child.vagina < 2 ? `painfully stretched` : child.vagina < 3 ? `uncomfortably filled` : `comfortably filled`} by a large dildo ${held}. `;
					break;
				case "long, large dildo":
					r += `${His} pussy is ${child.vagina < 2 ? `painfully stretched` : child.vagina < 3 ? `uncomfortably filled` : `comfortably filled`} by a very long and large dildo ${held}. It noticeably bulges ${his} stomach. `;
					break;
				case "huge dildo":
					if (child.vagina < 4) {
						r += `${His} pussy is filled to the breaking point by an enormous dildo. `;
						if (child.fetish === "masochist" && child.fetishKnown && child.fetishStrength > 60) {
							r += `${He} can barely move with the discomfort, but ${he} frequently climaxes with agony. `;
						} else {
							r += `${He} can barely move with the discomfort, and ${he} sometimes breaks down in tears at having ${his} cunt permanently stretched. `;
						}
					} else {
						r += `${His} cavernous pussy is comfortably filled by a huge dildo. `;
					}
					if (child.chastityVagina) {
						r += `A chastity belt locks it securely in place. `;
					}
					break;
				case "long, huge dildo":
					if (child.vagina < 4) {
						r += `${His} pussy is filled to the breaking point by an enormously wide and long dildo. It noticeably bulges ${his} stomach. `;
						if (child.fetish === "masochist" && child.fetishKnown && child.fetishStrength > 60) {
							r += `${He} can barely move with the discomfort, but ${he} frequently climaxes with agony. `;
						} else {
							r += `${He} can barely move with the discomfort, and ${he} sometimes breaks down in tears at having ${his} cunt permanently stretched. `;
						}
					} else {
						r += `${His} cavernous pussy is comfortably filled by an enormously wide and long dildo. It noticeably bulges ${his} stomach. `;
					}
					if (child.chastityVagina) {
						r += `A chastity belt locks it securely in place. `;
					}
					break;
				default:
					if (child.chastityVagina) {
						r += `${His} pussy is protected by a chastity belt${child.clothes !== "no clothing" ? `worn under ${his} clothing` : ``}. `;
					}
					break;
			}

			if (child.chastityVagina && FutureSocieties.isActive('FSRestart', arcology)) {
				r += `This pleases the Societal Elite. `;
			}

			return r;
		}

		accessories.vaginal = vaginal;
	}

	function anus(child) {
		let r = ``;
		let skinDesc;
		let analSkinDesc;
		let ass;
		let anus = child.analArea - child.anus;

		if (skinToneLevel(child.skin) < 13) {
			skinDesc = "pink";
		} else if (child.anusTat === "bleached") {
			skinDesc = child.skin;
		} else if (skinToneLevel(child.skin) > 19) {
			skinDesc = "dark";
		} else {
			skinDesc = "darker";
		}

		analSkinDesc = either("crinkled", "puckered", "puffy");

		if (child.anus === 0) {
			r += `${He} is an <span class="lime">anal virgin;</span> ${his} asshole is fresh and tight. `;
		} else if (child.anus === 1) {
			ass = either("anal opening", "anus", "asshole", "butthole");
			r += `${His} ${ass} is ${either("nice and", "very")} tight, `;
			if (anus > 3) {
				r += `but it's surrounded by a massive oval of ${analSkinDesc} ${skinDesc} skin that runs from ${his} tailbone all the way down to the ${child.vagina > -1 ? `bottom of ${his} pussy` : `base of ${his} cock`}. `;
			} else if (anus > 2) {
				r += `but it's surrounded by an oval of ${analSkinDesc} ${skinDesc} skin that occupies ${his} entire ${either("asscrack", "buttcrack")} ${ass}. `;
			} else if (anus > 1) {
				r += `but it's surrounded by a big ring of ${analSkinDesc} ${skinDesc} skin. `;
			} else if (anus > 0) {
				r += `and it's surrounded by a cute ${either("pucker", "ring", "rosebud")} ${ass} of ${skinDesc} skin. `;
			} else {
				r += `and the ${skinDesc} skin around it is stretched smooth, since it's been deflowered only recently. `;
			}
		} else if (child.anus === 2) {
			ass = either("anal opening", "anus", "asshole", "asspussy", "butthole");
			r += `${His} ${ass} is ${anus > 1 ? `only ` : ``}${either("relaxed", "loose", "accommodating")} ${ass}, `;
			if (anus > 2) {
				r += `but it's surrounded by a massive oval of ${analSkinDesc} ${skinDesc} skin that runs from ${his} tailbone all the way down to the ${child.vagina > -1 ? `bottom of ${his} pussy` : `base of ${his} cock`}. `;
			} else if (anus > 1) {
				r += `but it's surrounded by an oval of ${analSkinDesc} ${skinDesc} skin that occupies ${his} entire ${either("asscrack", "buttcrack")} ${ass}. `;
			} else if (anus > 0) {
				r += `and it's surrounded by a big ring of ${analSkinDesc} ${skinDesc} skin. `;
			} else {
				r += `and the ${skinDesc} skin around it is stretched smooth, suggesting it's getting used to being this way. `;
			}
		} else if (child.anus === 3) {
			ass = either("anal opening", "anus", "asshole", "asspussy", "butthole");
			r += `${His} ${ass} is a ${either("lewd", "loose", "relaxed", "welcoming")} ${ass} slit, `;
			if (anus > 1) {
				r += `and it's surrounded by a massive oval of ${analSkinDesc} ${skinDesc} skin that runs from ${his} tailbone all the way down to the ${child.vagina > -1 ? `bottom of ${his} pussy` : `base of ${his} cock`}. `;
			} else if (anus > 0) {
				r += `and it's surrounded by an oval of ${analSkinDesc} ${skinDesc} skin that occupies ${his} entire ${either("asscrack", "buttcrack")} ${ass}. `;
			} else {
				r += `and the ${skinDesc} skin around it is stretched smooth, suggesting ${he}'s getting used to having such a cock-hungry rear fuckhole. `;
			}
		} else {
			ass = either("anal opening", "anal slit", "anus", "asshole", "asspussy", "butthole");
			r += `${His} ${ass} is a ${either("loose", "open", "permanent", "relaxed")} ${ass} gape, `;
			if (anus > 0) {
				r += `and it's surrounded by a massive oval of ${skinDesc} skin that runs from ${his} tailbone all the way down to the ${child.vagina > -1 ? `bottom of ${his} pussy` : `base of ${his} cock`}. `;
			} else {
				r += `and the ${skinDesc} skin around it is stretched smooth, suggesting ${he}'s only recently had ${his} ass ruined. `;
			}
		}

		if (child.race !== "catgirl") {
			if (child.pubicHStyle === "bushy" || child.pubicHStyle === "very bushy") {
				if (child.physicalAge >= 13) {
					r += `Since ${he} has been left natural, ${he} has some light ${child.pubicHColor} pubic hair around ${his} ass. `;
				}
			}
		}

		if (child.minorInjury === "sore ass") {
			r += `${His} asshole has seen hard use lately and looks a little sore. `;
		}

		r += accessories.buttplug(child);

		if (V.showBodyMods) {
			r += piercings.anus(child);
			r += tats.anus(child);
		}

		if (child.skill.anal >= 100) {
			r += `${He} is a <span class="skill">masterful anal slut.</span> `;
		} else if (child.skill.anal > 60) {
			r += `${He} is an <span class="skill">expert anal slut.</span> `;
		} else if (child.skill.anal > 30) {
			r += `${He} is a <span class="skill">skilled anal slut.</span> `;
		} else if (child.skill.anal > 10) {
			r += `${He} has <span class="skill">basic knowledge about anal.</span> `;
		} else {
			r += `${He} is unskilled at taking anal. `;
		}

		return r;
	}

	function butt(child) {
		let r = ``;

		if (V.showClothing && !market) {
			if (!V.surgeryDescription) {
				switch (child.clothes) {
					case "a schoolgirl outfit":
						r += `${His} skirt `;
						if (child.butt > 10) {
							r += `can't begin to cover ${his} massive butt, and just rests on top of ${his} buttocks, leaving virtually ${his} entire behind `;
						} else if (child.butt > 6) {
							r += `can't begin to cover ${his} huge butt, and just rests on top of ${his} buttocks, leaving virtually ${his} entire behind `;
						} else if (child.butt > 3) {
							r += `only covers the top of ${his} big butt, leaving most of ${his} bottom `;
						} else {
							r += `only covers the top half of ${his} butt, leaving the bottom half of ${his} behind `;
						}
						r += `bare. `;
						break;
					case "a slave gown":
						r += `${His} slave gown `;
						if (child.butt > 10) {
							r += `is tailored as tastefully as possible for ${his} inhuman `;
						} else if (child.butt > 6) {
							r += `is tailored as tastefully as possible for ${his} massive `;
						} else if (child.butt > 3) {
							r += `is tailored to flatter ${his} big `;
						} else {
							r += `tastefully clings to ${his} `;
						}
						r += `buttocks. `;
						break;
					case "a ball gown":
						r += `${His} fabulous silken ball gown is draped `;
						if (child.butt > 10) {
							r += `as tastefully as possible for ${his} inhuman `;
						} else if (child.butt > 6) {
							r += `as tastefully as possible for ${his} massive `;
						} else if (child.butt > 3) {
							r += `around ${his} big `;
						} else {
							r += `around ${his} `;
						}
						r += `buttocks. `;
						break;
					case "a mini dress":
						r += `${His} scandalously short dress `;
						if (child.butt > 10) {
							r += `is impossible to pull over ${his} enormous buttocks, leaving ${his} behind entirely exposed. `;
						} else if (child.butt > 6) {
							r += `is at constant risk of sliding above ${his} huge butt and leaving ${his} behind entirely exposed. `;
						} else if (child.butt > 3) {
							r += `barely covers half of ${his} ample buttocks. `;
						} else {
							r += `barely manages to cover ${his} buttocks. `;
						}
						break;
					case "a tank-top":
					case "a tube top":
					case "an oversized t-shirt":
					case "a t-shirt":
						r += `${His} clothing leaves ${his} `;
						if (child.butt > 10) {
							r += `mammoth ass completely bare. `;
						} else if (child.butt > 6) {
							r += `huge ass completely bare. `;
						} else if (child.butt > 3) {
							r += `big ass completely bare. `;
						} else {
							r += `ass completely bare. `;
						}
						break;
				}
			}
		}

		if (V.showBodyMods) {
			r += tats.stamp(child);
		}

		r += `${He}'s got a `;
		if (child.butt <= 1) {
			r += `flat and `;
			if (arcology.FSSlimnessEnthusiast > 20 && !FutureSocieties.isActive('FSHedonisticDecadence', arcology)) {
				r += `${either("attractive", "enticing", "fashionable")} `;
			} else {
				r += `${either("skinny", "slim", "taut")} `;
			}
			r += `ass. `;
		} else if (child.butt <= 2) {
			if (arcology.FSSlimnessEnthusiast > 20 && !FutureSocieties.isActive('FSHedonisticDecadence', arcology)) {
				r += `${either("fashionable", "sleek and attractive", "small and enticing")} `;
			} else {
				r += `${either("small, sleek", "small but rounded", "rounded, small")} `;
			}
			r += `rear end. `;
		} else if (child.butt <= 3) {
			r += `${either("big and healthy", "curved and plump", "healthy and plump")} derrière. `;
		} else if (child.butt <= 4) {
			r += `${either("big bubble", "curvy and enticing", "juicy and large")} butt. `;
		} else if (child.butt <= 5) {
			r += `${either("huge", "juicy and huge", "massive and undeniable")} rear end. `;
		} else if (child.butt <= 6) {
			r += `${either("enormous", "truly massive")} posterior. `;
		} else if (child.butt <= 7) {
			r += `${either("gigantic", "titanic")} ass. `;
		} else if (child.butt <= 10) {
			r += `${either("gigantic", "titanic")} ass. `;
			if (!canWalk(child)) {
				r += ` It's so big it would jiggle as ${he} walked — if ${he} could walk. `;
			} else {
				r += ` It's so big it jiggles as ${he} walks. `;
			}
		} else if (child.butt <= 14) {
			r += `${either("cushion-like", "hall-crowding")} ass. `;
			if (!canWalk(child)) {
				r += ` It's so big it would jiggle nonstop as ${he} walked — if ${he} could walk. `;
			} else {
				r += ` It's so big it jiggles nonstop as ${he} walks. `;
			}
		} else {
			r += `${either("bean bag sized", "room-crowding")} ass. `;
			if (!canWalk(child)) {
				r += ` It's so massive it would jiggle endlessly as ${he} walked — if ${he} could walk. `;
			} else {
				r += ` It's so massive it jiggles endlessly as ${he} walks. `;
			}
		}

		r += hips(child);

		if (V.showImplantEffects) {
			if (child.buttImplant === 1) {
				r += `${His} butt implants make ${his} ass look especially pert no matter how ${he} moves. `;
			} else if (child.buttImplant === 2) {
				r += `${His} big butt implants make ${his} ass jut out curvaceously whatever pose ${he}'s in. `;
			} else if (child.buttImplant > 17) {
				r += `${He} has oversized ${child.buttImplantType === "string" ? `engorged string` : `fillable butt`} implants, and it is completely obvious. Whatever ${his} position, ${his} immense ass dominates ${his} surroundings with its unyielding mass. `;
			} else if (child.buttImplant > 12) {
				r += `${He} has oversized ${child.buttImplantType === "string" ? `engorged string` : `fillable butt`} implants, and it is completely obvious. Whatever ${his} position, ${his} ass looks like someone shoved a pair of ready to burst weather balloons in ${his} buttcheeks. `;
			} else if (child.buttImplant > 7) {
				r += `${He} has oversized ${child.buttImplantType === "string" ? `engorged string` : `fillable butt`} implants, and it is completely obvious. Whatever ${his} position, ${his} ass looks like someone shoved a pair of overinflated beachballs in ${his} buttcheeks. `;
			} else if (child.buttImplant > 2) {
				r += `${He} has ${child.buttImplantType === "string" ? `engorged string` : `fillable butt`} implants, and it shows. Whatever ${his} position, ${his} ass looks just as artificially enticing. `;
			}
		}

		if (FutureSocieties.isActive('FSTransformationFetishist', arcology)) {
			if (child.buttImplant > 0) {
				r += `${His} rear is about Math.floor((child.buttImplant/child.butt)*100)>>% implant. `;
			}
		}
		if (arcology.FSTransformationFetishist > 20) {
			if (FutureSocieties.isActive('FSSlimnessEnthusiast', arcology)) {
				if (child.butt >= 3) {
					if (child.buttImplant / child.butt < .25) {
						r += `${His} ass is <span class="red">disgustingly natural</span> for its size. `;
					} else {
						r += `${His} asscheeks are <span class="green">obviously implants,</span> as they should be. `;
					}
				}
			} else {
				if (child.butt >= 6) {
					if (child.buttImplant / child.butt > .5) {
						r += `${His} ass is <span class="red">disgustingly natural</span> for its size. `;
					} else {
						r += `${His} asscheeks are <span class="green">obviously implants,</span> as they should be. `;
					}
				}
			}
		}

		if (arcology.FSGenderFundamentalistLawBeauty + arcology.FSGenderRadicalistLawBeauty > 0) {
			if (child.butt > 6 && FutureSocieties.isActive('FSAssetExpansionist', arcology)) {
				r += `It's too big for the fashionable feminine ideal. `;
			} else if (child.butt > 4 && FutureSocieties.isActive('FSAssetExpansionist', arcology)) {
				r += `It's bigger than expected for the fashionable feminine ideal, but your arcology loves huge butts, so it's not a surprise. `;
			} else if (child.butt > 4) {
				r += `It's too big for the fashionable feminine ideal. `;
			} else if (child.butt < 3) {
				r += `It's too small for the fashionable feminine ideal. `;
			}
		} else if (arcology.FSSlimnessEnthusiastLaw && child.butt > 1) {
			r += `It's way too big for the fashionable feminine ideal. `;
		} else if (arcology.FSHedonisticDecadenceLaw2 && child.butt < 5) {
			r += `It's too small for the fashionable feminine ideal. `;
		}

		if (child.physicalAge <= 3) {
			if (child.butt >= 8) {
				if (canWalk(child)) {
					r += `${His} butt is so massive that it is difficult for ${him} to move. `;
					if (child.muscles > 95) {
						r += `However, ${he} is so powerfully built that ${he} can manage it with effort, using ${his} arms to support them. `;
					} else if (child.muscles > 30) {
						r += `${He} can barely manage to get to ${his} feet unaided, and usually walks with ${his} hands sunk into ${his} buttcheeks to help take their weight. `;
					} else if (child.muscles > 5) {
						r += `${He} requires assistance to get to ${his} feet, and tries to rest ${his} huge cheeks on whatever nearby surfaces ${he} can. `;
					} else {
						r += `${He} cannot get to ${his} feet unaided, and prefers to remain seated on ${his} enormous rear rather than stand. `;
					}
				} else {
					r += `Together it is nearly the same size as ${his} torso, making ${him} about half butt. `;
				}
			}
		}

		if (child.butt > 15) {
			if (V.buttAccessibility) {
				r += `Fortunately for ${him}, the penthouse is adapted for daily life with a rear `;
			} else {
				r += `${He} has trouble living in your penthouse, which is not designed for ${girl}s with buttcheeks `;
			}
			r += `wider than a standard doorway. `;
		}

		if (child.physicalAge <= 12) {
			if (child.butt >= 12) {
				if (canWalk(child)) {
					r += `${His} butt is so massive that it is difficult for ${him} to move. `;
					if (child.muscles > 95) {
						r += `However, ${he} is so powerfully built that ${he} can manage it with effort, using ${his} arms to support them. `;
					} else if (child.muscles > 30) {
						r += `${He} can barely manage to get to ${his} feet unaided, and usually walks with ${his} hands sunk into ${his} buttcheeks to help take their weight. `;
					} else if (child.muscles > 5) {
						r += `${He} requires assistance to get to ${his} feet, and tries to rest ${his} huge cheeks on whatever nearby surfaces ${he} can. `;
					} else {
						r += `${He} cannot get to ${his} feet unaided, and prefers to remain seated on ${his} enormous rear rather than stand. `;
					}
				} else {
					r += `Together it is nearly the same size as ${his} torso, making ${him} about half butt. `;
				}
			}

			if (child.butt > 15) {
				if (V.buttAccessibility) {
					r += `Fortunately for ${him}, the penthouse is adapted for daily life with a rear `;
				} else {
					r += `${He} has trouble living in your penthouse, which is not designed for ${girl}s with buttcheeks `;
				}
				r += `wider than a standard doorway. `;
			}
		} else if (child.physicalAge > 12) {
			if (child.butt > 17) {
				if (canWalk(child)) {
					r += `${His} butt is so massive that it is difficult for ${him} to move. `;
					if (child.muscles > 95) {
						r += `However, ${he} is so powerfully built that ${he} can manage it with effort, using ${his} arms to support them. `;
					} else if (child.muscles > 30) {
						r += `${He} can barely manage to get to ${his} feet unaided, and usually walks with ${his} hands sunk into ${his} buttcheeks to help take their weight. `;
					} else if (child.muscles > 5) {
						r += `${He} requires assistance to get to ${his} feet, and tries to rest ${his} huge cheeks on whatever nearby surfaces ${he} can. `;
					} else {
						r += `${He} cannot get to ${his} feet unaided, and prefers to remain seated on ${his} enormous rear rather than stand. `;
					}
				} else {
					r += `Together it is nearly the same size as ${his} torso, making ${him} about half butt. `;
				}

				if (child.butt > 15) {
					if (V.buttAccessibility) {
						r += `Fortunately for ${him}, the penthouse is adapted for daily life with a rear `;
					} else {
						r += `${He} has trouble living in your penthouse, which is not designed for ${girl}s with buttcheeks `;
					}
					r += `wider than a standard doorway. `;
				}
			}
		}

		if (child.markings === "heavily freckled") {
			r += `${His} freckles are particularly dense across ${his} lower back. `;
		} else if (child.markings === "freckles") {
			r += `${His} lower back is covered in a light speckling of freckles. `;
		}

		if (V.showBodyMods) {
			r += tats.butt(child);
		}

		return r;
	}

	function clothingCorset(child) {
		let r = ``;

		switch (child.clothes) {
			case "a slave gown":
				if (child.bellyAccessory === "a corset") {
					r += `${His} gown has an elegant integral corset. `;
				} else if (child.bellyAccessory === "an extreme corset") {
					r += `${His} gown has extreme corsetage built into it. `;
				} else if (child.bellyAccessory === "a support band") {
					r += `${His} support band is concealed by ${his} gown. `;
				}
				break;
			case "a ball gown":
				if (child.bellyAccessory === "a corset") {
					r += `The dress has an elegant integral corset. `;
				} else if (child.bellyAccessory === "an extreme corset") {
					r += `The dress has extreme corsetage built into it. `;
				} else if (child.bellyAccessory === "a support band") {
					r += `${His} support band is hidden by ${his} gown. `;
				}
				break;
			case "a mini dress":
				if (child.bellyAccessory === "a corset") {
					r += `The dress also cleverly doubles as an overbust corset. `;
				} else if (child.bellyAccessory === "an extreme corset") {
					r += `The dress also cleverly doubles as an extreme overbust corset. `;
				} else if (child.bellyAccessory === "a support band") {
					r += `${His} support band is hidden by ${his} dress. `;
				}
				break;
			case "a schoolgirl outfit":
				if (child.bellyAccessory === "a corset") {
					r += `The outline of ${his} corset can be seen through ${his} blouse. `;
				} else if (child.bellyAccessory === "an extreme corset") {
					r += `The outline of ${his} absurd corsetage can be seen through ${his} blouse. `;
				} else if (child.bellyAccessory === "a support band") {
					r += `${His} support band can be seen under ${his} blouse. `;
				}
				break;
			case "a tube top":
				if (child.bellyAccessory === "a corset") {
					r += `${His} sturdy corset is completely exposed. `;
				} else if (child.bellyAccessory === "an extreme corset") {
					r += `${His} extreme corsetage is completely exposed. `;
				} else if (child.bellyAccessory === "a support band") {
					r += `${His} support band is completely exposed. `;
				}
				break;
			case "a tank-top":
			case "a t-shirt":
			case "an oversized t-shirt":
				if (child.bellyAccessory === "a corset") {
					r += `${His} sturdy corset is hidden by ${his} clothing. `;
				} else if (child.bellyAccessory === "an extreme corset") {
					r += `${His} extreme corsetage is hidden by ${his} clothing. `;
				} else if (child.bellyAccessory === "a support band") {
					r += `${His} support band is hidden by ${his} clothing. `;
				}
				break;
			default:
				if (child.bellyAccessory === "a corset") {
					r += `${His} corset is ${his} only real piece of clothing. `;
				} else if (child.bellyAccessory === "an extreme corset") {
					r += `${His} extreme corset is ${his} only real piece of clothing. `;
				} else if (child.bellyAccessory === "a support band") {
					r += `${His} support band is ${his} only real piece of clothing. `;
				}
		}

		return r;
	}

	function collar(child) {
		let r = ``;
		let daddy;
		let pregCollar = jsEither(1, 2, 3);

		switch (child.collar) {
			case "uncomfortable leather":
				r += `${He} is wearing an uncomfortable leather collar with a useful steel ring in front. `;
				break;
			case "dildo gag":
				r += `${He} is wearing a sturdy leather collar that continues up to restrict ${his} jaw as well. It holds a ring gag in ${his} mouth, into which slots a formidable inward-facing dildo that reaches down ${his} throat. It can be removed to facefuck ${him}. `;
				break;
			case "massive dildo gag":
				r += `${He} is wearing a sturdy leather collar that continues up to restrict ${his} jaw as well. It acts as an anchor for an enormous inward-facing dildo that reaches deep down ${his} throat. The sheer size of the phallus forces ${his} mouth as wide as it will go and considerably bulges ${his} throat. Fortunately for ${him}, it is designed to allow ${him} to be able to breathe through ${his} nose; though when removed, the poor ${girl} finds ${himself} incapable of closing ${his} mouth for some time. `;
				break;
			case "preg biometrics":
				if (child.pregSource > 0) {
					daddy = findFather(child.pregSource);
					daddy = daddy.slaveName;
				}

				r += `${He} is wearing a heavy metal collar with a digital display; it currently reads: `;
				if (child.preg > 0 && !child.pregKnown) {
					r += `"I might be preggers! Rub my belly for luck!" `;
				} else {
					if (pregCollar === 1) {
						if (child.pregWeek < 0) {
							r += `"I'm a mommy now!" `;
						} else if (child.pregKnown) {
							r += `"${child.pregType === 0 ? `1` : `${child.pregType}`} bab${child.pregType > 1 ? `ies` : `y`} on board!" `;
						} else if (isFertile(child)) {
							r += `"Knock me up!" `;
						} else if (child.vagina < 0 && child.mpreg < 1) {
							r += `"Womb not detected!" `;
						} else if ((child.ovaries > 0 || child.mpreg > 0) && child.pubertyXX === 0 && child.physicalAge < V.fertilityAge) {
							r += `"I'm not old enough to get pregnant yet!" `;
						} else {
							r += `"I'm infertile!" `;
						}
					} else if (pregCollar === 2) {
						if (child.vagina < 0 && child.mpreg < 1) {
							r += `"I have no womb!" `;
						} else if (child.pregWeek < 0) {
							r += `"${num(child.pregWeek * -1)} week${child.pregWeek !== -1 ? `s` : ``} until I can get preggers again!" `;
						} else if (child.pregKnown) {
							if (child.preg > 40) {
								r += `"I'm ${Math.ceil(child.preg) - 40} ${Math.ceil(child.preg) - 40 > 1 ? `weeks` : `week`} overdue!" `;
							} else if (child.preg > 39) {
								r += `"I'm due this week!" `;
							} else {
								r += `"${40 - Math.ceil(child.preg)} ${40 - Math.ceil(child.preg) > 1 ? `weeks` : `week`} till I pop!" `;
							}
						} else if (isFertile(child)) {
							r += `"My womb needs filling!" `;
						} else if ((child.ovaries > 0 || child.mpreg > 0) && child.pubertyXX === 0) {
							r += `"I should be fertile `;
							if (child.pubertyAgeXX - child.physicalAge > 2) {
								r += `in about ${Math.round(child.pubertyAgeXX - child.physicalAge)} years!" `;
							} else if (child.pubertyAgeXX - child.physicalAge > 1) {
								r += `next year!" `;
							} else {
								r += `in about ${Math.ceil((child.pubertyAgeXX * 52 - (child.physicalAge * 52 + child.birthWeek)))} weeks!" `;
							}
						} else {
							r += `"I can't get pregnant right now!" `;
						}
					} else {
						if (child.vagina < 0 && child.mpreg < 1) {
							r += `"I need a womb!" `;
						} else if (child.pregWeek < 0) {
							r += `"I can't wait for my belly to swell with life again!" `;
						} else if (child.pregKnown === 1) {
							if (child.pregSource === -1) {
								r += `"Womb claimed by my ${getWrittenTitle(child)}!" `;
							} else if (child.pregSource === -2 || child.pregSource === 0) {
								r += `"Baby made by slutting around!" `;
							} else if (child.pregSource === -7) {
								r += `"My baby was made with science!" `;
							} else if (child.pregSource === -9) {
								r += `"Futanari Sisters, now two for the price of one!" `;
							} else {
								r += `"Womb claimed by ${daddy}!" `;
							}
						} else if (isFertile(child)) {
							r += `"Put a baby in me today!" `;
						} else if ((child.ovaries > 0 || child.mpreg > 0) && child.pubertyXX === 0 && child.physicalAge < V.fertilityAge) {
							r += `"I'm too young to get pregnant!" `;
						} else {
							r += `"Try to knock me up some other time!" `;
						}
					}
				}
				break;
			case "silk ribbon":
				r += `${He} is wearing a tight silk ribbon fitted to ${his} neck; it is oddly elegant. `;
				break;
			case "tight steel":
				r += `${He} is wearing a tight steel collar whose restricting metal touch ${he} cannot escape. `;
				break;
			case "porcelain mask":
				r += `${He} is wearing a beautiful porcelain mask to hide ${his} unsightly facial features. `;
				break;
			case "shock punishment":
				r += `${He} is wearing a utilitarian collar with a punishment device at ${his} throat to administer agonizing shocks. `;
				break;
			case "neck corset":
				r += `${He} is wearing a fitted leather neck corset that constricts ${his} breathing and holds ${his} head rigidly upright. `;
				break;
			case "stylish leather":
				r += `${He} is wearing a stylish leather collar buckled in the front, a classic accessory for the well behaved slave. `;
				break;
			case "satin choker":
				r += `${He} is wearing a steel reinforced black satin choker that is at once elegant and functional. `;
				break;
			case "heavy gold":
				r += `${He} is wearing a heavy gold collar, an outstanding bit of ostentation. `;
				break;
			case "pretty jewelry":
				r += `${He} is wearing a pretty slave collar that can almost be mistaken for jewelry. `;
				break;
			case "bell collar":
				r += `${He} is wearing a comfortable leather collar with a small brass bell at ${his} throat. `;
				break;
			case "leather with cowbell":
				r += `${He} is wearing a comfortable leather collar with a small steel cowbell at ${his} throat. `;
				break;
			case "bowtie":
				r += `${He} is wearing the collar from a white formal shirt, and a black bowtie, though these conceal an actual collar that works perfectly well for restraint. `;
				break;
			case "ancient Egyptian":
				r += `${He} is wearing a beautiful golden wesekh, a collar that spreads from ${his} neck out onto both shoulders and down ${his} front. `;
				break;
			case "ball gag":
				r += `${He} is wearing a mouth filling, ${child.makeup === 3 || child.makeup === 6 || child.makeup === 8 ? `${child.hColor}` : `red`} ball-shaped gag that prevents ${him} from uttering a word while keeping ${him} uncomfortably aware of ${his} status. `;
				break;
			case "bit gag":
				r += `${He} is wearing a jaw spreading, bar-shaped gag that prevents ${him} from speaking while keeping ${him} uncomfortably aware of ${his} status. `;
				break;
			case "cruel retirement counter":
			case "nice retirement counter":
				r += `${He} is wearing a ${child.collar === "cruel retirement counter" ? `heavy metal collar` : `nice collar, almost a necklace,`} with a small numerical display reading `;
				if (V.policies.retirement.sex > 0) {
					r += `${V.policies.retirement.sex - (child.counter.oral + child.counter.anal + child.counter.vaginal + child.counter.penetrative + child.counter.mammary)}, for the number of cocks between ${him} and ${his} freedom. `;
				} else if (V.policies.retirement.milk > 0) {
					r += `${V.policies.retirement.milk - child.counter.milk}, for the amount of milk ${he} has yet to give. `;
				} else if (V.policies.retirement.cum > 0) {
					r += `${V.policies.retirement.cum - child.counter.cum}, for the amount of cum ${he} has yet to give. `;
				} else if (V.policies.retirement.births > 0) {
					r += `${V.policies.retirement.births - child.counter.births}, for the number of pregnancies still between ${him} and freedom. `;
				} else if (V.policies.retirement.kills > 0) {
					r += `${V.policies.retirement.kills - child.counter.pitKills}, for the number of lives still between ${him} and freedom. `;
				} else if (V.policies.retirement.physicalAgePolicy === 0) {
					r += `${(52 * (V.retirementAge - (child.actualAge + 1))) + (52 - child.birthWeek)}, the number of weeks of sexual slavery ahead of ${him}.`;
				} else {
					r += `${(52 * (V.retirementAge - (child.physicalAge + 1))) + (52 - child.birthWeek)}, the number of weeks of sexual slavery ahead of ${him}.`;
				}
				break;
		}

		return r;
	}

	function crotch(child) {
		let r = ``;

		if (V.showClothing && !market) {
			switch (child.clothes) {
				case "a slave gown":
					r += `${child.slaveName}'s `;
					if (child.dick > 6) {
						r += `lovely gown cannot hide the fact that something massive is lurking between ${his} legs. `;
					} else if (child.dick > 3) {
						r += `cock tents the front of ${his} lovely gown. `;
					} else if (child.dick > 0 && child.vagina > -1) {
						r += `hermaphroditic genitalia are hidden by ${his} lovely gown. `;
					} else if (child.dick > 0) {
						r += `cock is hidden by ${his} lovely gown. `;
					} else if (child.vagina === -1) {
						r += `featureless groin is concealed by ${his} lovely gown. `;
					} else {
						r += `pussy is concealed by ${his} lovely gown. `;
					}
					break;
				case "a ball gown":
					r += `${child.slaveName}'s `;
					if (child.dick > 3) {
						r += `cock tents the front of ${his} fabulous silken ball gown. `;
					} else if (child.dick > 0 && child.vagina > -1) {
						r += `hermaphroditic genitalia are hidden by ${his} fabulous silken ball gown. `;
					} else if (child.dick > 0) {
						r += `cock is hidden by ${his} fabulous silken ball gown. `;
					} else if (child.vagina === -1) {
						r += `featureless groin is hidden by ${his} fabulous silken ball gown. `;
					} else {
						r += `pussy is concealed by ${his} fabulous silken ball gown. `;
					}
					break;
				case "a mini dress":
					r += `${child.slaveName}'s `;
					if (child.dick > 5 && canAchieveErection(child) && child.devotion > 20 && child.belly >= 5000) {
						r += `massive erection is agonizingly pinned to the front of ${his} ${child.bellyPreg > 2000 ? `gravid` : bellyImplant > 2000 ? `rounded` : `swollen`} belly, entirely visible against the straining fabric of ${his} dress. `;
					} else if (child.dick > 5 && canAchieveErection(child) && child.devotion > 20) {
						r += `massive erection ascends up ${his} chest, entirely visible against the straining fabric of ${his} dress. `;
					} else if (child.dick > 3 && canAchieveErection(child) && child.devotion > 20 && child.belly >= 5000) {
						r += `erection lies flush against the bottom of ${his} ${child.bellyPreg > 2000 ? `gravid` : bellyImplant > 2000 ? `rounded` : `swollen`} stomach, visible under the tight fabric of ${his} dress. `;
					} else if (child.dick > 3 && canAchieveErection(child) && child.devotion > 20) {
						r += `erection lies flush against ${his} stomach, visible under the tight fabric of ${his} dress. `;
					} else if (child.dick > 5) {
						r += `short dress can't possibly conceal ${his} huge cock; its lower half sticks out below the hemline. `;
					} else if (child.dick > 3) {
						r += `short dress can't possibly conceal ${his} big cock; its head peeks out below the hemline. `;
					} else if (child.dick > 0 && child.vagina > -1) {
						r += `short dress scarcely covers the bulge of ${his} cock, while leaving a hint of ${his} bare pussy visible below the hemline. `;
					} else if (child.dick > 0) {
						r += `short dress scarcely covers the bulge of ${his} cock. `;
					} else if (child.chastityVagina) {
						r += `short dress leaves a hint of ${his} polished chastity belt below the hemline. `;
					} else if (child.chastityAnus) {
						r += `short dress leaves a hint of ${his} polished anal chastity belt below the hemline. `;
					} else if (child.vagina === -1) {
						r += `short dress leaves a hint of ${his} featureless groin below its hemline. `;
					} else {
						r += `short dress leaves a hint of ${his} bare pussy below the hemline. `;
					}
					break;
				case "a schoolgirl outfit":
					if (child.dick > 3) {
						r += `${child.slaveName}'s dickhead is visible, swinging below the hem of ${his} skirt. `;
					} else if (child.dick > 0) {
						r += `Something is pushing against the front of ${child.slaveName}'s plaid skirt. `;
					} else if (child.vagina === -1) {
						r += `${child.slaveName}'s plaid skirt lifts to show off ${his} featureless groin. `;
					} else {
						r += `${child.slaveName}'s plaid skirt lifts to show off ${his} pussy with the slightest provocation. `;
					}
					break;
				case "a tank-top":
				case "a tube top":
				case "a t-shirt":
					if (child.dick > 6) {
						r += `${his} outfit does nothing to conceal ${his} swinging cock. `;
					} else if (child.dick > 0 && child.vagina > -1) {
						r += `${child.slaveName}'s outfit does nothing to conceal ${his} hermaphroditic genitalia. `;
					} else if (child.dick > 0) {
						r += `${child.slaveName}'s outfit does nothing to conceal ${his} cock. `;
					} else if (child.vagina === -1) {
						r += `${child.slaveName}'s outfit does nothing to conceal ${his} featureless groin. `;
					} else {
						r += `${child.slaveName}'s outfit does nothing to conceal ${his} pussy. `;
					}
					break;
				default:
					if (!child.chastityPenis) {
						if (child.vagina > -1) {
							r += `${child.slaveName}'s ${child.dick > 0 ? `hermaphrodite genitalia are` : `pussy is`} bare and available. `;
						} else if (child.dick > 0) {
							r += `${child.slaveName}'s `;

							switch (child.dick) {
								case 10:
									r += `inhuman cock hangs naked. `;
									break;
								case 9:
									r += `absurd cock hangs naked. `;
									break;
								case 8:
									r += `titanic${!canAchieveErection(child) ? `, flaccid` : ``} cock hangs naked. `;
									break;
								case 7:
									r += `gigantic${!canAchieveErection(child) ? `, flaccid` : ``} cock hangs naked. `;
									break;
								case 6:
									r += `huge${!canAchieveErection(child) ? `, flaccid` : ``} cock hangs naked. `;
									break;
								case 5:
									r += `imposing${!canAchieveErection(child) ? `, flaccid` : ``} cock swings naked. `;
									break;
								case 4:
									r += `big${!canAchieveErection(child) ? `, flaccid` : ``} cock dangles naked. `;
									break;
								case 3:
									r += `${!canAchieveErection(child) ? ` flaccid` : ``} cock dangles bare. `;
									break;
								case 2:
									r += `little${!canAchieveErection(child) ? ` flaccid` : ``} dick is bare. `;
									break;
								case 1:
									r += `tiny${!canAchieveErection(child) ? ` flaccid` : ``} dick is bare. `;
									break;
								default:
									r += `hypertrophied cock hangs naked. `;
									break;
							}
						} else {
							r += `${child.slaveName}'s ${child.balls > 0 ? `lonely balls are` : `featureless groin is`} bare and vulnerable. `;
						}
					}
					break;
			}
		}

		return r;
	}

	function dick(child) {
		let r = ``;
		let scrotalFullness = child.scrotum - child.balls;

		if (child.dick > 0) {
			switch (child.dick) {
				case 10:
					if (V.showDickCMs) {
						r += `${His} awe-inspiring${V.seeCircumcision ? `, uncut` : ` circumcised`}, penis is around ${dickToEitherUnit(child.dick)} long, `;
					} else {
						r += `${He} has an awe-inspiring${V.seeCircumcision ? `, uncut` : ` circumcised`} penis, `;
					}
					r += `a true masterpiece of modern growth hormone treatment, `;
					break;
				case 9:
					if (V.showDickCMs) {
						r += `${His} monstrous${V.seeCircumcision ? `, uncut` : ` circumcised`}, penis is around${dickToEitherUnit(child.dick)} long, `;
					} else {
						r += `${He} has a monstrous${V.seeCircumcision ? `, uncut` : ` circumcised`}, penis, `;
					}
					r += `a work of modern pharmacological art, `;
					break;
				case 8:
					if (V.showDickCMs) {
						r += `${His} truly imposing${V.seeCircumcision ? `, uncut` : ` circumcised`}, penis is around${dickToEitherUnit(child.dick)} long when as hard as it can get, `;
					} else {
						r += `${He} has a truly imposing${V.seeCircumcision ? `, uncut` : ` circumcised`}, penis, `;
					}
					r += `an obvious product of modern growth hormones, `;
					break;
				case 7:
					if (V.showDickCMs) {
						r += `${His} massive${V.seeCircumcision ? `, uncut` : ` circumcised`}, penis is around${dickToEitherUnit(child.dick)} long when as hard as it can get, `;
					} else {
						r += `${He} has a massive${V.seeCircumcision ? `, uncut` : ` circumcised`}, penis, `;
					}
					r += `larger than a dick can grow naturally, `;
					break;
				case 6:
					r += `${V.showDickCMs ? `${His} enormous${V.seeCircumcision ? `, uncut` : ` circumcised`}, penis ${canAchieveErection(child) ? `is around${dickToEitherUnit(child.dick)} long when` : `would be around${dickToEitherUnit(child.dick)} long if it could become`} erect` : `${He} has an enormous${V.seeCircumcision ? `, uncut,` : `, circumcised,`} penis`}, a rival to the world's largest natural dicks, `;
					break;
				case 5:
					r += `${V.showDickCMs ? `${His} huge${V.seeCircumcision ? `, uncut` : ` circumcised`}, penis ${canAchieveErection(child) ? `is more than${dickToEitherUnit(child.dick)} long when` : `would be around${dickToEitherUnit(child.dick)} long if it could become`} erect` : `${He} has a huge${V.seeCircumcision ? `, uncut,` : `, circumcised,`} penis`}, large enough to be sexually inconvenient, `;
					break;
				case 4:
					r += `${V.showDickCMs ? `${His} large${V.seeCircumcision ? `, uncut` : ` circumcised`}, penis ${canAchieveErection(child) ? `is around${dickToEitherUnit(child.dick)} long when` : `would be around${dickToEitherUnit(child.dick)} long if it could become`} erect` : `${He} has a large${V.seeCircumcision ? `, uncut` : ` circumcised`}, penis`}, big enough to be a source of pride on a male, `;
					break;
				case 3:
					r += `${V.showDickCMs ? `${His} average-sized${V.seeCircumcision ? `, uncut` : ` circumcised`}, penis ${canAchieveErection(child) ? `is around${dickToEitherUnit(child.dick)} long when` : `would be around${dickToEitherUnit(child.dick)} long if it could become`}s erect` : `${He} has an average-sized${V.seeCircumcision ? `, uncut` : ` circumcised`}, penis`}, `;
					break;
				case 2:
					r += `${V.showDickCMs ? `${His} small${V.seeCircumcision ? `, uncut` : ` circumcised`}, penis ${canAchieveErection(child) ? `is around${dickToEitherUnit(child.dick)} long when` : `would be around${dickToEitherUnit(child.dick)} long if it could become`} erect` : `${He} has a small${V.seeCircumcision ? `, uncut` : ` circumcised`}, penis`}, little enough to be a source of embarrassment on a male, `;
					break;
				case 1:
					r += `${V.showDickCMs ? `${His}${V.seeCircumcision ? `, uncut` : ` circumcised`} micropenis ${canAchieveErection(child) ? `is less than${dickToEitherUnit(child.dick)} long when` : `would be less than${dickToEitherUnit(child.dick)} long if it could become`} erect` : `${He} has ${V.seeCircumcision ? `an uncut` : `a circumcised`} micropenis`}, `;
					break;
				default:
					if (V.showDickCMs) {
						r += `${His} mind-shattering${V.seeCircumcision ? `, uncut` : ` circumcised`}, penis is around${dickToEitherUnit(child.dick)} long, `;
					} else {
						r += `${He} has a mind-shattering${V.seeCircumcision ? `, uncut` : ` circumcised`}, penis, `;
					}
					r += `a true masterpiece of modern growth hormone treatment, `;
					break;
			}

			if (!child.scrotum) {
				if (child.vagina > -1) {
					r += `and is right above ${his} vagina. `;
				} else {
					r += `and rests above nothing but smooth, sensitive skin until `;

					switch (child.anus) {
						case 0:
							r += `the tiny crinkle of ${his} virgin asshole. `;
							break;
						case 1:
							r += `${his} tight little rosebud. `;
							break;
						case 2:
							r += `the bottom of the vertical slit formed by ${his} rear pussy. `;
							break;
						case 3:
							r += `the bottom of the soft slit formed by ${his} lewd rear pussy. `;
							break;
						default:
							r += `the edge of ${his} open anal gape. `;
							break;
					}
				}
			} else {
				switch (child.balls) {
					case 10:
						r += `and ${he} has an inhuman pair of testicles${V.showDickCMs ? `, nearly ${ballsToEitherUnit(child.balls)} long` : ``}. `;
						break;
					case 9:
						r += `and ${he} has a titanic pair of testicles${V.showDickCMs ? `, about ${ballsToEitherUnit(child.balls)} long` : ``}. `;
						break;
					case 8:
						r += `and ${he} has a gigantic pair of testicles${V.showDickCMs ? `, about ${ballsToEitherUnit(child.balls)} long` : ``}. `;
						break;
					case 7:
						r += `and ${he} has a monstrous pair of testicles${V.showDickCMs ? `, about ${ballsToEitherUnit(child.balls)} long` : ``}. `;
						break;
					case 6:
						r += `and ${he} has an enormous pair of testicles${V.showDickCMs ? `, about ${ballsToEitherUnit(child.balls)} long` : ``}. `;
						break;
					case 5:
						r += `and ${he} has a huge pair of testicles${V.showDickCMs ? `, about ${ballsToEitherUnit(child.balls)} long` : ``}. `;
						break;
					case 4:
						r += `and ${he} has a big pair of testicles${V.showDickCMs ? `, about ${ballsToEitherUnit(child.balls)} long` : ``}. `;
						break;
					case 3:
						r += `and ${he} has an average pair of testicles${V.showDickCMs ? `, about ${ballsToEitherUnit(child.balls)} long` : ``}. `;
						break;
					case 2:
						r += `and ${he} has a small pair of testicles${V.showDickCMs ? `, about ${ballsToEitherUnit(child.balls)} long` : ``}. `;
						break;
					case 1:
						r += `and ${his} testicles are so small they have retreated up into ${his} abdomen. `;
						break;
					case 0:
						if (child.dick === 2) {
							r += `and ${he} lacks testicles. `;
						} else if (child.dick === 1) {
							r += `and ${he} lacks testicles: ${his} vestigial dick is functionally a large, soft clit. `;
						} else {
							r += `but ${he} lacks testicles. `;
						}
						break;
					default:
						r += `and ${he} has a hypertrophied, clearly unnatural pair of testicles${V.showDickCMs ? `, about ${ballsToEitherUnit(child.balls)} long` : ``}, a true masterpiece of modern growth hormone treatment. `;
						break;
				}
			}

			if (child.balls > 0 && child.scrotum > 0) {
				if (child.balls > 90) {
					if (scrotalFullness < -1) {
						r += `${His} poor scrotum is agonizingly overfilled and looks ready to burst. ${He} must be in constant pain. `;
					} else if (scrotalFullness === -1) {
						r += `${His} poor scrotum is so overfilled, every little vein is visible. ${He} must be in constant discomfort. `;
					} else if (scrotalFullness === 0) {
						r += `${His} comfortable scrotum allows them to hang massively ${hasBothLegs(child) ? `between ${his} legs` : `from ${his} legless torso`}. `;
					} else {
						r += `Their weight and size has stretched ${his} scrotum downward, so that they ${hasBothLegs(child) ? `drag along the floor` : `hang far from ${his} legless torso`}. `;
					}
				} else if (child.balls >= 20) {
					if (scrotalFullness < -1) {
						r += `${His} poor scrotum is agonizingly overfilled and taut. ${He} must be in constant pain. `;
					} else if (scrotalFullness === -1) {
						r += `${His} poor scrotum is so overfilled, every little vein is visible. ${He} must be in constant discomfort. `;
					} else if (scrotalFullness === 0) {
						r += `${His} comfortable scrotum allows them to hang massively ${hasBothLegs(child) ? `between ${his} legs` : `from ${his} legless torso`}. `;
					} else {
						r += `Their weight and size has stretched ${his} scrotum downward, so that they dangle ${hasBothLegs(child) ? `to ${his} knees` : `quite the distance from ${his} legless torso`}. `;
					}
				} else if (child.balls > 5) {
					if (scrotalFullness < -1) {
						r += `${His} poor scrotum is so overfilled, every little vein is visible. ${He} must be in agony. `;
					} else if (scrotalFullness === -1) {
						r += `They're held against ${his} base by a tight scrotum that permits them little movement. `;
					} else if (scrotalFullness === 0) {
						r += `${His} comfortable scrotum allows them to hang massively ${hasBothLegs(child) ? `between ${his} legs` : `from ${his} legless torso`}. `;
					} else {
						r += `Their weight has stretched ${his} scrotum downward, so that they dangle ${hasBothLegs(child) ? `halfway to ${his} knees` : `some distance from ${his} legless torso`}. `;
					}
				} else if (child.balls > 3) {
					if (scrotalFullness < -1) {
						r += `They're too big for ${his} tiny scrotum, which is stretched tight over each ball. `;
					} else if (scrotalFullness === -1) {
						r += `They're held against ${his} base by a tight scrotum that permits them little movement. `;
					} else if (scrotalFullness === 0) {
						r += `${His} soft scrotum allows them to rest comfortably ${hasBothLegs(child) ? `between ${his} legs` : `beneath ${his} legless torso`}. `;
					} else {
						r += `${He} has a loose, dangling scrotum that allows them to swing ${hasBothLegs(child) ? `between ${his} legs` : `from ${his} legless torso`}. `;
					}
				} else if (child.balls > 1) {
					if (scrotalFullness === -1) {
						r += `They're held tightly by a very minimal scrotum that turns them into a soft little bump. `;
					} else if (scrotalFullness === 0) {
						r += `${His} comfortable little scrotum allows them to rest softly. `;
					} else {
						r += `They're almost lost in ${his} big soft scrotum, wrinkled for lack of anything to fill it properly. `;
					}
				} else {
					if (scrotalFullness === 0) {
						r += `${He} has a soft little trace of scrotum. `;
					} else {
						r += `They've left ${his} scrotum soft and empty. `;
					}
				}
			}

			if (child.mpreg && canAchieveErection(child) && child.belly >= 10000 && child.prostate > 0) {
				r += `${His} huge pregnancy puts pressure on ${his} prostate at all times, leaving ${him} fully erect and trailing cum. `;
			} else if (child.chastityPenis) {
				r += `As you watch, the machine detects that ${his} balls are ready for emptying. It reams ${his} ass until semen whitens the transparent tubing coming off the head of the receptacle covering ${his} dick. `;
			} else if (child.drugs === "priapism agents") {
				if (child.dick > 8) {
					r += accessories.dick(child);
				} else if (child.dick > 6) {
					r += `${He}'s painfully hard, despite the size of ${his} cock, and on the brink of losing consciousness, since a dangerous amount of ${his} blood volume is required to even get it to this point. `;
				} else {
					r += `${He}'s painfully erect, or as erect that a cock of that size could be, and ${he} must feel very faint, since even that requires much of ${his} blood volume. `;
				}
				r += `${He}'s painfully erect. `;
			} else if (child.dick > 8) {
				r += `${He}'s too huge for ${his} cardiovascular system to create even the beginnings of an erection. ${His} cock is a soft, sensitive monolith${child.dick * 6 > child.height ? ` bigger than ${his} body` : child.dick * 6 > child.height / 2 ? ` the size of one of ${his} legs` : ` the size of one of ${his} arms`}, `;
				if (hasAnyArms(child) && hasAnyLegs(child) && child.dick * 6 > child.height) {
					r += `or would be if ${he} had any of those. `;
				} else {
					r += `hanging with its head ${child.dick > 9 ? `below` : `between`} ${his} knees. `;
				}
				if (child.prostate > 2) {
					r += `The area above ${his} crotch has a slight swell to it from ${his} prostate implant. A constant dribble of precum drips from the tip of ${his} cock; ${his} artificially hyperactive prostate keeps ${him} that way. `;
				} else if (child.prostate > 1) {
					r += `${He}'s got a string of precum dangling from the tip of ${his} cock; ${his} artificially hyperactive prostate keeps ${him} that way. `;
				}
			} else if (child.aphrodisiacs > 1 || (child.inflationType === "aphrodisiac" && child.inflation > 1)) {
				r += `The aphrodisiacs have ${his} cock painfully hard${child.drugs === "hormone blockers" || !(child.balls > 0 ? child.hormoneBalance < 100 : child.hormoneBalance <= -100) || child.ballType === "sterile" ? `, despite ${his} usual inability to achieve erection` : ``}. `;
				if (child.prostate > 2) {
					r += `The area above ${his} crotch has a slight swell to it from ${his} prostate implant. A constant dribble of precum drips from the tip of ${his} cock; ${his} artificially hyperactive prostate keeps ${him} that way. `;
				} else if (child.prostate > 1) {
					r += `${He}'s got a string of precum dangling from the tip of ${his} cock; ${his} artificially hyperactive prostate keeps ${him} that way. `;
				}
			} else if (child.balls > 0 && child.ballType === "sterile") {
				r += `Since ${he} has been chemically castrated, ${his} cock is soft. `;
				if (child.energy > 95) {
					r += `${He}'s such a nympho that despite this, ${his} limp member is tipped by a drop of precum. `;
				}
			} else if (!child.balls) {
				r += `Since ${he} `;
				if (child.genes === "XY") {
					r += `has been gelded, `;
				} else {
					r += `lacks testicles, `;
				}
				r += `${his} cock is soft. `;
				if (child.energy > 95) {
					r += `${He}'s such a nympho that despite this, ${his} limp member is tipped by a drop of precum. `;
				}
			} else if (child.dick > 0 && child.hormoneBalance >= 100) {
				r += `Since ${his} body is flooded with female hormones, ${his} cock is soft. `;
				if (child.devotion > 75) {
					r += `Despite this, ${he}'s so devoted to you that being near you makes ${him} horny. ${His} limp member is tipped by a drop of precum. `;
				} else if (child.drugs === "testicle enhancement" || child.drugs === "hyper testicle enhancement") {
					r += `Unfortunately for the poor slave, ${he}'s also on drugs that cause overproduction of cum. Since ${his} soft dick makes it difficult for ${him} to ejaculate properly, ${he}'s almost frantic with discomfort, and ${his} dickhead is dribbling excessive precum. `;
				}
			} else if (child.dick > 6) {
				r += `${His} cock is flirting with the limit of what the human cardiovascular system can bring erect: the best ${he} can manage is a half-hardness that's too soft to meaningfully fuck anything. If ${he} could somehow get fully erect, there are few holes ${he} could safely penetrate, anyway. `;
				if (child.prostate > 2) {
					r += `The area above ${his} crotch has a slight swell to it from ${his} prostate implant. A constant dribble of precum drips from the tip of ${his} cock; ${his} artificially hyperactive prostate keeps ${him} that way. `;
				} else if (child.prostate > 1) {
					r += `${He}'s got a string of precum dangling from the tip of ${his} cock; ${his} artificially hyperactive prostate keeps ${him} that way. `;
				}
			} else if (child.dick > 1) {
				if (child.aphrodisiacs > 0 || child.inflationType === "aphrodisiac") {
					r += `The aphrodisiacs have ${his} cock hard${!canAchieveErection(child) ? `, despite ${his} usual inability to achieve erection` : ``}. `;
					if (child.prostate > 2) {
						r += `The area above ${his} crotch has a slight swell to it from ${his} prostate implant. A constant dribble of precum drips from the tip of ${his} cock; ${his} artificially hyperactive prostate keeps ${him} that way. `;
					} else if (child.prostate > 1) {
						r += `${He}'s got a string of precum dangling from the tip of ${his} cock; ${his} artificially hyperactive prostate keeps ${him} that way. `;
					}
				} else if (child.energy > 95) {
					r += `As a nympho, ${he}'s almost constantly hard. `;
					if (child.prostate > 2) {
						r += `The area above ${his} crotch has a slight swell to it from ${his} prostate implant. A constant dribble of precum drips from the tip of ${his} cock; ${his} artificially hyperactive prostate keeps ${him} that way. `;
					} else if (child.prostate > 1) {
						r += `${He}'s got a string of precum dangling from the tip of ${his} cock; ${his} artificially hyperactive prostate keeps ${him} that way. `;
					}
				} else if (child.fetishKnown && child.fetishStrength > 60) {
					switch (child.fetish) {
						case "buttslut":
							r += `Judging by how hard ${he} is${child.prostate > 1 ? ` and the constant flow of precum leaking from the tip of ${his} dick` : child.prostate > 0 ? ` and the little bead of precum forming at the tip of ${his} dick` : ``}, ${he}'s probably fantasizing about being buttfucked. `;
							break;
						case "cumslut":
							r += `Judging by how hard ${he} is${child.prostate > 1 ? ` and the constant flow of precum leaking from the tip of ${his} dick` : child.prostate > 0 ? ` and the little bead of precum forming at the tip of ${his} dick` : ``}, ${he}'s probably fantasizing about being facefucked. `;
							break;
						case "humiliation":
							r += `Judging by how hard ${he} is${child.prostate > 1 ? ` and the constant flow of precum leaking from the tip of ${his} dick` : child.prostate > 0 ? ` and the little bead of precum forming at the tip of ${his} dick` : ``}, ${he}'s probably fantasizing about being humiliated. `;
							break;
						case "submissive":
							r += `Judging by how hard ${he} is${child.prostate > 1 ? ` and the constant flow of precum leaking from the tip of ${his} dick` : child.prostate > 0 ? ` and the little bead of precum forming at the tip of ${his} dick` : ``}, ${he}'s probably fantasizing about submission. `;
							break;
						case "dom":
							r += `Judging by how hard ${he} is${child.prostate > 1 ? ` and the constant flow of precum leaking from the tip of ${his} dick` : child.prostate > 0 ? ` and the little bead of precum forming at the tip of ${his} dick` : ``}, ${he}'s probably fantasizing about dominating someone. `;
							break;
						case "masochist":
							r += `Judging by how hard ${he} is${child.prostate > 1 ? ` and the constant flow of precum leaking from the tip of ${his} dick` : child.prostate > 0 ? ` and the little bead of precum forming at the tip of ${his} dick` : ``}, ${he}'s probably fantasizing about pain. `;
							break;
						case "sadist":
							r += `Judging by how hard ${he} is${child.prostate > 1 ? ` and the constant flow of precum leaking from the tip of ${his} dick` : child.prostate > 0 ? ` and the little bead of precum forming at the tip of ${his} dick` : ``}, ${he}'s probably fantasizing about hurting someone. `;
							break;
						case "pregnancy":
							if (canGetPregnant(child)) {
								r += `Judging by how hard ${he} is${child.prostate > 1 ? ` and the constant flow of precum leaking from the tip of ${his} dick` : child.prostate > 0 ? ` and the little bead of precum forming at the tip of ${his} dick` : ``}, ${he}'s probably fantasizing about sporting a huge pregnant belly. `;
							} else {
								r += `Judging by how hard ${he} is${child.prostate > 1 ? ` and the constant flow of precum leaking from the tip of ${his} dick` : child.prostate > 0 ? ` and the little bead of precum forming at the tip of ${his} dick` : ``}, ${he}'s probably fantasizing about getting someone pregnant. `;
							}
							break;
						case "boobs":
							r += `Judging by how hard ${he} is${child.prostate > 1 ? ` and the constant flow of precum leaking from the tip of ${his} dick` : child.prostate > 0 ? ` and the little bead of precum forming at the tip of ${his} dick` : ``}, ${he}'s probably fantasizing about boobs. `;
							break;
					}
				} else if (child.devotion > 50) {
					r += `As a devoted sex slave, ${he} has no trouble keeping ${himself} hard for ${his} ${getWrittenTitle(child)}. `;
					if (child.prostate > 2) {
						r += `The area above ${his} crotch has a slight swell to it from ${his} prostate implant. A constant dribble of precum drips from the tip of ${his} cock; ${his} artificially hyperactive prostate keeps ${him} that way. `;
					} else if (child.prostate > 1) {
						r += `${He}'s got a string of precum dangling from the tip of ${his} cock; ${his} artificially hyperactive prostate keeps ${him} that way. `;
					}
				} else if (child.devotion > 20) {
					r += `As an obedient sex slave, ${he} does ${his} best to keep ${himself} hard for ${his} ${getWrittenTitle(child)}. `;
					if (child.prostate > 2) {
						r += `The area above ${his} crotch has a slight swell to it from ${his} prostate implant. A constant dribble of precum drips from the tip of ${his} cock; ${his} artificially hyperactive prostate keeps ${him} that way. `;
					} else if (child.prostate > 1) {
						r += `${He}'s got a string of precum dangling from the tip of ${his} cock; ${his} artificially hyperactive prostate keeps ${him} that way. `;
					}
				} else {
					r += `Judging by the softness of ${his} dick, ${he} doesn't find ${his} situation arousing. `;
				}
			} else {
				r += `You can't tell if ${he} is hard or soft at a glance, not that there is much of a size difference between them. `;
				if (child.prostate > 2) {
					r += `The area above ${his} crotch has a slight swell to it from ${his} prostate implant; a swell that makes ${his} cock look even smaller by comparison. `;
				}
			}

			if (child.balls > 0 && child.vasectomy) {
				r += `${He} shoots blanks thanks to ${his} vasectomy. `;
			} else if (child.balls > 0 && child.ballType === "sterile") {
				r += `${He} no longer produces sperm, so ${his} ejaculate lacks potency. `;
			}

			if (child.physicalAge <= 3) {
				if (child.dick >= 15) {
					if (canWalk(child)) {
						r += `${His} penis so massive that it is difficult for ${him} to move. `;
						if (child.muscles > 95) {
							r += `However, ${he} is so powerfully built that ${he} can manage it with effort, using ${his} arms to support it. `;
						} else if (child.muscles > 30) {
							r += `${He} can barely move ${his} penis, and usually walks carrying it in any way ${he} can. `;
						} else if (child.muscles > 5) {
							r += `${He} requires assistance to move ${his} penis, and tries to rest it on the ground whenever ${he} can. `;
						} else {
							r += `${He} cannot get to ${his} feet unaided, and prefers to remain seated so ${his} enormous penis doesn't weigh ${him} down as much. `;
						}
					} else {
						r += `${His} penis is nearly the same size as ${his} torso, making ${him} about half cock. `;
					}

					if (child.dick >= 20) {
						if (V.dickAccessibility) {
							r += `Fortunately for ${him}, the penthouse is adapted for daily life with a cock `;
						} else {
							r += `${He} has trouble living in your penthouse, which is not designed for ${girl}s with dicks `;
						}
						r += `bigger than they are. `;
					}
				}
			} else if (child.physicalAge <= 12) {
				if (child.dick >= 30) {
					if (canWalk(child)) {
						r += `${His} penis so massive that it is difficult for ${him} to move. `;
						if (child.muscles > 95) {
							r += `However, ${he} is so powerfully built that ${he} can manage it with effort, using ${his} arms to support it. `;
						} else if (child.muscles > 30) {
							r += `${He} can barely to move ${his} penis, and usually walks carrying it in any way ${he} can. `;
						} else if (child.muscles > 5) {
							r += `${He} requires assistance to move ${his} penis, and tries to rest it on the ground whenever ${he} can. `;
						} else {
							r += `${He} cannot get to ${his} feet unaided, and prefers to remain seated so ${his} enormous penis doesn't weigh ${him} down as much. `;
						}
					} else {
						r += `${His} penis is nearly the same size as ${his} torso, making ${him} about half cock. `;
					}

					if (child.dick >= 30) {
						if (V.dickAccessibility) {
							r += `Fortunately for ${him}, the penthouse is adapted for daily life with a cock `;
						} else {
							r += `${He} has trouble living in your penthouse, which is not designed for ${girl}s with dicks `;
						}
						r += `bigger than they are. `;
					}
				}
			} else {
				if (child.dick >= 30) {
					if (canWalk(child)) {
						r += `${His} penis so massive that it is difficult for ${him} to move. `;
						if (child.muscles > 95) {
							r += `However, ${he} is so powerfully built that ${he} can manage it with effort, using ${his} arms to support it. `;
						} else if (child.muscles > 30) {
							r += `${He} can barely to move ${his} penis, and usually walks carrying it in any way ${he} can. `;
						} else if (child.muscles > 5) {
							r += `${He} requires assistance to move ${his} penis, and tries to rest it on the ground whenever ${he} can. `;
						} else {
							r += `${He} cannot get to ${his} feet unaided, and prefers to remain seated so ${his} enormous penis doesn't weigh ${him} down as much. `;
						}
					} else {
						r += `${His} penis is nearly the same size as ${his} torso, making ${him} about half cock. `;
					}

					if (child.dick >= 30) {
						if (V.dickAccessibility) {
							r += `Fortunately for ${him}, the penthouse is adapted for daily life with a cock `;
						} else {
							r += `${He} has trouble living in your penthouse, which is not designed for ${girl}s with dicks `;
						}
						r += `bigger than they are. `;
					}
				}
			}

			if (child.balls >= 50) {
				r += `${His} testicles are so big and sensitive that ${he} can barely move without stopping to let shivers run down ${his} body. It takes a great deal of control to not release their contents in huge spurts in every direction. `;
			} else if (child.balls >= 37) {
				r += `${His} perpetual stream of semen-laced precum leaves a mess on the floor wherever ${he} goes${canAchieveErection(child) ? `, along with ${his} shaft and legs whenever ${he} is erect` : ``}. `;
			} else if (child.balls >= 25) {
				r += `Parts of the constant dribble coming out of the tip of ${his} dick are now white, a testament to just how much cum ${his} massive balls produce and how desperate they are for release. `;
			} else if (child.balls >= 10) {
				r += `${He} produces so much cum that ${his} dick uncontrollably dribbles precum wherever ${he} goes, leaving a trail of drops behind ${him}. `;
			}

			if (child.prostate > 2) {
				r += `${His} ejaculate has a distinct clearness to it from the sheer amount of prostate fluid produced by ${his} overstimulated prostate. `;
			}

			if (child.physicalAge <= 3) {
				if (child.balls >= 25) {
					if (canWalk(child)) {
						r += `${His} balls are so massive that it is difficult for ${him} to move. `;
						if (child.muscles > 95) {
							r += `However, ${he} is so powerfully built that ${he} can manage it with effort, using ${his} arms to support them. `;
						} else if (child.muscles > 30) {
							r += `${He} can barely manage to get to ${his} feet unaided, and usually walks carrying ${his} testicles in any way ${he} can. `;
						} else if (child.muscles > 5) {
							r += `${He} requires assistance to get to ${his} feet, and tries to rest ${his} huge balls on the ground whenever ${he} can. `;
						} else {
							r += `${He} cannot get to ${his} feet unaided, and prefers to remain seated so ${his} enormous balls don't weigh ${him} down as much. `;
						}
					} else if (child.balls >= 100) {
						r += `${His} testicles each dwarf ${him}, making ${him} almost entirely testicle. `;
					} else {
						r += `${His} testicles each dwarf ${his} torso, making ${him} almost entirely testicle. `;
					}

					if (child.balls > 90) {
						if (V.ballsAccessibility) {
							r += `Fortunately for ${him}, the penthouse is adapted for daily life with balls `;
						} else {
							r += `${He} has trouble living in your penthouse, which is not designed for ${girl}s with testicles `;
						}
						r += `wider than a standard doorway. `;
					}
				}
			} else if (child.physicalAge <= 12) {
				if (child.balls >= 25) {
					if (canWalk(child)) {
						r += `${His} balls are so massive that it is difficult for ${him} to move. `;
						if (child.muscles > 95) {
							r += `However, ${he} is so powerfully built that ${he} can manage it with effort, using ${his} arms to support them. `;
						} else if (child.muscles > 30) {
							r += `${He} can barely manage to get to ${his} feet unaided, and usually walks carrying ${his} testicles in any way ${he} can. `;
						} else if (child.muscles > 5) {
							r += `${He} requires assistance to get to ${his} feet, and tries to rest ${his} huge balls on the ground whenever ${he} can. `;
						} else {
							r += `${He} cannot get to ${his} feet unaided, and prefers to remain seated so ${his} enormous balls don't weigh ${him} down as much. `;
						}
					} else if (child.balls >= 100) {
						r += `${His} testicles are each nearly the same size as ${him}, making ${him} mostly testicle. `;
					} else {
						r += `${His} testicles are each nearly the same size as ${his} torso, making a solid portion of ${his} mass testicle. `;
					}

					if (child.balls > 90) {
						if (V.ballsAccessibility) {
							r += `Fortunately for ${him}, the penthouse is adapted for daily life with balls `;
						} else {
							r += `${He} has trouble living in your penthouse, which is not designed for ${girl}s with testicles `;
						}
						r += `wider than a standard doorway. `;
					}
				}
			} else {
				if (child.balls >= 25) {
					if (canWalk(child)) {
						r += `${His} balls are so massive that it is difficult for ${him} to move. `;
						if (child.muscles > 95) {
							r += `However, ${he} is so powerfully built that ${he} can manage it with effort, using ${his} arms to support them. `;
						} else if (child.muscles > 30) {
							r += `${He} can barely manage to get to ${his} feet unaided, and usually walks carrying ${his} testicles in any way ${he} can. `;
						} else if (child.muscles > 5) {
							r += `${He} requires assistance to get to ${his} feet, and tries to rest ${his} huge balls on the ground whenever ${he} can. `;
						} else {
							r += `${He} cannot get to ${his} feet unaided, and prefers to remain seated so ${his} enormous balls don't weigh ${him} down as much. `;
						}
					} else if (child.balls >= 100) {
						r += `Together, ${his} testicles are nearly the same size as ${him}, making ${him} about half testicle. `;
					} else {
						r += `Together, ${his} testicles are nearly the same size as ${his} torso, making ${him} about half testicle. `;
					}

					if (child.balls > 90) {
						if (V.ballsAccessibility) {
							r += `Fortunately for ${him}, the penthouse is adapted for daily life with balls `;
						} else {
							r += `${He} has trouble living in your penthouse, which is not designed for ${girl}s with testicles `;
						}
						r += `wider than a standard doorway. `;
					}
				}
			}

			if (child.foreskin > 0) {
				if (child.foreskin - child.dick < -1) {
					r += `${His} cockhead is much too large for ${his} foreskin, probably as a result of recent penis growth it hasn't had time to stretch to accommodate yet. `;
					if (canAchieveErection(child) && (child.devotion > 20 || child.aphrodisiacs > 0 || child.inflationType === "aphrodisiac" || child.drugs === "priapism agents")) {
						r += `The bit of erect dickhead visible at the tip of the uncomfortably stretched skin is an angry color from being squeezed so hard. `;
					} else if (canAchieveErection(child)) {
						r += `${He} isn't erect right now, but getting a hard-on will probably be very uncomfortable for ${him}. `;
					} else {
						r += `Fortunately for ${him}, ${he} can't get hard, making this merely uncomfortable for ${him}. `;
					}
				} else if (child.foreskin - child.dick < 0) {
					r += `${His} foreskin is stretched by ${his} dickhead, probably as a result of recent penis growth it hasn't had time to get used to yet. `;
					if (canAchieveErection(child) && (child.devotion > 20 || child.aphrodisiacs > 0 || child.inflationType === "aphrodisiac" || child.drugs === "priapism agents")) {
						r += `${His} erection has stretched the skin there taut. `;
					} else if (canAchieveErection(child)) {
						r += `${He} isn't erect right now, but getting a hard-on will probably be a bit uncomfortable for ${him}. `;
					} else {
						r += `Fortunately for ${him}, ${he} can't get hard, making this state merely odd-looking. `;
					}
				} else if (child.foreskin - child.dick > 0) {
					r += `${His} foreskin seems too large for ${his} dick, probably as a result of recent penis shrinkage. `;
					if (canAchieveErection(child) && (child.devotion > 20 || child.aphrodisiacs > 0 || child.inflationType === "aphrodisiac" || child.drugs === "priapism agents")) {
						r += `${His} erection cannot fully retract it, though it's loose enough that this doesn't look uncomfortable. `;
					} else if (canAchieveErection(child)) {
						r += `${He} isn't erect right now, making the tip of ${his} dick look shriveled. `;
					} else {
						r += `${He} can't get hard, making the tip of ${his} dick look shriveled. `;
					}
				} else if (child.foreskin - child.dick > 1) {
					r += `${His} foreskin is far too large for ${his} dick, probably as a result of recent penis shrinkage. `;
					if (canAchieveErection(child) && (child.devotion > 20 || child.aphrodisiacs > 0 || child.inflationType === "aphrodisiac" || child.drugs === "priapism agents")) {
						r += `${His} erection cannot retract it at all, though it's loose enough that this doesn't look uncomfortable. Orgasming, though, will likely produce a dribbling mess. `;
					} else if (canAchieveErection(child)) {
						r += `${He} isn't erect right now, so the excess skin droops lamely off ${his} cockhead. `;
					} else {
						r += `${He} can't get hard, so the excess skin droops lamely off ${his} cockhead. `;
					}
				}
			}

			if (child.dick < 3 && child.balls > 5) {
				r += `${His} cock is small enough that it does not hang past the bottom of ${his} gigantic ballsack when soft. `;
			} else if (child.dick < 2 && child.balls > 4) {
				r += `${His} cock is so small that it does not hang past the bottom of ${his} huge ballsack when soft. `;
			} else if (child.dick < 1 && child.balls > 3) {
				r += `${His} cock is so small that it barely protrudes from ${his} ample ballsack. `;
			}
			if (!canAchieveErection(child)) {
				r.push(`Since ${he} can't achieve an erection, ${his} penetrative skill is irrelevant.`);
			} else if (child.skill.penetrative >= 100) {
				r.push(`${He} is a <span class="skill">master in penetrative sex.</span>`);
			} else if (child.skill.penetrative > 60) {
				r.push(`${He} is an <span class="skill">expert in penetrative sex.</span>`);
			} else if (child.skill.penetrative > 30) {
				r.push(`${He} is <span class="skill">skilled penetrating others.</span>`);
			} else if (child.skill.penetrative > 10) {
				r.push(`${He} has <span class="skill">basic knowledge about penetrating others.</span>`);
			} else {
				r.push(`${He} has no penetrative skill.`);
			}
		} else if (child.vagina === -1) {
			if (!child.scrotum) {
				r += `${He} has ${V.seeDicks > 0 ? `no penis and ` : ``}no vagina, nothing but a tiny hole in the smooth ${child.skin} skin ${hasBothLegs(child) ? `between ${his} legs` : `at the base of ${his} hips`}. `;
			} else {
				r += `${He} has ${V.seeDicks > 0 ? `no penis and ` : ``}no vagina, just a tiny hole above `;

				switch (child.balls) {
					case 6:
						r += `a gigantic, clearly unnatural pair of testicles${V.showDickCMs ? `, about ${ballsToEitherUnit(child.balls)} long` : ``}. `;
						break;
					case 5:
						r += `a huge pair of testicles${V.showDickCMs ? `, about ${ballsToEitherUnit(child.balls)} long` : ``}. `;
						break;
					case 4:
						r += `a big pair of testicles${V.showDickCMs ? `, about ${ballsToEitherUnit(child.balls)} long` : ``}. `;
						break;
					case 3:
						r += `an average pair of testicles${V.showDickCMs ? `, about ${ballsToEitherUnit(child.balls)} long` : ``}. `;
						break;
					case 2:
						r += `a small pair of testicles${V.showDickCMs ? `, about ${ballsToEitherUnit(child.balls)} long` : ``}. `;
						break;
					case 1:
						r += `a soft little trace of scrotum, since ${his} testicles are so small they have retreated up into ${his} abdomen. `;
						break;
					case 0:
						r += `smooth ${child.skin} skin. `;
						break;
					default:
						r += `a hypertrophied, clearly unnatural pair of testicles${V.showDickCMs ? `, about ${ballsToEitherUnit(child.balls)} long` : ``}, a true masterpiece of modern growth hormone treatment. `;
						break;
				}
			}

			if (child.balls > 0 && child.scrotum > 0) {
				if (child.balls > 90) {
					if (scrotalFullness < -1) {
						r += `${His} poor scrotum is agonizingly overfilled and looks ready to burst. ${He} must be in constant pain. `;
					} else if (scrotalFullness === -1) {
						r += `${His} poor scrotum is so overfilled, every little vein is visible. ${He} must be in constant discomfort. `;
					} else if (scrotalFullness === 0) {
						r += `${His} comfortable scrotum allows them to hang massively ${hasBothLegs(child) ? `between ${his} legs` : `from ${his} legless torso`}. `;
					} else {
						r += `Their weight and size has stretched ${his} scrotum downward, so that they ${hasBothLegs(child) ? `drag along the floor` : `hang far from ${his} legless torso`}. `;
					}
				} else if (child.balls > 20) {
					if (scrotalFullness < -1) {
						r += `${His} poor scrotum is agonizingly overfilled and taut. ${He} must be in constant pain. `;
					} else if (scrotalFullness === -1) {
						r += `${His} poor scrotum is so overfilled, every little vein is visible. ${He} must be in constant discomfort. `;
					} else if (scrotalFullness === 0) {
						r += `${His} comfortable scrotum allows them to hang massively ${hasBothLegs(child) ? `between ${his} legs` : `from ${his} legless torso`}. `;
					} else {
						r += `Their weight and size has stretched ${his} scrotum downward, so that they dangle ${hasBothLegs(child) ? `to ${his} knees` : `quite the distance from ${his} legless torso`}. `;
					}
				} else if (child.balls > 5) {
					if (scrotalFullness < -1) {
						r += `${His} poor scrotum is so overfilled, every little vein is visible. ${He} must be in agony. `;
					} else if (scrotalFullness === -1) {
						r += `They're held against ${his} base by a tight scrotum that permits them little movement. `;
					} else if (scrotalFullness === 0) {
						r += `${His} comfortable scrotum allows them to hang massively ${hasBothLegs(child) ? `between ${his} legs` : `from ${his} legless torso`}. `;
					} else {
						r += `Their weight has stretched ${his} scrotum downward, so that they dangle ${hasBothLegs(child) ? `halfway to ${his} knees` : `some distance from ${his} legless torso`}. `;
					}
				} else if (child.balls > 3) {
					if (scrotalFullness < -1) {
						r += `They're too big for ${his} tiny scrotum, which is stretched tight over each ball. `;
					} else if (scrotalFullness === -1) {
						r += `They're held against ${his} base by a tight scrotum that permits them little movement. `;
					} else if (scrotalFullness === 0) {
						r += `${His} soft scrotum allows them to rest comfortably ${hasBothLegs(child) ? `between ${his} legs` : `beneath ${his} legless torso`}. `;
					} else {
						r += `${He} has a loose, dangling scrotum that allows them to swing ${hasBothLegs(child) ? `between ${his} legs` : `from ${his} legless torso`}. `;
					}
				} else if (child.balls > 1) {
					if (scrotalFullness === -1) {
						r += `They're held tightly by a very minimal scrotum that turns them into a soft little bump. `;
					} else if (scrotalFullness === 0) {
						r += `${His} comfortable little scrotum allows them to rest softly. `;
					} else {
						r += `They're almost lost in ${his} big soft scrotum, wrinkled for lack of anything to fill it properly. `;
					}
				} else {
					if (scrotalFullness === 0) {
						r += `${He} has a soft little trace of scrotum. `;
					} else {
						r += `They've left ${his} scrotum soft and empty. `;
					}
				}
			}

			if (child.physicalAge <= 3) {
				if (child.balls >= 25) {
					if (canWalk(child)) {
						r += `${His} balls are so massive that it is difficult for ${him} to move. `;
						if (child.muscles > 95) {
							r += `However, ${he} is so powerfully built that ${he} can manage it with effort, using ${his} arms to support them. `;
						} else if (child.muscles > 30) {
							r += `${He} can barely manage to get to ${his} feet unaided, and usually walks carrying ${his} testicles in any way ${he} can. `;
						} else if (child.muscles > 5) {
							r += `${He} requires assistance to get to ${his} feet, and tries to rest ${his} huge balls on the ground whenever ${he} can. `;
						} else {
							r += `${He} cannot get to ${his} feet unaided, and prefers to remain seated so ${his} enormous balls don't weigh ${him} down as much. `;
						}
					} else if (child.balls >= 100) {
						r += `${His} testicles each dwarf ${him}, making ${him} almost entirely testicle. `;
					} else {
						r += `${His} testicles each dwarf ${his} torso, making ${him} almost entirely testicle. `;
					}

					if (child.balls > 90) {
						if (V.ballsAccessibility) {
							r += `Fortunately for ${him}, the penthouse is adapted for daily life with balls `;
						} else {
							r += `${He} has trouble living in your penthouse, which is not designed for ${girl}s with testicles `;
						}
						r += `wider than a standard doorway. `;
					}
				}
			} else if (child.physicalAge <= 12) {
				if (child.balls >= 25) {
					if (canWalk(child)) {
						r += `${His} balls are so massive that it is difficult for ${him} to move. `;
						if (child.muscles > 95) {
							r += `However, ${he} is so powerfully built that ${he} can manage it with effort, using ${his} arms to support them. `;
						} else if (child.muscles > 30) {
							r += `${He} can barely manage to get to ${his} feet unaided, and usually walks carrying ${his} testicles in any way ${he} can. `;
						} else if (child.muscles > 5) {
							r += `${He} requires assistance to get to ${his} feet, and tries to rest ${his} huge balls on the ground whenever ${he} can. `;
						} else {
							r += `${He} cannot get to ${his} feet unaided, and prefers to remain seated so ${his} enormous balls don't weigh ${him} down as much. `;
						}
					} else if (child.balls >= 100) {
						r += `${His} testicles are each nearly the same size as ${him}, making ${him} about mostly testicle. `;
					} else {
						r += `${His} testicles are each nearly the same size as ${his} torso, making ${him} about mostly testicle. `;
					}

					if (child.balls > 90) {
						if (V.ballsAccessibility) {
							r += `Fortunately for ${him}, the penthouse is adapted for daily life with balls `;
						} else {
							r += `${He} has trouble living in your penthouse, which is not designed for ${girl}s with testicles `;
						}
						r += `wider than a standard doorway. `;
					}
				}
			} else {
				if (child.balls >= 25) {
					if (canWalk(child)) {
						r += `${His} balls are so massive that it is difficult for ${him} to move. `;
						if (child.muscles > 95) {
							r += `However, ${he} is so powerfully built that ${he} can manage it with effort, using ${his} arms to support them. `;
						} else if (child.muscles > 30) {
							r += `${He} can barely manage to get to ${his} feet unaided, and usually walks carrying ${his} testicles in any way ${he} can. `;
						} else if (child.muscles > 5) {
							r += `${He} requires assistance to get to ${his} feet, and tries to rest ${his} huge balls on the ground whenever ${he} can. `;
						} else {
							r += `${He} cannot get to ${his} feet unaided, and prefers to remain seated so ${his} enormous balls don't weigh ${him} down as much. `;
						}
					} else if (child.balls >= 100) {
						r += `Together, ${his} testicles are nearly the same size as ${him}, making ${him} about half testicle. `;
					} else {
						r += `Together, ${his} testicles are nearly the same size as ${his} torso, making ${him} about half testicle. `;
					}

					if (child.balls > 90) {
						if (V.ballsAccessibility) {
							r += `Fortunately for ${him}, the penthouse is adapted for daily life with balls `;
						} else {
							r += `${He} has trouble living in your penthouse, which is not designed for ${girl}s with testicles `;
						}
						r += `wider than a standard doorway. `;
					}
				}
			}

			if (child.prostate > 2) {
				r += `The area above ${his} crotch has a slight swell to it from ${his} prostate implant. A constant dribble of precum streams from the hole; ${his} artificially hyperactive prostate keeps ${him} that way. `;
			} else if (child.prostate > 1) {
				r += `${He}'s got a string of precum dangling from the hole; ${his} artificially hyperactive prostate keeps ${him} that way. `;
			}

			if (child.aphrodisiacs > 0 || child.inflationType === "aphrodisiac") {
				r += `The aphrodisiacs have ${him} so horny that there's a ${child.prostate > 1 ? `constant flow of precum leaking from` : `little precum beading at`} the hole. `;
			} else if (child.energy > 95) {
				r += `As a nympho, ${he}'s almost always got a ${child.prostate > 1 ? `constant flow of precum leaking from` : `little precum forming at`} the hole. `;
			} else if (child.fetishKnown) {
				if (child.fetishStrength > 60) {
					switch (child.fetish) {
						case "buttslut":
							r += `Judging by the ${child.prostate > 1 ? `constant flow of precum leaking from` : `little precum forming at`} the hole, ${he}'s probably fantasizing about being buttfucked. `;
							break;
						case "cumslut":
							r += `Judging by the ${child.prostate > 1 ? `constant flow of precum leaking from` : `little precum forming at`} the hole, ${he}'s probably fantasizing about being facefucked. `;
							break;
						case "humiliation":
							r += `Judging by the ${child.prostate > 1 ? `constant flow of precum leaking from` : `little precum forming at`} the hole, ${he}'s probably fantasizing about being humiliated. `;
							break;
						case "submissive":
							r += `Judging by the ${child.prostate > 1 ? `constant flow of precum leaking from` : `little precum forming at`} the hole, ${he}'s probably fantasizing about submission. `;
							break;
						case "dom":
							r += `Judging by the ${child.prostate > 1 ? `constant flow of precum leaking from` : `little precum forming at`} the hole, ${he}'s probably fantasizing about dominating someone. `;
							break;
						case "masochist":
							r += `Judging by the ${child.prostate > 1 ? `constant flow of precum leaking from` : `little precum forming at`} the hole, ${he}'s probably fantasizing about pain. `;
							break;
						case "sadist":
							r += `Judging by the ${child.prostate > 1 ? `constant flow of precum leaking from` : `little precum forming at`} the hole, ${he}'s probably fantasizing about hurting someone. `;
							break;
						case "pregnancy":
							r += `Judging by the ${child.prostate > 1 ? `constant flow of precum leaking from` : `little precum forming at`} the hole, ${he}'s probably fantasizing about getting someone pregnant. `;
							break;
						case "boobs":
							r += `Judging by the ${child.prostate > 1 ? `constant flow of precum leaking from` : `little precum forming at`} the hole, ${he}'s probably fantasizing about boobs. `;
							break;
					}
				}
			}

			if (child.prostate > 2) {
				r += `This hole is normally almost invisible, making it absolutely shocking when ${he} orgasms and shoots a massive cumshot out of it. `;
			} else if (child.balls !== 0) {
				r += `This hole is normally almost invisible, making it quite surprising when ${he} orgasms and shoots cum out of it. `;
			} else if (child.prostate !== 0) {
				r += `This hole is normally almost invisible, though it does leak some watery ejaculate when ${he} orgasms. `;
			}

			if (child.balls >= 50) {
				r += `${His} testicles are so big and sensitive that ${he} can barely move without stopping to let shivers run down ${his} body. It takes a great deal of control to not release their contents in huge spurts down ${his} balls. `;
			} else if (child.balls >= 37) {
				r += `${His} perpetual stream of semen-laced precum running down ${his} balls leaves a mess on the floor wherever ${he} goes. `;
			} else if (child.balls >= 25) {
				r += `Parts of the constant dribble coming out of the hole are now white, a testament to just how much cum ${his} massive balls produce and how desperate they are for release. `;
			} else if (child.balls >= 10) {
				r += `${He} produces so much cum that ${his} dick uncontrollably dribbles precum wherever ${he} goes, leaving a trail of drops behind ${him}. `;
			}

			if (child.prostate > 2) {
				r += `${His} ejaculate has a distinct clearness to it from the sheer amount of prostate fluid produced by ${his} overstimulated prostate. `;
			}

			if (child.balls > 0 && child.vasectomy) {
				r += `${He} shoots blanks thanks to ${his} vasectomy. `;
			} else if (child.balls > 0 && child.ballType === "sterile") {
				r += `${He} no longer produces sperm, so ${his} cum lacks potency. `;
			}
		} else if (child.balls > 0) {
			if (child.scrotum !== 0) {
				r += `${He} has no penis, just a tiny hole above `;

				switch (child.balls) {
					case 6:
						r += `a gigantic, clearly unnatural pair of testicles${V.showDickCMs ? `, about ${ballsToEitherUnit(child.balls)} long` : ``}. `;
						break;
					case 5:
						r += `a huge pair of testicles${V.showDickCMs ? `, about ${ballsToEitherUnit(child.balls)} long` : ``}. `;
						break;
					case 4:
						r += `a big pair of testicles${V.showDickCMs ? `, about ${ballsToEitherUnit(child.balls)} long` : ``}. `;
						break;
					case 3:
						r += `an average pair of testicles${V.showDickCMs ? `, about ${ballsToEitherUnit(child.balls)} long` : ``}. `;
						break;
					case 2:
						r += `a small pair of testicles${V.showDickCMs ? `, about ${ballsToEitherUnit(child.balls)} long` : ``}. `;
						break;
					case 1:
						r += `a soft little trace of scrotum, since ${his} testicles are so small they have retreated up into ${his} abdomen. `;
						break;
					case 0:
						r += `smooth ${child.skin} skin. `;
						break;
					default:
						r += `a hypertrophied, clearly unnatural pair of testicles${V.showDickCMs ? `, about ${ballsToEitherUnit(child.balls)} long` : ``}, a true masterpiece of modern growth hormone treatment. `;
						break;
				}

				if (child.balls > 0 && child.scrotum > 0) {
					if (child.balls > 90) {
						if (scrotalFullness < -1) {
							r += `${His} poor scrotum is agonizingly overfilled and looks ready to burst. ${He} must be in constant pain. `;
						} else if (scrotalFullness === -1) {
							r += `${His} poor scrotum is so overfilled, every little vein is visible. ${He} must be in constant discomfort. `;
						} else if (scrotalFullness === 0) {
							r += `${His} comfortable scrotum allows them to hang massively ${hasBothLegs(child) ? `between ${his} legs` : `from ${his} legless torso`}. `;
						} else {
							r += `Their weight and size has stretched ${his} scrotum downward, so that they ${hasBothLegs(child) ? `drag along the floor` : `hang far from ${his} legless torso`}. `;
						}
					} else if (child.balls >= 20) {
						if (scrotalFullness < -1) {
							r += `${His} poor scrotum is agonizingly overfilled and taut. ${He} must be in constant pain. `;
						} else if (scrotalFullness === -1) {
							r += `${His} poor scrotum is so overfilled, every little vein is visible. ${He} must be in constant discomfort. `;
						} else if (scrotalFullness === 0) {
							r += `${His} comfortable scrotum allows them to hang massively ${hasBothLegs(child) ? `between ${his} legs` : `from ${his} legless torso`}. `;
						} else {
							r += `Their weight and size has stretched ${his} scrotum downward, so that they dangle ${hasBothLegs(child) ? `to ${his} knees` : `quite the distance from ${his} legless torso`}. `;
						}
					} else if (child.balls > 5) {
						if (scrotalFullness < -1) {
							r += `${His} poor scrotum is so overfilled, every little vein is visible. ${He} must be in agony. `;
						} else if (scrotalFullness === -1) {
							r += `They're held against ${his} base by a tight scrotum that permits them little movement. `;
						} else if (scrotalFullness === 0) {
							r += `${His} comfortable scrotum allows them to hang massively ${hasBothLegs(child) ? `between ${his} legs` : `from ${his} legless torso`}. `;
						} else {
							r += `Their weight has stretched ${his} scrotum downward, so that they dangle ${hasBothLegs(child) ? `halfway to ${his} knees` : `some distance from ${his} legless torso`}. `;
						}
					} else if (child.balls > 3) {
						if (scrotalFullness < -1) {
							r += `They're too big for ${his} tiny scrotum, which is stretched tight over each ball. `;
						} else if (scrotalFullness === -1) {
							r += `They're held against ${his} base by a tight scrotum that permits them little movement. `;
						} else if (scrotalFullness === 0) {
							r += `${His} soft scrotum allows them to rest comfortably ${hasBothLegs(child) ? `between ${his} legs` : `beneath ${his} legless torso`}. `;
						} else {
							r += `${He} has a loose, dangling scrotum that allows them to swing ${hasBothLegs(child) ? `between ${his} legs` : `from ${his} legless torso`}. `;
						}
					} else if (child.balls > 1) {
						if (scrotalFullness === -1) {
							r += `They're held tightly by a very minimal scrotum that turns them into a soft little bump. `;
						} else if (scrotalFullness === 0) {
							r += `${His} comfortable little scrotum allows them to rest softly. `;
						} else {
							r += `They're almost lost in ${his} big soft scrotum, wrinkled for lack of anything to fill it properly. `;
						}
					} else {
						if (scrotalFullness === 0) {
							r += `${He} has a soft little trace of scrotum. `;
						} else {
							r += `They've left ${his} scrotum soft and empty. `;
						}
					}
				}

				if (child.physicalAge <= 3) {
					if (child.balls >= 25) {
						if (canWalk(child)) {
							r += `${His} balls are so massive that it is difficult for ${him} to move. `;
							if (child.muscles > 95) {
								r += `However, ${he} is so powerfully built that ${he} can manage it with effort, using ${his} arms to support them. `;
							} else if (child.muscles > 30) {
								r += `${He} can barely manage to get to ${his} feet unaided, and usually walks carrying ${his} testicles in any way ${he} can. `;
							} else if (child.muscles > 5) {
								r += `${He} requires assistance to get to ${his} feet, and tries to rest ${his} huge balls on the ground whenever ${he} can. `;
							} else {
								r += `${He} cannot get to ${his} feet unaided, and prefers to remain seated so ${his} enormous balls don't weigh ${him} down as much. `;
							}
						} else if (child.balls >= 100) {
							r += `${His} testicles each dwarf ${him}, making ${him} almost entirely testicle. `;
						} else {
							r += `${His} testicles each dwarf ${his} torso, making ${him} almost entirely testicle. `;
						}

						if (child.balls > 90) {
							if (V.ballsAccessibility) {
								r += `Fortunately for ${him}, the penthouse is adapted for daily life with balls `;
							} else {
								r += `${He} has trouble living in your penthouse, which is not designed for ${girl}s with testicles `;
							}
							r += `wider than a standard doorway. `;
						}
					}
				} else if (child.physicalAge <= 12) {
					if (child.balls >= 25) {
						if (canWalk(child)) {
							r += `${His} balls are so massive that it is difficult for ${him} to move. `;
							if (child.muscles > 95) {
								r += `However, ${he} is so powerfully built that ${he} can manage it with effort, using ${his} arms to support them. `;
							} else if (child.muscles > 30) {
								r += `${He} can barely manage to get to ${his} feet unaided, and usually walks carrying ${his} testicles in any way ${he} can. `;
							} else if (child.muscles > 5) {
								r += `${He} requires assistance to get to ${his} feet, and tries to rest ${his} huge balls on the ground whenever ${he} can. `;
							} else {
								r += `${He} cannot get to ${his} feet unaided, and prefers to remain seated so ${his} enormous balls don't weigh ${him} down as much. `;
							}
						} else if (child.balls >= 100) {
							r += `${His} testicles are each nearly the same size as ${him}, making ${him} about mostly testicle. `;
						} else {
							r += `${His} testicles are each nearly the same size as ${his} torso, making ${him} about mostly testicle. `;
						}

						if (child.balls > 90) {
							if (V.ballsAccessibility) {
								r += `Fortunately for ${him}, the penthouse is adapted for daily life with balls `;
							} else {
								r += `${He} has trouble living in your penthouse, which is not designed for ${girl}s with testicles `;
							}
							r += `wider than a standard doorway. `;
						}
					}
				} else {
					if (child.balls >= 25) {
						if (canWalk(child)) {
							r += `${His} balls are so massive that it is difficult for ${him} to move. `;
							if (child.muscles > 95) {
								r += `However, ${he} is so powerfully built that ${he} can manage it with effort, using ${his} arms to support them. `;
							} else if (child.muscles > 30) {
								r += `${He} can barely manage to get to ${his} feet unaided, and usually walks carrying ${his} testicles in any way ${he} can. `;
							} else if (child.muscles > 5) {
								r += `${He} requires assistance to get to ${his} feet, and tries to rest ${his} huge balls on the ground whenever ${he} can. `;
							} else {
								r += `${He} cannot get to ${his} feet unaided, and prefers to remain seated so ${his} enormous balls don't weigh ${him} down as much. `;
							}
						} else if (child.balls >= 100) {
							r += `Together, ${his} testicles are nearly the same size as ${him}, making ${him} about half testicle. `;
						} else {
							r += `Together, ${his} testicles are nearly the same size as ${his} torso, making ${him} about half testicle. `;
						}

						if (child.balls > 90) {
							if (V.ballsAccessibility) {
								r += `Fortunately for ${him}, the penthouse is adapted for daily life with balls `;
							} else {
								r += `${He} has trouble living in your penthouse, which is not designed for ${girl}s with testicles `;
							}
							r += `wider than a standard doorway. `;
						}
					}
				}

				if (child.prostate > 2) {
					r += `The area above ${his} crotch has a slight swell to it from ${his} prostate implant. A constant dribble of precum streams from the hole and down ${his} testicles; ${his} artificially hyperactive prostate keeps ${him} that way. `;
				} else if (child.prostate > 1) {
					r += `${He}'s got a string of precum dangling from the hole and down ${his} testicles; ${his} artificially hyperactive prostate keeps ${him} that way. `;
				}

				if (child.aphrodisiacs > 0 || child.inflationType === "aphrodisiac") {
					r += `The aphrodisiacs have ${him} so horny that there's a ${child.prostate > 1 ? `constant flow of precum leaking from` : `little precum beading at`} the hole. `;
				} else if (child.energy > 95) {
					r += `As a nympho, ${he}'s almost always got a ${child.prostate > 1 ? `constant flow of precum leaking from` : `little precum forming at`} the hole. `;
				} else if (child.fetishKnown) {
					if (child.fetishStrength > 60) {
						switch (child.fetish) {
							case "buttslut":
								r += `Judging by the ${child.prostate > 1 ? `constant flow of precum leaking from` : `little precum forming at`} the hole, ${he}'s probably fantasizing about being buttfucked. `;
								break;
							case "cumslut":
								r += `Judging by the ${child.prostate > 1 ? `constant flow of precum leaking from` : `little precum forming at`} the hole, ${he}'s probably fantasizing about being facefucked. `;
								break;
							case "humiliation":
								r += `Judging by the ${child.prostate > 1 ? `constant flow of precum leaking from` : `little precum forming at`} the hole, ${he}'s probably fantasizing about being humiliated. `;
								break;
							case "submissive":
								r += `Judging by the ${child.prostate > 1 ? `constant flow of precum leaking from` : `little precum forming at`} the hole, ${he}'s probably fantasizing about submission. `;
								break;
							case "dom":
								r += `Judging by the ${child.prostate > 1 ? `constant flow of precum leaking from` : `little precum forming at`} the hole, ${he}'s probably fantasizing about dominating someone. `;
								break;
							case "masochist":
								r += `Judging by the ${child.prostate > 1 ? `constant flow of precum leaking from` : `little precum forming at`} the hole, ${he}'s probably fantasizing about pain. `;
								break;
							case "sadist":
								r += `Judging by the ${child.prostate > 1 ? `constant flow of precum leaking from` : `little precum forming at`} the hole, ${he}'s probably fantasizing about hurting someone. `;
								break;
							case "pregnancy":
								r += `Judging by the ${child.prostate > 1 ? `constant flow of precum leaking from` : `little precum forming at`} the hole, ${he}'s probably fantasizing about getting someone pregnant. `;
								break;
							case "boobs":
								r += `Judging by the ${child.prostate > 1 ? `constant flow of precum leaking from` : `little precum forming at`} the hole, ${he}'s probably fantasizing about boobs. `;
								break;
						}
					}
				}

				if (child.prostate > 2) {
					r += `This hole is normally almost invisible, making it absolutely shocking when ${he} orgasms and shoots a massive cumshot out of it. `;
				} else if (child.balls !== 0) {
					r += `This hole is normally almost invisible, making it quite surprising when ${he} orgasms and shoots cum out of it. `;
				} else if (child.prostate !== 0) {
					r += `This hole is normally almost invisible, though it does leak some watery ejaculate when ${he} orgasms. `;
				}

				if (child.balls >= 50) {
					r += `${His} testicles are so big and sensitive that ${he} can barely move without stopping to let shivers run down ${his} body. It takes a great deal of control to not release their contents in huge spurts down ${his} balls. `;
				} else if (child.balls >= 37) {
					r += `${His} perpetual stream of semen-laced precum running down ${his} balls leaves a mess on the floor wherever ${he} goes. `;
				} else if (child.balls >= 25) {
					r += `Parts of the constant dribble coming out of the hole are now white, a testament to just how much cum ${his} massive balls produce and how desperate they are for release. `;
				} else if (child.balls >= 10) {
					r += `${He} produces so much cum that ${his} dick uncontrollably dribbles precum wherever ${he} goes, leaving a trail of drops behind ${him}. `;
				}

				if (child.prostate > 2) {
					r += `${His} ejaculate has a distinct clearness to it from the sheer amount of prostate fluid produced by ${his} overstimulated prostate. `;
				}
			} else {
				if (child.prostate > 2) {
					r += `The area above ${his} crotch has a slight swell to it from ${his} prostate implant. `;
				}
			}
		}

		if (!child.prostate) {
			if (child.dick > 0 || child.balls > 0) {
				if (child.genes === "XY") {
					r += `Though it's not externally apparent, ${his} prostate has been removed, `;
				} else {
					r += `${He} is lacking a prostate, `;
				}
				r += `giving ${his} ejaculations less body${child.anus !== 0 ? ` and reducing the stimulation ${he} feels during anal sex` : ``}. `;
			}
		}

		if (V.showBodyMods) {
			r += tats.dick(child);
			r += piercings.dick(child);
		}
		r += App.Desc.brand(child, "penis");
		r += App.Desc.brand(child, "testicle");

		return r;
	}

	function ears(child) {
		let r = ``;

		switch (child.earShape) {
			case "none":
				if (child.earImplant) {
					if (child.earT !== "none" && child.race === "catgirl") {
						r += `${He} has smooth fur where a normal human's ears would be, as ${he} instead hears out of ${his} twitchy, sensitive cat ears.`;
					} else if (child.earT !== "none" && child.race !== "catgirl") {
						r += `${He} has smooth skin where ${his} ears should be as ${his} hearing has been cybernetically rerouted to ${his} secondary ears. `;
					} else {
						r += `${He} has nothing but small, perforated metal disks where ${his} ears should be. `;
					}
				} else if (child.earwear === "none") {
					r += `${He} has small unsightly holes on the sides of ${his} head. `;
				} else {
					r += `The sides of ${his} head are smooth where ${his} ears should be, but upon closer inspection it is revealed that `;
					if (child.earwear === "hearing aids") {
						r += `${his} ear canals are fitted with hearing aids capped with a skin-matching sheet to obscure the hole. `;
					} else {
						r += `${his} ear canals are filled with plugs with skin-matching caps. `;
					}
				}
				break;
			case "damaged":
				r += `${His} outer ears have been severely damaged. `;
				break;
			case "normal":
				r += `${He} has perfectly ordinary ears. `;
				break;
			case "robot":
				r += `${He} has high tech cyber-ears that could be mistaken for headphones. `;
				break;
			case "pointy":
				r += `${His} small, ${either("elfin", "leaf-shaped", "pointed")} ears are quite cute and give ${him} an exotic appearance. `;
				break;
			case "elven":
				r += `${He} has long, thin elven ears that ${jsEither(`tend to droop when ${he} is relaxed or sad`, `tend to waggle up and down when ${he} is excited`, `twitch at the slightest touch`)}. `;
				break;
			case "ushi":
				r += `${He} has long, floppy cow ears. `;
				break;
		}

		switch (child.earT) {
			case "neko":
				r += `${He} has cute, ${child.earTColor} cat ears on ${his} head; they `;
				if (child.earImplant) {
					r += `perk up at `;
					if (child.devotion > 20) {
						r += `the sound of your voice and `;
					} else {
						r += `sudden noises and `;
					}
					r += `${jsEither(`tend to droop when ${he} is relaxed or sad`, `twitch at the slightest touch`)}. `;
				}
				break;
			case "inu":
				r += `${He} has cute, ${child.earTColor} dog ears on ${his} head; they `;
				if (child.earImplant) {
					r += `perk up at `;
					if (child.devotion > 20) {
						r += `the sound of your voice and `;
					} else {
						r += `sudden noises and `;
					}
					r += `${jsEither(`tend to droop when ${he} is relaxed or sad`, `twitch at the slightest touch`)}. `;
				}
				break;
			case "kit":
				r += `${He} has elegant, ${child.earTColor} fox ears on ${his} head; they `;
				if (child.earImplant) {
					r += `perk up at `;
					if (child.devotion > 20) {
						r += `the sound of your voice and `;
					} else {
						r += `sudden noises and `;
					}
					r += `${jsEither(`tend to droop when ${he} is relaxed or sad`, `twitch at the slightest touch`)}. `;
				}
				break;
			case "tanuki":
				r += `${He} has adorable, ${child.earTColor}, round tanuki ears on ${his} head; they `;
				if (child.earImplant) {
					r += `perk up at `;
					if (child.devotion > 20) {
						r += `the sound of your voice and `;
					} else {
						r += `sudden noises and `;
					}
					r += `${jsEither(`tend to droop when ${he} is relaxed or sad`, `twitch at the slightest touch`)}. `;
				}
				break;
			case "usagi":
				r += `${He} has long, ${child.earTColor}, fluffy rabbit ears on ${his} head; they `;
				if (child.earImplant) {
					r += `perk up at `;
					if (child.devotion > 20) {
						r += `the sound of your voice and `;
					} else {
						r += `sudden noises and `;
					}
					r += `${jsEither(`tend to droop when ${he} is relaxed or sad`, `twitch at the slightest touch`)}. `;
				}
				break;
			case "normal":
				r += `${He} has ${child.earShape !== "none" ? `a second set` : `a pair`} of non-functioning ears grafted to the top of ${his} head. `;
				break;
		}

		if (child.hears < 0) {
			if (child.hears === -1) {
				r += `${His} hearing is noticeably impaired, `;
			} else if (child.hears < -1) {
				r += `${He} is completely deaf, `;
			}

			if (child.hears < -1 && child.earShape === "none") {
				r += `which is fitting due to ${his} lack of ears. `;
			} else {
				r += `but this isn't obvious just by looking at ${his} ears. `;
			}
		}

		return r;
	}

	function face(child) {
		let r = ``;

		r += `${His} <span class="pink">face is `;
		switch (child.faceShape) {
			case "masculine":
				if (child.face < -95) {
					r += `so ugly and masculine that ${his} designation as a slave girl is a mockery. `;
				} else if (child.face < -40) {
					r += `ugly and masculine, making ${him} a poor slave girl by appearance. `;
				} else if (child.face < -10) {
					r += `unattractively masculine. `;
				} else if (child.face <= 10) {
					r += `masculine, but not entirely unappealing. `;
				} else if (child.face <= 40) {
					r += `attractively masculine. `;
				} else if (child.face <= 95) {
					r += `quite handsome in a masculine way. `;
				} else {
					r += `the height of masculine handsomeness. `;
				}
				break;
			case "androgynous":
				if (child.face < -95) {
					r += `disturbingly androgynous and terribly ugly. `;
				} else if (child.face < -40) {
					r += `ugly and androgynous; ${he} has neither masculine nor feminine appeal. `;
				} else if (child.face < -10) {
					r += `strangely androgynous, and rather unattractive. `;
				} else if (child.face <= 10) {
					r += `strangely androgynous. `;
				} else if (child.face <= 40) {
					r += `androgynous, and attractive enough that this ambiguity is interesting. `;
				} else if (child.face <= 95) {
					r += `gorgeously androgynous in a complex way that captures the eye. `;
				} else {
					r += `so gorgeously androgynous that ${he} tends to induce sexual confusion. `;
				}
				break;
			case "cute":
				if (child.face < -95) {
					r += `very ugly, yet somehow cute; ${he}'s so unattractive that ${he} inspires pity. `;
				} else if (child.face < -40) {
					r += `ugly, but cute, with a pitiable appeal. `;
				} else if (child.face < -10) {
					r += `not attractive, but is appealingly cute. `;
				} else if (child.face <= 10) {
					r += `merely average, but is appealingly cute. `;
				} else if (child.face <= 40) {
					r += `both attractive and appealingly cute. `;
				} else if (child.face <= 95) {
					r += `beautiful, yet somehow also approachably cute. `;
				} else {
					r += `an impossibly perfect combination of beauty and girl-next-door cuteness. `;
				}
				break;
			case "sensual":
				if (child.face < -95) {
					r += `very ugly, yet naturally slutty, promising a decent fuck despite its appearance. `;
				} else if (child.face < -40) {
					r += `ugly, but also slutty, promising a good fuck despite its appearance. `;
				} else if (child.face < -10) {
					r += `not attractive, but it has a certain sensual appeal. `;
				} else if (child.face <= 10) {
					r += `merely average, but undeniably sensual. `;
				} else if (child.face <= 40) {
					r += `both attractive and naturally sultry. `;
				} else if (child.face <= 95) {
					r += `both beautiful and sultry, bringing sex to mind naturally. `;
				} else {
					r += `very beautiful in a consummately sexual way. `;
				}
				break;
			case "exotic":
				if (child.face < -95) {
					r += `very ugly and unusual, a real tragedy in flesh. `;
				} else if (child.face < -40) {
					r += `ugly and unusual, a real misfortune. `;
				} else if (child.face < -10) {
					r += `unattractive, and distinctive in its unattractiveness. `;
				} else if (child.face <= 10) {
					r += `quite average, but not uninteresting. `;
				} else if (child.face <= 40) {
					r += `attractive in an exotic and interesting way. `;
				} else if (child.face <= 95) {
					r += `exotic and beautiful, capable of catching the eye and keeping its gaze. `;
				} else {
					r += `very beautiful and exotic, almost to the point of alien fascination. `;
				}
				break;
			default:
				if (child.face < -95) {
					r += `very ugly. `;
				} else if (child.face < -40) {
					r += `quite ugly. `;
				} else if (child.face < -10) {
					r += `unattractive. `;
				} else if (child.face <= 10) {
					r += `average and conventionally feminine. `;
				} else if (child.face <= 40) {
					r += `conventionally attractive. `;
				} else if (child.face <= 95) {
					r += `conventionally beautiful. `;
				} else {
					r += `the height of conventional feminine beauty. `;
				}
				break;
		}
		r += `</span> `;

		if (child.weight > 190) {
			r += `${His} face is quite fat with ample excess chins. `;
		} else if (child.weight > 160) {
			r += `${His} face is round and plump with a trio of extra chins. `;
		} else if (child.weight > 130) {
			r += `${His} face is chubby with an obvious second chin. `;
		} else if (child.weight > 97) {
			r += `${His} face is soft with barely a second chin. `;
		}

		if (child.markings === "beauty mark") {
			if (child.face < -95) {
				r += `It bears a severely disfiguring, discolored mark. `;
			} else if (child.face < -40) {
				r += `It bears a couple of unsightly moles. `;
			} else if (child.face < -10) {
				r += `It bears an ugly mole. `;
			} else if (child.face <= 10) {
				r += `${He} has a distinctive beauty mark. `;
			} else if (child.face <= 40) {
				r += `${He} has a nice beauty mark. `;
			} else if (child.face <= 95) {
				r += `${He} has a beauty mark that adds to ${his} distinctiveness. `;
			} else {
				r += `${He} has a beauty mark that makes ${him} really memorable. `;
			}
		}

		if (child.faceImplant > 5) {
			r += `${He}'s `;
			if (child.faceImplant > 95) {
				r += `had so much cosmetic surgery that ${his} face is located at the bottom of the uncanny valley ${child.face < -10 ? `in addition to its ugliness` : child.face <= 10 ? `the only thing really distinctive about it` : `its attractiveness notwithstanding`}. `;
			} else if (child.faceImplant > 60) {
				r += `obviously gotten a lot of facial cosmetic surgery. `;
			} else if (child.faceImplant > 30) {
				r += `noticeably received facial cosmetic surgery. `;
			} else {
				if (PC.skill.medicine >= 100) {
					r += `Someone without your knowledge might miss it entirely. `;
				}
			}

			if (FutureSocieties.isActive('FSBodyPurist', arcology)) {
				if (child.faceImplant > 30) {
					r += `had some facial cosmetic surgery, though it's subtle. `;
				} else {
					r += `This is considered extremely tragic by a society that values bodily purity. `;
				}
			} else if (FutureSocieties.isActive('FSTransformationFetishist', arcology)) {
				if (child.faceImplant > 30) {
					r += `Since society values bodily purity, even this subtlety affects ${his} attractiveness when it's noticed. `;
				} else {
					r += `Your transformationist society doesn't think this ${child.face < -10 ? `makes ${him} uglier` : `reduces ${his} attractiveness`}. `;
				}
			} else {
				if (child.faceImplant > 30) {
					r += `The effect is enough to reduce ${his} attractiveness. `;
				}
			}
		}

		if (child.smells === -1) {
			r += `${He} has no sense of smell, but this isn't immediately obvious just by looking at ${his} nose. `;
		}

		if (V.showBodyMods) {
			if (!child.fuckdoll) {
				r += makeup(child);
				r += tats.lips(child);
			}
		}

		return r;
	}

	function flowers(child) {
		let r = ``;

		if (child.dick > 0 && !child.balls) {
			r += `a white orchid, its black stamen stiffly erect. `;
		} else if (child.dick > 0) {
			r += `a morning glory, light around its edges with a puckered pink center. `;
		} else if (child.addict > 5) {
			r += `a large poppy, its pod glistening with black opiate juice. `;
		} else if (child.vagina === 0) {
			r += `a white lily, pure and unspoiled. `;
		} else if (child.pregType > 3 && child.pregKnown) {
			r += `a pink lotus, beautiful and fertile. `;
		} else if (child.energy > 95) {
			r += `a flamboyant tiger lily. `;
		} else if (child.actualAge < 15) {
			r += `an innocent little peony. `;
		} else if (child.boobs > 2000) {
			r += `a huge round sunflower. `;
		} else {
			r += `a nice red rose. `;
		}

		return r;
	}

	function footwear(child) {
		let r = ``;

		if (hasAnyLegs(child)) {
			switch (child.clothes) {
				case "a slave gown":
					switch (child.shoes) {
						case "flats":
							r += `a pair of fashionable slingback sandals. `;
							break;
						case "boots":
							r += `elegant worked leather boots. `;
							break;
						case "pumps":
							r += `kitten heels. `;
							break;
						case "heels":
							r += `sleek pumps. `;
							break;
						case "extreme heels":
							r += `daring spike heels so high ${his} butt is at dick height. `;
							break;
						default:
							r += `nothing on ${his} bare feet. `;
							break;
					}
					break;
				case "a ball gown":
					switch (child.shoes) {
						case "flats":
							r += `a delicate pair of dancing slippers. `;
							break;
						case "boots":
							r += `a dainty pair of heeled booties. `;
							break;
						case "pumps":
							r += `an ornate pair of stiletto heels. `;
							break;
						case "heels":
							r += `an ornate pair of stiletto pumps. `;
							break;
						case "extreme heels":
							r += `an ornate pair of stiletto heels so extreme ${he} has to concentrate just to stand. `;
							break;
						default:
							r += `ridiculously bare stockinged feet. `;
							break;
					}
					break;
				case "a mini dress":
					switch (child.shoes) {
						case "flats":
							r += `suede flats. `;
							break;
						case "boots":
							r += `suede thigh-high boots. `;
							break;
						case "pumps":
							r += `suede ankle strap heels. `;
							break;
						case "heels":
							r += `suede ankle strap pumps. `;
							break;
						case "extreme heels":
							r += `suede ankle strap heels so tall, ${he} has to walk with ${his} ass sticking out. `;
							break;
						default:
							r += `bare feet. `;
							break;
					}
					break;
				case "a tube top":
				case "an oversized t-shirt":
				case "a t-shirt":
				case "a sweater":
				case "a tank-top":
					switch (child.shoes) {
						case "flats":
							r += `a pair of comfortable shoes. `;
							break;
						case "boots":
							r += `a pair of heeled boots. `;
							break;
						case "pumps":
							r += `a pair of heels. `;
							break;
						case "heels":
							r += `a pair of pumps. `;
							break;
						case "extreme heels":
							r += `a pair of heels so extreme ${he}'s practically on tiptoe. `;
							break;
						default:
							r += `nothing on ${his} feet. `;
							break;
					}
					break;
				case "a schoolgirl outfit":
					switch (child.shoes) {
						case "flats":
							r += `girly tennis shoes with bright white laces. `;
							break;
						case "boots":
							r += `brown leather riding boots with buckled tops. `;
							break;
						case "pumps":
							r += `black heels with little plaid bows. `;
							break;
						case "heels":
							r += `black pumps with little plaid bows. `;
							break;
						case "extreme heels":
							r += `tall black pump heels with little plaid bows. `;
							break;
						default:
							r += `bare feet. `;
							break;
					}
					break;
				default:
					switch (child.shoes) {
						case "flats":
							r += `a pair of simple sandals which just call attention to ${his} otherwise nude state. `;
							break;
						case "boots":
							r += `a pair of sexy leather boots which just call attention to ${his} otherwise nude state. `;
							break;
						case "pumps":
							r += `a pair of sexy heels which just call attention to ${his} otherwise nude state. `;
							break;
						case "heels":
							r += `a pair of sexy pumps which just call attention to ${his} otherwise nude state. `;
							break;
						case "extreme heels":
							r += `a pair of daringly high heels which just call attention to ${his} otherwise nude state. `;
							break;
						default:
							r += `nothing on ${his} bare feet either, naturally. `;
							break;
					}
					break;
			}
		}

		return r;
	}

	function hair(child) {
		let r = `${His} `;
		let hLength;

		switch (child.hStyle) {
			case "bald":
				r += `hair no longer grows. If it did, it would be ${child.origHColor}. `;
				break;
			case "shaved":
				r += `hair has been shaved. If ${his} hair were visible, it would be ${child.hColor}. `;
				break;
			case "buzzcut":
				r += `${child.hColor} hair is in a short buzzcut. `;
				break;
			case "trimmed":
				r += `${child.hColor} hair is trimmed short. `;
				break;
			case "afro":
				r += `${child.hColor} hair is in a `;
				if (child.hLength > 100) {
					r += `gigantic puffed-up afro and looks ridiculous. `;
				} else if (child.hLength > 30) {
					r += `puffy afro. `;
				} else {
					r += `short afro. `;
				}
				break;
			case "cornrows":
				r += `${child.hColor} hair is formed tightly into cornrows in a decorative pattern on ${his} head, dangling `;
				if (child.hLength >= 150) {
					r += `down calf-length, `;
				} else if (child.hLength >= 100) {
					r += `down ass-length, `;
				} else if (child.hLength >= 30) {
					r += `down long, `;
				} else if (child.hLength >= 10) {
					r += `down shoulder-length, `;
				} else {
					r += `down, `;
				}
				r += `with colorful beads interspersed in them. `;
				break;
			case "bun":
				r += `${child.hColor} hair is `;
				if (child.hLength >= 100) {
					r += `packed tightly into a huge puffy `;
				} else if (child.hLength >= 30) {
					r += `packed into a large `;
				} else if (child.hLength >= 10) {
					r += `tied into a small `;
				} else {
					r += `tied into a `;
				}
				r += `bun. `;
				break;
			case "messy bun":
				r += `${child.hColor} hair is `;
				if (child.hLength >= 100) {
					r += `packed tightly into a huge messy `;
				} else if (child.hLength >= 30) {
					r += `packed into a large messy `;
				} else if (child.hLength >= 10) {
					r += `tied into a small messy `;
				} else {
					r += `tied into a messy `;
				}
				r += `bun. `;
				break;
			case "braided":
			case "curled":
			case "dreadlocks":
			case "luxurious":
			case "neat":
			case "permed":
			case "ponytail":
			case "strip":
			case "tails":
			case "up":
				hLength = child.hLength / child.height;
				if (child.hLength > 0.9) {
					r += `floor-length, `;
				} else if (hLength > 0.8) {
					r += `calf-length, `;
				} else if (hLength > 0.7) {
					r += `knee-length, `;
				} else if (hLength >= 0.6) {
					r += `thigh-length, `;
				} else if (hLength >= 0.4) {
					r += `ass-length, `;
				} else if (hLength >= 0.2) {
					r += `long, `;
				} else if (hLength >= 1.5) {
					r += `shoulder-length, `;
				} else {
					r += `short, `;
				}
				r += `${child.hColor} hair`;
				r += hairClothing(child);
				break;
			default:
				r += `${child.hColor} hair is ${child.hStyle}. `;
				break;
		}

		r += `${His} `;
		if (child.eyebrowHStyle === "bald") {
			r += `brows do not grow hair. ${His} eyebrows would be ${child.eyebrowHColor} in color if they did. `;
		} else if (child.eyebrowHStyle === "shaved") {
			r += `eyebrows have${child.hStyle === "shaved" ? ` also` : ``} been shaved off. If they were visible, they would be ${child.eyebrowHColor} in color. `;
		} else {
			r += `${child.eyebrowHColor} eyebrows `;

			switch (child.eyebrowHStyle) {
				case "slanted inwards":
					r += `slant inwards from the sides of ${his} forehead down to the center of ${his} head. `;
					break;
				case "slanted outwards":
					r += `slant outwards from the center of ${his} head down to the sides of ${his} forehead. `;
					break;
				case "rounded":
					r += `form perfect semicircles. `;
					break;
				case "natural":
					r += `naturally contour to the shape of ${his} brow. `;
					break;
				case "curved":
					r += `form small "S"-shaped curves above ${his} eyes. `;
					break;
				case "straight":
					r += `are near perfectly straight, instead of curving. `;
					break;
				case "high-arched":
					r += `form tall arches on ${his} forehead. `;
					break;
				case "elongated":
					r += `are elongated to cover far more of ${his} brow than what would be considered average. `;
					break;
				case "shortened":
					r += `are shortened to cover far less of ${his} brow than what would be considered average. `;
					break;
				default:
					r += `are styled to be ${child.eyebrowHStyle}. `;
					break;
			}

			r += `They're `;

			switch (child.eyebrowFullness) {
				case "pencil-thin":
					r += `incredibly and unnaturally light and thin. `;
					break;
				case "thin":
					r += `considerably thinner than what would be considered average. `;
					break;
				case "threaded":
					r += `styled to be thinner on the sides but otherwise normal. `;
					break;
				case "natural":
					r += `kept to a natural level of fullness. `;
					break;
				case "tapered":
					r += `styled to be thicker in the center but otherwise normal. `;
					break;
				case "thick":
					r += `considerably thicker than what would be considered average. `;
					break;
				case "bushy":
					r += `incredibly and unnaturally full and bushy. `;
					break;
				default:
					r += `${child.eyebrowFullness}. `;
					break;
			}
		}

		return r;
	}

	function hairClothing(child) {
		let r = ``;

		switch (child.hStyle) {
			case "neat":
				if (child.hLength > 100) {
					switch (child.clothes) {
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is kept out of ${his} face by a couple of black hairpins. `;
							break;
						case "a schoolgirl outfit":
							r += `is kept out of ${his} face by a pastel-colored headband. `;
							break;
						default:
							r += `cascades almost to the ground. `;
							break;
					}
				} else if (child.hLength > 30) {
					switch (child.clothes) {
						case "a slave gown":
						case "a ball gown":
							r += `flows fashionably down ${his} bare back. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is kept out of ${his} face by a couple of black hairpins. `;
							break;
						case "a schoolgirl outfit":
							r += `is kept out of ${his} face by a pastel-colored headband. `;
							break;
						default:
							r += `is brushed back over ${his} shoulders. `;
							break;
					}
				} else if (child.hLength > 10) {
					switch (child.clothes) {
						case "a slave gown":
						case "a ball gown":
							r += `follows the latest fashion. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is kept out of ${his} face by a couple of black hairpins. `;
							break;
						case "a schoolgirl outfit":
							r += `is kept out of ${his} face by a pastel-colored headband. `;
							break;
						default:
							r += `is brushed back. `;
							break;
					}
				} else {
					switch (child.clothes) {
						case "a slave gown":
							r += `is gelled into a fashionable wave. `;
							break;
						case "a ball gown":
							r += `is gelled into a fashionable wave. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is neatly brushed. `;
							break;
					}
				}
				break;
			case "up":
				if (child.hLength > 100) {
					switch (child.clothes) {
						case "a slave gown":
						case "a ball gown":
							r += `is piled up on ${his} head in a perfect 60's beehive. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is kept out of ${his} face by a couple of black hairpins. `;
							break;
						case "a schoolgirl outfit":
							r += `is in a huge bun secured by a pastel scrunchy. `;
							break;
						default:
							r += `is back in an enormous bun. `;
							break;
					}
				} else if (child.hLength > 30) {
					switch (child.clothes) {
						case "a slave gown":
						case "a ball gown":
							r += `is piled up on ${his} head in a perfect 60's beehive. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is kept out of ${his} face by a couple of black hairpins. `;
							break;
						case "a schoolgirl outfit":
							r += `is in a bun secured by a pastel scrunchy. `;
							break;
						default:
							r += `is back in a big bun. `;
							break;
					}
				} else if (child.hLength > 10) {
					switch (child.clothes) {
						case "a slave gown":
						case "a ball gown":
							r += `is piled up on ${his} head in a perfect 60's 'do. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is kept out of ${his} face by a couple of black hairpins. `;
							break;
						case "a schoolgirl outfit":
							r += `is in a tight little bun secured by a pastel scrunchy. `;
							break;
						default:
							r += `is back in a tight little bun. `;
							break;
					}
				} else {
					switch (child.clothes) {
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is combed back. `;
							break;
					}
				}
				break;
			case "tails":
				if (child.hLength > 100) {
					switch (child.clothes) {
						case "a schoolgirl outfit":
							r += `is back in huge tails secured by hair ties with plastic buttons, bearing the garish inscription `;
							r += App.Desc.inscrip(child);
							break;
						case "a slave gown":
						case "a ball gown":
							r += `is combed into beautiful long tails, one of which comes around to run down ${his} chest. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is in long tails and is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is in long tails and is kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is in twin tails that almost reach the ground. `;
							break;
					}
				} else if (child.hLength > 30) {
					switch (child.clothes) {
						case "a schoolgirl outfit":
							r += `is back in big tails secured by hair ties with plastic buttons, bearing the garish inscription `;
							r += App.Desc.inscrip(child);
							break;
						case "a slave gown":
						case "a ball gown":
							r += `is combed into beautiful tails, one of which comes around to fall between ${his} breasts. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is in long tails and is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is in long tails and is kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is in long twin tails. `;
							break;
					}
				} else if (child.hLength > 10) {
					switch (child.clothes) {
						case "a schoolgirl outfit":
							r += `is back in short tails secured by hair ties with plastic buttons, bearing the garish inscription `;
							r += App.Desc.inscrip(child);
							break;
						case "a slave gown":
						case "a ball gown":
							r += `is combed into short tails set low at the nape of ${his} neck. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is in short braids and is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is in short braids and is kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is in short braids. `;
							break;
					}
				} else {
					switch (child.clothes) {
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is too short to be kept in proper tails, so it's simply combed back. `;
							break;
					}
				}
				break;
			case "ponytail":
				if (child.hLength > 100) {
					switch (child.clothes) {
						case "a schoolgirl outfit":
							r += `is back in a huge ponytail secured by hair ties with plastic buttons, bearing the garish inscription `;
							r += App.Desc.inscrip(child);
							break;
						case "a slave gown":
						case "a ball gown":
							r += `is combed into a beautiful long ponytail, which swooshes as ${he} moves. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is in a long ponytail and is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is in a long ponytail and is kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is in a ponytail that almost reaches the ground. `;
							break;
					}
				} else if (child.hLength > 30) {
					switch (child.clothes) {
						case "a schoolgirl outfit":
							r += `is back in a big ponytail secured by hair ties with plastic buttons, bearing the garish inscription `;
							r += App.Desc.inscrip(child);
							break;
						case "a slave gown":
						case "a ball gown":
							r += `is combed into a beautiful ponytail, which swooshes as ${he} moves. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is in a long ponytail and is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is in a long ponytail and is kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is in a long ponytail. `;
							break;
					}
				} else if (child.hLength > 10) {
					switch (child.clothes) {
						case "a schoolgirl outfit":
							r += `is back in a short ponytail secured by a hair tie with plastic buttons, bearing the garish inscription `;
							r += App.Desc.inscrip(child);
							break;
						case "a slave gown":
						case "a ball gown":
							r += `is combed into a short ponytail set low at the nape of ${his} neck. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is in a ponytail and is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is in a ponytail and is kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is in a short ponytail. `;
							break;
					}
				} else {
					r += `is too short to be kept in a proper ponytail, so it's simply combed back. `;
				}
				break;
			case "braided":
				if (child.hLength > 100) {
					switch (child.clothes) {
						case "a schoolgirl outfit":
							r += `is back in huge braids secured by hair ties with plastic buttons, bearing the garish inscription `;
							r += App.Desc.inscrip(child);
							break;
						case "a slave gown":
						case "a ball gown":
							r += `is combed into beautiful long braids, one of which comes around to run down ${his} chest. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is in long braids and is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is in long braids and is kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is in braids that almost reach the ground. `;
							break;
					}
				} else if (child.hLength > 30) {
					switch (child.clothes) {
						case "a schoolgirl outfit":
							r += `is back in long braids secured by hair ties with plastic buttons, bearing the garish inscription `;
							r += App.Desc.inscrip(child);
							break;
						case "a ball gown":
						case "a slave gown":
							r += `is in beautiful braids, one of which comes around to fall between ${his} breasts. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is in braids and is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is in braids and is kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is in long braids. `;
							break;
					}
				} else if (child.hLength > 10) {
					switch (child.clothes) {
						case "a schoolgirl outfit":
							r += `is back in short braids secured by hair ties with plastic buttons, bearing the garish inscription `;
							r += App.Desc.inscrip(child);
							break;
						case "a slave gown":
						case "a ball gown":
							r += `is combed into short braids set low at the nape of ${his} neck. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is in short braids and is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is in short braids and is kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is in short braids. `;
							break;
					}
				} else {
					switch (child.clothes) {
						default:
							r += `is too short to be kept in proper braids, so it's simply combed back. `;
							break;
					}
				}
				break;
			case "dreadlocks":
				if (child.hLength > 100) {
					switch (child.clothes) {
						case "a schoolgirl outfit":
							r += `is in dreadlocks, some in ties with plastic buttons, bearing the garish inscription `;
							r += App.Desc.inscrip(child);
							break;
						case "a slave gown":
						case "a ball gown":
							r += `is in dreadlocks, spreading out in many directions and almost reaching the ground. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is in long dreadlocks and is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is in long dreadlocks and is kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is in dreadlocks that almost reach the ground. `;
							break;
					}
				} else if (child.hLength > 30) {
					switch (child.clothes) {
						case "a schoolgirl outfit":
							r += `is in dreadlocks, some in hair ties with plastic buttons, bearing the garish inscription `;
							r += App.Desc.inscrip(child);
							break;
						case "a slave gown":
							r += `is in dreadlocks, spreading out in many directions. `;
							break;
						case "a ball gown":
							r += `is in dreadlocks, spreading out in many directions. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is in dreadlocks and is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is in dreadlocks and is kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is in dreadlocks. `;
							break;
					}
				} else if (child.hLength > 10) {
					switch (child.clothes) {
						case "a schoolgirl outfit":
							r += `is in short dreadlocks, some in hair ties with plastic buttons, bearing the garish inscription `;
							r += App.Desc.inscrip(child);
							break;
						case "a slave gown":
						case "a ball gown":
							r += `is in short dreadlocks, spreading around ${his} head. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is in short dreadlocks and is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is in short dreadlocks and is kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is in short dreadlocks. `;
							break;
					}
				} else {
					switch (child.clothes) {
						default:
							r += `is too short to be kept in proper dreadlocks, so it's simply combed back. `;
							break;
					}
				}
				break;
			case "curled":
				if (child.hLength > 100) {
					switch (child.clothes) {
						case "a schoolgirl outfit":
							r += `is curled into long flowing locks secured by hair ties with plastic buttons, bearing the garish inscription `;
							r += App.Desc.inscrip(child);
							break;
						case "a slave gown":
						case "a ball gown":
							r += `is curled into long flowing locks, almost reaching the ground. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is curled into long flowing locks and is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is curled into long flowing locks and is kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is curled into long flowing locks that almost reach the ground. `;
							break;
					}
				} else if (child.hLength > 30) {
					switch (child.clothes) {
						case "a schoolgirl outfit":
							r += `is curled into long locks secured by hair ties with plastic buttons, bearing the garish inscription `;
							r += App.Desc.inscrip(child);
							break;
						case "a slave gown":
						case "a ball gown":
							r += `is curled into long locks, reaching past ${his} shoulders. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is curled into long locks and is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is curled into long locks and is kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is curled into long locks. `;
							break;
					}
				} else if (child.hLength > 10) {
					switch (child.clothes) {
						case "a schoolgirl outfit":
							r += `is curled into short locks secured by hair ties with plastic buttons, bearing the garish inscription `;
							r += App.Desc.inscrip(child);
							break;
						case "a slave gown":
						case "a ball gown":
							r += `is curled into short locks. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is curled into short locks and is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is curled into short locks and is kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is curled into short locks. `;
							break;
					}
				} else {
					switch (child.clothes) {
						default:
							r += `is in short curls. `;
							break;
					}
				}
				break;
			case "permed":
				if (child.hLength > 100) {
					switch (child.clothes) {
						case "a schoolgirl outfit":
							r += `is permed into long flowing curls secured by hair ties with plastic buttons, bearing the garish inscription `;
							r += App.Desc.inscrip(child);
							break;
						case "a slave gown":
						case "a ball gown":
							r += `is permed into long flowing curls, almost reaching the ground. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is permed and is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is permed and is kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is permed; ${his} curls almost reach the ground. `;
							break;
					}
				} else if (child.hLength > 30) {
					switch (child.clothes) {
						case "a schoolgirl outfit":
							r += `is permed and secured by hair ties with plastic buttons, bearing the garish inscription `;
							r += App.Desc.inscrip(child);
							break;
						case "a slave gown":
						case "a ball gown":
							r += `is permed, reaching past ${his} shoulders. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is permed and is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is permed and is kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is permed. `;
							break;
					}
				} else if (child.hLength > 10) {
					switch (child.clothes) {
						case "a schoolgirl outfit":
							r += `is permed into short waves secured by hair ties with plastic buttons, bearing the garish inscription `;
							r += App.Desc.inscrip(child);
							break;
						case "a slave gown":
						case "a ball gown":
							r += `is permed into short waves. `;
							break;
						case "a burkini":
						case "a burqa":
						case "a hijab and abaya":
						case "a hijab and blouse":
						case "a niqab and abaya":
							r += `is permed into short waves, but they're hidden by ${his} modest garb. `;
							break;
						case "a klan robe":
						case "a slutty klan robe":
							r += `is permed into short waves, but they're hidden by ${his} hood. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is permed into short waves and is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is permed into short waves and is kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is permed into short waves. `;
							break;
					}
				} else {
					switch (child.clothes) {
						case "a burkini":
						case "a burqa":
						case "a hijab and abaya":
						case "a hijab and blouse":
						case "a niqab and abaya":
							r += `is hidden by ${his} modest garb. `;
							break;
						case "a klan robe":
						case "a slutty klan robe":
							r += `is hidden by ${his} hood. `;
							break;
						default:
							r += `is permed into short curls. `;
							break;
					}
				}
				break;
			case "luxurious":
				if (child.hLength > 100) {
					switch (child.clothes) {
						case "a slave gown":
						case "a ball gown":
							r += `is in luxurious layered locks flowing gorgeously down ${his} bare back.habit": `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is in luxurious layered locks and is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is in luxurious layered locks and is kept out of ${his} face by a couple of black hairpins. `;
							break;
						case "a schoolgirl outfit":
							r += `is in luxurious layered locks kept out of ${his} face by a pastel-colored headband. `;
							r += `In ${his} hair is ${flowers(child)}`;
							break;
						default:
							r += `is in luxurious layered locks, cascading almost to the ground. `;
							break;
					}
				} else if (child.hLength > 30) {
					switch (child.clothes) {
						case "a slave gown":
						case "a ball gown":
							r += `is in luxurious layered locks flowing gorgeously down ${his} bare back.habit": `;
							break;
						case "a klan robe":
						case "a slutty klan robe":
							r += `is in luxurious layered locks flowing gorgeously but not visible under ${his} modest head covering. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is in luxurious layered locks and is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is in luxurious layered locks and is kept out of ${his} face by a couple of black hairpins. `;
							break;
						case "a schoolgirl outfit":
							r += `is in luxurious layered locks kept out of ${his} face by a pastel-colored headband. `;
							r += `In ${his} hair is ${flowers(child)}`;
							break;
						default:
							r += `is brushed back over ${his} shoulders. `;
							break;
					}
				} else if (child.hLength > 10) {
					switch (child.clothes) {
						case "a slave gown":
						case "a ball gown":
							r += `is in luxuriously styled short locks. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is in luxurious short layered locks and is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is in luxurious short layered locks and is kept out of ${his} face by a couple of black hairpins. `;
							break;
						case "a schoolgirl outfit":
							r += `is in luxuriously styled short locks kept out of ${his} face by a pastel-colored headband. `;
							r += `In ${his} hair is ${flowers(child)}`;
							break;
						default:
							r += `is brushed back. `;
							break;
					}
				} else {
					switch (child.clothes) {
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is in luxurious short layered locks and is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is in luxurious short layered locks and is kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is luxuriously styled and layered. `;
							break;
					}
				}
				break;
			case "strip":
				if (child.hLength > 100) {
					switch (child.clothes) {
						case "a schoolgirl outfit":
							r += `is shaved into a strip that cascades magnificently down ${his} back, with scores of tiny pastel bows woven into it. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is shaved into a strip and is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is shaved into a strip and is kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is shaved into a strip atop ${his} head that cascades magnificently down ${his} back. `;
							break;
					}
				} else if (child.hLength > 30) {
					switch (child.clothes) {
						case "a schoolgirl outfit":
							r += `is shaved into a long braided strip with tiny pastel bows woven into it. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is shaved into a long braided strip and is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is shaved into a long braided strip and is kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is shaved into a long braided strip. `;
							break;
					}
				} else if (child.hLength > 10) {
					switch (child.clothes) {
						case "a schoolgirl outfit":
							r += `is shaved into a strip down the middle of ${his} head with tiny pastel bows woven into it. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is shaved into a strip and is kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is shaved into a strip and is kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is shaved into a strip. `;
							break;
					}
				} else {
					r += `is shaved into a mohawk. `;
				}
				break;
			case "undercut":
				if (child.hLength > 100) {
					switch (child.clothes) {
						case "a schoolgirl outfit":
							r += `is shaved to one side in an extremely long undercut with scores of tiny pastel bows woven into it. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is shaved to one side in an extremely long undercut kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is shaved to one side in an extremely long undercut kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is shaved to one side in an extremely long undercut falling well past ${his} chest. `;
							break;
					}
				} else if (child.hLength > 30) {
					switch (child.clothes) {
						case "a schoolgirl outfit":
							r += `is shaved into a long, flowing undercut with tiny pastel bows woven into it. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is shaved into a long, flowing undercut kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is shaved into a long, flowing undercut kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is shaved to one side, the other half falling down to ${his} neck. `;
							break;
					}
				} else if (child.hLength > 10) {
					switch (child.clothes) {
						case "a schoolgirl outfit":
							r += `is shaved on one side of ${his} head with tiny pastel bows woven into it. `;
							break;
						case "a t-shirt":
						case "an oversized t-shirt":
							r += `is shaved on one side of ${his} head, kept out of ${his} face by a couple of cute hairpins. `;
							break;
						case "a tank-top":
						case "a tube top":
							r += `is shaved on one side of ${his} head, kept out of ${his} face by a couple of black hairpins. `;
							break;
						default:
							r += `is shaved to one side, the other half falling just over one eye. `;
							break;
					}
				} else {
					r += `is shaved to one side in a pixie-like undercut. `;
				}
				break;
			case "bald":
				r += `is completely bald. `;
				break;
		}

		return r;
	}

	function heel(child) {
		let r = ``;

		if (child.heels) {
			r += `${His} <span class="pink">legs have been altered</span> so that ${he} must wear heels in order to walk. `;
		}

		if (V.showClothing && !market) {
			if (hasAnyLegs(child)) {
				if (child.shoes !== "none" && child.shoes !== "flats") {
					r += `${He} is, so ${he} can walk reasonably well. `;
				} else {
					r += `Since ${he} is without them, ${he}'s crawling on all fours. `;
				}
			}
		}

		return r;
	}

	function heightImplant(child) {
		let r = ``;

		if (child.heightImplant > 0) {
			r += `The proportions of ${his} arms and legs are odd, as though they have been artificially lengthened. `;
		} else if (child.heightImplant < 0) {
			r += `The proportions of ${his} arms and legs are odd, as though they have been surgically shortened. `;
		}

		return r;
	}

	function hips(child) {
		let r = ``;

		if (child.hips < -1) {
			if (child.butt > 2) {
				r += `${His} butt is `;
				if (FutureSocieties.isActive('FSHedonisticDecadence', arcology)) {
					r += `disproportionately large for ${his} narrow hips, but your hedonistic arcology finds this attractive. `;
				} else if (FutureSocieties.isActive('FSTransformationFetishist', arcology)) {
					r += `disproportionately large for ${his} narrow hips, but your transformation fetishist arcology considers this attractive. `;
				} else if (FutureSocieties.isActive('FSAssetExpansionist', arcology)) {
					r += `disproportionately large for ${his} narrow hips, but that's just fine to your asset expansionist society. `;
				} else {
					r += `<span class="red">disproportionately large</span> for ${his} narrow hips. `;
				}
			} else {
				r += `${His} hips are very narrow. `;
			}
		} else if (child.hips < 0) {
			if (child.butt > 4) {
				r += `${His} butt is `;
				if (FutureSocieties.isActive('FSHedonisticDecadence', arcology)) {
					r += `disproportionately large for ${his} trim hips, but your hedonistic arcology finds this attractive. `;
				} else if (FutureSocieties.isActive('FSTransformationFetishist', arcology)) {
					r += `disproportionately large for ${his} trim hips, but your transformation fetishist arcology considers this attractive. `;
				} else if (FutureSocieties.isActive('FSAssetExpansionist', arcology)) {
					r += `disproportionately large for ${his} trim hips, but that's just fine to your asset expansionist society. `;
				} else {
					r += `<span class="red">disproportionately large</span> for ${his} trim hips. `;
				}
			} else {
				r += `${His} butt is complemented by ${his} trim hips. `;
			}
		} else if (child.hips > 2) {
			if (child.butt <= 8) {
				r += `${His} butt is <span class="red">disproportionately small</span> for ${his} monstrous hips. `;
			} else {
				r += `${His} butt is fitting for ${his} monstrous hips. `;
			}
		} else if (child.hips > 1) {
			if (child.butt <= 3 && (!FutureSocieties.isActive('FSSlimnessEnthusiast', arcology) || child.boobs >= 500)) {
				r += `${His} butt is <span class="red">disproportionately small</span> for ${his} very wide hips${FutureSocieties.isActive('FSSlimnessEnthusiast', arcology) ? `, which your arcology finds unattractive on busty slaves` : ``}. `;
			} else {
				r += `${His} butt is flattered by ${his} very wide hips. `;
			}
		} else if (child.hips > 0) {
			if (child.butt > 8) {
				r += `${His} butt is `;
				if (FutureSocieties.isActive('FSHedonisticDecadence', arcology)) {
					r += `disproportionately large for ${his} broad hips, but your hedonistic arcology finds this attractive. `;
				} else if (FutureSocieties.isActive('FSTransformationFetishist', arcology)) {
					r += `disproportionately large for ${his} broad hips, but your transformation fetishist arcology considers this attractive. `;
				} else if (FutureSocieties.isActive('FSAssetExpansionist', arcology)) {
					r += `disproportionately large for ${his} broad hips, but that's just fine to your asset expansionist society. `;
				} else {
					r += `<span class="red">disproportionately large</span> for ${his} broad hips. `;
				}
			} else if (child.butt <= 2 && (!FutureSocieties.isActive('FSSlimnessEnthusiast', arcology) || child.boobs >= 500)) {
				r += `${His} butt is <span class="red">disproportionately small</span> for ${his} broad hips${FutureSocieties.isActive('FSSlimnessEnthusiast', arcology) ? `, which your arcology finds unattractive on busty slaves` : ``}. `;
			} else {
				r += `${His} butt is complemented by ${his} broad hips. `;
			}
		} else {
			if (child.butt > 6) {
				r += `${His} butt is `;
				if (FutureSocieties.isActive('FSHedonisticDecadence', arcology)) {
					r += `disproportionately large for ${his} womanly hips, but your hedonistic arcology finds this attractive. `;
				} else if (FutureSocieties.isActive('FSTransformationFetishist', arcology)) {
					r += `disproportionately large for ${his} womanly hips, but your transformation fetishist arcology considers this attractive. `;
				} else if (FutureSocieties.isActive('FSAssetExpansionist', arcology)) {
					r += `disproportionately large for ${his} womanly hips, but that's just fine to your asset expansionist society. `;
				} else {
					r += `<span class="red">disproportionately large</span> for ${his} womanly hips. `;
				}
			} else if (child.butt <= 1 && (!FutureSocieties.isActive('FSSlimnessEnthusiast', arcology) || child.boobs >= 500)) {
				r += `${His} butt is <span class="red">disproportionately small</span> for ${his} ample hips${FutureSocieties.isActive('FSSlimnessEnthusiast', arcology) ? `, which your arcology finds unattractive on busty slaves` : ``}. `;
			} else {
				r += `${His} butt is complemented by ${his} ample hips. `;
			}
		}

		switch (child.tailShape) {
			case "neko":
				r += `${He} has a long, slender, ${child.tailColor} cat tail which tends to sway side to side when ${he} is focused on a task. `;
				break;
			case "inu":
				r += `${He} has a bushy, ${child.tailColor} dog tail which tends to wag energetically when ${he} gets exited. `;
				break;
			case "kit":
				r += `${He} has a soft, fluffy, ${child.tailColor} fox tail. `;
				break;
			case "kitsune":
				r += `${He} has three incredibly soft, fluffy, ${child.tailColor} fox tails; they feel heavenly to the touch. `;
				break;
			case "tanuki":
				r += `${He} has a long, fluffy, ${child.tailColor} tanuki tail with a dark stripe running down the middle. `;
				break;
			case "ushi":
				r += `${He} has a long, ${child.tailColor} cow tail; it has a small tuft of hair at the end and tends to swat at things absentmindedly. `;
				break;
			case "usagi":
				r += `${He} has a short and fluffy ${child.tailColor} rabbit tail. `;
				break;
			case "risu":
				r += `${He} has a big and bushy ${child.tailColor} squirrel tail. `;
				break;
			case "uma":
				r += `${He} has a long horse tail consisting of ${child.tailColor} hair. `;
				break;
			default:
				if (child.tail === "combat") {
					r += `${He} has a very long ${child.tailColor} metallic tail that can lash out, constrict, and deploy razor sharp spikes on command. `;
				} else if (child.tail === "sex") {
					r += `${He} has a long, slender, ${child.tailColor} tail. While not strong it is very dexterous and has a small fleshy spade-shaped tip that can vibrate and dispense lube on command. `;
				}
		}

		return r;
	}

	function makeup(child) {
		let r = ``;

		if (child.makeup > 0) {
			switch (child.makeup) {
				case 1:
					r += `${He}'s wearing minimal makeup. `;
					break;
				case 2:
					r += `${He}'s wearing expensive, luxurious makeup. `;
					break;
				case 3:
					r += `${His} makeup is color-coordinated with ${his} ${child.hColor} hair. `;
					break;
				case 4:
					r += `${He}'s wearing stereotypical, garish streetwalker makeup. `;
					break;
				case 5:
					r += `${He}'s wearing eye-catching neon makeup. `;
					break;
				case 6:
					r += `${His} neon makeup is color-coordinated with ${his} ${child.hColor} hair. `;
					break;
				case 7:
					r += `${He}'s wearing expensive, metallic makeup. `;
					break;
				case 8:
					r += `${His} metallic makeup is color-coordinated with ${his} ${child.hColor} hair. `;
					break;
			}
		} else if (child.lipsTat === "permanent makeup") {
			r += `${His} face appears to bear very heavy, slutty makeup, but on closer inspection, the makeup is actually tattooed on. `;
		} else {
			r += `${His} face is makeup-free. `;
		}

		return r;
	}

	function master(child) {
		return getEnunciation(child).title;
	}

	function mouth(child) {
		let r = ``;

		r += `${He} has `;
		if (child.lips <= 10) {
			r += `thin, unattractive lips. `;
		} else if (child.lips <= 20) {
			r += `normal lips. `;
		} else if (child.lips <= 40) {
			r += `full, attractive lips. `;
		} else if (child.lips <= 70) {
			r += `plump, beestung lips. `;
		} else if (child.lips <= 95) {
			r += `huge, obviously augmented lips. `;
		} else {
			r += `a facepussy: ${his} lips are so huge that they're always a bit parted in the middle, forming a moist, inviting hole${PC.dick ? ` for cock` : ``}. `;
		}

		if (V.showImplantEffects) {
			if (FutureSocieties.isActive('FSTransformationFetishist', arcology)) {
				if (child.lipsImplant > 0) {
					r += `They are about ${Math.floor((child.lipsImplant / child.lips) * 100)}% implant. `;
				}
				if (arcology.FSTransformationFetishist > 20) {
					if (child.lips > 70) {
						if (child.lipsImplant / child.lips < .50) {
							r += `${His} lips are huge and <span class="red">disgustingly natural</span> for their size. `;
						} else {
							r += `${His} lips are huge and <span class="green">obviously implants,</span> as they should be. `;
						}
					}
				}
			}
		}

		if (canTalk(child)) {
			if (child.lips > 70) {
				r += `${He} can barely enunciate past ${his} dick-sucking lips; '${getWrittenTitle(child)}' comes out as '${master(child)}.' `;
			}
		}

		if (child.teeth !== "normal") {
			if (child.teeth === "crooked") {
				r += `${His} teeth are <span class="yellow">crooked,</span> detracting from ${his} beauty whenever ${he} opens ${his} mouth. `;
			} else if (child.teeth === "straightening braces") {
				r += `${He} has braces, ${child.visualAge < 15 ? `a cute look on such a young girl. ` : `and occasionally looks preoccupied with discomfort as they straighten ${his} teeth. `}`;
			} else if (child.teeth === "cosmetic braces") {
				r += `${He}'s wearing braces despite ${his} straight teeth, ${child.visualAge < 15 ? `a cute look on such a young girl. ` : `just for appearances. `}`;
			} else if (child.teeth === "gapped") {
				r += `${He} has a prominent gap between ${his} front teeth${child.faceShape === "cute" ? ` that suits ${his} cute face surprisingly well` : ``}. `;
				if (canTalk(child)) {
					r += `It also leaves ${him} with a slight lisp. `;
				}
			} else if (child.teeth === "removable") {
				r += `${His} teeth have been removed and replaced with high-quality dentures. It's difficult to tell anything's unusual until you take them out for gummy oral sex. `;
			} else if (child.teeth === "pointy") {
				r += `${His} teeth have been replaced with realistic implants that mimic the dentition of a carnivore. ${His} smiles are frightening, and ${he} can bare them to become truly terrifying. `;
			} else if (child.teeth === "baby") {
				r += `${He} still has ${his} baby teeth. `;
			} else if (child.teeth === "mixed") {
				r += `${He} is in the process of replacing ${his} baby teeth. `;
			}
		}

		if (child.tastes === -1) {
			r += `${He} has no sense of taste, but this isn't immediately obvious just by looking at ${his} tongue. `;
		}

		if (V.showBodyMods) {
			r += piercings.lips(child);
			r += piercings.tongue(child);
		}

		r += `${He} is `;
		if (child.skill.oral >= 100) {
			r += `an <span class="skill">oral sex master.</span> `;
		} else if (child.skill.oral > 60) {
			r += `an <span class="skill">expert at oral.</span> `;
		} else if (child.skill.oral > 30) {
			r += `<span class="skill">orally skilled.</span> `;
		} else if (child.skill.oral > 10) {
			r += `<span class="skill">capable of basic oral sex.</span> `;
		} else {
			r += `unskilled at oral sex. `;
		}

		return r;
	}

	function nails(child) {
		let r = ``;

		if (!hasAnyArms(child)) {
			r += `${He} has no hands, and thus, no nails. `;
		} else {
			switch (child.nails) {
				case 1:
					r += `${His} nails are long and elegant. `;
					break;
				case 2:
					r += `${His} nails are color-coordinated with ${his} ${child.hColor} hair. `;
					break;
				case 3:
					r += `${His} nails are sharp and claw-like. `;
					break;
				case 4:
					r += `${His} nails are bright and glittery. `;
					break;
				case 5:
					r += `${His} nails are long and garish, streetwalker-style. `;
					break;
				case 6:
					r += `${His} nails are vivid and eye-catching. `;
					break;
				case 7:
					r += `${His} nails are vivid, eye-catching and color-coordinated with ${his} ${child.hColor} hair. `;
					break;
				case 8:
					r += `${His} nails are shiny and metallic. `;
					break;
				case 9:
					r += `${His} nails are shiny, metallic and color-coordinated with ${his} ${child.hColor} hair. `;
					break;
				default:
					r += `${His} nails are neatly clipped. `;
					break;
			}
		}

		return r;
	}

	function piercings() {
		function anus(child) {
			let r = ``;

			if (child.vagina > -1) {
				if (child.piercing.anus.weight === 1) {
					r += `${He} has a simple piercing between ${his} pussy and ${his} asshole. `;
				} else if (child.piercing.anus.weight === 2) {
					r += `${He} has a big ring between ${his} pussy and ${his} asshole and studs in all around ${his} anus. `;
				}
			} else {
				if (child.piercing.anus.weight === 1) {
					r += `${He} has a simple perianal piercing between the base of ${his} dick and ${his} girly butthole. `;
				} else if (child.piercing.anus.weight === 2) {
					r += `${He} has a big ring between the base of ${his} dick and ${his} girly butthole, which has studs all around it. `;
				}
			}

			return r;
		}

		piercings.anus = anus;

		function clit(child) {
			let r = ``;
			if (child.piercing.genitals.smart) {
				if (child.vagina > -1) {
					r += `${He} has a smart piercing in ${his} clit. `;
				} else {
					r += `${He} has a smart frenulum piercing. `;
				}
			} else if (child.piercing.genitals.weight === 2) {
				if (child.vagina > -1) {
					r += `${He} has a big ring in ${his} clit. `;
				} else {
					r += `${He} has a big ring in ${his} dickhead. `;
				}
			} else if (child.piercing.genitals.weight === 1) {
				if (child.vagina > -1) {
					r += `${He} has a simple clitoral stud. `;
				} else {
					r += `${He} has a simple dickhead stud. `;
				}
			}

			return r;
		}

		piercings.clit = clit;

		function corset(child) {
			let r = ``;

			if (child.piercing.corset.weight > 0) {
				r += `${He} has a corset piercing, a ladder of steel rings running up each side of ${his} back: `;
				if (child.bellyAccessory === "a corset" || child.bellyAccessory === "an extreme corset") {
					r += `these are looped through special lugs in the back of ${his} actual corset, making it almost a part of ${his} body. `;
					if (child.devotion > 50) {
						r += `${He} couldn't remove it, even if ${he} wanted to. `;
					} else if (child.devotion >= -20) {
						r += `${He} couldn't remove it, even if ${he} were inclined to try. `;
					} else {
						r += `Any attempt to remove it will cause intense pain. `;
					}
				} else {
					switch (child.clothes) {
						case "a schoolgirl outfit":
							r += `${his} blouse hides them completely, but they're laced tightly, so ${he}'s aware they're there. `;
							break;
						case "a mini dress":
							r += `these are clipped into the mini dress covering them, making it almost a part of ${his} body. `;
							if (child.devotion > 50) {
								r += `${He} couldn't remove it, even if ${he} wanted to. `;
							} else if (child.devotion >= -20) {
								r += `${He} couldn't remove it, even if ${he} were inclined to try. `;
							} else {
								r += `Any attempt to remove it will cause intense pain. `;
							}
							break;
						case "a tube top":
							r += `the piercings are only partly visible on ${his} back. `;
							break;
						case "a t-shirt":
							r += `${his} shirt hides them completely, but they're laced tightly, so ${he}'s aware they're there. `;
							break;
						case "a slave gown":
							r += `they're revealed by the swooping back of ${his} gown and laced up with matching silk ribbon. `;
							break;
						default:
							r += `they're laced up with a ribbon, tightly enough to keep ${him} aware they're there. `;
							break;
					}
				}
			}

			return r;
		}

		piercings.corset = corset;

		function dick(child) {
			let r = ``;

			if (child.dick !== 0) {
				if (child.piercing.dick.weight === 1) {
					r += `${He} has a row of studs down ${his} shaft. `;
				} else if (child.piercing.dick.weight === 2) {
					r += `${He} has a row of heavy rings down ${his} shaft. `;
				}

				if (child.scrotum !== 0) {
					if (child.piercing.dick.weight === 1) {
						r += `${He} has a couple of studs in ${his} ballsack. `;
					} else if (child.piercing.dick.weight === 2) {
						r += `${He} has a row of rings down the center of ${his} ballsack, all the way from the base of ${his} shaft to ${his} perineum. `;
					}
				} else {
					if (child.piercing.dick.weight === 1) {
						r += `${He} has a couple of studs beneath the base of ${his} dick. `;
					} else if (child.piercing.dick.weight === 2) {
						r += `${He} has a row of rings all the way from the base of ${his} shaft to ${his} perineum. `;
					}
				}
			}

			return r;
		}

		piercings.dick = dick;

		function ears(child) {
			let r = ``;

			if (child.piercing.ear.weight > 0) {
				if (child.piercing.ear.weight === 1) {
					r += `${His} earlobes are conventionally pierced. `;
				} else {
					r += `${His} ears are heavily pierced, with multiple lobe piercings and a row of helix piercings. `;
				}

				switch (child.clothes) {
					case "a t-shirt":
						r += `${He}'s wearing plain but pretty earrings. `;
						break;
					case "a tube top":
						r += `${He}'s wearing large hoop earrings. `;
						break;
					case "a schoolgirl outfit":
						r += `${He}'s wearing small girlish earrings. `;
						break;
					case "a mini dress":
						r += `${He}'s wearing shiny pearl earrings. `;
						break;
					case "a slave gown":
					case "a ball gown":
						r += `${He}'s wearing lovely diamond earrings; the stones are cut in an alluring, feminine style. `;
						break;
				}
			}

			return r;
		}

		piercings.ears = ears;

		function eyebrows(child) {
			let r = ``;

			if (child.piercing.eyebrow.weight === 1) {
				r += `${He} has a simple stud in one eyebrow. `;
			} else if (child.piercing.eyebrow.weight === 2) {
				r += `${He} has multiple eyebrow rings. `;
			}

			return r;
		}

		piercings.eyebrows = eyebrows;

		function lips(child) {
			let r = ``;

			if (child.piercing.lips.weight === 1) {
				r += `${He} has a simple lip piercing. `;
			} else if (child.piercing.lips.weight === 2) {
				r += `${His} lips are heavily pierced. `;
			}

			return r;
		}

		piercings.lips = lips;

		function nipples(child) {
			let r = ``;
			let nipColor = nippleColor(child);

			if (child.piercing.nipple.weight === 1) {
				r += `${His} ${nipColor} nipples have a simple piercing, which keeps them a little harder than they would normally be. `;
			} else if (child.piercing.nipple.weight === 2) {
				r += `${His} ${nipColor} nipples are heavily pierced with several rings and studs, and there is a chain between them. `;
				if (child.boobShape === "saggy" && child.boobs > 2500) {
					r += `It's been shortened to take advantage of the way ${his} tits sag, and holds ${his} ${nipColor} nipples almost together, producing cleavage that runs from ${his} ${nipColor} nipples all the way up to ${his} sternum. `;
				} else {
					r += `The constant tugging keeps ${his} ${nipColor} nipples erect. `;
				}

				if (child.piercing.nipple.weight > 0) {
					switch (child.clothes) {
						case "a schoolgirl outfit":
							if (child.boobs <= 2500) {
								r += `The piercings are tantalizingly visible under the thin material. `;
							}
							break;
						case "a mini dress":
							r += `The piercings are tantalizingly visible under the tight mini dress. `;
							break;
					}
				}
			}

			return r;
		}

		piercings.nipples = nipples;

		function nose(child) {
			let r = ``;

			if (child.piercing.nose.weight === 1) {
				r += `${He} has simple studs in ${his} nose. `;
			} else if (child.piercing.nose.weight === 2) {
				r += `${He} has nasal studs and a large septum ring. `;
			}

			return r;
		}

		piercings.nose = nose;

		function tongue(child) {
			let r = ``;

			if (child.piercing.tongue.weight === 1) {
				r += `${His} tongue bears a single stud, so oral sex with ${him} is a bit more fun. `;
			} else if (child.piercing.tongue.weight === 2) {
				r += `${His} tongue bears a row of studs, offering thorough stimulation to anyone ${he} blows. `;
			}
			if (canTalk(child) && child.lips <= 70 && child.piercing.lips.weight === 2) {
				r += `${He} can barely enunciate past ${his} piercings; '${getWrittenTitle(child)}' comes out as '${master(child)}.' `;
			}

			return r;
		}

		piercings.tongue = tongue;

		function vagina(child) {
			let r = ``;

			if (child.piercing.vagina.weight > 0) {
				r += `${He} has a `;
				if (child.piercing.vagina.weight) {
					r += `simple row of studs `;
				} else {
					r += `row of big rings `;
				}
				r += `down ${his} labia. `;
			}

			return r;
		}

		piercings.vagina = vagina;
	}

	function shoulders(child) {
		let r = ``;

		if (child.shoulders < -1) {
			r += `${His} shoulders and chest are very narrow and `;
			if (child.boobs > 2000) {
				r += `feminine, forcing ${his} pressed-together tits to spread far beyond ${his} sides. `;
			} else {
				r += `feminine. `;
			}
		} else if (child.shoulders < 0) {
			r += `${His} shoulders and chest are quite `;
			if (child.boobs > 1200) {
				r += `feminine, causing a lot of cleavage and pressing ${his} boobs outward beyond ${his} sides. `;
			} else {
				r += `feminine. `;
			}
		} else if (child.shoulders > 1) {
			r += `${His} shoulders and chest are very `;
			if (child.boobs > 600) {
				r += `broad, making ${his} boobs look a lot smaller than they actually are. `;
			} else {
				r += `broad. `;
			}
		} else if (child.shoulders > 0) {
			r += `${His} shoulders and chest are fairly `;
			if (child.boobs > 600) {
				r += `broad, making ${his} tits look smaller than they actually are. `;
			} else {
				r += `broad. `;
			}
		} else {
			r += `${His} shoulders and chest are `;
			if (child.boobs > 800) {
				r += `feminine, flattering ${his} breasts. `;
			} else {
				r += `feminine. `;
			}
		}

		if (child.shoulders > child.hips) {
			r += `They're wider than ${his} hips, `;
			if (child.boobs > 2000 * (child.shoulders - child.hips)) {
				r += `but ${his} massive breasts make it hard to discern. `;
			} else if (FutureSocieties.isActive('FSGenderRadicalist', arcology)) {
				r += `giving ${him} a somewhat mannish appearance. `;
			} else if (FutureSocieties.isActive('FSGenderFundamentalist', arcology)) {
				r += `giving ${him} an <span class="red">ugly, mannish appearance.</span> `;
			} else {
				r += `giving ${him} an <span class="red">unattractive, somewhat mannish, appearance.</span> `;
			}
		}

		return r;
	}

	function skin(child) {
		let r = ``;

		if (V.seeNationality) {
			if (child.nationality === 0) {
				r += `Ethnically, ${he}'s `;
			} else if (child.nationality === "slave") {
				r += `${He}'s been chattel long enough that slavery is effectively ${his} nationality; ethnically, ${he}'s `;
			} else if (child.nationality === "Stateless") {
				r += `${He} has spent so much time in the Free Cities that their statelessness is effectively ${his} nationality; ethnically, ${he}'s `;
			} else if (child.nationality === "Zimbabwean" && child.race === "white") {
				r += `${He}'s originally <span class="nationality">Rhodesian;</span> ethnically, ${he}'s `;
			} else if (child.nationality === "Vatican") {
				r += `${He}'s originally <span class="nationality">from Vatican City;</span> ethnically, ${he}'s `;
			} else {
				r += `${He}'s originally <span class="nationality">${child.nationality};</span> ethnically, ${he}'s `;
			}
			r += `<span class="race">${child.race},</span> and ${his} skin is ${child.skin}${child.markings === "freckles" ? ` and lightly ${freckled}${skinToneLevel(child.skin) > 5 && skinToneLevel(child.skin < 10) && child.hColor === "red" ? `, an attractive combination` : ``}` : child.markings === "heavily freckled" ? `and heavily ${freckled}${skinToneLevel(child.skin > 5) && skinToneLevel(child.skin) < 10 && child.hColor === "red" ? `, an attractive combination` : ``}. ` : `. `}`;

			r += `${child.skin === "sun tanned" || child.skin === "spray tanned" ? `${His} ${skintype} has been tanned ${child.skin === "sun tanned" ? `to a natural, healthy-looking tone` : `with obvious, garish-looking makeup`}.` : ``}`;

			if (child.race !== child.origRace) {
				if (market) {
					if (PC.skill.medicine >= 100) {
						r += `Thanks to your medical experience, you can easily tell that ${he} was originally ${child.origRace}, but surgically modified. `;
					} else if (PC.skill.medicine >= 50) {
						r += `Oddly enough, ${he} appears to have a number of ${child.origRace} features. `;
					} else if (PC.skill.slaving >= 50) {
						r += `Thanks to your experience in buying and selling slaves, you can easily tell that ${he} is not naturally ${child.race}. `;
					} else if (jsRandom(0, 100) < PC.skill.medicine) {
						r += `${His} features seem slightly off. `;
					}
				} else {
					r += `${He} has received plastic surgery to appear ${child.race}; ${he} is originally ${child.origRace}. `;
				}
			}
		} else if (V.seeRace) {
			r += `Ethnically, ${he}'s <span class="race">${child.race},</span> and ${his} skin is ${child.skin}${child.markings === "freckles" ? ` and lightly ${freckled}${skinToneLevel(child.skin) > 5 && skinToneLevel(child.skin < 10) && child.hColor === "red" ? `, an attractive combination` : ``}` : child.markings === "heavily freckled" ? `and heavily ${freckled}${skinToneLevel(child.skin > 5) && skinToneLevel(child.skin) < 10 && child.hColor === "red" ? `, an attractive combination` : ``}. ` : `. `}`;

			r += `${child.skin === "sun tanned" || child.skin === "spray tanned" ? `${His} ${skintype} has been tanned ${child.skin === "sun tanned" ? `to a natural, healthy-looking tone` : `with obvious, garish-looking makeup`}. ` : ``}`;

			if (child.race !== child.origRace) {
				if (market) {
					if (PC.skill.medicine >= 100) {
						r += `Thanks to your medical experience, you can easily tell that ${he} was originally ${child.origRace}, but surgically modified. `;
					} else if (PC.skill.medicine >= 50) {
						r += `Oddly enough, ${he} appears to have a number of ${child.origRace} features. `;
					} else if (PC.skill.slaving >= 50) {
						r += `Thanks to your experience in buying and selling slaves, you can easily tell that ${he} is not naturally ${child.race}. `;
					} else if (jsRandom(0, 100) < PC.skill.medicine) {
						r += `${His} features seem slightly off. `;
					}
				} else {
					r += `${He} has received plastic surgery to appear ${child.race}; ${he} is originally ${child.origRace}. `;
				}
			}
		} else {
			r += `${His} ${skintype} is ${child.skin}${child.markings === "freckles" ? ` and lightly freckled${skinToneLevel(child.skin) > 5 && skinToneLevel(child.skin < 10) && child.hColor === "red" ? `, an attractive combination` : ``}` : child.markings === "heavily freckled" ? `and heavily freckled${skinToneLevel(child.skin > 5) && skinToneLevel(child.skin) < 10 && child.hColor === "red" ? `, an attractive combination` : ``}. ` : `. `}`;

			r += `${child.skin === "sun tanned" || child.skin === "spray tanned" ? `${His} ${skintype} has been tanned ${child.skin === "sun tanned" ? `to a natural, healthy-looking tone` : `with obvious, garish-looking makeup`}.` : ``}`;
		}

		return r;
	}

	function tats() {
		function anus(child) {
			let r = ``;

			if (child.anusTat !== 0) {
				switch (child.anusTat) {
					case "bleached":
						r += `${His} anus is bleached. `;
						break;
					case "tribal patterns":
						r += `${His} anus is bleached. It is tattooed with a tribal pattern that changes interestingly when ${he} relaxes or tightens ${his} sphincter. `;
						break;
					case "flowers":
						r += `${He} has a huge blooming flower tattooed right over ${his} anus. `;
						break;
					case "counting":
						if (child.counter.anal === 0) {
							r += `${He} has a dashed line tattooed around ${his} anus as a guideline for where ${his} anal count will be inscribed. `;
						} else if (child.counter.anal < 1000) {
							r += `${He} has fine rings tattooed around ${his} anus, one for each hundred cocks. `;
						} else {
							r += `${He} has thick and fine rings tattooed around ${his} anus, for each thousand and hundred cocks. `;
						}
						break;
					case "advertisements":
						if (child.vagina > -1) {
							r += `${He} has a ring of text tattooed around ${his} anus which reads 'Second Pussy.' `;
						} else {
							r += `${He} has a ring of text tattooed around ${his} anus which reads 'Spit First.' `;
						}
						break;
					case "rude words":
						if (child.vagina > -1) {
							r += `${He} has a ring of text tattooed around ${his} anus which reads 'Fucktoy's Favorite Fuckhole.' `;
						} else {
							r += `${He} has a ring of text tattooed around ${his} anus which reads 'Sissy Slut's Sodomy Slit.' `;
						}
						break;
					case "degradation":
						r += `${His} anus is bleached. It is tattooed with gothic script in a ring around ${his} hole, reading '${getWrittenTitle(child)} Made Me An Anal Slut.' `;
						break;
					case "bovine patterns":
						r += `${His} anus is tattooed to mimic the puffy, dark appearance of a cow's. `;
						break;
					case "sacrilege":
						r += `${He} has a ring of Aramaic text tattooed around ${his} anus, which translates to horrible blasphemy. `;
						break;
					case "sacrament":
						r += `${He} has a ring of Aramaic text tattooed around ${his} anus, which translates to a comforting blessing. `;
						break;
					case "possessive":
						r += `${He} has a ring of numbers around ${his} anus, detailing the date ${he} was enslaved by you. `;
						break;
					case "paternalist":
						r += `${His} anus is bleached. It is tattooed with text in a ring around ${his} hole, reading '${getWrittenTitle(child)} Helped Me Love Anal.' `;
						break;
					case "Asian art":
						r += `${His} anus is bleached. `;
						break;
					default:
						r += `${child.anusTat}`;
						break;
				}
			}

			r += App.Desc.brand(child, "anus");
			r += App.Desc.brand(child, "asshole");

			return r;
		}

		tats.anus = anus;

		function arms(child) {
			let r = ``;

			if (child.armsTat !== 0) {
				switch (child.armsTat) {
					case "tribal patterns":
						r += `${His} tribal tattoos run down ${his} arms. `;
						break;
					case "flowers":
						r += `${His} floral tattoos run down ${his} arms to end in a pretty bloom on the back of each hand. `;
						break;
					case "counting":
						if (child.counter.oral === 0) {
							r += `There are horizontal lines tattooed around ${his} forearms, creating a blank space to permanently tally future sexual exploits. `;
						} else if (child.counter.oral < 500) {
							r += `Tiny dick, pussy, and anus symbols are tattooed on ${his} forearms, one for each organ ${he}'s manually pleasured. `;
						} else {
							r += `Tiny dick, pussy, and anus symbols are tattooed all over both ${his} arms, one for each organ ${he}'s manually pleasured. `;
						}
						break;
					case "advertisements":
						r += `${His} right arm is tattooed with a price list for use if ${he}'s whoring, and ${his} left with a simple tourist guide for use if ${he}'s serving the public. `;
						break;
					case "rude words":
						r += `${His} arms have helpful instructions on how to restrain ${him} for rape, including indications of the best anchor points at ${his} wrists. `;
						break;
					case "degradation":
						if (child.dick > 0) {
							if (child.vagina > -1) {
								if (child.boobs > 600) {
									r += `'Boobs Pussy Cock Asshole' is tattooed on ${his} left arm, and 'Suck Fuck Hurt Rape' is tattooed on ${his} right. `;
								} else {
									r += `'Half Pussy & Half Cock' is tattooed on ${his} left arm, and 'All Whore' is tattooed on ${his} right. `;
								}
							} else if (child.boobs > 600) {
								r += `'I didn't use to have boobs' is tattooed on ${his} left arm, and 'I didn't always take it up the ass' is tattooed on ${his} right. `;
							} else {
								r += `'I promise to cum buckets' is tattooed on ${his} left arm, and 'If you fuck my butt' is tattooed on ${his} right. `;
							}
						} else {
							if (child.boobs > 800 && child.lactation > 0) {
								r += `'Grade AAA Milker' is tattooed on ${his} left arm, and 'Grade AAA Breeder' is tattooed on ${his} right. `;
							} else if (child.visualAge < 15) {
								r += `'Teach me how to suck cock' is tattooed on ${his} left arm, and 'Teach me how to take dick' is tattooed on ${his} right. `;
							} else {
								r += `'There are many sex slaves like me' is tattooed on ${his} left arm, and 'But this one is ${getWrittenTitle(child)}'s' is tattooed on ${his} right. `;
							}
						}
						break;
					case "Asian art":
						r += `Tattoos of fierce dragons wind around both ${his} arms. `;
						break;
					case "scenes":
						r += `${His} lewd tattoos cover ${his} arms; they include lots of little vignettes of sex, with dates to show when ${he} was first fucked like that. `;
						break;
					case "bovine pattern":
						r += `Tattoos of cow-like spots cover ${his} arms, but stop short of each of ${his} elbows. `;
						break;
					case "sacrilege":
						r += `Tattoos of swirling flames run down ${his} arms. `;
						break;
					case "sacrament":
						r += `Tattoos of swirling thorns run down ${his} arms, culminating in a stylized depiction of a bloody nail on the back of each hand. `;
						break;
					case "possessive":
						r += `${His} arm tattoos depict notable moments during ${his} enslavement by you, culminating in a stylized rendition of your first initial on ${his} left hand and your second on the right. `;
						break;
					case "paternalist":
						if (child.dick > 0) {
							if (child.vagina > -1) {
								if (child.boobs > 600) {
									r += `'Boobs Pussy Cock Asshole' is tattooed on ${his} left arm, and 'Caress Pleasure Stroke Stretch' is tattooed on ${his} right. `;
								} else {
									r += `'Half Pussy & Half Cock' is tattooed on ${his} left arm, and 'All Loved' is tattooed on ${his} right. `;
								}
							} else if (child.boobs > 600) {
								r += `'I didn't use to have boobs' is tattooed on ${his} left arm, and 'And now I do!' is tattooed on ${his} right. `;
							} else {
								r += `'I promise to cum buckets' is tattooed on ${his} left arm, and 'If you treat me right' is tattooed on ${his} right. `;
							}
						} else {
							if (child.boobs > 800 && child.lactation > 0) {
								r += `'Please drink' is tattooed on ${his} left arm, and 'All my milk' is tattooed on ${his} right. `;
							} else if (child.visualAge < 15) {
								r += `'Please teach me how to suck cock' is tattooed on ${his} left arm, and 'Please teach me how to fuck' is tattooed on ${his} right. `;
							} else {
								r += `'There are many sex slaves like me' is tattooed on ${his} left arm, and 'But ${getWrittenTitle(child)} loves me' is tattooed on ${his} right. `;
							}
						}
						break;
					default:
						r += `${child.armsTat}`;
						break;
				}
			}

			r += App.Desc.brand(child, "upper arm");
			r += App.Desc.brand(child, "lower arm");
			r += App.Desc.brand(child, "hand");
			r += App.Desc.brand(child, "wrist");

			return r;
		}

		tats.arms = arms;

		function back(child) {
			let r = ``;

			if (child.backTat !== 0) {
				switch (child.backTat) {
					case "tribal pattern":
						r += `${He} has a totem of ${his} spirit animal tattooed across ${his} back. `;
						break;
					case "flowers":
						r += `${His} back is covered in hundreds of beautiful flower tattoos; one could spend half an hour examining them all. `;
						break;
					case "counting":
						r += `${His} back is tattooed with tick marks to count the days of ${his} sexual `;
						if (child.weekAcquired === 0) {
							r += `enslavement to you. There are a lot of them. `;
						} else {
							if (((V.week - child.weekAcquired) * 7) + jsRandom(-3, 3)) {
								r += `slavery here. There are only a few. `;
							} else {
								r += `slavery here: ${child.weeksOwned} of them. `;
							}
						}
						break;
					case "advertisements":
						r += `${He} has an ad for the arcology itself tattooed across ${his} back. `;
						break;
					case "rude words":
						r += `'Sex Slave' is tattooed across ${his} back; the tattoo uses the broad space to make each letter ${V.showInches === 2 ? `six inches` : `fifteen centimeters`} tall, so that ${his} identity can be read from hundreds of ${V.showInches === 2 ? `yards` : `meters`} off. `;
						break;
					case "degradation":
						r += `${He} has `;
						if (child.dick > 0) {
							if (child.vagina > -1) {
								if (child.boobs > 600) {
									r += `'Futa Slave'`;
								} else {
									r += `'Hermaphrodite'`;
								}
							} else if (child.boobs > 600) {
								r += `'Shemale Slave'`;
							} else {
								r += `'Dickgirl Slave'`;
							}
						} else {
							if (child.boobs > 800 && child.lactation > 0) {
								r += `'Slave Cow'`;
							} else if (child.visualAge < 15) {
								r += `'Slave Girl'`;
							} else {
								r += `'Sex Slave'`;
							}
						}
						r += `tattooed across ${his} back in gothic script. `;
						break;
					case "Asian art":
						r += `An Asian dragon is tattooed in a circle across ${his} back; the dragon has subtle features that, according to traditional meanings, relate it to ${his} personality. `;
						break;
					case "scenes":
						if (child.vagina === -1) {
							r += `A line-art rendition of ${child.slaveName} ${himself} cumming copiously while riding a dick is tattooed across ${his} entire back. `;
						} else if (child.lactation > 0) {
							r += `A line-art rendition of ${child.slaveName} ${himself} nursing a pair of ${his} fellow slaves is tattooed across ${his} entire back. `;
						} else if (child.skill.vaginal >= 100) {
							r += `A line-art rendition of ${child.slaveName} ${himself} performing reverse cowgirl and spreading ${his} pussy is tattooed across ${his} entire back. `;
						} else if (PC.vagina !== -1) {
							r += `A line-art rendition of ${child.slaveName} ${himself} eating pussy is tattooed across ${his} entire back. `;
						} else {
							r += `A line-art rendition of ${child.slaveName} ${himself} deepthroating a cock is tattooed across ${his} entire back. `;
						}
						break;
					case "bovine patterns":
						r += `${His} back is tattooed to resemble the dappled flank of a cow. `;
						break;
					case "sacrilege":
						r += `${He} has a pair of blackened wings tattooed across ${his} entire back. `;
						break;
					case "sacrament":
						r += `${He} has a pair of pure white wings tattooed across ${his} entire back. `;
						break;
					case "possessive":
						r += `An abridged and stylized version of ${his} slave contract is tattooed across ${his} entire back. `;
						break;
					case "paternalist":
						r += `${He} has your name and the location of your penthouse tattooed on ${his} upper back, so kind citizens can return ${him} to you if ${he} wanders off. `;
						break;
					default:
						r += `${child.backTat}`;
				}
			}

			r += App.Desc.brand(child, "back");

			return r;
		}

		tats.back = back;

		function boobs(child) {
			let r = ``;

			if (child.boobsTat !== 0) {
				switch (child.boobsTat) {
					case "tribal patterns":
						r += `${His} chest and breasts are tattooed with tribal patterns that focus attention on ${his} nipples. `;
						break;
					case "flowers":
						r += `${His} chest is tattooed with a pattern of flowering vines that delicately outlines ${his} breasts. `;
						break;
					case "counting":
						if (child.counter.mammary === 0) {
							r += `There is a horizontal line tattooed across ${his} middle chest for symbols counting ${his} mammary encounters to be inscribed under, once ${he} has some. `;
						} else if (child.counter.mammary < 500) {
							r += `Tiny dick, lips, breast, and even pussy symbols are tattooed all over ${his} cleavage, one for each of ${his} mammary encounters. `;
						} else {
							r += `Tiny dick, lips, breast, and even pussy symbols cover ${his} breasts, cleavage, and sides, one for each of ${his} mammary encounters. `;
						}
						break;
					case "advertisements":
						r += `'Fuck Me!' is tattooed across ${his} chest in such large letters that the word is visible a long way off. `;
						break;
					case "rude words":
						r += `'Fuckslave' is tattooed across ${his} chest in such large letters that the word is visible a long way off. `;
						break;
					case "degradation":
						r += `'${getWrittenTitle(child)}'s' is tattooed across the top of ${his} right breast; 'Bitch' is tattooed across the top of ${his} left. `;
						break;
					case "Asian art":
						r += `An octopus is tattooed on ${his} upper chest; its tentacles reach down to envelop ${his} breasts, their tips reaching for but not quite reaching each nipple. `;
						break;
					case "scenes":
						r += `${His} chest is tattooed with lewd scenes; each of ${his} breasts shows a phallus receiving a titfuck while each of ${his} collarbones shows a woman deepthroating a large phallus. `;
						break;
					case "bovine patterns":
						r += `${His} chest is tattooed to look like a Holstein cow's, with ${his} udders left bare to draw attention to them. `;
						break;
					case "sacrilege":
						r += `Each of ${his} breasts is tattooed with a depiction of a pentagram, with ${his} nipples forming the center. `;
						break;
					case "sacrament":
						r += `Each of ${his} breasts is tattooed with a depiction of a crucifix, with ${his} nipples forming the center. `;
						break;
					case "possessive":
						r += `Your personal symbol is tattooed above ${his} left breast, '${PlayerName()}' above ${his} right, leaving the rest of ${his} chest and breasts bare. `;
						break;
					case "paternalist":
						r += `'${getWrittenTitle(child)}'s' is tattooed across the top of ${his} right breast; 'Darling' is tattooed across the top of ${his} left. `;
						break;
					default:
						r += `${child.boobsTat}`;
						break;
				}
			}

			return r;
		}

		tats.boobs = boobs;

		function butt(child) {
			let r = ``;

			if (child.buttTat !== 0) {
				switch (child.buttTat) {
					case "tribal patterns":
						r += `${His} buttocks and hips are tattooed with tribal patterns that emphasize ${his} womanly curves. `;
						break;
					case "flowers":
						r += `${His} hips are tattooed with a cute floral design. `;
						break;
					case "counting":
						if (child.counter.anal === 0) {
							r += `There is a horizontal line tattooed across the tops of ${his} buttocks for symbols counting ${his} anal exploits to be inscribed under, once ${he} has some. `;
						} else if (child.counter.anal < 500) {
							r += `Tiny dick symbols are tattooed all over the top of ${his} buttocks, one for every time ${he}'s been assfucked. `;
						} else {
							r += `Tiny dick symbols are tattooed all over ${his} entire buttocks, attesting to long anal slavery. `;
						}
						break;
					case "advertisements":
						r += `'Shove' is tattooed across ${his} left buttock; 'It In' is tattooed across ${his} right. `;
						break;
					case "rude words":
						r += `${child.vagina > 0 ? `'No. 2'` : `'No. 1'`} is tattooed across ${his} left buttock; 'Fuckhole' is tattooed across ${his} right. `;
						break;
					case "degradation":
						r += `'Treat it' is tattooed across ${his} left buttock; 'Like a Pussy' is tattooed across ${his} right. `;
						break;
					case "Asian art":
						r += `Each of ${his} buttocks bears a tattoo of a coiled dragon, advancing meaningfully towards ${his} anus. `;
						break;
					case "scenes":
						if (child.dick > 0 && child.balls > 0) {
							r += `${His} buttocks are tattooed with lewd scenes; each of ${his} buttocks shows a smiling shemale offering ${his} anus, while each of ${his} thighs shows a rear view of a shemale simultaneously being sodomized and sodomizing. `;
						} else if (child.dick > 0) {
							r += `${His} buttocks are tattooed with lewd scenes; each of ${his} buttocks shows a gelding, legs together to conceal ${his} cock and display ${his} anus, while each of ${his} thighs shows a gelding being double penetrated in ${his} gaping anus. `;
						} else {
							r += `${His} buttocks are tattooed with lewd scenes; each of ${his} buttocks shows a woman being sodomized while each of ${his} thighs shows a woman being gangbanged in all ${his} holes. `;
						}
						break;
					case "bovine patterns":
						r += `${His} buttocks are tattooed with large black splotches like those of a Holstein cow. `;
						break;
					case "sacrilege":
						r += `'It's not a sin' is tattooed across ${his} left buttock; ${child.vagina > -1 ? `'If I don't enjoy it'` : `'I'm a girl'`} is tattooed across ${his} right. `;
						break;
					case "sacrament":
						r += `'This is my penance' is tattooed across ${his} left buttock; ${child.vagina > -1 ? `'Make me suffer.'` : `'As a slave.'`} is tattooed across ${his} right. `;
						break;
					case "possessive":
						r += `'${PC.slaveName} made me their' is tattooed across ${his} left buttock; with '${desc}' tattooed across ${his} right. `;
						break;
					case "paternalist":
						r += `'Treat it' is tattooed across ${his} left buttock; 'Gently' is tattooed across ${his} right. `;
						break;
					default:
						r += `${child.buttTat}`;
						break;
				}
			}

			r += App.Desc.brand(child, "buttock");

			return r;
		}

		tats.butt = butt;

		function dick(child) {
			let r = ``;

			if (!child.fuckdoll) {
				if (child.dick !== 0 && child.dickTat !== 0) {
					switch (child.dickTat) {
						case "tribal patterns":
							r += `${His} cock is tattooed with tribal patterns. `;
							break;
						case "flowers":
							r += `${His} cock is tattooed with a vine that wraps around its shaft. `;
							break;
						case "counting":
							if (child.counter.penetrative === 0) {
								r += `There is a horizontal line tattooed around the base of ${his} dick for symbols counting ${his} penetrative exploits to be inscribed under, once ${he} has some. `;
							} else if (child.counter.penetrative < 500) {
								r += `Tiny anus, pussy and mouth symbols are tattooed all over ${his} dick, recounting ${his} penetrative exploits. `;
							} else {
								r += `Tiny anus, pussy and mouth symbols are tattooed all over ${his} dick, recounting ${his} penetrative exploits. ${He} has so many that they radiate out across ${his} crotch, too. `;
							}
							break;
						case "advertisements":
							r += `${His} cock reads 'Sissy Slut.' `;
							break;
						case "rude words":
							r += `${His} cock reads 'Bitchstick.' `;
							break;
						case "degradation":
							if (child.anus === 0) {
								r += `${His} cock reads '100% Virgin Anus.' `;
							} else {
								r += `${His} cock reads 'Comes When Assraped.' `;
							}
							break;
						case "Asian art":
							r += `${His} cock has an Asian dragon rushing down each side to the tip. `;
							break;
						case "bovine patterns":
							r += `${His} cock is tattooed to make it look a little like a bulls'. `;
							break;
						case "sacrilege":
							r += `${His} cock is covered in tiny words, each derived from a sacrilegious text. `;
							break;
						case "sacrament":
							r += `${His} cock is covered in tiny words, each derived from a sacred scripture. `;
							break;
						case "possessive":
							r += `${His} cock has an identification barcode tattooed on its side. `;
							break;
						case "paternalist":
							if (child.anus === 0) {
								r += `${His} cock reads 'Still an Ass Virgin.' `;
							} else {
								r += `${His} cock reads 'Comes When Stroked.' `;
							}
							break;
						default:
							r += `${child.dickTat}`;
					}
				}
			}

			return r;
		}

		tats.dick = dick;

		function lips(child) {
			let r = ``;

			if (child.lipsTat !== 0) {
				switch (child.lipsTat) {
					case "tribal patterns":
						r += `${His} face is tattooed with tribal patterns that make ${him} seem mysterious and exotic. `;
						break;
					case "flowers":
						r += `${His} minimal facial tattoos are limited to a cute flower on each cheek. `;
						break;
					case "counting":
						if (child.counter.oral === 0) {
							r += `There is a horizontal line tattooed across the ${his} cheeks for symbols counting ${his} oral totals to be inscribed under, once ${he} has some. `;
						} else if (child.counter.oral < 500) {
							r += `Tiny dick, pussy, and anus symbols are tattooed all over ${his} cheeks, one for every thing ${he}'s sucked. `;
						} else {
							r += `Tiny dick, pussy, and anus symbols are tattooed all over ${his} face, forehead, and neck, one for every thing ${he}'s sucked. `;
						}
						break;
					case "advertisements":
						r += `${His} facial tattoos include 'Facefuck Me' across ${his} forehead, 'Cock' to the left of ${his} mouth, and 'Sucker' to the right of it. `;
						break;
					case "rude words":
						r += `${His} facial tattoos include 'Sex Slave' across ${his} forehead, 'Face' to the left of ${his} mouth, and 'Pussy' to the right of it. `;
						break;
					case "degradation":
						r += `'${desc}' is tattooed across ${his} forehead. `;
						break;
					case "Asian art":
						r += `${He} has a blossoming cherry tree tattooed on one temple; its pink petals are dappled across ${his} cheeks. `;
						break;
					case "bovine patterns":
						r += `${His} face is subtly tattooed to give ${him} a somewhat bovine appearance. `;
						break;
					case "permanent makeup":
						if (child.makeup !== 0) {
							r += `${His} normal makeup is difficult to distinguish from the underlying tattoo. `;
						}
						break;
					case "sacrilege":
						r += `${His} face is subtly tattooed to give ${him} a decidedly demonic appearance. `;
						break;
					case "sacrament":
						r += `${His} face is subtly tattooed to give ${him} a decidedly angelic appearance. `;
						break;
					case "possessive":
						r += `'Property of ${PlayerName()}' is tattooed across ${his} forehead. `;
						break;
					case "paternalist":
						r += `'Beloved ${desc}' is tattooed across one of ${his} cheeks. `;
						break;
					default:
						r += `${child.lipsTat}`;
						break;
				}
			}

			r += App.Desc.brand(child, "lips");

			return r;
		}

		tats.lips = lips;

		function shoulders(child) {
			let r = ``;

			if (child.shouldersTat !== 0) {
				switch (child.shouldersTat) {
					case "tribal patterns":
						r += `Tribal tattoos encircle both ${his} shoulders in swirling patterns. `;
						break;
					case "flowers":
						r += `A gorgeous flower tattoo covers each shoulder. `;
						break;
					case "counting":
						r += `A '¤' tattoo counting ${his} earnings and acquirements cover ${his} shoulders. `;
						break;
					case "advertisements":
						if (child.vagina < 0) {
							r += `'Two Hole Whore' is tattooed on each of ${his} shoulders. `;
						} else {
							r += `'Three Hole Whore' is tattooed on each of ${his} shoulders. `;
						}
						break;
					case "rude words":
						r += `'Dickholster' is tattooed on ${his} left shoulder, and 'Fuckmeat' is tattooed on ${his} right. `;
						break;
					case "degradation":
						r += `'Hurt Me' is tattooed on ${his} left shoulder, and 'Rape Me' on ${his} right. `;
						break;
					case "Asian art":
						r += `Beautiful, colorful tattoos cover ${his} upper body: a line of wind-whipped waves lashing against mountains runs across ${his} collarbone and around both shoulders. `;
						break;
					case "scenes":
						if (child.vagina < 0) {
							r += `A stylized rendition of a dick plunging into an open mouth is tattooed on ${his} left shoulder, and a similar image of a dick entering an anus on ${his} right. `;
						} else {
							r += `A stylized rendition of a dick going into a pussy is tattooed on ${his} left shoulder, and a similar image of a dick entering an anus on ${his} right. `;
						}
						break;
					case "bovine patterns":
						r += `${His} shoulders are flecked with tattoos of bovine blotches. `;
						break;
					case "sacrilege":
						r += `Tattoos depicting demonic nude figures adorn ${his} shoulders. `;
						break;
					case "sacrament":
						r += `Tattoos depicting saintly nude figures adorn ${his} shoulders. `;
						break;
					case "possessive":
						r += `A rendition of your face inside a heart is tattooed onto ${his} left shoulder, and the words 'I love my ${getWrittenTitle(child)}' inside an identical heart are tattooed on ${his} right. `;
						break;
					case "paternalist":
						r += `'Love Me' is tattooed on ${his} left shoulder, and 'Teach Me' on ${his} right. `;
						break;
				}
			}

			r += App.Desc.brand(child, "shoulder");

			return r;
		}

		tats.shoulders = shoulders;

		function stamp(child) {
			let r = ``;

			if (child.stampTat !== 0) {
				switch (child.stampTat) {
					case "tribal patterns":
						r += `${He} has a tribal-patterned tramp stamp. `;
						break;
					case "flowers":
						r += `${He} has a floral-patterned tramp stamp. `;
						break;
					case "counting":
						if (child.anus === 0) {
							r += `${He} has the dashed outline of a cock tattooed across ${his} lower back. `;
						} else {
							r += `${He} has the silhouette of the largest cock ${he}'s ever had up ${his} anus tattooed across ${his} lower back. `;
						}
						break;
					case "advertisements":
						r += `${He} has a tramp stamp which reads 'Fuck my ass!' `;
						break;
					case "rude words":
						r += `${He} has a tramp stamp which reads 'Rear Entrance,' with an arrow pointing downward. `;
						break;
					case "degradation":
						r += `${He} has a tramp stamp formed from gothic lettering that reads 'Anal Whore.' `;
						break;
					case "Asian art":
						r += `A traditional Asian household scene is tattooed on ${his} lower back, showing a rendition of ${child.slaveName}, dressed in rich silks, having sex with a ${PC.title ? `gentleman` : `lady`}. The slave and the ${PC.title ? `gentleman` : `lady`} are kissing passionately as ${PC.title ? `he` : `she`} `;
						if (child.vagina < 0) {
							r += `penetrates the child's anus. `;
						} else if (child.bellyPreg >= 1500 || child.bellyImplant >= 1500) {
							r += `embraces the child's ${child.pregKnown ? `pregnant` : `rounded`} belly. `;
						} else {
							r += `penetrates the child's vagina. `;
						}
						break;
					case "scenes":
						r += `${He} has a tramp stamp which shows a cock entering an anus, recognizably ${hers}. `;
						break;
					case "bovine patterns":
						r += `${He} has an identifying barcode tattooed across ${his} lower back. `;
						break;
					case "sacrilege":
						r += `${He} has a tramp stamp which reads 'Fuck my ass and be damned.' `;
						break;
					case "sacrament":
						r += `${He} has a tramp stamp which reads 'Fuck my ass and be blessed.' `;
						break;
					case "possessive":
						r += `${He} has a tramp stamp which reads '${PC.slaveName}'s ${desc}.' `;
						break;
					case "paternalist":
						r += `${He} has a tramp stamp which reads 'Fuck me slowly' with an arrow pointing downward. `;
						break;
					default:
						r += `${child.stampTat}`;
						break;
				}

				r += App.Desc.brand(child, "lower back");
			}

			return r;
		}

		tats.stamp = stamp;

		function vagina(child) {
			let r = ``;

			if (child.vaginaTat !== 0) {
				switch (child.vaginaTat) {
					case "tribal patterns":
						r += `${His} abdomen is tattooed with tribal patterns that draw the eye down toward ${his} ${child.dick ? `cock` : child.vagina === -1 ? `featureless crotch` : `vagina`}. `;
						break;
					case "flowers":
						r += `${His} abdomen bears a tasteful tattoo of a ${child.dick ? `lily with a large stamen` : `blooming flower`}. `;
						break;
					case "counting":
						if (child.counter.vaginal === 0) {
							r += `${His} abdomen reads 'count begins other side, sorry.' `;
						} else if (child.counter.vaginal < 500) {
							r += `Tiny dick symbols are tattooed all over ${his} abdomen, one for every time ${he}'s been fucked. `;
						} else {
							r += `Tiny dick symbols are tattooed all over ${his} abdomen, one for every time ${he}'s been fucked. There are so many that they spread up to ${his} breasts and around ${his} sides. `;
						}
						break;
					case "advertisements":
						r += `${His} abdomen reads ${child.vagina < 0 ? `'Rear Entrance Other Side.'` : `'Insert Cock' with an arrow pointing downward.`} `;
						break;
					case "rude words":
						r += `${His} abdomen reads ${child.vagina < 0 ? `'Useless, Rape Ass Instead' with an arrow pointing downward` : `'Fucktoy'`}. `;
						break;
					case "degradation":
						r += `${His} abdomen is tattooed with ${child.dick ? `a downward-pointing arrow which reads 'Bounces When Buttfucked.'` : `gothic script that reads '${PC.dick ? PC.vagina ? `Futa` : `Cock` : `Cunt`} Pleaser.'`} `;
						break;
					case "Asian art":
						r += `${He} has formal Asian characters tattooed across ${his} abdomen. To those who do not know the language, they look elegant, but roughly translated, they read `;
						if (child.dick > 0 && canAchieveErection(child)) {
							r += `'dick girl slut.' `;
						} else if (child.dick > 0) {
							r += `'limp dick slut.' `;
						} else if (child.pregKnown && child.bellyPreg >= 100) {
							r += `'pregnant cow.' `;
						} else if (child.physicalAge < 13) {
							r += `'horny little bitch.' `;
						} else {
							r += `'sex slave.' `;
						}
						break;
					case "scenes":
						r += `${His} abdomen is tattooed with lewd scenes. It entices with a depiction of ${child.dick ? child.balls ? `sodomy of a shemale` : `sodomy of a gelding` : child.vagina === -1 ? `sodomy of a null` : `loving intercourse`}. `;
						break;
					case "bovine patterns":
						r += `${His} abdomen is tattooed in a Holstein cow pattern. `;
						break;
					case "sacrilege":
						r += `${His} abdomen is tattooed with a variety of heretical symbols. `;
						break;
					case "sacrament":
						r += `${His} abdomen is tattooed with a variety of religious symbols. `;
						break;
					case "possessive":
						r += `${His} abdomen is tattooed with `;
						if (child.dick > 0 && canAchieveErection(child)) {
							r += `'Dick girl slave `;
						} else if (child.dick > 0) {
							r += `'Limp dick slave `;
						} else if (child.counter.births > 5) {
							r += `'Breeder slave `;
						} else if (child.actualAge < 13) {
							r += `'loli slave `;	// TODO: not sure about this
						} else {
							r += `'Sex slave `;
						}
						r += `of ${getWrittenTitle(child)} ${PC.slaveName}.' `;
						break;
					case "paternalist":
						r += `${His} abdomen is tattooed with a downward-pointing arrow which reads 'Let's come together.' `;
						break;
					case "lewd crest":
						r += `${His} lower abdomen is tattooed with a stylized silhouette that evokes the shape of ${child.ovaries || child.mpreg ? `${his}` : `a`} womb. `;
						break;
					default:
						r += `${child.vaginaTat}`;
						break;
				}
			}

			return r;
		}

		tats.vagina = vagina;
	}

	function upperFace(child) {
		let r = ``;

		if (!child.fuckdoll) {
			if (hasAnyProstheticEyes(child)) {
				r += `${He} has ${App.Desc.eyesType(child)}. `;
			}

			if (child.eyewear === "corrective glasses" || child.eyewear === "blurring glasses" || child.eyewear === "glasses") {
				r += `${He}'s wearing a pair of `;
				switch (child.clothes) {
					case "a ball gown":
					case "a slave gown":
						r += `nice frameless glasses,`;
						break;
					case "a schoolgirl outfit":
						r += `horn-rimmed glasses to improve ${his} schoolgirl look,`;
						break;
					default:
						r += `simple wire-frame glasses,`;
						break;
				}

				if (getWorstVision(child) >= 2) {
					if (child.eyewear === "blurring glasses") {
						r += ` which are designed to blur ${his} vision, making ${him} clumsy. `;
					} else {
						r += ` which are just for show. `;
					}
				} else if (getWorstVision(child) >= 1) {
					if (child.eyewear === "corrective glasses") {
						r += ` which correct ${his} vision. `;
					} else {
						r += ` which do nothing to help ${his} <span class="yellow">nearsightedness</span> and consequent clumsiness. `;
					}
				} else {
					r += ` which, since ${he} is <span class="red">blind,</span> are just for show. ${He} moves carefully as to not bump into things. `;
				}
			} else {
				if (getWorstVision(child) >= 2) {
					if (child.eyewear === "blurring contacts") {
						r += `${He}'s wearing contact lenses designed to blur ${his} vision, making ${him} clumsy. `;
					}
				} else if (getWorstVision(child) >= 1) {
					if (child.eyewear === "corrective contacts") {
						r += `${He}'s wearing contact lenses to correct ${his} <span class="yellow">nearsightedness.</span> `;
					} else {
						r += `${He}'s <span class="yellow">nearsighted,</span> and a bit clumsy as a result. `;
					}
				} else {
					r += `${He} is <span class="red">blind,</span> and moves very carefully as a result. `;
				}
			}

			if (child.earwear === "hearing aids" || child.earwear === "muffling ear plugs" || child.earwear === "deafening ear plugs") {
				r += `In ${his} ears, ${he} wears `;
				if (child.earwear === "hearing aids") {
					r += `a pair of hearing aids, `;
					if (child.hears > -1) {
						r += `which do little to correct ${his} already adequate hearing. `;
					} else if (child.hears === -1) {
						r += `which are used to correct ${his} <span class="yellow">hearing impairment.</span> `;
					} else {
						r += `which, due to ${his} <span class="red">deafness,</span> are useless. `;
					}
				} else if (child.earwear === "muffling ear plugs") {
					r += `a pair of small foam ear plugs, `;
					if (child.hears > -1) {
						r += `which noticeably <span class="yellow">muffle ${his} hearing.</span> `;
					} else if (child.hears === -1) {
						r += `which are pointless, as ${he} is already <span class="yellow">hard of hearing.</span> `;
					} else {
						r += `which are pointless, as ${he} is totally <span class="red">deaf.</span> `;
					}
				} else if (child.earwear === "deafening ear plugs") {
					r += `a pair of large silicone ear plugs, `;
					if (child.hears > -1) {
						r += `which <span class="red">nullify ${his} sense of hearing.</span> `;
					} else if (child.hears === -1) {
						r += `which impair ${his} hearing to the point of <span class="red">deafness.</span> `;
					} else {
						r += `which are pointless, as ${he} is already <span class="red">deaf.</span> `;
					}
				}
			} else {
				if (child.hears === -1) {
					r += `${He}'s <span class="yellow">hard of hearing,</span> and a bit nervous as a result. `;
				} else if (child.hears < -1) {
					r += `${He} is <span class="red">deaf,</span> and overly paranoid as a result. `;
				}
			}
		} else {
			r += `${His} face is featurelessly obscured by the Fuckdoll suit from the top of ${his} head down to ${his} face hole. `;
		}

		return r;
	}

	function vagina(child) {
		let r = ``;
		let pubertyAge = Math.min(child.pubertyAgeXX, child.pubertyAgeXY);

		if (child.dick > 0) {
			if (child.vagina > -1) {
				r += `${His} `;
				if (child.genes === "XX") {
					r += `beautifully natural `;
				} else if (child.ovaries === 1) {
					r += `finely crafted `;
				} else {
					r += `artificial `;
				}
				r += `vagina is located beneath the base of ${his} penis, `;
				if (child.scrotum > 3 && child.balls <= child.scrotum) {
					r += `though it is almost completely hidden by ${his} hanging ballsack. `;
				} else if (child.scrotum > 1 && child.balls > 0) {
					r += `its upper part concealed by ${his} balls. `;
				} else if (canAchieveErection(child)) {
					r += `and merges seamlessly into ${his} shaft. `;
				} else {
					if (child.dick > 3) {
						r += `though it is almost completely hidden by ${his} soft cockmeat. `;
					} else {
						r += `which acts as a soft little dickclit for it. `;
					}
				}

				if (child.clit === 0) {
					r += `The base of ${his} cock is located where the clitoris would be on a normal woman. `;
				}
			}
		}

		if (child.vagina > -1) {
			switch (child.vagina) {
				case 10:
					r += `${His} pussy has been completely ruined from hundreds of births. One could fit their arm into it with minimal effort and ${he} can barely get off from vaginal sex now. ${His} pussy is abyssal, `;
					break;
				case 3:
					r += `${His} pussy is loose, `;
					break;
				case 2:
					r += `${His} pussy is reasonably tight, `;
					break;
				case 1:
					r += `${His} pussy is tight and appealing, `;
					break;
				case 0:
					r += `${He} is a <span class="lime">virgin.</span> ${His} pussy is fresh, `;
					break;
				default:
					r += `${His} pussy is utterly cavernous, `;
					break;
			}

			if (child.labia === 0) {
				r += ``;
			} else if (child.labia === 1) {
				r += ``;
			} else if (child.labia === 2) {
				r += ``;
			} else {
				r += ``;
			}

			if (V.seeRace) {
				switch (child.race) {
					case "white":
						r += `pink pussylips. `;
						break;
					case "asian":
						r += `dark ${child.race} pussylips. `;
						break;
					case "middle eastern":
						r += `dark ${child.race} pussylips. `;
						break;
					case "latina":
						r += `dark ${child.race} pussylips. `;
						break;
					case "black":
						r += `dark ${child.race} pussylips. `;
						break;
					default:
						r += `${child.skin} pussylips. `;
						break;
				}
			} else {
				r += `${child.skin} pussylips. `;
			}

			if (child.vagina > -1) {
				if (child.vaginaLube === 0) {
					if (child.vagina > 0 && !child.chastityVagina) {
						r += `${He} produces very little natural wetness, so ${he} is required to keep ${himself} artificially lubricated for anyone who wishes to use ${his} cunt. `;
					} else {
						r += `${He} produces very little natural wetness. `;
					}

					if (child.prostate !== 0) {
						if (child.dick === 0) {
							r += `In stark contrast, however, ${he}'s been given a functional prostate gland. It's attached to ${his} urethra, of course, so despite ${his} dryness, ${he} squirts ${child.balls ? `semen` : `fluid`} when ${he} orgasms. `;
							if (child.prostate > 2) {
								r += `With the implant embedded in it, that squirt is more like a blast; ${he} will soak ${himself} and anyone near ${him}. `;
							}
						}
					}
				} else if (child.vaginaLube < 2) {
					if (child.aphrodisiacs > 0 || child.inflationType === "aphrodisiacs") {
						r += `The aphrodisiacs have them${child.aphrodisiacs > 1 || child.inflationType === "aphrodisiac" && child.inflation >= 2 ? ` sopping` : ``} wet. `;
					} else if (child.energy > 95) {
						r += `As a nympho, ${he}'s almost constantly wet. `;
					} else if (child.fetishStrength > 60 && child.fetishKnown) {
						r += `Judging by how wet ${he} is, ${he}'s probably fantasizing about`;

						switch (child.fetish) {
							case "buttslut":
								r += `being buttfucked. `;
								break;
							case "cumslut":
								r += `being facefucked. `;
								break;
							case "humiliation":
								r += `being humiliated. `;
								break;
							case "submissive":
								r += `submission. `;
								break;
							case "dom":
								r += `dominating someone. `;
								break;
							case "sadist":
								r += `hurting someone. `;
								break;
							case "masochist":
								r += `pain. `;
								break;
							case "pregnancy":
								r += `getting pregnant. `;
								break;
							case "boobs":
								r += `boobs. `;
								break;
							default:
								r += `getting fucked. `;
								break;
						}
					} else if (child.devotion > 50) {
						r += `As a devoted sex slave, ${he} has no trouble keeping ${himself} wet for ${his} ${getWrittenTitle(child)}. `;
					} else if (child.devotion > 20) {
						r += `As an obedient sex slave, ${he} does ${his} best to keep ${himself} wet for ${his} ${getWrittenTitle(child)}. `;
					}

					if (child.prostate !== 0) {
						if (child.dick === 0) {
							r += `Bizarrely, ${he}'s been given a functional prostate gland. It's attached to ${his} urethra, of course, ${child.balls ? `which in combination with ${his} testicles make ${his} squirt copious amounts of fluids and semen with each orgasm` : `so ${he} squirts copiously when ${he} orgasms`}. `;
							if (child.prostate > 2) {
								r += `With the implant embedded in it; that gush is more like a flood. Changes of clothes are a must with ${him}, as ${he} can and will soak both you, ${himself} and what ${he} is getting fucked over. `;
							}
						}
					}
				} else {
					if (child.aphrodisiacs > 0 || child.inflationType === "aphrodisiac") {
						r += `The combination of the aphrodisiacs and ${his} natural tendency to produce a lot of female lubricant is having a drastic effect. ${His} cunt is absolutely beribboned with femcum, and ${he} smells strongly of wet, clean pussy. `;
					} else if (child.energy > 95) {
						r += `${He} has a naturally wet cunt, and in combination with ${his} nymphomania, it's soaking. ${He} smells of good clean female arousal. `;
					} else if (child.fetishStrength > 60 && child.fetishKnown) {
						r += `${His} naturally wet cunt is almost dripping female lubricant, and ${he} smells of good clean female arousal. ${He}'s probably fantasizing about `;

						switch (child.fetish) {
							case "buttslut":
								r += `being buttfucked. `;
								break;
							case "cumslut":
								r += `being facefucked. `;
								break;
							case "humiliation":
								r += `being humiliated. `;
								break;
							case "submissive":
								r += `submission. `;
								break;
							case "dom":
								r += `dominating someone. `;
								break;
							case "sadist":
								r += `hurting someone. `;
								break;
							case "masochist":
								r += `pain. `;
								break;
							case "pregnancy":
								if (child.pregKnown) {
									r += `growing rounder. `;
								} else {
									r += `getting pregnant. `;
								}
								break;
							case "boobs":
								r += `boobs. `;
								break;
							default:
								r += `getting fucked. `;
								break;
						}
					} else if (child.devotion > 50) {
						r += `${His} cunt is almost always soaking wet, but being near you has ${him} almost dripping. `;
					} else if (child.devotion > 20) {
						r += `${His} cunt is almost always soaking wet, and being near you isn't affecting that. `;
					} else {
						r += `${His} cunt is almost always soaking wet, regardless of ${his} feelings. `;
					}

					if (child.prostate !== 0) {
						if (child.dick === 0) {
							r += `Bizarrely, ${he}'s been given a functional prostate gland. It's attached to ${his} urethra, of course, ${child.balls ? `which in combination with ${his} testicles make ${his} squirt unreasonable volume of fluids and semen with each orgasm` : `meaning that when ${he} orgasms, ${he} squirts an unreasonable volume of fluid`}. `;
							if (child.prostate > 2) {
								r += `With the implant embedded in it; that gush is insane. Everything around ${him} is at risk of being splashed. Changes of clothes are a must with ${him}, as are supplies to mop up afterwards. `;
							}
						}
					}
				}
			}

			r += accessories.vaginal(child);

			if (child.ovaImplant !== 0) {
				switch (child.ovaImplant) {
					case "fertility":
						r += `${His} ovaries have a pair of implants attached to them to encourage ovulation${child.preg < -1 ? `, not that it does ${him} any good` : ``}. `;
						break;
					case "sympathy":
						r += `${His} ovaries have a pair of linked implants attached to them so that when one releases an egg the other does so as well. `;
						break;
					case "asexual":
						r += `One of ${his} ovaries has been replaced with a fabricated sperm sack designed to fertilize any eggs ${he} makes. `;
						break;
				}
			}

			if (!child.dick && !child.balls && child.vagina < 0 && arcology.FSRestart > 60) {
				r += `Society looks fondly on ${his} complete inability to reproduce. `;
			}

			if (child.race === "catgirl") {
				switch (child.pubicHStyle) {
					case "hairless":
					case "bald":
					case "waxed":
						r += `${His} ${child.skin} pubic fur is silky and indistinguishable from the rest of ${his} fur. `;
						break;
					case "in a strip":
						r += `${He} has a cute line of ${child.pubicHColor} fur just above ${his} ${child.dick ? `cock` : child.vagina === -1 ? `smoothness` : `pussy`}. `;
						break;
					case "neat":
						r += `${He} has a patch of ${child.pubicHColor} fur above ${his} ${child.dick ? `cock` : child.vagina === -1 ? `smoothness` : `pussy`}, standing out against the rest of ${his} ${child.skin} fur. `;
						break;
					case "bushy in the front and neat in the rear":
					case "bushy":
						r += `${His} ${child.pubicHColor} fur is particularly bushy around ${his} ${child.dick ? `cock` : child.vagina === -1 ? `smoothness` : `pussy`}. `;
						break;
					case "very bushy":
						r += `${He} has a veritable bush of ${child.pubicHColor} fur around ${his} ${child.dick ? `cock` : child.vagina === -1 ? `smoothness` : `pussy`}, coloring out to ${his} thighs. `;
						break;
					default: {
						r += `${He} has a small patch of ${child.pubicHColor} fur above ${his} ${child.dick > 0 ? `cock` : child.vagina === -1 ? `smoothness` : `pussy`}. `;
					}
				}
			} else {
				switch (child.pubicHStyle) {
					case "hairless":
						r += `${He}'s naturally smooth and hairless. `;
						break;
					case "bald":
						r += `${He} is no longer able to grow pubic hair, leaving ${him} hairless and smooth. `;
						break;
					case "waxed":
						r += `${He}'s waxed and smooth. `;
						break;
					case "in a strip":
						r += `${His} ${child.pubicHColor} pubic hair is waxed into a narrow strip above ${his} ${child.dick ? `cock` : child.vagina === -1 ? `smoothness` : `pussy`}. `;
						break;
					case "neat":
						r += `${His} ${child.pubicHColor} pubic hair is waxed into a neat patch above ${his} ${child.dick ? `cock` : child.vagina === -1 ? `smoothness` : `pussy`}. `;
						break;
					case "bushy in the front and neat in the rear":
						r += `${His} ${child.pubicHColor} pubic hair forms a natural bush above ${his} ${child.dick ? `cock` : child.vagina === -1 ? `smoothness` : `pussy`}. `;
						break;
					case "bushy":
						r += `${His} ${child.pubicHColor} pubic hair forms a natural bush above ${his} ${child.dick ? `cock` : child.vagina === -1 ? `smoothness` : `pussy`}. `;
						break;
					case "very bushy":
						r += `${His} ${child.pubicHColor} pubic hair forms a dense bush above ${his} ${child.dick ? `cock` : child.vagina === -1 ? `smoothness` : `pussy`} that trails up to ${his} navel. `;
						break;
					default:
						if (child.physicalAge < pubertyAge - 2) {
							r += `${He} is too sexually immature to have pubic hair. `;
						} else if (child.physicalAge < pubertyAge - 1) {
							r += `${He} has a few wisps of pubic hair. `;
						} else if (child.physicalAge < pubertyAge) {
							r += `${He} is on the verge of puberty and has a small patch of ${child.pubicHColor} pubic hair above ${his} ${child.dick > 0 ? `cock` : child.vagina === -1 ? `smoothness` : `pussy`}. `;
						}
				}
			}

			r += App.Desc.brand(child, "pubic mound");

			if (!child.dick) {
				if (child.clit > 0) {
					if (child.foreskin === 0) {
						if (child.clit === 1) {
							if (child.devotion > 50) {
								r += `${His} clit is quite large and visibly hard. `;
							} else {
								r += `${His} clit is quite large. `;
							}
							r += `${His} lack of hood makes it even more prominent. `;
						} else if (child.clit === 2) {
							if (child.devotion > 50) {
								r += `${His} clit is huge and visibly erect. `;
							} else {
								r += `${His} clit is huge. `;
							}
							r += `${His} lack of hood, combined with its size, means ${he} can't wear any clothes without being constantly stimulated. `;
						} else if (child.clit === 3) {
							if (child.devotion > 50) {
								r += `${His} clit is enormous, and since it's erect with arousal, it juts out proudly. `;
							} else {
								r += `${His} clit is enormous, almost a pseudophallus. `;
							}
						} else if (child.clit === 4) {
							if (child.devotion > 50) {
								r += `${His} clit has reached the size of an average penis. It stands at attention, but due to lack of erectile tissues, it can't reach the same hardness a penis would. `;
							} else {
								r += `${His} clit has reached the size of an average penis. `;
							}
						} else {
							if (child.devotion > 50) {
								r += `${His} clit is massive, having reached the size of a large penis. It is only semi-erect, since lack of erectile tissues means it can never become fully erect. `;
							} else {
								r += `${His} clit is massive, having reached the size of a large penis. `;
							}
						}
					} else if (child.foreskin === 1) {
						if (child.clit === 1) {
							if (child.devotion > 50) {
								r += `${His} clit is quite large and visibly hard. `;
							} else {
								r += `${His} clit is quite large. `;
							}
							r += `${His} clitoral hood is stretched thin trying to cover it. `;
						} else if (child.clit === 2) {
							if (child.devotion > 50) {
								r += `${His} clit is huge and visibly erect. `;
							} else {
								r += `${His} clit is huge. `;
							}
							r += `${His} small hood is no longer able to cover it completely, and a large part of ${his} clitoris is always exposed. `;
						} else if (child.clit === 3) {
							if (child.devotion > 50) {
								r += `${His} clit is enormous, and since it's erect with arousal, it juts out proudly. `;
							} else {
								r += `${His} clit is enormous, almost a pseudophallus. `;
							}
							r += `${His} hood can no longer contain it and has slid back, causing ${his} clitoris to be always exposed. `;
						} else if (child.clit === 4) {
							if (child.devotion > 50) {
								r += `${His} clit has reached the size of an average penis. It stands at attention, but due to lack of erectile tissues, it can't reach the same hardness a penis would. `;
							} else {
								r += `${His} clit has reached the size of an average penis. `;
							}
							r += `${His} hood can no longer contain it and has slid back, causing ${his} clitoris to be always exposed. `;
						}
					} else if (child.foreskin === 2) {
						if (child.clit === 1) {
							if (child.devotion > 50) {
								r += `${His} clit is quite large and visibly hard. `;
							} else {
								r += `${His} clit is quite large. `;
							}
							r += `It is completely covered by its hood. `;
						} else if (child.clit === 2) {
							if (child.devotion > 50) {
								r += `${His} clit is huge and visibly erect. `;
							} else {
								r += `${His} clit is huge. `;
							}
							r += `Its hood is stretched thin trying to cover it. `;
						} else if (child.clit === 3) {
							if (child.devotion > 50) {
								r += `${His} clit is enormous, and since it's erect with arousal, it juts out proudly. `;
							} else {
								r += `${His} clit is enormous, almost a pseudophallus. `;
							}
							r += `It's large enough that the hood can cover only half of it. `;
						} else if (child.clit === 4) {
							if (child.devotion > 50) {
								r += `${His} clit has reached the size of an average penis. It stands at attention, but due to lack of erectile tissues, it can't reach the same hardness a penis would. `;
							} else {
								r += `${His} clit has reached the size of an average penis. `;
							}
							r += `${His} hood can no longer contain it and has slid back, causing ${his} clitoris to be always exposed. `;
						} else {
							if (child.devotion > 50) {
								r += `${His} clit is massive, having reached the size of a large penis. It is only semi-erect, since lack of erectile tissues means it can never become fully erect. `;
							} else {
								r += `${His} clit is massive, having reached the size of a large penis. `;
							}
							r += `${His} hood can no longer contain it and has slid back, causing ${his} clitoris to be always exposed. `;
						}
					} else if (child.foreskin === 3) {
						if (child.clit === 1) {
							if (child.devotion > 50) {
								r += `${His} clit is quite large and visibly hard. `;
							} else {
								r += `${His} clit is quite large. `;
							}
							r += `However, the hood covering it is also quite large, making stimulation difficult. `;
						} else if (child.clit === 2) {
							if (child.devotion > 50) {
								r += `${His} clit is huge and visibly erect. `;
							} else {
								r += `${His} clit is huge. `;
							}
							r += `${His} large hood completely covers it. `;
						} else if (child.clit === 3) {
							if (child.devotion > 50) {
								r += `${His} clit is enormous, and since it's erect with arousal, it juts out proudly. `;
							} else {
								r += `${His} clit is enormous, almost a pseudophallus. `;
							}
							r += `${His} large hood covers all but the tip of ${his} clit, even when aroused. `;
						} else if (child.clit === 4) {
							if (child.devotion > 50) {
								r += `${His} clit has reached the size of an average penis. It stands at attention, but due to lack of erectile tissues, it can't reach the same hardness a penis would. `;
							} else {
								r += `${His} clit has reached the size of an average penis. `;
							}
							r += `Even ${his} large hood can't cover it, leaving over half of the clit exposed. `;
						} else {
							if (child.devotion > 50) {
								r += `${His} clit is massive, having reached the size of a large penis. It is only semi-erect, since lack of erectile tissues means it can never become fully erect. `;
							} else {
								r += `${His} clit is massive, having reached the size of a large penis. `;
							}
							r += `${His} hood can no longer contain it and has slid back, causing ${his} clitoris to be always exposed. `;
						}
					} else {
						if (child.clit === 1) {
							if (child.devotion > 50) {
								r += `${His} clit is quite large and visibly hard. `;
							} else {
								r += `${His} clit is quite large. `;
							}
							r += `However, the large, thick hood covering it makes any stimulation difficult. `;
						} else if (child.clit === 2) {
							if (child.devotion > 50) {
								r += `${His} clit is huge and visibly erect. `;
							} else {
								r += `${His} clit is huge. `;
							}
							r += `However, the large, thick hood covering it makes any stimulation difficult. `;
						} else if (child.clit === 3) {
							if (child.devotion > 50) {
								r += `${His} clit is enormous, and since it's erect with arousal, it juts out proudly. `;
							} else {
								r += `${His} clit is enormous, almost a pseudophallus. `;
							}
							r += `Matching its size is the thick hood covering it. `;
						} else if (child.clit === 4) {
							if (child.devotion > 50) {
								r += `${His} clit has reached the size of an average penis. It stands at attention, but due to lack of erectile tissues, it can't reach the same hardness a penis would. `;
							} else {
								r += `${His} clit has reached the size of an average penis. `;
							}
							r += `${His} large hood covering over half of it adds to its penis-like appearance. `;
						} else {
							if (child.devotion > 50) {
								r += `${His} clit is massive, having reached the size of a large penis. It is only semi-erect, since lack of erectile tissues means it can never reach full erection. `;
							} else {
								r += `${His} clit is massive, having reached the size of a large penis. `;
							}
							r += `Not even its large hood can contain it, leaving over half of it exposed. `;
						}
					}
				}
			}

			if (V.showBodyMods) {
				r += piercings.vagina(child);
				r += piercings.clit(child);
				r += tats.vagina(child);
			}

			if (child.rules.release.masturbation === 1) {
				if ((child.aphrodisiacs > 0 || child.inflationType === "aphrodisiac") && child.drugs !== "priapism agent") {
					if (child.aphrodisiacs > 1 || (child.inflationType === "aphrodisiac" && child.inflation > 1)) {
						if (child.dick !== 0 && child.hormoneBalance >= 100 && !hasAnyArms(child)) {
							r += `The extreme dose of aphrodisiacs combined with the hormones that keep ${him} flaccid have ${him} in a state of extreme sexual frustration; ${he}'s${(child.fetish === "buttslut" || child.sexualFlaw !== "hates anal") && child.counter.anal > 9 ? ` unconsciously humping ${his} ass against whatever's next to ${him} for anal stimulation and` : ``} humping ${his} dick against whatever ${he} can manage to mount without limbs. ${child.inflationType === "aphrodisiac" ? `${His} efforts force ${his} distended middle to jiggle around, stirring up the aphrodisiacs contained in ${his} gut and strengthening their effects even more. ` : ``}`;
						} else if (child.dick !== 0 && child.balls > 0 && child.ballType === "sterile" && !hasAnyArms(child)) {
							r += `The extreme dose of aphrodisiacs combined with the chemical castration that keeps ${him} flaccid have ${him} in a state of extreme sexual frustration; ${he}'s${(child.fetish === "buttslut" || child.sexualFlaw !== "hates anal") && child.counter.anal > 9 ? ` unconsciously humping ${his} ass against whatever's next to ${him} for anal stimulation and` : ``} humping ${his} limp dick against whatever ${he} can manage to mount without limbs. ${child.inflationType === "aphrodisiac" ? `${His} efforts force ${his} distended middle to jiggle around, stirring up the aphrodisiacs contained in ${his} gut and strengthening their effects even more. ` : ``}`;
						} else if (child.dick !== 0 && !child.balls && !hasAnyArms(child)) {
							r += `The extreme dose of aphrodisiacs combined with the lack of balls that keeps ${him} flaccid have ${him} in a state of extreme sexual frustration; ${he}'s ${(child.fetish === "buttslut" || child.sexualFlaw !== "hates anal") && child.counter.anal > 9 ? ` unconsciously humping ${his} ass against whatever's next to ${him} for anal stimulation and` : ``} humping ${his} limp dick against whatever ${he} can manage to mount without limbs. ${child.inflationType === "aphrodisiac" ? `${His} efforts force ${his} distended middle to jiggle around, stirring up the aphrodisiacs contained in ${his} gut and strengthening their effects even more. ` : ``}`;
						} else if (child.dick !== 0 && child.hormoneBalance >= 100) {
							r += `The extreme dose of aphrodisiacs combined with the hormones that keep ${him} flaccid have ${him} in a state of extreme sexual frustration; ${he}'s rubbing ${his} limp dick distractedly${(child.fetish === "buttslut" || child.sexualFlaw !== "hates anal") && child.counter.anal > 9 ? ` and unconsciously humping ${his} ass against whatever's next to ${him} for anal stimulation` : ``}. ${child.inflationType === "aphrodisiac" ? `${His} efforts force ${his} distended middle to jiggle around, stirring up the aphrodisiacs contained in ${his} gut and strengthening their effects even more. ` : ``}`;
						} else if (child.dick !== 0 && !child.balls) {
							r += `The extreme dose of aphrodisiacs combined with the lack of balls that keeps ${him} flaccid have ${him} in a state of extreme sexual frustration; ${he}'s rubbing ${his} limp dick distractedly${(child.fetish === "buttslut" || child.sexualFlaw !== "hates anal") && child.counter.anal > 9 ? ` and unconsciously humping ${his} ass against whatever's next to ${him} for anal stimulation` : ``}. ${child.inflationType === "aphrodisiac" ? `${His} efforts force ${his} distended middle to jiggle around, stirring up the aphrodisiacs contained in ${his} gut and strengthening their effects even more. ` : ``}`;
						} else if (child.dick !== 0 && !canAchieveErection(child)) {
							r += `The extreme dose of aphrodisiacs combined with ${his} inability to become erect have ${him} in a state of extreme sexual frustration; ${he}'s rubbing ${his} limp dick distractedly${(child.fetish === "buttslut" || child.sexualFlaw !== "hates anal") && child.counter.anal > 9 ? ` and unconsciously humping ${his} ass against whatever's next to ${him} for anal stimulation` : ``}. ${child.inflationType === "aphrodisiac" ? `${His} efforts force ${his} distended middle to jiggle around, stirring up the aphrodisiacs contained in ${his} gut and strengthening their effects even more. ` : ``}`;
						} else if (child.dick !== 0) {
							r += `The extreme dose of aphrodisiacs has ${his} cock painfully erect and precum drips from its head. `;
						}
					} else {
						if (child.dick !== 0 && child.hormoneBalance >= 100 && isAmputee(child)) {
							r += `The aphrodisiacs combined with the hormones that keep ${him} flaccid have ${him} sexually frustrated; ${he}'s ${(child.fetish === "buttslut" || child.sexualFlaw !== "hates anal") && child.counter.anal > 9 ? ` unconsciously humping ${his} ass against whatever's next to ${him} for anal stimulation and` : ``} humping ${his} dick against whatever ${he} can manage to mount without limbs. ${child.inflationType === "aphrodisiac" ? `${His} efforts force ${his} distended middle to jiggle around, stirring up the aphrodisiacs contained in ${his} gut and strengthening their effects even more. ` : ``}`;
						} else if (child.dick !== 0 && child.balls > 0 && child.ballType === "sterile" && isAmputee(child)) {
							r += `The aphrodisiacs combined with the chemical castration that keeps ${him} flaccid have ${him} sexually frustrated; ${he}'s ${(child.fetish === "buttslut" || child.sexualFlaw !== "hates anal") && child.counter.anal > 9 ? ` unconsciously humping ${his} ass against whatever's next to ${him} for anal stimulation and` : ``} humping ${his} dick against whatever ${he} can manage to mount without limbs. ${child.inflationType === "aphrodisiac" ? `${His} efforts force ${his} distended middle to jiggle around, stirring up the aphrodisiacs contained in ${his} gut and strengthening their effects even more. ` : ``}`;
						} else if (child.dick !== 0 && !child.balls && isAmputee(child)) {
							r += `The aphrodisiacs combined with the lack of balls that keeps ${him} flaccid have ${him} sexually frustrated; ${he}'s ${(child.fetish === "buttslut" || child.sexualFlaw !== "hates anal") && child.counter.anal > 9 ? ` unconsciously humping ${his} ass against whatever's next to ${him} for anal stimulation and` : ``} humping ${his} dick against whatever ${he} can manage to mount without limbs. ${child.inflationType === "aphrodisiac" ? `${His} efforts force ${his} distended middle to jiggle around, stirring up the aphrodisiacs contained in ${his} gut and strengthening their effects even more. ` : ``}`;
						} else if (child.dick !== 0 && child.hormoneBalance >= 100) {
							r += `The aphrodisiacs combined with the hormones that keep ${him} flaccid have ${him} sexually frustrated; ${he}'s touching ${his} limp dick distractedly${(child.fetish === "buttslut" || child.sexualFlaw !== "hates anal") && child.counter.anal > 9 ? ` and unconsciously rubbing ${his} ass against whatever's next to ${him}` : ``}. ${child.inflationType === "aphrodisiac" ? `${His} efforts force ${his} distended middle to jiggle around, stirring up the aphrodisiacs contained in ${his} gut and strengthening their effects even more. ` : ``}`;
						} else if (child.dick !== 0 && !child.balls) {
							r += `The aphrodisiacs combined with the lack of balls that keeps ${him} flaccid have ${him} sexually frustrated; ${he}'s touching ${his} limp dick distractedly${(child.fetish === "buttslut" || child.sexualFlaw !== "hates anal") && child.counter.anal > 9 ? ` and unconsciously rubbing ${his} ass against whatever's next to ${him}` : ``}. ${child.inflationType === "aphrodisiac" ? `${His} efforts force ${his} distended middle to jiggle around, stirring up the aphrodisiacs contained in ${his} gut and strengthening their effects even more. ` : ``}`;
						}
					}
				}
			}

			if (child.vagina === -1) {
				r += `${V.seeDicks < 100 && child.anus > 0 ? `Since ${he} lacks a vagina, ${he} takes it up ${V.seeRace ? `${his} ${child.race}` : `the`} ass instead.` : ``}`;
			} else if (child.skill.vaginal >= 100) {
				r += `${He} is a <span class="skill">vanilla sex master.</span> `;
			} else if (child.skill.vaginal > 60) {
				r += `${He} is a <span class="skill">vanilla sex expert.</span> `;
			} else if (child.skill.vaginal > 30) {
				r += `${He} is <span class="skill">skilled at vanilla sex.</span> `;
			} else if (child.skill.vaginal > 10) {
				r += `${He} has <span class="skill">basic knowledge about vanilla sex.</span> `;
			} else {
				r += `${He} is unskilled at vaginal sex. `;
			}
		}

		return r;
	}

	function waist(child) {
		let r = ``;
		let belly;

		if (child.belly >= 1500) {
			belly = bellyAdjective(child);
		}

		r += `${He} has `;

		if (child.waist > 95) {
			r += `a badly <span class="red">masculine waist</span> that ruins ${his} figure${child.weight > 30 ? ` and greatly exaggerates how fat ${he} is` : ` despite how thin ${he} is`}. `;
			if (child.belly >= 1500) {
				if (child.belly >= 750000) {
					r += `${His} ${belly} belly grotesquely bulges around ${his} thick waist. `;
					if (child.preg > 3) {
						if (child.belly > child.pregAdaptation * 1000) {
							r += `${His} waist is horribly distended by ${his} bursting womb in a last ditch effort to find more room for ${his} children, leaving ${his} original waistline barely visible from behind. `;
						} else {
							r += `However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline. `;
						}
					}
				} else if (child.belly < 300000) {
					r += `${His} ${belly} belly is hidden by ${his} thick waist. `;
				} else if (child.belly < 450000) {
					r += `${His} ${belly} belly can be seen around ${his} thick waist. `;
				} else if (child.belly < 600000) {
					r += `${His} ${belly} belly can clearly be seen around ${his} thick waist. `;
					if (child.preg > 3) {
						if (child.belly > child.pregAdaptation * 1000) {
							r += `${His} waist is swollen wider than usual by ${his} crowded womb in its search for more room, leaving ${his} original waistline only visible from behind. `;
						} else {
							r += `However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline. `;
						}
					}
				} else if (child.belly < 750000) {
					r += `${His} ${belly} belly lewdly bulges around ${his} thick waist. `;
					if (child.preg > 3) {
						if (child.belly > child.pregAdaptation * 1000) {
							r += `${His} waist is greatly distended by ${his} overfilled womb in its desperate search for more room, leaving ${his} original waistline only visible from behind. `;
						} else {
							r += `However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline. `;
						}
					}
				}
			}
		} else if (child.waist > 40) {
			r += `a broad, <span class="red">ugly waist</span> that makes ${him} look mannish${child.weight > 30 ? ` and exaggerates how fat ${he} is` : ` despite how thin ${he} is`}. `;
			if (child.belly >= 1500) {
				if (child.belly >= 750000) {
					r += `${His} ${belly} belly grotesquely bulges around ${his} chunky waist. `;
					if (child.preg > 3) {
						if (child.belly > child.pregAdaptation * 1000) {
							r += `${His} waist is horribly distended by ${his} bursting womb in a last ditch effort to find more room for ${his} children, leaving ${his} original waistline barely visible from behind. `;
						} else {
							r += `However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline. `;
						}
					}
				} else if (child.belly < 150000) {
					r += `${His} ${belly} belly is hidden by ${his} chunky waist. `;
				} else if (child.belly < 450000) {
					r += `${His} ${belly} belly can be seen around ${his} chunky waist. `;
				} else if (child.belly < 600000) {
					r += `${His} ${belly} belly can clearly be seen around ${his} chunky waist. `;
					if (child.belly > child.pregAdaptation * 1000) {
						r += `${His} waist is swollen wider than usual by ${his} crowded womb in its search for more room, leaving ${his} original waistline only visible from behind. `;
					} else {
						r += `However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline. `;
					}
				} else if (child.belly < 750000) {
					r += `${His} ${belly} belly lewdly bulges around ${his} chunky waist. `;
					if (child.belly > child.pregAdaptation * 1000) {
						r += `${His} waist is greatly distended by ${his} overfilled womb in its desperate search for more room, leaving ${his} original waistline only visible from behind. `;
					} else {
						r += `However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline. `;
					}
				}
			}
		} else if (child.waist > 10) {
			r += `an <span class="red">unattractive waist</span> that conceals ${his} girlish figure${child.weight > 30 ? ` and accentuates how fat ${he} is` : ` despite how thin ${he} is`}. `;
			if (child.belly >= 1500) {
				if (child.belly >= 750000) {
					r += `${His} ${belly} belly grotesquely bulges around ${his} waist. `;
					if (child.preg > 3) {
						if (child.belly > child.pregAdaptation * 1000) {
							r += `${His} waist is horribly distended by ${his} bursting womb in a last ditch effort to find more room for ${his} children, leaving ${his} original waistline barely visible from behind. `;
						} else {
							r += `However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline. `;
						}
					}
				} else if (child.belly < 10000) {
					r += `From behind, ${his} figure hides ${his} ${belly} belly. `;
				} else if (child.belly < 200000) {
					r += `From behind, ${his} figure barely hides ${his} ${belly} belly. `;
				} else if (child.belly < 300000) {
					r += `${His} ${belly} belly can be seen around ${his} waist. `;
				} else if (child.belly < 450000) {
					r += `${His} ${belly} belly can clearly be seen around ${his} waist. `;
				} else if (child.belly < 600000) {
					r += `${His} ${belly} belly can clearly be seen around ${his} waist. `;
					if (child.belly > child.pregAdaptation * 1000) {
						r += `${His} waist is swollen wider than usual by ${his} crowded womb in its search for more room, leaving ${his} original waistline only visible from behind. `;
					} else {
						r += `However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline. `;
					}
				} else if (child.belly < 750000) {
					r += `${His} ${belly} belly lewdly bulges around ${his} waist. `;
					if (child.belly > child.pregAdaptation * 1000) {
						r += `${His} waist is greatly distended by ${his} overfilled womb in its desperate search for more room, leaving ${his} original waistline only visible from behind. `;
					} else {
						r += `However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline. `;
					}
				}
			}
		} else if (child.waist >= -10) {
			r += `an average waist for a ${boy}${child.weight > 30 ? `, though it looks broader since ${he}'s fat` : child.weight < -30 ? `, though it looks narrower since ${he}'s thin` : ``}. `;
			if (child.belly >= 1500) {
				if (child.belly >= 750000) {
					r += `${His} ${belly} belly grotesquely bulges around ${his} waist. `;
					if (child.preg > 3) {
						if (child.belly > child.pregAdaptation * 1000) {
							r += `${His} waist is horribly distended by ${his} bursting womb in a last ditch effort to find more room for ${his} children, leaving ${his} original waistline barely visible from behind. `;
						} else {
							r += `However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline. `;
						}
					}
				} else if (child.belly < 10000) {
					r += `From behind, ${his} figure hides ${his} ${belly} belly. `;
				} else if (child.belly < 200000) {
					r += `From behind, ${his} figure barely hides ${his} ${belly} belly. `;
				} else if (child.belly < 300000) {
					r += `${His} ${belly} belly can be seen around ${his} waist. `;
				} else if (child.belly < 450000) {
					r += `${His} ${belly} belly can clearly be seen around ${his} waist. `;
				} else if (child.belly < 600000) {
					r += `${His} ${belly} belly can clearly be seen around ${his} waist. `;
					if (child.belly > child.pregAdaptation * 1000) {
						r += `${His} waist is swollen wider than usual by ${his} crowded womb in its search for more room, leaving ${his} original waistline only visible from behind. `;
					} else {
						r += `However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline. `;
					}
				} else if (child.belly < 750000) {
					r += `${His} ${belly} belly lewdly bulges around ${his} waist. `;
					if (child.belly > child.pregAdaptation * 1000) {
						r += `${His} waist is greatly distended by ${his} overfilled womb in its desperate search for more room, leaving ${his} original waistline only visible from behind. `;
					} else {
						r += `However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline. `;
					}
				}
			}
		} else if (child.waist >= -40) {
			r += `a nice <span class="pink">feminine waist</span> that gives ${him} a girlish figure${child.weight > 30 ? ` despite ${his} extra weight` : child.weight < -30 ? ` and accentuates how thin ${he} is` : ``}. `;
			if (child.belly >= 1500) {
				if (child.belly >= 750000) {
					r += `${His} ${belly} belly grotesquely bulges around ${his} waist. `;
					if (child.preg > 3) {
						if (child.belly > child.pregAdaptation * 1000) {
							r += `${His} waist is horribly distended by ${his} bursting womb in a last ditch effort to find more room for ${his} children, leaving ${his} original waistline barely visible from behind. `;
						} else {
							r += `However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline. `;
						}
					}
				} else if (child.belly < 10000) {
					r += `From behind, ${his} figure hides ${his} ${belly} belly. `;
				} else if (child.belly < 100000) {
					r += `From behind, ${his} figure barely hides ${his} ${belly} belly. `;
				} else if (child.belly < 300000) {
					r += `${His} ${belly} belly can be seen around ${his} waist. `;
				} else if (child.belly < 450000) {
					r += `${His} ${belly} belly can clearly be seen around ${his} waist. `;
				} else if (child.belly < 600000) {
					r += `${His} ${belly} belly can clearly be seen around ${his} waist. `;
					if (child.belly > child.pregAdaptation * 1000) {
						r += `${His} waist is swollen wider than usual by ${his} crowded womb in its search for more room, leaving ${his} original waistline only visible from behind. `;
					} else {
						r += `However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline. `;
					}
				} else if (child.belly < 750000) {
					r += `${His} ${belly} belly lewdly bulges around ${his} waist. `;
					if (child.belly > child.pregAdaptation * 1000) {
						r += `${His} waist is greatly distended by ${his} overfilled womb in its desperate search for more room, leaving ${his} original waistline only visible from behind. `;
					} else {
						r += `However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline. `;
					}
				}
			}
		} else if (child.waist >= -95) {
			r += `a hot <span class="pink">wasp waist</span> that gives ${him} an hourglass figure${child.weight > 30 ? ` despite ${his} extra weight` : child.weight < -30 ? ` further accentuated by how thin ${he} is` : ``}. `;
			if (child.belly >= 1500) {
				if (child.belly >= 750000) {
					r += `${His} ${belly} belly grotesquely bulges around ${his} narrow waist and continues ${child.belly >= 1000000 ? `quite the distance` : `over half a ${V.showInches === 2 ? `yard` : `meter`}`} farther to either side. `;
					if (child.preg > 3) {
						if (child.belly > child.pregAdaptation * 1000) {
							r += `${His} waist is horribly distended by ${his} bursting womb in a last ditch effort to find more room for ${his} children, leaving ${his} original waistline barely visible from behind. `;
						} else {
							r += `However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline. `;
						}
					}
				} else if (child.belly < 5000) {
					r += `From behind, ${his} narrow figure hides ${his} ${belly} belly. `;
				} else if (child.belly < 80000) {
					r += `From behind, ${his} narrow figure barely hides ${his} ${belly} belly. `;
				} else if (child.belly < 100000) {
					r += `${His} ${belly} belly can be seen around ${his} narrow waist. `;
				} else if (child.belly < 450000) {
					r += `${His} ${belly} belly lewdly extends past ${his} narrow waist. `;
				} else if (child.belly < 600000) {
					r += `${His} ${belly} belly lewdly distends far to either side of ${his} narrow waist. `;
					if (child.belly > child.pregAdaptation * 1000) {
						r += `${His} waist is swollen wider than usual by ${his} crowded womb in its search for more room, leaving ${his} original waistline only visible from behind. `;
					} else {
						r += `However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline. `;
					}
				} else if (child.belly < 750000) {
					r += `${His} ${belly} belly lewdly bulges to either side of ${his} narrow waist and continues for nearly half a ${V.showInches === 2 ? `yard` : `meter`} in both directions. `;
					if (child.belly > child.pregAdaptation * 1000) {
						r += `${His} waist is greatly distended by ${his} overfilled womb in its desperate search for more room, leaving ${his} original waistline barely visible from behind. `;
					} else {
						r += `However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline. `;
					}
				}
			}
		} else {
			r += `an <span class="pink">absurdly narrow waist</span> that gives ${him} a cartoonishly hourglass figure${child.weight > 30 ? ` made even more ludicrous by ${his} extra weight` : child.weight < -30 ? ` made even more ludicrous by how thin ${he} is` : ``}. `;
			if (child.belly >= 1500) {
				if (child.belly >= 750000) {
					r += `${His} ${belly} belly grotesquely bulges around ${his} narrow waist and continues ${child.belly >= 1000000 ? `quite the distance` : `over half a ${V.showInches === 2 ? `yard` : `meter`}`} farther to either side. `;
					if (child.preg > 3) {
						if (child.belly > child.pregAdaptation * 1000) {
							r += `${His} waist is horribly distended by ${his} bursting womb in a last ditch effort to find more room for ${his} children, leaving ${his} original waistline barely visible from behind. `;
						} else {
							r += `However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline. `;
						}
					}
				} else if (child.belly < 2000) {
					r += `From behind, ${his} narrow figure hides ${his} ${belly} belly. `;
				} else if (child.belly < 5000) {
					r += `From behind, ${his} narrow figure barely hides ${his} ${belly} belly. `;
				} else if (child.belly < 8000) {
					r += `${His} ${belly} belly can be seen around ${his} narrow waist. `;
				} else if (child.belly < 15000) {
					r += `${His} ${belly} belly lewdly extends past ${his} narrow waist. `;
				} else if (child.belly < 45000) {
					r += `${His} ${belly} belly lewdly distends far to either side of ${his} narrow waist. `;
				} else if (child.belly < 600000) {
					r += `${His} ${belly} belly lewdly distends far to either side of ${his} narrow waist. `;
					if (child.belly > child.pregAdaptation * 1000) {
						r += `${His} waist is swollen wider than usual by ${his} crowded womb in its search for more room, leaving ${his} original waistline only visible from behind. `;
					} else {
						r += `However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline. `;
					}
				} else if (child.belly < 750000) {
					r += `${His} ${belly} belly lewdly bulges to either side of ${his} narrow waist and continues for nearly half a ${V.showInches === 2 ? `yard` : `meter`} in both directions. `;
					if (child.belly > child.pregAdaptation * 1000) {
						r += `${His} waist is greatly distended by ${his} overfilled womb in its desperate search for more room, leaving ${his} original waistline barely visible from behind. `;
					} else {
						r += `However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline. `;
					}
				}
			}
		}

		return r;
	}

	// instantiation
	piercings();
	tats();
	accessories();

	/* 000-250-006 */
	/* FIXME - DOM this shit and render with App.Art.SlaveArtElement.
	if (V.seeImages) {
		if (V.imageChoice === 1) {
			r += `<div class="imageRef lrgVector"><div class="mask">&nbsp;</div>${SlaveArt(child, 3, 0)}</div> `;
		} else {
			r += `<div class="imageRef lrgRender"><div class="mask">&nbsp;</div>${SlaveArt(child, 3, 0)}</div> `;
		}
	}
	*/
	/* 000-250-006 */

	r += `&nbsp;&nbsp;&nbsp;&nbsp; `;

	r += `<span id="childName" class="slave name simple">${SlaveFullName(child)}</span> `;

	if (child.custom.label) {
		r += ` (<span class="custom-label">${child.custom.label}</span>) `;
	}

	r += ` is `;

	if (child.devotion < -95) {
		r += `a <span class="devotion hateful">hate-filled,</span> `;
	} else if (child.devotion < -50) {
		r += `a <span class="devotion hateful">hateful,</span> `;
	} else if (child.devotion < -20) {
		r += `a <span class="devotion resistant">reluctant,</span> `;
	} else if (child.devotion <= 20) {
		r += `a <span class="devotion ambivalent">hesitant,</span> `;
	} else if (child.devotion <= 50) {
		r += `an <span class="devotion accept">accepting,</span> `;
	} else if (child.devotion <= 95) {
		r += `a <span class="devotion devoted">devoted,</span> `;
	} else {
		r += `a <span class="devotion worship">worshipful,</span> `;
	}

	if (child.trust < -95) {
		r += `<span class="trust extremely-terrified">abjectly terrified</span> `;
	} else if (child.devotion < -50) {
		r += `<span class="trust terrified">terrified</span> `;
	} else if (child.devotion < -20) {
		r += `<span class="trust frightened">frightened</span> `;
	} else if (child.devotion <= 20) {
		r += `<span class="trust fearful">fearful</span> `;
	} else if (child.devotion <= 50) {
		if (child.devotion < -20) {
			r += `<span class="defiant careful">careful</span> `;
		} else {
			r += `<span class="trust careful">careful</span> `;
		}
	} else if (child.devotion <= 95) {
		if (child.devotion < -20) {
			r += `<span class="defiant bold">bold</span> `;
		} else {
			r += `<span class="trust trusting">trusting</span> `;
		}
	} else {
		if (child.devotion < -20) {
			r += `<span class="defiant full">defiant</span> `;
		} else {
			r += `<span class="trust prof-trusting">profoundly trusting</span> `;
		}
	}

	r += `<strong><span class="coral">${SlaveTitle(child)}.</span></strong> `;

	r += App.Desc.ageAndHealth(child);

	if (!market) {
		if (V.clinic && V.clinicUpgradeScanner) {
			r += `${capFirstChar(V.clinicName)}'s scanners `;
			if (child.chem > 15) {
				r += `score long term carcinogenic buildup in ${his} body at <span class="cyan">${Math.ceil(child.chem / 10)}.</span> `;
			} else {
				r += `confirm that ${he} has good prospects for long term health. `;
			}
		}

		if (V.showSexualHistory && V.ui !== "start") {
			let weeksOwned = V.week - child.weekAcquired;

			r += `${He} was born in ${arcology.name} ${weeksOwned} week${weeksOwned !== 1 ? `s` : ``} ago`;

			let oral = child.counter.oral;
			let vaginal = child.counter.vaginal;
			let anal = child.counter.anal;
			let mammary = child.counter.mammary;
			let penetrative = child.counter.penetrative;
			let total = oral + vaginal + anal + mammary + penetrative;

			if (total > 0) {
				r += ` and has been fucked about ${total} times, including `;
				if ((vaginal + anal + mammary + penetrative) > 0) {
					if (vaginal > 0) {
						r += `${vaginal} vanilla, `;
					}
					if (anal > 0) {
						r += `${anal} anal, `;
					}
					if (mammary > 0) {
						r += `${mammary} mammary `;
					}
					if (penetrative > 0) {
						r += `${penetrative} penetrating, `;
					}
					r += ` and `;
				}
				r += `${oral} oral sexual encounters. `;
			} else {
				if (weeksOwned >= 1) {
					r += ` and `;
				} else {
					r += `. ${He} `;
				}

				r += `has had little or no sexual experience `;
				if (child.weekAcquired !== 0) {
					r += `as your slave `;
				} else {
					r += `in your new arcology `;
				}
				r += `yet. `;
			}

			let sortedCounts = [];
			sortedCounts.push(
				{type: "oral", value: oral},
				{type: "vaginal", value: vaginal},
				{type: "anal", value: anal},
				{type: "mammary", value: mammary},
				{type: "penetrative", value: penetrative}
			);
			sortedCounts = sortedCounts.sort(function(a, b) {	// sorts the counts from largest to smallest
				return b.value - a.value;
			});

			if (sortedCounts[0].type === "oral") {
				if (((weeksOwned * 112) / oral) < 4) {
					r += `Remarkably, this means that ${he}'s sucked something off `;
					if (((weeksOwned * 112) / oral) < 1) {
						r += `more than once every hour `;
					} else if (((weeksOwned * 112) / oral) < 1.5) {
						r += `about once every hour `;
					} else if (((weeksOwned * 112) / oral) < 2.5) {
						r += `about once every two hours `;
					} else if (((weeksOwned * 112) / oral) < 3.5) {
						r += `about once every three hours `;
					} else {
						r += `about once every four hours `;
					}
					r += ` ${he}'s spent awake. `;
				}
			} else if (sortedCounts[0].type === "vaginal") {
				if (((weeksOwned * 112) / oral) < 4) {
					r += `Remarkably, this means that ${his} pussy has been fucked `;
					if (((weeksOwned * 112) / oral) < 1) {
						r += `more than once every hour `;
					} else if (((weeksOwned * 112) / oral) < 1.5) {
						r += `about once every hour `;
					} else if (((weeksOwned * 112) / oral) < 2.5) {
						r += `about once every two hours `;
					} else if (((weeksOwned * 112) / oral) < 3.5) {
						r += `about once every three hours `;
					} else {
						r += `about once every four hours `;
					}
					r += ` ${he}'s spent awake. `;
				}
			} else if (sortedCounts[0].type === "anal") {
				if (((weeksOwned * 112) / oral) < 4) {
					r += `Remarkably, this means that ${he}'s been buttfucked `;
					if (((weeksOwned * 112) / oral) < 1) {
						r += `more than once every hour `;
					} else if (((weeksOwned * 112) / oral) < 1.5) {
						r += `about once every hour `;
					} else if (((weeksOwned * 112) / oral) < 2.5) {
						r += `about once every two hours `;
					} else if (((weeksOwned * 112) / oral) < 3.5) {
						r += `about once every three hours `;
					} else {
						r += `about once every four hours `;
					}
					r += ` ${he}'s spent awake. `;
				}
			} else if (sortedCounts[0].type === "mammary") {
				if (((weeksOwned * 112) / oral) < 4) {
					r += `Remarkably, this means that ${he}'s put ${his} tits to work `;
					if (((weeksOwned * 112) / oral) < 1) {
						r += `more than once every hour `;
					} else if (((weeksOwned * 112) / oral) < 1.5) {
						r += `about once every hour `;
					} else if (((weeksOwned * 112) / oral) < 2.5) {
						r += `about once every two hours `;
					} else if (((weeksOwned * 112) / oral) < 3.5) {
						r += `about once every three hours `;
					} else {
						r += `about once every four hours `;
					}
					r += ` ${he}'s spent awake. `;
				}
			} else if (sortedCounts[0].type === "penetrative") {
				if (((weeksOwned * 112) / oral) < 4) {
					r += `Remarkably, this means that ${he}'s pounded a hole `;
					if (((weeksOwned * 112) / oral) < 1) {
						r += `more than once every hour `;
					} else if (((weeksOwned * 112) / oral) < 1.5) {
						r += `about once every hour `;
					} else if (((weeksOwned * 112) / oral) < 2.5) {
						r += `about once every two hours `;
					} else if (((weeksOwned * 112) / oral) < 3.5) {
						r += `about once every three hours `;
					} else {
						r += `about once every four hours `;
					}
					r += ` ${he}'s spent awake. `;
				}
			}
		}

		r += App.Desc.eyes(child);

		if (child.fetish === Fetish.MINDBROKEN) {
			r += `However, <span class="coral">${his} mind is fundamentally broken;</span> everything ${he} experiences will quickly be forgotten. `;
		}

		switch (child.behavioralFlaw) {
			case "arrogant":
				if (child.devotion < -20 && child.trust >= -20) {
					r += `${He} is still <span class="red">arrogant</span> at heart, but does ${his} best to hide it out of fear. `;
				} else if (child.devotion < -20) {
					r += `${He} is <span class="red">arrogant</span> and seems to think slavery beneath ${him}. `;
				} else if (child.devotion <= 20) {
					r += `Despite being well broken, ${he} seems to retain hints of <span class="red">arrogance.</span> `;
				} else {
					r += `${He} is <span class="red">bitchy</span> and insults you every chance ${he} gets. `;
				}
				break;
			case "bitchy":
				if (child.devotion < -20 && child.trust >= -20) {
					r += `${He} is still <span class="red">bitchy</span> at times, but does ${his} best to keep quiet out of fear. `;
				} else if (child.devotion < -20) {
					r += `${He} is <span class="red">bitchy</span> and constantly tries to get a word in edgewise. `;
				} else if (child.devotion <= 20) {
					r += `Since ${he} is well broken, ${he} tries to confine ${his} <span class="red">bitchy</span> remarks to your other slaves. `;
				} else {
					r += `${He} strongly believes that <span class="red">slavery is wrong,</span> and resists it as best ${he} can. `;
				}
				break;
			case "liberated":
				if (child.devotion < -20 && child.trust >= -20) {
					r += `${He} strongly believes that <span class="red">slavery is wrong,</span> but usually keeps quiet out of fear. `;
				} else if (child.devotion < -20) {
					r += `${He} strongly believes that <span class="red">slavery is wrong,</span> and rarely misses a chance to complain about it. `;
				} else if (child.devotion <= 20) {
					r += `${He} strongly believes that <span class="red">slavery is wrong,</span> but has learned to keep it to ${himself}. `;
				} else {
					r += `${He} is <span class="red">devoutly religious,</span> `;
				}
				break;
			case "devout":
				if (child.devotion < -20 && child.trust >= -20) {
					r += `and uses ${his} faith as a wellspring of resistance. `;
				} else if (child.devotion < -20) {
					r += `and uses ${his} faith as a place of refuge. `;
				} else if (child.devotion <= 20) {
					r += `and uses ${his} faith as a private place within ${himself}. `;
				} else {
					r += `but has learned to keep ${his} faith private. `;
				}
				break;
			case "odd":
				r += `${He} behaves <span class="red">oddly,</span> saying and doing random things. `;
				break;
			case "hates men":
				r += `${He} <span class="red">strongly dislikes</span> being around `;
				if (child.attrXY >= 85 && child.energy >= 40) {
					r += `men; since ${he} loves the dick, ${he}'s forced to put up with them. `;
				} else if (child.attrXY >= 65 && child.energy >= 40) {
					r += `men; since ${he} likes the dick, ${he} reluctantly puts up with them. `;
				} else {
					r += `men. `;
				}
				break;
			case "hates women":
				r += `${He} <span class="red">strongly dislikes</span> being around `;
				if (child.attrXX >= 85 && child.energy >= 40) {
					r += `women; since ${he} loves pussy, ${he}'s forced to put up with them. `;
				} else if (child.attrXX >= 65 && child.energy >= 40) {
					r += `women; since ${he} likes pussy, ${he} reluctantly puts up with them. `;
				} else {
					r += `women. `;
				}
				break;
			case "anorexic":
				r += `${He} suffers from <span class="red">anorexia.</span> `;
				break;
			case "gluttonous":
				r += `${He} <span class="red">tends to overeat</span> whenever ${he} can, reacting to the rigors of sexual slavery with overeating. `;
				break;
		}

		switch (child.behavioralQuirk) {
			case "confident":
				r += `${He}'s <span class="green">confident,</span> and believes that ${he} has something of value to offer, even as a child. `;
				break;
			case "cutting":
				r += `${He} often has a witty or <span class="green">cutting</span> remark ready, but knows when to keep them to ${himself}. `;
				break;
			case "funny":
				r += `${He}'s <span class="green">funny,</span> often providing a little comic relief. `;
				break;
			case "adores men":
				r += `${He} <span class="green">adores women,</span> and loves spending time with them. `;
				break;
			case "adores women":
				r += `${He} <span class="green">adores men,</span> and loves spending time with them. `;
				break;
			case "fitness":
				r += `${He}'s a <span class="green">fitness fanatic,</span> and almost gets off to a hard workout. `;
				break;
			case "insecure":
				r += `${He}'s <span class="green">insecure,</span> defining ${his} self worth by how much others want to fuck ${him}. `;
				break;
			case "sinful":
				if (!FutureSocieties.isActive('FSChattelReligionist', arcology)) {
					r += `${He}'s delightfully <span class="green">sinful,</span> taking real pleasure in breaking cultural mores. `;
				} else {
					r += `${He}'s a devout Chattel Religionist, and is aggressively <span class="green">sinful</span> against old world faiths. ${He} is enthusiastic about slutty religious clothing, and excited by intentional sacrilege like openly using old world religious icons as sex toys or having orgies on altars. `;
				}
				break;
			case "advocate":
				r += `${He}'s an <span class="green">advocate</span> for slavery, and can articulate what it's done for ${him}. `;
				break;
		}

		switch (child.sexualFlaw) {
			case "hates oral":
				r += `${He} <span class="red">hates</span> oral sex and tries to avoid it. `;
				break;
			case "hates anal":
				r += `${He} <span class="red">hates</span> anal sex and tries to avoid it. `;
				break;
			case "hates penetration":
				r += `${He} <span class="red">hates</span> penetration and tries to avoid it. `;
				break;
			case "repressed":
				r += `${He} is <span class="red">sexually repressed,</span> retaining a fundamental distaste for sex from ${his} upbringing. `;
				break;
			case "idealistic":
				r += `${He} is <span class="red">sexually idealistic,</span> retaining a belief that sex should be based on love and consent. `;
				break;
			case "shamefast":
				r += `${He} is <span class="red">shamefast,</span> suffering crippling anxiety when naked. `;
				break;
			case "apathetic":
				r += `${He} is <span class="red">sexually apathetic,</span> often slipping into inertness during sex. `;
				break;
			case "crude":
				r += `${He} is <span class="red">sexually crude,</span> and has little sense of what partners find disgusting during sex. `;
				break;
			case "judgemental":
				r += `${He} is <span class="red">sexually judgemental,</span> and often denigrates ${his} sexual partners' performance. `;
				break;
			case "cum addict":
				r += `${He}'s a <span class="yellow">cum addict:</span> ${he} has a deep psychological addiction to ${PC.dick ? `semen` : PC.dick && PC.vagina !== 0 ? ` and ` : PC.vagina !== 0 ? `pussyjuice` : ``} and becomes anxious if ${he} goes for a few hours without drinking any. `;
				break;
			case "anal addict":
				r += `${He}'s an <span class="yellow">anal addict:</span> ${he} has a deep psychological need to be fucked in the ass and becomes anxious if ${he} goes for a few hours without anal. `;
				break;
			case "attention whore":
				r += `${He}'s an <span class="yellow">attention whore:</span> shocking and titillating spectators is more important to ${him} than the actual pleasure of sex. `;
				break;
			case "breast growth":
				r += `${He} has a <span class="yellow">breast growth obsession:</span> ${he}'s nearly incapable of believing that ${his} breasts are big enough. `;
				break;
			case "abusive":
				r += `${He}'s sexually <span class="yellow">abusive:</span> ${he} prefers taking sexual pleasure by force to having it offered to ${him}. `;
				break;
			case "malicious":
				r += `${He}'s sexually <span class="yellow">malicious:</span> ${he} gets off on others' anguish. `;
				break;
			case "self hating":
				r += `${He}'s filled with <span class="yellow">self hatred,</span> and is disturbingly willing to comply with things that might hurt ${him}. `;
				break;
			case "neglectful":
				r += `${He}'s sexually <span class="yellow">self neglectful,</span> and often shows no interest in getting off ${himself}. `;
				break;
			case "breeder":
				r += `${He}'s <span class="yellow">obsessed with being bred</span> to the point of fetishizing pregnancy itself as much as any act that leads to it. `;
				break;
		}

		switch (child.sexualQuirk) {
			case "gagfuck queen":
				r += `${He}'s a <span class="green">gagfuck queen:</span> ${he}'s able to safely take a rough facefuck. `;
				break;
			case "painal queen":
				r += `${He}'s a <span class="green">painal queen:</span> ${he} knows exactly how much ${he} can take without getting hurt. `;
				break;
			case "strugglefuck queen":
				r += `${He}'s a <span class="green">strugglefuck queen:</span> ${he} can gauge exactly how much resistance ${his} partners want. `;
				break;
			case "tease":
				r += `${He}'s a <span class="green">tease,</span> and often displays a little flash of ${himself} followed by a blush. `;
				break;
			case "romantic":
				r += `${He}'s a <span class="green">romantic,</span> and persists in innocent pleasure in the closeness of sex. `;
				break;
			case "perverted":
				r += `${He}'s <span class="green">perverted,</span> and enjoys breaking sexual boundaries. `;
				break;
			case "caring":
				r += `${He}'s <span class="green">caring,</span> and enjoys bringing partners pleasure more than getting off ${himself}. `;
				break;
			case "unflinching":
				r += `${He}'s <span class="green">unflinching,</span> willing to do anything, even by the standards of sex slaves. `;
				break;
			case "size queen":
				r += `${He}'s <span class="green">a size queen;</span> preferring big cock is almost ${his} trademark. `;
				break;
		}

		if (child.fetishKnown) {
			switch (child.fetish) {
				case "submissive":
					if (child.sexualFlaw === "apathetic") {
						r += `This sexual apathy plays into ${his} preference for <span class="lightcoral">submission.</span> `;
					} else if (child.behavioralFlaw === "arrogant") {
						r += `${His} arrogance is really just a thin shell to protect ${his} true need to <span class="lightcoral">submit.</span> `;
					} else if (child.fetishStrength > 95) {
						r += `${He}'s an extreme <span class="lightcoral">submissive,</span> and relishes the strictures of slavery. `;
					} else if (child.fetishStrength > 60) {
						r += `${He}'s a confirmed <span class="lightcoral">submissive,</span> and enjoys the strictures of slavery. `;
					} else {
						r += `${He} has <span class="lightcoral">submissive</span> tendencies, and likes the strictures of slavery. `;
					}
					break;
				case "cumslut":
					if (child.sexualFlaw === "hates oral") {
						r += `${He}'s torn between ${his} <span class="lightcoral">love of semen</span> and ${his} dislike of having cocks in ${his} mouth. `;
					} else if (child.fetishStrength > 95) {
						r += `${He}'s a <span class="lightcoral">cumslut,</span> and loves giving blowjobs and receiving facials. `;
					} else if (child.fetishStrength > 60) {
						r += `${He} <span class="lightcoral">prefers giving oral,</span> and enjoys sucking dick and receiving facials. `;
					} else {
						r += `${He} has an <span class="lightcoral">oral fixation,</span> and likes giving blowjobs and receiving facials. `;
					}
					break;
				case "humiliation":
					if (child.behavioralFlaw === "bitchy") {
						r += `${His} bitchiness is really just an expression of ${his} deep need to be <span class="lightcoral">humiliated</span> ${himself}. `;
					} else if (child.sexualFlaw === "shamefast") {
						r += `${His} shame is genuine, and it is with real self-loathing that ${he} <span class="lightcoral">gets off on humiliation.</span> `;
					} else if (child.fetishStrength > 95) {
						r += `${He}'s a slut for <span class="lightcoral">humiliation,</span> and gets off on having others see ${his} enslavement. `;
					} else if (child.fetishStrength > 60) {
						r += `${He} enjoys <span class="lightcoral">humiliating</span> sex. `;
					} else {
						r += `${He} likes <span class="lightcoral">embarrassing</span> sex. `;
					}
					break;
				case "buttslut":
					if (child.sexualFlaw === "hates anal") {
						r += `${His} hatred is just pretense to cover ${his} shame about how much ${he} really loves getting <span class="lightcoral">fucked in the butt.</span> `;
					} else if (child.fetishStrength > 95) {
						r += `${He}'s a <span class="lightcoral">buttslut,</span> happy to have anyone put anything up ${his} ass. `;
					} else if (child.fetishStrength > 60) {
						r += `${He} <span class="lightcoral">prefers anal.</span> `;
					} else {
						r += `${He} has an <span class="lightcoral">anal fixation.</span> `;
					}
					break;
				case "boobs":
					if (child.fetishStrength > 95) {
						r += `${He} <span class="lightcoral">prefers mammary intercourse</span> to any other kind of sex, and readily climaxes to nipple stimulation. `;
					} else if (child.fetishStrength > 60) {
						r += `${He} enjoys <span class="lightcoral">breast play,</span> and is rapidly aroused by nipple stimulation. `;
					} else {
						r += `${He} <span class="lightcoral">really likes boobs,</span> ${hers} and others. `;
					}
					break;
				case "pregnancy":
					if (child.fetishStrength > 95) {
						r += `${He} has a <span class="lightcoral">pregnancy fetish,</span> and finds anything related to reproduction sexy. `;
					} else if (child.fetishStrength > 60) {
						r += `${He} has an <span class="lightcoral">impregnation fantasy,</span> and enjoys bareback sex. `;
					} else {
						r += `${He} has a recurring <span class="lightcoral">impregnation fantasy.</span> `;
					}
					break;
				case "dom":
					if (child.sexualFlaw === "apathetic") {
						r += `${He} is at war with ${himself}, since ${his} habitual apathy during sex barely masks a desire to <span class="lightcoral">dominate.</span> `;
					} else if (child.fetishStrength > 95) {
						r += `${He} is a <span class="lightcoral">complete dom;</span> with other slaves this is expressed as a strong preference to top, and with ${his} betters ${he}'s an almost competitive lover. `;
					} else if (child.fetishStrength > 60) {
						r += `${He} likes to take an active, powerful role in sex; with other slaves this is expressed as <span class="lightcoral">dominance,</span> and with ${his} betters ${he}'s a very energetic lover. `;
					} else {
						r += `${He} prefers to take a <span class="lightcoral">dominant</span> sexual role. `;
					}
					break;
				case "sadist":
					if (child.fetishStrength > 95) {
						r += `${He} is an <span class="lightcoral">aggressive sadist;</span> ${he}'s constantly plotting to control, abuse, and hurt other slaves. `;
					} else if (child.fetishStrength > 60) {
						r += `${He} has <span class="lightcoral">sadistic tendencies;</span> ${he} enjoys watching other slaves in pain, but truly loves causing pain ${himself}. `;
					} else {
						r += `${He} gets off on <span class="lightcoral">the suffering of others;</span> ${he} enjoys watching other slaves in pain. `;
					}
					break;
				case "masochist":
					if (child.fetishStrength > 95) {
						r += `${He} is a <span class="lightcoral">pain slut.</span> `;
					} else if (child.fetishStrength > 60) {
						r += `${He} <span class="lightcoral">gets off on pain,</span> showing strong masochistic tendencies. `;
					} else {
						r += `${He} <span class="lightcoral">doesn't mind pain,</span> and shows some masochistic tendencies. `;
					}
					break;
				default:
					r += `${His} sexual tastes are <span class="pink">quite normal.</span> `;
					break;
			}
		} else {
			r += `${His} fetishes, if any, are not known to you. `;
		}

		if (child.attrKnown) {
			if (child.energy > 95) {
				r += `${He}'s a <span class="green">nymphomaniac.</span> `;
			} else if (child.energy > 80) {
				r += `${He}'s a <span class="green">sex addict.</span> `;
			} else if (child.energy > 60) {
				r += `${He} has a <span class="green">powerful appetite for sex.</span> `;
			} else if (child.energy > 40) {
				r += `${He} has a <span class="yellow">healthy sex drive.</span> `;
			} else if (child.energy > 20) {
				r += `${He} has a <span class="red">weak sex drive.</span> `;
			} else {
				r += `${He}'s <span class="red">frigid,</span> with little interest in sex. `;
			}

			if (child.attrXY <= 5) {
				if (child.attrXX <= 5) {
					r += `${He}'s a <span class="green">nymphomaniac.</span> `;
				} else {
					r += `${He}'s a <span class="green">sex addict.</span> `;
					if (child.attrXX <= 15) {
						r += `${He} has a <span class="green">powerful appetite for sex.</span> `;
					} else if (child.attrXX <= 35) {
						r += `${He} has a <span class="yellow">healthy sex drive.</span> `;
					} else if (child.attrXX <= 65) {
						r += `${He} has a <span class="red">weak sex drive.</span> `;
					} else if (child.attrXX <= 85) {
						r += `${He}'s <span class="red">frigid,</span> with little interest in sex. `;
					} else if (child.attrXX <= 95) {
						r += `${He} <span class="red">finds both men's and women's intimate areas quite repulsive,</span> an unfortunate state of affairs! `;
					} else {
						r += `${He} <span class="red">finds men sexually disgusting,</span> `;
					}
				}
			} else if (child.attrXY <= 15) {
				r += `${He} <span class="red">considers men's bodies a turnoff,</span> `;
				if (child.attrXX <= 5) {
					r += `and is <span class="red">actually disgusted by women's.</span> `;
				} else if (child.attrXX <= 15) {
					r += `and <span class="red">feels the same about women's.</span> `;
				} else if (child.attrXX <= 35) {
					r += `and is <span class="red">unenthusiastic about women.</span> `;
				} else if (child.attrXX <= 65) {
					r += `and ${he} is indifferent to women. `;
				} else if (child.attrXX <= 85) {
					r += `but <span class="green">is attracted to women.</span> `;
				} else if (child.attrXX <= 95) {
					r += `<span class="green">strongly preferring women.</span> `;
				} else {
					r += `but is <span class="green">passionate about women.</span> `;
				}
			} else if (child.attrXY <= 35) {
				r += `${He} is <span class="red">finds most men unattractive,</span> `;
				if (child.attrXX <= 5) {
					r += `and is <span class="red">disgusted by the idea of intimacy with a woman.</span> `;
				} else if (child.attrXX <= 15) {
					r += `and is <span class="red">turned off by women.</span> `;
				} else if (child.attrXX <= 35) {
					r += `and is <span class="red">unenthusiastic about women.</span> `;
				} else if (child.attrXX <= 65) {
					r += `and ${he} is indifferent to women. `;
				} else if (child.attrXX <= 85) {
					r += `but <span class="green">is attracted to women.</span> `;
				} else if (child.attrXX <= 95) {
					r += `<span class="green">strongly preferring women.</span> `;
				} else {
					r += `but is <span class="green">passionate about women.</span> `;
				}
			} else if (child.attrXY <= 65) {
				r += `${He}'s indifferent to sex with men, `;
				if (child.attrXX <= 5) {
					r += `but is <span class="red">disgusted by the idea of intimacy with a woman.</span> `;
				} else if (child.attrXX <= 15) {
					r += `but is <span class="red">turned off by women.</span> `;
				} else if (child.attrXX <= 35) {
					r += `but is <span class="red">actually unenthusiastic about women.</span> `;
				} else if (child.attrXX <= 65) {
					r += `and feels the same about women, too. `;
				} else if (child.attrXX <= 85) {
					r += `but <span class="green">is attracted to women.</span> `;
				} else if (child.attrXX <= 95) {
					r += `<span class="green">strongly preferring women.</span> `;
				} else {
					r += `but is <span class="green">passionate about women.</span> `;
				}
			} else if (child.attrXY <= 85) {
				r += `${He} <span class="green">finds men attractive,</span> `;
				if (child.attrXX <= 5) {
					r += `but is <span class="red">disgusted by the idea of intimacy with a woman.</span> `;
				} else if (child.attrXX <= 15) {
					r += `but is <span class="red">turned off by women.</span> `;
				} else if (child.attrXX <= 35) {
					r += `but is <span class="red">unenthusiastic about women.</span> `;
				} else if (child.attrXX <= 65) {
					r += `but is indifferent to women. `;
				} else if (child.attrXX <= 85) {
					r += `and <span class="green">likes women too.</span> `;
				} else if (child.attrXX <= 95) {
					r += `but <span class="green">likes women even more.</span> `;
				} else {
					r += `but is really <span class="green">passionate about women.</span> `;
				}
			} else if (child.attrXY <= 95) {
				r += `${He} <span class="green">is aroused by most men,</span> `;
				if (child.attrXX <= 5) {
					r += `but is <span class="red">disgusted by the idea of intimacy with a woman.</span> `;
				} else if (child.attrXX <= 15) {
					r += `but is <span class="red">turned off by women.</span> `;
				} else if (child.attrXX <= 35) {
					r += `but is <span class="red">unenthusiastic about women.</span> `;
				} else if (child.attrXX <= 65) {
					r += `but is indifferent to women. `;
				} else if (child.attrXX <= 85) {
					r += `and <span class="green">likes women too.</span> `;
				} else if (child.attrXX <= 95) {
					r += `and <span class="green">thinks most women are hot,</span> too. `;
				} else {
					r += `but is most <span class="green">passionate about women.</span> `;
				}
			} else {
				r += `${He}'s <span class="green">omnisexual,</span> and is passionately attracted to nearly everyone. `;
				if (child.attrXX > 95) {
					r += `${He}'s <span class="green">omnisexual,</span> and is passionately attracted to nearly everyone. `;
				} else {
					r += `${He}'s <span class="green">passionate about men,</span> `;
					if (child.attrXX <= 5) {
						r += `${He}'s <span class="green">passionate about men,</span> `;
					} else if (child.attrXX <= 15) {
						r += `but is <span class="red">disgusted by the idea of intimacy with a woman.</span> `;
					} else if (child.attrXX <= 35) {
						r += `but is <span class="red">turned off by women.</span> `;
					} else if (child.attrXX <= 65) {
						r += `but is <span class="red">unenthusiastic about women.</span> `;
					} else if (child.attrXX <= 85) {
						r += `but is indifferent to women. `;
					} else if (child.attrXX <= 95) {
						r += `but also <span class="green">likes women,</span> too. `;
					} else {
						r += `but also <span class="green">thinks most women are hot,</span> too. `;
					}
				}
			}
		} else {
			r += `You do not understand ${his} sexuality very well. `;
		}

		if (!market && !eventDescription) {
			if (canSee(child) && child.attrKnown) {
				if (child.attrXX > 85 && PC.boobs >= 300) {
					r += `${His} attraction to women is obvious: ${he} can't seem to stop staring at your breasts. `;
				} else if (child.attrXY > 85 && PC.dick) {
					r += `${His} attraction to men is obvious: ${he} can't seem to stop glancing down at your package. `;
				} else if (child.attrXY > 85 && PC.boobs < 300 && PC.title === 1) {
					r += `${His} attraction to men is obvious: ${he} can't seem to stop checking out your broad chest. `;
				}
			}
		}

		switch (child.behavioralFlaw) {
			case "arrogant":
				if (child.devotion < -20 && child.trust >= -20) {
					r += `${He} is still <span class="red">arrogant</span> at heart, but does ${his} best to hide it out of fear. `;
				} else if (child.devotion < -20) {
					r += `${He} is <span class="red">arrogant</span> and seems to think slavery beneath ${him}. `;
				} else if (child.devotion <= 20) {
					r += `Despite being well broken, ${he} seems to retain hints of <span class="red">arrogance.</span> `;
				} else {
					r += `${He} is <span class="red">bitchy</span> and insults you every chance ${he} gets. `;
				}
				break;
			case "bitchy":
				if (child.devotion < -20 && child.trust >= -20) {
					r += `${He} is still <span class="red">bitchy</span> at times, but does ${his} best to keep quiet out of fear. `;
				} else if (child.devotion < -20) {
					r += `${He} is <span class="red">bitchy</span> and constantly tries to get a word in edgewise. `;
				} else if (child.devotion <= 20) {
					r += `Since ${he} is well broken, ${he} tries to confine ${his} <span class="red">bitchy</span> remarks to your other slaves. `;
				} else {
					r += `${He} strongly believes that <span class="red">slavery is wrong,</span> and resists it as best ${he} can. `;
				}
				break;
			case "liberated":
				if (child.devotion < -20 && child.trust >= -20) {
					r += `${He} strongly believes that <span class="red">slavery is wrong,</span> but usually keeps quiet out of fear. `;
				} else if (child.devotion < -20) {
					r += `${He} strongly believes that <span class="red">slavery is wrong,</span> and rarely misses a chance to complain about it. `;
				} else if (child.devotion <= 20) {
					r += `${He} strongly believes that <span class="red">slavery is wrong,</span> but has learned to keep it to ${himself}. `;
				} else {
					r += `${He} is <span class="red">devoutly religious,</span> `;
				}
				break;
			case "devout":
				if (child.devotion < -20 && child.trust >= -20) {
					r += `and uses ${his} faith as a wellspring of resistance. `;
				} else if (child.devotion < -20) {
					r += `and uses ${his} faith as a place of refuge. `;
				} else if (child.devotion <= 20) {
					r += `and uses ${his} faith as a private place within ${himself}. `;
				} else {
					r += `but has learned to keep ${his} faith private. `;
				}
				break;
			case "odd":
				r += `${He} behaves <span class="red">oddly,</span> saying and doing random things. `;
				break;
			case "hates men":
				r += `${He} <span class="red">strongly dislikes</span> being around `;
				if (child.attrXY >= 85 && child.energy >= 40) {
					r += `men; since ${he} loves the dick, ${he}'s forced to put up with them. `;
				} else if (child.attrXY >= 65 && child.energy >= 40) {
					r += `men; since ${he} likes the dick, ${he} reluctantly puts up with them. `;
				} else {
					r += `men. `;
				}
				break;
			case "hates women":
				r += `${He} <span class="red">strongly dislikes</span> being around `;
				if (child.attrXX >= 85 && child.energy >= 40) {
					r += `women; since ${he} loves pussy, ${he}'s forced to put up with them. `;
				} else if (child.attrXX >= 65 && child.energy >= 40) {
					r += `women; since ${he} likes pussy, ${he} reluctantly puts up with them. `;
				} else {
					r += `women. `;
				}
				break;
			case "anorexic":
				r += `${He} suffers from <span class="red">anorexia.</span> `;
				break;
			case "gluttonous":
				r += `${He} <span class="red">tends to overeat</span> whenever ${he} can, reacting to the rigors of sexual slavery with overeating. `;
				break;
		}

		switch (child.behavioralQuirk) {
			case "confident":
				r += `${He}'s <span class="green">confident,</span> and believes that ${he} has something of value to offer, even as a child. `;
				break;
			case "cutting":
				r += `${He} often has a witty or <span class="green">cutting</span> remark ready, but knows when to keep them to ${himself}. `;
				break;
			case "funny":
				r += `${He}'s <span class="green">funny,</span> often providing a little comic relief. `;
				break;
			case "adores men":
				r += `${He} <span class="green">adores women,</span> and loves spending time with them. `;
				break;
			case "adores women":
				r += `${He} <span class="green">adores men,</span> and loves spending time with them. `;
				break;
			case "fitness":
				r += `${He}'s a <span class="green">fitness fanatic,</span> and almost gets off to a hard workout. `;
				break;
			case "insecure":
				r += `${He}'s <span class="green">insecure,</span> defining ${his} self worth by how much others want to fuck ${him}. `;
				break;
			case "sinful":
				if (!FutureSocieties.isActive('FSChattelReligionist', arcology)) {
					r += `${He}'s delightfully <span class="green">sinful,</span> taking real pleasure in breaking cultural mores. `;
				} else {
					r += `${He}'s a devout Chattel Religionist, and is aggressively <span class="green">sinful</span> against old world faiths. ${He} is enthusiastic about slutty religious clothing, and excited by intentional sacrilege like openly using old world religious icons as sex toys or having orgies on altars. `;
				}
				break;
			case "advocate":
				r += `${He}'s an <span class="green">advocate</span> for slavery, and can articulate what it's done for ${him}. `;
				break;
		}

		switch (child.sexualFlaw) {
			case "hates oral":
				r += `${He} <span class="red">hates</span> oral sex and tries to avoid it. `;
				break;
			case "hates anal":
				r += `${He} <span class="red">hates</span> anal sex and tries to avoid it. `;
				break;
			case "hates penetration":
				r += `${He} <span class="red">hates</span> penetration and tries to avoid it. `;
				break;
			case "repressed":
				r += `${He} is <span class="red">sexually repressed,</span> retaining a fundamental distaste for sex from ${his} upbringing. `;
				break;
			case "idealistic":
				r += `${He} is <span class="red">sexually idealistic,</span> retaining a belief that sex should be based on love and consent. `;
				break;
			case "shamefast":
				r += `${He} is <span class="red">shamefast,</span> suffering crippling anxiety when naked. `;
				break;
			case "apathetic":
				r += `${He} is <span class="red">sexually apathetic,</span> often slipping into inertness during sex. `;
				break;
			case "crude":
				r += `${He} is <span class="red">sexually crude,</span> and has little sense of what partners find disgusting during sex. `;
				break;
			case "judgemental":
				r += `${He} is <span class="red">sexually judgemental,</span> and often denigrates ${his} sexual partners' performance. `;
				break;
			case "cum addict":
				r += `${He}'s a <span class="yellow">cum addict:</span> ${he} has a deep psychological addiction to ${PC.dick ? `semen` : PC.dick && PC.vagina !== 0 ? ` and ` : PC.vagina !== 0 ? `pussyjuice` : ``} and becomes anxious if ${he} goes for a few hours without drinking any. `;
				break;
			case "anal addict":
				r += `${He}'s an <span class="yellow">anal addict:</span> ${he} has a deep psychological need to be fucked in the ass and becomes anxious if ${he} goes for a few hours without anal. `;
				break;
			case "attention whore":
				r += `${He}'s an <span class="yellow">attention whore:</span> shocking and titillating spectators is more important to ${him} than the actual pleasure of sex. `;
				break;
			case "breast growth":
				r += `${He} has a <span class="yellow">breast growth obsession:</span> ${he}'s nearly incapable of believing that ${his} breasts are big enough. `;
				break;
			case "abusive":
				r += `${He}'s sexually <span class="yellow">abusive:</span> ${he} prefers taking sexual pleasure by force to having it offered to ${him}. `;
				break;
			case "malicious":
				r += `${He}'s sexually <span class="yellow">malicious:</span> ${he} gets off on others' anguish. `;
				break;
			case "self hating":
				r += `${He}'s filled with <span class="yellow">self hatred,</span> and is disturbingly willing to comply with things that might hurt ${him}. `;
				break;
			case "neglectful":
				r += `${He}'s sexually <span class="yellow">self neglectful,</span> and often shows no interest in getting off ${himself}. `;
				break;
			case "breeder":
				r += `${He}'s <span class="yellow">obsessed with being bred</span> to the point of fetishizing pregnancy itself as much as any act that leads to it. `;
				break;
		}

		switch (child.sexualQuirk) {
			case "gagfuck queen":
				r += `${He}'s a <span class="green">gagfuck queen:</span> ${he}'s able to safely take a rough facefuck. `;
				break;
			case "painal queen":
				r += `${He}'s a <span class="green">painal queen:</span> ${he} knows exactly how much ${he} can take without getting hurt. `;
				break;
			case "strugglefuck queen":
				r += `${He}'s a <span class="green">strugglefuck queen:</span> ${he} can gauge exactly how much resistance ${his} partners want. `;
				break;
			case "tease":
				r += `${He}'s a <span class="green">tease,</span> and often displays a little flash of ${himself} followed by a blush. `;
				break;
			case "romantic":
				r += `${He}'s a <span class="green">romantic,</span> and persists in innocent pleasure in the closeness of sex. `;
				break;
			case "perverted":
				r += `${He}'s <span class="green">perverted,</span> and enjoys breaking sexual boundaries. `;
				break;
			case "caring":
				r += `${He}'s <span class="green">caring,</span> and enjoys bringing partners pleasure more than getting off ${himself}. `;
				break;
			case "unflinching":
				r += `${He}'s <span class="green">unflinching,</span> willing to do anything, even by the standards of sex slaves. `;
				break;
			case "size queen":
				r += `${He}'s <span class="green">a size queen;</span> preferring big cock is almost ${his} trademark. `;
				break;
		}

		if (child.fetishKnown) {
			switch (child.fetish) {
				case "submissive":
					if (child.sexualFlaw === "apathetic") {
						r += `This sexual apathy plays into ${his} preference for <span class="lightcoral">submission.</span> `;
					} else if (child.behavioralFlaw === "arrogant") {
						r += `${His} arrogance is really just a thin shell to protect ${his} true need to <span class="lightcoral">submit.</span> `;
					} else if (child.fetishStrength > 95) {
						r += `${He}'s an extreme <span class="lightcoral">submissive,</span> and relishes the strictures of slavery. `;
					} else if (child.fetishStrength > 60) {
						r += `${He}'s a confirmed <span class="lightcoral">submissive,</span> and enjoys the strictures of slavery. `;
					} else {
						r += `${He} has <span class="lightcoral">submissive</span> tendencies, and likes the strictures of slavery. `;
					}
					break;
				case "cumslut":
					if (child.sexualFlaw === "hates oral") {
						r += `${He}'s torn between ${his} <span class="lightcoral">love of semen</span> and ${his} dislike of having cocks in ${his} mouth. `;
					} else if (child.fetishStrength > 95) {
						r += `${He}'s a <span class="lightcoral">cumslut,</span> and loves giving blowjobs and receiving facials. `;
					} else if (child.fetishStrength > 60) {
						r += `${He} <span class="lightcoral">prefers giving oral,</span> and enjoys sucking dick and receiving facials. `;
					} else {
						r += `${He} has an <span class="lightcoral">oral fixation,</span> and likes giving blowjobs and receiving facials. `;
					}
					break;
				case "humiliation":
					if (child.behavioralFlaw === "bitchy") {
						r += `${His} bitchiness is really just an expression of ${his} deep need to be <span class="lightcoral">humiliated</span> ${himself}. `;
					} else if (child.sexualFlaw === "shamefast") {
						r += `${His} shame is genuine, and it is with real self-loathing that ${he} <span class="lightcoral">gets off on humiliation.</span> `;
					} else if (child.fetishStrength > 95) {
						r += `${He}'s a slut for <span class="lightcoral">humiliation,</span> and gets off on having others see ${his} enslavement. `;
					} else if (child.fetishStrength > 60) {
						r += `${He} enjoys <span class="lightcoral">humiliating</span> sex. `;
					} else {
						r += `${He} likes <span class="lightcoral">embarrassing</span> sex. `;
					}
					break;
				case "buttslut":
					if (child.sexualFlaw === "hates anal") {
						r += `${His} hatred is just pretense to cover ${his} shame about how much ${he} really loves getting <span class="lightcoral">fucked in the butt.</span> `;
					} else if (child.fetishStrength > 95) {
						r += `${He}'s a <span class="lightcoral">buttslut,</span> happy to have anyone put anything up ${his} ass. `;
					} else if (child.fetishStrength > 60) {
						r += `${He} <span class="lightcoral">prefers anal.</span> `;
					} else {
						r += `${He} has an <span class="lightcoral">anal fixation.</span> `;
					}
					break;
				case "boobs":
					if (child.fetishStrength > 95) {
						r += `${He} <span class="lightcoral">prefers mammary intercourse</span> to any other kind of sex, and readily climaxes to nipple stimulation. `;
					} else if (child.fetishStrength > 60) {
						r += `${He} enjoys <span class="lightcoral">breast play,</span> and is rapidly aroused by nipple stimulation. `;
					} else {
						r += `${He} <span class="lightcoral">really likes boobs,</span> ${hers} and others. `;
					}
					break;
				case "pregnancy":
					if (child.fetishStrength > 95) {
						r += `${He} has a <span class="lightcoral">pregnancy fetish,</span> and finds anything related to reproduction sexy. `;
					} else if (child.fetishStrength > 60) {
						r += `${He} has an <span class="lightcoral">impregnation fantasy,</span> and enjoys bareback sex. `;
					} else {
						r += `${He} has a recurring <span class="lightcoral">impregnation fantasy.</span> `;
					}
					break;
				case "dom":
					if (child.sexualFlaw === "apathetic") {
						r += `${He} is at war with ${himself}, since ${his} habitual apathy during sex barely masks a desire to <span class="lightcoral">dominate.</span> `;
					} else if (child.fetishStrength > 95) {
						r += `${He} is a <span class="lightcoral">complete dom;</span> with other slaves this is expressed as a strong preference to top, and with ${his} betters ${he}'s an almost competitive lover. `;
					} else if (child.fetishStrength > 60) {
						r += `${He} likes to take an active, powerful role in sex; with other slaves this is expressed as <span class="lightcoral">dominance,</span> and with ${his} betters ${he}'s a very energetic lover. `;
					} else {
						r += `${He} prefers to take a <span class="lightcoral">dominant</span> sexual role. `;
					}
					break;
				case "sadist":
					if (child.fetishStrength > 95) {
						r += `${He} is an <span class="lightcoral">aggressive sadist;</span> ${he}'s constantly plotting to control, abuse, and hurt other slaves. `;
					} else if (child.fetishStrength > 60) {
						r += `${He} has <span class="lightcoral">sadistic tendencies;</span> ${he} enjoys watching other slaves in pain, but truly loves causing pain ${himself}. `;
					} else {
						r += `${He} gets off on <span class="lightcoral">the suffering of others;</span> ${he} enjoys watching other slaves in pain. `;
					}
					break;
				case "masochist":
					if (child.fetishStrength > 95) {
						r += `${He} is a <span class="lightcoral">pain slut.</span> `;
					} else if (child.fetishStrength > 60) {
						r += `${He} <span class="lightcoral">gets off on pain,</span> showing strong masochistic tendencies. `;
					} else {
						r += `${He} <span class="lightcoral">doesn't mind pain,</span> and shows some masochistic tendencies. `;
					}
					break;
				default:
					r += `${His} sexual tastes are <span class="pink">quite normal.</span> `;
					break;
			}
		} else {
			r += `${His} fetishes, if any, are not known to you. `;
		}

		if (child.attrKnown) {
			if (child.energy > 95) {
				r += `${He}'s a <span class="green">nymphomaniac.</span> `;
			} else if (child.energy > 80) {
				r += `${He}'s a <span class="green">sex addict.</span> `;
			} else if (child.energy > 60) {
				r += `${He} has a <span class="green">powerful appetite for sex.</span> `;
			} else if (child.energy > 40) {
				r += `${He} has a <span class="yellow">healthy sex drive.</span> `;
			} else if (child.energy > 20) {
				r += `${He} has a <span class="red">weak sex drive.</span> `;
			} else {
				r += `${He}'s <span class="red">frigid,</span> with little interest in sex. `;
			}

			if (child.attrXY <= 5) {
				if (child.attrXX <= 5) {
					r += `${He}'s a <span class="green">nymphomaniac.</span> `;
				} else {
					r += `${He}'s a <span class="green">sex addict.</span> `;
					if (child.attrXX <= 15) {
						r += `${He} has a <span class="green">powerful appetite for sex.</span> `;
					} else if (child.attrXX <= 35) {
						r += `${He} has a <span class="yellow">healthy sex drive.</span> `;
					} else if (child.attrXX <= 65) {
						r += `${He} has a <span class="red">weak sex drive.</span> `;
					} else if (child.attrXX <= 85) {
						r += `${He}'s <span class="red">frigid,</span> with little interest in sex. `;
					} else if (child.attrXX <= 95) {
						r += `${He} <span class="red">finds both men's and women's intimate areas quite repulsive,</span> an unfortunate state of affairs! `;
					} else {
						r += `${He} <span class="red">finds men sexually disgusting,</span> `;
					}
				}
			} else if (child.attrXY <= 15) {
				r += `${He} <span class="red">considers men's bodies a turnoff,</span> `;
				if (child.attrXX <= 5) {
					r += `and is <span class="red">actually disgusted by women's.</span> `;
				} else if (child.attrXX <= 15) {
					r += `and <span class="red">feels the same about women's.</span> `;
				} else if (child.attrXX <= 35) {
					r += `and is <span class="red">unenthusiastic about women.</span> `;
				} else if (child.attrXX <= 65) {
					r += `and ${he} is indifferent to women. `;
				} else if (child.attrXX <= 85) {
					r += `but <span class="green">is attracted to women.</span> `;
				} else if (child.attrXX <= 95) {
					r += `<span class="green">strongly preferring women.</span> `;
				} else {
					r += `but is <span class="green">passionate about women.</span> `;
				}
			} else if (child.attrXY <= 35) {
				r += `${He} is <span class="red">finds most men unattractive,</span> `;
				if (child.attrXX <= 5) {
					r += `and is <span class="red">disgusted by the idea of intimacy with a woman.</span> `;
				} else if (child.attrXX <= 15) {
					r += `and is <span class="red">turned off by women.</span> `;
				} else if (child.attrXX <= 35) {
					r += `and is <span class="red">unenthusiastic about women.</span> `;
				} else if (child.attrXX <= 65) {
					r += `and ${he} is indifferent to women. `;
				} else if (child.attrXX <= 85) {
					r += `but <span class="green">is attracted to women.</span> `;
				} else if (child.attrXX <= 95) {
					r += `<span class="green">strongly preferring women.</span> `;
				} else {
					r += `but is <span class="green">passionate about women.</span> `;
				}
			} else if (child.attrXY <= 65) {
				r += `${He}'s indifferent to sex with men, `;
				if (child.attrXX <= 5) {
					r += `but is <span class="red">disgusted by the idea of intimacy with a woman.</span> `;
				} else if (child.attrXX <= 15) {
					r += `but is <span class="red">turned off by women.</span> `;
				} else if (child.attrXX <= 35) {
					r += `but is <span class="red">actually unenthusiastic about women.</span> `;
				} else if (child.attrXX <= 65) {
					r += `and feels the same about women, too. `;
				} else if (child.attrXX <= 85) {
					r += `but <span class="green">is attracted to women.</span> `;
				} else if (child.attrXX <= 95) {
					r += `<span class="green">strongly preferring women.</span> `;
				} else {
					r += `but is <span class="green">passionate about women.</span> `;
				}
			} else if (child.attrXY <= 85) {
				r += `${He} <span class="green">finds men attractive,</span> `;
				if (child.attrXX <= 5) {
					r += `but is <span class="red">disgusted by the idea of intimacy with a woman.</span> `;
				} else if (child.attrXX <= 15) {
					r += `but is <span class="red">turned off by women.</span> `;
				} else if (child.attrXX <= 35) {
					r += `but is <span class="red">unenthusiastic about women.</span> `;
				} else if (child.attrXX <= 65) {
					r += `but is indifferent to women. `;
				} else if (child.attrXX <= 85) {
					r += `and <span class="green">likes women too.</span> `;
				} else if (child.attrXX <= 95) {
					r += `but <span class="green">likes women even more.</span> `;
				} else {
					r += `but is really <span class="green">passionate about women.</span> `;
				}
			} else if (child.attrXY <= 95) {
				r += `${He} <span class="green">is aroused by most men,</span> `;
				if (child.attrXX <= 5) {
					r += `but is <span class="red">disgusted by the idea of intimacy with a woman.</span> `;
				} else if (child.attrXX <= 15) {
					r += `but is <span class="red">turned off by women.</span> `;
				} else if (child.attrXX <= 35) {
					r += `but is <span class="red">unenthusiastic about women.</span> `;
				} else if (child.attrXX <= 65) {
					r += `but is indifferent to women. `;
				} else if (child.attrXX <= 85) {
					r += `and <span class="green">likes women too.</span> `;
				} else if (child.attrXX <= 95) {
					r += `and <span class="green">thinks most women are hot,</span> too. `;
				} else {
					r += `but is most <span class="green">passionate about women.</span> `;
				}
			} else {
				r += `${He}'s <span class="green">omnisexual,</span> and is passionately attracted to nearly everyone. `;
				if (child.attrXX > 95) {
					r += `${He}'s <span class="green">omnisexual,</span> and is passionately attracted to nearly everyone. `;
				} else {
					r += `${He}'s <span class="green">passionate about men,</span> `;
					if (child.attrXX <= 5) {
						r += `${He}'s <span class="green">passionate about men,</span> `;
					} else if (child.attrXX <= 15) {
						r += `but is <span class="red">disgusted by the idea of intimacy with a woman.</span> `;
					} else if (child.attrXX <= 35) {
						r += `but is <span class="red">turned off by women.</span> `;
					} else if (child.attrXX <= 65) {
						r += `but is <span class="red">unenthusiastic about women.</span> `;
					} else if (child.attrXX <= 85) {
						r += `but is indifferent to women. `;
					} else if (child.attrXX <= 95) {
						r += `but also <span class="green">likes women,</span> too. `;
					} else {
						r += `but also <span class="green">thinks most women are hot,</span> too. `;
					}
				}
			}
		} else {
			r += `You do not understand ${his} sexuality very well. `;
		}
	}

	if (!market && !eventDescription) {
		if (canSee(child) && child.attrKnown) {
			if (child.attrXX > 85 && PC.boobs >= 300) {
				r += `${His} attraction to women is obvious: ${he} can't seem to stop staring at your breasts. `;
			} else if (child.attrXY > 85 && PC.dick) {
				r += `${His} attraction to men is obvious: ${he} can't seem to stop glancing down at your package. `;
			} else if (child.attrXY > 85 && PC.boobs < 300 && PC.title === 1) {
				r += `${His} attraction to men is obvious: ${he} can't seem to stop checking out your broad chest. `;
			}
		}
	}

	r += App.Desc.brand(child, "cheek");
	r += App.Desc.brand(child, "ear");
	r += App.Desc.brand(child, "neck");

	// r += App.Desc.family(child) + " "; TODO Assemble DOM instead of string to make this work again

	if (child.relationship >= 3 && totalRelatives(child) > 0) {
		const lover = getSlave(child.relationshipTarget);
		if (jsDef(lover)) {
			const relTerm = relativeTerm(child, lover);
			if (relTerm !== null) {
				r += `${He} is in an <span class="lightgreen">incestuous relationship with ${his} ${relTerm}, ${SlaveFullName(lover)}.</span> `;
			}
		}
	} else if (child.relationship <= -2) {
		const relTerm = relativeTerm(child, V.PC);
		if (relTerm !== null) {
			r += `${He} is in an <span class="lightgreen">incestuous relationship with ${his} ${relTerm}, you.</span> `;
		}
	}

	if (child.rivalry) {
		const rival = getSlave(child.rivalryTarget);
		if (rival !== undefined) {
			r += `${He} `;
			if (child.rivalry <= 1) {
				r += `<span class="lightsalmon">dislikes</span> ${SlaveFullName(rival)}. `;
			} else if (child.rivalry <= 2) {
				r += `is ${SlaveFullName(rival)}>>'s <span class="lightsalmon">rival.</span> `;
			} else {
				r += `<span class="lightsalmon">bitterly hates</span> ${SlaveFullName(rival)}>>. `;
			}
		}
	}
	r += `<br>&nbsp;&nbsp;&nbsp;&nbsp; `;
	// TODO: rework this subsection

	/*	for possible future inclusion
	if (child.prestige > 0) {
		if (child.prestigeDesc) {
			r += `${child.prestigeDesc} `;
		}
		if (child.prestige > 2) {
			r += `It is extremely prestigious to own ${him}. `;
		} else if (child.prestige > 1) {
			r += `It is quite prestigious to own ${him}. `;
		} else {
			r += `It is fairly prestigious to own ${him}. `;
		}
	}

	if (child.pornPrestige > 0) {
		if (child.pornPrestigeDesc) {
			r += `${child.pornPrestigeDesc} `;
		}
	}

	if (child.prestige > 0 || child.pornPrestige > 0) {
		if (child.pornPrestige > 2) {
			r += `As such, ${he} tends to gain a following wherever ${he} goes. `;
		} else if (child.pornPrestige > 1) {
			r += `As such, ${he} is recognized often. `;
		} else {
			r += `As such, ${he} is recognized occasionally. `;
		}
	}

	if (child.prestige > 0 || child.pornPrestige > 1) {
		if (child.markings === "birthmark") {
			r += `${He} has a large, liver-colored birthmark, but since ${he}'s well known, this uniqueness adds to ${his} beauty rather than detracting from it. `;
		}
	}
	*/

	// TODO: rewrite this to sound more natural
	if (child.skill.whoring <= 10) {
		if (child.skill.entertainment <= 10) {
			if (child.skill.entertainment <= 0) {
				r += ``;
			} else {
				r += `${He} is somewhat entertaining. `;
			}
		} else if (child.skill.entertainment <= 30) {
			r += `${He} is <span class="skill">reasonably entertaining.</span> `;
		} else if (child.skill.entertainment <= 60) {
			r += `${He} is a <span class="skill">skilled entertainer.</span> `;
		} else if (child.skill.entertainment < 100) {
			r += `${He} is an <span class="skill">expert entertainer.</span> `;
		} else {
			r += `${He} is a <span class="skill">master of entertainment.</span> `;
		}
	} else {
		if (child.skill.entertainment <= 10) {
			if (child.skill.entertainment <= 0) {
				r += ``;
			} else {
				r += `${He} is somewhat entertaining and `;
			}
		} else if (child.skill.entertainment <= 30) {
			r += `${He} is <span class="skill">reasonably entertaining</span> and `;
		} else if (child.skill.entertainment <= 60) {
			r += `${He} is a <span class="skill">skilled entertainer</span> and `;
		} else if (child.skill.entertainment < 100) {
			r += `${He} is an <span class="skill">expert entertainer</span> and `;
		} else {
			r += `${He} is a <span class="skill">master of entertainment</span> and `;
		}
	}
	if (child.skill.whoring <= 10) {
		if (child.skill.whoring <= 0) {
			r += ``;
		} else {
			r += `${He} has very little experience in selling ${his} body. `;
		}
	} else if (child.skill.whoring <= 30) {
		if (child.skill.entertainment <= 10) {
			r += `${He} `;
		}
		r += `has <span class="skill">basic experience as a prostitute.</span> `;
	} else if (child.skill.whoring <= 60) {
		if (child.skill.entertainment <= 10) {
			r += `${He} is `;
		}
		r += `a <span class="skill">skilled streetwalker.</span> `;
	} else if (child.skill.whoring < 100) {
		if (child.skill.entertainment <= 10) {
			r += `${He} is `;
		}
		r += `an <span class="skill">expert working ${boy}.</span> `;
	} else {
		if (child.skill.entertainment <= 10) {
			r += `${He} is `;
		}
		r += `a <span class="skill">masterful whore.</span> `;
	}

	if (child.custom.desc !== "" && jsDef(child.custom.desc)) {
		r += `${child.custom.desc} `;
	}

	if (arcology.FSGenderFundamentalistLawBeauty > 0 || arcology.FSGenderRadicalistLawBeauty > 0 || arcology.FSSlimnessEnthusiastLaw > 0 || arcology.FSHedonisticDecadenceLaw2 > 0 || arcology.FSRestartSMR > 0) {
		if (arcology.FSGenderFundamentalistLawBeauty + arcology.FSGenderRadicalistLawBeauty > 0) {
			if (genderLawPass(child)) {
				r += `${His} body is a perfect example of the fashionable feminine ideal. `;
			}
		} else if (arcology.FSSlimnessEnthusiastLaw) {
			if (slimPass(child)) {
				r += `${His} body is a perfect example of the fashionable flat ideal. `;
			}
		} else if (arcology.FSHedonisticDecadenceLaw2) {
			if (child.boobs >= 2000 && child.butt >= 5 && child.weight > 95) {
				r += `${His} body is a perfect example of the fashionable plump body. `;
			}
		}
		if (arcology.FSRestartSMR > 0 && arcology.FSRestart > 80 && !child.dick && !child.balls && !child.ovaries && !child.mpreg && child.vagina < 0) {
			r += `${His} body is a perfect example of a subhuman who accepted ${his} place in society. `;
		}
	}

	r += `<br>&nbsp;&nbsp;&nbsp;&nbsp;`;

	r += App.Desc.limbs(child);

	if (V.showClothing && !market) {
		r += `${child.slaveName} is `;
		if (child.clothes === "choosing her own clothes") {
			r += `allowed to choose ${his} own clothes, but hasn't made a selection yet, `;
		} else {
			r += `wearing ${child.clothes}, `;
		}

		switch (child.clothes) {
			case "a slave gown":
				r += `a gorgeous affair ${!hasAnyLegs(child) ? `cleavage and a short skirt. ` : `with cuts that offer tantalizing glimpses of delicate flesh and ${footwear(child)}`}`;
				break;
			case "a ball gown":
				r += `a majestically grand silken dress for formal ${!hasAnyLegs(child) ? `back. ` : `occasions, stockings, and ${footwear(child)}`}`;
				break;
			case "a mini dress":
				r += `a body hugging strapless number that shows as much skin as it ${!hasAnyLegs(child) ? `everything. ` : `covers, paired with ${footwear(child)}`}`;
				break;
			case "a schoolgirl outfit":
				r += `which includes a tight white ${!hasAnyLegs(child) ? `pattern. ` : `blouse, a short plaid skirt, and ${footwear(child)}`}`;
				break;
			case "a sweater":
			case "a t-shirt":
			case "a tank-top":
			case "an oversized t-shirt":
				r += `which only covers ${his} ${!hasAnyLegs(child) ? `breasts. ` : `torso, and ${footwear(child)}`}`;
				break;
			default:
				r += `so ${his} nude body is on display. ${!hasAnyLegs(child) ? `In fact, ${he}'s devoid of even legs. ` : `${He} is wearing ${footwear(child)}`}`;
				break;
		}
	}

	if (V.showBodyMods) {
		r += clothingCorset(child);
	}

	if (V.showClothing && !market) {
		r += `${He}`;
	} else {
		r += `${child.slaveName}`;
	}
	let averageHeight = Height.mean(child);

	r += ` is `;

	// TODO: should these numbers be tweaked to account for smaller body sizes?
	if (child.height <= averageHeight + 5 && child.height >= averageHeight - 5) {
		r += `an average height`;
		if (child.physicalAge < 16) {
			r += ` for ${his} age`;
		}
	} else if (child.height < averageHeight - 15) {
		r += `petite`;
		if (child.physicalAge < 16) {
			r += ` for ${his} age`;
		}
	} else if (child.height < averageHeight - 5) {
		r += `short`;
		if (child.physicalAge < 16) {
			r += ` for ${his} age`;
		}
	} else if (child.height > averageHeight + 15) {
		r += `very tall`;
		if (child.physicalAge < 16) {
			r += ` for ${his} age`;
		}
	} else if (child.height > averageHeight + 5) {
		r += `tall`;
		if (child.physicalAge < 16) {
			r += ` for ${his} age`;
		}
	}
	if (V.showHeightCMs) {
		r += ` at ${heightToEitherUnit(child.height)},`;
	}

	r += ` and `;

	if (child.weight > 190) {
		if (FutureSocieties.isActive('FSHedonisticDecadence', arcology)) {
			r += `${either("perfectly curvy", "perfectly plush")}. `;
		} else {
			r += `<span class="red">${either("dangerously fat", "dangerously overweight", "extremely obese")}.</span> `;
		}
	} else if (child.weight > 160) {
		if (FutureSocieties.isActive('FSHedonisticDecadence', arcology)) {
			r += `${either("spectacularly curvy", "spectacularly plush")}. `;
		} else {
			r += `<span class="red">${either("extremely fat", "extremely overweight")}.</span> `;
		}
	} else if (child.weight > 130) {
		if (FutureSocieties.isActive('FSHedonisticDecadence', arcology)) {
			r += `${either("amazingly curvy", "amazingly plush")}. `;
		} else {
			r += `<span class="red">${either("very overweight", "obese", "very fat")}.</span> `;
		}
	} else if (child.weight > 95) {
		if (child.hips > 1) {
			r += `${either("extremely curvy", "extremely plush")}, but ${his} huge hips make the extra weight attractive on ${him}. `;
		} else if (FutureSocieties.isActive('FSHedonisticDecadence', arcology)) {
			r += `${either("extremely curvy", "extremely plush")}. `;
		} else {
			r += `<span class="red">${either("carrying a lot of extra weight", "fat", "overweight")}.</span> `;
		}
	} else if (child.weight > 30) {
		if (child.hips > 1) {
			r += `${either("quite curvy", "very plush")}, but ${his} motherly hips make the extra weight attractive on ${him}. `;
		} else if (FutureSocieties.isActive('FSHedonisticDecadence', arcology)) {
			r += `${either("quite curvy", "very plush")}. `;
		} else {
			r += `<span class="red">${either("carrying extra weight", "chubby")}.</span> `;
		}
	} else if (child.weight > 10) {
		r += `${either("nicely plush", "pleasingly curvy")}. `;
	} else if (child.weight >= -10) {
		r += `${either("a healthy weight", "an attractive weight")}. `;
	} else if (child.weight >= -30) {
		r += `${either("appealingly skinny", "pleasingly thin")}. `;
	} else if (child.weight >= -95) {
		if (child.hips > 1) {
			r += `${either("quite skinny", "very thin")}, but ${his} wide hips make the gap between ${his} thighs very noticeable. `;
		} else if (child.hips < -1) {
			r += `${either("quite skinny", "very thin")}, but ${his} trim hips make ${him} look like a model. `;
		} else {
			r += `<span class="red">${either("rail thin", "too skinny", "underweight")}.</span> `;
		}
	} else {
		r += `<span class="red">${either("dangerously skinny", "emaciated")}.</span> `;
	}

	if (child.hips > 2) {
		r += `${His} hips are unrealistically wide; it is obvious they have been artificially widened. `;
	}

	r += waist(child);

	if (arcology.FSGenderFundamentalistLawBeauty + arcology.FSGenderFundamentalistLawBeauty > 0) {
		if (!FutureSocieties.isActive('FSHedonisticDecadence', arcology) && arcology.FSPhysicalIdealistStrongFat === 0) {
			if (child.weight > 130) {
				r += `${He} is much too fat for the fashionable feminine ideal. `;
			} else if (child.weight > 30) {
				r += `${He} is too fat for the fashionable feminine ideal. `;
			} else if (child.weight < -30) {
				r += `${He} is too skinny for the fashionable feminine ideal. `;
			}
		} else {
			if (child.weight > 130) {
				r += `${He} is much too fat for the fashionable feminine ideal. `;
			} else if (child.weight < -30) {
				r += `${He} is too skinny for the fashionable feminine ideal. `;
			}
		}
	} else if (arcology.FSSlimnessEnthusiastLaw === 1) {
		if (!FutureSocieties.isActive('FSHedonisticDecadence', arcology) && arcology.FSPhysicalIdealistStrongFat === 0) {
			if (child.weight > 30) {
				r += `${He} is much too fat for the fashionable feminine ideal. `;
			} else if (child.weight > 10) {
				r += `${He} is too fat for the fashionable feminine ideal. `;
			}
		} else {
			if (child.weight > 60) {
				r += `${He} is much too fat for the fashionable feminine ideal. `;
			} else if (child.weight > 30) {
				r += `${He} is too fat for the fashionable feminine ideal. `;
			}
		}
	} else if (arcology.FSHedonisticDecadenceLaw2) {
		if (child.weight <= 95) {
			r += `${He} is too thin for the fashionable feminine ideal. `;
		} else if (child.weight <= 10) {
			r += `${He} is much too thin for the fashionable feminine ideal. `;
		}
	}

	if (canWalk(child)) {
		if (child.weight > (170 + child.muscles / 5) && child.physicalAge >= 18) {
			r += `${He} is so fat that it is difficult for ${him} to move. `;
			if (child.muscles > 95) {
				r += `However, ${he} is so powerfully built that ${he} can manage it with effort, though ${he} often has to stop for breaks. `;
			} else if (child.muscles > 30) {
				r += `${He} can barely manage to get to ${his} feet unaided, and usually walks alongside objects to help relieve the weight. `;
			} else if (child.muscles > 5) {
				r += `${He} requires assistance to get to ${his} feet, and tends to lean on things to help relieve the weight. Much furniture has met an early demise thanks to this habit. `;
			} else {
				r += `${He} cannot get to ${his} feet unaided, and tries to stay seated as much as ${he} can. `;
			}
		} else if (child.weight > (110 + child.muscles / 20) && child.physicalAge <= 3) {
			r += `${He} is so fat that it is difficult for ${him} to move. `;
			if (child.muscles > 95) {
				r += `However, ${he} is so powerfully built that ${he} can manage it with effort, though ${he} often has to stop for breaks. `;
			} else if (child.muscles > 30) {
				r += `${He} can barely manage to get to ${his} feet unaided, and usually walks alongside objects to help relieve the weight. `;
			} else if (child.muscles > 5) {
				r += `${He} requires assistance to get to ${his} feet, and tends to lean on things to help relieve the weight. Much furniture has met an early demise thanks to this habit. `;
			} else {
				r += `${He} cannot get to ${his} feet unaided, and tries to stay seated as much as ${he} can. `;
			}
		} else if (child.weight > (140 + child.muscles / 15) && child.physicalAge <= 12) {
			r += `${He} is so fat that it is difficult for ${him} to move. `;
			if (child.muscles > 95) {
				r += `However, ${he} is so powerfully built that ${he} can manage it with effort, though ${he} often has to stop for breaks. `;
			} else if (child.muscles > 30) {
				r += `${He} can barely manage to get to ${his} feet unaided, and usually walks alongside objects to help relieve the weight. `;
			} else if (child.muscles > 5) {
				r += `${He} requires assistance to get to ${his} feet, and tends to lean on things to help relieve the weight. Much furniture has met an early demise thanks to this habit. `;
			} else {
				r += `${He} cannot get to ${his} feet unaided, and tries to stay seated as much as ${he} can. `;
			}
		} else if (child.weight > (165 + child.muscles / 10 && child.physicalAge < 18)) {
			r += `${He} is so fat that it is difficult for ${him} to move. `;
			if (child.muscles > 95) {
				r += `However, ${he} is so powerfully built that ${he} can manage it with effort, though ${he} often has to stop for breaks. `;
			} else if (child.muscles > 30) {
				r += `${He} can barely manage to get to ${his} feet unaided, and usually walks alongside objects to help relieve the weight. `;
			} else if (child.muscles > 5) {
				r += `${He} requires assistance to get to ${his} feet, and tends to lean on things to help relieve the weight. Much furniture has met an early demise thanks to this habit. `;
			} else {
				r += `${He} cannot get to ${his} feet unaided, and tries to stay seated as much as ${he} can. `;
			}
		}
	}

	r += heightImplant(child);

	r += `${He} is `;
	if (child.muscles > 95) {
		r += `<span class="pink">extremely muscular,</span> with defined pecs, powerful glutes, and massive traps`;
		if (child.weight > 95) {
			r += ` hidden beneath a layer of fat`;
		}
		r += `. `;
	} else if (child.muscles > 50) {
		r += `<span class="pink">quite muscular,</span> with ripped abs, strong shoulders, and defined lats`;
		if (child.weight > 95) {
			r += ` hidden beneath a layer of fat`;
		}
		r += `. `;
	} else if (child.muscles > 30) {
		r += `<span class="pink">well built,</span> yet feminine with defined abs and strong shapely muscles`;
		if (child.weight > 95) {
			r += ` hidden beneath a layer of fat`;
		}
		r += `. `;
	} else if (child.muscles > 5) {
		r += `<span class="pink">well built,</span> yet feminine, with just-visible muscles`;
		if (child.weight > 30) {
			r += ` hidden beneath a layer of fat`;
		}
		r += `. `;
	} else if (child.muscles >= -5) {
		r += `<span class="pink">soft and feminine,</span> with no visible muscles. `;
	} else if (child.muscles >= -30) {
		r += `<span class="pink">rather weak,</span> with barely any muscles. `;
	} else if (child.muscles >= -95) {
		r += `<span class="pink">very weak;</span> ${he} struggles with day-to-day tasks. `;
	} else {
		r += `<span class="red">frail;</span> ${he} can barely hold ${himself} up. `;
	}

	if (arcology.FSGenderFundamentalistLawBeauty + arcology.FSGenderRadicalistLawBeauty + arcology.FSSlimnessEnthusiastLaw > 0 && !FutureSocieties.isActive('FSPhysicalIdealist', arcology) && !arcology.FSHedonisticDecadenceStrongFat) {
		if (arcology.FSPhysicalIdealistLaw > 0 && child.muscles > 50) {
			r += `${He} is entirely too muscular for the fashionable feminine ideal. `;
		} else if (child.muscles > 30) {
			r += `${He} is entirely too muscular for the fashionable feminine ideal. `;
		}
	}

	if (hasAnyArms(child)) {
		let s = "s";
		let a = "";
		if (!hasBothArms(child)) {
			s = "";
			a = "a ";
		}
		if (child.weight > 190) {
			r += `${He} has ${a}hugely thick arm${s} with sagging fat rolls and `;
		} else if (child.weight > 160) {
			r += `${He} has ${a}thick arm${s} with drooping fat folds and `;
		} else if (child.weight > 130) {
			r += `${He} has ${a}plump arm${s} with `;
		} else if (child.weight > 97) {
			r += `${He} has ${a}chubby arm${s} with `;
		} else {
			r += `${He} has ${a}normal arm${s} with `;
		}

		if (child.muscles > 95) {
			r += `huge muscles`;
			if (child.weight > 95) {
				r += ` hidden beneath ${his} soft flesh`;
			}
			r += `. `;
		} else if (child.muscles > 30) {
			r += `obvious muscles`;
			if (child.weight > 95) {
				r += ` hidden beneath ${his} soft flesh`;
			}
			r += `. `;
		} else if (child.muscles > 5) {
			r += `toned muscles`;
			if (child.weight > 30) {
				r += ` hidden beneath ${his} soft flesh`;
			}
			r += `. `;
		} else {
			r += `little muscle to them. `;
		}
	}

	if (child.skill.combat > 0) {
		r += `${He} is <span class="skill"skilled at combat:</span> ${he} is comfortable with the use of modern firearms and edges weapons, and ${his} limbs `;
		if (getLimbCount(child, 105) > 1) {
			r += `would be deadly weapons even if they weren't full of deadly weapons already`;
		} else if (!isAmputee(child)) {
			r += `would be deadly weapons if ${he} had any`;
		} else {
			r += `are deadly weapons`;
		}
		r += `. `;
	}

	if (child.counter.pitKills > 0) {
		r += `${child.counter.pitKills} slaves have died by ${his} hand in pit fights. `;
	}

	if (child.piercing.corset.weight > 0) {
		r += piercings.corset(child);
	}

	if (hasAnyLegs(child)) {
		let s = "s";
		let a = "";
		if (!hasBothLegs(child)) {
			s = "";
			a = "a ";
		}

		if (child.weight > 190) {
			r += `${He} has ${hasBothLegs(child) ? `` : `an `}extremely fat leg${s} with ${hasBothLegs(child) ? `` : `an `}immense soft, rather uneven thigh${s} and `;
		} else if (child.weight > 160) {
			r += `${He} has ${a}very fat leg${s} with ${a}massively thick, soft, somewhat uneven thigh${s} and `;
		} else if (child.weight > 130) {
			r += `${He} has ${a}fat leg${s} with ${a}hugely thick, soft thigh${s} and `;
		} else if (child.weight > 97) {
			r += `${He} has ${a}fat leg${s} with ${a}thick, soft thigh${s} and `;
		} else if (child.weight > 95) {
			r += `${He} has ${a}normal leg${s} with ${a}thick, soft thigh${s} and `;
		} else {
			r += `${He} has ${a}relatively normal leg${s} and thigh${s} with `;
		}

		if (child.muscles > 95) {
			r += `huge muscles`;
			if (child.weight > 95) {
				r += ` hidden beneath ${his} soft flab`;
			}
			r += `. `;
		} else if (child.muscles > 30) {
			r += `obvious muscles`;
			if (child.weight > 95) {
				r += ` hidden beneath ${his} soft flab`;
			}
			r += `. `;
		} else if (child.muscles > 5) {
			r += `toned muscles`;
			if (child.weight > 30) {
				r += ` hidden beneath ${his} soft flab`;
			}
			r += `. `;
		} else {
			r += `barely any muscle in them. `;
		}
	}

	r += heel(child);

	r += App.Desc.brand(child, "feet");
	r += App.Desc.brand(child, "calf");
	r += App.Desc.brand(child, "ankle");
	r += App.Desc.brand(child, "extra");

	r += skin(child);

	if (market) {
		r += accent(child);
	}

	if (child.markings === "birthmark" && !child.prestige && child.pornPrestige < 2) {
		r += `${He} has a large, liver-colored birthmark, detracting from ${his} beauty. `;
	}
	if (child.skin === "sun tanned") {
		if (App.Utils.hasNonassignmentSex(child)) {
			if (child.fetishKnown && child.fetishStrength > 60) {
				r += `${His} tan is slightly uneven, since ${he} enjoys`;
				switch (child.fetish) {
					case "buttslut":
						r += `letting other tanned slaves share a tanning bed with ${him} so they can sodomize ${him} while ${he} tans. `;
						break;
					case "cumslut":
						r += `letting other tanned slaves share a tanning bed with ${him} so they get oral from ${him} while ${he} tans. `;
						break;
					case "sadist":
						r += `forcing inferior slaves into the tanning beds with ${him} so ${he} can sodomize them while ${he} tans. `;
						break;
					case "dom":
						r += `bringing other slaves into the tanning beds with ${him} so ${he} can fuck them while ${he} tans. `;
						break;
					case "masochist":
					case "submissive":
						r += `letting other slaves into the tanning beds with ${him} so they can fuck ${him} while ${he} tans. `;
						break;
					case "boobs":
						r += `bringing other slaves into the tanning beds with ${him} so ${he} can tittyfuck them while ${he} tans. `;
						break;
					case "pregnancy":
						if (Math.random() * 100 < V.seeDicks) {
							r += `letting slaves with dicks into the tanning beds with ${him} so they can cum inside ${him} while ${he} tans. `;
						}
						break;
					default:
						r += `bringing other slaves into the tanning beds with ${him} to have sex while ${he} tans. `;
						break;
				}
			}
		}
	}

	if (V.showClothing && !market) {
		r += ears(child);
		r += upperFace(child);
		r += hair(child);
	} else {
		r += `${His} hair is ${child.hColor}`;
		if (child.hColor !== child.eyebrowHColor) {
			r += `, with ${child.eyebrowHColor} eyebrows`;
		}
		r += `. `;
		if (child.hColor === "red" && child.hLength >= 10) {
			if (child.markings === "freckles" || (child.markings === "heavily freckled")) {
				if (skinToneLevel(child.skin) > 5 && skinToneLevel(child) < 10) {
					r += `It goes perfectly with ${his} ${child.skin} skin and freckles. `;
				}
			}
		}
	}

	let pubertyAge = Math.max(child.pubertyAgeXX, child.pubertyAgeXY);
	if (child.race === "catgirl") {
		if (child.underArmHStyle === "bushy") {
			r += `${His} ${child.skin} underarm fur is especially bushy and untamed. `;
		} else if (child.underArmHStyle === "waxed" || child.underArmHStyle === "hairless" || child.underArmHStyle === "shaved" || child.underArmHStyle === "bald") {
			r += `${His} underarm fur is trim and smooth. `;
		} else {
			r += `${His} ${child.skin} underarm fur is quite regular along ${his} fuzzy body. `;
		}
	} else if (child.physicalAge < pubertyAge - 2) {
		r += `${He} is too sexually immature to have armpit hair. `;
	} else if (child.underArmHStyle === "hairless") {
		r += `${His} armpits are perfectly smooth and naturally hairless. `;
	} else if (child.underArmHStyle === "bald") {
		r += `${His} armpits no longer grow hair, leaving them smooth and hairless. `;
	} else if (child.underArmHStyle === "waxed") {
		r += `${His} armpits are waxed and smooth. `;
	} else if (child.physicalAge < pubertyAge - 1) {
		r += `${He} has a few ${child.underArmHColor} wisps of armpit hair. `;
	} else if (child.physicalAge < pubertyAge) {
		r += `${He} is on the verge of puberty and has a small patch of ${child.underArmHColor} armpit hair. `;
	} else if (child.underArmHStyle === "shaved") {
		r += `${His} armpits appear hairless, but closer inspection reveals light, ${child.underArmHColor} stubble. `;
	} else if (child.underArmHStyle === "neat") {
		r += `${His} armpit hair is neatly trimmed `;
		if (!hasAnyArms(child)) {
			r += `since it is always in full view`;
		} else {
			r += ` to not be visible unless ${he} lifts ${his} arms`;
		}
		r += `. `;
	} else if (child.underArmHStyle === "bushy") {
		r += `${His} ${child.underArmHColor} armpit hair has been allowed to grow freely`;
		if (!hasAnyArms(child)) {
			r += ` creating two bushy patches under where ${his} arms used to be`;
		} else {
			r += ` and can be seen poking out from under ${his} arms at all times`;
		}
		r += `. `;
	}

	if (!child.voice) {
		r += `${He} is <span class="pink">completely silent,</span> which is understandable, since ${he}'s mute. `;
	} else {
		if (child.lips > 95) {
			r += `${He} is <span class="pink">effectively mute,</span> since ${his} lips are so large that ${he} can no longer speak intelligibly. ${He} can still `;
			if (child.devotion > 50) {
				r += `moan`;
			} else if (child.devotion > 20) {
				r += `whimper`;
			} else {
				r += `scream`;
			}
			r += ` through them, though. `;
		}
	}

	if (V.showBodyMods) {
		r += piercings.ears(child);
		r += piercings.nose(child);
		r += piercings.eyebrows(child);
		if (child.custom.tattoo !== "" && jsDef(child.custom.tattoo)) {
			r += `${child.custom.tattoo}`;
		}
	}

	r += face(child);
	r += mouth(child);

	if (V.showClothing && !market) {
		r += collar(child);
		if (child.relationship > 4) { // TODO: will children be able to get married?
			if (hasLeftArm(child)) {
				r += `${He} has a simple gold band on the little finger of ${his} left hand. `;
			} else if (hasRightArm(child)) {
				r += `${He} has a simple gold band on the little finger of ${his} right hand. `;
			} else {
				r += `${He} has a simple gold band on a length of chain around ${his} neck. `;
			}
		} else if (child.relationship === -3) {
			if (hasLeftArm(child)) {
				r += `${He} has a simple steel band on the little finger of ${his} left hand. `;
			} else if (hasRightArm(child)) {
				r += `${He} has a simple steel band on the little finger of ${his} right hand. `;
			} else {
				r += `${He} has a simple steel band on a length of cord around ${his} neck. `;
			}
		}
	}

	r += nails(child);
	if (V.showBodyMods) {
		r += tats.back(child);
		r += tats.shoulders(child);
		r += tats.arms(child);
	}

	if (child.minorInjury !== 0 && child.minorInjury !== "sore ass") {
		r += `${He} is sporting a <span class="red">${child.minorInjury},</span> covered by makeup. `;
	}

	r += `<br>&nbsp;&nbsp;&nbsp;&nbsp;`;

	r += App.Desc.boobs(child);
	r += App.Desc.boobsExtra(child);
	if (V.showBodyMods) {
		r += tats.boobs(child);
	}
	r += App.Desc.brand(child, "chest");
	r += App.Desc.brand(child, "breast");
	r += shoulders(child);
	r += App.Desc.nipples(child);
	if (V.showBodyMods) {
		r += piercings.nipples(child);
	}
	r += App.Desc.areola(child);

	if (child.inflation > 0) {
		V.activeSlave = child;
		r += `${App.Desc.bellyInflation(child)} `; // TODO:
	} else if (child.bellyImplant >= 2000) {
		V.activeSlave = child;
		r += App.Desc.bellyImplant(child); // TODO:
		r += ` `;
	} else {
		V.activeSlave = child;
		r += `${App.Desc.belly(child)} `; // TODO:
	}
	r += butt(child);

	r += `<br>&nbsp;&nbsp;&nbsp;&nbsp;`;

	r += crotch(child);
	r += dick(child);
	r += vagina(child);
	r += anus(child);

	r += `<br>&nbsp;&nbsp;&nbsp;&nbsp;`;

	switch (child.drugs) {
		case "super fertility drugs":
			if (isFertile(child) && !child.preg) {
				r += `${He} is constantly dripping sexual fluids and ${his} breasts and belly are slightly swollen. The super fertility drugs have ${him} ready to be impregnated. `;
			}
			break;
		case "fertility drugs":
			if (isFertile(child) && !child.preg) {
				r += `${He} smells of sexual fluids and ${his} breasts are slightly swollen. The fertility drugs have ${him} ready to be impregnated. `;
			}
			break;
		case "intensive breast injections":
		case "hyper breast injections":
			r += `${He} ${hasAnyArms(child) ? `massages ${his} tits uncomfortably` : `squirms under the unfamiliar weight on ${his} chest`}. The ${child.drugs === "hyper breast injections" ? `HA-HGH` : `A-HGH`} must be having an effect, painfully stretching ${his} breasts as the mammary and adipose tissue underneath grows explosively. `;
			break;
		case "nipple enhancers":
			r += `${He} ${hasAnyArms(child) ? `massages ${his} nipples uncomfortably` : `squirms in response to the discomfort in ${his} nipples`}. The A-HGH must be having an effect, painfully causing ${his} body to expand ${his} nipples. `;
			break;
		case "intensive butt injections":
		case "hyper butt injections":
			r += `${He} ${hasAnyArms(child) ? `massages ${his} butt uncomfortably` : `squirms under the unfamiliar weight on ${his} backside`}. The ${child.drugs === "hyper butt injections" ? `HA-HGH` : `A-HGH`} must be having an effect, painfully stretching ${his} buttocks as the muscular and adipose tissue underneath grows explosively. `;
			break;
		case "intensive penis enhancement":
		case "hyper penis enhancement":
			r += `${He} ${hasAnyArms(child) ? `massages ${his} ${child.dick > 0 ? `dick` : `clit`} uncomfortably` : `squirms under the unfamiliar weight in ${his} ${child.dick > 0 ? `dick` : `clit`}`}. The ${child.drugs === "hyper penis enhancement" ? `HA-HGH` : `A-HGH`} must be having an effect, painfully lengthening and thickening ${his} ${child.dick > 0 ? `dick` : `clit`}. `;
			break;
		case "intensive testicle enhancement":
		case "hyper testicle enhancement":
			r += `${He} ${hasAnyArms(child) ? `${He} massages ${his} balls uncomfortably` : `${He} squirms under the unfamiliar pressure in ${his} balls`} as `;
			if (child.drugs === "hyper testicle enhancement") {
				if (child.balls < 20) {
					r += ` as cum drools from the tip of ${his} dick. `;
				} else if (child.balls >= 50) {
					r += ` as a thick cascade of cum pours from the tip of ${his} cock. `;
				} else if (child.balls >= 37) {
					r += ` as cum freely flows from the tip of ${his} cock, pooling under ${him}. `;
				} else if (child.balls >= 20) {
					r += ` as precum pools under ${him}. `;
				}
				r += `The HA-HGH must be having an effect, painfully expanding ${his} testicles. `;
			} else {
				r += `a bead of cum forms on tip of ${his} dick. The A-HGH must be having an effect, painfully expanding ${his} testicles. `;
			}
			break;
		case "female hormone injections":
		case "male hormone injections":
			r += `${He} looks very ill, likely a side effect of the extreme hormone injections. `;
			break;
		case "appetite suppressors":
			r += `Despite how little ${he} has been eating lately, ${his} stomach barely growls at all. `;
			break;
		case "penis atrophiers":
			r += `${He} ${hasAnyArms(child) ? `massages ${his} dick uncomfortably` : `squirms in response to the discomfort in ${his} dick`}. The A-TRPH must be having an effect, painfully causing ${his} body to atrophy ${his} dick. `;
			break;
		case "testicle atrophiers":
			r += `${He} ${hasAnyArms(child) ? `massages ${his} balls uncomfortably` : `squirms in response to the discomfort in ${his} balls`}. The A-TRPH must be having an effect, painfully causing ${his} body to atrophy ${his} balls. `;
			break;
		case "clitoris atrophiers":
			r += `${He} ${hasAnyArms(child) ? `massages ${his} clit uncomfortably` : `squirms in response to the discomfort in ${his} clit`}. The A-TRPH must be having an effect, painfully causing ${his} body to atrophy ${his} clit. `;
			break;
		case "labia atrophiers":
			r += `${He} ${hasAnyArms(child) ? `massages ${his} pussy uncomfortably` : `squirms in response to the discomfort in ${his} pussy`}. The A-TRPH must be having an effect, painfully causing ${his} body to atrophy ${his} pussy. `;
			break;
		case "nipple atrophiers":
			r += `${He} ${hasAnyArms(child) ? `massages ${his} nipples uncomfortably` : `squirms in response to the discomfort in ${his} nipples`}. The A-TRPH must be having an effect, painfully causing ${his} body to atrophy ${his} nipples. `;
			break;
		case "lip atrophiers":
			r += `${He} ${hasAnyArms(child) ? `massages ${his} lips uncomfortably` : `licks ${his} lips uncomfortably`}. The A-TRPH must be having an effect, painfully causing ${his} body to atrophy ${his} lips. `;
			break;
		case "breast redistributors":
		case "butt redistributors":
			r += `${He} ${hasAnyArms(child) ? `pinches at the fat building on ${his} belly and lets off a sigh` : `squirms under the added weight building on ${his} belly`}. The RDST-D must be having an effect, encouraging ${his} body to redistribute ${his} ${child.drugs === "breast redistributors" ? `breasts'` : `buttocks'`} adipose tissue to ${his} middle. `;
			break;
		case "sag-B-gone":
			r += `${His} breasts are shiny from the layer of anti-sag cream rubbed onto them. They might be a little perkier, or not. `;
			break;
	}

	if (child.aphrodisiacs > 0 || child.inflationType === "aphrodisiacs") {
		if (child.inflationType === "aphrodisiacs") {
			r += `${He}'s literally full of`;
			if (isAmputee(child)) {
				r += `aphrodisiacs, but is an amputee, so ${he} cannot touch ${himself}. ${He} writhes with extreme sexual frustration, desperately trying to relieve ${himself}, but only managing to stir up the aphrodisiacs contained in ${his} gut, strengthening their effects even more. `;
			} else if (child.chastityVagina) {
				r += `aphrodisiacs, but is wearing a chastity belt and cannot touch ${himself}. ${He} writhes with extreme sexual frustration, desperately trying to relieve ${himself}, but only managing to stir up the aphrodisiacs contained in ${his} gut, strengthening their effects even more. `;
			} else if (child.rules.release.masturbation === 1 && child.dick !== 0 && child.vagina === -1) {
				r += `aphrodisiacs and is allowed to masturbate, so as ${he} stands before you ${he} rubs ${his} shaft with one hand while ${he} fingers ${his} anus with the other. ${canPenetrate(child) ? `${His} cock is painfully erect. ` : ``}${His} frantic masturbation forces ${his} distended middle to jiggle obscenely, stirring up the aphrodisiacs contained in ${his} gut and strengthening their effects even more. `;
			} else if (child.rules.release.masturbation === 1 && child.dick !== 0) {
				r += `aphrodisiacs and is allowed to masturbate, so as ${he} stands before you ${he} rubs ${his} shaft and pussy with one hand while ${he} fingers ${his} anus with the other. ${canPenetrate(child) ? `${His} cock is painfully erect. ` : ``}${His} frantic masturbation forces ${his} distended middle to jiggle obscenely, stirring up the aphrodisiacs contained in ${his} gut and strengthening their effects even more. `;
			} else if (child.rules.release.masturbation === 1 && child.vagina !== -1) {
				r += `aphrodisiacs, has ${V.seeDicks > 0 ? `no penis and ` : ``}no vagina, and is not allowed to masturbate, so as ${he} stands before you ${he} `;
				if (child.anus === 0) {
					r += `plays with a nipple with one hand while furiously rubbing ${his} virgin anus and the sensitive perineum beneath it with the other, desperately trying to get ${himself} off. ${His} frantic attempts force ${his} distended middle to jiggle obscenely, stirring up the aphrodisiacs contained in ${his} gut and strengthening their effects even more. `;
				} else {
					r += `uses `;
					if (child.anus > 2) {
						r += `${his} entire hand, formed into a beak shape,`;
					} else if (child.anus > 1) {
						r += `two fingers`;
					} else {
						r += `a finger`;
					}
					r += ` to fuck ${his} own ass. ${His} frantic attempts force ${his} distended middle to jiggle obscenely, stirring up the aphrodisiacs contained in ${his} gut and strengthening their effects even more. `;
				}
			} else if (child.rules.release.masturbation === 1) {
				r += `aphrodisiacs and is allowed to masturbate, so as ${he} stands before you ${he} rubs ${his} clit with one hand while ${he} fingers ${his} anus with the other. `;
			} else if (child.dick !== 0) {
				r += `aphrodisiacs and is not allowed to masturbate, so as ${he} stands before you ${he} desperately presents ${his} open mouth, ${his} breasts, ${his} crotch, and ${his} anus in turn, hoping that something will entice you to give ${him} relief. ${canPenetrate(child) ? `${His} cock is painfully erect. ` : ``}`;
			} else if (child.vagina === -1) {
				r += `aphrodisiacs, has ${V.seeDicks > 0 ? `no penis and ` : ``}no vagina, and is not allowed to masturbate, so as ${he} stands before you ${he} desperately presents ${his} asshole, desperately hoping you'll fuck ${his} only real source of relief. `;
			} else {
				r += `aphrodisiacs and is not allowed to masturbate, so as ${he} stands before you ${he} desperately presents ${his} open mouth, ${his} breasts, ${his} pussy, and ${his} anus in turn, hoping that something will entice you to give ${him} relief. `;
			}
		} else if (child.aphrodisiacs > 1) {
			r += `${He}'s swimming in`;
			if (isAmputee(child)) {
				r += `aphrodisiacs, but is an amputee, so ${he} cannot touch ${himself}. ${He} writhes with extreme sexual frustration, desperately trying to relieve ${himself}. `;
			} else if (child.chastityVagina) {
				r += `aphrodisiacs, but is wearing a chastity belt and cannot touch ${himself}. ${He} writhes with extreme sexual frustration, desperately trying to relieve ${himself}. `;
			} else if (child.rules.release.masturbation === 1 && child.dick !== 0 && child.vagina === -1) {
				r += `aphrodisiacs and is allowed to masturbate, so as ${he} stands before you ${he} rubs ${his} shaft with one hand while ${he} fingers ${his} anus with the other. ${canPenetrate(child) ? `${His} cock is painfully erect. ` : ``}`;
			} else if (child.rules.release.masturbation === 1 && child.dick !== 0) {
				r += `aphrodisiacs and is allowed to masturbate, so as ${he} stands before you ${he} rubs ${his} shaft and pussy with one hand while ${he} fingers ${his} anus with the other. ${canPenetrate(child) ? `${His} cock is painfully erect. ` : ``}`;
			} else if (child.rules.release.masturbation === 1 && child.vagina !== -1) {
				r += `aphrodisiacs, has ${V.seeDicks > 0 ? `no penis and ` : ``}no vagina, and is not allowed to masturbate, so as ${he} stands before you ${he}`;
				if (child.anus === 0) {
					r += `plays with a nipple with one hand while furiously rubbing ${his} virgin anus and the sensitive perineum beneath it with the other, desperately trying to get ${himself} off. `;
				} else {
					r += `uses `;
					if (child.anus > 2) {
						r += `${his} entire hand, formed into a beak shape,`;
					} else if (child.anus > 1) {
						r += `two fingers`;
					} else {
						r += `a finger`;
					}
					r += ` to fuck ${his} own ass. `;
				}
			} else if (child.rules.release.masturbation === 1) {
				r += `aphrodisiacs and is allowed to masturbate, so as ${he} stands before you ${he} rubs ${his} clit with one hand while ${he} fingers ${his} anus with the other. `;
			} else if (child.dick !== 0) {
				r += `aphrodisiacs and is not allowed to masturbate, so as ${he} stands before you ${he} desperately presents ${his} open mouth, ${his} breasts, ${his} crotch, and ${his} anus in turn, hoping that something will entice you to give ${him} relief. ${canPenetrate(child) ? `${His} cock is painfully erect. ` : ``}`;
			} else if (child.vagina === -1) {
				r += `aphrodisiacs, has ${V.seeDicks > 0 ? `no penis and ` : ``}no vagina, and is not allowed to masturbate, so as ${he} stands before you ${he} desperately presents ${his} asshole, desperately hoping you'll fuck ${his} only real source of relief. `;
			} else {
				r += `aphrodisiacs and is not allowed to masturbate, so as ${he} stands before you ${he} desperately presents ${his} open mouth, ${his} breasts, ${his} pussy, and ${his} anus in turn, hoping that something will entice you to give ${him} relief. `;
			}
		} else {
			if (isAmputee(child)) {
				r += `${He}'s on aphrodisiacs, but is an amputee, so ${he} cannot touch ${himself}. ${He} writhes with sexual frustration. `;
			} else if (child.chastityVagina) {
				r += `${He}'s on aphrodisiacs, but is wearing a chastity belt and cannot touch ${himself}. ${He} writhes with sexual frustration. `;
			} else if (child.rules.release.masturbation === 1 && child.dick !== 0 && child.vagina === -1) {
				r += `${He}'s on aphrodisiacs and is allowed to masturbate, so as ${he} obeys your commands ${he} idly rubs ${his} shaft with one hand while the other pinches a nipple. `;
			} else if (child.rules.release.masturbation === 1 && child.dick !== 0) {
				r += `${He}'s on aphrodisiacs and is allowed to masturbate, so as ${he} obeys your commands ${he} idly rubs ${his} shaft and pussy with one hand while the other pinches a nipple. `;
			} else if (child.rules.release.masturbation === 1) {
				r += `${He}'s on aphrodisiacs and is allowed to masturbate, so as ${he} obeys your commands ${he} idly rubs ${his} pussy with one hand while the other pinches a nipple. `;
			} else if (child.dick !== 0 && canPenetrate(child)) {
				r += `${He}'s on aphrodisiacs and is not allowed to masturbate, so as ${he} obeys your commands ${he} shifts ${his} weight uncomfortably. ${His} erect dick sways as ${he} does. `;
			} else {
				r += `${He}'s on aphrodisiacs and is not allowed to masturbate, so as ${he} obeys your commands ${he} shifts ${his} weight uncomfortably. `;
			}
		}
	}

	if (child.addict.isBetween(0, 3)) {
		r += `${He} is a new <span class="cyan">aphrodisiac addict.</span> `;
	} else if (child.addict.isBetween(0, 10)) {
		r += `${He} is a confirmed <span class="cyan">aphrodisiac addict.</span> `;
	} else if (child.addict > 0) {
		r += `${He} is completely <span class="cyan">dependent on aphrodisiacs,</span> and it is unlikely you will ever be able to wean ${him} off them. `;
	}

	return r;
};
