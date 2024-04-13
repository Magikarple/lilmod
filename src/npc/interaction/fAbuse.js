/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.Interact.fAbuse = function(slave) {
	const node = new DocumentFragment();
	let r = [];

	const {
		He, His,
		he, his, him, himself
	} = getPronouns(slave);

	if (slave.assignment === Job.BODYGUARD) {
		if (slave.fetish === "masochist" && slave.fetishKnown === 1 && slave.fetishStrength > 95) {
			r.push(`Knowing how much your bodyguard likes being hurt, you decide to reward ${him} in ${his} own particular way.`);
		} else if (slave.muscles < -5 && slave.skill.combat <= 30) {
			r.push(`Looking at your bodyguard, you think ${he} doesn't seem that dangerous, as ${he} can barely hold a weapon up. You order ${him} to spar with you, and you quickly overpower ${him} without even breaking a sweat. Afterwards, you take the pretext of punishing ${him} to satisfy your urges.`);
		} else if (slave.muscles >= -5 && slave.muscles <= 5 && slave.skill.combat > 30) {
			r.push(`You glance at your bodyguard. ${He} looks like ${he} can handle ${himself}, and you know ${he} does, but ${his} lack of musculature makes ${him} look somewhat frail. You inform ${him} that ${he} isn't muscular enough, and that you'll punish ${him} yourself for neglecting ${his} physique.`);
		} else if (slave.muscles > 50 && slave.skill.combat <= 30) {
			r.push(`Your bodyguard may look strong and powerful, you know ${he} can't really handle ${his} weapon. You order ${him} to spar with you, and you use ${his} own muscles against ${him}, winning easily. Afterwards, you take the pretext of punishing ${him} to satisfy your urges.`);
		} else if (slave.muscles > 5 && slave.skill.combat > 30) {
			r.push(`Your bodyguard stands at your side. ${He} is definitely a force to be reckoned with. You know you'd have a hard time besting ${him}, and do not wish to get hurt, so you'll just inform ${him} ${he}'ll be undertaking some particular training.`);
		} else if (slave.muscles > 5 && slave.skill.combat <= 30) {
			r.push(`Your bodyguard may look fit, you know ${he} can't really handle ${his} weapon. You order ${him} to spar with you; while ${he} may be quick, ${he} mostly just flails ${his} weapon around allowing you an easy win. Afterwards, you take the pretext of punishing ${him} to satisfy your urges.`);
		}
	}

	let assPain = 0;

	if (!hasAnyLegs(slave)) {
		r.push(`You set ${his} helpless form down for abuse. Brutalizing ${him} is almost childishly easy; ${his}`);
		if (hasAnyArms(slave)) {
			r.push(`leg`);
		} else {
			r.push(`limb`);
		}
		r.push(`less torso leaves ${him} at your mercy.`);
	} else {
		r.push(`You call ${him} over so you can abuse the`);
		if (V.seeRace === 1) {
			r.push(slave.race);
		}
		r.push(`bitch. You get things started with an open-handed slap across the face${(!canSee(slave)) ? `; ${he} never saw it coming` : ``}. As ${he} reels in shock and pain, you follow up with`);
		if (slave.bellyPreg >= 600000) {
			r.push(`a vicious slap across ${his} straining pregnancy,`);
		} else if (slave.bellyFluid > 2000) {
			r.push(`a vicious punch into ${his} bloated belly,`);
		} else if (slave.dick > 0) {
			r.push(`a vicious slap to ${his} cock,`);
		} else if (slave.clit > 0) {
			r.push(`a vicious slap to ${his} exposed clit,`);
		} else if (slave.nipples === "fuckable") {
			r.push(`a vicious jab deep into ${his} nipplecunt,`);
		} else if (slave.nipples === "huge") {
			r.push(`a vicious jerk on ${his} big nipples,`);
		} else if (slave.nipples === "inverted") {
			r.push(`a vicious pinch to each side of ${his} sensitive, fully inverted nipples,`);
		} else if (slave.bellyPreg >= 100000) {
			r.push(`a vicious slap across ${his} overfull pregnant belly,`);
		} else if (slave.preg > slave.pregData.normalBirth/4) {
			r.push(`a vicious slap across ${his} pregnant belly,`);
		} else if (slave.heels > 0) {
			r.push(`a vicious thrust to ${his} altered tendons,`);
		} else if (slave.boobs >= 800) {
			r.push(`a vicious slap across ${his} massive breasts,`);
		} else if (slave.bellyImplant >= 1500) {
			r.push(`a vicious slap across ${his} implant rounded belly,`);
		} else if (!(slave.chastityVagina)) {
			r.push(`a vicious slap on the mons,`);
		} else {
			r.push(`a vicious jerk on ${his} nipples,`);
		}

		if (slave.bellyFluid >= 10000) {
			if (slave.inflationMethod === 2) {
				r.push(`which causes ${him} to discharge ${his} contained ${slave.inflationType} all over ${himself} before collapsing into ${his} puddle on the floor in agony.`);
				deflate(slave);
			} else {
				r.push(`which causes ${him} to vomit up ${his} contained ${slave.inflationType} all over ${himself} before collapsing into ${his} puddle on the floor in agony.`);
				deflate(slave);
			}
		} else if (slave.bellyFluid >= 5000) {
			if (random(1, 100) > slave.devotion) {
				r.push(`which nearly forces ${him} to lose ${his} contained ${slave.inflationType}, but ${he} controls ${himself} out of devotion to you as ${he} drops to the floor in agony.`);
			} else {
				if (slave.inflationMethod === 2) {
					r.push(`which causes ${him} to discharge ${his} contained ${slave.inflationType} all over ${himself} before collapsing into ${his} puddle on the floor in agony.`);
					deflate(slave);
				} else {
					r.push(`which causes ${him} to vomit up ${his} contained ${slave.inflationType} all over ${himself} before collapsing into ${his} puddle on the floor in agony.`);
					deflate(slave);
				}
			}
		} else {
			r.push(`which causes ${him} to collapse to the floor in agony.`);
		}
		if (!hasAnyArms(slave)) {
			if (slave.clothes !== "no clothing") {
				r.push(`You don't have the patience for ${him} to squirm ${his} way out of ${his} clothing, so you roughly extract ${him} from it, making sure that to treat ${his} clothes better than you do ${him}.`);
			}
		} else {
			if (slave.clothes !== "no clothing" || slave.bellyAccessory !== "none") {
				r.push(`You tell ${him} ${he} has ten seconds to get naked.`);
			}
			switch (slave.bellyAccessory) {
				case "a support band":
					r.push(`${His} fingers fumble desperately trying to grip the hook and loop of ${his} support band.`);
					break;
				case "a corset":
					r.push(`${His} fingers fumble desperately with the straps of ${his} corset.`);
					break;
				case "an extreme corset":
					r.push(`${His} fingers fumble desperately with the bindings of ${his} corset, and ${he} hyperventilates within its embrace as ${he} works.`);
					break;
			}
			switch (slave.clothes) {
				case "uncomfortable straps":
					r.push(`In ${his} haste to get out of ${his} straps ${he} trips and falls flat.`);
					break;
				case "clubslut netting":
					r.push(`In ${his} haste to get out of ${his} slutty netting ${he} trips and falls flat.`);
					break;
				case "shibari ropes":
					r.push(`In ${his} haste to get out of ${his} shibari ropes ${he} only manages to get tangled and fall over.`);
					break;
				case "a latex catsuit":
				case "restrictive latex":
					r.push(`In ${his} haste to get out of ${his} clinging latex ${he} trips and falls flat in a tangle of latex and trembling flesh.`);
					break;
				case "a schutzstaffel uniform":
					r.push(`${He}'s desperately torn between hurry to avoid punishment and fear ${he}'ll damage ${his} trousers.`);
					break;
				case "a slutty schutzstaffel uniform":
					r.push(`${He}'s desperately torn between hurry to avoid punishment and fear ${he}'ll tear ${his} miniskirt.`);
					break;
				case "a military uniform":
				case "a red army uniform":
				case "a confederate army uniform":
					r.push(`${He}'s desperately torn between hurry to avoid punishment and fear ${he}'ll damage ${his} shirt.`);
					break;
				case "a mounty outfit":
					r.push(`${He}'s desperately torn between hurry to avoid punishment and fear ${he}'ll damage ${his} slacks.`);
					break;
				case "a nice nurse outfit":
					r.push(`${He} quickly tears off ${his} loose scrubs.`);
					break;
				case "a biyelgee costume":
					r.push(`${He} quickly tears off ${his} loose dress.`);
					break;
				case "a mini dress":
					r.push(`${He} struggles to take off ${his} tight mini dress.`);
					break;
				case "attractive lingerie":
					r.push(`${He} almost tears ${his} delicate lingerie in ${his} haste to avoid punishment.`);
					break;
				case "a succubus outfit":
					if (["a corset", "an extreme corset"].includes(slave.bellyAccessory)) {
						r.push(`${He} struggles with ${his} leather corset.`);
					} else {
						r.push(`Panic sets in as ${he} hastily sheds what's left of ${his} outfit.`);
					}
					break;
				case "spats and a tank top":
					r.push(`${He} hastily slips ${his} top off and struggles to get out of ${his} clinging spats.`);
					break;
				case "lederhosen":
					r.push(`${He} hastily slips ${his} tunic off and struggles to unbutton ${his} clinging shorts.`);
					break;
				case "attractive lingerie for a pregnant woman":
					r.push(`${He} quickly sheds ${his} vest and tight bra before panicking and resorting to ripping ${his} silk panties off.`);
					break;
				case "a maternity dress":
					r.push(`${He} hastily pulls ${his} dress down, revealing ${his} body.`);
					break;
				case "a dirndl":
					r.push(`${He} hastily pulls ${his} dress down, revealing ${his} body.`);
					break;
				case "a long qipao":
					r.push(`${He} hastily pulls ${his} dress down, revealing ${his} body.`);
					break;
				case "stretch pants and a crop-top":
					r.push(`${He} hastily pulls ${his} crop-top over ${his} head and struggles to remove ${his} stretch pants only to get tangled and fall over.`);
					break;
				case "a cheerleader outfit":
					r.push(`${He} yanks ${his} cheerleader skirt down and pulls ${his} slutty top off.`);
					break;
				case "a string bikini":
					r.push(`${He} gives ${himself} a nasty pinch between the legs in ${his} haste to get out of ${his} string bottom.`);
					break;
				case "a scalemail bikini":
					r.push(`${He} gives ${himself} a tiny cut on ${his} breast in ${his} haste to get out of ${his} scalemail top.`);
					break;
				case "striped panties":
					r.push(`${He} yanks ${his} panties down, kicking them off to the side.`);
					break;
				case "a monokini":
					r.push(`${He} nearly snaps the shoulder straps of ${his} monokini in ${his} haste to remove it.`);
					break;
				case "overalls":
					r.push(`${He} nearly snaps the shoulder straps of ${his} overalls in ${his} haste to remove them.`);
					break;
				case "an apron":
					r.push(`${He} quickly undoes ${his} apron's straps and hoists the garment over ${his} head.`);
					break;
				case "a hijab and blouse":
				case "conservative clothing":
					r.push(`${He} winds up tearing a few buttons off ${his} shirt in ${his} haste to remove it.`);
					break;
				case "Western clothing":
					r.push(`${He} winds up tearing a few buttons off ${his} flannel shirt in ${his} haste to remove it.`);
					break;
				case "a cybersuit":
					r.push(`${He} whimpers as ${he} knows ${he} can barely remove ${his} visor in that amount of time, let alone the whole bodysuit, but ${he} tries anyway.`);
					break;
				case "a tight Imperial bodysuit":
					r.push(`${He} struggles valiantly to get ${his} tight-fitting bodysuit off, but can only frantically peel it down halfway in your short timeframe.`);
					break;
				case "battlearmor":
					r.push(`${He} whimpers as ${he} knows ${he} can barely remove ${his} arm guards in that amount of time, let alone the whole suit, but ${he} tries anyway.`);
					break;
				case "Imperial Plate":
					r.push(`${He} quietly whimpers, knowing that it'll take ${him} full minutes to completely get off ${his} ultra-heavy Imperial Plate. Nevertheless, ${he} makes a valiant effort. Having this heavily-armored tank squirming underneath you is almost amusing.`);
					break;
				case "a fallen nuns habit":
					r.push(`${He} tugs desperately at the laces of ${his} tight latex nun getup.`);
					break;
				case "a chattel habit":
					r.push(`${He} shucks ${his} habit off easily, since it was designed to be removed quickly.`);
					break;
				case "a penitent nuns habit":
					r.push(`${He} pulls ${his} coarse habit over ${his} head, revealing ${his} chafed flesh.`);
					break;
				case "cutoffs and a t-shirt":
					r.push(`${He} shimmies out of ${his} cutoffs and whips ${his} t-shirt over ${his} head.`);
					break;
				case "a slutty nurse outfit":
					r.push(`Getting out of ${his} tight nurse getup in that amount of time is impossible, but ${he} tries anyway.`);
					break;
				case "a schoolgirl outfit":
					r.push(`${His} schoolgirl outfit is easily stripped off: ${he} pulls down ${his} skimpy skirt and tears off ${his} little blouse, and ${he}'s nude.`);
					break;
				case "a kimono":
					r.push(`Getting out of ${his} kimono in that amount of time is flagrantly impossible, but ${he} tries anyway.`);
					break;
				case "a klan robe":
					r.push(`Because ${he}'s nude under ${his} robes, ${he} simply lifts them over ${his} head.`);
					break;
				case "a hijab and abaya":
				case "a niqab and abaya":
					r.push(`Because ${he}'s nude under ${his} abaya, ${he} simply lifts it over ${his} head.`);
					break;
				case "a burqa":
					r.push(`Because ${he}'s nude under ${his} burqa, ${he} simply lifts it over ${his} head.`);
					break;
				case "a tube top and thong":
					r.push(`${He} shimmies out of ${his} thong and whips ${his} tube top over ${his} head.`);
					break;
				case "a button-up shirt and panties":
					r.push(`${He} drops ${his} panties and lifts ${his} shirt over ${his} head.`);
					break;
				case "a gothic lolita dress":
					r.push(`Getting out of ${his} lolita dress in that amount of time is impossible, but ${he} tries anyway.`);
					break;
				case "a hanbok":
					r.push(`${He} winds up tearing stitches out of ${his} shirt in ${his} haste to remove it.`);
					break;
				case "a bra":
					r.push(`Because ${he}'s nude under ${his} bra, ${he} simply lifts it over ${his} head.`);
					break;
				case "a button-up shirt":
					r.push(`Because ${he}'s nude under ${his} shirt, ${he} simply lifts it over ${his} head.`);
					break;
				case "a nice pony outfit":
					r.push(`${He} whimpers as ${he} knows ${he} can't remove ${his} outfit without some help.`);
					break;
				case "a slutty pony outfit":
					r.push(`${He} whimpers as ${he} knows ${he} can't remove ${his} outfit without some help.`);
					break;
				case "a sweater":
					r.push(`Because ${he}'s nude under ${his} sweater, ${he} simply lifts it over ${his} head.`);
					break;
				case "a tank-top":
					r.push(`Because ${he}'s nude under ${his} tank-top, ${he} simply lifts it over ${his} head.`);
					break;
				case "a thong":
					r.push(`${He} slips out of ${his} thong and kicks it aside.`);
					break;
				case "a tube top":
					r.push(`Because ${he}'s nude under ${his} tube top, ${he} simply lifts it over ${his} head.`);
					break;
				case "a one-piece swimsuit":
					r.push(`Because ${he}'s nude under ${his} swimsuit, ${he} simply pulls it down past ${his} hips and wiggles free.`);
					break;
				case "a police uniform":
					r.push(`${He} almost tears ${his} uniform in ${his} haste to avoid punishment.`);
					break;
				case "a striped bra":
					r.push(`Because ${he}'s nude under ${his} bra, ${he} simply lifts it over ${his} head.`);
					break;
				case "striped underwear":
					r.push(`${He} pulls off ${his} bra and panties with minimal effort.`);
					break;
				case "a skimpy loincloth":
					r.push(`${He} slips out of ${his} loincloth and kicks it aside.`);
					break;
				case "a slutty klan robe":
					r.push(`${He} slips off ${his} robe and throws it aside.`);
					break;
				case "a sports bra":
					r.push(`Because ${he}'s nude under ${his} bra, ${he} simply lifts it over ${his} head.`);
					break;
				case "a sweater and panties":
					r.push(`${He} tears ${his} sweater in ${his} haste and slips out of ${his} panties quickly.`);
					break;
				case "a t-shirt":
					r.push(`Because ${he}'s nude under ${his} t-shirt, ${he} simply lifts it over ${his} head and throws it aside.`);
					break;
				case "a tank-top and panties":
					r.push(`${He} yanks off ${his} t-shirt and drops ${his} panties.`);
					break;
				case "a t-shirt and thong":
					r.push(`${He} yanks off ${his} t-shirt and drops ${his} thong.`);
					break;
				case "an oversized t-shirt and boyshorts":
					r.push(`${He} yanks off ${his} t-shirt and drops ${his} boy shorts.`);
					break;
				case "an oversized t-shirt":
					r.push(`${He} yanks off ${his} t-shirt.`);
					break;
				case "a t-shirt and jeans":
					r.push(`${He} yanks off ${his} t-shirt but struggles to wiggle out of ${his} blue jeans.`);
					break;
				case "boyshorts":
					r.push(`${He} drops ${his} shorts quickly.`);
					break;
				case "cutoffs":
					r.push(`${He} wiggles out of ${his} shorts quickly.`);
					break;
				case "leather pants and pasties":
					r.push(`${He} yanks ${his} pasties off but struggles to wiggle out of ${his} leather pants.`);
					break;
				case "leather pants":
					r.push(`${He} struggles to wiggle out of ${his} leather pants.`);
					break;
				case "panties":
					r.push(`${He} drops ${his} panties quickly.`);
					break;
				case "sport shorts and a t-shirt":
					r.push(`${He} yanks off ${his} shirt and drops ${his} shorts.`);
					break;
				case "a t-shirt and panties":
					r.push(`${He} yanks off ${his} t-shirt and drops ${his} panties.`);
					break;
				case "panties and pasties":
					r.push(`${He} yanks off ${his} pasties and drops ${his} panties.`);
					break;
				case "pasties":
					r.push(`${He} hastily yanks off ${his} pasties.`);
					break;
				case "sport shorts and a sports bra":
					r.push(`${He} drops ${his} shorts and tosses ${his} bra.`);
					break;
				case "jeans":
					r.push(`${He} struggles to wiggle out of ${his} blue jeans.`);
					break;
				case "a sweater and cutoffs":
					r.push(`${He} tosses off ${his} sweater and drops ${his} shorts.`);
					break;
				case "leather pants and a tube top":
					r.push(`${He} yanks ${his} tube top off but struggles to wiggle out of ${his} leather pants.`);
					break;
				case "sport shorts":
					r.push(`${He} drops ${his} shorts quickly.`);
					break;
				case "battledress":
					r.push(`${He} strips ${his} tank top off in one motion, unfastens ${his} belt, and pulls down ${his} pants, though ${his} boots defeat ${him} and stay on.`);
					break;
				case "a slutty outfit":
					r.push(`${He} hurriedly strips ${himself} out of ${his} carefully chosen outfit.`);
					break;
				case "a slave gown":
					r.push(`${He}'s desperately torn between hurry to avoid punishment and fear ${he}'ll rip ${his} delicate gown.`);
					break;
				case "a halter top dress":
				case "an evening dress":
					r.push(`${He}'s desperately torn between hurry to avoid punishment and fear ${he}'ll rip ${his} delicate dress.`);
					break;
				case "a ball gown":
					r.push(`${He}'s desperately torn between hurry to avoid punishment and fear ${he}'ll rip ${his} delicate silken ball gown.`);
					break;
				case "nice business attire":
					r.push(`${He}'s desperately torn between hurry to avoid punishment and fear ${he}'ll damage ${his} blouse.`);
					break;
				case "slutty business attire":
					r.push(`${He}'s desperately torn between hurry to avoid punishment and fear ${he}'ll tear ${his} suit in ${his} haste.`);
					break;
				case "a nice maid outfit":
					r.push(`${He} pulls ${his} dress over ${his} head and quickly undoes the buttons of ${his} blouse, one after the other.`);
					break;
				case "a slutty maid outfit":
					r.push(`${His} short dress comes off easily, but ${he} fumbles with the buttons on ${his} tight blouse.`);
					break;
				case "a comfortable bodysuit":
					r.push(`${He}'s desperately torn between hurry to avoid punishment and fear ${he}'ll stretch out ${his} bodysuit.`);
					break;
				case "a burkini":
					r.push(`${He}'s desperately torn between hurry to avoid punishment and fear ${he}'ll stretch out ${his} burkini.`);
					break;
				case "a leotard":
					r.push(`${His} leotard is tight enough that ${he} has to struggle mightily to get it off that quickly.`);
					break;
				case "a bunny outfit":
					r.push(`${He}'s desperately torn between hurry to avoid punishment and fear ${he}'ll put runs in ${his} hose.`);
					break;
				case "kitty lingerie":
					r.push(`${He} almost tears ${his} decorative lingerie in ${his} haste to avoid punishment.`);
					break;
				case "harem gauze":
					r.push(`${He}'s desperately torn between hurry to avoid punishment and fear ${he}'ll tear ${his} flimsy gauze.`);
					break;
				case "a Santa dress":
					r.push(`${He} tears off some of ${his} dress's white fur trim in ${his} struggle to remove it.`);
					break;
				case "slutty jewelry":
					r.push(`${He} hurriedly strips fine jewelry from ${his} neck, ${hasBothArms(slave) ? `wrists` : `wrist`} and ${hasBothLegs(slave) ? `ankles` : `ankle`}.`);
					break;
				case "a courtesan dress":
					if (["a corset", "an extreme corset"].includes(slave.bellyAccessory)) {
						r.push(`${His} fingers fumble desperately with the straps of ${his} corset, knowing there is still a lot of dress left to remove after it.`);
					} else {
						r.push(`Panic sets in as ${he} realizes just how much dress is left to remove. In ${his} haste, ${he} hooks a sleeve with ${his} foot and falls flat, exposing ${his} bare ass.`);
					}
					break;
				case "a bimbo outfit":
					r.push(`In two swift motions ${he}'s out of ${his} outfit.`);
			}
		}
	}

	if (slave.fetish === "masochist" && slave.fetishKnown === 1 && slave.fetishStrength > 95) {
		r.push(`The slap seems to have excited ${him}, seeing ${his} hard nipples and wet pussy, and ${his} eyes practically beg for more.`);
	} else if (slave.fetish === "masochist" && slave.fetishKnown === 1 && slave.fetishStrength > 60) {
		r.push(`${He} seems to be a bit expectant of what is to come.`);
	}

	if (V.PC.dick !== 0) {
		if (hasAnyArms(slave) && App.Data.clothes.get(slave.clothes).exposure <= 3) {
			r.push(`While ${he} strips, your`);
		} else {
			r.push(`Your`);
		}
		r.push(`stiffening cock rises,${(V.PC.vagina !== -1) ? `revealing your pussy and ` : ``} earning`);
	} else {
		if (hasAnyArms(slave) && App.Data.clothes.get(slave.clothes).exposure <= 3) {
			r.push(`While ${he} strips, you`);
		} else {
			r.push(`You`);
		}
		r.push(`don a cruelly large strap-on, earning`);
	}
	if (slave.fetish === "masochist" && slave.fetishKnown === 1 && slave.fetishStrength > 95) {
		r.push(`a sultry look`);
	} else if (slave.fetish === "masochist" && slave.fetishKnown === 1 && slave.fetishStrength > 60) {
		r.push(`a shy look`);
	} else {
		r.push(`a frightened glance`);
	}
	r.push(`from your victim.`);

	if (isAmputee(slave)) {
		if (App.Data.clothes.get(slave.clothes).exposure <= 3) {
			r.push(`Growing impatient, you rip the clothes off ${his} limbless torso`);
		} else {
			r.push(`You walk up to ${him}`);
		}
		r.push(`and spank ${him} brutally; spinning ${him} to present`);
		if (slave.vagina > -1) {
			r.push(`${his} holes`);
		} else {
			r.push(`${his} hole`);
		}
		r.push(`to you and`);
		if (slave.fetish === "masochist" && slave.fetishKnown === 1 && slave.fetishStrength > 60) {
			if (canAchieveErection(slave)) {
				r.push(`making ${his} erect dick throb`);
			} else if (slave.vagina > -1) {
				r.push(`making ${his} pussy throb`);
			} else {
				r.push(`making ${his} butthole throb`);
			}
		}
		r.push(`with anticipation.`);
	} else {
		r.push(`You order ${him} to present`);
		if (slave.vagina > -1) {
			r.push(`${his} holes`);
		} else {
			r.push(`${his} hole`);
		}
		r.push(`to you and spank ${him} brutally`);
		if (slave.fetish === "masochist" && slave.fetishKnown === 1 && slave.fetishStrength > 60) {
			if (canAchieveErection(slave)) {
				r.push(`making ${his} erect dick throb`);
			} else if (slave.vagina > -1) {
				r.push(`making ${his} pussy throb`);
			} else {
				r.push(`making ${his} butthole throb`);
			}
		}
		if (slave.devotion < -50) {
			r.push(`until ${he} complies.`);
		} else if (slave.devotion < -20) {
			r.push(`as ${he} slowly complies.`);
		} else if (slave.devotion <= 20) {
			r.push(`as ${he} fearfully complies.`);
		} else if (slave.devotion <= 50) {
			r.push(`as ${he} rushes to comply.`);
		} else {
			r.push(`as ${he} complies.`);
		}
	}

	r.push(`${His} ${slave.skin}${V.seeRace === 1 ? `, ${slave.race}` : ``} ass`);
	const skinToneLvl = skinToneLevel(slave.skin);
	if (App.Medicine.Modification.dyedSkins.includes(slave.skin)) {
		r.push(`barely shows the spanking.`);
	} else if (skinToneLvl < 5) {
		r.push(`shows the spanking extremely well.`);
	} else if (skinToneLvl < 12) {
		r.push(`shows the spanking well.`);
	} else if (skinToneLvl < 20) {
		r.push(`barely shows the spanking.`);
	} else {
		r.push(`barely shows any marks from the spanking.`);
	}

	if (slave.chastityPenis === 1) {
		r.push(`You rip ${his} dick chastity off ${him}, though ${he} knows not to be relieved. ${His} cock is now vulnerable, not free.`);
	}

	if (slave.anus === 0) {
		r.push(`The bitch is still a butthole virgin and you don't mean to take that now, but you torture ${him} with the threat of raping ${his} virgin ass for a while before settling for ${his} gagging throat.`);
		seX(slave, "oral", V.PC, "penetrative");
	} else if (slave.chastityVagina && canDoAnal(slave)) {
		r.push(`The bitch is wearing a chastity belt, so ${he} isn't surprised when you shove`);
		if (V.PC.dick === 0) {
			r.push(`the strap-on`);
		} else {
			r.push(`your dick`);
		}
		r.push(`up ${his} butt. What surprises ${him} is when you slide a finger or two in alongside your dick to stretch ${him} to the point of pain.`);
		r.push(VCheck.Anal(slave, 1));
		assPain = 1;
	} else if (slave.vagina === 0) {
		r.push(`The bitch is still a virgin and you don't mean to take that now, but you torture ${him} with the threat of raping ${his} virgin pussy for a while before settling for ${his} gagging throat.`);
		seX(slave, "oral", V.PC, "penetrative");
	} else if (slave.bellyPreg >= 600000) {
		r.push(`The bitch is on the brink of bursting, so hard intercourse will be painful and terrifying to ${him}. You thrust hard into ${him} causing ${his} taut belly to bulge and making ${his} children squirm within ${his} straining womb.`);
		if (V.PC.vagina !== -1 && V.PC.dick !== 0) {
			r.push(`Fortunately for ${him}, this gets you so wet that some of your pussyjuice makes it down onto your shaft and serves as improvised lube.`);
		}
		r.push(`You brutally fuck ${him} as ${he} pleads for you to stop until you're at your edge. More cum won't make the bitch more pregnant, but you cum inside ${him} anyway.`);
		r.push(VCheck.Vaginal(slave, 1));
	} else if (slave.bellyPreg >= 120000) {
		r.push(`The bitch is hugely pregnant, so hard intercourse will be uncomfortable and worrying for ${him}. You have hard intercourse. ${He} sobs as you rock the huge weight of ${his} belly back and forth without mercy, forcing ${his} already straining belly to bulge further, and whines as ${he} feels your cockhead batter ${his} womb.`);
		if (V.PC.vagina !== -1 && V.PC.dick !== 0) {
			r.push(`Fortunately for ${him}, this gets you so wet that some of your pussyjuice makes it down onto your shaft and serves as improvised lube.`);
		}
		r.push(`More cum won't make the bitch more pregnant, but you cum inside ${him} anyway.`);
		r.push(VCheck.Vaginal(slave, 1));
	} else if (slave.preg > slave.pregData.normalBirth/2) {
		r.push(`The bitch is pregnant, so hard intercourse will be uncomfortable and even worrying for ${him}. You have hard intercourse. ${He} sobs as you saw the huge weight of ${his} belly back and forth without mercy, and whines as ${he} feels your cockhead batter ${his} womb.`);
		if (V.PC.vagina !== -1 && V.PC.dick !== 0) {
			r.push(`Fortunately for ${him}, this gets you so wet that some of your pussyjuice makes it down onto your shaft and serves as improvised lube.`);
		}
		r.push(`More cum won't make the bitch more pregnant, but you cum inside ${him} anyway.`);
		r.push(VCheck.Vaginal(slave, 1));
	} else if (slave.pregKnown === 1) {
		r.push(`The bitch knows ${he} is pregnant, even if it isn't obvious yet, so hard intercourse will be uncomfortable and even worrying for ${him}. You have hard intercourse. ${He} sobs as you pound ${his} vagina without mercy, and whines as ${he} feels your cockhead batter ${his} womb.`);
		if (V.PC.vagina !== -1 && V.PC.dick !== 0) {
			r.push(`Fortunately for ${him}, this gets you so wet that some of your pussyjuice makes it down onto your shaft and serves as improvised lube.`);
		}
		r.push(`More cum won't make the bitch more pregnant, but you cum inside ${him} anyway.`);
		r.push(VCheck.Vaginal(slave, 1));
	} else if (slave.vagina === 1) {
		r.push(`The bitch's pussy is tight, so you ram`);
		if (V.PC.dick === 0) {
			r.push(`the strap-on`);
		} else {
			r.push(`your dick`);
		}
		r.push(`into ${him} without preamble and fuck ${him} hard and fast.`);
		if (V.PC.vagina !== -1 && V.PC.dick !== 0) {
			r.push(`Fortunately for ${him}, this gets you so wet that some of your pussyjuice makes it down onto your shaft and serves as improvised lube.`);
		}
		r.push(`${His} cunt spasms with the pain of the rape. You cum in no time.`);
		r.push(VCheck.Vaginal(slave, 1));
	} else if (slave.anus === 1) {
		r.push(`The bitch's butt is tight, so you ram`);
		if (V.PC.dick === 0) {
			r.push(`the strap-on`);
		} else {
			r.push(`your dick`);
		}
		r.push(`into ${him} without lubricant and sodomize ${him} as hard as you can without damaging your property.`);
		if (V.PC.vagina !== -1 && V.PC.dick !== 0) {
			r.push(`Fortunately for ${him}, this gets you so wet that some of your pussyjuice makes it down onto your shaft and serves as improvised lube.`);
		}
		r.push(`${His} asshole spasms with the pain of the rape. You cum explosively.`);
		r.push(VCheck.Anal(slave, 1));
		assPain = 1;
	} else if (slave.dick > 0 && slave.scrotum > 0) {
		r.push(`You ram`);
		if (V.PC.dick === 0) {
			r.push(`the strap-on`);
		} else {
			r.push(`your dick`);
		}
		r.push(`into ${his} sissy butt without lubricant. As ${he} flinches you announce that ${he}'ll be taking part in giving ${himself} anal pain. ${He} humps into you lamely, so you administer a truly agonizing slap to ${his} balls`);
		if (V.PC.dick === 0) {
			r.push(r.pop() + ".");
		} else {
			r.push(`that makes ${his} anal ring stiffen deliciously around your dick.`);
		}
		r.push(`To avoid further punishment ${he} fucks ${himself} against you almost hard enough to hurt ${himself}.`);
		if (V.PC.vagina !== -1 && V.PC.dick !== 0) {
			r.push(`Fortunately for ${him}, this gets you so wet that some of your pussyjuice makes it down onto your shaft and serves as improvised lube.`);
		}
		r.push(`You orgasm explosively.`);
		r.push(VCheck.Anal(slave, 1));
		assPain = 1;
	} else if (slave.dick > 0) {
		r.push(`You ram`);
		if (V.PC.dick === 0) {
			r.push(`the strap-on`);
		} else {
			r.push(`your dick`);
		}
		r.push(`into ${his} gelded butt without lubricant and sodomize ${him} as hard as you can without damaging your property.`);
		if (V.PC.vagina !== -1) {
			r.push(`Fortunately for ${him}, this gets you so wet that some of your pussyjuice makes it down onto your shaft and serves as improvised lube.`);
		}
		r.push(`${He}'s such a slut that ${he} shows signs of enjoyment, but you put a stop to that whenever it happens by slapping and flicking ${his} cock. You cum explosively.`);
		r.push(VCheck.Anal(slave, 1));
		assPain = 1;
	} else {
		r.push(`${He}'s got no special physical targets for abuse, so you just rape ${him} hard and fast, raining stinging slaps down on ${him} as you do. ${He} cries and whimpers; you finish.`);
		r.push(VCheck.Both(slave, 1));
	}
	if (slave.assignment !== Job.BODYGUARD) {
		r.push(`This leaves ${him} sobbing on the floor`);
		if (V.PC.dick === 0) {
			r.push(`as you shuck off the strap-on and drop it on ${his} face.`);
		} else {
			r.push(`with cum dripping out of ${him}.`);
		}
	} else if (slave.assignment === Job.BODYGUARD && slave.fetish === "masochist" && slave.fetishKnown === 1 && slave.fetishStrength > 95) {
		r.push(`${He} thanks you rapidly, trying to break away from the pleasure of your reward. ${He} quickly gets back to ${his} feet and stumbles towards the shower, to make sure you won't stay unprotected too long.`);
	} else {
		r.push(`Even though ${he}'s in a somewhat bad shape, ${he} still jumps back to ${his} feet and stumbles towards the shower, to make sure you won't stay unprotected too long.`);
	}

	if (slave.assignment !== Job.BODYGUARD) {
		if (slave.minorInjury === 0) {
			if (assPain === 1) {
				r.push(`The anal rape leaves ${him} with a sore butthole.`);
			} else if (random(1, 100) > 50) {
				slave.minorInjury = either("black eye", "bruise", "split lip");
				r.push(`Your abuse gave ${him} a ${slave.minorInjury}.`);
			}
		}
	}

	if (slave.bellyPreg >= 600000) {
		r.push(`The rough fucking was <span class="health dec">very unhealthy</span> for ${his} massive pregnancy.`);
		healthDamage(slave, 40);
	}

	if (slave.assignment === Job.BODYGUARD) {
		if (slave.muscles <= 5 && slave.skill.combat <= 30) {
			r.push(`Your bodyguard accepts this as a punishment for ${his} uselessness.`);
		} else if (slave.muscles <= 5 && slave.skill.combat > 30) {
			r.push(`Your bodyguard accepts this as a punishment for ${his} lack of muscles`);
		} else if (slave.muscles > 30 && slave.skill.combat <= 30) {
			r.push(`Your bodyguard accepts this as a punishment for ${his} lack of combat skills`);
		} else if (slave.muscles > 5 && slave.skill.combat > 30) {
			r.push(`Your bodyguard just admits it as a part of ${his} body training.`);
		} else if (slave.muscles > 5 && slave.skill.combat <= 30) {
			r.push(`Your bodyguard accepts this as a punishment for ${his} lack of expertise`);
		}
		if (slave.fetish === "masochist" && slave.fetishStrength > 60 && slave.fetishKnown === 1) {
			r.push(`Though ${he} secretly got off on the pain and humiliation.`);
		}
	} else if (slave.fetish === "masochist" && slave.fetishStrength > 60 && slave.fetishKnown === 1) {
		r.push(`${He} secretly got off on the pain and humiliation.`);
	} else if (FutureSocieties.isActive('FSDegradationist')) {
		r.push(`${He} knew that a degradationist arcology wouldn't be easy on ${him}, so even if ${he} resents it, ${he} tries to accept it.`);
	} else if (slave.devotion < -50) {
		r.push(`${His} <span class="mediumorchid">hatred</span> and <span class="gold">fear</span> of you have increased.`);
		slave.devotion-=4;
		slave.trust-=4;
	} else if (slave.devotion < -20) {
		r.push(`${His} <span class="mediumorchid">resistance</span> to and <span class="gold">fear</span> of you have increased.`);
		slave.devotion-=4;
		slave.trust-=4;
	} else if (slave.devotion <= 20) {
		r.push(`${His} <span class="gold">fear</span> of you is tinged with <span class="mediumorchid">hatred.</span>`);
		slave.devotion-=4;
		slave.trust-=4;
	} else if (slave.devotion <= 50) {
		r.push(`${His} <span class="mediumorchid">obedience to you is reduced,</span> and ${he} <span class="gold">fears</span> further abuse.`);
		slave.devotion-=4;
		slave.trust-=4;
	} else {
		r.push(`${He} is so devoted to you that ${he} accepts your abuse as ${his} just due, but ${he} now <span class="gold">fears</span> you more and trusts you less.`);
		slave.trust-=4;
	}

	if (random(1, 100) > (20+slave.devotion+slave.trust)) {
		if (slave.fetish !== "submissive" && slave.fetish !== "masochist" && slave.assignment !== Job.BODYGUARD) {
			const seed = random(1, 8);
			r.push(`Brutal abuse has left ${him}`);
			if (seed === 1 && slave.behavioralFlaw !== "odd") {
				r.push(`<span class="red">acting strangely.</span>`);
				slave.behavioralFlaw = "odd";
			} else if (seed === 2 && slave.behavioralFlaw !== "anorexic") {
				r.push(`<span class="red">starving ${himself}</span> in a crippling attempt to be pretty.`);
				slave.behavioralFlaw = "anorexic";
			} else if (seed === 3 && slave.behavioralFlaw !== "gluttonous") {
				r.push(`<span class="red">stress eating</span> whenever ${he} can.`);
				slave.behavioralFlaw = "gluttonous";
			} else if (seed === 4 && slave.behavioralFlaw !== "devout") {
				r.push(`<span class="red">praying in private</span> whenever ${he} can.`);
				slave.behavioralFlaw = "devout";
			} else if (seed === 5 && slave.sexualFlaw !== "apathetic") {
				r.push(`<span class="red">sexually apathetic,</span> since ${he} feels it cannot go well for ${him}.`);
				slave.sexualFlaw = "apathetic";
			} else if (seed === 6 && slave.sexualFlaw !== "crude") {
				r.push(`<span class="red">sexually crude,</span> out of an unconscious belief that sex is ugly and unworthy of effort.`);
				slave.sexualFlaw = "crude";
			} else if (seed === 7 && slave.sexualFlaw !== "judgemental") {
				r.push(`<span class="red">sexually judgemental,</span> out of an unconscious desire to disqualify people from being good enough to have sex with ${him}.`);
				slave.sexualFlaw = "judgemental";
			} else if (V.PC.dick !== 0) {
				r.push(`<span class="red">hating men,</span> since you forced your cock on ${him}.`);
				slave.behavioralFlaw = "hates men";
			} else {
				r.push(`<span class="red">hating women,</span> since you forced your cunt on ${him}.`);
				slave.behavioralFlaw = "hates women";
			}
		}
	}
	if (random(1, 100) > (50+slave.devotion+slave.trust) && slave.assignment !== Job.BODYGUARD) {
		if (slave.fetish !== Fetish.MINDBROKEN && slave.fetishKnown === 0 && !smartPiercingReinforcesFetish(slave)) {
			r.push(`${His} acceptance of your abuse has twisted ${his}`);
			if (random(1, 2) === 1 && slave.fetish !== "submissive") {
				r.push(`<span class="lightcoral">sexuality towards submissiveness.</span>`);
				slave.fetish = "submissive";
				slave.fetishKnown = 1;
			} else if (slave.fetish !== "masochist") {
				r.push(`<span class="lightcoral">sexuality towards masochism.</span>`);
				slave.fetish = "masochist";
				slave.fetishKnown = 1;
			}
		}
	}
	if (slave.fetish === Fetish.MINDBROKEN && slave.relationship === -3) {
		if (slave.kindness) {
			slave.kindness = 0;
		}
	}
	App.Events.addParagraph(node, r);
	return node;
};
