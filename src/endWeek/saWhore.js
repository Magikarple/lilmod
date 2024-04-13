/**
 * @param {FC.ReportSlave} slave
 * @returns {string}
 */
App.SlaveAssignment.whore = function(slave) {
	let r = ` `;
	const {
		he, him, his, hers, himself, girl, He, His, loli
	} = getPronouns(slave);

	let beauty;
	let customers;
	let FuckResult;
	let cash;

	let cervixPump;

	let oralUse;
	let analUse;
	let vaginalUse;
	let mammaryUse;
	let penetrativeUse;

	const arcology = V.arcologies[0];
	const arcologyInfo = new App.Utils.Arcology(arcology);

	const incomeStats = gatherStatistics(slave);

	updateNonSlaveVariables(slave); // must be run before applyFSDecoration() or you will face NaNs
	if (slave.assignment === Job.BROTHEL || slave.assignment === Job.MADAM) {
		// By being at the end, every slave after the first will get a bonus. By moving it up, the first can enjoy it too. slaveJobValues() checks Edo Revivalist, so here we are.
		applyFSDecoration();
	}
	addCash(slave);
	sexCounts(slave);
	jobPreface(slave);
	bonusMultiplierText(slave);
	usageCountDescriptions(slave);
	if (V.seeAge === 1) {
		comingOfAge(slave);
	}
	mentalEffects(slave);
	physicalEffects(slave);
	slaveSkills(slave);
	if (V.showEWM === 1 || (V.favSeparateReport === 1 && V.favorites.includes(slave.ID))) {
		publicReactions(slave);
	}
	if (slave.sexualFlaw === SexualFlaw.NONE) {
		addFlaw(slave);
	}
	addCashText(slave);
	sexualSatiation(slave);
	if (V.showVignettes === 1) {
		assignmentVignette(slave);
	}

	return r;

	/**
	 * @param {App.Entity.SlaveState} slave
	 * */
	function gatherStatistics(slave) {
		/* Statistics gathering */
		const facility = (slave.assignment === Job.BROTHEL || slave.assignment === Job.MADAM) ? V.facility.brothel : undefined;
		return getSlaveStatisticData(slave, facility);
	}

	// I suspect this one will mostly be cut out in the overhauling
	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function updateNonSlaveVariables(slave) {
		// FuckResult and FuckAmount setting
		beauty = slave.sexAmount;
		incomeStats.customers = beauty;
		if (App.EndWeek.saVars.effectiveWhoreClass[slave.ID] === 4) {
			customers = "extremely wealthy";
			FuckResult = Math.trunc(slave.sexQuality * App.EndWeek.saVars.whorePriceAdjustment.topClass);
		} else if (App.EndWeek.saVars.effectiveWhoreClass[slave.ID] === 3) {
			customers = "upper class";
			FuckResult = Math.trunc(slave.sexQuality * App.EndWeek.saVars.whorePriceAdjustment.upperClass);
		} else if (App.EndWeek.saVars.effectiveWhoreClass[slave.ID] === 2) {
			customers = "middle class";
			FuckResult = Math.trunc(slave.sexQuality * App.EndWeek.saVars.whorePriceAdjustment.middleClass);
		} else if (App.EndWeek.saVars.effectiveWhoreClass[slave.ID] === 1) {
			customers = "lower class";
			FuckResult = Math.trunc(slave.sexQuality * App.EndWeek.saVars.whorePriceAdjustment.lowerClass);
		} else {
			customers = "ERROR";
			FuckResult = 1;
			console.log("Error in effectiveWhoreClass for " + slave.slaveName + ", expected 1-4, got: ", App.EndWeek.saVars.effectiveWhoreClass[slave.ID], "whoreClass:", slave.whoreClass, slave.assignment, slave);
		}
		// Minimum whore cost is 1, regardless of price scaling
		FuckResult = Math.max(FuckResult, 1);
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function jobPreface(slave) {
		if (slave.devotion > 95 || slave.energy > 95) {
			r += `enthusiastically sells`;
		} else if (slave.devotion > 50) {
			r += `willingly sells`;
		} else if (slave.devotion > 20) {
			r += `obediently sells`;
		} else if (slave.trust < -20) {
			r += `reluctantly sells`;
		} else {
			r += `is forced to sell`;
		}
		r += ` ${his} body.`;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function bonusMultiplierText(slave) {
		if (V.brothel > 0) {
			if ((V.universalRulesFacilityWork === 1 && slave.assignment === Job.WHORE && V.brothelSpots > 0) || (slave.assignment === Job.BROTHEL)) {
				if (slave.assignment === Job.WHORE) {
					r += ` Since there's extra space in ${V.brothelName}, ${he} sells ${himself} there.`;
					const maxBrothelBoost = Math.max(Math.trunc(100 * Math.pow(1.26, V.brothelBoost.eligible - 1)) * 50 * V.brothelBoost.eligible, 1); // Correcting prices in case benefits outgrow the cap
					if (maxBrothelBoost < App.EndWeek.saVars.slaveJobValues.brothel.boost) {
						FuckResult = Math.trunc(FuckResult * (1 + V.brothelBoost.eligible / 20) * maxBrothelBoost / App.EndWeek.saVars.slaveJobValues.brothel.boost);
					} else {
						FuckResult = Math.trunc(FuckResult * (1 + V.brothelBoost.eligible / 20));
					}
				}
				// ads
				if (V.brothelAdsSpending !== 0) {
					const adCats = App.Ads.Categories; // for brevity
					if (V.brothelAdsStacked === 1 && adCats.assetSize.classifySlave(slave) === 1) {
						r += ` ${His} stacked body fits ${V.brothelName}'s ad campaign, getting ${him} more business.`;
					} else if (V.brothelAdsStacked === -1 && adCats.assetSize.classifySlave(slave) === -1) {
						r += ` ${His} slim body fits ${V.brothelName}'s ad campaign, getting ${him} more business.`;
					}
					if (V.brothelAdsPreg === 1 && adCats.preg.classifySlave(slave) === 1) {
						r += ` ${His} gravid body fits ${V.brothelName}'s ad campaign, getting ${him} more attention.`;
					} else if (V.brothelAdsPreg === -1 && adCats.preg.classifySlave(slave) === -1) {
						r += ` ${His} flat belly fits ${V.brothelName}'s ad campaign, getting ${him} more attention.`;
					}
					if (V.brothelAdsModded === 1 && adCats.mods.classifySlave(slave) === 1) {
						r += ` Body art like ${hers} is a major draw.`;
					} else if (V.brothelAdsModded === -1 && adCats.mods.classifySlave(slave) === -1) {
						r += ` Very clean bodies like ${hers} are a major draw.`;
					}
					if (V.brothelAdsImplanted === 1 && adCats.assetOrigin.classifySlave(slave) === 1) {
						r += ` Many citizens come to ${V.brothelName} looking to rent a plastic slut like ${him}.`;
					} else if (V.brothelAdsImplanted === -1 && adCats.assetOrigin.classifySlave(slave) === -1) {
						r += ` Many citizens come to ${V.brothelName} looking to play with a natural ${girl} like ${him}.`;
					}
					if (V.brothelAdsOld === 1 && adCats.age.classifySlave(slave) === 1) {
						r += ` ${He}'s perfect for ${V.brothelName}, whose brand is mature slaves.`;
					} else if (V.brothelAdsOld === -1 && adCats.age.classifySlave(slave) === -1) {
						r += ` ${He}'s perfect for ${V.brothelName}, whose brand is young slaves.`;
					} else if (V.brothelAdsOld === -2 && adCats.age.classifySlave(slave) === -2) {
						r += ` ${He}'s perfect for ${V.brothelName}, whose brand is teenage slaves.`;
					} else if (V.brothelAdsOld === -3 && adCats.age.classifySlave(slave) === -3) {
						r += ` ${He}'s perfect for ${V.brothelName}, whose brand is ${loli} slaves.`;
					}
					if (V.brothelAdsXX === 1 && adCats.genitalia.classifySlave(slave) === 1) {
						r += ` Almost everyone who comes to ${V.brothelName} is looking to fuck a ${girl} like ${him}.`;
					} else if (V.brothelAdsXX === -1 && adCats.genitalia.classifySlave(slave) === -1) {
						r += ` Almost everyone who comes to ${V.brothelName} is looking to pound a ${girl} who cums when buttfucked.`;
					}
				}
				if (V.MadamID !== 0) {
					const madam = S.Madam;
					const madamPronouns = getPronouns(madam);
					const madamBonus = App.EndWeek.saVars.madamBonus;
					if (madamBonus > 0) {
						if (slave.assignment === Job.WHORE) {
							r += ` Working`;
						} else {
							r += ` Living and working`;
						}
						r += ` out of the brothel, ${he} comes under ${SlaveFullName(madam)}'s `;
						if (madamBonus < 0.1) {
							r += `completely inept`;
						} else if (madamBonus < 0.2) {
							r += `unskilled`;
						} else if (madamBonus < 0.3) {
							r += `skillful`;
						} else {
							r += `masterful`;
						}
						r += ` leadership.`;
						if (madam.dick > 2 && canAchieveErection(madam)) {
							if (slave.devotion <= 20) {
								r += ` The Madam rapes ${him} when ${he} fails to meet standards.`;
							} else {
								r += ` The Madam uses ${madamPronouns.his} dick to reward ${him} when ${he} does well and needs some loving.`;
							}
						}
						if (!canHear(slave)) {
							r += ` Unfortunately, ${his} inability to hear wastes most of ${madam.slaveName}'s advice.`;
						}
						if (V.MadamIgnoresFlaws !== 1) {
							if (!App.Data.misc.paraphiliaList.includes(slave.sexualFlaw) && slave.sexualFlaw !== SexualFlaw.NONE && jsRandom(1, 100) > 90) {
								r += ` ${SlaveFullName(madam)} manages to <span class="flaw break">break</span> ${slave.slaveName} of ${his} sexual flaws.`;
								slave.sexualFlaw = SexualFlaw.NONE;
							} else if (slave.behavioralFlaw !== BehavioralFlaw.NONE && jsRandom(1, 100) > 90) {
								r += ` ${SlaveFullName(madam)} manages to <span class="flaw break">break</span> ${slave.slaveName} of ${his} flaws.`;
								slave.behavioralFlaw = BehavioralFlaw.NONE;
							}
						}
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function usageCountDescriptions(slave) {
		r += ` ${His} appearance`;
		if (App.EndWeek.saVars.maxWhoreClass[slave.ID] > App.EndWeek.saVars.effectiveWhoreClass[slave.ID]) {
			let customers2;
			if (App.EndWeek.saVars.maxWhoreClass[slave.ID] === 4) {
				customers2 = "extremely wealthy";
			} else if (App.EndWeek.saVars.maxWhoreClass[slave.ID] === 3) {
				customers2 = "upper class";
			} else if (App.EndWeek.saVars.maxWhoreClass[slave.ID] === 2) {
				customers2 = "middle class";
			} else {
				customers2 = "ERROR";
			}
			r += ` can attract the ${customers2}, but they already had plenty of other slaves to fuck so ${he} `;
		}
		r += ` attracted ${beauty} ${customers} members of the public (${Math.trunc(beauty / 7)} a day)`;
		if (App.EndWeek.saVars.maxWhoreClass[slave.ID] > App.EndWeek.saVars.effectiveWhoreClass[slave.ID]) {
			r += ` instead`;
		}
		if (beauty > 160) {
			r += `, so many that `;
			if (canDoVaginal(slave) && canDoAnal(slave)) {
				r += `each of ${his} holes was`;
			} else if (canDoVaginal(slave) || canDoAnal(slave)) {
				r += `each of ${his} available holes was`;
			} else {
				r += `${his} mouth and anywhere else a dick could fit was`;
			}
			r += ` often filled by more than one cock`;
		} else if (beauty > 140) {
			r += `, so many that ${he} spent much of ${his} time getting gangbanged`;
		} else if (beauty > 120) {
			r += `, so many that customers often `;
			if (canDoAnal(slave) || canDoVaginal(slave)) {
				r += `spitroasted`;
			} else {
				r += `double-teamed`;
			}
			r += ` the slut`;
		} else if (beauty > 100) {
			r += `, so many that ${he} frequently had sex with multiple customers at once`;
		} else if (beauty > 70) {
			r += `, so many that ${he} occasionally had sex with multiple customers at once`;
		}
		const pMod = App.SlaveAssignment.PartTime.efficiencyModifier(slave);
		if (pMod < 1) {
			const loss = Math.ceil((beauty / pMod) * (1 - pMod));
			r += `. Due to ${his} part-time job, ${he} served ${loss} less than ${he} would have normally`;
		}
		r += `. They paid ${cashFormat(FuckResult)} on average`;
		r += `.`;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function comingOfAge(slave) {
		if (slave.physicalAge === V.minimumSlaveAge && slave.physicalAge === V.fertilityAge && canGetPregnant(slave) && (arcologyInfo.fsActive('FSRepopulationFocus') || arcologyInfo.fsActive('FSGenderFundamentalist')) && !arcologyInfo.fsActive('FSRestart')) {
			if (slave.birthWeek === 0) {
				r += ` ${He} just turned ${V.minimumSlaveAge} this week, giving ${him} an immense boost to both popularity and price. ${He} is also expected to become fertile soon, giving ${him} an additional boost as customers clamor to claim ${his} fresh womb.`;
			} else if (slave.birthWeek < 4) {
				r += ` This is still the first month in which it's legal to pay to fuck ${him}, giving ${him} a boost to both popularity and price. ${He} was also anticipated to become fertile this month, and ${his} womb is still unoccupied, giving ${him} an additional boost.`;
			}
		} else if (slave.physicalAge === V.minimumSlaveAge) {
			if (slave.birthWeek === 0) {
				r += ` ${He} just turned ${V.minimumSlaveAge} this week, giving ${him} an immense boost to both popularity and price.`;
			} else if (slave.birthWeek < 4) {
				r += ` This is still the first month in which it's legal to pay to fuck ${him}, giving ${him} a boost to both popularity and price.`;
			}
		} else if (slave.physicalAge === V.fertilityAge && canGetPregnant(slave) && (arcologyInfo.fsActive('FSRepopulationFocus') || arcologyInfo.fsActive('FSGenderFundamentalist'))) {
			if (slave.birthWeek === 0) {
				r += ` ${He} is expected to become fertile soon, giving ${him} an immense boost to both popularity and price as citizens clamor to claim ${his} fresh womb.`;
			} else if (slave.birthWeek < 4) {
				r += ` This is still the first month in which ${he} was anticipated to become fertile, and ${his} womb is still unoccupied, giving ${him} a boost to both popularity and price.`;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function mentalEffects(slave) {
		if (slave.behavioralQuirk === BehavioralQuirk.SINFUL) {
			r += ` ${slave.slaveName} <span class="devotion inc">secretly enjoys</span> how utterly sinful and depraved it is for ${him} to sell ${his} body.`;
			slave.devotion += 1;
		} else if (slave.behavioralQuirk === BehavioralQuirk.CUTTING) {
			r += ` ${slave.slaveName} <span class="devotion inc">openly enjoys</span> the direct, frank language of prostitution, and delights customers with cutting remarks even as they fuck ${him}.`;
			slave.devotion += 1;
		}
		if (slave.sexualQuirk === SexualQuirk.CARING) {
			r += ` ${slave.slaveName} sees ${his} role as helping people with their sexual needs, and ${he} <span class="trust inc">trusts that ${his} place</span> in society is an important one.`;
			slave.trust += 1;
		}
		if (slave.assignment === window.Job.BROTHEL && slave.devotion > 50) {
			r += ` Being so far from your presence <span class="mediumorchid">weakens ${his} intense devotion to you.</span>`;
		}
	}

	/**
	 * @param {FC.ReportSlave} slave
	 */
	function physicalEffects(slave) {
		let injury = 0;

		if (slave.health.illness > 0 || slave.health.tired > 60) {
			r += ` ${He} is<span class="health dec">`;
			if (slave.health.illness === 1) {
				r += ` feeling under the weather`;
			} else if (slave.health.illness === 2) {
				r += ` somewhat ill`;
			} else if (slave.health.illness === 3) {
				r += ` sick`;
			} else if (slave.health.illness === 4) {
				r += ` very sick`;
			} else if (slave.health.illness === 5) {
				r += ` terribly ill`;
			}
			if (slave.health.illness > 0 && slave.health.tired > 60) {
				r += ` and`;
			}
			if (slave.health.tired > 90) {
				r += ` exhausted`;
			} else if (slave.health.tired > 60) {
				r += ` fatigued`;
			}
			r += `,</span> hindering ${his} ability to attract and please customers.`;
		}
		if (slave.assignment === Job.BROTHEL) {
			if (slaveResting(slave)) {
				r += ` ${He} spends reduced hours working ${V.brothelName} in order to <span class="health inc">offset ${his} lack of rest.</span>`;
			} else if (slave.health.tired + 15 >= 90 && !willWorkToDeath(slave)) {
				r += ` ${He} attempts to refuse customers due to ${his} exhaustion, but can do little to stop it or the resulting `;
				if (V.MadamID !== 0) {
					r += `<span class="trust dec">severe punishment</span> by ${S.Madam.slaveName}. ${His} <span class="devotion dec">outbursts</span> are kept in check by your watchful Madam, preventing the customers from ever becoming aware of them while keeping ${him} productive.`;
				} else {
					r += `<span class="trust dec">severe punishment.</span> ${He} <span class="devotion dec">purposefully underperforms,</span> choosing ${his} overall well-being over the consequences, <span class="reputation dec">aggravating customers and damaging the establishment's image.</span>`;
					repX(forceNeg(50), "disobedience", slave);
				}
				slave.devotion -= 10;
				slave.trust -= 5;
			} else {
				r += ` It takes effort to be a productive whore and ${he} ends ${his} shifts <span class="health dec">eager for sleep.</span>`;
			}
			tired(slave);
		} else if (slave.assignment === Job.WHORE) {
			if (slaveResting(slave)) {
				r += ` ${He} spends reduced hours plying ${his} trade in order to <span class="health inc">offset ${his} lack of rest.</span>`;
			} else if (slave.health.tired + 15 >= 90 && !willWorkToDeath(slave)) {
				r += ` ${He} attempts to refuse to whore due to ${his} exhaustion, but can do little to avoid it or the resulting `;
				if (V.brothel > 0 && V.universalRulesFacilityWork === 1 && V.brothelSpots > 0 && V.MadamID !== 0) {
					r += `<span class="trust dec">severe punishment</span> by ${S.Madam.slaveName}. ${His} <span class="devotion dec">outbursts</span> are kept in check by your watchful Madam, preventing the customers from ever becoming aware of them and keeping ${him} productive.`;
				} else {
					r += `<span class="trust dec">severe punishment.</span> ${He} <span class="devotion dec">purposefully underperforms,</span> choosing ${his} overall well-being over the consequences, <span class="reputation dec">causing a scene and damaging the image of your whores.</span>`;
					repX(forceNeg(100), "disobedience", slave);
				}
				slave.devotion -= 10;
				slave.trust -= 5;
			} else {
				r += ` It takes effort to be an effective prostitute and ${he} ends ${his} shifts <span class="health dec">eager for sleep.</span>`;
			}
			tired(slave);
		}

		if (slave.assignment !== window.Job.BROTHEL) {
			if (slave.curatives > 0 || slave.inflationType === InflationLiquid.CURATIVE) {
				r += ` The drugs `;
				if (slave.inflationType === InflationLiquid.CURATIVE) {
					r += `${he} holds inside ${his} belly`;
				} else {
					r += `${he}'s on`;
				}
				r += ` protect ${him} from the wear of whoring.`;
			} else if (slave.health.condition < -50) {
				r += ` The stress of whoring while in terrible condition is <span class="health dec">very hard on ${him}.</span>`;
				healthDamage(slave, 13);
				injury = 1;
			} else if (slave.health.condition < -20 && jsRandom(1, 100) > 50) {
				r += ` The stress of whoring while in poor condition is <span class="health dec">hard on ${him}.</span>`;
				healthDamage(slave, 10);
				injury = 1;
			} else {
				let canA = canDoAnal(slave) ? 1 : 0;
				let canV = canDoVaginal(slave) ? 1 : 0;
				let canP = canPenetrate(slave) && penetrativeSocialUse(slave) >= 40 ? 1 : 0;
				let skillTarget = 100 +
					(
						(slave.skill.anal - 100) * canA * [0, 6, 4, 3][canA + canV + canP] + // 100 -> 0, 600, 400, 300
						(slave.skill.vaginal - 100) * canV * [0, 6, 4, 3][canA + canV + canP] + // 100 -> 0, 600, 400, 300
						(slave.skill.penetrative - 100) * canP * [0, 6, 4, 3][canA + canV + canP] + // 100 -> 0, 600, 400, 300
						(slave.skill.oral - 100) * [12, 6, 4, 3][canA + canV + canP] // 100 -> 1200, 600, 400, 300
					) / 12 * .9;
				// Complicated, I know - but it should automatically account for what acts are possible to scale the injury risk smoothly between 90% when totally unskilled
				// and 0% when perfectly skilled in the relevant method or methods.

				if (jsRandom(1, 100) > skillTarget) {
					healthDamage(slave, 10 - 7 * canA * (canV | canP));		// Any limitations means an injury inflicts the harsher 10 instead of 3
					injury = 1;
				}

				if (canA + canV + canP < 2){
					if (slave.vagina < 0) {
						if (!injury) {
							r += ` ${He}'s such an expert whore that ${he} copes with the stress of being a ${SlaveTitle(slave)} slut.`;
						} else {
							r += ` The stress of being a ${SlaveTitle(slave)} prostitute is <span class="health dec">hard on ${him}.</span>`;
						}
					} else if (canA) {
						if (!injury) {
							r += ` ${He}'s such an expert whore that ${he} copes with the stress of being limited to buttsex and oral.`;
						} else {
							r += ` The stress of being limited to buttsex and oral is <span class="health dec">hard on ${him}.</span>`;
						}
					} else if (canV) {
						if (!injury) {
							r += ` ${He}'s such an expert whore that ${he} copes with the stress of being limited to vaginal and oral.`;
						} else {
							r += ` The stress of being limited to vaginal and oral is <span class="health dec">hard on ${him}.</span>`;
						}
					} else if (canP) {
						if (!injury) {
							r += ` ${He}'s such an expert whore that ${he} copes with the stress of being limited to penetrative and oral.`;
						} else {
							r += ` The stress of being limited to penetrative and oral is <span class="health dec">hard on ${him}.</span>`;
						}
					} else if (canA + canV + canP === 0) {
						if (!injury) {
							r += ` ${He}'s such an expert whore that ${he} copes with the stress of being limited to oral.`;
						} else {
							r += ` The stress of being limited to oral sex is <span class="health dec">hard on ${him}.</span>`;
						}
					}
				}
			}
			if (injury === 1) {
				let injuryChance;
				if (canDoAnal(slave)) {
					injuryChance = jsRandom(1, 100);
				} else {
					injuryChance = jsRandom(1, 80);
				}
				if (injuryChance > 80) {
					slave.minorInjury = "sore ass";
					r += ` Rough anal with a careless customer left ${him} with a <span class="health dec">${slave.minorInjury}.</span>`;
					r += minorInjuryResponse(slave);
				} else if (injuryChance > 60) {
					slave.minorInjury = "black eye";
					r += ` A violent customer left ${him} with a <span class="health dec">${slave.minorInjury}.</span>`;
					r += minorInjuryResponse(slave);
				} else if (injuryChance > 40) {
					slave.minorInjury = "split lip";
					r += ` An abusive customer left ${him} with a <span class="health dec">${slave.minorInjury}.</span>`;
					r += minorInjuryResponse(slave);
				} else if (injuryChance > 20) {
					slave.minorInjury = "bad bruise";
					r += ` A rough customer left ${him} with a <span class="health dec">${slave.minorInjury}.</span>`;
					r += minorInjuryResponse(slave);
				} else {
					slave.minorInjury = "sore muscle";
					r += ` The hard labor of constant sex left ${him} with a <span class="health dec">${slave.minorInjury}.</span>`;
				}
			}
		}

		if (canDoVaginal(slave)) {
			if (slave.vagina === 0) {
				if (slave.aphrodisiacs > 1 || slave.inflationType === InflationLiquid.APHRO) {
					r += ` ${His} virginity goes to the highest bidder, earning ${cashFormat(beauty * 10)}. ${He}'s so full of aphrodisiacs that ${he} <span class="devotion inc">enjoys the experience.</span> <span class="virginity loss">${His} pussy is now broken in.</span>`;
					slave.devotion += 4;
					slave.vagina = 1;
				} else if (slave.devotion > 20) {
					r += ` ${His} virginity goes to the highest bidder, earning ${cashFormat(beauty * 10)}. Losing ${his} virginity in this way <span class="devotion inc">confirms ${his} submission to you.</span> <span class="virginity loss">${His} pussy is now broken in.</span>`;
					slave.devotion += 4;
					slave.vagina = 1;
				} else {
					r += ` ${His} virginity goes to the highest bidder, earning ${cashFormat(beauty * 10)}. ${He} tries to resist, and losing ${his} virginity to a rape makes ${him} <span class="devotion dec">hate</span> and <span class="trust dec">fear</span> you a great deal. <span class="virginity loss">${His} pussy is now broken in.</span>`;
					slave.devotion -= 10;
					slave.trust -= 10;
					slave.vagina = 1;
				}
			} else if (V.seeStretching === 1 && slave.vagina < 3) {
				if (jsRandom(1, 100) > ((170 - beauty) + (slave.vagina * 10) + (slave.skill.vaginal / 3))) {
					r += ` <span class="change positive">${His} pussy gets loosened by the intense use.</span>`;
					slave.vagina += 1;
				}
			}
		}

		if (canDoAnal(slave)) {
			if (slave.anus === 0) {
				if (slave.aphrodisiacs > 1 || slave.inflationType === InflationLiquid.APHRO) {
					r += ` ${His} tight little anus goes to the highest bidder, earning ${cashFormat(beauty * 5)}. ${He}'s so full of aphrodisiacs that ${he} <span class="devotion inc">enjoys the experience.</span> ${His} fresh asshole is fucked all week, and by the end of it <span class="virginity loss">${he} won't sit down.</span>`;
					slave.devotion += 4;
					slave.anus = 2;
				} else if (slave.devotion > 20) {
					r += ` ${His} tight little anus goes to the highest bidder, earning ${cashFormat(beauty * 5)}. The pain and humiliation <span class="devotion inc">confirm ${his} submission to you.</span> ${His} fresh asshole is fucked all week, and by the end of it <span class="virginity loss">${he} won't sit down.</span>`;
					slave.devotion += 4;
					slave.anus = 2;
				} else {
					r += ` ${His} tight little anus goes to the highest bidder, earning ${cashFormat(beauty * 5)}. The pain and humiliation increases ${his} <span class="devotion dec">hatred</span> and <span class="trust dec">fear</span> for you. ${His} fresh asshole is fucked all week, and by the end of it <span class="virginity loss">${he} won't sit down.</span>`;
					slave.devotion -= 5;
					slave.trust -= 5;
					slave.anus = 2;
				}
			} else if (V.seeStretching === 1 && slave.anus < 3) {
				if (slave.vagina < 0) {
					if (jsRandom(1, 100) > ((150 - beauty) + (slave.anus * 10) + (slave.skill.anal / 6))) {
						r += ` <span class="change positive">${His} asshole sees constant use in place of a pussy and loosens.</span>`;
						slave.anus += 1;
					}
				} else if (!canDoVaginal(slave)) {
					if (jsRandom(1, 100) > ((150 - beauty) + (slave.anus * 10) + (slave.skill.anal / 6))) {
						r += ` <span class="change positive">${His} asshole sees constant use in place of ${his} protected pussy and loosens.</span>`;
						slave.anus += 1;
					}
				} else {
					if (jsRandom(1, 100) > ((160 - beauty) + (slave.anus * 10) + (slave.skill.anal / 6))) {
						r += ` <span class="change positive">${His} asshole loosens with constant use.</span>`;
						slave.anus += 1;
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function slaveSkills(slave) {
		let skillIncrease;
		if (!App.Data.Careers.General.whore.includes(slave.career) && slave.skill.whore < Constant.MASTERED_XP) {
			slave.skill.whore += jsRandom(1, Math.ceil((slave.intelligence + slave.intelligenceImplant) / 15) + 8);
		}
		if (App.Data.Careers.General.whore.includes(slave.career)) {
			r += ` ${He} has sex work experience from ${his} life before ${he} was a slave, making ${him} more effective.`;
		} else if (slave.skill.whore >= Constant.MASTERED_XP) {
			r += ` ${He} has experience as a prostitute from working for you, making ${him} more effective.`;
		}

		if (!canWalk(slave)) {
			if ((V.universalRulesFacilityWork === 1 && slave.assignment === Job.WHORE && V.brothelSpots > 0) || (slave.assignment === Job.BROTHEL)) {
				r += ` Since ${he} can't walk, ${he} spends all of ${his} time in ${his} own room in ${V.brothelName}. Customers come in, fuck ${him}, and leave.`;
			} else {
				r += ` Since ${he} can't walk, ${he}'s set up so customers can use ${him}, pay and carry on their way.`;
			}
		}

		if (slave.skill.whoring >= 100) {
			r += ` As a masterful prostitute, ${he} makes more money.`;
		} else if (slave.skill.whoring > 60) {
			r += ` As an expert prostitute, ${he} gets more money out of customers.`;
		} else if (slave.skill.whoring > 30) {
			r += ` As a skilled prostitute, ${he} gets a little more money out of customers.`;
		}
		if (!isAmputee(slave)) {
			if (slave.skill.whoring < 100) {
				slave.skill.whoring += 10 + Math.floor((slave.intelligence + slave.intelligenceImplant) / 32);
				r += ` ${He} <span class="skill inc">gains experience as a prostitute,</span> and gets better at `;
				if (slave.skill.whoring <= 30) {
					r += `basic street smarts.`;
				} else if (slave.skill.whoring <= 60) {
					r += `steering clients to more lucrative sex acts.`;
				} else {
					r += `squeezing johns for every penny.`;
				}
			}
			if (slave.skill.entertainment < 50 && App.EndWeek.saVars.effectiveWhoreClass[slave.ID] > 2) {
				slave.skill.entertainment += Math.floor(2.5 + (slave.intelligence + slave.intelligenceImplant) / 64);
				r += ` ${He} learns a little about how to better <span class="skill inc">entertain</span> ${his} classy clients.`;
			}
		}

		if (slave.aphrodisiacs > 1 || slave.inflationType === InflationLiquid.APHRO) {
			r += ` The aphrodisiac cocktail has ${him} so desperately horny that regardless of ${his} personal feelings, ${he} <span class="devotion inc">gets off with customers all week.</span> In ${his} drug-addled state ${he} doesn't remember enough to learn sexual skills.`;
			slave.devotion += 4;
		} else if (slave.devotion <= 20 && slave.energy <= 95) {
			if (slave.trust >= -20) {
				r += ` ${He} tries to refuse being sold as a whore, so ${he} is restrained for sale. ${He} loses a bit of ${himself} to a week of rape, but remembers enough to know <span class="devotion dec">you're responsible,</span> and <span class="trust dec">can force ${him} if necessary.</span>`;
				slave.devotion -= 5;
				slave.trust -= 5;
			} else {
				r += ` ${He} doesn't show much enthusiasm, but the habit of sexual prostitution <span class="devotion inc">wears away at ${his} will.</span>`;
				slave.devotion += 4;
			}
		} else {
			if ((slave.skill.oral >= 100) && ((slave.skill.anal >= 100) || !canDoAnal(slave)) && ((slave.skill.vaginal >= 100) || !canDoVaginal(slave))) {
				r += ` ${He}'s a <span class="skill">sexual master</span> `;
				if (canDoVaginal(slave)) {
					r += `whose`;
				} else {
					r += `and despite `;
					if (slave.vagina < 0) {
						r += `${his} lack of a`;
					} else {
						r += `the inaccessibility of ${his}`;
					}
					r += ` front hole, ${his}`;
				}
				r += ` body commands <span class="cash inc">a high price.</span> When ${he}'s not `;
				if (canDoVaginal(slave) && jsRandom(1, 4) === 1) {
					r += `pleasing the rich with ${his} `;
					if (slave.prestige > 1 || slave.porn.prestige > 2) {
						r += `prestigious`;
					} else {
						r += `popular`;
					}
					r += ` pussy,`;
				} else if (adjustedPenSkill(slave, true) >= 100 && canPenetrate(slave) && jsRandom(1, 3) === 1) {
					r += `plunging ${his} `;
					if (slave.prestige > 1 || slave.porn.prestige > 2) {
						r += `coveted`;
					} else {
						r += `renowned`;
					}
					r += ` cock into some wealthy hole,`;
				} else if (beauty > 70 && jsRandom(1, 3) === 1) {
					r += `getting gangbanged,`;
				} else if (jsRandom(1, 2) === 1) {
					r += `performing one of ${his} `;
					if (slave.prestige > 1 || slave.porn.prestige > 2) {
						r += `famous`;
					} else {
						r += `top-tier`;
					}
					r += ` blowjobs,`;
				} else if (canDoAnal(slave)) {
					r += ` selling access to ${his} `;
					if (slave.prestige > 1 || slave.porn.prestige > 2) {
						r += `legendary`;
					} else {
						r += `notorious`;
					}
					r += ` anus,`;
				} else {
					r += ` pleasing the masses with ${his} chest,`;
				}
				r += ` ${he} works social gatherings and high society.`;
			} else {
				r += ` ${He} shows diligence, and ${his} <span class="skill inc">sexual skills improve,</span> according to what the customers demand`;
				if (!canDoVaginal(slave)) {
					r += ` and what's possible for ${him}`;
				}
				r += `.`;
				skillIncrease = (5 + Math.floor((slave.intelligence + slave.intelligenceImplant) / 32) + V.oralUseWeight);
				r += ` ${slaveSkillIncrease('oral', slave, skillIncrease)}`;
				if (canDoVaginal(slave)) {
					skillIncrease = (5 + Math.floor((slave.intelligence + slave.intelligenceImplant) / 32) + V.vaginalUseWeight);
					r += ` ${slaveSkillIncrease('vaginal', slave, skillIncrease)}`;
				}
				if (canDoAnal(slave)) {
					skillIncrease = (5 + Math.floor((slave.intelligence + slave.intelligenceImplant) / 32) + V.analUseWeight);
					r += ` ${slaveSkillIncrease('anal', slave, skillIncrease)}`;
				}
				if (canPenetrate(slave) || random(1, 100) < penetrativeSocialUse(slave)) {
					skillIncrease = (5 + Math.floor((slave.intelligence + slave.intelligenceImplant) / 32) + V.penetrativeUseWeight);
					r += ` ${slaveSkillIncrease('penetrative', slave, skillIncrease)}`;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function publicReactions(slave) {
		if ((slave.rules.release.masturbation === 0 && !App.Utils.hasFamilySex(slave) && slave.rules.release.slaves === 0) && slave.rules.reward !== "orgasm") {
			r += ` ${He}'s a better whore because prostitution is ${his} main sexual outlet.`;
		}

		if (totalRelatives(slave) > 0) {
			let children = V.slaves.filter((s) => areRelated(slave, s) && (s.assignment === slave.assignment));
			if (children.length > 1) {
				r += ` Since ${his} relatives, ${toSentence(children.map(s => s.slaveName))}, are selling themselves too, ${he} earns extra ¤ by working with them.`;
			} else if (children.length > 0) {
				const relativePronouns = getPronouns(children[0]);
				r += ` Since ${his} ${relativeTerm(slave, children[0])}, ${children[0].slaveName}, is selling ${relativePronouns.objectReflexive} too, ${he} earns extra ¤ by working with ${relativePronouns.object}.`;
			}
			if (children.length > 0) {
				if (arcology.FSEgyptianRevivalist > 20) {
					r += ` Customers are very enthusiastic about being able to participate in incestuous sex like the ancient Egyptians.`;
				} else if (arcology.FSEgyptianRevivalistIncestPolicy === 1) {
					r += ` Customers are very enthusiastic about being able to participate in incestuous sex.`;
				}
			}
		}
		if (slave.relationship > 0) {
			const partner = getSlave(slave.relationshipTarget);
			if (partner && slave.assignment === partner.assignment) {
				r += ` ${His} ${relationshipTerm(slave)} ${partner.slaveName} is also whoring, so ${he} earns a bit more.`;
			}
		} else if (slave.relationship === -1) {
			r += ` ${He} relies on citizens' desire to fuck ${him} for emotional support, making ${him} an excellent, if occasionally disturbing, whore.`;
		}
		if (slave.rivalry !== 0) {
			const rival = getSlave(slave.rivalryTarget);
			if (rival && slave.assignment === rival.assignment) {
				r += ` ${He} earns a little less ¤ due to bickering with ${rival.slaveName}.`;
			}
		}

		if (slave.minorInjury !== 0) {
			r += ` ${He} attracts fewer people due to ${his} minor injury.`;
		}

		if ((slave.hears === -1 && slave.earwear !== "hearing aids") || (slave.hears === 0 && slave.earwear === "muffling ear plugs") || (slave.hears === -2)) {
			r += ` ${His} trouble hearing causes ${him} to often not recognize ${he}'s being picked up, missing out on partners.`;
		}

		if (canTalk(slave)) {
			if (arcologyInfo.fsActive('FSSlaveProfessionalism') && slave.accent > 1) {
				r += ` ${His} butchery of the local tongue drives away potential customers.`;
			} else if (slave.voice > 2) {
				if (slave.voiceImplant > 0) {
					r += ` ${His} high-pitched bimbo voice makes it easier for ${him} to entice potential customers.`;
				} else {
					r += ` ${His} high, girly voice makes it easier for ${him} to entice potential customers.`;
				}
			} else if (slave.voice === 1) {
				r += ` Most potential customers find ${his} deep voice unattractive, making it harder for ${him} to entice them.`;
			}
		}

		const modScore = SlaveStatsChecker.modScore(slave);
		if (arcology.FSTransformationFetishist > 20 || arcology.FSDegradationist > 20) {
			if ((modScore.total > 15) || (modScore.piercing > 8 && modScore.tat > 5)) {
				r += ` Many customers fetishize body mods and consider ${hers} fascinating.`;
			} else if (modScore.total > 7) {
				r += ` Many customers fetishize body mods and consider ${hers} interesting.`;
			}
		} else if (arcology.FSBodyPurist > 20 || arcology.FSPaternalist > 20) {
			if (modScore.total <= 7) {
				r += ` Many customers disapprove of body mods and are pleased that ${he}'s unspoiled in that regard.`;
			} else {
				r += ` Many customers disapprove of body mods and consider ${hers} unappealing.`;
			}
		} else {
			if ((modScore.total > 15) || (modScore.piercing > 8 && modScore.tat > 5)) {
				r += ` ${He} has so much body art that most customers don't think ${he} needs any more.`;
			} else if (slave.piercing.corset.weight !== 0 || modScore.piercing >= 3 || modScore.tat >= 2) {
				r += ` ${His} body art helps attract customers.`;
			}
		}

		if (slave.aphrodisiacs > 1 || (slave.inflationType === InflationLiquid.APHRO && slave.inflation > 1)) {
			r += ` On such a heavy aphrodisiac dose, ${he} can't wait for each customer to fuck ${him}.`;
			if (slave.inflationType === InflationLiquid.APHRO && canDoAnal(slave)) {
				r += ` Which is practically nonstop, as anyone that fucks ${his} ass gets a hit of the aphrodisiacs within ${his} belly.`;
			}
		} else if (slave.aphrodisiacs > 0 || (slave.inflationType === InflationLiquid.APHRO)) {
			r += ` On aphrodisiacs, ${he} climaxes with every customer.`;
			if (slave.inflationType === InflationLiquid.APHRO && canDoAnal(slave)) {
				r += ` Which happens often, as anyone that fucks ${his} ass gets a tiny hit of the aphrodisiacs within ${his} belly.`;
			}
		} else if (slave.devotion > 95) {
			r += ` ${He}'s so devoted that ${he} does ${his} best and pleases every customer.`;
		} else if (slave.devotion > 50) {
			r += ` ${He}'s so devoted that ${he} works hard to please customers.`;
		} else if (slave.trust < -20) {
			r += ` ${He}'s afraid of you, so ${he} works hard to please customers.`;
		} else {
			r += ` ${He} neither loves nor fears you enough to work hard, and makes a poor whore.`;
		}

		if (slave.butt > 4 && slave.boobs > 800) {
			if (arcologyInfo.fsActive('FSAssetExpansionist')) {
				r += ` ${He} makes a river of ¤ with ${his} huge, fashionable assets.`;
				if (canTalk(slave)) {
					if (slave.voice > 2) {
						r += ` ${His} high voice contributes to ${his} bimbo image, so ${he} does even better.`;
					}
				}
			} else if (arcology.FSSlimnessEnthusiast >= 20) {
				r += ` ${He} makes no extra ¤ with ${his} large assets since many citizens consider them disgusting.`;
			} else {
				r += ` ${He} receives extra ¤ for having huge assets.`;
			}
			if (arcologyInfo.fsActive('FSGenderRadicalist')) {
				if (slave.dick > 0) {
					r += ` Society's appetite for stacked whores with dicks makes ${him} especially profitable.`;
				}
			}
		}

		if (arcologyInfo.fsActive('FSPetiteAdmiration')) {
			if (heightPass(slave)) {
				r += ` ${His} adorably petite stature attracts additional customers.`;
			} else if (slave.height >= 170) {
				r += ` ${His} tall stature turns off potential costumers.`;
			}
		} else if (arcologyInfo.fsActive('FSStatuesqueGlorification')) {
			if (heightPass(slave)) {
				r += ` ${His} gloriously tall stature attracts additional customers.`;
			} else {
				r += ` ${His} short stature turns off potential costumers.`;
			}
		}

		if (slave.visualAge >= 30) {
			if (arcologyInfo.fsActive('FSMaturityPreferentialist')) {
				r += ` ${His} mature body is very fashionable.`;
			} else if (arcologyInfo.fsActive('FSYouthPreferentialist')) {
				r += ` ${His} old body is badly out of fashion.`;
			}
		} else {
			if (arcologyInfo.fsActive('FSYouthPreferentialist')) {
				r += ` ${His} youthful body is very fashionable.`;
			} else if (arcologyInfo.fsActive('FSMaturityPreferentialist')) {
				r += ` ${His} young body is out of fashion.`;
			}
		}
		if (slave.geneticQuirks.progeria === 2 && slave.physicalAge >= 45) {
			r += ` ${His} advanced progeria reduces ${his} overall energy in bed.`;
		} else if (slave.geneticQuirks.neoteny === 2 && slave.visualAge < V.minimumSlaveAge) {
			r += ` ${His} neotenic features lead some to believe it is not actually legal to fuck ${him}.`;
		}

		if (arcology.FSGenderFundamentalistLawBeauty + arcology.FSGenderRadicalistLawBeauty > 0) {
			if (genderLawPass(slave) === 1) {
				if (arcologyInfo.fsActive('FSAssetExpansionist')) {
					r += ` ${He} makes extra ¤ due to ${his} fashionably feminine body.`;
				} else {
					r += ` ${He} receives extra ¤ for having a sleek, girlish figure.`;
				}
				if (canTalk(slave) && slave.voice > 2) {
					r += ` ${His} high voice contributes to ${his} girlish image, so ${he} does even better.`;
				}
			}
		} else if (arcology.FSSlimnessEnthusiastLaw === 1) {
			if (slimLawPass(slave) === 1) {
				r += ` ${He} makes extra ¤ due to ${his} fashionably sleek little body.`;
				if (canTalk(slave) && slave.voice > 2) {
					r += ` ${His} high voice contributes to ${his} girlish image, so ${he} does even better.`;
				}
			}
		} else if (arcology.FSHedonisticDecadenceLaw2 === 1) {
			if (slave.boobs >= 2000 && slave.butt >= 5 && slave.weight > 95) {
				r += ` ${He} makes extra ¤ due to ${his} fashionably plump body.`;
				if (canTalk(slave) && slave.voice > 2) {
					r += ` ${His} high voice contributes to ${his} feminine image, so ${he} does even better.`;
				}
			}
		} else {
			if (slave.boobs < 500 && slave.butt < 3) {
				if (slave.muscles <= 30 && !arcologyInfo.fsActive('FSPhysicalIdealist') && slave.weight <= 10 && !arcologyInfo.fsActive('FSHedonisticDecadence')) {
					if (arcology.FSSlimnessEnthusiast > 20) {
						r += ` ${He} makes extra ¤ due to ${his} fashionably sleek little body.`;
					} else {
						r += ` ${He} receives extra ¤ for having a sleek, girlish figure.`;
					}
					if (canTalk(slave) && slave.voice > 2) {
						r += ` ${His} high voice contributes to ${his} girlish image, so ${he} does even better.`;
					}
				} else if (arcologyInfo.fsActive('FSPhysicalIdealist')) { // no muscle malus for muscle loving societies
					if ((arcology.FSPhysicalIdealistStrongFat === 1 && slave.weight <= 30) || slave.weight <= 10) { // reduced weight malus for fat loving societies
						if (arcology.FSSlimnessEnthusiast > 20) {
							r += ` ${He} makes extra ¤ due to ${his} fashionably sleek little body.`;
						} else {
							r += ` ${He} receives extra ¤ for having a sleek, girlish figure.`;
						}
						if (canTalk(slave) && slave.voice > 2) {
							r += ` ${His} high voice contributes to ${his} girlish image, so ${he} does even better.`;
						}
					}
				} else if (arcologyInfo.fsActive('FSHedonisticDecadence') && slave.weight <= 30) { // reduced weight malus for fat loving societies
					if (arcology.FSHedonisticDecadenceStrongFat === 1 || slave.muscles <= 30) { // no muscle malus for muscle loving societies
						if (arcology.FSSlimnessEnthusiast > 20) {
							r += ` ${He} makes extra ¤ due to ${his} fashionably sleek little body.`;
						} else {
							r += ` ${He} receives extra ¤ for having a sleek, girlish figure.`;
						}
						if (canTalk(slave) && slave.voice > 2) {
							r += ` ${His} high voice contributes to ${his} girlish image, so ${he} does even better.`;
						}
					}
				}
			}
		}

		if (arcology.FSIntellectualDependencyLawBeauty === 1) {
			if (bimboScore(slave) >= 6) {
				r += ` Clients are more than willing to pay extra ¤ to spend time with a complete bimbo like ${him}.`;
			}
		}

		if (slave.boobsImplant === 0 && slave.buttImplant === 0 && slave.waist >= -95 && slave.bellyImplant === -1 && slave.lipsImplant === 0 && slave.faceImplant < 30) {
			if (arcologyInfo.fsActive('FSBodyPurist')) {
				r += ` With ${his} all-natural, implant free appearance, ${he}'s very profitable.`;
			} else if (arcology.FSTransformationFetishist >= 20) {
				r += ` Customers are disappointed by ${his} all-natural, implant free appearance.`;
			} else {
				r += ` Some discerning customers appreciate ${his} all-natural, implant free appearance.`;
			}
		} else {
			if (arcologyInfo.fsActive('FSTransformationFetishist')) {
				r += ` The public is willing to pay more for ${his} augmented body.`;
			}
		}

		if (slave.nipples === NippleShape.FUCKABLE) {
			if (arcologyInfo.fsActive('FSTransformationFetishist')) {
				r += ` ${His} fuckable nipples give ${him} a profitable edge over those without such body modifications.`;
			} else {
				r += ` ${His} fuckable nipples entice some of the more adventurous customers.`;
			}
		}

		if (slave.teeth === "removable") {
			if (V.policies.gumjobFetishism === 1) {
				r += ` The majority of the customers are quite pleased with ${his} ability to give toothless sucks and purchase time with ${his} mouth liberally.`;
			} else {
				r += ` The extra attention ${he} receives from ${his} ability to give toothless sucks is about balanced out by the customers who are disgusted by it.`;
			}
		} else if (slave.teeth === "pointy") {
			if (V.policies.gumjobFetishism === 1) {
				r += ` Most customers are quite disappointed with ${his} tooth-filled mouth, but there are a handful still interested in ${his} unusual dentistry.`;
			} else {
				r += ` The extra attention ${he} receives due to ${his} sharp teeth is balanced by the customers who are scared off by them.`;
			}
		} else if (slave.teeth === "fangs") {
			if (V.policies.gumjobFetishism === 1) {
				r += ` Most customers are quite disappointed with ${his} tooth-filled mouth, but there are a handful still interested in ${his} unusual dentistry.`;
			} else {
				r += ` The extra attention ${he} receives due to ${his} fangs is balanced by the customers who are scared off by them.`;
			}
		} else {
			if (V.policies.gumjobFetishism === 1) {
				r += ` Most customers are quite disappointed that ${his} teeth don't come out.`;
			}
		}

		if (slave.dick !== 0) {
			if (!arcologyInfo.fsActive('FSGenderRadicalist')) {
				r += ` ${He} sees fewer customers because many prefer whores without cocks.`;
			} else if (arcology.FSGenderRadicalist < 50) {
				r += ` ${His} cock entices some customers and disappoints others; it has little effect on ${his} popularity.`;
			} else {
				r += ` The overwhelming majority of potential customers consider ${his} cock an attraction.`;
			}
		}

		if (slave.muscles > 95) {
			if (arcologyInfo.fsActive('FSPhysicalIdealist')) {
				r += ` In the new culture of ${arcology.name} ${his} muscles make ${him} a very profitable whore.`;
			} else {
				r += ` ${His} muscles scare off some customers, but some pay well to enjoy a muscular whore.`;
			}
		}

		if (isAmputee(slave)) {
			r += ` Many prefer to fuck a whore with limbs, but some greatly enjoy buying the use of a helpless amputee.`;
		}

		if (slave.lactation > 0) {
			r += ` ${He} appeals to customers who like lactation play, or just want a whore they can drink milk from.`;
			slave.lactationDuration = 2;
			slave.boobs -= slave.boobsMilk;
			slave.boobsMilk = 0;
		}

		if (slave.bellyPreg >= 1500 || App.Data.misc.fakeBellies.includes(slave.bellyAccessory) || slave.bellyImplant >= 1500) {
			if (arcologyInfo.fsActive('FSRepopulationFocus')) {
				r += ` In the new culture of ${arcology.name}, ${his} pregnancy makes ${him} a profitable whore`;
				if (App.Data.misc.fakeBellies.includes(slave.bellyAccessory) || slave.bellyImplant >= 1500) {
					r += `, even if it's not real`;
				}
				r += `.`;
			} else if (arcology.FSRepopulationFocusPregPolicy === 1 && slave.bellyPreg >= 1500) {
				r += ` It's currently trendy to plow a whore laden with child, a role ${he} fits perfectly.`;
			} else if (arcologyInfo.fsActive('FSRestart')) {
				r += ` In the new culture of ${arcology.name}, ${his}`;
				if (App.Data.misc.fakeBellies.includes(slave.bellyAccessory) || slave.bellyImplant >= 1500) {
					r += ` apparent`;
				}
				r += ` pregnancy is a massive turn off to potential customers.`;
			} else if (arcologyInfo.fsActive('FSGenderFundamentalist')) {
				r += ` The new respect for traditional gender roles has given many citizens a taste for pregnant whores`;
				if (App.Data.misc.fakeBellies.includes(slave.bellyAccessory) || slave.bellyImplant >= 1500) {
					r += `, even if they only look pregnant`;
				}
				r += `.`;
			} else {
				r += ` Many customers avoid visibly pregnant whores.`;
			}
		}

		if (arcology.FSRepopulationFocusMilfPolicy === 1 && slave.counter.birthsTotal > 0) {
			r += ` Slaves that have had children are hot right now making ${him} quite the appealing MILF.`;
		}

		if (V.seeRace === 1) {
			if (slave.race === "white") {
				r += ` Many customers prefer white ${girl}s like ${slave.slaveName}.`;
			}
		}
		if (arcologyInfo.fsActive('FSSupremacist')) {
			if (slave.race !== arcology.FSSupremacistRace) {
				r += ` Some citizens fetishize whores of the servile races.`;
			}
		}
		if (arcologyInfo.fsActive('FSSubjugationist')) {
			if (slave.race === arcology.FSSubjugationistRace) {
				r += ` Many prefer to use and abuse whores of the proper slave race.`;
			}
		}
		if (arcologyInfo.fsActive('FSEdoRevivalist')) {
			if (slave.nationality === "Japanese" || slave.nationality === "Edo Revivalist") {
				r += ` As a proper Japanese ${girl}, ${he} is considered extremely desirable.`;
			}
		} else if (arcologyInfo.fsActive('FSChineseRevivalist')) {
			if (slave.nationality === "Chinese" || slave.nationality === "Ancient Chinese Revivalist") {
				r += ` As a proper Chinese ${girl}, ${he} is considered extremely desirable.`;
			}
		}

		if (arcologyInfo.fsActive('FSSlaveProfessionalism')) {
			if (slave.intelligence + slave.intelligenceImplant > 50) {
				r += ` ${His} intelligence satisfies customers looking for more than just a hole to fuck.`;
			} else if (slave.intelligence + slave.intelligenceImplant < -10) {
				r += ` ${His} stupidity aggravates customers looking for more than just a hole to fuck.`;
			}
		} else if (arcologyInfo.fsActive('FSIntellectualDependency')) {
			if (slave.intelligence + slave.intelligenceImplant > 10) {
				r += ` ${His} intellectual baggage annoys customers looking for a simple fuck.`;
			} else if (slave.intelligence + slave.intelligenceImplant < -50) {
				r += ` ${His} simplicity makes ${him} pliable and ready to try anything with a customer.`;
			}
		} else if (slave.intelligence + slave.intelligenceImplant > 15) {
			r += ` ${His} intelligence gives ${him} an advantage at the business of selling ${his} body.`;
		} else if (slave.intelligence + slave.intelligenceImplant < -15) {
			r += ` ${His} stupidity gives ${him} a handicap at the business of selling ${his} body.`;
		}

		if (slave.prestige > 0) {
			r += ` ${He} attracts more attention because it's prestigious to fuck ${him}.`;
		}

		if (slave.porn.prestige > 2) {
			r += ` Customers line up for the chance to buy time with the face of ${slave.porn.fameType} porn.`;
		} else if (slave.porn.prestige > 1) {
			r += ` ${He} has a sizable fanbase, one that is eager to buy time with ${him}.`;
		} else if (slave.porn.prestige > 0) {
			r += ` A few of ${his} fans recognize ${him} and eagerly patronize ${him}.`;
		}

		if (slave.piercing.genitals.smart && slave.devotion >= -20) {
			r += ` Almost everyone loves ${his} enthusiasm for sex encouraged by ${his} smart piercing.`;
		} else if (slave.piercing.genitals.smart) {
			r += ` Almost everyone appreciates ${his} reduced reluctance towards sex encouraged by ${his} smart piercing.`;
		}

		if (slave.fetishKnown === 1 && slave.fetishStrength > 60) {
			switch (slave.fetish) {
				case Fetish.SUBMISSIVE:
					r += ` ${He} gets more ¤ for ${his} eagerness to submit.`;
					break;
				case Fetish.CUMSLUT:
					r += ` ${He} gets more ¤ for ${his} enjoyment of cum.`;
					break;
				case Fetish.HUMILIATION:
					r += ` ${He} gets more ¤ for ${his} eagerness to be humiliated by citizens.`;
					break;
				case Fetish.BUTTSLUT:
					if (canDoAnal(slave)) {
						r += ` ${He} gets more ¤ for ${his} obvious enjoyment of buttsex.`;
					}
					break;
				case Fetish.DOM:
					r += ` ${He} gets more ¤ for ${his} enthusiasm dominating other slaves in group sex.`;
					break;
				case Fetish.MASOCHIST:
					r += ` ${He} gets more ¤ for ${his} obvious enjoyment of pain.`;
					break;
				case Fetish.BOOBS:
					r += ` ${He} receives more ¤ for ${his} eagerness to get some hands on ${his} chest.`;
					break;
				case Fetish.SADIST:
					r += ` ${He} gets some more ¤ for ${his} willingness to abuse other slaves.`;
					break;
				case Fetish.PREGNANCY:
					if (slave.mpreg === 0) {
						if (slave.vagina > 0 && canDoVaginal(slave)) {
							r += ` As an impregnation fetishist ${he}'s very enthusiastic about vaginal sex.`;
						}
					} else {
						if (slave.anus > 0 && canDoAnal(slave)) {
							r += ` As an impregnation fetishist ${he}'s very enthusiastic about anal sex.`;
						}
					}
					break;
				case Fetish.MINDBROKEN:
					r += ` ${He} gets less ¤ because ${he} just lies there, totally unresponsive.`;
					break;
			}
		}

		let needText = ``;
		if (slave.energy > 95) {
			needText = ` As a nymphomaniac ${he} gets sexual release from every transaction and is wildly successful.`;
			slave.need -= beauty;
		} else if (slave.energy > 80) {
			needText = ` With ${his} powerful sex drive ${he} rarely has to fake an orgasm.`;
			slave.need -= (beauty * 0.9);
		} else if (slave.aphrodisiacs > 0 || slave.inflationType === InflationLiquid.APHRO) {
			needText = ` With ${his} aphrodisiac boosted libido, it's barely possible to discern ${him} from a natural nymphomaniac.`;
			slave.need -= (beauty * 0.9);
		} else if (slave.energy > 60) {
			needText = ` With ${his} good sex drive ${he} often orgasms with customers.`;
			slave.need -= (beauty * 0.8);
		} else if (slave.energy > 40) {
			needText = ` With ${his} average sex drive ${he} occasionally orgasms with customers.`;
			slave.need -= (beauty * 0.5);
		} else if (slave.energy > 20) {
			needText = ` With ${his} poor sex drive ${he} almost never orgasms with customers.`;
			slave.need -= (beauty * 0.1);
		} else {
			needText = ` Since ${he}'s frigid, ${he} rarely experiences authentic arousal at work.`;
		}
		if (slave.attrKnown === 1) {
			r += needText;
			if (slave.attrXY <= 15) {
				if (slave.attrXX <= 15) {
					r += ` ${His} general disgust with sex makes ${him} a very poor whore.`;
				} else if (slave.attrXX <= 85) {
					r += ` ${His} sexual disgust with men makes ${him} a poor whore.`;
				} else if (slave.attrXX <= 95) {
					r += ` ${His} sexual disgust with men hinders ${him}, though ${he} is more enthusiastic with female customers.`;
				} else {
					r += ` ${His} sexual disgust with men hinders ${him}, though ${he} makes up for it with female customers.`;
				}
			} else if (slave.attrXY <= 85) {
				if (slave.attrXX <= 15) {
					r += ` ${His} sexual disgust with women makes ${him} a poor whore.`;
				} else if (slave.attrXX <= 85) {
					r += ` ${His} indifference to men and women makes ${him} a poor whore.`;
				} else if (slave.attrXX <= 95) {
					r += ` ${His} sexual indifference to men hinders ${him}, though ${he} is more enthusiastic with female customers.`;
				} else {
					r += ` ${His} sexual indifference to men hinders ${him}, though ${he} makes up for it with female customers.`;
				}
			} else if (slave.attrXY <= 95) {
				if (slave.attrXX <= 15) {
					r += ` ${His} sexual disgust with women hinders ${him}, though ${he} makes up for it with male customers.`;
				} else if (slave.attrXX <= 85) {
					r += ` ${His} sexual indifference to women hinders ${him}, though ${he} makes up for it with male customers.`;
				} else if (slave.attrXX <= 95) {
					r += ` ${He} has the advantage of sexual sincerity with both men and women.`;
				} else {
					r += ` ${He}'s a good slut with male customers, and truly enthusiastic with women.`;
				}
			} else {
				if (slave.attrXX <= 15) {
					r += ` ${His} sexual disgust with women hinders ${him}, though ${he} is enthusiastic with male customers.`;
				} else if (slave.attrXX <= 85) {
					r += ` ${His} sexual indifference to women hinders ${him}, though ${he} is enthusiastic with male customers.`;
				} else if (slave.attrXX <= 95) {
					r += ` ${He}'s a good slut with female customers, and truly enthusiastic with men.`;
				} else {
					r += ` ${He}'s openly lustful towards all customers, men and women.`;
				}
			}
		}

		switch (slave.behavioralQuirk) {
			case BehavioralQuirk.CONFIDENT:
				r += ` ${He}'s better at ${his} job because ${he}'s such a confident whore.`;
				break;
			case BehavioralQuirk.CUTTING:
				r += ` ${He} gets a lot of attention for ${his} ability to joke at a customer's expense.`;
				break;
			case BehavioralQuirk.FUNNY:
				r += ` ${He} brings unintentional comic relief to the hard work of prostitution.`;
				break;
			case BehavioralQuirk.ADORESWOMEN:
				r += ` ${He}'s a favorite among female customers, whom ${he} greets with real enthusiasm.`;
				break;
			case BehavioralQuirk.ADORESMEN:
				r += ` ${He}'s a favorite among male customers, whom ${he} greets with frank and open lust.`;
				break;
			case BehavioralQuirk.FITNESS:
				r += ` ${He}'s eager to please customers because ${he} finds validation in their willingness to pay for sex with ${him}.`;
				break;
			case BehavioralQuirk.INSECURE:
				r += ` ${He} thinks of ${himself} as really beautiful, despite the occasional harshness of sex work.`;
				break;
			case BehavioralQuirk.SINFUL:
				r += ` ${He} identifies with prostitutes from the holy books, and scandalizes customers with ${his} explicit scriptural references.`;
				break;
			case BehavioralQuirk.ADVOCATE:
				r += ` ${He} reassures uncomfortable customers that prostitution isn't bad for ${him} at all.`;
				break;
		}
		switch (slave.sexualQuirk) {
			case SexualQuirk.GAGFUCK:
				r += ` ${He}'s a favorite among customers who like to throatfuck a retching whore.`;
				break;
			case SexualQuirk.PAINAL:
				if (canDoAnal(slave)) {
					r += ` ${He}'s a favorite among customers who like to assrape a struggling whore.`;
				}
				break;
			case SexualQuirk.STRUGGLE:
				r += ` ${He}'s a favorite among customers who like to wrestle with a struggling whore.`;
				break;
			case SexualQuirk.TEASE:
				r += ` Despite being a whore, ${he} somehow retains the ability to blush enticingly at nudity.`;
				break;
			case SexualQuirk.ROMANTIC:
				r += ` Despite being a whore, ${he} somehow retains the ability to make ${his} customers feel special.`;
				break;
			case SexualQuirk.PERVERT:
				r += ` ${He} enjoys unexpected, perverted requests from customers.`;
				break;
			case SexualQuirk.UNFLINCHING:
				r += ` ${He}'s impossible to disgust or surprise, pleasing customers with odd tastes.`;
				break;
			case SexualQuirk.SIZEQUEEN:
				r += ` ${He}'s very eager to spend quality time with big cocks, making ${him} a favorite among the well-endowed.`;
				break;
			case SexualQuirk.CARING:
				r += ` ${He}'s a relaxing whore to patronize, doing everything ${he} can to make ${his} customers comfortable.`;
				break;
		}

		switch (slave.behavioralFlaw) {
			case BehavioralFlaw.ARROGANT:
				r += ` ${He} receives less ¤ because ${he} treats clients like they are beneath ${his} dignity.`;
				break;
			case BehavioralFlaw.BITCHY:
				r += ` ${He} receives less ¤ because ${he} makes cutting remarks to clients.`;
				break;
			case BehavioralFlaw.ODD:
				r += ` ${He} receives less ¤ because clients are annoyed by ${his} odd behavior.`;
				break;
			case BehavioralFlaw.HATESMEN:
				r += ` ${He} receives less ¤ because ${he} can't conceal ${his} distaste for the company of men.`;
				break;
			case BehavioralFlaw.HATESWOMEN:
				r += ` ${He} receives less ¤ because ${he} can't conceal ${his} distaste for the company of women.`;
				break;
			case BehavioralFlaw.DEVOUT:
				r += ` ${He} receives less ¤ because people are annoyed by ${his} habit of praying for forgiveness during sex.`;
				break;
			case BehavioralFlaw.LIBERATED:
				r += ` ${He} receives less ¤ because people are annoyed by ${his} obvious belief that being forced to serve them is wrong.`;
				break;
		}
		switch (slave.sexualFlaw) {
			case SexualFlaw.HATESORAL:
				r += ` ${He} receives less ¤ because ${he} tries to avoid sucking cock.`;
				break;
			case SexualFlaw.HATESANAL:
				if (canDoAnal(slave)) {
					r += ` ${He} receives less ¤ because ${he} tries to avoid taking it up the ass.`;
				}
				break;
			case SexualFlaw.HATESPEN:
				r += ` ${He} receives less ¤ because ${he} tries to avoid getting fucked.`;
				break;
			case SexualFlaw.REPRESSED:
				r += ` ${He} receives less ¤ because customers who don't feel like forcing ${him} sometimes have to cajole ${him} past ${his} repressed sexuality.`;
				break;
			case SexualFlaw.IDEAL:
				r += ` ${He} receives less ¤ because customers who don't feel like forcing ${him} sometimes have to convince ${him} to have sex with them.`;
				break;
			case SexualFlaw.APATHETIC:
				r += ` ${He} receives less ¤ because ${he} often just lies there taking dick.`;
				break;
			case SexualFlaw.CRUDE:
				r += ` ${He} receives less ¤ because ${he} isn't exactly the most elegant sexual partner.`;
				break;
			case SexualFlaw.JUDGEMENT:
				r += ` ${He} receives less ¤ because ${he} openly disdains unattractive citizens.`;
				break;
			case SexualFlaw.SHAMEFAST:
				r += ` ${He} receives less ¤ because ${he} sometimes hesitates to take ${his} clothes off and get to work.`;
				break;
			case SexualFlaw.CUMADDICT:
				r += ` ${His} abject begging for cum annoys customers who aren't looking for oral, but this is more than outweighed by how much it delights those who are.`;
				break;
			case SexualFlaw.ANALADDICT:
				r += ` ${His} abject begging for buttsex annoys customers who aren't interested in fucking ${his} ass, but this is more than outweighed by how much it delights those who are.`;
				break;
			case SexualFlaw.ATTENTION:
				r += ` ${He} loses customers by ${his} constant attention seeking.`;
				break;
			case SexualFlaw.BREASTEXP:
				r += ` ${His} excessive obsession with ${his} own breasts, to the detriment of most sexual intercourse, loses customers.`;
				break;
			case SexualFlaw.ABUSIVE:
				r += ` ${He} loses customers whenever ${his} sexual abusiveness becomes apparent.`;
				break;
			case SexualFlaw.MALICIOUS:
				r += ` ${He} loses customers whenever ${his} sexual maliciousness becomes apparent.`;
				break;
			case SexualFlaw.SELFHATING:
				r += ` ${He} loses customers during the crying jags brought on by ${his} self hatred.`;
				break;
			case SexualFlaw.NEGLECT:
				r += ` The occasional customer who likes a whore to climax authentically and can tell the difference is disappointed by ${his} neglect of ${his} own pleasure, but they're rare. Most are thrilled by ${him}.`;
				break;
			case SexualFlaw.BREEDER:
				r += ` ${His} obsession with pregnancy loses customers who aren't interested in that.`;
				break;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function addFlaw(slave) {
		if (slave.devotion < 10) {
			if (jsRandom(1, 100) > 70) {
				if (slave.skill.vaginal <= 30 && canDoVaginal(slave)) {
					r += ` After being fucked too hard too often, ${he} now <span class="flaw gain">dislikes being penetrated.</span>`;
					slave.sexualFlaw = SexualFlaw.HATESPEN;
				} else if (slave.skill.anal <= 30 && canDoAnal(slave)) {
					r += ` After so much anal pain, ${he} now <span class="flaw gain">dislikes being buttfucked.</span>`;
					slave.sexualFlaw = SexualFlaw.HATESANAL;
				} else if (slave.skill.oral <= 30) {
					r += ` After one too many facials, ${he} now <span class="flaw gain">dislikes sucking cock.</span>`;
					slave.sexualFlaw = SexualFlaw.HATESORAL;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function addCash(slave) {
		cash = slave.sexAmount * FuckResult; // The standard amount of money the whore is expected to make in a week
		if (slave.assignment === window.Job.WHORE) {
			cashX(cash, "slaveAssignmentWhore", slave);
		} else if (slave.assignment === window.Job.MADAM) {
			cashX(cash, "slaveAssignmentMadam", slave);
		} else if (slave.assignment === window.Job.BROTHEL) {
			cashX(cash, "slaveAssignmentBrothel", slave);
		} else {
			cashX(cash, "whoring income in an unregistered building", slave);
		}
		incomeStats.income += cash;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function addCashText(slave) {
		r += ` In total, you were paid <span class="cash inc">${cashFormat(cash)}</span> for the use of ${slave.slaveName}'s body this week.`;
	}

	/**
	 */
	function applyFSDecoration() {
		/* FACILITY DECORATION IMPACTS */
		const fsBeauty = 0.0005 * beauty;
		FutureSocieties.DecorationBonus(V.brothelDecoration, fsBeauty);
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function sexCounts(slave) {
		/* SEX ACT COUNTS AND SEXUAL SATISFACTION */

		oralUse = (V.oralUseWeight + (slave.skill.oral / 30) + (slave.lips / 20));
		if (V.policies.gumjobFetishism === 1 && slave.teeth !== "removable") {
			oralUse = Math.max(Math.trunc(oralUse * .75), 1);
		}
		analUse = 0;
		if (canDoAnal(slave)) {
			analUse = (V.analUseWeight + (slave.skill.anal / 30) - slave.anus);
			if (analUse < 0) {
				analUse = 0;
			}
		}
		vaginalUse = 0;
		if (canDoVaginal(slave)) {
			vaginalUse = (V.vaginalUseWeight + (slave.skill.vaginal / 30) - slave.vagina);
			if (vaginalUse < 0) {
				vaginalUse = 0;
			}
		}
		mammaryUse = 0;
		// perhaps boost this for truly massive breasts
		if (slave.boobs > 10000) {
			mammaryUse = (5 + V.mammaryUseWeight);
		} else if (slave.boobs > 500) {
			mammaryUse = (V.mammaryUseWeight + (slave.boobs / 2000));
		}
		if (slave.nipples === NippleShape.FUCKABLE) {
			mammaryUse *= 2;
		}
		penetrativeUse = 0;
		if (canDoVaginal(slave) && slave.clit >= 3) {
			penetrativeUse += (V.penetrativeUseWeight + (slave.skill.vaginal / 30) + slave.clit);
		}
		if (slave.dick && slave.chastityPenis !== 1) {
			if (canPenetrate(slave)) {
				penetrativeUse += (V.penetrativeUseWeight + (slave.skill.penetrative / 30) + slave.dick + Math.min(slave.balls, 10) / 4);
				if (slave.drugs === Drug.HYPERTESTICLE) {
					penetrativeUse += Math.min(slave.balls, 5);
				}
			} else {
				penetrativeUse += (V.penetrativeUseWeight + (slave.skill.penetrative / 30) + Math.min(slave.balls, 15) + Math.min(slave.balls, 10) / 8);
				if (slave.drugs === Drug.HYPERTESTICLE) {
					penetrativeUse += Math.min(slave.balls, 5);
				}
			}
		}
		if (penetrativeSocialUse(slave) >= 20) {
			penetrativeUse += random(0, V.penetrativeUseWeight + (slave.skill.penetrative / 30));
		}

		const demand = (oralUse + analUse + vaginalUse + mammaryUse + penetrativeUse);
		oralUse = Math.trunc((oralUse / demand) * beauty);
		analUse = Math.trunc((analUse / demand) * beauty);
		vaginalUse = Math.trunc((vaginalUse / demand) * beauty);
		mammaryUse = Math.trunc((mammaryUse / demand) * beauty);
		penetrativeUse = Math.trunc((penetrativeUse / demand) * beauty);

		seX(slave, "oral", "public", "penetrative", oralUse);
		seX(slave, "anal", "public", "penetrative", analUse);
		seX(slave, "vaginal", "public", "penetrative", vaginalUse);
		seX(slave, "mammary", "public", "penetrative", mammaryUse);
		seX(slave, "penetrative", "public", "penetrative", penetrativeUse);

		cervixPump = 0;
		if (slave.cervixImplant === 1 || slave.cervixImplant === 3) {
			cervixPump += (20 * vaginalUse);
		}
		if (slave.cervixImplant === 2 || slave.cervixImplant === 3) {
			cervixPump += (20 * analUse);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function sexualSatiation(slave) {
		if (slave.need) {
			if (slave.fetishKnown) {
				switch (slave.fetish) {
					case Fetish.SUBMISSIVE:
					case Fetish.MASOCHIST:
						if (analUse + vaginalUse > 0) {
							r += ` ${He} enjoys being fucked, and got sexual satisfaction from the ${num(analUse + vaginalUse)} dicks stuck inside ${him} this week.`;
							slave.need -= (analUse + vaginalUse);
						}
						break;
					case Fetish.DOM:
					case Fetish.SADIST:
						if (penetrativeUse > 0) {
							r += ` ${He} enjoys being on top, and got special sexual satisfaction from the ${num(penetrativeUse)} times ${he} got to fuck someone this week.`;
							slave.need -= 2 * penetrativeUse;
						}
						break;
					case Fetish.CUMSLUT:
						if (oralUse > 0) {
							r += ` ${He} enjoys sucking, and got sexual satisfaction from the ${num(oralUse)} blowjobs ${he} gave this week.`;
							slave.need -= oralUse;
						}
						break;
					case Fetish.BUTTSLUT:
						if (analUse > 0) {
							r += ` ${He} enjoys getting buttfucked, and got sexual satisfaction from the ${num(analUse)} times ${he} was sodomized this week.`;
							slave.need -= analUse;
						}
						break;
					case Fetish.BOOBS:
						if (mammaryUse > 0) {
							r += ` ${He} enjoys `;
							if (slave.nipples === NippleShape.FUCKABLE) {
								r += `having ${his} tits fucked,`;
							} else {
								r += `giving a good titfuck,`;
							}
							r += ` and got sexual satisfaction from the ${num(mammaryUse)} times ${his} breasts were used this week.`;
							slave.need -= mammaryUse;
						}
						break;
					case Fetish.PREGNANCY:
						if (slave.mpreg === 0) {
							if (vaginalUse > 0) {
								r += ` ${He} enjoys having ${his} pussy fucked, and got sexual satisfaction from the ${num(vaginalUse)} times ${he} got dick this week.`;
								slave.need -= vaginalUse;
							}
						} else {
							if (analUse > 0) {
								r += ` ${He} enjoys having ${his} ass fucked, and got sexual satisfaction from the ${num(analUse)} times ${he} got dick this week.`;
								slave.need -= analUse;
							}
						}
						if (penetrativeUse > 0 && isVirile(slave) && canPenetrate(slave)) {
							r += ` ${He} got special sexual satisfaction from the times this week that ${he} wasn't required to wear a condom before dumping ${his} load in someone.`;
							slave.need -= Math.max(1, penetrativeUse * .5);
						}
						break;
					case Fetish.HUMILIATION:
						r += ` ${He} enjoys the humiliation of being a whore, and got a bit of sexual satisfaction from every sex act ${he} performed this week.`;
						slave.need -= beauty;
				}
			}
		}

		if (slave.energy.isBetween(40, 95)) {
			r += ` Being used sexually all week <span class="change positive">increases ${his} sex drive.</span>`;
			slave.energy += 1;
		}

		if (cervixPump > 0) {
			r += ` ${He} notices ${his} <span class="change positive">belly has swollen</span> from all the `;
			if (slave.cervixImplant === 1) {
				r += `vaginal`;
			} else if (slave.cervixImplant === 2) {
				r += `anal`;
			}
			r += ` sex ${he} had throughout the week.`;
			slave.bellyImplant += cervixPump;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function assignmentVignette(slave) {
		const vignette = GetVignette(slave);
		r += ` <span class="story-label">This week</span> ${vignette.text} `;
		if (vignette.type === "cash") {
			const cashVign = Math.trunc(FuckResult * vignette.effect);
			if (vignette.effect > 0) {
				r += `<span class="cash inc">making you an extra ${cashFormat(cashVign)}.</span>`;
			} else if (vignette.effect < 0) {
				r += `<span class="cash dec">losing you ${cashFormat(Math.abs(cashVign))}.</span>`;
			} else {
				r += `an incident without lasting effect.`;
			}
			if (slave.assignment === window.Job.WHORE) {
				if (vignette.effect > 0) {
					cashX(cashVign, "slaveAssignmentWhoreVign", slave);
				} else if (vignette.effect < 0) {
					cashX(forceNeg(cashVign), "slaveAssignmentWhoreVign", slave);
				}
			} else if (slave.assignment === window.Job.MADAM) {
				if (vignette.effect > 0) {
					cashX(cashVign, "slaveAssignmentMadamVign", slave);
				} else if (vignette.effect < 0) {
					cashX(forceNeg(cashVign), "slaveAssignmentMadamVign", slave);
				}
			} else if (slave.assignment === window.Job.BROTHEL) {
				if (vignette.effect > 0) {
					cashX(cashVign, "slaveAssignmentBrothelVign", slave);
				} else if (vignette.effect < 0) {
					cashX(forceNeg(cashVign), "slaveAssignmentBrothelVign", slave);
				}
			} else {
				if (vignette.effect > 0) {
					cashX(cashVign, "vignette whoring income in an unregistered building", slave);
				} else if (vignette.effect < 0) {
					cashX(forceNeg(cashVign), "vignette whoring expense in an unregistered building", slave);
				}
			}
			incomeStats.income += cashVign;
		} else if (vignette.type === "devotion") {
			if (vignette.effect > 0) {
				if (slave.devotion > 50) {
					r += `<span class="devotion inc">increasing ${his} devotion to you.</span>`;
				} else if (slave.devotion >= -20) {
					r += `<span class="devotion inc">increasing ${his} acceptance of you.</span>`;
				} else if (slave.devotion >= -50) {
					r += `<span class="devotion inc">reducing ${his} dislike of you.</span>`;
				} else {
					r += `<span class="devotion inc">reducing ${his} hatred of you.</span>`;
				}
			} else if (vignette.effect < 0) {
				if (slave.devotion > 50) {
					r += `<span class="devotion dec">reducing ${his} devotion to you.</span>`;
				} else if (slave.devotion >= -20) {
					r += `<span class="devotion dec">reducing ${his} acceptance of you.</span>`;
				} else if (slave.devotion >= -50) {
					r += `<span class="devotion dec">increasing ${his} dislike of you.</span>`;
				} else {
					r += `<span class="devotion dec">increasing ${his} hatred of you.</span>`;
				}
			} else {
				r += `an incident without lasting effect.`;
			}
			slave.devotion += vignette.effect;
		} else if (vignette.type === "trust") {
			if (vignette.effect > 0) {
				if (slave.trust > 20) {
					r += `<span class="trust inc">increasing ${his} trust in you.</span>`;
				} else if (slave.trust >= -50) {
					r += `<span class="trust inc">reducing ${his} fear of you.</span>`;
				} else {
					r += `<span class="trust inc">reducing ${his} terror of you.</span>`;
				}
			} else if (vignette.effect < 0) {
				if (slave.trust > 20) {
					r += `<span class="trust dec">reducing ${his} trust in you.</span>`;
				} else if (slave.trust >= -20) {
					r += `<span class="trust dec">increasing ${his} fear of you.</span>`;
				} else {
					r += `<span class="trust dec">increasing ${his} terror of you.</span>`;
				}
			} else {
				r += `an incident without lasting effect.`;
			}
			slave.trust += vignette.effect;
		} else if (vignette.type === "health") {
			if (vignette.effect > 0) {
				r += `<span class="health inc">improving ${his} health.</span>`;
				improveCondition(slave, 2 * vignette.effect);
			} else if (vignette.effect < 0) {
				r += `<span class="health dec">affecting ${his} health.</span>`;
				healthDamage(slave, 2 * vignette.effect);
			} else {
				r += `an incident without lasting effect.`;
			}
		} else {
			if (vignette.effect > 0) {
				r += `<span class="reputation inc">gaining you a bit of reputation.</span>`;
			} else if (vignette.effect < 0) {
				r += `<span class="reputation dec">losing you a bit of reputation.</span>`;
			} else {
				r += `an incident without lasting effect.`;
			}
			repX(Math.trunc(FuckResult * vignette.effect * 0.1), "vignette", slave);
			incomeStats.rep += Math.trunc(FuckResult * vignette.effect * 0.1);
		}
	}
};
