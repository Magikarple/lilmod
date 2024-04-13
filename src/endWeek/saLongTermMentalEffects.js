/**
 * @param {FC.ReportSlave} slave
 * @returns {string}
 */
App.SlaveAssignment.longTermMentalEffects = function saLongTermMentalEffects(slave) {
	const r = [];

	const {
		he, him, his, himself, girl, He, His,
	} = getPronouns(slave);

	if (slave.fetish === Fetish.MINDBROKEN) {
		applyMindbroken(slave);
	} else if (slave.fuckdoll === 0) {
		asexualOvariesBurnout(slave);
		sexualAttraction(slave);
		if (slave.behavioralQuirk !== BehavioralQuirk.NONE) {
			behavioralQuirkEffects(slave);
		}
		if (slave.sexualQuirk !== SexualQuirk.NONE) {
			sexualQuirkEffects(slave);
		}
		if (slave.fetishKnown === 1) {
			fetishEffects(slave);
		}
		if (slave.behavioralFlaw !== BehavioralFlaw.NONE) { // Moved out of .fetishKnown for the devout block to be more prominent.
			behavioralFlawEffects(slave);
		}
		if (slave.sexualFlaw !== SexualFlaw.NONE) {
			sexualFlawEffects(slave);
			paraphiliaImpacts(slave);
		}
		if (slave.energy > 95) {
			nymphoDevotionGain(slave);
		}
		careerEffects(slave);
	}
	r.push(App.SlaveAssignment.saSmartPiercingEffects(slave));
	if (slave.fetish !== Fetish.MINDBROKEN && slave.fuckdoll === 0) {
		organicFetishDevelopments(slave);
		if (slave.fetishKnown !== 0 && slave.fetish !== Fetish.NONE) {
			paraphiliaAcquisition(slave);
		}
	}

	return r.join(" ");

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function asexualOvariesBurnout(slave) {
		if (slave.ovaImplant === OvaryImplantType.ASEXUAL && isFertile(slave) && (slave.preg === 0 || (slave.preg >= 0 && slave.geneticQuirks.superfetation === 2))) {
			r.push(`The frequent internal ejaculations and accompanying climaxes brought about by ${his} ovarian modifications keeps ${him} sexually sated.`);
			if (slave.energy >= 10 && (slave.attrXY >= 10 || slave.attrXX >= 10)) {
				r.push(`However, the constant self-gratification both <span class="stat drop">damages what ${he} finds attractive</span> and <span class="libido dec">leaves sex less satisfying.</span>`);
				slave.energy -= 10;
				slave.attrXY = Math.clamp(slave.attrXY - 10, 0, 100);
				slave.attrXX = Math.clamp(slave.attrXX - 10, 0, 100);
			} else if (slave.energy >= 10) {
				r.push(`However, the constant self-gratification <span class="libido dec">leaves sex less satisfying.</span>`);
				slave.energy -= 10;
			} else if (slave.attrXY >= 10 || slave.attrXX >= 10) {
				r.push(`However, the constant self-gratification <span class="stat drop">twists what ${he} finds attractive.</span>`);
				slave.attrXY = Math.clamp(slave.attrXY - 10, 0, 100);
				slave.attrXX = Math.clamp(slave.attrXX - 10, 0, 100);
			}
			slave.need = 0;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function sexualAttraction(slave) {
		let t = [];
		if (slave.attrXY <= 35) {
			if (slave.energy >= 20) {
				if (slave.fetish === Fetish.SUBMISSIVE) {
					if (slave.fetishKnown === 1) {
						t.push(`Recently, ${he}'s been fantasizing about submitting to big strong men. ${His} revulsion at the idea of sex with a man <span class="positive">mellows.</span>`);
					}
					slave.attrXY += 3;
				} else if (slave.fetish === Fetish.BUTTSLUT) {
					if (slave.fetishKnown === 1) {
						t.push(`Recently, ${he}'s been reconsidering ${his} reluctance to be sodomized by a man. ${His} revulsion at the idea of sex with a man <span class="positive">mellows.</span>`);
					}
					slave.attrXY += 3;
				} else if (slave.fetish === Fetish.PREGNANCY) {
					if (slave.fetishKnown === 1) {
						t.push(`Recently, ${he}'s been fantasizing about getting knocked up. ${His} revulsion at the idea of sex with a man <span class="positive">mellows.</span>`);
					}
					slave.attrXY += 3;
				}
				if (slave.behavioralQuirk === BehavioralQuirk.ADORESMEN) {
					t.push(`${He} enjoys spending time with men, and starts to <span class="positive">reconsider ${his} unwillingness to be fucked by men.</span>`);
					slave.attrXY += 3;
				}
				if (slave.dick > 0) {
					if (slave.energy >= 40) {
						if (slave.counter.anal > 0 && canDoAnal(slave)) {
							t.push(`Every time ${he} cums with a dick up ${his} ass, ${his} <span class="positive">resistance to sex with men is worn away.</span>`);
							slave.attrXY += 3;
						}
					}
				}
				if (slave.devotion > random(1, 100)) {
					t.push(`The atmosphere in your arcology is so ubiquitously sexual that ${he} <span class="positive">reconsiders ${his} unwillingness to have sex with men.</span>`);
					slave.attrXY += 3;
				}
			} else {
				t.push(`${His} weak libido limits natural development of ${his} sexuality.`);
			}
			if (slave.devotion >= -20) {
				if (slave.genes === GenderGenes.MALE) {
					switch (random(1, 5)) {
						case 1:
							if (slave.piercing.nose.weight) {
								t.push(`${He}'s fascinated by ${his}`);
								if (slave.piercing.nose.weight > 1) {
									t.push(`slutty nose piercings, and unconsciously thinks of ${himself} as <span class="positive">prettier and more suited to take dick.</span>`);
								} else {
									t.push(`nice little nasal piercing, and feels like <span class="positive">more of a girly girl.</span>`);
								}
								slave.attrXY += 1;
							}
							break;
						case 2:
							if (slave.piercing.eyebrow.weight) {
								t.push(`${His}`);
								if (slave.piercing.eyebrow.weight > 1) {
									t.push(`degrading eyebrow piercings make ${him} feel <span class="positive">a little less disinclined to accept being on the bottom.</span>`);
								} else {
									t.push(`cute eyebrow piercing makes ${him} feel <span class="positive">a little girlier.</span>`);
								}
								slave.attrXY += 1;
							}
							break;
						case 3:
							if (slave.piercing.lips.weight) {
								t.push(`${He} kind of likes ${his} `);
								if (slave.piercing.lips.weight > 1) {
									t.push(`whorish lip ring, and seems <span class="positive">less disturbed by the idea of ${his} mouth as a fuckhole.</span>`);
								} else {
									t.push(`pretty little lip piercing, and feels like <span class="positive">${he} has a nice mouth.</span>`);
								}
								slave.attrXY += 1;
							}
							break;
						case 4:
							if (slave.piercing.navel.weight) {
								t.push(`${He} sometimes`);
								if (canSee(slave)) {
									t.push(`stares at`);
								} else {
									t.push(`considers`);
								}
								t.push(`${his}`);
								if (slave.piercing.navel.weight > 1) {
									t.push(`navel chain, turning this way and that to make it move, unconsciously <span class="positive">getting used to ${his} fuckable body.</span>`);
								} else {
									t.push(`little feminine navel piercing, and seems to think <span class="positive">${his} lower half is kind of pretty.</span>`);
								}
								slave.attrXY += 1;
							}
							break;
						case 5:
							if (slave.piercing.ear.weight) {
								if (canSee(slave)) {
									t.push(`Every morning, ${he}'s greeted by ${his} girly reflection in the mirror,`);
									if (slave.piercing.ear.weight > 1) {
										t.push(`whose slutty ear piercings make ${him} <span class="positive">feel more fuckable.</span>`);
									} else {
										t.push(`complete with pretty pierced ears <span class="positive">like a good slave girl.</span>`);
									}
								} else {
									t.push(`${His} girly pierced ears make ${him} feel `);
									if (slave.piercing.ear.weight > 1) {
										t.push(`<span class="positive">like a hot slut.</span>`);
									} else {
										t.push(`<span class="positive">like a cute girl.</span>`);
									}
								}
								slave.attrXY += 1;
							}
							break;
					}
				}
			}
		} else if (slave.attrXY <= 65) {
			if (slave.energy >= 40) {
				if (slave.fetish === Fetish.SUBMISSIVE) {
					if (slave.fetishKnown === 1) {
						t.push(`${He}'s found ${himself} enjoying watching big strong men use other slaves recently. ${He}'s now <span class="positive">more attracted to men.</span>`);
					}
					slave.attrXY += 3;
				} else if (slave.fetish === Fetish.BUTTSLUT) {
					if (slave.fetishKnown === 1) {
						t.push(`${He}'s started fantasizing about cocks being shoved up ${his} butt even when there are no cocks being shoved up ${his} butt. ${He}'s now <span class="positive">more attracted to men.</span>`);
					}
					slave.attrXY += 3;
				} else if (slave.fetish === Fetish.PREGNANCY) {
					if (slave.fetishKnown === 1) {
						t.push(`${His} fantasies about pregnancy have become quite vivid; ${he} loves ${slave.counter.vaginal === 0 ? `the idea of` : ``} hot cum jetting into ${him}. ${He}'s now <span class="positive">more attracted to men.</span>`);
					}
					slave.attrXY += 3;
				}
				if (slave.behavioralQuirk === BehavioralQuirk.ADORESMEN) {
					t.push(`${He} enjoys spending time with men, and is now <span class="positive">more attracted to men.</span>`);
					slave.attrXY += 3;
				}
				if (slave.dick > 0) {
					if (slave.energy >= 60) {
						if (slave.counter.anal > 0) {
							t.push(`Every time ${he} cums to the feeling of a cock thrusting deep inside ${him}, ${his} <span class="positive">indifference to men is reduced.</span>`);
							slave.attrXY += 3;
						}
					}
				}
				if (slave.devotion > random(1, 200)) {
					t.push(`The atmosphere in your arcology is so ubiquitously sexual that ${he} has become <span class="positive">more attracted to men.</span>`);
					slave.attrXY += 3;
				}
			} else {
				t.push(`${His} poor sex drive limits natural development of ${his} sexuality.`);
			}
		} else if (slave.attrXY <= 85) {
			if (slave.energy >= 60) {
				if (slave.fetish === Fetish.SUBMISSIVE) {
					if (slave.fetishKnown === 1) {
						t.push(`${He} can no longer see a man without fantasizing about how it would feel if he held ${him} down. ${He}'s now <span class="positive">more aroused by men.</span>`);
					}
					slave.attrXY += 3;
				} else if (slave.fetish === Fetish.BUTTSLUT) {
					if (slave.fetishKnown === 1) {
						t.push(`${He} can't see a man without doing ${his} best to get his hard cock inside ${him}. ${He}'s now <span class="positive">more aroused by men.</span>`);
					}
					slave.attrXY += 3;
				} else if (slave.fetish === Fetish.PREGNANCY) {
					if (slave.fetishKnown === 1) {
						t.push(`${He} can't see a man without doing ${his} best to get his hot seed into ${his} body. ${He}'s now <span class="positive">more aroused by men.</span>`);
					}
					slave.attrXY += 3;
				}
				if (slave.dick > 0) {
					if (slave.energy >= 80) {
						if (slave.counter.anal > 0) {
							t.push(`${He} often starts to climax as a cock begins to push inside ${him}, <span class="positive">deepening ${his} appetite for men.</span>`);
							slave.attrXY += 3;
						}
					}
				}
				if (slave.behavioralQuirk === BehavioralQuirk.ADORESMEN) {
					t.push(`${He} enjoys spending time with men so much that any interaction becomes flirtation; ${he}'s now <span class="positive">more aroused by men.</span>`);
					slave.attrXY += 3;
				}
			} else {
				t.push(`${His} average libido limits further natural development of ${his} sexuality.`);
			}
		} else {
			if (slave.energy < 40) {
				t.push(`${His} low sex drive <span class="stat drop">reduces ${his} extreme attraction to men.</span>`);
				slave.attrXY -= 5;
			}
		}
		if (slave.attrXX <= 35) {
			if (slave.energy >= 20) {
				if (slave.fetish === Fetish.DOM) {
					if (slave.fetishKnown === 1) {
						t.push(`Recently, ${he}'s been fantasizing about how it would feel to force ${himself} on some of the cute women all around ${him}. ${His} revulsion at the idea of sex with a woman <span class="positive">mellows.</span>`);
					}
					slave.attrXX += 3;
				} else if (slave.fetish === Fetish.SADIST) {
					if (slave.fetishKnown === 1) {
						t.push(`Recently, ${he}'s been fantasizing about how it would feel to abuse a weak female slave. ${His} revulsion at the idea of sex with a woman <span class="positive">mellows.</span>`);
					}
					slave.attrXX += 3;
				} else if (slave.fetish === Fetish.BOOBS) {
					if (slave.fetishKnown === 1) {
						t.push(`Recently, ${he}'s been fantasizing about other girls' tits. ${His} revulsion at the idea of sex with a woman <span class="positive">mellows.</span>`);
					}
					slave.attrXX += 3;
				}
				if (slave.behavioralQuirk === BehavioralQuirk.ADORESWOMEN) {
					t.push(`${He} enjoys spending time with women, and starts to <span class="positive">reconsider ${his} unwillingness to have sex with a woman.</span>`);
					slave.attrXX += 3;
				}
				if (canAchieveErection(slave)) {
					if (slave.energy >= 40) {
						if (slave.counter.penetrative > 0) {
							t.push(`Getting to fuck another girl is rare and special, and ${he} <span class="positive">starts to value getting to have sex with women.</span>`);
							slave.attrXX += 3;
						}
					}
				}
				if (slave.devotion > random(1, 100)) {
					t.push(`The atmosphere in your arcology is so ubiquitously sexual that ${he} <span class="positive">reconsiders ${his} unwillingness to have sex with women.</span>`);
					slave.attrXX += 3;
				}
			} else {
				if (slave.attrXX > 35) {
					t.push(`${His} weak libido limits natural development of ${his} sexuality.`);
				}
			}
		} else if (slave.attrXX <= 65) {
			if (slave.energy >= 40) {
				if (slave.fetish === Fetish.DOM) {
					if (slave.fetishKnown === 1) {
						t.push(`${He}'s found ${himself} enjoying the`);
						if (canSee(slave)) {
							t.push(`sight`);
						} else {
							t.push(`idea`);
						}
						t.push(`of female slaves being forced to fuck recently. ${He}'s now <span class="positive">more attracted to women.</span>`);
					}
					slave.attrXX += 3;
				} else if (slave.fetish === Fetish.SADIST) {
					if (slave.fetishKnown === 1) {
						t.push(`${He}'s started fantasizing about how a girl might feel, struggling to get away from ${him}. ${He}'s now <span class="positive">more attracted to women.</span>`);
					}
					slave.attrXX += 3;
				} else if (slave.fetish === Fetish.BOOBS) {
					if (slave.fetishKnown === 1) {
						t.push(`${His} fantasies about boobs have become quite vivid. ${He}'s now <span class="positive">more attracted to women.</span>`);
					}
					slave.attrXX += 3;
				}
				if (slave.behavioralQuirk === BehavioralQuirk.ADORESWOMEN) {
					t.push(`${He} enjoys spending time with women, and is now <span class="positive">more attracted to women.</span>`);
					slave.attrXX += 3;
				}
				if (canAchieveErection(slave)) {
					if (slave.energy >= 60) {
						if (slave.counter.penetrative > 0) {
							t.push(`<span class="positive">${His} indifference to women</span> is worn down on the special occasions that ${he}'s allowed to stick ${his} dick in one.`);
							slave.attrXX += 3;
						}
					}
				}
				if (slave.devotion > random(1, 200)) {
					t.push(`The atmosphere in your arcology is so ubiquitously sexual that ${he} has become <span class="positive">more attracted to women.</span>`);
					slave.attrXX += 3;
				}
			} else {
				if (slave.attrXX > 65) {
					t.push(`${His} poor sex drive limits natural development of ${his} sexuality.`);
				}
			}
		} else if (slave.attrXX <= 85) {
			if (slave.energy >= 60) {
				if (slave.fetish === Fetish.DOM) {
					if (slave.fetishKnown === 1) {
						t.push(`${He} can't see a woman without plotting to dominate her. ${He}'s now <span class="positive">more aroused by women.</span>`);
					}
					slave.attrXX += 3;
				} else if (slave.fetish === Fetish.SADIST) {
					if (slave.fetishKnown === 1) {
						t.push(`${He} can't see a woman without doing ${his} best to find a way the rules will allow ${him} to abuse the poor girl. ${He}'s now <span class="positive">more aroused by women.</span>`);
					}
					slave.attrXX += 3;
				} else if (slave.fetish === Fetish.BOOBS) {
					if (slave.fetishKnown === 1) {
						t.push(`${He} can't see a woman without doing ${his} best to get ${his}`);
						if (!hasAnyArms(slave)) {
							t.push(`face between`);
						} else {
							t.push(`${(hasBothArms(slave)) ? `hands` : `hand`} on`);
						}
						t.push(`her breasts. ${He}'s now <span class="positive">more aroused by women.</span>`);
					}
					slave.attrXX += 3;
				} else if (slave.fetish === Fetish.PREGNANCY && canAchieveErection(slave)) {
					if (slave.fetishKnown === 1) {
						t.push(`${He} can't see a woman without plotting to plant ${his} seed in her womb. ${He}'s now <span class="positive">more aroused by women.</span>`);
					}
					slave.attrXX += 3;
				}
				if (slave.behavioralQuirk === BehavioralQuirk.ADORESWOMEN) {
					t.push(`${He} enjoys spending time with women so much that any interaction becomes flirtation; ${he}'s now <span class="positive">more aroused by women.</span>`);
					slave.attrXX += 3;
				}
				if (canAchieveErection(slave)) {
					if (slave.energy >= 80) {
						if (slave.counter.penetrative > 0) {
							t.push(`${He} cherishes the special occasions on which ${he} gets to cum inside a girl, <span class="positive">building ${his} appetite for women.</span>`);
							slave.attrXX += 3;
						}
					}
				}
			} else {
				if (slave.attrXX > 85) {
					t.push(`${His} average libido limits further natural development of ${his} sexuality.`);
				}
			}
		} else {
			if (slave.energy < 40) {
				t.push(`${His} low sex drive <span class="stat drop">reduces ${his} extreme attraction to women.</span>`);
				slave.attrXX -= 5;
			}
		}
		if (slave.energy > 95) {
			if (slave.attrXX < 100) {
				if (slave.attrXY < 100) {
					t.push(`${His} nymphomania has a slow but inexorable impact on ${his} sexuality, <span class="positive">increasing ${his} attraction to everyone.</span>`);
					slave.attrXY += 3;
					slave.attrXX += 3;
				} else {
					t.push(`${His} nymphomania has a slow but inexorable impact on ${his} sexuality, <span class="positive">increasing ${his} lust for pussy,</span> since ${he}'s already crazy about guys.`);
					slave.attrXX += 3;
				}
			} else if (slave.attrXY < 100) {
				t.push(`${His} nymphomania has a slow but inexorable impact on ${his} sexuality, <span class="positive">increasing ${his} need for cock,</span> since ${he}'s already crazy about the ladies.`);
				slave.attrXY += 3;
			}
		}
		if (slave.attrKnown === 1) {
			r.push(t.join(' '));
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function behavioralQuirkEffects(slave) {
		if (slave.behavioralFlaw !== BehavioralFlaw.NONE) {
			switch (slave.behavioralFlaw) {
				case BehavioralFlaw.ARROGANT:
					if (slave.behavioralQuirk === BehavioralQuirk.CONFIDENT) {
						slave.behavioralFlaw = BehavioralFlaw.NONE;
					}
					break;
				case BehavioralFlaw.BITCHY:
					if (slave.behavioralQuirk === BehavioralQuirk.CUTTING) {
						slave.behavioralFlaw = BehavioralFlaw.NONE;
					}
					break;
				case BehavioralFlaw.ODD:
					if (slave.behavioralQuirk === BehavioralQuirk.FUNNY) {
						slave.behavioralFlaw = BehavioralFlaw.NONE;
					}
					break;
				case BehavioralFlaw.HATESMEN:
					if (slave.behavioralQuirk === BehavioralQuirk.ADORESWOMEN) {
						slave.behavioralFlaw = BehavioralFlaw.NONE;
					}
					break;
				case BehavioralFlaw.HATESWOMEN:
					if (slave.behavioralQuirk === BehavioralQuirk.ADORESMEN) {
						slave.behavioralFlaw = BehavioralFlaw.NONE;
					}
					break;
				case BehavioralFlaw.GLUTTONOUS:
					if (slave.behavioralQuirk === BehavioralQuirk.FITNESS) {
						slave.behavioralFlaw = BehavioralFlaw.NONE;
					}
					break;
				case BehavioralFlaw.ANOREXIC:
					if (slave.behavioralQuirk === BehavioralQuirk.INSECURE) {
						slave.behavioralFlaw = BehavioralFlaw.NONE;
					}
					break;
				case BehavioralFlaw.DEVOUT:
					if (slave.behavioralQuirk === BehavioralQuirk.SINFUL) {
						slave.behavioralFlaw = BehavioralFlaw.NONE;
					}
					break;
				case BehavioralFlaw.LIBERATED:
					if (slave.behavioralQuirk === BehavioralQuirk.ADVOCATE) {
						slave.behavioralFlaw = BehavioralFlaw.NONE;
					}
					break;
			}
		}
		if (slave.behavioralQuirk === BehavioralQuirk.FITNESS) {
			if (slave.energy < 70) {
				r.push(`${His} physical overachievement and ${his} growing athletic prowess <span class="positive">increase ${his} sex drive.</span>`);
				slave.energy += 1;
			}
		}
		if (slave.fetishStrength <= 95) {
			switch (slave.behavioralQuirk) {
				case BehavioralQuirk.CONFIDENT:
					if (slave.fetish === Fetish.DOM) {
						if (slave.fetishKnown === 1) {
							r.push(`${His} confidence and poise <span class="fetish inc">increase ${his} dominance.</span>`);
						}
						slave.fetishStrength += 4;
					}
					break;
				case BehavioralQuirk.CUTTING:
					if (slave.fetish === Fetish.DOM) {
						if (slave.fetishKnown === 1) {
							r.push(`${His} willingness to cut a partner down <span class="fetish inc">increases ${his} dominance.</span>`);
						}
						slave.fetishStrength += 4;
					}
					break;
				case BehavioralQuirk.FUNNY:
					if (slave.fetish === Fetish.MASOCHIST) {
						if (slave.fetishKnown === 1) {
							r.push(`Using pain as an outlet for all the mental troubles lurking behind ${his} funny façade <span class="fetish inc">increases ${his} masochism.</span>`);
						}
						slave.fetishStrength += 4;
					}
					break;
				case BehavioralQuirk.ADORESMEN:
					if (slave.fetish === Fetish.PREGNANCY) {
						if (slave.fetishKnown === 1) {
							r.push(`${His} love of male company has <span class="fetish inc">advanced ${his} pregnancy fetish.</span>`);
						}
						slave.fetishStrength += 4;
					}
					break;
				case BehavioralQuirk.ADORESWOMEN:
					if (slave.fetish === Fetish.BOOBS) {
						if (slave.fetishKnown === 1) {
							r.push(`${His} love of female company has <span class="fetish inc">advanced ${his} boob fetish.</span>`);
						}
						slave.fetishStrength += 4;
					}
					break;
				case BehavioralQuirk.INSECURE:
					if (slave.fetish === Fetish.SUBMISSIVE) {
						if (slave.fetishKnown === 1) {
							r.push(`${His} desperation for validation from others <span class="fetish inc">increases ${his} submission.</span>`);
						}
						slave.fetishStrength += 4;
					}
					break;
				case BehavioralQuirk.SINFUL:
					if (slave.fetish === Fetish.HUMILIATION) {
						if (slave.fetishKnown === 1) {
							r.push(`${His} delight at sin <span class="fetish inc">increases ${his} appetite for humiliation.</span>`);
						}
						slave.fetishStrength += 4;
					}
					break;
				case BehavioralQuirk.ADVOCATE:
					if (slave.fetish === Fetish.SUBMISSIVE) {
						if (slave.fetishKnown === 1) {
							r.push(`${His} conviction that slavery is right <span class="fetish inc">increases ${his} willingness to submit.</span>`);
						}
						slave.fetishStrength += 4;
					}
					break;
			}
			if (!slave.piercing.genitals.smart) {
				if (fetishChangeChance(slave) > random(0, 100)) {
					switch (slave.behavioralQuirk) {
						case BehavioralQuirk.CONFIDENT:
							if (slave.fetish !== Fetish.DOM) {
								r.push(`${His} confidence and poise affect ${his} sexual outlook. <span class="fetish gain">${He}'s now a dom!</span>`);
								slave.fetish = Fetish.DOM;
								slave.fetishKnown = 1;
								slave.fetishStrength = 65;
							}
							break;
						case BehavioralQuirk.CUTTING:
							if (slave.fetish !== Fetish.SADIST) {
								r.push(`${His} willingness to cut a partner down makes ${him} more aggressive in bed. <span class="fetish gain">${He}'s now a sadist!</span>`);
								slave.fetish = Fetish.SADIST;
								slave.fetishKnown = 1;
								slave.fetishStrength = 65;
							}
							break;
						case BehavioralQuirk.FUNNY:
							if (slave.fetish !== Fetish.MASOCHIST) {
								r.push(`Pain becomes an outlet for all the mental troubles lurking behind ${his} funny façade. <span class="fetish gain">${He}'s now a masochist!</span>`);
								slave.fetish = Fetish.MASOCHIST;
								slave.fetishKnown = 1;
								slave.fetishStrength = 65;
							}
							break;
						case BehavioralQuirk.ADORESMEN:
							if (slave.fetish !== Fetish.PREGNANCY && slave.fetish !== Fetish.CUMSLUT) {
								if (slave.ovaries === 1 || slave.mpreg === 1) {
									r.push(`${His} appreciation of men has turned into a fantasy about getting knocked up. <span class="fetish gain">${He}'s a pregnancy fetishist!</span>`);
									slave.fetish = Fetish.PREGNANCY;
									slave.fetishKnown = 1;
									slave.fetishStrength = 65;
								} else {
									r.push(`${His} appreciation of men has turned into a fetish for cocks, balls and, more importantly, what comes out of them. <span class="fetish gain">${He}'s now a cum fetishist!</span>`);
									slave.fetish = Fetish.CUMSLUT;
									slave.fetishKnown = 1;
									slave.fetishStrength = 65;
								}
							}
							break;
						case BehavioralQuirk.ADORESWOMEN:
							if (slave.fetish !== Fetish.PREGNANCY && slave.fetish !== Fetish.BOOBS) {
								if (canPenetrate(slave)) {
									r.push(`${His} appreciation of women has turned into a fantasy about knocking them up. <span class="fetish gain">${He}'s an impregnation fetishist!</span>`);
									slave.fetish = Fetish.PREGNANCY;
									slave.fetishKnown = 1;
									slave.fetishStrength = 65;
								} else {
									r.push(`${His} appreciation of women has turned into a fetish for breasts. <span class="fetish gain">${He}'s a boob fetishist!</span>`);
									slave.fetish = Fetish.BOOBS;
									slave.fetishKnown = 1;
									slave.fetishStrength = 65;
								}
							}
							break;
						case BehavioralQuirk.INSECURE:
							if (slave.fetish !== Fetish.SUBMISSIVE) {
								r.push(`${He} gets so desperate for validation from others that ${he} becomes willing to submit to anything. <span class="fetish gain">${He}'s now a submissive!</span>`);
								slave.fetish = Fetish.SUBMISSIVE;
								slave.fetishKnown = 1;
								slave.fetishStrength = 65;
							}
							break;
						case BehavioralQuirk.SINFUL:
							if (slave.fetish !== Fetish.HUMILIATION) {
								r.push(`${He} learns that ${he} likes nothing better than being seen doing something sacrilegious. <span class="fetish gain">${He}'s now a humiliation fetishist!</span>`);
								slave.fetish = Fetish.HUMILIATION;
								slave.fetishKnown = 1;
								slave.fetishStrength = 65;
							}
							break;
						case BehavioralQuirk.ADVOCATE:
							if (slave.fetish !== Fetish.SUBMISSIVE) {
								r.push(`${His} conviction that slavery is right seeps into ${his} sexuality. <span class="fetish gain">${He}'s now a submissive!</span>`);
								slave.fetish = Fetish.SUBMISSIVE;
								slave.fetishKnown = 1;
								slave.fetishStrength = 65;
							}
							break;
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function sexualQuirkEffects(slave) {
		if (slave.sexualFlaw !== SexualFlaw.NONE) {
			switch (slave.sexualFlaw) {
				case SexualFlaw.HATESORAL:
					if (slave.sexualQuirk === SexualQuirk.GAGFUCK) {
						slave.sexualFlaw = SexualFlaw.NONE;
					}
					break;
				case SexualFlaw.HATESANAL:
					if (slave.sexualQuirk === SexualQuirk.PAINAL) {
						slave.sexualFlaw = SexualFlaw.NONE;
					}
					break;
				case SexualFlaw.HATESPEN:
					if (slave.sexualQuirk === SexualQuirk.STRUGGLE) {
						slave.sexualFlaw = SexualFlaw.NONE;
					}
					break;
				case SexualFlaw.SHAMEFAST:
					if (slave.sexualQuirk === SexualQuirk.TEASE) {
						slave.sexualFlaw = SexualFlaw.NONE;
					}
					break;
				case SexualFlaw.IDEAL:
					if (slave.sexualQuirk === SexualQuirk.ROMANTIC) {
						slave.sexualFlaw = SexualFlaw.NONE;
					}
					break;
				case SexualFlaw.REPRESSED:
					if (slave.sexualQuirk === SexualQuirk.PERVERT) {
						slave.sexualFlaw = SexualFlaw.NONE;
					}
					break;
				case SexualFlaw.APATHETIC:
					if (slave.sexualQuirk === SexualQuirk.CARING) {
						slave.sexualFlaw = SexualFlaw.NONE;
					}
					break;
				case SexualFlaw.CRUDE:
					if (slave.sexualQuirk === SexualQuirk.UNFLINCHING) {
						slave.sexualFlaw = SexualFlaw.NONE;
					}
					break;
				case SexualFlaw.JUDGEMENT:
					if (slave.sexualQuirk === SexualQuirk.SIZEQUEEN) {
						slave.sexualFlaw = SexualFlaw.NONE;
					}
					break;
			}
		}
		if (slave.fetishStrength <= 95) {
			switch (slave.sexualQuirk) {
				case SexualQuirk.GAGFUCK:
					if (slave.fetish === Fetish.CUMSLUT) {
						if (slave.fetishKnown === 1) {
							r.push(`${His} eagerness to get roughly throatfucked has <span class="fetish inc">advanced ${his} oral fixation.</span>`);
						}
						slave.fetishStrength += 4;
					}
					break;
				case SexualQuirk.PAINAL:
					if (slave.fetish === Fetish.BUTTSLUT) {
						if (slave.fetishKnown === 1) {
							r.push(`${His} eagerness to get roughly assfucked has <span class="fetish inc">advanced ${his} anal fixation.</span>`);
						}
						slave.fetishStrength += 4;
					}
					break;
				case SexualQuirk.STRUGGLE:
					if (slave.fetish === Fetish.MASOCHIST) {
						if (slave.fetishKnown === 1) {
							r.push(`${His} eagerness to get roughly fucked has <span class="fetish inc">advanced ${his} masochism.</span>`);
						}
						slave.fetishStrength += 4;
					}
					break;
				case SexualQuirk.TEASE:
					if (slave.fetish === Fetish.HUMILIATION) { // swap me to exhib
						if (slave.fetishKnown === 1) {
							r.push(`The rush ${he} feels when ${he} shows ${himself} off has <span class="fetish inc">advanced ${his} humiliation fetish.</span>`);
						}
						slave.fetishStrength += 4;
					}
					break;
				case SexualQuirk.ROMANTIC:
					if (slave.fetish === Fetish.PREGNANCY) {
						if (slave.fetishKnown === 1) {
							r.push(`${His} romanticism has <span class="fetish inc">advanced ${his} reproduction fetish.</span>`);
						}
						slave.fetishStrength += 4;
					}
					break;
				case SexualQuirk.PERVERT:
					if (slave.fetish === Fetish.HUMILIATION) {
						if (slave.fetishKnown === 1) {
							r.push(`${His} desire to be seen doing the forbidden has <span class="fetish inc">advanced ${his} humiliation fetish.</span>`);
						}
						slave.fetishStrength += 4;
					}
					if (slave.energy < 94) {
						r.push(`${He}'s such a pervert that the depravity all around ${him} <span class="libido inc">improves ${his} sex drive.</span>`);
						slave.energy += 1;
					}
					break;
				case SexualQuirk.CARING:
					if (slave.fetish === Fetish.SUBMISSIVE) {
						if (slave.fetishKnown === 1) {
							r.push(`${His} caring nature has <span class="fetish inc">advanced ${his} submissiveness.</span>`);
						}
						slave.fetishStrength += 4;
					}
					break;
				case SexualQuirk.UNFLINCHING:
					if (slave.fetish === Fetish.MASOCHIST) {
						if (slave.fetishKnown === 1) {
							r.push(`${His} unflinching nature has <span class="fetish inc">advanced ${his} masochism.</span>`);
						}
						slave.fetishStrength += 4;
					}
					break;
				case SexualQuirk.SIZEQUEEN:
					if (slave.fetish === Fetish.BUTTSLUT) {
						if (slave.fetishKnown === 1) {
							r.push(`${His} size queen tendencies have <span class="fetish inc">advanced ${his} devotion to being an anal slut.</span>`);
						}
						slave.fetishStrength += 4;
					}
					break;
			}
			if (!slave.piercing.genitals.smart) {
				if (fetishChangeChance(slave) > random(0, 100)) {
					switch (slave.sexualQuirk) {
						case SexualQuirk.GAGFUCK:
							if (slave.fetish !== Fetish.CUMSLUT) {
								r.push(`${His} willingness to get roughly throatfucked has turned into real anticipation. <span class="fetish gain">${He}'s now a cumslut!</span>`);
								slave.fetish = Fetish.CUMSLUT;
								slave.fetishKnown = 1;
								slave.fetishStrength = 65;
							}
							break;
						case SexualQuirk.PAINAL:
							if (slave.fetish !== Fetish.BUTTSLUT) {
								r.push(`${His} willingness to get roughly assfucked has turned into real anticipation. <span class="fetish gain">${He}'s now a buttslut!</span>`);
								slave.fetish = Fetish.BUTTSLUT;
								slave.fetishKnown = 1;
								slave.fetishStrength = 65;
							}
							break;
						case SexualQuirk.STRUGGLE:
							if (slave.fetish !== Fetish.MASOCHIST) {
								r.push(`${His} willingness to be roughly used has turned into real anticipation. <span class="fetish gain">${He}'s now a masochist!</span>`);
								slave.fetish = Fetish.MASOCHIST;
								slave.fetishKnown = 1;
								slave.fetishStrength = 65;
							}
							break;
						case SexualQuirk.TEASE:
							if (slave.fetish !== Fetish.HUMILIATION) { // exhib
								r.push(`The rush ${he} feels when ${he} shows ${himself} off has deepened into a fetish for being publicly fucked. <span class="fetish gain">${He}'s a humiliation fetishist!</span>`);
								slave.fetish = Fetish.HUMILIATION;
								slave.fetishKnown = 1;
								slave.fetishStrength = 65;
							}
							break;
						case SexualQuirk.ROMANTIC:
							if (slave.fetish !== Fetish.PREGNANCY) {
								r.push(`${His} romantic bent has turned into a fantasy about settling down and having a child. <span class="fetish gain">${He}'s a pregnancy fetishist!</span>`);
								slave.fetish = Fetish.PREGNANCY;
								slave.fetishKnown = 1;
								slave.fetishStrength = 65;
							}
							break;
						case SexualQuirk.PERVERT:
							if (slave.fetish !== Fetish.HUMILIATION) {
								r.push(`${His} perverted side has turned into a desire to be seen doing the forbidden. <span class="fetish gain">${He}'s a humiliation fetishist!</span>`);
								slave.fetish = Fetish.HUMILIATION;
								slave.fetishKnown = 1;
								slave.fetishStrength = 65;
							}
							break;
						case SexualQuirk.CARING:
							if (slave.fetish !== Fetish.SUBMISSIVE) {
								r.push(`${His} caring nature has matured into a need to submit. <span class="fetish gain">${He}'s a submissive!</span>`);
								slave.fetish = Fetish.SUBMISSIVE;
								slave.fetishKnown = 1;
								slave.fetishStrength = 65;
							}
							break;
						case SexualQuirk.UNFLINCHING:
							if (slave.fetish !== Fetish.MASOCHIST) {
								r.push(`${He}'s so unflinching that ${he}'s left searching for sex extreme enough to excite ${him}. <span class="fetish gain">${He}'s a masochist!</span>`);
								slave.fetish = Fetish.MASOCHIST;
								slave.fetishKnown = 1;
								slave.fetishStrength = 65;
							}
							break;
						case SexualQuirk.SIZEQUEEN:
							if (slave.fetish !== Fetish.BUTTSLUT) {
								r.push(`${He}'s such a size queen that ${he}'s decided ${he} prefers dicks where they'll feel biggest to ${him}. <span class="fetish gain">${He}'s a buttslut!</span>`);
								slave.fetish = Fetish.BUTTSLUT;
								slave.fetishKnown = 1;
								slave.fetishStrength = 65;
							}
							break;
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function fetishEffects(slave) {
		if (slave.fetish !== Fetish.NONE) {
			if (slave.fetishStrength <= 75) {
				if (slave.devotion > 50) {
					if (slave.trust > 50) {
						r.push(`${He} has the confidence to pursue what pleases ${him}, <span class="fetish inc">increasing ${his} kinkiness.</span>`);
						slave.fetishStrength += 4;
					}
				}
			}
			if (slave.fetishStrength > 10) {
				if (slave.trust < -20) {
					r.push(`${He}'s too afraid to pursue what pleases ${him}, <span class="fetish loss">reducing ${his} sexual distinctiveness.</span>`);
					slave.fetishStrength -= 4;
				} else if (slave.devotion < -20) {
					r.push(`${He}'s so unhappy with ${his} life as a sex slave that <span class="fetish loss">${his} interest in unusual sex decreases.</span>`);
					slave.fetishStrength -= 4;
				} else if (slave.trust <= 50) {
					r.push(`${He} lacks the confidence to pursue what pleases ${him}, <span class="fetish loss">reducing ${his} kinkiness.</span>`);
					slave.fetishStrength -= 2;
				} else if (slave.devotion <= 50) {
					r.push(`${He}'s not fully comfortable being a sex slave, <span class="fetish loss">reducing ${his} interest in kinky sex.</span>`);
					slave.fetishStrength -= 2;
				}
				if (slave.fetish === Fetish.BUTTSLUT) {
					if (slave.prostate === 0) {
						if (slave.vagina === -1) {
							if (slave.trust >= -20) {
								r.push(`${He} thinks of ${his} anus as ${his} primary sexual organ, but ${he} lacks prostate or a g-spot to be internally stimulated by a cock inside ${his} rear hole, <span class="fetish loss">reducing ${his} ability to appreciate anal.</span>`);
								slave.fetishStrength -= 4;
							}
						}
					}
				}
			}
			if (slave.fetishStrength <= 5) {
				r.push(`<span class="fetish loss">${He} has lost all interest in ${his} fetishes and is now sexually vanilla.</span>`);
				slave.fetish = Fetish.NONE;
				slave.fetishStrength = 0;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function behavioralFlawEffects(slave) {
		if (slave.behavioralFlaw === BehavioralFlaw.DEVOUT && FutureSocieties.isActive('FSChattelReligionist')) {
			if (slave.devotion <= 20) {
				if (slave.trust < -20) {
					r.push(`${He} is inwardly <span class="trust dec">terrified</span> by living in what ${he} sees as a powerful theocratic society inimical to ${his} old world faith.`);
					slave.trust -= Math.trunc(V.arcologies[0].FSChattelReligionist / 25);
				} else {
					r.push(`${He} is filled with <span class="devotion dec">hatred and disgust</span> by Chattel Religionism, which ${he} believes to be heretical and wrong.`);
					slave.devotion -= Math.trunc(V.arcologies[0].FSChattelReligionist / 35);
				}
			} else if (slave.devotion <= 50) {
				if (slave.trust > 20) {
					r.push(`${He} is experiencing considerable spiritual anguish as ${he} is torn between obedience and conviction that Chattel Religionism is heretical and wrong. This <span class="trust dec">hinders ${his} acceptance of ${his} place</span> in slave society.`);
					slave.trust -= Math.trunc(V.arcologies[0].FSChattelReligionist / 25);
				} else {
					r.push(`${He} is badly torn between Chattel Religionism and ${his} old world faith, but ${he} is doing ${his} best to defer these spiritual issues for now.`);
				}
			} else {
				r.push(`${He} has experienced a religious epiphany, and now accepts Chattel Religionism in ${his} mind, ${his} heart, and ${his}`);
				if (slave.vagina > -1) {
					r.push(`womanhood.`);
				} else {
					r.push(`anus.`);
				}
				r.push(`<span class="flaw break">${He} has become sinful,</span> maliciously eager to transgress against the faith ${he} has abandoned. ${He} now sees that everything ${he} has suffered up to now has been a necessary and divinely ordained trial to bring ${him} into the true faith as a holy sex slave, <span class="trust inc">enormously boosting ${his} trust in you.</span>`);
				slave.behavioralQuirk = BehavioralQuirk.SINFUL;
				slave.behavioralFlaw = BehavioralFlaw.NONE;
				if (slave.trust < -30) {
					slave.trust = -10;
				} else {
					slave.trust += 20;
				}
			}
		} else if (slave.behavioralQuirk === BehavioralQuirk.NONE && slave.fetishKnown === 1) {
			if (slave.fetishStrength + slave.devotion + slave.trust > random(1, 500)) {
				if (slave.behavioralFlaw === BehavioralFlaw.ARROGANT) {
					if (slave.fetish === Fetish.SUBMISSIVE) {
						r.push(`${His} need to submit has <span class="flaw break">softened ${his} arrogance into confidence.</span>`);
						SoftenBehavioralFlaw(slave);
					}
				} else if (slave.behavioralFlaw === BehavioralFlaw.BITCHY) {
					if (slave.fetish === Fetish.HUMILIATION) {
						r.push(`${His} need to be humiliated has <span class="flaw break">softened ${his} bitchiness into a penchant for repartee.</span>`);
						SoftenBehavioralFlaw(slave);
					}
				} else if (slave.behavioralFlaw === BehavioralFlaw.HATESMEN) {
					if (slave.fetish === Fetish.PREGNANCY && (slave.ovaries === 1 || slave.mpreg === 1)) {
						r.push(`${He} dislikes men, but fetishizes pregnancy; ${he} comes around, and decides that <span class="flaw break">${he} needs a man to knock ${him} up.</span>`);
						slave.behavioralQuirk = BehavioralQuirk.ADORESMEN;
						slave.behavioralFlaw = BehavioralFlaw.NONE;
					} else if (slave.fetish === Fetish.BOOBS) {
						r.push(`${He} dislikes men and adores boobs, which <span class="flaw break">builds ${his} hatred of men into a love of women.</span>`);
						slave.behavioralQuirk = BehavioralQuirk.ADORESWOMEN;
						slave.behavioralFlaw = BehavioralFlaw.NONE;
					} else if (slave.attrXY > 85) {
						r.push(`${He} dislikes the company of men but likes their cocks; ${he} learns to <span class="flaw break">enjoy the male presence that comes with taking the dick.</span>`);
						slave.behavioralQuirk = BehavioralQuirk.ADORESMEN;
						slave.behavioralFlaw = BehavioralFlaw.NONE;
					} else if (slave.energy > 95) {
						r.push(`${He} dislikes men and has constant needs; women are the obvious answer, which <span class="flaw break">builds ${his} hatred of men into a love of feminine company.</span>`);
						slave.behavioralQuirk = BehavioralQuirk.ADORESWOMEN;
					}
				} else if (slave.behavioralFlaw === BehavioralFlaw.HATESWOMEN) {
					if (slave.fetish === Fetish.PREGNANCY) {
						r.push(`${He} dislikes women, but fetishizes pregnancy; ${he} comes around, and decides that <span class="flaw break">${he} loves pregnant girls.</span>`);
						slave.behavioralQuirk = BehavioralQuirk.ADORESWOMEN;
						slave.behavioralFlaw = BehavioralFlaw.NONE;
					} else if (slave.fetish === Fetish.CUMSLUT) {
						r.push(`${He} dislikes women and has a real oral fixation; eating dick is the obvious answer, which <span class="flaw break">funnels ${his} hatred of women into a love of men.</span>`);
						slave.behavioralQuirk = BehavioralQuirk.ADORESMEN;
						slave.behavioralFlaw = BehavioralFlaw.NONE;
					} else if (slave.attrXX > 85) {
						r.push(`${He} dislikes the company of women but likes fucking them; ${he} learns to <span class="flaw break">enjoy the feminine presence that comes with getting some pussy.</span>`);
						slave.behavioralQuirk = BehavioralQuirk.ADORESWOMEN;
						slave.behavioralFlaw = BehavioralFlaw.NONE;
					} else if (slave.energy > 95) {
						r.push(`${He} dislikes women and has constant needs; men are the obvious answer, which <span class="flaw break">builds ${his} hatred of women into a love of maleness.</span>`);
						slave.behavioralQuirk = BehavioralQuirk.ADORESMEN;
						slave.behavioralFlaw = BehavioralFlaw.NONE;
					}
				} else if (slave.behavioralFlaw === BehavioralFlaw.DEVOUT) {
					if (slave.energy > 95) {
						r.push(`${His} need for constant sex has <span class="flaw break">softened ${his} devoutness into an appetite for sacrilege.</span>`);
						SoftenBehavioralFlaw(slave);
					}
				} else if (slave.behavioralFlaw === BehavioralFlaw.LIBERATED) {
					if (slave.fetish === Fetish.MASOCHIST) {
						r.push(`${His} subconscious need to be abused has <span class="flaw break">converted ${his} liberated philosophy into an ability to advocate for slavery.</span>`);
						SoftenBehavioralFlaw(slave);
					}
				}
			}
		} else if (slave.fetishKnown === 1) {
			if (slave.fetishStrength + slave.devotion + slave.trust > random(1, 500)) {
				if (slave.behavioralFlaw === BehavioralFlaw.ARROGANT) {
					if (slave.fetish === Fetish.SUBMISSIVE) {
						r.push(`${His} arrogance was probably a reflection of ${his} subconscious need to submit, which is so satisfied by sexual slavery that <span class="flaw break">${he} no longer needs to act arrogant.</span>`);
						slave.behavioralFlaw = BehavioralFlaw.NONE;
					}
				} else if (slave.behavioralFlaw === BehavioralFlaw.BITCHY) {
					if (slave.fetish === Fetish.HUMILIATION) {
						r.push(`${His} bitchiness was probably a reflection of ${his} sexual need to be publicly humiliated, which is so satisfied by sexual slavery that <span class="flaw break">${he} no longer needs to be insulting</span> to get the degradation ${he} subconsciously needs.`);
						slave.behavioralFlaw = BehavioralFlaw.NONE;
					}
				} else if (slave.behavioralFlaw === BehavioralFlaw.HATESMEN) {
					if (slave.fetish === Fetish.PREGNANCY) {
						r.push(`${He} dislikes the company of men, but fetishizes pregnancy; ${he} decides that men, those hunky impregnators, can't be <i>that</i> bad, and <span class="flaw break">gets over ${his} hatred.</span>`);
						slave.behavioralFlaw = BehavioralFlaw.NONE;
					} else if (slave.fetish === Fetish.BOOBS) {
						r.push(`${He} dislikes the company of men and adores boobs; ${he} finds that ${he} doesn't mind ogling titties with the boys, and <span class="flaw break">gets over ${his} hatred.</span>`);
						slave.behavioralFlaw = BehavioralFlaw.NONE;
					} else if (slave.attrXY > 85) {
						r.push(`${He} dislikes the company of men but likes their cocks; ${he} gets used to putting up with maleness if it gets ${him} the dick, and <span class="flaw break">gets over ${his} hatred.</span>`);
						slave.behavioralFlaw = BehavioralFlaw.NONE;
					} else if (slave.energy > 95) {
						r.push(`${He} dislikes the company of men and has constant needs; ${he} can't afford to narrow the playing field, and <span class="flaw break">gets over ${his} hatred.</span>`);
						slave.behavioralFlaw = BehavioralFlaw.NONE;
					}
				} else if (slave.behavioralFlaw === BehavioralFlaw.HATESWOMEN) {
					if (slave.fetish === Fetish.PREGNANCY) {
						r.push(`${He} dislikes the company of women, but fetishizes pregnancy; ${he} decides that women, with their motherly hips and fertile cunts, can't be <i>that<i> bad, and <span class="flaw break">gets over ${his} hatred.</span>`);
						slave.behavioralFlaw = BehavioralFlaw.NONE;
					} else if (slave.fetish === Fetish.CUMSLUT) {
						r.push(`${He} dislikes the company of women and has a real oral fixation; ${he} decides that women, with their soft, kissable lips can't be <i>that<i> bad, and <span class="flaw break">gets over ${his} hatred.</span>`);
						slave.behavioralFlaw = BehavioralFlaw.NONE;
					} else if (slave.attrXX > 85) {
						r.push(`${He} dislikes the company of women but likes fucking them; ${he} gets used to putting up with girls to get into their pants, and <span class="flaw break">gets over ${his} hatred.</span>`);
						slave.behavioralFlaw = BehavioralFlaw.NONE;
					} else if (slave.energy > 95) {
						r.push(`${He} dislikes the company of women and has constant needs; ${he} can't afford to narrow the playing field, and <span class="flaw break">gets over ${his} hatred.</span>`);
						slave.behavioralFlaw = BehavioralFlaw.NONE;
					}
				} else if (slave.behavioralFlaw === BehavioralFlaw.DEVOUT) {
					if (slave.energy > 95) {
						r.push(`${He} finally resolves ${his} internal dilemma between the faith ${he} was brought up in and ${his} all-consuming need to be a slut by deciding that ${he} prefers being a sinner. <span class="flaw break">${He} is no longer devoutly faithful</span> to ${his} old religion.`);
						slave.behavioralFlaw = BehavioralFlaw.NONE;
					}
				} else if (slave.behavioralFlaw === BehavioralFlaw.LIBERATED) {
					if (slave.fetish === Fetish.MASOCHIST) {
						r.push(`${His} pre-enslavement belief that ${he} deserves rights and respect fades in light of how much ${he} likes being beaten and abused. <span class="flaw break">${He} is no longer a modern, liberated ${girl},</span> and accepts ${his} place as a sex slave as natural.`);
						slave.behavioralFlaw = BehavioralFlaw.NONE;
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function sexualFlawEffects(slave) {
		if (slave.fetishStrength + slave.devotion + slave.trust > random(1, 500)) {
			if (slave.sexualQuirk === SexualQuirk.NONE) {
				if (slave.sexualFlaw === SexualFlaw.HATESANAL) {
					if (slave.piercing.anus.weight) {
						r.push(`The constant stimulation ${his} guiche piercings give ${him} most intimate areas helps ${him} with ${his} anal hang-ups, <span class="flaw break">softening ${his} hatred of anal into an appetite for anal pain.</span> ${He} still struggles if ${he}'s fucked in the ass, but ${he} gets off on it anyway.`);
						SoftenSexualFlaw(slave);
					} else if (slave.fetish === Fetish.BUTTSLUT && slave.fetishKnown === 1) {
						r.push(`${His} sexual fascination with things entering ${his} asshole <span class="flaw break">softens ${his} hatred of anal into an appetite for anal pain.</span> ${He} still struggles if ${he}'s fucked in the ass, but ${he} gets off on it anyway.`);
						SoftenSexualFlaw(slave);
					} else if (slave.energy > 95) {
						r.push(`As a nymphomaniac ${he} appreciates kinky sex, so ${he} <span class="flaw break">softens ${his} hatred of anal into an appetite for anal pain.</span> ${He} still struggles if ${he}'s fucked in the ass, but ${he} gets off on it anyway.`);
						SoftenSexualFlaw(slave);
					}
				} else if (slave.sexualFlaw === SexualFlaw.HATESORAL) {
					if (slave.piercing.tongue.weight) {
						r.push(`${He} can't stop sucking on ${his} tongue piercings, and ${he} gets over ${his} oral hang-ups, <span class="flaw break">softening ${his} hatred of oral into a willingness to be roughly throatfucked.</span> ${He} still gags, but it's a good gagging, now.`);
						SoftenSexualFlaw(slave);
					} else if (slave.fetish === Fetish.CUMSLUT && slave.fetishKnown === 1) {
						r.push(`${He} can't get ${his} beloved cum without choking down dick, so ${he} <span class="flaw break">softens ${his} hatred of oral into a willingness to be roughly throatfucked.</span> ${He} still gags, but it's a good gagging, now.`);
						SoftenSexualFlaw(slave);
					} else if (slave.energy > 95) {
						r.push(`${He} needs sex so much ${he} often has to encourage ${his} partners orally, so ${he} <span class="flaw break">softens ${his} hatred of oral into a willingness to be roughly throatfucked.</span> ${He} still gags, but it's a good gagging, now.`);
						SoftenSexualFlaw(slave);
					}
				} else if (slave.sexualFlaw === SexualFlaw.HATESPEN) {
					if (slave.piercing.vagina.weight) {
						r.push(`${His} pussy piercings get ${him} used to the idea that it's a fuckhole, not ${his} precious womanhood, <span class="flaw break">softening ${his} hatred of penetration into an appetite for abusive sex.</span> ${He} still cries, but ${he} climaxes as ${he} cries.`);
						SoftenSexualFlaw(slave);
					} else if (slave.fetish === Fetish.BUTTSLUT && slave.fetishKnown === 1) {
						r.push(`${His} sexual fascination with anal penetration <span class="flaw break">softens ${his} hatred of penetration into an appetite for abusive sex.</span> ${He} still cries, but ${he} climaxes as ${he} cries.`);
						SoftenSexualFlaw(slave);
					} else if (slave.energy > 95) {
						r.push(`As a nymphomaniac ${he} appreciates kinky sex, so ${he} <span class="flaw break">softens ${his} hatred of penetration into an appetite for abusive intercourse.</span> ${He} still cries, but ${he} climaxes as ${he} cries.`);
						SoftenSexualFlaw(slave);
					}
				} else if (slave.sexualFlaw === SexualFlaw.APATHETIC) {
					if (slave.fetish === Fetish.SUBMISSIVE && slave.fetishKnown === 1) {
						r.push(`${His} subconscious drive to submit <span class="flaw break">softens ${his} sexual apathy into constant care for ${his} partners' wants.</span>`);
						SoftenSexualFlaw(slave);
					} else if (slave.energy > 95) {
						r.push(`${He} needs sex so badly that ${he} can no longer be apathetic in bed, and <span class="flaw break">softens ${his} sexual apathy into care for what keeps ${his} partners aroused.</span>`);
						SoftenSexualFlaw(slave);
					}
				} else if (slave.sexualFlaw === SexualFlaw.CRUDE) {
					if (slave.fetish === Fetish.BUTTSLUT && slave.fetishKnown === 1) {
						r.push(`${He} needs to avoid making unsexy noises during buttsex to be an appealing enough anal partner to satisfy ${his} backdoor needs, <span class="flaw break">softening ${his} crudeness into a willingness to do anything.</span>`);
						SoftenSexualFlaw(slave);
					} else if (slave.energy > 95) {
						r.push(`${He} needs sex so badly that ${he} can no longer afford to disgust partners, and <span class="flaw break">softens ${his} sexual crudeness into a willingness to do anything.</span>`);
						SoftenSexualFlaw(slave);
					}
				} else if (slave.sexualFlaw === SexualFlaw.JUDGEMENT) {
					if (slave.fetish === Fetish.SUBMISSIVE && slave.fetishKnown === 1) {
						r.push(`${His} subconscious belief that ${he}'s worthless <span class="flaw break">softens ${his} judgemental behavior into eagerness to be fucked by the biggest cocks.</span>`);
						SoftenSexualFlaw(slave);
					} else if (slave.energy > 95) {
						r.push(`${He} needs sex so badly that ${he} can no longer be selective, and <span class="flaw break">softens ${his} judgemental behavior into a love of big dicks, though ${he} now loves them all.</span>`);
						SoftenSexualFlaw(slave);
					}
				} else if (slave.sexualFlaw === SexualFlaw.SHAMEFAST) {
					if (slave.fetish === Fetish.HUMILIATION && slave.fetishKnown === 1) { // exhib
						r.push(`${He} decides that hiding won't get ${him} the humiliation ${he} craves, and <span class="flaw break">softens ${his} shamefastness into a willingness to tease.</span>`);
						SoftenSexualFlaw(slave);
					} else if (slave.energy > 95) {
						r.push(`${He} decides that hiding isn't getting ${him} enough sex, and <span class="flaw break">softens ${his} shamefastness into a willingness to tease.</span>`);
						SoftenSexualFlaw(slave);
					}
				} else if (slave.sexualFlaw === SexualFlaw.IDEAL) {
					if (slave.fetish === Fetish.SUBMISSIVE && slave.fetishKnown === 1) {
						r.push(`${His} appetite for submission has <span class="flaw break">softened ${his} innocent ideas about sex into an ability to find romance</span> in the life of a sex slave.`);
						SoftenSexualFlaw(slave);
					} else if (slave.energy > 95) {
						r.push(`${His} appetite for sex has <span class="flaw break">softened ${his} innocent ideas about sex into an ability to find something romantic</span> in a constant whirl of intercourse.`);
						SoftenSexualFlaw(slave);
					}
				} else if (slave.sexualFlaw === SexualFlaw.REPRESSED) {
					if (slave.fetish === Fetish.BUTTSLUT && slave.fetishKnown === 1) {
						r.push(`${He} grew up being taught that good ${girl}s do not take cock up their good ${girl} anuses, but ${he}'s just now decided ${he} prefers being a bad ${girl} and has <span class="flaw break">softened ${his} repression into arousal at the perversion</span> of dicks up ${his} behind.`);
						SoftenSexualFlaw(slave);
					} else if (slave.fetish === Fetish.CUMSLUT && slave.fetishKnown === 1) {
						r.push(`${He} grew up being taught that good ${girl}s do not put their good ${girl} mouths on others' private parts, but ${he}'s just now decided ${he} prefers being a bad ${girl} and has <span class="flaw break">softened ${his} repression into arousal at the perverted</span> idea of dicks down ${his} throat.`);
						SoftenSexualFlaw(slave);
					} else if (slave.energy > 95) {
						r.push(`${He} grew up being taught that good ${girl}s do not happily fuck anything that moves, but ${he}'s just now decided ${he} prefers being a bad ${girl} and has <span class="flaw break">softened ${his} repression into arousal at the perversion</span> of reveling in sexual addiction.`);
						SoftenSexualFlaw(slave);
					}
				}
			} else {
				if (slave.sexualFlaw === SexualFlaw.HATESANAL) {
					if (slave.piercing.anus.weight) {
						r.push(`The constant stimulation ${his} guiche piercings give ${him} most intimate areas helps ${him} with ${his} anal hang-ups, so <span class="flaw break">${his} previous hesitations about buttsex vanish.</span>`);
						slave.sexualFlaw = SexualFlaw.NONE;
					} else if (slave.fetish === Fetish.BUTTSLUT && slave.fetishKnown === 1) {
						r.push(`${His} sexual fascination with things entering ${his} asshole overcomes ${his} professed hatred of anal, so <span class="flaw break">${his} previous hesitations about buttsex vanish.</span>`);
						slave.sexualFlaw = SexualFlaw.NONE;
					} else if (slave.energy > 95) {
						r.push(`As a nymphomaniac ${he} doesn't really care which hole ${he}'s getting fucked in, so <span class="flaw break">${his} previous hesitations about buttsex vanish.</span>`);
						slave.sexualFlaw = SexualFlaw.NONE;
					}
				} else if (slave.sexualFlaw === SexualFlaw.HATESORAL) {
					if (slave.piercing.tongue.weight) {
						r.push(`${He} can't stop sucking on ${his} tongue piercings, so <span class="flaw break">${he} gets over ${his} oral hang-ups.</span>`);
						slave.sexualFlaw = SexualFlaw.NONE;
					} else if (slave.fetish === Fetish.CUMSLUT && slave.fetishKnown === 1) {
						r.push(`${He} can't get ${his} beloved cum without sucking, so <span class="flaw break">${he} forcibly overcomes ${his} strong gag reflex.</span>`);
						slave.sexualFlaw = SexualFlaw.NONE;
					} else if (slave.energy > 95) {
						r.push(`${He} needs sex so much ${he} often has to encourage ${his} partners orally, so <span class="flaw break">${he} forcibly overcomes ${his} strong gag reflex.</span>`);
						slave.sexualFlaw = SexualFlaw.NONE;
					}
				} else if (slave.sexualFlaw === SexualFlaw.HATESPEN) {
					if (slave.piercing.vagina.weight) {
						r.push(`${His} pussy piercings get ${him} used to the idea that it's a fuckhole, not ${his} precious womanhood, so <span class="flaw break">${his} previous hesitations about getting fucked vanish.</span>`);
						slave.sexualFlaw = SexualFlaw.NONE;
					} else if (slave.fetish === Fetish.BUTTSLUT && slave.fetishKnown === 1) {
						r.push(`${He}'s fascinated with the perversity of being anally penetrated, so <span class="flaw break">${his} previous hesitations about getting fucked vanish.</span>`);
						slave.sexualFlaw = SexualFlaw.NONE;
					} else if (slave.fetish === Fetish.PREGNANCY && slave.fetishKnown === 1 && (slave.ovaries === 1 || slave.mpreg === 1)) {
						r.push(`It would be unreasonable to expect to become pregnant without being penetrated, so <span class="flaw break">${his} previous hesitations about getting fucked vanish.</span>`);
						slave.sexualFlaw = SexualFlaw.NONE;
					} else if (slave.energy > 95) {
						r.push(`${He} needs sex like ${he} needs air, so <span class="flaw break">${his} previous hesitations about getting fucked vanish.</span>`);
						slave.sexualFlaw = SexualFlaw.NONE;
					}
				} else if (slave.sexualFlaw === SexualFlaw.APATHETIC) {
					if (slave.fetish === Fetish.DOM && slave.fetishKnown === 1) {
						r.push(`${He} likes being on top so much <span class="flaw break">${he} can no longer bear being lazy in bed.</span>`);
						slave.sexualFlaw = SexualFlaw.NONE;
					} else if (slave.energy > 95) {
						r.push(`${He} needs sex so badly that <span class="flaw break">${he} can no longer afford to wait apathetically for others to fuck ${him}.</span>`);
						slave.sexualFlaw = SexualFlaw.NONE;
					}
				} else if (slave.sexualFlaw === SexualFlaw.CRUDE) {
					if (slave.energy > 95) {
						r.push(`${He} needs sex so badly that <span class="flaw break">${he} can no longer afford to disgust partners into abandoning intercourse.</span>`);
						slave.sexualFlaw = SexualFlaw.NONE;
					}
				} else if (slave.sexualFlaw === SexualFlaw.JUDGEMENT) {
					if (slave.energy > 95) {
						r.push(`${He} needs sex so badly that <span class="flaw break">${he} can no longer afford to turn potential partners off by judging them.</span>`);
						slave.sexualFlaw = SexualFlaw.NONE;
					}
				} else if (slave.sexualFlaw === SexualFlaw.SHAMEFAST) {
					if (slave.fetish === Fetish.HUMILIATION && slave.fetishKnown === 1) { // split with exhib
						r.push(`${His} shamefastness is no longer anything but a pretense; <span class="flaw break">${he}'s decided ${he} really does like getting fucked in public.</span>`);
						slave.sexualFlaw = SexualFlaw.NONE;
					} else if (slave.energy > 95) {
						r.push(`${He} needs sex so badly that <span class="flaw break">${he} can no longer afford to be embarrassed by public fucking.</span>`);
						slave.sexualFlaw = SexualFlaw.NONE;
					}
				} else if (slave.sexualFlaw === SexualFlaw.IDEAL) {
					if (slave.fetish === Fetish.SUBMISSIVE && slave.fetishKnown === 1) {
						r.push(`${He} always expected to be able to turn down sex, but <span class="flaw break">${he}'s finally realized that ${he} doesn't want to be asked.</span>`);
						slave.sexualFlaw = SexualFlaw.NONE;
					} else if (slave.energy > 95) {
						r.push(`Hard as it is for ${him} to admit, ${he} recognizes ${his} own willingness to take sex from other slaves if it isn't forthcoming, and <span class="flaw break">accepts that a slave nympho can't worry about trifles like consent.</span>`);
						slave.sexualFlaw = SexualFlaw.NONE;
					}
				} else if (slave.sexualFlaw === SexualFlaw.REPRESSED) {
					if (slave.fetish === Fetish.BUTTSLUT && slave.fetishKnown === 1) {
						r.push(`${He} grew up being taught that good ${girl}s do not take cock up their good ${girl} anuses, but <span class="flaw break">${he}'s just now decided ${he} prefers being a bad ${girl}.</span>`);
						slave.sexualFlaw = SexualFlaw.NONE;
					} else if (slave.fetish === Fetish.CUMSLUT) {
						r.push(`${He} grew up being taught that good ${girl}s do not put their good ${girl} mouths on others' private parts, but <span class="flaw break">${he}'s just now decided ${he} prefers being a bad ${girl}.</span>`);
						slave.sexualFlaw = SexualFlaw.NONE;
					} else if (slave.energy > 95) {
						r.push(`${He} grew up being taught that good ${girl}s do not happily fuck anything that moves, but <span class="flaw break">${he}'s just now decided ${he} prefers being a bad ${girl}.</span>`);
						slave.sexualFlaw = SexualFlaw.NONE;
					}
				}
			}
		}
	}

	/**
	 * @param {FC.ReportSlave} slave
	 *
	 */
	function paraphiliaImpacts(slave) {
		switch (slave.sexualFlaw) {
			case SexualFlaw.CUMADDICT:
				if (slave.fetish !== Fetish.CUMSLUT) {
					if (slave.fetishStrength > 60) {
						r.push(`${His} cum addiction <span class="fetish loss">disinterests ${him} in ${his} current fetish,</span> and the conflict of sexual identity causes ${him} <span class="devotion dec">some anguish.</span>`);
						slave.fetishStrength -= 5;
						slave.devotion -= 3;
					} else {
						r.push(`${His} cum addiction <span class="fetish gain">forces ${him} back towards oral fixation.</span>`);
						slave.fetish = Fetish.CUMSLUT;
					}
				} else {
					if (slave.fetishStrength <= 95) {
						r.push(`${His} cum addiction <span class="fetish inc">forces ${him} back towards ${his} past life as an abject cumslut.</span>`);
						slave.fetishStrength += 5;
						slave.devotion -= 3;
					}
				}
				if ([Job.ARCADE, Job.CLUB, Job.PUBLIC, Job.WHORE, Job.GLORYHOLE, Job.BROTHEL].includes(slave.assignment)) {
					r.push(`${His} paraphilia is satisfied by how many dicks ${he} gets to suck at work.`);
					slave.paraphiliaSatisfied = 1;
				} else if (V.PC.dick !== 0 && slave.toyHole === ToyHole.MOUTH && [Job.CONCUBINE, Job.FUCKTOY, Job.MASTERSUITE].includes(slave.assignment)) {
					r.push(`${His} paraphilia is satisfied by constant oral sex with you.`);
					slave.paraphiliaSatisfied = 1;
				} else if (slave.inflation !== 0 && slave.inflationType === InflationLiquid.CUM) {
					r.push(`${His} paraphilia is satisfied by swelling ${his} body with cum.`);
					slave.paraphiliaSatisfied = 1;
				} else if (slave.dietCum === 1) {
					r.push(`${His} paraphilia is satisfied by what ${he} gets to eat.`);
					slave.paraphiliaSatisfied = 1;
				} else if (slave.dietCum === 2) {
					r.push(`Other slaves in your penthouse are disturbed by ${his} insatiable appetite for human ejaculate, which ${his} heavy cum-diet encourages.`);
					slave.paraphiliaSatisfied = 1;
				} else if (V.feeder !== 0) {
					r.push(`${His} paraphilia is satisfied by the way ${he} gets to eat.`);
					slave.paraphiliaSatisfied = 1;
				} else if (slave.assignment === Job.DAIRY && V.dairyFeedersSetting > 0) {
					// something involving cum production
				} else {
					r.push(`${He} doesn't seem to feel ${he}'s getting enough cum, leaving the cum addict <span class="devotion dec">depressed and anxious.</span>`);
					slave.devotion -= 2;
					slave.paraphiliaSatisfied = -1;
				}
				break;
			case SexualFlaw.ANALADDICT:
				if (slave.fetish !== Fetish.BUTTSLUT) {
					if (slave.fetishStrength > 60) {
						r.push(`${His} anal addiction <span class="fetish loss">disinterests ${him} in ${his} current fetish,</span> and the conflict of sexual identity causes ${him} <span class="devotion dec">some anguish.</span>`);
						slave.fetishStrength -= 5;
						slave.devotion -= 3;
					} else {
						r.push(`${His} anal addiction <span class="fetish gain">forces ${him} back towards an intense preference for buttsex.</span>`);
						slave.fetish = Fetish.BUTTSLUT;
					}
				} else {
					if (slave.fetishStrength <= 95) {
						r.push(`${His} anal addiction <span class="fetish inc">forces ${him} back towards ${his} past life as an abject buttslut.</span>`);
						slave.fetishStrength += 5;
						slave.devotion -= 3;
					}
				}
				if ([Job.ARCADE, Job.CLUB, Job.PUBLIC, Job.WHORE, Job.GLORYHOLE, Job.BROTHEL].includes(slave.assignment)) {
					r.push(`${His} paraphilia is satisfied by how many dicks get shoved up ${his} butt at work.`);
					slave.paraphiliaSatisfied = 1;
				} else if (slave.toyHole === ToyHole.ASS && [Job.CONCUBINE, Job.FUCKTOY, Job.MASTERSUITE].includes(slave.assignment)) {
					r.push(`${His} paraphilia is satisfied by constant anal sex with you.`);
					slave.paraphiliaSatisfied = 1;
				} else if (V.suppository !== 0) {
					r.push(`${His} paraphilia is satisfied by the way ${he} gets to take medication.`);
					slave.paraphiliaSatisfied = 1;
				} else if (plugWidth(slave) > 2) {
					r.push(`${His} paraphilia is satisfied by the enormous plug ${he} wears in ${his} ass.`);
					slave.paraphiliaSatisfied = 1;
				} else if (slave.assignment === Job.DAIRY && V.dairyStimulatorsSetting > 0) {
					// major ass drilling
				} else {
					r.push(`${He} doesn't seem to feel ${he}'s getting buttfucked often enough, leaving the anal addict <span class="devotion dec">depressed and anxious.</span>`);
					slave.paraphiliaSatisfied = -1;
					slave.devotion -= 2;
				}
				if (slave.prostate === 0) {
					if (slave.vagina === -1) {
						if (random(1, 5) === 1) {
							r.push(`Since ${he} lacks a prostate or a g-spot to be stimulated by cocks up ${his} butt, ${his} <span class="flaw break">purely psychological addiction to asshole sex resolves itself,</span> and ${he} <span class="fetish loss">starts to consider other sexual pursuits.</span>`);
							slave.sexualQuirk = SexualQuirk.NONE;
							slave.fetishStrength -= 20;
						}
					}
				}
				break;
			case SexualFlaw.ATTENTION:
				if (slave.fetish !== Fetish.HUMILIATION) { // exhib?
					if (slave.fetishStrength > 60) {
						r.push(`Being an attention whore <span class="fetish inc">disinterests ${him} in ${his} current fetish,</span> and the conflict of sexual identity causes ${him} <span class="devotion dec">some anguish.</span>`);
						slave.fetishStrength -= 5;
						slave.devotion -= 3;
					} else {
						r.push(`${His} addiction to exposure <span class="fetish gain">forces ${him} back towards a humiliation fetish.</span>`);
						slave.fetish = Fetish.HUMILIATION;
					}
				} else {
					if (slave.fetishStrength <= 95) {
						r.push(`${His} addiction to exposure <span class="fetish inc">forces ${him} back towards ${his} past life as an abject humiliation whore.</span>`);
						slave.fetishStrength += 5;
						slave.devotion -= 3;
					}
				}
				if (slave.porn.feed === 1 && slave.porn.viewerCount >= 10000) {
					r.push(`${His} paraphilia is satisfied by the viewcounts on ${his} porn and the many viewers no doubt enjoying themselves to ${his} day to day life.`);
					slave.paraphiliaSatisfied = 1;
				} else if ([Job.WHORE, Job.PUBLIC, Job.BROTHEL, Job.CLUB, Job.DJ].includes(slave.assignment)) {
					r.push(`${His} paraphilia is satisfied by how often ${he} gets publicly fucked at work.`);
					slave.paraphiliaSatisfied = 1;
				} else if (slave.assignment === Job.RECRUITER && V.recruiterTarget === "other arcologies" && V.arcologies[0].influenceTarget !== -1) {
					r.push(`${His} paraphilia is satisfied by the sheer amount of attention ${he} gets as a sexual Ambassador.`);
					slave.paraphiliaSatisfied = 1;
				} else if (slave.assignment === Job.TEACHER && V.schoolroom >= 20) {
					r.push(`${His} paraphilia is satisfied by ${his} work as a sexual instructor; enough eyes are fixated on ${his} lessons.`);
					slave.paraphiliaSatisfied = 1;
				} else if (App.Data.clothes.get(slave.clothes).exposure >= 4) {
					r.push(`${His} paraphilia is satisfied by ${his} nudity.`);
					slave.paraphiliaSatisfied = 1;
				} else {
					r.push(`${He} doesn't seem to feel ${he}'s getting fucked in public enough, leaving the attention whore <span class="devotion dec">depressed and anxious.</span>`);
					slave.paraphiliaSatisfied = -1;
					slave.devotion -= 2;
				}
				break;
			case SexualFlaw.BREASTEXP:
				if (slave.fetish !== Fetish.BOOBS) {
					if (slave.fetishStrength > 60) {
						r.push(`Being a breast expansion fanatic <span class="fetish inc">disinterests ${him} in ${his} current fetish,</span> and the conflict of sexual identity causes ${him} <span class="devotion dec">some anguish.</span>`);
						slave.fetishStrength -= 5;
						slave.devotion -= 3;
					} else {
						r.push(`${His} addiction to breast growth <span class="fetish gain">forces ${him} back towards a boob fetish.</span>`);
						slave.fetish = Fetish.BOOBS;
					}
				} else {
					if (slave.fetishStrength <= 95) {
						r.push(`${His} addiction to breast growth <span class="fetish loss">forces ${him} back towards ${his} past life as an abject slut for mammary intercourse.</span>`);
						slave.fetishStrength += 5;
						slave.devotion -= 3;
					}
				}
				if (FutureSocieties.isActive('FSSlimnessEnthusiast')) {
					r.push(`Living in a society that openly rejects ${his} paraphilia <span class="devotion dec">mentally and emotionally cripples</span> ${him}.`);
					slave.devotion -= 10;
				} else if (FutureSocieties.isActive('FSAssetExpansionist')) {
					r.push(`Living in a society that glorifies ${his} paraphilia <span class="devotion inc">leaves ${him} in perpetual ecstasy.</span>`);
					slave.devotion += 5;
				}
				if (slave.drugs === Drug.INTENSIVEBREAST || slave.drugs === Drug.HYPERBREAST) {
					r.push(`${His} paraphilia makes ${him} feel <span class="trust inc">fulfilled to be a sex slave</span> if it means breast expansion like this.`);
					slave.trust += 2;
					slave.paraphiliaSatisfied = 1;
				} else if (slave.drugs === Drug.GROWBREAST) {
					r.push(`${His} paraphilia makes breast injections very satisfying for ${him}.`);
					slave.paraphiliaSatisfied = 1;
				} else if ([Job.MILKED, Job.DAIRY].includes(slave.assignment) && slave.lactation > 0) {
					r.push(`${His} paraphilia is satisfied by ${his} work as a cow; ${he} can feel ${his} udders swelling with milk.`);
					slave.paraphiliaSatisfied = 1;
				} else if (slave.geneticQuirks.gigantomastia === 2 && slave.geneticQuirks.macromastia === 2 && V.geneticMappingUpgrade > 0) {
					r.push(`${His} paraphilia is satisfied by the knowledge that ${his} genetic abnormality will keep ${his} breasts growing for the rest of ${his} life.`);
					slave.paraphiliaSatisfied = 1;
				} else if (V.geneticMappingUpgrade > 0 && (slave.geneticQuirks.gigantomastia === 2 || slave.geneticQuirks.macromastia === 2)) {
					r.push(`${His} paraphilia is satisfied by the knowledge that ${his} genetic abnormality will keep ${his} breasts bigger than ${his} head.`);
					slave.paraphiliaSatisfied = 1;
				} else if (slave.geneticQuirks.gigantomastia === 2) {
					r.push(`${His} paraphilia is satisfied by ${his} chest's curious tendency toward perpetual growth.`);
					slave.paraphiliaSatisfied = 1;
				} else if (slave.health.condition < 0) {
					r.push(`${His} paraphilia is ameliorated by ${his} poor health; ${he} knows ${he} can't take expansion right now.`);
					// paraphilia neither satisfied nor dissatisfied
				} else {
					r.push(`${He} feels ${his} breasts are shrinking horribly, leaving the growth addict <span class="devotion dec">depressed and anxious.</span>`);
					slave.paraphiliaSatisfied = -1;
					slave.devotion -= 2;
				}
				break;
			case SexualFlaw.ABUSIVE:
				if (slave.fetish !== Fetish.DOM) {
					if (slave.fetishStrength > 60) {
						r.push(`Being addicted to sexually abusing others <span class="fetish inc">disinterests ${him} in ${his} current fetish,</span> and the conflict of sexual identity causes ${him} <span class="devotion dec">some anguish.</span>`);
						slave.fetishStrength -= 5;
						slave.devotion -= 3;
					} else {
						r.push(`${His} addiction to sexual force <span class="fetish gain">forces ${him} back towards sexual dominance.</span>`);
						slave.fetish = Fetish.DOM;
					}
				} else {
					if (slave.fetishStrength <= 95) {
						r.push(`${His} need to force others to pleasure ${him} <span class="fetish loss">forces ${him} back towards ${his} past life as a total dom.</span>`);
						slave.fetishStrength += 5;
						slave.devotion -= 3;
					}
				}
				if (slave.assignment === Job.HEADGIRL) {
					r.push(`${His} paraphilia is satisfied by ${his} work as your Head Girl.`);
					slave.paraphiliaSatisfied = 1;
				} else if (slave.assignment === Job.WARDEN) {
					r.push(`${His} paraphilia is satisfied by ${his} work as your Wardeness.`);
					slave.paraphiliaSatisfied = 1;
				} else if (slave.assignment === Job.STEWARD) {
					r.push(`${His} paraphilia is satisfied by ${his} work as the Stewardess.`);
					slave.paraphiliaSatisfied = 1;
				} else if (slave.assignment === Job.TEACHER) {
					r.push(`${His} paraphilia is satisfied by ${his} work as the Schoolteacher.`);
					slave.paraphiliaSatisfied = 1;
				} else if (canMove(slave) && (slave.rules.release.slaves === 1 || App.Utils.hasFamilySex(slave)) && V.universalRulesConsent === 0) {
					r.push(`${His} paraphilia makes pinning down and raping other slaves very satisfying.`);
					slave.paraphiliaSatisfied = 1;
				} else {
					r.push(`${He} gets few chances to indulge ${his} need to hold others down as ${he} fucks them, leaving ${him} <span class="devotion dec">depressed and anxious.</span>`);
					slave.paraphiliaSatisfied = -1;
					slave.devotion -= 2;
				}
				break;
			case SexualFlaw.MALICIOUS:
				if (slave.fetish !== Fetish.SADIST) {
					if (slave.fetishStrength > 60) {
						r.push(`Being addicted to others' sexual anguish <span class="fetish inc">disinterests ${him} in ${his} current fetish,</span> and the conflict of sexual identity causes ${him} <span class="devotion dec">some anguish.</span>`);
						slave.fetishStrength -= 5;
						slave.devotion -= 3;
					} else {
						r.push(`${His} addiction to tormenting others sexually <span class="fetish gain">forces ${him} back towards sadism.</span>`);
						slave.fetish = Fetish.SADIST;
					}
				} else {
					if (slave.fetishStrength <= 95) {
						r.push(`${His} need to be the only one enjoying sex <span class="fetish loss">forces ${him} back towards ${his} past life as a complete sexual sadist.</span>`);
						slave.fetishStrength += 5;
						slave.devotion -= 3;
					}
				}
				if (slave.assignment === Job.HEADGIRL) {
					r.push(`${His} paraphilia is satisfied by ${his} work as your Head Girl.`);
					slave.paraphiliaSatisfied = 1;
				} else if (slave.assignment === Job.WARDEN) {
					r.push(`${His} paraphilia is satisfied by ${his} work as your Wardeness.`);
					slave.paraphiliaSatisfied = 1;
				} else if (canMove(slave) && (slave.rules.release.slaves === 1 || App.Utils.hasFamilySex(slave)) && V.universalRulesConsent === 0) {
					r.push(`${His} paraphilia makes pinning down and brutally raping other slaves very satisfying.`);
					slave.paraphiliaSatisfied = 1;
				} else {
					r.push(`${He} gets few chances to indulge ${his} need to subject others to sexual anguish, leaving ${him} <span class="devotion dec">depressed and anxious.</span>`);
					slave.paraphiliaSatisfied = -1;
					slave.devotion -= 2;
				}
				break;
			case SexualFlaw.SELFHATING: {
				if (slave.fetish !== Fetish.MASOCHIST) {
					if (slave.fetishStrength > 60) {
						r.push(`${His} sexual self hatred <span class="fetish inc">disinterests ${him} in ${his} current fetish,</span> and the conflict of sexual identity causes ${him} <span class="devotion dec">some anguish.</span>`);
						slave.fetishStrength -= 5;
						slave.devotion -= 3;
					} else {
						r.push(`${His} sexual self hatred <span class="fetish gain">forces ${him} back towards masochism.</span>`);
						slave.fetish = Fetish.MASOCHIST;
					}
				} else {
					if (slave.fetishStrength <= 95) {
						r.push(`${His} sexual self hatred <span class="fetish loss">forces ${him} back towards ${his} past life as a total masochist.</span>`);
						slave.fetishStrength += 5;
						slave.devotion -= 3;
					}
				}
				const dom = (slave.assignment === Job.SUBORDINATE && slave.subTarget > 0) ? getSlave(slave.subTarget) : null;
				if (slave.assignment === Job.DAIRY && V.dairyRestraintsSetting >= 2) {
					r.push(`${His} paraphilia is satisfied by ${his} horrible life as a producer of useful fluids and a receptacle for machine rape.`);
					slave.paraphiliaSatisfied = 1;
				} else if ([Job.ARCADE, Job.GLORYHOLE].includes(slave.assignment)) {
					r.push(`${His} paraphilia is satisfied by ${his} horrible life as a helpless hole for an infinite bag of dicks.`);
					slave.paraphiliaSatisfied = 1;
				} else if (dom && [SexualFlaw.ABUSIVE, SexualFlaw.MALICIOUS].includes(dom.sexualFlaw)) {
					r.push(`${His} paraphilia is satisfied by the constant mistreatment ${he} receives from ${his} dom, ${dom.slaveName}.`);
					slave.paraphiliaSatisfied = 1;
				} else if (slave.trust < -50) {
					r.push(`${His} paraphilia is satisfied by ${his} constant terror.`);
					slave.paraphiliaSatisfied = 1;
				} else {
					r.push(`${He} doesn't seem to feel ${he}'s treated poorly enough, leaving the self hating slut <span class="devotion dec">depressed and anxious.</span>`);
					slave.paraphiliaSatisfied = -1;
					slave.devotion -= 2;
				}
				break;
			}
			case SexualFlaw.NEGLECT:
				if (slave.fetish !== Fetish.SUBMISSIVE) {
					if (slave.fetishStrength > 60) {
						r.push(`${His} sexual self neglect <span class="fetish inc">disinterests ${him} in ${his} current fetish,</span> and the conflict of sexual identity causes ${him} <span class="mediumorchid">some anguish.</span>`);
						slave.fetishStrength -= 5;
						slave.devotion -= 3;
					} else {
						r.push(`${His} sexual self neglect <span class="fetish gain">forces ${him} back towards submissiveness.</span>`);
						slave.fetish = Fetish.SUBMISSIVE;
					}
				} else {
					if (slave.fetishStrength <= 95) {
						r.push(`${His} sexual self neglect <span class="fetish loss">forces ${him} back towards ${his} past life as a total submissive.</span>`);
						slave.fetishStrength += 5;
						slave.devotion -= 3;
					}
				}
				if ([Job.ARCADE, Job.CLUB, Job.PUBLIC, Job.WHORE, Job.GLORYHOLE, Job.BROTHEL, Job.QUARTER, Job.ATTENDANT, Job.MILKMAID].includes(slave.assignment)) {
					r.push(`${His} paraphilia is satisfied by how ${he}'s expected to serve others' sexual needs at work.`);
					slave.paraphiliaSatisfied = 1;
				} else if ([Job.CONCUBINE, Job.FUCKTOY, Job.MASTERSUITE].includes(slave.assignment)) {
					r.push(`${His} paraphilia is satisfied by how ${he}'s expected to serve your sexual needs at work.`);
					slave.paraphiliaSatisfied = 1;
				} else if (slave.assignment === Job.SUBORDINATE) {
					r.push(`${His} paraphilia is satisfied by how ${he}'s expected to serve other slaves' sexual needs.`);
					slave.paraphiliaSatisfied = 1;
				} else {
					r.push(`${He} doesn't seem to feel ${he}'s serving others' sexual needs enough, leaving ${him} <span class="devotion dec">depressed and anxious.</span>`);
					slave.paraphiliaSatisfied = -1;
					slave.devotion -= 2;
				}
				break;
			case SexualFlaw.BREEDER:
				if (slave.fetish !== Fetish.PREGNANCY) {
					if (slave.fetishStrength > 60) {
						r.push(`${His} breeding obsession <span class="fetish inc">disinterests ${him} in ${his} current fetish,</span> and the conflict of sexual identity causes ${him} <span class="devotion dec">some anguish.</span>`);
						slave.fetishStrength -= 5;
						slave.devotion -= 3;
					} else {
						r.push(`${His} breeding obsession <span class="fetish gain">forces ${him} back towards appreciation for impregnation.</span>`);
						slave.fetish = Fetish.PREGNANCY;
					}
				} else {
					if (slave.fetishStrength <= 95) {
						r.push(`${His} breeding obsession <span class="fetish loss">forces ${him} back towards ${his} past life as an abject impregnation whore.</span>`);
						slave.fetishStrength += 5;
						slave.devotion -= 3;
					}
				}
				if (FutureSocieties.isActive('FSRestart')) {
					r.push(`Living in a society that rejects ${his} paraphilia`);
					if (slave.breedingMark === 1 && V.propOutcome === 1) {
						r.push(`would have mentally and emotionally crippled ${him}; but as a designated breeder, ${he} can't help but <span class="devotion inc">love ${his} role</span> in society.`);
						slave.devotion++;
					} else {
						r.push(`<span class="devotion dec">mentally and emotionally cripples</span> ${him}.`);
						slave.devotion -= 10;
					}
				} else if (FutureSocieties.isActive('FSRepopulationFocus')) {
					r.push(`Living in a society that glorifies ${his} paraphilia <span class="devotion inc">leaves ${him} in perpetual ecstasy.</span>`);
					slave.devotion += 5;
				}
				if (slave.broodmother > 0 && slave.pregKnown === 1) {
					r.push(`${He} knows ${he} will be pregnant until ${his} body gives out, and <span class="devotion inc">${he} couldn't be happier.</span>`);
					slave.paraphiliaSatisfied = 1;
					slave.devotion += 5;
				} else if (slave.pregControl === GestationDrug.LABOR && slave.preg >= slave.pregData.normalBirth) {
					r.push(`Under the effects of labor suppression drugs, ${he} knows ${he} will be pregnant until you decide to allow ${his} birth. <span class="devotion inc">${He} couldn't be happier.</span>`);
					slave.paraphiliaSatisfied = 1;
					slave.devotion += 5;
				} else if (slave.pregType >= 10 && slave.pregKnown === 1) {
					r.push(`${His} growing hyperpregnancy feeds ${his} paraphilia and <span class="devotion inc">fulfills ${his} deepest fantasies.</span>`);
					slave.paraphiliaSatisfied = 1;
					slave.devotion += 3;
				} else if (slave.pregKnown === 1) {
					r.push(`${His} paraphilia is satisfied by ${his} pregnancy.`);
					slave.paraphiliaSatisfied = 1;
				} else if (canGetPregnant(slave) && V.PC.dick !== 0 && slave.toyHole === ToyHole.PUSSY && slave.mpreg !== 1 && [Job.CONCUBINE, Job.FUCKTOY, Job.MASTERSUITE].includes(slave.assignment)) {
					r.push(`${His} paraphilia is satisfied by constant unprotected vaginal sex with you.`);
					slave.paraphiliaSatisfied = 1;
				} else if (canGetPregnant(slave) && V.PC.dick !== 0 && slave.toyHole === ToyHole.ASS && slave.mpreg === 1 && [Job.CONCUBINE, Job.FUCKTOY, Job.MASTERSUITE].includes(slave.assignment)) {
					r.push(`${His} paraphilia is satisfied by constant unprotected anal sex with you.`);
					slave.paraphiliaSatisfied = 1;
				} else if (slave.bellyImplant >= 60000) {
					r.push(`${His} paraphilia is satisfied by ${his} overfilled belly implant.`);
					slave.paraphiliaSatisfied = 1;
				} else if (App.Data.misc.fakeBellies.includes(slave.bellyAccessory)) {
					r.push(`${He} <span class="devotion dec">loathes</span> being forced to carry a fake pregnancy.`);
					slave.paraphiliaSatisfied = -1;
					slave.devotion -= 3;
				} else if (slave.pregWeek < 0) {
					r.push(`${His} paraphilia is temporarily sated by ${his} recent pregnancy, though ${he} anxiously counts the days until ${he} can get pregnant again.`);
					slave.paraphiliaSatisfied = 1;
				} else {
					r.push(`${He} isn't pregnant, leaving the breeder slut <span class="devotion dec">depressed and anxious.</span>`);
					slave.paraphiliaSatisfied = -1;
					slave.devotion -= 2;
				}
				break;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function nymphoDevotionGain(slave) {
		if (slave.attrKnown === 1) {
			if (slave.devotion < -20) {
				r.push(`${He}'s having trouble accepting it, but the sex surrounding ${him} <span class="devotion inc">is intriguing to a nymphomaniac.</span>`);
			} else if (slave.devotion <= 50) {
				r.push(`<span class="devotion inc">${His} acceptance of ${his} life as a sex slave is driven faster</span> by how satisfied ${he} is by the availability of ${his} favorite activity.`);
			} else {
				r.push(`<span class="devotion inc">${He} loves being your nympho slut.</span>`);
			}
			slave.devotion += 2;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function careerEffects(slave) {
		switch (slave.career) {
			case "a slave":
				r.push(`${He} has been a slave so long that ${he} can barely remember making decisions for ${himself}, and <span class="devotion inc">feels naturally drawn</span> to ${his} ${getWrittenTitle(slave)}.`);
				slave.devotion += 1;
				break;
			case "a dairy slave":
				r.push(`${He} is <span class="devotion inc">thankful</span> that you saved ${him} from becoming a mindless`);
				if (slave.trust < 50) {
					r.push(`cow, though ${he} still has ${his} doubts.`);
				} else {
					r.push(`cow.`);
				}
				slave.devotion += 2;
				break;
			case "a Fuckdoll":
				r.push(`${He} was once a Fuckdoll, leaving ${him} <span class="devotion inc">willing to obey on an instinctual level.</span>`);
				slave.devotion += 5;
				break;
			case "a cum dump":
			case "a meat toilet":
				r.push(`${He} was trained to be nothing more than a warm hole to fuck, leaving ${him} <span class="devotion inc">obedient</span> and <span class="trust inc">willing.</span>`);
				slave.devotion += 2;
				slave.trust += 1;
				break;
			case "a dairy cow":
				r.push(`${His} mental conditioning <span class="devotion inc">leaves ${him} mellow</span> and <span class="trust inc">trusting.</span>`);
				slave.trust += 1;
				slave.devotion += 1;
				if (slave.lactation === 0) {
					r.push(`However, ${he} is <span class="trust dec">reduced to a state of sheer panic</span> over ${his} dried up breasts.`);
					slave.trust -= 10;
				} else if (slave.pregKnown === 0 && slave.bellyImplant < 1500) {
					r.push(`However, ${he} is <span class="trust dec">reduced to a state of panic</span> that ${his} milk will dry up if ${he} doesn't get pregnant again soon.`);
					slave.trust -= 2;
				}
				break;
			case "a breeding bull":
				r.push(`${His} mental conditioning <span class="devotion inc">leaves ${him} mellow</span> and <span class="trust inc">trusting.</span>`);
				slave.trust += 1;
				slave.devotion += 1;
				if (!canAchieveErection(slave)) {
					r.push(`However, ${he} is <span class="trust dec">reduced to a state of sheer panic</span> over ${his} inability to get hard.`);
					slave.trust -= 10;
				} else if (!canPenetrate(slave)) {
					r.push(`However, ${he} is <span class="devotion dec">disappointed</span> that ${he} is unable to mount and fuck others any more.`);
					slave.devotion -= 2;
				}
				break;
			case "a slave since birth":
				if (slave.tankBaby > 0) {
					r.push(`The tank's imprinting left a lasting impression on ${him}; deep down ${he}`);
					if (slave.tankBaby === 2) {
						r.push(`<span class="devotion inc">knows you are to be obeyed</span> or <span class="trust dec">bad things will happen,</span>`);
						slave.devotion += 3;
						slave.trust -= 3;
					} else {
						r.push(`<span class="devotion inc">knows you are to be obeyed</span> and <span class="trust inc">trusted,</span>`);
						slave.devotion += 3;
						slave.trust += 3;
					}
					r.push(`even if ${he} can't understand why.`);
				}
				break;
			case "a breeder":
				if (slave.pregKnown === 1 && FutureSocieties.isActive('FSRepopulationFocus')) {
					r.push(`${His} life used to revolve around being pregnant all the time and nothing has changed. However, being surrounded with happy, heavily pregnant women leaves ${him} <span class="devotion inc">slightly more accepting</span> of ${his} fate and <span class="trust inc">hopeful</span> that ${his} trained body will be useful to you.`);
					slave.trust += 1;
					slave.devotion += 1;
				} else if (slave.pregControl === GestationDrug.FAST) {
					r.push(`${His} life used to revolve around being pregnant all the time and nothing has changed.`);
					if (!canSee(slave)) {
						r.push(`${He} can feel ${his} middle swell at a rate ${he} considers unnatural, which <span class="trust dec">frightens ${him}.</span>`);
					} else {
						r.push(`${He} <span class="trust dec">watches in horror</span> as ${his} middle visibly swells before ${his} eyes.`);
					}
					r.push(`${He} <span class="devotion inc">slips more into submission</span> as the pressure in ${his} womb increases.`);
					slave.trust -= 10;
					slave.devotion += 5;
				} else if (slave.pregKnown === 1 || slave.pregWeek < 0) {
					r.push(`${His} life used to revolve around being pregnant all the time and nothing has changed. ${He} <span class="trust dec">fears</span> that ${his} entire life will revolve around pregnancy and <span class="devotion inc">slips more into submission</span> of ${his} fate.`);
					slave.trust -= 1;
					slave.devotion += 1;
				} else {
					r.push(`${He} remembers how ${his} womb used to be swollen with children as often as possible, and is <span class="devotion inc">thankful</span> and <span class="trust inc">grateful</span> that ${he} isn't just meat to fuck pregnant anymore.`);
					slave.trust += 1;
					slave.devotion += 1;
				}
				break;
			case "a bioreactor":
				if (V.dairyRestraintsSetting < 2 || slave.assignment !== Job.DAIRY && slave.assignment !== Job.MILKED) {
					r.push(`${He} remembers what it was like to be a living, breathing, milk-jetting,`);
					if (isFertile(slave) && (V.dairyPregUpgrade > 0)) {
						r.push(`baby-filled,`);
					}
					if (slave.balls !== 0) {
						r.push(`cum-squirting,`);
					}
					r.push(`drug-filled piece of industrial equipment, and is <span class="devotion inc">thankful</span> and <span class="trust inc">grateful</span> that ${he} isn't any more.`);
					slave.trust += 1;
					slave.devotion += 1;
				}
				break;
			case "a Futanari Sister":
				if (V.masterSuiteUpgradeLuxury === 2) {
					if (slave.assignment === Job.MASTERSUITE) {
						r.push(`As a former Futanari Sister, the fuckpit in ${V.masterSuiteName} feels like home to ${him}, and ${he} has <span class="trust inc">no desire to ever leave.</span>`);
						slave.trust += 1;
					} else {
						r.push(`${He} knows that ${V.masterSuiteName} features a fuckpit much like the one ${he} spent years enjoying as a Futanari Sister, and <span class="devotion inc">does ${his} best</span> to be a good girl in the hope you'll send ${him} there someday.`);
						slave.devotion += 1;
					}
				}
				break;
			default:
				if (slave.trust >= -50) {
					if (App.Data.Careers.General.grateful.includes(slave.career)) {
						slave.trust += 1;
						r.push(`${He} remembers how hard ${his} life was before ${he} was a slave, and`);
						if (slave.trust > 50) {
							r.push(`<span class="trust inc">trusts you a bit more</span> for improving it.`);
						} else if (slave.trust >= -20) {
							r.push(`<span class="trust inc">trusts you a bit more</span> because of it.`);
						} else {
							r.push(`<span class="trust inc">fears you a little less</span> because of it.`);
						}
						slave.trust += 1;
					}
				}
				if (slave.devotion >= -50) {
					if (App.Data.Careers.General.menial.includes(slave.career)) {
						slave.devotion += 1;
						r.push(`${He} took orders a lot before ${he} was a slave, and is subconsciously`);
						if (slave.trust > 50) {
							r.push(`<span class="devotion inc">a little more eager to obey.</span>`);
						} else if (slave.trust >= -20) {
							r.push(`<span class="devotion inc">a little quicker to obey.</span>`);
						} else {
							r.push(`<span class="devotion inc">a bit less resistant</span> to commands.`);
						}
						slave.devotion += 1;
					}
				}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function organicFetishDevelopments(slave) {
		if (slave.assignment === Job.MILKED || slave.assignment === Job.DAIRY) {
			if (slave.lactation > 0) {
				if (slave.fetishStrength <= 95) {
					if (slave.fetish !== Fetish.BOOBS) {
						if (fetishChangeChance(slave) > random(0, 100)) {
							r.push(`Since ${he} has had ${his} lactating nipples constantly caressed by the milkers, <span class="fetish gain">${he} begins to appreciate nipple stimulation in a new way.</span>`);
							slave.fetish = Fetish.BOOBS;
							slave.fetishKnown = 1;
							slave.fetishStrength = 10;
						}
					} else if (slave.fetishStrength <= 95) {
						if (slave.fetishKnown === 1) {
							r.push(`Since ${he} has had ${his} lactating nipples constantly caressed by the milkers, <span class="fetish inc">${he} sinks deeper into sexual reliance on nipple stimulation.</span>`);
						}
						slave.fetishStrength += 4;
					}
				}
			}
			if (slave.balls > 0 || slave.prostate !== 0) {
				if (slave.fetishStrength <= 95) {
					if (slave.fetish !== Fetish.BUTTSLUT) {
						if (fetishChangeChance(slave) > random(0, 100)) {
							r.push(`Since ${he} has had ${his} prostate constantly stimulated to encourage ${him} to give cum, <span class="fetish gain">${he} begins to look forward to anal penetration.</span>`);
							slave.fetish = Fetish.BUTTSLUT;
							slave.fetishKnown = 1;
							slave.fetishStrength = 10;
						}
					} else {
						if (slave.fetishKnown === 1) {
							r.push(`Since ${he} has had ${his} prostate constantly stimulated to encourage ${him} to give cum, <span class="fetish inc">${he} sinks deeper into sexual reliance on penetration of ${his} butthole.</span>`);
						}
						slave.fetishStrength += 4;
					}
				}
			}
		}
		if (slave.heels === 1) {
			if (shoeHeelCategory(slave) === 0) {
				if (slave.fetish !== Fetish.SUBMISSIVE) {
					if (slave.career === "a dairy cow" || slave.career === "a breeding bull") {
						r.push(`${He} sees ${himself} as an animal, and as such, is perfectly content`);
						if (hasAllLimbs(slave)) {
							r.push(`walking on all fours.`);
						} else {
							r.push(`crawling on the ground.`);
						}
					} else {
						if (fetishChangeChance(slave) > random(0, 100)) {
							r.push(`Living as a sex slave on`);
							if (hasAllLimbs(slave)) {
								r.push(`all fours`);
							} else {
								r.push(`the ground`);
							}
							r.push(`<span class="fetish gain">turns ${him} into a sexual submissive.</span>`);
							slave.fetish = Fetish.SUBMISSIVE;
							slave.fetishKnown = 1;
							slave.fetishStrength = 65;
						}
					}
				} else {
					if (slave.fetishKnown === 1) {
						r.push(`Living as a sex slave on`);
						if (hasAllLimbs(slave)) {
							r.push(`all fours`);
						} else {
							r.push(`the floor`);
						}
						r.push(`<span class="fetish inc">pushes ${him} deeper into submission.</span>`);
					}
					slave.fetishStrength += 4;
				}
			}
		}
		if (!slave.piercing.genitals.smart || [SmartPiercingSetting.OFF, SmartPiercingSetting.NONE, SmartPiercingSetting.ALL, SmartPiercingSetting.MEN, SmartPiercingSetting.WOMEN, SmartPiercingSetting.ANTIMEN, SmartPiercingSetting.ANTIWOMEN].includes(slave.clitSetting)) {
			if (canDoAnal(slave)) {
				if (slave.vagina > -1 && !canDoVaginal(slave)) {
					if (slave.fetishStrength <= 95) {
						if (fetishChangeChance(slave) > random(0, 100)) {
							if (slave.assignment === Job.PUBLIC || slave.assignment === Job.CLUB) {
								if (slave.fetish !== Fetish.BUTTSLUT) {
									r.push(`With so much sexual attention focused on ${his} anus, <span class="fetish gain">${he} comes to view buttsex as the centerpiece of ${his} sexuality.</span>`);
									slave.fetish = Fetish.BUTTSLUT;
									slave.fetishKnown = 1;
									slave.fetishStrength = 10;
								} else if (slave.fetish === Fetish.BUTTSLUT && slave.fetishStrength <= 95) {
									if (slave.fetishKnown === 1) {
										r.push(`With so much sexual attention focused on ${his} anus, <span class="fetish inc">${his} love of anal increases.</span>`);
									}
									slave.fetishStrength += 4;
								}
							} else if (slave.assignment === Job.WHORE || slave.assignment === Job.BROTHEL) {
								if (slave.fetish !== Fetish.BUTTSLUT) {
									r.push(`With ${his} anus constantly sold for use, <span class="fetish gain">${he} comes to view buttsex as the centerpiece of ${his} sexuality.</span>`);
									slave.fetish = Fetish.BUTTSLUT;
									slave.fetishKnown = 1;
									slave.fetishStrength = 10;
								} else {
									if (slave.fetishKnown === 1) {
										r.push(`With ${his} anus constantly sold for use, <span class="fetish inc">${his} love of anal increases.</span>`);
									}
									slave.fetishStrength += 4;
								}
							}
						}
					}
				} else if (slave.vagina === -1) {
					if (slave.prostate !== 0) {
						if (slave.fetishStrength <= 95) {
							if (fetishChangeChance(slave) > random(0, 90)) {
								if (slave.assignment === Job.PUBLIC || slave.assignment === Job.CLUB) {
									if (slave.fetish !== Fetish.BUTTSLUT) {
										r.push(`Since most of ${his} orgasms are caused by prostate stimulation from anal sex with citizens, <span class="fetish gain">${he} comes to view ${his} asshole as ${his} primary sexual organ.</span>`);
										slave.fetish = Fetish.BUTTSLUT;
										slave.fetishKnown = 1;
										slave.fetishStrength = 10;
									} else {
										if (slave.fetishKnown === 1) {
											r.push(`After many, many prostate orgasms with a citizen's cock up ${his} butt, <span class="fetish inc">${his} love of anal increases.</span>`);
										}
										slave.fetishStrength += 4;
									}
								} else if (slave.assignment === Job.WHORE || slave.assignment === Job.BROTHEL) {
									if (slave.fetish !== Fetish.BUTTSLUT) {
										r.push(`Since most of ${his} orgasms are caused by prostate stimulation from anal sex with customers, <span class="fetish gain">${he} comes to view ${his} asshole as ${his} primary sexual organ.</span>`);
										slave.fetish = Fetish.BUTTSLUT;
										slave.fetishKnown = 1;
										slave.fetishStrength = 10;
									} else {
										if (slave.fetishKnown === 1) {
											r.push(`After many, many prostate orgasms with a customer's cock up ${his} butt, <span class="fetish inc">${his} love of anal increases.</span>`);
										}
										slave.fetishStrength += 4;
									}
								}
							}
						}
					}
				}
			}
			if (slave.rules.release.masturbation === 1) {
				if (slave.balls > 0) {
					if (slave.drugs === Drug.GROWTESTICLE || slave.drugs === Drug.INTENSIVETESTICLE || slave.drugs === Drug.HYPERTESTICLE) {
						if (fetishChangeChance(slave) > random(0, 100)) {
							if (slave.fetish !== Fetish.CUMSLUT) {
								r.push(`While masturbating, ${he}'s at first surprised but then aroused by ${his} drug-enhanced ejaculation. After repeatedly covering ${himself} in the stuff, <span class="fetish gain">${he}'s become a cum fetishist.</span>`);
								slave.fetish = Fetish.CUMSLUT;
								slave.fetishKnown = 1;
								slave.fetishStrength = 10;
							} else {
								if (slave.fetishKnown === 1) {
									r.push(`${His} masturbation sessions have come to consist mainly of ${him} blowing massive loads of cum into ${his} own mouth. <span class="fetish inc">${His} ejaculate addiction increases.</span>`);
								}
								slave.fetishStrength += 4;
							}
						}
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function paraphiliaAcquisition(slave) {
		let FSApproves = 0;
		if (slave.fetishStrength > random(80, 180)) {
			switch (slave.fetish) {
				case Fetish.SUBMISSIVE:
					if (slave.sexualFlaw !== SexualFlaw.NEGLECT) {
						if (slave.energy < 80) {
							if ([Job.PUBLIC, Job.WHORE, Job.BROTHEL, Job.CLUB, Job.GLORYHOLE, Job.ARCADE].includes(slave.assignment)) {
								r.push(`Serving as a sex worker drives ${him} deeper and deeper into submission, and ${he} pays less and less attention to ${his} own pleasure. <span class="paraphilia gain">${He}'s become sexually self neglectful,</span> and only cares about getting others off.`);
								slave.sexualFlaw = SexualFlaw.NEGLECT;
								slave.fetishStrength = 100;
								FSApproves = 1;
							}
						} else if (slave.aphrodisiacs > 0 || slave.inflationType === InflationLiquid.APHRO) {
							if (slave.addict > 2) {
								r.push(`${His} aphrodisiac addiction makes ${him} dependent on submission. <span class="paraphilia gain">${He}'s become sexually self neglectful,</span> and only cares about getting others off.`);
								slave.sexualFlaw = SexualFlaw.NEGLECT;
								slave.fetishStrength = 100;
								FSApproves = 1;
							}
						}
					}
					break;
				case Fetish.CUMSLUT:
					if (slave.sexualFlaw !== SexualFlaw.CUMADDICT) {
						if (slave.dietCum > 0) {
							r.push(`In addition to being an orally fixated cumslut, ${he} eats ejaculate in ${his} food, making the`);
							if (canTaste(slave)) {
								r.push(`taste`);
							} else {
								r.push(`texture`);
							}
							r.push(`omnipresent for ${him}. <span class="paraphilia gain">${He}'s become psychologically addicted to cum.</span>`);
							slave.sexualFlaw = SexualFlaw.CUMADDICT;
							slave.fetishStrength = 100;
							FSApproves = 1;
						} else if (slave.inflation !== 0 && slave.inflationType === InflationLiquid.CUM) {
							r.push(`In addition to being an orally fixated cumslut, ${he} is required to keep ${his} belly bloated with cum at all times, making ${his} life revolve around being full of cum. <span class="paraphilia gain">${He}'s become psychologically addicted to cum.</span>`);
							slave.sexualFlaw = SexualFlaw.CUMADDICT;
							slave.fetishStrength = 100;
							FSApproves = 1;
						} else if (V.cockFeeder !== 0) {
							r.push(`In addition to being an orally fixated cumslut, ${he} eats by sucking dick. <span class="paraphilia gain">${He}'s become psychologically addicted to cum.</span>`);
							slave.sexualFlaw = SexualFlaw.CUMADDICT;
							slave.fetishStrength = 100;
							FSApproves = 1;
						} else if (slave.aphrodisiacs > 0 || slave.inflationType === InflationLiquid.APHRO) {
							if (slave.addict > 2) {
								r.push(`${His} aphrodisiac addiction makes ${him} dependent on oral stimulation. <span class="paraphilia gain">${He}'s become psychologically addicted to cum.</span>`);
								slave.sexualFlaw = SexualFlaw.CUMADDICT;
								slave.fetishStrength = 100;
								FSApproves = 1;
							}
						}
					}
					break;
				case Fetish.BUTTSLUT:
					if (slave.sexualFlaw !== SexualFlaw.ANALADDICT) {
						if (slave.energy > 80) {
							if (slave.anus > 0) {
								if (slave.prostate > 0) {
									r.push(`${He} has a powerful sex drive, and constantly coming to prostate stimulation drives ${him} ever deeper into ${his} identity as a helpless anal slut. <span class="paraphilia gain">${He}'s become psychologically addicted to getting assfucked.</span>`);
									slave.sexualFlaw = SexualFlaw.ANALADDICT;
									slave.fetishStrength = 100;
									FSApproves = 1;
								} else if (slave.chastityVagina) {
									r.push(`${He} has a powerful sex drive, and since ${his} pussy's off limits, ${he} sinks ever deeper into ${his} identity as a helpless anal slut. <span class="paraphilia gain">${He}'s become psychologically addicted to getting assfucked.</span>`);
									slave.sexualFlaw = SexualFlaw.ANALADDICT;
									slave.fetishStrength = 100;
									FSApproves = 1;
								}
							}
						} else if (slave.aphrodisiacs > 0 || slave.inflationType === InflationLiquid.APHRO) {
							if (slave.addict > 2) {
								r.push(`${His} aphrodisiac addiction makes ${him} dependent on constant buttsex. <span class="paraphilia gain">${He}'s become psychologically addicted to getting assfucked.</span>`);
								slave.sexualFlaw = SexualFlaw.ANALADDICT;
								slave.fetishStrength = 100;
								FSApproves = 1;
							}
						}
					}
					break;
				case Fetish.HUMILIATION:
					if (slave.sexualFlaw !== SexualFlaw.ATTENTION) {
						if ([Job.PUBLIC, Job.WHORE, Job.BROTHEL, Job.CLUB].includes(slave.assignment)) {
							r.push(`Serving as a public sex worker gives ${him} plenty of delicious humiliation, and ${he} cares less and less about sex itself and more about making people blush. <span class="paraphilia gain">${He}'s become an attention whore.</span>`);
							slave.sexualFlaw = SexualFlaw.ATTENTION;
							slave.fetishStrength = 100;
							FSApproves = 1;
						} else if (slave.aphrodisiacs > 0 || slave.inflationType === InflationLiquid.APHRO) {
							if (slave.addict > 2) {
								r.push(`${His} aphrodisiac addiction makes ${him} dependent on stares to get off. <span class="paraphilia gain">${He}'s become an attention whore.</span>`);
								slave.sexualFlaw = SexualFlaw.ATTENTION;
								slave.fetishStrength = 100;
								FSApproves = 1;
							}
						}
					}
					break;
				case Fetish.BOOBS:
					if (slave.sexualFlaw !== SexualFlaw.BREASTEXP) {
						const boobSize = App.Medicine.fleshSize(slave, 'boobs');
						if (slave.drugs === Drug.GROWBREAST || slave.drugs === Drug.INTENSIVEBREAST) {
							r.push(`${He} loves ${his} tits, and feeling them respond to drug injections starts to hold more fascination for ${him} than mere sex. <span class="paraphilia gain">${His} sexual identity is now dominated by ${his} swelling boobs.</span>`);
							slave.sexualFlaw = SexualFlaw.BREASTEXP;
							slave.fetishStrength = 100;
							FSApproves = 1;
						} else if (slave.drugs === Drug.HYPERBREAST) {
							r.push(`${He} loves ${his} tits, and watching them steadily swell from the hyper injections starts to hold more fascination for ${him} than mere sex. <span class="paraphilia gain">${His} sexual identity is now dominated by ${his} swelling boobs.</span>`);
							slave.sexualFlaw = SexualFlaw.BREASTEXP;
							slave.fetishStrength = 100;
							FSApproves = 1;
						} else if (slave.geneticQuirks.gigantomastia === 2 && boobSize >= 25000) {
							r.push(`${He} loves ${his} tits, and measuring their`);
							if (V.geneticMappingUpgrade > 0) {
								r.push(`weekly growth from gigantomastia`);
							} else {
								r.push(`mysterious weekly growth`);
							}
							r.push(`starts to hold more fascination for ${him} than mere sex. <span class="paraphilia gain">${His} sexual identity is now dominated by ${his} swelling boobs.</span>`);
							slave.sexualFlaw = SexualFlaw.BREASTEXP;
							slave.fetishStrength = 100;
							FSApproves = 1;
						} else if (slave.hormoneBalance >= 100 && slave.boobs < 1000) {
							r.push(`${He} loves ${his} tits, and feeling them grow under female hormone treatments starts to hold more fascination for ${him} than mere sex. <span class="paraphilia gain">${His} sexual identity is now dominated by ${his} swelling boobs.</span>`);
							slave.sexualFlaw = SexualFlaw.BREASTEXP;
							slave.fetishStrength = 100;
							FSApproves = 1;
						} else if (slave.aphrodisiacs > 0 || slave.inflationType === InflationLiquid.APHRO) {
							if (slave.addict > 2) {
								r.push(`${His} aphrodisiac addiction makes ${him} dependent on ${his} tits for relief. <span class="paraphilia gain">${His} sexual identity is now dominated by ${his} swelling boobs.</span>`);
								slave.sexualFlaw = SexualFlaw.BREASTEXP;
								slave.fetishStrength = 100;
								FSApproves = 1;
							}
						}
					}
					break;
				case Fetish.SADIST:
					if (slave.sexualFlaw !== SexualFlaw.MALICIOUS) {
						if (slave.ID === V.WardenessID) {
							r.push(`As Wardeness, ${he} becomes <span class="paraphilia gain">sexually addicted to inflicting pain and anguish.</span>`);
							slave.sexualFlaw = SexualFlaw.MALICIOUS;
							slave.fetishStrength = 100;
							FSApproves = 1;
						} else if (slave.aphrodisiacs > 0 || slave.inflationType === InflationLiquid.APHRO) {
							if (slave.addict > 2) {
								r.push(`${His} aphrodisiac addiction makes ${him} dependent on degradation in other slaves to get off. ${He} becomes <span class="paraphilia gain">sexually addicted to inflicting pain and anguish.</span>`);
								slave.sexualFlaw = SexualFlaw.MALICIOUS;
								slave.fetishStrength = 100;
								FSApproves = 1;
							}
						}
					}
					break;
				case Fetish.DOM:
					if (slave.sexualFlaw !== SexualFlaw.ABUSIVE) {
						if (V.HeadGirlID !== 0) {
							if (V.HGSeverity >= 0) {
								if (slave.ID === V.HeadGirlID) {
									r.push(`As Head Girl, ${he}'s plentifully provided with misbehaving slaves to dominate sexually. ${He} becomes more and more eager until ${he}'s actively <span class="paraphilia gain">sexually abusive, getting off on the thrill of forcing ${himself} on other slaves.</span>`);
									slave.sexualFlaw = SexualFlaw.ABUSIVE;
									slave.fetishStrength = 100;
									FSApproves = 1;
								}
							}
						} else if (slave.aphrodisiacs > 0 || slave.inflationType === InflationLiquid.APHRO) {
							if (slave.addict > 2) {
								r.push(`${His} aphrodisiac addiction makes ${him} dependent on pain in others to get off. ${He}'s become <span class="paraphilia gain">sexually abusive, getting off on the thrill of forcing ${himself} on other slaves.</span>`);
								slave.sexualFlaw = SexualFlaw.ABUSIVE;
								slave.fetishStrength = 100;
								FSApproves = 1;
							}
						}
					}
					break;
				case Fetish.MASOCHIST:
					if (slave.sexualFlaw !== SexualFlaw.SELFHATING) {
						if (!getPersonalAttention(slave.ID, "torture") || App.EndWeek.saVars.slaveTortured === "none") { // exception handled in personalAttention
							if ([Job.GLORYHOLE, Job.ARCADE].includes(slave.assignment)) {
								r.push(`Condemned to serve as a public fuckhole, ${his} masochistic tendencies darken into sexual appreciation for ${his} life as a human sex toy. <span class="paraphilia gain">${He}'s descended into true self hatred.</span>`);
								slave.sexualFlaw = SexualFlaw.SELFHATING;
								slave.fetishStrength = 100;
								FSApproves = 1;
							} else if (slave.assignment === Job.DAIRY && V.dairyRestraintsSetting >= 2) {
								r.push(`Strapped into a milking machine's tender, penetrative embrace, ${his} masochistic tendencies darken into sexual appreciation for ${his} life as a human factory. <span class="paraphilia gain">${He}'s descended into true self hatred.</span>`);
								slave.sexualFlaw = SexualFlaw.SELFHATING;
								slave.fetishStrength = 100;
								FSApproves = 1;
							} else if (slave.aphrodisiacs > 0 || slave.inflationType === InflationLiquid.APHRO) {
								if (slave.addict > 2) {
									r.push(`${His} aphrodisiac addiction makes ${him} dependent on sexual self harm. <span class="paraphilia gain">${He}'s descended into true self hatred.</span>`);
									slave.sexualFlaw = SexualFlaw.SELFHATING;
									slave.fetishStrength = 100;
									FSApproves = 1;
								}
							}
						}
					}
					break;
				case Fetish.PREGNANCY:
					if (slave.sexualFlaw !== SexualFlaw.BREEDER) {
						if (slave.preg >= slave.pregData.normalBirth * .75 && slave.geneticQuirks.uterineHypersensitivity === 2) {
							r.push(`The constant pleasure ${he} feels from the movement in ${his} womb causes ${him} to pay more sexual attention to being pregnant than to impregnation. <span class="paraphilia gain">${He}'s become obsessed with breeding.</span>`);
							slave.sexualFlaw = SexualFlaw.BREEDER;
							slave.fetishStrength = 100;
							FSApproves = 1;
						} else if (slave.preg >= 37 && slave.broodmother > 0) {
							if (slave.broodmother === 2) {
								r.push(`${He}'s nearly bursting with life and giving birth constantly,`);
							} else {
								r.push(`${He}'s stuffed full of child and brings a new life into the world each week, with or without a good fucking,`);
							}
							r.push(`causing ${him} to pay more sexual attention to pregnancy than to impregnation. <span class="paraphilia gain">${He}'s become obsessed with breeding.</span>`);
							slave.sexualFlaw = SexualFlaw.BREEDER;
							slave.fetishStrength = 100;
							FSApproves = 1;
						} else if (slave.bellyPreg > 100 && slave.pregKnown === 1 && slave.pregSource === -1 && slave.breedingMark === 1 && V.propOutcome === 1 && slave.devotion > 75) {
							r.push(`${He}'s been marked to be the bearer of your offspring and is growing larger by the day with your child${slave.pregType > 1 ? "ren" : ""}. ${He} is to be nothing more than a vessel for your children, and as such <span class="paraphilia gain">has become obsessed with carrying them.</span>`);
							slave.sexualFlaw = SexualFlaw.BREEDER;
							slave.fetishStrength = 100;
							FSApproves = 1;
						} else if (slave.bellyPreg >= 120000) {
							r.push(`${He}'s so overfull with life that ${he} starts to pay much more sexual attention to pregnancy than to impregnation. <span class="paraphilia gain">${He}'s become obsessed with breeding.</span>`);
							slave.sexualFlaw = SexualFlaw.BREEDER;
							slave.fetishStrength = 100;
							FSApproves = 1;
						} else if (slave.counter.births > 10) {
							r.push(`${He}'s been bred so much that ${he} starts to pay as much sexual attention to pregnancy as to impregnation. <span class="paraphilia gain">${He}'s become obsessed with breeding.</span>`);
							slave.sexualFlaw = SexualFlaw.BREEDER;
							slave.fetishStrength = 100;
							FSApproves = 1;
						} else if (slave.assignment === Job.DAIRY && V.dairyPregSetting >= 2 && slave.pregKnown === 1) {
							r.push(`With ${his} womanhood fucked full of cum and fertility drugs, ${his} pregnancy fetish deepens into true perversity. <span class="paraphilia gain">${He}'s become obsessed with breeding.</span>`);
							slave.sexualFlaw = SexualFlaw.BREEDER;
							slave.fetishStrength = 100;
							FSApproves = 1;
						} else if (slave.aphrodisiacs > 0 || slave.inflationType === InflationLiquid.APHRO) {
							if (slave.addict > 2) {
								r.push(`${His} aphrodisiac addiction makes ${him} dependent on ${his} pregnancy fantasies. <span class="paraphilia gain">${He}'s become obsessed with breeding.</span>`);
								slave.sexualFlaw = SexualFlaw.BREEDER;
								slave.fetishStrength = 100;
								FSApproves = 1;
							}
						}
					}
					break;
			}
		}
		if (FSApproves) {
			if (FutureSocieties.isActive('FSHedonisticDecadence')) {
				r.push(`Allowing ${him} to indulge in ${his} fetish to the point of obsession advances hedonism and <span class="reputation inc">bolsters your reputation.</span>`);
				FutureSocieties.Change("Hedonistic", 2);
			}
		}
	}
};
