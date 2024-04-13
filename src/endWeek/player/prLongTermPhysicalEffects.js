// cSpell:ignore prLTPE

App.EndWeek.Player.longTermPhysicalEffects = function(PC = V.PC) {
	/** @type {(string|HTMLElement|DocumentFragment)[]} */
	const r = [];

	const gigantomastiaMod = PC.geneticQuirks.gigantomastia === 2 ? (PC.geneticQuirks.macromastia === 2 ? 3 : 2) : 1;
	const boobSize = App.Medicine.fleshSize(PC, 'boobs');
	const buttSize = App.Medicine.fleshSize(PC, 'butt');
	const faceValue = PC.face - PC.faceImplant;
	const averageDicking = V.slaves.filter(s => canAchieveErection(s) && isSlaveAvailable(s) && ((V.policies.sexualOpenness === 1 && s.devotion > 20 && App.Utils.sexAllowed(V.PC, s)) || s.toyHole === ToyHole.DICK));
	const isNull = PC.dick === 0 && PC.vagina === -1;

	teeth();
	if (V.weightAffectsAssets !== 0) {
		weightAffectsAssets();
	}
	if (PC.anus > 0 || PC.vagina > 2) {
		holeRelaxation();
	}
	malenessAdjustments();
	if ((PC.balls === 0 || PC.ballType === "sterile") && PC.ovaries === 0 && PC.mpreg === 0) {
		noHormoneProduction();
	}
	if (isNull) {
		nullSexualFrustration();
	}
	sexualSatisfaction();
	ageEffects();
	if (PC.geneMods.NCS === 1) {
		NCSEffects();
	}
	geneticQuirkEffects();
	lactationEffects();
	boobsEffects(); // Moved up from middle of the mobility and oversized asset set of text.
	bellyEffects(); // Moved up from middle of the mobility and oversized asset set of text.

	return App.Events.makeNode(r);

	function teeth() {
		if (PC.teeth === "straightening braces") {
			r.push(`Your orthodontia are aggravating, but a perfect smile goes a long way in business.`);
			if (random(1, 10) === 1) {
				r.push(`Your braces <span class="improvement">have straightened your teeth</span> at last. They can now be safely removed, or left on if you're into that sort of thing.`);
				PC.teeth = "cosmetic braces";
			}
		} else if (PC.teeth === "baby") {
			if (V.seeAge === 1 && PC.physicalAge >= 6 && random(0, (PC.birthWeek * 2))) {
				PC.teeth = "mixed";
				r.push(`Your loose tooth fell out. You're beginning your path to adulthood.`);
			}
		} else if (PC.teeth === "mixed") {
			if (V.seeAge === 1 && PC.physicalAge >= 12 && random(0, (PC.birthWeek * 2))) {
				r.push(`The last of your baby teeth has fallen out this week.`);
				if (PC.race === "catgirl") {
					PC.teeth = "fangs";
					r.push(`You now have a pretty, but intimidatingly sharp, set of feline fangs.`);
				} else {
					const crookedTeethGen = ((faceValue + 100) / 10);
					if (random(0, crookedTeethGen) < 5) {
						r.push(`Unfortunately,`);
						if (random(0, 5) < 1) {
							PC.teeth = "gapped";
							r.push(`they left you a large <span class="noteworthy">gap</span> between your front teeth that`);
						} else {
							PC.teeth = "crooked";
							r.push(`your teeth came in <span class="noteworthy">crooked</span> and`);
						}
						r.push(`will require braces to correct.`);
					} else {
						r.push(`Such a <span class="noteworthy">lovely smile</span> will be a boon when negotiating business deals.`);
						PC.teeth = "normal";
					}
				}
			}
		}
	}

	function weightAffectsAssets() {
		if (PC.weight <= 10) {
			if (PC.diet !== PCDiet.FATTEN) {
				const rearQuirk = PC.geneticQuirks.rearLipedema === 2 ? 2 : 0;
				let normBreasts;
				let normButt;
				let adj1;
				let adj2;
				let adj3;
				if (PC.hormoneBalance > 30 && PC.geneMods.NCS !== 1) { // 'Expected' breast size based on weight for feminine-bodied slaves
					normBreasts = Math.trunc(((PC.natural.boobs / 5) + (PC.weight + 100) * 5 + 2 * PC.lactationAdaptation) * (0.85 + PC.hormoneBalance / 400) * gigantomastiaMod); // (PC.natural.boobs / 5 replaced 100, consider rebalacing?)
					normButt = ((PC.weight + 100) * .025 * ( 0.9 + PC.hormoneBalance / 600) * ( rearQuirk / 2 + 1));
				} else { // For masculine-and childish-bodied slaves
					normBreasts = ((PC.weight + 100) * 2 + PC.lactationAdaptation) * gigantomastiaMod;
					normButt = ((PC.weight + 100) * .0125 * (rearQuirk / 2 + 1));
				}
				if (PC.weight < -95) {
					adj1 = "desperately underweight";
					adj2 = "plush";
					adj3 = "healthy";
				} else if (PC.weight <= -30) {
					adj1 = "underweight";
					adj2 = "big";
					adj3 = "plush";
				} else if (PC.weight < -10) {
					adj1 = "skinny";
					adj2 = "huge";
					adj3 = "big";
				} else {
					adj1 = "thin";
					adj2 = "monstrous";
					adj3 = "huge";
				}
				if (boobSize > (4 * normBreasts + 400) && gigantomastiaMod !== 3) {
					r.push(`Your ${adj1} body <span class="change negative">burns fat off your ${adj2} boobs.</span>`);
					PC.boobs -= 50 / gigantomastiaMod;
				} else if (buttSize > (3 * normButt + 3) && rearQuirk !== 2) {
					r.push(`Your ${adj1} body <span class="change negative">burns fat off your ${adj2} butt.</span>`);
					PC.butt -= 0.4;
				} else if (boobSize > (3 * normBreasts + 200) && gigantomastiaMod !== 3) {
					r.push(`Your ${adj1} body <span class="change negative">burns some fat off your ${adj3} boobs.</span>`);
					PC.boobs -= 25;
				} else if (buttSize > (2 * normButt + 2) && rearQuirk !== 2) {
					r.push(`Your ${adj1} body <span class="change negative">burns some fat off your ${adj3} butt.</span>`);
					PC.butt -= 0.2;
				}
			}
		}
	}

	function holeRelaxation() {
		let averageDickSize = 0;
		if (averageDicking.length > 0) {
			averageDicking.forEach(s => averageDickSize += s.dick);
			averageDickSize = averageDickSize / averageDicking.length;
		}
		if (PC.geneMods.rapidCellGrowth !== 1) {
			if (PC.vagina >= 3 && averageDickSize < 4) {
				if (averageDicking.length > 0) {
					r.push(`Taking a break from big dicks`);
				} else {
					r.push(`A bit of rest`);
				}
				r.push(`lets <span class="improvement">your loose vagina recover a little.</span>`);
				PC.vagina -= 1;
			} else if (PC.anus >= 3 && averageDickSize < 4) {
				if (averageDicking.length > 0) {
					r.push(`A rest from taking big dicks up the ass`);
				} else {
					r.push(`A bit of rest`);
				}
				r.push(`lets <span class="improvement">your gaping anus recover a little.</span>`);
				PC.anus -= 1;
			}
		}
		if (PC.anus >= PC.analArea) {
			if (random(1, 100) > (80 - (20 * (PC.anus - PC.analArea)))) {
				PC.analArea += 1;
				r.push(`Your anal area is becoming accustomed to being`);
				if (PC.analArea > 3) {
					r.push(`permanently gaped, and the puckered skin around your butthole now runs from your tailbone all the way down to the`);
					if (PC.vagina > -1) {
						r.push(`bottom of your pussy.`);
					} else {
						r.push(`base of your dick.`);
					}
				} else if (PC.analArea > 2) {
					r.push(`very loose, and the puckered skin around your butthole now covers more of the space between your buttocks.`);
				} else if (PC.analArea > 1) {
					r.push(`used, and it now looks quite lewd.`);
				} else {
					r.push(`penetrated, and to put it delicately, is beginning to look a little lewd.`);
				}
			}
		}
	}

	function malenessAdjustments() {
		if (PC.dick > 0) {
			if (PC.foreskin > 0) {
				if (PC.foreskin - PC.dick < -1) {
					if (canAchieveErection(PC)) {
						r.push(`Your cock is much too fat for your foreskin, making your erections so uncomfortably constrictive that <span class="libido dec">your appetite for sex is reduced</span> by the reluctance to undergo the discomfort.`);
						PC.energy -= 2;
						if (random(1, 300) < PC.energy || PC.geneMods.rapidCellGrowth === 1) {
							r.push(`But you power through it, steadily <span class="change positive">stretching your foreskin</span> until it fits snugly rather than acting as a noose for your dick.`);
							PC.foreskin += 1;
						}
					}
				} else if (PC.foreskin - PC.dick < 0) {
					if (canAchieveErection(PC)) {
						r.push(`Your cockhead is a bit too fat for your foreskin, making erections uncomfortable to achieve; your <span class="libido dec">arousal is slightly impeded</span> by the reluctance to undergo the discomfort.`);
						PC.energy -= 1;
						if (random(1, 500) < PC.energy || PC.geneMods.rapidCellGrowth === 1) {
							r.push(`But you power through it, steadily <span class="change positive">stretching your foreskin</span> until it fits your dick snugly like it should.`);
							PC.foreskin += 1;
						}
					}
				} else if (PC.foreskin - PC.dick > 1 && PC.geneMods.rapidCellGrowth !== 1) {
					if (canAchieveErection(PC)) {
						if (random(30, 110) > PC.energy) {
							r.push(`Your penis is so small that even when hard, your loose foreskin rarely retracts. Despite your regular erections, <span class="change negative">your foreskin atrophies.</span>`);
							PC.foreskin -= 1;
						}
					} else {
						if (random(40, 120) > PC.energy) {
							r.push(`<span class="change negative">Your foreskin atrophies,</span> which is not surprising, since your penis has shrunk and you can't get it up.`);
							PC.foreskin -= 1;
						}
					}
				}
			}
			if (PC.clit > 0) {
				r.push(`Since you have a penis atop your vagina in place of a clitoris, you <span class="change negative">can't really say you have a clit anymore.</span>`);
				PC.clit = 0;
			}
		}
		// balls but no dick
		if (PC.balls > 0) {
			if (PC.scrotum > 0) {
				const extraScrotum = PC.scrotum - PC.balls;
				if (extraScrotum < -1) {
					r.push(`Your nuts are much too big for your ballsack, and a source of constant discomfort. Your <span class="libido dec">appetite for sex is reduced</span> by how much humping makes your junk hurt.`);
					PC.energy -= 2;
					if (random(0, 2) === 0 || PC.geneMods.rapidCellGrowth === 1) {
						r.push(`Your scrotum <span class="change positive">stretches out naturally</span> as your balls force it to accept their size.`);
						PC.scrotum += 1;
					}
				} else if (extraScrotum < 0 && PC.balls > 5) {
					if (random(0, 4) === 0 || PC.geneMods.rapidCellGrowth === 1) {
						r.push(`Your heavy balls tug your scrotum downward, and it <span class="change positive">stretches out naturally</span> under their weight.`);
						PC.scrotum += 1;
					}
				} else if (extraScrotum === -1) {
					if (random(0, 5) === 0 || PC.geneMods.rapidCellGrowth === 1) {
						r.push(`Your scrotum <span class="change positive">stretches out naturally</span> as it adapts to your newly expanded balls.`);
						PC.scrotum += 1;
					}
				} else if (extraScrotum > 1 && PC.geneMods.rapidCellGrowth !== 1) {
					if (PC.hormoneBalance >= 100) {
						if (random(0, 2) === 0) {
							r.push(`<span class="change negative">Your ballsack atrophies,</span> which is not surprising, since you're on female hormones and your balls have gotten so small.`);
							PC.scrotum -= 1;
						}
					}
				}
			} else {
				if (PC.balls > 2 && PC.diet !== PCDiet.CUM) {
					r.push(`Your balls reside inside your abdomen, and while they still work there, it's not where they're designed to be. Routine scans show that <span class="change negative">they've atrophied,</span>`);
					if (PC.balls > 3) {
						r.push(`and will probably continue to do so until they stabilize at a below-average size.`);
					} else {
						r.push(`but are not likely to get any smaller.`);
					}
					PC.balls -= 1;
				}
			}
		}
	}

	function noHormoneProduction() {
		if (PC.energy > 5) {
			if (PC.energy <= 95) {
				r.push(`Since you lack the means of producing natural sex hormones, <span class="change negative">your sex drive suffers</span> accordingly.`);
				PC.energy -= 1;
			} else {
				r.push(`You're such a nymphomaniac that your lack of natural sex hormones doesn't really bother you.`);
			}
		}
	}

	function nullSexualFrustration() {
		let frustration = 0;
		if (PC.energy > 20) {
			r.push(`You`);
			if (averageDicking.length > 0 && PC.anus > 0) {
				if (PC.prostate !== 0) {
					r.push(`lack`);
					if (V.seeDicks > 0) {
						r.push(`a dick or`);
					}
					r.push(`a pussy, but you do have a prostate and ${averageDicking.length > 1 ? "slaves" : "a slave"} to work it, giving you at least one sexual outlet.`);
					frustration = 1;
				} else {
					r.push(`have no`);
					if (V.seeDicks > 0) {
						r.push(`dick, pussy, or prostate`);
					} else {
						r.push(`pussy`);
					}
					r.push(`and no easy way to get off.`);
					frustration = 2;
				}
			} else {
				r.push(`have no`);
				if (V.seeDicks > 0) {
					r.push(`dick, no`);
				}
				r.push(`pussy, and are above sticking things in your ass, leaving you no easy way to get off.`);
				frustration = 2;
			}
		}
		if (frustration > 0) {
			r.push(`This <span class="change negative">impacts your libido</span> and is just really irritating.`);
			PC.energy -= frustration * 3;
		}
	}

	function sexualSatisfaction() {
		const sexPartners = V.slaves.filter(s => App.Utils.sexAllowed(V.PC, s) && isSlaveAvailable(s) && s.assignment !== Job.FUCKTOY).shuffle();
		const wives = sexPartners.filter(s => s.relationship === -3);
		if (V.debugMode) {
			r.push(`Need: ${PC.need}.`);
			r.push(`Need to be removed: ${PC.deferredNeed}.`);
		}
		// Fuck wives every week
		wives.forEach(s => {
			if (averageDicking.includes(s)) {
				if (PC.vagina > 0) {
					seX(PC, "vaginal", s, "penetrative");
					PC.need -= 3;
				} else if (PC.anus > 0) {
					seX(PC, "anal", s, "penetrative");
					if (PC.prostate > 0) {
						PC.need -= 2;
					}
				} else {
					seX(PC, "oral", s, "penetrative");
				}
			} else if (!isNull) {
				SimpleSexAct.Player(s, 2);
				PC.need -= 2;
			}
		});
		// apply slave report need changes
		PC.need += PC.deferredNeed;
		// Still horny? Fuck your chattel. Or just masturbate.
		if (isPlayerFrigid()) {
			if (!isNull && PC.need > 0) {
				if (PC.belly >= 15000) {
					r.push(`As much as you would like to`);
					if (canAchieveErection(PC)) {
						r.push(`jerk off,`);
					} else if (PC.vagina > 0) {
						r.push(`use your dildo,`);
					} else if (PC.clit >= 3) {
						r.push(`jerk your clit,`);
					} else if (PC.dick > 0) {
						r.push(`play with your dick,`);
					} else {
						r.push(`finger yourself,`);
					}
					r.push(`there is just no way for you to comfortably reach around your bulbous middle to do so.`);
					if (canMove(PC)) {
						r.push(`At least you can still reposition yourself and find relief through alternative means, like`);
						if (canAchieveErection(PC) || PC.clit >= 3) {
							r.push(`humping`);
						} else {
							r.push(`grinding against`);
						}
						r.push(`a pillow.`);
						PC.need -= 10;
					} else {
						r.push(`Even worse, you are too heavy to be able position yourself in a way that would allow you to pleasure yourself by alternative means.`);
					}
				} else {
					r.push(`You`);
					if (canAchieveErection(PC)) {
						r.push(`jerk off`);
					} else if (PC.vagina > 0) {
						r.push(`ride your favorite toy`);
					} else if (PC.clit >= 3) {
						r.push(`jerk your clit`);
					} else if (PC.dick > 0) {
						r.push(`play with your dick`);
					} else {
						r.push(`finger yourself`);
					}
					r.push(`when you feel the need to masturbate and manage to find a private moment to do so.`);
					PC.need -= 14;
				}
			}
		} else {
			let prLTPE = 0;
			while (PC.need > 0 && sexPartners.length !== prLTPE) {
				if (averageDicking.includes(sexPartners[prLTPE])) {
					if (PC.vagina > 0) {
						seX(PC, "vaginal", sexPartners[prLTPE], "penetrative");
						PC.need -= 2;
					} else if (PC.anus > 0) {
						seX(PC, "anal", sexPartners[prLTPE], "penetrative");
						if (PC.prostate > 0) {
							PC.need--;
						}
					} else {
						seX(PC, "oral", sexPartners[prLTPE], "penetrative");
					}
				} else if (!isNull) {
					SimpleSexAct.Player(sexPartners[prLTPE]);
					PC.need--;
				}
				prLTPE++;
			}
		}
		PC.lusty = 0;
		// Needs more holes to fuck, or more dedicated fucktoys.
		if (V.masterSuiteUpgradeLuxury === 2 && fuckSlavesLength() > 1 && !isPlayerFrigid()) {
			let fuckpitSex = Math.ceil(V.PC.energy / 2);
			const fuckpitSlaves = V.slaves.filter(s => s.assignment === Job.MASTERSUITE || s.assignment === Job.CONCUBINE || (s.assignment === Job.FUCKTOY && (canWalk(s) || (canMove(s) && s.rules.mobility === "permissive"))));
			r.push(`Whenever you feel the urge for sexual release building and have the time to slip away, you head back to ${V.masterSuiteName} to slide into the fuckpit orgy to sate your lust.`);
			while (fuckpitSex > 0) {
				SimpleSexAct.Player(fuckpitSlaves.random());
				fuckpitSex--;
			}
			PC.need = 0;
		} else if (PC.need > 0) {
			if (PC.need > PC.energy / 2) {
				const decay = 1 + Math.trunc(PC.need / 20);
				r.push(`You just can't get off enough to sate your`);
				if (PC.aphrodisiacs > 0 || PC.inflationType === InflationLiquid.APHRO) {
					r.push(`aphrodisiac fueled sex drive's demands, and the constant, distracting frustration`);
					if (PC.balls > 0) {
						r.push(`leaves you with <span class="health dec">a painful case of blue balls.</span>`);
					} else {
						r.push(`<span class="health dec">stresses your body considerably.</span>`);
					}
					healthDamage(PC, decay);
				} else if (PC.need > PC.energy && PC.energy >= 70) {
					r.push(`powerful sex drive's demands, and the constant, distracting frustration`);
					if (PC.balls > 0) {
						r.push(`leaves you with <span class="health dec">a painful case of blue balls.</span>`);
					} else {
						r.push(`<span class="health dec">stresses your body considerably.</span>`);
					}
					r.push(`Unable to achieve the release you need, your <span class="libido dec">runaway libido is damaged.</span>`);
					healthDamage(PC, decay);
					PC.energy -= decay;
				} else {
					r.push(`${PC.energy > 40 ? "healthy " : ""}sex drive's demands, and the constant, distracting frustration <span class="libido dec">wears away at your libido.</span>`);
					PC.energy -= decay;
				}
				PC.lusty = 1;
			} else if (PC.need > PC.energy / 4) {
				r.push(`You get off enough to sate your`);
				if (PC.aphrodisiacs > 0 || PC.inflationType === InflationLiquid.APHRO) {
					r.push(`aphrodisiac fueled`);
				}
				r.push(`sex drive's demands, but not enough to fully satisfy it. You can't help but feel a little bit more amorous than you should be.`);
				// PC.lusty = 1;
			} else {
				r.push(`You get off enough to sate your sex drive, but still find yourself craving a little dessert.`);
			}
		} else if (PC.energy > 20) {
			r.push(`Your sex drive is completely sated by your chattel.`);
		}
		if (PC.lusty !== 1) {
			if (PC.energy > 20 && PC.energy < 70 && PC.diet !== PCDiet.WEANING) {
				r.push(`The sexually charged atmosphere of the arcology rubs off on you, <span class="libido inc">steadily bolstering your appetite for sex.</span>`);
				PC.energy++;
			}
		}
		if (PC.oldEnergy <= 95 && PC.energy > 95) {
			r.push(`Usually a quick fuck helps takes the edge off, but you're still`);
			if (canAchieveErection(PC)) {
				r.push(`hard and rearing to go again;`);
			} else if (PC.dick > 0) {
				r.push(`engorged and leaking precum everywhere;`);
			} else  {
				r.push(`hot, bothered, and dripping wet;`);
			}
			r.push(`you've slipped into <span class="change negative">nymphomania!</span>`);
		}
		if (PC.pubertyXX === 1 && PC.vagina !== -1) {
			if (PC.energy > 60 && PC.vaginaLube === 0 && (V.policies.sexualOpenness === 1 || averageDicking.length > 0) && random(1, 100) > 95) {
				r.push(`With all the excitement in your life, your formerly dry pussy <span class="change positive">starts moistening up.</span>`);
				PC.vaginaLube++;
			} else if (PC.energy <= 20 && PC.vaginaLube > 0 && V.policies.sexualOpenness === 0 && averageDicking.length === 0 && random(1, 100) <= 5) {
				r.push(`Since you aren't getting any and have no interest in doing so, your naturally wet pussy <span class="change negative">cuts back on fluid production.</span>`);
				PC.vaginaLube--;
			}
		}
		PC.energy = Math.clamp(PC.energy, 0, 100);
	}

	function ageEffects() {
		if (PC.geneMods.immortality !== 1) {
			if (PC.physicalAge >= 45) {
				if (PC.physicalAge >= 70) {
					if (PC.health.condition >= -90) {
						if (PC.diet !== PCDiet.MEDICINAL) {
							if (PC.diet !== PCDiet.HEALTHY || !canEatFood(PC) || PC.chem > 0) {
								if (PC.physicalAge - 30 > random(1, 100)) {
									r.push(`Your advanced age comes hand in hand with increased health complications. <span class="health dec">This was not a good week for you.</span>`);
									healthDamage(PC, 10);
								}
							}
						}
					}
				} else {
					if (PC.health.condition > 20) {
						if (PC.diet !== PCDiet.MEDICINAL) {
							if (PC.diet !== PCDiet.HEALTHY || !canEatFood(PC) || PC.chem > 0) {
								if (PC.physicalAge - 30 > random(1, 100)) {
									r.push(`This was a rough week for you. It seems your <span class="health dec">age</span> is catching up to you.`);
									healthDamage(PC, 10);
								}
							}
						}
					}
				}
				if (PC.geneticQuirks.neoteny !== 2) {
					if (PC.health.condition < random(1, 100) || PC.chem > 0) {
						if (PC.physicalAge - 30 > random(1, 100)) {
							r.push(`Your face looks <span class="change negative">just a little older</span> than it did last week. Stress is starting to take its toll on you.`);
							PC.face -= 2;
						}
					}
				}
			}
			if (V.seeAge === 1) {
				if (PC.visualAge > 15 && PC.physicalAge > 15 && PC.geneticQuirks.neoteny !== 2) {
					if (PC.health.condition < random(-50, 0) || PC.chem > 0 || PC.health.tired > 90) {
						if (PC.ageAdjust === -40) {
							r.push(`Life has been hard on you lately, leaving you <span class="change negative">looking a little older</span> than you should.`);
							PC.visualAge++;
							PC.ageAdjust = 0;
						} else if (random(1, 100) > 40) {
							PC.ageAdjust--;
						}
					}
				}
			}
		} else {
			if (PC.physicalAge > 26 || PC.visualAge > 26) {
				r.push(`A side effect of the immortality treatment is steady reversal of old age; <span class="change positive">you look a little younger</span> than you did last week.`);
			}
			if (PC.physicalAge > 26) {
				PC.physicalAge--;
			}
			if (PC.visualAge > 26) {
				PC.visualAge--;
			}
		}
		if (PC.geneticQuirks.progeria === 2 && PC.birthWeek > 2) {
			if (((PC.birthWeek - 2) % 5) === 0) { // progeria should increase age on every fifth week but not zeroth week as the birthday age up has already handled that.
				if (V.geneticMappingUpgrade > 0 || (PC.physicalAge >= PC.actualAge + 5)) {
					r.push(`You watch your body rapidly degrade due to your progeria. <span class="change negative">Death will not have to wait long for you.</span>`);
				} else {
					r.push(`You seem <span class="change negative">a little older</span> this week than the last, and not the way you'd expect; you seem to be aging in years, not weeks.`);
				}
				PC.physicalAge++;
				PC.visualAge++;
				if (PC.ovaryAge >= 0) { // immortal ovaries counteract progeria's effect on ovaryAge
					PC.ovaryAge += 5; // Since we are using .physicalAge, we need to manipulate things to prevent the possibility of pregnancy.
				}
			}
		}
	}

	function NCSEffects() {
		// NCS youthening and shrinkage of giant organs and regular shrinking for regular organs happening when not youthening
		let countNCS = 0;
		let youthening = 0;
		const youtheningLevel = Math.round(Math.clamp(((PC.physicalAge - 8) / 4) + .25, 0, 10));
		/*
		**	To prevent the NCS from firing on every attribute in one year, this variable counts the
		**	number of NCS affects that fire. Most affects will only trigger if one or two other
		**	have already fired, but won't fire beyond. There are two exceptions to that, first,
		**	massively oversized growth assets, which will fire always, e.g. boobs > 5000, dick > 10,
		**	etc. Second, Body structure, hips/shoulders may fire any time, (decreasing random).
		**
		**	Youthening (visual age year number reduction)
		**	Happens on a sliding scale, the older a slave is, the faster the de-aging goes.
		**	Consequently, it goes slower as the visual age approaches an 8 year old loli/shota body.
		**	Age 45+=> auto age reduction 1 year per 1 week.
		**	Age 41-44=> age reduction 1 year per 2 weeks.
		**	Age 37-40=> age reduction 1 year per 3 weeks.
		**	Age 33-36=> age reduction 1 year per 4 weeks.
		**	Age 29-32=> age reduction 1 year per 5 weeks.
		**	Age 25-28=> age reduction 1 year per 6 weeks.
		**	Age 21-24=> age reduction 1 year per 7 weeks.
		**	Age 17-20=> age reduction 1 year per 8 weeks.
		**	Age 13-16=> age reduction 1 year per 9 weeks.
		**	Age 9-12=> slowest age reduction 1 year per 10 weeks.
		**
		**	To track this, the slave.NCSyouthening field counts the *charge* of youthening the slave
		**	currently has, and if it's over the youthening requirements, the slave will become younger.
		**
		**	Additionally while years fly off quickly in the beginning for older slaves, and oversized body parts
		**	shrink away, other secondary characteristics slowly but surely drop off, but based on the above
		**	*charge* of youthening.
		**
		**	Note that with this system a 45 year old slave given NCS would be indistinguishable from an 8 year
		**	old in a little over 4 years time.
		*/
		PC.NCSyouthening++;
		if (PC.visualAge > 8 && PC.NCSyouthening >= (11 - youtheningLevel)) {
			// NCS: youthening fires!
			if (V.seeAge === 1) {
				r.push(`The accumulated effects of your <span class="ncs">NCS</span> grant you a <span class="change positive">slightly more youthful appearance.</span>`);
			}
			PC.visualAge--;
			countNCS++;
			youthening++;
		}
		/*
		**	height always fires if over 176 cm,
		**	also fires if the slave is tall for their visual age
		**	also if they are in * NCSyouthening 3-5 (reverse teen years) and
		**	over 126 cm
		**	or over height (30% chance)
		*/
		const nonsurgicalHeight = PC.height - 10 * PC.heightImplant;
		const heightDelta = PC.height - PC.natural.height;
		let shrinkage;
		if ((nonsurgicalHeight > 176) || (heightDelta > 5) || ((PC.NCSyouthening >= 6) && ((nonsurgicalHeight > 126) || (heightDelta > 0)) && (random(1, 100) < 30))) {
			if (heightDelta > 15) {
				shrinkage = 5;
			} else if (heightDelta > 5) {
				shrinkage = 4;
			} else if (heightDelta > -5) {
				shrinkage = 3;
			} else if (heightDelta > -15) {
				shrinkage = 2;
			} else {
				shrinkage = 1;
			}
			r.push(`Your <span class="ncs">NCS</span> gradually <span class="ncs">reduces your stature, leaving you a little shorter.</span>`);
			PC.height -= shrinkage;
			countNCS++;
		}
		/*
		**	Boobs, nipples and areolae.
		**	Boobs always fires for over 5000 cc,
		**	nipples/areolae shrinkage will fire for boobs under 5000,
		**	where nipples are tiny/cute at 30% chance.
		**	anything over 300 will fire if
		**	the slave's accumulated youthening is 6 or higher,
		**	or by a 50% chance.
		*/
		/** @type {FC.NippleShape} */
		let nipplesString;
		if ((boobSize >= 5000) && (random(1, 100) < 90) && gigantomastiaMod !== 3) {
			r.push(`Your <span class="ncs">NCS</span> <span class="change negative">reduces the size of your heaving breasts.</span>`);
			PC.boobs -= Math.round(boobSize * .11);
			countNCS++;
		} else if ((boobSize <= 5000) && (![NippleShape.CUTE, NippleShape.FUCKABLE, NippleShape.TINY, NippleShape.FLAT].includes(PC.nipples)) && (random(1, 100) < 30)) {
			if (PC.nipples === NippleShape.INVERTED) {
				nipplesString = NippleShape.PARTIAL;
			} else if (PC.nipples === NippleShape.PARTIAL) {
				nipplesString = NippleShape.PUFFY;
			} else {
				nipplesString = either(NippleShape.CUTE, NippleShape.TINY);
			}
			r.push(`Your <span class="ncs">NCS</span> has <span class="change positive">rendered your nipples ${nipplesString}.</span>`);
			PC.nipples = nipplesString;
			if (PC.areolae > 1) {
				r.push(`Your areolae have also shrunk down to a more normal`);
				if (PC.areolaeShape !== "circle") {
					r.push(`size while retaining their unique ${PC.areolaeShape} shapes.`);
				} else {
					r.push(`size.`);
				}
				PC.areolae = 1;
				countNCS++;
			}
		} else if ((boobSize >= 300) && ((PC.NCSyouthening >= 6) || (random(1, 100) < 50)) && gigantomastiaMod !== 3) {
			r.push(`Your <span class="ncs">NCS</span> <span class="change negative">trims down your chest.</span>`);
			PC.boobs -= Math.round(boobSize * .09);
			countNCS++;
		}
		/*
		**	Hips and Shoulders reshaping
		**	One or the other can happen per week as long as the hips and shoulders are bigger than the smallest
		**	level, though the chances get much more likely for the widest sizes.
		*/
		if (((PC.hips - Math.abs(PC.hipsImplant)) > -2) && (random(1, 100) < ((PC.hips + 3) * 18))) {
			r.push(`Your <span class="ncs">NCS</span> works to <span class="change negative">narrow the size of your`);
			if (PC.hips >= 2) {
				r.push(`freakish`);
			} else if (PC.hips >= 0) {
				r.push(`wide`);
			} else if (PC.hips >= -2) {
				r.push(`already slender`);
			}
			r.push(`hips.</span>`);
			PC.hips -= 1;
			countNCS++;
		} else if (((PC.shoulders - Math.abs(PC.shouldersImplant)) > -2) && (random(1, 100) < ((PC.shoulders + 3) * 18))) {
			r.push(`Your <span class="ncs">NCS</span> works to <span class="change negative">narrow the size of your`);
			if (PC.shoulders >= 2) {
				r.push(`domineering`);
			} else if (PC.shoulders >= -2 && PC.shoulders < 0) {
				r.push(`already slender`);
			}
			r.push(`shoulders.</span>`);
			PC.shoulders -= 1;
			countNCS++;
		}
		/*
		**	Dick and clit shrinkage
		**	Massive 10+ Dicks or 5+ Clits always fire, and at double power.
		**	Below that by chance, (reducing chances by current size). In general clits shrink faster.
		*/
		if (PC.dick >= 10) {
			r.push(`Your <span class="ncs">NCS</span> tries its best to <span class="change negative">reduce the size of your giant dick</span> to something more fitting of a child.`);
			PC.dick -= 2;
			countNCS++;
		} else if (PC.clit >= 5) {
			r.push(`Your <span class="ncs">NCS</span> tries its best to <span class="change negative">reduce the size of your enormous clit-dick</span> to something more appropriate for a child.`);
			PC.clit -= 2;
			countNCS++;
		} else if ((countNCS < 3) && (PC.dick > 2) && (random(1, 100) < ((PC.dick + 1) * 9))) {
			r.push(`Your <span class="ncs">NCS</span> tries its best to <span class="change negative">reduce the size of your dick</span> to something more fitting of a child.`);
			PC.dick -= 1;
			countNCS++;
		} else if ((countNCS < 3) && (PC.clit >= 1) && (random(1, 100) < ((PC.clit + 2) * 16))) {
			r.push(`Your <span class="ncs">NCS</span> has <span class="change negative">reduced the size of your clit.</span>`);
			PC.clit -= 1;
			countNCS++;
		}
		/*
		**	Balls.
		**	Massive testicles (10+) drop by 2 levels,
		**	Others decrease by chance based on current size.
		*/
		if (PC.balls >= 10) {
			r.push(`Your <span class="ncs">NCS</span> gets busy <span class="change negative">reducing the size of your titanic balls.</span>`);
			PC.balls -= 2;
			countNCS++;
		} else if ((countNCS < 3) && (PC.balls > 2) && (random(1, 100) < ((PC.balls + 1) * 8))) {
			r.push(`Your <span class="ncs">NCS</span> gets busy <span class="change negative">reducing the size of your balls.</span>`);
			PC.balls -= 1;
			countNCS++;
		}
		/*
		**	Butt.
		**	Tremendous butts burn of by 2 points.
		**	Regular butts based on chances, decrease as the size does.
		*/
		if (buttSize >= 10) {
			r.push(`Your <span class="ncs">NCS</span> <span class="change negative">reduces the size of your bulbous butt</span> to something more reasonable.`);
			PC.butt -= 2;
			countNCS++;
		} else if ((countNCS < 3) && (buttSize >= 1) && (random(1, 100) < (PC.butt * 9))) {
			r.push(`Your <span class="ncs">NCS</span> <span class="change negative">reduces the size of your butt a little.</span>`);
			PC.butt -= 1;
			countNCS++;
		}
		/*
		**	Scrotum and Labia
		**	One or the other can fire per week.
		**	Pendulous ballsacks or sagging labia will always fire.
		**	Otherwise by reducing chance based on current sizes, but labia are a little more likely.
		*/
		if (PC.geneMods.rapidCellGrowth !== 1) {
			if (PC.scrotum >= 5) {
				r.push(`Your <span class="ncs">NCS</span> helps <span class="change negative">tighten your pendulous scrotum.</span>`);
				PC.scrotum -= 2;
				countNCS++;
			} else if (PC.labia >= 5) {
				r.push(`Your <span class="ncs">NCS</span> kicks in and <span class="change negative">reduces the size of your sagging labia.</span>`);
				PC.labia -= 2;
				countNCS++;
			} else if ((countNCS < 3) && (PC.labia >= 1) && (random(1, 100) < (PC.labia * 11))) {
				r.push(`Your <span class="ncs">NCS</span> kicks in and <span class="change negative">reduces the size of your labia.</span>`);
				PC.labia -= 1;
				countNCS++;
			} else if ((countNCS < 3) && (PC.scrotum > 1) && (random(1, 100) < (PC.scrotum * 8.5))) {
				r.push(`Your <span class="ncs">NCS</span> helps <span class="change negative">tighten up your scrotum.</span>`);
				PC.scrotum -= 1;
				countNCS++;
			}
		}
		/*
		**	Voice.
		**	Small chance for any non-childlike voice.
		*/
		if ((countNCS < 3) && (PC.voice < 3) && PC.voice !== 0 && (random(1, 100) > (PC.voice * 15))) {
			r.push(`Your <span class="ncs">NCS</span> has <span class="change positive">raised the pitch of your voice; you now sounds more childlike.</span>`);
			PC.voice += 1;
			countNCS++;
		}
		/*
		**	Pussy/Ass-Pussy rejuvenation.
		**	10% chance of either one rejuvenating per week. (The Child Whore's delight!)
		*/
		if (PC.geneMods.rapidCellGrowth !== 1) {
			if ((countNCS < 2) && (PC.vagina > 1) && (random(1, 100) < (PC.vagina * 10))) {
				r.push(`Your <span class="ncs">NCS</span> manages to <span class="change positive">reverse the stretch in your vagina, leaving it more childlike.</span>`);
				PC.vagina -= 1;
				countNCS++; // These are in case anything is ever added after.
			} else if ((countNCS < 2) && (PC.anus > 1) && (random(1, 100) < (PC.anus * 10))) {
				r.push(`Your <span class="ncs">NCS</span> effectively <span class="change positive">reverses the stretching in your anus, leaving your rear a little more youthful.</span>`);
				PC.anus -= 1;
				countNCS++;
			}
		}
		/*
		**	reset youthening for those that just got younger (see age above) or for already lolified slaves.
		*/
		if (youthening > 0 || PC.NCSyouthening > 9) {
			PC.NCSyouthening = 0;
		}
	}

	function geneticQuirkEffects() {
		/* progeria and neoteny triggers */
		if (PC.geneticQuirks.neoteny === 3 && PC.physicalAge >= 12) {
			PC.geneticQuirks.neoteny = 2;
		}
		if (PC.geneticQuirks.progeria === 3 && PC.physicalAge >= 3) {
			PC.geneticQuirks.progeria = 2;
		}
		/* macromastia random trigger + growth */
		if (PC.geneticQuirks.gigantomastia === 3 && random(70 - PC.physicalAge, 300) < PC.hormoneBalance) {
			PC.geneticQuirks.gigantomastia = 2;
		}
		if (PC.geneticQuirks.macromastia === 3 && random(70 - PC.physicalAge, 300) < PC.hormoneBalance) {
			PC.geneticQuirks.macromastia = 2;
		}
		if (PC.geneticQuirks.macromastia === 2 && PC.geneticQuirks.gigantomastia === 2) {
			if (boobSize < 100000 && PC.weight >= -95) {
				if (V.geneticMappingUpgrade > 0) {
					r.push(`Your <span class="change positive">breasts grow ever larger</span> due to your abnormal strain of gigantomastia.`);
				} else {
					r.push(`Your <span class="change positive">breasts are spilling out of your bra</span> and you just purchased it last week; there is no clear reason for why you should be experiencing growth like this.`);
				}
				PC.boobs += 30;
			}
		} else if (PC.geneticQuirks.gigantomastia === 2) {
			if (boobSize < 25000 && PC.weight >= -95) {
				if (V.geneticMappingUpgrade > 0) {
					r.push(`Your <span class="change positive">breasts have grown larger</span> due to your gigantomastia.`);
				} else {
					r.push(`Your new bra is tight around your chest. It seems your <span class="change positive">breasts have grown slightly</span> since last week, but you cannot account for why.`);
				}
				PC.boobs += 20;
			}
		} else if (PC.geneticQuirks.macromastia === 2) {
			if (boobSize < 5000 && PC.weight >= -95) {
				if (V.geneticMappingUpgrade > 0) {
					r.push(`You <span class="change positive">experience slight breast growth</span> from your macromastia.`);
				}
				PC.boobs += 10;
			}
		}
		if (PC.geneticQuirks.galactorrhea === 2 && PC.inappropriateLactation === 1) {
			if (V.geneticMappingUpgrade > 0) {
				r.push(`You have galactorrhea, and now <span class="change positive">your breasts produce milk.</span> It was inevitable, really.`);
			} else {
				r.push(`You have <span class="change positive">spontaneously begun lactating.</span> You'll have to run tests on your food and drink, some hormones must have gotten mixed in somehow.`);
			}
			PC.lactation = 1;
			PC.lactationDuration = 2;
		}
		if (PC.geneticQuirks.rearLipedema === 2 && PC.butt < 20 && PC.weight >= -95) {
			if (V.geneticMappingUpgrade > 0) {
				r.push(`It won't be long until your lipedema <span class="change positive">expands your ass</span> to the point nothing will fit it again.`);
			} else {
				r.push(`Every week <span class="change positive">your underwear feels a little smaller;</span> the menials that handle your wash clearly need to learn how to do their job.`);
			}
			PC.butt += .1;
		}

		if (PC.geneticQuirks.uterineHypersensitivity === 2) {
			if (PC.vaginaLube < 2 && PC.vagina !== -1 && PC.preg >= PC.pregData.normalBirth * .75) {
				r.push(`You're so pregnant and so horny${V.geneticMappingUpgrade > 0 ? ", thanks to your hypersensitive uterus," : ""} that it comes as little surprise when your cunt <span class="change positive">starts producing more sexual fluids.</span>`);
				PC.vaginaLube += 1;
			}
		}
	}

	function lactationEffects() {
		if (PC.lactation > 1) {
			if (PC.geneMods.NCS === 1) {
				// Power struggle for sure
				if (PC.boobs < 500) {
					r.push(`The powerful lactation drugs implanted in your chest <span class="change positive">slowly swell your petite breasts.</span>`);
					PC.boobs += 10;
				}
			} else if (PC.boobs < 800) {
				r.push(`Your <span class="change positive">small breasts rapidly swell</span> to meet the production demanded by your lactation implants.`);
				PC.boobs += 100;
			} else if (PC.boobs < 1600) {
				r.push(`Your <span class="change positive">big breasts slowly swell</span> under your lactation implants' pressure to produce even more milk.`);
				PC.boobs += 50;
			} else if (PC.boobs < 3000 * gigantomastiaMod) {
				r.push(`Your <span class="change positive">enormous breasts grow little by little</span> as your lactation implants push them to produce even more milk.`);
				PC.boobs += 25;
			}
			PC.lactationDuration = 2;
		}
		if (PC.rules.lactation === "induce") {
			if (PC.lactation > 0) {
				PC.rules.lactation = "maintain";
			} else {
				r.push(`You pay a lot of attention to your breasts, and insist that your slaves do as well during sex.`);
				r.push(induceLactation(PC, 3));
				if (PC.lactation === 1) {
					r.push(`Now it is just a matter of <span class="noteworthy">maintaining production.</span>`);
					PC.rules.lactation = "maintain";
				}
			}
		} else if (PC.lactation === 0) {
			PC.rules.lactation = "none";
		} else if (PC.rules.lactation === "maintain") {
			r.push(`You regularly see to your breasts to make sure your milk production doesn't dry up; be it by hand, milker, or mouth, you keep yourself comfortably drained.`);
			PC.lactationDuration = 2;
		} else if (PC.rules.lactation === "sell") {
			const milk = milkAmount(PC);
			let milkSale;
			r.push(`Whenever you have a free moment and a chest swollen with milk, you spend your time attached to the nearest milker. As a result, you produce ${milk} liters of sellable milk over the week.`);
			if (FutureSocieties.isActive('FSPastoralist')) {
				if (V.arcologies[0].FSPastoralistLaw === 1) {
					milkSale = Math.round(milk * ((28 * (V.rep/1000)) + Math.trunc(V.arcologies[0].FSPastoralist / 30)));
					r.push(`Since breast milk is ${V.arcologies[0].name}'s only legal dairy product, and yours is in a class all of its own, society can't get enough of it and you make <span class="yellowgreen">${cashFormat(milkSale)}.</span>`);
				} else {
					milkSale = Math.round(milk * ((12 * (V.rep/1000)) + Math.trunc(V.arcologies[0].FSPastoralist / 30)));
					r.push(`Since milk is fast becoming a major part of ${V.arcologies[0].name}'s dietary culture, and yours is in a class all of its own, you make <span class="yellowgreen">${cashFormat(milkSale)}.</span>`);
				}
			} else {
				milkSale = milk * 8;
				r.push(`Your milk is sold for <span class="yellowgreen">${cashFormat(milkSale)}.</span>`);
			}
			PC.lactationDuration = 2;
			cashX(milkSale, "personalBusiness");
		}
		if (PC.lactation === 1) {
			if (PC.boobsMilk > 0) {
				const milkToFleshRatio = PC.boobsMilk / App.Medicine.fleshSize(PC, 'boobs');
				if (milkToFleshRatio > 2) {
					r.push(`Your breasts <span class="health dec">feel like they are going to explode with milk.</span> Spending the week like this is excruciating,`);
					healthDamage(PC, 20);
				} else if (milkToFleshRatio > 0.5) {
					r.push(`Having breasts so swollen with milk that every motion hurts is <span class="health dec">very unpleasant.</span> Spending a week like this only makes it worse,`);
					healthDamage(PC, 5);
				} else {
					r.push(`You spend the week with breasts aching for release,`);
				}
			}
			if (PC.lactationDuration === 0) {
				if (PC.geneticQuirks.galactorrhea === 2 && random(1, 100) <= PC.lactationAdaptation) {
					r.push(`and eventually you lose control, thoroughly soaking yourself in an amusingly lewd display.`);
					if (V.geneticMappingUpgrade > 0) {
						r.push(`Normally this would spell the end of your lactation, but your galactorrhea won't let that come to pass and maintains your production despite the lack of demand.`);
					}
					PC.boobsMilk = Math.round(PC.boobsMilk / 2);
					PC.boobs -= PC.boobsMilk;
					PC.lactationDuration = 1;
				} else {
					if (PC.boobsMilk > 0) {
						r.push(`but without regular use, your <span class="change negative">lactation finally ends</span> and you can drain your remaining milk without encouraging it.`);
					} else {
						r.push(`With no reason to continue production, your <span class="yellow">lactation has stopped.</span>`);
					}
					PC.boobs -= PC.boobsMilk;
					PC.boobsMilk = 0;
					PC.lactation = 0;
				}
			}
		}
		if (PC.lactation > 0 && PC.geneMods.livestock === 1 && PC.lactationAdaptation < 200) {
			PC.lactationAdaptation = Math.min(PC.lactationAdaptation + 4, 200);
		}
	}

	function boobsEffects() {
		if (PC.breastMesh !== 1) {
			if (PC.boobs - (PC.muscles * 30) > 5000 && PC.boobs <= 8000 && PC.boobsImplant / PC.boobs < .50) { // Check now requires breasts to be less than half implant to sag.
				if (PC.physicalAge < random(10, 200)) {
					if (PC.boobShape === BreastShape.PERKY) {
						r.push(`Breasts of your size and weight just <span class="change negative">cannot remain perky;</span> your nipples now point forward as your boobs rest heavily against the chest beneath them.`);
						PC.boobShape = BreastShape.TORPEDO;
					} else if (PC.boobShape !== BreastShape.SAGGY) {
						r.push(`Your breasts are so heavy that gravity <span class="change negative">forces them to become saggy.</span> Your nipples now point downward and your bosom sways pendulously with every motion unless you restrain it.`);
						PC.boobShape = BreastShape.SAGGY;
					}
				}
			} else if (PC.boobsImplant / PC.boobs >= .90 && PC.boobs > 2000 && ![BreastShape.SAGGY, BreastShape.DOWNWARD, BreastShape.SPHERICAL].includes(PC.boobShape) && random(1, 100) > 70) {
				r.push(`Your massive implants take up so much of your breasts that <span class="change negative">they become firm and round.</span> Your nipples now point forward, if not a little downward and to the side, as your boobs begin to pull away from your chest under their weight.`);
				PC.boobShape = BreastShape.SPHERICAL;
			}
		}
		// Oversized breast shrinkage
		let triggerSize;
		if (V.oversizedBoobShrinkage === 2) {
			triggerSize = 50000;
		} else if (V.oversizedBoobShrinkage === 1) {
			if (PC.physicalAge <= 12) {
				triggerSize = (gigantomastiaMod === 2 ? 25000 : 15000);
			} else {
				triggerSize = 30000;
			}
		} else {
			triggerSize = PC.natural.boobs * 20;
			// A well-developed cow should have udders
			triggerSize += PC.lactationAdaptation * (PC.lactation > 0 ? 20 : 10);
			if (PC.physicalAge <= 12) {
				triggerSize *= (gigantomastiaMod === 2 ? .75 : .5);
			}
			// Give fat girls a little extra leeway
			triggerSize += PC.weight * 2;
			triggerSize = Math.trunc(triggerSize / 10) * 10;
		}
		if (boobSize > triggerSize) {
			if (V.arcologies[0].FSAssetExpansionistResearch === 0) {
				if (![Drug.GROWBREAST, Drug.INTENSIVEBREAST, Drug.HYPERBREAST, "breast enhancers"].includes(PC.drugs)) {
					if (PC.bellyPreg < 300000 && PC.hormoneBalance < 300 && gigantomastiaMod !== 3) {
						if (boobSize < triggerSize * 2) {
							r.push(`Your breasts are larger than your body can possibly sustain without pharmaceutical intervention, and they <span class="change negative">naturally lose mass.</span>`);
							PC.boobs -= 25;
						} else {
							r.push(`Your breasts are far, far beyond what ${V.oversizedBoobShrinkage !== 0 ? "a human" : "your"} body can sustain without pharmaceutical intervention, and they <span class="change negative">naturally lose mass.</span>`);
							PC.boobs -= 50 / gigantomastiaMod;
						}
						if (PC.geneMods.NCS === 1 && random(1, 100) > 50 * gigantomastiaMod) {
							r.push(`This effect is massively compounded by your <span class="ncs">NCS.</span>`);
							PC.boobs -= Math.round(boobSize * .1);
						}
					}
				}
			}
		}
		// boobs size nipple effects
		if (PC.nipples === NippleShape.FUCKABLE && (PC.boobs - PC.boobsImplant < 500)) {
			r.push(`Without the necessary flesh to support them, your fuckable nipples pop out and stay out. They have <span class="change negative">reverted to being huge.</span>`);
			PC.nipples = NippleShape.HUGE;
		} else if (PC.nipples === NippleShape.FLAT && (PC.boobsImplant / PC.boobs < 0.75)) {
			r.push(`With your breasts no longer being overstretched by implants, your flat nipples have a chance to relax and adopt a more natural shape. They now <span class="change positive">protrude hugely.</span>`);
			PC.nipples = NippleShape.HUGE;
		} else if (PC.boobShape === BreastShape.SPHERICAL && PC.nipples !== NippleShape.FLAT && PC.lactation === 0 && PC.piercing.nipple.weight === 0) { // Lactation and piercings discourage flattening and convert flat nipples to huge ones.
			r.push(`With your implants stretching the skin of your breasts thin, it's only natural that your nipples are also <span class="change negative">pulled flat</span> by the tension.`);
			PC.nipples = NippleShape.FLAT;
		}
	}

	function bellyEffects() {
		if (PC.pregAdaptation > 40 && (PC.belly < 5000 && PC.preg < 1 && PC.pregWeek === 0) && PC.geneticQuirks.uterineHypersensitivity !== 2 && PC.geneMods.livestock !== 1 && PC.geneMods.progenitor !== 1) {
			if (PC.pregAdaptation > 1001) { // TODO: Compact, or expand useless branches below
				PC.pregAdaptation--;
			} else if (PC.pregAdaptation >= 751 && PC.pregAdaptation < 1000) {
				PC.pregAdaptation--;
			} else if (PC.pregAdaptation >= 501 && PC.pregAdaptation < 750) {
				PC.pregAdaptation--;
			} else if (PC.pregAdaptation >= 251 && PC.pregAdaptation < 500) {
				PC.pregAdaptation--;
			} else if (PC.pregAdaptation >= 101 && PC.pregAdaptation < 250) {
				PC.pregAdaptation--;
			} else if (PC.pregAdaptation >= 51 && PC.pregAdaptation < 100) {
				PC.pregAdaptation--;
			}
		}
		if (PC.cervixImplant >= 1) {
			if (PC.bellyImplant >= 800000 || (PC.bellyImplant > 130000 && V.arcologies[0].FSTransformationFetishistResearch !== 1)) {
				r.push(`Your cervix implant detected that the volume of filler in your belly its implant's threshold, and <span class="change negative">opens backflow</span> several times throughout week.`);
				if (V.arcologies[0].FSTransformationFetishistResearch !== 1) {
					PC.bellyImplant = 120000;
				} else {
					PC.bellyImplant = 750000;
				}
			}
		}
	}
};
