App.EndWeek.Player.drugs = function(PC = V.PC) {
	/** @type {(string|HTMLElement|DocumentFragment)[]} */
	const r = [];

	const intensive = (PC.drugs === Drug.INTENSIVEBREAST || PC.drugs === Drug.INTENSIVEBUTT ||
		PC.drugs === Drug.INTENSIVEPENIS || PC.drugs === Drug.INTENSIVETESTICLE) ? 1 : 0;
	const gigantomastiaMod = PC.geneticQuirks.gigantomastia === 2 ? (PC.geneticQuirks.macromastia === 2 ? 3 : 2) : 1;
	const rearLipedemaMod = PC.geneticQuirks.rearLipedema === 2 ? 1 : 0;
	const boobSize = PC.boobs - PC.boobsImplant - PC.boobsMilk;
	const buttSize = PC.butt - PC.buttImplant;
	const lipSize = PC.lips - PC.lipsImplant;

	if (PC.drugs !== Drug.NONE) {
		drugEffects();
	}
	if (PC.pregControl !== "none") {
		pregnancyDrugEffects();
	}
	if (PC.aphrodisiacs > 0) {
		aphrodisiacEffects();
	}
	if (PC.drugs !== Drug.NONE) {
		drugExpiry();
	}

	return App.Events.makeNode(r);

	function galactorrheaTriggerCheck() {
		if (PC.geneticQuirks.galactorrhea === 2 && PC.lactation === 0 && random(1, 100) <= PC.hormoneBalance) {
			PC.lactation = 1;
			PC.lactationDuration = 2;
			if (V.geneticMappingUpgrade > 0) {
				r.push(`The sudden surge of female hormones has unsurprisingly <span class="change positive">triggered your galactorrhea.</span>`);
			} else {
				r.push(`You experience <span class="change positive">sudden lactation</span> as a side effect from the drugs.`);
			}
		}
	}

	function ncsFightsButtGrowth(PC, growth) {
		if (PC.geneMods.NCS === 1) {
			growth = Math.trunc(growth / 2.2);
			r.push(`Your <span class="ncs">NCS</span> resists the butt growth,`);
			if (growth > 1) {
				r.push(`converting the excess fat into sexual energy.`);
			} else {
				r.push(`but has no lasting effect.`);
			}
			PC.energy += growth;
		}
		return growth;
	}

	function drugEffects() {
		let dietInfluence;
		let growth;
		let shrinkage;
		let noGrowth;
		const oldLips = PC.lips;

		switch (PC.drugs) {
			case Drug.HORMONEENHANCE:
				r.push(`Your drug regime prepares your body to accept hormonal effects.`);
				break;
			case Drug.HORMONEBLOCK:
				break; // hormone blockers take effect solely in prLongTermEffects - this is a placeholder to prevent the unrecognized drug handler from clearing .drugs
			case "hip wideners":
				r.push(`The tablets aid your body with preparing for childbirth, at the cost of <span class="health dec">leaving you ill</span> from the excess hormones.`);
				healthDamage(PC, random(3, 5));
				break;
			case Drug.PRIAPISM:
				if (PC.dick === 0) {
					r.push(`You have no dick, so priapism agents are useless to you. <span class="noteworthy">You stop taking them.</span>`);
					PC.drugs = Drug.NONE;
				} else if (PC.dick > maxErectionSize(PC) + 4 || PC.dick > 10) {
					r.push(`Taking priapism agents started to get your enormous dick erect, but you never find out if they succeeded as the amount of blood it took to get that hard caused you to black out. <span class="noteworthy">You hastily stop taking them.</span>`);
					PC.drugs = Drug.NONE;
				} else {
					r.push(`Taking priapism agents keeps you hard at all times. Taking them too often leaves your dick <span class="health dec">painfully sensitive,</span> though.`);
					healthDamage(PC, 5);
					if (PC.dick > maxErectionSize(PC)) {
						r.push(`Your oversized cock also requires a proportionally large amount of blood to achieve erection <span class="health dec">leaving you lightheaded and suffering from low blood pressure.</span>`);
						healthDamage(PC, PC.dick * 5);
					}
				}
				break;
			case Drug.PSYCHOSTIM:
				r.push(`You enjoy a cup of <span class="intelligent">mind stimulating</span> tea with each meal; it's quite relaxing, really.`);
				PC.intelligence += 1;
				if (PC.energy > 60) {
					r.push(`A little too much, perhaps, as you find yourself <span class="libido dec">thinking less about sex</span> as well.`);
					if (PC.energy > 95) {
						PC.energy -= 3;
					} else if (PC.energy > 80) {
						PC.energy -= 2;
					} else {
						PC.energy -= 1;
					}
				}
				break;
			case Drug.HYPERBREAST:
				growth = (1 + V.injectionUpgrade) * 3 * gigantomastiaMod;
				r.push(`You <span class="change positive">directly inject`);
				if (V.injectionUpgrade !== 0) {
					r.push(`advanced`);
				}
				r.push(`hyper growth hormones into your breasts before bed each night;</span>`);
				dietInfluence = false;
				if (PC.diet === PCDiet.FATTEN) {
					r.push(`all the binging you do fuels growth,`);
					dietInfluence = true;
					growth += 6;
				} else if (PC.diet === PCDiet.FERTILITY) {
					r.push(`the fertility hormones in your food favor breast growth`);
					dietInfluence = true;
					growth += 1;
				} else if (PC.diet === PCDiet.RESTRICTED) {
					r.push(`how little you eat leaves your body few resources to grow on`);
					dietInfluence = true;
					growth -= 1;
				} else if (PC.weight > 130) {
					r.push(`the extra large portions you eat helps support growth`);
					dietInfluence = true;
					growth += 4;
				} else if (PC.weight > 30) {
					r.push(`how much you eat helps support growth`);
					dietInfluence = true;
					growth += 2;
				} else if (PC.weight <= -30) {
					r.push(`how little you eat impedes growth`);
					dietInfluence = true;
					growth--;
				}
				if (dietInfluence) {
					if (PC.health.condition > -20) {
						r.push(`and`);
					} else {
						r.push(`but`);
					}
				}
				if (PC.health.condition > 80) {
					r.push(`your perfect health supports growth extremely well,`);
					if (PC.boobs < 5000 || PC.boobs >= 10000) {
						r.push(`and`);
					} else {
						r.push(`but`);
					}
					growth += 6;
				} else if (PC.health.condition > -20) {
					r.push(`your health supports growth,`);
					if (PC.boobs < 2000 || PC.boobs >= 10000) {
						r.push(`and`);
					} else {
						r.push(`but`);
					}
				} else {
					r.push(`your poor health does not support steady growth, but`);
					growth--;
				}
				if (PC.boobs < 800) {
					r.push(`you wake up each morning with a lot of extra weight on your chest.`);
					growth += 10;
					if (PC.boobShape !== BreastShape.SAGGY && PC.boobsImplant / PC.boobs < 0.5 && PC.breastMesh !== 1) {
						if (random(1, 10) < 5) {
							r.push(`Their rapid growth and lack of existing support causes them to <span class="coral">sag under their new-found weight.</span>`);
							PC.boobShape = BreastShape.SAGGY;
						}
					}
				} else if (PC.boobs < 2000) {
					r.push(`you wake up each morning to find them larger than the night before.`);
					growth += 8;
					if (PC.boobShape !== BreastShape.SAGGY && PC.boobsImplant / PC.boobs < 0.5 && PC.breastMesh !== 1) {
						if (random(1, 10) < 5) {
							r.push(`Their rapid growth and lack of existing support causes them to <span class="coral">sag under their new-found weight.</span>`);
							PC.boobShape = BreastShape.SAGGY;
						}
					}
				} else if (PC.boobs < 5000) {
					r.push(`your hefty boobs steadily grow.`);
					growth += 6;
					if (PC.boobShape !== BreastShape.SAGGY && PC.boobsImplant / PC.boobs < 0.5 && PC.breastMesh !== 1) {
						if (random(1, 10) === 1) {
							r.push(`As they do, they <span class="coral">begin to sag</span> under their own monstrous weight, with the surging breastflesh directing your nipples downward.`);
							PC.boobShape = BreastShape.SAGGY;
						}
					}
				} else if (PC.boobs < 10000) {
					r.push(`your huge boobs slowly grow.`);
					growth += 4;
					if (PC.boobShape !== BreastShape.SAGGY && PC.boobsImplant / PC.boobs < 0.5 && PC.breastMesh !== 1) {
						if (random(1, 10) === 1) {
							r.push(`As they do, they <span class="coral">begin to sag</span> under their own monstrous weight, with the surging breastflesh directing your nipples downward.`);
							PC.boobShape = BreastShape.SAGGY;
						}
					}
				} else {
					r.push(`you wake up each morning to find your monstrous udders a little larger than the night before.`);
					growth += 10;
					if (PC.boobShape !== BreastShape.NORMAL && (PC.boobsImplant / PC.boobs < 0.9) && PC.breastMesh !== 1) {
						if (random(1, 10) === 1) {
							r.push(`Your <span class="coral">breasts lose their unique shape</span> as they adapt to their monstrous, unnatural size. There's simply nowhere else for the mass of boob to go as its continuous expansion fills your breasts out more and more.`);
							PC.boobShape = BreastShape.NORMAL;
						}
					}
				}
				if (PC.geneMods.NCS === 1) {
					growth = Math.trunc(growth / 2.2);
					r.push(`Your <span class="ncs">NCS</span> resists the breast growth, diverting some of resources into additional sexual energy.`);
					PC.energy += growth;
				}
				growth = 25 * Math.trunc(growth * 0.8);
				PC.boobs += Math.clamp(growth, 25, 5000);
				if (random(1, 100) > 30 + (PC.areolae * 10) && PC.areolae < 4) {
					r.push(`Your <span class="change positive">areolae grow</span> to keep in proportion with your breasts.`);
					PC.areolae += 1;
				}
				if (random(1, 100) > 70 && PC.nipples !== NippleShape.INVERTED && PC.nipples !== NippleShape.FUCKABLE && PC.nipples !== NippleShape.FLAT) {
					if ([NippleShape.CUTE, NippleShape.HUGE, NippleShape.PUFFY, NippleShape.TINY].includes(PC.nipples)) {
						r.push(`Your <span class="change positive">nipples have completely disappeared</span> into your breastflesh.`);
						PC.nipples = NippleShape.INVERTED;
					}
				}
				if (PC.geneticQuirks.gigantomastia === 3 && random(1, 200) < PC.hormoneBalance) {
					PC.geneticQuirks.gigantomastia = 2;
				}
				if (PC.geneticQuirks.macromastia === 3 && random(1, 200) < PC.hormoneBalance) {
					PC.geneticQuirks.macromastia = 2;
				}
				if (PC.geneticQuirks.galactorrhea === 2 && PC.lactation === 0 && random(1, 50) <= PC.hormoneBalance) {
					PC.lactation = 1;
					PC.lactationDuration = 2;
					if (V.geneticMappingUpgrade > 0) {
						r.push(`The sudden surge of hormones has unsurprisingly <span class="change positive">triggered your galactorrhea.</span>`);
					} else {
						r.push(`You experience <span class="change positive">sudden lactation</span> as a side effect from the drugs.`);
					}
				}
				break;
			case "breast enhancers":
				growth = 1 * gigantomastiaMod;
				r.push(`You slap a <span class="change positive">dermal growth hormone patch on each breast every morning;</span>`);
				if (PC.boobs < 800) {
					r.push(`with their limited mass, your small boobs greedily absorb the drugs.`);
					growth += 3;
					if (PC.boobShape !== BreastShape.TORPEDO && PC.boobShape !== BreastShape.WIDE && PC.breastMesh !== 1) {
						if (random(1, 10) === 1) {
							if (PC.shoulders < 0) {
								r.push(`As they expand, <span class="change positive">they take on a torpedo shape within the your narrow frame,</span> projecting considerably from your chest and swinging delightfully when unrestrained.`);
								PC.boobShape = BreastShape.TORPEDO;
							} else {
								r.push(`As they expand, <span class="change positive">they become widely set across your broad frame,</span> spreading to your sides even when you're not lying back.`);
								PC.boobShape = BreastShape.WIDE;
							}
						}
					}
				} else if (PC.boobs < 2000) {
					r.push(`at their size, your boobs readily absorb the drugs.`);
					growth += 2;
					if (PC.boobShape === BreastShape.SAGGY || (PC.boobShape === BreastShape.DOWNWARD && PC.breastMesh !== 1)) {
						if (random(1, 10) === 1) {
							r.push(`As they expand, <span class="change positive">they fill out, losing their sag</span> as the expanding tissue lifts your nipples up to point forward.`);
							PC.boobShape = BreastShape.NORMAL;
						}
					}
				} else if (PC.boobs < 5000) {
					r.push(`at their size, your hefty boobs slowly absorb the drugs.`);
					growth++;
					if (PC.boobShape !== BreastShape.SAGGY && (PC.boobsImplant / PC.boobs < 0.5) && PC.breastMesh !== 1) {
						if (random(1, 10) === 1) {
							r.push(`As they expand, they <span class="coral">begin to sag</span> under their own monstrous weight, with the expanding breastflesh directing your nipples downward.`);
							PC.boobShape = BreastShape.SAGGY;
						}
					}
				} else if (PC.boobs < 10000) {
					r.push(`with their mass, and how tiny the patches are in comparison, it comes as little surprise that your huge boobs barely grow.`);
					if (PC.boobShape !== BreastShape.SAGGY && PC.boobsImplant / PC.boobs < 0.5 && PC.breastMesh !== 1) {
						if (random(1, 10) === 1) {
							r.push(`As they slowly do, they <span class="coral">begin to sag</span> under their own monstrous weight, with the expanding breastflesh directing your nipples downward.`);
							PC.boobShape = BreastShape.SAGGY;
						}
					}
				} else {
					r.push(`with their mass, and how minuscule the patches are in comparison, you're left to wonder if your monstrous boobs are actually growing or not.`);
					growth--;
					if (PC.boobShape !== BreastShape.NORMAL && (PC.boobsImplant / PC.boobs < 0.9) && PC.breastMesh !== 1) {
						if (random(1, 10) === 1) {
							r.push(`Your <span class="coral">breasts lose their unique shape</span> as they adapt to their enormous, unnatural size; there's simply nowhere else for the flesh to go as it keeps piling on.`);
							PC.boobShape = BreastShape.NORMAL;
						}
					}
				}
				if (PC.geneMods.NCS === 1 && growth > 0) {
					growth = Math.trunc(growth / 2.2);
					r.push(`Your <span class="ncs">NCS</span> resists the breast growth, diverting some of resources into additional sexual energy.`);
					PC.energy += growth;
				}
				growth = 25 * Math.trunc(growth * 0.8);
				PC.boobs += Math.clamp(growth, 5, 200);
				if (PC.areolae < 4) {
					if (growth > PC.areolae * 25) {
						r.push(`As the drugs diffuse throughout your breast tissue, <span class="change positive">they reach your areolae, forcing them to grow too.</span>`);
						PC.areolae += 1;
					}
				}
				if (PC.nipples === NippleShape.TINY || PC.nipples === NippleShape.CUTE || PC.nipples === NippleShape.PUFFY) {
					if (random(1, 200) < growth) {
						if (PC.nipples === NippleShape.TINY) {
							r.push(`The hormones also <span class="change positive">cause a little nipple growth.</span>`);
							PC.nipples = NippleShape.CUTE;
						} else if (PC.nipples === NippleShape.CUTE) {
							r.push(`The hormones also <span class="change positive">cause your cute nipples to puff up.</span>`);
							PC.nipples = NippleShape.PUFFY;
						} else if (PC.nipples === NippleShape.PUFFY) {
							r.push(`The hormones also <span class="change positive">cause your puffy nipples to become really enormous.</span>`);
							PC.nipples = NippleShape.HUGE;
						}
					}
				}
				if (PC.geneticQuirks.gigantomastia === 3 && random(1, 400) < PC.hormoneBalance) {
					PC.geneticQuirks.gigantomastia = 2;
				}
				if (PC.geneticQuirks.macromastia === 3 && random(1, 400) < PC.hormoneBalance) {
					PC.geneticQuirks.macromastia = 2;
				}
				if (PC.geneticQuirks.galactorrhea === 2 && PC.lactation === 0 && random(1, 150) <= PC.hormoneBalance) {
					PC.lactation = 1;
					PC.lactationDuration = 2;
					if (V.geneticMappingUpgrade > 0) {
						r.push(`The sudden surge of hormones has unsurprisingly <span class="change positive">triggered your galactorrhea.</span>`);
					} else {
						r.push(`You experience <span class="change positive">sudden lactation</span> as a side effect from the drugs.`);
					}
				}
				break;
			case Drug.GROWBREAST:
			case Drug.INTENSIVEBREAST:
				growth = 1 + V.injectionUpgrade * gigantomastiaMod;
				r.push(`You <span class="change positive">directly inject`);
				if (intensive) {
					r.push(`massive amounts of`);
					growth *= 2;
				}
				if (V.injectionUpgrade !== 0) {
					r.push(`advanced`);
				}
				r.push(`growth hormones into your breasts before bed each night;</span>`);
				dietInfluence = false;
				if (PC.diet === PCDiet.FATTEN) {
					r.push(`all the binging you do fuels growth,`);
					dietInfluence = true;
					growth += 2;
				} else if (PC.diet === PCDiet.FERTILITY) {
					r.push(`the fertility hormones in your food favor breast growth`);
					dietInfluence = true;
					growth += 1;
				} else if (PC.diet === PCDiet.RESTRICTED) {
					r.push(`how little you eat leaves your body few resources to grow on`);
					dietInfluence = true;
					growth -= 2;
				} else if (PC.weight > 130) {
					r.push(`the extra large portions you eat helps support growth`);
					dietInfluence = true;
					growth++;
				} else if (PC.weight > 30) {
					r.push(`how much you eat helps support growth`);
					dietInfluence = true;
					growth++;
				} else if (PC.weight <= -30) {
					r.push(`how little you eat impedes growth`);
					dietInfluence = true;
					growth--;
				}
				if (dietInfluence) {
					if (PC.health.condition > -20) {
						r.push(`and`);
					} else {
						r.push(`but`);
					}
				}
				if (PC.health.condition > 80) {
					r.push(`your perfect health supports growth extremely well,`);
					growth++;
				} else if (PC.health.condition > -20) {
					r.push(`your health supports growth,`);
				} else {
					r.push(`your poor health does not support steady growth,`);
					growth--;
				}
				if (PC.boobs < 2000) {
					r.push(`and`);
				} else {
					r.push(`but`);
				}
				if (PC.boobs < 800) {
					r.push(`you wake up each morning to find them a little larger than the night before.`);
					growth += 3;
					if (PC.boobShape !== BreastShape.TORPEDO && PC.boobShape !== BreastShape.WIDE && PC.breastMesh !== 1) {
						if (random(1, 10) === 1) {
							if (PC.shoulders < 0) {
								r.push(`As they grow, <span class="change positive">they take on a torpedo shape within the your narrow frame,</span> projecting considerably from your chest and swinging delightfully when unrestrained.`);
								PC.boobShape = BreastShape.TORPEDO;
							} else {
								r.push(`As they grow, <span class="change positive">they become widely set across your broad frame,</span> spreading to your sides even when you're not lying back.`);
								PC.boobShape = BreastShape.WIDE;
							}
						}
					}
				} else if (PC.boobs < 2000) {
					r.push(`your big boobs steadily grow.`);
					growth += 2;
					if (PC.boobShape === BreastShape.SAGGY || (PC.boobShape === BreastShape.DOWNWARD && PC.breastMesh !== 1)) {
						if (random(1, 10) === 1) {
							r.push(`As they do, <span class="change positive">they fill out, losing their sag</span> as the expanding tissue lifts your nipples up to point forward.`);
							PC.boobShape = BreastShape.NORMAL;
						}
					}
				} else if (PC.boobs < 5000) {
					r.push(`your hefty boobs slowly grow.`);
					growth++;
					if (PC.boobShape !== BreastShape.SAGGY && (PC.boobsImplant / PC.boobs < 0.5) && PC.breastMesh !== 1) {
						if (random(1, 10) === 1) {
							r.push(`As they do, they <span class="coral">begin to sag</span> under their own monstrous weight, with the surging breastflesh directing your nipples downward.`);
							PC.boobShape = BreastShape.SAGGY;
						}
					}
				} else {
					r.push(`you find it difficult to notice the slight growth in your monstrous tits.`);
					if (PC.boobShape !== BreastShape.NORMAL && (PC.boobsImplant / PC.boobs < 0.9) && PC.breastMesh !== 1) {
						if (random(1, 10) === 1) {
							r.push(`Your <span class="coral">breasts lose their unique shape</span> as they adapt to their enormous, unnatural size. There's simply nowhere else for the mass of boob to go as its continuous expansion fills your breasts out more and more.`);
							PC.boobShape = BreastShape.NORMAL;
						}
					}
				}
				if (PC.geneMods.NCS === 1) {
					growth = Math.trunc(growth / 2.2);
					r.push(`Your <span class="ncs">NCS</span> resists the breast growth, diverting some of resources into additional sexual energy.`);
					PC.energy += growth;
				}
				growth = 25 * Math.trunc(growth * 0.8);
				PC.boobs += Math.clamp(growth, 25, 200);
				if (PC.areolae < 4) {
					if (growth > PC.areolae * 25) {
						r.push(`Your <span class="change positive">areolae grow</span> to keep in proportion with your breasts.`);
						PC.areolae += 1;
					}
				}
				if (PC.nipples !== NippleShape.HUGE && PC.nipples !== NippleShape.FUCKABLE && PC.nipples !== NippleShape.FLAT) {
					if (random(1, 200) < growth) {
						if (PC.nipples === NippleShape.TINY) {
							r.push(`The hormones also <span class="change positive">cause a little nipple growth.</span>`);
							PC.nipples = NippleShape.CUTE;
						} else if (PC.nipples === NippleShape.CUTE) {
							if (random(1, 2) === 1) {
								r.push(`The hormones also <span class="change positive">cause your cute nipples to puff up.</span>`);
								PC.nipples = NippleShape.PUFFY;
							} else {
								r.push(`The explosive growth also <span class="change positive">causes your cute nipples to be partially swallowed up</span> by the burgeoning breastflesh.`);
								PC.nipples = NippleShape.PARTIAL;
							}
						} else if (PC.nipples === NippleShape.PUFFY) {
							if (random(1, 2) === 1) {
								r.push(`The hormones also <span class="change positive">cause your puffy nipples to become really enormous.</span>`);
								PC.nipples = NippleShape.HUGE;
							} else {
								r.push(`The explosive growth also <span class="change positive">causes your cute nipples to be completely swallowed up</span> by the burgeoning breastflesh.`);
								PC.nipples = NippleShape.INVERTED;
							}
						} else if (PC.nipples === NippleShape.PARTIAL) {
							r.push(`The explosive growth also <span class="change positive">causes your nipples to fully invert</span> into the burgeoning breastflesh.`);
							PC.nipples = NippleShape.INVERTED;
						}
					}
				}
				if (PC.geneticQuirks.gigantomastia === 3 && random(1, 300) < PC.hormoneBalance) {
					PC.geneticQuirks.gigantomastia = 2;
				}
				if (PC.geneticQuirks.macromastia === 3 && random(1, 300) < PC.hormoneBalance) {
					PC.geneticQuirks.macromastia = 2;
				}
				if (PC.geneticQuirks.galactorrhea === 2 && PC.lactation === 0 && random(1, 100) <= PC.hormoneBalance) {
					PC.lactation = 1;
					PC.lactationDuration = 2;
					if (V.geneticMappingUpgrade > 0) {
						r.push(`The sudden surge of hormones has unsurprisingly <span class="change positive">triggered your galactorrhea.</span>`);
					} else {
						r.push(`You experience <span class="change positive">sudden lactation</span> as a side effect from the drugs.`);
					}
				}
				break;
			case Drug.GROWNIPPLE: {
				let nippleThreshold = ((60 - (V.injectionUpgrade * 15)) / (1 + PC.geneMods.NCS));
				r.push(`You <span class="change positive">directly inject enhancers into your nipples several times a day,</span> keeping them bloated and engorged${PC.geneMods.NCS === 1 ? `; your <span class="ncs">NCS</span> hinders the effect, however` : ""}.`);
				switch (PC.nipples) {
					case NippleShape.INVERTED:
						if (random(1, 100) > nippleThreshold) {
							r.push(`<span class="change positive">Your inverted nipples swell painfully,</span> bulging out of your tits and eventually never fully retracting.`);
							PC.nipples = NippleShape.PARTIAL;
						}
						break;
					case NippleShape.PARTIAL:
						if (random(1, 100) > nippleThreshold) {
							r.push(`<span class="change positive">Your inverted nipples swell painfully,</span> completely bulging out of your tits and staying that way.`);
							PC.nipples = jsEither([NippleShape.CUTE, NippleShape.PUFFY, NippleShape.HUGE]);
						}
						break;
					case NippleShape.TINY:
						if (random(1, 100) > nippleThreshold) {
							r.push(`<span class="change positive">Your nipples swell painfully,</span> becoming larger and cute.`);
							PC.nipples = NippleShape.CUTE;
						}
						break;
					case NippleShape.CUTE:
						if (random(1, 100) > nippleThreshold) {
							r.push(`<span class="change positive">Your nipples swell painfully,</span> becoming larger and puffy.`);
							PC.nipples = NippleShape.PUFFY;
						}
						break;
					case NippleShape.PUFFY:
						if (random(1, 100) > nippleThreshold) {
							r.push(`<span class="change positive">Your nipples swell painfully,</span> becoming spectacularly immense.`);
							PC.nipples = NippleShape.HUGE;
						}
						break;
					case NippleShape.FLAT:
						if (random(1, 100) > nippleThreshold) {
							r.push(`<span class="change positive">Your flat nipples swell painfully,</span> becoming spectacularly immense.`);
							PC.nipples = NippleShape.HUGE;
						}
						break;
					case NippleShape.HUGE:
						r.push(`Your nipples are now so massive that the drugs aren't having much of an effect; <span class="yellow">you see no reason to keep taking them.</span>`);
						PC.drugs = Drug.NONE;
						break;
					default:
						r.push(`They fail to have any lasting effect on your ${PC.nipples} nipples; <span class="noteworthy">you see no reason to keep taking them.</span>`);
						PC.drugs = Drug.NONE;
						break;
				}
				break;
			}
			case Drug.HYPERBUTT:
				growth = 0.5;
				r.push(`You <span class="change positive">directly inject`);
				if (V.injectionUpgrade !== 0) {
					r.push(`advanced`);
				}
				r.push(`hyper growth hormones into your buttocks before bed each night;</span>`);
				dietInfluence = false;
				if (PC.diet === PCDiet.FATTEN) {
					r.push(`all the binging you do fuels growth,`);
					dietInfluence = true;
					growth += 0.2;
				} else if (PC.diet === PCDiet.RESTRICTED) {
					r.push(`how little you eat leaves your body few resources to grow on`);
					dietInfluence = true;
					growth -= 0.2;
				} else if (PC.weight > 130) {
					r.push(`the extra large portions you eat helps support growth`);
					dietInfluence = true;
					growth += 0.2;
				} else if (PC.weight > 30) {
					r.push(`how much you eat helps support growth`);
					dietInfluence = true;
					growth += 0.1;
				} else if (PC.weight <= -30) {
					r.push(`how little you eat impedes growth`);
					dietInfluence = true;
					growth -= 0.1;
				}
				if (dietInfluence) {
					if (PC.health.condition > -20) {
						r.push(`and`);
					} else {
						r.push(`but`);
					}
				}
				if (PC.health.condition > 80) {
					r.push(`your perfect health supports growth extremely well,`);
					growth += 0.5;
				} else if (PC.health.condition > -20) {
					r.push(`your health supports growth,`);
				} else {
					r.push(`your poor health does not support steady growth,`);
					growth -= 0.1;
				}
				if (PC.butt < 10) {
					r.push(`and`);
				} else {
					r.push(`but`);
				}
				if (PC.butt < 6) {
					r.push(`you wake up each morning with a lot of extra weight on your rear.`);
					growth += 1;
				} else if (PC.butt < 8) {
					r.push(`you wake up each morning to find it a little larger than the night before.`);
					growth += 0.8;
				} else if (PC.butt < 10) {
					r.push(`your titanic rear steadily grows.`);
					growth += 0.6;
				} else {
					r.push(`it's hard to track the slow growth of your inhuman rear.`);
					growth += 0.4;
				}
				if (rearLipedemaMod !== 0) {
					growth += 1;
					if (V.geneticMappingUpgrade > 0) {
						r.push(`Your rear lipedema amplifies the drug's effects.`);
					} else {
						r.push(`You're larger than you expected to be after this amount of use.`);
					}
				}
				growth = ncsFightsButtGrowth(PC, growth);
				if (growth > 1 || PC.geneMods.NCS === 1) {
					PC.butt += growth;
				} else {
					PC.butt += 1;
				}
				if (PC.butt >= 20) {
					PC.butt = 20;
				}
				break;
			case "butt enhancers":
				growth = 1 + rearLipedemaMod;
				r.push(`You slap a <span class="change positive">dermal growth hormone patch on each buttock every morning;</span>`);
				if (PC.butt < 2) {
					r.push(`with its limited mass, your small butt greedily absorbs the drugs.`);
					growth += 3;
				} else if (PC.butt < 4) {
					r.push(`at its size, your butt readily absorbs the drugs.`);
					growth += 2;
				} else if (PC.butt < 6) {
					r.push(`at its size, your huge butt slowly absorbs the drugs.`);
					growth++;
				} else if (PC.butt < 8) {
					r.push(`with its mass, and how tiny the patches are becoming by comparison, the drugs have a reduced effect on your enormous butt.`);
					growth += 0.5;
				} else if (PC.butt < 10) {
					r.push(`with its mass, and how tiny the patches are by comparison, it comes as little surprise that your monstrous butt barely grows.`);
				} else {
					r.push(`with its mass, and how minuscule the patches are in comparison, you're left to wonder if your inhuman ass is actually growing or not.`);
					growth--;
				}
				if (rearLipedemaMod !== 0) {
					if (V.geneticMappingUpgrade > 0) {
						r.push(`Your rear lipedema amplifies the drug's effects.`);
					} else {
						r.push(`Your rate of expansion is a little alarming given the drugs are administered by diffusion rather than infusion.`);
					}
				}
				growth *= 0.2;
				growth = ncsFightsButtGrowth(PC, growth);
				PC.butt += Math.clamp(growth, 0.1, 1 + rearLipedemaMod);
				break;
			case Drug.GROWBUTT:
			case Drug.INTENSIVEBUTT:
				growth = 1 + V.injectionUpgrade;
				r.push(`You <span class="change positive">directly inject`);
				if (intensive) {
					r.push(`massive amounts of`);
					growth *= 2;
				}
				if (V.injectionUpgrade !== 0) {
					r.push(`advanced`);
				}
				r.push(`growth hormones into your buttocks before bed each night;</span>`);
				dietInfluence = false;
				if (PC.diet === PCDiet.FATTEN) {
					r.push(`all the binging you do fuels growth,`);
					dietInfluence = true;
					growth += 2;
				} else if (PC.diet === PCDiet.RESTRICTED) {
					r.push(`how little you eat leaves your body few resources to grow on`);
					dietInfluence = true;
					growth -= 2;
				} else if (PC.weight > 130) {
					r.push(`the extra large portions you eat helps support growth`);
					dietInfluence = true;
					growth += 3;
				} else if (PC.weight > 30) {
					r.push(`how much you eat helps support growth`);
					dietInfluence = true;
					growth++;
				} else if (PC.weight <= -30) {
					r.push(`how little you eat impedes growth`);
					dietInfluence = true;
					growth--;
				}
				if (dietInfluence) {
					if (PC.health.condition > -20) {
						r.push(`and`);
					} else {
						r.push(`but`);
					}
				}
				if (PC.health.condition > 80) {
					r.push(`your perfect health supports growth extremely well,`);
					growth++;
				} else if (PC.health.condition > -20) {
					r.push(`your health supports growth,`);
				} else {
					r.push(`your poor health does not support steady growth,`);
					growth--;
				}
				if (PC.butt < 6) {
					r.push(`and`);
				} else {
					r.push(`but`);
				}
				if (PC.butt < 2) {
					r.push(`you wake up each morning to find it a little larger than the night before.`);
					growth += 3;
				} else if (PC.butt < 4) {
					r.push(`your big behind steadily expands.`);
					growth += 2;
				} else if (PC.butt < 6) {
					r.push(`your massive ass slowly and steadily grows.`);
					growth++;
				} else {
					r.push(`it's hard to track the slow growth to your monstrous rear.`);
				}
				if (rearLipedemaMod !== 0) {
					growth += 3;
					if (V.geneticMappingUpgrade > 0) {
						r.push(`Your rear lipedema amplifies the drug's effects.`);
					} else {
						r.push(`You're larger than you expected to be after this amount of use.`);
					}
				}
				growth *= 0.2;
				growth = ncsFightsButtGrowth(PC, growth);
				PC.butt += Math.clamp(growth, 0, 2 + rearLipedemaMod);
				if (PC.geneMods.rapidCellGrowth !== 1) {
					if (intensive) {
						if (PC.anus > 1) {
							r.push(`The reckless drug therapy has the pleasant side effect of rejuvenating your sphincter muscles, <span class="change positive">tightening up your`);
							if (PC.anus > 4) {
								r.push(`gaping`);
							} else if (PC.anus > 3) {
								r.push(`loose`);
							} else {
								r.push(`relaxed`);
							}
							r.push(`anus.</span>`);
							PC.anus--;
						}
					} else {
						if (PC.anus > 2) {
							r.push(`The drug therapy has the pleasant side effect of rejuvenating your sphincter muscles, <span class="change positive">tightening up your`);
							if (PC.anus > 4) {
								r.push(`gaping`);
							} else {
								r.push(`loose`);
							}
							r.push(`anus.</span>`);
							PC.anus--;
						}
					}
				}
				break;
			case "lip enhancers":
				r.push(`You apply a series of <span class="change positive">dermal growth hormone patches along your lips before bed,</span> resulting in slow, but steady, growth.`);
				if (PC.geneMods.NCS === 1) {
					PC.lips += 1;
				} else {
					PC.lips += 2;
				}
				if (PC.lips > 90 && oldLips <= 90) {
					r.push(`They've become so engorged that they resemble a puffy pussy. While they may be good for oral sex, <span class="change negative">they are bad for anything not involving fellatio.</span>`);
				} else if (PC.lips > 70 && oldLips <= 70) {
					r.push(`They've swollen so large now that <span class="change negative">it has become difficult to properly enunciate words</span> through them.`);
				}
				break;
			case Drug.GROWLIP:
				if (PC.lips <= 95) {
					r.push(`You <span class="change positive">directly inject`);
					if (V.injectionUpgrade !== 0) {
						r.push(`advanced`);
					}
					r.push(`growth agents into your lips before bed each night;</span> they swell rapidly,`);
					if (PC.lips > 90) {
						r.push(`becoming a facepussy useless for anything other than oral sex. <span class="change negative"> That includes talking and being taken serious in business.</span>`);
					} else if (PC.lips > 70 && PC.lips <= 75) {
						r.push(`and are now so large that it has <span class="change negative">become difficult to properly enunciate words.</span>`);
					} else {
						r.push(`with their progress easily trackable with each passing day.`);
					}
					if (PC.geneMods.NCS === 1) {
						PC.lips += 2;
					} else {
						PC.lips += 5;
					}
				}
				break;
			case Drug.GROWTHSTIM:
				growth = 1;
				r.push(`You <span class="change positive">directly inject yourself with growth stimulants</span> several times a day in an effort to increase your height.`);
				// genetic quirks
				if (PC.geneticQuirks.dwarfism === 2 && PC.geneticQuirks.gigantism === 2) {
					growth += (0.1 * random(-5, 5));
					if (V.geneticMappingUpgrade > 0) {
						r.push(`Your combination of genetic factors for gigantism and dwarfism causes the effectiveness of the treatment to fluctuate erratically.`);
					}
				} else if (PC.geneticQuirks.dwarfism === 2) {
					growth -= 0.5;
					if (V.geneticMappingUpgrade > 0) {
						r.push(`Your dwarfism significantly limits the effectiveness of the treatment.`);
					}
				} else if (PC.geneticQuirks.gigantism === 2) {
					growth += 0.5;
					if (V.geneticMappingUpgrade > 0) {
						r.push(`Your gigantism improves the effectiveness of the treatment.`);
					}
				}
				// hormones
				if (PC.hormones === 1 || PC.hormones === -1) {
					r.push(`The hormones you are on disrupt the drug's effectiveness.`);
					growth -= 0.2;
				}
				// hormone balance
				if (PC.hormoneBalance <= -50) {
					growth += 0.5;
				} else if (PC.hormoneBalance <= -25) {
					growth += 0.2;
				} else if (PC.hormoneBalance < 50) {
					growth -= 0.2;
				} else {
					growth -= 0.5;
				}
				// diet
				if (PC.diet === PCDiet.FATTEN) {
					r.push(`All the binging you do fuels growth.`);
					growth += 0.2;
				} else if (PC.diet === PCDiet.RESTRICTED) {
					r.push(`How little you eat leaves your body few resources to grow on.`);
					growth--;
				} else if (PC.diet === PCDiet.FERTILITY) {
					r.push(`The fertility enhancing hormones in your food slightly disrupts your growth.`);
					growth -= 0.1;
				} else if (PC.diet === PCDiet.MALE || PC.diet === PCDiet.FEMALE || PC.diet === PCDiet.FUTA) {
					r.push(`The fertility hormones in your food inhibits growth.`);
					growth -= 0.5;
				} else if (PC.diet === PCDiet.CLEANSE) {
					r.push(`Your growth is severely inhibited by your diet.`);
					growth--;
				} else if (PC.diet === PCDiet.MUSCLE || PC.diet === PCDiet.SLIM || PC.muscles >= 96) {
					r.push(`Your rigorous exercise regime helps support growth.`);
					growth += 0.5;
				}
				// health
				if (PC.health.condition > 80) {
					r.push(`Your perfect health greatly supports growth.`);
					growth += 0.2;
				} else if (PC.health.condition > -20) {
					r.push(`Your health supports your growth.`);
				} else {
					r.push(`Your health hinders growth.`);
					growth--;
				}
				// if growth was accomplished
				if (growth > 0) {
					// age modifier
					let ageMod = 1;
					const pubertyLength = 5;
					const maxGrowthAge = 24;

					if (PC.geneMods.NCS === 1) {
						r.push(`Your <span class="ncs">NCS</span> harshly inhibits your body's response to the treatment.`);
						ageMod = 0.25;
					} else if (PC.genes === GenderGenes.MALE) {
						if (PC.pubertyXY === 0 && PC.physicalAge <= 13) {
							r.push(`Your young body eagerly responds to the stimulants.`);
							ageMod = 1.5;
						} else if (PC.physicalAge <= (PC.pubertyAgeXY + pubertyLength)) {
							r.push(`Since you're going through the aftermath of puberty, your body welcomes the treatment with open arms.`);
							ageMod = 2;
						} else if (PC.physicalAge <= maxGrowthAge) {
							r.push(`With puberty over, your body resists the stimulants.`);
							ageMod = 1;
						} else {
							r.push(`Your mature body struggles to respond to the treatment, making progress difficult.`);
							ageMod = 0.5;
						}
					} else if (PC.genes === GenderGenes.FEMALE) {
						if (PC.pubertyXX === 0 && PC.physicalAge <= 13) {
							r.push(`Your young body eagerly responds to the stimulants.`);
							ageMod = 1.5;
						} else if (PC.physicalAge <= (PC.pubertyAgeXX + pubertyLength)) {
							r.push(`Since you're going through the aftermath of puberty, your body welcomes the treatment with open arms.`);
							ageMod = 2;
						} else if (PC.physicalAge <= maxGrowthAge) {
							r.push(`With puberty over, your body resists the stimulants.`);
							ageMod = 1;
						} else {
							r.push(`Your mature body struggles to respond to the treatment, making progress difficult.`);
							ageMod = 0.5;
						}
					}
					// evaluate against expected height, with neoteny comparing against expected height for 12 year olds...
					let heightDiff;
					if (PC.geneticQuirks.neoteny === 2 && PC.physicalAge > 12) {
						heightDiff = (PC.height - PC.heightImplant * 10) / Height.forAge(PC.natural.height, 12, PC.genes);
					} else {
						heightDiff = (PC.height - PC.heightImplant * 10) / Height.forAge(PC.natural.height, PC);
					}
					// if you are taller than the expected height the growth is reduced, if shorter accelerated proportionally to the distance from the expected height
					heightDiff = 1 - heightDiff;
					// ...and calculates final value
					growth = (growth + growth * heightDiff) * ageMod;
					if (PC.geneMods.NCS === 0) {
						growth = Math.round(Math.clamp(growth, 0, 5));
					} else {
						growth = Math.round(Math.clamp(growth, 0, 2));
					}
					// communicates the amount of growth
					if (growth < 1) { // in case heightDiff manages to bring growth down enough
						r.push(`Despite the treatment, you didn't grow at all.`);
					} else if (growth === 1) {
						r.push(`<span class="change positive">Overall, you got a little taller over the week.</span>`);
					} else if (growth === 2) {
						r.push(`<span class="change positive">Overall, you got taller over the week.</span>`);
					} else if (growth === 3) {
						r.push(`<span class="change positive">Overall, you grew a lot over the week.</span>`);
					} else if (growth === 4) {
						r.push(`<span class="change positive">Shockingly, you grew dramatically over the week.</span>`);
					} else if (growth === 5) {
						r.push(`<span class="change positive">You experience explosive growth over the week,</span> growth so extreme that your cardiovascular system struggled to keep up, <span class="health dec">severely damaging your health.</span>`);
						healthDamage(PC, 20);
					}
					// health issues
					if (random(1, 10) === 1 && growth.isBetween(1, 4)) {
						r.push(`You grew faster than your body could keep up with, even; <span class="health dec">a rather painful endeavor.</span>`);
						healthDamage(PC, 10);
					}
					if (PC.physicalAge > maxGrowthAge) {
						if (random(1, 6) === 1) {
							r.push(`Since you've already concluded your natural growth phase, the treatment <span class="health dec">weakens you considerably.</span>`);
							healthDamage(PC, 15);
						}
					}
					// update height
					PC.height += growth;
				} else {
					// if growth is zero or negative
					r.push(`Despite the treatment, you don't get any taller.`);
				}
				break;
			case Drug.HORMONEMALE:
				if (PC.pubertyXY === 1) {
					r.push(`Your orgasms are now very different from last week, in scent and volume, so it would appear the hormone injections have rendered you potent. <span class="noteworthy">You stop using them.</span>`);
					PC.drugs = Drug.NONE;
				} else {
					r.push(`You <span class="change positive">frequently inject yourself with concentrated male hormones</span> several times a day in an effort to spur puberty. The intense surge of hormones leaves you <span class="health dec">ill and weak</span> as your body struggles to adapt to the overwhelming chemicals flooding its system.`);
					PC.chem += 20;
					healthDamage(PC, 10);
					if (PC.energy > 5) {
						PC.energy -= 5;
					}
				}
				break;
			case Drug.HORMONEFEMALE:
				if (PC.pubertyXX === 1) {
					r.push(`Since you've had your first period, you no longer have need for the hormone injections. <span class="noteworthy">You stop using them.</span>`);
					PC.drugs = Drug.NONE;
				} else {
					r.push(`You <span class="change positive">frequently inject yourself with concentrated female hormones</span> several times a day in an effort to spur puberty. The intense surge of hormones leaves you <span class="health dec">ill and weak</span> as your body struggles to adapt to the overwhelming chemicals flooding its system.`);
					PC.chem += 20;
					healthDamage(PC, 10);
					if (PC.energy > 5) {
						PC.energy -= 5;
					}
					galactorrheaTriggerCheck();
				}
				break;
			case Drug.HYPERPENIS:
				r.push(`You directly inject`);
				if (V.injectionUpgrade !== 0) {
					r.push(`advanced`);
				}
				r.push(`hyper growth hormones into your ${PC.dick > 0 ? "dick" : "clit"} before bed each night; a really unpleasant experience.`);
				if (PC.dick > 0) {
					if (PC.geneMods.NCS === 0) {
						r.push(`<span class="change positive">Your cock grows painfully,</span> becoming both longer and girthier.`);
						PC.dick += 1;
						if (PC.balls === 1 && PC.scrotum > 0) {
							r.push(`As a side effect of the dick enhancement drugs, <span class="change positive">your balls drop.</span>`);
							PC.balls += 1;
						}
					} else if (random(1, (20 - PC.dick + V.injectionUpgrade)) > 12) {
						r.push(`<span class="change positive">Your cock grows painfully,</span> becoming both longer and girthier, despite your <span class="ncs">NCS.</span>`);
						PC.dick += 1;
					} else {
						r.push(`Your <span class="ncs">NCS</span> manages to prevent any substantial growth this session.`);
					}
				} else {
					if (PC.geneMods.NCS === 0 && PC.vagina >= 0) {
						r.push(`<span class="change positive">Your clit grows painfully,</span> becoming both longer and girthier.`);
						PC.clit += 1;
					} else if (random(1, (16 - PC.clit + V.injectionUpgrade)) > 10 && PC.vagina >= 0) {
						r.push(`<span class="change positive">Your clit grows painfully,</span> becoming both longer and girthier, despite your <span class="ncs">NCS.</span>`);
						PC.clit += 1;
					} else {
						r.push(`Your <span class="ncs">NCS</span> manages to prevent any substantial growth this session.`);
					}
				}
				break;
			case "penis enlargers":
				noGrowth = true;
				growth = 60;
				if (PC.geneMods.NCS === 1) {
					growth += 30;
				}
				r.push(`You slap a dermal growth hormone patch on your ${PC.dick > 0 ? "penis" : "pubic mound"} each morning;`);
				if (PC.dick > 0) {
					if (PC.dick < 2) {
						r.push(`with how small you are, your tiny dick greedily absorbs the drugs.`);
						if (random(1, 120) > growth) {
							noGrowth = false;
						}
					} else if (PC.dick < 4) {
						r.push(`at its size, your dick readily absorbs the drugs.`);
						if (random(1, 110) > growth) {
							noGrowth = false;
						}
					} else if (PC.dick < 6) {
						r.push(`at its size, your big dick slowly absorbs the drugs.`);
						if (random(1, 100) > growth) {
							noGrowth = false;
						}
					} else if (PC.dick < 8) {
						r.push(`with its size compared to the patch, it comes as little surprise that the drugs are beginning to have a reduced effect on your huge dick.`);
						if (random(1, 80) > growth) {
							noGrowth = false;
						}
					} else if (PC.dick <= 10) {
						r.push(`with its mass, and how tiny the patches are by comparison, it comes as little surprise that the drugs are beginning to have a severely reduced effect on your massive dick.`);
						if (random(1, 70) > growth) {
							noGrowth = false;
						}
					} else {
						r.push(`with its mass, and how minuscule the patches are in comparison, you're left to wonder if a dick of your size is even capable of absorbing enough of the drugs to continue expanding.`);
						if (random(1, 61) > growth) {
							noGrowth = false;
						}
					}
					if (noGrowth) {
						r.push(`You didn't grow much at all this week.`);
					} else {
						r.push(`<span class="change positive">You grew considerably over the week,</span> and are now sporting an obviously larger cock.`);
						PC.dick++;
					}
					if (PC.dick === 6) {
						if (PC.balls > 0 && canAchieveErection(PC)) {
							r.push(`<span class="noteworthy">You're starting to have trouble getting and staying fully erect.</span> Your cardiovascular system is at the limit of what it can handle and any more growth may result in erectile dysfunction.`);
						}
					}
				} else if (PC.vagina >= 0) {
					if (random(1, 100) > growth - (PC.clit * 10)) {
						r.push(`<span class="change positive">Your clit steadily swells,</span> becoming both longer and girthier.`);
						PC.clit++;
					} else {
						r.push(`Despite the treatment, your clit growth was negligible.`);
					}
					if (PC.vagina >= 0 && PC.labia < 3 && random(1, 100) > growth + (PC.labia * 12)) {
						r.push(`Some of the drugs find their way to your labia, giving you a bit of a surprise when you discover <span class="change positive">your pussylips are larger.</span>`);
					}
				}
				break;
			case Drug.GROWPENIS:
			case Drug.INTENSIVEPENIS:
				growth = 60 - (V.injectionUpgrade * 10);
				if (PC.geneMods.NCS === 1) {
					growth += 30;
				}
				r.push(`You directly inject`);
				if (intensive) {
					r.push(`massive amounts of`);
					growth -= 20;
				}
				if (V.injectionUpgrade !== 0) {
					r.push(`advanced`);
				}
				r.push(`growth hormones into your ${PC.dick > 0 ? "dick" : "clit"} before bed each night; a really unpleasant experience.`);
				if (PC.dick > 0) {
					if (random(1, 100) > growth + (PC.dick * 5)) {
						r.push(`<span class="change positive">Your cock grows painfully,</span> becoming both longer and girthier.`);
						PC.dick++;
					} else {
						r.push(`Despite the treatment, your dick growth was negligible.`);
					}
					if (PC.balls === 1 && PC.scrotum > 0) {
						r.push(`As a side effect of the dick enhancement drugs, <span class="change positive">your balls drop.</span>`);
						PC.balls += 1;
					}
					if (PC.dick === 6) {
						if (PC.balls > 0 && canAchieveErection(PC)) {
							r.push(`<span class="noteworthy">Your dick is having trouble getting and staying fully hard.</span> Your cardiovascular system is at the limit of what it can bring erect, any more and you might lose the ability to naturally get hard altogether.`);
						}
					}
				} else if (PC.vagina >= 0) {
					if (random(1, 100) > growth - (PC.clit * 10)) {
						r.push(`<span class="change positive">Your clit grows painfully,</span> becoming both longer and girthier.`);
						PC.clit++;
					} else {
						r.push(`Despite the treatment, your clit growth was negligible.`);
					}
				}
				break;
			case Drug.HYPERTESTICLE:
				r.push(`You directly inject`);
				if (V.injectionUpgrade !== 0) {
					r.push(`advanced`);
				}
				r.push(`hyper growth hormones into your testicles before bed each night; a rather unpleasant experience.`);
				if (PC.geneMods.NCS === 0) {
					r.push(`<span class="change positive">Your balls bloat painfully</span> as your body enters a state of cum overproduction.`);
					PC.balls += 2;
				} else if (random(1, 400 - PC.balls + (V.injectionUpgrade * 10)) > 200) {
					r.push(`<span class="change positive">Your balls swell painfully</span> as your body enters a state of cum overproduction despite your <span class="ncs">NCS.</span>`);
					PC.balls += 1;
				} else {
					r.push(`Your <span class="ncs">NCS</span> manages to prevent any substantial growth this session, though your cum production is in overdrive.`);
				}
				break;
			case "testicle enlargers":
				noGrowth = true;
				growth = 60;
				if (PC.geneMods.NCS === 1) {
					growth += 30;
				}
				r.push(`You slap a <span class="change positive">dermal growth hormone patch on each testicle every morning;</span>`);
				if (PC.balls < 2) {
					r.push(`with how small your sack is, your tiny balls greedily absorb the drugs.`);
					if (random(1, 120) > growth) {
						noGrowth = false;
					}
				} else if (PC.balls < 4) {
					r.push(`at your sack's size, your balls readily absorb the drugs.`);
					if (random(1, 110) > growth) {
						noGrowth = false;
					}
				} else if (PC.balls < 6) {
					r.push(`at your sack's size, your big balls slowly absorb the drugs.`);
					if (random(1, 100) > growth) {
						noGrowth = false;
					}
				} else if (PC.balls < 10) {
					r.push(`with your sack's size compared to the patches, it comes as little surprise that the drugs are beginning to have a reduced effect on your massive balls.`);
					if (random(1, 80) > growth) {
						noGrowth = false;
					}
				} else if (PC.balls < 30) {
					r.push(`with your sack's size, and how tiny the patches are by comparison, it comes as little surprise that the drugs are beginning to have a severely reduced effect on your enormous balls.`);
					if (random(1, 70) > growth) {
						noGrowth = false;
					}
				} else {
					r.push(`with your sack's size, and how minuscule the patches are in comparison, you're left to wonder if balls of your size are even capable of absorbing enough of the drugs each to continue expanding.`);
					if (random(1, 61) > growth) {
						noGrowth = false;
					}
				}
				if (noGrowth) {
					r.push(`You didn't see much expansion this week.`);
				} else {
					r.push(`<span class="change positive">Your balls engorged considerably over the week,</span> and you are now sporting an obviously swollen scrotum.`);
					PC.balls++;
				}
				break;
			case Drug.GROWTESTICLE:
			case Drug.INTENSIVETESTICLE:
				growth = 60 - (V.injectionUpgrade * 10);
				if (PC.geneMods.NCS === 1) {
					growth += 30;
				}
				r.push(`You directly inject`);
				if (intensive) {
					r.push(`massive amounts of`);
					growth -= 20;
				}
				if (V.injectionUpgrade !== 0) {
					r.push(`advanced`);
				}
				r.push(`growth hormones into your testicles before bed each night; a rather unpleasant experience.`);
				if (PC.balls < 10) {
					if (random(1, 100) > growth + (PC.balls * 5)) {
						r.push(`<span class="change positive">Your balls swell painfully</span> as they overproduce cum.`);
						PC.balls++;
					} else {
						r.push(`Despite being filled with testicle enhancers and painfully swollen with resultant cum overproduction, your balls do not grow.`);
					}
				}
				break;
			case Drug.STEROID:
				r.push(`You routinely inject yourself with steroids to better your gains.`);
				if (PC.geneMods.NCS === 0 || random(1, 100) > 50) {
					if (PC.dick === 0 && random(1, 100) > 40 + (PC.clit * 10) && PC.vagina >= 0) {
						r.push(`All the testosterone in your gear <span class="change positive">causes your clit to grow.</span>`);
						PC.clit++;
					} else if (PC.dick !== 0 && PC.dick < 3 && random(1, 100) > 95) {
						r.push(`All the testosterone in your gear <span class="change positive">causes your dick to become a little more manly.</span>`);
						PC.dick++;
					} else if (PC.faceShape !== FaceShape.MASC && PC.faceShape !== FaceShape.ANDRO && random(1, 100) > 95) {
						r.push(`All the testosterone in your gear <span class="orange">hardens your face into androgyny.</span>`);
						PC.faceShape = FaceShape.ANDRO;
					} else if (PC.balls === 1 && PC.scrotum !== 0 && random(1, 100) > 95) {
						r.push(`All the testosterone in your gear <span class="change positive">causes your balls to drop.</span>`);
						PC.balls++;
					} else if (PC.faceShape !== FaceShape.MASC && random(1, 100) > 95) {
						r.push(`All the testosterone in your gear <span class="orange">masculinizes your face.</span>`);
						PC.faceShape = FaceShape.MASC;
					} else if ( PC.balls > 2 && PC.scrotum !== 0 && random(1, 100) > 95) {
						r.push(`All the testosterone in your gear <span class="change negative">causes your balls to atrophy,</span> as they no longer need to produce it themselves.`);
						PC.balls--;
					} else if (random(1, 100) > 110 - (PC.anus * 10) && PC.geneMods.rapidCellGrowth !== 1) {
						r.push(`The steroids you're on have an effect on your stretched anal muscles, <span class="change positive">tightening your butthole up.</span>`);
						PC.anus--;
					} else if (random(1, 100) > 110 - (PC.vagina * 10) && PC.geneMods.rapidCellGrowth !== 1) {
						r.push(`The steroids you're on have an effect on your vaginal muscles, <span class="change positive">leaving your pussy slightly tighter.</span>`);
						PC.vagina--;
					}
				}
				break;
			case Drug.ANTIAGE:
				r.push(`The skin creams <span class="change positive">soothe your aging skin</span> leaving you with a more youthful glow.`);
				PC.visualAge -= 1;
				break;
			case Drug.SUPERFERTILITY:
				r.push(`You take a dose of super fertility pills with each of your meals.`);
				if (PC.pregKnown === 1) {
					if (PC.geneticQuirks.superfetation === 2 && (V.geneticMappingUpgrade !== 0 || PC.preg > 10 || PC.counter.birthsTotal > 0)) {
						r.push(`You're already pregnant, but with superfetation in play, you're on track for an exceedingly full womb.`);
					} else {
						r.push(`<span class="noteworthy">You're already pregnant, so the fertility drugs don't really have any effect.</span>`);
					}
				} else if (PC.pregWeek < 0) {
					r.push(`Your body is still recovering from your last pregnancy, so they aren't accomplishing much.`);
				} else if (PC.preg > 1) {
					r.push(`You really don't feel any different, which is odd given the strength of the drugs. Turns out <span class="pregnancy">you're already knocked up.</span>`);
					PC.pregKnown = 1;
				} else if (PC.ovaries === 0 && PC.mpreg === 0) {
					r.push(`You lack the parts that would actually allow you to get pregnant, so they aren't accomplishing much.`);
				} else if (PC.preg < -1) {
					r.push(`You're sterile, so they aren't accomplishing much.`);
				} else if (PC.ovaries === 0 && PC.mpreg !== 1) {
					r.push(`You're barren, so they aren't accomplishing much.`);
				} else if (PC.pubertyXX === 0 && (PC.ovaries === 1 || PC.mpreg === 1)) {
					r.push(`However, you haven't actually gone through puberty yet, so they aren't accomplishing much.`);
				} else if (PC.preg === -1) {
					r.push(`You're also taking contraceptives, so they aren't accomplishing much.`);
				} else {
					r.push(`It feels as if your ovaries are bursting with fertile eggs; if you were to have sex in this state, which your body craves incessantly, there is no doubt in your mind that you would end up very, very pregnant.`);
				}
				if (PC.geneMods.NCS === 0) {
					if (PC.lactation === 0 && random(0, 50) < PC.health.condition) {
						r.push(`One of the side effects is clearly <span class="change positive">spontaneous lactation,</span> given your now swollen, milk-laden tits.`);
						PC.lactation = 1;
						PC.lactationDuration = 1;
					}
				}
				galactorrheaTriggerCheck();
				if (PC.energy < 85 && random(0, 10) < PC.health.condition) {
					r.push(`You are frequently beset by intrusive thoughts <span class="libido inc">centered around being fucked raw.</span>`);
					PC.energy += 2;
				}
				break;
			case Drug.FERTILITY:
				r.push(`You take a dose of fertility pills with each of your meals.`);
				if (PC.pregKnown === 1) {
					if (PC.geneticQuirks.superfetation === 2 && (V.geneticMappingUpgrade !== 0 || PC.preg > 10 || PC.counter.birthsTotal > 0)) {
						r.push(`You're already pregnant, but with superfetation in play, the drugs will aid in getting even more so.`);
					} else {
						r.push(`<span class="noteworthy">You're already pregnant, so the fertility drugs don't really have any effect.</span>`);
					}
				} else if (PC.pregWeek < 0) {
					r.push(`Your body is still recovering from your last pregnancy, so they aren't accomplishing much.`);
				} else if (PC.preg > 1) {
					r.push(`You don't really feel any different, and after a few cursory tests, discover that <span class="pregnancy">you're already knocked up.</span>`);
					PC.pregKnown = 1;
				} else if (PC.ovaries === 0 && PC.mpreg === 0) {
					r.push(`You lack the parts that would actually allow you to get pregnant, so they aren't accomplishing much.`);
				} else if (PC.preg < -1) {
					r.push(`You're sterile, so they aren't accomplishing much.`);
				} else if (PC.ovaries === 0 && PC.mpreg !== 1) {
					r.push(`You're barren, so they aren't accomplishing much.`);
				} else if (PC.pubertyXX === 0 && (PC.ovaries === 1 || PC.mpreg === 1)) {
					r.push(`However, you haven't actually gone through puberty yet, so they aren't accomplishing much.`);
				} else if (PC.preg === -1) {
					r.push(`You're also taking contraceptives, so they aren't accomplishing much.`);
				} else {
					r.push(`You feel sexier and more confident; a winning combination when it comes to getting yourself knocked up, and very likely to happen if you play things risky.`);
				}
				if (PC.geneMods.NCS === 0) {
					if (PC.lactation === 0 && random(0, 100) < PC.health.condition) {
						r.push(`One of the side effects is clearly <span class="change positive">spontaneous lactation,</span> given your now swollen, milk-laden tits.`);
						PC.lactation = 1;
						PC.lactationDuration = 1;
					}
				}
				galactorrheaTriggerCheck();
				break;
			case "fertility supplements":
				r.push(`You take a fertility supplement with each of your meals.`);
				if (PC.pregKnown === 1) {
					if (PC.geneticQuirks.superfetation === 2 && (V.geneticMappingUpgrade !== 0 || PC.preg > 10 || PC.counter.birthsTotal > 0)) {
						r.push(`You're already pregnant, but with superfetation in play, the drugs will help a little in getting even more so.`);
					} else {
						r.push(`<span class="noteworthy">You're already pregnant, so the drugs don't really have any effect.</span>`);
					}
				} else if (PC.pregWeek < 0) {
					r.push(`Your body is still recovering from your last pregnancy, so they aren't accomplishing much.`);
				} else if (PC.preg > 1) {
					r.push(`You feel a little ill after taking the pills, and a bit of testing leads to the discovery that <span class="pregnancy">you're already knocked up.</span>`);
					PC.pregKnown = 1;
				} else if (PC.ovaries === 0 && PC.mpreg === 0) {
					r.push(`You lack the parts that would actually allow you to get pregnant, so they aren't accomplishing much.`);
				} else if (PC.preg < -1) {
					r.push(`You're sterile, so they aren't accomplishing much.`);
				} else if (PC.ovaries === 0 && PC.mpreg !== 1) {
					r.push(`You're barren, so they aren't accomplishing much.`);
				} else if (PC.pubertyXX === 0 && (PC.ovaries === 1 || PC.mpreg === 1)) {
					r.push(`However, you haven't actually gone through puberty yet, so they aren't accomplishing much.`);
				} else if (PC.preg === -1) {
					r.push(`You're also taking contraceptives, so they aren't accomplishing much.`);
				} else {
					r.push(`The carton advises that it won't actually boost conception rates, but rather give more chances to get pregnant. Twinning is fairly common though, according to other consumers.`);
				}
				galactorrheaTriggerCheck();
				break;
			case Drug.APPETITESUPP:
				r.push(`You take an appetite suppressant before each meal in an effort to eat less and lose weight.`);
				switch (PC.diet) {
					case PCDiet.RESTRICTED:
						r.push(`In conjunction with your restrictive diet, you do so spectacularly, <span class="change positive">losing far more</span> than you ever could normally.`);
						PC.weight -= 5;
						break;
					case PCDiet.FATTEN:
						r.push(`Which makes little sense since you're trying to gain weight, so <span class="noteworthy">you stop taking them.</span>`);
						PC.drugs = Drug.NONE;
						break;
					default:
						r.push(`It works exactly as you would expect, gradually <span class="change positive">slimming</span> you down from your reduced portion sizes.`);
						PC.weight -= 2;
						break;
				}
				break;
			case "penis reducers":
				r.push(`You apply a small dermal hormone patch to your ${PC.dick > 0 ? "penis" : PC.vagina >= 0 ? "clit" : "crotch"} before bed each night;`);
				if (PC.dick > 1) {
					if (random(1, 100) <= PC.dick * 10) {
						r.push(`it defintely <span class="change positive">seems a little smaller.</span>`);
						PC.dick -= 1;
					} else {
						r.push(`you can't say it seems any smaller.`);
					}
				} else {
					if (random(1, 100) <= PC.clit * 20 && PC.clit > 0) {
						r.push(`it defintely <span class="change positive">seems a little smaller.</span>`);
						PC.clit -= 1;
					} else {
						r.push(`you can't say it seems any smaller.`);
					}
				}
				PC.hormoneBalance++;
				break;
			case Drug.ATROPHYPENIS:
				r.push(`You directly inject`);
				if (V.injectionUpgrade !== 0) {
					r.push(`enhanced`);
				}
				r.push(`atrophiers into your dick before bed each night; a really unpleasant experience. Your body sets to work pulling resources from`);
				if (PC.geneMods.NCS === 1) {
					r.push(`it, amplified by your <span class="ncs">NCS.</span>`);
				} else {
					r.push(`it.`);
				}
				shrinkage = 0;
				if (PC.dick >= 20) {
					r.push(`Your enormous <span class="change positive">cock shrinks dully,</span> rapidly losing mass.`);
					shrinkage = 3;
				} else if (PC.dick >= 10) {
					r.push(`Your massive <span class="change positive">cock shrinks dully,</span> becoming noticeably shorter and thinner.`);
					shrinkage = 2;
				} else if ((PC.geneMods.NCS === 1) || (random(1, 100) > 40 - (V.injectionUpgrade * 10) - (PC.dick * 5) && PC.dick > 1)) {
					r.push(`Your <span class="change positive">cock shrinks dully,</span> becoming shorter and thinner.`);
					shrinkage = 1;
				}
				if (PC.geneMods.NCS === 1 && PC.dick > 2) {
					shrinkage *= 2;
				}
				PC.dick -= shrinkage;
				break;
			case "testicle reducers":
				r.push(`You apply a small dermal hormone patch to your testicles before bed each night;`);
				if (random(1, 100) <= PC.balls * 10) {
					r.push(`they're defintely <span class="change positive">getting a little smaller.</span>`);
					PC.balls -= 1;
				} else {
					r.push(`you can't say they seem to be getting any smaller.`);
				}
				PC.hormoneBalance++;
				break;
			case Drug.ATROPHYTESTICLE:
				r.push(`You directly inject`);
				if (V.injectionUpgrade !== 0) {
					r.push(`enhanced`);
				}
				r.push(`atrophiers into your testicles before bed each night; a rather unpleasant experience. Your body sets to work pulling resources from`);
				if (PC.geneMods.NCS === 1) {
					r.push(`them, amplified by your <span class="ncs">NCS.</span>`);
				} else {
					r.push(`them.`);
				}
				shrinkage = 0;
				if (PC.balls >= 100) {
					r.push(`Your enormous <span class="change positive">balls shrink dully,</span> rapidly losing mass inside your scrotum.`);
					shrinkage = 5;
				} else if (PC.balls >= 80) {
					r.push(`Your enormous <span class="change positive">balls shrink dully,</span> rapidly losing mass inside your scrotum.`);
					shrinkage = 4;
				} else if (PC.balls >= 60) {
					r.push(`Your enormous <span class="change positive">balls shrink dully,</span> rapidly losing mass inside your scrotum.`);
					shrinkage = 3;
				} else if (PC.balls >= 40) {
					r.push(`Your enormous <span class="change positive">balls shrink dully,</span> losing mass inside your scrotum.`);
					shrinkage = 2;
				} else if (PC.balls >= 20) {
					r.push(`Your enormous <span class="change positive">balls shrink dully,</span> losing mass inside your scrotum.`);
					shrinkage = 1;
				} else if ((PC.geneMods.NCS === 1) || (random(1, 100) > 40 - (V.injectionUpgrade * 10) - (PC.balls * 2) && PC.balls > 1)) {
					r.push(`Your <span class="change positive">balls shrink dully,</span> becoming smaller and filling out your scrotum less.`);
					shrinkage = 1;
				}
				if (PC.geneMods.NCS === 1 && PC.balls > 2) {
					shrinkage *= 2;
				}
				PC.balls -= shrinkage;
				break;
			case Drug.ATROPHYCLIT:
				r.push(`You directly inject`);
				if (V.injectionUpgrade !== 0) {
					r.push(`enhanced`);
				}
				r.push(`atrophiers into your clitoris before bed each night; a really unpleasant experience. Your body sets to work pulling resources from`);
				if (PC.geneMods.NCS === 1) {
					r.push(`it, amplified by your <span class="ncs">NCS.</span>`);
				} else {
					r.push(`it.`);
				}
				if ((PC.geneMods.NCS === 1) || (random(1, 100) > 60 - (V.injectionUpgrade * 10) - (PC.clit * 5) && PC.clit > 0)) {
					r.push(`Your <span class="change positive">clit shrinks dully,</span> becoming smaller`);
					PC.clit -= 1;
				}
				if (PC.geneMods.NCS === 1 && PC.clit > 2) {
					PC.clit -= 1;
				}
				break;
			case Drug.ATROPHYLABIA:
				r.push(`You directly inject`);
				if (V.injectionUpgrade !== 0) {
					r.push(`enhanced`);
				}
				r.push(`atrophiers into your labia majora before bed each night. Your body sets to work pulling resources from`);
				if (PC.geneMods.NCS === 1) {
					r.push(`them, amplified by your <span class="ncs">NCS.</span>`);
				} else {
					r.push(`them.`);
				}
				if ((PC.geneMods.NCS === 1) || (random(1, 100) > 60 - (V.injectionUpgrade * 10) - (PC.labia * 5) && PC.labia > 0)) {
					r.push(`Your <span class="change positive">labia shrink dully,</span> becoming smaller`);
					PC.labia -= 1;
				}
				if (PC.geneMods.NCS === 1 && PC.labia > 2) {
					PC.labia -= 1;
				}
				break;
			case Drug.ATROPHYNIPPLE:
				r.push(`You directly inject`);
				if (V.injectionUpgrade !== 0) {
					r.push(`enhanced`);
				}
				r.push(`atrophiers into your nipples before bed each night. Your body sets to work pulling resources from`);
				if (PC.geneMods.NCS === 1) {
					r.push(`them, amplified by your <span class="ncs">NCS.</span>`);
				} else {
					r.push(`them.`);
				}
				switch (PC.nipples) {
					case NippleShape.HUGE:
						if ((PC.geneMods.NCS === 1) || (random(1, 100) > 60 - (V.injectionUpgrade * 15))) {
							r.push(`<span class="change positive">Your nipples shrink dully,</span> becoming smaller, yet still remaining puffy swells.`);
							PC.nipples = NippleShape.PUFFY;
						}
						break;
					case NippleShape.PUFFY:
						if ((PC.geneMods.NCS === 1) || (random(1, 100) > 60 - (V.injectionUpgrade * 15))) {
							r.push(`<span class="change positive">Your nipples shrink dully,</span> becoming small and cute.`);
							PC.nipples = NippleShape.CUTE;
						}
						break;
					case NippleShape.CUTE:
						if ((PC.geneMods.NCS === 1) || (random(1, 100) > 60 - (V.injectionUpgrade * 15))) {
							r.push(`<span class="change positive">Your nipples shrink dully,</span> becoming positively tiny.`);
							PC.nipples = NippleShape.TINY;
						}
						break;
					default:
						r.push(`Your nipples are now so small that further sessions will fail to shrink them further; <span class="noteworthy">you stop taking them.</span>`);
						PC.drugs = Drug.NONE;
						break;
				}
				break;
			case "lip reducers":
				r.push(`You apply a small <span class="change positive">dermal reduction patch to your lips</span> before bed each night; the process is slow, but consistent.`);
				PC.lips -= 1;
				break;
			case Drug.ATROPHYLIP:
				r.push(`You directly inject`);
				if (V.injectionUpgrade !== 0) {
					r.push(`enhanced`);
				}
				r.push(`atrophiers into your lips before bed each night. Your body sets to work pulling resources from`);
				if (PC.geneMods.NCS === 1) {
					r.push(`them, amplified by your <span class="ncs">NCS.</span>`);
				} else {
					r.push(`them.`);
				}
				shrinkage = 0;
				if (lipSize >= 70) {
					r.push(`<span class="change positive">Your ${PC.lipsImplant > 0 ? "natural " : ""}lips shrink dully,</span> becoming massively smaller and thinner.`);
					shrinkage = 5;
				} else if (lipSize >= 50) {
					r.push(`<span class="change positive">Your ${PC.lipsImplant > 0 ? "natural " : ""}lips shrink dully,</span> becoming much smaller and thinner.`);
					shrinkage = 3;
				} else if (lipSize >= 20) {
					r.push(`<span class="change positive">Your ${PC.lipsImplant > 0 ? "natural " : ""}lips shrink dully,</span> becoming smaller and thinner.`);
					shrinkage = 1;
				} else if ((PC.geneMods.NCS === 1) || (random(1, 100) > (40 - (V.injectionUpgrade * 10) - lipSize) && lipSize > 0)) {
					r.push(`<span class="change positive">Your ${PC.lipsImplant > 0 ? "natural " : ""}lips shrink dully,</span> becoming smaller and thinner.`);
					shrinkage = 1;
				}
				if (PC.geneMods.NCS === 1 && PC.lipsImplant > 1) {
					shrinkage *= 2;
				}
				PC.lips -= shrinkage;
				break;
			case "breast reducers":
				r.push(`You apply a small <span class="change positive">dermal reduction patch to each breast</span> before bed every night;`);
				if (PC.geneticQuirks.gigantomastia === 2 || PC.geneticQuirks.macromastia === 2) {
					r.push(`your breast growth works to counter their effects, but you're still slowing it down.`);
				} else {
					r.push(`the process is slow, but at least consistent.`);
				}
				PC.boobs -= 20;
				break;
			case Drug.REDISTBREAST:
				r.push(`You directly inject fat redistributors into your breasts before bed each night,`);
				if (gigantomastiaMod !== 3) {
					r.push(`encouraging your body to move fatty tissue from them to your`);
					if (PC.geneMods.NCS === 1) {
						r.push(`core, with your <span class="ncs">NCS</span> enhancing its effects.`);
					} else {
						r.push(`core.`);
					}
					let factor = 0;
					if (boobSize >= 20000) {
						r.push(`<span class="change positive">Your boobs shrink</span> over the week, becoming massively smaller while your <span class="orange">waistline swells tremendously.</span>`);
						factor = 20;
					} else if (boobSize >= 10000) {
						r.push(`<span class="change positive">Your boobs shrink</span> over the week, becoming noticeably smaller while your <span class="orange">waistline does the opposite.</span>`);
						factor = 10;
					} else if (boobSize >= 5000) {
						r.push(`<span class="change positive">Your boobs shrink</span> over the week, becoming smaller while your <span class="orange">waistline steadily grows.</span>`);
						factor = 5;
					} else if (boobSize >= 1000) {
						r.push(`<span class="change positive">Your boobs shrink</span> over the week, becoming smaller while your <span class="orange">waistline steadily grows.</span>`);
						factor = 3;
					} else if (boobSize > 100) {
						r.push(`<span class="change positive">Your boobs shrink</span> over the week, becoming a little smaller while your <span class="orange">waistline grows slightly.</span>`);
						factor = 1;
					}
					PC.weight += factor;
					if (PC.geneMods.NCS === 1 && boobSize > 200) {
						factor *= 2;
					}
					if (gigantomastiaMod === 2) {
						factor = 1;
						r.push(`However, <span class="orange">your tits do not shrink proportionately to your stomach's expansion;</span> your passive breast growth has disrupted the whole process.`);
					}
					PC.boobs -= 100 * factor;
				} else {
					r.push(`but your constantly growing breasts resist them utterly; <span class="noteworthy">there's no point in continuing to take them.</span>`);
					PC.drugs = Drug.NONE;
				}
				break;
			case "butt reducers":
				r.push(`You apply a small <span class="change positive">dermal reduction patch to each buttock</span> before bed every night;`);
				if (rearLipedemaMod === 1) {
					r.push(`your passive butt growth counters their effects, but at least you're holding it at bay.`);
				} else {
					r.push(`the process is slow, but at least consistent.`);
				}
				PC.butt -= .1;
				break;
			case Drug.REDISTBUTT:
				r.push(`You directly inject fat redistributors into your buttocks before bed each night, encouraging your body to move fatty tissue from them to your`);
				if (PC.geneMods.NCS === 1 && rearLipedemaMod === 0) {
					r.push(`core, with your <span class="ncs">NCS</span> enhancing its effects.`);
				} else {
					r.push(`core.`);
				}
				if (rearLipedemaMod === 1) {
					r.push(`Annoyingly, while your <span class="orange">waistline slowly swelled,</span> most of <span class="change positive">your butt shrinkage</span> was offset by your passive ass growth.`);
					PC.butt -= 0.2;
					PC.weight += 5;
				} else if (buttSize >= 15) {
					r.push(`<span class="change positive">Your butt shrinks</span> over the week, becoming massively smaller while your <span class="orange">waistline swells tremendously.</span>`);
					PC.butt -= 2;
					PC.weight += 25;
				} else if (buttSize >= 10) {
					r.push(`<span class="change positive">Your butt shrinks</span> over the week, becoming smaller while your <span class="orange">waistline swells tremendously.</span>`);
					PC.butt -= 1;
					PC.weight += 20;
				} else if ((PC.geneMods.NCS === 1) || (random(1, 100) > (50 - (V.injectionUpgrade * 10) - buttSize))) {
					r.push(`<span class="change positive">Your butt shrinks</span> over the week, becoming smaller while your <span class="orange">waistline swells greatly.</span>`);
					PC.butt -= 1;
					PC.weight += 10;
				}
				PC.butt = Math.clamp(PC.butt, 0, 20);
				break;
			case "stamina enhancers":
				r.push(`You take a couple stamina enhancing pills each morning to have some extra energy for more sex during the day.`);
				// Consider tiredness here.
				break;
			case "detox pills":
				r.push(`You take an aphrodisiac detoxification pill with each meal in an effort to kick your addiction. They're weaker than real aphrodisiacs, have none of the sexual benefits, and <span class="health dec">are still bad for you,</span> but sure beat dealing with the withdrawal.`);
				// handled in prHealth
				break;
			case Drug.SAGBGONE:
				if (S.Concubine && S.Concubine.fetish !== Fetish.MINDBROKEN && hasAnyArms(S.Concubine)) {
					r.push(`Each morning and evening, you make it a habit of allowing ${S.Concubine.slaveName} to sensually <span class="coral">massage sag-B-gone into your breasts.</span> While it may be strengthening the bond between you and your Concubine, it doesn't appear to be doing much else.`);
				} else if (haremLength() > 0) {
					r.push(`Each morning and evening, you make it a habit of ordering the nearest fucktoy to <span class="coral">massage sag-B-gone into your breasts.</span> While the sensation may be enjoyable, and a little arousing, it doesn't seem to be doing much.`);
				} else {
					r.push(`Each morning and evening, you make a habit of <span class="coral">massaging sag-B-gone into your breasts,</span> which, while self-gratifying, doesn't appear to be doing much else.`);
				}
				r.push(induceLactation(PC, 2));
				break;

			// Adds a default to handle unexpected(modded) drugs
			default:
			{
				const drug = App.Mods.Drugs.list.filter(drug => drug.isPCDrug).find(e => e.name === PC.drugs);
				if (drug) {
					r.push(drug.effect(PC));
				} else {
					console.error(`Drug effect of ${PC.drugs} not found!`);
					PC.drugs = Drug.NONE;
				}
			}
		}
		if ([Drug.HYPERBREAST, Drug.HYPERBUTT, Drug.GROWTHSTIM, Drug.HYPERPENIS, Drug.HYPERTESTICLE, Drug.SUPERFERTILITY].includes(PC.drugs)) {
			if (!canEatFood(PC)) {
				PC.chem += 2;
			} else {
				PC.chem += 10;
			}
		} else if (PC.drugs === "detox pills" || PC.drugs === "hip wideners") {
			PC.chem += 2;
		}
		if (V.arcologies[0].FSBodyPuristLaw === 0 && V.healthyDrugsUpgrade === 0) {
			if ([Drug.HORMONEENHANCE, Drug.PRIAPISM, Drug.STEROID, Drug.FERTILITY].includes(PC.drugs)) {
				PC.chem += 1.5;
			} else if (![Drug.NONE, Drug.SAGBGONE, Drug.ANTIAGE, Drug.PSYCHOSTIM, "breast enhancers", "breast reducers", "butt enhancers", "butt reducers", "lip enhancers", "lip reducers", "penis enlargers", "penis reducers", "testicle enlargers", "testicle reducers", "fertility supplements", "stamina enhancers", Drug.APPETITESUPP, "detox pills"].includes(PC.drugs)) {
				if (!canEatFood(PC)) {
					PC.chem += 1.5;
					if (intensive) {
						PC.chem += 1;
					}
				} else {
					PC.chem += 4;
					if (intensive) {
						PC.chem += 8;
					}
				}
			}
		}
		if (intensive) {
			r.push(`Being so reckless with the dosages is dangerous and <span class="health dec">unhealthy.</span>`);
			healthDamage(PC, random(3, 5));
		}
	}

	function pregnancyDrugEffects() {
		if (PC.pregControl === GestationDrug.LABOR) {
			r.push(`You're currently taking labor suppressors in order to prevent yourself from giving birth.`);
			PC.chem += 5;
			if (WombBirthReady(PC, PC.pregData.normalBirth * 1.25) > 0) {
				healthDamage(PC, 20);
				r.push(`Your body has been ready to give birth for some time now; it was not designed to stave off birth so long, and its <span class="health dec">serious impacts on your health</span> prove this. There's also the lingering thought of you <span class="health dec">tearing yourself asunder</span> in a fruitless bid to give birth to the oversized ${(PC.pregType === 1) ? `child` : `children`} growing heavy in your womb.`);
				if (WombBirthReady(PC, PC.pregData.normalBirth * 1.5) > 0) {
					induce(PC);
					r.push(`<span class="noteworthy">A notion made all the more real by a sudden gush of fluids...</span>`);
				}
			} else if (WombBirthReady(PC, PC.pregData.normalBirth) > 0) {
				healthDamage(PC, 10);
				r.push(`Since you've passed your due date, something your body is well aware of, the drugs begin having a <span class="health dec">negative affect on your health.</span>`);
			} else if (WombBirthReady(PC, PC.pregData.normalBirth * .90) > 0) {
				r.push(`You're getting close to your intended due date, so it may be time to stop taking the drugs and "pop the cork," so to speak.`);
			}
		}
	}

	function aphrodisiacEffects() {
		r.push(`You take a hit of slave-grade aphrodisiacs each morning to enhance the overall pleasure you feel during the day's escapades.`);
		if (PC.energy <= 95) {
			r.push(`You find yourself <span class="libido inc">fucking harder than you ever have before</span> and the payout more intense than you can imagine.`);
			PC.energy += 3;
		} else {
			r.push(`While you're always ready to go on a moment's notice, you already are even before you take the pills. The increased intensity of your climaxes, however, makes it worthwhile still.`);
		}
		PC.chem += 0.5;
	}

	function drugExpiry() {
		switch (PC.drugs) {
			case Drug.GROWTHSTIM:
				if (!canImproveHeight(PC)) {
					r.push(`Your body has grown far past its natural limits, and with their recent reduced effects, it makes sense that the stimulants have also reached their limit. <span class="noteworthy">You stop using them.</span>`);
					PC.height = Math.clamp(PC.height, 0, Math.min(maxHeight(PC) + PC.heightImplant * 10, 274));
					PC.drugs = Drug.NONE;
				}
				break;
			case Drug.HYPERBREAST:
				if (PC.boobs >= 50000) {
					r.push(`Your udders are now so massive that further HA-HGH treatment will be largely negligible. <span class="noteworthy">You stop using them.</span>`);
					PC.drugs = Drug.NONE;
				}
				break;
			case "breast enhancers":
				if (PC.boobs >= 50000) {
					r.push(`Your udders are now so massive that the dermal patches can no longer diffuse the drugs into them effectively. <span class="noteworthy">You stop using them.</span>`);
					PC.drugs = Drug.NONE;
				}
				break;
			case Drug.GROWBREAST:
			case Drug.INTENSIVEBREAST:
				if (PC.boobs >= 50000) {
					r.push(`Your udders are now so massive that further A-HGH treatment will be largely negligible. <span class="noteworthy">You stop using them.</span>`);
					PC.drugs = Drug.NONE;
				}
				break;
			case Drug.HYPERBUTT:
				if (PC.butt >= 20) {
					r.push(`You've expanded your ass to such a freakishly monstrous size that HA-HGH treatment can do nothing more to further its growth. <span class="noteworthy">You stop using them.</span>`);
					PC.butt = Math.clamp(PC.butt, 0, 20);
					PC.drugs = Drug.NONE;
				}
				break;
			case "butt enhancers":
				if (PC.butt >= 20) {
					r.push(`You've expanded your ass to such a freakishly monstrous size that the patches can no longer diffuse the drugs into them effectively. <span class="noteworthy">You stop using them.</span>`);
					PC.butt = Math.clamp(PC.butt, 0, 20);
					PC.drugs = Drug.NONE;
				}
				break;
			case Drug.GROWBUTT:
			case Drug.INTENSIVEBUTT:
				if (PC.butt >= 10) {
					r.push(`Your ass is now so huge that further A-HGH treatment will be largely negligible. <span class="noteworthy">You stop using them.</span>`);
					PC.butt = Math.clamp(PC.butt, 0, 20);
					PC.drugs = Drug.NONE;
				}
				break;
			case "lip enhancers":
				if ((PC.lips >= 100) || (PC.lips > 85 && V.seeExtreme !== 1)) {
					r.push(`Your lips are now so enormous that the patches can no longer diffuse the drugs into them effectively. <span class="noteworthy">You stop using them.</span>`);
					PC.drugs = Drug.NONE;
					PC.lips = Math.clamp(PC.lips, 0, 100);
				}
				break;
			case Drug.GROWLIP:
				if ((PC.lips > 95) || (PC.lips > 85 && V.seeExtreme !== 1)) {
					r.push(`Your lips are now so huge that further A-HGH treatment will be largely negligible. <span class="noteworthy">You stop using them.</span>`);
					PC.drugs = Drug.NONE;
				}
				break;
			case Drug.HYPERPENIS:
				if (PC.dick >= 30) {
					r.push(`Your cock is so massive that any further growth will be negligible. <span class="noteworthy">You stop using them.</span>`);
					PC.drugs = Drug.NONE;
				} else if (PC.clit >= 5) {
					r.push(`Your clit is so huge that the drug enhancement isn't having much of an effect any longer. <span class="noteworthy">You stop using them.</span>`);
					PC.drugs = Drug.NONE;
				}
				break;
			case "penis enlargers":
				if (PC.dick >= 30) {
					r.push(`Your cock is so massive that the patches can no longer diffuse the drugs into it to a degree needed for further growth. <span class="noteworthy">You stop using them.</span>`);
					PC.drugs = Drug.NONE;
				} else if (PC.clit >= 5) {
					r.push(`Your clit is so huge that the patches aren't having much of an effect any longer. <span class="noteworthy">You stop using them.</span>`);
					PC.drugs = Drug.NONE;
				}
				break;
			case Drug.GROWPENIS:
			case Drug.INTENSIVEPENIS:
				if (PC.dick >= 10) {
					r.push(`Your cock is so huge that any further growth will be negligible. <span class="noteworthy">You stop using them.</span>`);
					PC.dick = Math.clamp(PC.dick, 0, 10);
					PC.drugs = Drug.NONE;
				} else if (PC.clit >= 5) {
					r.push(`Your clit is so huge that any further growth will be negligible. <span class="noteworthy">You stop using them.</span>`);
					PC.clit = (Math.clamp(PC.clit, 0, 5));
					PC.drugs = Drug.NONE;
				}
				break;
			case Drug.HYPERTESTICLE:
				if (PC.balls >= 125) {
					r.push(`Your balls are now so immense that any further growth will be negligible. However, staying on the drugs will still stimulate cum overproduction.`);
				}
				break;
			case "testicle enlargers":
				if (PC.balls >= 125) {
					r.push(`Your balls have ballooned to such an obscene size that the patches can no longer diffuse the drugs into them to a degree needed for further growth. <span class="noteworthy">You stop using them.</span>`);
					PC.drugs = Drug.NONE;
				}
				break;
			case Drug.GROWTESTICLE:
			case Drug.INTENSIVETESTICLE:
				if (PC.balls >= 10) {
					r.push(`Your balls are now so huge that any further growth will be negligible. However, staying on the drugs will still stimulate cum production.`);
				}
				break;
			case Drug.PSYCHOSTIM:
				if (!canImproveIntelligence(PC)) {
					r.push(`Your mind has been sharpened as much as any simple solution is capable of. <span class="noteworthy">You stop drinking it.</span>`);
					PC.drugs = Drug.NONE;
				}
				break;
			case Drug.ANTIAGE:
				if (PC.visualAge <= 18) {
					r.push(`The creams have done their job fully, having little to no further effect on you. Perhaps in a few years you'll resume treatment, but for now, <span class="noteworthy">you stop using them.</span>`);
					PC.drugs = Drug.NONE;
				}
				break;
			case Drug.APPETITESUPP:
				if (PC.weight <= -95) {
					r.push(`You've lost so much weight that losing any more would put your life at risk; <span class="noteworthy">you stop taking them.</span>`);
					PC.drugs = Drug.NONE;
				}
				break;
			case Drug.ATROPHYPENIS:
				if (PC.dick === 1) {
					r.push(`Your penis is now so minuscule that there is nothing left that the drugs can further reduce; <span class="noteworthy">you stop taking them.</span>`);
					PC.drugs = Drug.NONE;
				}
				break;
			case "penis reducers":
				if (PC.dick === 1) {
					r.push(`Your penis is now so minuscule that there is nothing left that the drugs can further reduce; <span class="noteworthy">you stop taking them.</span>`);
					PC.drugs = Drug.NONE;
				} else if (PC.vagina >= 0 && PC.clit === 0) {
					r.push(`Your clitoris is now so minuscule that there is nothing left that the drugs can further reduce; <span class="noteworthy">you stop taking them.</span>`);
					PC.drugs = Drug.NONE;
				}
				break;
			case "testicle reducers":
			case Drug.ATROPHYTESTICLE:
				if (PC.balls === 1) {
					r.push(`Your balls are now so insignificant that the drugs will have no further effect; <span class="noteworthy">you stop taking them.</span>`);
					PC.drugs = Drug.NONE;
				}
				break;
			case Drug.ATROPHYCLIT:
				if (PC.clit === 0) {
					r.push(`Your clit is now a normal size and unable to really get any smaller; <span class="noteworthy">you stop taking them.</span>`);
					PC.drugs = Drug.NONE;
				}
				break;
			case Drug.ATROPHYLABIA:
				if (PC.labia === 0) {
					r.push(`Your labia are now a more normal size and unable to really get any smaller; <span class="noteworthy">you stop taking the atrophiers.</span>`);
					PC.drugs = Drug.NONE;
				}
				break;
			case "lip reducers":
			case Drug.ATROPHYLIP:
				if (lipSize === 0) {
					r.push(`Your ${PC.lipsImplant > 0 ? "natural " : ""}lips are now so thin that further drug use will fail to shrink them further; <span class="noteworthy">you stop taking them.</span>`);
					PC.drugs = Drug.NONE;
				}
				break;
			case "breast reducers":
				if (boobSize <= 100) {
					r.push(`You are now so flat that you lack any breast tissue for the drugs to move; <span class="noteworthy">you stop taking them.</span>`);
					PC.drugs = Drug.NONE;
				}
				break;
			case Drug.REDISTBREAST:
				if (boobSize <= 100) {
					r.push(`You are now so flat that you lack any breast tissue for the drugs to move; <span class="noteworthy">you stop taking them.</span>`);
					PC.drugs = Drug.NONE;
				} else if (PC.weight >= 200) {
					r.push(`You have become so immensely obese that getting any fatter will put your health at risk; <span class="noteworthy">you hastily stop taking the drugs.</span>`);
					PC.drugs = Drug.NONE;
				}
				break;
			case "butt reducers":
				if (buttSize <= 0) {
					r.push(`Your ass is now so flat that the drugs will have no further effect on you; <span class="noteworthy">you stop taking them.</span>`);
					PC.drugs = Drug.NONE;
				}
				break;
			case Drug.REDISTBUTT:
				if (buttSize <= 0) {
					r.push(`Your ass is now so flat that the drugs will have no further effect on you; <span class="noteworthy">you stop taking them.</span>`);
					PC.drugs = Drug.NONE;
				} else if (PC.weight >= 200) {
					r.push(`You have become so immensely obese that getting any fatter will put your health at risk; <span class="noteworthy">you hastily stop taking the drugs.</span>`);
					PC.drugs = Drug.NONE;
				}
				break;
			case "hip wideners":
				if (PC.hips > -2) {
					r.push(`Your body has become better suited for childbirth; <span class="noteworthy">you stop taking the hormones.</span>`);
					PC.drugs = Drug.NONE;
				} else if (PC.preg <= 0) {
					r.push(`You are no longer pregnant and have no need for wider hips; <span class="noteworthy">you stop taking the hormones.</span>`);
					PC.drugs = Drug.NONE;
				}
				break;
		}
		if (PC.pregControl !== "none" && PC.pregKnown === 0) {
			r.push(`You aren't pregnant anymore; <span class="noteworthy">you stop bothering with the labor suppressors.</span>`);
			PC.pregControl = "none";
		}
	}
};
