App.EndWeek.Player.longTermEffects = function(PC = V.PC) {
	/** @type {(string|HTMLElement|DocumentFragment)[]} */
	const r = [];

	const gigantomastiaMod = PC.geneticQuirks.gigantomastia === 2 ? (PC.geneticQuirks.macromastia === 2 ? 3 : 2) : 1;
	const rearQuirk = PC.geneticQuirks.rearLipedema === 2 ? 2 : 0;
	const uterineHypersensitivityMod = PC.geneticQuirks.uterineHypersensitivity === 2 ? 2 : 1;

	asexualOvariesBurnout();
	piercingEffects();
	if (PC.lactation >= 2 || (PC.lactation > 0 && PC.lactationAdaptation >= 100)) {
		heavyLactationEffects();
	}
	implantEffects();
	hormoneBalance();
	if (PC.pubertyXX === 0 || PC.pubertyXY === 0) {
		puberty();
	}
	// Period stuff will go here, remember progenitor mod causes periods to be heavy.
	r.push(App.EndWeek.Player.pregnancy());
	if (PC.bellyFluid >= 100) {
		r.push(App.EndWeek.Player.inflation());
	}
	bellySagging();
	r.push(App.EndWeek.Player.longTermPhysicalEffects());
	anaphrodisiacEffects(PC, PC.oldEnergy); // must come after all .energy gains!
	if (PC.preg > PC.pregData.normalBirth / 8) {
		mainLaborTriggers();
	}
	endWeekHealthDamage(PC); // contained in healthFunctions.js
	slaveDeath(); // We can't die just yet.
	if (!["bob cut", "buzzcut", "pixie cut", "shaved", "trimmed"].includes(PC.hStyle) && PC.bald !== 1 && PC.haircuts === 0) {
		hairGrowth();
	}

	return App.Events.makeNode(r);

	function boobSize(PC) {
		return App.Medicine.fleshSize(PC, 'boobs');
	}

	function asexualOvariesBurnout() {
		if (PC.ovaImplant === OvaryImplantType.ASEXUAL && isFertile(PC) && (PC.preg === 0 || (PC.preg >= 0 && PC.geneticQuirks.superfetation === 2))) {
			r.push(`The frequent climaxes brought about by your ovarian modification's internal ejaculations keep you sexually sated.`);
			if (PC.energy >= 10) {
				r.push(`However, the constant self-gratification <span class="libido dec">leaves sex less satisfying.</span>`);
				PC.energy -= 10;
			}
			PC.need = 0;
		}
	}

	function piercingEffects() {
		if (PC.piercing.vagina.weight > 1) {
			if (PC.vagina > -1 && PC.labia < 2 && random(1, 100) > 90) {
				r.push(`The amount of weight hanging from your labia <span class="change positive">stretches out your pussylips a bit.</span>`);
				PC.labia += 1;
			}
		}
		if (PC.piercing.nipple.weight === 1) {
			if (PC.nipples === NippleShape.TINY) {
				if (random(1, 100) > 95) {
					r.push(`Your piercings keep your nipples half-hard all the time, and <span class="change positive">eventually they just stay that way.</span>`);
					PC.nipples = NippleShape.CUTE;
				}
			} else if (PC.nipples === NippleShape.PARTIAL) {
				if (random(1, 100) > 70) {
					r.push(`Your piercings keep your nipples half-hard all the time, which <span class="change positive">eventually protrudes them permanently.</span>`);
					if (random(1, 2) === 1) {
						r.push(`It turns out they're kind of cute.`);
						PC.nipples = NippleShape.CUTE;
					} else {
						r.push(`It turns out they're really puffy.`);
						PC.nipples = NippleShape.PUFFY;
					}
				}
			} else if (PC.nipples === NippleShape.INVERTED) {
				if (random(1, 100) > 90) {
					r.push(`Your piercings keep your nipples half-hard all the time, which eventually <span class="change positive">eventually protrudes them permanently.</span>`);
					if (random(1, 2) === 1) {
						r.push(`It turns out they're kind of cute.`);
						PC.nipples = NippleShape.CUTE;
					} else {
						r.push(`It turns out they're really puffy.`);
						PC.nipples = NippleShape.PUFFY;
					}
				}
			} else if (PC.nipples === NippleShape.FLAT) {
				if (random(1, 100) > 90) {
					r.push(`Your piercings tug at your nipples constantly, eventually <span class="change positive">preventing the fat nubs from flattening out again.</span>`);
					PC.nipples = NippleShape.HUGE;
				}
			}
		} else if (PC.piercing.nipple.weight === 2) {
			if (PC.nipples === NippleShape.TINY) {
				if (random(1, 100) > 80) {
					r.push(`The piercings in your nipples are so extensive and heavy that the weight <span class="change positive">stretches and lengthens them.</span>`);
					PC.nipples = NippleShape.CUTE;
				}
			} else if (PC.nipples === NippleShape.PARTIAL) {
				if (random(1, 100) > 50) {
					r.push(`The piercings in your nipples are so extensive and heavy that the weight <span class="change positive">permanently protrudes them.</span>`);
					if (random(1, 2) === 1) {
						r.push(`It turns out they're kind of cute.`);
						PC.nipples = NippleShape.CUTE;
					} else {
						r.push(`It turns out they're really puffy.`);
						PC.nipples = NippleShape.PUFFY;
					}
				}
			} else if (PC.nipples === NippleShape.INVERTED) {
				if (random(1, 100) > 70) {
					r.push(`The piercings in your nipples are so extensive that they are kept <span class="change positive">permanently protruded.</span>`);
					if (random(1, 2) === 1) {
						r.push(`It turns out they're as massive as the metal hanging from them.`);
						PC.nipples = NippleShape.HUGE;
					} else {
						r.push(`It turns out they're really puffy.`);
						PC.nipples = NippleShape.PUFFY;
					}
				}
			} else if (PC.nipples === NippleShape.FLAT) {
				if (random(1, 100) > 50) {
					r.push(`The piercings in your nipples are so extensive that they eventually <span class="change positive">stretch out into huge nubs.</span>`);
					PC.nipples = NippleShape.HUGE;
				}
			}
		}
	}

	function heavyLactationEffects() {
		if (PC.nipples !== NippleShape.HUGE && PC.nipples !== NippleShape.FUCKABLE) {
			if (PC.nipples === NippleShape.TINY) {
				if (random(1, 100) > 70) {
					r.push(`Your tiny nipples are unable to keep up with the output demanded by your heavy lactation, <span class="change positive">stretching and engorging</span> painfully until your milk can flow properly.`);
					PC.nipples = NippleShape.CUTE;
				}
			} else if (PC.nipples === NippleShape.CUTE) {
				if (random(1, 100) > 80) {
					r.push(`Your nipples are constantly swollen from your heavy lactation, and as they become accustomed to the flow of milk, <span class="change positive">grow puffy</span> and engorged.`);
					PC.nipples = NippleShape.PUFFY;
				}
			} else if (PC.nipples === NippleShape.PARTIAL || PC.nipples === NippleShape.INVERTED) {
				if (random(1, 100) > 80) {
					r.push(`You lactate so much that your nipples never get a chance to retreat back to their inverted state. Lactation has <span class="change positive">permanently protruded them,</span> leaving them engorged and puffy.`);
					PC.nipples = NippleShape.PUFFY;
				}
			} else if (PC.nipples === NippleShape.FLAT) {
				if (random(1, 100) > 50) {
					r.push(`You lactate so much that your nipples just can't stay flattened. Lactation has <span class="change positive">permanently engorged them,</span> leaving them positively massive.`);
					PC.nipples = NippleShape.HUGE;
				}
			} else {
				if (random(1, 100) > 90) {
					r.push(`Lactation has <span class="change positive">swollen your nipples</span> to an absurd size, giving you milky teats worthy of the cow you are.`);
					PC.nipples = NippleShape.HUGE;
				}
			}
		}
	}

	function implantEffects() {
		let implantsSwellBoobs = 0;
		let effect;
		if (PC.boobsImplantType === SizingImplantType.STRING) {
			r.push(`String implants absorb fluid, and yours are no exception; they're <span class="change positive">slightly larger</span> than last week.`);
			PC.boobsImplant += 50;
			PC.boobs += 50;
			effect = random(1, 10);
			if (PC.boobs > 50000) {
				r.push(`Your breasts just cannot handle them growing any larger, so some serum is drained from them.`);
				PC.boobs -= 100;
				PC.boobsImplant -= 100;
			} else if (PC.boobsImplant > 25000 && effect >= 2) {
				r.push(`Their growth <span class="health dec">is painful,</span> as they greatly irritate the tissue of your breasts in order to produce the large amount of fluid needed to continue swelling.`);
				healthDamage(PC, 20);
			} else if (PC.boobsImplant > 15000 && effect >= 3) {
				r.push(`Their growth <span class="health dec">is a bit painful,</span> as they irritate the tissue of your breasts in order to produce the large amount of fluid needed to continue swelling.`);
				healthDamage(PC, 10);
			} else if (PC.boobsImplant > 10000 && effect >= 4) {
				r.push(`Their growth <span class="health dec">is a bit painful,</span> as they irritate the tissue of your breasts in order to produce the large amount of fluid needed to continue swelling.`);
				healthDamage(PC, 10);
			} else if (PC.boobsImplant > 8000 && effect >= 5) {
				r.push(`Their growth <span class="health dec">is a bit painful,</span> as they irritate the tissue of your breasts in order to produce the fluid needed to swell.`);
				healthDamage(PC, 10);
			} else if (PC.boobsImplant > 6000 && effect >= 6) {
				r.push(`Their growth <span class="health dec">is a bit painful,</span> as they irritate the tissue of your breasts in order to produce the fluid needed to swell.`);
				healthDamage(PC, 10);
			} else if (PC.boobsImplant > 4500 && effect >= 7) {
				r.push(`Their growth <span class="health dec">is a bit painful,</span> as they irritate the tissue of your breasts in order to produce the fluid needed to swell.`);
				healthDamage(PC, 10);
			} else if (PC.boobsImplant > 3000 && effect >= 8) {
				r.push(`Their growth <span class="health dec">is uncomfortable,</span> as they irritate the tissue of your breasts in order to produce the fluid needed to swell.`);
				healthDamage(PC, 7);
			} else if (PC.boobsImplant > 2000 && effect >= 9) {
				r.push(`Their growth <span class="health dec">is a bit uncomfortable,</span> as they irritate the tissue of your breasts in order to produce the fluid needed to swell.`);
				healthDamage(PC, 5);
			} else if (PC.boobsImplant > 1000 && effect > 9) {
				r.push(`Their growth <span class="health dec">is a bit uncomfortable,</span> as they irritate the tissue of your breasts in order to produce the fluid needed to swell.`);
				healthDamage(PC, 3);
			}
		}
		if (PC.boobsImplant >= PC.boobs + PC.boobsMilk && PC.boobsImplant > 0) {
			/* catch in case breast implants get larger than boobs */
			r.push(`Your breast tissue has naturally <span class="change positive">stretched and grown</span> to better accommodate your implants.`);
			PC.boobs = PC.boobsImplant + PC.boobsMilk + 10;
		} else if (PC.boobsImplant > 1000) {
			if (PC.boobs - PC.boobsImplant < 1000) {
				if (random(1, 100) > 60) {
					implantsSwellBoobs = 1;
				}
			}
		} else if (PC.boobsImplant > 600) {
			if (PC.boobs - PC.boobsImplant < 500) {
				if (random(1, 100) > 60) {
					implantsSwellBoobs = 1;
				}
			}
		} else if (PC.boobsImplant > 0) {
			if (PC.boobs - PC.boobsImplant < 300) {
				if (random(1, 100) > 60) {
					implantsSwellBoobs = 1;
				}
			}
		}
		if (implantsSwellBoobs === 1) {
			r.push(`Your breast tissue has naturally <span class="change positive">stretched and grown</span> to better accommodate your implants.`);
			PC.boobs += 50;
		}
		if (PC.buttImplantType === "string") {
			r.push(`Your string implants absorb fluid <span class="change positive">slowly swelling your ass</span> week to week.`);
			PC.buttImplant += .25;
			PC.butt += .25;
			if (PC.butt + PC.buttImplant > 10 && PC.buttImplant > 1) {
				r.push(`Your body is unable to handle them at their current size, so some serum is drained from them.`);
				PC.butt -= 1;
				PC.buttImplant -= 1;
			}
			effect = random(1, 8);
			if (PC.buttImplant > 7 && effect >= 2) {
				r.push(`Their growth <span class="health dec">is painful,</span> as they greatly irritate the tissue of your cheeks in order to produce the large amount of fluid needed to continue swelling.`);
				healthDamage(PC, 20);
			} else if (PC.buttImplant > 6 && effect >= 2) {
				r.push(`Their growth <span class="health dec">is painful,</span> as they greatly irritate the tissue of your cheeks in order to produce the large amount of fluid needed to continue swelling.`);
				healthDamage(PC, 20);
			} else if (PC.buttImplant > 5 && effect >= 3) {
				r.push(`Their growth <span class="health dec">is a bit painful,</span> as they irritate the tissue of your cheeks in order to produce the large amount of fluid needed to continue swelling.`);
				healthDamage(PC, 10);
			} else if (PC.buttImplant > 4 && effect >= 4) {
				r.push(`Their growth <span class="health dec">is a bit painful,</span> as they irritate the tissue of your cheeks in order to produce the large amount of fluid needed to continue swelling.`);
				healthDamage(PC, 10);
			} else if (PC.buttImplant > 3 && effect >= 5) {
				r.push(`Their growth <span class="health dec">is uncomfortable,</span> as they irritate the tissue of your cheeks in order to produce the fluid needed to swell.`);
				healthDamage(PC, 5);
			} else if (PC.buttImplant > 2 && effect >= 6) {
				r.push(`Their growth <span class="health dec">is uncomfortable,</span> as they irritate the tissue of your cheeks in order to produce the fluid needed to swell.`);
				healthDamage(PC, 5);
			} else if (PC.buttImplant > 1 && effect >= 7) {
				r.push(`Their growth <span class="health dec">is a bit uncomfortable,</span> as they irritate the tissue of your cheeks in order to produce the fluid needed to swell.`);
				healthDamage(PC, 3);
			} else if (PC.buttImplant > 0 && effect > 7) {
				r.push(`Their growth <span class="health dec">is a bit uncomfortable,</span> as they irritate the tissue of your cheeks in order to produce the fluid needed to swell.`);
				healthDamage(PC, 3);
			}
		}
	}

	function hormoneBalance() {
		const selfManufactured = V.consumerDrugs;
		const hormonePower = selfManufactured ? V.hormoneUpgradePower : 1; // Prescribed ones are better to match their base price.
		if (PC.diet === PCDiet.FEMALE) {
			PC.hormoneBalance += 4;
		} else if (PC.diet === PCDiet.FUTA) {
			if (PC.hormoneBalance > 0) {
				PC.hormoneBalance -= 8;
			} else if (PC.hormoneBalance < 0) {
				PC.hormoneBalance += 8;
			}
		} else if (PC.diet === PCDiet.MALE) {
			PC.hormoneBalance -= 4;
		}
		if (PC.drugs === Drug.FERTILITY) {
			PC.hormoneBalance += 4;
		} else if (PC.drugs === Drug.HORMONEFEMALE) {
			PC.hormoneBalance += 20;
		} else if (PC.drugs === Drug.HORMONEMALE) {
			PC.hormoneBalance -= 20;
		} else if (PC.drugs === Drug.GROWTESTICLE) {
			PC.hormoneBalance -= 4;
		} else if (PC.drugs === Drug.STEROID) {
			PC.hormoneBalance -= 4;
		} else if (PC.drugs === Drug.SUPERFERTILITY) {
			PC.hormoneBalance += 8;
		} else if (PC.drugs === Drug.HYPERTESTICLE) {
			PC.hormoneBalance -= 12;
		}
		if (PC.hormones === 1) {
			PC.hormoneBalance += 4 + (hormonePower * 2);
		} else if (PC.hormones === -1) {
			PC.hormoneBalance -= 4 + (hormonePower * 2);
		}
		if (PC.drugs === Drug.HORMONEENHANCE) {
			if (PC.hormones === 1) {
				PC.hormoneBalance += 4 + (hormonePower * 2);
			} else if (PC.hormones === -1) {
				PC.hormoneBalance -= 4 + (hormonePower * 2);
			} else {
				PC.drugs = Drug.NONE;
				r.push(`You aren't taking hormones, so there's really no reason to take hormone enhancers, is there?`);
			}
		}
		/* NCS helps primary sexual maturity */
		if (PC.geneMods.NCS === 1) {
			if (PC.genes === GenderGenes.FEMALE && PC.hormoneBalance > 0 && PC.pubertyXX === 0) {
				PC.hormoneBalance = Math.clamp(PC.hormoneBalance * 1.5, -400, 400);
			} else if (PC.genes === GenderGenes.MALE && PC.hormoneBalance < 0 && PC.pubertyXY === 0) {
				PC.hormoneBalance = Math.clamp(PC.hormoneBalance * 1.5, -400, 400);
			} else if ((PC.ovaries === 1 || PC.mpreg === 1) && PC.pubertyXX === 0) {
				PC.hormoneBalance += 20;
			} else if (PC.balls > 0 && PC.pubertyXY === 0) {
				PC.hormoneBalance -= 20;
			} else if (PC.genes === GenderGenes.FEMALE) {
				PC.hormoneBalance += 5;
			} else if (PC.genes === GenderGenes.MALE) {
				PC.hormoneBalance -= 5;
			}
		}
		/* androgyny really wants to sit around 0 and will fight changes to do so */
		if (PC.geneticQuirks.androgyny === 2) {
			if (PC.hormoneBalance > 6) {
				PC.hormoneBalance -= 10;
			} else if (PC.hormoneBalance < -6) {
				PC.hormoneBalance += 10;
			}
		}
		if (PC.drugs !== Drug.HORMONEBLOCK) {
			r.push(App.EndWeek.Player.hormones(PC, selfManufactured, hormonePower));
		} else if (PC.drugs === Drug.HORMONEBLOCK) {
			r.push(`The hormone blockers you're on suppress your hormones, natural or not.`);
			if (PC.energy > 20) {
				r.push(`You sex drive is similarly <span class="stat drop">suppressed.</span>`);
				PC.energy--;
			}
			if (PC.hormoneBalance > 0) {
				PC.hormoneBalance -= 5;
			} else if (PC.hormoneBalance < 0) {
				PC.hormoneBalance += 5;
			}
		}

		if (PC.genes === GenderGenes.FEMALE) {
			if ((PC.ovaries === 1 || PC.mpreg === 1) && PC.pubertyXX > 0) {
				if (PC.balls > 0 && PC.ballType !== "sterile" && PC.pubertyXY > 0) {
					if (PC.hormoneBalance > 10) {
						PC.hormoneBalance -= Math.ceil((PC.hormoneBalance - 10) / 40);
					} else if (PC.hormoneBalance < 10) {
						PC.hormoneBalance += Math.ceil((10 - PC.hormoneBalance) / 40);
					}
				} else {
					if (PC.hormoneBalance > 50) {
						PC.hormoneBalance -= Math.ceil((PC.hormoneBalance - 50) / 40);
					} else if (PC.hormoneBalance < 50) {
						PC.hormoneBalance += Math.ceil((50 - PC.hormoneBalance) / 40);
					}
				}
			} else {
				if (PC.balls > 0 && PC.ballType !== "sterile" && PC.pubertyXY > 0) {
					if (PC.hormoneBalance > -30) {
						PC.hormoneBalance -= Math.ceil((PC.hormoneBalance + 30) / 40);
					} else if (PC.hormoneBalance < -30) {
						PC.hormoneBalance += Math.ceil((-30 - PC.hormoneBalance) / 40);
					}
				} else {
					if (PC.hormoneBalance > 10) {
						PC.hormoneBalance -= Math.ceil((PC.hormoneBalance - 10) / 40);
					} else if (PC.hormoneBalance < 10) {
						PC.hormoneBalance += Math.ceil((10 - PC.hormoneBalance) / 40);
					}
				}
			}
		} else if (PC.genes === GenderGenes.MALE) {
			if ((PC.ovaries === 1 || PC.mpreg === 1) && PC.pubertyXX > 0) {
				if (PC.balls > 0 && PC.ballType !== "sterile" && PC.pubertyXY > 0) {
					if (PC.hormoneBalance > -10) {
						PC.hormoneBalance -= Math.ceil((PC.hormoneBalance + 10) / 40);
					} else if (PC.hormoneBalance < -10) {
						PC.hormoneBalance += Math.ceil((-10 - PC.hormoneBalance) / 40);
					}
				} else {
					if (PC.hormoneBalance > 30) {
						PC.hormoneBalance -= Math.ceil((PC.hormoneBalance - 30) / 40);
					} else if (PC.hormoneBalance < 30) {
						PC.hormoneBalance += Math.ceil((30 - PC.hormoneBalance) / 40);
					}
				}
			} else {
				if (PC.balls > 0 && PC.ballType !== "sterile" && PC.pubertyXY > 0) {
					if (PC.hormoneBalance > -50) {
						PC.hormoneBalance -= Math.ceil((PC.hormoneBalance + 50) / 40);
					} else if (PC.hormoneBalance < -50) {
						PC.hormoneBalance += Math.ceil((-50 - PC.hormoneBalance) / 40);
					}
				} else {
					if (PC.hormoneBalance > -10) {
						PC.hormoneBalance -= Math.ceil((PC.hormoneBalance + 10) / 40);
					} else if (PC.hormoneBalance < -10) {
						PC.hormoneBalance += Math.ceil((-10 - PC.hormoneBalance) / 40);
					}
				}
			}
		}
		PC.hormoneBalance = Math.clamp(PC.hormoneBalance, -500, 500);
		if (PC.geneticQuirks.galactorrhea === 2 && random(1, 100) < PC.hormoneBalance && PC.lactation === 0) {
			PC.inappropriateLactation = 1;
		}
	}

	function puberty() {
		if (V.precociousPuberty === 1) {
			let earlyPubertyFlag = 0;
			let precocious = 0;
			if (PC.physicalAge < PC.pubertyAgeXX && (PC.ovaries === 1 || PC.mpreg === 1) && PC.pubertyXX === 0) { // Female type
				/* Just having NCS speeds precocious Puberty, but also hormonal puberty affects are
				* increased while secondary growth is suppressed
				*/
				if (PC.geneMods.NCS === 1) {
					precocious -= 0.8;
				}
				if (PC.diet === PCDiet.FEMALE || PC.diet === PCDiet.FUTA) {
					precocious -= 0.1;
				} else if (PC.diet === PCDiet.FERTILITY) {
					precocious -= 0.1;
				}
				if (PC.drugs === Drug.FERTILITY) {
					precocious -= 0.1;
				} else if (PC.drugs === Drug.HORMONEFEMALE) {
					precocious -= 1;
				} else if (PC.drugs === Drug.HORMONEMALE) {
					precocious += 1;
				} else if (PC.drugs === Drug.GROWTESTICLE) {
					precocious += 0.1;
				} else if (PC.drugs === Drug.STEROID) {
					precocious += 0.2;
				} else if (PC.drugs === Drug.SUPERFERTILITY) {
					precocious -= 0.5;
					if (PC.geneMods.NCS === 0) {
						r.push(`You feel an <span class="change positive">unusually warm sensation</span> in your lower belly and chest.`);
						if (boobSize(PC) < 400 * gigantomastiaMod && random(1, 100) < 30) {
							r.push(`Your <span class="change positive">breasts are budding.</span>`);
							PC.boobs += 50;
						}
						if (PC.hips < 2 && random(1, 100) < 10 * uterineHypersensitivityMod) {
							r.push(`Oddly, <span class="change positive">your hips have widened.</span>`);
							PC.hips += 1;
						}
						if (PC.butt < 4 && random(1, 100) < 10 + (5 * rearQuirk)) {
							r.push(`There's no mistaking that <span class="change positive">your butt has gotten bigger.</span>`);
							PC.butt += 1;
						}
					}
				} else if (PC.drugs === Drug.HYPERTESTICLE) {
					precocious += .5;
				}
				if (PC.hormones === 1) {
					precocious -= 0.1;
				} else if (PC.hormones === -1) {
					precocious += 0.2;
				}
				if (PC.drugs === Drug.HORMONEENHANCE) {
					if (PC.hormones === 1) {
						precocious -= 0.1;
					} else if (PC.hormones === -1) {
						precocious += 0.1;
					}
				} else if (PC.drugs === Drug.HORMONEBLOCK) {
					precocious += 1;
				}
				if (PC.geneticQuirks.neoteny >= 2) {
					precocious += 0.1;
				}
				if (PC.geneMods.NCS === 1) {
					precocious *= 2;
				}
				if (PC.geneticQuirks.progeria === 2) {
					precocious -= 10;
				}
				PC.pubertyAgeXX += precocious;
				if (PC.physicalAge < PC.pubertyAgeXX && PC.physicalAge > PC.pubertyAgeXX - 3 && PC.pubertyAgeXX < V.fertilityAge) {
					earlyPubertyFlag = 1;
				}
			}
			if (PC.physicalAge < PC.pubertyAgeXY && PC.balls >= 1 && PC.pubertyXY === 0) { // Male type
				precocious = 0;
				/* Just having NCS speeds precocious Puberty, but also hormonal puberty affects are increased while secondary growth is suppressed */
				if (PC.geneMods.NCS === 1) {
					precocious -= 0.8;
				}
				if (PC.diet === PCDiet.MALE || PC.diet === PCDiet.FUTA) {
					precocious -= 0.1;
				}
				if (PC.drugs === Drug.FERTILITY) {
					precocious += 0.2;
				} else if (PC.drugs === Drug.HORMONEFEMALE) {
					precocious += 1;
				} else if (PC.drugs === Drug.HORMONEMALE) {
					precocious -= 1;
				} else if (PC.drugs === Drug.GROWTESTICLE) {
					precocious -= 0.1;
				} else if (PC.drugs === Drug.STEROID) {
					precocious -= 0.2;
				} else if (PC.drugs === Drug.HYPERTESTICLE) {
					precocious -= 0.5;
					if (PC.geneMods.NCS === 0) {
						r.push(`You feel an <span class="change positive">unusual heat</span> in your groin. It feels good to touch.`);
						if (PC.dick.isBetween(0, 4) && random(1, 100) < 30) {
							r.push(`You penis has grown <span class="change positive">heavy, hot and oversensitive.</span>`);
							PC.dick += 1;
						}
						if (PC.balls < 4 && random(1, 100) < 30) {
							r.push(`Not only are your balls <span class="change positive">heavy and tingling,</span> but you feel like you've been leaking a little.`);
							PC.balls += 1;
						}
					}
				} else if (PC.drugs === Drug.SUPERFERTILITY) {
					precocious -= 1;
				}
				if (PC.hormones === 1) {
					precocious += 0.2;
				} else if (PC.hormones === -1) {
					precocious -= 0.1;
				}
				if (PC.drugs === Drug.HORMONEENHANCE) {
					if (PC.hormones === 1) {
						precocious += 0.1;
					} else if (PC.hormones === -1) {
						precocious -= 0.1;
					}
				} else if (PC.drugs === Drug.HORMONEBLOCK) {
					precocious += 1;
				}
				if (PC.geneticQuirks.neoteny >= 2) {
					precocious += 0.1;
				}
				if (PC.geneMods.NCS === 1) {
					precocious *= 2;
				}
				if (PC.geneticQuirks.progeria === 2) {
					precocious -= 10;
				}
				PC.pubertyAgeXY += precocious;
				if (PC.physicalAge < PC.pubertyAgeXY && PC.physicalAge > PC.pubertyAgeXY - 3 && PC.pubertyAgeXY < V.potencyAge && earlyPubertyFlag !== 1) {
					earlyPubertyFlag = 1;
				}
			}
			if (earlyPubertyFlag === 1) {
				r.push(`It looks like you are <span class="puberty">beginning to go through puberty,</span> if a bit early.`);
			}
		}
		if (PC.ovaries === 1 || PC.mpreg === 1) {
			if (PC.pubertyXX === 0) {
				if (PC.physicalAge >= PC.pubertyAgeXX) {
					PC.pubertyXX = 1;
					if (PC.energy.isBetween(0, 41)) {
						PC.energy += 10;
					}
					// in the future, improve this to hide puberty up until period?
					r.push(`After several days of unrelenting pain in your stomach, you have your first period.`);
					if (PC.genes === GenderGenes.FEMALE) {
						r.push(`<span class="puberty">You're a woman now.</span>`);
					} else {
						r.push(`<span class="puberty">Your ladyparts have matured</span> and are now fully functional.`);
					}
					if (PC.geneticQuirks.gigantomastia === 3 && random(1, 100) < PC.hormoneBalance) {
						PC.geneticQuirks.gigantomastia = 2;
					}
					if (PC.geneticQuirks.macromastia === 3 && random(1, 100) < PC.hormoneBalance) {
						PC.geneticQuirks.macromastia = 2;
					}
					if (PC.geneticQuirks.galactorrhea === 3) {
						PC.geneticQuirks.galactorrhea = 2;
						if (random(1, 100) < PC.hormoneBalance && PC.lactation === 0) {
							PC.inappropriateLactation = 1;
						}
					}
				} else if (PC.physicalAge >= PC.pubertyAgeXX - 1 && PC.hormoneBalance > 20 && PC.energy < 30) {
					r.push(`You feel a little <span class="libido inc">tingly</span> inside whenever you notice a mans bulge or catch sight of a slave's penis.`);
					PC.energy++;
				}
			}
		}
		if (PC.balls > 0 && PC.ballType !== "sterile") {
			if (PC.pubertyXY === 0) {
				if (PC.physicalAge >= PC.pubertyAgeXY) {
					PC.pubertyXY = 1;
					if (PC.energy.isBetween(0, 41)) {
						PC.energy += 20;
					}
					r.push(`You wake up from a wonderful dream only to discover you've wet the bed.`);
					if (S.Concubine && haremLength() >= 1) {
						r.push(`Your giggling bedslaves coddle and caress you before enlightening your sleep-fogged mind as to just what happened the best way they know how.`);
						if (PC.genes === GenderGenes.MALE) {
							r.push(`<span class="puberty">You became a man that night.</span>`);
						} else {
							r.push(`<span class="puberty">You know what it feels like to be a man now.</span>`);
						}
					} else {
						r.push(`You've been feeling very amorous lately, and this only solidifies that ${(PC.genes === GenderGenes.MALE) ? "you're becoming a man" : "your maleness has reached maturity"}. Luckily for you, you're living the ideal life to satisfy your newfound needs.`);
					}

					if (PC.geneticQuirks.galactorrhea === 3) {
						PC.geneticQuirks.galactorrhea = 2;
						if (random(1, 100) < PC.hormoneBalance && PC.lactation === 0) {
							PC.inappropriateLactation = 1;
						}
					}
				} else if (PC.physicalAge >= PC.pubertyAgeXY - 1 && PC.hormoneBalance < -20 && PC.energy < 30) {
					r.push(`You feel certain <span class="libido inc">urges</span> whenever you notice a pair of breasts or catch sight of a slave's exposed pussy.`);
					PC.energy++;
				}
			}
		}
	}

	function bellySagging() {
		if (PC.belly >= 1000000) {
			if (PC.bellySag < 50) {
				PC.bellySag += 1;
				if (PC.preg > 0) {
					PC.bellySagPreg += 1;
				}
			} else if (PC.preg > 0 && PC.bellySagPreg < 50) {
				PC.bellySagPreg += 1;
			}
			if (PC.geneMods.rapidCellGrowth === 1) {
				PC.bellySag += 3;
				if (PC.preg > 0) {
					PC.bellySagPreg += 3;
				}
			}
		} else if (PC.belly >= 750000) {
			if (PC.bellySag < 30) {
				PC.bellySag += 0.7;
				if (PC.preg > 0) {
					PC.bellySagPreg += 0.7;
				}
			} else if (PC.preg > 0 && PC.bellySagPreg < 30) {
				PC.bellySagPreg += 0.7;
			}
			if (PC.geneMods.rapidCellGrowth === 1) {
				PC.bellySag += 1;
				if (PC.preg > 0) {
					PC.bellySagPreg += 1;
				}
			}
		} else if (PC.belly >= 600000) {
			if (PC.bellySag < 20) {
				PC.bellySag += 0.5;
				if (PC.preg > 0) {
					PC.bellySagPreg += 0.5;
				}
			} else if (PC.preg > 0 && PC.bellySagPreg < 20) {
				PC.bellySagPreg += 0.5;
			}
			if (PC.geneMods.rapidCellGrowth === 1) {
				PC.bellySag += 1;
				if (PC.preg > 0) {
					PC.bellySagPreg += 1;
				}
			}
		} else if (PC.belly >= 450000) {
			if (PC.bellySag < 15) {
				PC.bellySag += 0.4;
				if (PC.preg > 0) {
					PC.bellySagPreg += 0.4;
				}
			} else if (PC.preg > 0 && PC.bellySagPreg < 15) {
				PC.bellySagPreg += 0.4;
			}
			if (PC.geneMods.rapidCellGrowth === 1) {
				PC.bellySag += 0.5;
				if (PC.preg > 0) {
					PC.bellySagPreg += 0.5;
				}
			}
		} else if (PC.belly >= 300000) {
			if (PC.bellySag < 10) {
				PC.bellySag += 0.3;
				if (PC.preg > 0) {
					PC.bellySagPreg += 0.3;
				}
			} else if (PC.preg > 0 && PC.bellySagPreg < 10) {
				PC.bellySagPreg += 0.3;
			}
			if (PC.geneMods.rapidCellGrowth === 1) {
				PC.bellySag += 0.5;
				if (PC.preg > 0) {
					PC.bellySagPreg += 0.5;
				}
			}
		} else if (PC.belly >= 100000) {
			if (PC.bellySag < 10) {
				PC.bellySag += 0.2;
				if (PC.preg > 0) {
					PC.bellySagPreg += 0.2;
				}
			} else if (PC.preg > 0 && PC.bellySagPreg < 10) {
				PC.bellySagPreg += 0.2;
			}
			if (PC.geneMods.rapidCellGrowth === 1) {
				PC.bellySag += 0.3;
				if (PC.preg > 0) {
					PC.bellySagPreg += 0.3;
				}
			}
		} else if (PC.bellyPreg >= 10000 || PC.bellyImplant >= 10000) {
			if (PC.bellySag < 5) {
				PC.bellySag += 0.1;
				if (PC.preg > 0) {
					PC.bellySagPreg += 0.1;
				}
			} else if (PC.preg > 0 && PC.bellySagPreg < 5) {
				PC.bellySagPreg += 0.1;
			}
			if (PC.geneMods.rapidCellGrowth === 1) {
				PC.bellySag += 0.2;
				if (PC.preg > 0) {
					PC.bellySagPreg += 0.2;
				}
			}
		}
		if (PC.bellySagPreg > PC.bellySag) {
			PC.bellySagPreg = PC.bellySag;
		}

		if (PC.bellySag > 0 && PC.belly < 1500 && PC.geneMods.rapidCellGrowth !== 1) {
			let bellySagReduction = 0;
			if (PC.muscles > 95) {
				if (random(1, 100) > 1) {
					r.push(`Your loose, yet still visible, abdominals <span class="change positive">are eager to get back in shape</span> after being`);
					if (PC.bellySagPreg > 0) {
						r.push(`worked over by pregnancy`);
					} else {
						r.push(`stretched out`);
					}
					r.push(`for so long.`);
					bellySagReduction = 0.5;
				}
			} else if (PC.muscles >= 30) {
				if (random(1, 100) > 20) {
					r.push(`Your sagging muscular belly <span class="change positive">firms up</span> readily`);
					if (PC.bellySagPreg > 0) {
						r.push(`after being stretched out of shape by your pregnancy.`);
					} else {
						r.push(`now that you aren't constantly stretching it out by overinflating.`);
					}
					bellySagReduction = 0.4;
				}
			} else if (PC.muscles >= 5) {
				if (random(1, 100) > 40) {
					r.push(`Your sagging belly <span class="change positive">regains some of its tone</span>`);
					if (PC.bellySagPreg > 0) {
						r.push(`after being stretched out of shape by your pregnancy.`);
					} else {
						r.push(`now that you aren't constantly stretching it out by overinflating.`);
					}
					bellySagReduction = 0.3;
				}
			} else {
				if (random(1, 100) > 60) {
					r.push(`Your sagging belly <span class="change positive">tightens up a little</span>`);
					if (PC.bellySagPreg > 0) {
						r.push(`after your pregnancy.`);
					} else {
						r.push(`now that you aren't constantly stretching it out by overinflating.`);
					}
					bellySagReduction = 0.2;
				}
			}
			PC.bellySag -= bellySagReduction;
			PC.bellySagPreg -= bellySagReduction;
			PC.bellySag = Math.max(0, PC.bellySag);
			PC.bellySagPreg = Math.max(0, PC.bellySagPreg);
		}
	}

	function anaphrodisiacEffects(PC, oldEnergy) {
		const maxEnergyGain = Math.round((75 - oldEnergy) / 9.3);
		if (PC.aphrodisiacs === -1 && PC.energy - oldEnergy > maxEnergyGain) {
			r.push(`Anaphrodisiacs help <span class="libido dec">keep your sex drive under control.</span>`);
			PC.energy = oldEnergy + maxEnergyGain;
		}
	}

	function mainLaborTriggers() {
		if (PC.pregControl !== GestationDrug.LABOR) {
			if (WombBirthReady(PC, PC.pregData.normalBirth * 1.075) > 0) {
				// check for really ready fetuses - 43 weeks - max, overdue
				startLabor(PC);
			} else if (WombBirthReady(PC, PC.pregData.normalBirth) > 0 && (random(1, 100) > 50)) {
				// check for really ready fetuses - 40 weeks - normal
				startLabor(PC);
			} else if (WombBirthReady(PC, PC.pregData.normalBirth / 1.1111) > 0 && (random(1, 100) > 90) && PC.geneMods.progenitor !== 1) {
				// check for really ready fetuses - 36 weeks minimum
				startLabor(PC);
			}
		}
		if (isInLabor(PC)) {
			if (PC.counter.birthsTotal > 0) {
				r.push(`<span class="red">A dull cramp runs down your middle.</span> You'll be giving birth soon.`);
			} else {
				r.push(`You begin to experience <span class="red">odd cramps</span> in your lower body. Contractions, more than likely.`);
			}
		}
		/*
		if (V.dangerousPregnancy === 1 && !isInLabor(PC)) {
			let miscarriage = 0;
			if ((PC.pregAdaptation < 500) || (PC.preg > slave.pregData.normalBirth / 2 && PC.womb.find((ft) => ft.genetics.geneticQuirks.polyhydramnios === 2))) {
				let miscarriageChance = -10;
				miscarriageChance += ((PC.bellyPreg / 1000) - PC.pregAdaptation);
				// this could use to not be linear
				if (PC.inflation > 0) {
					miscarriageChance += 10;
				}
				if (PC.health.health < -20) {
					miscarriageChance -= (PC.health.health);
				} else if (PC.health.health > 80) {
					miscarriageChance -= (PC.health.health / 10);
				}
				if (PC.physicalAge > 60) {
					miscarriageChance += (PC.physicalAge - 60);
				}
				if (PC.weight < -50) {
					miscarriageChance -= PC.weight;
				}
				if (onBedRest(PC)) {
					miscarriageChance -= 300;
				}
				if (PC.bellyAccessory === "a support band") {
					miscarriageChance -= 30;
				}
				if (PC.pregControl === GestationDrug.LABOR) {
					miscarriageChance -= 10000;
				}
				if (PC.preg > PC.pregData.normalBirth / 2 && PC.womb.find((ft) => ft.genetics.geneticQuirks.polyhydramnios === 2)) {
					if (PC.bellyPreg > 50000) {
						miscarriageChance = 100;
					}
				}
				if (miscarriageChance > random(0, 100) && slave.geneMods.progenitor !== 1) {
					const chance = random(1, 100);
					if (PC.preg >= PC.pregData.normalBirth / 1.33) {
						startLabor(PC);
						miscarriage = 1;
					} else if (PC.preg > PC.pregData.normalBirth / 1.48) {
						PC.prematureBirth = 1;
						startLabor(PC);
						miscarriage = 1;
					} else if (PC.preg > PC.pregData.normalBirth / 1.6 && chance > 10) {
						PC.prematureBirth = 1;
						startLabor(PC);
						miscarriage = 1;
					} else if (PC.preg > PC.pregData.normalBirth / 1.73 && chance > 40) {
						PC.prematureBirth = 1;
						startLabor(PC);
						miscarriage = 1;
					} else if (PC.preg > PC.pregData.normalBirth / 1.81 && chance > 75) {
						PC.prematureBirth = 1;
						startLabor(PC);
						miscarriage = 1;
					} else {
						// this needs to move to birth
						r.push(`Your overwhelmed body has <span class="miscarriage">forced you to miscarry,</span> possibly saving your life.`);
						TerminatePregnancy(PC);
						actX(PC, "abortions");
						if (PC.abortionTat > -1) {
							PC.abortionTat++;
							r.push(`The temporary tattoo of a child has been replaced with your ${ordinalSuffix(PC.abortionTat)} crossed out infant.`);
							cashX(forceNeg(V.modCost), "slaveMod", PC);
						}
						miscarriage = 1;
					}
				}
			}
			if (V.seeExtreme === 1) {
				if (miscarriage !== 1 && PC.bellyPreg >= 100000 && PC.geneMods.rapidCellGrowth !== 1) {
					// If she can't relieve the pressure that way, will she hold?
					if (PC.bellyPreg >= 500000 || PC.wombImplant !== "restraint") {
						if ((PC.belly > (PC.pregAdaptation * 3200)) || PC.bellyPreg >= 500000) {
							let burstChance = -80;
							burstChance += ((PC.belly / 1000) - PC.pregAdaptation);
							// this could use to not be linear
							if (PC.health.health < -20) {
								burstChance -= (PC.health.health);
							} else if (PC.health.health > 80) {
								burstChance -= (PC.health.health / 10);
							}
							if (PC.weight < 0) {
								burstChance -= PC.weight;
							}
							burstChance -= PC.bellySag;
							burstChance -= PC.muscles;
							if (PC.bellyAccessory === "a support band") {
								burstChance -= 10;
							}
							if (onBedRest(PC)) {
								burstChance -= 250;
							}
							if (burstChance > random(0, 100)) {
								burst(PC);
							} else {
								r.push(`Constant <span class="health dec">`);
								if (PC.geneticQuirks.uterineHypersensitivity === 2) {
									r.push(`painful orgasms`);
								} else {
									r.push(`sharp pains`);
								}
								r.push(`</span> emanate from your womb; <span class="health dec">it is beginning to break!</span>`);
							}
						}
					}
				}
			}
		}
		*/
	}

	function slaveDeath() {
		/*
		let deathSeed;
		if (PC.health.health <= -90) {
			deathSeed = (PC.health.health - PC.physicalAge - (PC.chem * 2) - (PC.addict * 2));
			if (PC.weight < -50 || PC.weight > 95) {
				deathSeed -= 100;
			}
			if (PC.weight > 190) {
				deathSeed -= 100;
			}
			if (PC.aphrodisiacs > 0) {
				deathSeed -= (75 * PC.aphrodisiacs);
			}
			if (PC.inflationType === InflationLiquid.APHRO) {
				deathSeed -= (100 * PC.inflation);
			}
			if (PC.diet === PCDiet.MEDICINAL) {
				deathSeed += 200;
			}
			if (random(1, 1000) > (600 + deathSeed)) {
				planDeath(PC, "lowHealth");
			}
			if ((PC.aphrodisiacs > 0 || PC.inflationType === InflationLiquid.APHRO) && random(1, 1000) > (400 + deathSeed)) {
				planDeath(PC, "overdosed");
			}
		}
		if (V.seeAge === 1) {
			deathSeed = ((PC.health.health * 2) - (PC.physicalAge * 2) - (PC.chem * 4) - (PC.addict * 3));
			if (PC.physicalAge >= Math.max((70 + (PC.health.health / 5) - (PC.addict) - (PC.chem / 20)), 50) && random(1, 1000) > 800 + deathSeed) {
				planDeath(PC, "oldAge");
			}
		}
		*/
	}

	function hairGrowth() {
		if (PC.hLength < 200) {
			PC.hLength += 1;
		}
	}
};
