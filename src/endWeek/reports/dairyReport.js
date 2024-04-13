// cSpell:ignore balltacular, desterilized, stupidified, boobtacular

/**
 * @returns {FC.EndWeek.FacilityReport}
 */
App.EndWeek.dairyReport = function() {
	const beforeFrag = new DocumentFragment();
	let r;

	let MMWorkout = 0;
	const BF = App.Data.misc.bioreactorFluids;
	const slaves = App.Utils.sortedEmployees(App.Entity.facilities.dairy);
	const DL = slaves.length;
	const balltacular = [];
	const careerForgotten = [];
	const desterilized = [];
	const hateFilled = [];
	const horrified = [];
	const skillsLost = [];
	const stupidified = [];
	const chemMinor = [];
	let anusesStretched = 0;
	let cumWeek = 0;
	let femCumWeek = 0;
	let milkWeek = 0;
	let boobtacular = 0;
	let chemSevere = 0;
	let intelligenceLost = 0;
	let mindbroken = 0;
	let vaginasStretched = 0;
	const inflatedSlaves = App.Facilities.Dairy.inflation();
	const dairySettings = V.dairyStimulatorsSetting + V.dairyFeedersSetting + V.dairyPregSetting;
	const restrainedInjected = V.dairyRestraintsSetting + V.injectionUpgrade;
	const boobsMultiplier = Math.trunc(V.injectionUpgrade * 2) + V.dairyRestraintsSetting + V.dairyFeedersSetting;
	V.bioreactorPerfectedID = 0;
	V.milkmaidDevotionBonus = 1;
	V.milkmaidHealthBonus = 0;
	V.milkmaidTrustBonus = 1;
	V.milkmaidDevotionThreshold = 45;
	V.milkmaidTrustThreshold = 35;
	let growth;
	let cashValue;
	let outputMilk;
	let outputCum;
	const dairyNameCaps = capFirstChar(V.dairyName);

	// Statistics gathering
	V.facility = V.facility || {};
	V.facility.dairy = initFacilityStatistics(V.facility.dairy);
	const dairyStats = document.createElement("div");
	beforeFrag.append(dairyStats);

	if (V.MilkmaidID !== 0) {
		r = [];
		let milkmaidImpregnated = 0;
		let milkers = 0;
		let cummers = 0;
		let breeders = 0;
		let prostateStim = 0;

		for (const slave of slaves) {
			if (slave.lactation > 0) {
				milkers++;
			}
			if (slave.balls > 0 && slave.ballType === "human") {
				cummers++;
			}
			if (slave.bellyPreg >= 500 && V.dairyPregSetting > 0) {
				breeders++;
			}
			if (V.milkmaidImpregnates === 1 && canPenetrate(S.Milkmaid) && S.Milkmaid.pubertyXY === 1 && !slaveResting(S.Milkmaid)) {
				if (canImpreg(slave, S.Milkmaid) && slave.pregKnown === 0) {
					milkmaidImpregnated++;
					if (slave.mpreg === 1) {
						seX(slave, "anal", S.Milkmaid, "penetrative", 10);
					} else {
						seX(slave, "vaginal", S.Milkmaid, "penetrative", 10);
					}
					knockMeUp(slave, 100, 2, V.MilkmaidID);
				}
			}
			/* how much effort the MM must take to force a slave into a stall */
			if (slave.devotion <= 20) {
				MMWorkout++;
			}
			if (slave.trust < 20) {
				MMWorkout++;
			}
			if (slave.muscles >= 30 || slave.muscles < -30) {
				MMWorkout++;
			}
			let workoutEffect = 1;
			if (!canMove(slave)) { // big bonus if they can't move themselves and are fat as cows
				workoutEffect += 2;
			} else if (!canWalk(slave)) { // smaller bonus if they are fat as cows and need assistance with moving
				workoutEffect += 1;
			}
			if (slave.weight >= 70) {
				MMWorkout += workoutEffect;
			}
			if (slave.weight >= 160) {
				MMWorkout += workoutEffect;
			}
			if (slave.boobs >= 20000) {
				MMWorkout += workoutEffect;
			}
			if (slave.balls >= 30) {
				MMWorkout += workoutEffect;
			}
			if (slave.belly >= 5000) {
				MMWorkout += workoutEffect;
			}
			if (V.dairyStimulatorsSetting < 2 && S.Milkmaid.dick > 4 && canPenetrate(S.Milkmaid) && prostateStim !== 1) {
				if (slave.balls > 0 && slave.prostate > 0) {
					prostateStim = 1;
				}
			}
		}

		if (S.Milkmaid.health.condition < 90) {
			S.Milkmaid.curatives = 2;
		} else {
			S.Milkmaid.curatives = 0;
		}
		if (S.Milkmaid.diet !== Diet.HEALTHY) {
			(S.Milkmaid.diet = Diet.HEALTHY);
		}
		if (S.Milkmaid.devotion <= 60) {
			S.Milkmaid.devotion += 5;
		}
		if (S.Milkmaid.trust < 60) {
			S.Milkmaid.trust += 5;
		}
		if (S.Milkmaid.skill.oral > 0) {
			V.milkmaidDevotionBonus += Math.trunc(S.Milkmaid.skill.oral / 30);
		}
		if (S.Milkmaid.health.condition >= 80) {
			V.milkmaidHealthBonus++;
		}
		if (S.Milkmaid.rules.living !== "luxurious") {
			S.Milkmaid.rules.living = "luxurious";
		}
		if (S.Milkmaid.rules.rest !== "restrictive") {
			S.Milkmaid.rules.rest = "restrictive";
		}
		let FLsFetish = 0;
		if (S.Milkmaid.fetishStrength <= 95) {
			if (milkers >= cummers && milkers >= breeders) {
				if (S.Milkmaid.fetish !== Fetish.BOOBS) {
					if (fetishChangeChance(S.Milkmaid) > random(0, 100)) {
						FLsFetish = 1;
						S.Milkmaid.fetishKnown = 1;
						S.Milkmaid.fetish = Fetish.BOOBS;
						S.Milkmaid.fetishStrength = 10;
					}
				} else if (S.Milkmaid.fetishKnown === 0) {
					FLsFetish = 1;
					S.Milkmaid.fetishKnown = 1;
				} else {
					FLsFetish = 2;
					S.Milkmaid.fetishStrength += 4;
				}
			} else if (cummers >= breeders) {
				if (S.Milkmaid.fetish !== Fetish.CUMSLUT) {
					if (fetishChangeChance(S.Milkmaid) > random(0, 100)) {
						FLsFetish = 3;
						S.Milkmaid.fetishKnown = 1;
						S.Milkmaid.fetish = Fetish.CUMSLUT;
						S.Milkmaid.fetishStrength = 10;
					}
				} else if (S.Milkmaid.fetishKnown === 0) {
					FLsFetish = 3;
					S.Milkmaid.fetishKnown = 1;
				} else {
					FLsFetish = 4;
					S.Milkmaid.fetishStrength += 4;
				}
			} else {
				if (S.Milkmaid.fetish !== Fetish.PREGNANCY) {
					if (fetishChangeChance(S.Milkmaid) > random(0, 100)) {
						FLsFetish = 5;
						S.Milkmaid.fetishKnown = 1;
						S.Milkmaid.fetish = Fetish.PREGNANCY;
						S.Milkmaid.fetishStrength = 10;
					}
				} else if (S.Milkmaid.fetishKnown === 0) {
					FLsFetish = 5;
					S.Milkmaid.fetishKnown = 1;
				} else {
					FLsFetish = 6;
					S.Milkmaid.fetishStrength += 4;
				}
			}
		}
		getSlaveStatisticData(S.Milkmaid, V.facility.dairy);
		const {
			he, him, his, He, His, wife, girl
		} = getPronouns(S.Milkmaid);
		r.push(`${SlaveFullName(S.Milkmaid)} is serving as your Milkmaid.`);
		if (S.Milkmaid.relationship === -3 && S.Milkmaid.devotion > 50) {
			V.milkmaidDevotionBonus += 2;
			V.milkmaidTrustBonus += 2;
			r.push(`${He} tries ${his} best to be your perfect farm${wife}.`);
		}
		if (milkmaidImpregnated > 0) {
			r.push(`It's ${his} responsibility to keep ${his} charges pregnant, and ${he} constantly`);
			if (milkmaidImpregnated === 1) {
				r.push(`breeds the one fertile cow.`);
			} else {
				r.push(`fills the ${milkmaidImpregnated} cows' cunts with ${his} cum.`);
			}
			if (S.Milkmaid.career === "a breeding bull") {
				r.push(`${He} was conditioned to fill empty wombs, so ${he} takes a <span class="hotpink">deep pleasure</span> in ${his} job.`);
				S.Milkmaid.devotion++;
			} else if (S.Milkmaid.fetish === Fetish.PREGNANCY && S.Milkmaid.fetishKnown === 1) {
				r.push(`${He} has a pregnancy fetish, so ${he} finds ${his} job <span class="hotpink">quite enjoyable,</span> especially when ${he} gets to watch the cows swell with ${his} children.`);
				S.Milkmaid.devotion += Math.ceil(S.Milkmaid.fetishStrength / 25);
				S.Milkmaid.fetishStrength += 2;
			}
			actX(S.Milkmaid, "penetrative", (milkmaidImpregnated * 10));
			S.Milkmaid.need = 0;
		}
		switch (FLsFetish) {
			case 1:
				r.push(`In ${his} line of work, ${he} touches more breasts than even you do. ${He} lives in an atmosphere of quivering, heaving, milky breastflesh; of girls who shudder and moan when ${he} touches their creamy nipples. ${He} has <span class="lightcoral">become more of a breast ${girl}.</span>`);
				break;
			case 2:
				r.push(`It's a hard life, pulling teats and washing cows, but it does <span class="lightsalmon">make ${him} more of a breast fetishist.</span>`);
				break;
			case 3:
				r.push(`In ${his} line of work, ${he} touches more dicks and balls than most sluts. ${He} lives in an atmosphere of constant orgasm and ejaculation; of girls who shudder and moan when ${he} touches their engorged members. ${He} has <span class="lightcoral">become more of a cum ${girl}.</span>`);
				break;
			case 4:
				r.push(`It's a hard life, cupping balls, cleaning dicks, and observing semen quality, but it does <span class="lightsalmon">make ${him} more of a cum fetishist.</span>`);
				break;
			case 5:
				r.push(`In ${his} line of work, ${he} fondles more pregnancies than most clinics. ${He} lives in an atmosphere of swollen, hanging, baby-filled bellies; of girls who shudder and moan when ${he} runs ${his} hands across their bellies. ${He} has <span class="lightcoral">grown a taste for girls laden with child.</span>`);
				break;
			case 6:
				r.push(`It's a hard life, washing bellies and inspecting pussies, but it does <span class="lightsalmon">make ${him} more of a pregnancy fetishist.</span>`);
				break;
		}
		if (S.Milkmaid.muscles > 30) {
			V.milkmaidHealthBonus++;
			r.push(`${His} muscles help ${him} handle the fattest or most reluctant cow.`);
		}
		if (MMWorkout > random(1, 30 - S.Milkmaid.geneticQuirks.mLoss + S.Milkmaid.geneticQuirks.mGain) && S.Milkmaid.muscles < 60) {
			r.push(`Constantly having to wrestle unruly or aiding heavy cows into their stalls forces ${him} to <span class="lime">build muscle.</span>`);
			S.Milkmaid.muscles++;
		}
		if (S.Milkmaid.skill.oral > 30) {
			r.push(`${His} skilled tongue helps ${him} keep ${his} cattle happy.`);
		}
		if (S.Milkmaid.skill.oral < 90) {
			slaveSkillIncrease('oral', S.Milkmaid, 3);
		}
		if (S.Milkmaid.sexualQuirk === SexualQuirk.CARING) {
			V.milkmaidTrustBonus++;
			r.push(`${He}'s very caring, and does ${his} best to get the cows to trust ${him}.`);
		}
		if (S.Milkmaid.behavioralQuirk === BehavioralQuirk.FUNNY) {
			V.milkmaidTrustBonus++;
			r.push(`${He}'s funny, and does ${his} best to get the cows to trust ${him} by keeping them laughing.`);
		}
		if (App.Data.Careers.Leader.milkmaid.includes(S.Milkmaid.career)) {
			V.milkmaidHealthBonus++;
			r.push(`${He} has career experience dealing with milk animals.`);
		} else if (S.Milkmaid.skill.milkmaid >= Constant.MASTERED_XP) {
			V.milkmaidHealthBonus++;
			r.push(`${He} has experience harvesting slave products from working for you.`);
		} else {
			const skillIncrease = random(1, Math.ceil((S.Milkmaid.intelligence + S.Milkmaid.intelligenceImplant) / 15) + 8);
			r.push(slaveSkillIncrease('milkmaid', S.Milkmaid, skillIncrease));
		}
		if (prostateStim === 1) {
			if (S.Milkmaid.skill.penetrative > 90) {
				r.push(`${He} uses ${his} turgid cock and masterful technique to milk each slave's prostate dry.`);
			} else if (S.Milkmaid.skill.penetrative > 10) {
				r.push(`${He} uses ${his} turgid cock to give prostate stimulation to slaves that need help ejaculating.`);
			} else {
				r.push(`${He} tries to use ${his} turgid cock to give prostate stimulation and help slaves ejaculate, but has no idea where ${he} needs to aim to do so.`);
			}
			S.Milkmaid.need -= 50;
		}
		if (milkmaidImpregnated || prostateStim) {
			slaveSkillIncrease('penetrative', S.Milkmaid, 2);
		}
		V.milkmaidDevotionThreshold += (5 * V.milkmaidDevotionBonus);
		V.milkmaidTrustThreshold += (5 * V.milkmaidTrustBonus);
		for (const slave of slaves) {
			if (S.Milkmaid.rivalryTarget === slave.ID) {
				const {he2} = getPronouns(slave).appendSuffix("2");
				r.push(`${He} either neglects or harasses ${his} ${rivalryTerm(S.Milkmaid)}, ${slave.slaveName}, making sure ${he2} is unhappy and uncomfortable.`);
				slave.devotion -= 3;
				slave.trust -= 3;
				if (random(1, 100) > 65) {
					S.Milkmaid.rivalry++;
					slave.rivalry++;
				}
			} else if (S.Milkmaid.relationshipTarget === slave.ID) {
				const {he2} = getPronouns(slave).appendSuffix("2");
				r.push(`${He} dotes over ${his} ${relationshipTerm(S.Milkmaid)}, ${slave.slaveName}, making sure ${he2} is happy and comfortable.`);
				slave.devotion++;
				slave.trust++;
			} else if (areRelated(S.Milkmaid, slave)) {
				const {he2} = getPronouns(slave).appendSuffix("2");
				r.push(`${He} pays special attention to ${his} ${relativeTerm(S.Milkmaid, slave)}, ${slave.slaveName}, making sure ${he2} is well kept and happy.`);
				slave.trust++;
			}
			if (slave.prestigeDesc === "$He is remembered for winning best in show as a dairy cow.") {
				if (slave.lactation > 0 && (slave.boobs - slave.boobsImplant) > 6000) {
					r.push(`${He} spends extra time with ${slave.slaveName}, the well-known cow. ${He} is fascinated by ${slave.slaveName}'s massive ${commaNum(slave.boobs)}cc breasts and spends extra time massaging and kneading them to maximize production.`);
					slave.devotion += 3;
					slave.trust += 3;
				} else {
					r.push(`${He} is disappointed that the well-known cow ${slave.slaveName}${(slave.lactation === 0) ? ` isn't producing milk anymore` : `'s breasts have shrunken considerably from their heyday`}.`);
				}
			}
			if (slave.prestigeDesc === "$He is remembered for winning best in show as a cockmilker.") {
				if ((slave.balls > 6 && slave.dick !== 0) || (slave.balls > 4 && slave.dick !== 0 && slave.prostate > 1)) {
					r.push(`${He} spends extra time with ${slave.slaveName}, the massive ejaculating cow. ${He} can't help but massage the cow's dick and testes to stimulate them further and coax more from them.`);
					slave.devotion += 3;
					slave.trust += 3;
				} else {
					r.push(`${He} is disappointed that the (formerly) massive ejaculating cow`);
					if (slave.balls === 0 || slave.dick === 0) {
						r.push(`${slave.slaveName} is incapable of giving cum.`);
					} else if (slave.prostate < 2) {
						r.push(`${slave.slaveName} no longer possesses a hyperactive prostate.`);
					} else {
						r.push(`${slave.slaveName}'s balls are considerably smaller than at their heyday.`);
					}
				}
			}
			if (slave.prestigeDesc === "$He is remembered for winning best in show as a breeder." && slave.bellyPreg >= 1500) {
				const {his2} = getPronouns(slave).appendSuffix("2");
				r.push(`${He} spends extra time with ${slave.slaveName}, the well-known breeder. ${S.Milkmaid.slaveName} is fascinated by ${his2} growing pregnancy and popular womb. ${He} makes sure ${his2} belly and its occupants are nice and comfortable.`);
				slave.devotion += 3;
				slave.trust += 3;
			}
		}
		App.Events.addNode(beforeFrag, r, "p", "indent");
	}

	const bioreactors = App.Entity.facilities.dairy.nonEmployeeOccupantsCount;
	if (DL + bioreactors > 0) {
		r = [];
		if (DL !== 1) {
			r.push(App.UI.DOM.makeElement("span", `There are ${DL} cows in ${V.dairyName}.`, "bold"));
		} else {
			r.push(App.UI.DOM.makeElement("span", `There is one cow in ${V.dairyName}.`, "bold"));
		}
		if (V.dairyRestraintsSetting > 1) {
			r.push(`The facility functions as an industrial slave products factory.`);
		}
		if (bioreactors > 0) {
			r.push(`${bioreactors} milking machines have permanent biological components, making a total of ${bioreactors + DL} milk-producing bodies.`);
		}
		App.Events.addNode(beforeFrag, r, "div");
	}

	/** @type {Array<FC.EndWeek.SlaveReport>} */
	const slaveReports = [];

	if (S.Milkmaid) {
		const slave = App.SlaveAssignment.reportSlave(S.Milkmaid);
		tired(slave);
		/* apply following SA passages to facility leader */
		if (V.showEWD !== 0 || (V.favSeparateReport === 1 && V.favorites.includes(slave.ID))) {
			const milkMaidEntry = App.UI.DOM.makeElement("div", '', ["slave-report"]);
			const artSpan = App.UI.DOM.appendNewElement("span", milkMaidEntry);
			milkMaidEntry.append(App.SlaveAssignment.saSlaveIntro(slave, `is serving as your Milkmaid.`));
			milkMaidEntry.append(App.SlaveAssignment.standardSlaveReport(slave, false));
			App.SlaveAssignment.appendSlaveArt(artSpan, slave);
			slaveReports.push({
				id: slave.ID,
				report: milkMaidEntry,
			});
		} else {
			App.SlaveAssignment.standardSlaveReport(slave, true);
		}
	}

	const oldCash = V.cash;
	for (const slave of App.SlaveAssignment.reportSlaves(slaves)) {
		/* Perform facility based rule changes */

		// Set diet
		if (V.dairySlimMaintain === 0 || V.dairySlimMaintainUpgrade === 0) {
			if (V.dairyWeightSetting === 0) {
				if (slave.weight <= 30) {
					slave.diet = Diet.FATTEN;
				} else {
					slave.diet = Diet.HEALTHY;
				}
			} else if (V.dairyWeightSetting === 1) {
				if (slave.weight <= 95) {
					slave.diet = Diet.FATTEN;
				} else {
					slave.diet = Diet.HEALTHY;
				}
			} else if (V.dairyWeightSetting === 2) {
				if (slave.weight <= 130) {
					slave.diet = Diet.FATTEN;
				} else {
					slave.diet = Diet.HEALTHY;
				}
			} else if (V.dairyWeightSetting === 3) {
				if (slave.weight <= 160) {
					slave.diet = Diet.FATTEN;
				} else {
					slave.diet = Diet.HEALTHY;
				}
			} else if (V.dairyWeightSetting === 4) {
				if (slave.weight <= 195) {
					slave.diet = Diet.FATTEN;
				} else {
					slave.diet = Diet.HEALTHY;
				}
			} else if (V.dairyRestraintsSetting > 1) {
				slave.diet = Diet.HEALTHY;
			}
		} else if (slave.weight > 10) {
			slave.diet = Diet.RESTRICTED;
		} else if (slave.diet === Diet.FATTEN || slave.diet === Diet.HEALTHY || V.dairyRestraintsSetting > 1) {
			slave.diet = Diet.HEALTHY;
		}

		// Set clothing and accessories
		if (V.dairyRestraintsSetting > 1) {
			slave.collar = "none";
			slave.faceAccessory = "none";
			slave.mouthAccessory = "none";
			slave.choosesOwnClothes = 0;
			slave.clothes = "no clothing";
			slave.vaginalAccessory = "none";
			slave.vaginalAttachment = "none";
			slave.dickAccessory = "none";
			slave.buttplug = "none";
			slave.chastityAnus = 0;
			slave.chastityPenis = 0;
			slave.chastityVagina = 0;
		}

		// Set living standard
		switch (V.dairyDecoration) {
			case "Arabian Revivalist":
			case "Aztec Revivalist":
			case "Chattel Religionist":
			case "Chinese Revivalist":
			case "Degradationist":
			case "Edo Revivalist":
			case "Egyptian Revivalist":
			case "Roman Revivalist":
			case "Subjugationist":
			case "Supremacist":
				slave.rules.living = "spare";
				break;
			default:
				slave.rules.living = "normal";
		}

		// Set child destination
		if (V.dairyPregSetting > 0) {
			WombCleanGenericReserve(slave, "incubator", 9999);
			WombCleanGenericReserve(slave, "nursery", 9999);
		}

		/* General End of Week effects */
		const milkResults = App.SlaveAssignment.getMilked(slave);
		milkWeek += milkResults.milk;
		cumWeek += milkResults.cum;
		if (V.showEWD !== 0 || (V.favSeparateReport === 1 && V.favorites.includes(slave.ID))) {
			const slaveEntry = App.UI.DOM.makeElement("div", null, ["slave-report"]);
			const artSpan = App.UI.DOM.appendNewElement("span", slaveEntry);
			slaveEntry.append(App.SlaveAssignment.saSlaveIntro(slave, `is serving as a cow in ${V.dairyName}.`));

			const {He} = getPronouns(slave);
			App.Events.addNode(
				slaveEntry,
				[
					He,
					milkResults.text,
				],
				"div",
				"indent"
			);
			slaveEntry.append(App.SlaveAssignment.standardSlaveReport(slave, false));
			App.SlaveAssignment.appendSlaveArt(artSpan, slave);

			slaveReports.push({
				id: slave.ID,
				report: slaveEntry,
			});
		} else {
			// discard return values silently
			App.SlaveAssignment.standardSlaveReport(slave, true);
		}

		/* Facility Specific End of Week effects */
		if (slave.devotion <= 20 && slave.trust >= -20) {
			slave.devotion -= 5;
			slave.trust -= 5;
		}

		// Heal
		if (slave.health.condition < -80) {
			improveCondition(slave, 20);
		} else if (slave.health.condition < -40) {
			improveCondition(slave, 10);
		} else if (slave.health.condition < 0) {
			improveCondition(slave, 7);
		} else if (slave.health.condition < 90) {
			improveCondition(slave, 3);
		}

		// Empty inflation
		if (slave.inflation > 0) {
			deflate(slave);
		}

		// Boobs grow
		const gigantomastiaMod = slave.geneticQuirks.gigantomastia === 2 ? (slave.geneticQuirks.macromastia === 2 ? 3 : 2) : 1;
		if (slave.lactation > 0 && (V.dairySlimMaintain === 0 || slave.boobs > 700)) {
			if (slave.boobs < 2000) {
				growth = 100;
			} else if (slave.boobs < 5000 * gigantomastiaMod) {
				growth = 50;
			} else if (slave.boobs < 10000 * gigantomastiaMod) {
				growth = 25;
			} else {
				growth = 0;
			}
			if (slave.geneMods.NCS === 1) {
				growth = Math.trunc(growth / 2);
			}
			slave.boobs += growth;
		}

		// Prostate growth
		if (slave.prostate === 1 && V.dairyImplantsSetting <= 1) {
			slave.prostate = 2;
			cashX(forceNeg(V.surgeryCost), "slaveSurgery", slave);
			surgeryDamage(slave, 10);
		}

		// Undo Vasectomy
		if (slave.vasectomy === 1) {
			slave.vasectomy = 0;
			cashX(forceNeg(V.surgeryCost), "slaveSurgery", slave);
			surgeryDamage(slave, 10);
		}

		// Force lactation
		if (V.dairySlimMaintain === 0) {
			if (V.dairyImplantsSetting <= 1) {
				if (slave.lactation < 2 && (slave.boobs > 300 || slave.balls === 0 || slave.lactation === 1 || V.dairyImplantsSetting === 1)) {
					slave.lactation = 2;
					slave.lactationDuration = 2;
					cashX(forceNeg(V.surgeryCost), "slaveSurgery", slave);
					surgeryDamage(slave, 10);
				}
			} else if (V.dairyImplantsSetting === 3) {
				if (slave.lactation < 1 && (slave.boobs > 300 || slave.balls === 0)) {
					induceLactation(slave, 9);
				}
			}
		}

		// Hormones
		if (V.dairyHormonesSetting >= 0) {
			if (slave.lactation > 0) {
				slave.hormones = V.dairyHormonesSetting;
			} else if (slave.balls > 0) {
				slave.hormones = -1 * V.dairyHormonesSetting;
			} else {
				slave.hormones = V.dairyHormonesSetting;
			}
		}

		// Feeders
		if (V.dairyFeedersUpgrade === 1 && V.dairyFeedersSetting > 0) {
			if (V.dairySlimMaintain === 0 && slave.diet === Diet.FATTEN) {
				slave.weight += 2;
				if (slave.weightDirection === 1) {
					slave.weight += 2;
				}
			}
			if (slave.health.condition < 75) {
				improveCondition(slave, 25);
			} else {
				if (V.dairySlimMaintain === 0 && slave.lactation > 0) {
					if (V.dairyStimulatorsSetting > 0) {
						if (V.dairyFeedersSetting > 1) {
							if (slave.boobs < 50000) {
								if (V.arcologies[0].FSAssetExpansionistResearch === 1) {
									if (slave.boobs < 2000) {
										growth = 75 * boobsMultiplier + (50 / 4);
									} else if (slave.boobs < 5000 * gigantomastiaMod) {
										growth = 50 * boobsMultiplier + (50 / 4);
									} else {
										growth = 25 * boobsMultiplier + (50 / 4);
									}
								} else {
									growth = 25 * boobsMultiplier + ((50 - slave.physicalAge) / 4);
								}
								if (slave.boobs <= 20000 && slave.boobs + growth > 20000) {
									boobtacular++;
								}
								if (slave.geneMods.NCS === 1) {
									growth = Math.trunc(growth / 2);
								}
								slave.boobs += growth;
							} else {
								/* slave.boobs = 50000;*/
							}
						} else {
							if (slave.boobs < 25000) {
								if (V.arcologies[0].FSAssetExpansionistResearch === 1) {
									if (slave.boobs < 2000) {
										growth = 75 * boobsMultiplier + (50 / 4);
									} else if (slave.boobs < 5000 * gigantomastiaMod) {
										growth = 50 * boobsMultiplier + (50 / 4);
									} else {
										growth = 25 * boobsMultiplier + (50 / 4);
									}
								} else {
									growth = 25 * boobsMultiplier + ((50 - slave.physicalAge) / 4);
								}
								if (slave.boobs <= 20000 && slave.boobs + growth > 20000) {
									boobtacular++;
								}
								if (slave.geneMods.NCS === 1) {
									growth = Math.trunc(growth / 2);
								}
								slave.boobs += growth;
							}
						}
					} else if (V.dairyFeedersSetting > 1) {
						if (slave.boobs < 10000) {
							if (V.arcologies[0].FSAssetExpansionistResearch === 1) {
								if (slave.boobs < 2000) {
									growth = 75 * boobsMultiplier + (50 / 4);
								} else if (slave.boobs < 5000 * gigantomastiaMod) {
									growth = 50 * boobsMultiplier + (50 / 4);
								} else {
									growth = 25 * boobsMultiplier + (50 / 4);
								}
							} else {
								growth = 25 * boobsMultiplier + ((50 - slave.physicalAge) / 4);
							}
							if (slave.boobs <= 20000 && slave.boobs + growth > 20000) {
								boobtacular++;
							}
							if (slave.geneMods.NCS === 1) {
								growth = Math.trunc(growth / 2);
							}
							slave.boobs += growth;
						}
					} else {
						if (slave.boobs < 5000) {
							if (V.arcologies[0].FSAssetExpansionistResearch === 1) {
								if (slave.boobs < 2000) {
									growth = 75 * boobsMultiplier + (50 / 4);
								} else if (slave.boobs < 5000 * gigantomastiaMod) {
									growth = 50 * boobsMultiplier + (50 / 4);
								} else {
									growth = 25 * boobsMultiplier + (50 / 4);
								}
							} else {
								growth = 25 * boobsMultiplier + ((50 - slave.physicalAge) / 4);
							}
							if (slave.boobs <= 20000 && slave.boobs + growth > 20000) {
								boobtacular++;
							}
							if (slave.geneMods.NCS === 1) {
								growth = Math.trunc(growth / 2);
							}
							slave.boobs += growth;
						}
					}
				}
				if (slave.balls > 0) {
					const ballFormula = 10 * (slave.balls - restrainedInjected);
					if (V.arcologies[0].FSAssetExpansionistResearch === 1) {
						if (slave.geneMods.NCS === 0 && slave.balls < 125) {
							slave.balls++;
						} else if (
							slave.geneMods.NCS === 1 && slave.balls < 125 &&
							random(1, 600) > (30 + ballFormula)
						) {
							slave.balls++;
						}
						if (slave.balls >= 125) {
							balltacular.push(slave);
						}
					} else if (slave.balls < 10) {
						if (slave.geneMods.NCS === 0 && random(1, 100) > (40 + ballFormula)) {
							slave.balls++;
						} else if (
							slave.geneMods.NCS === 1 && slave.balls < 125 && random(1, 50) > (40 + ballFormula)) {
							slave.balls++;
						}
						if (slave.balls >= 10) {
							balltacular.push(slave);
						}
					}
					if (slave.dick > 0) {
						const dickFormula = 10 * (4 + slave.dick - restrainedInjected);
						if (slave.dick < 10) {
							if (slave.geneMods.NCS === 0 && random(1, 100) > dickFormula) {
								slave.dick++;
							} else if (slave.geneMods.NCS === 1 && random(1, 50) > dickFormula) {
								slave.dick++;
							}
						}
					}
				}
			}
		}

		// Stimulators
		if (V.dairyStimulatorsUpgrade === 1 && V.dairyStimulatorsSetting > 0) {
			if (V.seeStretching === 1 && V.dairyStimulatorsSetting > 1 && slave.anus < 4) {
				slave.anus++;
				if (slave.anus >= 4) {
					anusesStretched++;
				}
			} else if (V.seeStretching === 1 && slave.anus < 3) {
				slave.anus++;
			}
			if (slave.health.condition < 60) {
				improveCondition(slave, 20);
			} else if (V.dairySlimMaintain === 0 && slave.lactation > 0) {
				if (V.dairyFeedersSetting > 1) {
					if (slave.boobs < 50000) {
						if (V.arcologies[0].FSAssetExpansionistResearch === 1) {
							if (slave.boobs < 2000) {
								growth = 75 * boobsMultiplier + (50 / 4);
							} else if (slave.boobs < 5000 * gigantomastiaMod) {
								growth = 50 * boobsMultiplier + (50 / 4);
							} else {
								growth = 25 * boobsMultiplier + (50 / 4);
							}
						} else {
							growth = 25 * boobsMultiplier + ((50 - slave.physicalAge) / 4);
						}
						if (slave.boobs <= 20000 && slave.boobs + growth > 20000) {
							boobtacular++;
						}
						if (slave.geneMods.NCS === 1) {
							growth = Math.trunc(growth / 2);
						}
						slave.boobs += growth;
					}
				} else if (V.dairyFeedersSetting > 0) {
					if (slave.boobs < 25000) {
						if (V.arcologies[0].FSAssetExpansionistResearch === 1) {
							if (slave.boobs < 2000) {
								growth = 75 * boobsMultiplier + (50 / 4);
							} else if (slave.boobs < 5000 * gigantomastiaMod) {
								growth = 50 * boobsMultiplier + (50 / 4);
							} else {
								growth = 25 * boobsMultiplier + (50 / 4);
							}
						} else {
							growth = 25 * boobsMultiplier + ((50 - slave.physicalAge) / 4);
						}
						if (slave.boobs <= 20000 && slave.boobs + growth > 20000) {
							boobtacular++;
						}
						if (slave.geneMods.NCS === 1) {
							growth = Math.trunc(growth / 2);
						}
						slave.boobs += growth;
					}
				} else {
					if (slave.boobs < 10000) {
						if (V.arcologies[0].FSAssetExpansionistResearch === 1) {
							if (slave.boobs < 2000) {
								growth = 75 * boobsMultiplier + (50 / 4);
							} else if (slave.boobs < 5000 * gigantomastiaMod) {
								growth = 50 * boobsMultiplier + (50 / 4);
							} else {
								growth = 25 * boobsMultiplier + (50 / 4);
							}
						} else {
							growth = 25 * boobsMultiplier + ((50 - slave.physicalAge) / 4);
						}
						if (slave.boobs <= 20000 && slave.boobs + growth > 20000) {
							boobtacular++;
						}
						if (slave.geneMods.NCS === 1) {
							growth = Math.trunc(growth / 2);
						}
						slave.boobs += growth;
					}
				}
			}
		}

		// Restraints
		if (V.dairyRestraintsSetting > 1) {
			if (slave.lactation > 0) {
				slave.lactationAdaptation += 1;
			}
			if (slave.muscles > -100) {
				slave.muscles -= 1 + slave.geneticQuirks.mLoss;
			}
			if (slave.fetish === Fetish.MINDBROKEN) {
				if (slave.boobs > 48000 && (slave.balls >= 10 || slave.balls === 0)) {
					V.bioreactorPerfectedID = slave.ID;
				}
			} else {
				if (slave.sexualFlaw !== SexualFlaw.SELFHATING) {
					if (slave.sexualFlaw !== SexualFlaw.CUMADDICT || V.dairyFeedersSetting === 0) {
						if (slave.sexualFlaw !== SexualFlaw.ANALADDICT || V.dairyStimulatorsSetting === 0) {
							if (slave.sexualFlaw !== SexualFlaw.BREEDER || slave.preg < 0 || V.dairyPregSetting === 0) {
								if (V.dairyStimulatorsSetting > 1) {
									if (slave.sexualFlaw !== SexualFlaw.HATESANAL && slave.sexualQuirk !== SexualQuirk.PAINAL) {
										slave.sexualFlaw = SexualFlaw.HATESANAL;
									}
								}
								if (V.dairyPregSetting > 1) {
									if (slave.sexualFlaw !== SexualFlaw.HATESPEN && slave.sexualQuirk !== SexualQuirk.STRUGGLE) {
										slave.sexualFlaw = SexualFlaw.HATESPEN;
									}
								}
								if (V.dairyFeedersSetting > 1) {
									if (slave.sexualFlaw !== SexualFlaw.HATESORAL && slave.sexualQuirk !== SexualQuirk.GAGFUCK) {
										slave.sexualFlaw = SexualFlaw.HATESORAL;
									}
								}
							}
						}
					}
				}
			}
			if (slave.chem > 250) {
				chemSevere++;
			} else if (slave.chem > 100) {
				chemMinor.push(slave);
			}
		}

		// Stimulator + Feeders + Pregnancy
		if (dairySettings > 5) {
			if (slave.devotion <= 95 && slave.sexualFlaw !== SexualFlaw.SELFHATING) {
				if (slave.sexualFlaw !== SexualFlaw.BREEDER || slave.preg < 0) {
					if (slave.devotion > -75) {
						slave.devotion -= 10;
						if (slave.devotion < -65) {
							hateFilled.push(slave);
						}
					} else if (slave.trust > -75) {
						slave.trust -= 10;
						if (slave.trust < -65) {
							horrified.push(slave);
						}
					} else if (slave.skill.oral > 0) {
						slave.skill.oral -= 10;
						skillsLost.push(slave);
					} else if (slave.skill.anal > 0) {
						slave.skill.anal -= 10;
						skillsLost.push(slave);
					} else if (slave.skill.vaginal > 0) {
						slave.skill.vaginal -= 10;
						skillsLost.push(slave);
					} else if (slave.skill.penetrative > 0) {
						slave.skill.penetrative -= 10;
						skillsLost.push(slave);
					} else if (slave.career !== "a bioreactor") {
						slave.career = "a bioreactor";
						careerForgotten.push(slave);
					} else if (slave.intelligenceImplant > 0) {
						slave.intelligenceImplant = Math.clamp(slave.intelligenceImplant - 5, 0, 30);
						skillsLost.push(slave);
					} else if (slave.intelligence >= -15) {
						slave.intelligence -= 5;
						intelligenceLost++;
					} else if (slave.devotion >= -20) {
						slave.devotion -= 10;
					} else if (slave.trust >= -20) {
						slave.trust -= 10;
					} else if (slave.skill.whoring > 0) {
						slave.skill.whoring -= 10;
						skillsLost.push(slave);
					} else if (slave.skill.entertainment > 0) {
						slave.skill.entertainment -= 10;
						skillsLost.push(slave);
					} else if (slave.intelligence >= -50) {
						slave.intelligence -= 5;
						if (slave.intelligence < -50) {
							stupidified.push(slave);
						}
					} else if (slave.fetish !== Fetish.MINDBROKEN) {
						applyMindbroken(slave);
						mindbroken++;
					}
				}
			}
			if (slave.career !== "a bioreactor" &&
				(
					(slave.counter.milk > 1000 && slave.boobs > 12000) ||
					(slave.counter.cum > 1000 && slave.balls >= 10)
				)
			) {
				slave.career = "a bioreactor";
				careerForgotten.push(slave);
			}
			if (V.arcologies[0].FSBodyPuristLaw === 0 && V.healthyDrugsUpgrade === 0) {
				slave.chem += 5;
			} else {
				slave.chem += 2;
			}
		} else if (dairySettings > 3) {
			if (slave.devotion < 75) {
				if (slave.devotion > -75) {
					slave.devotion -= 5;
					if (slave.devotion < -70) {
						hateFilled.push(slave);
					}
				} else if (slave.trust > -75) {
					slave.trust -= 5;
					if (slave.trust < -70) {
						horrified.push(slave);
					}
				} else if (slave.skill.oral >= 20) {
					slave.skill.oral -= 10;
					skillsLost.push(slave);
				} else if (slave.skill.anal >= 20) {
					slave.skill.anal -= 10;
					skillsLost.push(slave);
				} else if (slave.skill.vaginal >= 20) {
					slave.skill.vaginal -= 10;
					skillsLost.push(slave);
				} else if (slave.skill.penetrative >= 20) {
					slave.skill.penetrative -= 10;
					skillsLost.push(slave);
				} else if (slave.career !== "a bioreactor") {
					slave.career = "a bioreactor";
					careerForgotten.push(slave);
				} else if (slave.intelligenceImplant > 0) {
					slave.intelligenceImplant = Math.clamp(slave.intelligenceImplant - 5, 0, 30);
					skillsLost.push(slave);
				} else if (slave.intelligence >= -15) {
					slave.intelligence -= 5;
					intelligenceLost++;
				} else if (slave.devotion >= -20) {
					slave.devotion -= 8;
				} else if (slave.trust >= -20) {
					slave.trust -= 8;
				} else if (slave.skill.whoring >= 20) {
					slave.skill.whoring -= 10;
					skillsLost.push(slave);
				} else if (slave.skill.entertainment >= 20) {
					slave.skill.entertainment -= 10;
					skillsLost.push(slave);
				} else if (slave.intelligence >= -50) {
					slave.intelligence -= 5;
					if (slave.intelligence < -50) {
						stupidified.push(slave);
					}
				} else if (slave.fetish !== Fetish.MINDBROKEN) {
					applyMindbroken(slave);
					mindbroken++;
				}
			} else if (slave.career !== "a bioreactor" &&
				(
					(slave.counter.milk > 1000 && slave.boobs > 12000) ||
					(slave.counter.cum > 1000 && slave.balls >= 10)
				)
			) {
				slave.career = "a bioreactor";
				careerForgotten.push(slave);
			}
			if (V.arcologies[0].FSBodyPuristLaw === 0 && V.healthyDrugsUpgrade === 0) {
				slave.chem += 2;
			} else {
				slave.chem++;
			}
		}

		// Pregnancy
		if (V.dairyPregUpgrade === 1 && V.dairyPregSetting > 0) {
			if (slave.ovaries === 1 && slave.vagina > -1) {
				femCumWeek += girlCumAmount(slave);
				if (slave.preg === -2) {
					slave.preg = 0;
					desterilized.push(slave);
				}
				if (isFertile(slave)) {
					if (slave.eggType === "human") {
						slave.preg = 1;
						slave.pregWeek = 1;
						slave.pregKnown = 1;
						if (V.dairyPregSetting > 2) {
							slave.pregType = random(10, 29);
						} else if (V.dairyPregSetting > 1) {
							slave.pregType = random(3, 6);
						} else {
							slave.pregType = either(1, 1, 1, 1, 2, 2, 2, 3, 3, 4);
						}
						slave.pregSource = -2;
						WombImpregnate(slave, slave.pregType, -2, 1);
					} /* closes eggType */
					if (slave.vagina === 0) {
						slave.vagina++;
					}
				} else if (slave.pregKnown === 1) {
					if (V.dairyPregSetting > 2) {
						cashValue = 100;
					} else if (V.dairyPregSetting > 1) {
						cashValue = 50;
					} else {
						cashValue = 25;
					}
					cashX(cashValue, "slaveAssignmentDairy", slave);
					if (V.seeStretching === 1 && V.dairyPregSetting > 1 && slave.vagina < 4) {
						slave.vagina++;
						if (slave.vagina === 4) {
							vaginasStretched++;
						}
					} else if (V.seeStretching === 1 && slave.vagina < 3) {
						slave.vagina++;
					}
				}
			}
		}
	} // End slave loop.

	const afterFrag = new DocumentFragment();

	// Inflation
	if (inflatedSlaves.milk > 0) {
		milkWeek -= ((8 * inflatedSlaves.milk * 10) + 8);
	}
	if (inflatedSlaves.cum > 0) {
		cumWeek -= ((80 * inflatedSlaves.cum * 10) + 80);
		if (cumWeek < 0) {
			cumWeek = 0;
		}
	}

	if (bioreactors > 0) {
		r = [];
		const tempCash = V.cash;

		let seed;
		seed = (BF.XY.cum * V.bioreactorsXY) + (BF.herm.cum * V.bioreactorsHerm);
		cumWeek += seed;
		if (V.arcologies[0].FSPastoralistLaw === 1) {
			cashValue = seed * random(40, 50);
		} else if (FutureSocieties.isActive('FSPastoralist')) {
			cashValue = seed * (random(25, 35) + Math.trunc(V.arcologies[0].FSPastoralist / 10));
		} else {
			cashValue = seed * random(25, 35);
		}
		cashX(cashValue, "menialBioreactors");

		seed = (BF.XX.femCum * V.bioreactorsXX) + (BF.herm.femCum * V.bioreactorsHerm);
		femCumWeek += seed;
		if (V.arcologies[0].FSPastoralistLaw === 1) {
			cashValue = seed * random(40, 50);
		} else if (FutureSocieties.isActive('FSPastoralist')) {
			cashValue = seed * (random(25, 35) + Math.trunc(V.arcologies[0].FSPastoralist / 10));
		} else {
			cashValue = seed * random(25, 35);
		}
		cashX(cashValue, "menialBioreactors");

		seed = (BF.XX.milk * V.bioreactorsXX) + (BF.barren.milk * V.bioreactorsBarren) + (BF.XY.milk * V.bioreactorsXY) + (BF.herm.milk * V.bioreactorsHerm);
		milkWeek += seed;
		if (FutureSocieties.isActive('FSPastoralist') && V.arcologies[0].FSPastoralistLaw === 1) {
			cashValue = seed * (13 + Math.trunc(V.arcologies[0].FSPastoralist / 30));
		} else if (FutureSocieties.isActive('FSPastoralist')) {
			cashValue = seed * (8 + Math.trunc(V.arcologies[0].FSPastoralist / 30));
		} else {
			cashValue = seed * 9;
		}
		cashX(cashValue, "menialBioreactors");
		r.push(`${bioreactors} permanently converted biological`);
		if (bioreactors > 1) {
			r.push(`"machines" produce`);
		} else {
			r.push(`"machine" produces`);
		}
		r.push(`<span class="yellowgreen">${cashFormat(V.cash - tempCash)}</span> income.`);
		App.Events.addParagraph(afterFrag, r);
	}

	if (inflatedSlaves.milk > 0) {
		cashX(forceNeg(Math.trunc((600 * (inflatedSlaves.milk) + 8) + random(50, 200))), "slaveAssignmentDairy");
	}
	if (inflatedSlaves.cum > 0) {
		cashX(forceNeg(Math.trunc((300 * (inflatedSlaves.cum + 8)) + random(25, 100))), "slaveAssignmentDairy");
	}

	const profits = V.cash - oldCash;
	r = [];

	if (chemSevere > 1) {
		r.push(`${chemSevere} cows' productivity is being reduced by the long term effects of industrial use.`);
	} else if (chemSevere > 0) {
		r.push(`One cow's productivity is being reduced by the long term effects of industrial use.`);
	}

	if (chemMinor.length > 1) {
		r.push(`${chemMinor.length} cows have been drugged and used long enough that they require increased curative doses, slightly reducing their output.`);
	} else if (chemMinor.length > 0) {
		const {he, his} = getPronouns(chemMinor[0]);
		r.push(`One cow has been drugged and used long enough that ${he} requires increased curative doses, slightly reducing ${his} output.`);
	}

	if (desterilized.length > 1) {
		r.push(`${desterilized.length} cows had minor health issues preventing their fertile womb from conceiving; the issues have been resolved and they have been impregnated.`);
	} else if (desterilized.length > 0) {
		const {he, his} = getPronouns(desterilized[0]);
		r.push(`One cow had minor health issues preventing ${his} fertile womb from conceiving; they have been resolved and ${he} has been impregnated.`);
	}

	if (hateFilled.length > 1) {
		r.push(`${hateFilled.length} cows stopped struggling so much when fucked by the machines; it seems they have sunk into a fugue.`);
	} else if (hateFilled.length > 0) {
		const {he} = getPronouns(hateFilled[0]);
		r.push(`One cow stopped struggling so much when fucked by the machines; it seems ${he} has sunk into a fugue.`);
	}

	if (horrified.length > 1) {
		r.push(`${horrified.length} cows' emotional activity dropped significantly; this indicates acceptance that they are not likely to leave ${V.dairyName}, ever again.`);
	} else if (horrified.length > 0) {
		const {he} = getPronouns(horrified[0]);
		r.push(`One cow's emotional activity dropped significantly; this indicates acceptance that ${he} is not likely to leave ${V.dairyName}, ever again.`);
	}

	if (skillsLost.length > 1) {
		r.push(`${skillsLost.length} cows forgot skills due to their inability to focus on anything but machine rape.`);
	} else if (skillsLost.length > 0) {
		const {his} = getPronouns(skillsLost[0]);
		r.push(`One cow forgot skills due to ${his} inability to focus on anything but machine rape.`);
	}

	if (careerForgotten.length > 1) {
		r.push(`${careerForgotten.length} cows forgot the details of their past professional lives; all they can remember now is this.`);
	} else if (careerForgotten.length > 0) {
		const {he, his} = getPronouns(careerForgotten[0]);
		r.push(`One cow forgot the details of ${his} past professional life; all ${he} can remember now is this.`);
	}

	if (vaginasStretched > 1) {
		r.push(`${vaginasStretched} cows' vaginas were broken in for machine use, and are unlikely to be any use for anything other than receiving cum and medication, and giving birth.`);
	} else if (vaginasStretched > 0) {
		r.push(`One cow's vagina was broken in for machine use, and is unlikely to be any use for anything other than receiving cum and medication, and giving birth.`);
	}

	if (anusesStretched > 1) {
		r.push(`${anusesStretched} cows' anuses were loosened by machine sodomy, and are now permanently gaped.`);
	} else if (anusesStretched > 0) {
		r.push(`One cow's anus was loosened by machine sodomy, and is now permanently gaped.`);
	}

	if (intelligenceLost > 1) {
		r.push(`${intelligenceLost} cows suffered some loss of intelligence due to accumulated mental stress from life attached to a milking machine.`);
	} else if (intelligenceLost > 0) {
		r.push(`One cow suffered some loss of intelligence due to accumulated mental stress from life attached to a milking machine.`);
	}

	if (stupidified.length > 1) {
		r.push(`${stupidified.length} cows were so mentally dulled by use as biological factories that they were reduced to a very low level of intelligence.`);
	} else if (stupidified.length > 0) {
		const {he} = getPronouns(stupidified[0]);
		r.push(`One cow was so mentally dulled by use as biological factories that ${he} was reduced to a very low level of intelligence.`);
	}

	if (mindbroken > 1) {
		r.push(`${mindbroken} cows finally lost higher mental function, and are now nothing more than industrial equipment made of meat.`);
	} else if (mindbroken > 0) {
		r.push(`One cow finally lost higher mental function, and is now nothing more than industrial equipment made of meat.`);
	}

	if (boobtacular > 1) {
		r.push(`${boobtacular} cows grew past 30 kilograms of breasts, a remarkable advance in capacity.`);
	} else if (boobtacular > 0) {
		r.push(`One cow grew past 30 kilograms of breasts, a remarkable advance in capacity.`);
	}

	if (balltacular.length > 1) {
		r.push(`${balltacular.length} cows' testicles reached the largest size drug treatments can produce; the machines will now focus on buttfucking them with extra force.`);
	} else if (balltacular.length > 0) {
		const {him} = getPronouns(balltacular[0]);
		r.push(`One cow's testicles reached the largest size drug treatments can produce; the machines will now focus on buttfucking ${him} with extra force.`);
	}

	if (V.dairyPregUpgrade === 1) {
		if (V.dairyPregSetting >= 2) {
			r.push(`Fertile cows make you a significant profit through contract pregnancies.`);
		} else if (V.dairyPregSetting === 1) {
			r.push(`Fertile cows make you a small profit through contract pregnancies.`);
		}
	}
	cumWeek = Math.trunc(cumWeek / 10);
	V.cumPipeline = cumWeek;
	V.milkPipeline = milkWeek;
	if (inflatedSlaves.milk > 0) {
		outputMilk = ((8 * inflatedSlaves.milk * 10) + 8);
	} else {
		outputMilk = 0;
	}
	if (inflatedSlaves.cum > 0) {
		outputCum = (((80 * inflatedSlaves.cum * 10) + 80) / 10);
	} else {
		outputCum = 0;
	}
	r.push(`${dairyNameCaps} produced ${commaNum(milkWeek + outputMilk)} liters of milk`);
	if (cumWeek > 0) {
		r.push(`and ${commaNum(cumWeek + outputCum)} liters of cum`);
	}
	r.push(`this week.`);
	if (inflatedSlaves.milk > 0) {
		r.push(`${commaNum(outputMilk)} liters of milk were pumped into your penthouse for filling slaves this week.`);
	}
	if (inflatedSlaves.cum > 0) {
		if (inflatedSlaves.milk > 0) {
			r.push(`and`);
		}
		r.push(`${commaNum(outputCum)} liters of cum were pumped into your penthouse`);
		if (inflatedSlaves.milk > 0) {
			r.push(`as well.`);
		} else {
			r.push(`this week.`);
		}
	}
	if (femCumWeek > 0) {
		r.push(`The machines also managed to reclaim ${commaNum(femCumWeek)} liters of salable vaginal secretions.`);
	}

	if (FutureSocieties.isActive('FSRestart') && V.eugenicsFullControl !== 1) {
		if (V.dairyPregSetting > 0) {
			r.push(`The Societal Elite know what you are doing with your cows. <span class="red">They do not approve.</span>`);
			V.failedElite += 5;
		}
		if (V.milkmaidImpregnates === 1) {
			r.push(`The Societal Elite know you've ordered ${S.Milkmaid.slaveName} to impregnate your cows. <span class="red">They are not amused by your disinterest in eugenics.</span>`);
			V.failedElite += 10;
		}
	}

	// Record statistics gathering
	let b = State.variables.facility.dairy;
	b.whoreIncome = 0;
	b.whoreCosts = 0;
	b.rep = 0;
	for (let si of b.income.values()) {
		b.whoreIncome += si.income;
		b.whoreCosts += si.cost;
		b.rep += si.rep;
	}
	b.maintenance = (V.bioreactorsXY + V.bioreactorsXX + V.bioreactorsHerm + V.bioreactorsBarren);
	if (b.maintenance > 0) {
		b.maintenance *= 100;
	} else {
		b.maintenance = 0;
	}
	b.maintenance += V.dairy * V.facilityCost * (1.0 + 0.2 * V.dairyFeedersUpgrade + 0.1 * V.dairyPregUpgrade);
	b.totalIncome = b.whoreIncome;
	b.totalExpenses = b.whoreCosts + b.maintenance;
	b.profit = b.totalIncome - b.totalExpenses;
	if (profits > 0) {
		r.push(`The sale of these products makes a profit of <span class="yellowgreen">${cashFormat(profits)}.</span>`);
	} else if (profits < 0) {
		r.push(`Due to`);
		if (V.dairyImplantsSetting !== 3) {
			r.push(`one-off costs of hormonal implants to encourage fluid production,`);
		} else {
			r.push(`the need to induce lactation in some cows,`);
		}
		r.push(`your dairy made a loss of <span class="red">${cashFormat(profits)}.</span>`);
	} else {
		r.push(`Due to`);
		if (V.dairyImplantsSetting !== 3) {
			r.push(`one-off costs of hormonal implants to encourage fluid production`);
		} else {
			r.push(`the need to induce lactation in some cows`);
		}
		r.push(`paired with existing output, your dairy broke even this week.`);
	}

	if (V.arcologies[0].FSPastoralistLaw === 1) {
		r.push(`Slave products have completely replaced traditional dairy, making the facility extremely lucrative.`);
	}
	App.Events.addParagraph(afterFrag, r);

	if (V.dairySlimMaintainUpgrade === 1 && V.dairySlimMaintain === 1) {
		r = [];
		if (V.arcologies[0].FSSlimnessEnthusiast > 80) {
			r.push(`Because of your arcology's great enthusiasm for small breasted slaves, the dairy's milking systems have been carefully overhauled and optimized for maximum milk extraction from slaves with smaller endowments — providing a significant boost to their otherwise modest output. This also prevents unfashionable breast expansion of already slim slaves through the milking process.`);
		} else if (V.arcologies[0].FSSlimnessEnthusiast > 20) {
			r.push(`In keeping with your arcology's ideals, ${V.dairyName} has been modified to handle slim slaves with minimal impact to their body shapes. This limits potential profitability, but prevents unfashionable breast expansion of already slim slaves through the milking process.`);
		} else {
			r.push(`Due to your arcology's lack of enthusiasm for small breasted slaves the dairy has discontinued using milking techniques that prevent breast growth through the milking process.`);
			V.dairySlimMaintain = 0;
			V.dairySlimMaintainUpgrade = 0;
		}
		App.Events.addParagraph(afterFrag, r);
	}

	if (V.createBioreactors === 1 && V.bioreactorPerfectedID !== 0) {
		const bioreactor = getSlave(V.bioreactorPerfectedID);
		if (bioreactor) {
			let gender;
			if (bioreactor.ovaries === 1) {
				if (bioreactor.balls === 0) {
					V.bioreactorsXX++;
					gender = "XX";
				} else {
					V.bioreactorsHerm++;
					gender = "herm";
				}
			} else {
				if (bioreactor.balls === 0) {
					V.bioreactorsBarren++;
					gender = "barren";
				} else {
					V.bioreactorsXY++;
					gender = "XY";
				}
			}
			const {he, He} = getPronouns(bioreactor);
			const ageInWeeks = 52 * (V.retirementAge - bioreactor.physicalAge);
			r = [];
			r.push(`${SlaveFullName(bioreactor)}'s breasts,`);
			if (bioreactor.balls > 0) {
				r.push(`balls,`);
			}
			if (bioreactor.ovaries === 1) {
				r.push(`belly,`);
			}
			r.push(`body, and mind have been completely adapted to synthesize useful products. ${He} has been reclassified as part of the machine ${he}'s now permanently attached to. This combination is projected to produce approximately`);
			if (bioreactor.balls > 0) {
				r.push(commaNum(1000 * Math.trunc(BF[gender].cum * ageInWeeks) / 1000));
				r.push(`liters of cum,`);
			}
			if (bioreactor.ovaries === 1) {
				r.push(commaNum(100 * Math.trunc(BF[gender].femCum * ageInWeeks) / 100));
				r.push(`liters of vaginal secretions,`);
				if (V.dairyPregSetting === 3) {
					r.push((13 * (V.retirementAge - bioreactor.physicalAge)).toString());
				} else {
					r.push((5 * (V.retirementAge - bioreactor.physicalAge)).toString());
				}
				r.push(`slaves,`);
			}
			r.push(`and`);
			r.push(commaNum(1000 * Math.trunc(BF[gender].milk * ageInWeeks) / 1000));
			r.push(`liters of milk over a ${V.retirementAge - bioreactor.physicalAge} year period before its biological components must be replaced.`);
			App.Events.addParagraph(afterFrag, r);
			if (isShelterSlave(bioreactor)) {
				V.shelterAbuse++;
			}
			removeSlave(bioreactor);
		}
	}

	if (V.dairyDecoration !== "standard") {
		r = [];
		r.push(`${dairyNameCaps}'s`);
		r.push(App.UI.DOM.makeElement("span", `${V.dairyDecoration} style is well known.`, "green"));
		App.Events.addParagraph(afterFrag, r);
	}

	if (DL > 0) {
		// Dairy stats
		afterFrag.append(App.Facilities.Dairy.Stats(false));
		dairyStats.append(App.Facilities.Dairy.Stats(true));
	}
	return {
		before: beforeFrag,
		slaves: slaveReports,
		after: afterFrag,
	};
};
