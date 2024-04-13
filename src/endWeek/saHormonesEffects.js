/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.SlaveAssignment.hormonesEffects = function saHormonesEffects(slave) {
	/** @type {string[]} */
	const r = [];
	const gigantomastiaMod = slave.geneticQuirks.gigantomastia === 2 ? (slave.geneticQuirks.macromastia === 2 ? 3 : 2) : 1;
	const rearLipedemaMod = slave.geneticQuirks.rearLipedema === 2 ? 1 : 0;
	const boobSize = App.Medicine.fleshSize(slave, 'boobs');
	const buttSize = App.Medicine.fleshSize(slave, 'butt');
	const faceValue = slave.face - slave.faceImplant;

	const {
		he, him, his, He, His,
	} = getPronouns(slave);

	hormoneBalance(slave);
	if (V.hormoneUpgradeMood === 0) {
		moodConflict(slave);
	}
	if (slave.physicalAge >= 18 || V.loliGrow === 0 || slave.geneMods.NCS === 1) {
		hormonesEffects(slave);
	}
	if (slave.fetish !== Fetish.MINDBROKEN && slave.fuckdoll === 0) {
		hormoneReactions(slave);
	}

	return r.join(" ");

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function hormoneBalance(slave) {
		if (slave.hormoneBalance <= -500) {
			r.push(`${His} hormone balance is absolutely masculine.`);
		} else if (slave.hormoneBalance <= -400) {
			r.push(`${His} hormone balance is overwhelmingly masculine.`);
		} else if (slave.hormoneBalance <= -300) {
			r.push(`${His} hormone balance is extremely masculine.`);
		} else if (slave.hormoneBalance <= -200) {
			r.push(`${His} hormone balance is heavily masculine.`);
		} else if (slave.hormoneBalance <= -100) {
			r.push(`${His} hormone balance is very masculine.`);
		} else if (slave.hormoneBalance < -20) {
			r.push(`${His} hormone balance is masculine.`);
		} else if (slave.hormoneBalance >= 500) {
			r.push(`${His} hormone balance is absolutely feminine.`);
		} else if (slave.hormoneBalance >= 400) {
			r.push(`${His} hormone balance is overwhelmingly feminine.`);
		} else if (slave.hormoneBalance >= 300) {
			r.push(`${His} hormone balance is extremely feminine.`);
		} else if (slave.hormoneBalance >= 200) {
			r.push(`${His} hormone balance is heavily feminine.`);
		} else if (slave.hormoneBalance >= 100) {
			r.push(`${His} hormone balance is very feminine.`);
		} else if (slave.hormoneBalance > 20) {
			r.push(`${His} hormone balance is feminine.`);
		} else {
			r.push(`${He} has a neutral hormone balance.`);
		}
		if (Math.abs(slave.hormones) > 1) {
			slave.chem += 0.5;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function moodConflict(slave) {
		let conflict = false;
		if (slave.hormoneBalance > 20 && slave.genes === GenderGenes.MALE && slave.balls !== 0 && slave.ballType !== "sterile") {
			r.push(`${His} feminine hormonal balance conflicts with ${his} natural hormones,`);
			conflict = true;
		} else if (slave.hormoneBalance < -20 && slave.genes === GenderGenes.FEMALE && (slave.ovaries !== 0 || slave.mpreg !== 0)) {
			r.push(`${His} masculine hormonal balance conflicts with ${his} natural hormones,`);
			conflict = true;
		}

		if (conflict) {
			if (slave.devotion > 50) {
				r.push(`but ${he}'s a good enough slave to suppress the occasional moodiness.`);
			} else {
				r.push(`causing <span class="mediumorchid">occasional moodiness.</span>`);
				slave.devotion -= 1;
			}
			if (slave.energy > 10) {
				r.push(`It also has the unfortunate consequence of <span class="libido dec">damaging ${his} libido.</span>`);
				slave.energy--;
			}
			if (slave.attrXX > 50 || slave.attrXY > 50) {
				r.push(`Even more troubling, ${his} sexual confusion <span class="red">leaves ${him} finding others less attractive.</span>`);
				if (slave.attrXX > 50) {
					slave.attrXX--;
				}
				if (slave.attrXY > 50) {
					slave.attrXY--;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function softenFaceShape(slave) {
		if (slave.faceImplant < 5) {
			if (slave.faceShape === FaceShape.MASC) {
				r.push(`Hormonal effects cause <span class="orange">${his} face to soften into`);
				if (slave.geneMods.NCS === 1) {
					r.push(`childlike`);
				}
				r.push(`androgyny.</span>`);
				slave.faceShape = FaceShape.ANDRO;
			} else if (slave.faceShape === FaceShape.ANDRO && slave.geneticQuirks.androgyny !== 2) {
				r.push(`Hormonal effects cause <span class="lime">${his} face to soften into`);
				if (slave.geneMods.NCS === 1) {
					r.push(`childlike normalcy.</span>`);
				} else {
					r.push(`femininity.</span>`);
				}
				slave.faceShape = FaceShape.NORMAL;
			} else if (slave.geneMods.NCS === 1 && jsRandom(1, 100) > 50 && slave.faceShape === FaceShape.NORMAL) {
				r.push(`Hormonal effects cause <span class="lime">${his} face to soften into childlike cuteness.</span>`);
				slave.faceShape = FaceShape.CUTE;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function softenFace(slave) {
		r.push(`Hormonal effects cause <span class="lime">${his} facial structure to soften and become ${slave.face >= 0 ? "more attractive" : "less unattractive"}.</span>`);
		let faceInc = 1 + V.hormoneUpgradePower;
		if (slave.geneMods.NCS === 1 && jsRandom(1, 100) > 50) {
			faceInc *= 2;
		}
		r.push(faceIncrease(slave, faceInc));
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {number} maxVoice
	 */
	function raiseVoice(slave, maxVoice) {
		if (slave.voice < maxVoice && slave.voice > 0) {
			r.push(`Hormonal effects cause <span class="lime">${his} voice to become higher and more`);
			if (slave.geneMods.NCS === 1) {
				r.push(`childlike.</span>`);
			} else {
				r.push(`feminine.</span>`);
			}
			slave.voice++;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {number} minimumMuscles
	 */
	function softenMuscles(slave, minimumMuscles) {
		if (slave.muscles > minimumMuscles && slave.diet !== Diet.MUSCLE && slave.drugs !== Drug.STEROID && (slave.geneticQuirks.mGain !== 2 || slave.geneticQuirks.mLoss === 2)) {
			r.push(`Hormonal effects <span class="orange">reduce ${his} musculature.</span>`);
			slave.muscles -= 2 + V.hormoneUpgradePower + slave.geneticQuirks.mLoss;
			if (slave.geneMods.NCS === 1 && jsRandom(1, 100) > 50) {
				slave.muscles -= 2 + V.hormoneUpgradePower + slave.geneticQuirks.mLoss;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {number} maxWetness
	 */
	function increaseWetness(slave, maxWetness) {
		if (slave.vagina !== -1 && slave.ovaries !== 0 && slave.vaginaLube < maxWetness) {
			r.push(`Hormonal effects cause <span class="lime">${his} vagina to produce more copious natural lubricant.</span>`);
			slave.vaginaLube++;
		}
	}

	/**
	 * Atrophy genitals because of too much female hormones
	 * @param {App.Entity.SlaveState} slave
	 */
	function atrophyGenitals(slave) {
		if (V.hormoneUpgradeShrinkage === 0) {
			if (slave.dick > 1) {
				if (slave.geneMods.NCS === 1 && jsRandom(1, 100) > 50 && slave.dick > 2) {
					r.push(`Hormonal effects work with ${his} <span class="orange">NCS</span> and cause <span class="orange">${his} dick to atrophy a lot.</span>`);
					slave.dick--;
				} else {
					r.push(`Hormonal effects cause <span class="orange">${his} dick to atrophy.</span>`);
				}
				slave.dick--;
			}
			if (slave.balls > 1) {
				if (slave.geneMods.NCS === 1 && jsRandom(1, 100) > 50 && slave.balls > 2) {
					r.push(`Hormonal effects work with ${his} <span class="orange">NCS</span> and cause <span class="orange">${his} testicles to atrophy a lot.</span>`);
					slave.balls--;
				} else {
					r.push(`Hormonal effects cause <span class="orange">${his} testicles to atrophy.</span>`);
				}
				slave.balls--;
			}
			if (slave.clit > 0) {
				if (slave.geneMods.NCS === 1 && jsRandom(1, 100) > 50 && slave.clit > 1) {
					r.push(`Hormonal effects work with ${his} <span class="orange">NCS</span> and cause <span class="orange">${his} clit to shrink down greatly.</span>`);
					slave.clit--;
				} else {
					r.push(`Hormonal effects cause <span class="orange">${his} clit to shrink significantly.</span>`);
				}
				slave.clit--;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function mentalEffectsFemale(slave) {
		if (slave.devotion <= 20) {
			r.push(`Hormonal effects make ${him} a bit more <span class="hotpink">docile.</span>`);
			slave.devotion++;
		}
		if (slave.trust <= 20) {
			r.push(`Hormonal effects make ${him} a bit more <span class="mediumaquamarine">trusting.</span>`);
			slave.trust++;
		}
		if (slave.attrXY < 100) {
			r.push(`Hormonal effects cause ${him} to become <span class="green">more attracted to men.</span>`);
			slave.attrXY += 2 + V.hormoneUpgradePower;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function hardenFaceShape(slave) {
		if (slave.faceImplant < 5) {
			if (slave.geneticQuirks.androgyny !== 2) {
				if (slave.faceShape === FaceShape.ANDRO) {
					r.push(`Hormonal effects cause <span class="orange">${his} face to harden into masculinity.</span>`);
					slave.faceShape = FaceShape.MASC;
				} else if (slave.faceShape !== FaceShape.MASC) {
					r.push(`Hormonal effects cause <span class="orange">${his} face to harden into androgyny.</span>`);
					slave.faceShape = FaceShape.ANDRO;
				}
			}
		}
	}


	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function hardenFace(slave) {
		if (faceValue.isBetween(0, 100)) {
			r.push(`Hormonal effects cause <span class="orange">${his} facial structure to harden and become less attractive.</span>`);
			const faceDec = 1 + V.hormoneUpgradePower;
			slave.face = Math.clamp(slave.face - faceDec, -100, 100);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {number} minVoice
	 */
	function lowerVoice(slave, minVoice) {
		if (slave.voice > minVoice) {
			r.push(`Hormonal effects cause <span class="orange">${his} voice to become deeper and less feminine.</span>`);
			slave.voice--;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function shrinkButt(slave) {
		if (buttSize > 1 && rearLipedemaMod === 0) {
			if (slave.geneMods.NCS === 1 && jsRandom(1, 100) > 50 && buttSize > 2) {
				r.push(`Hormonal effects work with ${his} <span class="orange">NCS</span> and cause <span class="orange">${his} butt to decrease a lot.</span>`);
				slave.butt -= 1;
			} else {
				r.push(`Hormonal effects cause <span class="orange">the natural size of ${his} butt to decrease.</span>`);
			}
			slave.butt--;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function shrinkBoobs(slave) {
		if (slave.geneMods.NCS === 1 && jsRandom(1, 100) > 50) {
			r.push(`Hormonal effects work with ${his} <span class="orange">NCS</span> and cause <span class="orange">${his} tits to shrink a lot.</span>`);
			slave.boobs -= 10 + (15 * V.hormoneUpgradePower);
		} else {
			r.push(`Hormonal effects cause <span class="orange">the natural size of ${his} tits to shrink.</span>`);
		}
		slave.boobs -= 10 + (15 * V.hormoneUpgradePower);
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {number} minWetness
	 */
	function lowerWetness(slave, minWetness) {
		if (slave.vagina > -1 && slave.vaginaLube > 0) {
			r.push(`Hormonal effects cause <span class="orange">${his} vagina to produce less natural lubricant.</span>`);
			slave.vaginaLube--;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function hormonesEffects(slave) {
		if (Math.abs(slave.hormoneBalance) >= 50) {
			let normBreasts = 0;
			let normButt = 0;
			if (slave.hormoneBalance > 30 && slave.geneMods.NCS !== 1) {
				const slimModBreasts = (V.arcologies[0].FSSlimnessEnthusiastFoodLaw === 1) ? 0.45 : 1; // 600 average breast target, 270 target, 475 @ 350 hormone
				const slimModButts = (V.arcologies[0].FSSlimnessEnthusiastFoodLaw === 1) ? 0.6 : 1; // 2.5 average butt, 1.5 target
				/* 'Expected' breast size based on weight for feminine-bodied slaves */
				normBreasts = Math.trunc((100 + (slave.weight + 100) * 5 + 2 * slave.lactationAdaptation) * (0.85 + slave.hormoneBalance / 400) * gigantomastiaMod * slimModBreasts);
				normButt = ((slave.weight + 100) * 0.025 * (0.9 + slave.hormoneBalance / 600) * (rearLipedemaMod / 2 + 1) * slimModButts);
			}

			if (slave.hormoneBalance >= 350) {
				if (slave.geneMods.NCS === 1) {
					if ((slave.shoulders + Math.abs(slave.shouldersImplant)) > -1 && slave.shoulders > -2 && jsRandom(1, 100) < (40 + (20 * V.hormoneUpgradePower))) {
						r.push(`Feminine hormones team up with ${his} <span class="orange">NCS</span> to cause <span class="lime">${his} shoulders to shrink into a more childlike narrowness</span> than before.`);
						slave.shoulders--;
					}
				} else if (slave.physicalAge < 25) {
					if (slave.shoulders + Math.abs(slave.shouldersImplant) > -1 && slave.shoulders > -2 && jsRandom(1, 100) < 20 + (10 * V.hormoneUpgradePower)) {
						r.push(`${His} body has not yet found its final bone structure, which typically happens in the mid-twenties. Hormonal effects cause <span class="lime">${his} shoulders to develop into a more feminine narrowness</span> than they would have done naturally.`);
						slave.shoulders--;
					}
					if (slave.geneMods.NCS === 0 && slave.hips - (Math.abs(slave.hipsImplant)) < 1 && slave.hips < 2 && jsRandom(1, 100) <= 20 + (10 * V.hormoneUpgradePower)) {
						r.push(`${His} body has not yet found its final bone structure, which typically happens in the mid-twenties. Hormonal effects cause <span class="lime">${his} hips to develop more broadly</span> than they would have done naturally.`);
						slave.hips++;
					}
				}

				softenFaceShape(slave);
				if (faceValue < 50 && slave.face < 75) {
					softenFace(slave);
					if (faceValue >= 50 || slave.face >= 75) {
						r.push(`${His} face is now quite beautiful; hormonal treatments alone <span class="yellow">cannot improve it further.</span>`);
					}
				}

				raiseVoice(slave, 3);
				softenMuscles(slave, 10);

				if (slave.waist > -30) {
					r.push(`Hormonal effects cause ${his} <span class="lime">waist to narrow.</span>`);
					slave.waist = Math.clamp(slave.waist - (2 + V.hormoneUpgradePower), -30, 100);
				}

				if (slave.geneMods.NCS === 0) {
					if (boobSize < 0.9 * normBreasts) {
						/* Grow to 90% of normBreasts */
						r.push(`Hormonal effects cause <span class="lime">a small amount of natural breast growth.</span>`);
						slave.boobs += 25;
					}
					if (slave.nipples === NippleShape.TINY) {
						r.push(`Hormonal effects cause ${his} tiny <span class="lime">nipples to grow to a more normal size.</span>`);
						slave.nipples = NippleShape.CUTE;
					}
					if (buttSize < Math.trunc(4.5 * normButt) / 5) {
						/* 90% of normButt, rounded down to the next increment of .2 */
						r.push(`Hormonal effects cause <span class="lime">the natural size of ${his} butt to increase.</span>`);
						slave.butt += 0.2;
					}
				} else {
					r.push(`${His} <span class="orange">NCS</span> blocks asset growth despite the fact that ${his} body is swimming in hormones.`);
				}
				increaseWetness(slave, 2);

				atrophyGenitals(slave);

				mentalEffectsFemale(slave);
			} else if (slave.hormoneBalance >= 300) {
				softenFaceShape(slave);
				if (faceValue < 30 && slave.face < 60) {
					softenFace(slave);
				}

				raiseVoice(slave, 3);
				softenMuscles(slave, 30);

				if (slave.waist > -10) {
					r.push(`Hormonal effects cause ${his} <span class="lime">waist to narrow.</span>`);
					slave.waist = Math.clamp(slave.waist - (2 + V.hormoneUpgradePower), -10, 100);
				}

				if (slave.geneMods.NCS === 0) {
					if (boobSize < 0.8 * normBreasts) {
						/* Grow to 80% of expected */
						r.push(`Hormonal effects cause <span class="lime">a small amount of natural breast growth.</span>`);
						slave.boobs += 25;
					}
					if (slave.nipples === NippleShape.TINY) {
						r.push(`Hormonal effects cause ${his} tiny <span class="lime">nipples to grow to a more normal size.</span>`);
						slave.nipples = NippleShape.CUTE;
					}
					if (buttSize < Math.trunc(4 * normButt) / 5) {
						/* 80% of normButt, rounded down to the next increment of .2 */
						r.push(`Hormonal effects cause <span class="lime">the natural size of ${his} butt to increase.</span>`);
						slave.butt += 0.2;
					}
				}
				increaseWetness(slave, 2);

				atrophyGenitals(slave);

				mentalEffectsFemale(slave);
			} else if (slave.hormoneBalance >= 250) {
				softenFaceShape(slave);
				if (faceValue < 10 && slave.face < 30) {
					softenFace(slave);
				}

				raiseVoice(slave, 2);
				softenMuscles(slave, 30);

				if (slave.waist > 0) {
					r.push(`Hormonal effects cause ${his} <span class="lime">waist to narrow.</span>`);
					slave.waist = Math.clamp(slave.waist - (2 + V.hormoneUpgradePower), 0, 100);
				}

				if (slave.geneMods.NCS === 0) {
					if (boobSize < 0.7 * normBreasts) {
						/* Grow to 70% of expected */
						r.push(`Hormonal effects cause <span class="lime">a small amount of natural breast growth.</span>`);
						slave.boobs += 25;
					}
					if (slave.nipples === NippleShape.TINY) {
						r.push(`Hormonal effects cause ${his} tiny <span class="lime">nipples to grow to a more normal size.</span>`);
						slave.nipples = NippleShape.CUTE;
					}
					if (buttSize < Math.trunc(3.5 * normButt) / 5) {
						/* 70% of normButt, rounded down to the next increment of .2 */
						r.push(`Hormonal effects cause <span class="lime">the natural size of ${his} butt to increase.</span>`);
						slave.butt += 0.2;
					}
				}
				increaseWetness(slave, 1);

				if (V.hormoneUpgradeShrinkage === 0) {
					if (slave.dick > 2) {
						if (slave.geneMods.NCS === 1 && jsRandom(1, 100) > 50) {
							r.push(`Hormonal effects work with ${his} <span class="orange">NCS</span> and cause <span class="orange">${his} dick to atrophy a lot.</span>`);
							slave.dick -= 1;
						} else {
							r.push(`Hormonal effects cause <span class="orange">${his} dick to atrophy.</span>`);
						}
						slave.dick--;
					}
					if (slave.balls > 2) {
						if (slave.geneMods.NCS === 1 && jsRandom(1, 100) > 50) {
							r.push(`Hormonal effects work with ${his} <span class="orange">NCS</span> and cause <span class="orange">${his} testicles to atrophy a lot.</span>`);
							slave.balls -= 1;
						} else {
							r.push(`Hormonal effects cause <span class="orange">${his} testicles to atrophy.</span>`);
						}
						slave.balls--;
					}
					if (slave.clit > 1) {
						if (slave.geneMods.NCS === 1 && jsRandom(1, 100) > 50) {
							r.push(`Hormonal effects work with ${his} <span class="orange">NCS</span> and cause <span class="orange">${his} clit to shrink down greatly.</span>`);
							slave.clit -= 1;
						} else {
							r.push(`Hormonal effects cause <span class="orange">${his} clit to shrink significantly.</span>`);
						}
						slave.clit--;
					}
				}

				if (slave.devotion <= 20) {
					r.push(`Hormonal effects make ${him} a bit more <span class="hotpink">docile.</span>`);
					slave.devotion++;
				}
				if (slave.trust <= 20) {
					r.push(`Hormonal effects make ${him} a bit more <span class="mediumaquamarine">trusting.</span>`);
					slave.trust++;
				}
				if (slave.attrXY < 95) {
					r.push(`Hormonal effects cause ${him} to become <span class="green">more attracted to men.</span>`);
					slave.attrXY += 2 + V.hormoneUpgradePower;
				}
			} else if (slave.hormoneBalance >= 200) {
				if (slave.faceImplant < 5) {
					if (slave.faceShape === FaceShape.MASC) {
						r.push(`Hormonal effects cause <span class="orange">${his} face to soften into`);
						if (slave.geneMods.NCS === 1) {
							r.push(`childlike`);
						}
						r.push(`androgyny.</span>`);
						slave.faceShape = FaceShape.ANDRO;
					} else if (slave.geneMods.NCS === 1 && jsRandom(1, 100) > 50 && slave.faceShape === FaceShape.ANDRO && slave.geneticQuirks.androgyny !== 2) {
						r.push(`Hormonal effects cause <span class="lime">${his} face to soften into`);
						if (slave.geneMods.NCS === 1) {
							r.push(`childlike normalcy.</span>`);
						} else {
							r.push(`femininity.</span>`);
						}
						slave.faceShape = FaceShape.NORMAL;
					}
				}
				if (faceValue < 0 && slave.face < 0) {
					r.push(`Hormonal effects cause <span class="lime">${his} facial structure to soften and become less unattractive.</span>`);
					let faceInc = 1 + V.hormoneUpgradePower;
					if (slave.geneMods.NCS === 1 && jsRandom(1, 100) > 50) {
						faceInc *= 2;
					}
					r.push(faceIncrease(slave, faceInc));
				}

				raiseVoice(slave, 2);
				softenMuscles(slave, 30);

				if (slave.waist > 10) {
					r.push(`Hormonal effects cause ${his} <span class="lime">waist to narrow.</span>`);
					slave.waist = Math.clamp(slave.waist - (2 + V.hormoneUpgradePower), 10, 100);
				}

				if (slave.geneMods.NCS === 0) {
					if (boobSize < 0.6 * normBreasts) {
						/* Grow to 60% of expected */
						r.push(`Hormonal effects cause <span class="lime">a small amount of natural breast growth.</span>`);
						slave.boobs += 25;
					}
					if (slave.nipples === NippleShape.TINY) {
						r.push(`Hormonal effects cause ${his} tiny <span class="lime">nipples to grow to a more normal size.</span>`);
						slave.nipples = NippleShape.CUTE;
					}
					if (buttSize < Math.trunc(3 * normButt) / 5) {
						/* 60% of normButt, rounded down to the next increment of .2 */
						r.push(`Hormonal effects cause <span class="lime">the natural size of ${his} butt to increase.</span>`);
						slave.butt += 0.2;
					}
				}
				increaseWetness(slave, 1);

				if (V.hormoneUpgradeShrinkage === 0) {
					if (slave.dick > 3) {
						if (slave.geneMods.NCS === 1 && jsRandom(1, 100) > 50) {
							r.push(`Hormonal effects work with ${his} <span class="orange">NCS</span> and cause <span class="orange">${his} dick to atrophy a lot.</span>`);
							slave.dick -= 1;
						} else {
							r.push(`Hormonal effects cause <span class="orange">${his} dick to atrophy.</span>`);
							slave.dick--;
						}
					}
					if (slave.balls > 3) {
						if (slave.geneMods.NCS === 1 && jsRandom(1, 100) > 50) {
							r.push(`Hormonal effects work with ${his} <span class="orange">NCS</span> and cause <span class="orange">${his} testicles to atrophy a lot.</span>`);
							slave.balls -= 1;
						} else {
							r.push(`Hormonal effects cause <span class="orange">${his} testicles to atrophy.</span>`);
						}
						slave.balls--;
					}
					if (slave.clit > 2) {
						if (slave.geneMods.NCS === 1 && jsRandom(1, 100) > 50) {
							r.push(`Hormonal effects work with ${his} <span class="orange">NCS</span> and cause <span class="orange">${his} clit to shrink down greatly.</span>`);
							slave.clit -= 1;
						} else {
							r.push(`Hormonal effects cause <span class="orange">${his} clit to shrink significantly.</span>`);
						}
						slave.clit--;
					}
				}

				if (slave.devotion <= 20) {
					r.push(`Hormonal effects make ${him} a bit more <span class="hotpink">docile.</span>`);
					slave.devotion++;
				}
				if (slave.trust <= 20) {
					r.push(`Hormonal effects make ${him} a bit more <span class="mediumaquamarine">trusting.</span>`);
					slave.trust++;
				}
				if (slave.attrXY < 90) {
					r.push(`Hormonal effects cause ${him} to become <span class="green">more attracted to men.</span>`);
					slave.attrXY += 2 + V.hormoneUpgradePower;
				}
			} else if (slave.hormoneBalance >= 100) {
				if (slave.faceImplant < 5) {
					if (slave.geneMods.NCS === 1 && jsRandom(1, 100) > 50 && slave.faceShape === FaceShape.MASC) {
						r.push(`Hormonal effects cause <span class="orange">${his} face to soften into`);
						if (slave.geneMods.NCS === 1) {
							r.push(`childlike`);
						}
						r.push(`androgyny.</span>`);
						slave.faceShape = FaceShape.ANDRO;
					}
				}

				if (slave.geneMods.NCS === 0) {
					if (boobSize < 0.5 * normBreasts) {
						/* Grow to 50% of expected */
						r.push(`Hormonal effects cause <span class="lime">a small amount of natural breast growth.</span>`);
						slave.boobs += 25;
					}
				}

				if (slave.devotion <= 20) {
					r.push(`Hormonal effects make ${him} a bit more <span class="hotpink">docile.</span>`);
					slave.devotion++;
				}
				if (slave.trust <= 20) {
					r.push(`Hormonal effects make ${him} a bit more <span class="mediumaquamarine">trusting.</span>`);
					slave.trust++;
				}
				if (slave.attrXY < 80) {
					r.push(`Hormonal effects cause ${him} to become <span class="green">more attracted to men.</span>`);
					slave.attrXY += 2 + V.hormoneUpgradePower;
				}
			} else if (slave.hormoneBalance >= 50) {
				if (slave.attrXY < 70) {
					r.push(`Hormonal effects cause ${him} to become <span class="green">more attracted to men.</span>`);
					slave.attrXY += 2 + V.hormoneUpgradePower;
				}
			} else if (slave.hormoneBalance <= -350) {
				if (slave.geneMods.NCS === 1) {
					if (slave.hips + Math.abs(slave.hipsImplant) > -1 && slave.hips > -2 && (jsRandom(1, 100) <= 20 + (10 * V.hormoneUpgradePower))) {
						r.push(`Masculine hormones team up with ${his} <span class="orange">NCS</span> to cause <span class="lime">${his} hips to shrink into a more childlike narrowness</span> than before.`);
						slave.hips -= 1;
					}
				} else if (slave.physicalAge < 25) {
					if ((slave.shoulders - (Math.abs(slave.shouldersImplant)) < 1) && (slave.shoulders < 2) && (jsRandom(1, 100) < 20 + (10 * V.hormoneUpgradePower))) {
						r.push(`${His} body has not yet found its final bone structure, which typically happens in the mid-twenties. Hormonal effects cause <span class="orange">${his} shoulders to develop a more masculine wideness</span> than they would have done naturally.`);
						slave.shoulders += 1;
					}
					if ((slave.hips + (Math.abs(slave.hipsImplant)) > -1) && (slave.hips > -2) && (jsRandom(1, 100) <= 20 + (10 * V.hormoneUpgradePower))) {
						r.push(`${His} body has not yet found its final bone structure, which typically happens in the mid-twenties. Hormonal effects cause <span class="orange">${his} hips to develop more narrowly</span> than they would have done naturally.`);
						slave.hips -= 1;
					}
				}

				if (slave.geneMods.NCS === 0) {
					hardenFaceShape(slave);
					hardenFace(slave);
					lowerVoice(slave, 1);
				}

				if (V.hormoneUpgradeShrinkage === 0) {
					shrinkButt(slave);
					if (boobSize > 100 * gigantomastiaMod && gigantomastiaMod !== 3) {
						if (slave.geneMods.NCS === 1 && jsRandom(1, 100) > 50 && boobSize > 200) {
							r.push(`Hormonal effects work with ${his} <span class="orange">NCS</span> and cause <span class="orange">${his} tits to shrink a lot.</span>`);
							slave.boobs -= 10 + (15 * V.hormoneUpgradePower);
						} else {
							r.push(`Hormonal effects cause <span class="orange">the natural size of ${his} tits to shrink.</span>`);
						}
						slave.boobs -= 10 + (15 * V.hormoneUpgradePower);
					}
				}
				if (slave.geneMods.NCS === 1 && slave.nipples === NippleShape.TINY) {
					/* nothing, just don't advance to cute */
				} else if (slave.nipples !== NippleShape.CUTE && slave.nipples !== NippleShape.FUCKABLE && slave.nipples !== NippleShape.FLAT) {
					r.push(`Hormonal effects cause ${his} <span class="orange">nipples to shrink to a more masculine size.</span>`);
					slave.nipples = NippleShape.CUTE;
				}

				if (slave.geneMods.NCS === 0) {
					if (slave.dick.isBetween(0, 5)) {
						r.push(`Hormonal effects add <span class="lime">a bit more heft to ${his} penis.</span>`);
						slave.dick++;
					}
					if (slave.balls.isBetween(0, 5)) {
						r.push(`Hormonal effects cause <span class="lime">${his} balls to hang a little heavier.</span>`);
						slave.balls++;
					}

					if (slave.clit < 5 && slave.dick === 0 && slave.vagina >= 0) {
						r.push(`Hormonal effects cause <span class="lime">${his} clit to grow significantly.</span>`);
						slave.clit++;
					}
					lowerWetness(slave, 0);

					if (slave.muscles <= 50 && slave.diet !== Diet.SLIM) {
						r.push(`Hormonal effects <span class="lime">build up ${his} musculature.</span>`);
						slave.muscles += 2 + V.hormoneUpgradePower + slave.geneticQuirks.mGain;
					}
					if (slave.waist < 80) {
						r.push(`Hormonal effects cause ${his} <span class="orange">waist to broaden.</span>`);
						slave.waist = Math.clamp(slave.waist + 2 + V.hormoneUpgradePower, -100, 80);
					}
				}

				if (slave.attrXX < 100) {
					r.push(`Hormonal effects cause ${him} to become <span class="green">more attracted to women.</span>`);
					slave.attrXX += 2 + V.hormoneUpgradePower;
				}

				if (slave.devotion > 20 && slave.trust <= 20) {
					r.push(`Hormonal effects <span class="mediumorchid">make ${him} a bit less docile.</span>`);
					slave.devotion -= 1;
				}
			} else if (slave.hormoneBalance <= -300) {
				if (slave.geneMods.NCS === 0) {
					hardenFaceShape(slave);
					hardenFace(slave);
					lowerVoice(slave, 1);
				}

				if (V.hormoneUpgradeShrinkage === 0) {
					shrinkButt(slave);
					if (boobSize > 300 * gigantomastiaMod && gigantomastiaMod !== 3) {
						shrinkBoobs(slave);
					}
				}
				if (slave.geneMods.NCS === 1 && slave.nipples === NippleShape.TINY) {
					/* nothing, just don't advance to cute */
				} else if (slave.nipples !== NippleShape.CUTE && slave.nipples !== NippleShape.FUCKABLE && slave.nipples !== NippleShape.FLAT) {
					r.push(`Hormonal effects cause ${his} <span class="orange">nipples to shrink to a more masculine size.</span>`);
					slave.nipples = NippleShape.CUTE;
				}

				if (slave.geneMods.NCS === 0) {
					if (slave.dick.isBetween(0, 5)) {
						r.push(`Hormonal effects add <span class="lime">a bit more heft to ${his} penis.</span>`);
						slave.dick++;
					}
					if (slave.balls.isBetween(0, 5) && slave.ballType !== "sterile") {
						r.push(`Hormonal effects cause <span class="lime">${his} balls to hang a little heavier.</span>`);
						slave.balls++;
					}

					if (slave.clit < 4 && slave.dick === 0 && slave.vagina >= 0) {
						r.push(`Hormonal effects cause <span class="lime">${his} clit to grow significantly.</span>`);
						slave.clit++;
					}
					lowerWetness(slave, 0);

					if (slave.muscles <= 50 && slave.diet !== Diet.SLIM) {
						r.push(`Hormonal effects <span class="lime">build up ${his} musculature.</span>`);
						slave.muscles += 2 + V.hormoneUpgradePower + slave.geneticQuirks.mGain;
					}
					if (slave.waist < 40) {
						r.push(`Hormonal effects cause ${his} <span class="orange">waist to broaden.</span>`);
						slave.waist = Math.clamp(slave.waist + 2 + V.hormoneUpgradePower, -100, 40);
					}
				}

				if (slave.attrXX < 100) {
					r.push(`Hormonal effects cause ${him} to become <span class="green">more attracted to women.</span>`);
					slave.attrXX += 2 + V.hormoneUpgradePower;
				}

				if (slave.devotion > 20 && slave.trust <= 20) {
					r.push(`Hormonal effects <span class="mediumorchid">make ${him} a bit less docile.</span>`);
					slave.devotion -= 1;
				}
			} else if (slave.hormoneBalance <= -250) {
				if (slave.geneMods.NCS === 0) {
					if (slave.faceImplant < 5) {
						if (slave.faceShape !== FaceShape.MASC && slave.faceShape !== FaceShape.ANDRO) {
							r.push(`Hormonal effects cause <span class="orange">${his} face to harden into androgyny.</span>`);
							slave.faceShape = FaceShape.ANDRO;
						}
					}
					if (faceValue.isBetween(20, 100)) {
						r.push(`Hormonal effects cause <span class="orange">${his} facial structure to harden and become less attractive.</span>`);
						const faceDec = 1 + V.hormoneUpgradePower;
						slave.face = Math.clamp(slave.face - faceDec, -100, 100);
					}

					lowerVoice(slave, 1);
				}

				if (V.hormoneUpgradeShrinkage === 0) {
					if (buttSize > 2 && rearLipedemaMod === 0) {
						if (slave.geneMods.NCS === 1 && jsRandom(1, 100) > 50) {
							r.push(`Hormonal effects work with ${his} <span class="orange">NCS</span> and cause <span class="orange">${his} butt to decrease a lot.</span>`);
							slave.butt -= 1;
						} else {
							r.push(`Hormonal effects cause <span class="orange">the natural size of ${his} butt to decrease.</span>`);
						}
						slave.butt--;
					}
					if (boobSize > 400 * gigantomastiaMod && gigantomastiaMod !== 3) {
						shrinkBoobs(slave);
					}
				}
				if (slave.geneMods.NCS === 1 && slave.nipples === NippleShape.TINY) {
					/* nothing, just don't advance to cute */
				} else if (slave.nipples !== NippleShape.CUTE && slave.nipples !== NippleShape.FUCKABLE && slave.nipples !== NippleShape.FLAT) {
					r.push(`Hormonal effects cause ${his} <span class="orange">nipples to shrink to a more masculine size.</span>`);
					slave.nipples = NippleShape.CUTE;
				}

				if (slave.geneMods.NCS === 0) {
					if (slave.dick.isBetween(0, 4)) {
						r.push(`Hormonal effects add <span class="lime">a bit more heft to ${his} penis.</span>`);
						slave.dick++;
					}
					if (slave.balls.isBetween(0, 4) && slave.ballType !== "sterile") {
						r.push(`Hormonal effects cause <span class="lime">${his} balls to hang a little heavier.</span>`);
						slave.balls++;
					}

					if (slave.clit < 3 && slave.dick === 0 && slave.vagina >= 0) {
						r.push(`Hormonal effects cause <span class="lime">${his} clit to grow significantly.</span>`);
						slave.clit++;
					}
					lowerWetness(slave, 0);

					if (slave.muscles <= 35 && slave.diet !== Diet.SLIM) {
						r.push(`Hormonal effects <span class="lime">build up ${his} musculature.</span>`);
						slave.muscles += 2 + V.hormoneUpgradePower + slave.geneticQuirks.mGain;
					}
					if (slave.waist < 25) {
						r.push(`Hormonal effects cause ${his} <span class="orange">waist to broaden.</span>`);
						slave.waist = Math.clamp(slave.waist + 2 + V.hormoneUpgradePower, -100, 25);
					}
				}

				if (slave.attrXX < 95) {
					r.push(`Hormonal effects cause ${him} to become <span class="green">more attracted to women.</span>`);
					slave.attrXX += 2 + V.hormoneUpgradePower;
				}

				if (slave.devotion > 20 && slave.trust <= 20) {
					r.push(`Hormonal effects <span class="mediumorchid">make ${him} a bit less docile.</span>`);
					slave.devotion -= 1;
				}
			} else if (slave.hormoneBalance <= -200) {
				if (slave.geneMods.NCS === 0) {
					if (slave.faceImplant < 5) {
						if (slave.faceShape !== FaceShape.MASC && slave.faceShape !== FaceShape.ANDRO) {
							r.push(`Hormonal effects cause <span class="orange">${his} face to harden into androgyny.</span>`);
							slave.faceShape = FaceShape.ANDRO;
						}
					}
					if (faceValue.isBetween(40, 100)) {
						r.push(`Hormonal effects cause <span class="orange">${his} facial structure to harden and become less attractive.</span>`);
						const faceDec = 1 + V.hormoneUpgradePower;
						slave.face = Math.clamp(slave.face - faceDec, -100, 100);
					}

					lowerVoice(slave, 2);
				}

				if (V.hormoneUpgradeShrinkage === 0) {
					if (buttSize > 3 && rearLipedemaMod === 0) {
						if (slave.geneMods.NCS === 1 && jsRandom(1, 100) > 50) {
							r.push(`Hormonal effects work with ${his} <span class="orange">NCS</span> and cause <span class="orange">${his} butt to decrease a lot.</span>`);
							slave.butt -= 1;
						} else {
							r.push(`Hormonal effects cause <span class="orange">the natural size of ${his} butt to decrease.</span>`);
						}
						slave.butt--;
					}
					if (boobSize > 600 * gigantomastiaMod && gigantomastiaMod !== 3) {
						shrinkBoobs(slave);
					}
				}
				if (slave.nipples === NippleShape.HUGE || slave.nipples === NippleShape.PUFFY) {
					r.push(`Hormonal effects cause ${his} big <span class="orange">nipples to shrink to a more reasonable size.</span>`);
					slave.nipples = NippleShape.CUTE;
				}

				if (slave.geneMods.NCS === 0) {
					if (slave.dick.isBetween(0, 3)) {
						r.push(`Hormonal effects add <span class="lime">a bit more heft to ${his} penis.</span>`);
						slave.dick++;
					}
					if (slave.balls.isBetween(0, 3) && slave.ballType !== "sterile") {
						r.push(`Hormonal effects cause <span class="lime">${his} balls to hang a little heavier.</span>`);
						slave.balls++;
					}

					if (slave.clit < 2 && slave.dick === 0 && slave.vagina >= 0) {
						r.push(`Hormonal effects cause <span class="lime">${his} clit to grow significantly.</span>`);
						slave.clit++;
					}
					lowerWetness(slave, 0);

					if (slave.muscles <= 15 && slave.diet !== Diet.SLIM) {
						r.push(`Hormonal effects <span class="lime">build up ${his} musculature.</span>`);
						slave.muscles += 2 + V.hormoneUpgradePower + slave.geneticQuirks.mGain;
					}
					if (slave.waist < 9) {
						r.push(`Hormonal effects cause ${his} <span class="orange">waist to broaden.</span>`);
						slave.waist = Math.clamp(slave.waist + 2 + V.hormoneUpgradePower, -100, 9);
					}
				}

				if (slave.attrXX < 90) {
					r.push(`Hormonal effects cause ${him} to become <span class="green">more attracted to women.</span>`);
					slave.attrXX += 2 + V.hormoneUpgradePower;
				}

				if (slave.devotion > 20 && slave.trust <= 20) {
					r.push(`Hormonal effects <span class="mediumorchid">make ${him} a bit less docile.</span>`);
					slave.devotion -= 1;
				}
			} else if (slave.hormoneBalance <= -100) {
				if (slave.geneMods.NCS === 0) {
					if (faceValue.isBetween(60, 100)) {
						r.push(`Hormonal effects cause <span class="orange">${his} facial structure to harden and become less attractive.</span>`);
						const faceDec = 1 + V.hormoneUpgradePower;
						slave.face = Math.clamp(slave.face - faceDec, -100, 100);
					}

					lowerVoice(slave, 2);
				}

				if (V.hormoneUpgradeShrinkage === 0) {
					if (buttSize > 4 && rearLipedemaMod === 0) {
						if (slave.geneMods.NCS === 1 && jsRandom(1, 100) > 50) {
							r.push(`Hormonal effects work with ${his} <span class="orange">NCS</span> and cause <span class="orange">${his} butt to decrease a lot.</span>`);
							slave.butt -= 1;
						} else {
							r.push(`Hormonal effects cause <span class="orange">the natural size of ${his} butt to decrease.</span>`);
						}
						slave.butt--;
					}
					if (boobSize > 800 * gigantomastiaMod && gigantomastiaMod !== 3) {
						shrinkBoobs(slave);
					}
				}

				if (slave.geneMods.NCS === 0) {
					if (slave.muscles < 0 && slave.diet !== Diet.SLIM) {
						r.push(`Hormonal effects <span class="lime">build up ${his} musculature.</span>`);
						slave.muscles += 2 + V.hormoneUpgradePower + slave.geneticQuirks.mGain;
					}

					if (slave.waist < 0) {
						r.push(`Hormonal effects cause ${his} <span class="orange">waist to broaden.</span>`);
						slave.waist = Math.clamp(slave.waist + 2 + V.hormoneUpgradePower, -100, 0);
					}

					if (slave.dick.isBetween(0, 2)) {
						r.push(`Hormonal effects cause <span class="lime">${his} micropenis to return to a more normal size.</span>`);
						slave.dick++;
					}
					if (slave.balls.isBetween(0, 2)) {
						r.push(`Hormonal effects cause <span class="lime">${his} balls to drop.</span>`);
						slave.balls++;
					}

					if (slave.clit < 1 && slave.dick === 0 && slave.vagina >= 0) {
						r.push(`Hormonal effects cause <span class="lime">${his} clit to grow significantly.</span>`);
						slave.clit++;
					}
					lowerWetness(slave, 1);
				}

				if (slave.attrXX < 80) {
					r.push(`Hormonal effects cause ${him} to become <span class="green">more attracted to women.</span>`);
					slave.attrXX += 2 + V.hormoneUpgradePower;
				}

				if (slave.devotion > 20 && slave.trust <= 20) {
					r.push(`Hormonal effects <span class="mediumorchid">make ${him} a bit less docile.</span>`);
					slave.devotion -= 1;
				}
			} else if (slave.hormoneBalance <= -50) {
				if (slave.attrXX < 70) {
					r.push(`Hormonal effects cause ${him} to become <span class="green">more attracted to women.</span>`);
					slave.attrXX += 2 + V.hormoneUpgradePower;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function hormoneReactions(slave) {
		if (slave.hormoneBalance <= 20 && slave.hormones < 1) {
			if (slave.dick > 0) {
				if (slave.devotion > 20) {
					if ((slave.boobs < 800 && slave.butt < 3) || (slave.faceShape === FaceShape.MASC) || (slave.shoulders > slave.hips) || (slave.balls > 4)) {
						if (slave.career === "a Futanari Sister") {
							r.push(`${He} wishes ${he} were more feminine, but isn't unhappy to be off hormones, since ${he} likes being a stiff-dicked futa.`);
						} else if (slave.fetish === Fetish.BUTTSLUT && slave.fetishStrength > 60 && slave.fetishKnown === 1) {
							r.push(`${He} wishes ${he} were more feminine, but ${he} loves getting fucked in the butt so much that it doesn't much bother ${him}.`);
						} else if (slave.fetish === Fetish.SADIST && slave.fetishStrength > 60 && slave.fetishKnown === 1) {
							r.push(`Life is easier for effeminate slaves, but ${he} loves abusing other slaves so much that ${he} likes being able to get hard.`);
						} else if (slave.fetish === Fetish.DOM && slave.fetishStrength > 60 && slave.fetishKnown === 1) {
							r.push(`Life is easier for effeminate slaves, but ${he} loves dominating other girls so much that ${he} likes being able to get hard.`);
						} else if (slave.energy > 95) {
							r.push(`${He} wishes ${he} were more feminine, but ${he} loves getting fucked like a good little sex slave so much that ${he} doesn't think about it much.`);
						} else if (slave.devotion <= 30) {
							r.push(`Life is easier for effeminate slaves, so <span class="mediumorchid">${he}'s a little unhappy</span> that ${he} isn't getting hormones to make ${him} more feminine.`);
							slave.devotion -= 2;
						} else if (slave.devotion <= 50) {
							r.push(`${He} wants to be a good slave girl, so <span class="mediumorchid">${he}'s a little unhappy</span> that ${he} isn't getting hormones to make ${him} look more feminine.`);
							slave.devotion -= 2;
						} else {
							r.push(`${He} wishes ${he} were more feminine, but ${he} accepts your judgment in not giving ${him} hormones to make that happen.`);
						}
					}
				}
			}
		}
	}
};
