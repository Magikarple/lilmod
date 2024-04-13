/**
 *
 * @param {FC.ReportSlave} slave
 * @returns {DocumentFragment}
 */
App.SlaveAssignment.rules = function(slave) {
	const el = new DocumentFragment();
	const L = App.Utils.countFacilityWorkers();
	const release = slave.rules.release;
	let r = [];

	if (slave.fuckdoll === 0) {
		const {
			He, His,
			he, his, him, himself, girl, wife
		} = getPronouns(slave);
		const hands = (hasBothArms(slave)) ? `hands` : `hand`;
		let milkResult;
		r.push(`${He}`);
		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`is mentally broken so none of the rules have any impact.`);
		} else {
			const weeksAssistantObservingSlave = V.week - Math.max(0, slave.weekAcquired);
			const assistantHasSeenSexuality = weeksAssistantObservingSlave > 4 && slave.energy > 20;
			switch (slave.assignment) {
				case Job.ARCADE:
					if (slave.devotion < -50) {
						r.push(`is so unhappy that ${he} has little interest in getting off, not that ${he} gets a choice.`);
						slave.need = 0;
					} else if (slave.energy <= 20) {
						r.push(`is frigid and has little interest in getting off, not that ${he} gets a choice.`);
						slave.need = 0;
					} else if (slave.need < App.EndWeek.saVars.needCapPerSlave[slave.ID] * 0.5) {
						if (slave.devotion <= 20) {
							r.push(`gets off at work despite ${his} reluctance, <span class="hotpink">habituating ${him} to being a fuckhole.</span>`);
							slave.devotion += 1;
							if (slave.trust >= -20 && slave.devotion <= 20) {
								r.push(`${He} hates ${himself} for climaxing, and knows the mild aphrodisiacs in the food are forcing ${his} arousal, <span class="gold">frightening ${him}.</span>`);
								slave.trust -= 1;
							}
						} else if (App.Utils.hasNonassignmentSex(slave)) {
							r.push(`gets off at work as well as during ${his} rest time.`);
						} else if (release.masturbation === 0) {
							r.push(`gets off at work, so being unable to touch ${himself} doesn't bother ${him}.`);
						} else {
							r.push(`gets off at work, so being unable to sate ${his} urges doesn't affect ${him} seriously.`);
						}
						slave.need -= 20;
					} else {
						r.push(`wasn't a popular enough hole to sate ${his} arousal, leaving ${him} <span class="gold">uncomfortably horny</span> despite ${his} conditions.`);
						slave.trust -= 3;
					}
					if (slave.attrKnown === 0) {
						if (assistantHasSeenSexuality) {
							slave.attrKnown = 1;
							r.push(`${capFirstChar(V.assistant.name)} has been monitoring ${him} as ${his} body gets used. It seems ${he} is`);
							r.push(App.EndWeek.Rules.attractionDiscovery(slave));
						}
					}
					break;
				case Job.MADAM:
					slave.need -= (App.Entity.facilities.brothel.employeesIDs().size * 10);
					if (slave.energy <= 20) {
						r.push(`is frigid and has little interest in getting off${(App.Utils.releaseRestricted(slave)) ? `, making the rule restricting ${his} sexual outlets superfluous` : ``}.`);
						slave.need = 0;
					} else if (slave.need < App.EndWeek.saVars.needCapPerSlave[slave.ID] * 0.5) {
						if (App.Utils.hasNonassignmentSex(slave)) {
							r.push(`gets off at work as well as during ${his} rest time.`);
						} else if (release.masturbation === 0) {
							r.push(`gets off at work, so being unable to touch ${himself} doesn't bother ${him}.`);
						} else {
							r.push(`gets off at work, so being unable to sate ${his} urges doesn't affect ${him} seriously.`);
						}
						slave.need -= 20;
					} else {
						r.push(App.SlaveAssignment.nonAssignmentRelease(slave));
					}

					r.push(`${He} is <span class="hotpink">very happy</span> with ${his} private room in ${V.brothelName} and <span class="mediumaquamarine">trusts</span> you a bit more for placing ${him} in charge of it. It also helps to offset the tiring nature of ${his} position.`);
					slave.devotion += 1;
					slave.trust += 1;

					if (slave.slaveUsedRest) {
						r.push(`${He} is permitted to take short breaks throughout the week to help manage ${his} building exhaustion, though it does restrict ${his} non-essential activities.`);
					}

					r.push(App.EndWeek.Rules.consentRules(slave));

					if (slave.attrKnown === 0) {
						if (assistantHasSeenSexuality) {
							slave.attrKnown = 1;
							r.push(`${capFirstChar(V.assistant.name)} has been monitoring ${him} as ${he} manages clients, analyzing ${his} tastes. It seems ${he} is`);
							r.push(App.EndWeek.Rules.attractionDiscovery(slave));
						}
					}

					if (slave.rules.lactation === "induce") {
						r.push(`Whenever ${he} finds a free moment from ${his} duties, ${he} spends that time massaging ${his} breasts and working ${his} nipples.`);
						r.push(induceLactation(slave, 2));
						if (slave.lactation === 1) {
							slave.rules.lactation = "maintain";
						}
					} else if (slave.rules.lactation === "maintain") {
						if (V.servantMilkers === 1) {
							milkResult = App.SlaveAssignment.getMilked(slave, 0.25);
							r.push(`${His} duties keep ${him} busy, but ${he}`);
							if (slave.fetish === Fetish.BOOBS) {
								r.push(`eagerly`);
							}
							r.push(`uses the penthouse milkers whenever ${he} can, giving ${milkResult.milk} liters of milk over the week, which is sold for <span class="yellowgreen">${cashFormat(milkResult.milkSale)}.</span>`);
						} else {
							r.push(`Whenever ${he} finds a free moment from ${his} duties, ${he} takes the time to thoroughly milk ${his} breasts to keep ${his} lactation strong for you.`);
							slave.lactationDuration = 2;
							slave.boobs -= slave.boobsMilk;
							slave.boobsMilk = 0;
						}
					}

					r.push(App.SlaveAssignment.rewardAndPunishment(slave));
					break;
				case Job.BROTHEL:
					if (slave.devotion < -50) {
						r.push(`is so unhappy that ${he} has little interest in getting off, not that ${his} clients care.`);
						slave.need = 0;
					} else if (slave.energy <= 20) {
						r.push(`is frigid and has little interest in getting off, not that ${his} clients care.`);
						slave.need = 0;
					} else if (slave.need < App.EndWeek.saVars.needCapPerSlave[slave.ID] * 0.5) {
						if (slave.devotion <= 20) {
							r.push(`gets off at work despite ${his} reluctance, <span class="hotpink">habituating ${him} to sexual slavery.</span>`);
							slave.devotion += 1;
							if (slave.trust >= -20 && slave.devotion <= 20) {
								r.push(`${He} hates ${himself} for climaxing, and knows the mild aphrodisiacs in the food are forcing ${his} arousal, <span class="gold">frightening ${him}.</span>`);
								slave.trust -= 1;
							}
						} else if (App.Utils.hasNonassignmentSex(slave)) {
							r.push(`gets off at work as well as during ${his} rest time.`);
						} else if (release.masturbation === 0) {
							r.push(`gets off at work, so being unable to touch ${himself} doesn't bother ${him}.`);
						} else {
							r.push(`gets off at work, so being unable to sate ${his} urges doesn't affect ${him} seriously.`);
						}
						slave.need -= 20;
					} else {
						r.push(App.SlaveAssignment.nonAssignmentRelease(slave));
					}

					r.push(App.EndWeek.Rules.speechRules(slave));

					if (slave.devotion <= 20) {
						switch (V.brothelDecoration) {
							case "Degradationist":
							case "standard":
								r.push(`The spare living conditions of ${V.brothelName} <span class="hotpink">get ${him} used</span> to the routine of`);
								if (slave.trust > 20) {
									r.push(`slavery and <span class="gold">keep ${him} aware of ${his} lowly place.</span>`);
									slave.trust -= 1;
								} else {
									r.push(`slavery.`);
								}
								slave.devotion += 1;
								break;
							case "Chattel Religionist":
								r.push(`The open, yet comfortable, conditions of ${V.brothelName} <span class="hotpink">get ${him} used</span> to the routine of slavery.`);
								slave.devotion += 1;
								break;
							default:
								r.push(`${He} gets a little room all to ${himself}, allowing ${him} to feel self-reliant; or it would, if it didn't reek of sex and shame after all the customers ${he} serviced in it.`);
						}
					} else {
						switch (V.brothelDecoration) {
							case "Degradationist":
							case "standard":
								if (slave.trust > 40) {
									r.push(`The spare living conditions of ${V.brothelName} <span class="gold">remind ${him} not to get too comfortable</span> with ${his} life.`);
									slave.trust -= 2;
								} else if (slave.trust > 10) {
									r.push(`The spare living conditions of ${V.brothelName} <span class="gold">keep ${him} aware of ${his} place.</span>`);
									slave.trust -= 1;
								} else {
									r.push(`${He}'s used to spare living conditions, so ${he}'s not bothered by ${V.brothelName}'s.`);
								}
								break;
							case "Chattel Religionist":
								r.push(`The open, yet comfortable, conditions of ${V.brothelName}'s slave quarters are quite refreshing after a day of public sex, even if ${he} has to share it with all the other whores.`);
								break;
							default:
								r.push(`${He} likes ${his} little room in ${V.brothelName}, even if`);
								if (canSmell(slave)) {
									r.push(`it smells of sex`);
								} else {
									r.push(`it's filled with the heat of sex`);
								}
								r.push(`after fucking in it all day.`);
						}
					}
					if (slave.rules.living === "luxurious") {
						r.push(`They provide <span class="health inc">satisfying rest</span> every time ${he} drifts off to sleep.`);
					} else if (slave.rules.living === "spare") {
						if (slave.devotion > 20 && slave.trust <= 10) {
							r.push(`They don't provide much rest, however.`);
						} else {
							r.push(`They provide meager rest, if anything.`);
						}
					} else {
						r.push(`They provide`);
						if (slave.devotion > 20) {
							r.push(`<span class="health inc">adequate rest</span> for a ${girl} that knows how to manage ${his} time.`);
						} else {
							r.push(`<span class="health inc">adequate rest,</span> but not enough for a slave lacking time management.`);
						}
					}

					if (slave.rules.rest === "mandatory") {
						if (slave.devotion <= 20) {
							r.push(`Getting a day off each week <span class="mediumaquamarine">builds feelings of liberty</span> a slave shouldn't have.`);
							slave.trust += 3;
						} else {
							r.push(`${He} appreciates having a weekly day off and takes it as a sign that ${he} has a <span class="mediumaquamarine">caring ${getWrittenTitle(slave)}.</span>`);
							slave.trust += 1;
						}
					} else if (slave.slaveUsedRest) {
						if (slave.rules.rest === "permissive") {
							if (slave.devotion <= 20) {
								r.push(`${He}'s permitted to rest whenever ${he} feels even the slightest bit tired; <span class="mediumaquamarine">a privilege not lost on ${him}.</span>`);
								slave.trust += 2;
							} else {
								r.push(`${He} <span class="hotpink">likes</span> that you <span class="mediumaquamarine">care enough</span> to let ${him} rest when ${he} gets tired.`);
								slave.devotion += 1;
								slave.trust += 1;
							}
						} else if (slave.rules.rest === "restrictive") {
							if (slave.devotion <= -20) {
								r.push(`${He}'s permitted to rest when fatigue sets in, but not enough to shake ${his} tiredness; ${he} feels this <span class="gold">deprivation</span> is intentional.`);
								slave.trust -= 1;
							} else if (slave.devotion <= 20) {
								r.push(`${He}'s permitted to rest when fatigue sets in, and <span class="hotpink">understands</span> this is less for ${his} well-being and more to prevent ${him} from become unproductive.`);
								slave.devotion += 1;
							} else {
								r.push(`${He}'s permitted to rest when fatigue sets in and is <span class="mediumaquamarine">thankful</span> you would allow ${him} the privilege so that ${he} may serve you better.`);
								slave.trust += 1;
							}
						} else if (slave.rules.rest === "cruel") {
							if (slave.devotion <= -20) {
								r.push(`${He}'s <span class="gold">terrified</span> that the only reason ${he} is given any time to rest at all is just to prolong your torment of ${him}.`);
								slave.trust -= 3;
							} else if (slave.devotion <= 20) {
								r.push(`You work ${him} to the bone and only allow ${him} rest when on the verge of collapsing. ${He} <span class="gold">fears</span> this <span class="mediumorchid">cruelty</span> is just the beginning.`);
								slave.trust -= 3;
								slave.devotion -= 3;
							} else {
								r.push(`Only being allowed rest when on the verge of collapsing <span class="mediumorchid">shakes ${his} faith</span> in you a little.`);
								slave.devotion -= 2;
							}
						}
					}

					r.push(App.EndWeek.Rules.consentRules(slave));

					if (slave.attrKnown === 0) {
						if (assistantHasSeenSexuality) {
							slave.attrKnown = 1;
							r.push(`${capFirstChar(V.assistant.name)} has been monitoring ${him} as ${he} services customers, analyzing ${his} sexuality. It seems ${he} is`);
							r.push(App.EndWeek.Rules.attractionDiscovery(slave));
						}
					}

					if (slave.rules.lactation === "induce") {
						r.push(`Customers are encouraged to work ${his} breasts and nipples in an effort to induce lactation; whoever gets ${him} to start dribbling milk wins a week of drinks on the house.`);
						r.push(induceLactation(slave, 4));
						if (slave.lactation === 1) {
							slave.rules.lactation = "maintain";
						}
					} else if (slave.rules.lactation === "maintain") {
						if (slave.devotion > 20) {
							if (slave.fetish === Fetish.BOOBS) {
								r.push(`It's unclear if ${he} is using ${his} milky breasts during sex for you or ${himself}; either way, ${his} lactation won't be going anywhere.`);
							} else {
								r.push(`${He} happily puts ${his} milky breasts to use during sex in order to keep lactating for you.`);
							}
						} else if (slave.devotion >= -20) {
							if (slave.fetish === Fetish.BOOBS) {
								r.push(`${He} doesn't need to be ordered to use ${his} milky breasts during sex since ${he} favors them heavily.`);
							} else {
								r.push(`${He} is required to utilize ${his} milky breasts during sex to keep ${his} lactation strong.`);
							}
						} else {
							r.push(`Customers are encouraged to molest ${his} breasts to keep ${him} lactating.`);
						}
						slave.lactationDuration = 2;
						slave.boobs -= slave.boobsMilk;
						slave.boobsMilk = 0;
					}

					r.push(App.SlaveAssignment.rewardAndPunishment(slave));
					break;
				case Job.DJ:
					if (slave.energy <= 20) {
						r.push(`is frigid and has little interest in getting off${(App.Utils.releaseRestricted(slave)) ? `, making the rule restricting ${his} sexual outlets superfluous` : ``}.`);
						slave.need = 0;
					} else if (slave.need < App.EndWeek.saVars.needCapPerSlave[slave.ID] * 0.5) {
						if (App.Utils.hasNonassignmentSex(slave)) {
							r.push(`gets off at work as well as during ${his} rest time.`);
						} else if (release.masturbation === 0) {
							r.push(`gets off at work, so being unable to touch ${himself} doesn't bother ${him}.`);
						} else {
							r.push(`gets off at work, so being unable to sate ${his} urges doesn't affect ${him} seriously.`);
						}
						slave.need -= 20;
					} else {
						r.push(App.SlaveAssignment.nonAssignmentRelease(slave));
					}

					r.push(`${He} is <span class="hotpink">very happy</span> with ${his} private room in the back of ${V.clubName} and <span class="mediumaquamarine">trusts</span> you a bit more for placing your faith in ${his} abilities. It helps offset the tiring nature of ${his} position and gives ${him} a place to center ${himself} at the end of the day.`);
					slave.devotion += 1;
					slave.trust += 1;

					if (slave.slaveUsedRest) {
						r.push(`${He} is permitted to take short breaks throughout the week to help manage ${his} building exhaustion, though it does restrict ${his} non-essential activities.`);
					}

					r.push(App.EndWeek.Rules.consentRules(slave));

					if (slave.attrKnown === 0) {
						if (assistantHasSeenSexuality) {
							slave.attrKnown = 1;
							r.push(`${capFirstChar(V.assistant.name)} has been monitoring ${him} as ${he} works the crowd, analyzing ${his} sexual tastes. It seems ${he} is`);
							r.push(App.EndWeek.Rules.attractionDiscovery(slave));
						}
					}

					if (slave.rules.lactation === "induce") {
						r.push(`Whenever ${he} finds a free moment between ${his} sets, ${he} spends that time massaging ${his} breasts and working ${his} nipples.`);
						r.push(induceLactation(slave, 2));
						if (slave.lactation === 1) {
							slave.rules.lactation = "maintain";
						}
					} else if (slave.rules.lactation === "maintain") {
						if (V.servantMilkers === 1) {
							milkResult = App.SlaveAssignment.getMilked(slave, 0.25);
							r.push(`${His} duties keep ${him} busy, but ${he}`);
							if (slave.fetish === Fetish.BOOBS) {
								r.push(`eagerly`);
							}
							r.push(`uses the penthouse milkers whenever ${he} can, giving ${milkResult.milk} liters of milk over the week, which is sold for <span class="yellowgreen">${cashFormat(milkResult.milkSale)}.</span>`);
						} else {
							r.push(`${He} has worked milking ${himself} into ${his} dance routines, both entertaining the crowd and keeping ${his} lactation strong for you.`);
							slave.lactationDuration = 2;
							slave.boobs -= slave.boobsMilk;
							slave.boobsMilk = 0;
						}
					}

					r.push(App.SlaveAssignment.rewardAndPunishment(slave));
					break;
				case Job.CLUB:
					if (slave.devotion < -50) {
						r.push(`is so unhappy that ${he} has little interest in getting off, not that ${his} spectators care.`);
						slave.need = 0;
					} else if (slave.energy <= 20) {
						r.push(`is frigid and has little interest in getting off, not that ${his} spectators care.`);
						slave.need = 0;
					} else if (slave.need < App.EndWeek.saVars.needCapPerSlave[slave.ID] * 0.5) {
						if (slave.devotion <= 20) {
							r.push(`gets off at work despite ${his} reluctance, <span class="hotpink">habituating ${him} to sexual slavery.</span>`);
							slave.devotion += 1;
							if (slave.trust >= -20 && slave.devotion <= 20) {
								r.push(`${He} hates ${himself} for climaxing, and knows the mild aphrodisiacs in the food are forcing ${his} arousal, <span class="gold">frightening ${him}.</span>`);
								slave.trust -= 1;
							}
						} else if (App.Utils.hasNonassignmentSex(slave)) {
							r.push(`gets off at work as well as during ${his} rest time.`);
						} else if (release.masturbation === 0) {
							r.push(`gets off at work, so being unable to touch ${himself} doesn't bother ${him}.`);
						} else {
							r.push(`gets off at work, so being unable to sate ${his} urges doesn't affect ${him} seriously.`);
						}
						slave.need -= 20;
					} else {
						r.push(App.SlaveAssignment.nonAssignmentRelease(slave));
					}

					r.push(App.EndWeek.Rules.speechRules(slave));

					if (slave.devotion <= 20) {
						r.push(`${He} shares a room with`);
						if (App.Entity.facilities.club.employeesIDs().size > 4) {
							r.push(`some of`);
						}
						r.push(`the other sluts, preventing ${him} from becoming too complacent. It doesn't help that during business hours ${he} has to take citizens in ${his} own bed.`);
					} else {
						r.push(`${He} likes ${his} personal space in ${V.clubName}, even if`);
						if (canSmell(slave)) {
							r.push(`it smells of`);
						} else {
							r.push(`it's filled with the heat from`);
						}
						r.push(`sex and citizens.`);
					}
					r.push(`It provides`);
					if (slave.devotion > 20) {
						r.push(`<span class="health inc">adequate rest</span> for a slut that knows how to manage ${his} time.`);
					} else {
						r.push(`<span class="health inc">adequate rest,</span> but not enough for a slut lacking time management.`);
					}

					if (slave.rules.rest === "mandatory") {
						if (slave.devotion <= 20) {
							r.push(`Getting a day off each week <span class="mediumaquamarine">builds feelings of liberty</span> a slave shouldn't have.`);
							slave.trust += 3;
						} else {
							r.push(`${He} appreciates having a weekly day off and takes it as a sign that ${he} has a <span class="mediumaquamarine">caring ${getWrittenTitle(slave)}.</span>`);
							slave.trust += 1;
						}
					} else if (slave.slaveUsedRest) {
						if (slave.rules.rest === "permissive") {
							if (slave.devotion <= 20) {
								r.push(`${He}'s permitted to rest whenever ${he} feels even the slightest bit tired; <span class="mediumaquamarine">a privilege not lost on ${him}.</span>`);
								slave.trust += 2;
							} else {
								r.push(`${He} <span class="hotpink">likes</span> that you <span class="mediumaquamarine">care enough</span> to let ${him} rest when ${he} gets tired.`);
								slave.devotion += 1;
								slave.trust += 1;
							}
						} else if (slave.rules.rest === "restrictive") {
							if (slave.devotion <= -20) {
								r.push(`${He}'s permitted to rest when fatigue sets in, but not enough to shake ${his} tiredness; ${he} feels this <span class="gold">deprivation</span> is intentional.`);
								slave.trust -= 1;
							} else if (slave.devotion <= 20) {
								r.push(`${He}'s permitted to rest when fatigue sets in, and <span class="hotpink">understands</span> this is less for ${his} well-being and more to prevent ${him} from become unproductive.`);
								slave.devotion += 1;
							} else {
								r.push(`${He}'s permitted to rest when fatigue sets in and is <span class="mediumaquamarine">thankful</span> you would allow ${him} the privilege so that ${he} may serve you better.`);
								slave.trust += 1;
							}
						} else if (slave.rules.rest === "cruel") {
							if (slave.devotion <= -20) {
								r.push(`${He}'s <span class="gold">terrified</span> that the only reason ${he} is given any time to rest at all is just to prolong your torment of ${him}.`);
								slave.trust -= 3;
							} else if (slave.devotion <= 20) {
								r.push(`You work ${him} to the bone and only allow ${him} rest when on the verge of collapsing. ${He} <span class="gold">fears</span> this <span class="mediumorchid">cruelty</span> is just the beginning.`);
								slave.trust -= 3;
								slave.devotion -= 3;
							} else {
								r.push(`Only being allowed rest when on the verge of collapsing <span class="mediumorchid">shakes ${his} faith</span> in you a little.`);
								slave.devotion -= 2;
							}
						}
					}

					r.push(App.EndWeek.Rules.consentRules(slave));

					if (slave.attrKnown === 0) {
						if (assistantHasSeenSexuality) {
							slave.attrKnown = 1;
							r.push(`${capFirstChar(V.assistant.name)} has been monitoring ${him} as ${he} services citizens, analyzing ${his} sexuality. It seems ${he} is`);
							r.push(App.EndWeek.Rules.attractionDiscovery(slave));
						}
					}

					if (slave.rules.lactation === "induce") {
						r.push(`Citizens are encouraged to work ${his} breasts and nipples in an effort to induce lactation; whoever gets ${him} to start dribbling milk wins a week of drinks on the house.`);
						r.push(induceLactation(slave, 4));
						if (slave.lactation === 1) {
							slave.rules.lactation = "maintain";
						}
					} else if (slave.rules.lactation === "maintain") {
						if (slave.devotion > 20) {
							if (slave.fetish === Fetish.BOOBS) {
								r.push(`It's unclear if ${his} lactation based routines are for your benefit or ${his} own; either way, ${his} milk production won't be slowing down.`);
							} else {
								r.push(`${He} happily works ${his} lactation into ${his} routines in order to keep ${his} milk flowing.`);
							}
						} else if (slave.devotion >= -20) {
							if (slave.fetish === Fetish.BOOBS) {
								r.push(`${He} doesn't need to be ordered to work ${his} lactation into ${his} routines since ${he} does so already.`);
							} else {
								r.push(`${He} is required to utilize ${his} lactation while entertaining to keep ${his} lactation strong.`);
							}
						} else {
							r.push(`Citizens are encouraged to molest ${his} breasts to keep ${him} lactating.`);
						}
						slave.lactationDuration = 2;
						slave.boobs -= slave.boobsMilk;
						slave.boobsMilk = 0;
					}

					r.push(App.SlaveAssignment.rewardAndPunishment(slave));
					break;
				case Job.NURSE:
					slave.need -= App.EndWeek.saVars.flSex.size * 3;
					if (slave.energy <= 20) {
						r.push(`is frigid and has little interest in getting off${(App.Utils.releaseRestricted(slave)) ? `, making the rule restricting ${his} sexual outlets superfluous` : ``}.`);
						slave.need = 0;
					} else if (slave.need < App.EndWeek.saVars.needCapPerSlave[slave.ID] * 0.5) {
						if (App.Utils.hasNonassignmentSex(slave)) {
							r.push(`gets off at work as well as during ${his} rest time.`);
						} else if (release.masturbation === 0) {
							r.push(`gets off at work, so being unable to touch ${himself} doesn't bother ${him}.`);
						} else {
							r.push(`gets off at work, so being unable to sate ${his} urges doesn't affect ${him} seriously.`);
						}
						slave.need -= 20;
					} else {
						r.push(App.SlaveAssignment.nonAssignmentRelease(slave));
					}

					r.push(`${He} is <span class="hotpink">very happy</span> with ${his} private room in ${V.clinicName} and <span class="mediumaquamarine">trusts</span> you a bit more for placing ${him} in charge of it. Having a place to call ${his} own each night helps keep the stress of ${his} duties from catching up with ${him}.`);
					slave.devotion += 1;
					slave.trust += 1;

					if (slave.slaveUsedRest) {
						r.push(`${He} is permitted to take short breaks throughout the week to help manage ${his} building exhaustion, though it does restrict ${his} non-essential activities.`);
					}

					r.push(App.EndWeek.Rules.consentRules(slave));

					if (slave.attrKnown === 0) {
						if (assistantHasSeenSexuality) {
							slave.attrKnown = 1;
							r.push(`${capFirstChar(V.assistant.name)} has been monitoring ${him} as ${he} cares for ${his} patients to determine ${his} tastes. It seems ${he} is`);
							r.push(App.EndWeek.Rules.attractionDiscovery(slave));
						}
					}

					if (slave.rules.lactation === "induce") {
						r.push(`${He} spends much of ${his} time with a pair of automatic breast pumps attached to ${his} chest. The constant stimulation will have ${him} milky soon enough.`);
						r.push(induceLactation(slave, 8));
						if (slave.lactation === 1) {
							slave.rules.lactation = "maintain";
						}
					} else if (slave.rules.lactation === "maintain") {
						if (V.servantMilkers === 1) {
							milkResult = App.SlaveAssignment.getMilked(slave, 0.25);
							r.push(`${His} duties keep ${him} busy, but ${he}`);
							if (slave.fetish === Fetish.BOOBS) {
								r.push(`eagerly`);
							}
							r.push(`uses the penthouse milkers whenever ${he} can, giving ${milkResult.milk} liters of milk over the week, which is sold for <span class="yellowgreen"> ${cashFormat(milkResult.milkSale)}.</span>`);
						} else {
							r.push(`It's not unusual to see ${him} tending to ${his} patients with a pair of breast pumps sucking away at ${his} breasts.`);
							slave.lactationDuration = 2;
							slave.boobs -= slave.boobsMilk;
							slave.boobsMilk = 0;
						}
					}

					r.push(App.SlaveAssignment.rewardAndPunishment(slave));
					break;
				case Job.CLINIC:
					if (slave.devotion < -50) {
						r.push(`is so unhappy that ${he} has little interest in getting off${(App.Utils.releaseRestricted(slave)) ? `, making the rule restricting ${his} sexual outlets superfluous` : ``}.`);
						slave.need = 0;
					} else if (slave.energy <= 20) {
						r.push(`is frigid and has little interest in getting off${(App.Utils.releaseRestricted(slave)) ? `, making the rule restricting ${his} sexual outlets superfluous` : ``}.`);
						slave.need = 0;
					} else {
						let partner = App.EndWeek.getClinicPartner(slave);
						switch (partner.type) {
							case "player":
								r.push(`is well taken care of during ${his} stay in ${V.clinicName}; you make sure your ${wife}'s every sexual need is handled personally.`);
								slave.need = 0;
								if (canImpreg(slave, V.PC) && ((slave.vagina > 0 && slave.ovaries === 1) || (slave.anus !== 0 && slave.mpreg === 1))) {
									knockMeUp(slave, 10, 0, -1);
									if (slave.vagina > 0 && slave.ovaries === 1) {
										seX(slave, "vaginal", V.PC, "penetrative", 7);
									} else {
										seX(slave, "anal", V.PC, "penetrative", 7);
									}
									if (slave.preg > 0) {
										r.push(`It comes as little surprise when routine health checks start to show <span class="lime">${he}'s pregnant!</span>`);
									}
								}
								break;
							case "lover":
								slave.need = 0;
								r.push(`is well taken care of during ${his} stay in ${V.clinicName}; ${his}`);
								if (slave.relationship === 3) {
									r.push(`friend with benefits`);
								} else if (slave.relationship === 4) {
									r.push(`sweetheart`);
								} else {
									r.push(getPronouns(partner.slave).wife);
								}
								r.push(`frequently stops by when ${he} gets the chance to make sure ${his} sexual needs are properly handled.`);
								seX(partner.slave, "oral", slave, "penetrative", 14);
								break;
							case "family":
								r.push(`is well-loved by ${his} family; this week, ${his} ${relativeTerm(slave, partner.slave)} <span class="lightgreen">${partner.slave.slaveName}</span> pays special attention to ${him}, making sure ${his} sexual needs are met.`);
								slave.need = 0;
								seX(partner.slave, "oral", slave, "penetrative", 7);
								break;
							case "friend":
								r.push(`is friends with <span class="lightgreen">${partner.slave.slaveName},</span> who comes to visit ${him} regularly. ${His} sexual frustration from being confined to the clinic shows, and ${partner.slave.slaveName} often winds up helping ${him} get relief.`);
								if (partner.slave.rules.relationship === "permissive" && slave.rules.relationship === "permissive") {
									r.push(`They have <span class="lightgreen">become lovers.</span>`);
									slave.relationship = 3;
									partner.slave.relationship = 3;
								} else {
									r.push(`They know your rules prevent them from becoming anything more, but they enjoy themselves anyway.`);
								}
								slave.need = 0;
								seX(partner.slave, "oral", slave, "penetrative", 7);
								break;
							case "nurse":
								r.push(`is routinely brought to orgasm by ${S.Nurse.slaveName} as part of ${his} duties.`);
								if (canPenetrate(slave) && S.Nurse.boobs >= 500) {
									seX(S.Nurse, "mammary", slave, "penetrative", 14);
								} else {
									actX(S.Nurse, "oral", 14);
									/* possible cumflation code here */
								}
								slave.need -= 60;
								break;
							default:
								if (release.masturbation === 1) {
									if (slave.devotion <= 20 && slave.trust >= -20) {
										r.push(`takes solace in ${his} permission to masturbate rather than being forced to seek other means of release, <span class="mediumaquamarine">reducing ${his} fear</span> of you.`);
										slave.trust += 2;
										slave.need = 0;
									} else if (slave.devotion <= 20) {
										r.push(`enjoys being allowed to masturbate rather than having to seek other means of release, <span class="mediumaquamarine">slightly reducing ${his} fear</span> of you but <span class="mediumorchid">allowing ${him} to remain in control of ${him} sexuality.</span>`);
										slave.trust += 1;
										slave.devotion -= 1;
										slave.need = 0;
									} else if (slave.devotion <= 50) {
										r.push(`accepts having to relieve ${himself} solely through masturbation.`);
										slave.need = 0;
									} else {
										r.push(`is a little disappointed that ${he}'s limited to ${his}`);
										if (!hasAnyArms(slave)) {
											r.push(`imagination`);
										} else {
											r.push(`${hands}`);
										}
										r.push(`and toys, but <span class="mediumaquamarine">understands you care about ${his} current health.</span>`);
										slave.trust += 1;
										slave.need = 0;
									}
									if (slave.devotion > 20) {
										r.push(`When ${he} does play with ${himself}, ${he}`);
										r.push(App.EndWeek.Rules.masturbationFetishPlay(slave));
										r.push(App.EndWeek.Rules.masturbationDiscoversFetish(slave));
									}
									r.push(App.EndWeek.Rules.masturbationDrugEffects(slave));
								} else {
									r.push(`eventually gives in to ${his} urges and is <span class="gold">punished</span> for illicit masturbation.`);
									slave.trust -= 2;
									slave.need -= 10;
								}
						}
					}

					r.push(App.EndWeek.Rules.speechRules(slave));

					if (slave.devotion <= 20) {
						switch (V.clinicDecoration) {
							case "Eugenics":
							case "Gender Fundamentalist":
							case "Gender Radicalist":
							case "Hedonistic":
							case "Maturity Preferentialist":
							case "Paternalist":
							case "Repopulationist":
							case "Slimness Enthusiast":
							case "Youth Preferentialist":
							case "Neo-Imperialist":
								r.push(`The luxurious living conditions encourage ${him} to <span class="mediumaquamarine">feel respectable.</span> ${He} can't help but <span class="hotpink">feel you care</span> about ${him} as something more than just an object under such lovely treatment.`);
								slave.trust += 3;
								slave.devotion += 1;
								break;
							case "Arabian Revivalist":
							case "Aztec Revivalist":
							case "Chattel Religionist":
							case "Chinese Revivalist":
							case "Egyptian Revivalist":
							case "Roman Revivalist":
								r.push(`The living conditions, despite their open nature, are <span class="mediumaquamarine">quite relaxing.</span> ${His} opinion of you <span class="hotpink">can only rise</span> with such lovely treatment.`);
								slave.trust += 2;
								slave.devotion += 1;
								break;
							case "Antebellum Revivalist":
								r.push(`The living conditions, despite their simple nature, are peaceful and quite ${him} <span class="mediumaquamarine">calming.</span>`);
								slave.trust += 2;
								break;
							case "Edo Revivalist":
								r.push(`The living conditions, despite their spartan nature, are <span class="mediumaquamarine">calming.</span> ${His} opinion of you <span class="hotpink">improves</span> with such a contrast to ${his} usual life.`);
								slave.trust += 1;
								slave.devotion += 1;
								break;
							case "standard":
								r.push(`The spare living conditions of ${V.clinicName} serve as a constant reminder that <span class="hotpink">you only care about ${his} body</span> and not about ${him}.`);
								if (slave.trust > 20) {
									r.push(`<span class="gold">${He} fully understands what this means for ${him}.</span>`);
									slave.trust -= 1;
								}
								slave.devotion += 1;
								break;
							default:
								r.push(`The spare living conditions of ${V.clinicName} serve as a constant reminder that <span class="hotpink">${he} is nothing more than an object</span> for your amusement.`);
								if (slave.trust > 20) {
									r.push(`${He} can only <span class="gold">envision the horrors</span> that await ${him} under your care.`);
									slave.trust -= 2;
								}
								slave.devotion += 1;
						}
					} else {
						switch (V.clinicDecoration) {
							case "Eugenics":
							case "Gender Fundamentalist":
							case "Gender Radicalist":
							case "Hedonistic":
							case "Maturity Preferentialist":
							case "Paternalist":
							case "Repopulationist":
							case "Slimness Enthusiast":
							case "Youth Preferentialist":
							case "Neo-Imperialist":
								r.push(`${He} loves ${his} stay in ${V.clinicName} and almost wishes it didn't have to end.`);
								break;
							case "Arabian Revivalist":
							case "Aztec Revivalist":
							case "Chattel Religionist":
							case "Chinese Revivalist":
							case "Egyptian Revivalist":
							case "Roman Revivalist":
								r.push(`The living conditions, despite their open nature, are <span class="mediumaquamarine">quite relaxing.</span> ${He} savors ${his} stay at ${V.clinicName}.`);
								slave.trust += 1;
								break;
							case "Edo Revivalist":
								r.push(`The living conditions, despite their spartan nature, are <span class="mediumaquamarine">calming.</span> ${He} enjoys ${his} stay at ${V.clinicName}.`);
								slave.trust += 1;
								break;
							case "Antebellum Revivalist":
								r.push(`All the fresh air is <span class="health inc">good for ${his} health.</span> ${He} appreciates ${his} stay at ${V.clinicName}.`);
								slave.health.condition += 1;
								break;
							case "standard":
								if (slave.trust > 40) {
									r.push(`The spare living conditions of ${V.clinicName} <span class="gold">remind ${him} not to get too comfortable</span> with ${his} life.`);
									slave.trust -= 2;
								} else if (slave.trust > 10) {
									r.push(`The spare living conditions of ${V.clinicName} <span class="gold">keep ${him} aware of ${his} place.</span>`);
									slave.trust -= 1;
								}
								break;
							default:
								if (slave.devotion >= 80) {
									r.push(`The spare living conditions of ${V.clinicName} remind ${him} that ${he} is just an object for your amusement, and that is fine with ${him}.`);
								} else if (slave.trust > 40) {
									r.push(`The spare living conditions of ${V.clinicName} <span class="gold">remind ${him} that ${he} is just an object to you.</span>`);
									slave.trust -= 2;
								} else if (slave.trust > 10) {
									r.push(`The spare living conditions of ${V.clinicName} <span class="gold">keep ${him} aware of ${his} place as your plaything.</span>`);
									slave.trust -= 1;
								}
						}
					}

					/* diverges from App.EndWeek.Rules.consentRules(slave) */
					if (V.universalRulesConsent === 0) {
						if (slave.devotion <= 20) {
							if (slave.trust > -10) {
								r.push(`Under the rules, ${he} is free game for other slaves to molest, and lives ${his} life constantly <span class="gold">afraid</span> of the day ${he} is released from ${V.clinicName}.`);
								slave.trust -= 2;
							} else {
								r.push(`Under the rules, ${he} will find ${himself} constantly molested by other slaves once ${he} leaves ${V.clinicName}, but ${he}'s already in such constant terror that it doesn't cross ${his} mind.`);
							}
						} else if (release.slaves === 1) {
							if (slave.energy > 95) {
								r.push(`Under the rules, ${he}'s allowed to demand that other slaves get ${him} off, and ${he} <span class="hotpink">eagerly takes the opportunity</span> whenever visiting slaves are present.`);
								slave.devotion += 1;
							} else if (slave.fetishKnown === 1 && slave.fetishStrength > 60) {
								if (slave.fetish === Fetish.SADIST) {
									r.push(`Under the rules, ${he}'s allowed to demand that other slaves get ${him} off, and ${he} <span class="hotpink">eagerly orders</span> visiting slaves to get in bed with ${him}.`);
									slave.devotion += 1;
								} else if (slave.fetish === Fetish.DOM) {
									r.push(`Under the rules, ${he}'s allowed to demand other slaves to have sex with ${him}, and ${he} <span class="hotpink">eagerly orders</span> visiting slaves to serve ${his} every desire.`);
									slave.devotion += 1;
								}
							}
						}
					} else {
						if (slave.devotion <= 20 && slave.devotion >= -20) {
							r.push(`Since ${he}'s low in the slave hierarchy, <span class="mediumaquamarine">${he} knows that ${he}'s safe</span> from other slaves' abuse while ${he} is recovering.`);
							slave.trust += 1;
						}
					}

					if (slave.attrKnown === 0) {
						if (assistantHasSeenSexuality) {
							slave.attrKnown = 1;
							r.push(`${capFirstChar(V.assistant.name)} has been monitoring ${his} choice of entertainment, analyzing ${his} sexuality. It seems ${he} is`);
							r.push(App.EndWeek.Rules.attractionDiscovery(slave));
						}
					}

					if (slave.rules.lactation === "induce") {
						r.push(`${He} spends ${his} stay with a pair of automatic breast pumps attached to ${his} chest. The constant stimulation will have ${him} milky soon enough.`);
						r.push(induceLactation(slave, 10));
						if (slave.lactation === 1) {
							slave.rules.lactation = "maintain";
						}
					} else if (slave.rules.lactation === "maintain") {
						if (slave.devotion > 20) {
							if (slave.fetish === Fetish.BOOBS) {
								if (canHold(slave)) {
									r.push(`Whenever ${he} is feeling up to it, ${he} enjoys milking ${himself} by hand in lieu of using a breast pump; it's around for those times ${he} can't muster the energy.`);
								} else {
									r.push(`${He} spends ${his} stay mostly with a pair of automatic breast pumps attached to ${his} chest. They get ${him} so worked up, ${he} has to be asked to take breaks from using them.`);
								}
							} else {
								r.push(`${He} spends ${his} stay with a pair of automatic breast pumps attached to ${his} chest. The periodic suction is both relieving and invigorating.`);
							}
						} else if (slave.devotion >= -20) {
							if (slave.fetish === Fetish.BOOBS) {
								r.push(`${He} spends most of ${his} stay with a pair of automatic breast pumps attached to ${his} chest. They get ${him} so worked up, ${his} time with them has to be limited.`);
							} else {
								r.push(`${He} spends ${his} stay with a pair of automatic breast pumps attached to ${his} chest. It's a little uncomfortable, but ${he} won't dare complain.`);
							}
						} else {
							r.push(`${He} spends ${his} stay with a pair of automatic breast pumps locked to ${his} chest. ${His} lactation will not be allowed to wane so easily.`);
						}
						slave.lactationDuration = 2;
						slave.boobs -= slave.boobsMilk;
						slave.boobsMilk = 0;
					}

					r.push(App.SlaveAssignment.rewardAndPunishment(slave));
					break;
				case Job.WARDEN:
					slave.need -= App.EndWeek.saVars.flSex.size * 5;
					if (slave.energy <= 20) {
						r.push(`is frigid and has little interest in getting off${(App.Utils.releaseRestricted(slave)) ? `, making the rule restricting ${his} sexual outlets superfluous` : ``}.`);
						slave.need = 0;
					} else if (slave.need < App.EndWeek.saVars.needCapPerSlave[slave.ID] * 0.5) {
						r.push(`gets off at work, so ${he} doesn't feel the need for release that often.`);
						slave.need -= 20;
					} else {
						r.push(App.SlaveAssignment.nonAssignmentRelease(slave));
					}

					r.push(`${He} is <span class="hotpink">very happy</span> with ${his} private room in ${V.cellblockName} and <span class="mediumaquamarine">trusts</span> you a bit more for placing ${him} in charge of it. It also helps to offset the tiring nature of ${his} position.`);
					slave.devotion += 1;
					slave.trust += 1;

					if (slave.slaveUsedRest) {
						r.push(`${He} is permitted to take short breaks throughout the week to help manage ${his} building exhaustion, though it does restrict ${his} non-essential activities.`);
					}

					if (slave.attrKnown === 0) {
						if (assistantHasSeenSexuality) {
							slave.attrKnown = 1;
							r.push(`${capFirstChar(V.assistant.name)} has been monitoring ${him} as ${he} oversees the prisoners, analyzing ${his} preferences. It seems ${he} is`);
							r.push(App.EndWeek.Rules.attractionDiscovery(slave));
						}
					}

					if (slave.rules.lactation === "induce") {
						r.push(`Whenever ${he} finds a free moment from ${his} duties, ${he} spends that time massaging ${his} breasts and working ${his} nipples.`);
						r.push(induceLactation(slave, 3));
						if (slave.lactation === 1) {
							slave.rules.lactation = "maintain";
						}
					} else if (slave.rules.lactation === "maintain") {
						if (V.servantMilkers === 1) {
							milkResult = App.SlaveAssignment.getMilked(slave, 0.25);
							r.push(`${His} duties keep ${him} busy, but ${he}`);
							if (slave.fetish === Fetish.BOOBS) {
								r.push(`eagerly`);
							}
							r.push(`uses the penthouse milkers whenever ${he} can, giving ${milkResult.milk} liters of milk over the week, which is sold for <span class="yellowgreen">${cashFormat(milkResult.milkSale)}.</span>`);
						} else {
							r.push(`${He} works maintaining ${his} lactation into ${his} duties; when ${he} feels ${his} chest has grown too heavy, the nearest prisoner had better have an appetite or there will be punishment.`);
							slave.lactationDuration = 2;
							slave.boobs -= slave.boobsMilk;
							slave.boobsMilk = 0;
						}
					}

					r.push(App.SlaveAssignment.rewardAndPunishment(slave));
					break;
				case Job.CELLBLOCK: {
					let wardenFunTimes = 0;
					let pregNotice = ``;
					if (App.EndWeek.saVars.flSex.has(slave.ID)) {
						wardenFunTimes = random(0, 5);
						slave.need -= (10 * wardenFunTimes);
						SimpleSexAct.Slaves(slave, S.Wardeness, wardenFunTimes);
						if (canImpreg(slave, S.Wardeness) && (V.cellblockWardenCumsInside === 1 || S.Wardeness.fetish === Fetish.MINDBROKEN)) {
							pregNotice = knockMeUp(slave, 3 * wardenFunTimes, 2, V.WardenessID);
						}
					}
					if (slave.devotion < -50) {
						r.push(`is so unhappy that ${he} has little interest in getting off, making the rule restricting ${his} sexual outlets superfluous.`);
						if (wardenFunTimes > 0) {
							r.push(`${His} unhappiness doesn't stop ${S.Wardeness.slaveName} from raping ${him}, of course, which <span class="trust dec">contributes to ${his} growing fear.</span>`);
							r.push(pregNotice);
							slave.trust--;
						}
						slave.need = 0;
					} else if (slave.energy <= 20) {
						r.push(`is frigid and has little interest in getting off, making the rule restricting ${his} sexual outlets superfluous.`);
						if (wardenFunTimes > 0) {
							r.push(`${His} disinterest doesn't stop ${S.Wardeness.slaveName} from raping ${him}, of course, which <span class="trust dec">contributes to ${his} growing fear.</span>`);
							r.push(pregNotice);
							slave.trust--;
						}
						slave.need = 0;
					} else if (slave.relationship === -3) {
						r.push(`You make sure your troublesome ${wife}'s sexual needs are handled, openly, in the middle of ${V.cellblockName}, where everyone can see, hear, and smell your dominance.`);
						slave.need = 0;
						if (canDoVaginal(slave) && slave.vagina > 0) {
							seX(slave, "vaginal", V.PC, "penetrative", 7);
						} else if (canDoAnal(slave) && slave.anus > 0) {
							seX(slave, "anal", V.PC, "penetrative", 7);
						} else {
							seX(slave, "penetrative", V.PC, "oral", 7);
						}
						if (canImpreg(slave, V.PC) && ((slave.vagina > 0 && slave.ovaries === 1) || (slave.anus !== 0 && slave.mpreg === 1))) {
							knockMeUp(slave, 10, 0, -1);
							if (slave.preg > 0) {
								r.push(`As an added show, you <span class="lime">proudly display ${his} positive pregnancy</span> test for all to see.`);
							}
						}
					} else {
						if (wardenFunTimes > 0) {
							r.push(`is regularly raped to climax by ${S.Wardeness.slaveName}.`);
							r.push(pregNotice);
						}
						if (slave.need < App.EndWeek.saVars.needCapPerSlave[slave.ID] * 0.5 && wardenFunTimes > 0) {
							r.push(`${He} gets off despite ${his} reluctance, <span class="hotpink">habituating ${him} to sexual slavery.</span>`);
							slave.devotion += 1;
							if (slave.trust >= -20 && slave.devotion <= 20) {
								r.push(`${He} hates ${himself} for climaxing, and knows the mild aphrodisiacs in the food are forcing ${his} arousal, <span class="gold">frightening ${him}.</span>`);
								slave.trust -= 1;
							}
							slave.need -= 20;
						} else {
							if (wardenFunTimes > 0) {
								r.push(`It's not enough to satisfy ${his} needs, and ${he}`);
							}
							if (random(-100, 0) > slave.devotion) {
								r.push(`refuses to not touch ${himself} and is <span class="gold">severely punished</span> for illicit masturbation.`);
								slave.trust -= 2;
								slave.need -= 10;
							} else {
								r.push(`<span class="gold">fears</span> trying to`);
								if (canAchieveErection(slave) && !slave.chastityPenis) {
									r.push(`jack off`);
								} else {
									r.push(`touch ${himself}`);
								}
								r.push(`to get relief when ${he} knows what the consequences are.`);
								slave.trust -= 1;
							}
						}
					}

					r.push(App.EndWeek.Rules.speechRules(slave));

					switch (V.cellblockDecoration) {
						case "Antebellum Revivalist":
						case "Degradationist":
							r.push(`${He} expected spare living conditions. In reality, they are far worse. <span class="gold">Not one moment goes by that ${he} isn't filled with terror.</span>`);
							slave.trust -= 3;
							break;
						case "Paternalist":
							r.push(`${He} expected far worse living conditions, and while still resistant, <span class="hotpink">finds ${himself} more willing to obey.</span>`);
							slave.devotion += 1;
							break;
						case "Pastoralist":
							r.push(`${He} expected the spare living conditions, but not the dietary supplements. ${He} never anticipated <span class="gold">you'd go this far</span> to force ${him} into shape and is constantly reminded of ${his} changes by just how small ${his} cell feels with a belly full of milk.`);
							slave.trust -= 2;
							break;
						case "Body Purist":
							r.push(`${He} expected the spare living conditions, but not the excessive hydration. ${He} never anticipated <span class="gold">you'd go this far</span> to force ${him} into shape and is constantly reminded of ${his} changes by the fullness of ${his} bladder.`);
							slave.trust -= 2;
							break;
						case "Hedonistic":
							r.push(`${He} expected the spare living conditions, but not the dietary supplements. ${He} never anticipated <span class="gold">you'd go this far</span> to force ${him} into shape and is constantly reminded of ${his} changes by just how small ${his} cell feels with a belly full of food.`);
							slave.trust -= 2;
							break;
						default:
							r.push(`${He} expected the spare living conditions, but no matter how hard ${he} tries to shut out ${his} surroundings, <span class="gold">they still wear down ${his} will.</span>`);
							slave.trust -= 1;
					}

					if (slave.rules.lactation === "induce") {
						r.push(`${He} spends ${his} sentence with a pair of automatic breast pumps locked to ${his} chest. If all goes well, ${he}'ll be both reformed and lactating by ${his} release.`);
						r.push(induceLactation(slave, 10));
						if (slave.lactation === 1) {
							slave.rules.lactation = "maintain";
						}
					} else if (slave.rules.lactation === "maintain") {
						r.push(`${He} spends ${his} stay with a pair of automatic breast pumps locked to ${his} chest.`);
						if (slave.devotion > 20) {
							if (slave.fetish === Fetish.BOOBS) {
								r.push(`It's both enjoyable and what you want, so the inconvenience is easily tolerated.`);
							} else {
								r.push(`It beats swollen breasts, so ${he} can't complain.`);
							}
						} else if (slave.devotion >= -20) {
							if (slave.fetish === Fetish.BOOBS) {
								r.push(`It's enjoyable, but showing it will only be met with punishment.`);
							} else {
								r.push(`It's uncomfortable, but complaints will only be met with punishment.`);
							}
						} else {
							r.push(`${His} lactation will not be allowed to wane so easily.`);
						}
						slave.lactationDuration = 2;
						slave.boobs -= slave.boobsMilk;
						slave.boobsMilk = 0;
					}

					r.push(App.SlaveAssignment.rewardAndPunishment(slave));
					break;
				}
				case Job.ATTENDANT:
					slave.need -= App.EndWeek.saVars.flSex.size * 3;
					if (slave.energy <= 20) {
						r.push(`is frigid and has little interest in getting off${(App.Utils.releaseRestricted(slave)) ? `, making the rule restricting ${his} sexual outlets superfluous` : ``}.`);
						slave.need = 0;
					} else if (slave.need < App.EndWeek.saVars.needCapPerSlave[slave.ID] * 0.5) {
						if (App.Utils.hasNonassignmentSex(slave)) {
							r.push(`gets off at work as well as during ${his} rest time.`);
						} else if (release.masturbation === 0) {
							r.push(`gets off at work, so being unable to touch ${himself} doesn't bother ${him}.`);
						} else {
							r.push(`gets off at work, so being unable to sate ${his} urges doesn't affect ${him} seriously.`);
						}
						slave.need -= 20;
					} else {
						r.push(App.SlaveAssignment.nonAssignmentRelease(slave));
					}

					r.push(`${He} is <span class="hotpink">very happy</span> with ${his} private room in the back of ${V.spaName} and <span class="mediumaquamarine">trusts</span> you a bit more for placing the well-being of your slaves in ${his}`);
					if (!hasAnyArms(slave)) {
						r.push(`figurative`);
					}
					r.push(`${hands}.`);
					slave.devotion += 1;
					slave.trust += 1;
					r.push(`${He} finds plenty of time to relax between ${his} duties, or during them, should ${his} company be requested.`);

					r.push(App.EndWeek.Rules.consentRules(slave));

					if (slave.attrKnown === 0) {
						if (assistantHasSeenSexuality) {
							slave.attrKnown = 1;
							r.push(`${capFirstChar(V.assistant.name)} has been monitoring ${him} as ${he} massages and relieves slaves, analyzing ${his} tastes. It seems ${he} is`);
							r.push(App.EndWeek.Rules.attractionDiscovery(slave));
						}
					}

					if (slave.rules.lactation === "induce") {
						r.push(`Whenever ${he} finds a free moment from ${his} duties, ${he} spends that time massaging ${his} breasts and working ${his} nipples.`);
						r.push(induceLactation(slave, 4));
						if (slave.lactation === 1) {
							slave.rules.lactation = "maintain";
						}
					} else if (slave.rules.lactation === "maintain") {
						if (V.servantMilkers === 1) {
							milkResult = App.SlaveAssignment.getMilked(slave, 0.25);
							r.push(`${His} duties keep ${him} busy, but ${he}`);
							if (slave.fetish === Fetish.BOOBS) {
								r.push(`eagerly`);
							}
							r.push(`uses the penthouse milkers whenever ${he} can, giving ${milkResult.milk} liters of milk over the week, which is sold for <span class="yellowgreen">${cashFormat(milkResult.milkSale)}.</span>`);
						} else {
							r.push(`Whenever ${he} finds a free moment from ${his} duties, ${he} takes the time to thoroughly milk ${his} breasts to keep ${his} lactation strong for you.`);
							slave.lactationDuration = 2;
							slave.boobs -= slave.boobsMilk;
							slave.boobsMilk = 0;
						}
					}

					r.push(App.SlaveAssignment.rewardAndPunishment(slave));
					break;
				case Job.SPA:
					if (slave.devotion < -50) {
						r.push(`is so unhappy that ${he} has little interest in getting off.`);
						slave.need = 0;
					} else if (slave.energy <= 20) {
						r.push(`is frigid and has little interest in getting off.`);
						slave.need = 0;
					} else if (App.EndWeek.saVars.flSex.has(slave.ID)) {
						r.push(`is routinely relieved of any built up tension by ${S.Attendant.slaveName}'s`);
						if (canPenetrate(slave) && S.Attendant.boobs >= 500) {
							r.push(`luscious breasts.`);
							actX(S.Attendant, "mammary", 14);
						} else {
							if (S.Attendant.lips > 40) {
								r.push(`luscious lips.`);
							} else if (S.Attendant.skill.oral > 30) {
								r.push(`skilled tongue.`);
							} else {
								r.push(`willing mouth.`);
							}
							actX(S.Attendant, "oral", 14);
							/* possible cumflation code here */
						}
						slave.need -= 60;
					} else {
						r.push(App.SlaveAssignment.nonAssignmentRelease(slave));
					}

					r.push(App.EndWeek.Rules.speechRules(slave));

					if (slave.devotion <= 20) {
						switch (V.spaDecoration) {
							case "Chinese Revivalist":
								r.push(`The steam of the bathhouse lingers even in ${his} personal room and <span class="hotpink">dulls ${his} will.</span>`);
								slave.devotion += 1;
								break;
							case "Antebellum Revivalist":
								r.push(`The thick air of the greenhouse brings ${his} a deep, if temporary, <span class="mediumaquamarine">calm.</span>`);
								slave.trust += 2;
								break;
							case "Chattel Religionist":
								r.push(`${He} gets a space of ${his} own in the communal slave quarters, but the constant sexual presence of the other slaves <span class="hotpink">get ${him} used</span> to the routine of`);
								if (slave.trust > 20) {
									r.push(`slavery and <span class="gold">keep ${him} aware of ${his} lowly place.</span>`);
									slave.trust -= 1;
								} else {
									r.push(`slavery.`);
								}
								slave.devotion += 1;
								break;
							case "Degradationist":
								r.push(`${He} gets a little room all to ${himself}, allowing ${him} to feel self-reliant; or it would, if it didn't have numerous cameras watching ${his} every move. The conditions <span class="hotpink">get ${him} used</span> to the routine of`);
								if (slave.trust > 20) {
									r.push(`slavery and <span class="gold">keep ${him} aware of ${his} lowly place.</span>`);
									slave.trust -= 1;
								} else {
									r.push(`slavery.`);
								}
								break;
							case "Asset Expansionist":
							case "Transformation Fetishist":
							case "Pastoralist":
								r.push(`${He} gets a little room all to ${himself}, allowing ${him} to feel self-reliant; or it would, if it weren't filled with constant reminders of ${his} changing body. The conditions <span class="hotpink">get ${him} used</span> to the routine of`);
								if (slave.trust > 20) {
									r.push(`slavery and <span class="gold">keep ${him} aware of ${his} lowly place.</span>`);
									slave.trust -= 1;
								} else {
									r.push(`slavery.`);
								}
								break;
							default:
								r.push(`${He} gets a comfortable little room all to ${himself}, allowing ${him} to let down ${his} guard and <span class="mediumaquamarine">feel self-reliant.</span>`);
								slave.trust += 1;
						}
					} else {
						switch (V.spaDecoration) {
							case "Chinese Revivalist":
								r.push(`The steam of the bathhouse lingers even in ${his} personal room and <span class="hotpink">renders ${him} even more submissive.</span>`);
								slave.devotion += 1;
								break;
							case "Antebellum Revivalist":
								r.push(`The thick air of the greenhouse brings ${his} a deeper, more serene, <span class="mediumaquamarine">calm.</span> now that ${his} mind is free from doubts about being your slave.`);
								slave.trust += 4;
								break;
							case "Chattel Religionist":
								r.push(`${He} likes ${his} personal space in ${V.spaName}, even if`);
								if (canSmell(slave)) {
									r.push(`it smells of`);
								} else {
									r.push(`it's filled with the heat from`);
								}
								r.push(`sex and steam.`);
								break;
							case "Degradationist":
								if (slave.trust > 40) {
									r.push(`The invasive living conditions of ${V.spaName} <span class="gold">remind ${him} not to get too comfortable</span> with ${his} life.`);
									slave.trust -= 2;
								} else if (slave.trust > 10) {
									r.push(`The invasive living conditions of ${V.spaName} <span class="gold">keep ${him} aware of ${his} place.</span>`);
									slave.trust -= 1;
								}
								break;
							case "Asset Expansionist":
							case "Transformation Fetishist":
							case "Pastoralist":
								r.push(`${He} likes ${his} little room in ${V.spaName},`);
								if (slave.boobs < 10000) {
									r.push(`even if ${his} boobs are too small to make the most of it.`);
								} else {
									r.push(`even more so, since it accommodates ${his} expansive bust.`);
								}
								break;
							default:
								r.push(`${He} loves ${his} little room in ${V.spaName}. It's the perfect end to a day of relaxation.`);
								slave.trust += 1;
						}
					}

					r.push(App.EndWeek.Rules.consentRules(slave));

					if (slave.attrKnown === 0) {
						if (assistantHasSeenSexuality) {
							slave.attrKnown = 1;
							r.push(`${capFirstChar(V.assistant.name)} has been monitoring ${him} as ${he} mingles with other soaking slaves, analyzing ${his} sexual tastes. It seems ${he} is`);
							r.push(App.EndWeek.Rules.attractionDiscovery(slave));
						}
					}

					if (V.AttendantID !== 0) {
						/* Attendant milks natural lactation in order to relieve physical stress — spaReport */
						if (slave.rules.lactation === "induce") {
							if (canHold(slave) && slave.devotion >= -20) {
								r.push(`${He} massages ${his} breasts while relaxing in an effort to bring in ${his} lactation.`);
							} else {
								r.push(`${He} tries to relax as best ${he} can with a pair of automatic breast pumps attached to ${his} chest in an attempt to induce lactation.`);
							}
							r.push(induceLactation(slave, 4));
							if (slave.lactation === 1) {
								slave.rules.lactation = "maintain";
							}
						} else if (slave.rules.lactation === "maintain") {
							if (canHold(slave) && (slave.devotion >= -20 || slave.fetish === Fetish.BOOBS)) {
								r.push(`${He} massages ${his} breasts while relaxing to take the edge off and keep the milk flowing.`);
							} else {
								r.push(`${He} tries to relax as best ${he} can with a pair of automatic breast pumps stuck to ${his} chest, keeping ${his} milk flowing.`);
							}
							slave.lactationDuration = 2;
							slave.boobs -= slave.boobsMilk;
							slave.boobsMilk = 0;
						}
					}

					r.push(App.SlaveAssignment.rewardAndPunishment(slave));
					break;
				case Job.MATRON:
					slave.need -= App.EndWeek.saVars.flSex.size * 3;
					if (slave.energy <= 20) {
						r.push(`is frigid and has little interest in getting off${(App.Utils.releaseRestricted(slave)) ? `, making the rule restricting ${his} sexual outlets superfluous` : ``}.`);
						slave.need = 0;
					} else if (slave.need < App.EndWeek.saVars.needCapPerSlave[slave.ID] * 0.5) {
						if (release.masturbation === 0) {
							r.push(`gets off while relieving ${his} charges, so being forbidden from masturbation doesn't really bother ${him}.`);
						} else {
							r.push(`gets off while relieving ${his} charges, so ${he} doesn't feel the need for release that often.`);
						}
						slave.need -= 20;
					} else {
						r.push(App.SlaveAssignment.nonAssignmentRelease(slave));
					}

					r.push(`${He} is <span class="hotpink">very happy</span> with ${his} private room in the back of ${V.nurseryName} and <span class="mediumaquamarine">trusts</span> you a bit more for placing the responsibility of raising ${V.arcologies[0].name}'s children in ${his}`);
					if (!hasAnyArms(slave)) {
						r.push(`figurative`);
					}
					r.push(`${hands}.`);
					slave.devotion += 1;
					slave.trust += 1;

					r.push(App.EndWeek.Rules.consentRules(slave));

					if (slave.attrKnown === 0) {
						if (assistantHasSeenSexuality) {
							slave.attrKnown = 1;
							r.push(`${capFirstChar(V.assistant.name)} has been monitoring ${him} as ${he} massages and relieves slaves, analyzing ${his} tastes. It seems ${he} is`);
							r.push(App.EndWeek.Rules.attractionDiscovery(slave));
						}
					}

					if (slave.rules.lactation === "induce") {
						r.push(`Whenever ${he} finds a free moment from ${his} duties, ${he} spends that time massaging ${his} breasts and working ${his} nipples.`);
						r.push(induceLactation(slave, 4));
						if (slave.lactation === 1) {
							slave.rules.lactation = "maintain";
						}
					} else if (slave.rules.lactation === "maintain") {
						if (V.servantMilkers === 1) {
							milkResult = App.SlaveAssignment.getMilked(slave, 0.25);
							r.push(`${His} duties keep ${him} busy, but ${he}`);
							if (slave.fetish === Fetish.BOOBS) {
								r.push(`eagerly`);
							}
							r.push(`uses the penthouse milkers whenever ${he} can, giving ${milkResult.milk} liters of milk over the week, which is sold for <span class="yellowgreen">${cashFormat(milkResult.milkSale)}.</span>`);
						} else {
							r.push(`Whenever ${he} finds a free moment from ${his} duties, ${he} takes the time to thoroughly milk ${his} breasts to keep ${his} lactation strong for you.`);
							slave.lactationDuration = 2;
							slave.boobs -= slave.boobsMilk;
							slave.boobsMilk = 0;
						}
					}

					r.push(App.SlaveAssignment.rewardAndPunishment(slave));
					break;
				case Job.NURSERY:
					if (slave.devotion < -50) {
						r.push(`is so unhappy that ${he} has little interest in getting off.`);
						slave.need = 0;
					} else if (slave.energy <= 20) {
						r.push(`is frigid and has little interest in getting off.`);
						slave.need = 0;
					} else if (App.EndWeek.saVars.flSex.has(slave.ID)) {
						r.push(`is routinely relieved of any built up tension by ${S.Matron.slaveName}'s`);
						if (canPenetrate(slave) && S.Matron.boobs >= 500) {
							r.push(`luscious breasts.`);
							actX(S.Matron, "mammary", 14);
						} else {
							if (S.Matron.lips > 40) {
								r.push(`luscious lips.`);
							} else if (S.Matron.skill.oral > 30) {
								r.push(`skilled tongue.`);
							} else {
								r.push(`willing mouth.`);
							}
							actX(S.Matron, "oral", 14);
							/* possible cumflation code here */
						}
						slave.need -= 60;
					} else {
						r.push(App.SlaveAssignment.nonAssignmentRelease(slave));
					}

					r.push(App.EndWeek.Rules.speechRules(slave));

					if (slave.devotion <= 20) {
						switch (V.nurseryDecoration) {
							case "Chinese Revivalist":
								r.push(`The Oriental artwork in ${his} personal room reminds ${him} of where ${he} is and <span class="hotpink">dulls ${his} will.</span>`);
								slave.devotion += 1;
								break;
							case "Chattel Religionist":
								r.push(`${He} gets a space of ${his} own in the communal slave quarters, but the constant sexual presence of the other slaves <span class="hotpink">get ${him} used</span> to the routine of`);
								if (slave.trust > 20) {
									r.push(`slavery and <span class="gold">keep ${him} aware of ${his} lowly place.</span>`);
									slave.trust -= 1;
								} else {
									r.push(`slavery.`);
								}
								slave.devotion += 1;
								break;
							case "Degradationist":
								r.push(`${He} gets a little room all to ${himself}, allowing ${him} to feel self-reliant; or it would, if it didn't have numerous cameras watching ${his} every move. The conditions <span class="hotpink">get ${him} used</span> to the routine of`);
								if (slave.trust > 20) {
									r.push(`slavery and <span class="gold">keep ${him} aware of ${his} lowly place.</span>`);
									slave.trust -= 1;
								} else {
									r.push(`slavery.`);
								}
								break;
							case "Asset Expansionist":
							case "Transformation Fetishist":
							case "Pastoralist":
								r.push(`${He} gets a little room all to ${himself}, allowing ${him} to feel self-reliant; or it would, if it weren't filled with constant reminders of ${his} changing body. The conditions <span class="hotpink">get ${him} used</span> to the routine of`);
								if (slave.trust > 20) {
									r.push(`slavery and <span class="gold">keep ${him} aware of ${his} lowly place.</span>`);
									slave.trust -= 1;
								} else {
									r.push(`slavery.`);
								}
								break;
							default:
								r.push(`${He} gets a comfortable little room all to ${himself}, allowing ${him} to let down ${his} guard and <span class="mediumaquamarine">feel self-reliant.</span>`);
								slave.trust += 1;
						}
					} else {
						switch (V.nurseryDecoration) {
							case "Chinese Revivalist":
								r.push(`The Oriental artwork in ${his} personal room reminds ${him} of ${his} position and <span class="hotpink">renders ${him} even more submissive.</span>`);
								slave.devotion += 1;
								break;
							case "Chattel Religionist":
								r.push(`${He} likes ${his} personal space in ${V.nurseryName}, even if it constantly reminds ${him} that ${he} is naught but a servant to the Prophet.`);
								break;
							case "Degradationist":
								if (slave.trust > 40) {
									r.push(`The invasive living conditions of ${V.nurseryName} <span class="gold">remind ${him} not to get too comfortable</span> with ${his} life.`);
									slave.trust -= 2;
								} else if (slave.trust > 10) {
									r.push(`The invasive living conditions of ${V.nurseryName} <span class="gold">keep ${him} aware of ${his} place.</span>`);
									slave.trust -= 1;
								}
								break;
							case "Asset Expansionist":
							case "Transformation Fetishist":
							case "Pastoralist":
								r.push(`${He} likes ${his} little room in ${V.nurseryName},`);
								if (slave.boobs < 10000) {
									r.push(`even if ${his} boobs are too small to make the most of it.`);
								} else {
									r.push(`even more so, since it accommodates ${his} expansive bust.`);
								}
								break;
							default:
								r.push(`${He} loves ${his} little room in ${V.nurseryName}. It's the perfect end to a busy day of taking care of children.`);
								slave.trust += 1;
						}
					}

					r.push(App.EndWeek.Rules.consentRules(slave));

					if (slave.attrKnown === 0) {
						if (assistantHasSeenSexuality) {
							slave.attrKnown = 1;
							r.push(`${capFirstChar(V.assistant.name)} has been monitoring ${him} as ${he} mingles with other busily working slaves, analyzing ${his} sexual tastes. It seems ${he} is`);
							r.push(App.EndWeek.Rules.attractionDiscovery(slave));
						}
					}

					/* update me, things like wet nursing and the like are important here */
					if (slave.rules.lactation === "induce") {
						r.push(`${He} spends ${his} stay with a pair of automatic breast pumps attached to ${his} chest. The constant stimulation will have ${him} milky soon enough.`);
						r.push(induceLactation(slave, 10));
						if (slave.lactation === 1) {
							slave.rules.lactation = "maintain";
						}
					} else if (slave.rules.lactation === "maintain") {
						if (slave.devotion > 20) {
							r.push(`Milk is always needed in a nursery and ${his} is no exception. ${He} is thoroughly drained each and every day, be it by breast pump or nursing infant.`);
						} else if (slave.devotion >= -20) {
							r.push(`Milk is always needed in a nursery and ${his} is no exception. ${He} is thoroughly drained each and every day.`);
						} else {
							r.push(`${He} spends ${his} stay with a pair of automatic breast pumps locked to ${his} chest. ${His} is a valuable commodity and needs to be maintained.`);
						}
						slave.lactationDuration = 2;
						slave.boobs -= slave.boobsMilk;
						slave.boobsMilk = 0;
					}

					r.push(App.SlaveAssignment.rewardAndPunishment(slave));
					break;
				case Job.TEACHER:
					slave.need -= App.EndWeek.saVars.flSex.size * 10;
					if (slave.energy <= 20) {
						r.push(`is frigid and has little interest in getting off${(App.Utils.releaseRestricted(slave)) ? `, making the rule restricting ${his} sexual outlets superfluous` : ``}.`);
						slave.need = 0;
					} else if (slave.need < App.EndWeek.saVars.needCapPerSlave[slave.ID] * 0.5) {
						if (release.masturbation === 0) {
							r.push(`gets off with ${his} students, so being forbidden from masturbation doesn't really bother ${him}.`);
						} else {
							r.push(`gets off with ${his} students, so ${he} doesn't feel the need for release that often.`);
						}
						slave.need -= 20;
					} else {
						r.push(App.SlaveAssignment.nonAssignmentRelease(slave));
					}

					r.push(`${He} is <span class="hotpink">very happy</span> with ${his} private room in the back of ${V.schoolroomName} and <span class="mediumaquamarine">trusts</span> you a bit more for placing the future education of your slaves in ${his}`);
					if (!hasAnyArms(slave)) {
						r.push(`figurative`);
					}
					r.push(`${hands}. It also helps to offset the tiring nature of ${his} position.`);
					slave.devotion += 1;
					slave.trust += 1;

					if (slave.slaveUsedRest) {
						r.push(`${He} is permitted to take short breaks throughout the week to help manage ${his} building exhaustion, though it does restrict ${his} non-essential activities.`);
					}

					r.push(App.EndWeek.Rules.consentRules(slave));

					if (slave.attrKnown === 0) {
						if (assistantHasSeenSexuality) {
							slave.attrKnown = 1;
							r.push(`${capFirstChar(V.assistant.name)} has been monitoring ${him} as ${he} teaches students, analyzing ${his} preferences. It seems ${he} is`);
							r.push(App.EndWeek.Rules.attractionDiscovery(slave));
						}
					}

					if (slave.rules.lactation === "induce") {
						r.push(`${His} lectures frequently include demonstrations on the proper way to induce lactation.`);
						r.push(induceLactation(slave, 5));
						if (slave.lactation === 1) {
							slave.rules.lactation = "maintain";
						}
					} else if (slave.rules.lactation === "maintain") {
						if (V.servantMilkers === 1) {
							milkResult = App.SlaveAssignment.getMilked(slave, 0.25);
							r.push(`${His} duties keep ${him} busy, but ${he}`);
							if (slave.fetish === Fetish.BOOBS) {
								r.push(`eagerly`);
							}
							r.push(`uses the penthouse milkers whenever ${he} can, giving ${milkResult.milk} liters of milk over the week, which is sold for <span class="yellowgreen">${cashFormat(milkResult.milkSale)}.</span>`);
						} else {
							r.push(`${He} makes sure to give a special lecture whenever ${his} breasts start to feel full on the proper methods to milk a ${girl}.`);
							slave.lactationDuration = 2;
							slave.boobs -= slave.boobsMilk;
							slave.boobsMilk = 0;
						}
					}

					r.push(App.SlaveAssignment.rewardAndPunishment(slave));
					break;
				case Job.SCHOOL:
					if (App.EndWeek.saVars.flSex.has(slave.ID)) {
						slave.need -= 30;
						seX(slave, "oral", S.Schoolteacher, "oral", 7);
						if (canPenetrate(S.Schoolteacher) && slave.boobs > 500) {
							seX(slave, "mammary", S.Schoolteacher, "penetrative", 7);
						}
						if (canDoVaginal(slave)) {
							if (slave.vagina !== 0) {
								seX(S.Schoolteacher, "penetrative", slave, "vaginal", 7);
								if (canImpreg(slave, S.Schoolteacher) && (slave.breedingMark === 0 || V.propOutcome === 0 || V.eugenicsFullControl === 1 || !FutureSocieties.isActive('FSRestart'))) {
									knockMeUp(slave, 5, 0, S.Schoolteacher.ID);
								}
							}
							slave.need -= 10;
						}
						if (canDoAnal(slave)) {
							if (slave.anus !== 0) {
								seX(S.Schoolteacher, "penetrative", slave, "anal", 7);
								if (canImpreg(slave, S.Schoolteacher) && (slave.breedingMark === 0 || V.propOutcome === 0 || V.eugenicsFullControl === 1 || !FutureSocieties.isActive('FSRestart'))) {
									knockMeUp(slave, 5, 1, S.Schoolteacher.ID);
								}
							}
							slave.need -= 10;
						}
						if (canPenetrate(slave)) {
							if (S.Schoolteacher.vagina !== 0) {
								seX(S.Schoolteacher, "vaginal", slave, "penetrative", 7);
							} else if (S.Schoolteacher.anus !== 0) {
								seX(S.Schoolteacher, "anal", slave, "penetrative", 7);
							}
							if (canImpreg(S.Schoolteacher, slave) && (S.Schoolteacher.breedingMark === 0 || V.propOutcome === 0 || V.eugenicsFullControl === 1 || !FutureSocieties.isActive('FSRestart'))) {
								if (S.Schoolteacher.vagina !== 0 && S.Schoolteacher.ovaries === 1) {
									knockMeUp(S.Schoolteacher, 5, 0, slave.ID);
								} else if (S.Schoolteacher.anus !== 0 && S.Schoolteacher.mpreg === 1) {
									knockMeUp(S.Schoolteacher, 5, 1, slave.ID);
								}
							}
							slave.need -= 10;
						}
					}
					if (slave.devotion < -50) {
						r.push(`is so unhappy that ${he} has little interest in getting off, making the rule restricting ${his} sexual outlets superfluous.`);
						slave.need = 0;
					} else if (slave.energy <= 20) {
						r.push(`is frigid and has little interest in getting off${(App.Utils.releaseRestricted(slave)) ? `, making the rule restricting ${his} sexual outlets superfluous` : ``}.`);
						slave.need = 0;
					} else if (slave.need < App.EndWeek.saVars.needCapPerSlave[slave.ID] * 0.5) {
						if (slave.devotion <= 20) {
							r.push(`gets off during class despite ${his} reluctance, <span class="hotpink">habituating ${him} to sexual slavery.</span>`);
							slave.devotion += 1;
							if (slave.trust >= -20 && slave.devotion <= 20) {
								r.push(`${He} hates ${himself} for climaxing, and knows the mild aphrodisiacs in the food are forcing ${his} arousal, <span class="gold">frightening ${him}.</span>`);
								slave.trust -= 1;
							}
						} else if (App.Utils.hasNonassignmentSex(slave)) {
							r.push(`gets off during class as well as during ${his} rest time.`);
						} else if (release.masturbation === 0) {
							r.push(`gets off during class, so being unable to touch ${himself} doesn't bother ${him}.`);
						} else {
							r.push(`gets off during class, so ${he} doesn't feel the need to masturbate frequently.`);
						}
						slave.need -= 20;
					} else {
						r.push(App.SlaveAssignment.nonAssignmentRelease(slave));
					}

					r.push(App.EndWeek.Rules.speechRules(slave));

					if (slave.devotion <= 20) {
						r.push(`The reasonable living conditions allow ${him} to <span class="mediumaquamarine">feel self-reliant.</span>`);
						slave.trust += 1;
					} else {
						r.push(`${He} likes ${his} personal space in the dormitory even if the other students sometimes bother ${him}.`);
					}

					r.push(App.EndWeek.Rules.consentRules(slave));

					if (slave.attrKnown === 0) {
						if (assistantHasSeenSexuality) {
							slave.attrKnown = 1;
							r.push(`${capFirstChar(V.assistant.name)} has been monitoring ${him} as ${he} studies, analyzing what topics ${he} tends to keep returning to. It seems ${he} is`);
							r.push(App.EndWeek.Rules.attractionDiscovery(slave));
						}
					}

					if (slave.rules.lactation === "induce") {
						r.push(`${He} is taught and tested on how to properly induce lactation.`);
						r.push(induceLactation(slave, 2));
						if (slave.lactation === 1) {
							slave.rules.lactation = "maintain";
						}
					} else if (slave.rules.lactation === "maintain") {
						r.push(`${He} is taught and tested on how to properly manage lactation.`);
						slave.lactationDuration = 2;
						slave.boobs -= slave.boobsMilk;
						slave.boobsMilk = 0;
					}

					r.push(App.SlaveAssignment.rewardAndPunishment(slave));
					break;
				case Job.STEWARD:
					slave.need -= L.servantsQuarters * 10;
					if (slave.energy <= 20) {
						r.push(`is frigid and has little interest in getting off${(App.Utils.releaseRestricted(slave)) ? `, making the rule restricting ${his} sexual outlets superfluous` : ``}.`);
						slave.need = 0;
					} else if (slave.need < App.EndWeek.saVars.needCapPerSlave[slave.ID] * 0.5) {
						if (release.masturbation === 0) {
							r.push(`gets off while performing ${his} duties, so being forbidden from masturbation doesn't really bother ${him}.`);
							slave.need -= 20;
						} else {
							r.push(`gets off while performing ${his} duties, so ${he} doesn't feel the need for release that often.`);
							slave.need -= 20;
						}
					} else {
						r.push(App.SlaveAssignment.nonAssignmentRelease(slave));
					}

					r.push(`${He} is <span class="hotpink">very happy</span> with ${his} private room off of ${V.servantsQuartersName} and <span class="mediumaquamarine">trusts</span> you a bit more for placing ${him} in charge of it. It also helps to offset the tiring nature of ${his} position.`);
					slave.devotion += 1;
					slave.trust += 1;

					if (slave.slaveUsedRest) {
						r.push(`${He} is permitted to take short breaks throughout the week to help manage ${his} building exhaustion, though it does restrict ${his} non-essential activities.`);
					}

					r.push(App.EndWeek.Rules.consentRules(slave));

					if (slave.attrKnown === 0) {
						if (assistantHasSeenSexuality) {
							slave.attrKnown = 1;
							r.push(`${capFirstChar(V.assistant.name)} has been monitoring ${him} as ${he} manages the servants, analyzing ${his} preferences. It seems ${he} is`);
							r.push(App.EndWeek.Rules.attractionDiscovery(slave));
						}
					}

					if (slave.rules.lactation === "induce") {
						r.push(`Whenever ${he} finds a free moment from ${his} duties, ${he} spends that time massaging ${his} breasts and working ${his} nipples.`);
						r.push(induceLactation(slave, 2));
						if (slave.lactation === 1) {
							slave.rules.lactation = "maintain";
						}
					} else if (slave.rules.lactation === "maintain") {
						if (V.servantMilkers === 1) {
							milkResult = App.SlaveAssignment.getMilked(slave, 0.25);
							r.push(`${His} duties keep ${him} busy, but ${he}`);
							if (slave.fetish === Fetish.BOOBS) {
								r.push(`eagerly`);
							}
							r.push(`uses the penthouse milkers whenever ${he} can, giving ${milkResult.milk} liters of milk over the week, which is sold for <span class="yellowgreen"> ${cashFormat(milkResult.milkSale)}.</span>`);
						} else {
							r.push(`Whenever ${he} finds a free moment from ${his} duties, ${he} takes the time to thoroughly milk ${his} breasts to keep ${his} lactation strong for you.`);
							slave.lactationDuration = 2;
							slave.boobs -= slave.boobsMilk;
							slave.boobsMilk = 0;
						}
					}

					r.push(App.SlaveAssignment.rewardAndPunishment(slave));
					break;
				case Job.QUARTER:
					slave.need -= V.slaves.length * 5;
					if (slave.devotion < -50) {
						r.push(`is so unhappy that ${he} has little interest in getting off.`);
						slave.need = 0;
					} else if (slave.energy <= 20) {
						r.push(`is frigid and has little interest in getting off.`);
						slave.need = 0;
					} else if (slave.need < App.EndWeek.saVars.needCapPerSlave[slave.ID] * 0.5) {
						if (slave.devotion <= 20) {
							r.push(`gets off at work despite ${his} reluctance, <span class="hotpink">habituating ${him} to sexual slavery.</span>`);
							slave.devotion += 1;
							if (slave.trust >= -20 && slave.devotion <= 20) {
								r.push(`${He} hates ${himself} for climaxing, and knows the mild aphrodisiacs in the food are forcing ${his} arousal, <span class="gold">frightening ${him}.</span>`);
								slave.trust -= 1;
							}
						} else if (App.Utils.hasNonassignmentSex(slave)) {
							r.push(`gets off at work as well as during ${his} rest time.`);
						} else if (release.masturbation === 0) {
							r.push(`gets off at work, so being unable to touch ${himself} doesn't bother ${him}.`);
						} else {
							r.push(`gets off at work, so being unable to sate ${his} urges doesn't affect ${him} seriously.`);
						}
						slave.need -= 20;
					} else {
						r.push(App.SlaveAssignment.nonAssignmentRelease(slave));
					}

					r.push(App.EndWeek.Rules.speechRules(slave));

					if (slave.devotion <= 20) {
						switch (V.servantsQuartersDecoration) {
							case "Degradationist":
								r.push(`The abysmal living conditions <span class="hotpink">force ${him} to get used</span> to the routine of`);
								if (slave.trust > 20) {
									r.push(`slavery and <span class="gold">keep ${him} aware of how meaningless ${he} is.</span>`);
									slave.trust -= 3;
								} else {
									r.push(`slavery and <span class="gold">reminds ${him} that ${his} life is meaningless.</span>`);
									slave.trust -= 1;
								}
								break;
							case "Subjugationist":
							case "Supremacist":
							case "Antebellum Revivalist":
								r.push(`The spare living conditions <span class="hotpink">get ${him} used</span> to the routine of`);
								if (slave.trust > 20) {
									r.push(`slavery and <span class="gold">keep ${him} aware of ${his} lowly place.</span>`);
									slave.trust -= 1;
								} else {
									r.push(`slavery.`);
								}
								r.push(`Every time ${he} has to watch another slave get beaten <span class="gold">solidifies ${his} fears.</span>`);
								slave.trust -= 1;
								break;
							case "Aztec Revivalist":
							case "Chattel Religionist":
							case "Chinese Revivalist":
							case "Edo Revivalist":
							case "Roman Revivalist":
								r.push(`The spare living conditions <span class="hotpink">get ${him} used</span> to the routine of slavery.`);
								break;
							case "Arabian Revivalist":
							case "Egyptian Revivalist":
							case "Neo-Imperialist":
								r.push(`The spare living conditions <span class="hotpink">get ${him} used</span> to the routine of`);
								if (slave.trust > 20) {
									r.push(`slavery, but the small luxuries <span class="mediumaquamarine">afford ${him} some dignity.</span>`);
									slave.trust += 1;
								} else {
									r.push(`slavery.`);
								}
								break;
							default:
								r.push(`The reasonable living conditions allow ${him} to <span class="mediumaquamarine">feel some dignity</span> after <span class="hotpink">cleaning up sexual fluids and servicing slaves all day.</span>`);
								slave.trust += 1;
						}
						slave.devotion += 1;
					} else {
						switch (V.servantsQuartersDecoration) {
							case "Degradationist":
								if (slave.trust > 40) {
									r.push(`The abysmal living conditions of ${V.servantsQuartersName} <span class="gold">remind ${him} that ${his} life is absolutely meaningless to you.</span>`);
									slave.trust -= 3;
								} else if (slave.trust > 10) {
									r.push(`The abysmal living conditions of ${V.servantsQuartersName} <span class="gold">remind ${him} that ${he} is worthless as a person to you.</span>`);
									slave.trust -= 2;
								}
								break;
							case "Subjugationist":
							case "Supremacist":
							case "Antebellum Revivalist":
								if (slave.trust > 40) {
									r.push(`The spare living conditions of ${V.servantsQuartersName} <span class="gold">remind ${him} not to get too comfortable</span> with ${his} life.`);
									slave.trust -= 2;
								} else if (slave.trust > 10) {
									r.push(`The spare living conditions of ${V.servantsQuartersName} <span class="gold">keep ${him} aware of ${his} place.</span>`);
									slave.trust -= 1;
								}
								break;
							case "Aztec Revivalist":
							case "Chattel Religionist":
							case "Chinese Revivalist":
							case "Edo Revivalist":
							case "Roman Revivalist":
								r.push(`The living conditions of ${V.servantsQuartersName} might be spare, but they are no means uncomfortable.`);
								break;
							case "Arabian Revivalist":
							case "Egyptian Revivalist":
							case "Neo-Imperialist":
								r.push(`The living conditions of ${V.servantsQuartersName} might be spare, but ${he} loves the little luxuries that come with them.`);
								break;
							default:
								r.push(`${He} likes ${his} personal space in ${V.servantsQuartersName}'s dormitory.`);
						}
					}
					if (slave.rules.living === "luxurious") {
						r.push(`They provide <span class="health inc">satisfying rest</span> every time ${he} drifts off to sleep.`);
					} else if (slave.rules.living === "spare") {
						if (slave.devotion > 20 && slave.trust <= 10) {
							r.push(`They don't provide much rest, however.`);
						} else {
							r.push(`They provide meager rest, if anything.`);
						}
					} else {
						r.push(`They provide`);
						if (slave.devotion > 20) {
							r.push(`<span class="health inc">adequate rest</span> for a ${girl} that knows how to manage ${his} time.`);
						} else {
							r.push(`<span class="health inc">adequate rest,</span> but not enough for a slave lacking time management.`);
						}
					}

					if (slave.rules.rest === "mandatory") {
						if (slave.devotion <= 20) {
							r.push(`Getting a day off each week <span class="mediumaquamarine">builds feelings of liberty</span> a slave shouldn't have.`);
							slave.trust += 3;
						} else {
							r.push(`${He} appreciates having a weekly day off and takes it as a sign that ${he} has a <span class="mediumaquamarine">caring ${getWrittenTitle(slave)}.</span>`);
							slave.trust += 1;
						}
					} else if (slave.slaveUsedRest) {
						if (slave.rules.rest === "permissive") {
							if (slave.devotion <= 20) {
								r.push(`${He}'s permitted to rest whenever ${he} feels even the slightest bit tired; <span class="mediumaquamarine">a privilege not lost on ${him}.</span>`);
								slave.trust += 2;
							} else {
								r.push(`${He} <span class="hotpink">likes</span> that you <span class="mediumaquamarine">care enough</span> to let ${him} rest when ${he} gets tired.`);
								slave.devotion += 1;
								slave.trust += 1;
							}
						} else if (slave.rules.rest === "restrictive") {
							if (slave.devotion <= -20) {
								r.push(`${He}'s permitted to rest when fatigue sets in, but not enough to shake ${his} tiredness; ${he} feels this <span class="gold">deprivation</span> is intentional.`);
								slave.trust -= 1;
							} else if (slave.devotion <= 20) {
								r.push(`${He}'s permitted to rest when fatigue sets in, and <span class="hotpink">understands</span> this is less for ${his} well-being and more to prevent ${him} from become unproductive.`);
								slave.devotion += 1;
							} else {
								r.push(`${He}'s permitted to rest when fatigue sets in and is <span class="mediumaquamarine">thankful</span> you would allow ${him} the privilege so that ${he} may serve you better.`);
								slave.trust += 1;
							}
						} else if (slave.rules.rest === "cruel") {
							if (slave.devotion <= -20) {
								r.push(`${He}'s <span class="gold">terrified</span> that the only reason ${he} is given any time to rest at all is just to prolong your torment of ${him}.`);
								slave.trust -= 3;
							} else if (slave.devotion <= 20) {
								r.push(`You work ${him} to the bone and only allow ${him} rest when on the verge of collapsing. ${He} <span class="gold">fears</span> this <span class="mediumorchid">cruelty</span> is just the beginning.`);
								slave.trust -= 3;
								slave.devotion -= 3;
							} else {
								r.push(`Only being allowed rest when on the verge of collapsing <span class="mediumorchid">shakes ${his} faith</span> in you a little.`);
								slave.devotion -= 2;
							}
						}
					}

					r.push(App.EndWeek.Rules.consentRules(slave));

					if (slave.attrKnown === 0) {
						if (assistantHasSeenSexuality) {
							slave.attrKnown = 1;
							r.push(`${capFirstChar(V.assistant.name)} has been monitoring ${him} as ${he} sees to your other slaves, analyzing ${his} sexuality. It seems ${he} is`);
							r.push(App.EndWeek.Rules.attractionDiscovery(slave));
						}
					}

					if (slave.rules.lactation === "induce") {
						r.push(`${He} carries out ${his} daily tasks with a pair of automatic breast pumps attached to ${his} chest to help bring in ${his} lactation.`);
						r.push(induceLactation(slave, 6));
						if (slave.lactation === 1) {
							slave.rules.lactation = "maintain";
						}
					} else if (slave.rules.lactation === "maintain" && V.servantMilkers !== 1) {
						r.push(`${He} utilizes ${his} lactation during ${his} daily tasks when needed, and if it should not be needed, spends the evenings with a pair of automatic breast pumps.`);
						slave.lactationDuration = 2;
						slave.boobs -= slave.boobsMilk;
						slave.boobsMilk = 0;
					}

					r.push(App.SlaveAssignment.rewardAndPunishment(slave));
					break;
				case Job.MILKMAID:
					slave.need -= L.dairy * 5;
					if (slave.energy <= 20) {
						r.push(`is frigid and has little interest in getting off${(App.Utils.releaseRestricted(slave)) ? `, making the rule restricting ${his} sexual outlets superfluous` : ``}.`);
						slave.need = 0;
					} else if (slave.need < App.EndWeek.saVars.needCapPerSlave[slave.ID] * 0.5) {
						if (release.masturbation === 0) {
							r.push(`gets off while performing ${his} duties, so being forbidden from masturbation doesn't really bother ${him}.`);
						} else {
							r.push(`gets off while performing ${his} duties, so ${he} doesn't feel the need for release that often.`);
						}
						slave.need -= 20;
					} else {
						r.push(App.SlaveAssignment.nonAssignmentRelease(slave));
					}

					r.push(`${He} is <span class="hotpink">very happy</span> with ${his} private room in ${V.dairyName} and <span class="mediumaquamarine">trusts</span> you a bit more for placing ${him} in charge of it. It also helps to offset the tiring nature of ${his} position.`);
					slave.devotion += 1;
					slave.trust += 1;

					if (slave.slaveUsedRest) {
						r.push(`${He} is permitted to take short breaks throughout the week to help manage ${his} building exhaustion, though it does restrict ${his} non-essential activities.`);
					}

					r.push(App.EndWeek.Rules.consentRules(slave));

					if (slave.attrKnown === 0) {
						if (assistantHasSeenSexuality) {
							slave.attrKnown = 1;
							r.push(`${capFirstChar(V.assistant.name)} has been monitoring ${him} as ${he} cares for the cattle, analyzing ${his} preferences. It seems ${he} is`);
							r.push(App.EndWeek.Rules.attractionDiscovery(slave));
						}
					}

					if (slave.rules.lactation === "induce") {
						r.push(`Whenever ${he} finds a free moment from ${his} duties, ${he} spends that time hooked up to a milker to hasten ${his} milk production.`);
						r.push(induceLactation(slave, 10));
						if (slave.lactation === 1) {
							slave.rules.lactation = "maintain";
						}
					} else if (slave.rules.lactation === "maintain") {
						milkResult = App.SlaveAssignment.getMilked(slave, 0.25);
						r.push(`${His} duties keep ${him} busy, but ${he}`);
						if (slave.fetish === Fetish.BOOBS) {
							r.push(`eagerly`);
						}
						r.push(`uses milkers whenever ${he} can, giving ${milkResult.milk} liters of milk over the week, which is sold for <span class="yellowgreen"> ${cashFormat(milkResult.milkSale)}.</span>`);
					}

					r.push(App.SlaveAssignment.rewardAndPunishment(slave));
					break;
				case Job.DAIRY:
					if (V.dairyRestraintsSetting > 1) {
						if (slave.devotion < -50) {
							r.push(`is so unhappy that ${he} has little interest in getting off, not that ${he} gets the choice.`);
						} else if (slave.energy <= 20) {
							r.push(`is frigid and has little interest in getting off, not that ${he} gets a choice.`);
						} else {
							r.push(`gets off regardless of ${his} thoughts on the matter.`);
						}
						slave.need = 0;
						if (slave.attrKnown === 0) {
							if (assistantHasSeenSexuality) {
								slave.attrKnown = 1;
								r.push(`${capFirstChar(V.assistant.name)} has been monitoring ${him} arousal in regards to the visual stimulation. It seems ${he} is`);
								r.push(App.EndWeek.Rules.attractionDiscovery(slave));
							}
						}
					} else {
						if (slave.devotion < -50) {
							r.push(`is so unhappy that ${he} has little interest in getting off${(App.Utils.releaseRestricted(slave)) ? `, making the rule restricting ${his} sexual outlets superfluous` : ``}.`);
							slave.need = 0;
						} else if (slave.energy <= 20) {
							r.push(`is frigid and has little interest in getting off${(App.Utils.releaseRestricted(slave)) ? `, making the rule restricting ${his} sexual outlets superfluous` : ``}.`);
							slave.need = 0;
						} else if (slave.need < App.EndWeek.saVars.needCapPerSlave[slave.ID] * 0.5) {
							if (slave.devotion <= 20) {
								r.push(`gets off from being milked despite ${his} reluctance, <span class="hotpink">habituating ${him} to sexual slavery.</span>`);
								slave.devotion += 1;
								if (slave.trust >= -20 && slave.devotion <= 20) {
									r.push(`${He} hates ${himself} for climaxing, and knows the mild aphrodisiacs in the food are forcing ${his} arousal, <span class="gold">frightening ${him}.</span>`);
									slave.trust -= 1;
								}
								slave.need -= 20;
							} else if (release.masturbation === 0) {
								r.push(`gets off from being milked, so being forbidden to masturbate doesn't affect ${him} seriously.`);
								slave.need -= 20;
							} else {
								r.push(`gets off from being milked, so ${he} doesn't feel the need to masturbate frequently.`);
								slave.need -= 20;
							}
						} else {
							r.push(App.SlaveAssignment.nonAssignmentRelease(slave));
						}

						r.push(App.EndWeek.Rules.speechRules(slave));
						let adequateConditions;
						if (slave.devotion <= 20) {
							switch (V.dairyDecoration) {
								case "Degradationist":
									r.push(`The abysmal living conditions <span class="hotpink">force ${him} to get used</span> to the routine of`);
									if (slave.trust > 20) {
										r.push(`slavery and <span class="gold">keep ${him} aware that ${his} fluids are more valuable than ${his} life.</span>`);
										slave.trust -= 3;
									} else {
										r.push(`slavery and <span class="gold">reminds ${him} that ${he} is nothing more than a cow.</span>`);
										slave.trust -= 1;
									}
									slave.devotion += 1;
									break;
								case "Subjugationist":
								case "Supremacist":
									r.push(`The spare living conditions <span class="hotpink">get ${him} used</span> to the routine of`);
									if (slave.trust > 20) {
										r.push(`slavery and <span class="gold">keep ${him} aware of ${his} lowly place.</span>`);
										slave.trust -= 1;
									} else {
										r.push(`slavery.`);
									}
									slave.devotion += 1;
									break;
								case "Arabian Revivalist":
								case "Aztec Revivalist":
								case "Chattel Religionist":
								case "Chinese Revivalist":
								case "Edo Revivalist":
								case "Egyptian Revivalist":
								case "Roman Revivalist":
								case "Neo-Imperialist":
								case "Antebellum Revivalist":
									r.push(`The spare living conditions and daily tasks <span class="hotpink">get ${him} used</span> to the routine of slavery.`);
									slave.devotion += 1;
									break;
								default:
									r.push(`The reasonable living conditions allow ${him} to relax after the days work, or would if ${his}`);
									if (slave.lactation) {
										r.push(`breasts`);
										if (slave.balls) {
											r.push(`and`);
										}
									}
									if (slave.balls) {
										r.push(`balls`);
									}
									r.push(`didn't ache so much, constantly reminding ${him} of ${his} role as a cow.`);
									if (slave.pregKnown && V.dairyPregSetting >= 1 && slave.bellyPreg >= 1500) {
										r.push(`Getting comfortable`);
										let belly;
										if (slave.bellyPreg >= 750000) {
											belly = bellyAdjective(slave);
											r.push(`with a strained, ${belly} stomach ready to burst with contracted calves`);
										} else if (slave.bellyPreg >= 600000) {
											belly = bellyAdjective(slave);
											r.push(`with a constantly quivering ${belly} stomach filled to the brim with contracted calves`);
										} else if (slave.bellyPreg >= 450000) {
											belly = bellyAdjective(slave);
											r.push(`with a ${belly} stomach overstuffed with contracted calves`);
										} else if (slave.bellyPreg >= 150000) {
											r.push(`with the massive bulge of ${his} contract pregnancy`);
										} else if (slave.bellyPreg >= 120000) {
											r.push(`while so enormously pregnant with calves`);
										} else if (slave.bellyPreg >= 10000) {
											r.push(`while so heavily pregnant with`);
											if (slave.pregType > 1) {
												r.push(`contracted children`);
											} else {
												r.push(`a contracted child`);
											}
										} else if (slave.bellyPreg >= 5000) {
											r.push(`with ${his} contract pregnancy`);
										} else {
											r.push(`with the slight bulge of pregnancy`);
										}
										r.push(`also weighs heavily on ${his}`);
										if (slave.bellyPreg >= 120000) {
											r.push(`mind, though ${he} often gets lost in the sensation of being so full of life.`);
										} else {
											r.push(`mind.`);
										}
									}
							}
						} else {
							switch (V.dairyDecoration) {
								case "Degradationist":
									if (slave.trust > 40) {
										r.push(`The abysmal living conditions of ${V.dairyName} <span class="gold">remind ${him} that ${his} fluids are more valuable to you than ${his} life.</span>`);
										slave.trust -= 3;
									} else if (slave.trust > 10) {
										r.push(`The abysmal living conditions of ${V.dairyName} <span class="gold">remind ${him} that ${he} is worthless as a person to you</span> and forces ${him} to accept ${he} is nothing more than a lowly cow.`);
										slave.trust -= 2;
									}
									break;
								case "Subjugationist":
								case "Supremacist":
									if (slave.trust > 40) {
										r.push(`The spare living conditions of ${V.dairyName} <span class="gold">remind ${him} not to get too comfortable</span> with ${his} life.`);
										slave.trust -= 2;
									} else if (slave.trust > 10) {
										r.push(`The spare living conditions of ${V.dairyName} <span class="gold">keep ${him} aware of ${his} place.</span>`);
										slave.trust -= 1;
									}
									break;
								case "Arabian Revivalist":
								case "Aztec Revivalist":
								case "Chattel Religionist":
								case "Chinese Revivalist":
								case "Edo Revivalist":
								case "Egyptian Revivalist":
								case "Roman Revivalist":
									r.push(`The living conditions of ${V.dairyName} might be spare, but they are by no means meant to be uncomfortable.`);
									adequateConditions = 1;
									break;
								case "Antebellum Revivalist":
									r.push(`${He} likes ${his} personal space in ${V.dairyName}'s dormitory, even if it's like a barn stall.`);
									adequateConditions = 1;
									break;
								default:
									r.push(`${He} likes ${his} personal space in ${V.dairyName}'s dormitory, even if it's just a stall.`);
							}
						}
						if (slave.rules.living === "luxurious") {
							r.push(`It provides a <span class="health inc">satisfying rest</span> every time ${he} drifts off to sleep.`);
						} else if (slave.rules.living === "spare") {
							if (slave.devotion > 20) {
								if (adequateConditions) {
									r.push(`They are <span class="health inc">quite relaxing</span>`);
								} else {
									r.push(`They suffice`);
								}
								r.push(`for cows that know their place.`);
							} else {
								if (adequateConditions) {
									r.push(`They could even be considered relaxing if properly appreciated.`);
								} else {
									r.push(`They are just barely sufficient, but only if properly made use of.`);
								}
							}
						} else {
							r.push(`It provides`);
							if (slave.devotion > 20) {
								r.push(`<span class="health inc">more than enough rest</span> for a happy cow looking to unwind.`);
							} else {
								r.push(`<span class="health inc">adequate rest,</span> but only to cows capable of appreciating what they've got.`);
							}
						}

						if (slave.rules.rest === "mandatory") {
							if (slave.devotion <= 20) {
								r.push(`Getting a day off each week <span class="mediumaquamarine">builds feelings of liberty</span> a slave shouldn't have.`);
								slave.trust += 3;
							} else {
								r.push(`${He} appreciates having a weekly day off and takes it as a sign that ${he} has a <span class="mediumaquamarine">caring ${getWrittenTitle(slave)}.</span>`);
								slave.trust += 1;
							}
						} else if (slave.slaveUsedRest) {
							if (slave.rules.rest === "permissive") {
								if (slave.devotion <= 20) {
									r.push(`${He}'s permitted to rest whenever ${he} feels even the slightest bit tired; <span class="mediumaquamarine">a privilege not lost on ${him}.</span>`);
									slave.trust += 2;
								} else {
									r.push(`${He} <span class="hotpink">likes</span> that you <span class="mediumaquamarine">care enough</span> to let ${him} rest when ${he} gets tired.`);
									slave.devotion += 1;
									slave.trust += 1;
								}
							} else if (slave.rules.rest === "restrictive") {
								if (slave.devotion <= -20) {
									r.push(`${He}'s permitted to rest when fatigue sets in, but not enough to shake ${his} tiredness; ${he} feels this <span class="gold">deprivation</span> is intentional.`);
									slave.trust -= 1;
								} else if (slave.devotion <= 20) {
									r.push(`${He}'s permitted to rest when fatigue sets in, and <span class="hotpink">understands</span> this is less for ${his} well-being and more to prevent ${him} from become unproductive.`);
									slave.devotion += 1;
								} else {
									r.push(`${He}'s permitted to rest when fatigue sets in and is <span class="mediumaquamarine">thankful</span> you would allow ${him} the privilege so that ${he} may serve you better.`);
									slave.trust += 1;
								}
							} else if (slave.rules.rest === "cruel") {
								if (slave.devotion <= -20) {
									r.push(`${He}'s <span class="gold">terrified</span> that the only reason ${he} is given any time to rest at all is just to prolong your torment of ${him}.`);
									slave.trust -= 3;
								} else if (slave.devotion <= 20) {
									r.push(`You work ${him} to the bone and only allow ${him} rest when on the verge of collapsing. ${He} <span class="gold">fears</span> this <span class="mediumorchid">cruelty</span> is just the beginning.`);
									slave.trust -= 3;
									slave.devotion -= 3;
								} else {
									r.push(`Only being allowed rest when on the verge of collapsing <span class="mediumorchid">shakes ${his} faith</span> in you a little.`);
									slave.devotion -= 2;
								}
							}
						}

						r.push(App.EndWeek.Rules.consentRules(slave));

						if (slave.attrKnown === 0) {
							if (assistantHasSeenSexuality) {
								slave.attrKnown = 1;
								r.push(`${capFirstChar(V.assistant.name)} has been monitoring ${him} as ${he} gets milked, attempting to gauge ${his} sexuality. It seems ${he} is`);
								r.push(App.EndWeek.Rules.attractionDiscovery(slave));
							}
						}

						r.push(App.SlaveAssignment.rewardAndPunishment(slave));
					}
					break;
				case Job.FARMER:
					slave.need -= L.farmyard * 5;
					if (slave.energy <= 20) {
						r.push(`is frigid and has little interest in getting off${(App.Utils.releaseRestricted(slave)) ? `, making the rule restricting ${his} sexual outlets superfluous` : ``}.`);
						slave.need = 0;
					} else if (slave.need < App.EndWeek.saVars.needCapPerSlave[slave.ID] * 0.5) {
						if (release.masturbation === 0) {
							r.push(`gets off while performing ${his} duties, so being forbidden from masturbation doesn't really bother ${him}.`);
							slave.need -= 20;
						} else {
							r.push(`gets off while performing ${his} duties, so ${he} doesn't feel the need for release that often.`);
							slave.need -= 20;
						}
					} else {
						r.push(App.SlaveAssignment.nonAssignmentRelease(slave));
					}

					r.push(`${He} is <span class="hotpink">very happy</span> with ${his} private room in ${V.farmyardName} and <span class="mediumaquamarine">trusts</span> you a bit more for placing ${him} in charge of it.`);
					slave.devotion += 1;
					slave.trust += 1;

					if (slave.slaveUsedRest) {
						r.push(`${He} is permitted to take short breaks throughout the week to help manage ${his} building exhaustion, though it does restrict impact ${his} effectiveness.`);
					}

					r.push(App.EndWeek.Rules.consentRules(slave));

					if (slave.attrKnown === 0) {
						if (assistantHasSeenSexuality) {
							slave.attrKnown = 1;
							r.push(`${capFirstChar(V.assistant.name)} has been monitoring ${him} as ${he} cares for the cattle, analyzing ${his} preferences. It seems ${he} is`);
							r.push(App.EndWeek.Rules.attractionDiscovery(slave));
						}
					}

					if (slave.rules.lactation === "induce") {
						r.push(`Whenever ${he} finds a free moment from ${his} duties, ${he} spends that time massaging ${his} breasts and working ${his} nipples.`);
						r.push(induceLactation(slave, 2));
						if (slave.lactation === 1) {
							slave.rules.lactation = "maintain";
						}
					} else if (slave.rules.lactation === "maintain") {
						if (V.servantMilkers === 1) {
							milkResult = App.SlaveAssignment.getMilked(slave, 0.25);
							r.push(`${His} duties keep ${him} busy, but ${he}`);
							if (slave.fetish === Fetish.BOOBS) {
								r.push(`eagerly`);
							}
							r.push(`uses the penthouse milkers whenever ${he} can, giving ${milkResult.milk} liters of milk over the week, which is sold for <span class="yellowgreen">${cashFormat(milkResult.milkSale)}.</span>`);
						} else {
							r.push(`Whenever ${he} finds a free moment from ${his} duties, ${he} takes the time to thoroughly milk ${his} breasts to keep ${his} lactation strong for you.`);
							slave.lactationDuration = 2;
							slave.boobs -= slave.boobsMilk;
							slave.boobsMilk = 0;
						}
					}

					r.push(App.SlaveAssignment.rewardAndPunishment(slave));
					break;
				case Job.FARMYARD:
					if (slave.devotion < -50) {
						r.push(`is so unhappy that ${he} has little interest in getting off${(App.Utils.releaseRestricted(slave)) ? `, making the rule restricting ${his} sexual outlets superfluous` : ``}.`);
						slave.need = 0;
					} else if (slave.energy <= 20) {
						r.push(`is frigid and has little interest in getting off${(App.Utils.releaseRestricted(slave)) ? `, making the rule restricting ${his} sexual outlets superfluous` : ``}.`);
						slave.need = 0;
					} else if (slave.need < App.EndWeek.saVars.needCapPerSlave[slave.ID] * 0.5) {
						if (slave.devotion <= 20) {
							r.push(`gets off from working as a farmhand despite ${his} reluctance, <span class="hotpink">habituating ${him} to sexual slavery.</span>`);
							slave.devotion += 1;
							if (slave.trust >= -20 && slave.devotion <= 20) {
								r.push(`${He} hates ${himself} for climaxing, and knows the mild aphrodisiacs in the food are forcing ${his} arousal, <span class="gold">frightening ${him}.</span>`);
								slave.trust -= 1;
							}
							slave.need -= 20;
						} else if (release.masturbation === 0) {
							r.push(`gets off from working as a farmhand, so being forbidden to masturbate doesn't affect ${him} seriously.`);
							slave.need -= 20;
						} else {
							r.push(`gets off from working as a farmhand, so ${he} doesn't feel the need to masturbate frequently.`);
							slave.need -= 20;
						}
					} else {
						r.push(App.SlaveAssignment.nonAssignmentRelease(slave));
					}

					r.push(App.EndWeek.Rules.speechRules(slave));

					if (slave.devotion <= 20) {
						switch (V.farmyardDecoration) {
							case "Degradationist":
								r.push(`The abysmal living conditions <span class="hotpink">force ${him} to get used</span> to the routine of`);
								if (slave.trust > 20) {
									r.push(`slavery and <span class="gold">keep ${him} aware that ${his} work in the fields is more valuable than ${his} life.</span>`);
									slave.trust -= 3;
								} else {
									r.push(`slavery and <span class="gold">reminds ${him} that ${he} is nothing more than a farming tool.</span>`);
									slave.trust -= 1;
								}
								slave.devotion += 1;
								break;
							case "Subjugationist":
							case "Supremacist":
								r.push(`The spare living conditions <span class="hotpink">get ${him} used</span> to the routine of`);
								if (slave.trust > 20) {
									r.push(`slavery and <span class="gold">keep ${him} aware of ${his} lowly place.</span>`);
									slave.trust -= 1;
								} else {
									r.push(`slavery.`);
								}
								slave.devotion += 1;
								break;
							case "Arabian Revivalist":
							case "Aztec Revivalist":
							case "Chattel Religionist":
							case "Chinese Revivalist":
							case "Edo Revivalist":
							case "Egyptian Revivalist":
							case "Neo-Imperialist":
							case "Antebellum Revivalist":
								r.push(`The spare living conditions and daily tasks <span class="hotpink">get ${him} used</span> to the routine of slavery.`);
								slave.devotion += 1;
								break;
							case "Roman Revivalist":
								r.push(`${He} is <span class="hotpink">pleased</span> with ${his} cushy living arrangements, and <span class="mediumaquamarine">trusts you more</span> for it.`);
								slave.devotion += 2;
								slave.trust += 2;
								break;
							default:
								r.push(`The reasonable living conditions allow ${him} to relax after the days work.`);
								if (slave.pregKnown && V.farmyardPregSetting >= 1 && slave.bellyPreg >= 1500) {
									r.push(`Getting comfortable`);
									let belly;
									if (slave.bellyPreg >= 750000) {
										belly = bellyAdjective(slave);
										r.push(`with a strained, ${belly} stomach ready to burst`);
									} else if (slave.bellyPreg >= 600000) {
										belly = bellyAdjective(slave);
										r.push(`with a constantly quivering ${belly} stomach filled to the brim`);
									} else if (slave.bellyPreg >= 450000) {
										belly = bellyAdjective(slave);
										r.push(`with a ${belly} stomach overstuffed`);
									} else if (slave.bellyPreg >= 150000) {
										r.push(`with the massive bulge of ${his} pregnancy`);
									} else if (slave.bellyPreg >= 120000) {
										r.push(`while so enormously pregnant`);
									} else if (slave.bellyPreg >= 10000) {
										r.push(`while so heavily pregnant with`);
										if (slave.pregType > 1) {
											r.push(`children`);
										} else {
											r.push(`a child`);
										}
									} else if (slave.bellyPreg >= 5000) {
										r.push(`with ${his} pregnancy`);
									} else {
										r.push(`with the slight bulge of pregnancy`);
									}
									r.push(`also weighs heavily on ${his}`);
									if (slave.bellyPreg >= 120000) {
										r.push(`mind, though ${he} often gets lost in the sensation of being so full of life.`);
									} else {
										r.push(`mind.`);
									}
								}
						}
					} else {
						switch (V.farmyardDecoration) {
							case "Degradationist":
								if (slave.trust > 40) {
									r.push(`The abysmal living conditions of ${V.farmyardName} <span class="gold">remind ${him} that ${his} work in the fields is more valuable to you than ${his} life.</span>`);
									slave.trust -= 3;
								} else if (slave.trust > 10) {
									r.push(`The abysmal living conditions of ${V.farmyardName} <span class="gold">remind ${him} that ${he} is worthless as a person to you</span> and forces ${him} to accept ${he} is nothing more than a lowly farmhand.`);
									slave.trust -= 2;
								}
								break;
							case "Subjugationist":
							case "Supremacist":
								if (slave.trust > 40) {
									r.push(`The spare living conditions of ${V.farmyardName} <span class="gold">remind ${him} not to get too comfortable</span> with ${his} life.`);
									slave.trust -= 2;
								} else if (slave.trust > 10) {
									r.push(`The spare living conditions of ${V.farmyardName} <span class="gold">keep ${him} aware of ${his} place.</span>`);
									slave.trust -= 1;
								}
								break;
							case "Arabian Revivalist":
							case "Aztec Revivalist":
							case "Chattel Religionist":
							case "Chinese Revivalist":
							case "Edo Revivalist":
							case "Egyptian Revivalist":
							case "Neo-Imperialist":
								r.push(`The living conditions of ${V.farmyardName} might be spare, but they are by no means meant to be uncomfortable.`);
								break;
							case "Roman Revivalist":
								r.push(`${He} is <span class="hotpink">very happy</span> about ${his} cushy living arrangements, and <span class="mediumaquamarine">trusts you all the more</span> for it.`);
								slave.devotion += 2;
								slave.trust += 2;
								break;
							case "Antebellum Revivalist":
								r.push(`The living conditions of ${V.farmyardName}'s slave houses are undeniably spare, but they are not especially uncomfortable.`);
								break;
							default:
								r.push(`${He} likes ${his} personal space in ${V.farmyardName}'s dormitory, even if it's just a small room.`);
						}
					}

					r.push(App.EndWeek.Rules.consentRules(slave));

					if (slave.attrKnown === 0) {
						if (assistantHasSeenSexuality) {
							slave.attrKnown = 1;
							r.push(`${capFirstChar(V.assistant.name)} has been monitoring ${him} as ${he} works with the crops and animals, attempting to gauge ${his} sexuality. It seems ${he} is`);
							r.push(App.EndWeek.Rules.attractionDiscovery(slave));
						}
					}

					if (slave.rules.lactation === "induce") {
						r.push(`${He} carries out ${his} daily tasks with a pair of automatic breast pumps attached to ${his} chest to help bring in ${his} lactation.`);
						r.push(induceLactation(slave, 6));
						if (slave.lactation === 1) {
							slave.rules.lactation = "maintain";
						}
					} else if (slave.rules.lactation === "maintain") {
						r.push(`${He} carries out ${his} daily tasks with a pair of automatic breast pumps attached to ${his} chest to keep ${him} productive and drained.`);
						slave.lactationDuration = 2;
						slave.boobs -= slave.boobsMilk;
						slave.boobsMilk = 0;
					}

					r.push(App.SlaveAssignment.rewardAndPunishment(slave));
					break;
				case Job.CONCUBINE:
					if (slave.energy <= 20) {
						r.push(`is frigid and has little interest in getting off allowing ${him} to focus on getting you off.`);
						slave.need = 0;
					} else {
						r.push(`gets more of your attention each day than any other slave, leaving ${him} thoroughly satisfied.`);
						slave.need = 0;
					}

					/*
					FIXME mirror
					if (V.masterSuiteUpgradeLuxury > 0) {
						S.Concubine.devotion += 4;
						S.Concubine.trust += 4;
					} else {
						S.Concubine.devotion += 2;
						S.Concubine.trust += 2;
					}
					*/

					if (slave.attrKnown === 0) {
						if (assistantHasSeenSexuality) {
							slave.attrKnown = 1;
							r.push(`${capFirstChar(V.assistant.name)} has been monitoring ${him} as ${he} amuses ${himself}, analyzing ${his} tastes. It seems ${he} is`);
							r.push(App.EndWeek.Rules.attractionDiscovery(slave));
						}
					}

					if (slave.rules.lactation === "induce") {
						r.push(`${He} spends ${his} time away from you fervently working to induce lactation, eager to enjoy it with you.`);
						r.push(induceLactation(slave, 9));
						if (slave.lactation === 1) {
							slave.rules.lactation = "maintain";
						}
					} else if (slave.rules.lactation === "maintain") {
						r.push(`${He} doesn't need to do anything to maintain ${his} lactation as you personally see to it each night.`);
						slave.lactationDuration = 2;
						slave.boobs -= slave.boobsMilk;
						slave.boobsMilk = 0;
					}

					r.push(App.SlaveAssignment.rewardAndPunishment(slave));
					break;
				case Job.MASTERSUITE:
					if (slave.devotion < -50) {
						r.push(`is so unhappy that ${he} has little interest in getting off.`);
						slave.need = 0;
					} else if (slave.energy <= 20) {
						r.push(`is frigid and has little interest in getting off.`);
						slave.need = 0;
					} else if (V.masterSuiteUpgradeLuxury === 2 && L.masterSuite > 3) {
						r.push(`never goes unsatisfied with all the action in the fuckpit.`);
						slave.need -= 80;
					} else if (slave.need < App.EndWeek.saVars.needCapPerSlave[slave.ID] * 0.5) {
						if (slave.devotion <= 20) {
							r.push(`gets off regularly despite ${his} reluctance, <span class="hotpink">habituating ${him} to sexual slavery.</span>`);
							slave.devotion += 1;
							if (slave.trust >= -20 && slave.devotion <= 20) {
								r.push(`${He} hates ${himself} for climaxing, and knows the mild aphrodisiacs in the food are forcing ${his} arousal, <span class="gold">frightening ${him}.</span>`);
								slave.trust -= 1;
							}
							slave.need -= 20;
						} else if (release.masturbation === 0) {
							r.push(`gets off regularly, so being forbidden to masturbate doesn't affect ${him} seriously.`);
							slave.need -= 20;
						} else {
							r.push(`gets off regularly, so ${he} doesn't feel the need to seek relief.`);
							slave.need -= 20;
						}
					} else {
						if (slave.devotion <= 20) {
							r.push(`sometimes needs a little extra attention from you, <span class="hotpink">habituating ${him} to sexual slavery.</span>`);
							slave.devotion += 1;
							if (slave.trust >= -20 && slave.devotion <= 20) {
								r.push(`${He} hates ${himself} for climaxing to your touch, and knows the mild aphrodisiacs in the food are forcing ${his} arousal, <span class="gold">frightening ${him}.</span>`);
								slave.trust -= 1;
							}
							slave.need -= 40;
						} else {
							r.push(`sometimes needs a little extra sexual attention, not that you mind giving it to ${him}.`);
							slave.need -= 40;
						}
					}

					r.push(App.EndWeek.Rules.speechRules(slave));

					/*
					FIXME mirror
					if (V.masterSuiteUpgradeLuxury === 1) {
						if (slave.devotion <= 95) {
							slave.devotion += 2;
						}
						if (slave.trust < 60) {
							slave.trust++;
						}
					} else if (V.masterSuiteUpgradeLuxury === 2) {
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
					*/

					if (slave.attrKnown === 0) {
						if (assistantHasSeenSexuality) {
							slave.attrKnown = 1;
							r.push(`${capFirstChar(V.assistant.name)} has been monitoring ${him} as ${he} gets off, analyzing ${his} sexuality. It seems ${he} is`);
							r.push(App.EndWeek.Rules.attractionDiscovery(slave));
						}
					}

					if (slave.rules.lactation === "induce") {
						r.push(`When you have the free time, you massage ${his} breasts and work ${his} nipples in an effort to bring in ${his} lactation.`);
						r.push(induceLactation(slave, 2));
						if (slave.lactation === 1) {
							slave.rules.lactation = "maintain";
						}
					} else if (slave.rules.lactation === "maintain") {
						if (slave.devotion > 20) {
							if (slave.fetish === Fetish.BOOBS) {
								r.push(`${He} puts ${his} breasts to work when you humor ${his} tastes, easily keeping ${his} lactation from diminishing.`);
							} else {
								r.push(`You find ways to put ${his} milk to good use, and when you can't, see to it yourself that ${he} is kept drained and comfortable.`);
							}
						} else if (slave.devotion >= -20) {
							if (slave.fetish === Fetish.BOOBS) {
								r.push(`${He} responds positively to breast play in bed, assuring ${his} milk production isn't going anywhere.`);
							} else {
								r.push(`You focus on ${his} breasts during foreplay to make sure ${he} keeps producing milk for you.`);
							}
						} else {
							r.push(`You make sure to see to it that ${he} keeps on lactating.`);
						}
						slave.lactationDuration = 2;
						slave.boobs -= slave.boobsMilk;
						slave.boobsMilk = 0;
					}

					r.push(App.SlaveAssignment.rewardAndPunishment(slave));
					break;
				case Job.HEADGIRLSUITE:
					if (slave.devotion < -50) {
						r.push(`is so unhappy that ${he} has little interest in getting off, not that ${S.HeadGirl.slaveName} cares.`);
						slave.need = 0;
					} else if (slave.energy <= 20) {
						r.push(`is frigid and has little interest in getting off, though it doesn't stop ${S.HeadGirl.slaveName}.`);
						slave.need = 0;
					} else if (slave.need < App.EndWeek.saVars.needCapPerSlave[slave.ID] * 0.5) {
						if (slave.devotion <= 20) {
							r.push(`gets off with ${S.HeadGirl.slaveName} despite ${his} reluctance, <span class="hotpink">habituating ${him} to sexual slavery.</span>`);
							slave.devotion += 1;
							if (slave.trust >= -20 && slave.devotion <= 20) {
								r.push(`${He} hates ${himself} for climaxing, and knows the mild aphrodisiacs in the food are forcing ${his} arousal, <span class="gold">frightening ${him}.</span>`);
								slave.trust -= 1;
							}
							slave.need -= 20;
						} else if (release.masturbation === 0) {
							r.push(`gets off with ${S.HeadGirl.slaveName}, so being forbidden to masturbate doesn't affect ${him} seriously.`);
							slave.need -= 20;
						} else {
							r.push(`gets off with ${S.HeadGirl.slaveName}, so ${he} doesn't feel the need for release that often.`);
							slave.need -= 20;
						}
					} else {
						r.push(`either gets off with ${S.HeadGirl.slaveName} or gets to put up with sexual frustration.`);
					}

					r.push(App.EndWeek.Rules.speechRules(slave));

					if (slave.devotion <= 20) {
						r.push(`${He} shares a room, and sometimes bed, with ${S.HeadGirl.slaveName}. Your Head Girl keeps it from going to ${his} head, however.`);
					} else {
						r.push(`${He} loves sharing a room, and sometimes bed, with ${S.HeadGirl.slaveName}.`);
					}

					if (slave.attrKnown === 0) {
						if (assistantHasSeenSexuality) {
							slave.attrKnown = 1;
							r.push(`${capFirstChar(V.assistant.name)} has been monitoring ${him} as ${he} spends time with your Head Girl, analyzing ${his} sexuality. It seems ${he} is`);
							r.push(App.EndWeek.Rules.attractionDiscovery(slave));
						}
					}

					if (slave.rules.lactation === "induce") {
						if (S.HeadGirl.fetish === Fetish.BOOBS) {
							r.push(`Your Head Girl enjoys playing with ${his} tits, making it an inevitability that ${he}'ll begin lactating.`);
						} else {
							r.push(`${He} carries out ${his} daily tasks with a pair of automatic breast pumps attached to ${his} chest to help bring in ${his} lactation.`);
						}
						r.push(induceLactation(slave, 4));
						if (slave.lactation === 1) {
							slave.rules.lactation = "maintain";
						}
					} else if (slave.rules.lactation === "maintain") {
						if (S.HeadGirl.fetish === Fetish.BOOBS) {
							r.push(`Your Head Girl enjoys playing with ${his} tits, thoroughly draining ${him} of milk and encouraging ${his} continued lactation.`);
						} else {
							r.push(`${He} utilizes ${his} lactation as your Head Girl demands, and if it should not be needed, spends the evenings with a pair of automatic breast pumps.`);
						}
						slave.lactationDuration = 2;
						slave.boobs -= slave.boobsMilk;
						slave.boobsMilk = 0;
					}

					r.push(App.SlaveAssignment.rewardAndPunishment(slave));
					break;
				default:
					if (slave.devotion < -50) {
						r.push(`is so unhappy that ${he} has little interest in getting off${(App.Utils.releaseRestricted(slave)) ? `, making the rule restricting ${his} sexual outlets superfluous` : ``}.`);
						slave.need = 0;
					} else if (slave.energy <= 20) {
						r.push(`is frigid and has little interest in getting off${(App.Utils.releaseRestricted(slave)) ? `, making the rule restricting ${his} sexual outlets superfluous` : ``}.`);
						slave.need = 0;
					} else if (slave.need < App.EndWeek.saVars.needCapPerSlave[slave.ID] * 0.5) {
						if (slave.devotion <= 20) {
							r.push(`gets off at work despite ${his} reluctance, <span class="hotpink">habituating ${him} to sexual slavery.</span>`);
							slave.devotion += 1;
							if (slave.trust >= -20 && slave.devotion <= 20) {
								r.push(`${He} hates ${himself} for climaxing, and knows the mild aphrodisiacs in the food are forcing ${his} arousal, <span class="gold">frightening ${him}.</span>`);
								slave.trust -= 1;
							}
						} else if (release.masturbation === 0) {
							r.push(`gets off at work, so being forbidden to masturbate doesn't affect ${him} seriously.`);
						} else {
							r.push(`gets off at work, so ${he} doesn't feel the need to masturbate frequently.`);
						}
						slave.need -= 20;
					} else {
						// allowed to get off with other slaves, but not given a specific subslave...try to use the shared ones before going further
						if (release.slaves === 1 && slave.assignment !== Job.SUBORDINATE && !App.EndWeek.saVars.subSlaveMap.get(slave.ID)) {
							slave.need -= Math.min(50 * App.EndWeek.saVars.subSlaveRatio, slave.need);
							r.push(`often uses the penthouse subordinate slaves to satisfy ${his}`);
							if (slave.need > 0) {
								r.push(`sexual need, but it's just not enough; ${he}`);
							} else {
								r.push(`sexual need.`);
							}
						}
						if (slave.need > 0) {
							r.push(App.SlaveAssignment.nonAssignmentRelease(slave));
						}
					}

					r.push(App.EndWeek.Rules.speechRules(slave));

					if (slave.assignment !== Job.HEADGIRL && slave.assignment !== Job.BODYGUARD) {
						if (V.roomsPopulation > V.rooms) {
							if (slave.rules.living === "luxurious") {
								r.push(`There are <span class="yellow">too many slaves for the penthouse's individual rooms,</span> so ${he} moves out into the dormitory.`);
								slave.rules.living = "normal";
								penthouseCensus();
							}
						}
					}

					if (slave.devotion <= 20) {
						if (slave.rules.living === "spare") {
							r.push(`The spare living conditions <span class="hotpink">get ${him} used</span> to the routine of`);
							if (slave.trust > 20) {
								r.push(`slavery and <span class="gold">keep ${him} aware of ${his} lowly place.</span>`);
								slave.trust -= 1;
							} else {
								r.push(`slavery.`);
							}
							slave.devotion += 1;
						} else if (slave.rules.living === "normal") {
							r.push(`The reasonable living conditions allow ${him} to <span class="mediumaquamarine">feel self-reliant.</span>`);
							slave.trust += 1;
						} else {
							r.push(`The luxurious living conditions encourage ${him} to <span class="mediumaquamarine">feel respectable.</span>`);
							slave.trust += 2;
						}
					} else {
						if (slave.ID === V.HeadGirlID && V.HGSuite === 1) {
							r.push(`${He} is <span class="hotpink">very happy</span> with ${his} suite and <span class="mediumaquamarine">trusts</span> you a bit more for providing it.`);
							slave.devotion += 1;
							slave.trust += 1;
						} else if (slave.ID === V.BodyguardID && V.dojo <= 1) {
							r.push(`${He} rarely leaves your company enough to make use of ${his} living area.`);
						} else if (slave.rules.living === "luxurious") {
							r.push(`${He} is <span class="hotpink">very happy</span> with ${his} little room and <span class="mediumaquamarine">trusts</span> you a bit more for providing it.`);
							slave.devotion += 1;
							slave.trust += 1;
						} else if (slave.rules.living === "normal") {
							r.push(`${He} likes ${his} personal space in the dormitory.`);
						} else if (slave.trust > 40) {
							r.push(`The spare living conditions <span class="gold">remind ${him} not to get too comfortable</span> with ${his} life.`);
							slave.trust -= 2;
						} else if (slave.trust > 10) {
							r.push(`The spare living conditions <span class="gold">keep ${him} aware of ${his} place.</span>`);
							slave.trust -= 1;
						} else {
							r.push(`${He}'s used to having only the bare minimum in terms of living conditions, so ${he}'s not bothered by them.`);
						}
					}
					if ([Job.HOUSE, Job.MILKED, Job.FUCKTOY, Job.PUBLIC, Job.WHORE, Job.FARMYARD, Job.GLORYHOLE].includes(slave.assignment)) {
						if (slave.rules.living === "luxurious") {
							if (slave.devotion <= 20) {
								r.push(`They provide`);
							} else {
								r.push(`It provides a`);
							}
							r.push(`<span class="health inc">satisfying rest</span> every time ${he} drifts off to sleep.`);
						} else if (slave.rules.living === "spare") {
							if (slave.devotion > 20 && slave.trust <= 10) {
								r.push(`They don't provide much rest, however.`);
							} else {
								r.push(`They provide meager rest, if anything, however.`);
							}
						} else {
							if (slave.devotion <= 20) {
								r.push(`They provide`);
							} else {
								r.push(`It provides`);
							}
							if (slave.devotion > 20) {
								r.push(`<span class="health inc">adequate rest</span> for a ${girl} that knows how to manage ${his} time.`);
							} else {
								r.push(`<span class="health inc">adequate rest,</span> but not enough for a slave lacking time management.`);
							}
						}
					}

					if (slave.rules.living !== "luxurious") {
						if (V.dormitoryPopulation > V.dormitory) {
							const dormPop = V.dormitoryPopulation - V.dormitory;
							r.push(`The slave dormitory is`);
							if (dormPop <= 5) {
								r.push(`<span class="yellow">somewhat overcrowded.</span> The mild inconvenience`);
								if (slave.trust > 20) {
									r.push(`<span class="gold">reduces ${his} trust</span> in you a little.`);
									slave.trust -= 2;
								} else {
									r.push(`<span class="mediumorchid">lowers you</span> a little in ${his} opinion.`);
									slave.devotion -= 2;
								}
							} else if (dormPop <= 10) {
								r.push(`<span class="yellow">badly overcrowded.</span> The constant difficulties`);
								if (slave.trust > 20) {
									r.push(`<span class="gold">reduces ${his} trust</span> in you`);
									slave.trust -= 3;
								} else {
									r.push(`<span class="mediumorchid">lowers you</span> in ${his} opinion`);
									slave.devotion -= 3;
								}
								r.push(`and is <span class="health dec">not good for ${him},</span> since it's difficult to rest there.`);
								healthDamage(slave, 2);
							} else {
								r.push(`<span class="yellow">extremely overcrowded.</span> The unpleasant situation`);
								if (slave.trust > 20) {
									r.push(`seriously <span class="gold">reduces ${his} trust</span> in you`);
									slave.trust -= 5;
								} else {
									r.push(`seriously <span class="mediumorchid">lowers you</span> in ${his} opinion`);
									slave.devotion -= 5;
								}
								r.push(`and is <span class="health dec">bad for ${his} health.</span>`);
								healthDamage(slave, 4);
							}
						}
					}

					if ([Job.HOUSE, Job.MILKED, Job.FUCKTOY, Job.PUBLIC, Job.WHORE, Job.GLORYHOLE].includes(slave.assignment)) {
						if (slave.rules.rest === "mandatory") {
							if (slave.devotion <= 20) {
								r.push(`Getting a day off each week <span class="mediumaquamarine">builds feelings of liberty</span> a slave shouldn't have.`);
								slave.trust += 3;
							} else {
								r.push(`${He} appreciates having a weekly day off and takes it as a sign that ${he} has a <span class="mediumaquamarine">caring ${getWrittenTitle(slave)}.</span>`);
								slave.trust += 1;
							}
						} else if (slave.slaveUsedRest) {
							if (slave.rules.rest === "permissive") {
								if (slave.devotion <= 20) {
									r.push(`${He}'s permitted to rest whenever ${he} feels even the slightest bit tired; <span class="mediumaquamarine">a privilege not lost on ${him}.</span>`);
									slave.trust += 2;
								} else {
									r.push(`${He} <span class="hotpink">likes</span> that you <span class="mediumaquamarine">care enough</span> to let ${him} rest when ${he} gets tired.`);
									slave.devotion += 1;
									slave.trust += 1;
								}
							} else if (slave.rules.rest === "restrictive") {
								if (slave.devotion <= -20) {
									r.push(`${He}'s permitted to rest when fatigue sets in, but not enough to shake ${his} tiredness; ${he} feels this <span class="gold">deprivation</span> is intentional.`);
									slave.trust -= 1;
								} else if (slave.devotion <= 20) {
									r.push(`${He}'s permitted to rest when fatigue sets in, and <span class="hotpink">understands</span> this is less for ${his} well-being and more to prevent ${him} from become unproductive.`);
									slave.devotion += 1;
								} else {
									r.push(`${He}'s permitted to rest when fatigue sets in and is <span class="mediumaquamarine">thankful</span> you would allow ${him} the privilege so that ${he} may serve you better.`);
									slave.trust += 1;
								}
							} else if (slave.rules.rest === "cruel") {
								if (slave.devotion <= -20) {
									r.push(`${He}'s <span class="gold">terrified</span> that the only reason ${he} is given any time to rest at all is just to prolong your torment of ${him}.`);
									slave.trust -= 3;
								} else if (slave.devotion <= 20) {
									r.push(`You work ${him} to the bone and only allow ${him} rest when on the verge of collapsing. ${He} <span class="gold">fears</span> this <span class="mediumorchid">cruelty</span> is just the beginning.`);
									slave.trust -= 3;
									slave.devotion -= 3;
								} else {
									r.push(`Only being allowed rest when on the verge of collapsing <span class="mediumorchid">shakes ${his} faith</span> in you a little.`);
									slave.devotion -= 2;
								}
							}
						}
					}

					r.push(App.EndWeek.Rules.consentRules(slave));

					if (slave.attrKnown === 0) {
						if (assistantHasSeenSexuality) {
							slave.attrKnown = 1;
							r.push(`${capFirstChar(V.assistant.name)} has been monitoring ${him} as ${he} gets off, analyzing ${his} sexuality. It seems ${he} is`);
							r.push(App.EndWeek.Rules.attractionDiscovery(slave));
						}
					}

					if (slave.rules.lactation === "induce") {
						if (canHold(slave)) {
							r.push(`${He} is required to vigorously massage ${his} breasts and nipples in an effort to induce lactation.`);
						} else {
							r.push(`${He} spends ${his} nights with a pair of automatic breast pumps attached to ${his} chest in order to bring in ${his} lactation.`);
						}
						r.push(induceLactation(slave, 4));
						if (slave.lactation === 1) {
							slave.rules.lactation = "maintain";
						}
					} else if (slave.rules.lactation === "maintain" && (V.servantMilkers !== 1 || !App.Data.misc.servantMilkersJobs.includes(slave.assignment))) {
						r.push(`${He} utilizes ${his} lactation during ${his} daily tasks as needed, and when ${he} isn't drained well enough, spends the evenings with a pair of automatic breast pumps.`);
						slave.lactationDuration = 2;
						slave.boobs -= slave.boobsMilk;
						slave.boobsMilk = 0;
					}

					r.push(App.SlaveAssignment.rewardAndPunishment(slave));
			}
		}
	}
	App.Events.addNode(el, r);
	return el;
};
