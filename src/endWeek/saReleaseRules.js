/** Apply non-assignment release rules to a slave to determine need, fetish discovery, etc.
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.SlaveAssignment.nonAssignmentRelease = function(slave) {
	/** @type {Array<string|DocumentFragment>} */
	let r = [];
	const release = slave.rules.release;
	const {he, his, him, himself} = getPronouns(slave);
	const startNeed = slave.need;

	const subSlaves = App.EndWeek.saVars.subSlaveMap.get(slave.ID);
	if (subSlaves && subSlaves.length > 0) {
		// if a slave has been assigned a specific personal subslave, or several, go to them first for relief
		// there is no check for release rules in this case...permission is implicit in the assignment (saServeYourOtherSlaves also does not check)
		const whom = subSlaves.length > 1 ? "several slaves" : getSlave(subSlaves[0]).slaveName;
		r.push(`is <span class="devotion inc">delighted</span> that you've assigned ${whom} to ${him} for ${his} personal use, and <span class="trust inc">relishes</span> the feeling of being served.`);
		// note rapid trust increase...power is dangerous if the target isn't devoted yet!
		if (subSlaves.length > 1) {
			slave.devotion += 2;
			slave.trust += 6;
		} else {
			slave.devotion += 1;
			slave.trust += 4;
		}
		// no fetish effects/discovery here...saServeYourOtherSlaves' subLife will take care of that
		slave.need = 0;
	} else if (!onBedRest(V.PC, true) && ["ravish", "ravished"].includes(getPersonalAttentionType(slave.ID))) {
		r.push(`is completely sated by your personal attention and has little interest in seeking additional sexual stimulation.`);
		slave.need = 0;
	} else if (!App.Utils.hasNonassignmentSex(slave) && release.masturbation === 0) {
		if (release.master === 1) {
			const toYou = assignmentVisible(slave) ? `to you` : `up to the penthouse`;
			if (slave.devotion <= 20 && slave.trust >= -20) {
				if ([Job.HOUSE, Job.QUARTER].includes(slave.assignment)) {
					r.push(`refuses to offer ${himself} to you`);
				} else {
					r.push(`refuses to come ${toYou}`);
				}
				r.push(`for sexual release,`);
				if (slave.assignment === Job.SPA) {
					r.push(`or to share a bath with you,`);
				}
				r.push(`and is <span class="trust dec">severely punished</span> for illicit masturbation.`);
				slave.trust -= 2;
			} else if (slave.devotion <= 50) {
				if (slave.devotion <= 20) {
					if ([Job.HOUSE, Job.QUARTER].includes(slave.assignment)) {
						r.push(`occasionally stops by your office to offer ${himself} to you.`);
					} else {
						r.push(`occasionally comes ${toYou} to beg for sexual release.`);
					}
				} else {
					if ([Job.HOUSE, Job.QUARTER].includes(slave.assignment)) {
						r.push(`doesn't mind stopping by your office`);
					} else {
						r.push(`doesn't mind having to come ${toYou}`);
					}
					r.push(`to beg for sexual release.`);
				}
				r.push(App.EndWeek.Rules.playerEnergy(slave));
			} else { /* slave.devotion > 50 */
				if ([Job.HOUSE, Job.QUARTER].includes(slave.assignment)) {
					r.push(`willingly stops by your office and`);
				} else if (!assignmentVisible(slave)) {
					r.push(`willingly comes up to the penthouse and`);
				}
				r.push(`begs you to ${App.EndWeek.Rules.playerFetishPlay(slave)}`);
				if (App.Data.misc.facilityHeads.includes(slave.assignment)) {
					if (slave.assignment === Job.TEACHER) {
						r.push(`in front of ${his} class`);
					}
					r.push(`whenever ${he} crosses paths with you.`);
				} else if (slave.assignment === Job.SPA) {
					r.push(`whenever the urge strikes.`);
				} else {
					r.push(`every chance ${he} gets.`);
				}
				r.push(App.EndWeek.Rules.playerEnergy(slave));
			}
			r.push(App.EndWeek.Rules.playerDiscoversFetish(slave));
			r.push(App.EndWeek.Rules.playerDrugEffects(slave));
		} else { /* release.master === 0 */
			r.push(App.EndWeek.Rules.noRelease(slave));
			r.push(App.EndWeek.Rules.noReleaseDrugEffects(slave));
		}
	} else if (!App.Utils.hasNonassignmentSex(slave) && release.masturbation === 1) {
		if (slave.sexualFlaw === SexualFlaw.ATTENTION && [Job.WHORE, Job.BROTHEL, Job.CLUB, Job.PUBLIC].includes(slave.assignment)) {
			r.push(`<span class="devotion inc">enjoys being allowed to masturbate,</span> especially since it's`);
			if ([Job.WHORE, Job.BROTHEL].includes(slave.assignment)) {
				r.push(`often to the pleasure of an aroused client.`);
			} else if (slave.assignment === Job.CLUB) {
				r.push(`often on stage for ${V.clubName}'s amusement.`);
			} else { // slave.assignment === Job.PUBLIC
				r.push(`often in public, for the amusement of citizens and passers-by.`);
			}
			slave.devotion += 1;
			slave.need = 0;
		} else if (slave.devotion <= 20 && slave.trust >= -20) {
			r.push(`takes solace in ${his} permission to masturbate rather than being forced to beg for sex,`);
			if ([Job.PUBLIC, Job.CLUB].includes(slave.assignment)) {
				r.push(`though being forced to do it on a table surrounded by citizens prevents ${him} from getting complacent; you can never know when they'll want more.`);
			} else if ([Job.BROTHEL, Job.WHORE].includes(slave.assignment)) {
				r.push(`though being forced to do it in front of an aroused client prevents ${him} from getting complacent; you can never know when they'll want more.`);
			} else {
				r.push(`<span class="trust inc">reducing ${his} fear</span> of you.`);
				slave.trust += 2;
			}
			slave.need = 0;
		} else if (slave.devotion <= 20) {
			r.push(`enjoys being allowed to masturbate rather than trading sex with other slaves,`);
			if ([Job.PUBLIC, Job.CLUB].includes(slave.assignment)) {
				r.push(`though being forced to do it on a table surrounded by citizens <span class="trust dec">terrifies ${him};</span> you can never know when they'll want more.`);
				slave.trust -= 1;
			} else if ([Job.BROTHEL, Job.WHORE].includes(slave.assignment)) {
				r.push(`though being forced to do it in front of an aroused client <span class="trust dec">terrifies ${him};</span> you can never know when they'll want more.`);
				slave.trust -= 1;
			} else {
				r.push(`<span class="trust inc">slightly reducing ${his} fear</span> of you but <span class="devotion dec">allowing ${him} to remain in control of ${him} sexuality.</span>`);
				slave.trust += 1;
				slave.devotion -= 1;
			}
			slave.need = 0;
		} else if (slave.devotion <= 50) {
			r.push(`accepts having to relieve ${himself} solely through masturbation.`);
			slave.need = 0;
		} else if (slave.devotion < 80) {
			r.push(`is a little disappointed that ${he}'s limited to ${his}`);
			if (!hasAnyArms(slave)) {
				r.push(`imagination`);
			} else if (!hasBothArms(slave)) {
				r.push(`hand`);
			} else {
				r.push(`hands`);
			}
			r.push(`and toys, but <span class="trust inc">trusts you know what's best for ${him}.</span>`);
			slave.trust += 1;
			slave.need = 0;
		} else {
			r.push(`<span class="trust inc">trusts your judgment</span> that only ${he} really knows how to pleasure`);
			if (release.master === 0) {
				r.push(`${himself}, though ${he} <span class="devotion dec">often wonders why you don't`);
				if (slave.assignment === Job.TEACHER) {
					r.push(`make an example out of`);
				} else {
					r.push(`use`);
				}
				r.push(`${him}.</span>`);
				slave.devotion -= 2;
			} else {
				r.push(`${himself}.`);
			}
			slave.trust += 1;
			slave.need = 0;
		}
		if (slave.devotion > 20) {
			r.push(`When ${he} does play with ${himself}, ${he}`);
			r.push(App.EndWeek.Rules.masturbationFetishPlay(slave));
			r.push(App.EndWeek.Rules.masturbationDiscoversFetish(slave));
		}
		r.push(App.EndWeek.Rules.masturbationDrugEffects(slave));
	} else { /* hasNonassignmentSex is true */
		const whom = (release.slaves === 1) ? "other slaves" : `${his} family`;
		if (!App.Utils.hasFamilySex(slave) && release.slaves === 0) {
			/* no family and no other slaves, so release comes from her partner */
			r.push(`finds frequent sexual release with ${his} ${relationshipTerm(slave)} <span class="relationship">${getSlave(slave.relationshipTarget).slaveName}</span> which ${he} is <span class="trust inc">thankful for.</span>`);
			r.push(App.EndWeek.Rules.partnerDrugEffects(slave));
			slave.trust++;
			slave.need -= 20; /* TODO: probably should be based on BOTH slaves' need, leaving the less needy partner slightly frustrated */
		} else if (slave.assignment === Job.WARDEN) {
			/* Wardeness ignores consent, rapes prisoners at will */
			r.push(`opts to <span class="trust inc">take advantage of the prisoners</span> to`);
			r.push(App.EndWeek.Rules.rapeFetish(slave));
			r.push(App.EndWeek.Rules.rapeDiscoversFetish(slave));
			r.push(App.EndWeek.Rules.permissiveDrugEffects(slave));
			slave.trust += 1;
			slave.need = 0;
		} else if (V.universalRulesConsent === 0) { /* rape is authorized */
			if (slave.devotion <= 20 && slave.trust >= -20) {
				if (release.masturbation === 1) {
					r.push(`masturbates whenever ${he} can find a private moment to take care of the urges induced by the food, <span class="trust inc">slightly reducing ${his} fear</span> of you.`);
					slave.trust += 1;
					slave.need = 0;
				} else {
					r.push(`refuses to use ${whom} to get off, and is`);
					if ([Job.CLUB, Job.PUBLIC].includes(slave.assignment)) {
						r.push(`forced to spend time with the citizens and their wandering hands <span class="trust dec">as punishment</span>`);
					} else if ([Job.WHORE, Job.BROTHEL].includes(slave.assignment)) {
						r.push(`forced to take additional clients <span class="trust dec">as punishment</span>`);
					} else {
						r.push(`<span class="trust dec">severely punished</span>`);
					}
					r.push(`for illicit masturbation.`);
					slave.trust -= 2;
					slave.need -= 10;
				}
			} else if (slave.devotion <= 20) {
				let jobOption = ``;
				if (release.masturbation === 1) {
					if ([Job.CLUB, Job.PUBLIC].includes(slave.assignment)) {
						jobOption = ` or offering ${himself} to patrons`;
					} else if ([Job.BROTHEL, Job.WHORE].includes(slave.assignment)) {
						jobOption = ` or giving free samples`;
					}
					r.push(`prefers to masturbate rather than demanding sex from ${whom}${jobOption}, <span class="trust inc">slightly reducing ${his} fear</span> of you.`);
					slave.trust += 1;
					slave.need = 0;
				} else {
					if ([Job.CLUB, Job.PUBLIC].includes(slave.assignment)) {
						jobOption = ` or offer ${himself} to patrons`;
					} else if ([Job.BROTHEL, Job.WHORE].includes(slave.assignment)) {
						jobOption = ` or attempt to attract additional clients`;
					}
					r.push(`is forced by the urges induced by the food to demand sex from ${whom}${jobOption}, and <span class="devotion inc">hates ${himself}</span> for it.`);
					slave.devotion += 1;
					slave.need *= 0.5;
				}
			} else if (slave.devotion <= 50) {
				r.push(`<span class="devotion inc">accepts the need</span> to`);
				r.push(App.EndWeek.Rules.rapeFetish(slave));
				r.push(App.EndWeek.Rules.rapeDiscoversFetish(slave));
				slave.devotion += 1;
				slave.need = 0;
			} else {
				r.push(`happily <span class="trust inc">avails ${himself}</span> of your permission to`);
				r.push(App.EndWeek.Rules.rapeFetish(slave));
				r.push(App.EndWeek.Rules.rapeDiscoversFetish(slave));
				slave.trust += 1;
				slave.need = 0;
			}
		} else { /* consent is required */
			let jobOption = ``;
			if (release.masturbation === 1) {
				if ([Job.CLUB, Job.PUBLIC].includes(slave.assignment)) {
					jobOption = ` or offering ${himself} to patrons`;
				} else if ([Job.BROTHEL, Job.WHORE].includes(slave.assignment)) {
					jobOption = ` or giving free samples`;
				}
			} else {
				if ([Job.CLUB, Job.PUBLIC].includes(slave.assignment)) {
					jobOption = ` or attempt to seduce amorous citizens`;
				} else if ([Job.BROTHEL, Job.WHORE].includes(slave.assignment)) {
					jobOption = ` or attempt to attract additional clients`;
				}
			}
			if (slave.devotion <= 20 && slave.trust >= -20) {
				if (release.masturbation === 1) {
					r.push(`prefers to masturbate rather than asking ${whom} for sex${jobOption}, <span class="trust inc">slightly reducing ${his} fear</span> of you.`);
					slave.trust += 1;
					slave.need = 0;
				} else {
					r.push(`refuses to ask ${whom} for sex${jobOption}, and is <span class="trust dec">severely punished</span> for illicit masturbation.`);
					slave.trust -= 2;
					slave.need -= 10;
				}
			} else if (slave.devotion <= 20) {
				if (release.masturbation === 1) {
					r.push(`prefers to masturbate rather than trading sex with ${whom}${jobOption}, <span class="trust inc">slightly reducing ${his} fear</span> of you.`);
					slave.trust += 1;
					slave.need = 0;
				} else {
					r.push(`is forced by the urges induced by the food to demand sex from ${whom}${jobOption}, and <span class="devotion inc">hates ${himself}</span> for it.`);
					slave.devotion += 1;
					slave.need *= 0.5;
				}
			} else if (slave.devotion <= 50) {
				r.push(`<span class="devotion inc">accepts having to ask</span> ${whom} for sex,`);
				r.push(App.EndWeek.Rules.consentFetish(slave));
				r.push(App.EndWeek.Rules.consentDiscoversFetish(slave));
				slave.devotion += 1;
				slave.need = 0;
			} else {
				r.push(`<span class="trust inc">relies</span> on ${whom} for mutual satisfaction,`);
				r.push(App.EndWeek.Rules.consentFetish(slave));
				r.push(App.EndWeek.Rules.consentDiscoversFetish(slave));
				slave.trust += 1;
				slave.need = 0;
			}
		} /* closes universalRulesConsent */
		r.push(App.EndWeek.Rules.permissiveDrugEffects(slave));
	} /* closes releaseRules not restrictive */

	if (V.debugMode) {
		r.push(`(NC: ${App.EndWeek.saVars.needCapPerSlave[slave.ID]}, need: ${startNeed}, remain: ${slave.need})`);
	}

	const frag = document.createDocumentFragment();
	$(frag).append(...App.Events.spaceSentences(r));
	return frag;
};
