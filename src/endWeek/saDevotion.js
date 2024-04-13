/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.SlaveAssignment.devotion = function saDevotion(slave) {
	/** @type {string[]} */
	const r = [];

	const PC = V.PC;

	const {
		He, His, he, him, his, himself
	} = getPronouns(slave);
	const playerPronouns = getPronouns(V.PC);

	const gettingPersonalAttention = getPersonalAttention(slave.ID, "training") && !onBedRest(V.PC, true);

	if (slave.fetish === Fetish.MINDBROKEN) {
		mindbreakDevotion(slave);
	} else if (slave.fuckdoll !== 0) {
		fuckdollDevotion(slave);
	} else {
		hostageDevotion(slave);
		playerPregnancyThoughts(slave);
		if (slave.devotion <= 95) {
			slaveryResistance(slave);
		}
		FSImpacts(slave);
		if (slave.bodySwap > 0 && slave.origBodyOwnerID > 0) {
			bodySwapThoughts(slave);
		}
		retirementThoughts(slave);
		if (assignmentVisible(slave) && slave.assignment !== Job.FUCKTOY && V.personalAttention.task === PersonalAttention.SEX && (V.PC.dick > 0 || V.PC.vagina>= 0 || (slave.toyHole === ToyHole.DICK || V.policies.sexualOpenness === 1) && canPenetrate(slave)) && !onBedRest(V.PC, true)) {
			sexualAttentionThoughts(slave);
		}
		collectiveSpirit(slave);
		statCrossovers(slave);
		statRebounding(slave);
		devotionReport(slave);
		finalChanges(slave);
	}

	return r.join(" ");

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function mindbreakDevotion(slave) {
		r.push(`<span class="red">${His} mind is fundamentally broken, so ${his} experiences have no lasting effect on ${his} emotional state.</span>`);
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function fuckdollDevotion(slave) {
		r.push(`${He} is confined in a suit that limits ${his} perception of the outside world to tonal commands from the suit itself and things that are inserted into ${his}`);
		if (slave.vagina > -1) {
			r.push(`mouth, vagina,`);
		} else {
			r.push(`mouth`);
		}
		r.push(`and anus.`);
		if (slave.sexualFlaw === SexualFlaw.SELFHATING) {
			r.push(`${His} self hatred <span class="trust dec">cannot eliminate the growing fear</span> engendered by ${his} remaining spark of self-preservation.`);
			slave.trust -= 5;
		} else if (slave.trust > 50) {
			r.push(`${He} still hopes you'll ${him} out of ${his} suit so ${he} can be your good slave again, but <span class="trust dec">fear and doubt creep in</span> by the minute. And there are a lot of them.`);
		} else {
			r.push(`With little to do but`);
			if (slave.fuckdoll <= 60) {
				r.push(`wonder if ${he}'s about to be used,`);
			} else {
				r.push(`desperately hope ${he}'ll be used soon,`);
			}
			r.push(`${he} dwells on the <span class="trust dec">horrible fear</span> that this dark existence will be perpetual.`);
		}
		slave.trust -= 10;
		if (slave.sexualFlaw === SexualFlaw.SELFHATING) {
			r.push(`${He} knows to ${his} core that ${he} deserves this, <span class="devotion dec">slowing but not stopping ${his} descent into depression.</span>`);
			slave.devotion += 5;
		} else if (slave.devotion > 50) {
			r.push(`${He} spirals through <span class="devotion dec">obsessive depression,</span> wondering what ${he} did to deserve this fate.`);
		} else {
			r.push(`In the silence and darkness between the times ${he}'s used, ${he} has little to do but <span class="devotion dec">hate you.</span>`);
		}
		slave.devotion -= 10;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function hostageDevotion(slave) {
		if (slave.origin === "You were acquainted with $him before you were an arcology owner; your rival tried to use $him to manipulate you, but you rescued $him." && slave.newGamePlus === 0 && V.rival.FS.name !== "Slave Professionalism" && V.rival.FS.name !== "Intellectual Dependency") {
			let hostageSatisfied = false;
			if (V.rival.FS.name === "Eugenics" && ((slave.pregType > V.seeHyperPreg !== 1 ? 0 : 4 && slave.pregKnown) || slave.pregWeek < 0)) {
				hostageSatisfied = true;
			} else if (V.rival.FS.name === "Gender Radicalism" && slave.relationship === -3 && slave.trust > 50 && (slave.counter.anal === 0 || !canDoAnal(slave))) {
				hostageSatisfied = true;
			} else if (V.rival.FS.name === "Gender Fundamentalism" && (slave.toyHole === ToyHole.ASS || slave.toyHole === ToyHole.DICK)) {
				hostageSatisfied = true;
			} else if (V.rival.FS.name === "Body Purism" && slave.boobsImplant >= 30000 && slave.buttImplant > 7 && slave.lipsImplant >= 20) {
				hostageSatisfied = true;
			} else if (V.rival.FS.name === "Slimness Enthusiasm" && slave.boobs >= 50000 && slave.butt > 15) {
				hostageSatisfied = true;
			} else if (V.rival.FS.name === "Physical Idealism" && (((slave.diet === Diet.FATTEN || slave.diet === Diet.CALORIC || (slave.inflation > 1 && slave.inflationType === InflationLiquid.FOOD)) && slave.rules.living === "luxurious" && (slave.rules.rest === "permissive" || slave.rules.rest === "mandatory") && slave.rules.relationship === "permissive" && slave.rules.release.masturbation === 1 && slave.rules.release.slaves === 1) || (!onBedRest(V.PC, true) && ["ravish", "ravished"].includes(getPersonalAttentionType(slave.ID))))) { // not at all confusing
				hostageSatisfied = true;
			} else if (V.rival.FS.name === "Petite Admiration") {
				if (V.rival.duration <= 20) {
					if (V.PC.height >= slave.height + 30 && (slave.relationship === -3 || (!onBedRest(V.PC, true) && ["ravish", "ravished"].includes(getPersonalAttentionType(slave.ID))))) { // is 30 a good number?
						hostageSatisfied = true;
					}
					// else clause for a lover later
				} else {
					// empty for now
				}
			} else if (V.rival.FS.name === "Statuesque Glorification") {
				if (V.rival.duration <= 20) {
					if (V.PC.height - 30 <= slave.height && (slave.relationship === -3 || (!onBedRest(V.PC, true) && ["ravish", "ravished"].includes(getPersonalAttentionType(slave.ID))))) { // is 30 a good number?
						hostageSatisfied = true;
					}
					// else clause for a lover later
				} else {
					// empty for now
				}
			}
			// TODO: "Youth Preferentialism" "Maturity Preferentialism" "Racial Subjugationism" "Cummunism"? Mostly just want their lover taken along, so that'd need to be set up in pHostageAcquisition.
			// NOTE: "Eugenics" "Degradationism" "Transformation Fetishism" "Asset Expansionism" "Pastoralism" "Hedonistic Decadence" would want you to subject your other slaves to their whim.
			if (V.rival.duration <= 10 || V.rival.FS.name === "Racial Supremacism" || V.rival.FS.name === "Paternalism") {
				r.push(`You <span class="trust inc">saved ${slave.slaveName} from a living nightmare</span> under your rival's rule. ${He} <span class="devotion inc">tries ${his} best to adapt to ${his} savior's wishes.</span>`);
				slave.devotion += 10;
				slave.trust += 10;
			} else if (hostageSatisfied) {
				r.push(`Since you are <span class="trust inc">indulging</span> ${slave.slaveName}'s desires, ${he}`);
				if (slave.devotion <= 10) {
					r.push(`<span class="devotion inc">likes you more.</span>`);
					slave.devotion += 5;
				} else {
					r.push(`is willing to tolerate your ownership over ${him}.`);
				}
				slave.trust += 5;
			} else if (V.rival.duration > 20 && slave.devotion <= 20) {
				if (gettingPersonalAttention) {
					r.push(`You took everything from ${slave.slaveName} and <span class="devotion dec">${he} hates you for it.</span> Since you won't give ${him} what ${he} wants, ${he} <span class="defiant inc">continues to defy you.</span> Since you are putting such a personal touch into ${his} care, ${he} can't find it in ${him} to rebel as strongly.`);
					slave.devotion -= 5;
					slave.trust += 5;
				} else {
					r.push(`You took everything from ${slave.slaveName} and <span class="devotion dec">${he} hates you for it.</span> Since you won't give ${him} what ${he} wants, ${he} <span class="defiant inc">continues to defy you</span> no matter the repercussions.`);
					slave.devotion -= 25;
					slave.trust += 25;
				}
				// TODO: Add undermining if unbroken. Harassment of slaves, destruction of property, insulting citizens, etc. Vignettes might be ideal for this, sans slave harassment?
				// slave harassment will go under saRelationships.
			} else if (V.rival.duration > 10 && slave.devotion <= 20) {
				if (gettingPersonalAttention) {
					r.push(`${He} is <span class="trust dec">horrified by you.</span> Your rival taught ${him} a great deal about slave life in your arcology and indulged ${his} deepest fantasies. ${slave.slaveName} considers being your pet <span class="devotion dec">a fate worse than death.</span> Since you are putting such a personal touch into ${his} care, maybe you aren't the monster ${he} thought you were. ${He} can't find it in ${him} to hate and fear you as much.`);
					slave.devotion -= 3;
					slave.trust -= 3;
				} else {
					r.push(`${He} is <span class="trust dec">horrified by you.</span> Your rival taught ${him} a great deal about slave life in your arcology and indulged ${his} deepest fantasies. ${slave.slaveName} considers being your pet <span class="devotion dec">a fate worse than death.</span>`);
					slave.devotion -= 15;
					slave.trust -= 15;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function playerPregnancyThoughts(slave) {
		if (PC.preg > PC.pregData.normalBirth * .66) {
			if (slave.devotion > 60) {
				if (PC.pregMood === 2) {
					r.push(`${He} is devoted to you and does ${his} best to satisfy your demanding, hormone driven libido, no matter what you want from ${him}. ${His} efforts to give ${himself} you to <span class="devotion inc">further ${his} submission</span> to you.`);
					slave.devotion += 2;
				} else if (PC.pregMood === 1) {
					r.push(`${He} is devoted to you and tries ${his} best to accommodate your needs and desires. Your hormonal mothering <span class="trust inc">leaves ${him} slightly more trusting</span> of you.`);
					slave.trust += 2;
				} else {
					r.push(`${He} is devoted to you and tries ${his} best to accommodate whatever needs and desires your pregnancy ushers forth.`);
				}
			} else {
				if (PC.pregMood === 2) {
					r.push(`${He} is <span class="trust dec">horrified</span> of your aggressive sexual advances, forcing ${him} to <span class="devotion inc">bend to your will</span> or face punishment at the hands of a hormonal pregnant ${playerPronouns.woman}.`);
					slave.devotion += 4;
					slave.trust -= 4;
				} else if (PC.pregMood === 1) {
					r.push(`${He} happily <span class="devotion dec">takes advantage</span> of your hormone induced kindness, though your care <span class="trust inc">builds ${his} trust in you.</span>`);
					slave.devotion -= 4;
					slave.trust += 4;
				} else {
					r.push(`${He} takes note of your gravid form and <span class="devotion dec">begins testing just how much ${he} can get away with</span> while ${he} can.`);
					slave.devotion -= 3;
				}
			}
			if (canPenetrate(slave) && PC.vagina > 0 && random(20, 99) < PC.energy) {
				r.push(`Sometimes your cravings are too overpowering and ${he} finds ${himself} ordered to fuck you on the spot,`);
				if ((slave.rules.release.master === 1 && slave.trust >= -20) || disobedience(slave) > random(0, 99)) {
					if (slave.rules.release.master === 1 && slave.trust >= -20) {
						r.push(`which ${he} dutifully performs`);
					} else {
						r.push(`which ${he} eagerly does`);
					}
					if (PC.pregMood === 2) {
						r.push(`performs, even if "once" quickly becomes "more".`);
						seX(PC, "vaginal", slave, "penetrative", 3);
						PC.deferredNeed -= 10;
					} else {
						r.push(`performs.`);
						seX(PC, "vaginal", slave, "penetrative", 1);
						PC.deferredNeed -= 5;
					}
					tryKnockMeUp(PC, 2, 0, slave); // for superfetation shenanigans
				} else {
					if (slave.rules.release.master === 1 && slave.trust < -20) {
						r.push(`but ${he} finds ${himself} <span class="devotion dec">humiliated</span> when ${he} fails to get it up for you.`);
						slave.devotion -= 2;
					} else {
						r.push(`but ${he} doesn't dare to break the rules you've given ${him}.`);
					}
				}
			}
		}
		if (slave.counter.PCKnockedUp > 0) {
			const pregCountFactor = (slave.counter.PCKnockedUp * 5);
			if ((slave.devotion < -20 && slave.trust >= -20)) {
				r.push(`${He} got you pregnant`);
				if (slave.counter.PCKnockedUp > 1) {
					r.push(`more than once`);
				}
				r.push(`and ${he} knows it. This is a <span class="devotion dec">huge boost to ${his} ego</span> and gives ${him} a slight edge on you.`);
				slave.devotion -= pregCountFactor;
				if (slave.counter.PCChildrenFathered > 0) {
					r.push(`Even better; you gave birth to ${his} child${slave.counter.PCChildrenFathered > 1 ? "ren" : ""}. To ${him}, ${he} is the dominant force and you are just a bitch to be bred. ${He} could create a scandal if ${he} started running ${his} mouth, something ${he} lords over you every chance ${he} gets under the assumption that <span class="defiant inc">you'll try to appease ${him} to keep ${him} quiet.</span>`);
					slave.devotion -= (5 + pregCountFactor);
					slave.trust += (5 + pregCountFactor);
				}
			} else if (slave.devotion > 20 && slave.trust > 50 && PC.pregSource === slave.ID) {
				r.push(`${He} knocked you up`);
				if (slave.counter.PCKnockedUp > 1) {
					r.push(r.pop() + ",");
					r.push(`more than once,`);
				}
				r.push(`and you've chosen to keep ${his} child${PC.pregType > 1 ? "ren" : ""}. This is thrilling for ${him}, since ${he} must hold <span class="trust inc">some value</span> to you. Personally, you could do with ${him} being a little less overprotective of you.`);
				slave.trust += pregCountFactor;
				if (slave.counter.PCChildrenFathered > 0) {
					r.push(`Since you've beared child${slave.counter.PCChildrenFathered > 1 ? "ren" : ""} for ${him} already, you've created a <span class="devotion inc">lasting bound</span> with ${him}. You may not see ${him} as your lover, but your actions have solidified it as such, and ${he} is more than happy to fulfill any desires ${his} mate may have.`);
					slave.devotion += (5 + pregCountFactor);
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function slaveryResistance(slave) {
		if (slave.devotion <= 20) {
			const intimidated = intimidationDegree(slave, PC);
			if (intimidated >= 5) {
				r.push(`${He} finds you extremely intimidating and can't help but <span class="trust dec">involuntarily cower</span> when you are near.`);
			} else if (intimidated > 0) {
				r.push(`${He} finds you intimidating, putting ${him} <span class="trust dec">on edge</span> around you.`);
			} else if (intimidated <= -5) {
				r.push(`${He} finds you completely benign and <span class="trust dec">feels little threat</span> from you.`);
			} else if (intimidated < 0) {
				r.push(`${He} doesn't find you very intimidating, allowing ${him} <span class="trust inc">to relax</span> around you.`);
			}
			slave.trust += 1 * intimidated;
		}
		if (slave.devotion <= 20 && slave.devotion >= -50) {
			if (slave.trust > 20 && slave.devotion <= -20) {
				r.push(`${slave.slaveName} does not like you and believes that you will not punish ${him} severely; ${his} <span class="devotion dec">regard for you is severely reduced</span> by this lack of respect.`);
				slave.devotion -= 4;
			} else if (slave.trust >= -20) {
				r.push(`${slave.slaveName} neither likes nor fears you, and ${his} <span class="devotion dec">regard for you is reduced</span> by this lack of respect.`);
				slave.devotion -= 2;
			}
		}
		const effectiveInt = (slave.intelligence + slave.intelligenceImplant);
		if (effectiveInt > 95) {
			if (gettingPersonalAttention) {
				r.push(`${slave.slaveName}'s <span class="intelligent">brilliant mind</span> strongly resists slavery, but since you are giving ${him} personal attention you are able to compensate for ${his} genius.`);
			} else {
				if (slave.trust < -20) {
					r.push(`${slave.slaveName}'s <span class="intelligent">brilliant mind</span> strongly resists slavery, but ${he} fears you deeply enough that ${he} consciously forces ${himself} to obey out of self-preservation.`);
				} else if (slave.trust > 20 && slave.devotion < -20) {
					r.push(`${slave.slaveName}'s <span class="intelligent">brilliant mind</span> strongly <span class="devotion dec">rejects</span> being your slave and encourages ${him} to further <span class="defiant inc">undermine you.</span>`);
					slave.devotion -= 3;
					slave.trust += 2;
				} else {
					r.push(`${slave.slaveName}'s <span class="intelligent">brilliant mind</span> strongly <span class="devotion dec">resists</span> slavery and encourages ${him} to <span class="trust dec">fear you.</span>`);
					slave.devotion -= 2;
					slave.trust -= 2;
				}
			}
		} else if (effectiveInt > 50) {
			if (gettingPersonalAttention) {
				r.push(`${slave.slaveName}'s <span class="intelligent">highly acute mind</span> naturally resists slavery, but since you are giving ${him} personal attention you are able to compensate for ${his} intelligence.`);
			} else {
				if (slave.trust < -20) {
					r.push(`${slave.slaveName}'s <span class="intelligent">highly acute mind</span> naturally resists slavery, but ${he} fears you deeply enough that ${he} consciously forces ${himself} to obey out of self-preservation.`);
				} else if (slave.trust > 20 && slave.devotion < -20) {
					r.push(`${slave.slaveName}'s <span class="intelligent">highly acute mind</span> naturally <span class="devotion dec">rejects</span> being your slave and encourages ${him} to further <span class="defiant inc">work against you.</span>`);
					slave.devotion -= 2;
					slave.trust += 1;
				} else {
					r.push(`${slave.slaveName}'s <span class="intelligent">highly acute mind</span> naturally <span class="devotion dec">resists</span> slavery and encourages ${him} to <span class="trust dec">fear you.</span>`);
					slave.devotion -= 2;
					slave.trust -= 2;
				}
			}
		} else if (effectiveInt > 15) {
			if (gettingPersonalAttention) {
				r.push(`${slave.slaveName}'s <span class="intelligent">intelligent mind</span> naturally resists slavery, but since you are giving ${him} personal attention you are able to compensate for ${his} cleverness.`);
			} else {
				if (slave.trust < -20) {
					r.push(`${slave.slaveName}'s <span class="intelligent">intelligent mind</span> naturally resists slavery, but ${he} fears you deeply enough that ${he} consciously forces ${himself} to obey out of self-preservation.`);
				} else {
					r.push(`${slave.slaveName}'s <span class="intelligent">intelligent mind</span> naturally <span class="devotion dec">resists</span> slavery.`);
					slave.devotion -= 2;
				}
			}
		} else if (effectiveInt < -95) {
			r.push(`${slave.slaveName}'s <span class="stupid">moronic mind</span> naturally <span class="devotion inc">accepts</span> slavery, and ${he}'s imbecile enough to instinctively <span class="trust inc">trust you</span> to know what's best for ${him}.`);
			slave.devotion += 2;
			slave.trust += 2;
		} else if (effectiveInt < -50) {
			r.push(`${slave.slaveName}'s <span class="stupid">idiotic mind</span> naturally <span class="devotion inc">accepts</span> slavery, and ${he}'s stupid enough to instinctively <span class="trust inc">trust you</span> to know what's best.`);
			slave.devotion += 1;
			slave.trust += 1;
		} else if (effectiveInt < -15) {
			r.push(`${slave.slaveName}'s <span class="stupid">unintelligent mind</span> naturally <span class="devotion inc">accepts</span> slavery.`);
			slave.devotion += 1;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function FSImpacts(slave) {
		if (V.arcologies[0].FSPaternalistLaw === 1) {
			r.push(`The totally paternalistic society of your arcology encourages ${him} to <span class="trust inc">trust you.</span>`);
			slave.trust += 1;
		} else if (V.arcologies[0].FSPaternalist >= random(1, 120)) {
			r.push(`The paternalistic culture of your arcology encourages ${him} to <span class="trust inc">trust you.</span>`);
			slave.trust += 1;
		}
		if (V.arcologies[0].FSChattelReligionistLaw === 1) {
			r.push(`Your status as the prophet of your theocratic arcology encourages ${him} to <span class="trust inc">trust you.</span>`);
			slave.trust += 1;
		} else if (V.arcologies[0].FSChattelReligionist >= random(1, 120)) {
			r.push(`Your arcology's omnipresent religion encourages ${him} to <span class="trust inc">trust you.</span>`);
			slave.trust += 1;
		}
		if (FutureSocieties.isActive('FSRestart')) {
			if (slave.bellyPreg >= 1500 && slave.devotion <= 20) {
				if (slave.breedingMark === 1) {
					r.push(`The mark prominently displayed across ${his} pregnant swell fills ${him} with an <span class="trust inc">undue sense of pride.</span>`);
					slave.trust += 5;
				} else {
					r.push(`Being visibly pregnant in a society that loathes slave breeding fills ${him} with <span class="trust dec">fear</span> for ${himself} and ${his} unborn child.`);
					slave.trust -= 10;
				}
			} else if (slave.pregKnown === 1 && slave.devotion <= 20) {
				r.push(`Being pregnant in a society that loathes slave breeding fills ${him} with <span class="trust dec">worry</span> that you'll harm ${him} or ${his} unborn child.`);
				slave.trust -= 5;
			}
		}
		if (V.arcologies[0].FSChattelReligionistCreed === 1) {
			if (V.nicaea.focus === "slaves") {
				r.push(`The creed of ${V.nicaea.name} <span class="devotion inc">focuses on slaves</span> and is repeated constantly all around ${him}.`);
				slave.devotion += V.nicaea.power;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function bodySwapThoughts(slave) {
		if (getSlave(slave.origBodyOwnerID) === undefined) {
			slave.origBodyOwnerID = 0;
			if (slave.devotion > 20) {
				r.push(`${slave.slaveName} is somewhat saddened to see ${his} body leave forever.`);
			} else if (slave.devotion >= -50) {
				r.push(`${slave.slaveName} is <span class="devotion dec">disturbed</span> to find ${his} body is gone for good, damaging ${his} <span class="trust dec">ability to trust you.</span>`);
				slave.devotion -= 30;
				slave.trust -= 30;
			} else {
				r.push(`${slave.slaveName} is <span class="devotion dec">deeply upset</span> that ${he}'ll never see ${his} body again. With so little left, ${he} finds it easy to take vengeance by <span class="defiant inc">completely rejecting your ownership of ${him}.</span>`);
				slave.devotion -= 50;
				slave.trust = 100;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function retirementToCitizenIsSoonThoughts(slave) {
		r.push(`${He} knows that it's less than a year until ${his} retirement from sexual slavery into citizenship.`);
		if (slave.devotion > 95) {
			r.push(`Since ${he} loves you, ${he} has mixed feelings about the prospect, but ${he} prefers to think of it as your way of looking after ${him}. It's ${his} favorite subject, and ${his} strong feelings about it`);
			if (FutureSocieties.isActive('FSPaternalist')) {
				r.push(`advances paternalistic ideals and <span class="reputation inc">improves your reputation.</span>`);
				FutureSocieties.Change("Paternalist", 2);
			} else {
				r.push(`<span class="reputation inc">improves your reputation.</span>`);
				repX(V.FSSingleSlaveRep * 2, "retirement", slave);
			}
		} else if (slave.devotion >= -20) {
			r.push(`The prospect of manumission <span class="devotion inc">encourages ${him} to submit to slavery</span> and <span class="trust inc">encourages ${him} to be optimistic.</span>`);
			slave.devotion += 2;
			slave.trust += 2;
		} else {
			r.push(`The prospect of manumission encourages ${him} to <span class="trust inc">tolerate anything.</span>`);
			slave.trust += 2;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function retirementToCitizenThoughts(slave) {
		r.push(`${His} retirement from sexual slavery into citizenship is on the horizon.`);
		if (slave.devotion > 95) {
			r.push(`Since ${he} loves you, ${he} has mixed feelings about the prospect, but ${he} prefers to think of it as your way of looking after ${him}. This`);
			if (FutureSocieties.isActive('FSPaternalist')) {
				r.push(`advances paternalistic ideals and <span class="reputation inc">improves your reputation.</span>`);
				FutureSocieties.Change("Paternalist", 2);
			} else {
				r.push(`<span class="reputation inc">improves your reputation.</span>`);
				repX(V.FSSingleSlaveRep, "retirement", slave);
			}
		} else if (slave.devotion >= -20) {
			r.push(`The prospect of manumission <span class="devotion inc">cheers ${him} up</span> and <span class="trust inc">makes ${him} optimistic.</span>`);
			slave.devotion += 1;
			slave.trust += 1;
		} else {
			r.push(`The prospect of manumission works to make the indignities of slavery <span class="trust inc">weigh lightly</span> on ${him}.`);
			slave.trust += 1;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function cruelRetirementIsSoonThoughts(slave) {
		if (slave.devotion > 95) {
			r.push(`Since ${he} loves you, ${he} desperately tries not to think about it, though ${he} occasionally bursts into tears without provocation.`);
		} else if (slave.devotion > 20) {
			r.push(`To put it mildly, <span class="trust dec">${he} is terrified.</span>`);
			slave.trust -= 3;
		} else {
			r.push(`${He} is filled with <span class="trust dec">terror</span> and <span class="devotion dec">horror.</span>`);
			slave.devotion -= 3;
			slave.trust -= 3;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function cruelRetirementThoughts(slave) {
		if (slave.devotion > 95) {
			r.push(`Since ${he} loves you, ${he} tries not to think about it, though ${he} occasionally seems preoccupied.`);
		} else if (slave.devotion > 20) {
			r.push(`The prospect <span class="trust dec">scares ${him}.</span>`);
			slave.trust -= 2;
		} else {
			r.push(`The prospect <span class="trust dec">scares</span> and <span class="devotion dec">disgusts ${him}.</span>`);
			slave.devotion -= 2;
			slave.trust -= 2;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function retirementByFateThoughts(slave) {
		const relevantAge = V.policies.retirement.physicalAgePolicy === 0 ? slave.actualAge : slave.physicalAge;
		const expectedTime = V.retirementAge - relevantAge;

		if (expectedTime > 5) {
			return;
		}

		if (V.policies.retirement.fate === "citizen") {
			if (expectedTime < 2) {
				retirementToCitizenIsSoonThoughts(slave);
			} else {
				retirementToCitizenThoughts(slave);
			}
		} else if (V.policies.retirement.fate === "bioreactor") {
			if (expectedTime < 2) {
				r.push(`${He} knows that it's less than a year until ${his} permanent inclusion in the arcology's milk production systems.`);
				cruelRetirementIsSoonThoughts(slave);
			} else {
				r.push(`${He} knows that ${his} permanent inclusion in the arcology's milk production systems is not far off.`);
				cruelRetirementThoughts(slave);
			}
		} else if (V.policies.retirement.fate === "arcade") {
			if (expectedTime < 2) {
				r.push(`${He} knows that it's less than a year until ${he} is to be permanently encased in a bodysuit with holes for nothing but dick.`);
				cruelRetirementIsSoonThoughts(slave);
			} else {
				r.push(`${He} knows that ${his} ultimate fate as a Fuckdoll is not far off.`);
				cruelRetirementThoughts(slave);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function retirementThoughts(slave) {
		if (slave.indenture > -1) {
			if (slave.indenture <= 52) {
				r.push(`${He} knows that it's less than a year until ${his} indenture ends.`);
				if (slave.devotion > 95) {
					r.push(`Since ${he} loves you, ${he} has mixed feelings about the prospect.`);
				} else if (slave.devotion >= -20) {
					r.push(`The prospect of freedom <span class="devotion inc">encourages ${him} to submit to your orders</span> and <span class="trust inc">encourages ${him} to be optimistic.</span>`);
					slave.devotion += 2;
					slave.trust += 2;
				} else {
					r.push(`The prospect of freedom encourages ${him} to <span class="trust inc">tolerate anything.</span>`);
					slave.trust += 2;
				}
			} else {
				r.push(`The fact that ${he} is an indentured servant, not a permanent slave, is never truly far from ${his} mind.`);
				if (slave.devotion > 95) {
					r.push(`Since ${he} loves you, ${he} has mixed feelings about eventual freedom.`);
				} else if (slave.devotion >= -20) {
					r.push(`The prospect of eventual freedom <span class="devotion inc">cheers ${him} up</span> and <span class="trust inc">makes ${him} optimistic.</span>`);
					slave.devotion += 1;
					slave.trust += 1;
				} else {
					r.push(`The prospect of eventual freedom works to make the indignities of slavery <span class="trust inc">weigh lightly</span> on ${him}.`);
					slave.trust += 1;
				}
			}
			if (slave.devotion <= 20) {
				if (slave.indentureRestrictions >= 2) {
					r.push(`${He}'s also <span class="trust inc">able to rely on the protection</span> of ${his} indenture.`);
					slave.trust += 1;
				} else if (slave.indentureRestrictions >= 1) {
					r.push(`${He}'s also <span class="trust inc">able to trust the restrictions</span> that ${his} indenture places on ${his} treatment.`);
					slave.trust += 1;
				}
			}
		} else if (V.seeAge === 1) {
			retirementByFateThoughts(slave);
			if (V.policies.retirement.fate === "citizen") {
				if (slave.devotion <= 95 || slave.trust <= 95) {
					if (V.policies.retirement.sex > 0) {
						if (slave.counter.oral + slave.counter.anal + slave.counter.vaginal + slave.counter.penetrative + slave.counter.mammary >= V.policies.retirement.sex * 0.8) {
							if (slave.devotion >= -20) {
								r.push(`${He}'s <span class="devotion inc">more obedient</span> and <span class="trust inc">more tolerant,</span>`);
								slave.devotion += 1;
								slave.trust += 1;
							} else {
								r.push(`${He} does ${his} best to <span class="trust inc">stay strong,</span>`);
								slave.trust += 1;
							}
							r.push(`since ${he} knows that ${his} freedom is only a few thousand dicks away.`);
						}
					}
					if (V.policies.retirement.milk > 0) {
						if (slave.counter.milk >= V.policies.retirement.milk * 0.8) {
							if (slave.devotion >= -20) {
								r.push(`${He}'s <span class="devotion inc">more obedient</span> and <span class="trust inc">more tolerant,</span>`);
								slave.devotion += 1;
								slave.trust += 1;
							} else {
								r.push(`${He} does ${his} best to <span class="trust inc">stay strong,</span>`);
								slave.trust += 1;
							}
							r.push(`since ${he} knows ${he} will be free if ${his} udders can gush just a bit more cream.`);
						}
					}
					if (V.policies.retirement.cum > 0) {
						if (slave.counter.cum >= V.policies.retirement.cum * 0.8) {
							if (slave.devotion >= -20) {
								r.push(`${He}'s <span class="devotion inc">more obedient</span> and <span class="trust inc">more tolerant,</span>`);
								slave.devotion += 1;
								slave.trust += 1;
							} else {
								r.push(`${He} does ${his} best to <span class="trust inc">stay strong,</span>`);
								slave.trust += 1;
							}
							r.push(`since ${he} knows ${he} will be free if ${his} prick can spurt just a bit more jizz.`);
						}
					}
					if (V.policies.retirement.births > 0) {
						if (slave.counter.births >= V.policies.retirement.births * 0.6) {
							if (slave.devotion >= -20) {
								r.push(`${He}'s <span class="devotion inc">more obedient</span> and <span class="trust inc">more tolerant,</span>`);
								slave.devotion += 1;
								slave.trust += 1;
							} else {
								r.push(`${He} does ${his} best to <span class="trust inc">stay strong,</span>`);
								slave.trust += 1;
							}
							r.push(`since ${he} knows ${he} only has to successfully breed a little more to be free.`);
						}
					}
					if (V.policies.retirement.kills > 0) {
						if (slave.counter.pitKills >= V.policies.retirement.kills * 0.6) {
							if (slave.devotion >= -20) {
								r.push(`${He}'s <span class="devotion inc">more obedient</span> and <span class="trust inc">more tolerant,</span>`);
								slave.devotion += 1;
								slave.trust += 1;
							} else {
								r.push(`${He} does ${his} best to <span class="trust inc">stay strong,</span>`);
								slave.trust += 1;
							}
							r.push(`since ${he} knows just a bit more murder in the pit will win ${his} freedom.`);
						}
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function sexualAttentionThoughts(slave) {
		if (V.debugMode) {
			r.push(`${App.EndWeek.saVars.freeSexualEnergy}`);
		}
		if (App.EndWeek.saVars.freeSexualEnergy > 0) {
			if (App.EndWeek.saVars.freeSexualEnergy === 3) {
				r.push(`${He} gets a lot of sexual attention from you,`);
				if (isPlayerLusting()) {
					r.push(`since you're constantly aroused,`);
				} else {
					r.push(`since you don't have nearly enough dedicated fucktoys to keep you entertained,`);
				}
				r.push(`and this <span class="devotion inc">`);
				if (slave.devotion > 50) {
					r.push(`intensifies ${his} love for you.</span>`);
				} else {
					r.push(`forces ${him} to get used to sex slavery.</span>`);
				}
			} else if (App.EndWeek.saVars.freeSexualEnergy === 2) {
				r.push(`${He} receives some sexual attention from you, since you don't have enough dedicated fucktoys to keep you entertained, and this <span class="devotion inc">`);
				if (slave.devotion > 50) {
					r.push(`builds ${his} closeness to you.</span>`);
				} else {
					r.push(`gets ${him} used to being your sex slave.</span>`);
				}
			} else {
				r.push(`${He} receives occasional sexual attention from you, since you barely have enough dedicated fucktoys to keep you entertained, <span class="devotion inc">`);
				if (slave.devotion > 50) {
					r.push(`making ${him} feel closer to you.</span>`);
				} else {
					r.push(`keeping ${him} aware ${he}'s your sex slave.</span>`);
				}
			}
			slave.devotion += App.EndWeek.saVars.freeSexualEnergy;
			if (PC.dick > 0) {
				seX(slave, "oral", PC, "penetrative", App.EndWeek.saVars.freeSexualEnergy);
			} else {
				seX(slave, "oral", PC, "vaginal", App.EndWeek.saVars.freeSexualEnergy);
			}
			if (canDoVaginal(slave)) {
				if (slave.vagina > 0 && (canPenetrate(PC) || PC.clit >= 3)) {
					seX(slave, "vaginal", PC, "penetrative", App.EndWeek.saVars.freeSexualEnergy);
					if (canPenetrate(V.PC)) {
						tryKnockMeUp(slave, App.EndWeek.saVars.freeSexualEnergy, 0, PC);
					}
				} else if (V.PC.dick === 0 && slave.dick === 0) {
					seX(slave, "vaginal", PC, "vaginal", App.EndWeek.saVars.freeSexualEnergy);
					if (slave.balls > 0) {
						tryKnockMeUp(PC, App.EndWeek.saVars.freeSexualEnergy, 0, slave);
					}
					if (PC.balls > 0) {
						tryKnockMeUp(slave, App.EndWeek.saVars.freeSexualEnergy, 0, PC);
					}
				}
			}
			if (canDoAnal(slave) && slave.anus > 0 && (canPenetrate(PC) || PC.clit >= 3)) {
				seX(slave, "anal", PC, "penetrative", App.EndWeek.saVars.freeSexualEnergy);
				if (PC.balls > 0 && slave.mpreg === 1) {
					tryKnockMeUp(slave, App.EndWeek.saVars.freeSexualEnergy, 1, PC);
				}
			}
			if (slave.boobs > 500) {
				if (PC.dick > 0 || PC.clit >= 3) {
					seX(slave, "mammary", PC, "penetrative", App.EndWeek.saVars.freeSexualEnergy);
				} else {
					seX(slave, "mammary", PC, "vaginal", App.EndWeek.saVars.freeSexualEnergy);
				}
			}
			if ((slave.toyHole === ToyHole.DICK || V.policies.sexualOpenness === 1) && (canPenetrate(slave) || slave.clit >= 3)) {
				if (PC.vagina > 0) {
					seX(slave, "penetrative", PC, "vaginal", App.EndWeek.saVars.freeSexualEnergy);
					if (canImpreg(PC, slave)) {
						knockMeUp(PC, App.EndWeek.saVars.freeSexualEnergy, 0, slave.ID);
					}
				} else if (PC.anus > 0) {
					seX(slave, "penetrative", PC, "anal", App.EndWeek.saVars.freeSexualEnergy);
					if (canImpreg(PC, slave)) {
						knockMeUp(PC, App.EndWeek.saVars.freeSexualEnergy, 1, slave.ID);
					}
				}
				if (V.policies.sexualOpenness === 0) {
					PC.degeneracy++;
				}
			}
			V.PC.deferredNeed -= App.EndWeek.saVars.freeSexualEnergy * 2;
			if (V.PC.energy < 100) {
				V.PC.energy += .1;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function collectiveSpirit(slave) {
		if (V.slaves.length > 3) {
			let collectiveTrustEffect = 0;
			let collectiveDevotionEffect = 0;
			if (V.enduringDevotion > 50) {
				if (slave.devotion >= -20) {
					if (slave.devotion <= 20) {
						collectiveDevotionEffect = 1;
						slave.devotion += 1;
						if (assignmentVisible(slave)) {
							slave.devotion += 1;
						}
					}
				}
			} else if (V.enduringDevotion <= 0) {
				if (slave.devotion <= 20) {
					collectiveDevotionEffect = -1;
					slave.devotion -= 1;
					if (assignmentVisible(slave)) {
						slave.devotion -= 1;
					}
				}
			}
			if (V.enduringTrust > 50) {
				if (slave.trust >= -20) {
					if (slave.trust <= 20) {
						collectiveTrustEffect = 1;
						slave.trust += 1;
						if (assignmentVisible(slave)) {
							slave.trust += 1;
						}
					}
				}
			} else if (V.enduringTrust <= 0) {
				if (slave.trust <= 20) {
					collectiveTrustEffect = -1;
					slave.trust -= 1;
					if (assignmentVisible(slave)) {
						slave.trust -= 1;
					}
				}
			}
			if (collectiveDevotionEffect === 1) {
				if (collectiveTrustEffect === 1) {
					r.push(`Since ${he}'s ambivalent and fearful, the <span class="devotion inc">collective devotion</span> <span class="trust inc">and trust</span> of your slaves affect ${him} slightly.`);
				} else if (collectiveTrustEffect === 0) {
					r.push(`Since ${he}'s ambivalent about you, the <span class="devotion inc">collective devotion</span> your slaves feel for you affects ${him} slightly.`);
				} else {
					r.push(`Since ${he}'s ambivalent about you, the <span class="devotion inc">collective devotion</span> your slaves feel for you affects ${him} slightly, but their <span class="trust dec">general fear</span> affects ${him} too.`);
				}
			} else if (collectiveDevotionEffect === 0) {
				if (collectiveTrustEffect === 1) {
					r.push(`Since ${he}'s fearful of you, the <span class="trust inc">collective trust</span> your slaves place in you affects ${him} slightly.`);
				} else if (collectiveTrustEffect === -1) {
					r.push(`Since ${he} doesn't trust you, the <span class="trust dec">collective fear</span> your slaves feel for you affects ${him} slightly.`);
				}
			} else {
				if (collectiveTrustEffect === 1) {
					r.push(`The <span class="devotion dec">collective anger</span> your slaves feel reinforces ${his} own feelings, but their <span class="trust inc">collective trust</span> also affects ${him} slightly.`);
				} else if (collectiveTrustEffect === 0) {
					r.push(`The <span class="devotion dec">collective anger</span> your slaves feel reinforces ${his} own feelings.`);
				} else {
					r.push(`The <span class="devotion dec">collective anger</span> <span class="trust dec">and fear</span> your slaves feel reinforce ${his} own feelings.`);
				}
			}
		}
		if (assignmentVisible(slave)) {
			if (V.arcade !== 0 || (V.dairy !== 0 && V.dairyRestraintsSetting >= 2)) {
				if (slave.devotion <= 95) {
					r.push(`${He} knows about`);
					if (V.arcade !== 0) {
						if (V.dairy !== 0 && V.dairyRestraintsSetting >= 2) {
							r.push(`${V.arcadeName} and ${V.dairyName},`);
						} else {
							r.push(`${V.arcadeName},`);
						}
					} else {
						r.push(`${V.dairyName},`);
					}
					r.push(`and <span class="trust dec">fears</span> that you might send ${him} there.`);
					slave.trust -= 1;
				} else {
					r.push(`${He} knows some of your other slaves meet terrible, industrial fates, but ${he} loves you so much that ${he} tries not to think about it.`);
				}
			}
			if (App.EndWeek.saVars.slaveTortured !== "none") {
				if (!getPersonalAttention(slave.ID, "torture")) {
					if (canSee(slave) && slave.assignment === Job.FUCKTOY) {
						if (slave.fetish === Fetish.SADIST) {
							r.push(`${He} has <span class="devotion inc">fun</span> watching you spend your free time brutalizing a helpless slave. On the other hand, that ${he} could be next was a <span class="trust dec">little worrying.</span>`);
							slave.devotion++;
							slave.trust -= 5;
						} else {
							if (App.EndWeek.saVars.slaveTortured === "broken") {
								r.push(`Being forced to watch you brutalize a helpless slave <span class="trust dec">frightens</span> ${him} deeply.`);
								slave.trust -= 5;
							} else {
								r.push(`${He} is <span class="trust dec">horrified</span> to have to watch you carry out such brutality on another slave.`);
								slave.trust -= 10;
							}
						}
					} else if (App.EndWeek.saVars.slaveTortured !== "broken" && App.EndWeek.saVars.slaveTortured !== "mute" && canHear(slave)) {
						if (App.EndWeek.saVars.slaveTortured === "self hating") {
							if (slave.sexualFlaw === SexualFlaw.SELFHATING) {
								r.push(`${He} can't help but feel a <span class="devotion dec">little jealous</span> of the slave being beaten to death in your office.`);
								slave.devotion -= 2;
							} else {
								r.push(`What ${(slave.hears === -1) ? "little" : ""} ${he} hears coming out of your office is <span class="devotion dec">deeply unsettling;</span> a brutalized slave should not be begging for more with such desperation.`);
								if (slave.hears === -1) {
									slave.devotion -= 5;
								} else {
									slave.devotion -= 10;
								}
							}
						} else if (slave.fetish === Fetish.SADIST) {
							r.push(`The sounds of terror emanating from your office give such a <span class="devotion inc">delightfully sadistic</span> ambiance to your penthouse.`);
							slave.devotion++;
						} else if (App.EndWeek.saVars.slaveTortured === "love") {
							r.push(`The chilling cries of a deeply trusting slave being callously beaten echoing throughout the penthouse are enough to utterly horrify ${him}.`);
							if (slave.hears === -1) {
								r.push(`If only ${he} could hear just how bad it really is.`);
								slave.trust -= 10;
							} else {
								slave.trust -= 15;
							}
						} else if (App.EndWeek.saVars.slaveTortured === "normal") {
							r.push(`The sounds of terror emanating from your office keep ${him} <span class="trust dec">perpetually on edge.</span>`);
							if (slave.hears === -1) {
								r.push(`If only ${he} could hear just how bad they really are.`);
								slave.trust -= 5;
							} else {
								slave.trust -= 10;
							}
						}
					}
				}
			}
		}
		if (PC.degeneracy > 2) {
			if ((canPenetrate(slave) || slave.clit >= 3) && V.policies.sexualOpenness === 0) {
				if (slave.toyHole !== ToyHole.DICK && slave.skill.penetrative > 60) {
					r.push(`There are rumors about you enjoying taking it from slaves and`);
					if (slave.devotion < -50) {
						r.push(r.pop() + ",");
						r.push(`since ${he} is aware of ${his} skill at fucking, ${he} hopes that at some point <span class="defiant inc">you will submit to ${his} ${slave.clit >= 3 ? "clit" : "dick"}</span> and allow ${him} to <span class="devotion dec">vent ${his} anger by ${PC.vagina === -1 ? "buggering" : "screwing"} you mercilessly.</span>`);
						slave.devotion -= 5;
						slave.trust += 5;
					} else if (slave.devotion < 20 && slave.trust > 20) {
						r.push(`${he} is certain that at some point <span class="trust inc">you will come to ${him} for the fucking of a lifetime.</span>`);
						slave.trust += 5;
					} else if (slave.trust < -20) {
						r.push(`${he} is <span class="trust dec">terrified</span> that at some point you will decide to abuse ${his} penis because of ${his} penetrative skill.`);
						slave.trust -= 2;
					} else if (slave.devotion > 95) {
						r.push(r.pop() + ",");
						r.push(`although you aren't doing it with ${him}, ${he} worships you anyway.`);
					} else if (slave.devotion <= 20) {
						r.push(`<span class="trust inc">${he} is relieved</span> that you haven't chosen ${him} to be your sex toy.`);
						slave.trust++;
					} else {
						r.push(`${he} doesn't understand <span class="devotion dec">why you don't let ${him} ${PC.vagina === -1 ? "sodomize" : "fuck"} you</span> too.`);
						slave.devotion -= 2;
					}
				} else if (slave.toyHole === ToyHole.DICK) {
					if (slave.devotion > 95 && slave.trust > 50) {
						r.push(`<span class="trust dec">${He} feels guilty</span> over potentially being the cause of the rumors circling about you.`);
						slave.trust -= 5;
					} else if (slave.devotion < -50) {
						r.push(`${He} considers <span class="trust inc">you ${his} bitch</span> and <span class="devotion dec">believes you deserve the rumors circling about you.</span>`);
						slave.trust += 5;
						slave.devotion -= 5;
					} else if (slave.devotion < -20 && slave.trust > 20) {
						r.push(`${He} just loves <span class="trust inc">you submiting to ${his} ${slave.clit >= 3 ? "clit" : "dick"}</span> and <span class="devotion dec">savors being the source of some of the rumors</span> about you.`);
						slave.trust += 2;
						slave.devotion -= 2;
					} else if (slave.trust < 20) {
						r.push(`${He} is <span class="trust dec">worried</span> that you will blame ${him} for the rumors surrounding you.`);
						slave.trust -= 2;
					} else {
						r.push(`${He} pretends not to know anything about the rumors circling you, because <span class="trust inc">${he} is proud</span> to be allowed to penetrate you.`);
						slave.trust += 2;
					}
				}
			}
		}
		if (V.rapedThisWeek) {
			r.push(`Some of your slaves whisper among themselves that you have been raped.`);
			if (slave.devotion <= -20) {
				if (slave.fetish === Fetish.PREGNANCY && canImpreg(V.PC, slave)) {
					r.push(`${He} daydreams about being able to do it ${himself} and <span class="trust inc">put ${slave.counter.PCKnockedUp ? "another" : "a"} bastard in your womb.</span>`);
				} else if (slave.fetish === Fetish.DOM || slave.fetish === Fetish.SADIST) {
					r.push(`${He} daydreams about being able to do it ${himself}, slowly <span class="trust inc">subduing and dominating you</span> under his power.`);
				} else {
					r.push(`${He} feels more <span class="trust inc">encouraged to challenge you</span> if given the opportunity.`);
				}
				slave.trust += 10;
			} else if (slave.devotion <= 20) {
				r.push(`<span class="trust inc">${His} confidence increases</span> because ${he} thinks <span class="devotion dec">${he} can take advantage of your weakness.</span>`);
				slave.devotion -= 5;
				slave.trust +=5;
			} else if (slave.trust <= 50) {
				r.push(`${He} feels <span class="trust dec">vulnerable</span> because <span class="devotion dec">${his} ${getWrittenTitle(slave)} can't even protect ${playerPronouns.himself}.</span>`);
				slave.devotion -=5;
				slave.trust -=5;
			} else {
				r.push(`${He} knows well what it is to be assaulted and <span class="devotion inc">${he} empathizes with you.</span>`);
				slave.devotion++;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function statCrossovers(slave) {
		if (slave.trust >= -20) {
			if (slave.devotion > 95) {
				if (slave.trust <= 20) {
					r.push(`${slave.slaveName} loves you, so ${he} finds ${himself} <span class="trust inc">fearing you a little less.</span>`);
					slave.trust += 1;
				} else if (slave.trust <= 50) {
					r.push(`${slave.slaveName} loves you, so ${he} finds ${himself} <span class="trust inc">trusting you a little more.</span>`);
					slave.trust += 1;
				}
			} else if (slave.devotion > 60) {
				if (slave.trust <= 20) {
					r.push(`${slave.slaveName} is devoted to you, so ${he} finds ${himself} <span class="trust inc">fearing you a little less.</span>`);
					slave.trust += 1;
				}
			} else if (slave.devotion < -50) {
				if (slave.trust > 20) {
					r.push(`${slave.slaveName} hates you, but also doesn't fear you, <span class="defiant inc">bolstering ${his} disobedience.</span>`);
					slave.trust += 5;
				} else {
					r.push(`${slave.slaveName} hates you, so ${he} finds ${himself} <span class="trust dec">trusting you a little less.</span>`);
					slave.trust -= 2;
				}
			}
		}
		if (slave.trust > 95) {
			if (slave.devotion < -20) {
				r.push(`${slave.slaveName} feels no threat from you, so ${he} finds it easy to <span class="devotion dec">express ${his} hatred of you.</span>`);
				slave.devotion -= 10;
			} else if (slave.devotion <= 20) {
				r.push(`${slave.slaveName} trusts you implicitly, so ${he} finds ${himself} <span class="devotion inc">hating you a little less.</span>`);
				slave.devotion += 1;
			} else if (slave.devotion <= 50) {
				r.push(`${slave.slaveName} trusts you implicitly, so ${he} finds ${himself} <span class="devotion inc">liking you a little more.</span>`);
				slave.devotion += 1;
			}
		} else if (slave.trust > 50) {
			if (slave.devotion < -20) {
				r.push(`${slave.slaveName} finds you non-threatening, so it's easy for ${him} to <span class="devotion dec">defy you.</span>`);
				slave.devotion -= 5;
			} else if (slave.devotion <= 20) {
				r.push(`${slave.slaveName} trusts you, so ${he} finds ${himself} <span class="devotion inc">hating you a little less.</span>`);
				slave.devotion += 1;
			}
		} else if (slave.trust < -50) {
			if (slave.devotion >= -20) {
				if (slave.devotion <= 50) {
					r.push(`${slave.slaveName} is so terrified of you that ${he} tries desperately to avoid punishment, <span class="devotion inc">which is sometimes indistinguishable from devotion.</span>`);
					slave.devotion += 2;
				}
			}
		} else if (slave.trust < -20) {
			if (slave.devotion > 20) {
				if (slave.devotion <= 50) {
					r.push(`${slave.slaveName} is scared of you, but not truly terrified, so ${he} feels safe in <span class="devotion dec">hating the worst parts of being your sex slave.</span>`);
					slave.devotion -= 2;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function statRebounding(slave) {
		if (slave.tankBaby > 0) {
			if (slave.devotion <= 95) {
				r.push(`The tank's imprinting systems left a <span class="devotion inc">deep, subconscious`);
				if (slave.tankBaby === 2) {
					r.push(`need`);
				} else {
					r.push(`desire`);
				}
				r.push(`</span> to serve ${his} owner.`);
				slave.devotion += 2;
			}
		}
		if (slave.sexualQuirk === SexualQuirk.UNFLINCHING) {
			if (slave.devotion <= 95) {
				if (slave.devotion < slave.oldDevotion) {
					r.push(`${His} unflinching nature leads ${him} to forget some of the unpleasant things ${he}'s experienced this week, <span class="devotion inc">reducing their impact on ${his} feelings about you.</span>`);
					slave.devotion += Math.trunc((slave.oldDevotion - slave.devotion) / 2);
				}
			}
		} else if (slave.health.tired > 30) {
			if (slave.devotion <= 50) {
				if (slave.devotion < slave.oldDevotion) {
					r.push(`Some of the less unpleasant things done to ${him} this week slip ${his} tired mind, <span class="devotion inc">reducing their impact on ${his} feelings about you.</span>`);
					slave.devotion += Math.trunc((slave.oldDevotion - slave.devotion) / 4);
				}
			}
		}
		if (slave.health.tired > 30) {
			if (slave.trust >= -50) {
				if (slave.trust < slave.oldTrust) {
					r.push(`In ${his} tired state, ${he} begins to recall things as <span class="trust dec">worse than they actually were.</span>`);
					slave.trust -= Math.trunc((slave.oldTrust - slave.trust) / 2);
				}
			}
		}

		// CAPS ON DEVOTION GAIN
		if (slave.tankBaby === 1) {
			r.push(`The incubation facility conditioned ${his} mind for total subservience to ${his} owner; ${he} cannot resist ${his} progress.`);
		} else if (slave.tankBaby === 2) {
			r.push(`The incubation facility conditioned ${his} mind for total reverence of ${his} owner; ${he} cannot resist ${his} progress.`);
		} else if (slave.devotion >= -20) {
			if (slave.devotion >= (slave.oldDevotion + 5)) {
				if (V.arcologies[0].FSChattelReligionist >= random(1, 100)) {
					r.push(`The natural resilience of ${his} mind is overcome by the omnipresent combination of faith and servitude in ${V.arcologies[0].name}, and ${he} does not resist ${his} progress down the path towards total subservience.`);
				} else if (gettingPersonalAttention) {
					r.push(`${He} gained so much regard for you this week that ${his} natural reaction is to rebound a little, but since you're giving ${him} personal attention, your charismatic presence prevents this.`);
				} else if (slave.devotion < 95) {
					r.push(`So many things served to drive ${him} into subservience this week that ${his} mind <span class="devotion dec">rebounds a little.</span>`);
					slave.devotion = (slave.oldDevotion + 5);
				}
			}
		} else {
			if (slave.devotion >= (slave.oldDevotion + 5)) {
				if (slave.behavioralFlaw === BehavioralFlaw.ARROGANT) {
					r.push(`Though ${he} made progress this week, <span class="devotion dec">it is limited by ${his} arrogance.</span>`);
					slave.devotion = (slave.oldDevotion + 5);
				} else if (slave.behavioralFlaw === BehavioralFlaw.BITCHY && canTalk(slave)) {
					r.push(`Though ${he} made progress this week, <span class="devotion dec">it is limited by the independence ${he} regains by making snide comments.</span>`);
					slave.devotion = (slave.oldDevotion + 5);
				} else if (slave.behavioralFlaw === BehavioralFlaw.DEVOUT) {
					r.push(`Though ${he} made progress this week, <span class="devotion dec">it is limited by the independence ${he} regains through reliance on ${his} faith.</span>`);
					slave.devotion = (slave.oldDevotion + 5);
				} else if (slave.behavioralFlaw === BehavioralFlaw.LIBERATED) {
					r.push(`Though ${he} made progress this week, <span class="devotion dec">it is limited by the independence ${he} retains due to ${his} moral convictions that this is wrong.</span>`);
					slave.devotion = (slave.oldDevotion + 5);
				}
			}
		}

		// CAPS ON TRUST GAIN
		const trustCap = slave.oldTrust + 5;
		if (slave.tankBaby === 1) {
			r.push(`Any natural doubts ${he} has are overcome by ${his} conditioning in the incubation facility; ${he} cannot resist trusting ${his} owner.`);
		} else if (slave.trust >= trustCap) {
			if (slave.trust >= -20) {
				if (slave.devotion < -20 && slave.trust > 20) {
					r.push(`Any doubts ${he} harbors are overcome by ${his} faith in ${himself}, and ${he} decides to deem you toothless.`);
				} else if (V.arcologies[0].FSChattelReligionist >= random(1, 100)) {
					r.push(`Any natural doubts ${he} harbors are overcome by ${his} belief in Chattel Religionism, and ${he} does not resist ${his} progress down the path towards total trust in you.`);
				} else if (gettingPersonalAttention) {
					r.push(`${He} gained so much trust in you this week that ${his} natural reaction is to doubt ${himself}, but since you're giving ${him} personal attention, ${he} decides to trust ${his} understanding of your will.`);
				} else if (slave.trust < 95) {
					r.push(`${He} gained so much trust in you this week that ${he} <span class="trust dec">draws back a little</span> out of self-doubt.`);
					slave.trust = trustCap;
				}
			} else if (slave.behavioralFlaw === BehavioralFlaw.ODD && slave.collar !== "shock punishment") {
				r.push(`Though ${he} made progress this week, <span class="trust dec">it is limited by ${his} preoccupation with ${his} own oddities.</span>`);
				slave.trust = trustCap;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function devotionReport(slave) {
		let energyPlus = 0;

		if (slave.devotion > 100 && slave.trust > 100) {
			r.push(`${His} perfect devotion and trust <span class="reputation inc">improve your reputation.</span>`);
			repX(10 * (slave.devotion - 100), "slavesViewOfPC", slave);
			repX(10 * (slave.trust - 100), "slavesViewOfPC", slave);
			if (slave.energy <= 50 && App.Utils.sexAllowed(slave, PC)) {
				energyPlus += Math.trunc((slave.trust + slave.devotion) - 200);
			}
			slave.devotion = 100;
			slave.trust = 100;
		} else {
			if (slave.devotion > 100) {
				if (slave.trust < 100 && slave.trust > 20) {
					slave.trust += Math.trunc((slave.devotion - 100) * 5) / 10;
				} else if (slave.energy <= 50 && App.Utils.sexAllowed(slave, PC)) {
					energyPlus += Math.trunc(slave.devotion - 100);
				} else {
					r.push(`${His} extreme devotion <span class="reputation inc">improved your reputation.</span>`);
					repX(10 * (slave.devotion - 100), "slavesViewOfPC", slave);
				}
				slave.devotion = 100;
			} else if (slave.devotion > 95) {
				slave.devotion = 100;
			} else if (slave.devotion < -95) {
				slave.devotion = -100;
			}
			if (slave.trust > 100) {
				if (slave.devotion < 100 && slave.devotion > 20) {
					slave.devotion += Math.trunc(slave.trust - 100);
				} else if (slave.devotion < -20) {
					r.push(`${His} blatant disregard for your rule <span class="reputation dec">damages your reputation.</span>`);
					repX(-30 * (slave.trust - 100), "slavesViewOfPC", slave);
				} else if (slave.energy <= 50 && App.Utils.sexAllowed(slave, PC)) {
					energyPlus += Math.trunc(slave.trust - 100);
				} else {
					r.push(`${His} extreme trust <span class="reputation inc">improved your reputation.</span>`);
					repX(10 * (slave.trust - 100), "slavesViewOfPC", slave);
				}
				slave.trust = 100;
			} else if (slave.trust > 95) {
				slave.trust = 100;
			} else if (slave.trust < -95) {
				slave.trust = -100;
			}
		}
		if (energyPlus > 0) {
			r.push(`${His} confidence in ${his} sexuality <span class="libido inc">improved ${his} low sex drive.</span>`);
			slave.energy += energyPlus;
		}
		if (slave.devotion > 95) {
			r.push(`${slave.slaveName}'s <span class="devotion worship">worshipfulness is beyond improvement,</span> and ${his}`);
		} else if (slave.devotion > 50) {
			if (slave.devotion > slave.oldDevotion) {
				r.push(`${slave.slaveName}'s <span class="devotion accept">devotion increased</span> and ${his}`);
			} else if (slave.devotion === slave.oldDevotion) {
				r.push(`${slave.slaveName}'s <span class="devotion ambivalent">devotion did not change</span> and ${his}`);
			} else {
				r.push(`${slave.slaveName}'s <span class="devotion resistant">devotion dropped</span> and ${his}`);
			}
		} else if (slave.devotion >= -20) {
			if (slave.devotion > slave.oldDevotion) {
				r.push(`${slave.slaveName}'s <span class="devotion inc">regard for you increased</span> and ${his}`);
			} else if (slave.devotion === slave.oldDevotion) {
				r.push(`${slave.slaveName}'s <span class="noteworthy">regard for you did not change</span> and ${his}`);
			} else {
				r.push(`${slave.slaveName}'s <span class="devotion dec">regard for you dropped</span> and ${his}`);
			}
		} else {
			if (slave.devotion > slave.oldDevotion) {
				r.push(`${slave.slaveName}'s <span class="devotion inc">resistance dropped</span> and ${his}`);
			} else if (slave.devotion === slave.oldDevotion) {
				r.push(`${slave.slaveName}'s <span class="noteworthy">resistance did not change</span> and ${his}`);
			} else {
				r.push(`${slave.slaveName}'s <span class="devotion dec">resistance increased</span> and ${his}`);
			}
		}
		if (slave.devotion < -20) {
			if (slave.trust > 95) {
				r.push(`<span class="defiant full">fear of you is non existent.</span>`);
			} else if (slave.trust > 20) {
				if (slave.trust > 20 && slave.trust > slave.oldTrust) {
					r.push(`<span class="defiant inc">fear of you</span> dropped this week.`);
				} else if (slave.trust > 20 && slave.trust === slave.oldTrust) {
					r.push(`<span class="noteworthy">fear did not change</span> this week.`);
				} else {
					r.push(`<span class="improvement">fear increased</span> this week.`);
				}
			} else {
				if (slave.trust > slave.oldTrust) {
					r.push(`<span class="mediumaquamarine">fear dropped</span> this week.`);
				} else if (slave.trust === slave.oldTrust) {
					r.push(`<span class="noteworthy">fear did not change</span> this week.`);
				} else {
					r.push(`<span class="trust dec">fear increased</span> this week.`);
				}
			}
		} else {
			if (slave.trust > 95) {
				r.push(`<span class="trust prof-trusting">trust in you is total.</span>`);
			} else if (slave.trust > 20) {
				if (slave.trust > 20 && slave.trust > slave.oldTrust) {
					r.push(`<span class="trust inc">trust improved</span> this week.`);
				} else if (slave.trust > 20 && slave.trust === slave.oldTrust) {
					r.push(`<span class="noteworthy">trust did not change</span> this week.`);
				} else {
					r.push(`<span class="trust dec">trust dropped</span> this week.`);
				}
			} else {
				if (slave.trust > slave.oldTrust) {
					r.push(`<span class="trust inc">fear dropped</span> this week.`);
				} else if (slave.trust === slave.oldTrust) {
					r.push(`<span class="noteworthy">fear did not change</span> this week.`);
				} else {
					r.push(`<span class="trust dec">fear increased</span> this week.`);
				}
			}
		}

		if (slave.devotion > 50 && slave.oldDevotion <= 50) {
			r.push(`<span class="positive">${He} has gone from accepting ${his} position to being devoted to you!</span>`);
			slave.devotion += 1;
		} else if (slave.devotion > 20 && slave.oldDevotion <= 20) {
			r.push(`<span class="positive">${He} has gone from being ambivalent toward you to accepting your ownership of ${him}!</span>`);
			slave.devotion += 1;
		} else if (slave.devotion >= -20 && slave.oldDevotion < -20) {
			r.push(`<span class="positive">${He} has gone from disliking you to being ambivalent about you!</span>`);
			slave.devotion += 1;
		} else if (slave.devotion >= -50 && slave.oldDevotion < -50) {
			r.push(`<span class="positive">${He} has gone from hating you to merely disliking you!</span>`);
			slave.devotion += 1;
		}

		if (slave.devotion < -20) {
			if (slave.trust > 50 && slave.oldTrust <= 50) {
				r.push(`<span class="warning">${He} has gone from being careful around you to showing open defiance!</span>`);
				slave.trust++;
			} else if (slave.trust > 20 && slave.oldTrust <= 20) {
				r.push(`<span class="noteworthy">${He} has gone from fearing you to merely being careful around you!</span>`);
				slave.trust++;
			} else if (slave.trust >= -20 && slave.oldTrust < -20) {
				r.push(`<span class="noteworthy">${He} has gone from being afraid of you to being merely fearful!</span>`);
				slave.trust++;
			} else if (slave.trust >= -50 && slave.oldTrust < -50) {
				r.push(`<span class="noteworthy">${He} has gone from being terrified to being merely afraid of you!</span>`);
				slave.trust++;
			}
		} else {
			if (slave.trust > 50 && slave.oldTrust <= 50) {
				r.push(`<span class="positive">${He} has gone from being careful around you to trusting you!</span>`);
				slave.trust += 1;
			} else if (slave.trust > 20 && slave.oldTrust <= 20) {
				r.push(`<span class="positive">${He} has gone from fearing you to merely being careful around you!</span>`);
				slave.trust += 1;
			} else if (slave.trust >= -20 && slave.oldTrust < -20) {
				r.push(`<span class="positive">${He} has gone from being afraid of you to being merely fearful!</span>`);
				slave.trust += 1;
			} else if (slave.trust >= -50 && slave.oldTrust < -50) {
				r.push(`<span class="positive">${He} has gone from being terrified to being merely afraid of you!</span>`);
				slave.trust += 1;
			}
		}

		if (slave.trust < -20 && slave.oldTrust >= -20) {
			if (slave.devotion <= 20) {
				r.push(`<span class="positive">${He} has gone from merely fearing you to actively being afraid of you!</span>`);
				slave.trust -= 2;
			}
		}
		if (V.debugMode) {
			r.push(`(Devotion: ${slave.devotion - slave.oldDevotion}; Trust: ${slave.trust - slave.oldTrust})`);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function finalChanges(slave) {
		// done stealthily to make the slave's progression seem natural
		if (slave.rudeTitle === 1 && slave.devotion >= -50) {
			slave.custom.title = "";
			slave.custom.titleLisp = "";
			slave.rudeTitle = 0;
		}
	}
};
