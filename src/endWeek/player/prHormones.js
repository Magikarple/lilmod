App.EndWeek.Player.hormones = function(PC, selfManufactured, hormonePower) {
	const r = [];

	const gigantomastiaMod = PC.geneticQuirks.gigantomastia === 2 ? (PC.geneticQuirks.macromastia === 2 ? 3 : 2) : 1;
	const rearLipedemaMod = PC.geneticQuirks.rearLipedema === 2 ? 1 : 0;
	const boobSize = App.Medicine.fleshSize(PC, 'boobs');
	const buttSize = App.Medicine.fleshSize(PC, 'butt');
	let normBreasts;
	let normButt;
	const faceValue = PC.face - PC.faceImplant;
	const effects = [];
	/** @type {FC.Zeroable<string>} */
	let faceShape = 0;
	let faceInc = 0;

	hormoneBalance();
	if (V.hormoneUpgradeMood === 0 || !selfManufactured) {
		moodConflict();
	}
	if (PC.physicalAge >= 18 || V.loliGrow === 0 || PC.geneMods.NCS === 1 || V.playerAging < 2) {
		hormonesEffects();
	}

	return r.join(" ");

	function hormoneBalance() {
		if (PC.hormoneBalance <= -400) {
			r.push(`You are overflowing with masculine hormones`);
			if (PC.hormones === 1) {
				r.push(`and taking female ones in an attempt to balance things out.`);
			} else if (PC.hormones === -1) {
				r.push(r.pop() + `, supported through your continued use of artificial ones.`);
			} else {
				r.push(r.pop() + `, but lack the means to maintain such a state and will slowly regress to a more normal balance over time.`);
			}
		} else if (PC.hormoneBalance <= -300) {
			r.push(`Your system is completely flooded with male hormones`);
		} else if (PC.hormoneBalance <= -200) {
			r.push(`Your body is awash with masculine hormones`);
		} else if (PC.hormoneBalance <= -100) {
			r.push(`Your hormone balance is overly masculine`);
		} else if (PC.hormoneBalance < -20) {
			if (PC.hormones === 0 && PC.genes === GenderGenes.MALE) {
				r.push(`Your hormone balance is normal.`);
			} else {
				r.push(`You have a masculine hormone balance`);
				if (PC.hormones === 1) {
					r.push(r.pop() + `, but are taking female ones in an attempt to become feminine.`);
				} else if (PC.hormones === -1) {
					r.push(`being supplemented by your use of artificial hormones.`);
				} else {
					r.push(r.pop() + `.`);
				}
			}
		} else if (PC.hormoneBalance >= 400) {
			r.push(`You are overflowing with feminine hormones`);
			if (PC.hormones === -1) {
				r.push(`and taking male ones in an attempt to balance things out.`);
			} else if (PC.hormones === 1) {
				r.push(r.pop() + `, supported through your continued use of artificial ones.`);
			} else {
				r.push(r.pop() + `, but lack the means to maintain such a state and will slowly regress to a more normal balance over time.`);
			}
		} else if (PC.hormoneBalance >= 300) {
			r.push(`Your system is completely flooded with female hormones`);
		} else if (PC.hormoneBalance >= 200) {
			r.push(`Your body is awash with feminine hormones`);
		} else if (PC.hormoneBalance >= 100) {
			r.push(`Your hormone balance is overly feminine`);
		} else if (PC.hormoneBalance > 20) {
			if (PC.hormones === 0 && PC.genes === GenderGenes.FEMALE) {
				r.push(`Your hormone balance is normal.`);
			} else {
				r.push(`You have a feminine hormone balance`);
				if (PC.hormones === -1) {
					r.push(r.pop() + `, but are taking male ones in an attempt to become more masculine.`);
				} else if (PC.hormones === 1) {
					r.push(`being supplemented by your use of artificial hormones.`);
				} else {
					r.push(r.pop() + `.`);
				}
			}
		} else {
			r.push(`Your hormone balance is very androgynous`);
			if (PC.hormones === -1) {
				r.push(r.pop() + `, but you are taking male hormones in an attempt to become more masculine.`);
			} else if (PC.hormones === 1) {
				r.push(r.pop() + `, but you are taking female hormones in an attempt to become more feminine.`);
			} else {
				r.push(r.pop() + `.`);
			}
		}
		if (PC.hormoneBalance > -400 && PC.hormoneBalance <= -100) {
			if (PC.hormones === 1) {
				r.push(r.pop() + `, but you are taking female ones in an attempt to balance things out.`);
			} else if (PC.hormones === -1) {
				r.push(`and further bolstered by your use of artificial ones.`);
			} else {
				r.push(r.pop() + `, but will slowly regress to a more normal balance unless supplemented.`);
			}
		} else if (PC.hormoneBalance < 400 && PC.hormoneBalance >= 100) {
			if (PC.hormones === -1) {
				r.push(r.pop() + `, but you are taking male ones in an attempt to balance things out.`);
			} else if (PC.hormones === 1) {
				r.push(`and further bolstered by your use of artificial ones.`);
			} else {
				r.push(r.pop() + `, but will slowly regress to a more normal balance unless supplemented.`);
			}
		}
	}

	function moodConflict() {
		if ((PC.hormoneBalance > 20 && PC.genes === GenderGenes.MALE && PC.balls !== 0 && PC.ballType !== "sterile") || (PC.hormoneBalance < -20 && PC.genes === GenderGenes.FEMALE && (PC.ovaries !== 0 || PC.mpreg !== 0))) {
			r.push(`Your altered hormonal balance conflicts with your natural hormones, causing occasional moodiness.`);
			if (PC.energy > 10) {
				r.push(`These clashing hormones also have the frustrating effect of <span class="libido dec">disrupting your sex drive.</span>`);
				PC.energy--;
			}
		}
	}

	function hormonesEffects() {
		if (Math.abs(PC.hormoneBalance) >= 50) {
			if (PC.hormoneBalance > 30 && PC.geneMods.NCS !== 1) {
				const slimModBreasts = (V.arcologies[0].FSSlimnessEnthusiastFoodLaw === 1 && !canEatFood(PC)) ? 0.45 : 1; // 600 average breast target, 270 target, 475 @ 350 hormone
				const slimModButts = (V.arcologies[0].FSSlimnessEnthusiastFoodLaw === 1 && !canEatFood(PC)) ? 0.6 : 1; // 2.5 average butt, 1.5 target
				/* 'Expected' breast size based on weight for feminine-bodied player. Masculine-bodied takes a small hit. */
				normBreasts = Math.trunc((100 + (PC.weight + 100) * 5 + 2 * PC.lactationAdaptation) * (0.85 + PC.hormoneBalance / 400) * gigantomastiaMod * slimModBreasts / Math.max(PC.title * 1.25, 1));
				normButt = ((PC.weight + 100) * 0.025 * (0.9 + PC.hormoneBalance / 600) * (rearLipedemaMod / 2 + 1) * slimModButts / Math.max(PC.title * 1.10, 1));
			}

			if (PC.hormoneBalance >= 350) {
				if (PC.geneMods.NCS === 1) {
					if ((PC.shoulders + Math.abs(PC.shouldersImplant)) > -1 && PC.shoulders > -2 && random(1, 100) < (40 + (20 * hormonePower))) {
						effects.push(`<span class="change positive">shoulders to narrow`);
						PC.shoulders--;
					}
				} else if (PC.physicalAge < 25) {
					if (PC.shoulders + Math.abs(PC.shouldersImplant) > -1 && PC.shoulders > -2 && random(1, 100) < 20 + (10 * hormonePower)) {
						effects.push(`<span class="change positive">shoulders to narrow`);
						PC.shoulders--;
					}
					if (PC.geneMods.NCS === 0 && PC.hips - (Math.abs(PC.hipsImplant)) < 1 && PC.hips < 2 && random(1, 100) <= 20 + (10 * hormonePower)) {
						effects.push(`<span class="change positive">hips to widen`);
						PC.hips++;
					}
				}

				if (PC.faceImplant < 5) {
					if (PC.faceShape === FaceShape.MASC) {
						faceShape = FaceShape.ANDRO;
					} else if (PC.faceShape === FaceShape.ANDRO && PC.geneticQuirks.androgyny !== 2) {
						faceShape = FaceShape.NORMAL;
					} else if (PC.geneMods.NCS === 1 && random(1, 100) > 50 && PC.faceShape === FaceShape.NORMAL) {
						faceShape = FaceShape.CUTE;
					}
				}
				if (faceValue < 50 && PC.face < 75) {
					effects.push(`<span class="change positive">facial structure to soften`);
					faceInc = 1 + hormonePower;
					if (PC.geneMods.NCS === 1 && random(1, 100) > 50) {
						faceInc *= 2;
					}
					faceIncreaseAction(PC, faceInc);
				}

				if (PC.voice.isBetween(0, 3)) {
					effects.push(`<span class="change positive">voice to heighten`);
					PC.voice++;
				}

				if (PC.muscles > 10 && PC.diet !== PCDiet.MUSCLE && PC.drugs !== Drug.STEROID && (PC.geneticQuirks.mGain !== 2 || PC.geneticQuirks.mLoss === 2)) {
					effects.push(`<span class="change negative">muscles to lose mass`);
					PC.muscles -= 2 + hormonePower + PC.geneticQuirks.mLoss;
					if (PC.geneMods.NCS === 1 && random(1, 100) > 50) {
						PC.muscles -= 2 + hormonePower + PC.geneticQuirks.mLoss;
					}
				}
				if (PC.waist > -30) {
					effects.push(`<span class="change positive">waist to narrow`);
					PC.waist = Math.clamp(PC.waist - (2 + hormonePower), -30, 100);
				}

				if (PC.geneMods.NCS === 0) {
					if (boobSize < 0.9 * normBreasts) {
						/* Grow to 90% of normBreasts */
						effects.push(`<span class="change positive">breasts to slightly grow`);
						PC.boobs += 25;
					}
					if (PC.nipples === NippleShape.TINY) {
						effects.push(`<span class="change positive">tiny nipples to enlarge`);
						PC.nipples = NippleShape.CUTE;
					}
					if (buttSize < Math.trunc(4.5 * normButt) / 5) {
						/* 90% of normButt, rounded down to the next increment of .2 */
						effects.push(`<span class="change positive">butt to swell`);
						PC.butt += 0.2;
					}
				}
				if (PC.vagina !== -1 && PC.ovaries !== 0 && PC.vaginaLube < 2) {
					effects.push(`<span class="change positive">pussy to produce more lubricant`);
					PC.vaginaLube++;
				}

				if (V.hormoneUpgradeShrinkage === 0 || !selfManufactured) {
					if (PC.dick > 1) {
						if (PC.geneMods.NCS === 1 && random(1, 100) > 50 && PC.dick > 2) {
							effects.push(`<span class="change negative">dick to greatly shrink`);
							PC.dick -= 1;
						} else {
							effects.push(`<span class="change negative">dick to shrink`);
						}
						PC.dick--;
					}
					if (PC.balls > 1) {
						if (PC.geneMods.NCS === 1 && random(1, 100) > 50 && PC.balls > 2) {
							effects.push(`<span class="change negative">testicles to heavily atrophy`);
							PC.balls -= 1;
						} else {
							effects.push(`<span class="change negative">testicles to atrophy`);
						}
						PC.balls--;
					}
					if (PC.clit > 0) {
						if (PC.geneMods.NCS === 1 && random(1, 100) > 50 && PC.clit > 1) {
							effects.push(`<span class="change negative">clit to greatly shrink`);
							PC.clit -= 1;
						} else {
							effects.push(`<span class="change negative">clit to shrink`);
						}
						PC.clit--;
					}
				}
			} else if (PC.hormoneBalance >= 300) {
				if (PC.faceImplant < 5) {
					if (PC.faceShape === FaceShape.MASC) {
						faceShape = FaceShape.ANDRO;
					} else if (PC.faceShape === FaceShape.ANDRO && PC.geneticQuirks.androgyny !== 2) {
						faceShape = FaceShape.NORMAL;
					} else if (PC.geneMods.NCS === 1 && random(1, 100) > 50 && PC.faceShape === FaceShape.NORMAL) {
						faceShape = FaceShape.CUTE;
					}
				}
				if (faceValue < 30 && PC.face < 60) {
					effects.push(`<span class="change positive">facial structure to soften`);
					faceInc = 1 + hormonePower;
					if (PC.geneMods.NCS === 1 && random(1, 100) > 50) {
						faceInc *= 2;
					}
					faceIncreaseAction(PC, faceInc);
				}

				if (PC.voice.isBetween(0, 3)) {
					effects.push(`<span class="change positive">voice to heighten`);
					PC.voice++;
				}

				if (PC.muscles > 30 && PC.diet !== PCDiet.MUSCLE && PC.drugs !== Drug.STEROID && (PC.geneticQuirks.mGain !== 2 || PC.geneticQuirks.mLoss === 2)) {
					effects.push(`<span class="change negative">muscles to lose mass`);
					PC.muscles -= 2 + hormonePower + PC.geneticQuirks.mLoss;
					if (PC.geneMods.NCS === 1 && random(1, 100) > 50) {
						PC.muscles -= 2 + hormonePower + PC.geneticQuirks.mLoss;
					}
				}
				if (PC.waist > -10) {
					effects.push(`<span class="change positive">waist to narrow`);
					PC.waist = Math.clamp(PC.waist - (2 + hormonePower), -10, 100);
				}

				if (PC.geneMods.NCS === 0) {
					if (boobSize < 0.8 * normBreasts) {
						/* Grow to 80% of expected */
						effects.push(`<span class="change positive">breasts to slightly grow`);
						PC.boobs += 25;
					}
					if (PC.nipples === NippleShape.TINY) {
						effects.push(`<span class="change positive">tiny nipples to enlarge`);
						PC.nipples = NippleShape.CUTE;
					}
					if (buttSize < Math.trunc(4 * normButt) / 5) {
						/* 80% of normButt, rounded down to the next increment of .2 */
						effects.push(`<span class="change positive">butt to swell`);
						PC.butt += 0.2;
					}
				}
				if (PC.vagina !== -1 && PC.ovaries !== 0 && PC.vaginaLube < 2) {
					effects.push(`<span class="change positive">pussy to produce more lubricant`);
					PC.vaginaLube++;
				}

				if (V.hormoneUpgradeShrinkage === 0) {
					if (PC.dick > 1) {
						if (PC.geneMods.NCS === 1 && random(1, 100) > 50 && PC.dick > 2) {
							effects.push(`<span class="change negative">dick to greatly shrink`);
							PC.dick -= 1;
						} else {
							effects.push(`<span class="change negative">dick to shrink`);
						}
						PC.dick--;
					}
					if (PC.balls > 1) {
						if (PC.geneMods.NCS === 1 && random(1, 100) > 50 && PC.balls > 2) {
							effects.push(`<span class="change negative">testicles to heavily atrophy`);
							PC.balls -= 1;
						} else {
							effects.push(`<span class="change negative">testicles to atrophy`);
						}
						PC.balls--;
					}
					if (PC.clit > 0) {
						if (PC.geneMods.NCS === 1 && random(1, 100) > 50 && PC.clit > 1) {
							effects.push(`<span class="change negative">clit to greatly shrink`);
							PC.clit -= 1;
						} else {
							effects.push(`<span class="change negative">clit to shrink`);
						}
						PC.clit--;
					}
				}
			} else if (PC.hormoneBalance >= 250) {
				if (PC.faceImplant < 5) {
					if (PC.faceShape === FaceShape.MASC) {
						faceShape = FaceShape.ANDRO;
					} else if (PC.faceShape === FaceShape.ANDRO && PC.geneticQuirks.androgyny !== 2) {
						faceShape = FaceShape.NORMAL;
					} else if (PC.geneMods.NCS === 1 && random(1, 100) > 50 && PC.faceShape === FaceShape.NORMAL) {
						faceShape = FaceShape.CUTE;
					}
				}
				if (faceValue < 10 && PC.face < 30) {
					effects.push(`<span class="change positive">facial structure to soften`);
					faceInc = 1 + hormonePower;
					if (PC.geneMods.NCS === 1 && random(1, 100) > 50) {
						faceInc *= 2;
					}
					faceIncreaseAction(PC, faceInc);
				}

				if (PC.voice.isBetween(0, 2)) {
					effects.push(`<span class="change positive">voice to heighten`);
					PC.voice++;
				}

				if (PC.muscles > 30 && PC.diet !== PCDiet.MUSCLE && PC.drugs !== Drug.STEROID && (PC.geneticQuirks.mGain !== 2 || PC.geneticQuirks.mLoss === 2)) {
					effects.push(`<span class="change negative">muscles to lose mass`);
					PC.muscles -= 2 + hormonePower + PC.geneticQuirks.mLoss;
					if (PC.geneMods.NCS === 1 && random(1, 100) > 50) {
						PC.muscles -= 2 + hormonePower + PC.geneticQuirks.mLoss;
					}
				}
				if (PC.waist > 0) {
					effects.push(`<span class="change positive">waist to narrow`);
					PC.waist = Math.clamp(PC.waist - (2 + hormonePower), 0, 100);
				}

				if (PC.geneMods.NCS === 0) {
					if (boobSize < 0.7 * normBreasts) {
						/* Grow to 70% of expected */
						effects.push(`<span class="change positive">breasts to slightly grow`);
						PC.boobs += 25;
					}
					if (PC.nipples === NippleShape.TINY) {
						effects.push(`<span class="change positive">tiny nipples to enlarge`);
						PC.nipples = NippleShape.CUTE;
					}
					if (buttSize < Math.trunc(3.5 * normButt) / 5) {
						/* 70% of normButt, rounded down to the next increment of .2 */
						effects.push(`<span class="change positive">butt to swell`);
						PC.butt += 0.2;
					}
				}
				if (PC.vagina !== -1 && PC.ovaries !== 0 && PC.vaginaLube < 1) {
					effects.push(`<span class="change positive">pussy to produce more lubricant`);
					PC.vaginaLube++;
				}

				if (V.hormoneUpgradeShrinkage === 0 || !selfManufactured) {
					if (PC.dick > 2) {
						if (PC.geneMods.NCS === 1 && random(1, 100) > 50) {
							effects.push(`<span class="change negative">dick to greatly shrink`);
							PC.dick -= 1;
						} else {
							effects.push(`<span class="change negative">dick to shrink`);
						}
						PC.dick--;
					}
					if (PC.balls > 2) {
						if (PC.geneMods.NCS === 1 && random(1, 100) > 50) {
							effects.push(`<span class="change negative">testicles to heavily atrophy`);
							PC.balls -= 1;
						} else {
							effects.push(`<span class="change negative">testicles to atrophy`);
						}
						PC.balls--;
					}
					if (PC.clit > 1) {
						if (PC.geneMods.NCS === 1 && random(1, 100) > 50) {
							effects.push(`<span class="change negative">clit to greatly shrink`);
							PC.clit -= 1;
						} else {
							effects.push(`<span class="change negative">clit to shrink`);
						}
						PC.clit--;
					}
				}
			} else if (PC.hormoneBalance >= 200) {
				if (PC.faceImplant < 5) {
					if (PC.faceShape === FaceShape.MASC) {
						faceShape = FaceShape.ANDRO;
					} else if (PC.geneMods.NCS === 1 && random(1, 100) > 50 && PC.faceShape === FaceShape.ANDRO && PC.geneticQuirks.androgyny !== 2) {
						faceShape = FaceShape.NORMAL;
					}
				}
				if (faceValue < 0 && PC.face < 0) {
					r.push(`<span class="change positive">facial structure to soften`);
					faceInc = 1 + hormonePower;
					if (PC.geneMods.NCS === 1 && random(1, 100) > 50) {
						faceInc *= 2;
					}
					faceIncreaseAction(PC, faceInc);
				}

				if (PC.voice.isBetween(0, 2)) {
					r.push(`<span class="change positive">voice to heighten`);
					PC.voice++;
				}

				if (PC.muscles > 30 && PC.diet !== PCDiet.MUSCLE && PC.drugs !== Drug.STEROID && (PC.geneticQuirks.mGain !== 2 || PC.geneticQuirks.mLoss === 2)) {
					r.push(`<span class="change negative">muscles to lose mass`);
					PC.muscles -= 2 + hormonePower + PC.geneticQuirks.mLoss;
					if (PC.geneMods.NCS === 1 && random(1, 100) > 50) {
						PC.muscles -= 2 + hormonePower + PC.geneticQuirks.mLoss;
					}
				}
				if (PC.waist > 10) {
					r.push(`<span class="change positive">waist to narrow`);
					PC.waist = Math.clamp(PC.waist - (2 + hormonePower), 10, 100);
				}

				if (PC.geneMods.NCS === 0) {
					if (boobSize < 0.6 * normBreasts) {
						/* Grow to 60% of expected */
						effects.push(`<span class="change positive">breasts to slightly grow`);
						PC.boobs += 25;
					}
					if (PC.nipples === NippleShape.TINY) {
						effects.push(`<span class="change positive">tiny nipples to enlarge`);
						PC.nipples = NippleShape.CUTE;
					}
					if (buttSize < Math.trunc(3 * normButt) / 5) {
						/* 60% of normButt, rounded down to the next increment of .2 */
						effects.push(`<span class="change positive">butt to swell`);
						PC.butt += 0.2;
					}
				}
				if (PC.vagina !== -1 && PC.ovaries !== 0 && PC.vaginaLube < 1) {
					effects.push(`<span class="change positive">pussy to produce more lubricant`);
					PC.vaginaLube++;
				}

				if (V.hormoneUpgradeShrinkage === 0 || !selfManufactured) {
					if (PC.dick > 3) {
						if (PC.geneMods.NCS === 1 && random(1, 100) > 50) {
							effects.push(`<span class="change negative">dick to greatly shrink`);
							PC.dick -= 1;
						} else {
							effects.push(`<span class="change negative">dick to shrink`);
							PC.dick--;
						}
					}
					if (PC.balls > 3) {
						if (PC.geneMods.NCS === 1 && random(1, 100) > 50) {
							effects.push(`<span class="change negative">testicles to heavily atrophy`);
							PC.balls -= 1;
						} else {
							effects.push(`<span class="change negative">testicles to atrophy`);
						}
						PC.balls--;
					}
					if (PC.clit > 2) {
						if (PC.geneMods.NCS === 1 && random(1, 100) > 50) {
							effects.push(`<span class="change negative">clit to greatly shrink`);
							PC.clit -= 1;
						} else {
							effects.push(`<span class="change negative">clit to shrink`);
						}
						PC.clit--;
					}
				}
			} else if (PC.hormoneBalance >= 100) {
				if (PC.faceImplant < 5) {
					if (PC.geneMods.NCS === 1 && random(1, 100) > 50 && PC.faceShape === FaceShape.MASC) {
						faceShape = FaceShape.ANDRO;
					}
				}

				if (PC.geneMods.NCS === 0) {
					if (boobSize < 0.5 * normBreasts) {
						/* Grow to 50% of expected */
						r.push(`<span class="change positive">breasts to slightly grow`);
						PC.boobs += 25;
					}
				}
			} else if (PC.hormoneBalance >= 50) {
				// possible attraction stuff here
			} else if (PC.hormoneBalance <= -350) {
				if (PC.geneMods.NCS === 1) {
					if (PC.hips + Math.abs(PC.hipsImplant) > -1 && PC.hips > -2 && (random(1, 100) <= 20 + (10 * hormonePower))) {
						effects.push(`<span class="change positive">hips to narrow`);
						PC.hips--;
					}
				} else if (PC.physicalAge < 25) {
					if ((PC.shoulders - (Math.abs(PC.shouldersImplant)) < 1) && (PC.shoulders < 2) && (random(1, 100) < 20 + (10 * hormonePower))) {
						effects.push(`<span class="change positive">shoulders to widen`);
						PC.shoulders++;
					}
					if ((PC.hips + (Math.abs(PC.hipsImplant)) > -1) && (PC.hips > -2) && (random(1, 100) <= 20 + (10 * hormonePower))) {
						effects.push(`<span class="change positive">hips to narrow`);
						PC.hips--;
					}
				}

				if (PC.geneMods.NCS === 0) {
					if (PC.faceImplant < 5) {
						if (PC.geneticQuirks.androgyny !== 2) {
							if (PC.faceShape === FaceShape.ANDRO) {
								faceShape = FaceShape.MASC;
							} else if (PC.faceShape !== FaceShape.MASC) {
								faceShape = FaceShape.ANDRO;
							}
						}
					}
					if (faceValue.isBetween(0, 100)) {
						effects.push(`<span class="change positive">facial structure to harden`);
						const faceDec = 1 + hormonePower;
						PC.face = Math.clamp(PC.face - faceDec, -100, 100);
					}
					if (PC.voice > 1) {
						effects.push(`<span class="change positive">voice to deepen`);
						PC.voice--;
					}
				}

				if (V.hormoneUpgradeShrinkage === 0 || !selfManufactured) {
					if (buttSize > 1 && rearLipedemaMod === 0) {
						if (PC.geneMods.NCS === 1 && random(1, 100) > 50 && buttSize > 2) {
							effects.push(`<span class="change negative">butt to greatly diminish`);
							PC.butt--;
						} else {
							effects.push(`<span class="change negative">butt to diminish`);
						}
						PC.butt--;
					}
					if (boobSize > 100 * gigantomastiaMod && gigantomastiaMod !== 3) {
						if (PC.geneMods.NCS === 1 && random(1, 100) > 50 && boobSize > 200) {
							effects.push(`<span class="change negative">breasts to shrink`);
							PC.boobs -= 10 + (15 * hormonePower);
						} else {
							effects.push(`<span class="change negative">breasts to slightly shrink`);
						}
						PC.boobs -= 10 + (15 * hormonePower);
					}
				}
				if (PC.geneMods.NCS === 1 && PC.nipples === NippleShape.TINY) {
					/* nothing, just don't advance to cute */
				} else if (PC.nipples !== NippleShape.TINY && PC.nipples !== NippleShape.FUCKABLE && PC.nipples !== NippleShape.FLAT) {
					effects.push(`<span class="change positive">nipples to become more masculine`);
					PC.nipples = NippleShape.TINY;
				}

				if (PC.geneMods.NCS === 0) {
					if (PC.dick.isBetween(0, 5)) {
						effects.push(`<span class="change positive">dick to swell`);
						PC.dick++;
					}
					if (PC.balls.isBetween(0, 5)) {
						effects.push(`<span class="change positive">balls to grow`);
						PC.balls++;
					}

					if (PC.clit < 5 && PC.dick === 0 && PC.vagina !== -1) {
						effects.push(`<span class="change positive">clit to swell`);
						PC.clit++;
					}
					if (PC.vagina > -1 && PC.vaginaLube > 0) {
						effects.push(`<span class="change negative">vagina to dry out`);
						PC.vaginaLube--;
					}

					if (PC.muscles <= 50 && PC.diet !== PCDiet.SLIM) {
						effects.push(`<span class="change negative">muscles to gain mass`);
						PC.muscles += 2 + hormonePower + PC.geneticQuirks.mGain;
					}
					if (PC.waist < 80) {
						effects.push(`<span class="change positive">waist to broaden`);
						PC.waist = Math.clamp(PC.waist + 2 + hormonePower, -100, 80);
					}
				}
			} else if (PC.hormoneBalance <= -300) {
				if (PC.geneMods.NCS === 0) {
					if (PC.faceImplant < 5) {
						if (PC.geneticQuirks.androgyny !== 2) {
							if (PC.faceShape === FaceShape.ANDRO) {
								faceShape = FaceShape.MASC;
							} else if (PC.faceShape !== FaceShape.MASC) {
								faceShape = FaceShape.ANDRO;
							}
						}
					}

					if (PC.voice > 1) {
						effects.push(`<span class="change positive">voice to deepen`);
						PC.voice--;
					}
				}

				if (V.hormoneUpgradeShrinkage === 0 || !selfManufactured) {
					if (buttSize > 1 && rearLipedemaMod === 0) {
						if (PC.geneMods.NCS === 1 && random(1, 100) > 50 && buttSize > 2) {
							effects.push(`<span class="change negative">butt to greatly diminish`);
							PC.butt--;
						} else {
							effects.push(`<span class="change negative">butt to diminish`);
						}
						PC.butt--;
					}
					if (boobSize > 300 * gigantomastiaMod && gigantomastiaMod !== 3) {
						if (PC.geneMods.NCS === 1 && random(1, 100) > 50) {
							effects.push(`<span class="change negative">breasts to shrink`);
							PC.boobs -= 10 + (15 * hormonePower);
						} else {
							effects.push(`<span class="change negative">breasts to slightly shrink`);
						}
						PC.boobs -= 10 + (15 * hormonePower);
					}
				}
				if (PC.geneMods.NCS === 1 && PC.nipples === NippleShape.TINY) {
					/* nothing, just don't advance to cute */
				} else if (PC.nipples !== NippleShape.TINY && PC.nipples !== NippleShape.FUCKABLE && PC.nipples !== NippleShape.FLAT) {
					effects.push(`<span class="change positive">nipples to become more masculine`);
					PC.nipples = NippleShape.TINY;
				}

				if (PC.geneMods.NCS === 0) {
					if (PC.dick.isBetween(0, 5)) {
						effects.push(`<span class="change positive">dick to swell`);
						PC.dick++;
					}
					if (PC.balls.isBetween(0, 5) && PC.ballType !== "sterile") {
						effects.push(`<span class="change positive">balls to grow`);
						PC.balls++;
					}

					if (PC.clit < 4 && PC.dick === 0 && PC.vagina !== -1) {
						effects.push(`<span class="change positive">clit to swell`);
						PC.clit++;
					}
					if (PC.vagina > -1 && PC.vaginaLube > 0) {
						effects.push(`<span class="change negative">vagina to dry out`);
						PC.vaginaLube--;
					}

					if (PC.muscles <= 50 && PC.diet !== PCDiet.SLIM) {
						effects.push(`<span class="change negative">muscles to gain mass`);
						PC.muscles += 2 + hormonePower + PC.geneticQuirks.mGain;
					}
					if (PC.waist < 40) {
						effects.push(`<span class="change positive">waist to broaden`);
						PC.waist = Math.clamp(PC.waist + 2 + hormonePower, -100, 40);
					}
				}
			} else if (PC.hormoneBalance <= -250) {
				if (PC.geneMods.NCS === 0) {
					if (PC.faceImplant < 5) {
						if (PC.faceShape !== FaceShape.MASC && PC.faceShape !== FaceShape.ANDRO) {
							faceShape = FaceShape.ANDRO;
						}
					}

					if (PC.voice > 1) {
						effects.push(`<span class="change positive">voice to deepen`);
						PC.voice--;
					}
				}

				if (V.hormoneUpgradeShrinkage === 0 || !selfManufactured) {
					if (buttSize > 2 && rearLipedemaMod === 0) {
						if (PC.geneMods.NCS === 1 && random(1, 100) > 50) {
							effects.push(`<span class="change negative">butt to greatly diminish`);
							PC.butt--;
						} else {
							effects.push(`<span class="change negative">butt to diminish`);
						}
						PC.butt--;
					}
					if (boobSize > 400 * gigantomastiaMod && gigantomastiaMod !== 3) {
						if (PC.geneMods.NCS === 1 && random(1, 100) > 50) {
							effects.push(`<span class="change negative">breasts to shrink`);
							PC.boobs -= 10 + (15 * hormonePower);
						} else {
							effects.push(`<span class="change negative">breasts to slightly shrink`);
						}
						PC.boobs -= 10 + (15 * hormonePower);
					}
				}
				if (PC.geneMods.NCS === 1 && PC.nipples === NippleShape.TINY) {
					/* nothing, just don't advance to cute */
				} else if (PC.nipples !== NippleShape.TINY && PC.nipples !== NippleShape.FUCKABLE && PC.nipples !== NippleShape.FLAT) {
					effects.push(`<span class="change positive">nipples to become more masculine`);
					PC.nipples = NippleShape.TINY;
				}

				if (PC.geneMods.NCS === 0) {
					if (PC.dick.isBetween(0, 4)) {
						effects.push(`<span class="change positive">dick to swell`);
						PC.dick++;
					}
					if (PC.balls.isBetween(0, 4) && PC.ballType !== "sterile") {
						effects.push(`<span class="change positive">balls to grow`);
						PC.balls++;
					}

					if (PC.clit < 3 && PC.dick === 0 && PC.vagina !== -1) {
						effects.push(`<span class="change positive">clit to swell`);
						PC.clit++;
					}
					if (PC.vagina > -1 && PC.vaginaLube > 0) {
						effects.push(`<span class="change negative">vagina to dry out`);
						PC.vaginaLube--;
					}

					if (PC.muscles <= 35 && PC.diet !== PCDiet.SLIM) {
						effects.push(`<span class="change negative">muscles to gain mass`);
						PC.muscles += 2 + hormonePower + PC.geneticQuirks.mGain;
					}
					if (PC.waist < 25) {
						effects.push(`<span class="change positive">waist to broaden`);
						PC.waist = Math.clamp(PC.waist + 2 + hormonePower, -100, 25);
					}
				}
			} else if (PC.hormoneBalance <= -200) {
				if (PC.geneMods.NCS === 0) {
					if (PC.faceImplant < 5) {
						if (PC.faceShape !== FaceShape.MASC && PC.faceShape !== FaceShape.ANDRO) {
							faceShape = FaceShape.ANDRO;
						}
					}

					if (PC.voice > 2) {
						effects.push(`<span class="change positive">voice to deepen`);
						PC.voice--;
					}
				}

				if (V.hormoneUpgradeShrinkage === 0 || !selfManufactured) {
					if (buttSize > 3 && rearLipedemaMod === 0) {
						if (PC.geneMods.NCS === 1 && random(1, 100) > 50) {
							effects.push(`<span class="change negative">butt to greatly diminish`);
							PC.butt--;
						} else {
							effects.push(`<span class="change negative">butt to diminish`);
						}
						PC.butt--;
					}
					if (boobSize > 600 * gigantomastiaMod && gigantomastiaMod !== 3) {
						if (PC.geneMods.NCS === 1 && random(1, 100) > 50) {
							effects.push(`<span class="change negative">breasts to shrink`);
							PC.boobs -= 10 + (15 * hormonePower);
						} else {
							effects.push(`<span class="change negative">breasts to slightly shrink`);
						}
						PC.boobs -= 10 + (15 * hormonePower);
					}
				}
				if (PC.nipples === NippleShape.HUGE || PC.nipples === NippleShape.PUFFY) {
					effects.push(`<span class="change positive">nipples to become more masculine`);
					PC.nipples = NippleShape.CUTE;
				}

				if (PC.geneMods.NCS === 0) {
					if (PC.dick.isBetween(0, 3)) {
						effects.push(`<span class="change positive">dick to swell`);
						PC.dick++;
					}
					if (PC.balls.isBetween(0, 3) && PC.ballType !== "sterile") {
						effects.push(`<span class="change positive">balls to grow`);
						PC.balls++;
					}

					if (PC.clit < 2 && PC.dick === 0 && PC.vagina !== -1) {
						effects.push(`<span class="change positive">clit to swell`);
						PC.clit++;
					}
					if (PC.vagina > -1 && PC.vaginaLube > 0) {
						effects.push(`<span class="change negative">vagina to dry out`);
						PC.vaginaLube--;
					}

					if (PC.muscles <= 15 && PC.diet !== PCDiet.SLIM) {
						effects.push(`<span class="change negative">muscles to gain mass`);
						PC.muscles += 2 + hormonePower + PC.geneticQuirks.mGain;
					}
					if (PC.waist < 9) {
						effects.push(`<span class="change positive">waist to broaden`);
						PC.waist = Math.clamp(PC.waist + 2 + hormonePower, -100, 9);
					}
				}
			} else if (PC.hormoneBalance <= -100) {
				if (PC.geneMods.NCS === 0) {
					if (PC.voice > 2) {
						effects.push(`<span class="change positive">voice to deepen`);
						PC.voice--;
					}
				}

				if (V.hormoneUpgradeShrinkage === 0 || !selfManufactured) {
					if (buttSize > 4 && rearLipedemaMod === 0) {
						if (PC.geneMods.NCS === 1 && random(1, 100) > 50) {
							effects.push(`<span class="change negative">butt to greatly diminish`);
							PC.butt--;
						} else {
							effects.push(`<span class="change negative">butt to diminish`);
						}
						PC.butt--;
					}
					if (boobSize > 800 * gigantomastiaMod && gigantomastiaMod !== 3) {
						if (PC.geneMods.NCS === 1 && random(1, 100) > 50) {
							effects.push(`<span class="change negative">breasts to shrink`);
							PC.boobs -= 10 + (15 * hormonePower);
						} else {
							effects.push(`<span class="change negative">breasts to slightly shrink`);
						}
						PC.boobs -= 10 + (15 * hormonePower);
					}
				}

				if (PC.geneMods.NCS === 0) {
					if (PC.muscles < 0 && PC.diet !== PCDiet.SLIM) {
						effects.push(`<span class="change negative">muscles to gain mass`);
						PC.muscles += 2 + hormonePower + PC.geneticQuirks.mGain;
					}

					if (PC.waist < 0) {
						effects.push(`<span class="change positive">waist to broaden`);
						PC.waist = Math.clamp(PC.waist + 2 + hormonePower, -100, 0);
					}

					if (PC.dick.isBetween(0, 2)) {
						effects.push(`<span class="change positive">dick to grow`);
						PC.dick++;
					}
					if (PC.balls.isBetween(0, 2)) {
						effects.push(`<span class="change positive">balls to drop`);
						PC.balls++;
					}

					if (PC.clit < 1 && PC.dick === 0 && PC.vagina >= 0) {
						effects.push(`<span class="change positive">clit to swell`);
						PC.clit++;
					}
					if (PC.vagina > -1 && PC.vaginaLube > 1) {
						effects.push(`<span class="change negative">vagina to dry out`);
						PC.vaginaLube--;
					}
				}
			} else if (PC.hormoneBalance <= -50) {
				// possible attraction stuff here
			}
		}

		if (effects.length > 0) {
			r.push(`Hormonal effects cause your`);
			r.push(effectsListToText(effects));
			r.push(`${r.pop()}.</span>`);
		}
		if (faceShape !== 0) {
			if (effects.length > 0) {
				r.push(`More importantly, they cause`);
			} else {
				r.push(`Hormonal effects cause`);
			}
			if (PC.faceShape === FaceShape.MASC && faceShape === FaceShape.ANDRO) {
				r.push(`<span class="change positive">your face to soften into a state of`);
				if (PC.geneMods.NCS === 1) {
					r.push(`childlike`);
				}
				r.push(`androgyny.</span>`);
			} else if (PC.faceShape === FaceShape.ANDRO && faceShape === FaceShape.NORMAL) {
				r.push(`<span class="change positive">your face to soften into`);
				if (PC.geneMods.NCS === 1) {
					r.push(`childlike normalcy.</span>`);
				} else {
					r.push(`femininity.</span>`);
				}
			} else if (PC.faceShape === FaceShape.ANDRO && faceShape === FaceShape.MASC) {
				r.push(`<span class="change negative">your face to harden into masculinity.</span>`);
			} else if (PC.faceShape === FaceShape.NORMAL && faceShape === FaceShape.CUTE) {
				r.push(`<span class="change positive">your face to soften into a state of sheer cuteness.</span>`);
			} else if (PC.faceShape !== FaceShape.MASC && PC.faceShape !== FaceShape.ANDRO && faceShape === FaceShape.ANDRO) {
				r.push(`<span class="change negative">your face to harden into a state of androgyny.</span>`);
			}
			PC.faceShape = faceShape;
		}
		if ((faceValue >= 50 || PC.face >= 75) && faceInc !== 0) {
			r.push(`Your face is has become quite beautiful, though hormonal treatments <span class="noteworthy">are unlikely to be able to improve it further.</span>`);
		}
	}

	function effectsListToText(effectsList) {
		return effectsList.reduce((res, ch, i, arr) => res + (i === arr.length - 1 ? '</span> and ' : ',</span> ') + ch);
	}
};
