/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.SlaveAssignment.drugs = function saDrugs(slave) {
	let r = "";

	const intensive = (slave.drugs === Drug.INTENSIVEBREAST || slave.drugs === Drug.INTENSIVEBUTT ||
		slave.drugs === Drug.INTENSIVEPENIS || slave.drugs === Drug.INTENSIVETESTICLE) ? 1 : 0;
	const gigantomastiaMod = slave.geneticQuirks.gigantomastia === 2 ? (slave.geneticQuirks.macromastia === 2 ? 3 : 2) : 1;
	const rearLipedemaMod = slave.geneticQuirks.rearLipedema === 2 ? 1 : 0;
	const boobSize = App.Medicine.fleshSize(slave, 'boobs');
	const buttSize = App.Medicine.fleshSize(slave, 'butt');

	const {
		he, him, his, himself, He, His
	} = getPronouns(slave);

	if (slave.drugs !== Drug.NONE) {
		drugEffects(slave);
	}
	if (slave.pregControl !== "none" && slave.pregKnown === 1) {
		pregnancyDrugEffects(slave);
	}
	if (slave.curatives > 1) {
		curativeEffects(slave);
	}
	if (slave.aphrodisiacs > 0) {
		aphrodisiacEffects(slave);
	}
	healthAndWellness(slave);
	if (slave.drugs !== Drug.NONE) {
		drugExpiry(slave);
	}

	return r;

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string}
	 */
	function galactorrheaTriggerCheck(slave) {
		if (slave.geneticQuirks.galactorrhea === 2 && slave.lactation === 0 && random(1, 100) <= slave.hormoneBalance) {
			slave.lactation = 1;
			slave.lactationDuration = 2;
			if (V.geneticMappingUpgrade > 0) {
				return ` The sudden surge of hormones has unsurprisingly <span class="lime">triggered ${his} galactorrhea.</span>`;
			} else {
				return ` Hormonal effects have caused ${him} to <span class="lime">begin lactating.</span>`;
			}
		}
		return "";
	}

	/**
	 * Decreases butt growth if NCS is active.
	 *
	 * @param {App.Entity.SlaveState} slave
	 * @param {number} growth without NCS applied
	 * @returns {number}
	 */
	function ncsFightsButtGrowth(slave, growth) {
		if (slave.geneMods.NCS === 1) {
			growth = Math.trunc(growth / 2.2);
			r += ` ${His} <span class="orange">NCS</span> kicks in fighting the butt growth, `;
			if (growth > 1) {
				r += `converting the excess fat into sexual energy.`;
			} else {
				r += `but has no effect.`;
			}
			slave.energy += growth;
		}
		return growth;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function drugEffects(slave) {
		let dietInfluence;
		let growth;
		let shrinkage;

		r += ` `;
		switch (slave.drugs) {
			case Drug.HORMONEENHANCE:
				r += `${His} drug regime prepares ${his} body to accept hormonal effects.`;
				break;
			case Drug.HORMONEBLOCK:
				break; // hormone blockers take effect solely in saLongTermEffects - this is a placeholder to prevent the unrecognized drug handler from clearing .drugs
			case Drug.PRIAPISM:
				if (slave.dick === 0) {
					r += `Since ${he} lacks a dick, it is pointless to try and keep it hard. <span class="yellow">${His} drug regimen has been ended.</span>`;
					slave.drugs = Drug.NONE;
				} else if (slave.chastityPenis === 1) {
					r += `A tight cage around a dick forced hard are a bad mix so <span class="yellow">${his} drug regimen has been ended.</span>`;
					slave.drugs = Drug.NONE;
				} else if (slave.health.condition <= -50) {
					r += `${He} is too unwell to risk further health complications from priapism. <span class="yellow">${His} drug regimen has been ended.</span>`;
					slave.drugs = Drug.NONE;
				} else if (slave.dick > 10) {
					r += `${His} dick is so enormous that attempts to force an erection would kill ${him}. <span class="yellow">${His} drug regimen has been mercifully ended.</span>`;
					slave.drugs = Drug.NONE;
				} else {
					r += `${His} drug regime keeps ${his} dick <span class="health dec">painfully erect.</span>`;
					healthDamage(slave, 5);
					if (slave.dick >= 7) {
						r += ` The amount of blood needed to keep ${his} oversized cock hard has <span class="health dec">severe effects on ${his} health!</span>`;
						healthDamage(slave, slave.dick * 5);
					}
				}
				break;
			case Drug.PSYCHOSUPP:
				if (slave.fetish !== Fetish.MINDBROKEN) {
					r += `The psychosuppressants <span class="hotpink">reduce ${his} ability to question ${his} role</span> or <span class="mediumaquamarine">think independently.</span>`;
					slave.devotion += 4;
					slave.trust += 4;
					if (slave.intelligence >= -95) {
						r += ` They <span class="orange">negatively impact ${his} intelligence,</span> as well.`;
						slave.intelligence -= 5;
					}
					if (slave.fuckdoll === 0 && slave.intelligence < -15 && slave.fetishStrength <= 60 && slave.fetish !== Fetish.SUBMISSIVE && fetishChangeChance(slave) > jsRandom(0, 100)) {
						r += ` The willingness to <span class="lightcoral">submit</span> created by the drugs invades ${his} sexuality, too.`;
						slave.fetish = Fetish.SUBMISSIVE;
						slave.fetishKnown = 1;
						slave.fetishStrength = 10;
					}
				} else {
					r += `The psychosuppressants have little effect on ${his} passive mind.`;
				}
				break;
			case Drug.PSYCHOSTIM:
				r += `${He} takes a cup of <span class="deepskyblue">mind stimulating</span> tea with each meal;`;
				if (slave.fetish !== Fetish.MINDBROKEN) {
					r += ` the soothing drink <span class="mediumaquamarine">sets ${his} thoughts at ease.</span>`;
					if (slave.devotion < -50) {
						slave.trust += 6;
					} else if (slave.devotion < -20) {
						slave.trust += 4;
					} else if (slave.devotion <= 20) {
						slave.trust += 2;
					} else {
						slave.trust += 1;
					}
					slave.intelligence += 1;
					if (slave.energy > 60) {
						r += ` ${He} spends <span class="libido dec">less time thinking about sex,</span> as well.`;
						if (slave.energy > 95) {
							slave.energy -= 3;
						} else if (slave.energy > 80) {
							slave.energy -= 2;
						} else {
							slave.energy -= 1;
						}
					}
				} else {
					r += ` it has little effect on ${his} passive mind.`;
				}
				break;
			case Drug.HYPERBREAST:
				slave.chem += 2;
				growth = (1 + V.injectionUpgrade) * 3 * gigantomastiaMod;
				r += ` ${He} receives <span class="lime">direct injections of`;
				if (V.injectionUpgrade !== 0) {
					r += ` advanced`;
				}
				r += ` hyper growth hormones, right into ${his} breasts;</span>`;
				if (slave.diet === Diet.FATTEN) {
					r += ` all the food ${he}'s required to consume fuels growth, `;
					if (slave.health.condition > -20) {
						r += `and`;
					} else {
						r += `but`;
					}
					growth += 6;
				} else if (slave.diet === Diet.FERTILITY) {
					r += ` the fertility hormones in ${his} food favor breast growth, `;
					if (slave.health.condition > -20) {
						r += `and`;
					} else {
						r += `but`;
					}
					growth += 1;
				} else if (slave.diet === Diet.RESTRICTED) {
					r += ` ${his} restricted diet means ${his} body has few resources to grow on, `;
					if (slave.health.condition > -20) {
						r += `and`;
					} else {
						r += `but`;
					}
					growth -= 1;
				} else if (slave.weight > 130) {
					r += ` the enormous diet ${he} eats to maintain ${his} ${slave.weight > 195 ? `whale-like` : `hugely fat`} body helps support growth, `;
					if (slave.health.condition > -20) {
						r += `and`;
					} else {
						r += `but`;
					}
					growth += 4;
				} else if (slave.weight > 30) {
					r += ` the generous diet ${he} eats to maintain ${his} ${slave.weight > 95 ? `fat` : `chubby`} body helps support growth, `;
					if (slave.health.condition > -20) {
						r += `and`;
					} else {
						r += `but`;
					}
					growth += 2;
				} else if (slave.weight <= -30) {
					r += ` the diet ${he} is required to maintain to keep slim impedes growth, `;
					if (slave.health.condition > -20) {
						r += `and`;
					} else {
						r += `but`;
					}
					growth--;
				}
				if (slave.health.condition > 80) {
					r += ` ${his} perfect health supports growth extremely well, `;
					if (slave.boobs < 5000 || slave.boobs >= 10000) {
						r += `and`;
					} else {
						r += `but`;
					}
					growth += 6;
				} else if (slave.health.condition > -20) {
					r += ` ${his} health supports growth, `;
					if (slave.boobs < 2000 || slave.boobs >= 10000) {
						r += `and`;
					} else {
						r += `but`;
					}
				} else {
					r += ` ${his} poor health does not support steady growth, but`;
					growth--;
				}
				r += ` ${his}`;
				if (slave.boobs < 800) {
					r += ` small chest tends to grow rapidly.`;
					growth += 10;
					if (slave.boobShape !== BreastShape.SAGGY && slave.boobsImplant / slave.boobs < 0.5 && slave.breastMesh !== 1) {
						if (jsRandom(1, 10) < 5) {
							r += ` As ${his} boobs rapidly grow, they become saggy under their own rapid weight gain.`;
							slave.boobShape = BreastShape.SAGGY;
						}
					}
				} else if (slave.boobs < 2000) {
					r += ` modest tits tend to grow fast.`;
					growth += 8;
					if (slave.boobShape !== BreastShape.SAGGY && slave.boobsImplant / slave.boobs < 0.5 && slave.breastMesh !== 1) {
						if (jsRandom(1, 10) < 5) {
							r += ` As ${his} boobs rapidly grow, they become saggy under their own rapid weight gain.`;
							slave.boobShape = BreastShape.SAGGY;
						}
					}
				} else if (slave.boobs < 5000) {
					r += ` heavy boobs tend to grow modestly.`;
					growth += 6;
					if (slave.boobShape !== BreastShape.SAGGY && (slave.boobsImplant / slave.boobs < 0.5) && slave.breastMesh !== 1) {
						if (jsRandom(1, 10) === 1) {
							r += ` As they grow, they <span class="coral">begin to sag</span> under their own monstrous weight, ${his} mass of breastflesh directing ${his} nipples downward.`;
							slave.boobShape = BreastShape.SAGGY;
						}
					}
				} else if (slave.boobs < 10000) {
					r += ` huge boobs tend to grow slowly.`;
					growth += 4;
					if (slave.boobShape !== BreastShape.SAGGY && (slave.boobsImplant / slave.boobs < 0.5) && slave.breastMesh !== 1) {
						if (jsRandom(1, 10) === 1) {
							r += ` As they grow, they <span class="coral">begin to sag</span> under their own monstrous weight, ${his} mass of breastflesh directing ${his} nipples downward.`;
							slave.boobShape = BreastShape.SAGGY;
						}
					}
				} else {
					r += ` monstrous udders are just the right size to experience the explosive growth the drugs promise.`;
					growth += 10;
					if (slave.boobShape !== BreastShape.NORMAL && (slave.boobsImplant / slave.boobs < 0.9) && slave.breastMesh !== 1) {
						if (jsRandom(1, 10) === 1) {
							r += ` ${His} <span class="coral">breasts lose their unique shape</span> as they adapt to their monstrous, unnatural size. There's simply nowhere else for ${his} mass of boob to go, and its expansion fills ${his} breasts out and points ${his} nipples forward.`;
							slave.boobShape = BreastShape.NORMAL;
						}
					}
				}
				if (slave.geneMods.NCS === 1) {
					growth = Math.trunc(growth / 2.2);
					r += ` ${His} <span class="orange">NCS</span> kicks in fighting the breast growth, converting the excess fat into sexual energy for ${him}.`;
					slave.energy += growth;
				}
				growth = 25 * Math.trunc(growth * 0.8);
				slave.boobs += Math.clamp(growth, 25, 5000);
				if (jsRandom(1, 100) > 30 + (slave.areolae * 10) && slave.areolae < 4) {
					r += ` The increase in breast size <span class="lime">stretches and broadens ${his} areolae.</span>`;
					slave.areolae += 1;
				}
				if (jsRandom(1, 100) > 70 && slave.nipples !== NippleShape.INVERTED && slave.nipples !== NippleShape.FUCKABLE && slave.nipples !== NippleShape.FLAT) {
					if ([NippleShape.CUTE, NippleShape.HUGE, NippleShape.PUFFY, NippleShape.TINY].includes(slave.nipples)) {
						r += ` The explosive increase in breast flesh also <span class="lime">completely swallows ${his} nipples.</span>`;
						slave.nipples = NippleShape.INVERTED;
					}
				}
				if (slave.geneticQuirks.gigantomastia === 3 && jsRandom(1, 200) < slave.hormoneBalance) {
					slave.geneticQuirks.gigantomastia = 2;
				}
				if (slave.geneticQuirks.macromastia === 3 && jsRandom(1, 200) < slave.hormoneBalance) {
					slave.geneticQuirks.macromastia = 2;
				}
				if (slave.geneticQuirks.galactorrhea === 2 && slave.lactation === 0 && random(1, 50) <= slave.hormoneBalance) {
					if (V.geneticMappingUpgrade > 0) {
						r += ` The sudden surge of hormones has unsurprisingly <span class="lime">triggered ${his} galactorrhea.</span>`;
					} else {
						r += ` Hormonal effects have caused ${him} to <span class="lime">begin lactating.</span>`;
					}
					slave.lactation = 1;
					slave.lactationDuration = 2;
				}
				break;
			case Drug.GROWBREAST:
			case Drug.INTENSIVEBREAST:
				growth = 1 + V.injectionUpgrade * gigantomastiaMod;
				r += ` ${He} receives <span class="lime">`;
				if (intensive) {
					r += ` massive`;
					growth *= 2;
				}
				r += ` injections of`;
				if (V.injectionUpgrade !== 0) {
					r += ` advanced`;
				}
				r += ` growth hormones, right into ${his} breasts;</span>`;
				if (slave.diet === Diet.FATTEN) {
					r += ` all the food ${he}'s required to consume fuels growth, `;
					if (slave.health.condition > -20) {
						r += `and`;
					} else {
						r += `but`;
					}
					growth += 2;
				} else if (slave.diet === Diet.FERTILITY) {
					r += ` the fertility hormones in ${his} food favor breast growth, `;
					if (slave.health.condition > -20) {
						r += `and`;
					} else {
						r += `but`;
					}
					growth += 1;
				} else if (slave.diet === Diet.RESTRICTED) {
					r += ` ${his} restricted diet means ${his} body has few resources to grow on, `;
					if (slave.health.condition > -20) {
						r += `but`;
					} else {
						r += `and`;
					}
					growth -= 2;
				} else if (slave.weight > 130) {
					r += ` the enormous diet ${he} eats to maintain ${his} ${slave.weight > 195 ? `whale-like` : `hugely fat`} body helps support growth, `;
					if (slave.health.condition > -20) {
						r += `and`;
					} else {
						r += `but`;
					}
					growth++;
				} else if (slave.weight > 30) {
					r += ` the generous diet ${he} eats to maintain ${his} ${slave.weight > 95 ? `fat` : `chubby`} body helps support growth, `;
					if (slave.health.condition > -20) {
						r += `and`;
					} else {
						r += `but`;
					}
					growth++;
				} else if (slave.weight <= -30) {
					r += ` the diet ${he} is required to maintain to keep slim impedes growth, `;
					if (slave.health.condition > -20) {
						r += `and`;
					} else {
						r += `but`;
					}
					growth--;
				}
				if (slave.health.condition > 80) {
					r += ` ${his} perfect health supports growth extremely well, `;
					if (slave.boobs < 2000) {
						r += `and`;
					} else {
						r += `but`;
					}
					growth++;
				} else if (slave.health.condition > -20) {
					r += ` ${his} health supports growth, `;
					if (slave.boobs < 2000) {
						r += `and`;
					} else {
						r += `but`;
					}
				} else {
					r += ` ${his} poor health does not support steady growth, `;
					if (slave.boobs < 2000) {
						r += `and`;
					} else {
						r += `but`;
					}
					growth--;
				}
				r += ` ${his}`;
				if (slave.boobs < 800) {
					r += ` modest chest tends to grow quickly.`;
					growth += 3;
					if (slave.boobShape !== BreastShape.TORPEDO && slave.boobShape !== BreastShape.WIDE && slave.breastMesh !== 1) {
						if (jsRandom(1, 10) === 1) {
							if (slave.shoulders < 0) {
								r += ` <span class="lime">As ${his} boobs grow, they take on a torpedo shape within the frame of ${his} narrow shoulders,</span> projecting a long way from ${his} chest and swinging delightfully when ${he}'s naked.`;
								slave.boobShape = BreastShape.TORPEDO;
							} else {
								r += ` <span class="lime">As ${his} boobs grow, they become widely set across the broadness of ${his} chest,</span> spreading sideways even when ${he}'s not lying on ${his} back.`;
								slave.boobShape = BreastShape.WIDE;
							}
						}
					}
				} else if (slave.boobs < 2000) {
					r += ` big tits tend to grow readily.`;
					growth += 2;
					if (slave.boobShape === BreastShape.SAGGY || (slave.boobShape === BreastShape.DOWNWARD && slave.breastMesh !== 1)) {
						if (jsRandom(1, 10) === 1) {
							r += ` <span class="lime">As they grow, they lose their sag,</span> with the expanding tissue lifting ${his} nipples up to point forward.`;
							slave.boobShape = BreastShape.NORMAL;
						}
					}
				} else if (slave.boobs < 5000) {
					r += ` heavy boobs tend to grow slowly.`;
					growth++;
					if (slave.boobShape !== BreastShape.SAGGY && (slave.boobsImplant / slave.boobs < 0.5) && slave.breastMesh !== 1) {
						if (jsRandom(1, 10) === 1) {
							r += ` <span class="coral">As they grow, they begin to sag</span> under their own monstrous weight, ${his} mass of breastflesh directing ${his} nipples downward. `;
							slave.boobShape = BreastShape.SAGGY;
						}
					}
				} else {
					r += ` monstrous udders tend to grow very slowly.`;
					if (slave.boobShape !== BreastShape.NORMAL && slave.breastMesh !== 1) {
						if (jsRandom(1, 10) === 1) {
							r += ` <span class="coral">${His} breasts lose their unique shape</span> as they adapt to their monstrous, unnatural size. There's simply nowhere else for ${his} mass of boob to go, and its expansion fills ${his} breasts out and points ${his} nipples forward.`;
							slave.boobShape = BreastShape.NORMAL;
						}
					}
				}
				if (slave.geneMods.NCS === 1) {
					growth = Math.trunc(growth / 2.2);
					r += ` ${His} <span class="orange">NCS</span> kicks in fighting the breast growth, converting the excess fat into sexual energy for ${him}.`;
					slave.energy += growth;
				}
				growth = 25 * Math.trunc(growth * 0.8);
				slave.boobs += Math.clamp(growth, 25, 200);
				if (slave.areolae < 4) {
					if (growth > slave.areolae * 25) {
						r += ` The increase in breast size <span class="lime">stretches and broadens ${his} areolae.</span>`;
						slave.areolae += 1;
					}
				}
				if (slave.nipples !== NippleShape.HUGE && (slave.nipples !== NippleShape.FUCKABLE) && (slave.nipples !== NippleShape.FLAT)) {
					if (jsRandom(1, 200) < growth) {
						if (slave.nipples === NippleShape.TINY) {
							r += ` The hormones also <span class="lime">cause nipple growth.</span>`;
							slave.nipples = NippleShape.CUTE;
						} else if (slave.nipples === NippleShape.CUTE) {
							if (jsRandom(1, 2) === 1) {
								r += ` The hormones also <span class="lime">cause ${his} cute nipples to become puffy.</span>`;
								slave.nipples = NippleShape.PUFFY;
							} else {
								r += ` The explosive breast growth also <span class="lime">causes ${his} cute nipples to become partially inverted.</span>`;
								slave.nipples = NippleShape.PARTIAL;
							}
						} else if (slave.nipples === NippleShape.PUFFY) {
							if (jsRandom(1, 2) === 1) {
								r += ` The hormones also <span class="lime">cause ${his} puffy nipples to become really enormous.</span>`;
								slave.nipples = NippleShape.HUGE;
							} else {
								r += ` The explosive breast growth also <span class="lime">causes ${his} puffy nipples to become completely inverted.</span>`;
								slave.nipples = NippleShape.INVERTED;
							}
						} else if (slave.nipples === NippleShape.PARTIAL) {
							r += ` The explosive breast growth also <span class="lime">causes ${his} nipples to invert completely.</span>`;
							slave.nipples = NippleShape.INVERTED;
						}
					}
				}
				if (slave.geneticQuirks.gigantomastia === 3 && jsRandom(1, 300) < slave.hormoneBalance) {
					slave.geneticQuirks.gigantomastia = 2;
				}
				if (slave.geneticQuirks.macromastia === 3 && jsRandom(1, 300) < slave.hormoneBalance) {
					slave.geneticQuirks.macromastia = 2;
				}
				r += galactorrheaTriggerCheck(slave);
				break;
			case Drug.GROWNIPPLE: {
				let nippleThreshold = ((60 - (V.injectionUpgrade * 15)) / (1 + slave.geneMods.NCS));
				r += ` ${He} receives <span class="lime">direct injections of enhancers right into ${his} nipples,</span> causing them to swell and expand`;
				if (slave.geneMods.NCS === 1) {
					r += `; ${his} <span class="orange">NCS</span> reduces their effectiveness`;
				}
				r += `.`;
				switch (slave.nipples) {
					case NippleShape.INVERTED:
						if (jsRandom(1, 100) > nippleThreshold) {
							r += ` <span class="lime">${His} inverted nipples swell painfully,</span> pushing their way outwards.`;
							slave.nipples = NippleShape.PARTIAL;
						}
						break;
					case NippleShape.PARTIAL:
						if (jsRandom(1, 100) > nippleThreshold) {
							r += ` <span class="lime">${His} nipples swell painfully,</span> exposing ${His} previously inverted nipples.`;
							slave.nipples = jsEither([NippleShape.TINY, NippleShape.CUTE, NippleShape.PUFFY, NippleShape.HUGE]);
						}
						break;
					case NippleShape.TINY:
						if (jsRandom(1, 100) > nippleThreshold) {
							r += ` <span class="lime">${His} nipples swell painfully,</span> becoming larger and cute.`;
							slave.nipples = NippleShape.CUTE;
						}
						break;
					case NippleShape.CUTE:
						if (jsRandom(1, 100) > nippleThreshold) {
							r += ` <span class="lime">${His} nipples swell painfully,</span> becoming larger and puffy.`;
							slave.nipples = NippleShape.PUFFY;
						}
						break;
					case NippleShape.PUFFY:
						if (jsRandom(1, 100) > nippleThreshold) {
							r += ` <span class="lime">${His} nipples swell painfully,</span> becoming spectacularly immense.`;
							slave.nipples = NippleShape.HUGE;
						}
						break;
					case NippleShape.FLAT:
						if (jsRandom(1, 100) > nippleThreshold) {
							r += ` <span class="lime">${His} flat nipples swell painfully,</span> becoming spectacularly immense.`;
							slave.nipples = NippleShape.HUGE;
						}
						break;
					case NippleShape.HUGE:
						r += ` ${His} nipples are now so massive that further drug use will fail to grow them further; <span class="yellow">${his} drug regimen has been ended.</span>`;
						slave.drugs = Drug.NONE;
						break;
					default:
						r += ` The injections fail to affect ${his} ${slave.nipples} nipples; <span class="yellow">${his} drug regimen has been ended.</span>`;
						slave.drugs = Drug.NONE;
						break;
				}
				break;
			}
			case Drug.GROWBUTT:
			case Drug.INTENSIVEBUTT:
				growth = 1 + V.injectionUpgrade;
				r += ` ${He} receives <span class="lime">`;
				if (intensive) {
					r += ` massive`;
					growth *= 2;
				}
				r += ` injections of`;
				if (V.injectionUpgrade !== 0) {
					r += ` advanced`;
				}
				r += ` growth hormones, right into ${his} buttocks;</span>`;
				dietInfluence = false;
				if (slave.diet === Diet.FATTEN) {
					r += ` all the food ${he}'s required to consume fuels growth, `;
					dietInfluence = true;
					growth += 2;
				} else if (slave.diet === Diet.RESTRICTED) {
					r += ` ${his} restricted diet means ${his} body has few resources to grow on, `;
					dietInfluence = true;
					growth -= 2;
				} else if (slave.weight > 130) {
					r += ` the enormous diet ${he} eats to maintain ${his} ${slave.weight > 195 ? `whale-like` : `hugely fat`} body helps support growth, `;
					dietInfluence = true;
					growth += 3;
				} else if (slave.weight > 30) {
					r += ` the generous diet ${he} eats to maintain ${his} ${slave.weight > 95 ? `fat` : `chubby`} body helps support growth, `;
					dietInfluence = true;
					growth++;
				} else if (slave.weight <= -30) {
					r += ` the diet ${he} is required to maintain to keep slim impedes growth, `;
					dietInfluence = true;
					growth--;
				}
				if (dietInfluence) {
					if (slave.health.condition > -20) {
						r += `and`;
					} else {
						r += `but`;
					}
				}
				if (slave.health.condition > 80) {
					r += ` ${his} perfect health supports growth extremely well, `;
					growth++;
				} else if (slave.health.condition > -20) {
					r += ` ${his} health supports growth, `;
				} else {
					r += ` ${his} poor health does not support steady growth, `;
					growth--;
				}
				if (slave.butt < 6) {
					r += `and`;
				} else {
					r += `but`;
				}
				r += ` ${his}`;
				if (slave.butt < 2) {
					r += ` modest rear tends to grow quickly.`;
					growth += 3;
				} else if (slave.butt < 4) {
					r += ` big behind tends to grow readily.`;
					growth += 2;
				} else if (slave.butt < 6) {
					r += ` massive ass tends to grow slowly.`;
					growth++;
				} else {
					r += ` monstrous cheeks tend to grow very slowly.`;
				}
				if (rearLipedemaMod !== 0) {
					growth += 3;
					if (V.geneticMappingUpgrade > 0) {
						r += ` ${His} rear lipedema amplifies the drug's effects on ${his} bottom.`;
					} else {
						r += ` The drugs seem to have an added effect on ${him}.`;
					}
				}
				growth *= 0.2;
				growth = ncsFightsButtGrowth(slave, growth);
				slave.butt += Math.clamp(growth, 0, 2 + rearLipedemaMod);
				if (slave.geneMods.rapidCellGrowth !== 1) {
					if (intensive) {
						if (slave.anus > 1) {
							r += ` The reckless drug therapy has the side effect of rejuvenating ${his} sphincter muscles, <span class="lime">tightening up ${his} `;
							if (slave.anus > 4) {
								r += `gaping`;
							} else if (slave.anus > 3) {
								r += `loose`;
							} else {
								r += `relaxed`;
							}
							r += ` anus.</span>`;
							slave.anus--;
						}
					} else {
						if (slave.anus > 2) {
							r += ` The drugs nearby rejuvenate ${his} sphincter muscles, <span class="lime">tightening up ${his} `;
							if (slave.anus > 4) {
								r += `gaping`;
							} else {
								r += `loose`;
							}
							r += ` anus.</span>`;
							slave.anus--;
						}
					}
				}
				break;
			case Drug.HYPERBUTT:
				slave.chem += 2;
				growth = 0.5;
				r += ` ${He} receives <span class="lime">direct injections of`;
				if (V.injectionUpgrade !== 0) {
					r += ` advanced`;
				}
				r += ` hyper growth hormones, right into ${his} buttocks;</span>`;
				dietInfluence = false;
				if (slave.diet === Diet.FATTEN) {
					r += ` all the food ${he}'s required to consume fuels growth, `;
					dietInfluence = true;
					growth += 0.2;
				} else if (slave.diet === Diet.RESTRICTED) {
					r += ` ${his} restricted diet means ${his} body has few resources to grow on, `;
					dietInfluence = true;
					growth -= 0.2;
				} else if (slave.weight > 130) {
					r += ` the enormous diet ${he} eats to maintain ${his} ${slave.weight > 195 ? `whale-like` : `hugely fat`} body helps support growth, `;
					dietInfluence = true;
					growth += 0.2;
				} else if (slave.weight > 30) {
					r += ` the generous diet ${he} eats to maintain ${his} ${slave.weight > 95 ? `fat` : `chubby`} body helps support growth, `;
					dietInfluence = true;
					growth += 0.1;
				} else if (slave.weight <= -30) {
					r += ` the diet ${he} is required to maintain to keep slim impedes growth, `;
					dietInfluence = true;
					growth -= 0.1;
				}
				if (dietInfluence) {
					if (slave.health.condition > -20) {
						r += `and`;
					} else {
						r += `but`;
					}
				}
				if (slave.health.condition > 80) {
					r += ` ${his} perfect health supports growth extremely well, `;
					growth += 0.5;
				} else if (slave.health.condition > -20) {
					r += ` ${his} health supports growth reasonably well, `;
				} else {
					r += ` ${his} poor health does not support steady growth, `;
					growth -= 0.1;
				}
				if (slave.butt < 10) {
					r += `and`;
				} else {
					r += `but`;
				}
				r += ` ${his} `;
				if (slave.butt < 6) {
					r += `modest rear tends to grow quickly.`;
					growth += 1;
				} else if (slave.butt < 8) {
					r += `gigantic behind tends to grow readily.`;
					growth += 0.8;
				} else if (slave.butt < 10) {
					r += `titanic jiggly butt tends to grow steadily.`;
					growth += 0.6;
				} else {
					r += `inhuman cheeks tend to grow slowly.`;
					growth += 0.4;
				}
				if (rearLipedemaMod !== 0) {
					growth += 1;
					if (V.geneticMappingUpgrade > 0) {
						r += ` ${His} rear lipedema massively amplifies the drug's effects.`;
					} else {
						r += ` The drugs seem to have an added effect on ${him}.`;
					}
				}
				growth = ncsFightsButtGrowth(slave, growth);
				if (growth > 1 || slave.geneMods.NCS === 1) {
					slave.butt += growth;
				} else {
					slave.butt += 1;
				}
				if (slave.butt >= 20) {
					slave.butt = 20;
				}
				break;
			case Drug.GROWLIP:
				if (slave.lips <= 95) {
					r += ` <span class="lime">${His} lips swell rapidly from the injections of`;
					if (V.injectionUpgrade !== 0) {
						r += ` advanced `;
					}
					r += ` growth agents`;
					if (slave.lips > 90) {
						r += `, becoming a facepussy useless for anything other than oral sex.</span>`;
					} else if (slave.lips > 70 && slave.lips <= 75) {
						r += `, and are now so large that ${he} can no longer enunciate properly.</span>`;
					} else {
						r += `.</span>`;
					}
					if (slave.geneMods.NCS === 1) {
						slave.lips += 2;
					} else {
						slave.lips += 5;
					}
				}
				break;
			case Drug.GROWTHSTIM:
				slave.chem += 2;
				growth = 1;
				r += `${He} receives frequent <span class="lime">injections of growth stimulants.</span>`;
				// genetic quirks
				if (slave.geneticQuirks.dwarfism === 2 && slave.geneticQuirks.gigantism === 2) {
					growth += (0.1 * random(-5, 5));
					if (V.geneticMappingUpgrade > 0) {
						r += ` ${His} combination of genetic factors for gigantism and dwarfism causes the effectiveness of the treatment to fluctuate erratically.`;
					}
				} else if (slave.geneticQuirks.dwarfism === 2) {
					growth -= 0.5;
					if (V.geneticMappingUpgrade > 0) {
						r += ` ${His} dwarfism significantly limits the effectiveness of the treatment.`;
					}
				} else if (slave.geneticQuirks.gigantism === 2) {
					growth += 0.5;
					if (V.geneticMappingUpgrade > 0) {
						r += ` ${His} gigantism improves the effectiveness of the treatment.`;
					}
				}
				// hormones
				if (slave.hormones === 2 || slave.hormones === -2) {
					growth--;
					r += ` The massive quantities of sexual hormones flooding ${his} body limits the effectiveness of the treatment.`;
				} else if (slave.hormones === 0) {
					growth += 0.2;
					r += ` In the absence of significant levels of sexual hormones, the treatment is more effective.`;
				} else if (slave.hormones === 1 || slave.hormones === -1) {
					r += ` ${His} low level of sexual hormones allow the treatment to work undisturbed.`;
				}
				// hormone balance
				if (slave.hormoneBalance <= -50) {
					growth += 0.5;
				} else if (slave.hormoneBalance <= -25) {
					growth += 0.2;
				} else if (slave.hormoneBalance < 50) {
					growth -= 0.2;
				} else {
					growth -= 0.5;
				}
				// diet
				if (slave.diet === Diet.FATTEN) {
					r += ` All the food ${he}'s required to consume boosts `;
					if (slave.dietMilk === 2) {
						r += `growth with the generous amount of added milk enhancing its effect.`;
						growth += 0.3;
					} else if (slave.dietMilk === 1) {
						r += `growth with the added milk enhancing its effect.`;
						growth += 0.2;
					} else {
						r += `growth.`;
					}
					growth += 0.2;
				} else if (slave.diet === Diet.RESTRICTED) {
					r += ` ${His} restricted diet means ${his} body has few resources to grow `;
					if (slave.dietMilk === 2) {
						r += `on, but the generous amount of added milk mitigates its effect.`;
						growth += 0.3;
					} else if (slave.dietMilk === 1) {
						r += `on, but the added milk mitigates its effect.`;
						growth += 0.2;
					} else {
						r += `on.`;
					}
					growth--;
				} else if (slave.diet === Diet.SLIM) {
					r += ` ${His} growth is slightly inhibited by ${his} strict `;
					if (slave.dietMilk === 2) {
						r += ` diet, but the generous amount of added milk mitigates its effect.`;
						growth += 0.3;
					} else if (slave.dietMilk === 1) {
						r += ` diet, but the added milk mitigates its effect.`;
						growth += 0.2;
					} else {
						r += ` diet.`;
					}
					growth -= 0.2;
				} else if (slave.diet === Diet.FERTILITY) {
					r += ` The fertility hormones in ${his} food restrain ${his}`;
					if (slave.dietMilk === 2) {
						r += ` growth, but the generous amount of added milk mitigates its effect.`;
						growth += 0.3;
					} else if (slave.dietMilk === 1) {
						r += ` growth, but the added milk mitigates its effect.`;
						growth += 0.2;
					} else {
						r += ` growth.`;
					}
					growth -= 0.1;
				} else if (slave.diet === Diet.MALE || slave.diet === Diet.FEMALE || slave.diet === Diet.FUTA) {
					r += ` ${His} growth is restrained by ${his} sexual hormones rich`;
					if (slave.dietMilk === 2) {
						r += ` diet, but the generous amount of added milk mitigates its effect.`;
						growth += 0.3;
					} else if (slave.dietMilk === 1) {
						r += ` diet, but the added milk mitigates its effect.`;
						growth += 0.2;
					} else {
						r += ` diet.`;
					}
					growth -= 0.5;
				} else if (slave.diet === Diet.CLEANSE) {
					r += ` ${His} growth is severely inhibited by ${his} cleansing`;
					if (slave.dietMilk === 2) {
						r += ` diet, but the generous amount of added milk mitigates its effect.`;
						growth += 0.3;
					} else if (slave.dietMilk === 1) {
						r += ` diet, but the added milk mitigates its effect.`;
						growth += 0.2;
					} else {
						r += ` diet.`;
					}
					growth--;
				} else if (slave.diet === Diet.MUSCLE || slave.muscles >= 96) {
					r += ` ${His} workout diet and constant physical exercise help support`;
					if (slave.dietMilk === 2) {
						r += ` growth with the generous amount of added milk enhancing its effect.`;
						growth += 0.3;
					} else if (slave.dietMilk === 1) {
						r += ` growth with the added milk enhancing its effect.`;
						growth += 0.2;
					} else {
						r += ` growth.`;
					}
					growth += 0.5;
				} else {
					if (slave.dietMilk === 2) {
						r += ` The generous amount of added milk in ${his} diet feeds ${his} growth.`;
						growth += 0.3;
					} else if (slave.dietMilk === 1) {
						r += ` The added milk in ${his} diet aids ${his} growth.`;
						growth += 0.2;
					}
				}
				// health
				if (slave.health.condition > 80) {
					r += ` ${His} perfect health greatly supports ${his} growth.`;
					growth += 0.2;
				} else if (slave.health.condition > -20) {
					r += ` ${His} health supports ${his} growth.`;
				} else {
					r += ` ${His} poor health hinders growth.`;
					growth--;
				}
				// if growth was accomplished
				if (growth > 0) {
					// age modifier
					let ageMod = 1;
					const pubertyLength = 5;
					const maxGrowthAge = 24;

					if (slave.geneMods.NCS === 1) {
						r += ` ${His} <span class="orange">NCS</span> inhibits ${his} body response to the treatment.`;
						ageMod = 0.25;
					} else if (slave.genes === GenderGenes.MALE) {
						if (slave.pubertyXY === 0 && slave.physicalAge <= 3) {
							r += ` ${His} very young body responds extremely well to the treatment.`;
							ageMod = 2.5;
						} else if (slave.pubertyXY === 0 && slave.physicalAge > 3) {
							r += ` ${His} young body eagerly responds to the stimulants.`;
							ageMod = 1.5;
						} else if (slave.physicalAge <= (slave.pubertyAgeXY + pubertyLength)) {
							r += ` Due to ${his} recent puberty, ${his} body welcomes the treatment with open arms.`;
							ageMod = 2;
						} else if (slave.physicalAge <= maxGrowthAge) {
							r += ` With ${his} puberty concluded, ${his} body resists the stimulants.`;
							ageMod = 1;
						} else {
							r += ` ${His} mature body struggles to respond to the treatment, making progress difficult.`;
							ageMod = 0.5;
						}
					} else if (slave.genes === GenderGenes.FEMALE) {
						if (slave.pubertyXX === 0 && slave.physicalAge <= 3) {
							r += ` ${His} very young body responds extremely well to the treatment.`;
							ageMod = 2.5;
						} else if (slave.pubertyXX === 0 && slave.physicalAge > 3) {
							r += ` ${His} young body eagerly responds to the stimulants.`;
							ageMod = 1.5;
						} else if (slave.physicalAge <= (slave.pubertyAgeXX + pubertyLength)) {
							r += ` Due to ${his} recent puberty, ${his} body welcomes the treatment with open arms.`;
							ageMod = 2;
						} else if (slave.physicalAge <= maxGrowthAge) {
							r += ` With ${his} puberty concluded, ${his} body resists the stimulants.`;
							ageMod = 1;
						} else {
							r += ` ${His} mature body struggles to respond to the treatment, making progress difficult.`;
							ageMod = 0.5;
						}
					}
					// evaluate against slave expected height, with neoteny slaves comparing against expected height for 12 year olds...
					let heightDiff;
					if (slave.geneticQuirks.neoteny === 2 && slave.physicalAge > 12) {
						heightDiff = (slave.height - slave.heightImplant * 10) / Height.forAge(slave.natural.height, 12, slave.genes);
					} else {
						heightDiff = (slave.height - slave.heightImplant * 10) / Height.forAge(slave.natural.height, slave);
					}
					// if ${he} is taller than the expected height the growth is reduced, if shorter accelerated proportionally to the distance from the expected height
					heightDiff = 1 - heightDiff;
					// ...and calculates final value
					growth = (growth + growth * heightDiff) * ageMod;
					if (slave.geneMods.NCS === 0) {
						growth = Math.round(Math.clamp(growth, 0, 5));
					} else {
						growth = Math.round(Math.clamp(growth, 0, 2));
					}
					// communicates the amount of growth
					if (growth < 1) { // in case heightDiff manages to bring growth down enough
						r += ` Despite the treatment, ${his} height does not increase this week.`;
					} else if (growth === 1) {
						r += ` <span class="lime">${His} height slightly increased this week.</span>`;
					} else if (growth === 2) {
						r += ` <span class="lime">${His} height increased this week.</span>`;
					} else if (growth === 3) {
						r += ` <span class="lime">${His} height greatly increased this week.</span>`;
					} else if (growth === 4) {
						r += ` <span class="lime">${His} height dramatically increased this week.</span>`;
					} else if (growth === 5) {
						r += ` <span class="lime">${His} body experienced explosive growth this week,</span> so extreme that ${his} cardiovascular system can barely keep up, <span class="health dec">severely damaging ${his} health.</span>`;
						healthDamage(slave, 20);
					}
					// health issues
					if (jsRandom(1, 10) === 1 && growth !== 5) {
						r += ` The stimulants stressed ${slave.slaveName}'s body more than expected, <span class="health dec">damaging ${his} health.</span>`;
						healthDamage(slave, 10);
					}
					if (slave.physicalAge > maxGrowthAge) {
						if (jsRandom(1, 6) === 1) {
							r += ` Since ${his} body already concluded ${his} natural growth processes, the treatment <span class="health dec">weakens ${him} considerably.</span>`;
							healthDamage(slave, 15);
						}
					}
					// updates slave's height
					slave.height += growth;
				} else {
					// if growth is zero or negative
					r += ` Despite the treatment, ${his} height does not increase this week.`;
				}
				break;
			case Drug.HORMONEMALE:
				if (slave.pubertyXY === 1) {
					r += ` ${He} has potent sperm. <span class="yellow">${His} drug regimen has been ended.</span>`;
					slave.drugs = Drug.NONE;
				} else {
					r += ` The intense hormonal injections leave ${him} <span class="health dec">sickened and weak</span> as ${his} body struggles to adapt to the overwhelming chemicals flooding ${his} system.`;
					slave.chem += 20;
					healthDamage(slave, 10);
					if (slave.energy > 5) {
						slave.energy -= 5;
					}
				}
				break;
			case Drug.HORMONEFEMALE:
				if (slave.pubertyXX === 1) {
					r += ` ${He} has begun ovulating. <span class="yellow">${His} drug regimen has been ended.</span>`;
					slave.drugs = Drug.NONE;
				} else {
					r += ` The intense hormonal injections leave ${him} <span class="health dec">sickened and weak</span> as ${his} body struggles to adapt to the overwhelming chemicals flooding ${his} system.`;
					slave.chem += 20;
					healthDamage(slave, 10);
					if (slave.energy > 5) {
						slave.energy -= 5;
					}
					r += galactorrheaTriggerCheck(slave);
				}
				break;
			case Drug.GROWPENIS:
			case Drug.INTENSIVEPENIS:
				growth = 60 - (V.injectionUpgrade * 10);
				if (intensive) {
					growth -= 20;
				}
				if (slave.geneMods.NCS === 1) {
					growth += 30;
				}
				if (slave.dick > 0) {
					if (jsRandom(1, 100) > growth + (slave.dick * 5)) {
						r += ` <span class="lime">${His} cock grows painfully,</span> becoming both longer and girthier.`;
						slave.dick++;
					} else {
						r += ` Despite being dosed with a spectrum of powerful growth promoters, ${his} dick does not grow.`;
					}
					if (slave.balls === 1) {
						if (slave.scrotum > 0) {
							r += ` As a side effect of the dick enhancement drugs, <span class="lime">${his} balls drop.</span>`;
							slave.balls += 1;
						}
					}
					if (slave.dick === maxErectionSize(slave)) {
						if (slave.balls > 0) {
							r += ` <span class="yellow">${His} dick is at the limit of what ${his} cardiovascular system could conceivably bring erect.</span> Further penis enhancement may limit ${his} ability to get hard.`;
						}
					}
					if (slave.dick === 7) {
						r += ` <span class="yellow">${His} cock's length and girth are already a considerable challenge for most orifices to accommodate.</span> Continued growth will leave ${him} unable to safely penetrate ${his} partners.`;
					}
				} else if (slave.vagina >= 0) {
					if (jsRandom(1, 100) > growth - (slave.clit * 10)) {
						r += ` <span class="lime">${His} clit grows painfully,</span> becoming both longer and girthier.`;
						slave.clit++;
					} else {
						r += ` Despite being dosed with a spectrum of powerful growth promoters, ${his} clit does not grow.`;
					}
				}
				break;
			case Drug.HYPERPENIS:
				if (slave.dick > 0) {
					r += `${He} receives <span class="lime">direct injections of hyper growth hormones, right into ${his} dick.</span> `;
					slave.chem += 2;
					if (slave.dick >= 30) {
						r += `${His} cock is now so huge that further drug enhancement will not increase its size. <span class="yellow">${His} drug regimen has been ended.</span> `;
						slave.drugs = Drug.NONE;
					} else {
						if (slave.geneMods.NCS === 0) {
							r += `<span class="lime">${His} cock grows painfully,</span> becoming both longer and girthier. `;
							slave.dick += 1;
						} else if (jsRandom(1, (20 - slave.dick)) > 12) {
							r += `<span class="lime">${His} cock grows painfully,</span> becoming both longer and girthier, despite ${his} <span class="orange">NCS.</span> `;
							slave.dick += 1;
						} else {
							r += `The treatment fails to overcome ${his} <span class="orange">NCS</span> and ${his} cock fails to grow. `;
						}
					}
					if (slave.dick === maxErectionSize(slave)) {
						if (slave.balls > 0) {
							r += ` <span class="yellow">${His} dick is at the limit of what ${his} cardiovascular system could conceivably bring erect.</span> Further penis enhancement may limit ${his} ability to get hard.`;
						}
					}
					if (slave.dick === 7) {
						r += ` <span class="yellow">${His} cock's length and girth are already a considerable challenge for most orifices to accommodate.</span> Continued growth will leave ${him} unable to safely penetrate ${his} partners.`;
					}
				} else {
					r += ` ${He} receives <span class="lime">direct injections of hyper growth hormones, right into ${his} clit.</span>`;
					slave.chem += 2;
					if (slave.clit === 5) {
						r += ` ${His} clit is now so huge that further drug enhancement will not increase its size. <span class="yellow">${His} drug regimen has been ended.</span>`;
						slave.drugs = Drug.NONE;
					} else {
						if (slave.geneMods.NCS === 0 && slave.vagina >= 0) {
							r += ` <span class="lime">${His} clit grows painfully,</span> becoming both longer and girthier.`;
							slave.clit += 1;
						} else if (jsRandom(1, (16 - slave.clit)) > 10) {
							r += ` <span class="lime">${His} clit grows painfully,</span> becoming both longer and girthier, despite ${his} <span class="orange">NCS.</span>`;
							slave.clit += 1;
						} else {
							r += ` The treatment does not overcome ${his} <span class="orange">NCS</span> and ${his} clit fails to grow.`;
						}
					}
				}
				break;
			case Drug.GROWTESTICLE:
			case Drug.INTENSIVETESTICLE:
				if (slave.balls < 10) {
					growth = 60 - (V.injectionUpgrade * 10);
					if (intensive) {
						growth -= 20;
					}
					if (slave.geneMods.NCS === 1) {
						growth += 30;
					}
					if (jsRandom(1, 100) > growth + (slave.balls * 5)) {
						r += ` <span class="lime">${His} balls swell painfully.</span>`;
						slave.balls++;
					} else {
						r += ` Despite being filled with testicle enhancers and painfully swollen with resultant cum overproduction, ${his} balls do not grow.`;
					}
					if (slave.dick === 1 && slave.geneMods.NCS === 0) {
						if (slave.scrotum > 0) {
							r += ` As a side effect of the testicle enhancement drugs, <span class="lime">${his} micropenis grows,</span> becoming merely tiny.`;
							slave.dick++;
						}
					}
				}
				break;
			case Drug.HYPERTESTICLE:
				r += ` ${He} receives <span class="lime">direct injections of hyper growth hormones, right into ${his} testicles</span> forcing them to swell with cum overproduction.`;
				slave.chem += 2;
				if (slave.balls >= 125) {
					r += ` ${His} balls are now so immense that further drug enhancement will not increase their size. However, leaving ${him} on them will still stimulate cum production.`;
				} else if (slave.balls < 125) {
					if (slave.geneMods.NCS === 0) {
						r += ` <span class="lime">${His} balls swell painfully.</span>`;
						slave.balls += 2;
					} else if (jsRandom(1, 400 - slave.balls) > 200) {
						r += ` <span class="lime">${His} balls swell painfully,</span> despite ${his} <span class="orange">NCS.</span>`;
						slave.balls += 1;
					} else {
						r += ` The treatment fails to overcome ${his} <span class="orange">NCS</span> and ${his} balls fail to grow.`;
					}
				}
				break;
			case Drug.STEROID:
				if (slave.geneMods.NCS === 0 || jsRandom(1, 100) > 50) {
					if (slave.dick === 0 && jsRandom(1, 100) > 40 + (slave.clit * 10) && slave.vagina >= 0) {
						r += ` The gear ${he}'s on <span class="lime">increases the size of ${his} clit.</span>`;
						slave.clit += 1;
					} else if (slave.dick !== 0 && slave.dick.isBetween(0, 3) && jsRandom(1, 100) > 95) {
						r += ` The gear ${he}'s on <span class="lime">increases the size of ${his} penis.</span>`;
						slave.dick += 1;
					} else if (slave.faceShape !== FaceShape.MASC && slave.faceShape !== FaceShape.ANDRO && jsRandom(1, 100) > 95) {
						r += ` The gear ${he}'s on <span class="orange">hardens ${his} face into androgyny.</span>`;
						slave.faceShape = FaceShape.ANDRO;
					} else if (slave.balls !== 0 && slave.scrotum !== 0 && slave.balls < 3 && jsRandom(1, 100) > 95) {
						r += ` The gear ${he}'s on <span class="lime">increases the size of ${his} balls.</span>`;
						slave.balls += 1;
					} else if (jsRandom(1, 100) > 110 - (slave.anus * 10) && slave.geneMods.rapidCellGrowth !== 1) {
						r += ` The steroids ${he}'s on have an effect on ${his} stretched anal muscles, giving ${him} a <span class="lime">tighter butthole.</span>`;
						slave.anus -= 1;
					} else if (jsRandom(1, 100) > 110 - (slave.vagina * 10) && slave.geneMods.rapidCellGrowth !== 1) {
						r += ` The steroids ${he}'s on have an effect on ${his} vaginal muscles, giving ${him} a <span class="lime">tighter pussy.</span>`;
						slave.vagina -= 1;
					} else if (slave.face - slave.faceImplant > 10 && jsRandom(1, 100) > 95) {
						r += ` The gear ${he}'s on <span class="orange">hardens ${his} pretty face a little.</span>`;
						slave.face -= 5;
					}
				}
				break;
			case Drug.ANTIAGE:
				if (slave.visualAge <= 18) {
					r += ` ${His} outward age has regressed to the point that the creams will have little effect. Since there is no gain for further treatment, <span class="yellow">${his} drug regimen has been ended.</span>`;
					slave.drugs = Drug.NONE;
				} else {
					r += ` The skin creams <span class="lime">soothe ${his} aging skin</span> leaving ${him} looking younger, though the effects are only skin deep.`;
					slave.visualAge -= 1;
				}
				if (FutureSocieties.isActive('FSYouthPreferentialist')) {
					if (slave.visualAge > 30) {
						r += ` ${He} <span class="mediumaquamarine">trusts you more</span> for allowing ${him} to fit in better with society and not be singled out for ${his} looks.`;
						slave.trust += 2;
					}
				}
				if (FutureSocieties.isActive('FSMaturityPreferentialist')) {
					if (slave.visualAge > 30) {
						r += ` ${He} is <span class="gold">terrified</span> that ${his} fading age will single ${him} out for abuse in your society.`;
						slave.trust -= 2;
					}
				}
				break;
			case Drug.SUPERFERTILITY:
				if (slave.pregKnown === 1) {
					if (slave.geneticQuirks.superfetation === 2 && V.geneticMappingUpgrade !== 0) {
						r += ` ${He}'s already pregnant, but combined with ${his} superfetation the fertility drugs will cause ${him} multiple pregnancies.`;
					} else {
						r += ` <span class="yellow">${He}'s already pregnant, so the fertility drugs ${he}'s on do ${him} no good.</span>`;
					}
				} else if (slave.pregWeek < 0) {
					r += ` ${He}'s still recovering from a recent pregnancy, so the fertility drugs ${he}'s on do ${him} little good.`;
				} else if (slave.preg > 1) {
					r += ` Despite being on intense fertility drugs, ${he} shows no signs of increased fertility. Cursory tests reveal that <span class="lime">${he} has a bun already in the oven.</span>`;
					slave.pregKnown = 1;
				} else if (slave.vagina === -1 && slave.mpreg !== 1) {
					if (slave.lactation === 0) {
						r += ` Unfortunately, it's impossible to fuck ${his} asshole pregnant, limiting the potential impact of the fertility drugs ${he}'s on to ${his} boobs.`;
					} else {
						r += ` The fertility drugs ${he}'s on are pointless, since ${he}'s already lactating and it's impossible to impregnate ${his} butthole. That's no reason not to try, of course.`;
					}
				} else if (slave.preg < -1) {
					r += ` ${He}'s sterile, so the fertility drugs ${he}'s on do ${him} no good.`;
				} else if (slave.ovaries === 0 && slave.mpreg !== 1) {
					r += ` ${He}'s barren, so the fertility drugs ${he}'s on do ${him} no good.`;
				} else if (slave.pubertyXX === 0 && (slave.ovaries === 1 || slave.mpreg === 1)) {
					r += ` ${He}'s prepubescent, so the fertility drugs ${he}'s on do ${him} no good.`;
				} else if (slave.preg === -1) {
					r += ` ${He}'s on contraceptives, so the fertility drugs ${he}'s on do ${him} no good.`;
				} else {
					r += ` ${He}'s on super fertility drugs, so ${he} is more likely to conceive, and will have multiple pregnancy.`;
				}
				if (slave.geneMods.NCS === 0) {
					if (slave.lactation === 0 && jsRandom(0, 50) < slave.health.condition) {
						r += ` The hormonal changes produced by the fertility drugs have the side effect of <span class="lime">inducing lactation,</span> indistinguishable from natural lactation.`;
						slave.lactation = 1;
						slave.lactationDuration = 1;
					}
				}
				r += galactorrheaTriggerCheck(slave);
				if (slave.attrXY < 100 && jsRandom(0, 10) < slave.health.condition) {
					r += ` The hormonal changes produced by the fertility drugs cause ${him} to begin <span class="improvement">finding men more attractive.</span>`;
					slave.attrXY += jsRandom(5, 10);
				}
				if (slave.energy < 85 && jsRandom(0, 10) < slave.health.condition) {
					r += ` The hormonal changes produced by the fertility drugs cause ${him} to <span class="libido inc">begin craving sex more.</span>`;
					slave.energy += 2;
				}
				break;
			case Drug.FERTILITY:
				if (slave.pregKnown === 1) {
					if (slave.geneticQuirks.superfetation === 2 && V.geneticMappingUpgrade !== 0) {
						r += ` ${He}'s already pregnant, but combined with ${his} superfetation the fertility drugs are likely to cause ${him} multiple pregnancies.`;
					} else {
						r += ` <span class="yellow">${He}'s already pregnant, so the fertility drugs ${he}'s on do ${him} no good.</span>`;
					}
				} else if (slave.pregWeek < 0) {
					r += ` ${He}'s still recovering from a recent pregnancy, so the fertility drugs ${he}'s on do ${him} little good.`;
				} else if (slave.preg > 1) {
					r += ` Despite being on intense fertility drugs, ${he} shows no signs of increased fertility. Cursory tests reveal that <span class="lime">${he} has a bun already in the oven.</span>`;
					slave.pregKnown = 1;
				} else if (slave.vagina === -1 && slave.mpreg !== 1) {
					if (slave.lactation === 0) {
						r += ` Unfortunately, it's impossible to fuck ${his} asshole pregnant, limiting the potential impact of the fertility drugs ${he}'s on to ${his} boobs.`;
					} else {
						r += ` The fertility drugs ${he}'s on are pointless, since ${he}'s already lactating and it's impossible to impregnate ${his} butthole. That's no reason not to try, of course.`;
					}
				} else if (slave.preg < -1) {
					r += `${He}'s sterile, so the fertility drugs ${he}'s on do ${him} no good.`;
				} else if (slave.ovaries === 0 && slave.mpreg !== 1) {
					r += ` ${He}'s barren, so the fertility drugs ${he}'s on do ${him} no good.`;
				} else if (slave.pubertyXX === 0 && (slave.ovaries === 1 || slave.mpreg === 1)) {
					r += ` ${He}'s prepubescent, so the fertility drugs ${he}'s on do ${him} no good.`;
				} else if (slave.preg === -1) {
					r += ` ${He}'s on contraceptives, so the fertility drugs ${he}'s on do ${him} no good.`;
				} else {
					r += ` ${He}'s on fertility drugs, so ${he} is more likely to conceive, and may experience multiple pregnancy.`;
				}
				if (slave.geneMods.NCS === 0) {
					if (slave.lactation === 0 && jsRandom(0, 100) < slave.health.condition) {
						r += ` The hormonal changes produced by the fertility drugs have the side effect of <span class="lime">inducing lactation,</span> indistinguishable from natural lactation.`;
						slave.lactation = 1;
						slave.lactationDuration = 1;
					}
				}
				r += galactorrheaTriggerCheck(slave);
				break;
			case Drug.APPETITESUPP:
				if (slave.weight <= -95) {
					r += ` Since ${his} body has no weight left to shed, ${he} no longer needs appetite suppressors to maintain it; <span class="yellow">${his} drug regimen has been ended.</span>`;
					slave.drugs = Drug.NONE;
				} else {
					switch (slave.diet) {
						case Diet.SLIM:
						case Diet.RESTRICTED:
							r += ` Since ${he} is already on a diet that favors weight loss, ${his} reduced appetite allows ${his} body <span class="lime">to shed pounds</span> even more effectively.`;
							slave.weight -= 5;
							break;
						case Diet.FATTEN:
							r += ` Since ${he} is on a diet that favors weight gain, ${his} reduced appetite is counter productive; <span class="yellow">${his} drug regimen has been ended.</span>`;
							slave.drugs = Drug.NONE;
							break;
						default:
							r += ` The appetite suppressors encourage ${him} to eat less at meal time, gradually causing ${him} to <span class="lime">lose weight.</span>`;
							slave.weight -= 2;
							break;
					}
				}
				break;
			case Drug.ATROPHYPENIS:
				r += ` ${He} receives <span class="lime">direct injections of atrophiers right into ${his} penis,</span> causing ${his} body to begin pulling resources from it`;
				if (slave.geneMods.NCS === 1) {
					r += `; ${his} <span class="orange">NCS</span> amplifies their effectiveness`;
				}
				r += `.`;
				shrinkage = 0;
				if (slave.dick === 1) {
					r += ` ${His} penis is now so minuscule that further drug use will fail to shrink it further; <span class="yellow">${his} drug regimen has been ended.</span>`;
					slave.drugs = Drug.NONE;
				} else if (slave.dick >= 20) {
					r += ` <span class="lime">${His} cock shrinks painfully,</span> becoming massively shorter and thinner.`;
					shrinkage = 3;
				} else if (slave.dick >= 10) {
					r += ` <span class="lime">${His} cock shrinks painfully,</span> becoming shorter and thinner.`;
					shrinkage = 2;
				} else if ((slave.geneMods.NCS === 1) || (jsRandom(1, 100) > 40 - (V.injectionUpgrade * 10) - (slave.dick * 5) && slave.dick > 1)) {
					r += ` <span class="lime">${His} cock shrinks painfully,</span> becoming shorter and thinner.`;
					shrinkage = 1;
				}
				if (slave.geneMods.NCS === 1 && slave.dick > 2) {
					shrinkage *= 2;
				}
				slave.dick -= shrinkage;
				break;
			case Drug.ATROPHYTESTICLE:
				r += ` ${He} receives <span class="lime">direct injections of atrophiers right into ${his} testicles,</span> causing ${his} body to begin pulling resources from them`;
				if (slave.geneMods.NCS === 1) {
					r += `; ${his} <span class="orange">NCS</span> amplifies their effectiveness`;
				}
				r += `.`;
				shrinkage = 0;
				if (slave.balls === 1) {
					r += ` ${His} balls are now so minuscule that further drug use will fail to shrink them further; <span class="yellow">${his} drug regimen has been ended.</span>`;
					slave.drugs = Drug.NONE;
				} else if (slave.balls >= 100) {
					r += ` <span class="lime">${His} balls shrink painfully,</span> becoming massively smaller and leaving ${his} scrotum looser.`;
					shrinkage = 5;
				} else if (slave.balls >= 80) {
					r += ` <span class="lime">${His} balls shrink painfully,</span> becoming massively smaller and leaving ${his} scrotum looser.`;
					shrinkage = 4;
				} else if (slave.balls >= 60) {
					r += ` <span class="lime">${His} balls shrink painfully,</span> becoming massively smaller and leaving ${his} scrotum looser.`;
					shrinkage = 3;
				} else if (slave.balls >= 40) {
					r += ` <span class="lime">${His} balls shrink painfully,</span> becoming much smaller and leaving ${his} scrotum looser.`;
					shrinkage = 2;
				} else if (slave.balls >= 20) {
					r += ` <span class="lime">${His} balls shrink painfully,</span> becoming smaller and leaving ${his} scrotum looser.`;
					shrinkage = 1;
				} else if ((slave.geneMods.NCS === 1) || (jsRandom(1, 100) > 40 - (V.injectionUpgrade * 10) - (slave.balls * 2) && slave.balls > 1)) {
					r += ` <span class="lime">${His} balls shrink painfully,</span> becoming smaller and leaving ${his} scrotum looser.`;
					shrinkage = 1;
				}
				if (slave.geneMods.NCS === 1 && slave.balls > 2) {
					shrinkage *= 2;
				}
				slave.balls -= shrinkage;
				break;
			case Drug.ATROPHYCLIT:
				r += ` ${He} receives <span class="lime">direct injections of atrophiers right into ${his} clitoris,</span> causing ${his} body to begin pulling resources from it`;
				if (slave.geneMods.NCS === 1) {
					r += `; ${his} <span class="orange">NCS</span> amplifies their effectiveness`;
				}
				r += `.`;
				if (slave.clit === 0) {
					r += ` ${His} clit is now so minuscule that further drug use will fail to shrink it further; <span class="yellow">${his} drug regimen has been ended.</span>`;
					slave.drugs = Drug.NONE;
				} else if ((slave.geneMods.NCS === 1) || (jsRandom(1, 100) > 60 - (V.injectionUpgrade * 10) - (slave.clit * 5) && slave.clit > 0)) {
					r += ` <span class="lime">${His} clit shrinks painfully,</span> becoming smaller.`;
					slave.clit -= 1;
				}
				if (slave.geneMods.NCS === 1 && slave.clit > 2) {
					slave.clit -= 1;
				}
				break;
			case Drug.ATROPHYLABIA:
				r += ` ${He} receives <span class="lime">direct injections of atrophiers right into ${his} labia majora,</span> causing ${his} body to begin pulling resources from them`;
				if (slave.geneMods.NCS === 1) {
					r += `; ${his} <span class="orange">NCS</span> amplifies their effectiveness`;
				}
				r += `.`;
				if (slave.labia === 0) {
					r += ` ${His} labia are now so minuscule that further drug use will fail to shrink them further; <span class="yellow">${his} drug regimen has been ended.</span>`;
					slave.drugs = Drug.NONE;
				} else if ((slave.geneMods.NCS === 1) || (jsRandom(1, 100) > 60 - (V.injectionUpgrade * 10) - (slave.labia * 5) && slave.labia > 0)) {
					r += ` <span class="lime">${His} labia shrink painfully,</span> becoming smaller. `;
					slave.labia -= 1;
				}
				if (slave.geneMods.NCS === 1 && slave.labia > 2) {
					slave.labia -= 1;
				}
				break;
			case Drug.ATROPHYNIPPLE:
				r += ` ${He} receives <span class="lime">direct injections of atrophiers right into ${his} nipples,</span> causing ${his} body to begin pulling resources from it`;
				if (slave.geneMods.NCS === 1) {
					r += `; ${his} <span class="orange">NCS</span> amplifies their effectiveness`;
				}
				r += `.`;
				switch (slave.nipples) {
					case NippleShape.HUGE:
						if ((slave.geneMods.NCS === 1) || (jsRandom(1, 100) > 60 - (V.injectionUpgrade * 15))) {
							r += ` <span class="lime">${His} nipples shrink painfully,</span> becoming smaller and puffy.`;
							slave.nipples = NippleShape.PUFFY;
						}
						break;
					case NippleShape.PUFFY:
						if ((slave.geneMods.NCS === 1) || (jsRandom(1, 100) > 60 - (V.injectionUpgrade * 15))) {
							r += ` <span class="lime">${His} nipples shrink painfully,</span> becoming smaller and cuter.`;
							slave.nipples = NippleShape.CUTE;
						}
						break;
					case NippleShape.CUTE:
						if ((slave.geneMods.NCS === 1) || (jsRandom(1, 100) > 60 - (V.injectionUpgrade * 15))) {
							r += ` <span class="lime">${His} nipples shrink painfully,</span> becoming tiny.`;
							slave.nipples = NippleShape.TINY;
						}
						break;
					default:
						r += ` ${His} nipples are now so small that further drug use will fail to shrink them further; <span class="yellow">${his} drug regimen has been ended.</span>`;
						slave.drugs = Drug.NONE;
						break;
				}
				break;
			case Drug.ATROPHYLIP:
				r += ` ${He} receives <span class="lime">direct injections of atrophiers right into ${his} lips,</span> causing ${his} body to begin pulling resources from them`;
				if (slave.geneMods.NCS === 1) {
					r += `; ${his} <span class="orange">NCS</span> amplifies the effectiveness`;
				}
				r += `.`;
				shrinkage = 0;
				if ((slave.lips - slave.lipsImplant) === 0) {
					r += ` ${His} natural lips are now so thin that further drug use will fail to shrink them further; <span class="yellow">${his} drug regimen has been ended.</span>`;
					slave.drugs = Drug.NONE;
				} else if ((slave.lips - slave.lipsImplant) >= 70) {
					r += ` <span class="lime">${His} natural lips shrink painfully,</span> becoming massively smaller and thinner.`;
					shrinkage = 5;
				} else if ((slave.lips - slave.lipsImplant) >= 50) {
					r += ` <span class="lime">${His} natural lips shrink painfully,</span> becoming smaller and thinner.`;
					shrinkage = 3;
				} else if ((slave.lips - slave.lipsImplant) >= 20) {
					r += ` <span class="lime">${His} natural lips shrink painfully,</span> becoming smaller and thinner.`;
					shrinkage = 1;
				} else if ((slave.geneMods.NCS === 1) || (jsRandom(1, 100) > (40 - (V.injectionUpgrade * 10) - (slave.lips - slave.lipsImplant)) && (slave.lips - slave.lipsImplant) > 0)) {
					r += ` <span class="lime">${His} natural lips shrink painfully,</span> becoming smaller and thinner.`;
					shrinkage = 1;
				}
				if (slave.geneMods.NCS === 1 && slave.lipsImplant > 1) {
					shrinkage *= 2;
				}
				slave.lips -= shrinkage;
				break;
			case Drug.REDISTBREAST:
				r += ` ${He} receives <span class="lime">direct injections of fat redistributors right into ${his}`;
				if (gigantomastiaMod !== 3) {
					r += ` breasts,</span> causing ${his} body to begin moving fatty tissue from them to ${his} core`;
					if (slave.geneMods.NCS === 1) {
						r += `; ${his} <span class="orange">NCS</span> amplifies the effectiveness`;
					}
					r += `.`;
					let factor = 0;
					if (boobSize <= 100) {
						r += ` ${His} natural breast tissue is now so thin that further drug use will fail to shrink it further; <span class="yellow">${his} drug regimen has been ended.</span>`;
						slave.drugs = Drug.NONE;
					} else if (slave.weight >= 200) {
						r += ` ${He} is now so immensely obese ${his} health is greatly at risk; <span class="yellow">${his} drug regimen has been ended.</span>`;
						slave.drugs = Drug.NONE;
					} else if (boobSize >= 20000) {
						r += ` <span class="lime">${His} breasts shrink painfully,</span> becoming massively smaller while ${his} <span class="orange">waistline swells tremendously.</span>`;
						factor = 20;
					} else if (boobSize >= 10000) {
						r += ` <span class="lime">${His} breasts shrink painfully,</span> becoming greatly smaller while ${his} <span class="orange">waistline swells.</span>`;
						factor = 10;
					} else if (boobSize >= 5000) {
						r += ` <span class="lime">${His} breasts shrink painfully,</span> becoming smaller while ${his} <span class="orange">waistline swells.</span>`;
						factor = 5;
					} else if (boobSize >= 1000) {
						r += ` <span class="lime">${His} breasts shrink painfully,</span> becoming smaller while ${his} <span class="orange">waistline grows.</span>`;
						factor = 3;
					} else if (boobSize > 100) {
						r += ` <span class="lime">${His} breasts shrink painfully,</span> becoming smaller while ${his} <span class="orange">waistline grows slightly.</span>`;
						factor = 1;
					}
					slave.weight += factor;
					if (slave.geneMods.NCS === 1 && boobSize > 200) {
						factor *= 2;
					}
					if (gigantomastiaMod === 2) {
						factor = 1;
						if (V.geneticMappingUpgrade > 0) {
							r += ` However, <span class="orange">${his} gigantomastia inhibits ${his} breast loss.</span>`;
						} else {
							r += ` However, <span class="orange">${his} breasts do not shrink proportionately to ${his} stomach's growth.</span>`;
						}
					}
					slave.boobs -= 100 * factor;
				} else if (V.geneticMappingUpgrade > 0) {
					r += ` breasts to no avail; ${his} body refuses to allow ${his} breasts to shrink, and as such, <span class="yellow">${his} drug regimen has been ended.</span>`;
					slave.drugs = Drug.NONE;
				} else {
					r += ` breasts to no avail; <span class="yellow">${his} drug regimen has been ended.</span>`;
					slave.drugs = Drug.NONE;
				}
				break;
			case Drug.REDISTBUTT:
				r += ` ${He} receives <span class="lime">direct injections of fat redistributors right into ${his} buttocks,</span> causing ${his} body to begin moving fatty tissue from it to ${his} core`;
				if (slave.geneMods.NCS === 1 && rearLipedemaMod === 0) {
					r += `; ${his} <span class="orange">NCS</span> amplifies the effectiveness`;
				}
				r += `.`;
				if (buttSize <= 0) {
					r += ` ${His} natural ass flesh is now so thin that further drug use will fail to shrink it further; <span class="yellow">${his} drug regimen has been ended.</span>`;
					slave.drugs = Drug.NONE;
				} else if (slave.weight >= 200) {
					r += ` ${He} is now so immensely obese ${his} health is greatly at risk; <span class="yellow">${his} drug regimen has been ended.</span>`;
					slave.drugs = Drug.NONE;
				} else if (rearLipedemaMod === 1) {
					r += ` ${His} <span class="orange">waistline swells slightly,</span> but <span class="lime">${his} butt barely loses any mass</span>`;
					if (V.geneticMappingUpgrade > 0) {
						r += ` due to ${his} rear lipedema putting it right back.`;
					} else {
						r += ` for an unknown reason.`;
					}
					slave.butt -= 0.2;
					slave.weight += 5;
				} else if (buttSize >= 15) {
					r += ` <span class="lime">${His} butt shrinks painfully,</span> becoming massively smaller while ${his} <span class="orange">waistline swells tremendously.</span>`;
					slave.butt -= 2;
					slave.weight += 25;
				} else if (buttSize >= 10) {
					r += ` <span class="lime">${His} butt shrinks painfully,</span> becoming smaller while ${his} <span class="orange">waistline swells tremendously.</span>`;
					slave.butt -= 1;
					slave.weight += 20;
				} else if ((slave.geneMods.NCS === 1) || (jsRandom(1, 100) > (50 - (V.injectionUpgrade * 10) - buttSize))) {
					r += ` <span class="lime">${His} butt shrinks painfully,</span> becoming smaller while ${his} <span class="orange">waistline swells greatly.</span>`;
					slave.butt -= 1;
					slave.weight += 10;
				}
				slave.butt = Math.clamp(slave.butt, 0, 20);
				break;
			case Drug.SAGBGONE:
				if (slave.assignment === Job.CONCUBINE) {
					r += ` Before bed and when you awake, you take the time sensually <span class="coral">massage sag-B-gone into ${his} breasts,</span> which, while enjoyable to the both of you, doesn't seem to be doing much.`;
				} else if (slave.assignment === Job.FUCKTOY) {
					r += ` Whenever you have a free moment you take that time to <span class="coral">massage sag-B-gone into ${his} breasts,</span> which, while enjoyable, doesn't seem to be doing much.`;
				} else {
					r += ` ${He} is required to frequently <span class="coral">massage sag-B-gone into ${his} breasts,</span> which, while enjoyable to watch, doesn't seem to be doing much.`;
				}
				break;

			// Adds a default to handle unexpected(modded) drugs
			default: {
				const drug = App.Mods.Drugs.list.filter(drug => !drug.isPCDrug).find(e => e.name === slave.drugs);
				if (drug) {
					r += drug.effect(slave);
				} else {
					console.error(`Drug effect of ${slave.drugs} not found!`);
					slave.drugs = Drug.NONE;
				}
			}
		}
		if (slave.drugs !== Drug.NONE && slave.drugs !== Drug.APPETITESUPP) {
			if (V.arcologies[0].FSBodyPuristLaw === 0) {
				if (V.healthyDrugsUpgrade === 0) {
					slave.chem += 1.5;
					if (intensive) {
						slave.chem += 1;
					}
				}
			}
		}
		if (intensive) {
			r += ` Such reckless doping is dangerous and <span class="health dec">unhealthy.</span>`;
			healthDamage(slave, jsRandom(3, 5));
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function pregnancyDrugEffects(slave) {
		switch (slave.pregControl) {
			case GestationDrug.SLOW:
				slave.chem += 1;
				if (slave.preg >= slave.pregData.normalBirth) {
					r += ` ${He} is full term; gestation restriction agents <span class="health dec">can't suppress labor</span> and ${his} regimen is ended to prevent health damage.`;
					slave.pregControl = "none";
				} else if ((slave.preg >= slave.pregData.normalBirth / 2.5) || (slave.bellyPreg >= 1500 && slave.weight <= 130)) {
					r += ` ${His} belly feels very docile, ${his} gestation rate is <span class="coral">greatly reduced.</span>`;
				} else if (slave.preg > 0) {
					r += ` ${His} gestation rate is <span class="coral">greatly reduced,</span> delaying how long it will be until ${his} pregnancy is visible.`;
				}
				break;
			case GestationDrug.FAST:
				slave.chem += 2;
				if (slave.preg >= slave.pregData.normalBirth) {
					r += ` ${His} child is ready to pop out of ${his} womb; <span class="yellow">${his} course of rapid gestation agents is finished.</span>`;
					slave.pregControl = "none";
				} else if ((slave.assignment !== Job.CLINIC || !S.Nurse) && slave.geneMods.rapidCellGrowth !== 1) {
					r += ` ${His} `;
					if (slave.pregType > 1) {
						r += `children are`;
					} else {
						r += `child is`;
					}
					r += ` growing rapidly within ${his} womb, far faster than ${his} <span class="health dec">poor body can handle.</span>`;
					if (slave.pregType >= 10 && slave.bellyPreg >= 100000) {
						r += ` ${His} rate of growth is straining ${his} womb; ${he} is <span class="health dec">at risk of bursting!</span>`;
					}
					healthDamage(slave, (slave.preg + slave.pregType - slave.bellySag));
					if (slave.health.condition < -90) {
						r += ` ${His} critically poor health <span class="orange">caused ${him} to miscarry.</span>`;
						if (rulesDemandContraceptives(slave, V.defaultRules)) {
							slave.preg = -1;
						} else {
							slave.preg = 0;
						}
						TerminatePregnancy(slave);
						actX(slave, "miscarriages");
						if (slave.fetish !== Fetish.MINDBROKEN && slave.fuckdoll === 0) {
							r += ` ${He} is`;
							if (slave.devotion < -50) {
								r += ` <span class="mediumorchid">filled with violent, consuming hatred</span> and <span class="gold">fear.</span> Even though ${he} knew ${his} baby was destined for a slave orphanage, it seems ${he} cared for it and views you as its killer.`;
								slave.devotion -= 25;
								slave.trust -= 25;
							} else if (slave.devotion < -20) {
								r += ` <span class="mediumorchid">afflicted by desperate, inconsolable grief</span> and <span class="gold">horror.</span> Even though ${he} knew ${his} baby was destined for a slave orphanage, it seems ${he} cared for it.`;
								slave.devotion -= 10;
								slave.trust -= 20;
							} else if (slave.devotion <= 20) {
								r += ` <span class="mediumorchid">consumed by enduring sorrow</span> and <span class="gold">horror.</span> Even though ${he} knew ${his} baby was destined for a slave orphanage, it seems ${he} cared for it.`;
								slave.devotion -= 5;
								slave.trust -= 5;
							} else if (slave.devotion <= 50) {
								r += ` dully obedient. ${He} has been broken to slave life so thoroughly that even this is neither surprising nor affecting.`;
							} else {
								r += ` <span class="hotpink">pleased by this stark development,</span> since ${he} is so attentive to your will. ${He} also expects ${he} will be able to fuck better now once ${his} health recovers.`;
								slave.devotion += 4;
							}
						}
						if (slave.abortionTat > -1) {
							slave.abortionTat++;
							r += ` The temporary tattoo of a child has been replaced with ${his} ${ordinalSuffix(slave.abortionTat)} crossed out infant.`;
							cashX(forceNeg(V.modCost), "slaveMod", slave);
						}
					}
				}
				break;
			case GestationDrug.LABOR:
				slave.chem += 2;
				if (WombBirthReady(slave, slave.pregData.normalBirth * 1.5) > 0) {
					healthDamage(slave, 20);
					induce(slave);
					r += ` ${He} has been ready to give birth for some time now. Suppressing birth for so long <span class="health dec">greatly affects ${his} health.</span> ${He} may <span class="health dec">have trouble</span> giving birth to ${his} oversized ${(slave.pregType === 1) ? `child` : `children`}. ${He} seems to be in distress, ${his} body is <span class="health dec">forcing ${his} ${(slave.pregType === 1) ? `child` : `children`} out!</span>`;
				} else if (WombBirthReady(slave, slave.pregData.normalBirth * 1.25) > 0) {
					healthDamage(slave, 20);
					r += ` ${He} has been ready to give birth for some time now. Suppressing birth for so long <span class="health dec">greatly affects ${his} health.</span> ${He} may <span class="health dec">have trouble</span> giving birth to ${his} oversized ${(slave.pregType === 1) ? `child` : `children`}. `;
				} else if (WombBirthReady(slave, slave.pregData.normalBirth) > 0) {
					healthDamage(slave, 10);
					r += ` Labor suppressing agents <span class="health dec">negatively affect ${his} health.</span> `;
				}
				break;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function curativeEffects(slave) {
		if (slave.health.condition > 90 && slave.health.illness < 1) {
			r += ` ${His} health is already outstanding and cannot be improved with further drug treatment. <span class="yellow">${His} drug regimen has defaulted to preventatives.</span>`;
			slave.curatives = 1;
		} else if ((slave.assignment === Job.REST || slave.assignment === Job.SPA) && (slave.fetish !== Fetish.MINDBROKEN)) {
			if (slave.inflationType !== InflationLiquid.CURATIVE || slave.inflation === 0) {
				r += ` The curatives ${he}'s taking synergize with rest, keeping ${him} asleep most of the time. This is an <span class="health inc">extremely effective health treatment.</span>`;
			} else {
				r += ` Since ${he} is usually slumbering soundly, the curatives are able to <span class="health inc">work more efficiently.</span>`;
			}
			improveCondition(slave, 4);
		} else if (slave.health.condition < -20) {
			r += ` <span class="health inc">${His} poor health rapidly improves</span> under drug treatment.`;
			improveCondition(slave, 2);
		} else {
			r += ` <span class="health inc">${His} health improves</span> under curative treatment.`;
		}
		if (slave.fuckdoll === 0 && slave.fetish !== Fetish.MINDBROKEN) {
			r += ` ${He} <span class="mediumaquamarine">trusts you more</span> for giving ${him} access to expensive modern medicine.`;
			slave.trust += 1;
		}
		if (slave.curatives === 2) {
			if (slave.health.condition <= 90) {
				improveCondition(slave, 6);
				improveCondition(slave, V.curativeUpgrade * 6);
			}
			slave.chem += 1;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function aphrodisiacEffects(slave) {
		if (slave.aphrodisiacs > 1) {
			r += ` The aphrodisiacs ${he}'s on `;
			if (slave.energy <= 95) {
				r += `<span class="libido inc">rapidly boost ${his} sex drive.</span>`;
				slave.energy += 5;
			} else {
				r += `can't improve ${his} absurd sex drive.`;
			}
			if (slave.fuckdoll === 0 && slave.fetish !== Fetish.MINDBROKEN) {
				r += ` They <span class="hotpink">increase ${his} acceptance</span> of sexual slavery.`;
				slave.devotion += 5;
			}
			if (V.arcologies[0].FSBodyPuristLaw === 0 && V.healthyDrugsUpgrade === 0) {
				r += ` Such a high dosage <span class="health dec">isn't healthy.</span>`;
				healthDamage(slave, 5);
			}
			slave.chem += 1;
		} else {
			r += ` The aphrodisiacs ${he}'s on `;
			if (slave.energy <= 95) {
				r += `<span class="libido inc">boost ${his} sex drive.</span>`;
				slave.energy += 3;
			} else {
				r += `can't improve ${his} absurd sex drive.`;
			}
			if (slave.fuckdoll === 0 && slave.fetish !== Fetish.MINDBROKEN) {
				r += ` They <span class="hotpink">increase ${his} acceptance</span> of sexual slavery.`;
				slave.devotion += 3;
			}
			slave.chem += 0.5;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function healthAndWellness(slave) {
		slave.chem = Math.clamp(slave.chem - 0.5, 0, 1000);
		// illness
		if (slave.curatives < 2 && slave.inflationType !== InflationLiquid.CURATIVE && slave.assignment !== Job.SPA && slave.assignment !== Job.REST && slave.assignment !== Job.CLINIC) {
			if (slave.health.illness > 0) {
				r += ` ${He} is `;
				if (slave.health.illness > 4) {
					r += `deathly`;
				} else if (slave.health.illness > 3) {
					r += `seriously`;
				} else if (slave.health.illness < 2) {
					r += `slightly`;
				}
				if (slave.fuckdoll === 0) {
					if (slave.fetish === Fetish.MINDBROKEN) {
						r += ` ill, yet still continues to mindlessly carry out ${his} duties.`;
					} else if (slave.health.illness < 2) {
						r += ` ill, though not enough to complain about.`;
					} else if (slave.devotion < 20) {
						r += ` ill and <span class="mediumorchid">hates</span> having ${his} health issues <span class="gold">ignored.</span>`;
						slave.devotion -= slave.health.illness * 2;
						slave.trust -= slave.health.illness;
					} else if (slave.devotion < 50) {
						r += ` ill and <span class="mediumorchid">resents</span> being <span class="gold">denied</span> proper treatment.`;
						slave.devotion -= slave.health.illness * 3;
						slave.trust -= slave.health.illness * 2;
					} else if (slave.health.illness > 3) {
						r += ` ill and <span class="gold">struggles with</span> being withheld treatment.`;
						slave.trust -= slave.health.illness * 3;
					} else {
						r += ` ill and does ${his} best to continue with ${his} duties out of dedication to you.`;
					}
				} else {
					r += ` ill, triggering ${his} suit's preventative measures.`;
				}
			}
			if (slave.fuckdoll === 0) {
				if (slave.fetish !== Fetish.MINDBROKEN) {
					if (slave.health.condition < -50) {
						r += ` It's difficult being so in such poor condition, and ${he} <span class="mediumorchid">resents you</span> for ignoring ${his} plight.`;
						slave.devotion -= 2;
					} else if (slave.health.condition > 50) {
						r += ` ${He} understands that ${he} owes ${his} near-perfect health to you and <span class="trust inc">believes</span> that life with you is better than freedom in some ways.`;
						slave.trust += 1;
					}
				}
			}
		}
		r += ` ${illness(slave)}`;
		// tiredness
		if (slave.drugs !== Drug.STIM && slave.inflationType !== InflationLiquid.STIM) {
			if (slave.assignment !== Job.SPA && slave.assignment !== Job.REST && slave.assignment !== Job.CLINIC) {
				if (slave.health.tired > 90) {
					r += ` ${He} has been worked to the bone`;
					if (slave.devotion < 20) {
						r += ` and <span class="hotpink">bends a little more to your will,</span> while <span class="gold">fearing ${he}'ll never earn a reprieve</span> from toiling.`;
						slave.devotion += 1;
						slave.trust -= 2;
					} else if (slave.devotion < 50) {
						r += ` and can't help but <span class="gold">worry a little about ${his} well-being.</span>`;
						slave.trust -= 1;
					} else {
						r += ` but ${he} carries on without complaint, keeping ${his} <span class="mediumorchid">growing doubts</span> to ${himself}.`;
						slave.devotion -= 2;
					}
				} else if (slave.health.tired > 60) {
					r += ` ${He} is suffering from exhaustion`;
					if (slave.devotion < 20) {
						r += ` and it is <span class="hotpink">wearing away at ${his} resistance.</span>`;
						slave.devotion += 1;
					} else {
						r += ` but ${he} tries not to let it show.`;
					}
				}
			}
		}
		// addiction
		if (slave.addict > 0) {
			if (slave.aphrodisiacs > 0) {
				slave.addict += slave.aphrodisiacs;
			} else if (slave.inflationType === InflationLiquid.APHRO) {
				r += ` ${He} gets ${his} fix from ${his} aphrodisiac-filled belly.`;
			} else if (slave.addict < 2) {
				r += ` ${He} has finally been <span class="cyan">weaned off aphrodisiacs.</span>`;
				slave.addict = 0;
			} else if (V.aphrodisiacUpgrade === 1) {
				r += ` Substitutes produced by your advanced pharmaceutical fabricator protect ${him} from the negative effects of aphrodisiac withdrawal and even hasten the flushing of ${his} system.`;
				slave.addict -= 2;
			} else {
				r += ` ${He} feels the effects of withdrawal from aphrodisiacs keenly, and ${he} is <span class="mediumorchid">bitterly resentful.</span>`;
				slave.addict -= 2;
				slave.devotion -= 10;
			}
		} else {
			if (slave.aphrodisiacs > 0) {
				if (jsRandom(1, 100) < 40 + (20 * slave.aphrodisiacs)) {
					r += ` <span class="cyan">${He} has become an aphrodisiac addict.</span>`;
					slave.addict = 1;
				}
			}
		}
		// suppository drug delivery
		if (slave.fuckdoll === 0) {
			if (V.suppository === 1) {
				if ((slave.aphrodisiacs > 0) || (slave.curatives > 0) || (slave.drugs === Drug.PSYCHOSUPP) || (slave.drugs === Drug.HORMONEENHANCE) || (slave.drugs === Drug.HORMONEBLOCK) || (slave.hormones !== 0)) {
					if (slave.anus === 0) {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r += ` ${His} <span class="lime">virgin anus is broken in</span> by a callous machine, but ${he} didn't notice.`;
						} else if (slave.devotion <= 20) {
							r += ` ${His} <span class="lime">anal virginity is taken</span> by a machine whose sole purpose is to fuck drugs into ${him}; <span class="mediumorchid">an indignity ${he} does not take well.</span>`;
							slave.devotion -= 10;
						} else {
							r += ` ${His} <span class="lime">virgin anus is broken in</span> by a callous machine, but ${he} accepts such indignities as a part of life.`;
						}
						slave.anus = 1;
					} else {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r += ` A reciprocating dildo pumps ${his} drug regime into ${him} each morning and night.`;
						} else if (slave.sexualFlaw === SexualFlaw.HATESANAL) {
							if (jsRandom(1, 100) > 80) {
								r += ` Getting buttfucked morning and night by reciprocating dildos that ejaculate ${his} drug regime forces ${him} to <span class="green">accept anal sex</span> as a fact of life.`;
								slave.sexualFlaw = SexualFlaw.NONE;
							} else {
								r += ` Getting buttfucked morning and night by reciprocating dildos that ejaculate ${his} drug regime <span class="mediumorchid">infuriates ${him},</span> since ${he} hates getting assraped.`;
								slave.devotion -= 4;
							}
						} else if (slave.fetish === Fetish.BUTTSLUT) {
							if (slave.fetishKnown === 0) {
								r += ` Getting buttfucked morning and night by reciprocating dildos that ejaculate ${his} drug regime has revealed something: <span class="lightcoral">${he} likes it up the ass!</span>`;
								slave.fetishKnown = 1;
							} else if (slave.fetishStrength <= 95 && slave.devotion > 20) {
								r += ` Getting buttfucked morning and night by reciprocating dildos that ejaculate ${his} drug regime has <span class="lightcoral">deepened ${his} anal fixation.</span>`;
								slave.fetishStrength += 5;
							}
						} else {
							if (slave.devotion < -20) {
								r += ` Getting buttfucked morning and night by reciprocating dildos that ejaculate ${his} drug regime <span class="mediumorchid">disgusts ${him}.</span>`;
								slave.devotion -= 2;
							} else if (fetishChangeChance(slave) > jsRandom(0, 100)) {
								r += ` ${He} starts to look forward to getting buttfucked morning and night by reciprocating dildos that ejaculate ${his} drug regime; ${he}'s <span class="lightcoral">become anally fixated.</span>`;
								slave.fetish = Fetish.BUTTSLUT;
								slave.fetishKnown = 1;
								slave.fetishStrength = 10;
							} else {
								r += ` A reciprocating dildo pumps ${his} drug regime into ${him} each morning and night.`;
							}
						}
						if (slave.sexualQuirk === SexualQuirk.PAINAL) {
							r += ` ${He} <span class="hotpink">secretly enjoys</span> being assraped by a machine twice a day.`;
							slave.devotion += 1;
						}
						if (V.seeStretching === 1 && slave.anus === 1) {
							if (jsRandom(1, 100) > 70) {
								r += ` The regular machine anal <span class="lime">stretches out ${his} tight asshole.</span>`;
								slave.anus += 1;
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
	function drugExpiry(slave) {
		switch (slave.drugs) {
			case Drug.GROWTHSTIM:
				if (!canImproveHeight(slave)) {
					r += ` ${His} body has already grown far past ${his} natural limits; further injections of stimulants will have no effect. <span class="yellow">${His} drug regimen has been ended.</span>`;
					slave.height = Math.clamp(slave.height, 0, Math.min(maxHeight(slave) + slave.heightImplant * 10, 274));
					slave.drugs = Drug.NONE;
				}
				break;
			case Drug.GROWBREAST:
			case Drug.INTENSIVEBREAST:
				if (slave.boobs >= 50000) {
					r += ` ${His} udders are now so huge that further A-HGH treatment will not increase their size. <span class="yellow">${His} drug regimen has been ended.</span>`;
					slave.boobs = Math.clamp(slave.boobs, 0, 50000);
					slave.drugs = Drug.NONE;
				}
				break;
			case Drug.GROWBUTT:
			case Drug.INTENSIVEBUTT:
				if (slave.butt >= 10) {
					r += ` ${His} ass is now so huge that further A-HGH treatment will not increase its size. <span class="yellow">${His} drug regimen has been ended.</span>`;
					slave.butt = Math.clamp(slave.butt, 0, 20);
					slave.drugs = Drug.NONE;
				}
				break;
			case Drug.HYPERBUTT:
				if (slave.butt >= 20) {
					r += ` ${His} ass is now so freakishly monstrous that further HA-HGH treatment will not increase its size. <span class="yellow">${His} drug regimen has been ended.</span>`;
					slave.butt = Math.clamp(slave.butt, 0, 20);
					slave.drugs = Drug.NONE;
				}
				break;
			case Drug.HYPERBREAST:
				if (slave.boobs >= 50000) {
					r += ` ${His} udders are now so huge that further HA-HGH treatment will not increase their size. <span class="yellow">${His} drug regimen has been ended.</span>`;
					slave.boobs = Math.clamp(slave.boobs, 0, 50000);
					slave.drugs = Drug.NONE;
				}
				break;
			case Drug.GROWLIP:
				if ((slave.lips > 95) || (slave.lips > 85 && V.seeExtreme !== 1)) {
					r += ` ${His} lips are now so huge that further A-HGH treatment will not increase their size. <span class="yellow">${His} drug regimen has been ended.</span>`;
					slave.drugs = Drug.NONE;
				}
				break;
			case Drug.GROWPENIS:
			case Drug.INTENSIVEPENIS:
				if (slave.dick >= 10) {
					r += ` ${His} cock is now so huge that further drug enhancement will not increase its size. <span class="yellow">${His} drug regimen has been ended.</span>`;
					slave.dick = Math.clamp(slave.dick, 0, 10);
					slave.drugs = Drug.NONE;
				} else if (slave.clit >= 5 && slave.dick === 0) {
					r += ` ${His} clit is now so huge that further drug enhancement will not increase its size. <span class="yellow">${His} drug regimen has been ended.</span>`;
					slave.clit = /** @type {FC.ClitType} */ (Math.clamp(slave.clit, 0, 5));
					slave.drugs = Drug.NONE;
				}
				break;
			case Drug.GROWTESTICLE:
			case Drug.INTENSIVETESTICLE:
				if (slave.balls >= 10) {
					r += ` ${His} balls are now so huge that further drug enhancement will not increase their size. However, leaving ${him} on them will still stimulate cum production.`;
				} else if (slave.balls >= 2 && slave.scrotum === 0) {
					r += ` ${His} balls are now functionally sized, and cannot sustainably grow larger hidden within ${his} abdomen. <span class="yellow">${His} drug regimen has been ended.</span>`;
					slave.balls = Math.clamp(slave.balls, 0, 2);
					slave.drugs = Drug.NONE;
				}
				break;
			case Drug.PSYCHOSUPP:
				if (slave.intelligence < -95) {
					r += ` ${He} is so moronic that drug treatment can't really make ${him} more willing to obey others than ${he} already is. <span class="yellow">${His} drug regimen has been ended.</span>`;
					slave.drugs = Drug.NONE;
				}
				break;
			case Drug.PSYCHOSTIM:
				if (!canImproveIntelligence(slave)) {
					r += ` ${His} intelligence has been improved as much as a drink possibly can. <span class="yellow">${His} drug regimen has been ended.</span>`;
					slave.drugs = Drug.NONE;
				}
				break;
		}
		if (slave.pregControl !== "none" && slave.pregKnown === 0) {
			r += ` ${He} is not pregnant; use of pregnancy controlling drugs will have no effect. <span class="yellow">${His} drug regimen has been ended.</span>`;
			slave.pregControl = "none";
		}
	}
};
