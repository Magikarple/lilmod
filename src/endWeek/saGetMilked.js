{
	class MilkingResults {
		constructor() {
			/** full description of milking */
			this.text = ``;
			/** cum collected in deciliters */
			this.cum = 0;
			/** cash expected from sale of cum */
			this.cumSale = 0;
			/** girlcum collected in deciliters */
			this.fluid = 0;
			/** cash expected from sale of girlcum */
			this.fluidSale = 0;
			/** milk collected in liters */
			this.milk = 0;
			/** cash expected from sale of milk */
			this.milkSale = 0;
		}

		/** total cash collected by this milking */
		get cash() {
			return this.cumSale + this.fluidSale + this.milkSale;
		}
	}

	/**
	 * @param {FC.ReportSlave} slave
	 * @param {number} [multiplier=1.0]
	 * @param {boolean} [preview=false] are we trying to preview milking income, or may we make changes to the slave?
	 * @returns {MilkingResults}
	 */
	App.SlaveAssignment.getMilked = function saGetMilked(slave, multiplier = 1.0, preview = false) {
		const r = new MilkingResults();
		const arcology = V.arcologies[0];
		const {
			he, him, his, He, His
		} = getPronouns(slave);

		// could probably move these back or something
		let implantEffect;

		let vignetteCash = 0;
		let vignetteRep = 0;

		if (!preview) {
			jobPreface(slave);
		}

		if (slave.lactation > 0) {
			harvestMilk(slave, multiplier, preview);
			if (!preview) {
				milkingEffects(slave);
			}
		}
		// Limits penthouse milkers to milk only.
		if ([Job.ARCADE, Job.MILKED, Job.DAIRY].includes(slave.assignment) || preview) {
			if (slave.balls > 0) {
				harvestCum(slave, multiplier);
				if (!preview) {
					cumEffects(slave);
				}
			}
			if (slave.genes === GenderGenes.FEMALE && slave.prostate > 0 && slave.balls === 0) {
				harvestGirlCum(slave, multiplier);
			}
		}
		if (!preview) {
			recordTotals(slave);
			physicalEffects(slave);
			mentalEffects(slave);
			if (V.showVignettes === 1 && (slave.assignment === window.Job.MILKED || slave.assignment === window.Job.DAIRY)) {
				assignmentVignette(slave);
			}
			if (slave.assignment === window.Job.MILKED) {
				cashX(r.cash, "slaveAssignmentMilked", slave);
			} else if (slave.assignment === window.Job.DAIRY) {
				recordFacilityStatistics(getSlaveStatisticData(slave, V.facility.dairy));
				applyFSDecoration();
				cashX(r.cash, "slaveAssignmentDairy", slave);
			} else {
				cashX(r.cash, "slaveAssignmentExtraMilk", slave);
			}
		}
		return r;

		/**
		 * @param {App.Entity.SlaveState} slave
		 */
		function recordTotals(slave) {
			actX(slave, "milk", r.milk);
			actX(slave, "cum", r.cum);
		}

		/**
		 * @param {FC.SlaveStatisticData} incomeStats
		 */
		function recordFacilityStatistics(incomeStats) {
			incomeStats.milk = r.milk;
			incomeStats.cum = r.cum;
			incomeStats.fluid = r.fluid;
			incomeStats.income = r.cash + vignetteCash;
			incomeStats.rep = vignetteRep;
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 */
		function jobPreface(slave) {
			r.text += `gets milked this week.`;
			if (V.dairy > 0 && V.dairyRestraintsSetting < 2) {
				if ((V.universalRulesFacilityWork === 1 && slave.assignment === window.Job.MILKED && V.dairySpots > 0) || (slave.assignment === window.Job.DAIRY)) {
					if (slave.assignment === window.Job.MILKED) {
						r.text += ` Since there's extra space in ${V.dairyName}, ${he} spends most of ${his} milkings there.`;
						V.dairySpots -= 1; // Would this need to be pulled for statistics gathering?
					}
					if (V.MilkmaidID !== 0) {
						r.text += ` While there, ${he} gets the benefit of ${S.Milkmaid.slaveName}'s `;
						if (S.Milkmaid.physicalAge < 21) {
							r.text += `youthful energy`;
						} else {
							r.text += `care`;
						}
						if (S.Milkmaid.skill.oral >= 100) {
							r.text += ` and talented tongue`;
						}
						r.text += `.`;
						if (slave.devotion < V.milkmaidDevotionThreshold) {
							slave.devotion += V.milkmaidDevotionBonus;
						}
						if (slave.trust < V.milkmaidTrustThreshold) {
							slave.trust += V.milkmaidTrustBonus;
						}
						if (slave.health.condition < 100) {
							improveCondition(slave, V.milkmaidHealthBonus);
						}
					}
				}
			}
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {number} multiplier
		 * @param {boolean} preview
		 */
		function harvestMilk(slave, multiplier, preview) {
			r.milk = milkAmount(slave);

			r.text += ` ${He} produces from ${his} ${jsEither(["boobs", "breasts", "mammaries", "tits",
				"udders"])}, which have a combined volume of ${(slave.boobs * 2)} CCs; `;
			if (slave.lactation === 1) {
				r.text += `${he} is lactating naturally and produces `;
				if (implantEffect >= 0.90) {
					r.text += `a weak trickle of milk.`;
				} else if (implantEffect >= 0.75) {
					r.text += `a weak stream of milk.`;
				} else {
					r.text += `a healthy stream of milk.`;
				}
				// I want to increase lactationAdaptation for normal milk too. Since it is locked to integers, I would need something like .ageAdjust it seems.
			} else if (slave.lactation === 2) {
				r.text += `${he} is on lactation drugs and produces `;
				if (implantEffect >= 0.90) {
					r.text += `a steady flow of milk.`;
				} else if (implantEffect >= 0.75) {
					r.text += `strong bursts of milk.`;
				} else {
					r.text += `a river of milk.`;
				}
				if (!preview) {
					if (slave.lactationAdaptation < 100) {
						r.text += ` ${His} udders are forced to adapt to this unnatural productivity.`;
						slave.lactationAdaptation += 1;
					}
					if (slave.curatives === 0 && slave.inflationType !== InflationLiquid.CURATIVE) {
						r.text += ` The stress of extreme milk production <span class="health dec">damages ${his} health.</span>`;
						healthDamage(slave, 3);
					}
				}
			}

			if (slave.boobsMilk > 0) {
				r.text += ` ${He} was in need of a good milking, too.`;
			}

			if (slave.devotion > 50) {
				r.text += ` ${He}'s such a happy cow that ${his} mental state has a positive impact on ${his} production.`;
			} else if (slave.devotion < -50) {
				r.text += ` ${He}'s such an unhappy cow that ${his} mental state has a negative impact on ${his} production.`;
			}

			if (slave.boobsImplant > 0) {
				implantEffect = (slave.boobsImplant / slave.boobs);
			}
			if (slave.boobsImplant > 0) {
				r.text += ` However, ${his} `;
				if (implantEffect >= 0.90) {
					r.text += `breast implants are ill-suited for`;
				} else if (implantEffect >= 0.75) {
					r.text += `breasts are almost entirely implant, greatly restricting ${his}`;
				} else if (implantEffect >= 0.60) {
					r.text += `breasts are mostly implant, restricting ${his}`;
				} else if (implantEffect >= 0.45) {
					r.text += `implants make up a considerable amount of ${his} breasts and greatly impede`;
				} else if (implantEffect >= 0.30) {
					r.text += `breast implants take up enough space to impede`;
				} else if (implantEffect >= 0.10) {
					r.text += `breast implants slightly impede`;
				} else {
					r.text += `breast implants cause a minor decrease in`;
				}
				r.text += ` milk production`;
				if (implantEffect >= 0.90) {
					r.text += `, given the lack of actual breast flesh`;
				}
				r.text += `.`;
			}

			let hormones = (slave.hormoneBalance / 100);
			if (slave.balls !== 0) {
				hormones -= 1;
			}
			if (slave.ovaries !== 0 || slave.mpreg !== 0) {
				hormones += 1;
			}
			if (hormones > 1) {
				r.text += ` ${His} internal chemistry is perfectly suited to milk production.`;
			} else if (hormones > 0) {
				r.text += ` ${His} hormonal balance favors milk production.`;
			} else if (hormones < 0) {
				r.text += ` ${His} hormonal balance impedes milk production.`;
			} else if (hormones < -1) {
				r.text += ` ${His} internal chemistry is poorly suited to milk production.`;
			}

			if (!preview && slave.lactationAdaptation < 100 && slave.assignment === Job.MILKED || slave.assignment === Job.DAIRY) {
				r.text += ` Living as a cow helps ${his} body and mind adapt to producing milk.`;
				slave.lactationAdaptation += 1;
			}

			if (!preview && slave.preg > (slave.pregData.normalBirth / 8) && slave.pregKnown === 1) {
				r.text += ` ${His} pregnancy helps ${his} body produce more milk naturally`;
				if (slave.lactationAdaptation < 100) {
					r.text += `, and also helps it adapt to milk production`;
					slave.lactationAdaptation += 1;
				}
				r.text += `.`;
			}

			if (slave.health.condition > 50) {
				r.text += ` ${His} shining health helps ${him} really produce.`;
			} else if (slave.health.condition < -50) {
				r.text += ` ${His} poor health impedes milk production.`;
			}

			if (slave.weight > 10) {
				r.text += ` ${His} extra weight supports ${his} productivity.`;
			} else if (slave.weight < -10) {
				r.text += ` ${His} thinness hinders ${his} productivity.`;
			}

			if (slave.geneMods.livestock === 1) {
				r.text += ` ${His} gene treatment increases ${his} production rate.`;
			}

			if (slave.lactationAdaptation > 10) {
				if (slave.lactationAdaptation > 150) {
					r.text += ` ${His} body has completely redesigned itself around milk production, making ${him} a shining example of productivity.`;
				} else if (slave.lactationAdaptation > 50) {
					r.text += ` ${His} body has adapted heavily to milk production, making ${him} extremely productive.`;
				} else {
					r.text += ` ${His} body has gotten used to producing milk, making ${him} very productive.`;
				}
			}

			if (V.dairySlimMaintainUpgrade === 1) {
				if (V.dairySlimMaintain === 1) {
					if (slave.boobs <= 700) {
						if (arcology.FSSlimnessEnthusiast > 80) {
							r.text += ` Your arcology's milkers are optimized to extract maximum output from small breasted slaves, which substantially increases ${his} otherwise modest productivity.`;
							r.milk *= 1.5;
						} else if (arcology.FSSlimnessEnthusiast > 20) {
							r.text += ` Your arcology's milkers have been carefully modified to more readily accommodate slaves with tiny breasts, which slightly mitigates ${his} less than ideal physiology for milk production.`;
							r.milk *= 1.1;
						}
					}
				}
			}

			if (slave.assignment === Job.DAIRY) { // FIXME: no text for this block???
				if (V.dairyFeedersUpgrade === 1) {
					if (V.dairyFeedersSetting > 0) {
						r.milk += (r.milk * (0.1 * (V.dairyFeedersUpgrade + V.dairyRestraintsSetting + ((50 - slave.physicalAge) / 20))));
						if (slave.chem > 360) {
							r.milk *= 0.6;
						} else if (slave.chem > 100) {
							r.milk *= ((600 - slave.chem) / 600);
						}
					}
				}
			}

			r.milk *= multiplier;
			r.milk = Math.max(Math.trunc(r.milk), 1);

			r.text += ` As a result, ${he} produces ${numberWithPluralOne(r.milk, "liter")} of milk over the week.`;

			// make sure milkSale is set here
			if (FutureSocieties.isActive('FSPastoralist', arcology)) {
				if (arcology.FSPastoralistLaw === 1) {
					r.milkSale = (r.milk * (8 + Math.trunc(arcology.FSPastoralist / 30)));
					r.text += ` Since breast milk is ${arcology.name}'s only legal dairy product, ${he} can scarcely be milked fast enough, and ${he} makes <span class="cash inc">${cashFormat(r.milkSale)}.</span>`;
				} else {
					r.milkSale = (r.milk * (6 + Math.trunc(arcology.FSPastoralist / 30)));
					r.text += ` Since milk is fast becoming a major part of ${arcology.name}'s dietary culture, ${his} milk is in demand, and ${he} makes <span class="cash inc">${cashFormat(r.milkSale)}.</span>`;
				}
			} else if (FutureSocieties.isActive('FSRepopulationFocus', arcology) && arcology.FSRepopulationFocusLaw === 1) {
				r.milkSale = (r.milk * (6 + Math.trunc(arcology.FSRepopulationFocus / 50)));
				r.text += ` Since the number of hungry babies outweighs the supply of available breasts in ${arcology.name}, ${his} milk is in demand, and ${he} makes <span class="cash inc">${cashFormat(r.milkSale)}.</span>`;
			} else {
				r.milkSale = (r.milk * 6);
				r.text += ` ${His} milk is sold for <span class="cash inc">${cashFormat(r.milkSale)}.</span>`;
			}
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 */
		function milkingEffects(slave) {
			if (slave.fetishKnown) {
				if (slave.fetish === Fetish.BOOBS || slave.energy > 95) {
					r.text += ` Getting constantly milked is as good as sex, as far as ${he}'s concerned. <span class="devotion inc">${He} is happy</span> to have ${his} breasts receive so much attention.`;
					slave.devotion += 1;
					if (slave.need > 0) {
						slave.need = 0;
					}
				}
			}

			if (slave.career === "a dairy cow" && slave.fetish !== Fetish.MINDBROKEN && slave.fuckdoll === 0) {
				r.text += ` ${He} feels like <span class="devotion inc">${he} was made to be milked,</span> <span class="trust inc">not that ${he}'d complain about such a good feeling.</span>`;
				slave.devotion++;
				slave.trust++;
				if (slave.need > 0) {
					slave.need = 0;
				}
			}

			if (slave.nipples !== NippleShape.HUGE) {
				if (slave.nipples === NippleShape.INVERTED) {
					if (slave.fetish === Fetish.MASOCHIST && slave.fetishKnown === 1) {
						r.text += ` Having the milkers constantly haul ${his} inverted nipples out is <span class="devotion inc">extremely uncomfortable; ${he} loves it.</span>`;
						slave.devotion += 3;
					} else {
						r.text += ` Having the milkers constantly haul ${his} inverted nipples out is <span class="devotion dec">extremely uncomfortable.</span>`;
						slave.devotion -= 3;
					}
					if (jsRandom(1, 100) > 50) {
						r.text += ` The constant suction <span class="change positive">permanently protrudes them,</span> and `;
						if (jsRandom(1, 2) === 1) {
							r.text += `it turns out they're absolutely massive.`;
							slave.nipples = NippleShape.HUGE;
						} else {
							r.text += `it turns out they're nice and puffy.`;
							slave.nipples = NippleShape.PUFFY;
						}
					}
				} else if (slave.nipples === NippleShape.PARTIAL) {
					if (slave.fetish === Fetish.MASOCHIST && slave.fetishKnown === 1) {
						r.text += ` Having the milkers constantly haul ${his} inverted nipples out is <span class="devotion inc">quite uncomfortable; ${he} loves it.</span>`;
						slave.devotion += 1;
					} else {
						r.text += ` Having the milkers constantly haul ${his} inverted nipples out is <span class="devotion dec">quite uncomfortable.</span>`;
						slave.devotion -= 1;
					}
					if (jsRandom(1, 100) > 30) {
						r.text += ` The constant suction <span class="change positive">permanently protrudes them,</span> and `;
						if (jsRandom(1, 2) === 1) {
							r.text += `it turns out they're pretty cute.`;
							slave.nipples = NippleShape.CUTE;
						} else {
							r.text += `it turns out they're nice and puffy.`;
							slave.nipples = NippleShape.PUFFY;
						}
					}
				} else if (slave.nipples === NippleShape.PUFFY && jsRandom(1, 100) > 90) {
					r.text += ` Producing this river of milk <span class="change positive">enlarges ${his} nipples:</span> they're now enormous.`;
					slave.nipples = NippleShape.HUGE;
				} else if (slave.nipples === NippleShape.CUTE && jsRandom(1, 100) > 80) {
					r.text += ` Producing this river of milk <span class="change positive">makes ${his} nipples nice and puffy.</span>`;
					slave.nipples = NippleShape.PUFFY;
				} else if (slave.nipples === NippleShape.TINY) {
					r.text += ` Producing this river of milk <span class="change positive">makes ${his} nipples grow to a nice size.</span>`;
					slave.nipples = NippleShape.CUTE;
				} else if (slave.nipples === NippleShape.FLAT) {
					r.text += ` Producing this river of milk <span class="change positive">forces ${his} nipples to grow to a more suitable size.</span>`;
					slave.nipples = NippleShape.HUGE;
				} else if (slave.areolae < 4 && jsRandom(1, 100) > (30 + (slave.areolae * 20))) {
					if (slave.nipples === NippleShape.FUCKABLE) {
						r.text += ` The constant suction around of ${his} nipples as their depths are drained of milk`;
					} else {
						r.text += ` Producing this river of milk`;
					}
					r.text += ` <span class="change positive">broadens ${his} areolae.</span>`;
					slave.areolae += 1;
				}
			}
			slave.lactationDuration = 2;
			if (slave.boobsMilk > 0) {
				slave.boobs -= slave.boobsMilk;
				slave.boobsMilk = 0;
			}
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {number} multiplier
		 */
		function harvestCum(slave, multiplier) {
			let qualityMultiplier = 1.0;
			r.cum = cumAmount(slave);

			if (slave.lactation > 0) {
				r.text += ` ${His} `;
			} else {
				r.text += ` ${slave.slaveName}'s `;
			}

			if (slave.dick > 0) {
				if (slave.dick > 6) {
					r.text += `inhuman`;
				} else if (slave.dick > 5) {
					r.text += `massive`;
				} else if (slave.dick > 4) {
					r.text += `big`;
				} else if (slave.dick > 3) {
					r.text += `sizable`;
				} else if (slave.dick > 2) {
					r.text += `moderate`;
				} else if (slave.dick > 1) {
					r.text += `little`;
				} else {
					r.text += `tiny`;
				}
				r.text += ` prick is`;
				if (slave.lactation > 0) {
					r.text += ` also`;
				}
				r.text += ` machine-milked`;
			} else {
				r.text += `butt is machine-fucked`;
			}
			r.text += ` to extract the cum from ${his} `;
			if (slave.scrotum === 0) {
				r.text += `invisible`;
			} else {
				if (slave.balls > 10) {
					r.text += `hypertrophied`;
				} else if (slave.balls >= 10) {
					r.text += `inhuman`;
				} else if (slave.balls >= 9) {
					r.text += `titanic`;
				} else if (slave.balls >= 8) {
					r.text += `gigantic`;
				} else if (slave.balls >= 7) {
					r.text += `monstrous`;
				} else if (slave.balls >= 6) {
					r.text += `pendulous`;
				} else if (slave.balls >= 5) {
					r.text += `huge`;
				} else if (slave.balls >= 4) {
					r.text += `big`;
				} else if (slave.balls >= 3) {
					r.text += `average`;
				} else {
					r.text += `pathetic`;
				}
			}
			if (slave.drugs === Drug.GROWTESTICLE) {
				r.text += ` balls, relieving them of the excessive cum production caused by the testicle enhancement drugs.`;
			} else if (slave.drugs === Drug.HYPERTESTICLE) {
				r.text += ` balls, relieving them of the excessive cum production caused by the hyper testicle enhancement drugs.`;
			} else {
				r.text += ` balls.`;
			}

			if (isVirile(slave)) {
				if (slave.geneMods.aggressiveSperm === 1) {
					r.text += ` ${His} testicles produce oversized, durable sperm cells that are not only difficult to ejaculate out en mass, but also tend to clog the tubing with their density, lowering ${his} overall productivity.`;
				}
				if (slave.geneMods.livestock === 1) {
					r.text += ` ${He} has been genetically altered to overproduce sperm.`;
				}
				if (slave.diet === Diet.CUM) {
					r.text += ` ${His} diet is designed for cum production.`;
				}
			}

			const cumHormones = (slave.hormoneBalance / 50);
			if (cumHormones < -1) {
				r.text += ` ${His} internal chemistry is perfectly suited to cum production.`;
			} else if (cumHormones < 0) {
				r.text += ` ${His} hormonal balance favors cum production.`;
			} else if (cumHormones > 0) {
				r.text += ` ${His} hormonal balance impedes cum production.`;
			} else if (cumHormones > 1) {
				r.text += ` ${His} internal chemistry is poorly suited to cum production.`;
			}

			if (isVirile(slave)) {
				if (slave.scrotum === 0) {
					r.text += ` ${He} does produce cum despite ${his} lack of visible testicles, but less than ${he} would if they weren't hidden inside of ${him}.`;
				}
			}

			if (slave.prostate > 0) {
				if (slave.prostate > 2) {
					r.text += ` ${His} heavily altered prostate greatly increases the volume of ${his} ejaculations and promotes excessive, watery semen production. This dilute ejaculate <span class="cash dec">sells poorly</span> compared to normal cum.`;
					qualityMultiplier *= 0.5;
				} else if (slave.prostate > 1) {
					r.text += ` ${His} hyperactive prostate increases the volume of ${his} ejaculations and promotes good semen production.`;
				}
			} else {
				r.text += ` ${His} lack of a prostate reduces the health and volume of ${his} ejaculations.`;
				qualityMultiplier *= 0.5;
			}

			if (slave.devotion > 50) {
				r.text += ` ${He}'s so happy that ${his} mental state has a positive impact on ${his} semen production.`;
			} else if (slave.devotion < -50) {
				r.text += ` ${He}'s so unhappy that ${his} mental state has a negative impact on ${his} semen production.`;
			}

			if (slave.health.condition > 50) {
				r.text += ` ${His} shining health helps ${him} really produce.`;
			} else if (slave.health.condition < -50) {
				r.text += ` ${His} poor health impedes semen production.`;
			}

			if (slave.vasectomy === 1) {
				r.text += ` ${His} cum lacks the primary ingredient, sperm, thanks to ${his} vasectomy, <span class="cash dec">considerably lowering the value</span> of ${his} ejaculate.`;
				qualityMultiplier *= 0.2;
			} else if (slave.ballType === "sterile") {
				r.text += ` ${His} cum lacks vigor entirely, thanks to ${his} chemical castration, <span class="cash dec">considerably lowering the value</span> of ${his} ejaculate.`;
				qualityMultiplier *= 0.2;
			} else if (!isVirile(slave)) {
				r.text += ` ${His} cum lacks the primary ingredient, sperm, as ${he} has not yet become a man. While it is <span class="cash dec">valued less</span> than normal ejaculate, this unique fluid is still valuable to certain groups.`;
				qualityMultiplier *= 0.8;
			} else if (slave.geneMods.aggressiveSperm === 1) {
				r.text += ` ${His} vigorous cum is considered exotic, <span class="cash inc">increasing its value</span> and helping to offset the losses from harvesting it.`;
				qualityMultiplier *= 1.3;
			}

			if (slave.assignment === Job.DAIRY) {
				if (V.dairyStimulatorsUpgrade === 1) { // FIXME: no text for this block?
					if (V.dairyStimulatorsSetting > 0) {
						r.cum += (r.cum * (0.2 * (V.dairyStimulatorsSetting + V.dairyRestraintsSetting + Math.trunc((50 - slave.physicalAge) / 20))));
					}
					if (slave.chem > 360) {
						r.cum *= 0.6;
					} else if (slave.chem > 100) {
						r.cum *= ((600 - slave.chem) / 600);
					}
				} else if (V.MilkmaidID !== 0) {
					if (S.Milkmaid.dick > 4 && canAchieveErection(S.Milkmaid)) {
						const milkmaidPronouns = getPronouns(S.Milkmaid);
						r.text += ` ${S.Milkmaid.slaveName} sometimes stands in for the machines, which is a polite way of saying ${milkmaidPronouns.he} sometimes fucks ${slave.slaveName}'s ass to help ${him} cum.`;
						if (S.Milkmaid.skill.penetrative > 90) {
							r.cum *= 1.3;
						} else if (S.Milkmaid.skill.penetrative > 10) {
							r.cum *= 1.2;
						} else {
							r.cum *= 1.1;
						}
					}
				}
			}

			r.cum *= multiplier;
			r.cum = Math.max(Math.trunc(r.cum), 1);
			r.text += ` ${He} produces ${numberWithPluralOne(r.cum, "deciliter")} of cum over the week;`;

			if (!FutureSocieties.isActive('FSPastoralist', arcology)) {
				r.cumSale = Math.max(Math.trunc((r.cum * jsRandom(15, 25) * qualityMultiplier)), 1);
				r.text += ` the fresh ejaculate is sold for <span class="cash inc">${cashFormat(r.cumSale)}.</span>`;
			} else if (arcology.FSPastoralistLaw === 1) {
				r.cumSale = Math.max(Math.trunc((r.cum * (jsRandom(20, 40)) * qualityMultiplier)), 1);
				r.text += ` the fresh ejaculate, which is in extremely high demand as one of ${arcology.name}'s few legal sources of animal protein, is sold for <span class="cash inc">${cashFormat(r.cumSale)}.</span>`;
			} else {
				r.cumSale = Math.max(Math.trunc((r.cum * (jsRandom(10, 20) + Math.trunc(arcology.FSPastoralist / 10)) * qualityMultiplier)), 1);
				r.text += ` the fresh ejaculate, which is in high demand given the new cultural preference for slave products, is sold for <span class="cash inc">${cashFormat(r.cumSale)}.</span>`;
			}
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 */
		function cumEffects(slave) {
			if (slave.energy > 95) {
				r.text += ` Getting ${his} dick constantly milked is almost as good as getting constant blowjobs as far as ${he}'s concerned. <span class="devotion inc">${He} is happy</span> to have ${his} member receive so much attention.`;
				slave.devotion += 1;
			}

			if (slave.need > 0) {
				r.text += ` ${His} cock and balls are milked so thoroughly that ${he}'s involuntarily sexually sated, regardless of ${his} feelings and tastes.`;
				slave.need = 0;
			}

			if (!canAchieveErection(slave)) {
				r.text += ` Since ${he} cannot maintain an erection, ${he} requires <span class="trust dec">painful</span> and <span class="devotion dec">degrading</span> anal electrostimulation to produce.`;
				slave.devotion -= 2;
				slave.trust -= 2;
				if (slave.anus === 0) {
					r.text += ` The electrostimulator <span class="virginity loss">breaks in ${his} virgin asshole.</span>`;
					slave.anus = 1;
				}
			} else if (slave.devotion <= 20) {
				r.text += ` Since ${he}'s unaroused by ${his} situation, ${he} requires <span class="trust dec">painful</span> and <span class="devotion dec">degrading</span> anal electrostimulation to produce.`;
				slave.devotion -= 2;
				slave.trust -= 2;
				if (slave.anus === 0) {
					r.text += ` The electrostimulator <span class="virginity loss">breaks in ${his} virgin asshole.</span>`;
					slave.anus = 1;
				}
			}

			if (slave.balls < 3 && isVirile(slave)) {
				if (slave.balls < 2) {
					if (jsRandom(1, 100) > (70 + (slave.geneMods.NCS * 15))) {
						r.text += ` Constant semen production and continual emptying and refilling <span class="change positive">increases the size of ${his} tiny testicles.</span>`;
						slave.balls += 1;
					}
				} else if (jsRandom(1, 100) > (90 + (slave.geneMods.NCS * 5))) {
					r.text += ` Constant semen production and continual emptying and refilling <span class="change positive">increases the size of ${his} small testicles.</span>`;
					slave.balls += 1;
				}
			}
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {number} multiplier
		 */
		function harvestGirlCum(slave, multiplier) {
			r.fluid = girlCumAmount(slave) * multiplier;
			r.text += ` ${His} female prostate fluid is considered an exotic delicacy.`;
			if (slave.vagina >= 0) {
				if (slave.vaginaLube === 2) {
					r.text += ` ${His} excessive vaginal secretions bolster the mix.`;
				} else if (slave.vaginaLube === 1) {
					r.text += ` ${His} natural vaginal secretions add to the mix.`;
				}
			}
			if (slave.geneMods.livestock === 1) {
				r.text += ` ${His} genetic alterations aid in increasing the volume.`;
			}
			if (slave.energy > 10) {
				if (slave.health.condition > 50) {
					if (slave.energy > 90) {
						r.text += ` As a nympho, ${he} has no trouble orgasming almost constantly.`;
					}
					r.text += ` ${His} shining health keeps ${his} juices flowing.`;
				} else if (slave.health.condition < -50) {
					r.text += ` ${He} is so unwell, ${he} produces less than normal.`;
				}
			} else {
				/* slave.energy <= 10 */
				r.text += ` Unfortunately, ${he} is frigid and rarely reaches orgasm in spite of the intense automatic stimulation.`;
			}

			r.fluidSale = (r.fluid * jsRandom(40, 50));
			r.text += ` ${capFirstChar(numberWithPluralOne(r.fluid, "deciliter"))} of uncommon ejaculate is gathered during ${his} milkings.`;
			if (arcology.FSPastoralist > 30) {
				r.fluidSale = (Math.trunc(r.fluidSale * (1 + (arcology.FSPastoralist - 30) / 140))); /* fully accepted pastoralism gives +50% on the price */
				r.text += ` Because of your arcology's cultural preferences, it comes with extra value.`;
			}
			r.text += ` It is sold for <span class="cash inc">${cashFormat(r.fluidSale)}.</span>`;
		}

		/**
		 * @param {FC.ReportSlave} slave
		 */
		function physicalEffects(slave) {
			if (r.milk + r.cum + r.fluid > 0) {
				if (slave.health.illness > 0 || slave.health.tired > 60) {
					r.text += ` ${His} production was reduced this week due to<span class="cash dec">`;
					if (slave.health.illness === 1) {
						r.text += ` malaise`;
					} else if (slave.health.illness === 2) {
						r.text += ` minor illness`;
					} else if (slave.health.illness === 3) {
						r.text += ` sickness`;
					} else if (slave.health.illness === 4) {
						r.text += ` severe sickness`;
					} else if (slave.health.illness === 5) {
						r.text += ` terrible illness`;
					}
					if (slave.health.illness > 0 && slave.health.tired > 60) {
						r.text += ` and`;
					}
					if (slave.health.tired > 90) {
						r.text += ` exhaustion`;
					} else if (slave.health.tired > 60) {
						r.text += ` fatigue`;
					}
					r.text += `.</span>`;
				}
				if (slave.assignment === Job.DAIRY) {
					if (V.dairyRestraintsSetting > 1) {
						r.text += ` The milking machine is merciless in its extraction of fluids from ${him}, but ${his} body is supplied with chemical stimulants to keep fatigue from setting in.`;
					} else if (V.dairyRestraintsSetting > 0) {
						if (slaveResting(slave)) {
							r.text += ` Resting doesn't stop ${him} from being thoroughly milked, but it does free ${him} from some of the associated chores, allowing ${him} time <span class="health inc">to snooze</span> in ${his} harness post harvesting.`;
						} else if (slave.health.tired + 9 >= 90 && !willWorkToDeath(slave)) {
							r.text += ` ${He} attempts to skip out on milkings due to ${his} exhaustion, but can do little to avoid being dragged and strapped in to the milkers by `;
							if (V.MilkmaidID !== 0) {
								r.text += `${S.Milkmaid.slaveName}.`;
							} else {
								r.text += `force.`;
							}
							r.text += ` ${He} quickly learns <span class="devotion inc">submission is the only choice</span> lest ${he} remain locked to the machine.`;
							slave.devotion += 2;
						} else {
							if (slave.devotion > 20) {
								r.text += ` All that is expected from ${him} is to submit to the machine's manipulations. It can get a little tiring by the end of the day, `;
								if (V.dairyFeedersSetting + V.dairyStimulatorsSetting + V.dairyPregSetting > 0) {
									r.text += `<span class="red">more so given the dairy's settings,</span> `;
								}
								r.text += `but it is mostly manageable.`;
							} else {
								r.text += ` Spending so much time strapped to a machine and being forcibly drained is not only <span class="red">exhausting, `;
								if (V.dairyFeedersSetting + V.dairyStimulatorsSetting + V.dairyPregSetting > 0) {
									r.text += `especially given the dairy's settings, `;
								}
								r.text += `</span> but also haunts ${him} even after ${he} is released from the session.`;
							}
						}
					} else {
						if (slaveResting(slave)) {
							r.text += ` Resting doesn't stop ${him} from being thoroughly milked, but it does free ${him} from some of the associated chores, allowing ${him} time <span class="health inc">to catch some extra sleep</span> in ${his} stall.`;
						} else if (slave.health.tired + 9 >= 90 && !willWorkToDeath(slave)) {
							r.text += ` ${He} attempts to skip out on milkings due to ${his} exhaustion, but can do little to avoid being dragged and hooked up to the milkers by `;
							if (V.MilkmaidID !== 0) {
								r.text += `${S.Milkmaid.slaveName}.`;
							} else {
								r.text += `force.`;
							}
							r.text += ` ${He} quickly learns <span class="devotion inc">submitting to such a carefree life</span> is much easier than rebelling against it.`;
							slave.devotion += 2;
						} else {
							if (slave.devotion > 20) {
								r.text += ` Being a free range cow is one of <span class="health inc">the most laid-back assignments</span> available. All that is required of ${him} is that ${he} lie back and get milked.`;
							} else {
								r.text += ` Being a free range cow can be one of the most laid-back assignments available, but ${he} fails to realize that and instead chooses to <span class="red">waste energy</span> struggling against the inevitable.`;
							}
						}
					}
					tired(slave);
				} else if (slave.assignment === Job.MILKED) {
					if (slaveResting(slave)) {
						r.text += ` While less is required of ${him} during ${his} <span class="health inc">mandatory rest periods,</span> ${he} still needs to frequently visit the milkers, reducing the overall effectiveness of ${his} breaks.`;
					} else if (slave.health.tired + 8 >= 90 && !willWorkToDeath(slave)) {
						r.text += ` ${He} attempts to skip out on milkings due to ${his} exhaustion, but can do little to avoid being dragged and hooked up to the milkers by `;
						if (V.dairy > 0 && V.universalRulesFacilityWork === 1 && V.dairySpots > 0 && V.MilkmaidID !== 0 && V.dairyRestraintsSetting < 2) {
							r.text += `${S.Milkmaid.slaveName}.`;
						} else {
							r.text += `force.`;
						}
						r.text += ` ${His} <span class="devotion dec">protests</span> quickly fall silent as ${he} realizes struggling takes more energy than letting it happen.`;
						slave.devotion -= 2;
					} else {
						r.text += ` ${His} assignment doesn't expect much from ${him}, `;
						if (slave.devotion > 20) {
							r.text += `giving ${him} plenty of time to relax throughout the day.`;
						} else {
							r.text += `but ${he} complicates things, <span Class="red">wasting energy</span> ${he} should be conserving for ${his} other responsibilities.`;
						}
					}
					tired(slave);
				} else {
					r.text += ` Having to visit the milkers and cleaning up afterwards takes some time out of ${his} breaks.`;
					slave.health.tired += 2;
				}
			}
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 */
		function mentalEffects(slave) {
			if (slave.assignment === window.Job.MILKED || (slave.assignment === window.Job.DAIRY && V.dairyRestraintsSetting < 2)) {
				if (slave.behavioralQuirk === BehavioralQuirk.FITNESS) {
					r.text += ` ${slave.slaveName} <span class="devotion inc">privately enjoys</span> the focus on ${his} health and fitness that comes with being a cow.`;
					slave.devotion += 1;
				}
			}
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 */
		function assignmentVignette(slave) {
			const vignette = GetVignette(slave);
			const FuckResult = FResult(slave); // Got to be something better than this
			r.text += ` <span class="story-label">This week</span> ${vignette.text} `;
			if (vignette.type === "cash") {
				const cashVign = Math.trunc(FuckResult * vignette.effect);
				if (vignette.effect > 0) {
					r.text += `<span class="cash inc">making you an extra ${cashFormat(cashVign)}.</span>`;
				} else if (vignette.effect < 0) {
					r.text += `<span class="cash dec">losing you ${cashFormat(Math.abs(cashVign))}.</span>`;
				} else {
					r.text += `an incident without lasting effect.`;
				}
				if (slave.assignment === window.Job.MILKED) {
					if (vignette.effect > 0) {
						cashX(cashVign, "slaveAssignmentMilkedVign", slave);
					} else if (vignette.effect < 0) {
						cashX(forceNeg(cashVign), "slaveAssignmentMilkedVign", slave);
					}
				} else if (slave.assignment === window.Job.DAIRY) {
					if (vignette.effect > 0) {
						cashX(cashVign, "slaveAssignmentDairyVign", slave);
					} else if (vignette.effect < 0) {
						cashX(forceNeg(cashVign), "slaveAssignmentDairyVign", slave);
					}
				} else {
					cashX(cashVign, "slaveAssignmentExtraMilkVign", slave);
				}
				vignetteCash += cashVign;
			} else if (vignette.type === "devotion") {
				if (vignette.effect > 0) {
					if (slave.devotion > 50) {
						r.text += `<span class="devotion inc">increasing ${his} devotion to you.</span>`;
					} else if (slave.devotion >= -20) {
						r.text += `<span class="devotion inc">increasing ${his} acceptance of you.</span>`;
					} else if (slave.devotion >= -50) {
						r.text += `<span class="devotion inc">reducing ${his} dislike of you.</span>`;
					} else {
						r.text += `<span class="devotion inc">reducing ${his} hatred of you.</span>`;
					}
				} else if (vignette.effect < 0) {
					if (slave.devotion > 50) {
						r.text += `<span class="devotion dec">reducing ${his} devotion to you.</span>`;
					} else if (slave.devotion >= -20) {
						r.text += `<span class="devotion dec">reducing ${his} acceptance of you.</span>`;
					} else if (slave.devotion >= -50) {
						r.text += `<span class="devotion dec">increasing ${his} dislike of you.</span>`;
					} else {
						r.text += `<span class="devotion dec">increasing ${his} hatred of you.</span>`;
					}
				} else {
					r.text += `an incident without lasting effect.`;
				}
				slave.devotion += vignette.effect;
			} else if (vignette.type === "trust") {
				if (vignette.effect > 0) {
					if (slave.trust > 20) {
						r.text += `<span class="trust inc">increasing ${his} trust in you.</span>`;
					} else if (slave.trust >= -50) {
						r.text += `<span class="trust inc">reducing ${his} fear of you.</span>`;
					} else {
						r.text += `<span class="trust inc">reducing ${his} terror of you.</span>`;
					}
				} else if (vignette.effect < 0) {
					if (slave.trust > 20) {
						r.text += `<span class="trust dec">reducing ${his} trust in you.</span>`;
					} else if (slave.trust >= -20) {
						r.text += `<span class="trust dec">increasing ${his} fear of you.</span>`;
					} else {
						r.text += `<span class="trust dec">increasing ${his} terror of you.</span>`;
					}
				} else {
					r.text += `an incident without lasting effect.`;
				}
				slave.trust += vignette.effect;
			} else if (vignette.type === "health") {
				if (vignette.effect > 0) {
					r.text += `<span class="health inc">improving ${his} health.</span>`;
				} else if (vignette.effect < 0) {
					r.text += `<span class="health dec">affecting ${his} health.</span>`;
				} else {
					r.text += `an incident without lasting effect.`;
				}
				improveCondition(slave, 2 * vignette.effect);
			} else {
				if (vignette.effect > 0) {
					r.text += `<span class="reputation inc">gaining you a bit of reputation.</span>`;
				} else if (vignette.effect < 0) {
					r.text += `<span class="reputation dec">losing you a bit of reputation.</span>`;
				} else {
					r.text += `an incident without lasting effect.`;
				}
				repX(Math.trunc(FuckResult * vignette.effect * 0.1), "vignette", slave);
				vignetteRep += Math.trunc(FuckResult * vignette.effect * 0.1);
			}
		}

		// FACILITY DECORATION IMPACTS
		function applyFSDecoration() {
			const fsGain = 0.0001 * (r.milk + (5 * r.cum));
			FutureSocieties.DecorationBonus(V.dairyDecoration, fsGain);
		}
	};
}
