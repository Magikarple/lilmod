// cSpell:ignore komainu, shishi

/**
 * @param {App.Entity.SlaveState} slave
 * @param {string} surface
 * @returns {string|undefined} Relevant slave tattoo, if present
 */
App.Desc.tattoo = function(slave, surface) {
	"use strict";
	let r = [];
	const {
		he, him, his, He, His, hers, himself
	} = getPronouns(slave);
	if (V.showBodyMods !== 1) {
		return undefined;
	}
	switch (surface) {
		case "shoulder": {
			if (slave.fuckdoll === 0) {
				if (slave.shouldersTat !== 0) {
					switch (slave.shouldersTat) {
						case "tribal patterns":
							r.push(`Tribal tattoos encircle both ${his} shoulders in swirling patterns.`);
							break;
						case "flowers":
							r.push(`A gorgeous flower tattoo covers each shoulder.`);
							break;
						case "counting":
							r.push(`A '¤' tattoo counting ${his} earnings and acquirements cover ${his} shoulders.`);
							break;
						case "advertisements":
							if (slave.vagina < 0) {
								r.push(`'Two Hole Whore' is tattooed on each of ${his} shoulders.`);
							} else {
								r.push(`'Three Hole Whore' is tattooed on each of ${his} shoulders.`);
							}
							break;
						case "rude words":
							r.push(`'Dickholster' is tattooed on ${his} left shoulder, and 'Fuckmeat' is tattooed on ${his} right.`);
							break;
						case "degradation":
							r.push(`'Hurt Me' is tattooed on ${his} left shoulder, and 'Rape Me' on ${his} right.`);
							break;
						case "Asian art":
							r.push(`Beautiful, colorful tattoos cover ${his} upper body: a line of wind-whipped waves lashing against mountains runs across ${his} collarbone and around both shoulders.`);
							break;
						case "scenes":
							if (slave.vagina < 0) {
								r.push(`A stylized rendition of a dick plunging into an open mouth is tattooed on ${his} left shoulder, and a similar image of a dick entering an anus on ${his} right.`);
							} else {
								r.push(`A stylized rendition of a dick going into a pussy is tattooed on ${his} left shoulder, and a similar image of a dick entering an anus on ${his} right.`);
							}
							break;
						case "bovine patterns":
							r.push(`${His} shoulders are flecked with tattoos of bovine blotches.`);
							break;
						case "sacrilege":
							r.push(`Tattoos depicting demonic nude figures adorn ${his} shoulders.`);
							break;
						case "sacrament":
							r.push(`Tattoos depicting saintly nude figures adorn ${his} shoulders.`);
							break;
						case "possessive":
							r.push(`A rendition of your face inside a heart is tattooed onto ${his} left shoulder, and the words 'I love my ${getWrittenTitle(slave)}' inside an identical heart are tattooed on ${his} right.`);
							break;
						case "paternalist":
							r.push(`'Love Me' is tattooed on ${his} left shoulder, and 'Teach Me' on ${his} right.`);
							break;
						default:
							r.push(pronounsForSlaveProp(slave, slave.shouldersTat));
							break;
					}
				}
			}
			break;
		}
		case "lips": {
			/* Fuckdoll vulva and anus alone are visible, plus enormous lips */
			if (slave.fuckdoll === 0 || slave.lips > 95) {
				if (slave.lipsTat !== 0) {
					switch (slave.lipsTat) {
						case "tribal patterns":
							r.push(`${His} face is tattooed with tribal patterns that make ${him} seem mysterious and exotic.`);
							break;
						case "flowers":
							r.push(`${His} minimal facial tattoos are limited to a cute flower on each cheek.`);
							break;
						case "counting":
							if (slave.counter.oral === 0) {
								r.push(`There is a horizontal line tattooed across the ${his} cheeks for symbols counting ${his} oral totals to be inscribed under, once ${he} has some.`);
							} else if (slave.counter.oral < 500) {
								r.push(`Tiny dick, pussy, and anus symbols are tattooed all over ${his} cheeks, one for every thing ${he}'s sucked.`);
							} else {
								r.push(`Tiny dick, pussy, and anus symbols are tattooed all over ${his} face, forehead, and neck, one for every thing ${he}'s sucked.`);
							}
							break;
						case "advertisements":
							r.push(`${His} facial tattoos include 'Facefuck Me' across ${his} forehead, 'Cock' to the left of ${his} mouth, and 'Sucker' to the right of it.`);
							break;
						case "rude words":
							r.push(`${His} facial tattoos include 'Sex Slave' across ${his} forehead, 'Face' to the left of ${his} mouth, and 'Pussy' to the right of it.`);
							break;
						case "degradation":
							r.push(`'${SlaveTitle(slave)}' is tattooed across ${his} forehead.`);
							break;
						case "Asian art":
							r.push(`${He} has a blossoming cherry tree tattooed on one temple; its pink petals are dappled across ${his} cheeks.`);
							break;
						case "bovine patterns":
							r.push(`${His} face is subtly tattooed to give ${him} a somewhat bovine appearance.`);
							break;
						case "permanent makeup":
							if (slave.makeup !== 0) {
								r.push(`${His} normal makeup is difficult to distinguish from the underlying tattoo.`);
							}
							break;
						case "sacrilege":
							r.push(`${His} face is subtly tattooed to give ${him} a decidedly demonic appearance.`);
							break;
						case "sacrament":
							r.push(`${His} face is subtly tattooed to give ${him} a decidedly angelic appearance.`);
							break;
						case "possessive":
							r.push(`'Property of ${PlayerName()}' is tattooed across ${his} forehead.`);
							break;
						case "paternalist":
							r.push(`'Beloved ${SlaveTitle(slave)}' is tattooed across one of ${his} cheeks.`);
							break;
						default:
							r.push(pronounsForSlaveProp(slave, slave.lipsTat));
							break;
					}
				}
			}
			break;
		}
		case "breast": {
			if (slave.fuckdoll === 0) {
				if (slave.boobsTat !== 0) {
					switch (slave.boobsTat) {
						case "tribal patterns":
							r.push(`${His} chest and breasts are tattooed with tribal patterns that focus attention on ${his} nipples.`);
							break;
						case "flowers":
							r.push(`${His} chest is tattooed with a pattern of flowering vines that delicately outlines ${his} breasts.`);
							break;
						case "counting":
							if (slave.counter.mammary === 0) {
								r.push(`There is a horizontal line tattooed across ${his} middle chest for symbols counting ${his} mammary encounters to be inscribed under, once ${he} has some.`);
							} else if (slave.counter.mammary < 500) {
								r.push(`Tiny dick, lips, breast, and even pussy symbols are tattooed all over ${his} cleavage, one for each of ${his} mammary encounters.`);
							} else {
								r.push(`Tiny dick, lips, breast, and even pussy symbols cover ${his} breasts, cleavage, and sides, one for each of ${his} mammary encounters.`);
							}
							break;
						case "advertisements":
							r.push(`'Fuck Me!' is tattooed across ${his} chest in such large letters that the word is visible a long way off.`);
							break;
						case "rude words":
							r.push(`'Fuckslave' is tattooed across ${his} chest in such large letters that the word is visible a long way off.`);
							break;
						case "degradation":
							r.push(`'${getWrittenTitle(slave)}'s' is tattooed across the top of ${his} right breast; 'Bitch' is tattooed across the top of ${his} left.`);
							break;
						case "Asian art":
							r.push(`An octopus is tattooed on ${his} upper chest; its tentacles reach down to envelop ${his} breasts, their tips reaching for but not quite reaching each nipple.`);
							break;
						case "scenes":
							r.push(`${His} chest is tattooed with lewd scenes; each of ${his} breasts shows a phallus receiving a titfuck while each of ${his} collarbones shows a woman deepthroating a large phallus.`);
							break;
						case "bovine patterns":
							r.push(`${His} chest is tattooed to look like a Holstein cow's, with ${his} udders left bare to draw attention to them.`);
							break;
						case "sacrilege":
							r.push(`Each of ${his} breasts is tattooed with a depiction of a pentagram, with ${his} nipples forming the center.`);
							break;
						case "sacrament":
							r.push(`Each of ${his} breasts is tattooed with a depiction of a crucifix, with ${his} nipples forming the center.`);
							break;
						case "possessive":
							r.push(`Your personal symbol is tattooed above ${his} left breast, '${PlayerName()}' above ${his} right, leaving the rest of ${his} chest and breasts bare.`);
							break;
						case "paternalist":
							r.push(`'${getWrittenTitle(slave)}'s' is tattooed across the top of ${his} right breast; 'Darling' is tattooed across the top of ${his} left.`);
							break;
						default:
							r.push(pronounsForSlaveProp(slave, slave.boobsTat));
							break;
					}
				}
			}
			break;
		}
		case "upper arm": { /* technically the old widget describes the ENTIRE arm, but we are going to display it here to preserve order */
			if (slave.fuckdoll === 0 && hasAnyArms(slave)) {
				if (slave.armsTat !== 0) {
					let arms;
					if (!hasBothArms(slave)) {
						arms = "arm";
					} else {
						arms = "arms";
					}
					switch (slave.armsTat) {
						case "tribal patterns":
							r.push(`${His} tribal tattoos run down ${his} ${arms}.`);
							break;
						case "flowers":
							r.push(`${His} floral tattoos run down ${his} ${arms} to end in a pretty bloom on the back of`);
							if (hasBothArms(slave)) {
								r.push(`each hand.`);
							} else {
								r.push(`${his} hand.`);
							}
							break;
						case "counting":
							if (slave.counter.oral === 0) {
								r.push(`There are horizontal lines tattooed around ${his} fore${arms}, creating a blank space to permanently tally future sexual exploits.`);
							} else if (slave.counter.oral < 500) {
								r.push(`Tiny dick, pussy, and anus symbols are tattooed on ${his} fore${arms}, one for each organ ${he}'s manually pleasured.`);
							} else {
								r.push(`Tiny dick, pussy, and anus symbols are tattooed all over`);
								if (hasBothArms(slave)) {
									r.push(`both of`);
								}
								r.push(`${his} ${arms}, one for each organ ${he}'s manually pleasured.`);
							}
							break;
						case "advertisements":
							r.push(`${His} right arm is tattooed with a price list for use if ${he}'s whoring, and ${his} left with a simple tourist guide for use if ${he}'s serving the public.`);
							break;
						case "rude words":
							r.push(`${His} ${arms}`);
							if (hasBothArms(slave)) {
								r.push(`have`);
							} else {
								r.push(`has`);
							}
							r.push(`helpful instructions on how to restrain ${him} for rape, including indications of the best anchor points at ${his}`);
							if (hasBothArms(slave)) {
								r.push(`wrists.`);
							} else {
								r.push(`wrist.`);
							}
							break;
						case "degradation":
							if (slave.dick > 0) {
								if (slave.vagina > -1) {
									if (slave.boobs > 600) {
										r.push(`'Boobs Pussy Cock Asshole' is tattooed on ${his} left arm, and 'Suck Fuck Hurt Rape' is tattooed on ${his} right.`);
									} else {
										r.push(`'Half Pussy & Half Cock' is tattooed on ${his} left arm, and 'All Whore' is tattooed on ${his} right.`);
									}
								} else if (slave.boobs > 600) {
									r.push(`'I didn't use to have boobs' is tattooed on ${his} left arm, and 'I didn't always take it up the ass' is tattooed on ${his} right.`);
								} else {
									r.push(`'I promise to cum buckets' is tattooed on ${his} left arm, and 'If you fuck my butt' is tattooed on ${his} right.`);
								}
							} else {
								if (slave.boobs > 800 && slave.lactation > 0) {
									r.push(`'Grade AAA Milker' is tattooed on ${his} left arm, and 'Grade AAA Breeder' is tattooed on ${his} right.`);
								} else if (slave.visualAge > 35) {
									r.push(`'Please let Mommy suck your cock' is tattooed on ${his} left arm, and 'Please rape Mommy's cunt' is tattooed on ${his} right.`);
								} else if (slave.visualAge < 25) {
									r.push(`'Teach me how to suck cock' is tattooed on ${his} left arm, and 'Teach me how to take dick' is tattooed on ${his} right.`);
								} else {
									r.push(`'There are many sex slaves like me' is tattooed on ${his} left arm, and 'But this one is ${getWrittenTitle(slave)}'s' is tattooed on ${his} right.`);
								}
							}
							break;
						case "Asian art":
							r.push(`Tattoos of fierce dragons wind around both ${his} arms.`);
							break;
						case "scenes":
							r.push(`${His} lewd tattoos cover ${his} ${arms}; they include lots of little vignettes of sex, with dates to show when ${he} was first fucked like that.`);
							break;
						case "bovine patterns":
							r.push(`Tattoos of cow-like spots cover ${his} ${arms}, but stop short of`);
							if (hasBothArms(slave)) {
								r.push(`each of ${his} elbows.`);
							} else {
								r.push(`${his} elbow.`);
							}
							break;
						case "sacrilege":
							r.push(`Tattoos of swirling flames run down ${his} ${arms}.`);
							break;
						case "sacrament":
							r.push(`Tattoos of swirling thorns run down ${his} ${arms}, culminating in a stylized depiction of a bloody nail on the back of each hand.`);
							break;
						case "possessive":
							r.push(`${His} arm tattoos depict notable moments during ${his} enslavement by you, culminating in a stylized rendition of your first initial on ${his} left hand and your second on the right.`);
							break;
						case "paternalist":
							if (slave.dick > 0) {
								if (slave.vagina > -1) {
									if (slave.boobs > 600) {
										r.push(`'Boobs Pussy Cock Asshole' is tattooed on ${his} left arm, and 'Caress Pleasure Stroke Stretch' is tattooed on ${his} right.`);
									} else {
										r.push(`'Half Pussy & Half Cock' is tattooed on ${his} left arm, and 'All Loved' is tattooed on ${his} right.`);
									}
								} else if (slave.boobs > 600) {
									r.push(`'I didn't use to have boobs' is tattooed on ${his} left arm, and 'And now I do!' is tattooed on ${his} right.`);
								} else {
									r.push(`'I promise to cum buckets' is tattooed on ${his} left arm, and 'If you treat me right' is tattooed on ${his} right.`);
								}
							} else {
								if (slave.boobs > 800 && slave.lactation > 0) {
									r.push(`'Please drink' is tattooed on ${his} left arm, and 'All my milk' is tattooed on ${his} right.`);
								} else if (slave.visualAge > 35) {
									r.push(`'Please let Mommy worship your cock' is tattooed on ${his} left arm, and 'Please pleasure Mommy's pussy' is tattooed on ${his} right.`);
								} else if (slave.visualAge < 25) {
									r.push(`'Please teach me how to suck cock' is tattooed on ${his} left arm, and 'Please teach me how to fuck' is tattooed on ${his} right.`);
								} else {
									r.push(`'There are many sex slaves like me' is tattooed on ${his} left arm, and 'But ${getWrittenTitle(slave)} loves me' is tattooed on ${his} right.`);
								}
							}
							break;
						default:
							r.push(pronounsForSlaveProp(slave, slave.armsTat));
							break;
					}
				}
			}
			break;
		}
		case "back": {
			if (slave.fuckdoll === 0) {
				if (slave.backTat !== 0) {
					switch (slave.backTat) {
						case "tribal patterns":
							r.push(`${He} has a totem of ${his} spirit animal tattooed across ${his} back.`);
							break;
						case "flowers":
							r.push(`${His} back is covered in hundreds of beautiful flower tattoos; one could spend half an hour examining them all.`);
							break;
						case "counting":
							r.push(`${His} back is tattooed with tick marks to count the days of ${his} sexual`);
							if (slave.weekAcquired === 0) {
								r.push(`enslavement to you. There are a lot of them.`);
							} else {
								let daysEnslaved = ((V.week - slave.weekAcquired) * 7) + jsRandom(-3, 3);
								if (daysEnslaved < 10) {
									r.push(`slavery here. There are only a few.`);
								} else {
									r.push(`slavery here: ${daysEnslaved} of them.`);
								}
							}
							break;
						case "advertisements":
							r.push(`${He} has an ad for the arcology itself tattooed across ${his} back.`);
							break;
						case "rude words":
							r.push(`'Sex Slave' is tattooed across ${his} back; the tattoo uses the broad space to make each letter`);
							if (V.showInches === 2) {
								r.push(`six inches`);
							} else {
								r.push(`fifteen centimeters`);
							}
							r.push(`tall, so that ${his} identity can be read from hundreds of`);
							if (V.showInches === 2) {
								r.push(`yards`);
							} else {
								r.push(`meters`);
							}
							r.push(`off.`);
							break;
						case "degradation":
							r.push(`${He} has`);
							if (slave.dick > 0) {
								if (slave.vagina > -1) {
									if (slave.boobs > 600) {
										r.push(`'Futa`);
										if (slave.visualAge > 35) {
											r.push(`MILF`);
										}
										r.push(`Slave'`);
									} else {
										if (slave.visualAge > 35) {
											r.push(`MILF Hermaphrodite'`);
										} else {
											r.push(`'Hermaphrodite'`);
										}
									}
								} else if (slave.boobs > 600) {
									r.push(`'Shemale`);
									if (slave.visualAge > 35) {
										r.push(`MILF`);
									}
									r.push(`Slave'`);
								} else {
									r.push(`'Dickgirl`);
									if (slave.visualAge > 35) {
										r.push(`MILF`);
									}
									r.push(`Slave'`);
								}
							} else {
								if (slave.boobs > 800 && slave.lactation > 0) {
									r.push(`'Slave Cow'`);
								} else if (slave.visualAge > 35) {
									r.push(`'MILF Slave'`);
								} else if (slave.visualAge < 25) {
									r.push(`'Slave Girl'`);
								} else {
									r.push(`'Sex Slave'`);
								}
							}
							r.push(`tattooed across ${his} back in gothic script.`);
							break;
						case "Asian art":
							r.push(`An Asian dragon is tattooed in a circle across ${his} back; the dragon has subtle features that, according to traditional meanings, relate it to ${his} personality.`);
							break;
						case "scenes":
							if (slave.vagina === -1) {
								r.push(`A line-art rendition of ${slave.slaveName} ${himself} cumming copiously while riding a dick is tattooed across ${his} entire back.`);
							} else if (slave.lactation > 0) {
								r.push(`A line-art rendition of ${slave.slaveName} ${himself} nursing a pair of ${his} fellow slaves is tattooed across ${his} entire back.`);
							} else if (slave.skill.vaginal >= 100) {
								r.push(`A line-art rendition of ${slave.slaveName} ${himself} performing reverse cowgirl and spreading ${his} pussy is tattooed across ${his} entire back.`);
							} else if (V.PC.vagina !== -1) {
								r.push(`A line-art rendition of ${slave.slaveName} ${himself} eating pussy is tattooed across ${his} entire back.`);
							} else {
								r.push(`A line-art rendition of ${slave.slaveName} ${himself} deepthroating a cock is tattooed across ${his} entire back.`);
							}
							break;
						case "bovine patterns":
							r.push(`${His} back is tattooed to resemble the dappled flank of a cow.`);
							break;
						case "sacrilege":
							r.push(`${He} has a pair of blackened wings tattooed across ${his} entire back.`);
							break;
						case "sacrament":
							r.push(`${He} has a pair of pure white wings tattooed across ${his} entire back.`);
							break;
						case "possessive":
							r.push(`An abridged and stylized version of ${his} slave contract is tattooed across ${his} entire back.`);
							break;
						case "paternalist":
							r.push(`${He} has your name and the location of your penthouse tattooed on ${his} upper back, so kind citizens can return ${him} to you if ${he} wanders off.`);
							break;
						default:
							r.push(pronounsForSlaveProp(slave, slave.backTat));
							break;
					}
				}
			}
			break;
		}
		case "lower back": {
			if (slave.fuckdoll === 0) {
				if (slave.stampTat !== 0) {
					switch (slave.stampTat) {
						case "tribal patterns":
							r.push(`${He} has a tribal-patterned tramp stamp.`);
							break;
						case "flowers":
							r.push(`${He} has a floral-patterned tramp stamp.`);
							break;
						case "counting":
							if (slave.anus === 0) {
								r.push(`${He} has the dashed outline of a cock tattooed across ${his} lower back.`);
							} else {
								r.push(`${He} has the silhouette of the largest cock ${he}'s ever had up ${his} anus tattooed across ${his} lower back.`);
							}
							break;
						case "advertisements":
							r.push(`${He} has a tramp stamp which reads 'Fuck my ass!'`);
							break;
						case "rude words":
							r.push(`${He} has a tramp stamp which reads 'Rear Entrance,' with an arrow pointing downward.`);
							break;
						case "degradation":
							r.push(`${He} has a tramp stamp formed from gothic lettering that reads 'Anal Whore.'`);
							break;
						case "Asian art":
							r.push(`A traditional Asian household scene is tattooed on ${his} lower back, showing a rendition of ${slave.slaveName}, dressed in rich silks, having sex with a`);
							if (V.PC.title === 1) {
								r.push(`gentleman.`);
							} else {
								r.push(`lady.`);
							}
							r.push(`The slave and the`);
							if (V.PC.title === 1) {
								r.push(`gentleman`);
							} else {
								r.push(`lady`);
							}
							r.push(`are kissing passionately as ${getPronouns(V.PC).pronoun}`);
							if (slave.vagina < 0) {
								r.push(`penetrates the slave's anus.`);
							} else if (slave.bellyPreg >= 1500 || slave.bellyImplant >= 1500) {
								r.push(`embraces the slave's`);
								if (slave.pregKnown === 1) {
									r.push(`pregnant`);
								} else {
									r.push(`rounded`);
								}
								r.push(`belly.`);
							} else {
								r.push(`penetrates the slave's vagina.`);
							}
							break;
						case "scenes":
							r.push(`${He} has a tramp stamp which shows a cock entering an anus, recognizably ${hers}.`);
							break;
						case "bovine patterns":
							r.push(`${He} has an identifying barcode tattooed across ${his} lower back.`);
							break;
						case "sacrilege":
							r.push(`${He} has a tramp stamp which reads 'Fuck my ass and be damned.'`);
							break;
						case "sacrament":
							r.push(`${He} has a tramp stamp which reads 'Fuck my ass and be blessed.'`);
							break;
						case "possessive":
							r.push(`${He} has a tramp stamp which reads '${V.PC.slaveName}'s ${SlaveTitle(slave)}.'`);
							break;
						case "paternalist":
							r.push(`${He} has a tramp stamp which reads 'Fuck me slowly' with an arrow pointing downward.`);
							break;
						default:
							r.push(pronounsForSlaveProp(slave, slave.stampTat));
							break;
					}
				}
			}
			break;
		}
		case "buttock": {
			if (slave.fuckdoll === 0) {
				if (slave.buttTat !== 0) {
					switch (slave.buttTat) {
						case "tribal patterns":
							r.push(`${His} buttocks and hips are tattooed with tribal patterns that emphasize ${his} womanly curves.`);
							break;
						case "flowers":
							r.push(`${His} hips are tattooed with a cute floral design.`);
							break;
						case "counting":
							if (slave.counter.anal === 0) {
								r.push(`There is a horizontal line tattooed across the tops of ${his} buttocks for symbols counting ${his} anal exploits to be inscribed under, once ${he} has some.`);
							} else if (slave.counter.anal < 500) {
								r.push(`Tiny dick symbols are tattooed all over the top of ${his} buttocks, one for every time ${he}'s been assfucked.`);
							} else {
								r.push(`Tiny dick symbols are tattooed all over ${his} entire buttocks, attesting to long anal slavery.`);
							}
							break;
						case "advertisements":
							r.push(`'Shove' is tattooed across ${his} left buttock; 'It In' is tattooed across ${his} right.`);
							break;
						case "rude words":
							if (slave.vagina > 0) {
								r.push(`'No. 2'`);
							} else {
								r.push(`'No. 1'`);
							}
							r.push(`is tattooed across ${his} left buttock; 'Fuckhole' is tattooed across ${his} right.`);
							break;
						case "degradation":
							r.push(`'Treat it' is tattooed across ${his} left buttock; 'Like a Pussy' is tattooed across ${his} right.`);
							break;
						case "Asian art":
							r.push(`Each of ${his} buttocks bears a tattoo of a coiled dragon, advancing meaningfully towards ${his} anus.`);
							break;
						case "scenes":
							if (slave.dick > 0 && slave.balls > 0) {
								r.push(`${His} buttocks are tattooed with lewd scenes; each of ${his} buttocks shows a smiling shemale offering ${his} anus, while each of ${his} thighs shows a rear view of a shemale simultaneously being sodomized and sodomizing.`);
							} else if (slave.dick > 0) {
								r.push(`${His} buttocks are tattooed with lewd scenes; each of ${his} buttocks shows a gelding, legs together to conceal ${his} cock and display ${his} anus, while each of ${his} thighs shows a gelding being double penetrated in ${his} gaping anus.`);
							} else {
								r.push(`${His} buttocks are tattooed with lewd scenes; each of ${his} buttocks shows a woman being sodomized while each of ${his} thighs shows a woman being gangbanged in all ${his} holes.`);
							}
							break;
						case "bovine patterns":
							r.push(`${His} buttocks are tattooed with large black splotches like those of a Holstein cow.`);
							break;
						case "sacrilege":
							r.push(`'It's not a sin' is tattooed across ${his} left buttock;`);
							if (slave.vagina > -1) {
								r.push(`'If I don't enjoy it'`);
							} else {
								r.push(`'I'm a girl'`);
							}
							r.push(`is tattooed across ${his} right.`);
							break;
						case "sacrament":
							r.push(`'This is my penance' is tattooed across ${his} left buttock;`);
							if (slave.vagina > -1) {
								r.push(`'Make me suffer.'`);
							} else {
								r.push(`'As a slave.'`);
							}
							r.push(`is tattooed across ${his} right.`);
							break;
						case "possessive":
							r.push(`'${V.PC.slaveName} made me their' is tattooed across ${his} left buttock; with '${SlaveTitle(slave)}' tattooed across ${his} right.`);
							break;
						case "paternalist":
							r.push(`'Treat it' is tattooed across ${his} left buttock; 'Gently' is tattooed across ${his} right.`);
							break;
						default:
							r.push(pronounsForSlaveProp(slave, slave.buttTat));
							break;
					}
				}
			}

			break;
		}
		case "vagina": {
			/* Fuckdoll vulva and anus alone are visible, plus enormous lips */
			if (slave.vaginaTat !== 0) {
				switch (slave.vaginaTat) {
					case "tribal patterns":
						r.push(`${His} abdomen is tattooed with tribal patterns that draw the eye down toward ${his}`);
						if (slave.dick !== 0) {
							r.push(`cock.`);
						} else if (slave.vagina === -1) {
							r.push(`featureless crotch.`);
						} else {
							r.push(`vagina.`);
						}
						break;
					case "flowers":
						r.push(`${His} abdomen bears a tasteful tattoo of a`);
						if (slave.dick !== 0) {
							r.push(`lily with a large stamen.`);
						} else {
							r.push(`blooming flower.`);
						}
						break;
					case "counting":
						if (slave.counter.vaginal === 0) {
							r.push(`${His} abdomen reads 'count begins other side, sorry.'`);
						} else if (slave.counter.vaginal < 500) {
							r.push(`Tiny dick symbols are tattooed all over ${his} abdomen, one for every time ${he}'s been fucked.`);
						} else {
							r.push(`Tiny dick symbols are tattooed all over ${his} abdomen, one for every time ${he}'s been fucked. There are so many that they spread up to ${his} breasts and around ${his} sides.`);
						}
						break;
					case "advertisements":
						r.push(`${His} abdomen reads`);
						if (slave.vagina < 0) {
							r.push(`'Rear Entrance Other Side.'`);
						} else {
							r.push(`'Insert Cock' with an arrow pointing downward.`);
						}
						break;
					case "rude words":
						r.push(`${His} abdomen reads`);
						if (slave.vagina < 0) {
							r.push(`'Useless, Rape Ass Instead' with an arrow pointing downward.`);
						} else {
							r.push(`'Fucktoy.'`);
						}
						break;
					case "degradation":
						r.push(`${His} abdomen is tattooed with`);
						if (slave.dick !== 0) {
							r.push(`a downward-pointing arrow which reads 'Bounces When Buttfucked.'`);
						} else {
							r.push(`gothic script that reads`);
							if (V.PC.dick !== 0) {
								if (V.PC.vagina !== -1) {
									r.push(`'Futa`);
								} else {
									r.push(`'Cock`);
								}
							} else {
								r.push(`'Cunt`);
							}
							r.push(`Pleaser.'`);
						}
						break;
					case "Asian art":
						r.push(`${He} has formal Asian characters tattooed across ${his} abdomen. To those who do not know the language, they look elegant, but roughly translated, they read`);
						if (slave.dick > 0 && canAchieveErection(slave)) {
							r.push(`'dick girl slut.'`);
						} else if (slave.dick > 0) {
							r.push(`'limp dick slut.'`);
						} else if (slave.pregKnown === 1 && slave.bellyPreg >= 100) {
							r.push(`'pregnant cow.'`);
						} else if (slave.physicalAge > 35) {
							r.push(`'horny old bitch.'`);
						} else {
							r.push(`'sex slave.'`);
						}
						break;
					case "scenes":
						r.push(`${His} abdomen is tattooed with lewd scenes. It entices with a depiction of`);
						if (slave.dick !== 0) {
							if (slave.balls !== 0) {
								r.push(`sodomy of a shemale.`);
							} else {
								r.push(`sodomy of a gelding.`);
							}
						} else if (slave.vagina === -1) {
							r.push(`sodomy of a null.`);
						} else {
							r.push(`loving intercourse.`);
						}
						break;
					case "bovine patterns":
						r.push(`${His} abdomen is tattooed in a Holstein cow pattern.`);
						break;
					case "sacrilege":
						r.push(`${His} abdomen is tattooed with a variety of heretical symbols.`);
						break;
					case "sacrament":
						r.push(`${His} abdomen is tattooed with a variety of religious symbols.`);
						break;
					case "possessive":
						r.push(`${His} abdomen is tattooed with`);
						if (slave.dick > 0 && canAchieveErection(slave)) {
							r.push(`'Dick girl slave`);
						} else if (slave.dick > 0) {
							r.push(`'Limp dick slave`);
						} else if (slave.counter.births > 5) {
							r.push(`'Breeder slave`);
						} else if (slave.actualAge > 35) {
							r.push(`'MILF slave`);
						} else {
							r.push(`'Sex slave`);
						}
						r.push(`of ${getWrittenTitle(slave)} ${V.PC.slaveName}.'`);
						break;
					case "paternalist":
						r.push(`${His} abdomen is tattooed with a downward-pointing arrow which reads 'Let's come together.'`);
						break;
					case "lewd crest":
						r.push(`${His} lower abdomen is tattooed with a stylized silhouette that evokes the shape of ${slave.ovaries || slave.mpreg ? `${his}` : `a`} womb.`);
						break;
					default:
						r.push(pronounsForSlaveProp(slave, slave.vaginaTat));
						break;
				}
			}

			break;
		}
		case "dick": {
			if (slave.fuckdoll === 0) {
				if (slave.dick !== 0 && slave.dickTat !== 0) {
					switch (slave.dickTat) {
						case "tribal patterns":
							r.push(`${His} cock is tattooed with tribal patterns.`);
							break;
						case "flowers":
							r.push(`${His} cock is tattooed with a vine that wraps around its shaft.`);
							break;
						case "counting":
							if (slave.counter.penetrative === 0) {
								r.push(`There is a horizontal line tattooed around the base of ${his} dick for symbols counting ${his} penetrative exploits to be inscribed under, once ${he} has some.`);
							} else if (slave.counter.penetrative < 500) {
								r.push(`Tiny anus, pussy and mouth symbols are tattooed all over ${his} dick, recounting ${his} penetrative exploits.`);
							} else {
								r.push(`Tiny anus, pussy and mouth symbols are tattooed all over ${his} dick, recounting ${his} penetrative exploits. ${He} has so many that they radiate out across ${his} crotch, too.`);
							}
							break;
						case "advertisements":
							r.push(`${His} cock reads 'Sissy Slut.'`);
							break;
						case "rude words":
							r.push(`${His} cock reads 'Bitchstick.'`);
							break;
						case "degradation":
							if (slave.anus === 0) {
								r.push(`${His} cock reads '100% Virgin Anus.'`);
							} else {
								r.push(`${His} cock reads 'Comes When Assraped.'`);
							}
							break;
						case "Asian art":
							r.push(`${His} cock has an Asian dragon rushing down each side to the tip.`);
							break;
						case "bovine patterns":
							r.push(`${His} cock is tattooed to make it look a little like a bulls'.`);
							break;
						case "sacrilege":
							r.push(`${His} cock is covered in tiny words, each derived from a sacrilegious text.`);
							break;
						case "sacrament":
							r.push(`${His} cock is covered in tiny words, each derived from a sacred scripture.`);
							break;
						case "possessive":
							r.push(`${His} cock has an identification barcode tattooed on its side.`);
							break;
						case "paternalist":
							if (slave.anus === 0) {
								r.push(`${His} cock reads 'Still an Ass Virgin.'`);
							} else {
								r.push(`${His} cock reads 'Comes When Stroked.'`);
							}
							break;
						default:
							r.push(pronounsForSlaveProp(slave, slave.dickTat));
							break;
					}
				}
			}
			break;
		}
		case "anus": {
			/* Fuckdoll vulva and anus alone are visible, plus enormous lips */
			if (slave.anusTat !== 0) {
				switch (slave.anusTat) {
					case "bleached":
						r.push(`${His} anus is bleached.`);
						break;
					case "tribal patterns":
						r.push(`${His} anus is tattooed with a tribal pattern that changes interestingly when ${he} relaxes or tightens ${his} sphincter.`);
						break;
					case "flowers":
						r.push(`${He} has a huge blooming flower tattooed right over ${his} anus.`);
						break;
					case "counting":
						if (slave.counter.anal === 0) {
							r.push(`${He} has a dashed line tattooed around ${his} anus as a guideline for where ${his} anal count will be inscribed.`);
						} else if (slave.counter.anal < 1000) {
							r.push(`${He} has fine rings tattooed around ${his} anus, one for each hundred cocks.`);
						} else {
							r.push(`${He} has thick and fine rings tattooed around ${his} anus, for each thousand and hundred cocks.`);
						}
						break;
					case "advertisements":
						if (slave.vagina > -1) {
							r.push(`${He} has a ring of text tattooed around ${his} anus which reads 'Second Pussy.'`);
						} else {
							r.push(`${He} has a ring of text tattooed around ${his} anus which reads 'Spit First.'`);
						}
						break;
					case "rude words":
						if (slave.vagina > -1) {
							r.push(`${He} has a ring of text tattooed around ${his} anus which reads 'Fucktoy's Favorite Fuckhole.'`);
						} else {
							r.push(`${He} has a ring of text tattooed around ${his} anus which reads 'Sissy Slut's Sodomy Slit.'`);
						}
						break;
					case "degradation":
						r.push(`${His} anus is bleached. It is tattooed with gothic script in a ring around ${his} hole, reading '${getWrittenTitle(slave)} Made Me An Anal Slut.'`);
						break;
					case "bovine patterns":
						r.push(`${His} anus is tattooed to mimic the puffy, dark appearance of a cow's.`);
						break;
					case "sacrilege":
						r.push(`${He} has a ring of Aramaic text tattooed around ${his} anus, which translates to horrible blasphemy.`);
						break;
					case "sacrament":
						r.push(`${He} has a ring of Aramaic text tattooed around ${his} anus, which translates to a comforting blessing.`);
						break;
					case "possessive":
						r.push(`${He} has a ring of numbers around ${his} anus, detailing the date ${he} was enslaved by you.`);
						break;
					case "paternalist":
						r.push(`${His} anus is bleached. It is tattooed with text in a ring around ${his} hole, reading '${getWrittenTitle(slave)} Helped Me Love Anal.'`);
						break;
					case "Asian art":
						r.push(`${His} anus is bleached.`);
						break;
					default:
						r.push(pronounsForSlaveProp(slave, slave.anusTat));
						break;
				}
			}

			break;
		}
		case "thigh": { /* technically the old widget describes the ENTIRE leg, but we are going to display it here to preserve order */
			if (slave.fuckdoll === 0 && hasAnyLegs(slave)) {
				if (slave.legsTat !== 0) {
					let legs;
					if (!hasBothLegs(slave)) {
						legs = "leg";
					} else {
						legs = "legs";
					}
					switch (slave.legsTat) {
						case "tribal patterns":
							r.push(`${His} tribal tattoos run down ${his} ${legs}.`);
							break;
						case "flowers":
							r.push(`${His} floral tattoos run down ${his} ${legs}, with an especially beautiful bouquet of blooms sprayed across`);
							if (hasBothLegs(slave)) {
								r.push(`each`);
							} else {
								r.push(`${his}`);
							}
							r.push(`thigh.`);
							break;
						case "counting":
							r.push(`${His} thighs are used as space for tattoos that count the number of times ${he}'s done various degrading but nonsexual things.`);
							break;
						case "advertisements":
							r.push(`${His} thighs are used as simple ad space, promoting ${V.arcologies[0].name} and your business pursuits.`);
							break;
						case "rude words":
							r.push(`${His} left thigh reads '${SlaveTitle(slave)}' and the right 'slut.'`);
							break;
						case "degradation":
							if (slave.vagina < 0) {
								r.push(`${His} left thigh reads 'I Used To Fuck,' and the right 'But Now I Get Fucked.'`);
							} else {
								r.push(`${His} left thigh reads 'My Life Is Sex,' and the right 'All I'm Good For.'`);
							}
							break;
						case "Asian art":
							r.push(`A komainu is tattooed across ${his} right leg while a shishi graces ${his} left, the fierce lions guarding the way to ${his} "temple".`);
							break;
						case "scenes":
							r.push(`${He} has symmetrical tattoos on`);
							if (hasBothLegs(slave)) {
								r.push(`each`);
							} else {
								r.push(`${his}`);
							}
							r.push(`thigh depicting ${him} being spitroasted.`);
							break;
						case "bovine patterns":
							r.push(`${His} ${legs}`);
							if (hasBothLegs(slave)) {
								r.push(`are`);
							} else {
								r.push(`is`);
							}
							r.push(`covered in tattoos of spots, giving ${him} a noticeably bovine appearance.`);
							break;
						case "sacrilege":
							r.push(`${His} ${legs}`);
							if (hasBothLegs(slave)) {
								r.push(`are`);
							} else {
								r.push(`is`);
							}
							r.push(`covered in tattoos of swirling flames.`);
							break;
						case "sacrament":
							r.push(`${His} ${legs}`);
							if (hasBothLegs(slave)) {
								r.push(`are`);
							} else {
								r.push(`is`);
							}
							r.push(`covered in tattoos of swirling thorns.`);
							break;
						case "possessive":
							r.push(`${His} left thigh is tattooed with a stylized representation of your initials, and the right with a depiction of your personal symbol.`);
							break;
						case "paternalist":
							r.push(`${His} left thigh reads 'I Love My Life,' and the right 'Let Me Love Yours Too.'`);
							break;
						default:
							r.push(pronounsForSlaveProp(slave, slave.legsTat));
							break;
					}
				}
			}

			break;
		}
	}
	return r.join(" ");
};
