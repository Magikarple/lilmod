// cSpell:ignore infantilize, girliness

/**
 * @param {FC.ReportSlave} slave
 * @returns {DocumentFragment}
 */
App.SlaveAssignment.liveWithHG = function saliveWithHG(slave) {
	const el = new DocumentFragment();
	/** @type {string[]} */
	const r = [];

	const {
		he, him, his, himself, girl, He, wife
	} = getPronouns(slave);
	const {
		he2, him2, his2, himself2, He2, His2, wife2
	} = getPronouns(S.HeadGirl).appendSuffix("2");

	const arcology = V.arcologies[0];
	const arcologyInfo = new App.Utils.Arcology(arcology);

	let oralUse = 0;
	let analUse = 0;
	let vaginalUse = 0;
	let mammaryUse = 0;
	let penetrativeUse = 0;
	let cervixPump = 0;

	// these three get set first, but we save the output for later
	const dietText = HGSetsDiet(slave, S.HeadGirl);
	const hormoneText = V.HGSuiteHormones !== 0 ? HGSetsHormones(slave, S.HeadGirl) : [];
	const drugText = HGSetsDrugs(slave, S.HeadGirl);

	HGSetsLivingConditions(slave, S.HeadGirl);
	slaveAssistsHG(slave, S.HeadGirl);
	HGSlaveTreatment(slave, S.HeadGirl);
	slaveHGRelations(slave, S.HeadGirl);
	HGTrainsSlave(slave, S.HeadGirl);
	if (canPenetrate(S.HeadGirl)) {
		HGStretchesHoles(slave, S.HeadGirl);
	}
	if (V.seePreg !== 0) {
		HGManagesPregnancy(slave, S.HeadGirl);
	}
	if (slave.devotion > 50) {
		HGCausesFetish(slave, S.HeadGirl);
	}
	HGSexualSatiation(slave, S.HeadGirl);
	HGManagesTiredness(slave, S.HeadGirl);
	HGDressesSlave(slave, S.HeadGirl);
	if (S.HeadGirl.energy > 95) {
		narcissistHG(slave, S.HeadGirl);
	}
	r.push(...dietText, ...hormoneText, ...drugText);
	if (V.HGSuiteSurgery !== 0 && slave.indentureRestrictions < 1) {
		HGArrangesSurgery(slave, S.HeadGirl);
	}
	HGEnjoyment(slave, S.HeadGirl);
	App.Events.addNode(el, r);

	slaveReport(slave, el);
	return el;

	function getHGTastes() {
		if (arcologyInfo.fsActive('FSSlimnessEnthusiast')) {
			return 1;
		} else if (arcologyInfo.fsActive('FSRepopulationFocus')) {
			return 4;
		} else if (arcologyInfo.fsActive('FSBodyPurist')) {
			return 1;
		} else if (arcologyInfo.fsActive('FSDegradationist')) {
			return 3;
		} else if (arcologyInfo.fsActive('FSAssetExpansionist')) {
			return 3;
		} else if (arcologyInfo.fsActive('FSTransformationFetishist')) {
			return 3;
		}
		return 2;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.Entity.SlaveState} HG
	 * @returns {string[]}
	 */
	function HGSetsDiet(slave, HG) {
		const t = [];
		if ((arcology.FSRepopulationFocusPregPolicy === 1 || (!arcologyInfo.fsActive('FSRestart') && HG.fetish === Fetish.PREGNANCY)) && canImpreg(slave, HG) && V.dietFertility === 1) {
			t.push(`${HG.slaveName} thinks ${slave.slaveName} could do with a bigger bump`);
			if (arcology.FSRepopulationFocusPregPolicy) {
				t.push(`since pregnant ${girl}s are all the rage in your arcology`);
			}
			if (slave.diet !== Diet.FERTILITY) {
				t.push(`and assigns ${him} a diet to promote ovulation.`);
				slave.diet = Diet.FERTILITY;
			} else {
				t.push(`and keeps ${him} on ${his} fertility diet.`);
			}
		} else if ((slave.weight < 130 && arcology.FSHedonisticDecadence >= 20) || (slave.weight < -10)) {
			t.push(`${HG.slaveName} thinks ${slave.slaveName} could use a little extra weight`);
			if (arcology.FSHedonisticDecadence >= 20) {
				t.push(`since plump ${girl}s are all the rage in your arcology`);
			}
			if (slave.diet !== Diet.FATTEN) {
				t.push(`and assigns ${him} a diet to fatten ${him} up.`);
				slave.diet = Diet.FATTEN;
			} else {
				t.push(`and keeps ${him} on ${his} fattening diet.`);
			}
		} else if (slave.weight > 30 && !arcologyInfo.fsActive('FSHedonisticDecadence')) {
			t.push(`${HG.slaveName} thinks ${slave.slaveName} is a little too porky`);
			if (slave.diet !== Diet.RESTRICTED) {
				t.push(`and puts ${him} on a diet.`);
				slave.diet = Diet.RESTRICTED;
			} else {
				t.push(`and keeps ${him} on ${his} diet.`);
			}
		} else if (((slave.muscles <= 95 && ((arcology.FSPhysicalIdealist > 0 && arcology.FSPhysicalIdealistLaw === 0) || (HG.fetish === Fetish.SUBMISSIVE || HG.fetish === Fetish.MASOCHIST))) || (slave.muscles <= 45 && (!arcologyInfo.fsActive('FSPhysicalIdealist') && arcology.FSPhysicalIdealistLaw === 1)) || slave.muscles <= 5) && !isAmputee(slave)) {
			t.push(`${HG.slaveName} thinks ${slave.slaveName}`);
			if (HG.fetish === Fetish.SUBMISSIVE && HG.fetishKnown === 1) {
				t.push(`could use bigger muscles to better dominate ${him2} with in bed`);
			} else if (HG.fetish === Fetish.MASOCHIST && HG.fetishKnown === 1) {
				t.push(`could use bigger muscles to better spank ${him2}`);
			} else if (arcologyInfo.fsActive('FSPhysicalIdealist')) {
				t.push(`could use bigger muscles to support your societal goals`);
			} else {
				t.push(`could use a bit of muscle`);
			}
			if (slave.diet !== Diet.MUSCLE) {
				t.push(`and makes ${him} work out hard.`);
				slave.diet = Diet.MUSCLE;
			} else {
				t.push(`and keeps ${him} working out.`);
			}
		} else if (slave.balls > 0 && HG.fetish === Fetish.CUMSLUT && V.cumProDiet === 1) {
			t.push(`${HG.slaveName}`);
			if (HG.fetishKnown === 1) {
				t.push(`loves cum,`);
			} else {
				t.push(`seems amused by cumshots,`);
			}
			t.push(`so ${he2}`);
			if (slave.diet !== Diet.CUM) {
				t.push(`puts`);
				slave.diet = Diet.CUM;
			} else {
				t.push(`keeps`);
			}
			t.push(`${slave.slaveName} on a diet designed to make ${him} cum harder and stronger.`);
		} else {
			t.push(`${HG.slaveName} thinks ${slave.slaveName} is fine as is`);
			if (slave.diet !== Diet.HEALTHY) {
				t.push(`and puts ${him} on a normal diet.`);
				slave.diet = Diet.HEALTHY;
			} else {
				t.push(`and keeps ${him} on ${his} healthy diet.`);
			}
		}
		return t;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.Entity.SlaveState} HG
	 * @returns {string[]}
	 */
	function HGSetsHormones(slave, HG) {
		const t = [];
		// Room for expansion
		if (slave.indentureRestrictions > 1) {
			t.push(`${HG.slaveName} puts ${slave.slaveName} on female hormones, since ${he2} expects ${him} to act as the submissive, feminine partner.`);
			slave.hormones = 1;
		} else {
			t.push(`${HG.slaveName} puts ${slave.slaveName} on intensive female hormones, since ${he2} expects ${him} to act as the submissive, feminine partner.`);
			slave.hormones = 2;
		}
		return t;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.Entity.SlaveState} HG
	 * @returns {string[]}
	 */
	function HGSetsDrugs(slave, HG) {
		const t = [];
		if (V.HGSuiteDrugs !== 0) {
			if (slave.health.condition < 60) {
				t.push(`${HG.slaveName} gives ${slave.slaveName} curatives, since ${he2} wants a shiningly healthy living partner.`);
				slave.curatives = 2;
			}
			// default state, unless the HG decides she needs (and can have) something else
			slave.drugs = Drug.NONE;
			if (slave.indentureRestrictions < 2) {
				if (slave.lips <= 20) {
					t.push(`${HG.slaveName} gives ${slave.slaveName} lip injections, since ${he2} wants to get oral from plump, luscious lips.`);
					slave.drugs = Drug.GROWLIP;
				} else if (arcology.FSSlaveProfessionalismResearch === 1 && V.HGSuiteEquality !== 0 && canImproveIntelligence(slave)) {
					t.push(`${HG.slaveName} gives ${slave.slaveName} psychostimulants, since ${him} being smarter will benefit them both when ${he} is in charge.`);
					slave.drugs = Drug.PSYCHOSTIM;
				} else if (HG.fetish === Fetish.BUTTSLUT && arcology.FSAssetExpansionistResearch === 1 && slave.butt < 18) {
					t.push(`${HG.slaveName} gives ${slave.slaveName} hyper ass injections, since ${he2} never once thought it possible to fuck an ass as big as ${his} is.`);
					slave.drugs = Drug.HYPERBUTT;
				} else if (HG.fetish === Fetish.BUTTSLUT && arcology.FSAssetExpansionistResearch === 1 && slave.butt < 8) {
					t.push(`${HG.slaveName} gives ${slave.slaveName} ass injections, since ${he2} likes comfortable padding as ${he2} fucks a butt.`);
					slave.drugs = Drug.GROWBUTT;
				} else if (HG.fetish === Fetish.CUMSLUT && arcology.FSAssetExpansionistResearch === 1 && slave.balls < 100 && slave.balls > 0 && slave.dick > 0) {
					t.push(`${HG.slaveName} gives ${slave.slaveName} hyper testicle injections, since ${he2}`);
					if (HG.fetishKnown === 1) {
						t.push(`wants to swim in a river of cum.`);
					} else {
						t.push(`enjoys seeing how large of a load ${slave.slaveName} can blow.`);
					}
					slave.drugs = Drug.HYPERTESTICLE;
				} else if (HG.fetish === Fetish.CUMSLUT && slave.balls < 10 && slave.balls > 0 && slave.dick > 0) {
					t.push(`${HG.slaveName} gives ${slave.slaveName} testicle injections, since ${he2} wants ${slave.slaveName} shooting bigger loads.`);
					slave.drugs = Drug.GROWTESTICLE;
				} else if ((HG.fetish === Fetish.MASOCHIST || HG.fetish === Fetish.SUBMISSIVE) && canImproveHeight(slave)) {
					t.push(`${HG.slaveName}`);
					if (HG.fetishKnown === 1) {
						t.push(`has a subconscious need to be hurt by the biggest, strongest ${girl} possible,`);
					} else {
						t.push(`feels that ${slave.slaveName} is too short,`);
					}
					t.push(`so ${he2} gives ${slave.slaveName} injections of growth stimulants to make ${him} grow taller.`);
					slave.drugs = Drug.GROWTHSTIM;
				} else if (HG.fetish === Fetish.BOOBS && slave.boobs < 15000) {
					t.push(`${HG.slaveName} gives ${slave.slaveName}`);
					if (arcology.FSAssetExpansionistResearch === 1) {
						slave.drugs = Drug.HYPERBREAST;
					} else {
						slave.drugs = Drug.GROWBREAST;
					}
					t.push(`${slave.drugs},`);
					if (HG.fetishKnown === 1) {
						t.push(`since as far as ${he2}'s concerned there's no such thing as too much boob.`);
					} else {
						t.push(`eager to see just how much boob ${slave.slaveName} can handle.`);
					}
				} else if (canImpreg(slave, HG) && !arcologyInfo.fsActive('FSRestart') && (getHGTastes() === 4 || HG.fetish === Fetish.PREGNANCY)) {
					t.push(`${HG.slaveName} gives ${slave.slaveName} fertility enhancers, since ${he2} wants to see ${slave.slaveName} heavy with child.`);
					slave.drugs = Drug.FERTILITY;
				} else if (arcology.FSRepopulationFocusPregPolicy === 1 && canImpreg(slave, HG)) {
					t.push(`${HG.slaveName} gives ${slave.slaveName} fertility enhancers, since pregnancy is popular and ${he2} wants ${slave.slaveName} to look hot.`);
					slave.drugs = Drug.FERTILITY;
				} else if (getHGTastes() > 1) {
					// need to consider things here
					if (slave.lips <= 70) {
						t.push(`${HG.slaveName} gives ${slave.slaveName} lip injections, since ${he2} thinks ${slave.slaveName} should have lips so big ${he} can barely speak.`);
						slave.drugs = Drug.GROWLIP;
					} else if (slave.boobs > (125 * Math.pow(slave.butt, 2))) {
						t.push(`${HG.slaveName} gives ${slave.slaveName} ass injections, since ${he2} loves curves and thinks ${slave.slaveName}'s butt needs the most work.`);
						slave.drugs = Drug.GROWBUTT;
					} else {
						t.push(`${HG.slaveName} gives ${slave.slaveName} boob injections, since ${he2} loves curves and thinks ${slave.slaveName}'s tits need the most work.`);
						slave.drugs = Drug.GROWBREAST;
					}
				}
			}
		} else {
			if (slave.health.condition < 90) {
				t.push(`${HG.slaveName} gives ${slave.slaveName} curatives, since ${his2} assistant could be healthier.`);
				slave.curatives = 2;
			}
		}
		return t;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.Entity.SlaveState} HG
	 */
	function HGSetsLivingConditions(slave, HG) {
		// Room for expansion
		if (slave.rules.living !== "luxurious") {
			slave.rules.living = "luxurious";
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.Entity.SlaveState} HG
	 */
	function slaveAssistsHG(slave, HG) {
		if (slave.devotion > 20) {
			if (App.EndWeek.saVars.HGSlaveSuccess) {
				r.push(`looks after your Head Girl ${SlaveFullName(HG)} domestically and sexually, freeing ${him2} to devote more of ${his2} time to looking after your other slaves.`);
			} else {
				r.push(`does ${his} best to look after your Head Girl ${SlaveFullName(HG)} domestically and sexually, but doesn't free up much of ${his2} time this week.`);
			}
		} else if (slave.trust < -20) {
			if (App.EndWeek.saVars.HGSlaveSuccess) {
				r.push(`obeys Head Girl ${SlaveFullName(HG)} domestically and sexually, freeing ${him2} to devote more of ${his2} time to looking after your other slaves.`);
			} else {
				r.push(`tries to look after your Head Girl ${SlaveFullName(HG)} domestically and sexually, but doesn't free up much of ${his2} time this week.`);
			}
		} else {
			if (App.EndWeek.saVars.HGSlaveSuccess) {
				r.push(`resists Head Girl ${SlaveFullName(HG)}'s domestic and sexual use, but still frees ${him2} to devote more of ${his2} time to looking after your other slaves.`);
			} else {
				r.push(`resists Head Girl ${SlaveFullName(HG)}'s domestic and sexual use, and doesn't free up much of ${his2} time this week.`);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.Entity.SlaveState} HG
	 */
	function HGSlaveTreatment(slave, HG) {
		if (HG.fetish === Fetish.SADIST && HG.fetishStrength > 60) {
			if (HG.fetishKnown === 1) {
				r.push(`Since ${HG.slaveName} is a sadist, poor ${slave.slaveName} lives a life of fear and pain.`);
			} else {
				r.push(`Given a toy of ${his2} own to break, ${HG.slaveName} <span class="fetish gain">unleashes ${his2} sadistic side</span> on poor ${slave.slaveName}.`);
				HG.fetishKnown = 1;
			}
			if (slave.energy > 95) {
				r.push(`Though it's hard, ${he} manages to find <span class="devotion inc">sexual satisfaction</span> being a pain slave.`);
				slave.devotion += 4;
				slave.need = 0;
			} else if (slave.fetish === Fetish.MASOCHIST) {
				if (slave.fetishKnown === 1) {
					if (slave.fetishStrength > 95) {
						r.push(`${He} finds deep <span class="devotion inc">sexual satisfaction</span> being a pain slave.`);
						slave.devotion += 4;
					} else {
						r.push(`This forces ${him} to find solace in <span class="fetish inc">deeper masochism.</span>`);
						slave.fetishStrength += 4;
					}
				} else {
					r.push(`Oddly enough, ${he} seems to find it enjoyable; <span class="fetish gain">${he}'s a natural masochist.</span>`);
					slave.fetishKnown = 1;
				}
				slave.need = 0;
			} else if (slave.devotion < -20) {
				r.push(`This rapidly fills ${him} with <span class="devotion dec">hatred</span> and <span class="trust dec">fear.</span>`);
				slave.devotion -= 10;
				slave.trust -= 10;
			} else if (slave.devotion > 20) {
				r.push(`This fills ${him} with <span class="devotion dec">bitterness</span> and <span class="trust dec">fear.</span>`);
				slave.devotion -= 5;
				slave.trust -= 5;
			}
		} else if (slave.devotion < -20) {
			if (slave.trust >= -20) {
				r.push(`Since ${he} is not yet obedient, ${HG.slaveName} <span class="trust dec">punishes</span> ${him} constantly, training ${him} to be a decent assistant or suffer pain.`);
				slave.trust -= 5;
			} else {
				r.push(`Since ${he} isn't suitably broken into slavery yet, ${HG.slaveName} trains ${him} to be <span class="devotion inc">obedient</span> or suffer pain.`);
				slave.devotion += 5;
			}
		} else if (slave.devotion <= 20) {
			r.push(`Since ${he} is not yet well trained, ${HG.slaveName} instructs ${him}, <span class="devoting inc">training</span> ${him} to be a proper assistant.`);
			slave.devotion += 4;
		} else if (slave.devotion <= 50) {
			r.push(`Since ${he} is not yet a devoted slave, ${HG.slaveName} works with ${him}, <span class="devotion inc">training</span> ${him} to be a good assistant.`);
			slave.devotion += 2;
		} else {
			r.push(`Since ${he} is a devoted assistant, ${HG.slaveName} <span class="devotion inc">praises</span> and encourages ${him}.`);
			slave.devotion += 1;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.Entity.SlaveState} HG
	 */
	function slaveHGRelations(slave, HG) {
		if (HG.rivalry !== 0 && HG.rivalryTarget === slave.ID) {
			r.push(`${HG.slaveName} <span class="rivalry dec">resolves the rivalry</span> between ${him2} and ${slave.slaveName}, mostly by the expedient of punishing ${slave.slaveName} savagely whenever ${he} gives any trouble.`);
			HG.rivalry = 0;
			HG.rivalryTarget = 0;
			slave.rivalry = 0;
			slave.rivalryTarget = 0;
		} else if (HG.relationship === 0) {
			if (areRelated(slave, HG) && V.seeIncest === 1) {
				r.push(`${HG.slaveName}`);
				if (HG.devotion > 95) {
					r.push(`is so inured to the perversities of slavery that ${he2} <span class="devotion inc">enjoys</span> the prospect of sexual service from ${his2}`);
					HG.devotion += 1;
				} else if (HG.sexualQuirk === SexualQuirk.PERVERT) {
					r.push(`is such a pervert that ${he2} <span class="devotion inc">enjoys</span> the prospect of sexual service from ${his2}`);
					HG.devotion += 1;
				} else if (HG.behavioralQuirk === BehavioralQuirk.SINFUL) {
					r.push(`is sinful enough that ${he2} accepts, without complaint, sexual service from ${his2}`);
				} else if (HG.devotion > 60) {
					r.push(`is so devoted to you that ${he2} accepts the prospect of`);
				} else {
					r.push(`is somewhat <span class="devotion dec">disturbed</span> by the prospect of sexual service from ${his2}`);
					HG.devotion -= 2;
				}
				r.push(`${relativeTerm(HG, slave)}. ${slave.slaveName}`);
				if (slave.devotion > 95) {
					r.push(`is so inured to the perversities of slavery that ${he} <span class="devotion inc">savors</span> the thought of sexually servicing ${his}`);
					slave.devotion += 1;
				} else if (slave.sexualQuirk === SexualQuirk.PERVERT) {
					r.push(`is such a pervert that ${he} <span class="devotion inc">enjoys</span> the thought of sexually servicing ${his}`);
					slave.devotion += 1;
				} else if (slave.behavioralQuirk === BehavioralQuirk.SINFUL) {
					r.push(`is sinful enough that ${he} accepts, without complaint, the prospect of sexually servicing ${his}`);
				} else if (slave.devotion > 60) {
					r.push(`is so devoted to you that ${he} accepts the prospect of sexually servicing ${his}`);
				} else if (slave.devotion > 40) {
					r.push(`is somewhat <span class="devotion dec">disturbed</span> by the prospect of sexually servicing ${his}`);
					slave.devotion -= 2;
				} else if (slave.devotion > 20) {
					r.push(`is <span class="devotion dec">disturbed</span> by the prospect of sexually servicing ${his}`);
					slave.devotion -= 4;
				} else if (slave.devotion >= -20) {
					r.push(`is <span class="devotion dec">strongly disturbed</span> by the prospect of sexually servicing ${his}`);
					slave.devotion -= 5;
				} else {
					r.push(`is <span class="devotion dec">revolted</span> by the prospect of sexually servicing ${his}`);
					slave.devotion -= 10;
				}
				r.push(`${relativeTerm(slave, HG)}.`);
			}
			if (slave.relationship === 0 && slave.devotion > 20) {
				r.push(`${slave.slaveName} sees ${HG.slaveName} constantly, and does ${his} best to <span class="relationship">become ${his2} friend.</span>`);
				HG.relationship = 1;
				HG.relationshipTarget = slave.ID;
				slave.relationship = 1;
				slave.relationshipTarget = V.HeadGirlID;
			} else if (slave.relationship === -2 && slave.devotion > 20 && slave.devotion < 50) {
				r.push(`${slave.slaveName} sees ${HG.slaveName} so much more than ${he} sees you and begins to warm up to ${him2} instead of you, <span class="relationship">becoming ${his2} friend.</span>`);
				HG.relationship = 1;
				HG.relationshipTarget = slave.ID;
				slave.relationship = 1;
				slave.relationshipTarget = V.HeadGirlID;
			} else if (slave.relationship !== 5 && slave.relationship > 0 && slave.relationshipTarget !== V.HeadGirlID) {
				const friend = getSlave(slave.relationshipTarget);
				r.push(`${slave.slaveName}, as ${HG.slaveName}'s bitch, knows ${friend.slaveName} cannot compete with the Head Girl, and so <span class="relationship dec">their relationship fades.</span>`);
				slave.relationship = 0;
				slave.relationshipTarget = 0;
				friend.relationship = 0;
				friend.relationshipTarget = 0;
			}
		} else {
			if (HG.relationshipTarget === slave.ID) {
				if (areRelated(HG, slave) && V.seeIncest === 0) {
					if (slave.relationship < 2) {
						r.push(`Since ${HG.slaveName} and ${slave.slaveName} are already friends, they're <span class="trust inc">thankful</span> to you for allowing it. After spending so much time together, they quickly begin to consider themselves <span class="relationship">best friends.</span>`);
						slave.trust += 1;
						HG.trust += 1;
						HG.relationship = 2;
						HG.relationshipTarget = slave.ID;
						slave.relationship = 2;
						slave.relationshipTarget = V.HeadGirlID;
					} else {
						r.push(`Since ${HG.slaveName} and ${slave.slaveName} are best friends, they <span class="devotion inc">enjoy</span> spending time together and are <span class="trust inc">thankful</span> to you for allowing it.`);
						slave.trust += 2;
						slave.devotion += 2;
						HG.trust += 2;
						HG.devotion += 2;
					}
				} else {
					if (slave.relationship <= 2) {
						r.push(`Since ${HG.slaveName} and ${slave.slaveName} are already friends, they're <span class="trust inc">thankful</span> to you for allowing it. After a few nights of offering each other sexual comfort, they consider themselves <span class="relationship">friends with benefits.</span>`);
						slave.trust += 1;
						HG.trust += 1;
						HG.relationship = 3;
						HG.relationshipTarget = slave.ID;
						slave.relationship = 3;
						slave.relationshipTarget = V.HeadGirlID;
					} else if (slave.relationship <= 3) {
						r.push(`Since ${HG.slaveName} and ${slave.slaveName} are already lovers, they both <span class="devotion inc">enjoy</span> living together and are <span class="trust inc">thankful</span> to you for allowing it. After living together for a few days, they draw closer emotionally, too, and consider themselves <span class="relationship">lovers.</span>`);
						slave.trust += 2;
						slave.devotion += 2;
						HG.trust += 2;
						HG.devotion += 2;
						HG.relationship = 4;
						HG.relationshipTarget = slave.ID;
						slave.relationship = 4;
						slave.relationshipTarget = V.HeadGirlID;
					} else if (slave.relationship <= 4) {
						if (HG.fetishStrength <= 60 && HG.fetish === Fetish.SADIST && slave.fetish !== Fetish.MASOCHIST) {
							if (HG.fetishKnown === 1) {
								r.push(`Since their relationship is very abusive, only ${HG.slaveName} <span class="devotion inc">enjoys</span> living together with ${slave.slaveName}.`);
							} else {
								r.push(`It turns out their relationship is <span class="fetish gain">rather abusive,</span> so only ${HG.slaveName} gets any <span class="devotion inc">enjoyment</span> out of living together with ${slave.slaveName}.`);
							}
							HG.devotion += 3;
							slave.devotion -= 5;
							slave.trust -= 5;
						} else {
							r.push(`Since ${HG.slaveName} and ${slave.slaveName} are lovers, they <span class="devotion inc">enjoy</span> living together and are <span class="trust inc">thankful</span> to you for encouraging it.`);
							HG.devotion += 3;
							slave.devotion += 3;
							HG.trust += 2;
							slave.trust += 2;
						}
					} else {
						r.push(`Since ${HG.slaveName} and ${slave.slaveName} are`);
						if (wife === wife2) {
							r.push(`slave wives,`);
						} else {
							r.push(`married,`);
						}
						r.push(`they <span class="devotion inc">enjoy</span> living together and are <span class="trust inc">thankful</span> to you for encouraging it.`);
						HG.devotion += 4;
						slave.devotion += 4;
						HG.trust += 3;
						slave.trust += 3;
					}
				}
				HG.relationship = slave.relationship;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.Entity.SlaveState} HG
	 */
	function HGTrainsSlave(slave, HG) {
		if (slave.skill.oral <= 30) {
			r.push(`${HG.slaveName} wants to come home to a talented tongue, so ${he2} trains ${slave.slaveName}'s oral skills.`);
			r.push(slaveSkillIncrease('oral', slave, 10));
		} else if (slave.vagina > 0 && canDoVaginal(slave) && slave.skill.vaginal <= 30) {
			r.push(`${HG.slaveName} wants ${his2} personal sex slave to be as skilled with ${his} pussy as possible, so ${he2} trains ${slave.slaveName}'s vaginal skills.`);
			r.push(slaveSkillIncrease('vaginal', slave, 10));
		} else if (((HG.vagina > 0 && canDoVaginal(HG)) || (HG.anus > 0 && canDoAnal(HG))) && slave.dick > 0 && canPenetrate(slave) && slave.skill.penetrative <= 30) {
			r.push(`${HG.slaveName} wants ${his2} personal sex slave to be as skilled with ${his} dick as possible, so ${he2} trains ${slave.slaveName}'s penetrative skills.`);
			r.push(slaveSkillIncrease('penetrative', slave, 10));
		} else if (slave.anus > 0 && canDoAnal(slave) && slave.skill.anal <= 30) {
			r.push(`${HG.slaveName} wants ${his2} personal sex slave to be a skillful backdoor whore, so ${he2} trains ${slave.slaveName}'s anal skills.`);
			r.push(slaveSkillIncrease('anal', slave, 10));
		} else if (slave.skill.entertainment <= 30) {
			r.push(`${HG.slaveName} wants to be kept amused in ${his2} occasional free time, so ${he2} trains ${slave.slaveName}'s entertainment skills.`);
			r.push(slaveSkillIncrease('entertainment', slave, 10));
		} else if (slave.sexualFlaw !== SexualFlaw.NONE) {
			r.push(`${HG.slaveName} is annoyed by ${slave.slaveName}'s sexual flaws, so ${he2} <span class="flaw break">trains</span> ${him} out of them.`);
			slave.sexualFlaw = SexualFlaw.NONE;
		} else if (slave.behavioralFlaw !== BehavioralFlaw.NONE) {
			r.push(`${HG.slaveName} is irritated by ${slave.slaveName}'s flaws, so ${he2} <span class="flaw break">trains</span> ${him} out of them.`);
			slave.behavioralFlaw = BehavioralFlaw.NONE;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.Entity.SlaveState} HG
	 */
	function HGStretchesHoles(slave, HG) {
		if (canDoVaginal(slave)) {
			if (slave.vagina === 0) {
				r.push(`${HG.slaveName} <span class="devotion inc">loves</span> <span class="virginity loss">taking</span> ${slave.slaveName}'s virginity, and spends much of the week ogling ${his2} conquest complacently.`);
				slave.vagina = 1;
				HG.devotion += 4;
			} else if (V.seeStretching === 1) {
				if (slave.vagina === 1) {
					if (HG.dick > 4 && HG.energy > 95) {
						r.push(`${HG.slaveName} has such a ferocious sex drive and such a big dick that ${his2} constant pounding of ${slave.slaveName} <span class="change positive">loosens</span> the poor ${girl}'s pussy.`);
						slave.vagina += 1;
					} else if (HG.dick > 5) {
						r.push(`Serving ${HG.slaveName}'s monster cock <span class="change positive">loosens</span> ${slave.slaveName}'s pussy.`);
						slave.vagina += 1;
					}
				} else if (slave.vagina === 2) {
					if (HG.dick > 5 && HG.energy > 95) {
						r.push(`${HG.slaveName} has such a ferocious sex drive and such a monster cock that ${his2} constant pounding of ${slave.slaveName} <span class="change positive">loosens</span> the poor ${girl}'s pussy.`);
						slave.vagina += 1;
					}
				} else if (slave.vagina === 3) {
					if (HG.dick > 5 && HG.energy > 95 && random(1, 100) > 80) {
						r.push(`${HG.slaveName} has such a ferocious sex drive and such a monster cock that ${his2} constant pounding of ${slave.slaveName}'s loose pussy inevitably leaves it <span class="change positive">gaping.</span>`);
						slave.vagina += 1;
					}
				}
			}
		}
		if (canDoAnal(slave)) {
			if (slave.anus === 0) {
				r.push(`${HG.slaveName} <span class="devotion inc">relishes</span> <span class="virginity loss">taking</span> ${slave.slaveName}'s anal virginity, and spends much of the week groping ${his2} conquest's rear end possessively.`);
				slave.anus = 1;
				HG.devotion += 4;
			} else if (V.seeStretching === 1) {
				if (slave.anus === 1) {
					if (HG.dick > 4 && HG.energy > 95) {
						r.push(`${HG.slaveName} uses ${slave.slaveName}'s anus to vent ${his2} sexual addiction. Constant assrape from such a huge dick <span class="change positive">loosens</span> ${his} sphincter.`);
						slave.anus += 1;
					} else if (HG.dick > 5) {
						r.push(`Taking ${HG.slaveName}'s monster cock up the butt <span class="change positive">loosens</span> ${slave.slaveName}'s anal sphincter.`);
						slave.anus += 1;
					}
				} else if (slave.anus === 2) {
					if (HG.dick > 5 && HG.energy > 95) {
						r.push(`${HG.slaveName} uses ${slave.slaveName}'s anus to vent ${his2} sexual addiction. Constant assrape from the Head Girl's monster cock <span class="change positive">loosens</span> ${his} sphincter.`);
						slave.anus += 1;
					}
				} else if (slave.anus === 3) {
					if (HG.dick > 5 && HG.energy > 95 && random(1, 100) > 80) {
						r.push(`${HG.slaveName} uses ${slave.slaveName}'s loose anus to vent ${his2} sexual addiction. Constant assrape from the Head Girl's monster cock eventually leaves it <span class="change positive">gaping.</span>`);
						slave.anus += 1;
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.Entity.SlaveState} HG
	 */
	function HGManagesPregnancy(slave, HG) {
		if (HG.fetish === Fetish.PREGNANCY && canImpreg(slave, HG) && slave.pregKnown === 0) {
			if (!FutureSocieties.isActive('FSRestart', arcology)) {
				r.push(`${HG.slaveName} promptly <span class="pregnant">impregnates</span>`);
				if (HG.fetishKnown === 1) {
					r.push(`${slave.slaveName}, to your Head Girl's considerable <span class="devotion inc">satisfaction.</span> ${slave.slaveName} spent the week regularly getting held down and ejaculated into anytime ${his} superior had cum to spare.`);
					HG.devotion += 4;
				} else {
					r.push(`${slave.slaveName}. ${His2} eagerness completely exposes ${his2} hidden <span class="fetish gain">pregnancy kink.</span>`);
					HG.fetishKnown = 1;
				}
				knockMeUp(slave, 100, 2, V.HeadGirlID);
				if (HG.fetishStrength > 70 && canImpreg(HG, slave)) {
					r.push(`Unsurprisingly, ${he2} gives in to ${his2} own cravings and also takes ${slave.slaveName}'s loads until ${he2} <span class="pregnant">gets pregnant</span> too.`);
					knockMeUp(HG, 100, 2, slave.ID);
				}
			} else if (HG.fetishKnown === 1) {
				r.push(`${HG.slaveName} knows better than to even consider knocking up ${slave.slaveName}.`);
			}
		} else if (HG.fetish === Fetish.PREGNANCY && canImpreg(HG, slave) && HG.pregKnown === 0) {
			if (!FutureSocieties.isActive('FSRestart', arcology) && HG.fetishStrength > 70) {
				r.push(`${HG.slaveName} promptly <span class="pregnant">knocks ${himself2} up</span> with ${slave.slaveName}'s`);
				if (HG.fetishKnown === 1) {
					r.push(`seed, to your Head Girl's considerable <span class="devotion inc">satisfaction.</span>`);
					HG.devotion += 4;
				} else {
					r.push(`seed. ${His2} <span class="devotion inc">pride</span> over ${his2} new pregnancy and eagerness to get pregnant completely exposes ${his2} hidden, and powerful, <span class="fetish gain">pregnancy fetish.</span>`);
					HG.fetishKnown = 1;
					HG.devotion += 4;
				}
				knockMeUp(HG, 100, 2, slave.ID);
			} else if (HG.fetishKnown === 1) {
				r.push(`${HG.slaveName} knows better than to even consider getting knocked up by ${slave.slaveName}.`);
			}
		} else if (arcology.FSRepopulationFocusPregPolicy === 1 && canImpreg(slave, HG) && slave.pregKnown === 0) {
			r.push(`${HG.slaveName} wastes no time in chasing the current trend and hurries to <span class="pregnant">impregnate</span> ${slave.slaveName}.`);
			knockMeUp(slave, 100, 2, V.HeadGirlID);
		} else if (slave.pregKnown === 1) {
			if (slave.breedingMark === 1) {
				r.push(`Since ${slave.slaveName} is marked as a breeding slave, ${HG.slaveName} feels it is ${his2} duty to keep ${his} pregnancy safe.`);
			} else if (slave.pregSource === -1) {
				r.push(`Since ${slave.slaveName} is bearing your child${slave.pregType > 1 ? "ren" : ""}, ${HG.slaveName} feels ${he2} has been tasked with keeping ${his} pregnancy safe.`);
			} else if (HG.fetish === Fetish.PREGNANCY) {
				r.push(`${HG.slaveName}`);
				if (slave.geneticQuirks.superfetation === 2 && V.geneticMappingUpgrade !== 0 && (slave.pregSource === V.HeadGirlID || FutureSocieties.isActive('FSRepopulationFocus'))) {
					r.push(`takes advantage of ${slave.slaveName}'s unusual fertility to`);
					if (HG.fetishKnown === 1) {
						r.push(`<span class="pregnant">add another baby</span> to ${his} growing collection.`);
					} else {
						r.push(`further your goals by`);
						if (slave.bellyPreg > 10000) {
							r.push(`cramming <span class="pregnant">another child</span> into ${his} increasingly full womb.`);
						} else {
							r.push(`planting <span class="pregnant">another child</span> in ${him}.`);
						}
					}
					knockMeUp(slave, 100, 2, V.HeadGirlID);
				} else {
					if (HG.fetishKnown === 1) {
						if (slave.bellyPreg > 500) {
							r.push(`enjoys the swell of ${slave.slaveName}'s baby bump, giving ${him2} plenty of reason to keep ${his} pregnancy.`);
						} else {
							r.push(`keeps ${slave.slaveName} pregnant so that ${he2} may savor ${his} growth.`);
						}
					} else {
						r.push(`pays an unusual amount of attention to ${slave.slaveName}'s pregnancy.`);
					}
				}
			} else if (arcology.FSRepopulationFocusPregPolicy === 0 && !FutureSocieties.isActive('FSRepopulationFocus', arcology) && V.HGSuiteDrugs === 1) {
				if (slave.preg > slave.pregData.normalBirth - 2 && slave.preg > slave.pregData.minLiveBirth && slave.broodmother === 0 && !isInLabor(slave)) {
					r.push(`${HG.slaveName} has no interest in a slut stuffed full of unwanted spawn, so ${he2} promptly doses ${slave.slaveName} with labor inducing agents to get ${him} back in fucking shape.`);
					induce(slave);
					startLabor(slave);
				} else if (V.HGSuiteAbortion) {
					r.push(`${HG.slaveName} promptly aborts the child growing in ${slave.slaveName} since ${he2} prefers ${his2} ${girl}s not harboring someone else's child or loaded down with ${his2} own unwanted spawn.`);
					TerminatePregnancy(slave);
					actX(slave, "abortions");
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.Entity.SlaveState} HG
	 */
	function HGCausesFetish(slave, HG) {
		if (fetishChangeChance(slave) > random(0, 100) && HG.fetishKnown === 1 && HG.fetishStrength > 60 && slave.fetish !== Fetish.MINDBROKEN) {
			if (HG.fetish === Fetish.SUBMISSIVE) {
				if (slave.fetish !== Fetish.DOM) {
					r.push(`${slave.slaveName} slowly gets used to ${HG.slaveName}'s need to be sexually dominated, and begins to <span class="fetish gain">enjoy being a top</span> within the confines of the suite.`);
					slave.fetish = Fetish.DOM;
					slave.fetishKnown = 1;
					slave.fetishStrength = 10;
				}
			} else if (HG.fetish === Fetish.DOM) {
				if (slave.fetish !== Fetish.SUBMISSIVE) {
					r.push(`${slave.slaveName} slowly gets used to being tied up and fucked regularly, and accepts that it's how ${HG.slaveName}'s sexual attraction to ${him} expresses itself. ${He} begins to <span class="fetish gain">enjoy being a sub,</span> especially for ${HG.slaveName}.`);
					slave.fetish = Fetish.SUBMISSIVE;
					slave.fetishKnown = 1;
					slave.fetishStrength = 10;
				}
			} else if (HG.fetish === Fetish.BOOBS) {
				if (slave.fetish !== Fetish.BOOBS) {
					r.push(`${HG.slaveName} lavishes so much attention on ${slave.slaveName}'s boobs that ${slave.slaveName} really starts to <span class="fetish gain">fetishize tits</span> too.`);
					slave.fetish = Fetish.BOOBS;
					slave.fetishKnown = 1;
					slave.fetishStrength = 10;
				}
			} else if (HG.fetish === Fetish.PREGNANCY) {
				if (slave.fetish !== Fetish.PREGNANCY) {
					r.push(`${slave.slaveName} and ${HG.slaveName} spend so much time talking about pregnancy and fertility that ${slave.slaveName} really starts to <span class="fetish gain">fetishize pregnancy</span> too.`);
					slave.fetish = Fetish.PREGNANCY;
					slave.fetishKnown = 1;
					slave.fetishStrength = 10;
				}
			} else if (HG.fetish === Fetish.CUMSLUT) {
				if (slave.fetish !== Fetish.CUMSLUT) {
					r.push(`${slave.slaveName} participates in enough of ${HG.slaveName}'s cum games that ${he} can't help but <span class="fetish gain">enjoy oral sex</span> ${himself}.`);
					slave.fetish = Fetish.CUMSLUT;
					slave.fetishKnown = 1;
					slave.fetishStrength = 10;
				}
			} else if (HG.fetish === Fetish.HUMILIATION) {
				if (slave.fetish !== Fetish.HUMILIATION) {
					r.push(`${slave.slaveName} has so much public sex with ${HG.slaveName} that ${he} really starts to <span class="fetish gain">enjoy humiliation</span> ${himself}.`);
					slave.fetish = Fetish.HUMILIATION;
					slave.fetishKnown = 1;
					slave.fetishStrength = 10;
				}
			} else if (HG.fetish === Fetish.BUTTSLUT) {
				if (slave.fetish !== Fetish.BUTTSLUT) {
					if (canDoAnal(slave)) {
						r.push(`${slave.slaveName} takes ${HG.slaveName}'s`);
						if (canPenetrate(HG)) {
							r.push(`dick`);
						} else {
							r.push(`strap-on and dildos`);
						}
						r.push(`up ${his} poor anus so often that ${he} starts to <span class="fetish gain">enjoy buttsex</span> ${himself}.`);
					} else {
						r.push(`${HG.slaveName} lavishes so much attention on ${slave.slaveName}'s butt, since ${he2} can't use it, that ${slave.slaveName} really starts to <span class="fetish gain">fetishize rears</span> too.`);
					}
					slave.fetish = Fetish.BUTTSLUT;
					slave.fetishKnown = 1;
					slave.fetishStrength = 10;
				}
			} else if (HG.fetish === Fetish.MASOCHIST) {
				if (slave.fetish !== Fetish.SADIST) {
					r.push(`${slave.slaveName} is initially shocked to be asked to cause ${HG.slaveName} pain, but ${he} slowly begins to understand the honestly sexual nature of the arrangement. ${He} starts to <span class="fetish gain">enjoy causing pain,</span> since ${HG.slaveName} is clearly enjoying it so much.`);
					slave.fetish = Fetish.SADIST;
					slave.fetishKnown = 1;
					slave.fetishStrength = 10;
				}
			} else if (HG.fetish === Fetish.SADIST) {
				if (slave.fetish !== Fetish.MASOCHIST) {
					r.push(`${HG.slaveName} likes to play rough in bed, so it isn't long before ${slave.slaveName} starts to find it difficult to <span class="fetish gain">separate pain from pleasure.</span>`);
					slave.fetish = Fetish.MASOCHIST;
					slave.fetishKnown = 1;
					slave.fetishStrength = 10;
				}
			} else {
				if (canDoAnal(slave) || canDoVaginal(slave)) {
					if (slave.fetish !== Fetish.NONE) {
						r.push(`${slave.slaveName} often takes ${HG.slaveName}'s`);
						if (canPenetrate(HG)) {
							r.push(`dick`);
						} else {
							r.push(`strap-on`);
						}
						r.push(`in the missionary position, after some light foreplay and before bed; ${he} honestly enjoys the respectful lovemaking, and begins to <span class="fetish gain">enjoy vanilla sex</span> ${himself}.`);
						slave.fetish = Fetish.NONE;
						slave.fetishKnown = 1;
						slave.fetishStrength = 10;
					}
				}
			}
		}
		if (HG.attrKnown === 1) {
			if (HG.attrXX > 85 && slave.attrXX > 65 && slave.attrXX <= 85) {
				r.push(`${slave.slaveName} and ${HG.slaveName} spend so much time giggling over which of your other slaves they think is prettiest (typically followed by giggling sex) that ${slave.slaveName} really starts to <span class="improvement">fetishize girls</span> too.`);
				slave.attrXX += 2;
				slave.attrKnown = 1;
			}
			if (HG.attrXY > 85 && slave.attrXY > 65 && slave.attrXY <= 85) { // needs male slave support
				r.push(`${slave.slaveName} and ${HG.slaveName} have so much fun debating which male citizens, dickgirls and slave boys are cutest (typically followed by`);
				if (canDoAnal(slave) || canDoVaginal(slave)) {
					r.push(`${HG.slaveName} banging ${his2} ${girl}toy`);
					if (!canPenetrate(HG)) {
						r.push(`with a strap-on)`);
					} else {
						r.push(`senseless)`);
					}
				} else {
					r.push(`giggling sex)`);
				}
				r.push(`that ${slave.slaveName} really starts to <span class="improvement">fetishize boys</span> too.`);
				slave.attrXY += 2;
				slave.attrKnown = 1;
			}
			if (HG.energy > 95 && slave.energy <= 95) {
				r.push(`${slave.slaveName} has so much fun sex with ${HG.slaveName} that <span class="libido inc">${his} sex drive is slowly enhanced.</span>`);
				slave.energy += 2;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.Entity.SlaveState} HG
	 */
	function mediumUse(slave, HG) {
		oralUse += 4;
		if (canDoAnal(slave)) {
			analUse += 3;
			if (canImpreg(slave, HG)) {
				r.push(knockMeUp(slave, 3, 1, V.HeadGirlID));
			}
		} else if (slave.boobs >= 500) {
			mammaryUse += 3;
		} else {
			oralUse += 3;
		}
		if (slave.vagina > 0 && canDoVaginal(slave)) {
			vaginalUse += 3;
			if (canImpreg(slave, HG)) {
				r.push(knockMeUp(slave, 3, 0, V.HeadGirlID));
			}
		} else if (canDoAnal(slave)) {
			analUse += 3;
			if (canImpreg(slave, HG)) {
				r.push(knockMeUp(slave, 3, 1, V.HeadGirlID));
			}
		} else {
			oralUse += 3;
		}
		seX(slave, canDoVaginal(slave)
			? "vaginal"
			: canDoAnal(slave)
				? "anal"
				: "oral",
		HG, "penetrative", 10);
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.Entity.SlaveState} HG
	 */
	function HGSexualSatiation(slave, HG) {
		if (HG.energy > 95) {
			r.push(`${slave.slaveName} spends a lot of time getting fucked in whichever hole or cranny ${HG.slaveName} decides to shove ${his2}`);
			if (canPenetrate(HG)) {
				r.push(`dick`);
			} else {
				r.push(`strap-on`);
			}
			r.push(`into next.`);
			oralUse += 5;
			if (canDoAnal(slave)) {
				analUse += 5;
				if (canImpreg(slave, HG)) {
					r.push(knockMeUp(slave, 5, 1, V.HeadGirlID));
				}
			} else if (slave.boobs >= 500) {
				mammaryUse += 5;
			} else {
				oralUse += 5;
			}
			if (slave.vagina > 0 && canDoVaginal(slave)) {
				vaginalUse += 5;
				if (canImpreg(slave, HG)) {
					r.push(knockMeUp(slave, 5, 0, V.HeadGirlID));
				}
			} else if (canDoAnal(slave)) {
				analUse += 5;
				if (canImpreg(slave, HG)) {
					r.push(knockMeUp(slave, 5, 1, V.HeadGirlID));
				}
			} else {
				oralUse += 5;
			}
			seX(slave, canDoVaginal(slave)
				? "vaginal"
				: canDoAnal(slave)
					? "anal"
					: "oral",
			HG, "penetrative", 15);
		} else if (HG.fetish === Fetish.SUBMISSIVE && HG.fetishKnown === 1) {
			r.push(`${HG.slaveName} walks a fine line with ${slave.slaveName}. They work out a sexual life in which ${HG.slaveName} is in charge, but ${slave.slaveName} takes the sexual lead: ${slave.slaveName} serves ${his} superior by taking ${him2} firmly.`);
			mediumUse(slave, HG);
		} else if (HG.fetish === Fetish.DOM && HG.fetishKnown === 1) {
			r.push(`${slave.slaveName} serves ${HG.slaveName} as ${his2} sexual and moral inferior, taking the Head Girl's`);
			if (canPenetrate(HG)) {
				r.push(`dick`);
			} else {
				r.push(`strap-on`);
			}
			r.push(`in all ${his} holes. Though it isn't necessary with such an obedient partner, ${slave.slaveName} is often tied up for use.`);
			mediumUse(slave, HG);
		} else if (HG.fetish === Fetish.HUMILIATION && HG.fetishKnown === 1) { // swap for exhibitionism in the future
			r.push(`${HG.slaveName} is such an exhibitionist that ${slave.slaveName} finds ${himself} taking ${HG.slaveName}'s`);
			if (canPenetrate(HG)) {
				r.push(`dick`);
			} else {
				r.push(`strap-on`);
			}
			r.push(`in public quite often.`);
			mediumUse(slave, HG);
		} else if (HG.fetish === Fetish.BOOBS && HG.fetishKnown === 1) {
			r.push(`${HG.slaveName} is such a boob fetishist that ${slave.slaveName} sometimes wonders whether ${HG.slaveName} thinks there are four clits in the suite: the four nipples between the two of them.`);
			oralUse += 4;
			mammaryUse += 6;
			seX(slave, "mammary", HG, "penetrative", 10);
		} else if (HG.fetish === Fetish.BUTTSLUT && HG.fetishKnown === 1) {
			r.push(`${HG.slaveName} takes a dominant sexual role with ${slave.slaveName}; ${he2} indulges ${his2}`);
			if (canDoAnal(slave)) {
				r.push(`anal addiction by constantly buttfucking ${slave.slaveName}`);
			} else {
				r.push(`ass obsession by constantly molesting and using ${slave.slaveName}'s buttcheeks as a sex toy`);
			}
			r.push(`while wearing a vibrating plug ${himself2}.`);
			if (canDoAnal(slave)) {
				analUse += 10;
				seX(slave, "anal", HG, "penetrative", 10);
				if (canImpreg(slave, HG)) {
					r.push(knockMeUp(slave, 10, 1, V.HeadGirlID));
				}
			}
		} else if (HG.fetish === Fetish.CUMSLUT && HG.fetishKnown === 1) {
			r.push(`${HG.slaveName} takes a dominant sexual role with ${slave.slaveName}; ${he2} indulges ${his2} oral fixation with constant oral sex. ${He2} certainly applies ${his2} mouth to ${slave.slaveName} when ${he2} gets the chance, but ${slave.slaveName} does most of the sucking.`);
			seX(slave, "oral", HG, "penetrative", 20);
			seX(HG, "oral", slave, "penetrative", 10);
		} else if (HG.fetish === Fetish.MASOCHIST && HG.fetishKnown === 1) {
			r.push(`${HG.slaveName} carefully structures ${his2} sexual games with ${slave.slaveName} to gratify ${his2} deep need to be physically hurt during sex without damaging ${his2} leadership. Usually, ${slave.slaveName} tortures ${HG.slaveName} until ${he2}'s quite sated, and then takes a rough`);
			if (canDoAnal(slave)) {
				r.push(`buttfuck`);
			} else {
				r.push(`facefucking`);
			}
			r.push(`from the aroused ${HG.slaveName}'s`);
			if (canPenetrate(HG)) {
				r.push(`dick`);
			} else {
				r.push(`strap-on`);
			}
			r.push(`to restore their relative positions.`);
			if (canDoAnal(slave)) {
				analUse += 10;
				if (canImpreg(slave, HG)) {
					r.push(knockMeUp(slave, 10, 1, V.HeadGirlID));
				}
			} else {
				oralUse += 10;
			}
			seX(slave, canDoVaginal(slave)
				? "vaginal"
				: canDoAnal(slave)
					? "anal"
					: "oral",
			HG, "penetrative", 10);
		} else if (HG.fetish === Fetish.SADIST && HG.fetishKnown === 1) {
			r.push(`${slave.slaveName} serves ${HG.slaveName} as ${his2} sexual punching bag, taking the Head Girl's`);
			if (canPenetrate(HG)) {
				r.push(`dick`);
			} else {
				r.push(`strap-on`);
			}
			r.push(`roughly in all ${his} holes whenever ${he2} needs to sate ${his2} sadistic urges.`);
			mediumUse(slave, HG);
		} else if (HG.attrXX > 65) {
			r.push(`${HG.slaveName} expects ${slave.slaveName} to be girlish sexually, and ${slave.slaveName} spends a lot of time`);
			if (hasBothLegs(slave)) {
				r.push(`on ${his} knees.`);
			} else {
				r.push(`servicing ${him2}.`);
			}
			oralUse += 6;
			if (canDoAnal(slave)) {
				analUse++;
				if (canImpreg(slave, HG)) {
					r.push(knockMeUp(slave, 1, 1, V.HeadGirlID));
				}
			} else if (slave.boobs >= 500) {
				mammaryUse++;
			} else {
				oralUse++;
			}
			if (slave.vagina > 0 && canDoVaginal(slave)) {
				vaginalUse++;
				if (canImpreg(slave, HG)) {
					r.push(knockMeUp(slave, 1, 0, V.HeadGirlID));
				}
			} else if (canDoAnal(slave)) {
				analUse++;
				if (canImpreg(slave, HG)) {
					r.push(knockMeUp(slave, 1, 1, V.HeadGirlID));
				}
			} else {
				oralUse++;
			}
			seX(slave, canDoVaginal(slave)
				? "vaginal"
				: canDoAnal(slave)
					? "anal"
					: "oral",
			HG, "penetrative", 8);
		} else {
			r.push(`${HG.slaveName} takes a dominant sexual role with ${slave.slaveName}, mostly getting`);
			if (canPenetrate(HG) && (canDoVaginal(slave) || canDoAnal(slave))) {
				r.push(`oral and fucking ${him} in the missionary position.`);
			} else if (slave.boobs >= 300) {
				r.push(`oral and molesting ${his} breasts.`);
			} else {
				r.push(`oral.`);
			}
			oralUse += 4;
			if (canDoAnal(slave)) {
				analUse += 3;
				if (canImpreg(slave, HG)) {
					r.push(knockMeUp(slave, 3, 1, V.HeadGirlID));
				}
			} else if (slave.boobs >= 300) {
				mammaryUse += 3;
			} else {
				oralUse += 3;
			}
			if (slave.vagina > 0 && canDoVaginal(slave)) {
				vaginalUse += 3;
				if (canImpreg(slave, HG)) {
					r.push(knockMeUp(slave, 3, 0, V.HeadGirlID));
				}
			} else if (canDoAnal(slave)) {
				analUse += 3;
				if (canImpreg(slave, HG)) {
					r.push(knockMeUp(slave, 3, 1, V.HeadGirlID));
				}
			} else if (slave.boobs >= 300) {
				mammaryUse += 3;
			} else {
				oralUse += 3;
			}
			seX(slave, canDoVaginal(slave)
				? "vaginal"
				: canDoAnal(slave)
					? "anal"
					: "oral",
			HG, "penetrative", 15);
		}

		if (slave.cervixImplant === 1 || slave.cervixImplant === 3) {
			cervixPump += 20 * vaginalUse;
		}
		if (slave.cervixImplant === 2 || slave.cervixImplant === 3) {
			cervixPump += 20 * analUse;
		}

		if (slave.need) {
			if (slave.fetishKnown) {
				switch (slave.fetish) {
					case Fetish.MASOCHIST:
					case Fetish.SUBMISSIVE:
						if (analUse + vaginalUse > 0) {
							r.push(`Being someone's submissive toy really satisfies ${slave.slaveName}.`);
							slave.need = 0;
						}
						break;
					case Fetish.DOM:
					case Fetish.SADIST:
						if (penetrativeUse > 0) {
							r.push(`Getting to be on top is precious, and it really satisfies ${slave.slaveName}.`);
							slave.need = 0;
						}
						break;
					case Fetish.CUMSLUT:
						if (oralUse > 0) {
							r.push(`Being someone's oral toy really satisfies ${slave.slaveName}.`);
							slave.need = 0;
						}
						break;
					case Fetish.BUTTSLUT:
						if (analUse > 0) {
							r.push(`Having ${his} butthole serve as someone's toy really satisfies ${slave.slaveName}.`);
							slave.need = 0;
						}
						break;
					case Fetish.PREGNANCY:
						if (vaginalUse > 0 && slave.mpreg === 0) {
							r.push(`Having ${his} pussy serve as someone's toy really satisfies ${slave.slaveName}.`);
							slave.need = 0;
						} else if (analUse > 0 && slave.mpreg === 1) {
							r.push(`Having ${his} asspussy serve as someone's toy really satisfies ${slave.slaveName}.`);
							slave.need = 0;
						}
						break;
					case Fetish.HUMILIATION:
						r.push(`Having all the other slaves see ${him} in such a humiliating role really satisfies ${slave.slaveName}.`);
						slave.need = 0;
						break;
					case Fetish.BOOBS:
						r.push(`Having ${his} breasts used sexually helped to slake some of ${his} lust, though not nearly as much as ${he} probably would have liked.`);
						slave.need -= mammaryUse * 5;
						break;
				}
			}
		}

		slave.need -= ((vaginalUse + penetrativeUse + analUse) * 5);
		HG.need = 0;

		if (cervixPump > 0) {
			r.push(`${slave.slaveName} notices ${his} <span class="change positive">belly swell</span> after`);
			if (slave.cervixImplant === 1) {
				r.push(`vaginal`);
			} else if (slave.cervixImplant === 2) {
				r.push(`anal`);
			}
			r.push(`sex throughout the week.`);
			slave.bellyImplant += cervixPump;
		}
	}

	/**
	 * @param {FC.ReportSlave} slave
	 * @param {App.Entity.SlaveState} HG
	 */
	function HGManagesTiredness(slave, HG) {
		// room for expansion
		if (slave.health.tired > 60) {
			r.push(`${HG.slaveName} sees ${he} is becoming exhausted and gives ${him} lighter duties so ${he} doesn't break.`);
		}
		tired(slave);
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.Entity.SlaveState} HG
	 */
	function HGDressesSlave(slave, HG) {
		if (HG.energy > 95) {
			r.push(`${HG.slaveName} keeps ${slave.slaveName} naked so ${he2} doesn't have to waste any time tearing ${his} clothes off.`);
			slave.clothes = "no clothing";
		} else if (slave.devotion <= 20) {
			r.push(`${HG.slaveName} keeps ${slave.slaveName} in a torturous habit since ${he} still clings to ${his} dignity and remains defiant.`);
			slave.clothes = "a penitent nuns habit";
		} else if (HG.fetishKnown === 1) {
			if (HG.fetish === Fetish.SUBMISSIVE) {
				r.push(`${HG.slaveName} keeps ${slave.slaveName} dressed up in slutty power clothing, since ${he2}'s attracted to competence.`);
				slave.clothes = "slutty business attire";
			} else if (HG.fetish === Fetish.MASOCHIST) {
				r.push(`${HG.slaveName} keeps ${slave.slaveName}`);
				if (isItemAccessible.entry("battledress", "clothes")) {
					r.push(`in battledress, since ${he2} likes the fantasy of being raped by a soldier ${girl}.`);
					slave.clothes = "battledress";
				} else {
					r.push(`in a scalemail bikini, since ${he2} likes the fantasy of being raped by a horny barbarian.`);
					slave.clothes = "a scalemail bikini";
				}
			} else if (HG.fetish === Fetish.DOM) {
				r.push(`${HG.slaveName} keeps ${slave.slaveName} dressed up as a school${girl}`);
				if (slave.physicalAge > 16) {
					r.push(`to infantilize ${his2} sub.`);
				} else {
					r.push(`to highlight ${his2} authority over ${his2} young sub.`);
				}
				slave.clothes = "a schoolgirl outfit";
			} else if (HG.fetish === Fetish.BOOBS) {
				r.push(`${HG.slaveName} keeps ${slave.slaveName} wearing a string bikini, since ${he2} likes seeing those tits.`);
				slave.clothes = "a string bikini";
			} else if (HG.fetish === Fetish.CUMSLUT) {
				r.push(`${HG.slaveName} keeps ${slave.slaveName} in restrictive latex, because ${he2} likes how it draws attention to ${his} mouth.`);
				slave.clothes = "restrictive latex";
			} else if (HG.fetish === Fetish.HUMILIATION) {
				r.push(`${HG.slaveName} keeps ${slave.slaveName} in humiliating bondage gear, because ${he2} likes to see others blush, too.`);
				slave.clothes = "uncomfortable straps";
			} else if (HG.fetish === Fetish.SADIST) {
				r.push(`${HG.slaveName} keeps ${slave.slaveName} in humiliating bondage gear, because it can easily be tightened to cause considerable anguish.`);
				slave.clothes = "uncomfortable straps";
			} else if (HG.fetish === Fetish.BUTTSLUT) {
				r.push(`${HG.slaveName} keeps ${slave.slaveName} wearing nothing but slutty bangles, since ${he2} likes dressing ${him} up but wants that butt bare.`);
				slave.clothes = "slutty jewelry";
			} else if (HG.fetish === Fetish.PREGNANCY) {
				if (isItemAccessible.entry("a huge empathy belly", "bellyAccessory", slave) === true) {
					r.push(`${HG.slaveName} keeps ${slave.slaveName} wearing an empathy belly, since ${he2} likes ${his2} ${girl}s with a bun in the oven.`);
					slave.bellyAccessory = "a large empathy belly";
				}
				if (slave.preg > 0 && slave.pregKnown === 1 && slave.pregSource === V.HeadGirlID) {
					r.push(`${HG.slaveName} keeps the pregnant ${slave.slaveName} dressed as a slutty maid, since ${he2} wants ${him} to look motherly yet fuckable while ${he2} fantasizes about fucking ${him} pregnant again.`);
				} else {
					r.push(`${HG.slaveName} keeps ${slave.slaveName} dressed as a slutty maid, since ${he2} wants ${him} to look motherly yet fuckable while ${he2} fantasizes about putting a bun in ${his} oven.`);
				}
				slave.clothes = "a slutty maid outfit";
			} else if (HG.attrXX > 85) {
				r.push(`${HG.slaveName} keeps ${slave.slaveName} wearing nice lingerie, since girls and girliness turn ${him2} on.`);
				slave.clothes = "attractive lingerie";
			} else if (HG.attrXY > 85 && slave.dick > 0) {
				r.push(`${HG.slaveName} keeps ${slave.slaveName} wearing slutty netting with a hole for ${his} dick to stick through, since ${he2} likes it bare.`);
				slave.clothes = "clubslut netting";
			} else {
				r.push(`${HG.slaveName} keeps ${slave.slaveName} dressed as a slutty maid, since ${he2} likes seeing ${his} body as ${he} looks after their suite.`);
				slave.clothes = "a slutty maid outfit";
			}
		} else {
			r.push(`${HG.slaveName} keeps ${slave.slaveName} dressed as a slutty maid, since ${he2} likes seeing ${his} body as ${he} looks after their suite.`);
			slave.clothes = "a slutty maid outfit";
		}
		slave.devotion += 1;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.Entity.SlaveState} HG
	 */
	function narcissistHG(slave, HG) {
		if (HG.bald !== 1 && HG.hLength > 0) {
			if (slave.bald !== 1) {
				if (!hasHColorRule(slave, V.defaultRules)) {
					if (slave.hColor !== HG.hColor) {
						r.push(`${HG.slaveName} dyes ${slave.slaveName}'s hair ${HG.hColor}, just like ${his2} own, since with nymphomania comes narcissism.`);
						slave.hColor = HG.hColor;
					}
				}
				if (!hasHStyleRule(slave, V.defaultRules)) {
					if (slave.hStyle !== HG.hStyle) {
						r.push(`${HG.slaveName} styles ${slave.slaveName}'s hair just like ${his2} own, since with nymphomania comes narcissism.`);
						slave.hStyle = HG.hStyle;
						slave.hLength = HG.hLength;
					}
				}
			} else {
				if (!hasHColorRule(slave, V.defaultRules)) {
					if (slave.hColor !== HG.hColor) {
						r.push(`${HG.slaveName} changes ${slave.slaveName}'s wig to ${HG.hColor}, just like ${his2} own hair, since with nymphomania comes narcissism.`);
						slave.hColor = HG.hColor;
					}
				}
				if (!hasHStyleRule(slave, V.defaultRules)) {
					if (slave.hStyle !== HG.hStyle) {
						r.push(`${HG.slaveName} changes ${slave.slaveName}'s wig style to look just like ${his2} own hair, since with nymphomania comes narcissism.`);
						slave.hStyle = HG.hStyle;
						slave.hLength = HG.hLength;
					}
				}
			}
		}

		if (!hasEyeColorRule(slave, V.defaultRules)) {
			/* HG wants sub slave to have same eye color as her */
			/* make sure the sub slave has both eyes, missing ones are replaced with glass */
			if (!hasLeftEye(slave)) {
				eyeSurgery(slave, "left", "glass");
			}
			if (!hasRightEye(slave)) {
				eyeSurgery(slave, "right", "glass");
			}

			/* get eye colors, HG can be expected to have at least one working eye due to job requirements */
			const left = hasLeftEye(HG) ? getLeftEyeColor(HG) : getRightEyeColor(HG);
			const right = hasRightEye(HG) ? getRightEyeColor(HG) : left;

			/* make sure the slave has the same eye color as the HG */
			if (getLeftEyeColor(slave) !== left) {
				setEyeColor(slave, left, "left");
				r.push(`${HG.slaveName}`);
				if (getLeftEyeType(slave) === 3) {
					r.push(`changes`);
				} else {
					r.push(`gives`);
				}
				r.push(`${slave.slaveName} ${left}`);
				if (getLeftEyeType(slave) === 3) {
					r.push(`eye lenses,`);
				} else if (getLeftEyeType(slave) === 2) {
					r.push(`glass eyes,`);
				} else {
					r.push(`contact lenses,`);
				}
				r.push(`to match ${his2} own left eye, since with nymphomania comes narcissism.`);
			}
			if (getRightEyeColor(slave) !== right) {
				setEyeColor(slave, right, "right");
				r.push(`${HG.slaveName}`);
				if (getRightEyeType(slave) === 3) {
					r.push(`changes`);
				} else {
					r.push(`gives`);
				}
				r.push(`${slave.slaveName} ${right}`);
				if (getLeftEyeType(slave) === 3) {
					r.push(`eye lenses,`);
				} else if (getLeftEyeType(slave) === 2) {
					r.push(`glass eyes,`);
				} else {
					r.push(`contact lenses,`);
				}
				r.push(`to match ${his2} own right eye, since with nymphomania comes narcissism.`);
			}
		}
	}

	/** Allow the HG to set RA surgery rules based on her tastes, for immediate application
	 * @returns {FC.RA.RuleSurgerySettings}
	 */
	function getHGSurgeryTargets() {
		const thisSurgery = App.RA.newRule.surgery();
		switch (getHGTastes()) {
			case 1:
				thisSurgery.lactation = 0;
				thisSurgery.cosmetic = 1;
				thisSurgery.faceShape = FaceShape.CUTE;
				thisSurgery.lips = App.Utils.makeRange(10, 10);
				thisSurgery.hips = 0;
				thisSurgery.hipsImplant = 0;
				thisSurgery.butt = App.Utils.makeRange(0, 0);
				thisSurgery.accent = 0;
				thisSurgery.shoulders = 0;
				thisSurgery.shouldersImplant = 0;
				thisSurgery.boobs = App.Utils.makeRange(0, 0);
				thisSurgery.holes = 0;
				break;
			case 2:
				thisSurgery.lactation = 0;
				thisSurgery.cosmetic = 1;
				thisSurgery.faceShape = FaceShape.CUTE;
				thisSurgery.lips = App.Utils.makeRange(60, 60);
				thisSurgery.hips = 0;
				thisSurgery.hipsImplant = 0;
				thisSurgery.butt = App.Utils.makeRange(4, 4);
				thisSurgery.accent = 0;
				thisSurgery.shoulders = 0;
				thisSurgery.shouldersImplant = 0;
				thisSurgery.boobs = App.Utils.makeRange(1200, 1200);
				thisSurgery.holes = 0;
				break;
			case 3:
				thisSurgery.lactation = 0;
				thisSurgery.cosmetic = 1;
				thisSurgery.faceShape = FaceShape.CUTE;
				thisSurgery.lips = App.Utils.makeRange(95, 95);
				thisSurgery.hips = 0;
				thisSurgery.hipsImplant = 0;
				thisSurgery.butt = App.Utils.makeRange(8, 8);
				thisSurgery.accent = 0;
				thisSurgery.shoulders = 0;
				thisSurgery.shouldersImplant = 0;
				thisSurgery.boobs = App.Utils.makeRange(10000, 10000);
				thisSurgery.holes = 2;
				break;
			case 4:
				thisSurgery.lactation = 1;
				thisSurgery.cosmetic = 1;
				thisSurgery.faceShape = FaceShape.CUTE;
				thisSurgery.lips = App.Utils.makeRange(10, 10);
				thisSurgery.hips = 3;
				thisSurgery.hipsImplant = 0;
				thisSurgery.butt = App.Utils.makeRange(0, 0);
				thisSurgery.accent = 0;
				thisSurgery.shoulders = 0;
				thisSurgery.shouldersImplant = 0;
				thisSurgery.boobs = App.Utils.makeRange(0, 0);
				thisSurgery.holes = 0;
				break;
			default:
				throw Error("Unexpected HG tastes");
		}
		return thisSurgery;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.Entity.SlaveState} HG
	 */
	function HGArrangesSurgery(slave, HG) {
		if (!FutureSocieties.isActive('FSBodyPurist', arcology)) {
			r.push(`${HG.slaveName} sends ${V.assistant.name} notes on what surgical modifications ${he2} wants for ${slave.slaveName}.`);
			r.push(rulesAutosurgery(slave, getHGSurgeryTargets()));
		}
		if (HG.fetishKnown === 1) {
			if (HG.fetish === Fetish.SADIST && HG.fetishStrength > 95 && V.seeExtreme === 1 && slave.fetish !== Fetish.MINDBROKEN) {
				if (slave.health.condition > 40) {
					if (hasAnyNaturalLimbs(slave) && slave.devotion < -20) {
						let frag = `${HG.slaveName} decides to extract the ultimate in sadistic pleasure from ${slave.slaveName}, and directs the autosurgery to <span class="health dec">amputate ${his}`;
						if (hasAnyArms(slave)) {
							frag += ` arm${hasBothArms(slave) ? "s" : ""}`;
							if (hasAnyLegs(slave)) {
								frag += ` and`;
							}
						}
						if (hasAnyLegs(slave)) {
							frag += ` leg${hasBothLegs(slave) ? "s" : ""}`;
						}
						frag += `.</span> ${He2} carefully <span class="trust dec">describes the entire process</span> to the sobbing slave <span class="devotion dec">in minute detail</span> before allowing ${him} to be sedated.`;
						r.push(frag);
						slave.devotion -= 20;
						slave.trust -= 20;
						removeLimbs(slave, "all");
						surgeryDamage(slave, 40);
					}
					if (slave.balls > 0 && slave.devotion <= 50) {
						r.push(`${HG.slaveName} decides to have some once-only sadistic pleasure, and carefully straps ${slave.slaveName} into the surgery until ${he}'s completely immobile. ${HG.slaveName} situates`);
						if (canSee(slave)) {
							r.push(`a mirror so the terrified ${girl} can see ${his} own crotch,`);
						} else {
							r.push(`${him} so that the terrified ${girl} can sense what part of ${his} body is being manipulated even through the anesthetics,`);
						}
						r.push(`gets behind ${him}, and carefully sodomizes ${him} during the entire process of <span class="health dec">castration.</span> ${slave.slaveName} is anesthetized down there and can't feel the brutal anal rape, but ${his} abuser orgasms repeatedly to ${him} <span class="trust dec">weeping</span> at the`);
						if (canSee(slave)) {
							r.push(`sight`);
						} else {
							r.push(`muted sensation`);
						}
						r.push(`of <span class="devotion dec">being gelded and raped at once.</span>`);
						slave.devotion -= 20;
						slave.trust -= 20;
						slave.balls = 0;
						slave.scrotum = 0;
						surgeryDamage(slave, 20);
					}
				}
				if (slave.devotion < -90) {
					r.push(`${HG.slaveName} tires of ${slave.slaveName}'s protests that ${HG.slaveName} is a monster for hurting ${him} this way and ${his} complaints that ${he} deserves better. ${HG.slaveName} decides that it'll be just as much fun and a lot less trouble to mistreat ${slave.slaveName} once ${he}'s mindbroken, and sends ${him} in for <span class="mindbreak">chemical lobotomization.</span>`);
					applyMindbroken(slave);
					surgeryDamage(slave, 20);
				}
			} else if (HG.fetish === Fetish.DOM && HG.fetishStrength > 60 && V.seeExtreme === 1 && slave.fetish !== Fetish.MINDBROKEN && slave.devotion <= 50) {
				if (slave.health.condition > 40) {
					if (slave.heels === 0 && hasAnyNaturalLegs(slave)) {
						r.push(`${HG.slaveName} is not satisfied with ${slave.slaveName}'s submissiveness, and directs the autosurgery to <span class="health dec">clip ${his} Achilles tendons.</span> Once the slave has recovered from surgery, ${HG.slaveName} removes all shoes from the suite, too, so ${slave.slaveName} is forced to crawl like a good little bitch. ${slave.slaveName} is <span class="devotion dec">angry</span> and <span class="trust dec">frightened.</span>`);
						slave.devotion -= 5;
						slave.trust -= 5;
						slave.heels = 1;
						slave.shoes = "none";
						surgeryDamage(slave, 20);
					}
					if (slave.balls > 0 && canDoAnal(slave)) {
						r.push(`${HG.slaveName} decides that it's counterproductive for ${slave.slaveName} to be able to get hard, and sends ${him} in to have ${his} <span class="health dec">balls removed.</span> ${slave.slaveName} is horrified, but ${HG.slaveName} uses ${his} anus with such persistence and mercilessness that the poor gelding doesn't have much time to mourn. ${slave.slaveName} is badly <span class="trust dec">frightened</span> by ${his} new role as nothing but a recipient of anal.`);
						slave.trust -= 10;
						slave.balls = 0;
						surgeryDamage(slave, 20);
					}
				}
			} else if (HG.energy > 95) {
				if (slave.health.condition > 40 && slave.heels === 0 && hasAnyNaturalLegs(slave) && slave.devotion <= 50 && slave.fetish !== Fetish.MINDBROKEN) {
					r.push(`${HG.slaveName} wants a good little bimbo who sticks ${his} butt out all the time, and directs the autosurgery to <span class="health dec">clip ${slave.slaveName}'s Achilles tendons.</span> Once the slave has recovered from surgery, ${HG.slaveName} presents ${slave.slaveName} with a new pair of extra-tall heels to totter around in like a good little slut. ${slave.slaveName} is <span class="devotion dec">angry</span> and <span class="trust dec">frightened.</span>`);
					slave.devotion -= 5;
					slave.trust -= 5;
					slave.heels = 1;
					slave.shoes = "extreme heels";
					surgeryDamage(slave, 20);
				}
			} else if (HG.fetish === Fetish.MASOCHIST) {
				if (slave.health.condition > 40 && slave.heightImplant === 0 && slave.height < 185 && hasAllLimbs(slave)) {
					r.push(`${HG.slaveName} has a subconscious need to be hurt by the biggest, strongest ${girl} possible, and directs the autosurgery to extend ${slave.slaveName}'s arm and leg bones to make ${him} a little <span class="change positive">taller.</span>`);
					slave.heightImplant = 1;
					slave.height += 10;
					surgeryDamage(slave, 20);
				}
			} else if (HG.fetish === Fetish.SUBMISSIVE) {
				if (slave.health.condition > 40 && slave.heightImplant === 0 && slave.height < 185 && hasAllLimbs(slave)) {
					r.push(`${HG.slaveName} wants to be topped by the biggest, strongest ${girl} possible, and directs the autosurgery to extend ${slave.slaveName}'s arm and leg bones to make ${him} a little <span class="change positive">taller.</span>`);
					slave.heightImplant = 1;
					slave.height += 10;
					surgeryDamage(slave, 20);
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {App.Entity.SlaveState} HG
	 */
	function HGEnjoyment(slave, HG) {
		if (V.HGSuiteEquality !== 0) {
			if (slave.devotion > 50) {
				r.push(`${HG.slaveName} and ${slave.slaveName} <span class="devotion inc">really appreciate</span> the equal, alternating Head Girl system, and <span class="noteworthy">switch places at the end of the week.</span>`);
				HG.devotion += 1;
				slave.devotion += 1;
			} else {
				r.push(`${slave.slaveName} is not a decent Head Girl candidate, so ${HG.slaveName} keeps the position for now.`);
			}
		} else {
			const hgEnjoyment = V.HGSuiteSurgery + V.HGSuiteDrugs + V.HGSuiteHormones;
			if (hgEnjoyment > 2) {
				r.push(`Your Head Girl <span class="devotion inc">really enjoys</span> being given total freedom to customize ${his2} very own bitch.`);
				HG.devotion += 5;
			} else if (hgEnjoyment === 2) {
				r.push(`Your Head Girl <span class="devotion inc">enjoys</span> being given freedom to customize ${his2} very own ${girl}.`);
				HG.devotion += 3;
			} else if (hgEnjoyment === 1) {
				r.push(`Your Head Girl <span class="devotion inc">appreciates</span> being given some freedom to customize ${his2} own servant.`);
				HG.devotion += 1;
			}
		}
	}

	/**
	 * @param {FC.ReportSlave} slave
	 * @param {DocumentFragment} el
	 */
	function slaveReport(slave, el) {
		if (V.showEWD !== 0 || (V.favSeparateReport === 1 && V.favorites.includes(slave.ID))) {
			/* App.SlaveAssignment.choosesOwnClothes(slave) */
			App.Events.addNode(el, App.SlaveAssignment.individualSlaveReport(slave), "div", "indent");
			App.Events.addNode(el, [App.SlaveAssignment.devotion(slave)], "div", "indent");
		} else {
			/* App.SlaveAssignment.choosesOwnClothes(slave) */
			App.SlaveAssignment.individualSlaveReport(slave);
			App.SlaveAssignment.devotion(slave);
		}
	}
};
