/**
 * @param {App.Entity.SlaveState} slave
 * @param {DescType} [descType=DescType.NORMAL]
 * @returns {string}
 */
App.Desc.buttplug = function(slave, descType = DescType.NORMAL) {
	const r = [];
	const {
		he, him, his, He, His
	} = getPronouns(slave);
	if (slave.assignment === Job.DAIRY && V.dairyRestraintsSetting > 1) {
		r.push(`${slave.slaveName}'s anus is`);
		if (V.dairyStimulatorsSetting > 1) {
			r.push(`filled by an enormous dildo`);
			if (slave.balls > 0) {
				r.push(`which is sodomizing ${him} vigorously to force ejaculation.`);
			} else {
				r.push(`which is filling ${his} rectum with curative fluids.`);
			}
		} else {
			r.push(`being penetrated by ${his} milking machine for curative delivery.`);
		}
	} else {
		if (V.showClothing === 1 && descType !== DescType.MARKET) {
			const clothing = App.Data.clothes.get(slave.clothes);
			if (clothing && clothing.desc && "buttplug" in clothing.desc) {
				r.push(clothing.desc.buttplug(slave));
			} else {
				switch (slave.clothes) {
					case "a Fuckdoll suit":
						r.push(`The suit has a wide opening for its rear hole, leaving the anus bare and unprotected.`);
						break;
					case "chains":
						if (slave.chastityAnus) {
							r.push(`${His} anal chastity belt is completely visible and a chain runs down around it.`);
						} else {
							r.push(`Another chain runs down ${his}`);
							if (slave.anus > 2) {
								r.push(`asscrack; ${his} asshole is so huge that it occasionally threatens to swallow one of the links.`);
							} else {
								r.push(`asscrack.`);
							}
						}
						break;
					case "Western clothing":
						if (slave.chastityAnus) {
							r.push(`${His} anal chastity belt is completely visible from the rear.`);
						} else {
							r.push(`With ${his} ass bare,`);
							if (slave.anus > 2) {
								r.push(`${his} huge asshole is very visible from the rear.`);
							} else if (slave.anus > 1) {
								r.push(`${his} roomy asshole is very visible from the rear.`);
							} else {
								r.push(`there is an occasional glimpse of ${his} asshole.`);
							}
						}
						break;
					case "body oil":
						if (slave.chastityAnus) {
							r.push(`${His} anal chastity belt is visible from the rear.`);
						} else {
							r.push(`With ${his} butt bare,`);
							if (slave.anus > 2) {
								r.push(`${his} huge, well-oiled asshole is very visible from the rear.`);
							} else if (slave.anus > 1) {
								r.push(`${his} roomy, well-oiled asshole is very visible from the rear.`);
							} else {
								r.push(`there is an occasional glimpse of ${his} well-oiled asshole.`);
							}
						}
						break;
					case "attractive lingerie for a pregnant woman":
						if (slave.chastityAnus) {
							r.push(`${His} anal chastity belt is quite visible under ${his} silken panties.`);
						} else {
							r.push(`${His}`);
							if (slave.anus > 3) {
								r.push(`gaping asshole can easily be discerned though ${his} panties.`);
							} else {
								r.push(`panties completely hide ${his} asshole.`);
							}
						}
						break;
					case "kitty lingerie":
						if (slave.chastityAnus) {
							r.push(`${His} anal chastity belt is quite visible under ${his} silken panties.`);
						} else {
							r.push(`${His} silken panties cover ${his}`);
							if (slave.anus > 3) {
								r.push(`gaping asshole.`);
							} else {
								r.push(`asshole.`);
							}
						}
						break;
					case "a maternity dress":
						if (slave.chastityAnus) {
							r.push(`${His} maternity dress hides ${his} anal chastity accessory underneath.`);
						} else {
							r.push(`Though ${his} dress covers ${his} rear, ${his} asshole is bare beneath it.`);
						}
						break;
					case "stretch pants and a crop-top":
						if (slave.chastityAnus) {
							r.push(`${His} tight, form-fitting pants highlight the chastity device hidden beneath them.`);
						} else {
							r.push(`${His} tight, form-fitting pants conceal ${his} asshole, but even a cursory fondle reveals ${he} isn't wearing any underwear.`);
						}
						break;
					case "spats and a tank top":
						if (slave.chastityAnus) {
							r.push(`${His} tight, form-fitting shorts make ${his} chastity device obvious.`);
						} else {
							r.push(`${His} tight, form-fitting shorts hug ${his} asshole so closely that ${his} anus is distinctly visible through the material.`);
						}
						break;
					case "a slutty qipao":
						if (slave.chastityAnus) {
							r.push(`${His} anal chastity belt is barely covered from the rear.`);
						} else {
							if (slave.butt > 6) {
								r.push(`The rear hem of ${his} qipao is so inadequate to cover ${his} butt that`);
								if (slave.anus > 2) {
									r.push(`${his} huge asshole is very visible from the rear.`);
								} else if (slave.anus > 1) {
									r.push(`${his} roomy asshole is very visible from the rear.`);
								} else {
									r.push(`there is an occasional glimpse of ${his} asshole.`);
								}
							}
						}
						break;
					case "uncomfortable straps":
						if (slave.chastityAnus) {
							r.push(`${His} anal chastity belt is completely visible. ${His} straps come down around it between ${his} buttocks.`);
						} else {
							r.push(`The strap between ${his} buttocks has a steel ring over ${his}`);
							if (slave.anus > 2) {
								r.push(`butthole to admit cock. Amusingly, the ring is probably more restrictive than ${his} loose ass.`);
							} else {
								r.push(`asshole to admit cock.`);
							}
						}
						break;
					case "shibari ropes":
						if (slave.chastityAnus) {
							r.push(`${His} anal chastity belt is completely visible. ${His} rope passes around it between ${his} buttocks.`);
						} else {
							r.push(`The rope between ${his} buttocks passes`);
							if (slave.anus > 2) {
								r.push(`over ${his} asshole, but ${his} lewd anus is so big that it's visible to either side of it.`);
							} else {
								r.push(`tightly over ${his} asshole.`);
							}
						}
						break;
					case "restrictive latex":
						if (slave.chastityAnus) {
							r.push(`${His} anal chastity belt can be barely made out through the latex.`);
						} else {
							r.push(`${His}`);
							if (slave.anus > 1) {
								r.push(`well-fucked`);
							} else {
								r.push(`tight`);
							}
							r.push(`asshole is visible through a hole in the latex, left expressly to admit cock.`);
						}
						break;
					case "attractive lingerie":
						if (slave.chastityAnus) {
							r.push(`${His} anal chastity belt is on display.`);
						} else {
							r.push(`${His} g-string`);
							if (slave.anus > 1) {
								r.push(`cannot conceal ${his} well-fucked`);
							} else {
								r.push(`shows only a hint of ${his} tight`);
							}
							r.push(`asshole.`);
						}
						break;
					case "a burkini":
					case "a monokini":
						if (slave.chastityAnus) {
							r.push(`${His} anal chastity device is concealed by ${his} swimsuit.`);
						} else {
							r.push(`${His} swimsuit fully conceals ${his}`);
							if (slave.anus > 1) {
								r.push(`well-fucked asshole.`);
							} else {
								r.push(`tight butthole.`);
							}
						}
						break;
					case "overalls":
						if (slave.chastityAnus) {
							r.push(`${His} anal chastity device is concealed by ${his} overalls.`);
						} else {
							r.push(`${His} overalls give no hint of the`);
							if (slave.anus > 1) {
								r.push(`well-fucked butthole`);
							} else {
								r.push(`tight asshole`);
							}
							r.push(`underneath.`);
						}
						break;
					case "an apron":
						if (slave.chastityAnus) {
							r.push(`Since ${he} is nude under ${his} apron, ${his} anal chastity device is on open display.`);
						} else {
							r.push(`Since ${he} is nude under ${his} apron, ${his}`);
							if (slave.anus > 1) {
								r.push(`well-fucked asshole`);
							} else {
								r.push(`tight butthole`);
							}
							r.push(`is on open display.`);
						}
						break;
					case "a cybersuit":
						if (slave.chastityAnus) {
							r.push(`${His} anal chastity device is integrated into ${his} bodysuit.`);
						} else {
							r.push(`${His} bodysuit fully conceals ${his}`);
							if (slave.anus > 1) {
								r.push(`well-fucked asshole.`);
							} else {
								r.push(`tight butthole.`);
							}
						}
						break;
					case "a tight Imperial bodysuit":
						if (slave.chastityAnus) {
							r.push(`${His} anal chastity device is integrated into ${his} high-tech bodysuit.`);
						} else {
							r.push(`${His} bodysuit fully conceals ${his}`);
							if (slave.anus > 1) {
								r.push(`well-fucked asshole.`);
							} else {
								r.push(`tight butthole.`);
							}
						}
						break;
					case "a string bikini":
						if (slave.chastityAnus) {
							r.push(`${His} anal chastity belt is integrated into ${his} bikini.`);
						} else {
							r.push(`${His}`);
							if (slave.anus > 1) {
								r.push(`well-fucked asshole makes a mockery of ${his} string bikini, which cannot begin to conceal it.`);
							} else {
								r.push(`string bikini shows more than a hint of ${his} tight asshole.`);
							}
						}
						break;
					case "a scalemail bikini":
						if (slave.chastityAnus) {
							r.push(`${His} anal chastity belt is integrated into ${his} bikini.`);
						} else {
							r.push(`${His}`);
							if (slave.anus > 1) {
								r.push(`well-fucked asshole is concealed by ${his} scalemail bikini.`);
							} else {
								r.push(`scalemail bikini conceals ${his} tight asshole.`);
							}
						}
						break;
					case "striped panties":
						if (slave.chastityAnus) {
							r.push(`${His} anal chastity belt is integrated into ${his} panties.`);
						} else {
							r.push(`${His}`);
							if (slave.anus > 1) {
								r.push(`well-fucked asshole is concealed by ${his} cute panties.`);
							} else {
								r.push(`cute panties conceal ${his} tight asshole.`);
							}
						}
						break;
					case "clubslut netting":
						if (slave.chastityAnus) {
							r.push(`${His} anal chastity belt is fully visible through the netting.`);
						} else {
							r.push(`There's a hole in ${his} netting right over ${his}`);
							if (slave.anus > 1) {
								r.push(`big`);
							} else {
								r.push(`tight`);
							}
							r.push(`butthole.`);
						}
						break;
					case "a cheerleader outfit":
						r.push(`If ${he} bends over even slightly, the hem of ${his} skirt rides up to reveal`);
						if (slave.chastityAnus) {
							r.push(`${his} anal chastity belt.`);
						} else {
							if (slave.anus > 1) {
								r.push(`${his} lewd butthole.`);
							} else {
								r.push(`a hint of ${his} tight anus.`);
							}
						}
						break;
					case "harem gauze":
						r.push(`${His}`);
						if (slave.chastityAnus) {
							r.push(`anal chastity belt is clearly`);
						} else {
							if (slave.anus > 1) {
								r.push(`well-fucked asshole is clearly`);
							} else {
								r.push(`tight ass is tantalizingly`);
							}
						}
						r.push(`visible through ${his} gauze.`);
						break;
					case "a fallen nuns habit":
						if (slave.chastityAnus) {
							r.push(`${His} uncovered butt shows off ${his} anal chastity belt clearly when ${he} bends over.`);
						} else {
							r.push(`With ${his} butt uncovered, committing the sin of sodomy with this nun is as easy as bending ${him} over.`);
						}
						break;
					case "a chattel habit":
						if (slave.chastityAnus) {
							r.push(`Underneath ${his} chattel habit, ${his} anal chastity belt prevents anal.`);
						} else {
							r.push(`The strip of cloth over ${his} rear hole can be flipped up for anal, or tucked up under the belt for prolonged sodomy.`);
						}
						break;
					case "a penitent nuns habit":
						if (slave.chastityAnus) {
							r.push(`Underneath ${his} habit, ${his} anal chastity belt prevents anal.`);
						} else {
							r.push(`${His} poor sinful asshole is terribly chafed by ${his} habit.`);
						}
						break;
					case "a slutty outfit":
						r.push(`${His} slutty outfits`);
						if (slave.chastityAnus) {
							r.push(`betray ${his} anal chastity belt.`);
						} else {
							r.push(`are designed for easy access to ${his} asshole.`);
						}
						break;
					case "a halter top dress":
						if (slave.chastityAnus) {
							r.push(`${His} beautiful halter top dress hides ${his} anal chastity accessory underneath.`);
						} else {
							r.push(`Though ${his} halter top dress is very beautiful, ${his} asshole is bare beneath it.`);
						}
						break;
					case "a ball gown":
						if (slave.chastityAnus) {
							r.push(`${His} fabulous silken ball gown hides ${his} anal chastity accessory underneath.`);
						} else {
							r.push(`Though ${his} silken ball gown is fabulous, ${his} asshole is bare beneath it.`);
						}
						break;
					case "an evening dress":
						if (slave.chastityAnus) {
							r.push(`${His} dress hides ${his} anal chastity accessory underneath, but leaves a faintly visible impression on the fabric.`);
						} else {
							r.push(`${His} sensual evening dress completely hides her bare asshole.`);
						}
						break;
					case "a comfortable bodysuit":
						r.push(`${His} bodysuit is so form-fitting that the shape of ${his}`);
						if (slave.chastityAnus) {
							r.push(`anal chastity accessory is clearly`);
						} else {
							r.push(`anus is distinctly`);
						}
						r.push(`visible.`);
						break;
					case "a latex catsuit":
						r.push(`${His} crotch zipper`);
						if (slave.chastityAnus) {
							r.push(`does nothing as ${his} anal chastity accessory is underneath it.`);
						} else {
							r.push(`gives ready access to ${his} asshole.`);
						}
						break;
					case "a leotard":
						r.push(`The thin strip of leotard running between`);
						if (slave.chastityAnus) {
							r.push(`${his}`);
							if (hasBothLegs(slave)) {
								r.push(`legs`);
							} else {
								r.push(`hips`);
							}
							r.push(`is so thin that ${his} anal chastity accessory is clearly visible underneath.`);
						} else {
							r.push(`${his} buttocks are so thin and snug that the outline of ${his} anus is clearly`);
							if (slave.butt > 3) {
								r.push(`visible if ${he}'s spread.`);
							} else {
								r.push(`visible.`);
							}
						}
						break;
					case "a mini dress":
						r.push(`If ${he} bends over even slightly, the hem of ${his} short dress rides up to reveal ${his}`);
						if (slave.chastityAnus) {
							r.push(`anal chastity accessory underneath.`);
						} else {
							if (slave.anus > 1) {
								r.push(`lewd butthole.`);
							} else {
								r.push(`tight anus.`);
							}
						}
						break;
					case "a slutty nurse outfit":
						if (slave.chastityAnus) {
							r.push(`The very tight skirt covers ${his} anal chastity accessory.`);
						} else {
							r.push(`The skirt is tight enough that lifting it to fuck ${his} butt is an amusing wrestling match.`);
						}
						break;
					case "a schoolgirl outfit":
						r.push(`The skirt is so short that it`);
						if (slave.chastityAnus) {
							r.push(`reveals ${his} anal chastity accessory.`);
						} else {
							r.push(`doesn't even have to be lifted to fuck ${his} schoolgirl ass.`);
						}
						break;
					case "a hijab and blouse":
						r.push(`${His} long skirt may be modest, but it's also loose and easy to lift, allowing access to`);
						if (slave.chastityAnus) {
							r.push(`${his} anal chastity accessory.`);
						} else {
							r.push(`${his} anus.`);
						}
						break;
					case "a hijab and abaya":
					case "a niqab and abaya":
						r.push(`The abaya may be modest, but it's also loose and easy to lift, allowing access to`);
						if (slave.chastityAnus) {
							r.push(`${his} anal chastity accessory.`);
						} else {
							r.push(`${his} anus.`);
						}
						break;
					case "a klan robe":
						r.push(`The robe fully covers ${his} body, but it's also loose and easy to lift, allowing access to`);
						if (slave.chastityAnus) {
							r.push(`${his} anal chastity accessory.`);
						} else {
							r.push(`${his} anus.`);
						}
						break;
					case "a slutty klan robe":
						r.push(`The skimpy robe fails to cover most of ${his} body, allowing easy access to`);
						if (slave.chastityAnus) {
							r.push(`${his} anal chastity accessory.`);
						} else {
							r.push(`${his} anus.`);
						}
						break;
					case "a burqa":
						r.push(`The burqa's heavy fabric makes it somewhat difficult to lift, which helps to conceal ${his}`);
						if (slave.chastityAnus) {
							r.push(`anal chastity accessory.`);
						} else {
							if (slave.anus > 2) {
								r.push(`immorally used asshole.`);
							} else {
								r.push(`naked asshole.`);
							}
						}
						break;
					case "a slutty maid outfit":
						r.push(`The short skirt of ${his} maid dress`);
						if (slave.chastityAnus) {
							r.push(`covers ${his} anal chastity accessory.`);
						} else {
							r.push(`is made to be easily liftable for access to ${his} anus.`);
						}
						break;
					case "a nice maid outfit":
						r.push(`As conservative as ${his} dress is,`);
						if (slave.chastityAnus) {
							r.push(`${his} anal chastity accessory still hides under it.`);
						} else {
							r.push(`${his} anus is still bare beneath it.`);
						}
						break;
					case "a kimono":
						r.push(`As demure as the kimono is,`);
						if (slave.chastityAnus) {
							r.push(`${his} anal chastity accessory still lies beneath it.`);
						} else {
							r.push(`${his} anus is still bare underneath it.`);
						}
						break;
					case "a Santa dress":
						r.push(`The short hem of ${his} festive dress`);
						if (slave.chastityAnus) {
							r.push(`fails to fully cover ${his} anal chastity device.`);
						} else {
							r.push(`allows easy access to ${his} anus.`);
						}
						break;
					case "a long qipao":
						r.push(`The qipao may be modest, but it's also loose and easy to lift, allowing access to`);
						if (slave.chastityAnus) {
							r.push(`${his} anal chastity accessory.`);
						} else {
							r.push(`${his} anus.`);
						}
						break;
					case "a courtesan dress":
						if (slave.chastityAnus) {
							r.push(`${His} layered skirt, when unparted, hides ${his} anal chastity accessory.`);
						} else {
							r.push(`${His} skirt may look fancy, but it allows easy access to ${his} bare anus.`);
						}
						break;
					case "a bimbo outfit":
					case "a tube top and thong":
					case "a thong":
					case "a t-shirt and thong":
						if (slave.chastityAnus) {
							r.push(`${His} anal chastity belt keeps ${his} thong from riding up on ${him}.`);
						} else {
							r.push(`${His} thong can easily be slipped aside to expose ${his} anus.`);
						}
						break;
					case "conservative clothing":
					case "a toga":
					case "a huipil":
					case "cutoffs and a t-shirt":
					case "battledress":
					case "battlearmor":
					case "Imperial Plate":
					case "a mounty outfit":
					case "lederhosen":
					case "a dirndl":
					case "a biyelgee costume":
					case "slutty business attire":
					case "nice business attire":
					case "a military uniform":
					case "a bunny outfit":
					case "a nice nurse outfit":
					case "a schutzstaffel uniform":
					case "a slutty schutzstaffel uniform":
					case "a red army uniform":
					case "a confederate army uniform":
					case "a button-up shirt and panties":
					case "a gothic lolita dress":
					case "a hanbok":
					case "a bra":
					case "a button-up shirt":
					case "a nice pony outfit":
					case "a sweater":
					case "a tank-top":
					case "a tube top":
					case "a one-piece swimsuit":
					case "a police uniform":
					case "a striped bra":
					case "a skimpy loincloth":
					case "a slutty pony outfit":
					case "a sports bra":
					case "a sweater and panties":
					case "a t-shirt":
					case "a tank-top and panties":
					case "an oversized t-shirt and boyshorts":
					case "an oversized t-shirt":
					case "a t-shirt and jeans":
					case "boyshorts":
					case "cutoffs":
					case "leather pants and pasties":
					case "leather pants":
					case "panties":
					case "sport shorts and a t-shirt":
					case "a t-shirt and panties":
					case "panties and pasties":
					case "pasties":
					case "striped underwear":
					case "sport shorts and a sports bra":
					case "jeans":
					case "a sweater and cutoffs":
					case "leather pants and a tube top":
					case "sport shorts":
						/* We could use chastity belt descriptions! */
						break;
					default:
						if (slave.anus > 2) {
							if (slave.chastityAnus) {
								r.push(`${His} bare buttocks and ${his} anal chastity accessory are very visible from the rear.`);
							} else {
								r.push(`With ${his} ass bare, ${his} huge asshole is very visible from the rear.`);
							}
						} else if (slave.anus > 1) {
							if (slave.chastityAnus) {
								r.push(`${His} bare buttocks and ${his} anal chastity accessory are very visible from the rear.`);
							} else {
								r.push(`With ${his} ass bare, ${his} loose asshole is visible from the rear.`);
							}
						} else {
							if (slave.chastityAnus) {
								r.push(`${His} bare buttocks and ${his} anal chastity accessory are visible.`);
							} else {
								r.push(`With ${his} ass bare, there is an occasional glimpse of ${his} asshole.`);
							}
						}
						break;
				}
			}
		}
	}
	const buttplug = App.Data.buttplug.get(slave.buttplug) || V.customItem.buttplug.get(slave.buttplug);
	if (buttplug.width === 1) {
		if (buttplug.length === 1) {
			r.push(`It's filled by a standard sized`);
			if (slave.anus > 2) {
				r.push(`${slave.buttplug}, which is on the verge of falling out.`);
			} else {
				r.push(`${slave.buttplug}.`);
			}
		} else {
			const plug = slave.buttplug.startsWith("long ") ? slave.buttplug.slice(5) : slave.buttplug;
			r.push(`It's filled by a standard sized, overly long`);
			if (slave.anus > 2) {
				r.push(`${plug}, which is on the verge of sliding out ${his} rear.`);
			} else {
				r.push(`${plug}.`);
			}
			r.push(`It causes a noticeable bulge in ${his} belly.`);
		}
	} else if (buttplug.width === 2) {
		r.push(`It's`);
		if (slave.anus < 2) {
			r.push(`agonizingly stretched`);
		} else if (slave.anus < 3) {
			r.push(`uncomfortably stretched`);
		} else {
			r.push(`comfortably stretched`);
		}
		if (buttplug.length === 1) {
			r.push(`by a large ${slave.buttplug}.`);
		} else {
			r.push(`by a large and long ${slave.buttplug}. It causes a noticeable bulge in ${his} belly.`);
		}
	} else if (buttplug.width === 3) {
		if (buttplug.length === 1) {
			if (slave.anus < 4) {
				r.push(`It's agonizingly stretched by a ${slave.buttplug} so huge ${his} anus is probably being stretched into a permanent gape.`);
			} else {
				r.push(`Its ridiculous gape is comfortably filled by a huge ${slave.buttplug}.`);
			}
		} else {
			if (slave.anus < 4) {
				r.push(`It's agonizingly stretched by a ${slave.buttplug} so huge it causes ${his} belly to bulge and is likely stretching ${his} anus into a permanent gape.`);
			} else {
				r.push(`Its ridiculous gape is comfortably filled by a wide and long ${slave.buttplug}. It causes a noticeable bulge in ${his} belly.`);
			}
		}
		if (slave.anus < 4) {
			if (slave.fuckdoll === 0) {
				if (slave.fetish === "masochist" && slave.fetishKnown === 1 && slave.fetishStrength > 60) {
					r.push(`${He}'s frequently in tears from the pain, which is so sharp it often tips ${him} over into spontaneous orgasm.`);
				} else {
					r.push(`${He} spends much of ${his} time sobbing with anal pain and fear at having ${his} hole ruined.`);
				}
			}
		}
	}

	switch (buttplug.width) {
		case 3:
			if (slave.buttplugAttachment === "tail") {
				r.push(`${He} sways the tail back and forth with every ginger movement of ${his} rear.`);
			} else if (slave.buttplugAttachment === "fox tail") {
				r.push(`${He} sways the bushy ${slave.hColor} tail back and forth with every ginger movement of ${his} rear.`);
			} else if (slave.buttplugAttachment === "cow tail") {
				r.push(`${He} sways the spotted tail back and forth with every ginger movement of ${his} rear.`);
			} else if (slave.buttplugAttachment === "cat tail") {
				r.push(`${He} jiggles the tail back and forth with every ginger movement of ${his} rear.`);
			}
			break;
		case 2:
			if (slave.buttplugAttachment === "tail") {
				r.push(`${He} swings the tail from side to side with every shift of ${his} rear.`);
			} else if (slave.buttplugAttachment === "fox tail") {
				r.push(`${He} swings the bushy ${slave.hColor} tail from side to side with every shift of ${his} rear.`);
			} else if (slave.buttplugAttachment === "cow tail") {
				r.push(`${He} swings the spotted tail from side to side with every shift of ${his} rear.`);
			} else if (slave.buttplugAttachment === "cat tail") {
				r.push(`${He} bounces the tail from side to side with every shift of ${his} rear.`);
			}
			break;
		case 1:
			if (slave.buttplugAttachment === "tail") {
				r.push(`A tail protrudes from the back of the plug and dangles from ${his} rear.`);
			} else if (slave.buttplugAttachment === "fox tail") {
				r.push(`A bushy ${slave.hColor} tail with a white tip protrudes from the back of the plug and dangles from ${his} rear.`);
			} else if (slave.buttplugAttachment === "cow tail") {
				r.push(`A slim, spotted tail with a cute tuft at its tip protrudes from the back of the plug and dangles from ${his} rear.`);
			} else if (slave.buttplugAttachment === "cat tail") {
				r.push(`A tail protrudes from the back of the plug and springs upwards from ${his} rear.`);
			}
	}

	return r.join(" ");
};
