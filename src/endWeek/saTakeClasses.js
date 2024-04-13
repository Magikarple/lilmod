/**
 * @param {FC.ReportSlave} slave
 * @returns {string}
 */
App.SlaveAssignment.takeClasses = function saTakeClasses(slave) {
	const {
		he, him, his, himself, He, His,
	} = getPronouns(slave);

	let r = ` `;

	const pMod = App.SlaveAssignment.PartTime.efficiencyModifier(slave);
	let learning = 1;

	jobPreface(slave);
	if (slave.fetish !== Fetish.MINDBROKEN) {
		learningDisability(slave);
		jobHealthImpact(slave);
		learningProgress(slave);
		if (slave.lactation > 0) {
			lactationBreak(slave);
		}
		skillLessons(slave);
		generalLessons(slave);
		if (slave.accent > 1 && slave.voice !== 0) {
			speechLessons(slave);
		}
		if (needsTutoring(slave)) {
			tutorLessons(slave);
		}
		graduation(slave);
	}
	return r;

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function jobPreface(slave) {
		if (slave.fetish === Fetish.MINDBROKEN) {
			r += `is no longer mentally capable and <span class="noteworthy">has been dropped from class.</span>`;
			slave.health.tired = Math.clamp(slave.health.tired - 10, 0, 100); // Since they avoid the tired call altogether, just toss them some reduction. It's not like they were listening anyway.
			if (slave.assignment === Job.CLASSES) {
				removeJob(slave, Job.CLASSES);
			}
		} else {
			r += `takes courses in slavery`;
			if (V.schoolroomUpgradeSkills + V.schoolroomUpgradeRemedial + V.schoolroomUpgradeLanguage !== 0) {
				r += `, using ${V.schoolroomName}'s improved educational materials,`;
			}
			if (slave.assignment === Job.SCHOOL && S.Schoolteacher) {
				const schoolteacherPronouns = getPronouns(S.Schoolteacher);
				let teaching = (S.Schoolteacher.intelligence + S.Schoolteacher.intelligenceImplant);
				if (S.Schoolteacher.visualAge > 35) {
					teaching += 10;
				}
				if (App.Data.Careers.Leader.schoolteacher.includes(S.Schoolteacher.career)) {
					teaching += 10;
				} else if (S.Schoolteacher.skill.teacher >= Constant.MASTERED_XP) {
					teaching += 10;
				} else if (S.Schoolteacher.skill.teacher > 120) {
					teaching += 6;
				} else if (S.Schoolteacher.skill.teacher > 60) {
					teaching += 3;
				} else if (S.Schoolteacher.skill.teacher > 20) {
					teaching += 1;
				}
				if (S.Schoolteacher.face > 40) {
					teaching += 10;
				}
				teaching *= App.SlaveAssignment.PartTime.efficiencyModifier(slave);
				if (jsRandom(1, 150) < teaching) {
					learning += 1;
				}
				r += ` under ${S.Schoolteacher.slaveName}'s supervision;`;
				if (slave.devotion > 20) {
					r += ` ${he} is such an obedient slave that ${schoolteacherPronouns.pronoun} <span class="devotion inc">encourages ${him}</span> to be the best slave ${he} can.`;
					slave.devotion += 2;
				} else if (slave.trust < -20) {
					r += ` ${he} obeys out of fear, so ${schoolteacherPronouns.pronoun} <span class="devotion inc">encourages ${him}</span> to be a better slave.`;
					slave.devotion++;
				} else {
					r += ` ${he} is resistant, so ${schoolteacherPronouns.pronoun} ends up mostly <span class="trust dec">punishing ${him},</span> increasing ${his} <span class="devotion dec">dislike for slavery.</span>`;
					slave.devotion -= 2;
					slave.trust -= 4;
				}
			} else {
				r += ` under ${V.assistant.name}'s supervision;`;
				if (slave.devotion > 20) {
					r += ` ${he} is such an obedient slave that ${V.assistant.name} mostly <span class="devotion inc">encourages ${him}.</span>`;
					slave.devotion += 2;
				} else if (slave.trust < -20) {
					r += ` ${he} obeys out of fear, so ${V.assistant.name} mostly <span class="devotion inc">encourages ${him}</span> to be a better slave.`;
					slave.devotion++;
				} else {
					r += ` ${he} is resistant, so ${V.assistant.name} mostly <span class="trust dec">punishes ${him},</span> increasing ${his} <span class="devotion dec">dislike for slavery.</span>`;
					slave.devotion -= 2;
					slave.trust -= 4;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function learningDisability(slave) {
		if (!canHear(slave) && !canSee(slave)) {
			r += ` With ${his} inability to hear and see, absorbing the content is extremely difficult.`;
			learning -= 3;
		} else if (!canHear(slave) || !canSee(slave)) {
			r += ` With ${his} impairments, ${he} needs special lessons to properly learn.`;
			learning -= 1;
		}
	}

	/**
	 * @param {FC.ReportSlave} slave
	 *
	 */
	function jobHealthImpact(slave) {
		if (slave.health.illness > 0 || slave.health.tired > 90) {
			r += ` ${He} performed worse this week due to<span class="health dec">`;
			if (slave.health.illness === 1) {
				r += ` feeling under the weather`;
				learning--;
			} else if (slave.health.illness === 2) {
				r += ` a minor illness`;
				learning--;
			} else if (slave.health.illness === 3) {
				r += ` being sick`;
				learning -= 2;
			} else if (slave.health.illness === 4) {
				r += ` being very sick`;
				learning -= 2;
			} else if (slave.health.illness === 5) {
				r += ` a terrible illness`;
				learning -= 3;
			}
			if (slave.health.illness > 0 && slave.health.tired > 60) {
				r += ` and`;
			}
			if (slave.health.tired > 90) {
				r += ` exhaustion`;
				learning -= 3;
			} else if (slave.health.tired > 60) {
				r += ` fatigue`;
				learning--;
			}
			r += `.</span>`;
		}
		r += ` ${His} lessons are not physically demanding, `;
		if (slave.rules.living === "spare") {
			r += `allowing ${him} ample rest despite ${his} sparse living conditions.`;
		} else {
			r += `allowing ${him} ample time for rest.`;
		}
		if (slave.health.tired > 80) {
			r += ` ${He} still finds ${himself} dozing off during class, however.`;
			learning--;
		}
		tired(slave);
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function learningProgress(slave) {
		if (V.schoolroomRemodelBimbo !== 1 || slave.assignment !== Job.SCHOOL) {
			if (slave.intelligence > 95) { /* 200% education for brilliant */
				learning += 2;
			} else if (slave.intelligence > 50) { /* normal for very smart */
				learning++;
			} else if (slave.intelligence > 15) { /* 70% for smart */
				if (jsRandom(1, 100) < 70) {
					learning++;
				}
			} else if (slave.intelligence >= -15) { /* 50% for average */
				if (jsRandom(1, 100) < 50) {
					learning++;
				}
			} else { /* slow, very slow, and retards */
				let slaveDensity = (50 + slave.intelligence);
				if (V.schoolroomUpgradeRemedial === 1 && jsRandom(1, 100) < 50) { /* 50% chance to benefit from upgrade */
					slaveDensity = 55;
				}
				if (jsRandom(1, 100) < slaveDensity) { /* 55% with upgrade, [-50 to 34]% without, mapped from [-100 to -16] intelligence */
					learning++;
				}
			}
		} else {
			if (slave.intelligence < -95) { /* 200% de-education for retards */
				learning += 2;
			} else if (slave.intelligence < -50) { /* normal for very slow */
				learning++;
			} else if (slave.intelligence < -15) { /* 70% for slow */
				if (jsRandom(1, 100) < 70) {
					learning++;
				}
			} else if (slave.intelligence <= 15) { /* 50% for average */
				if (jsRandom(1, 100) < 50) {
					learning++;
				}
			} else { /* smart, very smart, and brilliant */
				let slaveDensity = (50 - slave.intelligence);
				if (V.schoolroomUpgradeRemedial === 1 && jsRandom(1, 100) < 50) { /* 50% chance to benefit from upgrade */
					slaveDensity = 55;
				}
				if (jsRandom(1, 100) < slaveDensity) { /* 55% with upgrade, [-50 to 34]% without, mapped from [100 to 16] intelligence */
					learning++;
				}
			}
		}
		r += ` ${He} is `;
		if (slave.intelligence > 95) {
			r += `a genius,`;
		} else if (slave.intelligence > 50) {
			r += `highly intelligent`;
		} else if (slave.intelligence > 15) {
			r += `of above average intelligence`;
		} else if (slave.intelligence >= -15) {
			r += `of average intelligence`;
		} else if (slave.intelligence >= -50) {
			r += `of below average intelligence`;
		} else if (slave.intelligence >= -95) {
			r += `quite stupid`;
		} else {
			r += `an imbecile,`;
		}
		if (slave.devotion > 95) {
			r += ` and worshipful of you,`;
			learning++;
		} else if (slave.devotion > 50) {
			r += ` and devoted to you,`;
			if (jsRandom(1, 100) < 70) {
				learning++;
			}
		} else if (slave.devotion > 20) {
			r += ` and obedient to you,`;
			if (jsRandom(1, 100) < 50) {
				learning++;
			}
		} else if (slave.trust < -20) {
			r += ` and frightened of you,`;
			if (jsRandom(1, 100) < 40) {
				learning++;
			}
		} else {
			r += ` and neither likes you nor is afraid of you,`;
		}

		learning = Math.floor(learning * pMod);

		r += ` and ${he} `;
		if (V.schoolroomRemodelBimbo !== 1 || slave.assignment !== Job.SCHOOL) {
			if (learning <= 1) {
				r += `learns slowly`;
			} else if (learning === 2) {
				r += `does well with ${his} studies`;
			} else {
				r += `is perfectly studious`;
			}
		} else {
			if (learning <= 1) {
				r += `struggles with the lessons`;
			} else if (learning === 2) {
				r += `makes progress with the materials`;
			} else {
				r += `breezes through ${his} lessons`;
			}
		}
		r += ` this week.`;

		if (pMod < 1) {
			if (App.SlaveAssignment.PartTime.arenaTime(slave) > 0) {
				r += ` Some of ${his} classes focus on learning combat instead.`;
			} else {
				r += ` ${His} part-time job take up some part of ${his} day.`;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function lactationBreak(slave) {
		// room for growth — do so during lactation rules expansion
		if (slave.lactation === 1 && slave.assignment === Job.SCHOOL && S.Schoolteacher && hasAnyArms(S.Schoolteacher)) {
			r += ` With ${his} natural lactation, ${he} often finds ${himself} milked before the class by ${S.Schoolteacher.slaveName} both to serve as a lesson and to keep ${him} from becoming a milky mess.`;
			slave.lactationDuration = 2;
			slave.boobs -= slave.boobsMilk;
			slave.boobsMilk = 0;
		}
	}

	/**
	 * @param {FC.SlaveState} slave
	 * @returns {number}
	 */
	function lessonSkillIncrease(slave) {
		if (V.schoolroomRemodelBimbo !== 1 || slave.assignment !== Job.SCHOOL) {
			return (10 + Math.floor((slave.intelligence + slave.intelligenceImplant) / 32));
		} else {
			return (10 + (Math.abs(Math.floor((slave.intelligence + slave.intelligenceImplant) / 32))));
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function skillLessons(slave) {
		let obedienceLesson = false; // forces an obedience lesson to replace the first skill lesson
		const skillIncrease = lessonSkillIncrease(slave);
		let lessons;
		const set = new Set();
		for (lessons = 0; lessons < Math.max(1, learning); lessons++) {
			if (slave.devotion <= 20 && !obedienceLesson) {
				set.add(`Since ${he} is wanting in basic obedience, ${he} suffers through courses on <span class="devotion inc">${his} place</span> in the Free Cities world.`);
				slave.devotion += 10;
				obedienceLesson = true;
			} else if (slave.skill.oral <= 10) {
				set.add(`Since ${he} is orally incompetent, ${he} is taught basic gag reflex suppression exercises and other simple oral things.`);
				set.add(slaveSkillIncrease('oral', slave, skillIncrease));
			} else if (slave.skill.vaginal <= 10 && slave.vagina > 0 && canDoVaginal(slave)) {
				set.add(`Since ${he} is unskilled at using ${his} pussy, ${he} is taught Kegel exercises and other simple vaginal skills.`);
				set.add(slaveSkillIncrease('vaginal', slave, skillIncrease));
			} else if (slave.skill.vaginal <= 10 && slave.vagina >= 0) {
				set.add(`Since ${he} is unskilled at using ${his} pussy and not permitted to learn through practice, ${he} is taught Kegel exercises, vaginal basics and several new positions.`);
				set.add(slaveSkillIncrease('vaginal', slave, skillIncrease));
			} else if (slave.skill.anal <= 10 && slave.anus > 0 && canDoAnal(slave)) {
				set.add(`Since ${he} is a novice at taking it up ${his} butt, ${he} is taught relaxation exercises and other simple anal basics.`);
				set.add(slaveSkillIncrease('anal', slave, skillIncrease));
			} else if (slave.skill.anal <= 10 && slave.anus >= 0) {
				set.add(`Since ${he} is a novice at taking it up ${his} butt and not permitted to learn through practice, ${he} is taught relaxation exercises and other simple anal basics.`);
				set.add(slaveSkillIncrease('anal', slave, skillIncrease));
			} else if (slave.skill.penetrative <= 10 && penetrativeSocialUse() >= 40 && (canPenetrate(slave) || slave.clit >= 3)) {
				set.add(`Since ${he} is a novice at using ${his} ${slave.clit < 3 ? "dick" : "phallic clit"}, ${he} is taught the basics of foreplay, insertion and movement.`);
				set.add(slaveSkillIncrease('penetrative', slave, skillIncrease));
			} else if (slave.skill.penetrative <= 10 && penetrativeSocialUse() >= 40) {
				set.add(`Since ${he} is a novice at penetrating others with a phallus, ${he} is taught the basics of foreplay, insertion and movement.`);
				set.add(slaveSkillIncrease('penetrative', slave, skillIncrease));
			} else if (slave.skill.whoring <= 10) {
				set.add(`Since ${he} has little idea what's involved in selling ${his} body, ${he} is taught basic safety practices and other simple prostitution skills.`);
				set.add(slaveSkillIncrease('whoring', slave, skillIncrease));
			} else if (slave.skill.entertainment <= 10) {
				set.add(`Since ${his} entertainment value is limited to ${his} holes, ${he} is taught simple conversational skills and other courtesan's essentials.`);
				set.add(slaveSkillIncrease('entertainment', slave, skillIncrease));
			} else if (V.schoolroomUpgradeSkills === 1) {
				if (slave.skill.oral <= 30) {
					set.add(`Having completed the basic sex slave curriculum, ${he} studies more advanced ways to use ${his} lips and tongue to please cocks, cunts, and asses.`);
					set.add(slaveSkillIncrease('oral', slave, skillIncrease));
				} else if (slave.skill.whoring <= 30) {
					set.add(`Having completed the basic sex slave curriculum, ${he} studies intermediate prostitution, including how to stay as safe as possible and maximize ${his} efficiency.`);
					set.add(slaveSkillIncrease('whoring', slave, skillIncrease));
				} else if (slave.skill.entertainment <= 30) {
					set.add(`Having completed the basic sex slave curriculum, ${he} studies courtesanship, including social dynamics and flirtation more subtle than straightforward begging for sex.`);
					set.add(slaveSkillIncrease('entertainment', slave, skillIncrease));
				} else if (slave.skill.vaginal <= 30 && slave.vagina >= 0) {
					set.add(`Having completed the basic sex slave curriculum, ${he} studies more advanced techniques and exotic positions to make use of ${his} ${(slave.vagina === 0) ? `virgin pussy for use in ${his} first time` : `pussy`}.`);
					set.add(slaveSkillIncrease('vaginal', slave, skillIncrease));
				} else if (slave.skill.anal <= 30) {
					set.add(`Having completed the basic sex slave curriculum, ${he} studies more advanced techniques and exotic positions to make use of ${his} ${(slave.anus === 0) ? `virgin ass for use in ${his} first time` : `ass`}.`);
					set.add(slaveSkillIncrease('anal', slave, skillIncrease));
				} else if (slave.skill.penetrative <= 30 && penetrativeSocialUse() >= 40) {
					set.add(`Having completed the basic sex slave curriculum, ${he} studies more advanced techniques and exotic positions to ${canPenetrate(slave) ? `make use of ${his} penis` : `better penetrate others`}.`);
					set.add(slaveSkillIncrease('penetrative', slave, skillIncrease));
				}
			}
		}
		if (lessons > 1) {
			r += ` ${He} passed ${num(lessons)} exams this week.`;
		}
		r += ' ' + [...set].join(' ');
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function generalLessons(slave) {
		// speedbumps at 0 and 15 allow players to fine tune education to meet FS demands.
		if (V.schoolroomRemodelBimbo === 1 && slave.assignment === Job.SCHOOL) {
			if (slave.intelligenceImplant > -15) {
				r += ` ${He} makes some progress `;
				if (slave.intelligenceImplant < 0) {
					r += `towards ${his} special education.`;
				} else {
					r += `in undoing ${his} education.`;
				}
				if (slave.intelligenceImplant > 15) {
					slave.intelligenceImplant -= Math.max(1, learning);
					if (slave.intelligenceImplant <= 15) {
						slave.intelligenceImplant = 15;
						r += ` ${He} is <span class="education neg">no longer burdened by an advanced education.</span>`;
					}
				} else if (slave.intelligenceImplant > 0) {
					slave.intelligenceImplant -= Math.max(1, learning);
					if (slave.intelligenceImplant <= 0) {
						slave.intelligenceImplant = 0;
						r += ` ${He} is <span class="education neg">no longer burdened by anything resembling an education.</span>`;
					}
				} else {
					slave.intelligenceImplant -= Math.max(1, learning);
					if (slave.intelligenceImplant <= -15) {
						slave.intelligenceImplant = -15;
						r += ` ${He} has completed ${his} special education, and for most purposes ${he} has become <span class="education neg">less intelligent.</span>`;
					}
				}
			}
		} else if (slave.intelligenceImplant < 30 && slave.assignment === Job.SCHOOL) {
			r += ` ${He} makes some progress `;
			if (slave.intelligenceImplant < 0) {
				r += `in correcting ${his} thought processes.`;
				slave.intelligenceImplant += Math.max(1, learning);
				if (slave.intelligenceImplant >= 0) {
					slave.intelligenceImplant = 0;
					r += ` ${His} disastrous education has been undone, and for most purposes ${he} has become <span class="intelligent">more intelligent.</span>`;
				}
			} else if (slave.intelligenceImplant < 15) {
				r += `towards a basic education.`;
				slave.intelligenceImplant += Math.max(1, learning);
				if (slave.intelligenceImplant >= 15) {
					slave.intelligenceImplant = 15;
					r += ` ${He} has completed ${his} basic courses, and for most purposes ${he} has become <span class="intelligent">more intelligent.</span>`;
				}
			} else {
				r += `in furthering ${his} education.`;
				slave.intelligenceImplant += Math.max(1, learning);
				if (slave.intelligenceImplant >= 30) {
					slave.intelligenceImplant = 30;
					r += ` ${He} has completed ${his} advanced education, and for most purposes ${he} has become <span class="intelligent">more intelligent.</span>`;
				}
			}
		} else if (slave.intelligenceImplant < 15 && slave.assignment === Job.CLASSES) {
			r += ` ${He} makes some progress `;
			if (slave.intelligenceImplant < 0) {
				r += `in correcting ${his} thought processes.`;
				slave.intelligenceImplant += Math.max(1, learning);
				if (slave.intelligenceImplant >= 0) {
					slave.intelligenceImplant = 0;
					r += ` ${His} disastrous education has been undone, and for most purposes ${he} has become <span class="intelligent">more intelligent.</span>`;
				}
			} else {
				r += `towards a basic education.`;
				slave.intelligenceImplant += Math.max(1, learning);
				if (slave.intelligenceImplant >= 15) {
					slave.intelligenceImplant = 15;
					r += ` ${He} has completed a course of slave education, and for most purposes ${he} has become <span class="intelligent">more intelligent.</span>`;
				}
			}
		}
		slave.intelligenceImplant = Math.clamp(slave.intelligenceImplant, -15, 30);
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function speechLessons(slave) {
		let teacherBonus = 0;
		if (slave.assignment === Job.SCHOOL) {
			if (S.Schoolteacher) {
				if (S.Schoolteacher.accent >= 2) { // really === 2, because accent > 2 can't teach at all
					teacherBonus -= 5; // penalty for bad example
				}
				teacherBonus += (S.Schoolteacher.intelligence + S.Schoolteacher.intelligenceImplant) / 20; // -7 to 7
			}
			if (V.schoolroomUpgradeLanguage) {
				teacherBonus = Math.max(teacherBonus, 1); // automated teaching counterbalances terrible teachers
			}
			if (App.Entity.facilities.schoolroom.revivalistLanguageDecorationBonus()) {
				teacherBonus += 5;
			}
		}

		if (slave.intelligenceImplant >= 15 || slave.intelligenceImplant < 0) {
			if (slave.intelligence + teacherBonus > jsRandom(-110, 110)) {
				if (slave.accent > 3) {
					const langWeekThreshold = (V.schoolroomUpgradeLanguage === 0) ? 24 : 16;
					if (V.week - Math.max(0, slave.weekAcquired) > langWeekThreshold) {
						r += ` ${He} has <span class="improvement">learned some ${V.language},</span> and can make ${his} point with some gesturing, though ${he} speaks ${V.language} horribly.`;
						slave.accent--;
						if (slave.rules.speech === "language lessons") {
							slave.rules.speech = "accent elimination";
						}
					}
				} else if (slave.accent === 3) {
					r += ` ${He} has <span class="improvement">learned functional ${V.language}, </span>and can make ${himself} understood, though ${his} ${slave.nationality !== "Stateless" ? aNational(slave.nationality) : ``} accent is still quite heavy.`;
					slave.accent--;
				} else if (slave.accent === 2 && V.schoolroomUpgradeLanguage === 1) {
					r += ` ${He} has <span class="improvement">learned decent ${V.language}, </span>though ${he} retains enough of ${his} ${slave.nationality !== "Stateless" ? aNational(slave.nationality) : ``} accent to make ${his} voice distinctly sexy.`;
					slave.accent--;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function tutorLessons(slave) {
		const skillIncrease = lessonSkillIncrease(slave);
		switch (tutorForSlave(slave)) {
			case "HeadGirl":
				if (App.Data.Careers.Leader.HG.includes(slave.career)) {
					r += ` ${He} shows up the tutor by utilizing applicable skills from ${his} prior life as ${slave.career}. The service <span class="cash dec">will not offer a refund,</span> but does recognize ${him} as qualified to be a Head Girl, surprising no one.`;
					slave.skill.headGirl = 200;
				} else {
					r += ` ${He} spends time with a tutor training to be an effective Head Girl.`;
					if (slave.skill.headGirl <= 20) {
						r += ` ${He} is so unskilled that the tutor teaches ${him} the basics. ${He} learns how to make slaves obey ${him} and how to treat minor injuries.`;
					} else if (slave.skill.headGirl <= 60) {
						r += ` ${He} has some experience teaching others. The tutor has ${him} practice teaching slaves how to please their master, and has ${him} attend lectures on slave psychology.`;
					} else if (slave.skill.headGirl <= 120) {
						r += ` The tutor arranges for ${him} to work at different places throughout the week, from treating emergencies or diagnosing patients in the hospital to breaking resistant slaves for a slave school. ${He} is truly becoming a jack-of-all trades.`;
					} else if (slave.skill.headGirl <= 200) {
						r += ` Now that ${he} has mastered individual skills, ${he} is taught to assist you in running the arcology as a whole. ${He} learns how the security systems work, and how to make every slave perform at their best.`;
					}
					r += ` ${slaveSkillIncrease('headGirl', slave, skillIncrease)}`;
				}
				break;
			case "Recruiter":
				if (App.Data.Careers.Leader.recruiter.includes(slave.career)) {
					r += ` ${He} shows up the tutor by utilizing applicable skills from ${his} prior life as ${slave.career}. The service <span class="cash dec">will not offer a refund,</span> but does recognize ${him} as qualified to be a recruiter, surprising no one.`;
					slave.skill.recruiter = 200;
				} else {
					r += ` ${He} spends time with a tutor training to be an effective recruiter.`;
					if (slave.skill.recruiter <= 20) {
						r += ` The tutor starts teaching ${him} the basics. ${He} is given lessons on conversing, pronunciation, style and fashion.`;
					} else if (slave.skill.recruiter <= 60) {
						r += ` Having been taught the basics by ${his} tutor, ${he} is no longer awkward in conversation. But ${he} has a long way to go, the tutor teaches ${him} how to carry ${himself} and how to interpret others' non-verbal cues.`;
					} else if (slave.skill.recruiter <= 120) {
						r += ` The tutor has ${him} practice convincing others. ${He} watches online lectures on slave psychology, and applies it in practice by convincing others to make unfavorable deals.`;
					} else if (slave.skill.recruiter <= 200) {
						r += ` Every move ${he} makes is practiced and calculated, yet looks entirely natural. He has ${him} continue attending lectures on psychology, and sends ${him} out to convince free citizens to let themselves get voluntarily enslaved.`;
					}
					r += ` ${slaveSkillIncrease('recruiter', slave, skillIncrease)}`;
				}
				break;
			case "Bodyguard":
				if (App.Data.Careers.Leader.bodyguard.includes(slave.career)) {
					r += ` ${He} shows up the tutor by utilizing applicable skills from ${his} prior life as ${slave.career}. The service <span class="cash dec">will not offer a refund,</span> but does recognize ${him} as qualified to be a bodyguard, surprising no one.`;
					slave.skill.bodyguard = 200;
				} else {
					r += ` ${He} spends time with a tutor training to be an effective bodyguard.`;
					if (slave.skill.bodyguard <= 20) {
						r += ` ${He} undergoes a personalized boot camp in form of physical exercises, to make sure ${he} has the basic skills required for further security training.`;
					} else if (slave.skill.bodyguard <= 60) {
						r += ` The tutor trains ${him} in using and maintaining firearms, and forces ${him} through repetitive dry fire training in order to instill discipline.`;
					} else if (slave.skill.bodyguard <= 120) {
						r += ` During the week ${he} attends skirmish-scale wargames, and joins routine security patrols around the arcology.`;
					} else if (slave.skill.bodyguard <= 200) {
						r += `${He} receives versatile training on tactics and different weapons, culminating at the end of the week with a live fire exercise.`;
					}
					r += ` ${slaveSkillIncrease('bodyguard', slave, skillIncrease)}`;
				}
				break;
			case "Madam":
				if (App.Data.Careers.Leader.madam.includes(slave.career)) {
					r += ` ${He} shows up the tutor by utilizing applicable skills from ${his} prior life as ${slave.career}. The service <span class="cash dec">will not offer a refund,</span> but does recognize ${him} as qualified to run a brothel, surprising no one.`;
					slave.skill.madam = 200;
				} else {
					r += ` ${He} spends time with a tutor training to be an effective brothel madam.`;
					if (slave.skill.madam <= 20) {
						r += ` The tutor teaches ${him} the basics of whoring. To make sure the customer pays before they're serviced, how to take care of hygiene and how to take care of whores' health.`;
					} else if (slave.skill.madam <= 60) {
						r += ` Having been taught the basics, the lessons shift to learning how to best please a customer. ${He} is taught to converse and how to respond to a customer's desires.`;
					} else if (slave.skill.madam <= 120) {
						r += ` Now that ${he} is a masterful whore, the tutor teaches ${him} how to discipline ${his} subordinate whores. ${He} attends online lectures on marketing.`;
					} else if (slave.skill.madam <= 200) {
						r += ` ${He} is becoming a master at extracting maximum value from the assets ${he} commands, and is learning how to run the brothel effectively.`;
					}
					r += ` ${slaveSkillIncrease('madam', slave, skillIncrease)}`;
				}
				break;
			case "DJ":
				if (App.Data.Careers.Leader.DJ.includes(slave.career)) {
					r += ` ${He} shows up the tutor by utilizing applicable skills from ${his} prior life as ${slave.career}. The service <span class="cash dec">will not offer a refund,</span> but does recognize ${him} as qualified to DJ a club, surprising no one.`;
					slave.skill.DJ = 200;
				} else {
					r += ` ${He} spends time with a tutor training to be an effective club manager and DJ.`;
					if (slave.skill.DJ <= 20) {
						r += ` The Club is crucial for your reputation, and the DJ is in charge of the club, so classes are quite demanding. ${He} is absolutely unskilled so the tutor is teaches ${him} the very basics. ${He} is undergoing military-like drills in dancing and composure.`;
					} else if (slave.skill.DJ <= 60) {
						r += ` ${He} is still quite inexperienced, although ${he} is at least not awkward in conversation anymore. ${His} classes are heavily focused on slut etiquette, dancing and composure, but ${his} moves are still stiff and unsure.`;
					} else if (slave.skill.DJ <= 120) {
						r += ` ${He} is already a skilled entertainer, yet ${his} DJ training continues. ${His} training is now more focused on putting ${him} in charge of the whole club facility, which serves to increase public opinion of ${his} owner. ${He} is taught how to make guests feel welcome, and how to manage ${his} employees. `;
					} else if (slave.skill.DJ <= 200) {
						r += ` Every movement and gesture of ${him} must engage the crowd. ${He} is so well-trained that ${his} sultry and inviting composure seems entirely natural. ${He} is also taught how to look after subordinate club sluts, to make sure they perform at their best and give the guests an unforgettable experience.`;
					}
					r += ` ${slaveSkillIncrease('DJ', slave, skillIncrease)}`;
				}
				break;
			case "Nurse":
				if (App.Data.Careers.Leader.nurse.includes(slave.career)) {
					r += ` ${He} shows up the tutor by utilizing applicable skills from ${his} prior life as ${slave.career}. The service <span class="cash dec">will not offer a refund,</span> but does recognize ${him} as qualified to run a clinic, surprising no one.`;
					slave.skill.nurse = 200;
				} else {
					r += ` ${He} spends time with a tutor training to be an effective clinical nurse.`;
					if (slave.skill.nurse <= 20) {
						r += ` ${He} is taught bedside manner, first aid and elementary physiology as basis for further medical tutoring.`;
					} else if (slave.skill.nurse <= 60) {
						r += ` During the week ${he} follows tutored instructions on doing common medical tests, preliminary diagnosis and the safe administering of drugs.`;
					} else if (slave.skill.nurse <= 120) {
						r += ` ${He} is busy watching lectures on physiology, pathology, biochemistry and other medical subjects under the supervision of a tutor.`;
					} else if (slave.skill.nurse <= 200) {
						r += ` In addition to many, lengthy lectures on medicine, ${he} studies emergency care and basic surgery in supervised simulations.`;
					}
					r += ` ${slaveSkillIncrease('nurse', slave, skillIncrease)}`;
				}
				break;
			case "Teacher":
				if (App.Data.Careers.Leader.schoolteacher.includes(slave.career)) {
					r += ` ${He} shows up the tutor by utilizing applicable skills from ${his} prior life as ${slave.career}. The service <span class="cash dec">will not offer a refund,</span> but does recognize ${him} as qualified to teach classes, surprising no one.`;
					slave.skill.teacher = 200;
				} else {
					r += ` ${He} spends time with a tutor training to be an effective teacher.`;
					if (slave.skill.teacher <= 20) {
						r += ` ${He} is so inept that the tutor has to teach ${him} the very basics before ${he} can progress any further. ${He} is given grammar and arithmetic lessons.`;
					} else if (slave.skill.teacher <= 60) {
						r += ` Now that ${he} has some understanding of the basics, the tutor has ${him} attend more advanced lectures on grammar, mathematics and pronunciation.`;
					} else if (slave.skill.teacher <= 120) {
						r += ` Having mastered basic skills, ${he} is now being taught how to teach others. The tutor sends ${him} to work at a local slave school.`;
					} else if (slave.skill.teacher <= 200) {
						r += ` ${He} now knows how to teach others, and is now taught how to teach students who do not speak the language, are disabled, be it physically or mentally or simply unwilling to learn.`;
					}
					r += ` ${slaveSkillIncrease('teacher', slave, skillIncrease)}`;
				}
				break;
			case "Attendant":
				if (App.Data.Careers.Leader.attendant.includes(slave.career)) {
					r += ` ${He} shows up the tutor by utilizing applicable skills from ${his} prior life as ${slave.career}. The service <span class="cash dec">will not offer a refund,</span> but does recognize ${him} as qualified to manage a spa, surprising no one.`;
					slave.skill.attendant = 200;
				} else {
					r += ` ${He} spends time with a tutor training to be an effective spa attendant.`;
					if (slave.skill.attendant <= 20) {
						r += ` This week, a tutor has ${him} wait on poolside clients while offering back-rubs, an exercise instilling, more than anything, calm patience.`;
					} else if (slave.skill.attendant <= 60) {
						r += ` ${He} practices massaging techniques with a tutor until ${his} hands are sore and then suffers through hours of listening to people's problems on an online helpline.`;
					} else if (slave.skill.attendant <= 120) {
						r += ` A tutor teaches ${him} relaxing physical therapies. Additionally ${he} attends a course on applied psychology concentrated on mental well-being and stress management.`;
					} else if (slave.skill.attendant <= 200) {
						r += ` ${He} spends the week watching lectures of psychiatry and physiotherapy, before attending a practical exam arranged by ${his} tutor.`;
					}
					r += ` ${slaveSkillIncrease('attendant', slave, skillIncrease)}`;
				}
				break;
			case "Matron":
				if (App.Data.Careers.Leader.matron.includes(slave.career)) {
					r += ` ${He} shows up the tutor by utilizing applicable skills from ${his} prior life as ${slave.career}. The service <span class="cash dec">will not offer a refund,</span> but does recognize ${him} as qualified to run a nursery, surprising no one.`;
					slave.skill.matron = 200;
				} else {
					r += ` ${He} spends time with a tutor training to be an effective nursery matron.`;
					if (slave.skill.matron <= 20) {
						r += ` The tutor teaches ${him} how to care for a body during pregnancy. To eat well, rest, and avoid strenuous activity.`;
					} else if (slave.skill.matron <= 60) {
						r += ` ${He} learns how to best prepare a body for a baby's birth. And how to take care of the baby after it has been born.`;
					} else if (slave.skill.matron <= 120) {
						r += ` The tutor has ${him} serve as a midwife at a local hospital. ${He} also attends lectures on child development and child psychology.`;
					} else if (slave.skill.matron <= 200) {
						r += ` ${He} continues attending lectures, but at the same time the tutor teaches ${him} how to take care of others while they are pregnant. ${He}'s quickly learning how to best rear children.`;
					}
					r += ` ${slaveSkillIncrease('matron', slave, skillIncrease)}`;
				}
				break;
			case "Stewardess":
				if (App.Data.Careers.Leader.stewardess.includes(slave.career)) {
					r += ` ${He} shows up the tutor by utilizing applicable skills from ${his} prior life as ${slave.career}. The service <span class="cash dec">will not offer a refund,</span> but does recognize ${him} as qualified to oversee servants, surprising no one.`;
					slave.skill.stewardess = 200;
				} else {
					r += ` ${He} spends time with a tutor training to be an effective stewardess.`;
					if (slave.skill.stewardess <= 20) {
						r += ` ${He} has no skill as a servant, so the tutor teaches ${him} the basics. What to clean, how to clean and using which products.`;
					} else if (slave.skill.stewardess <= 60) {
						r += ` Having been taught the basics, ${his} studies continue by following cleaning crews to various parts of your arcologies to get practical experience as well as become familiar with the cleaning routines of all sectors.`;
					} else if (slave.skill.stewardess <= 120) {
						r += ` The tutor has ${him} attend lectures on slave breaking and management, to prepare ${him} for running a facility. ${He} keeps working with the cleaning crews, but now takes command during outings.`;
					} else if (slave.skill.stewardess <= 200) {
						r += ` ${He} is familiar with every nook and cranny of your arcology. ${He} no longer accompanies your cleaning crews, instead ${he} organizes their deployments. ${He} is becoming an adept manager.`;
					}
					r += ` ${slaveSkillIncrease('stewardess', slave, skillIncrease)}`;
				}
				break;
			case "Milkmaid":
				if (App.Data.Careers.Leader.milkmaid.includes(slave.career)) {
					r += ` ${He} shows up the tutor by utilizing applicable skills from ${his} prior life as ${slave.career}. The service <span class="cash dec">will not offer a refund,</span> but does recognize ${him} as qualified to run a free range dairy, surprising no one.`;
					slave.skill.milkmaid = 200;
				} else {
					r += ` ${He} spends time with a tutor training to be an effective milkmaid.`;
					if (slave.skill.milkmaid <= 20) {
						r += ` The tutor teaches ${him} the basics. ${He} is taught what to eat to maximize fluid production, as well as how to milk udders.`;
					} else if (slave.skill.milkmaid <= 60) {
						r += ` Having been taught the basics, the tutor has ${him} work at a farm milking cows. ${He} also attends online lectures on nutrition and health.`;
					} else if (slave.skill.milkmaid <= 120) {
						r += ` Having been taught how to milk and how to take care of ones body to produce as much fluid as possible, ${his} training shifts to teach ${him} leadership skills.`;
					} else if (slave.skill.milkmaid <= 200) {
						r += ` ${He} is becoming an adept leader, who knows how to squeeze every last drop of milk and cum out of ${his} cows. The tutor believes ${he} will soon be able to run ${his} facility on ${his} own.`;
					}
					r += ` ${slaveSkillIncrease('milkmaid', slave, skillIncrease)}`;
				}
				break;
			case "Farmer":
				if (App.Data.Careers.Leader.farmer.includes(slave.career)) {
					r += ` ${He} shows up the tutor by utilizing applicable skills from ${his} prior life as ${slave.career}. The service <span class="cash dec">will not offer a refund,</span> but does recognize ${him} as qualified to run a farm, surprising no one.`;
					slave.skill.farmer = 200;
				} else {
					r += ` ${He} spends time with a tutor training to be an effective farmer.`;
					if (slave.skill.farmer <= 20) {
						r += ` The tutor has ${him} working on a farm, nothing beats practical learning. ${He} learns how to grow cops and how to care for farm animals.`;
					} else if (slave.skill.farmer <= 60) {
						r += ` Having become familiar with farming, the tutor now has ${him} attend lectures on the science behind it. ${His} knowledge greatly increases due to this.`;
					} else if (slave.skill.farmer <= 120) {
						r += ` ${He} oversees a group of farmhands as they care for the animals and plow the fields. Having mastered farming, ${he}'s now training ${his} leadership skills.`;
					} else if (slave.skill.farmer <= 200) {
						r += ` The tutor has ${him} lead an entire farm. ${He} manages every aspect, and does so admirably. ${He} is also introduced to a different side of slave farming, the "shows". It doesn't take long before ${he}'s overseeing those too.`;
					}
					r += ` ${slaveSkillIncrease('farmer', slave, skillIncrease)}`;
				}
				break;
			case "Wardeness":
				if (App.Data.Careers.Leader.wardeness.includes(slave.career)) {
					r += ` ${He} shows up the tutor by utilizing applicable skills from ${his} prior life as ${slave.career}. The service <span class="cash dec">will not offer a refund,</span> but does recognize ${him} as qualified to oversee a cellblock, surprising no one.`;
					slave.skill.wardeness = 200;
				} else {
					r += ` ${He} spends time with a tutor training to be an effective cellblock wardeness.`;
					if (slave.skill.wardeness <= 20) {
						r += ` A tutor takes ${him} through basic self-defense and the safe use of prison equipment.`;
					} else if (slave.skill.wardeness <= 60) {
						r += ` ${He} practices wrestling holds with a tutor, who also shows ${him} how to tie up resisting victims.`;
					} else if (slave.skill.wardeness <= 120) {
						r += ` The correctional psychology lectures ${he} watches this week are unburdened by ethics. ${He} learns how to handle prisoners more effectively.`;
					} else if (slave.skill.wardeness <= 200) {
						r += ` ${He} gets to study enhanced interrogation techniques from an experienced tutor, with ample demonstrations on live subjects, including ${himself}.`;
					}
					r += ` ${slaveSkillIncrease('wardeness', slave, skillIncrease)}`;
				}
				break;
			default:
				r += `tutorLessons ERROR unknown skill`;
		}
		if (tutorForSlave(slave)) {
			const skill = slave.skill[tutorKeyToSkillKey(tutorForSlave(slave))];
			r += ` ${He} is currently ${Math.round((skill / Constant.MASTERED_XP) * 100)}% through training and should be finished in approximately ${numberWithPluralOne(Math.round((Constant.MASTERED_XP - skill) / lessonSkillIncrease(slave)), "week")}.`;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function graduation(slave) {
		// can't graduate a slave not in the classroom
		if (slave.assignment !== Job.CLASSES) {
			return;
		}

		// check if the slave has something left to learn
		if (slave.intelligenceImplant < 15) {
			return;
		}
		if (slave.voice > 0 && slave.accent > 1 && (slave.accent > 2 || V.schoolroomUpgradeLanguage > 0)) {
			return;
		}
		if (slave.skill.oral <= 10 || slave.skill.whoring <= 10 ||
			slave.skill.entertainment <= 10 || slave.skill.anal <= 10 ||
			(V.schoolroomUpgradeSkills > 0 &&
				(
					slave.skill.oral <= 30 || slave.skill.whoring <= 30 ||
					slave.skill.entertainment <= 30 || slave.skill.anal <= 30
				))) {
			return;
		}
		if (slave.vagina >= 0 && (slave.skill.vaginal <= 10 || (V.schoolroomUpgradeSkills > 0 && slave.skill.vaginal <= 30))) {
			return;
		}
		if (penetrativeSocialUse() >= 40 && (slave.skill.penetrative <= 10 || (V.schoolroomUpgradeSkills > 0 && slave.skill.penetrative <= 30))) {
			return;
		}
		if (needsTutoring(slave)) {
			return;
		}

		// Throw the slave out
		r += ` ${He} can learn little from further classes, <span class="noteworthy">`;
		if (V.assignmentRecords[slave.ID]) {
			let oldJob = V.assignmentRecords[slave.ID];
			assignJobSafely(slave, oldJob);
			if (slave.choosesOwnAssignment === 1) {
				r += ` so ${he} takes a break before choosing another task.`;
				// @ts-ignore
			} else if (slave.assignment === Job.REST) {
				if (oldJob !== Job.REST) {
					r += ` and since ${he} was unable to return to ${his} old job (${oldJob}), ${his} assignment has defaulted to rest.`;
				} else {
					r += ` so ${he} has returned to resting.`;
				}
			} else {
				r += ` so ${he} goes back to ${oldJob}.`;
			}
		} else {
			r += ` so ${his} assignment has defaulted to rest.`;
			removeJob(slave, slave.assignment);
		}
		r += `</span>`;
	}
};
