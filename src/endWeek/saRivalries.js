/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.SlaveAssignment.rivalries = function saRivalries(slave) {
	/** @type {string[]} */
	const r = [];

	let changed = false;

	const {
		he, him, his
	} = getPronouns(slave);

	if (canStartRivalry(slave)) {
		if (isSlaveAvailable(slave) && slave.assignment !== Job.CONFINEMENT) {
			generateRivalry(slave);
		}
	} else if (slave.rivalry) {
		existingRivalry(slave);
	}
	if (slave.rivalry) {
		rivalryValidation(slave);
	}

	return r.join(" ");


	/** Can this slave possibly get a new rival?
	 * @param {App.Entity.SlaveState} slave
	 * @returns {boolean}
	 */
	function canStartRivalry(slave) {
		const headstrong = (slave.devotion < jsRandom(20, 100)) && (slave.trust > jsRandom(-100, -20));
		const distant = (slave.assignment === Job.AGENTPARTNER || slave.assignment === Job.AGENT);
		return (slave.rivalry === 0 && slave.fetish !== Fetish.MINDBROKEN && slave.fuckdoll === 0 && !distant && headstrong);
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function generateRivalry(slave) {
		let foundRival = 0;

		for (const potentialRival of V.slaves) {
			if (canStartRivalry(potentialRival) && potentialRival.ID !== slave.ID && potentialRival.ID !== slave.relationshipTarget) {
				if (potentialRival.origBodyOwnerID === slave.ID && potentialRival.devotion > 0 && slave.devotion < -30) {
					r.push(`${slave.slaveName} loathes that ${SlaveFullName(potentialRival)} is using <span class="em">${his}</span> body to benefit you and makes it abundantly clear every chance ${he} gets. <span class="rivalry inc">They start to dislike each other.</span>`);
					foundRival = 1;
				}
				if (foundRival !== 1 && slave.behavioralFlaw !== BehavioralFlaw.NONE) {
					switch (slave.behavioralFlaw) {
						case BehavioralFlaw.ARROGANT:
							if (potentialRival.intelligence > slave.intelligence + slave.intelligenceImplant) {
								r.push(`${slave.slaveName} is an arrogant bitch, and ${SlaveFullName(potentialRival)} is authentically smarter than ${he} is, which of course ${he} cannot stand. <span class="rivalry inc">They start to dislike each other.</span>`);
								foundRival = 1;
							}
							break;
						case BehavioralFlaw.BITCHY:
							if (potentialRival.behavioralFlaw === BehavioralFlaw.ODD) {
								r.push(`${slave.slaveName} is a bit of a bitch, and poor odd ${SlaveFullName(potentialRival)} is a convenient target for ${his} bullying. <span class="rivalry inc">They start to dislike each other.</span>`);
								foundRival = 1;
							}
							break;
						case BehavioralFlaw.ODD:
							if (potentialRival.behavioralFlaw === BehavioralFlaw.BITCHY) {
								r.push(`${slave.slaveName} is rather strange. ${SlaveFullName(potentialRival)}, who is kind of a bitch, frequently bullies ${him} about it. <span class="rivalry inc">They start to dislike each other.</span>`);
								foundRival = 1;
							}
							break;
						case BehavioralFlaw.HATESMEN:
							if (potentialRival.attrXX > 35) {
								if (potentialRival.faceShape === FaceShape.MASC || potentialRival.faceShape === FaceShape.ANDRO) {
									if (potentialRival.muscles > 10) {
										if (potentialRival.vagina > -1) {
											r.push(`${slave.slaveName} hates men, and poor butch ${SlaveFullName(potentialRival)} really gets to ${him}, despite having a pussy and everything. <span class="rivalry inc">They start to dislike each other.</span>`);
											foundRival = 1;
										} else {
											r.push(`${slave.slaveName} hates men, and poor masculine ${SlaveFullName(potentialRival)} really gets to ${him}. <span class="rivalry inc">They start to dislike each other.</span>`);
											foundRival = 1;
										}
									}
								}
							}
							break;
						case BehavioralFlaw.HATESWOMEN:
							if (potentialRival.attrXY > 35) {
								if (potentialRival.faceShape !== FaceShape.MASC) {
									if (potentialRival.muscles <= 30) {
										if (potentialRival.vagina > -1) {
											r.push(`${slave.slaveName} hates women, and something about the feminine ${SlaveFullName(potentialRival)} really gets to ${him}. <span class="rivalry inc">They start to dislike each other.</span>`);
											foundRival = 1;
										} else {
											r.push(`${slave.slaveName} hates women, and something about the girly ${SlaveFullName(potentialRival)} really gets to ${him}, despite poor ${potentialRival.slaveName} not being perfectly female at all. <span class="rivalry inc">They start to dislike each other.</span>`);
											foundRival = 1;
										}
									}
								}
							}
							break;
						case BehavioralFlaw.GLUTTONOUS:
							if (potentialRival.behavioralFlaw === BehavioralFlaw.ANOREXIC) {
								r.push(`${slave.slaveName}, who loves food, can't stand ${SlaveFullName(potentialRival)}'s prissy anorexia. <span class="rivalry inc">They start to dislike each other.</span>`);
								foundRival = 1;
							} else if (potentialRival.weight < -30) {
								r.push(`${slave.slaveName}, who loves food, can't stand ${SlaveFullName(potentialRival)}'s severe emaciation. <span class="rivalry inc">They start to dislike each other.</span>`);
								foundRival = 1;
							}
							break;
						case BehavioralFlaw.ANOREXIC:
							if (potentialRival.behavioralFlaw === BehavioralFlaw.GLUTTONOUS) {
								r.push(`${slave.slaveName}, an anorexic, can't stand ${SlaveFullName(potentialRival)}'s disgusting gluttony. <span class="rivalry inc">They start to dislike each other.</span>`);
								foundRival = 1;
							} else if (potentialRival.weight > 95) {
								r.push(`${slave.slaveName}, an anorexic, can't stand ${SlaveFullName(potentialRival)}'s immense girth. <span class="rivalry inc">They start to dislike each other.</span>`);
								foundRival = 1;
							}
							break;
						case BehavioralFlaw.DEVOUT:
							if (potentialRival.behavioralFlaw === BehavioralFlaw.LIBERATED) {
								r.push(`${slave.slaveName}, who is devout and might be considered rather conservative if ${he} were free, can't stand ${SlaveFullName(potentialRival)}'s revolting gender liberation. <span class="rivalry inc">They start to dislike each other.</span>`);
								foundRival = 1;
							}
							break;
						case BehavioralFlaw.LIBERATED:
							if (potentialRival.behavioralFlaw === BehavioralFlaw.DEVOUT) {
								r.push(`${slave.slaveName}, who is liberated and might be considered rather liberal if ${he} were free, can't stand ${SlaveFullName(potentialRival)}'s bigoted religious faith. <span class="rivalry inc">They start to dislike each other.</span>`);
								foundRival = 1;
							}
							break;
					}
				}
				if (foundRival !== 1 && potentialRival.assignment === slave.assignment) {
					if (jsRandom(0, 1) === 1) {
						r.push(`${slave.slaveName} and ${SlaveFullName(potentialRival)} see too much of each other while they`);
						switch (potentialRival.assignment) {
							case Job.HOUSE:
							case Job.QUARTER:
								r.push(`work as servants`);
								break;
							case Job.SUBORDINATE:
								r.push(`prepare to serve your other slaves`);
								break;
							case Job.GLORYHOLE:
								r.push(`work nearby glory holes`);
								break;
							case Job.CELLBLOCK:
								r.push(`are confined in nearby cells`);
								break;
							case Job.FUCKTOY:
								r.push(`wait for you to use them`);
								break;
							default:
								r.push(potentialRival.assignment);
						}
						r.push(`and <span class="rivalry inc">start to dislike each other.</span>`);
						foundRival = 1;
					}
				}
				if (foundRival === 1) {
					// needed to break the loop if the case statement picked a rival.
					// might as well use it to condense all the rival sets too.
					slave.rivalry = 1;
					slave.rivalryTarget = potentialRival.ID;
					potentialRival.rivalry = 1;
					potentialRival.rivalryTarget = slave.ID;
					break;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.Entity.SlaveState} rival
	 */
	function reduce(slave, rival) {
		rival.rivalry--;
		slave.rivalry--;
		if (slave.rivalry === 0) {
			rival.rivalryTarget = 0;
			slave.rivalryTarget = 0;
		}
		changed = true;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.Entity.SlaveState} rival
	 */
	function increase(slave, rival) {
		rival.rivalry++;
		slave.rivalry++;
		changed = true;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.Entity.SlaveState} rival
	 */
	function reconcile(slave, rival) {
		rival.rivalry = 0;
		rival.rivalryTarget = 0;
		slave.rivalry = 0;
		slave.rivalryTarget = 0;
		changed = true;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function existingRivalry(slave) {
		const rival = getSlave(slave.rivalryTarget);
		let roll = jsRandom(0, 100);
		changed = false;

		if (rival === undefined) {
			r.push(`<span class="red">Error, rivalryTarget not found.</span>`);
		} else {
			if (slave.fuckdoll) {
				r.push(`${slave.slaveName} is a living sex toy, not a person, it <span class="rivalry dec">can't really maintain any meaningful rivalry</span> with ${SlaveFullName(rival)}.`);
				reconcile(slave, rival);
			} else if (slave.fetish === Fetish.MINDBROKEN) {
				r.push(`Since ${slave.slaveName} is mindbroken, ${he} <span class="rivalry dec">can't really maintain any meaningful rivalry</span> with ${SlaveFullName(rival)}.`);
				reconcile(slave, rival);
			} else if (rival.ID === slave.relationshipTarget && slave.relationship > 3) {
				r.push(`Since ${slave.slaveName} and ${slave.slaveName} are in a committed sexual relationship, they <span class="rivalry dec">can't really maintain any meaningful rivalry;</span> most disputes just end in a quick hatefucking.`);
				reconcile(slave, rival);
			} else {
				if (slave.need) {
					if (V.universalRulesConsent === 0) {
						if (App.Utils.sexAllowed(slave, rival)) {
							if (slave.fetishKnown) {
								if (slave.fetish === Fetish.SADIST) {
									r.push(`${slave.slaveName} is horny and sadistic, so ${he} rapes ${his} rival ${SlaveFullName(rival)} every chance ${he} gets; this <span class="devotion inc">thrills</span> ${slave.slaveName}, but ${rival.slaveName} is <span class="trust dec">frightened</span> that you let it happen.`);
									slave.need = 0;
									slave.devotion += 3;
									rival.trust -= 3;
									if (slave.rivalry < 3) {
										r.push(`Of course, this <span class="rivalry inc">worsens their rivalry.</span>`);
										increase(slave, rival);
									}
									SimpleSexAct.Slaves(rival, slave, 5);
								} else if (slave.fetish === Fetish.DOM) {
									r.push(`${slave.slaveName} is horny and dominant, so ${he} forces ${his} rival ${SlaveFullName(rival)} to submit to ${him} whenever ${he} can; this <span class="devotion inc">thoroughly satisfies</span> ${slave.slaveName}, but ${rival.slaveName} is <span class="devotion dec">angered</span> that you let it happen.`);
									slave.need = 0;
									slave.devotion += 3;
									rival.devotion -= 3;
									if (slave.rivalry < 3) {
										r.push(`Of course, this <span class="rivalry inc">worsens their rivalry.</span>`);
										increase(slave, rival);
									}
									SimpleSexAct.Slaves(rival, slave, 5);
								}
							}
						}
					}
				}
				if (!changed && roll > 50) {
					if (rival.fetish === slave.fetish) {
						r.push(`${slave.slaveName} and ${SlaveFullName(rival)} share sexual interests, and in the sexual atmosphere of the arcology, it's <span class="rivalry dec">difficult for them to keep up their dislike</span> of one another with the mutual attraction.`);
						reduce(slave, rival);
					}
					if (roll > 80 && slave.rivalry > 0) {
						if (!changed && rival.trust < -20) {
							if (slave.trust < -20) {
								r.push(`Since both ${slave.slaveName} and ${SlaveFullName(rival)} are terrified of you, they work together to <span class="rivalry dec">get over their feud,</span> since it brings punishment on both of them.`);
								reduce(slave, rival);
							}
						}
						if (!changed && rival.devotion > 50) {
							if (slave.devotion > 50) {
								r.push(`Since both ${slave.slaveName} and ${SlaveFullName(rival)} are devoted to you, they work together to <span class="rivalry dec">get over their feud,</span> since it gets in the way of their duties.`);
								reduce(slave, rival);
							}
						}
						if (roll > 90 && slave.rivalry > 0) {
							if (!changed && slave.energy > 95) {
								r.push(`${slave.slaveName} lusts after ${SlaveFullName(rival)}, and does everything ${he} can to <span class="rivalry dec">patch up their differences.</span>`);
								reduce(slave, rival);
							}
							if (!changed && slave.attrXX > 85) {
								if (rival.vagina > -1 || rival.faceShape !== FaceShape.MASC) {
									r.push(`${slave.slaveName} lusts after ${SlaveFullName(rival)}, and does everything ${he} can to <span class="rivalry dec">patch up their differences.</span>`);
									reduce(slave, rival);
								}
							}
							if (!changed && slave.attrXY > 85) {
								if (canAchieveErection(rival) || rival.faceShape === FaceShape.MASC) {
									r.push(`${slave.slaveName} lusts after ${SlaveFullName(rival)}, and does everything ${he} can to <span class="rivalry dec">patch up their differences.</span>`);
									reduce(slave, rival);
								}
							}
							if (!changed && rival.assignment !== slave.assignment) {
								if (slave.subTarget !== rival.ID && rival.subTarget !== slave.ID) {
									r.push(`With time apart ${slave.slaveName} and ${SlaveFullName(rival)} <span class="rivalry dec">dislike each other less.</span>`);
									reduce(slave, rival);
								}
							}
						}
					}
				}
				if (!changed && areRelated(slave, rival)) {
					if (roll > 70 && slave.rivalry < 3) {
						r.push(`${slave.slaveName} and ${SlaveFullName(rival)} <span class="rivalry inc">pursue their family rivalry.</span>`);
						increase(slave, rival);
					} else if (roll > 40 && slave.rivalry > 0) {
						r.push(`${slave.slaveName} and ${SlaveFullName(rival)} <span class="rivalry dec">patch up their family relationship.</span>`);
						reduce(slave, rival);
					}
				}
				if (!changed && rival.origBodyOwnerID === slave.ID) {
					if (slave.rivalry < 3) {
						r.push(`${slave.slaveName} <span class="rivalry inc">refuses to accept ${SlaveFullName(rival)}'s control of ${his} former body,</span> worsening their rivalry.`);
						increase(slave, rival);
					}
				} else if (!changed && roll > (slave.devotion - slave.trust + 10)) {
					if (slave.rivalry < 3) {
						r.push(`${slave.slaveName} <span class="rivalry inc">bickers with ${SlaveFullName(rival)}</span> whenever ${he} can, worsening their rivalry.`);
						increase(slave, rival);
					}
				} else if (!changed && roll < (slave.devotion - slave.trust - 10) && slave.rivalry > 0) {
					r.push(`${slave.slaveName} does ${his} best to be nice to ${SlaveFullName(rival)}, and manages to <span class="rivalry dec">de-escalate their little feud.</span>`);
					reduce(slave, rival);
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function rivalryValidation(slave) {
		// This will be obsoleted with multiple rivals system
		const rival = getSlave(slave.rivalryTarget);
		if (rival !== undefined && slave.ID !== rival.rivalryTarget) {
			rival.rivalry = 0;
			rival.rivalryTarget = 0;
			slave.rivalry = 0;
			slave.rivalryTarget = 0;
		}
	}
};
