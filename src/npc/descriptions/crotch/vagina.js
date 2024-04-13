/**
 * @param {FC.GingeredSlave} slave
 * @param {boolean} [skills=true] If true then we describe how skilled the slave is, otherwise we omit it.
 * @returns {string}
 */
App.Desc.vagina = function(slave, skills = true) {
	const r = [];
	const {
		he, him, his, himself, He, His
	} = getPronouns(slave);

	if (slave.dick > 0) {
		if (slave.vagina > -1) {
			r.push(`${His}`);
			if (slave.genes === "XX" || slave.prestigeDesc && slave.prestigeDesc.includes("natural-born hermaphrodite")) {
				r.push(`beautifully natural`);
			} else if (slave.ovaries === 1) {
				r.push(`finely crafted`);
			} else {
				r.push(`artificial`);
			}
			r.push(`vagina is located beneath the base of ${his} penis,`);
			if (slave.fuckdoll > 0) {
				r.push(`just after the suit's material stops to bare ${his} front hole.`);
			} else if ((slave.scrotum > 3) && (slave.balls <= slave.scrotum)) {
				r.push(`though it is almost completely hidden by ${his} hanging ballsack.`);
			} else if ((slave.scrotum > 1) && (slave.balls > 0)) {
				r.push(`its upper part concealed by ${his} balls.`);
			} else if (canAchieveErection(slave)) {
				r.push(`and merges seamlessly into ${his} shaft.`);
			} else {
				if (slave.dick > 3) {
					r.push(`though it is almost completely hidden by ${his} soft cockmeat.`);
				} else {
					r.push(`which acts as a soft little dickclit for it.`);
				}
			}
			if (slave.clit === 0) {
				r.push(`The base of ${his} cock is located where the clitoris would be on a normal woman.`);
			}
		}
	}

	if (slave.vagina > -1) {
		if (slave.vagina === 0) {
			r.push(`${He} is a <span class="lime">virgin.</span> ${His} pussy is fresh,`);
		} else if (slave.vagina === 1) {
			r.push(`${His} pussy is tight and appealing,`);
		} else if (slave.vagina === 2) {
			r.push(`${His} pussy is reasonably tight,`);
		} else if (slave.vagina === 3) {
			r.push(`${His} pussy is loose,`);
		} else if (slave.vagina >= 10) {
			r.push(`${His} pussy has been completely ruined from hundreds of births. One could fit their arm into it with minimal effort and ${he} can barely get off from vaginal sex now. ${His} pussy is abyssal,`);
		} else if (slave.vagina > 3) {
			r.push(`${His} pussy is utterly cavernous,`);
		}

		if (slave.labia === 0) {
			r.push(`with minimal`);
		} else if (slave.labia === 1) {
			r.push(`with big puffy`);
		} else if (slave.labia === 2) {
			r.push(`with huge`);
		} else {
			r.push(`with huge dangling`);
		}

		if (V.seeRace === 1) {
			if (slave.geneticQuirks.albinism === 2) {
				r.push(`${slave.albinismOverride.skin} pussylips.`);
			} else if (slave.race === "white") {
				r.push(`pink pussylips.`);
			} else if (slave.race === "asian") {
				r.push(`dark ${slave.race} pussylips.`);
			} else if (slave.race === "middle eastern") {
				r.push(`dark ${slave.race} pussylips.`);
			} else if (slave.race === "latina") {
				r.push(`dark ${slave.race} pussylips.`);
			} else if (slave.race === "black") {
				r.push(`dark ${slave.race} pussylips.`);
			} else {
				r.push(`${slave.skin} pussylips.`);
			}
		} else {
			r.push(`${slave.skin} pussylips.`);
		}

		if (slave.vagina > -1) {
			if (slave.vaginaLube === 0) {
				if (slave.vagina > 0 && !(slave.chastityVagina)) {
					r.push(`${He} produces very little natural wetness, so ${he} is`);
					if (slave.fuckdoll === 0) {
						r.push(`required to keep ${himself}`);
					} else {
						r.push(`is kept`);
					}
					r.push(`artificially lubricated for anyone who wishes to use ${his} cunt.`);
				} else {
					r.push(`${He} produces very little natural wetness.`);
				}
				if (slave.prostate !== 0) {
					if (slave.dick === 0) {
						r.push(`In stark contrast, however, ${he}'s been given a functional prostate gland. It's attached to ${his} urethra, of course, so despite ${his} dryness, ${he} squirts`);
						if (slave.balls > 0) {
							r.push(`semen`);
						} else {
							r.push(`fluid`);
						}
						r.push(`when ${he} orgasms.`);
						if (slave.prostate > 2) {
							r.push(`With the implant embedded in it, that squirt is more like a blast; ${he} will soak ${himself} and anyone near ${him}.`);
						}
					}
				}
			} else if (slave.vaginaLube < 2) {
				if (slave.assignment === Job.DAIRY && V.dairyPregSetting > 1) {
					r.push(`The dildo's ejaculate includes a drug that causes copious, constant vaginal lubrication, allowing it to fuck ${him} despite its giant size. The excess female fluid drips off ${him} and into a catch basin.`);
				} else if ((slave.aphrodisiacs > 0) || (slave.inflationType === "aphrodisiac")) {
					r.push(`The aphrodisiacs have them`);
					if (slave.aphrodisiacs > 1 || (slave.inflationType === "aphrodisiac" && slave.inflation >= 2)) {
						r.push(`sopping`);
					}
					r.push(`wet.`);
				} else if (slave.energy > 95) {
					r.push(`As a nympho, ${he}'s almost constantly wet.`);
				} else if ((slave.fetishStrength > 60) && (slave.fetishKnown === 1)) {
					r.push(`Judging by how wet ${he} is, ${he}'s probably fantasizing about`);
					switch (slave.fetish) {
						case "buttslut":
							r.push(`being buttfucked.`);
							break;
						case "cumslut":
							r.push(`being facefucked.`);
							break;
						case "humiliation":
							r.push(`being humiliated.`);
							break;
						case "submissive":
							r.push(`submission.`);
							break;
						case "dom":
							r.push(`dominating someone.`);
							break;
						case "sadist":
							r.push(`hurting someone.`);
							break;
						case "masochist":
							r.push(`pain.`);
							break;
						case "pregnancy":
							if (slave.pregKnown) {
								r.push(`having another`);
								if (slave.pregType > 1) {
									r.push(`brood`);
								} else {
									r.push(`child`);
								}
								r.push(`after this one.`);
							} else {
								r.push(`getting pregnant.`);
							}
							break;
						case "boobs":
							r.push(`boobs.`);
							break;
						default:
							r.push(`getting fucked.`);
							break;
					}
				} else if (slave.devotion > 50) {
					r.push(`As a devoted sex slave, ${he} has no trouble keeping ${himself} wet for ${his} ${getWrittenTitle(slave)}.`);
				} else if (slave.devotion > 20) {
					r.push(`As an obedient sex slave, ${he} does ${his} best to keep ${himself} wet for ${his} ${getWrittenTitle(slave)}.`);
				}
				if (slave.prostate !== 0) {
					if (slave.dick === 0) {
						r.push(`Bizarrely, ${he}'s been given a functional prostate gland. It's attached to ${his} urethra, of course,`);
						if (slave.balls > 0) {
							r.push(`which in combination with ${his} testicles make ${his} squirt copious amounts of fluids and semen with each orgasm.`);
						} else {
							r.push(`so ${he} squirts copiously when ${he} orgasms.`);
						}
						if (slave.prostate > 2) {
							r.push(`With the implant embedded in it; that gush is more like a flood. Changes of clothes are a must with ${him}, as ${he} can and will soak both you, ${himself} and what ${he} is getting fucked over.`);
						}
					}
				}
			} else {
				if (slave.assignment === Job.DAIRY && V.dairyPregSetting > 1) {
					r.push(`The dildo's ejaculate includes a drug that encourages vaginal lubrication, which is having a drastic effect on ${him}, since ${he}'s already very gifted in that regard. The dildo makes a wet noise every time it thrusts into ${him}, and femcum streams into a catch basin beneath ${him}. The smell of pussy is overwhelming.`);
				} else if ((slave.aphrodisiacs > 0) || (slave.gingering && slave.gingering.type === "vasodilator") || (slave.inflationType === "aphrodisiac")) {
					r.push(`The combination of the aphrodisiacs and ${his} natural tendency to produce a lot of female lubricant is having a drastic effect. ${His} cunt is absolutely beribboned with femcum, and ${he} smells strongly of wet, clean pussy.`);
				} else if (slave.energy > 95) {
					r.push(`${He} has a naturally wet cunt, and in combination with ${his} nymphomania, it's soaking. ${He} smells of good clean female arousal.`);
				} else if ((slave.fetishStrength > 60) && (slave.fetishKnown === 1)) {
					r.push(`${His} naturally wet cunt is almost dripping female lubricant, and ${he} smells of good clean female arousal. ${He}'s probably fantasizing about`);
					switch (slave.fetish) {
						case "buttslut":
							r.push(`being buttfucked.`);
							break;
						case "cumslut":
							r.push(`being facefucked.`);
							break;
						case "humiliation":
							r.push(`being humiliated.`);
							break;
						case "submissive":
							r.push(`submission.`);
							break;
						case "dom":
							r.push(`dominating someone.`);
							break;
						case "sadist":
							r.push(`hurting someone.`);
							break;
						case "masochist":
							r.push(`pain.`);
							break;
						case "pregnancy":
							if (slave.pregKnown === 1) {
								r.push(`growing rounder.`);
							} else {
								r.push(`getting pregnant.`);
							}
							break;
						case "boobs":
							r.push(`boobs.`);
							break;
						default:
							r.push(`getting fucked.`);
					}
				} else if (slave.devotion > 50) {
					r.push(`${His} cunt is almost always soaking wet, but being near you has ${him} almost dripping.`);
				} else if (slave.devotion > 20) {
					r.push(`${His} cunt is almost always soaking wet, and being near you isn't affecting that.`);
				} else {
					r.push(`${His} cunt is almost always soaking wet, regardless of ${his} feelings.`);
				}
				if (slave.prostate !== 0) {
					if (slave.dick === 0) {
						r.push(`Bizarrely, ${he}'s been given a functional prostate gland. It's attached to ${his} urethra, of course,`);
						if (slave.balls > 0) {
							r.push(`which in combination with ${his} testicles make ${his} squirt unreasonable volume of fluids and semen with each orgasm.`);
						} else {
							r.push(`meaning that when ${he} orgasms, ${he} squirts an unreasonable volume of fluid.`);
						}
						if (slave.prostate > 2) {
							r.push(`With the implant embedded in it, that gush is insane. Everything around ${him} is at risk of being splashed. Changes of clothes are a must with ${him}, as are supplies to mop up afterwards.`);
						}
					}
				}
			}
		}
		if (slave.vaginalAccessory !== "none") {
			r.push(App.Desc.vaginalAccessory(slave));
		}
	}

	if ((slave.ovaries > 0 || slave.mpreg > 0) && slave.ovaryAge < 0) {
		r.push(`${His} ovaries have been replaced with genetically modified clones that will continue to produce new ova for as long as ${he} lives.`);
	}

	if (slave.ovaImplant !== 0) {
		switch (slave.ovaImplant) {
			case "fertility":
				r.push(`${His} ovaries have a pair of implants attached to them to encourage`);
				if (slave.preg < -1) {
					r.push(`ovulation, not that it does ${him} any good`);
				} else {
					r.push(`ovulation.`);
				}
				break;
			case "sympathy":
				r.push(`${His} ovaries have a pair of linked implants attached to them so that when one releases an egg the other does so as well.`);
				break;
			case "asexual":
				r.push(`One of ${his} ovaries has been replaced with a fabricated sperm sack designed to fertilize any eggs ${he} makes.`);
				break;
		}
	}

	if (slave.geneMods.progenitor === 1) {
		r.push(`${He} has been genetically treated to enhance ${his} ability to bear children.`);
		if (canGetPregnant(slave)) {
			r.push(`${His} body is very eager for that to happen, and at the rate it is keeping itself ready, early menopause is inevitable unless it is given what it wants.`);
		} else if (slave.preg > 0 && slave.pregKnown) {
			r.push(`Now that ${his} body has life growing within it, it is unlikely to let it go until it is fully ready.`);
		}
	}

	if (slave.dick === 0 && slave.balls === 0 && slave.vagina < 0 && V.arcologies[0].FSRestart > 60) {
		r.push(`Society looks fondly on ${his} complete inability to reproduce.`);
	}

	if (slave.dick === 0) {
		if (slave.clit > 0) {
			if (slave.foreskin === 0) {
				if (slave.clit === 1) {
					if (slave.devotion > 50) {
						r.push(`${His} clit is quite large and visibly hard.`);
					} else {
						r.push(`${His} clit is quite large.`);
					}
					r.push(`${His} lack of hood makes it even more prominent.`);
				} else if (slave.clit === 2) {
					if (slave.devotion > 50) {
						r.push(`${His} clit is huge and visibly erect.`);
					} else {
						r.push(`${His} clit is huge.`);
					}
					r.push(`${His} lack of hood, combined with its size, means ${he} can't wear any clothes without being constantly stimulated.`);
				} else if (slave.clit === 3) {
					if (slave.devotion > 50) {
						r.push(`${His} clit is enormous, and since it's erect with arousal, it juts out proudly.`);
					} else {
						r.push(`${His} clit is enormous, almost a pseudophallus.`);
					}
				} else if (slave.clit === 4) {
					if (slave.devotion > 50) {
						r.push(`${His} clit has reached the size of an average penis. It stands at attention, but due to lack of erectile tissues, it can't reach the same hardness a penis would.`);
					} else {
						r.push(`${His} clit has reached the size of an average penis.`);
					}
				} else {
					if (slave.devotion > 50) {
						r.push(`${His} clit is massive, having reached the size of a large penis. It is only semi-erect, since lack of erectile tissues means it can never become fully erect.`);
					} else {
						r.push(`${His} clit is massive, having reached the size of a large penis.`);
					}
				}
			} else if (slave.foreskin === 1) {
				if (slave.clit === 1) {
					if (slave.devotion > 50) {
						r.push(`${His} clit is quite large and visibly hard.`);
					} else {
						r.push(`${His} clit is quite large.`);
					}
					r.push(`${His} clitoral hood is stretched thin trying to cover it.`);
				} else if (slave.clit === 2) {
					if (slave.devotion > 50) {
						r.push(`${His} clit is huge and visibly erect.`);
					} else {
						r.push(`${His} clit is huge.`);
					}
					r.push(`${His} small hood is no longer able to cover it completely, and a large part of ${his} clitoris is always exposed.`);
				} else if (slave.clit === 3) {
					if (slave.devotion > 50) {
						r.push(`${His} clit is enormous, and since it's erect with arousal, it juts out proudly.`);
					} else {
						r.push(`${His} clit is enormous, almost a pseudophallus.`);
					}
					r.push(`${His} hood can no longer contain it and has slid back, causing ${his} clitoris to be always exposed.`);
				} else if (slave.clit === 4) {
					if (slave.devotion > 50) {
						r.push(`${His} clit has reached the size of an average penis. It stands at attention, but due to lack of erectile tissues, it can't reach the same hardness a penis would.`);
					} else {
						r.push(`${His} clit has reached the size of an average penis.`);
					}
					r.push(`${His} hood can no longer contain it and has slid back, causing ${his} clitoris to be always exposed.`);
				} else {
					if (slave.devotion > 50) {
						r.push(`${His} clit is massive, having reached the size of a large penis. It is only semi-erect, since lack of erectile tissues means it can never become fully erect.`);
					} else {
						r.push(`${His} clit is massive, having reached the size of a large penis.`);
					}
					r.push(`${His} hood can no longer contain it and has slid back, causing ${his} clitoris to be always exposed.`);
				}
			} else if (slave.foreskin === 2) {
				if (slave.clit === 1) {
					if (slave.devotion > 50) {
						r.push(`${His} clit is quite large and visibly hard.`);
					} else {
						r.push(`${His} clit is quite large.`);
					}
					r.push(`It is completely covered by its hood.`);
				} else if (slave.clit === 2) {
					if (slave.devotion > 50) {
						r.push(`${His} clit is huge and visibly erect.`);
					} else {
						r.push(`${His} clit is huge.`);
					}
					r.push(`Its hood is stretched thin trying to cover it.`);
				} else if (slave.clit === 3) {
					if (slave.devotion > 50) {
						r.push(`${His} clit is enormous, and since it's erect with arousal, it juts out proudly.`);
					} else {
						r.push(`${His} clit is enormous, almost a pseudophallus.`);
					}
					r.push(`It's large enough that the hood can cover only half of it.`);
				} else if (slave.clit === 4) {
					if (slave.devotion > 50) {
						r.push(`${His} clit has reached the size of an average penis. It stands at attention, but due to lack of erectile tissues, it can't reach the same hardness a penis would.`);
					} else {
						r.push(`${His} clit has reached the size of an average penis.`);
					}
					r.push(`${His} hood can no longer contain it and has slid back, causing ${his} clitoris to be always exposed.`);
				} else {
					if (slave.devotion > 50) {
						r.push(`${His} clit is massive, having reached the size of a large penis. It is only semi-erect, since lack of erectile tissues means it can never become fully erect.`);
					} else {
						r.push(`${His} clit is massive, having reached the size of a large penis.`);
					}
					r.push(`${His} hood can no longer contain it and has slid back, causing ${his} clitoris to be always exposed.`);
				}
			} else if (slave.foreskin === 3) {
				if (slave.clit === 1) {
					if (slave.devotion > 50) {
						r.push(`${His} clit is quite large and visibly hard.`);
					} else {
						r.push(`${His} clit is quite large.`);
					}
					r.push(`However, the hood covering it is also quite large, making stimulation difficult.`);
				} else if (slave.clit === 2) {
					if (slave.devotion > 50) {
						r.push(`${His} clit is huge and visibly erect.`);
					} else {
						r.push(`${His} clit is huge.`);
					}
					r.push(`${His} large hood completely covers it.`);
				} else if (slave.clit === 3) {
					if (slave.devotion > 50) {
						r.push(`${His} clit is enormous, and since it's erect with arousal, it juts out proudly.`);
					} else {
						r.push(`${His} clit is enormous, almost a pseudophallus.`);
					}
					r.push(`${His} large hood covers all but the tip of ${his} clit, even when aroused.`);
				} else if (slave.clit === 4) {
					if (slave.devotion > 50) {
						r.push(`${His} clit has reached the size of an average penis. It stands at attention, but due to lack of erectile tissues, it can't reach the same hardness a penis would.`);
					} else {
						r.push(`${His} clit has reached the size of an average penis.`);
					}
					r.push(`Even ${his} large hood can't cover it, leaving over half of the clit exposed.`);
				} else {
					if (slave.devotion > 50) {
						r.push(`${His} clit is massive, having reached the size of a large penis. It is only semi-erect, since lack of erectile tissues means it can never become fully erect.`);
					} else {
						r.push(`${His} clit is massive, having reached the size of a large penis.`);
					}
					r.push(`${His} hood can no longer contain it and has slid back, causing ${his} clitoris to be always exposed.`);
				}
			} else {
				if (slave.clit === 1) {
					if (slave.devotion > 50) {
						r.push(`${His} clit is quite large and visibly hard.`);
					} else {
						r.push(`${His} clit is quite large.`);
					}
					r.push(`However, the large, thick hood covering it makes any stimulation difficult.`);
				} else if (slave.clit === 2) {
					if (slave.devotion > 50) {
						r.push(`${His} clit is huge and visibly erect.`);
					} else {
						r.push(`${His} clit is huge.`);
					}
					r.push(`However, the large, thick hood covering it makes any stimulation difficult.`);
				} else if (slave.clit === 3) {
					if (slave.devotion > 50) {
						r.push(`${His} clit is enormous, and since it's erect with arousal, it juts out proudly.`);
					} else {
						r.push(`${His} clit is enormous, almost a pseudophallus.`);
					}
					r.push(`Matching its size is the thick hood covering it.`);
				} else if (slave.clit === 4) {
					if (slave.devotion > 50) {
						r.push(`${His} clit has reached the size of an average penis. It stands at attention, but due to lack of erectile tissues, it can't reach the same hardness a penis would.`);
					} else {
						r.push(`${His} clit has reached the size of an average penis.`);
					}
					r.push(`${His} large hood covering over half of it adds to its penis-like appearance.`);
				} else {
					if (slave.devotion > 50) {
						r.push(`${His} clit is massive, having reached the size of a large penis. It is only semi-erect, since lack of erectile tissues means it can never reach full erection.`);
					} else {
						r.push(`${His} clit is massive, having reached the size of a large penis.`);
					}
					r.push(`Not even its large hood can contain it, leaving over half of it exposed.`);
				}
			}
		}
	}

	r.push(App.Desc.mods(slave, "vagina"));
	r.push(App.Desc.mods(slave, "genitals"));

	if (slave.fuckdoll === 0) {
		if (slave.rules.release.masturbation === 1) {
			if ((slave.aphrodisiacs > 0 || slave.inflationType === "aphrodisiac") && slave.drugs !== "priapism agents") {
				if ((slave.aphrodisiacs > 1) || (slave.inflationType === "aphrodisiac" && slave.inflation > 1)) {
					if (slave.dick !== 0 && slave.hormoneBalance >= 100 && (!hasAnyArms(slave))) {
						r.push(`The extreme dose of aphrodisiacs combined with the hormones that keep ${him} flaccid have ${him} in a state of extreme sexual frustration; ${he}'s`);
						if ((slave.fetish === "buttslut") || ((slave.sexualFlaw !== "hates anal") && (slave.counter.anal > 9))) {
							r.push(`unconsciously humping ${his} ass against whatever's next to ${him} for anal stimulation and`);
						}
						r.push(`humping ${his} dick against whatever ${he} can manage to mount without limbs.`);
						if (slave.inflationType === "aphrodisiac") {
							r.push(`${His} efforts force ${his} distended middle to jiggle around, stirring up the aphrodisiacs contained in ${his} gut and strengthening their effects even more.`);
						}
					} else if ((slave.dick !== 0) && (slave.balls > 0) && slave.ballType === "sterile" && (!hasAnyArms(slave))) {
						r.push(`The extreme dose of aphrodisiacs combined with the chemical castration that keeps ${him} flaccid have ${him} in a state of extreme sexual frustration; ${he}'s`);
						if ((slave.fetish === "buttslut") || ((slave.sexualFlaw !== "hates anal") && (slave.counter.anal > 9))) {
							r.push(`unconsciously humping ${his} ass against whatever's next to ${him} for anal stimulation and`);
						}
						r.push(`humping ${his} limp dick against whatever ${he} can manage to mount without limbs.`);
						if (slave.inflationType === "aphrodisiac") {
							r.push(`${His} efforts force ${his} distended middle to jiggle around, stirring up the aphrodisiacs contained in ${his} gut and strengthening their effects even more.`);
						}
					} else if ((slave.dick !== 0) && (slave.balls === 0) && (!hasAnyArms(slave))) {
						r.push(`The extreme dose of aphrodisiacs combined with the lack of balls that keeps ${him} flaccid have ${him} in a state of extreme sexual frustration; ${he}'s`);
						if ((slave.fetish === "buttslut") || ((slave.sexualFlaw !== "hates anal") && (slave.counter.anal > 9))) {
							r.push(`unconsciously humping ${his} ass against whatever's next to ${him} for anal stimulation and`);
						}
						r.push(`humping ${his} limp dick against whatever ${he} can manage to mount without limbs.`);
						if (slave.inflationType === "aphrodisiac") {
							r.push(`${His} efforts force ${his} distended middle to jiggle around, stirring up the aphrodisiacs contained in ${his} gut and strengthening their effects even more.`);
						}
					} else if ((slave.dick !== 0) && (slave.hormoneBalance >= 100)) {
						r.push(`The extreme dose of aphrodisiacs combined with the hormones that keep ${him} flaccid have ${him} in a state of extreme sexual frustration; ${he}'s rubbing ${his} limp dick`);
						if ((slave.fetish === "buttslut") || ((slave.sexualFlaw !== "hates anal") && (slave.counter.anal > 9))) {
							r.push(`distractedly and unconsciously humping ${his} ass against whatever's next to ${him} for anal stimulation.`);
						} else {
							r.push(`distractedly.`);
						}
						if (slave.inflationType === "aphrodisiac") {
							r.push(`${His} efforts force ${his} distended middle to jiggle around, stirring up the aphrodisiacs contained in ${his} gut and strengthening their effects even more.`);
						}
					} else if ((slave.dick !== 0) && (slave.balls === 0)) {
						r.push(`The extreme dose of aphrodisiacs combined with the lack of balls that keeps ${him} flaccid have ${him} in a state of extreme sexual frustration; ${he}'s rubbing ${his} limp dick`);
						if ((slave.fetish === "buttslut") || ((slave.sexualFlaw !== "hates anal") && (slave.counter.anal > 9))) {
							r.push(`distractedly and unconsciously humping ${his} ass against whatever's next to ${him} for anal stimulation.`);
						} else {
							r.push(`distractedly.`);
						}
						if (slave.inflationType === "aphrodisiac") {
							r.push(`${His} efforts force ${his} distended middle to jiggle around, stirring up the aphrodisiacs contained in ${his} gut and strengthening their effects even more.`);
						}
					} else if ((slave.dick !== 0) && !canAchieveErection(slave)) {
						r.push(`The extreme dose of aphrodisiacs combined with ${his} inability to become erect have ${him} in a state of extreme sexual frustration; ${he}'s rubbing ${his} limp dick`);
						if ((slave.fetish === "buttslut") || ((slave.sexualFlaw !== "hates anal") && (slave.counter.anal > 9))) {
							r.push(`distractedly and unconsciously humping ${his} ass against whatever's next to ${him} for anal stimulation.`);
						} else {
							r.push(`distractedly.`);
						}
						if (slave.inflationType === "aphrodisiac") {
							r.push(`${His} efforts force ${his} distended middle to jiggle around, stirring up the aphrodisiacs contained in ${his} gut and strengthening their effects even more.`);
						}
					} else if (slave.dick !== 0) {
						r.push(`The extreme dose of aphrodisiacs has ${his} cock painfully erect and leaves precum dripping from its head.`);
					}
				} else {
					if (slave.dick !== 0 && slave.hormoneBalance >= 100 && (!hasAnyArms(slave))) {
						r.push(`The aphrodisiacs combined with the hormones that keep ${him} flaccid have ${him} sexually frustrated; ${he}'s`);
						if ((slave.fetish === "buttslut") || ((slave.sexualFlaw !== "hates anal") && (slave.counter.anal > 9))) {
							r.push(`unconsciously rubbing ${his} ass against whatever's next to ${him}, and`);
						}
						r.push(`humping ${his} dick against whatever ${he} can manage to mount without limbs.`);
						if (slave.inflationType === "aphrodisiac") {
							r.push(`${His} efforts force ${his} distended middle to jiggle around, stirring up the aphrodisiacs contained in ${his} gut and strengthening their effects even more.`);
						}
					} else if ((slave.dick !== 0) && (slave.balls > 0) && slave.ballType === "sterile" && (!hasAnyArms(slave))) {
						r.push(`The aphrodisiacs combined with the chemical castration that keeps ${him} flaccid have ${him} sexually frustrated; ${he}'s`);
						if ((slave.fetish === "buttslut") || ((slave.sexualFlaw !== "hates anal") && (slave.counter.anal > 9))) {
							r.push(`unconsciously rubbing ${his} ass against whatever's next to ${him}, and`);
						}
						r.push(`humping ${his} dick against whatever ${he} can manage to mount without limbs.`);
						if (slave.inflationType === "aphrodisiac") {
							r.push(`${His} efforts force ${his} distended middle to jiggle around, stirring up the aphrodisiacs contained in ${his} gut and strengthening their effects even more.`);
						}
					} else if ((slave.dick !== 0) && (slave.balls === 0) && (!hasAnyArms(slave))) {
						r.push(`The aphrodisiacs combined with the lack of balls that keeps ${him} flaccid have ${him} sexually frustrated; ${he}'s`);
						if ((slave.fetish === "buttslut") || ((slave.sexualFlaw !== "hates anal") && (slave.counter.anal > 9))) {
							r.push(`unconsciously rubbing ${his} ass against whatever's next to ${him}, and`);
						}
						r.push(`humping ${his} dick against whatever ${he} can manage to mount without limbs.`);
						if (slave.inflationType === "aphrodisiac") {
							r.push(`${His} efforts force ${his} distended middle to jiggle around, stirring up the aphrodisiacs contained in ${his} gut and strengthening their effects even more.`);
						}
					} else if ((slave.dick !== 0) && (slave.hormoneBalance >= 100)) {
						r.push(`The aphrodisiacs combined with the hormones that keep ${him} flaccid have ${him} sexually frustrated; ${he}'s touching ${his} limp dick`);
						if ((slave.fetish === "buttslut") || ((slave.sexualFlaw !== "hates anal") && (slave.counter.anal > 9))) {
							r.push(`distractedly and unconsciously rubbing ${his} ass against whatever's next to ${him}.`);
						} else {
							r.push(`distractedly.`);
						}
						if (slave.inflationType === "aphrodisiac") {
							r.push(`${His} efforts force ${his} distended middle to jiggle around, stirring up the aphrodisiacs contained in ${his} gut and strengthening their effects even more.`);
						}
					} else if ((slave.dick !== 0) && (slave.balls === 0)) {
						r.push(`The aphrodisiacs combined with the lack of balls that keeps ${him} flaccid have ${him} sexually frustrated; ${he}'s touching ${his} limp dick`);
						if ((slave.fetish === "buttslut") || ((slave.sexualFlaw !== "hates anal") && (slave.counter.anal > 9))) {
							r.push(`distractedly and unconsciously rubbing ${his} ass against whatever's next to ${him}.`);
						} else {
							r.push(`distractedly.`);
						}
						if (slave.inflationType === "aphrodisiac") {
							r.push(`${His} efforts force ${his} distended middle to jiggle around, stirring up the aphrodisiacs contained in ${his} gut and strengthening their effects even more.`);
						}
					}
				}
			}
		}
	}

	if (skills) {
		if (slave.fuckdoll > 0) {
			if (slave.vagina > 0) {
				r.push(`${His} front hole`);
				if (slave.fuckdoll <= 45) {
					r.push(`is mostly useful when ${he}'s restrained for rape.`);
				} else {
					r.push(`will massage`);
					if (V.PC.dick !== 0) {
						r.push(`cocks`);
					} else {
						r.push(`anything`);
					}
					r.push(`placed inside it on command.`);
					if (slave.fuckdoll <= 85) {
						r.push(`${He} is even capable of riding`);
						if (V.PC.dick !== 0) {
							r.push(`dick.`);
						} else {
							r.push(`a strap-on.`);
						}
					}
				}
			}
		} else {
			let skillBoth = slave.vagina >= 0 && slave.dick === 0 && (canPenetrate(slave) || penetrativeSocialUse(slave) >= 40) ? `</span> ${(slave.skill.vaginal > 10 && slave.skill.penetrative > 10) || (slave.skill.vaginal <= 10 && slave.skill.penetrative <= 10) ? "and" : "but"} ${he} is` : `.</span>`;
			if (slave.vagina === -1) {
				if (V.seeDicks < 100 && slave.anus !== 0) {
					r.push(`Since ${he} lacks a vagina, ${he} takes it up`);
					if (V.seeRace === 1) {
						r.push(`${his} ${slave.race}`);
					} else {
						r.push(`the`);
					}
					r.push(`ass instead.`);
				}
			} else if (slave.skill.vaginal >= 100) {
				r.push(`${He} is a <span class="skill">vanilla sex master${skillBoth}`);
			} else if (slave.skill.vaginal > 60) {
				r.push(`${He} is a <span class="skill">vanilla sex expert${skillBoth}`);
			} else if (slave.skill.vaginal > 30) {
				r.push(`${He} is <span class="skill">skilled at vanilla sex${skillBoth}`);
			} else if (slave.skill.vaginal > 10) {
				r.push(`${He} has <span class="skill">basic knowledge about vanilla sex${skillBoth}`);
			} else {
				r.push(`${He} is unskilled at vaginal sex${skillBoth}`);
			}
			if (slave.dick === 0) {
				if (canPenetrate(slave)) {
					if (slave.skill.penetrative >= 100) {
						r.push(`a <span class="skill">penetrative sex master.</span>`);
					} else if (slave.skill.penetrative > 60) {
						r.push(`an <span class="skill">expert at penetrative sex.</span>`);
					} else if (slave.skill.penetrative > 30) {
						r.push(`<span class="skill">skilled at penetrating others.</span>`);
					} else if (slave.skill.penetrative > 10) {
						r.push(`<span class="skill">capable of basic penetrative sex.</span>`);
					} else {
						if (penetrativeSocialUse(slave) >= 40) {
							r.push(`clueless at how to penetrate others.`);
						} else {
							r.push(`unskilled at using ${his} ${clitDesc(slave)} for penetration.`);
						}
					}
				} else if (penetrativeSocialUse(slave) >= 40 && slave.vagina >= 0) {
					if (slave.skill.penetrative >= 100) {
						r.push(`a <span class="skill">penetrative sex master</span>`);
					} else if (slave.skill.penetrative > 60) {
						r.push(`an <span class="skill">expert at penetrative sex</span>`);
					} else if (slave.skill.penetrative > 30) {
						r.push(`<span class="skill">skilled at penetrating others</span>`);
					} else if (slave.skill.penetrative > 10) {
						r.push(`<span class="skill">capable of basic penetrative sex</span>`);
					} else {
						r.push(`clueless at how to penetrate others`);
					}
					r.push(`using toys${hasAnyArms(slave) ? ` or ${his} fingers` : ""}.`);
				}
			}
		}
	}

	r.push(App.Desc.mods(slave, "pubic mound"));

	const pubertyAge = Math.min(slave.pubertyAgeXX, slave.pubertyAgeXY);

	if (slave.race === "catgirl") {
		if (slave.pubicHStyle === "hairless" || slave.pubicHStyle === "bald" || slave.pubicHStyle === "waxed" || slave.pubicHStyle === "shaved") {
			r.push(`${His} ${slave.skin} pubic fur is silky and indistinguishable from the rest of ${his} fur.`);
		} else if (slave.pubicHStyle === "in a strip") {
			r.push(`${He} has a cute line of ${slave.pubicHColor} fur just above ${his} crotch.`);
		} else if (slave.pubicHStyle === "neat") {
			r.push(`${He} has a neat patch of ${slave.pubicHColor} fur above ${his} crotch.`);
		} else if (slave.pubicHStyle === "bushy" || slave.pubicHStyle === "bushy in the front and neat in the back") {
			r.push(`${His} ${slave.pubicHColor} fur is particularly bushy around ${his} crotch.`);
		} else if (slave.pubicHStyle === "very bushy") {
			r.push(`${He} has a veritable bush of ${slave.pubicHColor} fur around ${his} crotch that flares out to ${his} thighs.`);
		}
	} else if (slave.physicalAge < pubertyAge - 2) {
		r.push(`${He} is too sexually immature to have pubic hair.`);
	} else if (slave.pubicHStyle === "hairless") {
		r.push(`${He}'s naturally smooth and hairless.`);
	} else if (slave.pubicHStyle === "bald") {
		r.push(`${He} is no longer able to grow pubic hair, leaving ${him} hairless and smooth.`);
	} else if (slave.pubicHStyle === "waxed") {
		if (slave.fuckdoll > 0 || (slave.assignment === Job.DAIRY && V.dairyRestraintsSetting > 1)) {
			r.push(`${His} pubic hair has been removed to prevent chafing.`);
		} else {
			r.push(`${He}'s waxed and smooth.`);
		}
	} else if (slave.physicalAge < pubertyAge - 1) {
		r.push(`${He} has a few wisps of pubic hair.`);
	} else if (slave.physicalAge < pubertyAge) {
		r.push(`${He} is on the verge of puberty and has a small patch of ${slave.pubicHColor} pubic hair above ${his}`);
		if (slave.dick > 0) {
			r.push(`cock.`);
		} else if (slave.vagina === -1) {
			r.push(`smoothness.`);
		} else {
			r.push(`pussy.`);
		}
	} else if (slave.pubicHStyle === "in a strip") {
		r.push(`${His} ${slave.pubicHColor} pubic hair is waxed into a narrow strip above ${his}`);
		if (slave.dick > 0) {
			r.push(`cock.`);
		} else if (slave.vagina === -1) {
			r.push(`smoothness.`);
		} else {
			r.push(`pussy.`);
		}
	} else if (slave.pubicHStyle === "neat") {
		r.push(`${His} ${slave.pubicHColor} pubic hair is waxed into a neat patch above ${his}`);
		if (slave.dick > 0) {
			r.push(`cock.`);
		} else if (slave.vagina === -1) {
			r.push(`smoothness.`);
		} else {
			r.push(`pussy.`);
		}
	} else if (slave.pubicHStyle === "bushy in the front and neat in the rear") {
		r.push(`${His} ${slave.pubicHColor} pubic hair forms a natural bush above ${his}`);
		if (slave.dick > 0) {
			r.push(`cock.`);
		} else if (slave.vagina === -1) {
			r.push(`smoothness.`);
		} else {
			r.push(`pussy.`);
		}
	} else if (slave.pubicHStyle === "bushy") {
		r.push(`${His} ${slave.pubicHColor} pubic hair forms a natural bush above ${his}`);
		if (slave.dick > 0) {
			r.push(`cock.`);
		} else if (slave.vagina === -1) {
			r.push(`smoothness.`);
		} else {
			r.push(`pussy.`);
		}
	} else if (slave.pubicHStyle === "very bushy") {
		r.push(`${His} ${slave.pubicHColor} pubic hair forms a dense bush above ${his}`);
		if (slave.dick > 0) {
			r.push(`cock`);
		} else if (slave.vagina === -1) {
			r.push(`smoothness`);
		} else {
			r.push(`pussy`);
		}
		r.push(`that trails up to ${his} navel.`);
	}

	return r.join(" ");
};
