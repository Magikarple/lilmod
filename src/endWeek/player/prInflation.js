App.EndWeek.Player.inflation = function(PC = V.PC) {
	const r = [];

	const gigantomastiaMod = PC.geneticQuirks.gigantomastia === 2 ? (PC.geneticQuirks.macromastia === 2 ? 3 : 2) : 1;
	const boobSize = PC.boobs - PC.boobsImplant - PC.boobsMilk;
	const buttSize = PC.butt - PC.buttImplant;
	const rearLipedemaMod = PC.geneticQuirks.rearLipedema === 2 ? 2 : 0;
	const rearQuirkDivider = rearLipedemaMod === 0 ? 1 : rearLipedemaMod;
	const dairyL = App.Entity.facilities.dairy.employeesIDs().size;
	let distensionTerm;
	let quantityTerm;
	let stateTerm;
	let cow;
	let harvest;

	if (PC.inflationMethod === 3) {
		cow = PC.inflationType === InflationLiquid.MILK ? getSlave(PC.milkSource) : getSlave(PC.cumSource);
	}

	inflationCancellation();
	if (PC.inflation > 0) {
		fillUp();
	}
	if (PC.inflationType === InflationLiquid.MILK || PC.inflationType === InflationLiquid.FOOD) {
		foodMeansFat();
	}
	if (PC.cervixImplant >= 2) {
		cervixImplantFluidConversion();
	}
	// Temp inflation, IE binging in an event, cumflation, etc.
	if (PC.inflation === 0 && PC.inflationType !== InflationLiquid.NONE) {
		bloating();
	}

	return r.join(" ");

	function inflationCancellation() {
		if (PC.inflationType === InflationLiquid.MILK && (PC.inflationMethod === 1 || PC.inflationMethod === 2) && (dairyL === 0 || V.dairy === 0) && V.arcologies[0].FSPastoralistLaw !== 1) {
			r.push(`You no longer have a functional dairy. <span class="yellow">You are unable continue to inflate yourself by this means.</span>`);
			deflate(PC);
		} else if (PC.inflationType === InflationLiquid.MILK && PC.inflationMethod === 3 && cow.lactation === 0) {
			r.push(`${cow.slaveName} is no longer lactating and thus can no longer satisfy your predilections. <span class="yellow">You are unable continue to inflate yourself by this means.</span>`);
			deflate(PC);
		} else if (PC.inflationType === InflationLiquid.CUM && (PC.inflationMethod === 1 || PC.inflationMethod === 2) && (dairyL === 0 || cumSlaves().length === 0 || V.dairy === 0) && V.arcologies[0].FSPastoralistLaw !== 1) {
			r.push(`You no longer have a functional cum dairy. <span class="yellow">You are unable continue to inflate yourself by this means.</span>`);
			deflate(PC);
		} else if (PC.inflationType === InflationLiquid.CUM && PC.inflationMethod === 3 && cow.balls === 0) {
			r.push(`${cow.slaveName} no longer has testicles and thus can no longer satisfy your predilections. <span class="yellow">You are unable continue to inflate yourself by this means.</span>`);
			deflate(PC);
		} else if (PC.bellyImplant >= 1500 || PC.bellyPreg >= 1500) {
			if (PC.inflationType === "undigested food") {
				if (PC.diet !== PCDiet.WEANING) {
					deflate(PC);
				} else {
					r.push(`You were already feeling full before your diet started backing up inside you; <span class="health dec">now it's just agonizing.</span>`);
					healthDamage(PC, 5);
				}
			} else if (PC.inflation > 1) {
				r.push(`You feel a bit too full already to inflate yourself as large as you'd like, so <span class="yellow">you'll have to settle for a lesser filling.</span>`);
				PC.inflation = 1;
				SetBellySize(PC);
			} else if (PC.inflation > 0) {
				PC.bellyFluid = 2000;
				SetBellySize(PC);
			}
		} else if ((PC.inflationType === InflationLiquid.MILK || PC.inflationType === InflationLiquid.CUM) && PC.inflationMethod === 3) {
			harvest = (PC.inflationType === InflationLiquid.MILK) ? Math.trunc(milkAmount(cow) / 14) : Math.trunc(cumAmount(cow) / 70);
			if (PC.inflation === 3 && harvest < 8) {
				r.push(`${cow.slaveName} is having trouble producing enough ${PC.inflationType} to satisfy`);
				if (harvest < 2) {
					r.push(`you at all. <span class="yellow">You are unable continue to inflate yourself by this means.</span>`);
				} else if (harvest < 4) {
					r.push(`you, so you'll have to settle for a meager two liters of the stuff.`);
				} else {
					r.push(`you, so you'll have to settle for a mere four liters of the stuff.`);
				}
			} else if (PC.inflation === 2 && harvest < 4) {
				if (harvest < 2) {
					r.push(`you at all. <span class="yellow">You are unable continue to inflate yourself by this means.</span>`);
				} else {
					r.push(`you, so you'll have to settle for a mere two liters of the stuff.`);
				}
			} else if (PC.inflation === 1 && harvest < 2) {
				r.push(`you at all. <span class="yellow">You are unable continue to inflate yourself by this means.</span>`);
			}
		} else if (PC.inflationType === "undigested food" && PC.diet !== PCDiet.WEANING) {
			if (PC.digestiveSystem === "normal") { // successfully weaned - backup in case cheating player skips weaningDuration 10-13 period
				r.push(`Having weaned yourself from slave food, your strengthened digestive system is finally able to break down the mass of undigested food inside you, <span class="yellow">leaving you with a flat belly.</span>`);
			} else { // gave up on weaning
				r.push(`Since you started eating slave food again, the food backing up in your system has broken down, once again <span class="yellow">leaving you with a flat belly.</span>`);
			}
			PC.bellyFluid = 0; // necessary because deflate() and SetBellySize() don't handle undigested food
			deflate(PC);
			PC.weaningDuration = 0;
		}
	}

	function fillUp() { // weaning food is not handled here!
		if (PC.inflation === 3) {
			distensionTerm = `leaving you looking ready to burst`;
			quantityTerm = `two gallons`;
			stateTerm = `<span class="health dec">It's painful,</span> yet satisfying, to be so full.`;
		} else if (PC.inflation === 2) {
			distensionTerm = `leaving you looking pregnant`;
			quantityTerm = `four liters`;
			stateTerm = `You're so full, the contents of your distended belly wobble heavily with your every motion.`;
		} else {
			distensionTerm = `leaving your belly noticeably distended`;
			quantityTerm = `two liters`;
			stateTerm = `You feel swollen and heavy, but it's not very visible to others.`;
		}

		switch (PC.inflationType) {
			case InflationLiquid.WATER:
			case InflationLiquid.URINE:
				r.push(`You fill your rear with nearly ${quantityTerm} of ${PC.inflationType} to sate your predilections, ${distensionTerm}, whenever you have the chance. ${stateTerm}`);
				if (PC.inflation === 3) {
					healthDamage(PC, 10);
				}
				break;
			case InflationLiquid.APHRO:
				r.push(`You fill your rear with nearly ${quantityTerm} of an aphrodisiac solution, ${distensionTerm},`);
				if (PC.addict > 0) {
					r.push(`sating your addictive itch for now.`);
				} else {
					r.push(`whenever you have the chance.`);
				}
				r.push(stateTerm);
				if (PC.inflation === 3) {
					r.push(`Having your body packed full of aphrodisiacs speeds up your absorption of them,`);
					healthDamage(PC, 10);
				} else if (PC.inflation === 2) {
					r.push(`Being bloated with aphrodisiacs helps to amplify their effects,`);
				} else if (PC.inflation === 1) {
					r.push(`Allowing your body to directly absorb aphrodisiacs amplifies their effects,`);
				}
				if (PC.energy <= 95) {
					r.push(`<span class="libido inc">sending your sex drive into overdrive.</span>`);
					PC.energy += 5 * PC.inflation;
				} else if (canAchieveErection(PC)) {
					r.push(`leaving you with an insatiable erection and the inability to think of things other than fucking.`);
				} else {
					r.push(`leaving you insatiably horny and unable to think of anything other than sex.`);
				}
				if (V.arcologies[0].FSBodyPuristLaw === 0 && V.healthyDrugsUpgrade === 0) {
					r.push(`Maintaining such a high dosage <span class="health dec">isn't healthy for you.</span>`);
					healthDamage(PC, 5);
				}
				PC.chem += 2 * PC.inflation;
				if (PC.geneticQuirks.galactorrhea === 2 && random(1, 100) < PC.hormoneBalance && PC.lactation === 0) {
					PC.inappropriateLactation = 1;
				}
				if (PC.addict > 0) {
					PC.addict += PC.inflation * 3;
				} else if (jsRandom(1, 100) < 40 + (20 * PC.inflation)) {
					r.push(`One thing is clear now; you need to keep doing this. <span class="cyan">You are now an aphrodisiac addict!</span>`);
					PC.addict = 1;
				}
				break;
			case InflationLiquid.MILK:
				if (PC.inflationMethod === 1) {
					r.push(`You chug nearly`);
				} else if (PC.inflationMethod === 2) {
					r.push(`You fill your rear with nearly`);
				} else if (PC.inflationMethod === 3) {
					r.push(`You suckle from ${cow.slaveName} until you've drunk nearly`);
					cow.lactationDuration = 2;
					cow.boobs -= cow.boobsMilk;
					cow.boobsMilk = 0;
				}
				r.push(`${quantityTerm} of ${PC.inflationType} to sate your predilections, ${distensionTerm}, whenever you get the chance. ${stateTerm}`);
				if (PC.inflation === 3) {
					healthDamage(PC, 10);
				}
				break;
			case InflationLiquid.CUM:
				if (PC.inflationMethod === 1) {
					r.push(`You guzzle nearly`);
				} else if (PC.inflationMethod === 2) {
					r.push(`You pump your rear full of nearly`);
				} else if (PC.inflationMethod === 3) {
					r.push(`You suck ${cow.slaveName} off until you've guzzled nearly`);
				}
				r.push(`${quantityTerm} of ${PC.inflationType} to sate your predilections, ${distensionTerm}, whenever you get the chance. ${stateTerm}`);
				if (PC.inflation === 3) {
					healthDamage(PC, 10);
				}
				break;
			case InflationLiquid.FOOD:
				r.push(`You gorge yourself whenever you feel your gut`);
				if (PC.inflation === 3) {
					r.push(`isn't stuffed to bursting with enough food to sate your predilections. ${stateTerm}`);
					healthDamage(PC, 10);
				} else if (PC.inflation === 2) {
					r.push(`isn't stuffed with enough food`);
					// gender overhaul stuff
					if (PC.vagina >= 0) { // female appearance
						r.push(`to give you a prominent food baby to sate your predilections.`);
					} else {
						r.push(`to bulge prominently ahead of you to sate your predilections.`);
					}
					r.push(`You're so full, your distended belly groans angrily as it struggles to digest all that you've eaten.`);
				} else if (PC.inflation === 1) {
					r.push(`isn't stuffed with enough food to be noticeably distended to sate your predilections. ${stateTerm}`);
				}
				break;
		}
	}

	function foodMeansFat() {
		if (PC.inflationType === InflationLiquid.MILK) {
			if (PC.weight < 200) {
				r.push(`Your body <span class="lime">grows a little softer</span> as it absorbs the milk contained in your digestive track.`);
				PC.weight += 2;
				if (PC.weightDirection === 1) {
					PC.weight += 2;
				}
			}
			if (jsRandom(1, 100) > 50 / gigantomastiaMod && boobSize < 3000 * gigantomastiaMod) {
				r.push(`Your breasts <span class="lime">swell</span> with added fat as you digest the milk you've consumed.`);
				PC.boobs += 200;
			}
			if (jsRandom(1, 100) > (50 / rearQuirkDivider) && buttSize < 7 + ((7 / 2) * rearLipedemaMod)) {
				r.push(`Your butt <span class="lime">swells</span> with added fat as you digest the milk you've consumed.`);
				PC.butt += 1;
			}
		} else if (PC.inflationType === InflationLiquid.FOOD) {
			if (PC.weight < 200) {
				r.push(`It should surprise nobody that you <span class="lime">rapidly gain weight</span> with all the binge eating.`);
				PC.weight += 4;
				if (PC.weightDirection === 1) {
					PC.weight += 2;
				}
			}
			if (jsRandom(1, 100) > 50 / gigantomastiaMod && boobSize < 3000 * gigantomastiaMod) {
				r.push(`Your breasts <span class="lime">swell</span> with added fat as your body attempts to handle all the food inside you.`);
				PC.boobs += 200;
			}
			if (jsRandom(1, 100) > (50 / rearQuirkDivider) && buttSize < 7 + ((7 / 2) * rearLipedemaMod)) {
				r.push(`Your butt <span class="lime">swells</span> with added fat as your body attempts to handle all the food inside you.`);
				PC.butt += 1;
			}
		}
	}

	function cervixImplantFluidConversion() {
		if (PC.inflationMethod === 2) {
			r.push(`Your rectal micropump implant filters out some fluid from the ${PC.inflationType} you're holding inside you during the week, <span class="change positive">adding it to your abdominal implant.</span>`);
			PC.bellyImplant += 200;
		}
	}

	function bloating() {
		deflate(PC);
	}
};
