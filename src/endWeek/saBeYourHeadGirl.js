/**
 * @param {FC.ReportSlave} slave
 * @returns {DocumentFragment}
 */
App.SlaveAssignment.beYourHeadGirl = function saBeYourHeadGirl(slave) {
	/** @type {(string|HTMLElement|DocumentFragment)[]} */
	const r = [];

	const arcology = V.arcologies[0];

	const {
		he, him, his, himself, He, His,
	} = getPronouns(slave);

	updateHGState(slave);
	jobPreface(slave);
	theHGLife(slave);
	if (V.personalAttention.task === PersonalAttention.SUPPORT_HG && !onBedRest(V.PC, true)) {
		playerHelpsHG(slave);
	}
	if (V.HGFormality === 0) {
		HGFormality(slave);
	}
	jobEffects(slave);
	if (slave.prestige === 0) {
		prestigeGain(slave);
	}
	cleanupVars(slave);

	return App.Events.makeNode(r);

	/**
	 * @param {FC.ReportSlave} slave
	 */
	function updateHGState(slave) {
		V.HGTimeInGrade += 1;
		if (V.HGSuite === 1) {
			slave.rules.living = "luxurious";
		}
		slave.rules.rest = "restrictive";
		tired(slave);
	}

	/**
	 * @param {FC.ReportSlave} slave
	 */
	function jobPreface(slave) {
		if (arcology.FSEgyptianRevivalistLaw === 0) {
			r.push(`helps manage your other slaves. ${He} helps them when they try and fail, and punishes them when they fail to try.`);
		} else {
			r.push(`serves as your Consort. Though ${he} is still your slave, ${his} status is scarcely below that of a citizen. ${He} <span class="green">contributes to your reputation</span> just like a Concubine, and ${he} is <span class="hotpink">conscious</span> of the <span class="mediumaquamarine">trust</span> you place in ${him}.`);
			slave.devotion += 1;
			slave.trust += 1;
			App.SlaveAssignment.pleaseYou(slave);
			if (slave.relationship > 4) {
				if (slave.relationshipTarget === V.ConcubineID) {
					const concubine = S.Concubine;
					if (areRelated(concubine, slave)) {
						const concubinePronouns = getPronouns(concubine);
						if (concubine.mother === slave.ID || concubine.father === slave.ID) {
							r.push(`Your Concubine is your Consort's ${concubinePronouns.daughter}-${concubinePronouns.wife}. Truly, ${arcology.name} looks up to you <span class="green">as children to a father.</span>`);
							repX(1000, "headGirl", slave);
						} else if (slave.mother === V.ConcubineID) {
							r.push(`Your Concubine is your Consort's mother-${concubinePronouns.wife}. Truly, ${arcology.name} looks up to you <span class="green">as children to a father.</span>`);
							repX(1000, "headGirl", slave);
						} else if (slave.father === V.ConcubineID) {
							r.push(`Your Concubine is your Consort's father-${concubinePronouns.wife}. Truly, ${arcology.name} looks up to you <span class="green">as children to a father.</span>`);
							repX(1000, "headGirl", slave);
						} else {
							switch (areSisters(slave, concubine)) {
								case 1:
									r.push(`Your Concubine is your Consort's twin-${concubinePronouns.wife}. Truly, ${arcology.name} looks up to you <span class="green">as children to a father.</span>`);
									repX(1000, "headGirl", slave);
									break;
								case 2:
									r.push(`Your Concubine is your Consort's ${concubinePronouns.sister}-${concubinePronouns.wife}. Truly, ${arcology.name} looks up to you <span class="green">as children to a father.</span>`);
									repX(1000, "headGirl", slave);
									break;
								case 3:
									r.push(`Your Concubine is your Consort's half-${concubinePronouns.sister}-${concubinePronouns.wife}. Truly, ${arcology.name} looks up to you <span class="green">as children to a father.</span>`);
									repX(1000, "headGirl", slave);
									break;
								default:
									r.push(`<span style="bold">Shit went wrong! Post this in a bug report!</span> This is <span class="red">NOT as it should be.</span>`);
									repX(500, "headGirl", slave);
							}
						}
					}
				} else {
					if (totalRelatives(slave) > 0) {
						const relation = getSlave(slave.relationshipTarget);
						const relationPronouns = getPronouns(relation);
						if (relation.mother === slave.ID || relation.father === slave.ID) {
							r.push(`Your Consort has a ${relationPronouns.daughter}-${relationPronouns.wife}. This is <span class="green">as it should be.</span>`);
							repX(500, "headGirl", slave);
						} else if (slave.mother === relation.ID) {
							r.push(`Your Consort has a mother-${relationPronouns.wife}. This is <span class="green">as it should be.</span>`);
							repX(500, "headGirl", slave);
						} else if (slave.father === relation.ID) {
							r.push(`Your Consort has a father-${relationPronouns.wife}. This is <span class="green">as it should be.</span>`);
							repX(500, "headGirl", slave);
						} else {
							switch (areSisters(slave, relation)) {
								case 1:
									r.push(`Your Consort has a twin-${relationPronouns.wife}. This is <span class="green">as it should be.</span>`);
									repX(500, "headGirl", slave);
									break;
								case 2:
									r.push(`Your Consort has a ${relationPronouns.sister}-${relationPronouns.wife}. This is <span class="green">as it should be.</span>`);
									repX(500, "headGirl", slave);
									break;
								case 3:
									r.push(`Your Consort has a half-${relationPronouns.sister}-${relationPronouns.wife}. This is <span class="green">as it should be.</span>`);
									repX(500, "headGirl", slave);
									break;
							}
						}
					}
				}
			}
		}
		if (App.EndWeek.saVars.HGEnergy === 0) {
			r.push(`${He} notices ${his} <span class="health dec">fatigue getting in the way</span> of training your slaves, so ${he} focuses ${his} attention on ${himself} this week to <span class="health inc">rectify this.</span>`);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * */
	function theHGLife(slave) {
		if (V.HGTimeInGrade > 12) {
			if (V.HGSuite === 1) {
				r.push(`Being continually trusted with this position <span class="hotpink">increases ${his} devotion to you,</span> and encourages ${him} to <span class="mediumaquamarine">trust you in turn;</span> ${he}'s also <span class="hotpink">grateful</span> for ${his} nice suite, which makes ${him} one of the best provided for slaves in the Free Cities.`);
				slave.devotion += 4;
				slave.trust += 4;
			} else if (slave.rules.living === "luxurious") {
				r.push(`Being continually trusted with this position <span class="hotpink">increases ${his} devotion to you</span> and encourages ${him} to <span class="mediumaquamarine">trust you in turn.</span>`);
				slave.devotion += 4;
				slave.trust += 4;
			} else {
				r.push(`Being continually trusted with this position <span class="hotpink">slightly increases ${his} devotion to you,</span> though ${he} harbors some doubts because ${he} isn't allowed a room of ${his} own to set ${him} apart from the other slaves.`);
				slave.devotion += 1;
			}
		} else {
			if (V.HGSuite === 1) {
				r.push(`${He}'s <span class="mediumaquamarine">grateful</span> for ${his} nice suite, which makes ${him} one of the best provided for slaves in the Free Cities.`);
				slave.trust += 4;
			} else if (slave.rules.living !== "luxurious" && slave.devotion <= 50) {
				r.push(`Given ${his} lofty position, ${he} <span class="mediumorchid">harbors some doubts</span> in ${his} value to you since ${he} isn't allowed a room of ${his} own to set ${him} apart from the other slaves.`);
				slave.devotion -= 2;
			}
		}
		if (slave.rules.living !== "luxurious") {
			r.push(`${His} duties are <span class="red">physically and mentally taxing,</span> especially with nothing more than a`);
			if (slave.rules.living === "normal") {
				r.push(`bed`);
			} else {
				r.push(`cot`);
			}
			r.push(`waiting for ${him} in the slave dormitory.`);
		}
		if (App.SlaveAssignment.PartTime.efficiencyModifier(slave) < 1) {
			r.push(`${His} part-time job takes time away from managing your slaves.`);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function playerHelpsHG(slave) {
		r.push(`You're cooperating with ${him} this week, working with ${V.assistant.name} to free up some of ${his} time so ${he} can target more slaves in need of individual attention.`);
		if (slave.trust > 95) {
			r.push(`${He} is so trusting of you that ${he} can act as your own right hand, allowing ${him} to oversee your slaves with remarkable efficiency.`);
		} else {
			r.push(`This arrangement <span class="mediumaquamarine">builds trust</span> between you.`);
			slave.trust += 2;
		}
		if (slave.health.tired > 30) {
			r.push(`It also takes a load off ${his} tired shoulders.`);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function HGFormality(slave) {
		if (slave.trust > 95) {
			r.push(`Every so often, when you're alone, ${he} calls you ${properTitle()}. ${He} treats your permission to do this as a sacred thing, and <span class="hotpink">loves you for it.</span>`);
			slave.devotion += 1;
		} else {
			r.push(`Your permission to be informal in private <span class="mediumorchid">confuses ${him}</span> a little, since ${he} isn't perfectly confident enough to be comfortable with the idea.`);
			slave.devotion -= 1;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function jobEffects(slave) {
		if (slave.fetishKnown === 1) {
			if (slave.fetish === Fetish.DOM) {
				if (slave.fetishKnown === 1 && slave.fetishStrength <= 95) {
					r.push(`Having all the slaves look up to and obey ${him} advances ${his} <span class="lightcoral">dominant tendencies.</span>`);
					slave.fetishStrength += 4;
				}
			} else if (fetishChangeChance(slave) > jsRandom(0, 100)) {
				r.push(`Having all the slaves look up to and obey ${him} affects ${his} sexuality, turning ${him} into a <span class="lightcoral">bit of a dominatrix.</span>`);
				fetishChange(slave, Fetish.DOM, 20);
			} else if (slave.fetishStrength <= jsRandom(20, 60)) {
				r.push(`The sheer variety of sexual situations ${he} sees and participates in <span class="pink">broaden ${his} sexual interests</span> and incline ${him} to take a dominant sexual role.`);
				slave.fetishStrength -= 4;
			}
		} else {
			if (slave.fetish === Fetish.DOM) {
				r.push(`Having all the slaves look up to and obey ${him} clearly excites ${him}; <span class="lightcoral">${he}'s a natural dom!</span>`);
				slave.fetishKnown = 1;
			} else if (fetishChangeChance(slave) > jsRandom(0, 100)) {
				r.push(`Having all the slaves look up to and obey ${him} affects ${his} sexuality, turning ${him} into a <span class="lightcoral">bit of a dominatrix.</span>`);
				fetishChange(slave, Fetish.DOM, 20);
			}
		}

		if (slave.rules.lactation === "induce") {
			r.push(`${He} works mammary stimulation into ${his} slave training regimen in an effort to bring in ${his} milk for you.`);
			r.push(induceLactation(slave, 3));
			if (slave.lactation === 1) {
				slave.rules.lactation = "maintain";
			}
		} else if (slave.rules.lactation === "maintain") {
			r.push(`Proper nursing and milking technique is a strong aspect of ${his} slave training regimen, both to keep ${his} milk flowing and to prevent the mounting pressure from distracting from ${his} work.`);
			slave.lactationDuration = 2;
			slave.boobs -= slave.boobsMilk;
			slave.boobsMilk = 0;
		}

		if (slave.dick > 0 && V.universalRulesImpregnation === "HG" && canPenetrate(slave)) {
			r.push(`${He} finds ${his} duty to impregnate slaves at will sexually satisfying.`);
			slave.need = 0;
		} else if (V.slaves.length > 5) {
			r.push(`Seldom a day goes by without ${him} finding an outlet among your slaves for ${his} sexual desires.`);
			slave.need = 0;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function prestigeGain(slave) {
		if (V.HGTimeInGrade + ((slave.intelligence + slave.intelligenceImplant) / 10) + (slave.devotion / 10) + (slave.trust / 10) > 50) {
			r.push(`${slave.slaveName} has rendered such long and competent service as your Head Girl that many of your citizens have come to rely on ${his} word as an extension of yours, trusting that if ${he} does something, it's because you trust ${him} to. <span class="green">${He} has become prestigious on ${his} own merits, a remarkable achievement for a slave!</span>`);
			slave.prestige += 1;
			slave.prestigeDesc = `Many citizens respect $his long and able service as your Head Girl.`;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function cleanupVars(slave) {
		if (!App.Data.Careers.Leader.HG.includes(slave.career) && slave.skill.headGirl < Constant.MASTERED_XP) {
			const skillIncrease = jsRandom(1, Math.ceil((slave.intelligence + slave.intelligenceImplant) / 15) + 8);
			r.push(slaveSkillIncrease('headGirl', slave, skillIncrease));
		}
		slave.health.tired = Math.clamp(slave.health.tired, 0, 1000);
	}
};
