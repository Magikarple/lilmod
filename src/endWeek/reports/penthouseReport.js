/**
 * @returns {FC.EndWeek.FacilityReport}
 */
App.EndWeek.penthouseReport = function() {
	const beforeFrag = document.createElement("p");

	const penthouseSlaves = V.slaves.filter(s => assignmentVisible(s) || !App.EndWeek.saVars.slaveCheckedIn.includes(s.ID));
	const HGSuiteSlaves = App.Utils.jobForAssignment(Job.HEADGIRLSUITE).employees();
	const hgSlave = HGSuiteSlaves.length > 0 ? App.SlaveAssignment.reportSlave(HGSuiteSlaves[0]) : null;
	const HGTrainSlavesIDs = slavesToTrain();

	// penthouse images are larger and on the right (for some reason), so we need to initialize a second batch renderer instead of using the global SA Report one
	let penthouseArtRenderer = null;
	if (V.seeImages && V.seeReportImages) {
		const penthouseArtSlaveIDs = penthouseSlaves.map(s => s.ID);
		if (hgSlave) {
			penthouseArtSlaveIDs.push(hgSlave.ID);
		}
		penthouseArtRenderer = new App.Art.SlaveArtBatch(penthouseArtSlaveIDs, 2);
		beforeFrag.append(penthouseArtRenderer.writePreamble());
	}

	/**
	 * @type {Array<FC.EndWeek.SlaveReport>}
	 */
	const slaveReports = [];

	for (const slave of App.SlaveAssignment.reportSlaves(penthouseSlaves)) {
		const slaveEntry = App.UI.DOM.makeElement("div", null, ["slave-report"]);
		if (penthouseArtRenderer) {
			App.UI.DOM.drawOneSlaveRight(slaveEntry, slave, penthouseArtRenderer);
		}
		slaveEntry.append(fullReport(slave));

		slaveReports.push({
			id: slave.ID,
			report: slaveEntry,
		});

		if (slave.ID === V.HeadGirlID && hgSlave) {
			/* Output the HG's slave immediately after the hg */
			const {He2} = getPronouns(hgSlave).appendSuffix("2");
			const hgSlaveEntry = App.UI.DOM.makeElement("div", null, ["slave-report"]);
			const r = [];
			if (penthouseArtRenderer) {
				App.UI.DOM.drawOneSlaveRight(hgSlaveEntry, hgSlave, penthouseArtRenderer);
			}
			r.push(App.SlaveAssignment.saSlaveIntro(hgSlave, ''));
			if (hgSlave.choosesOwnAssignment) {
				r.push(He2); // starts new sentence
			}
			r.push(App.SlaveAssignment.liveWithHG(hgSlave));

			App.Events.addNode(hgSlaveEntry, r);

			slaveReports.push({
				id: hgSlave.ID,
				report: hgSlaveEntry,
			});
		}
	}

	/* count open spots in facilities after all assignments have been decided for the week */
	V.brothelSpots = App.Entity.facilities.brothel.freeSpace;
	V.clubSpots = App.Entity.facilities.club.freeSpace;
	V.dairySpots = App.Entity.facilities.dairy.freeSpace;
	V.servantsQuartersSpots = App.Entity.facilities.servantsQuarters.freeSpace;

	return {
		before: beforeFrag,
		slaves: slaveReports,
		after: new DocumentFragment(),
	};

	/**
	 * @param {FC.ReportSlave} slave
	 */
	function fullReport(slave) {
		const el = new DocumentFragment();
		const {
			He, His, his,
			he, him,
		} = getPronouns(slave);
		let r = [];
		let milkResults;

		r.push(App.SlaveAssignment.saSlaveIntro(slave, ''));
		if (slave.choosesOwnAssignment) {
			r.push(He); // starts new sentence
		}

		switch (slave.assignment) {
			case Job.REST:
				r.push(App.SlaveAssignment.rest(slave));
				break;
			case Job.WHORE:
				r.push(App.SlaveAssignment.whore(slave));
				break;
			case Job.PUBLIC:
				r.push(App.SlaveAssignment.serveThePublic(slave));
				break;
			case Job.GLORYHOLE:
				r.push(App.SlaveAssignment.workAGloryHole(slave));
				break;
			case Job.MILKED:
				milkResults = App.SlaveAssignment.getMilked(slave);
				r.push(milkResults.text);
				break;
			case Job.CLASSES:
				r.push(App.SlaveAssignment.takeClasses(slave));
				break;
			case Job.FUCKTOY:
				r.push(App.SlaveAssignment.pleaseYou(slave));
				break;
			case Job.SUBORDINATE:
				r.push(App.SlaveAssignment.serveYourOtherSlaves(slave));
				break;
			case Job.HOUSE:
				r.push(App.SlaveAssignment.servant(slave));
				break;
			case Job.CONFINEMENT:
				r.push(App.SlaveAssignment.stayConfined(slave).text);
				break;
			case Job.BODYGUARD:
				r.push(App.SlaveAssignment.guardYou(slave));
				break;
			case Job.HEADGIRL:
				r.push(App.SlaveAssignment.beYourHeadGirl(slave));
				break;
			case Job.RECRUITER:
				r.push(App.SlaveAssignment.recruitGirls(slave));
				break;
			case Job.CLINIC:
				r.push(`is given preliminary treatment in ${V.clinicName} while ${his} bed is being prepared.`);
				break;
			case Job.CELLBLOCK:
				r.push(`is kept in holding until ${his} cell in ${V.cellblockName} is ready.`);
				break;
			case Job.SCHOOL:
				r.push(`is too late to join the ongoing lesson and will be properly enrolled in ${V.schoolroomName} next week.`);
				break;
			case Job.NURSE:
			case Job.WARDEN:
			case Job.TEACHER:
			case Job.ATTENDANT:
				r.push(`is settling into ${his} role and will properly head ${his} facility next week.`);
				break;
			default:
				removeJob(slave, slave.assignment);
				r.push(App.SlaveAssignment.rest(slave));
		}

		if (V.servantMilkers === 1 && slave.lactation > 0 && slave.assignment !== Job.MILKED) {
			r.push(`${His} assignment`);
			if (App.Data.misc.servantMilkersJobs.includes(slave.assignment)) {
				r.push(`is not strenuous, so ${he}`);
				if (slave.devotion > 20) {
					if (slave.fetish === Fetish.BOOBS) {
						r.push(`eagerly`);
					}
					r.push(`uses`);
				} else if (slave.devotion >= -20) {
					r.push(`is required to use`);
				} else {
					r.push(`is forced to use`);
				}
				r.push(`the penthouse milkers frequently,`);
				milkResults = App.SlaveAssignment.getMilked(slave, 0.5);
			} else {
				r.push(`keeps ${him} busy, but ${he}`);
				if (slave.devotion > 20) {
					if (slave.fetish === Fetish.BOOBS) {
						r.push(`eagerly`);
					}
					r.push(`uses`);
				} else if (slave.devotion >= -20) {
					r.push(`is required to use`);
				} else {
					r.push(`is forced to use`);
				}
				r.push(`the penthouse milkers whenever ${he} can,`);
				milkResults = App.SlaveAssignment.getMilked(slave, 0.25);
			}
			r.push(`and ${he} gives ${milkResults.milk} liters of milk over the week, which is sold for <span class="yellowgreen">${cashFormat(milkResults.milkSale)}.</span>`);
		}
		App.Events.addNode(el, r);

		const partTime = App.SlaveAssignment.PartTime.saPartTime(slave);
		if (V.showEWD !== 0 || (V.favSeparateReport === 1 && V.favorites.includes(slave.ID))) {
			if (partTime.length > 0) {
				App.Events.addNode(el, partTime, "div", "indent");
			}
			r = [];
			if (slave.minorInjury !== 0) {
				r.push(`${His} ${slave.minorInjury} will heal by the end of the week.`);
			}
			r.push(App.SlaveAssignment.choosesOwnClothes(slave));
			r.push(...App.SlaveAssignment.individualSlaveReport(slave));
			App.Events.addNode(el, r, "div", "indent");
		} else {
			// discard return values silently
			App.SlaveAssignment.choosesOwnClothes(slave);
			App.SlaveAssignment.individualSlaveReport(slave);
		}

		el.append(App.PersonalAttention.slaveReport(slave));
		if (HGTrainSlavesIDs.length > 0) {
			const trainee = HGTrainSlavesIDs.find(trainee => slave.ID === trainee.ID);
			if (trainee) {
				el.append(HGApplication(slave, trainee.training));
			}
		}

		App.Events.addNode(el, [App.SlaveAssignment.devotion(slave)], "div", "indent");
		return el;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {string} headGirlsTraining
	 */
	function HGApplication(slave, headGirlsTraining) {
		const el = new DocumentFragment();
		const {
			He, His,
			he, his, him, himself, girl,
		} = getPronouns(S.HeadGirl);
		const {he2, His2, his2, him2, himself2, girl2} = getPronouns(slave).appendSuffix("2");
		let r = [];
		const popup = App.UI.DOM.slaveDescriptionDialog(
			S.HeadGirl,
			SlaveFullName(S.HeadGirl),
			undefined,
			{
				linkClasses: ["slave-name", "bold"]
			}
		);

		slave.training = Math.clamp(slave.training, 0, 150);
		let effectiveness = S.HeadGirl.actualAge + ((S.HeadGirl.intelligence + S.HeadGirl.intelligenceImplant) / 3) - (S.HeadGirl.accent * 5) + (V.HGSeverity * 10) + ((slave.intelligence + slave.intelligenceImplant) / 4) - (slave.accent * 5);
		if (V.AgePenalty === 0) {
			effectiveness += Math.max(0, (30 - S.HeadGirl.actualAge));
		}
		if (S.HeadGirl.sexualFlaw === SexualFlaw.ABUSIVE && V.HGSeverity >= 0) {
			effectiveness += 10;
		}
		if (headGirlsTraining !== "health") {
			slave.health.tired += 25;
		}

		r.push(`<span style="font-weight: bold">Your Head Girl</span>`, popup, ` notices that <span class='slave-name'>${slave.slaveName}</span>`);
		switch (headGirlsTraining) {
			case "health":
				r.push(`is unwell.`);
				break;
			case "obedience":
				r.push(`is disobedient.`);
				break;
			case "paraphilia":
				r.push(`has a paraphilia.`);
				break;
			case "flaw":
				r.push(`has an unpleasant flaw worth fixing.`);
				break;
			case "soften":
				r.push(`has an unpleasant flaw that ${he} can try to soften into a unique quirk.`);
				break;
			case "oral skill":
				r.push(`isn't as orally skilled as ${he} is.`);
				break;
			case "anal skill":
				r.push(`isn't as skilled at taking anal as ${he} is.`);
				break;
			case "fuck skill":
				r.push(`isn't as skilled at vaginal intercourse as ${he} is.`);
				break;
			case "penetrative skill":
				r.push(`isn't as skilled at penetration as ${he} is.`);
				break;
			case "whore skill":
				r.push(`isn't as skilled at the fine art of sex for money as ${he} is.`);
				break;
			case "entertain skill":
				r.push(`isn't as skilled at entertainment as ${he} is.`);
		}

		if (headGirlsTraining === "health") {
			r.push(`${He} helps ${slave.slaveName} however ${he} can. The tender care has <span class="health inc">improved ${slave.slaveName}'s health.</span>`);
			improveCondition(slave, 10);
			slave.health.tired = Math.clamp(slave.health.tired - 10, 0, 1000);
			slave.training = 0;
		} else {
			if (S.HeadGirl.career === "an arcology owner") {
				r.push(`${He} was once an arcology owner ${himself}, making ${him} truly peerless as a Head Girl.`);
				effectiveness += 50;
			} else if (App.Data.Careers.Leader.HG.includes(S.HeadGirl.career)) {
				r.push(`${He} was used to giving commands and being obeyed in ${his} life before ${he} was a slave, experience ${he} can call on now.`);
				effectiveness += 5;
			} else if (S.HeadGirl.skill.headGirl >= Constant.MASTERED_XP) {
				r.push(`${He} is used to giving commands and being obeyed through experience, rendering ${him} very effective.`);
				effectiveness += 5;
			} else if (S.HeadGirl.skill.headGirl > 120) {
				r.push(`${He} knows how to give orders and watch for potential issues, rendering ${him} more effective.`);
				effectiveness += 3;
			} else if (S.HeadGirl.skill.headGirl > 60) {
				r.push(`${He} knows how to give orders in a way others will listen to, rendering ${him} more effective.`);
				effectiveness += 2;
			} else if (S.HeadGirl.skill.headGirl > 30) {
				r.push(`${He} has the basic idea of how to give orders down, rendering ${him} slightly more effective.`);
				effectiveness += 1;
			}

			if (S.HeadGirl.actualAge > 30) {
				r.push(`${His} age and experience help ${him} as ${he} works with ${slave.slaveName}.`);
			} else if (S.HeadGirl.actualAge < 25 && V.AgePenalty > 0) {
				r.push(`${His} youth and inexperience impede ${him} as ${he} works with ${slave.slaveName}.`);
			}

			if (S.HeadGirl.accent >= 3) {
				r.push(`${He} does ${his} best to give orders in ${V.language}, but has to resort to a lot of unseemly gesticulation and shouting, making ${him} much less effective.`);
			} else if (S.HeadGirl.accent === 2) {
				r.push(`${His} heavy ${aNational(S.HeadGirl.nationality)} accent impedes ${his} clarity in ${V.language}, making ${him} somewhat less effective.`);
			}

			if (headGirlsTraining === "obedience" || headGirlsTraining === "flaw" || headGirlsTraining === "soften") {
				if (S.HeadGirl.intelligence + S.HeadGirl.intelligenceImplant > 50) {
					if (slave.intelligence + slave.intelligenceImplant > 50) {
						r.push(`${He} needs ${his} wits about ${him} to mold ${slave.slaveName}, who's quite intelligent ${himself2}.`);
					} else if (slave.intelligence + slave.intelligenceImplant >= -50) {
						r.push(`${His} intelligence helps ${him} mold ${slave.slaveName}.`);
					} else {
						r.push(`Molding ${slave.slaveName} is very easy, especially for a smart Head Girl like ${him}.`);
					}
				}
			} else {
				if (S.HeadGirl.intelligence + S.HeadGirl.intelligenceImplant > 50) {
					if (slave.intelligence + slave.intelligenceImplant > 50) {
						r.push(`Both slaves are quite intelligent, making ${his} job much easier.`);
					} else if (slave.intelligence + slave.intelligenceImplant >= -50) {
						r.push(`${He}'s quite intelligent and can teach ${slave.slaveName} well.`);
					} else {
						r.push(`${He} needs all ${his} considerable intelligence to get through to the idiot ${he} has to teach.`);
					}
				}
			}

			if (V.HGSeverity > 0) {
				r.push(`Your directives encourage ${him} to rape any slave that fails in the slightest way, a task ${he} approaches`);
				if (S.HeadGirl.sexualFlaw === SexualFlaw.ABUSIVE) {
					r.push(`eagerly, since ${he} prefers to take ${his} pleasure without consent.`);
				} else if (S.HeadGirl.fetish === Fetish.SADIST) {
					r.push(`with sadistic enthusiasm.`);
				} else if (S.HeadGirl.fetish === Fetish.DOM) {
					r.push(`with confidence.`);
				} else if (S.HeadGirl.energy > 95) {
					r.push(`as a convenient way to`);
					if (S.HeadGirl.balls > 0) {
						r.push(`drain ${his} perpetually overfilled balls into a series of spasming holes.`);
					} else {
						r.push(`sate ${his} excess sexual appetite.`);
					}
				} else {
					r.push(`dutifully.`);
				}
				if (slave.vagina === 0) {
					r.push(`In ${slave.slaveName}'s case, ${he}'s careful to limit ${his2} sexual abuse to things that won't take the ${girl2}'s virginity. The slave`);
				} else if (slave.anus === 0) {
					r.push(`${He}'s careful to molest ${slave.slaveName} in ways that don't involve penetrating ${his2} virgin ass. The slave`);
				} else {
					r.push(`${slave.slaveName}`);
				}
				if (slave.devotion > 50) {
					r.push(`accepts the abuse, believing ${he2} deserves to be raped.`);
				} else if (slave.devotion >= -20) {
					r.push(`is <span class="gold">frightened</span> by the unceasing abuse.`);
					slave.trust -= 1;
				} else {
					r.push(`<span class="mediumorchid">hates</span> and <span class="gold">fears</span> the constant abuse.`);
					slave.trust -= 1;
					slave.devotion -= 1;
				}
				r.push(`${S.HeadGirl.slaveName} makes sure ${his} victim hates it, every time, and ${slave.slaveName} can't help but do ${his2} very best to avoid this treatment.`);
			} else if (V.HGSeverity === 0) {
				r.push(`You allow ${him} to use ${his} own judgment when punishing failures,`);
				if (S.HeadGirl.sexualFlaw === SexualFlaw.ABUSIVE) {
					r.push(`and ${he} usually decides in favor of forcing misbehaving slaves to get ${him} off.`);
				} else if (S.HeadGirl.fetish === Fetish.SADIST) {
					r.push(`permission the sadist uses for ${his} own gratification.`);
				} else if (S.HeadGirl.fetish === Fetish.DOM) {
					r.push(`which the dominant ${girl} uses confidently.`);
				} else if (S.HeadGirl.energy > 95) {
					r.push(`which ${he} uses to`);
					if (S.HeadGirl.balls > 0) {
						r.push(`force ${his} subordinates to keep ${his} balls drained.`);
					} else {
						r.push(`extract the constant sexual favors ${his} libido demands.`);
					}
				} else {
					r.push(`and ${he} does ${his} best to be fair.`);
				}
				r.push(`${slave.slaveName}`);
				if (slave.devotion > 50) {
					r.push(`is <span class="mediumaquamarine">grateful</span> that ${he2} is punished justly when ${he2} makes mistakes.`);
					slave.trust += 1;
				} else if (slave.devotion >= -20) {
					r.push(`does ${his2} best to learn quickly and avoid punishment.`);
				} else {
					r.push(`is <span class="gold">scared</span> by ${his2} inability to get away with the smallest disobedience.`);
					slave.trust -= 1;
				}
			} else {
				r.push(`You require ${him} to use respect when punishing; ${he} does ${his} best to motivate, but is unable to use real fear as a tool. ${slave.slaveName} understands this, and <span class="mediumaquamarine">trusts</span> that if ${he2} fails, the consequences won't be too awful.`);
				slave.trust += 1;
			}

			// These all need to be have sex act incrementors added to them. Or is it handled somewhere else?
			if (headGirlsTraining === "obedience") {
				slave.training = 0;
				effectiveness -= (slave.intelligence + slave.intelligenceImplant) / 3;
				if (effectiveness <= 0) {
					r.push(`${slave.slaveName} is smart enough to complicate things; ${he2} manages to outwit ${him} this week and makes no progress.`);
				} else {
					slave.devotion += Math.ceil(effectiveness / 4);
					if (slave.devotion < -50) {
						r.push(`${He} helps watch and restrain the rebellious ${slave.slaveName}, helping wear ${him2} down, <span class="gold">breaking ${slave.slaveName}'s rebelliousness.</span>`);
					} else if (slave.devotion < -20) {
						r.push(`${He} keeps ${slave.slaveName} constantly aware of ${his2} slavery, <span class="gold">breaking ${slave.slaveName}'s resistance.</span>`);
					} else {
						r.push(`${He} acts as another pair of eyes watching ${slave.slaveName} and metes out punishments, <span class="gold">improving ${slave.slaveName}'s servitude.</span>`);
					}
				}
			} else if (headGirlsTraining === "paraphilia") {
				effectiveness -= (slave.intelligence + slave.intelligenceImplant) / 3;
				slave.training += effectiveness;
				r.push(`${S.HeadGirl.slaveName} does ${his} best to get ${slave.slaveName} past it with punishments and rewards,`);
				if (slave.training > 100) {
					r.push(`and <span class="green">resolves ${slave.slaveName}'s paraphilia.</span>`);
					slave.training = 0;
					slave.sexualFlaw = SexualFlaw.NONE;
				} else {
					r.push(`and makes partial progress.`);
				}
			} else if (headGirlsTraining === "flaw") {
				effectiveness -= (slave.intelligence + slave.intelligenceImplant) / 3;
				slave.training += effectiveness;
				r.push(`${S.HeadGirl.slaveName} punishes ${slave.slaveName} whenever ${he} catches ${him2} indulging in ${his2} bad habits,`);
				if (slave.training > 100) {
					r.push(`and <span class="green">fixes ${slave.slaveName}'s flaw.</span>`);
					slave.training = 0;
					if (slave.behavioralFlaw !== BehavioralFlaw.NONE) {
						slave.behavioralFlaw = BehavioralFlaw.NONE;
					} else if (slave.sexualFlaw !== SexualFlaw.NONE) {
						slave.sexualFlaw = SexualFlaw.NONE;
					}
				} else {
					r.push(`and makes partial progress.`);
				}
			} else if (headGirlsTraining === "soften") {
				effectiveness -= (slave.intelligence + slave.intelligenceImplant) / 3;
				slave.training += effectiveness;
				r.push(`${He} punishes ${slave.slaveName} whenever ${he} sees ${him2} breaking the rules yet does ${his} best to retain what makes the slave special,`);
				if (slave.training > 150) {
					slave.training = 0;
					r.push(`and successfully <span class="green">softens ${slave.slaveName}'s flaw.</span>`);
					if (slave.behavioralFlaw !== BehavioralFlaw.NONE) {
						SoftenBehavioralFlaw(slave);
					} else if (slave.sexualFlaw !== SexualFlaw.NONE) {
						SoftenSexualFlaw(slave);
					}
				} else {
					r.push(`and makes partial progress.`);
				}
			} else if (headGirlsTraining === "oral skill") {
				slave.training = 0;
				if (S.HeadGirl.fetish === Fetish.CUMSLUT && S.HeadGirl.fetishStrength > 60) {
					r.push(`In spare moments ${he} teaches ${slave.slaveName} how to suck cocks, cunts, and assholes. ${His} enthusiasm for oral sex is infectious. ${slave.slaveName}'s <span class="green">oral skills have improved.</span>`);
					slaveSkillIncrease('oral', slave, random(5, 10));
				} else if (S.HeadGirl.dick > 0 && canPenetrate(S.HeadGirl)) {
					r.push(`In spare moments ${he} teaches ${slave.slaveName} how to suck cocks, cunts, and assholes. Your Head Girl uses ${his} penis as an effective teaching tool. ${slave.slaveName}'s <span class="green">oral skills have improved.</span>`);
					slaveSkillIncrease('oral', slave, random(5, 10));
				} else if (S.HeadGirl.clit > 2) {
					r.push(`In spare moments ${he} teaches ${slave.slaveName} how to suck cocks, cunts, and assholes. Your Head Girl uses ${his} pseudophallus-sized clit as an effective teaching tool. ${slave.slaveName}'s <span class="green">oral skills have improved.</span>`);
					slaveSkillIncrease('oral', slave, random(5, 10));
				} else {
					r.push(`In spare moments ${he} teaches ${slave.slaveName} how to suck cocks, cunts, and assholes. ${slave.slaveName}'s <span class="green">oral skills have improved.</span>`);
				}
				slaveSkillIncrease('oral', slave, Math.ceil(effectiveness / 10));
			} else if (headGirlsTraining === "anal skill") {
				slave.training = 0;
				if (S.HeadGirl.fetish === Fetish.BUTTSLUT && S.HeadGirl.fetishStrength > 60) {
					r.push(`In spare moments ${he} teaches ${slave.slaveName} how to take it up the ass. Your Head Girl's enthusiasm for backdoor loving is infectious. ${slave.slaveName}'s <span class="green">anal skills have improved.</span>`);
					slaveSkillIncrease('anal', slave, random(5, 10));
				} else if (S.HeadGirl.dick > 0 && canPenetrate(S.HeadGirl)) {
					r.push(`In spare moments ${he} teaches ${slave.slaveName} how to take a dick up the butt. Your Head Girl uses ${his} penis as an effective teaching tool. ${slave.slaveName}'s <span class="green">anal skills have improved.</span>`);
					slaveSkillIncrease('anal', slave, random(5, 10));
				} else if (S.HeadGirl.clit > 2) {
					r.push(`In spare moments ${he} teaches ${slave.slaveName} how to take a phallus up the butt. Your Head Girl uses ${his} pseudophallus-sized clit as an effective teaching tool. ${slave.slaveName}'s <span class="green">anal skills have improved.</span>`);
					slaveSkillIncrease('anal', slave, random(5, 10));
				} else {
					r.push(`In spare moments ${he} teaches ${slave.slaveName} how to take a dick up the butt. ${slave.slaveName}'s <span class="green">anal skills have improved.</span>`);
				}
				slaveSkillIncrease('anal', slave, Math.ceil(effectiveness / 10));
			} else if (headGirlsTraining === "fuck skill") {
				slave.training = 0;
				if (S.HeadGirl.energy > 95) {
					r.push(`In spare moments ${he} teaches ${slave.slaveName} how to take a dick. Your Head Girl's enthusiasm for sex is infectious. ${slave.slaveName}'s <span class="green">vanilla sex skills have improved.</span>`);
					slaveSkillIncrease('vaginal', slave, random(5, 10));
				} else if (S.HeadGirl.dick > 0 && canPenetrate(S.HeadGirl)) {
					r.push(`In spare moments ${he} teaches ${slave.slaveName} how to take a dick. Your Head Girl uses ${his} penis as an effective teaching tool. ${slave.slaveName}'s <span class="green">vanilla sex skills have improved.</span>`);
					slaveSkillIncrease('vaginal', slave, random(5, 10));
				} else if (S.HeadGirl.clit >= 3) {
					r.push(`In spare moments ${he} teaches ${slave.slaveName} how to take a phallus. Your Head Girl uses ${his} pseudophallus-sized clit as an effective teaching tool. ${slave.slaveName}'s <span class="green">vanilla sex skills have improved.</span>`);
					slaveSkillIncrease('vaginal', slave, random(5, 10));
				} else {
					r.push(`In spare moments ${he} teaches ${slave.slaveName} how to take a dick. ${slave.slaveName}'s <span class="green">vanilla sex skills have improved.</span>`);
				}
				slaveSkillIncrease('vaginal', slave, Math.ceil(effectiveness / 10));
			} else if (headGirlsTraining === "penetrative skill") {
				slave.training = 0;
				if (S.HeadGirl.energy > 95) {
					r.push(`In spare moments ${he} teaches ${slave.slaveName} how to properly fuck a ${girl}. Your Head Girl's enthusiasm for sex is infectious. ${slave.slaveName}'s <span class="green">penetrative skills have improved.</span>`);
					slaveSkillIncrease('penetrative', slave, random(5, 10));
				} else if (S.HeadGirl.vagina > 0 && canDoVaginal(S.HeadGirl) && S.HeadGirl.fetish === "pregnancy" && S.HeadGirl.fetishStrength > 60) {
					r.push(`In spare moments ${he} teaches ${slave.slaveName} how to properly fuck a ${girl}. Your Head Girl uses ${his} pussy as an effective teaching tool. ${slave.slaveName}'s <span class="green">penetrative skills have improved.</span>`);
					slaveSkillIncrease('penetrative', slave, random(5, 10));
				} else if (S.HeadGirl.anus > 0 && canDoAnal(S.HeadGirl) && S.HeadGirl.fetish === Fetish.BUTTSLUT && S.HeadGirl.fetishStrength > 60) {
					r.push(`In spare moments ${he} teaches ${slave.slaveName} how to properly fuck a ${girl}. Your Head Girl uses ${his} rear hole as an effective teaching tool. ${slave.slaveName}'s <span class="green">penetrative skills have improved.</span>`);
					slaveSkillIncrease('penetrative', slave, random(5, 10));
				} else {
					r.push(`In spare moments ${he} teaches ${slave.slaveName} how to properly fuck a ${girl}. ${slave.slaveName}'s <span class="green">penetrative skills have improved.</span>`);
				}
				slaveSkillIncrease('penetrative', slave, Math.ceil(effectiveness / 10));
			} else if (headGirlsTraining === "whore skill") {
				slave.training = 0;
				r.push(`In spare moments ${he} teaches ${slave.slaveName} how to prostitute ${himself2}. ${slave.slaveName}'s <span class="green">whoring skills have improved.</span>`);
				slaveSkillIncrease('whoring', slave, Math.ceil(effectiveness / 10));
			} else if (headGirlsTraining === "entertain skill") {
				slave.training = 0;
				if (S.HeadGirl.fetish === Fetish.HUMILIATION && S.HeadGirl.fetishStrength > 60) {
					r.push(`In spare moments ${he} teaches ${slave.slaveName} how to entertain. Your Head Girl's enthusiasm for public display is infectious. ${slave.slaveName}'s <span class="green">entertainment skills have improved.</span>`);
					slaveSkillIncrease('entertainment', slave, random(5, 10));
				} else {
					r.push(`In spare moments ${he} teaches ${slave.slaveName} how to entertain. ${slave.slaveName}'s <span class="green">entertainment skills have improved.</span>`);
				}
				slaveSkillIncrease('entertainment', slave, Math.ceil(effectiveness / 10));
			}
		}

		if (slave.devotion >= -20) {
			if (slave.attrKnown === 0) {
				slave.attrKnown = 1;
				r.push(`${S.HeadGirl.slaveName} also investigates the slave's basic sexual orientation, finding that ${he2} is`);
				if (slave.attrXY <= 40) {
					r.push(`<span class="red">disgusted by men</span>`);
				} else if (slave.attrXY <= 60) {
					r.push(`indifferent to men`);
				} else if (slave.attrXY <= 80) {
					r.push(`<span class="green">attracted to men</span>`);
				} else {
					r.push(`<span class="green">intensely attracted to men</span>`);
				}
				r.push(`and`);
				if (slave.attrXX <= 40) {
					r.push(`<span class="red">disgusted by women.</span>`);
				} else if (slave.attrXX <= 60) {
					r.push(`indifferent to women.`);
				} else if (slave.attrXX <= 80) {
					r.push(`<span class="green">attracted to women.</span>`);
				} else {
					r.push(`<span class="green">intensely attracted to women.</span>`);
				}
			}
		}

		if (V.HGPiercings) {
			if (slave.devotion >= -20 && slave.genes === GenderGenes.MALE && slave.attrXY <= 35 && !FutureSocieties.isActive('FSBodyPurist') && (!FutureSocieties.isActive('FSPaternalist') || SlaveStatsChecker.modScore(slave).total < 13)) {
				piercingCheck();
			}
		}

		App.Events.addNode(el, r, "div", "indent");
		return el;

		/**
		 * Gives a back a clone with RA applied to it. The original is not modified.
		 * Call and then check potential change against it to see if the RA would revert it.
		 *
		 * @param {FC.SlaveState} slave
		 * @returns {FC.SlaveState}
		 */
		function slaveAfterRA(slave) {
			const after = clone(slave);
			DefaultRules(after);
			return after;
		}

		function piercingCheck() {
			let piercingForbidden = 0;
			if (slave.piercing.ear.weight === 0 && slave.earShape !== "none") {
				if (FutureSocieties.isActive('FSDegradationist')) {
					slave.piercing.ear.weight = 2;
				} else {
					slave.piercing.ear.weight = 1;
				}
				if (slave.piercing.ear.weight !== slaveAfterRA(slave).piercing.ear.weight) {
					piercingForbidden = 1;
					slave.piercing.ear.weight = 0;
				} else {
					if (FutureSocieties.isActive('FSDegradationist')) {
						r.push(`${S.HeadGirl.slaveName} knows that ${slave.slaveName} needs to adjust to life as a slave${girl2}, so ${he} has the slave's ears pierced. This will be a constant reminder that ${he2} is simply a sexual object here.`);
					} else {
						r.push(`${S.HeadGirl.slaveName} knows that ${slave.slaveName} needs help adjusting to life as a slave${girl2}, so ${he} has the slave's ears pierced. A little feminine touch can make a big difference.`);
					}
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					return;
				}
			}
			if (slave.piercing.nose.weight === 0) {
				if (FutureSocieties.isActive('FSDegradationist')) {
					slave.piercing.nose.weight = 2;
				} else {
					slave.piercing.nose.weight = 1;
				}
				if (slave.piercing.nose.weight !== slaveAfterRA(slave).piercing.nose.weight) {
					piercingForbidden = 1;
					slave.piercing.nose.weight = 0;
				} else {
					if (FutureSocieties.isActive('FSDegradationist')) {
						r.push(`${S.HeadGirl.slaveName} knows that ${slave.slaveName} needs to adjust to life as a slave${girl2}, so ${he} gives the slave nasal studs and a large septum ring. It should push ${slave.slaveName} to see ${himself2} as a sexual object for others to use.`);
					} else {
						r.push(`${S.HeadGirl.slaveName} knows that ${slave.slaveName} needs help adjusting to life as a slave${girl2}, so ${he} gives the slave a cute little nose piercing. It should help ${slave.slaveName} see ${himself2} as a bit more feminine.`);
					}
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					return;
				}
			}
			if (slave.piercing.eyebrow.weight === 0) {
				if (FutureSocieties.isActive('FSDegradationist')) {
					slave.piercing.eyebrow.weight = 2;
				} else {
					slave.piercing.eyebrow.weight = 1;
				}
				if (slave.piercing.eyebrow.weight !== slaveAfterRA(slave).piercing.eyebrow.weight) {
					piercingForbidden = 1;
					slave.piercing.eyebrow.weight = 0;
				} else {
					if (FutureSocieties.isActive('FSDegradationist')) {
						r.push(`${S.HeadGirl.slaveName} knows that ${slave.slaveName} needs to adjust to life as a slave${girl2}, so ${he} gives the slave multiple eyebrow piercings. A slutty touch for a slave${girl2} should help ${him2} feel a little hungrier for cock.`);
					} else {
						r.push(`${S.HeadGirl.slaveName} knows that ${slave.slaveName} needs help adjusting to life as a slave${girl2}, so ${he} gives the slave a cute little eyebrow piercing. A slutty touch for a slave${girl2} should help ${him2} feel a little hungrier for cock.`);
					}
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					return;
				}
			}
			if (slave.piercing.lips.weight === 0) {
				if (FutureSocieties.isActive('FSDegradationist')) {
					slave.piercing.lips.weight = 2;
				} else {
					slave.piercing.lips.weight = 1;
				}
				if (slave.piercing.lips.weight !== slaveAfterRA(slave).piercing.lips.weight) {
					piercingForbidden = 1;
					slave.piercing.lips.weight = 0;
				} else {
					if (FutureSocieties.isActive('FSDegradationist')) {
						r.push(`${S.HeadGirl.slaveName} knows that ${slave.slaveName} needs to adjust to life as a slave${girl2}, so ${he} has the slave's lower lip pierced. ${His2} mouth is for pleasing penises now, so it'll help ${him2} if it looks like it.`);
					} else {
						r.push(`${S.HeadGirl.slaveName} knows that ${slave.slaveName} needs help adjusting to life as a slave${girl2}, so ${he} has the slave's lower lip pierced. ${His2} mouth is for pleasing penises now, so it'll help ${him2} if it looks like it.`);
					}
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					return;
				}
			}
			if (slave.piercing.navel.weight === 0) {
				if (FutureSocieties.isActive('FSDegradationist')) {
					slave.piercing.navel.weight = 2;
				} else {
					slave.piercing.navel.weight = 1;
				}
				if (slave.piercing.navel.weight !== slaveAfterRA(slave).piercing.navel.weight) {
					piercingForbidden = 1;
					slave.piercing.navel.weight = 0;
				} else {
					if (FutureSocieties.isActive('FSDegradationist')) {
						r.push(`${S.HeadGirl.slaveName} knows that ${slave.slaveName} needs help adjusting to life as a slave${girl2}, so ${he} has the slave's navel pierced with a big ring. Whatever ${he2} thinks in ${his2} mind, ${S.HeadGirl.slaveName} makes clear to ${him2} that ${his2} body belongs to you.`);
					} else {
						r.push(`${S.HeadGirl.slaveName} knows that ${slave.slaveName} needs help adjusting to life as a slave${girl2}, so ${he} has the slave's navel pierced. The prettier ${his2} lower half looks, the less reluctant ${he2} should feel to take it up the butt.`);
					}
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					return;
				}
			}
			if (piercingForbidden) {
				if (FutureSocieties.isActive('FSDegradationist')) {
					r.push(`${S.HeadGirl.slaveName} thinks some piercings might push ${slave.slaveName} to adjust to life as a slave${girl2}, but ${he} also knows you have rules applied to this slave that forbid it.`);
				} else {
					r.push(`${S.HeadGirl.slaveName} thinks some cute piercings might help ${slave.slaveName} adjust to life as a slave${girl2}, but ${he} also knows you have rules applied to this slave that forbid it.`);
				}
			}
		}
	}

	/**
	 * @returns {FC.HeadGirlTrainee[]}
	 */
	function slavesToTrain() {
		if (S.HeadGirl) {
			/** @type {FC.HeadGirlTrainee[][]} */
			const HGPossibleSlaves = [[], [], [], [], [], []];
			for (const slave of penthouseSlaves) {
				if (slave.fuckdoll === 1 || slave.ID === V.BodyguardID || slave.ID === V.HeadGirlID || slave.fetish === Fetish.MINDBROKEN) {
					continue;
				} else if (V.personalAttention.task === PersonalAttention.TRAINING && V.personalAttention.slaves.some(p => p.ID === slave.ID) && !onBedRest(V.PC, true)) {
					continue;
				}

				if (V.headGirlTrainsHealth && slave.health.condition < -20) {
					HGPossibleSlaves[0].push({ID: slave.ID, training: "health"});
					continue;
				}

				if (slave.health.tired < 50) {
					const hasParaphilia = (App.Data.misc.paraphiliaList.includes(slave.sexualFlaw));
					if (V.headGirlTrainsParaphilias && hasParaphilia) {
						HGPossibleSlaves[1].push({ID: slave.ID, training: "paraphilia"});
						continue;
					}

					if (V.headGirlTrainsFlaws || V.headGirlSoftensFlaws || V.headGirlOverridesQuirks) {
						if (slave.behavioralFlaw !== BehavioralFlaw.NONE || (slave.sexualFlaw !== SexualFlaw.NONE && !hasParaphilia)) {
							if (V.headGirlOverridesQuirks) {
								if (slave.devotion > 20) {
									if (slave.behavioralFlaw !== BehavioralFlaw.NONE || (slave.sexualFlaw !== SexualFlaw.NONE && !hasParaphilia)) {
										HGPossibleSlaves[3].push({ID: slave.ID, training: "soften"});
									} else {
										HGPossibleSlaves[3].push({ID: slave.ID, training: "flaw"});
									}
									continue;
								}
							} else if (V.headGirlSoftensFlaws) {
								if (slave.devotion > 20) {
									if ((slave.behavioralFlaw !== BehavioralFlaw.NONE && slave.behavioralQuirk === BehavioralQuirk.NONE) || (slave.sexualFlaw !== SexualFlaw.NONE && slave.sexualQuirk === SexualQuirk.NONE && !hasParaphilia)) {
										HGPossibleSlaves[3].push({ID: slave.ID, training: "soften"});
									} else {
										HGPossibleSlaves[3].push({ID: slave.ID, training: "flaw"});
									}
									continue;
								}
							} else if (V.headGirlTrainsFlaws) {
								HGPossibleSlaves[2].push({ID: slave.ID, training: "flaw"});
								continue;
							}
						}
					}

					if (V.headGirlTrainsObedience && slave.devotion <= 20 && slave.trust >= -20) {
						HGPossibleSlaves[4].push({ID: slave.ID, training: "obedience"});
						continue;
					}

					if (V.headGirlTrainsSkills) {
						if (slave.skill.oral < S.HeadGirl.skill.oral) {
							HGPossibleSlaves[5].push({ID: slave.ID, training: "oral skill"});
						} else if (slave.skill.vaginal < S.HeadGirl.skill.vaginal && slave.vagina > 0 && canDoVaginal(slave)) {
							HGPossibleSlaves[5].push({ID: slave.ID, training: "fuck skill"});
						} else if (slave.skill.penetrative < S.HeadGirl.skill.penetrative && penetrativeSocialUse(slave) >= 40) {
							HGPossibleSlaves[5].push({ID: slave.ID, training: "penetrative skill"});
						} else if (slave.skill.anal < S.HeadGirl.skill.anal && slave.anus > 0 && canDoAnal(slave)) {
							HGPossibleSlaves[5].push({ID: slave.ID, training: "anal skill"});
						} else if (slave.skill.whoring < S.HeadGirl.skill.whoring) {
							HGPossibleSlaves[5].push({ID: slave.ID, training: "whore skill"});
						} else if (slave.skill.entertainment < S.HeadGirl.skill.entertainment && !isAmputee(slave)) {
							HGPossibleSlaves[5].push({ID: slave.ID, training: "entertain skill"});
						}
					}
				}
			}
			// @ts-ignore - SC's flatten() is not typed correctly
			return HGPossibleSlaves.flatten().slice(0, App.EndWeek.saVars.HGEnergy);
		} else {
			return [];
		}
	}
};
