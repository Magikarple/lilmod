/**
 * @param {FC.ReportSlave} slave
 * @returns {DocumentFragment}
 */
App.SlaveAssignment.serveYourOtherSlaves = function saServeYourOtherSlaves(slave) {
	/** @type {(string|HTMLElement|DocumentFragment)[]} */
	const r = [];

	const {
		he, him, his, himself, girl, He, His,
	} = getPronouns(slave);

	const fetishChange = fetishChangeChance(slave);
	const oldCounters = clone(slave.counter);

	/** @type {string} */
	let jobType;
	/** @type {App.Entity.SlaveState} */
	let domSlave;
	let domName;
	let domFetishKnown;
	let domSlaveUsedFetish;
	let subHatesDom;

	let oralUse = 0;
	let analUse = 0;
	let vaginalUse = 0;
	let mammaryUse = 0;
	let penetrativeUse = 0;
	let cervixPump = 0;
	let fuckCount = 0;

	const subName = slave.slaveName;
	let subSlaveLikedFetish = 0;

	validateJob(slave);
	if (jobType === "stud") {
		studLife(slave);
	} else if (jobType === "cumdump") {
		cumdumpLife(slave);
	} else if (jobType === "sub") {
		subLife(slave);
	}
	sexualSatiation(slave);
	physicalEffects(slave);
	mentalEffects(slave);
	slaveSkills(slave);

	return App.Events.makeNode(r);

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function validateJob(slave) {
		if (slave.subTarget === -1) {
			jobType = "stud";
		} else if (slave.subTarget === 0) {
			jobType = "cumdump";
		} else {
			// validate .subTarget
			domSlave = getSlave(slave.subTarget);
			if (domSlave) {
				jobType = "sub";
				domName = domSlave.slaveName;
				domFetishKnown = domSlave.fetishKnown;
				domSlaveUsedFetish = 0;
				subHatesDom = 0;
			} else {
				jobType = "cumdump";
				slave.subTarget = 0;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function studLife(slave) {
		if (slave.fuckdoll > 0) {
			r.push(`is positioned as a sperm dispenser for fertile slaves to ride or milk at their discretion.`);
		} else if (slave.fetish === Fetish.MINDBROKEN) {
			if (slave.career === "a breeding bull" && canMove(slave)) {
				r.push(`is allowed to freely breed any fertile slaves ${he} can find.`);
			} else {
				r.push(`is left as a sperm dispenser for fertile slaves to ride or milk at their discretion.`);
			}
		} else if (slave.career === "a breeding bull") {
			r.push(`sees it as ${his} duty to impregnate everyone in ${his} path. A role ${he} <span class="hotpink">appreciates</span> you <span class="mediumaquamarine">entrusting ${him} with.</span>`);
			slave.devotion += 1;
			slave.trust += 1;
			if (slave.fetishKnown === 1) {
				if (slave.fetish === Fetish.PREGNANCY) {
					r.push(`${He} <span class="hotpink">thoroughly enjoys</span> ${his} dream-like, pregnancy-centered life.`);
					slave.devotion += 1;
					subSlaveLikedFetish = 1;
				} else if (slave.fetish === Fetish.DOM) {
					r.push(`${He} <span class="hotpink">thoroughly enjoys</span> having permission to mount and breed any slave ${he} wants.`);
					slave.devotion += 1;
					subSlaveLikedFetish = 1;
				}
			}
		} else if (slave.devotion <= 20) {
			if (slave.trust >= -20) {
				r.push(`is bound and laid out to serve as a source of cum for your fertile slaves. Being tied up and left to the wolves <span class="gold">frightens ${him} into obedience.</span>`);
				slave.trust -= 5;
				if (slave.fetishKnown === 1) {
					if (slave.fetish === Fetish.PREGNANCY) {
						r.push(`${He} secretly gets off at the thought of all the wombs ${he} will seed <span class="hotpink">and can't wait to get to work.</span>`);
						slave.devotion += 1;
						subSlaveLikedFetish = 1;
					} else if (slave.fetish === Fetish.SUBMISSIVE) {
						r.push(`${He} secretly enjoys the prospect of being pinned by mothers-to-be and milked to orgasm; <span class="hotpink">${he} needs it.</span>`);
						slave.devotion += 1;
						subSlaveLikedFetish = 1;
					}
				}
			} else {
				r.push(`is forced to serve as a sperm dispenser for your fertile slaves. Being taken advantage of in such a way <span class="hotpink">habituates ${him} to subservience</span> and <span class="gold">keeps ${him} fearful.</span>`);
				slave.trust -= 2;
				slave.devotion += 2;
				if (slave.fetishKnown === 1) {
					if (slave.fetish === Fetish.PREGNANCY) {
						r.push(`${He} privately enjoys the prospect of fertilizing so many eggs <span class="hotpink">and accepts it.</span>`);
						slave.devotion += 1;
						subSlaveLikedFetish = 1;
					} else if (slave.fetish === Fetish.MASOCHIST) {
						r.push(`${He} privately enjoys the prospect of rough treatment <span class="hotpink">and accepts it.</span>`);
						slave.devotion += 1;
						subSlaveLikedFetish = 1;
					} else if (slave.fetish === Fetish.SUBMISSIVE) {
						r.push(`${He} privately enjoys the prospect of being treated as a mere tool <span class="hotpink">and accepts it.</span>`);
						slave.devotion += 1;
						subSlaveLikedFetish = 1;
					}
				}
			}
		} else {
			r.push(`obediently seeds your fertile slaves. Being used as a stud <span class="hotpink">keeps ${him} in a good frame of mind</span> and <span class="mediumaquamarine">builds ${his} trust in you.</span>`);
			slave.devotion += 2;
			slave.trust += 2;
			if (slave.fetishKnown === 1) {
				if (slave.fetish === Fetish.PREGNANCY) {
					r.push(`${He} <span class="hotpink">openly enjoys</span> getting the honor of fathering new slaves on your behalf.`);
					slave.devotion += 1;
					subSlaveLikedFetish = 1;
				} else if (slave.fetish === Fetish.DOM) {
					r.push(`${He} <span class="hotpink">openly enjoys</span> the prospect of laying claim to any womb that comes ${his} way.`);
					slave.devotion += 1;
					subSlaveLikedFetish = 1;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function cumdumpHeavyUseDevotion(slave) {
		if (slave.sexualFlaw === SexualFlaw.SELFHATING) {
			r.push(`With so many other slaves taking advantage of ${his} body, ${his} life's purpose of <span class="hotpink">being nothing more than a piece of meat</span> has come true.`);
			slave.devotion += 5;
		} else if (slave.sexualFlaw === SexualFlaw.ATTENTION) {
			r.push(`With little competition for ${his} body and so many slaves eager to use ${him}, ${his} dreams of being the center of attention are <span class="hotpink">have come true.</span>`);
			if (slave.weight < 10 && slave.belly < 100) {
				if (canDoVaginal(slave) && slave.vagina > 0 && canDoAnal(slave) && slave.anus > 0) {
					r.push(`${He} ends each day cradling ${his} cum-swollen stomach, marveling at the "attention" bestowed upon ${him}.`);
				} else if ((canDoVaginal(slave) && slave.vagina > 0) || (canDoAnal(slave) && slave.anus > 0)) {
					r.push(`By the end of the day, ${his} stomach has a noticeable bulge to it from all the "attention" bestowed upon ${him}.`);
				}
			}
			slave.devotion += 5;
		} else if (slave.energy > 95) {
			r.push(`With so many other slaves using ${his} body, ${his} <span class="hotpink">burning libido is finally sated.</span>`);
			slave.devotion += 2;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function cumdumpLife(slave) {
		if (slave.devotion <= 20) {
			if (slave.trust >= -20) {
				r.push(`is forced to serve your other slaves' sexual needs by constant punishment. Being castigated and raped <span class="gold">frightens ${him} into obedience.</span>`);
				slave.trust -= 5;
				if (slave.sexualQuirk === SexualQuirk.STRUGGLE) {
					r.push(`${He} secretly likes being raped <span class="hotpink">and wants more.</span>`);
					slave.devotion += 1;
				} else if (slave.sexualQuirk === SexualQuirk.GAGFUCK) {
					r.push(`${He} secretly enjoys the oral abuse <span class="hotpink">and wants more.</span>`);
					slave.devotion += 1;
				} else if (slave.sexualQuirk === SexualQuirk.PAINAL) {
					r.push(`${He} secretly gets off on assrape <span class="hotpink">and wants more.</span>`);
					slave.devotion += 1;
				}
			} else {
				r.push(`is forced to serve your other slaves' sexual needs by ${his} fear. Being used on pain of punishment <span class="hotpink">habituates ${him} to subservience</span> and <span class="gold">keeps ${him} fearful.</span>`);
				slave.trust -= 2;
				slave.devotion += 2;
				if (slave.sexualQuirk === SexualQuirk.STRUGGLE) {
					r.push(`${He} privately likes being abused <span class="hotpink">and accepts it.</span>`);
					slave.devotion += 1;
				} else if (slave.sexualQuirk === SexualQuirk.GAGFUCK) {
					r.push(`${He} privately likes being an oral toy and <span class="hotpink">and accepts it.</span>`);
					slave.devotion += 1;
				} else if (slave.sexualQuirk === SexualQuirk.PAINAL) {
					r.push(`${He} privately likes being an anal toy <span class="hotpink">and accepts it.</span>`);
					slave.devotion += 1;
				}
			}
		} else {
			r.push(`obediently serves your other slaves' sexual needs. Being used as a sexual outlet for everyone <span class="hotpink">keeps ${him} in a good frame of mind.</span>`);
			slave.devotion += 2;
			if (slave.sexualQuirk === SexualQuirk.STRUGGLE) {
				r.push(`${He} <span class="hotpink">openly enjoys</span> how other slaves can take whatever they want from ${him}.`);
				slave.devotion += 1;
			} else if (slave.sexualQuirk === SexualQuirk.GAGFUCK) {
				r.push(`${He} <span class="hotpink">openly enjoys</span> how other slaves can order ${him} to lick, suck or blow anything at all.`);
				slave.devotion += 1;
			} else if (slave.sexualQuirk === SexualQuirk.PAINAL) {
				r.push(`${He} <span class="hotpink">openly enjoys</span> how other slaves can shove anything up ${his} butt without asking first.`);
				slave.devotion += 1;
			}
		}
		if (!canWalk(slave) && canMove(slave)) {
			r.push(`Since ${he}'s forced to crawl around, ${he}'s especially vulnerable.`);
		} else if (!canMove(slave)) {
			r.push(`Since ${he}'s completely immobile, ${he}'s especially vulnerable.`);
		}
		// week-end reassignment (returning to previous job) can fuck up the subslave count if she's the only one...normally this should never happen
		if (App.EndWeek.saVars.subSlaveRatio === 0) {
			r.push(`${He}'s just returning to ${his} job, so ${he} doesn't get much action this week.`);
			return;
		}
		const subSlaves = App.EndWeek.saVars.subSlaveMap.get(0) || [];
		if ((V.dormitoryPopulation + V.roomsPopulation - subSlaves.length) > 5) {
			const load = App.EndWeek.saVars.subSlaveRatio;
			if (load > 0.8) {
				r.push(`Since there are enough other slaves servicing your stock alongside ${him}, ${he} sees limited action.`);
			} else if (load > 0.5) {
				r.push(`With ${his} servicing sisters, ${his} workload is reasonable and ${he} isn't overworked.`);
			} else if (load > 0.2) {
				r.push(`While ${he} may have support in servicing your stock, ${he} is <span class="health dec">overwhelmed by their collective need.</span>`);
				cumdumpHeavyUseDevotion(slave);
			} else {
				r.push(`Since`);
				if (subSlaves.length === 1) {
					r.push(`${he} is the only slave`);
				} else {
					r.push(`there are so few other slaves`);
				}
				r.push(`servicing your stock, ${he} is used to the <span class="health dec">point of exhaustion.</span>`);
				healthDamage(slave, 10);
				if (V.seeStretching === 1 && App.EndWeek.saVars.averageDick > 5) {
					if (canDoVaginal(slave) && slave.vagina.isBetween(0, 4)) {
						if ((slave.vagina * 40) - (App.EndWeek.saVars.averageDick * 5) < random(1, 100)) {
							r.push(`So many huge dicks pistoning in and out of ${his} pussy <span class="lime">loosen ${him} up.</span>`);
							slave.vagina++;
							actX(slave, "vaginal", 3);
						}
					}
					if (canDoAnal(slave) && slave.anus.isBetween(0, 4)) {
						if ((slave.anus * 40) - (App.EndWeek.saVars.averageDick * 5) < random(1, 100)) {
							r.push(`<span class="lime">${His} asshole is loosened</span> after being pounded by so many giant cocks.`);
							slave.anus++;
							actX(slave, "anal", 3);
						}
					}
				}
				cumdumpHeavyUseDevotion(slave);
			}
		} else {
			r.push(`Since you have so few slaves in need of release, ${he} sees little action.`);
		}
		// service the fraction of the eligible slave population that's not served by another subslave between 1 and 5 times per day
		fuckCount = Math.ceil((random(7, 35) / App.EndWeek.saVars.subSlaveRatio) * healthPenalty(slave));
		SimpleSexAct.Slave(slave, fuckCount);
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function addFuckCount(slave) {
		if (canPenetrate(domSlave)) {
			fuckCount = random(15, 25);
			r.push(SimpleSexAct.Slaves(slave, domSlave, fuckCount));
		} else if (canPenetrate(slave) && ((canDoVaginal(domSlave) && domSlave.vagina > 0) || (canDoAnal(domSlave) && domSlave.anus > 0))) {
			/* yes, that means she rides her */
			penetrativeUse = random(15, 25);
			r.push(SimpleSexAct.Slaves(domSlave, slave, fuckCount));
		} else {
			fuckCount = random(15, 25);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.Entity.SlaveState} domSlave
	 */
	function knockUpAnal(slave, domSlave) {
		seX(domSlave, "anal", slave, "penetrative", penetrativeUse);
		if (canImpreg(domSlave, slave)) {
			knockMeUp(domSlave, 30, 1, slave.ID);
			if (domSlave.pregKnown === 1) {
				const {he2, his2} = getPronouns(domSlave).appendSuffix('2');
				r.push(`With so many potent deposits into ${his2} fertile rear, it comes as little surprise when <span class="lime">${he2} ends up pregnant with ${subName}'s child.</span>`);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.Entity.SlaveState} domSlave
	 */
	function stimulateSlaveProstate(slave, domSlave) {
		const {he2, his2} = getPronouns(domSlave).appendSuffix('2');
		r.push(`${domName} has ${his2} own private semen dispenser. ${domName} sometimes gets tired of having to work hard for cum, so ${he2} spends the week`);
		if (hasAnyArms(domSlave)) {
			r.push(`stimulating poor ${subName}'s`);
		} else {
			r.push(`ordering ${subName} to stimulate ${his} own`);
		}
		if (slave.prostate) {
			r.push(`prostate`);
		} else {
			r.push(`balls`);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function subLife(slave) {
		const {
			he2, him2, his2, himself2,
		} = getPronouns(domSlave).appendSuffix('2');

		/** @type {FC.Race|""} */
		let domRace;
		/** @type {FC.Race|""} */
		let subRace;
		if (V.seeRace === 1) {
			domRace = domSlave.race;
			subRace = slave.race;
		} else {
			domRace = "";
			subRace = "";
		}

		r.push(`is serving <strong>${domName}</strong> this week.`);
		if (hasAnyLegs(domSlave) && !canMove(slave)) {
			r.push(`Since ${subName} cannot move, ${domName} has no trouble taking whatever ${he2} wants from ${him}.`);
		} else if (isAmputee(domSlave)) {
			r.push(`Since ${he2} has no limbs, ${domName} has to put forth extra effort taking whatever ${he2} wants from ${subName}.`);
		}

		if (canPenetrate(domSlave)) {
			if (slave.anus === 0 && canDoAnal(slave) && slave.vagina === 0 && canDoVaginal(slave)) {
				r.push(`Of course, ${he2} respects ${subName}'s virgin holes and does not penetrate ${him}.`);
			} else if (slave.anus === 0 && canDoAnal(slave)) {
				r.push(`Of course, ${he2} respects ${subName}'s anal virginity and does not penetrate ${him} there.`);
			} else if (slave.vagina === 0 && canDoVaginal(slave)) {
				r.push(`Of course, ${he2} respects ${subName}'s virginity and does not penetrate ${his} pussy.`);
			}
		}

		const hands = hasBothArms(slave) ? "hands" : "hand";
		if (domSlave.fetishStrength > 60 && domSlave.fetish === Fetish.BUTTSLUT) {
			domSlaveUsedFetish = 1;
			if (canPenetrate(slave) && canDoAnal(domSlave) && (domSlave.anus !== 0)) {
				if (slave.devotion < -20) {
					if (domFetishKnown) {
						r.push(`Since ${domName} loves anal,`);
					} else {
						r.push(`${domName}, it turns out, <span class="lightcoral">really likes anal,</span> so`);
						domSlave.fetishKnown = 1;
					}
					r.push(`${subName} finds ${himself} forced to use ${his} stiff prick to please ${domName}'s insatiable ass. ${He} spends the week trying to avoid ${domName}, because ${domName} won't stop forcing ${him} to get ${his} ${subRace} dick hard so ${domName} can ride ${his2} ${domRace} butt up and down on it. <span class="hotpink">${domName} enjoys having ${his2} own personal cock for the week,</span> even if it does have to be persuaded.`);
				} else if (slave.devotion <= 50) {
					if (domFetishKnown) {
						r.push(`Since ${domName} loves anal,`);
					} else {
						r.push(`${domName}, it turns out, <span class="lightcoral">really likes anal,</span> so`);
						domSlave.fetishKnown = 1;
					}
					r.push(`${subName} finds ${himself} constantly asked to use ${his} stiff prick to please ${domName}'s insatiable ass. ${He} spends the week desperately trying to keep ${himself} hard, because ${domName} constantly expects ${his} ${subRace} dick to be erect so ${domName} can ride ${his2} ${domRace} butt up and down on it. <span class="hotpink">${domName} enjoys having ${his2} own personal cock for the week.</span>`);
				} else {
					if (domFetishKnown) {
						r.push(`Since ${domName} loves anal and ${subName} has a stiff prick,`);
					} else {
						r.push(`${domName}, it turns out, <span class="lightcoral">really likes anal</span> and ${subName} has a stiff prick, so`);
						domSlave.fetishKnown = 1;
					}
					r.push(`the two of them have good fun together.`);
					if (hasAnyLegs(domSlave)) {
						r.push(`${domName} pulls ${his2} anal ${girl}toy into bathrooms and corners constantly`);
					} else {
						r.push(`${domName} has ${his2} anal ${girl}toy hold ${his2}`);
						if (isAmputee(domSlave)) {
							r.push(`limbless`);
						}
						r.push(`torso`);
					}
					r.push(`so ${he2} can ride that ${subRace} dick with ${his2} ${domRace} butt. <span class="hotpink">${domName} enjoys a week of constant butt loving.</span>`);
				}
				penetrativeUse = random(9, 12);
				seX(domSlave, "anal", slave, "penetrative", penetrativeUse);
				knockUpAnal(slave, domSlave);
			} else if (canDoAnal(domSlave)) {
				if (slave.devotion < -20) {
					if (domFetishKnown) {
						r.push(`Since ${domName} loves anal,`);
					} else {
						r.push(`${domName}, it turns out, <span class="lightcoral">really likes anal,</span> so`);
						domSlave.fetishKnown = 1;
					}
					r.push(`${subName} finds ${himself} forced to give analingus on command. ${He} spends the week trying to avoid servicing ${domName}'s insatiable ${domRace} ass with ${his} ${subRace} mouth, but ${domName} insists. <span class="hotpink">${domName} enjoys being able to force ${subName} to service ${his2} butt.</span>`);
				} else if (slave.devotion <= 50) {
					if (domFetishKnown) {
						r.push(`Since ${domName} loves anal,`);
					} else {
						r.push(`${domName}, it turns out, <span class="lightcoral">really likes anal,</span> so`);
						domSlave.fetishKnown = 1;
					}
					r.push(`${subName} finds ${himself} giving analingus on command. ${He} spends the week servicing ${domName}'s insatiable ${domRace} ass with ${his} ${subRace} mouth. <span class="hotpink">${domName} enjoys having ${his2} ass pleasured whenever ${he2} wants it.</span>`);
				} else {
					if (domFetishKnown) {
						r.push(`Since ${domName} loves anal play,`);
					} else {
						r.push(`${domName}, it turns out, <span class="lightcoral">really likes anal play,</span> so`);
						domSlave.fetishKnown = 1;
					}
					r.push(`${subName} lavishes attention on ${his2} butt. ${He} spends the week servicing ${domName}'s insatiable ${domRace} ass with ${his} ${subRace} mouth. <span class="hotpink">${domName} enjoys having an enthusiastic anal playmate.</span>`);
				}
				oralUse = random(9, 12);
				seX(slave, "oral", domSlave, "anal", oralUse);
			} else {
				if (slave.devotion < -20) {
					if (domFetishKnown) {
						r.push(`Since ${domName} loves ${his2} rear,`);
					} else {
						r.push(`${domName}, it turns out, <span class="lightcoral">really likes ${his2} rear touched,</span> so`);
						domSlave.fetishKnown = 1;
					}
					r.push(`${subName} finds ${himself} forced to`);
					if (!hasAnyArms(slave)) {
						r.push(`massage`);
					} else {
						r.push(`fondle`);
					}
					r.push(`it on command. ${He} spends the week trying to avoid servicing ${domName}'s ${domRace} ass with ${his} ${subRace}`);
					if (!hasAnyArms(slave)) {
						r.push(`face,`);
					} else {
						r.push(`${hands},`);
					}
					r.push(`but ${domName} insists. <span class="hotpink">${domName} enjoys being able to force ${subName} to service ${his2} butt.</span>`);
				} else if (slave.devotion <= 50) {
					if (domFetishKnown) {
						r.push(`Since ${domName} loves ${his2} rear,`);
					} else {
						r.push(`${domName}, it turns out, <span class="lightcoral">really likes ${his2} rear touched,</span> so`);
						domSlave.fetishKnown = 1;
					}
					r.push(`${subName} finds ${himself}`);
					if (!hasAnyArms(slave)) {
						r.push(`massaging`);
					} else {
						r.push(`fondling`);
					}
					r.push(`it on command. ${He} spends the week servicing ${domName}'s ${domRace} ass with ${his} ${subRace}`);
					if (!hasAnyArms(slave)) {
						r.push(`face.`);
					} else {
						r.push(`${hands}.`);
					}
					r.push(`<span class="hotpink">${domName} enjoys having ${his2} ass pleasured whenever ${he2} wants it.</span>`);
				} else {
					if (domFetishKnown) {
						r.push(`Since ${domName} loves ${his2} rear played with,`);
					} else {
						r.push(`${domName}, it turns out, <span class="lightcoral">really likes ${his2} rear played with,</span> so`);
						domSlave.fetishKnown = 1;
					}
					r.push(`${subName} lavishes attention on ${his2} butt. ${He} spends the week fondling ${domName}'s ${domRace} ass with ${his} ${subRace}`);
					if (!hasAnyArms(slave)) {
						r.push(`face.`);
					} else {
						r.push(`${hands}.`);
					}
					r.push(`<span class="hotpink">${domName} enjoys having a playmate so fond of ${his2} booty.</span>`);
				}
			}
			if (slave.need && slave.fetish === Fetish.BUTTSLUT) {
				if (slave.fetishKnown) {
					r.push(`${subName} needs this kind of play to be truly sexually satisfied; this week, the ass-shaped hole in ${his} life was filled.`);
				}
				subSlaveLikedFetish = 1;
			}
		} else if (slave.devotion >= -20 && domSlave.fetish === Fetish.SUBMISSIVE && domSlave.fetishStrength > 60) {
			domSlaveUsedFetish = 1;
			if (domFetishKnown) {
				r.push(`${domName} loves to submit, and tells`);
			} else {
				r.push(`${domName}, it turns out, <span class="lightcoral">really likes submission,</span> so ${he2} tells`);
				domSlave.fetishKnown = 1;
			}
			r.push(`${subName} to fuck ${him2}; when ${subName} asks how, ${domName} tells ${him} to take charge.`);
			if (canPenetrate(slave)) {
				penetrativeUse = random(9, 12);
				if (isAmputee(slave)) {
					if (canDoVaginal(domSlave) && domSlave.vagina !== 0) {
						r.push(`${domName} finds ${himself2} under the weight of ${subName}'s limbless body and ${his2} ${domRace} slit accommodating an eager ${subRace} cock. Afterward, ${domName} lavishes kisses on ${his2} satisfactory top for ${his} efforts. ${domName} <span class="hotpink">enjoys a week of constant submission,</span> and even though ${he}'s technically being used, ${subName} <span class="hotpink">doesn't mind</span> being expected to fuck a willing pussy.`);
						seX(domSlave, "vaginal", slave, "penetrative", penetrativeUse);
						if (canImpreg(domSlave, slave)) {
							knockMeUp(domSlave, 30, 0, slave.ID);
							if (domSlave.pregKnown === 1) {
								r.push(`With so many potent loads kissing ${his2} cervix, it comes as little surprise when <span class="lime">${he2} ends up pregnant with ${subName}'s child.</span>`);
							}
						}
					} else if (canDoAnal(domSlave) && domSlave.anus !== 0) {
						r.push(`${domName} finds ${himself2} under the weight of ${subName}'s limbless body and ${his2} ${domRace} ass accommodating an eager ${subRace} cock. Afterward, ${domName} lavishes kisses on ${his2} satisfactory top for ${his} efforts. ${domName} <span class="hotpink">enjoys a week of constant submission,</span> and even though ${he}'s technically being used, ${subName} <span class="hotpink">doesn't mind</span> being expected to fuck a willing asshole.`);
						knockUpAnal(slave, domSlave);
					} else {
						r.push(`${domName} finds ${his2} head under the weight of ${subName}'s limbless body and ${his2} ${domRace} face accommodating an eager ${subRace} cock. Afterward, ${domName} lavishes kisses on ${his2} satisfactory top for ${his} efforts. ${domName} <span class="hotpink">enjoys a week of constant submission,</span> and even though ${he}'s technically being used, ${subName} <span class="hotpink">doesn't mind</span> being expected to fuck a willing asshole.`);
						seX(domSlave, "oral", slave, "penetrative", penetrativeUse);
					}
				} else {
					if (canDoVaginal(domSlave) && domSlave.vagina !== 0) {
						r.push(`${domName} finds ${himself2} with ${his2} face pushed firmly into ${his2} bedsheets and ${his2} ${domRace} slit accommodating ${subName}'s eager ${subRace} cock. Afterward, ${domName} lavishes kisses on ${his2} satisfactory top. ${domName} <span class="hotpink">enjoys a week of constant submission,</span> and even though ${he}'s technically being used, ${subName} <span class="hotpink">doesn't mind</span> being expected to fuck a willing pussy.`);
						seX(domSlave, "vaginal", slave, "penetrative", penetrativeUse);
						if (canImpreg(domSlave, slave)) {
							r.push(knockMeUp(domSlave, 30, 0, slave.ID));
							if (domSlave.pregKnown === 1) {
								r.push(`With so many potent loads kissing ${his2} cervix, it comes as little surprise when <span class="lime">${he2} ends up pregnant with ${subName}'s child.</span>`);
							}
						}
					} else if (canDoAnal(domSlave) && domSlave.anus !== 0) {
						r.push(`${domName} finds ${himself2} with ${his2} face pushed firmly into ${his2} bedsheets and ${his2} ${domRace} ass accommodating ${subName}'s eager ${subRace} cock. Afterward, ${domName} lavishes kisses on ${his2} satisfactory top. ${domName} <span class="hotpink">enjoys a week of constant submission,</span> and even though ${he}'s technically being used, ${subName} <span class="hotpink">doesn't mind</span> being expected to fuck a willing asshole.`);
						seX(domSlave, "anal", slave, "penetrative", penetrativeUse);
						if (canImpreg(domSlave, slave)) {
							r.push(knockMeUp(domSlave, 30, 1, slave.ID));
							if (domSlave.pregKnown === 1) {
								r.push(`With so many potent deposits into ${his2} fertile rear, it comes as little surprise when <span class="lime">${he2} ends up pregnant with ${subName}'s child.</span>`);
							}
						}
					} else {
						r.push(`${domName} finds ${himself2} with ${his2} face pushed firmly into ${subName}'s crotch and ${his2} ${domRace} face accommodating an eager ${subRace} cock. Afterward, ${domName} lavishes kisses on ${his2} satisfactory top. ${domName} <span class="hotpink">enjoys a week of constant submission,</span> and even though ${he}'s technically being used, ${subName} <span class="hotpink">doesn't mind</span> being expected to fuck a willing asshole.`);
						seX(domSlave, "oral", slave, "penetrative", penetrativeUse);
					}
				}
			} else if (slave.clit > 2) {
				if (isAmputee(slave)) {
					r.push(`${domName} finds ${himself2} pinned by the weight of ${subName}'s limbless body and ${his} quickly hardening ${subRace} clit being pushed eagerly into ${his2} ${domRace} mouth. Afterward, ${domName} lavishes kisses on ${his2} satisfactory top for ${his} efforts.`);
				} else {
					r.push(`${domName} finds ${himself2} with ${his2} back pushed firmly into ${his2} bedsheets and ${subName}'s quickly hardening clit being pushed eagerly into ${his2} mouth. Afterward, ${domName} lavishes kisses on ${his2} satisfactory top.`);
				}
				r.push(`${domName} <span class="hotpink">enjoys a week of constant submission,</span> and even though ${he}'s technically being used, ${subName} <span class="hotpink">doesn't mind</span> constant oral attention.`);
				penetrativeUse = random(9, 12);
				seX(domSlave, "oral", slave, "penetrative", penetrativeUse);
			} else {
				if (isAmputee(slave)) {
					if (canDoVaginal(domSlave)) {
						r.push(`${domName} finds ${himself2} under the weight of ${subName}'s limbless body and ${his2} ${domRace} slit molested by an eager tongue. Afterward, ${domName} lavishes kisses on ${his2} satisfactory top for ${his} efforts. ${domName} <span class="hotpink">enjoys a week of constant submission,</span> and even though ${he}'s technically being used, ${subName} <span class="hotpink">doesn't mind</span> being expected to torment a willing pussy.`);
						oralUse = random(9, 12);
						seX(domSlave, "vaginal", slave, "vaginal", oralUse);
					} else if (!(domSlave.chastityPenis) && domSlave.dick > 0) {
						r.push(`${domName} finds ${himself2} under the weight of ${subName}'s limbless body with the tight embrace of ${subRace} lips around ${his2} ${domRace} cock. Afterward, ${domName} lavishes kisses on ${his2} satisfactory top for ${his} efforts. ${domName} <span class="hotpink">enjoys a week of constant submission,</span> and even though ${he}'s technically being used, ${subName} <span class="hotpink">doesn't mind</span> being expected to torment a willing dick.`);
						oralUse = random(9, 12);
						seX(slave, "oral", domSlave, "penetrative", oralUse);
					} else {
						r.push(`${domName} finds ${himself2} under the weight of ${subName}'s limbless body and`);
						if (domSlave.boobs >= 300) {
							r.push(`${his2} ${domRace} tits`);
						} else {
							r.push(`${his2} ${nippleColor(domSlave)} nipples`);
						}
						r.push(`under attack by an eager mouth. Afterward, ${domName} lavishes kisses on ${his2} satisfactory top for ${his} efforts. ${domName} <span class="hotpink">enjoys a week of constant submission,</span> and even though ${he}'s technically being used, ${subName} <span class="hotpink">doesn't mind</span> being expected to play with a willing chest.`);
						oralUse = random(9, 12);
						seX(slave, "oral", domSlave, "mammary", oralUse);
					}
				} else {
					if (canDoVaginal(domSlave) && domSlave.vagina !== 0) {
						r.push(`${domName} finds ${himself2} with ${his2} face pushed firmly into ${his2} bedsheets and ${his2} ${domRace} slit accommodating ${subName}'s thrusting ${subRace} fingers. Afterward, ${domName} lavishes kisses on ${his2} satisfactory top. ${domName} <span class="hotpink">enjoys a week of constant submission,</span> and even though ${he}'s technically being used, ${subName} <span class="hotpink">doesn't mind the fun.</span>`);
						fuckCount = random(9, 12);
						seX(domSlave, "vaginal", slave, "penetrative", fuckCount);
					} else if (canDoAnal(domSlave) && domSlave.anus !== 0) {
						r.push(`${domName} finds ${himself2} with ${his2} face pushed firmly into ${his2} bedsheets and ${his2} ${domRace} ass accommodating ${subName}'s thrusting ${subRace} fingers. Afterward, ${domName} lavishes kisses on ${his2} satisfactory top. ${domName} <span class="hotpink">enjoys a week of constant submission,</span> and even though ${he}'s technically being used, ${subName} <span class="hotpink">doesn't mind the fun.</span>`);
						fuckCount = random(9, 12);
						seX(domSlave, "anal", slave, "penetrative", fuckCount);
					} else {
						r.push(`${domName} finds ${himself2} pushed firmly into ${his2} bedsheets and ${his2}`);
						if (domSlave.boobs >= 300) {
							r.push(`${domRace} tits`);
						} else {
							r.push(`${nippleColor(domSlave)} nipples`);
						}
						r.push(`being roughly handled by ${subName}'s ${subRace} fingers. Afterward, ${domName} lavishes kisses on ${his2} satisfactory top. ${domName} <span class="hotpink">enjoys a week of constant submission,</span> and even though ${he}'s technically being used, ${subName} <span class="hotpink">doesn't mind the fun.</span>`);
						fuckCount = random(9, 12);
						seX(domSlave, "mammary", slave, "penetrative", fuckCount);
					}
				}
			}
			if (slave.need && slave.fetish === Fetish.DOM) {
				if (slave.fetishKnown) {
					r.push(`${subName} needs this kind of power to be truly sexually satisfied; this week, ${his} desire to control is sated.`);
				}
				subSlaveLikedFetish = 1;
			}
			slave.devotion += 1;
		} else if (slave.devotion >= -20 && domSlave.fetishStrength > 60 && domSlave.fetish === Fetish.DOM && canWalk(domSlave)) {
			domSlaveUsedFetish = 1;
			if (domFetishKnown) {
				r.push(`${domName} loves to dominate,`);
			} else {
				r.push(`${domName}, it turns out, <span class="lightcoral">really likes domination,</span>`);
				domSlave.fetishKnown = 1;
			}
			r.push(`and the first indication ${subName} gets of what ${he}'s in for this week is when ${domName} ambushes ${him} in the dormitory, tackles ${him} from behind, and`);
			if (isAmputee(slave)) {
				r.push(`bursts out`);
				if (canTalk(domSlave)) {
					r.push(`laughing`);
				} else {
					r.push(`in silent laughter`);
				}
				r.push(`at ${his} inability to right ${himself} without limbs.`);
			} else {
				r.push(`hogties ${him} with sheets.`);
			}
			r.push(`${subName} wriggles a little but doesn't really start to attempt escape until ${domName} begins to carefully tease ${his} ${subRace}`);
			if (slave.dick > 0 && !(slave.chastityPenis)) {
				r.push(`dickhead,`);
			} else if (slave.clit > 0) {
				r.push(`clit,`);
			} else if (canDoVaginal(slave)) {
				r.push(`pussy,`);
			} else {
				r.push(`nipples,`);
			}
			r.push(`edging ${him} right up to the point of orgasm and making ${him} beg. It's a long but <span class="hotpink">obedience-building</span> week for ${subName}, and ${domName} certainly <span class="hotpink">enjoys ${his2} toy.</span>`);
			slave.devotion += 1;
			if (slave.need && slave.fetish === Fetish.SUBMISSIVE) {
				if (slave.fetishKnown) {
					r.push(`${subName} needs this kind of treatment to be truly sexually satisfied; this week, ${his} desire to be controlled is sated.`);
				}
				subSlaveLikedFetish = 1;
			}
		} else if (domSlave.fetishStrength > 60 && domSlave.fetish === Fetish.SADIST && canWalk(domSlave)) {
			domSlaveUsedFetish = 1;
			if (domFetishKnown) {
				r.push(`${domName} loves to inflict pain,`);
			} else {
				r.push(`${domName}, it turns out, <span class="lightcoral">really likes inflicting pain,</span>`);
				domSlave.fetishKnown = 1;
			}
			r.push(`and the first indication ${subName} gets of what ${he}'s in for this week is when ${domName} ambushes ${him} in the dormitory, tackles ${him} from behind, and hogties ${him} with sheets.`);
			if (canTalk(domSlave)) {
				r.push(`${domName} bends close to the immobilized ${subName}'s ear and whispers to ${him} that ${he} might as well scream.`);
			} else {
				r.push(`${domName} carefully uses gestures to communicate to ${him} that ${he} might as well scream.`);
			}
			r.push(`${subName}'s struggles to escape become desperate at this, and more desperate still when the week's first <span class="health dec">beating</span> starts. Later, ${he} tries going limp and unresistant, but that just makes the annoyed ${domName} beat ${his2} pain slave all the harder until ${he2} gets a reaction again. It's a long and <span class="hotpink">will breaking</span> week for ${subName}, and ${domName} certainly <span class="hotpink">enjoys torturing ${his2} toy.</span>`);
			slave.devotion += 1;
			healthDamage(slave, 3);
			if (slave.need && slave.fetish === Fetish.MASOCHIST) {
				if (slave.fetishKnown) {
					r.push(`${subName} needs this kind of treatment to be truly sexually satisfied; this week, ${his} desire for abuse is sated.`);
				}
				subSlaveLikedFetish = 1;
			}
		} else if (domSlave.fetishStrength > 60 && domSlave.fetish === Fetish.MASOCHIST && hasAnyLimbs(slave)) {
			domSlaveUsedFetish = 1;
			if (domFetishKnown) {
				r.push(`${domName} loves pain,`);
			} else {
				r.push(`${domName}, it turns out, <span class="lightcoral">really likes pain,</span>`);
				domSlave.fetishKnown = 1;
			}
			r.push(`and the first indication ${subName} gets of what ${he}'s in for this week is when ${domName}`);
			if (canHold(domSlave)) {
				r.push(`hands ${him}`);
			} else if (canTalk(domSlave)) {
				r.push(`orders ${him} to pick up`);
			} else {
				r.push(`gestures at`);
			}
			if (domFetishKnown) {
				r.push(`${his2} favorite`);
			} else {
				r.push(`a`);
			}
			r.push(`crop and implores ${subName} to punish ${him2}; ${domName} has been bad and ${subName} needs to teach ${him2} a lesson. ${subName} spends a long and <span class="trust inc">empowering</span> week learning new ways to <span class="health dec">inflict pain</span> on someone, not that the <span class="hotpink">thoroughly bruised ${domName} will complain.</span>`);
			slave.trust += 1;
			healthDamage(domSlave, 3);
			if (slave.need && slave.fetish === Fetish.SADIST) {
				if (slave.fetishKnown) {
					r.push(`${subName} needs this kind of play to be truly sexually satisfied; this week, ${his} desire to abuse is sated.`);
				}
				subSlaveLikedFetish = 1;
			}
		} else if (domSlave.fetishStrength > 60 && domSlave.fetish === Fetish.BOOBS && domSlave.boobs >= 300) { // I require flat content - focus on subSlave's tits unless she too is flat.
			domSlaveUsedFetish = 1;
			if (domSlave.nipples === NippleShape.FUCKABLE && canPenetrate(slave)) {
				if (domFetishKnown) {
					r.push(`Since ${domName} loves to have ${his2} nipples fucked,`);
				} else {
					r.push(`${domName}, it turns out, <span class="lightcoral">really likes having ${his2} nipples fucked,</span> so`);
					domSlave.fetishKnown = 1;
				}
				r.push(`${subName} spends the week getting to use ${his} dick for a change. ${subName}'s ${subRace} body thrusting into ${domName}'s supple ${domRace} breasts is a frequent sight as ${domName} takes ${his2} pleasure. <span class="hotpink">${domName} enjoys being able to use ${subName}.</span>`);
				penetrativeUse = random(9, 12);
				seX(domSlave, "mammary", slave, "penetrative", penetrativeUse);
			} else if (domSlave.lactation > 0) {
				if (domFetishKnown) {
					r.push(`Since ${domName} loves giving milk,`);
				} else {
					r.push(`${domName}, it turns out, <span class="lightcoral">really likes giving milk,</span> so`);
					domSlave.fetishKnown = 1;
				}
				if (slave.devotion < -20) {
					r.push(`${subName} finds ${himself} forced to nurse. ${He} spends the week trying to avoid guzzling down milk from ${domName}'s ${nippleColor(domSlave)} ${domRace} nipples with ${his} ${subRace} mouth, but ${domName} insists. <span class="hotpink">${domName} enjoys being able to force ${subName} to drink from ${him2}.</span>`);
				} else if (slave.devotion <= 50) {
					r.push(`${subName} finds ${himself} constantly nursing. ${He} spends the week obediently taking milk from ${domName}'s ${nippleColor(domSlave)} ${domRace} nipples with ${his} ${subRace} mouth, to ${domName}'s motherly satisfaction. <span class="hotpink">${domName} enjoys having ${subName} to drink from ${him2} whenever ${he2} feels overfull.</span>`);
				} else {
					r.push(`${subName} constantly nurses from ${him2}. ${He} spends the week happily taking milk from ${domName}'s ${nippleColor(domSlave)} ${domRace} nipples with ${his} hungry ${subRace} mouth, to ${domName}'s motherly delight. <span class="hotpink">${domName} loves having ${subName} to feed and fill.</span>`);
				}
			} else {
				if (domFetishKnown) {
					r.push(`Since ${domName} loves having ${his2} breasts attended to,`);
				} else {
					r.push(`${domName}, it turns out, <span class="lightcoral">really likes having ${his2} breasts touched,</span> so`);
					domSlave.fetishKnown = 1;
				}
				if (slave.devotion < -20) {
					r.push(`${subName} finds ${himself} forced to`);
					if (!hasAnyArms(slave)) {
						r.push(`nuzzle and suck.`);
					} else {
						r.push(`knead, massage, and even suck.`);
					}
					r.push(`${He} spends the week trying to avoid servicing ${domName}'s ${domRace} breasts with ${his} ${subRace}`);
					if (!hasAnyArms(slave)) {
						r.push(`face,`);
					} else {
						r.push(`${hands},`);
					}
					r.push(`but ${domName} insists. <span class="hotpink">${domName} enjoys being able to force ${subName} to see to ${his2} tits.</span>`);
				} else if (slave.devotion <= 50) {
					r.push(`${subName} finds ${himself}`);
					if (!hasAnyArms(slave)) {
						r.push(`nuzzling and sucking.`);
					} else {
						r.push(`kneading, massaging, and even sucking.`);
					}
					r.push(`${He} spends the week obediently servicing ${domName}'s ${domRace} breasts with ${his} ${subRace}`);
					if (!hasAnyArms(slave)) {
						r.push(`face,`);
					} else {
						r.push(`${hands},`);
					}
					r.push(`to ${domName}'s languorous pleasure. <span class="hotpink">${domName} enjoys having ${subName} to see to ${his2} tits.</span>`);
				} else {
					r.push(`${subName} pampers ${his2} breasts shamelessly. ${He} spends the week devotedly massaging ${domName}'s ${domRace} breasts with ${his} ${subRace}`);
					if (!hasAnyArms(slave)) {
						r.push(`face,`);
					} else {
						r.push(`${hands},`);
					}
					r.push(`sucking lovingly at ${his2} nipples, and caring for everything with lotions and`);
					if (!hasAnyArms(slave)) {
						r.push(`oils (as best ${he} can without hands).`);
					} else {
						r.push(`oils.`);
					}
					r.push(`They sleep together so that ${subName} can`);
					if (!hasAnyArms(slave)) {
						r.push(`snuggle into ${his2} bust`);
					} else {
						r.push(`hold ${his2} boobs`);
					}
					r.push(`as ${he} goes to sleep, which sometimes results in less sleep for both as the breast play continues long into the night. <span class="hotpink">${domName} enjoys having ${subName} to see to ${his2} tits.</span>`);
				}
			}
			if (domSlave.lactation > 0) {
				domSlave.lactationDuration = 2;
				domSlave.boobs -= domSlave.boobsMilk;
				domSlave.boobsMilk = 0;
			}
			oralUse = random(9, 12);
			seX(domSlave, "mammary", slave, "penetrative", oralUse);
			if (slave.need && slave.fetish === Fetish.BOOBS) {
				if (slave.fetishKnown) {
					r.push(`${subName} needs this kind of play to be truly sexually satisfied; this week,`);
					if (slave.boobs < 400) {
						r.push(`the breast-shaped holes in ${his} life were filled.`);
					} else {
						r.push(`${his} desire for more tits in ${his} life was sated.`);
					}
				}
				subSlaveLikedFetish = 1;
			}
		} else if (slave.balls !== 0 && ((slave.chastityPenis === 0 && slave.dick > 0) || (slave.chastityVagina === 0)) && domSlave.fetishStrength > 60 && domSlave.fetish === Fetish.CUMSLUT) {
			domSlaveUsedFetish = 1;
			if (canAchieveErection(slave)) {
				if (domFetishKnown) {
					r.push(`Since ${domName} loves cum, and ${subName} has a dick,`);
				} else {
					r.push(`${domName}, it turns out, <span class="lightcoral">really likes cum,</span> and ${subName} has a dick, so`);
					domSlave.fetishKnown = 1;
				}
				stimulateSlaveProstate(slave, domSlave);
				r.push(`to force ${him} to climax so ${domName} can wrap ${his2} ${domRace} lips around ${subName}'s ${subRace} dickhead to suck down ${his} cum. <span class="hotpink">${domName} enjoys having a servile dick on demand.</span>`);
			} else if (slave.dick > 0 && !canAchieveErection(slave)) {
				if (domFetishKnown) {
					r.push(`Since ${domName} loves cum, and ${subName} has a dick,`);
				} else {
					r.push(`${domName}, it turns out, <span class="lightcoral">really likes cum,</span> and ${subName} has a dick, so`);
					domSlave.fetishKnown = 1;
				}
				r.push(`${domName} has ${his2} own private semen dispenser, even if it's rather limp. ${domName} sometimes gets tired of having to work hard for cum, so ${he2} spends the week making ${subName} painstakingly bring ${his} flaccid dick almost to orgasm before ${domName} wraps ${his2} ${domRace} lips around ${subName}'s ${subRace} soft dickhead to suck down the cum. <span class="hotpink">${domName} enjoys having a servile dick on demand.</span>`);
			} else {
				if (domFetishKnown) {
					r.push(`Since ${domName} loves cum, and ${subName} has balls,`);
				} else {
					r.push(`${domName}, it turns out, <span class="lightcoral">really likes cum,</span> and ${subName} has balls, so`);
					domSlave.fetishKnown = 1;
				}
				stimulateSlaveProstate(slave, domSlave);
				r.push(`to force ${him} to climax so ${domName} can plant ${his2} ${domRace} lips over ${subName}'s ${subRace}`);
				if (slave.vagina >= 0) {
					r.push(`urethra`);
				} else {
					r.push(`smooth crotch`);
				}
				r.push(`to catch ${his} cum. <span class="hotpink">${domName} enjoys having ${his2} little sperm fountain.</span>`);
			}
			penetrativeUse = random(9, 12);
			seX(domSlave, "oral", slave, "penetrative", penetrativeUse);
		} else if (domSlave.fetishStrength > 60 && domSlave.fetish === Fetish.HUMILIATION && hasAnyLegs(slave)) {
			domSlaveUsedFetish = 1;
			if (domFetishKnown) {
				r.push(`Since ${domName} loves being degraded, and`);
			} else {
				r.push(`${domName}, it turns out, <span class="lightcoral">really likes being degraded,</span> so`);
				domSlave.fetishKnown = 1;
			}
			r.push(`the first indication ${subName} gets of what ${he}'s in for this week is when ${domName}`);
			if (canWalk(domSlave)) {
				r.push(`escorts ${him} to the cafeteria for lunch`);
			} else {
				r.push(`begs to be taken to the cafeteria for lunch`);
			}
			r.push(`and settles ${himself2}`);
			if (hasBothLegs(slave)) {
				r.push(`between ${subName}'s legs,`);
			} else {
				r.push(`in ${subName}'s crotch,`);
			}
			r.push(`before asking for ${his2} portion to be plated appropriately. ${subName} struggles to eat`);
			if (slave.dick > 0) {
				if (slave.chastityPenis) {
					r.push(`with an eager tongue probing the gaps around ${his} chastity cage trying to gather every last drop of slave food.`);
				} else {
					r.push(`while ${his}`);
					if (slave.dick === 1) {
						r.push(`tiny`);
					} else if (slave.dick === 2) {
						r.push(`cute`);
					} else if (slave.dick === 3) {
						r.push(`average`);
					} else if (slave.dick === 4) {
						r.push(`big`);
					} else if (slave.dick === 5) {
						r.push(`impressive`);
					} else if (slave.dick === 6) {
						r.push(`huge`);
					} else if (slave.dick === 7) {
						r.push(`gigantic`);
					} else if (slave.dick === 8) {
						r.push(`titanic`);
					} else if (slave.dick === 9) {
						r.push(`absurd`);
					} else if (slave.dick === 10) {
						r.push(`inhuman`);
					} else {
						r.push(`immense`);
					}
					if (canAchieveErection(slave)) {
						r.push(`erection`);
					} else {
						r.push(`dick`);
					}
					r.push(`is licked clean of any slave food clinging to it.`);
					if (domSlave.skill.oral - ((slave.dick * 15) - 20) >= 0) {
						r.push(`${subName} practically throws ${his} cup when ${domName} sucks the entire length of ${his} dick into ${his2} mouth and down ${his2} throat, and`);
					} else {
						r.push(`${subName} shudders as ${domName} wraps ${his2} lips around ${his} cockhead and`);
					}
					r.push(`struggles to maintain any sense of composure as ${domName} works for ${his2} dessert.`);
					if (slave.ballType !== "sterile" && slave.balls > 0) {
						r.push(`The stimulation inevitably sends ${him} over the edge,`);
						if (slave.vasectomy) {
							r.push(`forcing ${him} to buck and ram ${his} cock a little too far into ${domName}.`);
						} else if (slave.balls >= 30 || slave.prostate > 2) {
							r.push(`unleashing a massive spurt down ${domName}'s throat. ${domName} gags and pulls back, receiving the rest of ${subName}'s load across ${his2} face and body. ${domName} couldn't even come close to hiding what happened — just the way ${he2} likes it.`);
						} else if (slave.balls >= 10) {
							r.push(`filling ${domName}'s throat with such volume it sprays out ${his2} nose. ${domName} stands no chance of cleaning ${himself2} up without being seen — quite enjoyable, really.`);
						} else {
							r.push(`giving ${domName} a cum chaser to ${his2} meal.`);
						}
					} else {
						r.push(`But alas, ${subName}'s dispenser has nothing to give ${domName}, so ${his2} efforts are in vain — and in a way, ${he2} prefers it that way.`);
					}
				}
				penetrativeUse = 7;
				seX(domSlave, "oral", slave, "penetrative", penetrativeUse);
			} else if (slave.scrotum > 0) {
				r.push(`while ${his}`);
				if (slave.balls === 0) {
					r.push(`empty ballsack is`);
				} else if (slave.balls === 1) {
					r.push(`tiny balls are`);
				} else if (slave.balls === 2) {
					r.push(`small balls are`);
				} else if (slave.balls === 3) {
					r.push(`balls are`);
				} else if (slave.balls === 4) {
					r.push(`big balls are`);
				} else if (slave.balls === 5) {
					r.push(`lemon-sized balls are`);
				} else if (slave.balls < 9) {
					r.push(`fist-sized balls are`);
				} else if (slave.balls < 14) {
					r.push(`softball-sized balls are`);
				} else if (slave.balls < 30) {
					r.push(`melon-sized balls are`);
				} else {
					r.push(`${his} hypertrophied balls are`);
				}
				r.push(`licked and sucked clean of slave food.`);
				if (slave.balls > 0 && slave.ballType !== "sterile") {
					r.push(`The stimulation inevitably sends ${him} over the edge,`);
					if (slave.vasectomy) {
						r.push(`forcing ${him} to buck and smacking ${domName} into the underside of the table, spilling ${his} cup.`);
					} else if (slave.balls >= 30 || slave.prostate > 2) {
						r.push(`unleashing a veritable flood of semen across ${his} nuts. ${domName} sighs a little as ${his2} meal washes away, but sets to work on cleaning up the new mess all the same.`);
					} else if (slave.balls >= 10) {
						r.push(`completely refilling ${domName}'s makeshift bowl with a heavy second course — not that ${he2}'d complain.`);
					} else {
						r.push(`adding a mix of semen into ${domName}'s meal — which ${he2} wastes no time in lapping up.`);
					}
				}
				fuckCount = 7;
				seX(domSlave, "oral", slave, "penetrative", fuckCount);
			} else if (canDoVaginal(slave)) {
				r.push(`while ${his} pussy is being invaded by drops of slave food and the tongue pursuing them.`);
				if (slave.clit > 2) {
					r.push(`${subName} practically throws ${his} cup when ${domName} sucks the entire length of ${his} clit into ${his2} mouth.`);
				}
				fuckCount = 7;
				seX(domSlave, "oral", slave, "penetrative", fuckCount);
			} else {
				r.push(`with an eager tongue roaming ${his} thighs, pubic mound, and taint trying to lap up the slave food before it slips away.`);
				fuckCount = 7;
				seX(domSlave, "oral", slave, "penetrative", fuckCount);
			}
			r.push(`The lewdness emanating from beneath the table is not lost on the other diners, <span class="hotpink">much to ${domName}'s enjoyment.</span>`);
			if (slave.need && slave.fetish === Fetish.HUMILIATION) {
				if (slave.fetishKnown) {
					r.push(`${subName} needs this kind of exposure to be truly sexually satisfied; this week, ${his} desire for public sex is sated.`);
				}
				subSlaveLikedFetish = 1;
			}
		} else if (domSlave.fetishStrength > 60 && domSlave.fetish === Fetish.PREGNANCY) {
			domSlaveUsedFetish = 1;
			if (canImpreg(slave, domSlave)) {
				if (domFetishKnown) {
					r.push(`${domName} loves pregnancy, and`);
				} else {
					r.push(`${domName}, it turns out, <span class="lightcoral">really likes pregnancy,</span> so`);
					domSlave.fetishKnown = 1;
				}
				r.push(`the first indication ${subName} gets of what ${he}'s in for this week is when ${domName}`);
				if (hasAnyArms(domSlave)) {
					r.push(`pushes ${him} down,`);
				} else if (hasBothLegs(slave)) {
					r.push(`bends ${him} over,`);
				}
				if (slave.mpreg > 0 && slave.anus === 0) {
					r.push(`lines up ${his2} shot, and lands it perfectly in ${his} virgin asshole. ${subName} spends the week with ${his} rear in the air, covered in cum, allowing ${domName}'s potent sperm to seep into the depths of ${his} womb <span class="hotpink">until conception is all but assured.</span>`);
				} else if (slave.mpreg === 0 && slave.vagina === 0) {
					r.push(`lines up ${his2} shot, and lands it perfectly in ${his} virgin pussy. ${subName} spends the week with ${his} crotch in the air, filled with cum, allowing ${domName}'s potent sperm to seep into the depths of ${his} womb <span class="hotpink">until conception is all but assured.</span>`);
				} else {
					r.push(`mounts ${his} fertile ${slave.mpreg > 0 ? "ass" : ""}pussy and lets loose the first of many loads. ${subName} spends the week being thoroughly bred until ${domName}'s potent sperm <span class="hotpink">achieves ${his2} goal,</span> and then a bit more for good measure.`);
					fuckCount = random(10, 16);
					if (slave.mpreg > 0) {
						analUse = fuckCount;
						seX(slave, "anal", domSlave, "penetrative", fuckCount);
					} else {
						vaginalUse = fuckCount;
						seX(slave, "vaginal", domSlave, "penetrative", fuckCount);
					}
				}
				r.push(knockMeUp(slave, 100, 2, domSlave.ID));
			} else if (domSlave.pregKnown === 1 || slave.belly > 10000 || slave.bellyPreg >= 1500) {
				if (domSlave.pregKnown === 1) {
					if (domFetishKnown) {
						r.push(`Since ${domName} is pregnant,`);
					} else {
						r.push(`${domName}, it turns out, <span class="lightcoral">really likes ${his2} pregnancy,</span> so`);
						domSlave.fetishKnown = 1;
					}
					if (slave.devotion < -20) {
						r.push(`${subName} finds ${himself} forced to`);
						if (!hasAnyArms(slave)) {
							r.push(`nuzzle and lick`);
						} else {
							r.push(`massage, rub, and even tongue`);
						}
						r.push(`${his2} ${bellyAdjective(domSlave)} middle. ${He} spends the week trying to avoid contact with ${domName}'s ${domRace} belly with ${his} ${subRace}`);
						if (!hasAnyArms(slave)) {
							r.push(`face,`);
						} else {
							r.push(`${hands},`);
						}
						r.push(`but ${domName} insists. <span class="hotpink">${domName} enjoys being able to force ${subName} to attend to ${his2} gravidity.</span>`);
					} else if (slave.devotion <= 50) {
						r.push(`${subName} finds ${himself}`);
						if (!hasAnyArms(slave)) {
							r.push(`nuzzling and licking`);
						} else {
							r.push(`massaging, rubbing, and even licking`);
						}
						r.push(`${his2} ${bellyAdjective(domSlave)} middle. ${He} spends the week obediently servicing ${domName}'s ${domRace} belly with ${his} ${subRace}`);
						if (!hasAnyArms(slave)) {
							r.push(`face,`);
						} else {
							r.push(`${hands},`);
						}
						r.push(`to ${domName}'s languorous pleasure. <span class="hotpink">${domName} enjoys having ${subName} to attend to ${his2} gravidity.</span>`);
					} else {
						r.push(`${subName} pampers ${his2} ${bellyAdjective(domSlave)} middle shamelessly. ${He} spends the week devotedly massaging ${domName}'s ${domRace} middle with ${his} ${subRace}`);
						if (!hasAnyArms(slave)) {
							r.push(`face,`);
						} else {
							r.push(`${hands},`);
						}
						r.push(`lovingly teasing ${his2} ${domName.belly > 10000 ? "popped" : ""} navel, and staving off stretch marks with lotions and`);
						if (!hasAnyArms(slave)) {
							r.push(`oils (as best ${he} can without hands).`);
						} else {
							r.push(`oils.`);
						}
						r.push(`They sleep together so that ${subName} can`);
						if (!hasAnyArms(slave)) {
							r.push(`snuggle against ${his2} stomach`);
						} else {
							r.push(`clutch ${his2} stomach`);
						}
						r.push(`as ${he} goes to sleep, which sometimes results in less sleep for both as the fondling continues long into the night. <span class="hotpink">${domName} enjoys having ${subName} to attend to ${his2} gravidity.</span>`);
					}
				} else {
					if (domFetishKnown) {
						r.push(`${domName} loves pregnant ${girl}s,`);
					} else {
						r.push(`${domName}, it turns out, <span class="lightcoral">really likes pregnant ${girl}s,</span>`);
						domSlave.fetishKnown = 1;
					}
					r.push(`and ${subName} just so happens to be a pregnant ${girl}, so ${domName} spends the week fucking ${him}.`);
					if (slave.devotion < -20) {
						r.push(`${domName}'s ${domRace} body atop ${subName}'s swollen ${subRace} form is a frequent sight as ${domName} takes ${his2} pleasure. <span class="hotpink">${domName} enjoys being able to use ${subName} and ${his} ${bellyAdjective(slave)} belly.</span>`);
					} else if (slave.devotion <= 50) {
						r.push(`${domName}'s ${domRace} body atop ${subName}'s compliant swollen ${subRace} form is a frequent sight as ${domName} takes ${his2} pleasure. <span class="hotpink">${domName} enjoys being able to use ${subName} and ${his} ${bellyAdjective(slave)} belly.</span>`);
					} else {
						r.push(`${domName}'s ${domRace} body against ${subName}'s enthusiastic ${subRace} ${bellyAdjective(slave)} belly is a frequent sight as the two of them share pleasure. <span class="hotpink">${domName} enjoys having a pregnant plaything.</span>`);
					}
					addFuckCount(slave);
				}
			} else if (canImpreg(domSlave, slave)) {
				if (domFetishKnown) {
					r.push(`${domName} loves pregnancy, and`);
				} else {
					r.push(`${domName}, it turns out, <span class="lightcoral">really likes pregnancy,</span> so`);
					domSlave.fetishKnown = 1;
				}
				r.push(`the first indication ${subName} gets of what ${he}'s in for this week is when ${domName}`);
				if (hasAnyLimbs(domSlave)) {
					r.push(`pushes ${him} down`);
				} else {
					r.push(`has ${him} get in position`);
				}
				if (canPenetrate(slave)) {
					r.push(`and mounts ${his} rigid dick.`);
				} else {
					r.push(`and begins to work ${him} to orgasm.`);
				}
				r.push(`${domName} spends the week extracting loads from ${subName} until ${his} potent sperm <span class="hotpink">slakes the burning need in ${his2} loins.</span>`);
				r.push(knockMeUp(domSlave, 100, 2, slave.ID));
				fuckCount = random(10, 16);
				penetrativeUse = fuckCount;
				seX(domSlave, domSlave.mpreg ? "anal" : "vaginal", slave, "penetrative", fuckCount);
			} else {
				if (domFetishKnown) {
					r.push(`${domName} adores pregnancy, and`);
				} else {
					r.push(`${domName}, it turns out, <span class="lightcoral">really likes pregnancy,</span> so`);
					domSlave.fetishKnown = 1;
				}
				r.push(`the first indication ${subName} gets of what ${he}'s in for this week is when ${domName}`);
				if (canStand(domSlave)) {
					if (domName.mpreg > 0 || domName.ovaries > 0) {
						r.push(`pushes a full-term belly into ${subName}'s back and`);
					}
				} else {
					r.push(`shows up pretending to be pregnant and`);
				}
				if (hasAnyArms(domSlave)) {
					r.push(`hands ${him}`);
					if (isItemAccessible.entry("a small empathy belly", "bellyAccessory")) {
						r.push(`an enormous empathy belly`);
					} else {
						r.push(`a support band and big pillow`);
					}
					if (domName.mpreg > 0 || domName.ovaries > 0) {
						r.push(`of ${his} own.`);
					} else {
						r.push(`to wear.`);
					}
				} else {
					r.push(`instructs ${him} to pretend to be pregnant using`);
					if (isItemAccessible.entry("a small empathy belly", "bellyAccessory")) {
						r.push(`an enormous empathy belly`);
					} else {
						r.push(`a support band and big pillow`);
					}
					if (domName.mpreg > 0 || domName.ovaries > 0) {
						r.push(`like ${he2} is.`);
					} else {
						r.push(`over ${his} middle.`);
					}
				}
				if (slave.weight >= 130) {
					r.push(`${subName} is too fat for ${domName}'s plan, so it's settled that ${he}'ll just pretend instead.`);
				}
				r.push(`Once ${he} is suitably 'knocked up', the fun begins; ${subName} spends the week getting awkwardly fucked.`);
				if (slave.devotion < -20) {
					r.push(`${domName}'s ${domRace} body struggling with ${subName}'s resisting ${subRace} form is a frequent sight as ${domName} takes ${his2} pleasure. <span class="hotpink">${domName} enjoys being able to use ${subName},</span> even if ${he2} has to pretend a little.`);
				} else if (slave.devotion <= 50) {
					r.push(`${domName}'s ${domRace} body balancing on ${subName}'s compliant ${subRace} form is a frequent sight as ${domName} takes ${his2} pleasure. <span class="hotpink">${domName} enjoys being able to use ${subName},</span> even if ${he2} has to pretend a little.`);
				} else {
					r.push(`${domName}'s ${domRace} body intertwined with ${subName}'s enthusiastic ${subRace} form is a frequent sight as the two of them share pleasure. <span class="hotpink">${domName} enjoys spending time with a partner willing to indulge ${his2} fantasies.</span>`);
				}
				addFuckCount(slave);
			}
			if (slave.need && slave.fetish === Fetish.PREGNANCY) {
				if (slave.fetishKnown) {
					r.push(`${subName} needs this kind of play to be truly sexually satisfied; this week, ${his} lust for pregnancy was sated.`);
				}
				subSlaveLikedFetish = 1;
			}
		} else if (domSlave.energy > 95) {
			if (slave.devotion < -20) {
				r.push(`Since ${domName} loves to fuck, ${subName} spends the week getting fucked. ${domName}'s ${domRace} body atop ${subName}'s resisting ${subRace} form is a frequent sight as ${domName} takes ${his2} pleasure. <span class="hotpink">${domName} enjoys being able to use ${subName}.</span>`);
			} else if (slave.devotion <= 50) {
				r.push(`Since ${domName} loves to fuck, ${subName} spends the week getting fucked. ${domName}'s ${domRace} body atop ${subName}'s compliant ${subRace} form is a frequent sight as ${domName} takes ${his2} pleasure. <span class="hotpink">${domName} enjoys being able to use ${subName}.</span>`);
			} else {
				r.push(`Since ${domName} loves to fuck, ${subName} spends the week getting fucked. ${domName}'s ${domRace} body atop ${subName}'s enthusiastic ${subRace} form is a frequent sight as the two of them share pleasure. <span class="hotpink">${domName} enjoys having an extra outlet for ${his2} sexual needs.</span>`);
			}
			addFuckCount(slave);
		} else if (domSlave.dick > 0 && canPenetrate(domSlave)) {
			if (slave.devotion < -20) {
				r.push(`${domName} doesn't get to use ${his2} still-functional cock as much as ${he2} would like; it often stands stiff and untended while ${he2}'s being used. Not this week: ${subName} spends the week with ${domName}'s ${domRace} dick thrusting in and out of ${his} ${subRace} body, whenever ${he2} feels like forcing it into ${subName}'s unwilling holes. <span class="hotpink">${domName} loves having someone to fuck whenever ${he2} wants.</span>`);
			} else if (slave.devotion <= 50) {
				r.push(`${domName} doesn't get to use ${his2} still-functional cock as much as ${he2} would like; it often stands stiff and untended while ${he2}'s being used. Not this week: ${subName} spends the week with ${domName}'s ${domRace} dick thrusting in and out of ${his} ${subRace} body, whenever ${he2} feels like putting it into ${subName}'s compliant holes. <span class="hotpink">${domName} loves having someone to stick ${his2} dick in at last.</span>`);
			} else {
				r.push(`${domName} doesn't get to use ${his2} still-functional cock as much as ${he2} would like; it often stands stiff and untended while ${he2}'s being used. Not this week: ${subName} spends the week with ${domName}'s ${domRace} dick thrusting in and out of ${his} ${subRace} body, whenever ${he2} feels like having an enthusiastic fuck. <span class="hotpink">${domName} loves having someone to tend to ${his2} prick at last.</span>`);
			}
			fuckCount = random(9, 12);
			r.push(SimpleSexAct.Slaves(slave, domSlave, fuckCount));
		} else if (hasAnyArms(domSlave) && domSlave.attrXX > 85 && slave.dick === 0 && slave.vagina > -1) { // feminine check
			if (slave.devotion < -20) {
				r.push(`Since ${domName} loves girls, ${subName} finds ${himself} groped, fingered, and toyed with. ${He} spends the week trying to avoid ${domName}'s playful ${domRace}`);
				if (hasBothArms(domSlave)) {
					r.push(`hands,`);
				} else {
					r.push(`fingers,`);
				}
				r.push(`but they rove across ${his} ${subRace} body anyway. <span class="hotpink">${domName} enjoys having a nice little toy right at hand,</span> even if ${he} does have to be forced.`);
			} else if (slave.devotion <= 50) {
				r.push(`Since ${domName} loves girls, ${subName} finds ${himself} groped, fingered, and toyed with. ${He} spends the week accepting the attention of ${domName}'s playful ${domRace}`);
				if (hasBothArms(domSlave)) {
					r.push(`hands.`);
				} else {
					r.push(`fingers.`);
				}
				r.push(`They rove across ${his} ${subRace} body, eliciting embarrassed arousal. <span class="hotpink">${domName} enjoys having a nice little toy right at hand,</span> even if ${he} is a little hesitant.`);
			} else {
				r.push(`Since ${domName} loves girls, ${subName} finds ${himself} with a frank and open lover for the week. ${He} spends the week accepting the attention of ${domName}'s adoring ${domRace}`);
				if (hasBothArms(domSlave)) {
					r.push(`hands.`);
				} else {
					r.push(`fingers.`);
				}
				r.push(`They rove across ${his} ${subRace} body, knowing just where to touch and where to press. <span class="hotpink">${domName} enjoys having a compliant ${girl} friend,</span> and they spend as much time together as they can.`);
			}
			fuckCount = random(9, 12);
			r.push(SimpleSexAct.Slaves(slave, domSlave, fuckCount));
		} else if (slave.dick > 0 && hasAnyArms(domSlave) && domSlave.attrXY > 85) {
			if (canPenetrate(slave)) {
				if (slave.devotion < -20) {
					r.push(`Since ${domName} loves hard cocks, ${subName} finds ${himself} forced to get hard and fuck. ${He} spends the week trying to avoid ${domName}'s constant demands. <span class="hotpink">${domName} enjoys having a nice dick right at hand,</span> even if it does have to be forced to stand up for ${him2}.`);
				} else if (slave.devotion <= 50) {
					r.push(`Since ${domName} loves hard cocks, ${subName} finds ${himself} required to get hard and fuck constantly. ${He} spends the week doing ${his} best to satisfy ${domName}'s constant demands. <span class="hotpink">${domName} enjoys having a nice dick right at hand,</span> and won't leave it alone.`);
				} else {
					r.push(`Since ${domName} loves hard cocks, ${subName} finds ${himself} asked to get hard and fuck constantly. ${He} spends the week doing ${his} best to satisfy ${domName}'s constant demands. <span class="hotpink">${domName} enjoys having a nice dick right at hand,</span> and won't leave it alone.`);
				}
			} else if (canAchieveErection(slave)){
				if (slave.devotion < -20) {
					r.push(`Since ${domName} loves hard cocks, ${subName} finds ${himself} being sucked, groped, and cruelly taunted for ${his} inability to fit in ${domName}. ${He} spends the week trying to avoid ${domName}'s abuse of ${his} poor oversized penis. <span class="hotpink">${domName} enjoys having a nice dick right at hand,</span> even if it's only good for taunting and torture.`);
				} else if (slave.devotion <= 50) {
					r.push(`Since ${domName} loves hard cocks, ${subName} finds ${himself} being sucked, groped, and toyed with. ${He} spends the week complying with ${domName}'s amusements. <span class="hotpink">${domName} enjoys having a nice dick right at hand,</span> even if it's too big to fit in ${him}.`);
				} else {
					r.push(`Since ${domName} loves hard cocks, ${subName} finds ${himself} being sucked, groped, and played with until ${he} comes. ${He} spends the week enjoying with ${domName}'s little games. <span class="hotpink">${domName} enjoys having a nice dick right at hand,</span> even if it's too big to fit in ${him}.`);
				}
			} else if (slave.dick > 6 && slave.balls > 0) {
				if (slave.devotion < -20) {
					r.push(`Since ${domName} loves cocks, even big soft ones, ${subName} finds ${himself} being sucked, groped, and cruelly taunted for ${his} inability to get hard. ${He} spends the week trying to avoid ${domName}'s abuse of ${his} poor oversized penis. <span class="hotpink">${domName} enjoys having a nice dick right at hand,</span> even if it's only good for taunting and torture.`);
				} else if (slave.devotion <= 50) {
					r.push(`Since ${domName} loves cocks, even big soft ones, ${subName} finds ${himself} being sucked, groped, and toyed with. ${He} spends the week complying with ${domName}'s amusements. <span class="hotpink">${domName} enjoys having a nice dick right at hand,</span> even if it's only good as a body pillow.`);
				} else {
					r.push(`Since ${domName} loves cocks, even big soft ones, ${subName} finds ${himself} being sucked, groped, and played with until ${he} comes. ${He} spends the week enjoying with ${domName}'s little games. <span class="hotpink">${domName} enjoys having a nice dick right at hand,</span> even if it's only good as a body pillow that occasionally discharges blobs of semen.`);
				}
			} else {
				if (slave.devotion < -20) {
					r.push(`Since ${domName} loves cocks, even soft ones, ${subName} finds ${himself} being sucked, groped, and cruelly taunted for ${his} impotence. ${He} spends the week trying to avoid ${domName}'s abuse of ${his} poor useless penis. <span class="hotpink">${domName} enjoys having a nice dick right at hand,</span> even if it's only good for taunting and torture.`);
				} else if (slave.devotion <= 50) {
					r.push(`Since ${domName} loves cocks, even soft ones, ${subName} finds ${himself} being sucked, groped, and toyed with. ${He} spends the week complying with ${domName}'s amusements. <span class="hotpink">${domName} enjoys having a nice dick right at hand,</span> even if it's only good as a soft toy.`);
				} else {
					r.push(`Since ${domName} loves cocks, even soft ones, ${subName} finds ${himself} being sucked, groped, and played with until ${he} comes. ${He} spends the week enjoying with ${domName}'s little games. <span class="hotpink">${domName} enjoys having a nice dick right at hand,</span> even if it's only good as a soft, dripping toy.`);
				}
			}
			fuckCount = random(9, 12);
			r.push(SimpleSexAct.Slaves(domSlave, slave, fuckCount));
		} else if (isAmputee(slave)) {
			r.push(`${domName} doesn't have any special desires, so ${he2} simply uses the helpless ${subName} for comfort and convenience. ${subName} finds ${his} helpless ${subRace} torso being used as a bath toy, a bedwarmer, and for sexual convenience. <span class="hotpink">${domName} enjoys the ease and companionship.</span>`);
			fuckCount = random(9, 12);
			r.push(SimpleSexAct.Slaves(slave, domSlave, fuckCount));
		} else {
			r.push(`${domName} doesn't have any special desires ${subName} can satisfy, so ${he2} simply uses ${subName} for comfort and convenience. ${subName} washes ${his} superior's ${domRace} body thoroughly and uses ${his} own ${subRace} body to warm ${domName}'s bed at night. <span class="hotpink">${domName} enjoys the ease and companionship.</span>`);
			fuckCount = random(9, 12);
			r.push(SimpleSexAct.Slaves(slave, domSlave, fuckCount));
		}
		domSlave.devotion += 4;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function sexualSatiation(slave) {
		/* This is here because SimpleSexAct.Slaves doesn't update analUse, etc. and that is needed to calculate cervixPump and .need clearing */
		oralUse = slave.counter.oral - oldCounters.oral;
		analUse = slave.counter.anal - oldCounters.anal;
		vaginalUse = slave.counter.vaginal - oldCounters.vaginal;
		mammaryUse = slave.counter.mammary - oldCounters.mammary;
		penetrativeUse = slave.counter.penetrative - oldCounters.penetrative;

		slave.sexAmount = oralUse + analUse + vaginalUse + mammaryUse + penetrativeUse;

		if (jobType === "stud") {
			slave.need -= 50;
			if (subSlaveLikedFetish) {
				slave.need = 0;
				if (slave.fetishStrength < 100) {
					slave.fetishStrength++;
				}
			}
			if (fetishChange > random(0, 99) && !subSlaveLikedFetish) {
				r.push(`${His} work starts to pervade ${his} fantasies; <span class="lightcoral">${he}'s developed a pregnancy fetish.</span>`);
				slave.fetish = Fetish.PREGNANCY;
				slave.fetishStrength = 65;
				slave.fetishKnown = 1;
			}
		} else if (jobType === "cumdump") {
			slave.need -= ((penetrativeUse + vaginalUse + analUse) * 3);
			// cumdumps don't get to be doms or sadists
			switch (slave.fetish) {
				case Fetish.MASOCHIST:
				case Fetish.SUBMISSIVE:
					if (analUse + vaginalUse > 5) {
						if (slave.fetishKnown) {
							r.push(`Being frequently pinned and fucked really satisfies ${him}.`);
						} else {
							r.push(`${He} seems to enjoy getting pushed down and fucked; ${he}'s got a <span class="lightcoral"> ${slave.fetish === Fetish.MASOCHIST ? "masochistic" : "submissive"} streak</span> in ${him}.`);
							slave.fetishKnown = 1;
						}
						subSlaveLikedFetish = 1;
					}
					break;
				case Fetish.CUMSLUT:
					if (oralUse > 5) {
						if (slave.fetishKnown) {
							r.push(`Frequently getting to suck cum out of slaves really satisfies ${him}.`);
						} else {
							r.push(`${He} seems to enjoy putting ${his} mouth to use; ${he}'s got a <span class="lightcoral">taste for cum.</span>`);
							slave.fetishKnown = 1;
						}
						subSlaveLikedFetish = 1;
					}
					break;
				case Fetish.BUTTSLUT:
					if (analUse > 5) {
						if (slave.fetishKnown) {
							r.push(`Frequently having ${his} butthole fucked really satisfies ${subName}.`);
						} else {
							r.push(`${He} seems to rather enjoy getting assfucked; <span class="lightcoral">anal gets ${him} worked up.</span>`);
							slave.fetishKnown = 1;
						}
						subSlaveLikedFetish = 1;
					}
					break;
				case Fetish.PREGNANCY:
					if (canGetPregnant(slave)) {
						if (slave.mpreg === 0 && vaginalUse > 7) {
							if (slave.fetishKnown) {
								r.push(`Having ${his} fertile pussy see so much use really satisfies ${subName}.`);
							} else {
								r.push(`Frequent unprotected sex in ${his} fertile hole exposes ${him} for the <span class="lightcoral">pregnancy fetishist ${he} is.</span>`);
								slave.fetishKnown = 1;
							}
							subSlaveLikedFetish = 1;
						} else if (slave.mpreg === 1 && analUse > 7) {
							if (slave.fetishKnown) {
								r.push(`Having ${his} fertile ass see so much use really satisfies ${subName}.`);
							} else {
								r.push(`Frequent unprotected sex in ${his} fertile hole exposes ${him} for the <span class="lightcoral">pregnancy fetishist ${he} is.</span>`);
								slave.fetishKnown = 1;
							}
							subSlaveLikedFetish = 1;
						}
					}
					break;
				case Fetish.HUMILIATION:
					if (slave.fetishKnown) {
						r.push(`Having all the other slaves see ${him} in such a humiliating role really satisfies ${subName}.`);
					} else {
						r.push(`${He} seems to enjoy ${his} humiliating role; ${he} <span class="lightcoral">gets off to being degraded.</span>`);
						slave.fetishKnown = 1;
					}
					subSlaveLikedFetish = 1;
					break;
				case Fetish.BOOBS:
					if (mammaryUse > 5) {
						if (slave.fetishKnown) {
							r.push(`Having so much attention lavished on ${his} tits really satisfies ${subName}.`);
						} else {
							r.push(`${He} seems to enjoy all the attention ${his} breasts are getting; ${he}'s a <span class="lightcoral">breast fetishist.</span>`);
							slave.fetishKnown = 1;
						}
						subSlaveLikedFetish = 1;
						r.push(induceLactation(slave, 2));
					}
					break;
			}
			if (subSlaveLikedFetish) {
				slave.need = 0;
				if (slave.fetishStrength < 100) {
					slave.fetishStrength++;
				}
			} else if (fetishChange > random(0, 100) && slave.fetish !== Fetish.MASOCHIST && slave.fetish !== Fetish.SUBMISSIVE && App.EndWeek.saVars.subSlaveRatio.isBetween(0, 0.8)) {
				r.push(`Being used as much as ${he} is starts to take a toll on ${him} sexuality; <span class="lightcoral">${he} begins to enjoy being your chattel's fucktoy.</span>`);
				slave.fetish = Fetish.SUBMISSIVE;
				slave.fetishStrength = 65;
				slave.fetishKnown = 1;
			}
		} else if (jobType === "sub") {
			if (domSlaveUsedFetish) {
				domSlave.fetishStrength = Math.clamp(domSlave.fetishStrength + 3, 0, 100);
			}
			if (subSlaveLikedFetish) {
				slave.need = 0;
				if (slave.fetishStrength < 100) {
					slave.fetishStrength++;
				}
			}
			slave.need -= ((penetrativeUse + vaginalUse + analUse) * 5);
			if (domSlaveUsedFetish && !subSlaveLikedFetish && fetishChange > random(70, 100)) {
				// If subslave is uncertain of her fetish, allow her to take one based off her dom.
				switch (domSlave.fetish) {
					case Fetish.BUTTSLUT:
						if (slave.fetish !== Fetish.BUTTSLUT) {
							r.push(`${domName}'s taste for anal play has a lasting effect on ${subName}; <span class="lightcoral">${he}'s become curious about butt sex.</span>`);
							slave.fetish = Fetish.BUTTSLUT;
							slave.fetishStrength = 35;
							slave.fetishKnown = 1;
						}
						break;
					case Fetish.SUBMISSIVE:
						if (slave.fetish !== Fetish.DOM) {
							r.push(`${domName}'s sexual submission has a lasting effect on ${subName}; <span class="lightcoral">${he}'s grown a taste for dominating others.</span>`);
							slave.fetish = Fetish.DOM;
							slave.fetishStrength = 35;
							slave.fetishKnown = 1;
						}
						break;
					case Fetish.DOM:
						if (slave.fetish !== Fetish.SUBMISSIVE) {
							r.push(`${domName}'s sexual domination has a lasting effect on ${subName}; <span class="lightcoral">${he}'s grown a taste for submitting.</span>`);
							slave.fetish = Fetish.SUBMISSIVE;
							slave.fetishStrength = 35;
							slave.fetishKnown = 1;
						}
						break;
					case Fetish.SADIST:
						if (slave.fetish !== Fetish.MASOCHIST) {
							r.push(`${domName}'s abusive tastes have a lasting effect on ${subName}; <span class="lightcoral">${he}'s grown an itch for pain.</span>`);
							slave.fetish = Fetish.MASOCHIST;
							slave.fetishStrength = 35;
							slave.fetishKnown = 1;
						}
						break;
					case Fetish.MASOCHIST:
						if (slave.fetish !== Fetish.SADIST) {
							r.push(`${domName}'s taste for pain has a lasting effect on ${subName}; <span class="lightcoral">${he}'s become slightly sadistic.</span>`);
							slave.fetish = Fetish.SADIST;
							slave.fetishStrength = 35;
							slave.fetishKnown = 1;
						}
						break;
					case Fetish.BOOBS:
						if (slave.fetish !== Fetish.BOOBS) {
							r.push(`${domName}'s taste for breast play has a lasting effect on ${subName}; <span class="lightcoral">${he} can't stop thinking about playing with a pair.</span>`);
							slave.fetish = Fetish.BOOBS;
							slave.fetishStrength = 35;
							slave.fetishKnown = 1;
						}
						break;
					case Fetish.PREGNANCY:
						if (slave.fetish !== Fetish.PREGNANCY) {
							r.push(`${domName}'s taste for pregnancy has a lasting effect on ${subName}; <span class="lightcoral">${he} can't stop thinking about pregnancy ${himself}.</span>`);
							slave.fetish = Fetish.PREGNANCY;
							slave.fetishStrength = 35;
							slave.fetishKnown = 1;
						}
						break;
					case Fetish.HUMILIATION:
						if (slave.fetish !== Fetish.HUMILIATION) {
							r.push(`${domName}'s taste for public sex has a lasting effect on ${subName}; <span class="lightcoral">${he}'s grown fond of exhibitionism.</span>`);
							slave.fetish = Fetish.HUMILIATION;
							slave.fetishStrength = 35;
							slave.fetishKnown = 1;
						}
						break;
				}
			} else {
				switch (slave.fetish) {
					case Fetish.MASOCHIST:
					case Fetish.SUBMISSIVE:
						if (analUse + vaginalUse > 0) {
							if (slave.fetishKnown) {
								r.push(`Being someone's submissive toy really satisfies ${subName}.`);
							} else {
								r.push(`${He} seems to enjoy being a toy; ${he}'s got a <span class="lightcoral"> ${slave.fetish === Fetish.MASOCHIST ? "masochistic" : "submissive"} streak</span> in ${him}.`);
								slave.fetishKnown = 1;
							}
							slave.need = 0;
						}
						break;
					case Fetish.DOM:
					case Fetish.SADIST:
						if (penetrativeUse > 0) {
							if (slave.fetishKnown) {
								r.push(`Getting to be on top is precious, and it really satisfies ${subName}.`);
							} else {
								r.push(`${He} relishes getting to be on top; ${he}'s got a <span class="lightcoral"> ${slave.fetish === Fetish.DOM ? "dominant" : "sadistic"} side</span> to ${him}.`);
								slave.fetishKnown = 1;
							}
							slave.need = 0;
						}
						break;
					case Fetish.CUMSLUT:
						if (oralUse > 0) {
							if (slave.fetishKnown) {
								r.push(`Being someone's oral toy really satisfies ${subName}.`);
							} else {
								r.push(`${He} seems to thoroughly enjoy being an oral toy; ${he}'s <span class="lightcoral">an honest cumslut.</span>`);
								slave.fetishKnown = 1;
							}
							slave.need = 0;
						}
						break;
					case Fetish.BUTTSLUT:
						if (analUse > 0) {
							if (slave.fetishKnown) {
								r.push(`Having ${his} butthole serve as someone's toy really satisfies ${subName}.`);
							} else {
								r.push(`${He} seems to thoroughly enjoy ${his} ass being reduced to someone's toy; ${he}'s <span class="lightcoral">an honest buttslut.</span>`);
								slave.fetishKnown = 1;
							}
							slave.need = 0;
						}
						break;
					case Fetish.PREGNANCY:
						if (canGetPregnant(slave)) {
							if (slave.mpreg === 0 && vaginalUse > 0) {
								if (slave.fetishKnown) {
									r.push(`Having ${his} fertile pussy serve as someone's toy really satisfies ${subName}.`);
								} else {
									r.push(`Having ${his} fertile pussy used exposes ${him} for the <span class="lightcoral">pregnancy fetishist ${he} is.</span>`);
									slave.fetishKnown = 1;
								}
								slave.need = 0;
							} else if (slave.mpreg === 1 && analUse > 0) {
								if (slave.fetishKnown) {
									r.push(`Having ${his} fertile ass serve as someone's toy really satisfies ${subName}.`);
								} else {
									r.push(`Having ${his} fertile asspussy used exposes ${him} for the <span class="lightcoral">pregnancy fetishist ${he} is.</span>`);
									slave.fetishKnown = 1;
								}
								slave.need = 0;
							}
						}
						break;
					case Fetish.HUMILIATION:
						if (slave.fetishKnown) {
							r.push(`Having all the other slaves see ${him} in such a humiliating role really satisfies ${subName}.`);
						} else {
							r.push(`${He} seems to enjoy ${his} humiliating role; ${he} <span class="lightcoral">gets off to being degraded.</span>`);
							slave.fetishKnown = 1;
						}
						slave.need = 0;
						break;
					case Fetish.BOOBS:
						if (mammaryUse > 0) {
							if (slave.fetishKnown) {
								r.push(`Having ${his} tits serve as someone's toy really satisfies ${subName}.`);
							} else {
								r.push(`${He} seems to thoroughly enjoy ${his} breasts being reduced to someone's toys; ${he}'s <span class="lightcoral">an honest boobslut.</span>`);
								slave.fetishKnown = 1;
							}
							slave.need = 0;
							r.push(induceLactation(slave, 2));
						}
						break;
				}
			}
		}
	}

	/**
	 * @param {FC.ReportSlave} slave
	 */
	function physicalEffects(slave) {
		if (slave.health.illness > 0 || slave.health.tired > 60) {
			if (jobType === "sub") {
				r.push(`${subName}`);
			} else {
				r.push(`${He}`);
			}
			r.push(`is<span class="health dec">`);
			if (slave.health.tired > 60) {
				if (slave.health.illness === 1) {
					r.push(`feeling under the weather and`);
				} else if (slave.health.illness === 2) {
					r.push(`somewhat ill and`);
				} else if (slave.health.illness === 3) {
					r.push(`sick and`);
				} else if (slave.health.illness === 4) {
					r.push(`very sick and`);
				} else if (slave.health.illness === 5) {
					r.push(`terribly ill and`);
				}
			} else {
				if (slave.health.illness === 1) {
					r.push(`feeling under the weather,`);
				} else if (slave.health.illness === 2) {
					r.push(`somewhat ill,`);
				} else if (slave.health.illness === 3) {
					r.push(`sick,`);
				} else if (slave.health.illness === 4) {
					r.push(`very sick,`);
				} else if (slave.health.illness === 5) {
					r.push(`terribly ill,`);
				}
			}
			if (slave.health.tired > 90) {
				r.push(`exhausted,`);
			} else if (slave.health.tired > 60) {
				r.push(`fatigued,`);
			}
			if (slave.health.illness !== 0) {
				r.push(`</span> making ${him} rather unappealing to use.`);
			} else {
				r.push(`</span> making ${him} less enjoyable to fuck.`);
			}
		}
		if (jobType === "stud") {
			if (slaveResting(slave)) {
				r.push(`${He} is only made available during certain hours to maximize ${his} potency while <span class="health inc">keeping ${him} rested.</span>`);
				if (slave.fetish === Fetish.MINDBROKEN && slave.fuckdoll > 0) {
					r.push(`This doesn't stop recreational breeding, should ${he} be in the mood, but gives ${him} a chance to recover as needed.`);
				}
			} else if (slave.health.tired + 5 >= 90 && !willWorkToDeath(slave)) {
				r.push(`${He} <span class="devotion dec">underperforms in ${his} role,</span> mating far less than ${he} could be, and is <span class="trust dec">punished accordingly.</span>`);
				slave.devotion -= 2;
				slave.trust -= 5;
			} else {
				r.push(`${He} lives a simple life of sex and nothing more;`);
				if (slave.devotion > 20) {
					r.push(`understanding that ${his} role is to ejaculate, not pleasure ${his} partner, allows ${him} ample free time when ${he} needs it.`);
				} else {
					r.push(`all ${he} needs to do is ejaculate, though ${he} fails to realize it.`);
				}
			}
		} else if (jobType === "cumdump") {
			if (slaveResting(slave)) {
				r.push(`${He} is only available during certain hours in <span class="health inc">an effort to keep ${him} rested.</span>`);
			} else if (slave.health.tired >= 60 && !willWorkToDeath(slave)) {
				r.push(`As much as ${he} <span class="devotion dec">wishes to resist being used</span> in ${his} tired state, ${he} <span class="trust dec">can do little to avoid it.</span>`);
				slave.devotion -= 5;
				slave.trust -= 5;
			} else {
				if (slave.devotion > 20) {
					r.push(`${He} is accustomed enough to slave life to properly manage ${his} time.`);
				} else {
					r.push(`${He} <span class="health dec">wastes time and energy resisting</span> where a properly broken slave would accept what is happening and take it.`);
				}
			}
			tiredFucks(slave);
		} else if (jobType === "sub") {
			const {him2, his2} = getPronouns(domSlave).appendSuffix('2');
			if (slaveResting(slave)) {
				r.push(`${domName} only uses ${subName} sexually <span class="health inc">out of respect for ${his} rest rules.</span>`);
			} else if (slave.relationshipTarget === domSlave.ID && slave.health.tired > 60) {
				r.push(`${domName} goes easy on ${his2} ${relationshipTerm(domSlave)} ${subName} outside of the bedroom.`);
			} else if (slave.health.tired + 10 >= 90 && !willWorkToDeath(slave)) {
				r.push(`${subName} leverages sex with ${domName} in order to shirk ${his} other work;`);
				if (domSlave.energy > 20 || domSlave.sexualQuirk === SexualQuirk.CARING) {
					r.push(`${domName} prefers satisfaction and <span class="trust inc">lets ${subName} get away with it.</span>`);
					slave.trust += 2;
				} else {
					r.push(`${domName} does not care for ${subName}'s game and <span class="trust dec">punishes ${him} appropriately.</span>`);
					slave.trust -= 5;
					subHatesDom = 1;
				}
			} else {
				r.push(`Since ${subName} is essentially splitting chores with ${domName}, ${his} days are not particularly difficult;`);
				if (slave.relationshipTarget === domSlave.ID) {
					r.push(`spending that time with one's ${relationshipTerm(domSlave)} makes it even easier.`);
				} else if (slave.devotion > 20) {
					r.push(`${subName} understands that working with ${domName} makes things easier.`);
				} else {
					r.push(`${subName} fails to realize that working with, not against, ${domName} <span class="health dec">would make things go smoother.</span>`);
				}
				if (domSlave.health.condition < 40) {
					r.push(`<span class="health inc">${domName}'s health improves</span> with ${subName} to serve ${him2} and`);
					improveCondition(domSlave, 10);
				} else {
					r.push(`<span class="health inc">${domName} spends more time at ease</span> with ${subName} to`);
				}
				r.push(`help with some of ${his2} harder duties.`);
				domSlave.health.tired -= 10;
			}
		}
		tired(slave);

		if (slave.cervixImplant === 1 || slave.cervixImplant === 3) {
			cervixPump += 20 * vaginalUse;
		}
		if (slave.cervixImplant === 2 || slave.cervixImplant === 3) {
			cervixPump += 20 * analUse;
		}
		if (cervixPump > 0) {
			r.push(`${He} notices ${his} <span class="lime">belly is a little heavier</span> after all the`);
			if (slave.cervixImplant === 1) {
				r.push(`vaginal`);
			} else if (slave.cervixImplant === 2) {
				r.push(`anal`);
			}
			r.push(`sex ${he} had throughout the week.`);
			slave.bellyImplant += cervixPump;
		}

		if (slave.lactation > 0 && mammaryUse > 0) {
			slave.lactationDuration = 2;
			if (slave.boobsMilk > 0) {
				slave.boobs -= slave.boobsMilk;
				slave.boobsMilk = 0;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function mentalEffects(slave) {
		if (jobType === "stud") {
			if (slave.behavioralFlaw === BehavioralFlaw.HATESWOMEN) {
				if (slave.devotion > 20 && random(1, 100) > 70) {
					r.push(`Spending so much time in close proximity to pussies <span class="green">reconciles ${him} to sex with girls.</span>`);
					slave.behavioralFlaw = BehavioralFlaw.NONE;
				}
			}
		} else if (jobType === "cumdump") {
			if (App.EndWeek.saVars.subSlaveRatio <= 0.8) {
				if (slave.sexualFlaw === SexualFlaw.REPRESSED) {
					if (slave.devotion > 20 && random(1, 100) > (100 - fuckCount)) {
						r.push(`After being brought to orgasm so many times, <span class="green">${he} begins to enjoy having sex.</span>`);
						slave.sexualFlaw = SexualFlaw.NONE;
					}
				}
			}
		} else if (jobType === "sub") {
			if (slave.devotion <= 20) {
				if (slave.trust >= -20) {
					r.push(`${subName} <span class="gold">is further habituated to subservience</span> by ${domName}.`);
					slave.trust -= 5;
					if (slave.sexualQuirk === SexualQuirk.STRUGGLE) {
						r.push(`Secretly, though, ${subName} gets off on being raped, <span class="hotpink">and wants more.</span>`);
						slave.devotion += 1;
					}
				}
			}

			if (slave.behavioralFlaw === BehavioralFlaw.HATESMEN) {
				if (domSlave.dick > 0 && slave.devotion > 20) {
					r.push(`Spending so much time in close proximity to a slave with a dick <span class="green">reconciles ${him} to getting fucked by them.</span>`);
					slave.behavioralFlaw = BehavioralFlaw.NONE;
				}
			} else if (slave.behavioralFlaw === BehavioralFlaw.HATESWOMEN) {
				if (domSlave.vagina !== -1 && slave.devotion > 20) {
					r.push(`Spending so much time in close proximity to a slave with a pussy <span class="green">reconciles ${him} to sex with girls.</span>`);
					slave.behavioralFlaw = BehavioralFlaw.NONE;
				}
			}

			if (!subHatesDom) {
				if (slave.relationship === 0) {
					if (slave.rivalryTarget !== domSlave.ID && slave.devotion >= 10 && domSlave.relationship === 0) {
						if (random(1, 100) > 50) {
							r.push(`${subName} and ${domName} enjoy spending time together and <span class="lightgreen">strike up a friendship.</span>`);
							domSlave.relationship = 1;
							domSlave.relationshipTarget = slave.ID;
							slave.relationship = 1;
							slave.relationshipTarget = domSlave.ID;
						} else {
							r.push(`${subName} and ${domName} find they enjoy their sexual relationship and <span class="lightgreen">become friends with benefits.</span>`);
							domSlave.relationship = 3;
							domSlave.relationshipTarget = slave.ID;
							slave.relationship = 3;
							slave.relationshipTarget = domSlave.ID;
						}
					}
				} else if (slave.relationship > 0) {
					if (slave.relationshipTarget === domSlave.ID && slave.devotion >= -20) {
						r.push(`${subName} likes getting fucked by ${domName} and <span class="hotpink">appreciates</span> having it as ${his} job.`);
						slave.devotion += 1;
					}
					if (slave.relationship < 3) {
						if (slave.relationshipTarget === domSlave.ID) {
							if (slave.devotion >= 10) {
								r.push(`${subName} and ${domName} find that they enjoy having sex just as much as they like being friends, and become <span class="lightgreen">friends with benefits.</span>`);
								domSlave.relationship = 3;
								slave.relationship = 3;
							} else if (slave.devotion <= 20) {
								r.push(`${subName} and ${domName}'s relationship is <span class="lightsalmon">damaged</span> by ${domName} having the right to use ${subName}.`);
								domSlave.relationship--;
								slave.relationship--;
							}
						}
					} else if (slave.relationship < 4) {
						if (slave.relationshipTarget === domSlave.ID && slave.devotion >= 10) {
							r.push(`${subName} and ${domName} don't have to be encouraged to have sex, but with extra time for it, they become <span class="lightgreen">lovers.</span>`);
							domSlave.relationship++;
							slave.relationship++;
						}
					}
				}
			}

			if (slave.rivalry === 0) {
				if (slave.relationshipTarget !== domSlave.ID && slave.devotion <= 50 && domSlave.rivalry === 0 && random(1, 100) > 50 - (subHatesDom * 20)) {
					r.push(`${subName} resents ${domName} for using ${him} and the two <span class="lightsalmon">start to dislike each other.</span>`);
					domSlave.rivalry = 1;
					domSlave.rivalryTarget = slave.ID;
					slave.rivalry = 1;
					slave.rivalryTarget = domSlave.ID;
				}
			} else {
				if (slave.rivalryTarget === domSlave.ID && slave.devotion <= 50) {
					r.push(`${subName} resents subordinating ${himself} to ${domName} and <span class="devotion dec">dislikes</span> having it as ${his} job.`);
					slave.devotion -= 2;
				}
				if (slave.rivalry < 3 && slave.rivalryTarget === domSlave.ID) {
					if (slave.devotion <= 50) {
						r.push(`${subName} hates being used by ${his} rival ${domName} so much that their <span class="lightsalmon">feud worsens.</span>`);
						domSlave.rivalry++;
						slave.rivalry++;
					} else if (slave.devotion > 50) {
						r.push(`${subName} serves ${domName} so devotedly that they <span class="lightgreen">work out</span> some of their differences through sex.`);
						domSlave.rivalry--;
						slave.rivalry--;
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {"oral"|"vaginal"|"anal"|"penetrative"} skillName
	 * @param {number} skillUse
	 */
	function increaseSkillFromCumdump(slave, skillName, skillUse) {
		if (slave.skill[skillName] < 30) {
			r.push(slaveSkillIncrease(skillName, slave, (Math.floor((skillUse / 2) + Math.floor((slave.intelligence + slave.intelligenceImplant) / 32)))));
		} else if (slave.skill[skillName] < 100) {
			r.push(slaveSkillIncrease(skillName, slave, (Math.floor((skillUse / 4) + Math.floor((slave.intelligence + slave.intelligenceImplant) / 32)))));
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function slaveSkills(slave) {
		if (jobType === "stud") {
			if (slave.fuckdoll === 0 && slave.fetish !== Fetish.MINDBROKEN) {
				if (slave.career === "a breeding bull" || slave.devotion > 20) {
					r.push(slaveSkillIncrease("penetrative", slave, 2));
				}
			}
		} else if (jobType === "cumdump") {
			if (oralUse > 0) {
				increaseSkillFromCumdump(slave, "oral", oralUse);
			}
			if (vaginalUse > 0) {
				increaseSkillFromCumdump(slave, "vaginal", vaginalUse);
			}
			if (analUse > 0) {
				increaseSkillFromCumdump(slave, "anal", analUse);
			}
			if (penetrativeUse > 0) {
				increaseSkillFromCumdump(slave, "penetrative", penetrativeUse);
			}
		} else if (jobType === "sub") {
			const {his2, he2} = getPronouns(domSlave).appendSuffix('2');
			if ((slave.rivalry === 0 || slave.rivalryTarget !== domSlave.ID) && slave.devotion > 20 && domSlave.devotion > 20) {
				if (oralUse > 0) {
					if (slave.skill.oral < domSlave.skill.oral) {
						r.push(`${domName} is better at oral than ${subName} and lets ${him} in on some of ${his2} techniques.`);
						r.push(slaveSkillIncrease('oral', slave, (Math.floor(oralUse + Math.floor(slave.intelligence + slave.intelligenceImplant) / 32))));
					} else if (slave.skill.oral < 30) {
						r.push(slaveSkillIncrease('oral', slave, (Math.floor((oralUse / 4) + Math.floor((slave.intelligence + slave.intelligenceImplant) / 32)))));
					}
				}
				if (vaginalUse > 0) {
					if (slave.skill.vaginal < domSlave.skill.vaginal && domSlave.vagina >= 0) {
						r.push(`${domName} knows how to use ${his2} pussy better than ${subName} does and passes on some of ${his2} knowledge.`);
						r.push(slaveSkillIncrease('vaginal', slave, (Math.floor(vaginalUse + Math.floor(slave.intelligence + slave.intelligenceImplant) / 32))));
					} else if (slave.skill.vaginal < 30) {
						r.push(slaveSkillIncrease('vaginal', slave, (Math.floor((vaginalUse / 2) + Math.floor((slave.intelligence + slave.intelligenceImplant) / 32)))));
					}
				}
				if (analUse > 0) {
					if (slave.skill.anal < domSlave.skill.anal) {
						r.push(`${domName} is more familiar with anal sex than ${subName} is and lets some of ${his2} skill rub off on ${him}.`);
						r.push(slaveSkillIncrease('anal', slave, (Math.floor(analUse + Math.floor(slave.intelligence + slave.intelligenceImplant) / 32))));
					} else if (slave.skill.anal < 30) {
						r.push(slaveSkillIncrease('anal', slave, (Math.floor((analUse / 2) + Math.floor((slave.intelligence + slave.intelligenceImplant) / 32)))));
					}
				}
				if (penetrativeUse > 0) {
					if (slave.skill.penetrative < domSlave.skill.penetrative) {
						r.push(`${domName} is better at fucking others than ${subName} is, so ${he2} gives ${him} some pointers to improve ${his} skills.`);
						r.push(slaveSkillIncrease('penetrative', slave, (Math.floor(penetrativeUse + Math.floor(slave.intelligence + slave.intelligenceImplant) / 32))));
					} else if (slave.skill.penetrative < 30) {
						r.push(slaveSkillIncrease('penetrative', slave, (Math.floor((penetrativeUse / 2) + Math.floor((slave.intelligence + slave.intelligenceImplant) / 32)))));
					}
				}
			}
		}
	}
};
