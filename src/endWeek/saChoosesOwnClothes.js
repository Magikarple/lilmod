// cSpell:ignore succubutt

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.SlaveAssignment.choosesOwnClothes = function saChoosesOwnClothes(slave) {
	if (slave.choosesOwnClothes !== 1) {
		return "";
	}

	let r = "";
	const player = V.PC;
	const {
		He, His, he, him, his, himself,
	} = getPronouns(slave);

	if (slave.fetish === Fetish.MINDBROKEN) {
		const corsetChoice = todaysCorset(slave);
		const clothingChoice = todaysOutfit(slave);
		slave.bellyAccessory = corsetChoice.bellyAccessory;
		slave.clothes = clothingChoice.clothes;
		r += `${He} is fundamentally broken, but still follows some faint memories of standing within the wardrobe. `;
		if (hasAnyLegs(slave)) {
			const shoeChoice = todaysShoes(slave);
			r += `${shoeChoice.text} `;
			slave.shoes = shoeChoice.shoes;
		}
		r += `${corsetChoice.text} Faced with so many choices and no thought on the matter; ${clothingChoice.text}`;
	} else if (slave.devotion <= 20) {
		const clothingChoice = todaysOutfit(slave);
		slave.clothes = clothingChoice.clothes;
		r += `${clothingChoice.text} `;
		if (hasAnyLegs(slave)) {
			const shoeChoice = todaysShoes(slave);
			r += `${shoeChoice.text} `;
			slave.shoes = shoeChoice.shoes;
		}
		r += `Allowing ${him} permission to dress as ${he} sees fit <span class="devotion dec">increases ${his} independence.</span>`;
		slave.devotion -= 5;
	} else {
		const neckChoice = todaysCollar(slave);
		const corsetChoice = todaysCorset(slave);
		const clothingChoice = todaysOutfit(slave);
		slave.collar = neckChoice.collar;
		slave.bellyAccessory = corsetChoice.bellyAccessory;
		slave.clothes = clothingChoice.clothes;
		r += `${He} <span class="devotion inc">loves</span> being able to dress ${himself}, ${neckChoice.text} ${corsetChoice.text} ${clothingChoice.text} `;
		slave.devotion += 1;

		if (FutureSocieties.isActive('FSRestart') && slave.choosesOwnChastity === 1) {
			if (slave.vagina > -1 && slave.breedingMark === 1 && slave.chastityVagina === 1) {
				r += `${He} unfastens ${his} chastity belt knowing full well ${his} role in life is to carry ${his} ${getWrittenTitle(slave)}'s children. `;
				slave.chastityVagina = 0;
			} else if (slave.vagina > -1 && slave.ovaries === 1 && slave.preg === 0 && slave.chastityVagina !== 1) {
				r += `${He} also affixes a chastity belt over ${his} vagina to discourage use of ${his} reproductive organ. `;
				slave.chastityVagina = 1;
			} else if (slave.vagina > -1 && (slave.ovaries === 0 || slave.preg < -1) && slave.chastityVagina === 1) {
				r += `${He} removes ${his} chastity belt since no matter how hard someone tries, ${he} can never become pregnant. `;
				slave.chastityVagina = 0;
			}
			if (slave.dick > 0 && slave.balls > 0 && slave.chastityPenis !== 1) {
				r += `${He} also affixes a chastity cage onto ${his} dick to discourage use of ${his} reproductive organ. `;
				slave.chastityPenis = 1;
			} else if (slave.dick > 0 && slave.balls === 0 && slave.chastityPenis === 1) {
				r += `${He} removes ${his} chastity cage since even if ${he} could get erect, ${he} only shoots blanks. `;
				slave.chastityPenis = 0;
			}
		}

		if (hasAnyLegs(slave)) {
			const shoeChoice = todaysShoes(slave);
			r += `${shoeChoice.text}`;
			slave.shoes = shoeChoice.shoes;
		}
	}
	return r;

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {{text:string, clothes:FC.Clothes}}
	 */
	function todaysOutfit(slave) {
		/** @type {Array<{text: string, clothes: FC.Clothes}>} */
		const clothing = [];
		/** @type {Array<{text: string, clothes: FC.Clothes}>} */
		const wardrobeAssignment = [];
		/** @type {Array<{text: string, clothes: FC.Clothes}>} */
		const wardrobeFS = [];
		/** @type {Array<{text: string, clothes: FC.Clothes}>} */
		const wardrobeTastes = [];
		/** @type {{text: string, clothes: FC.Clothes}} */
		let selection;

		if (slave.fetish === Fetish.MINDBROKEN) {
			if (V.arcologies[0].FSChattelReligionist > 0) {
				if (V.arcologies[0].FSChattelReligionistLaw2 === 1) {
					selection = {text: `${he} sees others wearing nothing at all, and stays nude ${himself}.`, clothes: "no clothing"};
				} else {
					selection = {text: `${he} commonly sees others wearing chattel habits and is drawn to doing so ${himself}.`, clothes: "a chattel habit"};
				}
			} else {
				/** @type {string} */
				let text;
				/** @type {Array<FC.FutureSociety|"panties">} */
				const clothingFS = ["panties"];
				for (const FS of App.Data.FutureSociety.fsNames) {
					if (V.arcologies[0][FS] > 0) {
						clothingFS.push(FS);
					}
				}
				/** @type {FC.FutureSociety|"panties"} */
				const chosenClothing = jsEither(clothingFS);
				switch (chosenClothing) {
					case "FSEgyptianRevivalist":
						text = `${he} commonly sees others wearing nothing but jewelry and is drawn to doing so ${himself}.`;
						break;
					case "FSRomanRevivalist":
						text = `${he} commonly sees others wearing togas and is drawn to doing so ${himself}.`;
						break;
					case "FSAztecRevivalist":
						text = `${he} commonly sees others wearing huipils and is drawn to doing so ${himself}.`;
						break;
					case "FSEdoRevivalist":
						text = `${he} commonly sees others wearing kimonos and is drawn to doing so ${himself}.`;
						break;
					case "FSArabianRevivalist":
						text = `${he} commonly sees others wearing silk and is drawn to doing so ${himself}.`;
						break;
					case "FSChineseRevivalist":
						text = `${he} commonly sees others wearing qipaos and is drawn to doing so ${himself}.`;
						break;
					case "FSAntebellumRevivalist":
						text = `${he} commonly sees others wearing formal wear such as ball gowns or evening dresses and is drawn to doing so ${himself}.`;
						break;
					case "FSGenderFundamentalist":
						text = `${he} commonly sees cheerleaders and bunnies around and instinctively follows along.`;
						break;
					case "FSPaternalist":
						text = `${he} commonly sees others wearing normal clothing and is drawn to doing so ${himself}.`;
						break;
					case "FSDegradationist":
						text = `${he} commonly sees others wearing chains and is drawn to doing so ${himself}.`;
						break;
					case "FSMaturityPreferentialist":
						text = `${he} commonly sees others wearing suits and is drawn to doing so ${himself}.`;
						break;
					case "FSYouthPreferentialist":
						text = `${he} commonly sees schoolgirls around and instinctively follows along.`;
						break;
					case "FSPhysicalIdealist":
						text = `${he} commonly sees naked girls around and seldom realizes they are coated in oil.`;
						break;
					case "FSPastoralist":
						text = `${he} commonly sees cowgirls around and instinctively follows along.`;
						break;
					case "FSBodyPurist":
						text = `${he} commonly sees others wearing tight, form-fitting clothes and is drawn to doing so ${himself}.`;
						break;
					case "FSSlaveProfessionalism":
						text = `${he} commonly sees others wearing complicated clothing and is drawn to doing so ${himself}.`;
						break;
					case "FSIntellectualDependency":
						text = `${he} commonly sees others showing skin and is drawn to doing so ${himself}.`;
						break;
					default:
						text = `${he} chooses to put on underwear, the reasons lost to ${him}, and moves on.`;
						break;
				}
				if (chosenClothing === "panties") {
					selection = {text: text, clothes: jsEither(["attractive lingerie", "panties"])};
				} else {
					selection = {text: text, clothes: jsEither(clothingLovedByAnFS(chosenClothing))};
					if (!selection.clothes) {
						selection = {
							text: `${he} chooses to put on underwear, as it seems you don't have any clothing available for ${App.Data.FutureSociety.records[chosenClothing].noun}.`,
							clothes: jsEither(["attractive lingerie", "panties"])
						};
					}
				}
			}
		} else if (slave.devotion <= 20) {
			clothing.push({text: `${He} uses the ability to select outfits to cover up with comfortable cutoffs and a t-shirt.`, clothes: "cutoffs and a t-shirt"});
			if (isItemAccessible.entry("a hijab and blouse") === true) {
				clothing.push({text: `${He} uses the ability to select outfits to cover up with the most conservative clothing ${he} can find.`, clothes: "a hijab and blouse"});
			}
			if (isItemAccessible.entry("conservative clothing") === true) {
				clothing.push({text: `${He} uses the ability to select outfits to cover up with the most conservative clothing ${he} can find.`, clothes: "conservative clothing"});
			}
			if (isItemAccessible.entry("a kimono") === true) {
				clothing.push({text: `${He} uses the ability to select outfits to cover ${himself} with a kimono.`, clothes: "a kimono"});
			}
			if (isItemAccessible.entry("stretch pants and a crop-top") === true) {
				clothing.push({text: `${He} uses the ability to select outfits to cover up with stretch pants and a crop-top, though ${he} wishes it didn't have lewd comments printed on it.`, clothes: "stretch pants and a crop-top"});
			}
			selection = jsEither(clothing);
		} else {
			if (slave.assignment === Job.NURSE) { /* Chooses clothes according to assignment (no exceptions)*/
				if (slave.energy > 95 || slave.need > 100) {
					wardrobeAssignment.push({text: `and wears a slutty nurse outfit to make it clear just how much this nurse needs ${his} daily lay.`, clothes: "a slutty nurse outfit"});
				} else if (slave.energy > 80) {
					wardrobeAssignment.push({text: `and wears a slutty nurse outfit to show off ${his} body and arouse ${his} patients.`, clothes: "a slutty nurse outfit"});
					if (isItemAccessible.entry("a nice nurse outfit") === true) {
						wardrobeAssignment.push({text: `and wears a nice nurse outfit to look professional before ${his} patients.`, clothes: "a nice nurse outfit"});
					}
					wardrobeAssignment.push({text: `and wears a slutty nurse outfit to show a little skin as ${he} cares for ${his} patients.`, clothes: "a slutty nurse outfit"});
				} else {
					if (isItemAccessible.entry("a nice nurse outfit") === true) {
						wardrobeAssignment.push({text: `and wears a nice nurse outfit to look professional before ${his} patients.`, clothes: "a nice nurse outfit"});
					}
					wardrobeAssignment.push({text: `and wears a slutty nurse outfit to show to a little skin as ${he} cares for ${his} patients.`, clothes: "a slutty nurse outfit"});
				}
			} else if (slave.assignment === Job.MADAM) {
				if (slave.energy > 95 || slave.need > 100) {
					wardrobeAssignment.push({text: `and wears a slutty suit to be certain nothing blocks ${him} from getting the sex ${he} needs.`, clothes: "slutty business attire"});
				} else if (slave.energy > 80) {
					if (isItemAccessible.entry("nice business attire") === true) {
						wardrobeAssignment.push({text: `and wears a nice suit to show ${he} means business.`, clothes: "nice business attire"});
					}
					wardrobeAssignment.push({text: `and wears a slutty suit to entice and arouse while still looking managerial.`, clothes: "slutty business attire"});
					wardrobeAssignment.push({text: `and wears a slutty suit to entice and arouse while still looking managerial.`, clothes: "slutty business attire"});
				} else {
					if (isItemAccessible.entry("nice business attire") === true) {
						wardrobeAssignment.push({text: `and wears a nice suit to show ${he} means business.`, clothes: "nice business attire"});
					}
					wardrobeAssignment.push({text: `and wears a slutty suit to entice and arouse while still looking managerial.`, clothes: "slutty business attire"});
				}
			} else if (slave.assignment === Job.MILKMAID) {
				if (slave.energy > 95 || slave.need > 100) {
					if (isItemAccessible.entry("body oil") === true) {
						wardrobeAssignment.push({text: `and coats ${himself} with oil to better slip between ${his} cows as ${he} pleasures them.`, clothes: "body oil"});
					}
					wardrobeAssignment.push({text: `but goes nude to not be slowed down while moving between ${his} charges.`, clothes: "no clothing"});
				} else {
					if (isItemAccessible.entry("a nice maid outfit") === true) {
						wardrobeAssignment.push({text: `and wears a sturdy maid outfit, since anything else might be damaged by ${his} hard work with the cows.`, clothes: "a nice maid outfit"});
					}
					wardrobeAssignment.push({text: `and puts on a proper pair of worker's overalls, but not much else.`, clothes: "overalls"});
					wardrobeAssignment.push({text: `and decides to call it Casual Friday and wear nothing but cutoffs and a t-shirt. Not like the cows will mind.`, clothes: "cutoffs and a t-shirt"});
					wardrobeAssignment.push({text: `and opts to don a cheerleader outfit to help cheer the cows on.`, clothes: "a cheerleader outfit"});
					wardrobeAssignment.push({text: `and dresses up as a succubus since ${he}'ll be drawing plenty of fluids.`, clothes: "a succubus outfit"});
					wardrobeAssignment.push({text: `and slips into some spats and a tank top since ${he} feels a workout coming on.`, clothes: "spats and a tank top"});
					if (isItemAccessible.entry("Western clothing") === true) {
						wardrobeAssignment.push({text: `and wears an appropriate cowgirl outfit. ${His} bare ass walking past is sure to amuse ${his} charges.`, clothes: "Western clothing"});
					}
					if (isItemAccessible.entry("stretch pants and a crop-top") === true) {
						wardrobeAssignment.push({text: `and slips into some comfy stretch pants to relax as ${he} works the cows.`, clothes: "stretch pants and a crop-top"});
					}
					if (cumSlaves().length > 2) {
						wardrobeAssignment.push({text: `and wears a slutty nurse outfit to help keep ${his} charges hard.`, clothes: "a slutty nurse outfit"});
						wardrobeAssignment.push({text: `and wears nothing but sexy lingerie to help keep ${his} charges hard.`, clothes: "attractive lingerie"});
						wardrobeAssignment.push({text: `and wears the skimpiest bikini on hand to help keep ${his} charges hard.`, clothes: "a string bikini"});
						if (isItemAccessible.entry("body oil") === true) {
							wardrobeAssignment.push({text: `and coats ${himself} in oil for ${his} charges to savor.`, clothes: "body oil"});
						}
					}
				}
			} else if (slave.assignment === Job.HEADGIRL) {
				if (isItemAccessible.entry("a military uniform") === true) {
					wardrobeAssignment.push({text: `and wears a military uniform to give ${him} that extra touch of authority.`, clothes: "a military uniform"});
				}
				if (isItemAccessible.entry("a schutzstaffel uniform") === true) {
					wardrobeAssignment.push({text: `and wears a schutzstaffel uniform to give ${him} that extra touch of authority.`, clothes: "a schutzstaffel uniform"});
					wardrobeAssignment.push({text: `and wears a slutty schutzstaffel uniform to give ${him} that extra touch of authority.`, clothes: "a slutty schutzstaffel uniform"});
				}
				if (isItemAccessible.entry("a red army uniform") === true) {
					wardrobeAssignment.push({text: `and wears a red army uniform to give ${him} that extra touch of authority.`, clothes: "a red army uniform"});
				}
				if (isItemAccessible.entry("a mounty outfit") === true) {
					wardrobeAssignment.push({text: `and wears a mounty outfit to give ${him} that extra touch of authority.`, clothes: "a mounty outfit"});
				}
				if (isItemAccessible.entry("an evening dress") === true) {
					wardrobeAssignment.push({text: `and wears an evening dress to give ${him} both a touch of feminine authority and sensuality.`, clothes: "an evening dress"});
				}
				if (isItemAccessible.entry("nice business attire") === true) {
					wardrobeAssignment.push({text: `and wears a handsome suit to give ${him} that extra touch of authority.`, clothes: "nice business attire"});
				}
				if (canPenetrate(slave)) {
					wardrobeAssignment.push({text: `and wears a slutty suit to make it perfectly clear that ${his} dick is ${his} main tool in ${his} job.`, clothes: "slutty business attire"});
				} else {
					wardrobeAssignment.push({text: `and wears a slutty suit to give ${him} an extra touch of authority while keeping ${his} crotch available.`, clothes: "slutty business attire"});
				}
			} else if (slave.assignment === Job.TEACHER) {
				if (isItemAccessible.entry("nice business attire") === true) {
					wardrobeAssignment.push({text: `and wears a handsome suit to give ${him} that teacherly authority.`, clothes: "nice business attire"});
				}
				wardrobeAssignment.push({text: `and wears a slutty suit to give ${him} an air of authority while keeping all eyes focused on ${him}.`, clothes: "slutty business attire"});
				wardrobeAssignment.push({text: `and wears a schoolgirl outfit to help keep ${his} charges focused on ${him}.`, clothes: "a schoolgirl outfit"});
				wardrobeAssignment.push({text: `and dresses up as a succubus to give ${his} sex lessons an extra kick.`, clothes: "a succubus outfit"});
				if (slave.race === "middle eastern" && isItemAccessible.entry("a burqa") === true) {
					wardrobeAssignment.push({text: `and wears a conservative burqa to not detract from this week's lesson.`, clothes: "a burqa"});
				} else if (isItemAccessible.entry("conservative clothing") === true) {
					wardrobeAssignment.push({text: `and wears conservative clothes to not detract from this week's lesson.`, clothes: "conservative clothing"});
				}
				if (isItemAccessible.entry("a toga") === true) {
					wardrobeAssignment.push({text: `and wraps ${himself} in a toga to model ${himself} after the philosophers of yore.`, clothes: "a toga"});
				}
				if (isItemAccessible.entry("a maternity dress") === true && slave.belly >= 10000) {
					wardrobeAssignment.push({text: `and settles for a comfortable maternity dress to support ${his} middle while ${he} lectures in front of the class all week.`, clothes: "a maternity dress"});
				}
			} else if (slave.assignment === Job.WARDEN) {
				if (isItemAccessible.entry("battledress") === true) {
					wardrobeAssignment.push({text: `and dons battledress, the better to intimidate the prisoners.`, clothes: "battledress"});
				}
				wardrobeAssignment.push({text: `and slips into a scalemail bikini, the better to intimidate the prisoners.`, clothes: "a scalemail bikini"});
				wardrobeAssignment.push({text: `and dons a scandalous habit to make it perfectly clear that crossing this nun will result in sexual punishment.`, clothes: "a fallen nuns habit"});
				if (isItemAccessible.entry("a military uniform") === true) {
					wardrobeAssignment.push({text: `and wears a military uniform to look even more brutal and authoritative.`, clothes: "a military uniform"});
				}
				if (isItemAccessible.entry("a schutzstaffel uniform") === true) {
					wardrobeAssignment.push({text: `and wears a schutzstaffel uniform to look even more brutal and authoritative.`, clothes: "a schutzstaffel uniform"});
					wardrobeAssignment.push({text: `and wears a slutty schutzstaffel uniform to look even more brutal and authoritative.`, clothes: "a slutty schutzstaffel uniform"});
				}
				if (isItemAccessible.entry("a red army uniform") === true) {
					wardrobeAssignment.push({text: `and wears a red army uniform to look even more brutal and authoritative.`, clothes: "a red army uniform"});
				}
				if (isItemAccessible.entry("a confederate army uniform") === true) {
					wardrobeAssignment.push({text: `and wears a confederate army uniform to look even more brutal and authoritative.`, clothes: "a confederate army uniform"});
				}
				if (isItemAccessible.entry("stretch pants and a crop-top") === true) {
					wardrobeAssignment.push({text: `and decides to take it easy by slipping into some stretch pants. They come off just as quickly as they come on, just in case.`, clothes: "stretch pants and a crop-top"});
				}
			} else if (slave.assignment === Job.ATTENDANT) {
				wardrobeAssignment.push({text: `and wears a string bikini, since it's all ${he} can wear that won't be ruined by all the moisture in the spa.`, clothes: "a string bikini"});
				if (isItemAccessible.entry("a monokini") === true) {
					wardrobeAssignment.push({text: `and wears an one-piece swimsuit, since it's all ${he} can wear that won't be ruined by all the moisture in the spa.`, clothes: "a monokini"});
				}
				if (isItemAccessible.entry("a one-piece swimsuit") === true) {
					wardrobeAssignment.push({text: `and wears a one-piece swimsuit, since it's all ${he} can wear that won't be ruined by all the moisture in the spa.`, clothes: "a one-piece swimsuit"});
				}
				if (isItemAccessible.entry("a burkini") === true) {
					wardrobeAssignment.push({text: `and wears a modest swimsuit, since it's all ${he} can wear that won't be ruined by all the moisture in the spa.`, clothes: "a burkini"});
				}
				wardrobeAssignment.push({text: `but decides to go nude, since ${he}'ll be spending so much time in the water.`, clothes: "no clothing"});
			} else if (slave.assignment === Job.REST) {
				wardrobeAssignment.push({text: `and wears a comfortable t-shirt and cutoffs to relax.`, clothes: "cutoffs and a t-shirt"});
				wardrobeAssignment.push({text: `and slips into some attractive lingerie to enjoy ${himself} as ${he} unwinds.`, clothes: "attractive lingerie"});
				wardrobeAssignment.push({text: `and slips into nothing more than a pair of panties.`, clothes: "panties"});
				wardrobeAssignment.push({text: `but decides that clothing takes too much work and would rather sleep nude.`, clothes: "no clothing"});
				if (isItemAccessible.entry("stretch pants and a crop-top") === true) {
					wardrobeAssignment.push({text: `and slips into some comfy stretch pants to relax.`, clothes: "stretch pants and a crop-top"});
				}
				if (isItemAccessible.entry("attractive lingerie for a pregnant woman") === true && slave.belly >= 1500) {
					wardrobeAssignment.push({text: `and slips into some attractive lingerie to enjoy ${himself} as ${he} unwinds.`, clothes: "attractive lingerie for a pregnant woman"});
				}
				if (slave.fetish === Fetish.SUBMISSIVE) {
					wardrobeAssignment.push({text: `and decides the best way to relax is tied up nice and tight.`, clothes: "shibari ropes"});
				}
			} else if (slave.assignment === Job.MILKED || slave.assignment === Job.DAIRY) {
				wardrobeAssignment.push({text: `and wears sturdy lingerie to offer the best support to ${his} sore, milk-filled udders.`, clothes: "attractive lingerie"});
				if (isItemAccessible.entry("attractive lingerie for a pregnant woman") === true && slave.belly >= 1500) {
					wardrobeAssignment.push({text: `and wears lingerie designed for milky mothers.`, clothes: "attractive lingerie for a pregnant woman"});
				}
				if (isItemAccessible.entry("a maternity dress") === true && slave.belly >= 10000) {
					wardrobeAssignment.push({text: `and chooses a maternity dress since it is easy to free ${his} breasts from.`, clothes: "a maternity dress"});
				}
				if (isItemAccessible.entry("a monokini") === true) {
					wardrobeAssignment.push({text: `and chooses a swimsuit that leaves ${his} breasts exposed.`, clothes: "a monokini"});
				}
				wardrobeAssignment.push({text: `and puts on a pair of overalls, making sure to leave ${his} breasts exposed.`, clothes: "overalls"});
				wardrobeAssignment.push({text: `and wears a string bikini for easy access to ${his} udders.`, clothes: "a string bikini"});
				wardrobeAssignment.push({text: `and decides to wear nothing, since anything ${he}'d wear would just get soaked anyway.`, clothes: "no clothing"});
				if (slave.lactation > 1) {
					wardrobeAssignment.push({text: `but goes nude. There's no time for clothing, ${his} udders need to be drained now!`, clothes: "no clothing"});
				}
				wardrobeAssignment.push({text: `and dons a slutty outfit. If ${his} breasts are going to hang out, might as well wear something to complement them.`, clothes: "a slutty outfit"});
			} else if (slave.assignment === Job.BODYGUARD) {
				if (isItemAccessible.entry("a tight Imperial bodysuit") && V.arcologies[0].FSNeoImperialist > 0) {
					wardrobeAssignment.push({text: `and wears a tight Imperial bodysuit to show off ${his} curves without hindering ${his} deadliness.`, clothes: "a tight Imperial bodysuit"});
				} else {
					wardrobeAssignment.push({text: `and wears a bodysuit to show off ${his} curves without hindering ${his} deadliness.`, clothes: "a comfortable bodysuit"});
				}
				if (isItemAccessible.entry("a military uniform") === true) {
					wardrobeAssignment.push({text: `and wears a military uniform to look the part of the honor guard.`, clothes: "a military uniform"});
				}
				if (isItemAccessible.entry("a schutzstaffel uniform") === true) {
					wardrobeAssignment.push({text: `and wears a schutzstaffel uniform to look the part of the honor guard.`, clothes: "a schutzstaffel uniform"});
					wardrobeAssignment.push({text: `and wears a slutty schutzstaffel uniform to look the part of the honor guard.`, clothes: "a slutty schutzstaffel uniform"});
				}
				if (isItemAccessible.entry("a red army uniform") === true) {
					wardrobeAssignment.push({text: `and wears a red army uniform to look the part of the honor guard.`, clothes: "a red army uniform"});
				}
				if (isItemAccessible.entry("a confederate army uniform") === true) {
					wardrobeAssignment.push({text: `and wears a Confederate army uniform to look the part of the honor guard.`, clothes: "a confederate army uniform"});
				}
				if (isItemAccessible.entry("nice business attire") === true) {
					wardrobeAssignment.push({text: `and wears a nice suit to make it clear you mean business.`, clothes: "nice business attire"});
				}
				if (isItemAccessible.entry("a mounty outfit") === true) {
					wardrobeAssignment.push({text: `and wears a mounty outfit to make it clear you mean business.`, clothes: "a mounty outfit"});
				}
				wardrobeAssignment.push({text: `and wears a scalemail bikini to make ${himself} look fierce.`, clothes: "a scalemail bikini"});
				if (isItemAccessible.entry("a kimono") === true) {
					wardrobeAssignment.push({text: `and wears a nice kimono to add an air of elegance to your presence.`, clothes: "a kimono"});
				}
			} else {
				/* Chooses clothes according to assignment (exceptions allowed)*/
				if (slave.assignment === Job.RECRUITER) {
					if (isItemAccessible.entry("a mini dress") === true) {
						wardrobeAssignment.push({text: `and wears a flattering mini dress to appear sexy and carefree before those desperately seeking a better life.`, clothes: "a mini dress"});
					}
					wardrobeAssignment.push({text: `and wears a cutoffs and a t-shirt to appear sexy and carefree before those desperately seeking a better life.`, clothes: "cutoffs and a t-shirt"});
					if (isItemAccessible.entry("nice business attire") === true) {
						wardrobeAssignment.push({text: `and wears a nice suit to appear trustworthy before those desperately seeking a better life.`, clothes: "nice business attire"});
					}
					wardrobeAssignment.push({text: `and wears a schoolgirl outfit to appear sexy and carefree before those desperately seeking a better life.`, clothes: "a schoolgirl outfit"});
					if (isItemAccessible.entry("a ball gown") === true) {
						wardrobeAssignment.push({text: `and wears an opulent gown to showcase your wealth before those desperately seeking a better life.`, clothes: "a ball gown"});
					}
					if (isItemAccessible.entry("an evening dress") === true) {
						wardrobeAssignment.push({text: `and wears a nice evening dress to appear more sophisticated and sexy before those desperately seeking a better life.`, clothes: "an evening dress"});
					}
					wardrobeAssignment.push({text: `and dresses as a succubus to attempt to lure any potential catches.`, clothes: "a succubus outfit"});
					if (isItemAccessible.entry("harem gauze") === true) {
						wardrobeAssignment.push({text: `and dons ${his} finest silks to showcase the luxuries waiting would-be slaves.`, clothes: "harem gauze"});
					}
					if (isItemAccessible.entry("stretch pants and a crop-top") === true) {
						wardrobeAssignment.push({text: `and wears comfortable stretch pants to and crop-top to appear carefree before those desperately seeking a better life.`, clothes: "stretch pants and a crop-top"});
					}
					if (isItemAccessible.entry("conservative clothing") === true) {
						wardrobeAssignment.push({text: `and wears normal clothing to suggest to those desperately seeking a better life that they can find it here with you.`, clothes: "conservative clothing"});
					}
				} else if (slave.assignment === Job.DJ) {
					wardrobeAssignment.push({text: `and wears clubslut netting to look like the perfect easy club girl.`, clothes: "clubslut netting"});
					wardrobeAssignment.push({text: `and wears cutoffs and a t-shirt to look like the perfect easy club girl.`, clothes: "cutoffs and a t-shirt"});
					wardrobeAssignment.push({text: `and wears the slutty outfit ${he} can find to look like the perfect easy club girl.`, clothes: "a slutty outfit"});
					wardrobeAssignment.push({text: `and wears nothing but slutty jewelry since ${he} loves the way it jingles to ${his} moves.`, clothes: "slutty jewelry"});
					wardrobeAssignment.push({text: `and wears a skin tight bodysuit so nothing gets in the way of ${his} moves.`, clothes: "a comfortable bodysuit"});
					if (slave.boobs > 1000) {
						wardrobeAssignment.push({text: `but decides to go naked and let ${his} girls bounce free as ${he} dances.`, clothes: "no clothing"});
					}
					if (isItemAccessible.entry("harem gauze") === true) {
						wardrobeAssignment.push({text: `and wears the finest available silks to give ${his} moves a sensual grace.`, clothes: "harem gauze"});
					}
				} else if (slave.assignment === Job.CONCUBINE) {
					wardrobeAssignment.push({text: `and goes naked, since it's ${his} honored role to be the chief object of your desire.`, clothes: "no clothing"});
					wardrobeAssignment.push({text: `and dresses as a slutty nurse as your genitals are always in need of ${his} special treatment.`, clothes: "a slutty nurse outfit"});
					wardrobeAssignment.push({text: `and dresses as a schoolgirl in the hopes that you teach ${him} how to be a woman.`, clothes: "a schoolgirl outfit"});
					wardrobeAssignment.push({text: `and dresses as a cheerleader so ${he} may cheer you on as you blow ${his} mind.`, clothes: "a cheerleader outfit"});
					if (player.dick !== 0) {
						wardrobeAssignment.push({text: `and dresses as a slutty maid as you always come home with a stiff package that needs a thorough polishing.`, clothes: "a slutty maid outfit"});
					}
					wardrobeAssignment.push({text: `and, since you personally see that ${he} never goes hungry, ${he} dresses like the sex demoness ${he} is.`, clothes: "a succubus outfit"});
					if (isItemAccessible.entry("attractive lingerie for a pregnant woman") === true && slave.belly >= 10000 && slave.pregSource === -1) {
						wardrobeAssignment.push({text: `and chooses attractive lingerie to showcase the body you've given ${him} in the hopes that you ravish ${him}.`, clothes: "attractive lingerie for a pregnant woman"});
					}
					if (slave.toyHole === ToyHole.DICK && canPenetrate(slave)) {
						wardrobeAssignment.push({text: `and slips into a scalemail bikini so ${he} can act the role of your conqueror as ${he} bends you over.`, clothes: "a scalemail bikini"});
					}
				} else if (slave.assignment === Job.SUBORDINATE) {
					wardrobeAssignment.push({text: `but gives up and goes naked after the other slaves constantly tear whatever ${he}'s wearing off ${him}.`, clothes: "no clothing"});
					if (isItemAccessible.entry("Western clothing") === true) {
						wardrobeAssignment.push({text: `and chooses a pair of crotchless chaps so your other slaves don't have to waste time undressing ${him}.`, clothes: "Western clothing"});
					}
					if (slave.fetish === Fetish.SUBMISSIVE) {
						wardrobeAssignment.push({text: `and chooses to slip on a pair of spats and a tank top in the hopes that ${he} gets to be a violated schoolgirl.`, clothes: "spats and a tank top"});
						wardrobeAssignment.push({text: `and chooses to slip on a schoolgirl outfit in the hope that ${he} gets held down and raped.`, clothes: "a schoolgirl outfit"});
						wardrobeAssignment.push({text: `and chooses to wear the sluttiest outfit available to make it clear what ${he} wants done to ${him}.`, clothes: "a slutty outfit"});
					}
				} else if (slave.assignment === Job.GLORYHOLE) {
					wardrobeAssignment.push({text: `but doesn't bother wearing anything, since no one can see ${his} clothing when ${he}'s immured inside a glory hole.`, clothes: "no clothing"});
				} else if (slave.assignment === Job.CLASSES || slave.assignment === Job.SCHOOL) {
					wardrobeAssignment.push({text: `and wears a schoolgirl outfit, since it seems most appropriate.`, clothes: "a schoolgirl outfit"});
					wardrobeAssignment.push({text: `and wears a cheerleader outfit, since ${he} might as well be one of the popular girls.`, clothes: "a cheerleader outfit"});
					if (isItemAccessible.entry("conservative clothing") === true) {
						wardrobeAssignment.push({text: `and wears normal clothing to not distract from ${his} lessons.`, clothes: "conservative clothing"});
					}
				} else if (slave.assignment === Job.WHORE || slave.assignment === Job.BROTHEL) {
					if (slave.belly >= 5000 && isItemAccessible.entry("attractive lingerie for a pregnant woman") === true) {
						wardrobeAssignment.push({text: `and wears pretty lingerie to show off ${his} merchandise and accentuate ${his} pregnancy while still looking a little classy.`, clothes: "attractive lingerie for a pregnant woman"});
					}
					wardrobeAssignment.push({text: `and wears pretty lingerie to show off ${his} merchandise and still look a little classy.`, clothes: "attractive lingerie"});
					if (isItemAccessible.entry("kitty lingerie") === true) {
						wardrobeAssignment.push({text: `and wears pretty lingerie to show off ${his} merchandise and still look a little cute.`, clothes: "kitty lingerie"});
					}
					if (isItemAccessible.entry("harem gauze") === true) {
						wardrobeAssignment.push({text: `and dresses ${himself} with harem gauze to add an exotic charm to ${his} display.`, clothes: "harem gauze"});
					}
					if (isItemAccessible.entry("a kimono") === true) {
						wardrobeAssignment.push({text: `and wraps ${himself} in a kimono to add some elegance to ${his} display.`, clothes: "a kimono"});
					}
					if (isItemAccessible.entry("a slave gown") === true) {
						wardrobeAssignment.push({text: `and adorns ${himself} in fine dress to show off how much of a high class whore ${he} is.`, clothes: "a slave gown"});
					}
					wardrobeAssignment.push({text: `and dresses ${himself} in a slutty suit to show ${he}'s in it for the ¤.`, clothes: "slutty business attire"});
					if (isItemAccessible.entry("a mini dress") === true) {
						wardrobeAssignment.push({text: `and wears a flattering mini dress to really strut ${his} stuff.`, clothes: "a mini dress"});
					}
				} else if (slave.assignment === Job.PUBLIC || slave.assignment === Job.CLUB) {
					wardrobeAssignment.push({text: `and wears string lingerie to look fun and fuckable.`, clothes: "a string bikini"});
					wardrobeAssignment.push({text: `and throws together the sluttiest outfit since if you're going to slut you might as well go all out.`, clothes: "a slutty outfit"});
					wardrobeAssignment.push({text: `and tosses on a slutty suit that screams ${he} needs a good fuck after a long day.`, clothes: "slutty business attire"});
					wardrobeAssignment.push({text: `and dresses up as a slutty nurse; ${he} has just the technique to cure penile swelling.`, clothes: "a slutty nurse outfit"});
					wardrobeAssignment.push({text: `and wears a cheerleader outfit to look energetic and fuckable.`, clothes: "a cheerleader outfit"});
					if (isItemAccessible.entry("a bunny outfit") === true) {
						wardrobeAssignment.push({text: `and slips into a teddy to add some class to ${his} post.`, clothes: "a bunny outfit"});
					}
					wardrobeAssignment.push({text: `and dresses up as a succubus to clearly advertise ${his} promiscuity.`, clothes: "a succubus outfit"});
					if (slave.bellyPreg >= 10000) {
						wardrobeAssignment.push({text: `and struggles into a schoolgirl outfit. ${His} gravid belly just screams that ${he} is a slutty little student who cares more for dick than lessons.`, clothes: "a succubus outfit"});
					}
				} else if (slave.assignment === Job.HOUSE || slave.assignment === Job.QUARTER) {
					if (slave.energy > 95 || slave.need > 100) {
						wardrobeAssignment.push({text: `and wears a skimpy maid outfit hoping that someone sneaks up behind ${him} as ${he} works and fulfills ${his} desires.`, clothes: "a slutty maid outfit"});
						wardrobeAssignment.push({text: `and wears nothing more than an apron in the hopes that someone sneaks up behind ${him} as ${he} works and fulfills ${his} desires.`, clothes: "an apron"});
					} else if (slave.energy > 80) {
						wardrobeAssignment.push({text: `and wears a skimpy maid outfit to tempt anyone watching ${his} work.`, clothes: "a slutty maid outfit"});
						if (isItemAccessible.entry("a nice maid outfit") === true) {
							wardrobeAssignment.push({text: `and wears a sturdy maid outfit, since anything else might be damaged by ${his} hard work around the penthouse.`, clothes: "a nice maid outfit"});
						}
						wardrobeAssignment.push({text: `and wears a skimpy maid outfit to tempt anyone watching ${his} work.`, clothes: "a slutty maid outfit"});
						wardrobeAssignment.push({text: `and wears nothing more than an apron to tempt anyone watching ${his} work.`, clothes: "an apron"});
					} else {
						if (isItemAccessible.entry("a nice maid outfit") === true) {
							wardrobeAssignment.push({text: `and wears a sturdy maid outfit, since anything else might be damaged by ${his} hard work around the penthouse.`, clothes: "a nice maid outfit"});
						}
						wardrobeAssignment.push({text: `and wears a skimpy maid outfit to tempt anyone watching ${his} work.`, clothes: "a slutty maid outfit"});
						wardrobeAssignment.push({text: `and wears nothing more than an apron to tempt anyone watching ${his} work.`, clothes: "an apron"});
					}
				}

				/* Chooses clothes according to FS*/
				if (V.arcologies[0].FSEgyptianRevivalist > 0) {
					wardrobeFS.push({text: `and complements it with golden bangles, since no clothing is necessary for a sex slave in your warm and sunny arcology.`, clothes: "slutty jewelry"});
				} else if (V.arcologies[0].FSRomanRevivalist > 0) {
					wardrobeFS.push({text: `and wears a toga to take part in your Roman revivalism.`, clothes: "a toga"});
				} else if (V.arcologies[0].FSEdoRevivalist > 0) {
					wardrobeFS.push({text: `and wears a kimono, overjoyed that such lovely clothing is now appropriate.`, clothes: "a kimono"});
				} else if (V.arcologies[0].FSArabianRevivalist > 0) {
					wardrobeFS.push({text: `and wears a harem outfit to look like a slave girl fit for a Sultan.`, clothes: "harem gauze"});
				} else if (V.arcologies[0].FSChineseRevivalist > 0) {
					wardrobeFS.push({text: `and wears a brief qipao to show off and look Chinese at the same time.`, clothes: "a slutty qipao"});
					wardrobeFS.push({text: `and wears a long qipao to show off and look Chinese at the same time.`, clothes: "a long qipao"});
				} else if (V.arcologies[0].FSAztecRevivalist > 0) {
					wardrobeFS.push({text: `and drapes a huipil over ${himself} to fit in with your Aztec revivalism.`, clothes: "a huipil"});
				} else if (V.arcologies[0].FSAntebellumRevivalist > 0) {
					wardrobeFS.push({text: `and wears a fine ball gown to take part in Antebellum revivalism.`, clothes: "a ball gown"});
					wardrobeFS.push({text: `and wears a classy evening dress to take part in Antebellum revivalism.`, clothes: "an evening dress"});
				}
				if (V.arcologies[0].FSGenderFundamentalist > 0) {
					wardrobeFS.push({text: `and wears a schoolgirl outfit to look like a hot slut.`, clothes: "a schoolgirl outfit"});
					wardrobeFS.push({text: `and wears a cheerleader outfit to look like a hot slut.`, clothes: "a cheerleader outfit"});
					wardrobeFS.push({text: `and wears a bunny outfit to look like a slut from the glory days.`, clothes: "a bunny outfit"});
					wardrobeFS.push({text: `and wears only an apron, making ${him} look like a slutty housewife.`, clothes: "an apron"});
					if (slave.bellyPreg >= 5000) {
						wardrobeFS.push({text: `but decides to wear nothing at all; ${he}'s already pregnant, so ${he} just needs to be barefoot and naked to complete ${his} look.`, clothes: "no clothing"});
					}
				} else if (V.arcologies[0].FSGenderRadicalist > 0) {
					wardrobeFS.push({text: `and eagerly slips into a skimpy maid outfit so ${he} can take advantage of its short skirt and ${his} lack of underwear`, clothes: "a slutty maid outfit"});
					wardrobeFS.push({text: `and wears a cheerleader outfit that clearly shows off ${his} ass.`, clothes: "a cheerleader outfit"});
					wardrobeFS.push({text: `and settles for some sexy succubutt.`, clothes: "a succubus outfit"});
				}
				if (V.arcologies[0].FSSlaveProfessionalism > 0) {
					if (isItemAccessible.entry("nice business attire") === true) {
						if (slave.energy > 80) {
							wardrobeFS.push({text: `and picks out a professional suit with a nice, short skirt so ${he} can get right to business.`, clothes: "slutty business attire"});
						} else {
							wardrobeFS.push({text: `and picks out a professional suit that shows ${he} is open for business.`, clothes: "nice business attire"});
						}
					}
					if (isItemAccessible.entry("a nice maid outfit") === true) {
						if (slave.energy > 80) {
							wardrobeFS.push({text: `and picks out a skimpy maid outfit so ${he} can take advantage of its short skirt and ${his} lack of underwear,`, clothes: "a slutty maid outfit"});
						} else {
							wardrobeFS.push({text: `and picks out a standard suit maid outfit to not hinder ${his} duties.`, clothes: "a nice maid outfit"});
						}
					}
					wardrobeFS.push({text: `and works ${his} way into a gorgeous dress made specially for slaves.`, clothes: "a slave gown"});
					wardrobeFS.push({text: `and works ${his} way into a elegant dress made specially for slaves.`, clothes: "a courtesan dress"});
				} else if (V.arcologies[0].FSIntellectualDependency > 0) {
					wardrobeFS.push({text: `and chooses the smallest clothing ${he} can find to wear over ${his} underwear.`, clothes: "a bimbo outfit"});
					wardrobeFS.push({text: `and slaps together the sluttiest outfit ${he} can manage.`, clothes: "a slutty outfit"});
					wardrobeFS.push({text: `and squeezes into a fishnet bodysuit to give ${his} nudity a slutty flair.`, clothes: "clubslut netting"});
					wardrobeFS.push({text: `and ties on the skimpiest bikini ${he} can find.`, clothes: "a string bikini"});
					if (slave.bellyPreg >= 5000 && isItemAccessible.entry("attractive lingerie for a pregnant woman") === true) {
						wardrobeFS.push({text: `and opts for the classic seductive lingerie, albeit something more fitting for ${his} 'little accident'.`, clothes: "attractive lingerie for a pregnant woman"});
					} else {
						wardrobeFS.push({text: `and opts for the classic seductive lingerie.`, clothes: "attractive lingerie"});
					}
				}
				if (V.arcologies[0].FSPaternalist > 0) {
					wardrobeFS.push({text: `and wears conservative clothing, as permitted by your paternalism.`, clothes: "conservative clothing"});
					if (isItemAccessible.entry("a hijab and blouse") === true && slave.race === "middle eastern") {
						wardrobeFS.push({text: `and wears very conservative clothing, as permitted by your paternalism.`, clothes: "a hijab and blouse"});
					}
					if (isItemAccessible.entry("stretch pants and a crop-top") === true) {
						wardrobeFS.push({text: `and wears the most comfortable stretch pants ${he} can find.`, clothes: "stretch pants and a crop-top"});
					}
				} else if (V.arcologies[0].FSDegradationist > 0) {
					wardrobeFS.push({text: `and wears chains, to degrade ${himself} as required by your societal goals.`, clothes: "chains"});
					wardrobeFS.push({text: `and binds ${himself} with a set of uncomfortable straps.`, clothes: "uncomfortable straps"});
					wardrobeFS.push({text: `and binds ${himself} with a set of uncomfortable ropes.`, clothes: "shibari ropes"});
					wardrobeFS.push({text: `and wears no clothes at all, since your society doesn't feel ${he} deserves any.`, clothes: "no clothing"});
				}
				if (V.arcologies[0].FSMaturityPreferentialist > 0) {
					if (slave.visualAge >= 30) {
						if (isItemAccessible.entry("nice business attire") === true) {
							wardrobeFS.push({text: `and wears a formal suit to look like the ideal older woman.`, clothes: "nice business attire"});
						}
						wardrobeFS.push({text: `and wears a slutty suit to look like the ideal horny older woman.`, clothes: "slutty business attire"});
						if (isItemAccessible.entry("an evening dress") === true) {
							wardrobeFS.push({text: `and wears a sensual yet mature evening dress to look like the ideal horny older woman.`, clothes: "an evening dress"});
						}
						wardrobeFS.push({text: `and wears only an apron to make ${himself} seem more matronly.`, clothes: "an apron"});
					} else {
						if (isItemAccessible.entry("nice business attire") === true) {
							wardrobeFS.push({text: `and wears a formal suit to look more mature.`, clothes: "nice business attire"});
						}
						if (isItemAccessible.entry("a Santa dress") === true) {
							wardrobeFS.push({text: `and wears a dress referencing a figure of advanced age.`, clothes: "a Santa dress"});
						}
						if (isItemAccessible.entry("an evening dress") === true) {
							wardrobeFS.push({text: `and wears a sensual yet mature evening dress in the hopes some of it rubs off on ${him}.`, clothes: "an evening dress"});
						}
						wardrobeFS.push({text: `and wears only an apron in an attempt to make ${himself} seem more matronly.`, clothes: "an apron"});
					}
				} else if (V.arcologies[0].FSYouthPreferentialist > 0) {
					wardrobeFS.push({text: `and wears a schoolgirl outfit to look younger.`, clothes: "a schoolgirl outfit"});
					wardrobeFS.push({text: `and wears a cheerleader outfit to look younger and more energetic.`, clothes: "a cheerleader outfit"});
					wardrobeFS.push({text: `and wears spats and a tank top to look younger and more energetic.`, clothes: "spats and a tank top"});
				}
				if (V.arcologies[0].FSPhysicalIdealist > 0) {
					if (slave.sexualFlaw !== SexualFlaw.SHAMEFAST) {
						wardrobeFS.push({text: `and coats ${himself} in body oil to show off how ${he}'s part of your physical idealism.`, clothes: "body oil"});
						wardrobeFS.push({text: `and goes totally nude to show off how ${he}'s part of your physical idealism.`, clothes: "no clothing"});
					}
					wardrobeFS.push({text: `and slips into a leotard for ${his} next workout.`, clothes: "a leotard"});
					wardrobeFS.push({text: `and slips into some spats for ${his} next workout.`, clothes: "spats and a tank top"});
				} else if (V.arcologies[0].FSHedonisticDecadence > 0) {
					wardrobeFS.push({text: `and throws on a very casual getup.`, clothes: "stretch pants and a crop-top"});
					wardrobeFS.push({text: `but decides against putting forth the effort and goes nude.`, clothes: "no clothing"});
				}
				if (V.arcologies[0].FSPastoralist > 0) {
					wardrobeFS.push({text: `and wears Western clothing, since ${he} thinks it fits with pastoralism.`, clothes: "Western clothing"});
					wardrobeFS.push({text: `and wears overalls that leave ${his} breasts uncovered.`, clothes: "overalls"});
					if (isItemAccessible.entry("a monokini") === true) {
						wardrobeFS.push({text: `and wears a swimsuit that leaves ${his} breasts uncovered.`, clothes: "a monokini"});
					}
					if (isItemAccessible.entry("pasties") === true) {
						wardrobeFS.push({text: `and wears nothing more than a pair of pasties over ${his} nipples and crotch.`, clothes: "pasties"});
					}
					if (slave.lactation > 0) {
						wardrobeFS.push({text: `and dresses up as a slutty wet nurse.`, clothes: "a slutty nurse outfit"});
					}
					wardrobeFS.push({text: `but decides to let ${his} breasts be free. Clothes will just get in the way.`, clothes: "no clothing"});
				}
				if (V.arcologies[0].FSBodyPurist > 0) {
					wardrobeFS.push({text: `and wears a leotard to show off the purity of ${his} body.`, clothes: "a leotard"});
					if (slave.sexualFlaw !== SexualFlaw.SHAMEFAST) {
						wardrobeFS.push({text: `but decides ${his} body is too nice to hide with clothing.`, clothes: "no clothing"});
						if (isItemAccessible.entry("body oil") === true) {
							wardrobeFS.push({text: `and coats ${his} pure body in oil to make it stand out.`, clothes: "body oil"});
						}
					}
				} else if (V.arcologies[0].FSTransformationFetishist > 0) {
					wardrobeFS.push({text: `and decides squeezing into a latex suit will only complement ${his} unnatural appearance.`, clothes: "restrictive latex"});
					if (slave.sexualFlaw !== SexualFlaw.SHAMEFAST) {
						wardrobeFS.push({text: `and decides to go nude, ensuring everyone sees ${his} assets.`, clothes: "no clothing"});
						if (isItemAccessible.entry("body oil") === true) {
							wardrobeFS.push({text: `and coats ${his} assets in body oil to give them some extra shine.`, clothes: "body oil"});
						}
					}
				}
				if (V.arcologies[0].FSAssetExpansionist > 0) {
					wardrobeFS.push({text: `and decides to dress up like a young man's wet dream.`, clothes: "a succubus outfit"});
					wardrobeFS.push({text: `and decides to wear a skimpy bikini to make ${his} assets look even larger.`, clothes: "a string bikini"});
					wardrobeFS.push({text: `and decides to throw together a slutty outfit that highlights ${his} assets.`, clothes: "a slutty outfit"});
					if (isItemAccessible.entry("a monokini") === true) {
						wardrobeFS.push({text: `and decides to wear a monokini that clings to the assets it actually does conceal.`, clothes: "a monokini"});
					}
				} else if (V.arcologies[0].FSSlimnessEnthusiast > 0) {
					if (slave.boobs < 300) {
						wardrobeFS.push({text: `and wears a string bikini to show off just how flat ${he} is.`, clothes: "a string bikini"});
						if (isItemAccessible.entry("a monokini") === true) {
							wardrobeFS.push({text: `and wears a monokini that leaves ${his} flat chest bare.`, clothes: "a monokini"});
						}
						wardrobeFS.push({text: `and wears only panties, leaving ${his} flat chest bare.`, clothes: "panties"});
					}
					if (slave.boobs < 600 && slave.butt < 3) {
						wardrobeFS.push({text: `and wears a leotard to show off ${his} lithe body.`, clothes: "a leotard"});
						wardrobeFS.push({text: `and wears a form fitting bodysuit to show off ${his} lithe figure.`, clothes: "a comfortable bodysuit"});
						wardrobeFS.push({text: `and wears spats to hug ${his} tight butt.`, clothes: "spats and a tank top"});
						wardrobeFS.push({text: `and wears an apron that covers ${his} front while leaving ${his} rear free.`, clothes: "an apron"});
					} else {
						wardrobeFS.push({text: `and squeezes into a form fitting bodysuit in the hopes that it squishes down ${his} assets.`, clothes: "restrictive latex"});
					}
				}
				if (V.arcologies[0].FSSupremacist > 0) {
					if (V.arcologies[0].FSSupremacistRace === "white") {
						if (isItemAccessible.entry("a dirndl") === true) {
							wardrobeFS.push({text: `and wears one of the beautiful folk costumes of the white race.`, clothes: "a dirndl"});
						}
						if (isItemAccessible.entry("lederhosen") === true) {
							wardrobeFS.push({text: `and wears one of the beautiful folk costumes of the white race.`, clothes: "lederhosen"});
						}
					} else if (V.arcologies[0].FSSupremacistRace === "asian") {
						if (isItemAccessible.entry("a biyelgee costume") === true) {
							wardrobeFS.push({text: `and wears one of the beautiful folk costumes of the asian race.`, clothes: "a biyelgee costume"});
						}
						if (isItemAccessible.entry("a long qipao") === true) {
							wardrobeFS.push({text: `and wears one of the beautiful folk costumes of the asian race.`, clothes: "a long qipao"});
						}
						if (isItemAccessible.entry("a kimono") === true) {
							wardrobeFS.push({text: `and wears one of the beautiful folk costumes of the asian race.`, clothes: "a kimono"});
						}
						if (isItemAccessible.entry("a hanbok") === true) {
							wardrobeFS.push({text: `and wears one of the beautiful folk costumes of the asian race.`, clothes: "a hanbok"});
						}
					}
				}
				if (V.arcologies[0].FSChattelReligionist > 0) {
					if (V.arcologies[0].FSChattelReligionistLaw2 === 1 && slave.sexualFlaw !== SexualFlaw.SHAMEFAST) {
						wardrobeFS.push({text: `but chooses to stay nude to promote Holy Nudism.`, clothes: "no clothing"});
						if (isItemAccessible.entry("body oil") === true) {
							wardrobeFS.push({text: `and coats ${his} body in oil to highlight what God has given ${him}.`, clothes: "body oil"});
						}
					}
					wardrobeFS.push({text: `and wears a chattel habit to conform to your arcology's culture.`, clothes: "a chattel habit"});
				}

				if (V.arcologies[0].FSSubjugationist > 0) {
					if (V.arcologies[0].FSSubjugationistRace === "black") {
						if (isItemAccessible.entry("a klan robe") === true) {
							wardrobeFS.push({text: `and wears a costume associated with anti-black societies of the past.`, clothes: "a klan robe"});
						}
						if (isItemAccessible.entry("a slutty klan robe") === true) {
							wardrobeFS.push({text: `and wears a costume associated with anti-black societies of the past.`, clothes: "a slutty klan robe"});
						}
					} else if (V.arcologies[0].FSSubjugationistRace === "semitic") {
						if (isItemAccessible.entry("a schutzstaffel uniform") === true) {
							wardrobeFS.push({text: `and wears a costume associated with anti-semitic societies of the past.`, clothes: "a schutzstaffel uniform"});
						}
						if (isItemAccessible.entry("a slutty schutzstaffel uniform") === true) {
							wardrobeFS.push({text: `and wears a costume associated with anti-semitic societies of the past.`, clothes: "a slutty schutzstaffel uniform"});
						}
					}
				}

				/* Chooses clothes according to fetishes, quirks, etc.*/
				if (slave.attrXY > 70) {
					if (slave.attrKnown === 1) {
						wardrobeTastes.push({text: `and wears a schoolgirl outfit to show off some T&A to attract boys.`, clothes: "a schoolgirl outfit"});
						wardrobeTastes.push({text: `and wears nothing but pretty lingerie to attract boys.`, clothes: "attractive lingerie"});
						wardrobeTastes.push({text: `and selects a slutty outfit that's sure to have men drooling.`, clothes: "a slutty outfit"});
						if (slave.butt > 3) {
							wardrobeTastes.push({text: `and slips on some cutoffs that are sure to have men checking out ${his} ass.`, clothes: "cutoffs and a t-shirt"});
						}
						if (isItemAccessible.entry("a bunny outfit") === true) {
							wardrobeTastes.push({text: `and slips into a bunny outfit that ${he} knows will have men lining up.`, clothes: "a bunny outfit"});
						}
						if (slave.boobs > 800) {
							wardrobeTastes.push({text: `and dresses up as a busty succubus that pulls eyes to ${his} chest and leaves pants feeling tight.`, clothes: "a succubus outfit"});
						}
					} else {
						wardrobeTastes.push({text: `and selects a schoolgirl outfit that shows off some T&A.`, clothes: "a schoolgirl outfit"});
						wardrobeTastes.push({text: `and wears pretty lingerie that shows off ${his} body.`, clothes: "attractive lingerie"});
						wardrobeTastes.push({text: `and selects a slutty outfit that's sure to draw attention.`, clothes: "a slutty outfit"});
						if (slave.butt > 3) {
							wardrobeTastes.push({text: `and slips on some cutoffs that shows off ${his} ass.`, clothes: "cutoffs and a t-shirt"});
						}
						if (isItemAccessible.entry("a bunny outfit") === true) {
							wardrobeTastes.push({text: `and slips into a bunny outfit that hugs ${his} curves.`, clothes: "a bunny outfit"});
						}
						if (slave.boobs > 800) {
							wardrobeTastes.push({text: `and dresses up as a busty succubus that's sure to draw eyes.`, clothes: "a succubus outfit"});
						}
					}
				}
				if (slave.attrXX > 70) {
					if (slave.attrKnown === 1) {
						if (isItemAccessible.entry("a slave gown") === true) {
							wardrobeTastes.push({text: `and wears a fashionable gown, since girls appreciate nice clothes.`, clothes: "a slave gown"});
						}
						wardrobeTastes.push({text: `and wears nothing but pretty lingerie to give the girls a show.`, clothes: "attractive lingerie"});
						if (isItemAccessible.entry("nice business attire") === true) {
							wardrobeTastes.push({text: `and wears a nice suit, since girls appreciate nice clothes.`, clothes: "nice business attire"});
						}
					} else {
						if (isItemAccessible.entry("a slave gown") === true) {
							wardrobeTastes.push({text: `and wears a fashionable gown.`, clothes: "a slave gown"});
						}
						wardrobeTastes.push({text: `and wears pretty lingerie that shows off ${his} body.`, clothes: "attractive lingerie"});
						if (isItemAccessible.entry("nice business attire") === true) {
							wardrobeTastes.push({text: `and wears a nice suit, the reasons not entirely clear to you.`, clothes: "nice business attire"});
						}
					}
				}

				/* need */
				if (slave.need > 90) {
					wardrobeTastes.push({text: `but goes naked. ${He} needs sex now and clothing will only get in the way.`, clothes: "no clothing"});
					wardrobeTastes.push({text: `and throws on a slutty suit. ${He} hopes that it gets the point across that ${he} needs sex now.`, clothes: "slutty business attire"});
					wardrobeTastes.push({text: `and dons a slutty nurse outfit. ${He}'s been infected and the only cure is a strong dicking.`, clothes: "a slutty nurse outfit"});
					wardrobeTastes.push({text: `and dresses up as a slutty maid. Maybe if ${he} does ${his} job poorly enough, someone will bend ${him} over and fuck some sense into ${him}.`, clothes: "a slutty maid outfit"});
					wardrobeTastes.push({text: `and dresses up as a succubus in the hopes it screams that ${he} needs sex now.`, clothes: "a succubus outfit"});
				}

				/* quirks n flaws */
				if (slave.behavioralFlaw === BehavioralFlaw.ARROGANT) {
					if (isItemAccessible.entry("a ball gown") === true) {
						wardrobeTastes.push({text: `and chooses a formal dress that makes ${him} feel like royalty.`, clothes: "a ball gown"});
					}
					if (isItemAccessible.entry("an evening dress") === true) {
						wardrobeTastes.push({text: `and chooses a formal dress that makes ${him} feel like a celebrity.`, clothes: "an evening dress"});
					}
				} else if (slave.behavioralFlaw === BehavioralFlaw.DEVOUT) {
					wardrobeTastes.push({text: `and wears something more appropriate for a monastery than a whorehouse.`, clothes: "a penitent nuns habit"});
					if (isItemAccessible.entry("a burqa") === true) {
						wardrobeTastes.push({text: `and chooses an incredibly restricting piece of religious garb.`, clothes: "a burqa"});
					}
				}

				if (slave.behavioralQuirk === BehavioralQuirk.SINFUL) {
					wardrobeTastes.push({text: `and dresses up like a succubus because it makes ${him} feel naughty.`, clothes: "a succubus outfit"});
				} else if (slave.behavioralQuirk === BehavioralQuirk.FITNESS) {
					wardrobeTastes.push({text: `and wears spats and a tank top to give ${himself} a sporty look.`, clothes: "spats and a tank top"});
				}

				if (slave.sexualFlaw === SexualFlaw.SHAMEFAST) {
					wardrobeTastes.push({text: `and chooses an outfit that covers ${him} up as much as possible.`, clothes: "a hijab and abaya"});
					if (isItemAccessible.entry("a burqa") === true) {
						wardrobeTastes.push({text: `and chooses an outfit that covers ${him} up as much as possible.`, clothes: "a burqa"});
					}
				} else if (slave.sexualFlaw === SexualFlaw.BREEDER) {
					if (isItemAccessible.entry("attractive lingerie for a pregnant woman") === true) {
						wardrobeTastes.push({text: `and wears lingerie designed to accommodate pregnancies, hoping that others get the hint.`, clothes: "attractive lingerie for a pregnant woman"});
					}
				} else if (slave.sexualFlaw === SexualFlaw.MALICIOUS) {
					if (isItemAccessible.entry("a schutzstaffel uniform") === true) {
						wardrobeTastes.push({text: `and chooses an outfit that is commonly associated with wanton cruelty.`, clothes: "a schutzstaffel uniform"});
						wardrobeTastes.push({text: `and chooses a skimpy outfit that is commonly associated with wanton cruelty.`, clothes: "a slutty schutzstaffel uniform"});
					}
				}

				if (slave.sexualQuirk === SexualQuirk.ROMANTIC) {
					if (isItemAccessible.entry("a halter top dress") === true) {
						wardrobeTastes.push({text: `and dresses up like ${he}'s about to go on a date.`, clothes: "a halter top dress"});
					}
					if (isItemAccessible.entry("an evening dress") === true) {
						wardrobeTastes.push({text: `and dresses in a sexy thigh cut dress. `, clothes: "an evening dress"});
					}
				} else if (slave.sexualQuirk === SexualQuirk.TEASE) {
					if (isItemAccessible.entry("kitty lingerie") === true) {
						wardrobeTastes.push({text: `and wears a set of provocatively designed lingerie.`, clothes: "kitty lingerie"});
					}
					if (isItemAccessible.entry("panties and pasties") === true) {
						wardrobeTastes.push({text: `and wears the skimpiest outfit ${he} can find.`, clothes: "panties and pasties"});
					}
				}

				/* age stuff */
				if (slave.actualAge < 10) {
					if (isItemAccessible.entry("a ball gown") === true) {
						wardrobeTastes.push({text: `and puts on a pretty dress so ${he} can be a princess.`, clothes: "a ball gown"});
					}
					wardrobeTastes.push({text: `and dresses up like a cheerleader since ${he} thinks it looks cute.`, clothes: "a cheerleader outfit"});
					if (isItemAccessible.entry("a kimono") === true) {
						wardrobeTastes.push({text: `and wraps ${himself} in a kimono, since it feels so good on ${his} skin.`, clothes: "a kimono"});
					}
				} else if (slave.actualAge < 18) {
					wardrobeTastes.push({text: `and chooses an outfit that somewhat resembles one of ${his} school uniforms.`, clothes: "a schoolgirl outfit"});
				} else if (slave.actualAge > 65) {
					if (isItemAccessible.entry("a Santa dress") === true) {
						wardrobeTastes.push({text: `and chooses a dress that acknowledges ${his} advanced age while still looking sexy.`, clothes: "a Santa dress"});
					}
				}

				/* fetishes */
				if (slave.fetishKnown === 1) {
					if (slave.fetish === Fetish.SUBMISSIVE) {
						wardrobeTastes.push({text: `and wears restrictive latex to encourage others to dominate ${him}.`, clothes: "restrictive latex"});
						wardrobeTastes.push({text: `and wears shibari ropes to encourage others to dominate ${him}.`, clothes: "shibari ropes"});
					} else if (slave.fetish === Fetish.DOM) {
						if (isItemAccessible.entry("nice business attire") === true) {
							wardrobeTastes.push({text: `and wears a handsome suit, since ${he} likes other slaves to look up to ${him}.`, clothes: "nice business attire"});
						}
						if (isItemAccessible.entry("a latex catsuit") === true) {
							wardrobeTastes.push({text: `and wears a full body latex catsuit to look the part of the whip cracking dom.`, clothes: "a latex catsuit"});
						}
						wardrobeTastes.push({text: `and wears a scalemail bikini to make ${himself} look tough.`, clothes: "a scalemail bikini"});
					} else if (slave.fetish === Fetish.MASOCHIST) {
						wardrobeTastes.push({text: `and wears painfully restrictive bondage gear, since ${he} likes the torment.`, clothes: "uncomfortable straps"});
						if (isItemAccessible.entry("chains") === true) {
							wardrobeTastes.push({text: `and wears painfully tight chains, since ${he} likes the torment.`, clothes: "chains"});
						}
					} else if (slave.fetish === Fetish.SADIST) {
						if (isItemAccessible.entry("a slave gown") === true) {
							wardrobeTastes.push({text: `and wears an elegant gown, since ${he} thinks it makes ${him} look the part of the femme fatale.`, clothes: "a slave gown"});
						}
						wardrobeTastes.push({text: `and wears a scalemail bikini, since ${he} thinks it makes ${him} look fierce.`, clothes: "a scalemail bikini"});
					} else if (slave.fetish === Fetish.CUMSLUT) {
						wardrobeTastes.push({text: `and wears cutoffs and a t-shirt, because the fun yet relatively conservative outfit seems to encourage others to ask ${him} for blowjobs.`, clothes: "cutoffs and a t-shirt"});
					} else if (slave.fetish === Fetish.HUMILIATION) {
						wardrobeTastes.push({text: `and wears leather straps with rings over ${his} private parts because ${he} enjoys the embarrassment such a humiliating outfit causes ${him}.`, clothes: "uncomfortable straps"});
					} else if (slave.fetish === Fetish.BUTTSLUT) {
						wardrobeTastes.push({text: `and wears nothing other than slutty bangles, because ${he} likes to catch the eye without putting anything between cocks and ${his} rear end.`, clothes: "slutty jewelry"});
						wardrobeTastes.push({text: `and wears nothing other than an apron, because ${he} likes to catch the eye without putting anything between cocks and ${his} rear end.`, clothes: "an apron"});
					} else if (slave.fetish === Fetish.PREGNANCY) {
						wardrobeTastes.push({text: `and wears a short maid dress, because ${he} wants to look motherly and fuckable at the same time.`, clothes: "a slutty maid outfit"});
						if (isItemAccessible.entry("a maternity dress") === true && canGetPregnant(slave)) {
							wardrobeTastes.push({text: `and wears a maternity dress in the hope someone fills out its middle.`, clothes: "a maternity dress"});
						}
					} else if (slave.fetish === Fetish.BOOBS) {
						wardrobeTastes.push({text: `and wears a cheerleader outfit, since ${he} loves the way it hugs ${his} tits as ${he} moves.`, clothes: "a cheerleader outfit"});
						if (isItemAccessible.entry("a monokini") === true) {
							wardrobeTastes.push({text: `and wears a monokini, since ${he} loves how it leaves ${his} breasts totally bare.`, clothes: "a monokini"});
						}
						if (isItemAccessible.entry("kitty lingerie") === true) {
							wardrobeTastes.push({text: `and chooses a lingerie set that leaves ${his} cleavage on public display.`, clothes: "kitty lingerie"});
						}
						if (isItemAccessible.entry("pasties") === true) {
							wardrobeTastes.push({text: `and wears nothing but a pair of pasties to draw eyes straight to ${his} nipples.`, clothes: "pasties"});
						}
						if (isItemAccessible.entry("a bra") === true) {
							wardrobeTastes.push({text: `and wears nothing but a bra in the hopes that the outlandish get up fixes eyes on ${his} chest.`, clothes: "a bra"});
						}
						wardrobeTastes.push({text: `and wears nothing but a pair of panties so ${his} tits can bounce freely.`, clothes: "panties"});
					}
				} else {
					if (slave.fetish === Fetish.SUBMISSIVE) {
						wardrobeTastes.push({text: `and strangely opts for restrictive latex.`, clothes: "restrictive latex"});
						wardrobeTastes.push({text: `and strangely opts for shibari ropes.`, clothes: "shibari ropes"});
					} else if (slave.fetish === Fetish.DOM) {
						if (isItemAccessible.entry("nice business attire") === true) {
							wardrobeTastes.push({text: `and wears a handsome suit; ${he} seems to think highly of ${himself} in it.`, clothes: "nice business attire"});
						}
						if (isItemAccessible.entry("a latex catsuit") === true) {
							wardrobeTastes.push({text: `and wears a full body latex catsuit; there is a strange look on ${his} face as ${he} wears it.`, clothes: "a latex catsuit"});
						}
						wardrobeTastes.push({text: `and wears a scalemail bikini; ${he} keeps flexing and acting tough to ${himself}.`, clothes: "a scalemail bikini"});
					} else if (slave.fetish === Fetish.MASOCHIST) {
						wardrobeTastes.push({text: `and strangely opts for painfully restrictive bondage gear.`, clothes: "uncomfortable straps"});
						if (isItemAccessible.entry("chains") === true) {
							wardrobeTastes.push({text: `and strangely opts for painfully tight chains.`, clothes: "chains"});
						}
					} else if (slave.fetish === Fetish.SADIST) {
						if (isItemAccessible.entry("a slave gown") === true) {
							wardrobeTastes.push({text: `and wears an elegant gown for some reason.`, clothes: "a slave gown"});
						}
						wardrobeTastes.push({text: `and wears a scalemail bikini; an odd choice.`, clothes: "a scalemail bikini"});
					} else if (slave.fetish === Fetish.CUMSLUT) {
						wardrobeTastes.push({text: `and wears cutoffs and a t-shirt; ${he} can't stop licking ${his} lips.`, clothes: "cutoffs and a t-shirt"});
					} else if (slave.fetish === Fetish.HUMILIATION) {
						wardrobeTastes.push({text: `and strangely opts for leather straps with rings over ${his} private parts.`, clothes: "uncomfortable straps"});
					} else if (slave.fetish === Fetish.BUTTSLUT) {
						wardrobeTastes.push({text: `and wears nothing other than slutty bangles, an odd choice; ${his} ass is completely exposed.`, clothes: "slutty jewelry"});
						wardrobeTastes.push({text: `and wears nothing other than an apron, an odd choice; ${his} ass is completely exposed.`, clothes: "an apron"});
					} else if (slave.fetish === Fetish.PREGNANCY) {
						wardrobeTastes.push({text: `and wears a short maid dress; you frequently notice ${him} observing ${his} stomach.`, clothes: "a slutty maid outfit"});
						if (isItemAccessible.entry("a maternity dress") === true && canGetPregnant(slave)) {
							wardrobeTastes.push({text: `and wears a maternity dress even though ${he} isn't pregnant.`, clothes: "a maternity dress"});
						}
					} else if (slave.fetish === Fetish.BOOBS) {
						wardrobeTastes.push({text: `and wears a cheerleader outfit; ${he} seems to enjoy jiggling ${his} breasts in it.`, clothes: "a cheerleader outfit"});
						if (isItemAccessible.entry("a monokini") === true) {
							wardrobeTastes.push({text: `and strangely decides to wear a monokini, which leaves ${his} breasts totally bare.`, clothes: "a monokini"});
						}
						if (isItemAccessible.entry("kitty lingerie") === true) {
							wardrobeTastes.push({text: `and oddly chooses a lingerie set with a cleavage cutout in the bra.`, clothes: "kitty lingerie"});
						}
						if (isItemAccessible.entry("pasties") === true) {
							wardrobeTastes.push({text: `and oddly opts for just a pair of pasties attached to ${his} nipples and one over ${his} crotch.`, clothes: "pasties"});
						}
						if (isItemAccessible.entry("a bra") === true) {
							wardrobeTastes.push({text: `and oddly opts for nothing more than a bra.`, clothes: "a bra"});
						}
						wardrobeTastes.push({text: `and wears nothing but a pair of panties; ${he} seems to enjoy the way ${his} breasts bounce freely.`, clothes: "panties"});
					}
				}

				/* energy */
				if (slave.energy > 95) {
					wardrobeTastes.push({text: `but goes nude, since as a nympho ${he} gets plenty of attention anyway, and considers clothes an unnecessary hindrance.`, clothes: "no clothing"});
				} else if (slave.energy > 60) {
					wardrobeTastes.push({text: `and puts on some daring lingerie to draw attention to ${himself}.`, clothes: "attractive lingerie"});
					wardrobeTastes.push({text: `and goes topless to draw attention to ${himself}.`, clothes: "panties"});
					if (isItemAccessible.entry("kitty lingerie") === true) {
						wardrobeTastes.push({text: `and puts on some decorative lingerie to draw attention to ${himself}.`, clothes: "kitty lingerie"});
					}
				}

				/* pregnancy */
				if (slave.belly >= 5000) {
					wardrobeTastes.push({text: `and wears pretty lingerie to show off ${his} merchandise while giving ${his} protruding belly plenty of room to hang free.`, clothes: "attractive lingerie"});
					wardrobeTastes.push({text: `and wears only panties. ${He} appreciates something so easy to slip on, with such a big belly in the way.`, clothes: "panties"});
					if (isItemAccessible.entry("kitty lingerie") === true) {
						wardrobeTastes.push({text: `and wears cute lingerie to show off ${his} merchandise while giving ${his} protruding belly plenty of room to hang free.`, clothes: "kitty lingerie"});
					}
					if (isItemAccessible.entry("a Santa dress") === true) {
						wardrobeTastes.push({text: `and chooses a dress that pokes fun at ${his} rotund figure while still looking sexy.`, clothes: "a Santa dress"});
					}
					if (isItemAccessible.entry("attractive lingerie for a pregnant woman") === true && slave.energy > 70) {
						wardrobeTastes.push({text: `and wears pretty lingerie to show off ${his} merchandise and accentuate ${his} pregnancy while giving it plenty of room to hang free.`, clothes: "attractive lingerie for a pregnant woman"});
					} else if (isItemAccessible.entry("a maternity dress") === true) {
						wardrobeTastes.push({text: `and wears a conservative dress with plenty of give for ${his} belly to stretch it.`, clothes: "a maternity dress"});
					}
					wardrobeTastes.push({text: `and wears string lingerie to look fun and fuckable while giving ${his} protruding belly plenty of room to hang free.`, clothes: "a string bikini"});
				} else {
					wardrobeTastes.push({text: `and wears string lingerie to show off ${his} body.`, clothes: "a string bikini"});
				}

				if (slave.nationality === "Canadian") {
					if (isItemAccessible.entry("a mounty outfit") === true) {
						wardrobeTastes.push({text: `and chooses an outfit that makes ${him} feel oddly nostalgic.`, clothes: "a mounty outfit"});
					}
				} else if (slave.nationality === "Japanese") {
					if (isItemAccessible.entry("a kimono") === true) {
						wardrobeTastes.push({text: `and chooses an outfit that makes ${him} feel oddly nostalgic.`, clothes: "a kimono"});
					}
				} else if (slave.nationality === "Korean") {
					if (isItemAccessible.entry("a hanbok") === true) {
						wardrobeTastes.push({text: `and chooses an outfit that makes ${him} feel oddly nostalgic.`, clothes: "a hanbok"});
					}
				} else if (slave.nationality === "Mongolian") {
					if (isItemAccessible.entry("a biyelgee costume") === true) {
						wardrobeTastes.push({text: `and chooses an outfit that makes ${him} feel oddly nostalgic.`, clothes: "a biyelgee costume"});
					}
				}
			}
			/* Separated in three categories in case you want to, say, increase the probability of choosing wardrobeAssignment to look more professional*/
			/* clothing = clothing.concat(wardrobeAssignment, wardrobeFS, wardrobeTastes); better version should the above never amount to anything*/
			if (wardrobeAssignment.length > 0) {
				for (let i = 0; i < wardrobeAssignment.length; i++) {
					clothing.push(wardrobeAssignment[i]);
				}
			}
			if (wardrobeFS.length > 0) {
				for (let i = 0; i < wardrobeFS.length; i++) {
					clothing.push(wardrobeFS[i]);
				}
			}
			if (wardrobeTastes.length > 0) {
				for (let i = 0; i < wardrobeTastes.length; i++) {
					clothing.push(wardrobeTastes[i]);
				}
			}
			if (V.arcologies[0].FSChattelReligionist > 0) {
				// Chattel religionism is currently the only FS with a hard advancement link to clothing. Accepting slaves should never voluntarily select an outfit that won't help.
				clothing.deleteWith(c => !ChattelReligionistClothingPass(c.clothes));
				if (clothing.length < 1) {
					if (V.arcologies[0].FSChattelReligionistLaw2 === 1) {
						clothing.push({text: `but chooses to stay nude to promote Holy Nudism.`, clothes: "no clothing"});
					} else {
						clothing.push({text: `and wears a chattel habit to conform to your arcology's culture.`, clothes: "a chattel habit"});
					}
				}
			}
			selection = jsEither(clothing);
		}

		return selection;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {{text:string, shoes:FC.WithNone<FC.Shoes>}}
	 */
	function todaysShoes(slave) {
		/** @type {{text:string, shoes:FC.WithNone<FC.Shoes>}[]} */
		const shoes = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			if (hasBothLegs(slave) && slave.heels === 1) {
				shoes.push({text: `${He} finds ${he} can inexplicably walk if ${he} wears heels; a daily lesson for ${him}, as ${he} forgets shortly after leaving.`, shoes: jsEither(["boots", "extreme heels", "heels"])});
			}
			if (V.arcologies[0].FSIntellectualDependencyLawBeauty === 1 || V.arcologies[0].FSStatuesqueGlorification > 0) {
				shoes.push({text: `A fleeting thought of heels crosses ${his} mind, so ${he} grabs the nearest pair.`, shoes: jsEither(["extreme heels", "heels", "pumps"])});
			}
			shoes.push({text: `${He} vaguely remembers putting things on ${his} feet, so ${he} does.`, shoes: jsEither(["boots", "extreme heels", "flats", "heels", "pumps"])});
			shoes.push({text: `${He} entered without shoes, and will leave the same.`, shoes: "none"});
		} else if (slave.devotion <= 20) {
			if (slave.heels === 0) {
				shoes.push({text: `${He} also slips on comfortable flats.`, shoes: "flats"});
			} else {
				shoes.push({text: `${He} angrily wears the heels ${he} needs to walk.`, shoes: "heels"});
			}
		} else {
			if (V.arcologies[0].FSStatuesqueGlorification > 0) {
				shoes.push({text: `${He} wears heels to boost ${his} height further.`, shoes: jsEither(["heels"])});
			} else if (slave.fetishKnown === 1 && slave.fetish === Fetish.DOM) {
				shoes.push({text: `${He} wears boots to look like a proper dominant.`, shoes: "boots"});
			} else if (slave.fetishKnown === 1 && slave.fetish === Fetish.SADIST) {
				shoes.push({text: `${He} wears boots, since ${he} thinks they make ${him} look dangerous.`, shoes: "boots"});
			} else if (slave.fetishKnown === 1 && slave.fetish === Fetish.MASOCHIST) {
				shoes.push({text: `${He} wears painfully tall heels, since ${he} enjoys the twinge of pain with each step.`, shoes: "extreme heels"});
			} else if (slave.heels === 1) {
				shoes.push({text: `${He} wears the heels ${he} needs to walk.`, shoes: "heels"});
			} else if (slave.actualAge < 13) {
				if (V.arcologies[0].FSIntellectualDependencyLawBeauty === 1) {
					shoes.push({text: `${He} wants to be a bimbo too so ${he} chooses a proper pair of heels.`, shoes: "heels"});
				} else {
					shoes.push({text: `${He} playfully puts on heels to be like all the other girls.`, shoes: "heels"});
				}
				if (slave.bellyPreg >= 1500) {
					shoes.push({text: `${His} feet are a little sensitive, so ${he} decides to not wear shoes.`, shoes: "none"});
				}
				shoes.push({text: `${He} puts on boots so ${he} can stomp around.`, shoes: "boots"});
				shoes.push({text: `${He} wears flats as they are comfortable and easy to take on and off.`, shoes: "flats"});
				shoes.push({text: `Going barefoot is fun, so no shoes for ${him}.`, shoes: "none"});
			} else if (V.arcologies[0].FSIntellectualDependencyLawBeauty === 1) {
				shoes.push({text: `${He} slips on a pair of heels like a proper bimbo.`, shoes: "heels"});
			} else {
				if (slave.fetishKnown === 1 && slave.fetish === Fetish.PREGNANCY && slave.bellyPreg >= 500) {
					shoes.push({text: `${He} goes barefoot to complement ${his} pregnancy.`, shoes: "none"});
				} else if (slave.fetishKnown === 1 && slave.fetish === Fetish.NONE) {
					shoes.push({text: `${He} wears comfortable flats, since ${he} doesn't have a fetish to show off.`, shoes: "flats"});
				}
				shoes.push({text: `${He} wears heels to strut ${his} stuff.`, shoes: "heels"});
				shoes.push({text: `${He} wears comfortable flats to take it easy.`, shoes: "flats"});
				shoes.push({text: `${He} goes barefoot to show off ${his} toes.`, shoes: "none"});
			}
		}
		return jsEither(shoes);
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {{text:string, collar:FC.Collar}}
	 */
	function todaysCollar(slave) {
		/** @type {Array<{text: string, collar: FC.Collar}>} */
		const neck = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			//
		} else if (slave.devotion <= 20) {
			//
		} else {
			if (V.arcologies[0].FSRepopulationFocus > 0 && slave.pregKnown === 1) {
				neck.push({text: `dons a digital display around ${his} neck that shows off ${his} pregnancy in support of your Repopulation efforts,`, collar: "preg biometrics"});
			} else {
				if (V.arcologies[0].FSEgyptianRevivalist > 0) {
					neck.push({text: `dons a wesekh to support your ancient Egyptian pretensions,`, collar: "ancient Egyptian"});
				}
				if (slave.fetish === Fetish.MASOCHIST) {
					neck.push({text: `dons a tight steel collar around ${his} neck,`, collar: "tight steel"});
					neck.push({text: `dons a painful leather collar,`, collar: "uncomfortable leather"});
					neck.push({text: `dons a painfully tight neck corset,`, collar: "neck corset"});
				} else if (slave.fetish === Fetish.PREGNANCY && (canGetPregnant(slave) || slave.pregKnown === 1)) {
					neck.push({text: `dons a digital display that tells everything about ${his} womb,`, collar: "preg biometrics"});
				} else if (slave.fetish === Fetish.BOOBS && slave.boobs >= 1000) {
					neck.push({text: `dons a cowbell to draw attention to ${his} luscious udders,`, collar: "leather with cowbell"});
				}
				neck.push({text: `decides ${his} neck needs no accenting,`, collar: "none"});
				neck.push({text: `dons some pretty jewelry,`, collar: "pretty jewelry"});
				neck.push({text: `dons a lovely gold collar,`, collar: "heavy gold"});
				neck.push({text: `dons a simple silk ribbon around ${his} neck,`, collar: "silk ribbon"});
			}
		}
		return jsEither(neck);
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {{text:string, bellyAccessory:FC.BellyAccessory}}
	 */
	function todaysCorset(slave) {
		/** @type {Array<{text: string, bellyAccessory: FC.BellyAccessory}>} */
		const belly = [];
		/** @type {FC.BellyAccessory[]} */
		const empathyBellies = [];
		for (const [key, object] of App.Data.bellyAccessory) {
			if (object.hasOwnProperty("empathyBelly")) {
				empathyBellies.push(key);
			}
		}

		if (slave.fetish === Fetish.MINDBROKEN) {
			if (V.arcologies[0].FSRepopulationFocus > 0 && slave.belly < 1500) {
				if (slave.weight > 130) {
					belly.push({text: `${He} notices the fake bellies; since every girl ${he} has ever met has a rounded middle, it's only natural ${he} is compelled to wear one. ${He} struggles to fit it around ${his} huge gut, only stopping when another slave takes it away from ${him} so ${he} moves on and stops blocking the wardrobe with ${his} fat ass.`, bellyAccessory: "none"});
				} else {
					belly.push({text: `${He} notices the fake bellies; since every girl ${he} has ever met has a rounded middle, it's only natural ${he} is compelled to wear one.`, bellyAccessory: jsEither(empathyBellies)});
				}
			} else {
				belly.push({text: "", bellyAccessory: slave.bellyAccessory}); /* compatibility for no output, will likely get deprecated in the future as content is added*/
			}
		} else if (slave.devotion <= 20) {
			if (slave.belly > 10000 && (slave.pregAdaptation * 800 <= slave.belly) && slave.bellyAccessory !== "a support band") {
				belly.push({text: `slips a pregnancy support band around ${his} middle to help alleviate some of the discomfort,`, bellyAccessory: "a support band"});
			} else if (slave.belly < 8000 && slave.bellyAccessory === "a support band") {
				belly.push({text: `removes ${his} support band since ${he} no longer needs it,`, bellyAccessory: "none"});
			}
		} else {
			if (V.arcologies[0].FSRepopulationFocus > 0 && slave.belly < 1500 && slave.sexualFlaw !== SexualFlaw.BREEDER) {
				if (slave.weight > 130) {
					belly.push({text: `struggles to fit a fake pregnant belly around ${his} gut before giving up and hoping ${he} can pass as fecund,`, bellyAccessory: "none"});
				} else {
					belly.push({text: `straps on a fake pregnant belly to fit in with all the other pregnant girls,`, bellyAccessory: jsEither(["a small empathy belly", "a medium empathy belly", "a large empathy belly"])});
				}
			} else if (slave.belly < 1500 && slave.fetish === Fetish.PREGNANCY && isItemAccessible.entry("a small empathy belly", "bellyAccessory") && slave.sexualFlaw !== SexualFlaw.BREEDER && slave.weight <= 130) {
				if (slave.fetishStrength <= 30) {
					belly.push({text: `straps on a 1st trimester belly to sate ${his} curiosity,`, bellyAccessory: "a small empathy belly"});
					belly.push({text: `straps on a 2nd trimester belly to sate ${his} curiosity,`, bellyAccessory: "a medium empathy belly"});
					belly.push({text: `straps on a 3rd trimester belly to sate ${his} curiosity,`, bellyAccessory: "a large empathy belly"});
				} else if (slave.fetishStrength <= 95) {
					belly.push({text: `straps on a 3rd trimester belly to satisfy ${his} pregnancy fetish,`, bellyAccessory: "a large empathy belly"});
				} else if (slave.fetishStrength > 95) {
					belly.push({text: `straps on the largest belly ${he} can find to satisfy ${his} pregnancy fetish,`, bellyAccessory: "a huge empathy belly"});
				}
			} else if (slave.belly > 10000 && (slave.pregAdaptation * 1200 <= slave.belly) && slave.bellyAccessory !== "a support band") {
				belly.push({text: `slips a pregnancy support band around ${his} middle to better handle ${his} fecund mound,`, bellyAccessory: "a support band"});
			} else if (empathyBellies.includes(slave.bellyAccessory) && slave.fetish !== Fetish.PREGNANCY) {
				belly.push({text: `removes ${his} fake belly, since ${he} dislikes it,`, bellyAccessory: "none"});
			} else if (empathyBellies.includes(slave.bellyAccessory) && slave.sexualFlaw === SexualFlaw.BREEDER) {
				belly.push({text: `pulls ${his} fake belly off, disgusted by it,`, bellyAccessory: "none"});
			} else if (slave.belly < 8000 && slave.bellyAccessory === "a support band") {
				belly.push({
					text: `removes ${his} support band since ${he} no longer needs it,`, bellyAccessory: "none"
				});
			} else {
				belly.push({text: "", bellyAccessory: slave.bellyAccessory}); /* compatibility for no output, will likely get deprecated in the future as content is added*/
			}
		}
		return jsEither(belly);
	}
};
