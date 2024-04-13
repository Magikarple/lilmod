/**
 * @returns {FC.EndWeek.FacilityReport}
 */
App.EndWeek.clubReport = function() {
	const beforeFrag = new DocumentFragment();
	let r;

	const dj = S.DJ ? App.SlaveAssignment.reportSlave(S.DJ) : undefined;
	const slaves = App.Utils.sortedEmployees(App.Entity.facilities.club);

	// Statistics gathering; income is rep boosts in numbers, and profit will be rep per cash unit, or cash unit per rep
	V.facility = V.facility || {};
	V.facility.club = initFacilityStatistics(V.facility.club);
	const clubStats = document.createElement("div");
	beforeFrag.append(clubStats);

	if (S.DJ) {
		let FLsFetish = 0;
		r = [];
		if (S.DJ.health.condition < -80) {
			improveCondition(S.DJ, 20);
		} else if (S.DJ.health.condition < -40) {
			improveCondition(S.DJ, 15);
		} else if (S.DJ.health.condition < 0) {
			improveCondition(S.DJ, 10);
		} else if (S.DJ.health.condition < 90) {
			improveCondition(S.DJ, 7);
		}
		if (S.DJ.devotion <= 60) {
			S.DJ.devotion += 5;
		}
		if (S.DJ.trust < 60) {
			S.DJ.trust += 3;
		}
		if (S.DJ.fetishStrength <= 95) {
			if (S.DJ.fetish !== Fetish.HUMILIATION) {
				if (fetishChangeChance(S.DJ) > random(0, 100)) {
					FLsFetish = 1;
					S.DJ.fetishKnown = 1;
					S.DJ.fetish = Fetish.HUMILIATION;
					S.DJ.fetishStrength = 10;
				}
			} else if (S.DJ.fetishKnown === 0) {
				FLsFetish = 1;
				S.DJ.fetishKnown = 1;
			} else {
				FLsFetish = 2;
				S.DJ.fetishStrength += 4;
			}
		}
		if (S.DJ.rules.living !== "luxurious") {
			S.DJ.rules.living = "luxurious";
		}
		if (S.DJ.rules.rest !== "restrictive") {
			S.DJ.rules.rest = "restrictive";
		}
		/* Make sure we have registered living expenses as for any other slave */
		getSlaveStatisticData(S.DJ, V.facility.club);
		const {
			he, him, his, He, His, wife, himself
		} = getPronouns(S.DJ);
		r.push(`${SlaveFullName(S.DJ)} is performing as the DJ.`);
		if (S.DJ.relationship === -3 && S.DJ.devotion > 50) {
			r.push(`${He} tries ${his} best to be your energetic, cheerful ${wife}.`);
		}
		if (FLsFetish === 1) {
			r.push(`${He}'s expected to be the innovative, beautiful DJ spinning beats one minute, and come out of ${his} booth to grind on the floor the next; ${he} enjoys the interplay, and finds greater <span class="lightcoral">pleasure in exhibitionism.</span>`);
		} else if (FLsFetish === 2) {
			r.push(`Every day ${he} gets to enjoy hundreds of stares on ${his} skin, and <span class="lightsalmon">becomes more of an exhibitionist.</span>`);
		}
		if (getBestVision(S.DJ) === 0) {
			r.push(`${His} lack of eyesight doesn't slow ${him} down; rather, it strengthens ${his} other senses. ${His} tracks have a distinct sound, since ${he} experiences noise as ${his} sight.`);
		}
		if (S.DJ.skill.entertainment <= 10) {
			r.push(`Though ${S.DJ.slaveName} does ${his} best to lead on the club, with ${his} lack of skill ${he} can do little.`);
		} else if (S.DJ.skill.entertainment <= 30) {
			r.push(`${S.DJ.slaveName}'s basic skills marginally <span class="green">improve</span> the atmosphere in ${V.clubName}.`);
		} else if (S.DJ.skill.entertainment <= 60) {
			r.push(`${S.DJ.slaveName}'s skills <span class="green">improve</span> the atmosphere in ${V.clubName}.`);
		} else if (S.DJ.skill.entertainment < 100) {
			r.push(`${S.DJ.slaveName}'s skills greatly <span class="green">improve</span> the atmosphere in ${V.clubName}.`);
		} else if (S.DJ.skill.entertainment >= 100) {
			r.push(`${S.DJ.slaveName}'s mastery immensely <span class="green">improves</span> the atmosphere in ${V.clubName}.`);
		}
		if (S.DJ.muscles > 5 && S.DJ.muscles <= 95) {
			r.push(`${His} toned body helps ${him} lead ${his} fellow club sluts by letting ${him} dance all night.`);
		}
		if (S.DJ.intelligence + S.DJ.intelligenceImplant > 15) {
			r.push(`${He}'s smart enough to make an actual contribution to the music, greatly enhancing the entire experience.`);
		}
		if (S.DJ.face > 95) {
			r.push(`${His} great beauty is a further draw, even when ${he}'s in ${his} DJ booth, but especially when ${he} comes out to dance.`);
		}
		if (App.Data.Careers.Leader.DJ.includes(S.DJ.career)) {
			r.push(`${He} has musical experience from ${his} life before ${he} was a slave, a grounding that gives ${his} tracks actual depth.`);
		} else if (S.DJ.skill.DJ >= Constant.MASTERED_XP) {
			r.push(`${He} has musical experience from working for you, giving ${his} tracks actual depth.`);
		} else if (S.DJ.skill.DJ > 120) {
			r.push(`${He} understands what tracks pair well with each other and how to tailor them to ${his} audience.`);
		} else if (S.DJ.skill.DJ > 60) {
			r.push(`${He} knows how to properly manage a playlist, allowing ${him} more time on the dance floor.`);
		} else if (S.DJ.skill.DJ > 20) {
			r.push(`${He} has basic musical knowledge and can keep the party going.`);
		}
		if (S.DJ.skill.DJ < Constant.MASTERED_XP) {
			const skillIncrease = random(1, Math.ceil((S.DJ.intelligence + S.DJ.intelligenceImplant) / 15) + 8);
			r.push(slaveSkillIncrease('DJ', S.DJ, skillIncrease));
		}
		App.Events.addNode(beforeFrag, r, "p", "indent");

		if (slaves.length + V.clubSlavesGettingHelp < 10 * App.SlaveAssignment.PartTime.efficiencyModifier(dj) &&
			V.DJnoSex !== 1 && !slaveResting(S.DJ)) {
			App.Events.addNode(
				beforeFrag,
				[`Since ${he} doesn't have enough sluts in ${V.clubName} to make it worthwhile for ${him} to be on stage 24/7, ${he} spends ${his} extra time slutting it up ${himself}. ${He} has sex with ${S.DJ.sexAmount} citizens, <span class="green">pleasing them immensely,</span> since it's more appealing to fuck the DJ than some club slut.`],
				"div",
				"indent"
			);
			if ((V.favSeparateReport === 1 && V.favorites.includes(dj.ID)) || V.showEWD !== 0) {
				App.Events.addNode(
					beforeFrag,
					[
						He,
						App.SlaveAssignment.serveThePublic(dj)
					],
					"div",
					"indent"
				);
			} else {
				App.SlaveAssignment.serveThePublic(dj);
			}
		}
	}

	if (slaves.length > 0) {
		r = [];
		if (slaves.length !== 1) {
			r.push(App.UI.DOM.makeElement("span", `The ${slaves.length} slaves pleasing citizens in ${V.clubName}`, "bold"));
		} else {
			r.push(App.UI.DOM.makeElement("span", `The one slave pleasing citizens in ${V.clubName}`, "bold"));
		}
		r.push(`worked hard to <span class="green">increase your reputation</span> this week.`);
		App.Events.addNode(beforeFrag, r, "p", "indent");
	}

	/** @type {Array<FC.EndWeek.SlaveReport>} */
	const slaveReports = [];

	if (S.DJ) {
		tired(dj);
		/* apply following SA passages to facility leader */
		if ((V.favSeparateReport === 1 && V.favorites.includes(dj.ID)) || V.showEWD !== 0) {
			const DJEntry = App.UI.DOM.makeElement("div", '', ["slave-report"]);
			const artSpan = App.UI.DOM.appendNewElement("span", DJEntry);
			DJEntry.append(App.SlaveAssignment.saSlaveIntro(dj, `is performing as the DJ in ${V.clubName}.`));
			DJEntry.append(App.SlaveAssignment.standardSlaveReport(dj, false));
			App.SlaveAssignment.appendSlaveArt(artSpan, dj);
			slaveReports.push({
				id: dj.ID,
				report: DJEntry,
			});
		} else {
			App.SlaveAssignment.standardSlaveReport(dj, true);
		}
	}

	const afterFrag = new DocumentFragment();

	if (slaves.length > 0) {
		for (const slave of App.SlaveAssignment.reportSlaves(slaves)) {
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

			if (slave.health.condition < -80) {
				improveCondition(slave, 20);
			} else if (slave.health.condition < -40) {
				improveCondition(slave, 15);
			} else if (slave.health.condition < 0) {
				improveCondition(slave, 10);
			} else if (slave.health.condition < 90) {
				improveCondition(slave, 7);
			}

			if (slave.rules.living !== "normal") {
				slave.rules.living = "normal";
			}

			if (V.showEWD || (V.favSeparateReport === 1 && V.favorites.includes(slave.ID))) {
				const slaveEntry = App.UI.DOM.makeElement("div", null, ["slave-report"]);
				const artSpan = App.UI.DOM.appendNewElement("span", slaveEntry);
				slaveEntry.append(App.SlaveAssignment.saSlaveIntro(slave, `is serving in ${V.clubName}.`));

				const {He} = getPronouns(slave);
				App.Events.addNode(
					slaveEntry,
					[
						He,
						App.SlaveAssignment.serveThePublic(slave),
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
				App.SlaveAssignment.serveThePublic(slave);
				App.SlaveAssignment.standardSlaveReport(slave, true);
			}
		}

		const afterFrag = new DocumentFragment();

		App.Events.addNode(afterFrag, [App.Ads.report("club")], "p", "indent");

		// Record statistics gathering
		const b = V.facility.club;
		b.whoreIncome = 0;
		b.customers = 0;
		b.whoreCosts = 0;
		b.rep = 0;
		for (const si of b.income.values()) {
			b.whoreIncome += si.income;
			b.customers += si.customers;
			b.whoreCosts += si.cost;
			b.rep += si.rep;
		}
		b.adsCosts = V.clubAdsSpending;
		b.maintenance = V.club * V.facilityCost * (1.0 + 0.2 * V.clubUpgradePDAs);
		b.totalIncome = b.whoreIncome + b.adsIncome;
		b.totalExpenses = b.whoreCosts + b.adsCosts + b.maintenance;
		b.profit = b.totalIncome / b.totalExpenses;
		if (V.clubDecoration !== "standard") {
			App.Events.addNode(
				afterFrag,
				[
					`${capFirstChar(V.clubName)}'s customers enjoy <span class="green">having sex in ${V.clubDecoration} surroundings.</span>`
				],
				"p",
				"indent"
			);
		}

		// Club stats
		afterFrag.append(App.Facilities.Club.Stats(false));
		clubStats.append(App.Facilities.Club.Stats(true));
	}
	return {
		before: beforeFrag,
		slaves: slaveReports,
		after: afterFrag,
	};
};
