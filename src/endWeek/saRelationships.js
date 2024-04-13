// cSpell:ignore ebond, eslut

/**
 * @param {FC.ReportSlave} slave
 * @returns {string}
 */
App.SlaveAssignment.relationships = function saRelationships(slave) {
	/** @type {string[]} */
	const r = [];

	const {
		he, him, his, himself, He, His, wife, woman
	} = getPronouns(slave);
	const playerPronouns = getPronouns(V.PC);

	if (slave.fuckdoll === 0) {
		if (slave.relationship > 0) {
			sanityCheck(slave);
		}
		if (slave.relationship === 0 && slave.fetish !== Fetish.MINDBROKEN) {
			generateRelationship(slave);
		} else if (slave.relationship !== 0) {
			existingRelationship(slave);
			if (slave.relationship > 2) {
				consummateRelationship(slave);
			}
		}
		if (slave.fetish !== Fetish.MINDBROKEN && totalRelatives(slave) > 0) {
			familyFeelings(slave);
		}
	}

	return r.join(" ");

	/** Can this slave possibly be a friend?
	 * @param {FC.ReportSlave} slave
	 * @param {App.Entity.SlaveState} potentialFriend
	 * @returns {boolean}
	 */
	function canStartFriendship(slave, potentialFriend) {
		// don't try to strike up a friendship with someone from a gender you hate
		if (slave.behavioralFlaw === BehavioralFlaw.HATESMEN && perceivedGender(potentialFriend) < -1) {
			return false;
		} else if (slave.behavioralFlaw === BehavioralFlaw.HATESWOMEN && perceivedGender(potentialFriend) > 1) {
			return false;
		}
		// has to be accessible, not a rival, and not already taken
		return (potentialFriend.relationship === 0 && slave.rivalryTarget !== potentialFriend.ID && potentialFriend.ID !== slave.ID && potentialFriend.fetish !== Fetish.MINDBROKEN && potentialFriend.fuckdoll === 0 && isSlaveAvailable(potentialFriend));
	}

	/** Does the facility head accept her advances?
	 * @param {App.Entity.SlaveState} potentialFriend
	 * @param {number} manipulationSkill
	 * @returns {boolean}
	 */
	function silverTongue(potentialFriend, manipulationSkill) {
		return manipulationSkill > (random(1, 100 + ((potentialFriend.intelligence + potentialFriend.intelligenceImplant) / 10)));
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.Entity.SlaveState} friend
	 * @param {FC.RelationShipKind} degree
	 */
	function startFriendship(slave, friend, degree) {
		friend.relationship = degree;
		friend.relationshipTarget = slave.ID;
		slave.relationship = degree;
		slave.relationshipTarget = friend.ID;
	}

	/**
	 * @param {FC.ReportSlave} slave
	 */
	function bondEmotionally(slave) {
		r.push(`and persistently interprets sex in the most romantic possible terms, ${he} has decided that ${he} wants to be yours in ${his} heart as well as ${his}`);
		if (slave.vagina > 0) {
			r.push(`pussy.`);
		} else if (slave.anus > 0) {
			r.push(`butthole.`);
		} else {
			r.push(`mouth.`);
		}
		r.push(`<span class="relationship">${He}'s become emotionally bonded to you!</span>`);
		slave.relationship = -2;
	}

	/**
	 * @param {FC.ReportSlave} slave
	 * @param {FC.SlaveState} friend
	 */
	function forcedApartReaction(slave, friend) {
		if (slave.devotion <= 50 && friend.devotion <= 50) {
			r.push(`${slave.slaveName} and ${friend.slaveName} both <span class="devotion dec">resent</span> this.`);
			slave.devotion -= 2;
			friend.devotion -= 2;
		} else if (slave.devotion <= 50) {
			r.push(`${slave.slaveName} <span class="devotion dec">resents</span> this.`);
			slave.devotion -= 2;
		} else if (friend.devotion <= 50) {
			r.push(`${friend.slaveName} <span class="devotion dec">resents</span> this.`);
			friend.devotion -= 2;
		}
	}

	/**
	 * @param {FC.ReportSlave} slave
	 */
	function generateRelationship(slave) {
		let randomSeed;

		if (slave.devotion + slave.trust > 175 && random(1, 3) === 1) { // player + emotional slut
			r.push(`${slave.slaveName} is quite devoted to you, and trusts both you and ${his} place as a slave. Since ${he} does not have a strong relationship with another slave,`);
			if (slave.sexualQuirk === SexualQuirk.ROMANTIC) {
				bondEmotionally(slave);
			} else if (slave.assignment === Job.CONCUBINE) {
				r.push(`and is your concubine, ${he} almost inevitably comes to view you as much as a lover as an owner. <span class="relationship">${He}'s become emotionally bonded to you!</span>`);
				slave.relationship = -2;
			} else if (V.masterSuiteUpgradeLuxury === 2 && slave.assignment === Job.MASTERSUITE) {
				r.push(`and does nothing but eat, sleep, and make love to your other fucktoys, ${he} slowly loses sight of any distinction between emotional attachment and sexual congress. <span class="relationship">${He}'s become an emotional slut!</span>`);
				slave.relationship = -1;
			} else if (slave.assignment === Job.FUCKTOY || slave.assignment === Job.MASTERSUITE) {
				r.push(`and spends ${his} days worshipping your`);
				if (V.PC.dick !== 0) {
					r.push(`cock${V.PC.vagina !== -1 ? " and" : ","}`);
				}
				if (V.PC.vagina !== -1) {
					r.push(`cunt,`);
				}
				r.push(`${he} begins to focus more and more of ${his} happiness on how happy you are. <span class="relationship">${He}'s become emotionally bonded to you!</span>`);
				slave.relationship = -2;
			} else if (slave.assignment === Job.PUBLIC || slave.assignment === Job.CLUB) {
				r.push(`and ${his} life is an endless stream of lovers, ${he} unconsciously loses any sense of emotional attachment outside the intimacy of sex. <span class="relationship">${He}'s become an emotional slut!</span>`);
				slave.relationship = -1;
			} else if (slave.energy > 95 && (slave.counter.anal + slave.counter.vaginal + slave.counter.oral + slave.counter.mammary + slave.counter.penetrative > ((V.week - slave.weekAcquired) * random(20, 30)))) {
				r.push(`is a total sex addict, and has a spectacularly promiscuous sexual history, ${he} begins to think of sex as ${his} only meaningful emotional connection with people. <span class="relationship">${He}'s become an emotional slut!</span>`);
				slave.relationship = -1;
			} else {
				r.push(`and loves you, ${he} begins to think of you as a ${woman} might think of ${his} lover — or spouse. ${He} knows ${he} cannot hope for more of a relationship with you than ${he} has, but ${he} finds emotional support in serving you nonetheless. <span class="relationship">${He}'s become emotionally bonded to you!</span>`);
				slave.relationship = -2;
			}
		} else if (slave.career === "a Futanari Sister" && slave.rules.relationship === "permissive") {
			const potentialFriend = V.slaves.find((s) => s.career === "a Futanari Sister" && s.rules.relationship === "permissive" && canStartFriendship(slave, s));
			if (potentialFriend !== undefined) {
				r.push(`${slave.slaveName} greets ${potentialFriend.slaveName} with joy. It's not clear whether they ever knew each other during their lives as Futanari Sisters, but it seems that they believe themselves to be in a relationship by simple virtue of having been Sisters. In any case, ${slave.slaveName} and ${potentialFriend.slaveName} <span class="relationship">become inseparable lovers</span> instantly, as though there's no possibility they would do anything else. They're even surprised when other slaves ask them about it; it's as though they're unaware that other possibilities even exist.`);
				startFriendship(slave, potentialFriend, 4);
			}
		} else if (slave.origin === "You were acquainted with $him before you were an arcology owner; your rival tried to use $him to manipulate you, but you rescued $him." && V.rival.duration > 20 && !["Intellectual Dependency", "Paternalism", "Racial Supremacism", "Slave Professionalism"].includes(V.rival.FS.name) && slave.newGamePlus === 0) {
			const potentialFriend = V.slaves.find((s) => (s.prestigeDesc === "You bankrupted and enslaved $him in revenge for $his part in the attack on your arcology by the Daughters of Liberty." && s.fuckdoll === 0 && s.fetish !== Fetish.MINDBROKEN && s.newGamePlus === 0));
			if (potentialFriend !== undefined) {
				r.push(`${slave.slaveName} greets ${potentialFriend.slaveName} with joy, happy to see a familiar face again. Without any regard to you, <span class="relationship">they continue their prior relationship.</span>`);
				if (potentialFriend.relationship > 0) { // remove me with multi-friend system
					const formerFriend = getSlave(potentialFriend.relationshipTarget);
					if (formerFriend !== undefined) {
						formerFriend.relationshipTarget = 0;
						formerFriend.relationship = 0;
					}
				}
				startFriendship(slave, potentialFriend, 4);
			}
		} else if (slave.rules.relationship !== "restrictive") {
			if (slave.trust > -90) { // used to be devotion > -90. Why a slave hating you wouldn't try to make friends with others that hate you doesn't make sense. Almost tempted to raise it to -50.
				if (slave.behavioralFlaw === BehavioralFlaw.NONE || (slave.intelligence + slave.intelligenceImplant > 50)) {
					randomSeed = random(1, 100);
				} else {
					randomSeed = random(1, 80);
				}
				const manipulationSkill = (slave.devotion + slave.trust + ((slave.intelligence + slave.intelligenceImplant) / 10)); // intended for defiant slaves to ingrain themselves with facility heads
				if (randomSeed > 75) {
					let resentment = 0;
					for (const potentialFriend of V.slaves) {
						if (canStartFriendship(slave, potentialFriend) && potentialFriend.assignment !== Job.CONFINEMENT) {
							const {him2, He2} = getPronouns(potentialFriend).appendSuffix("2");
							if (potentialFriend.ID === V.MadamID && slave.assignment === Job.BROTHEL) {
								if (potentialFriend.rules.relationship !== "restrictive" && silverTongue(potentialFriend, manipulationSkill)) {
									r.push(`${slave.slaveName} manages to ingratiate ${himself} with the Madam, ${potentialFriend.slaveName}. The two slaves have <span class="relationship">struck up a friendship.</span>`);
									startFriendship(slave, potentialFriend, 1);
									break;
								} else {
									if (slave.devotion < -20) {
										r.push(`${slave.slaveName} tries to strike up a friendship with the Madam, ${potentialFriend.slaveName}, and is <span class="trust dec">punished</span> by ${him2} for disrespect.`);
										slave.trust -= 4;
									}
								}
							} else if (potentialFriend.ID === V.djID && slave.assignment === Job.CLUB) {
								if (potentialFriend.rules.relationship !== "restrictive" && silverTongue(potentialFriend, manipulationSkill)) {
									r.push(`${slave.slaveName} manages to ingratiate ${himself} with the DJ, ${potentialFriend.slaveName}. The two slaves have <span class="relationship">struck up a friendship.</span>`);
									startFriendship(slave, potentialFriend, 1);
									break;
								} else {
									if (slave.devotion < -20) {
										r.push(`${slave.slaveName} tries to strike up a friendship with the DJ, ${potentialFriend.slaveName}, and is <span class="trust dec">punished</span> by ${him2} for disrespect.`);
										slave.trust -= 4;
									}
								}
							} else if (potentialFriend.ID === V.MilkmaidID && slave.assignment === Job.DAIRY) {
								if (potentialFriend.rules.relationship !== "restrictive" && silverTongue(potentialFriend, manipulationSkill)) {
									r.push(`${slave.slaveName} manages to ingratiate ${himself} with the Milkmaid, ${potentialFriend.slaveName}. The two slaves have <span class="relationship">struck up a friendship.</span>`);
									startFriendship(slave, potentialFriend, 1);
									break;
								} else {
									if (slave.devotion < -20) {
										r.push(`${slave.slaveName} tries to strike up a friendship with the Milkmaid, ${potentialFriend.slaveName}, and is <span class="trust dec">punished</span> by ${him2} for disrespect.`);
										slave.trust -= 4;
									}
								}
							} else if (potentialFriend.ID === V.FarmerID && slave.assignment === Job.FARMYARD) {
								if (potentialFriend.rules.relationship !== "restrictive" && silverTongue(potentialFriend, manipulationSkill)) {
									r.push(`${slave.slaveName} manages to ingratiate ${himself} with the Farmer, ${potentialFriend.slaveName}. The two slaves have <span class="relationship">struck up a friendship.</span>`);
									startFriendship(slave, potentialFriend, 1);
									break;
								} else {
									if (slave.devotion < -20) {
										r.push(`${slave.slaveName} tries to strike up a friendship with the Farmer, ${potentialFriend.slaveName}, and is <span class="trust dec">punished</span> by ${him2} for disrespect.`);
										slave.trust -= 4;
									}
								}
							} else if (potentialFriend.ID === V.SchoolteacherID && slave.assignment === Job.SCHOOL) {
								if (potentialFriend.rules.relationship !== "restrictive" && silverTongue(potentialFriend, manipulationSkill)) {
									r.push(`${slave.slaveName} manages to ingratiate ${himself} with the Schoolteacher, ${potentialFriend.slaveName}. The two slaves have <span class="relationship">struck up a friendship.</span>`);
									startFriendship(slave, potentialFriend, 1);
									break;
								} else {
									if (slave.devotion < -20) {
										r.push(`${slave.slaveName} tries to strike up a friendship with the Schoolteacher, ${potentialFriend.slaveName}, and is <span class="trust dec">punished</span> by ${him2} for disrespect.`);
										slave.trust -= 4;
									}
								}
							} else if (potentialFriend.ID === V.AttendantID && slave.assignment === Job.SPA) {
								if (potentialFriend.rules.relationship !== "restrictive" && silverTongue(potentialFriend, manipulationSkill)) {
									r.push(`${slave.slaveName} basks in the affection and care of the spa attendant, ${potentialFriend.slaveName}. The two slaves have <span class="relationship">struck up a friendship.</span>`);
									startFriendship(slave, potentialFriend, 1);
									break;
								} else {
									if (slave.devotion < -20) {
										r.push(`${slave.slaveName} tries to strike up a friendship with the spa attendant, ${potentialFriend.slaveName}. ${He2} gently <span class="devotion inc">counsels</span> ${him} to obey the rules.`);
										slave.devotion += 1;
									}
								}
							} else if (potentialFriend.ID === V.StewardessID && slave.assignment === Job.QUARTER) {
								if (potentialFriend.rules.relationship !== "restrictive" && silverTongue(potentialFriend, manipulationSkill)) {
									r.push(`${slave.slaveName} manages to ingratiate ${himself} with the Stewardess, ${potentialFriend.slaveName}. The two slaves have <span class="relationship">struck up a friendship.</span>`);
									startFriendship(slave, potentialFriend, 1);
									break;
								} else {
									if (slave.devotion < -20) {
										r.push(`${slave.slaveName} tries to strike up a friendship with the Stewardess, ${potentialFriend.slaveName}, and is <span class="trust dec">punished</span> by ${him2} for disrespect.`);
										slave.trust -= 4;
									}
								}
							} else if (potentialFriend.ID === V.WardenessID && slave.assignment === Job.CELLBLOCK) {
								if (potentialFriend.rules.relationship !== "restrictive" && silverTongue(potentialFriend, manipulationSkill)) {
									r.push(`${slave.slaveName} manages to earn the respect of the Wardeness, ${potentialFriend.slaveName}. The two slaves have <span class="relationship">struck up a friendship.</span>`);
									startFriendship(slave, potentialFriend, 1);
									break;
								} else {
									if (slave.devotion < -20) {
										r.push(`${slave.slaveName} tries to strike up a friendship with the Wardeness, ${potentialFriend.slaveName}, and is <span class="trust dec">beaten</span> by ${him2} for ${his} trouble.`);
										slave.trust -= 5;
									}
								}
							} else if (potentialFriend.ID === V.ConcubineID && slave.assignment === Job.MASTERSUITE) {
								if (potentialFriend.rules.relationship !== "restrictive" && silverTongue(potentialFriend, manipulationSkill)) {
									r.push(`${slave.slaveName} becomes especially close to the Concubine, ${potentialFriend.slaveName}. The two slaves have <span class="relationship">struck up a friendship.</span>`);
									startFriendship(slave, potentialFriend, 1);
									break;
								} else {
									if (slave.devotion < -20 && potentialFriend.fetish !== Fetish.MINDBROKEN) {
										r.push(`${slave.slaveName} tries to strike up a friendship with the Concubine, ${potentialFriend.slaveName}, and is gently <span class="devotion inc">counseled</span> by ${him2} that such things are against the rules.`);
										slave.devotion += 1;
									}
								}
							} else if (potentialFriend.assignment === slave.assignment) {
								if (random(1, 100) > 50) {
									if (potentialFriend.rules.relationship !== "restrictive") {
										r.push(`${slave.slaveName} and ${potentialFriend.slaveName} see a lot of each other`);
										if (slave.assignment === Job.SCHOOL || slave.assignment === Job.CLASSES) {
											r.push(`in class`);
										} else if (slave.assignment === Job.CLINIC) {
											r.push(`while being treated`);
										} else if (slave.assignment === Job.CELLBLOCK) {
											r.push(`while being punished`);
										} else if (slave.assignment === Job.REST) {
											r.push(`in their time off`);
										} else {
											r.push(`at work`);
										}
										r.push(`and <span class="relationship">strike up a friendship.</span>`);
										startFriendship(slave, potentialFriend, 1);
										break;
									} else {
										if (resentment === 0) {
											r.push(`${slave.slaveName} tries to strike up a friendship with ${potentialFriend.slaveName} and is <span class="trust dec">punished</span> for breaking the rules against such things; ${he} <span class="devotion dec">resents</span> being castigated for simple sociability.`);
											slave.devotion -= 2;
											slave.trust -= 2;
											resentment++;
										}
									}
								}
							} else if (mutualChildren(slave, potentialFriend, V.slaves) > 0) {
								if (App.Utils.sexAllowed(slave, potentialFriend)) {
									if (potentialFriend.rules.relationship === "permissive") {
										r.push(`${slave.slaveName} and ${potentialFriend.slaveName} have`);
										if (mutualChildren(slave, potentialFriend, V.slaves) === 1) {
											r.push(`a child`);
										} else {
											r.push(`children`);
										}
										r.push(`living in your penthouse, so it's not surprising that their offspring brings them together. They have <span class="relationship">become friends</span> for their child's sake.`);
										startFriendship(slave, potentialFriend, 1);
										break;
									} else {
										r.push(`${slave.slaveName} tries to renew ${his} relationship with ${potentialFriend.slaveName} and is <span class="trust dec">punished</span> for breaking the rules against such things; ${he} <span class="devotion dec">resents</span> being prevented from reuniting with ${him2}.`);
										slave.devotion -= 2;
										slave.trust -= 2;
									}
								}
							} else if (potentialFriend.fetish === slave.fetish || (potentialFriend.fetish === Fetish.SADIST && slave.fetish === Fetish.MASOCHIST) || (slave.fetish === Fetish.SADIST && potentialFriend.fetish === Fetish.MASOCHIST) || (potentialFriend.fetish === Fetish.DOM && slave.fetish === Fetish.SUBMISSIVE) || (slave.fetish === Fetish.DOM && potentialFriend.fetish === Fetish.SUBMISSIVE)) {
								if (slave.fetish !== Fetish.NONE && App.Utils.sexAllowed(slave, potentialFriend)) {
									if (potentialFriend.rules.relationship === "permissive") {
										r.push(`${slave.slaveName} and ${potentialFriend.slaveName} share sexual inclinations, so it's only natural that they <span class="relationship">become friends with benefits.</span>`);
										startFriendship(slave, potentialFriend, 3);
										break;
									} else {
										if (resentment === 0) {
											r.push(`${slave.slaveName} tries to strike up a sexual relationship with ${potentialFriend.slaveName} and is <span class="trust dec">punished</span> for breaking the rules against such things; ${he} <span class="devotion dec">resents</span> being prevented from pursuing ${him2}.`);
											slave.devotion -= 2;
											slave.trust -= 2;
											resentment++;
										}
									}
								}
							}
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
	function sanityCheck(slave) {
		const friend = getSlave(slave.relationshipTarget);
		if (friend === undefined) {
			r.push(`<span class="error">${slave.slaveName}'s relationship was ${slave.relationship} and relationshipTarget was ${slave.relationshipTarget} but no slave with that ID was found</span>`);
			slave.relationship = 0;
			slave.relationshipTarget = 0;
		} else {
			if (slave.rivalry !== 0 && slave.rivalryTarget === friend.ID) {
				friend.rivalry = 0;
				friend.rivalryTarget = 0;
				slave.rivalry = 0;
				slave.rivalryTarget = 0;
			}
		}
	}

	/**
	 * @param {FC.ReportSlave} slave
	 *
	 */
	function existingRelationship(slave) {
		let friend;
		let him2;
		let his2;
		let wife2;
		if (slave.relationship > 0) {
			friend = getSlave(slave.relationshipTarget);
			({
				him2, his2, wife2
			} = getPronouns(friend).appendSuffix("2"));
		}
		if (slave.fetish === Fetish.MINDBROKEN && slave.relationship !== -3) {
			r.push(`Since ${he} is mindbroken, ${he} <span class="relationship dec">can't really maintain</span>`);
			if (slave.relationship > 0) {
				r.push(`any meaningful relationship with ${friend.slaveName}.`);
				friend.relationship = 0;
				friend.relationshipTarget = 0;
			} else if (slave.relationship === -1) {
				r.push(`any emotional dependencies.`);
			} else {
				r.push(`any meaningful relationship with you.`);
			}
			slave.relationship = 0;
			slave.relationshipTarget = 0;
		} else if (slave.relationship === -1) {
			if ([Job.DJ, Job.CLUB, Job.PUBLIC, Job.WHORE, Job.BROTHEL].includes(slave.assignment)) {
				r.push(`${His} endless stream of lovers maintains and satisfies ${his} emotional reliance on sex.`);
			} else if (slave.assignment === Job.MASTERSUITE && V.masterSuiteUpgradeLuxury === 2) {
				r.push(`Forming a part of the pile of copulating bodies in ${V.masterSuiteName} satisfies ${his} voracious sexual appetite.`);
			} else if (slave.energy <= 95) {
				r.push(`${He} is not a complete nymphomaniac and ${he} doesn't have a constant stream of lovers, so ${he} has <span class="relationship dec">begun to rely less on sex for emotional support</span> than ${he} once did.`);
				slave.relationship = 0;
			} else if (slave.assignment === Job.CLINIC) {
				r.push(`${He} can't wait to get better so ${he} can go back to slutting it up.`);
			} else if (slave.energy > 95) {
				r.push(`${He} is such a nymphomaniac that even without a steady stream of lovers, ${his} emotional reliance on promiscuity remains.`);
				if (slave.devotion > 60) {
					r.push(`${He} is <span class="devotion dec">emotionally unfulfilled</span> by ${his} assignment, since it does not afford ${him} the validation of massive promiscuity.`);
					slave.devotion--;
				}
				if (slave.trust > 60) {
					r.push(`${He} is <span class="trust dec">impatient</span> with ${his} limited field of potential sexual partners, and would prefer to be a publicly available nympho.`);
					slave.trust--;
				}
			}
		} else if (slave.relationship === -2) {
			incestReactions(slave, V.PC);
			if (slave.devotion + slave.trust < 150) {
				if (slave.devotion < 75 && random(1, 100) > 50) {
					r.push(`${He} is no longer as devoted to you as ${he} once was, and has <span class="relationship dec">begun to look elsewhere for emotional support.</span>`);
					slave.relationship = 0;
				} else if (slave.trust < 75 && random(1, 100) > 50) {
					r.push(`${He} is no longer as trusting of you as ${he} once was, and has <span class="relationship dec">begun to look elsewhere for emotional support.</span>`);
					slave.relationship = 0;
				}
			}
			switch (slave.assignment) {
				case Job.HOUSE:
				case Job.CONCUBINE:
				case Job.FUCKTOY:
				case Job.MASTERSUITE:
				case Job.QUARTER:
					r.push(`${He} is <span class="devotion inc">happy</span> to be allowed to serve you personally, since it's as close a relationship to you as ${he} can aspire to. In addition, ${his} deep love for you produces a slow but steady increase of both <span class="devotion inc">devotion</span> and <span class="trust inc">trust.</span>`);
					slave.devotion++;
					slave.trust++;
					break;
				default:
					r.push(`${His} deep love for you produces a slow but steady increase of both <span class="devotion inc">devotion</span> and <span class="trust inc">trust.</span>`);
					slave.devotion++;
					slave.trust++;
			}
		} else if (slave.relationship === -3) {
			incestReactions(slave, V.PC);
			if (slave.fetish === Fetish.MINDBROKEN) {
				switch (slave.assignment) {
					case Job.HOUSE:
					case Job.CONCUBINE:
					case Job.FUCKTOY:
					case Job.MASTERSUITE:
					case Job.QUARTER:
						r.push(`${He} lives a nice life by your side, despite ${his} inability to realize it. Since ${he} is so malleable and willing, you rarely have reason to punish ${him} anymore.`);
						if (slave.kindness) {
							slave.kindness += 2;
						} else {
							slave.kindness = 2;
						}
						break;
					case Job.WHORE:
					case Job.BROTHEL:
					case Job.PUBLIC:
					case Job.CLUB:
					case Job.GLORYHOLE:
					case Job.ARCADE:
						r.push(`You, others, it doesn't matter. They are all the same to your mindbroken ${wife}. The public, however, is less forgiving of you ordering your slave ${wife} to fuck random citizens, <span class="reputation dec">seriously damaging your reputation.</span>`);
						repX(-100, "PCRelationships", slave);
						break;
					default:
						r.push(`Being your ${wife} is wasted on ${his} empty mind. If it weren't for the ring`);
						if (hasAnyArms(slave)) {
							r.push(`around ${his} finger,`);
						} else {
							r.push(`hanging from ${his} neck,`);
						}
						r.push(`nobody would ever realize ${he} was so close to you.`);
				}
			} else if (slave.devotion + slave.trust >= 175) {
				switch (slave.assignment) {
					case Job.HOUSE:
					case Job.CONCUBINE:
					case Job.FUCKTOY:
					case Job.MASTERSUITE:
					case Job.QUARTER:
						r.push(`${He} is <span class="devotion inc">happy</span> to be allowed to live ${his} life close to you, since ${he}'s your ${wife}. In addition, ${his} deep reliance on ${his} formal relationship to you produces a steady increase of both <span class="devotion inc">devotion</span> and <span class="trust inc">trust.</span>`);
						slave.devotion += 2;
						slave.trust += 2;
						break;
					case Job.WHORE:
					case Job.BROTHEL:
					case Job.PUBLIC:
					case Job.CLUB:
					case Job.GLORYHOLE:
					case Job.ARCADE:
						r.push(`${His} reliance on ${his} formal relationship to you produces a slight increase of both <span class="devotion inc">devotion</span> and <span class="trust inc">trust,</span> though this is reduced by being on a public sexual assignment rather than being kept for you alone. The public is less forgiving of you ordering your slave ${wife} to fuck random citizens, <span class="reputation dec">seriously damaging your reputation.</span>`);
						slave.devotion++;
						slave.trust++;
						repX(-100, "PCRelationships", slave);
						break;
					default:
						r.push(`${His} deep reliance on ${his} formal relationship to you produces a steady increase of both <span class="devotion inc">devotion</span> and <span class="trust inc">trust.</span>`);
						slave.devotion++;
						slave.trust++;
				}
			} else if (slave.devotion < -20 && slave.trust > 0) {
				switch (slave.assignment) {
					case Job.HOUSE:
					case Job.CONCUBINE:
					case Job.FUCKTOY:
					case Job.MASTERSUITE:
					case Job.QUARTER:
						r.push(`${He} <span class="defiant inc">takes advantage</span> of your kindness, since ${he} is allowed to live a pampered life just for letting you use ${his} body. ${His} insolence allows ${him} to retain, if not strengthen, <span class="devotion dec">${his} hatred of you.</span>`);
						slave.devotion -= 7;
						slave.trust += 5;
						break;
					case Job.WHORE:
					case Job.BROTHEL:
					case Job.PUBLIC:
					case Job.CLUB:
					case Job.GLORYHOLE:
					case Job.ARCADE:
						r.push(`Not being a pampered fucktoy to you <span class="trust dec">wounds ${his} expectations as your ${wife},</span> but gives ${him} the space needed to <span class="devotion inc">begin warming up to you.</span> The public, disregarding ${his} opinions, is less forgiving of you ordering your slave ${wife} to fuck random citizens, <span class="reputation dec">seriously damaging your reputation.</span>`);
						slave.devotion++;
						slave.trust--;
						repX(-100, "PCRelationships", slave);
						break;
					default:
						r.push(`${He} <span class="defiant inc">takes advantage</span> of your kindness, since ${he} expects you'd never truly harm your ${wife}. ${His} insolence allows ${him} to remain, if not strengthen, <span class="devotion dec">${his} hatred of you.</span>`);
						slave.devotion -= 5;
						slave.trust += 3;
				}
			} else if (slave.devotion < -20) {
				switch (slave.assignment) {
					case Job.HOUSE:
					case Job.CONCUBINE:
					case Job.FUCKTOY:
					case Job.MASTERSUITE:
					case Job.QUARTER:
						r.push(`${He} is <span class="trust dec">thoroughly terrified</span> by having to remain in a formal relationship with the ${playerPronouns.woman} ${he} hates. Being so close to you forces ${him} to slowly <span class="devotion inc">accept</span> ${his} new role as your ${wife}.`);
						slave.devotion += 1;
						slave.trust -= 3;
						break;
					case Job.WHORE:
					case Job.BROTHEL:
					case Job.PUBLIC:
					case Job.CLUB:
					case Job.GLORYHOLE:
					case Job.ARCADE:
						r.push(`Being forced into public service only reinforces ${his} <span class="trust dec">fears</span> and <span class="devotion dec">perceptions</span> of you. If there was any chance of ${him} thinking you cared, <span class="devotion dec">it's gone now.</span> The public, disregarding ${his} opinions, is less forgiving of you ordering your slave ${wife} to fuck random citizens, <span class="reputation dec">seriously damaging your reputation.</span>`);
						slave.devotion -= 10;
						slave.trust -= 10;
						repX(-100, "PCRelationships", slave);
						break;
					default:
						r.push(`${He} is <span class="trust dec">thoroughly terrified</span> by having to remain in a formal relationship with the ${playerPronouns.woman} ${he} hates. Without you nearby to distract ${him}, ${he} dwells on ${his} situation as ${his} <span class="devotion dec">hate for you grows.</span>`);
						slave.devotion -= 3;
						slave.trust -= 5;
				}
			} else {
				switch (slave.assignment) {
					case Job.HOUSE:
					case Job.CONCUBINE:
					case Job.FUCKTOY:
					case Job.MASTERSUITE:
					case Job.QUARTER:
						r.push(`${He} is <span class="devotion inc">happy</span> to be allowed to live a rather nice life close to you, since ${he}'s your ${wife}. In addition, ${his} formal relationship to you produces a steady increase of both <span class="devotion inc">devotion</span> and <span class="trust inc">trust.</span>`);
						slave.devotion += 2;
						slave.trust += 2;
						break;
					case Job.WHORE:
					case Job.BROTHEL:
					case Job.PUBLIC:
					case Job.CLUB:
					case Job.GLORYHOLE:
					case Job.ARCADE:
						r.push(`${His} formal relationship to you produces a steady increase of both <span class="devotion inc">devotion</span> and <span class="trust inc">trust,</span> though this is reduced by being on a public sexual assignment rather than being kept for you alone, not that ${he} minds; just as you ordered ${him} to marry you, so may you order ${him} to fuck others. The public, however, is less forgiving of you ordering your slave ${wife} to fuck random citizens, <span class="reputation dec">seriously damaging your reputation.</span>`);
						slave.devotion++;
						slave.trust++;
						repX(-100, "PCRelationships", slave);
						break;
					default:
						r.push(`${His} formal relationship to you produces a steady increase of both <span class="devotion inc">devotion</span> and <span class="trust inc">trust</span> as ${he} gradually grows closer to ${his} spouse.`);
						slave.devotion++;
						slave.trust++;
				}
			}
		} else if (slave.rules.relationship === "restrictive" && slave.relationship !== 5) {
			if (disobedience(friend) > random(0, 100)) {
				r.push(`${friend.slaveName} knows ${slave.slaveName} isn't allowed to be in a relationship with ${him2}, but keeps seeing ${him} anyway.`);
			} else {
				r.push(`Since the rules forbid the relationship between ${slave.slaveName} and ${friend.slaveName}, they are <span class="relationship dec">forced apart.</span>`);
				if (slave.relationship > 1) {
					slave.relationship--;
					friend.relationship = slave.relationship;
				} else {
					friend.relationship = 0;
					friend.relationshipTarget = 0;
					slave.relationship = 0;
					slave.relationshipTarget = 0;
				}
				forcedApartReaction(slave, friend);
			}
		} else if (slave.rules.relationship === "just friends" && slave.relationship !== 5 && slave.relationship > 2) {
			if (disobedience(friend) > random(0, 100)) {
				r.push(`${friend.slaveName} knows ${slave.slaveName} isn't allowed to be in a sexual relationship with ${him2}, but keeps fucking ${him} anyway.`);
			} else {
				r.push(`Since the sexual relationship between ${slave.slaveName} and ${friend.slaveName} is against the rules, they`);
				if (!hasAnyArms(slave) && !hasAnyArms(friend)) {
					r.push(`are, metaphorically speaking,`);
				} else {
					r.push(`are`);
				}
				r.push(`<span class="relationship dec">forced to keep their hands to themselves.</span>`);
				friend.relationship = 2;
				slave.relationship = 2;
				forcedApartReaction(slave, friend);
			}
		} else {
			let seed = 0;
			r.push(`${slave.slaveName}`);
			switch (slave.relationship) {
				case 1: // friends
					r.push(`is friends with ${friend.slaveName}.`);
					if (slave.devotion + slave.trust > 170 && random(1, 100) > 95) { // 5% chance to abandon friend to ebond/eslut
						r.push(`${He}'s very devoted to you, and strongly trusts both you and ${his} place as a slave. Since ${he} is just friends with ${friend.slaveName},`);
						if (slave.sexualQuirk === SexualQuirk.ROMANTIC) {
							bondEmotionally(slave);
						} else if (slave.energy > 90) {
							r.push(`and is a total sex addict, ${he} begins to think of sex as ${his} only meaningful emotional connection with people. <span class="relationship">${He}'s become an emotional slut!</span>`);
							slave.relationship = -1;
						} else {
							r.push(`and loves you, ${he} begins to think of you as a ${woman} might think of ${his} lover — or spouse. ${He} knows ${he} cannot hope for more of a relationship with you than ${he} has, but ${he} finds emotional support in serving you nonetheless. <span class="relationship">${He}'s become emotionally bonded to you!</span>`);
							slave.relationship = -2;
						}
						friend.relationship = 0;
						friend.relationshipTarget = 0;
						slave.relationshipTarget = 0;
					} else if (areRelated(slave, friend) && (random(1, 100) > 80)) {
						r.push(`They build on their family relationship and become <span class="relationship">best friends.</span>`);
						slave.relationship++;
						friend.relationship = slave.relationship;
					} else if (mutualChildren(slave, friend, V.slaves) > 0 && (random(1, 100) < (50 + (10 * mutualChildren(slave, friend, V.slaves))))) {
						r.push(`Hoping to benefit their mutual children, they draw closer together, becoming <span class="relationship">best friends.</span>`);
						slave.relationship++;
						friend.relationship = slave.relationship;
					} else if (slave.energy > 95 && random(1, 100) > 70) {
						r.push(`${slave.slaveName} obviously lusts after ${his} friend, and does everything ${he} can to <span class="relationship">draw ${him2} closer.</span>`);
						slave.relationship++;
						friend.relationship = slave.relationship;
					} else if (slave.attrXX > 85 && random(1, 100) > 70 && (friend.vagina > -1 || friend.faceShape !== FaceShape.MASC)) {
						r.push(`${slave.slaveName} obviously lusts after ${his} friend, and does everything ${he} can to <span class="relationship">draw ${him2} closer.</span>`);
						slave.relationship++;
						friend.relationship = slave.relationship;
					} else if (slave.attrXY > 85 && random(1, 100) > 70 && (friend.dick > 0 || friend.faceShape === FaceShape.MASC)) {
						r.push(`${slave.slaveName} obviously lusts after ${his} friend, and does everything ${he} can to <span class="relationship">draw ${him2} closer.</span>`);
						slave.relationship++;
						friend.relationship = slave.relationship;
					} else if (random(1, 100) > 90) {
						r.push(`They support and reassure each other and become <span class="relationship">best friends.</span>`);
						slave.relationship++;
						friend.relationship = slave.relationship;
					}
					break;
				case 2: // BFFs;
					r.push(`maintains a close friendship with ${friend.slaveName}.`);
					if (slave.sexualQuirk === SexualQuirk.ROMANTIC) {
						r.push(`${His} romantic bent drives ${him} to search for a regular sexual partner.`);
						seed = 10;
					}
					if (slave.devotion + slave.trust > 95 && random(1, 100) === 100) { // 1% chance to abandon best friend to ebond/eslut
						r.push(`${slave.slaveName} is totally devoted to you, and implicitly trusts both you and ${his} place as a slave. Since ${his} relationship with ${friend.slaveName} has not yet turned sexual, and`);
						if (slave.sexualQuirk === SexualQuirk.ROMANTIC) {
							r.push(`${he} persistently interprets sex in the most romantic possible terms, ${he} has decided that ${he} wants to be yours in ${his} heart as well as ${his}`);
							if (slave.vagina > 0) {
								r.push(`pussy.`);
							} else if (slave.anus > 0) {
								r.push(`butthole.`);
							} else {
								r.push(`mouth.`);
							}
							r.push(`<span class="relationship">${He}'s become emotionally bonded to you!</span>`);
							slave.relationship = -2;
						} else if (slave.energy > 90) {
							r.push(`${he}'s a total sex addict, ${he} begins to think of sex as ${his} only meaningful emotional connection with people. <span class="relationship">${He}'s become an emotional slut!</span>`);
							slave.relationship = -1;
						} else {
							r.push(`${he} loves you, ${he} begins to think of you as a ${woman} might think of ${his} lover — or spouse. ${He} knows ${he} cannot hope for more of a relationship with you than ${he} has, but ${he} finds emotional support in serving you nonetheless. <span class="relationship">${He}'s become emotionally bonded to you!</span>`);
							slave.relationship = -2;
						}
						friend.relationship = 0;
						friend.relationshipTarget = 0;
						slave.relationshipTarget = 0;
					} else if (App.Utils.sexAllowed(slave, friend) && slave.rules.relationship !== "just friends" && friend.rules.relationship !== "just friends") {
						if (mutualChildren(slave, friend, V.slaves) > 0 && random(1, 100) < (50 + (10 * mutualChildren(slave, friend, V.slaves)) + seed)) {
							r.push(`Having already had kids together, their relationship turns sexual once again, turning them into <span class="relationship">friends with benefits.</span>`);
							slave.relationship++;
							friend.relationship = slave.relationship;
						} else if (V.seeIncest === 1 && slave.energy > 95 && areRelated(slave, friend) && random(1, 100) > (90 - seed)) {
							r.push(`Driven by nymphomania to attempt to have sex with everyone, ${slave.slaveName} successfully seduces ${his} ${relativeTerm(slave, friend)}, ${friend.slaveName}, making them <span class="relationship">friends with benefits.</span>`);
							slave.relationship++;
							friend.relationship = slave.relationship;
						} else if (V.seeIncest === 1 && slave.sexualQuirk === SexualQuirk.PERVERT && areRelated(slave, friend) && random(1, 100) > (80 - seed)) {
							r.push(`Reveling in the taboo nature of ${his} attraction to ${friend.slaveName}, ${slave.slaveName} successfully seduces ${his} ${relativeTerm(slave, friend)}, making them <span class="relationship">friends with benefits.</span>`);
							slave.relationship++;
							friend.relationship = slave.relationship;
						} else if (V.seeIncest === 1 && slave.behavioralQuirk === BehavioralQuirk.SINFUL && areRelated(slave, friend) && random(1, 100) > (80 - seed)) {
							r.push(`Aroused by the chance to commit the sin of incest, ${slave.slaveName} successfully seduces ${his} ${relativeTerm(slave, friend)}, ${friend.slaveName}, making them <span class="relationship">friends with benefits.</span>`);
							slave.relationship++;
							friend.relationship = slave.relationship;
						} else if (slave.energy > 95 && random(1, 100) > (80 - seed)) {
							r.push(`${slave.slaveName} successfully seduces ${friend.slaveName}, making them <span class="relationship">friends with benefits.</span>`);
							slave.relationship++;
							friend.relationship = slave.relationship;
						} else if ((random(1, 100) > (100 - seed) - (0.2 * slave.attrXX)) && (friend.vagina > -1 || friend.faceShape !== FaceShape.MASC)) {
							r.push(`${slave.slaveName} successfully seduces ${friend.slaveName}, making them <span class="relationship">friends with benefits.</span>`);
							slave.relationship++;
							friend.relationship = slave.relationship;
						} else if ((random(1, 100) > (100 - seed) - (0.2 * slave.attrXY)) && (canAchieveErection(friend) || friend.faceShape === FaceShape.MASC)) {
							r.push(`${slave.slaveName} successfully seduces ${friend.slaveName}, making them <span class="relationship">friends with benefits.</span>`);
							slave.relationship++;
							friend.relationship = slave.relationship;
						} else if (V.seeIncest === 1 && areRelated(slave, friend) && (random(1, 100) > (95 - seed))) {
							r.push(`Eventually, they happen to be together and horny, and find themselves fucking without thinking. They have become incestuous <span class="relationship">friends with benefits.</span>`);
							slave.relationship++;
							friend.relationship = slave.relationship;
						} else if (random(1, 100) > (95 - seed)) {
							if (friend.vagina !== -1 && slave.behavioralFlaw === BehavioralFlaw.HATESWOMEN && random(1, 2) === 1) {
								r.push(`Despite ${slave.slaveName}'s dislike of pussy,`);
							} else if ((friend.dick > 0 || friend.faceShape === FaceShape.MASC) && slave.behavioralFlaw === BehavioralFlaw.HATESMEN && random(1, 2) === 1) {
								r.push(`Despite ${slave.slaveName}'s distaste for cock,`);
							} else {
								r.push(`Living in an atmosphere of omnipresent sexuality,`);
							}
							r.push(`they fuck in a weak moment and find themselves becoming <span class="relationship">friends with benefits.</span>`);
							slave.relationship++;
							friend.relationship = slave.relationship;
						}
					}
					break;
				case 3: // FWB
					r.push(`keeps up a sexual friendship with ${friend.slaveName}.`);
					if (slave.sexualQuirk === SexualQuirk.ROMANTIC) {
						r.push(`${His} romantic bent drives ${him} to do ${his} best to advance ${his} relationship to an emotional level.`);
						seed = 10;
					}
					if (V.seeIncest === 1 && slave.energy > 95 && areRelated(slave, friend) && random(1, 100) > (90 - seed)) {
						r.push(`${He}'s such a desperate nympho that constant incest is nothing to ${him}. ${He} develops real feelings for ${friend.slaveName} as a romantic partner. Their relationship becomes <span class="relationship">romantically emotional</span> as well as physical and familial.`);
						slave.relationship++;
						friend.relationship = slave.relationship;
					} else if (V.seeIncest === 1 && slave.sexualQuirk === SexualQuirk.PERVERT && areRelated(slave, friend) && random(1, 100) > (80 - seed)) {
						r.push(`Reveling in the taboo nature of ${his} sexual relationship with ${friend.slaveName}, ${he} not only enjoys ${his} ${relativeTerm(slave, friend)}'s body, but looks after ${his2} pleasure, too. Their relationship becomes <span class="relationship">romantically emotional</span> as well as physical and familial.`);
						slave.relationship++;
						friend.relationship = slave.relationship;
					} else if (V.seeIncest === 1 && slave.behavioralQuirk === BehavioralQuirk.SINFUL && areRelated(slave, friend) && random(1, 100) > (80 - seed)) {
						r.push(`${He} gets deep, perverse satisfaction by constant commission of the sin of incest, which is extreme enough to appease even ${his} appetite for transgression. ${His} incestuous relationship becomes <span class="relationship">romantically emotional</span> as well as physical and familial.`);
						slave.relationship++;
						friend.relationship = slave.relationship;
					} else if (mutualChildren(slave, friend, V.slaves) > 0 && random(1, 100) < (50 + (10 * mutualChildren(slave, friend, V.slaves)) + seed)) {
						r.push(`Between their children and common sexual flings, they begin seeing each other as a traditional couple. Their relationship becomes <span class="relationship">strongly emotional</span> as well as physical.`);
						if (slave.pregSource === friend.ID && friend.pregSource === slave.ID && slave.pregKnown === 1 && friend.pregKnown === 1) {
							r.push(`Not very surprising, since they both have the other's child growing in their womb.`);
						} else if (slave.pregSource === friend.ID && slave.pregKnown === 1) {
							r.push(`Not very surprising, since ${slave.slaveName} is carrying another of ${friend.slaveName}'s children.`);
						} else if (friend.pregSource === slave.ID && friend.pregKnown === 1) {
							r.push(`Not very surprising, since ${friend.slaveName} is carrying another of ${slave.slaveName}'s children.`);
						}
						slave.relationship++;
						friend.relationship = slave.relationship;
					} else if (slave.energy > 95 && random(1, 100) > (80 - seed)) {
						r.push(`${He} not only enjoys ${friend.slaveName}'s body, but looks after ${his2} pleasure, too. Without meaning it to, their relationship becomes <span class="relationship">strongly emotional</span> as well as physical.`);
						slave.relationship++;
						friend.relationship = slave.relationship;
					} else if ((random(1, 100) > (100 - seed) - (0.2 * slave.attrXX)) && (friend.vagina > -1 || friend.faceShape !== FaceShape.MASC)) {
						r.push(`${He} not only enjoys ${friend.slaveName}'s body, but looks after ${his2} pleasure, too. Without meaning it to, their relationship becomes <span class="relationship">strongly emotional</span> as well as physical.`);
						slave.relationship++;
						friend.relationship = slave.relationship;
					} else if ((random(1, 100) > (100 - seed) - (0.2 * slave.attrXY)) || (friend.dick > 0 || friend.faceShape === FaceShape.MASC)) {
						r.push(`${He} not only enjoys ${friend.slaveName}'s body, but looks after ${his2} pleasure, too. Without meaning it to, their relationship becomes <span class="relationship">strongly emotional</span> as well as physical.`);
						slave.relationship++;
						friend.relationship = slave.relationship;
					} else if (random(1, 100) > (95 - seed)) {
						r.push(`They've spent enough time looking after each other's sexual and emotional needs that their relationship has become <span class="relationship">very strong.</span>`);
						slave.relationship++;
						friend.relationship = slave.relationship;
					}
					break;
				case 4: // lovers
					r.push(`and ${friend.slaveName} are lovers.`);
					break;
				case 5: // married
					r.push(`has a slave ${wife2}, ${friend.slaveName}.`);
					if (FutureSocieties.isActive('FSChattelReligionist')) {
						r.push(`Society <span class="reputation inc">approves</span> of their marriage, which advances the slave sacrament.`);
						V.arcologies[0].FSChattelReligionist += 0.05 * V.FSSingleSlaveRep;
						repX(V.FSSingleSlaveRep * (V.arcologies[0].FSChattelReligionist / V.FSLockinLevel), "SlaveRelationships", slave);
					}
			}
			if (slave.relationship > 0) { // catch should she change her relationship status
				if (slave.devotion <= 95) {
					if (slave.devotion !== friend.devotion) {
						r.push(`${slave.slaveName} absorbs`);
						if (slave.relationship === 1) {
							r.push(`a touch of ${his} friend's`);
						} else if (slave.relationship === 2) {
							r.push(`a little of ${his} best friend's`);
						} else if (slave.relationship === 3) {
							r.push(`some of ${his} close friend's`);
						} else if (slave.relationship === 4) {
							r.push(`a lot of ${his} lover's`);
						} else {
							r.push(`much of ${his} ${wife2}'s`);
						}
						if (slave.devotion > friend.devotion) {
							r.push(`<span class="devotion dec">`);
							if (friend.devotion > 50) {
								r.push(`remaining doubts about you.</span>`);
							} else if (friend.devotion > 20) {
								r.push(`remaining hesitations about sexual slavery.</span>`);
							} else if (friend.devotion >= -20) {
								r.push(`unhappiness about being a sex slave.</span>`);
							} else {
								r.push(`anger at being a slave.</span>`);
							}
						} else {
							r.push(`<span class="devotion inc">`);
							if (friend.devotion > 50) {
								r.push(`love for you.</span>`);
							} else if (friend.devotion > 20) {
								r.push(`acceptance of sexual slavery.</span>`);
							} else if (friend.devotion >= -20) {
								r.push(`submission to the reality of being a sex slave.</span>`);
							} else {
								r.push(`unwillingness to immediately rebel.</span>`);
							}
						}
						slave.devotion -= Math.trunc((slave.devotion - friend.devotion) * (0.1 * slave.relationship));
					}
				} else if (friend.devotion <= 95) {
					r.push(`${He}'s so devoted to you that ${he}'s unaffected by ${friend.slaveName}'s less abject submission.`);
				}
				if (slave.trust <= 95) {
					r.push(`${slave.slaveName}`);
					if (slave.trust < -20) {
						r.push(`cares for ${friend.slaveName} and is <span class="trust dec">terrified</span> of what you might do to ${him2} if either of them misbehave. ${He} <span class="devotion inc">does ${his} best</span> to avoid that.`);
						slave.trust -= slave.relationship;
						slave.devotion += slave.relationship;
					} else {
						r.push(`<span class="trust inc">trusts you</span>`);
						if (slave.relationship <= 2) {
							r.push(`a little more for allowing ${him} to have a friend.`);
						} else if (slave.relationship === 3) {
							r.push(`for letting ${him} have a fuckbuddy.`);
						} else if (slave.relationship === 4) {
							r.push(`for permitting ${him} and ${his} lover to be together.`);
						} else {
							r.push(`for giving ${him} a ${wife2}.`);
						}
						slave.trust += slave.relationship;
					}
				} else if (slave.devotion > 95 && slave.relationship > 4) {
					r.push(`${He} feels`);
					if (FutureSocieties.isActive('FSChattelReligionist')) {
						r.push(`blessed with`);
					} else {
						r.push(`${he} has`);
					}
					r.push(`a truly good life as your slave.`);
				}
			}
		}
	}

	/**
	 * @param {FC.ReportSlave} slave
	 * @param {Relative} relative
	 */
	function incestReactions(slave, relative) {
		if (areRelated(slave, relative)) {
			const relationType = relativeTerm(slave, relative);
			const repType = relative.ID === -1 ? "PCRelationships" : "SlaveRelationships";
			const whose = relative.ID === -1 ? "your" : "their";

			if (slave.fetish !== Fetish.MINDBROKEN) {
				if (relative.ID === -1) {
					r.push(`${He}`);
				} else {
					r.push(`${slave.slaveName}`);
				}
				if ((slave.origin === "$He offered $himself to you for enslavement hoping you would preserve $his incestuous relationship with $his sibling." || slave.origin === "$He offered to become your slave to protect $his incestuous relationship.") && relative.ID !== -1) {
					r.push(`is <span class="devotion inc">grateful</span> and <span class="trust inc">trusting</span> towards you for protecting ${him} in ${his} long-standing incestuous relationship.`);
					slave.devotion += 2;
					slave.trust += 2;
				} else if (slave.sexualQuirk === SexualQuirk.PERVERT) {
					r.push(`is such a pervert that ${he} <span class="devotion inc">enjoys</span> carrying on an incestuous relationship with ${his} own ${relationType}.`);
					slave.devotion += 1;
				} else if (slave.devotion > 95) {
					r.push(`is so inured to the perversities of slavery that ${he} <span class="devotion inc">enjoys</span> carrying on an incestuous relationship with ${his} own ${relationType}.`);
					slave.devotion += 1;
				} else if (slave.behavioralQuirk === BehavioralQuirk.SINFUL) {
					r.push(`is torn between sinful delight and deep disgust that ${he}'s carrying on an incestuous relationship with ${his} own ${relationType}.`);
				} else if (slave.devotion > 75) {
					r.push(`is so devoted to you that ${he} accepts carrying on an incestuous relationship with ${his} own ${relationType}.`);
				} else if (slave.devotion > 50) {
					r.push(`is somewhat <span class="devotion dec">disturbed</span> that ${he}'s carrying on an incestuous relationship with ${his} own ${relationType}.`);
					slave.devotion -= 2;
				} else if (slave.devotion > 20) {
					r.push(`is <span class="devotion dec">disturbed</span> and <span class="trust dec">scared</span> that ${he}'s carrying on an incestuous relationship with ${his} own ${relationType}.`);
					slave.devotion -= 2;
					slave.trust -= 2;
				} else {
					r.push(`is <span class="devotion dec">revolted</span> and <span class="trust dec">scared</span> that ${he}'s carrying on an incestuous relationship with ${his} own ${relationType}.`);
					slave.devotion -= 4;
					slave.trust -= 4;
				}
				if (slave.pregKnown === 1 && slave.pregSource === relative.ID) {
					if ((slave.origin === "$He offered $himself to you for enslavement hoping you would preserve $his incestuous relationship with $his sibling." || slave.origin === "$He offered to become your slave to protect $his incestuous relationship.") && relative.ID !== -1) {
						r.push(`${He}'s <span class="devotion inc">overjoyed</span> to be carrying ${his} ${relationType}'s child${slave.pregType > 1 ? "ren." : "."}`);
						slave.devotion += 2;
					} else if (slave.sexualQuirk === SexualQuirk.PERVERT) {
						r.push(`${He}'s even <span class="devotion inc">aroused</span> by the constant awareness that ${his} ${relationType} is the parent of the child${slave.pregType > 1 ? "ren" : ""} ${he}'s carrying.`);
						slave.devotion += 1;
					} else if (slave.behavioralQuirk === BehavioralQuirk.SINFUL) {
						r.push(`${His} feelings about carrying ${his} ${relationType}'s child${slave.pregType > 1 ? "ren" : ""} are <span class="devotion inc">secretly less mixed,</span> though.`);
						slave.devotion += 1;
					} else if (slave.sexualFlaw === SexualFlaw.BREEDER) {
						r.push(`${He} occasionally remembers that ${he}'s carrying ${his} ${relationType}'s ${slave.pregType > 1 ? `children` : `child`}, but ${his} fetish for all things pregnancy is so strong it overpowers the deep-rooted revulsion.`);
					} else if (slave.devotion > 95) {
						r.push(`${He} occasionally remembers that ${he}'s carrying ${his} ${relationType}'s ${slave.pregType > 1 ? `children` : `child`}, but does ${his} best to accept it by not thinking about it.`);
					} else if (slave.devotion > 50) {
						r.push(`${He}'s <span class="devotion dec">disgusted</span> that the`);
						if (slave.pregType > 1) {
							r.push(`babies ${he}'s carrying are`);
						} else {
							r.push(`baby ${he}'s carrying is`);
						}
						r.push(`${his} ${relationType}'s, though ${he} tries ${his} best not to think about it.`);
						slave.devotion -= 1;
					} else if (slave.devotion > 20) {
						r.push(`${He}'s so <span class="devotion dec">disgusted</span> that the`);
						if (slave.pregType > 1) {
							r.push(`babies ${he}'s carrying are`);
						} else {
							r.push(`baby ${he}'s carrying is`);
						}
						r.push(`${his} ${relationType}'s that ${he} often wakes up crying about it.`);
						slave.devotion -= 2;
					} else {
						r.push(`${He}'s <span class="devotion dec">passionately hateful</span> of you for making ${him} carry an incestuous pregnancy.`);
						slave.devotion -= 4;
					}
				}
			}
			if (FutureSocieties.isActive('FSEgyptianRevivalist')) {
				r.push(`Society <span class="reputation inc">strongly approves</span> of ${whose} incestuous relationship, which advances the Egyptian revivalist ideal of slave incest.`);
				repX((2 * V.FSSingleSlaveRep * (V.arcologies[0].FSEgyptianRevivalist / V.FSLockinLevel)), repType, slave);
				V.arcologies[0].FSEgyptianRevivalist += (0.1 * V.FSSingleSlaveRep);
				if (slave.bellyPreg >= 1500 && slave.pregSource === relative.ID) {
					r.push(`<span class="reputation inc">The effect is greatly enhanced</span> by ${slave.slaveName}'s pureblooded pregnancy.`);
					repX((V.FSSingleSlaveRep * (V.arcologies[0].FSEgyptianRevivalist / V.FSLockinLevel)), repType, slave);
					V.arcologies[0].FSEgyptianRevivalist += (0.05 * V.FSSingleSlaveRep * slave.pornFameBonus);
				}
			} else if (V.arcologies[0].FSEgyptianRevivalistIncestPolicy === 1) {
				r.push(`Society <span class="reputation inc">enjoys</span> ${whose} incestuous relationship since incest is currently trendy.`);
				repX((1.5 * V.FSSingleSlaveRep), repType, slave);
				if (slave.bellyPreg >= 1500 && slave.pregSource === relative.ID) {
					r.push(`<span class="reputation inc">The effect is enhanced</span> by ${slave.slaveName}'s pureblooded pregnancy.`);
					repX(V.FSSingleSlaveRep, repType, slave);
				}
			}
		}
	}

	/** LONG TERM RELATIONSHIP EFFECTS
	 * @param {FC.ReportSlave} slave
	 *
	 */
	function consummateRelationship(slave) {
		let lover = getSlave(slave.relationshipTarget);
		const {
			he2, him2, his2, girl2, wife2
		} = getPronouns(lover).appendSuffix("2");

		incestReactions(slave, lover);
		if (App.Utils.sexAllowed(slave, lover)) {
			if (slave.sexualQuirk === SexualQuirk.SIZEQUEEN && canPenetrate(lover)) {
				if (lover.dick > 5) {
					r.push(`${He}'s <span class="devotion inc">very happy</span> with ${his} romantic status, since it means ${he} regularly gets monster cock.`);
					if (V.seeStretching === 1 && canDoAnal(slave) && slave.anus.isBetween(0, 3)) {
						r.push(`${He}'s such a size queen that ${he} takes it up ${his} ass as often as ${he} can bear it, despite ${his} poor anus not being used to such abuse. This <span class="lime">stretches out ${his} sphincter.</span>`);
						slave.anus++;
					}
					if (V.seeStretching === 1 && canDoVaginal(slave) && slave.vagina.isBetween(0, 3)) {
						r.push(`It's a little big for what ${his} pussy can handle, <span class="lime">but ${he} gets used to it.</span>`);
						slave.vagina++;
					}
					r.push(`For ${his2} part, ${lover.slaveName} <span class="devotion inc">can barely believe ${his2} luck,</span> their sex life is so good.`);
					slave.devotion += 2;
					lover.devotion += 2;
				} else if (lover.dick > 4) {
					r.push(`${He} <span class="devotion inc">quite likes</span> being in a sexual relationship with a slave who has such an impressive dick.`);
					if (V.seeStretching === 1 && canDoAnal(slave) && slave.anus.isBetween(0, 2)) {
						r.push(`${He}'s such a size queen that ${he} takes it up ${his} ass as often as ${he} can bear it, despite ${his} tight butt not being used to such abuse. This <span class="lime">stretches out ${his} sphincter.</span>`);
						slave.anus++;
					}
					if (V.seeStretching === 1 && canDoVaginal(slave) && slave.vagina.isBetween(0, 2)) {
						r.push(`It's a little big for what ${his} tight pussy can handle, <span class="lime">but ${he} gets used to it.</span>`);
						slave.vagina++;
					}
					r.push(`For ${his2} part, ${lover.slaveName} <span class="devotion inc">enjoys</span> the benefits of having a lover so interested in ${his2} junk.`);
					slave.devotion++;
					lover.devotion++;
				} else if (lover.dick > 3) {
					r.push(`${slave.slaveName} <span class="devotion inc">certainly doesn't mind</span> having reliable access to such a nice big dick. For ${his2} part, ${lover.slaveName} <span class="devotion inc">likes</span> having a lover who finds ${his2} penis appealing.`);
					slave.devotion++;
					lover.devotion++;
				}
			}
			if (slave.energy <= 90) {
				if (lover.energy > 95) {
					r.push(`${lover.slaveName} is such a sex addict that ${he2} drags ${slave.slaveName} along with ${him2} in their enthusiastic sex life, <span class="libido inc">slowly improving ${his} sex drive.</span>`);
					slave.energy += 3;
				} else if (lover.fetish === slave.fetish && lover.fetish !== Fetish.NONE) {
					r.push(`${lover.slaveName} and ${slave.slaveName} enjoy sharing their sexual fetishes so much it <span class="libido inc">improves their sex drives</span> in proportion to the strength of their kinks.`);
					slave.energy += 1 + Math.trunc(slave.fetishStrength / 30);
				} else if (slave.attrXX > 65 && (lover.vagina > -1 || (lover.face > 0 && lover.faceShape !== FaceShape.MASC))) {
					r.push(`${slave.slaveName} is very much attracted to ${lover.slaveName}, and their fulfilling sexual relationship <span class="libido inc">gradually improves ${slave.slaveName}'s sex drive.</span>`);
					slave.energy++;
				} else if (slave.attrXY > 65 && lover.dick > 0) {
					r.push(`${slave.slaveName} enjoys ${lover.slaveName} and ${his2} cock, and their fulfilling sexual relationship <span class="libido inc">gradually improves ${slave.slaveName}'s sex drive.</span>`);
					slave.energy++;
				}
			}
			if (slave.attrXX <= 95 && random(1, 100) < (slave.relationship * 5) && (lover.vagina > -1 || lover.faceShape !== FaceShape.MASC)) {
				if (slave.attrKnown === 1) { // just because you don't know about it doesn't mean it's not happening.
					r.push(`After finding comfort with a feminine lover, ${slave.slaveName} begins to experience <span class="positive">more attraction to women.</span>`);
				}
				slave.attrXX += 2;
			}
			if (slave.attrXY <= 95 && random(1, 100) < (slave.relationship * 5) && canAchieveErection(lover)) {
				if (slave.attrKnown === 1) {
					r.push(`After growing close to a lover with a dick, ${slave.slaveName} begins to experience <span class="positive">more attraction to men.</span>`);
				}
				slave.attrXY += 2;
			}
			if (lover.fetish !== Fetish.NONE && lover.fetish !== Fetish.MINDBROKEN && slave.fetishStrength <= 95 && lover.fetish !== slave.fetish && fetishChangeChance(slave) > Math.max(0, (random(0, 100) - (slave.relationship * 5)))) {
				switch (lover.fetish) {
					case Fetish.BOOBS:
						r.push(`After experiencing ${lover.slaveName}'s love of breasts, both ${his2} own and ${slave.slaveName}'s, ${slave.slaveName} happily joins ${him2} as a <span class="fetish gain">boob fanatic.</span>`);
						slave.fetish = Fetish.BOOBS;
						slave.fetishKnown = 1;
						slave.fetishStrength = 65;
						break;
					case Fetish.BUTTSLUT:
						r.push(`${lover.slaveName} begs ${slave.slaveName} to fuck ${his2} ass so many times that ${slave.slaveName} reconsiders ${his} stance on buttsex. ${He} becomes just as much of an <span class="fetish gain">anal slut</span> as ${lover.slaveName}.`);
						slave.fetish = Fetish.BUTTSLUT;
						slave.fetishKnown = 1;
						slave.fetishStrength = 65;
						break;
					case Fetish.CUMSLUT:
						r.push(`After sharing blowjobs with ${lover.slaveName} enough times, ${slave.slaveName} develops an <span class="fetish gain">oral fixation</span> of ${his} own.`);
						slave.fetish = Fetish.CUMSLUT;
						slave.fetishKnown = 1;
						slave.fetishStrength = 65;
						break;
					case Fetish.SUBMISSIVE:
						if (slave.fetish !== Fetish.DOM) {
							r.push(`${lover.slaveName} begs ${slave.slaveName} to dominate ${him2} so many times that ${slave.slaveName} gets used to domination, and finds ${he} likes it. ${He} becomes just as much of a <span class="fetish gain">sexual dominant</span> as a slave can be.`);
							slave.fetish = Fetish.DOM;
							slave.fetishKnown = 1;
							slave.fetishStrength = 65;
						}
						break;
					case Fetish.DOM:
						if (slave.fetish !== Fetish.SUBMISSIVE) {
							r.push(`${lover.slaveName} holds ${slave.slaveName} down and fucks ${him} so many times that ${slave.slaveName} starts to get off on being used. ${He} becomes a true <span class="fetish gain">sexual submissive,</span> and loves ${lover.slaveName} all the more for dominating ${him}.`);
							slave.fetish = Fetish.SUBMISSIVE;
							slave.fetishKnown = 1;
							slave.fetishStrength = 65;
						}
						break;
					case Fetish.MASOCHIST:
						if (slave.fetish !== Fetish.SADIST) {
							r.push(`${lover.slaveName} begs ${slave.slaveName} to hurt ${him2} so many times that ${slave.slaveName} gets used to sadism, and finds ${he} likes it. ${He} becomes just as much of an <span class="fetish gain">sexual sadist</span> as a slave can be.`);
							slave.fetish = Fetish.SADIST;
							slave.fetishKnown = 1;
							slave.fetishStrength = 65;
						}
						break;
					case Fetish.SADIST:
						if (slave.fetish !== Fetish.MASOCHIST) {
							r.push(`${lover.slaveName} hits ${slave.slaveName} during sex so often that ${slave.slaveName} starts to get off on being beaten. ${He} becomes a true <span class="fetish gain">masochist,</span> and loves ${lover.slaveName} all the more for abusing ${him}.`);
							slave.fetish = Fetish.MASOCHIST;
							slave.fetishKnown = 1;
							slave.fetishStrength = 65;
						}
						break;
					case Fetish.HUMILIATION:
						r.push(`${lover.slaveName} begs ${slave.slaveName} to humiliate ${him2} sexually so many times that ${slave.slaveName} can't help but be embarrassed by all the public sex, ${himself}. ${He} gets off on the <span class="fetish gain">humiliation</span> with ${lover.slaveName}.`);
						slave.fetish = Fetish.HUMILIATION;
						slave.fetishKnown = 1;
						slave.fetishStrength = 65;
						break;
					case Fetish.PREGNANCY:
						r.push(`${lover.slaveName} shares ${his2} hopes and dreams of pregnancy and children with ${slave.slaveName} all the time, and ${slave.slaveName} can't help but feel`);
						if (isFertile(slave) && isFertile(lover)) {
							r.push(`${his} <span class="fetish gain">biological clock</span> tick in time with ${lover.slaveName}'s.`);
						} else if (lover.pregKnown === 1 && isFertile(slave)) {
							r.push(`the <span class="fetish gain">need to become pregnant</span> like ${lover.slaveName}.`);
						} else {
							r.push(`the <span class="fetish gain">same obsession</span> as ${lover.slaveName}.`);
						}
						slave.fetish = Fetish.PREGNANCY;
						slave.fetishKnown = 1;
						slave.fetishStrength = 65;
						break;
				}
			}
			if (lover.actualAge - slave.actualAge > 10 && slave.relationship >= 4 && random(1, 300) > (slave.intelligence + slave.intelligenceImplant + lover.intelligence + lover.intelligenceImplant) && lover.devotion > 75 && lover.trust > 50 && (lover.intelligence + lover.intelligenceImplant > 15) && (slave.devotion > 20 || (slave.devotion >= -20 && slave.trust < -20) || slave.trust > -10)) {
				if ((lover.skill.oral > slave.skill.oral) || (lover.skill.anal > slave.skill.anal) || (lover.skill.vaginal > slave.skill.vaginal && slave.vagina >= 0 && lover.vagina >= 0) || (lover.skill.penetrative > slave.skill.penetrative && canPenetrate(slave) && (lover.vagina > 0 || lover.anus > 0)) || (lover.trust > slave.trust)) {
					r.push(`${slave.slaveName}'s`);
					if (slave.relationship >= 5) {
						r.push(`${wife2}`);
					} else {
						r.push(`lover`);
					}
					r.push(`is older, more experienced, and`);
					if (lover.skill.oral > slave.skill.oral) {
						r.push(`better at blowjobs than ${he} is. They are such good slaves that the senior ${girl2} serves as a mentor to the junior, improving ${his} oral skills.`);
						r.push(slaveSkillIncrease('oral', slave, 5));
					} else if (lover.skill.penetrative > slave.skill.penetrative && canPenetrate(slave) && (lover.vagina > 0 || lover.anus > 0)) {
						if (canPenetrate(lover)) {
							r.push(`a better lover`);
						} else if (lover.dick > 0) {
							r.push(`better with ${his2} unusable dick`);
						} else if (lover.clit >= 3) {
							r.push(`better with ${his2} clit`);
						} else {
							r.push(`better with a strapon`);
						}
						r.push(`than ${he}`);
						if (canPenetrate(lover)) {
							r.push(`is,`);
						} else {
							r.push(`is with ${his} cock,`);
						}
						r.push(`and they are such good slaves that the senior ${girl2} serves as a mentor to the junior, improving ${his} penetrative skills.`);
						r.push(slaveSkillIncrease('penetrative', slave, 5));
					} else if (lover.skill.vaginal > slave.skill.vaginal && slave.vagina > 0 && lover.vagina > 0) {
						if (lover.vagina > 0) {
							r.push(`a better lover`);
						} else {
							r.push(`better with a virgin pussy`);
						}
						r.push(`than ${he}`);
						if (slave.vagina > 0) {
							r.push(`is without one,`);
						} else {
							r.push(`is,`);
						}
						r.push(`and they are such good slaves that the senior ${girl2} serves as a mentor to the junior, improving ${his} vaginal skills.`);
						r.push(slaveSkillIncrease('vaginal', slave, 5));
					} else if (lover.skill.anal > slave.skill.anal) {
						r.push(`better at`);
						if (lover.anus > 0) {
							r.push(`taking a buttfuck`);
						} else {
							r.push(`using ${his2} rear`);
						}
						r.push(`than ${he} is, and they are such good slaves that the senior ${girl2} serves as a mentor to the junior, improving ${his} anal skills.`);
						r.push(slaveSkillIncrease('anal', slave, 5));
					} else if (lover.trust > slave.trust) {
						r.push(`a better slave than ${he} is, and they are such obedient slaves that the senior ${girl2} serves as a mentor to the junior, <span class="trust inc">improving ${his} trust.</span>`);
						slave.trust += 5;
					} else {
						r.push(`a more devoted slave than ${he} is; since they are such obedient slaves, the senior ${girl2} serves as a mentor to the junior, <span class="devotion inc">teaching ${him} to better serve you.</span>`);
						slave.devotion += 2;
					}
				}
			}
		} else { // lovers not allowed to have sex...that's just mean
			r.push(`${He}'s <span class="devotion dec">frustrated,</span> both sexually and mentally, since ${he}'s not allowed to fuck ${lover.slaveName}`);
			slave.devotion -= 2;
			if (disobedience(slave) + 5 > random(0, 100)) {
				r.push(`and tries to defy your rules, <span class="trust dec">earning severe punishment.</span>`);
				slave.trust -= 3;
			} else {
				r.push(`but <span class="trust inc">trusts</span> that you know best.`);
				slave.trust++;
			}
			if (slave.relationship < 5 && random(0, 100) > 90) {
				r.push(`With the lack of sexual intimacy, ${slave.slaveName} and ${lover.slaveName} find themselves less passionate about each other and suffer a break up, becoming <span class="relationship dec">merely friends.</span> They both <span class="devotion dec">deeply regret</span> the loss of that spark.`);
				slave.relationship = 2;
				lover.relationship = 2;
				slave.devotion -= 10;
				lover.devotion -= 10;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function familyFeelings(slave) {
		/** @param {Map<string, Array<App.Entity.SlaveState>>} map
		 * @param {App.Entity.SlaveState} relative */
		function addToRelativeMap(map, relative) {
			const terms = relativeTerms(slave, relative);
			for (const term of terms) {
				if (!map.has(term)) {
					map.set(term, [relative]);
				} else {
					map.get(term).push(relative);
				}
			}
		}

		/**
		 * @param {Map<string, Array<App.Entity.SlaveState>>} map
		 * @returns {Array<string>}
		 */
		function relativeMapToGroupArray(map) {
			let groups = [];
			for (const [type, people] of map) {
				if (people.length > 1) {
					groups.push(`${his} ${type}s ${toSentence(people.map(s => s.slaveName))}`);
				} else {
					groups.push(`${his} ${type} ${people[0].slaveName}`);
				}
			}
			return groups;
		}

		/**
		 * @param {Map<string, Array<App.Entity.SlaveState>>} map
		 * @returns {App.Entity.SlaveState}
		 */
		function singleRelativeInMap(map) {
			if (map.size !== 1) {
				return null;
			}
			/** @type {App.Entity.SlaveState[]} */
			const slavesOfType = map.values().next().value;
			if (slavesOfType.length !== 1) {
				return null;
			}
			return slavesOfType[0];
		}

		/**
		 * @param {Map<string, Array<App.Entity.SlaveState>>} map
		 * @returns {number}
		 */
		function relativeMapTotalSize(map) {
			let size = 0;
			for (const people of map.values()) {
				size += people.length;
			}
			return size;
		}

		const overwhelmed = 5;
		if (slave.trust <= 95) {
			let relatives = V.slaves.filter((s) => areRelated(slave, s));
			if (slave.trust < -20) {
				/** @type {Array<App.Entity.SlaveState>} */
				const worriedAboutChildren = [];
				/** @type {Map<string, Array<App.Entity.SlaveState>>} */
				const worriedAboutRelatives = new Map();
				for (const relative of relatives) {
					if (slave.rivalryTarget !== relative.ID) {
						if (isParentP(relative, slave)) {
							worriedAboutChildren.push(relative);
							if (worriedAboutChildren.length <= overwhelmed) {
								slave.trust -= 2;
								slave.devotion += 6;
							}
						} else {
							addToRelativeMap(worriedAboutRelatives, relative);
							if (relativeMapTotalSize(worriedAboutRelatives) <= overwhelmed) {
								slave.trust -= 1;
								slave.devotion += 3;
							}
						}
					}
				}
				if (worriedAboutChildren.length > 1) {
					r.push(`${slave.slaveName} is <span class="trust dec">agonizingly aware</span> that ${his} children ${toSentence(worriedAboutChildren.map(s => s.slaveName))} are also your slaves and might suffer if any of them angers you, and <span class="devotion inc">does ${his} best</span> to protect them.`);
				} else if (worriedAboutChildren.length > 0) {
					const {him2} = getPronouns(worriedAboutChildren[0]).appendSuffix("2");
					r.push(`${slave.slaveName} is <span class="trust dec">agonizingly aware</span> that ${his} child ${worriedAboutChildren[0].slaveName} is also your slave and might suffer if either of them angers you, and <span class="devotion inc">does ${his} best</span> to protect ${him2}.`);
				}
				if (worriedAboutChildren.length > overwhelmed) {
					r.push(`${He} has so many children to worry about that ${he} is overwhelmed with fear and <span class="trust inc">forced to trust you.</span>`);
				}
				let singleRelative = singleRelativeInMap(worriedAboutRelatives);
				if (singleRelative) {
					r.push(`${slave.slaveName} is <span class="trust dec">painfully conscious</span> that ${his} ${relativeTerm(slave, singleRelative)} ${singleRelative.slaveName} is also your slave and might suffer if either of them displeases you, and <span class="devotion inc">tries to obey</span> as best ${he} can.`);
				} else if (worriedAboutRelatives.size > 0) {
					const groups = relativeMapToGroupArray(worriedAboutRelatives);
					r.push(`${slave.slaveName} is <span class="trust dec">painfully conscious</span> that ${toSentence(groups)} are also your slaves and might suffer if any of them displeases you, and <span class="devotion inc">tries to obey</span> as best ${he} can.`);
				}
				if (relativeMapTotalSize(worriedAboutRelatives) > overwhelmed) {
					r.push(`${He} has so many relatives to worry about that ${he} is overwhelmed with fear and <span class="trust inc">forced to trust you.</span>`);
				}
			} else {
				/** @type {Map<string, Array<App.Entity.SlaveState>>} */
				const devotedRelatives = new Map();
				/** @type {Map<string, Array<App.Entity.SlaveState>>} */
				const obedientRelatives = new Map();
				/** @type {Map<string, Array<App.Entity.SlaveState>>} */
				const hatefulRelatives = new Map();
				for (const relative of relatives) {
					if (relative.devotion > 50) {
						addToRelativeMap(devotedRelatives, relative);
						if (relativeMapTotalSize(devotedRelatives) <= overwhelmed) {
							slave.devotion += 4;
						}
					} else if (relative.devotion > 20 || relative.trust < -20) {
						addToRelativeMap(obedientRelatives, relative);
					} else {
						addToRelativeMap(hatefulRelatives, relative);
						if (relativeMapTotalSize(hatefulRelatives) <= overwhelmed) {
							slave.trust -= 1;
						}
					}
				}
				let singleRelative = singleRelativeInMap(devotedRelatives);
				if (singleRelative) {
					const {him2} = getPronouns(singleRelative).appendSuffix('2');
					r.push(`${slave.slaveName} knows that ${his} ${relativeTerm(slave, singleRelative)} ${singleRelative.slaveName} loves being your sex slave, and is <span class="devotion inc">happy</span> for ${him2}.`);
				} else if (devotedRelatives.size > 0) {
					const groups = relativeMapToGroupArray(devotedRelatives);
					r.push(`${slave.slaveName} knows that ${toSentence(groups)} ${devotedRelatives.size === 2 ? `both` : `all`} love being your sex slaves, and is <span class="devotion inc">happy</span> for them.`);
				}
				if (relativeMapTotalSize(devotedRelatives) > overwhelmed) {
					r.push(`${He} has so many relatives that love being your slaves that ${he} is sometimes overwhelmed with joy and <span class="devotion dec">neglects ${his} duties.</span>`);
				}
				singleRelative = singleRelativeInMap(obedientRelatives);
				if (singleRelative) {
					const {he2} = getPronouns(singleRelative).appendSuffix('2');
					r.push(`${slave.slaveName} knows that ${his} ${relativeTerm(slave, singleRelative)} ${singleRelative.slaveName} is an obedient sex slave, and hopes ${he2}'ll avoid punishment.`);
				} else if (obedientRelatives.size > 0) {
					const groups = relativeMapToGroupArray(obedientRelatives);
					r.push(`${slave.slaveName} knows that ${toSentence(groups)} are obedient sex slaves, and hopes they'll avoid punishment.`);
				}
				if (relativeMapTotalSize(obedientRelatives) > overwhelmed) {
					r.push(`${He} has so many obedient relatives that ${he} sometimes forgets about some of them.`);
				}
				singleRelative = singleRelativeInMap(hatefulRelatives);
				if (singleRelative) {
					const {him2} = getPronouns(singleRelative).appendSuffix('2');
					r.push(`${slave.slaveName} knows that ${his} ${relativeTerm(slave, singleRelative)} ${singleRelative.slaveName} hates being a sex slave, and is <span class="trust dec">afraid</span> for ${him2}.`);
				} else if (hatefulRelatives.size > 0) {
					const groups = relativeMapToGroupArray(hatefulRelatives);
					r.push(`${slave.slaveName} knows that ${toSentence(groups)} ${hatefulRelatives.size === 2 ? `both` : `all`} hate being sex slaves, and is <span class="trust dec">afraid</span> for them.`);
				}
				if (relativeMapTotalSize(hatefulRelatives) > overwhelmed) {
					r.push(`${He} has so many relatives that hate being your sex slaves that ${he} is overwhelmed with fear and <span class="trust inc">just has to trust you to take care of them.</span>`);
				}
			}
		}
	}
};
