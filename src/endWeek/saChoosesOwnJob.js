/**
 * This function is the old "first pass", which actually picks the job.
 * The slaves' reasoning is saved in saVars for later use.
 * @param {App.Entity.SlaveState} slave
 */
App.SlaveAssignment.choosesOwnJob = function saChoosesOwnJob(slave) {
	/** @type {string[]} */
	const r = [];

	const arcology = V.arcologies[0];
	const clinicL = App.Entity.facilities.clinic.employeesIDs().size;
	const schoolL = App.Entity.facilities.schoolroom.employeesIDs().size;
	const servQL = App.Entity.facilities.servantsQuarters.employeesIDs().size;
	const nurseryL = App.Entity.facilities.nursery.employeesIDs().size;
	const brothelL = App.Entity.facilities.brothel.employeesIDs().size;
	const clubL = App.Entity.facilities.club.employeesIDs().size;
	const masterSL = App.Entity.facilities.masterSuite.employeesIDs().size;
	const spaL = App.Entity.facilities.spa.employeesIDs().size;
	const dairyL = App.Entity.facilities.dairy.employeesIDs().size;

	const {
		He, he, him, his, himself, girl,
	} = getPronouns(slave);

	if (slave.fuckdoll > 0 || slave.fetish === Fetish.MINDBROKEN) {
		// deal with slaves who are incapable of actually choosing their own assignment
		r.push(`was assigned to ${slave.assignment}. ${He}'s allowed to choose ${his} own job, but is <span style="warning">mentally incapable</span> of doing so,`);
		if (slave.assignment === Job.CHOICE) {
			r.push(`and <span class="job change">rests for the week</span> instead.`);
			removeJob(slave, slave.assignment);
		} else {
			r.push(`and just keeps doing the same thing this week.`);
		}
		slave.choosesOwnAssignment = 0;
		App.EndWeek.saVars.choosesOwnAssignmentText[slave.ID] = r.join(' ');
	} else {
		// give stats bonus, construct decision string for display during slave report, and actually change the assignment
		slave.devotion++;
		slave.trust++;
		App.EndWeek.saVars.choosesOwnAssignmentText[slave.ID] = jobSelection(slave);
	}

	return;

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {Array<string>}
	 */
	function assignPublicService(slave) {
		slave.sexAmount = 10;
		if (V.universalRulesAssignsSelfFacility === 1 && V.club > clubL) {
			return [`in ${V.clubName}.</span>`, assignJob(slave, Job.CLUB)];
		} else {
			return [`on the streets.</span>`, assignJob(slave, Job.PUBLIC)];
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {Array<string>}
	 */
	function assignFucktoy(slave) {
		if (V.universalRulesAssignsSelfFacility === 1 && V.masterSuite > masterSL) {
			r.push(`so ${he} <span class="job change">heads straight to ${V.masterSuiteName}.</span>`);
			r.push(assignJob(slave, Job.MASTERSUITE));
		} else {
			r.push(`so ${he} cheerfully <span class="job change">designates ${himself} one of your fucktoys.</span>`);
			r.push(assignJob(slave, Job.FUCKTOY));
		}
		return r;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {Array<string>}
	 */
	function assignServant(slave) {
		const r = [`so ${he} <span class="job change">decides to work`];
		if (V.universalRulesAssignsSelfFacility === 1 && V.servantsQuarters > servQL) {
			r.push(`from ${V.servantsQuartersName}</span> to make your penthouse as clean and homelike as possible.`);
			r.push(assignJob(slave, Job.QUARTER));
		} else {
			r.push(`as a servant</span> to make your penthouse as clean and homelike as possible.`);
			r.push(assignJob(slave, Job.HOUSE));
		}
		return r;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function jobSelection(slave) {
		let choice = [];

		choice.push(`was assigned to ${slave.assignment}. ${He} ${canSee(slave) ? "watches" : "observes"} your other slaves to decide what to do, <span class="devotion inc">happy</span> to be permitted a choice and a little more <span class="trust inc">confident</span> than if you had just given ${him} orders. The ${SlaveTitle(slave)}`);

		if (slave.devotion <= 20 && slave.trust >= -20) {
			if (slave.relationship === -3 && slave.devotion < -20) {
				choice.push(`is reluctantly married to you, and ${he} thinks of all the ways ${he} <span class="devotion dec">can take advantage of this,</span>`);
				if (V.universalRulesAssignsSelfFacility === 1 && V.spa > spaL) {
					choice.push(`so ${he} <span class="job change">heads straight to ${V.spaName}</span> to relax.`);
					choice.push(assignJob(slave, Job.SPA));
				} else {
					choice.push(`so ${he} cheerfully <span class="job change">decides to lounge about the penthouse.</span>`);
					choice.push(removeJob(slave, slave.assignment));
				}
			} else {
				choice.push(`<span class="job change">decides to rest,</span> taking advantage of your permission to <span class="devotion dec">remain indolent.</span>`);
				choice.push(removeJob(slave, slave.assignment));
			}
			slave.devotion -= 5;
		} else if (slave.health.illness > 1) {
			if (V.universalRulesAssignsSelfFacility === 1 && V.clinic > clinicL) {
				choice.push(`is ill, so ${he} <span class="job change">decides to get treatment at ${V.clinicName}.</span>`);
				choice.push(assignJob(slave, Job.CLINIC));
			} else {
				choice.push(`is ill, so ${he} <span class="job change">decides to rest.</span>`);
				choice.push(removeJob(slave, slave.assignment));
			}
		} else if (slave.health.condition < 20) {
			if (V.universalRulesAssignsSelfFacility === 1 && V.spa > spaL) {
				choice.push(`is unhealthy, so ${he} <span class="job change">decides to recover at ${V.spaName}.</span>`);
				choice.push(assignJob(slave, Job.SPA));
			} else {
				choice.push(`is unhealthy, so ${he} <span class="job change">decides to rest.</span>`);
				choice.push(removeJob(slave, slave.assignment));
			}
		} else if (slave.health.tired > 45) {
			if (V.universalRulesAssignsSelfFacility === 1 && V.spa > spaL) {
				choice.push(`is tired, so ${he} <span class="job change">decides to recover at ${V.spaName}.</span>`);
				choice.push(assignJob(slave, Job.SPA));
			} else {
				choice.push(`is tired, so ${he} <span class="job change">decides to rest.</span>`);
				choice.push(removeJob(slave, slave.assignment));
			}
		} else if (slave.boobsMilk > 0) {
			choice.push(`<span class="job change">rushes to get milked</span> since ${his} breasts have become painfully engorged.`);
			choice.push(assignJob(slave, Job.MILKED));
		} else if (slave.intelligenceImplant < 15 && slave.intelligence > 10 && (arcology.FSPaternalist > 20 || arcology.FSSlaveProfessionalism > 20) && arcology.FSGenderFundamentalistLawBimbo !== 1 ) {
			if (V.universalRulesAssignsSelfFacility === 1 && V.schoolroom > schoolL) {
				choice.push(`is uneducated, so ${he} <span class="job change">sits ${himself} down in ${V.schoolroomName}.</span>`);
				choice.push(assignJob(slave, Job.SCHOOL));
			} else {
				choice.push(`is uneducated, so ${he} <span class="job change">sits ${himself} down to learn.</span>`);
				choice.push(assignJob(slave, Job.CLASSES));
			}
		} else if ((S.Attendant && V.universalRulesAssignsSelfFacility === 1 && V.spa > spaL) && (slave.devotion < 45 || slave.trust < 45 || (slave.sexualFlaw !== SexualFlaw.NONE && !App.Data.misc.paraphiliaList.includes(slave.sexualFlaw)) || slave.behavioralFlaw !== BehavioralFlaw.NONE)) {
			choice.push(`could use some counseling, so ${he} <span class="job change">decides to visit ${V.spaName}.</span>`);
			choice.push(assignJob(slave, Job.SPA));
		} else if (slave.devotion <= 50 && canWalk(slave) && canSee(slave)) {
			if (V.universalRulesAssignsSelfFacility === 1 && V.servantsQuarters > servQL) {
				choice.push(`is obedient but not devoted, so ${he} <span class="job change">decides to work from ${V.servantsQuartersName}</span> since it's the least sexually demanding job available.`);
				choice.push(assignJob(slave, Job.QUARTER));
			} else {
				choice.push(`is obedient but not devoted, so ${he} <span class="job change">decides to work as a servant</span> since it's the least sexually demanding job available.`);
				choice.push(assignJob(slave, Job.HOUSE));
			}
		} else if (V.universalRulesAssignsSelfFacility === 1 && slave.devotion > 50 && canWalk(slave) && canSee(slave) && V.nursery > nurseryL && (V.cribs.find((c) => (c.mother === slave.ID || c.father === slave.ID)))) {
			if (V.cribs.find((c) => (c.mother === slave.ID || c.father === slave.ID))) {
				choice.push(`wants to look after ${his} child, so ${he} <span class="job change">decides to work in ${V.nurseryName}.</span>`);
				choice.push(assignJob(slave, Job.NURSERY));
			} else { // motherly sexualQuirk
				choice.push(`enjoys taking care of children, so ${he} <span class="job change">decides to work in ${V.nurseryName}.</span>`);
				choice.push(assignJob(slave, Job.NURSERY));
			}
		} else if (slave.relationship === -1) {
			choice.push(`relies on promiscuity to fulfill ${his} emotional needs,`);
			if (V.cash < 10000) {
				choice.push(`and doesn't mind being a whore, <span class="job change">so ${he} prostitutes ${himself}`);
				if (V.universalRulesAssignsSelfFacility === 1 && V.brothel > brothelL) {
					choice.push(`in ${V.brothelName}.</span>`);
					choice.push(assignJob(slave, Job.BROTHEL));
				} else {
					choice.push(`on the streets.</span>`);
					choice.push(assignJob(slave, Job.WHORE));
				}
			} else {
				choice.push(`so ${he} eagerly <span class="job change">decides to slut around`);
				choice.push(...assignPublicService(slave));
			}
		} else if (slave.relationship === -2) {
			choice.push(`is emotionally bonded to you,`);
			if (slave.behavioralQuirk === BehavioralQuirk.INSECURE) {
				choice.push(`but insecure, so ${he} <span class="job change">decides to make you money by prostituting ${himself}`);
				if (V.universalRulesAssignsSelfFacility === 1 && V.brothel > brothelL) {
					choice.push(`in ${V.brothelName}.</span>`);
					choice.push(assignJob(slave, Job.BROTHEL));
				} else {
					choice.push(`on the streets.</span>`);
					choice.push(assignJob(slave, Job.WHORE));
				}
				slave.sexAmount = 10;
			} else if (slave.behavioralQuirk === BehavioralQuirk.ADVOCATE) {
				choice.push(`and an advocate for slavery, so ${he} <span class="job change">decides to burnish your reputation by slutting it up`);
				choice.push(...assignPublicService(slave));
			} else if (slave.energy > 60) {
				choice.push(`and ${he} thinks of little but sex with you,`);
				choice.push(...assignFucktoy(slave));
			} else if (canSee(slave) && canWalk(slave)) {
				choice.push(...assignServant(slave));
			} else {
				choice.push(`but unable to do much on ${his} own,`);
				if (V.universalRulesAssignsSelfFacility === 1 && V.masterSuite > masterSL) {
					choice.push(`so ${he} <span class="job change">heads straight to ${V.masterSuiteName} to await your caress.</span>`);
					choice.push(assignJob(slave, Job.MASTERSUITE));
				} else {
					choice.push(`so ${he} cheerfully <span class="job change">designates ${himself} one of your fucktoys</span> to be close to you.`);
					choice.push(assignJob(slave, Job.FUCKTOY));
				}
			}
		} else if (slave.relationship === -3) {
			if (slave.devotion+slave.trust >= 175) {
				choice.push(`is happily married to you,`);
			} else if (slave.devotion < -20) {
				choice.push(`is forcibly married to you,`);
			} else {
				choice.push(`is married to you,`);
			}
			if (slave.devotion > 50) {
				if (slave.energy > 60) {
					choice.push(`and ${he} thinks of little but sex with you,`);
					choice.push(...assignFucktoy(slave));
				} else if (canSee(slave) && canWalk(slave)) {
					choice.push(...assignServant(slave));
				} else {
					choice.push(`but unable to do much on ${his} own`);
					if (V.universalRulesAssignsSelfFacility === 1 && V.masterSuite > masterSL) {
						choice.push(`so ${he} <span class="job change">heads straight to ${V.masterSuiteName}</span> to await your caress.`);
						choice.push(assignJob(slave, Job.MASTERSUITE));
					} else {
						choice.push(`so ${he} cheerfully <span class="job change">designates ${himself} one of your fucktoys</span> to be close to you.`);
						choice.push(assignJob(slave, Job.FUCKTOY));
					}
				}
			} else if (slave.devotion < -20) {
				choice.push(`and ${he} is scared of you, so ${he} <span class="job change">chooses to work as a servant</span> so that ${he} may serve you without "serving" you.`);
				choice.push(assignJob(slave, Job.HOUSE));
			} else {
				if (slave.energy > 60) {
					choice.push(`and ${he} thinks of little but sex,`);
					choice.push(...assignFucktoy(slave));
				} else if (canSee(slave) && canWalk(slave)) {
					choice.push(...assignServant(slave));
				} else {
					choice.push(`but unable to do much on ${his} own, so ${he} <span class="job change">designates ${himself} one of your fucktoys</span> to get more intimate with you.`);
					choice.push(assignJob(slave, Job.FUCKTOY));
				}
			}
		} else if (slave.fetishKnown === 1 || jsRandom(1, 100) > 5) { // Yes, this segues into other things than fetish. PM - I added a 5% chance for her to not think of something just for flavor.
			if (slave.fetish === Fetish.SUBMISSIVE && canWalk(slave) && canSee(slave)) {
				if (V.universalRulesAssignsSelfFacility === 1 && V.servantsQuarters > servQL) {
					choice.push(`thinks ${he} belongs at the bottom of the penthouse hierarchy, so ${he} <span class="job change">goes to live in ${V.servantsQuartersName}.</span>`);
					choice.push(assignJob(slave, Job.QUARTER));
				} else {
					choice.push(`thinks ${he} belongs at the bottom of the penthouse hierarchy, so ${he} <span class="job change">decides ${he} should be a servant.</span>`);
					choice.push(assignJob(slave, Job.HOUSE));
				}
			} else if (slave.fetish === Fetish.DOM || slave.fetish === Fetish.SADIST) {
				if (V.universalRulesAssignsSelfFacility === 1 && V.club > clubL) {
					choice.push(`is self-confident, so ${he} <span class="job change">decides to work in ${V.clubName}.</span>`);
					choice.push(assignJob(slave, Job.CLUB));
				} else {
					choice.push(`is self-confident, so ${he} <span class="job change">decides to work as a public servant.</span>`);
					choice.push(assignJob(slave, Job.PUBLIC));
				}
				slave.sexAmount = 10;
			} else if (slave.fetish === Fetish.MASOCHIST) {
				if (V.universalRulesAssignsSelfFacility === 1 && V.brothel > brothelL) {
					choice.push(`enjoys abuse, so ${he} <span class="job change">hurries down to ${V.brothelName}.</span>`);
					choice.push(assignJob(slave, Job.BROTHEL));
				} else {
					choice.push(`enjoys abuse, so ${he} <span class="job change">decides to become a whore.</span>`);
					choice.push(assignJob(slave, Job.WHORE));
				}
				slave.sexAmount = 10;
			} else if (slave.fetish === Fetish.CUMSLUT) {
				if (V.universalRulesAssignsSelfFacility === 1 && V.brothel > brothelL) {
					choice.push(`<span class="job change">hurries down to ${V.brothelName}</span> to suck cocks.`);
					choice.push(assignJob(slave, Job.BROTHEL));
				} else {
					choice.push(`<span class="job change">decides to become a whore,</span> mostly to suck cock.`);
					choice.push(assignJob(slave, Job.WHORE));
				}
				slave.sexAmount = 10;
			} else if (slave.fetish === Fetish.HUMILIATION) {
				if (V.universalRulesAssignsSelfFacility === 1 && V.brothel > brothelL) {
					choice.push(`<span class="job change">decides to work in ${V.brothelName},</span> since it's even more embarrassing to be a whore than a club slut.`);
					choice.push(assignJob(slave, Job.BROTHEL));
				} else {
					choice.push(`<span class="job change">decides to whore,</span> since it's even more embarrassing to be a whore than to be a public servant.`);
					choice.push(assignJob(slave, Job.WHORE));
				}
				slave.sexAmount = 10;
			} else if (slave.fetish === Fetish.BUTTSLUT) {
				if (slave.balls > 0 && slave.prostate > 0 && V.universalRulesAssignsSelfFacility === 1 && V.dairyRestraintsSetting < 2 && V.dairyStimulatorsSetting > 0 && V.dairy > dairyL) {
					choice.push(`<span class="job change">chooses confinement in ${V.dairyName},</span> since all ${he} will be expected to do is produce cum by orgasming to buttsex.`);
					choice.push(assignJob(slave, Job.DAIRY));
				} else if (canDoAnal(slave)){
					if (V.universalRulesAssignsSelfFacility === 1 && V.brothel > brothelL) {
						choice.push(`<span class="job change">decides to work in ${V.brothelName},</span> since whores get buttfucked more than anyone else.`);
						choice.push(assignJob(slave, Job.BROTHEL));
					} else {
						choice.push(`<span class="job change">decides to whore,</span> since whores get buttfucked more than anyone else.`);
						choice.push(assignJob(slave, Job.WHORE));
					}
					slave.sexAmount = 10;
				} else {
					if (V.universalRulesAssignsSelfFacility === 1 && V.club > clubL) {
						choice.push(`<span class="job change">decides to shake ${his} money maker in ${V.clubName}.</span>`);
						choice.push(assignJob(slave, Job.CLUB));
					} else {
						choice.push(`<span class="job change">decides to shake ${his} money maker on the streets.</span>`);
						choice.push(assignJob(slave, Job.PUBLIC));
					}
					slave.sexAmount = 10;
				}
			} else if (slave.fetish === Fetish.PREGNANCY) {
				if (V.PC.dick > 0 && isFertile(slave)) {
					if (V.universalRulesAssignsSelfFacility === 1 && V.masterSuite > masterSL) {
						choice.push(`<span class="job change">decides to serve you in ${V.masterSuiteName},</span> hoping that you'll get ${him} pregnant.`);
						choice.push(assignJob(slave, Job.MASTERSUITE));
					} else {
						choice.push(`<span class="job change">decides to be your fucktoy,</span> hoping that you'll get ${him} pregnant.`);
						choice.push(assignJob(slave, Job.FUCKTOY));
					}
				} else if (V.universalRulesAssignsSelfFacility === 1 && V.dairyPregSetting > 0 && V.dairy > dairyL && isFertile(slave)) {
					if (V.dairyPregSetting > 1) {
						choice.push(`eagerly <span class="job change">rushes to ${V.dairyName}</span> in the hopes that ${his} fertile womb will be packed full of children.`);
						choice.push(assignJob(slave, Job.DAIRY));
					} else {
						choice.push(`<span class="job change">rushes to ${V.dairyName}</span> in the hopes that ${his} fertile womb will be rented out.`);
						choice.push(assignJob(slave, Job.DAIRY));
					}
				} else if (slave.bellyPreg >= 1500) {
					if (arcology.FSRepopulationFocus > 20) {
						if (V.cash < 10000) {
							if (V.brothel > brothelL && V.universalRulesAssignsSelfFacility === 1) {
								choice.push(`<span class="job change">heads to ${V.brothelName}</span> since ${he} wants to set an example for any unimpregnated girls.`);
								choice.push(assignJob(slave, Job.BROTHEL));
							} else {
								choice.push(`<span class="job change">heads to the streets</span> to lavish in the attention given to pregnant prostitutes.`);
								choice.push(assignJob(slave, Job.WHORE));
							}
						} else {
							if (V.club > clubL && V.universalRulesAssignsSelfFacility === 1) {
								choice.push(`<span class="job change">heads to ${V.clubName}</span> to show off ${his} growing middle and lavish in the public's attention.`);
								choice.push(assignJob(slave, Job.CLUB));
							} else {
								choice.push(`<span class="job change">heads to the streets</span> to contribute to the number of visibly pregnant women around.`);
								choice.push(assignJob(slave, Job.PUBLIC));
							}
						}
						slave.sexAmount = 10;
					} else if (V.masterSuite > masterSL && V.universalRulesAssignsSelfFacility === 1) {
						choice.push(`<span class="job change">heads straight to ${V.masterSuiteName}</span> to share the intimacy of ${his} pregnant body with you.`);
						choice.push(assignJob(slave, Job.MASTERSUITE));
					} else {
						choice.push(`<span class="job change">decides to be your fucktoy</span> to share the intimacy of ${his} pregnant body with you.`);
						choice.push(assignJob(slave, Job.FUCKTOY));
					}
				} else if (slave.pregKnown === 1) {
					if (V.masterSuite > masterSL && V.universalRulesAssignsSelfFacility === 1) {
						choice.push(`<span class="job change">heads straight to ${V.masterSuiteName}</span> so you may watch for the day that ${he} finally starts to show.`);
						choice.push(assignJob(slave, Job.MASTERSUITE));
					} else {
						choice.push(`<span class="job change">decides to be your fucktoy</span> so you may enjoy watching ${him} begin showing.`);
						choice.push(assignJob(slave, Job.FUCKTOY));
					}
				} else if (canGetPregnant(slave)) {
					if (V.universalRulesAssignsSelfFacility === 1 && V.brothel > brothelL) {
						choice.push(`can't indulge ${his} pregnancy fetish without getting dicked, so ${he} <span class="job change">heads down to ${V.brothelName}</span> to do just that.`);
						choice.push(assignJob(slave, Job.BROTHEL));
					} else {
						choice.push(`can't indulge ${his} pregnancy fetish without getting dicked, so ${he} <span class="job change">decides to be a whore</span> to get seeded.`);
						choice.push(assignJob(slave, Job.WHORE));
					}
					slave.sexAmount = 10;
				} else if (slave.lactation > 0) {
					if (V.universalRulesAssignsSelfFacility === 1 && V.dairyRestraintsSetting < 2 && V.dairy > dairyL) {
						choice.push(`<span class="job change">heads down to ${V.dairyName}</span> to be around other lactating girls.`);
						choice.push(assignJob(slave, Job.DAIRY));
					} else {
						choice.push(`<span class="job change">decides to get milked,</span> since ${he} is already lactating.`);
						choice.push(assignJob(slave, Job.MILKED));
					}
				} else {
					if (V.universalRulesAssignsSelfFacility === 1 && V.brothel > brothelL) {
						choice.push(`can't indulge ${his} fetish by getting pregnant ${himself}, so ${he} just <span class="job change">heads down to ${V.brothelName}.</span>`);
						choice.push(assignJob(slave, Job.BROTHEL));
					} else {
						choice.push(`can't indulge ${his} fetish by getting pregnant ${himself}, so ${he} glumly <span class="job change">decides to be a whore.</span>`);
						choice.push(assignJob(slave, Job.WHORE));
					}
					slave.sexAmount = 10;
				}
			} else if (slave.fetish === Fetish.BOOBS) {
				if (slave.lactation > 0) {
					if (V.universalRulesAssignsSelfFacility === 1 && V.dairyRestraintsSetting < 2 && V.dairy > dairyL) {
						choice.push(`<span class="job change">heads down to ${V.dairyName}</span> for all the attention that'll be lavished on ${his} nipples.`);
						choice.push(assignJob(slave, Job.DAIRY));
					} else {
						choice.push(`<span class="job change">decides to get milked,</span> since ${he} loves getting off to it.`);
						choice.push(assignJob(slave, Job.MILKED));
					}
				} else if (V.universalRulesAssignsSelfFacility === 1 && V.club > clubL) {
					choice.push(`<span class="job change">decides to work in ${V.clubName}</span> so ${he} can show off ${his} bare breasts.`);
					choice.push(assignJob(slave, Job.CLUB));
					slave.sexAmount = 10;
				} else {
					choice.push(`<span class="job change">decides to work as a public servant</span> so ${he} can show off ${his} bare breasts.`);
					choice.push(assignJob(slave, Job.PUBLIC));
					slave.sexAmount = 10;
				}
			} else if (slave.attrXX > 85) {
				if (V.universalRulesAssignsSelfFacility === 1 && V.club > clubL) {
					choice.push(`<span class="job change">decides to work in ${V.clubName}</span> so ${he} can hit on hot girls.`);
					choice.push(assignJob(slave, Job.CLUB));
				} else {
					choice.push(`<span class="job change">decides to work as a public servant</span> so ${he} can hit on hot girls.`);
					choice.push(assignJob(slave, Job.PUBLIC));
				}
				slave.sexAmount = 10;
			} else if (slave.attrXY > 85) {
				if (V.universalRulesAssignsSelfFacility === 1 && V.club > clubL) {
					choice.push(`<span class="job change">decides to work in ${V.clubName}</span> so ${he} can hit on cute boys.`);
					choice.push(assignJob(slave, Job.CLUB));
				} else {
					choice.push(`<span class="job change">decides to work as a public servant</span> so ${he} can hit on cute boys.`);
					choice.push(assignJob(slave, Job.PUBLIC));
				}
				slave.sexAmount = 10;
			} else if (slave.energy > 95) {
				if (V.universalRulesAssignsSelfFacility === 1 && V.brothel > brothelL) {
					choice.push(`<span class="job change">decides to help those of your slaves who mind taking dick all day by working in ${V.brothelName}.</span>`);
					choice.push(assignJob(slave, Job.BROTHEL));
				} else {
					choice.push(`<span class="job change">decides to help those of your slaves who mind taking dick all day by working as a whore.</span>`);
					choice.push(assignJob(slave, Job.WHORE));
				}
				slave.sexAmount = 10;
			} else if (arcology.FSChattelReligionist > 0) {
				if (V.universalRulesAssignsSelfFacility === 1 && V.brothel > brothelL) {
					choice.push(`is a pure and faithful slave, <span class="job change">so ${he} sells ${his} body in the holy brothel.</span>`);
					choice.push(assignJob(slave, Job.BROTHEL));
				} else {
					choice.push(`is a pure and faithful slave, <span class="job change">so ${he} sells ${his} body as a holy prostitute.</span>`);
					choice.push(assignJob(slave, Job.WHORE));
				}
				slave.sexAmount = 10;
			} else if (arcology.FSEgyptianRevivalist > 0) {
				if (V.universalRulesAssignsSelfFacility === 1 && V.masterSuite > masterSL) {
					choice.push(`is a devoted slave, <span class="job change">so ${he} immediately joins your harem.</span>`);
					choice.push(assignJob(slave, Job.MASTERSUITE));
				} else {
					choice.push(`is a devoted slave, <span class="job change">so ${he} immediately joins your harem.</span>`);
					choice.push(assignJob(slave, Job.FUCKTOY));
				}
			} else if (arcology.FSRomanRevivalist > 0) {
				if (V.universalRulesAssignsSelfFacility === 1 && V.brothel > brothelL) {
					choice.push(`is a devoted slave, so ${he} <span class="job change">decides ${he} can best serve the state by raising money for the treasury, by selling ${his} body in ${V.brothelName}.</span>`);
					choice.push(assignJob(slave, Job.BROTHEL));
				} else {
					choice.push(`is a devoted slave, so ${he} <span class="job change">decides ${he} can best serve the state by raising money for the treasury, by selling ${his} body as a prostitute.</span>`);
					choice.push(assignJob(slave, Job.WHORE));
				}
				slave.sexAmount = 10;
			} else if (arcology.FSAztecRevivalist > 0) {
				if (V.universalRulesAssignsSelfFacility === 1 && V.brothel > brothelL) {
					choice.push(`is a devoted slave, so ${he} <span class="job change">decides ${he} can best serve the empire by serving at the fertility temple.</span>`);
					choice.push(assignJob(slave, Job.BROTHEL));
				} else {
					choice.push(`is a devoted slave, so ${he} <span class="job change">decides ${he} can best serve the empire by offering ${himself} to the public.</span>`);
					choice.push(assignJob(slave, Job.PUBLIC));
				}
				slave.sexAmount = 10;
			} else if (arcology.FSPaternalist > 0) {
				if (V.universalRulesAssignsSelfFacility === 1 && V.brothel > brothelL) {
					choice.push(`<span class="job change">decides to work in ${V.brothelName},</span> a respectable position for a slave in this enlightened arcology.`);
					choice.push(assignJob(slave, Job.BROTHEL));
				} else {
					choice.push(`<span class="job change">decides to be a whore,</span> a respectable position for a slave in this enlightened arcology.`);
					choice.push(assignJob(slave, Job.WHORE));
				}
				slave.sexAmount = 10;
			} else if (arcology.FSPastoralist > 0) {
				if (slave.lactation > 0) {
					if (V.universalRulesAssignsSelfFacility === 1 && V.dairyRestraintsSetting < 2 && V.dairy > dairyL) {
						choice.push(`<span class="job change">hurries to join your herd of dairy cows.</span>`);
						choice.push(assignJob(slave, Job.DAIRY));
					} else {
						choice.push(`<span class="job change">hurries to join your herd of cows.</span>`);
						choice.push(assignJob(slave, Job.MILKED));
					}
				} else {
					if (V.universalRulesAssignsSelfFacility === 1 && V.brothel > brothelL) {
						choice.push(`<span class="job change">decides to work in ${V.brothelName}</span> to help raise money to get more girls lactating properly.`);
						choice.push(assignJob(slave, Job.BROTHEL));
					} else {
						choice.push(`<span class="job change">decides to prostitute ${himself}</span> to help raise money to get more girls lactating properly.`);
						choice.push(assignJob(slave, Job.WHORE));
					}
					slave.sexAmount = 10;
				}
			} else if (arcology.FSHedonisticDecadence > 0) {
				if (V.universalRulesAssignsSelfFacility === 1 && V.spa > spaL && (slave.trust < 60 || slave.devotion <= 60)) {
					choice.push(`could use a break, so ${he} <span class="job change">heads to take a dip in the spa.</span>`);
					choice.push(assignJob(slave, Job.SPA));
				} else {
					choice.push(`could use a meal and a nap, so ${he} grabs a cup of food and <span class="job change">heads to bed.</span>`);
					choice.push(removeJob(slave, slave.assignment));
				}
			} else {
				if (slave.skill.whoring > slave.skill.entertainment) {
					if (V.universalRulesAssignsSelfFacility === 1 && V.brothel > brothelL) {
						choice.push(`<span class="job change">decides to work in ${V.brothelName},</span> since ${he} thinks ${himself} a better whore than a public slut.`);
						choice.push(assignJob(slave, Job.BROTHEL));
					} else {
						choice.push(`<span class="job change">decides to whore,</span> since ${he} thinks ${himself} a better whore than a public slut.`);
						choice.push(assignJob(slave, Job.WHORE));
					}
					slave.sexAmount = 10;
				} else if (slave.skill.entertainment > slave.skill.whoring) {
					if (V.universalRulesAssignsSelfFacility === 1 && V.club > clubL) {
						choice.push(`<span class="job change">decides to be a club ${girl},</span> since ${he} thinks ${himself} a better public slut than a whore.`);
						choice.push(assignJob(slave, Job.CLUB));
					} else {
						choice.push(`<span class="job change">decides to serve the public,</span> since ${he} thinks ${himself} a better public slut than a whore.`);
						choice.push(assignJob(slave, Job.PUBLIC));
					}
					slave.sexAmount = 10;
				} else {
					if (V.universalRulesAssignsSelfFacility === 1 && V.brothel > brothelL) {
						choice.push(`<span class="job change">decides to join ${his} sisters and work in ${V.brothelName}.</span>`);
						choice.push(assignJob(slave, Job.BROTHEL));
					} else {
						choice.push(`<span class="job change">decides to prostitute ${himself}</span> to help you upgrade ${arcology.name} and improve everyone's life.`);
						choice.push(assignJob(slave, Job.WHORE));
					}
					slave.sexAmount = 10;
				}
			}
		} else {
			if (V.universalRulesAssignsSelfFacility === 1 && V.club > clubL) {
				choice.push(`<span class="job change">decides to be a club ${girl},</span> since partying is better than sitting around and failing to think of a job to do.`);
				choice.push(assignJob(slave, Job.CLUB));
				slave.sexAmount = 10;
			} else if (canWalk(slave) && canSee(slave)) {
				choice.push(`<span class="job change">decides to tidy up the penthouse</span> a little while ${he} thinks.`);
				choice.push(assignJob(slave, Job.HOUSE));
			} else {
				choice.push(`<span class="job change">stays in bed,</span> unable to come up with anything.`);
				choice.push(removeJob(slave, slave.assignment));
			}
		}

		slave.choosesOwnAssignment = 1; // removeJob may have cleared this, but we want it to stay

		return choice.join(" ");
	}
};
