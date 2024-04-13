// cSpell:ignore hotnhorny

App.EndWeek.Player.pregnancy = function(PC = V.PC) {
	const r = [];

	const gigantomastiaMod = PC.geneticQuirks.gigantomastia === 2 ? (PC.geneticQuirks.macromastia === 2 ? 3 : 2) : 1;
	const rearQuirk = PC.geneticQuirks.rearLipedema === 2 ? 2 : 0;
	const uterineHypersensitivityMod = PC.geneticQuirks.uterineHypersensitivity === 2 ? 2 : 1;
	const boobSize = App.Medicine.fleshSize(PC, 'boobs');
	const oldBoobs = PC.boobs;
	const buttSize = App.Medicine.fleshSize(PC, 'butt');
	const hipSize = PC.hips - PC.hipsImplant;
	const child = (PC.pregType > 1 ? "children" : "child");

	if (PC.preg > 0) {
		pregnancyEffects();
	}
	if (V.seePreg !== 0) {
		preconception();
		pregnancySanityCheck();
	}

	return r.join(" ");

	function pregnancyEffects() {
		pregnancyDiscovery();
		pregnancyLibido();
		fetalAdjustment();
		if (PC.preg >= PC.pregData.normalBirth / 4) {
			pregnancyAdjustments();
			laborText();
			pregnancyPhysicalEffects();
		}
		if (PC.pregType === 0) { // Catch for strange cases - now with checking.
			failSafe();
		}
	}

	function pregnancyDiscovery() {
		// Add passive discovery to this once periods are added
		if (PC.preg === PC.pregData.normalBirth / 8 && PC.pregSource > 0) {
			actX(findFather(V.PC.pregSource), "PCKnockedUp");
		}
		if (PC.bellyFluid > 2000) {
			if (PC.inflation > 1) {
				r.push(`While trying to inflate yourself with ${PC.inflationType}, you discover that you can't hold more <span class="noteworthy">two liters</span> without feeling seriously ill.`);
				PC.inflation = 1;
			} else {
				r.push(`While pleasuring yourself by inflating with ${PC.inflationType}, you're forced to stop due to a sudden bout of extreme nausea.`);
				PC.bellyFluid = 2000;
			}
			SetBellySize(PC);
			if (PC.pregKnown === 0) {
				r.push(`It turns out <span class="pregnancy">you're`);
				if (PC.preg > PC.pregData.normalBirth / 4) {
					r.push(`pregnant and have been for some time.</span>`);
				} else {
					r.push(`pregnant.</span>`);
				}
			} else {
				r.push(`Unfortunately, this will likely be the case for the duration of your pregnancy; at least you'll still steadily swell, if a little slowly for your taste.`);
			}
		}
	}

	function pregnancyLibido() {
		// drop .energy on birth for uterine hypersensitivity
		if (PC.geneticQuirks.uterineHypersensitivity === 2 && V.geneticMappingUpgrade >= 1) {
			if (PC.preg >= PC.pregData.normalBirth) {
				r.push(`Your pregnancy is nearing its end and you're overwhelmed with arousal. Your uterine hypersensitivity combined with a full womb and upcoming birth confers a <span class="libido inc">huge improvement to your sexual appetite.</span>`);
				PC.energy += 7;
			} else if (PC.preg > PC.pregData.normalBirth / 1.33) {
				r.push(`Being hugely pregnant with uterine hypersensitivity confers an <span class="libido inc">improvement to your sexual appetite</span> as your womb steadily stretches.`);
				PC.energy += 5;
			} else if (PC.preg > PC.pregData.normalBirth / 2) {
				r.push(`Being pregnant with uterine hypersensitivity confers a <span class="libido inc">slow improvement to your sexual appetite</span> as your womb grows ever fuller.`);
				PC.energy += 3;
			} else if (PC.preg > PC.pregData.normalBirth / 4) {
				r.push(`You eagerly anticipate the growth of your pregnancy, producing <span class="libido inc">a very slow improvement to your sexual appetite.</span>`);
				PC.energy += 1;
			} else if (PC.preg <= PC.pregData.normalBirth / 4 && PC.preg > PC.pregData.normalBirth / 13.33) {
				if (PC.counter.birthsTotal > 0) {
					r.push(`The rigors of early pregnancy are easily tolerable when you can only quiver in anticipation of what's to come.`);
				} else {
					r.push(`The rigors of early pregnancy <span class="libido dec">slightly reduce your sexual appetite.</span>`);
					PC.energy -= 1;
				}
			}
		} else if (PC.geneticQuirks.uterineHypersensitivity === 2) {
			if (PC.preg >= PC.pregData.normalBirth) {
				r.push(`Your pregnancy is nearing its end and you're overwhelmed with arousal. The sensation of your womb stretched so full ${PC.counter.birthsTotal > 0 ? "and the anticipation of another orgasmic birth " : ""}<span class="libido inc">sends your sexual appetite skyrocketing.</span>`);
				PC.energy += 7;
			} else if (PC.preg > PC.pregData.normalBirth / 1.33) {
				r.push(`The feeling of your womb steadily expanding drives you wild, <span class="libido inc">improving your sexual appetite.</span>`);
				PC.energy += 5;
			} else if (PC.preg > PC.pregData.normalBirth / 2) {
				r.push(`The life growing in your womb leaves you feeling especially energetic, granting a <span class="libido inc">slow improvement to your sexual appetite.</span>`);
				PC.energy += 3;
			} else if (PC.preg > PC.pregData.normalBirth / 4) {
				r.push(`You feel a rush from your growing pregnancy, granting a <span class="libido inc">very slow improvement to your sexual appetite.</span>`);
				PC.energy += 1;
			} else if (PC.preg <= PC.pregData.normalBirth / 4 && PC.preg > PC.pregData.normalBirth / 13.33) {
				if (PC.counter.birthsTotal > 0) {
					r.push(`The rigors of early pregnancy are easily tolerable when you can only quiver in anticipation of what's to come.`);
				} else {
					r.push(`The rigors of early pregnancy <span class="libido dec">slightly reduce your sexual appetite.</span>`);
					PC.energy -= 1;
				}
			}
		} else if (PC.pregMood === 2) {
			if (PC.preg <= PC.pregData.normalBirth / 4 && PC.preg > PC.pregData.normalBirth / 13.33) {
				r.push(`The rigors of early pregnancy <span class="libido dec">take their toll on your sexual appetite.</span>`);
				PC.energy -= 3;
			} else if (PC.preg >= PC.pregData.normalBirth) {
				r.push(`Your pregnancy is nearing its end and you're <span class="libido inc">horny as hell.</span> Your hormones are out of control, driving you to fuck like a beast in heat despite your condition.`);
				PC.energy += 4;
			} else if (PC.preg > PC.pregData.normalBirth * .66) {
				r.push(`With your pregnancy hormones raging, you <span class="libido inc">find your thoughts focusing on sex</span> more than usual.`);
				PC.energy += 2;
			} else if (PC.preg > PC.pregData.normalBirth / 2) {
				r.push(`As your pregnancy grows, so does your desire for sex.`);
			}
		// } else if (PC.pregMood === 4) { unattractive
		} else if (PC.energy >= 90) {
			if (PC.preg <= PC.pregData.normalBirth / 4 && PC.preg > PC.pregData.normalBirth / 13.33) {
				r.push(`The rigors of early pregnancy <span class="libido dec">take their toll on your sexual appetite.</span>`);
				PC.energy -= 3;
			} else if (PC.preg >= PC.pregData.normalBirth) {
				r.push(`Your pregnancy is nearing its end and you're <span class="libido inc">horny as hell.</span> Between your hormones and already high libido, you're acting like you haven't had a good fuck in nine months.`);
				PC.energy += 2;
			} else if (PC.preg > PC.pregData.normalBirth / 1.33) {
				r.push(`Your advanced pregnancy, combined with your already high libido, leaves you aching to be filled throughout the day.`);
			} else if (PC.preg > PC.pregData.normalBirth / 2) {
				r.push(`Your growing pregnancy, combined with your already high libido, has you always itching for some sex.`);
			}
		// } else if (PC.pregMood === 3) { frigid
		// } else if (PC.pregMood === 5) { hotnhorny
		} else if (PC.energy > 60) {
			if (PC.preg <= PC.pregData.normalBirth / 4 && PC.preg > PC.pregData.normalBirth / 13.33) {
				r.push(`The rigors of early pregnancy <span class="libido dec">take their toll on your sexual appetite.</span>`);
				PC.energy -= 3;
			} else if (PC.preg >= PC.pregData.normalBirth) {
				r.push(`Your pregnancy is nearing its end and you're suffering from an <span class="libido inc">unquenchable need to be filled.</span>`);
				PC.energy += 4;
			} else if (PC.preg > PC.pregData.normalBirth / 1.33) {
				r.push(`Your advanced pregnancy comes with a hugely increased libido, <span class="libido inc">greatly increasing your sexual drive.</span>`);
				PC.energy += 3;
			} else if (PC.preg > PC.pregData.normalBirth / 2) {
				r.push(`Your growing pregnancy comes with an increased libido, <span class="libido inc">spurring your sexual appetite.</span>`);
				PC.energy += 2;
			}
		} else if (PC.energy > 40) {
			if (PC.preg <= PC.pregData.normalBirth / 4 && PC.preg > PC.pregData.normalBirth / 13.33) {
				r.push(`The rigors of early pregnancy <span class="libido dec">slightly reduce your sexual appetite.</span>`);
				PC.energy -= 1;
			} else if (PC.preg >= PC.pregData.normalBirth) {
				r.push(`Your pregnancy is nearing its end and you're <span class="libido inc">feeling rather frisky.</span>`);
				PC.energy += 2;
			} else if (PC.preg > PC.pregData.normalBirth / 1.33) {
				r.push(`As your pregnancy grows, so does that<span class="libido inc">tingling feeling</span> in your crotch.`);
				PC.energy += 1;
			}
		} else {
			if (PC.preg <= PC.pregData.normalBirth / 4 && PC.preg > PC.pregData.normalBirth / 13.33) {
				r.push(`The rigors of early pregnancy <span class="libido dec">take their toll on your sexual appetite.</span>`);
				PC.energy -= 3;
			} else if (PC.preg >= PC.pregData.normalBirth) {
				r.push(`Your pregnancy is nearing its end and you're feeling way too full for sex, <span class="libido dec">greatly suppressing your sexual appetite.</span>`);
				PC.energy -= 3;
			} else if (PC.preg > PC.pregData.normalBirth / 1.33) {
				r.push(`Your advanced pregnancy <span class="libido dec">greatly hinders your sexual appetite.</span>`);
				PC.energy -= 2;
			} else if (PC.preg > PC.pregData.normalBirth / 2) {
				r.push(`Your growing pregnancy <span class="libido dec">suppresses your sexual appetite slightly.</span>`);
				PC.energy -= 1;
			}
		}
	}

	function fetalAdjustment() {
		const oldCount = PC.pregType;
		if (PC.preg <= 2 && PC.broodmother === 0) {
			fetalSplit(PC, 1000);
			WombCleanYYFetuses(PC);
		}
		if (V.pregnancyMonitoringUpgrade === 1 && PC.pregKnown) {
			if (oldCount < PC.pregType) {
				r.push(`While exploring your new pregnancy with the monitoring tools, you get quite the surprise; <span class="pregnancy">you are more pregnant than previously thought!</span>`);
			} else if (oldCount > PC.pregType) {
				r.push(`While exploring your new pregnancy with the monitoring tools, you make an unfortunate discovery; <span class="change negative">some of your fertilized ova have not made it.</span>`);
				if (PC.pregType === 0) {
					r.push(`Since there are now none present in your womb, <span class="noteworthy">you are technically no longer pregnant.</span>`);
					TerminatePregnancy(PC);
				}
			}
		} else if (oldCount > PC.pregType && PC.pregType === 0) {
			TerminatePregnancy(PC);
		}
	}

	function pregnancyAdjustments() {
		if (PC.geneticQuirks.gigantomastia === 3 && random(1, 200) < PC.hormoneBalance) {
			PC.geneticQuirks.gigantomastia = 2;
		}
		if (PC.geneticQuirks.macromastia === 3 && random(1, 200) < PC.hormoneBalance) {
			PC.geneticQuirks.macromastia = 2;
		}
		if (PC.geneticQuirks.galactorrhea === 2 && random(1, 100) < PC.hormoneBalance && PC.lactation === 0) {
			PC.inappropriateLactation = 1;
		}
	}

	function laborText() {
		const childIs = (PC.pregType > 1 ? "children are" : "child is");
		if (isInduced(PC)) {
			r.push(`Your child${PC.pregType > 1 ? "ren stir" : "stirs"} restlessly as ${PC.pregType > 1 ? "they prepare" : "it prepares"} to enter the world. You experience several`);
			if (PC.geneticQuirks.uterineHypersensitivity === 2) {
				r.push(`${PC.counter.birthsTotal > 0 ? "overwhelmingly" : "unexpectedly"} orgasmic`);
			}
			r.push(`contractions, so it's best to stay put until it's time.`);
		} else if (PC.pregControl === GestationDrug.LABOR) {
			r.push(`Your ${childIs} far calmer that one would expect for their stage of development; it is unlikely you will give birth soon, despite being overdue.`);
		} else {
			if (PC.preg > PC.pregData.normalBirth + 1) {
				r.push(`You are constantly beset by your squirming`);
				if (PC.geneticQuirks.uterineHypersensitivity === 2) {
					r.push(`${child} and uncontrollable orgasms.`);
				} else {
					r.push(`${child}.`);
				}
				r.push(`They're overdue, so your water could break at any moment, but for now they aren't quite ready to leave their home.`);
			} else if (PC.preg > PC.pregData.normalBirth - 1 && PC.preg > PC.pregData.minLiveBirth) {
				r.push(`You are constantly beset by your squirming`);
				if (PC.geneticQuirks.uterineHypersensitivity === 2) {
					r.push(`${child} and uncontrollable orgasms.`);
				} else {
					r.push(`${child}.`);
				}
				r.push(`Given their liveliness, and how far along you are, it is likely that you will go into labor at any time now.`);
			} else if (PC.preg > PC.pregData.normalBirth - 2 && PC.preg > PC.pregData.minLiveBirth) {
				r.push(`You often have to pause and soothe your kicking`);
				if (PC.geneticQuirks.uterineHypersensitivity === 2) {
					r.push(`${child}, to spontaneously orgasm,`);
				} else {
					r.push(`${child}`);
				}
				r.push(`or to catch your breath. With how far along you are, it's possible you may go into labor any day now.`);
			} else if (PC.preg > PC.pregData.normalBirth - 3 && PC.preg > PC.pregData.minLiveBirth) {
				r.push(`You often have to pause to soothe your kicking`);
				if (PC.geneticQuirks.uterineHypersensitivity === 2) {
					r.push(`${child} or to spontaneously orgasm.`);
				} else {
					r.push(`${child}.`);
				}
				r.push(`You are far enough along that you could enter labor early.`);
			}
		}
	}

	function pregnancyPhysicalEffects() {
		let boobTarget;
		const slimnessFoodMod = (V.arcologies[0].FSSlimnessEnthusiastFoodLaw === 1 && !canEatFood(PC)) ? 0.5 : 1;
		if (PC.geneMods.NCS === 1) {
			// NCS: always working against secondary sexual characteristics even in pregnancies.
			boobTarget = 0;
		} else if (PC.geneticQuirks.androgyny === 2) {
			boobTarget = 400;
		} else if (PC.physicalAge >= 18) {
			if (PC.pregType >= 50) {
				boobTarget = 10000;
			} else if (PC.pregType >= 30) {
				boobTarget = 5000;
			} else if (PC.pregType >= 10) {
				boobTarget = 2000;
			} else if (PC.pregType >= 2) {
				boobTarget = 1000;
			} else {
				boobTarget = 800;
			}
		} else if (PC.physicalAge >= 13) {
			if (PC.pregType >= 50) {
				boobTarget = 5000;
			} else if (PC.pregType >= 30) {
				boobTarget = 3200;
			} else if (PC.pregType >= 10) {
				boobTarget = 1800;
			} else if (PC.pregType >= 2) {
				boobTarget = 1000;
			} else {
				boobTarget = 700;
			}
		} else if (PC.physicalAge >= 8) {
			if (PC.pregType >= 50) {
				boobTarget = 1800;
			} else if (PC.pregType >= 30) {
				boobTarget = 1400;
			} else if (PC.pregType >= 10) {
				boobTarget = 1000;
			} else if (PC.pregType >= 2) {
				boobTarget = 800;
			} else {
				boobTarget = 600;
			}
		} else {
			if (PC.pregType >= 50) {
				boobTarget = 1000;
			} else if (PC.pregType >= 30) {
				boobTarget = 800;
			} else if (PC.pregType >= 10) {
				boobTarget = 600;
			} else {
				boobTarget = 400;
			}
		}
		boobTarget *= gigantomastiaMod;
		boobTarget *= slimnessFoodMod;
		if (PC.geneMods.NCS === 0) {
			if (PC.pregType >= 30) {
				if (PC.weight <= 100) {
					r.push(`With the amount of food you eat to sustain your brood, <span class="change negative">you put on a little baby weight.</span>`);
					PC.weight += 1;
				}
				if (random(1, 100) > 60) {
					if (boobSize < boobTarget) {
						boobsUpText(100);
						if (PC.boobShape !== BreastShape.SAGGY && PC.preg > PC.pregData.normalBirth / 1.25 && (PC.boobsImplant / PC.boobs < 0.5) && PC.breastMesh !== 1 && PC.drugs !== Drug.SAGBGONE) {
							r.push(`Your immensely engorged <span class="change negative">mammaries begin to sag</span> as your body continues its motherly transformation in anticipation of breastfeeding.`);
							PC.boobShape = BreastShape.SAGGY;
						}
					}
					if (PC.geneticQuirks.androgyny !== 2) {
						if (hipSize < 2) {
							r.push(`Your hips <span class="change positive">widen</span> in preparation for the upcoming births.`);
							PC.hips += 1;
						}
						if (buttSize < 14 + (rearQuirk * 3)) {
							r.push(`Your butt <span class="change positive">swells with added fat</span> from your ripening body.`);
							PC.butt += 1;
						}
					}
				}
			} else if (PC.pregType >= 10) {
				if (PC.weight <= 65) {
					r.push(`With how hungry your brood is, it's no surprise that <span class="change negative">you put on a little baby weight</span> feeding their growth.`);
					PC.weight += 1;
				}
				if (random(1, 100) > 80 && boobSize < boobTarget) {
					boobsUpText(50);
					if (PC.boobShape !== BreastShape.SAGGY && (PC.boobsImplant / PC.boobs < 0.5) && PC.breastMesh !== 1 && PC.drugs !== Drug.SAGBGONE) {
						if (PC.preg > random(PC.pregData.normalBirth / 1.25, PC.pregData.normalBirth * 2.05)) {
							r.push(`Your swollen <span class="change negative">mammaries begin to sag</span> as your body continues its motherly transformation in anticipation of breastfeeding.`);
							PC.boobShape = BreastShape.SAGGY;
						}
					}
				}
			} else if (boobSize < boobTarget) {
				if (PC.weight <= 35 && random(random(1, 100) > 50)) {
					r.push(`You can't help but <span class="change negative">put on a little baby weight</span> due to your increased appetite.`);
					PC.weight += 1;
				}
				if (random(1, 100) > 80) {
					boobsUpText(25);
					if (PC.boobShape !== BreastShape.SAGGY && PC.preg > random(PC.pregData.normalBirth / 1.25, PC.pregData.normalBirth * 2.5) && (PC.boobsImplant / PC.boobs < 0.5) && PC.breastMesh !== 1 && PC.drugs !== Drug.SAGBGONE) {
						r.push(`Your <span class="change negative">mammaries begin to sag</span> as your body continues its motherly transformation in anticipation of breastfeeding.`);
						PC.boobShape = BreastShape.SAGGY;
					}
				}
			}
			if (PC.preg > PC.pregData.normalBirth / 1.25 && PC.physicalAge >= 18 && PC.hips === 1 && PC.hipsImplant === 0 && random(1, 100) > 90 / uterineHypersensitivityMod) {
				r.push(`Your hips <span class="change positive">widen</span> to better support your gravidity.`);
				PC.hips += 1;
			} else if (PC.preg > PC.pregData.normalBirth / 1.42 && PC.physicalAge >= 16 && PC.hips === 0 && PC.hipsImplant === 0 && random(1, 100) > 70 / uterineHypersensitivityMod) {
				r.push(`Your hips <span class="change positive">widen</span> to better support your gravidity.`);
				PC.hips += 1;
			} else if (PC.drugs === "hip wideners" && PC.preg > PC.pregData.normalBirth / 1.42 && PC.hips === -2 && PC.hipsImplant === 0 && random(1, 100) > 70 / uterineHypersensitivityMod) {
				r.push(`Your hips <span class="change positive">widen</span> to better support your gravidity.`);
				PC.hips += 1;
			}
			if (PC.preg > PC.pregData.normalBirth / 1.42 && PC.physicalAge >= 12 && buttSize < (4 + (rearQuirk * 3)) && PC.weight >= -30 && random(1, 100) > 70) {
				r.push(`Your butt <span class="change positive">gets a little bigger</span> as your body ripens.`);
				PC.butt += 1;
			}
		}
		if (PC.preg > PC.pregData.normalBirth / 1.42 && PC.vagina >= 0 && PC.vaginaLube < 1 && PC.energy > 20 && random(1, 100) > 80) {
			r.push(`You heard sex tends to be a little wet during pregnancy, and you now know why;`);
			if (random(1, 100) > 75) {
				r.push(`your <span class="change positive">pussy has gotten really moist.</span>`);
				PC.vaginaLube += 1;
			} else {
				r.push(`your pussy <span class="change positive">liberally soaks you, your partner, and your surroundings</span> during any sort of intimacy.`);
				PC.vaginaLube += 2;
			}
		}
		if (PC.preg === PC.pregData.normalBirth / 2.66) { // change me when nipple color gets hardset
			if (PC.pregKnown === 0) {
				r.push(`Your areolae have gotten dark. Some cursory tests reveal <span class="pregnant">you are about fifteen weeks pregnant.</span> How did that manage to slip past you?`);
				PC.pregKnown = 1;
			} else {
				r.push(`Your areolae have gotten dark. Just another step along your pregnancy.`);
			}
		} else if (PC.bellyPreg >= 1500) {
			if (PC.preg > PC.pregData.normalBirth / 2 && PC.lactation === 0) {
				if (PC.preg > random(PC.pregData.normalBirth / 2.22, PC.pregData.normalBirth / 1.33) && PC.health.condition >= -20 && PC.weight > -30) {
					r.push(`A moist sensation on your breasts draws your attention; <span class="change positive">your milk has come in.</span>`);
					PC.lactation = 1;
				}
			}
			if (PC.lactation === 1) { // If natural lactation, constantly refresh it.
				PC.lactationDuration = 2;
			}
		}
	}

	function boobsUpText(bustUp) {
		if (PC.boobs >= 90000) {
			r.push(`It's nearly impossible to tell if your inhuman breasts have gotten larger from your pregnancy, but your nipples sitting <span class="change positive">further out of reach than ever</span> sure confirms they are.`);
		} else if (PC.boobs >= 25000) {
			r.push(`It's nearly impossible to tell if your obscene breasts are getting larger from your pregnancy, but as your nipples <span class="change positive">slowly become harder to reach, you can't deny their growth.</span>`);
		} else if (PC.boobs >= 15000) {
			r.push(`It may be difficult to gauge growth in breasts as enormous as yours, but your back can sure feel <span class="change positive">the extra weight on your chest</span> caused by your pregnancy.`);
		} else if (PC.boobs >= 7500) {
			r.push(`It may be difficult to gauge growth in breasts as large as yours, but you can still feel <span class="change positive">the extra weight on your chest</span> caused by your pregnancy.`);
		} else if (PC.boobs >= 3950) {
			r.push(`Like the cow you are, your udders <span class="change positive">have gotten even larger</span> with your pregnancy.`);
		} else if (PC.boobs >= 1400) {
			r.push(`Unsurprisingly, your cow tits <span class="change positive">have swollen even larger</span> with your pregnancy.`);
		} else if (PC.boobs >= 1200) {
			r.push(`Your already huge breasts have <span class="change positive">grown even heavier</span> with your pregnancy.`);
		} else if (PC.boobs >= 1000) {
			r.push(`Your already large breasts have <span class="change positive">grown even larger</span> with your pregnancy.`);
		} else if (PC.boobs >= 800) {
			r.push(`Your breasts have <span class="change positive">grown a bit larger</span> to feed your coming ${child}.`);
		} else if (PC.boobs >= 650) {
			r.push(`Your breasts have <span class="change positive">grown a bit larger</span> to feed your coming ${child}.`);
		} else if (PC.boobs >= 500) {
			r.push(`Your breasts have <span class="change positive">grown a bit larger</span> to feed your coming ${child}.`);
		} else if (PC.boobs >= 400) {
			r.push(`Your breasts have <span class="change positive">gotten heavier</span> alongside your pregnancy.`);
		} else if (PC.boobs >= 300) {
			r.push(`Your breasts have <span class="change positive">swollen</span> alongside your pregnancy.`);
		} else {
			r.push(`Your chest <span class="change positive">has filled out slightly</span> with your pregnancy.`);
		}
		PC.boobs += bustUp;
		r.push(App.EndWeek.Player.bustUp(PC, oldBoobs));
	}

	function failSafe() {
		PC.pregType = setPregType(PC);
		WombImpregnate(PC, PC.pregType, PC.pregSource, PC.preg);
	}

	function preconception() {
		if (isFertile(PC)) { // && PC.pregMood === 5
			needToBreed();
		}
		if (canGetPregnant(PC)) {
			impregnation();
		}
		if (PC.ovaImplant === OvaryImplantType.ASEXUAL && isFertile(PC) && (PC.preg === 0 || (PC.preg >= 0 && PC.geneticQuirks.superfetation === 2))) {
			autoImpregnation();
		}
	}

	function needToBreed() {
		// Empty for now. Will be used for "breeder" .pregMood.
	}

	function impregnation() {
		if (PC.vagina === 0 || (PC.anus === 0 && PC.mpreg > 0)) {
			// You aren't putting out.
			if (PC.geneMods.aggressiveSperm === 1) {
				// But ejaculating with the sperm mod can result in splashback. More sex, more chances.
				if (random(1, 100) > (99 - (PC.energy / 2))) {
					tryKnockMeUp(PC, 0, 2, PC); // 0% chance is correct. Gene mod adds 75% in tryKnockMeUp().
				}
			}
		} else if (random(1, 100) > (70 - (V.reproductionFormula * 10))) {
			/** @type {Map<FC.Assignment, number>} */
			const assignmentWeight = new Map([
				[Job.CONCUBINE, 7],
				[Job.MASTERSUITE, 4],
				[Job.FUCKTOY, 3],
				[Job.HOUSE, 1],
				[Job.QUARTER, 1],
				[Job.MILKED, 1],
				[Job.BODYGUARD, 1],
				[Job.HEADGIRL, 1],
				[Job.RECRUITER, 1],
				[Job.MATRON, 1],
				[Job.NURSERY, 1],
				[Job.ATTENDANT, 1],
				[Job.STEWARD, 1],
				[Job.TEACHER, 1]
			]);
			const undesirableRace = (s) => (FutureSocieties.isActive('FSSupremacist') && (s.race !== V.arcologies[0].FSSupremacistRace)) ||
				(FutureSocieties.isActive('FSSubjugationist') && (s.race === V.arcologies[0].FSSubjugationistRace));
			const raceIsAcceptable = (s) => !undesirableRace(s) ||
				(s.relationship === -3) ||
				[Job.CONCUBINE, Job.MASTERSUITE, Job.FUCKTOY].includes(s.assignment);
			const score = (/** @type {App.Entity.SlaveState} */s) => {
				let weight = (assignmentWeight.get(s.assignment) || 0);
				if (s.relationship === -3 && isSlaveAvailable(s)) { // assumes player will seek relations with slavewife if available
					weight += 3;
				}
				if (onBedRest(PC) && weight < 3) {
					weight = 0;
				}
				if (s.geneMods.aggressiveSperm === 1) { // Doing it with someone with the sperm mod is pretty much going to have them knock you up.
					weight *= 20;
				}

				return weight;
			};

			let eligibleSlaves;
			if (V.policies.sexualOpenness === 1) {
				eligibleSlaves = V.slaves.filter(s => canImpreg(V.PC, s) && App.Utils.sexAllowed(V.PC, s) && isSlaveAvailable(s) && canAchieveErection(s) && s.devotion > 20 && raceIsAcceptable);
			} else {
				eligibleSlaves = V.slaves.filter(s => canImpreg(V.PC, s) && isSlaveAvailable(s) && s.toyHole === ToyHole.DICK);
			}
			const dadHash = eligibleSlaves.reduce((acc, cur, i) => Object.assign(acc, {[i]: score(cur)}), {});
			const chosenDadIndex = hashChoice(dadHash);
			if (chosenDadIndex) {
				tryKnockMeUp(PC, 100, 2, eligibleSlaves[chosenDadIndex]);
			}
		}
		if (canGetPregnant(PC) && !onBedRest(PC, true) && !isPCCareerInCategory("servant")) {
			// Sperm mod leavings around the penthouse. Gives servants more of a point too.
			let slobs = V.slaves.filter(s => isSlaveAvailable(s) && s.geneMods.aggressiveSperm === 1 && (s.fetish === Fetish.MINDBROKEN || s.energy > 95 || (s.devotion < -20 && s.trust > 20) || (s.intelligence + s.intelligenceImplant < -10)));
			if (slobs.length > (totalServantCapacity() / 5)) {
				tryKnockMeUp(PC, -50, 2, slobs.random());
			}
		}
	}

	function autoImpregnation() {
		tryKnockMeUp(PC, 100, 2, PC);
		if (PC.geneticQuirks.superfetation === 2 && PC.pregKnown === 1) {
			if (V.geneticMappingUpgrade === 0 && PC.counter.birthsTotal === 0) {
				r.push(`You are wracked with frequent spontaneous orgasms from your asexual reproduction modifications despite already being pregnant.`);
			} else {
				r.push(`Your asexual reproduction modifications don't care that you've already got a bun in the oven, a fact made clear as they force you into adding <span class="pregnant">yet another child into your increasingly crowded womb.</span> At this rate, you will spend the rest of your fertile years as a constantly pregnant broodmother.`);
			}
		} else {
			r.push(`Your asexual reproduction modifications leaves you writhing in constant orgasm for a short time. You are only released once you've <span class="pregnant">thoroughly impregnated yourself.</span>`);
			PC.pregKnown = 1;
		}
	}

	function pregnancySanityCheck() { // PREGNANCY TYPE SANITY CHECK (not for pregnancies started above)
		if (PC.preg <= 0) {
			if (PC.pregType !== 0) {
				WombFlush(PC);
			}
		} else if (PC.preg > 0 && PC.pregType === 0) {
			PC.pregType = setPregType(PC);
			WombImpregnate(PC, PC.pregType, PC.pregSource, 1);
		}
		if (PC.readyOva !== 0) {
			PC.readyOva = 0;
		}
	}
};
