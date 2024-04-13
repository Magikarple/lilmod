/**
 * @returns {FC.EndWeek.FacilityReport}
 */
App.EndWeek.brothelReport = function() {
	const beforeFrag = document.createElement("p");

	const brothelStats = document.createElement("span");
	beforeFrag.append(brothelStats);

	const madam = S.Madam ? App.SlaveAssignment.reportSlave(S.Madam) : undefined;
	const slaves = App.Utils.sortedEmployees(App.Entity.facilities.brothel);
	const SL = slaves.length;
	let profits = 0;

	// Statistics gathering
	V.facility = V.facility || {};
	V.facility.brothel = initFacilityStatistics(V.facility.brothel);
	const brothelNameCaps = capFirstChar(V.brothelName);

	function madamText() {
		let FLsFetish = 0;
		let r = [];
		if (V.MadamID !== 0) {
			if (S.Madam.health.condition < -80) {
				improveCondition(S.Madam, 20);
			} else if (S.Madam.health.condition < -40) {
				improveCondition(S.Madam, 15);
			} else if (S.Madam.health.condition < 0) {
				improveCondition(S.Madam, 10);
			} else if (S.Madam.health.condition < 90) {
				improveCondition(S.Madam, 7);
			}
			if (S.Madam.devotion <= 45) {
				S.Madam.devotion += 5;
			}
			if (S.Madam.trust < 45) {
				S.Madam.trust += 5;
			}
			if (S.Madam.rules.living !== "luxurious") {
				S.Madam.rules.living = "luxurious";
			}
			if (S.Madam.rules.rest !== "restrictive") {
				S.Madam.rules.rest = "restrictive";
			}
			if (S.Madam.fetishStrength <= 95) {
				if (S.Madam.fetish !== Fetish.DOM) {
					if (fetishChangeChance(S.Madam) > random(0, 100)) {
						FLsFetish = 1;
						S.Madam.fetishKnown = 1;
						S.Madam.fetish = Fetish.DOM;
						S.Madam.fetishStrength = 10;
					}
				} else if (S.Madam.fetishKnown === 0) {
					FLsFetish = 1;
					S.Madam.fetishKnown = 1;
				} else {
					FLsFetish = 2;
					S.Madam.fetishStrength += 4;
				}
			}
			/* Make sure we have registered living expenses as for any other slave */
			getSlaveStatisticData(S.Madam, V.facility.brothel);
			const {
				he, him, his, himself, He, His, wife
			} = getPronouns(S.Madam);

			r = [];
			const popup = App.UI.DOM.referenceSlaveWithPreview(S.Madam, SlaveFullName(S.Madam));

			popup.classList.add("slave-name", "bold");
			r.push(popup, `is serving as the madam.`);

			if (S.Madam.relationship === -3 && S.Madam.devotion > 50) {
				r.push(`As your loving ${wife}, ${he} does ${his} best to attract attention to your brothel.`);
			}
			if (FLsFetish === 1) {
				r.push(`${He} isn't above sampling the merchandise ${himself}; before long it's obvious to ${his} girls that ${he}`);
				r.push(App.UI.DOM.makeElement("span", `really likes fucking them.`, "fetish-gain"));
			} else if (FLsFetish === 2) {
				r.push(`${He}'s careful that all of the whores under ${his} supervision are all warmed up and ready to get fucked every morning, and ${he}`);
				r.push(App.UI.DOM.makeElement("span", `really likes fucking them.`, ["fetish", "inc"]));
			}
			const improve = App.UI.DOM.makeElement("span", "improve", ["cash", "inc"]);
			if (S.Madam.skill.whoring <= 10) {
				r.push(`Though ${S.Madam.slaveName} does ${his} best to manage the brothel, with ${his} lack of skill ${he} can do little.`);
			} else if (S.Madam.skill.whoring <= 30) {
				r.push(`${S.Madam.slaveName}'s basic skills marginally`, improve, `business at ${V.brothelName}.`);
			} else if (S.Madam.skill.whoring <= 60) {
				r.push(`${S.Madam.slaveName}'s skills`, improve, `business at ${V.brothelName}.`);
			} else if (S.Madam.skill.whoring < 100) {
				r.push(`${S.Madam.slaveName}'s skills greatly`, improve, `business at ${V.brothelName}.`);
			} else {
				r.push(`${S.Madam.slaveName}'s mastery immensely`, improve, `business at ${V.brothelName}.`);
			}
			if (S.Madam.actualAge > 35) {
				r.push(`${His} age and experience also contribute.`);
			}
			if (App.Data.Careers.Leader.madam.includes(S.Madam.career)) {
				r.push(`${He} has experience from ${his} life before ${he} was a slave that helps ${him} in the seedy business of selling other people's bodies for sex.`);
			} else if (S.Madam.skill.madam >= Constant.MASTERED_XP) {
				r.push(`${He} has experience from working for you that helps ${him} in the seedy business of selling other people's bodies for sex.`);
			} else if (S.Madam.skill.madam > 120) {
				r.push(`${He} understands how to handle whores while keeping customers happy.`);
			} else if (S.Madam.skill.madam > 60) {
				r.push(`${He} understands how to read the customer and please them effectively.`);
			} else if (S.Madam.skill.madam > 20) {
				r.push(`${He} has basic knowledge of how to run a whorehouse.`);
			}
			if (S.Madam.skill.madam < Constant.MASTERED_XP) {
				const skillIncrease = jsRandom(1, Math.ceil((S.Madam.intelligence + S.Madam.intelligenceImplant) / 15) + 8);
				r.push(slaveSkillIncrease('madam', S.Madam, skillIncrease));
			}
			if (S.Madam.intelligence + S.Madam.intelligenceImplant > 15) {
				r.push(`${He} is a clever manager.`);
			}
			if (S.Madam.dick > 2 && canPenetrate(S.Madam)) {
				if (S.Madam.skill.penetrative > 90) {
					r.push(`${His} skilled dick incentivizes the bitches to behave.`);
				} else if (S.Madam.skill.penetrative > 10) {
					r.push(`${His} turgid dick helps ${him} manage the bitches.`);
				} else {
					r.push(`${He} tries to use ${his} turgid cock to keep the bitches in line, but ${his} lack of skill only leaves them off kilter.`);
				}
				slaveSkillIncrease('penetrative', S.Madam, 2);
			}
			App.Events.addParagraph(beforeFrag, r);

			r = [];
			for (const slave of slaves) {
				const {
					he2, him2, his2
				} = getPronouns(slave).appendSuffix('2');

				if (S.Madam.rivalryTarget === slave.ID) {
					r.push(`${He} forces ${his} ${rivalryTerm(S.Madam)}, ${slave.slaveName}, to service all the men in the brothel.`);
					slave.devotion -= 2;
					slave.trust -= 2;
					if (canDoVaginal(slave)) {
						seX(slave, "vaginal", "public", "penetrative", 10);
					}
					if (canDoAnal(slave)) {
						seX(slave, "anal", "public", "penetrative", 12);
					}
					seX(slave, "anal", "public", "penetrative", 10);
					if (random(1, 100) > 65) {
						S.Madam.rivalry++;
						slave.rivalry++;
					}
				} else if (S.Madam.relationshipTarget === slave.ID) {
					r.push(`${He} dotes over ${his} ${relationshipTerm(S.Madam)}, ${slave.slaveName}, making sure ${he2} is safe, but unfortunately driving potential customers away from ${him2}.`);
					slave.devotion++;
				} else if (areRelated(S.Madam, slave)) {
					r.push(`${He} pays special attention to ${his} ${relativeTerm(S.Madam, slave)}, ${slave.slaveName}, making sure ${he2} is treated well and showing off ${his2} skills.`);
					slave.trust++;
				}
				if (slave.prestigeDesc === "$He is a famed Free Cities whore, and commands top prices.") {
					r.push(`${He} makes sure to promote ${slave.slaveName}, the famed whore, in order to capitalize on ${his2} popularity.`);
				} else if (slave.prestigeDesc === "$He is a famed Free Cities slut, and can please anyone.") {
					r.push(`${He} makes sure to promote ${slave.slaveName}, the famed entertainer, in order to capitalize on ${his2} popularity.`);
				} else if (slave.prestigeDesc === "$He is remembered for winning best in show as a dairy cow.") {
					if (FutureSocieties.isActive('FSPhysicalIdealist')) {
						if (slave.muscles > 60 && slave.weight < 30 && slave.lactation > 0 && (slave.boobs - slave.boobsImplant) > 6000) {
							r.push(`${He} shows off how even a cow like ${slave.slaveName} can achieve physical perfection.`);
						} else {
							if (slave.muscles < 30) {
								r.push(`An unmuscled,`);
							} else {
								r.push(`A`);
							}
							if (slave.weight > 30) {
								r.push(`fat,`);
							}
							r.push(`'prestigious'`);
							if (slave.lactation > 0) {
								r.push(`cow`);
							} else if ((slave.boobs - slave.boobsImplant) > 6000) {
								r.push(`mass of titflesh`);
							} else {
								r.push(`slave`);
							}
							r.push(`like ${slave.slaveName} is woefully out of fashion, so ${S.Madam.slaveName} tries to draw attention away from ${him2}.`);
						}
					} else {
						if (slave.lactation > 0 && (slave.boobs - slave.boobsImplant) > 6000) {
							r.push(`${He} makes sure to massage ${slave.slaveName}'s huge breasts to get the milk flowing before enticing clients to suckle and play with ${him2}.`);
						} else {
							r.push(`${He} would like to show off ${slave.slaveName}'s huge udders, but ${slave.slaveName}`);
							if (slave.lactation === 0) {
								r.push(`isn't producing milk anymore.`);
							} else {
								r.push(`doesn't exactly have huge udders anymore.`);
							}
						}
					}
				} else if (slave.prestigeDesc === "$He is remembered for winning best in show as a cockmilker.") {
					if (FutureSocieties.isActive('FSGenderFundamentalist')) {
						/* this needs review - doesn't fit right. An XY slave would be expected to be masculine. */
						if (slave.balls === 0 && slave.dick === 0 && slave.vagina > -1) {
							r.push(`${He} uses ${slave.slaveName} as an example of how even a huge-balled freak like ${him2} can be restored to proper femininity.`);
						} else {
							r.push(`${He} tries to hide ${slave.slaveName}, 'her' body being notorious for its defiance of conventional femininity.`);
						}
					} else {
						if (((slave.balls > 5) && (slave.dick !== 0)) || ((slave.balls > 4) && (slave.dick !== 0) && (slave.prostate > 1))) {
							r.push(`${He} shows off ${slave.slaveName}'s copious loads by putting a condom over ${his2} dick and teasing ${him2} till ${he2} bursts it. The show draws multiple clients that want to play with ${his2} oversized junk and messy orgasms.`);
						} else {
							r.push(`${He} would love to show off ${slave.slaveName}'s copious loads, but`);
							if (slave.dick === 0) {
								r.push(`${slave.slaveName} doesn't have a dick.`);
							} else if (slave.balls === 0) {
								r.push(`${slave.slaveName}'s not producing cum.`);
							} else {
								r.push(`${slave.slaveName}'s orgasms just aren't messy enough.`);
							}
						}
					}
				} else if (slave.prestigeDesc === "$He is remembered for winning best in show as a breeder.") {
					if (slave.bellyPreg >= 5000) {
						r.push(`${He} makes sure ${slave.slaveName}'s growing pregnancy is well taken care of, even if it means driving away potential customers away when the mother-to-be needs a rest.`);
					} else if (canGetPregnant(slave)) {
						r.push(`${He} makes sure to play off ${slave.slaveName}'s fame and fertility by enticing potential customers to be the one to claim ${his2} womb by filling it with their child.`);
					} else {
						r.push(`${He} would love to play off of ${slave.slaveName}'s fame and fertility, but unfortunately ${he2}`);
						if (slave.pregKnown === 1 && slave.bellyPreg < 1500) {
							r.push(`is already pregnant and not far enough along to show it.`);
						} else if (slave.pregKnown === 1 && slave.bellyPreg < 5000) {
							r.push(`already pregnant, but not enough to be exciting.`);
						} else {
							r.push(`is unable to get knocked up.`);
						}
					}
				}
			}
			App.Events.addNode(beforeFrag, r);

			if ((SL + V.brothelSlavesGettingHelp < 10 * App.SlaveAssignment.PartTime.efficiencyModifier(madam)) &&
				V.MadamNoSex !== 1 && !slaveResting(madam)) {
				const oldCash = V.cash;
				if ((V.favSeparateReport === 1 && V.favorites.includes(madam.ID)) || V.showEWD !== 0) {
					App.Events.addParagraph(
						beforeFrag,
						[
							He,
							App.SlaveAssignment.whore(madam)
						]
					);
				} else {
					App.SlaveAssignment.whore(madam);
				}
				App.Events.addParagraph(
					beforeFrag,
					[
						`${He} whores ${himself} because ${he} doesn't have enough whores to manage to keep ${him} busy, and makes`,
						App.UI.DOM.makeElement("span", `${cashFormat(S.Madam.lastWeeksCashIncome)}.`, ["cash", "inc"]),
						`${He} can charge more for ${his} time, since many citizens find it erotic to fuck the Madam.`
					]
				);
				profits += V.cash - oldCash;
			}
		}
	}

	madamText();

	if (SL > 0) {
		const whoreNumber = document.createElement("p");
		whoreNumber.classList.add("indent", "bold");

		if (SL === 1) {
			whoreNumber.append(`There is one slave whore working out of ${V.brothelName}.`);
		} else {
			whoreNumber.append(`There are ${SL} slave whores working out of ${V.brothelName}.`);
		}
		beforeFrag.append(whoreNumber);
	}

	/** @type {Array<FC.EndWeek.SlaveReport>} */
	const slaveReports = [];

	if (madam) {
		tired(madam);
		if ((V.favSeparateReport === 1 && V.favorites.includes(madam.ID)) || V.showEWD) {
			const madamEntry = App.UI.DOM.makeElement("div", '', ["slave-report"]);
			const artSpan = App.UI.DOM.appendNewElement("span", madamEntry);
			madamEntry.append(App.SlaveAssignment.saSlaveIntro(madam, `is serving as the Madam.`));
			madamEntry.append(App.SlaveAssignment.standardSlaveReport(madam, false));
			App.SlaveAssignment.appendSlaveArt(artSpan, madam);
			slaveReports.push({
				id: madam.ID,
				report: madamEntry,
			});
		} else {
			App.SlaveAssignment.standardSlaveReport(madam, true);
		}
	}

	const afterFrag = new DocumentFragment();

	if (SL > 0) {
		let healthBonus = 0;
		let aphrodisiacs = 0;
		if (V.brothelUpgradeDrugs === 1) {
			healthBonus += 1;
			aphrodisiacs = 1;
		} else if (V.brothelUpgradeDrugs === 2) {
			healthBonus += 3;
			aphrodisiacs = 2;
		}
		let oldCash = V.cash;
		for (const slave of App.SlaveAssignment.reportSlaves(slaves)) {
			/* Perform facility based rule changes */
			improveCondition(slave, healthBonus);
			slave.aphrodisiacs = aphrodisiacs;
			switch (V.brothelDecoration) {
				case "Degradationist":
				case "standard":
					slave.rules.living = "spare";
					break;
				default:
					slave.rules.living = "normal";
			}
			if (slave.health.condition < -80) {
				improveCondition(slave, 20);
			} else if (slave.health.condition < -40) {
				improveCondition(slave, 15);
			} else if (slave.health.condition < 0) {
				improveCondition(slave, 10);
			} else if (slave.health.condition < 90) {
				improveCondition(slave, 7);
			}
			if (slave.devotion <= 20 && slave.trust >= -20) {
				slave.devotion -= 5;
				slave.trust -= 5;
			} else if (slave.devotion < 45) {
				slave.devotion += 4;
			} else if (slave.devotion > 50) {
				slave.devotion -= 4;
			}
			if (slave.trust < 30) {
				slave.trust += 5;
			}
			if (slave.energy.isBetween(40, 95)) {
				slave.energy++;
			}

			if (V.showEWD || (V.favSeparateReport === 1 && V.favorites.includes(slave.ID))) {
				const {He} = getPronouns(slave);
				const slaveEntry = App.UI.DOM.makeElement("div", null, ["slave-report"]);
				const artSpan = App.UI.DOM.appendNewElement("span", slaveEntry);
				slaveEntry.append(App.SlaveAssignment.saSlaveIntro(slave, `is working out of ${V.brothelName}.`));

				App.Events.addNode(
					slaveEntry,
					[
						He,
						App.SlaveAssignment.whore(slave),
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
				App.SlaveAssignment.whore(slave);
				App.SlaveAssignment.standardSlaveReport(slave, true);
			}

			const seed = Math.max(App.Ads.getMatchedCategoryCount(slave, "brothel"), 1);
			const adsIncome = seed * random(50, 60) * Math.trunc(V.brothelAdsSpending / 1000);
			getSlaveStatisticData(slave, V.facility.brothel).adsIncome += adsIncome;
			cashX(adsIncome, "brothelAds");
		}

		App.Events.addNode(afterFrag, [App.Ads.report("brothel", false)]);

		profits += V.cash - oldCash;

		// Record statistics gathering
		const b = V.facility.brothel;
		b.whoreIncome = 0;
		b.customers = 0;
		b.whoreCosts = 0;
		b.rep = 0;
		const oldAdIncome = b.adsIncome;
		for (const si of b.income.values()) {
			b.whoreIncome += si.income + si.adsIncome;
			b.adsIncome += si.adsIncome;
			b.customers += si.customers;
			b.whoreCosts += si.cost;
			b.rep += si.rep;
		}
		b.adsCosts = V.brothelAdsSpending;
		b.maintenance = V.brothel * V.facilityCost * (1.0 + 0.2 * V.brothelUpgradeDrugs);
		b.totalIncome = b.whoreIncome + oldAdIncome;
		b.totalExpenses = b.whoreCosts + b.adsCosts + b.maintenance;
		b.profit = b.totalIncome - b.totalExpenses;

		App.Events.addNode(
			afterFrag,
			[
				`${brothelNameCaps} makes you`,
				App.UI.DOM.makeElement("span", cashFormat(profits), ["cash", "inc"]),
				`this week.`
			]
		);

		if (V.brothelDecoration !== "standard") {
			App.Events.addParagraph(
				afterFrag,
				[
					`${brothelNameCaps}'s customers enjoyed`,
					App.UI.DOM.makeElement("span", `fucking whores in ${V.brothelDecoration} surroundings.`,
						["reputation", "inc"])
				]
			);
		}

		// Brothel stats
		afterFrag.append(App.Facilities.Brothel.Stats(false));
		brothelStats.append(App.Facilities.Brothel.Stats(true));
	}
	return {
		before: beforeFrag,
		slaves: slaveReports,
		after: afterFrag,
	};
};
