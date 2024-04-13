/**
 * @param {FC.ReportSlave} slave
 * @returns {string}
 */
App.SlaveAssignment.diet = function saDiet(slave) {
	/** @type {string[]} */
	const r = [];

	const gigantomastiaMod = slave.geneticQuirks.gigantomastia === 2 ? (slave.geneticQuirks.macromastia === 2 ? 3 : 2) : 1;
	const rearQuirk = slave.geneticQuirks.rearLipedema === 2 ? 2 : 0;
	const boobSize = App.Medicine.fleshSize(slave, 'boobs');
	const buttSize = App.Medicine.fleshSize(slave, 'butt');

	let growthGoal;
	let roll;
	let target;

	let weightGain = -1; // -1 used in cockFeeder()

	const {
		he, him, his, himself, He, His
	} = getPronouns(slave);

	if (V.feeder === 1) {
		feederUsed(slave);
	}
	foodEffects(slave);
	geneticQuirkEffects(slave);
	if (slave.fuckdoll === 0 && slave.fetish !== Fetish.MINDBROKEN) {
		if (slave.dietCum > 0) {
			cumDiet(slave);
		}
		if (V.cockFeeder === 1) {
			cockFeeder(slave);
		}
		if (V.revealFoodEffects === 1) {
			slaveFoodEffects(slave);
		}
	}

	return r.join(" ");

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function feederUsed(slave) {
		if (slave.diet !== Diet.HEALTHY) {
			r.push(`The upgraded kitchen closely monitors ${his} diet.`);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function cumIncreasesCumslut(slave) {
		if (slave.fetishStrength < 95) {
			if (slave.dietCum === 2) {
				r.push(`The high concentration of cum in ${his} food <span class="fetish inc">further`);
				if (slave.fetishStrength < 60) {
					r.push(`habituates`);
				} else {
					r.push(`endears`);
				}
				r.push(`${him} to the taste.</span>`);
				slave.fetishStrength += 2;
			} else if (slave.dietCum === 1) {
				r.push(`Having cum added to ${his} food makes ${him}`);
				if (slave.fetishStrength < 60) {
					r.push(`<span class="fetish inc">even more used to the taste of it.</span>`);
				} else {
					r.push(`<span class="fetish inc">love the taste of it even more.</span>`);
				}
				slave.fetishStrength += 1;
			}
		}
	}

	/**
	 * Weight loss
	 * @param {FC.ReportSlave} slave
	 */
	function restrictedDiet(slave) {
		let weightLoss = 5;
		if (slave.fuckdoll > 0) {
			r.push(`The ports in Fuckdoll suits allow total dietary control, and ${he}'s barely aware ${he}'s being <span class="change positive">slimmed down.</span>`);
			if (slave.weightDirection === -1) {
				slave.weight -= 12;
			} else if (slave.weightDirection === 1) {
				slave.weight -= 6;
			} else {
				slave.weight -= 9;
			}
		} else {
			if (slave.fetish !== Fetish.MINDBROKEN) {
				if (slave.behavioralFlaw === BehavioralFlaw.ANOREXIC) {
					if (slave.devotion >= -20) {
						r.push(`As an anorexic, <span class="devotion inc">${he} derives perverse enjoyment from being underfed.</span>`);
						slave.devotion += 1;
					} else {
						r.push(`As an anorexic, ${he} accepts being underfed.`);
					}
				} else if (slave.behavioralFlaw === BehavioralFlaw.GLUTTONOUS) {
					r.push(`As a stress glutton, <span class="trust dec">being underfed makes ${him} terribly anxious.</span>`);
					slave.trust -= 5;
				} else if (slave.behavioralQuirk === BehavioralQuirk.FITNESS) {
					r.push(`As a fitness fanatic, <span class="devotion inc">${he} enjoys slimming down.</span>`);
					slave.devotion += 1;
				} else if (slave.devotion <= 20) {
					r.push(`<span class="devotion dec">${He} resents being underfed.</span>`);
					slave.devotion -= 4;
				}
				if (slave.devotion <= 20) {
					if (slave.dietCum > 0) {
						if (slave.sexualFlaw !== SexualFlaw.CUMADDICT) {
							if (slave.fetish !== Fetish.CUMSLUT) {
								if (slave.dietCum === 2) {
									if (V.cockFeeder === 0) {
										if (random(1, 100) > 50) {
											r.push(`${His} <span class="devotion dec">disgusting diet</span> is little more than human ejaculate infused with nutritional supplements, and ${he}'s unable to hold most of it down.`);
											weightLoss = 8;
											slave.devotion -= 4;
										} else {
											r.push(`Despite ${his} food being filled with large amounts of thick, human ejaculate, ${he} manages to choke down enough that ${he} doesn't get sick from malnourishment.`);
											weightLoss = 6;
											slave.devotion -= 2;
										}
									} else {
										r.push(`The phallic feeders inject ${his} food directly into ${his} stomach, helping ${him} get ${his} prescribed servings so that ${his} weight loss is safe and consistent. However, the unmistakable taste of cum ${he} burps up afterward <span class="devotion dec">nauseates</span> and <span class="trust dec">unnerves</span> ${him}.`);
										weightLoss = 5;
										slave.devotion -= 3;
										slave.trust -= 1;
									}
								} else if (slave.dietCum === 1) {
									if (V.cockFeeder === 0) {
										if (random(1, 100) < 20) {
											r.push(`${He} is <span class="devotion dec">troubled</span> by the use of human ejaculate as a food additive, and ${he} has a problem keeping all of ${his} food down.`);
											weightLoss = 7;
											slave.devotion -= 2;
										} else {
											r.push(`Despite having human ejaculate added to ${his} food, ${he} manages to choke it down this week, <span class="devotion dec">but it's a struggle.</span>`);
											weightLoss = 5;
											slave.devotion -= 2;
										}
									} else {
										r.push(`The phallic feeders inject ${his} food directly into ${his} stomach, helping ${him} get ${his} prescribed servings so that ${his} weight loss is safe and consistent. However, the thought of being force-fed food with ejaculate in it <span class="devotion dec">disturbs ${him}.</span>`);
										weightLoss = 5;
										slave.devotion -= 3;
									}
								}
							} else {
								r.push(`${He}`);
								if (slave.fetishKnown === 0) {
									r.push(`clearly <span class="fetish gain">obviously likes cum,</span>`);
									slave.fetishKnown = 1;
								} else if (slave.fetishStrength < 20) {
									r.push(`is developing a taste for cum,`);
								} else if (slave.fetishStrength < 60) {
									r.push(`is used to eating cum,`);
								} else {
									r.push(`loves eating cum,`);
								}
								r.push(`so ${he}`);
								if (slave.behavioralFlaw === BehavioralFlaw.GLUTTONOUS) {
									r.push(`desperately`);
								}
								r.push(`sucks down every drop of the`);
								if (slave.dietCum === 2) {
									r.push(`nutritionally supplemented human ejaculate`);
								} else {
									r.push(`cum supplemented food`);
								}
								r.push(`${he}'s given to eat, especially because ${his} servings are small.`);
								cumIncreasesCumslut(slave);
							}
						}
					}
				} else { // For Devotion Higher than 20
					if (slave.sexualFlaw === SexualFlaw.CUMADDICT) {
						if (slave.dietCum === 2) {
							if (slave.behavioralFlaw !== BehavioralFlaw.ANOREXIC) {
								r.push(`Despite wanting more to eat, the`);
							} else {
								r.push(`The`);
							}
							r.push(`cum addict is relieved to have such high concentrations of cum in ${his} diet.`);
						} else if (slave.dietCum === 1) {
							r.push(`Although ${his} food is supplemented with ejaculate, ${he} is so addicted to cum that restricting the amount ${he} can eat <span class="devotion dec">upsets ${him}.</span>`);
							slave.devotion -= 1;
						}
					}
				}
			}
			if (weightLoss === 8) {
				r.push(`${His} <span class="change positive">weight loss</span> this week is so dramatic as to be dangerous, and <span class="health dec">${his} health suffers because of it.</span> <span class="trust dec">Your disregard for ${his} well-being scares ${him}.</span>`);
				healthDamage(slave, 4);
				slave.trust -= 2;
			} else if (weightLoss === 7) {
				r.push(`Distaste for ${his} food caused ${him} to <span class="change positive">lose weight</span> a bit too quickly, and by the end of the week ${he} looks <span class="trust dec">a little unsettled</span> and <span class="health dec">slightly malnourished.</span>`);
				healthDamage(slave, 1);
				slave.trust -= 1;
			} else if (weightLoss === 6) {
				r.push(`Due to ${his} distaste for ${his} diet, ${he} <span class="change positive">loses a bit more weight than ${he} was supposed to this week,</span> making ${him} <span class="trust dec">a little anxious.</span>`);
				slave.trust -= 1;
			} else if (weightLoss === 5) {
				r.push(`${He} <span class="change positive">loses weight.</span>`);
			}
			weightLoss += V.feeder * 2;
			if (slave.weightDirection === -1) {
				slave.weight -= (weightLoss + 3);
			} else if (slave.weightDirection === 1) {
				slave.weight -= (weightLoss - 3) - (V.feeder);
			} else {
				slave.weight -= weightLoss;
			}
		}
		slave.weight = Math.max(slave.weight, -100);
		if (slave.hormoneBalance > 30 && slave.geneMods.NCS !== 0) { // 'Expected' breast size based on weight for feminine-bodied slaves
			growthGoal = Math.trunc((100 + ((slave.weight + 100) * 5) + (2 * slave.lactationAdaptation)) * (0.85 + (slave.hormoneBalance / 400)) * gigantomastiaMod);
			roll = 300;
			target = Math.trunc(Math.clamp((weightLoss * 20) + (boobSize - growthGoal) / 5, 0, 270));
		} else { // For masculine and childish-bodied slaves
			growthGoal = ((slave.weight + 100) * 2 + slave.lactationAdaptation) * gigantomastiaMod;
			roll = 75;
			target = Math.trunc(Math.clamp(weightLoss * 2 + (boobSize - growthGoal) / 20, 0, 68));
		}
		if (random(1, roll) <= target && (gigantomastiaMod !== 3 && boobSize >= 100)) {
			if (random(1, 2) === 1) {
				r.push(`<span class="change negative">${His} breasts get smaller.</span>`);
				slave.boobs -= 100;
			} else {
				r.push(`<span class="change negative">${His} breasts get a little smaller.</span>`);
				slave.boobs -= 50 * (1 + slave.geneMods.NCS);
			}
		}
		if (slave.hormoneBalance > 30) { // 'Expected' butt size based on weight for feminine-bodied slaves, scaled up by 1000
			growthGoal = Math.trunc((slave.weight + 100) * 25 * (0.9 + slave.hormoneBalance / 600) * (rearQuirk / 2 + 1));
			roll = 40000;
			target = Math.trunc(Math.clamp(weightLoss * 1000 + (buttSize * 1000 - growthGoal) * 2, 0, 36000));
		} else { // For masculine- and childish-bodied slaves, likewise scaled up
			growthGoal = Math.trunc((slave.weight + 100) * 12.5) * (rearQuirk / 2 + 1);
			roll = 80000;
			target = Math.trunc(Math.clamp(weightLoss * 1000 + (buttSize * 1000 - growthGoal) * 4, 0, 72000));
		}
		if (random(1, roll) <= target && buttSize > 0) {
			if (slave.geneMods.NCS === 1 && buttSize > 2) {
				r.push(`<span class="change negative">${His} butt gets smaller.</span>`);
				slave.butt -= 2;
			} else {
				r.push(`<span class="change negative">${His} butt gets a little smaller.</span>`);
				slave.butt -= 1;
			}
		}
		if (slave.weight < -95) {
			r.push(`${He} is now quite skinny, so ${his} diet <span class="noteworthy">has defaulted to maintenance of this weight.</span>`);
			slave.diet = Diet.HEALTHY;
		}
	}

	/**
	 * Weight gain
	 * @param {FC.ReportSlave} slave
	 */
	function fatteningDiet(slave) {
		weightGain = 5;
		if (slave.fuckdoll > 0) {
			r.push(`The ports in Fuckdoll suits allow total dietary control, and ${he}'s barely aware ${he}'s being <span class="change positive">fattened up.</span>`);
			if (slave.weightDirection === 1) {
				slave.weight += 12;
			} else if (slave.weightDirection === -1) {
				slave.weight += 6;
			} else {
				slave.weight += 9;
			}
			weightGainShared(slave);
		} else {
			if (slave.fetish !== Fetish.MINDBROKEN) {
				if (slave.behavioralFlaw === BehavioralFlaw.ANOREXIC) {
					r.push(`Suffering from anorexia, <span class="devotion dec">${he} is intensely resentful of being overfed.</span>`);
					slave.devotion -= 5;
				} else if (slave.behavioralFlaw === BehavioralFlaw.GLUTTONOUS) {
					r.push(`As a glutton,`);
					if (slave.devotion >= -20) {
						r.push(`<span class="devotion inc">${he} derives almost sexual pleasure from being overfed.</span>`);
						slave.devotion += 4;
					} else {
						r.push(`${he} accepts being overfed.`);
					}
				} else if (App.Data.Careers.General.grateful.includes(slave.career) && slave.weight < 100) {
					r.push(`<span class="trust inc">${He} appreciates having a belly full of food.</span>`);
					slave.trust += 1;
				} else if (slave.devotion <= 20) {
					r.push(`<span class="devotion dec">${He} resents being overfed.</span>`);
					slave.devotion -= 4;
				}
				if (slave.devotion <= 20) {
					if (slave.dietCum > 0) {
						if (slave.sexualFlaw !== SexualFlaw.CUMADDICT) {
							if (slave.fetish !== Fetish.CUMSLUT) {
								if (slave.dietCum === 2) {
									if (V.cockFeeder === 0) {
										if (random(1, 100) > 50) {
											r.push(`<span class="devotion dec">${He} is disgusted</span> that ${he} is forced to drink large amounts of human ejaculate for sustenance.`);
											if (slave.sexualFlaw === SexualFlaw.HATESORAL) {
												r.push(`This is <span class="devotion dec">exacerbated</span> by ${his} hatred of oral sex.`);
												slave.devotion -= 1;
											}
											r.push(`${He} has trouble holding ${his} food down.`);
											weightGain = 0;
											slave.devotion -= 4;
										} else {
											r.push(`Despite ${his} food being filled with large amounts of human ejaculate, ${he} manages to keep some of it down, but <span class="devotion dec">${he} hates you for it.</span>`);
											weightGain = 2;
											slave.devotion -= 2;
										}
									} else {
										if (random(1, 100) < 30) {
											r.push(`The phallic feeders inject ${his} food directly into ${his} stomach, helping ${him} get the extra calories ${he}'s been prescribed, but the <span class="devotion dec">ejaculate based food is so heavy in ${his} tummy</span> that ${he} loses a tiny bit of ${his} intake to post-meal nausea.`);
											weightGain = 4;
											slave.devotion -= 4;
										} else {
											r.push(`The phallic feeders inject ${his} food directly into ${his} stomach, ensuring that ${he} gets all of ${his} prescribed calories, and <span class="devotion dec">despite some intense nausea afterwards,</span> ${he}'s able to keep ${his} heavy cum diet down.`);
											slave.devotion -= 4;
										}
									}
								} else if (slave.dietCum === 1) {
									if (V.cockFeeder === 0) {
										if (random(1, 100) < 15) {
											r.push(`${He} hates being forced to eat food that is supplemented with cum as ${his} primary source of`);
											if (slave.sexualFlaw === SexualFlaw.HATESORAL) {
												r.push(`nourishment, and ${his} hatred of oral sex makes it even worse.`);
											} else {
												r.push(`nourishment.`);
											}
											r.push(`<span class="trust dec">${He} is so disgusted</span> that ${he} has trouble keeping most of ${his} food down.`);
											weightGain = 0;
											slave.devotion -= 4;
										} else {
											r.push(`Despite ${his} food`);
											if (canTaste(slave)) {
												r.push(`tasting`);
											} else if (canSmell(slave)) {
												r.push(`smelling`);
											} else {
												r.push(`reminding ${him}`);
											}
											r.push(`strongly of cum, ${he} manages to choke down most of it this week, <span class="devotion dec">but ${he} resents being a cum-fed whore.</span>`);
											weightGain = 3;
											slave.devotion -= 2;
										}
									} else {
										r.push(`The phallic feeders inject ${his} food directly into ${his} stomach, helping ${him} get ${his} prescribed calories, even though <span class="devotion dec">${he} hates the idea of being force-fed cum.</span>`);
										slave.devotion -= 2;
									}
								}
							} else {
								if (slave.behavioralFlaw === BehavioralFlaw.ANOREXIC) {
									r.push(`Despite ${his} predilection to starve ${himself}, ${he}`);
								} else {
									r.push(`${He}`);
								}
								if (slave.fetishKnown === 0) {
									r.push(`apparently <span class="fetish gain">enjoys the taste of cum</span> enough that ${he}`);
									slave.fetishKnown = 1;
								} else if (slave.fetishStrength > 60) {
									r.push(`loves cum so much that ${he}`);
								}
								r.push(`can't help but suck down every drop of the nutrition infused human ejaculate ${he}'s given to eat.`);
								cumIncreasesCumslut(slave);
							}
						} else {
							if (slave.dietCum === 2) {
								r.push(`${He} hates ${himself} for it, but the cum addict is <span class="devotion inc">grateful</span> to have so much ejaculate in ${his} diet, especially because ${he}'s given extra food this week.`);
								slave.devotion += 1;
							} else if (slave.dietCum === 1) {
								r.push(`The cum addict <span class="trust dec">anxiously</span> slurps up every drop of ${his} cum-supplemented food this week. ${He} eats all the extra food ${he}'s given and is <span class="devotion inc">disturbed</span> by ${his} insatiable hunger for more.`);
								slave.devotion -= 1;
								slave.trust -= 1;
							}
						}
					}
					if (slave.dietMilk > 0) {
						if (slave.sexualFlaw !== SexualFlaw.BREASTEXP) {
							if (slave.fetish !== Fetish.PREGNANCY) {
								if (slave.dietMilk === 2) {
									if (V.cockFeeder === 0) {
										r.push(`Despite ${his} food being based on huge quantities of breast milk, ${he} manages to keep most of it down, but <span class="devotion dec">${he} hates you for it.</span>`);
										weightGain = 2;
										slave.devotion -= 2;
									} else {
										r.push(`The phallic feeders inject ${his} food directly into ${his} stomach, ensuring that ${he} gets all of ${his} prescribed calories, and <span class="devotion dec">despite some intense nausea afterwards,</span> ${he}'s able to keep ${his} heavy milk diet down.`);
										slave.devotion -= 4;
									}
								} else if (slave.dietMilk === 1) {
									if (V.cockFeeder === 0) {
										r.push(`Despite ${his} food`);
										if (canTaste(slave)) {
											r.push(`tasting`);
										} else if (canSmell(slave)) {
											r.push(`smelling`);
										} else {
											r.push(`reminding ${him}`);
										}
										r.push(`strongly of human breast milk, ${he} manages to choke down most of it this week, <span class="devotion dec">but ${he} resents being a milk-fed whore.</span>`);
										weightGain = 3;
										slave.devotion -= 2;
									} else {
										r.push(`The phallic feeders inject ${his} food directly into ${his} stomach, helping ${him} get ${his} prescribed calories, even though <span class="devotion dec">${he} hates the idea of being force-fed human milk.</span>`);
										slave.devotion -= 2;
									}
								}
							} else {
								if (slave.behavioralFlaw === BehavioralFlaw.ANOREXIC) {
									r.push(`Despite ${his} predilection to starve ${himself}, ${he}`);
								} else {
									r.push(`${He}`);
								}
								if (slave.fetishKnown === 0) {
									r.push(`apparently fetishizes some aspect of lactation enough that ${he}`);
								} else if (slave.fetishStrength > 60) {
									r.push(`loves breast milk so much that ${he}`);
								}
								r.push(`can't help but suck down every drop of the nutrition infused human milk ${he}'s given to eat.`);
								if (slave.fetishStrength < 95 && slave.fetishKnown === 1) {
									if (slave.dietMilk === 2) {
										r.push(`The high concentration of milk in ${his} food <span class="fetish inc">further`);
										if (slave.fetishStrength < 60) {
											r.push(`habituates`);
										} else {
											r.push(`endears`);
										}
										r.push(`${him} to the corruption of normal pregnancy and motherhood.</span>`);
										slave.fetishStrength += 1;
									} else if (slave.dietMilk === 1) {
										r.push(`Having milk added to ${his} food makes ${him}`);
										if (slave.fetishStrength < 60) {
											r.push(`<span class="fetish inc">accept perversion of normal pregnancy.</span>`);
										} else {
											r.push(`<span class="fetish inc">even hornier for anything related to pregnancy.</span>`);
										}
										slave.fetishStrength += 1;
									}
								}
							}
						} else {
							if (slave.dietMilk === 2) {
								r.push(`${He} hates ${himself} for it, but the breast growth fanatic is <span class="devotion inc">grateful</span> to have so much mother's milk in ${his} diet, especially because ${he}'s given extra food this week.`);
								slave.devotion += 1;
							} else if (slave.dietMilk === 1) {
								r.push(`The breast growth fanatic <span class="trust dec">anxiously</span> slurps up every drop of ${his} milk-supplemented food this week. ${He} eats all the extra food ${he}'s given and is <span class="devotion dec">disturbed</span> by ${his} insatiable hunger for more mother's milk.`);
								slave.devotion -= 1;
								slave.trust -= 1;
							}
						}
					}
				} else { // For Devotion Higher than 20 See Below for more diet effects for this condition
					if (slave.sexualFlaw === SexualFlaw.CUMADDICT) {
						if (slave.dietCum === 2) {
							r.push(`${His} diet is almost pure human ejaculate with nutritional`);
							if (slave.behavioralFlaw === BehavioralFlaw.ANOREXIC) {
								r.push(`additives. Despite ${his} desire to remain thin, ${his} cum addiction is even more powerful.`);
							} else {
								r.push(`additives — the perfect food for a cum addict.`);
							}
							r.push(`${He} gets extra food this week. ${He} makes a sloppy mess at feeding time, getting cum all over ${himself}, and ${he} is unashamed of ${his} pathological need to be your cum-fed slut. <span class="devotion inc">${He}'s a happy little cum-piggy.</span> The only drawback is that some of ${his} food ends up on ${him}, rather than in ${him}.`);
							slave.devotion += 3;
							weightGain = 4;
						} else if (slave.dietCum === 1) {
							r.push(`${His} food is infused with ejaculate,`);
							if (slave.behavioralFlaw === BehavioralFlaw.ANOREXIC) {
								r.push(`and ${his} cum addiction trumps ${his} desire to remain thin. ${He}`);
							} else {
								r.push(`${he}`);
							}
							r.push(`is <span class="devotion inc">thrilled to get extra this week.</span> ${He} gobbles down every last drop like the happy`);
							if (slave.weight < 0) {
								r.push(`little`);
							} else {
								r.push(`chubby`);
							}
							r.push(`cum addict ${he} is.`);
							slave.devotion += 2;
						}
					}
				}
			}
			if (weightGain > 0) {
				if (weightGain === 5) {
					r.push(`${He} <span class="change positive">gains weight.</span>`);
				} else if (weightGain >= 3) {
					r.push(`${He} <span class="change positive">gains some weight.</span>`);
				} else if (weightGain >= 1) {
					r.push(`${He} <span class="change positive">gains a little weight,</span> but ${his} progress was severely limited by what ${he} was forced to eat, <span class="trust dec">making for an anxious week for ${him}.</span>`);
					slave.trust -= 1;
				}
				weightGain += V.feeder * 2;
				if (slave.weightDirection === -1) {
					slave.weight += Math.max((weightGain - 3) - (V.feeder), 1);
				} else if (slave.weightDirection === 1) {
					slave.weight += weightGain + 3;
				} else {
					slave.weight += weightGain;
				}
				weightGainShared(slave);
				if (slave.geneticQuirks.galactorrhea === 2 && random(1, 100) < slave.hormoneBalance && slave.lactation === 0) {
					slave.inappropriateLactation = 1;
				}
			} else if (slave.weightDirection === 1) {
				r.push(`${He} gains a little weight this week despite ${his} dietary troubles.`);
				slave.weight += 1;
			} else {
				r.push(`${He} doesn't gain any weight this week.`);
			}
		}
		slave.weight = Math.min(slave.weight, 200);
	}

	/**
	 * Normalize weight towards 0
	 * @param {FC.ReportSlave} slave
	 */
	function correctiveDiet(slave) {
		let weightShift = 0;
		if (slave.weight < -10) {
			weightShift = V.feeder + 1;
			r.push(`By carefully adjusting ${his} intake, ${he} slowly puts on weight without realizing it.`);
		} else if (slave.weight > 10) {
			weightShift = -(V.feeder + 1);
			r.push(`By carefully adjusting ${his} intake, ${he} slowly loses weight without realizing it.`);
		}
		if (slave.weightDirection === -1) {
			slave.weight += (weightShift - random(0, 1));
		} else if (slave.weightDirection === 1) {
			slave.weight += (weightShift + random(0, 1));
		} else {
			slave.weight += weightShift;
		}
		if (weightShift < 0) {
			if (slave.hormoneBalance > 30 && slave.geneMods.NCS !== 0) { // 'Expected' breast size based on weight for feminine-bodied slaves
				growthGoal = Math.trunc((100 + (slave.weight + 100) * 5 + 2 * slave.lactationAdaptation) * (0.85 + slave.hormoneBalance / 400) * gigantomastiaMod);
				roll = 600;
				target = Math.trunc(Math.clamp(weightShift * 20 + (boobSize - growthGoal) / 5, 0, 270));
			} else { // For masculine- and childish-bodied slaves
				growthGoal = ((slave.weight + 100) * 2 + slave.lactationAdaptation) * gigantomastiaMod;
				roll = 200;
				target = Math.trunc(Math.clamp(weightShift * 2 + (boobSize - growthGoal) / 20, 0, 68));
			}
			if (random(1, roll) <= target && gigantomastiaMod !== 3 && boobSize >= 100) {
				if (random(1, 2) === 1) {
					r.push(`<span class="change negative">${His} breasts get smaller.</span>`);
					slave.boobs -= 20;
				} else {
					r.push(`<span class="change negative">${His} breasts get a little smaller.</span>`);
					slave.boobs -= 10 * (1 + slave.geneMods.NCS);
				}
			}
			if (slave.hormoneBalance > 30) { // 'Expected' butt size based on weight for feminine-bodied slaves, scaled up by 1000 */
				growthGoal = Math.trunc((slave.weight + 100) * 25 * (0.9 + slave.hormoneBalance / 600) * (rearQuirk / 2 + 1));
				roll = 60000;
				target = Math.trunc(Math.clamp(weightShift * 1000 + (buttSize * 1000 - growthGoal) * 2, 0, 36000));
			} else { // For masculine- and childish-bodied slaves, likewise scaled up
				growthGoal = Math.trunc((slave.weight + 100) * 12.5) * (rearQuirk / 2 + 1);
				roll = 100000;
				target = Math.trunc(Math.clamp(weightShift * 1000 + (buttSize * 1000 - growthGoal) * 4, 0, 72000));
			}
			if (random(1, roll) <= target && buttSize > 0) {
				r.push(`<span class="change negative">${His} butt gets a little smaller.</span>`);
				slave.butt -= 1;
				// FIXME: identical branches
				// if (slave.geneMods.NCS === 1 && buttSize > 2) {
				// 	r.push(`<span class="change negative">${His} butt gets a little smaller.</span>`);
				// 	slave.butt -= 1;
				// } else {
				// 	// TODO: write this
				// 	r.push(`<span class="change negative">${His} butt gets a little smaller.</span>`);
				// 	slave.butt -= 1;
				// }
			}
		} else if (weightShift > 0) {
			if (slave.hormoneBalance > 30 && slave.geneMods.NCS !== 1) { // 'Expected' breast size based on weight for feminine-bodied slaves */
				growthGoal = Math.trunc((100 + (slave.weight + 100) * 5 + 2 * slave.lactationAdaptation) * (0.85 + slave.hormoneBalance / 400) * gigantomastiaMod);
				roll = 600;
				target = Math.trunc(Math.clamp(weightShift * 20 - (boobSize - growthGoal) / 5, 0, 270));
			} else { // For masculine- and childish-bodied slaves */
				growthGoal = ((slave.weight + 100) * 2 + slave.lactationAdaptation) * gigantomastiaMod;
				roll = 200;
				target = Math.trunc(Math.clamp(weightShift * 2 - (boobSize - growthGoal) / 20, 0, 68));
			}
			if (slave.geneMods.NCS === 1) {
				roll *= 2;
			}
			if (random(1, roll) <= target) {
				if (random(1, 2) === 1) {
					r.push(`<span class="change positive">${His} breasts get bigger.</span>`);
					slave.boobs += 40 / (1 + slave.geneMods.NCS);
				} else {
					r.push(`<span class="change positive">${His} breasts get a little bigger.</span>`);
					slave.boobs += 20 / (1 + slave.geneMods.NCS);
				}
			}
			if (slave.hormoneBalance > 30) { // 'Expected' butt size based on weight for feminine-bodied slaves, scaled up by 1000
				growthGoal = Math.trunc((slave.weight + 100) * 25 * (0.9 + slave.hormoneBalance / 600) * (rearQuirk / 2 + 1));
				roll = 60000;
				target = Math.trunc(Math.clamp(weightShift * 1000 - (buttSize * 1000 - growthGoal) * 2, 0, 36000));
			} else { // For masculine- and childish-bodied slaves, likewise scaled up
				growthGoal = Math.trunc((slave.weight + 100) * 12.5) * (rearQuirk / 2 + 1);
				roll = 100000;
				target = Math.trunc(Math.clamp(weightShift * 1000 - (buttSize * 1000 - growthGoal) * 4, 0, 72000));
			}
			if (slave.geneMods.NCS === 1) {
				roll *= 2;
			}
			if (random(1, roll) <= target) {
				r.push(`<span class="change positive">${His} butt gets a little bigger.</span>`);
				slave.butt += 1;
			}
		}
		if (slave.weight >= -10 && slave.weight <= 10) {
			r.push(`${He} is now a healthy weight, so ${his} diet <span class="noteworthy">has defaulted to keeping it this way.</span>`);
			slave.diet = Diet.HEALTHY;
		}
	}

	/**
	 * Reduce fat by exercising - Fuckdoll variant
	 * @param {FC.ReportSlave} slave
	 */
	function burnFatFuckdoll(slave) {
		if (random(1, 100) > 90) {
			if (boobSize >= 200 * gigantomastiaMod && gigantomastiaMod !== 3) {
				r.push(`<span class="change negative">${His} breasts get a little smaller.</span>`);
				slave.boobs -= 50;
			} else if (buttSize > 1 && (slave.geneticQuirks.rearLipedema !== 2 || (buttSize > 10 && random(1, 100) > 80))) {
				r.push(`<span class="change negative">${His} butt gets a little smaller.</span>`);
				slave.butt -= 1;
			}
		}
		if (slave.weight > 10 && slave.weightDirection !== 1) {
			r.push(`${His} workouts have also <span class="change positive">burned off some excess fat.</span>`);
			slave.weight -= 2;
			if (slave.weightDirection === -1) {
				slave.weight -= 2;
			}
		}
	}

	/**
	 * Reduce fat by exercising - Slave variant
	 * @param {FC.ReportSlave} slave
	 */
	function burnFatSlave(slave,) {
		if ((slave.geneMods.NCS === 0 && random(1, 100) > 90) ||
			(slave.geneMods.NCS === 1 && random(1, 100) > 45)) {
			if ((slave.geneMods.NCS === 0 && boobSize >= 200) ||
				(slave.geneMods.NCS === 1 && boobSize > 100) && gigantomastiaMod !== 3) {
				if (slave.geneMods.NCS === 0) {
					r.push(`<span class="change negative">${His} breasts get a little smaller.</span>`);
					slave.boobs -= 50;
				} else {
					r.push(`<span class="change negative">${His} breasts get smaller.</span>`);
					slave.boobs -= 100;
				}
			} else if (buttSize > 1 && (slave.geneticQuirks.rearLipedema !== 2 || (buttSize > 10 && random(1, 100) > 80))) {
				if (slave.geneMods.NCS === 0 || buttSize === 1) {
					r.push(`<span class="change negative">${His} butt gets a little smaller.</span>`);
					slave.butt -= 1;
				} else {
					r.push(`<span class="change negative">${His} butt gets smaller.</span>`);
					slave.butt -= 2;
				}
			}
		}
		if (random(1, 100) > 80) {
			r.push(`${His} workout successes have <span class="health inc">improved ${his} health.</span>`);
			improveCondition(slave, 10);
		}
		if (slave.weight > 10 && slave.weightDirection !== 1) {
			r.push(`${His} workouts have also <span class="change positive">burned off some excess fat.</span>`);
			slave.weight -= 2;
			if (slave.weightDirection === -1) {
				slave.weight -= 2;
			}
		}
	}

	/**
	 * Muscle Gain
	 * @param {FC.ReportSlave} slave
	 */
	function muscleBuildingDiet(slave) {
		if (slave.fuckdoll > 0) {
			r.push(`Fuckdoll suits can force their inhabitants to`);
			if (hasAnyArms(slave)) {
				r.push(`lift weights`);
			} else {
				r.push(`exercise`);
			}
			r.push(`until they drop.`);
			if (slave.geneticQuirks.mGain === 2) {
				r.push(`${He} <span class="change positive">explosively builds`);
				if (V.geneticMappingUpgrade > 0) {
					r.push(`muscle</span> aided by ${his} myotonic hypertrophy.`);
				} else {
					r.push(`muscle.</span>`);
				}
				slave.muscles += 15;
			} else if (slave.geneticQuirks.mLoss === 2) {
				r.push(`${He} <span class="change positive">slowly gains`);
				if (V.geneticMappingUpgrade > 0) {
					r.push(`muscle</span> due to ${his} myotonic dystrophy.`);
				} else {
					r.push(`muscle.</span>`);
				}
				slave.muscles += 4;
			} else {
				r.push(`${He} <span class="change positive">quickly gains muscle.</span>`);
				slave.muscles += 9;
			}
			slave.muscles = Math.clamp(slave.muscles, -100, 100);
			burnFatFuckdoll(slave);
			if (slave.muscles === 100) {
				r.push(`${He} has plateaued at a state of <span class="lime">perfect musculature.</span>`);
				slave.diet = Diet.HEALTHY;
			}
			r.push(`The stress of forced exercise is trivial compared to everything else ${he} experiences, and ${he}'s unaffected mentally.`);
		} else {
			if (isAmputee(slave)) {
				r.push(`${He} is no longer capable of working out in any plausible way. ${His} special diet <span class="noteworthy">has ended.</span>`);
				slave.diet = Diet.HEALTHY;
			} else {
				if (slave.geneticQuirks.mGain === 2) {
					r.push(`${His} heavy workouts focus on lifting,`);
					if (V.geneticMappingUpgrade > 0) {
						r.push(`and with ${his} myotonic hypertrophy,`);
					} else {
						r.push(`and despite run-of-the-mill routines,`);
					}
					r.push(`${he} <span class="change positive">gains muscle rapidly.</span>`);
					slave.muscles += 10;
				} else if (slave.drugs === Drug.STEROID) {
					r.push(`${His} heavy workouts focus on lifting, and since ${he}'s on so much gear, ${he} <span class="change positive">gains muscle rapidly.</span>`);
					slave.muscles += 8 + slave.geneticQuirks.mGain;
				} else if (slave.geneticQuirks.mLoss === 2) {
					r.push(`${His} heavy workouts focus on lifting,`);
					if (V.geneticMappingUpgrade > 0) {
						r.push(`but with ${his} myotonic dystrophy,`);
					} else {
						r.push(`but despite ${his} efforts,`);
					}
					r.push(`${he} barely <span class="change positive">gains muscle.</span>`);
					slave.muscles += 2;
				} else if (slave.balls > 0 && slave.ballType !== "sterile" && slave.hormoneBalance >= 100) {
					r.push(`${His} heavy workouts focus on lifting, but with natural testosterone and artificial female hormones clashing in ${his} system, ${he} only <span class="change positive">slowly gains muscle.</span>`);
					slave.muscles += 3 + slave.geneticQuirks.mGain;
				} else if (slave.balls > 0 && slave.ballType !== "sterile" && slave.hormoneBalance <= -100) {
					r.push(`${His} heavy workouts focus on lifting, and with natural testosterone and artificial male hormones in ${his} system, ${he} <span class="change positive">gains muscle rapidly.</span>`);
					slave.muscles += 8;
				} else if (slave.balls > 0 && slave.ballType !== "sterile") {
					r.push(`${His} heavy workouts focus on lifting, and with natural testosterone in ${his} system, ${he} <span class="change positive">gains muscle.</span>`);
					slave.muscles += 5 + slave.geneticQuirks.mGain;
				} else if (slave.balls > 0) {
					r.push(`${His} heavy workouts focus on lifting, but with ${his} useless balls making little testosterone for ${his} system, ${he} only <span class="change positive">slowly gains muscle.</span>`);
					slave.muscles += 2 + slave.geneticQuirks.mGain;
				} else if (slave.hormoneBalance <= -100) {
					r.push(`${His} heavy workouts focus on lifting, and with artificial testosterone in ${his} system, ${he} <span class="change positive">gains muscle.</span>`);
					slave.muscles += 5 + slave.geneticQuirks.mGain;
				} else if (slave.hormoneBalance >= 100) {
					r.push(`${His} heavy workouts focus on lifting, but with lots of female hormones in ${his} system, ${he} barely <span class="change positive">gains muscle.</span>`);
					slave.muscles += 2 + slave.geneticQuirks.mGain;
				} else {
					r.push(`${His} heavy workouts focus on lifting, and ${he} <span class="change positive">slowly gains muscle.</span>`);
					slave.muscles += 3 + slave.geneticQuirks.mGain;
				}
				if (slave.behavioralQuirk === BehavioralQuirk.FITNESS) {
					r.push(`${He} attacks lifting with real enthusiasm, further increasing ${his} mass.`);
					slave.muscles += 2 + slave.geneticQuirks.mGain;
				}
				burnFatSlave(slave);
				slave.muscles = Math.clamp(slave.muscles, -100, 100);
				if (slave.muscles >= 100) {
					r.push(`${He} has plateaued at a state of <span class="lime">goddess-like musculature.</span>`);
					slave.diet = Diet.HEALTHY;
				}
			}
		}
	}

	/**
	 * Muscle Loss
	 * @param {FC.ReportSlave} slave
	 */
	function slimmingDiet(slave) {
		if (slave.fuckdoll > 0) {
			r.push(`Fuckdoll suits can force their inhabitants to exercise until they drop.`);
			if (slave.geneticQuirks.mLoss === 2) {
				r.push(`${He} <span class="change positive">rapidly sheds`);
				if (V.geneticMappingUpgrade > 0) {
					r.push(`muscle</span> aided by ${his} myotonic dystrophy.`);
				} else {
					r.push(`muscle.</span>`);
				}
				slave.muscles = Math.clamp(slave.muscles - 15, -100, 100);
			} else if (slave.geneticQuirks.mGain === 2) {
				r.push(`${He} <span class="change positive">slowly loses`);
				if (V.geneticMappingUpgrade > 0) {
					r.push(`musculature</span> due to ${his} myotonic hypertrophy steadily trying to put it back.`);
				} else {
					r.push(`musculature.</span>`);
				}
				slave.muscles -= 4;
			} else {
				r.push(`${He} <span class="change positive">loses musculature.</span>`);
				slave.muscles -= 9;
			}
			slave.muscles = Math.clamp(slave.muscles, -100, 100);
			burnFatFuckdoll(slave);
			if (slave.muscles <= 0) {
				r.push(`${He} has finally <span class="lime">lost all visible musculature.</span>`);
				slave.diet = Diet.HEALTHY;
			}
			r.push(`The stress of forced exercise is trivial compared to everything else ${he} experiences, and ${he}'s unaffected mentally.`);
		} else {
			if (!canWalk(slave)) {
				r.push(`${He} is no longer capable of actively working out. ${His} special diet <span class="noteworthy">has ended.</span>`);
				slave.diet = Diet.HEALTHY;
			} else if (slave.muscles > 0) {
				if (slave.geneticQuirks.mLoss === 2) {
					r.push(`${His} long workouts focus on cardio,`);
					if (V.geneticMappingUpgrade > 0) {
						r.push(`and with ${his} myotonic dystrophy,`);
					} else {
						r.push(`and despite run-of-the-mill routines,`);
					}
					r.push(`${he} <span class="change positive">rapidly loses musculature.</span>`);
					slave.muscles -= 10;
				} else if (slave.geneticQuirks.mGain === 2) {
					r.push(`${His} long workouts focus on cardio,`);
					if (V.geneticMappingUpgrade > 0) {
						r.push(`but with ${his} myotonic hypertrophy,`);
					} else {
						r.push(`but despite ${his} best efforts,`);
					}
					r.push(`${he} <span class="change positive">loses mass slowly.</span>`);
					slave.muscles -= 2;
				} else if (slave.drugs === Drug.STEROID) {
					r.push(`${His} long workouts focus on cardio, but since ${he}'s still shooting gear, ${he} <span class="change positive">loses mass slowly.</span>`);
					slave.muscles -= 3 + slave.geneticQuirks.mLoss;
				} else if (slave.balls > 0 && slave.ballType !== "sterile" && slave.hormoneBalance <= -100) {
					r.push(`${His} long workouts focus on cardio, but since ${he}'s got so much natural and artificial testosterone, ${he} <span class="change positive">loses mass slowly.</span>`);
					slave.muscles -= 3 + slave.geneticQuirks.mLoss;
				} else if (slave.balls > 0 && slave.ballType !== "sterile" && slave.hormoneBalance >= 100) {
					r.push(`${His} long workouts focus on cardio, and with the natural testosterone in ${his} system counteracted by hormone treatment, ${he} <span class="change positive">loses musculature.</span>`);
					slave.muscles -= 5 + slave.geneticQuirks.mLoss;
				} else if (slave.balls > 0 && slave.ballType !== "sterile") {
					r.push(`${His} long workouts focus on cardio, but with some natural testosterone in ${his} system, ${he} <span class="change positive">loses muscle slowly.</span>`);
					slave.muscles -= 3 + slave.geneticQuirks.mLoss;
				} else if (slave.balls > 0) {
					r.push(`${His} long workouts focus on cardio, and with ${his} useless balls not producing much testosterone, ${he} <span class="change positive">loses musculature.</span>`);
					slave.muscles -= 5 + slave.geneticQuirks.mLoss;
				} else if (slave.hormoneBalance >= 100) {
					r.push(`${His} long workouts focus on cardio, and with female hormone treatment, ${he} <span class="change positive">loses musculature rapidly.</span>`);
					slave.muscles -= 8 + slave.geneticQuirks.mLoss;
				} else if (slave.hormoneBalance <= -100) {
					r.push(`${His} long workouts focus on cardio, but under male hormone treatment, ${he} <span class="change positive">loses muscle slowly.</span>`);
					slave.muscles -= 3 + slave.geneticQuirks.mLoss;
				} else {
					r.push(`${His} long workouts focus on cardio, and ${he} <span class="change positive">loses musculature.</span>`);
					slave.muscles -= 5 + slave.geneticQuirks.mLoss;
				}
				if (slave.behavioralQuirk === BehavioralQuirk.FITNESS) {
					r.push(`${He} approaches endurance work with real enthusiasm, quickly slimming ${him} down.`);
					slave.muscles -= 2 + slave.geneticQuirks.mLoss;
				}
				burnFatSlave(slave);
				slave.muscles = Math.clamp(slave.muscles, 0, 100);
				if (slave.muscles <= 0) {
					r.push(`${He} has finally <span class="orange">lost all visible musculature.</span>`);
					slave.diet = Diet.HEALTHY;
				}
			} else {
				r.push(`${His} long workouts focus on cardio to keep ${his} body lithe.`);
				if (slave.behavioralQuirk === BehavioralQuirk.FITNESS) {
					r.push(`${He} <span class="devotion inc">enjoys</span> the time ${he}'s given to work out.`);
					slave.devotion += 2;
				}
				if (slave.muscles < -10) {
					r.push(`Since ${he} is rather weak, ${his} routine slowly tones ${his} soft muscles.`);
					slave.muscles++;
				}
				if (((slave.geneMods.NCS === 0 && boobSize >= 200) || (slave.geneMods.NCS === 1 && (boobSize > 100))) && gigantomastiaMod !== 3) {
					if (slave.geneMods.NCS === 0) {
						r.push(`<span class="change negative">${His} breasts get a little smaller.</span>`);
						slave.boobs -= 50;
					} else {
						r.push(`<span class="change negative">${His} breasts get smaller.</span>`);
						slave.boobs -= 100;
					}
				}
				if (random(1, 100) > 50) {
					if (buttSize > 1 && (slave.geneticQuirks.rearLipedema !== 2 || (buttSize > 10 && random(1, 100) > 80))) {
						r.push(`<span class="change negative">${His} butt loses a little mass.</span>`);
						slave.butt -= 1;
					}
				}
				if (random(1, 100) > 50 && slave.health.condition <= 90 && slave.health.condition >= -20) {
					r.push(`${His} workout successes have <span class="health inc">improved ${his} health.</span>`);
					improveCondition(slave, 5);
				}
				if (slave.weight > 10 && slave.weightDirection !== 1) {
					r.push(`${His} workouts have also <span class="change positive">burned off some excess fat.</span>`);
					slave.weight -= 2;
					if (slave.weightDirection === -1) {
						slave.weight -= 2;
					}
				}
			}
		}
	}

	/**
	 * @param {FC.ReportSlave} slave
	 */
	function cumProductionDiet(slave) {
		if (slave.fuckdoll > 0) {
			r.push(`Fuckdoll suits have easily attached reservoirs to catch excess cum.`);
			if (slave.geneMods.NCS === 0 && slave.balls < 6 && random(1, 100) > 90) {
				r.push(`${His} <span class="fetish gain">balls swell</span> to better accommodate ${his} increased cum production.`);
				slave.balls += 1;
			} else if (slave.geneMods.NCS === 1 && slave.balls < 3 && random(1, 100) > 95) {
				r.push(`${He}'s <span class="fetish gain">balls grow slightly</span> to better accommodate ${his} increased cum production.`);
				slave.balls += 1;
			}
		} else {
			if (slave.fetish !== Fetish.MINDBROKEN) {
				if (slave.attrXX < 80) {
					r.push(`${He} finds ${himself} <span class="improvement">fantasizing about fucking girls</span> in ${his} free time.`);
					slave.attrXX += 2;
				}
				if (slave.fetishKnown === 1) {
					if (slave.fetishStrength < 95 && slave.fetish === Fetish.PREGNANCY) {
						r.push(`${His} thoughts frequently drift towards <span class="fetish inc">bellies swelling with ${his} children</span> whenever ${he} has sex or pleasures ${himself}.`);
						slave.fetishStrength += 1;
					} else if (slave.energy < 90 && slave.fetish === Fetish.PREGNANCY) {
						r.push(`${His} eagerness for sex <span class="libido inc">grows stronger</span> the more ${his} aching nuts yearn to inseminate a fertile womb.`);
						slave.energy += 1;
					}
				}
				if (slave.fetishStrength <= 65) {
					if (slave.fetish !== Fetish.PREGNANCY) {
						if (fetishChangeChance(slave) > random(0, 100)) {
							r.push(`${He} begins to find the thought of filling a fertile womb with sperm <span class="fetish gain">irresistible.</span>`);
							fetishChange(slave, Fetish.PREGNANCY, 10);
						}
					}
				}
			}
			if (slave.geneMods.NCS === 0 && slave.balls < 6 && random(1, 100) > 90) {
				r.push(`${His} <span class="change positive">balls swell</span> to better accommodate ${his} increased cum production.`);
				slave.balls += 1;
			} else if (slave.geneMods.NCS === 1 && slave.balls < 3 && random(1, 100) > 95) {
				r.push(`${His} <span class="change positive">balls grow slightly</span> to better accommodate ${his} increased cum production.`);
				slave.balls += 1;
			}
		}
	}

	/**
	 * @param {FC.ReportSlave} slave
	 */
	function femaleHormonesDiet(slave) {
		if (slave.fuckdoll > 0) {
			r.push(`The ports in Fuckdoll suits allow total dietary control, and ${he}'s barely aware ${he}'s being <span class="lime">feminized.</span>`);
		} else {
			if (slave.behavioralQuirk === BehavioralQuirk.INSECURE) {
				if (slave.balls > 0) {
					r.push(`Despite some doubts lurking at the back of ${his} mind, your insistence that ${he} would be prettier if ${he} were more feminine <span class="devotion inc">lets ${him} enjoy</span> the estrogen rich food given to ${him}.`);
					slave.devotion += 1;
				} else if (slave.ovaries === 1 || slave.mpreg === 1) {
					r.push(`Despite some doubts lurking at the back of ${his} mind, your insistence that ${he} would be prettier if ${he} were more fertile <span class="devotion inc">lets ${him} enjoy</span> the estrogen rich food given to ${him}.`);
					slave.devotion += 1;
				}
			}
		}
		if ((slave.ovaries === 1 || slave.mpreg === 1) && slave.balls > 0) { // herm
			if (slave.weight < 30 && slave.weightDirection !== -1) {
				r.push(`Hormonal changes encourage ${his} body to <span class="change positive">grow softer.</span>`);
				slave.weight += 1;
				if (slave.weightDirection === 1) {
					slave.weight += 2;
				}
			}
			if (slave.geneMods.NCS === 0 && slave.boobs < 500 * gigantomastiaMod) {
				r.push(`${His} breasts <span class="change positive">grow slightly</span> from the estrogen.`);
				slave.boobs += 10;
			}
			if (slave.geneMods.NCS === 0 && slave.butt < 4 && random(1, 100) > (75 - (rearQuirk * 20))) {
				r.push(`${His} rear <span class="change positive">rounds out</span> to fit ${his} developing femininity.`);
				slave.butt += 1;
			}
			if (slave.waist > -20) {
				r.push(`Hormonal changes <span class="change positive">slim ${his} waist.</span>`);
				slave.waist--;
			}
			if (slave.dick > 1 && (((slave.geneMods.NCS === 0) && (random(1, 100) > 95)) || ((slave.geneMods.NCS === 1) && (random(1, 100) > 43)))) {
				if (slave.geneMods.NCS === 1 && slave.dick > 2) {
					r.push(`${His} dick <span class="change negative">shrinks down</span> due to ${his} body chemistry.`);
					slave.dick -= 1;
				} else {
					r.push(`${His} dick <span class="change negative">shrinks slightly</span> due to ${his} body chemistry.`);
				}
				slave.dick -= 1;
			}
			if (slave.balls > 1 && (((slave.geneMods.NCS === 0) && (random(1, 100) > 95)) || ((slave.geneMods.NCS === 1) && (random(1, 100) > 43)))) {
				if (slave.geneMods.NCS === 1 && slave.balls > 2) {
					r.push(`${His} balls <span class="change negative">shrink down</span> due to ${his} body chemistry.`);
					slave.balls -= 1;
				} else {
					r.push(`${His} balls <span class="change negative">shrivel</span> due to ${his} body chemistry.`);
				}
				slave.balls -= 1;
			}
		} else if (slave.ovaries === 1 || slave.mpreg === 1) { // female
			if (slave.weight < 40 && slave.weightDirection !== 1) {
				r.push(`Hormonal changes encourage ${his} body to <span class="change positive">grow softer.</span>`);
				slave.weight += 1;
				if (slave.weightDirection === 1) {
					slave.weight += 2;
				}
			}
			if (slave.geneMods.NCS === 0 && slave.boobs < 600 * gigantomastiaMod) {
				r.push(`${His} breasts <span class="change positive">grow slightly</span> from the estrogen.`);
				slave.boobs += 10;
			}
			if (slave.waist > -30) {
				r.push(`Hormonal changes <span class="change positive">slim ${his} waist.</span>`);
				slave.waist--;
			}
			if (slave.geneMods.NCS === 0 && slave.butt < 5 && random(1, 100) > (75 - (rearQuirk * 20))) {
				r.push(`${His} rear <span class="change positive">rounds out</span> to fit ${his} developing femininity.`);
				slave.butt += 1;
			}
		} else if (slave.balls > 0) { // male
			if (slave.weight < 20 && slave.weightDirection !== 1) {
				r.push(`Hormonal changes encourage ${his} body to <span class="change positive">grow softer.</span>`);
				slave.weight += 1;
				if (slave.weightDirection === 1) {
					slave.weight += 2;
				}
			}
			if (slave.geneMods.NCS === 0 && slave.boobs < 400 * gigantomastiaMod) {
				r.push(`${His} breasts <span class="change positive">grow slightly</span> from the estrogen.`);
				slave.boobs += 10;
			}
			if (slave.waist > -10) {
				r.push(`Hormonal changes <span class="change positive">slim ${his} waist.</span>`);
				slave.waist--;
			}
			if (slave.geneMods.NCS === 0 && slave.butt < 3 && random(1, 100) > (75 - (rearQuirk * 20))) {
				r.push(`${His} rear <span class="change positive">rounds out</span> to fit ${his} developing femininity.`);
				slave.butt += 1;
			}
			if (slave.dick > 1 && (((slave.geneMods.NCS === 0) && (random(1, 100) > 99)) || ((slave.geneMods.NCS === 1) && (random(1, 100) > 48)))) {
				if (slave.geneMods.NCS === 1 && slave.dick > 2) {
					r.push(`${His} dick <span class="change negative">shrinks down</span> due to ${his} body chemistry.`);
					slave.dick -= 1;
				} else {
					r.push(`${His} dick <span class="change negative">shrinks slightly</span> due to ${his} body chemistry.`);
				}
				slave.dick -= 1;
			}
			if (slave.balls > 1 && (((slave.geneMods.NCS === 0) && (random(1, 100) > 99)) || ((slave.geneMods.NCS === 1) && (random(1, 100) > 48)))) {
				if (slave.geneMods.NCS === 1 && slave.balls > 2) {
					r.push(`${His} balls <span class="change negative">shrink down</span> due to ${his} body chemistry.`);
					slave.balls -= 1;
				} else {
					r.push(`${His} balls <span class="change negative">shrivel</span> due to ${his} body chemistry.`);
				}
				slave.balls -= 1;
			}
		}
		if (slave.fuckdoll === 0) {
			if (slave.fetish !== Fetish.MINDBROKEN) {
				if (slave.attrXY < 100) {
					r.push(`${He} begins to find men <span class="change positive">a little more attractive</span> thanks to the female hormones.`);
					slave.attrXY += 1;
				}
			}
			if (slave.energy < 70) {
				r.push(`Hormones leave ${him} feeling <span class="change positive">a little more frisky</span> towards others.`);
				slave.energy += 1;
			}
		}
		if (slave.geneticQuirks.galactorrhea === 2 && random(1, 100) < slave.hormoneBalance && slave.lactation === 0) {
			slave.inappropriateLactation = 1;
		}
	}

	/**
	 * @param {FC.ReportSlave} slave
	 */
	function maleHormonesDiet(slave) {
		if (slave.fuckdoll > 0) {
			r.push(`The ports in Fuckdoll suits allow total dietary control, and ${he}'s barely aware ${he}'s becoming <span class="lime">masculine.</span>`);
		} else {
			if (slave.behavioralQuirk === BehavioralQuirk.INSECURE) {
				if (slave.balls > 0) {
					r.push(`Despite some doubts lurking at the back of ${his} mind, your insistence that ${he} would be handsomer if ${he} were more masculine <span class="devotion inc">lets ${him} enjoy</span> the testosterone rich food given to ${him}.`);
					slave.devotion += 1;
				} else if (slave.ovaries === 1 || slave.mpreg === 1) {
					r.push(`Despite some doubts lurking at the back of ${his} mind, your insistence that ${he} would be handsomer if ${he} were less feminine <span class="devotion inc">lets ${him} enjoy</span> the testosterone rich food given to ${him}.`);
					slave.devotion += 1;
				}
			}
		}
		if ((slave.ovaries === 1 || slave.mpreg === 1) && slave.balls > 0) { // herm
			if (slave.muscles < 30) {
				r.push(`Hormonal changes encourage ${his} body to <span class="change positive">gain muscle.</span>`);
				slave.muscles += 1 + slave.geneticQuirks.mGain;
			}
			if (slave.geneMods.NCS === 0 && slave.dick.isBetween(0, 4) && random(1, 100) > 95) {
				r.push(`${His} dick <span class="change positive">grows slightly</span> due to the male hormones in ${his} diet.`);
				slave.dick += 1;
			}
			if (slave.geneMods.NCS === 0 && slave.balls < 3 && random(1, 100) > 95) {
				r.push(`${His} balls <span class="change positive">swell</span> due to the male hormones in ${his} diet.`);
				slave.balls += 1;
			}
			if ((slave.geneMods.NCS === 0 && boobSize > 400) || (slave.geneMods.NCS === 1 && boobSize > 200) && gigantomastiaMod !== 3) {
				r.push(`${His} breasts <span class="change negative">lose some mass</span> from the lack of estrogen in ${his} diet.`);
				slave.boobs -= 10;
				if (slave.geneMods.NCS === 1) {
					slave.boobs -= 10;
				}
			}
			if (slave.waist < 15) {
				r.push(`Hormonal changes <span class="change negative">thicken ${his} waist.</span>`);
				slave.waist++;
			}
		} else if (slave.ovaries === 1 || slave.mpreg === 1) { // female
			if (slave.muscles < 15) {
				r.push(`Hormonal changes encourage ${his} body to <span class="change positive">gain muscle.</span>`);
				slave.muscles += 1 + slave.geneticQuirks.mGain;
			}
			if ((slave.geneMods.NCS === 0 && boobSize > 500) || (slave.geneMods.NCS === 1 && boobSize > 200) && gigantomastiaMod !== 3) {
				r.push(`${His} breasts <span class="change negative">lose some mass</span> from the lack of estrogen in ${his} diet.`);
				slave.boobs -= 10;
				if (slave.geneMods.NCS === 1) {
					slave.boobs -= 10;
				}
			}
			if (slave.waist < 0) {
				r.push(`Hormonal changes <span class="change negative">thicken ${his} waist.</span>`);
				slave.waist++;
			}
		} else if (slave.balls > 0) { // male
			if (slave.muscles < 60) {
				r.push(`Hormonal changes encourage ${his} body to <span class="change positive">gain muscle.</span>`);
				slave.muscles += 1 + slave.geneticQuirks.mGain;
			}
			if (slave.geneMods.NCS === 0 && slave.dick.isBetween(0, 4) && random(1, 100) > 95) {
				r.push(`${His} dick <span class="change positive">grows slightly</span> due to the male hormones in ${his} diet.`);
				slave.dick += 1;
			}
			if (slave.waist < 30) {
				r.push(`Hormonal changes <span class="change negative">thicken ${his} waist.</span>`);
				slave.waist++;
			}
			if (slave.geneMods.NCS === 0 && slave.balls < 3 && random(1, 100) > 95) {
				r.push(`${His} balls <span class="change positive">swell</span> due to the male hormones in ${his} diet.`);
				slave.balls += 1;
			}
			if (boobSize > 300 && gigantomastiaMod !== 3) {
				r.push(`${His} breasts <span class="change negative">lose some mass</span> to better suit ${his} body chemistry.`);
				slave.boobs -= 10;
			}
		}
		if (slave.fuckdoll === 0) {
			if (slave.fetish !== Fetish.MINDBROKEN) {
				if (slave.attrXX < 100) {
					r.push(`${He} begins to find women <span class="change positive">a little more attractive</span> thanks to the male hormones.`);
					slave.attrXX += 1;
				}
			}
			if (slave.energy < 70) {
				r.push(`Hormones leave ${him} feeling <span class="change positive">a little more frisky</span> towards others.`);
				slave.energy += 1;
			}
		}
	}

	/**
	 * @param {FC.ReportSlave} slave
	 */
	function futaHormonesDiet(slave) {
		if (slave.fuckdoll > 0) {
			r.push(`The ports in Fuckdoll suits allow total dietary control, and ${he}'s barely aware ${he}'s becoming <span class="change positive">androgynous.</span>`);
		} else {
			if (slave.behavioralQuirk === BehavioralQuirk.INSECURE) {
				r.push(`Despite some doubts lurking at the back of ${his} mind, your insistence that ${he} would be gorgeous if ${he} embraced both halves of ${his} sexuality <span class="devotion inc">lets ${him} enjoy</span> ${his} special diet.`);
				slave.devotion += 1;
			}
		}
		if (slave.muscles < 90) {
			r.push(`Hormonal changes encourage ${his} body to <span class="change positive">gain muscle.</span>`);
			slave.muscles += 1 + slave.geneticQuirks.mGain;
		}
		if (slave.weight < 50 && slave.weightDirection !== -1) {
			r.push(`Hormonal changes encourage ${his} body to <span class="change positive">grow softer.</span>`);
			slave.weight += 1;
			if (slave.weightDirection === 1) {
				slave.weight += 2;
			}
		}
		if (slave.geneMods.NCS === 0 && slave.boobs < 800 * gigantomastiaMod) {
			r.push(`${His} breasts <span class="change positive">grow slightly</span> to fit ${his} developing femininity.`);
			slave.boobs += 10;
		}
		if (slave.geneMods.NCS === 0 && slave.butt < 5 && random(1, 100) > (75 - (rearQuirk * 20))) {
			r.push(`${His} rear <span class="change positive">rounds out</span> to fit ${his} developing femininity.`);
			slave.butt += 1;
		}
		if (slave.geneMods.NCS === 0 && slave.dick.isBetween(0, 5) && random(1, 100) > 90) {
			r.push(`${His} dick <span class="change positive">grows slightly</span> to fit ${his} developing masculinity.`);
			slave.dick += 1;
		}
		if (slave.geneMods.NCS === 0 && slave.balls < 5 && random(1, 100) > 90) {
			r.push(`${His} balls <span class="change positive">swell</span> to fit ${his} developing masculinity.`);
			slave.balls += 1;
		}
		if (slave.waist < 0) {
			r.push(`Hormonal changes <span class="change negative">thicken ${his} waist.</span>`);
			slave.waist++;
		} else if (slave.waist > 0) {
			r.push(`Hormonal changes <span class="change positive">thin ${his} waist.</span>`);
			slave.waist--;
		}
		if (slave.fuckdoll === 0) {
			if (slave.fetish !== Fetish.MINDBROKEN) {
				if (slave.attrXX < 100) {
					r.push(`${He} begins to find women <span class="change positive">a little more attractive</span> thanks to ${his} specialized hormones.`);
					slave.attrXX += 1;
				}
				if (slave.attrXY < 100) {
					r.push(`${He} begins to find men <span class="change positive">a little more attractive</span> thanks to ${his} specialized hormones.`);
					slave.attrXY += 1;
				}
			}
			if (slave.energy < 90) {
				r.push(`Hormones leave ${him} feeling <span class="change positive">a little more frisky</span> towards others.`);
				slave.energy += 1;
			}
		}
		if (slave.geneticQuirks.galactorrhea === 2 && random(1, 100) < slave.hormoneBalance && slave.lactation === 0) {
			slave.inappropriateLactation = 1;
		}
	}

	/**
	 * Reduce .chem and increase health
	 * @param {FC.ReportSlave} slave
	 */
	function cleansingDiet(slave) {
		if (slave.fuckdoll > 0) {
			r.push(`The ports in Fuckdoll suits allow total dietary control, and ${he}'s barely aware ${he}'s <span class="health inc">becoming healthier.</span>`);
		} else if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${His} diet tastes and smells awful, but such things are lost on ${his} broken mind. ${His} body <span class="health inc">appreciates</span> it, however.`);
		} else if (!canSmell(slave) && !canTaste(slave)) {
			r.push(`${His} diet tastes and smells awful, but ${he} is incapable of recognizing it, allowing ${him} to feel nothing but its <span class="health inc">significant restorative effect.</span> ${He} <span class="trust inc">trusts you more</span> since you seem to care about ${his} health.`);
			slave.trust++;
		} else if (!canSmell(slave) || !canTaste(slave)) {
			r.push(`${His} diet <span class="devotion dec">tastes and smells awful,</span> but ${he} is thankfully only partially aware of this, allowing ${him} to appreciate its <span class="health inc">significant restorative effect</span> a bit more. ${He} <span class="trust inc">trusts you more</span> since you seem to care about ${his} health.`);
			slave.devotion -= 1;
			slave.trust++;
		} else if (slave.sexualFlaw === SexualFlaw.SELFHATING) {
			r.push(`${His} diet <span class="devotion inc">tastes and smells awful,</span> the perfect meal for such a wretched creature as ${himself}. ${He} knows you are <span class="health inc">preserving ${his} health</span> but doesn't understand why you'd waste time and credits on ${him}.`);
			slave.devotion += 2;
		} else {
			r.push(`${His} diet <span class="devotion dec">tastes and smells awful</span> but ${he} actively <span class="health inc">feels better</span> the more ${he} eats. ${He} <span class="trust inc">trusts you more</span> since you seem to care about ${his} health.`);
			slave.devotion -= 2;
			slave.trust++;
		}
		if (slave.health.condition <= 90) {
			improveCondition(slave, 2);
		}
		if (slave.chem > 2) {
			slave.chem -= 2;
		}
		if (slave.health.condition > 90 && slave.chem < 10) {
			if (slave.fuckdoll > 0) {
				r.push(`${He} can't get any healthier. <span class="noteworthy">${His} cleansing diet has been ended.</span>`);
			} else {
				r.push(`${His} health, all things considered, cannot get much better. <span class="noteworthy">${His} cleansing diet has ended.</span>`);
			}
			slave.diet = Diet.HEALTHY;
		}
	}

	/**
	 * Increases Fertility
	 * + ovum and small boosts to energy and attrXY
	 * @param {FC.ReportSlave} slave
	 */
	function fertilityDiet(slave) {
		const superFetKnown = (slave.geneticQuirks.superfetation === 2 && V.geneticMappingUpgrade > 0);
		if (slave.fuckdoll > 0) {
			r.push(`The ports in Fuckdoll suits allow total dietary control, and ${he}'s barely aware ${he}'s being <span class="change positive">prepared to carry multiples.</span>`);
		}
		if (!isFertile(slave) || (slave.preg !== 0)) {
			if (!superFetKnown) {
				if (slave.pregKnown === 0 && slave.preg > 0) {
					if (slave.fuckdoll > 0) {
						r.push(`${His} suit alerts you to the diet not working due to <span class="pregnant">pregnancy.</span>`);
					} else {
						r.push(`The diet is not properly working; tests reveal the reason is a <span class="pregnant">new pregnancy.</span>`);
					}
					slave.pregKnown = 1;
					r.push(`<span class="noteworthy">${His} fertility diet has been ended.</span>`);
					slave.diet = Diet.HEALTHY;
				} else {
					if (slave.fuckdoll > 0) {
						r.push(`${He} is no longer able to be impregnated.`);
					} else {
						r.push(`${He} is no longer able to get pregnant, for one reason or another.`);
					}
					r.push(`<span class="noteworthy">${His} fertility diet has been ended.</span>`);
					slave.diet = Diet.HEALTHY;
				}
			}
		}
		if (slave.diet === Diet.FERTILITY && slave.fuckdoll === 0) {
			if (slave.fetish === Fetish.MINDBROKEN) {
				r.push(`${He} doesn't really notice that <span class="change positive">${his} body is being prepared to`);
				if (superFetKnown) {
					r.push(`develop additional pregnancies`);
				} else {
					r.push(`carry multiples`);
				}
				r.push(`</span> by ${his} diet.`);
				if (slave.energy < 45 && slave.energy > 20) {
					r.push(`${He} begins craving <span class="libido inc">sex for the sole purpose of reproduction,</span> even if ${he} doesn't comprehend it.`);
					slave.energy++;
				}
			} else if (slave.sexualFlaw === SexualFlaw.BREEDER) {
				r.push(`${His} diet is <span class="change positive">prepping ${him} to`);
				if (superFetKnown) {
					r.push(`develop additional pregnancies,`);
				} else {
					r.push(`carry multiple fetuses,`);
				}
				r.push(`</span> and ${he} feels it. ${He}`);
				if (slave.bellyPreg >= 1000) {
					r.push(`<span class="devotion inc">eagerly awaits to find just how pregnant ${he} can become.</span>`);
				} else {
					r.push(`<span class="devotion inc">eagerly awaits to swell with children.</span>`);
				}
				slave.devotion += 2;
				if (slave.attrXY < 70) {
					r.push(`${He} certainly notices <span class="improvement">how much more attractive men are.</span>`);
					slave.attrXY += 2;
				}
				if (slave.energy < 45 && slave.energy > 20) {
					r.push(`${He} begins craving <span class="libido inc">penetrative sex and hot loads left inside ${him}</span> as well.`);
					slave.energy++;
				}
			} else {
				r.push(`${He} doesn't really notice that <span class="change positive">${his} body is being prepared to`);
				if (superFetKnown) {
					r.push(`develop additional pregnancies`);
				} else {
					r.push(`carry multiples`);
				}
				r.push(`</span> by ${his} diet, other than the slight`);
				if (slave.bellyPreg >= 1000) {
					r.push(`tingling in ${his} swollen belly.`);
				} else {
					r.push(`tingle in ${his} lower belly.`);
				}
				if (slave.attrXY < 70) {
					r.push(`${He} certainly notices <span class="improvement">how much more attractive men are,</span> however.`);
					slave.attrXY += 2;
				}
				if (slave.energy < 45 && slave.energy > 20) {
					r.push(`${He} begins craving <span class="libido inc">penetrative sex and hot loads left inside ${him}</span> as well.`);
					slave.energy++;
				}
			}
		}
	}

	/**
	 * @param {FC.ReportSlave} slave
	 */
	function foodEffects(slave) {
		switch (slave.diet) {
			case Diet.RESTRICTED: // weight loss
				restrictedDiet(slave);
				break;
			case Diet.FATTEN: // weight gain
				fatteningDiet(slave);
				break;
			case Diet.CORRECTIVE: // normalizes weight towards 0
				correctiveDiet(slave);
				break;
			case Diet.MUSCLE: // Muscle Gain
				muscleBuildingDiet(slave);
				break;
			case Diet.SLIM: // Muscle Loss
				slimmingDiet(slave);
				break;
			case Diet.CUM:
				cumProductionDiet(slave);
				break;
			case Diet.FEMALE:
				femaleHormonesDiet(slave);
				break;
			case Diet.MALE:
				maleHormonesDiet(slave);
				break;
			case Diet.FUTA:
				futaHormonesDiet(slave);
				break;
			case Diet.CLEANSE: // chem reduce and health plus
				cleansingDiet(slave);
				break;
			case Diet.FERTILITY:
				fertilityDiet(slave);
				break;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function weightGainShared(slave) {
		if (slave.hormoneBalance > 30 && slave.geneMods.NCS !== 1) { // 'Expected' breast size based on weight for feminine-bodied slaves */
			growthGoal = Math.trunc((100 + (slave.weight + 100) * 5 + 2 * slave.lactationAdaptation) * (0.85 + slave.hormoneBalance / 400) * gigantomastiaMod);
			roll = 300;
			target = Math.trunc(Math.clamp(weightGain * 20 - (boobSize - growthGoal) / 5, 0, 270));
		} else { // For masculine and childish-bodied slaves
			growthGoal = ((slave.weight + 100) * 2 + slave.lactationAdaptation) * gigantomastiaMod;
			roll = 75;
			target = Math.trunc(Math.clamp(weightGain * 2 - (boobSize - growthGoal) / 20, 0, 68));
		}
		if (slave.geneMods.NCS === 1 || V.arcologies[0].FSSlimnessEnthusiastFoodLaw === 1) {
			roll *= 2;
		}
		if (random(1, roll) <= target) {
			if (random(1, 2) === 1) {
				r.push(`<span class="change positive">${His} breasts get bigger.</span>`);
				slave.boobs += 100 / (1 + slave.geneMods.NCS);
			} else {
				r.push(`<span class="change positive">${His} breasts get a little bigger.</span>`);
				slave.boobs += 50 / (1 + slave.geneMods.NCS);
			}
		}
		if (slave.hormoneBalance > 30) { // 'Expected' butt size based on weight for feminine-bodied slaves, scaled up by 1000
			growthGoal = Math.trunc((slave.weight + 100) * 25 * (0.9 + slave.hormoneBalance / 600) * (rearQuirk / 2 + 1));
			roll = 40000;
			target = Math.trunc(Math.clamp(weightGain * 1000 - (buttSize * 1000 - growthGoal) * 2, 0, 36000));
		} else { // For masculine and childish-bodied slaves, likewise scaled up
			growthGoal = Math.trunc((slave.weight + 100) * 12.5) * (rearQuirk / 2 + 1);
			roll = 80000;
			target = Math.trunc(Math.clamp(weightGain * 1000 - (buttSize * 1000 - growthGoal) * 4, 0, 72000));
		}
		if (slave.geneMods.NCS === 1 || V.arcologies[0].FSSlimnessEnthusiastFoodLaw === 1) {
			roll *= 2;
		}
		if (random(1, roll) <= target) {
			r.push(`<span class="change positive">${His} butt gets a little bigger.</span>`);
			slave.butt += 1;
		}
		if (slave.weight > 200) {
			r.push(`${He} is now quite fat, so ${his} diet <span class="noteworthy">has defaulted to maintenance of this weight.</span>`);
			slave.diet = Diet.HEALTHY;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function geneticQuirkEffects(slave) {
		if (![Diet.MUSCLE, Diet.SLIM].includes(slave.diet)) {
			if (slave.geneticQuirks.mLoss === 2 && slave.muscles > -100) {
				if (V.geneticMappingUpgrade > 0) {
					r.push(`${His} body <span class="lime">passively loses muscle mass</span> due to ${his} myotonic dystrophy.`);
				}
				slave.muscles = Math.clamp(slave.muscles - 3, -100, 100);
			} else if (slave.geneticQuirks.mGain === 2 && slave.muscles < 100 && slave.weight >= -95) {
				if (V.geneticMappingUpgrade > 0) {
					r.push(`${His} body <span class="lime">passively builds muscle mass</span> due to ${his} myotonic hypertrophy.`);
				}
				slave.muscles = Math.clamp(slave.muscles + 3, -100, 100);
			}
		}
		if (![Diet.FATTEN, Diet.RESTRICTED, Diet.SLIM].includes(slave.diet)) {
			if (slave.weightDirection === -1 && slave.weight > -100) {
				if (V.geneticMappingUpgrade > 0) {
					r.push(`${His} body <span class="lime">aggressively burns fat</span> due to ${his}`);
					if (slave.geneticQuirks.wGain === 2 && slave.geneticQuirks.wLoss === 2) {
						r.push(`irregular leptin production.`);
					} else {
						r.push(`hypoleptinemia.`);
					}
				}
				slave.weight = Math.clamp(slave.weight - 3, -100, 200);
			} else if (slave.weightDirection === 1 && slave.geneticQuirks.wGain === 2 && slave.weight < 200) {
				if (V.geneticMappingUpgrade > 0) {
					r.push(`${His} body <span class="lime">aggressively stores fat</span> due to ${his}`);
					if (slave.geneticQuirks.wGain === 2 && slave.geneticQuirks.wLoss === 2) {
						r.push(`irregular leptin production.`);
					} else {
						r.push(`hyperleptinemia.`);
					}
				}
				slave.weight = Math.clamp(slave.weight + 3, -100, 200);
			}
		}
		if (slave.geneMods.livestock === 1 && [Diet.FATTEN, Diet.RESTRICTED, Diet.SLIM, Diet.CORRECTIVE, Diet.MALE, Diet.FUTA].includes(slave.diet)) {
			r.push(`The gene therapy to boost ${his} productivity has a side effect of weight gain, and since it complicates weight loss in the process, it might as well be <class="lime">fattening ${him} up for wholesale.</span>`);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string}
	 */
	function ejaculateDescription(slave) {
		if (slave.fetish === Fetish.MASOCHIST) {
			return `ejaculate of an abusive lover`;
		} else if (slave.fetish === Fetish.BOOBS) {
			return `fresh milk from a pretty dairy cow`;
		} else if (slave.fetish === Fetish.SUBMISSIVE) {
			return `ejaculate of a dominant partner`;
		} else if (slave.fetish === Fetish.PREGNANCY) {
			if (slave.ovaries === 1 || slave.mpreg === 1) {
				return `ejaculate of ${his} future baby's father`;
			} else {
				return `key to someday siring a child.`;
			}
		} else if (slave.fetish === Fetish.SADIST) {
			return `ejaculate of a painslut ${he} recently milked`;
		} else if (slave.fetish === Fetish.BUTTSLUT) {
			return `ejaculate of a cock that just came from ${his} butt`;
		} else if (slave.fetish === Fetish.DOM) {
			return `ejaculate of a weak-minded submissive`;
		} else if (slave.fetish === Fetish.HUMILIATION) {
			return `ejaculate of a publicly used slut`;
		} else {
			return `ejaculate of a gentle lover`;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function cumDiet(slave) {
		if (slave.devotion > 20) { // Diet effects for Devotion over 20 — For ALL cum diets
			if (slave.fetishStrength > 95 && slave.fetish === Fetish.CUMSLUT && slave.fetishKnown === 1) {
				r.push(`${He} <span class="devotion inc">regularly orgasms</span> while sucking down ${his} cum-infused breakfast.`);
				slave.devotion += 1;
			} else if (slave.energy > 95 || (slave.fetish === Fetish.CUMSLUT && slave.fetishKnown === 1)) {
				r.push(`${He} <span class="devotion inc">enjoys</span> the perversity of having large amounts of ejaculate in ${his} diet.`);
				slave.devotion += 1;
			} else if (slave.fetish === Fetish.CUMSLUT) { // high energy obscures cumlust
				r.push(`${He} <span class="devotion inc">seems to enjoy</span> consuming large amounts of ejaculate with each meal. ${He} undeniably <span class="fetish gain">has a taste for cum.</span>`);
				slave.devotion += 1;
				slave.fetishKnown = 1;
			}
			if (slave.fetishStrength <= 95) {
				if (slave.fetish !== Fetish.CUMSLUT) {
					if (fetishChangeChance(slave) > random(0, 100)) {
						r.push(`After sucking down cum for sustenance, ${he} has started to think of the stuff as a <span class="fetish gain">normal part</span> of life.`);
						fetishChange(slave, Fetish.CUMSLUT, 10);
					}
				}
			}
		} else { // For devotion under 20. This is for all cum diets EXCEPT restricted and fattening diets. See above for those effects
			if (slave.sexualFlaw !== SexualFlaw.CUMADDICT) {
				if (slave.fetish !== Fetish.CUMSLUT) {
					if (slave.diet !== Diet.FATTEN && slave.diet !== Diet.RESTRICTED) {
						if (slave.energy < 60) {
							if (slave.dietCum === 2) {
								r.push(`${His} diet is basically pure ejaculate supplemented by nutritional vitamins. Being forced to rely on human sex-fluid for sustenance <span class="devotion dec">nauseates ${him}.</span>`);
								slave.devotion -= 3;
							} else if (slave.dietCum === 1) {
								r.push(`${He} is <span class="devotion dec">nauseated</span> by the large amounts of ejaculate in ${his} diet.`);
								slave.devotion -= 2;
							}
							if (slave.weight > -100) {
								if (V.cockFeeder !== 1) {
									if (slave.dietCum === 2) {
										r.push(`${He} has trouble keeping ${his} disgusting food down; ${he} loses weight.`);
										slave.weight = Math.clamp(slave.weight - 5, -100, 200);
									} else if (slave.dietCum === 1) {
										if (random(1, 3) === 3) {
											r.push(`${He} has trouble keeping ${his} disgusting food down; ${he} loses weight.`);
											slave.weight = Math.clamp(slave.weight - 5, -100, 200);
											if (boobSize >= 200 * gigantomastiaMod && gigantomastiaMod !== 3) {
												r.push(`<span class="change negative">${His} breasts get a little smaller.</span>`);
												slave.boobs -= 50;
											} else if (buttSize > 1 && (slave.geneticQuirks.rearLipedema !== 2 || (slave.butt > 10 && random(1, 100) > 80))) {
												r.push(`<span class="change negative">${His} butt gets a little smaller.</span>`);
												slave.butt -= 1;
											}
										}
									}
								} else {
									r.push(`Despite ${his} revulsion, the deep-throating phallic feeders ensure that ${he} swallows all ${his} food.`);
								}
							}
						} else {
							if (slave.dietCum === 2) {
								if (slave.energy > 80) {
									r.push(`${He} has become so sex-driven that ${he} <span class="libido inc">appreciates the perversity</span> of ${his} extreme cum diet, despite <span class="devotion dec">it sometimes being a bit too much for ${him}.</span>`);
									slave.devotion -= 1;
									slave.energy += 1;
								} else {
									r.push(`${His} high sex drive helps ${him} pretend ${his} heavy cum-based diet is the`);
									r.push(ejaculateDescription(slave));
									r.push(`— helping ${him} keep ${his} <span class="devotion dec">unpleasant</span> food down.`);
									slave.devotion -= 1;
								}
							} else if (slave.dietCum === 1) {
								if (slave.energy > 80) {
									r.push(`${He} has become so sex-driven that ${he} appreciates the perversity of ${his} cum diet, making ${him} <span class="libido inc">feel hot</span> just eating it.`);
									slave.energy += 2;
								} else {
									r.push(`${His} high sex drive helps ${him} pretend ${his} cum-supplemented diet is the`);
									r.push(ejaculateDescription(slave));
									r.push(`— helping ${him} swallow ${his} food without complaint.`);
								}
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
	function cockFeeder(slave) {
		// Cockfeeder effects independent of diet type. There are other special cockfeeder effects for fattening and slimming cum diets above
		if (slave.sexualFlaw === SexualFlaw.HATESORAL) {
			if (weightGain === -1) {
				if (random(1, 100) > 80) {
					r.push(`Getting ${his} sustenance only after working the phallic food dispensers in the kitchen forces ${him} to <span class="flaw break">accept oral sex</span> as a fact of life.`);
					slave.sexualFlaw = SexualFlaw.NONE;
				} else {
					r.push(`Being forced to get ${his} sustenance only by working the phallic food dispensers in the kitchen <span class="devotion dec">infuriates ${him},</span> since ${he} hates oral.`);
					slave.devotion -= 4;
				}
			}
		} else if (slave.fetish === Fetish.CUMSLUT) {
			if (slave.fetishKnown === 0) {
				r.push(`Being forced to get ${his} sustenance only by working the phallic food dispensers in the kitchen has revealed something: <span class="fetish gain">${he}'s got an oral fetish!</span>`);
				slave.fetishKnown = 1;
			} else if (slave.fetishStrength <= 95 && slave.devotion > 20) {
				r.push(`Being forced to get ${his} sustenance only by working the phallic food dispensers in the kitchen has <span class="fetish inc">deepened ${his} oral fixation.</span>`);
				slave.fetishStrength += 5;
			}
		} else {
			if (weightGain === -1) {
				if (slave.devotion < -20) {
					r.push(`Being forced to get ${his} sustenance only by working the phallic food dispensers in the kitchen <span class="devotion dec">disgusts ${him}.</span>`);
					slave.devotion -= 2;
				} else if (fetishChangeChance(slave) > random(0, 100)) {
					r.push(`Getting ${his} sustenance only after working the phallic food dispensers in the kitchen makes sucking cock to completion such an integral part of ${his} life that ${he} starts to <span class="fetish gain">fetishize ejaculate.</span>`);
					fetishChange(slave, Fetish.CUMSLUT, 10);
				}
			}
		}
		if (slave.sexualQuirk === SexualQuirk.GAGFUCK) {
			r.push(`${He} <span class="devotion inc">secretly enjoys</span> gagging on ${his} breakfast every morning.`);
			slave.devotion += 1;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function slaveFoodEffects(slave) {
		r.push(`${He} knows that every meal of the liquid slave food ${he}`);
		if (V.cockFeeder === 1) {
			r.push(`sucks down`);
		} else {
			r.push(`eats`);
		}
		r.push(`makes it less and less likely that ${he}'ll ever survive without it,`);
		if (slave.devotion > 50) {
			r.push(`but ${he} actually <span class="trust inc">takes a kind of comfort</span> in knowing that ${he}'ll always be a slave.`);
			slave.trust++;
		} else if (slave.devotion > 20) {
			r.push(`but since ${he}'s been broken to slavery, ${he} does ${his} best not to think about it.`);
		} else if (slave.devotion >= -20) {
			r.push(`and though ${he} does ${his} best not to think about it, it sometimes makes ${him} <span class="trust dec">cry ${himself} to sleep.</span>`);
			slave.trust--;
		} else {
			r.push(`knowledge that fills ${him} with <span class="trust dec">fear</span> and <span class="devotion dec">horror</span> every time ${he} thinks about it.`);
			slave.trust--;
			slave.devotion--;
		}
	}
};
