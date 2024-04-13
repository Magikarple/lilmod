/**
 * @param {App.Entity.SlaveState} slave
 * @param {DescType} [descType=DescType.NORMAL]
 * @returns {string}
 */
App.Desc.belly = function(slave, descType = DescType.NORMAL) {
	const r = [];
	const {
		he, him, his, himself, girl, He, His, loli
	} = getPronouns(slave);
	const isBellyHeavy =
		(slave.belly >= 100000 + (slave.muscles * 500) && slave.physicalAge <= 3) ||
		(slave.belly >= 200000 + (slave.muscles * 800) && slave.physicalAge <= 12) ||
		(slave.belly >= 300000 + (slave.muscles * 1000) && slave.physicalAge < 18) ||
		(slave.belly >= 400000 + (slave.muscles * 2000));
	const isBellyFluidLargest = (slave.bellyFluid >= slave.bellyPreg && slave.bellyFluid >= slave.bellyImplant);

	r.push(flesh());

	r.push(ruin());

	r.push(mpreg());

	r.push(fashion());

	r.push(marksAndMods());

	return r.join(" ");

	function ruin() {
		const r = [];
		if (slave.belly < 1500) {
			if (slave.bellySagPreg > 1 || slave.bellySagPreg === -1) {
				if (FutureSocieties.isActive('FSRepopulationFocus')) {
					r.push(`While most societies would find ${his} sagging, pregnancy ruined stomach unattractive, your repopulation-focused one merely sees ${him} as a breeder between pregnancies.`);
				} else {
					r.push(`Society finds ${his} pregnancy ruined stomach very unattractive.`);
				}
			} else if (slave.bellySag > 1) {
				r.push(`Society finds ${his} ruined stomach very unattractive.`);
			}
		}
		return r.join(" ");
	}

	function mpreg() {
		const r = [];
		if (slave.mpreg === 1 && slave.belly < 100 && slave.weight < 10 && slave.bellySag === 0 && slave.genes === "XY") {
			r.push(`${He} has a slight curve to ${his} abdomen, unusual for a male slave.`);
		}
		return r.join(" ");
	}

	function fashion() {
		const isBreeder = slave.breedingMark === 1 && V.propOutcome === 1;
		const r = [];
		if (V.showClothing === 1 && descType !== DescType.MARKET) {
			if (descType !== DescType.SURGERY) {
				r.push(accessory());

				r.push(clothing());

				if (FutureSocieties.isActive('FSSlimnessEnthusiast')) {
					if (slave.weight > 190) {
						r.push(`Your sleek, slim society is absolutely appalled by ${his} horrendously bloated body.`);
					} else if (slave.weight > 160) {
						r.push(`Your sleek, slim society finds ${his} disgustingly bloated body repulsive.`);
					} else if (slave.weight > 130) {
						r.push(`Your sleek, slim society finds ${his} hugely bloated body disgusting.`);
					} else if (slave.weight > 95) {
						r.push(`Your sleek, slim society finds ${his} bloated body disgusting.`);
					} else if (slave.weight > 30) {
						r.push(`Your sleek, slim society finds ${his} flabby body unsightly.`);
					}
				}
				if (FutureSocieties.isActive('FSRepopulationFocus')) {
					if (slave.belly >= 1000000) {
						if (isBellyFluidLargest) {
							r.push(`Your breeding-focused society finds ${his} unfathomable, hyper-swollen, ${slave.inflationType}-filled belly near the pinnacle of fashion despite ${his} inability to have children.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`Your breeding-focused society finds ${his} unfathomable, hyper-swollen, implant-filled belly near the pinnacle of fashion despite ${his} inability to have children.`);
						} else {
							r.push(`Your breeding-focused society finds ${his} unfathomable, hyper-swollen pregnant belly the perfect realization of the fashionable ideal.`);
						}
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`Your breeding-focused society finds ${his} monolithic ${slave.inflationType}-filled belly highly fashionable despite ${his} inability to have children.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`Your breeding-focused society finds ${his} monolithic implant-filled belly highly fashionable despite ${his} inability to have children.`);
						} else {
							r.push(`Your breeding-focused society finds ${his} monolithic pregnant belly near to the perfect realization of the fashionable ideal.`);
						}
					} else if (slave.bellyPreg >= 600000) {
						r.push(`Your breeding-focused society finds ${his} titanic bulging pregnant belly the epitome of fashion.`);
					} else if (slave.bellyPreg >= 300000) {
						r.push(`Your breeding-focused society finds ${his} massive pregnant belly extremely fashionable.`);
					} else if (slave.bellyPreg >= 15000) {
						r.push(`Your breeding-focused society finds ${his} huge pregnant belly very fashionable.`);
					} else if (slave.bellyPreg >= 10000) {
						r.push(`Your breeding-focused society finds ${his} big pregnant belly very fashionable.`);
					} else if (slave.bellyPreg >= 5000) {
						r.push(`Your breeding-focused society finds ${his} pregnant belly fashionable.`);
					} else if (slave.bellyPreg >= 1500) {
						r.push(`Your breeding-focused society finds a developing pregnancy very fashionable.`);
					}
				} else if (V.arcologies[0].FSRepopulationFocusPregPolicy === 1 && slave.bellyPreg >= 1500) {
					r.push(`Thanks to your trendsetting policies, society finds ${his} pregnant belly fashionable.`);
				} else if (FutureSocieties.isActive('FSRestart')) {
					if (slave.belly >= 1000000) {
						if (isBellyFluidLargest) {
							r.push(`Your eugenics obsessed society sees ${his} unfathomable, hyper-swollen, ${slave.inflationType}-filled belly as equally unfathomably degenerate.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`Your eugenics obsessed society sees ${his} unfathomable, hyper-swollen, implant-filled belly as equally unfathomably degenerate.`);
						} else {
							r.push(`Your eugenics obsessed society sees ${his} unfathomable, hyper-swollen pregnant belly the perfect antithesis of the fashionable ideal.`);
						}
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`Your eugenics obsessed society sees ${his} monolithic ${slave.inflationType}-filled belly as absolutely degenerate.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`Your eugenics obsessed society sees ${his} monolithic implant-filled belly as absolutely degenerate.`);
						} else {
							r.push(`Your eugenics obsessed society sees ${his} monolithic pregnant belly as a near perfect antithesis of the fashionable ideal.`);
						}
					} else if (slave.bellyPreg >= 600000) {
						r.push(`Your eugenics obsessed society sees ${his} titanic bulging pregnant belly as the epitome of degeneracy.`);
					} else if (slave.bellyPreg >= 300000) {
						r.push(`Your eugenics obsessed society views ${his} massive pregnant belly as complete degeneracy.`);
					} else if (slave.bellyPreg >= 15000) {
						if (isBreeder && slave.pregSource === -1) {
							r.push(`Your eugenics obsessed society is pleased that ${he} is ripe with your child.`);
						} else if (isBreeder && slave.pregSource === -6) {
							r.push(`Your eugenics obsessed society is pleased that ${he} is ripe with an Elite child.`);
						} else {
							r.push(`Your eugenics obsessed society finds ${his} huge pregnant belly absolutely disgusting.`);
						}
					} else if (slave.bellyPreg >= 10000) {
						if (isBreeder && slave.pregSource === -1) {
							r.push(`Your eugenics obsessed society is pleased that ${he} is heavy with your child.`);
						} else if (isBreeder && slave.pregSource === -6) {
							r.push(`Your eugenics obsessed society is pleased that ${he} is heavy with an Elite child.`);
						} else {
							r.push(`Your eugenics obsessed society finds ${his} big pregnant belly absolutely disgusting.`);
						}
					} else if (slave.bellyPreg >= 5000) {
						if (isBreeder && slave.pregSource === -1) {
							r.push(`Your eugenics obsessed society is pleased that ${he} is swollen with your child.`);
						} else if (isBreeder && slave.pregSource === -6) {
							r.push(`Your eugenics obsessed society is pleased that ${he} is swollen with an Elite child.`);
						} else {
							r.push(`Your eugenics obsessed society finds ${his} pregnant belly disgusting.`);
						}
					} else if (slave.bellyPreg >= 1500) {
						if (isBreeder && slave.pregSource === -1) {
							r.push(`Your eugenics obsessed society is pleased that ${he} is swelling with your child.`);
						} else if (isBreeder && slave.pregSource === -6) {
							r.push(`Your eugenics obsessed society is pleased that ${he} is swelling with an Elite child.`);
						} else {
							r.push(`Your eugenics obsessed society finds ${his} developing pregnancy insulting.`);
						}
					}
				}
			} else {
				r.push(`${slave.slaveName}'s belly is bare and ready for surgery.`);
			}
		}
		return r.join(" ");
	}

	function flesh() {
		const market = (descType === DescType.MARKET);
		const r = [];
		if (slave.belly >= 1000000) {
			if (isBellyFluidLargest) {
				// TODO: write me
			} else if (slave.bellyPreg > 0) {
				r.push(`${He} is swollen beyond any reasonable description,`);
				if (slave.physicalAge <= 3) {
					r.push(`and ${he} is lost under the squirming mass of infants that now completely fills ${his} body. ${He} has been reduced to nothing more than a womb with a few trace remnants of a little ${girl} attached.`);
					if (!market) {
						r.push(`${He} requires multiple slaves to move ${his} bulk when ${he} must go somewhere.`);
					}
				} else if (slave.physicalAge <= 12) {
					r.push(`and ${he} is nothing more than a womb with a ${loli} attached. ${He} struggles to not be lost under the squirming mass of infants that dwarf ${his} body.`);
					if (!market) {
						r.push(`${He} requires multiple slaves to move ${him} and aid ${him} through ${his} daily affairs.`);
					}
				} else {
					r.push(`and ${he} is nothing more than a womb with a ${girl} attached. ${He} is physically unable to keep ${his} boundless middle off the ground for long, if at all.`);
					if (hasAnyNaturalLegs(slave)) {
						r.push(`${He} requires multiple slaves to`);
						if (!hasBothLegs(slave)) {
							r.push(`stand up`);
						} else {
							r.push(`get to ${his} feet`);
						}
						r.push(`and aid ${him} through ${his} daily affairs.`);
					}
					r.push(`${His} extraordinary size greatly limits what ${he} can do and what can be done to ${him}.`);
					if (canWalk(slave)) {
						r.push(`Surprisingly, ${he} is still capable of moving ${himself} in such a state.`);
					}
				}
				if (slave.weight > 190) {
					r.push(`${His} massively fat belly is stretched to the limit, so much so ${his} folds are pulled flat and ${his} softness, firm. Despite being so taut, you can clearly see the grotesque figures of the infants forced against ${his} uterine walls by their siblings. ${His} womb is so cramped, they can barely squirm at all under the pressure and it baffles the mind how ${he} has managed to grow so full.`);
				} else {
					r.push(`Despite being stretched taut, you can clearly see the grotesque figures of the infants forced against ${his} uterine walls by their siblings. ${His} womb is so cramped, they can barely squirm at all under the pressure and it is a wonder ${he} has managed to grow this large.`);
				}
				if (slave.belly > (slave.pregAdaptation * 1000)) {
					r.push(`There is no telling how much further ${his} body could possibly take this pregnancy successfully.`);
					if (slave.preg < 30) {
						r.push(`Worse still, ${he} isn't even close to full term. It will be a miracle if ${he} manages to complete it intact.`);
					}
				} else {
					r.push(`Unbelievably, ${he} seems unshaken by ${his} obscene gravidity; ${his} body is so adapted to carrying children that, even at ${his} current size, ${his} pregnancy can be considered healthy.`);
					if (slave.preg < 30) {
						r.push(`Though ${he} isn't even close to full term. It will be a miracle if ${he} manages to bring ${his} brood into the world in one piece.`);
					}
				}
				if (slave.bellyFluid >= 1500) {
					if (slave.inflationMethod === 2) {
						r.push(`There is a barely noticeable curve to ${his} upper belly, the result of a stomach filled with ${slave.inflationType}.`);
					} else {
						r.push(`${His} stomach bulges just a little larger thanks to all the ${slave.inflationType} in ${his} bowels.`);
					}
				}
			} else {
				r.push(`${He} is far beyond the recommended limit,`);
				if (slave.physicalAge <= 3) {
					r.push(`and ${he} is lost under the straining mass of the implant that now fills ${his} body. ${He} has been reduced to nothing more than a balloon with a few trace remnants of a little ${girl} attached.`);
					if (!market) {
						r.push(`${He} requires multiple slaves to move ${his} bulk when ${he} must go somewhere.`);
					}
				} else if (slave.physicalAge <= 12) {
					r.push(`and ${he} is nothing more than an obscene over-filled implant with a ${loli} attached. ${He} struggles to not be lost under the straining mass that dwarfs ${his} body.`);
					if (!market) {
						r.push(`${He} requires multiple slaves to move ${him} and aid ${him} through ${his} daily affairs.`);
					}
				} else {
					r.push(`and ${he} is nothing more than an over-filled implant with a ${girl} attached. ${He} is physically unable to keep ${his} boundless middle off the ground for long, if at all.`);
					if (hasAnyNaturalLegs(slave)) {
						r.push(`${He} requires multiple slaves to`);
						if (!hasBothLegs(slave)) {
							r.push(`stand up`);
						} else {
							r.push(`get to ${his} feet`);
						}
						r.push(`and aid ${him} through ${his} daily affairs.`);
					}
					r.push(`${His} extraordinary size greatly limits what ${he} can do and what can be done to ${him}.`);
					if (canWalk(slave)) {
						r.push(`Surprisingly, ${he} is still capable of moving ${himself} in such a state.`);
					}
				}
				if (slave.weight > 190) {
					r.push(`${His} massively fat belly is stretched to the limit, so much so ${his} folds are pulled flat and ${his} softness, firm. ${He} is so overfilled you can clearly make out the implant within ${his} body through ${his} skin. It is so full, not one motion can be seen in its contents nor can one push their hand into it. It's a wonder that both ${him} and ${his} implant have managed to hold together this long.`);
				} else {
					r.push(`${He} is so overfilled you can clearly make out the implant within ${his} body through ${his} skin. It is so full, not one motion can be seen in its contents nor can one push their hand into it. It's a wonder that both ${him} and ${his} implant have managed to hold together this long.`);
				}
				r.push(`It baffles the mind how ${him} and ${his} implant could swell to such a size.`);
				if (slave.belly <= (slave.pregAdaptation * 1000)) {
					r.push(`Unbelievably, ${he} seems unshaken by ${his} obscene gravidity; ${his} body is so adapted to carrying children that, even at ${his} current volume, ${he} is physically capable of growing larger.`);
				}
				if (slave.bellyFluid >= 1500) {
					if (slave.inflationMethod === 2) {
						r.push(`There is a barely noticeable curve to ${his} upper belly, the result of a stomach filled with ${slave.inflationType}.`);
					} else {
						r.push(`${His} stomach bulges just a little larger thanks to all the ${slave.inflationType} in ${his} bowels.`);
					}
				}
			}
		} else if (slave.belly >= 750000) {
			if (isBellyFluidLargest) {
				// TODO: write me
			} else if (slave.bellyPreg > 0) {
				r.push(`${He}`);
				if (slave.belly > (slave.pregAdaptation * 1000)) {
					r.push(`is close to bursting,`);
				} else {
					r.push(`should be nearing ${his} capacity,`);
				}
				if (slave.physicalAge <= 3) {
					r.push(`and ${he} is lost under the squirming mass of infants that`);
					if (slave.belly > (slave.pregAdaptation * 1000)) {
						r.push(`threaten to rupture ${his} body.`);
					} else {
						r.push(`fill ${his} body.`);
					}
					r.push(`${He} has been reduced to nothing more than a womb stretched to its limit.`);
					if (!market) {
						r.push(`${He} requires multiple slaves to move ${his} bulk when ${he} must go somewhere.`);
					}
				} else if (slave.physicalAge <= 12) {
					r.push(`and ${he} is nothing more than`);
					if (slave.belly > (slave.pregAdaptation * 1000)) {
						r.push(`a breaking womb with a ${loli} attached. ${He} struggles to not be lost under the squirming mass of infants that threaten to rupture ${his} body.`);
					} else {
						r.push(`an overstuffed womb with a ${loli} attached. ${He} struggles to not be lost under the squirming mass of infants that fill ${his} body.`);
					}
					if (!market) {
						r.push(`${He} requires multiple slaves to move ${his} bulk when ${he} must go somewhere.`);
					}
				} else if (slave.height >= 185) {
					r.push(`but ${his} tall frame can keep ${his}`);
					if (slave.belly > (slave.pregAdaptation * 1000)) {
						r.push(`straining belly off the ground; but only for a moment. ${He} opts to not try this often as ${his} womb is already at its limit and could do without being slammed against the floor.`);
					} else {
						r.push(`life brimming belly off the ground; but only for a moment. ${He} opts to not try this often as ${his} occupants are liable to voice their complaints with a hail of kicks.`);
					}
				} else if (slave.height < 150) {
					r.push(`and ${he} is nothing more than`);
					if (slave.belly > (slave.pregAdaptation * 1000)) {
						r.push(`a breaking womb with a ${girl} attached. ${He} struggles to remain seen under the squirming mass of infants that threaten to rupture ${his} body.`);
					} else {
						r.push(`an overstuffed womb with a ${girl} attached. ${He} struggles to remain seen under the squirming mass of infants that fill ${his} body.`);
					}
				} else if (slave.muscles > 90) {
					r.push(`and ${his} muscular body`);
					if (slave.belly > (slave.pregAdaptation * 1000)) {
						r.push(`barely manages to contain`);
					} else {
						r.push(`perfectly handles`);
					}
					r.push(`${his} monolithic belly, though ${he} still can't really function with it.`);
				} else {
					r.push(`and ${he} is nothing more than`);
					if (slave.belly > (slave.pregAdaptation * 1000)) {
						r.push(`a breaking womb with a ${girl} attached.`);
					} else {
						r.push(`an overstuffed womb with a ${girl} attached.`);
					}
					r.push(`${He} is physically unable to keep ${his} straining belly off the ground.`);
				}
				if (slave.physicalAge > 12) {
					if (canWalk(slave)) {
						r.push(`Amazingly, once helped to ${his} feet, ${he} is still able to waddle along despite ${his} size.`);
					} else if (canStand(slave)) {
						r.push(`Amazingly, ${he} is powerful enough that, if helped to ${his} feet first, ${he} is capable of remaining upright.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires considerable assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires considerable assistance to get in and out of it.`);
							}
						} else {
							r.push(`As unpleasant as it may be, ${he} is still capable of slowly dragging ${himself} along the ground.`);
						}
					} else if (!market) {
						r.push(`${He} requires multiple slaves to move ${his} bulk when ${he} must go somewhere.`);
					}
				}
				if (slave.weight > 190) {
					r.push(`${His} massively fat belly is stretched to the limit, so much so ${his} folds are pulled flat and ${his} softness, firm. Despite being so taut, you can clearly see the grotesque figures of the infants forced against ${his} uterine walls by their siblings. ${His} womb is so cramped, they can barely squirm at all under the pressure and it is a wonder ${he} has managed to grow this large.`);
				} else {
					r.push(`Despite being stretched taut, you can clearly see the grotesque figures of the infants forced against ${his} uterine walls by their siblings. ${His} womb is so cramped, they can barely squirm at all under the pressure and it is a wonder ${he} has managed to grow this`);
					if (slave.belly > (slave.pregAdaptation * 1000)) {
						r.push(`large; even the slightest provocation could cause ${him} to burst.`);
					} else {
						r.push(`large.`);
					}
				}
				if (slave.belly > (slave.pregAdaptation * 1000)) {
					if (slave.preg < 30) {
						r.push(`Worse still, ${he} isn't even close to full term. It will be a miracle if ${he} manages to complete ${his} pregnancy intact.`);
					}
				} else {
					r.push(`Unbelievably, ${he} seems unshaken by ${his} obscene gravidity; ${his} body is so adapted to carrying children that, even at ${his} current size, ${his} pregnancy can be considered healthy.`);
					if (slave.preg < 30) {
						r.push(`Though ${he} isn't even close to full term. It will be a miracle if ${he} manages to bring ${his} brood into the world in one piece.`);
					}
				}
				if (slave.bellyFluid >= 1500) {
					if (slave.inflationMethod === 2) {
						r.push(`There is a distinct curve to ${his} upper belly, the result of a stomach filled with ${slave.inflationType}.`);
					} else {
						r.push(`${His} stomach bulges a little larger thanks to all the ${slave.inflationType} in ${his} bowels.`);
					}
				}
			} else {
				r.push(`${He}`);
				if (slave.belly > (slave.pregAdaptation * 1000)) {
					r.push(`is at ${his} limit,`);
				} else {
					r.push(`should be nearing ${his} limit,`);
				}
				if (slave.physicalAge <= 3) {
					r.push(`and ${he} is lost under the straining mass of the ready-to-rupture implant that`);
					if (slave.belly > (slave.pregAdaptation * 1000)) {
						r.push(`threatens to burst out of ${his} body.`);
					} else {
						r.push(`thoroughly fills ${his} body.`);
					}
					r.push(`${He} has been reduced to nothing more than a balloon stretched to its limit.`);
					if (!market) {
						r.push(`${He} requires multiple slaves to move ${his} bulk when ${he} must go somewhere.`);
					}
				} else if (slave.physicalAge <= 12) {
					r.push(`and ${he} is nothing more than a ready-to-rupture implant with a ${loli} attached. ${He} struggles to not be lost under the straining mass that`);
					if (slave.belly > (slave.pregAdaptation * 1000)) {
						r.push(`threatens to burst out of ${his} body.`);
					} else {
						r.push(`fills ${his} body.`);
					}
					if (!market) {
						r.push(`${He} requires multiple slaves to move ${his} bulk when ${he} must go somewhere.`);
					}
				} else if (slave.height >= 185) {
					r.push(`but ${his} tall frame can keep ${his}`);
					if (slave.belly > (slave.pregAdaptation * 1000)) {
						r.push(`straining`);
					}
					r.push(`belly off the ground; but only for a moment. ${He} opts to not try this often as ${his} implant is already at its limit and could do without being slammed against the floor.`);
				} else if (slave.height < 150) {
					r.push(`and ${he} is nothing more than a ready-to-rupture implant with a ${girl} attached. ${He} struggles to remain seen under the straining mass that`);
					if (slave.belly > (slave.pregAdaptation * 1000)) {
						r.push(`threatens to burst out of ${his} body.`);
					} else {
						r.push(`fills ${his} body.`);
					}
				} else if (slave.muscles > 90) {
					r.push(`and ${his} muscular body`);
					if (slave.belly > (slave.pregAdaptation * 1000)) {
						r.push(`barely manages to contain`);
					} else {
						r.push(`perfectly handles`);
					}
					r.push(`${his} monolithic belly, though ${he} still can't really function with it.`);
				} else {
					r.push(`and ${he} is nothing more than a ready-to-rupture implant with a ${girl} attached. ${He} is physically unable to keep ${his}`);
					if (slave.belly > (slave.pregAdaptation * 1000)) {
						r.push(`straining`);
					}
					r.push(`belly off the ground.`);
				}
				if (slave.physicalAge > 12) {
					if (canWalk(slave)) {
						r.push(`Amazingly, once helped to ${his} feet, ${he} is still able to waddle along despite ${his} size.`);
					} else if (canStand(slave)) {
						r.push(`Amazingly, ${he} is powerful enough that, if helped to ${his} feet first, ${he} is capable of remaining upright.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires considerable assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires considerable assistance to get in and out of it.`);
							}
						} else {
							r.push(`As unpleasant as it may be, ${he} is still capable of slowly dragging ${himself} along the ground.`);
						}
					} else if (!market) {
						r.push(`${He} requires multiple slaves to move ${his} bulk when ${he} must go somewhere.`);
					}
				}
				if (slave.weight > 190) {
					r.push(`${His} massively fat belly is stretched to the limit, so much so ${his} folds are pulled flat and ${his} softness, firm. ${He} is so overfilled you can clearly make out the implant within ${his} body through ${his} skin. It is so full, not one motion can be seen in its contents nor can one push their hand into it. It's a wonder that both ${him} and ${his} implant have managed to hold together this long.`);
				} else {
					r.push(`${He} is so overfilled you can clearly make out the implant within ${his} body through ${his} skin. It is so full, not one motion can be seen in its contents nor can one push their hand into it. It's a wonder that both ${him} and ${his} implant have managed to hold together this long.`);
				}
				if (slave.belly <= (slave.pregAdaptation * 1000)) {
					r.push(`Unbelievably, ${he} seems unshaken by ${his} obscene gravidity; ${his} body is so adapted to carrying children that, even at ${his} current volume, ${he} is physically capable of growing larger, even if the implant can't.`);
				}
				if (slave.bellyFluid >= 1500) {
					if (slave.inflationMethod === 2) {
						r.push(`There is a distinct curve to ${his} upper belly, the result of a stomach filled with ${slave.inflationType}.`);
					} else {
						r.push(`${His} stomach bulges a little larger thanks to all the ${slave.inflationType} in ${his} bowels.`);
					}
				}
			}
		} else if (slave.belly >= 600000) {
			if (isBellyFluidLargest) {
				// TODO: write me
			} else if (slave.bellyPreg > 0) {
				r.push(`${He} is dangerously pregnant,`);
				if (slave.physicalAge <= 3) {
					r.push(`and ${he} is lost against the squirming mass of infants that make up the bulk of ${his} body. ${He} has been reduced to nothing more than a straining womb.`);
					if (!market) {
						r.push(`${He} requires multiple slaves to move ${his} bulk when ${he} must go somewhere.`);
					}
				} else if (slave.physicalAge <= 12) {
					r.push(`and ${he} is nothing more than a womb with a ${loli} attached. ${He} has to be careful not to get crushed under ${his} own quivering mass.`);
					if (!market) {
						r.push(`${He} requires multiple slaves to move ${his} bulk when ${he} must go somewhere.`);
					}
				} else if (slave.muscles >= 75) {
					r.push(`and ${his} muscular body barely allows ${him} to manage ${his} titanic belly.`);
					if (canWalk(slave)) {
						r.push(`${He} walks a slow, ponderous waddle fitting for a ${girl} of ${his} size and weight.`);
					} else if (canStand(slave)) {
						r.push(`${He} gets a serious workout just from standing with such a heavy stomach.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`Despite ${his} size and weight, ${he} requires little assistance to get to ${his} feet, but still must use a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere, but, despite ${his} size and weight, is still able to get in and out of it on ${his} own.`);
							}
						} else {
							r.push(`Impressively, ${he} is strong enough to keep ${his} belly from dragging along the ground as ${he} crawls.`);
						}
					} else {
						r.push(`It does not stop it from completely immobilizing ${him}, however.`);
					}
				} else if (slave.height >= 185) {
					r.push(`but ${his} tall frame barely keeps ${his} titanic belly off the ground; with considerable effort, of course.`);
					if (canWalk(slave)) {
						r.push(`Impressively, once helped to ${his} feet, ${he} is still able to waddle along despite ${his} size.`);
					} else if (canStand(slave)) {
						r.push(`Impressively, ${he} is powerful enough that, if helped to ${his} feet first, ${he} is capable of remaining upright.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires considerable assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires considerable assistance to get in and out of it.`);
							}
						} else {
							r.push(`Dragging the mass along is becoming a challenge between its awkward size and sheer weight.`);
						}
					} else {
						r.push(`A talent that is ultimately meaningless when it is so unwieldy it immobilizes you.`);
					}
				} else if (slave.height < 150) {
					r.push(`and ${he} is nothing more than a womb with a ${girl} attached. ${He} has to be careful not to get crushed under ${his} own quivering mass.`);
					if (canWalk(slave)) {
						r.push(`Impressively, once helped to ${his} feet, ${he} is still able to waddle along despite ${his} size.`);
					} else if (canStand(slave)) {
						r.push(`Impressively, ${he} is powerful enough that, if helped to ${his} feet first, ${he} is capable of remaining upright.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires considerable assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires considerable assistance to get in and out of it.`);
							}
						} else {
							r.push(`Dragging the mass along is nigh impossible due to its sheer weight.`);
						}
					} else {
						if (!market) {
							r.push(`${He} requires multiple slaves to move ${his} bulk when ${he} must go somewhere.`);
						}
					}
				} else {
					r.push(`and ${he} is nothing more than a womb with a ${girl} attached. While ${he} can barely heft ${his} titanic belly off the floor, it takes a considerable amount of effort to do so and quickly comes to rest back where it started.`);
					if (canWalk(slave)) {
						r.push(`Impressively, once helped to ${his} feet, ${he} is still able to waddle along despite ${his} size.`);
					} else if (canStand(slave)) {
						r.push(`Impressively, ${he} is powerful enough that, if helped to ${his} feet first, ${he} is capable of remaining upright.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires considerable assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires considerable assistance to get in and out of it.`);
							}
						} else {
							r.push(`Dragging the mass along is becoming a challenge between its awkward size and sheer weight.`);
						}
					} else {
						r.push(`A talent that is ultimately meaningless when it is so unwieldy it immobilizes you.`);
					}
				}
				if (slave.weight > 190) {
					r.push(`${His} massively fat belly is stretched to the limit, so much so ${his} folds are pulled flat and ${his} softness, firm. Despite being so taut, ${his} belly visibly bulges and squirms from all the babies writhing within ${him}. ${His} womb is so full you can see the babies forced up against ${his} uterus,`);
					if (slave.belly > (slave.pregAdaptation * 1000)) {
						r.push(`${he} is at risk of rupturing should ${he} grow larger.`);
					} else {
						r.push(`though ${his} body shows little sign of being troubled by this.`);
					}
				} else {
					r.push(`Despite being stretched taut, ${his} belly visibly bulges and squirms from all the babies writhing within ${him}. ${His} womb is so full you can see the babies forced up against ${his} uterus,`);
					if (slave.belly > (slave.pregAdaptation * 1000)) {
						r.push(`${he} is at risk of rupturing should ${he} grow larger.`);
					} else {
						r.push(`though ${his} body shows little sign of being troubled by this.`);
					}
				}
				if (slave.preg < 30) {
					r.push(`Given how far along ${he} is, ${he} is clearly having an obscene number of children.`);
				}
				if (slave.bellyFluid >= 1500) {
					if (slave.inflationMethod === 2) {
						r.push(`There is a distinct curve to ${his} upper belly, the result of a stomach filled with ${slave.inflationType}.`);
					} else {
						r.push(`${His} stomach bulges a little larger thanks to all the ${slave.inflationType} in ${his} bowels.`);
					}
				}
			} else {
				r.push(`${He} looks ready to pop,`);
				if (slave.physicalAge <= 3) {
					r.push(`and ${he} is lost against the greatly overfilled implant that makes up the bulk of ${his} body. ${He} has been reduced to nothing more than a straining balloon.`);
					if (!market) {
						r.push(`${He} requires multiple slaves to move ${his} bulk when ${he} must go somewhere.`);
					}
				} else if (slave.physicalAge <= 12) {
					r.push(`and ${he} is nothing more than a greatly overfilled implant with a ${loli} attached. ${He} has to be careful not to get crushed under ${his} own taut mass.`);
					if (!market) {
						r.push(`${He} requires multiple slaves to move ${his} bulk when ${he} must go somewhere.`);
					}
				} else if (slave.muscles >= 75) {
					r.push(`and ${his} muscular body barely allows ${him} to manage ${his} titanic belly.`);
					if (canWalk(slave)) {
						r.push(`${He} walks a slow, ponderous waddle fitting for a ${girl} of ${his} size and weight.`);
					} else if (canStand(slave)) {
						r.push(`${He} gets a serious workout just from standing with such a heavy stomach.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`Despite ${his} size and weight, ${he} requires little assistance to get to ${his} feet, but still must use a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere, but, despite ${his} size and weight, is still able to get in and out of it on ${his} own.`);
							}
						} else {
							r.push(`Impressively, ${he} is strong enough to keep ${his} belly from dragging along the ground as ${he} crawls.`);
						}
					} else {
						r.push(`It does not stop it from completely immobilizing ${him}, however.`);
					}
				} else if (slave.height >= 185) {
					r.push(`but ${his} tall frame barely keeps ${his} titanic belly off the ground; with considerable effort, of course.`);
					if (canWalk(slave)) {
						r.push(`Impressively, once helped to ${his} feet, ${he} is still able to waddle along despite ${his} size.`);
					} else if (canStand(slave)) {
						r.push(`Impressively, ${he} is powerful enough that, if helped to ${his} feet first, ${he} is capable of remaining upright.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires considerable assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires considerable assistance to get in and out of it.`);
							}
						} else {
							r.push(`Dragging the mass along is becoming a challenge between its awkward size and sheer weight.`);
						}
					} else {
						r.push(`A talent that is ultimately meaningless when it is so unwieldy it immobilizes you.`);
					}
				} else if (slave.height < 150) {
					r.push(`and ${he} is nothing more than a greatly overfilled implant with a ${girl} attached. ${He} has to be careful not to get crushed under ${his} own taut mass.`);
					if (canWalk(slave)) {
						r.push(`Impressively, once helped to ${his} feet, ${he} is still able to waddle along despite ${his} size.`);
					} else if (canStand(slave)) {
						r.push(`Impressively, ${he} is powerful enough that, if helped to ${his} feet first, ${he} is capable of remaining upright.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires considerable assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires considerable assistance to get in and out of it.`);
							}
						} else {
							r.push(`Dragging the mass along is nigh impossible due to its sheer weight.`);
						}
					} else {
						if (!market) {
							r.push(`${He} requires multiple slaves to move ${his} bulk when ${he} must go somewhere.`);
						}
					}
				} else {
					r.push(`and ${he} is nothing more than a greatly overfilled implant with a ${girl} attached. While ${he} can barely heft ${his} titanic belly off the floor, it takes a considerable amount of effort to do so and quickly comes to rest back where it started.`);
					if (canWalk(slave)) {
						r.push(`Impressively, once helped to ${his} feet, ${he} is still able to waddle along despite ${his} size.`);
					} else if (canStand(slave)) {
						r.push(`Impressively, ${he} is powerful enough that, if helped to ${his} feet first, ${he} is capable of remaining upright.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires considerable assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires considerable assistance to get in and out of it.`);
							}
						} else {
							r.push(`Dragging the mass along is becoming a challenge between its awkward size and sheer weight.`);
						}
					} else {
						r.push(`A talent that is ultimately meaningless when it is so unwieldy it immobilizes you.`);
					}
				}
				if (slave.weight > 190) {
					r.push(`${His} massively fat belly is stretched to the limit, so much so ${his} folds are pulled flat and ${his} softness, firm. ${He} is so overfilled you can clearly make out the implant within ${his} body through ${his} skin. It is so full, not one motion can be seen in its contents.`);
				} else {
					r.push(`${He} is so overfilled you can clearly make out the implant within ${his} body through ${his} skin. It is so full, not one motion can be seen in its contents.`);
				}
				if (slave.belly > (slave.pregAdaptation * 1000)) {
					r.push(`Both ${him} and ${his} implant are at risk of rupturing should either be filled any more.`);
				} else {
					r.push(`While ${his} implant may be at risk of rupturing, ${his} body shows no signs of struggling to support it.`);
				}
				if (slave.bellyFluid >= 1500) {
					if (slave.inflationMethod === 2) {
						r.push(`There is a distinct curve to ${his} upper belly, the result of a stomach filled with ${slave.inflationType}.`);
					} else {
						r.push(`${His} stomach bulges a little larger thanks to all the ${slave.inflationType} in ${his} bowels.`);
					}
				}
			}
		} else if (slave.belly >= 450000) {
			if (isBellyFluidLargest) {
				// TODO: write me
			} else if (slave.bellyPreg > 0) {
				r.push(`${He} is immensely pregnant,`);
				if (slave.physicalAge <= 3) {
					r.push(`and ${he} is nothing more than a womb with a ${loli} attached. ${He} has to be careful not to get crushed under ${his} own mass.`);
					if (!market) {
						r.push(`${He} requires multiple slaves to move ${his} bulk when ${he} must go somewhere.`);
					}
				} else if (slave.physicalAge <= 12) {
					r.push(`and ${his} youthful figure is grotesquely bloated by ${his} pregnancy. ${He} can't keep ${his} gigantic belly off the floor and fights a losing battle to not be pinned by it.`);
					if (!market) {
						r.push(`${He} requires assistance to move when ${he} must go somewhere.`);
					}
				} else if (slave.height >= 185) {
					r.push(`but ${his} tall frame barely keeps ${his} gigantic belly off the ground; with considerable effort, of course.`);
					if (canWalk(slave)) {
						r.push(`Impressively, once helped to ${his} feet, ${he} is still able to waddle along despite ${his} size.`);
					} else if (canStand(slave)) {
						r.push(`Impressively, ${he} is strong enough that, if helped to ${his} feet first, ${he} is capable of remaining upright.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires considerable assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires considerable assistance to get in and out of it.`);
							}
						} else {
							r.push(`Dragging the mass along is becoming a challenge between its awkward size and sheer weight.`);
						}
					}
				} else if (slave.height < 150) {
					r.push(`and ${his} small figure is utterly dwarfed by ${his} pregnancy. ${He} can't keep ${his} gigantic belly off the floor and fights a losing battle to not be pinned by it.`);
					if (canWalk(slave)) {
						r.push(`Impressively, once helped to ${his} feet, ${he} is still able to waddle along despite ${his} size.`);
					} else if (canStand(slave)) {
						r.push(`Impressively, ${he} is strong enough that, if helped to ${his} feet first, ${he} is capable of remaining upright.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires considerable assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires considerable assistance to get in and out of it.`);
							}
						} else {
							r.push(`Dragging the mass along is becoming a challenge between its awkward size and sheer weight.`);
						}
					}
				} else if (slave.muscles > 30) {
					r.push(`and ${his} fit body barely allows ${him} to manage ${his} gigantic belly.`);
					if (canWalk(slave)) {
						r.push(`${He} walks a slow, ponderous waddle fitting for a ${girl} of ${his} size and weight.`);
					} else if (canStand(slave)) {
						r.push(`${His} legs get a serious workout just from standing with such a heavy stomach.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`Despite ${his} size and weight, ${he} requires no assistance to get to ${his} feet, but still must use a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere, but, despite ${his} size and weight, is still able to get in and out of it on ${his} own.`);
							}
						} else {
							r.push(`Impressively, ${he} is strong enough to keep ${his} belly from dragging along the ground as ${he} crawls.`);
						}
					}
				} else {
					r.push(`and ${he} is dwarfed by ${his} pregnancy. While ${he} can keep barely ${his} gigantic belly off the floor, it takes a considerable amount of effort to do so.`);
					if (canWalk(slave)) {
						r.push(`Impressively, once helped to ${his} feet, ${he} is still able to waddle along despite ${his} size.`);
					} else if (canStand(slave)) {
						r.push(`Impressively, ${he} is strong enough that, if helped to ${his} feet first, ${he} is capable of remaining upright.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires considerable assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires considerable assistance to get in and out of it.`);
							}
						} else {
							r.push(`Dragging the mass along is becoming a challenge between its awkward size and sheer weight.`);
						}
					}
				}
				if (slave.weight > 190) {
					r.push(`${His} massively fat belly is stretched to the limit, so much so ${his} folds are pulled flat. ${His} pregnancy is covered in an ever thinning layer of fat, save for the bulging upper portion where ${his} fat is thinnest. In that, rather large, area, you can just make out the many babies bulging ${his} stomach.`);
				} else {
					r.push(`${He} is so pregnant you can just make out the many babies bulging ${his} stomach.`);
				}
				if (slave.preg < 30) {
					r.push(`Given how far along ${he} is, ${he} is clearly having an obscene number of children.`);
				}
				if (slave.bellyFluid >= 1500) {
					if (slave.inflationMethod === 2) {
						r.push(`There is a distinct curve to ${his} upper belly, the result of a stomach filled with ${slave.inflationType}.`);
					} else {
						r.push(`${His} stomach bulges a little larger thanks to all the ${slave.inflationType} in ${his} bowels.`);
					}
				}
			} else {
				r.push(`${He} looks immensely pregnant,`);
				if (slave.physicalAge <= 3) {
					r.push(`and ${he} is nothing more than an overfilled implant with a ${loli} attached. ${He} has to be careful not to get crushed under ${his} own mass.`);
					if (!market) {
						r.push(`${He} requires multiple slaves to move ${his} bulk when ${he} must go somewhere.`);
					}
				} else if (slave.physicalAge <= 12) {
					r.push(`and ${his} youthful figure is grotesquely bloated by ${his} overfilled implant. ${He} can't keep ${his} gigantic belly off the floor and fights a losing battle to not be pinned by it.`);
					if (!market) {
						r.push(`${He} requires assistance to move when ${he} must go somewhere.`);
					}
				} else if (slave.height >= 185) {
					r.push(`but ${his} tall frame barely keeps ${his} gigantic belly off the ground; with considerable effort, of course.`);
					if (canWalk(slave)) {
						r.push(`Impressively, once helped to ${his} feet, ${he} is still able to waddle along despite ${his} size.`);
					} else if (canStand(slave)) {
						r.push(`Impressively, ${he} is strong enough that, if helped to ${his} feet first, ${he} is capable of remaining upright.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires considerable assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires considerable assistance to get in and out of it.`);
							}
						} else {
							r.push(`Dragging the mass along is becoming a challenge between its awkward size and sheer weight.`);
						}
					}
				} else if (slave.height < 150) {
					r.push(`and ${his} small figure is utterly dwarfed by ${his} overfilled implant. ${He} can't keep ${his} gigantic belly off the floor and fights a losing battle to not be pinned by it.`);
					if (canWalk(slave)) {
						r.push(`Impressively, once helped to ${his} feet, ${he} is still able to waddle along despite ${his} size.`);
					} else if (canStand(slave)) {
						r.push(`Impressively, ${he} is strong enough that, if helped to ${his} feet first, ${he} is capable of remaining upright.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires considerable assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires considerable assistance to get in and out of it.`);
							}
						} else {
							r.push(`Dragging the mass along is becoming a challenge between its awkward size and sheer weight.`);
						}
					}
				} else if (slave.muscles > 30) {
					r.push(`and ${his} fit body barely allows ${him} to manage ${his} gigantic belly.`);
					if (canWalk(slave)) {
						r.push(`${He} walks a slow, ponderous waddle fitting for a ${girl} of ${his} size and weight.`);
					} else if (canStand(slave)) {
						r.push(`${His} legs get a serious workout just from standing with such a heavy stomach.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`Despite ${his} size and weight, ${he} requires no assistance to get to ${his} feet, but still must use a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere, but, despite ${his} size and weight, is still able to get in and out of it on ${his} own.`);
							}
						} else {
							r.push(`Impressively, ${he} is strong enough to keep ${his} belly from dragging along the ground as ${he} crawls.`);
						}
					}
				} else {
					r.push(`and ${he} is dwarfed by ${his} overfilled implant. While ${he} can keep barely ${his} gigantic belly off the floor, it takes a considerable amount of effort to do so.`);
					if (canWalk(slave)) {
						r.push(`Impressively, once helped to ${his} feet, ${he} is still able to waddle along despite ${his} size.`);
					} else if (canStand(slave)) {
						r.push(`Impressively, ${he} is strong enough that, if helped to ${his} feet first, ${he} is capable of remaining upright.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires considerable assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires considerable assistance to get in and out of it.`);
							}
						} else {
							r.push(`Dragging the mass along is becoming a challenge between its awkward size and sheer weight.`);
						}
					}
				}
				if (slave.weight > 190) {
					r.push(`${His} massively fat belly is stretched to the limit, so much so ${his} folds are pulled flat. ${His} middle is covered in an ever thinning layer of fat, save for the bulging upper portion where ${his} fat is thinnest. In that, rather large, area, you can just make out the implant bulging ${his} stomach.`);
				} else {
					r.push(`${He} is so full you can nearly make out the implant within ${his} body through ${his} skin.`);
				}
				if (slave.bellyFluid >= 1500) {
					if (slave.inflationMethod === 2) {
						r.push(`There is a distinct curve to ${his} upper belly, the result of a stomach filled with ${slave.inflationType}.`);
					} else {
						r.push(`${His} stomach bulges a little larger thanks to all the ${slave.inflationType} in ${his} bowels.`);
					}
				}
			}
		} else if (slave.belly >= 300000) {
			if (isBellyFluidLargest) {
				// TODO: write me
			} else if (slave.bellyPreg > 0) {
				r.push(`${He} is massively pregnant, dwarfing any normal pregnancy,`);
				if (slave.physicalAge <= 3) {
					r.push(`and ${he} is nearly spherical. ${His} toddlerish form is utterly dwarfed by ${his} pregnancy, all ${he} can do is lean against it.`);
					if (!market) {
						r.push(`${He} requires multiple slaves to move ${his} bulk when ${he} must go somewhere.`);
					}
				} else if (slave.physicalAge <= 12) {
					r.push(`and ${he} is more belly than ${girl}. ${He} can barely keep ${his} massive belly from touching the floor.`);
					if (!market) {
						r.push(`${He} requires assistance to move when ${he} must go somewhere.`);
					}
				} else if (slave.height >= 185) {
					r.push(`but ${his} tall frame keeps ${his} massive belly off the ground.`);
					if (canWalk(slave)) {
						r.push(`${He} walks with an exaggerated waddle in an attempt to keep balance with such an awkward bulge.`);
					} else if (canStand(slave)) {
						r.push(`${He} stands with ${his} back heavily arched in an attempt to support ${his} stomach's substantial weight.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires assistance to get in and out of it.`);
							}
						} else {
							r.push(`Crawling with such a mass extending from ${his} body is near impossible, so ${he} is forced to drag ${himself} on ${his} side should ${he} need to go somewhere.`);
						}
					}
				} else if (slave.height < 150) {
					r.push(`and ${he} is more belly than ${girl}. ${He} can barely keep ${his} massive belly from touching the floor.`);
					if (canWalk(slave)) {
						r.push(`${He} walks with an exaggerated waddle in an attempt to keep balance with such an awkward bulge.`);
					} else if (canStand(slave)) {
						r.push(`${He} stands with ${his} back heavily arched in an attempt to support ${his} stomach's substantial weight.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires assistance to get in and out of it.`);
							}
						} else {
							r.push(`Crawling with such a mass extending from ${his} body is near impossible, so ${he} is forced to drag ${himself} on ${his} side should ${he} need to go somewhere.`);
						}
					}
				} else if (slave.muscles > 30) {
					r.push(`and ${his} fit body allows ${him} to carry ${his} oversized belly normally with effort.`);
				} else {
					r.push(`and ${he} is more belly than ${girl}. While ${he} can keep ${his} massive belly from touching the floor, it takes a lot of effort to do so.`);
					if (canWalk(slave)) {
						r.push(`${He} walks with an exaggerated waddle in an attempt to keep balance with such an awkward bulge.`);
					} else if (canStand(slave)) {
						r.push(`${He} stands with ${his} back heavily arched in an attempt to support ${his} stomach's substantial weight.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires assistance to get in and out of it.`);
							}
						} else {
							r.push(`Crawling with such a mass extending from ${his} body is near impossible, so ${he} is forced to drag ${himself} on ${his} side should ${he} need to go somewhere.`);
						}
					}
				}
				if (slave.weight > 190) {
					r.push(`${His} massively fat belly is stretched considerably, so much so ${his} folds are pulled flat. ${His} pregnancy is covered in a thick layer of fat, save for the bulging upper portion where ${his} fat is thinnest.`);
				}
				if (slave.preg < 30) {
					r.push(`Given how far along ${he} is, ${he} is clearly having an obscene number of children.`);
				}
				if (slave.bellyFluid >= 1500) {
					if (slave.inflationMethod === 2) {
						r.push(`There is a distinct curve to ${his} upper belly, the result of a stomach filled with ${slave.inflationType}.`);
					} else {
						r.push(`${His} stomach bulges a little larger thanks to all the ${slave.inflationType} in ${his} bowels.`);
					}
				}
			} else {
				r.push(`${He} looks so massively pregnant that ${he} dwarfs any normal pregnancy,`);
				if (slave.physicalAge <= 3) {
					r.push(`and ${he} is nearly spherical. ${His} toddlerish form is utterly dwarfed by ${his} implant, all ${he} can do is lean against it.`);
					if (!market) {
						r.push(`${He} requires multiple slaves to move ${his} bulk when ${he} must go somewhere.`);
					}
				} else if (slave.physicalAge <= 12) {
					r.push(`and ${he} is more belly than ${girl}. ${He} can barely keep ${his} massive belly from touching the floor.`);
					if (!market) {
						r.push(`${He} requires assistance to move when ${he} must go somewhere.`);
					}
				} else if (slave.height >= 185) {
					r.push(`but ${his} tall frame keeps ${his} massive belly off the ground.`);
					if (canWalk(slave)) {
						r.push(`${He} walks with an exaggerated waddle in an attempt to keep balance with such an awkward bulge.`);
					} else if (canStand(slave)) {
						r.push(`${He} stands with ${his} back heavily arched in an attempt to support ${his} stomach's substantial weight.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires assistance to get in and out of it.`);
							}
						} else {
							r.push(`Crawling with such a mass extending from ${his} body is near impossible, so ${he} is forced to drag ${himself} on ${his} side should ${he} need to go somewhere.`);
						}
					}
				} else if (slave.height < 150) {
					r.push(`and ${he} is more belly than ${girl}. ${He} can barely keep ${his} massive belly from touching the floor.`);
					if (canWalk(slave)) {
						r.push(`${He} walks with an exaggerated waddle in an attempt to keep balance with such an awkward bulge.`);
					} else if (canStand(slave)) {
						r.push(`${He} stands with ${his} back heavily arched in an attempt to support ${his} stomach's substantial weight.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires assistance to get in and out of it.`);
							}
						} else {
							r.push(`Crawling with such a mass extending from ${his} body is near impossible, so ${he} is forced to drag ${himself} on ${his} side should ${he} need to go somewhere.`);
						}
					}
				} else if (slave.muscles > 30) {
					r.push(`and ${his} fit body allows ${him} to carry ${his} oversized belly normally with effort.`);
				} else {
					r.push(`and ${he} is more belly than ${girl}. While ${he} can keep ${his} massive belly from touching the floor, it takes a lot of effort to do so.`);
					if (canWalk(slave)) {
						r.push(`${He} walks with an exaggerated waddle in an attempt to keep balance with such an awkward bulge.`);
					} else if (canStand(slave)) {
						r.push(`${He} stands with ${his} back heavily arched in an attempt to support ${his} stomach's substantial weight.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires assistance to get in and out of it.`);
							}
						} else {
							r.push(`Crawling with such a mass extending from ${his} body is near impossible, so ${he} is forced to drag ${himself} on ${his} side should ${he} need to go somewhere.`);
						}
					}
				}
				if (slave.weight > 190) {
					r.push(`${His} massively fat belly is stretched considerably, so much so ${his} folds are pulled flat. ${His} middle is covered in a thick layer of fat, save for the bulging upper portion where ${his} fat is thinnest.`);
				}
				if (slave.bellyFluid >= 1500) {
					if (slave.inflationMethod === 2) {
						r.push(`There is a distinct curve to ${his} upper belly, the result of a stomach filled with ${slave.inflationType}.`);
					} else {
						r.push(`${His} stomach bulges a little larger thanks to all the ${slave.inflationType} in ${his} bowels.`);
					}
				}
			}
		} else if (slave.belly >= 150000) {
			if (isBellyFluidLargest) {
				// TODO: write me
			} else if (slave.bellyPreg > 0) {
				r.push(`${He} is massively pregnant, beyond any typical pregnancy,`);
				if (slave.physicalAge <= 3) {
					r.push(`and ${his} belly pins ${him} to the ground.`);
					if (canWalk(slave)) {
						r.push(`Impressively, ${he} is strong enough that, if helped to ${his} feet first, ${he} is capable of still walking, despite ${his} toddlerish form being dwarfed by ${his} oversized pregnancy.`);
					} else if (canStand(slave)) {
						r.push(`Impressively, ${he} is strong enough that, if helped to ${his} feet first, ${he} is capable of remaining upright, despite ${his} toddlerish form being dwarfed by ${his} oversized pregnancy.`);
					} else {
						r.push(`${His} toddlerish form is dwarfed by ${his} pregnancy, and try as ${he} might ${he} cannot even drag the oversized thing.`);
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires assistance to get in and out of it.`);
							}
						}
					}
				} else if (slave.physicalAge <= 12) {
					r.push(`and ${he} can barely function with ${his} oversized belly.`);
					if (canWalk(slave)) {
						r.push(`Impressively, ${he} is strong enough that, if helped to ${his} feet first, ${he} is capable of still walking, if barely.`);
					} else if (canStand(slave)) {
						r.push(`Impressively, ${he} is strong enough that, if helped to ${his} feet first, ${he} is capable of remaining upright, if barely.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires assistance to get in and out of it.`);
							}
						} else {
							r.push(`${He} can barely even crawl with such a huge stomach bulging out from ${him}. It takes everything ${he} has to avoid being forced to drag ${himself} along.`);
						}
					}
				} else if (slave.height >= 185) {
					r.push(`but ${his} tall frame barely bears ${his} oversized, drum-taut belly.`);
					if (canWalk(slave)) {
						r.push(`${He} walks with an exaggerated waddle in an attempt to keep balance with such an awkward bulge hanging from ${his} middle.`);
					} else if (canStand(slave)) {
						r.push(`${He} stands with ${his} back heavily arched in an attempt to support ${his} stomach's substantial weight.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires assistance to get in and out of it.`);
							}
						} else {
							r.push(`${His} long limbs give ${him} an edge in crawling with such a large stomach, if it's any consolation.`);
						}
					}
				} else if (slave.height < 150) {
					r.push(`and ${he} can barely function with ${his} oversized belly.`);
					if (canWalk(slave)) {
						r.push(`${He} walks with an exaggerated waddle in an attempt to keep balance with such an awkward bulge hanging from ${his} middle.`);
					} else if (canStand(slave)) {
						r.push(`${He} stands with ${his} back heavily arched in an attempt to support ${his} stomach's substantial weight.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires assistance to get in and out of it.`);
							}
						} else {
							r.push(`Crawling with such a mass extending from ${his} body is near impossible, so ${he} is forced to drag ${himself} on ${his} side should ${he} need to go somewhere.`);
						}
					}
				} else if (slave.muscles > 30) {
					r.push(`and ${his} fit body allows ${him} to carry ${his} oversized belly without too much trouble.`);
				} else {
					r.push(`and ${he} can barely function with ${his} oversized belly.`);
					if (canWalk(slave)) {
						r.push(`${He} walks with an exaggerated waddle in an attempt to keep balance with such an awkward bulge hanging from ${his} middle.`);
					} else if (canStand(slave)) {
						r.push(`${He} stands with ${his} back heavily arched in an attempt to support ${his} stomach's substantial weight.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires assistance to get in and out of it.`);
							}
						} else {
							r.push(`${He} can barely even crawl with such a huge stomach bulging out from ${him}. It takes everything ${he} has to avoid being forced to drag ${himself} along.`);
						}
					}
				}
				if (slave.weight > 190) {
					r.push(`${His} massively fat belly is stretched considerably; ${his} folds are nearly pulled flat from the strain. ${His} pregnancy is covered in a thick layer of fat, save for the bulging upper portion where ${his} fat is thinnest.`);
				}
				if (slave.preg < slave.pregData.normalBirth / 1.33) {
					r.push(`Given how far along ${he} is, ${he} is clearly having an obscene number of children.`);
				} else if (slave.preg > slave.pregData.normalBirth * 1.05) {
					if (slave.pregType === 1) {
						r.push(`${His} womb contains one single, massive unborn child. It has grown so large that ${he} will never be able to birth it.`);
					} else if (slave.pregType === 2) {
						r.push(`${His} womb contains a pair of massive unborn children. They have grown so large that ${he} will never be able to birth them.`);
					} else if (slave.pregType === 3) {
						r.push(`${His} womb contains a trio of massive unborn children. They have grown so large that ${he} will never be able to birth them.`);
					} else if (slave.pregType === 4) {
						r.push(`${His} womb contains a quartet of massive unborn children. They have grown so large that ${he} will never be able to birth them.`);
					} else if (slave.pregType === 5) {
						r.push(`${His} womb contains a quintet of massive unborn children. They have grown so large that ${he} will never be able to birth them.`);
					} else if (slave.pregType === 6) {
						r.push(`${His} womb contains a sextet of oversized babies. They have grown so large that ${he} will never be able to birth them.`);
					} else if (slave.pregType === 7) {
						r.push(`${His} womb contains a septet of oversized babies. They have grown so large that ${he} will never be able to birth them.`);
					} else if (slave.pregType === 8) {
						r.push(`${His} womb contains an octet of oversized babies. There is little chance of ${him} giving birth to them.`);
					}
				}
				if (slave.bellyFluid >= 1500) {
					if (slave.inflationMethod === 2) {
						r.push(`There is a distinct curve to ${his} upper belly, the result of a stomach filled with ${slave.inflationType}.`);
					} else {
						r.push(`${His} stomach bulges a little larger thanks to all the ${slave.inflationType} in ${his} bowels.`);
					}
				}
			} else {
				r.push(`${He} looks massively pregnant, beyond any typical pregnancy,`);
				if (slave.physicalAge <= 3) {
					r.push(`and ${his} belly pins ${him} to the ground.`);
					if (canWalk(slave)) {
						r.push(`Impressively, ${he} is strong enough that, if helped to ${his} feet first, ${he} is capable of still walking, despite ${his} toddlerish form being dwarfed by ${his} oversized implant.`);
					} else if (canStand(slave)) {
						r.push(`Impressively, ${he} is strong enough that, if helped to ${his} feet first, ${he} is capable of remaining upright, despite ${his} toddlerish form being dwarfed by ${his} oversized implant.`);
					} else {
						r.push(`${His} toddlerish form is dwarfed by ${his} implant, and try as ${he} might ${he} cannot even drag the oversized thing.`);
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires assistance to get in and out of it.`);
							}
						}
					}
				} else if (slave.physicalAge <= 12) {
					r.push(`and ${he} can barely function with ${his} oversized belly.`);
					if (canWalk(slave)) {
						r.push(`Impressively, ${he} is strong enough that, if helped to ${his} feet first, ${he} is capable of still walking, if barely.`);
					} else if (canStand(slave)) {
						r.push(`Impressively, ${he} is strong enough that, if helped to ${his} feet first, ${he} is capable of remaining upright, if barely.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires assistance to get in and out of it.`);
							}
						} else {
							r.push(`${He} can barely even crawl with such a huge stomach bulging out from ${him}. It takes everything ${he} has to avoid being forced to drag ${himself} along.`);
						}
					}
				} else if (slave.height >= 185) {
					r.push(`but ${his} tall frame barely bears ${his} oversized, drum-taut belly.`);
				} else if (slave.height < 150) {
					r.push(`and ${he} can barely function with ${his} oversized belly.`);
				} else if (slave.muscles > 30) {
					r.push(`and ${his} fit body allows ${him} to carry ${his} oversized belly without too much trouble.`);
				} else {
					r.push(`and ${he} can barely function with ${his} oversized belly.`);
				}
				if (slave.weight > 190) {
					r.push(`${His} massively fat belly is stretched considerably; ${his} folds are nearly pulled flat from the strain. ${His} middle is covered in a thick layer of fat, save for the bulging upper portion where ${his} fat is thinnest.`);
				}
				if (slave.bellyFluid >= 1500) {
					if (slave.inflationMethod === 2) {
						r.push(`There is a distinct curve to ${his} upper belly, the result of a stomach filled with ${slave.inflationType}.`);
					} else {
						r.push(`${His} stomach bulges a little larger thanks to all the ${slave.inflationType} in ${his} bowels.`);
					}
				}
			}
		} else if (slave.belly >= 120000) {
			if (isBellyFluidLargest) {
				// TODO: write me
			} else if (slave.bellyPreg > 0) {
				r.push(`${He} is massively pregnant,`);
				if (slave.physicalAge <= 3) {
					r.push(`and ${his} giant belly is as big as ${he} is.`);
					if (canWalk(slave)) {
						r.push(`${He} can barely waddle with such an awkward bulge hanging from ${his} middle.`);
					} else if (canStand(slave)) {
						r.push(`${He} stands with ${his} back heavily arched in an attempt to support ${his} stomach's weight.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires assistance to get in and out of it.`);
							}
						} else {
							r.push(`${He} can barely even crawl with such a huge stomach bulging out from ${him}. It takes everything ${he} has just to avoid being immobilized by it.`);
						}
					}
				} else if (slave.physicalAge <= 12) {
					r.push(`and ${his} giant belly is nearly as big as ${he} is.`);
					if (canWalk(slave)) {
						r.push(`${He} can barely waddle with such an awkward bulge hanging from ${his} middle.`);
					} else if (canStand(slave)) {
						r.push(`${He} stands with ${his} back heavily arched in an attempt to support ${his} stomach's weight.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires assistance to get in and out of it.`);
							}
						} else {
							r.push(`${He} can barely crawl with such a huge stomach bulging out from ${him}, pushing into the ground.`);
						}
					}
				} else if (slave.weight > 190) {
					r.push(`and ${his} big fat belly is absolutely enormous when coupled with ${his} filled womb.`);
				} else if (slave.height >= 185) {
					r.push(`but ${his} tall frame bears ${his} overfull belly well.`);
				} else if (slave.height < 150) {
					r.push(`and ${his} giant belly looks absolutely huge on ${his} poor little frame.`);
				} else if (slave.muscles > 30) {
					r.push(`but ${his} strong frame bears ${his} hefty belly well.`);
				} else {
					r.push(`and ${his} hugely distended belly juts far out from ${his} front and widely from ${his} sides.`);
				}
				if (slave.preg < 40) {
					r.push(`Given how far along ${he} is, ${he} is clearly having an obscene number of children.`);
				} else if (slave.preg < 42) {
					r.push(`${He} is clearly full-term with octuplets.`);
				} else if (slave.pregType === 1) {
					r.push(`${His} womb contains one single, massive unborn child. It has grown so large that ${he} will never be able to birth it.`);
				} else if (slave.pregType === 2) {
					r.push(`${His} womb contains a pair of massive unborn children. They have grown so large that ${he} will never be able to birth them.`);
				} else if (slave.pregType === 3) {
					if (WombGetFetalSizeSum(slave) < 105000) {
						r.push(`${His} womb contains a trio of oversized children and a veritable flood of amniotic fluid.`);
					} else {
						r.push(`${His} womb contains a trio of massive unborn children. They have grown so large that ${he} will never be able to birth them.`);
					}
				} else if (slave.pregType === 4) {
					r.push(`${His} womb contains a quartet of massive unborn children. They have grown so large that ${he} will never be able to birth them.`);
				} else if (slave.pregType === 5) {
					r.push(`${His} womb contains a quintet of massive unborn children. They have grown so large that ${he} will never be able to birth them.`);
				} else if (slave.pregType === 6) {
					r.push(`${His} womb contains a sextet of oversized babies. There is little chance of ${him} giving birth to them.`);
				} else if (slave.pregType === 7) {
					r.push(`${His} womb contains a septet of oversized babies. There is little to no chance of ${him} giving birth to them.`);
				}
				if (slave.bellyFluid >= 1500) {
					if (slave.inflationMethod === 2) {
						r.push(`There is a distinct curve to ${his} upper belly, the result of a stomach filled with ${slave.inflationType}.`);
					} else {
						r.push(`${His} stomach bulges a little larger thanks to all the ${slave.inflationType} in ${his} bowels.`);
					}
				}
			} else {
				r.push(`${He} looks full term with octuplets,`);
				if (slave.physicalAge <= 3) {
					r.push(`and ${his} giant belly is as big as ${he} is.`);
					if (canWalk(slave)) {
						r.push(`${He} can barely waddle with such an awkward bulge hanging from ${his} middle.`);
					} else if (canStand(slave)) {
						r.push(`${He} stands with ${his} back heavily arched in an attempt to support ${his} stomach's weight.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires assistance to get in and out of it.`);
							}
						} else {
							r.push(`${He} can barely crawl with such a huge stomach bulging out from ${him}, pushing into the ground.`);
						}
					}
				} else if (slave.physicalAge <= 12) {
					r.push(`and ${his} giant belly is nearly as big as ${he} is.`);
					if (canWalk(slave)) {
						r.push(`${His} walk is more of an awkward waddle as ${he} struggles to handle the weight hanging from ${his} middle.`);
					} else if (canStand(slave)) {
						r.push(`${He} stands with ${his} back arched to better support ${his} stomach's weight.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires assistance to get in and out of it.`);
							}
						} else {
							r.push(`${His} stomach pushes into the floor as ${he} crawls.`);
						}
					}
				} else if (slave.weight > 190) {
					r.push(`and ${his} big fat belly is absolutely enormous when coupled with ${his} filled implant.`);
				} else if (slave.height >= 185) {
					r.push(`but ${his} tall frame bears ${his} overfull belly well.`);
				} else if (slave.height < 150) {
					r.push(`and ${his} giant belly looks absolutely huge on ${his} poor little frame.`);
				} else if (slave.muscles > 30) {
					r.push(`but ${his} strong frame bears ${his} hefty belly well.`);
				} else {
					r.push(`and ${his} hugely distended belly juts far out from ${his} front and widely from ${his} sides.`);
				}
				if (slave.bellyFluid >= 1500) {
					if (slave.inflationMethod === 2) {
						r.push(`There is a distinct curve to ${his} upper belly, the result of a stomach filled with ${slave.inflationType}.`);
					} else {
						r.push(`${His} stomach bulges a little larger thanks to all the ${slave.inflationType} in ${his} bowels.`);
					}
				}
			}
		} else if (slave.belly >= 105000) {
			if (isBellyFluidLargest) {
				// TODO: write me
			} else if (slave.bellyPreg > 0) {
				r.push(`${He} is enormously pregnant,`);
				if (slave.physicalAge <= 3) {
					r.push(`and ${his} toddlerish body is absolutely filled by ${his} womb, making ${him} resemble an overinflated blow-up doll.`);
					if (canWalk(slave)) {
						r.push(`${His} walk is more of an awkward waddle as ${he} struggles to handle the weight hanging from ${his} middle.`);
					} else if (canStand(slave)) {
						r.push(`${He} stands with ${his} back arched to better support ${his} stomach's weight.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires assistance to get in and out of it.`);
							}
						} else {
							r.push(`${His} stomach pushes into the floor as ${he} crawls.`);
						}
					}
				} else if (slave.physicalAge <= 12) {
					r.push(`and ${his} huge, drum-taut belly lewdly dominates ${his} poor little frame.`);
					if (canWalk(slave)) {
						r.push(`${His} walk is more of an awkward waddle as ${he} struggles to handle the weight hanging from ${his} middle.`);
					} else if (canStand(slave)) {
						r.push(`${He} stands with ${his} back arched to better support ${his} stomach's weight.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires assistance to get in and out of it.`);
							}
						} else {
							r.push(`${His} stomach pushes into the floor as ${he} crawls.`);
						}
					}
				} else if (slave.weight > 190) {
					r.push(`but ${he}'s so massively fat that it's not too obvious. Only the firmness at its top gives away ${his} pregnancy.`);
				} else if (slave.height >= 185) {
					r.push(`but ${his} tall frame bears ${his} huge, drum-taut belly well.`);
				} else if (slave.height < 150) {
					r.push(`and ${his} huge, drum-taut belly dominates ${his} poor little frame.`);
				} else if (slave.muscles > 30) {
					r.push(`and ${his} fit body bears ${his} huge, drum-taut belly well.`);
				} else {
					r.push(`and ${his} huge, drum-taut belly dominates ${his} frame.`);
				}
				if (slave.preg < 40) {
					r.push(`Given how far along ${he} is, ${he} is clearly having more than seven.`);
				} else if (slave.preg < 42) {
					if (slave.pregType === 3) {
						r.push(`${He} looks full-term with septuplets, but is really only carrying three and an obscene amount of amniotic fluid.`);
					} else {
						r.push(`${He} is clearly full-term with septuplets.`);
					}
				} else if (slave.pregType === 1) {
					r.push(`${His} womb contains one single, massive unborn child. It has grown so large that ${he} will never be able to birth it.`);
				} else if (slave.pregType === 2) {
					r.push(`${His} womb contains a pair of massive unborn children. They have grown so large that ${he} will never be able to birth them.`);
				} else if (slave.pregType === 3) {
					if (WombGetFetalSizeSum(slave) < 105000) {
						r.push(`${His} womb contains a trio of unborn children and a veritable flood of amniotic fluid.`);
					} else {
						r.push(`${His} womb contains a trio of massive unborn children. They have grown so large that ${he} will never be able to birth them.`);
					}
				} else if (slave.pregType === 4) {
					r.push(`${His} womb contains a quartet of massive unborn children. They have grown so large that ${he} will never be able to birth them.`);
				} else if (slave.pregType === 5) {
					r.push(`${His} womb contains a quintet of massive unborn children. There is little chance of ${him} giving birth to them.`);
				} else if (slave.pregType === 6) {
					r.push(`${His} womb contains a sextet of oversized babies. There is little to no chance of ${him} giving birth to them.`);
				}
				if (slave.bellyFluid >= 1500) {
					if (slave.inflationMethod === 2) {
						r.push(`There is a distinct curve to ${his} upper belly, the result of a stomach filled with ${slave.inflationType}.`);
					} else {
						r.push(`${His} stomach bulges a little larger thanks to all the ${slave.inflationType} in ${his} bowels.`);
					}
				}
			} else {
				r.push(`${He} looks full term with septuplets,`);
				if (slave.physicalAge <= 3) {
					r.push(`and ${his} toddlerish body is absolutely filled by ${his} implant, making ${him} resemble an overinflated blow-up doll.`);
					if (canWalk(slave)) {
						r.push(`${His} walk is more of an awkward waddle as ${he} struggles to handle the weight hanging from ${his} middle.`);
					} else if (canStand(slave)) {
						r.push(`${He} stands with ${his} back arched to better support ${his} stomach's weight.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires assistance to get in and out of it.`);
							}
						} else {
							r.push(`${His} stomach pushes into the floor as ${he} crawls.`);
						}
					}
				} else if (slave.physicalAge <= 12) {
					r.push(`and ${his} huge, drum-taut belly dominates ${his} poor little frame.`);
					if (canWalk(slave)) {
						r.push(`${His} walk is more of an awkward waddle as ${he} struggles to handle the weight hanging from ${his} middle.`);
					} else if (canStand(slave)) {
						r.push(`${He} stands with ${his} back arched to better support ${his} stomach's weight.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires assistance to get in and out of it.`);
							}
						} else {
							r.push(`${His} stomach pushes into the floor as ${he} crawls.`);
						}
					}
				} else if (slave.weight > 190) {
					r.push(`but ${he}'s so massively fat that it's not obvious. Only the firmness at ${his} belly's top and the weight in its sway give any hint that something's bulging it outwards.`);
				} else if (slave.height >= 185) {
					r.push(`but ${his} tall frame bears ${his} huge, drum-taut belly well.`);
				} else if (slave.height < 150) {
					r.push(`and ${his} huge, drum-taut belly dominates ${his} poor little frame.`);
				} else if (slave.muscles > 30) {
					r.push(`and ${his} fit body bears ${his} huge, drum-taut belly well.`);
				} else {
					r.push(`and ${his} huge, drum-taut belly dominates ${his} frame.`);
				}
				if (slave.bellyFluid >= 1500) {
					if (slave.inflationMethod === 2) {
						r.push(`There is a distinct curve to ${his} upper belly, the result of a stomach filled with ${slave.inflationType}.`);
					} else {
						r.push(`${His} stomach bulges a little larger thanks to all the ${slave.inflationType} in ${his} bowels.`);
					}
				}
			}
		} else if (slave.belly >= 90000) {
			if (isBellyFluidLargest) {
				// TODO: write me
			} else if (slave.bellyPreg > 0) {
				r.push(`${He} is enormously pregnant,`);
				if (slave.physicalAge <= 3) {
					r.push(`and ${his} toddlerish body is absolutely filled by ${his} womb, making ${him} resemble an overinflated blow-up doll.`);
					if (canWalk(slave)) {
						r.push(`${His} walk is more of an awkward waddle as ${he} struggles to handle the weight hanging from ${his} middle.`);
					} else if (canStand(slave)) {
						r.push(`${He} stands with ${his} back arched to better support ${his} stomach's weight.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires assistance to get in and out of it.`);
							}
						} else {
							r.push(`${His} stomach pushes into the floor as ${he} crawls.`);
						}
					}
				} else if (slave.physicalAge <= 12) {
					r.push(`and ${his} huge, drum-taut belly lewdly dominates ${his} poor little frame.`);
					if (canWalk(slave)) {
						r.push(`${His} walk is more of an awkward waddle as ${he} struggles to handle the weight hanging from ${his} middle.`);
					} else if (canStand(slave)) {
						r.push(`${He} stands with ${his} back arched to better support ${his} stomach's weight.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires assistance to get in and out of it.`);
							}
						} else {
							r.push(`${His} stomach pushes into the floor as ${he} crawls.`);
						}
					}
				} else if (slave.weight > 190) {
					r.push(`but ${he}'s so massively fat that it's not too obvious. Only the firmness at its top gives away ${his} pregnancy.`);
				} else if (slave.height >= 185) {
					r.push(`but ${his} tall frame bears ${his} huge, drum-taut belly well.`);
				} else if (slave.height < 150) {
					r.push(`and ${his} huge, drum-taut belly dominates ${his} poor little frame.`);
				} else if (slave.muscles > 30) {
					r.push(`and ${his} fit body bears ${his} huge, drum-taut belly well.`);
				} else {
					r.push(`and ${his} huge, drum-taut belly dominates ${his} frame.`);
				}
				if (slave.preg < 40) {
					r.push(`Given how far along ${he} is, ${he} is clearly having more than six.`);
				} else if (slave.preg < 42) {
					r.push(`${He} is clearly full-term with sextuplets.`);
				} else if (slave.pregType === 1) {
					r.push(`${His} womb contains one single, massive unborn child. It has grown so large that ${he} will never be able to birth it.`);
				} else if (slave.pregType === 2) {
					r.push(`${His} womb contains a pair of massive unborn children. They have grown so large that ${he} will never be able to birth them.`);
				} else if (slave.pregType === 3) {
					r.push(`${His} womb contains a trio of massive unborn children. They have grown so large that ${he} will never be able to birth them.`);
				} else if (slave.pregType === 4) {
					r.push(`${His} womb contains a quartet of massive unborn children. There is little chance of ${him} giving birth to them.`);
				} else if (slave.pregType === 5) {
					r.push(`${His} womb contains a quintet of oversized babies. There is little to no chance of ${him} giving birth to them.`);
				}
				if (slave.bellyFluid >= 1500) {
					if (slave.inflationMethod === 2) {
						r.push(`There is a distinct curve to ${his} upper belly, the result of a stomach filled with ${slave.inflationType}.`);
					} else {
						r.push(`${His} stomach bulges a little larger thanks to all the ${slave.inflationType} in ${his} bowels.`);
					}
				}
			} else {
				r.push(`${He} looks full term with sextuplets,`);
				if (slave.physicalAge <= 3) {
					r.push(`and ${his} toddlerish body is absolutely filled by ${his} implant, making ${him} resemble an overinflated blow-up doll.`);
					if (canWalk(slave)) {
						r.push(`${His} walk is more of an awkward waddle as ${he} struggles to handle the weight hanging from ${his} middle.`);
					} else if (canStand(slave)) {
						r.push(`${He} stands with ${his} back arched to better support ${his} stomach's weight.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires assistance to get in and out of it.`);
							}
						} else {
							r.push(`${His} stomach pushes into the floor as ${he} crawls.`);
						}
					}
				} else if (slave.physicalAge <= 12) {
					r.push(`and ${his} huge, drum-taut belly dominates ${his} poor little frame.`);
					if (canWalk(slave)) {
						r.push(`${His} walk is more of an awkward waddle as ${he} struggles to handle the weight hanging from ${his} middle.`);
					} else if (canStand(slave)) {
						r.push(`${He} stands with ${his} back arched to better support ${his} stomach's weight.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires assistance to get in and out of it.`);
							}
						} else {
							r.push(`${His} stomach pushes into the floor as ${he} crawls.`);
						}
					}
				} else if (slave.weight > 190) {
					r.push(`but ${he}'s so massively fat that it's not obvious. Only the firmness at ${his} belly's top and the weight in its sway give any hint that something's bulging it outwards.`);
				} else if (slave.height >= 185) {
					r.push(`but ${his} tall frame bears ${his} huge, drum-taut belly well.`);
				} else if (slave.height < 150) {
					r.push(`and ${his} huge, drum-taut belly dominates ${his} poor little frame.`);
				} else if (slave.muscles > 30) {
					r.push(`and ${his} fit body bears ${his} huge, drum-taut belly well.`);
				} else {
					r.push(`and ${his} huge, drum-taut belly dominates ${his} frame.`);
				}
				if (slave.bellyFluid >= 1500) {
					if (slave.inflationMethod === 2) {
						r.push(`There is a distinct curve to ${his} upper belly, the result of a stomach filled with ${slave.inflationType}.`);
					} else {
						r.push(`${His} stomach bulges a little larger thanks to all the ${slave.inflationType} in ${his} bowels.`);
					}
				}
			}
		} else if (slave.belly >= 75000) {
			if (isBellyFluidLargest) {
				// TODO: write me
			} else if (slave.bellyPreg > 0) {
				r.push(`${He} is enormously pregnant,`);
				if (slave.physicalAge <= 3) {
					r.push(`and ${his} toddlerish body is absolutely filled by ${his} womb, making ${him} resemble an overinflated blow-up doll.`);
					if (canWalk(slave)) {
						r.push(`${His} walk is more of an awkward waddle as ${he} struggles to handle the weight hanging from ${his} middle.`);
					} else if (canStand(slave)) {
						r.push(`${He} stands with ${his} back arched to better support ${his} stomach's weight.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires assistance to get in and out of it.`);
							}
						} else {
							r.push(`${His} stomach pushes into the floor as ${he} crawls.`);
						}
					}
				} else if (slave.physicalAge <= 12) {
					r.push(`and ${his} huge, drum-taut belly lewdly dominates ${his} poor little frame.`);
					if (canWalk(slave)) {
						r.push(`${His} walk is more of an awkward waddle as ${he} struggles to handle the weight hanging from ${his} middle.`);
					} else if (canStand(slave)) {
						r.push(`${He} stands with ${his} back arched to better support ${his} stomach's weight.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires assistance to get in and out of it.`);
							}
						} else {
							r.push(`${His} stomach pushes into the floor as ${he} crawls.`);
						}
					}
				} else if (slave.weight > 190) {
					r.push(`but ${he}'s so massively fat that it's not too obvious. Only the firmness at its top gives away ${his} pregnancy.`);
				} else if (slave.height >= 185) {
					r.push(`but ${his} tall frame bears ${his} huge, drum-taut belly well.`);
				} else if (slave.height < 150) {
					r.push(`and ${his} huge, drum-taut belly dominates ${his} poor little frame.`);
				} else if (slave.muscles > 30) {
					r.push(`and ${his} fit body bears ${his} huge, drum-taut belly well.`);
				} else {
					r.push(`and ${his} huge, drum-taut belly dominates ${his} frame.`);
				}
				if (slave.preg < 40) {
					if (slave.pregType === 3) {
						r.push(`${His} womb is so overfilled with amniotic fluid it resembles a water balloon; ${he} is so bloated it is hard to believe ${he} is only having triplets.`);
					} else {
						r.push(`Given how far along ${he} is, ${he} is clearly having more than five.`);
					}
				} else if (slave.preg < 42) {
					if (slave.pregType === 3) {
						r.push(`${He} looks full-term with quintuplets, but is really only carrying three and an obscene amount of amniotic fluid.`);
					} else {
						r.push(`${He} is clearly full-term with quintuplets.`);
					}
				} else if (slave.pregType === 1) {
					r.push(`${His} womb contains one single, massive unborn child. It has grown so large that ${he} will never be able to birth it.`);
				} else if (slave.pregType === 2) {
					r.push(`${His} womb contains a pair of massive unborn children. They have grown so large that ${he} will never be able to birth them.`);
				} else if (slave.pregType === 3) {
					r.push(`${His} womb contains a trio of massive unborn children. There is little chance of ${him} giving birth to them.`);
				} else if (slave.pregType === 4) {
					r.push(`${His} womb contains a quartet of oversized babies. There is little to no chance of ${him} giving birth to them.`);
				}
				if (slave.bellyFluid >= 1500) {
					if (slave.inflationMethod === 2) {
						r.push(`There is a distinct curve to ${his} upper belly, the result of a stomach filled with ${slave.inflationType}.`);
					} else {
						r.push(`${His} stomach bulges a little larger thanks to all the ${slave.inflationType} in ${his} bowels.`);
					}
				}
			} else {
				r.push(`${He} looks full term with quintuplets,`);
				if (slave.physicalAge <= 3) {
					r.push(`and ${his} toddlerish body is absolutely filled by ${his} implant, making ${him} resemble an overinflated blow-up doll.`);
					if (canWalk(slave)) {
						r.push(`${His} walk is more of an awkward waddle as ${he} struggles to handle the weight hanging from ${his} middle.`);
					} else if (canStand(slave)) {
						r.push(`${He} stands with ${his} back arched to better support ${his} stomach's weight.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires assistance to get in and out of it.`);
							}
						} else {
							r.push(`${His} stomach pushes into the floor as ${he} crawls.`);
						}
					}
				} else if (slave.physicalAge <= 12) {
					r.push(`and ${his} huge, drum-taut belly dominates ${his} poor little frame.`);
					if (canWalk(slave)) {
						r.push(`${His} walk is more of an awkward waddle as ${he} struggles to handle the weight hanging from ${his} middle.`);
					} else if (canStand(slave)) {
						r.push(`${He} stands with ${his} back arched to better support ${his} stomach's weight.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires assistance to get in and out of it.`);
							}
						} else {
							r.push(`${His} stomach pushes into the floor as ${he} crawls.`);
						}
					}
				} else if (slave.weight > 190) {
					r.push(`but ${he}'s so massively fat that it's not obvious. Only the firmness at ${his} belly's top and the weight in its sway give any hint that something's bulging it outwards.`);
				} else if (slave.height >= 185) {
					r.push(`but ${his} tall frame bears ${his} huge, drum-taut belly well.`);
				} else if (slave.height < 150) {
					r.push(`and ${his} huge, drum-taut belly dominates ${his} poor little frame.`);
				} else if (slave.muscles > 30) {
					r.push(`and ${his} fit body bears ${his} huge, drum-taut belly well.`);
				} else {
					r.push(`and ${his} huge, drum-taut belly dominates ${his} frame.`);
				}
				if (slave.bellyFluid >= 1500) {
					if (slave.inflationMethod === 2) {
						r.push(`There is a distinct curve to ${his} upper belly, the result of a stomach filled with ${slave.inflationType}.`);
					} else {
						r.push(`${His} stomach bulges a little larger thanks to all the ${slave.inflationType} in ${his} bowels.`);
					}
				}
			}
		} else if (slave.belly >= 60000) {
			if (isBellyFluidLargest) {
				// TODO: write me
			} else if (slave.bellyPreg > 0) {
				r.push(`${He} is enormously pregnant,`);
				if (slave.physicalAge <= 3) {
					r.push(`and ${his} toddlerish body is absolutely filled by ${his} womb, making ${him} resemble an overinflated blow-up doll.`);
					if (canWalk(slave)) {
						r.push(`${His} walk is more of an awkward waddle as ${he} struggles to handle the weight hanging from ${his} middle.`);
					} else if (canStand(slave)) {
						r.push(`${He} stands with ${his} back arched to better support ${his} stomach's weight.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires assistance to get in and out of it.`);
							}
						} else {
							r.push(`${His} stomach pushes into the floor as ${he} crawls.`);
						}
					}
				} else if (slave.physicalAge <= 12) {
					r.push(`and ${his} huge, drum-taut belly lewdly dominates ${his} poor little frame.`);
					if (canWalk(slave)) {
						r.push(`${His} walk is more of an awkward waddle as ${he} struggles to handle the weight hanging from ${his} middle.`);
					} else if (canStand(slave)) {
						r.push(`${He} stands with ${his} back arched to better support ${his} stomach's weight.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires assistance to get in and out of it.`);
							}
						} else {
							r.push(`${His} stomach pushes into the floor as ${he} crawls.`);
						}
					}
				} else if (slave.weight > 190) {
					r.push(`but ${he}'s so massively fat that it's not too obvious. Only the firmness at its top gives away ${his} pregnancy.`);
				} else if (slave.height >= 185) {
					r.push(`but ${his} tall frame bears ${his} huge, drum-taut belly well.`);
				} else if (slave.height < 150) {
					r.push(`and ${his} huge, drum-taut belly dominates ${his} poor little frame.`);
				} else if (slave.muscles > 30) {
					r.push(`and ${his} fit body bears ${his} huge, drum-taut belly well.`);
				} else {
					r.push(`and ${his} huge, drum-taut belly dominates ${his} frame.`);
				}
				if (slave.preg < 40) {
					if (slave.pregType === 3) {
						r.push(`${His} womb is mostly filled with excess amniotic fluid, masking that ${he} is only having triplets.`);
					} else {
						r.push(`Given how far along ${he} is, ${he} is clearly having more than four.`);
					}
				} else if (slave.preg < 42) {
					if (slave.pregType === 2) {
						r.push(`${He} looks full-term with quadruplets, but is really only carrying two and an obscene amount of amniotic fluid.`);
					} else if (slave.pregType === 3) {
						r.push(`${He} looks full-term with quadruplets, but is really only carrying three and an obscene amount of amniotic fluid.`);
					} else {
						r.push(`${He} is clearly full-term with quadruplets.`);
					}
				} else if (slave.pregType === 1) {
					r.push(`${His} womb contains one single, massive unborn child. It has grown so large that ${he} will never be able to birth it.`);
				} else if (slave.pregType === 2) {
					r.push(`${His} womb contains a pair of massive unborn children. There is little to no chance of ${him} giving birth to them.`);
				} else if (slave.pregType === 3) {
					r.push(`${His} womb contains a trio of oversized babies. There is little chance of ${him} giving birth to them.`);
				}
				if (slave.bellyFluid >= 1500) {
					if (slave.inflationMethod === 2) {
						r.push(`There is a distinct curve to ${his} upper belly, the result of a stomach filled with ${slave.inflationType}.`);
					} else {
						r.push(`${His} stomach bulges a little larger thanks to all the ${slave.inflationType} in ${his} bowels.`);
					}
				}
			} else {
				r.push(`${He} looks full term with quadruplets,`);
				if (slave.physicalAge <= 3) {
					r.push(`and ${his} toddlerish body is absolutely filled by ${his} implant, making ${him} resemble an overinflated blow-up doll.`);
					if (canWalk(slave)) {
						r.push(`${His} walk is more of an awkward waddle as ${he} struggles to handle the weight hanging from ${his} middle.`);
					} else if (canStand(slave)) {
						r.push(`${He} stands with ${his} back arched to better support ${his} stomach's weight.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires assistance to get in and out of it.`);
							}
						} else {
							r.push(`${His} stomach pushes into the floor as ${he} crawls.`);
						}
					}
				} else if (slave.physicalAge <= 12) {
					r.push(`and ${his} huge, drum-taut belly dominates ${his} poor little frame.`);
					if (canWalk(slave)) {
						r.push(`${His} walk is more of an awkward waddle as ${he} struggles to handle the weight hanging from ${his} middle.`);
					} else if (canStand(slave)) {
						r.push(`${He} stands with ${his} back arched to better support ${his} stomach's weight.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires assistance to get in and out of it.`);
							}
						} else {
							r.push(`${His} stomach pushes into the floor as ${he} crawls.`);
						}
					}
				} else if (slave.weight > 190) {
					r.push(`but ${he}'s so massively fat that it's not obvious. Only the firmness at ${his} belly's top and the weight in its sway give any hint that something's bulging it outwards.`);
				} else if (slave.height >= 185) {
					r.push(`but ${his} tall frame bears ${his} huge, drum-taut belly well.`);
				} else if (slave.height < 150) {
					r.push(`and ${his} huge, drum-taut belly dominates ${his} poor little frame.`);
				} else if (slave.muscles > 30) {
					r.push(`and ${his} fit body bears ${his} huge, drum-taut belly well.`);
				} else {
					r.push(`and ${his} huge, drum-taut belly dominates ${his} frame.`);
				}
				if (slave.bellyFluid >= 1500) {
					if (slave.inflationMethod === 2) {
						r.push(`There is a distinct curve to ${his} upper belly, the result of a stomach filled with ${slave.inflationType}.`);
					} else {
						r.push(`${His} stomach bulges a little larger thanks to all the ${slave.inflationType} in ${his} bowels.`);
					}
				}
			}
		} else if (slave.belly >= 45000) {
			if (isBellyFluidLargest) {
				// TODO: write me
			} else if (slave.bellyPreg > 0) {
				r.push(`${He} is enormously pregnant,`);
				if (slave.physicalAge <= 3) {
					r.push(`and ${his} toddlerish body is absolutely filled by ${his} womb, making ${him} resemble an overinflated blow-up doll.`);
					if (canWalk(slave)) {
						r.push(`${His} walk is more of an awkward waddle as ${he} struggles to handle the weight hanging from ${his} middle.`);
					} else if (canStand(slave)) {
						r.push(`${He} stands with ${his} back arched to better support ${his} stomach's weight.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires assistance to get in and out of it.`);
							}
						} else {
							r.push(`${His} stomach pushes into the floor as ${he} crawls.`);
						}
					}
				} else if (slave.physicalAge <= 12) {
					r.push(`and ${his} huge, drum-taut belly lewdly dominates ${his} poor little frame.`);
				} else if (slave.weight > 190) {
					r.push(`but ${he}'s so massively fat that it's not too obvious. Only the firmness at its top gives away ${his} pregnancy.`);
				} else if (slave.height >= 185) {
					r.push(`but ${his} tall frame bears ${his} huge, drum-taut belly well.`);
				} else if (slave.height < 150) {
					r.push(`and ${his} huge, drum-taut belly dominates ${his} poor little frame.`);
				} else if (slave.muscles > 30) {
					r.push(`and ${his} fit body bears ${his} huge, drum-taut belly well.`);
				} else {
					r.push(`and ${his} huge, drum-taut belly dominates ${his} frame.`);
				}
				if (slave.preg < 40) {
					if (slave.pregType === 3) {
						r.push(`${His} womb is mostly filled with excess amniotic fluid, masking that ${he} is having triplets.`);
					} else {
						r.push(`Given how far along ${he} is, ${he} is clearly having more than three.`);
					}
				} else if (slave.preg < 42) {
					if (slave.pregType === 2) {
						r.push(`${He} looks full-term with triplets, but is really only carrying two and an obscene amount of amniotic fluid.`);
					} else {
						r.push(`${He} is clearly full-term with triplets.`);
					}
				} else if (slave.pregType === 1) {
					r.push(`${His} womb contains one single, massive unborn child. There is little to no chance of ${him} giving birth to it.`);
				} else if (slave.pregType === 2) {
					r.push(`${His} womb contains a pair of oversized babies. There is little chance of ${him} giving birth to them.`);
				}
				if (slave.bellyFluid >= 1500) {
					if (slave.inflationMethod === 2) {
						r.push(`There is a distinct curve to ${his} upper belly, the result of a stomach filled with ${slave.inflationType}.`);
					} else {
						r.push(`${His} stomach bulges a little larger thanks to all the ${slave.inflationType} in ${his} bowels.`);
					}
				}
			} else {
				r.push(`${He} looks full term with triplets,`);
				if (slave.physicalAge <= 3) {
					r.push(`and ${his} toddlerish body is absolutely filled by ${his} implant, making ${him} resemble an overinflated blow-up doll.`);
					if (canWalk(slave)) {
						r.push(`${His} walk is more of an awkward waddle as ${he} struggles to handle the weight hanging from ${his} middle.`);
					} else if (canStand(slave)) {
						r.push(`${He} stands with ${his} back arched to better support ${his} stomach's weight.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires assistance to get in and out of it.`);
							}
						} else {
							r.push(`${His} stomach pushes into the floor as ${he} crawls.`);
						}
					}
				} else if (slave.physicalAge <= 12) {
					r.push(`and ${his} huge, drum-taut belly dominates ${his} poor little frame.`);
				} else if (slave.weight > 190) {
					r.push(`but ${he}'s so massively fat that it's not obvious. Only the firmness at ${his} belly's top and the weight in its sway give any hint that something's bulging it outwards.`);
				} else if (slave.height >= 185) {
					r.push(`but ${his} tall frame bears ${his} huge, drum-taut belly well.`);
				} else if (slave.height < 150) {
					r.push(`and ${his} huge, drum-taut belly dominates ${his} poor little frame.`);
				} else if (slave.muscles > 30) {
					r.push(`and ${his} fit body bears ${his} huge, drum-taut belly well.`);
				} else {
					r.push(`and ${his} huge, drum-taut belly dominates ${his} frame.`);
				}
				if (slave.bellyFluid >= 1500) {
					if (slave.inflationMethod === 2) {
						r.push(`There is a distinct curve to ${his} upper belly, the result of a stomach filled with ${slave.inflationType}.`);
					} else {
						r.push(`${His} stomach bulges a little larger thanks to all the ${slave.inflationType} in ${his} bowels.`);
					}
				}
			}
		} else if (slave.belly >= 30000) {
			if (isBellyFluidLargest) {
				// TODO: write me
			} else if (slave.bellyPreg > 0) {
				r.push(`${He} is enormously pregnant,`);
				if (slave.physicalAge <= 3) {
					r.push(`and ${his} toddlerish body is absolutely filled by ${his} womb, making ${him} resemble an overinflated blow-up doll.`);
					if (canWalk(slave)) {
						r.push(`${His} walk is more of an awkward waddle as ${he} struggles to handle the weight hanging from ${his} middle.`);
					} else if (canStand(slave)) {
						r.push(`${He} stands with ${his} back arched to better support ${his} stomach's weight.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires assistance to get in and out of it.`);
							}
						} else {
							r.push(`${His} stomach pushes into the floor as ${he} crawls.`);
						}
					}
				} else if (slave.physicalAge <= 12) {
					r.push(`and ${his} huge, drum-taut belly lewdly dominates ${his} poor little frame.`);
				} else if (slave.weight > 190) {
					r.push(`but ${he}'s so massively fat that it's not too obvious. Only the firmness at its top gives away ${his} pregnancy.`);
				} else if (slave.height >= 185) {
					r.push(`but ${his} tall frame bears ${his} huge, drum-taut belly well.`);
				} else if (slave.height < 150) {
					r.push(`and ${his} huge, drum-taut belly dominates ${his} poor little frame.`);
				} else if (slave.muscles > 30) {
					r.push(`and ${his} fit body bears ${his} huge, drum-taut belly well.`);
				} else {
					r.push(`and ${his} huge, drum-taut belly dominates ${his} frame.`);
				}
				if (slave.preg < 40) {
					r.push(`Given how far along ${he} is, ${he} is clearly having more than two.`);
				} else if (slave.preg < 42) {
					if (slave.pregType === 1) {
						r.push(`${He} looks full-term with twins, but is really only carrying one and an obscene amount of amniotic fluid.`);
					} else {
						r.push(`${He} is clearly full-term with twins.`);
					}
				} else if (slave.pregType === 1) {
					if (WombGetFetalSizeSum(slave) < 30000) {
						r.push(`${He} is ready to pop, literally; there is so much amniotic fluid around ${his} sole baby it is a wonder ${his} water hasn't broken yet.`);
					} else {
						r.push(`${His} womb contains one single, massive child. There is little chance of ${him} giving birth to it.`);
					}
				}
				if (slave.bellyFluid >= 1500) {
					if (slave.inflationMethod === 2) {
						r.push(`There is a distinct curve to ${his} upper belly, the result of a stomach filled with ${slave.inflationType}.`);
					} else {
						r.push(`${His} stomach bulges a little larger thanks to all the ${slave.inflationType} in ${his} bowels.`);
					}
				}
			} else {
				r.push(`${He} looks full term with twins,`);
				if (slave.physicalAge <= 3) {
					r.push(`and ${his} toddlerish body is absolutely filled by ${his} implant, making ${him} resemble an overinflated blow-up doll.`);
					if (canWalk(slave)) {
						r.push(`${His} walk is more of an awkward waddle as ${he} struggles to handle the weight hanging from ${his} middle.`);
					} else if (canStand(slave)) {
						r.push(`${He} stands with ${his} back arched to better support ${his} stomach's weight.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires assistance to get in and out of it.`);
							}
						} else {
							r.push(`${His} stomach pushes into the floor as ${he} crawls.`);
						}
					}
				} else if (slave.physicalAge <= 12) {
					r.push(`and ${his} huge, drum-taut belly dominates ${his} poor little frame.`);
				} else if (slave.weight > 190) {
					r.push(`but ${he}'s so massively fat that it's not obvious. Only the firmness at ${his} belly's top and the weight in its sway give any hint that something's bulging it outwards.`);
				} else if (slave.height >= 185) {
					r.push(`but ${his} tall frame bears ${his} huge, drum-taut belly well.`);
				} else if (slave.height < 150) {
					r.push(`and ${his} huge, drum-taut belly dominates ${his} poor little frame.`);
				} else if (slave.muscles > 30) {
					r.push(`and ${his} fit body bears ${his} huge, drum-taut belly well.`);
				} else {
					r.push(`and ${his} huge, drum-taut belly dominates ${his} frame.`);
				}
				if (slave.bellyFluid >= 1500) {
					if (slave.inflationMethod === 2) {
						r.push(`There is a distinct curve to ${his} upper belly, the result of a stomach filled with ${slave.inflationType}.`);
					} else {
						r.push(`${His} stomach bulges a little larger thanks to all the ${slave.inflationType} in ${his} bowels.`);
					}
				}
			}
		} else if (slave.belly >= 15000) {
			if (isBellyFluidLargest) {
				// TODO: write me
			} else if (slave.bellyPreg > 0) {
				r.push(`${He} is enormously pregnant,`);
				if (slave.physicalAge <= 3) {
					r.push(`and ${his} toddlerish body is absolutely filled by ${his} womb, making ${him} resemble an overinflated blow-up doll.`);
					if (canWalk(slave)) {
						r.push(`${His} walk is more of an awkward waddle as ${he} struggles to handle the weight hanging from ${his} middle.`);
					} else if (canStand(slave)) {
						r.push(`${He} stands with ${his} back arched to better support ${his} stomach's weight.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires assistance to get in and out of it.`);
							}
						} else {
							r.push(`${His} stomach hangs heavily, navel tickling the floor, as ${he} crawls.`);
						}
					}
				} else if (slave.physicalAge <= 12) {
					r.push(`and ${his} huge, drum-taut belly lewdly dominates ${his} poor little frame.`);
				} else if (slave.weight > 190) {
					r.push(`but ${he}'s so massively fat that it's not obvious. Only the firmness at its top gives away ${his} pregnancy.`);
				} else if (slave.height >= 185) {
					r.push(`but ${his} tall frame bears ${his} huge, drum-taut belly well.`);
				} else if (slave.height < 150) {
					r.push(`and ${his} huge, drum-taut belly dominates ${his} poor little frame.`);
				} else if (slave.muscles > 30) {
					r.push(`and ${his} fit body bears ${his} huge, drum-taut belly well.`);
				} else {
					r.push(`and ${his} huge, drum-taut belly dominates ${his} frame.`);
				}
				if (slave.preg < 33) {
					if (WombGetFetalSizeSum(slave) < 15000 && slave.pregType === 1) {
						r.push(`Despite ${his} size, ${he} is only having one; the rest of ${his} womb is filled with an abnormal amount of amniotic fluid.`);
					} else {
						r.push(`Given how far along ${he} is, ${he} is clearly having multiples.`);
					}
				} else {
					r.push(`${He} is clearly full-term.`);
				}
				if (slave.bellyFluid >= 1500) {
					if (slave.inflationMethod === 2) {
						r.push(`There is a distinct curve to ${his} upper belly, the result of a stomach filled with ${slave.inflationType}.`);
					} else {
						r.push(`${His} stomach bulges a little larger thanks to all the ${slave.inflationType} in ${his} bowels.`);
					}
				}
			} else {
				r.push(`${He} looks hugely pregnant,`);
				if (slave.physicalAge <= 3) {
					r.push(`and ${his} toddlerish body is absolutely filled by ${his} implant, making ${him} resemble an overinflated blow-up doll.`);
					if (canWalk(slave)) {
						r.push(`${His} walk is more of an awkward waddle as ${he} struggles to handle the weight hanging from ${his} middle.`);
					} else if (canStand(slave)) {
						r.push(`${He} stands with ${his} back arched to better support ${his} stomach's weight.`);
					} else if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							if (hasBothLegs(slave)) {
								r.push(`${He} requires assistance to get to ${his} feet, and uses a wheeled stand to support ${his} middle when ${he} must walk anywhere.`);
							} else {
								r.push(`${He} uses a wheelchair when ${he} must go somewhere and requires assistance to get in and out of it.`);
							}
						} else {
							r.push(`${His} stomach hangs heavily, navel tickling the floor, as ${he} crawls.`);
						}
					}
				} else if (slave.physicalAge <= 12) {
					r.push(`and ${his} huge, drum-taut belly dominates ${his} poor little frame.`);
				} else if (slave.weight > 190) {
					r.push(`but ${he}'s so massively fat that it's not obvious. Only the firmness at ${his} belly's top and the weight in its sway give any hint that something's bulging it outwards.`);
				} else if (slave.height >= 185) {
					r.push(`but ${his} tall frame bears ${his} huge, drum-taut belly well.`);
				} else if (slave.height < 150) {
					r.push(`and ${his} huge, drum-taut belly dominates ${his} poor little frame.`);
				} else if (slave.muscles > 30) {
					r.push(`and ${his} fit body bears ${his} huge, drum-taut belly well.`);
				} else {
					r.push(`and ${his} huge, drum-taut belly dominates ${his} frame.`);
				}
				if (slave.bellyFluid >= 1500) {
					if (slave.inflationMethod === 2) {
						r.push(`There is a distinct curve to ${his} upper belly, the result of a stomach filled with ${slave.inflationType}.`);
					} else {
						r.push(`${His} stomach bulges a little larger thanks to all the ${slave.inflationType} in ${his} bowels.`);
					}
				}
			}
		} else if (slave.belly >= 10000) {
			if (isBellyFluidLargest) {
				r.push(`${His} middle is enormously distended with ${slave.inflationType},`);
				if (slave.physicalAge <= 3) {
					r.push(`and ${his} toddlerish body is absolutely filled by ${his} bloated innards.`);
					if (canWalk(slave)) {
						r.push(`${He} can barely waddle and resembles an overinflated blow-up doll.`);
					} else {
						r.push(`${He} greatly resembles an overinflated blow-up doll.`);
					}
				} else if (slave.physicalAge <= 12) {
					r.push(`and ${his} massive, drum-taut belly dominates ${his} poor little frame.`);
				} else if (slave.weight > 130) {
					r.push(`but ${he}'s so fat that it's not obvious.`);
				} else if (slave.height >= 185) {
					r.push(`but ${his} tall frame bears ${his} massive, drum-taut belly well.`);
				} else if (slave.height < 150) {
					r.push(`and ${his} massive, drum-taut belly dominates ${his} poor little frame.`);
				} else if (slave.muscles > 30) {
					r.push(`and ${his} fit body bears ${his} massive, drum-taut belly well.`);
				} else {
					r.push(`and ${his} massive, drum-taut belly dominates ${his} frame.`);
				}
			} else if (slave.bellyPreg > 0) {
				r.push(`${He} is heavily pregnant,`);
				if (slave.physicalAge <= 3) {
					r.push(`and ${his} gravid belly is nearly as big as ${his} toddlerish body.`);
				} else if (slave.physicalAge <= 12) {
					r.push(`and ${his} gravid belly lewdly dominates ${his} poor little frame.`);
				} else if (slave.weight > 130) {
					r.push(`but ${he}'s so fat that it's not obvious. Only the firmness at its top gives away ${his} pregnancy.`);
				} else if (slave.height >= 185) {
					r.push(`but ${his} tall frame bears ${his} gravid belly well.`);
				} else if (slave.height < 150) {
					r.push(`and ${his} gravid belly dominates ${his} poor little frame.`);
				} else if (slave.muscles > 30) {
					r.push(`and ${his} fit body bears ${his} gravid belly well.`);
				} else {
					r.push(`and ${his} gravid belly dominates ${his} frame.`);
				}
				if (slave.preg < 20) {
					r.push(`Given how massive ${he} is without being halfway through ${his} pregnancy; ${he} is clearly having way too many children.`);
				} else if (slave.preg < 30) {
					r.push(`Given how far along ${he} is, ${he} is clearly having multiples.`);
				}
				if (slave.bellyFluid >= 1500) {
					if (slave.inflationMethod === 2) {
						r.push(`There is a distinct curve to ${his} upper belly, the result of a stomach filled with ${slave.inflationType}.`);
					} else {
						r.push(`${His} stomach bulges a little larger thanks to all the ${slave.inflationType} in ${his} bowels.`);
					}
				}
			} else {
				r.push(`${He} looks heavily pregnant,`);
				if (slave.physicalAge <= 3) {
					r.push(`and ${his} distended belly is nearly as big as ${his} toddlerish body.`);
				} else if (slave.physicalAge <= 12) {
					r.push(`and ${his} distended belly lewdly dominates ${his} poor little frame.`);
				} else if (slave.weight > 130) {
					r.push(`but ${he}'s so fat that it's not obvious. Only the firmness at ${his} belly's top and the weight in its sway give any hint that something's amiss.`);
				} else if (slave.height >= 185) {
					r.push(`but ${his} tall frame bears ${his} distended belly well.`);
				} else if (slave.height < 150) {
					r.push(`and ${his} distended belly dominates ${his} poor little frame.`);
				} else if (slave.muscles > 30) {
					r.push(`and ${his} fit body bears ${his} distended belly well.`);
				} else {
					r.push(`and ${his} distended belly dominates ${his} frame.`);
				}
				if (slave.bellyFluid >= 1500) {
					if (slave.inflationMethod === 2) {
						r.push(`There is a distinct curve to ${his} upper belly, the result of a stomach filled with ${slave.inflationType}.`);
					} else {
						r.push(`${His} stomach bulges a little larger thanks to all the ${slave.inflationType} in ${his} bowels.`);
					}
				}
			}
		} else if (slave.belly >= 5000) {
			if (isBellyFluidLargest) {
				r.push(`${He} is greatly distended with ${slave.inflationType},`);
				if (slave.physicalAge <= 3) {
					r.push(`and ${his} swollen belly is nearly as big as ${his} toddlerish body.`);
				} else if (slave.physicalAge <= 12) {
					r.push(`and ${his} swollen belly is eye-catching on ${his} little frame.`);
				} else if (slave.weight > 130) {
					r.push(`but ${he}'s so fat that it's not obvious.`);
				} else if (slave.height >= 185) {
					r.push(`but ${his} tall frame bears ${his} swollen belly well.`);
				} else if (slave.height < 150) {
					r.push(`and ${his} swollen belly is eye-catching on ${his} little frame.`);
				} else if (slave.muscles > 30) {
					r.push(`and ${his} fit body bears ${his} swollen belly well.`);
				} else {
					r.push(`and ${his} swollen belly is eye-catching on ${his} little frame.`);
				}
			} else if (slave.bellyPreg > 0) {
				r.push(`${He} is clearly pregnant,`);
				if (slave.physicalAge <= 3) {
					r.push(`and ${his} rounded belly takes up much of ${his} toddlerish body.`);
				} else if (slave.physicalAge <= 12) {
					r.push(`and ${his} rounded belly is eye-catching on ${his} little frame.`);
				} else if (slave.weight > 130) {
					r.push(`but ${he}'s so fat that it's not obvious.`);
				} else if (slave.height >= 185) {
					r.push(`but ${his} tall frame bears ${his} rounded middle well.`);
				} else if (slave.height < 150) {
					r.push(`and ${his} rounded belly is eye-catching on ${his} little frame.`);
				} else if (slave.muscles > 30) {
					r.push(`and ${his} fit body bears ${his} rounded belly well.`);
				} else {
					r.push(`and ${his} rounded belly is eye-catching on ${his} frame.`);
				}
				if (slave.bellyFluid >= 1500) {
					if (slave.inflationMethod === 2) {
						r.push(`There is a distinct curve to ${his} upper belly, the result of a stomach filled with ${slave.inflationType}.`);
					} else {
						r.push(`${His} stomach bulges a little larger thanks to all the ${slave.inflationType} in ${his} bowels.`);
					}
				}
			} else {
				r.push(`${He} looks pregnant,`);
				if (slave.physicalAge <= 3) {
					r.push(`and ${his} swollen belly dominates ${his} toddlerish body.`);
				} else if (slave.physicalAge <= 12) {
					r.push(`and ${his} swollen belly is eye-catching on ${his} little frame.`);
				} else if (slave.weight > 130) {
					r.push(`but ${he}'s so fat that it's not obvious.`);
				} else if (slave.height >= 185) {
					r.push(`but ${his} tall frame bears ${his} swollen belly well.`);
				} else if (slave.height < 150) {
					r.push(`and ${his} swollen belly is eye-catching on ${his} little frame.`);
				} else if (slave.muscles > 30) {
					r.push(`and ${his} fit body bears ${his} swollen belly well.`);
				} else {
					r.push(`and ${his} swollen belly is eye-catching on ${his} frame.`);
				}
				if (slave.bellyFluid >= 1500) {
					if (slave.inflationMethod === 2) {
						r.push(`There is a distinct curve to ${his} upper belly, the result of a stomach filled with ${slave.inflationType}.`);
					} else {
						r.push(`${His} stomach bulges a little larger thanks to all the ${slave.inflationType} in ${his} bowels.`);
					}
				}
			}
		} else if (slave.belly >= 1500) {
			if (isBellyFluidLargest) {
				r.push(`${He} is visibly swollen with ${slave.inflationType},`);
				if (slave.physicalAge <= 3) {
					r.push(`and ${his} sloshing belly looks obscene on ${his} toddlerish body.`);
				} else if (slave.physicalAge <= 10) {
					r.push(`and ${his} sloshing belly looks huge on ${his} tiny frame.`);
				} else if (slave.weight > 95) {
					r.push(`but ${he}'s sufficiently overweight that it's not obvious.`);
				} else if (slave.height < 150) {
					r.push(`and ${his} sloshing belly looks huge on ${his} tiny frame.`);
				} else if (slave.weight <= -10) {
					r.push(`${his} thin form making ${his} sloshing belly very obvious.`);
				} else {
					r.push(`giving ${his} stomach a distinct curvature.`);
				}
				if (slave.bellySag > 0) {
					r.push(`${His} swollen belly fills out ${his} overstretched middle slightly.`);
				}
			} else if (slave.bellyPreg > 0) {
				r.push(`${He} is visibly pregnant,`);
				if (slave.physicalAge <= 3) {
					r.push(`and ${his} swelling belly looks obscene on ${his} toddlerish body.`);
				} else if (slave.physicalAge <= 10) {
					r.push(`and ${his} swelling belly already looks huge on ${his} tiny frame.`);
				} else if (slave.weight > 95) {
					r.push(`but ${he}'s sufficiently overweight that it's not obvious.`);
				} else if (slave.height < 150) {
					r.push(`and ${his} swelling belly already looks huge on ${his} tiny frame.`);
				} else if (slave.weight < -10) {
					r.push(`${his} thin form making ${his} swelling belly very obvious.`);
				} else {
					r.push(`the life growing within ${his} beginning to swell ${his} belly.`);
				}
				if (slave.bellySag > 0) {
					r.push(`${His} new pregnancy reduces the amount of sag to ${his} overstretched middle.`);
				}
			} else {
				r.push(`${He} looks bloated,`);
				if (slave.physicalAge <= 3) {
					r.push(`and ${his} swollen belly looks obscene on ${his} toddlerish body.`);
				} else if (slave.physicalAge <= 12) {
					r.push(`and ${his} swollen belly already looks huge on ${his} tiny frame.`);
				} else if (slave.weight > 95) {
					r.push(`but ${he}'s sufficiently overweight that it's not obvious.`);
				} else if (slave.height < 150) {
					r.push(`and ${his} swollen belly already looks huge on ${his} tiny frame.`);
				} else if (slave.weight < -10) {
					r.push(`${his} thin form making ${his} swollen belly very obvious.`);
				} else {
					r.push(`the implant just beginning to visibly bulge ${his} belly.`);
				}
				if (slave.bellySag > 0) {
					r.push(`${His} swollen belly fills out ${his} overstretched middle slightly.`);
				}
			}
		} else if (slave.belly >= 100) {
			if (isBellyFluidLargest) {
				r.push(`${His} belly is slightly bloated`);
				if (slave.physicalAge <= 3) {
					r.push(`and painfully obvious on ${his} toddlerish body.`);
				} else if (slave.physicalAge <= 10) {
					r.push(`and abundantly clear on ${his} youthful frame.`);
				} else if (slave.weight > 95) {
					r.push(`but ${he}'s sufficiently overweight that it's not noticeable in passing.`);
				} else if (slave.height < 150) {
					r.push(`and abundantly clear on ${his} tiny frame.`);
				} else if (slave.weight < -10) {
					r.push(`and ${his} thin form makes it very obvious.`);
				} else {
					r.push(`but not very obvious.`);
				}
			} else if (slave.bellyPreg > 0 && slave.pregKnown === 1) {
				r.push(`${His} belly is slightly rounded`);
				if (slave.physicalAge <= 3) {
					r.push(`and painfully obvious on ${his} toddlerish body.`);
				} else if (slave.physicalAge <= 10) {
					r.push(`and abundantly clear on ${his} youthful frame.`);
				} else if (slave.weight > 95) {
					r.push(`but ${he}'s sufficiently overweight that it's not noticeable in passing.`);
				} else if (slave.height < 150) {
					r.push(`and abundantly clear on ${his} tiny frame.`);
				} else if (slave.weight < -10) {
					r.push(`and ${his} thin form makes it very obvious.`);
				} else {
					r.push(`but not very obvious.`);
				}
				if (slave.bellySag > 0) {
					r.push(`${His} belly seems to sag a little less as ${his} middle bulges.`);
				}
			} else {
				r.push(`${His} belly is slightly bloated`);
				if (slave.physicalAge <= 3) {
					r.push(`and painfully obvious on ${his} toddlerish body.`);
				} else if (slave.physicalAge <= 10) {
					r.push(`and abundantly clear on ${his} youthful frame.`);
				} else if (slave.weight > 95) {
					r.push(`but ${he}'s sufficiently overweight that it's not noticeable in passing.`);
				} else if (slave.height < 150) {
					r.push(`and abundantly clear on ${his} tiny frame.`);
				} else if (slave.weight < -10) {
					r.push(`and ${his} thin form makes it very obvious.`);
				} else {
					r.push(`but not very obvious.`);
				}
				if (slave.bellySag > 0) {
					r.push(`${His} belly seems to sag a little less as ${his} middle bulges.`);
				}
			}
		} else if (slave.bellySagPreg > 20) {
			r.push(`${His}`);
			if (slave.geneMods.rapidCellGrowth !== 1) {
				r.push(`stretch mark streaked`);
			} else {
				r.push(`overstretched`);
			}
			r.push(`stomach sags massively after being distended for so long by so many children.`);
		} else if (slave.bellySag > 20) {
			r.push(`${His}`);
			if (slave.geneMods.rapidCellGrowth !== 1) {
				r.push(`stretch mark streaked`);
			} else {
				r.push(`overstretched`);
			}
			r.push(`stomach sags massively after being distended for so long.`);
		} else if ((slave.assignment === Job.DAIRY) && (V.dairyFeedersSetting + V.dairyStimulatorsSetting > 2)) {
			r.push(`${His} stomach is painfully distended from the nutrition and hydration being pumped down ${his} throat and up ${his} butt.`);
		} else if (slave.weight > 190) {
			if (slave.muscles > 95) {
				r.push(`${His} massive abs are lost beneath ${his} overwhelming flab. In fact, ${he}'s so massively fat that ${his} navel is also lost deep in a fold of ${his} belly. Multiple thick, huge rolls run along its sides around to ${his} flabby back.`);
			} else if (slave.muscles > 30) {
				r.push(`${His} abs are lost beneath ${his} overwhelming flab; ${he}'s so hugely fat that ${his} navel is also lost deep in a fold of ${his} belly. Multiple thick rolls run along its sides around to ${his} flabby back.`);
			} else {
				r.push(`${He} carries a tremendous amount of ${his} weight on ${his} stomach; ${he}'s so massively fat that ${his} navel is lost deep in a fold of ${his} belly. Multiple thick rolls run along its sides around to ${his} flabby back.`);
			}
			if (slave.bellySag > 1) {
				r.push(`${His} immensely fat belly sags`);
				if (slave.bellySag >= 10) {
					r.push(`considerably`);
				}
				r.push(`from being`);
				if (slave.bellySagPreg > 1) {
					r.push(`stretched so long and so full by ${his} excessive pregnancy,`);
				} else {
					r.push(`distended for so long,`);
				}
				r.push(`though it's hard to tell since it always sagged under its crushing weight and massive size.`);
			} else if (slave.physicalAge > 35) {
				r.push(`${His} immensely fat belly is starting to show its age, and sags a lot more than usual; though it's hard to tell since it always sagged under its crushing weight and massive size.`);
			}
		} else if (slave.weight > 160) {
			if (slave.muscles > 95) {
				r.push(`${His} massive abs are shrouded by an extra thick layer of fat. In fact, ${he}'s so hugely fat that ${his} navel is buried deep in a fold of ${his} belly. Several thick rolls run along its sides around to ${his} flabby back.`);
			} else if (slave.muscles > 30) {
				r.push(`${His} abs are hidden behind a massive soft stomach; ${he}'s so hugely fat that ${his} navel is buried deep in a fold of ${his} belly. Several thick rolls run along its sides around to ${his} flabby back.`);
			} else {
				r.push(`${He} carries a huge amount of ${his} weight on ${his} stomach; ${he}'s so hugely fat that ${his} navel is buried deep in a fold of ${his} belly. Several thick rolls run along its sides around to ${his} flabby back.`);
			}
			if (slave.bellySag > 1) {
				r.push(`${His} huge fat belly sags`);
				if (slave.bellySag >= 10) {
					r.push(`considerably`);
				}
				r.push(`from being`);
				if (slave.bellySagPreg > 1) {
					r.push(`stretched so long and so full by ${his} excessive pregnancy,`);
				} else {
					r.push(`distended for so long,`);
				}
				r.push(`though it already hangs due to its size and weight.`);
			} else if (slave.physicalAge > 35) {
				r.push(`${His} huge fat belly is starting to show its age, and sags a lot.`);
			}
		} else if (slave.weight > 130) {
			if (slave.muscles > 95) {
				r.push(`${His} massive abs are shrouded by a thick layer of fat. In fact, ${he}'s so fat that ${his} navel is buried in a fold of ${his} belly. Said fold runs from ${his} navel around to ${his} back.`);
			} else if (slave.muscles > 30) {
				r.push(`${His} abs are hidden behind a huge soft stomach; ${he}'s so fat that ${his} navel is buried in a fold of ${his} belly. Said fold runs from ${his} navel around to ${his} back.`);
			} else {
				r.push(`${He} carries a lot of ${his} weight on ${his} stomach; ${he}'s so fat that ${his} navel is buried in a fold of ${his} belly. Said fold runs from ${his} navel around to ${his} back.`);
			}
			if (slave.bellySag > 1) {
				r.push(`${His} big fat belly sags`);
				if (slave.bellySag >= 10) {
					r.push(`considerably`);
				}
				r.push(`from being`);
				if (slave.bellySagPreg > 1) {
					r.push(`stretched so long and so full by ${his} excessive pregnancy.`);
				} else {
					r.push(`distended for so long.`);
				}
			} else if (slave.physicalAge > 35) {
				r.push(`${His} big fat belly is starting to show its age, and sags a little.`);
			}
		} else if (slave.weight > 95) {
			if (slave.muscles > 95) {
				r.push(`${His} massive abs are shrouded by a thick layer of fat. In fact, ${he}'s so fat that ${his} navel is buried in a fold of ${his} belly.`);
			} else if (slave.muscles > 30) {
				r.push(`${His} abs are hidden behind a big soft stomach; ${he}'s so fat that ${his} navel is buried in a fold of ${his} belly.`);
			} else {
				r.push(`${He} carries a lot of ${his} weight on ${his} stomach; ${he}'s so fat that ${his} navel is buried in a fold of ${his} belly.`);
			}
			if (slave.bellySag > 1) {
				r.push(`${His} fat belly sags`);
				if (slave.bellySag >= 10) {
					r.push(`considerably`);
				}
				r.push(`from being`);
				if (slave.bellySagPreg > 1) {
					r.push(`stretched so long and so full by ${his} excessive pregnancy.`);
				} else {
					r.push(`distended for so long.`);
				}
			} else if (slave.physicalAge > 35) {
				r.push(`${His} fat belly is starting to show its age, and sags a little.`);
			}
		} else if (slave.weight > 30) {
			if (slave.muscles > 30) {
				r.push(`${His} abs are big enough that they're ${slave.muscles > 95 ? "clearly" : "subtly"} visible behind ${his} well-padded belly.`);
			} else if (slave.muscles > 5) {
				r.push(`${He}'s fit enough to carry ${his} extra weight well, leaving ${his} chubby belly appealingly soft.`);
			} else {
				r.push(`${His} chubby belly is nice and soft, hiding the curve of ${his} waist a little.`);
			}
			if (slave.bellySag > 1) {
				r.push(`However, it sags`);
				if (slave.bellySag >= 10) {
					r.push(`considerably`);
				}
				r.push(`from being`);
				if (slave.bellySagPreg > 1) {
					r.push(`stretched so long and so full by ${his} excessive pregnancy.`);
				} else {
					r.push(`distended for so long.`);
				}
			}
		} else if (slave.weight > 10) {
			if (slave.muscles > 30) {
				r.push(`${His} ripped abs are only slightly blurred by feminine belly fat.`);
			} else if (slave.muscles > 5) {
				r.push(`${He}'s fit yet soft, with ${his} toned abs complementing ${his} feminine belly.`);
			} else {
				r.push(`${His} belly is pleasantly soft.`);
			}
			if (slave.bellySag > 1) {
				r.push(`However, it sags`);
				if (slave.bellySag >= 10) {
					r.push(`considerably`);
				}
				r.push(`from being`);
				if (slave.bellySagPreg > 1) {
					r.push(`stretched so long and so full by ${his} excessive pregnancy.`);
				} else {
					r.push(`distended for so long.`);
				}
			}
		} else if (slave.weight >= -10) {
			if (slave.muscles > 30) {
				r.push(`${His} abs ripple as ${he} moves, each one well-defined under the skin of ${his} midsection.`);
			} else if (slave.muscles > 5) {
				r.push(`${He} has a nicely toned midsection, promising good stamina.`);
			} else {
				r.push(`${He} has a feminine belly with just a hint of softness.`);
			}
			if (slave.bellySag > 1) {
				r.push(`However, it sags considerably from being`);
				if (slave.bellySagPreg > 1) {
					r.push(`stretched so long and so full by ${his} excessive pregnancy.`);
				} else {
					r.push(`distended for so long.`);
				}
			}
		} else if (slave.weight >= -30) {
			if (slave.muscles > 30) {
				if (slave.bellySag > 1) {
					r.push(`${His} once ridiculous abs sag`);
					if (slave.bellySag >= 10) {
						r.push(`considerably`);
					}
					r.push(`from being stretched so long and so full by ${his} many children.`);
				} else {
					r.push(`${His} ridiculous abs ripple as ${he} moves, every single striation and vein clearly visible under the skin of ${his} midsection.`);
				}
			} else if (slave.muscles > 5) {
				if (slave.bellySag > 1) {
					r.push(`${His} once toned belly sags`);
					if (slave.bellySag >= 10) {
						r.push(`considerably`);
					}
					r.push(`from being`);
					if (slave.bellySagPreg > 1) {
						r.push(`stretched so long and so full by ${his} excessive pregnancy.`);
					} else {
						r.push(`distended for so long.`);
					}
				} else {
					r.push(`${His} thin midsection highlights ${his} abs, showing off a hint of a six-pack.`);
				}
			} else {
				if (slave.bellySag > 1) {
					r.push(`${He} once had a model's midsection, however, it now sags`);
					if (slave.bellySag >= 10) {
						r.push(`considerably`);
					}
					r.push(`from being`);
					if (slave.bellySagPreg > 1) {
						r.push(`stretched so long and so full by ${his} excessive pregnancy.`);
					} else {
						r.push(`distended for so long.`);
					}
				} else {
					r.push(`${He} has a model's midsection, without any hint of belly or musculature.`);
				}
			}
		} else {
			if (slave.muscles > 5) {
				if (slave.bellySag > 1) {
					r.push(`${He} has abs, but they sag`);
					if (slave.bellySag >= 10) {
						r.push(`considerably`);
					}
					r.push(`from being`);
					if (slave.bellySagPreg > 1) {
						r.push(`stretched so long and so full by ${his} excessive pregnancy.`);
					} else {
						r.push(`distended for so long.`);
					}
				} else {
					r.push(`${His} abs are clearly visible, stretched over ${his} emaciated frame as they are.`);
				}
			} else {
				if (slave.bellySag > 1) {
					r.push(`${His} emaciated belly is`);
					if (slave.bellySag >= 10) {
						r.push(`extremely`);
					}
					r.push(`stretched; the product of being too`);
					if (slave.bellySagPreg > 1) {
						r.push(`pregnant`);
					} else {
						r.push(`distended`);
					}
					r.push(`for too long.`);
				} else {
					r.push(`${His} emaciated belly is perfectly flat.`);
				}
			}
		}
		return r.join(" ");
	}

	function clothing() {
		const r = [];
		const clothing = App.Data.clothes.get(slave.clothes);
		if (clothing && clothing.desc && "belly" in clothing.desc) {
			r.push(clothing.desc.belly(slave));
		} else {
			switch (slave.clothes) {
				case "a Fuckdoll suit":
					if (slave.belly >= 1000000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s suit has no stomach to it, as it's the only way to give ${his} unfathomable, hyper-swollen, ${slave.inflationType}-filled belly the space it demands.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s suit has no stomach to it, as it's the only way to give ${his} unfathomable, hyper-swollen, implant-filled belly the space it demands.`);
						} else {
							if (slave.preg > slave.pregData.normalBirth / 1.17) {
								r.push(`The front of ${slave.slaveName}'s suit is made of a clear, stretchy plastic that is stretched thin as it reinforces ${his} unfathomable, hyper-swollen, pregnancy. A hole at the very front of the suit allows ${his} popped navel to bulge through. The movement of ${his} countless children is clear to see.`);
							} else {
								r.push(`${slave.slaveName}'s suit has no stomach to it, as it's the only way to give ${his} monolithic pregnancy the space it requires to shift and bulge ominously.`);
							}
						}
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s suit has no stomach to it, as it's the only way to give ${his} monolithic ${slave.inflationType}-filled belly the space it demands.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s suit has no stomach to it, as it's the only way to give ${his} monolithic implant-filled belly the space it demands.`);
						} else {
							if (slave.preg > slave.pregData.normalBirth / 1.17) {
								r.push(`${slave.slaveName}'s suit is designed to carefully cradle and reinforce ${his} monolithic pregnancy, creating an imposing, lumpy dome capped by ${his} popped navel. It visibly shifts and pulses as ${his} brood competes for space.`);
							} else {
								r.push(`${slave.slaveName}'s suit has no stomach to it, as it's the only way to give ${his} monolithic pregnancy the space it requires to shift and bulge ominously.`);
							}
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s titanic ${slave.inflationType}-filled belly is allowed to bulge out of an enormous hole in the suit.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s titanic implant-filled belly is allowed to bulge out of an enormous hole in the suit.`);
						} else {
							r.push(`${slave.slaveName}'s titanic pregnant belly is allowed to bulge out of an enormous hole in the suit, giving ${his} squirming occupants room to grow.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s gigantic ${slave.inflationType}-filled belly is allowed to bulge out of a huge hole in the suit.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s gigantic implant-filled belly is allowed to bulge out of a huge hole in the suit.`);
						} else {
							if (slave.preg > 34) {
								r.push(`${slave.slaveName}'s suit is designed to carefully cradle and reinforce ${his} gigantic pregnancy, creating an imposing dome capped by ${his} popped navel. Slight undulations can be felt running through it.`);
							} else {
								r.push(`${slave.slaveName}'s gigantic pregnant belly is allowed to bulge out of a huge hole in the suit.`);
							}
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s massive ${slave.inflationType}-filled belly is allowed to bulge out of a huge hole in the suit.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s massive implant-filled belly is allowed to bulge out of a huge hole in the suit.`);
						} else {
							if (slave.preg > slave.pregData.normalBirth / 1.17) {
								r.push(`${slave.slaveName}'s suit is designed to carefully cradle ${his} massive pregnancy, creating an imposing dome capped by ${his} popped navel.`);
							} else {
								r.push(`${slave.slaveName}'s massive pregnant belly is allowed to bulge out of a huge hole in the suit.`);
							}
						}
					} else if (slave.belly >= 150000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s giant ${slave.inflationType}-filled belly is allowed to bulge out of a huge hole in the suit.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s giant implant-filled belly is allowed to bulge out of a huge hole in the suit.`);
						} else {
							if (slave.preg > slave.pregData.normalBirth / 1.17) {
								r.push(`${slave.slaveName}'s suit is designed to carefully cradle ${his} giant pregnancy, creating a towering dome capped by ${his} popped navel.`);
							} else {
								r.push(`${slave.slaveName}'s giant pregnant belly is allowed to bulge out of a huge hole in the suit.`);
							}
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s giant ${slave.inflationType}-filled belly is allowed to bulge out of a huge hole in the suit.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s giant implant-filled belly is allowed to bulge out of a huge hole in the suit.`);
						} else {
							if (slave.preg > slave.pregData.normalBirth / 1.17) {
								r.push(`${slave.slaveName}'s suit is designed to carefully cradle ${his} giant pregnancy, creating a firm dome capped by ${his} popped navel.`);
							} else {
								r.push(`${slave.slaveName}'s giant pregnant belly is allowed to bulge out of a huge hole in the suit.`);
							}
						}
					} else if (slave.belly >= 30000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s huge ${slave.inflationType}-filled belly is allowed to bulge out of a huge hole in the suit.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s huge implant-filled belly is allowed to bulge out of a huge hole in the suit.`);
						} else {
							if (slave.preg > slave.pregData.normalBirth / 1.17) {
								r.push(`${slave.slaveName}'s suit is designed to carefully cradle ${his} huge pregnant belly, creating a firm dome capped by ${his} popped navel.`);
							} else {
								r.push(`${slave.slaveName}'s huge pregnant belly is allowed to bulge out of a huge hole in the suit.`);
							}
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s massively fat belly is brutally squeezed by the suit, forming a firm latex globe with the slightest bit of give to it.`);
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s huge pregnant belly is allowed to bulge out of a huge hole in the suit.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s huge ${slave.inflationType}-filled belly is allowed to bulge out of a huge hole in the suit.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s huge implant-filled belly is allowed to bulge out of a huge hole in the suit.`);
						} else {
							if (slave.preg > slave.pregData.normalBirth / 1.17) {
								r.push(`${slave.slaveName}'s suit is designed to carefully cradle ${his} huge pregnant belly, creating a firm dome capped by ${his} popped navel.`);
							} else {
								r.push(`${slave.slaveName}'s huge pregnant belly is allowed to bulge out of a huge hole in the suit.`);
							}
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s big pregnant belly is allowed to bulge out of a huge hole in the suit.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s hugely swollen belly is allowed to bulge out of a huge hole in the suit.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s big implant-filled belly is allowed to bulge out of a huge hole in the suit.`);
						} else {
							r.push(`${slave.slaveName}'s big pregnant belly is allowed to bulge out of a huge hole in the suit.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s hugely fat belly is cruelly squeezed by the suit. The tight latex accentuates ${his} fat folds.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s big fat belly is cruelly squeezed by the suit.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s pregnant belly is allowed to bulge out of a hole in the suit.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s jiggling ${slave.inflationType}-filled belly is allowed to bulge out of a hole in the suit.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s implant-filled belly is allowed to bulge out of a hole in the suit.`);
						} else {
							r.push(`${slave.slaveName}'s pregnant belly is allowed to bulge out of a hole in the suit.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s fat belly is cruelly squeezed by the suit.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s small pregnancy is tightly squeezed by the suit creating a noticeable bulge.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s ${slave.inflationType}-swollen belly is tightly squeezed by the suit.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s implant-rounded belly nearly requires ${him} to be switched into a suit with a hole for it to hang out from.`);
						} else {
							r.push(`${slave.slaveName}'s growing pregnancy will soon require ${him} to be switched into a suit with a hole to let ${his} belly out.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s chubby belly is tightly squeezed by the suit.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`There is a clear curve to the tight material beneath ${slave.slaveName}'s navel.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s suit tightly hugs ${his} stomach to showcase ${his} ripped abs.`);
					}
					break;
				case "conservative clothing":
					if (slave.belly >= 1000000) {
						if (isBellyFluidLargest) {
							if (slave.boobs > 24000) {
								r.push(`${slave.slaveName}'s immense breasts keep ${his} oversized sweater far from ${his} unfathomable, hyper-swollen, ${slave.inflationType}-filled belly but do little to hide its imposing mass as it lewdly distends between them.`);
							} else if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s unfathomable, hyper-swollen, ${slave.inflationType}-filled belly adds even more strain to ${his} struggling oversized sweater as it lewdly distends between ${his} tits.`);
							} else if (slave.boobs > 8000) {
								r.push(`${slave.slaveName}'s unfathomable, hyper-swollen, ${slave.inflationType}-filled belly lewdly parts ${his} poorly covered breasts, allowing the bulging mass the room it demands.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s sweater rests atop ${his} unfathomable, hyper-swollen, ${slave.inflationType}-filled belly, allowing the bulging mass the room it demands.`);
							} else {
								r.push(`${slave.slaveName}'s blouse rests atop ${his} unfathomable, hyper-swollen, ${slave.inflationType}-filled belly, allowing the bulging mass the room it demands.`);
							}
							r.push(`${He}'s left ${his} pants unfastened as there is no chance of ${him} managing to reach them.`);
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 24000) {
								r.push(`${slave.slaveName}'s immense breasts keep ${his} oversized sweater far from ${his} unfathomable, hyper-swollen, implant-filled belly but do little to hide its imposing mass as it lewdly distends between them.`);
							} else if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s unfathomable, hyper-swollen, implant-filled belly adds even more strain to ${his} struggling oversized sweater as it lewdly distends between ${his} tits.`);
							} else if (slave.boobs > 8000) {
								r.push(`${slave.slaveName}'s unfathomable, hyper-swollen, implant-filled belly lewdly parts ${his} poorly covered breasts, allowing the bulging mass the room it demands.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s sweater rests atop ${his} unfathomable, hyper-swollen, implant-filled belly, allowing the bulging mass the room it demands.`);
							} else {
								r.push(`${slave.slaveName}'s blouse rests atop ${his} unfathomable, hyper-swollen, implant-filled belly, allowing the bulging mass the room it demands.`);
							}
							r.push(`${He}'s left ${his} pants unfastened as there is no chance of ${him} managing to reach them.`);
						} else {
							if (slave.boobs > 24000) {
								r.push(`${slave.slaveName}'s immense breasts keep ${his} oversized sweater far from ${his} unfathomable, hyper-swollen pregnant belly but do little to hide its imposing mass as it lewdly distends between them.`);
							} else if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s unfathomable, hyper-swollen pregnant belly adds even more strain to ${his} struggling oversized sweater as it lewdly distends between ${his} tits. Every motion ${his} brood makes threatens to displace ${his} breasts.`);
							} else if (slave.boobs > 8000) {
								r.push(`${slave.slaveName}'s unfathomable, hyper-swollen pregnant belly lewdly parts ${his} poorly covered breasts, allowing the bulging mass the room it desperately needs.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s sweater rests atop ${his} unfathomable, hyper-swollen pregnant belly, allowing the bulging mass the room it desperately needs.`);
							} else {
								r.push(`${slave.slaveName}'s blouse rests atop ${his} unfathomable, hyper-swollen pregnant belly, allowing the bulging mass the room it desperately needs.`);
							}
							r.push(`${He}'s left ${his} pants unfastened as ${his} womb has consumed so much space that ${he} has no hope of ever doing up the button and, regardless, even the light touch of the fabric against ${his} belly feels nearly intolerable due to the pressure.`);
						}
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							if (slave.boobs > 24000) {
								r.push(`${slave.slaveName}'s immense breasts keep ${his} oversized sweater far from ${his} monolithic ${slave.inflationType}-filled belly but do little to hide its imposing mass as it lewdly distends between them.`);
							} else if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s monolithic ${slave.inflationType}-filled belly adds even more strain to ${his} struggling oversized sweater as it lewdly distends between ${his} tits.`);
							} else if (slave.boobs > 8000) {
								r.push(`${slave.slaveName}'s monolithic ${slave.inflationType}-filled belly lewdly parts ${his} poorly covered breasts allowing the bulging mass it demands.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s sweater rests atop ${his} monolithic ${slave.inflationType}-filled belly allowing the bulging mass the room it demands.`);
							} else {
								r.push(`${slave.slaveName}'s blouse rests atop ${his} monolithic ${slave.inflationType}-filled belly allowing the bulging mass the room it demands.`);
							}
							r.push(`${He}'s left ${his} pants unfastened as there is no chance of ${him} managing to reach them.`);
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 24000) {
								r.push(`${slave.slaveName}'s immense breasts keep ${his} oversized sweater far from ${his} monolithic implant-filled belly but do little to hide its imposing mass as it lewdly distends between them.`);
							} else if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s monolithic implant-filled belly adds even more strain to ${his} struggling oversized sweater as it lewdly distends between ${his} tits.`);
							} else if (slave.boobs > 8000) {
								r.push(`${slave.slaveName}'s monolithic implant-filled belly lewdly parts ${his} poorly covered breasts allowing the bulging mass it demands.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s sweater rests atop ${his} monolithic implant-filled belly allowing the bulging mass the room it demands.`);
							} else {
								r.push(`${slave.slaveName}'s blouse rests atop ${his} monolithic implant-filled belly allowing the bulging mass the room it demands.`);
							}
							r.push(`${He}'s left ${his} pants unfastened as there is no chance of ${him} managing to reach them.`);
						} else {
							if (slave.boobs > 24000) {
								r.push(`${slave.slaveName}'s immense breasts keep ${his} oversized sweater far from ${his} monolithic pregnant belly but do little to hide its imposing mass as it lewdly distends between them.`);
							} else if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s monolithic pregnant belly adds even more strain to ${his} struggling oversized sweater as it lewdly distends between ${his} tits. Every motion ${his} brood makes threaten to displaces ${his} breasts.`);
							} else if (slave.boobs > 8000) {
								r.push(`${slave.slaveName}'s monolithic pregnant belly lewdly parts ${his} poorly covered breasts allowing the bulging mass the room it desperately seeks.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s sweater rests atop ${his} monolithic pregnant belly allowing the bulging mass the room it desperately seeks.`);
							} else {
								r.push(`${slave.slaveName}'s blouse rests atop ${his} monolithic pregnant belly allowing the bulging mass the room it desperately seeks.`);
							}
							r.push(`${He}'s left ${his} pants unfastened as ${his} womb can't handle the strain nor do ${his} children give ${him} the chance to try.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							if (slave.boobs > 24000) {
								r.push(`${slave.slaveName}'s immense breasts keep ${his} oversized sweater far from ${his} titanic ${slave.inflationType}-filled belly but do little to hide its size as it forces its way between them.`);
							} else if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s titanic ${slave.inflationType}-filled belly adds even more strain to ${his} struggling oversized sweater as it forces its way between ${his} tits.`);
							} else if (slave.boobs > 8000) {
								r.push(`${slave.slaveName}'s titanic ${slave.inflationType}-filled belly parts ${his} poorly covered breasts.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s sweater rests atop ${his} titanic ${slave.inflationType}-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s blouse rests atop ${his} titanic ${slave.inflationType}-filled belly.`);
							}
							r.push(`${He}'s left ${his} pants unfastened as there is no chance of ${him} managing to close them.`);
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 24000) {
								r.push(`${slave.slaveName}'s immense breasts keep ${his} oversized sweater far from ${his} titanic implant-filled belly but do little to hide its size as it forces its way between them.`);
							} else if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s titanic implant-filled belly adds even more strain to ${his} struggling oversized sweater as it forces its way between ${his} tits.`);
							} else if (slave.boobs > 8000) {
								r.push(`${slave.slaveName}'s titanic implant-filled belly parts ${his} poorly covered breasts.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s sweater rests atop ${his} titanic implant-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s blouse rests atop ${his} titanic implant-filled belly.`);
							}
							r.push(`${He}'s left ${his} pants unfastened as there is no chance of ${him} managing to close them.`);
						} else {
							if (slave.boobs > 24000) {
								r.push(`${slave.slaveName}'s immense breasts keep ${his} oversized sweater far from ${his} titanic pregnant belly but do little to hide its size and shape as it forces its way between them.`);
							} else if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s titanic pregnant belly adds even more strain to ${his} struggling oversized sweater as it forces its way between ${his} tits. Every motion ${his} brood makes threaten to displaces ${his} breasts.`);
							} else if (slave.boobs > 8000) {
								r.push(`${slave.slaveName}'s titanic pregnant belly parts ${his} poorly covered breasts allowing the squirming mass to bulge freely.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s sweater rests atop ${his} titanic pregnant belly allowing the squirming mass to bulge freely.`);
							} else {
								r.push(`${slave.slaveName}'s blouse rests atop ${his} titanic pregnant belly allowing the squirming mass to bulge freely.`);
							}
							r.push(`${He}'s left ${his} pants unfastened as ${his} stuffed womb desperately needs the added space.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							if (slave.boobs > 24000) {
								r.push(`${slave.slaveName}'s immense breasts keep ${his} oversized sweater far from ${his} gigantic ${slave.inflationType}-filled belly but do little to hide its size as it forces its way between them.`);
							} else if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s gigantic ${slave.inflationType}-filled belly adds even more strain to ${his} struggling oversized sweater as it forces its way between ${his} tits.`);
							} else if (slave.boobs > 8000) {
								r.push(`${slave.slaveName}'s gigantic ${slave.inflationType}-filled belly parts ${his} poorly covered breasts.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s sweater rests atop ${his} gigantic ${slave.inflationType}-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s blouse rests atop ${his} gigantic ${slave.inflationType}-filled belly.`);
							}
							r.push(`${He}'s left ${his} pants unfastened to give the staggering orb more room.`);
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 24000) {
								r.push(`${slave.slaveName}'s immense breasts keep ${his} oversized sweater far from ${his} gigantic implant-filled belly but do little to hide its size as it forces its way between them.`);
							} else if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s gigantic implant-filled belly adds even more strain to ${his} struggling oversized sweater as it forces its way between ${his} tits.`);
							} else if (slave.boobs > 8000) {
								r.push(`${slave.slaveName}'s gigantic implant-filled belly parts ${his} poorly covered breasts.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s sweater rests atop ${his} gigantic implant-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s blouse rests atop ${his} gigantic implant-filled belly.`);
							}
							r.push(`${He}'s left ${his} pants unfastened to give the staggering orb more room.`);
						} else {
							if (slave.boobs > 24000) {
								r.push(`${slave.slaveName}'s immense breasts keep ${his} oversized sweater far from ${his} gigantic pregnant belly but do little to hide its size as it forces its way between them.`);
							} else if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s gigantic pregnant belly adds even more strain to ${his} struggling oversized sweater as it forces its way between ${his} tits.`);
							} else if (slave.boobs > 8000) {
								r.push(`${slave.slaveName}'s gigantic pregnant belly parts ${his} poorly covered breasts.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s sweater rests atop ${his} gigantic pregnant belly.`);
							} else {
								r.push(`${slave.slaveName}'s blouse rests atop ${his} gigantic pregnant belly.`);
							}
							r.push(`${He}'s left ${his} pants unfastened to give ${his} overfilled womb more room.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							if (slave.boobs > 24000) {
								r.push(`${slave.slaveName}'s immense breasts keep ${his} oversized sweater far from ${his} massive ${slave.inflationType}-filled belly but do little to hide its size.`);
							} else if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s massive ${slave.inflationType}-filled belly adds even more strain to ${his} struggling oversized sweater as it forces its way between ${his} tits.`);
							} else if (slave.boobs > 8000) {
								r.push(`${slave.slaveName}'s massive ${slave.inflationType}-filled belly parts ${his} poorly covered breasts.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s sweater rests atop ${his} massive ${slave.inflationType}-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s blouse rests atop ${his} massive ${slave.inflationType}-filled belly.`);
							}
							r.push(`${He}'s left ${his} pants unfastened to give the hefty globe more room.`);
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 24000) {
								r.push(`${slave.slaveName}'s immense breasts keep ${his} oversized sweater far from ${his} massive implant-filled belly but do little to hide its size.`);
							} else if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s massive implant-filled belly adds even more strain to ${his} struggling oversized sweater as it forces its way between ${his} tits.`);
							} else if (slave.boobs > 8000) {
								r.push(`${slave.slaveName}'s massive implant-filled belly parts ${his} poorly covered breasts.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s sweater rests atop ${his} massive implant-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s blouse rests atop ${his} massive implant-filled belly.`);
							}
							r.push(`${He}'s left ${his} pants unfastened to give the hefty globe more room.`);
						} else {
							if (slave.boobs > 24000) {
								r.push(`${slave.slaveName}'s immense breasts keep ${his} oversized sweater far from ${his} massive pregnant belly but do little to hide its size.`);
							} else if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s massive pregnant belly adds even more strain to ${his} struggling oversized sweater as it forces its way between ${his} tits.`);
							} else if (slave.boobs > 8000) {
								r.push(`${slave.slaveName}'s massive pregnant belly parts ${his} poorly covered breasts.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s sweater rests atop ${his} massive pregnant belly.`);
							} else {
								r.push(`${slave.slaveName}'s blouse rests atop ${his} massive pregnant belly.`);
							}
							r.push(`${He}'s left ${his} pants unfastened to give the heavy dome more room.`);
						}
					} else if (slave.belly >= 150000) {
						if (isBellyFluidLargest) {
							if (slave.boobs > 24000) {
								r.push(`${slave.slaveName}'s immense breasts keep ${his} oversized sweater far from ${his} giant ${slave.inflationType}-filled belly allowing the firm dome to part ${his} tits.`);
							} else if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s giant ${slave.inflationType}-filled belly parts ${his} massive tits and adds even more strain to ${his} struggling oversized sweater.`);
							} else if (slave.boobs > 8000) {
								r.push(`${slave.slaveName}'s oversized breasts keep ${his} sweater far from ${his} giant ${slave.inflationType}-filled belly.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s sweater rests atop ${his} giant ${slave.inflationType}-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s blouse rests atop ${his} giant ${slave.inflationType}-filled belly.`);
							}
							r.push(`${He}'s left ${his} pants unfastened to give the overstretched dome more room.`);
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 24000) {
								r.push(`${slave.slaveName}'s immense breasts keep ${his} oversized sweater far from ${his} giant implant-filled belly allowing the firm dome to part ${his} tits.`);
							} else if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s giant implant-filled belly parts ${his} massive tits and adds even more strain to ${his} struggling oversized sweater.`);
							} else if (slave.boobs > 8000) {
								r.push(`${slave.slaveName}'s oversized breasts keep ${his} sweater far from ${his} giant implant-filled belly.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s sweater rests atop ${his} giant implant-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s blouse rests atop ${his} giant implant-filled belly.`);
							}
							r.push(`${He}'s left ${his} pants unfastened to give the overstretched dome more room.`);
						} else {
							if (slave.boobs > 24000) {
								r.push(`${slave.slaveName}'s immense breasts keep ${his} oversized sweater far from ${his} giant pregnant belly allowing the firm dome to part ${his} tits.`);
							} else if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s giant pregnant belly parts ${his} massive tits and adds even more strain to ${his} struggling oversized sweater.`);
							} else if (slave.boobs > 8000) {
								r.push(`${slave.slaveName}'s oversized breasts keep ${his} sweater far from ${his} giant pregnant belly.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s sweater rests atop ${his} giant pregnant belly.`);
							} else {
								r.push(`${slave.slaveName}'s blouse rests atop ${his} giant pregnant belly.`);
							}
							r.push(`${He}'s left ${his} pants unfastened to give the taut dome more room.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							if (slave.boobs > 24000) {
								r.push(`${slave.slaveName}'s immense breasts keep ${his} oversized sweater far from ${his} giant ${slave.inflationType}-filled belly allowing the rounded dome to part ${his} tits.`);
							} else if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s giant ${slave.inflationType}-filled belly parts ${his} massive tits and adds even more strain to ${his} struggling oversized sweater.`);
							} else if (slave.boobs > 8000) {
								r.push(`${slave.slaveName}'s oversized breasts keep ${his} sweater far from ${his} giant ${slave.inflationType}-filled belly.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s sweater rests atop ${his} giant ${slave.inflationType}-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s blouse rests atop ${his} giant ${slave.inflationType}-filled belly.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 24000) {
								r.push(`${slave.slaveName}'s immense breasts keep ${his} oversized sweater far from ${his} giant implant-filled belly allowing the rounded dome to part ${his} tits.`);
							} else if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s giant implant-filled belly parts ${his} massive tits and adds even more strain to ${his} struggling oversized sweater.`);
							} else if (slave.boobs > 8000) {
								r.push(`${slave.slaveName}'s oversized breasts keep ${his} sweater far from ${his} giant implant-filled belly.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s sweater rests atop ${his} giant implant-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s blouse rests atop ${his} giant implant-filled belly.`);
							}
						} else {
							if (slave.boobs > 24000) {
								r.push(`${slave.slaveName}'s immense breasts keep ${his} oversized sweater far from ${his} giant pregnant belly allowing the firm dome to part ${his} tits.`);
							} else if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s giant pregnant belly parts ${his} massive tits and adds even more strain to ${his} struggling oversized sweater.`);
							} else if (slave.boobs > 8000) {
								r.push(`${slave.slaveName}'s oversized breasts keep ${his} sweater far from ${his} giant pregnant belly.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s sweater rests atop ${his} giant pregnant belly.`);
							} else {
								r.push(`${slave.slaveName}'s blouse rests atop ${his} giant pregnant belly.`);
							}
							r.push(`${He}'s left ${his} pants unfastened to give the firm dome more room.`);
						}
					} else if (slave.belly >= 45000) {
						if (isBellyFluidLargest) {
							if (slave.boobs > 24000) {
								r.push(`${slave.slaveName}'s immense breasts keep ${his} oversized sweater from covering ${his} huge ${slave.inflationType}-filled belly, though they do a fine job of hiding it themselves.`);
							} else if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s huge ${slave.inflationType}-filled belly is barely hidden by ${his} massive tits and oversized sweater.`);
							} else if (slave.boobs > 8000) {
								r.push(`${slave.slaveName}'s oversized breasts keep ${his} sweater far from ${his} huge ${slave.inflationType}-filled belly.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s sweater can no longer contain ${his} ${slave.inflationType}-filled pregnant belly and merely rests atop it.`);
							} else {
								r.push(`${slave.slaveName}'s blouse can no longer contain ${his} ${slave.inflationType}-filled pregnant belly and merely rests atop it.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 24000) {
								r.push(`${slave.slaveName}'s immense breasts keep ${his} oversized sweater from covering ${his} huge implant-filled belly, though they do a fine job of hiding it themselves.`);
							} else if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s huge implant-filled belly is barely hidden by ${his} massive tits and oversized sweater.`);
							} else if (slave.boobs > 8000) {
								r.push(`${slave.slaveName}'s oversized breasts keep ${his} sweater far from ${his} huge implant-filled belly.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s sweater can no longer contain ${his} implant-filled pregnant belly and merely rests atop it.`);
							} else {
								r.push(`${slave.slaveName}'s blouse can no longer contain ${his} implant-filled pregnant belly and merely rests atop it.`);
							}
						} else {
							if (slave.boobs > 24000) {
								r.push(`${slave.slaveName}'s immense breasts keep ${his} oversized sweater from covering ${his} huge pregnant belly, though they do a fine job of hiding it themselves.`);
							} else if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s huge pregnant belly is barely hidden by ${his} massive tits and oversized sweater.`);
							} else if (slave.boobs > 8000) {
								r.push(`${slave.slaveName}'s oversized breasts keep ${his} sweater far from ${his} huge pregnant belly.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s sweater can no longer contain ${his} huge pregnant belly and merely rests atop it.`);
							} else {
								r.push(`${slave.slaveName}'s blouse can no longer contain ${his} huge pregnant belly and merely rests atop it.`);
							}
						}
					} else if (slave.weight > 190) {
						if (slave.boobs > 24000) {
							r.push(`${slave.slaveName}'s immense breasts keep ${his} oversized sweater from covering ${his} massively fat belly; even then, they can barely conceal it themselves.`);
						} else if (slave.boobs > 12000) {
							r.push(`${slave.slaveName}'s massively fat belly adds even more strain to ${his} struggling oversized sweater.`);
						} else if (slave.boobs > 8000) {
							r.push(`${slave.slaveName}'s oversized breasts ${his} massively fat belly hang free.`);
						} else if (slave.boobs > 4000) {
							r.push(`${slave.slaveName}'s sweater is pulled tight over the top half of ${his} massively fat belly. The bottom half is allowed to jiggle freely.`);
						} else {
							r.push(`${slave.slaveName}'s blouse is pulled taut just trying to cover the top of ${his} massively fat belly; the rest is allowed to jiggle freely.`);
						}
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							if (slave.boobs > 24000) {
								r.push(`${slave.slaveName}'s immense breasts keep ${his} oversized sweater from covering ${his} huge pregnant belly, though they do a fine job of hiding it themselves.`);
							} else if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s huge pregnant belly is barely hidden by ${his} massive tits and oversized sweater.`);
							} else if (slave.boobs > 8000) {
								r.push(`${slave.slaveName}'s oversized breasts keep ${his} sweater far from ${his} huge pregnant belly.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s sweater is pulled taut by ${his} huge pregnant belly; it barely reaches ${his} popped navel.`);
							} else {
								r.push(`${slave.slaveName}'s blouse is pulled taut by ${his} huge pregnant belly; it barely reaches ${his} popped navel.`);
							}
						} else if (isBellyFluidLargest) {
							if (slave.boobs > 24000) {
								r.push(`${slave.slaveName}'s immense breasts keep ${his} oversized sweater from covering ${his} huge ${slave.inflationType}-filled belly, though they do a fine job of hiding it themselves.`);
							} else if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s huge ${slave.inflationType}-filled belly is barely hidden by ${his} massive tits and oversized sweater.`);
							} else if (slave.boobs > 8000) {
								r.push(`${slave.slaveName}'s oversized breasts keep ${his} sweater far from ${his} huge ${slave.inflationType}-filled belly.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s sweater is pulled taut by ${his} huge ${slave.inflationType}-filled belly; it barely reaches ${his} popped navel.`);
							} else {
								r.push(`${slave.slaveName}'s blouse is pulled taut by ${his} huge ${slave.inflationType}-filled belly; it barely reaches ${his} popped navel.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 24000) {
								r.push(`${slave.slaveName}'s immense breasts keep ${his} oversized sweater from covering ${his} huge implant-filled belly, though they do a fine job of hiding it themselves.`);
							} else if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s huge implant-filled belly is barely hidden by ${his} massive tits and oversized sweater.`);
							} else if (slave.boobs > 8000) {
								r.push(`${slave.slaveName}'s oversized breasts keep ${his} sweater far from ${his} huge implant-filled belly.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s sweater is pulled taut by ${his} huge implant-filled belly; it barely reaches ${his} popped navel.`);
							} else {
								r.push(`${slave.slaveName}'s blouse is pulled taut by ${his} huge implant-filled belly; it barely reaches ${his} popped navel.`);
							}
						} else {
							if (slave.boobs > 24000) {
								r.push(`${slave.slaveName}'s immense breasts keep ${his} oversized sweater from covering ${his} huge pregnant belly, though they do a fine job of hiding it themselves.`);
							} else if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s huge pregnant belly is barely hidden by ${his} massive tits and oversized sweater.`);
							} else if (slave.boobs > 8000) {
								r.push(`${slave.slaveName}'s oversized breasts keep ${his} sweater far from ${his} huge pregnant belly.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s sweater is pulled taut by ${his} huge pregnant belly; it barely reaches ${his} popped navel.`);
							} else {
								r.push(`${slave.slaveName}'s blouse is pulled taut by ${his} huge pregnant belly; it barely reaches ${his} popped navel.`);
							}
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							if (slave.boobs > 24000) {
								r.push(`${slave.slaveName}'s immense breasts keep ${his} oversized sweater from covering ${his} big pregnant belly, though they do a fine job of hiding it themselves.`);
							} else if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s big pregnant belly is hidden by ${his} massive tits and oversized sweater.`);
							} else if (slave.boobs > 8000) {
								r.push(`${slave.slaveName}'s oversized breasts keep ${his} sweater far from ${his} big pregnant belly.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s sweater is pulled taut by ${his} big pregnant belly, the bottom of which can be seen peeking out from underneath. ${His} popped navel forms a small tent in the material.`);
							} else {
								r.push(`${slave.slaveName}'s blouse is pulled taut by ${his} big pregnant belly, the bottom of which can be seen peeking out from underneath. ${His} popped navel forms a small tent in ${his} shirt.`);
							}
						} else if (isBellyFluidLargest) {
							if (slave.boobs > 24000) {
								r.push(`${slave.slaveName}'s immense breasts keep ${his} oversized sweater from covering ${his} hugely swollen belly, though they do a fine job of hiding it themselves.`);
							} else if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s hugely swollen belly is hidden by ${his} massive tits and oversized sweater.`);
							} else if (slave.boobs > 8000) {
								r.push(`${slave.slaveName}'s oversized breasts keep ${his} sweater far from ${his} hugely swollen belly.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s sweater is pulled taut by ${his} hugely swollen belly, the bottom of which can be seen peeking out from underneath. ${His} popped navel forms a small tent in the material.`);
							} else {
								r.push(`${slave.slaveName}'s blouse is pulled taut by ${his} hugely swollen belly, the bottom of which can be seen peeking out from underneath. ${His} popped navel forms a small tent in ${his} shirt.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 24000) {
								r.push(`${slave.slaveName}'s immense breasts keep ${his} oversized sweater from covering ${his} big implant-filled belly, though they do a fine job of hiding it themselves.`);
							} else if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s big implant-filled belly is hidden by ${his} massive tits and oversized sweater.`);
							} else if (slave.boobs > 8000) {
								r.push(`${slave.slaveName}'s oversized breasts keep ${his} sweater far from ${his} big implant-filled belly.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s sweater is pulled taut by ${his} big implant-filled belly, the bottom of which can be seen peeking out from underneath. ${His} popped navel forms a small tent in the material.`);
							} else {
								r.push(`${slave.slaveName}'s blouse is pulled taut by ${his} big implant-filled belly, the bottom of which can be seen peeking out from underneath. ${His} popped navel forms a small tent in ${his} shirt.`);
							}
						} else {
							if (slave.boobs > 24000) {
								r.push(`${slave.slaveName}'s immense breasts keep ${his} oversized sweater from covering ${his} big pregnant belly, though they do a fine job of hiding it themselves.`);
							} else if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s big pregnant belly is hidden by ${his} massive tits and oversized sweater.`);
							} else if (slave.boobs > 8000) {
								r.push(`${slave.slaveName}'s oversized breasts keep ${his} sweater far from ${his} big pregnant belly.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s sweater is pulled taut by ${his} big pregnant belly, the bottom of which can be seen peeking out from underneath. ${His} popped navel forms a small tent in the material.`);
							} else {
								r.push(`${slave.slaveName}'s blouse is pulled taut by ${his} big pregnant belly, the bottom of which can be seen peeking out from underneath. ${His} popped navel forms a small tent in ${his} shirt.`);
							}
						}
					} else if (slave.weight > 160) {
						if (slave.boobs > 24000) {
							r.push(`${slave.slaveName}'s immense breasts keep ${his} oversized sweater from covering ${his} hugely fat belly, though they do a fine job of hiding it themselves.`);
						} else if (slave.boobs > 12000) {
							r.push(`${slave.slaveName}'s hugely fat belly is barely hidden by ${his} massive tits and oversized sweater.`);
						} else if (slave.boobs > 8000) {
							r.push(`${slave.slaveName}'s oversized breasts ${his} hugely fat belly hang free.`);
						} else if (slave.boobs > 4000) {
							r.push(`${slave.slaveName}'s sweater is pulled tight over ${his} hugely fat belly, the bottom of which hangs out from under it.`);
						} else {
							r.push(`${slave.slaveName}'s blouse is pulled tight over the top half of ${his} hugely fat belly; the rest is allowed to jiggle freely.`);
						}
					} else if (slave.weight > 130) {
						if (slave.boobs > 24000) {
							r.push(`${slave.slaveName}'s immense breasts keep ${his} oversized sweater from covering ${his} big fat belly, though they do a fine job of hiding it themselves.`);
						} else if (slave.boobs > 12000) {
							r.push(`${slave.slaveName}'s fat belly is hidden by ${his} massive tits and oversized sweater.`);
						} else if (slave.boobs > 8000) {
							r.push(`${slave.slaveName}'s oversized breasts ${his} big fat belly hang free.`);
						} else if (slave.boobs > 4000) {
							r.push(`${slave.slaveName}'s sweater is pulled tight over ${his} big fat belly, the bottom of which hangs out and jiggles freely from under it.`);
						} else {
							r.push(`${slave.slaveName}'s blouse is pulled tight over most of ${his} big fat belly; the rest is allowed to jiggle freely.`);
						}
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							if (slave.boobs > 24000) {
								r.push(`${slave.slaveName}'s immense breasts keep ${his} oversized sweater from covering ${his} pregnant belly, though they do a fine job of hiding it themselves.`);
							} else if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s pregnant belly is hidden by ${his} massive tits and oversized sweater.`);
							} else if (slave.boobs > 8000) {
								r.push(`${slave.slaveName}'s oversized breasts keep ${his} sweater far from ${his} pregnant belly.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s sweater is pulled taut by ${his} pregnant belly. ${His} popped navel forms a small tent in material.`);
							} else {
								r.push(`${slave.slaveName}'s blouse is pulled taut by ${his} pregnant belly. ${His} popped navel forms a small tent in ${his} shirt.`);
							}
						} else if (isBellyFluidLargest) {
							if (slave.boobs > 24000) {
								r.push(`${slave.slaveName}'s immense breasts keep ${his} oversized sweater from covering ${his} jiggling ${slave.inflationType}-filled belly, though they do a fine job of hiding it themselves.`);
							} else if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s jiggling ${slave.inflationType}-filled belly is hidden by ${his} massive tits and oversized sweater.`);
							} else if (slave.boobs > 8000) {
								r.push(`${slave.slaveName}'s oversized breasts keep ${his} sweater far from ${his} jiggling ${slave.inflationType}-filled belly.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s sweater is pulled taut by ${his} jiggling ${slave.inflationType}-filled belly. ${His} popped navel forms a small tent in material.`);
							} else {
								r.push(`${slave.slaveName}'s blouse is pulled taut by ${his} jiggling ${slave.inflationType}-filled belly. ${His} popped navel forms a small tent in ${his} shirt.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 24000) {
								r.push(`${slave.slaveName}'s immense breasts keep ${his} oversized sweater from covering ${his} implant-filled belly, though they do a fine job of hiding it themselves.`);
							} else if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s implant-filled belly is hidden by ${his} massive tits and oversized sweater.`);
							} else if (slave.boobs > 8000) {
								r.push(`${slave.slaveName}'s oversized breasts keep ${his} sweater far from ${his} implant-filled belly.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s sweater is pulled taut by ${his} implant-filled belly. ${His} popped navel forms a small tent in material.`);
							} else {
								r.push(`${slave.slaveName}'s blouse is pulled taut by ${his} implant-filled belly. ${His} popped navel forms a small tent in ${his} shirt.`);
							}
						} else {
							if (slave.boobs > 24000) {
								r.push(`${slave.slaveName}'s immense breasts keep ${his} oversized sweater from covering ${his} pregnant belly, though they do a fine job of hiding it themselves.`);
							} else if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s pregnant belly is hidden by ${his} massive tits and oversized sweater.`);
							} else if (slave.boobs > 8000) {
								r.push(`${slave.slaveName}'s oversized breasts keep ${his} sweater far from ${his} pregnant belly.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s sweater is pulled taut by ${his} pregnant belly. ${His} popped navel forms a small tent in material.`);
							} else {
								r.push(`${slave.slaveName}'s blouse is pulled taut by ${his} pregnant belly. ${His} popped navel forms a small tent in ${his} shirt.`);
							}
						}
					} else if (slave.weight > 95) {
						if (slave.boobs > 24000) {
							r.push(`${slave.slaveName}'s immense breasts keep ${his} oversized sweater from covering ${his} fat belly, though they do a fine job of hiding it themselves.`);
						} else if (slave.boobs > 12000) {
							r.push(`${slave.slaveName}'s fat belly is hidden by ${his} massive tits and oversized sweater.`);
						} else if (slave.boobs > 8000) {
							r.push(`${slave.slaveName}'s oversized breasts ${his} fat belly hang free.`);
						} else if (slave.boobs > 4000) {
							r.push(`${slave.slaveName}'s sweater is pulled tight over ${his} fat belly, the bottom of which peeks out from under it.`);
						} else {
							r.push(`${slave.slaveName}'s blouse is pulled tight over ${his} fat belly, the bottom of which peeks out from under it.`);
						}
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							if (slave.boobs > 24000) {
								r.push(`${slave.slaveName}'s immense breasts keep ${his} oversized sweater from covering ${his} small pregnant belly, though they do a fine job of hiding it themselves.`);
							} else if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s small pregnant belly is hidden by ${his} massive tits and oversized sweater.`);
							} else if (slave.boobs > 8000) {
								r.push(`${slave.slaveName}'s oversized breasts keep ${his} sweater far from ${his} small pregnant belly.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s sweater bulges with ${his} small pregnant belly.`);
							} else {
								r.push(`${slave.slaveName}'s blouse bulges with ${his} small pregnant belly.`);
							}
						} else if (isBellyFluidLargest) {
							if (slave.boobs > 24000) {
								r.push(`${slave.slaveName}'s immense breasts keep ${his} oversized sweater from covering ${his} ${slave.inflationType}-swollen belly, though they do a fine job of hiding it themselves.`);
							} else if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s ${slave.inflationType}-swollen belly is hidden by ${his} massive tits and oversized sweater.`);
							} else if (slave.boobs > 8000) {
								r.push(`${slave.slaveName}'s oversized breasts keep ${his} sweater far from ${his} ${slave.inflationType}-swollen belly.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s sweater bulges with ${his} ${slave.inflationType}-swollen belly.`);
							} else {
								r.push(`${slave.slaveName}'s blouse bulges with ${his} ${slave.inflationType}-swollen belly.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 24000) {
								r.push(`${slave.slaveName}'s immense breasts keep ${his} oversized sweater from covering ${his} implant-rounded belly, though they do a fine job of hiding it themselves.`);
							} else if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s implant-rounded belly is hidden by ${his} massive tits and oversized sweater.`);
							} else if (slave.boobs > 8000) {
								r.push(`${slave.slaveName}'s oversized breasts keep ${his} sweater far from ${his} implant-rounded belly.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s sweater bulges with ${his} implant-rounded belly.`);
							} else {
								r.push(`${slave.slaveName}'s blouse bulges with ${his} implant-rounded belly.`);
							}
						} else {
							if (slave.boobs > 24000) {
								r.push(`${slave.slaveName}'s immense breasts keep ${his} oversized sweater from covering ${his} growing belly, though they do a fine job of hiding it themselves.`);
							} else if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s growing belly is hidden by ${his} massive tits and oversized sweater.`);
							} else if (slave.boobs > 8000) {
								r.push(`${slave.slaveName}'s oversized breasts keep ${his} sweater far from ${his} growing belly.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s sweater bulges with ${his} growing belly.`);
							} else {
								r.push(`${slave.slaveName}'s blouse bulges with ${his} growing belly.`);
							}
						}
					} else if (slave.weight > 30) {
						if (slave.boobs > 24000) {
							r.push(`${slave.slaveName}'s immense breasts keep ${his} oversized sweater from covering ${his} chubby belly, though they do a fine job of hiding it themselves.`);
						} else if (slave.boobs > 12000) {
							r.push(`${slave.slaveName}'s chubby belly is hidden by ${his} massive tits and oversized sweater.`);
						} else if (slave.boobs > 8000) {
							r.push(`${slave.slaveName}'s oversized breasts keep ${his} sweater far from ${his} chubby belly.`);
						} else if (slave.boobs > 4000) {
							r.push(`${slave.slaveName}'s sweater bulges with ${his} chubby belly.`);
						} else {
							r.push(`${slave.slaveName}'s blouse bulges with ${his} chubby belly.`);
						}
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s pants are fastened beneath the slight swell of ${his} lower belly.`);
					} else if (slave.muscles > 30) {
						if (slave.boobs > 24000) {
							r.push(`${slave.slaveName}'s immense breasts keep ${his} oversized sweater from covering ${his} ripped abs, though they do an unfortunate job of hiding them themselves.`);
						} else if (slave.boobs > 12000) {
							r.push(`${slave.slaveName}'s ripped abs are hidden by ${his} massive tits and oversized sweater.`);
						} else if (slave.boobs > 8000) {
							r.push(`${slave.slaveName}'s oversized breasts keep ${his} sweater busy showing off ${his} ripped abs.`);
						} else if (slave.boobs > 4000) {
							r.push(`${slave.slaveName}'s sweater completely hides ${his} ripped abs.`);
						} else {
							r.push(`${slave.slaveName}'s ripped abs can almost be made out through ${his} blouse.`);
						}
					}
					break;
				case "chains":
					if (slave.belly >= 1000000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s unfathomable, hyper-swollen, ${slave.inflationType}-filled belly is wrapped with tight chains. Despite how tightly they're pulled together, they fail to sink into the firm globe of ${his} belly at all, shifting over it and agitating ${his} flesh with each of ${his} movements.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s unfathomable, hyper-swollen, implant-filled belly is wrapped with tight chains. Despite how tightly they're pulled together, they fail to sink into the firm globe of ${his} belly at all, shifting over it and agitating ${his} flesh with each of ${his} movements.`);
						} else {
							r.push(`${slave.slaveName}'s unfathomable, hyper-swollen pregnant belly is wrapped with tight chains. It bulges so extremely that the outlines of entire infants can be seen pressed up to either side of the chains, sometimes overlapping them so that flesh rubs up against flesh; every motion inside ${him} is excruciating.`);
						}
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s monolithic ${slave.inflationType}-filled belly is wrapped with tight chains. They can barely sink into the firm globe, only agitating ${his} flesh more.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s monolithic implant-filled belly is wrapped with tight chains. They can barely sink into the firm globe, only agitating ${his} flesh more.`);
						} else {
							r.push(`${slave.slaveName}'s monolithic pregnant belly is wrapped with tight chains. It bulges agonizingly as they run between the forms of ${his} unborn children; every motion inside ${him} is excruciating.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s titanic ${slave.inflationType}-filled belly is wrapped with tight chains. It bulges agonizingly little as they can barely dig into the overfilled globe.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s titanic implant-filled belly is wrapped with tight chains. It bulges agonizingly little as they can barely dig into the overfilled globe.`);
						} else {
							r.push(`${slave.slaveName}'s titanic pregnant belly is wrapped with tight chains. It bulges agonizingly as they run between the forms of ${his} unborn children; every motion inside ${him} is excruciating.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s gigantic ${slave.inflationType}-filled belly is wrapped with tight chains. It bulges agonizingly as they dig deep as they can into the taut flesh.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s gigantic implant-filled belly is wrapped with tight chains. It bulges agonizingly as they dig deep as they can into the taut flesh.`);
						} else {
							r.push(`${slave.slaveName}'s gigantic pregnant belly is wrapped with tight chains. It bulges agonizingly as they run between the forms of ${his} unborn children; every motion inside ${him} is excruciating.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s massive ${slave.inflationType}-filled belly is wrapped with tight chains. It bulges agonizingly as they dig deep into the taut flesh.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s massive implant-filled belly is wrapped with tight chains. It bulges agonizingly as they dig deep into the taut flesh.`);
						} else {
							r.push(`${slave.slaveName}'s massive pregnant belly is wrapped with tight chains. It bulges agonizingly as they dig deep into the taut flesh and every motion inside ${him} causes more suffering.`);
						}
					} else if (slave.belly >= 150000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s giant ${slave.inflationType}-filled belly is wrapped with tight chains. It bulges agonizingly as they dig deep into the taut flesh.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s giant implant-filled belly is wrapped with tight chains. It bulges agonizingly as they dig deep into the taut flesh.`);
						} else {
							r.push(`${slave.slaveName}'s giant pregnant belly is wrapped with tight chains. It bulges agonizingly as they dig deep into the taut flesh and every motion inside ${him} causes more suffering.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s giant ${slave.inflationType}-filled belly is wrapped with tight chains. It bulges angrily as they dig deep into the taut flesh.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s giant implant-filled belly is wrapped with tight chains. It bulges angrily as they dig deep into the taut flesh.`);
						} else {
							r.push(`${slave.slaveName}'s giant pregnant belly is wrapped with tight chains. It bulges painfully as they dig deep into the taut flesh.`);
						}
					} else if (slave.belly >= 60000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s huge ${slave.inflationType}-filled belly is wrapped with agonizingly tight chains. It bulges angrily as they dig deep into ${his} sore skin.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s huge implant-filled belly is wrapped with agonizingly tight chains. It bulges angrily as they dig deep into ${his} sore skin.`);
						} else {
							r.push(`${slave.slaveName}'s huge pregnant belly is wrapped with agonizingly tight chains. It bulges angrily as they dig deep into ${his} sore skin and causes ${him} duress.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s chains are practically buried in ${his} massively fat belly. The only hint of their presence are the deep ravines of flesh formed around them.`);
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s huge pregnant belly is tightly wrapped with chains.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s huge ${slave.inflationType}-filled belly is tightly wrapped with chains, causing it to bulge angrily as well as making ${him} squirm in discomfort.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s huge implant-filled belly is tightly wrapped with chains, causing it to bulge angrily as well as making ${him} squirm in discomfort.`);
						} else {
							r.push(`${slave.slaveName}'s huge pregnant belly is tightly wrapped with chains, causing it to bulge angrily as well as making ${him} squirm in discomfort.`);
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s big pregnant belly is tightly wrapped with chains.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s hugely swollen belly is tightly wrapped with chains, causing it to bulge angrily.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s big implant-filled belly is tightly wrapped with chains, causing it to bulge angrily.`);
						} else {
							r.push(`${slave.slaveName}'s big pregnant belly is tightly wrapped with chains, causing it to bulge angrily.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s chains sink deep into ${his} hugely fat belly. They can barely be seen from the front; ${his} sides completely envelope them.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s chains sink deep into ${his} big fat belly; most end up swallowed by ${his} folds.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s pregnant belly is tightly wrapped with chains.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s jiggling ${slave.inflationType}-filled belly is tightly wrapped with chains, causing it to bulge angrily.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s implant-filled belly is tightly wrapped with chains, causing it to bulge angrily.`);
						} else {
							r.push(`${slave.slaveName}'s pregnant belly is tightly wrapped with chains, causing it to bulge angrily.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s chains sink deep into ${his} fat belly, several even disappearing beneath ${his} folds.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s small pregnant belly is tightly wrapped with chains.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s ${slave.inflationType}-swollen belly is tightly wrapped with chains.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s implant-rounded belly is tightly wrapped with chains.`);
						} else {
							r.push(`${slave.slaveName}'s growing belly is tightly wrapped with chains.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s chains sink into ${his} chubby belly, making noticeable folds in ${his} sides.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s tight chains make the small bulge to ${his} lower belly obvious.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s tight chains highlight ${his} ripped abs.`);
					}
					break;
				case "Western clothing":
					if (slave.belly >= 1000000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s flannel shirt can't close over ${his} unfathomable, hyper-swollen, ${slave.inflationType}-filled belly, so ${he} has left the bottom buttons open, giving ${his} stomach room to massively jut out from ${his} body. ${He} has become so wide the remaining buttons no longer hold together at all, and ${he} now has to hold the outfit together by wrapping a large strip of fabric around ${his} outfit and over the line between ${his} belly and slowly distorting ribcage. In addition, ${he}'s left ${his} chaps unfastened to give ${his} overfilled middle more space.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s flannel shirt can't close over ${his} unfathomable, hyper-swollen, implant-filled belly, so ${he} has left the bottom buttons open, giving ${his} stomach room to massively jut out from ${his} body. ${He} has become so wide the remaining buttons no longer hold together at all, and ${he} now has to hold the outfit together by wrapping a large strip of fabric around ${his} outfit and over the line between ${his} belly and slowly distorting ribcage. In addition, ${he}'s left ${his} chaps unfastened to give ${his} overfilled middle more space.`);
						} else {
							r.push(`${slave.slaveName}'s flannel shirt can't close over ${his} unfathomable, hyper-swollen pregnant belly, so ${he} has left the bottom buttons open, giving ${his} stomach room to massively jut out from ${his} body. ${He} has become so wide the remaining buttons no longer hold together at all, and ${he} now has to hold the outfit together by wrapping a large strip of fabric around ${his} outfit and over the line between ${his} belly and slowly distorting ribcage. In addition, ${he}'s left ${his} chaps unfastened to give ${his} overfilled womb more space.`);
						}
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s flannel shirt can't close over ${his} monolithic ${slave.inflationType}-filled belly, so ${he} has left the bottom buttons open giving ${his} stomach room to massively jut out from ${his} body. ${He} has become so wide the remaining buttons strain to hold together. In addition, ${he}'s left ${his} chaps unfastened to give ${his} overfilled middle more space.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s flannel shirt can't close over ${his} monolithic implant-filled belly, so ${he} has left the bottom buttons open giving ${his} stomach room to massively jut out from ${his} body. ${He} has become so wide the remaining buttons strain to hold together. In addition, ${he}'s left ${his} chaps unfastened to give ${his} overfilled middle more space.`);
						} else {
							r.push(`${slave.slaveName}'s flannel shirt can't close over ${his} monolithic pregnant belly, so ${he} has left the bottom buttons open giving ${his} stomach room to massively jut out from ${his} body. ${He} has become so wide the remaining buttons strain to hold together. In addition, ${he}'s left ${his} chaps unfastened to give ${his} overfilled womb more space.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s flannel shirt can't close over ${his} titanic ${slave.inflationType}-filled belly, so ${he} has left the bottom buttons open giving ${his} stomach room to massively jut out from ${his} body. The remaining buttons struggle to contain ${his} increasing girth. In addition, ${he}'s left ${his} chaps unfastened to give ${his} overfilled middle more space.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s flannel shirt can't close over ${his} titanic implant-filled belly, so ${he} has left the bottom buttons open giving ${his} stomach room to massively jut out from ${his} body. The remaining buttons struggle to contain ${his} increasing girth. In addition, ${he}'s left ${his} chaps unfastened to give ${his} overfilled middle more space.`);
						} else {
							r.push(`${slave.slaveName}'s flannel shirt can't close over ${his} titanic pregnant belly, so ${he} has left the bottom buttons open giving ${his} stomach room to massively jut out from ${his} body. The remaining buttons struggle to contain ${his} increasing girth. In addition, ${he}'s left ${his} chaps unfastened to give ${his} overfilled womb more space.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s flannel shirt can't close over ${his} gigantic ${slave.inflationType}-filled belly, so ${he} has left the bottom buttons open giving ${his} stomach room to massively jut out from ${his} body. The remaining buttons struggle to contain ${his} increasing girth. In addition, ${he}'s left ${his} chaps unfastened to give ${his} overfilled middle more space.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s flannel shirt can't close over ${his} gigantic implant-filled belly, so ${he} has left the bottom buttons open giving ${his} stomach room to massively jut out from ${his} body. The remaining buttons struggle to contain ${his} increasing girth. In addition, ${he}'s left ${his} chaps unfastened to give ${his} overfilled middle more space.`);
						} else {
							r.push(`${slave.slaveName}'s flannel shirt can't close over ${his} gigantic pregnant belly, so ${he} has left the bottom buttons open giving ${his} stomach room to massively jut out from ${his} body. The remaining buttons struggle to contain ${his} increasing girth. In addition, ${he}'s left ${his} chaps unfastened to give ${his} overfilled womb more space.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s flannel shirt can't close over ${his} massive ${slave.inflationType}-filled belly, so ${he} has left the bottom buttons open giving ${his} stomach room to massively jut out from ${his} body. The remaining buttons struggle to contain ${his} increasing girth. In addition, ${he}'s left ${his} chaps unfastened to give ${his} overfilled middle more space.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s flannel shirt can't close over ${his} massive implant-filled belly, so ${he} has left the bottom buttons open giving ${his} stomach room to massively jut out from ${his} body. The remaining buttons struggle to contain ${his} increasing girth. In addition, ${he}'s left ${his} chaps unfastened to give ${his} overfilled middle more space.`);
						} else {
							r.push(`${slave.slaveName}'s flannel shirt can't close over ${his} massive pregnant belly, so ${he} has left the bottom buttons open giving ${his} stomach room to massively jut out from ${his} body. The remaining buttons struggle to contain ${his} increasing girth. In addition, ${he}'s left ${his} chaps unfastened to give ${his} overfilled womb more space.`);
						}
					} else if (slave.belly >= 150000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s flannel shirt can't close over ${his} giant ${slave.inflationType}-filled belly, so ${he} has left the bottom buttons open giving ${his} stomach room to massively jut out from ${his} body. In addition, ${he}'s left ${his} chaps unfastened to give ${his} overfilled middle more space.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s flannel shirt can't close over ${his} giant implant-filled belly, so ${he} has left the bottom buttons open giving ${his} stomach room to massively jut out from ${his} body. In addition, ${he}'s left ${his} chaps unfastened to give ${his} overfilled middle more space.`);
						} else {
							r.push(`${slave.slaveName}'s flannel shirt can't close over ${his} giant pregnant belly, so ${he} has left the bottom buttons open giving ${his} stomach room to massively jut out from ${his} body. In addition, ${he}'s left ${his} chaps unfastened to give ${his} overfilled womb more space.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s flannel shirt can't close over ${his} giant ${slave.inflationType}-filled belly, so ${he} has left the bottom buttons open leaving ${his} stomach hanging out.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s flannel shirt can't close over ${his} giant implant-filled belly, so ${he} has left the bottom buttons open leaving ${his} stomach hanging out.`);
						} else {
							r.push(`${slave.slaveName}'s flannel shirt can't close over ${his} giant pregnant belly, so ${he} has left the bottom buttons open leaving ${his} belly hanging out. In addition, ${he}'s left ${his} chaps unfastened to give ${his} overfilled womb more room.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s flannel shirt can't close over ${his} massively fat belly, so ${he} has left the bottom buttons open leaving it to hang, and jiggle, freely.`);
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s flannel shirt can't close over ${his} huge pregnant belly, so ${he} has left the bottom buttons open leaving ${his} belly hanging out.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s flannel shirt can't close over ${his} huge ${slave.inflationType}-filled belly, so ${he} has left the bottom buttons open leaving ${his} stomach hanging out.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s flannel shirt can't close over ${his} huge implant-filled belly, so ${he} has left the bottom buttons open leaving ${his} stomach hanging out.`);
						} else {
							r.push(`${slave.slaveName}'s flannel shirt can't close over ${his} huge pregnant belly, so ${he} has left the bottom buttons open leaving ${his} belly hanging out.`);
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s flannel shirt can't close over ${his} big pregnant belly, so ${he} has left the bottom buttons open leaving ${his} belly hanging out.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s flannel shirt can't close over ${his} hugely swollen belly, so ${he} has left the bottom buttons open leaving ${his} belly hanging out.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s flannel shirt can't close over ${his} big implant-filled belly, so ${he} has left the bottom buttons open leaving ${his} stomach hanging out.`);
						} else {
							r.push(`${slave.slaveName}'s flannel shirt can't close over ${his} big pregnant belly, so ${he} has left the bottom buttons open leaving ${his} belly hanging out.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s flannel shirt can't close over ${his} huge fat belly, so ${he} has left the bottom buttons open leaving it to wobble freely.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s flannel shirt can't close over ${his} big fat belly, so ${he} has left the bottom buttons open leaving it to hang free.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s flannel shirt's buttons strain over ${his} pregnant belly. A patch of ${his} underbelly peeks from beneath the taut fabric and the exhausted garment frequently rides up in defeat.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s flannel shirt's buttons strain over ${his} jiggling ${slave.inflationType}-filled belly. The struggling garment frequently rides up in defeat.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s flannel shirt's buttons strain over ${his} implant-filled belly. A patch of ${his} underbelly peeks from beneath the taut fabric and the exhausted garment frequently rides up in defeat.`);
						} else {
							r.push(`${slave.slaveName}'s flannel shirt's buttons strain over ${his} pregnant belly. A patch of ${his} underbelly peeks from beneath the taut fabric and the exhausted garment frequently rides up in defeat.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s flannel shirt strains to stay shut over ${his} fat belly, fat bulges between ${his} buttons and quite a bit of ${his} lower belly hangs out beneath ${his} shirt.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s flannel shirt bulges with ${his} small pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s flannel shirt bulges with ${his} ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s flannel shirt bulges with ${his} implant-rounded belly.`);
						} else {
							r.push(`${slave.slaveName}'s flannel shirt bulges with ${his} growing belly.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s flannel shirt bulges with ${his} chubby belly.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s chaps are fastened beneath the slight swell of ${his} lower belly.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s ripped abs occasionally peek out from beneath ${his} flannel shirt.`);
					}
					break;
				case "body oil":
					if (slave.belly >= 1000000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s unfathomable, hyper-swollen, ${slave.inflationType}-filled belly is covered in a sheen of special oil meant to prevent stretch marks.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s unfathomable, hyper-swollen, implant-filled belly is covered in a sheen of special oil meant to prevent stretch marks.`);
						} else {
							r.push(`${slave.slaveName}'s unfathomable, hyper-swollen pregnant belly is covered in a sheen of special oil meant to prevent stretch marks.`);
						}
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s monolithic ${slave.inflationType}-filled belly is covered in a sheen of special oil meant to prevent stretch marks.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s monolithic implant-filled belly is covered in a sheen of special oil meant to prevent stretch marks.`);
						} else {
							r.push(`${slave.slaveName}'s monolithic pregnant belly is covered in a sheen of special oil meant to prevent stretch marks.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s titanic ${slave.inflationType}-filled belly is covered in a sheen of special oil meant to prevent stretch marks.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s titanic implant-filled belly is covered in a sheen of special oil meant to prevent stretch marks.`);
						} else {
							r.push(`${slave.slaveName}'s titanic pregnant belly is covered in a sheen of special oil meant to prevent stretch marks.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s gigantic ${slave.inflationType}-filled belly is covered in a sheen of special oil meant to prevent stretch marks.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s gigantic implant-filled belly is covered in a sheen of special oil meant to prevent stretch marks.`);
						} else {
							r.push(`${slave.slaveName}'s gigantic pregnant belly is covered in a sheen of special oil meant to prevent stretch marks.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s massive ${slave.inflationType}-filled belly is covered in a sheen of special oil meant to prevent stretch marks.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s massive implant-filled belly is covered in a sheen of special oil meant to prevent stretch marks.`);
						} else {
							r.push(`${slave.slaveName}'s massive pregnant belly is covered in a sheen of special oil meant to prevent stretch marks.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s giant ${slave.inflationType}-filled belly is covered in a sheen of special oil meant to prevent stretch marks.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s giant implant-filled belly is covered in a sheen of special oil meant to prevent stretch marks.`);
						} else {
							r.push(`${slave.slaveName}'s giant pregnant belly is covered in a sheen of special oil meant to prevent stretch marks.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s massively fat belly is covered in a sheen of special oil meant to prevent stretch marks.`);
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s huge pregnant belly is covered in a sheen of oil.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s huge ${slave.inflationType}-filled belly is covered in a sheen of special oil meant to prevent stretch marks.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s huge implant-filled belly is covered in a sheen of special oil meant to prevent stretch marks.`);
						} else {
							r.push(`${slave.slaveName}'s huge pregnant belly is covered in a sheen of special oil meant to prevent stretch marks.`);
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s big pregnant belly is covered in a sheen of oil.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s hugely swollen belly is covered in a sheen of oil.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s big implant-filled belly is covered in a sheen of special oil meant to prevent stretch marks.`);
						} else {
							r.push(`${slave.slaveName}'s big pregnant belly is covered in a sheen of special oil meant to prevent stretch marks.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s hugely fat belly is covered in a sheen of special oil meant to prevent stretch marks.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s big fat belly is covered in a sheen of special oil meant to prevent stretch marks.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s pregnant belly is covered in a sheen of oil.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s jiggling ${slave.inflationType}-filled belly is covered in a sheen of oil.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s implant-filled belly is covered in a sheen of special oil meant to prevent stretch marks.`);
						} else {
							r.push(`${slave.slaveName}'s pregnant belly is covered in a sheen of special oil meant to prevent stretch marks.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s fat belly is covered in a sheen of oil.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s small pregnant belly is covered in a sheen of oil.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s ${slave.inflationType}-swollen belly is covered in a sheen of oil.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s implant-rounded belly is covered in a sheen of oil.`);
						} else {
							r.push(`${slave.slaveName}'s growing belly is covered in a sheen of oil.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s chubby belly is covered in a sheen of oil.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`The way the light reflects off the sheen of oil on ${slave.slaveName}'s lower belly clearly highlights the swell to it.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s ripped abs are covered in a lovely sheen of oil.`);
					}
					break;
				case "a toga":
					if (slave.belly >= 1000000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s toga bares ${his} middle to allow ${his} unfathomable, hyper-swollen, ${slave.inflationType}-filled belly the room it demands.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s toga bares ${his} middle to allow ${his} unfathomable, hyper-swollen, implant-filled belly the room it demands.`);
						} else {
							r.push(`${slave.slaveName}'s toga bares ${his} middle to allow ${his} unfathomable, hyper-swollen pregnant belly the room it desperately needs. ${His} brood appreciates the freedom.`);
						}
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s toga bares ${his} middle to allow ${his} monolithic ${slave.inflationType}-filled belly the room it demands.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s toga bares ${his} middle to allow ${his} monolithic implant-filled belly the room it demands.`);
						} else {
							r.push(`${slave.slaveName}'s toga bares ${his} middle to allow ${his} monolithic pregnant belly the room it desperately needs. ${His} children appreciate the freedom.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s toga bares ${his} middle to allow ${his} titanic ${slave.inflationType}-filled belly to hang heavily.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s toga bares ${his} middle to allow ${his} titanic implant-filled belly to hang heavily.`);
						} else {
							r.push(`${slave.slaveName}'s toga bares ${his} middle to allow ${his} titanic pregnant belly room. ${His} children appreciate the space and squirm happily.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s toga bares ${his} middle to allow ${his} gigantic ${slave.inflationType}-filled belly to hang heavily.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s toga bares ${his} middle to allow ${his} gigantic implant-filled belly to hang heavily.`);
						} else {
							r.push(`${slave.slaveName}'s toga bares ${his} middle to allow ${his} gigantic pregnant belly room. ${His} children appreciate the space.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s toga bares ${his} middle to allow ${his} massive ${slave.inflationType}-filled belly to bulge freely.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s toga bares ${his} middle to allow ${his} massive implant-filled belly to bulge freely.`);
						} else {
							r.push(`${slave.slaveName}'s toga bares ${his} middle to allow ${his} massive pregnant belly room.`);
						}
					} else if (slave.belly >= 150000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s toga bares ${his} middle to allow ${his} giant ${slave.inflationType}-filled belly to jut far from ${his} body.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s toga bares ${his} middle to allow ${his} giant implant-filled belly to jut far from ${his} body.`);
						} else {
							r.push(`${slave.slaveName}'s toga bares ${his} middle to allow ${his} giant pregnant belly to jut far from ${his} body.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s toga strains around ${his} giant ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s toga strains around ${his} giant implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s toga strains around ${his} giant pregnant belly.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s toga bares ${his} middle to allow ${his} massively fat belly to hang free.`);
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s toga tightly hugs ${his} huge pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s toga tightly hugs ${his} huge ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s toga tightly hugs ${his} huge implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s toga tightly hugs ${his} huge pregnant belly.`);
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s toga bulges greatly with ${his} big pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s toga bulges greatly with ${his} hugely swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s toga bulges greatly with ${his} big implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s toga bulges greatly with ${his} big pregnant belly.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s toga is stuffed to its capacity with ${his} hugely fat belly.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s toga bulges greatly with ${his} big fat belly.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s pregnant belly rounds out the front of ${his} toga.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s jiggling ${slave.inflationType}-filled belly rounds out the front of ${his} toga.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s implant-filled belly rounds out the front of ${his} toga.`);
						} else {
							r.push(`${slave.slaveName}'s pregnant belly rounds out the front of ${his} toga.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s toga bulges with ${his} fat belly.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s small pregnant belly gently bulges ${his} toga.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s ${slave.inflationType}-swollen belly gently bulges ${his} toga.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s implant-rounded belly gently bulges ${his} toga.`);
						} else {
							r.push(`${slave.slaveName}'s growing belly gently bulges ${his} toga.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s toga conceals ${his} chubby belly.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s toga conceals ${his} ripped abs.`);
					}
					break;
				case "a huipil":
					if (slave.belly >= 1000000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s huipil meekly rests atop ${his} unfathomable, hyper-swollen, ${slave.inflationType}-filled belly, its role completely usurped by the colossal mass.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s huipil meekly rests atop ${his} unfathomable, hyper-swollen, implant-filled belly, its role completely usurped by the colossal mass.`);
						} else {
							r.push(`${slave.slaveName}'s huipil meekly rests atop ${his} unfathomable, hyper-swollen pregnant belly, its role completely usurped by the colossal gravidity.`);
						}
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s huipil meekly rests atop ${his} monolithic ${slave.inflationType}-filled belly, its role completely usurped by the heavy mass.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s huipil meekly rests atop ${his} monolithic implant-filled belly, its role completely usurped by the heavy mass.`);
						} else {
							r.push(`${slave.slaveName}'s huipil meekly rests atop ${his} monolithic pregnant belly, its role completely usurped by the gravid mass.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s huipil meekly rests atop ${his} titanic ${slave.inflationType}-filled belly, its role completely usurped by the heavy mass.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s huipil meekly rests atop ${his} titanic implant-filled belly, its role completely usurped by the heavy mass.`);
						} else {
							r.push(`${slave.slaveName}'s huipil meekly rests atop ${his} titanic pregnant belly, its role completely usurped by the gravid mass.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s huipil meekly rests atop ${his} gigantic ${slave.inflationType}-filled belly, its role completely usurped by the heavy mass.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s huipil meekly rests atop ${his} gigantic implant-filled belly, its role completely usurped by the heavy mass.`);
						} else {
							r.push(`${slave.slaveName}'s huipil meekly rests atop ${his} gigantic pregnant belly, its role completely usurped by the gravid mass.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s huipil meekly rests atop ${his} massive ${slave.inflationType}-filled belly, its role completely usurped by the heavy mass.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s huipil meekly rests atop ${his} massive implant-filled belly, its role completely usurped by the heavy mass.`);
						} else {
							r.push(`${slave.slaveName}'s huipil meekly rests atop ${his} massive pregnant belly, its role completely usurped by the gravid mass.`);
						}
					} else if (slave.belly >= 150000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s giant ${slave.inflationType}-filled belly lifts ${his} huipil, though it itself hangs low enough to hide ${his} crotch.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s giant implant-filled belly lifts ${his} huipil, though it itself hangs low enough to hide ${his} crotch.`);
						} else {
							r.push(`${slave.slaveName}'s giant pregnant belly lifts ${his} huipil, though it itself hangs low enough to hide ${his} crotch.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s giant ${slave.inflationType}-filled belly lifts ${his} huipil, though it itself is just large enough to hide ${his} shame.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s giant implant-filled belly lifts ${his} huipil, though it itself is just large enough to hide ${his} shame.`);
						} else {
							r.push(`${slave.slaveName}'s giant pregnant belly lifts ${his} huipil, though it itself is just large enough to hide ${his} shame.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s huipil meekly rests atop ${his} massively fat belly, though it itself is big enough to act in its stead.`);
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s huge pregnant belly lifts ${his} huipil, exposing ${his} crotch for all to see.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s huge ${slave.inflationType}-filled belly lifts ${his} huipil, exposing ${his} crotch for all to see.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s huge implant-filled belly lifts ${his} huipil, exposing ${his} crotch for all to see.`);
						} else {
							r.push(`${slave.slaveName}'s huge pregnant belly lifts ${his} huipil, exposing ${his} crotch for all to see.`);
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s big pregnant belly lifts ${his} huipil, exposing ${his} crotch for all to see.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s hugely swollen belly lifts ${his} huipil, exposing ${his} crotch for all to see.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s big implant-filled belly lifts ${his} huipil, exposing ${his} crotch for all to see.`);
						} else {
							r.push(`${slave.slaveName}'s big pregnant belly lifts ${his} huipil, exposing ${his} crotch for all to see.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s hugely fat belly lifts ${his} huipil and hangs just low enough to hide ${his} crotch.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s big fat belly lifts ${his} huipil, yet isn't big enough to hide ${his} shame.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s pregnant belly lifts ${his} huipil.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s jiggling ${slave.inflationType}-filled belly lifts ${his} huipil.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s implant-filled belly lifts ${his} huipil.`);
						} else {
							r.push(`${slave.slaveName}'s pregnant belly lifts ${his} huipil.`);
						}
						r.push(`It just barely hangs low enough to hide ${his} crotch.`);
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s huipil gets lifted by ${his} fat belly, so it's useless for covering ${his} body.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s small pregnant belly slightly bulges under ${his} huipil.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s ${slave.inflationType}-swollen belly slightly bulges under ${his} huipil.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s implant-rounded belly slightly bulges under ${his} huipil.`);
						} else {
							r.push(`${slave.slaveName}'s growing belly slightly bulges under ${his} huipil.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s huipil conceals ${his} chubby little belly.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s huipil hides the small bulge in ${his} lower belly.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s huipil conceals ${his} ripped abs.`);
					}
					break;
				case "a slutty qipao":
					if (slave.belly >= 1000000) {
					// WIP//
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${His} qipao is slit up the side. However, it merely rests atop ${his} monolithic ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${His} qipao is slit up the side. However, it merely rests atop ${his} monolithic implant-filled belly.`);
						} else {
							r.push(`${His} qipao is slit up the side. However, it merely rests atop ${his} monolithic pregnant belly. ${His} body needs the room to grow.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							r.push(`${His} qipao is slit up the side. However, it merely rests atop ${his} titanic ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${His} qipao is slit up the side. However, it merely rests atop ${his} titanic implant-filled belly.`);
						} else {
							r.push(`${His} qipao is slit up the side. However, it merely rests atop ${his} titanic pregnant belly. ${His} body needs the room to grow.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							r.push(`${His} qipao is slit up the side. However, it merely rests atop ${his} gigantic ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${His} qipao is slit up the side. However, it merely rests atop ${his} gigantic implant-filled belly.`);
						} else {
							r.push(`${His} qipao is slit up the side. However, it merely rests atop ${his} gigantic pregnant belly. ${His} body appreciates the room to grow.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							r.push(`${His} qipao is slit up the side. However, it merely rests atop ${his} massive ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${His} qipao is slit up the side. However, it merely rests atop ${his} massive implant-filled belly.`);
						} else {
							r.push(`${His} qipao is slit up the side. However, it merely rests atop ${his} massive pregnant belly.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							r.push(`${His} qipao is slit up the side. However, it merely rests atop ${his} giant ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${His} qipao is slit up the side. However, it merely rests atop ${his} giant implant-filled belly.`);
						} else {
							r.push(`${His} qipao is slit up the side. However, it merely rests atop ${his} giant pregnant belly.`);
						}
					} else if (slave.belly >= 45000) {
						if (isBellyFluidLargest) {
							r.push(`${His} qipao is slit up the side. However, it merely rests atop ${his} huge ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${His} qipao is slit up the side. However, it merely rests atop ${his} huge implant-filled belly.`);
						} else {
							r.push(`${His} qipao is slit up the side. However, it merely rests atop ${his} huge pregnant belly.`);
						}
					} else if (slave.belly >= 30000) {
						if (isBellyFluidLargest) {
							r.push(`${His} qipao is slit up the side. However, it only covers the top quarter of ${his} huge ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${His} qipao is slit up the side. However, it only covers the top quarter of ${his} huge implant-filled belly.`);
						} else {
							r.push(`${His} qipao is slit up the side. However, it only covers top quarter of ${his} huge pregnant belly.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${His} qipao is slit up the side. However, it merely rests atop ${his} massively fat belly.`);
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${His} qipao is slit up the side. However, it only covers half of ${his} huge pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${His} qipao is slit up the side. However, it only covers half of ${his} huge ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${His} qipao is slit up the side. However, it only covers half of ${his} huge implant-filled belly.`);
						} else {
							r.push(`${His} qipao is slit up the side. However, it only covers half of ${his} huge pregnant belly.`);
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${His} qipao is slit up the side. However, it barely covers ${his} big pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${His} qipao is slit up the side. However, it barely covers ${his} hugely swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${His} qipao is slit up the side. However, it barely covers ${his} big implant-filled belly.`);
						} else {
							r.push(`${His} qipao is slit up the side. However, it barely covers ${his} big pregnant belly.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${His} qipao is slit up the side. However, it only covers half of ${his} hugely fat belly.`);
					} else if (slave.weight > 130) {
						r.push(`${His} qipao is slit up the side. However, it barely covers ${his} big fat belly.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${His} qipao is slit up the side. However, it only covers ${his} pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${His} qipao is slit up the side. However, it only covers ${his} jiggling ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${His} qipao is slit up the side. However, it only covers ${his} implant-filled belly.`);
						} else {
							r.push(`${His} qipao is slit up the side. However, it only covers ${his} pregnant belly.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${His} qipao is slit up the side. However, it only covers ${his} fat belly, allowing it to hang free.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${His} qipao is slit up the side. The front is pushed out by ${his} small pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${His} qipao is slit up the side. The front is pushed out by ${his} ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${His} qipao is slit up the side. The front is pushed out by ${his} implant-rounded belly.`);
						} else {
							r.push(`${His} qipao is slit up the side. The front is pushed out by ${his} growing belly.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${His} qipao is slit up the side. The front is pushed out by ${his} chubby belly.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${His} qipao is slit up the side giving the occasional peek of the small swell to ${his} lower belly.`);
					} else if (slave.muscles > 30) {
						r.push(`${His} qipao is slit up the side giving a tantalizing peek of ${his} ripped abs.`);
					}
					break;
				case "uncomfortable straps":
					if (slave.belly >= 1000000) {
					// WIP//
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s slave outfit's agonizingly tight straps run along the surface of ${his} monolithic ${slave.inflationType}-filled belly. The straps connect to a steel ring encircling ${his} popped navel.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s slave outfit's agonizingly tight straps run along the surface of ${his} monolithic implant-filled belly. The straps connect to a steel ring encircling ${his} popped navel.`);
						} else {
							r.push(`${slave.slaveName}'s slave outfit's tight straps press into ${his} monolithic pregnant belly, forcing flesh and child to painfully bulge between the gaps. The straps connect to a steel ring encircling ${his} popped navel. Every motion inside ${him} is excruciating.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s slave outfit's agonizingly tight straps barely press into ${his} titanic ${slave.inflationType}-filled belly. The straps connect to a steel ring encircling ${his} popped navel.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s slave outfit's agonizingly tight straps barely press into ${his} titanic implant-filled belly. The straps connect to a steel ring encircling ${his} popped navel.`);
						} else {
							r.push(`${slave.slaveName}'s slave outfit's tight straps press into ${his} titanic pregnant belly, forcing flesh and child to painfully bulge between the gaps. The straps connect to a steel ring encircling ${his} popped navel. Every motion inside ${him} is excruciating.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s slave outfit's agonizingly tight straps barely press into ${his} gigantic ${slave.inflationType}-filled belly, forcing flesh to painfully bulge out of the gaps. The straps connect to a steel ring encircling ${his} popped navel.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s slave outfit's agonizingly tight straps barely press into ${his} gigantic implant-filled belly, forcing flesh to painfully bulge out of the gaps. The straps connect to a steel ring encircling ${his} popped navel.`);
						} else {
							r.push(`${slave.slaveName}'s slave outfit's tight straps press into ${his} gigantic pregnant belly, forcing flesh and child to painfully bulge between the gaps. The straps connect to a steel ring encircling ${his} popped navel. Every motion inside ${him} is excruciating.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s slave outfit's agonizingly tight straps press into ${his} massive ${slave.inflationType}-filled belly, forcing flesh to painfully bulge out of the gaps. The straps connect to a steel ring encircling ${his} popped navel.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s slave outfit's agonizingly tight straps press into ${his} massive implant-filled belly, forcing flesh to painfully bulge out of the gaps. The straps connect to a steel ring encircling ${his} popped navel.`);
						} else {
							r.push(`${slave.slaveName}'s slave outfit's agonizingly tight straps press into ${his} massive pregnant belly, forcing flesh to painfully bulge out of the gaps. The straps connect to a steel ring encircling ${his} popped navel. Every motion inside ${him} causes ${him} more suffering.`);
						}
					} else if (slave.belly >= 150000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s slave outfit's agonizingly tight straps press into ${his} giant ${slave.inflationType}-filled belly, forcing flesh to painfully bulge out of the gaps. The straps connect to a steel ring encircling ${his} popped navel.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s slave outfit's agonizingly tight straps press into ${his} giant implant-filled belly, forcing flesh to painfully bulge out of the gaps. The straps connect to a steel ring encircling ${his} popped navel.`);
						} else {
							r.push(`${slave.slaveName}'s slave outfit's agonizingly tight straps press into ${his} giant pregnant belly, forcing flesh to painfully bulge out of the gaps. The straps connect to a steel ring encircling ${his} popped navel. Every motion inside ${him} causes ${him} more suffering.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s slave outfit's agonizingly tight straps press into ${his} giant ${slave.inflationType}-filled belly, forcing flesh to painfully bulge out of the gaps. The straps connect to a steel ring encircling ${his} popped navel.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s slave outfit's agonizingly tight straps press into ${his} giant implant-filled belly, forcing flesh to painfully bulge out of the gaps. The straps connect to a steel ring encircling ${his} popped navel.`);
						} else {
							r.push(`${slave.slaveName}'s slave outfit's agonizingly tight straps press into ${his} giant pregnant belly, forcing flesh to painfully bulge out of the gaps. The straps connect to a steel ring encircling ${his} popped navel.`);
						}
					} else if (slave.belly >= 60000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s slave outfit's agonizingly tight straps press into ${his} huge ${slave.inflationType}-filled belly, forcing flesh to spill out of the gaps. The straps connect to a steel ring encircling ${his} popped navel.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s slave outfit's agonizingly tight straps press into ${his} huge implant-filled belly, forcing flesh to spill out of the gaps. The straps connect to a steel ring encircling ${his} popped navel.`);
						} else {
							r.push(`${slave.slaveName}'s slave outfit's agonizingly tight straps press into ${his} huge pregnant belly, forcing flesh to spill out of the gaps. The straps connect to a steel ring encircling ${his} popped navel.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s slave outfit's straps are practically buried in ${his} massively fat belly. The only hint of their presence are the deep ravines of flesh formed around them. The straps connect to a steel ring around ${his} navel; though the only evidence of its existence is an unusually deep fold across ${his} middle.`);
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s slave outfit's straining straps press into ${his} huge pregnant belly. The straps connect to a steel ring encircling ${his} popped navel.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s slave outfit's straining straps press into ${his} huge ${slave.inflationType}-filled belly, causing flesh to spill out of the gaps and ${him} squirm with discomfort. The straps connect to a steel ring encircling ${his} popped navel.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s slave outfit's straining straps press into ${his} huge implant-filled belly, causing flesh to spill out of the gaps and ${him} squirm with discomfort. The straps connect to a steel ring encircling ${his} popped navel.`);
						} else {
							r.push(`${slave.slaveName}'s slave outfit's straining straps press into ${his} huge pregnant belly, causing flesh to spill out of the gaps and ${him} squirm with discomfort. The straps connect to a steel ring encircling ${his} popped navel.`);
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s slave outfit's straining straps press into ${his} big pregnant belly. The straps connect to a steel ring encircling ${his} popped navel.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s slave outfit's straining straps press into ${his} hugely swollen belly, causing flesh to spill out of the gaps. The straps connect to a steel ring encircling ${his} popped navel.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s slave outfit's straining straps press into ${his} big implant-filled belly, causing flesh to spill out of the gaps. The straps connect to a steel ring encircling ${his} popped navel.`);
						} else {
							r.push(`${slave.slaveName}'s slave outfit's straining straps press into ${his} big pregnant belly, causing flesh to spill out of the gaps. The straps connect to a steel ring encircling ${his} popped navel.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s slave outfit's straps sink deep into ${his} hugely fat belly. They can barely be seen from the front; ${his} sides completely envelope them. The straps connect to a steel ring that struggles to part the folds concealing ${his} navel, allowing it to see the light for once.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s slave outfit's straps sink deep into ${his} big fat belly; most end up swallowed by ${his} folds. The straps connect to a steel ring that parts the fold concealing ${his} navel, allowing it to be seen once again.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s slave outfit's straining straps press into ${his} pregnant belly. The straps connect to a steel ring encircling ${his} popped navel.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s slave outfit's straining straps press into ${his} jiggling ${slave.inflationType}-filled belly, causing flesh to spill out of the gaps. The straps connect to a steel ring encircling ${his} popped navel.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s slave outfit's straining straps press into ${his} implant-filled belly, causing flesh to spill out of the gaps. The straps connect to a steel ring encircling ${his} popped navel.`);
						} else {
							r.push(`${slave.slaveName}'s slave outfit's straining straps press into ${his} pregnant belly. The straps connect to a steel ring encircling ${his} popped navel.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s slave outfit's straps sink deep into ${his} fat belly, several even disappearing beneath ${his} folds. The straps connect to a steel ring that parts the fold concealing ${his} navel, allowing it to be seen once again.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s slave outfit's straining straps press into ${his} small pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s slave outfit's straining straps press into ${his} ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s slave outfit's straining straps press into ${his} implant-rounded belly.`);
						} else {
							r.push(`${slave.slaveName}'s slave outfit's straining straps press into ${his} growing belly.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s slave outfit's straps sink into ${his} chubby belly, making noticeable folds in ${his} sides. The straps connect to a steel ring pulled into the flesh around ${his} navel.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s slave outfit's straps run above and below the small bulge to ${his} lower belly clearly highlighting it.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s slave outfit's straps cross between ${his} ripped abs.`);
					}
					break;
				case "shibari ropes":
					if (slave.belly >= 1000000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s unfathomable, hyper-swollen, ${slave.inflationType}-filled belly is tightly bound with ropes; they stand no chance of sinking into the bloated orb, and can barely wrap around it.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s unfathomable, hyper-swollen, implant-filled belly is tightly bound with ropes; they stand no chance of sinking into the bloated orb, and can barely wrap around it.`);
						} else {
							r.push(`${slave.slaveName}'s unfathomable, hyper-swollen pregnant belly is tightly bound with ropes. It bulges angrily as they run between the forms of ${his} unborn children, and the ropes can barely wrap around it.`);
						}
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s monolithic ${slave.inflationType}-filled belly is tightly bound with ropes; they stand no chance at sinking into the bloated orb.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s monolithic implant-filled belly is tightly bound with ropes; they stand no chance at sinking into the bloated orb.`);
						} else {
							r.push(`${slave.slaveName}'s monolithic pregnant belly is tightly bound with ropes. It bulges angrily as they run between the forms of ${his} unborn children.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s titanic ${slave.inflationType}-filled belly is tightly bound with ropes; they barely sink into the bloated orb.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s titanic implant-filled belly is tightly bound with ropes; they barely sink into the bloated orb.`);
						} else {
							r.push(`${slave.slaveName}'s titanic pregnant belly is tightly bound with ropes; flesh and child bulge angrily from between them. ${His} children shift constantly under the tight bindings.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s gigantic ${slave.inflationType}-filled belly is tightly bound with ropes; they barely sink into the bloated orb.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s gigantic implant-filled belly is tightly bound with ropes; they barely sink into the bloated orb.`);
						} else {
							r.push(`${slave.slaveName}'s gigantic pregnant belly is tightly bound with ropes; flesh and child bulge angrily from between them.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s massive ${slave.inflationType}-filled belly is tightly bound with ropes; flesh bulges angrily from between them.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s massive implant-filled belly is tightly bound with ropes; flesh bulges angrily from between them.`);
						} else {
							r.push(`${slave.slaveName}'s massive pregnant belly is tightly bound with ropes; flesh bulges angrily from between them.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s giant ${slave.inflationType}-filled belly is tightly bound with ropes; flesh bulges angrily from between them.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s giant implant-filled belly is tightly bound with ropes; flesh bulges angrily from between them.`);
						} else {
							r.push(`${slave.slaveName}'s giant pregnant belly is tightly bound with ropes; flesh bulges angrily from between them.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s binding ropes are practically buried in ${his} massively fat belly. The only hint of their presence are the deep ravines of flesh formed around them.`);
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s huge pregnant belly is tightly bound with rope.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s huge ${slave.inflationType}-filled belly is tightly bound with ropes; flesh bulges angrily from between them.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s huge implant-filled belly is tightly bound with ropes; flesh bulges angrily from between them.`);
						} else {
							r.push(`${slave.slaveName}'s huge pregnant belly is tightly bound with ropes; flesh bulges angrily from between them.`);
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s big pregnant belly is tightly bound with rope.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s hugely swollen belly is tightly bound with ropes. It bulges lewdly through the gaps.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s big implant-filled belly is tightly bound with ropes; flesh bulges angrily from between them.`);
						} else {
							r.push(`${slave.slaveName}'s big pregnant belly is tightly bound with ropes; flesh bulges angrily from between them.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s binding ropes sink deep into ${his} hugely fat belly. They can barely be seen from the front; ${his} sides completely envelop them.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s binding ropes sink deep into ${his} big fat belly; most end up swallowed by ${his} folds.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s pregnant belly is tightly bound with rope.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s jiggling ${slave.inflationType}-filled belly is tightly bound with rope. It bulges lewdly through the gaps.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s implant-filled belly is tightly bound with rope; flesh bulges angrily from between them.`);
						} else {
							r.push(`${slave.slaveName}'s pregnant belly is tightly bound with rope; flesh bulges angrily from between them.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s binding ropes sink deep into ${his} fat belly, several even disappearing beneath ${his} folds.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s small pregnant belly is tightly bound with rope.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s ${slave.inflationType}-swollen belly is tightly bound with rope forcing it to bulge out the gaps.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s implant-rounded belly is tightly bound with rope; flesh bulges from between them.`);
						} else {
							r.push(`${slave.slaveName}'s growing belly is tightly bound with rope; flesh bulges from between them.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s binding ropes sink into ${his} chubby belly, making noticeable folds in ${his} sides.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s binding ropes run above and below the small bulge to ${his} lower belly clearly highlighting it.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s binding ropes run between ${his} ripped abs.`);
					}
					break;
				case "a latex catsuit":
				case "restrictive latex":
					if (slave.belly >= 1000000) {
					// WIP//
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s monolithic ${slave.inflationType}-filled belly greatly distends ${his} latex suit, leaving ${him} looking like an over-inflated weather balloon on the brink of popping. Only ${his} popped navel sticking out the front of ${his} belly disrupts the endless smoothness.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s monolithic implant-filled belly greatly distends ${his} latex suit, leaving ${him} looking like an over-inflated weather balloon on the brink of popping. Only ${his} popped navel sticking out the front of ${his} belly disrupts the endless smoothness.`);
						} else {
							r.push(`${slave.slaveName}'s monolithic pregnant belly greatly distends ${his} latex suit, leaving ${him} looking like an over-inflated, bump coated weather balloon on the brink of popping. ${His} popped navel and clearly defined occupants disrupt the smoothness`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s titanic ${slave.inflationType}-filled belly greatly distends ${his} latex suit, leaving ${him} looking like an over-inflated weather balloon. Only ${his} popped navel sticking out the front of ${his} belly disrupts the smoothness.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s titanic implant-filled belly greatly distends ${his} latex suit, leaving ${him} looking like an over-inflated weather balloon. Only ${his} popped navel sticking out the front of ${his} belly disrupts the smoothness.`);
						} else {
							r.push(`${slave.slaveName}'s titanic pregnant belly greatly distends ${his} latex suit, leaving ${him} looking like an over-inflated, bump coated weather balloon. ${His} popped navel and bulging occupants disrupt the smoothness.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s gigantic ${slave.inflationType}-filled belly greatly distends ${his} latex suit, leaving ${him} looking like a weather balloon. Only ${his} popped navel sticking out the front of ${his} belly disrupts the smoothness.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s gigantic implant-filled belly greatly distends ${his} latex suit, leaving ${him} looking like a weather balloon. Only ${his} popped navel sticking out the front of ${his} belly disrupts the smoothness.`);
						} else {
							r.push(`${slave.slaveName}'s gigantic pregnant belly greatly distends ${his} latex suit, leaving ${him} looking like a weather balloon. Only ${his} popped navel sticking out the front of ${his} belly disrupts the smoothness.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s massive ${slave.inflationType}-filled belly greatly distends ${his} latex suit, leaving ${him} looking like an over-inflated beachball ready to pop. Only ${his} popped navel sticking out the front of ${his} belly disrupts the smoothness.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s massive implant-filled belly greatly distends ${his} latex suit, leaving ${him} looking like an over-inflated beachball ready to pop. Only ${his} popped navel sticking out the front of ${his} belly disrupts the smoothness.`);
						} else {
							r.push(`${slave.slaveName}'s massive pregnant belly greatly distends ${his} latex suit, leaving ${him} looking like an over-inflated beachball ready to pop. Only ${his} popped navel sticking out the front of ${his} belly disrupts the smoothness.`);
						}
					} else if (slave.belly >= 150000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s giant ${slave.inflationType}-filled belly greatly distends ${his} latex suit, leaving ${him} looking like an over-inflated beachball. Only ${his} popped navel sticking out the front of ${his} belly disrupts the smoothness.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s giant implant-filled belly greatly distends ${his} latex suit, leaving ${him} looking like an over-inflated beachball. Only ${his} popped navel sticking out the front of ${his} belly disrupts the smoothness.`);
						} else {
							r.push(`${slave.slaveName}'s giant pregnant belly greatly distends ${his} latex suit, leaving ${him} looking like an over-inflated beachball. Only ${his} popped navel sticking out the front of ${his} belly disrupts the smoothness.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s giant ${slave.inflationType}-filled belly greatly distends ${his} latex suit, leaving ${him} looking like a big beachball. Only ${his} popped navel sticking out the front of ${his} belly disrupts the smoothness.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s giant implant-filled belly greatly distends ${his} latex suit, leaving ${him} looking like a big beachball. Only ${his} popped navel sticking out the front of ${his} belly disrupts the smoothness.`);
						} else {
							r.push(`${slave.slaveName}'s giant pregnant belly greatly distends ${his} latex suit, leaving ${him} looking like a big beachball. Only ${his} popped navel sticking out the front of ${his} belly disrupts the smoothness.`);
						}
					} else if (slave.belly >= 60000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s huge ${slave.inflationType}-filled belly greatly distends ${his} latex suit, leaving ${him} looking like an over-inflated balloon ready to pop. Only ${his} popped navel sticking out the front of ${his} belly disrupts the smoothness.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s huge implant-filled belly greatly distends ${his} latex suit, leaving ${him} looking like an over-inflated balloon ready to pop. Only ${his} popped navel sticking out the front of ${his} belly disrupts the smoothness.`);
						} else {
							r.push(`${slave.slaveName}'s huge pregnant belly greatly distends ${his} latex suit, leaving ${him} looking like an over-inflated balloon ready to pop. Only ${his} popped navel sticking out the front of ${his} belly disrupts the smoothness.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s massively fat belly greatly distends and ${his} latex suit. ${He} looks like an over-inflated balloon ready to pop.`);
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s huge pregnant belly greatly distends ${his} latex suit, leaving ${him} looking like an over-inflated balloon ready to pop. Only ${his} popped navel sticking out the front of ${his} belly disrupts the smoothness.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s huge ${slave.inflationType}-filled belly greatly distends ${his} latex suit, leaving ${him} looking like an over-inflated balloon ready to pop. Only ${his} popped navel sticking out the front of ${his} belly disrupts the smoothness.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s huge implant-filled belly greatly distends ${his} latex suit, leaving ${him} looking like an over-inflated balloon ready to pop. Only ${his} popped navel sticking out the front of ${his} belly disrupts the smoothness.`);
						} else {
							r.push(`${slave.slaveName}'s huge pregnant belly greatly distends ${his} latex suit, leaving ${him} looking like an over-inflated balloon ready to pop. Only ${his} popped navel sticking out the front of ${his} belly disrupts the smoothness.`);
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s big pregnant belly greatly distends ${his} latex suit, leaving ${him} looking like an over-inflated balloon nearing its limit. Only ${his} popped navel sticking out the front of ${his} belly disrupts the smoothness.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s hugely swollen belly greatly distends ${his} latex suit, leaving ${him} looking like an over-inflated balloon ready to pop. Only ${his} popped navel sticking out the front of ${his} belly disrupts the smoothness.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s big implant-filled belly greatly distends ${his} latex suit, leaving ${him} looking like an over-inflated balloon nearing its limit. Only ${his} popped navel sticking out the front of ${his} belly disrupts the smoothness.`);
						} else {
							r.push(`${slave.slaveName}'s big pregnant belly greatly distends ${his} latex suit, leaving ${him} looking like an over-inflated balloon nearing its limit. Only ${his} popped navel sticking out the front of ${his} belly disrupts the smoothness.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s hugely fat belly greatly distends and ${his} latex suit. ${He} looks like an over-inflated balloon.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s big fat belly greatly distends ${his} latex suit. ${He} looks like an over-inflated balloon.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s pregnant belly greatly distends ${his} latex suit, leaving ${him} looking like an over-inflated balloon. Only ${his} popped navel sticking out the front of ${his} belly disrupts the smoothness.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s jiggling ${slave.inflationType}-filled belly greatly distends ${his} latex suit, leaving ${him} looking like an over-inflated balloon. Only ${his} popped navel sticking out the front of ${his} belly disrupts the smoothness.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s implant-filled belly greatly distends ${his} latex suit, leaving ${him} looking like an over-inflated balloon. Only ${his} popped navel sticking out the front of ${his} belly disrupts the smoothness.`);
						} else {
							r.push(`${slave.slaveName}'s pregnant belly greatly distends ${his} latex suit, leaving ${him} looking like an over-inflated balloon. Only ${his} popped navel sticking out the front of ${his} belly disrupts the smoothness.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s fat belly is compressed by ${his} latex suit, leaving it looking round and smooth.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s small pregnant belly greatly bulges under ${his} latex suit.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s ${slave.inflationType}-swollen belly greatly bulges under ${his} latex suit.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s implant-rounded belly greatly bulges under ${his} latex suit.`);
						} else {
							r.push(`${slave.slaveName}'s growing belly greatly bulges under ${his} latex suit.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s chubby belly in quite noticeable under ${his} latex suit, though any folds ${he} might have are smoothed out by it.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`There is a clear curve to the tight latex of the suit beneath ${slave.slaveName}'s navel.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s latex suit tightly hugs ${his} stomach to showcase ${his} ripped abs.`);
					}
					break;
				case "a schutzstaffel uniform":
					if (slave.belly >= 1000000) {
					// WIP//
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s monolithic ${slave.inflationType}-filled belly bulges tremendously out of ${his} open tunic and undershirt.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since there is no chance of closing the buttons over ${his} monolithic ${slave.inflationType}-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since there is no chance of closing the buttons over ${his} monolithic ${slave.inflationType}-filled belly.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s monolithic implant-filled belly bulges tremendously out of ${his} open tunic and undershirt.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since there is no chance of closing the buttons over ${his} monolithic implant-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since there is no chance of closing the buttons over ${his} monolithic implant-filled belly.`);
							}
						} else {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s monolithic pregnant belly bulges tremendously out of ${his} open tunic and undershirt, giving ${his} new recruits the room they need.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since there is no chance of closing the buttons over ${his} monolithic pregnant belly. It takes full advantage of the freedom to bulge in every direction; ${his} new recruits taking as much space as they can get.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since there is no chance of closing the buttons over ${his} monolithic pregnant belly. It takes full advantage of the freedom to bulge in every direction; ${his} new recruits taking as much space as they can get.`);
							}
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s titanic ${slave.inflationType}-filled belly hangs heavily out of ${his} open tunic and undershirt.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since there is no chance of closing the buttons over ${his} titanic ${slave.inflationType}-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since there is no chance of closing the buttons over ${his} titanic ${slave.inflationType}-filled belly.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s titanic implant-filled belly hangs heavily out of ${his} open tunic and undershirt.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since there is no chance of closing the buttons over ${his} titanic implant-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since there is no chance of closing the buttons over ${his} titanic implant-filled belly.`);
							}
						} else {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s titanic pregnant belly hangs heavily out of ${his} open tunic and undershirt, giving ${his} new recruits the room they need.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since there is no chance of closing the buttons over ${his} titanic pregnant belly. It takes full advantage of the freedom to hang heavily, ${his} new recruits squirming happily.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since there is no chance of closing the buttons over ${his} titanic pregnant belly. It takes full advantage of the freedom to hang heavily, ${his} new recruits squirming happily.`);
							}
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s gigantic ${slave.inflationType}-filled belly hangs heavily out of ${his} open tunic and undershirt.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since there is no chance of closing the buttons over ${his} gigantic ${slave.inflationType}-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since there is no chance of closing the buttons over ${his} gigantic ${slave.inflationType}-filled belly.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s gigantic implant-filled belly hangs heavily out of ${his} open tunic and undershirt.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since there is no chance of closing the buttons over ${his} gigantic implant-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since there is no chance of closing the buttons over ${his} gigantic implant-filled belly.`);
							}
						} else {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s gigantic pregnant belly hangs heavily out of ${his} open tunic and undershirt.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since there is no chance of closing the buttons over ${his} gigantic pregnant belly.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since there is no chance of closing the buttons over ${his} gigantic pregnant belly.`);
							}
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s massive ${slave.inflationType}-filled belly hangs out ${his} open tunic and undershirt.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since there is no chance of closing the buttons over ${his} massive ${slave.inflationType}-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since there is no chance of closing the buttons over ${his} massive ${slave.inflationType}-filled belly.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s massive implant-filled belly hangs out ${his} open tunic and undershirt.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since there is no chance of closing the buttons over ${his} massive implant-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since there is no chance of closing the buttons over ${his} massive implant-filled belly.`);
							}
						} else {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s massive pregnant belly hangs out ${his} open tunic and undershirt.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since there is no chance of closing the buttons over ${his} massive pregnant belly.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since there is no chance of closing the buttons over ${his} massive pregnant belly.`);
							}
						}
					} else if (slave.belly >= 150000) {
						if (isBellyFluidLargest) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s giant ${slave.inflationType}-filled belly hangs out ${his} open tunic and undershirt.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since there is no chance of closing the buttons over ${his} giant ${slave.inflationType}-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since there is no chance of closing the buttons over ${his} giant ${slave.inflationType}-filled belly.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s giant implant-filled belly hangs out ${his} open tunic and undershirt.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since there is no chance of closing the buttons over ${his} giant implant-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since there is no chance of closing the buttons over ${his} giant implant-filled belly.`);
							}
						} else {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s giant pregnant belly hangs out ${his} open tunic and undershirt.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since there is no chance of closing the buttons over ${his} giant pregnant belly.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since there is no chance of closing the buttons over ${his} giant pregnant belly.`);
							}
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s giant ${slave.inflationType}-filled belly parts ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since ${his} giant ${slave.inflationType}-filled belly has triumphed over its buttons and has joined ${his} breasts in dominating ${his} tunic.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since ${his} giant ${slave.inflationType}-filled belly has triumphed over ${his} buttons.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s giant implant-filled belly parts ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since ${his} giant implant-filled belly has triumphed over its buttons and has joined ${his} breasts in dominating ${his} tunic.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since ${his} giant implant-filled belly has triumphed over ${his} buttons.`);
							}
						} else {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s giant pregnant belly parts ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since ${his} giant pregnant belly has triumphed over its buttons and has joined ${his} breasts in dominating ${his} tunic.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since ${his} giant pregnant belly has triumphed over ${his} buttons.`);
							}
						}
					} else if (slave.belly >= 45000) {
						if (isBellyFluidLargest) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s huge ${slave.inflationType}-filled belly is barely obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since ${his} huge ${slave.inflationType}-filled belly has triumphed over its buttons and has joined ${his} breasts in dominating ${his} tunic.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since ${his} huge ${slave.inflationType}-filled belly has triumphed over ${his} buttons.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s huge implant-filled belly is barely obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since ${his} huge implant-filled belly has triumphed over its buttons and has joined ${his} breasts in dominating ${his} tunic.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since ${his} huge implant-filled belly has triumphed over ${his} buttons.`);
							}
						} else {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s huge pregnant belly is barely obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since ${his} huge pregnant belly has triumphed over its buttons and has joined ${his} breasts in dominating ${his} tunic.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since ${his} huge pregnant belly has triumphed over ${his} buttons.`);
							}
						}
					} else if (slave.belly >= 30000) {
						if (isBellyFluidLargest) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s huge ${slave.inflationType}-filled belly is barely obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt barely closes as it struggles to contain ${his} huge ${slave.inflationType}-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s tunic lies half open, since ${his} huge ${slave.inflationType}-filled belly has triumphed over ${his} uniform's buttons.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s huge implant-filled belly is barely obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt barely closes as it struggles to contain ${his} huge implant-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s tunic lies half open, since ${his} huge implant-filled belly has triumphed over ${his} uniform's buttons.`);
							}
						} else {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s huge pregnant belly is barely obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt barely closes as it struggles to contain ${his} huge pregnant belly.`);
							} else {
								r.push(`${slave.slaveName}'s tunic lies half open, since ${his} huge pregnant belly has triumphed over ${his} uniform's buttons.`);
							}
						}
					} else if (slave.weight > 190) {
						if (slave.boobs > 12000) {
							r.push(`${slave.slaveName}'s massively fat belly is barely obscured by ${his} massive tits and, in turn, obscures ${his} trousers.`);
						} else if (slave.boobs > 4000) {
							r.push(`${slave.slaveName}'s undershirt lies half open, since ${his} massively fat belly has triumphed over ${his} buttons. It hangs free, obscuring ${his} trousers.`);
						} else {
							r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since ${his} massively fat belly has triumphed over ${his} buttons. It hangs free, obscuring ${his} trousers.`);
						}
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s huge pregnant belly is barely obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt strains to contain ${his} huge pregnant belly.`);
							} else {
								r.push(`${slave.slaveName}'s huge pregnant belly threatens to pop the buttons off ${his} uniform's jacket.`);
							}
						} else if (isBellyFluidLargest) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s huge ${slave.inflationType}-filled belly is barely obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt strains to contain ${his} huge ${slave.inflationType}-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s huge ${slave.inflationType}-filled belly threatens to pop the buttons off ${his} uniform's jacket.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s huge implant-filled belly is barely obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt strains to contain ${his} huge implant-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s huge implant-filled belly threatens to pop the buttons off ${his} uniform's jacket.`);
							}
						} else {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s huge pregnant belly is barely obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt strains to contain ${his} huge pregnant belly.`);
							} else {
								r.push(`${slave.slaveName}'s huge pregnant belly threatens to pop the buttons off ${his} uniform's jacket.`);
							}
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s big pregnant belly is obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt strains to contain ${his} big pregnant belly.`);
							} else {
								r.push(`${slave.slaveName}'s big pregnant belly greatly stretches ${his} uniform's jacket.`);
							}
						} else if (isBellyFluidLargest) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s hugely swollen belly is obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt strains to contain ${his} hugely swollen belly.`);
							} else {
								r.push(`${slave.slaveName}'s hugely swollen belly greatly stretches ${his} uniform's jacket.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s big implant-filled belly is obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt strains to contain ${his} big implant-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s big implant-filled belly greatly stretches ${his} uniform's jacket.`);
							}
						} else {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s big pregnant belly is obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt strains to contain ${his} big pregnant belly.`);
							} else {
								r.push(`${slave.slaveName}'s big pregnant belly greatly stretches ${his} uniform's jacket.`);
							}
						}
					} else if (slave.weight > 160) {
						if (slave.boobs > 12000) {
							r.push(`${slave.slaveName}'s hugely fat belly is obscured by ${his} massive tits.`);
						} else if (slave.boobs > 4000) {
							r.push(`${slave.slaveName}'s undershirt strains to contain ${his} hugely fat belly, forcing fat to bulge between the overworked buttons. The bottom of it peeks out from under ${his} poor top, obscuring the waist of ${his} trousers.`);
						} else {
							r.push(`${slave.slaveName}'s hugely fat belly distends ${his} uniform's jacket, the bottom of which hangs out from under it, obscuring the waist of ${his} trousers.`);
						}
					} else if (slave.weight > 130) {
						if (slave.boobs > 12000) {
							r.push(`${slave.slaveName}'s big fat belly is obscured by ${his} massive tits.`);
						} else if (slave.boobs > 4000) {
							r.push(`${slave.slaveName}'s undershirt strains to contain ${his} big fat belly, the bottom of which peeks out from under it and hangs over the waist of ${his} trousers.`);
						} else {
							r.push(`${slave.slaveName}'s big fat belly is notably distends ${his} uniform's jacket, the bottom of which just barely peeks out from under it, hanging over the waist of ${his} trousers.`);
						}
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s pregnant belly is obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt strains to contain ${his} pregnant belly.`);
							} else {
								r.push(`${slave.slaveName}'s pregnant belly notably distends ${his} uniform's jacket.`);
							}
						} else if (isBellyFluidLargest) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s jiggling ${slave.inflationType}-filled belly is obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt strains to contain ${his} jiggling ${slave.inflationType}-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s jiggling ${slave.inflationType}-filled belly notably distends ${his} uniform's jacket.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s implant-filled belly is obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt strains to contain ${his} implant-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s implant-filled belly notably distends ${his} uniform's jacket.`);
							}
						} else {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s pregnant belly is obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt strains to contain ${his} pregnant belly.`);
							} else {
								r.push(`${slave.slaveName}'s pregnant belly notably distends ${his} uniform's jacket.`);
							}
						}
					} else if (slave.weight > 95) {
						if (slave.boobs > 12000) {
							r.push(`${slave.slaveName}'s fat belly is obscured by ${his} massive tits.`);
						} else if (slave.boobs > 4000) {
							r.push(`${slave.slaveName}'s undershirt struggles to cover ${his} fat belly, the bottom of which peeks out from under it.`);
						} else {
							r.push(`${slave.slaveName}'s fat belly is covered by ${his} uniform's jacket, the bottom of which just barely peeks out from under it.`);
						}
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s small pregnant belly is obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt covers ${his} small pregnant belly.`);
							} else {
								r.push(`${slave.slaveName}'s uniform covers ${his} small pregnant belly.`);
							}
						} else if (isBellyFluidLargest) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s ${slave.inflationType}-swollen belly is obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt covers ${his} ${slave.inflationType}-swollen belly.`);
							} else {
								r.push(`${slave.slaveName}'s uniform covers ${his} ${slave.inflationType}-swollen belly.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s implant-rounded belly is obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt covers ${his} implant-rounded belly.`);
							} else {
								r.push(`${slave.slaveName}'s uniform covers ${his} implant-rounded belly.`);
							}
						} else {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s growing belly is obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt covers ${his} growing belly.`);
							} else {
								r.push(`${slave.slaveName}'s uniform covers ${his} growing belly.`);
							}
						}
					} else if (slave.weight > 30) {
						if (slave.boobs > 12000) {
							r.push(`${slave.slaveName}'s chubby belly is obscured by ${his} massive tits.`);
						} else if (slave.boobs > 4000) {
							r.push(`${slave.slaveName}'s undershirt covers ${his} chubby belly, the bottom of which just barely peeks out from under it.`);
						} else {
							r.push(`${slave.slaveName}'s uniform covers ${his} chubby belly, the bottom of which just barely peeks out from under it.`);
						}
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						if (slave.boobs > 12000) {
							r.push(`${slave.slaveName}'s slightly swollen belly can be glimpsed beneath ${his} massive tits.`);
						} else if (slave.boobs > 4000) {
							r.push(`${slave.slaveName}'s undershirt tightly hugs the slight swell to ${his} lower belly.`);
						} else {
							r.push(`${slave.slaveName}'s tunic looks a little tight around the middle.`);
						}
					} else if (slave.muscles > 30) {
						if (slave.boobs > 12000) {
							r.push(`${slave.slaveName}'s ripped abs can be glimpsed beneath ${his} massive tits.`);
						} else if (slave.boobs > 4000) {
							r.push(`${slave.slaveName}'s undershirt barely conceals ${his} ripped abs.`);
						} else {
							r.push(`${slave.slaveName}'s ripped abs are completely hidden under ${his} uniform.`);
						}
					}
					break;
				case "a slutty schutzstaffel uniform":
					if (slave.belly >= 1000000) {
					// WIP//
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s monolithic ${slave.inflationType}-filled belly bulges tremendously out of ${his} open tunic and undershirt.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since there is no chance of closing the buttons over ${his} monolithic ${slave.inflationType}-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since there is no chance of closing the buttons over ${his} monolithic ${slave.inflationType}-filled belly.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s monolithic implant-filled belly bulges tremendously out of ${his} open tunic and undershirt.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since there is no chance of closing the buttons over ${his} monolithic implant-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since there is no chance of closing the buttons over ${his} monolithic implant-filled belly.`);
							}
						} else {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s monolithic pregnant belly bulges tremendously out of ${his} open tunic and undershirt, giving ${his} new recruits the room they need.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since there is no chance of closing the buttons over ${his} monolithic pregnant belly. It takes full advantage of the freedom to bulge in every direction; ${his} new recruits taking as much space as they can get.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since there is no chance of closing the buttons over ${his} monolithic pregnant belly. It takes full advantage of the freedom to bulge in every direction; ${his} new recruits taking as much space as they can get.`);
							}
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s titanic ${slave.inflationType}-filled belly hangs heavily out of ${his} open tunic and undershirt.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since there is no chance of closing the buttons over ${his} titanic ${slave.inflationType}-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since there is no chance of closing the buttons over ${his} titanic ${slave.inflationType}-filled belly.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s titanic implant-filled belly hangs heavily out of ${his} open tunic and undershirt.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since there is no chance of closing the buttons over ${his} titanic implant-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since there is no chance of closing the buttons over ${his} titanic implant-filled belly.`);
							}
						} else {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s titanic pregnant belly hangs heavily out of ${his} open tunic and undershirt, giving ${his} new recruits the room they need.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since there is no chance of closing the buttons over ${his} titanic pregnant belly. It takes full advantage of the freedom to hang heavily, ${his} new recruits squirming happily.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since there is no chance of closing the buttons over ${his} titanic pregnant belly. It takes full advantage of the freedom to hang heavily, ${his} new recruits squirming happily.`);
							}
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s gigantic ${slave.inflationType}-filled belly hangs heavily out of ${his} open tunic and undershirt.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since there is no chance of closing the buttons over ${his} gigantic ${slave.inflationType}-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since there is no chance of closing the buttons over ${his} gigantic ${slave.inflationType}-filled belly.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s gigantic implant-filled belly hangs heavily out of ${his} open tunic and undershirt.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since there is no chance of closing the buttons over ${his} gigantic implant-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since there is no chance of closing the buttons over ${his} gigantic implant-filled belly.`);
							}
						} else {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s gigantic pregnant belly hangs heavily out of ${his} open tunic and undershirt.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since there is no chance of closing the buttons over ${his} gigantic pregnant belly.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since there is no chance of closing the buttons over ${his} gigantic pregnant belly.`);
							}
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s massive ${slave.inflationType}-filled belly hangs out ${his} open tunic and undershirt.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since there is no chance of closing the buttons over ${his} massive ${slave.inflationType}-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since there is no chance of closing the buttons over ${his} massive ${slave.inflationType}-filled belly.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s massive implant-filled belly hangs out ${his} open tunic and undershirt.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since there is no chance of closing the buttons over ${his} massive implant-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since there is no chance of closing the buttons over ${his} massive implant-filled belly.`);
							}
						} else {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s massive pregnant belly hangs out ${his} open tunic and undershirt.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since there is no chance of closing the buttons over ${his} massive pregnant belly.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since there is no chance of closing the buttons over ${his} massive pregnant belly.`);
							}
						}
					} else if (slave.belly >= 150000) {
						if (isBellyFluidLargest) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s giant ${slave.inflationType}-filled belly hangs out ${his} open tunic and undershirt.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since there is no chance of closing the buttons over ${his} giant ${slave.inflationType}-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since there is no chance of closing the buttons over ${his} giant ${slave.inflationType}-filled belly.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s giant implant-filled belly hangs out ${his} open tunic and undershirt.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since there is no chance of closing the buttons over ${his} giant implant-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since there is no chance of closing the buttons over ${his} giant implant-filled belly.`);
							}
						} else {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s giant pregnant belly hangs out ${his} open tunic and undershirt.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since there is no chance of closing the buttons over ${his} giant pregnant belly.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since there is no chance of closing the buttons over ${his} giant pregnant belly.`);
							}
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s giant ${slave.inflationType}-filled belly parts ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since ${his} giant ${slave.inflationType}-filled belly has triumphed over its buttons and has joined ${his} breasts in dominating ${his} tunic.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since ${his} giant ${slave.inflationType}-filled belly has triumphed over ${his} buttons.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s giant implant-filled belly parts ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since ${his} giant implant-filled belly has triumphed over its buttons and has joined ${his} breasts in dominating ${his} tunic.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since ${his} giant implant-filled belly has triumphed over ${his} buttons.`);
							}
						} else {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s giant pregnant belly parts ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since ${his} giant pregnant belly has triumphed over its buttons and has joined ${his} breasts in dominating ${his} tunic.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since ${his} giant pregnant belly has triumphed over ${his} buttons.`);
							}
						}
					} else if (slave.belly >= 45000) {
						if (isBellyFluidLargest) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s huge ${slave.inflationType}-filled belly is barely obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since ${his} huge ${slave.inflationType}-filled belly has triumphed over its buttons and has joined ${his} breasts in dominating ${his} tunic.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since ${his} huge ${slave.inflationType}-filled belly has triumphed over ${his} buttons.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s huge implant-filled belly is barely obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since ${his} huge implant-filled belly has triumphed over its buttons and has joined ${his} breasts in dominating ${his} tunic.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since ${his} huge implant-filled belly has triumphed over ${his} buttons.`);
							}
						} else {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s huge pregnant belly is barely obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since ${his} huge pregnant belly has triumphed over its buttons and has joined ${his} breasts in dominating ${his} tunic.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since ${his} huge pregnant belly has triumphed over ${his} buttons.`);
							}
						}
					} else if (slave.belly >= 30000) {
						if (isBellyFluidLargest) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s huge ${slave.inflationType}-filled belly is barely obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt barely closes as it struggles to contain ${his} huge ${slave.inflationType}-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s tunic lies half open, since ${his} huge ${slave.inflationType}-filled belly has triumphed over ${his} uniform's buttons.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s huge implant-filled belly is barely obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt barely closes as it struggles to contain ${his} huge implant-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s tunic lies half open, since ${his} huge implant-filled belly has triumphed over ${his} uniform's buttons.`);
							}
						} else {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s huge pregnant belly is barely obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt barely closes as it struggles to contain ${his} huge pregnant belly.`);
							} else {
								r.push(`${slave.slaveName}'s tunic lies half open, since ${his} huge pregnant belly has triumphed over ${his} uniform's buttons.`);
							}
						}
					} else if (slave.weight > 190) {
						if (slave.boobs > 12000) {
							r.push(`${slave.slaveName}'s massively fat belly is barely obscured by ${his} massive tits and, in turn, obscures ${his} miniskirt.`);
						} else if (slave.boobs > 4000) {
							r.push(`${slave.slaveName}'s undershirt lies half open, since ${his} massively fat belly has triumphed over ${his} buttons. It hangs free, obscuring ${his} miniskirt.`);
						} else {
							r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since ${his} massively fat belly has triumphed over ${his} buttons. It hangs free, obscuring ${his} miniskirt.`);
						}
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s huge pregnant belly is barely obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt strains to contain ${his} huge pregnant belly.`);
							} else {
								r.push(`${slave.slaveName}'s huge pregnant belly threatens to pop the buttons off ${his} uniform's jacket.`);
							}
						} else if (isBellyFluidLargest) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s huge ${slave.inflationType}-filled belly is barely obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt strains to contain ${his} huge ${slave.inflationType}-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s huge ${slave.inflationType}-filled belly threatens to pop the buttons off ${his} uniform's jacket.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s huge implant-filled belly is barely obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt strains to contain ${his} huge implant-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s huge implant-filled belly threatens to pop the buttons off ${his} uniform's jacket.`);
							}
						} else {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s huge pregnant belly is barely obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt strains to contain ${his} huge pregnant belly.`);
							} else {
								r.push(`${slave.slaveName}'s huge pregnant belly threatens to pop the buttons off ${his} uniform's jacket.`);
							}
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s big pregnant belly is obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt strains to contain ${his} big pregnant belly.`);
							} else {
								r.push(`${slave.slaveName}'s big pregnant belly greatly stretches ${his} uniform's jacket.`);
							}
						} else if (isBellyFluidLargest) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s hugely swollen belly is obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt strains to contain ${his} hugely swollen belly.`);
							} else {
								r.push(`${slave.slaveName}'s hugely swollen belly greatly stretches ${his} uniform's jacket.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s big implant-filled belly is obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt strains to contain ${his} big implant-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s big implant-filled belly greatly stretches ${his} uniform's jacket.`);
							}
						} else {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s big pregnant belly is obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt strains to contain ${his} big pregnant belly.`);
							} else {
								r.push(`${slave.slaveName}'s big pregnant belly greatly stretches ${his} uniform's jacket.`);
							}
						}
					} else if (slave.weight > 160) {
						if (slave.boobs > 12000) {
							r.push(`${slave.slaveName}'s hugely fat belly is obscured by ${his} massive tits.`);
						} else if (slave.boobs > 4000) {
							r.push(`${slave.slaveName}'s undershirt strains to contain ${his} hugely fat belly, forcing fat to bulge between the overworked buttons. The bottom of it peeks out from under ${his} poor top, obscuring the waist of ${his} miniskirt.`);
						} else {
							r.push(`${slave.slaveName}'s hugely fat belly distends ${his} uniform's jacket, the bottom of which hangs out from under it, obscuring the waist of ${his} miniskirt.`);
						}
					} else if (slave.weight > 130) {
						if (slave.boobs > 12000) {
							r.push(`${slave.slaveName}'s big fat belly is obscured by ${his} massive tits.`);
						} else if (slave.boobs > 4000) {
							r.push(`${slave.slaveName}'s undershirt strains to contain ${his} big fat belly, the bottom of which peeks out from under it and hangs over the waist of ${his} miniskirt.`);
						} else {
							r.push(`${slave.slaveName}'s big fat belly is notably distends ${his} uniform's jacket, the bottom of which just barely peeks out from under it, hanging over the waist of ${his} miniskirt.`);
						}
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s pregnant belly is obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt strains to contain ${his} pregnant belly.`);
							} else {
								r.push(`${slave.slaveName}'s pregnant belly notably distends ${his} uniform's jacket.`);
							}
						} else if (isBellyFluidLargest) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s jiggling ${slave.inflationType}-filled belly is obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt strains to contain ${his} jiggling ${slave.inflationType}-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s jiggling ${slave.inflationType}-filled belly notably distends ${his} uniform's jacket.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s implant-filled belly is obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt strains to contain ${his} implant-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s implant-filled belly notably distends ${his} uniform's jacket.`);
							}
						} else {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s pregnant belly is obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt strains to contain ${his} pregnant belly.`);
							} else {
								r.push(`${slave.slaveName}'s pregnant belly notably distends ${his} uniform's jacket.`);
							}
						}
					} else if (slave.weight > 95) {
						if (slave.boobs > 12000) {
							r.push(`${slave.slaveName}'s fat belly is obscured by ${his} massive tits.`);
						} else if (slave.boobs > 4000) {
							r.push(`${slave.slaveName}'s undershirt struggles to cover ${his} fat belly, the bottom of which peeks out from under it.`);
						} else {
							r.push(`${slave.slaveName}'s fat belly is covered by ${his} uniform's jacket, the bottom of which just barely peeks out from under it.`);
						}
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s small pregnant belly is obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt covers ${his} small pregnant belly.`);
							} else {
								r.push(`${slave.slaveName}'s uniform covers ${his} small pregnant belly.`);
							}
						} else if (isBellyFluidLargest) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s ${slave.inflationType}-swollen belly is obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt covers ${his} ${slave.inflationType}-swollen belly.`);
							} else {
								r.push(`${slave.slaveName}'s uniform covers ${his} ${slave.inflationType}-swollen belly.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s implant-rounded belly is obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt covers ${his} implant-rounded belly.`);
							} else {
								r.push(`${slave.slaveName}'s uniform covers ${his} implant-rounded belly.`);
							}
						} else {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s growing belly is obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt covers ${his} growing belly.`);
							} else {
								r.push(`${slave.slaveName}'s uniform covers ${his} growing belly.`);
							}
						}
					} else if (slave.weight > 30) {
						if (slave.boobs > 12000) {
							r.push(`${slave.slaveName}'s chubby belly is obscured by ${his} massive tits.`);
						} else if (slave.boobs > 4000) {
							r.push(`${slave.slaveName}'s undershirt covers ${his} chubby belly, the bottom of which just barely peeks out from under it.`);
						} else {
							r.push(`${slave.slaveName}'s uniform covers ${his} chubby belly, the bottom of which just barely peeks out from under it.`);
						}
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						if (slave.boobs > 12000) {
							r.push(`${slave.slaveName}'s slightly swollen belly can be glimpsed beneath ${his} massive tits.`);
						} else if (slave.boobs > 4000) {
							r.push(`${slave.slaveName}'s undershirt tightly hugs the slight swell to ${his} lower belly.`);
						} else {
							r.push(`${slave.slaveName}'s tunic looks a little tight around the middle.`);
						}
					} else if (slave.muscles > 30) {
						if (slave.boobs > 12000) {
							r.push(`${slave.slaveName}'s ripped abs can be glimpsed beneath ${his} massive tits.`);
						} else if (slave.boobs > 4000) {
							r.push(`${slave.slaveName}'s undershirt barely conceals ${his} ripped abs.`);
						} else {
							r.push(`${slave.slaveName}'s ripped abs are completely hidden under ${his} uniform.`);
						}
					}
					break;
				case "a military uniform":
				case "a red army uniform":
				case "a mounty outfit":
				case "a confederate army uniform":
					if (slave.belly >= 1000000) {
					// WIP//
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s monolithic ${slave.inflationType}-filled belly bulges tremendously out of ${his} open tunic and undershirt.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since there is no chance of closing the buttons over ${his} monolithic ${slave.inflationType}-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since there is no chance of closing the buttons over ${his} monolithic ${slave.inflationType}-filled belly.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s monolithic implant-filled belly bulges tremendously out of ${his} open tunic and undershirt.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since there is no chance of closing the buttons over ${his} monolithic implant-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since there is no chance of closing the buttons over ${his} monolithic implant-filled belly.`);
							}
						} else {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s monolithic pregnant belly bulges tremendously out of ${his} open tunic and undershirt, giving ${his} new recruits the room they need.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since there is no chance of closing the buttons over ${his} monolithic pregnant belly. It takes full advantage of the freedom to bulge in every direction; ${his} new recruits taking as much space as they can get.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since there is no chance of closing the buttons over ${his} monolithic pregnant belly. It takes full advantage of the freedom to bulge in every direction; ${his} new recruits taking as much space as they can get.`);
							}
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s titanic ${slave.inflationType}-filled belly hangs heavily out of ${his} open tunic and undershirt.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since there is no chance of closing the buttons over ${his} titanic ${slave.inflationType}-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since there is no chance of closing the buttons over ${his} titanic ${slave.inflationType}-filled belly.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s titanic implant-filled belly hangs heavily out of ${his} open tunic and undershirt.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since there is no chance of closing the buttons over ${his} titanic implant-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since there is no chance of closing the buttons over ${his} titanic implant-filled belly.`);
							}
						} else {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s titanic pregnant belly hangs heavily out of ${his} open tunic and undershirt, giving ${his} new recruits the room they need.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since there is no chance of closing the buttons over ${his} titanic pregnant belly. It takes full advantage of the freedom to hang heavily, ${his} new recruits squirming happily.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since there is no chance of closing the buttons over ${his} titanic pregnant belly. It takes full advantage of the freedom to hang heavily, ${his} new recruits squirming happily.`);
							}
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s gigantic ${slave.inflationType}-filled belly hangs heavily out of ${his} open tunic and undershirt.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since there is no chance of closing the buttons over ${his} gigantic ${slave.inflationType}-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since there is no chance of closing the buttons over ${his} gigantic ${slave.inflationType}-filled belly.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s gigantic implant-filled belly hangs heavily out of ${his} open tunic and undershirt.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since there is no chance of closing the buttons over ${his} gigantic implant-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since there is no chance of closing the buttons over ${his} gigantic implant-filled belly.`);
							}
						} else {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s gigantic pregnant belly hangs heavily out of ${his} open tunic and undershirt.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since there is no chance of closing the buttons over ${his} gigantic pregnant belly.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since there is no chance of closing the buttons over ${his} gigantic pregnant belly.`);
							}
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s massive ${slave.inflationType}-filled belly hangs out ${his} open tunic and undershirt.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since there is no chance of closing the buttons over ${his} massive ${slave.inflationType}-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since there is no chance of closing the buttons over ${his} massive ${slave.inflationType}-filled belly.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s massive implant-filled belly hangs out ${his} open tunic and undershirt.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since there is no chance of closing the buttons over ${his} massive implant-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since there is no chance of closing the buttons over ${his} massive implant-filled belly.`);
							}
						} else {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s massive pregnant belly hangs out ${his} open tunic and undershirt.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since there is no chance of closing the buttons over ${his} massive pregnant belly.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since there is no chance of closing the buttons over ${his} massive pregnant belly.`);
							}
						}
					} else if (slave.belly >= 150000) {
						if (isBellyFluidLargest) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s giant ${slave.inflationType}-filled belly hangs out ${his} open tunic and undershirt.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since there is no chance of closing the buttons over ${his} giant ${slave.inflationType}-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since there is no chance of closing the buttons over ${his} giant ${slave.inflationType}-filled belly.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s giant implant-filled belly hangs out ${his} open tunic and undershirt.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since there is no chance of closing the buttons over ${his} giant implant-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since there is no chance of closing the buttons over ${his} giant implant-filled belly.`);
							}
						} else {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s giant pregnant belly hangs out ${his} open tunic and undershirt.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since there is no chance of closing the buttons over ${his} giant pregnant belly.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since there is no chance of closing the buttons over ${his} giant pregnant belly.`);
							}
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s giant ${slave.inflationType}-filled belly parts ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since ${his} giant ${slave.inflationType}-filled belly has triumphed over its buttons and has joined ${his} breasts in dominating ${his} tunic.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since ${his} giant ${slave.inflationType}-filled belly has triumphed over ${his} buttons.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s giant implant-filled belly parts ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since ${his} giant implant-filled belly has triumphed over its buttons and has joined ${his} breasts in dominating ${his} tunic.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since ${his} giant implant-filled belly has triumphed over ${his} buttons.`);
							}
						} else {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s giant pregnant belly parts ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since ${his} giant pregnant belly has triumphed over its buttons and has joined ${his} breasts in dominating ${his} tunic.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since ${his} giant pregnant belly has triumphed over ${his} buttons.`);
							}
						}
					} else if (slave.belly >= 45000) {
						if (isBellyFluidLargest) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s huge ${slave.inflationType}-filled belly is barely obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since ${his} huge ${slave.inflationType}-filled belly has triumphed over its buttons and has joined ${his} breasts in dominating ${his} tunic.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since ${his} huge ${slave.inflationType}-filled belly has triumphed over ${his} buttons.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s huge implant-filled belly is barely obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since ${his} huge implant-filled belly has triumphed over its buttons and has joined ${his} breasts in dominating ${his} tunic.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since ${his} huge implant-filled belly has triumphed over ${his} buttons.`);
							}
						} else {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s huge pregnant belly is barely obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt lies half open, since ${his} huge pregnant belly has triumphed over its buttons and has joined ${his} breasts in dominating ${his} tunic.`);
							} else {
								r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since ${his} huge pregnant belly has triumphed over ${his} buttons.`);
							}
						}
					} else if (slave.belly >= 30000) {
						if (isBellyFluidLargest) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s huge ${slave.inflationType}-filled belly is barely obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt barely closes as it struggles to contain ${his} huge ${slave.inflationType}-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s tunic lies half open, since ${his} huge ${slave.inflationType}-filled belly has triumphed over ${his} uniform's buttons.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s huge implant-filled belly is barely obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt barely closes as it struggles to contain ${his} huge implant-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s tunic lies half open, since ${his} huge implant-filled belly has triumphed over ${his} uniform's buttons.`);
							}
						} else {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s huge pregnant belly is barely obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt barely closes as it struggles to contain ${his} huge pregnant belly.`);
							} else {
								r.push(`${slave.slaveName}'s tunic lies half open, since ${his} huge pregnant belly has triumphed over ${his} uniform's buttons.`);
							}
						}
					} else if (slave.weight > 190) {
						if (slave.boobs > 12000) {
							r.push(`${slave.slaveName}'s massively fat belly is barely obscured by ${his} massive tits and, in turn, obscures ${his} skirt.`);
						} else if (slave.boobs > 4000) {
							r.push(`${slave.slaveName}'s undershirt lies half open, since ${his} massively fat belly has triumphed over ${his} buttons. It hangs free, obscuring ${his} skirt.`);
						} else {
							r.push(`${slave.slaveName}'s tunic and undershirt lie half open, since ${his} massively fat belly has triumphed over ${his} buttons. It hangs free, obscuring ${his} skirt.`);
						}
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s huge pregnant belly is barely obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt strains to contain ${his} huge pregnant belly.`);
							} else {
								r.push(`${slave.slaveName}'s huge pregnant belly threatens to pop the buttons off ${his} uniform's jacket.`);
							}
						} else if (isBellyFluidLargest) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s huge ${slave.inflationType}-filled belly is barely obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt strains to contain ${his} huge ${slave.inflationType}-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s huge ${slave.inflationType}-filled belly threatens to pop the buttons off ${his} uniform's jacket.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s huge implant-filled belly is barely obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt strains to contain ${his} huge implant-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s huge implant-filled belly threatens to pop the buttons off ${his} uniform's jacket.`);
							}
						} else {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s huge pregnant belly is barely obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt strains to contain ${his} huge pregnant belly.`);
							} else {
								r.push(`${slave.slaveName}'s huge pregnant belly threatens to pop the buttons off ${his} uniform's jacket.`);
							}
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s big pregnant belly is obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt strains to contain ${his} big pregnant belly.`);
							} else {
								r.push(`${slave.slaveName}'s big pregnant belly greatly stretches ${his} uniform's jacket.`);
							}
						} else if (isBellyFluidLargest) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s hugely swollen belly is obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt strains to contain ${his} hugely swollen belly.`);
							} else {
								r.push(`${slave.slaveName}'s hugely swollen belly greatly stretches ${his} uniform's jacket.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s big implant-filled belly is obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt strains to contain ${his} big implant-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s big implant-filled belly greatly stretches ${his} uniform's jacket.`);
							}
						} else {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s big pregnant belly is obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt strains to contain ${his} big pregnant belly.`);
							} else {
								r.push(`${slave.slaveName}'s big pregnant belly greatly stretches ${his} uniform's jacket.`);
							}
						}
					} else if (slave.weight > 160) {
						if (slave.boobs > 12000) {
							r.push(`${slave.slaveName}'s hugely fat belly is obscured by ${his} massive tits.`);
						} else if (slave.boobs > 4000) {
							r.push(`${slave.slaveName}'s undershirt strains to contain ${his} hugely fat belly, forcing fat to bulge between the overworked buttons. The bottom of it peeks out from under ${his} poor top, obscuring the waist of ${his} skirt.`);
						} else {
							r.push(`${slave.slaveName}'s hugely fat belly distends ${his} uniform's jacket, the bottom of which hangs out from under it, obscuring the waist of ${his} skirt.`);
						}
					} else if (slave.weight > 130) {
						if (slave.boobs > 12000) {
							r.push(`${slave.slaveName}'s big fat belly is obscured by ${his} massive tits.`);
						} else if (slave.boobs > 4000) {
							r.push(`${slave.slaveName}'s undershirt strains to contain ${his} big fat belly, the bottom of which peeks out from under it and hangs over the waist of ${his} skirt.`);
						} else {
							r.push(`${slave.slaveName}'s big fat belly is notably distends ${his} uniform's jacket, the bottom of which just barely peeks out from under it, hanging over the waist of ${his} skirt.`);
						}
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s pregnant belly is obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt strains to contain ${his} pregnant belly.`);
							} else {
								r.push(`${slave.slaveName}'s pregnant belly notably distends ${his} uniform's jacket.`);
							}
						} else if (isBellyFluidLargest) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s jiggling ${slave.inflationType}-filled belly is obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt strains to contain ${his} jiggling ${slave.inflationType}-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s jiggling ${slave.inflationType}-filled belly notably distends ${his} uniform's jacket.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s implant-filled belly is obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt strains to contain ${his} implant-filled belly.`);
							} else {
								r.push(`${slave.slaveName}'s implant-filled belly notably distends ${his} uniform's jacket.`);
							}
						} else {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s pregnant belly is obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt strains to contain ${his} pregnant belly.`);
							} else {
								r.push(`${slave.slaveName}'s pregnant belly notably distends ${his} uniform's jacket.`);
							}
						}
					} else if (slave.weight > 95) {
						if (slave.boobs > 12000) {
							r.push(`${slave.slaveName}'s fat belly is obscured by ${his} massive tits.`);
						} else if (slave.boobs > 4000) {
							r.push(`${slave.slaveName}'s undershirt struggles to cover ${his} fat belly, the bottom of which peeks out from under it.`);
						} else {
							r.push(`${slave.slaveName}'s fat belly is covered by ${his} uniform's jacket, the bottom of which just barely peeks out from under it.`);
						}
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s small pregnant belly is obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt covers ${his} small pregnant belly.`);
							} else {
								r.push(`${slave.slaveName}'s uniform covers ${his} small pregnant belly.`);
							}
						} else if (isBellyFluidLargest) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s ${slave.inflationType}-swollen belly is obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt covers ${his} ${slave.inflationType}-swollen belly.`);
							} else {
								r.push(`${slave.slaveName}'s uniform covers ${his} ${slave.inflationType}-swollen belly.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s implant-rounded belly is obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt covers ${his} implant-rounded belly.`);
							} else {
								r.push(`${slave.slaveName}'s uniform covers ${his} implant-rounded belly.`);
							}
						} else {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s growing belly is obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s undershirt covers ${his} growing belly.`);
							} else {
								r.push(`${slave.slaveName}'s uniform covers ${his} growing belly.`);
							}
						}
					} else if (slave.weight > 30) {
						if (slave.boobs > 12000) {
							r.push(`${slave.slaveName}'s chubby belly is obscured by ${his} massive tits.`);
						} else if (slave.boobs > 4000) {
							r.push(`${slave.slaveName}'s undershirt covers ${his} chubby belly, the bottom of which just barely peeks out from under it.`);
						} else {
							r.push(`${slave.slaveName}'s uniform covers ${his} chubby belly, the bottom of which just barely peeks out from under it.`);
						}
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						if (slave.boobs > 12000) {
							r.push(`${slave.slaveName}'s slightly swollen belly can be glimpsed beneath ${his} massive tits.`);
						} else if (slave.boobs > 4000) {
							r.push(`${slave.slaveName}'s undershirt tightly hugs the slight swell to ${his} lower belly.`);
						} else {
							r.push(`${slave.slaveName}'s tunic looks a little tight around the middle.`);
						}
					} else if (slave.muscles > 30) {
						if (slave.boobs > 12000) {
							r.push(`${slave.slaveName}'s ripped abs can be glimpsed beneath ${his} massive tits.`);
						} else if (slave.boobs > 4000) {
							r.push(`${slave.slaveName}'s undershirt barely conceals ${his} ripped abs.`);
						} else {
							r.push(`${slave.slaveName}'s ripped abs are completely hidden under ${his} uniform.`);
						}
					}
					break;
				case "a nice nurse outfit":
					if (slave.belly >= 1000000) {
						if (isBellyFluidLargest) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s unfathomable, hyper-swollen, ${slave.inflationType}-filled belly parts ${his} uncovered breasts. In addition, ${he}'s left ${his} trousers unfastened to give ${his} overfilled belly more room to hang tremendously.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s oversized breasts keep ${his} scrub top far from ${his} unfathomable, hyper-swollen, ${slave.inflationType}-filled belly. In addition, ${he}'s left ${his} trousers unfastened to give ${his} overfilled belly more room to hang tremendously.`);
							} else {
								r.push(`${slave.slaveName}'s scrub top rests meekly atop ${his} unfathomable, hyper-swollen, ${slave.inflationType}-filled belly. In addition, ${he}'s left ${his} trousers unfastened to give ${his} overfilled belly more space to hang tremendously.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s unfathomable, hyper-swollen, implant-filled belly parts ${his} uncovered breasts. In addition, ${he}'s left ${his} trousers unfastened to give ${his} overfilled implant more room to hang tremendously.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s oversized breasts keep ${his} scrub top far from ${his} unfathomable, hyper-swollen, implant-filled belly. In addition, ${he}'s left ${his} trousers unfastened to give ${his} overfilled implant more room to hang tremendously.`);
							} else {
								r.push(`${slave.slaveName}'s scrub top rests meekly atop ${his} unfathomable, hyper-swollen, implant-filled belly. In addition, ${he}'s left ${his} trousers unfastened to give ${his} overfilled implant more space to hang tremendously.`);
							}
						} else {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s unfathomable, hyper-swollen pregnant belly parts ${his} uncovered breasts. In addition, ${he}'s left ${his} trousers unfastened to give ${his} overfilled womb the room it desperately needs.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s oversized breasts keep ${his} scrub top far from ${his} unfathomable, hyper-swollen pregnant belly. In addition, ${he}'s left ${his} trousers unfastened to give ${his} overfilled womb the room it desperately needs.`);
							} else {
								r.push(`${slave.slaveName}'s scrub top rests meekly atop ${his} unfathomable, hyper-swollen pregnant belly. In addition, ${he}'s left ${his} trousers unfastened to give ${his} overfilled womb the room it desperately needs.`);
							}
						}
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s monolithic ${slave.inflationType}-filled belly parts ${his} uncovered breasts. In addition, ${he}'s left ${his} trousers unfastened to give ${his} overfilled belly more room to hang tremendously.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s oversized breasts keep ${his} scrub top far from ${his} monolithic ${slave.inflationType}-filled belly. In addition, ${he}'s left ${his} trousers unfastened to give ${his} overfilled belly more room to hang tremendously.`);
							} else {
								r.push(`${slave.slaveName}'s scrub top rests meekly atop ${his} monolithic ${slave.inflationType}-filled belly. In addition, ${he}'s left ${his} trousers unfastened to give ${his} overfilled belly more space to hang tremendously.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s monolithic implant-filled belly parts ${his} uncovered breasts. In addition, ${he}'s left ${his} trousers unfastened to give ${his} overfilled implant more room to hang tremendously.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s oversized breasts keep ${his} scrub top far from ${his} monolithic implant-filled belly. In addition, ${he}'s left ${his} trousers unfastened to give ${his} overfilled implant more room to hang tremendously.`);
							} else {
								r.push(`${slave.slaveName}'s scrub top rests meekly atop ${his} monolithic implant-filled belly. In addition, ${he}'s left ${his} trousers unfastened to give ${his} overfilled implant more space to hang tremendously.`);
							}
						} else {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s monolithic pregnant belly parts ${his} uncovered breasts. In addition, ${he}'s left ${his} trousers unfastened to give ${his} overfilled womb the room it desperately needs.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s oversized breasts keep ${his} scrub top far from ${his} monolithic pregnant belly. In addition, ${he}'s left ${his} trousers unfastened to give ${his} overfilled womb the room it desperately needs.`);
							} else {
								r.push(`${slave.slaveName}'s scrub top rests meekly atop ${his} monolithic pregnant belly. In addition, ${he}'s left ${his} trousers unfastened to give ${his} overfilled womb the room it desperately needs.`);
							}
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s titanic ${slave.inflationType}-filled belly parts ${his} uncovered breasts. In addition, ${he}'s left ${his} trousers unfastened to give ${his} overfilled belly more room to hang heavily.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s oversized breasts keep ${his} scrub top far from ${his} titanic ${slave.inflationType}-filled belly. In addition, ${he}'s left ${his} trousers unfastened to give ${his} overfilled belly more room to hang heavily.`);
							} else {
								r.push(`${slave.slaveName}'s scrub top rests meekly atop ${his} titanic ${slave.inflationType}-filled belly. In addition, ${he}'s left ${his} trousers unfastened to give ${his} overfilled belly more space to hang heavily.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s titanic implant-filled belly parts ${his} uncovered breasts. In addition, ${he}'s left ${his} trousers unfastened to give ${his} overfilled implant more room to hang heavily.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s oversized breasts keep ${his} scrub top far from ${his} titanic implant-filled belly. In addition, ${he}'s left ${his} trousers unfastened to give ${his} overfilled implant more room to hang heavily.`);
							} else {
								r.push(`${slave.slaveName}'s scrub top rests meekly atop ${his} titanic implant-filled belly. In addition, ${he}'s left ${his} trousers unfastened to give ${his} overfilled implant more space to hang heavily.`);
							}
						} else {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s titanic pregnant belly parts ${his} uncovered breasts. In addition, ${he}'s left ${his} trousers unfastened to give ${his} overfilled womb the room it needs to bulge.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s oversized breasts keep ${his} scrub top far from ${his} titanic pregnant belly. In addition, ${he}'s left ${his} trousers unfastened to give ${his} overfilled womb the room it needs to bulge.`);
							} else {
								r.push(`${slave.slaveName}'s scrub top rests meekly atop ${his} titanic pregnant belly. In addition, ${he}'s left ${his} trousers unfastened to give ${his} overfilled womb the room it needs to bulge.`);
							}
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s gigantic ${slave.inflationType}-filled belly parts ${his} uncovered breasts. In addition, ${he}'s left ${his} trousers unfastened to give ${his} overfilled belly more room.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s oversized breasts keep ${his} scrub top far from ${his} gigantic ${slave.inflationType}-filled belly. In addition, ${he}'s left ${his} trousers unfastened to give ${his} overfilled belly more room.`);
							} else {
								r.push(`${slave.slaveName}'s scrub top rests meekly atop ${his} gigantic ${slave.inflationType}-filled belly. In addition, ${he}'s left ${his} trousers unfastened to give ${his} overfilled belly more space.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s gigantic implant-filled belly parts ${his} uncovered breasts. In addition, ${he}'s left ${his} trousers unfastened to give ${his} overfilled implant more room.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s oversized breasts keep ${his} scrub top far from ${his} gigantic implant-filled belly. In addition, ${he}'s left ${his} trousers unfastened to give ${his} overfilled implant more room.`);
							} else {
								r.push(`${slave.slaveName}'s scrub top rests meekly atop ${his} gigantic implant-filled belly. In addition, ${he}'s left ${his} trousers unfastened to give ${his} overfilled implant more space.`);
							}
						} else {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s gigantic pregnant belly parts ${his} uncovered breasts. In addition, ${he}'s left ${his} trousers unfastened to give ${his} overfilled womb more room to grow.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s oversized breasts keep ${his} scrub top far from ${his} gigantic pregnant belly. In addition, ${he}'s left ${his} trousers unfastened to give ${his} overfilled womb the room is needs.`);
							} else {
								r.push(`${slave.slaveName}'s scrub top rests meekly atop ${his} gigantic pregnant belly. In addition, ${he}'s left ${his} trousers unfastened to give ${his} overfilled womb more space to expand.`);
							}
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s massive ${slave.inflationType}-filled belly parts ${his} uncovered breasts. In addition, ${he}'s left ${his} trousers unfastened to give ${his} overfilled belly more room.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s oversized breasts keep ${his} scrub top far from ${his} massive ${slave.inflationType}-filled belly. In addition, ${he}'s left ${his} trousers unfastened to give ${his} overfilled belly more room.`);
							} else {
								r.push(`${slave.slaveName}'s scrub top rests meekly atop ${his} massive ${slave.inflationType}-filled belly. In addition, ${he}'s left ${his} trousers unfastened to give ${his} overfilled belly more space.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s massive implant-filled belly parts ${his} uncovered breasts. In addition, ${he}'s left ${his} trousers unfastened to give ${his} overfilled implant more room.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s oversized breasts keep ${his} scrub top far from ${his} massive implant-filled belly. In addition, ${he}'s left ${his} trousers unfastened to give ${his} overfilled implant more room.`);
							} else {
								r.push(`${slave.slaveName}'s scrub top rests meekly atop ${his} massive implant-filled belly. In addition, ${he}'s left ${his} trousers unfastened to give ${his} overfilled implant more space.`);
							}
						} else {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s massive pregnant belly parts ${his} uncovered breasts. In addition, ${he}'s left ${his} trousers unfastened to give ${his} overfilled womb more room.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s oversized breasts keep ${his} scrub top far from ${his} massive pregnant belly. In addition, ${he}'s left ${his} trousers unfastened to give ${his} overfilled womb more room.`);
							} else {
								r.push(`${slave.slaveName}'s scrub top rests meekly atop ${his} massive pregnant belly. In addition, ${he}'s left ${his} trousers unfastened to give ${his} overfilled womb more room.`);
							}
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s giant ${slave.inflationType}-filled belly peeks out from between ${his} massive tits. ${He} finds it impossible to fasten ${his} trousers with ${his} stomach in the way.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s nurse outfit could be called conservative, if it could cover more than half of ${his} breasts; ${his} giant ${slave.inflationType}-filled belly hangs out from under them, bulging hugely from ${his} unfastened trousers.`);
							} else {
								r.push(`${slave.slaveName}'s nurse outfit is almost conservative, though ${his} giant ${slave.inflationType}-filled belly hangs out from under ${his} top and forces ${him} to leave ${his} trousers unfastened.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s giant implant-filled belly peeks out from between ${his} massive tits. ${He} finds it impossible to fasten ${his} trousers with ${his} stomach in the way.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s nurse outfit could be called conservative, if it could cover more than half of ${his} breasts; ${his} giant implant-filled belly hangs out from under them, bulging hugely from ${his} unfastened trousers.`);
							} else {
								r.push(`${slave.slaveName}'s nurse outfit is almost conservative, though ${his} giant implant-filled belly hangs out from under ${his} top and forces ${him} to leave ${his} trousers unfastened.`);
							}
						} else {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s giant pregnant belly peeks out from between ${his} massive tits. In addition, ${he}'s left ${his} trousers unfastened to give ${his} overfilled womb more room.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s nurse outfit could be called conservative, if it could cover more than half of ${his} breasts; ${his} giant pregnant belly hangs out from under them, bulging from ${his} unfastened trousers.`);
							} else {
								r.push(`${slave.slaveName}'s nurse outfit is almost conservative, though ${his} giant pregnant belly hangs out from under ${his} top and forces ${him} to leave ${his} trousers unfastened.`);
							}
						}
					} else if (slave.weight > 190) {
						if (slave.boobs > 12000) {
							r.push(`${slave.slaveName}'s massively fat belly is partially obscured by ${his} massive tits; in turn, it obscures ${his} trousers.`);
						} else if (slave.boobs > 4000) {
							r.push(`${slave.slaveName}'s nurse outfit could be called conservative, if it could cover more than half of ${his} breasts; ${his} massively fat belly freely hangs out from under them, obscuring ${his} trousers.`);
						} else {
							r.push(`${slave.slaveName}'s scrub top rests meekly atop ${his} massively fat belly.`);
						}
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s huge pregnant belly slightly parts ${his} massive tits. ${He} finds it impossible to fasten ${his} trousers with ${his} stomach in the way.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s nurse outfit could be called conservative, if it could cover more than half of ${his} breasts; ${his} huge pregnant belly hangs out from under them, bulging from ${his} unfastened trousers.`);
							} else {
								r.push(`${slave.slaveName}'s nurse outfit is almost conservative, though ${his} huge pregnant belly hangs out from under ${his} top and forces ${him} to leave ${his} trousers unfastened.`);
							}
						} else if (isBellyFluidLargest) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s huge ${slave.inflationType}-filled belly slightly parts ${his} massive tits. ${He} finds it impossible to fasten ${his} trousers with ${his} stomach in the way.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s nurse outfit could be called conservative, if it could cover more than half of ${his} breasts; ${his} huge ${slave.inflationType}-filled belly hangs out from under them, bulging from ${his} unfastened trousers.`);
							} else {
								r.push(`${slave.slaveName}'s nurse outfit is almost conservative, though ${his} huge ${slave.inflationType}-filled belly hangs out from under ${his} top and forces ${him} to leave ${his} trousers unfastened.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s huge implant-filled belly slightly parts ${his} massive tits. ${He} finds it impossible to fasten ${his} trousers with ${his} stomach in the way.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s nurse outfit could be called conservative, if it could cover more than half of ${his} breasts; ${his} huge implant-filled belly hangs out from under them, bulging from ${his} unfastened trousers.`);
							} else {
								r.push(`${slave.slaveName}'s nurse outfit is almost conservative, though ${his} huge implant-filled belly hangs out from under ${his} top and forces ${him} to leave ${his} trousers unfastened.`);
							}
						} else {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s huge pregnant belly slightly parts ${his} massive tits. ${He} finds it impossible to fasten ${his} trousers with ${his} stomach in the way.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s nurse outfit could be called conservative, if it could cover more than half of ${his} breasts; ${his} huge pregnant belly hangs out from under them, bulging from ${his} unfastened trousers.`);
							} else {
								r.push(`${slave.slaveName}'s nurse outfit is almost conservative, though ${his} huge pregnant belly hangs out from under ${his} top and forces ${him} to leave ${his} trousers unfastened.`);
							}
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s big pregnant belly is obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s nurse outfit could be called conservative, if it could cover more than half of ${his} breasts; ${his} big pregnant belly hangs out from under them, straining the buttons on ${his} trousers.`);
							} else {
								r.push(`${slave.slaveName}'s nurse outfit is almost conservative, though ${his} big pregnant belly hangs out from under ${his} top, straining the buttons on ${his} trousers.`);
							}
						} else if (isBellyFluidLargest) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s hugely swollen belly is obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s nurse outfit could be called conservative, if it could cover more than half of ${his} breasts; ${his} hugely swollen belly hangs out from under them, obscuring ${his} trousers.`);
							} else {
								r.push(`${slave.slaveName}'s nurse outfit is almost conservative, though ${his} hugely swollen belly hangs out from under ${his} top, obscuring ${his} trousers.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s huge implant-filled belly is obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s nurse outfit could be called conservative, if it could cover more than half of ${his} breasts; ${his} huge implant-filled belly hangs out from under them, straining the buttons on ${his} trousers.`);
							} else {
								r.push(`${slave.slaveName}'s nurse outfit is almost conservative, though ${his} huge implant-filled belly hangs out from under ${his} top, straining the buttons on ${his} trousers.`);
							}
						} else {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s big pregnant belly is obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s nurse outfit could be called conservative, if it could cover more than half of ${his} breasts; ${his} big pregnant belly hangs out from under them, straining the buttons on ${his} trousers.`);
							} else {
								r.push(`${slave.slaveName}'s nurse outfit is almost conservative, though ${his} big pregnant belly hangs out from under ${his} top, straining the buttons on ${his} trousers.`);
							}
						}
					} else if (slave.weight > 160) {
						if (slave.boobs > 12000) {
							r.push(`${slave.slaveName}'s hugely fat belly is mostly obscured by ${his} massive tits.`);
						} else if (slave.boobs > 4000) {
							r.push(`${slave.slaveName}'s nurse outfit could be called conservative, if it could cover more than half of ${his} breasts; ${his} hugely fat belly freely hangs out from under them, obscuring ${his} trousers.`);
						} else {
							r.push(`${slave.slaveName}'s nurse outfit is almost conservative, though ${his} hugely fat belly freely hangs from under ${his} top, obscuring ${his} trousers.`);
						}
					} else if (slave.weight > 130) {
						if (slave.boobs > 12000) {
							r.push(`${slave.slaveName}'s big fat belly is obscured by ${his} massive tits.`);
						} else if (slave.boobs > 4000) {
							r.push(`${slave.slaveName}'s nurse outfit could be called conservative, if it could cover more than half of ${his} breasts; ${his} big fat belly freely hangs out from under them, obscuring ${his} trousers.`);
						} else {
							r.push(`${slave.slaveName}'s nurse outfit is almost conservative, though ${his} big fat belly freely hangs from under ${his} top, obscuring ${his} trousers.`);
						}
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s pregnant belly is obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s nurse outfit could be called conservative, if it could cover more than half of ${his} breasts; ${his} pregnant belly hangs out from under them, slightly obscuring ${his} trousers.`);
							} else {
								r.push(`${slave.slaveName}'s nurse outfit is almost conservative, though ${his} pregnancy hangs out from under ${his} top, slightly obscuring ${his} trousers.`);
							}
						} else if (isBellyFluidLargest) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s jiggling ${slave.inflationType}-filled belly is obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s nurse outfit could be called conservative, if it could cover more than half of ${his} breasts; ${his} jiggling ${slave.inflationType}-filled belly hangs out from under them, slightly obscuring ${his} trousers.`);
							} else {
								r.push(`${slave.slaveName}'s nurse outfit is almost conservative, though ${his} jiggling ${slave.inflationType}-filled hangs out from under ${his} top, slightly obscuring ${his} trousers.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s implant-filled belly is obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s nurse outfit could be called conservative, if it could cover more than half of ${his} breasts; ${his} implant-filled belly hangs out from under them, slightly obscuring ${his} trousers.`);
							} else {
								r.push(`${slave.slaveName}'s nurse outfit is almost conservative, though ${his} implant-filled belly hangs out from under ${his} top, slightly obscuring ${his} trousers.`);
							}
						} else {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s pregnant belly is obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s nurse outfit could be called conservative, if it could cover more than half of ${his} breasts; ${his} pregnant belly hangs out from under them, slightly obscuring ${his} trousers.`);
							} else {
								r.push(`${slave.slaveName}'s nurse outfit is almost conservative, though ${his} pregnancy hangs out from under ${his} top, slightly obscuring ${his} trousers.`);
							}
						}
					} else if (slave.weight > 95) {
						if (slave.boobs > 12000) {
							r.push(`${slave.slaveName}'s fat belly is obscured by ${his} massive tits.`);
						} else if (slave.boobs > 4000) {
							r.push(`${slave.slaveName}'s nurse outfit could be called conservative, if it could cover more than half of ${his} breasts; ${his} fat belly freely hangs out from under them, obscuring ${his} trousers.`);
						} else {
							r.push(`${slave.slaveName}'s nurse outfit is almost conservative, though ${his} fat belly freely hangs from under ${his} top, obscuring ${his} trousers.`);
						}
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s small pregnant belly is obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s nurse outfit could be called conservative, if it could cover more than half of ${his} breasts; ${his} small pregnant belly is completely exposed.`);
							} else {
								r.push(`${slave.slaveName}'s nurse outfit is almost conservative, it covers ${his} small pregnant belly completely.`);
							}
						} else if (isBellyFluidLargest) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s ${slave.inflationType}-swollen belly is obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s nurse outfit could be called conservative, if it could cover more than half of ${his} breasts; ${his} ${slave.inflationType}-swollen belly is completely exposed.`);
							} else {
								r.push(`${slave.slaveName}'s nurse outfit is almost conservative, it covers ${his} ${slave.inflationType}-swollen belly completely.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s implant-rounded belly is obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s nurse outfit could be called conservative, if it could cover more than half of ${his} breasts; ${his} implant-rounded belly is completely exposed.`);
							} else {
								r.push(`${slave.slaveName}'s nurse outfit is almost conservative, it covers ${his} implant-rounded belly completely.`);
							}
						} else {
							if (slave.boobs > 12000) {
								r.push(`${slave.slaveName}'s growing belly is obscured by ${his} massive tits.`);
							} else if (slave.boobs > 4000) {
								r.push(`${slave.slaveName}'s nurse outfit could be called conservative, if it could cover more than half of ${his} breasts; ${his} growing belly is completely exposed.`);
							} else {
								r.push(`${slave.slaveName}'s nurse outfit is almost conservative, it covers ${his} growing belly completely.`);
							}
						}
					} else if (slave.weight > 30) {
						if (slave.boobs > 12000) {
							r.push(`${slave.slaveName}'s chubby belly is obscured by ${his} massive tits.`);
						} else if (slave.boobs > 4000) {
							r.push(`${slave.slaveName}'s nurse outfit could be called conservative, if it could cover more than half of ${his} breasts; ${his} chubby belly is completely exposed and allowed to hang over the waist of ${his} trousers.`);
						} else {
							r.push(`${slave.slaveName}'s nurse outfit is almost conservative, it covers ${his} chubby belly completely; though it does hide the top of ${his} trousers.`);
						}
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						if (slave.boobs > 12000) {
							r.push(`${slave.slaveName}'s slightly swollen belly is obscured by ${his} massive tits.`);
						} else if (slave.boobs > 4000) {
							r.push(`${slave.slaveName}'s nurse outfit could be called conservative, if it could cover more than half of ${his} breasts; ${his} slightly swollen belly can be clearly seen poking over ${his} trousers.`);
						} else {
							r.push(`${slave.slaveName}'s nurse outfit is almost conservative, though ${his} trousers are fastened a little lower and ${his} scrub top tightly clings to the slight swell of ${his} lower belly.`);
						}
					} else if (slave.muscles > 30) {
						if (slave.boobs > 12000) {
							r.push(`${slave.slaveName}'s ripped abs are mostly obscured by ${his} massive tits.`);
						} else if (slave.boobs > 4000) {
							r.push(`${slave.slaveName}'s nurse outfit could be called conservative, if it could cover more than half of ${his} breasts; ${his} ripped abs are completely exposed for all to see.`);
						} else {
							r.push(`${slave.slaveName}'s nurse outfit is almost conservative, though you can nearly make out ${his} ripped abs beneath ${his} scrub top.`);
						}
					}
					break;
				case "a mini dress":
					if (slave.belly >= 1000000) {
					// WIP//
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s mini dress is specially tailored to fit such a dangerously gravid ${girl}. It tightly clings to ${his} monolithic ${slave.inflationType}-filled belly and draws the eye right to ${his} protruding navel.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s mini dress is specially tailored to fit such a dangerously gravid ${girl}. It tightly clings to ${his} monolithic implant-filled belly and draws the eye right to ${his} protruding navel.`);
						} else {
							r.push(`${slave.slaveName}'s mini dress is specially tailored to fit such a dangerously gravid ${girl}. It tightly clings to ${his} monolithic pregnant belly, drawing the eye to ${his} protruding navel, the clear bulges of the life growing within ${him}, and every slight twitch inside ${his} taut middle.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s mini dress is specially tailored to fit such an absurdly gravid ${girl}. It tightly clings to ${his} titanic ${slave.inflationType}-filled belly and draws the eye right to ${his} protruding navel.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s mini dress is specially tailored to fit such an absurdly gravid ${girl}. It tightly clings to ${his} titanic implant-filled belly and draws the eye right to ${his} protruding navel.`);
						} else {
							r.push(`${slave.slaveName}'s mini dress is specially tailored to fit such an absurdly gravid ${girl}. It tightly clings to ${his} titanic pregnant belly, drawing the eye to ${his} protruding navel, the bulges of the life growing within ${him}, and every kick and squirm inside ${his} straining middle.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s mini dress is specially tailored to fit such a massively gravid ${girl}. It tightly clings to ${his} gigantic ${slave.inflationType}-filled belly and draws the eye right to ${his} protruding navel.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s mini dress is specially tailored to fit such a massively gravid ${girl}. It tightly clings to ${his} gigantic implant-filled belly and draws the eye right to ${his} protruding navel.`);
						} else {
							r.push(`${slave.slaveName}'s mini dress is specially tailored to fit such a massively gravid ${girl}. It tightly clings to ${his} gigantic pregnant belly, drawing the eye to ${his} protruding navel, the outlines of the life within ${him}, and every kick and squirm inside ${his} straining middle.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s mini dress is specially tailored to fit such a hugely gravid ${girl}. It tightly clings to ${his} massive ${slave.inflationType}-filled belly and draws the eye right to ${his} protruding navel.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s mini dress is specially tailored to fit such a hugely gravid ${girl}. It tightly clings to ${his} massive implant-filled belly and draws the eye right to ${his} protruding navel.`);
						} else {
							r.push(`${slave.slaveName}'s mini dress is specially tailored to fit such a hugely gravid ${girl}. It tightly clings to ${his} massive pregnant belly, drawing the eye to ${his} protruding navel and clearly showing every kick and squirm inside ${his} bulging middle.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s mini dress is specially tailored to fit such a hugely gravid ${girl}. It tightly clings to ${his} giant ${slave.inflationType}-filled belly and draws the eye right to ${his} protruding navel.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s mini dress is specially tailored to fit such a hugely gravid ${girl}. It tightly clings to ${his} giant implant-filled belly and draws the eye right to ${his} protruding navel.`);
						} else {
							r.push(`${slave.slaveName}'s mini dress is specially tailored to fit such a hugely gravid ${girl}. It tightly clings to ${his} giant pregnant belly, drawing the eye to ${his} protruding navel and clearly showing every kick and squirm inside ${his} bulging middle.`);
						}
					} else if (slave.belly >= 30000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s mini dress is specially tailored to fit such a gravid ${girl}. It tightly clings to ${his} huge ${slave.inflationType}-filled belly and draws the eye right to ${his} protruding navel.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s mini dress is specially tailored to fit such a gravid ${girl}. It tightly clings to ${his} huge implant-filled belly and draws the eye right to ${his} protruding navel.`);
						} else {
							r.push(`${slave.slaveName}'s mini dress is specially tailored to fit such a gravid ${girl}. It tightly clings to ${his} huge pregnant belly, drawing the eye to ${his} protruding navel and clearly showing every kick and squirm inside ${his} bulging middle.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s mini dress strains to contain ${his} massively fat belly, clearly showing all ${his} folds and rolls. Flab forces its way through every growing tear in ${his} seams; a growing nuisance, as the outfit must be restitched frequently.`);
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s mini dress tightly clings to ${his} huge pregnant belly and frequently rides up far enough to show off ${his} privates.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s mini dress tightly clings to ${his} huge ${slave.inflationType}-filled belly and frequently rides up far enough to show off ${his} privates.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s mini dress tightly clings to ${his} huge implant-filled belly and frequently rides up far enough to show off ${his} privates.`);
						} else {
							r.push(`${slave.slaveName}'s mini dress tightly clings to ${his} huge pregnant belly and frequently rides up far enough to show off ${his} privates.`);
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s mini dress tightly clings to ${his} big pregnant belly, leaving it looking much shorter than it really is.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s mini dress barely clings to ${his} hugely swollen belly, leaving it looking much shorter than it really is.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s mini dress barely clings to ${his} big implant-filled belly, leaving it looking much shorter than it really is.`);
						} else {
							r.push(`${slave.slaveName}'s mini dress tightly clings to ${his} big pregnant belly, leaving it looking much shorter than it really is.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s mini dress barely clings to ${his} hugely fat belly, clearly showing all ${his} folds and rolls.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s mini dress tightly clings to ${his} big fat belly, clearly showing all ${his} folds and rolls.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s mini dress tightly clings to ${his} pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s mini dress tightly clings to ${his} jiggling ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s mini dress tightly clings to ${his} implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s mini dress tightly clings to ${his} pregnant belly.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s mini dress tightly clings to ${his} fat belly, clearly showing every fold and roll.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s mini dress tightly clings to ${his} small pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s mini dress tightly clings to ${his} ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s mini dress tightly clings to ${his} implant-rounded belly.`);
						} else {
							r.push(`${slave.slaveName}'s mini dress tightly clings to ${his} growing belly.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s mini dress tightly clings to ${his} chubby belly, clearly showing every fold and roll.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s mini dress tightly clings to ${his} belly, clearly showing the slight swell beneath ${his} navel.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s mini dress tightly clings to ${his} ripped abs, clearly displaying ${his} six pack.`);
					}
					break;
				case "lederhosen":
					if (slave.belly >= 1000000) {
					// WIP//
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s tunic is specially tailored to fit such a dangerously gravid ${girl}. It tightly clings to ${his} monolithic ${slave.inflationType}-filled belly and draws the eye right to ${his} protruding navel.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s tunic is specially tailored to fit such a dangerously gravid ${girl}. It tightly clings to ${his} monolithic implant-filled belly and draws the eye right to ${his} protruding navel.`);
						} else {
							r.push(`${slave.slaveName}'s tunic is specially tailored to fit such a dangerously gravid ${girl}. It tightly clings to ${his} monolithic pregnant belly, drawing the eye to ${his} protruding navel, the clear bulges of the life growing within ${him}, and every slight twitch inside ${his} taut middle.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s tunic is specially tailored to fit such an absurdly gravid ${girl}. It tightly clings to ${his} titanic ${slave.inflationType}-filled belly and draws the eye right to ${his} protruding navel.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s tunic is specially tailored to fit such an absurdly gravid ${girl}. It tightly clings to ${his} titanic implant-filled belly and draws the eye right to ${his} protruding navel.`);
						} else {
							r.push(`${slave.slaveName}'s tunic is specially tailored to fit such an absurdly gravid ${girl}. It tightly clings to ${his} titanic pregnant belly, drawing the eye to ${his} protruding navel, the bulges of the life growing within ${him}, and every kick and squirm inside ${his} straining middle.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s tunic is specially tailored to fit such a massively gravid ${girl}. It tightly clings to ${his} gigantic ${slave.inflationType}-filled belly and draws the eye right to ${his} protruding navel.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s tunic is specially tailored to fit such a massively gravid ${girl}. It tightly clings to ${his} gigantic implant-filled belly and draws the eye right to ${his} protruding navel.`);
						} else {
							r.push(`${slave.slaveName}'s tunic is specially tailored to fit such a massively gravid ${girl}. It tightly clings to ${his} gigantic pregnant belly, drawing the eye to ${his} protruding navel, the outlines of the life within ${him}, and every kick and squirm inside ${his} straining middle.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s tunic is specially tailored to fit such a hugely gravid ${girl}. It tightly clings to ${his} massive ${slave.inflationType}-filled belly and draws the eye right to ${his} protruding navel.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s tunic is specially tailored to fit such a hugely gravid ${girl}. It tightly clings to ${his} massive implant-filled belly and draws the eye right to ${his} protruding navel.`);
						} else {
							r.push(`${slave.slaveName}'s tunic is specially tailored to fit such a hugely gravid ${girl}. It tightly clings to ${his} massive pregnant belly, drawing the eye to ${his} protruding navel and clearly showing every kick and squirm inside ${his} bulging middle.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s tunic is specially tailored to fit such a hugely gravid ${girl}. It tightly clings to ${his} giant ${slave.inflationType}-filled belly and draws the eye right to ${his} protruding navel.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s tunic is specially tailored to fit such a hugely gravid ${girl}. It tightly clings to ${his} giant implant-filled belly and draws the eye right to ${his} protruding navel.`);
						} else {
							r.push(`${slave.slaveName}'s tunic is specially tailored to fit such a hugely gravid ${girl}. It tightly clings to ${his} giant pregnant belly, drawing the eye to ${his} protruding navel and clearly showing every kick and squirm inside ${his} bulging middle.`);
						}
					} else if (slave.belly >= 30000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s tunic is specially tailored to fit such a gravid ${girl}. It tightly clings to ${his} huge ${slave.inflationType}-filled belly and draws the eye right to ${his} protruding navel.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s tunic is specially tailored to fit such a gravid ${girl}. It tightly clings to ${his} huge implant-filled belly and draws the eye right to ${his} protruding navel.`);
						} else {
							r.push(`${slave.slaveName}'s tunic is specially tailored to fit such a gravid ${girl}. It tightly clings to ${his} huge pregnant belly, drawing the eye to ${his} protruding navel and clearly showing every kick and squirm inside ${his} bulging middle.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s tunic strains to contain ${his} massively fat belly, clearly showing all ${his} folds and rolls. Flab forces its way through every growing tear in ${his} seams; a growing nuisance, as the outfit must be restitched frequently.`);
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s tunic tightly clings to ${his} huge pregnant belly and frequently rides up far enough to show off ${his} privates.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s tunic tightly clings to ${his} huge ${slave.inflationType}-filled belly and frequently rides up far enough to show off ${his} privates.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s tunic tightly clings to ${his} huge implant-filled belly and frequently rides up far enough to show off ${his} privates.`);
						} else {
							r.push(`${slave.slaveName}'s tunic tightly clings to ${his} huge pregnant belly and frequently rides up far enough to show off ${his} privates.`);
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s tunic tightly clings to ${his} big pregnant belly, leaving it looking much shorter than it really is.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s tunic barely clings to ${his} hugely swollen belly, leaving it looking much shorter than it really is.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s tunic barely clings to ${his} huge implant-filled belly, leaving it looking much shorter than it really is.`);
						} else {
							r.push(`${slave.slaveName}'s tunic tightly clings to ${his} big pregnant belly, leaving it looking much shorter than it really is.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s tunic barely clings to ${his} hugely fat belly, clearly showing all ${his} folds and rolls.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s tunic tightly clings to ${his} big fat belly, clearly showing all ${his} folds and rolls.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s tunic tightly clings to ${his} pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s tunic tightly clings to ${his} jiggling ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s tunic tightly clings to ${his} implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s tunic tightly clings to ${his} pregnant belly.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s tunic tightly clings to ${his} fat belly, clearly showing every fold and roll.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s tunic tightly clings to ${his} small pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s tunic tightly clings to ${his} ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s tunic tightly clings to ${his} implant-rounded belly.`);
						} else {
							r.push(`${slave.slaveName}'s tunic tightly clings to ${his} growing belly.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s tunic tightly clings to ${his} chubby belly, clearly showing every fold and roll.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s tunic tightly clings to ${his} belly, clearly showing the slight swell beneath ${his} navel.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s tunic tightly clings to ${his} ripped abs, clearly displaying ${his} six pack.`);
					}
					break;
				case "a long qipao":
				case "a biyelgee costume":
				case "a dirndl":
					if (slave.belly >= 1000000) {
					// WIP//
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s dress is specially tailored to fit such a dangerously gravid ${girl}. It tightly clings to ${his} monolithic ${slave.inflationType}-filled belly and draws the eye right to ${his} protruding navel.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s dress is specially tailored to fit such a dangerously gravid ${girl}. It tightly clings to ${his} monolithic implant-filled belly and draws the eye right to ${his} protruding navel.`);
						} else {
							r.push(`${slave.slaveName}'s dress is specially tailored to fit such a dangerously gravid ${girl}. It tightly clings to ${his} monolithic pregnant belly, drawing the eye to ${his} protruding navel, the clear bulges of the life growing within ${him}, and every slight twitch inside ${his} taut middle.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s dress is specially tailored to fit such an absurdly gravid ${girl}. It tightly clings to ${his} titanic ${slave.inflationType}-filled belly and draws the eye right to ${his} protruding navel.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s dress is specially tailored to fit such an absurdly gravid ${girl}. It tightly clings to ${his} titanic implant-filled belly and draws the eye right to ${his} protruding navel.`);
						} else {
							r.push(`${slave.slaveName}'s dress is specially tailored to fit such an absurdly gravid ${girl}. It tightly clings to ${his} titanic pregnant belly, drawing the eye to ${his} protruding navel, the bulges of the life growing within ${him}, and every kick and squirm inside ${his} straining middle.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s dress is specially tailored to fit such a massively gravid ${girl}. It tightly clings to ${his} gigantic ${slave.inflationType}-filled belly and draws the eye right to ${his} protruding navel.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s dress is specially tailored to fit such a massively gravid ${girl}. It tightly clings to ${his} gigantic implant-filled belly and draws the eye right to ${his} protruding navel.`);
						} else {
							r.push(`${slave.slaveName}'s dress is specially tailored to fit such a massively gravid ${girl}. It tightly clings to ${his} gigantic pregnant belly, drawing the eye to ${his} protruding navel, the outlines of the life within ${him}, and every kick and squirm inside ${his} straining middle.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s dress is specially tailored to fit such a hugely gravid ${girl}. It tightly clings to ${his} massive ${slave.inflationType}-filled belly and draws the eye right to ${his} protruding navel.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s dress is specially tailored to fit such a hugely gravid ${girl}. It tightly clings to ${his} massive implant-filled belly and draws the eye right to ${his} protruding navel.`);
						} else {
							r.push(`${slave.slaveName}'s dress is specially tailored to fit such a hugely gravid ${girl}. It tightly clings to ${his} massive pregnant belly, drawing the eye to ${his} protruding navel and clearly showing every kick and squirm inside ${his} bulging middle.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s dress is specially tailored to fit such a hugely gravid ${girl}. It tightly clings to ${his} giant ${slave.inflationType}-filled belly and draws the eye right to ${his} protruding navel.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s dress is specially tailored to fit such a hugely gravid ${girl}. It tightly clings to ${his} giant implant-filled belly and draws the eye right to ${his} protruding navel.`);
						} else {
							r.push(`${slave.slaveName}'s dress is specially tailored to fit such a hugely gravid ${girl}. It tightly clings to ${his} giant pregnant belly, drawing the eye to ${his} protruding navel and clearly showing every kick and squirm inside ${his} bulging middle.`);
						}
					} else if (slave.belly >= 30000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s dress is specially tailored to fit such a gravid ${girl}. It tightly clings to ${his} huge ${slave.inflationType}-filled belly and draws the eye right to ${his} protruding navel.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s dress is specially tailored to fit such a gravid ${girl}. It tightly clings to ${his} huge implant-filled belly and draws the eye right to ${his} protruding navel.`);
						} else {
							r.push(`${slave.slaveName}'s dress is specially tailored to fit such a gravid ${girl}. It tightly clings to ${his} huge pregnant belly, drawing the eye to ${his} protruding navel and clearly showing every kick and squirm inside ${his} bulging middle.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s dress strains to contain ${his} massively fat belly, clearly showing all ${his} folds and rolls. Flab forces its way through every growing tear in ${his} seams; a growing nuisance, as the outfit must be restitched frequently.`);
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s dress tightly clings to ${his} huge pregnant belly and frequently rides up far enough to show off ${his} privates.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s dress tightly clings to ${his} huge ${slave.inflationType}-filled belly and frequently rides up far enough to show off ${his} privates.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s dress tightly clings to ${his} huge implant-filled belly and frequently rides up far enough to show off ${his} privates.`);
						} else {
							r.push(`${slave.slaveName}'s dress tightly clings to ${his} huge pregnant belly and frequently rides up far enough to show off ${his} privates.`);
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s dress tightly clings to ${his} big pregnant belly, leaving it looking much shorter than it really is.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s dress barely clings to ${his} hugely swollen belly, leaving it looking much shorter than it really is.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s dress barely clings to ${his} huge implant-filled belly, leaving it looking much shorter than it really is.`);
						} else {
							r.push(`${slave.slaveName}'s dress tightly clings to ${his} big pregnant belly, leaving it looking much shorter than it really is.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s dress barely clings to ${his} hugely fat belly, clearly showing all ${his} folds and rolls.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s dress tightly clings to ${his} big fat belly, clearly showing all ${his} folds and rolls.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s dress tightly clings to ${his} pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s dress tightly clings to ${his} jiggling ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s dress tightly clings to ${his} implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s dress tightly clings to ${his} pregnant belly.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s dress tightly clings to ${his} fat belly, clearly showing every fold and roll.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s dress tightly clings to ${his} small pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s dress tightly clings to ${his} ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s dress tightly clings to ${his} implant-rounded belly.`);
						} else {
							r.push(`${slave.slaveName}'s dress tightly clings to ${his} growing belly.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s dress tightly clings to ${his} chubby belly, clearly showing every fold and roll.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s dress tightly clings to ${his} belly, clearly showing the slight swell beneath ${his} navel.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s dress tightly clings to ${his} ripped abs, clearly displaying ${his} six pack.`);
					}
					break;
				case "battlearmor":
					if (slave.belly >= 1000000) {
						if (isBellyFluidLargest) {
							r.push(`Traditional battle armor would be useless on ${slave.slaveName}'s unfathomable, hyper-swollen, ${slave.inflationType}-filled belly. Instead, ${he} wears armor more suited to protecting an industrial tanker truck rather than a human being, complete with an internal mechanical frame designed to draw the shock of physical blows away from ${his} dangerously pressurized ${slave.inflationType} and special hookups to optimize the value of mobility aids.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`Traditional battle armor would be useless on ${slave.slaveName}'s unfathomable, hyper-swollen, implant-filled belly. Instead, ${he} wears armor more suited to protecting an industrial tanker truck rather than a human being, complete with an internal mechanical frame designed to draw the shock of physical blows away from ${his} dangerously pressurized implant and special hookups to optimize the value of mobility aids.`);
						} else {
							r.push(`Traditional battle armor would be useless on ${slave.slaveName}'s unfathomable, hyper-swollen pregnant belly. Instead, ${he} wears armor more suited to protecting an industrial tanker truck rather than a human being, complete with an internal mechanical frame designed to draw the shock of physical blows away from ${his} dangerously pressurized womb and innumerable brood of squirming children, as well as special hookups to optimize the value of mobility aids.`);
						}
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s armor is specially tailored to fit such a dangerously gravid ${girl}. It tightly clings to ${his} monolithic ${slave.inflationType}-filled belly and draws the eye right to ${his} protruding navel.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s armor is specially tailored to fit such a dangerously gravid ${girl}. It tightly clings to ${his} monolithic implant-filled belly and draws the eye right to ${his} protruding navel.`);
						} else {
							r.push(`${slave.slaveName}'s armor is specially tailored to fit such a dangerously gravid ${girl}. It tightly clings to ${his} monolithic pregnant belly, drawing the eye to ${his} protruding navel, the clear bulges of the life growing within ${him}, and every slight twitch inside ${his} taut middle.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s armor is specially tailored to fit such an absurdly gravid ${girl}. It tightly clings to ${his} titanic ${slave.inflationType}-filled belly and draws the eye right to ${his} protruding navel.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s armor is specially tailored to fit such an absurdly gravid ${girl}. It tightly clings to ${his} titanic implant-filled belly and draws the eye right to ${his} protruding navel.`);
						} else {
							r.push(`${slave.slaveName}'s armor is specially tailored to fit such an absurdly gravid ${girl}. It tightly clings to ${his} titanic pregnant belly, drawing the eye to ${his} protruding navel, the bulges of the life growing within ${him}, and every kick and squirm inside ${his} straining middle.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s armor is specially tailored to fit such a massively gravid ${girl}. It tightly clings to ${his} gigantic ${slave.inflationType}-filled belly and draws the eye right to ${his} protruding navel.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s armor is specially tailored to fit such a massively gravid ${girl}. It tightly clings to ${his} gigantic implant-filled belly and draws the eye right to ${his} protruding navel.`);
						} else {
							r.push(`${slave.slaveName}'s armor is specially tailored to fit such a massively gravid ${girl}. It tightly clings to ${his} gigantic pregnant belly, drawing the eye to ${his} protruding navel, the outlines of the life within ${him}, and every kick and squirm inside ${his} straining middle.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s armor is specially tailored to fit such a hugely gravid ${girl}. It tightly clings to ${his} massive ${slave.inflationType}-filled belly and draws the eye right to ${his} protruding navel.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s armor is specially tailored to fit such a hugely gravid ${girl}. It tightly clings to ${his} massive implant-filled belly and draws the eye right to ${his} protruding navel.`);
						} else {
							r.push(`${slave.slaveName}'s armor is specially tailored to fit such a hugely gravid ${girl}. It tightly clings to ${his} massive pregnant belly, drawing the eye to ${his} protruding navel and clearly showing every kick and squirm inside ${his} bulging middle.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s armor is specially tailored to fit such a hugely gravid ${girl}. It tightly clings to ${his} giant ${slave.inflationType}-filled belly and draws the eye right to ${his} protruding navel.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s armor is specially tailored to fit such a hugely gravid ${girl}. It tightly clings to ${his} giant implant-filled belly and draws the eye right to ${his} protruding navel.`);
						} else {
							r.push(`${slave.slaveName}'s armor is specially tailored to fit such a hugely gravid ${girl}. It tightly clings to ${his} giant pregnant belly, drawing the eye to ${his} protruding navel and clearly showing every kick and squirm inside ${his} bulging middle.`);
						}
					} else if (slave.belly >= 30000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s armor is specially tailored to fit such a gravid ${girl}. It tightly clings to ${his} huge ${slave.inflationType}-filled belly and draws the eye right to ${his} protruding navel.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s armor is specially tailored to fit such a gravid ${girl}. It tightly clings to ${his} huge implant-filled belly and draws the eye right to ${his} protruding navel.`);
						} else {
							r.push(`${slave.slaveName}'s armor is specially tailored to fit such a gravid ${girl}. It tightly clings to ${his} huge pregnant belly, drawing the eye to ${his} protruding navel and clearly showing every kick and squirm inside ${his} bulging middle.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s armor strains to contain ${his} massively fat belly, clearly showing all ${his} folds and rolls. Flab forces its way through every growing tear in ${his} seams; a growing nuisance, as the outfit must be restitched frequently.`);
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s armor tightly clings to ${his} huge pregnant belly and frequently rides up far enough to show off ${his} privates.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s armor tightly clings to ${his} huge ${slave.inflationType}-filled belly and frequently rides up far enough to show off ${his} privates.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s armor tightly clings to ${his} huge implant-filled belly and frequently rides up far enough to show off ${his} privates.`);
						} else {
							r.push(`${slave.slaveName}'s armor tightly clings to ${his} huge pregnant belly and frequently rides up far enough to show off ${his} privates.`);
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s armor tightly clings to ${his} big pregnant belly, leaving it looking much shorter than it really is.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s armor barely clings to ${his} hugely swollen belly, leaving it looking much shorter than it really is.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s armor barely clings to ${his} huge implant-filled belly, leaving it looking much shorter than it really is.`);
						} else {
							r.push(`${slave.slaveName}'s armor tightly clings to ${his} big pregnant belly, leaving it looking much shorter than it really is.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s armor barely clings to ${his} hugely fat belly, clearly showing all ${his} folds and rolls.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s armor tightly clings to ${his} big fat belly, clearly showing all ${his} folds and rolls.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s armor tightly clings to ${his} pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s armor tightly clings to ${his} jiggling ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s armor tightly clings to ${his} implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s armor tightly clings to ${his} pregnant belly.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s armor tightly clings to ${his} fat belly, clearly showing every fold and roll.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s armor tightly clings to ${his} small pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s armor tightly clings to ${his} ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s armor tightly clings to ${his} implant-rounded belly.`);
						} else {
							r.push(`${slave.slaveName}'s armor tightly clings to ${his} growing belly.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s armor tightly clings to ${his} chubby belly, clearly showing every fold and roll.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s armor tightly clings to ${his} belly, clearly showing the slight swell beneath ${his} navel.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s armor tightly clings to ${his} ripped abs, clearly displaying ${his} six pack.`);
					}
					break;
				case "Imperial Plate":
					if (slave.belly >= 1000000) {
						if (isBellyFluidLargest) {
							r.push(`Regular Imperial Plate would be useless on ${slave.slaveName}'s unfathomable, hyper-swollen, ${slave.inflationType}-filled belly. Instead, ${he} wears armor more suited to protecting an industrial vehicle than a human being, complete with an internal mechanical frame designed to draw the shock of physical blows away from ${his} dangerously pressurized ${slave.inflationType} and special hookups to optimize the value of mobility aids.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`Regular Imperial Plate would be useless on ${slave.slaveName}'s unfathomable, hyper-swollen, implant-filled belly. Instead, ${he} wears armor more suited to protecting an industrial vehicle than a human being, complete with an internal mechanical frame designed to draw the shock of physical blows away from ${his} dangerously pressurized implant and special hookups to optimize the value of mobility aids.`);
						} else {
							r.push(`Regular Imperial Plate would be useless on ${slave.slaveName}'s unfathomable, hyper-swollen pregnant belly. Instead, ${he} wears armor more suited to protecting an industrial vehicle than a human being, complete with an internal mechanical frame designed to draw the shock of physical blows away from ${his} dangerously pressurized womb and innumerable brood of squirming children, as well as special hookups to optimize the value of mobility aids.`);
						}
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s armor is specially tailored to fit such a dangerously gravid ${girl}. It just barely shows a hint of ${his} monolithic ${slave.inflationType}-filled belly underneath the ultra-heavy armor.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s armor is specially tailored to fit such a dangerously gravid ${girl}. It just barely shows a hint of ${his} swollen belly underneath the ultra-heavy armor.`);
						} else {
							r.push(`${slave.slaveName}'s armor is specially tailored to fit such a dangerously gravid ${girl}. It just barely shows a hint of ${his} monolithic pregnant belly underneath the ultra-heavy armor.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s armor is specially tailored to fit such an absurdly gravid ${girl}. It just barely shows a hint of ${his} titanic ${slave.inflationType}-filled belly underneath the ultra-heavy armor.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s armor is specially tailored to fit such an absurdly gravid ${girl}. It just barely shows a hint of ${his} titanic implant-filled belly underneath the ultra-heavy armor.`);
						} else {
							r.push(`${slave.slaveName}'s armor is specially tailored to fit such an absurdly gravid ${girl}. It just barely shows a hint of ${his} titanic pregnant belly ${him} underneath the ultra-heavy armor.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s armor is specially tailored to fit such a massively gravid ${girl}. It just barely shows a hint of ${his} gigantic ${slave.inflationType}-filled belly underneath the ultra-heavy armor.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s armor is specially tailored to fit such a massively gravid ${girl}. It just barely shows a hint of ${his} gigantic implant-filled belly underneath the ultra-heavy armor.`);
						} else {
							r.push(`${slave.slaveName}'s armor is specially tailored to fit such a massively gravid ${girl}. It just barely shows a hint of ${his} gigantic pregnant belly underneath the ultra-heavy armor.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s armor is specially tailored to fit such a hugely gravid ${girl}. It just barely shows a hint of ${his} massive ${slave.inflationType}-filled belly underneath the ultra-heavy armor.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s armor is specially tailored to fit such a hugely gravid ${girl}. It just barely shows a hint of ${his} massive implant-filled belly underneath the ultra-heavy armor.`);
						} else {
							r.push(`${slave.slaveName}'s armor is specially tailored to fit such a hugely gravid ${girl}. It just barely shows a hint of ${his} massive pregnant belly underneath the ultra-heavy armor.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s armor is specially tailored to fit such a hugely gravid ${girl}. It just barely shows a hint of ${his} giant ${slave.inflationType}-filled belly underneath the ultra-heavy armor.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s armor is specially tailored to fit such a hugely gravid ${girl}. It just barely shows a hint of ${his} giant implant-filled belly underneath the ultra-heavy armor.`);
						} else {
							r.push(`${slave.slaveName}'s armor is specially tailored to fit such a hugely gravid ${girl}. It just barely shows a hint of ${his} giant pregnant belly underneath the ultra-heavy armor.`);
						}
					} else if (slave.belly >= 30000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s armor is specially tailored to fit such a gravid ${girl}. It just barely shows a hint of ${his} huge ${slave.inflationType}-filled belly underneath the ultra-heavy armor.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s armor is specially tailored to fit such a gravid ${girl}. It just barely shows a hint of ${his} huge implant-filled belly underneath the ultra-heavy armor.`);
						} else {
							r.push(`${slave.slaveName}'s armor is specially tailored to fit such a gravid ${girl}. It just barely shows a hint of ${his} huge pregnant belly underneath the ultra-heavy armor.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s armor strains to contain ${his} massively fat belly, clearly showing all ${his} folds and rolls. Flab forces its way through every growing tear in ${his} seams; a growing nuisance, as the outfit must be restitched frequently.`);
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s armor just barely shows a hint of ${his} huge pregnant belly underneath the ultra-heavy armor.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s armor just barely shows a hint of ${his} huge ${slave.inflationType}-filled belly underneath the ultra-heavy armor.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s armor just barely shows a hint of ${his} huge implant-filled belly underneath the ultra-heavy armor.`);
						} else {
							r.push(`${slave.slaveName}'s armor just barely shows a hint of ${his} huge pregnant belly underneath the ultra-heavy armor.`);
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s armor just barely shows a hint of ${his} big pregnant belly, leaving it looking much shorter than it really is.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s armor barely clings to ${his} hugely swollen belly, leaving it looking much shorter than it really is.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s armor barely clings to ${his} huge implant-filled belly, leaving it looking much shorter than it really is.`);
						} else {
							r.push(`${slave.slaveName}'s armor just barely shows a hint of ${his} big pregnant belly, leaving it looking much shorter than it really is.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s armor barely clings to ${his} hugely fat belly, clearly showing all ${his} folds and rolls.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s armor just barely shows a hint of ${his} big fat belly, clearly showing all ${his} folds and rolls.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s armor just barely shows a hint of ${his} pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s armor just barely shows a hint of ${his} jiggling ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s armor just barely shows a hint of ${his} implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s armor just barely shows a hint of ${his} pregnant belly.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s armor just barely shows a hint of ${his} fat belly, clearly showing every fold and roll.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s armor just barely shows a hint of ${his} small pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s armor just barely shows a hint of ${his} ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s armor just barely shows a hint of ${his} implant-rounded belly.`);
						} else {
							r.push(`${slave.slaveName}'s armor just barely shows a hint of ${his} growing belly.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s ultra-heavy armor just barely indicates ${his} chubby belly underneath.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s ultra-heavy armor just barely indicates the swell of ${his} belly underneath the heavy plate.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s ultra-heavy armor fails to contain the definition of ${his} ripped abs, hinting at a powerful ${his} six pack underneath the industrial plate.`);
					}
					break;
				case "kitty lingerie":
					if (slave.belly >= 1000000) {
					// WIP//
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s monolithic ${slave.inflationType}-filled belly completely hides ${his} silk panties and takes full advantage of its lack of restriction to bulge tremendously.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s monolithic implant-filled belly completely hides ${his} silk panties and takes full advantage of its lack of restriction to bulge tremendously.`);
						} else {
							r.push(`${slave.slaveName}'s monolithic pregnant belly completely hides ${his} silk panties. ${His} exposed middle gives ${his} children the room they so desperately need to keep growing.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s titanic ${slave.inflationType}-filled belly completely hides ${his} silk panties and takes full advantage of its lack of restriction to bulge massively.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s titanic implant-filled belly completely hides ${his} silk panties and takes full advantage of its lack of restriction to bulge massively.`);
						} else {
							r.push(`${slave.slaveName}'s titanic pregnant belly completely hides ${his} silk panties. ${His} children greatly appreciate the space granted by ${his} exposed middle and squirm happily in their cramped confines.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s gigantic ${slave.inflationType}-filled belly completely hides ${his} silk panties and takes full advantage of its freedom to hang heavily.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s gigantic implant-filled belly completely hides ${his} silk panties and takes full advantage of its freedom to hang heavily.`);
						} else {
							r.push(`${slave.slaveName}'s gigantic pregnant belly completely hides ${his} silk panties. ${His} children appreciate the space granted by ${his} exposed middle.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s massive ${slave.inflationType}-filled belly completely hides ${his} silk panties and takes full advantage of its freedom to hang heavily.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s massive implant-filled belly completely hides ${his} silk panties and takes full advantage of its freedom to hang heavily.`);
						} else {
							r.push(`${slave.slaveName}'s massive pregnant belly completely hides ${his} silk panties and takes full advantage of its freedom to bulge hugely.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s giant ${slave.inflationType}-filled belly hides ${his} silk panties and bulges heavily from ${his} body.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s giant implant-filled belly hides ${his} silk panties and bulges heavily from ${his} body.`);
						} else {
							r.push(`${slave.slaveName}'s giant pregnant belly hides ${his} silk panties and bulges heavily from ${his} body.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s massively fat belly hides ${his} silk panties.`);
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s huge pregnant belly almost hides ${his} silk panties.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s huge ${slave.inflationType}-filled belly almost hides ${his} silk panties.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s huge implant-filled belly almost hides ${his} silk panties.`);
						} else {
							r.push(`${slave.slaveName}'s huge pregnant belly almost hides ${his} silk panties.`);
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s big pregnant belly hides most of ${his} silk panties.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s big ${slave.inflationType}-filled belly hides most of ${his} silk panties.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s big implant-filled belly hides most of ${his} silk panties.`);
						} else {
							r.push(`${slave.slaveName}'s big pregnant belly hides most of ${his} silk panties.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s hugely fat belly hides the top ${his} silk panties.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s big fat belly hides the top of ${his} silk panties.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s pregnant belly obscures ${his} silk panties' fabric cat ears.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s ${slave.inflationType}-filled belly obscures ${his} silk panties' fabric cat ears.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s implant-filled belly obscures ${his} silk panties' fabric cat ears.`);
						} else {
							r.push(`${slave.slaveName}'s pregnant belly obscures ${his} silk panties' fabric cat ears.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s fat belly hides ${his} silk panties' fabric cat ears.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s small pregnant belly bulges above ${his} silk panties.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s ${slave.inflationType}-swollen belly rests above ${his} silk panties.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s implant-rounded belly bulges above ${his} silk panties.`);
						} else {
							r.push(`${slave.slaveName}'s growing belly bulges above ${his} silk panties.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s chubby belly rests above ${his} silk panties.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s silk panties rest just beneath the slight swell of ${his} lower belly.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s ripped abs are prominently displayed for all to see.`);
					}
					break;
				case "a monokini":
					if (slave.belly >= 1000000) {
					// WIP//
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s monolithic ${slave.inflationType}-filled belly protrudes from over the top of ${his} monokini, which has been fully pushed down by the mass.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s monolithic implant-filled belly protrudes from over the top of ${his} monokini, which has been fully pushed down by the mass.`);
						} else {
							r.push(`${slave.slaveName}'s monokini shows off every kick and movement within ${his} monolithic bulging pregnant belly. ${His} monolithic squirming belly protrudes from over the top of the swimsuit, which has been pushed down by the mass.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s titanic ${slave.inflationType}-filled belly has pushed down the front of ${his} monokini, leaving ${his} belly mostly bare.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s titanic implant-filled belly has pushed down the front of ${his} monokini, leaving ${his} belly mostly bare.`);
						} else {
							r.push(`${slave.slaveName}'s titanic pregnant belly has pushed down the front of ${his} monokini, leaving ${his} belly mostly bare.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s monokini can only cover a fraction of ${his} gigantic ${slave.inflationType}-filled belly, which rests on top of the swimsuit.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s monokini can only cover a fraction of ${his} gigantic implant-filled belly, which rests on top of the swimsuit.`);
						} else {
							r.push(`${slave.slaveName}'s monokini can only cover a fraction of ${his} gigantic pregnant belly, which rests on top of the swimsuit.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s monokini shows off the sheer size of ${his} massive ${slave.inflationType}-filled belly. The swimsuit has been pushed down to well below ${his} popped navel.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s monokini shows off the sheer size of ${his} massive implant-filled belly. The swimsuit has been pushed down to well below ${his} popped navel.`);
						} else {
							r.push(`${slave.slaveName}'s monokini shows off every kick and movement within ${his} massive pregnant belly. The swimsuit has been pushed down to well below ${his} popped navel.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s monokini shows off the sheer size of ${his} giant ${slave.inflationType}-filled belly. The swimsuit has been pushed down to below ${his} popped navel.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s monokini shows off the sheer size of ${his} giant implant-filled belly. The swimsuit has been pushed down to below ${his} popped navel.`);
						} else {
							r.push(`${slave.slaveName}'s monokini shows off every kick and movement within ${his} giant pregnant belly. The swimsuit has been pushed down to below ${his} popped navel.`);
						}
					} else if (slave.belly >= 30000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s monokini shows off the sheer size of ${his} huge ${slave.inflationType}-filled belly. The swimsuit has been pushed down to just below ${his} popped navel.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s monokini shows off the sheer size of ${his} huge implant-filled belly. The swimsuit has been pushed down to just below ${his} popped navel.`);
						} else {
							r.push(`${slave.slaveName}'s monokini shows off every kick and movement within ${his} huge pregnant belly. The swimsuit has been pushed down to just below ${his} popped navel.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s monokini shows off every wiggle and jiggle within ${his} massively fat belly. The material tightly clings to ${his} deep folds and rolls, which are spilling out over the top of the outfit.`);
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s monokini shows off the curvature of ${his} big pregnant belly. The swimsuit has been pushed down to just above ${his} popped navel.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s monokini covers less than half of ${his} jiggling ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s monokini covers less than half of ${his} implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s monokini shows off every kick and movement within ${his} big pregnant belly. The swimsuit has been pushed down to just above ${his} popped navel.`);
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s monokini covers only half of ${his} pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s monokini covers only half of ${his} jiggling ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s monokini covers only half of ${his} implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s monokini covers only half of ${his} pregnant belly.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s monokini tightly clings to ${his} hugely fat belly, clearly displaying every fold, roll and motion in its mass.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s monokini tightly clings to ${his} big fat belly, clearly displaying every fold and roll.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s monokini covers most of ${his} pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s monokini covers most of ${his} ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s monokini covers most of ${his} implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s monokini covers most of ${his} pregnant belly.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s monokini tightly clings to ${his} fat belly, clearly displaying every fold and roll.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s monokini covers all of ${his} small pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s monokini covers all of ${his} ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s monokini covers all of ${his} implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s monokini covers all of ${his} growing belly.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s monokini clings to ${his} chubby belly, clearly displaying every fold and roll.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s monokini is slightly rounded out by ${his} belly.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s monokini covers much of ${his} powerful abdominal muscles.`);
					}
					break;
				case "an apron":
					if (slave.belly >= 1000000) {
					// WIP//
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName} has given up trying to tie ${his} apron's strings, allowing the frilly garment to idly rest upon ${his} monolithic ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName} has given up trying to tie ${his} apron's strings, allowing the frilly garment to idly rest upon ${his} monolithic implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName} has given up trying to tie ${his} apron's strings, allowing the frilly garment to idly rest upon ${his} monolithic pregnant belly.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName} has given up trying to tie ${his} apron's strings, allowing the frilly garment to idly rest upon ${his} titanic ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName} has given up trying to tie ${his} apron's strings, allowing the frilly garment to idly rest upon ${his} titanic implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName} has given up trying to tie ${his} apron's strings, allowing the frilly garment to idly rest upon ${his} titanic pregnant belly.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName} has given up trying to tie ${his} apron's strings, allowing the frilly garment to idly rest upon ${his} gigantic ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName} has given up trying to tie ${his} apron's strings, allowing the frilly garment to idly rest upon ${his} gigantic implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName} has given up trying to tie ${his} apron's strings, allowing the frilly garment to idly rest upon ${his} gigantic pregnant belly.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName} has given up trying to tie ${his} apron's strings, allowing the frilly garment to idly rest upon ${his} massive ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName} has given up trying to tie ${his} apron's strings, allowing the frilly garment to idly rest upon ${his} massive implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName} has given up trying to tie ${his} apron's strings, allowing the frilly garment to idly rest upon ${his} massive pregnant belly.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName} has given up trying to tie ${his} apron's strings, allowing the frilly garment to idly rest upon ${his} giant ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName} has given up trying to tie ${his} apron's strings, allowing the frilly garment to idly rest upon ${his} giant implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName} has given up trying to tie ${his} apron's strings, allowing the frilly garment to idly rest upon ${his} giant pregnant belly.`);
						}
					} else if (slave.belly >= 30000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName} has given up trying to tie ${his} apron's strings, allowing the frilly garment to idly rest upon ${his} huge ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName} has given up trying to tie ${his} apron's strings, allowing the frilly garment to idly rest upon ${his} huge implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName} has given up trying to tie ${his} apron's strings, allowing the frilly garment to idly rest upon ${his} huge pregnant belly.`);
						}
					} else if (slave.weight > 190) {
						r.push(`The strings of ${slave.slaveName}'s apron struggle to stay tied due to the size of ${his} massively fat belly.`);
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`The strings of ${slave.slaveName}'s apron struggle to stay tied due to the size of ${his} huge pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`The strings of ${slave.slaveName}'s apron struggle to stay tied due to the size of ${his} huge ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The strings of ${slave.slaveName}'s apron struggle to stay tied due to the size of ${his} implant-filled belly.`);
						} else {
							r.push(`The strings of ${slave.slaveName}'s apron struggle to stay tied due to the size of ${his} huge pregnant belly.`);
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s apron is pushed away from ${his} body by ${his} big pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s apron is pushed away from ${his} body by ${his} hugely ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s apron is pushed away from ${his} body by ${his} huge implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s apron is pushed away from ${his} body by ${his} big pregnant belly.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s apron is pushed away from ${his} body by ${his} hugely fat belly.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s apron is filled out by ${his} big fat belly.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s apron is filled out by ${his} pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s apron is filled out by ${his} jiggling ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s apron is filled out by ${his} implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s apron is filled out by ${his} pregnant belly.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s apron bulges with ${his} fat belly.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s apron is rounded out by ${his} small pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s apron is rounded out by ${his} ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s apron is rounded out by ${his} implant-rounded belly.`);
						} else {
							r.push(`${slave.slaveName}'s apron is rounded out by ${his} growing belly.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s apron is rounded out by ${his} chubby belly.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s apron is slightly rounded by ${his} belly.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s apron fully covers ${his} muscular abs.`);
					}
					break;
				case "a hijab and abaya":
				case "a niqab and abaya":
					if (slave.belly >= 1000000) {
					// WIP//
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s tent-like abaya is still strained from the sheer size of ${his} monolithic ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s tent-like abaya is still strained from the sheer size of ${his} monolithic implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s tent-like abaya is still strained from the sheer size of ${his} monolithic pregnant belly.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s abaya only manages to cover ${his} titanic ${slave.inflationType}-filled belly with major extensions to the material.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s abaya only manages to cover ${his} titanic implant-filled belly with major extensions to the material.`);
						} else {
							r.push(`${slave.slaveName}'s abaya only manages to cover ${his} titanic pregnant belly with major extensions to the material.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s abaya drapes itself over the sides of ${his} gigantic ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s abaya drapes itself over the sides of ${his} gigantic implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s abaya drapes itself over the sides of ${his} gigantic pregnant belly.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s abaya has been severely lengthened to ensure that ${his} massive ${slave.inflationType}-filled belly is fully covered.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s abaya has been severely lengthened to ensure that ${his} massive implant-filled belly is fully covered.`);
						} else {
							r.push(`${slave.slaveName}'s abaya has been severely lengthened to ensure that ${his} massive pregnant belly is fully covered.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s abaya has been severely widened to ensure that ${his} giant ${slave.inflationType}-filled belly is fully covered.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s abaya has been severely widened to ensure that ${his} giant implant-filled belly is fully covered.`);
						} else {
							r.push(`${slave.slaveName}'s abaya has been severely widened to ensure that ${his} giant pregnant belly is fully covered.`);
						}
					} else if (slave.belly >= 30000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s abaya lies completely taut on ${his} huge ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s abaya lies completely taut on ${his} huge implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s abaya lies completely taut on ${his} huge pregnant belly.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s abaya is straining to contain ${his} massively fat belly.`);
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s abaya is straining to contain ${his} huge pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s abaya is straining to contain ${his} huge ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s abaya is straining to contain ${his} huge implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s abaya is straining to contain ${his} huge pregnant belly.`);
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s abaya is filled by ${his} pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s abaya is filled by ${his} ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s abaya is filled by ${his} implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s abaya is filled by ${his} pregnant belly.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s abaya is filled out by ${his} hugely fat belly.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s abaya is filled out by ${his} big fat belly.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s abaya is filled out by ${his} pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s abaya is filled out by ${his} jiggling ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s abaya is filled out by ${his} implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s abaya is filled out by ${his} pregnant belly.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s abaya is filled out by ${his} fat belly.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s abaya bulges with ${his} pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s abaya bulges with ${his} ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s abaya bulges with ${his} implant-rounded belly.`);
						} else {
							r.push(`${slave.slaveName}'s abaya bulges with ${his} growing belly.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s abaya bulges slightly from ${his} chubby belly.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s abaya is slightly rounded by ${his} belly.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s abaya fully covers ${his} muscular abs.`);
					}
					break;
				case "a klan robe":
					if (slave.belly >= 1000000) {
					// WIP//
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s robe has been stretched so thin by ${his} monolithic ${slave.inflationType}-swollen belly, it's now ironically much more comfortable to wear.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s robe has been stretched so thin by ${his} monolithic implant-filled belly, it's now ironically much more comfortable to wear.`);
						} else {
							r.push(`${slave.slaveName}'s robe has been stretched so thin by ${his} monolithic pregnant belly, it's now ironically much more comfortable to wear.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s robes are stretching itself thin to cover ${his} titanic ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s robes are stretching itself thin to cover ${his} titanic implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s robes are stretching itself thin to cover ${his} titanic bulging pregnant belly.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							r.push(`The heavy fabric of ${slave.slaveName}'s robes are starting to chafe the sensitive skin of ${his} gigantic ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The heavy fabric of ${slave.slaveName}'s robes are starting to chafe the sensitive skin of ${his} gigantic implant-filled belly.`);
						} else {
							r.push(`The heavy fabric of ${slave.slaveName}'s robes are starting to chafe the sensitive skin of ${his} gigantic pregnant belly.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s robes have been given numerous extensions in order to properly cover ${his} massive ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s robes have been given numerous extensions in order to properly cover ${his} massive implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s robes have been given numerous extensions in order to properly cover ${his} massive pregnant belly.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s robes are straining to cover ${his} giant ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s robes are straining to cover ${his} giant implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s robes are straining to cover ${his} giant pregnant belly.`);
						}
					} else if (slave.belly >= 30000) {
						if (isBellyFluidLargest) {
							r.push(`The heavy fabric of ${slave.slaveName}'s robes lie taut against ${his} huge ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The heavy fabric of ${slave.slaveName}'s robes lie taut against ${his} huge implant-filled belly.`);
						} else {
							r.push(`The heavy fabric of ${slave.slaveName}'s robes lie taut against ${his} huge pregnant belly.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s robes are greatly pushed out by ${his} massively fat belly.`);
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s robes are filled out by ${his} huge pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s robes are filled out by ${his} huge ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s robes are filled out by ${his} huge implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s robes are filled out by ${his} huge pregnant belly.`);
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s robes are noticeably rounded out by ${his} big pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s robes are noticeably rounded out by ${his} hugely swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s robes are noticeably rounded out by ${his} huge implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s robes are noticeably rounded out by ${his} big pregnant belly.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s hugely fat belly pushes out ${his} robes.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s big fat belly slightly pushes out ${his} robes.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`There is a slight roundness to the middle of ${slave.slaveName}'s robes, thanks to ${his} pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`There is a slight roundness to the middle of ${slave.slaveName}'s robes, thanks to ${his} jiggling ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`There is a slight roundness to the middle of ${slave.slaveName}'s robes, thanks to ${his} implant-filled belly.`);
						} else {
							r.push(`There is a slight roundness to the middle of ${slave.slaveName}'s robes, thanks to ${his} pregnant belly.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s fat belly just manages to brush up against ${his} robes.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s robes bulge with ${his} pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s robes show no sign of ${his} ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s robes show no sign of ${his} implant-rounded belly.`);
						} else {
							r.push(`${slave.slaveName}'s robes show no sign of ${his} growing belly.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s robes totally conceal ${his} chubby belly.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s robes totally conceal ${his} belly.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s robes totally conceal ${his} abdominal muscles.`);
					}
					break;
				case "a burqa":
					if (slave.belly >= 1000000) {
					// WIP//
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s burqa has been stretched so thin by ${his} monolithic ${slave.inflationType}-swollen belly, it's now ironically much more comfortable to wear.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s burqa has been stretched so thin by ${his} monolithic implant-filled belly, it's now ironically much more comfortable to wear.`);
						} else {
							r.push(`${slave.slaveName}'s burqa has been stretched so thin by ${his} monolithic pregnant belly, it's now ironically much more comfortable to wear.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s burqa is stretching itself thin to cover ${his} titanic ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s burqa is stretching itself thin to cover ${his} titanic implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s burqa is stretching itself thin to cover ${his} titanic bulging pregnant belly.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							r.push(`The heavy fabric of ${slave.slaveName}'s burqa is starting to chafe the sensitive skin of ${his} gigantic ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The heavy fabric of ${slave.slaveName}'s burqa is starting to chafe the sensitive skin of ${his} gigantic implant-filled belly.`);
						} else {
							r.push(`The heavy fabric of ${slave.slaveName}'s burqa is starting to chafe the sensitive skin of ${his} gigantic pregnant belly.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s burqa has been given numerous extensions in order to properly cover ${his} massive ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s burqa has been given numerous extensions in order to properly cover ${his} massive implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s burqa has been given numerous extensions in order to properly cover ${his} massive pregnant belly.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s burqa is straining to cover ${his} giant ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s burqa is straining to cover ${his} giant implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s burqa is straining to cover ${his} giant pregnant belly.`);
						}
					} else if (slave.belly >= 30000) {
						if (isBellyFluidLargest) {
							r.push(`The heavy fabric of ${slave.slaveName}'s burqa lies taut against ${his} huge ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The heavy fabric of ${slave.slaveName}'s burqa lies taut against ${his} huge implant-filled belly.`);
						} else {
							r.push(`The heavy fabric of ${slave.slaveName}'s burqa lies taut against ${his} huge pregnant belly.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s burqa is greatly pushed out by ${his} massively fat belly.`);
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s burqa is filled out by ${his} huge pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s burqa is filled out by ${his} huge ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s burqa is filled out by ${his} huge implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s burqa is filled out by ${his} huge pregnant belly.`);
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s burqa is noticeably rounded out by ${his} big pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s burqa is noticeably rounded out by ${his} hugely swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s burqa is noticeably rounded out by ${his} huge implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s burqa is noticeably rounded out by ${his} big pregnant belly.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s hugely fat belly pushes out ${his} burqa.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s big fat belly slightly pushes out ${his} burqa.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`There is a slight roundness to the middle of ${slave.slaveName}'s burqa, thanks to ${his} pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`There is a slight roundness to the middle of ${slave.slaveName}'s burqa, thanks to ${his} jiggling ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`There is a slight roundness to the middle of ${slave.slaveName}'s burqa, thanks to ${his} implant-filled belly.`);
						} else {
							r.push(`There is a slight roundness to the middle of ${slave.slaveName}'s burqa, thanks to ${his} pregnant belly.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s fat belly just manages to brush up against ${his} burqa.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s abaya bulges with ${his} pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s burqa shows no sign of ${his} ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s burqa shows no sign of ${his} implant-rounded belly.`);
						} else {
							r.push(`${slave.slaveName}'s burqa shows no sign of ${his} growing belly.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s burqa totally conceals ${his} chubby belly.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s burqa totally conceals ${his} belly.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s burqa totally conceals ${his} abdominal muscles.`);
					}
					break;
				case "a nice pony outfit":
				case "a slutty pony outfit":
					if (slave.belly >= 1000000) {
					// WIP//
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`The bottom of ${slave.slaveName}'s outfit lies taut across ${his} monolithic ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The bottom of ${slave.slaveName}'s outfit lies taut across ${his} monolithic implant-filled belly.`);
						} else {
							r.push(`The bottom of ${slave.slaveName}'s outfit lies taut across ${his} monolithic pregnant belly.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s outfit has been lengthened a great deal just to cover most of ${his} titanic ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s outfit has been lengthened a great deal just to cover most of ${his} titanic implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s outfit has been lengthened a great deal just to cover most of ${his} titanic pregnant belly.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							r.push(`The tunic ${slave.slaveName}'s outfit can't possibly cover the underside of ${his} gigantic ${slave.inflationType}-filled belly, so ${his} pants have been widened to pick up the slack.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The tunic ${slave.slaveName}'s outfit can't possibly cover the underside of ${his} gigantic implant-filled belly, so ${his} pants have been widened to pick up the slack.`);
						} else {
							r.push(`The tunic ${slave.slaveName}'s outfit can't possibly cover the underside of ${his} gigantic pregnant belly, so ${his} pants have been widened to pick up the slack.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName} outfit has been let out a great deal to cover ${his} massive ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName} outfit has been let out a great deal to cover ${his} massive implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName} outfit has been let out a great deal to cover ${his} massive pregnant belly.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s outfit's pants have been extended to reach ${his} popped navel to ensure that ${his} giant ${slave.inflationType}-filled belly is fully covered.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s outfit's pants have been extended to reach ${his} popped navel to ensure that ${his} giant implant-filled belly is fully covered.`);
						} else {
							r.push(`${slave.slaveName}'s outfit's pants have been extended to reach ${his} popped navel to ensure that ${his} giant pregnant belly is fully covered.`);
						}
					} else if (slave.belly >= 30000) {
						if (isBellyFluidLargest) {
							r.push(`The bottom of ${slave.slaveName}'s outfit lies at crotch-level due to ${his} huge ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The bottom of ${slave.slaveName}'s outfit lies at crotch-level due to ${his} huge implant-filled belly.`);
						} else {
							r.push(`The bottom of ${slave.slaveName}'s outfit lies at crotch-level due to ${his} huge pregnant belly.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s outfit is straining to contain ${his} massively fat belly.`);
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`The fabric of ${slave.slaveName}'s outfit is pushed up to just below ${his} crotch due to ${his} huge pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`The fabric of ${slave.slaveName}'s outfit is pushed up to just below ${his} crotch due to ${his} huge ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The fabric of ${slave.slaveName}'s outfit is pushed up to just below ${his} crotch due to ${his} huge implant-filled belly.`);
						} else {
							r.push(`The fabric of ${slave.slaveName}'s outfit is pushed up to just below ${his} crotch due to ${his} huge pregnant belly.`);
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`The fabric of ${slave.slaveName}'s outfit is slightly pushed up thanks to ${his} big pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`The fabric of ${slave.slaveName}'s outfit is slightly pushed up thanks to ${his} hugely ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The fabric of ${slave.slaveName}'s outfit is slightly pushed up thanks to ${his} huge implant-filled belly.`);
						} else {
							r.push(`The fabric of ${slave.slaveName}'s outfit is slightly pushed up thanks to ${his} big pregnant belly.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s outfit is filled out by ${his} hugely fat belly.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s outfit is filled out by ${his} big fat belly.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s outfit bulges significantly from ${his} pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s outfit bulges significantly from ${his} jiggling ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s outfit bulges significantly from ${his} implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s outfit bulges significantly from ${his} pregnant belly.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s outfit bulges from ${his} fat belly.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s outfit gently bulges from ${his} pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s outfit gently bulges from ${his} ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s outfit gently bulges from ${his} implant-rounded belly.`);
						} else {
							r.push(`${slave.slaveName}'s outfit gently bulges from ${his} growing belly.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s outfit is slightly rounded by ${his} chubby belly.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s outfit is slightly rounded by ${his} belly.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s outfit barely shows the contours of ${his} abdominal muscles.`);
					}
					break;
				case "a tube top and thong":
				case "a bra":
				case "a thong":
				case "a tube top":
				case "a striped bra":
				case "striped underwear":
				case "a skimpy loincloth":
				case "a slutty klan robe":
				case "a sports bra":
				case "boyshorts":
				case "cutoffs":
				case "leather pants and pasties":
				case "leather pants":
				case "panties":
				case "panties and pasties":
				case "pasties":
				case "sport shorts and a sports bra":
				case "jeans":
				case "leather pants and a tube top":
				case "sport shorts":
					if (slave.belly >= 1000000) {
					// WIP//
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`The bottom of ${slave.slaveName}'s outfit completely bares ${his} monolithic ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The bottom of ${slave.slaveName}'s outfit completely bares ${his} monolithic implant-filled belly.`);
						} else {
							r.push(`The bottom of ${slave.slaveName}'s outfit completely bares ${his} monolithic pregnant belly.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s outfit completely bares ${his} titanic ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s outfit completely bares ${his} titanic implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s outfit completely bares ${his} titanic pregnant belly.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							r.push(`The tunic ${slave.slaveName}'s outfit completely bares ${his} gigantic ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The tunic ${slave.slaveName}'s outfit completely bares ${his} gigantic implant-filled belly.`);
						} else {
							r.push(`The tunic ${slave.slaveName}'s outfit completely bares ${his} gigantic pregnant belly.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName} outfit completely bares ${his} massive ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName} outfit completely bares ${his} massive implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName} outfit completely bares ${his} massive pregnant belly.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s outfit completely bares ${his} popped navel, ensuring that ${his} giant ${slave.inflationType}-filled belly is fully visible.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s outfit completely bares ${his} popped navel, ensuring that ${his} giant implant-filled belly is fully visible.`);
						} else {
							r.push(`${slave.slaveName}'s outfit completely bares ${his} popped navel, ensuring that ${his} giant pregnant belly is fully visible.`);
						}
					} else if (slave.belly >= 30000) {
						if (isBellyFluidLargest) {
							r.push(`The bottom of ${slave.slaveName}'s outfit completely bares ${his} huge ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The bottom of ${slave.slaveName}'s outfit completely bares ${his} huge implant-filled belly.`);
						} else {
							r.push(`The bottom of ${slave.slaveName}'s outfit completely bares ${his} huge pregnant belly.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s outfit is straining to contain ${his} massively fat belly.`);
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`The fabric of ${slave.slaveName}'s outfit completely bares ${his} huge pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`The fabric of ${slave.slaveName}'s outfit completely bares ${his} huge ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The fabric of ${slave.slaveName}'s outfit completely bares ${his} huge implant-filled belly.`);
						} else {
							r.push(`The fabric of ${slave.slaveName}'s outfit completely bares ${his} huge pregnant belly.`);
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`The fabric of ${slave.slaveName}'s outfit completely bares ${his} big pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`The fabric of ${slave.slaveName}'s outfit completely bares ${his} hugely ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The fabric of ${slave.slaveName}'s outfit completely bares ${his} huge implant-filled belly.`);
						} else {
							r.push(`The fabric of ${slave.slaveName}'s outfit completely bares ${his} big pregnant belly.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s outfit completely bares ${his} hugely fat belly.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s outfit completely bares ${his} big fat belly.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s outfit completely bares ${his} pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s outfit completely bares ${his} jiggling ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s outfit completely bares ${his} implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s outfit completely bares ${his} pregnant belly.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s outfit completely bares ${his} fat belly.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s outfit completely bares ${his} pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s outfit completely bares ${his} ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s outfit completely bares ${his} implant-rounded belly.`);
						} else {
							r.push(`${slave.slaveName}'s outfit completely bares ${his} growing belly.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s outfit completely bares ${his} chubby belly.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s outfit completely bares ${his} belly.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s outfit completely bares ${his} abdominal muscles.`);
					}
					break;
				case "a one-piece swimsuit":
					if (slave.belly >= 1000000) {
					// WIP//
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`The bottom of ${slave.slaveName}'s swimsuit lies taut across ${his} monolithic ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The bottom of ${slave.slaveName}'s swimsuit lies taut across ${his} monolithic implant-filled belly.`);
						} else {
							r.push(`The bottom of ${slave.slaveName}'s swimsuit lies taut across ${his} monolithic pregnant belly.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s swimsuit has been lengthened a great deal just to cover most of ${his} titanic ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s swimsuit has been lengthened a great deal just to cover most of ${his} titanic implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s swimsuit has been lengthened a great deal just to cover most of ${his} titanic pregnant belly.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							r.push(`The ${slave.slaveName}'s swimsuit can't possibly cover the underside of ${his} gigantic ${slave.inflationType}-filled belly, so ${his} swimsuit has been widened to pick up the slack.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The ${slave.slaveName}'s swimsuit can't possibly cover the underside of ${his} gigantic implant-filled belly, so ${his} swimsuit has been widened to pick up the slack.`);
						} else {
							r.push(`The ${slave.slaveName}'s swimsuit can't possibly cover the underside of ${his} gigantic pregnant belly, so ${his} swimsuit has been widened to pick up the slack.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName} swimsuit has been let out a great deal to cover ${his} massive ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName} swimsuit has been let out a great deal to cover ${his} massive implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName} swimsuit has been let out a great deal to cover ${his} massive pregnant belly.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s swimsuit has been extended to reach ${his} popped navel to ensure that ${his} giant ${slave.inflationType}-filled belly is fully covered.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s swimsuit has been extended to reach ${his} popped navel to ensure that ${his} giant implant-filled belly is fully covered.`);
						} else {
							r.push(`${slave.slaveName}'s swimsuit has been extended to reach ${his} popped navel to ensure that ${his} giant pregnant belly is fully covered.`);
						}
					} else if (slave.belly >= 30000) {
						if (isBellyFluidLargest) {
							r.push(`The bottom of ${slave.slaveName}'s swimsuit lies at crotch-level due to ${his} huge ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The bottom of ${slave.slaveName}'s swimsuit lies at crotch-level due to ${his} huge implant-filled belly.`);
						} else {
							r.push(`The bottom of ${slave.slaveName}'s swimsuit lies at crotch-level due to ${his} huge pregnant belly.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s swimsuit is straining to contain ${his} massively fat belly.`);
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`The fabric of ${slave.slaveName}'s swimsuit is pushed up to just below ${his} crotch due to ${his} huge pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`The fabric of ${slave.slaveName}'s swimsuit is pushed up to just below ${his} crotch due to ${his} huge ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The fabric of ${slave.slaveName}'s swimsuit is pushed up to just below ${his} crotch due to ${his} huge implant-filled belly.`);
						} else {
							r.push(`The fabric of ${slave.slaveName}'s swimsuit is pushed up to just below ${his} crotch due to ${his} huge pregnant belly.`);
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`The fabric of ${slave.slaveName}'s swimsuit is slightly pushed up thanks to ${his} big pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`The fabric of ${slave.slaveName}'s swimsuit is slightly pushed up thanks to ${his} hugely ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The fabric of ${slave.slaveName}'s swimsuit is slightly pushed up thanks to ${his} huge implant-filled belly.`);
						} else {
							r.push(`The fabric of ${slave.slaveName}'s swimsuit is slightly pushed up thanks to ${his} big pregnant belly.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s swimsuit is filled out by ${his} hugely fat belly.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s swimsuit is filled out by ${his} big fat belly.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s swimsuit bulges significantly from ${his} pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s swimsuit bulges significantly from ${his} jiggling ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s swimsuit bulges significantly from ${his} implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s swimsuit bulges significantly from ${his} pregnant belly.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s swimsuit bulges from ${his} fat belly.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s swimsuit gently bulges from ${his} pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s swimsuit gently bulges from ${his} ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s swimsuit gently bulges from ${his} implant-rounded belly.`);
						} else {
							r.push(`${slave.slaveName}'s swimsuit gently bulges from ${his} growing belly.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s swimsuit is slightly rounded by ${his} chubby belly.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s swimsuit is slightly rounded by ${his} belly.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s swimsuit barely shows the contours of ${his} abdominal muscles.`);
					}
					break;
				case "a sweater":
				case "a sweater and cutoffs":
				case "a sweater and panties":
					if (slave.belly >= 1000000) {
					// WIP//
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`The bottom of ${slave.slaveName}'s sweater lies taut across ${his} monolithic ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The bottom of ${slave.slaveName}'s sweater lies taut across ${his} monolithic implant-filled belly.`);
						} else {
							r.push(`The bottom of ${slave.slaveName}'s sweater lies taut across ${his} monolithic pregnant belly.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s sweater has been lengthened a great deal just to cover most of ${his} titanic ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s sweater has been lengthened a great deal just to cover most of ${his} titanic implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s sweater has been lengthened a great deal just to cover most of ${his} titanic pregnant belly.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							r.push(`The ${slave.slaveName}'s sweater can't possibly cover the underside of ${his} gigantic ${slave.inflationType}-filled belly, so ${his} sweater has been widened to pick up the slack.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The ${slave.slaveName}'s sweater can't possibly cover the underside of ${his} gigantic implant-filled belly, so ${his} sweater has been widened to pick up the slack.`);
						} else {
							r.push(`The ${slave.slaveName}'s sweater can't possibly cover the underside of ${his} gigantic pregnant belly, so ${his} sweater has been widened to pick up the slack.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName} sweater has been let out a great deal to cover ${his} massive ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName} sweater has been let out a great deal to cover ${his} massive implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName} sweater has been let out a great deal to cover ${his} massive pregnant belly.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s sweater has been extended to reach ${his} popped navel to ensure that ${his} giant ${slave.inflationType}-filled belly is fully covered.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s sweater has been extended to reach ${his} popped navel to ensure that ${his} giant implant-filled belly is fully covered.`);
						} else {
							r.push(`${slave.slaveName}'s sweater has been extended to reach ${his} popped navel to ensure that ${his} giant pregnant belly is fully covered.`);
						}
					} else if (slave.belly >= 30000) {
						if (isBellyFluidLargest) {
							r.push(`The bottom of ${slave.slaveName}'s sweater lies at crotch-level due to ${his} huge ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The bottom of ${slave.slaveName}'s sweater lies at crotch-level due to ${his} huge implant-filled belly.`);
						} else {
							r.push(`The bottom of ${slave.slaveName}'s sweater lies at crotch-level due to ${his} huge pregnant belly.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s sweater is straining to contain ${his} massively fat belly.`);
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`The fabric of ${slave.slaveName}'s sweater is pushed up to just below ${his} crotch due to ${his} huge pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`The fabric of ${slave.slaveName}'s sweater is pushed up to just below ${his} crotch due to ${his} huge ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The fabric of ${slave.slaveName}'s sweater is pushed up to just below ${his} crotch due to ${his} huge implant-filled belly.`);
						} else {
							r.push(`The fabric of ${slave.slaveName}'s sweater is pushed up to just below ${his} crotch due to ${his} huge pregnant belly.`);
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`The fabric of ${slave.slaveName}'s sweater is slightly pushed up thanks to ${his} big pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`The fabric of ${slave.slaveName}'s sweater is slightly pushed up thanks to ${his} hugely ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The fabric of ${slave.slaveName}'s sweater is slightly pushed up thanks to ${his} huge implant-filled belly.`);
						} else {
							r.push(`The fabric of ${slave.slaveName}'s sweater is slightly pushed up thanks to ${his} big pregnant belly.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s sweater is filled out by ${his} hugely fat belly.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s sweater is filled out by ${his} big fat belly.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s sweater bulges significantly from ${his} pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s sweater bulges significantly from ${his} jiggling ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s sweater bulges significantly from ${his} implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s sweater bulges significantly from ${his} pregnant belly.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s sweater bulges from ${his} fat belly.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s sweater gently bulges from ${his} pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s sweater gently bulges from ${his} ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s sweater gently bulges from ${his} implant-rounded belly.`);
						} else {
							r.push(`${slave.slaveName}'s sweater gently bulges from ${his} growing belly.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s sweater is slightly rounded by ${his} chubby belly.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s sweater is slightly rounded by ${his} belly.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s sweater barely shows the contours of ${his} abdominal muscles.`);
					}
					break;
				case "a police uniform":
					if (slave.belly >= 1000000) {
					// WIP//
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`The bottom of ${slave.slaveName}'s uniform's shirt lies taut across ${his} monolithic ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The bottom of ${slave.slaveName}'s uniform's shirt lies taut across ${his} monolithic implant-filled belly.`);
						} else {
							r.push(`The bottom of ${slave.slaveName}'s uniform's shirt lies taut across ${his} monolithic pregnant belly.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s uniform's shirt has been lengthened a great deal just to cover most of ${his} titanic ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s uniform's shirt has been lengthened a great deal just to cover most of ${his} titanic implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s uniform's shirt has been lengthened a great deal just to cover most of ${his} titanic pregnant belly.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							r.push(`The shirt ${slave.slaveName}'s uniform can't possibly cover the underside of ${his} gigantic ${slave.inflationType}-filled belly, so ${his} pants have been widened to pick up the slack.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The shirt ${slave.slaveName}'s uniform can't possibly cover the underside of ${his} gigantic implant-filled belly, so ${his} pants have been widened to pick up the slack.`);
						} else {
							r.push(`The shirt ${slave.slaveName}'s uniform can't possibly cover the underside of ${his} gigantic pregnant belly, so ${his} pants have been widened to pick up the slack.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName} uniform's shirt has been let out a great deal to cover ${his} massive ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName} uniform's shirt has been let out a great deal to cover ${his} massive implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName} uniform's shirt has been let out a great deal to cover ${his} massive pregnant belly.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s uniform's pants have been extended to reach ${his} popped navel to ensure that ${his} giant ${slave.inflationType}-filled belly is fully covered.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s uniform's pants have been extended to reach ${his} popped navel to ensure that ${his} giant implant-filled belly is fully covered.`);
						} else {
							r.push(`${slave.slaveName}'s uniform's pants have been extended to reach ${his} popped navel to ensure that ${his} giant pregnant belly is fully covered.`);
						}
					} else if (slave.belly >= 30000) {
						if (isBellyFluidLargest) {
							r.push(`The bottom of ${slave.slaveName}'s uniform's shirt lies at crotch-level due to ${his} huge ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The bottom of ${slave.slaveName}'s uniform's shirt lies at crotch-level due to ${his} huge implant-filled belly.`);
						} else {
							r.push(`The bottom of ${slave.slaveName}'s uniform's shirt lies at crotch-level due to ${his} huge pregnant belly.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s uniform is straining to contain ${his} massively fat belly.`);
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`The shirt of ${slave.slaveName}'s uniform is pushed up to just below ${his} crotch due to ${his} huge pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`The shirt of ${slave.slaveName}'s uniform is pushed up to just below ${his} crotch due to ${his} huge ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The shirt of ${slave.slaveName}'s uniform is pushed up to just below ${his} crotch due to ${his} huge implant-filled belly.`);
						} else {
							r.push(`The shirt of ${slave.slaveName}'s uniform is pushed up to just below ${his} crotch due to ${his} huge pregnant belly.`);
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`The shirt of ${slave.slaveName}'s uniform is slightly pushed up thanks to ${his} big pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`The shirt of ${slave.slaveName}'s uniform is slightly pushed up thanks to ${his} hugely ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The shirt of ${slave.slaveName}'s uniform is slightly pushed up thanks to ${his} huge implant-filled belly.`);
						} else {
							r.push(`The shirt of ${slave.slaveName}'s uniform is slightly pushed up thanks to ${his} big pregnant belly.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s uniform is filled out by ${his} hugely fat belly.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s uniform is filled out by ${his} big fat belly.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s uniform bulges significantly from ${his} pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s uniform bulges significantly from ${his} jiggling ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s uniform bulges significantly from ${his} implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s uniform bulges significantly from ${his} pregnant belly.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s uniform bulges from ${his} fat belly.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s uniform gently bulges from ${his} pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s uniform gently bulges from ${his} ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s uniform gently bulges from ${his} implant-rounded belly.`);
						} else {
							r.push(`${slave.slaveName}'s uniform gently bulges from ${his} growing belly.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s uniform is slightly rounded by ${his} chubby belly.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s uniform is slightly rounded by ${his} belly.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s uniform barely shows the contours of ${his} abdominal muscles.`);
					}
					break;
				case "a hanbok":
					if (slave.belly >= 1000000) {
					// WIP//
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`The bottom of ${slave.slaveName}'s hanbok lies taut across ${his} monolithic ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The bottom of ${slave.slaveName}'s hanbok lies taut across ${his} monolithic implant-filled belly.`);
						} else {
							r.push(`The bottom of ${slave.slaveName}'s hanbok lies taut across ${his} monolithic pregnant belly.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s hanbok has been lengthened a great deal just to cover most of ${his} titanic ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s hanbok has been lengthened a great deal just to cover most of ${his} titanic implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s hanbok has been lengthened a great deal just to cover most of ${his} titanic pregnant belly.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							r.push(`The ${slave.slaveName}'s hanbok can't possibly cover the underside of ${his} gigantic ${slave.inflationType}-filled belly, so ${his} hanbok has been widened to pick up the slack.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The ${slave.slaveName}'s hanbok can't possibly cover the underside of ${his} gigantic implant-filled belly, so ${his} hanbok has been widened to pick up the slack.`);
						} else {
							r.push(`The ${slave.slaveName}'s hanbok can't possibly cover the underside of ${his} gigantic pregnant belly, so ${his} hanbok has been widened to pick up the slack.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName} hanbok has been let out a great deal to cover ${his} massive ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName} hanbok has been let out a great deal to cover ${his} massive implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName} hanbok has been let out a great deal to cover ${his} massive pregnant belly.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s hanbok has been extended to reach ${his} popped navel to ensure that ${his} giant ${slave.inflationType}-filled belly is fully covered.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s hanbok has been extended to reach ${his} popped navel to ensure that ${his} giant implant-filled belly is fully covered.`);
						} else {
							r.push(`${slave.slaveName}'s hanbok has been extended to reach ${his} popped navel to ensure that ${his} giant pregnant belly is fully covered.`);
						}
					} else if (slave.belly >= 30000) {
						if (isBellyFluidLargest) {
							r.push(`The bottom of ${slave.slaveName}'s hanbok lies at crotch-level due to ${his} huge ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The bottom of ${slave.slaveName}'s hanbok lies at crotch-level due to ${his} huge implant-filled belly.`);
						} else {
							r.push(`The bottom of ${slave.slaveName}'s hanbok lies at crotch-level due to ${his} huge pregnant belly.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s hanbok is straining to contain ${his} massively fat belly.`);
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`The fabric of ${slave.slaveName}'s hanbok is pushed up to just below ${his} crotch due to ${his} huge pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`The fabric of ${slave.slaveName}'s hanbok is pushed up to just below ${his} crotch due to ${his} huge ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The fabric of ${slave.slaveName}'s hanbok is pushed up to just below ${his} crotch due to ${his} huge implant-filled belly.`);
						} else {
							r.push(`The fabric of ${slave.slaveName}'s hanbok is pushed up to just below ${his} crotch due to ${his} huge pregnant belly.`);
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`The fabric of ${slave.slaveName}'s hanbok is slightly pushed up thanks to ${his} big pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`The fabric of ${slave.slaveName}'s hanbok is slightly pushed up thanks to ${his} hugely ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The fabric of ${slave.slaveName}'s hanbok is slightly pushed up thanks to ${his} huge implant-filled belly.`);
						} else {
							r.push(`The fabric of ${slave.slaveName}'s hanbok is slightly pushed up thanks to ${his} big pregnant belly.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s hanbok is filled out by ${his} hugely fat belly.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s hanbok is filled out by ${his} big fat belly.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s hanbok bulges significantly from ${his} pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s hanbok bulges significantly from ${his} jiggling ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s hanbok bulges significantly from ${his} implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s hanbok bulges significantly from ${his} pregnant belly.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s hanbok bulges from ${his} fat belly.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s hanbok gently bulges from ${his} pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s hanbok gently bulges from ${his} ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s hanbok gently bulges from ${his} implant-rounded belly.`);
						} else {
							r.push(`${slave.slaveName}'s hanbok gently bulges from ${his} growing belly.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s hanbok is slightly rounded by ${his} chubby belly.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s hanbok is slightly rounded by ${his} belly.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s hanbok barely shows the contours of ${his} abdominal muscles.`);
					}
					break;
				case "a gothic lolita dress":
					if (slave.belly >= 1000000) {
					// WIP//
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`The bottom of ${slave.slaveName}'s dress lies taut across ${his} monolithic ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The bottom of ${slave.slaveName}'s dress lies taut across ${his} monolithic implant-filled belly.`);
						} else {
							r.push(`The bottom of ${slave.slaveName}'s dress lies taut across ${his} monolithic pregnant belly.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s dress has been lengthened a great deal just to cover most of ${his} titanic ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s dress has been lengthened a great deal just to cover most of ${his} titanic implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s dress has been lengthened a great deal just to cover most of ${his} titanic pregnant belly.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							r.push(`The ${slave.slaveName}'s dress can't possibly cover the underside of ${his} gigantic ${slave.inflationType}-filled belly, so ${his} dress has been widened to pick up the slack.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The ${slave.slaveName}'s dress can't possibly cover the underside of ${his} gigantic implant-filled belly, so ${his} dress has been widened to pick up the slack.`);
						} else {
							r.push(`The ${slave.slaveName}'s dress can't possibly cover the underside of ${his} gigantic pregnant belly, so ${his} dress has been widened to pick up the slack.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName} dress has been let out a great deal to cover ${his} massive ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName} dress has been let out a great deal to cover ${his} massive implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName} dress has been let out a great deal to cover ${his} massive pregnant belly.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s dress has been extended to reach ${his} popped navel to ensure that ${his} giant ${slave.inflationType}-filled belly is fully covered.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s dress has been extended to reach ${his} popped navel to ensure that ${his} giant implant-filled belly is fully covered.`);
						} else {
							r.push(`${slave.slaveName}'s dress has been extended to reach ${his} popped navel to ensure that ${his} giant pregnant belly is fully covered.`);
						}
					} else if (slave.belly >= 30000) {
						if (isBellyFluidLargest) {
							r.push(`The bottom of ${slave.slaveName}'s dress lies at crotch-level due to ${his} huge ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The bottom of ${slave.slaveName}'s dress lies at crotch-level due to ${his} huge implant-filled belly.`);
						} else {
							r.push(`The bottom of ${slave.slaveName}'s dress lies at crotch-level due to ${his} huge pregnant belly.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s dress is straining to contain ${his} massively fat belly.`);
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`The fabric of ${slave.slaveName}'s dress is pushed up to just below ${his} crotch due to ${his} huge pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`The fabric of ${slave.slaveName}'s dress is pushed up to just below ${his} crotch due to ${his} huge ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The fabric of ${slave.slaveName}'s dress is pushed up to just below ${his} crotch due to ${his} huge implant-filled belly.`);
						} else {
							r.push(`The fabric of ${slave.slaveName}'s dress is pushed up to just below ${his} crotch due to ${his} huge pregnant belly.`);
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`The fabric of ${slave.slaveName}'s dress is slightly pushed up thanks to ${his} big pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`The fabric of ${slave.slaveName}'s dress is slightly pushed up thanks to ${his} hugely ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The fabric of ${slave.slaveName}'s dress is slightly pushed up thanks to ${his} huge implant-filled belly.`);
						} else {
							r.push(`The fabric of ${slave.slaveName}'s dress is slightly pushed up thanks to ${his} big pregnant belly.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s dress is filled out by ${his} hugely fat belly.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s dress is filled out by ${his} big fat belly.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s dress bulges significantly from ${his} pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s dress bulges significantly from ${his} jiggling ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s dress bulges significantly from ${his} implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s dress bulges significantly from ${his} pregnant belly.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s dress bulges from ${his} fat belly.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s dress gently bulges from ${his} pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s dress gently bulges from ${his} ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s dress gently bulges from ${his} implant-rounded belly.`);
						} else {
							r.push(`${slave.slaveName}'s dress gently bulges from ${his} growing belly.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s dress is slightly rounded by ${his} chubby belly.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s dress is slightly rounded by ${his} belly.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s dress barely shows the contours of ${his} abdominal muscles.`);
					}
					break;
				case "a tank-top":
				case "a tank-top and panties":
					if (slave.belly >= 1000000) {
					// WIP//
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`The bottom of ${slave.slaveName} tank-top lies taut across ${his} monolithic ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The bottom of ${slave.slaveName} tank-top lies taut across ${his} monolithic implant-filled belly.`);
						} else {
							r.push(`The bottom of ${slave.slaveName} tank-top lies taut across ${his} monolithic pregnant belly.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName} tank-top has been lengthened a great deal just to cover most of ${his} titanic ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName} tank-top has been lengthened a great deal just to cover most of ${his} titanic implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName} tank-top has been lengthened a great deal just to cover most of ${his} titanic pregnant belly.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							r.push(`The ${slave.slaveName} tank-top can't possibly cover the underside of ${his} gigantic ${slave.inflationType}-filled belly, so ${his} pants have been widened to pick up the slack.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The ${slave.slaveName} tank-top can't possibly cover the underside of ${his} gigantic implant-filled belly, so ${his} pants have been widened to pick up the slack.`);
						} else {
							r.push(`The ${slave.slaveName} tank-top can't possibly cover the underside of ${his} gigantic pregnant belly, so ${his} pants have been widened to pick up the slack.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName} tank-top has been let out a great deal to cover ${his} massive ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName} tank-top has been let out a great deal to cover ${his} massive implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName} tank-top has been let out a great deal to cover ${his} massive pregnant belly.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName} tank-top pants have been extended to reach ${his} popped navel to ensure that ${his} giant ${slave.inflationType}-filled belly is fully covered.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName} tank-top pants have been extended to reach ${his} popped navel to ensure that ${his} giant implant-filled belly is fully covered.`);
						} else {
							r.push(`${slave.slaveName} tank-top pants have been extended to reach ${his} popped navel to ensure that ${his} giant pregnant belly is fully covered.`);
						}
					} else if (slave.belly >= 30000) {
						if (isBellyFluidLargest) {
							r.push(`The bottom of ${slave.slaveName} tank-top lies at crotch-level due to ${his} huge ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The bottom of ${slave.slaveName} tank-top lies at crotch-level due to ${his} huge implant-filled belly.`);
						} else {
							r.push(`The bottom of ${slave.slaveName} tank-top lies at crotch-level due to ${his} huge pregnant belly.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName} tank-top is straining to contain ${his} massively fat belly.`);
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`The fabric of ${slave.slaveName} tank-top is pushed up to just below ${his} crotch due to ${his} huge pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`The fabric of ${slave.slaveName} tank-top is pushed up to just below ${his} crotch due to ${his} huge ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The fabric of ${slave.slaveName} tank-top is pushed up to just below ${his} crotch due to ${his} huge implant-filled belly.`);
						} else {
							r.push(`The fabric of ${slave.slaveName} tank-top is pushed up to just below ${his} crotch due to ${his} huge pregnant belly.`);
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`The fabric of ${slave.slaveName} tank-top is slightly pushed up thanks to ${his} big pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`The fabric of ${slave.slaveName} tank-top is slightly pushed up thanks to ${his} hugely ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The fabric of ${slave.slaveName} tank-top is slightly pushed up thanks to ${his} huge implant-filled belly.`);
						} else {
							r.push(`The fabric of ${slave.slaveName} tank-top is slightly pushed up thanks to ${his} big pregnant belly.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName} tank-top is filled out by ${his} hugely fat belly.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName} tank-top is filled out by ${his} big fat belly.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName} tank-top bulges significantly from ${his} pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName} tank-top bulges significantly from ${his} jiggling ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName} tank-top bulges significantly from ${his} implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName} tank-top bulges significantly from ${his} pregnant belly.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName} tank-top bulges from ${his} fat belly.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName} tank-top gently bulges from ${his} pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName} tank-top gently bulges from ${his} ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName} tank-top gently bulges from ${his} implant-rounded belly.`);
						} else {
							r.push(`${slave.slaveName} tank-top gently bulges from ${his} growing belly.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName} tank-top is slightly rounded by ${his} chubby belly.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName} tank-top is slightly rounded by ${his} belly.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName} tank-top barely shows the contours of ${his} abdominal muscles.`);
					}
					break;
				case "a button-up shirt and panties":
				case "a button-up shirt":
				case "a t-shirt":
				case "a t-shirt and thong":
				case "an oversized t-shirt and boyshorts":
				case "an oversized t-shirt":
				case "sport shorts and a t-shirt":
				case "a t-shirt and jeans":
				case "a t-shirt and panties":
					if (slave.belly >= 1000000) {
					// WIP//
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`The bottom of ${slave.slaveName}'s shirt lies taut across ${his} monolithic ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The bottom of ${slave.slaveName}'s shirt lies taut across ${his} monolithic implant-filled belly.`);
						} else {
							r.push(`The bottom of ${slave.slaveName}'s shirt lies taut across ${his} monolithic pregnant belly.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s shirt has been lengthened a great deal just to cover most of ${his} titanic ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s shirt has been lengthened a great deal just to cover most of ${his} titanic implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s shirt has been lengthened a great deal just to cover most of ${his} titanic pregnant belly.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s shirt can't possibly cover the underside of ${his} gigantic ${slave.inflationType}-filled belly, so ${his} pants have been widened to pick up the slack.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s shirt can't possibly cover the underside of ${his} gigantic implant-filled belly, so ${his} pants have been widened to pick up the slack.`);
						} else {
							r.push(`${slave.slaveName}'s shirt can't possibly cover the underside of ${his} gigantic pregnant belly, so ${his} pants have been widened to pick up the slack.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName} shirt has been let out a great deal to cover ${his} massive ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName} shirt has been let out a great deal to cover ${his} massive implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName} shirt has been let out a great deal to cover ${his} massive pregnant belly.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s shirt's pants have been extended to reach ${his} popped navel to ensure that ${his} giant ${slave.inflationType}-filled belly is fully covered.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s shirt's pants have been extended to reach ${his} popped navel to ensure that ${his} giant implant-filled belly is fully covered.`);
						} else {
							r.push(`${slave.slaveName}'s shirt's pants have been extended to reach ${his} popped navel to ensure that ${his} giant pregnant belly is fully covered.`);
						}
					} else if (slave.belly >= 30000) {
						if (isBellyFluidLargest) {
							r.push(`The bottom of ${slave.slaveName}'s shirt lies at crotch-level due to ${his} huge ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The bottom of ${slave.slaveName}'s shirt lies at crotch-level due to ${his} huge implant-filled belly.`);
						} else {
							r.push(`The bottom of ${slave.slaveName}'s shirt lies at crotch-level due to ${his} huge pregnant belly.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s shirt is straining to contain ${his} massively fat belly.`);
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`The bottom of ${slave.slaveName}'s shirt is pushed up to just below ${his} crotch due to ${his} huge pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`The bottom of ${slave.slaveName}'s shirt is pushed up to just below ${his} crotch due to ${his} huge ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The bottom of ${slave.slaveName}'s shirt is pushed up to just below ${his} crotch due to ${his} huge implant-filled belly.`);
						} else {
							r.push(`The bottom of ${slave.slaveName}'s shirt is pushed up to just below ${his} crotch due to ${his} huge pregnant belly.`);
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`The bottom of ${slave.slaveName}'s shirt is slightly pushed up thanks to ${his} big pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`The bottom of ${slave.slaveName}'s shirt is slightly pushed up thanks to ${his} hugely ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The bottom of ${slave.slaveName}'s shirt is slightly pushed up thanks to ${his} huge implant-filled belly.`);
						} else {
							r.push(`The bottom of ${slave.slaveName}'s shirt is slightly pushed up thanks to ${his} big pregnant belly.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s shirt is filled out by ${his} hugely fat belly.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s shirt is filled out by ${his} big fat belly.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s shirt bulges significantly from ${his} pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s shirt bulges significantly from ${his} jiggling ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s shirt bulges significantly from ${his} implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s shirt bulges significantly from ${his} pregnant belly.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s shirt bulges from ${his} fat belly.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s shirt gently bulges from ${his} pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s shirt gently bulges from ${his} ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s shirt gently bulges from ${his} implant-rounded belly.`);
						} else {
							r.push(`${slave.slaveName}'s shirt gently bulges from ${his} growing belly.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s shirt is slightly rounded by ${his} chubby belly.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s shirt is slightly rounded by ${his} belly.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s shirt barely shows the contours of ${his} abdominal muscles.`);
					}
					break;
				case "a burkini":
					if (slave.belly >= 1000000) {
					// WIP//
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`The bottom of ${slave.slaveName}'s burkini's tunic lies taut across ${his} monolithic ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The bottom of ${slave.slaveName}'s burkini's tunic lies taut across ${his} monolithic implant-filled belly.`);
						} else {
							r.push(`The bottom of ${slave.slaveName}'s burkini's tunic lies taut across ${his} monolithic pregnant belly.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s burkini's tunic has been lengthened a great deal just to cover most of ${his} titanic ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s burkini's tunic has been lengthened a great deal just to cover most of ${his} titanic implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s burkini's tunic has been lengthened a great deal just to cover most of ${his} titanic pregnant belly.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							r.push(`The tunic ${slave.slaveName}'s burkini can't possibly cover the underside of ${his} gigantic ${slave.inflationType}-filled belly, so ${his} pants have been widened to pick up the slack.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The tunic ${slave.slaveName}'s burkini can't possibly cover the underside of ${his} gigantic implant-filled belly, so ${his} pants have been widened to pick up the slack.`);
						} else {
							r.push(`The tunic ${slave.slaveName}'s burkini can't possibly cover the underside of ${his} gigantic pregnant belly, so ${his} pants have been widened to pick up the slack.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName} burkini's tunic has been let out a great deal to cover ${his} massive ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName} burkini's tunic has been let out a great deal to cover ${his} massive implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName} burkini's tunic has been let out a great deal to cover ${his} massive pregnant belly.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s burkini's pants have been extended to reach ${his} popped navel to ensure that ${his} giant ${slave.inflationType}-filled belly is fully covered.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s burkini's pants have been extended to reach ${his} popped navel to ensure that ${his} giant implant-filled belly is fully covered.`);
						} else {
							r.push(`${slave.slaveName}'s burkini's pants have been extended to reach ${his} popped navel to ensure that ${his} giant pregnant belly is fully covered.`);
						}
					} else if (slave.belly >= 30000) {
						if (isBellyFluidLargest) {
							r.push(`The bottom of ${slave.slaveName}'s burkini's tunic lies at crotch-level due to ${his} huge ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The bottom of ${slave.slaveName}'s burkini's tunic lies at crotch-level due to ${his} huge implant-filled belly.`);
						} else {
							r.push(`The bottom of ${slave.slaveName}'s burkini's tunic lies at crotch-level due to ${his} huge pregnant belly.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s burkini is straining to contain ${his} massively fat belly.`);
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`The fabric of ${slave.slaveName}'s burkini is pushed up to just below ${his} crotch due to ${his} huge pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`The fabric of ${slave.slaveName}'s burkini is pushed up to just below ${his} crotch due to ${his} huge ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The fabric of ${slave.slaveName}'s burkini is pushed up to just below ${his} crotch due to ${his} huge implant-filled belly.`);
						} else {
							r.push(`The fabric of ${slave.slaveName}'s burkini is pushed up to just below ${his} crotch due to ${his} huge pregnant belly.`);
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`The fabric of ${slave.slaveName}'s burkini is slightly pushed up thanks to ${his} big pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`The fabric of ${slave.slaveName}'s burkini is slightly pushed up thanks to ${his} hugely ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The fabric of ${slave.slaveName}'s burkini is slightly pushed up thanks to ${his} huge implant-filled belly.`);
						} else {
							r.push(`The fabric of ${slave.slaveName}'s burkini is slightly pushed up thanks to ${his} big pregnant belly.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s burkini is filled out by ${his} hugely fat belly.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s burkini is filled out by ${his} big fat belly.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s burkini bulges significantly from ${his} pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s burkini bulges significantly from ${his} jiggling ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s burkini bulges significantly from ${his} implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s burkini bulges significantly from ${his} pregnant belly.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s burkini bulges from ${his} fat belly.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s burkini gently bulges from ${his} pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s burkini gently bulges from ${his} ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s burkini gently bulges from ${his} implant-rounded belly.`);
						} else {
							r.push(`${slave.slaveName}'s burkini gently bulges from ${his} growing belly.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s burkini is slightly rounded by ${his} chubby belly.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s burkini is slightly rounded by ${his} belly.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s burkini barely shows the contours of ${his} abdominal muscles.`);
					}
					break;
				case "a hijab and blouse":
					if (slave.belly >= 1000000) {
					// WIP//
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName} takes care to ensure ${his} skirt does not slide down ${his} monolithic ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName} takes care to ensure ${his} skirt does not slide down ${his} monolithic implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName} takes care to ensure ${his} skirt does not slide down ${his} monolithic pregnant belly.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName} takes care to ensure ${his} skirt does not slide down ${his} titanic ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName} takes care to ensure ${his} skirt does not slide down ${his} titanic implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName} takes care to ensure ${his} skirt does not slide down ${his} titanic bulging pregnant belly.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName} takes care to ensure ${his} skirt does not slide down ${his} gigantic ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName} takes care to ensure ${his} skirt does not slide down ${his} gigantic implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName} takes care to ensure ${his} skirt does not slide down ${his} gigantic pregnant belly.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName} takes care to ensure ${his} skirt does not slide down ${his} massive ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName} takes care to ensure ${his} skirt does not slide down ${his} massive implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName} takes care to ensure ${his} skirt does not slide down ${his} massive pregnant belly.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							r.push(`Thanks to ${his} giant ${slave.inflationType}-swollen belly, ${slave.slaveName}'s skirt rests comfortably on top of ${his} popped navel.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`Thanks to ${his} giant implant-filled belly, ${slave.slaveName}'s skirt rests comfortably on top of ${his} popped navel.`);
						} else {
							r.push(`Thanks to ${his} giant pregnant belly ${slave.slaveName}'s skirt rests comfortably on top of ${his} popped navel.`);
						}
					} else if (slave.belly >= 30000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s skirt has been retrofitted with a large elastic band to accommodate ${his} huge ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s skirt has been retrofitted with a large elastic band to accommodate ${his} huge implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s skirt has been retrofitted with a large elastic band to accommodate ${his} huge pregnant belly.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s massively fat belly spills over the sides of ${his} skirt.`);
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s shirts are straining to contain ${his} huge pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s shirts are straining to contain ${his} huge ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s shirts are straining to contain ${his} huge implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s shirts are straining to contain ${his} huge pregnant belly.`);
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName} has trouble pulling ${his} skirt up to fit around ${his} big pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName} has trouble pulling ${his} skirt up to fit around ${his} hugely swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName} has trouble pulling ${his} skirt up to fit around ${his} huge implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName} has trouble pulling ${his} skirt up to fit around ${his} big pregnant belly.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s hugely fat belly obscures the top of ${his} skirt.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s big fat belly nearly obscures the top of ${his} skirt.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s skirt is slightly pushed down by ${his} pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s skirt is slightly pushed down by ${his} jiggling ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s skirt is slightly pushed down by ${his} implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s skirt is slightly pushed down by ${his} pregnant belly.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s blouse and skirt are filled out by ${his} fat belly.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s blouse and skirt bulge from ${his} pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s blouse and skirt bulge from ${his} ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s blouse and skirt bulge from ${his} implant-rounded belly.`);
						} else {
							r.push(`${slave.slaveName}'s blouse and skirt bulge from ${his} growing belly.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s blouse and skirt bulge slightly from ${his} chubby belly.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s blouse and skirt are slightly rounded by ${his} belly.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s blouse and skirt fully cover ${his} muscular abs.`);
					}
					break;
				case "attractive lingerie":
					if (slave.belly >= 1000000) {
					// WIP//
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s monolithic ${slave.inflationType}-filled belly completely hides ${his} lacy g-string and takes full advantage of its lack of restriction to bulge tremendously.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s monolithic implant-filled belly completely hides ${his} lacy g-string and takes full advantage of its lack of restriction to bulge tremendously.`);
						} else {
							r.push(`${slave.slaveName}'s monolithic pregnant belly completely hides ${his} lacy g-string. ${His} exposed middle gives ${his} children the room they so desperately need to keep growing.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s titanic ${slave.inflationType}-filled belly completely hides ${his} lacy g-string and takes full advantage of its lack of restriction to bulge massively.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s titanic implant-filled belly completely hides ${his} lacy g-string and takes full advantage of its lack of restriction to bulge massively.`);
						} else {
							r.push(`${slave.slaveName}'s titanic pregnant belly completely hides ${his} lacy g-string. ${His} children greatly appreciate the space granted by ${his} exposed middle and squirm happily in their cramped confines.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s gigantic ${slave.inflationType}-filled belly completely hides ${his} lacy g-string and takes full advantage of its freedom to hang heavily.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s gigantic implant-filled belly completely hides ${his} lacy g-string and takes full advantage of its freedom to hang heavily.`);
						} else {
							r.push(`${slave.slaveName}'s gigantic pregnant belly completely hides ${his} lacy g-string. ${His} children appreciate the space granted by ${his} exposed middle.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s massive ${slave.inflationType}-filled belly completely hides ${his} lacy g-string and takes full advantage of its freedom to hang heavily.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s massive implant-filled belly completely hides ${his} lacy g-string and takes full advantage of its freedom to hang heavily.`);
						} else {
							r.push(`${slave.slaveName}'s massive pregnant belly completely hides ${his} lacy g-string and takes full advantage of its freedom to bulge hugely.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s giant ${slave.inflationType}-filled belly completely hides ${his} lacy g-string and bulges heavily from ${his} body.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s giant implant-filled belly completely hides ${his} lacy g-string and bulges heavily from ${his} body.`);
						} else {
							r.push(`${slave.slaveName}'s giant pregnant belly completely hides ${his} lacy g-string and bulges heavily from ${his} body.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s massively fat belly completely hides ${his} lacy g-string.`);
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s huge pregnant belly completely hides ${his} lacy g-string.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s huge ${slave.inflationType}-filled belly completely hides ${his} lacy g-string.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s huge implant-filled belly completely hides ${his} lacy g-string.`);
						} else {
							r.push(`${slave.slaveName}'s huge pregnant belly completely hides ${his} lacy g-string.`);
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s big pregnant belly hides ${his} lacy g-string.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s lacy g-string tightly hugs the base of ${his} hugely swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s big implant-filled belly hides ${his} lacy g-string.`);
						} else {
							r.push(`${slave.slaveName}'s big pregnant belly hides ${his} lacy g-string.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s hugely fat belly hides ${his} lacy g-string.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s big fat belly hides ${his} lacy g-string.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s lacy g-string tightly hugs the base of ${his} pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s jiggling ${slave.inflationType}-filled belly hides ${his} lacy g-string.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s lacy g-string tightly hugs the base of ${his} implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s lacy g-string tightly hugs the base of ${his} pregnant belly.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s fat belly hides ${his} lacy g-string.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s small pregnant belly bulges above ${his} lacy g-string.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s ${slave.inflationType}-swollen belly rests above ${his} lacy g-string.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s implant-rounded belly bulges above ${his} lacy g-string.`);
						} else {
							r.push(`${slave.slaveName}'s growing belly bulges above ${his} lacy g-string.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s chubby belly rests above ${his} lacy g-string, concealing the top of it.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s lacy g-string rests just beneath the slight swell of ${his} lower belly, making it completely obvious.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s ripped abs are prominently displayed for all to see.`);
					}
					break;
				case "a succubus outfit":
					if (slave.belly >= 1000000) {
					// WIP//
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s monolithic pregnant belly sticks far out of ${his} corset, which is just barely laced above it and straining to hold together under the ever-increasing pressure.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s monolithic implant-filled belly sticks far out of ${his} corset, which is just barely laced above it and straining to hold together from the sheer size of ${him}.`);
						} else {
							r.push(`${slave.slaveName}'s monolithic pregnant belly sticks far out of ${his} corset, which is just barely laced above it and straining to hold together under the ever-increasing pressure.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s titanic ${slave.inflationType}-filled belly sticks far out of ${his} corset, which is barely laced above it as best ${he} can manage.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s titanic implant-filled belly sticks far out of ${his} corset, which is barely laced above it as best ${he} can manage.`);
						} else {
							r.push(`${slave.slaveName}'s titanic pregnant belly sticks far out of ${his} corset, which is barely laced above it as best ${he} can manage.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s gigantic ${slave.inflationType}-filled belly sticks far out of ${his} corset, which is laced above it as best ${he} can manage.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s gigantic implant-filled belly sticks far out of ${his} corset, which is laced above it as best ${he} can manage.`);
						} else {
							r.push(`${slave.slaveName}'s gigantic pregnant belly sticks far out of ${his} corset, which is laced above it as best ${he} can manage.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s massive ${slave.inflationType}-filled belly sticks out of ${his} corset, which is laced above it as best ${he} can manage.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s massive implant-filled belly sticks out of ${his} corset, which is laced above it as best ${he} can manage.`);
						} else {
							r.push(`${slave.slaveName}'s massive pregnant belly sticks out of ${his} corset, which is laced above it as best ${he} can manage.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s ${slave.inflationType}-filled pregnant belly sticks out of ${his} corset, which is laced above it as best ${he} can manage.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s implant-filled pregnant belly sticks out of ${his} corset, which is laced above it as best ${he} can manage.`);
						} else {
							r.push(`${slave.slaveName}'s giant pregnant belly sticks out of ${his} corset, which is laced above it as best ${he} can manage.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s massively fat belly hangs out of ${his} corset, which is laced above it as best ${he} can manage.`);
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s huge pregnant belly sticks out of ${his} corset, which is laced above it as best ${he} can manage.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s huge ${slave.inflationType}-filled belly sticks out of ${his} corset, which is laced above it as best ${he} can manage.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s huge implant-filled belly sticks out of ${his} corset, which is laced above it as best ${he} can manage.`);
						} else {
							r.push(`${slave.slaveName}'s huge pregnant belly sticks out of ${his} corset, which is laced above it as best ${he} can manage.`);
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s big pregnant belly sticks out of ${his} corset, which is laced above and below it as best ${he} can manage.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s hugely swollen belly sticks out of ${his} corset, which is laced above and below it as best ${he} can manage.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s big implant-filled belly sticks out of ${his} corset, which is laced above and below it as best ${he} can manage.`);
						} else {
							r.push(`${slave.slaveName}'s big pregnant belly sticks out of ${his} corset, which is laced above and below it as best ${he} can manage.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s hugely fat belly hangs out of ${his} corset, which is laced above and below it as best ${he} can manage.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s big fat belly hangs out of ${his} corset, which is laced above and below it allowing it to hang free.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s pregnant belly sticks out of ${his} corset, which is laced above and below it.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s jiggling ${slave.inflationType}-filled belly sticks out of ${his} corset, which is laced above and below it.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s implant-filled belly sticks out of ${his} corset, which is laced above and below it.`);
						} else {
							r.push(`${slave.slaveName}'s pregnant belly sticks out of ${his} corset, which is laced above and below it.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s fat belly sticks out of ${his} corset, which is laced above and below it allowing it to hang free.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s small pregnant belly peeks out of ${his} corset, which is laced above and below it.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s ${slave.inflationType}-swollen belly peeks out of ${his} corset, which is laced above and below it.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s implant-rounded belly peeks out of ${his} corset, which is laced above and below it.`);
						} else {
							r.push(`${slave.slaveName}'s growing pregnant belly peeks out of ${his} corset, which is laced above and below it.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s chubby belly peeks out of ${his} corset, which is laced above and below it to allow it to hang free.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s lower belly slightly bulges out from under ${his} corset, which is only laced above it to avoid discomfort.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s ripped abs are completely hidden by ${his} corset.`);
					}
					break;
				case "a slutty maid outfit":
					if (slave.belly >= 1000000) {
					// WIP//
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s maid dress fails to cover ${his} monolithic ${slave.inflationType}-filled belly at all, but the outfit includes a thin white blouse that rests meekly atop ${his} stomach.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s maid dress fails to cover ${his} monolithic implant-filled belly at all, but the outfit includes a thin white blouse that rests meekly atop ${his} stomach.`);
						} else {
							r.push(`${slave.slaveName}'s maid dress fails to cover ${his} monolithic pregnant belly at all, but the outfit includes a thin white blouse that rests meekly atop ${his} straining stomach.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s maid dress fails to cover ${his} titanic ${slave.inflationType}-filled belly at all, but the outfit includes a thin white blouse that rests meekly atop ${his} stomach.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s maid dress fails to cover ${his} titanic implant-filled belly at all, but the outfit includes a thin white blouse that rests meekly atop ${his} stomach.`);
						} else {
							r.push(`${slave.slaveName}'s maid dress fails to cover ${his} titanic pregnant belly at all, but the outfit includes a thin white blouse that rests meekly atop ${his} bulging stomach.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s maid dress fails to cover ${his} gigantic ${slave.inflationType}-filled belly at all, but the outfit includes a thin white blouse that rests meekly atop ${his} stomach.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s maid dress fails to cover ${his} gigantic implant-filled belly at all, but the outfit includes a thin white blouse that rests meekly atop ${his} stomach.`);
						} else {
							r.push(`${slave.slaveName}'s maid dress fails to cover ${his} gigantic pregnant belly at all, but the outfit includes a thin white blouse that rests meekly atop ${his} squirming stomach.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s maid dress fails to cover ${his} massive ${slave.inflationType}-filled belly at all, but the outfit includes a thin white blouse that rests meekly atop ${his} stomach.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s maid dress fails to cover ${his} massive implant-filled belly at all, but the outfit includes a thin white blouse that rests meekly atop ${his} stomach.`);
						} else {
							r.push(`${slave.slaveName}'s maid dress fails to cover ${his} massive pregnant belly at all, but the outfit includes a thin white blouse that rests meekly atop ${his} stomach.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s maid dress fails to cover ${his} giant ${slave.inflationType}-filled belly, but the outfit includes a thin white blouse that rests meekly atop ${his} stomach.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s maid dress fails to cover ${his} giant implant-filled belly, but the outfit includes a thin white blouse that rests meekly atop ${his} stomach.`);
						} else {
							r.push(`${slave.slaveName}'s maid dress fails to cover ${his} giant pregnant belly, but the outfit includes a thin white blouse that rests meekly atop ${his} stomach.`);
						}
					} else if (slave.belly >= 30000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s maid dress fails to cover ${his} huge ${slave.inflationType}-filled belly, but the outfit includes a thin white blouse that also fails to cover anything. It rests meekly on top of ${his} stomach, accomplishing little.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s maid dress fails to cover ${his} huge implant-filled belly, but the outfit includes a thin white blouse that also fails to cover anything. It rests meekly on top of ${his} stomach, accomplishing little.`);
						} else {
							r.push(`${slave.slaveName}'s maid dress fails to cover ${his} huge pregnant belly, but the outfit includes a thin white blouse that has also been completely outgrown. It rests meekly on top of ${his} stomach, accomplishing little.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s maid dress fails to cover ${his} massively fat belly, but the outfit includes a thin white blouse that, when stretched, barely manages to conceal the upper part of ${his} gut, leaving the rest to jiggle freely and frequently escape the confines of its cloth prison.`);
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s maid dress fails to cover ${his} huge pregnant belly, but the outfit includes a thin white blouse that, when stretched, only manages to cover half of ${his} stomach.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s maid dress fails to cover ${his} huge ${slave.inflationType}-filled belly, but the outfit includes a thin white blouse that, when stretched, only manages to cover half of ${his} stomach. ${He} can do little to stop it from frequently riding up the rest of the way, however.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s maid dress fails to cover ${his} huge implant-filled belly, but the outfit includes a thin white blouse that, when stretched, only manages to cover half of ${his} stomach. ${He} can do little to stop it from frequently riding up the rest of the way, however.`);
						} else {
							r.push(`${slave.slaveName}'s maid dress fails to cover ${his} huge pregnant belly, but the outfit includes a thin white blouse that, when stretched, only manages to cover half of ${his} stomach. ${He} can do little to stop it from frequently riding up the rest of the way, however.`);
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s maid dress fails to cover ${his} big pregnant belly, but the outfit includes a thin white blouse that, when stretched, barely manages to contain ${his} stomach.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s maid dress fails to cover ${his} hugely swollen belly, but the outfit includes a thin white blouse that, when stretched, barely manages to contain ${his} swollen stomach.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s maid dress fails to cover ${his} big implant-filled belly, but the outfit includes a thin white blouse that, when stretched, barely manages to contain ${his} stomach.`);
						} else {
							r.push(`${slave.slaveName}'s maid dress fails to cover ${his} big pregnant belly, but the outfit includes a thin white blouse that, when stretched, barely manages to contain ${his} stomach. ${He} can do little to stop it from frequently riding up, however.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s maid dress fails to cover ${his} hugely fat belly, but the outfit includes a thin white blouse that, when stretched, barely manages to contain ${his} gut. ${He} can do little to stop it from riding up the fleshy mass as ${he} moves.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s maid dress fails to cover ${his} big fat belly, but the outfit includes a thin white blouse that, when stretched, manages to wrangle ${his} gut. It does little to stifle the jiggle, however.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s maid dress fails to cover ${his} pregnant belly, but the outfit includes a thin white blouse that tightly hugs ${his} stomach.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s maid dress fails to cover ${his} jiggling ${slave.inflationType}-filled belly, but the outfit includes a thin white blouse that tightly hugs ${his} bloated stomach.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s maid dress fails to cover ${his} implant-filled belly, but the outfit includes a thin white blouse that tightly hugs ${his} stomach.`);
						} else {
							r.push(`${slave.slaveName}'s maid dress fails to cover ${his} pregnant belly, but the outfit includes a thin white blouse that tightly hugs ${his} stomach.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s maid dress fails to cover ${his} fat belly, but the outfit includes a thin white blouse that manages to wrangle ${his} gut.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s maid dress is slightly distended by ${his} small pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s maid dress is slightly distended by ${his} ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s maid dress is slightly distended by ${his} implant-rounded belly.`);
						} else {
							r.push(`${slave.slaveName}'s maid dress is slightly distended by ${his} growing belly.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s maid dress is slightly distended by ${his} chubby belly.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s maid dress is tight enough to show the slight curve to ${his} lower belly.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s maid dress completely covers ${his} ripped abs, but is tight enough to give a hint of a six pack.`);
					}
					break;
				case "a nice maid outfit":
					if (slave.belly >= 1000000) {
					// WIP//
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s maid dress is almost conservative, even though it has been specially tailored to handle a slave as gravid as ${him}. It hugs ${his} monolithic ${slave.inflationType}-filled belly thoroughly, though it does nothing to hide ${his} popped navel, poking through the front, and draws attention to how large ${he} is. ${His} apron can't handle its width and barely covers the middle of ${his} swell.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s maid dress is almost conservative, even though it has been specially tailored to handle a slave as gravid as ${him}. It hugs ${his} monolithic implant-filled belly thoroughly, though it does nothing to hide ${his} popped navel, poking through the front, and draws attention to how large ${he} is. ${His} apron can't handle its width and barely covers the middle of ${his} swell.`);
						} else {
							r.push(`${slave.slaveName}'s maid dress is almost conservative, even though it has been specially tailored to handle a slave as gravid as ${him}. It hugs ${his} monolithic pregnant belly thoroughly, though it does nothing to hide ${his} popped navel and bulging brood, nor how large ${he} has become. ${His} apron can't handle its width and barely covers the middle of ${his} swell.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s maid dress is almost conservative, even though it has been specially tailored to handle a slave as gravid as ${him}. It hugs ${his} titanic ${slave.inflationType}-filled belly thoroughly, though it does nothing to hide ${his} popped navel, poking through the front, and draws attention to how large ${he} is. ${His} apron can't handle its width and only covers the middle of ${his} swell.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s maid dress is almost conservative, even though it has been specially tailored to handle a slave as gravid as ${him}. It hugs ${his} titanic implant-filled belly thoroughly, though it does nothing to hide ${his} popped navel, poking through the front, and draws attention to how large ${he} is. ${His} apron can't handle its width and only covers the middle of ${his} swell.`);
						} else {
							r.push(`${slave.slaveName}'s maid dress is almost conservative, even though it has been specially tailored to handle a slave as gravid as ${him}. It hugs ${his} titanic pregnant belly thoroughly, though it does nothing to hide ${his} popped navel and bulging brood, nor how large ${he} has become. ${His} apron can't handle its width and only covers the middle of ${his} swell.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s maid dress is almost conservative, even though it has been specially tailored to handle a slave as gravid as ${him}. It hugs ${his} gigantic ${slave.inflationType}-filled belly thoroughly, though it does nothing to hide ${his} popped navel, poking through the front, and draws attention to how large ${he} is. ${His} apron can't handle its width and only covers the middle of ${his} swell.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s maid dress is almost conservative, even though it has been specially tailored to handle a slave as gravid as ${him}. It hugs ${his} gigantic implant-filled belly thoroughly, though it does nothing to hide ${his} popped navel, poking through the front, and draws attention to how large ${he} is. ${His} apron can't handle its width and only covers the middle of ${his} swell.`);
						} else {
							r.push(`${slave.slaveName}'s maid dress is almost conservative, even though it has been specially tailored to handle a slave as gravid as ${him}. It hugs ${his} gigantic pregnant belly thoroughly, though it does nothing to hide ${his} popped navel, poking through the front, and draws attention to how large ${he} has grown. ${His} apron can't handle its width and only covers the middle of ${his} swell.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s maid dress is almost conservative, even though it has been specially tailored to handle a slave as gravid as ${him}. It hugs ${his} massive ${slave.inflationType}-filled belly thoroughly, though it does nothing to hide ${his} popped navel, poking through the front, and draws attention to how large ${he} is.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s maid dress is almost conservative, even though it has been specially tailored to handle a slave as gravid as ${him}. It hugs ${his} massive implant-filled belly thoroughly, though it does nothing to hide ${his} popped navel, poking through the front, and draws attention to how large ${he} is.`);
						} else {
							r.push(`${slave.slaveName}'s maid dress is almost conservative, even though it has been specially tailored to handle a slave as gravid as ${him}. It hugs ${his} massive pregnant belly thoroughly, though it does nothing to hide ${his} popped navel, poking through the front, and draws attention to how large ${he} has grown.`);
						}
					} else if (slave.belly >= 150000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s maid dress is almost conservative, even though it has been specially tailored to handle a slave as gravid as ${him}. It hugs ${his} giant ${slave.inflationType}-filled belly thoroughly, though it does nothing to hide ${his} popped navel, poking through the front, and draws attention to how large ${he} is.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s maid dress is almost conservative, even though it has been specially tailored to handle a slave as gravid as ${him}. It hugs ${his} giant implant-filled belly thoroughly, though it does nothing to hide ${his} popped navel, poking through the front, and draws attention to how large ${he} is.`);
						} else {
							r.push(`${slave.slaveName}'s maid dress is almost conservative, even though it has been specially tailored to handle a slave as gravid as ${him}. It hugs ${his} giant pregnant belly thoroughly, though it does nothing to hide ${his} popped navel, poking through the front, and draws attention to how large ${he} has grown.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s maid dress is almost conservative. It barely covers ${his} giant seam splitting ${slave.inflationType}-filled belly, though it cannot hide ${his} popped navel, poking through the front.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s maid dress is almost conservative. It barely covers ${his} giant seam splitting implant-filled belly, though it cannot hide ${his} popped navel, poking through the front.`);
						} else {
							r.push(`${slave.slaveName}'s maid dress is almost conservative. It barely covers ${his} giant pregnant belly, though it cannot hide ${his} popped navel, poking through the front. If ${he} grows any larger, ${he} will risk tearing ${his} outfit at the seams.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s maid dress is almost conservative, it barely contains ${his} massively fat belly. Its seams strain against ${his} wobbling mass.`);
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s maid dress is almost conservative. It covers ${his} huge pregnant belly completely, though it cannot hide ${his} popped navel, poking through the front.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s maid dress is almost conservative. It covers ${his} huge ${slave.inflationType}-filled belly completely, though it cannot hide ${his} popped navel, poking through the front.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s maid dress is almost conservative. It covers ${his} huge implant-filled belly completely, though it cannot hide ${his} popped navel, poking through the front.`);
						} else {
							r.push(`${slave.slaveName}'s maid dress is almost conservative. It covers ${his} huge pregnant belly completely, though it cannot hide ${his} popped navel, poking through the front.`);
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s maid dress is almost conservative. It covers ${his} big pregnant belly completely, though it cannot hide ${his} popped navel, poking through the front.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s maid dress is almost conservative. It covers ${his} hugely swollen belly completely, but does nothing to hide its size and shape.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s maid dress is almost conservative. It covers ${his} big implant-filled belly completely, though it cannot hide ${his} popped navel, poking through the front.`);
						} else {
							r.push(`${slave.slaveName}'s maid dress is almost conservative. It covers ${his} big pregnant belly completely, though it cannot hide ${his} popped navel, poking through the front.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s maid dress is almost conservative; it covers ${his} hugely fat belly completely, but does nothing to hide how big and jiggly it is.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s maid dress is almost conservative; it covers ${his} big fat belly completely, but does nothing to hide how big and jiggly it is.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s maid dress is almost conservative; it covers ${his} pregnant belly completely, but does nothing to hide just how large it is.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s maid dress is almost conservative; it covers ${his} jiggling ${slave.inflationType}-filled belly completely, but does nothing to hide its size and motion.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s maid dress is almost conservative; it covers ${his} implant-filled belly completely, but does nothing to hide just how large it is.`);
						} else {
							r.push(`${slave.slaveName}'s maid dress is almost conservative; it covers ${his} pregnant belly completely, but does nothing to hide just how large it has gotten.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s maid dress is almost conservative; it covers ${his} fat belly completely, but does nothing to hide how big it is.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s maid dress is almost conservative; it covers ${his} small belly completely.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s maid dress is almost conservative; it covers ${his} ${slave.inflationType}-swollen belly completely.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s maid dress is almost conservative; it covers ${his} implant-rounded belly completely.`);
						} else {
							r.push(`${slave.slaveName}'s maid dress is almost conservative; it covers ${his} growing belly completely.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s maid dress is almost conservative; it covers ${his} chubby belly completely.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s maid dress is almost conservative; it covers ${his} growing belly completely.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s maid dress is almost conservative; it covers ${his} ripped abs completely.`);
					}
					break;
				case "a fallen nuns habit":
					if (slave.belly >= 1000000) {
					// WIP//
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s latex habit's corset is left hanging open fully revealing ${his} monolithic ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s latex habit's corset is left hanging open fully revealing ${his} monolithic implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s latex habit's corset is left hanging open fully revealing ${his} monolithic pregnant belly. ${His} children greatly appreciate the freedom, even though its still quite cramped.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s latex habit's corset is left hanging open fully revealing ${his} titanic ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s latex habit's corset is left hanging open fully revealing ${his} titanic implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s latex habit's corset is left hanging open fully revealing ${his} titanic pregnant belly. ${His} children appreciate the freedom.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s latex habit's corset is left hanging open fully revealing ${his} gigantic ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s latex habit's corset is left hanging open fully revealing ${his} gigantic implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s latex habit's corset is left hanging open fully revealing ${his} gigantic pregnant belly.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s latex habit's corset is left hanging open fully revealing ${his} massive ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s latex habit's corset is left hanging open fully revealing ${his} massive implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s latex habit's corset is left hanging open fully revealing ${his} massive pregnant belly.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s latex habit's corset is left hanging open fully revealing ${his} giant ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s latex habit's corset is left hanging open fully revealing ${his} giant implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s latex habit's corset is left hanging open fully revealing ${his} giant pregnant belly.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s latex habit's corset is left hanging open allowing ${his} massively fat belly to hang free.`);
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s latex habit's corset is left hanging open fully revealing ${his} huge pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s latex habit's corset is left hanging open fully revealing ${his} huge ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s latex habit's corset is left hanging open fully revealing ${his} huge implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s latex habit's corset is left hanging open fully revealing ${his} huge pregnant belly.`);
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s latex habit's corset is left hanging open fully revealing ${his} big pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s latex habit's corset is left hanging open fully revealing ${his} hugely swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s latex habit's corset is left hanging open fully revealing ${his} big implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s latex habit's corset is left hanging open fully revealing ${his} big pregnant belly.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s latex habit's corset is left hanging open allowing ${his} hugely fat belly to hang free.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s latex habit's corset is left hanging open allowing ${his} big fat belly to hang free.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s latex habit's corset is left hanging open fully revealing ${his} pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s latex habit's corset is left hanging open fully revealing ${his} jiggling ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s latex habit's corset is left hanging open fully revealing ${his} implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s latex habit's corset is left hanging open fully revealing ${his} pregnant belly.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s latex habit's corset is barely holding together over ${his} fat belly, causing flab to spill out from every opening.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s latex habit's corset struggles to hold ${his} small pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s latex habit's corset struggles to hold ${his} ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s latex habit's corset struggles to hold ${his} implant-rounded belly.`);
						} else {
							r.push(`${slave.slaveName}'s latex habit's corset struggles to hold ${his} growing belly.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s latex habit's corset compresses ${his} chubby belly forcing pudge to spill out from under it.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s latex habit's corset uncomfortably compresses the slight swell of ${his} lower belly.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s latex habit's corset tightly hugs ${his} ripped abs.`);
					}
					break;
				case "a penitent nuns habit":
					if (slave.belly >= 1000000) {
					// WIP//
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s monolithic, implant-filled belly stretches ${his} habit to the limit and looks absolutely blasphemous. The coarse cloth aggravates ${his} straining, very sensitive skin.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s monolithic, implant-filled belly stretches ${his} habit to the limit and looks absolutely blasphemous. The coarse cloth aggravates ${his} straining, very sensitive skin.`);
						} else {
							r.push(`${slave.slaveName}'s monolithic pregnant belly stretches ${his} habit to the limit and looks absolutely blasphemous. The coarse cloth aggravates ${his} straining, very sensitive skin; doubly so, as ${his} distress causes ${his} babies to squirm as much as they can in ${his} cramped womb.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s titanic implant-filled belly stretches ${his} habit and looks absolutely blasphemous. The coarse cloth aggravates ${his} overly taut, very sensitive skin.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s titanic implant-filled belly stretches ${his} habit and looks absolutely blasphemous. The coarse cloth aggravates ${his} overly taut, very sensitive skin.`);
						} else {
							r.push(`${slave.slaveName}'s titanic pregnant belly stretches ${his} habit and looks absolutely blasphemous. The coarse cloth aggravates ${his} overly taut, very sensitive skin; doubly so, as ${his} distress causes ${his} babies to begin squirming.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s gigantic implant-filled belly completely fills ${his} habit while looking absolutely blasphemous. The coarse cloth aggravates ${his} expansive, taut, sensitive skin.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s gigantic implant-filled belly completely fills ${his} habit while looking absolutely blasphemous. The coarse cloth aggravates ${his} expansive, taut, sensitive skin.`);
						} else {
							r.push(`${slave.slaveName}'s gigantic pregnant belly completely fills ${his} habit while looking absolutely blasphemous. The coarse cloth aggravates ${his} expansive, taut, sensitive skin; doubly so, as ${his} distress causes ${his} babies to begin squirming.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s massive implant-filled belly fills ${his} habit while looking absolutely blasphemous. The coarse cloth aggravates ${his} expansive, taut, sensitive skin.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s massive implant-filled belly fills ${his} habit while looking absolutely blasphemous. The coarse cloth aggravates ${his} expansive, taut, sensitive skin.`);
						} else {
							r.push(`${slave.slaveName}'s massive pregnant belly fills ${his} habit while looking absolutely blasphemous. The coarse cloth aggravates ${his} expansive, taut, sensitive skin.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName} looks absolutely blasphemous in a habit bearing such a giant implant-filled belly. The coarse cloth aggravates ${his} sensitive overly stretched skin.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName} looks absolutely blasphemous in a habit bearing such a giant implant-filled belly. The coarse cloth aggravates ${his} sensitive overly stretched skin.`);
						} else {
							r.push(`${slave.slaveName} looks absolutely blasphemous in a habit bearing such a giant pregnant belly. The coarse cloth aggravates ${his} sensitive overly stretched skin.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s massively fat belly completely fills ${his} habit. Between the extra skin and ${his} excessive jiggling, the coarse cloth is extra aggravating and entirely relentless.`);
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName} looks absolutely blasphemous in a habit with such a huge pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName} looks absolutely blasphemous in a habit with such a huge jiggling ${slave.inflationType}-filled belly. The coarse cloth aggravates ${his} sensitive stretched skin.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName} looks absolutely blasphemous in a habit with such a huge implant-filled belly. The coarse cloth aggravates ${his} sensitive stretched skin.`);
						} else {
							r.push(`${slave.slaveName} looks absolutely blasphemous in a habit with such a huge pregnant belly. The coarse cloth aggravates ${his} sensitive stretched skin.`);
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName} looks absolutely blasphemous in a habit with such a big pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName} looks absolutely blasphemous in a habit with such a hugely swollen belly. The coarse cloth aggravates ${his} sensitive stretched skin.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName} looks absolutely blasphemous in a habit with such a big implant-filled belly. The coarse cloth aggravates ${his} sensitive stretched skin.`);
						} else {
							r.push(`${slave.slaveName} looks absolutely blasphemous in a habit with such a big pregnant belly. The coarse cloth aggravates ${his} sensitive stretched skin.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s hugely fat belly fills ${his} habit. Between the extra skin and ${his} excessive jiggling, the coarse cloth is extra aggravating.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s big fat belly fills out ${his} habit. Between the extra skin and ${his} excessive jiggling, the coarse cloth is extra aggravating.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName} looks absolutely blasphemous in a habit with a pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName} looks absolutely blasphemous in a habit with a jiggling ${slave.inflationType}-filled belly. The coarse cloth aggravates ${his} sensitive stretched skin.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName} looks absolutely blasphemous in a habit with an implant-filled belly. The coarse cloth aggravates ${his} sensitive stretched skin.`);
						} else {
							r.push(`${slave.slaveName} looks absolutely blasphemous in a habit with a pregnant belly. The coarse cloth aggravates ${his} sensitive stretched skin.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s fat belly fills out ${his} habit. The coarse cloth has plenty of extra skin to aggravate.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s habit gently bulges from ${his} small pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s habit gently bulges from ${his} ${slave.inflationType}-swollen belly. The coarse cloth aggravates ${his} sensitive skin.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s habit gently bulges from ${his} implant-rounded belly. The coarse cloth aggravates ${his} sensitive skin.`);
						} else {
							r.push(`${slave.slaveName}'s habit gently bulges from ${his} growing belly. The coarse cloth aggravates ${his} sensitive skin.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s habit gently bulges from ${his} chubby belly. The coarse cloth takes advantage of the extra surface area.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s habit may hide the slight swell to ${his} habit, but the coarse cloth keeps ${him} fully aware of it.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s ripped abs rub uncomfortably against ${his} habit.`);
					}
					break;
				case "a Santa dress":
					if (slave.belly >= 1000000) {
					// WIP//
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s dress's belt can no longer cross all of ${his} monolithic ${slave.inflationType}-filled belly, let alone ${his} whole body.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s dress's belt can no longer cross all of ${his} monolithic implant-filled belly, let alone ${his} whole body.`);
						} else {
							r.push(`${slave.slaveName}'s dress's belt can no longer cross all of ${his} monolithic pregnant belly, let alone ${his} whole body.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							r.push(`The bottom of ${slave.slaveName}'s dress is turning taut due to ${his} titanic ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The bottom of ${slave.slaveName}'s dress is turning taut due to ${his} titanic implant-filled belly.`);
						} else {
							r.push(`The bottom of ${slave.slaveName}'s dress is turning taut due to ${his} titanic pregnant belly.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							r.push(`The fur trim on ${slave.slaveName}'s dress appears ragged from being stretched by ${his} gigantic ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The fur trim on ${slave.slaveName}'s dress appears ragged from being stretched by ${his} gigantic implant-filled belly.`);
						} else {
							r.push(`The fur trim on ${slave.slaveName}'s dress appears ragged from being stretched by ${his} gigantic pregnant belly.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							r.push(`The thick fabric of ${slave.slaveName}'s dress is stretched thin over ${his} massive ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The thick fabric of ${slave.slaveName}'s dress is stretched thin over ${his} massive implant-filled belly.`);
						} else {
							r.push(`The thick fabric of ${slave.slaveName}'s dress is stretched thin over ${his} massive pregnant belly.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s dress's belt has been glued to it, rather than try to actually encircle ${his} giant ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s dress's belt has been glued to it, rather than try to actually encircle ${his} giant implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s dress's belt has been glued to it, rather than try to actually encircle ${his} giant pregnant belly.`);
						}
					} else if (slave.belly >= 30000) {
						if (isBellyFluidLargest) {
							r.push(`The bottom of ${slave.slaveName}'s huge ${slave.inflationType}-filled belly is stretching ${his} dress's belt to its breaking point.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The bottom of ${slave.slaveName}'s huge implant-filled belly is stretching ${his} dress's belt to its breaking point.`);
						} else {
							r.push(`The bottom of ${slave.slaveName}'s huge pregnant belly is stretching ${his} dress's belt to its breaking point.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s massively fat belly emphasizes the design of and strains ${his} festive dress.`);
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s leather belt can only just barely fit around ${his} huge pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s leather belt can only just barely fit around ${his} huge ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s leather belt can only just barely fit around ${his} huge implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s leather belt can only just barely fit around ${his} huge pregnant belly.`);
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s belt is struggling to fully encircle ${his} big pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s belt is struggling to fully encircle ${his} hugely ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s belt is struggling to fully encircle ${his} huge implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s belt is struggling to fully encircle ${his} big pregnant belly.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s hugely fat belly accentuates the design of and badly stretches out ${his} festive dress.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s big fat belly stretches out the leather belt around ${his} waist.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`The belt on ${slave.slaveName}'s dress has been loosened to accommodate the significant bulge of ${his} pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`The belt on ${slave.slaveName}'s dress has been loosened to accommodate the significant bulge of ${his} jiggling ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The belt on ${slave.slaveName}'s dress has been loosened to accommodate the significant bulge of ${his} implant-filled belly.`);
						} else {
							r.push(`The belt on ${slave.slaveName}'s dress has been loosened to accommodate the significant bulge of ${his} pregnant belly.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s fat belly bulges around the belt around ${his} waist.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`The belt of ${slave.slaveName}'s dress lies atop the gentle bulge of ${his} pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`The belt of ${slave.slaveName}'s dress lies atop the gentle bulge of ${his} ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The belt of ${slave.slaveName}'s dress lies atop the gentle bulge of ${his} implant-rounded belly.`);
						} else {
							r.push(`The belt of ${slave.slaveName}'s dress lies atop the gentle bulge of ${his} growing belly.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s dress is slightly rounded by ${his} chubby belly.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s dress is slightly rounded by ${his} belly.`);
					} else if (slave.muscles > 30) {
						r.push(`The fabric of ${slave.slaveName}'s dress is thick enough to cover the contours of ${his} abdominal muscles.`);
					}
					break;
				case "overalls":
					if (slave.belly >= 1000000) {
						if (isBellyFluidLargest) {
							if (slave.boobs > (slave.belly + 250)) {
								r.push(`${slave.slaveName}'s megalithic breasts keep ${his} overalls away from ${his} unfathomable, hyper-swollen, ${slave.inflationType}-filled belly but do little to hide its imposing mass as it lewdly distends from behind the straining garment.`);
							} else {
								r.push(`${slave.slaveName}'s overalls can only cover a relatively small strip in the center of ${his} unfathomable, hyper-swollen, ${slave.inflationType}-filled belly.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > (slave.belly + 250)) {
								r.push(`${slave.slaveName}'s megalithic breasts keep ${his} overalls away from ${his} unfathomable, hyper-swollen, implant-filled belly but do little to hide its imposing mass as it lewdly distends from behind the straining garment.`);
							} else {
								r.push(`${slave.slaveName}'s overalls can only cover a relatively small strip in the center of ${his} unfathomable, hyper-swollen, implant-filled belly.`);
							}
						} else {
							if (slave.boobs > (slave.belly + 250)) {
								r.push(`${slave.slaveName}'s megalithic breasts keep ${his} overalls away from ${his} unfathomable, hyper-swollen pregnant belly but do little to hide its imposing mass as it lewdly distends from behind the straining garment.`);
							} else {
								r.push(`${slave.slaveName}'s overalls can only cover a relatively small strip in the center of ${his} unfathomable, hyper-swollen pregnant belly.`);
							}
						}
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							if (slave.boobs > (slave.belly + 250)) {
								r.push(`${slave.slaveName}'s immense breasts push out ${his} overalls away from ${his} monolithic ${slave.inflationType}-filled belly but do little to hide its imposing mass as it lewdly distends from behind the overstretched garment.`);
							} else {
								r.push(`${slave.slaveName}'s overalls indent the sensitive skin of ${his} monolithic ${slave.inflationType}-filled belly.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > (slave.belly + 250)) {
								r.push(`${slave.slaveName}'s immense breasts push out ${his} overalls away from ${his} monolithic implant-filled belly but do little to hide its imposing mass as it lewdly distends from behind the overstretched garment.`);
							} else {
								r.push(`${slave.slaveName}'s overalls indent the sensitive skin of ${his} monolithic implant-filled belly.`);
							}
						} else {
							if (slave.boobs > (slave.belly + 250)) {
								r.push(`${slave.slaveName}'s immense breasts push out ${his} overalls away from ${his} monolithic pregnant belly but do little to hide its imposing mass as it lewdly distends from behind the overstretched garment.`);
							} else {
								r.push(`${slave.slaveName}'s overalls indent the sensitive skin of ${his} monolithic pregnant belly.`);
							}
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							if (slave.boobs > (slave.belly + 250)) {
								r.push(`${slave.slaveName}'s gargantuan breasts push out ${his} overalls away from ${his} titanic ${slave.inflationType}-filled belly but do little to hide its size as it spills out from behind the stretched garment.`);
							} else {
								r.push(`${slave.slaveName}'s overalls work to compress ${his} titanic ${slave.inflationType}-filled belly.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > (slave.belly + 250)) {
								r.push(`${slave.slaveName}'s gargantuan breasts push out ${his} overalls away from ${his} titanic implant-filled belly but do little to hide its size as it spills out from behind the stretched garment.`);
							} else {
								r.push(`${slave.slaveName}'s overalls work to compress ${his} titanic implant-filled belly.`);
							}
						} else {
							if (slave.boobs > (slave.belly + 250)) {
								r.push(`${slave.slaveName}'s gargantuan breasts push out ${his} overalls away from ${his} titanic pregnant belly but do little to hide its size and shape as it spills out from behind the stretched garment.`);
							} else {
								r.push(`${slave.slaveName}'s overalls work to compress ${his} titanic pregnant belly allowing the squirming mass to bulge freely.`);
							}
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							if (slave.boobs > (slave.belly + 250)) {
								r.push(`${slave.slaveName}'s tremendous breasts push out ${his} overalls away from ${his} gigantic ${slave.inflationType}-filled belly but do little to hide its size as it bulges out from behind the taut garment.`);
							} else {
								r.push(`${slave.slaveName}'s overalls push against ${his} gigantic ${slave.inflationType}-filled belly.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > (slave.belly + 250)) {
								r.push(`${slave.slaveName}'s tremendous breasts push out ${his} overalls away from ${his} gigantic implant-filled belly but do little to hide its size as it bulges out from behind the taut garment.`);
							} else {
								r.push(`${slave.slaveName}'s overalls push against ${his} gigantic implant-filled belly.`);
							}
						} else {
							if (slave.boobs > (slave.belly + 250)) {
								r.push(`${slave.slaveName}'s tremendous breasts push out ${his} overalls away from ${his} gigantic pregnant belly but do little to hide its size as it bulges out from behind the taut garment.`);
							} else {
								r.push(`${slave.slaveName}'s overalls push against ${his} gigantic pregnant belly .`);
							}
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							if (slave.boobs > (slave.belly + 250)) {
								r.push(`${slave.slaveName}'s monolithic breasts push out ${his} overalls away from ${his} massive ${slave.inflationType}-filled belly but do little to hide its size.`);
							} else {
								r.push(`The front of ${slave.slaveName}'s overalls can barely cover a quarter of ${his} massive ${slave.inflationType}-filled belly.`);
							}
							r.push(`${He}'s left ${his} pants unfastened to give the hefty globe more room.`);
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > (slave.belly + 250)) {
								r.push(`${slave.slaveName}'s monolithic breasts push out ${his} overalls away from ${his} massive implant-filled belly but do little to hide its size.`);
							} else {
								r.push(`The front of ${slave.slaveName}'s overalls can barely cover a quarter of ${his} massive implant-filled belly.`);
							}
						} else {
							if (slave.boobs > (slave.belly + 250)) {
								r.push(`${slave.slaveName}'s monolithic breasts push out ${his} overalls away from ${his} massive pregnant belly but do little to hide its size.`);
							} else {
								r.push(`The front of ${slave.slaveName}'s overalls can barely cover a quarter of ${his} massive pregnant belly.`);
							}
						}
					} else if (slave.belly >= 150000) {
						if (isBellyFluidLargest) {
							if (slave.boobs > (slave.belly + 250)) {
								r.push(`${slave.slaveName}'s titanic breasts push out ${his} overalls so far that ${his} giant ${slave.inflationType}-filled belly is left slightly uncovered.`);
							} else {
								r.push(`${slave.slaveName}'s giant ${slave.inflationType}-filled belly strains the fabric of ${his} overalls.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > (slave.belly + 250)) {
								r.push(`${slave.slaveName}'s titanic breasts push out ${his} overalls so far that ${his} giant implant-filled belly is left slightly uncovered.`);
							} else {
								r.push(`${slave.slaveName}'s giant implant-filled belly strains the fabric of ${his} overalls.`);
							}
						} else {
							if (slave.boobs > (slave.belly + 250)) {
								r.push(`${slave.slaveName}'s titanic breasts push out ${his} overalls so far that ${his} giant pregnant belly is left slightly uncovered.`);
							} else {
								r.push(`${slave.slaveName}'s giant pregnant belly strains the fabric of ${his} overalls.`);
							}
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							if (slave.boobs > (slave.belly + 250)) {
								r.push(`${slave.slaveName}'s colossal breasts push out ${his} overalls so far that ${his} giant ${slave.inflationType}-filled belly is left partially uncovered.`);
							} else {
								r.push(`The front of ${slave.slaveName}'s overalls barely covers a third of ${his} giant ${slave.inflationType}-filled belly.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > (slave.belly + 250)) {
								r.push(`${slave.slaveName}'s colossal breasts push out ${his} overalls so far that ${his} giant implant-filled belly is left partially uncovered.`);
							} else {
								r.push(`The front of ${slave.slaveName}'s overalls barely covers a third of ${his} giant implant-filled belly.`);
							}
						} else {
							if (slave.boobs > (slave.belly + 250)) {
								r.push(`${slave.slaveName}'s colossal breasts push out ${his} overalls so far that ${his} giant pregnant belly is left partially uncovered.`);
							} else {
								r.push(`The front of ${slave.slaveName}'s overalls barely covers a third of ${his} giant pregnant belly.`);
							}
							r.push(`${He}'s left ${his} pants unfastened to give the firm dome more room.`);
						}
					} else if (slave.belly >= 45000) {
						if (isBellyFluidLargest) {
							if (slave.boobs > (slave.belly + 250)) {
								r.push(`${slave.slaveName}'s gigantic breasts push out ${his} overalls so far that ${his} huge ${slave.inflationType}-filled belly is left halfway uncovered.`);
							} else {
								r.push(`The front of ${slave.slaveName}'s overalls barely covers half of ${his} huge ${slave.inflationType}-filled pregnant belly.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > (slave.belly + 250)) {
								r.push(`${slave.slaveName}'s gigantic breasts push out ${his} overalls so far that ${his} huge implant-filled belly is left halfway uncovered.`);
							} else {
								r.push(`The front of ${slave.slaveName}'s overalls barely covers half of ${his} huge implant-filled pregnant belly.`);
							}
						} else {
							if (slave.boobs > (slave.belly + 250)) {
								r.push(`${slave.slaveName}'s gigantic breasts push out ${his} overalls so far that ${his} huge pregnant belly is left halfway uncovered.`);
							} else {
								r.push(`The front of ${slave.slaveName}'s overalls barely covers half of ${his} huge pregnant belly.`);
							}
						}
					} else if (slave.weight > 190) {
						if (slave.boobs > (slave.belly + 250)) {
							r.push(`${slave.slaveName}'s enormous breasts push out ${his} overalls so far that ${his} massively fat belly is left mostly uncovered.`);
						} else {
							r.push(`${slave.slaveName}'s massively fat belly spills out over the sides of ${his} overalls.`);
						}
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							if (slave.boobs > (slave.belly + 250)) {
								r.push(`${slave.slaveName}'s enormous breasts push out ${his} overalls so far that ${his} huge pregnant belly is left mostly uncovered.`);
							} else {
								r.push(`${slave.slaveName}'s overalls are pulled taut by ${his} huge pregnant belly.`);
							}
						} else if (isBellyFluidLargest) {
							if (slave.boobs > (slave.belly + 250)) {
								r.push(`${slave.slaveName}'s enormous breasts push out ${his} overalls so far that ${his} huge ${slave.inflationType}-filled belly is left mostly uncovered.`);
							} else {
								r.push(`${slave.slaveName}'s overalls are pulled taut by ${his} huge ${slave.inflationType}-filled belly.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > (slave.belly + 250)) {
								r.push(`${slave.slaveName}'s enormous breasts push out ${his} overalls so far that ${his} huge implant-filled belly is left mostly uncovered.`);
							} else {
								r.push(`${slave.slaveName}'s overalls are pulled taut by ${his} huge implant-filled belly.`);
							}
						} else {
							if (slave.boobs > (slave.belly + 250)) {
								r.push(`${slave.slaveName}'s enormous breasts push out ${his} overalls so far that ${his} huge pregnant belly is left mostly uncovered.`);
							} else {
								r.push(`${slave.slaveName}'s overalls are pulled taut by ${his} huge pregnant belly.`);
							}
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							if (slave.boobs > (slave.belly + 250)) {
								r.push(`${slave.slaveName}'s massive breasts push out ${his} overalls so far that ${his} big pregnant belly is left almost entirely uncovered.`);
							} else {
								r.push(`${slave.slaveName}'s big pregnant belly stretches out the fabric of ${his} overalls.`);
							}
						} else if (isBellyFluidLargest) {
							if (slave.boobs > (slave.belly + 250)) {
								r.push(`${slave.slaveName}'s massive breasts push out ${his} overalls so far that ${his} hugely swollen belly is left almost entirely uncovered.`);
							} else {
								r.push(`${slave.slaveName}'s hugely swollen belly stretches out the fabric of ${his} overalls.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > (slave.belly + 250)) {
								r.push(`${slave.slaveName}'s massive breasts push out ${his} overalls so far that ${his} big implant-filled belly is left almost entirely uncovered.`);
							} else {
								r.push(`${slave.slaveName}'s big implant-filled belly stretches out the fabric of ${his} overalls.`);
							}
						} else {
							if (slave.boobs > (slave.belly + 250)) {
								r.push(`${slave.slaveName}'s massive breasts push out ${his} overalls so far that ${his} big pregnant belly is left almost entirely uncovered.`);
							} else {
								r.push(`${slave.slaveName}'s big pregnant belly stretches out the fabric of ${his} overalls.`);
							}
						}
					} else if (slave.weight > 160) {
						if (slave.boobs > (slave.belly + 250)) {
							r.push(`${slave.slaveName}'s giant breasts push out ${his} overalls so far that ${his} hugely fat belly is left uncovered.`);
						} else {
							r.push(`${slave.slaveName}'s hugely fat belly bulges over the sides of ${his} overalls.`);
						}
					} else if (slave.weight > 130) {
						if (slave.boobs > (slave.belly + 250)) {
							r.push(`${slave.slaveName}'s giant breasts push out ${his} overalls so far that ${his} big fat belly is left uncovered.`);
						} else {
							r.push(`${slave.slaveName}'s big fat belly spills out from behind ${his} overalls.`);
						}
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							if (slave.boobs > (slave.belly + 250)) {
								r.push(`${slave.slaveName}'s huge breasts push out ${his} overalls so far that ${his} pregnant belly is left uncovered.`);
							} else {
								r.push(`${slave.slaveName}'s overalls are significantly curved by ${his} pregnant belly.`);
							}
						} else if (isBellyFluidLargest) {
							if (slave.boobs > (slave.belly + 250)) {
								r.push(`${slave.slaveName}'s huge breasts push out ${his} overalls so far that ${his} jiggling ${slave.inflationType}-filled belly is left uncovered.`);
							} else {
								r.push(`${slave.slaveName}'s overalls are significantly curved by ${his} jiggling ${slave.inflationType}-filled belly.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > (slave.belly + 250)) {
								r.push(`${slave.slaveName}'s huge breasts push out ${his} overalls so far that ${his} implant-filled belly is left uncovered.`);
							} else {
								r.push(`${slave.slaveName}'s overalls are significantly curved by ${his} implant-filled belly.`);
							}
						} else {
							if (slave.boobs > (slave.belly + 250)) {
								r.push(`${slave.slaveName}'s huge breasts push out ${his} overalls so far that ${his} pregnant belly is left uncovered.`);
							} else {
								r.push(`${slave.slaveName}'s overalls are significantly curved by ${his} pregnant belly.`);
							}
						}
					} else if (slave.weight > 95) {
						if (slave.boobs > (slave.belly + 250)) {
							r.push(`${slave.slaveName}'s large breasts push out ${his} overalls so far that ${his} fat belly is left uncovered.`);
						} else {
							r.push(`${slave.slaveName}'s fat belly bulges out from over the sides of ${his} overalls.`);
						}
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							if (slave.boobs > (slave.belly + 250)) {
								r.push(`${slave.slaveName}'s large breasts push out ${his} overalls so far that ${his} small pregnant belly is left uncovered.`);
							} else {
								r.push(`${slave.slaveName}'s small pregnant belly rounds out the front of ${his} overalls.`);
							}
						} else if (isBellyFluidLargest) {
							if (slave.boobs > (slave.belly + 250)) {
								r.push(`${slave.slaveName}'s large breasts push out ${his} overalls so far that ${his} ${slave.inflationType}-swollen belly is left uncovered.`);
							} else {
								r.push(`${slave.slaveName}'s ${slave.inflationType}-swollen belly rounds out the front of ${his} overalls.`);
							}
						} else if (slave.bellyImplant > 0) {
							if (slave.boobs > (slave.belly + 250)) {
								r.push(`${slave.slaveName}'s large breasts push out ${his} overalls so far that ${his} implant-rounded belly is left uncovered.`);
							} else {
								r.push(`${slave.slaveName}'s implant-rounded belly rounds out the front of ${his} overalls.`);
							}
						} else {
							if (slave.boobs > (slave.belly + 250)) {
								r.push(`${slave.slaveName}'s large breasts push out ${his} overalls so far that ${his} growing belly is left uncovered.`);
							} else {
								r.push(`${slave.slaveName}'s growing belly rounds out the front of ${his} overalls.`);
							}
						}
					} else if (slave.weight > 30) {
						if (slave.boobs > (slave.belly + 250)) {
							r.push(`${slave.slaveName}'s big breasts push out ${his} overalls so far that ${his} chubby belly is left uncovered.`);
						} else {
							r.push(`The sides of ${slave.slaveName}'s chubby belly peek out from behind ${his} overalls.`);
						}
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						if (slave.boobs > (slave.belly + 250)) {
							r.push(`${slave.slaveName}'s big breasts push out ${his} overalls so far that ${his} rounded belly is left uncovered.`);
						} else {
							r.push(`There is a slight curve to ${slave.slaveName}'s overalls from ${his} belly.`);
						}
					} else if (slave.muscles > 30) {
						if (slave.boobs > (slave.belly + 250)) {
							r.push(`${slave.slaveName}'s big breasts push out ${his} overalls so far that ${his} ripped abs are left uncovered.`);
						} else {
							r.push(`The sides of ${slave.slaveName}'s ripped abs peek out from behind ${his} overalls.`);
						}
					}
					break;
				case "a string bikini":
					if (slave.belly >= 1000000) {
					// WIP//
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s ${slave.inflationType}-filled belly is so monolithic that most of ${his} string bikini is completely eclipsed by its immense bulk.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s implant-filled belly is so monolithic that most of ${his} string bikini is completely eclipsed by its immense bulk.`);
						} else {
							r.push(`${slave.slaveName}'s pregnant belly is so monolithic that most of ${his} string bikini is completely eclipsed by the straining mass.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s ${slave.inflationType}-filled belly is so titanic that most of ${his} string bikini is completely eclipsed by its immense bulk.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s implant-filled belly is so titanic that most of ${his} string bikini is completely eclipsed by its immense bulk.`);
						} else {
							r.push(`${slave.slaveName}'s pregnant belly is so titanic that most of ${his} string bikini is completely eclipsed by the life-stuffed mass.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s ${slave.inflationType}-filled belly is so gigantic that most of ${his} string bikini is completely eclipsed by its bulk.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s implant-filled belly is so gigantic that most of ${his} string bikini is completely eclipsed by its bulk.`);
						} else {
							r.push(`${slave.slaveName}'s pregnant belly is so gigantic that most of ${his} string bikini is completely eclipsed by the life-filled mass.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s ${slave.inflationType}-filled belly is so massive that most of ${his} string bikini is completely eclipsed by its bulk.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s implant-filled belly is so massive that most of ${his} string bikini is completely eclipsed by its bulk.`);
						} else {
							r.push(`${slave.slaveName}'s pregnant belly is so massive that most of ${his} string bikini is completely eclipsed by the life-swollen mass.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s giant ${slave.inflationType}-filled belly forces ${his} string bikini to either side and hangs low enough to hide ${his} crotch.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s giant implant-filled belly forces ${his} string bikini to either side and hangs low enough to hide ${his} crotch.`);
						} else {
							r.push(`${slave.slaveName}'s giant pregnant belly forces ${his} string bikini to either side and hangs low enough to hide ${his} crotch.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s massively fat belly hides most ${his} string bikini. What can be seen of it risks being swallowed up by ${his} folds.`);
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s huge pregnant belly parts ${his} string bikini to either side.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s huge ${slave.inflationType}-filled belly parts ${his} string bikini to either side.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s huge implant-filled belly parts ${his} string bikini to either side.`);
						} else {
							r.push(`${slave.slaveName}'s huge pregnant belly parts ${his} string bikini to either side.`);
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s big pregnant belly parts ${his} string bikini to either side.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s hugely swollen belly parts ${his} string bikini to either side.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s big implant-filled belly parts ${his} string bikini to either side.`);
						} else {
							r.push(`${slave.slaveName}'s big pregnant belly parts ${his} string bikini to either side.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s hugely fat belly parts ${his} string bikini to either side and threatens to hide ${his} bikini bottom.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s big fat belly parts ${his} string bikini to either side.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s pregnant belly parts ${his} string bikini to either side.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s jiggling ${slave.inflationType}-filled belly parts ${his} string bikini to either side.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s implant-filled belly parts ${his} string bikini to either side.`);
						} else {
							r.push(`${slave.slaveName}'s pregnant belly parts ${his} string bikini to either side.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s fat belly parts ${his} string bikini to either side.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s small pregnant belly juts out between the strings of ${his} bikini.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s ${slave.inflationType}-swollen belly juts out between the strings of ${his} bikini.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s implant-rounded belly juts out between the strings of ${his} bikini.`);
						} else {
							r.push(`${slave.slaveName}'s growing belly juts out between the strings of ${his} bikini.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s chubby belly bulges between the strings of ${his} bikini.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s string bikini parts just barely around the slight swell of ${his} lower belly.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s string bikini clings to ${his} ripped abs.`);
					}
					break;
				case "a scalemail bikini":
					if (slave.belly >= 1000000) {
					// WIP//
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s monolithic ${slave.inflationType}-filled belly completely hides ${his} scalemail bikini and takes full advantage of its lack of restriction to bulge tremendously.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s monolithic implant-filled belly completely hides ${his} scalemail bikini and takes full advantage of its lack of restriction to bulge tremendously.`);
						} else {
							r.push(`${slave.slaveName}'s monolithic pregnant belly completely hides ${his} scalemail bikini. ${His} exposed middle gives ${his} children the room they so desperately need to keep growing. They frequently squirm from the chafing, only to cause ${him} rub against the scales more.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s titanic ${slave.inflationType}-filled belly completely hides ${his} scalemail bikini and takes full advantage of its lack of restriction to bulge massively.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s titanic implant-filled belly completely hides ${his} scalemail bikini and takes full advantage of its lack of restriction to bulge massively.`);
						} else {
							r.push(`${slave.slaveName}'s titanic pregnant belly completely hides ${his} scalemail bikini. ${His} children greatly appreciate the space granted by ${his} exposed middle and squirm happily in their cramped confines, save for when they squirm angrily over the chafing.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s gigantic ${slave.inflationType}-filled belly completely hides ${his} scalemail bikini and takes full advantage of its freedom to hang heavily.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s gigantic implant-filled belly completely hides ${his} scalemail bikini and takes full advantage of its freedom to hang heavily.`);
						} else {
							r.push(`${slave.slaveName}'s gigantic pregnant belly completely hides ${his} scalemail bikini. ${His} children appreciate the space granted by ${his} exposed middle, but could do without the occasional chafing.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s massive ${slave.inflationType}-filled belly completely hides ${his} scalemail bikini and takes full advantage of its freedom to hang heavily.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s massive implant-filled belly completely hides ${his} scalemail bikini and takes full advantage of its freedom to hang heavily.`);
						} else {
							r.push(`${slave.slaveName}'s massive pregnant belly completely hides ${his} scalemail bikini and takes full advantage of its freedom to bulge hugely.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s giant ${slave.inflationType}-filled belly completely hides ${his} scalemail bikini and bulges heavily from ${his} body.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s giant implant-filled belly completely hides ${his} scalemail bikini and bulges heavily from ${his} body.`);
						} else {
							r.push(`${slave.slaveName}'s giant pregnant belly completely hides ${his} lacy scalemail bikini and bulges heavily from ${his} body.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s massively fat belly hides ${his} scalemail bikini, but the constant chafing reminds ${him} it's there.`);
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s huge pregnant belly forces ${his} scalemail bikini to be fastened beneath it.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s huge ${slave.inflationType}-filled forces ${his} scalemail bikini to be fastened beneath it.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s huge implant-filled forces ${his} scalemail bikini to be fastened beneath it.`);
						} else {
							r.push(`${slave.slaveName}'s huge pregnant belly forces ${his} scalemail bikini to be fastened beneath it.`);
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s big pregnant belly greatly pushes out ${his} scalemail bikini.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s hugely swollen belly forces ${his} scalemail bikini down and rests heavily above it.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s big implant-filled belly greatly pushes out ${his} scalemail bikini.`);
						} else {
							r.push(`${slave.slaveName}'s big pregnant belly greatly pushes out ${his} scalemail bikini.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s hugely fat belly hides ${his} scalemail bikini, but the constant chafing reminds ${him} it's there.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s big fat belly hides ${his} scalemail bikini, but the constant chafing reminds ${him} it's there.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s pregnant belly pushes out ${his} scalemail bikini.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s jiggling ${slave.inflationType}-filled belly forces ${his} scalemail bikini down and juts out above it.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s implant-filled belly pushes out ${his} scalemail bikini.`);
						} else {
							r.push(`${slave.slaveName}'s pregnant belly pushes out ${his} scalemail bikini.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s fat belly hides ${his} scalemail bikini, but the constant chafing reminds ${him} it's there.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s small pregnant belly bulges underneath ${his} bikini.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s ${slave.inflationType}-swollen belly bulges underneath ${his} tight bikini.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s implant-rounded belly bulges underneath ${his} bikini.`);
						} else {
							r.push(`${slave.slaveName}'s growing belly bulges underneath ${his} bikini.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s chubby belly rests above ${his} bikini, concealing the top of it and scraping against the scalemail.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s scalemail bikini scrapes uncomfortably against ${his} lower belly and draws attention to the slight swell to it.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s ripped abs are prominently displayed for all to see and perfectly suit ${his} scalemail bikini.`);
					}
					break;
				case "striped panties":
					if (slave.belly >= 1000000) {
					// WIP//
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s monolithic ${slave.inflationType}-filled belly completely hides ${his} cute panties and takes full advantage of its lack of restriction to bulge tremendously.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s monolithic implant-filled belly completely hides ${his} cute panties and takes full advantage of its lack of restriction to bulge tremendously.`);
						} else {
							r.push(`${slave.slaveName}'s monolithic pregnant belly completely hides ${his} cute panties. ${His} exposed middle gives ${his} children the room they so desperately need to keep growing. They frequently squirm from the chafing, only to cause ${him} rub against the fabric more.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s titanic ${slave.inflationType}-filled belly completely hides ${his} cute panties and takes full advantage of its lack of restriction to bulge massively.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s titanic implant-filled belly completely hides ${his} cute panties and takes full advantage of its lack of restriction to bulge massively.`);
						} else {
							r.push(`${slave.slaveName}'s titanic pregnant belly completely hides ${his} cute panties. ${His} children greatly appreciate the space granted by ${his} exposed middle and squirm happily in their cramped confines, save for when they squirm angrily against the fabric.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s gigantic ${slave.inflationType}-filled belly completely hides ${his} cute panties and takes full advantage of its freedom to hang heavily.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s gigantic implant-filled belly completely hides ${his} cute panties and takes full advantage of its freedom to hang heavily.`);
						} else {
							r.push(`${slave.slaveName}'s gigantic pregnant belly completely hides ${his} cute panties. ${His} children appreciate the space granted by ${his} exposed middle, but could do without the occasional chafing.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s massive ${slave.inflationType}-filled belly completely hides ${his} cute panties and takes full advantage of its freedom to hang heavily.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s massive implant-filled belly completely hides ${his} cute panties and takes full advantage of its freedom to hang heavily.`);
						} else {
							r.push(`${slave.slaveName}'s massive pregnant belly completely hides ${his} cute panties and takes full advantage of its freedom to bulge hugely.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s giant ${slave.inflationType}-filled belly completely hides ${his} cute panties and bulges heavily from ${his} body.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s giant implant-filled belly completely hides ${his} cute panties and bulges heavily from ${his} body.`);
						} else {
							r.push(`${slave.slaveName}'s giant pregnant belly completely hides ${his} cute panties and bulges heavily from ${his} body.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s massively fat belly hides ${his} cute panties, but the constant chafing reminds ${him} it's there.`);
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s huge pregnant belly forces ${his} cute panties to stretch beneath it.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s huge ${slave.inflationType}-filled belly forces ${his} cute panties to stretch beneath it.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s huge implant-filled belly forces ${his} cute panties to stretch beneath it.`);
						} else {
							r.push(`${slave.slaveName}'s huge pregnant belly forces ${his} cute panties to stretch beneath it.`);
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s big pregnant belly greatly pushes out ${his} cute panties.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s hugely swollen belly forces ${his} cute panties down and rests heavily above it.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s big implant-filled belly greatly pushes out ${his} cute panties.`);
						} else {
							r.push(`${slave.slaveName}'s big pregnant belly greatly pushes out ${his} cute panties.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s hugely fat belly hides ${his} cute panties, but the constant chafing of the fabric reminds ${him} it's there.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s big fat belly hides ${his} cute panties, but the constant chafing of the fabric reminds ${him} it's there.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s pregnant belly pushes out ${his} cute panties.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s jiggling ${slave.inflationType}-filled belly forces ${his} cute panties down and juts out above it.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s implant-filled belly pushes out ${his} cute panties.`);
						} else {
							r.push(`${slave.slaveName}'s pregnant belly pushes out ${his} cute panties.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s fat belly hides ${his} cute panties, but the constant chafing of the fabric reminds ${him} it's there.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s small pregnant belly bulges underneath ${his} panties.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s ${slave.inflationType}-swollen belly bulges underneath ${his} panties.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s implant-rounded belly bulges underneath ${his} panties.`);
						} else {
							r.push(`${slave.slaveName}'s growing belly bulges underneath ${his} panties.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s chubby belly rests above ${his} panties, concealing the top of it and scraping against the fabric.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s cute panties rub uncomfortably against ${his} lower belly and draws attention to the slight swell to it.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s ripped abs are prominently displayed for all to see and perfectly suit ${his} cute panties.`);
					}
					break;
				case "clubslut netting":
					if (slave.belly >= 1000000) {
					// WIP//
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s monolithic ${slave.inflationType}-filled belly is so vast that it requires a special clubslut netting with an expanse of extra mesh designed to accommodate a ${girl} of ${his} girth. The excessive garment tightly hugs the curve of ${his} middle.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s monolithic implant-filled belly is so vast that it requires a special clubslut netting with an expanse of extra mesh designed to accommodate a ${girl} of ${his} girth. The excessive garment tightly hugs the curve of ${his} middle.`);
						} else {
							r.push(`${slave.slaveName}'s monolithic pregnant belly has grown so vast that it requires a special clubslut netting with an expanse of extra mesh designed to accommodate a ${girl} of ${his} girth. The excessive garment tightly hugs the curve of ${his} middle and every bump and gully that ${his} unborn children cause along its surface.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s titanic ${slave.inflationType}-filled belly is so large that it requires a special clubslut netting with an expanse of extra mesh attached to its front. The extended garment is stretched to its limit trying to contain ${his} bulging middle.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s titanic implant-filled belly is so large that it requires a special clubslut netting with an expanse of extra mesh attached to its front. The extended garment is stretched to its limit trying to contain ${his} bulging middle.`);
						} else {
							r.push(`${slave.slaveName}'s titanic pregnant belly has grown so large that it requires a special clubslut netting with an expanse of extra mesh attached to its front. The extended garment is stretched to its limit by ${his} excessive gravidity and the bulges of ${his} unborn slipping through the mesh.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s gigantic ${slave.inflationType}-filled belly is so large that it requires a special clubslut netting with an expanse of extra mesh attached to its front. The extended garment is completely filled out by ${his} bulging middle.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s gigantic implant-filled belly is so large that it requires a special clubslut netting with an expanse of extra mesh attached to its front. The extended garment is completely filled out by ${his} bulging middle.`);
						} else {
							r.push(`${slave.slaveName}'s gigantic pregnant belly has grown so large that it requires a special clubslut netting with an expanse of extra mesh attached to its front. The extended garment is completely filled out by ${his} excessive gravidity.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s massive ${slave.inflationType}-filled belly is so large that it requires a special clubslut netting with an expanse of extra mesh attached to its front. The extended garment stretches around ${his} bulging middle.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s massive implant-filled belly is so large that it requires a special clubslut netting with an expanse of extra mesh attached to its front. The extended garment stretches around ${his} bulging middle.`);
						} else {
							r.push(`${slave.slaveName}'s massive pregnant belly has grown so large that it requires a special clubslut netting with an expanse of extra mesh attached to its front. The extended garment stretches around ${his} excessive gravidity.`);
						}
					} else if (slave.belly >= 150000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s giant ${slave.inflationType}-filled belly is so large that it requires ${his} clubslut netting to have an expanse of extra mesh added to its front. The newly extended garment clings to the rounded curve of ${his} middle.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s giant implant-filled belly is so large that it requires ${his} clubslut netting to have an expanse of extra mesh added to its front. The newly extended garment clings to the rounded curve of ${his} middle.`);
						} else {
							r.push(`${slave.slaveName}'s giant pregnant belly has grown so large that it requires ${his} clubslut netting to have an expanse of extra mesh added to its front. The newly extended garment clings to ${his} excessive gravidity.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s clubslut netting is stretched to the breaking point by ${his} giant ${slave.inflationType}-filled belly. It is so tight around ${his} middle that flesh bulges through the mesh.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s clubslut netting is stretched to the breaking point by ${his} giant implant-filled belly. It is so tight around ${his} middle that flesh bulges through the mesh.`);
						} else {
							r.push(`${slave.slaveName}'s clubslut netting is stretched to the breaking point by ${his} giant pregnant belly. It is so tight around ${his} middle that flesh bulges through the mesh.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s clubslut netting is stretched to the breaking point by ${his} massively fat belly's desire for more room. Flab juts massively through the mesh and entire folds are hugged tightly by the straining material.`);
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s clubslut netting is greatly stretched out by ${his} huge pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s clubslut netting is greatly stretched out by ${his} huge ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s clubslut netting is greatly stretched out by ${his} huge implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s clubslut netting is greatly stretched out by ${his} huge pregnant belly.`);
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s clubslut netting clings tightly to the curve of ${his} big pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s clubslut netting clings tightly to the curve of ${his} big ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s clubslut netting clings tightly to the curve of ${his} big implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s clubslut netting clings tightly to the curve of ${his} big pregnant belly.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s clubslut netting is greatly stretched out by ${his} hugely fat belly, forcing flab to poke through the mesh in a desperate search for more room.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s clubslut netting is stretched out by ${his} big fat belly, forcing flab to poke through the mesh.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s clubslut netting is stretched by ${his} pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s clubslut netting is stretched by ${his} jiggling ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s clubslut netting is stretched by ${his} implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s clubslut netting is stretched by ${his} pregnant belly.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s clubslut netting is stretched by ${his} fat belly causing flab to poke through the mesh.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s clubslut netting clings to ${his} small pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s clubslut netting clings to ${his} ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s clubslut netting clings to ${his} implant-rounded belly.`);
						} else {
							r.push(`${slave.slaveName}'s clubslut netting clings to ${his} growing belly.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s clubslut netting clings to ${his} chubby belly, gently forcing pudge through the mesh.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s clubslut netting clings to ${his} figure leaving the slight swell to ${his} lower belly quite noticeable.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s ripped abs peek through the gaps in ${his} clubslut netting.`);
					}
					break;
				case "a cheerleader outfit":
					if (slave.belly >= 1000000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s cheerleader top leaves ${his} unfathomable, hyper-swollen, ${slave.inflationType}-filled belly bare. ${He}'s so expansive that ${he} alone is needed for the base of the pyramid.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s cheerleader top leaves ${his} unfathomable, hyper-swollen, implant-filled belly bare. ${He}'s so expansive that ${he} alone is needed for the base of the pyramid.`);
						} else {
							r.push(`${slave.slaveName}'s cheerleader top leaves ${his} unfathomable, hyper-swollen pregnant belly bare, clearly displaying that this cheerleader is not only ready to burst with school spirit, but preparing to bring a class of ${his} own into the world.`);
						}
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s cheerleader top leaves ${his} monolithic ${slave.inflationType}-filled belly bare. ${He}'s so large, it's expected that ${he}'d make a fantastic base for the pyramid all on ${his} own.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s cheerleader top leaves ${his} monolithic implant-filled belly bare. ${He}'s so large, it's expected that ${he}'d make a fantastic base for the pyramid all on ${his} own.`);
						} else {
							r.push(`${slave.slaveName}'s cheerleader top leaves ${his} monolithic pregnant belly bare, clearly displaying that this cheerleader is ready to burst with school spirit.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s cheerleader top leaves ${his} titanic ${slave.inflationType}-filled belly bare leaving spectators in awe at just what ${his} cheers must look like.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s cheerleader top leaves ${his} titanic implant-filled belly bare leaving spectators in awe at just what ${his} cheers must look like.`);
						} else {
							r.push(`${slave.slaveName}'s cheerleader top leaves ${his} titanic pregnant belly bare, clearly displaying that this cheerleader is thoroughly filled with school spirit.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s cheerleader top leaves ${his} gigantic ${slave.inflationType}-filled belly bare leaving spectators in awe at just what ${his} cheers must look like.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s cheerleader top leaves ${his} gigantic implant-filled belly bare leaving spectators in awe at just what ${his} cheers must look like.`);
						} else {
							r.push(`${slave.slaveName}'s cheerleader top leaves ${his} gigantic pregnant belly bare, clearly displaying that this cheerleader has been cheering on the entirety of both teams.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s cheerleader top leaves ${his} massive ${slave.inflationType}-filled belly bare leaving spectators to wonder just how such a gravid ${girl} has managed to stay on the squad.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s cheerleader top leaves ${his} massive implant-filled belly bare leaving spectators to wonder just how such a gravid ${girl} has managed to stay on the squad.`);
						} else {
							r.push(`${slave.slaveName}'s cheerleader top leaves ${his} massive pregnant belly bare, clearly displaying that this cheerleader has been bred by the entire team.`);
						}
					} else if (slave.belly >= 150000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s cheerleader top can't be pulled over ${his} giant ${slave.inflationType}-filled belly, leaving spectators to wonder just how such a gravid ${girl} is supposed to perform.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s cheerleader top can't be pulled over ${his} giant implant-filled belly, leaving spectators to wonder just how such a gravid ${girl} is supposed to perform.`);
						} else {
							r.push(`${slave.slaveName}'s cheerleader top can't be pulled over ${his} giant pregnant belly, leaving a rumor to spread that ${he}'s making a team of ${his} own.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s cheerleader top can't be pulled over ${his} giant ${slave.inflationType}-filled belly, leaving spectators to pity the girls lower on the pyramid.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s cheerleader top can't be pulled over ${his} giant implant-filled belly, leaving spectators to pity the girls lower on the pyramid.`);
						} else {
							r.push(`${slave.slaveName}'s cheerleader top can't be pulled over ${his} giant pregnant belly, leaving spectators to pity the girls that have to lift ${his} gravid bulk.`);
						}
					} else if (slave.belly >= 60000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s cheerleader top can't be pulled over ${his} huge ${slave.inflationType}-filled belly, leaving spectators to question how ${he} can even perform.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s cheerleader top can't be pulled over ${his} huge implant-filled belly, leaving spectators to question how ${he} can even perform.`);
						} else {
							r.push(`${slave.slaveName}'s cheerleader top can't be pulled over ${his} huge pregnant belly, leaving it obvious how ${he} is still on the cheer squad.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s cheerleader top rests atop ${his} massively fat belly, completely incapable of handling the jiggly, soft mass and clearly displaying that this cheerleader has ${himself} go.`);
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s cheerleader top rides up ${his} huge pregnant belly, barely covering the top of it while leaving it obvious how such a slut is still on the squad.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s cheerleader top rides up ${his} huge ${slave.inflationType}-filled belly, barely covering the top of it while leaving spectators to assume ${he}'s a slut.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s cheerleader top rides up ${his} huge implant-filled belly, barely covering the top of it while leaving spectators to assume ${he}'s a slut.`);
						} else {
							r.push(`${slave.slaveName}'s cheerleader top rides up ${his} huge pregnant belly, barely covering the top of it while leaving it obvious how such a slut is still on the squad.`);
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s cheerleader top rides up ${his} big pregnant belly, covering only the top of it while leaving the rest on display to show how slutty this cheerleader is.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s cheerleader top rides up ${his} hugely swollen belly, covering only the top of it while leaving the rest on display to bring wonder to how many loads ${he} took last night.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s cheerleader top rides up ${his} big implant-filled belly, covering only the top of it while leaving the rest on display to make this cheerleader look like a giant slut.`);
						} else {
							r.push(`${slave.slaveName}'s cheerleader top rides up ${his} big pregnant belly, covering only the top of it while leaving the rest on display to show how slutty this cheerleader is.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s cheerleader top covers barely covers any of ${his} hugely fat belly. The rest is free to hang and jiggle with every motion, obscuring ${his} skirt and letting everyone know how badly this cheerleader needs to diet.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s cheerleader top covers the top half of ${his} big fat belly. However, the bottom half is free to hang and jiggle with every motion, obscuring ${his} skirt and letting everyone know how badly this cheerleader needs to diet.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s cheerleader top covers most of ${his} pregnant belly, the bottom of which peeks out showing how slutty this cheerleader is.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s cheerleader top covers most of ${his} jiggling ${slave.inflationType}-filled belly, the bottom of which peeks to make this cheerleader look like a slut.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s cheerleader top covers most of ${his} implant-filled belly, the bottom of which peeks out to make this cheerleader look like a slut.`);
						} else {
							r.push(`${slave.slaveName}'s cheerleader top covers most of ${his} pregnant belly, the bottom of which peeks out showing how slutty this cheerleader is.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s cheerleader top covers most of ${his} fat belly. However, the bottom of it peeks out, obscuring ${his} skirt and a letting everyone know how badly this cheerleader needs to diet.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s cheerleader top gently bulges from ${his} small pregnant belly displaying how slutty this cheerleader is.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s cheerleader top gently bulges from ${his} ${slave.inflationType}-swollen belly making ${him} look slutty.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s cheerleader top gently bulges from ${his} implant-rounded belly making ${him} look slutty.`);
						} else {
							r.push(`${slave.slaveName}'s cheerleader top gently bulges from ${his} growing belly displaying how slutty this cheerleader is.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s cheerleader top frequently rides up ${his} chubby belly, letting it hang loose and hide the waist of ${his} skirt.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s cheerleader top is tight enough to draw attention to the slight swell of ${his} lower belly.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s ripped abs can be seen through ${his} cheerleader top.`);
					}
					break;
				case "cutoffs and a t-shirt":
					if (slave.belly >= 1000000) {
					// WIP//
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s exposed midriff fully exposes ${his} monolithic, ${slave.inflationType}-filled belly. The button for ${his} cutoffs have exploded, though the size of ${his} belly makes it impossible to tell.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s exposed midriff fully exposes ${his} monolithic, implant-filled belly. The button for ${his} cutoffs have exploded, though the size of ${his} belly makes it impossible to tell.`);
						} else {
							r.push(`${slave.slaveName}'s exposed midriff fully exposes ${his} monolithic pregnant belly. The button for ${his} cutoffs have exploded, though the size of ${his} belly makes it impossible to tell.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s titanic implant-filled belly takes advantage ${his} exposed midriff and unfastened jeans to massively jut out from ${his} body.`);
						} else {
							r.push(`${slave.slaveName}'s titanic pregnant belly takes advantage ${his} exposed midriff and unfastened jeans to massively jut out from ${his} body.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s gigantic implant-filled belly takes advantage ${his} exposed midriff and unfastened jeans to massively jut out from ${his} body.`);
						} else {
							r.push(`${slave.slaveName}'s gigantic pregnant belly takes advantage ${his} exposed midriff and unfastened jeans to massively jut out from ${his} body.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s massive implant-filled belly takes advantage ${his} exposed midriff and unfastened jeans to hang heavily from ${his} body.`);
						} else {
							r.push(`${slave.slaveName}'s massive pregnant belly takes advantage ${his} exposed midriff and unfastened jeans to hang heavily from ${his} body.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s giant implant-filled belly dominates ${his} exposed midriff and thwarts any efforts to zip up ${his} fly.`);
						} else {
							r.push(`${slave.slaveName}'s giant pregnant belly dominates ${his} exposed midriff and thwarts any efforts to zip up ${his} fly.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s massively fat belly is left to jiggle freely and spill from ${his} unfastened jeans.`);
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s exposed midriff and unfastened jeans fully display ${his} huge pregnancy.`);
						} else if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s exposed midriff and unfastened jeans prominently display ${his} huge implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s exposed midriff and unfastened jeans fully display ${his} ripe pregnancy.`);
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s exposed midriff and unfastened jeans fully display ${his} big pregnancy.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s exposed midriff and unfastened jeans fully display ${his} hugely swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s exposed midriff and unfastened jeans fully display ${his} big implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s exposed midriff and unfastened jeans fully display ${his} advanced pregnancy.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s hugely fat belly is left to jiggle freely and hang over ${his} unfastened jeans.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s big fat belly is left to jiggle freely and spill from ${his} unfastened jeans.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s exposed midriff and unfastened jeans fully display ${his} pregnancy.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s exposed midriff and unfastened jeans fully display ${his} jiggling ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s exposed midriff and unfastened jeans fully display ${his} implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s exposed midriff and unfastened jeans fully display ${his} pregnancy.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s fat belly is left to hang free and cover ${his} jeans.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s jeans are left unfastened to give ${his} small pregnant belly room.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s jeans are left unfastened to give ${his} ${slave.inflationType}-swollen belly room.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s jeans are left unfastened to give ${his} implant-rounded belly room.`);
						} else {
							r.push(`${slave.slaveName}'s jeans are left unfastened to give ${his} growing belly room.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s chubby belly is left free to hang over the waist of ${his} jeans.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s jeans are left unfastened and display a slight swell to ${his} lower belly.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s exposed midriff fully exposes ${his} ripped abs.`);
					}
					break;
				case "a slutty outfit":
					if (slave.belly >= 1000000) {
					// WIP//
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s monolithic implant-filled belly adds tremendously to ${his} slutty appearance.`);
						} else {
							r.push(`${slave.slaveName}'s monolithic pregnant belly makes it abundantly clear that ${he} is a boundless slut.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s titanic implant-filled belly really adds to ${his} slutty appearance.`);
						} else {
							r.push(`${slave.slaveName}'s titanic pregnant belly makes it abundantly clear that ${he} is a massive slut.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s gigantic implant-filled belly really adds to ${his} slutty appearance.`);
						} else {
							r.push(`${slave.slaveName}'s gigantic pregnant belly makes it abundantly clear that this slut puts out.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s massive implant-filled belly really adds to ${his} slutty appearance.`);
						} else {
							r.push(`${slave.slaveName}'s massive pregnant belly makes it abundantly clear that this slut puts out.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s giant implant-filled belly adds to ${his} slutty appearance.`);
						} else {
							r.push(`${slave.slaveName}'s giant pregnant belly makes it clear that this slut puts out.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName} lets ${his} massively fat belly hang free to jiggle with every subtle motion, leaving ${him} looking like a massive slut.`);
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s huge pregnant belly adds to ${his} slutty appearance.`);
						} else if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s huge implant-filled belly adds to ${his} slutty appearance.`);
						} else {
							r.push(`${slave.slaveName}'s huge pregnancy adds to ${his} slutty appearance.`);
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s big pregnant belly adds to ${his} slutty appearance.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s hugely swollen belly adds to ${his} slutty appearance.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s big implant-filled belly adds to ${his} slutty appearance.`);
						} else {
							r.push(`${slave.slaveName}'s big pregnant belly adds to ${his} slutty appearance.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName} lets ${his} hugely fat belly hang free to jiggle as ${he} moves, leaving ${him} looking like a massive slut.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName} lets ${his} big fat belly hang free to jiggle as ${he} moves, leaving ${him} looking particularly slutty.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s pregnancy adds to ${his} slutty appearance.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s jiggling ${slave.inflationType}-filled belly adds to ${his} slutty appearance.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s implant-filled belly adds to ${his} slutty appearance.`);
						} else {
							r.push(`${slave.slaveName}'s pregnancy adds to ${his} slutty appearance.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName} lets ${his} fat belly hang free, leaving ${him} looking particularly slutty.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s small pregnant belly adds to ${his} slutty appearance.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s ${slave.inflationType}-swollen belly adds to ${his} slutty appearance.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s implant-rounded belly adds to ${his} slutty appearance.`);
						} else {
							r.push(`${slave.slaveName}'s growing pregnancy adds to ${his} slutty appearance.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s chubby belly is allowed to openly jiggle, making ${him} look particularly slutty.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s slutty outfit highlights the slight swell of ${his} lower belly.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s slutty outfit shows off ${his} slutty abs.`);
					}
					break;
				case "a bimbo outfit":
					if (slave.belly >= 1000000) {
					// WIP//
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s monolithic implant-filled belly eclipses ${his} miniskirt and leaves little to hold up ${his} thong.`);
						} else {
							r.push(`${slave.slaveName}'s monolithic pregnant belly eclipses ${his} miniskirt and thong and leaves it abundantly clear that this bimbo will happily fuck until ${he} explodes.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s titanic implant-filled belly eclipses ${his} miniskirt and leaves little to hold up ${his} thong.`);
						} else {
							r.push(`${slave.slaveName}'s titanic pregnant belly eclipses ${his} miniskirt and thong and leaves it abundantly clear that this bimbo considers sex far above anything else.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s gigantic implant-filled belly eclipses ${his} miniskirt and leaves little to hold up ${his} thong.`);
						} else {
							r.push(`${slave.slaveName}'s gigantic pregnant belly eclipses ${his} miniskirt and thong and leaves it abundantly clear that this bimbo doesn't understand limits.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s massive implant-filled belly eclipses ${his} miniskirt and leaves little to hold up ${his} thong.`);
						} else {
							r.push(`${slave.slaveName}'s massive pregnant belly eclipses ${his} miniskirt and thong from the front and leaves it abundantly clear that this bimbo doesn't understand contraception.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s giant implant-filled belly forces ${his} thong strings to tightly hug its curvature as it hangs low enough to obscure ${his} miniskirt completely.`);
						} else {
							r.push(`${slave.slaveName}'s giant pregnant belly forces ${his} thong strings to tightly hug its curvature as it hangs low enough to obscure ${his} miniskirt completely.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s thong strings and miniskirt are buried under ${his} massively fat belly.`);
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s miniskirt is trapped beneath ${his} huge pregnant belly.`);
						} else if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s miniskirt is trapped beneath ${his} huge implant-filled belly and ${his} thong strings forced to caress its curves.`);
						} else {
							r.push(`${slave.slaveName}'s miniskirt is trapped beneath ${his} huge pregnant belly and ${his} thong strings forced to caress its curves.`);
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s miniskirt rests at the base of ${his} big pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s hugely swollen belly forces ${his} miniskirt out of the way as it hangs ponderously from ${his} midriff.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s miniskirt rests at the base of ${his} big implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s miniskirt rests at the base of ${his} big pregnant belly.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s thong strings are buried in ${his} hugely fat belly as it hangs lewdly over ${his} miniskirt.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s thong strings dig deep into ${his} big fat belly as it lewdly spills over ${his} miniskirt.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s miniskirt rests at the base of ${his} pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s miniskirt digs into ${his} jiggling ${slave.inflationType}-filled belly as the top half spills over its edge.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s miniskirt rests at the base of ${his} implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s miniskirt rests at the base of ${his} pregnant belly.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s thong strings dig into ${his} fat belly as it lewdly drapes over ${his} miniskirt.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s miniskirt keeps sliding down ${his} small pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s miniskirt pushes into ${his} ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s miniskirt keeps sliding down ${his} implant-rounded belly.`);
						} else {
							r.push(`${slave.slaveName}'s miniskirt keeps sliding down ${his} growing belly.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s chubby belly bulges between the strings of ${his} thong and sticks out over ${his} miniskirt.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s miniskirt is obviously bulged out by the slight swell of ${his} lower belly.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s thong strings perfectly frame ${his} abs.`);
					}
					break;
				case "a courtesan dress":
					if (slave.belly >= 1000000) {
					// WIP//
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s corset attempts to cradle, rather than bind, ${his} monolithic implant-filled belly, but the sheer size of ${his} artificial bump forces the ribs wide, exposing the thinning cloth beneath.`);
						} else {
							r.push(`${slave.slaveName}'s corset attempts to cradle, rather than bind, ${his} monolithic pregnant belly, but the sheer size of ${his} overstuffed womb forces the ribs wide, giving the many writhing bulges coating ${his} stomach room to spill out against the thinning material of ${his} dress.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s corset attempts to cradle, rather than bind, ${his} titanic implant-filled belly, but the sheer size of ${his} artificial bump forces the ribs wide, exposing the thin cloth beneath.`);
						} else {
							r.push(`${slave.slaveName}'s corset attempts to cradle, rather than bind, ${his} titanic pregnant belly, but the sheer size of ${his} overfilled womb forces the ribs wide, giving the bulges of ${his} children room to spill out against the thin material of ${his} dress.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s corset cradles, rather than binds, ${his} gigantic implant-filled belly, but the sheer size of ${his} artificial bump forces the ribs wide, exposing the thin cloth beneath.`);
						} else {
							r.push(`${slave.slaveName}'s corset cradles, rather than binds, ${his} gigantic pregnant belly, but the sheer size of ${his} filled womb forces the ribs wide, exposing the thin cloth and uneven skin beneath.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s corset cradles, rather than binds, ${his} massive implant-filled belly, but the sheer size of ${his} artificial bump forces the ribs wide, exposing the thin cloth beneath.`);
						} else {
							r.push(`${slave.slaveName}'s corset cradles, rather than binds, ${his} massive pregnant belly, but the sheer size of ${his} fecund orb forces the ribs wide, exposing the thin cloth beneath.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s corset cradles, rather than binds, ${his} giant implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s corset cradles, rather than binds, ${his} giant pregnant belly.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s corset cradles, rather than binds, ${his} massively fat belly, though the ribs still create deep ravines of succulent flesh.`);
					} else if (slave.belly >= 30000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s corset cradles, rather than binds, ${his} huge implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s corset cradles, rather than binds, ${his} huge pregnant belly.`);
						}
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s huge pregnant belly strains the ribs of ${his} corset.`);
						} else if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s huge implant-filled belly strains the ribs of ${his} corset.`);
						} else {
							r.push(`${slave.slaveName}'s huge pregnant belly strains the ribs of ${his} corset.`);
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s big pregnant belly is carefully gripped by the ribs of ${his} corset.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s hugely swollen belly strains under the ribs of ${his} corset.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s big implant-filled belly is carefully gripped by the ribs of ${his} corset.`);
						} else {
							r.push(`${slave.slaveName}'s big pregnant belly is carefully gripped by the ribs of ${his} corset.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s hugely fat belly strains the ribs of ${his} corset, creating deep ravines of bountiful, soft flesh.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s big fat belly strains the ribs of ${his} corset, creating deep valleys of soft flesh.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s pregnant belly is carefully caressed by the ribs of ${his} corset.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s jiggling ${slave.inflationType}-filled belly is tightly gripped by the ribs of ${his} corset, forcing it to bulge angrily between the gaps.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s implant-filled belly is carefully caressed by the ribs of ${his} corset.`);
						} else {
							r.push(`${slave.slaveName}'s pregnant belly is carefully caressed by the ribs of ${his} corset.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s fat belly bulges the ribs of ${his} corset, creating valleys of soft flesh.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s corset bulges with ${his} small pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s ${slave.inflationType}-swollen belly bulges between the ribs of ${his} corset.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s corset bulges with ${his} implant-rounded belly.`);
						} else {
							r.push(`${slave.slaveName}'s corset bulges with ${his} growing pregnant belly.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s chubby belly bulges between the ribs of ${his} corset.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s swollen lower belly slightly bulges the lower rib of ${his} corset.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s ripped abs are completely hidden by ${his} corset.`);
					}
					break;
				case "slutty business attire":
					if (slave.belly >= 1000000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s unfathomable, hyper-swollen, ${slave.inflationType}-filled stomach hangs out the front of ${his} suit jacket and blouse as there is no way ${he} could ever come close to closing them. ${His} skirt is held together by strained straps, as ${his} immensity promises to soon rid ${him} of the oppressive garment.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s unfathomable, hyper-swollen, implant-filled stomach hangs out the front of ${his} suit jacket and blouse as there is no way ${he} could ever come close to closing them. ${His} skirt is held together by strained straps, as ${his} immensity promises to soon rid ${him} of the oppressive garment.`);
						} else {
							r.push(`${slave.slaveName}'s unfathomable, hyper-swollen pregnant stomach hangs out the front of ${his} suit jacket and blouse as there is no way ${he} could ever come close to closing them. ${His} skirt is held together by strained straps, as ${his} immensity promises to soon rid ${him} of the oppressive garment.`);
						}
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s monolithic, ${slave.inflationType}-filled stomach hangs out the front of ${his} suit jacket and blouse as there is no way ${he} could ever come close to closing them. ${His} skirt is loosely held together by straps, as ${his} immensity guarantees ${he}'ll burst any seams on the poor garment.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s monolithic, implant-filled stomach hangs out the front of ${his} suit jacket and blouse as there is no way ${he} could ever come close to closing them, even more so with the amount of pressure inside ${his} middle. ${His} skirt is loosely held together by straps, as ${his} immensity guarantees ${he}'ll burst any seams on the poor garment.`);
						} else {
							r.push(`${slave.slaveName}'s monolithic pregnant stomach hangs out the front of ${his} suit jacket and blouse as there is no way ${he} could ever come close to closing them, even more so with the amount of pressure inside ${his} cramped womb. ${His} skirt is loosely held together by straps, as ${his} immensity guarantees ${he}'ll burst any seams on the poor garment.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s titanic implant-filled stomach hangs out the front of ${his} suit jacket and blouse as there is no way ${he} could ever come close to closing them. ${His} skirt is shoved down by the heavy mass, but ${his} overfilled middle draws attention away from ${his} exposed nethers.`);
						} else {
							r.push(`${slave.slaveName}'s titanic pregnant stomach hangs out the front of ${his} suit jacket and blouse as there is no way ${he} could ever come close to closing them, not that ${his} rowdy brood would tolerate that. ${His} skirt is shoved down by the ponderous mass, but ${his} overfilled womb draws attention away from ${his} exposed nethers.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s gigantic implant-filled stomach hangs out the front of ${his} suit jacket and blouse as there is no way ${he} could ever come close to closing them. ${His} skirt is shoved down by the heavy mass, but ${his} overfilled middle draws attention away from ${his} exposed nethers.`);
						} else {
							r.push(`${slave.slaveName}'s gigantic pregnant stomach hangs out the front of ${his} suit jacket and blouse as there is no way ${he} could ever come close to closing them. ${His} skirt is shoved down by the ponderous mass, but ${his} overfilled womb draws attention away from ${his} exposed nethers.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s massive implant-filled stomach hangs out the front of ${his} suit jacket and blouse as there is no way ${he} could ever come close to closing them. ${His} skirt is shoved so low by the ponderous mass it barely hides ${his} crotch, though ${his} inflated middle more than covers for it.`);
						} else {
							r.push(`${slave.slaveName}'s massive pregnant stomach hangs out the front of ${his} suit jacket and blouse as there is no way ${he} could ever come close to closing them. ${His} skirt is shoved so low by the ponderous mass it barely hides ${his} crotch, though ${his} gravid swell more than covers for it.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s giant implant-filled stomach hangs out the front of ${his} suit jacket and blouse as there is no way ${he} could ever come close to closing them. ${He}'s so bulbous, ${his} skirt is forced scandalously low beneath ${his} inflated middle.`);
						} else {
							r.push(`${slave.slaveName}'s giant pregnant stomach hangs out the front of ${his} suit jacket and blouse as there is no way ${he} could ever come close to closing them. ${He}'s grown so large, ${his} skirt is forced scandalously low beneath ${his} gravid mound.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s massively fat belly hangs out the front of ${his} suit jacket and blouse, as there is no way ${he} could ever come close to closing them.`);
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s huge pregnant stomach hangs out the front of ${his} suit jacket and blouse, as there is no way ${he} could close them.`);
						} else if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s huge implant-filled belly hangs out the front of ${his} suit jacket and blouse, as there is no way ${he} could close them.`);
						} else {
							r.push(`${slave.slaveName}'s huge pregnant stomach hangs out the front of ${his} suit jacket and blouse, as there is no way ${he} could close them.`);
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s big pregnant stomach hangs out the front of ${his} suit jacket and blouse, as there is no way ${he} could close them.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s hugely swollen stomach hangs out the front of ${his} suit jacket and blouse, as there is no way ${he} could close them.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s big implant-filled belly hangs out the front of ${his} suit jacket and blouse, as there is no way ${he} could close them.`);
						} else {
							r.push(`${slave.slaveName}'s big pregnant stomach hangs out the front of ${his} suit jacket and blouse, as there is no way ${he} could close them.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s hugely fat belly hangs out the front of ${his} suit jacket and blouse, as there is no way ${he} could close them.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s big fat belly strains the buttons of ${his} suit jacket and blouse as it struggle to contain even the upper half of it. The rest hangs free over ${his} skirt.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s pregnant stomach strains the buttons of ${his} suit jacket and blouse.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s jiggling ${slave.inflationType}-filled stomach strains the buttons of ${his} suit jacket and blouse.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s implant-filled belly strains the buttons of ${his} suit jacket and blouse.`);
						} else {
							r.push(`${slave.slaveName}'s pregnant stomach strains the buttons of ${his} suit jacket and blouse.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s fat belly strains the buttons of ${his} suit jacket and blouse, the bottom of which just barely peeks out from under them.`);
					} else if (((slave.belly >= 1500) || (slave.bellyAccessory === "a small empathy belly"))) {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s small pregnant belly bulges ${his} suit jacket and blouse. It peeks out from under their bottom slightly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s ${slave.inflationType}-swollen belly bulges ${his} suit jacket and blouse. It peeks out from under their bottom slightly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s implant-rounded belly bulges ${his} suit jacket and blouse. It peeks out from under their bottom slightly.`);
						} else {
							r.push(`${slave.slaveName}'s growing belly bulges ${his} suit jacket and blouse. It peeks out from under their bottom slightly.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s chubby belly fills out ${his} suit jacket and blouse. It peeks out from under their bottom slightly.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s suit jacket and blouse are tight around ${his} lower belly.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName} has left the bottom few buttons of ${his} suit jacket and blouse undone to allow ${his} ripped abs to stand out.`);
					}
					break;
				case "nice business attire":
					if (slave.belly >= 1000000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s unfathomable, hyper-swollen, ${slave.inflationType}-filled stomach hangs out the front of ${his} specially tailored blouse and jacket as there is no way ${he} could ever come close to closing them. ${His} skirt is left open to give ${him} as much space as possible, leaving ${his} inflated middle to cover ${his} shame.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s unfathomable, hyper-swollen, implant-filled stomach hangs out the front of ${his} specially tailored blouse and jacket as there is no way ${he} could ever come close to closing them. ${His} skirt is left open to give ${him} as much space as possible, leaving ${his} inflated middle to cover ${his} shame.`);
						} else {
							r.push(`${slave.slaveName}'s unfathomable, hyper-swollen pregnant stomach hangs out the front of ${his} specially tailored blouse and jacket as there is no way ${he} could ever come close to closing them. ${His} skirt is left open to give ${him} as much space as possible, leaving ${his} gravid mound to cover ${his} shame.`);
						}
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s monolithic, ${slave.inflationType}-filled stomach hangs out the front of ${his} specially tailored blouse and jacket as there is no way ${he} could ever come close to closing them. ${His} skirt is loosely held together by straps, as ${his} immensity guarantees ${he}'ll burst any seams on the poor garment. ${His} skirt is left open, but ${his} inflated middle draws attention away from the fact.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s monolithic, implant-filled stomach hangs out the front of ${his} specially tailored blouse and jacket as there is no way ${he} could ever come close to closing them, even more so with the amount of pressure inside ${his} middle. ${His} skirt is left open, but ${his} inflated middle draws attention away from the fact.`);
						} else {
							r.push(`${slave.slaveName}'s monolithic pregnant stomach hangs out the front of ${his} specially tailored blouse and jacket as there is no way ${he} could ever come close to closing them, even more so with the amount of pressure inside ${his} cramped womb. ${His} skirt is left open, but ${his} gravid mound draws attention away from the fact.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s titanic implant-filled stomach hangs out the front of ${his} specially tailored blouse and jacket as there is no way ${he} could ever come close to closing them. ${His} skirt is loosely held together by strained straps, as ${his} immensity guarantees ${he}'ll burst any seams on a proper garment.`);
						} else {
							r.push(`${slave.slaveName}'s titanic pregnant stomach hangs out the front of ${his} specially tailored blouse and jacket as there is no way ${he} could ever come close to closing them, not that ${his} rowdy brood would tolerate that. ${His} skirt is loosely held together by strained straps, as ${his} immensity guarantees ${he}'ll burst any seams on a proper garment.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s gigantic implant-filled stomach hangs out the front of ${his} specially tailored blouse and jacket as there is no way ${he} could ever come close to closing them. ${His} skirt is loosely held together by straps, as ${his} immensity guarantees ${he}'ll burst any seams on a proper garment.`);
						} else {
							r.push(`${slave.slaveName}'s gigantic pregnant stomach hangs out the front of ${his} specially tailored blouse and jacket as there is no way ${he} could ever come close to closing them. ${His} skirt is loosely held together by straps, as ${his} immensity guarantees ${he}'ll burst any seams on a proper garment.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s massive implant-filled stomach hangs out the front of ${his} specially tailored blouse and jacket as there is no way ${he} could ever come close to closing them. ${His} skirt is loosely held together by straps, as ${his} immensity guarantees ${he}'ll burst any seams on a proper garment.`);
						} else {
							r.push(`${slave.slaveName}'s massive pregnant stomach hangs out the front of ${his} specially tailored blouse and jacket as there is no way ${he} could ever come close to closing them. ${His} skirt is loosely held together by straps, as ${his} immensity guarantees ${he}'ll burst any seams on a proper garment.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s giant implant-filled stomach hangs out the front of ${his} specially tailored blouse and jacket as there is no way for ${him} to close them. ${He}'s so bulbous, ${his} maternity skirt has stretched to its limit.`);
						} else {
							r.push(`${slave.slaveName}'s giant pregnant stomach hangs out the front of ${his} specially tailored blouse and jacket as there is no way for ${him} to close them. ${He}'s grown so large, ${his} maternity skirt has stretched to its limit.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s massively fat belly hangs out the front of ${his} specially tailored blouse and jacket as there is no way for ${him} to close them.`);
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s huge pregnant stomach hangs out the front of ${his} specially tailored blouse and jacket as there is no way for ${him} to close them. ${His} maternity skirt fits ${him} quite well, though.`);
						} else if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s huge implant-filled belly hangs out the front of ${his} specially tailored blouse and jacket as there is no way for ${him} to close them. ${His} maternity skirt fits ${him} quite well, though.`);
						} else {
							r.push(`${slave.slaveName}'s huge pregnant stomach hangs out the front of ${his} specially tailored blouse and jacket as there is no way for ${him} to close them. ${His} maternity skirt fits ${him} quite well, though.`);
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s big pregnant belly strains ${his} specially tailored blouse and jacket.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s hugely swollen belly strains ${his} specially tailored blouse and jacket.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s big implant-filled belly strains ${his} specially tailored blouse and jacket.`);
						} else {
							r.push(`${slave.slaveName}'s big pregnant belly strains ${his} specially tailored blouse and jacket.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s hugely fat belly strains ${his} specially tailored blouse and jacket.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s tailored blouse and jacket fit ${his} big fat belly surprisingly well, though they do nothing to hide how huge ${his} gut is.`);
					} else if (slave.belly >= 5000 || slave.bellyAccessory === "a medium empathy belly") {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s pregnant belly looks good in ${his} specially tailored blouse and jacket.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s jiggling ${slave.inflationType}-filled belly looks good in ${his} specially tailored blouse and jacket.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s implant-filled belly looks good in ${his} specially tailored blouse and jacket.`);
						} else {
							r.push(`${slave.slaveName}'s pregnant belly looks good in ${his} specially tailored blouse and jacket.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s tailored blouse and jacket fit ${his} fat belly well, though they do nothing to hide how big ${his} gut is.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s small pregnant belly bulges under ${his} tailored blouse and jacket.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s ${slave.inflationType}-swollen belly bulges under ${his} tailored blouse and jacket.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s implant-rounded belly bulges under ${his} tailored blouse and jacket.`);
						} else {
							r.push(`${slave.slaveName}'s growing belly bulges under ${his} tailored blouse and jacket.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s chubby belly fills out ${his} tailored blouse and jacket.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s suit jacket and blouse are a little tight around ${his} lower belly.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s ripped abs are completely hidden by ${his} suit jacket.`);
					}
					break;
				case "harem gauze":
					if (slave.belly >= 1000000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s harem girl outfit, designed with enough sheer fabric to fill a shah's palace, has been specially tailored to drape over ${his} unfathomable, hyper-swollen, ${slave.inflationType}-filled belly and accentuate its size and shape.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s harem girl outfit, designed with enough sheer fabric to fill a shah's palace, has been specially tailored to drape over ${his} unfathomable, hyper-swollen, implant-filled belly and accentuate its size and shape.`);
						} else {
							r.push(`${slave.slaveName}'s harem girl outfit, designed with enough sheer fabric to fill a shah's palace, has been specially tailored to drape over ${his} unfathomable, hyper-swollen pregnancy and accentuate its size and the oceanic movement as ${his} belly is rocked by the actions of ${his} brood of innumerable children.`);
						}
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s harem girl outfit has been specially tailored to drape over ${his} monolithic, ${slave.inflationType}-filled belly and accentuate its size and shape.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s harem girl outfit has been specially tailored to drape over ${his} monolithic, implant-filled belly and sensually accentuate its size and shape.`);
						} else {
							r.push(`${slave.slaveName}'s harem girl outfit has been specially tailored to drape over ${his} monolithic pregnancy and sensually accentuate its size and the movement of ${his} many unborn children.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s harem girl outfit has been specially tailored to drape over ${his} titanic, implant-filled belly and sensually accentuate its size and shape.`);
						} else {
							r.push(`${slave.slaveName}'s harem girl outfit has been specially tailored to drape over ${his} titanic pregnancy and sensually accentuate its size and the movement of ${his} many unborn children.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s harem girl outfit has been specially tailored to drape over ${his} gigantic implant-filled belly and sensually accentuate its size and shape.`);
						} else {
							r.push(`${slave.slaveName}'s harem girl outfit has been specially tailored to drape over ${his} gigantic pregnancy and sensually accentuate its size and shape.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s harem girl outfit sensually accentuates ${his} massive implant-filled belly and the unique motions it takes to move it.`);
						} else {
							r.push(`${slave.slaveName}'s harem girl outfit sensually accentuates ${his} massive pregnancy and the unique motions it takes to move it.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s harem girl outfit sensually accentuates ${his} giant implant-filled belly and the wide movements ${he} makes with it.`);
						} else {
							r.push(`${slave.slaveName}'s harem girl outfit sensually accentuates ${his} giant pregnancy and the wide movements ${he} makes with it.`);
						}
					} else if (slave.belly >= 30000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s harem girl outfit sensually accentuates ${his} huge implant-filled belly and the wide movements ${he} makes with it.`);
						} else {
							r.push(`${slave.slaveName}'s harem girl outfit sensually accentuates ${his} huge pregnancy and the wide movements ${he} makes with it.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s harem girl outfit sensually accentuates ${his} massively fat belly and makes every jiggle of ${his} expansive flesh surprisingly alluring.`);
					} else if (slave.belly >= 15000 || slave.bellyAccessory === "a huge empathy belly") {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s harem girl outfit sensually accentuates ${his} huge pregnant belly.`);
						} else if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s harem girl outfit sensually accentuates ${his} huge implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s harem girl outfit sensually accentuates ${his} heavy pregnancy.`);
						}
					} else if (slave.belly >= 10000 || slave.bellyAccessory === "a large empathy belly") {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s harem girl outfit sensually accentuates ${his} big pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s harem girl outfit sensually accentuates ${his} hugely swollen stomach.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s harem girl outfit sensually accentuates ${his} big implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s harem girl outfit sensually accentuates ${his} advanced pregnancy.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s harem girl outfit sensually accentuates ${his} hugely fat belly and makes every jiggle of ${his} extra flesh surprisingly alluring.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s harem girl outfit sensually accentuates ${his} big fat belly and makes every jiggle of ${his} flesh surprisingly alluring.`);
					} else if (slave.belly >= 5000 || slave.bellyAccessory === "a medium empathy belly") {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s harem girl outfit sensually accentuates ${his} pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s harem girl outfit sensually accentuates ${his} jiggling ${slave.inflationType}-filled.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s harem girl outfit sensually accentuates ${his} implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s harem girl outfit sensually accentuates ${his} pregnancy.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s harem girl outfit sensually accentuates ${his} fat belly.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s harem girl outfit sensually accentuates ${his} small pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s harem girl outfit sensually accentuates ${his} ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s harem girl outfit sensually accentuates ${his} implant-rounded middle.`);
						} else {
							r.push(`${slave.slaveName}'s harem girl outfit sensually accentuates ${his} growing pregnancy.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s harem girl outfit sensually accentuates ${his} chubby belly.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s harem girl outfit sensually accentuates the slight swell to ${his} lower belly.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s harem girl outfit sensually accentuates ${his} ripped abs.`);
					} else if (slave.muscles > 5) {
						r.push(`${slave.slaveName}'s harem girl outfit sensually accentuates ${his} toned belly.`);
					}
					break;
				case "a comfortable bodysuit":
					if (slave.belly >= 1000000) {
					// WIP//
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s bodysuit somehow manages to barely stretch over ${his} monolithic, ${slave.inflationType}-filled belly, pulled smooth over ${his} pressure flattened navel.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s bodysuit somehow manages to barely stretch over ${his} monolithic, implant-filled belly, pulled smooth over ${his} pressure flattened navel.`);
						} else {
							r.push(`${slave.slaveName}'s bodysuit somehow manages to barely stretch over ${his} monolithic pregnant belly, pulled smooth over ${his} pressure flattened navel and all the movement of ${his} many squirming children.`);
						}
					} else if (slave.bellyPreg >= 600000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s bodysuit stretches across ${his} titanic implant-filled belly and draws the eye right to the small bump on its smooth surface, ${his} flattening navel.`);
						} else {
							r.push(`${slave.slaveName}'s bodysuit stretches across ${his} titanic pregnant belly, drawing the eye to ${his} flattening navel and the squirming bulges of the life filling ${him}.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s bodysuit stretches across ${his} gigantic implant-filled belly and draws the eye right to the deminishing bump on its smooth surface, ${his} navel.`);
						} else {
							r.push(`${slave.slaveName}'s bodysuit stretches across ${his} gigantic pregnant belly, drawing the eye to ${his} protruding navel and the squirming outlines of the life within ${him}.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s bodysuit stretches over ${his} massive implant-filled belly and draws the eye right to the sole bump on its smooth surface, ${his} navel.`);
						} else {
							r.push(`${slave.slaveName}'s bodysuit stretches over ${his} massive pregnant belly and draws the eye right to each and every bump that appears on its smooth surface.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s bodysuit stretches over ${his} giant implant-filled belly and draws the eye right to ${his} protruding navel.`);
						} else {
							r.push(`${slave.slaveName}'s bodysuit stretches over ${his} giant pregnant belly, drawing the eye to ${his} protruding navel and clearly showing every kick and squirm inside ${his} bulging middle.`);
						}
					} else if (slave.belly >= 60000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s bodysuit stretches over ${his} huge implant-filled belly and draws the eye right to ${his} protruding navel.`);
						} else {
							r.push(`${slave.slaveName}'s bodysuit stretches over ${his} huge pregnant belly, drawing the eye to ${his} protruding navel and clearly showing every kick and squirm inside ${his} bulging middle.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s bodysuit tightly clings to ${his} massively fat belly, displaying every fold, roll and motion in it.`);
					} else if (slave.belly >= 15000 || slave.bellyAccessory === "a huge empathy belly") {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s bodysuit tightly clings to ${his} huge pregnant belly.`);
						} else if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s bodysuit tightly clings to ${his} huge implant-filled belly, displaying ${his} popped navel.`);
						} else {
							r.push(`${slave.slaveName}'s bodysuit tightly clings to ${his} huge pregnant belly, displaying ${his} popped navel and any movement ${his} babies make.`);
						}
					} else if (slave.belly >= 10000 || slave.bellyAccessory === "a large empathy belly") {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s bodysuit tightly clings to ${his} big pregnant belly, displaying ${his} popped navel.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s bodysuit tightly clings to ${his} hugely swollen belly, displaying ${his} bloated figure and every jiggle of ${his} full stomach.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s bodysuit tightly clings to ${his} big implant-filled belly, prominently displaying ${his} popped navel.`);
						} else {
							r.push(`${slave.slaveName}'s bodysuit tightly clings to ${his} big pregnant belly, displaying ${his} popped navel and any movement ${his} bab${slave.pregType > 1 ? "ies make" : "y makes"} make.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s bodysuit tightly clings to ${his} hugely fat belly, displaying every fold, roll and motion in it.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s bodysuit tightly clings to ${his} big fat belly, displaying every fold and roll in it.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s bodysuit tightly clings to ${his} pregnant belly, displaying ${his} popped navel.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s bodysuit tightly clings to ${his} jiggling ${slave.inflationType}-filled belly, displaying ${his} bloating and every motion ${his} contents make.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s bodysuit tightly clings to ${his} implant-filled belly, prominently displaying ${his} flattening navel.`);
						} else {
							r.push(`${slave.slaveName}'s bodysuit tightly clings to ${his} pregnant belly, displaying ${his} flattening navel and any movement ${his} bab${slave.pregType > 1 ? "ies make" : "y makes"}.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s bodysuit tightly clings to ${his} fat belly, displaying every fold and roll in it.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s bodysuit tightly clings to ${his} small pregnant belly, displaying ${his} ripening body.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s bodysuit tightly clings to ${his} ${slave.inflationType}-swollen belly, displaying ${his} bloated body.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s bodysuit tightly clings to ${his} implant-rounded belly, displaying ${his} swollen body.`);
						} else {
							r.push(`${slave.slaveName}'s bodysuit tightly clings to ${his} growing belly, displaying ${his} ripening body.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s bodysuit tightly clings to ${his} chubby belly, displaying every fold and roll in it.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s bodysuit tightly clings to ${his} belly, clearly showing the slight swell beneath ${his} navel.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s bodysuit tightly clings to ${his} ripped abs, clearly displaying ${his} six pack.`);
					}
					break;
				case "a slutty nurse outfit":
					if (slave.belly >= 1000000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s jacket fails to even come close to closing over ${his} unfathomable, hyper-swollen, ${slave.inflationType}-filled belly, requiring ${him} to hold ${his} nurse's jacket together under ${his} breasts with a length of red silk ribbon. An additional ribbon completes ${his} skirt, though ${his} immensity threatens to disrupt even that strategy.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s jacket fails to even come close to closing over ${his} unfathomable, hyper-swollen, implant-filled belly, requiring ${him} to hold ${his} nurse's jacket together under ${his} breasts with a length of red silk ribbon. An additional ribbon completes ${his} skirt, though ${his} immensity threatens to disrupt even that strategy.`);
						} else {
							r.push(`${slave.slaveName}'s jacket fails to even come close to closing over ${his} unfathomable, hyper-swollen pregnant belly, requiring ${him} to hold ${his} nurse's jacket together under ${his} breasts with a length of red silk ribbon. An additional ribbon completes ${his} skirt, though ${his} immensity threatens to disrupt even that strategy.`);
						}
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s jacket fails to even come close to closing over ${his} monolithic, ${slave.inflationType}-filled belly, requiring ${him} to hold ${his} nurse's jacket together under ${his} breasts with a length of red silk ribbon. An additional ribbon completes ${his} skirt, as ${his} immensity guarantees ${he}'ll burst any seams on the poor garment.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s jacket fails to even come close to closing over ${his} monolithic, implant-filled belly, requiring ${him} to hold ${his} nurse's jacket together under ${his} breasts with a length of red silk ribbon. An additional ribbon completes ${his} skirt, as ${his} immensity guarantees ${he}'ll burst any seams on the poor garment.`);
						} else {
							r.push(`${slave.slaveName}'s jacket fails to even come close to closing over ${his} monolithic pregnant belly, requiring ${him} to hold ${his} nurse's jacket together under ${his} breasts with a length of red silk ribbon. An additional ribbon completes ${his} skirt, as ${his} immensity guarantees ${he}'ll burst any seams on the poor garment.`);
						}
					} else if (slave.bellyPreg >= 600000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s jacket fails to even come close to closing over ${his} titanic implant-filled belly, requiring ${him} to hold ${his} nurse's jacket together under ${his} breasts with a length of red silk ribbon. ${His} skirt is shoved down by the heavy mass, but ${his} overfilled middle draws attention away from ${his} exposed nethers.`);
						} else {
							r.push(`${slave.slaveName}'s jacket fails to even come close to closing over ${his} titanic pregnant belly, requiring ${him} to hold ${his} nurse's jacket together under ${his} breasts with a length of red silk ribbon. ${His} skirt is shoved down by the ponderous mass, but ${his} overfilled womb draws attention away from ${his} exposed nethers.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s jacket fails to even come close to closing over ${his} gigantic implant-filled belly, requiring ${him} to hold ${his} nurse's jacket together under ${his} breasts with a length of red silk ribbon. ${His} skirt is shoved down by the heavy mass, but ${his} overfilled middle draws attention away from ${his} exposed nethers.`);
						} else {
							r.push(`${slave.slaveName}'s jacket fails to even come close to closing over ${his} gigantic pregnant belly, requiring ${him} to hold ${his} nurse's jacket together under ${his} breasts with a length of red silk ribbon. ${His} skirt is shoved down by the ponderous mass, but ${his} overfilled womb draws attention away from ${his} exposed nethers.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s jacket fails to even come close to closing over ${his} massive implant-filled belly, requiring ${him} to hold ${his} nurse's jacket together under ${his} breasts with a length of red silk ribbon. ${His} skirt is shoved so low by the ponderous mass it barely hides ${his} crotch, though ${his} inflated middle more than covers for it.`);
						} else {
							r.push(`${slave.slaveName}'s jacket fails to even come close to closing over ${his} massive pregnant belly, requiring ${him} to hold ${his} nurse's jacket together under ${his} breasts with a length of red silk ribbon. ${His} skirt is shoved so low by the ponderous mass it barely hides ${his} crotch, though ${his} gravid swell more than covers for it.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s jacket fails to even come close to closing over ${his} giant implant-filled belly, leaving ${him} with only a single straining button to keep ${his} attire together. ${He}'s so bulbous, ${his} skirt is forced scandalously low beneath ${his} inflated middle.`);
						} else {
							r.push(`${slave.slaveName}'s jacket fails to even come close to closing over ${his} giant pregnant belly, leaving ${him} with only a single straining button to keep ${his} attire together. ${He}'s grown so large, ${his} skirt is forced scandalously low beneath ${his} gravid mound.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s jacket fails to even come close to closing over ${his} massively fat belly, leaving ${him} with only the button below ${his} breasts done.`);
					} else if (slave.belly >= 15000 || slave.bellyAccessory === "a huge empathy belly") {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s jacket fails to even come close to closing over ${his} huge pregnant belly, leaving ${him} with only the button below ${his} breasts done.`);
						} else if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s jacket fails to even come close to closing over ${his} huge implant-filled belly, leaving ${him} with only the button below ${his} breasts done.`);
						} else {
							r.push(`${slave.slaveName}'s jacket fails to even come close to closing over ${his} huge pregnant belly, leaving ${him} with only the button below ${his} breasts done.`);
						}
					} else if (slave.belly >= 10000 || slave.bellyAccessory === "a large empathy belly") {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s jacket fails to even come close to closing over ${his} big pregnant belly, leaving ${him} with only the button below ${his} breasts done.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s jacket fails to even come close to closing over ${his} hugely swollen belly, leaving ${him} with only the button below ${his} breasts done.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s jacket fails to even come close to closing over ${his} big implant-filled belly, leaving ${him} with only the button below ${his} breasts done.`);
						} else {
							r.push(`${slave.slaveName}'s jacket fails to even come close to closing over ${his} big pregnant belly, leaving ${him} with only the button below ${his} breasts done.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s jacket fails to even come close to closing over ${his} hugely fat belly, leaving ${him} with only the button below ${his} breasts done.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s jacket fails to even come close to closing over ${his} big fat belly, leaving ${him} with only the button below ${his} breasts done.`);
					} else if (slave.belly >= 5000 || slave.bellyAccessory === "a medium empathy belly") {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s jacket barely closes over ${his} pregnant belly leaving its buttons threatening to pop.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s jacket barely closes over ${his} jiggling ${slave.inflationType}-filled belly leaving its buttons threatening to pop.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s jacket barely closes over ${his} implant-filled belly leaving its buttons threatening to pop.`);
						} else {
							r.push(`${slave.slaveName}'s jacket barely closes over ${his} pregnant belly leaving its buttons threatening to pop.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s jacket barely closes over ${his} fat belly forcing plenty of flab out from under its bottom and between the straining buttons.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s jacket bulges with ${his} small pregnant belly, which can be seen peeking out from underneath.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s jacket bulges with ${his} ${slave.inflationType}-swollen belly, which can be seen peeking out from underneath.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s jacket bulges with ${his} implant-rounded belly, which can be seen peeking out from underneath.`);
						} else {
							r.push(`${slave.slaveName}'s jacket bulges with ${his} growing belly, which can be seen peeking out from underneath.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s jacket bulges with ${his} chubby belly, which can be seen peeking out from underneath as it hangs over ${his} waist of ${his} skirt.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName} wears ${his} skirt a little lower to due to the slight swell to ${his} lower belly.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s jacket is so tight around ${his} ripped abs, even the slightest movement threatens to send buttons flying.`);
					}
					break;
				case "a schoolgirl outfit":
					if (slave.belly >= 1000000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s blouse rests atop ${his} unfathomable, hyper-swollen, ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s blouse rests atop ${his} unfathomable, hyper-swollen, implant-filled belly. ${His} skirt barely fits around ${him} and ${his} immensity promises to soon rid ${him} of the oppressive garment.`);
						} else {
							r.push(`${slave.slaveName}'s blouse rests atop ${his} unfathomable, hyper-swollen pregnant belly, showing off the mind-boggling result of ${his} promiscuity. It's a wonder ${his} straining skirt even manages to hold together with as much movement shoving against it.`);
						}
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s blouse rests atop ${his} monolithic, ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s blouse rests atop ${his} monolithic, implant-filled belly. ${His} skirt is shoved down by the heavy mass, but ${his} overfilled middle draws attention away from ${his} exposed nethers.`);
						} else {
							r.push(`${slave.slaveName}'s blouse rests atop ${his} monolithic pregnant belly, showing off the staggering result of ${his} promiscuity. ${His} skirt is shoved down by the ponderous mass, but the class-to-be draws attention away from ${his} exposed nethers.`);
						}
					} else if (slave.bellyPreg >= 600000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s blouse rests atop ${his} titanic implant-filled belly, showing off the result of ${his} promiscuity. ${His} skirt is shoved down by the heavy mass, but ${his} overfilled middle draws attention away from ${his} exposed nethers.`);
						} else {
							r.push(`${slave.slaveName}'s blouse rests atop ${his} titanic pregnant belly, showing off the result of ${his} promiscuity. ${His} skirt is shoved down by the ponderous mass, but the class-to-be draws attention away from ${his} exposed nethers.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s gigantic implant-filled stomach hangs out the front of ${his} suit jacket and blouse as there is no way ${he} could ever come close to closing them. ${His} skirt is shoved down by the heavy mass, but ${his} overfilled middle draws attention away from ${his} exposed nethers.`);
						} else {
							r.push(`${slave.slaveName}'s blouse rests atop ${his} gigantic pregnant belly, showing off the result of ${his} promiscuity. ${His} skirt is shoved down by the ponderous mass, but the class-to-be draws attention away from ${his} exposed nethers.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s blouse meekly rests atop ${his} massive implant-filled belly. ${His} skirt is shoved so low by the ponderous mass it barely hides ${his} crotch, though ${his} inflated middle more than covers for it.`);
						} else {
							r.push(`${slave.slaveName}'s blouse meekly rests atop ${his} massive pregnant belly. ${His} skirt is shoved so low by the ponderous mass it barely hides ${his} crotch, though the result of ${his} promiscuity more than covers for it.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s blouse meekly rests atop ${his} giant implant-filled belly, while it itself forces ${his} skirt scandalously low.`);
						} else {
							r.push(`${slave.slaveName}'s blouse meekly rests atop ${his} giant pregnant belly, while it itself forces ${his} skirt scandalously low, showing off the result of ${his} promiscuity.`);
						}
					} else if (slave.belly >= 30000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s blouse can no longer stretch over ${his} huge implant-filled belly, while it itself forces ${his} skirt dangerously low, leaving ${him} looking the part of a school slut.`);
						} else {
							r.push(`${slave.slaveName}'s blouse can no longer stretch over ${his} huge pregnant belly, while it itself forces ${his} skirt dangerously low, leaving ${him} looking the part of a school slut.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s blouse rests atop ${his} massively fat belly, allowing it to hang loose over ${his} skirt.`);
					} else if (slave.belly >= 15000 || slave.bellyAccessory === "a huge empathy belly") {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s blouse barely covers the top of ${his} huge pregnant belly, while it itself forces ${his} skirt dangerously low, leaving ${him} looking the part of a school slut.`);
						} else if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s blouse barely covers the top of ${his} huge implant-filled belly, while it itself forces ${his} skirt dangerously low, leaving ${him} looking the part of a school slut.`);
						} else {
							r.push(`${slave.slaveName}'s blouse barely covers the top of ${his} huge pregnant belly, while it itself forces ${his} skirt dangerously low, leaving ${him} looking the part of a school slut.`);
						}
					} else if (slave.belly >= 10000 || slave.bellyAccessory === "a large empathy belly") {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s blouse rides up ${his} big pregnant belly while it forces ${his} skirt down, leaving ${him} looking particularly slutty.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s blouse rides up ${his} big implant-filled belly while it forces ${his} skirt down, leaving ${him} looking particularly slutty.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s blouse rides up ${his} hugely swollen belly while it forces ${his} skirt down, leaving ${him} looking particularly slutty.`);
						} else {
							r.push(`${slave.slaveName}'s blouse rides up ${his} big pregnant belly while it forces ${his} skirt down, leaving ${him} looking particularly slutty.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s blouse rides up ${his} hugely fat belly, leaving it hanging loose and covering ${his} skirt.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s blouse rides up ${his} big fat belly, leaving it hanging loose and covering ${his} skirt.`);
					} else if (slave.belly >= 5000 || slave.bellyAccessory === "a medium empathy belly") {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s blouse rides up ${his} pregnant belly while it forces ${his} skirt down, leaving ${him} looking particularly slutty.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s blouse rides up ${his} jiggling ${slave.inflationType}-filled belly, leaving ${him} looking particularly slutty as it wobbles over the hem of ${his} skirt.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s blouse rides up ${his} implant-filled belly while it forces ${his} skirt down, leaving ${him} looking particularly slutty.`);
						} else {
							r.push(`${slave.slaveName}'s blouse rides up ${his} pregnant belly while it forces ${his} skirt down, leaving ${him} looking particularly slutty.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s blouse rides up ${his} fat belly, leaving it hanging loose and covering ${his} skirt.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s blouse bulges with ${his} small pregnant belly. It peeks out from the bottom leaving ${him} looking particularly slutty.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s blouse bulges with ${his} ${slave.inflationType}-swollen belly. It peeks out from the bottom leaving ${him} looking particularly slutty.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s blouse bulges with ${his} implant-rounded belly. It peeks out from the bottom leaving ${him} looking particularly slutty.`);
						} else {
							r.push(`${slave.slaveName}'s blouse bulges with ${his} growing belly. It peeks out from the bottom leaving ${him} looking particularly slutty.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s blouse bulges with ${his} chubby belly. It peeks out from the bottom as it hangs over the waist of ${his} skirt.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s skirt is a little tight around ${his} middle.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s blouse is just short enough to give tantalizing peeks of the ripped abs beneath.`);
					}
					break;
				case "a kimono":
					if (slave.belly >= 1000000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s unfathomable, hyper-swollen, ${slave.inflationType}-filled belly is so enormous that the largest obi in the world could never wrap around it. As a result, ${he} leaves ${his} kimono open; not that ${he} could realistically fold it. It pools around ${him} when ${he} rests atop ${his} belly's incredible mass, causing ${him} to resemble a geisha in repose due to ${his} immobility.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s unfathomable, hyper-swollen, implant-filled belly is so enormous that the largest obi in the world could never wrap around it. As a result, ${he} leaves ${his} kimono open; not that ${he} could realistically fold it. It pools around ${him} when ${he} rests atop ${his} belly's incredible mass, causing ${him} to resemble a geisha in repose due to ${his} immobility.`);
						} else {
							r.push(`${slave.slaveName}'s unfathomable, hyper-swollen pregnancy is so enormous that the largest obi in the world could never wrap around it. As a result, ${he} leaves ${his} kimono open; not that ${he} could realistically fold it. It pools around ${him} when ${he} rests atop ${his} belly's incredible, brood swollen mass, causing ${him} to resemble nothing more than a geisha in repose, rocking on an ocean of undulating flesh.`);
						}
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s monolithic, ${slave.inflationType}-filled belly is so enormous that there is no way for ${his} obi to ever wrap around it to tie ${his} kimono. As a result, ${he} leaves ${his} kimono open; not that ${he} could realistically fold it. It pools around ${him} when ${he} rests against ${his} belly's incredible mass.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s monolithic, implant-filled belly is so enormous that there is no way for ${his} obi to ever wrap around it to tie ${his} kimono. As a result, ${he} leaves ${his} kimono open; not that ${he} could realistically fold it. It pools around ${him} when ${he} rests against ${his} belly's incredible mass.`);
						} else {
							r.push(`${slave.slaveName}'s monolithic pregnant belly is so enormous that there is no way for ${his} obi to ever wrap around it to tie ${his} kimono. As a result, ${he} leaves ${his} kimono open; not that ${he} could realistically fold it. It pools around ${him} when ${he} rests against ${his} belly's incredible mass.`);
						}
					} else if (slave.bellyPreg >= 600000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s titanic implant-filled belly parts ${his} kimono, since it is impossible to fold over such a bulging swell, leaving it gracefully covering ${his} sides.`);
						} else {
							r.push(`${slave.slaveName}'s titanic pregnant belly parts ${his} kimono, since it is impossible to fold over such a turbulent swell, leaving it gracefully covering ${his} sides.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s gigantic implant-filled belly parts ${his} kimono, since it is impossible to fold over such a bulging swell, leaving it gracefully covering ${his} sides.`);
						} else {
							r.push(`${slave.slaveName}'s gigantic pregnant belly parts ${his} kimono, since it is impossible to fold over such a bulging swell, leaving it gracefully covering ${his} sides.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s massive implant-filled belly parts ${his} kimono, leaving it gracefully covering its sides.`);
						} else {
							r.push(`${slave.slaveName}'s massive pregnant belly parts ${his} kimono, leaving it gracefully covering its sides.`);
						}
					} else if (slave.belly >= 150000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s giant implant-filled belly has triumphed over ${his} kimono; ${he} has become so gravid it is simply no longer possible to properly fold the garment around ${himself}.`);
						} else {
							r.push(`${slave.slaveName}'s giant pregnant belly has triumphed over ${his} kimono; ${he} has become so gravid it is simply no longer possible to properly fold the garment around ${himself}.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s giant implant-filled belly tests the limits of ${his} kimono; any larger and ${he} simply won't be capable of folding it over ${his} enormity.`);
						} else {
							r.push(`${slave.slaveName}'s giant pregnant belly tests the limits of ${his} kimono; any larger and ${he} simply won't be capable of folding it over ${his} gravidity.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s massively fat belly is barely covered by ${his} kimono; ${his} obi sinks into ${his} soft middle as it struggles to keep ${his} kimono closed.`);
					} else if (slave.belly >= 15000 || slave.bellyAccessory === "a huge empathy belly") {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s huge pregnant belly fills out ${his} kimono; ${his} obi is tied above its swell ${his} for convenience.`);
						} else if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s huge implant-filled belly fills out ${his} kimono; ${his} obi tied above its swell ${his} for convenience.`);
						} else {
							r.push(`${slave.slaveName}'s huge pregnant belly fills out ${his} kimono; ${his} obi tied above its swell ${his} for convenience.`);
						}
					} else if (slave.belly >= 10000 || slave.bellyAccessory === "a large empathy belly") {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s big pregnant belly is demurely covered by ${his} kimono, though it can't hide how large it is.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s hugely swollen belly is demurely covered by ${his} kimono, though it can't hide how large it is.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s big implant-filled belly is demurely covered by ${his} kimono, though it can't hide how large it is.`);
						} else {
							r.push(`${slave.slaveName}'s big pregnant belly is demurely covered by ${his} kimono, though it can't hide how large it is.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s hugely fat belly is demurely covered by ${his} kimono, though it can't hide how big it is.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s big fat belly is demurely covered by ${his} kimono, though it can't hide how big it is.`);
					} else if (slave.belly >= 5000 || slave.bellyAccessory === "a medium empathy belly") {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s pregnant belly is demurely covered by ${his} kimono.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s jiggling ${slave.inflationType}-filled belly is demurely covered by ${his} kimono.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s implant-filled belly is demurely covered by ${his} kimono.`);
						} else {
							r.push(`${slave.slaveName}'s pregnant belly is demurely covered by ${his} kimono.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s fat belly is demurely covered by ${his} kimono.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s small pregnant belly is demurely covered by ${his} kimono.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s ${slave.inflationType}-swollen belly is demurely covered by ${his} kimono.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s implant-rounded belly is demurely covered by ${his} kimono.`);
						} else {
							r.push(`${slave.slaveName}'s growing belly is demurely covered by ${his} kimono.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s chubby belly is demurely covered by ${his} kimono.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s kimono hides the minor bloating in ${his} lower belly.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s ripped abs are demurely covered by ${his} kimono.`);
					}
					break;
				case "battledress":
					if (slave.belly >= 1000000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s tank top rests atop the unfathomable, hyper-swollen, ${slave.inflationType}-filled belly bulging from ${his} overwhelmed fatigues, leaving ${him} looking, falsely, like someone preparing to give birth to an army.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s tank top rests atop the unfathomable, hyper-swollen, implant-filled belly bulging from ${his} overwhelmed fatigues, leaving ${him} looking , falsely, like someone preparing to give birth to an army.`);
						} else {
							r.push(`${slave.slaveName}'s tank top rests atop the unfathomable, hyper-swollen pregnant belly bulging from ${his} overwhelmed fatigues, leaving ${him} looking like someone preparing to give birth to an army.`);
						}
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s tank top rests atop the monolithic, ${slave.inflationType}-filled belly bulging from ${his} overwhelmed fatigues, leaving ${him} looking, falsely, like someone preparing to give birth to a regiment of soldiers.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s tank top rests atop the monolithic, implant-filled belly bulging from ${his} overwhelmed fatigues, leaving ${him} looking, falsely, like someone preparing to give birth to a regiment of soldiers.`);
						} else {
							r.push(`${slave.slaveName}'s tank top rests atop the monolithic pregnant belly bulging from ${his} overwhelmed fatigues, leaving ${him} looking like someone preparing to give birth to a regiment of soldiers.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s tank top rests atop the titanic implant-filled belly bulging from ${his} fatigues, which are left unfastened to give ${his} overfilled implant the space it needs to hang heavily. ${He} clearly found it more productive to battle ${his} enemies in the bedroom than in the field.`);
						} else {
							r.push(`${slave.slaveName}'s tank top rests atop the titanic pregnant belly bulging from ${his} fatigues, which are left unfastened to give ${his} overfilled womb the space it needs. ${He} clearly found it more productive to battle ${his} enemies in the bedroom than in the field.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s tank top rests atop the gigantic implant-filled belly bulging from ${his} fatigues, which are left unfastened to give ${his} overfilled implant more room. ${He} clearly spent more time in bed than out in the field.`);
						} else {
							r.push(`${slave.slaveName}'s tank top rests atop the gigantic pregnant belly bulging from ${his} fatigues, which are left unfastened to give ${his} overfilled womb more room. ${He} clearly spent more time in bed than out in the field.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s tank top rests atop the massive implant-filled belly bulging from ${his} unfastened fatigues, leaving ${him} looking like someone who fucked all the locals.`);
						} else {
							r.push(`${slave.slaveName}'s tank top rests atop the massive pregnant belly bulging from ${his} unfastened fatigues, leaving ${him} looking like someone who fucked all the locals.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s tank top rests atop the giant implant-filled belly bulging from ${his} unfastened fatigues, leaving it clear who the favorite recruit of the platoon was.`);
						} else {
							r.push(`${slave.slaveName}'s tank top rests atop the giant pregnant belly bulging from ${his} unfastened fatigues, leaving it clear who the favorite recruit of the platoon was.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s tank top rests atop ${his} massively fat belly, leaving it to hang over ${his} fatigues. There is no way ${he} didn't slut ${his} way through basic.`);
					} else if (slave.belly >= 15000 || slave.bellyAccessory === "a huge empathy belly") {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s tank top rests atop the huge pregnant belly bulging from ${his} unfastened fatigues, leaving ${him} looking like someone who had too much fun on shore leave.`);
						} else if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s tank top rests atop the huge implant-filled belly bulging from ${his} unfastened fatigues, leaving ${him} looking like someone who had too much fun on shore leave.`);
						} else {
							r.push(`${slave.slaveName}'s tank top rests atop the huge pregnant belly bulging from ${his} unfastened fatigues, leaving ${him} looking like someone who had too much fun on shore leave.`);
						}
					} else if (slave.belly >= 10000 || slave.bellyAccessory === "a large empathy belly") {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s tank top barely even covers the top of ${his} big pregnant belly, leaving ${him} looking like someone who had too much fun on shore leave.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s tank top barely even covers the top of the hugely swollen belly bulging from ${his} unfastened fatigues, leaving ${him} looking like someone who had too much fun on shore leave.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s tank top barely even covers the top of ${his} big implant-filled belly, leaving ${him} looking like someone who had too much fun on shore leave.`);
						} else {
							r.push(`${slave.slaveName}'s tank top barely even covers the top of ${his} big pregnant belly, leaving ${him} looking like someone who had too much fun on shore leave.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s tank top rests atop ${his} hugely fat belly, leading everyone to believe ${he} sucked ${his} way through basic.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s tank top rests atop ${his} big fat belly, casting doubt on how this recruit passed basic.`);
					} else if (slave.belly >= 5000 || slave.bellyAccessory === "a medium empathy belly") {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s tank top rides up ${his} pregnant belly leaving ${him} looking like someone who had too much fun on shore leave.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s tank top rides up ${his} jiggling ${slave.inflationType}-filled belly leaving ${him} looking like someone who had too much fun on shore leave.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s tank top rides up ${his} implant-filled belly leaving ${him} looking like someone who had too much fun on shore leave.`);
						} else {
							r.push(`${slave.slaveName}'s tank top rides up ${his} pregnant belly leaving ${him} looking like someone who had too much fun on shore leave.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s tank top rests atop ${his} fat belly, leaving everyone wondering how this recruit passed basic.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s tank top covers the top of ${his} small pregnant belly leaving ${him} looking like someone who had too much fun on shore leave.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s tank top covers the top of ${his} ${slave.inflationType}-swollen belly leaving ${him} looking like someone who had too much fun on shore leave.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s tank top covers the top of ${his} implant-rounded belly leaving ${him} looking like someone who had too much fun on shore leave.`);
						} else {
							r.push(`${slave.slaveName}'s tank top covers the top of ${his} growing belly leaving ${him} looking like someone who had too much fun on shore leave.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s tank top covers the top of ${his} chubby belly leaving ${him} looking like someone who had has been lazy lately.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s fatigue pants are a little tight around ${his} middle.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s tank top exposes ${his} belly, clearly displaying a fitting six pack.`);
					}
					break;
				case "a halter top dress":
					if (slave.belly >= 1000000) {
					// WIP//
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s beautiful halter top dress is specially designed to flatter the massively gravid, even if they are just pretending. Its material tightly clings to ${his} monolithic implant-filled belly while offering a diamond window to display ${his} popped navel and a massive expanse of skin around it.`);
						} else {
							r.push(`${slave.slaveName}'s beautiful halter top dress is specially designed to flatter the hugely gravid. Its material tightly clings to the bulges of life within ${his} monolithic pregnant belly while offering a diamond window to display ${his} popped navel and the expanse of skin around it, which is now held in place by several of ${his} brood also stuck protruding through the gap.`);
						}
					} else if (slave.bellyPreg >= 600000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s beautiful halter top dress is specially designed to flatter the massively gravid, even if they are just pretending. Its material tightly clings to ${his} titanic implant-filled belly while offering a diamond window to display ${his} popped navel and an expanse of skin around it.`);
						} else {
							r.push(`${slave.slaveName}'s beautiful halter top dress is specially designed to flatter the hugely gravid. Its material tightly clings to the bulges of life within ${his} titanic pregnant belly while offering a diamond window to display ${his} popped navel and the expanse of skin around it, which, given how overfilled ${he} is, is constantly drifting off-center thanks to ${his} rowdy brood.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s beautiful halter top dress is specially designed to flatter the massively gravid, even if they are just pretending. Its material tightly clings to ${his} gigantic implant-filled belly while offering a diamond window to display ${his} popped navel and an expanse of skin around it.`);
						} else {
							r.push(`${slave.slaveName}'s beautiful halter top dress is specially designed to flatter the hugely gravid. Its material tightly clings to ${his} gigantic pregnant belly while offering a diamond window to display ${his} popped navel and an expanse of skin around it, which tends to drift with the movements of ${his} brood.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s beautiful halter top dress is specially designed to flatter the hugely gravid, even if they are just pretending. Its material tightly clings to ${his} massive implant-filled belly while offering a diamond window to display ${his} popped navel and an expanse of skin around it.`);
						} else {
							r.push(`${slave.slaveName}'s beautiful halter top dress is specially designed to flatter the hugely gravid. Its material tightly clings to ${his} massive pregnant belly while offering a diamond window to display ${his} popped navel and an expanse of skin around it.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s beautiful halter top dress is specially designed to flatter the hugely gravid, even if they are just pretending. Its material tightly hugs ${his} giant implant-filled belly while offering a diamond window to display ${his} popped navel and surrounding skin.`);
						} else {
							r.push(`${slave.slaveName}'s beautiful halter top dress is specially designed to flatter the hugely gravid. Its material tightly hugs ${his} giant pregnant belly while offering a diamond window to display ${his} popped navel and surrounding skin.`);
						}
					} else if (slave.belly >= 30000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s beautiful halter top dress is specially designed to flatter the hugely gravid, even if they are just pretending. Its material tightly hugs ${his} huge implant-filled belly while offering a diamond window to display ${his} popped navel.`);
						} else {
							r.push(`${slave.slaveName}'s beautiful halter top dress is specially designed to flatter the hugely gravid. Its material tightly hugs ${his} huge pregnant belly while offering a diamond window to display ${his} popped navel.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s beautiful halter top dress is strained by ${his} massively fat belly. Every crease, fold, roll and motion is clearly visible within it. Its seams strain to hold back the tide of flesh pushing against them.`);
					} else if (slave.belly >= 15000 || slave.bellyAccessory === "a huge empathy belly") {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s beautiful halter top dress is strained by ${his} huge pregnant belly. ${His} popped navel prominently pokes through its front.`);
						} else if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s beautiful halter top dress is strained by ${his} huge implant-filled belly. ${His} popped navel prominently pokes through its front.`);
						} else {
							r.push(`${slave.slaveName}'s beautiful halter top dress is strained by ${his} huge pregnant belly. ${His} popped navel prominently pokes through its front.`);
						}
					} else if (slave.belly >= 10000 || slave.bellyAccessory === "a large empathy belly") {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s beautiful halter top dress is filled by ${his} big pregnant belly. ${His} popped navel prominently pokes through its front.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s beautiful halter top dress bulges obscenely with ${his} hugely swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s beautiful halter top dress is filled by ${his} big implant-filled belly. ${His} popped navel prominently pokes through its front.`);
						} else {
							r.push(`${slave.slaveName}'s beautiful halter top dress is filled by ${his} big pregnant belly. ${His} popped navel prominently pokes through its front.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s beautiful halter top dress is filled by ${his} hugely fat belly. Every crease, fold, roll and motion is clearly visible within it.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s beautiful halter top dress is filled by ${his} big fat belly. Every crease, fold and roll is clearly visible within it.`);
					} else if (slave.belly >= 5000 || slave.bellyAccessory === "a medium empathy belly") {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s beautiful halter top dress is filled by ${his} pregnant belly. ${His} popped navel prominently pokes through the front of ${his} dress.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s beautiful halter top dress bulges with ${his} jiggling ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s beautiful halter top dress is filled by ${his} implant-filled belly. ${His} popped navel prominently pokes through the front of ${his} dress.`);
						} else {
							r.push(`${slave.slaveName}'s beautiful halter top dress is filled by ${his} pregnant belly. ${His} popped navel prominently pokes through the front of ${his} dress.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s beautiful halter top dress is filled by ${his} fat belly. Every crease, fold and roll is clearly visible within it.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s beautiful halter top dress is filled out by ${his} small pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s beautiful halter top dress bulges with ${his} ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s beautiful halter top dress is filled out by ${his} implant-rounded belly.`);
						} else {
							r.push(`${slave.slaveName}'s beautiful halter top dress is filled out by ${his} growing belly.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s beautiful halter top dress is filled by ${his} chubby belly. Every crease, fold and roll is clearly visible within it.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s beautiful halter top dress bulges slightly with the swell of ${his} lower belly.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s beautiful halter top dress hugs ${his} ripped abs, clearly displaying the six pack beneath.`);
					}
					break;
				case "an evening dress":
					if (slave.belly >= 1000000) {
					// WIP//
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s sensual evening dress is specially designed to flatter the massively gravid, even if they are just pretending. Its material tightly clings to ${his} monolithic implant-filled belly while offering a diamond window to display ${his} popped navel and a massive expanse of skin around it.`);
						} else {
							r.push(`${slave.slaveName}'s sensual evening dress is specially designed to flatter the hugely gravid. Its material tightly clings to the bulges of life within ${his} monolithic pregnant belly while offering a diamond window to display ${his} popped navel and the expanse of skin around it, which is now held in place by several of ${his} brood also stuck protruding through the gap.`);
						}
					} else if (slave.bellyPreg >= 600000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s sensual evening dress is specially designed to flatter the massively gravid, even if they are just pretending. Its material tightly clings to ${his} titanic implant-filled belly while offering a diamond window to display ${his} popped navel and an expanse of skin around it.`);
						} else {
							r.push(`${slave.slaveName}'s sensual evening dress is specially designed to flatter the hugely gravid. Its material tightly clings to the bulges of life within ${his} titanic pregnant belly while offering a diamond window to display ${his} popped navel and the expanse of skin around it, which, given how overfilled ${he} is, is constantly drifting off-center thanks to ${his} rowdy brood.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s sensual evening dress is specially designed to flatter the massively gravid, even if they are just pretending. Its material tightly clings to ${his} gigantic implant-filled belly while offering a diamond window to display ${his} popped navel and an expanse of skin around it.`);
						} else {
							r.push(`${slave.slaveName}'s sensual evening dress is specially designed to flatter the hugely gravid. Its material tightly clings to ${his} gigantic pregnant belly while offering a diamond window to display ${his} popped navel and an expanse of skin around it, which tends to drift with the movements of ${his} brood.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s sensual evening dress is specially designed to flatter the hugely gravid, even if they are just pretending. Its material tightly clings to ${his} massive implant-filled belly while offering a diamond window to display ${his} popped navel and an expanse of skin around it.`);
						} else {
							r.push(`${slave.slaveName}'s sensual evening dress is specially designed to flatter the hugely gravid. Its material tightly clings to ${his} massive pregnant belly while offering a diamond window to display ${his} popped navel and an expanse of skin around it.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s sensual evening dress is specially designed to flatter the hugely gravid, even if they are just pretending. Its material tightly hugs ${his} giant implant-filled belly while offering a diamond window to display ${his} popped navel and surrounding skin.`);
						} else {
							r.push(`${slave.slaveName}'s sensual evening dress is specially designed to flatter the hugely gravid. Its material tightly hugs ${his} giant pregnant belly while offering a diamond window to display ${his} popped navel and surrounding skin.`);
						}
					} else if (slave.belly >= 30000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s sensual evening dress is specially designed to flatter the hugely gravid, even if they are just pretending. Its material tightly hugs ${his} huge implant-filled belly while offering a diamond window to display ${his} popped navel.`);
						} else {
							r.push(`${slave.slaveName}'s sensual evening dress is specially designed to flatter the hugely gravid. Its material tightly hugs ${his} huge pregnant belly while offering a diamond window to display ${his} popped navel.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s sensual evening dress is strained by ${his} massively fat belly. Every crease, fold, roll and motion is clearly visible within it. Its seams strain to hold back the tide of flesh pushing against them.`);
					} else if (slave.belly >= 15000 || slave.bellyAccessory === "a huge empathy belly") {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s sensual evening dress is strained by ${his} huge pregnant belly. ${His} popped navel prominently pokes through its front.`);
						} else if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s sensual evening dress is strained by ${his} huge implant-filled belly. ${His} popped navel prominently pokes through its front.`);
						} else {
							r.push(`${slave.slaveName}'s sensual evening dress is strained by ${his} huge pregnant belly. ${His} popped navel prominently pokes through its front.`);
						}
					} else if (slave.belly >= 10000 || slave.bellyAccessory === "a large empathy belly") {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s sensual evening dress is filled by ${his} big pregnant belly. ${His} popped navel prominently pokes through its front.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s sensual evening dress bulges obscenely with ${his} hugely swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s sensual evening dress is filled by ${his} big implant-filled belly. ${His} popped navel prominently pokes through its front.`);
						} else {
							r.push(`${slave.slaveName}'s sensual evening dress is filled by ${his} big pregnant belly. ${His} popped navel prominently pokes through its front.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s sensual evening dress is filled by ${his} hugely fat belly. Every crease, fold, roll and motion is clearly visible within it.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s sensual evening dress is filled by ${his} big fat belly. Every crease, fold and roll is clearly visible within it.`);
					} else if (slave.belly >= 5000 || slave.bellyAccessory === "a medium empathy belly") {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s sensual evening dress is filled by ${his} pregnant belly. ${His} popped navel prominently pokes through the front of ${his} dress.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s sensual evening dress bulges with ${his} jiggling ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s sensual evening dress is filled by ${his} implant-filled belly. ${His} popped navel prominently pokes through the front of ${his} dress.`);
						} else {
							r.push(`${slave.slaveName}'s sensual evening dress is filled by ${his} pregnant belly. ${His} popped navel prominently pokes through the front of ${his} dress.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s sensual evening dress is filled by ${his} fat belly. Every crease, fold and roll is clearly visible within it.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s sensual evening dress is filled out by ${his} small pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s sensual evening dress bulges with ${his} ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s sensual evening dress is filled out by ${his} implant-rounded belly.`);
						} else {
							r.push(`${slave.slaveName}'s sensual evening dress is filled out by ${his} growing belly.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s sensual evening dress is filled by ${his} chubby belly. Every crease, fold and roll is clearly visible within it.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s sensual evening dress bulges slightly with the swell of ${his} lower belly.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s sensual evening dress hugs ${his} ripped abs, clearly displaying the six pack beneath.`);
					}
					break;
				case "a ball gown":
					if (slave.belly >= 1000000) {
					// WIP//
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s fabulous silken ball gown has been retailored around ${his} monolithic, ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s fabulous silken ball gown has been retailored around ${his} monolithic, implant-filled belly to both embrace ${his} immensity and to be sure all eyes are locked to it.`);
						} else {
							r.push(`${slave.slaveName}'s fabulous silken ball gown has been retailored around ${his} monolithic pregnant belly to both embrace ${his} immensity and to make it abundantly clear just how filled with life ${he} truly is.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s fabulous silken ball gown has been retailored to expose ${his} titanic implant-filled belly while giving it the attention it demands.`);
						} else {
							r.push(`${slave.slaveName}'s fabulous silken ball gown has been retailored to expose ${his} titanic pregnant belly while drawing attention away from just how overfilled ${he} is.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s fabulous silken ball gown has been retailored to expose ${his} gigantic implant-filled belly while still maintaining its beauty.`);
						} else {
							r.push(`${slave.slaveName}'s fabulous silken ball gown has been retailored to expose ${his} gigantic pregnant belly while still maintaining its beauty.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s fabulous silken ball gown is tailored to embrace a bulging middle, but ${his} massive implant-filled belly pushes it to its limit. It strains as it tightly hugs the sizeable mass extending from ${his} front.`);
						} else {
							r.push(`${slave.slaveName}'s fabulous silken ball gown is tailored to embrace a hugely gravid ${girl}, but ${his} massive pregnancy pushes it to its limit. It strains as it tightly hugs ${his} sizeable baby bump and clearly shows each and every kick and squirm happening inside ${him}.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s fabulous silken ball gown is tailored to not only embrace ${his} giant implant-filled belly, but draw attention to its sheer size.`);
						} else {
							r.push(`${slave.slaveName}'s fabulous silken ball gown is tailored to not only embrace ${his} giant pregnant belly, but draw attention to its size, shape and subtle motions.`);
						}
					} else if (slave.belly >= 30000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s fabulous silken ball gown is tailored to not only embrace ${his} huge implant-filled belly, but draw attention to its size and shape.`);
						} else {
							r.push(`${slave.slaveName}'s fabulous silken ball gown is tailored to not only embrace ${his} huge pregnant belly, but draw attention to its size and shape.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s fabulous silken ball gown, while tailored, strains to contain ${his} massively fat belly, but still draws attention to it and all its subtle curves and motions.`);
					} else if (slave.belly >= 15000 || slave.bellyAccessory === "a huge empathy belly") {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s fabulous silken ball gown is tailored to not only fit ${his} huge pregnant belly, but draw attention to it.`);
						} else if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s fabulous silken ball gown is tailored to not only fit ${his} huge implant-filled belly, but draw attention to it.`);
						} else {
							r.push(`${slave.slaveName}'s fabulous silken ball gown is tailored to not only fit ${his} huge pregnant belly, but draw attention to it.`);
						}
					} else if (slave.belly >= 10000 || slave.bellyAccessory === "a large empathy belly") {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s fabulous silken ball gown is tailored to not only fit ${his} big pregnant belly, but draw attention to it.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s fabulous silken ball gown is tailored to not only fit ${his} hugely swollen belly, but draw attention to it.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s fabulous silken ball gown is tailored to not only fit ${his} big implant-filled belly, but draw attention to it.`);
						} else {
							r.push(`${slave.slaveName}'s fabulous silken ball gown is tailored to not only fit ${his} big pregnant belly, but draw attention to it.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s fabulous silken ball gown is tailored to not only fit ${his} hugely fat belly but draw attention to it and all its subtle curves and motions.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s fabulous silken ball gown is tailored to not only fit ${his} big fat belly but draw attention to it and all its subtle curves.`);
					} else if (slave.belly >= 5000 || slave.bellyAccessory === "a medium empathy belly") {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s fabulous silken ball gown is tailored to not only fit ${his} pregnant belly but draw attention to it.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s fabulous silken ball gown is tailored to not only fit ${his} jiggling ${slave.inflationType}-filled belly but draw attention to it.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s fabulous silken ball gown is tailored to not only fit ${his} implant-filled belly but draw attention to it.`);
						} else {
							r.push(`${slave.slaveName}'s fabulous silken ball gown is tailored to not only fit ${his} pregnant belly but draw attention to it.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s fabulous silken ball gown is tailored to not only fit ${his} fat belly but draw attention to it.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s fabulous silken ball gown is tailored to draw attention to ${his} small pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s fabulous silken ball gown is tailored to draw attention to ${his} ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s fabulous silken ball gown is tailored to draw attention to ${his} rounded middle.`);
						} else {
							r.push(`${slave.slaveName}'s fabulous silken ball gown is tailored to draw attention to ${his} growing pregnancy.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s fabulous silken ball gown is tailored to draw attention to ${his} chubby belly.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s fabulous silken ball gown is tailored to embrace the slight swell beneath ${his} navel.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s fabulous silken ball gown is tailored to draw attention to ${his} ripped abs.`);
					}
					break;
				case "slutty jewelry":
					if (slave.belly >= 1000000) {
					// WIP//
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s bangles are linked by a long golden chain to a ring around ${his} popped out belly button. The chain tinkles metallically as it shifts with ${his} jiggling ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s bangles are linked by a dozen long golden chains to a ring around ${his} popped out belly button. The chains tinkle metallically as they shift with ${his} movements.`);
						} else {
							r.push(`${slave.slaveName}'s bangles are linked by a dozen long golden chains to a ring around ${his} popped out belly button. The chains tinkle metallically as the outer most members of ${his} brood move in the tight confines of ${his} womb.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s bangles are linked by a dozen long golden chains to a ring around ${his} popped out belly button. The chains tinkle metallically as they shift with ${his} movements.`);
						} else {
							r.push(`${slave.slaveName}'s bangles are linked by a dozen long golden chains to a ring around ${his} popped out belly button. The chains tinkle metallically as they are shifted constantly by ${his} squirming brood.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s bangles are linked by several long golden chains to a ring around ${his} popped out belly button. The chains tinkle metallically as they shift with ${his} movements.`);
						} else {
							r.push(`${slave.slaveName}'s bangles are linked by several long golden chains to a ring around ${his} popped out belly button. The chains tinkle metallically as they are shifted by ${his} squirming babies.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s bangles are linked by a long golden chain to a ring around ${his} popped out belly button. The chain tinkles metallically as it shifts with ${his} movements.`);
						} else {
							r.push(`${slave.slaveName}'s bangles are linked by a long golden chain to a ring around ${his} popped out belly button. The chain tinkles metallically as it shifts with ${his} movements.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s bangles include several long thin chains that drape across ${his} giant implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s bangles include several long thin chains that drape across ${his} giant pregnant belly.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s bangles include multiple long, thin chains running through ${his} deep fat folds to ${his} navel. They struggle to avoid being swallowed up by ${his} massively fat belly.`);
					} else if (slave.belly >= 15000 || slave.bellyAccessory === "a huge empathy belly") {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s bangles include several long thin chains that drape across ${his} huge pregnant belly.`);
						} else if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s bangles include several long thin chains that drape across ${his} huge implant-filled belly.`);
						} else {
							r.push(`${slave.slaveName}'s bangles include several long thin chains that drape across ${his} huge pregnant belly.`);
						}
					} else if (slave.belly >= 10000 || slave.bellyAccessory === "a large empathy belly") {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s bangles include a long thin chain that rests above ${his} popped navel.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s bangles include a long thin chain that frequently bounces along with ${his} jiggling ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s bangles include a long thin chain that rests above ${his} popped navel.`);
						} else {
							r.push(`${slave.slaveName}'s bangles include a long thin chain that rests over ${his} hugely swollen belly.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s bangles include multiple long, thin chains running through ${his} deep fat folds to ${his} navel.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s bangles include long, thin chains running through ${his} fat folds.`);
					} else if (slave.belly >= 5000 || slave.bellyAccessory === "a medium empathy belly") {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s bangles include a long thin chain that rests above ${his} popped navel.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s bangles include a long thin chain that frequently bounces along with ${his} jiggling ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s bangles include a long thin chain that rests above ${his} popped navel.`);
						} else {
							r.push(`${slave.slaveName}'s bangles include a long thin chain that rests above ${his} popped navel.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s bangles include long, thin chains running along ${his} fat folds.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s bangles include a long thin chain that rests across ${his} small pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s bangles include a long thin chain that rests across ${his} ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s bangles include a long thin chain that rests across ${his} implant-rounded belly.`);
						} else {
							r.push(`${slave.slaveName}'s bangles include a long thin chain that rests across ${his} growing belly.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s bangles include a long thin chain that rests across ${his} chubby belly, just over ${his} forming rolls.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s bangles include a long thin chain that rests across the small swell of ${his} lower belly.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s bangles include a trio of long, thin chains that run across each set of ${his} ab muscles.`);
					}
					break;
				case "a leotard":
					if (slave.belly >= 1000000) {
					// WIP//
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s tight leotard has exploded at the front, showing off ${his} monolithic, ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s specially tailored leotard is stretched to its absolute limit trying to contain the swell of ${his} monolithic implant-filled belly, tightly clinging to what it can cover and prominently displaying ${his} popped navel. The sides of ${his} gravidity are completely exposed by the overwhelmed garment, and the sheer size of ${his} bulging middle threatens to pull the thin spandex away from ${his} crotch.`);
						} else {
							r.push(`${slave.slaveName}'s specially tailored leotard is stretched to its absolute limit trying to contain the swell of ${his} monolithic pregnant belly. The material tightly clings to what it can cover, prominently displaying ${his} popped navel, the prominent bulges of the children filling ${his} womb, and each twitch they make. The bulging sides of ${his} gravidity are completely exposed by the overwhelmed garment, and the sheer size of ${his} overfilled middle would threaten to pull the spandex away from ${his} crotch had it not already hidden it itself.`);
						}
					} else if (slave.bellyPreg >= 600000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s specially tailored leotard can barely contain the curve of ${his} titanic implant-filled belly, clearly displaying ${his} popped navel. The material tightly clings to the center of ${his} gravidity, leaving ${his} sides completely exposed.`);
						} else {
							r.push(`${slave.slaveName}'s specially tailored leotard can barely contain the curve of ${his} titanic pregnant belly, displaying every kick and squirm within it. The material tightly clings to ${his} popped navel and bulges of ${his} unborn children, but only covers the center of ${his} gravidity, leaving ${his} rather lumpy sides completely exposed.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s specially tailored leotard highlights the curvature of ${his} gigantic implant-filled belly. The material tightly clings to ${his} popped navel and shows a lot of skin through the sides.`);
						} else {
							r.push(`${slave.slaveName}'s specially tailored leotard highlights the curvature of ${his} gigantic pregnant belly, while displaying every kick and movement within. The material tightly clings to ${his} popped navel and the numerous faint outlines pushing against ${his} skin while showing a lot of skin through the sides.`);
						}
					} else if (slave.bellyPreg >= 300000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s specially tailored leotard highlights the curvature of ${his} massive implant-filled belly. The material tightly clings to ${his} popped navel and shows a lot of skin through the sides.`);
						} else {
							r.push(`${slave.slaveName}'s specially tailored leotard highlights the curvature of ${his} massive pregnant belly, while displaying every kick and movement within. The material tightly clings to ${his} popped navel and shows a lot of skin through the sides.`);
						}
					} else if (slave.belly >= 150000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s specially tailored leotard highlights the curvature of ${his} giant implant-filled belly. The material tightly clings to ${his} popped navel and now only shows a little skin through the sides.`);
						} else {
							r.push(`${slave.slaveName}'s specially tailored leotard highlights the curvature of ${his} giant pregnant belly, displaying every kick and movement within. The material tightly clings to ${his} popped navel while now only showing a little skin through the sides.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s leotard is stretched to its absolute limit trying to contain the swell of ${his} giant implant-filled belly, tightly clinging to what it can cover and prominently displaying ${his} popped navel. The sides of ${his} gravidity are completely exposed by the overwhelmed garment, and the sheer size of ${his} bulging middle threatens to pull the thin spandex away from ${his} crotch.`);
						} else {
							r.push(`${slave.slaveName}'s leotard is stretched to its absolute limit trying to contain the swell of ${his} giant pregnant belly. The material tightly clings to what it can cover, prominently displaying ${his} popped navel and every kick and squirm beneath it. The sides of ${his} gravidity are completely exposed by the overwhelmed garment, and the sheer size of ${his} bulging middle threatens to pull the thin spandex away from ${his} crotch.`);
						}
					} else if (slave.belly >= 30000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s tight leotard can barely contain the curve of ${his} huge implant-filled belly, clearly displaying ${his} popped navel. The material tightly clings to the center of ${his} gravidity, leaving ${his} sides completely exposed.`);
						} else {
							r.push(`${slave.slaveName}'s tight leotard can barely contain the curve of ${his} huge pregnant belly, displaying every kick and squirm within it. The material tightly clings to ${his} popped navel, but only covers the center of ${his} gravidity, leaving ${his} sides completely exposed.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s tight leotard shows off every wiggle and jiggle within ${his} massively fat belly. The material tightly clings to ${his} soft mass, forming a deep cleft in what little it can actually cover, while the rest is allowed to freely spill out its sides.`);
					} else if (slave.belly >= 15000 || slave.bellyAccessory === "a huge empathy belly") {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s tight leotard highlights the curvature of ${his} huge pregnant belly. The material tightly clings to ${his} popped navel and shows a lot of skin through the sides.`);
						} else if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s tight leotard highlights the curvature of ${his} huge implant-filled belly. The material tightly clings to ${his} popped navel and shows a lot of skin through the sides.`);
						} else {
							r.push(`${slave.slaveName}'s tight leotard highlights the curvature of ${his} huge pregnant belly, while displaying every kick and movement within. The material tightly clings to ${his} popped navel and shows a lot of skin through the sides.`);
						}
					} else if (slave.belly >= 10000 || slave.bellyAccessory === "a large empathy belly") {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s tight leotard highlights the curvature of ${his} big pregnant belly. The material tightly clings to ${his} popped navel and shows a lot of skin through the sides.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s tight leotard pushes uncomfortably against ${his} hugely swollen belly, forcing a large amount of it out the sides of the garment.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s tight leotard highlights the curvature of ${his} big implant-filled belly. The material tightly clings to ${his} popped navel and shows a lot of skin through the sides.`);
						} else {
							r.push(`${slave.slaveName}'s tight leotard highlights the curvature of ${his} big pregnant belly, while displaying every kick and movement within. The material tightly clings to ${his} popped navel and shows a lot of skin through the sides.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s tight leotard tightly clings to ${his} hugely fat belly, clearly displaying every fold, roll and motion in what little of its mass it actually holds.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s tight leotard tightly clings to ${his} big fat belly, clearly displaying every fold and roll as it spills out its sides.`);
					} else if (slave.belly >= 5000 || slave.bellyAccessory === "a medium empathy belly") {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s tight leotard shows off the curvature of ${his} pregnant belly. The material tightly clings to ${his} popped navel while revealing a hint of skin through the widening gaps.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s tight leotard hugs ${his} jiggling ${slave.inflationType}-filled belly, forcing it to be a little flatter than it would be.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s tight leotard shows off the curvature of ${his} implant-filled belly. The material tightly clings to ${his} popped navel while revealing a hint of skin through the widening gaps.`);
						} else {
							r.push(`${slave.slaveName}'s tight leotard shows off the curvature of ${his} pregnant belly, displaying every kick and movement within. The material tightly clings to ${his} popped navel while revealing a hint of skin through the widening gaps.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s tight leotard tightly clings to ${his} fat belly, clearly displaying every fold and roll as it spills out its sides.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s tight leotard bulges with ${his} small pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s tight leotard bulges with ${his} ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s tight leotard bulges with ${his} implant-rounded belly.`);
						} else {
							r.push(`${slave.slaveName}'s tight leotard bulges with ${his} growing belly.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s tight leotard clings to ${his} chubby belly, clearly displaying every fold and roll.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s tight leotard clings to ${his} belly, clearly displaying the slight swell beneath ${his} navel.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s tight leotard hugs ${his} ripped abs, clearly displaying every powerful motion they make.`);
					}
					break;
				case "a cybersuit":
					if (slave.belly >= 1000000) {
					// WIP//
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s tight bodysuit somehow manages to barely stretch over ${his} monolithic, ${slave.inflationType}-filled belly, pulled taut over ${his} pressure flattened navel.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s tight bodysuit somehow manages to barely stretch over ${his} monolithic, implant-filled belly, pulled taut over ${his} pressure flattened navel.`);
						} else {
							r.push(`${slave.slaveName}'s tight bodysuit somehow manages to barely stretch over ${his} monolithic pregnant belly, pulled taut over ${his} pressure flattened navel, yet bulging with the many squirming children filling ${him}.`);
						}
					} else if (slave.bellyPreg >= 600000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s tight bodysuit stretches across ${his} titanic implant-filled belly and draws the eye right to the small bump on its smooth surface, ${his} flattening navel.`);
						} else {
							r.push(`${slave.slaveName}'s tight bodysuit stretches across ${his} titanic pregnant belly, drawing the eye to ${his} flattening navel and the squirming bulges of the life filling ${him}.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s tight bodysuit stretches across ${his} gigantic implant-filled belly and draws the eye right to the deminishing bump on its smooth surface, ${his} navel.`);
						} else {
							r.push(`${slave.slaveName}'s tight bodysuit stretches across ${his} gigantic pregnant belly, drawing the eye to ${his} protruding navel and the squirming outlines of the life within ${him}.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s tight bodysuit stretches over ${his} massive implant-filled belly and draws the eye right to the sole bump on its smooth surface, ${his} navel.`);
						} else {
							r.push(`${slave.slaveName}'s tight bodysuit stretches over ${his} massive pregnant belly and draws the eye right to each and every bump that appears on its smooth surface.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s tight bodysuit stretches over ${his} giant implant-filled belly and draws the eye right to ${his} protruding navel.`);
						} else {
							r.push(`${slave.slaveName}'s tight bodysuit stretches over ${his} giant pregnant belly, drawing the eye to ${his} protruding navel and clearly showing every kick and squirm inside ${his} bulging middle.`);
						}
					} else if (slave.belly >= 60000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s tight bodysuit stretches over ${his} huge implant-filled belly and draws the eye right to ${his} protruding navel.`);
						} else {
							r.push(`${slave.slaveName}'s tight bodysuit stretches over ${his} huge pregnant belly, drawing the eye to ${his} protruding navel and clearly showing every kick and squirm inside ${his} bulging middle.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s tight bodysuit shows off every wiggle and jiggle within ${his} massively fat belly.`);
					} else if (slave.belly >= 15000 || slave.bellyAccessory === "a huge empathy belly") {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s tight bodysuit shows off the curvature of ${his} huge pregnant belly.`);
						} else if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s tight bodysuit clings to ${his} huge implant-filled belly, prominently displaying ${his} popped navel.`);
						} else {
							r.push(`${slave.slaveName}'s tight bodysuit clings to ${his} huge pregnant belly, displaying ${his} popped navel and any movement ${his} bab${slave.pregType > 1 ? "ies make" : "y makes"}.`);
						}
					} else if (slave.belly >= 10000 || slave.bellyAccessory === "a large empathy belly") {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s tight bodysuit shows off the curvature of ${his} big pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s tight bodysuit clings to ${his} hugely swollen belly, displaying ${his} bloated figure and every jiggle of ${his} full stomach.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s tight bodysuit clings to ${his} big implant-filled belly, prominently displaying ${his} popped navel.`);
						} else {
							r.push(`${slave.slaveName}'s tight bodysuit shows off every kick and movement within ${his} big pregnant belly.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s tight bodysuit tightly clings to ${his} hugely fat belly, clearly displaying every fold, roll and motion in its mass.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s tight bodysuit tightly clings to ${his} big fat belly, clearly displaying every fold and roll.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s tight bodysuit shows off the curvature of ${his} pregnant belly. The material tightly clings to ${his} popped navel.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s bodysuit tightly clings to ${his} jiggling ${slave.inflationType}-filled belly, displaying ${his} bloating and every motion ${his} contents make.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s bodysuit tightly clings to ${his} implant-filled belly, prominently displaying ${his} popped navel.`);
						} else {
							r.push(`${slave.slaveName}'s tight bodysuit shows off every movement within ${his} pregnant belly. The material tightly clings to ${his} flattening navel.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s tight bodysuit tightly clings to ${his} fat belly, clearly displaying every fold and roll.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s tight bodysuit shows off ${his} small belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s tight bodysuit clings to ${his} ${slave.inflationType}-swollen belly, displaying ${his} bloated body.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s tight bodysuit clings to ${his} implant-rounded belly, displaying ${his} swollen body.`);
						} else {
							r.push(`${slave.slaveName}'s tight bodysuit shows off ${his} growing belly.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s tight bodysuit clings to ${his} chubby belly, clearly displaying every fold and roll.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s tight bodysuit clings to ${his} belly, clearly showing the slight swell beneath ${his} navel.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s tight bodysuit clings to ${his} ripped abs, clearly displaying ${his} six pack.`);
					}
					break;
				case "a tight Imperial bodysuit":
					if (slave.belly >= 1000000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s bodysuit stretches out obscenely on ${his} unfathomable, hyper-swollen, ${slave.inflationType}-filled belly, distending obscenely into a gargantuan, imposing mass of stretched-out flesh under skintight suit.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s bodysuit stretches out obscenely on ${his} unfathomable, hyper-swollen, implant-filled belly, distending obscenely into a gargantuan, enormously swollen mass of stretched-out flesh under skintight suit.`);
						} else {
							r.push(`${slave.slaveName}'s bodysuit stretches out obscenely on ${his} unfathomable, hyper-swollen pregnant belly, distending obscenely into a gargantuan, bulging mass of stretched-out flesh under skintight suit.`);
						}
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s bodysuit somehow manages to barely stretch over ${his} monolithic, ${slave.inflationType}-filled belly, pulled smooth over ${his} pressure flattened navel.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s bodysuit somehow manages to barely stretch over ${his} monolithic, implant-filled belly, pulled smooth over ${his} pressure flattened navel.`);
						} else {
							r.push(`${slave.slaveName}'s bodysuit somehow manages to barely stretch over ${his} monolithic pregnant belly, pulled smooth over ${his} pressure flattened navel and all the movement of ${his} many squirming children.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s bodysuit tightly clings to ${his} titanic ${slave.inflationType}-filled belly underneath the bodysuit, displaying ${his} popped navel through the skintight material.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s bodysuit tightly clings to ${his} titanic implant-filled belly underneath the bodysuit, displaying ${his} popped navel through the skintight material.`);
						} else {
							r.push(`${slave.slaveName}'s bodysuit tightly clings to ${his} titanic bulging pregnant belly, displaying ${his} popped navel and all the movement ${his} squirming babies make.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s bodysuit tightly clings to ${his} massively gravid stomach. It clearly displays ${his} gigantic ${slave.inflationType}-filled belly through the skintight material.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s bodysuit tightly clings to ${his} massively gravid stomach. It clearly displays ${his} gigantic implant-filled belly through the skintight material.`);
						} else {
							r.push(`${slave.slaveName}'s bodysuit tightly clings to ${his} massively gravid stomach. It clearly displays ${his} gigantic pregnant belly through the skintight material.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s bodysuit tightly clings to ${his} hugely gravid stomach. It clearly displays ${his} massive ${slave.inflationType}-filled belly through the skintight material.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s bodysuit tightly clings to ${his} hugely gravid stomach. It clearly displays ${his} massive implant-filled belly through the skintight material.`);
						} else {
							r.push(`${slave.slaveName}'s bodysuit tightly clings to ${his} massive pregnant belly, displaying ${his} popped navel and any movement ${his} babies make.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s bodysuit tightly clings to ${his} hugely gravid stomach. It clearly displays ${his} giant ${slave.inflationType}-filled belly through the skintight material.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s bodysuit tightly clings to ${his} hugely gravid stomach. It clearly displays ${his} giant implant-filled belly through the skintight material.`);
						} else {
							r.push(`${slave.slaveName}'s bodysuit tightly clings to ${his} hugely gravid stomach. It clearly displays ${his} giant pregnant belly through the skintight material.`);
						}
					} else if (slave.belly >= 30000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s bodysuit tightly clings to ${his} gravid stomach. It clearly displays ${his} huge ${slave.inflationType}-filled belly through the skintight material.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s bodysuit tightly clings to ${his} gravid stomach. It clearly displays ${his} huge implant-filled belly through the skintight material.`);
						} else {
							r.push(`${slave.slaveName}'s bodysuit tightly clings to ${his} gravid stomach. It clearly displays ${his} huge pregnant belly through the skintight material.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s bodysuit tightly clings to ${his} massively fat belly, displaying every fold, roll and motion in it.`);
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s bodysuit clearly displays ${his} huge pregnant belly through the skintight material.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s bodysuit clearly displays ${his} huge ${slave.inflationType}-filled belly through the skintight material.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s bodysuit clearly displays ${his} huge implant-filled belly through the skintight material.`);
						} else {
							r.push(`${slave.slaveName}'s bodysuit clearly displays ${his} huge pregnant belly through the skintight material.`);
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s bodysuit clearly displays ${his} big pregnant belly, leaving it looking much shorter than it really is.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s bodysuit barely clings to ${his} hugely swollen belly, leaving it looking much shorter than it really is.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s bodysuit barely clings to ${his} huge implant-filled belly, leaving it looking much shorter than it really is.`);
						} else {
							r.push(`${slave.slaveName}'s bodysuit clearly displays ${his} big pregnant belly, leaving it looking much shorter than it really is.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s bodysuit barely clings to ${his} hugely fat belly, clearly showing all ${his} folds and rolls through the skintight material.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s bodysuit clearly displays ${his} big fat belly, clearly showing all ${his} folds and roll through the skintight material.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s bodysuit clearly displays ${his} pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s bodysuit clearly displays ${his} jiggling ${slave.inflationType}-filled belly through the skintight material.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s bodysuit clearly displays ${his} implant-filled belly through the skintight material.`);
						} else {
							r.push(`${slave.slaveName}'s bodysuit clearly displays ${his} pregnant belly through the skintight material.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s bodysuit clearly displays ${his} fat belly, clearly showing every fold and roll through the skintight material.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s bodysuit clearly displays ${his} small pregnant belly through the skintight material.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s bodysuit clearly displays ${his} ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s bodysuit clearly displays ${his} implant-rounded belly through the skintight material.`);
						} else {
							r.push(`${slave.slaveName}'s bodysuit clearly displays ${his} growing belly through the skintight material.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s bodysuit clearly displays ${his} chubby belly underneath the skintight material.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s bodysuit just barely clearly displays the swell of ${his} belly through the skintight material.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s bodysuit clearly displays every last line of ${his} powerful core, displaying a gorgeously outlined six-pack through the skintight material.`);
					}
					break;
				case "a chattel habit":
					if (slave.belly >= 1000000) {
					// WIP//
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`The strip of cloth running down ${his} front has a diamond-shaped hole for ${his} navel to poke through in the hopes of keeping material from slipping to the side of ${his} monolithic implant-filled belly. Since ${his} navel has begun to pull flat, however, the tension does that job instead.`);
						} else {
							r.push(`The strip of cloth running down ${his} front has a diamond-shaped hole for ${his} navel to poke through in the hopes of keeping material from slipping to the side of ${his} monolithic pregnant belly. Since ${his} navel has begun to pull flat, however, the tension and the many bulges of ${his} unborn brood handle that job instead.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`The strip of cloth running down ${his} front has a diamond-shaped hole for ${his} navel to poke through, keeping the material from slipping to the side of ${his} titanic implant-filled belly, though the tension does a good enough job on its own.`);
						} else {
							r.push(`The strip of cloth running down ${his} front has a diamond-shaped hole for ${his} navel to poke through, keeping the material from slipping to the side of ${his} titanic pregnant belly; it does not stop ${his} brood from trying, however.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`The strip of cloth running down ${his} front has a diamond-shaped hole for ${his} navel to poke through, keeping the material from slipping to the side of ${his} gigantic implant-filled belly, though the tension does a good enough job on its own.`);
						} else {
							r.push(`The strip of cloth running down ${his} front has a diamond-shaped hole for ${his} navel to poke through, keeping the material from slipping to the side of ${his} gigantic pregnant belly; it does not stop ${his} brood from trying, however.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`The strip of cloth running down ${his} front has a diamond-shaped hole for ${his} navel to poke through, keeping the material from slipping to the side of ${his} massive implant-filled belly, though the tension does a good enough job on its own.`);
						} else {
							r.push(`The strip of cloth running down ${his} front has a diamond-shaped hole for ${his} navel to poke through, keeping the material from slipping to the side of ${his} massive pregnant belly; it does not stop ${his} children from trying, however.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`The strip of cloth running down ${his} front has a diamond-shaped hole for ${his} navel to poke through, keeping the material from slipping to the side of ${his} giant implant-filled belly.`);
						} else {
							r.push(`The strip of cloth running down ${his} front has a diamond-shaped hole for ${his} navel to poke through, keeping the material from slipping to the side of ${his} giant pregnant belly; it does not stop ${his} children from trying, however.`);
						}
					} else if (slave.belly >= 30000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`The strip of cloth running down ${his} front has a diamond-shaped hole for ${his} navel to poke through, keeping the material from slipping to the side of ${his} huge implant-filled belly.`);
						} else {
							r.push(`The strip of cloth running down ${his} front has a diamond-shaped hole for ${his} navel to poke through, keeping the material from slipping to the side of ${his} huge pregnant belly.`);
						}
					} else if (slave.weight > 190) {
						r.push(`The strip of cloth running down ${his} front has sunken so deeply into ${his} massively fat belly that is has been swallowed completely. The only hint of its presence is the deep trench of flab spilling around it.`);
					} else if (slave.belly >= 15000 || slave.bellyAccessory === "a huge empathy belly") {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`The strip of cloth running down ${his} front has a diamond-shaped hole for ${his} navel to poke through, keeping the material from slipping to the side of ${his} huge pregnant belly.`);
						} else if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`The strip of cloth running down ${his} front has a diamond-shaped hole for ${his} navel to poke through, keeping the material from slipping to the side of ${his} huge implant-filled belly.`);
						} else {
							r.push(`The strip of cloth running down ${his} front has a diamond-shaped hole for ${his} navel to poke through, keeping the material from slipping to the side of ${his} huge pregnant belly.`);
						}
					} else if (slave.belly >= 10000 || slave.bellyAccessory === "a large empathy belly") {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`The strip of cloth running down ${his} front is parted to one side by ${his} big pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`The strip of cloth running down ${his} front is parted to one side by ${his} hugely swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The strip of cloth running down ${his} front is parted to one side by ${his} big implant-filled belly.`);
						} else {
							r.push(`The strip of cloth running down ${his} front is parted to one side by ${his} big pregnant belly.`);
						}
					} else if (slave.weight > 160) {
						r.push(`The strip of cloth running down ${his} front sinks deeply into ${his} hugely fat belly.`);
					} else if (slave.weight > 130) {
						r.push(`The strip of cloth running down ${his} front is often forced to the side by ${his} big fat belly.`);
					} else if (slave.belly >= 5000 || slave.bellyAccessory === "a medium empathy belly") {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`The strip of cloth running down ${his} front is often forced to the side by ${his} pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`The strip of cloth running down ${his} front is often forced to the side by ${his} jiggling ${slave.inflationType}-filled belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The strip of cloth running down ${his} front is often forced to the side by ${his} implant-filled belly.`);
						} else {
							r.push(`The strip of cloth running down ${his} front is often forced to the side by ${his} pregnant belly.`);
						}
					} else if (slave.weight > 95) {
						r.push(`The strip of cloth running down ${his} front gently sinks into ${his} fat belly.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`The strip of cloth running down ${his} front is pushed out by ${his} small pregnant belly.`);
							r.push(`${slave.slaveName}'s mini dress tightly clings to ${his} small pregnant belly.`);
						} else if (isBellyFluidLargest) {
							r.push(`The strip of cloth running down ${his} front is pushed out by ${his} ${slave.inflationType}-swollen belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`The strip of cloth running down ${his} front is pushed out by ${his} implant-rounded belly.`);
						} else {
							r.push(`The strip of cloth running down ${his} front is pushed out by ${his} growing belly.`);
						}
					} else if (slave.weight > 30) {
						r.push(`The strip of cloth running down ${his} front is pushed out by ${his} chubby belly.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`The strip of cloth running down ${his} front demurely rests over the slight swell below ${his} navel.`);
					} else if (slave.muscles > 30) {
						r.push(`The strip of cloth running down ${his} front prominently displays ${his} ripped abs.`);
					}
					break;
				case "a bunny outfit": // WIP belly overhaul point
					if (slave.belly >= 1000000) {
					// WIP//
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s teddy has burst trying to contain ${his} monolithic, ${slave.inflationType}-filled belly, leaving it hanging out the hole it made.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s teddy is specially designed to accommodate such a ridiculously swollen ${girl} and comes with a gap in the front for ${his} monolithic implant-filled belly to expand out of.`);
						} else {
							r.push(`${slave.slaveName}'s teddy is specially designed to accommodate such a ridiculously gravid ${girl} and comes with a gap in the front for ${his} monolithic pregnant belly to uncontrollably billow out of.`);
						}
					} else if (slave.bellyPreg >= 600000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s teddy is specially designed to accommodate such an absurdly swollen ${girl} and comes with a gap in the front for ${his} titanic implant-filled belly to bulge through.`);
						} else {
							r.push(`${slave.slaveName}'s teddy is specially designed to accommodate such an absurdly gravid ${girl} and comes with a gap in the front for ${his} titanic pregnant belly to spill out of.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s teddy is specially designed to accommodate such a massively swollen ${girl} and comes with a gap in the front for ${his} gigantic implant-filled belly to bulge through.`);
						} else {
							r.push(`${slave.slaveName}'s teddy is specially designed to accommodate such a massively gravid ${girl} and comes with a gap in the front for ${his} gigantic pregnant belly to bulge through.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s teddy is specially designed to accommodate such a hugely swollen ${girl} and comes with a gap in the front for ${his} massive implant-filled belly to bulge through.`);
						} else {
							r.push(`${slave.slaveName}'s teddy is specially designed to accommodate such a hugely gravid ${girl} and comes with a gap in the front for ${his} massive pregnant belly to bulge through.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s teddy is specially designed with a gap in the front for ${his} giant implant-filled belly to bulge through.`);
						} else {
							r.push(`${slave.slaveName}'s teddy is specially designed with a gap in the front for ${his} giant pregnant belly to bulge through.`);
						}
					} else if (slave.belly >= 30000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s teddy is carefully fitted to contain ${his} huge implant-filled belly, but only emphasizes just how large ${he} has gotten.`);
						} else {
							r.push(`${slave.slaveName}'s teddy is carefully fitted to contain ${his} huge pregnant belly, but only emphasizes just how large and ripe ${he} is.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s tailored teddy is strained to capacity by ${his} massively fat belly. ${His} flab juts out around its edges, while the remaining coverage merely draws attention to ${his} folds, rolls and assorted jiggling.`);
					} else if (slave.belly >= 15000 || slave.bellyAccessory === "a huge empathy belly") {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s teddy is filled to its limit by ${his} huge pregnant belly. ${His} popped navel prominently pokes through the taut material.`);
						} else if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s teddy is filled to its limit by ${his} huge implant-filled belly. ${His} popped navel prominently pokes through the taut material.`);
						} else {
							r.push(`${slave.slaveName}'s teddy is filled to its limit by ${his} huge pregnant belly. ${His} popped navel prominently pokes through the taut material.`);
						}
					} else if (slave.belly >= 10000 || slave.bellyAccessory === "a large empathy belly") {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s teddy is filled out by ${his} big pregnant belly. ${His} popped navel prominently pokes through the material.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s teddy is filled with ${his} hugely swollen belly, forcing it to bulge prominently.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s teddy is filled out by ${his} big implant-filled belly. ${His} popped navel prominently pokes through the material.`);
						} else {
							r.push(`${slave.slaveName}'s teddy is filled out by ${his} big pregnant belly. ${His} popped navel prominently pokes through the material.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s tailored teddy is stretched out by ${his} hugely fat belly. It barely contains the mass while drawing attention to ${his} folds, rolls and subtle motions.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName} has recently begun wearing a teddy that can accommodate ${his} big fat belly. It completely contains the mass while drawing attention to ${his} folds and rolls.`);
					} else if (slave.belly >= 5000 || slave.bellyAccessory === "a medium empathy belly") {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s teddy is filled by ${his} pregnant belly. ${His} popped navel prominently pokes through the material.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s teddy is uncomfortably tight around ${his} jiggling ${slave.inflationType}-filled belly, forcing the material to stretch around the sloshing bulge.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s teddy is filled by ${his} implant-filled belly. ${His} popped navel prominently pokes through the material.`);
						} else {
							r.push(`${slave.slaveName}'s teddy is filled by ${his} pregnant belly. ${His} popped navel prominently pokes through the material.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s teddy is stretched out by ${his} fat belly. ${His} flab juts out around its edges and it does nothing to hide ${his} folds and rolls.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s teddy bulges with ${his} small pregnancy.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s teddy bulges with ${his} ${slave.inflationType}-bloated belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s teddy bulges with ${his} implant-rounded belly.`);
						} else {
							r.push(`${slave.slaveName}'s teddy bulges with ${his} growing belly.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s teddy is stretched by ${his} chubby belly. It does nothing to hide ${his} folds and rolls.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s teddy bulges over ${his} lower belly, making ${him} look a little bloated.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s teddy is carefully fitted to highlight ${his} six pack and fully display ${his} ripped abs.`);
					}
					break;
				case "attractive lingerie for a pregnant woman":
					if (slave.belly >= 1000000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s unfathomable, hyper-swollen, ${slave.inflationType}-filled belly completely hides ${his} silken panties. ${His} silken vest sensually frames ${his} belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s unfathomable, hyper-swollen, implant-filled belly completely hides ${his} silken panties and takes full advantage of its lack of restriction to bulge tremendously in every direction. ${His} silken vest sensually frames what little it can of ${his} boundless middle.`);
						} else {
							r.push(`${slave.slaveName}'s unfathomable, hyper-swollen pregnant belly completely hides ${his} silken panties while ${his} silken vest sensually frames what little it can of the bulging mass.`);
						}
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s monolithic ${slave.inflationType}-filled belly completely hides ${his} lacy g-string and takes full advantage of its lack of restriction to bulge tremendously.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s monolithic implant-filled belly completely hides ${his} silken panties and takes full advantage of its lack of restriction to bulge tremendously. ${His} silken vest sensually frames what little it can of ${his} boundless middle.`);
						} else {
							r.push(`${slave.slaveName}'s monolithic pregnant belly completely hides ${his} silken panties while ${his} silken vest sensually frames what little it can of the bulge-coated mass. ${His} exposed middle gives ${his} children the room they so desperately need to keep growing.`);
						}
					} else if (slave.bellyPreg >= 600000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s titanic implant-filled belly completely hides ${his} silken panties and takes full advantage of its lack of restriction to bulge massively. ${His} silken vest sensually frames what little it can of ${his} immense middle.`);
						} else {
							r.push(`${slave.slaveName}'s titanic pregnant belly completely hides ${his} silken panties while ${his} silken vest sensually frames what little it can of the bulging mass. ${His} children greatly appreciate the space granted by ${his} exposed middle and squirm happily in their cramped confines.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s gigantic implant-filled belly completely hides ${his} silken panties and takes full advantage of its freedom to hang heavily. ${His} silken vest sensually frames what little it can of ${his} immense middle.`);
						} else {
							r.push(`${slave.slaveName}'s gigantic pregnant belly completely hides ${his} silken panties while ${his} silken vest sensually frames what little it can. ${His} children appreciate the space granted by ${his} exposed middle.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s massive implant-filled belly completely hides ${his} silken panties and takes full advantage of its freedom to hang heavily. ${His} silken vest sensually frames what it can of ${his} immense middle.`);
						} else {
							r.push(`${slave.slaveName}'s massive pregnant belly completely hides ${his} silken panties and takes full advantage of its freedom to bulge hugely. ${His} silken vest sensually frames what it can of ${his} immense middle.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s giant implant-filled belly completely hides ${his} silken panties and bulges heavily from ${his} body. ${His} silken vest sensually frames ${his} ponderous middle.`);
						} else {
							r.push(`${slave.slaveName}'s giant pregnant belly completely hides ${his} silken panties and bulges heavily from ${his} body. ${His} silken vest sensually frames ${his} ponderous middle.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s massively fat belly completely hides ${his} silken panties. ${His} silken vest struggles to sensually frame ${his} immense, jiggly gut while dwarfed by it.`);
					} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s huge implant-filled belly completely hides ${his} silken panties. ${His} silken vest sensually frames ${his} ponderous stomach.`);
						} else {
							r.push(`${slave.slaveName}'s huge pregnant belly completely hides ${his} silken panties. ${His} silken vest sensually frames ${his} ponderous stomach.`);
						}
					} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s big pregnant belly completely hides ${his} silken panties. ${His} silken vest sensually frames ${his} heavy middle.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s hugely swollen belly completely hides ${his} silken panties. ${His} silken vest sensually frames ${his} heaving stomach.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s huge implant-filled belly completely hides ${his} silken panties. ${His} silken vest sensually frames ${his} heavy stomach.`);
						} else {
							r.push(`${slave.slaveName}'s big pregnant belly completely hides ${his} silken panties. ${His} silken vest sensually frames ${his} heavy middle.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s hugely fat belly hides ${his} silken panties. ${His} silken vest sensually frames ${his} heavy, constantly jiggling gut.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s big fat belly hides ${his} silken panties. ${His} silken vest sensually frames ${his} hefty, jiggling gut.`);
					} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s pregnant belly hides ${his} silken panties. ${His} silken vest sensually frames ${his} heavy middle.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s jiggling ${slave.inflationType}-filled belly hides ${his} silken panties. ${His} silken vest sensually frames ${his} heavy stomach.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s implant-filled belly hides ${his} silken panties. ${His} silken vest sensually frames ${his} heavy stomach.`);
						} else {
							r.push(`${slave.slaveName}'s pregnant belly hides ${his} silken panties. ${His} silken vest sensually frames ${his} heavy middle.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s fat belly is large enough to hide ${his} panties. ${His} silken vest sensually frames ${his} heavy, jiggly gut.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s small pregnant belly rests above ${his} silken panties. ${His} silken vest sensually frames ${his} motherly figure.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s ${slave.inflationType}-swollen belly rests above ${his} silken panties. ${His} silken vest sensually frames ${his} rounded middle.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s implant-rounded belly rests above ${his} silken panties. ${His} silken vest sensually frames ${his} swollen figure.`);
						} else {
							r.push(`${slave.slaveName}'s growing belly rests above ${his} silken panties. ${His} silken vest sensually frames ${his} swelling form.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s chubby belly rests above ${his} silken panties, barely hanging over the top of them. ${His} silken vest sensually frames ${his} soft stomach.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s silken panties rest just beneath the slight swell of ${his} lower belly, but ${his} matching vest draws attention away from it.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s ripped abs are sensually framed by ${his} silken vest.`);
					}
					break;
				case "a maternity dress":
					if (slave.belly >= 1000000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s unfathomable, hyper-swollen, ${slave.inflationType}-filled belly is so large that ${his} dress, despite being designed to flatter pregnancies, is inadequate to contain it due to sheer size. The dress bunches up as it rests atop ${his} belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s unfathomable, hyper-swollen, implant-filled belly is so large that ${his} dress, despite being designed to flatter pregnancies, is inadequate to contain it due to sheer size. The dress bunches up as it rests atop ${his} belly.`);
						} else {
							r.push(`${slave.slaveName}'s unfathomable, hyper-swollen pregnant belly is so large that ${his} dress, despite being designed to flatter pregnancies, is inadequate to contain it due to sheer size. The dress bunches up as it rests atop ${his} squirming belly.`);
						}
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s monolithic, ${slave.inflationType}-filled belly is so large that ${his} dress, despite being designed to flatter pregnancies, is inadequate to contain it due to sheer size. The dress bunches up as it rests atop ${his} belly.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s monolithic, implant-filled belly stretches ${his} once loose dress to its limit. It is specially tailored to be modest yet draw attention to sizeable middles, but ${he} has managed to render it inadequate; ${he} can't actually manage to pull it all the way over ${his} sheer mass. The dress often ends up bunched atop ${his} belly unless someone is kind enough to lend a pair of hands to tug it down the rest of the way.`);
						} else {
							r.push(`${slave.slaveName}'s monolithic pregnant belly stretches ${his} once loose dress to its limit. It is specially tailored to be modest yet flatter pregnancies, but ${he} has managed to render it inadequate; ${he} can't actually manage to pull it all the way over ${his} sheer gravidity. The dress often ends up bunched atop ${his} belly unless someone is kind enough to lend a pair of hands to tug it down the rest of the way.`);
						}
					} else if (slave.belly >= 600000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s titanic implant-filled belly stretches ${his} once loose dress into a more form fitting attire. It is specially tailored to be modest yet draw attention to ${his} abnormally large middle.`);
						} else {
							r.push(`${slave.slaveName}'s titanic pregnant belly stretches ${his} once loose dress into a more form fitting attire, showing off ${his} protruding navel and the many bulges of life filling ${him}. Even at ${his} abnormal size, its special tailoring allows it to retain its modesty.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s gigantic implant-filled belly completely fills ${his} once loose dress. It is specially tailored to be modest yet draw attention to ${his} abnormally large middle.`);
						} else {
							r.push(`${slave.slaveName}'s gigantic pregnant belly completely fills ${his} once loose dress. It is specially tailored to be modest yet draw attention to ${his} abnormal pregnancy.`);
						}
					} else if (slave.belly >= 300000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s massive implant-filled belly fills ${his} once loose dress. It is specially tailored to be modest yet draw attention to ${his} spectacular middle.`);
						} else {
							r.push(`${slave.slaveName}'s massive pregnant belly fills ${his} once loose dress. It is specially tailored to be modest yet draw attention to ${his} spectacular pregnancy.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s giant implant-filled belly fills out ${his} loose dress. It is specially tailored to be modest yet draw attention to ${his} expanded middle.`);
						} else {
							r.push(`${slave.slaveName}'s giant pregnant belly fills out ${his} loose dress. It is specially tailored to be modest yet draw attention to ${his} full pregnancy.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s massively fat belly stretches ${his} loose dress. It is specially tailored to be modest yet draw attention to a growing pregnancy, though it works on massive, jiggly guts all the same.`);
					} else if (slave.belly >= 15000 || slave.bellyAccessory === "a huge empathy belly") {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s huge pregnant belly fills out ${his} loose dress. It is specially tailored to be modest yet draw attention to ${his} pregnancy.`);
						} else if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s huge implant-filled belly fills out ${his} loose dress. It is specially tailored to be modest yet draw attention to ${his} expanded middle.`);
						} else {
							r.push(`${slave.slaveName}'s huge pregnant belly fills out ${his} loose dress. It is specially tailored to be modest yet draw attention to ${his} advanced pregnancy.`);
						}
					} else if (slave.belly >= 10000 || slave.bellyAccessory === "a large empathy belly") {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s big pregnant belly fills out ${his} loose dress. It is specially tailored to be modest yet draw attention to ${his} pregnancy.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s hugely swollen belly fills out ${his} loose dress. It is specially tailored to be modest yet draw attention to ${his} rounded stomach.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s big implant-filled belly fills out ${his} loose dress. It is specially tailored to be modest yet draw attention to ${his} expanded middle.`);
						} else {
							r.push(`${slave.slaveName}'s big pregnant belly fills out ${his} loose dress. It is specially tailored to be modest yet draw attention to ${his} advanced pregnancy.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s hugely fat belly fills out ${his} loose dress. It is specially tailored to be modest yet draw attention to a growing pregnancy, though it works on giant, jiggly guts all the same.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s big fat belly fills out ${his} loose dress. It is specially tailored to be modest yet draw attention to a growing pregnancy, though it works on large, jiggly guts all the same.`);
					} else if (slave.belly >= 5000 || slave.bellyAccessory === "a medium empathy belly") {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s pregnant belly fills out ${his} loose dress. It is specially tailored to be modest yet draw attention to ${his} growing pregnancy.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s jiggling ${slave.inflationType}-filled belly fills out ${his} loose dress. It is specially tailored to be modest yet draw attention to ${his} swollen middle.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s implant-filled belly fills out ${his} loose dress. It is specially tailored to be modest yet draw attention to ${his} rounded middle.`);
						} else {
							r.push(`${slave.slaveName}'s pregnant belly fills out ${his} loose dress. It is specially tailored to be modest yet draw attention to ${his} growing pregnancy.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s fat belly fills out ${his} loose dress. It is specially tailored to be modest yet draw attention to a growing pregnancy, though it works on big, jiggly guts all the same.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s small pregnant belly is noticeable under ${his} loose dress. It is specially tailored to be modest yet draw attention to ${his} pregnancy.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s ${slave.inflationType}-swollen belly is noticeable under ${his} loose dress. It is specially tailored to be modest yet draw attention to ${his} distended stomach.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s implant-rounded belly is noticeable under ${his} loose dress. It is specially tailored to be modest yet draw attention to ${his} swollen middle.`);
						} else {
							r.push(`${slave.slaveName}'s growing belly is noticeable under ${his} loose dress. It is specially tailored to be modest yet draw attention to ${his} early pregnancy.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s chubby belly is noticeable under ${his} loose dress. It is specially tailored to be modest yet draw attention to ${his} pudgy belly.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s loose dress completely hides the slight swell beneath ${his} navel.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s loose dress totally hides ${his} ripped abs.`);
					}
					break;
				case "stretch pants and a crop-top":
					if (slave.belly >= 1000000) {
					// WIP//
					} else if (slave.belly >= 750000) {
						if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s monolithic, ${slave.inflationType}-filled belly takes full advantage of ${his} exposed midriff to hang freely.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s monolithic implant-filled belly takes full advantage of ${his} exposed midriff to bulge tremendously from ${his} body.`);
						} else {
							r.push(`${slave.slaveName}'s monolithic pregnant belly takes full advantage of ${his} exposed midriff to bulge tremendously from ${his} body. ${His} children constantly squirm in an effort to take advantage of reduced restrictions on ${his} body.`);
						}
					} else if (slave.bellyPreg >= 600000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s titanic implant-filled belly takes full advantage of ${his} exposed midriff to hang heavily from ${his} body.`);
						} else {
							r.push(`${slave.slaveName}'s titanic pregnant belly takes full advantage of ${his} exposed midriff to hang heavily from ${his} body. ${His} children greatly appreciate the space granted by ${his} exposed middle and squirm happily in their cramped confines.`);
						}
					} else if (slave.belly >= 450000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s gigantic implant-filled belly takes full advantage of ${his} exposed midriff to hang heavily from ${his} body.`);
						} else {
							r.push(`${slave.slaveName}'s gigantic pregnant belly takes full advantage of ${his} exposed midriff to hang heavily from ${his} body. ${His} children appreciate the lack of restraint around their cramped home.`);
						}
					} else if (slave.bellyPreg >= 300000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s massive implant-filled belly takes full advantage of ${his} exposed midriff to hang heavily from ${his} body.`);
						} else {
							r.push(`${slave.slaveName}'s massive pregnant belly takes full advantage of ${his} exposed midriff to hang heavily from ${his} body, giving ${his} children plenty of room to keep growing.`);
						}
					} else if (slave.belly >= 120000) {
						if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s giant implant-filled belly takes full advantage of ${his} exposed midriff to bulge heavily out from ${his} body while pushing ${his} stretch pants low.`);
						} else {
							r.push(`${slave.slaveName}'s giant pregnant belly takes full advantage of ${his} exposed midriff to bulge heavily out from ${his} body while pushing ${his} stretch pants low.`);
						}
					} else if (slave.weight > 190) {
						r.push(`${slave.slaveName}'s massively fat belly takes full advantage of ${his} exposed midriff to hang and jiggle freely while obscuring ${his} stretch pants.`);
					} else if (slave.belly >= 15000 || slave.bellyAccessory === "a huge empathy belly") {
						if (slave.bellyAccessory === "a huge empathy belly") {
							r.push(`${slave.slaveName}'s huge pregnant belly takes full advantage of ${his} exposed midriff to hang freely and obscure ${his} stretch pants.`);
						} else if (isBellyFluidLargest) {
							// TODO: write me
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s huge implant-filled belly takes full advantage of ${his} exposed midriff to hang freely and obscure ${his} stretch pants.`);
						} else {
							r.push(`${slave.slaveName}'s huge pregnant belly takes full advantage of ${his} exposed midriff to hang freely and obscure ${his} stretch pants.`);
						}
					} else if (slave.belly >= 10000 || slave.bellyAccessory === "a large empathy belly") {
						if (slave.bellyAccessory === "a large empathy belly") {
							r.push(`${slave.slaveName}'s big pregnant belly takes full advantage of ${his} exposed midriff to hang freely and obscure ${his} stretch pants.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s hugely swollen belly takes full advantage of ${his} exposed midriff to bulge freely and obscure ${his} stretch pants.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s big implant-filled belly takes full advantage of ${his} exposed midriff to hang freely and obscure ${his} stretch pants.`);
						} else {
							r.push(`${slave.slaveName}'s big pregnant belly takes full advantage of ${his} exposed midriff to hang freely and obscure ${his} stretch pants.`);
						}
					} else if (slave.weight > 160) {
						r.push(`${slave.slaveName}'s hugely fat belly takes full advantage of ${his} exposed midriff to hang and jiggle freely while obscuring ${his} stretch pants.`);
					} else if (slave.weight > 130) {
						r.push(`${slave.slaveName}'s big fat belly takes full advantage of ${his} exposed midriff to hang freely and obscure ${his} stretch pants.`);
					} else if (slave.belly >= 5000 || slave.bellyAccessory === "a medium empathy belly") {
						if (slave.bellyAccessory === "a medium empathy belly") {
							r.push(`${slave.slaveName}'s pregnant belly takes full advantage of ${his} exposed midriff to bulge freely and slightly obscure ${his} stretch pants.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s jiggling ${slave.inflationType}-filled belly takes full advantage of ${his} exposed midriff to bulge freely and slightly obscure ${his} stretch pants.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s implant-filled belly takes full advantage of ${his} exposed midriff to bulge freely and slightly obscure ${his} stretch pants.`);
						} else {
							r.push(`${slave.slaveName}'s pregnant belly takes full advantage of ${his} exposed midriff to bulge freely and slightly obscure ${his} stretch pants.`);
						}
					} else if (slave.weight > 95) {
						r.push(`${slave.slaveName}'s fat belly takes full advantage of ${his} exposed midriff to hang freely and obscure ${his} stretch pants.`);
					} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
						if (slave.bellyAccessory === "a small empathy belly") {
							r.push(`${slave.slaveName}'s small pregnant belly takes full advantage of ${his} exposed midriff to bulge freely.`);
						} else if (isBellyFluidLargest) {
							r.push(`${slave.slaveName}'s ${slave.inflationType}-swollen belly takes full advantage of ${his} exposed midriff to bulge freely.`);
						} else if (slave.bellyImplant > 0) {
							r.push(`${slave.slaveName}'s implant-rounded belly takes full advantage of ${his} exposed midriff to bulge freely.`);
						} else {
							r.push(`${slave.slaveName}'s growing belly takes full advantage of ${his} exposed midriff to bulge freely.`);
						}
					} else if (slave.weight > 30) {
						r.push(`${slave.slaveName}'s chubby belly takes full advantage of ${his} exposed midriff to hang freely and obscure the top of ${his} stretch pants.`);
					} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
						r.push(`${slave.slaveName}'s stretch pants are fastened just beneath the slight swell of ${his} lower belly, rendering it completely obvious.`);
					} else if (slave.muscles > 30) {
						r.push(`${slave.slaveName}'s ripped abs are prominently displayed for all to see.`);
					}
					break;
				case "spats and a tank top":
					if (slave.boobs > 1200) {
						r.push(`${slave.slaveName}'s top is currently prevented from trying to cover ${his}`);
						if (slave.belly >= 1000000) {
							if (isBellyFluidLargest) {
								r.push(`unfathomable huge, hyper-swollen, ${slave.inflationType}-filled belly`);
							} else if (slave.bellyImplant > 0) {
								r.push(`unfathomable huge, hyper-swollen, implant-filled belly`);
							} else {
								r.push(`unfathomable, hyper-swollen pregnant belly`);
							}
						} else if (slave.belly >= 750000) {
							if (isBellyFluidLargest) {
								r.push(`monolithic ${slave.inflationType}-filled belly`);
							} else if (slave.bellyImplant > 0) {
								r.push(`monolithic implant-filled belly`);
							} else {
								r.push(`monolithic pregnant belly`);
							}
						} else if (slave.bellyPreg >= 600000) {
							if (isBellyFluidLargest) {
								// TODO: write me
							} else if (slave.bellyImplant > 0) {
								r.push(`titanic implant-filled belly`);
							} else {
								r.push(`titanic pregnancy`);
							}
						} else if (slave.bellyPreg >= 450000) {
							if (isBellyFluidLargest) {
								// TODO: write me
							} else if (slave.bellyImplant > 0) {
								r.push(`gigantic implant-filled belly`);
							} else {
								r.push(`gigantic pregnancy`);
							}
						} else if (slave.bellyPreg >= 300000) {
							if (isBellyFluidLargest) {
								// TODO: write me
							} else if (slave.bellyImplant > 0) {
								r.push(`massive implant-filled belly`);
							} else {
								r.push(`massive pregnancy`);
							}
						} else if (slave.belly >= 120000) {
							if (isBellyFluidLargest) {
								// TODO: write me
							} else if (slave.bellyImplant > 0) {
								r.push(`giant implant-filled belly`);
							} else {
								r.push(`giant pregnancy`);
							}
						} else if (slave.belly >= 30000) {
							if (isBellyFluidLargest) {
								// TODO: write me
							} else if (slave.bellyImplant > 0) {
								r.push(`huge implant-filled belly`);
							} else {
								r.push(`huge pregnancy`);
							}
						} else if (slave.weight > 190) {
							r.push(`massively fat belly`);
						} else if (slave.belly >= 15000 || slave.bellyAccessory === "a huge empathy belly") {
							if (slave.bellyAccessory === "a huge empathy belly") {
								r.push(`huge pregnancy`);
							} else if (isBellyFluidLargest) {
								// TODO: write me
							} else if (slave.bellyImplant > 0) {
								r.push(`huge implant-filled belly`);
							} else {
								r.push(`huge pregnancy`);
							}
						} else if (slave.belly >= 10000 || slave.bellyAccessory === "a large empathy belly") {
							if (slave.bellyAccessory === "a large empathy belly") {
								r.push(`big pregnancy`);
							} else if (isBellyFluidLargest) {
								r.push(`hugely swollen belly`);
							} else if (slave.bellyImplant > 0) {
								r.push(`big implant-filled belly`);
							} else {
								r.push(`big pregnancy`);
							}
						} else if (slave.weight > 160) {
							r.push(`hugely fat belly`);
						} else if (slave.weight > 130) {
							r.push(`big fat belly`);
						} else if (slave.belly >= 5000 || slave.bellyAccessory === "a medium empathy belly") {
							if (slave.bellyAccessory === "a medium empathy belly") {
								r.push(`pregnant belly`);
							} else if (isBellyFluidLargest) {
								r.push(`jiggling ${slave.inflationType}-filled belly`);
							} else if (slave.bellyImplant > 0) {
								r.push(`implant-filled belly`);
							} else {
								r.push(`pregnant belly`);
							}
						} else if (slave.weight > 95) {
							r.push(`fat belly`);
						} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
							if (slave.bellyAccessory === "a small empathy belly") {
								r.push(`small pregnant belly`);
							} else if (isBellyFluidLargest) {
								r.push(`${slave.inflationType}-swollen belly`);
							} else if (slave.bellyImplant > 0) {
								r.push(`implant-rounded belly`);
							} else {
								r.push(`growing pregnancy`);
							}
						} else if (slave.weight > 30) {
							r.push(`chubby belly`);
						} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
							r.push(`slightly swollen belly`);
						} else if (slave.muscles > 30) {
							r.push(`ripped abs`);
						}
						if (slave.boobs > 4000) {
							r.push(`by ${his} huge tits, leaving them to rest on it instead.`);
						} else {
							r.push(`by ${his} big tits, leaving it completely exposed to view.`);
						}
						if (slave.belly >= 30000) {
							r.push(`It's hard to tell from the front, but there is a pair of spats fighting valiantly to hug the base of ${his} gravidity.`);
						} else if (slave.weight > 95) {
							r.push(`It's hard to tell from the front, but there is a pair of spats hidden beneath that shelf of flab.`);
						}
					} else {
						if (slave.belly >= 1000000) {
						// wip
						} else if (slave.belly >= 750000) {
							if (isBellyFluidLargest) {
								// TODO: write me
							} else if (slave.bellyImplant > 0) {
								r.push(`${slave.slaveName}'s top cannot even attempt to cover ${his} monolithic belly, only rest atop it, while ${his} spats struggle to stay up beneath the boundless mass.`);
							} else {
								r.push(`${slave.slaveName}'s top cannot even attempt to cover ${his} monolithic pregnancy, only rest atop it, while ${his} spats struggle to stay up with so many shifting bulges threatening to unseat them.`);
							}
						} else if (slave.belly >= 600000) {
							if (isBellyFluidLargest) {
								// TODO: write me
							} else if (slave.bellyImplant > 0) {
								r.push(`${slave.slaveName}'s top cannot even attempt to cover ${his} titanic belly, only rest atop it, while ${his} spats are left to fend for themselves beneath the oppressive mass.`);
							} else {
								r.push(`${slave.slaveName}'s top cannot even attempt to cover ${his} titanic pregnancy, only rest atop it, while ${his} spats are left to fend for themselves against the onslaught of squirming life within.`);
							}
						} else if (slave.belly >= 450000) {
							if (isBellyFluidLargest) {
								// TODO: write me
							} else if (slave.bellyImplant > 0) {
								r.push(`${slave.slaveName}'s top cannot even attempt to cover ${his} gigantic belly, only rest atop it, while ${his} spats are left to fend for themselves beneath the oppressive mass.`);
							} else {
								r.push(`${slave.slaveName}'s top cannot even attempt to cover ${his} gigantic pregnancy, only rest atop it, while ${his} spats are left to fend for themselves against the onslaught of squirming life within.`);
							}
						} else if (slave.bellyPreg >= 300000) {
							if (isBellyFluidLargest) {
								// TODO: write me
							} else if (slave.bellyImplant > 0) {
								r.push(`${slave.slaveName}'s top cannot even attempt to cover ${his} massive belly, only rest atop it, while ${his} spats are left to fend for themselves beneath the oppressive mass.`);
							} else {
								r.push(`${slave.slaveName}'s top cannot even attempt to cover ${his} massive pregnancy, only rest atop it, while ${his} spats are left to fend for themselves beneath the restless mass.`);
							}
						} else if (slave.belly >= 120000) {
							if (isBellyFluidLargest) {
								// TODO: write me
							} else if (slave.bellyImplant > 0) {
								r.push(`${slave.slaveName}'s top is currently making a laughable attempt at covering ${his} lewd, bulging belly. ${His} spats struggle to manage any of ${his} impressive bulk.`);
							} else {
								r.push(`${slave.slaveName}'s top is currently making a laughable attempt at covering any of ${his} lewd, bulging pregnancy. ${His} spats struggle to manage any of ${his} impressive bulk.`);
							}
						} else if (slave.weight > 190) {
							r.push(`${slave.slaveName}'s top is incapable of covering ${his} massively fat belly, so it merely rests atop it.`);
						} else if (slave.belly >= 15000 || slave.bellyAccessory === "a huge empathy belly") {
							if (slave.bellyAccessory === "a huge empathy belly") {
								r.push(`${slave.slaveName}'s top is currently making a laughable attempt at covering ${his} lewd, bulging pregnancy, barely covering a fourth of its bulk while ${his} spats are stuck only coming up to its base.`);
							} else if (isBellyFluidLargest) {
								// TODO: write me
							} else if (slave.bellyImplant > 0) {
								r.push(`${slave.slaveName}'s top is currently making a laughable attempt at covering ${his} lewd, bulging belly, barely covering a fourth of its bulk while ${his} spats are stuck only coming up to its base.`);
							} else {
								r.push(`${slave.slaveName}'s top is currently making a laughable attempt at covering ${his} lewd, bulging pregnancy, barely covering a fourth of its bulk while ${his} spats are stuck only coming up to its base.`);
							}
						} else if (slave.belly >= 10000 || slave.bellyAccessory === "a large empathy belly") {
							if (slave.bellyAccessory === "a large empathy belly") {
								r.push(`${slave.slaveName}'s top is currently making a laughable attempt at covering ${his} lewd, bulging pregnancy, barely covering half its bulk while ${his} spats are stuck only coming up to its base.`);
							} else if (isBellyFluidLargest) {
								r.push(`${slave.slaveName}'s top and spats cannot even attempt to cover ${his} hugely swollen belly, leaving it lewdly jutting out.`);
							} else if (slave.bellyImplant > 0) {
								r.push(`${slave.slaveName}'s top is currently making a laughable attempt at covering ${his} lewd, bulging belly, barely covering half its bulk while ${his} spats are stuck only coming up to its base.`);
							} else {
								r.push(`${slave.slaveName}'s top is currently making a laughable attempt at covering ${his} lewd, bulging pregnancy, barely covering half its bulk while ${his} spats are stuck only coming up to its base.`);
							}
						} else if (slave.weight > 160) {
							r.push(`${slave.slaveName}'s top fails to contain ${his} hugely fat belly, leaving it hanging loose and covering ${his} spats from view.`);
						} else if (slave.weight > 130) {
							r.push(`${slave.slaveName}'s top fails to contain ${his} big fat belly, leaving it hanging loose and covering ${his} spats from view.`);
						} else if (slave.belly >= 5000 || slave.bellyAccessory === "a medium empathy belly") {
							if (slave.bellyAccessory === "a medium empathy belly") {
								r.push(`${slave.slaveName}'s top can't entirely cover ${his} big pregnancy, leaving ${him} looking particularly slutty with ${his} spats pulled up only to its base.`);
							} else if (isBellyFluidLargest) {
								r.push(`${slave.slaveName}'s top only slightly covers ${his} jiggling ${slave.inflationType}-filled belly. ${His} spats only come up to the base of it.`);
							} else if (slave.bellyImplant > 0) {
								r.push(`${slave.slaveName}'s top can't entirely cover ${his} implant-filled belly, allowing it to bulge out ${his} spats.`);
							} else {
								r.push(`${slave.slaveName}'s top can't entirely cover ${his} big pregnancy, leaving ${him} looking particularly slutty with ${his} spats pulled up only to its base.`);
							}
						} else if (slave.weight > 95) {
							r.push(`${slave.slaveName}'s top can't entirely contain ${his} fat belly, leaving a bit of it hanging loose and covering ${his} spats from view.`);
						} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
							if (slave.bellyAccessory === "a small empathy belly") {
								r.push(`${slave.slaveName}'s top bulges with ${his} small pregnancy, leaving some of it exposed to view at the bottom.`);
							} else if (isBellyFluidLargest) {
								r.push(`${slave.slaveName}'s top can't entirely cover ${his} ${slave.inflationType}-swollen belly, allowing it to hang loose and slightly push ${his} spats downwards.`);
							} else if (slave.bellyImplant > 0) {
								r.push(`${slave.slaveName}'s top bulges with ${his} implant-rounded belly, which peeks out from the bottom.`);
							} else {
								r.push(`${slave.slaveName}'s top bulges with ${his} growing pregnancy, leaving some of it exposed to view at the bottom.`);
							}
						} else if (slave.weight > 30) {
							r.push(`${slave.slaveName}'s top bulges with ${his} chubby belly, leaving some of it exposed to view.`);
						} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
							r.push(`${slave.slaveName}'s spats are a bit tight around ${his} lower belly.`);
						} else if (slave.muscles > 30) {
							r.push(`${slave.slaveName}'s ripped abs frequently peek out from beneath ${his} top.`);
						}
					}
			}
		}

		return r.join(" ");
	}

	function accessory() {
		const r = [];
		switch (slave.bellyAccessory) {
			case "an extreme corset":
				if (slave.belly >= 1000000) {
					if (isBellyFluidLargest) {
						r.push(`${slave.slaveName}'s unfathomable, hyper-swollen, ${slave.inflationType}-filled belly makes a mockery of ${his} corset; it holds on only with custom lacing and, even then, is more plastered to ${his} back than wrapped around ${his} stomach.`);
					} else if (slave.bellyImplant > 0) {
						r.push(`${slave.slaveName}'s unfathomable, hyper-swollen, implant-filled belly makes a mockery of ${his} corset; it holds on only with custom lacing and, even then, is more plastered to ${his} back than wrapped around ${his} stomach.`);
					} else {
						r.push(`${slave.slaveName}'s unfathomable, hyper-swollen pregnancy makes a mockery of ${his} corset; despite this, even the light pressure applied to it by the failing lacings of the garment has ${his} packed-tight womb on the brink of rupturing. ${His} brood squirms as much as they possibly can under the pressure.`);
					}
				} else if (slave.belly >= 750000) {
					if (isBellyFluidLargest) {
						r.push(`${slave.slaveName}'s monolithic ${slave.inflationType}-filled belly makes a mockery of ${his} tearing ${his} corset; the poor thing is on its last fibers.`);
					} else if (slave.bellyImplant > 0) {
						r.push(`${slave.slaveName}'s monolithic implant-filled belly makes a mockery of ${his} tearing ${his} corset; the poor thing is on its last fibers.`);
					} else {
						r.push(`${slave.slaveName}'s monolithic pregnant belly is on the brink of rupturing under the remaining pressure of ${his} corset, despite it barely holding together; one or the other has to win out. ${His} brood squirms as much as they possibly can under the pressure.`);
					}
				} else if (slave.belly >= 600000) {
					if (isBellyFluidLargest) {
						r.push(`${slave.slaveName}'s titanic ${slave.inflationType}-filled belly makes a mockery of ${his} corset; one or the other will eventually win out.`);
					} else if (slave.bellyImplant > 0) {
						r.push(`${slave.slaveName}'s titanic implant-filled belly makes a mockery of ${his} corset; one or the other will eventually win out.`);
					} else {
						r.push(`${slave.slaveName}'s titanic pregnant belly makes a mockery of ${his} corset, despite still being painfully constricted; one or the other will eventually win out. ${His} brood squirms angrily over the pressure in their already tight confines.`);
					}
				} else if (slave.belly >= 450000) {
					if (isBellyFluidLargest) {
						r.push(`${slave.slaveName}'s gigantic ${slave.inflationType}-filled belly agonizingly strains ${his} corset, threatening to burst it; one or the other will eventually win out.`);
					} else if (slave.bellyImplant > 0) {
						r.push(`${slave.slaveName}'s gigantic implant-filled belly agonizingly strains ${his} corset, threatening to burst it; one or the other will eventually win out.`);
					} else {
						r.push(`${slave.slaveName}'s gigantic pregnant belly is agonizingly compressed as it threatens to burst from ${his} corset; one or the other has to win out.`);
					}
				} else if (slave.belly >= 300000) {
					if (isBellyFluidLargest) {
						r.push(`${slave.slaveName}'s massive ${slave.inflationType}-filled belly painfully strains ${his} corset, threatening to burst it; one or the other will eventually win out.`);
					} else if (slave.bellyImplant > 0) {
						r.push(`${slave.slaveName}'s massive implant-filled belly painfully strains ${his} corset, threatening to burst it; one or the other will eventually win out.`);
					} else {
						r.push(`${slave.slaveName}'s massive pregnant belly is agonizingly compressed as it strains ${his} corset; one or the other has to win out.`);
					}
				} else if (slave.belly >= 150000) {
					if (isBellyFluidLargest) {
						r.push(`${slave.slaveName}'s giant ${slave.inflationType}-filled belly strains ${his} corset, threatening to burst it; one or the other will eventually win out.`);
					} else if (slave.bellyImplant > 0) {
						r.push(`${slave.slaveName}'s giant implant-filled belly strains ${his} corset, threatening to burst it; one or the other will eventually win out.`);
					} else {
						r.push(`${slave.slaveName}'s giant pregnant belly painfully strains ${his} corset, threatening to either burst it or sacrifice the life within; one or the other has to win out.`);
					}
				} else if (slave.belly >= 120000) {
					if (isBellyFluidLargest) {
						r.push(`${slave.slaveName}'s giant ${slave.inflationType}-filled belly is painfully compressed by ${his} corset; one or the other will eventually win out.`);
					} else if (slave.bellyImplant > 0) {
						r.push(`${slave.slaveName}'s giant implant-filled belly is painfully compressed by ${his} corset; one or the other will eventually win out.`);
					} else {
						r.push(`${slave.slaveName}'s giant pregnant belly is painfully compressed by ${his} corset causing ${him} extreme duress; one or the other has to win out.`);
					}
				} else if (slave.belly >= 30000) {
					if (isBellyFluidLargest) {
						r.push(`${slave.slaveName}'s huge ${slave.inflationType}-filled belly is painfully compressed by ${his} corset; one or the other will eventually win out.`);
					} else if (slave.bellyImplant > 0) {
						r.push(`${slave.slaveName}'s huge implant-filled belly is painfully compressed by ${his} corset; one or the other will eventually win out.`);
					} else {
						r.push(`${slave.slaveName}'s huge pregnant belly is painfully compressed by ${his} corset causing ${him} duress; one or the other has to win out.`);
					}
				} else if (slave.weight > 190) {
					r.push(`${slave.slaveName}'s massive gut is barely compressed by ${his} corset, ${his} fat billows out of every gap between the straining material.`);
				} else if (slave.belly >= 15000) {
					if (isBellyFluidLargest) {
						r.push(`${slave.slaveName}'s huge ${slave.inflationType}-filled belly is painfully compressed by ${his} corset; one or the other will eventually win out.`);
					} else if (slave.bellyImplant > 0) {
						r.push(`${slave.slaveName}'s huge implant-filled belly is painfully compressed by ${his} corset; one or the other will eventually win out.`);
					} else {
						r.push(`${slave.slaveName}'s huge pregnant belly is painfully compressed by ${his} corset; one or the other will eventually win out.`);
					}
				} else if (slave.belly >= 10000) {
					if (isBellyFluidLargest) {
						r.push(`${slave.slaveName}'s hugely swollen belly is tightly compressed by ${his} corset causing it to bulge above and below; one or the other will eventually win out.`);
					} else if (slave.bellyImplant > 0) {
						r.push(`${slave.slaveName}'s big implant-filled belly is tightly compressed by ${his} corset; one or the other will eventually win out.`);
					} else {
						r.push(`${slave.slaveName}'s big pregnant belly is tightly compressed by ${his} corset; one or the other will eventually win out.`);
					}
				} else if (slave.weight > 160) {
					r.push(`${slave.slaveName}'s giant gut is tightly compressed by ${his} corset, ${his} fat billows out of every gap between the straining material.`);
				} else if (slave.weight > 130) {
					r.push(`${slave.slaveName}'s huge gut is tightly compressed by ${his} corset, ${his} fat billows out of every gap between the straining material.`);
				} else if (slave.belly >= 5000) {
					if (isBellyFluidLargest) {
						r.push(`${slave.slaveName}'s jiggling ${slave.inflationType}-filled belly is tightly compressed by ${his} corset causing it to bulge out above and below; one or the other will eventually win out.`);
					} else if (slave.bellyImplant > 0) {
						r.push(`${slave.slaveName}'s implant-filled belly is tightly compressed by ${his} corset; one or the other will eventually win out.`);
					} else {
						r.push(`${slave.slaveName}'s pregnant belly is tightly compressed by ${his} corset; one or the other will eventually win out.`);
					}
				} else if (slave.weight > 95) {
					r.push(`${slave.slaveName}'s large gut is tightly compressed by ${his} corset, ${his} fat billows out of any gap it can find.`);
				} else if (slave.belly >= 1500) {
					if (isBellyFluidLargest) {
						r.push(`${slave.slaveName}'s ${slave.inflationType}-swollen belly is tightly compressed by ${his} corset causing ${him} distress.`);
					} else if (slave.bellyImplant > 0) {
						r.push(`${slave.slaveName}'s implant-rounded belly is tightly compressed by ${his} corset causing ${him} distress.`);
					} else {
						r.push(`${slave.slaveName}'s growing belly is tightly compressed by ${his} corset causing ${him} distress.`);
					}
				} else if (slave.weight > 30) {
					r.push(`${slave.slaveName}'s chubby stomach is tightly compressed by ${his} corset, ${his} pudge bulging out of any gap it can find.`);
				} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
					r.push(`${slave.slaveName}'s stomach is tightly compressed by ${his} corset causing ${him} some distress.`);
				}
				break;
			case "a corset":
				if (slave.belly >= 1000000) {
					if (isBellyFluidLargest) {
						r.push(`${slave.slaveName}'s corset looks ridiculous on ${his} unfathomable, hyper-swollen, ${slave.inflationType}-filled belly. It floats on top of ${his} belly, looking more like the bottom half of a mini coat than the garment it was originally intended to be.`);
					} else if (slave.bellyImplant > 0) {
						r.push(`${slave.slaveName}'s corset looks ridiculous on ${his} unfathomable, hyper-swollen, implant-filled belly. It floats on top of ${his} belly, looking more like the bottom half of a mini coat than the garment it was originally intended to be.`);
					} else {
						r.push(`${slave.slaveName}'s corset looks ridiculous on ${his} unfathomable, hyper-swollen pregnancy. It floats on top of ${his} belly, near useless, bobbling up and down as ${his} innumerable brood kick and squirm.`);
					}
				} else if (slave.belly >= 750000) {
					if (isBellyFluidLargest) {
						r.push(`${slave.slaveName}'s corset can barely function with ${his} titanic ${slave.inflationType}-filled belly disrupting it. It aggravatingly digs into ${his} already strained stomach.`);
					} else if (slave.bellyImplant > 0) {
						r.push(`${slave.slaveName}'s corset can barely function with ${his} titanic implant-filled belly disrupting it. It aggravatingly digs into ${his} already strained stomach.`);
					} else {
						r.push(`${slave.slaveName}'s corset can barely function with ${his} titanic belly disrupting it. It aggravatingly digs into ${his} already strained stomach, causing ${his} brood to squirm incessantly.`);
					}
				} else if (slave.belly >= 600000) {
					if (isBellyFluidLargest) {
						r.push(`${slave.slaveName}'s corset looks ridiculous trying to bind ${his} middle while allowing ${his} titanic ${slave.inflationType}-filled belly to hang out.`);
					} else if (slave.bellyImplant > 0) {
						r.push(`${slave.slaveName}'s corset looks ridiculous trying to bind ${his} middle while allowing ${his} titanic implant-filled belly to hang out.`);
					} else {
						r.push(`${slave.slaveName}'s corset looks ridiculous trying to bind ${his} middle while allowing ${his} titanic belly to hang out and squirm freely.`);
					}
				} else if (slave.belly >= 450000) {
					if (isBellyFluidLargest) {
						r.push(`${slave.slaveName}'s corset struggles to bind ${his} middle while being dominated by ${his} gigantic ${slave.inflationType}-filled belly.`);
					} else if (slave.bellyImplant > 0) {
						r.push(`${slave.slaveName}'s corset struggles to bind ${his} middle while being dominated by ${his} gigantic implant-filled belly.`);
					} else {
						r.push(`${slave.slaveName}'s corset struggles to bind ${his} middle while being dominated by ${his} gigantic belly.`);
					}
				} else if (slave.belly >= 300000) {
					if (isBellyFluidLargest) {
						r.push(`${slave.slaveName}'s corset struggles to bind ${his} middle while allowing ${his} massive ${slave.inflationType}-filled belly the room it demands.`);
					} else if (slave.bellyImplant > 0) {
						r.push(`${slave.slaveName}'s corset struggles to bind ${his} middle while allowing ${his} massive implant-filled belly the room it demands.`);
					} else {
						r.push(`${slave.slaveName}'s corset struggles to bind ${his} middle while allowing ${his} massive belly the room it demands.`);
					}
				} else if (slave.belly >= 150000) {
					if (isBellyFluidLargest) {
						r.push(`${slave.slaveName}'s corset strains around ${his} giant ${slave.inflationType}-filled belly.`);
					} else if (slave.bellyImplant > 0) {
						r.push(`${slave.slaveName}'s corset strains around ${his} giant implant-filled belly.`);
					} else {
						r.push(`${slave.slaveName}'s corset strains around ${his} giant belly.`);
					}
				} else if (slave.belly >= 120000) {
					if (isBellyFluidLargest) {
						r.push(`${slave.slaveName}'s giant ${slave.inflationType}-filled belly stretches out ${his} corset`);
					} else if (slave.bellyImplant > 0) {
						r.push(`${slave.slaveName}'s giant implant-filled belly stretches out ${his} corset`);
					} else {
						r.push(`${slave.slaveName}'s giant pregnant belly stretches out ${his} corset.`);
					}
				} else if (slave.weight > 190) {
					r.push(`${slave.slaveName}'s corset strains around ${his} massive gut.`);
				} else if (slave.belly >= 15000) {
					if (isBellyFluidLargest) {
						r.push(`${slave.slaveName}'s huge ${slave.inflationType}-filled belly comfortably bulges out of ${his} corset.`);
					} else if (slave.bellyImplant > 0) {
						r.push(`${slave.slaveName}'s huge implant-filled belly comfortably bulges out of ${his} corset.`);
					} else {
						r.push(`${slave.slaveName}'s huge pregnant belly comfortably bulges out of ${his} corset.`);
					}
				} else if (slave.belly >= 10000) {
					if (isBellyFluidLargest) {
						r.push(`${slave.slaveName}'s hugely swollen belly comfortably bulges out of ${his} corset.`);
					} else if (slave.bellyImplant > 0) {
						r.push(`${slave.slaveName}'s big implant-filled belly comfortably bulges out of ${his} corset.`);
					} else {
						r.push(`${slave.slaveName}'s big pregnant belly comfortably bulges out of ${his} corset.`);
					}
				} else if (slave.weight > 160) {
					r.push(`${slave.slaveName}'s giant gut hangs out the hole in ${his} corset designed to accommodate a pregnant belly.`);
				} else if (slave.weight > 130) {
					r.push(`${slave.slaveName}'s huge gut hangs out the hole in ${his} corset designed to accommodate a pregnant belly.`);
				} else if (slave.belly >= 5000) {
					if (isBellyFluidLargest) {
						r.push(`${slave.slaveName}'s jiggling ${slave.inflationType}-filled belly comfortably hangs out of ${his} corset.`);
					} else if (slave.bellyImplant > 0) {
						r.push(`${slave.slaveName}'s implant-filled belly comfortably bulges out of ${his} corset.`);
					} else {
						r.push(`${slave.slaveName}'s pregnant belly comfortably bulges out of ${his} corset.`);
					}
				} else if (slave.weight > 95) {
					r.push(`${slave.slaveName}'s large gut hangs out the hole in ${his} corset designed to accommodate a pregnant belly.`);
				} else if (slave.belly >= 1500) {
					if (isBellyFluidLargest) {
						r.push(`${slave.slaveName}'s ${slave.inflationType}-swollen belly is lightly compressed by ${his} corset making ${him} uncomfortable.`);
					} else if (slave.bellyImplant > 0) {
						r.push(`${slave.slaveName}'s implant-rounded belly comfortably rounds out ${his} corset.`);
					} else {
						r.push(`${slave.slaveName}'s growing belly comfortably rounds out ${his} corset.`);
					}
				} else if (slave.weight > 30) {
					r.push(`${slave.slaveName}'s chubby stomach is compressed by ${his} corset, ${his} pudge bulging out above and below it.`);
				} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
					r.push(`${slave.slaveName} feels minor discomfort over the light pressure on ${his} sensitive stomach.`);
				}
				break;
			case "a medium empathy belly":
				if (slave.weight > 160) {
					r.push(`${slave.slaveName}'s empathy belly is barely noticeable over ${his} giant gut.`);
				} else if (slave.weight > 130) {
					r.push(`${slave.slaveName}'s empathy belly is barely noticeable over ${his} huge gut.`);
				}
				break;
			case "a small empathy belly":
				if (slave.weight > 160) {
					r.push(`${slave.slaveName}'s empathy belly is barely noticeable over ${his} giant gut.`);
				} else if (slave.weight > 130) {
					r.push(`${slave.slaveName}'s empathy belly is barely noticeable over ${his} huge gut.`);
				} else if (slave.weight > 95) {
					r.push(`${slave.slaveName}'s small empathy belly is barely noticeable over ${his} large gut.`);
				}
				break;
			case "a support band":
				if (slave.belly >= 1000000) {
					if (isBellyFluidLargest) {
						r.push(`${slave.slaveName}'s unfathomable, hyper-swollen, ${slave.inflationType}-filled belly is cradled by an equally oversized support band`);
					} else if (slave.bellyImplant > 0) {
						r.push(`${slave.slaveName}'s unfathomable, hyper-swollen, implant-filled belly is cradled by an equally oversized support band`);
					} else {
						r.push(`${slave.slaveName}'s unfathomable, hyper-swollen pregnancy is cradled by an equally oversized support band`);
					}
					r.push(`doing its best to alleviate the strain on ${his} body.`);
				} else if (slave.belly >= 750000) {
					if (isBellyFluidLargest) {
						r.push(`${slave.slaveName}'s monolithic ${slave.inflationType}-filled belly strains against ${his} enormous support band`);
					} else if (slave.bellyImplant > 0) {
						r.push(`${slave.slaveName}'s monolithic implant-filled belly strains against ${his} enormous support band`);
					} else {
						r.push(`${slave.slaveName}'s monolithic pregnant belly strains against ${his} enormous support band`);
					}
					r.push(`as it struggles to hold ${his} body together.`);
				} else if (slave.belly >= 600000) {
					if (isBellyFluidLargest) {
						r.push(`${slave.slaveName}'s titanic ${slave.inflationType}-filled belly is cradled by ${his} enormous support band,`);
					} else if (slave.bellyImplant > 0) {
						r.push(`${slave.slaveName}'s titanic implant-filled belly is cradled by ${his} enormous support band,`);
					} else {
						r.push(`${slave.slaveName}'s titanic pregnant belly is cradled by ${his} enormous support band,`);
					}
					r.push(`alleviating some of the strain of carrying it and helping to keep things in place.`);
				} else if (slave.belly >= 450000) {
					if (isBellyFluidLargest) {
						r.push(`${slave.slaveName}'s gigantic ${slave.inflationType}-filled belly strains against ${his} extra large support band`);
					} else if (slave.bellyImplant > 0) {
						r.push(`${slave.slaveName}'s gigantic implant-filled belly strains against ${his} extra large support band`);
					} else {
						r.push(`${slave.slaveName}'s gigantic pregnant belly strains against ${his} extra large support band`);
					}
					r.push(`as it dutifully alleviates the stress on ${his} body.`);
				} else if (slave.belly >= 300000) {
					if (isBellyFluidLargest) {
						r.push(`${slave.slaveName}'s massive ${slave.inflationType}-filled belly is cradled by ${his} extra large support band,`);
					} else if (slave.bellyImplant > 0) {
						r.push(`${slave.slaveName}'s massive implant-filled belly is cradled by ${his} extra large support band,`);
					} else {
						r.push(`${slave.slaveName}'s massive pregnant belly is cradled by ${his} extra large support band,`);
					}
					r.push(`alleviating much of the strain of carrying it.`);
				} else if (slave.belly >= 150000) {
					if (isBellyFluidLargest) {
						r.push(`${slave.slaveName}'s giant ${slave.inflationType}-filled belly is cradled by ${his} extra large support band,`);
					} else if (slave.bellyImplant > 0) {
						r.push(`${slave.slaveName}'s giant implant-filled belly is cradled by ${his} extra large support band,`);
					} else {
						r.push(`${slave.slaveName}'s giant pregnant belly is cradled by ${his} extra large support band,`);
					}
					r.push(`alleviating much of the strain of carrying it.`);
				} else if (slave.belly >= 120000) {
					if (isBellyFluidLargest) {
						r.push(`${slave.slaveName}'s giant ${slave.inflationType}-filled belly strains against ${his} support band`);
					} else if (slave.bellyImplant > 0) {
						r.push(`${slave.slaveName}'s giant implant-filled belly strains against ${his} support band`);
					} else {
						r.push(`${slave.slaveName}'s giant pregnant belly strains against ${his} support band`);
					}
					r.push(`as it dutifully alleviates the stress on ${his} body.`);
				} else if (slave.belly >= 30000) {
					if (isBellyFluidLargest) {
						r.push(`${slave.slaveName}'s huge ${slave.inflationType}-filled belly is cradled by ${his} support band,`);
					} else if (slave.bellyImplant > 0) {
						r.push(`${slave.slaveName}'s huge implant-filled belly is cradled by ${his} support band,`);
					} else {
						r.push(`${slave.slaveName}'s huge pregnant belly is cradled by ${his} support band,`);
					}
					r.push(`alleviating much of the strain of carrying it.`);
				} else if (slave.weight > 190) {
					r.push(`${slave.slaveName}'s massive gut is cradled by ${his} support band, giving it a rather smooth appearance and taking some of the weight off ${his} front.`);
				} else if (slave.belly >= 15000) {
					if (isBellyFluidLargest) {
						r.push(`${slave.slaveName}'s huge ${slave.inflationType}-filled belly is cradled by ${his} support band,`);
					} else if (slave.bellyImplant > 0) {
						r.push(`${slave.slaveName}'s huge implant-filled belly is cradled by ${his} support band,`);
					} else {
						r.push(`${slave.slaveName}'s huge pregnant belly is cradled by ${his} support band,`);
					}
					r.push(`reducing the strain on ${his} back.`);
				} else if (slave.belly >= 10000) {
					if (isBellyFluidLargest) {
						r.push(`${slave.slaveName}'s hugely swollen belly is cradled by ${his} support band,`);
					} else if (slave.bellyImplant > 0) {
						r.push(`${slave.slaveName}'s big implant-filled belly is cradled by ${his} support band,`);
					} else {
						r.push(`${slave.slaveName}'s big pregnant belly is cradled by ${his} support band,`);
					}
					r.push(`reducing the strain on ${his} back.`);
				} else if (slave.weight > 160) {
					r.push(`${slave.slaveName}'s giant gut is cradled by ${his} support band, giving it a rather smooth appearance.`);
				} else if (slave.weight > 130) {
					r.push(`${slave.slaveName}'s huge gut is cradled by ${his} support band, giving it a rather smooth appearance.`);
				} else if (slave.belly >= 5000) {
					if (isBellyFluidLargest) {
						r.push(`${slave.slaveName}'s jiggling ${slave.inflationType}-filled belly is cradled by ${his} support band.`);
					} else if (slave.bellyImplant > 0) {
						r.push(`${slave.slaveName}'s implant-filled belly is cradled by ${his} support band.`);
					} else {
						r.push(`${slave.slaveName}'s pregnant belly is cradled by ${his} support band.`);
					}
					r.push(`It doesn't accomplish much, however.`);
				} else if (slave.weight > 95) {
					r.push(`${slave.slaveName}'s large gut is cradled by ${his} support band, giving it a rather smooth appearance.`);
				} else if (slave.belly >= 1500) {
					if (isBellyFluidLargest) {
						r.push(`${slave.slaveName}'s ${slave.inflationType}-swollen belly is cradled by ${his} support band.`);
					} else if (slave.bellyImplant > 0) {
						r.push(`${slave.slaveName}'s implant-rounded belly is cradled by ${his} support band.`);
					} else {
						r.push(`${slave.slaveName}'s growing belly is cradled by ${his} support band.`);
					}
					r.push(`It doesn't accomplish much, however.`);
				} else if (slave.weight > 30) {
					r.push(`${slave.slaveName}'s chubby stomach is cradled by ${his} support band, halting any jiggling and giving it a smooth appearance.`);
				} else {
					r.push(`${slave.slaveName}'s support band rests around ${his} stomach, accomplishing little.`);
				}
		}
		return r.join(" ");
	}

	function marksAndMods() {
		const r = [];
		if (slave.fuckdoll === 0) {
			if (App.Data.misc.fakeBellies.includes(slave.bellyAccessory)) {
				switch (slave.bellyAccessory) {
					case "a huge empathy belly":
						r.push(`${He} is wearing a carefully sculpted silicone belly modeled after a full-term pregnant woman carrying twins.`);
						break;
					case "a large empathy belly":
						r.push(`${He} is wearing a carefully sculpted silicone belly modeled after a full-term pregnant woman.`);
						break;
					case "a medium empathy belly":
						r.push(`${He} is wearing a carefully sculpted silicone belly modeled after a pregnant woman in ${his} second trimester.`);
						break;
					case "a small empathy belly":
						r.push(`${He} is wearing a carefully sculpted silicone belly modeled after a pregnant woman in ${his} first trimester.`);
						break;
				}
				if (V.showBodyMods === 1) {
					if (slave.piercing.navel.weight === 1) {
						r.push(`${His} fake navel bears a simple stud.`);
					} else if (slave.piercing.navel.weight === 2) {
						r.push(`${His} fake navel is pierced with a big ring.`);
						if (slave.clothes === "slutty jewelry") {
							r.push(`It has a length of gilded chain dangling from it.`);
						} else {
							r.push(`It has a short length of chain dangling from it.`);
						}
					}
				}
			} else {
				if (V.showBodyMods === 1) {
					if (slave.piercing.navel.weight === 1) {
						r.push(`${His} navel bears a simple`);
						if (slave.weight > 130) {
							r.push(`stud, though it has since vanished into ${his} soft folds.`);
						} else {
							r.push(`stud.`);
						}
					} else if (slave.piercing.navel.weight === 2) {
						r.push(`${His} navel is pierced with a big`);
						if (slave.weight > 130) {
							r.push(`ring that just managed to extend out of the fat roll covering ${his} navel.`);
						} else {
							r.push(`ring.`);
						}
						if (slave.belly >= 10000) {
							r.push(`It has a heavy bell dangling from it.`);
							if (slave.bellyPreg >= 10000) {
								r.push(`It sounds whenever ${his}`);
								if (slave.pregType > 1) {
									r.push(`babies`);
									if (slave.pregType > 10) {
										r.push(`kick, which is often.`);
									} else {
										r.push(`kick.`);
									}
								} else {
									r.push(`baby kicks.`);
								}
							}
						} else if (slave.clothes === "slutty jewelry") {
							r.push(`It has a length of gilded chain dangling from it.`);
						} else {
							r.push(`It has a short length of chain dangling from it.`);
						}
					}
					if (slave.bellyTat !== 0) {
						if (slave.belly >= 300000) {
							if (slave.bellyTat === "a heart") {
								r.push(`A heart is tattooed around ${his} popped navel, though it is barely recognizable so stretched by ${his} titanic`);
								if (slave.bellyPreg >= 3000) {
									r.push(`pregnancy.`);
								} else {
									r.push(`stomach.`);
								}
							} else if (slave.bellyTat === "a star") {
								r.push(`A star is tattooed around ${his} popped navel, though it is barely recognizable so stretched by ${his} titanic`);
								if (slave.bellyPreg >= 3000) {
									r.push(`pregnancy.`);
								} else {
									r.push(`stomach.`);
								}
							} else if (slave.bellyTat === "a butterfly") {
								r.push(`A butterfly is tattooed around ${his} popped navel, though it is barely recognizable so stretched by ${his} titanic`);
								if (slave.bellyPreg >= 3000) {
									r.push(`pregnancy.`);
								} else {
									r.push(`stomach.`);
								}
							}
						} else if (slave.belly >= 150000) {
							if (slave.bellyTat === "a heart") {
								r.push(`A heart is tattooed around ${his} popped navel, though it is rather stretched by ${his} enormous`);
								if (slave.bellyPreg >= 3000) {
									r.push(`pregnancy.`);
								} else {
									r.push(`stomach.`);
								}
							} else if (slave.bellyTat === "a star") {
								r.push(`A star is tattooed around ${his} popped navel, though it is rather stretched by ${his} enormous`);
								if (slave.bellyPreg >= 3000) {
									r.push(`pregnancy.`);
								} else {
									r.push(`stomach.`);
								}
							} else if (slave.bellyTat === "a butterfly") {
								r.push(`A butterfly is tattooed around ${his} popped navel, though it is rather stretched by ${his} enormous`);
								if (slave.bellyPreg >= 3000) {
									r.push(`pregnancy.`);
								} else {
									r.push(`stomach.`);
								}
							}
						} else if (slave.weight > 190 && slave.belly < 150000) {
							r.push(`${He} has a tattoo around ${his} navel, but it is impossible to tell of what due to ${his} expansive fat rolls.`);
						} else if (slave.belly >= 10000) {
							if (slave.bellyTat === "a heart") {
								r.push(`A heart is tattooed around ${his} popped navel, only to be truly seen when ${he} has a huge belly or is full-term.`);
							} else if (slave.bellyTat === "a star") {
								r.push(`A star is tattooed around ${his} popped navel, only to be truly seen when ${he} has a huge belly or is full-term.`);
							} else if (slave.bellyTat === "a butterfly") {
								r.push(`A butterfly is tattooed around ${his} popped navel, only to be truly seen when ${he} has a huge belly or is full-term.`);
							}
						} else if (slave.belly >= 5000 || slave.weight <= 190) {
							r.push(`${He} has a barely recognizable tattoo around ${his} navel, it should reveal itself fully once ${he} is a little bigger.`);
						} else if (slave.belly >= 1500) {
							r.push(`${He} has an unrecognizable tattoo around ${his} navel, it has stretched slightly along with ${his} rounded middle.`);
						} else {
							r.push(`${He} has an unrecognizable tattoo scrunched around ${his} navel.`);
						}
					}
					if (slave.birthsTat > 0) {
						if (slave.birthsTat > 1) {
							r.push(`${He} has a series of ${slave.birthsTat} baby-shaped tattoos adorning ${his} stomach; one for each successful`);
							if (slave.pregKnown === 1) {
								r.push(`pregnancy and a temporary one for ${his} current pregnancy.`);
							} else {
								r.push(`pregnancy.`);
							}
						} else {
							r.push(`${He} has a single baby-shaped`);
							if (slave.pregKnown === 1) {
								r.push(`tattoo, and one temporary one,`);
							} else {
								r.push(`tattoo`);
							}
							r.push(`adorning ${his} stomach.`);
						}
					} else if (slave.birthsTat === 0 && slave.abortionTat === -1 && slave.pregKnown === 1) {
						r.push(`${He} has a single baby-shaped temporary tattoo adorning ${his} stomach.`);
					}
					if (slave.abortionTat > 0) {
						if (slave.abortionTat > 1) {
							r.push(`${He} has a series of ${slave.abortionTat} crossed out baby-shaped`);
							if (slave.pregKnown === 1) {
								r.push(`tattoos, and one uncrossed one,`);
							} else {
								r.push(`tattoos`);
							}
							r.push(`adorning ${his} stomach; one for each pregnancy ${he}'s failed to complete.`);
						} else {
							r.push(`${He} has a single crossed out, baby-shaped`);
							if (slave.pregKnown === 1) {
								r.push(`tattoo, and one uncrossed one,`);
							} else {
								r.push(`tattoo`);
							}
							r.push(`adorning ${his} stomach.`);
						}
					} else if (slave.abortionTat === 0 && slave.birthsTat === -1 && slave.pregKnown === 1) {
						r.push(`${He} has a single baby-shaped temporary tattoo adorning ${his} stomach.`);
					}
				}
				if (slave.breedingMark === 1) {
					if (V.propOutcome === 1) {
						r.push(`The Societal Elites' mark designating ${him} as a breeder is prominently displayed across ${his} lower belly, beneath ${his} navel.`);
					} else {
						r.push(`An alluring tattoo is prominently displayed across ${his} lower belly, beneath ${his} navel, urging ${him} to be bred.`);
					}
				}
				if (isBellyHeavy) {
					if (canMove(slave)) {
						r.push(`${His}`);
						if (slave.bellyPreg >= 3000) {
							r.push(`pregnancy`);
						} else {
							r.push(`stomach`);
						}
						r.push(`is so massive that it is difficult for ${him} to function.`);
						if (slave.muscles > 95) {
							r.push(`However, ${he} is so powerfully built that ${he} can manage it with effort, using ${his}`);
							if (hasBothArms(slave)) {
								r.push(`arms`);
							} else if (hasAnyArms(slave)) {
								r.push(`arm`);
							} else {
								r.push(`rippling back muscles`);
							}
							r.push(`to support it during day to day affairs.`);
						} else if (slave.muscles > 30) {
							r.push(`${He} can barely manage to perform daily tasks, and usually moves`);
							if (hasAnyArms(slave)) {
								if (hasBothArms(slave)) {
									r.push(`with ${his} arms under ${his} belly`);
								} else {
									r.push(`with ${his} arm under ${his} belly`);
								}
								r.push(`to help with its weight.`);
							} else {
								r.push(`hunched over due to the weight of ${his} belly.`);
							}
						} else if (slave.muscles > 5) {
							r.push(`${He} requires assistance to do things, and tends to lean on things to help relieve the weight.`);
						} else {
							r.push(`${He} requires frequent assistance, and tries to stay seated as much as ${he} can.`);
						}
					} else if (slave.belly >= 750000) {
						r.push(`It dwarfs ${his} torso, making ${him} a vestigial accessory to ${his} belly.`);
					} else {
						r.push(`It is easily as large as ${his} torso, making ${him} at least half belly.`);
					}
					if (slave.assignment !== Job.BABY_FACTORY && slave.assignment !== Job.ARCADE && (slave.assignment !== Job.DAIRY || V.dairyRestraintsSetting < 2) && slave.belly >= 300000) {
						if (V.pregAccessibility === 1) {
							r.push(`Fortunately for ${him}, the penthouse is adapted for daily life with a`);
							if (slave.bellyPreg >= 3000) {
								r.push(`pregnant`);
							}
							r.push(`belly`);
						} else {
							if (descType === DescType.MARKET) {
								r.push(`${He}'ll have`);
							} else {
								r.push(`${He} has`);
							}
							r.push(`trouble living in your penthouse, which is not designed for ${girl}s with`);
							if (slave.bellyPreg >= 3000) {
								r.push(`pregnancies`);
							} else {
								r.push(`bellies`);
							}
						}
						r.push(`wider than a standard doorway.`);
					}
				}
			}
		} else {
			if (slave.piercing.navel.weight > 0 && V.showBodyMods === 1) {
				if (slave.belly >= 10000) {
					if (slave.piercing.navel.weight === 1) {
						r.push(`${His} popped navel bears a simple stud.`);
					} else if (slave.piercing.navel.weight === 2) {
						r.push(`${His} popped navel is pierced with a big ring.`);
					}
					r.push(`It's eye-catching, since most of ${his} piercings are hidden by the suit.`);
				} else {
					r.push(`${His} navel piercing runs through the suit's material.`);
				}
			}
			if (isBellyHeavy) {
				r.push(`The difficulties of being enormously`);
				if (slave.bellyPreg >= 3000) {
					r.push(`pregnant`);
				} else {
					r.push(`swollen`);
				}
				r.push(`are greatly reduced for a Fuckdoll, since it's almost always restrained, stationary, or both.`);
			}
		}
		return r.join(" ");
	}
};
