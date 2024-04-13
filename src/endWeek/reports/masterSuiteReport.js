/**
 * @returns {FC.EndWeek.FacilityReport}
 */
App.EndWeek.masterSuiteReport = function() {
	const beforeFrag = new DocumentFragment();
	const concubine = S.Concubine ? App.SlaveAssignment.reportSlave(S.Concubine) : undefined;
	const slaves = App.Utils.sortedEmployees(App.Entity.facilities.masterSuite);
	const msAvg = App.Utils.masterSuiteAverages();

	const pregnantSlaves = V.masterSuiteUpgradePregnancy ? slaves.filter((s) => s.pregKnown > 0).length : 0;

	function concubineText() {
		const frag = new DocumentFragment();
		let r = [];
		const {He, he, his, him, himself} = getPronouns(S.Concubine);
		r.push(App.SlaveAssignment.saSlaveIntro(S.Concubine, `is serving as your concubine in ${V.masterSuiteName}.`));
		r.push(`More than any other slave, ${his} sexual brilliance and physical appeal are <span class="reputation inc">critical</span> to your reputation.`);

		if (S.Concubine.prestigeDesc === "You bankrupted and enslaved $him in revenge for $his part in the attack on your arcology by the Daughters of Liberty." && S.Concubine.newGamePlus === 0) {
			r.push(`${He} was once your rival, and your relationship is widely thought to be <span class="reputation inc">the perfect modern romance.</span>`);
			repX(500, "concubine", S.Concubine);
		}
		if (S.Concubine.prestige > 0) {
			repX(500 * S.Concubine.prestige, "concubine", S.Concubine);
			if (V.verboseDescriptions === 1 || (V.favSeparateReport === 1 && V.favorites.includes(S.Concubine.ID))) {
				r.push(`Keeping such a prestigious slave as your concubine <span class="reputation inc">adds to your fame.</span>`);
				if (S.Concubine.fetish !== Fetish.MINDBROKEN) {
					if (S.Concubine.prestigeDesc === "$He is a famed Free Cities whore, and commands top prices.") {
						r.push(`When ${he} has a free moment, ${he} refines ${his} flexibility so that ${he} is prepared`);
						if (isPlayerFrigid()) {
							r.push(`to give you the greatest sex of your life the moment you feel the slightest urge.`);
						} else {
							r.push(`for any sexual position you can think of, and many more that ${he} researched just for your pleasure.`);
						}
					}
					if (S.Concubine.prestigeDesc === "$He is a famed Free Cities slut, and can please anyone.") {
						r.push(`When ${he} has a free moment, ${he} pretties ${himself} up so that ${he} may be as beautiful as possible to make you look even better.`);
					}
					if (S.Concubine.prestigeDesc === "$He is remembered for winning best in show as a cockmilker.") {
						if (S.Concubine.balls > 0) {
							if (S.Concubine.balls.vasectomy !== 1) {
								if (isVirile(S.Concubine)) {
									if (S.Concubine.geneMods.aggressiveSperm === 1 && isFertile(V.PC) && V.seePreg) {
										r.push(`${He} tries ${his} hardest to not leave wriggling puddles of sperm in the bed, knowing that there's a high chance one of them will make it's way into your fertile womb, but finds it difficult to get them all when ${he} has to constantly relieve ${himself}.`);
										if (S.Concubine.fetish === Fetish.PREGNANCY) {
											if (S.Concubine.fetishKnown) {
												r.push(`The thought of your stomach swelling large with ${his} children doesn't help matters.`);
											} else {
												r.push(`You can't help but get the feeling ${he} would like that.`);
											}
											tryKnockMeUp(V.PC, -70, 2, S.Concubine);
										} else {
											tryKnockMeUp(V.PC, -80, 2, S.Concubine);
										}
									} else if (cumLoad(V.PC) > cumLoad(S.Concubine) && V.PC.balls > 0) {
										r.push(`When ${he} has a free moment, ${he} researches ways to increase the size of ${his} loads; ${he} is more than a little jealous that ${his} champion cumshots are second to yours.`);
									} else if (S.Concubine.balls > 10 && S.Concubine.prostate > 1) {
										r.push(`${He} does ${his} best to prevent ${himself} from making a mess when you don't want one. When ${he} has free time, ${he} researches new techniques to make use of ${his} huge loads to entertain you.`);
									} else {
										r.push(`When ${he} has a free moment, ${he} researches ways to increase the size of ${his} loads for you; ${he} dreams of the day ${he} can show you just what ${he} was capable of.`);
									}
								} else {
									r.push(`${He} can't wait to blow huge loads for you and yearns for the day that ${he} sexually matures enough to do so.`);
								}
							} else {
								r.push(`${He} wishes ${he} could blow huge loads for you, but with ${his} vas deferens snipped, it's simply impossible.`);
							}
						} else {
							r.push(`${He} wishes ${he} could blow huge loads for you, but without balls, there is little ${he} can do.`);
						}
					}
					if (S.Concubine.prestigeDesc === "$He is remembered for winning best in show as a dairy cow.") {
						if (milkLoad(V.PC) > milkLoad(S.Concubine) && S.Concubine.lactation > 0 && V.PC.lactation > 0) {
							r.push(`When ${he} has free time, ${he} is driven by ${his} competitive spirit to research ways to increase ${his} milk production in an effort to rival yours.`);
						} else if (S.Concubine.lactation > 1 || S.Concubine.lactationAdaptation > 90) {
							r.push(`${He} does ${his} best to prevent ${himself} from making a mess when you don't want one. When ${he} has free time, ${he} researches new techniques to make use of ${his} excessive milk to entertain you.`);
						} else if (S.Concubine.lactation > 0) {
							r.push(`${He} does ${his} best to prevent ${himself} from making a mess when you don't want one. When ${he} has free time, ${he} researches new techniques to make use of ${his} breast milk to entertain you.`);
						} else {
							r.push(`${He} wishes ${he} could lactate for you, but ${he} has dried up since ${his} glory days.`);
						}
					}
					if (S.Concubine.prestigeDesc === "$He is remembered for winning best in show as a breeder.") {
						if (S.Concubine.bellyPreg >= 5000) {
							if (V.PC.bellyPreg >= 5000) {
								if (V.PC.womb.length > S.Concubine.womb.length) {
									r.push(`When ${he} has a free moment, ${he} researches methods to assure ${he}'ll have more children with ${his} next pregnancy; ${he} can't help but be jealous over your heavily laden womb.`);
								} else {
									r.push(`When ${he} has a free moment, ${he} refines ${his} flexibility so that ${he} can perform any sexual position possible for ${him} in ${his} motherly state. ${He} takes the time to look up new positions to accommodate the large amount of belly shared between you both.`);
								}
							} else {
								r.push(`When ${he} has a free moment, ${he} refines ${his} flexibility so that ${he} can perform any sexual position possible for ${him} in ${his} motherly state. ${He} takes the time to look up new positions to work around ${his} growing pregnancy.`);
							}
						} else if (isFertile(S.Concubine) || S.Concubine.preg > 0) {
							r.push(`When ${he} has a free moment, ${he} refines ${his} flexibility so that ${he} is prepared for any sexual position you can think of, no matter how heavy ${he} becomes with children.`);
						} else {
							r.push(`When ${he} has a free moment, ${he} researches ways to restore ${his} fertility; ${he} dreams of the day ${he} can carry`);
							if (V.PC.dick !== 0) {
								r.push(`your children.`);
							} else {
								r.push(`children for you.`);
							}
						}
					}
				} else {
					if (S.Concubine.prestigeDesc === "$He is remembered for winning best in show as a cockmilker.") {
						if (S.Concubine.geneMods.aggressiveSperm === 1 && isVirile(S.Concubine) && isFertile(V.PC) && V.seePreg) {
							r.push(`${He} has a very bad habit of leaving large puddles of aggressive sperm around the room, and that's not counting the nocturnal emissions. You know ${he} can't help it,`);
							tryKnockMeUp(V.PC, 25, 2, S.Concubine);
							if (V.PC.preg > 0) {
								r.push(`just as you can't help <span class="pregnancy">becoming pregnant.</span>`);
							} else {
								r.push(`but it still feels really weird as it crawls across you.`);
							}
						}
					}
				}
			}
		}
		if (S.Concubine.porn.prestige > 2) {
			repX(800, "concubine", S.Concubine);
			r.push(`Having a porn star as your personal bed warmer <span class="reputation inc">reflects on your standing.</span> Your citizens can only wonder at what kinky things happen behind closed doors.`);
		} else if (S.Concubine.porn.prestige > 1) {
			repX(300, "concubine", S.Concubine);
			r.push(`Having a rising porn star as your personal bed warmer <span class="reputation inc">reflects on your standing.</span>`);
		}
		if (S.Concubine.counter.oral + S.Concubine.counter.anal + S.Concubine.counter.vaginal + S.Concubine.counter.mammary + S.Concubine.counter.penetrative > 1000) {
			if (V.verboseDescriptions === 1 || (V.favSeparateReport === 1 && V.favorites.includes(S.Concubine.ID))) {
				r.push(`Many citizens`);
				if (S.Concubine.counter.publicUse > 10) {
					r.push(`remember having had ${him} themselves, and`);
				}
				r.push(`<span class="reputation inc">respectfully</span> envy you ${his} exclusive company.`);
			}
			repX(300, "concubine", S.Concubine);
		}
		/* Perform facility based rule changes - FIXME - dev/trust living condition changes probably should be in saRules; there's no text reporting these changes here */
		// move the stat changes there too!
		if (V.masterSuiteUpgradeLuxury > 0) {
			S.Concubine.rules.living = "luxurious";
			S.Concubine.devotion += 4;
			S.Concubine.trust += 4;
		} else {
			S.Concubine.rules.living = "normal";
			S.Concubine.devotion += 2;
			S.Concubine.trust += 2;
		}
		repX(Beauty(S.Concubine) * 5 + (adjustedPenSkill(S.Concubine, true) || 0) + (S.Concubine.skill.vaginal || 0) + (S.Concubine.skill.anal || 0) + (S.Concubine.skill.oral || 0) + (S.Concubine.skill.whoring || 0) + (S.Concubine.skill.entertainment || 0), "concubine", S.Concubine);

		App.Events.addNode(frag, r);

		return frag;
	}

	/** Generate text specific to non-concubine MS slaves
	 * @param {App.Entity.SlaveState} slave
	 * @returns {DocumentFragment}
	 */
	function nonConcubineText(slave) {
		const frag = new DocumentFragment();
		frag.append(App.SlaveAssignment.saSlaveIntro(slave, `sees to your pleasure in ${V.masterSuiteName}.`));

		/* Perform facility based rule changes - FIXME - dev/trust living condition changes probably should be in saRules; there's no text reporting these changes here */
		if (V.masterSuiteUpgradeLuxury === 1) {
			slave.rules.living = "luxurious";
			if (slave.devotion <= 95) {
				slave.devotion += 2;
			}
			if (slave.trust < 60) {
				slave.trust++;
			}
		} else if (V.masterSuiteUpgradeLuxury === 2) {
			slave.rules.living = "luxurious";
			if (slave.energy > 90) {
				if (slave.devotion <= 95) {
					slave.devotion += 2;
				}
				if (slave.trust <= 95) {
					slave.trust += 2;
				}
			} else {
				if (slave.devotion <= 60) {
					slave.devotion++;
				}
				if (slave.trust < 60) {
					slave.trust++;
				}
			}
		} else {
			slave.rules.living = "spare";
			if (slave.devotion <= 20 && slave.trust >= -20) {
				slave.devotion -= 2;
				slave.trust -= 5;
			} else if (slave.devotion <= 60) {
				slave.devotion += 2;
			} else if (slave.devotion > 60) {
				slave.devotion -= 2;
			}
			if (slave.trust < 60) {
				slave.trust++;
			}
		}
		// decoration dev bonus (reported at end)
		if (V.masterSuiteDecoration !== "standard") {
			slave.devotion++;
		}

		return frag;
	}

	/** Generate text shared by concubine and non-concubine MS slaves
	 * @param {FC.ReportSlave} slave
	 * @returns {DocumentFragment}
	 */
	function commonText(slave) {
		const frag = new DocumentFragment();
		let r = [];
		const {He, he, His, his, him, himself} = getPronouns(slave);

		if (V.masterSuiteUpgradeLuxury === 2 && msAvg.energy > random(40, 90) && slaves.length > 1) {
			const energy = (Math.ceil(slave.energy / 5) * 7);
			SimpleSexAct.Slave(slave, energy);
			if (canPenetrate(slave)) {
				actX(slave, "penetrative", random(1, 3) * energy);
			}
			if (slave.nipples === NippleShape.FUCKABLE && msAvg.dick > 2) {
				actX(slave, "mammary", random(1, 3) * energy);
			}
			if (slave.trust >= -20 && slave.devotion > -10 && slave.fetishStrength <= 95 && slave.fetish !== Fetish.MINDBROKEN) {
				const fetishChange = fetishChangeChance(slave);
				if (msAvg.milk > 2000 && fetishChange > random(0, 50)) {
					if (slave.fetish === Fetish.BOOBS) {
						if (V.verboseDescriptions === 1 || (V.favSeparateReport === 1 && V.favorites.includes(slave.ID))) {
							r.push(`${His}`);
						} else {
							r.push(`${slave.slaveName}'s`);
						}
						r.push(`<span class="fetish inc">boob fetish is strengthened</span> by the constant availability of milky nipples for ${him} to play with.`);
						slave.fetishStrength += 4;
					} else {
						if (V.verboseDescriptions === 1 || (V.favSeparateReport === 1 && V.favorites.includes(slave.ID))) {
							r.push(`${He}`);
						} else {
							r.push(slave.slaveName);
						}
						r.push(`<span class="fetish gain">acquires a boob fetish</span> after spending a lot of time in the fuckpit drinking from ${his} fellow fucktoys' tits.`);
						slave.fetish = Fetish.BOOBS;
						slave.fetishStrength = 65;
						slave.fetishKnown = 1;
					}
				} else if (msAvg.dick > 3 && slave.anus > 0 && canDoAnal(slave) && fetishChange > random(0, 50)) {
					r.push(`${He}`);
					if (slave.fetish === Fetish.BUTTSLUT) {
						r.push(`<span class="fetish inc">sinks farther into anal pleasure,</span> since ${he} spends ${his} time in the fuckpit with at least one of the many available cocks up ${his} butt.`);
						slave.fetishStrength += 4;
					} else {
						r.push(`<span class="fetish gain">acquires an anal fetish</span> after helplessly orgasming at the mercy of your many fucktoys eager to shove their big stiff penises up ${his} ass.`);
						slave.fetish = Fetish.BUTTSLUT;
						slave.fetishStrength = 65;
						slave.fetishKnown = 1;
					}
				} else if (msAvg.cum > 3 && fetishChange > random(0, 50)) {
					r.push(`${He}`);
					if (slave.fetish === Fetish.CUMSLUT) {
						r.push(`<span class="fetish inc">sinks farther into cum addiction,</span> since ${he} spends ${his} time in the fuckpit eagerly sucking down ejaculate, straight from the many sources.`);
						slave.fetishStrength += 4;
					} else {
						r.push(`<span class="fetish gain">acquires an oral fixation</span> after orally servicing your many fucktoys eager to blow their loads down ${his} throat.`);
						slave.fetish = Fetish.CUMSLUT;
						slave.fetishStrength = 65;
						slave.fetishKnown = 1;
					}
				} else if (msAvg.preg > 10 && fetishChange > random(0, 50)) {
					r.push(`${He}`);
					if (slave.fetish === Fetish.PREGNANCY) {
						r.push(`<span class="fetish inc">sinks farther into pregnancy obsession,</span> since ${he} never wants for a pregnant girl to make love to.`);
						slave.fetishStrength += 4;
					} else {
						r.push(`<span class="fetish gain">acquires a pregnancy fetish,</span> since many of ${his} sexual partners in the fuckpit are heavily pregnant.`);
						slave.fetish = Fetish.PREGNANCY;
						slave.fetishStrength = 65;
						slave.fetishKnown = 1;
					}
				} else if (msAvg.dom < -25 && fetishChange > random(0, 50)) {
					r.push(`${He}`);
					if (slave.fetish === Fetish.DOM) {
						r.push(`<span class="fetish inc">becomes more dominant,</span> since there are so many subs in the fuckpit who beg ${him} to fuck them hard.`);
						slave.fetishStrength += 4;
					} else {
						r.push(`<span class="fetish gain">becomes sexually dominant</span> after having fun satisfying the many submissive fucktoys in the fuckpit who beg ${him} to top them.`);
						slave.fetish = Fetish.DOM;
						slave.fetishStrength = 65;
						slave.fetishKnown = 1;
					}
				} else if (msAvg.dom > 25 && fetishChange > random(0, 50)) {
					r.push(`${He}`);
					if (slave.fetish === Fetish.SUBMISSIVE) {
						r.push(`<span class="fetish inc">becomes even more submissive,</span> since there are so many doms in the fuckpit that ${he}'s often used by more than one at once.`);
						slave.fetishStrength += 4;
					} else {
						r.push(`<span class="fetish gain">becomes sexually submissive</span> after the many dominant slaves in the fuckpit hold ${him} down and use ${him} for their pleasure.`);
						slave.fetish = Fetish.SUBMISSIVE;
						slave.fetishStrength = 65;
						slave.fetishKnown = 1;
					}
				} else if (msAvg.sadism < -25 && fetishChange > random(0, 50)) {
					r.push(`${He}`);
					if (slave.fetish === Fetish.SADIST) {
						r.push(`<span class="fetish inc">becomes more sadistic,</span> since there are so many sluts in the fuckpit who will do anything for ${him} if ${he}'ll only spank them.`);
						slave.fetishStrength += 4;
					} else {
						r.push(`<span class="fetish gain">becomes a bit of a sadist</span> after ${he} notices that so many of ${his} fellow fucktoys cum harder if ${he} gives them a good`);
						if (hasAnyArms(slave)) {
							r.push(`slap.`);
						} else {
							r.push(`smack.`);
						}
						slave.fetish = Fetish.SADIST;
						slave.fetishStrength = 65;
						slave.fetishKnown = 1;
					}
				} else if (msAvg.sadism > 25 && fetishChange > random(0, 50)) {
					if (slave.fetish === Fetish.MASOCHIST) {
						if (V.verboseDescriptions === 1 || (V.favSeparateReport === 1 && V.favorites.includes(slave.ID))) {
							r.push(`${His}`);
						} else {
							r.push(`${slave.slaveName}'s`);
						}
						r.push(`<span class="fetish inc">pain addiction deepens,</span> since the fuckpit is full of ladies happy to fuck ${him} while ${he}.`);
						if (canTalk(slave)) {
							r.push(`screams.`);
						} else {
							r.push(`writhes.`);
						}
						slave.fetishStrength += 4;
					} else {
						if (V.verboseDescriptions === 1 || (V.favSeparateReport === 1 && V.favorites.includes(slave.ID))) {
							r.push(`${He}`);
						} else {
							r.push(slave.slaveName);
						}
						r.push(`<span class="fetish gain">learns masochism</span> after experiencing many orgasms under the exquisite sexual torture of the sadists in the fuckpit.`);
						slave.fetish = Fetish.MASOCHIST;
						slave.fetishStrength = 65;
						slave.fetishKnown = 1;
					}
				}
			}
			// If a slave isn't drinking it, then someone is probably squeezing it, hence no milk to be spared.
			// But doesn't the servants milking block run anyway? At the worst, it just loses any backed up milk.
			if (slave.lactation > 0) {
				slave.lactationDuration = 2;
				slave.boobs -= slave.boobsMilk;
				slave.boobsMilk = 0;
			}
			if (slave.energy.isBetween(40, 95)) {
				r.push(`Being a constant part of the fuckpit orgy <span class="libido inc">greatly heightens ${his} libido.</span>`);
				slave.energy += 2;
			}
			if (msAvg.aggroSperm > 2 && msAvg.cum > 4) {
				r.push(`A large number of aggressive sperm inhabit the fuckpit, eager to seek shelter in any unoccupied, and hopefully fertile, holes.`);
				tryKnockMeUp(slave, (-50 + msAvg.aggroSperm * 30), 2, slaves.filter((s) => s.geneMods.aggressiveSperm === 1 && isVirile(s)).random());
			}
			slave.need -= 50;
		}

		if (V.masterSuiteUpgradePregnancy === 1) {
			/* If they're not on fertility drugs and the toggle is active, stick them on (if they can take them). Otherwise take them off. */
			if (V.masterSuiteHyperPregnancy === 1 && slave.drugs !== Drug.SUPERFERTILITY && canGetPregnant(slave)) {
				slave.drugs = Drug.SUPERFERTILITY;
			} else if (V.masterSuitePregnancyFertilityDrugs === 1 && slave.drugs !== Drug.FERTILITY && canGetPregnant(slave)) {
				slave.drugs = Drug.FERTILITY;
			} else if (
				(
					(V.masterSuitePregnancyFertilityDrugs === 0 && slave.drugs === Drug.FERTILITY) ||
					(V.masterSuiteHyperPregnancy === 0 && slave.drugs === Drug.SUPERFERTILITY)
				) ||
				(!canGetPregnant(slave) && [Drug.FERTILITY, Drug.SUPERFERTILITY].includes(slave.drugs))
			) {
				slave.drugs = Drug.NONE;
			}
			/* We don't know they're pregnant for a month or so by game logic */
			if (slave.pregKnown === 1) {
				/* If they're preggo and in the upgraded suite, give them extra devotion. More if they're being given lighter duties. */
				if (V.verboseDescriptions === 1 || (V.favSeparateReport === 1 && V.favorites.includes(slave.ID))) {
					r.push(`Expecting ${slave.pregType > 1 ? "children" : "a child"} can be stressful, so ${he} truly appreciates the <span class="devotion inc">comforts</span> and <span class="trust inc">support</span> being given to ${him}.`);
					if (V.masterSuitePregnancySlaveLuxuries === 1) {
						r.push(`Being treated like royalty and having no obligations outside of steadily expanding and spending time with you only sweetens the deal.`);
					}
				}
				if (slave.devotion <= 100) {
					if (V.masterSuitePregnancySlaveLuxuries === 0) {
						slave.devotion += 2;
					} else {
						slave.devotion += 5;
					}
				}
				/* If they're preggo and in the upgraded suite, give them extra trust. More if they're being given lighter duties. */
				if (slave.trust <= 100) {
					if (V.masterSuitePregnancySlaveLuxuries === 0) {
						slave.trust += 2;
					} else {
						slave.trust += 5;
					}
				}
				/* If they're preggo and in the upgraded suite, give them extra health. More if they're being given lighter duties. */
				if (slave.health.condition < 100) {
					if (V.verboseDescriptions === 1 || (V.favSeparateReport === 1 && V.favorites.includes(slave.ID))) {
						r.push(`As a mother to be, ${his} health is paramount for the sake of the baby; no expense is spared to keep ${him} in <span class="health inc">peak condition.</span>`);
					}
					if (V.masterSuitePregnancySlaveLuxuries === 0) {
						improveCondition(slave, 15);
					} else {
						improveCondition(slave, 25);
					}
				}
			}
		}

		App.Events.addNode(frag, r);

		if (V.verboseDescriptions === 1 || (V.favSeparateReport === 1 && V.favorites.includes(slave.ID))) {
			App.Events.addNode(frag, [He, App.SlaveAssignment.pleaseYou(slave)], "div", ["indent"]);

			if (V.servantMilkers === 1 && slave.lactation > 0 && slave.fuckdoll === 0 && slave.fetish !== Fetish.MINDBROKEN && canMove(slave) && slave.intelligence + slave.intelligenceImplant >= -90) {
				const milkingResults = App.SlaveAssignment.getMilked(slave, 0.25);
				const milkDiv = App.UI.DOM.appendNewElement("div", frag, `When ${his} breasts begin to feel full and you aren't around, ${he} avails ${himself} to the penthouse milkers and gives ${milkingResults.milk} liters of milk over the week, which is sold for `, ["indent"]);
				App.UI.DOM.appendNewElement("span", milkDiv, `${cashFormat(milkingResults.milkSale)}.`, ["cash", "inc"]);
			}
			App.Events.addNode(frag, [
				App.SlaveAssignment.choosesOwnClothes(slave),
				...App.SlaveAssignment.individualSlaveReport(slave),
			], "div", ["indent"]);
		} else {
			// discard return values silently
			App.SlaveAssignment.pleaseYou(slave);
			if (V.servantMilkers === 1 && slave.lactation > 0 && slave.fuckdoll === 0 && slave.fetish !== Fetish.MINDBROKEN && canMove(slave) && slave.intelligence + slave.intelligenceImplant >= -90) {
				App.SlaveAssignment.getMilked(slave, 0.25);
			}
			App.SlaveAssignment.choosesOwnClothes(slave);
			App.SlaveAssignment.individualSlaveReport(slave);
		}
		frag.append(App.PersonalAttention.slaveReport(slave));
		App.Events.addNode(frag, [App.SlaveAssignment.devotion(slave)], "div", ["indent"]);

		if (slave.health.condition < 80) {
			if (V.masterSuiteUpgradeLuxury === 1) {
				improveCondition(slave, 20);
			} else {
				improveCondition(slave, 10);
			}
		}

		return frag;
	}

	if (slaves.length > 0) {
		const intro = App.UI.DOM.appendNewElement("p", beforeFrag, '', ["indent"]);
		let r = [];
		if (S.Concubine) {
			r.push(`<strong>${SlaveFullName(S.Concubine)} and ${numberWithPluralOne(slaves.length, "other slave")} are`);
		} else if (slaves.length > 1) {
			r.push(`<strong>There are ${slaves.length} slaves`);
		} else {
			r.push(`<strong>There is one slave`);
		}
		r.push(`seeing to your pleasure in the master suite.</strong> Such sexual opulence <span class="reputation inc">improves</span> your reputation.`);

		if (V.arcologies[0].FSEgyptianRevivalist > 0 && slaves.length >= 5) {
			r.push(`Society <span class="reputation inc">approves</span> of your keeping a large number of women. This advances the Egyptian revivalist ideal of multiple concubinage.`);
			FutureSocieties.Change("Egyptian Revivalist", 2);
		}
		if (pregnantSlaves >= 1) {
			r.push(`The suite is supporting the pregnancies of the slaves`);
			if (V.masterSuitePregnancyFertilityDrugs === 1 || V.masterSuiteHyperPregnancy === 1) {
				r.push(`within, and is providing them with fertility drugs`);
				if (V.masterSuitePregnancyFertilitySupplements === 1) {
					r.push(`and supplements to encourage impregnation.`);
				} else {
					r.push(`to encourage impregnation.`);
				}
			} else {
				r.push(`within.`);
			}
			if (V.arcologies[0].FSHedonisticDecadence > 0) {
				r.push(`Society <span class="reputation inc">approves</span> of the pampering your pregnant harem receives. This advances the ideal that everyone's desires should be fulfilled.`);
				FutureSocieties.Change("Hedonistic", 1);
			}
		}
		if (slaves.length > 1) {
			r.push(`The level of sexual energy in the suite is`);
			if (V.masterSuiteUpgradeLuxury === 1) {
				if (msAvg.energy > 90) {
					r.push(`intense. When you enter your luxurious retreat, you can set off pent-up orgasms with a touch.`);
				} else if (msAvg.energy > 60) {
					r.push(`high; there is strong competition for your favors whenever you enter your retreat.`);
				} else {
					r.push(`relatively normal; the slaves serve your pleasure before their own.`);
				}
			} else if (V.masterSuiteUpgradeLuxury === 2) {
				if (msAvg.energy > 90) {
					r.push(`intense. Your slaves spend almost all their time in the fuckpit, having sex in a big pile.`);
				} else if (msAvg.energy > 60) {
					r.push(`high; your slaves spend much of their time in the fuckpit, having sex with each other.`);
				} else {
					r.push(`relatively normal; the slaves lounging in the fuckpit get each other off when they feel like it.`);
				}
				if (msAvg.cum > 4) {
					r.push(`Unless it's right after an automated cleaning, everything in the fuckpit is spattered with cum.`);
				}
				if (msAvg.milk > 4000) {
					r.push(`There's so much lactation going on that the lowest level of the fuckpit is a pool of milk.`);
				}
			} else {
				r.push(`relatively normal.`);
			}
		}
		App.Events.addNode(intro, r);
	}

	/** @type {Array<FC.EndWeek.SlaveReport>} */
	const slaveReports = [];

	if (concubine) {
		tired(concubine);
		const concubineEntry = App.UI.DOM.makeElement("div", '', ["slave-report"]);
		const artSpan = App.UI.DOM.appendNewElement("span", concubineEntry);
		App.Events.addNode(concubineEntry, [concubineText(), commonText(concubine)]);
		App.SlaveAssignment.appendSlaveArt(artSpan, concubine);
		slaveReports.push({
			id: concubine.ID,
			report: concubineEntry,
		});
	}

	for (const slave of App.SlaveAssignment.reportSlaves(slaves)) {
		const slaveEntry = App.UI.DOM.makeElement("div", null, ["slave-report"]);
		const artSpan = App.UI.DOM.appendNewElement("span", slaveEntry);
		App.Events.addNode(slaveEntry, [nonConcubineText(slave), commonText(slave)]);
		App.SlaveAssignment.appendSlaveArt(artSpan, slave);
		slaveReports.push({
			id: slave.ID,
			report: slaveEntry,
		});
	}

	const afterFrag = new DocumentFragment();

	if (pregnantSlaves > 0 && FutureSocieties.isActive('FSRestart') && V.propOutcome !== 1 && V.eugenicsFullControl !== 1) {
		App.Events.addNode(afterFrag, [`The Societal Elite know what you are doing with your bedslaves. <span class="warning">They do not approve.</span>`], "p", ["indent"]);
		V.failedElite += (5 * pregnantSlaves);
	}

	if (V.masterSuiteDecoration !== "standard") {
		App.Events.addNode(afterFrag, [`${capFirstChar(V.masterSuiteName)}'s ${V.masterSuiteDecoration} atmosphere <span class="devotion inc">has a minor impact on your fucktoys.</span>`], "p", ["indent"]);
	}

	return {
		before: beforeFrag,
		slaves: slaveReports,
		after: afterFrag,
	};
};
