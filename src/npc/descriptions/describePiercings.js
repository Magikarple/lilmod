/**
 * @param {App.Entity.SlaveState} slave
 * @param {string} surface
 * @returns {string|undefined} Relevant slave piercing, if present
 */
App.Desc.piercing = function(slave, surface) {
	"use strict";
	let r = [];
	const {
		he, him, his, himself, girl, He, His
	} = getPronouns(slave);
	if (V.showBodyMods !== 1) {
		return undefined;
	} else if (slave.piercing[surface] && slave.piercing[surface].weight > 0 && slave.piercing[surface].desc) {
		return `${pronounsForSlaveProp(slave, slave.piercing[surface].desc)}.`;
	}
	switch (surface) {
		case "ear": {
			if (slave.piercing.ear.weight > 0) {
				const clothing = App.Data.clothes.get(slave.clothes);
				if (slave.piercing.ear.weight === 1) {
					r.push(`${His} earlobes are conventionally pierced.`);
				} else {
					r.push(`${His} ears are heavily pierced, with multiple lobe piercings and a row of helix piercings.`);
				}
				if (slave.assignment === Job.MILKED || slave.assignment === Job.DAIRY) {
					r.push(`${He} has a plastic livestock tag in one ear to help identify ${him} for milking.`);
				} else if (clothing && clothing.desc && "earPiercing" in clothing.desc) {
					r.push(clothing.desc.earPiercing(slave));
				} else {
					switch (slave.clothes) {
						case "attractive lingerie":
						case "attractive lingerie for a pregnant woman":
							r.push(`${He}'s wearing pretty, womanly earrings.`);
							break;
						case "a bra":
						case "a button-up shirt":
						case "a button-up shirt and panties":
						case "a sweater":
						case "a sweater and panties":
						case "a t-shirt":
						case "a t-shirt and jeans":
						case "a t-shirt and thong":
						case "a tank-top":
						case "a tank-top and panties":
						case "a thong":
						case "a tube top and thong":
						case "an oversized t-shirt":
						case "an oversized t-shirt and boyshorts":
						case "boyshorts":
						case "cutoffs":
						case "panties":
							r.push(`${He}'s wearing plain but pretty earrings.`);
							break;
						case "a nice pony outfit":
						case "a slutty pony outfit":
							r.push(`${He}'s wearing horseshoe-shaped earrings.`);
							break;
						case "leather pants and pasties":
						case "leather pants":
						case "leather pants and a tube top":
						case "a tube top":
							r.push(`${He}'s wearing large hoop earrings.`);
							break;
						case "a gothic lolita dress":
							r.push(`${He}'s wearing black earrings.`);
							break;
						case "a sports bra":
						case "a one-piece swimsuit":
						case "sport shorts and a t-shirt":
						case "sport shorts and a sports bra":
						case "sport shorts":
							r.push(`${He}'s wearing cute, simple earrings.`);
							break;
						case "a skimpy loincloth":
							r.push(`${He}'s wearing a pair of bone earrings.`);
							break;
						case "a police uniform":
							r.push(`${He}'s wearing nightstick-shaped earrings.`);
							break;
						case "a succubus outfit":
							r.push(`${He}'s wearing pentagram earrings.`);
							break;
						case "a fallen nuns habit":
						case "a penitent nuns habit":
							r.push(`${His} earrings mimic tiny crowns of thorns.`);
							break;
						case "a chattel habit":
							r.push(`${He}'s wearing golden earrings in the shape of saintly nudes.`);
							break;
						case "a hijab and abaya":
						case "a niqab and abaya":
							r.push(`${He}'s wearing bronze earrings shaped like crescent moons.`);
							break;
						case "a klan robe":
						case "a slutty klan robe":
							r.push(`${He}'s wearing bronze earrings shaped like crucifixes.`);
							break;
						case "a long qipao":
						case "a slutty qipao":
							r.push(`${His} golden earrings resemble Eastern-style dragons.`);
							break;
						case "a string bikini":
						case "cutoffs and a t-shirt":
						case "a t-shirt and panties":
						case "panties and pasties":
						case "pasties":
						case "jeans":
						case "a sweater and cutoffs":
							r.push(`${He}'s wearing girly earrings.`);
							break;
						case "a schoolgirl outfit":
							r.push(`${He}'s wearing small girlish earrings.`);
							break;
						case "striped panties":
						case "a striped bra":
						case "striped underwear":
							r.push(`${He}'s wearing big girlish earrings.`);
							break;
						case "a burkini":
						case "a monokini":
							r.push(`${He}'s wearing unobtrusive little stud earrings.`);
							break;
						case "a Santa dress":
							r.push(`${His} earrings resemble little green pine trees.`);
							break;
						case "a mini dress":
						case "an apron":
						case "a hanbok":
							r.push(`${He}'s wearing shiny pearl earrings.`);
							break;
						case "a hijab and blouse":
						case "conservative clothing":
							r.push(`${He}'s wearing small unobtrusive hoop earrings.`);
							break;
						case "a cybersuit":
						case "a tight Imperial bodysuit":
						case "a scalemail bikini":
							r.push(`${He}'s wearing sharp and brutal-looking earrings.`);
							break;
						case "a kimono":
							r.push(`${He}'s wearing gorgeous enameled earrings made to look like tiny koi.`);
							break;
						case "a burqa":
							r.push(`${He}'s wearing cheap metal earrings with fake gems.`);
							break;
						case "a halter top dress":
						case "a ball gown":
						case "a maternity dress":
						case "an evening dress":
							r.push(`${He}'s wearing lovely diamond earrings; the stones are cut in an alluring, feminine style.`);
							break;
						case "slutty business attire":
							r.push(`${He}'s wearing lovely diamond earrings; the stones are cut in a gaudy, nouveau riche style.`);
							break;
						case "nice business attire":
							r.push(`${He}'s wearing lovely diamond earrings; the stones are cut in an assertive, unsubtle style.`);
							break;
						case "a slutty maid outfit":
							r.push(`${He}'s wearing big hoop earrings inappropriate for a real maid.`);
							break;
						case "a nice maid outfit":
							r.push(`${He}'s wearing conservative earrings like those a free maid could afford.`);
							break;
						case "harem gauze":
							r.push(`${He}'s wearing broad gold earrings in faux-Arabian style.`);
							break;
						case "overalls":
						case "Western clothing":
							r.push(`${He}'s wearing earrings in the shape of a sheriff's star.`);
							break;
						case "a huipil":
							r.push(`${He}'s wearing earrings in the shape of a stylized jaguar's head.`);
							break;
						case "a bunny outfit":
							r.push(`${He}'s wearing earrings in the shape of a stylized rabbit's head.`);
							break;
						case "kitty lingerie":
							r.push(`${He}'s wearing earrings in the shape of a stylized cat's head.`);
							break;
						case "a bimbo outfit":
							r.push(`${He}'s wearing large, heart-shaped earrings.`);
							break;
						case "a courtesan dress":
							r.push(`${He}'s wearing hanging earrings that accentuate each movement of ${his} head.`);
							break;
						case "a confederate army uniform":
							r.push(`${He}'s wearing a little, unobtrusive stud earring in the shape of a Fleur-de-lis.`);
							break;
						case "slutty jewelry":
							r.push(`${He}'s wearing gold earrings in the shape of a pair of`);
							if (slave.dick > 0 && slave.balls === 0) {
								r.push(`limp dicks.`);
							} else if (slave.dick > 0) {
								r.push(`erect cocks.`);
							} else if (slave.skill.oral >= 100) {
								r.push(`tongues.`);
							} else if (slave.boobs > 1000) {
								r.push(`heavy breasts.`);
							} else {
								r.push(`female bottoms.`);
							}
							break;
					}
				}
			}
			break;
		}
		case "nose": {
			if (slave.piercing.nose.weight === 1) {
				r.push(`${He} has simple studs in ${his} nose.`);
			} else if (slave.piercing.nose.weight === 2) {
				r.push(`${He} has nasal studs and a large septum ring.`);
				if (slave.clothes === "slutty jewelry" && slave.piercing.ear.weight > 0) {
					r.push(`${His} bangles include a light chain from ${his} nose ring to ${his} ear piercings on one side.`);
				}
			}
			break;
		}
		case "eyebrow": {
			if (slave.piercing.eyebrow.weight === 1) {
				r.push(`${He} has a simple stud in one eyebrow.`);
			} else if (slave.piercing.eyebrow.weight === 2) {
				r.push(`${He} has multiple eyebrow rings.`);
			}
			break;
		}
		case "lips": {
			if (slave.piercing.lips.weight === 1) {
				r.push(`${He} has a simple lip piercing.`);
			} else if (slave.piercing.lips.weight === 2) {
				r.push(`${His} lips are heavily pierced.`);
			}
			break;
		}
		case "tongue": {
			if (slave.piercing.tongue.weight === 1) {
				r.push(`${His} tongue bears a single stud, so oral sex with ${him} is a bit more fun.`);
			} else if (slave.piercing.tongue.weight === 2) {
				r.push(`${His} tongue bears a row of studs, offering thorough stimulation to anyone ${he} blows.`);
			}
			if (slave.piercing.tongue.weight && SlaveStatsChecker.checkForLisp(slave)) {
				r.push(`The piercings make ${his} lisp more pronounced.`);
			}
			break;
		}
		case "nipple": {
			if (slave.piercing.nipple.weight > 0) {
				if (slave.fuckdoll > 0) {
					r.push(`${His} nipple piercings help secure the suit material to ${his} breasts.`);
				} else {
					if (slave.piercing.nipple.weight === 1) {
						r.push(`${His} ${nippleColor(slave)} nipples have a simple piercing, which keeps them a little harder than they would normally be.`);
					} else if (slave.piercing.nipple.weight === 2) {
						r.push(`${His} ${nippleColor(slave)} nipples are heavily pierced with several rings and studs, and there is a chain between them.`);
						if (slave.boobShape === "saggy" && slave.boobs > 2500) {
							r.push(`It's been shortened to take advantage of the way ${his} tits sag, and holds ${his} ${nippleColor(slave)} nipples almost together, producing cleavage that runs from ${his} ${nippleColor(slave)} nipples all the way up to ${his} sternum.`);
						} else {
							r.push(`The constant tugging keeps ${his} ${nippleColor(slave)} nipples erect.`);
						}
					}
					switch (slave.clothes) {
						case "kitty lingerie":
							r.push(`The piercings slightly distort the shape of ${his} lacy bra's cleavage window.`);
							break;
						case "attractive lingerie":
							r.push(`The piercings are a girly color, to complement ${his} lingerie.`);
							break;
						case "a succubus outfit":
							r.push(`The piercings are severe steel, as befits a sex demon.`);
							break;
						case "uncomfortable straps":
							r.push(`Each nipple bears a horizontal bar that is held forward of the steel ring that's part of ${his} outfit, constantly tugging them outward.`);
							break;
						case "restrictive latex":
							r.push(`The piercings are tantalizingly visible under the latex.`);
							break;
						case "a fallen nuns habit":
							r.push(`A tiny ebon cross on a short chain dangles from each piercing.`);
							break;
						case "a chattel habit":
							r.push(`A tiny golden cock and balls dangles from each piercing.`);
							break;
						case "a monokini":
							r.push(`Due to ${his} toplessness, the piercings are plainly visible.`);
							break;
						case "a cybersuit":
							r.push(`The piercings are tantalizingly visible under the bodysuit.`);
							break;
						case "a string bikini":
							r.push(`The piercings are a pastel color, to complement ${his} bikini.`);
							break;
						case "striped panties":
							r.push(`The piercings are a pastel color, to complement ${his} panties.`);
							break;
						case "a scalemail bikini":
							r.push(`The piercings are severe steel, as befits a hardened warrior.`);
							break;
						case "a schoolgirl outfit":
							if (slave.boobs <= 2000) {
								r.push(`The piercings are tantalizingly visible under the thin material.`);
							}
							break;
						case "battledress":
							r.push(`The piercings are tantalizingly visible under ${his} tank top.`);
							break;
						case "nice business attire":
							r.push(`One side of each piercing peeks over the edge of ${his} blouse.`);
							break;
						case "a comfortable bodysuit":
							r.push(`The piercings are tantalizingly visible under the tight bodysuit.`);
							break;
						case "a latex catsuit":
							r.push(`The piercings are tantalizingly visible under the tight latex catsuit.`);
							break;
						case "a mini dress":
							r.push(`The piercings are tantalizingly visible under the tight mini dress.`);
							break;
						case "a courtesan dress":
							r.push(`The piercings are tantalizingly visible through ${his} thin dress.`);
							break;
						case "a bimbo outfit":
							r.push(`They can't be seen, but one can clearly feel the piercings are in the shape of hearts.`);
							break;
						case "a slutty maid outfit":
							r.push(`One side of each piercing peeks over the edge of ${his} lacy top.`);
							break;
						case "harem gauze":
							r.push(`The piercings are tantalizingly visible under the gauze.`);
							break;
						case "attractive lingerie for a pregnant woman":
							r.push(`The piercings are tantalizingly visible under the thin silk.`);
							break;
						case "a maternity dress":
							r.push(`The piercings are tantalizingly visible under the dress's tight top.`);
							break;
						case "stretch pants and a crop-top":
							r.push(`The piercings are tantalizingly visible under ${his} crop-top.`);
							break;
					}
				}
			}

			break;
		}
		case "areola": {
			r.push(App.Desc.areolaPiercing(slave));
			break;
		}
		case "navel": {
			if (slave.fuckdoll === 0) {
				if (App.Data.misc.fakeBellies.includes(slave.bellyAccessory)) {
					if (slave.piercing.navel.weight === 1) {
						r.push(`${His} fake navel bears a simple stud.`);
					} else if (slave.piercing.navel.weight === 2) {
						r.push(`${His} fake navel is pierced with a big ring.`);
						if (slave.clothes === "slutty jewelry") {
							r.push(`It has a length of gilded chain dangling from it.`);
						} else {
							r.push(`It has a short length of chain dangling from it.`);
						}
					}
				} else {
					if (slave.piercing.navel.weight === 1) {
						r.push(`${His} navel bears a simple stud.`);
					} else if (slave.piercing.navel.weight === 2) {
						r.push(`${His} navel is pierced with a big ring.`);
						if (slave.clothes === "slutty jewelry") {
							r.push(`It has a length of gilded chain dangling from it.`);
						} else {
							r.push(`It has a short length of chain dangling from it.`);
						}
					}
				}
			} else {
				if (slave.piercing.navel.weight > 0) {
					if (slave.belly >= 10000) {
						if (slave.piercing.navel.weight === 1) {
							r.push(`${His} popped navel bears a simple stud.`);
						} else if (slave.piercing.navel.weight === 2) {
							r.push(`${His} popped navel is pierced with a big ring.`);
						}
						r.push(`It's eye-catching, since most of ${his} piercings are hidden by the suit.`);
					} else {
						r.push(`${His} navel piercing runs through the suit's material.`);
					}
				}
			}
			break;
		}
		case "clit":
		case "genitals": {
			if (slave.dick > 0) {
				if (slave.piercing.genitals.weight === 1) {
					r.push(`${He} has a simple dickhead stud.`);
				} else if (slave.piercing.genitals.weight === 2) {
					r.push(`${He} has a big ring in ${his} dickhead.`);
					if (slave.clothes === "slutty jewelry") {
						r.push(`Since ${he}'s wearing slutty bangles ${he} has a short length of light chain dangling from ${his} dickhead piercing; as ${he} moves it tugs lightly at ${his} cock.`);
					}
				}
			} else if (slave.vagina === -1) { // God help us, nulls.
				if (slave.piercing.genitals.weight === 1) {
					r.push(`${He} has a simple stud in the smooth ${slave.skin} skin above ${his} urethra.`);
				} else if (slave.piercing.genitals.weight === 2) {
					r.push(`${He} has a big ring in the smooth ${slave.skin} skin above ${his} urethra.`);
					if (slave.clothes === "slutty jewelry") {
						r.push(`Since ${he}'s wearing slutty bangles ${he} has a short length of light chain dangling from the ring; it constantly stimulates what remains of ${his} sexual nerves.`);
					}
				}
			} else {
				if (slave.piercing.genitals.weight === 1) {
					r.push(`${He} has a simple clitoral stud.`);
				} else if (slave.piercing.genitals.weight === 2) {
					r.push(`${He} has a big ring in ${his} clit.`);
					if (slave.clothes === "slutty jewelry") {
						r.push(`Since ${he}'s wearing slutty bangles ${he} has a short length of light chain dangling from ${his} clit ring; it constantly stimulates ${his} pussylips.`);
					}
				}
			}

			if (slave.piercing.genitals.smart) {
				r.push(`It is upgraded with smart vibe technology.`);
			}

			if (slave.fuckdoll > 0) {
				r.push(`It anchors the suit's material.`);
			}
			break;
		}
		case "vagina": {
			if (slave.piercing.vagina.weight > 0) {
				r.push(`${He} has a`);
				if (slave.piercing.vagina.weight === 1) {
					r.push(`simple row of studs`);
				} else {
					r.push(`row of big rings`);
				}
				r.push(`down ${his}`);
				if (slave.fuckdoll > 0) {
					r.push(`labia, which are looped into the edge of the suit's material as it stops around ${his} vulva.`);
				} else {
					r.push(`labia.`);
				}
			}
			break;
		}
		case "dick": {
			if (slave.piercing.dick.weight === 1) {
				r.push(`${He} has a row of studs down ${his} shaft.`);
			} else if (slave.piercing.dick.weight === 2) {
				r.push(`${He} has a row of heavy rings down ${his} shaft.`);
			}
			if (slave.scrotum !== 0) {
				if (slave.piercing.dick.weight === 1) {
					r.push(`${He} has a couple of studs in ${his} ballsack.`);
				} else if (slave.piercing.dick.weight === 2) {
					r.push(`${He} has a row of rings down the center of ${his} ballsack, all the way from the base of ${his} shaft to ${his} perineum.`);
				}
			} else {
				if (slave.piercing.dick.weight === 1) {
					r.push(`${He} has a couple of studs beneath the base of ${his} dick.`);
				} else if (slave.piercing.dick.weight === 2) {
					r.push(`${He} has a row of rings all the way from the base of ${his} shaft to ${his} perineum.`);
				}
			}
			if (slave.fuckdoll > 0) {
				if (slave.piercing.dick.weight > 0) {
					r.push(`Every one of them runs through the suit's material, securing it to the Fuckdoll's member.`);
				}
			}
			break;
		}
		case "anus": {
			if (slave.vagina > -1) {
				if (slave.piercing.anus.weight === 1) {
					r.push(`${He} has a simple piercing between ${his} pussy and ${his}`);
					if (slave.fuckdoll > 0) {
						r.push(`asshole which helps keep the strip of material`);
						if (slave.vagina > -1) {
							r.push(`between ${his} holes`);
						} else {
							r.push(`below ${his} rear hole`);
						}
						r.push(`in place.`);
					} else {
						r.push(`asshole.`);
					}
				} else if (slave.piercing.anus.weight === 2) {
					r.push(`${He} has a big ring between ${his} pussy and ${his} asshole,`);
					if (slave.fuckdoll > 0) {
						r.push(`which helps keep the strip of material`);
						if (slave.vagina > -1) {
							r.push(`between ${his} holes`);
						} else {
							r.push(`below ${his} rear hole`);
						}
						r.push(`in place,`);
					}
					r.push(`and studs all around ${his} anus.`);
				}
			} else {
				if (slave.piercing.anus.weight === 1) {
					r.push(`${He} has a simple perianal piercing between the base of ${his} dick and ${his} girly`);
					if (slave.fuckdoll > 0) {
						r.push(`butthole which helps keep the strip of material`);
						if (slave.vagina > -1) {
							r.push(`between ${his} holes`);
						} else {
							r.push(`below ${his} rear hole`);
						}
						r.push(`in place.`);
					} else {
						r.push(`butthole.`);
					}
				} else if (slave.piercing.anus.weight === 2) {
					r.push(`${He} has a big ring between the base of ${his} dick and ${his} girly butthole, which has studs all around it.`);
				}
			}
			break;
		}
		case "corset": { // non anatomical
			if (slave.piercing.corset.weight > 0) {
				if (slave.fuckdoll === 0) {
					r.push(`${He} has a corset piercing, a ladder of steel rings running up each side of ${his} back:`);
					if (slave.bellyAccessory === "a corset" || slave.bellyAccessory === "an extreme corset") {
						r.push(`these are looped through special lugs in the back of ${his} actual corset, making it almost a part of ${his} body.`);
						if (slave.devotion > 50) {
							r.push(`${He} couldn't remove it, even if ${he} wanted to.`);
						} else if (slave.devotion >= -20) {
							r.push(`${He} couldn't remove it, even if ${he} were inclined to try.`);
						} else {
							r.push(`Any attempt to remove it will cause intense pain.`);
						}
					} else {
						const clothing = App.Data.clothes.get(slave.clothes);
						if (clothing && clothing.desc && "corsetPiercing" in clothing.desc) {
							r.push(clothing.desc.corsetPiercing(slave));
						} else {
							switch (slave.clothes) {
								case "a hijab and blouse":
								case "a schoolgirl outfit":
								case "conservative clothing":
								case "nice business attire":
								case "slutty business attire":
									r.push(`${his} blouse hides them completely, but they're laced tightly, so ${he}'s aware they're there.`);
									break;
								case "chains":
									r.push(`they're laced together with steel cable, tightly enough that they're tugging at ${his} skin.`);
									break;
								case "Western clothing":
									r.push(`${his} shirt hides them completely, but they're laced tightly, so ${he}'s aware they're there.`);
									break;
								case "a toga":
									r.push(`${his} toga hides them completely, but they're laced tightly, so ${he}'s aware they're there.`);
									break;
								case "a huipil":
									r.push(`${his} huipil hides them partially, so the leather straps that pull on ${his} skin are clearly evident.`);
									break;
								case "a long qipao":
								case "a slutty qipao":
									r.push(`${his} qipao hides them completely, but they're laced tightly with silk cord, so ${he}'s aware they're there.`);
									break;
								case "uncomfortable straps":
									r.push(`they're laced together with a leather cord, tightly enough that they're tugging at ${his} skin.`);
									break;
								case "shibari ropes":
									r.push(`they're laced together as part of ${his} bindings.`);
									break;
								case "a latex catsuit":
								case "restrictive latex":
									r.push(`these are clipped into the latex covering them, making it almost a part of ${his} body.`);
									if (slave.devotion > 50) {
										r.push(`${He} couldn't remove it, even if ${he} wanted to.`);
									} else if (slave.devotion >= -20) {
										r.push(`${He} couldn't remove it, even if ${he} were inclined to try.`);
									} else {
										r.push(`Any attempt to remove it will cause intense pain.`);
									}
									break;
								case "a military uniform":
								case "a schutzstaffel uniform":
								case "a slutty schutzstaffel uniform":
								case "lederhosen":
								case "a red army uniform":
								case "a mounty outfit":
								case "a confederate army uniform":
									r.push(`${his} tunic hides them completely, but they're laced tightly, so ${he}'s aware they're there.`);
									break;
								case "battlearmor":
									r.push(`${his} armor hides them completely, but they're laced tightly, so ${he}'s aware they're there.`);
									break;
								case "Imperial Plate":
									r.push(`${his} ultra-heavy armor hides them completely, but they're laced tightly, so ${he}'s aware they're there.`);
									break;
								case "a dirndl":
									r.push(`${his} dress hides them completely, but they're laced tightly, so ${he}'s aware they're there.`);
									break;
								case "a biyelgee costume":
									r.push(`${his} dress hides them completely, but they're laced tightly, so ${he}'s aware they're there.`);
									break;
								case "a nice nurse outfit":
									r.push(`${his} scrubs hide them completely, but they're laced tightly, so ${he}'s aware they're there.`);
									break;
								case "a mini dress":
									r.push(`these are clipped into the mini dress covering them, making it almost a part of ${his} body.`);
									if (slave.devotion > 50) {
										r.push(`${He} couldn't remove it, even if ${he} wanted to.`);
									} else if (slave.devotion >= -20) {
										r.push(`${He} couldn't remove it, even if ${he} were inclined to try.`);
									} else {
										r.push(`Any attempt to remove it will cause intense pain.`);
									}
									break;
								case "attractive lingerie":
								case "attractive lingerie for a pregnant woman":
								case "kitty lingerie":
									r.push(`they're laced together with a lacy ribbon finished off with a bow.`);
									break;
								case "a succubus outfit":
									r.push(`they're laced into ${his} succubus corset, making it a part of ${him}.`);
									break;
								case "a fallen nuns habit":
									r.push(`they're laced together with cord, tightly enough that ${he} is forced to arch ${his} back or suffer. ${He} spends most of ${his} time involuntarily presenting ${his} bottom to relieve the tugging.`);
									break;
								case "a chattel habit":
									r.push(`${his} white habit hides them completely, but they're laced tightly, so ${he}'s aware they're there.`);
									break;
								case "a penitent nuns habit":
									r.push(`${his} habit hides them completely, but they're laced tightly, so ${he}'s aware they're there.`);
									break;
								case "a gothic lolita dress":
								case "a hanbok":
								case "a Santa dress":
									r.push(`${his} dress hides them completely, but they're laced tightly, so ${he}'s aware they're there.`);
									break;
								case "a burkini":
								case "a one-piece swimsuit":
									r.push(`${his} swimsuit hides them completely, but they're laced tightly, so ${he}'s aware they're there.`);
									break;
								case "a monokini":
									r.push(`the straps of ${his} swimsuit run on each side of these loops.`);
									break;
								case "an apron":
									r.push(`the straps of ${his} apron run on each side of these loops.`);
									break;
								case "overalls":
									r.push(`the straps of ${his} overalls run on each side of these loops.`);
									break;
								case "a bra":
								case "a skimpy loincloth":
								case "a striped bra":
								case "a thong":
								case "boyshorts":
								case "cutoffs":
								case "jeans":
								case "leather pants":
								case "leather pants and pasties":
								case "panties":
								case "panties and pasties":
								case "pasties":
								case "sport shorts":
								case "striped panties":
								case "striped underwear":
									r.push(`the piercings are plainly visible on ${his} bare back.`);
									break;
								case "a slutty klan robe":
								case "a slutty pony outfit":
								case "a sports bra":
								case "a tank-top and panties":
								case "a tube top":
								case "a tube top and thong":
								case "leather pants and a tube top":
								case "an evening dress":
									r.push(`the piercings are only partly visible on ${his} back.`);
									break;
								case "a button-up shirt":
								case "a button-up shirt and panties":
								case "a police uniform":
								case "a t-shirt and jeans":
								case "a t-shirt and panties":
								case "a t-shirt and thong":
								case "a t-shirt":
								case "a tank-top":
								case "an oversized t-shirt and boyshorts":
								case "an oversized t-shirt":
								case "sport shorts and a sports bra":
								case "sport shorts and a t-shirt":
									r.push(`${his} shirt hides them completely, but they're laced tightly, so ${he}'s aware they're there.`);
									break;
								case "a sweater":
								case "a sweater and cutoffs":
								case "a sweater and panties":
									r.push(`${his} sweater hides them completely, but they're laced tightly, so ${he}'s aware they're there.`);
									break;
								case "a nice pony outfit":
									r.push(`${his} outfit hides them completely, but they're laced tightly, so ${he}'s aware they're there.`);
									break;
								case "a string bikini":
									r.push(`the back of ${his} string top loops into them and runs down through them to become ${his} bottom, such as it is.`);
									break;
								case "a scalemail bikini":
									r.push(`they're laced together with a steel chain.`);
									break;
								case "a cheerleader outfit":
									r.push(`they're laced together with a simple ribbon, but the effect makes it clear that this is one kinky cheerleader.`);
									break;
								case "clubslut netting":
									r.push(`these are clipped into the netting covering them, making it almost a part of ${his} body.`);
									if (slave.devotion > 50) {
										r.push(`${He} couldn't remove it, even if ${he} wanted to.`);
									} else if (slave.devotion >= -20) {
										r.push(`${He} couldn't remove it, even if ${he} were inclined to try.`);
									} else {
										r.push(`Any attempt to remove it will cause intense pain.`);
									}
									break;
								case "cutoffs and a t-shirt":
									r.push(`they're laced together with a simple ribbon, but the effect makes it clear that this is one kinky ${girl}.`);
									break;
								case "a slutty outfit":
									r.push(`they're laced together with a simple ribbon, tightly enough that ${he}'s aware they're there.`);
									break;
								case "a comfortable bodysuit":
									r.push(`these are clipped into the bodysuit covering them, making it almost a part of ${his} body.`);
									if (slave.devotion > 50) {
										r.push(`${He} couldn't remove it, even if ${he} wanted to.`);
									} else if (slave.devotion >= -20) {
										r.push(`${He} couldn't remove it, even if ${he} were inclined to try.`);
									} else {
										r.push(`Any attempt to remove it will cause intense pain.`);
									}
									break;
								case "a leotard":
									r.push(`these are clipped into the leotard covering them, making it almost a part of ${his} body.`);
									if (slave.devotion > 50) {
										r.push(`${He} couldn't remove it, even if ${he} wanted to.`);
									} else if (slave.devotion >= -20) {
										r.push(`${He} couldn't remove it, even if ${he} were inclined to try.`);
									} else {
										r.push(`Any attempt to remove it will cause intense pain.`);
									}
									break;
								case "a bunny outfit":
									r.push(`${his} teddy hides them completely, but they're laced tightly, so ${he}'s aware they're there.`);
									break;
								case "a slutty maid outfit":
									r.push(`${his} dress has an open back to reveal them and the black ribbon that laces them tightly together.`);
									break;
								case "a nice maid outfit":
									r.push(`${his} dress hides them completely, but they're laced tightly, so ${he}'s aware they're there.`);
									break;
								case "a slutty nurse outfit":
									r.push(`${his} jacket hides them completely, but they're laced tightly, so ${he}'s aware they're there.`);
									break;
								case "a kimono":
									r.push(`${his} kimono hides them completely, but they're laced tightly, so ${he}'s aware they're there.`);
									break;
								case "a hijab and abaya":
								case "a niqab and abaya":
									r.push(`${his} abaya hides them completely, but they're laced tightly, so ${he}'s aware they're there.`);
									break;
								case "a klan robe":
									r.push(`${his} robe hides them completely, but they're laced tightly, so ${he}'s aware they're there.`);
									break;
								case "a burqa":
									r.push(`${his} burqa hides them completely, but they're laced tightly, so ${he}'s aware they're there.`);
									break;
								case "battledress":
									r.push(`they're laced together with paracord.`);
									break;
								case "harem gauze":
									r.push(`they're laced up with a light golden chain that glints through ${his} filmy clothing.`);
									break;
								case "slutty jewelry":
									r.push(`they're laced up with a light golden chain that begins and ends in other parts of ${his} glinting bonds.`);
									break;
								case "a courtesan dress":
									r.push(`they're laced into ${his} dress's corset, binding the material even closer to ${him}.`);
									break;
								case "a bimbo outfit":
									r.push(`they're laced together with a bright pink ribbon.`);
									break;
								default:
									r.push(`they're laced up with a ribbon, tightly enough to keep ${him} aware they're there.`);
							}
						}
					}
				}
			}
			break;
		}
		case "chastity": { // non anatomical
			if (slave.piercing.genitals.weight > 0 &&
				slave.piercing.nipple.weight > 0 &&
				!(slave.chastityPenis) &&
				slave.dick > 4 &&
				slave.boobs > 1000 &&
				canAchieveErection(slave) &&
				slave.balls > 0 &&
				slave.devotion > 20 &&
				slave.energy > 90) {
				r.push(`${His} very special body allows ${him} to wear an incredibly lewd piece of jewelry: a thin golden chain that runs from nipple to nipple, through ${his} pierced cockhead. The chain is short, and any motion at all tugs at ${his} nipples and penis.`);
				if (canWalk(slave) || (canMove(slave) && slave.rules.mobility === "permissive" && hasBothLegs(slave))) {
					r.push(`The stimulation is almost unbearable, and the mere act of walking sometimes causes ${him} to cum.`);
				} else if (canMove(slave)) {
					r.push(`The stimulation is almost unbearable, as any effort to move ${himself} starts building up an orgasm.`);
				}
			}
			break;
		}
	}
	return r.join(" ");
};
