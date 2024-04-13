// cSpell:ignore ibcoeffs

App.Intro.acquisition = function() {
	const el = new DocumentFragment();
	const valueOwed = (V.saveImported === 1) ? 5000 : 50000;
	const r = [];

	if (_.isArray(V.careerBonusNeeded)) {
		V.slaves.filter(s => V.careerBonusNeeded.includes(s.ID)).forEach(App.StartingGirls.applyCareerBonus);
		delete V.careerBonusNeeded;
		delete V.applyCareerBonus;
	}
	V.slaves.filter(s => s.origin === "$auto").forEach(x => App.StartingGirls.playerOrigin(x).apply());

	if (V.freshPC === 1 || V.saveImported === 0) {
		PCSetup();
	}
	SetBellySize(V.PC);

	parentSetup();
	PCChildrenCount();
	inbreedingCalc();
	if (V.plot === 1 && V.neighboringArcologies > 0) {
		V.arcologies.reduce((acc, val) => (val.direction !== 0 && val.prosperity > acc.prosperity) ? val : acc, V.arcologies[1]).rival = 1;
		V.rival.state = 2;
	}
	V.targetAgeNursery = V.minimumSlaveAge;
	resetFamilyCounters();

	delete V.limitedCheatStart;

	App.UI.DOM.appendNewElement("p", el, "You've done it.");
	App.UI.DOM.appendNewElement("p", el, `You arrive at your new arcology, ${V.arcologies[0].name}, and head straight to the penthouse to enter the access codes that will tell the ${V.arcologies[0].name} systems to recognize you as their owner. The penthouse office is ready to receive the codes, and they authenticate. A voice activates in your earpiece.`);
	App.UI.DOM.appendNewElement("p", el, `Congratulations. I am a personal assistant program, and it is my pleasure to assist you, ${PlayerName()} the new owner of ${V.arcologies[0].name}. I will offer useful information whenever possible in italics. Your new arcology has some unusual equipment. The previous owner kept a small stable of sex slaves. The penthouse therefore has a body modification studio for tattooing, bleaching and piercing, and an auto salon for more prosaic things like hair care. It also has a remote surgery, a small surgical theater that can be operated remotely by a qualified surgeon if you can pay the fee. Finally, it has a slave nutrition system connected to the arcology's hydroponics bays. This system produces a tasty protein-rich drink that provides the physically active female body all its necessary nutrients while leaving the lower digestive tract extremely clean. It even causes a mild increase in sex drive.`, ["note"]);

	r.push(`The previous owner seems to have left in something of a hurry.`);
	let valueGiven = 0;
	if (V.cheatMode === 1) {
		r.push(`Since you've elected to take over an arcology with special advantages, you've acquired a very special group of slaves.`);
		r.push(App.Intro.cheatModeSlaves());
	} else if (V.saveImported === 1) {
		r.push(`Since it took some time for you to ensure that your existing stable of slaves were safely moved to ${V.arcologies[0].name}, the previous owner had the time to get most of their things away.`);
	} else if ((V.targetArcology.fs !== "New") && (V.targetArcology.fs !== "FSNull")) {
		for (let j = 0; j < 5; j++) {
			if (valueOwed - valueGiven <= 5000) {
				break;
			}
			const slave = generateFSSlave(V.targetArcology.fs);
			const slaveCostValue = slaveCost(slave);
			if (["FSAztecRevivalist", "FSChineseRevivalist", "FSNeoImperialist", "FSRestart", "FSSlaveProfessionalism"].includes(V.targetArcology.fs)) {
				valueGiven += slaveCostValue * 4;
			} else {
				valueGiven += slaveCostValue;
			}
			newSlave(slave);
		}
		const {He, his, girl} = getPronouns(V.slaves.random());
		switch (V.targetArcology.fs) {
			case "FSSupremacist":
				r.push(`They kept a personal stable of fearful ${V.arcologies[0].FSSupremacistRace} sex slaves, but their sexual training is incomplete. Several of them are still here.`);
				break;
			case "FSSubjugationist":
				r.push(`They made it a special goal to enslave and whore out as many ${V.arcologies[0].FSSubjugationistRace} people as possible. Several of them are still here.`);
				break;
			case "FSGenderRadicalist":
				r.push(`They were in the process of building a stable of pretty young shemale whores. Several of them are still here. They're are all very attracted to men, and skilled at pleasing them.`);
				break;
			case "FSGenderFundamentalist":
				r.push(`They kept a personal stable of slaves for breeding purposes. Several of them are still here. They've been kept pregnant, and work as servants when they aren't being bred.`);
				break;
			case "FSPaternalist":
				r.push(`Their slaves were all very well treated. Several of them are still here. They were allowed to work as maids, and weren't even forced to have sex.`);
				break;
			case "FSDegradationist":
				r.push(`Their personal slaves were all Fuckdolls, slaves who have been permanently encased in advanced latex suits and converted into living sex toys. Several of them are still here.`);
				break;
			case "FSAssetExpansionist":
				r.push(`They kept a collection of bejeweled boobs for company, but they focused on breast expansion to the exclusion of the slaves' emotional training. Several of them are still here.`);
				break;
			case "FSSlimnessEnthusiast":
				r.push(`They kept a harem of slim, pretty girls, and treated them very well. Several of them are still here. They should be very trusting of a new owner.`);
				break;
			case "FSTransformationFetishist":
				r.push(`They were just putting the finishing touches on a planned brothel's worth of surgically enhanced whores. Several of them are still here. They are already used to prostitution.`);
				break;
			case "FSBodyPurist":
				r.push(`Their slaves were trained for sexual use, but their health, fitness, and natural appearance were the main priorities. Several of them are still here.`);
				break;
			case "FSMaturityPreferentialist":
				r.push(`They preferred to keep their MILFs as scantily clad servants. Several of them are still here. They aren't all happy to be sex objects, but they're used to it.`);
				break;
			case "FSYouthPreferentialist":
				r.push(`They treated their young slaves very well. Several of them are still here. Virgins have been carefully preserved, but have learned to use their mouths through experience.`);
				break;
			case "FSPastoralist":
				r.push(`Their herd of cow girls was progressing nicely, though more progress had been made on milk production than on training. Several of them are still here.`);
				break;
			case "FSPhysicalIdealist":
				r.push(`Their slaves worked as prostitutes, but mostly to fund a program of muscle building for all of them, which was nearing completion. Several of them are still here.`);
				break;
			case "FSChattelReligionist":
				r.push(`They were recruiting a stable of slave whores by targeting people with religious complexes that made them particularly vulnerable to recruitment. Several of them are still here.`);
				break;
			case "FSRomanRevivalist":
				r.push(`The only one of their slaves left is the bodyguard. ${He} should be very willing to transfer ${his} loyalty to you, as ${his} new owner.`);
				break;
			case "FSNeoImperialist":
				r.push(`This arcology kept their Knights as actively enslaved and docile servants; you find one of them remaining here. ${He} immediately pledges ${his} loyalty over to you.`);
				break;
			case "FSAztecRevivalist":
				r.push(`They maintained a combination of disobedient slaves, deemed incorrigible and blood priestesses. Since they offer themselves as slaves willingly, one has remained loyal to the owner of the arcology.`);
				break;
			case "FSEgyptianRevivalist":
				r.push(`They kept a harem of beautiful slave girls, who have been well-treated and well-trained. They should be very willing to serve you in turn.`);
				break;
			case "FSEdoRevivalist":
				r.push(`They put considerable effort into creating modern slave geisha, elegant Japanese slaves who were assigned to serve the public. Several of them are still here.`);
				break;
			case "FSArabianRevivalist":
				r.push(`They trained slaves personally, and never kept slaves for very long. The slaves they left are all partway through being trained.`);
				break;
			case "FSChineseRevivalist":
				r.push(`The only one of their slaves left is the Head Girl. ${He} should be willing to transfer ${his} loyalty to you, as ${his} proper superior.`);
				break;
			case "FSAntebellumRevivalist":
				r.push(`They kept a stable of servants, who the previous owner called 'house slaves'. They have hope that you'll be kinder to them, but do not trust you.`);
				break;
			case "FSRestart":
				r.push(`The only one of their slaves left is an absolute beauty of a ${girl}. ${He} is too smart for ${his} own good and will likely not trust you.`);
				break;
			case "FSRepopulationFocus":
				r.push(`They kept a personal stable of slaves for breeding purposes. Several of them are still here. They've been kept heavily pregnant, and are used to being used whilst so.`);
				break;
			case "FSHedonisticDecadence":
				r.push(`Their slaves were heavily pampered; free to lie about, fuck, and eat as much as they wanted. Several of them are still here, too lazy and spoiled to leave. They eagerly paw at you upon your arrival, begging for their bellies to be filled with food and for a good, hard fucking.`);
				break;
			case "FSIntellectualDependency":
				r.push(`They kept several vapid sluts, who are now desperately begging you for sex. It seems they've drained the life out of every toy left behind and have no idea how to recharge them.`);
				break;
			case "FSSlaveProfessionalism":
				r.push(`The only one of their slaves left has made it ${his} mission to have the penthouse ready for whomever should come to own it. ${He} greets you cordially, hands you a detailed summary of ${his} skills and information on your new arcology, and calmly awaits further orders.`);
				break;
			case "FSPetiteAdmiration":
				r.push(`They had quite the impish little harem. Several of them are still here and immediately swarm you as a welcome, eager to see someone taller again.`);
				break;
			case "FSStatuesqueGlorification":
				r.push(`They had quite the collection of towering slaves. Several of them are still here. They gaze down on you, evaluating how best to serve their new owner.`);
				break;
			default:
				r.push(`ERROR: bad arcology type`);
		}
	} else {
		r.push(`They could not get all of their personal effects away. Since they`);
		if (V.targetArcology.fs === "FSNull") {
			r.push(`tried to sample different kinds of sexual slavery,`);
		} else {
			r.push(`did not have the time in control of the arcology to develop a specific stable of sex slaves,`);
		}
		r.push(`their slaves were quite varied.`);
		const heroSlaves = App.Utils.buildHeroArray().shuffle();
		for (let j = 0; j < heroSlaves.length; j++) {
			if (valueOwed - valueGiven <= 5000) {
				break;
			}
			const slave = App.Utils.getHeroSlave(heroSlaves[j]);
			heroSlaves.splice(j, 1);
			let slaveCostValue = slaveCost(slave);
			if (valueGiven + slaveCostValue < valueOwed * 2) {
				const {him, he, his, himself} = getPronouns(slave);
				nationalityToAccent(slave);
				slave.oldDevotion = slave.devotion;
				slave.oldTrust = slave.trust;
				slave.health.tired = 0;
				valueGiven += slaveCostValue;
				newSlave(slave);

				r.push(slave.slaveName);
				if (slave.fetish === Fetish.MINDBROKEN) {
					r.push(`is, sadly, not mentally competent, and is wandering through the penthouse at the moment.`);
				} else if (isAmputee(slave)) {
					r.push(`is a quadruple amputee and is quite helpless, so you can attend to ${him} at your leisure.`);
				} else if (slave.devotion < -50) {
					r.push(`is quite rebellious and was attempting to escape, so I have locked ${him} in the slave quarters.`);
				} else if (slave.devotion < -20) {
					r.push(`resists my orders and was considering escape, so I have locked ${him} in the slave quarters.`);
				} else if (slave.devotion <= 20) {
					r.push(`is reasonably obedient, and is waiting for you in the dormitory, I believe in the hope of making a good impression.`);
				} else if (slave.energy > 95) {
					r.push(`is a remarkable sexual addict, and I believe ${he} will be very happy to meet you.`);
				} else if (slave.fetish === "pregnancy") {
					if (slave.bellyPreg >= 500) {
						r.push(`is currently in the dormitory masturbating over ${his} growing pregnancy, and`);
						if (V.PC.belly >= 5000) {
							r.push(`will certainly be eager to meet you.`);
						} else {
							r.push(`I believe ${he} will be happy to show it to you.`);
						}
					} else {
						r.push(`is currently in the dormitory examining ${himself} to try to discern ${his} fertility, and I believe ${he} will be`);
						if (V.PC.belly >= 5000) {
							r.push(`eager to get acquainted with you.`);
						} else {
							r.push(`happy to meet you.`);
						}
					}
				} else if (slave.belly >= 5000) { // had to be placed after pregnancy or it would intercept
					r.push(`is currently in the dormitory massaging ${his} greatly distended belly.`);
				} else if (slave.fetish === "buttslut") {
					r.push(`is currently in the dormitory masturbating anally, and I believe ${he} will be happy to meet you.`);
				} else if (slave.fetish === "cumslut") {
					r.push(`is currently in the dormitory exhibiting oral fixation, and I believe ${he} will be happy to meet you.`);
				} else if (slave.fetish === "boobs") {
					r.push(`is currently in the dormitory playing with ${his} nipples, and I believe ${he} will be happy to meet you.`);
				} else if (slave.fetish === "humiliation") {
					r.push(`is currently in the entryway flashing passersby, and I believe ${he} will be happy to meet you.`);
				} else if (slave.fetish === Fetish.SUBMISSIVE) {
					r.push(`is currently in the dormitory, experimenting with self-bondage using the sheets; I believe ${he} will be happy to meet you.`);
				} else if (slave.fetish === "dom") {
					r.push(`is currently in the exercise area keeping fit; ${he} likes to take an active role sexually and is using this down time to work out.`);
				} else if (slave.fetish === "sadist") {
					r.push(`is currently outside your office; ${he} enjoys being superior to other slaves and I believe ${he} means to ingratiate ${himself} to you.`);
				} else if (slave.fetish === "masochist") {
					r.push(`is a sexual masochist; ${he} is currently in the bathroom, experimenting with auto-flagellation with a wet towel.`);
				} else {
					r.push(`is currently outside your office, and I believe ${he} is attempting to maintain sexual arousal to make a good first impression on you.`);
				}
			}
		}
	}
	if (valueOwed - valueGiven > 0) {
		r.push(`There are some valuables present, worth ${cashFormat(valueOwed - valueGiven)}.`);
		cashX((valueOwed - valueGiven), "event");
	}
	App.Events.addNode(el, r, "p", "note");

	V.averageTrust = 0;
	V.averageDevotion = 0;
	let slavesContributing = 0;
	for (const slave of V.slaves) {
		updateHealth(slave);
		slave.oldDevotion = slave.devotion;
		slave.oldTrust = slave.trust;
		// AVERAGE VALUES UPDATE
		if (assignmentVisible(slave)) {
			V.averageTrust += slave.trust;
			V.averageDevotion += slave.devotion;
			slavesContributing++;
		} else {
			if (slave.assignment !== Job.CELLBLOCK && slave.assignment !== Job.ARCADE) {
				if (slave.assignment !== Job.DAIRY || V.dairyRestraintsSetting < 2) {
					V.averageTrust += slave.trust * 0.5;
					V.averageDevotion += slave.devotion * 0.5;
					slavesContributing += 0.5;
				}
			}
		}
	}
	if (slavesContributing !== 0) {
		V.averageTrust = V.averageTrust / slavesContributing;
		V.averageDevotion = V.averageDevotion / slavesContributing;
	}
	V.enduringTrust = V.averageTrust;
	V.enduringDevotion = V.averageDevotion;
	App.UI.SlaveSummary.settingsChanged();

	el.append(
		App.UI.DOM.link(
			"Continue",
			() => {
				V.ui = "main";
				if (V.terrain === "urban") {
					V.slaveCostFactor = 0.85;
					V.menialSupplyFactor = 30000;
					V.menialDemandFactor = -30000;
				} else if (V.terrain === "marine") {
					V.slaveCostFactor = 1;
				} else {
					V.slaveCostFactor = 1.15;
					V.menialDemandFactor = 30000;
					V.menialSupplyFactor = -30000;
				}
				Save.autosave.save("Week Start Autosave");
			}
			, [], "Main"
		)
	);
	return el;

	function PCSetup() {
		if (V.PC.vagina > 0) {
			V.PC.counter.birthsTotal = 0;
			if (isPCCareerInCategory("servant")) {
				if (V.PC.pregType !== 8) {
					if (V.PC.actualAge >= 50) {
						V.PC.counter.birthsTotal = 9;
						V.PC.counter.birthMaster = 9;
					} else if (V.PC.actualAge >= 35) {
						V.PC.counter.birthsTotal = 6;
						V.PC.counter.birthMaster = 6;
					} else if (V.PC.actualAge >= 16) {
						V.PC.counter.birthsTotal = 3;
						V.PC.counter.birthMaster = 3;
					} else if (V.PC.pubertyXX === 1) {
						V.PC.counter.birthsTotal = 2;
						V.PC.counter.birthMaster = 2;
					}
				} else { // Master kept you pregnant
					if (V.PC.actualAge >= 50) {
						V.PC.counter.birthsTotal = 70;
						V.PC.counter.birthMaster = 70;
					} else if (V.PC.actualAge >= 35) {
						V.PC.counter.birthsTotal = 40;
						V.PC.counter.birthMaster = 40;
					} else if (V.PC.actualAge >= 16) {
						V.PC.counter.birthsTotal = 16;
						V.PC.counter.birthMaster = 16;
					} else if (V.PC.pubertyXX === 1) {
						V.PC.counter.birthsTotal = 8;
						V.PC.counter.birthMaster = 8;
					}
				}
				for (const slave of V.slaves) {
					if (slave.mother === -1) {
						V.PC.counter.birthsTotal++;
						if (slave.father === -1) {
							V.PC.counter.birthSelf++;
						} else {
							slave.father = -3;
							V.PC.counter.birthMaster++;
						}
					}
				}
			} else if (isPCCareerInCategory("escort")) {
				for (const slave of V.slaves) {
					if (slave.mother === -1) {
						V.PC.counter.birthsTotal++;
						if (slave.father === -1) {
							V.PC.counter.birthSelf++;
						} else {
							slave.father = -5;
							V.PC.counter.birthClient++;
						}
					} else if (slave.father === -1) {
						slave.mother = -5;
					}
				}
			} else {
				for (const slave of V.slaves) {
					if (slave.mother === -1) {
						V.PC.counter.birthsTotal++;
						if (slave.father === -1) {
							V.PC.counter.birthSelf++;
						} else {
							V.PC.counter.birthOther++;
						}
					}
				}
			}
			if (V.PC.preg > 0) {
				if (V.PC.pregType !== 8) {
					V.PC.pregType = 1;
				} else {
					V.PC.geneticQuirks.hyperFertility = 2;
				}
				if (isPCCareerInCategory("servant")) {
					V.PC.pregSource = -3;
					if (V.PC.pregType !== 8) {
						V.PC.pregType += either(0, 0, 1);
					}
				} else if (isPCCareerInCategory("escort")) {
					V.PC.pregSource = -5;
				}
				V.PC.pregKnown = 1;
				WombForceFatherID(V.PC, V.PC.pregSource);
				WombUpdatePregVars(V.PC);
			}
		} else {
			V.PC.trueVirgin = 1;
		}
		if (V.PC.geneticQuirks.albinism === 2) {
			V.PC.skin = getGeneticSkinColor(V.PC);
			V.PC.hColor = getGeneticHairColor(V.PC);
			resetEyeColor(V.PC, "both");
		}
		if (isPCCareerInCategory("servant")) {
			if (V.PC.genes === "XX") {
				V.PC.boobsTat = "You have your Master's brand tattooed on your left breast.";
			} else {
				V.PC.shouldersTat = "You have your Master's brand tattooed on your left shoulder.";
			}
		} else if (V.PC.career === "prostitute" || V.PC.career === "child prostitute") {
			if (V.PC.genes === "XX") {
				V.PC.boobsTat = "You have your ID number from your days as a prostitute tattooed on your left breast.";
			} else {
				V.PC.buttTat = "You have your ID number from your days as a prostitute tattooed on your left buttock.";
			}
		} else if (V.PC.career === "hoodlum" || V.PC.career === "street urchin") {
			V.PC.shouldersTat = "You have a tattoo denoting your gang affiliation on your neck.";
		}
		if (V.plot) {
			if (V.PC.actualAge <= 13) {
				V.maximumRep = 5000;
			} else if (V.PC.actualAge <= 16) {
				V.maximumRep = 10500;
			}
		}
		// PC energy init
		if (V.PC.career === "child prostitute") {
			V.PC.aphrodisiacs = 1;
			V.PC.addict = 40;
		}
		if ((V.PC.physicalAge < V.PC.pubertyAgeXY && V.PC.physicalAge < V.PC.pubertyAgeXX) || V.PC.physicalAge < 13) {
			if (isPCCareerInCategory("escort")) {
				V.PC.energy = 45;
			} else if (canAchieveErection(V.PC) || V.PC.vagina > 0) {
				V.PC.energy = 15;
			} else {
				V.PC.energy = 0;
			}
		} else if (V.PC.physicalAge < 18) {
			if (isPCCareerInCategory("escort")) {
				V.PC.energy = 75;
			} else if (canAchieveErection(V.PC) || V.PC.vagina > 0) {
				V.PC.energy = 50;
			} else {
				V.PC.energy = 35;
			}
		} else {
			if (isPCCareerInCategory("escort")) {
				V.PC.energy = 90;
			} else if (canAchieveErection(V.PC) || V.PC.vagina > 0) {
				V.PC.energy = 65;
			} else {
				V.PC.energy = 50;
			}
		}
	}

	function parentSetup() {
		/** @type {Map<number, number>} */
		const missingMap = new Map();

		/** @param {FC.HumanState} slave */
		function checkMissingParents(slave) {
			const missingMom = missingMap.get(slave.mother);
			if (missingMom) {
				slave.mother = missingMom;
			} else if (slave.mother > 0 && !getSlave(slave.mother)) {
				missingMap.set(slave.mother, V.missingParentID);
				V.missingParentID--;
			}

			const missingDad = missingMap.get(slave.father);
			if (missingDad) {
				slave.father = missingDad;
			} else if (slave.father > 0 && !getSlave(slave.father)) {
				missingMap.set(slave.father, V.missingParentID);
				V.missingParentID--;
			}
		}
		checkMissingParents(V.PC);
		V.slaves.forEach(checkMissingParents);
	}

	function PCChildrenCount() {
		let PCPregnancies = [];
		let SPregnancies = [];
		let birthData = "";
		V.slaves.forEach(function(s) {
			PCPregnancies = [];
			SPregnancies = [];
			V.slaves.filter(s0 => s0.newGamePlus === 0).forEach(function(s1) {
				if (s1.father === s.ID && s1.mother === -1) {
					birthData = s1.actualAge + " " + s1.birthWeek + " " + s1.father;
					if (!PCPregnancies.includes(birthData)) {
						PCPregnancies.push(birthData);
					}
					s.counter.PCChildrenFathered++;
					V.PC.counter.birthDegenerate++;
				}
				if (s1.father === -1 && s1.mother === s.ID) {
					birthData = s1.actualAge + " " + s1.birthWeek + " " + s1.mother;
					if (!SPregnancies.includes(birthData)) {
						SPregnancies.push(birthData);
					}
					s.counter.PCChildrenBeared++;
					V.PC.counter.slavesFathered++;
				}
			});
			s.counter.PCKnockedUp += PCPregnancies.length;
			s.counter.birthsTotal += SPregnancies.length;
			s.counter.timesBred += SPregnancies.length;
			V.PC.counter.slavesKnockedUp += SPregnancies.length;
		});
	}

	function inbreedingCalc() {
		const coeffSlaves = [];
		const genePoolMap = {};
		for (const slave of V.genePool) {
			genePoolMap[slave.ID] = slave;
		}
		for (const slave of V.slaves) {
			if (slave.newGamePlus === 0) {
				slave.inbreedingCoeff = -1;
				genePoolMap[slave.ID].inbreedingCoeff = -1;
				coeffSlaves.push(slave);
			}
		}
		const ibcoeffs = ibc.coeff_slaves(coeffSlaves);
		for (const slave of coeffSlaves) {
			slave.inbreedingCoeff = ibcoeffs[slave.ID];
			genePoolMap[slave.ID].inbreedingCoeff = ibcoeffs[slave.ID];
		}
	}

	/** @param {FC.FutureSociety} FS */
	function generateFSSlave(FS) {
		let slave;
		switch (FS) {
			case "FSSupremacist":
				slave = GenerateNewSlave("XX", {race: V.arcologies[0].FSSupremacistRace, disableDisability: 1});
				slave.devotion = random(25, 45);
				slave.trust = random(-25, -45);
				setHealth(slave, jsRandom(0, 20), 0, 0, 0, 0);
				slave.face = random(15, 100);
				slave.skill.oral = random(15, 35);
				slave.skill.anal = random(15, 35);
				if (slave.vagina > -1) {
					if (slave.vagina === 0) {
						slave.vagina++;
					}
					slave.skill.vaginal = random(15, 35);
				}
				slave.skill.entertainment = random(15, 35);
				slave.clothes = "uncomfortable straps";
				slave.collar = "uncomfortable leather";
				slave.shoes = "flats";
				slave.assignment = "please you";
				break;
			case "FSSubjugationist":
				slave = GenerateNewSlave("XX", {race: V.arcologies[0].FSSubjugationistRace, disableDisability: 1});
				slave.devotion = random(25, 45);
				slave.trust = random(-25, -45);
				setHealth(slave, jsRandom(0, 20), 0, 0, 0, 0);
				slave.face = random(15, 100);
				slave.skill.oral = random(15, 35);
				slave.skill.anal = random(15, 35);
				if (slave.vagina > -1) {
					if (slave.vagina === 0) {
						slave.vagina++;
					}
					slave.skill.vaginal = random(15, 35);
				}
				slave.skill.whoring = random(15, 35);
				slave.clothes = "uncomfortable straps";
				slave.collar = "uncomfortable leather";
				slave.shoes = "flats";
				slave.assignment = "whore";
				break;
			case "FSGenderRadicalist":
				slave = GenerateNewSlave("XY", {disableDisability: 1, maxAge: 25});
				slave.devotion = random(25, 45);
				slave.trust = random(15, -15);
				setHealth(slave, 100, 0, 0, 0, jsRandom(0, 20));
				slave.face = random(0, 55);
				slave.boobs += 100 * random(2, 4);
				slave.butt += random(1, 2);
				slave.attrXY = random(70, 90);
				slave.attrXX = 0;
				slave.skill.oral = random(35, 65);
				slave.skill.penetrative = random(35, 65);
				slave.skill.anal = random(35, 65);
				slave.skill.whoring = random(35, 65);
				SoftenSexualFlaw(slave);
				slave.clothes = "uncomfortable straps";
				slave.collar = "stylish leather";
				slave.shoes = "heels";
				slave.assignment = "whore";
				break;
			case "FSGenderFundamentalist":
				slave = GenerateNewSlave("XX", {minAge: V.fertilityAge, maxAge: 25, disableDisability: 1});
				slave.devotion = random(25, 45);
				slave.trust = random(-25, -45);
				setHealth(slave, jsRandom(55, 65), 0, 0, 0, 0);
				slave.face = random(15, 100);
				slave.preg = random(1, 40);
				slave.lactation = 1;
				slave.lactationDuration = 2;
				SetBellySize(slave);
				if (slave.vagina > -1) {
					if (slave.vagina === 0) {
						slave.vagina++;
					}
					slave.skill.vaginal = random(15, 35);
				}
				slave.clothes = "a nice maid outfit";
				slave.collar = "tight steel";
				slave.shoes = "flats";
				slave.assignment = "be a servant";
				break;
			case "FSPaternalist":
				slave = GenerateNewSlave("XX", {disableDisability: 1});
				slave.devotion = random(25, 45);
				slave.trust = random(55, 65);
				setHealth(slave, jsRandom(55, 65), 0, 0, 0, 0);
				slave.face = random(15, 100);
				slave.intelligence = random(0, 100);
				slave.intelligenceImplant = 30;
				slave.skill.entertainment = random(15, 35);
				slave.clothes = "conservative clothing";
				slave.collar = "none";
				slave.shoes = "flats";
				slave.assignment = "be a servant";
				break;
			case "FSDegradationist":
				slave = GenerateNewSlave("XX");
				setHealth(slave, jsRandom(0, 15), 0, 0, 0, 0);
				slave.fuckdoll = 100;
				slave.career = "a Fuckdoll";
				applyMindbroken(slave);
				slave.boobs += 100 * random(10, 20);
				slave.butt += random(2, 3);
				slave.lips = random(2, 4);
				slave.weight = random(-15, 15);
				slave.clothes = "a Fuckdoll suit";
				slave.assignment = "please you";
				break;
			case "FSAssetExpansionist":
				slave = GenerateNewSlave("XX", {disableDisability: 1});
				slave.devotion = random(25, 45);
				slave.trust = random(-15, 15);
				setHealth(slave, jsRandom(25, 45), 0, 0, 0, 0);
				slave.chem = 50;
				slave.face = random(15, 100);
				slave.boobs += 100 * random(10, 20);
				slave.butt += random(2, 3);
				slave.lips += random(0, 1);
				if (slave.balls > 0) {
					slave.balls++;
				}
				if (slave.dick > 0) {
					slave.dick++;
				}
				slave.weight = random(15, 90);
				slave.skill.oral = random(15, 35);
				slave.skill.anal = 0;
				slave.anus = 0;
				if (slave.vagina > -1) {
					if (slave.vagina === 0) {
						slave.vagina++;
					}
					slave.skill.vaginal = random(15, 35);
				}
				slave.skill.entertainment = random(15, 35);
				slave.clothes = "slutty jewelry";
				slave.collar = "pretty jewelry";
				slave.shoes = "heels";
				slave.assignment = "please you";
				break;
			case "FSSlimnessEnthusiast":
				slave = GenerateNewSlave("XX", {disableDisability: 1});
				slave.devotion = random(25, 45);
				slave.trust = random(55, 65);
				setHealth(slave, jsRandom(55, 65), 0, 0, 0, 0);
				slave.face = random(15, 100);
				slave.boobs = 100 * random(1, 4);
				slave.butt = random(1, 2);
				slave.weight = random(-25, -15);
				slave.skill.oral = random(15, 35);
				slave.skill.anal = 0;
				slave.anus = 0;
				if (slave.vagina > -1) {
					if (slave.vagina === 0) {
						slave.vagina++;
					}
					slave.skill.vaginal = random(15, 35);
				}
				slave.skill.entertainment = random(15, 35);
				slave.clothes = "a leotard";
				slave.collar = "pretty jewelry";
				slave.shoes = "flats";
				slave.assignment = "please you";
				break;
			case "FSTransformationFetishist":
				slave = GenerateNewSlave("XX", {disableDisability: 1});
				slave.devotion = random(25, 45);
				slave.trust = random(-15, 15);
				setHealth(slave, jsRandom(-15, 0), Math.max(normalRandInt(5, 3), 0), Math.max(normalRandInt(5, 3), 0), 0, 0);
				slave.faceImplant = random(40, 70);
				slave.face = Math.clamp(Math.trunc(slave.face + slave.faceImplant / 2), -100, 100);
				slave.boobsImplant = 200 * random(4, 8);
				slave.boobs += slave.boobsImplant;
				slave.boobsImplantType = "normal";
				slave.buttImplant = random(2, 4);
				slave.butt += slave.buttImplant;
				slave.buttImplantType = "normal";
				slave.lipsImplant = random(1, 2);
				slave.lips = Math.clamp(Math.trunc(slave.lipsImplant + 2), -3, 3);
				slave.weight = random(-25, -15);
				slave.skill.oral = random(15, 35);
				slave.skill.anal = random(15, 35);
				if (slave.vagina > -1) {
					if (slave.vagina === 0) {
						slave.vagina++;
					}
					slave.skill.vaginal = random(15, 35);
				}
				slave.clothes = "a string bikini";
				slave.collar = "shock punishment";
				slave.shoes = "extreme heels";
				slave.assignment = "whore";
				break;
			case "FSBodyPurist":
				slave = GenerateNewSlave("XX", {disableDisability: 1});
				slave.devotion = random(55, 65);
				slave.trust = random(25, 45);
				setHealth(slave, 100, 0, 0, 0, jsRandom(0, 20));
				slave.face = random(15, 100);
				slave.weight = random(-5, 5);
				slave.muscles = random(10, 25);
				slave.skill.oral = random(15, 35);
				slave.skill.anal = random(15, 35);
				if (slave.vagina > -1) {
					if (slave.vagina === 0) {
						slave.vagina++;
					}
					slave.skill.vaginal = random(15, 35);
				}
				slave.clothes = "a nice maid outfit";
				slave.collar = "pretty jewelry";
				slave.shoes = "heels";
				slave.assignment = "be a servant";
				break;
			case "FSMaturityPreferentialist":
				slave = GenerateNewSlave("XX", {
					minAge: 36, maxAge: 39, ageOverridesPedoMode: 1, disableDisability: 1
				});
				slave.devotion = random(55, 65);
				slave.trust = random(-15, 15);
				setHealth(slave, jsRandom(25, 45), 0, 0, 0, 0);
				slave.face = random(15, 100);
				slave.boobs += 100 * random(1, 4);
				slave.butt += random(1, 2);
				slave.weight = random(-5, 90);
				slave.skill.oral = random(15, 35);
				slave.skill.anal = random(15, 35);
				if (slave.vagina > -1) {
					if (slave.vagina === 0) {
						slave.vagina++;
					}
					slave.skill.vaginal = random(15, 35);
				}
				SoftenBehavioralFlaw(slave);
				slave.clothes = "a slutty maid outfit";
				slave.collar = "pretty jewelry";
				slave.shoes = "heels";
				slave.assignment = "be a servant";
				break;
			case "FSYouthPreferentialist":
				slave = GenerateNewSlave("XX", {maxAge: 19, disableDisability: 1});
				slave.devotion = random(25, 45);
				slave.trust = random(55, 65);
				setHealth(slave, jsRandom(25, 45), 0, 0, 0, 0);
				slave.face = random(15, 100);
				slave.boobs = 100 * random(1, 4);
				slave.natural.boobs = slave.boobs;
				slave.butt = random(1, 3);
				slave.weight = random(-25, 25);
				slave.skill.oral = random(15, 35);
				slave.skill.anal = 0;
				slave.anus = 0;
				if (slave.vagina > -1) {
					slave.skill.vaginal = 0;
					slave.vagina = 0;
				}
				slave.skill.entertainment = random(15, 35);
				slave.clothes = "a schoolgirl outfit";
				slave.collar = "pretty jewelry";
				slave.shoes = "heels";
				slave.assignment = "be a servant";
				break;
			case "FSPastoralist":
				slave = GenerateNewSlave("XX", {disableDisability: 1});
				slave.devotion = random(25, 45);
				slave.trust = random(-25, -45);
				setHealth(slave, jsRandom(25, 45), 0, 0, 0, 0);
				slave.boobs += 100 * random(10, 20);
				if (slave.balls > 0) {
					slave.balls++;
				}
				slave.lactation = 2;
				slave.lactationDuration = 2;
				slave.clothes = "Western clothing";
				slave.collar = "leather with cowbell";
				slave.shoes = "flats";
				slave.assignment = "get milked";
				break;
			case "FSPhysicalIdealist":
				slave = GenerateNewSlave("XX", {disableDisability: 1});
				slave.devotion = random(25, 45);
				slave.trust = random(25, 45);
				setHealth(slave, 100, 0, 0, 0, jsRandom(10, 40));
				slave.muscles = random(50, 100);
				slave.skill.oral = random(15, 35);
				slave.skill.anal = random(15, 35);
				if (slave.vagina > -1) {
					if (slave.vagina === 0) {
						slave.vagina++;
					}
					slave.skill.vaginal = random(15, 35);
				}
				slave.skill.whoring = random(15, 35);
				slave.clothes = "body oil";
				slave.collar = "none";
				slave.shoes = "none";
				slave.assignment = "whore";
				break;
			case "FSChattelReligionist":
				slave = GenerateNewSlave("XX", {disableDisability: 1});
				slave.devotion = random(55, 65);
				slave.trust = random(55, 65);
				setHealth(slave, jsRandom(0, 15), 0, 0, 0, 0);
				if (slave.vagina === 0) {
					slave.vagina++;
				}
				slave.skill.whoring = random(10, 20);
				slave.behavioralFlaw = "none";
				slave.behavioralQuirk = "sinful";
				slave.clothes = "a chattel habit";
				slave.collar = "heavy gold";
				slave.shoes = "flats";
				slave.assignment = "whore";
				break;
			case "FSRomanRevivalist":
				slave = GenerateNewSlave("XX", {maxAge: 19, disableDisability: 1});
				slave.devotion = 100;
				slave.trust = random(55, 65);
				setHealth(slave, 100, 0, 0, 0, jsRandom(10, 30));
				slave.face = random(0, 55);
				slave.muscles = random(25, 50);
				slave.skill.combat = 70;
				slave.behavioralFlaw = "none";
				slave.behavioralQuirk = "fitness";
				slave.clothes = "a toga";
				slave.collar = "pretty jewelry";
				slave.shoes = "flats";
				slave.assignment = "guard you";
				V.BodyguardID = slave.ID;
				break;
			case "FSNeoImperialist":
				slave = GenerateNewSlave("XX", {
					minAge: 16, maxAge: 28, race: "white", disableDisability: 1
				});
				slave.devotion = 100;
				slave.trust = random(55, 65);
				setHealth(slave, 100, 0, 0, 0, jsRandom(10, 30));
				slave.face = random(20, 75);
				slave.muscles = random(25, 60);
				slave.skill.combat = 70;
				slave.behavioralFlaw = "none";
				slave.behavioralQuirk = "fitness";
				slave.skill.entertainment = random(15, 35);
				slave.clothes = "a tight Imperial bodysuit";
				slave.shoes = "flats";
				slave.assignment = "guard you";
				V.BodyguardID = slave.ID;
				break;
			case "FSAztecRevivalist":
				slave = GenerateNewSlave(null, {race: "latina", nationality: "Mexican", disableDisability: 1});
				slave.accent = 0;
				slave.devotion = 75;
				slave.trust = 75;
				setHealth(slave, jsRandom(-20, 20), 0, 0, 0, 0);
				slave.muscles = random(50, 75);
				slave.skill.combat = 70;
				slave.sexualFlaw = "malicious";
				slave.behavioralQuirk = "none";
				slave.clothes = "a huipil";
				slave.collar = "pretty jewelry";
				slave.shoes = "none";
				slave.assignment = "be your Head Girl";
				V.HeadGirlID = slave.ID;
				break;
			case "FSEgyptianRevivalist":
				slave = GenerateNewSlave("XX", {disableDisability: 1});
				slave.devotion = random(25, 45);
				slave.trust = random(25, 45);
				setHealth(slave, jsRandom(25, 45), 0, 0, 0, 0);
				slave.face = random(15, 100);
				slave.skill.oral = random(15, 35);
				slave.skill.anal = random(15, 35);
				if (slave.vagina > -1) {
					if (slave.vagina === 0) {
						slave.vagina++;
					}
					slave.skill.vaginal = random(15, 35);
				}
				slave.skill.entertainment = random(15, 35);
				SoftenSexualFlaw(slave);
				slave.clothes = "slutty jewelry";
				slave.collar = "ancient Egyptian";
				slave.shoes = "flats";
				slave.assignment = "please you";
				break;
			case "FSEdoRevivalist":
				slave = GenerateNewSlave(null, {race: "asian", nationality: "Japanese", disableDisability: 1});
				slave.accent = 0;
				slave.devotion = random(25, 45);
				slave.trust = random(25, 45);
				setHealth(slave, jsRandom(25, 45), 0, 0, 0, 0);
				slave.face = random(15, 100);
				slave.intelligence = random(0, 100);
				slave.intelligenceImplant = 30;
				slave.skill.entertainment = 100;
				slave.clothes = "a kimono";
				slave.collar = "satin choker";
				slave.shoes = "heels";
				slave.assignment = "serve the public";
				break;
			case "FSArabianRevivalist":
				slave = GenerateNewSlave("XX", {disableDisability: 1});
				slave.devotion = random(25, 45);
				slave.trust = random(-15, 15);
				setHealth(slave, jsRandom(25, 45), 0, 0, 0, 0);
				slave.face = random(15, 100);
				slave.intelligence = random(-15, 80);
				slave.intelligenceImplant = 0;
				slave.clothes = "harem gauze";
				slave.collar = "uncomfortable leather";
				slave.shoes = "flats";
				slave.assignment = "take classes";
				break;
			case "FSChineseRevivalist":
				slave = GenerateNewSlave(null, {
					race: "asian", nationality: "Chinese", minAge: 36, maxAge: 38, ageOverridesPedoMode: 1, disableDisability: 1
				});
				slave.devotion = random(55, 65);
				slave.trust = random(25, 45);
				setHealth(slave, jsRandom(25, 45), 0, 0, 0, 0);
				slave.face = random(0, 55);
				slave.accent = 0;
				slave.intelligence = 100;
				slave.intelligenceImplant = 30;
				slave.skill.oral = 100;
				slave.skill.anal = 100;
				if (slave.vagina > -1) {
					if (slave.vagina === 0) {
						slave.vagina++;
					}
					slave.skill.vaginal = 100;
				}
				if (canAchieveErection(slave)) {
					slave.skill.penetrative = 100;
				}
				slave.skill.entertainment = 100;
				slave.skill.whoring = 100;
				SoftenBehavioralFlaw(slave);
				SoftenSexualFlaw(slave);
				slave.clothes = "a slutty qipao";
				slave.collar = "pretty jewelry";
				slave.shoes = "heels";
				slave.assignment = "be your Head Girl";
				V.HeadGirlID = slave.ID;
				break;
			case "FSAntebellumRevivalist":
				slave = GenerateNewSlave("XX", {
					race: "black", nationality: "American", minAge: 18, maxAge: 24, ageOverridesPedoMode: 1, disableDisability: 1
				});
				slave.devotion = random(-20, 25);
				slave.trust = random(-55, -20);
				setHealth(slave, jsRandom(25, 45), 0, 0, 0, 0);
				slave.accent = 1;
				slave.face = random(10, 45);
				slave.accent = 2;
				slave.intelligence = jsRandom(-50, 25);
				slave.skill.oral = jsRandom(20, 40);
				slave.skill.anal = jsRandom(20, 40);
				if (slave.vagina > -1) {
					if (slave.vagina === 0) {
						slave.vagina++;
					}
					slave.skill.vaginal = 15;
				}
				slave.skill.entertainment = 15;
				slave.skill.whoring = 15;
				SoftenBehavioralFlaw(slave);
				SoftenSexualFlaw(slave);
				slave.collar = "uncomfortable leather";
				slave.clothes = "a slutty maid outfit";
				slave.armAccessory = "elbow gloves";
				slave.legAccessory = "long stockings";
				slave.shoes = "heels";
				slave.assignment = "be a servant";
				slave.custom.desc = "$He speaks with the demeaning accent of slaves from the Old South.";
				slave.slaveName = App.Data.misc.antebellumSlaveNames.random();
				slave.slaveSurname = App.Data.misc.antebellumSlaveSurnames.random();
				break;
			case "FSRestart":
				slave = GenerateNewSlave("XX", {disableDisability: 1});
				slave.devotion = -100;
				slave.trust = -100;
				setHealth(slave, jsRandom(80, 90), 0, 0, 0, 0);
				slave.intelligence = 100;
				slave.intelligenceImplant = 30;
				slave.face = 100;
				slave.faceShape = "sensual";
				slave.skill.oral = random(35, 75);
				slave.skill.anal = random(35, 75);
				if (slave.vagina > -1) {
					if (slave.vagina === 0) {
						slave.vagina++;
					}
					slave.skill.vaginal = random(35, 75);
				}
				slave.skill.entertainment = random(15, 35);
				slave.skill.whoring = 0;
				SoftenSexualFlaw(slave);
				slave.clothes = "a ball gown";
				slave.shoes = "flats";
				slave.assignment = Job.REST;
				break;
			case "FSRepopulationFocus":
				slave = GenerateNewSlave("XX", {
					minAge: V.fertilityAge + 3, maxAge: 25, ageOverridesPedoMode: 1, disableDisability: 1
				});
				slave.devotion = random(25, 45);
				slave.trust = random(-25, -45);
				setHealth(slave, jsRandom(55, 65), 0, 0, 0, 0);
				slave.face = random(15, 100);
				slave.preg = random(10, 40);
				slave.pregType = random(3, 8);
				slave.lactation = 1;
				slave.lactationDuration = 2;
				SetBellySize(slave);
				slave.counter.birthsTotal = 5;
				slave.bellySag = 20;
				slave.bellySagPreg = 20;
				if (slave.vagina > -1) {
					slave.vagina = 4;
					slave.skill.vaginal = random(15, 35);
				}
				slave.clothes = "a nice maid outfit";
				slave.shoes = "flats";
				slave.assignment = "please you";
				break;
			case "FSHedonisticDecadence":
				slave = GenerateNewSlave("XX", {maxAge: 25, disableDisability: 1});
				slave.devotion = random(25, 45);
				slave.trust = random(-25, -45);
				setHealth(slave, jsRandom(-20, 20), 0, 0, 0, 0);
				slave.face = random(15, 40);
				slave.boobs += 100 * random(3, 6);
				slave.butt += random(2, 5);
				slave.weight = random(100, 200);
				slave.skill.oral = random(15, 35);
				slave.skill.anal = random(15, 35);
				slave.anus = 2;
				if (slave.vagina > -1) {
					slave.skill.vaginal = random(15, 35);
					slave.vagina = 3;
				}
				if (canAchieveErection(slave)) {
					slave.skill.penetrative = random(15, 35);
				}
				slave.skill.entertainment = 0;
				slave.energy = random(60, 80);
				slave.behavioralFlaw = "gluttonous";
				slave.clothes = "attractive lingerie";
				slave.shoes = "flats";
				slave.diet = "fattening";
				slave.rules.living = "luxurious";
				slave.assignment = Job.REST;
				break;
			case "FSIntellectualDependency":
				slave = GenerateNewSlave("XX", {minAge: 14, maxAge: 18, disableDisability: 1});
				setHealth(slave, jsRandom(55, 65), 0, 0, 0, 0);
				slave.devotion = random(45, 65);
				slave.trust = random(-15, 45);
				slave.face = random(30, 100);
				slave.energy = 100;
				slave.weight = random(-25, -15);
				slave.skill.oral = 0;
				slave.skill.anal = 0;
				slave.skill.vaginal = 0;
				slave.skill.entertainment = 0;
				slave.skill.whoring = 0;
				slave.intelligence = -100;
				slave.intelligenceImplant = 0;
				if (slave.vagina === 0) {
					slave.vagina++;
				}
				slave.anus++;
				break;
			case "FSSlaveProfessionalism":
				slave = GenerateNewSlave("XX", {minAge: 18, maxAge: 25, disableDisability: 1});
				slave.devotion = 100;
				slave.trust = 20;
				setHealth(slave, 80, 0, 0, 0, jsRandom(10, 30));
				slave.face = random(30, 100);
				slave.energy = 10;
				slave.weight = random(-15, 5);
				slave.skill.oral = 100;
				slave.skill.anal = 100;
				slave.skill.vaginal = 100;
				slave.skill.penetrative = 100;
				slave.skill.entertainment = 100;
				slave.skill.whoring = 100;
				slave.intelligence = 100;
				slave.intelligenceImplant = 30;
				slave.accent = 0;
				SoftenBehavioralFlaw(slave);
				SoftenSexualFlaw(slave);
				slave.clothes = "a nice maid outfit";
				slave.collar = "pretty jewelry";
				slave.assignment = "be your Head Girl";
				V.HeadGirlID = slave.ID;
				break;
			case "FSPetiteAdmiration":
				slave = GenerateNewSlave("XX", {minAge: 14, maxAge: 18, disableDisability: 1});
				slave.devotion = random(55, 65);
				slave.trust = random(-15, 15);
				setHealth(slave, jsRandom(25, 45), 0, 0, 0, 0);
				slave.face = random(15, 100);
				if (slave.height >= 150) {
					slave.height = Height.random(slave, {limitMult: [-3, -1]});
					if (slave.height >= 150) {
						slave.height = Height.random(slave, {limitMult: [-4, -2]});
						if (slave.height >= 150) {
							slave.height = random(90, 130);
							slave.geneticQuirks.dwarfism = 2;
						}
					}
					slave.natural.height = slave.height;
				}
				slave.skill.oral = random(35, 65);
				slave.skill.anal = random(15, 35);
				if (slave.vagina > -1) {
					if (slave.vagina === 0) {
						slave.vagina++;
					}
					slave.skill.vaginal = random(15, 35);
				}
				slave.clothes = "a succubus outfit";
				slave.legAccessory = "long stockings";
				slave.assignment = "please you";
				break;
			case "FSStatuesqueGlorification":
				slave = GenerateNewSlave("XX", {
					minAge: 18, maxAge: 30, ageOverridesPedoMode: 1, disableDisability: 1
				});
				slave.devotion = random(55, 65);
				slave.trust = random(-15, 15);
				setHealth(slave, jsRandom(25, 45), 0, 0, 0, 0);
				slave.face = random(15, 100);
				slave.weight = random(-5, 5);
				slave.muscles = random(20, 40);
				if (slave.height < 185) {
					slave.height = Height.random(slave, {limitMult: [1, 3]});
					if (slave.height < 185) {
						slave.height = Height.random(slave, {limitMult: [2, 4]});
						if (slave.height < 185) {
							slave.height = random(200, 264);
							slave.geneticQuirks.gigantism = 2;
						}
					}
					slave.natural.height = slave.height;
				}
				slave.skill.oral = random(15, 35);
				slave.skill.anal = random(15, 35);
				if (slave.vagina > -1) {
					if (slave.vagina === 0) {
						slave.vagina++;
					}
					slave.skill.vaginal = random(15, 35);
				}
				slave.clothes = "slutty business attire";
				slave.shoes = "heels";
				slave.assignment = "please you";
				break;
			default:
				r.push(`ERROR: bad arcology type`);
		}
		slave.origin = "You acquired $him along with the arcology.";
		slave.career = "a slave";
		return slave;
	}
};
