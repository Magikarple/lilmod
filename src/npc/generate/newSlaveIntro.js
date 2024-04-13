/**
 * @param {FC.GingeredSlave} slave
 * @param {App.Entity.SlaveState} [slave2] recruiter slave, if present in the scene
 * @param {object} [obj]
 * @param {boolean} [obj.tankBorn]
 * @param {string} [obj.momInterest]
 * @param {string} [obj.dadInterest]
 * @returns {DocumentFragment}
 */
App.UI.newSlaveIntro = function(slave, slave2, {tankBorn = false, momInterest = "", dadInterest = ""} = {}) {
	const desc = SlaveTitle(slave);
	const {title: Master} = getEnunciation(slave);
	const {
		His, He, his, him, he, girl, hers, himself, woman, daughter
	} = getPronouns(slave);
	const {woman: womanP, girl: girlP} = getPronouns(V.PC);
	const hands = (hasBothArms(slave)) ? "hands" : "hand";

	const el = new DocumentFragment();
	let r;
	let p;
	let span;
	let brandTarget = V.brandTarget.primary;
	let scarTarget = V.scarTarget.primary;
	let PC = V.PC;

	newSlave(slave);

	modSetup();

	if (!tankBorn) {
		el.append(inspect());
	}

	if (slave.beforeGingering) {
		slave = slave.beforeGingering; // cancel gingering proxy, if it's still attached
	}

	el.append(choices());

	App.Utils.updateUserButton(); // Make sure the user button is up to date, since V.nextButton may have changed since it was created.

	return el;

	/**
	 * 	use the secondary location if the primary mark target won't work for this slave
	 */
	function modSetup() {
		if (slave.dick === 0) {
			if (V.brandTarget.primary === "penis") {
				brandTarget = V.brandTarget.secondary;
			}
			if (V.scarTarget.primary === "penis") {
				scarTarget = V.scarTarget.secondary;
			}
		}
		if (slave.balls === 0 && slave.scrotum === 0) {
			if (["left testicle", "right testicle"].includes(V.brandTarget.primary)) {
				brandTarget = V.brandTarget.secondary;
			}
			if (["left testicle", "right testicle"].includes(V.scarTarget.primary)) {
				scarTarget = V.scarTarget.secondary;
			}
		}
		if (slave.earShape === "none") {
			if (["left ear", "right ear"].includes(V.brandTarget.primary)) {
				brandTarget = V.brandTarget.secondary;
			}
			if (["left ear", "right ear"].includes(V.scarTarget.primary)) {
				scarTarget = V.scarTarget.secondary;
			}
		}
		if (getLeftArmID(slave) !== 1) {
			if (["left upper arm", "left lower arm", "left wrist", "left hand"].includes(V.brandTarget.primary)) {
				brandTarget = V.brandTarget.secondary;
			}
			if (["left upper arm", "left lower arm", "left wrist", "left hand"].includes(V.scarTarget.primary)) {
				scarTarget = V.scarTarget.secondary;
			}
		}
		if (getRightArmID(slave) !== 1) {
			if (["right upper arm", "right lower arm", "right wrist", "right hand"].includes(V.brandTarget.primary)) {
				brandTarget = V.brandTarget.secondary;
			}
			if (["right upper arm", "right lower arm", "right wrist", "right hand"].includes(V.scarTarget.primary)) {
				scarTarget = V.scarTarget.secondary;
			}
		}
		if (getLeftLegID(slave) !== 1) {
			if (["left thigh", "left calve", "left ankle", "left foot"].includes(V.brandTarget.primary)) {
				brandTarget = V.brandTarget.secondary;
			}
			if (["left thigh", "left calve", "left ankle", "left foot"].includes(V.scarTarget.primary)) {
				scarTarget = V.scarTarget.secondary;
			}
		}
		if (getRightLegID(slave) !== 1) {
			if (["right thigh", "right calve", "right ankle", "right foot"].includes(V.brandTarget.primary)) {
				brandTarget = V.brandTarget.secondary;
			}
			if (["right thigh", "right calve", "right ankle", "right foot"].includes(V.scarTarget.primary)) {
				scarTarget = V.scarTarget.secondary;
			}
		}
	}

	function inspect() {
		const el = new DocumentFragment();
		r = [];
		p = document.createElement("p");

		p.append(`The legalities completed, `);
		span = document.createElement("span");
		span.classList.add('slave-name');
		span.textContent = SlaveFullName(slave);
		p.append(span);
		p.append(" ");

		if (!hasAnyLegs(slave)) {
			if (isAmputee(slave)) {
				r.push(`lies`);
			} else {
				r.push(`rests`);
			}
			r.push(`helplessly on your desk,`);
		} else if (!canStand(slave)) {
			r.push(`kneels before your desk,`);
		} else {
			r.push(`stands before your desk,`);
		}
		if (slave.devotion < -50) {
			if (canSee(slave)) {
				r.push(`looking you in the eyes`);
			} else {
				r.push(`directly facing you`);
			}
			r.push(`with defiance.`);
		} else if (slave.devotion < -20) {
			if (canSee(slave)) {
				r.push(`looking at`);
			} else {
				r.push(`facing`);
			}
			r.push(`you sullenly.`);
		} else if (slave.trust <= 50) {
			r.push(`staring`);
			if (canSee(slave)) {
				r.push(`at the ground`);
			} else {
				r.push(`blankly downwards`);
			}
			r.push(`in fear.`);
		} else if (slave.devotion <= 50) {
			r.push(`waiting meekly for orders.`);
		} else if (canSmell(slave) && slave.career === "a breeding bull" && canGetPregnant(V.PC)) {
			r.push(`sniffing the air and`);
			if (canSee(slave)) {
				r.push(`staring`);
			} else {
				r.push(`pointing ${his} nose`);
			}
			r.push(`intently at your crotch.`);
		} else if (slave.origin === "$He submitted to enslavement to escape the hard life of an old world whore.") {
			r.push(`wondering what one of your working ${girl}s can expect.`);
		} else if ((slave.origin === "$He submitted to enslavement to get access to modern prenatal care.") || (slave.origin === "$He sold $himself into slavery out of fear that life on the streets was endangering $his pregnancy.")) {
			r.push(`hoping you'll give ${him} modern medicine right away.`);
		} else if (slave.origin === "$He submitted to enslavement as $his only way to obtain surgery to transform $him into a woman.") {
			r.push(`hoping you'll schedule ${his} reassignment surgery immediately.`);
		} else if (slave.origin === "$He submitted to enslavement out of a misguided desire to join a sexually libertine society.") {
			r.push(`hoping ${he}'s made the right decision, and fantasizing a little, to go by ${his} half-hard dick.`);
		} else if (slave.origin === "$He submitted to enslavement for a better chance at survival than $he had as a migrant.") {
			r.push(`wondering what life as a sex slave will be like.`);
		} else if (slave.origin === "$He came to you to escape being sold to a cruel master after $his producer informed $him of $his debt.") {
			r.push(`wondering if ${he} will get to continue to perform for your people even as a slave.`);
		} else {
			r.push(`looking shyly at you and blushing.`);
		}

		if (slave.gingering) {
			let seed = "sale";
			if (slave.gingering.detected) {
				if (slave.gingering.detection === "slaver") {
					seed = "sale, as your slaving experience revealed";
				} else if (slave.gingering.detection === "mercenary") {
					seed = "sale, as the seller admitted in the face of your intimidating reputation";
				} else if (slave.gingering.detection === "force") {
					seed = "sale, as the seller admitted in the face of your deadly reputation";
				} else {
					seed = "sale, as you suspected";
				}
			}

			if (slave.gingering.type === "antidepressant") {
				r.push(`${His} intake toxicology reveals that ${he} was`);
				if (slave.gingering.detected) {
					r.push(`indeed`);
				}
				r.push(`given antidepressants to make ${him} seem less fearful for ${seed}. ${He} is much less trusting than ${he} appeared in the market.`);
			} else if (slave.gingering.type === "depressant") {
				r.push(`${His} intake toxicology reveals that ${he} was`);
				if (slave.gingering.detected) {
					r.push(`indeed`);
				}
				r.push(`given a depressant to make ${him} seem less hateful for ${seed}. ${He} is much less obedient than ${he} appeared in the market.`);
			} else if (slave.gingering.type === "stimulant") {
				r.push(`${His} intake toxicology reveals that ${he} was`);
				if (slave.gingering.detected) {
					r.push(`indeed`);
				}
				r.push(`given a stimulant to make ${him} seem healthier for ${seed}. ${He} is much less vital than ${he} appeared in the market.`);
			} else if (slave.gingering.type === "vasoconstrictor") {
				r.push(`${His} intake toxicology reveals that ${he} was`);
				if (slave.gingering.detected) {
					r.push(`indeed`);
				}
				r.push(`given a vasoconstrictor to make ${his} cock seem more feminine for ${seed}. It's larger and more apt to become hard than it appeared in the market.`);
			} else if (slave.gingering.type === "vasodilator") {
				r.push(`${His} intake toxicology reveals that ${he} was`);
				if (slave.gingering.detected) {
					r.push(`indeed`);
				}
				r.push(`given a vasodilator to give ${him} an excessive erection for ${seed}. ${His} dick is somewhat smaller than it appeared in the market, and ${he}'s not really hard all the time.`);
			} else if (slave.gingering.type === "aphrodisiac") {
				r.push(`${His} intake toxicology reveals that ${he} was`);
				if (slave.gingering.detected) {
					r.push(`indeed`);
				}
				r.push(`given aphrodisiacs to make ${him} horny and attracted to everyone for ${seed}. ${His} true sex drive and sexuality remain to be discovered.`);
			} else {
				r.push(`A close inspection of ${his} anus reveals that ${he} was`);
				if (slave.gingering.detected) {
					r.push(`indeed`);
				}
				r.push(`doctored with an irritant to make ${him} present ${his} butt when shown for ${seed}. ${He} is not an actual anal sex enthusiast.`);
			}
			slave = slave.beforeGingering; // cancel gingering proxy from here on.
		}

		if (V.seeRace === 1) {
			if (slave.override_Race !== 1) {
				slave.origRace = slave.race;
			}
			if (slave.race !== slave.origRace) {
				r.push(`A blood test reveals that ${he} was originally ${slave.origRace}, not ${slave.race} ${(PC.skill.medicine >= 50 || PC.skill.slaving >= 50) ? `, just as you suspected` : ``}.`);
			}
		}
		if (slave.skin !== slave.origSkin) {
			if (slave.skin !== "sun tanned" && slave.skin !== "spray tanned") {
				r.push(`An epidermis scan reveals that ${his} skin was originally ${slave.origSkin}, not ${slave.skin}${(PC.skill.medicine >= 75 || PC.skill.slaving >= 75) ? `, just as you suspected` : ``}.`);
			}
		}

		slave.oldDevotion = slave.devotion;
		slave.oldTrust = slave.trust;

		if (slave.vagina < 0) {
			slave.skill.vaginal = 0;
		}

		if (slave.piercing.nipple.weight > 0) {
			if (slave.nipples === "partially inverted" || slave.nipples === "flat") {
				slave.nipples = "cute";
			} else if (slave.nipples === "inverted") {
				slave.nipples = "puffy";
			}
		}

		if (slave.vagina > -1 && slave.dick === 0) {
			if (PC.dick === 0 && PC.boobs >= 300) {
				r.push(`${He} looks to you and sees a fellow woman, and is <span class="mediumaquamarine">a little less afraid</span> that you will rape and abuse ${him}.`);
				slave.trust += 4;
			}
		} else if (slave.career === "a Futanari Sister") {
			if (PC.dick !== 0 && PC.boobs >= 300 && PC.vagina !== -1) {
				if (V.TFS.schoolPresent === 1) {
					r.push(`${He}'s heard of you, of course, as both a futanari yourself and a generous patron of the Sisters. ${He} feels <span class="mediumaquamarine">very lucky</span> that ${he}'s going to be your slave, not to mention <span class="hotpink">almost desperate</span> to have sex with you.`);
					slave.devotion += 10;
					slave.trust += 10;
				} else {
					if (canSee(slave)) {
						r.push(`Seeing`);
					} else {
						r.push(`Learning`);
					}
					r.push(`that you're a fellow futanari, ${he}'s <span class="mediumaquamarine">relieved</span> that ${he}'s going to be your slave, not to mention <span class="hotpink">quite eager</span> to have sex with you.`);
					slave.devotion += 5;
					slave.trust += 5;
				}
			}
		} else if ((slave.boobs > 400) && (slave.dick > 0)) {
			if (PC.dick !== 0 && (PC.boobs >= 400) || (PC.vagina !== -1)) {
				r.push(`${He} looks to you and sees a fellow intersex person, and is <span class="mediumaquamarine">rather hopeful</span> that ${he} will find you a sympathetic owner.`);
				slave.trust += 4;
			}
		}

		if ((slave.attrXX > 50) || (slave.energy > 95) && slave.behavioralFlaw !== "hates women" && slave.trust >= -20) {
			if (PC.boobs >= 400) {
				r.push(`${He} seems to think you're pretty, and is more willing to <span class="hotpink">try for your approval</span> than ${he} would otherwise be. ${He} glances at your rack when ${he} thinks you're not looking.`);
				slave.devotion += 4;
			}
		}

		if (slave.behavioralFlaw === "hates women" && slave.devotion <= 50) {
			if (PC.dick === 0 && PC.boobs >= 300) {
				r.push(`${He} obviously does not find you immediately attractive, and is <span class="mediumorchid">less eager to conciliate you</span> than ${he} would otherwise be.`);
				slave.devotion -= 5;
			}
		}

		if ((slave.attrXY > 50 || slave.energy > 95) && slave.behavioralFlaw !== "hates men" && slave.trust >= -20) {
			if (PC.dick !== 0 && PC.boobs < 300) {
				r.push(`${He} seems to think you're handsome, and is more willing to <span class="hotpink">try for your approval</span> than ${he} would otherwise be. ${He} glances at your crotch when ${he} thinks you're not looking.`);
				slave.devotion += 4;
			}
		}

		if (slave.devotion >= -20) {
			if (slave.actualAge > 35) {
				if (PC.visualAge < 35) {
					if ((slave.behavioralFlaw !== "hates men" && PC.title === 1) || (slave.behavioralFlaw !== "hates women" && PC.title === 0)) {
						r.push(`${He} tries to conceal ${his} surprise at your age, and keeps glancing at ${his} own naked body and then back at you, obviously wondering at such a <span class="hotpink">gorgeous young ${womanP}'s</span> interest in an old slave like ${him}.`);
						slave.devotion += 4;
					}
				}
			} else if (slave.actualAge < 25) {
				if (PC.visualAge >= 50) {
					if ((slave.behavioralFlaw !== "hates men" && PC.title === 1) || (slave.behavioralFlaw !== "hates women" && PC.title === 0)) {
						r.push(`${He} keeps stealing glances at your face, probably wrestling with ${his} feelings about your age. Eventually ${he} seems to relax and accept it, with a certain <span class="hotpink">obvious thrill</span> at ${his} own willingness towards an older`);
						if (PC.title === 1) {
							r.push(`man.`);
						} else {
							r.push(`lady.`);
						}
						slave.devotion += 4;
					}
				}
			}
		}

		if (PC.pregKnown === 1) {
			if (PC.career === "escort") { // switch to .belly
				if (PC.belly >= 1000) {
					if (slave.fetish === "pregnancy") {
						if (slave.fetishKnown === 0) {
							r.push(`${He} keeps stealing glances at your`);
							if (PC.belly >= 120000) {
								r.push(`massive`);
							} else if (PC.belly >= 60000) {
								r.push(`giant`);
							} else if (PC.belly >= 15000) {
								r.push(`huge`);
							} else if (PC.belly >= 5000) {
								r.push(`big`);
							}
							r.push(`baby bump.`);
							if (canAchieveErection(slave)) {
								r.push(`${His} dick rapidly hardening.`);
							}
							r.push(`You teasingly ask if ${he}'d like to feel it sometime, eliciting a delighted squeal from the ${girl}. <span class="green">${He}'s a pregnancy fetishist!</span>`);
							slave.fetishKnown = 1;
						} else {
							r.push(`${He} keeps stealing glances at your`);
							if (PC.belly >= 120000) {
								r.push(`massive`);
							} else if (PC.belly >= 60000) {
								r.push(`giant`);
							} else if (PC.belly >= 15000) {
								r.push(`huge`);
							} else if (PC.belly >= 5000) {
								r.push(`big`);
							}
							r.push(`baby bump.`);
							if (canAchieveErection(slave)) {
								r.push(`${His} dick rapidly hardening.`);
							}
							r.push(`As you inspect ${him}, you take care to gently brush your pregnancy across ${him} as you move. ${He} is practically bursting with lust by the end and <span class="hotpink">eager to please you</span> so ${he} can be close to that belly.`);
							slave.devotion += 5;
						}
					} else {
						r.push(`Your pregnancy is obvious to ${him}, which means two things: you won't be as capable of disciplining ${him}, leading ${him} to be <span class="mediumorchid">more willing to disobey,</span> and you going to be demanding and needy, possibly even <span class="gold">using force to get ${him} to do what you want.</span>`);
						slave.trust -= 10;
						slave.devotion -= 10;
					}
				}
			} else {
				if (PC.belly >= 1500) {
					if (slave.fetish === "pregnancy") {
						if (slave.fetishKnown === 0) {
							r.push(`${He} keeps stealing glances at your`);
							if (PC.belly >= 120000) {
								r.push(`massive`);
							} else if (PC.belly >= 60000) {
								r.push(`giant`);
							} else if (PC.belly >= 15000) {
								r.push(`huge`);
							} else if (PC.belly >= 5000) {
								r.push(`big`);
							}
							r.push(`baby bump.`);
							if (canAchieveErection(slave)) {
								r.push(`${His} dick rapidly hardening.`);
							}
							r.push(`You teasingly ask if ${he}'d like to feel it sometime, eliciting a delighted squeal from the ${girl}. <span class="green">${He}'s an impregnation fetishist!</span>`);
							slave.fetishKnown = 1;
						} else {
							r.push(`${He} keeps stealing glances at your`);
							if (PC.belly >= 120000) {
								r.push(`massive`);
							} else if (PC.belly >= 60000) {
								r.push(`giant`);
							} else if (PC.belly >= 15000) {
								r.push(`huge`);
							} else if (PC.belly >= 5000) {
								r.push(`big`);
							}
							r.push(`baby bump.`);
							if (canAchieveErection(slave)) {
								r.push(`${His} dick rapidly hardening.`);
							}
							r.push(`As you inspect ${him}, you take care to gently brush your pregnancy across ${him} as you move. ${He} is practically bursting with lust by the end and <span class="hotpink">eager to please you</span> so ${he} can be close to that belly.`);
							slave.devotion += 5;
						}
					} else {
						r.push(`Your pregnancy is obvious to ${him}, which means two things: you won't be as capable of disciplining ${him}, leading ${him} to be <span class="mediumorchid">more willing to disobey,</span> and you going to be demanding and needy, possibly even <span class="gold">using force to get ${him} to do what you want.</span>`);
						slave.trust -= 10;
						slave.devotion -= 10;
					}
				}
			}
		}

		if (PC.boobs >= 1400) {
			if (slave.fetish === "boobs") {
				if (slave.fetishKnown === 0) {
					r.push(`${He} keeps stealing glances at your huge rack${canAchieveErection(slave) ? `, ${his} dick rapidly hardening` : ``}. You stretch ${(canSee(slave)) ? `, giving ${him} a fantastic view of your breasts,` : ``} before circling around behind ${him} and cupping ${his} chest. Between your tits against ${his} back, and how teasingly big you are pretending ${his} breasts will be, ${he} can't contain ${himself}; ${he} cums from overstimulation, completely pinning ${him} <span class="green">as a breast fetishist!</span>`);
					slave.fetishKnown = 1;
				} else {
					r.push(`${He} keeps stealing glances at your huge rack${(canAchieveErection(slave)) ? `, ${his} dick rapidly hardening` : ``}. As you inspect ${him}, you take care to keep "accidentally" bumping ${him} with your tits, before "tripping" and landing with ${his} face buried in your chest. ${He} is practically bursting with lust by the end and <span class="hotpink">eager to please you</span> so ${he} can be close to those boobs.`);
					slave.devotion += 5;
				}
			}
		}

		if (V.enduringTrust > 20) {
			if (slave.trust >= -20) {
				r.push(`${He} notices that most of the slaves ${he} sees around your penthouse seem to trust you, and hopes that ${he} can <span class="mediumaquamarine">trust you,</span> too.`);
				slave.trust += 1;
			}
		} else {
			if (slave.trust < 50) {
				r.push(`${He} notices that most of the slaves ${he} sees around your penthouse seem to fear you, and starts to <span class="gold">fear you,</span> too.`);
				slave.trust -= 2;
			}
		}

		if (V.enduringDevotion > 20) {
			if (slave.devotion >= -20) {
				r.push(`${He} sees that most of the slaves ${he} sees around your penthouse like you, and hopes that ${he} can <span class="hotpink">like you</span> a little more ${himself}.`);
				slave.devotion += 1;
			}
		} else {
			if (slave.devotion <= 50) {
				r.push(`${He} sees that most of the slaves ${he} sees around your penthouse dislike you, and starts to <span class="mediumorchid">dislike you</span> a little more ${himself}.`);
				slave.devotion -= 2;
			}
		}

		if (PC.career === "escort" || PC.career === "prostitute" || (PC.career === "child prostitute" && PC.visualAge >= V.minimumSlaveAge)) {
			r.push(`${He} recognizes you as a whore, leading ${him} to <span class="defiant inc">fear you less;</span> however, ${his} views of you also leave ${him} less willing to <span class="mediumorchid">listen to you.</span>`);
			slave.devotion -= 10;
			slave.trust += 10;
		} else if (PC.career === "child prostitute") { // actually underage
			r.push(`${He} is <span class="devotion dec">disgusted to recognize such a young ${girlP} as a whore;</span> however, ${he} <span class="defiant inc">sees little reason to fear you.</span>`);
			slave.devotion -= 20;
			slave.trust += 20;
		} else if (PC.career === "servant" || PC.career === "handmaiden" || PC.career === "child servant") { // rework off clothes
			if (canSee(slave)) {
				r.push(`Seeing`);
			} else {
				r.push(`Having`);
			}
			r.push(`you in your`);
			if (PC.title === 0) {
				r.push(`maid's dress`);
			} else {
				r.push(`maid's outfit`);
			}
			r.push(`<span class="defiant inc">calms ${his} fears;</span> however, ${he} is unwilling to <span class="devotion dec">listen to a servant.</span>`);
			slave.devotion -= 3;
			slave.trust += 10;
		} else if (PC.career === "gang") {
			r.push(`${He} recognizes you from various crime reports, <span class="trust dec">filling ${him} with fear</span> over what life under you will be like.`);
			slave.trust -= 10;
		} else if ((PC.career === "hoodlum" || PC.career === "street urchin") && canSee(slave)) { // switch to tat?
			r.push(`${He} scoffs at first at being owned by such a colorful character, <span class="trust dec">but ${he} soon pales</span> once ${he} sees the gang signs adorning your neck.`);
			slave.trust -= 10;
		}

		if (canSee(slave)) {
			const intimidated = intimidationDegree(slave, PC);
			if (intimidated > 0) {
				r.push(`${He} finds your appearance intimidating, putting ${him} <span class="trust dec">on edge</span> around you.`);
			} else if (intimidated < 0) {
				r.push(`You don't look very intimidating, encouraging ${him} <span class="trust inc">to lower ${his} guard.</span>`);
			}
			slave.trust += 2 * intimidated;
		}

		if (PC.rumor === "force") {
			if (slave.devotion <= 20) {
				if (slave.trust > 0) {
					r.push(`${He} seems to have picked up rumors about your ruthlessness, and is <span class="gold">horrified into obedience.</span>`);
					slave.trust -= 25;
				} else if (slave.trust > -10) {
					r.push(`${He} seems to have picked up rumors about your ruthlessness, and is <span class="gold">terrified into obedience.</span>`);
					slave.trust -= 20;
				} else if (slave.trust >= -20) {
					r.push(`${He} seems to have picked up rumors about your ruthlessness, and is <span class="gold">frightened into obedience.</span>`);
					slave.trust -= 15;
				}
			}
		} else if (PC.rumor === "diligence") {
			r.push(`${He} seems to have picked up rumors about your probity, and is <span class="mediumaquamarine">less afraid of you</span> and more <span class="hotpink">willing to like you.</span>`);
			slave.devotion += 5;
			slave.trust += 5;
		}

		if (slave.accent >= 3) {
			if (slave.trust > 20) {
				r.push(`During the enslavement process so far, it became obvious to ${him} that ${he} can barely understand enough ${V.language} to understand orders. ${He}'s <span class="gold">frightened</span> by the sudden danger that ${he} won't be able to do what ${he}'s told, even if ${he} wants to.`);
				slave.trust -= 5;
			} else if (slave.devotion <= 20) {
				if (slave.intelligence + slave.intelligenceImplant > 50) {
					r.push(`${He} can barely understand the ${V.language} language, but ${he}'s smart enough to understand everything that's happening to ${him}. Even so, <span class="mediumaquamarine">some fear is deferred,</span> since the harsh realities of being a sex slave may not be clear to ${him} yet.`);
					slave.trust += 10;
				} else if (slave.intelligence + slave.intelligenceImplant >= -15) {
					r.push(`${He} can barely understand enough ${V.language} to understand what's happening to ${him}. This incapacity <span class="mediumaquamarine">defers a great deal of fear,</span> since ${his} exact future hasn't become clear to ${him} yet.`);
					slave.trust += 10;
				} else {
					r.push(`${He} can barely understand ${V.language} at all, and scarcely understands what's happening to ${him}. This leaves ${him} <span class="mediumaquamarine">unaware of how afraid ${he} should be,</span> since ${he}'s too stupid to figure it out without being told.`);
					slave.trust += 25;
				}
			}
		}

		if (V.arcologies[0].FSSupremacist >= 50) {
			if (slave.origin === "You sentenced $him to enslavement as a punishment for defying local racial segregation laws.") {
				if (slave.race === V.arcologies[0].FSSupremacistRace) {
					r.push(`${He} <span class="gold">rightfully fears for ${his} safety</span> now that you know that ${he} is ${addA(slave.origRace)} merely pretending to be your arcology's favored race.`);
					slave.trust -= 10;
				}
			} else if (slave.race === V.arcologies[0].FSSupremacistRace) {
				r.push(`${He} realizes that ${he}'s a member of the favored race in your arcology, and <span class="mediumaquamarine">hopes</span> this will earn ${him} good treatment.`);
				slave.trust += 2;
			} else {
				r.push(`${He} realizes that ${he}'s not a member of the favored race in your arcology, and <span class="gold">fears</span> this will earn ${him} extra abuse.`);
				slave.trust -= 4;
			}
		}

		if (V.arcologies[0].FSSubjugationist >= 50) {
			if (slave.origin === "You sentenced $him to enslavement as a punishment for defying local racial segregation laws.") {
				if (slave.origRace === V.arcologies[0].FSSubjugationistRace) {
					r.push(`${He} <span class="gold">rightfully fears for ${his} future</span> now that you know that ${he} is a subhuman ${slave.origRace} with the gall to pretend otherwise.`);
					slave.trust -= 10;
				}
			} else if (slave.race !== V.arcologies[0].FSSubjugationistRace) {
				r.push(`${He} realizes that ${he}'s not one of the people considered subhuman here, and <span class="mediumaquamarine">hopes</span> this will allow ${him} to avoid some abuse.`);
				slave.trust += 2;
			} else {
				r.push(`${He} realizes that ${he}'s one of the people considered subhuman here, and <span class="gold">fears</span> ${he} will be unable to avoid degradation.`);
				slave.trust -= 4;
			}
		}

		if (V.arcologies[0].FSIntellectualDependency >= 50) {
			if (slave.intelligence <= -50) {
				r.push(`${He} realizes that your arcology values dumb slaves and <span class="mediumaquamarine">hopes</span> ${he}'ll fit in with ${his} low intelligence.`);
				slave.trust += 2;
			}
		}

		if (V.arcologies[0].FSSlaveProfessionalism >= 50) {
			if (slave.intelligence + slave.intelligenceImplant >= 75) {
				r.push(`${He} realizes that your arcology values intelligence and <span class="mediumaquamarine">expects</span> ${his} intellect will prove ${his} worth.`);
				slave.trust += 2;
			} else if (slave.intelligence + slave.intelligenceImplant < 10) {
				r.push(`${He} realizes that your arcology values intelligence and <span class="gold">worries</span> ${he} isn't smart enough to keep up with society's expectations.`);
				slave.trust -= 4;
			}
		}

		if (V.arcologies[0].FSRepopulationFocus >= 50) {
			if (slave.pregKnown === 1) {
				r.push(`${He} realizes that your arcology values bearing children and <span class="mediumaquamarine">hopes</span> ${he}'ll be treated gently for being pregnant.`);
				slave.trust += 2;
			}
		}

		if (V.arcologies[0].FSRestart >= 50) {
			if (slave.pregKnown === 0) {
				r.push(`${He} recognizes ${his} place in society and <span class="mediumaquamarine">is glad</span> ${he} isn't pregnant.`);
				slave.trust++;
			}
		}

		if (V.arcologies[0].FSGenderRadicalist >= 50) {
			if (slave.dick > 0) {
				if (slave.anus > 0) {
					r.push(`${He} realizes that your arcology accepts girls with dicks who take it up the ass, and since ${he} qualifies, ${he} <span class="mediumaquamarine">hopes</span> to be well treated here.`);
					slave.trust += 2;
				} else {
					r.push(`${He} realizes that girls with dicks take it up the butt here, and <span class="gold">fears</span> for ${his} virgin anus.`);
					slave.trust -= 4;
				}
			}
		}

		if (V.arcologies[0].FSGenderFundamentalist >= 50) {
			if (slave.dick === 0) {
				r.push(`${He} realizes that ${he} has a chance of conforming to gender roles in your arcology, and <span class="mediumaquamarine">hopes</span> to avoid abuse this way.`);
				slave.trust += 2;
			} else {
				r.push(`${He} realizes that your arcology's culture looks down on ${girl}s like ${him}, and <span class="gold">fears</span> ${he}'ll be abused as a result.`);
				slave.trust -= 4;
			}
		}

		if (V.arcologies[0].FSPaternalist >= 50) {
			r.push(`${He} realizes that your arcology's citizens look after their slaves, you more than anyone, and <span class="mediumaquamarine">hopes</span> ${he}'ll do well here.`);
			slave.trust += 2;
		}

		if (V.arcologies[0].FSDegradationist >= 50) {
			r.push(`${He} realizes that for ${him}, your arcology is likely to be a hell unending, and is <span class="gold">terrified.</span>`);
			slave.trust -= 5;
		}

		if (V.arcologies[0].FSBodyPurist >= 50) {
			if (slave.boobsImplant > 0 || slave.buttImplant > 0 || slave.waist < -95 || slave.lipsImplant > 0 || slave.faceImplant >= 30) {
				r.push(`${He} realizes that your arcology disapproves of body modifications like ${hers}, and <span class="gold">fears</span> that ${he} will be subjected to further surgery to purify ${him}.`);
				slave.trust -= 4;
			} else {
				r.push(`${He} realizes that your arcology approves of natural bodies like ${hers}, and <span class="mediumaquamarine">trusts</span> that ${he} will be allowed to keep it that way.`);
				slave.trust += 2;
			}
		}

		if (V.arcologies[0].FSTransformationFetishist >= 50) {
			if (slave.boobsImplant > 0 || slave.buttImplant > 0 || slave.waist < -95 || slave.lipsImplant > 0 || slave.faceImplant >= 30) {
				r.push(`${He} realizes that your arcology approves of body modifications like ${hers}, and <span class="mediumaquamarine">trusts</span> that ${he} will be valued for them.`);
				slave.trust += 2;
			} else {
				r.push(`${He} realizes that your arcology disapproves of natural bodies like ${hers}, and <span class="gold">fears</span> that ${he} will soon be a plastic surgeon's plaything.`);
				slave.trust -= 4;
			}
		}

		if (V.arcologies[0].FSMaturityPreferentialist >= 50) {
			if (slave.actualAge > 30) {
				r.push(`${He} realizes that your arcology appreciates older ${girl}s, and <span class="mediumaquamarine">hopes</span> it'll be nicer here.`);
				slave.trust += 2;
			}
		}

		if (V.arcologies[0].FSYouthPreferentialist >= 50) {
			if (slave.actualAge > 30) {
				r.push(`${He} realizes that your arcology has little use for older ${girl}s, and <span class="gold">fears</span> ${he}'ll be abused here.`);
				slave.trust -= 4;
			} else if (slave.actualAge < 18) {
				/* begin is a child block */
				/* Set understands to 0 or 1 to reflect whether ${he} understands. */
				let understands = 0;
				if ((slave.origin === "$He was raised in a radical slave school that treated $him from a very young age, up to the point that $he never experienced male puberty.") || (slave.origin === "$He was raised in a radical slave school that treated $him with drugs and surgery from a very young age.") || (slave.origin === "$He was brought up in a radical slave school to match $his twin.")) {
					understands = 1;
				} else if (isSexuallyPure(slave)) {
					if (slave.intelligence > jsRandom(0, 50)) {
						understands = 1;
					}
				} else {
					if (slave.intelligence > jsRandom(-50, 50)) {
						understands = 1;
					}
				}
				if (understands < 1) {
					r.push(`${He} has heard that you like little ${girl}s and is <span class="mediumaquamarine">reassured</span> because ${he} misunderstands what this means.`);
					slave.trust += 2;
				} else if (slave.sexualQuirk === "perverted") {
					r.push(`${He} has heard that you like little ${girl}s and <span class="mediumaquamarine">hopes</span> that matching your taste means ${he} will be treated well.`);
					slave.trust += 2;
				} else if ((slave.sexualQuirk === "size queen") && PC.dick !== 0) {
					r.push(`${He} has heard that you like little ${girl}s and <span class="hotpink">bites ${his} lip</span> at the thought of how big your dick will be inside ${him}.`);
					slave.devotion += 2;
				} else if ((slave.sexualFlaw === "repressed") || (slave.sexualFlaw === "shamefast") || (slave.behavioralFlaw === "devout")) {
					r.push(`${He} has heard that you like little ${girl}s and is <span class="gold">terrified</span> because ${he} understands exactly what that means.`);
					slave.trust -= 5;
				} else if ((slave.sexualFlaw === "hates oral") || (slave.sexualFlaw === "hates anal") || (slave.sexualFlaw === "hates penetration") || (isSexuallyPure(slave) && (50 >= jsRandom(1, 100)))) {
					r.push(`${He} has heard that you like little ${girl}s and <span class="gold">fears</span> what you might do to ${him}.`);
					slave.trust -= 4;
				} else {
					r.push(`${He} has heard that you like little ${girl}s and <span class="mediumaquamarine">hopes</span> that matching your taste means ${he} will be treated well.`);
					slave.trust += 2;
				}
				/* end is a child block */
			}
		}

		if (V.arcologies[0].FSPetiteAdmiration >= 50) {
			if (heightPass(slave)) {
				r.push(`${He} realizes that your arcology favors short slaves, and <span class="mediumaquamarine">hopes</span> life will be good here.`);
				slave.trust += 2;
			}
		}

		if (V.arcologies[0].FSStatuesqueGlorification >= 50) {
			if (heightPass(slave)) {
				r.push(`${He} realizes that your arcology favors the tall, and <span class="mediumaquamarine">hopes</span> ${he}'ll retain some dignity.`);
				slave.trust += 2;
			} else {
				r.push(`${He} realizes that your arcology favors the tall, and <span class="gold">anticipates</span> ${his} lacking height to bring ${him} nothing but torment.`);
				slave.trust -= 4;
			}
		}

		if (V.arcologies[0].FSSlimnessEnthusiast >= 50) {
			if (slave.boobs < 500 && slave.butt < 3 && slave.weight <= 10 && slave.muscles <= 30) {
				r.push(`${He} realizes that ${he} has a fashionable body for your arcology, and <span class="mediumaquamarine">hopes</span> it'll earn ${him} some kindness.`);
				slave.trust += 2;
			}
		}

		if (V.arcologies[0].FSAssetExpansionist >= 50) {
			if (slave.butt > 4 && slave.boobs > 800) {
				r.push(`${He} realizes that ${he} has a fashionable body for your arcology, and <span class="mediumaquamarine">hopes</span> it'll earn ${him} some kindness.`);
				slave.trust += 2;
			}
		}

		if (V.arcologies[0].FSPastoralist >= 50) {
			if (slave.pregKnown === 1 || slave.lactation > 0) {
				r.push(`${He} realizes that your arcology values slaves with motherly bodies, and <span class="mediumaquamarine">hopes</span> ${he} won't be a low value slave for having one.`);
				slave.trust += 2;
			}
		}

		if (V.arcologies[0].FSPhysicalIdealist >= 50) {
			if (slave.muscles > 5) {
				r.push(`${He} realizes that muscles are respected around here, and though ${he} isn't truly swole, ${he}'s partway there; ${he} <span class="mediumaquamarine">hopes</span> ${he}'ll be kept healthy and strong.`);
				slave.trust += 2;
			}
		}

		if (V.arcologies[0].FSHedonisticDecadence >= 50) {
			if (slave.behavioralFlaw === "gluttonous") {
				r.push(`${He} realizes that fat slaves are preferred around here, and as a glutton, can't wait to <span class="mediumaquamarine">eat ${himself} sick.</span>`);
				slave.trust += 2;
			} else if ((slave.weight > 130) && slave.behavioralFlaw !== "anorexic") {
				r.push(`${He} realizes that fat slaves are preferred around here, and since ${he} is quite rotund already, ${he} <span class="mediumaquamarine">hopes</span> ${he}'ll fit right in. That and if the cafeteria is open 24/7.`);
				slave.trust += 2;
			} else if ((slave.weight > 10) && slave.behavioralFlaw !== "anorexic") {
				r.push(`${He} realizes that chubby slaves are preferred around here, and though ${he} isn't truly fat, ${he}'s partway there; ${he} <span class="mediumaquamarine">hopes</span> ${he}'ll be kept well fed and happy.`);
				slave.trust += 2;
			} else if (slave.behavioralFlaw === "anorexic") {
				r.push(`${He} realizes that fat slaves are preferred around here, and that means ${he}'ll <span class="gold">be made fat too.</span>`);
				slave.trust += 2;
			}
		}

		if (V.arcologies[0].FSChattelReligionist >= 50) {
			if (slave.intelligence + slave.intelligenceImplant < -50) {
				r.push(`${His} dimwitted mind naturally takes to being told ${his} role as a slave is righteous, and ${he} naïvely <span class="mediumaquamarine">hopes</span> your arcology's religion will protect ${him} from harm.`);
				slave.trust += 2;
			} else if (slave.intelligence + slave.intelligenceImplant > 50) {
				r.push(`${His} intelligent mind <span class="gold">fears</span> the consequences of living in an arcology in which slavery has taken on religious significance.`);
				slave.trust -= 4;
			}
		}

		if (V.arcologies[0].FSRomanRevivalist >= 50) {
			if (slave.intelligence + slave.intelligenceImplant > 50) {
				r.push(`Though ${he} knows it's not a truly authentic Roman restoration, ${his} intelligent mind grasps the potential benefits of Roman mores for slaves, and ${he} <span class="mediumaquamarine">hopes</span> life in your arcology will be managed with virtue.`);
				slave.trust += 2;
			}
		} else if (V.arcologies[0].FSAztecRevivalist >= 50) {
			if (slave.intelligenceImplant >= 15) {
				r.push(`Though ${he} knows it's not a truly authentic ancient Aztec restoration, ${his} educated mind grasps the potential benefits of ancient Aztec mores for slaves, and ${he} <span class="mediumaquamarine">hopes</span> your arcology will make respectful use of ${his} devotion.`);
				slave.trust += 2;
			}
		} else if (V.arcologies[0].FSNeoImperialist >= 50) {
			if (slave.intelligenceImplant >= 15) {
				r.push(`Though ${he} is suspicious of your syncretic society and its use of high technology to enforce feudal norms, ${his} educated mind grasps the potential benefits of a rigid honor-based society for slaves, and ${he} <span class="mediumaquamarine">hopes</span> your arcology will treat ${him} fairly if ${he} displays ${his} obedience.`);
				slave.trust += 2;
			}
		} else if (V.arcologies[0].FSEgyptianRevivalist >= 50) {
			if (slave.intelligenceImplant >= 15) {
				r.push(`Though ${he} knows it's not a truly authentic ancient Egyptian restoration, ${his} educated mind grasps the potential benefits of ancient Egyptian mores for slaves, and ${he} <span class="mediumaquamarine">hopes</span> your arcology will make good and respectful use of ${his} learning.`);
				slave.trust += 2;
			}
		} else if (V.arcologies[0].FSEdoRevivalist >= 50) {
			if (slave.intelligenceImplant >= 15) {
				r.push(`Though ${he} knows it's not a truly authentic feudal Japanese restoration, ${his} educated mind grasps the potential benefits of traditional Japanese mores for slaves, and ${he} <span class="mediumaquamarine">hopes</span> your arcology will treat those who behave well with a modicum of honor.`);
				slave.trust += 2;
			}
		} else if (V.arcologies[0].FSArabianRevivalist >= 50) {
			if (slave.intelligenceImplant >= 15) {
				r.push(`Though ${he} knows it's not a truly authentic restoration of the old Caliphate, ${his} educated mind grasps the potential benefits of old Arabian law and culture for slaves, and ${he} <span class="mediumaquamarine">hopes</span> your arcology has absorbed enough of the old wisdom to respect slaves.`);
				slave.trust += 2;
			}
		} else if (V.arcologies[0].FSChineseRevivalist >= 50) {
			if (slave.intelligenceImplant >= 15) {
				r.push(`Though ${he} knows it's not a truly authentic ancient Chinese restoration, ${his} educated mind grasps the potential benefits of ancient Confucian philosophy for slaves, and ${he} <span class="mediumaquamarine">hopes</span> your arcology at least maintains some pretense of order and conservatism.`);
				slave.trust += 2;
			}
		} else if (V.arcologies[0].FSAntebellumRevivalist >= 50) {
			if (slave.intelligenceImplant >= 15) {
				r.push(`Though ${he} knows it's not a truly authentic restoration of the Antebellum South, ${his} educated mind grasps the potential benefits of Southern mores for slaves, and ${he} <span class="mediumaquamarine">hopes</span> your arcology will put ${him} in a treasured position.`);
				slave.trust += 2;
			}
		}

		if (V.arcologies[0].FSPaternalistLaw === 1) {
			r.push(`${He}`);
			if (canSee(slave)) {
				r.push(`saw`);
			} else if (canHear(slave)) {
				r.push(`overheard`);
			} else {
				r.push(`passed through`);
			}
			r.push(`a good deal of your arcology and its society on ${his} way to your penthouse, and was amazed by all the happy, healthy slaves. ${He} <span class="mediumaquamarine">begins to trust</span> that ${he}'ll be one of them, and <span class="hotpink">anticipates meeting</span> the person who built this place.`);
			slave.trust += 4;
			slave.devotion += 4;
		}

		if (canSee(slave) && V.eventResults.artifactsBought?.includes("chinese") && ["Chinese", "Taiwanese", "Mongolian", "Vietnamese"].includes(slave.nationality)) {
			r.push(`${He} stares for a moment at the large, ancient wooden statue of the benevolent Guan Yin Bodhisattva. As far as you know, it doesn't actually have any supernatural power, but ${he}'s still <span class="trust inc">reassured</span> by the nearby presence of the "Goddess of Mercy and Compassion."`);
			slave.trust += 2;
			if (slave.intelligence + slave.intelligenceImplant > 50) {
				if (V.arcologies[0].FSPaternalist >= 50) {
					r.push(`The fact that you seem to earnestly follow Guan Yin in your compassion makes ${him} <span class="devotion inc">like you more.</span>`);
					slave.devotion += 2;
				} else if (V.arcologies[0].FSDegradationist >= 50) {
					r.push(`The place of honor for Guan Yin does not square with your distinct lack of compassion for your slaves, though, and ${he} begins to think of you as <span class="devotion dec">unfaithful and deceitful.</span>`);
					slave.devotion -= 2;
				}
			}
		}

		if (slave.devotion < -50 && slave.rudeTitle !== 1) {
			if (jsRandom(-100, 0) >= slave.devotion) {
				slave.rudeTitle = 1;
				slave.custom.title = App.Data.misc.badNames.random();
				slave.custom.titleLisp = lispReplace(slave.custom.title);
			}
		}
		$(p).append(r.join(" "));
		$(el).append(p);
		return el;
	}

	function choices() {
		const el = new DocumentFragment();
		let p;
		let div;
		let linkArray = [];
		const hands = hasBothArms(slave) ? "arms" : "arm";
		const wrists = hasBothArms(slave) ? "wrists" : "wrist";
		const knees = hasBothLegs(slave) ? "knees" : "knee";
		const ankles = hasBothLegs(slave) ? "ankles" : "ankle";
		const feet = hasBothLegs(slave) ? "feet" : "foot";

		function introText(text) {
			if (text) {
				App.UI.DOM.appendNewElement("span", p, ", " + text, "note");
			}
		}

		/**
		 *
		 * @param {object} param0
		 * @param {string} [param0.linkName]
		 * @param {function(App.Entity.SlaveState):string|DocumentFragment} [param0.result]
		 * @param {boolean} [param0.requirements]
		 * @param {string} [param0.note]
		 */
		function choice({linkName, result, requirements, note} = {}) {
			if (requirements === false) {
				return;
			}
			let span = document.createElement("span");
			span.append(
				App.UI.DOM.link(
					linkName,
					() => {
						jQuery("#introResult").empty().append(result(slave));
					}
				)
			);

			if (note) {
				App.UI.DOM.appendNewElement("span", span, ` ${note}`, "note");
			}

			linkArray.push(span);
		}

		if (slave.breedingMark === 1) {
			// TODO: this entire section is super weird and should be rewritten
			// el.append(`${He} knows ${his} duty in life and playfully splays ${himself} across your desk with ${his} legs spread wide. Unfortunately, ${he} must first be unwrapped before any breeding can begin, so for the time being, ${he} rights ${himself} and makes ${his} way to your crotch to show you just how much ${he} was worth the ¤.`);
			// actX(slave, "oral");
		} else {
			if (V.rulesAssistantAuto === 0) {
				div = document.createElement("div");
				div.id = "rules";
				div.append(
					App.UI.DOM.link(
						"Apply default rules",
						() => {
							jQuery("#rules").empty().append(DefaultRules(slave));
						}
					)
				);
				if (slave.devotion <= 20) {
					div.append(` Will not apply many cosmetic and surgical options since ${he} is not obedient`);
				}
				el.append(div);
			}
			p = document.createElement("p");
			p.id = "introResult";
			el.append(p);
			App.UI.DOM.appendNewElement("span", p, `Now might be a good time to introduce ${him} to life in your stable of sex slaves`, "note");

			switch (slave.origin) {
				case "$He submitted to enslavement to escape the hard life of an old world whore.":
					introText(`and since ${he} wanted to leave the old world...`);
					choice({
						linkName: `Brand ${him} on the ${brandTarget} to introduce ${him} to life as a slave whore`,
						result: function(slave) {
							const r = [];
							r.push(`You tell ${him} you'll be marking ${him} as one of your working ${girl}s. ${He} looks resigned as ${he} follows you to the body modification studio, and lets you strap ${him} down with ${his} ${brandTarget} bare. ${He} understands what's coming. You've got ${him} positioned just right${canDoAnal(slave) ? `, so your cock slides up ${his} experienced asshole easily` : ``}. You bring the brand in close so ${he} can feel the radiated heat, which breaks through even ${his} jaded exterior and makes ${him} tighten with fear. When you're close, you apply the brand${canDoAnal(slave) ? `, making the poor whore cinch ${his} sphincter down hard in agony, bringing you to climax` : ``}. ${He} knows you know how to <span class="gold">apply pain,</span> now, and ${he} <span class="mediumorchid">learns to dislike you</span> even as ${his} <span class="health dec">wound</span> heals.`);
							if (canDoAnal(slave)) {
								r.push(VCheck.Anal(slave, 1));
							}
							applyBrand();
							App.Events.refreshEventArt(slave);
							return r.join(" ");
						},
					});
					break;
				case "$He used to be a Knight within your arcology, until you had $him stripped of $his title and summarily enslaved for cruelly abusing citizens beneath $his stature.":
					introText(`and since ${he} used to be a noble Imperial Knight of high status...`);
					choice({
						linkName: `Brand ${him} on the ${brandTarget} to make it clear that ${his} life of luxury and prestige is over`,
						result: function(slave) {
							const r = [];
							r.push(`The former knight stands in front of you, glaring down as you casually announce that you'll be branding ${his} ${brandTarget} to mark ${him} as property. ${He}'s an absolutely enormous mass of corded muscle, all of it on naked display, and the furious glint in ${his} eyes makes it look like ${he}'s thinking about snapping you in two at any moment. As the captive ${woman} tries ${his} best to silently intimidate you, you laugh, once, and bring your face up close to ${his}, making it disturbingly clear that ${his} muscle and strength is no use anymore. Escorted by your drones, you bring the ex-Knight to the body modification studio, strap ${him} down, and take your time to heat up the brand before bringing it to ${his} virgin flesh with a sudden ferocity that makes the huge ${woman} scream in agony. As ${he} writhes and thrashes under the straps, ${he} gets his first taste of <span class="gold">genuine pain,</span> and ${he} <span class="mediumorchid">hates you</span> even more than ${he} did before as ${his} <span class="health dec">wound</span> heals.`);
							applyBrand();
							App.Events.refreshEventArt(slave);
							return r.join(" ");
						},
					});
					break;
				case "$He submitted to enslavement to get access to modern prenatal care.":
					introText(`and since ${he}'s worried about ${his} child...`);
					choice({
						linkName: `Manipulate ${his} fear for ${his} pregnancy`,
						result: function(slave) {
							const r = [];
							r.push(`You place a curative injector on your desk, and describe its remarkable medical powers in detail, before mentioning its extreme cost. ${His} face rises at the first part and falls at the second. You tell ${him} that if ${he}'s a perfect sex slave, ${he}'ll get as much as ${he} needs, and that ${he} can start by sucking you off. ${He} grunts a little as ${he} hurries to get ${his} pregnant body down to ${his} knees, but`);
							if (PC.dick > 0) {
								r.push(`works your cock`);
							} else if (PC.vagina > 0) {
								r.push(`explores your vagina`);
							} else {
								r.push(`licks you to orgasm`);
							}
							r.push(`with almost desperate enthusiasm. You stroke ${his} hair comfortingly as ${he} does, and inject the healing dose into ${his} shoulder. ${He} murmurs ${his} <span class="hotpink">gratitude</span> into your dick, but <span class="gold">fears</span> for ${his} pregnancy.`);
							slave.devotion += 4;
							slave.trust -= 10;
							actX(slave, "oral");
							return r.join(" ");
						},
					});
					break;
				case "$He offered $himself as a slave to escape the horrors a blind $girl faces on the streets.":
					introText(`and since ${he} loathes ${his} pregnancy...`);
					choice({
						linkName: `Abort ${his} child`,
						result: function(slave) {
							const r = [];
							r.push(`You loudly place an innocuous-looking drug injector on your desk, and let ${him} think about it for a long moment. Then, you declare exactly what made that sound: abortifacients. After a moment of comprehension, ${his} mood instantly improves. ${He} pledges to <span class="hotpink">submit to you,</span>`);
							if (PC.dick !== 0 && PC.vagina !== -1) {
								r.push(`suck your cock, take it in ${his} pussy, take it up ${his} ass, eat you out,`);
							} else if (PC.dick !== 0) {
								r.push(`suck your cock, take it in ${his} pussy, take it up ${his} ass,`);
							} else {
								r.push(`eat you out, worship you with ${his} pussy, serve you with ${his} ass,`);
							}
							r.push(`anything, as long as you <span class="mediumaquamarine">remove ${his} rape baby.</span> You observe that ${he}'ll do all of those things, regardless of what you decide to do about ${his} pregnancy, but for now, you'll let ${him} terminate it; ${he} needs all the nutrients for ${himself} right now. ${He} thanks you through ${his} tears.`);
							slave.devotion += 4;
							slave.trust += 3;
							TerminatePregnancy(slave);
							actX(slave, "abortions");
							App.Events.refreshEventArt(slave);
							return r.join(" ");
						},
					});
					break;
				case "$He submitted to enslavement for a better chance at survival than $he had as a migrant.":
					introText(`and since ${he}'s trying to do better than life as a migrant...`);
					choice({
						linkName: `Introduce ${him} to anal service`,
						result: function(slave) {
							const r = [];
							// FIXME: tone here does not match VCheck – one will need to be tweaked or rewritten
							r.push(`You carefully and patiently explain to the fearful anal virgin how skilled Free Cities slaves take dick up the butt. ${He} is allowed to go at ${his} own pace, hesitantly progressing from enemata to a single well-lubricated finger to a little plug. After a long while ${he}'s beginning to get aroused, and you bring ${him} over to the couch to spoon. ${He} stiffens with fear but you take your time and just cuddle for a while before gently sodomizing ${him}. ${He} <span class="hotpink">thanks</span> you for being a <span class="mediumaquamarine">kind master,</span> and has <span class="green">learned</span> the basics of taking it up the ass.`);
							r.push(VCheck.Anal(slave, 1));
							slave.devotion += 4;
							slave.trust += 4;
							slave.anus += 1;
							slave.skill.anal += 10;
							return r.join(" ");
						},
					});

					choice({
						linkName: `Initiate ${him} with anal pain`,
						result: function(slave) {
							const r = [];
							r.push(`You haul ${him} wordlessly into the bathroom. In a few minutes ${he} finds ${himself} standing obediently behind you, waiting for your next command with a clean colon and an uncomfortably large buttplug stretching ${his} virgin ass. Once it's been in long enough to prevent any damage, you push ${his} fearful form over the desk and pull it free. ${He} squeals with more embarrassment than pain at the feeling of ${his} first sodomy, but before long you're pounding ${him} hard enough that all ${he} can do is moan and desperately wonder when you'll be done with ${his} poor little butt. You keep ${him} around all day; by night, ${his} asshole is well broken in and <span class="mediumorchid">so is ${his} spirit.</span> ${He} <span class="gold">fears</span> you now, knowing this is only the beginning.`);
							slave.devotion -= 5;
							slave.trust -= 10;
							slave.anus += 1;
							r.push(VCheck.Anal(slave, 1));
							return r.join(" ");
						},
					});
					break;
				case "$He begged to be enslaved to avoid starvation.":
					introText(`and since ${he} enslaved ${himself} for a bite to eat...`);
					choice({
						linkName: `Allow ${him} to stuff ${himself}`,
						result: function(slave) {
							const r = [];
							r.push(`You point ${him} toward the nearest slave food dispenser and tell ${him} to drink as much as ${he} likes. ${He} <span class="hotpink">eagerly complies,</span> quickly bloating ${his} long-deprived belly; between the psychoactive effects of slave food, the sudden end of ${his} long fast, and the look of <span class="mediumaquamarine">slightly spaced-out contentment</span> on ${his} face as ${he} rubs ${his} sated belly, you have a feeling that you're witnessing the beginning of an <span class="red">overeating habit.</span>`);
							slave.devotion += 10;
							slave.trust += 10;
							if (slave.behavioralQuirk === "fitness") {
								slave.behavioralQuirk = "none";
							}
							slave.behavioralFlaw = "gluttonous";
							slave.inflation = 1;
							slave.inflationType = "food";
							slave.inflationMethod = 1;
							SetBellySize(slave);
							App.Events.refreshEventArt(slave);
							return r.join(" ");
						},

					});
					break;
				case "$He submitted to enslavement as $his only way to obtain surgery to transform $him into a woman.":
					introText(`and since ${he} came here for surgery...`);
					choice({
						linkName: `Give ${him} ${his} surgery`,
						result: function(slave) {
							const r = [];
							r.push(`When ${he}`);
							if (canHear(slave)) {
								r.push(`hears`);
							} else {
								r.push(`learns`);
							}
							r.push(`${he}'ll be heading to surgery immediately, ${he} bursts into <span class="hotpink">tears of gratitude</span> and makes to run around your desk to hug you before checking ${himself}. ${He} clearly doesn't want to put a foot wrong and isn't sure it would be appropriate. You solve ${his} dilemma by meeting ${him} with an embrace. ${He} <span class="mediumaquamarine">cries into your chest</span> and promises to be your best slave. The surgery does affect ${his} <span class="health dec">health</span> a little.`);
							slave.devotion += 15;
							surgeryDamage(slave, 10);
							slave.trust += 10;
							slave.vagina = 0;
							slave.dick = 0;
							slave.balls = 0;
							App.Events.refreshEventArt(slave);
							return r.join(" ");
						},
					});
					choice({
						linkName: `Use ${him} as ${he} is`,
						result: function(slave) {
							const r = [];
							r.push(`You announce that ${he}'ll have to earn ${his} surgery — if ${he} ever gets it at all. ${He} only has time for a moment of shock and betrayal before ${he} finds ${his} face jammed into the cushions of your office couch. ${He} struggles, outraged, but only manages to avoid sodomy for a moment. ${His} resistance only makes it harder on ${himself} as you take ${his} anus without mercy. By the third time you buttfuck ${him} ${he}'s learned to <span class="hotpink">relax and let it happen.</span>`);
							r.push(VCheck.Anal(slave, 1));
							slave.devotion += 4;
							slave.anus += 1;
							return r.join(" ");
						},
					});
					break;
				case "$He submitted to enslavement out of a misguided desire to join a sexually libertine society.":
					introText(`and since ${he}'s looking for a sexually libertine society...`);
					choice({
						linkName: `Disabuse ${him} of ${his} silly ideas`,
						result: function(slave) {
							const r = [];
							r.push(`You rise from your desk and move in close. ${He} turns to face you but you roughly spin ${him} around. You haul ${him} up on tiptoe so you can use ${him} standing. As you get your`);
							if (PC.dick !== 0) {
								r.push(`cock`);
							} else {
								r.push(`strap-on`);
							}
							r.push(`lined up with ${his} sissy ass ${he} starts to struggle and protest, asking you to fuck in a more comfortable position. You tell ${him} to keep ${his} whore mouth shut, and administer an awful slap when ${he} tries to keep talking. ${His} stupid illusions about life as a sex slave <span class="mediumorchid">melt away</span> with the burning sensation of a dick forcing its way up ${his} ass at a harsh angle. ${He} wilts a little as you abuse ${his} butt, and afterward, ${he}'s in tears as ${he} stumbles to the bathroom to wash ${his} fuckhole. ${He}'s regained ${his} composure by the time ${he} gets out but <span class="gold">breaks down</span> when you tell ${him} to present ${his} asshole again.`);
							r.push(VCheck.Anal(slave, 1));
							slave.devotion -= 5;
							slave.trust -= 10;
							return r.join(" ");
						},
						get requirements() {
							return (canDoAnal(slave));
						}
					});
					choice({
						linkName: `Cruelly castrate ${him}`,
						result: function(slave) {
							const r = [];
							r.push(`You rise from your desk and move in close, wordlessly dominating ${him} without touch, tempting and overawing ${him} until ${he}'s desperate with desire, ${his} prick stiff as iron. ${He} follows you willingly into the autosurgery and even allows you to strap ${him} in, face-down, without comment. ${His} fuckhole welcomes your`);
							if (PC.dick !== 0) {
								r.push(`cock`);
							} else {
								r.push(`strap-on`);
							}
							r.push(`and ${he} gasps with pleasure. ${He} climaxes with indecent speed, dripping ${his} cum onto the surgery floor. You keep fucking ${him}, but lean forward to whisper to ${him} that that was ${his} last hard-on. ${He}'s completely confused and says nothing, but gradually realizes what the numb feeling around ${his} ballsack means. ${He} <span class="gold">screams with horror</span> and <span class="mediumorchid">sobs disconsolately</span> as the autosurgery disengages from ${his} clipped genitals and you disengage from ${his}`);
							if (PC.dick !== 0) {
								r.push(`cum-filled`);
							} else {
								r.push(`wilting`);
							}
							r.push(`butthole. ${He} gingerly stumbles back to your office with you and, without even being ordered to, arranges ${himself} on the couch with ${his} fuckhole ready. The gelding does affect ${his} <span class="health dec">health</span> somewhat.`);
							r.push(VCheck.Anal(slave, 1));
							slave.devotion -= 10;
							slave.trust -= -10;
							surgeryDamage(slave, 10);
							slave.balls = 0;
							App.Events.refreshEventArt(slave);
							return r.join(" ");
						},
						get requirements() {
							return ((slave.indentureRestrictions <= 0) && (V.seeExtreme === 1));
						}
					});
					break;
				case "$He asked to be enslaved out of naïve infatuation with you.":
					introText(`and since ${he} is already infatuated with you...`);
					choice({
						linkName: `Let ${him} show you what ${he} can do`,
						result: function(slave) {
							const r = [];
							let temp;
							if (slave.vagina === 1) {
								temp = jsRandom(1, 100);
							} else {
								temp = 0;
							}
							if (temp > 50) {
								r.push(VCheck.Vaginal(slave, 1));
							} else {
								r.push(VCheck.Anal(slave, 1));
							}
							r.push(`You tell ${him} that slaves working in your penthouse are all expected to please you, and ${he}'ll have to impress you. ${He} smiles and even giggles a little, standing to strip off ${his} clothes, taking ${his} time and showing off ${his} fresh body. ${He} gets lewder and lewder, displaying youthful libido basking in the gaze of ${his} crush. ${He} slowly becomes more and more desperate to entice you, so you let ${him} keep going out of curiosity, to see how far ${he}'ll go. ${He} goes to the point of reclining on the couch with ${his} legs back, spreading ${himself} and masturbating, and when that fails to get you out of your chair, ${he} begins to wink ${his}`);
							if (temp > 50) {
								r.push(`pussy`);
							} else {
								r.push(`anus`);
							}
							r.push(`meaningfully. ${He}'s clearly got a good idea of what many men like, and you head over and take ${his} tight`);
							if (temp > 50) {
								r.push(`pussy.`);
							} else {
								r.push(`asshole.`);
							}
							r.push(`You do it gently, making sure ${he} enjoys ${himself}, and ${he} becomes <span class="mediumaquamarine">very hopeful</span> that ${he} was wrong to doubt you, and that ${he} really can <span class="hotpink">be close to</span> the object of ${his} infatuation. ${He} bounces up off the couch afterward to wiggle ${his} butt at you, and even blows you a kiss as you get back to work.`);
							slave.devotion += 4;
							slave.trust += 4;

							return r.join(" ");
						},

						get requirements() {
							return (canDoAnal(slave) || canDoVaginal(slave));
						}
					});
					choice({
						linkName: `Make sure ${he} knows ${he} made a mistake`,
						result: function(slave) {
							const r = [];
							r.push(`You tell ${him} that slaves working in your penthouse are all expected to please you, and ${he} nods eagerly. ${He} strips, only starting to look doubtful again when you brusquely order ${him} to hurry up. You order ${him} to get down on the ground with ${his} face up, ${his} shoulders against the floor; ${he} does, and then you order ${him} to put ${his} legs over ${his} head. ${He} looks puzzled but does, flipping ${himself} flexibly up until ${he}'s doing a shoulder stand, bent double with ${his} crotch over ${his} face. You stand over ${him} and shove`);
							if (PC.dick !== 0) {
								r.push(`your cock`);
							} else {
								r.push(`a strap-on`);
							}
							r.push(`down and into ${his} asshole. This is an advanced anal position and`);
							if (slave.anus > 0) {
								r.push(`although ${he}'s clearly no`);
							} else {
								r.push(`even for an`);
							}
							r.push(`anal virgin it's well beyond ${him}. ${He} does ${his} best but tears begin to streak ${his} cheeks. After a while you tire of the position and flip ${him} over onto ${his} face to assrape ${him} doggy style. This allows you to whisper into ${his} ear that ${his} holes are your property now, to use, to abuse, or to sell. ${He} <span class="mediumorchid">sobs in despair</span> at the latter, knowing ${he}'s <span class="gold">thrown ${his} life away.</span>`);
							r.push(VCheck.Anal(slave, 1));
							slave.devotion -= 5;
							slave.trust -= 10;
							return r.join(" ");
						},
						get requirements() {
							return (canDoAnal(slave));
						}
					});
					break;
				case "$He asked to be enslaved in the hope you'd treat a fellow woman well.":
					introText(`and since ${he}'s hoping to protect someone...`);
					choice({
						linkName: `Build a connection with ${him}`,
						result: function(slave) {
							const r = [];
							r.push(`You ask conversationally what experience ${he} has with women. ${He} takes a while to understand your point, but once ${he} does, ${he} blushes and says,`);
							r.push(Spoken(slave, `"Uh, I messed around in school once or twice, but since then, I've never —"`));
							r.push(`and is then quiet, because you're making out with ${him}. ${He}'s surprised and stiffens for a moment but perceptibly thinks things through and realizes ${he}'s yours now, and then ${he} relaxes to let you have your way. You push ${his} boundaries pretty far, and before long you've got ${him} down`);
							if (hasBothLegs(slave)) {
								r.push(`on ${his} knees`);
							} else {
								r.push(`under your desk`);
							}
							r.push(`eating you out. ${He}'s badly discomfited but does ${his} best; ${he}'s <span class="mediumaquamarine">hopeful</span> that ${he} can do this, and slave life won't be so bad.`);
							slave.trust += 4;
							actX(slave, "oral");
							return r.join(" ");
						},
					});
					choice({
						linkName: `Put ${him} in ${his} place`,
						result: function(slave) {
							const r = [];
							r.push(`You stand up and tell ${him} to strip. ${He} hesitates, staring at you in dawning apprehension, until ${he}`);
							if (canSee(slave)) {
								r.push(`sees`);
							} else {
								r.push(`realizes`);
							}
							r.push(`that you're stepping into a strap-on. ${He} unconsciously takes a step backward, but that's as far as ${he} gets before you cover the ground between you, grab ${him} by the throat, and push ${his} back until ${he} falls onto the couch. You drag the head of the fake phallus down over ${his} pussylips, and ${he} shivers, but you keep going, telling ${him} that you'll only be fucking ${him} there when ${he}'s good. When ${he}'s bad, you'll assfuck ${him}.`);
							if (hasBothEyes(slave)) {
								r.push(`${His} eyes fly open and ${he}`);
							} else {
								r.push(`${He}`);
							}
							r.push(`tries to struggle, but you give ${him} a warning slap and then push yourself home. ${He} starts to cry, more from hopelessness than anal pain, knowing that <span class="mediumorchid">you're a slaveowner like any other,</span> more likely to <span class="gold">abuse ${him}</span> than be sympathetic.`);
							r.push(VCheck.Anal(slave, 1));
							slave.devotion -= 5;
							slave.trust -= 5;
							return r.join(" ");
						},
					});
					break;
				case "$He asked to be enslaved since $he felt you were $his only hope of becoming a prettier woman.":
					introText(`and since ${he} desperately wants to be a prettier woman`);
					choice({
						linkName: `Start by fixing that voice of ${hers}`,
						result: function(slave) {
							const r = [];
							r.push(`You schedule ${him} for some vocal surgery. You have ${him} brought in to be inspected the next day, and though ${he}'s healing well, ${he}'s not to speak yet. ${He}'s sore enough to obey the stricture, but when ${he} stands naked before your desk ${he} clearly wants to communicate something. You approach ${him} and place a finger on ${his} fake lips, shushing ${him}, and you tell ${him} you understand. You kiss ${him} and push ${him} backward until ${he} falls onto the couch; ${he} smiles <span class="mediumaquamarine">trustingly</span> and pulls ${his} legs apart and back, offering you ${his} asshole. ${He} has a stiff hard-on, a clear indication that ${he}'s honestly <span class="hotpink">attracted to you,</span> and though ${he} still doesn't speak, ${he} makes a sore little whinny of pleasure when you enter ${his} welcoming butt.`);
							r.push(VCheck.Anal(slave, 1));
							slave.devotion += 4;
							slave.trust += 4;
							slave.voice += 1;
							surgeryDamage(slave, 10);
							return r.join(" ");
						},
					});

					choice({
						linkName: `Let ${him} know ${he}'ll have to earn ${his} rewards`,
						result: function(slave) {
							const r = [];
							r.push(`You complete the induction and then perform a thorough inspection, noting down each area in which surgery or drugs could improve ${his} body. ${He} understands what you're doing and can barely contain ${his} excitement, but you tell ${him} that ${he}'ll have to earn such improvements. ${His} face falls. You reassure ${him} that it won't take the years ${he} would have had to work to afford such things ${himself}, but that ${he} needs to be a good slave, and soon, for you to spend resources on ${him}. You let ${him} start by taking a rough buttfuck, bent over the desk. ${His} ass is tight and you are not merciful. ${He} gasps and moans but takes it all the same, <span class="mediumaquamarine">trusting</span> that ${he}'ll eventually be rewarded with transformation.`);
							r.push(VCheck.Anal(slave, 1));
							slave.trust += 10;
							return r.join(" ");
						},
						get requirements() {
							return canDoAnal(slave);
						}
					});
					break;
				case "$He was transformed and enslaved after $he fell into debt to you.":
					introText(`and since ${he}'s so deeply in debt to you...`);
					choice({
						linkName: `Introduce ${him} to getting fucked`,
						result: function(slave) {
							const r = [];
							r.push(`You stand up, your`);
							if (PC.dick !== 0) {
								r.push(`erection`);
								if (PC.vagina !== -1) {
									r.push(`and the pussy beneath it`);
								}
							} else {
								r.push(`strap-on`);
							}
							r.push(`suddenly becoming visible to ${him}, and order ${him} in a conversational tone of voice to`);
							if (hasAnyLegs(slave)) {
								r.push(`kneel`);
							} else {
								r.push(`get`);
							}
							r.push(`on the couch and spread ${his} buttocks. The true nature of ${his} new life crashes down on ${him} in a moment, and ${he} cannot decide whether to run, to rage, or to cry. You solve ${his} dilemma for ${him} by seizing ${him} and flinging ${him} toward the couch, administering practiced cracks of your palm to ${his} ass until ${he} complies. ${He} sobs as ${he} feels the burning sensation of ${his} <span class="lime">anal virginity being taken,</span> knowing that ${he} can now be <span class="gold">used at will</span> and is now subject to the whims of someone who has shown themselves <span class="mediumorchid">willing to rape ${his} anus.</span>`);
							r.push(VCheck.Anal(slave, 1));
							slave.devotion -= 5;
							slave.trust -= 5;
							slave.anus = 1;
							return r.join(" ");
						},
						get requirements() {
							return (canDoAnal(slave));
						}
					});
					break;
				case "$He offered $himself to you as a slave to escape a life of boredom.":
					introText(`and since ${he} was so bored...`);
					choice({
						linkName: `Make sure ${he} enjoys ${his} first butt stuff`,
						result: function(slave) {
							const r = [];
							r.push(`You make no direct answer to ${his} nervous question about ${his} virgin butt, though you do wonder how ${he} was so selfish as to be a Free Cities party ${girl} without giving up ${his} asshole nightly. Instead, you ask ${him} about ${himself}, ensuring that ${he} learns the proper way to answer questions from ${his} ${getWrittenTitle(slave)}. ${He} answers readily, even when you turn the subject to ${his} sexual experiences, and ${he} starts to get visibly aroused. Before long, ${he} finds ${himself} sitting on your lap on the couch, making out with you while ${he} gives you a handjob. ${He} stiffens a little when you begin to play with ${his} butthole, but you take your time. Soon ${he}'s taking a finger, and then two, and before long, ${he}'s riding`);
							if (PC.dick !== 0) {
								r.push(`your cock.`);
							} else {
								r.push(`a strap-on.`);
							}
							r.push(`${He} doesn't climax to ${his} <span class="lime">first buttsex,</span> but ${he} is learning to <span class="mediumaquamarine">trust</span> that you won't hurt ${him}.`);
							r.push(VCheck.Anal(slave, 1));
							slave.trust += 10;
							slave.anus = 1;
							return r.join(" ");
						},
						get requirements() {
							return (canDoAnal(slave));
						}
					});
					break;
				case "$He sold $himself into slavery out of fear that life on the streets was endangering $his pregnancy.":
					introText(`and since ${he} is here to protect ${his} pregnancy...`);
					choice({
						linkName: `Make sure ${he} enjoys ${his} first anal sex`,
						result: function(slave) {
							const r = [];
							r.push(`You introduce ${him} to obedience and proper manners regarding ${his} ${getWrittenTitle(slave)} before sending ${him} off for a physical. That night, ${he}'s returned to your room, and finds you doing business on a tablet in bed. ${He} looks doubtful, but obeys when you direct ${him} to get into bed${(PC.dick === 0) ? `, even after ${he} realizes you're wearing a strap-on` : ``}. You turn out the light and spoon ${him} from behind, kissing ${his} neck and ears, cupping ${his} swollen breasts, and running your hands across ${his} pregnant belly with its taut ${slave.skin} skin. ${He}'s awkward at first but ${his} body responds to the tenderness. Before long ${he}'s humping ${his} pussy back and forth against`);
							if (PC.dick !== 0) {
								r.push(`your cock.`);
							} else {
								r.push(`the strap-on.`);
							}
							r.push(`You tell ${him} no, not there, and begin to gently work`);
							if (PC.dick !== 0) {
								r.push(`your dickhead`);
							} else {
								r.push(`its tip`);
							}
							r.push(`up ${his} tight but relaxed ass. ${He}'s unsure of ${himself}, but you keep ${him} nice and relaxed. ${He} doesn't climax to ${his} <span class="lime">first buttsex,</span> but ${he} is learning to <span class="mediumaquamarine">trust</span> that you won't hurt ${him}.`);
							r.push(VCheck.Anal(slave, 1));
							slave.trust += 10;
							slave.anus = 1;
							return r.join(" ");
						},
						get requirements() {
							return (canDoAnal(slave));
						}
					});
					break;
				case "$He offered $himself to you as a slave to escape the hard life of a free whore.":
					introText(`and since ${he} is trying to escape the hard life of a free whore...`);
					choice({
						linkName: `Clean up ${his} whorish appearance`,
						result: function(slave) {
							const r = [];
							r.push(`${He}'s totally unsurprised when you send ${him} to the salon for a makeover. It takes several days of work before ${he}'s brought back in for another inspection; when ${he} arrives, you wordlessly point ${him} to a full length mirror. ${He}`);
							if (canSee(slave)) {
								r.push(`sees ${himself}`);
							} else {
								if (hasAnyArms(slave)) {
									r.push(`tenderly uses ${his} ${hands} and finds ${himself}`);
								} else {
									r.push(`stoically waits while you vividly describe ${his} new appearance. One`);
								}
							}
							r.push(`without a hooker's haircut, tattoos, or piercings, a conventionally pretty ${girl} with subtle implants and a clean appearance. ${He} gasps`);
							if (hasAnyArms(slave)) {
								r.push(`and covers ${his} mouth with a hand,`);
							} else {
								r.push(`but quickly closes ${his} mouth,`);
							}
							r.push(`and then suddenly bursts into tears. "Thank you, ${Master}," ${he} sobs. "I never would have thought."`);
							if (hasAnyArms(slave)) {
								r.push(`${He} reaches out to touch ${his} reflection.`);
							} else {
								r.push(`${He} pauses for just a moment.`);
							}

							if (canSee(slave)) {
								r.push(`"I look`);
							} else {
								r.push(`"I feel`);
							}
							r.push(`like a nice ${girl}." ${He} is <span class="hotpink">grateful to you</span> for`);
							if (canSee(slave)) {
								r.push(`showing ${him}`);
							} else {
								if (hasAnyArms(slave)) {
									r.push(`letting ${him} feel`);
								} else {
									r.push(`detailing`);
								}
							}
							r.push(`this new side of ${himself}, and has <span class="mediumaquamarine">begun to trust</span> that being your slave will be less degrading than being a free prostitute.`);
							slave.trust += 4;
							slave.devotion += 4;
							slave.boobs -= slave.boobsImplant;
							slave.boobsImplant = 0;
							slave.boobsImplantType = "none";
							if (slave.boobShape === "spherical") {
								slave.boobShape = "normal";
							}
							if (slave.nipples === "flat") {
								slave.nipples = "puffy";
							}
							slave.lips -= slave.lipsImplant;
							slave.lipsImplant = 0;
							slave.butt -= slave.buttImplant;
							slave.buttImplant = 0;
							slave.buttImplantType = "none";
							slave.piercing.lips.weight = 0;
							slave.piercing.tongue.weight = 0;
							slave.piercing.nose.weight = 0;
							slave.piercing.eyebrow.weight = 0;
							slave.piercing.navel.weight = 0;
							slave.piercing.nipple.weight = 0;
							slave.piercing.genitals.weight = 0;
							slave.piercing.genitals.smart = false;
							slave.hStyle = "neat";
							slave.custom.tattoo = " ";
							App.Events.refreshEventArt(slave);
							return r.join(" ");
						},
					});
					break;
				case "$He sold $himself into slavery to escape life on the streets.":
					introText(`and since ${he} is trying to escape life on the streets...`);
					choice({
						linkName: `Show off ${his} tits`,
						result: function(slave) {
							const r = [];
							r.push(`You send ${him} out to be cleaned up and inducted, but have ${him} brought back afterward. You point out a clothes box on the couch and tell ${him} to get dressed, since you're about to make a tour of the club, and ${he}'ll be accompanying you. ${He} obeys without comment, but gasps with shock to find that ${he}'s been given a string sling bikini. ${He} climbs into it hesitantly, and finds that not only does its string bottom ride up between ${his} pussylips, it does not cover ${his} nipples at all: the strings part to either side of the nipples to let them stick through, bare. This can only generously be called clothing. ${He} accepts this with an obvious internal sigh, however, and walks dutifully behind you, ${his} bare feet slapping along as ${his} big butt bounces and ${his} tits constantly fall out of ${his} strings.`);
							if (slave.sexualFlaw !== "shamefast") {
								r.push(`After a while, though, ${he} notices that ${he}'s getting a lot of very positive attention, and even starts to strut it a little. When you get back to the penthouse, you ask ${him} how ${he} felt. ${He} blushes. "Kinda hot, ${Master}" ${he} says, embarrassed.`);
								r.push(Spoken(slave, `"I didn't think an older ${girl} like me would get so many stares."`));

								r.push(`You reach out to grope ${his} tits, and tell ${him} that with breasts like ${hers}, it's not surprising. ${He} <span class="hotpink">likes you</span> for liking ${his} body, and has <span class="mediumaquamarine">begun to trust</span> that even though ${he}'s old, ${he} can find a place under you.`);
								slave.trust += 4;
								slave.devotion += 4;
							} else {
								r.push(`After a while, though, ${he} notices that ${he}'s getting a lot of very positive attention, but ${he} remains embarrassed. ${His} gait is clumsy and hesitant, and ${he} almost trips over ${himself} with mortification. When you get back to the penthouse, you ask ${him} how ${he} felt. ${He} blushes furiously. "T-terrible, ${Master}," ${he} says with feeling.`);
								r.push(Spoken(slave, `"P-please, I'll`));
								r.push(`<span class="hotpink">d-do anything you want</span> <span class="gold">`);
								r.push(Spoken(slave, `as long as you don't m-make me do that again.`));
								r.push(r.pop() + `</span>)`);
								r.push(Spoken(slave, `Anything."`));
								r.push(`${He} thinks frantically, obviously trying to come up with the most abject idea ${he} can.`);
								r.push(Spoken(slave, `"I'll b-be a whore! J-just as long as I can do it, you know, in a room."`));
								slave.trust -= 4;
								slave.devotion += 4;
							}

							return r.join(" ");
						},
					});
					break;

				// Written by DrPill, coded by Boney M
				case "$He was recruited into your service by $his older sibling.":
					introText(`and since ${he} was recruited by ${his} older ${getPronouns(slave2).sister}...`);
					choice({
						get linkName() {
							const {sister2} = getPronouns(slave2).appendSuffix('2');
							return `Use ${his} big ${sister2} as an example`;
						},
						result: function(slave) {
							const r = [];
							const {He2, he2, his2, him2, sister2} = getPronouns(slave2).appendSuffix('2');
							const doOral = slave2.fetish === "cumslut" || slave2.anus === 0;
							r.push(`Your new slave appears`);
							if (slave.devotion < -10) {
								r.push(`reluctant to assume ${his} new duties.`);
							} else {
								r.push(`unsure what ${his} new duties are.`);
							}
							r.push(`You gesture towards ${slave2.slaveName}. ${He2} is`);
							if (slave2.intelligence + slave2.intelligenceImplant > 15) {
								r.push(`bright enough`);
							} else if ((adjustedPenSkill(slave2) + slave2.skill.vaginal + slave2.skill.anal + slave2.skill.oral) > 100) {
								r.push(`skilled enough`);
							} else {
								r.push(`obedient enough`);
							}
							r.push(`to understand you mean a demonstration is in order. ${slave2.slaveName} starts things off with a`);
							if (slave2.skill.entertainment >= 100) {
								r.push(`masterful`);
							} else if (slave2.skill.entertainment > 10) {
								r.push(`skillful`);
							} else {
								r.push(`passable`);
							}
							r.push(`striptease, culminating in ${him2}`);
							if (!doOral) {
								r.push(`bending over`);
							} else {
								r.push(`kneeling`);
							}
							r.push(`in front of you. ${He2} eagerly moans as you enter ${him2}, begging for your seed`);
							if (slave2.energy > 95) {
								r.push(`like the slut ${he2} is.`);
							} else if (slave2.skill.whoring > 30) {
								r.push(`like the whore ${he2} is.`);
							} else if ((slave2.assignment === Job.MASTERSUITE) || (slave2.assignment === Job.FUCKTOY)) {
								r.push(`like the fucktoy ${he2} is.`);
							} else {
								r.push(r.pop() + ".");
							}
							r.push(`As you finish, ${he2}`);
							if (doOral) {
								r.push(`opens ${his2} mouth and savors your gift, thanking you once ${he2}'s swallowed enough to be able to talk again.`);
							} else if ((slave2.fetish === "buttslut") || (slave2.fetish === Fetish.SUBMISSIVE)) {
								r.push(`collapses on the floor with ${his2} ass high in the air, thanking you for painting ${his2} hole white.`);
							} else {
								r.push(`thanks you.`);
							}
							r.push(`Witnessing this display of servitude from ${his} big ${sister2} <span class="hotpink">eases ${slave.slaveName} into ${his} new life,</span> and <span class="mediumaquamarine">gives ${him} hope</span> ${he} can find a place here.`);
							if (!doOral) {
								seX(slave2, "anal", V.PC, "penetrative");
							} else {
								seX(slave2, "oral", V.PC, "penetrative");
							}
							slave.devotion += 4;
							slave.trust += 4;
							return r.join(" ");
						},
					});
					break;
				case "$He was recruited into your service by $his younger sibling.":
					introText(`and since ${he} was recruited by ${his} younger ${getPronouns(slave2).sister}...`);
					choice({
						get linkName() {
							const {sister2} = getPronouns(slave2).appendSuffix('2');
							return `Use ${his} little ${sister2} as an example`;
						},
						result: function(slave) {
							const r = [];
							const {He2, he2, his2, him2, sister2} = getPronouns(slave2).appendSuffix('2');
							const doOral = slave2.fetish === "cumslut" || slave2.anus === 0;
							r.push(`Your new slave appears`);
							if (slave.devotion < -10) {
								r.push(`reluctant to assume ${his} new duties.`);
							} else {
								r.push(`unsure what ${his} new duties are.`);
							}
							r.push(`You gesture towards ${slave2.slaveName}. ${He2} is`);
							if (slave2.intelligence + slave2.intelligenceImplant > 15) {
								r.push(`bright enough`);
							} else if (((adjustedPenSkill(slave2) + slave2.skill.vaginal + slave2.skill.anal + slave2.skill.oral) > 100)) {
								r.push(`skilled enough`);
							} else {
								r.push(`obedient enough`);
							}
							r.push(`to understand you mean a demonstration is in order. ${slave2.slaveName} starts things off with a`);
							if (slave2.skill.entertainment >= 100) {
								r.push(`masterful`);
							} else if (slave2.skill.entertainment > 10) {
								r.push(`skillful`);
							} else {
								r.push(`passable`);
							}
							r.push(`striptease, culminating in ${him2}`);
							if (!doOral) {
								r.push(`bending over`);
							} else {
								r.push(`kneeling`);
							}
							r.push(`in front of you. ${He2} eagerly moans as you enter ${him2}, begging for your seed`);
							if (slave2.energy > 95) {
								r.push(`like the slut ${he2} is.`);
							} else if (slave2.skill.whoring > 30) {
								r.push(`like the whore ${he2} is.`);
							} else if ((slave2.assignment === Job.MASTERSUITE) || (slave2.assignment === Job.FUCKTOY)) {
								r.push(`like the fucktoy ${he2} is.`);
							} else {
								r.push(r.pop() + ".");
							}
							r.push(`As you finish, ${he2}`);
							if (doOral) {
								r.push(`opens ${his2} mouth and savors your gift, thanking you once ${he2}'s swallowed enough to be able to talk again.`);
							} else if ((slave2.fetish === "buttslut") || (slave2.fetish === Fetish.SUBMISSIVE)) {
								r.push(`collapses on the floor with ${his2} ass high in the air, thanking you for painting ${his2} hole white.`);
							} else {
								r.push(`thanks you.`);
							}
							r.push(`Witnessing this display of servitude from ${his} little ${sister2} <span class="hotpink">eases ${slave.slaveName} into ${his} new life,</span> and <span class="mediumaquamarine">gives ${him} hope</span> ${he} can find a place here.`);
							if (!doOral) {
								seX(slave2, "anal", V.PC, "penetrative");
							} else {
								seX(slave2, "oral", V.PC, "penetrative");
							}
							slave.devotion += 4;
							slave.trust += 4;
							return r.join(" ");
						},
					});
					break;
				case "$He was recruited into your service by $his twin.":
					introText(`and since ${he} was recruited by ${his} twin...`);
					choice({
						get linkName() {
							const {sister2} = getPronouns(slave2).appendSuffix('2');
							return `Use ${his} ${sister2} as an example`;
						},
						result: function(slave) {
							const r = [];
							const {He2, he2, his2, him2, sister2} = getPronouns(slave2).appendSuffix('2');
							const doOral = slave2.fetish === "cumslut" || slave2.anus === 0;
							r.push(`Your new slave appears`);
							if (slave.devotion < -10) {
								r.push(`reluctant to assume ${his} new duties.`);
							} else {
								r.push(`unsure what ${his} new duties are.`);
							}
							r.push(`You gesture towards ${slave2.slaveName}. ${He2} is`);
							if (slave2.intelligence + slave2.intelligenceImplant > 15) {
								r.push(`bright enough`);
							} else if (((adjustedPenSkill(slave2) + slave2.skill.vaginal + slave2.skill.anal + slave2.skill.oral) > 100)) {
								r.push(`skilled enough`);
							} else {
								r.push(`obedient enough`);
							}
							r.push(`to understand you mean a demonstration is in order. ${slave2.slaveName} starts things off with a`);
							if (slave2.skill.entertainment >= 100) {
								r.push(`masterful`);
							} else if (slave2.skill.entertainment > 10) {
								r.push(`skillful`);
							} else {
								r.push(`passable`);
							}
							r.push(`striptease, culminating in ${him2}`);
							if (!doOral) {
								r.push(`bending over`);
							} else {
								r.push(`kneeling`);
							}
							r.push(`in front of you. ${He2} eagerly moans as you enter ${him2}, begging for your seed`);
							if (slave2.energy > 95) {
								r.push(`like the slut ${he2} is.`);
							} else if (slave2.skill.whoring > 30) {
								r.push(`like the whore ${he2} is.`);
							} else if ((slave2.assignment === Job.MASTERSUITE) || (slave2.assignment === Job.FUCKTOY)) {
								r.push(`like the fucktoy ${he2} is.`);
							} else {
								r.push(r.pop() + ".");
							}
							r.push(`As you finish, ${he2}`);
							if (doOral) {
								r.push(`opens ${his2} mouth and savors your gift, thanking you once ${he2}'s swallowed enough to be able to talk again.`);
							} else if ((slave2.fetish === "buttslut") || (slave2.fetish === Fetish.SUBMISSIVE)) {
								r.push(`collapses on the floor with ${his2} ass high in the air, thanking you for painting ${his2} hole white.`);
							} else {
								r.push(`thanks you.`);
							}
							r.push(`Witnessing this display of servitude from ${his} twin ${sister2} <span class="hotpink">eases ${slave.slaveName} into ${his} new life,</span> and <span class="mediumaquamarine">gives ${him} hope</span> ${he} can find a place here.`);
							if (!doOral) {
								seX(slave2, "anal", V.PC, "penetrative");
							} else {
								seX(slave2, "oral", V.PC, "penetrative");
							}
							slave.devotion += 4;
							slave.trust += 4;
							return r.join(" ");
						},
					});
					break;
				case "$He was recruited into your service by $his parent.":
					introText(`and since ${he} was recruited by ${his} parent...`);
					choice({
						linkName: `Use ${his} parent as an example`,
						result: function(slave) {
							const r = [];
							const {He2, he2, his2, him2} = getPronouns(slave2).appendSuffix('2');
							const doOral = slave2.fetish === "cumslut" || slave2.anus === 0;
							r.push(`You gesture towards ${slave2.slaveName}. ${He2} is`);
							if (slave2.intelligence + slave2.intelligenceImplant > 15) {
								r.push(`bright enough`);
							} else if ((adjustedPenSkill(slave2) + slave2.skill.vaginal + slave2.skill.anal + slave2.skill.oral) > 100) {
								r.push(`skilled enough`);
							} else {
								r.push(`obedient enough`);
							}
							r.push(`to understand you mean a demonstration is in order. ${slave2.slaveName} starts things off with a`);
							if (slave2.skill.entertainment >= 100) {
								r.push(`masterful`);
							} else if (slave2.skill.entertainment > 10) {
								r.push(`skillful`);
							} else {
								r.push(`passable`);
							}
							r.push(`striptease, culminating in ${him2}`);
							if (!doOral) {
								r.push(`bending over`);
							} else {
								r.push(`kneeling`);
							}
							r.push(`in front of you. ${He2} eagerly moans as you enter ${him2}, begging for your seed`);
							if (slave2.energy > 95) {
								r.push(`like the slut ${he2} is.`);
							} else if (slave2.skill.whoring > 30) {
								r.push(`like the whore ${he2} is.`);
							} else if ((slave2.assignment === Job.MASTERSUITE) || (slave2.assignment === Job.FUCKTOY)) {
								r.push(`like the fucktoy ${he2} is.`);
							} else {
								r.push(r.pop() + ".");
							}
							r.push(`As you finish, ${he2}`);
							if (doOral) {
								r.push(`opens ${his2} mouth and savors your gift, thanking you once ${he2}'s swallowed enough to be able to talk again.`);
							} else if ((slave2.fetish === "buttslut") || (slave2.fetish === Fetish.SUBMISSIVE)) {
								r.push(`collapses on the floor with ${his2} ass high in the air, thanking you for painting ${his2} hole white.`);
							} else {
								r.push(`thanks you.`);
							}
							r.push(`Witnessing this display of servitude from ${his}`);
							if (slave.mother === slave2.ID) {
								r.push(`mother`);
							} else {
								r.push(`father`);
							}
							r.push(`<span class="hotpink">eases ${slave.slaveName} into ${his} new life,</span> and <span class="mediumaquamarine">gives ${him} hope</span> ${he} can find a place here.`);
							if (!doOral) {
								seX(slave2, "anal", V.PC, "penetrative");
							} else {
								seX(slave2, "oral", V.PC, "penetrative");
							}
							slave.devotion += 4;
							slave.trust += 4;
							return r.join(" ");
						},
					});
					break;
				case "$He was recruited into your service by $his child.":
					introText(`and since ${he} was recruited by ${his} ${getPronouns(slave2).daughter}...`);
					choice({
						get linkName() {
							const {daughter2} = getPronouns(slave2).appendSuffix('2');
							return `Use ${his} ${daughter2} as an example`;
						},
						result: function(slave) {
							const r = [];
							const {He2, he2, his2, him2, daughter2} = getPronouns(slave2).appendSuffix('2');
							const doOral = slave2.fetish === "cumslut" || slave2.anus === 0;
							r.push(`You gesture towards ${slave2.slaveName}. ${He2} is`);
							if (slave2.intelligence + slave2.intelligenceImplant > 15) {
								r.push(`bright enough`);
							} else if (((adjustedPenSkill(slave2) + slave2.skill.vaginal + slave2.skill.anal + slave2.skill.oral) > 100)) {
								r.push(`skilled enough`);
							} else {
								r.push(`obedient enough`);
							}
							r.push(`to understand you mean a demonstration is in order. ${slave2.slaveName} starts things off with a`);
							if (slave2.skill.entertainment >= 100) {
								r.push(`masterful`);
							} else if (slave2.skill.entertainment > 10) {
								r.push(`skillful`);
							} else {
								r.push(`passable`);
							}
							r.push(`striptease, culminating in ${him2}`);
							if (!doOral) {
								r.push(`bending over`);
							} else {
								r.push(`kneeling`);
							}
							r.push(`in front of you. ${He2} eagerly moans as you enter ${him2}, begging for your seed`);
							if (slave2.energy > 95) {
								r.push(`like the slut ${he2} is.`);
							} else if (slave2.skill.whoring > 30) {
								r.push(`like the whore ${he2} is.`);
							} else if ((slave2.assignment === Job.MASTERSUITE) || (slave2.assignment === Job.FUCKTOY)) {
								r.push(`like the fucktoy ${he2} is.`);
							} else {
								r.push(r.pop() + ".");
							}
							r.push(`As you finish, ${he2}`);
							if (doOral) {
								r.push(`opens ${his2} mouth and savors your gift, thanking you once ${he2}'s swallowed enough to be able to talk again.`);
							} else if ((slave2.fetish === "buttslut") || (slave2.fetish === Fetish.SUBMISSIVE)) {
								r.push(`collapses on the floor with ${his2} ass high in the air, thanking you for painting ${his2} hole white.`);
							} else {
								r.push(`thanks you.`);
							}
							r.push(`Witnessing this display of servitude from ${his} ${daughter2} <span class="hotpink">eases ${slave.slaveName} into ${his} new life,</span> and <span class="mediumaquamarine">gives ${him} hope</span> ${he} can find a place here.`);
							if (!doOral) {
								seX(slave2, "anal", V.PC, "penetrative");
							} else {
								seX(slave2, "oral", V.PC, "penetrative");
							}
							slave.devotion += 4;
							slave.trust += 4;
							return r.join(" ");
						},
					});
					break;
				default:
					if (slave.origin.includes("enslavement for the attempted rape of a free")) {
						introText(`and since ${he} tried to rape you...`);
						choice({
							linkName: `Show ${him} how a professional does it`,
							result: function(slave) {
								const r = [];
								r.push(`Judging from ${his} earlier, amateur attempt, it's clear ${slave.slaveName} is unfamiliar with the subtle nuances of a high-quality rape. You decide to clear your schedule for the rest of the day and teach ${him} yourself${PC.dick === 0 ? `, with the help of your trusty strap-on, of course` : ``}. Once ${he}'s bent over across your desk and properly restrained, ${his} lesson begins with you thrusting your`);
								if (PC.dick === 0) {
									r.push(`fake`);
								}
								r.push(`cock down ${his} throat as far as it will go. Over the course of the next several hours, you ensure that ${he} understands the fine points of nonconsensual oral${slave.vagina > -1 ? `, vaginal,` : ``} and anal intercourse as intimately as possible. When you're finally too tired to continue, you unshackle ${his} <span class="health dec">bruised and bloody body</span> and ask ${him} what ${he} learned. ${His} voice hoarse from the same brutal fucking that has gaped ${his} <span class="lime">asshole</span> ${(slave.vagina > -1) ? `and <span class="lime">pussy</span>` : ``}, ${he} hesitantly replies that ${he} has <span class="hotpink">learned a great deal about true dominance,</span> before fainting on the spot from a mixture of total exhaustion and pure terror. You've taught your student well.`);
								actX(slave, "oral", 15);
								slave.anus = 2;
								actX(slave, "anal", 15);
								if (slave.vagina > -1) {
									slave.vagina = 2;
									actX(slave, "vaginal", 15);
								}
								if (isFertile(slave) && PC.dick > 0) {
									knockMeUp(slave, 100, 0, -1);
								}
								slave.devotion += 100;
								return r.join(" ");
							},

						});
						choice({
							linkName: `Show ${him} that ${he} could have just asked`,
							result: function(slave) {
								const r = [];
								r.push(`You tell ${slave.slaveName} that while ${his} previous attempt to fuck you was very flattering, ${he} should know that one can catch more flies with honey. Ordering the confused slave to lean back over and onto your desk, you proceed to gently`);
								if (slave.dick > 0) {
									r.push(`stroke`);
								} else {
									r.push(`finger`);
								}
								r.push(`${him} until ${his} arousal overwhelms ${his} wariness of you. Once ${he}'s finally relaxed, you climb on top of ${him}, and gently ease`);
								if (PC.vagina > 0 && canPenetrate(slave)) {
									r.push(`your pussy onto ${his} cock. ${He} shudders and moan softly as you slide yourself up and down ${his} shaft with steadily increasing speed. You keep your eyes locked on ${hers} all the while, as ${his} expression shifts from bewilderment to acceptance to ecstasy, as ${he} soon shoots ${his} seed up into you. Afterwards, you slip ${his} softening cock out of you, climb off of ${him}, and leave the exhausted and overwhelmed slave${girl} on your desk as you attend to business elsewhere. You think ${he}'s <span class="orangered">going to like it here.</span>`);
									actX(slave, "penetrative");
									if (canImpreg(V.PC, slave)) {
										knockMeUp(V.PC, 100, 0, slave.ID);
									}
								} else {
									r.push(`yourself into ${his}`);
									if (slave.vagina > -1) {
										r.push(`pussy.`);
									} else {
										r.push(`asshole.`);
									}
									r.push(`${He} shudders and moans softly as you piston your`);
									if (PC.dick > 0) {
										r.push(`dick`);
									} else {
										r.push(`strap-on`);
									}
									r.push(`in and out of ${his} hole with steadily increasing intensity. You keep your eyes locked on ${hers} all the while, as ${his} expression shifts from bewilderment to acceptance to ecstasy, as you soon shoot your seed down into ${him}. Afterwards, you slip your`);
									if (PC.dick > 0) {
										r.push(`softening`);
									} else {
										r.push(`plastic`);
									}
									r.push(`cock out of ${him}, climb off of ${him}, and leave the exhausted and overwhelmed slave${girl} on your desk as you attend to business elsewhere. You think ${he}'s <span class="orangered">going to like it here.</span>`);
									if (slave.vagina > -1) {
										r.push(VCheck.Vaginal(slave, 1));
										actX(slave, "vaginal");
										if (isFertile(slave) && PC.dick > 0) {
											knockMeUp(slave, 100, 0, -1);
										}
									} else {
										r.push(VCheck.Anal(slave, 1));
										actX(slave, "anal");
									}
								}
								slave.trust += 100;
								return r.join(" ");
							},
						});
					}
			}

			lineBreak();

			App.UI.DOM.appendNewElement("div", p, `Have ${him} changed...`, "note");

			if (slave.health.condition < -20) {
				choice({
					linkName: `Address ${his} medical issues`,
					result: function(slave) {
						const r = [];
						if (tankBorn) {
							r.push(`Since ${he} came out of the tank rather unhealthy,`);
						} else {
							r.push(`Since ${he}'s in rough shape,`);
						}
						r.push(`you give ${him} a comprehensive medical exam with the help of the remote surgery. You apply care to <span class="health inc">address</span> some of the most outstanding concerns.`);
						if (tankBorn) {
							r.push(`After the checkup, ${he} happily <span class="mediumaquamarine">expresses ${his} thanks</span> for making ${him} feel better.`);
						} else {
							r.push(`Whatever gratitude ${he} might have felt for prompt medical attention is balanced by fear of the remote surgery and the nagging (and accurate) feeling that ${he}'s being treated like livestock, but ${he} does <span class="mediumaquamarine">begin to hope</span> ${he}'ll be well treated.`);
						}
						if (FutureSocieties.isActive('FSPaternalist')) {
							r.push(`Society <span class="green">approves</span> of your promptly seeing to your stock's health; this advances the idea that all slaveowners should look after their slaves.`);
							FutureSocieties.Change("Paternalist", 2);
						}
						improveCondition(slave, 10);
						slave.trust += 4;
						return r.join(" ");
					},
				});
			}

			lineBreak();

			if (slave.hStyle.indexOf("shaved") === -1) {
				choice({
					linkName: `Shave ${his} hair`,
					result: function(slave) {
						const r = [];
						if (tankBorn) {
							r.push(`You escort ${him} to the auto salon running your fingers through ${his} long hair the entire way. ${He} sighs contently under your patting until you reach the salon. You strap ${him} in and set the auto salon to shave. ${He}`);
							if (canSee(slave)) {
								r.push(`looks around frantically`);
							} else {
								r.push(`trembles with fear`);
							}
							r.push(`as the manipulators with their buzzing shears descend menacingly. As they run quickly back and forth across ${his} head, ${he} begins to sob, obviously <span class="gold">fearing</span> the strange device. When ${he}`);
							if (canSee(slave)) {
								r.push(`catches sight of`);
							} else {
								r.push(`feels the air on`);
							}
							r.push(`${his} bald head, <span class="mediumorchid">${his} face twists with revulsion.</span> ${He} didn't seem to take it well.`);
							slave.devotion -= 25;
							slave.trust -= 50;
						} else {
							r.push(`You seize ${him} by the hair and drag ${him} to the auto salon. ${He} struggles and thrashes around but soon scrambles to keep up with you to relieve the pain in ${his} scalp as ${he}'s dragged. You strap ${him} in and set the auto salon to shave. ${He}`);
							if (canSee(slave)) {
								r.push(`looks around frantically`);
							} else {
								r.push(`trembles with fear`);
							}
							r.push(`as the manipulators with their buzzing shears descend menacingly. As they run quickly back and forth across ${his} head, ${he} begins to sob, obviously <span class="gold">fearing</span> that ${his} new master is <span class="mediumorchid">one to enjoy degradation and abuse.</span> ${He} has a strong indication that obedience is ${his} only hope.`);
							slave.devotion -= 5;
							slave.trust -= 10;
						}
						slave.hStyle = "shaved";
						slave.hLength = 0;
						App.Events.refreshEventArt(slave);
						return r.join(" ");
					},
				});
			}
			lineBreak();

			if (slave.stampTat === 0) {
				choice({
					linkName: `Give ${him} a lewd tramp stamp`,
					result: function(slave) {
						const r = [];
						slave.stampTat = either("advertisements", "degradation", "rude words");
						r.push(`You`);
						if (slave.devotion > 20) {
							r.push(`bring ${him} down to the studio, lay the compliant`);
						} else {
							r.push(`drag ${him} down to the studio, strap the reluctant`);
						}
						r.push(`slave in the chair face-down, and select a sufficiently lewd pattern to decorate ${his} lower back. When the automated tattooing is done, a topical application of analgesics leaves ${him} with nothing more than a slight ache there. When`);
						if (canSee(slave)) {
							r.push(`allowed to stand,`);
							if (tankBorn) {
								r.push(`allowed to stand, ${he} immediately turns ${his} back to one of the studio's full length mirrors and cranes around to gawk at the picture just over ${his} butt. ${He} wiggles ${his} rear and giggles at the drawing moving along with it.`);
							} else {
								r.push(`${he} immediately turns ${his} back to one of the studio's full length mirrors and cranes around to read the writing just over ${his} butt. It's difficult, since, of course, it's reversed, and ${he} mouths the words letter by letter.`);
								if (slave.stampTat === "advertisements") {
									r.push(`${He} mouths, 'Fuck my ass!'`);
								} else if (slave.stampTat === "rude words") {
									r.push(`'Rear Entrance,' ${he} mouths, and then understands the arrow pointing down between ${his} buttocks.`);
								} else if (slave.stampTat === "degradation") {
									r.push(`Struggling to read the ornate gothic lettering, ${he} slowly mouths, 'Anal Whore.'`);
								}
							}
						} else if (canHear(slave)) {
							if (tankBorn) {
								r.push(`you touch the area of skin around ${his} new tattoo, ${slave.slaveName}, apparently finding this ticklish, starts into an uncontrollable giggling fit that you are unable to snap ${him} out of for a few minutes.`);
							} else {
								r.push(`${he} sits back up, you tell ${him} calmly and bluntly what ${his} new tattoo says:`);
								if (slave.stampTat === "advertisements") {
									r.push(`"Fuck My Ass."`);
								} else if (slave.stampTat === "rude words") {
									r.push(`"Rear Entrance."`);
								} else if (slave.stampTat === "degradation") {
									r.push(`"Anal Whore."`);
								}
							}
						} else {
							r.push(`Judging by the expression on ${his} face, ${he}'s either accurately judged the movement of the needle on ${his} skin or simply guessed correctly that ${his} new tattoo consists of`);
							if (slave.stampTat === "advertisements") {
								r.push(`blunt advertisements for anal sex.`);
							} else if (slave.stampTat === "rude words") {
								r.push(`mocking references to anal sex.`);
							} else if (slave.stampTat === "degradation") {
								r.push(`insulting invitations for anal sex.`);
							}
						}

						if (tankBorn) {
							r.push(`It seems ${he} <span class="hotpink">enjoys it.</span>`);
							slave.devotion += 5;
						} else {
							if (slave.devotion > 20) {
								r.push(`${He} gasps at the realization that taking it up the ass is about to become a dominant part of ${his} life. ${He} isn't surprised by that, but it's a little stark, having ${his} status as an anal slave permanently written on ${his} lower back for anyone to see. Nevertheless, ${he} <span class="hotpink">resolves to do ${his} best.</span>`);
								slave.devotion += 5;
							} else {
								r.push(`${He} begins to cry softly. It's not likely that ${he} didn't know, on some level, that ${he}'s a sex slave, and that most sex slaves are expected to take it up the ass. ${He}'s <span class="gold">frightened</span> to find, though, that it's apparently so essential to ${his} existence that it's worth tattooing right over ${his} bottom. ${He} continues to weep as you lead ${him} out, but <span class="hotpink">offers no real resistance.</span> ${He}'s just mourning ${his} poor anal sphincter in an anticipatory sort of way.`);
								slave.devotion += 5;
								slave.trust -= 5;
							}
						}

						App.Events.refreshEventArt(slave);
						return r.join(" ");
					},
				});
			}

			choice({
				// TODO: tankBorn
				linkName: `Brand ${him} on the ${brandTarget}`,
				result: function(slave) {
					const r = [];
					r.push(`You drag ${him} to the body modification studio and strap ${him} down with ${his} ${brandTarget} clear and defenseless. ${He} doesn't understand what's coming for a while, even as disinfectant is applied to ${his} ${brandTarget}. ${He} can't see the approaching brand,`);
					if (!canSee(slave)) {
						r.push(`of course,`);
					}
					r.push(`but eventually ${he} feels the radiated heat on ${his} skin and manages to get one inarticulate, wordless noise of terror out before the dreadful sizzling noise and the sweet smell of burning flesh. If ${he} didn't know ${he} was a slave before, <span class="mediumorchid">${he} does now,</span> and ${he}'s got the <span class="gold">agonizing</span> <span class="health dec">injury</span> to prove it.`);
					if (V.arcologies[0].FSSubjugationistRace === slave.race && V.arcologies[0].FSSubjugationist > 0) {
						r.push(`Society <span class="green">approves</span> of your purchase and branding of an inferior ${slave.race} person; this advances the idea that ${slave.race} people ought to be enslaved.`);
						FutureSocieties.Change("Subjugationist", 2);
					} else if ((V.arcologies[0].FSSupremacistRace === slave.race) && (V.arcologies[0].FSSupremacist > 0)) {
						r.push(`Society <span class="red">disapproves</span> of your purchase and branding of ${addA(slave.race)} person; this reduces support for the idea that ${slave.race} people are superior.`);
						FutureSocieties.Change("Supremacist", -2);
					}
					applyBrand();
					App.Events.refreshEventArt(slave);
					return r.join(" ");
				},
			});

			if (slave.dick === 0 && slave.vagina > -1) {
				choice({
					linkName: `Give ${him} a smart clitoral piercing`,
					result: function(slave) {
						cashX(forceNeg(V.SPcost), "slaveMod", slave);
						slave.piercing.genitals.smart = true;
						slave.piercing.genitals.weight = 2;
						App.Events.refreshEventArt(slave);
						return `You take ${him} to the body modification studio, strap ${him} down, pierce ${his} clit, and insert what appears to be a large stainless steel barbell piercing. It actually contains a device that can vibrate to give ${him} sexual stimulation or create subtle pain to suppress pleasure. It is connected wirelessly to the arcology, which can be given instructions to encourage or discourage sexual pleasure in specific situations. You run a quick test. On the oral setting, as soon as ${he} kneels in front of your crotch, ${he} gasps as the stimulation starts. On the anal setting, ${he} whimpers when you run a finger across ${his} asshole.`;
					},
					note: `This option costs ${cashFormat(V.SPcost)}`
				});
			} else {
				choice({
					linkName: `Give ${him} a smart frenulum piercing`,
					result: function(slave) {
						const r = [];
						cashX(forceNeg(V.SPcost), "slaveMod", slave);
						r.push(`You take ${him} to the body modification studio, strap ${him} down, pierce ${his} frenulum, and insert what appears to be a large stainless steel barbell piercing. It actually contains a device that can vibrate to give ${him} sexual stimulation or create subtle pain to suppress pleasure. It is connected wirelessly to the arcology, which can be given instructions to encourage or discourage sexual pleasure in specific situations. You run a quick test. On the oral setting, as soon as ${he} kneels in front of your crotch, ${he} gasps as the stimulation starts. On the anal setting, ${he} whimpers and gets rock hard when you run a finger across ${his} asshole.`);
						slave.piercing.genitals.smart = true;
						slave.piercing.genitals.weight = 2;
						App.Events.refreshEventArt(slave);
						return r.join(" ");
					},
					note: `This option costs ${cashFormat(V.SPcost)}`
				});
			}

			lineBreak();
			if (slave.indentureRestrictions <= 0) {
				choice({
					linkName: `Whip ${him} until ${he} scars`,
					result: function(slave) {
						const r = [];
						App.Medicine.Modification.addScourged(slave);
						cashX(forceNeg(V.modCost), "slaveMod", slave); // Let's just bill once, for the whip and disinfectant.
						r.push(`You drag ${him} to the`);
						if (V.cellblock) {
							r.push(V.cellblockName);
						} else {
							r.push(`body modification studio`);
						}
						r.push(`and`);
						if (!isAmputee(slave)) {
							r.push(`chain ${him} spread-eagled`);
						} else {
							r.push(`secure ${him}`);
						}
						r.push(`with ${his} face to the wall and ${his} naked back defenseless. ${He} doesn't understand what's coming for a while, even as disinfectant is applied from ${his} neck`);
						if (hasAnyLegs(slave)) {
							r.push(`to ${his} ${knees}.`);
						} else {
							r.push(`down.`);
						}
						r.push(`${He} can't see you prepare the whip,`);
						if (!canSee(slave)) {
							r.push(`of course,`);
						}
						if (canHear(slave)) {
							r.push(`but almost jumps out of ${his} ${slave.skin} skin when you crack it behind ${him}.`);
						} else {
							r.push(`and in ${his} deaf state every blow is a devastating surprise.`);
						}
						r.push(`${He} frantically`);
						if (!isAmputee(slave)) {
							r.push(`wrenches ${his}`);
							if (hasAnyArms(slave)) {
								r.push(hands);
								if (hasAnyLegs(slave)) {
									r.push(`and`);
								}
							}
							if (hasAnyLegs(slave)) {
								r.push(feet);
							}
							r.push(`as you work up and down ${his} exposed back and`);
							if (getLimbCount(slave)) {
								r.push(`limbs,`);
							} else {
								r.push(`limb,`);
							}
							r.push(`but is completely unable to get free.`);
						} else {
							r.push(`twists and turns, but without limbs is powerless to escape the curling whip.`);
						}
						r.push(`If ${he} didn't know ${he} was a slave before, <span class="mediumorchid">${he} does now,</span> and ${he}'s got the <span class="gold">agonizing</span> <span class="health dec">injury</span> to prove it. What ${he} doesn't yet know is just how permanent this lashing's effects will be. The level of violence and the coating you used will leave ${him} scarred with the marks of slavery forever.`);
						if (V.arcologies[0].FSSubjugationistRace === slave.race && V.arcologies[0].FSSubjugationist > 0) {
							r.push(`Society <span class="green">approves</span> of your purchase and whipping of an inferior ${slave.race} person; this advances the idea that ${slave.race} people ought to be enslaved.`);
							FutureSocieties.Change("Subjugationist", 2);
						} else if ((V.arcologies[0].FSSupremacistRace === slave.race) && (V.arcologies[0].FSSupremacist > 0)) {
							r.push(`Society <span class="red">disapproves</span> of your purchase and whipping of ${addA(slave.race)} person; this reduces support for the idea that ${slave.race} people are superior.`);
							FutureSocieties.Change("Supremacist", -2);
						}
						slave.devotion -= 5;
						slave.trust -= 10;
						healthDamage(slave, 10);
						App.Events.refreshEventArt(slave);
						return r.join(" ");
					},
					note: `This option costs ${cashFormat(V.modCost)}`
				});
				choice({
					linkName: `Scar ${him} on the ${scarTarget}`,
					result: function(slave) {
						const r = [];
						r.push(`You drag ${him} to the body modification studio and strap ${him} down with ${his} ${scarTarget} clear and defenseless. ${He} doesn't understand what's coming for a while, even as disinfectant is applied to ${his} ${scarTarget}. You have a wide selection of tools to create scars, the trick is to keep the wound from healing correctly afterwards. Of course, ${he} has no way of knowing that the pain you are inflicting as you cut into ${his} flesh will leave such a permanent mark, but the basic message is clear: if ${he} didn't know ${he} was a slave before, <span class="mediumorchid">${he} does now,</span> and ${he}'s got the <span class="gold">agonizing</span> <span class="health dec">injury</span> to prove it.`);
						if (V.arcologies[0].FSSubjugationistRace === slave.race && V.arcologies[0].FSSubjugationist > 0) {
							r.push(`Society <span class="green">approves</span> of your purchase and scarring of an inferior ${slave.race} person; this advances the idea that ${slave.race} people ought to be enslaved.`);
							FutureSocieties.Change("Subjugationist", 2);
						} else if ((V.arcologies[0].FSSupremacistRace === slave.race) && (V.arcologies[0].FSSupremacist > 0)) {
							r.push(`Society <span class="red">disapproves</span> of your purchase and scarring of ${addA(slave.race)} person; this reduces support for the idea that ${slave.race} people are superior.`);
							FutureSocieties.Change("Supremacist", -2);
						}
						App.Medicine.Modification.addScar(slave, scarTarget, V.scarDesign.primary);
						slave.devotion -= 5;
						slave.trust -= 10;
						healthDamage(slave, 10);
						App.Events.refreshEventArt(slave);
						return r.join(" ");
					},
				});
			}
			lineBreak();
			if (V.arcologies[0].FSHedonisticDecadence >= 50 && slave.behavioralFlaw === "anorexic" && slave.weight < 10) {
				choice({
					// TODO: tankBorn
					linkName: `Force-feed ${him}`,
					result(slave) {
						const r = [];
						r.push(`${He} is much too thin and seems to shirk any offered food, but there is an easy solution to that. If ${he} refuses to eat, ${he} can be made to. Pulling the reluctant slave to the feeders, binding ${him} tightly to a chair, and attaching a hose to the slave food nozzle, you give ${him} a choice; suck the hose willingly or have it forced down ${his} throat. ${He} glares defiantly and keeps ${his} mouth firmly shut. You clamp down on ${his} nose, inevitably forcing ${him} to open ${his} mouth to breathe. In that moment, you shove the hose in and down ${his} throat, carefully directing it down into ${his} stomach. ${He} gags as you turn on the flow, ${his} eyes filling with tears as ${he} feels the warm food travel down the tube and into ${his} stomach. ${He} sobs as ${his} belly steadily swells with unwelcome sustenance, ${his} eyes pleading with you, desperate to let you know ${he}'ll be good. You ignore ${him}, letting ${him} fill until ${his} belly is noticeably distended compared to ${his} thin frame. Once you feel ${he} has had enough, you pull the hose from ${his} gut, spraying ${his} face with food in the process, and tell ${him} it will go right back in if ${he} doesn't keep it all down. ${He} <span class="gold">nods fearfully,</span> anything to not go through that again. ${He} hobbles away once freed,`);
						r.push(`one hand covering ${his} retching mouth and the other clasping ${his} <span class="mediumorchid">hated, food-bloated middle.</span>`); // TODO: revise for hands
						slave.devotion -= 10;
						slave.trust -= 10;
						slave.inflation = 1;
						SetBellySize(slave);
						App.Events.refreshEventArt(slave); // temporarily inflate, refresh art, then deflate
						deflate(slave);
						return r.join(" ");
					},

				});
			}
			lineBreak();
			if (slave.pregKnown === 1 && V.seeExtreme === 1) {
				choice({
					// TODO: tankBorn
					linkName: `Threaten ${his} pregnancy`,
					result(slave) {
						const r = [];
						r.push(`You place an innocuous-looking drug injector on your desk, and ${him}`);
						if (!canSee(slave)) {
							r.push(`blindly`);
						}
						r.push(`stare at it for a long moment. Then, you roll the cylinder slowly across the smooth surface, rotating it until its label comes into`);
						if (canSee(slave)) {
							r.push(`${his}`);
						} else {
							r.push(`your`);
						}
						r.push(`view. It depicts the silhouette of a pregnant woman, with a red "X" over it. Abortifacients. After`);
						if (!canSee(slave)) {
							r.push(`a short period`);
						} else {
							r.push(`an instant`);
						}
						r.push(`of horrified comprehension, ${he} flings ${himself} at your feet, crying, begging, promising. ${He} pledges to <span class="hotpink">submit to you,</span>`);
						if (PC.dick !== 0) {
							if (PC.vagina !== -1) {
								r.push(`eat you out,`);
							}
							r.push(`suck your cock, take it in ${his} pussy, take it up ${his} ass,`);
						} else {
							r.push(`eat you out, worship you with ${his} pussy, serve you with ${his} ass,`);
						}
						r.push(`anything, as long as <span class="gold">you don't hurt ${his} baby.</span> You observe that ${he}'ll do all of those things, regardless of what you decide to do about ${his} pregnancy, but for now, you'll keep ${him} as a pregnant slut. ${He} thanks you through ${his} tears.`);
						slave.devotion += 10;
						slave.trust -= 10;
						return r.join(" ");
					},

				});
			}
			lineBreak();
			if ((V.arcologies[0].FSRestart >= 10) && (slave.preg !== -3) && (slave.ovaries > 0) && (slave.indentureRestrictions <= 0) && (V.seeExtreme === 1)) {
				choice({
					linkName: `Sterilize ${him}`,
					result(slave) {
						const r = [];
						r.push(`You drag ${him} to the remote surgery and strap ${him} face-up with ${his}`);
						if (slave.bellyPreg >= 1500) {
							r.push(`pregnant`);
						}
						r.push(`stomach bare. ${He} doesn't understand what's coming for a while, even${(tankBorn) ? ` giggling` : ``} as ${his} belly is carefully cleaned and disinfected. ${He} begins to panic at the`);
						if (canSee(slave)) {
							r.push(`sight`);
						} else if (canHear(slave)) {
							r.push(`sound`);
						} else {
							r.push(`touch`);
						}
						r.push(`of the approaching surgical manipulators, cringing as they cut into ${his}`);
						if (slave.bellyPreg >= 1500) {
							r.push(`rounded`);
						}
						r.push(`abdomen. ${He} squeals in horror as ${his}`);
						if (slave.preg > slave.pregData.normalBirth / 1.33) {
							r.push(`swollen womb, still moving with life,`);
						} else if (slave.bellyPreg >= 1500) {
							r.push(`pregnant womb`);
						} else {
							r.push(`womb`);
						}
						r.push(`and ovaries are extracted${canSee(slave) ? ` before ${his} eyes` : ``}.`);

						if (slave.fetish === "pregnancy" && slave.pregKnown === 1) {
							if ((slave.preg > slave.pregData.normalBirth / 1.6) && (canSee(slave))) {
								r.push(`${He} watches ${his} exposed womb with absolute terror in ${his} eyes. A small handprint bulges against the organ; ${he} sobs once before ${his} mind <span class="red">shatters at the sight.</span>`);
								applyMindbroken(slave);
							} else {
								r.push(`${He} will never carry another child, and`);
								if (tankBorn) {
									r.push(`and will <span class="mediumorchid">remember ${his} status</span> with every fucking ${he} receives. Your absolute power is rightfully <span class="gold">terrifying</span> to ${his} undeveloped mind.`);
								} else {
									r.push(`<span class="mediumorchid">deeply hates you</span> for snuffing out its life. Your absolute power over ${his} body is rightfully <span class="gold">terrifying.</span>`);
								}
								slave.trust = -100;
								slave.devotion = -100;
							}
						} else {
							r.push(`${He} will never`);
							if (slave.counter.birthsTotal > 0) {
								r.push(`again`);
							}
							r.push(`bear children, and will <span class="mediumorchid">remember ${his} status</span> with every fucking ${he} receives. Your absolute power over ${his} body is rightfully <span class="gold">terrifying.</span>`);
							slave.trust -= 20;
							slave.devotion -= 50;
						}
						r.push(`Society <span class="green">approves</span> of your promptly rendering ${him} sterile; this advances the idea that only the elite should breed.`);
						FutureSocieties.Change("Eugenics", 1);
						if (slave.pregKnown === 1) {
							r.push(`Since you snuffed out an unworthy life in the process, the sterilization has an even <span class="green">bigger impact.</span>`);
							FutureSocieties.Change("Eugenics", 2);
						}
						TerminatePregnancy(slave);
						slave.preg = -3;
						slave.ovaries = 0;
						actX(slave, "abortions");
						surgeryDamage(slave, 10);
						return r.join(" ");
					},

				});
			}
			lineBreak();
			if (slave.balls > 0 && slave.vasectomy === 0 && slave.indentureRestrictions <= 1) {
				choice({
					// TODO: tankBorn
					linkName: `Snip ${his} vas deferens`,
					result(slave) {
						const r = [];
						r.push(`You drag ${him} to the remote surgery and strap ${him}`);
						if (slave.scrotum > 0) {
							r.push(`face-down with ${his}`);
							if (hasAnyLegs(slave)) {
								r.push(`${hasBothLegs(slave) ? `legs` : `leg`} spread.`);
							} else {
								r.push(`testicles exposed.`);
							}
							r.push(`${He} doesn't understand what's coming for a while, even as ${his}`);
							if (slave.balls === 1) {
								r.push(`tiny balls`);
							} else if (slave.balls === 2) {
								r.push(`small balls`);
							} else if (slave.balls === 3) {
								r.push(`balls`);
							} else if (slave.balls === 4) {
								r.push(`big balls`);
							} else if (slave.balls === 5) {
								r.push(`lemon-sized balls`);
							} else if (slave.balls < 10) {
								r.push(`fist-sized balls`);
							} else {
								r.push(`hypertrophied balls`);
							}
							r.push(`are carefully cleaned and disinfected. ${He} can't see the approaching surgical manipulators,`);
							if (!canSee(slave)) {
								r.push(`of course,`);
							}
							r.push(`but eventually ${he} feels a small tugging on the sides of ${his} scrotum even through the local anesthetic.`);
						} else {
							r.push(`You drag ${him} to the remote surgery and strap ${him} face-up on the operating table. ${He} doesn't understand what's coming for a while, even as ${his} crotch and lower stomach are carefully cleaned and disinfected.`);
							if (!canSee(slave)) {
								r.push(`${He} can't see the approaching surgical manipulators, of course, but eventually ${he} feels a small pinch to either side of ${his} pubic mound even through the local anesthetic.`);
							} else {
								r.push(`${He} freezes at the sight of the surgical manipulators and squirms slightly as they slip into the sides of ${his} pubic mound.`);
							}
						}
						r.push(`${He} gets one squeal of protest out before the surgery begins to apply healing agents. ${He} knows something was done to ${his} testicles and will <span class="mediumorchid">remember this act</span> with every load ${he} shoots. ${He} <span class="gold">can only imagine</span> what other modifications you may have planned for ${him}.`);
						slave.vasectomy = 1;
						slave.devotion -= 5;
						surgeryDamage(slave, 10);
						slave.trust -= 5;
						return r.join(" ");
					},

				});
			}
			lineBreak();
			if ((slave.balls > 0) && (slave.attrXY < 65) && (V.seeExtreme === 1)) {
				choice({
					// TODO: tankBorn
					linkName: `Threaten ${his} balls`,
					result(slave) {
						const r = [];
						r.push(`You ask ${him} how ${he} feels about taking cock up ${his} ass. A look of revulsion and fear crosses ${his} face, and ${he} backs away from you slightly, unconsciously protecting ${his} bottom. Before ${he} can muster any kind of response, you tell ${him} that you suspected as much, and that ${he} has balls. ${He} looks confused at the apparently unrelated remarks until you explain that in your arcology, balls are a privilege. If ${he} won't be a good little bitch, you'll take them away and turn ${him} into a bitch anyway. Only good ${girl}s get to keep their hard-ons, and if ${he} isn't a good ${girl}, you'll make ${him} a good little ${girl} with a bouncing little bitchclit. ${He} begins to cry, <span class="gold">sobbing and sobbing</span> as ${he} promises to <span class="hotpink">be a good ${girl}.</span>`);
						slave.devotion += 10;
						slave.trust -= 10;
						return r.join(" ");
					},

				});
			}
			lineBreak();
			if (slave.indentureRestrictions <= 0 && V.seeExtreme === 1) {
				if (slave.balls > 0) {
					choice({
						linkName: `Geld ${him}`,
						result(slave) {
							const r = [];
							r.push(`You drag ${him} to the remote surgery and strap ${him} face-down with ${his} legs spread. ${He} doesn't understand what's happening,`);
							if (tankBorn) {
								r.push(`but giggles at the sensations running through ${his} numb body.`);
							} else {
								r.push(`since the anesthetics totally deprive ${him} of any sensation.`);
							}
							r.push(`${He}'s so drugged and drowsy with <span class="health dec">surgical recovery</span> that it takes a while for ${him} to figure out what's happened. When ${he} does, ${his} poor mind scarcely processes the <span class="gold">horror</span> of what's happened.`);
							if (tankBorn) {
								r.push(`${He} spends the rest of the week dimly trying to find where ${his} balls went.`);
							} else {
								r.push(`${He} numbly carries on, terrified.`);
							}
							if (FutureSocieties.isActive('FSGenderRadicalist')) {
								r.push(`Society <span class="green">approves</span> of your promptly gelding ${him}; this advances the idea that all societal inferiors can be made female.`);
								FutureSocieties.Change("Gender Radicalist", 2);
							}
							if (FutureSocieties.isActive('FSRestart') && slave.pubertyXY === 1) {
								r.push(`Society <span class="green">approves</span> of your promptly gelding ${him}; this advances the idea that only the elite should breed.`);
								FutureSocieties.Change("Eugenics", 2);
							}
							slave.balls = 0;
							slave.scrotum = 0;
							surgeryDamage(slave, 10);
							slave.trust -= 50;
							App.Events.refreshEventArt(slave);
							return r.join(" ");
						},

					});
				}
				choice({
					// TODO: tankBorn
					linkName: `Remove ${his} genitalia`,
					result(slave) {
						const r = [];
						r.push(`You drag ${him} to the remote surgery and strap ${him} face-down with ${his} legs spread. ${He} doesn't understand what's happening, since the anesthetics totally deprive ${him} of any sensation. ${He}'s so drugged and drowsy with <span class="health dec">surgical recovery</span> that it takes a while for ${him} to figure out what's happened. Eventually, though, ${he} realizes that ${he}'s been reduced to the status of a genital null: the only remaining feature of ${his} newly smooth groin is a tiny soft hole, ${his} urethra.`);
						if (slave.scrotum > 0) {
							r.push(`${He} retains ${his} ballsack beneath this, though of course you can always remove that later if you decide to geld ${him}, too.`);
						}
						r.push(`${He} almost passes out from <span class="gold">sheer horror.</span> Instead, ${he} collapses and tries desperately to vomit. Fortunately, ${he} doesn't have anything to bring up. ${He}'s reduced to impotent weeping and retching as ${he} begins to process the stress of having had ${his} parts cut off.`);
						if (FutureSocieties.isActive('FSRestart')) {
							r.push(`Society <span class="green">approves</span> of you stripping away everything from society's inferiors.`);
							FutureSocieties.Change("Eugenics", 3);
						}
						slave.chastityPenis = 0;
						slave.chastityVagina = 0;
						slave.dick = 0;
						slave.foreskin = 0;
						slave.ovaries = 0;
						slave.preg = -2;
						TerminatePregnancy(slave);
						actX(slave, "abortions");
						slave.vagina = -1;
						slave.skill.vaginal = 0;
						surgeryDamage(slave, 10);
						slave.trust = Math.clamp(slave.trust - 100, -100, 100);
						App.Events.refreshEventArt(slave);
						return r.join(" ");
					},

				});
			}
			lineBreak();
			if (hasAnyNaturalLegs(slave) && (slave.indentureRestrictions <= 0) && (V.seeExtreme === 1)) {
				choice({
					linkName: `Clip ${his} Achilles tendons`,
					result(slave) {
						const r = [];
						r.push(`You drag ${him} to the remote surgery and strap ${him} face-down with ${his} legs bare. ${He} doesn't understand what's coming for a while, even as ${his} lower legs are carefully cleaned and disinfected. ${He} can't see the approaching surgical manipulators,`);
						if (!canSee(slave)) {
							r.push(`of course,`);
						}
						r.push(`but eventually ${he} feels a tugging at ${his} lower legs even through the local anesthetic. ${He} gets one squeal of protest out before the surgery begins to apply healing agents. ${He} now requires special heels to walk, and will`);
						if (tankBorn) {
							r.push(`<span class="gold">remember your power</span> with every <span class="health dec">painful</span> step ${he} takes. ${He} seems <span class="hotpink">inappropriately happy</span> about getting to wear pretty shoes when ${he} can no longer walk without them.`);
							slave.devotion += 5;
							slave.trust -= 5;
						} else {
							r.push(`<span class="mediumorchid">remember ${his} status</span> with every <span class="health dec">painful</span> step ${he} takes. ${He}'s barefoot, crawling, and <span class="gold">frightened</span> for now, until you decide to give ${him} heels — if you ever do.`);
							slave.devotion -= 5;
							slave.trust -= 20;
						}
						surgeryDamage(slave, 10);
						slave.heels = 1;
						return r.join(" ");
					},

				});
			}
			lineBreak();
			if (slave.lactation !== 2 && slave.indentureRestrictions <= 0) {
				choice({
					// TODO: tankBorn
					linkName: `Implant ${him} with slow release lactation drugs`,
					result(slave) {
						const r = [];
						r.push(`You`);
						if (slave.devotion > 20) {
							r.push(`guide the compliant ${desc}`);
						} else {
							r.push(`have the ${desc} restrained and brought`);
						}
						r.push(`to the remote surgery. The procedure is quick and <span class="health dec">minimally invasive.</span>`);
						surgeryDamage(slave, 10);
						r.push(`Once the process is complete and the anesthesia subsides ${he} begins to feel a rising pressure within ${his}`);
						if (slave.boobs > 2000) {
							r.push(`gigantic udders.`);
						} else if (slave.boobs > 900) {
							r.push(`plentiful bosom.`);
						} else if (slave.boobs > 400) {
							r.push(`healthy breasts.`);
						} else {
							r.push(`small breasts.`);
						}
						r.push(`You then`);
						if (slave.devotion > 20) {
							r.push(`instruct ${him} to rest`);
						} else {
							r.push(`have ${him} restrained`);
						}
						r.push(`beside your desk until further notice. After a few hours ${his} increasing discomfort becomes obvious, and white droplets begin to appear across ${his} nipples and areola.`);
						if (slave.devotion > 20) {
							if (slave.fetish === "boobs") {
								if (slave.fetishKnown === 0) {
									if (V.servantMilkers === 1) {
										r.push(`You escort ${him} to one of the many milkers installed in the penthouse and instruct ${him} in its use. The combined sensations of nipple stimulation and relief visibly overwhelm ${him}, and the resulting series of orgasms leaves ${him} exhausted.`);
										r.push(`<span class="green">${He}'s a breast fetishist!</span>`);
										slave.fetishKnown = 1;
									} else {
										r.push(`You kneel behind ${him} and begin to gently massage ${his} swollen breasts. A steady stream of milk begins to erupt from each nipple, and the intense sensation of relief and stimulation overwhelms ${him}. It doesn't take long for ${him} to reach the first of a series of orgasms, leaving ${him} exhausted.`);
										r.push(`<span class="green">${He}'s a breast fetishist!</span>`);
										slave.fetishKnown = 1;
									}
								} else {
									if (V.servantMilkers === 1) {
										r.push(`You escort ${him} to one of the many milkers installed in the penthouse and instruct ${him} in its use. ${His} breast fetish makes the experience comparable to sex for &him, and the resulting series of orgasms leaves ${him} exhausted.`);
									} else {
										r.push(`You kneel behind ${him} and begin to gently massage ${his} swollen breasts. A steady stream of milk begins to erupt from each nipple. ${His} breast fetish makes the experience comparable to sex for ${him}, and the resulting series of orgasms leaves ${him} exhausted.`);
									}
								}
								r.push(`After allowing ${him} to rest for a bit you instruct ${him} to report for ${his} first assignment. As ${he} leaves your office ${he} can already feel the pressure returning to ${his} chest. <span class="hotpink">As far as ${he}'s concerned ${his} next milking can't come soon enough.</span>`);
								slave.devotion += 5;
							} else {
								if (V.servantMilkers === 1) {
									r.push(`You escort ${him} to one of the many milkers installed in the penthouse and instruct ${him} in its use. The sensation of relief is pleasant for ${him}, and ${he} moans softly as ${his} breasts drain into the apparatus.`);
								} else {
									r.push(`You kneel behind ${him} and begin to gently massage ${his} swollen breasts. A steady stream of milk begins to erupt from each nipple, and the sensation of relief is pleasant for ${him}. ${He} moans softly as you proceed to drain ${his} swollen breasts.`);
								}
								r.push(`Once drained, you instruct ${him} to report for ${his} first assignment. As ${he} leaves your office ${he} can already feel the pressure returning to ${his} chest. ${He} appreciates that ${his} next milking will be a nice break from ${his} regular duties. <span class="hotpink">It doesn't hurt that these breaks are both profitable for you, and pleasurable for ${him}.</span>`);
								slave.devotion += 4;
							}
						} else {
							if (slave.fetish === "boobs") {
								if (slave.fetishKnown === 0) {
									if (V.servantMilkers === 1) {
										r.push(`You escort ${him} to one of the many milkers installed in the penthouse and attach ${him} to the device, leaving ${his} restraints in place. ${He} is still struggling when you activate the device, and the sudden sensation of relief catches ${him} off guard. A primal moan erupts from the bottom of ${his} throat, and it's obvious to both of you that ${he}'s enjoying this in spite of ${himself}. ${He} spends the rest of ${his} milking trying and failing to hide the obvious pleasure ${he}'s deriving from ${his} predicament.`);
										r.push(`<span class="green">${He}'s a breast fetishist!</span>`);
										slave.fetishKnown = 1;
									} else {
										r.push(`You kneel behind ${him} and begin to gently massage ${his} swollen breasts. A steady stream of milk begins to erupt from each nipple. The sensation overwhelms ${him} almost immediately, and ${his}`);
										if (hasBothArms(slave)) {
											r.push(`arms struggle`);
										} else {
											r.push(`body struggles`);
										}
										r.push(`against ${his} restraints as ${he} fights an impending orgasm. It's an amusing sight that goes on until ${he} is fully drained.`);
										r.push(`<span class="green">${He}'s a breast fetishist!</span>`);
										slave.fetishKnown = 1;
									}
								} else {
									if (V.servantMilkers === 1) {
										r.push(`You escort ${him} to one of the many milkers installed in the penthouse and attach ${him} to the device, leaving ${his} restraints in place. ${His} breast fetish soon overcomes ${his} obvious disdain for ${his} situation, and ${he} spends the milking red in the face, fighting an obviously impending orgasm.`);
									} else {
										r.push(`You kneel behind ${him} and begin to gently massage ${his} swollen breasts. A steady stream of milk begins to erupt from each nipple. With a sharp intake of breath ${he} begins to squirm, and ${his} breast fetish soon has ${him} moaning and writhing as ${he} fights an intense orgasm with tears of shame rolling down ${his} flushed cheeks.`);
									}
								}
								r.push(`As you summon`);
								if (V.HeadGirlID !== 0) {
									r.push(`your Head Girl`);
								} else {
									r.push(`another slave`);
								}
								r.push(`to escort the ${girl} to ${his} first assignment, ${he} slumps dejectedly in ${his} restraints. ${He} is torn between the knowledge that ${he} is little more than livestock to you, and the disturbing realization that <span class="hotpink">${he} might enjoy ${his} new life as a human cow.</span>`);
								slave.devotion += 4;
							} else {
								if (V.servantMilkers === 1) {
									r.push(`You escort ${him} to one of the many milkers installed in the penthouse and attach ${him} to the device. ${He} struggles against ${his} restraints as you activate the device, drawing a brief pause and a look of confusion as ${his} breasts begin to drain. This only lasts a moment before ${he} returns to ${his} futile struggle, but ${his} milking continues regardless.`);
								} else {
									r.push(`You kneel behind ${him} and begin to gently massage ${his} swollen breasts. A steady stream of milk begins to erupt from each nipple as a look of confusion washes over ${his} features. ${He} then closes ${his} eyes tight and does ${his} best to ignore what's happening in a futile attempt to deny ${his} new reality, but you continue ${his} milking until ${he} is drained.`);
								}
								r.push(`As you summon`);
								if (V.HeadGirlID !== 0) {
									r.push(`your Head Girl`);
								} else {
									r.push(`another slave`);
								}
								r.push(`to escort the ${girl} to ${his} first assignment ${he} glares at you with disgust. ${His} resentment at the new burden you've saddled ${him} with is evident, and the regular milkings ${he}'ll require will serve to remind ${him} of the <span class="gold">disturbing fact that ${he} is little more than livestock to you.</span>`);
								slave.devotion -= 4;
							}
						}
						slave.lactation = 2;
						return r.join(" ");
					},

				});
			}
			lineBreak();

			App.UI.DOM.appendNewElement("div", p, `...or show ${him} what it's like here for a slave`, "note");

			if (slave.fetish !== Fetish.MINDBROKEN) {
				/*
				choice({
					linkName: `Teach ${him} how to use ${his} throat`,
					result(slave) {
						const r = [];
						r.push(`TODO: write this`);
						return r.join(" ")
					},

				})
				*/

				choice({
					linkName: `Inseminate ${him}`,
					result(slave) {
						const r = [];
						r.push(`You`);
						if (tankBorn) {
							r.push(`lay the curious ${desc} across your desk`);
						} else if (slave.devotion > 20 || slave.trust < -20) {
							r.push(`lay the obedient ${desc} across your desk`);
						} else {
							r.push(`force the resistant ${desc} to lie atop your desk`);
						}
						r.push(`and gently`);
						if (PC.dick !== 0) {
							r.push(`slide your hard cock`);
						} else {
							r.push(`push a special strap-on`);
						}
						if (slave.vagina >= 0) {
							r.push(`inside ${his} womanhood.`);
						} else {
							r.push(`up ${his} butt.`);
						}
						r.push(`You take ${him} with care, enjoying ${his} body`);
						if (slave.devotion > 20 || slave.trust < -20) {
							r.push(`and doing your best to give ${him} pleasure, too.`);
						} else {
							r.push(`without hurting ${him}.`);
						}
						if (PC.dick !== 0) {
							r.push(`You empty your balls inside ${him}, thrusting in as far as you can go`);
						} else {
							r.push(`The strap-on contains a reservoir of faux ejaculate, and you give it to ${him}`);
						}
						r.push(`as you climax. When ${he} feels the hot liquid jet into ${him},`);
						if (tankBorn) {
							r.push(`${he} moans lewdly and relaxes, giving in to the tank's teachings. ${He} might not be an impregnation fetishist, but ${he} is <span class="hotpink">willing to submit</span> to have ${his} body used as your receptacle and may even grow to enjoy it.`);
							slave.devotion += 4;
							if (random(1, 100) > 60 && slave.fetish === Fetish.NONE) {
								slave.fetish = "pregnancy";
								slave.fetishStrength = 20;
							}
						} else if (slave.devotion > 20) {
							if (slave.fetish === "pregnancy") {
								if (slave.fetishKnown === 0) {
									r.push(`${he} gasps with unaccustomed pleasure, and climaxes so strongly that ${he} cries a little from the pain in ${his} flexing abs. <span class="green">${He}'s an impregnation fetishist!</span>`);
									slave.fetishKnown = 1;
								} else {
									r.push(`${he} climaxes, ${his} impregnation fetish displayed cutely on ${his} face.`);
								}
								r.push(`As you let ${him} go, ${he} feels`);
								if (PC.dick !== 0) {
									r.push(`your`);
								} else {
									r.push(`the fake`);
								}
								r.push(`cum dripping out of ${him}, and ${he} <span class="hotpink">feels like your property.</span>`);
								slave.devotion += 5;
							} else {
								r.push(`${he} gasps and does ${his} best to relax, accepting the flow.`);
								if (slave.fetishKnown === 0) {
									r.push(`It seems ${he}`);
								} else {
									r.push(`${He}`);
								}
								r.push(`isn't an impregnation fetishist, but ${he} is <span class="hotpink">willing to submit</span> to have ${his} body used as your receptacle.`);
								slave.devotion += 4;
							}
						} else {
							if (slave.fetish === "pregnancy") {
								if (slave.fetishKnown === 0) {
									r.push(`${he} shudders with a sensation of perverted pleasure, and climaxes despite all ${his} feelings about the situation. <span class="green">${He}'s an impregnation fetishist!</span>`);
									slave.fetishKnown = 1;
								} else {
									r.push(`${he} climaxes, ${his} impregnation fetish forcing ${him} to feel pleasure ${his} mind would prefer to reject.`);
								}
								r.push(`As you let ${him} go, ${he} cries openly,`);
								if (PC.dick !== 0) {
									r.push(`your`);
								} else {
									r.push(`the fake`);
								}
								r.push(`cum dripping out of ${him}, and ${he} <span class="hotpink">feels like your property.</span>`);
								slave.devotion += 4;
							} else {
								r.push(`${he} groans and struggles a little, disgusted to be filled by your fluids so immediately.`);
								if (slave.fetishKnown === 0) {
									r.push(`It seems ${he}`);
								} else {
									r.push(`${He}`);
								}
								r.push(`isn't an impregnation fetishist, and is <span class="gold">afraid</span> that ${he}'ll be treated as nothing more than your receptacle.`);
								slave.trust -= 4;
							}
						}
						r.push(VCheck.Simple(slave, 1));
						return r.join(" ");
					},

				});
			}

			if (V.seePreg !== 0 && canImpreg(slave, V.PC)) {
				choice({
					linkName: `Impregnate ${him}`,
					result(slave) {
						const el = new DocumentFragment();
						let r = [];
						if (tankBorn) {
							if (slave.readyOva > 0) {
								r.push(`You don't need to perform an exam to know that ${he} is fertile; ${his} nethers are swollen with need and ${his} pussy dripping with desire${(slave.readyOva > 20) ? `, and ${his} stomach is already slightly bloated with the number of fertile eggs within ${his} womb` : ``}. ${He} moans with pent-up lust as you <span class="virginity loss">deeply penetrate ${him}</span> and begin steadily thrusting. ${His} tight pussy hungrily massages your dick as you near your climax, prompting you to hilt yourself in ${him} before seeding the deepest reaches of ${his} pussy. ${He} <span class="devotion inc">passed out in ecstasy,</span> so you carry ${his} bred body to the couch to recover. ${He} should make the connection once ${his} belly starts to rapidly swell with child.`);
							} else {
								r.push(`You perform a careful medical examination to verify fertility, and then forcefully <span class="virginity loss">take the ${girl}'s virginity.</span> Whenever you feel able, you drain your balls into ${his} cunt, only allowing ${him} to wander off when scans verify a fertilized ovum. ${He} didn't properly understand the scans, so ${he} just <span class="devotion inc">enjoyed ${his} first sexual experience;</span> ${he} won't realize what happened for some months at least, and in the mean time, will think ${he} is just getting fat. Though once ${his} child starts kicking, ${he} might make the connection between sex and pregnancy.`);
							}
							slave.vagina = 1;
							slave.devotion += 4;
						} else {
							r.push(`You perform a careful medical examination to verify fertility, and then`);
							if (slave.devotion > 20 || slave.trust < -20) {
								r.push(`lay the obedient ${desc} across your desk`);
							} else {
								r.push(`restrain the resistant ${desc} in your office with ${his} ass in the air`);
							}
							r.push(`and gently slide your hard cock`);
							if (slave.mpreg === 1) {
								r.push(`up ${his} butt.`);
							} else {
								r.push(`inside ${his} womanhood.`);
							}
							r.push(`You take ${him} with care, enjoying ${his} body`);
							if (slave.devotion > 20 || slave.trust < -20) {
								r.push(`and doing your best to give ${him} pleasure, too.`);
							} else {
								r.push(`without hurting ${him}.`);
							}
							r.push(`You empty your balls inside ${him}, thrusting in as far as you can go as you climax. When ${he} feels the hot liquid jet into ${him},`);
							if (slave.devotion > 20) {
								if (slave.fetish === "pregnancy") {
									if (slave.fetishKnown === 0) {
										r.push(`${he} gasps with unaccustomed pleasure, and climaxes so strongly that ${he} cries a little from the pain in ${his} flexing abs. <span class="green">${He}'s an impregnation fetishist!</span>`);
										slave.fetishKnown = 1;
									} else {
										r.push(`${he} climaxes, ${his} impregnation fetish displayed cutely on ${his} face.`);
									}
									r.push(`As you let ${him} go, ${he} feels your cum dripping out of ${him}, and ${he} <span class="hotpink">feels like your property.</span>`);
									slave.devotion += 5;
								} else {
									r.push(`${he} gasps and does ${his} best to relax, accepting the flow.`);
									if (slave.fetishKnown === 0) {
										r.push(`It seems ${he}`);
									} else {
										r.push(`${He}`);
									}
									r.push(`isn't an impregnation fetishist, but ${he} is <span class="hotpink">willing to submit</span> to have ${his} body used as your receptacle.`);
									slave.devotion += 4;
								}
							} else {
								if (slave.fetish === "pregnancy") {
									if (slave.fetishKnown === 0) {
										r.push(`${he} shudders with a sensation of perverted pleasure, and climaxes despite all ${his} feelings about the situation. <span class="green">${He}'s an impregnation fetishist!</span>`);
										slave.fetishKnown = 1;
									} else {
										r.push(`${he} climaxes, ${his} impregnation fetish forcing ${him} to feel pleasure ${his} mind would prefer to reject.`);
									}
									r.push(`As you let ${him} go, ${he} cries openly, your cum dripping out of ${him}, and ${he} <span class="hotpink">feels like your property.</span>`);
									slave.devotion += 4;
								} else {
									r.push(`${he} groans and struggles a little, disgusted to be filled by your fluids so immediately.`);
									if (slave.fetishKnown === 0) {
										r.push(`It seems ${he}`);
									} else {
										r.push(`${He}`);
									}
									r.push(`isn't an impregnation fetishist, and is <span class="gold">afraid</span> that ${he}'ll be treated as nothing more than your receptacle.`);
									slave.trust -= 4;
								}
							}
							App.Events.addParagraph(el, r);

							r = [];
							r.push(`Whenever you feel able, you drain your balls into ${his}`);
							if (slave.mpreg === 1) {
								r.push(`ass,`);
							} else {
								r.push(`cunt,`);
							}
							r.push(`only releasing ${him} for other duties when scans verify a fertilized ovum.`);
							if (slave.intelligence + slave.intelligenceImplant < -50) {
								r.push(`${He} didn't properly understand the scans, so ${he} just thought it was bound, forced sex; ${he} won't realize what happened for some weeks at least.`);
							} else if (slave.fetish === "pregnancy") {
								r.push(`${He} is thrilled to imagine ${he} might be pregnant.`);
							} else {
								r.push(`${He} wasn't sure what this was all about, but ${he} has ${his} suspicions.`);
							}
							if (slave.mpreg === 1) {
								r.push(VCheck.Anal(slave, 1));
							} else {
								r.push(VCheck.Vaginal(slave, 1));
							}
						}
						if (FutureSocieties.isActive('FSRestart') && V.eugenicsFullControl !== 1) {
							r.push(`The Societal Elite <span class="green">disapprove</span> of this breach of eugenics.`);
							V.failedElite += 5;
						} else if (FutureSocieties.isActive('FSGenderFundamentalist') && slave.mpreg === 0) {
							r.push(`Society <span class="green">approves</span> of your promptly putting a new slave in ${him}; this advances the idea that all slaves should bear their masters' babies.`);
							FutureSocieties.Change("Gender Fundamentalist", 2);
						} else if (FutureSocieties.isActive('FSGenderFundamentalist')) {
							r.push(`Society <span class="red">is disgusted</span> by you promptly knocking up ${his} ass; babies come from women, not men.`);
							FutureSocieties.Change("Gender Fundamentalist", -2);
						}
						App.Events.addParagraph(el, r);

						knockMeUp(slave, 100, 2, -1);
						return el;
					},
				});
			}
			lineBreak();
			if (slave.vagina === 0) {
				choice({
					// TODO: tankBorn
					get linkName() {
						return (tankBorn) ? `Take ${his} virginity` : `Tie ${him} up and take ${his} virginity`;
					},
					result(slave) {
						const r = [];
						if (tankBorn) {
							r.push(`You gently lead ${his} unresisting body to the couch next to your desk and spread ${his} legs. ${He} writhes and moans as you enter ${his} virgin pussy, but after getting into the rhythm of sex, ${he} enthusiastically moves along trying to make the feeling even better. ${He}'s almost sad when <span class="hotpink">${his} beloved partner</span> finishes, but <span class="mediumaquamarine">hopes</span> ${he}'ll get to play sex with you again soon. <span class="lime">${His} tight little pussy has been broken in.</span>`);
							slave.devotion += 5;
							slave.trust += 5;
						} else if (slave.devotion < -10) {
							if (isAmputee(slave)) {
								r.push(`You secure ${his} struggling, screeching body to the couch next to your desk with ${his} vagina exposed.`);
							} else {
								r.push(`You cuff ${his}`);
								if (hasAnyArms(slave)) {
									r.push(wrists);
									if (hasAnyLegs(slave)) {
										r.push(`and`);
									}
								}
								if (hasAnyLegs(slave)) {
									r.push(ankles);
								}
								r.push(`and secure ${his} struggling, screeching body to the couch next to your desk with ${his} legs spread.`);
							}
							r.push(`${He} wriggles and protests as you take ${his} virginity. ${He}'s certainly entered your service in a way that colors ${his} impression of you <span class="mediumorchid">with hatred</span> and <span class="gold">fear.</span> <span class="lime">${His} tight little pussy has been broken in.</span>`);
							slave.devotion -= 5;
						} else {
							if (isAmputee(slave)) {
								r.push(`You secure ${his} unresisting body to the couch next to your desk with ${his} vagina exposed.`);
							} else {
								r.push(`You cuff ${his}`);
								if (hasAnyArms(slave)) {
									r.push(wrists);
									if (hasAnyLegs(slave)) {
										r.push(`and`);
									}
								}
								if (hasAnyLegs(slave)) {
									r.push(ankles);
								}
								r.push(`and secure ${his} unresisting body to the couch next to your desk with ${his} legs spread.`);
							}
							r.push(`${He} writhes and moans as you enter ${his} virgin pussy. You might not have even had to restrain ${him} for this, but being tied up and deflowered sends ${him} a message. ${He}'s certainly entered your service in a way that colors ${his} impression of you <span class="hotpink">with pain</span> and <span class="gold">fear.</span> <span class="lime">${His} tight little pussy has been broken in.</span>`);
							slave.devotion += 5;
						}
						r.push(VCheck.Vaginal(slave, 1));

						return r.join(" ");
					},

				});
			}
			lineBreak();
			if (slave.anus === 0) {
				choice({
					get linkName() {
						if (tankBorn) {
							return `Take ${his} anal virginity`;
						} else if (slave.devotion < -10) {
							return `Tie ${him} up and rape ${his} virgin ass`;
						} else {
							return `Tie ${him} up and break ${his} ass in`;
						}
					},

					result(slave) {
						const r = [];
						if (tankBorn) {
							r.push(`You gently lead ${his} unresisting body to the couch next to your desk and arrange ${him} with ${his} rear in the air. ${He} writhes and moans as you enter ${his} virgin anus, but after getting into the rhythm of sex, ${he} enthusiastically moves along trying to make the feeling even better. ${He}'s almost sad when <span class="hotpink">${his} beloved partner</span> finishes, but <span class="mediumaquamarine">hopes</span> ${he}'ll get to play sex with you again soon. <span class="lime">${His} tight little anus has been broken in.</span>`);
							slave.devotion += 5;
							slave.trust += 5;
						} else {
							if (slave.devotion < -10) {
								if (isAmputee(slave)) {
									r.push(`You secure ${his} struggling, screeching body to the couch next to your desk with ${his} butt sticking out.`);
								} else {
									r.push(`You cuff ${his}`);
									if (hasAnyArms(slave)) {
										r.push(wrists);
										if (hasAnyLegs(slave)) {
											r.push(`and`);
										}
									}
									if (hasAnyLegs(slave)) {
										r.push(ankles);
									}
									r.push(`and secure ${his} struggling, screeching body to the couch next to your desk so that ${he}'s straddling the back of the couch with ${his} butt sticking out.`);
								}
								r.push(`${He} wriggles and protests until ${he} feels the lubricated head of`);
								if (PC.dick !== 0) {
									r.push(`your dick`);
								} else {
									r.push(`a strap-on`);
								}
								r.push(`pushing against ${his} virgin butthole, at which point ${he} desperately tries to break free. ${He} fails, but ${he} never stops writhing and begging you to take`);
								if (PC.dick !== 0) {
									r.push(`your cock`);
								} else {
									r.push(`the phallus`);
								}
								r.push(`out of ${his} asshole. ${He}'s certainly entered your service in a way that colors ${his} impression of you <span class="mediumorchid">with hatred</span> and <span class="gold">fear.</span> <span class="lime">${His} tight little ass has been broken in.</span>`);
							} else {
								if (isAmputee(slave)) {
									r.push(`You secure ${his} unresisting body to the couch next to your desk with ${his} butt sticking out.`);
								} else {
									r.push(`You cuff ${his}`);
									if (hasAnyArms(slave)) {
										r.push(wrists);
										if (hasAnyLegs(slave)) {
											r.push(`and`);
										}
									}
									if (hasAnyLegs(slave)) {
										r.push(ankles);
									}
									r.push(`and secure ${his} unresisting body to the couch next to your desk so that ${he}'s straddling the back of the couch with ${his} butt sticking out.`);
								}
								r.push(`${He} lies obediently still until ${he} feels the lubricated head of your cock pushing against ${his} virgin butthole, at which point ${he} starts in surprise. When the pain of the buttfuck gets to be too much ${he} begs you to use ${his}`);
								if (slave.dick === 0) {
									r.push(`pussy`);
								} else {
									r.push(`mouth`);
								}
								r.push(`instead. ${He} gasps and cries as you slowly push your cock all the way up ${his} tight little butt, and in no time you fill ${his} rectum with cum. ${He}'s certainly entered your service in a way that colors ${his} impression of you <span class="mediumorchid">with pain</span> and <span class="gold">fear.</span> <span class="lime">${His} tight little ass has been broken in.</span>`);
							}
							slave.devotion -= 5;
							slave.trust -= 10;
							slave.anus = 1;
						}

						r.push(VCheck.Anal(slave, 1));
						return r.join(" ");
					},

				});
			}

			lineBreak();
			if (slave.fetish !== Fetish.MINDBROKEN) {
				choice({
					linkName: `Break ${him} in publicly`,
					result(slave) {
						const r = [];
						r.push(`You`);
						if (tankBorn) {
							r.push(`escort the curious slave`);
						} else if (slave.devotion > 20 || slave.trust < -20) {
							r.push(`order the obedient slave to follow you`);
						} else {
							r.push(`bring the resistant slave`);
						}
						r.push(`out into the public areas below your penthouse, shove the nude ${desc} over a convenient handrail, and stick`);
						if (PC.dick !== 0) {
							r.push(`your dick`);
						} else {
							r.push(`a strap-on`);
						}
						if (slave.vagina >= 0) {
							if (slave.vagina >= 3) {
								r.push(`inside ${his} gaping cunt, which is loose enough that the rough treatment doesn't bother ${him} physically.`);
							} else if (slave.vagina >= 2) {
								r.push(`inside ${his} accommodating pussy, which is welcoming enough that the rough insertion doesn't hurt ${him} physically.`);
							} else {
								r.push(`inside ${his} tight little pussy, making the poor ${girl} writhe with discomfort.`);
							}
						} else {
							if (slave.anus >= 3) {
								r.push(`inside ${his} lewd anal slit, which is so used to being fucked that the rough treatment doesn't bother ${him} physically.`);
							} else if (slave.anus >= 2) {
								r.push(`up ${his} welcoming butt, which is loose enough that the rough insertion doesn't hurt ${him} physically.`);
							} else {
								r.push(`up ${his} poor little butthole, making the poor ${girl} struggle desperately with anal pain.`);
							}
						}
						r.push(`You take ${him}, hard, while passersby stare at ${him} as ${he} gets pounded over a rail.`);
						if (tankBorn) {
							r.push(`${He} takes the fuck obediently, all the while`);
							if (canSee(slave)) {
								r.push(`observing`);
							} else if (canHear(slave)) {
								r.push(`overhearing`);
							} else {
								r.push(`imagining`);
							}
							r.push(`the passing spectators. ${He} might not be a humiliation fetishist, but ${he} is <span class="hotpink">willing to submit</span> to being used as a sex slave in public and may even grow to enjoy it.`);
							slave.devotion += 4;
							if (random(1, 100) > 60 && slave.fetish === Fetish.NONE) {
								slave.fetish = "humiliation";
								slave.fetishStrength = 20;
							}
						} else if (slave.devotion > 20) {
							if (slave.fetish === "humiliation") {
								if (slave.fetishKnown === 0) {
									r.push(`${He} struggles under the stares, blushing furiously as ${he} takes a fuck in the open. ${He} orgasms despite ${himself}; <span class="green">${he}'s a humiliation fetishist!</span>`);
									slave.fetishKnown = 1;
								} else {
									r.push(`As a humiliation fetishist, ${he} gets off on the stares, blushing cutely as ${he} takes a fuck in public.`);
								}
								r.push(`${He} follows you back inside your penthouse, leaking`);
								if (PC.dick !== 0) {
									r.push(`your cum,`);
								} else {
									r.push(`lube,`);
								}
								r.push(`<span class="hotpink">feeling like a slut.</span>`);
								slave.devotion += 5;
							} else {
								r.push(`${He} takes the fuck obediently, and does ${his} very best to ignore the stares.`);
								if (slave.fetishKnown === 0) {
									r.push(`It seems ${he}`);
								} else {
									r.push(`${He}`);
								}
								r.push(`isn't a humiliation fetishist, but ${he} is <span class="hotpink">willing to submit</span> to being used as a sex slave in public.`);
								slave.devotion += 4;
							}
						} else {
							if (slave.fetish === "humiliation") {
								if (slave.fetishKnown === 0) {
									r.push(`${His} struggles slowly diminish as the stares have a horribly embarrassing effect on ${him}. ${He} orgasms and then starts to cry, realizing what just happened; <span class="green">${he}'s a humiliation fetishist!</span>`);
									slave.fetishKnown = 1;
								} else {
									r.push(`As a humiliation fetishist, ${he} can't stop ${himself} from getting off on being fucked in public.`);
								}
								r.push(`As you pull ${him} back towards your penthouse, ${he} leaks`);
								if (PC.dick !== 0) {
									r.push(`your cum`);
								} else {
									r.push(`lube`);
								}
								r.push(`and <span class="hotpink">feels like a slut.</span>`);
								slave.devotion += 4;
							} else {
								r.push(`${He} takes the fuck unwillingly, crying and doing ${his} best to ignore the stares.`);
								if (slave.fetishKnown === 0) {
									r.push(`It seems ${he}`);
								} else {
									r.push(`${He}`);
								}
								r.push(`isn't a humiliation fetishist, and is <span class="gold">rapidly learning what it means</span> to be your sex slave.`);
								slave.trust -= 4;
							}
						}
						r.push(VCheck.Simple(slave, 1));
						if (slave.prestige > 0) {
							let some = 'Some';
							if (slave.prestige > 1) {
								some = 'Many';
							}
							if (slave.prestige > 2) {
								some = 'Most';
							}
							if (slave.prestige > 3) {
								some = 'Just about all';
							}
							r.push(`${some} of the citizens watching your little show recognized ${him}, <span class="reputation inc">adding to your reputation and status.</span>`);
							repX(slave.prestige	* 100, "event", slave);
						}

						return r.join(" ");
					},

				});
			}
			lineBreak();
			if (slave.devotion > 20) {
				choice({
					// TODO: tankBorn
					linkName: `Give ${him} a chance to impress`,
					result(slave) {
						const r = [];
						const num = jsRandom(1, 100);
						r.push(`${He} seems reasonably obedient, so you give ${him} a chance to impress. You remain seated and offer ${him} your`);
						if (PC.dick !== 0) {
							r.push(`half-erect cock`);
							if (PC.vagina !== -1) {
								r.push(`and ready pussy`);
							}
						} else {
							r.push(`pussy, wet with arousal at the prospect of breaking in a new slut`);
						}
						r.push(r.pop() + ".");
						r.push(`${He} comes over obediently and gets`);
						if (hasBothLegs(slave)) {
							r.push(`on ${his} knees.`);
						} else {
							r.push(`into position.`);
						}
						r.push(`${He} works hard and is clearly doing ${his} absolute best to please, so you let ${him} finish you with ${his} mouth.`);
						if (PC.dick !== 0) {
							if (num <= 20) {
								r.push(`${He}`);
								if (canSee(slave)) {
									r.push(`looks up at`);
								} else {
									r.push(`angles ${his} head towards`);
								}
								r.push(`you as ${he} swallows`);
							} else if (num <= 40) {
								r.push(`${He} even swallows your cum without being told`);
							} else if (num <= 60) {
								r.push(`${He} smiles sloppily as your seed slowly dribbles from ${his} mouth and down ${his} chin`);
							} else if (num <= 80) {
								r.push(`${He} struggles to contain your seed and makes a mess all over ${his} face as a result`);
							} else {
								r.push(`${He} struggles to contain your seed with ${his} mouth and it splatters over the floor as a result`);
							}
						} else {
							r.push(`${He} worked ${his} tongue hard and did ${his} best`);
						}
						r.push(r.pop() + ".");
						r.push(`You spend the rest of the day with ${him}`);
						if (hasAnyLegs(slave)) {
							r.push(`kneeling`);
						} else {
							r.push(`resting`);
						}
						r.push(`on a cushion next to your chair. ${He} learns obedience, but also learns that you are <span class="mediumaquamarine">fair</span> and <span class="hotpink">reasonable.</span>`);
						slave.devotion += 4;
						slave.trust += 4;
						actX(slave, "oral");
						return r.join(" ");
					},

				});
			}
			lineBreak();
			if (slave.fetish !== Fetish.MINDBROKEN) {
				if (slave.bellyPreg >= 5000) {
					choice({
						// TODO: tankBorn
						linkName: `Make sure ${he} knows pregnant women can still enjoy sex`,
						result(slave) {
							const r = [];
							r.push(`You introduce ${him} to obedience and proper manners regarding ${his} ${getWrittenTitle(slave)} before sending ${him} off for a physical. That night, ${he}'s returned to your room, and finds you doing business on a tablet in bed. ${He} looks doubtful, but obeys when you direct ${him} to get into bed${PC.dick === 0 ? `, even after ${he} realizes you're wearing a strap-on` : ``}. You turn out the light and spoon ${him} from behind, kissing ${his} neck and ears, cupping ${his} swollen breasts, and running your hands across ${his} pregnant belly with its taut ${slave.skin} skin. ${He}'s awkward at first but ${his} body responds to the tenderness. Before long ${he}'s humping ${his} pussy back and forth against`);
							if (PC.dick !== 0) {
								r.push(`your cock.`);
							} else {
								r.push(`the strap-on.`);
							}
							r.push(`You begin to gently work`);
							if (PC.dick !== 0) {
								r.push(`your dickhead`);
							} else {
								r.push(`its tip`);
							}
							r.push(`up ${his} used pussy. ${He}'s unsure of ${himself}, but you keep ${him} nice and relaxed. After several minutes of gentle loving, ${he}'s nothing but a satisfied puddle in your arms. ${He} believes that ${he} can <span class="mediumaquamarine">trust</span> you won't harm ${him} or ${his} ${(slave.pregType === 1) ? `child` : `children`}.`);

							slave.trust += 5;
							r.push(VCheck.Vaginal(slave, 1));
							if (slave.fetish === Fetish.NONE && jsRandom(1, 100) > 60) {
								slave.fetish = "pregnancy";
								slave.fetishStrength = 10;
							}
							return r.join(" ");
						},

					});
					lineBreak();
				}

				if (slave.boobs > 300 && slave.lactation > 0) {
					choice({
						linkName: `Milk ${him}`,
						result(slave) {
							const r = [];
							r.push(`You`);
							if (tankBorn) {
								r.push(`pull the curious ${desc}`);
							} else {
								if (slave.devotion > 20 || slave.trust < -20) {
									r.push(`instruct the obedient ${desc}`);
								} else {
									r.push(`force the reluctant ${desc}`);
								}
								r.push(`to sit`);
							}
							r.push(`atop your desk in front of you and present ${his} chest. After a quick look, you extend an idle hand and begin to fondle ${his}`);
							if (slave.boobs > 2000) {
								r.push(`massive milky tits,`);
							} else if (slave.boobs > 400) {
								r.push(`healthy milky breasts,`);
							} else {
								r.push(`cute little milky boobs,`);
							}
							r.push(`continuing your work with your other hand. You quickly focus your fiddling on ${his} ${slave.nipples} nipples, the stimulation`);
							if (slave.nipples === "fuckable") {
								if (slave.devotion > 20) {
									r.push(`rapidly engorging them around your fingers.`);
								} else {
									r.push(`slowly engorging them around your fingers despite ${his} feelings.`);
								}
							} else {
								r.push(`bringing them`);
								if (slave.devotion > 20) {
									r.push(`quickly erect.`);
								} else {
									r.push(`slowly erect despite ${his} feelings.`);
								}
							}
							r.push(`Once you feel satisfied with the state of those two bumps, you move to tug and squeeze ${his} breasts in a much different way, expertly putting pressure as to draw out the cream held within those swollen bags. You take your time to work as much out as you can, both for your own enjoyment and to judge your slave's character better.`);
							if (slave.devotion > 20) {
								r.push(`${He} <span class="hotpink">easily accepts</span> your orders and commands, being devoted enough to not make any fuss, especially for something as simple as this.`);
								slave.devotion += 4;
							} else {
								r.push(`${He} expects something worse to happen immediately, and slowly relaxes when ${he} realizes that ${he}'s nothing more than your desktop stress relief toy, at least for now. ${He} experiences the usual effects of nipple play, but seems <span class="trust dec">somewhat frightened</span> to be dehumanized so thoroughly.`);
								slave.trust -= 4;
							}
							return r.join(" ");
						}
					});
					lineBreak();
				}


				choice({
					linkName: `Tease ${his} nipples`,
					result(slave) {
						const r = [];
						r.push(`You`);
						if (tankBorn) {
							r.push(`pull the curious ${desc}`);
						} else {
							if (slave.devotion > 20 || slave.trust < -20) {
								r.push(`instruct the obedient ${desc}`);
							} else {
								r.push(`force the reluctant ${desc}`);
							}
							r.push(`to lie`);
						}
						r.push(`atop your desk in front of you and go back to business. After a few minutes, you extend an idle hand and begin to fondle ${his}`);
						if (slave.boobs > 2000) {
							r.push(`massive tits,`);
						} else if (slave.boobs > 400) {
							r.push(`healthy breasts,`);
						} else {
							r.push(`cute little boobs,`);
						}
						r.push(`continuing your work with your other hand. You quickly focus your fiddling on ${his} ${slave.nipples} nipples, the stimulation`);
						if (slave.nipples === "fuckable") {
							if (slave.devotion > 20) {
								r.push(`quickly engorging them around your fingers.`);
							} else {
								r.push(`slowly engorging them around your fingers despite ${his} feelings.`);
							}
						} else {
							r.push(`bringing them`);
							if (slave.devotion > 20) {
								r.push(`quickly erect.`);
							} else {
								r.push(`slowly erect despite ${his} feelings.`);
							}
						}
						if (tankBorn) {
							r.push(`${He} accepts your groping, even becoming aroused by it, but might not be a breast fetishist, though ${he} <span class="hotpink">certainly enjoys the attention.</span> By the feel of ${his} nipples between your fingers, ${he} may certainly develop into one.`);
							if (slave.incubatorSettings.reproduction > 1 && slave.boobs > 400) {
								r.push(`A loud moan and a distinct wetness in your hand quickly draw your attention to ${him}. It seems <span class="green">${he} is lactating!</span>`);
								slave.lactation = 1;
								slave.lactationDuration = 2;
							}
							slave.devotion += 4;
							if (random(1, 100) > 60 && slave.fetish === Fetish.NONE) {
								slave.fetish = "boobs";
								slave.fetishStrength = 20;
							}
						} else if (slave.devotion > 20) {
							if (slave.fetish === "boobs") {
								if (slave.fetishKnown === 0) {
									r.push(`The slave quickly becomes aroused. Before long, an orgasm convulses ${his} entire body, jiggling the feminine flesh under your hand delightfully. <span class="green"> ${He}'s a breast fetishist!</span>`);
									slave.fetishKnown = 1;
								} else {
									r.push(`${His} breast fixation makes this teasing quite pleasurable for ${him}, almost as good as a handjob. Before long, an orgasm convulses ${his} entire body, jiggling the feminine flesh under your hand delightfully.`);
								}
								r.push(`When you tell ${him} to go, ${he} carefully rolls off your desk in such a way that <span class="hotpink">${his} nipples graze your cheek.</span>`);
								slave.devotion += 5;
							} else {
								r.push(`${He} accepts being treated as a desktop stress relief toy. ${He}'s no breast fetishist, but ${he}'s <span class="hotpink">willing to be used</span> as a sex object.`);
								slave.devotion += 4;
							}
						} else {
							if (slave.fetish === "boobs") {
								if (slave.fetishKnown === 0) {
									r.push(`The slave slowly becomes aroused despite ${his} reluctance. Soon, ${he} can no longer hide ${his} horniness and begins to pant, openly enjoying the sensations. <span class="green">${He}'s a breast fetishist!</span>`);
									slave.fetishKnown = 1;
								} else {
									r.push(`The slave slowly becomes aroused despite ${his} reluctance. As a breast fetishist, playing with ${his} nipples is an excellent way to overcome ${his} petty resistance to being a sex object.`);
								}
								r.push(`When you tell ${him} to go, ${he} gets off your desk gingerly, since ${he}'s almost painfully aroused. <span class="hotpink">${He} feels like quite a slut</span> for wanting a fuck this badly after a little nipple play.`);
								slave.devotion += 4;
							} else {
								r.push(`${He} expects something worse to happen immediately, and slowly relaxes when ${he} realizes that ${he}'s nothing more than your desktop stress relief toy, at least for now. ${He} experiences the usual effects of nipple play, but seems <span class="gold">somewhat frightened</span> to be dehumanized so thoroughly.`);
								slave.devotion -= 4;
							}
						}

						return r.join(" ");
					},

				});
				lineBreak();
				if (tankBorn) {
					choice({
						linkName: `Give ${him} a cum shower`,
						result(slave) {
							// Written for tankBorn
							const r = [];
							r.push(`You seat the curious ${SlaveTitle(slave)} in the center of your office and order every slave available capable of getting hard to report to your office. Once everyone is assembled and erect, you order them to encircle the aroused ${girl} and shower ${him} in cum. As they begin${canAchieveErection(slave) ? ` (with ${slave.slaveName} stroking ${his} own erection too)` : ``},`);
							if (PC.dick !== 0 && PC.vagina !== -1) {
								r.push(`you begin fingering yourself while jacking off alongside your slaves.`);
							} else if (PC.dick !== 0) {
								r.push(`you join in the circlejerk as well.`);
							} else {
								r.push(`you sit back to finger yourself to the show.`);
							}
							r.push(`When the first burst of cum streaks across ${his} face, ${he} gasps in surprise, giving another load the chance to launch into ${his} gaping mouth. ${He} gags before licking ${his} lips and opening wide for the next load. After everyone has finished, ${slave.slaveName} is coated, head to`);
							if (!hasAnyLegs(slave)) {
								r.push(`hip,`);
							} else {
								r.push(`toe,`);
							}
							r.push(`in cum and <span class="hotpink">thrilled to be the center of attention.</span> Though ${he} may not be a cumslut now, ${he} certainly has the potential to become one.`);
							slave.devotion += 4;
							if (random(1, 100) > 60 && slave.fetish === Fetish.NONE) {
								slave.fetish = "cumslut";
								slave.fetishStrength = 20;
							}
							return r.join(" ");
						},
					});
					lineBreak();

					choice({
						// Written for tankBorn
						linkName: `Bring in another slave and let ${him} have fun`,
						result(slave) {
							const r = [];
							const {
								hisU, himU, girlU
							} = getNonlocalPronouns(V.seeDicks).appendSuffix('U');
							r.push(`You call in the next passing slave, bind ${hisU} hands and feet and present ${himU} to the curious new ${SlaveTitle(slave)}. You gesture towards the bound ${girlU}, signifying permission to do whatever ${he} pleases. Eagerly, ${slave.slaveName} begins exploring every`);
							if (V.showInches === 2) {
								r.push(`inch`);
							} else {
								r.push(`centimeter`);
							}
							r.push(`of ${hisU} body, paying close attention to ${hisU} nipples and ${hisU} holes, while you return to your work. It doesn't take long for you to be disrupted by a loud`);
							if (random(1, 100) > 50) {
								r.push(`moan emanating from the bound ${girlU}. Looking up, you see ${slave.slaveName}`);
								if (canPenetrate(slave)) {
									r.push(`fucking ${himU} hard and deep,`);
								} else {
									r.push(`licking ${hisU} cunt,`);
								}
								r.push(`hitting all the right places and making the helpless ${girlU} squirm with pleasure. Any plea for mercy results in a renewed effort to push the ${girlU} over the edge. ${slave.slaveName} is certainly <span class="hotpink">enjoying ${his} treat,</span> and by the looks of things, may be a developing dom!`);
								if (random(1, 100) > 60 && slave.fetish === Fetish.NONE) {
									slave.fetish = "dom";
									slave.fetishStrength = 20;
								}
								seX(slave, canPenetrate(slave) ? "penetrative" : "oral", "slaves");
							} else {
								r.push(`scream of pain from the bound ${girlU}. Looking up, you see ${slave.slaveName}`);
								if (canPenetrate(slave)) {
									r.push(`force ${his} cock deep down ${his} toy's throat`);
								} else {
									r.push(`ram ${his} arm deep into ${his} toy's cunt`);
								}
								r.push(`causing the hapless ${girlU} to writhe in discomfort. Any plea for mercy results in even more intense torment. ${slave.slaveName} is certainly <span class="hotpink">enjoying ${his} treat,</span> and by the looks of things, may be a developing sadist!`);
								if (random(1, 100) > 60 && slave.fetish === Fetish.NONE) {
									slave.fetish = "sadist";
									slave.fetishStrength = 20;
								}
								if (canPenetrate(slave)) {
									seX(slave, "penetrative", "slaves");
								}
							}
							slave.devotion += 4;
							return r.join(" ");
						},
					});
					lineBreak();
				}
				if (PC.vagina !== -1 && slave.dick > 0 && canAchieveErection(slave)) {
					choice({
						get linkName() {
							return (tankBorn) ? `Dominate ${his} penis` : `Dominate ${his} penis and demonstrate ${his} place`;
						},
						result(slave) {
							const el = new DocumentFragment();
							let r = [];
							r.push(`As you inspect ${him}, you take note of ${his} fully`);
							if (slave.dick === 1) {
								r.push(`functional tiny dick.`);
							} else if (slave.dick === 2) {
								r.push(`functional cute dick.`);
							} else if (slave.dick === 3) {
								r.push(`functional dick.`);
							} else if (slave.dick === 4) {
								r.push(`functional big dick.`);
							} else if (slave.dick === 5) {
								r.push(`functional impressive dick.`);
							} else if (slave.dick === 6) {
								r.push(`functional huge dick.`);
							} else {
								r.push(`functional.`); // Old SC code only went to 6. I'm adding this to fix the period, but this needs writing assuming we can go beyond 6.
							}
							if (tankBorn) {
								r.push(`You gently begin fondling ${his} penis, grinning at the look of confusion and lust growing on ${his} face.`);
							} else {
								r.push(`You roughly push ${him} up against a wall and begin fondling ${his} penis, grinning at the look of panic growing on ${his} face.`);
							}
							if (slave.dick === 1) {
								r.push(`You scoff at ${him} as ${his} micropenis barely fills your palm.`);
							} else if (slave.dick === 2) {
								r.push(`You laugh at ${him} as ${his} small penis fills your palm.`);
							} else if (slave.dick === 3) {
								r.push(`You nod at ${him} as ${his} penis fills your hand.`);
							} else if (slave.dick === 4) {
								r.push(`You smirk at ${him} as ${his} big penis fills your hand.`);
							} else if (slave.dick === 5) {
								r.push(`You smile widely at ${him}, a dangerous look in your eyes, as you bring another hand to ${his} impressive dick.`);
							} else if (slave.dick === 6) {
								r.push(`You grin sadistically at ${him} as ${his} massive dick fills both of your hands.`);
							}

							r.push(`As ${he} begins to moan with lust, you grip down tightly and force ${him} to the floor. You straddle ${him} and lower your dripping pussy onto ${his} face${PC.dick !== 0 ? `, your erect cock coming to rest on ${his} forehead` : ``}. You continue stroking your toy's rod as ${he} eagerly begins eating you out. As ${his} cock begins to throb, anticipating ${his} upcoming orgasm,`);
							if (tankBorn && (overpowerCheck(slave, V.PC) < random(1, 100)) && slave.incubatorSettings.reproduction > 0) {
								r.push(`${he} shoves you onto your back and deeply penetrates you${PC.vagina === 0 ? `, painfully <span class="virginity loss">piercing your maidenhead</span> in the process` : ``}. Before you can kick ${him} off, ${he} thrusts twice and unloads ${his} pent up orgasm deep into your pussy. ${He} pulls out with a huge smile on ${his} face and a <span class="hotpink">deep love</span> for ${his} mate. You glower at ${him} as cum pools from your stretched cunt; ${he} might not be a dom now, but ${he} may certainly become one.`);
								slave.devotion += 5;
								if (V.PC.vagina === 0) {
									V.PC.vagina = 1;
								}
								seX(slave, "penetrative", V.PC, "vaginal");
								V.rapedThisWeek = (V.rapedThisWeek || 0) + 1;
								if (random(1, 100) > 60 && slave.fetish === Fetish.NONE) {
									slave.fetish = "dom";
									slave.fetishStrength = 20;
								}
								if (canImpreg(V.PC, slave)) {
									r.push(knockMeUp(V.PC, 100, 0, slave.ID));
									r.push(`You groan as you rub your belly. You were fertile and are now likely <span class="lime">quite pregnant.</span>`);
								}
								App.Events.addNode(el, r);
								r = [];
								const result2 = document.createElement("p");
								result2.id = "result2";
								el.append(result2);
								App.UI.DOM.appendNewElement(
									"div",
									result2,
									App.UI.DOM.link(
										`Let it slide for now`,
										() => {
											const r = [];
											r.push(`You decide to yourself that it may be for the best to just send ${him} on ${his} way for now. You quietly order ${slave.slaveName} out into the penthouse, while you head off to wash out ${his} seed. You can't reasonably expect ${him} to know the full ramifications of what ${he} did; ${he} can't exactly be considered an adult${(slave.physicalAge < 18) ? `, by any means` : ``}. Indeed, the ${girl} is mostly just bewildered by your sudden change in mood, but seems pretty sure that <span class="orangered">${he} had nothing to do with it.</span>`);
											slave.trust += 20;
											jQuery("#result2").empty().append(r.join(" "));
										}
									)
								);

								App.UI.DOM.appendNewElement(
									"div",
									result2,
									App.UI.DOM.link(
										`Teach ${him} what ${he} did wrong`,
										() => {
											const r = [];
											r.push(`${His} language skills may be undeveloped, but the tank instilled certain phrases into ${him} as it raised ${him}. Taking advantage of those commands, you chastise ${him} for ${his} impudence and instruct ${him} that only you may decide if ${he} is allowed to do that. ${He} <span class="mediumorchid">hangs ${his} head in disappointment</span> but understands your decree. ${He} doesn't know why ${he} is compelled by what you said, but deep down ${he} <span class="gold">fears what this means.</span>`);
											slave.devotion -= 5;
											slave.trust -= 5;
											jQuery("#result2").empty().append(r.join(" "));
										}
									)
								);

								App.UI.DOM.appendNewElement(
									"div",
									result2,
									App.UI.DOM.link(
										`Punish ${his} nuts`,
										() => {
											const r = [];
											r.push(`Righting yourself, you land a kick firmly and directly into ${his} dangling balls. ${He} collapses to the ground <span class="mediumorchid">wailing with betrayal</span> and <span class="gold">desperately trying to protect ${himself} from you.</span>`);
											slave.devotion -= 25;
											slave.trust -= 50;
											jQuery("#result2").empty().append(r.join(" "));
										}
									)
								);

								App.UI.DOM.appendNewElement(
									"div",
									result2,
									App.UI.DOM.link(
										`Punish ${him} with a chastity belt`,
										() => {
											const r = [];
											r.push(`Righting yourself, you head to your desk and pull out a chastity cage. Calling the curious ${girl} over, you tease ${his} genitals until ${he} lowers ${his} guard and lock ${his} dick in the device. ${He} <span class="mediumorchid">howls with displeasure</span> at the tightness around ${his} cock and <span class="gold">begins to panic</span> when ${he} finds ${he} can't remove it. You send ${him} off to learn ${his} place.`);
											slave.devotion -= 15;
											slave.trust -= 5;
											slave.chastityPenis = 1;
											App.Events.refreshEventArt(slave);
											jQuery("#result2").empty().append(r.join(" "));
										}
									)
								);

								if (V.seeExtreme === 1) {
									App.UI.DOM.appendNewElement(
										"div",
										result2,
										App.UI.DOM.link(
											`Geld ${him} as punishment`,
											() => {
												const r = [];
												r.push(`Righting yourself, you grab the gloating slave, drag ${him} to the autosurgery and strap ${him} face-down with ${his} legs spread. ${He} doesn't understand what's happening, but giggles at the sensations running through ${his} numb body. ${He}'s so drugged and drowsy with <span class="health dec">surgical recovery</span> that it takes a while for ${him} to figure out what's happened. When ${he} does, ${his} poor mind scarcely processes the <span class="gold">horror</span> of what's happened. ${He} spends the rest of the week dimly trying to find where ${his} balls went.`);
												if (FutureSocieties.isActive('FSGenderRadicalist')) {
													r.push(`Society <span class="green">approves</span> of your promptly gelding ${him}; this advances the idea that all societal inferiors can be made female.`);
													FutureSocieties.Change("Gender Radicalist", 2);
												}
												if (FutureSocieties.isActive('FSRestart') && slave.pubertyXY === 1) {
													r.push(`Society <span class="green">approves</span> of your promptly gelding ${him}; this advances the idea that only the Elite should breed.`);
													FutureSocieties.Change("Eugenics", 2);
												}
												slave.devotion -= 25;
												slave.trust -= 50;
												slave.balls = 0;
												App.Events.refreshEventArt(slave);
												jQuery("#result2").empty().append(r.join(" "));
											}
										)
									);
								}
							} else {
								r.push(`you quickly bind the base of ${his} penis, denying ${his} release. You grind your cunt into ${his} face, telling ${him} that YOU are the one who'll be orgasming here, not ${him}. Only once you have initiated the new slave by soaking ${his} face in your cum do you release ${his} dick and lean back to avoid the coming blast. A few strokes later and your hand is coated in ${his} cum. You turn around and order the exhausted ${girl} to clean ${his} cum off your hand`);
								if (PC.dick !== 0) {
									r.push(`and to finish off ${his} twitching dick`);
								}
								r.push(`${he} <span class="hotpink">complies meekly,</span> knowing you are the <span class="gold">dominant force</span> in ${his} life now.`);
								slave.devotion += 5;
								slave.trust -= 3;
								App.Events.addNode(el, r);
							}
							return el;
						}
					});
				}

				if (PC.belly >= 3000 && hasAnyArms(slave)) {
					choice({
						// TODO: tankBorn
						get linkName() {
							return (tankBorn) ? `Permit ${him} to explore your pregnancy` : `Make ${him} worship your pregnancy`;
						},
						result(slave) {
							const r = [];
							if (tankBorn) {
								r.push(`You beckon the curious ${girl} to your weighty pregnancy and, as ${he} approaches, push it`);
							} else {
								r.push(`You aggressively approach ${slave.slaveName}, forcing your pregnancy directly`);
							}
							r.push(`into ${his}`);
							if (slave.height > 175) {
								r.push(`stomach`);
							} else if (slave.height < 155) {
								r.push(`face`);
							} else {
								r.push(`chest`);
							}
							r.push(`until ${he} has no choice but to`);
							if (tankBorn) {
								if (!hasBothArms(slave)) {
									r.push(`embrace`);
								} else {
									r.push(`wrap ${his} arms around`);
								}
								r.push(`it. ${He} happily`);
								if (!hasBothArms(slave)) {
									r.push(`feels up`);
								} else {
									r.push(`runs ${his} hands across`);
								}
								r.push(`your belly, cooing with delight at the tautness and warmth. ${He} jumps back with a gasp the first time ${he} is met with a kick from within you, but <span class="hotpink">giggles pleasantly</span> as you help ${him} back`);
								if (!hasBothLegs(slave)) {
									r.push(`up.`);
								} else {
									r.push(`to ${his} feet.`);
								}
								r.push(`${He} spends a lot of time comparing your belly to ${his} own; ${he} might not be a pregnancy fetishist, but it seems likely ${he} may become one.`);
								slave.devotion += 5;
								if (random(1, 100) > 40 && slave.fetish === Fetish.NONE) {
									slave.fetish = "pregnancy";
									slave.fetishStrength = 20;
								}
							} else {
								r.push(`be pushed to the ground. Standing over ${him}, staring ${him} down as ${he} peeks around your firm globe of a middle, you order ${him} to worship your pregnancy.`);
								if (slave.fetish === "pregnancy") {
									r.push(`${He} complies eagerly. ${He} begins with sucking your popped navel before running ${his} tongue across the taut, smooth surface of your pregnancy. Once ${he} has finished with your belly, ${he} lowers ${himself} under it to begin work on your needy pussy. Before long, ${his} overzealous efforts have you quaking in pleasure, rousing your ${(PC.pregType === 1) ? `child` : `children`}. Once ${he} finishes you off, ${he} returns to rubbing your belly, soothing your rowdy ${(PC.pregType === 1) ? `child` : `children`}and <span class="hotpink">solidifying ${his} place</span> beneath you.`);
									slave.devotion += 15;
								} else {
									r.push(`${He} shifts ${his} gaze between your middle and your face, not sure what to do. Losing patience, you toss a tube of cream at ${him}. ${He} shakily massages it onto your stretched skin, missing spots, much to your pleasure. With reason, you force ${him} onto ${his} back, turn around, and plant your needy cunt directly onto ${his} face. Struggling to breathe under your weight, ${he} begins eating you out in desperation. After coaxing ${him} to massage your belly as ${he} does, you quickly climax across ${his} face and gently lift yourself off the coughing ${girl}. ${He} now <span class="hotpink">understands ${his} place in life</span> and is <span class="gold">terrified</span> about what ${he} will have to do if ${he} wants to survive.`);
									slave.devotion += 5;
									slave.trust -= 5;
								}
							}

							return r.join(" ");
						},

					});
					if (PC.preg >= 28) {
						if (PC.pregMood === 2 && PC.vagina > 0 && canPenetrate(slave)) {
							choice({
								// TODO: tankBorn
								get linkName() {
									return (tankBorn) ? `Teach ${him} how to satisfy a pregnant ${womanP}` : `${He} has a dick and you need it`;
								},
								result(slave) {
									const r = [];
									if (tankBorn) {
										r.push(`You beckon the curious ${girl} to your weighty pregnancy and, as ${he} approaches, push it`);
									} else {
										r.push(`You aggressively approach ${slave.slaveName}, forcing your pregnancy`);
									}
									r.push(`directly into ${his}`);
									if (slave.height > 175) {
										r.push(`stomach`);
									} else if (slave.height < 155) {
										r.push(`face`);
									} else {
										r.push(`chest`);
									}
									if (tankBorn) {
										if (PC.pregMood === 2) {
											r.push(`knocking ${him} to the ground.`);
											if (canPenetrate(slave)) {
												r.push(`A simple stroke is all it takes to get ${him} hard, so you quickly mount and begin riding ${him}. ${He} <span class="hotpink">happily</span> runs ${his} hands across the underside of your belly as ${he} gets into the rhythm of thrusting up into you. After an unsatisfyingly short amount of time, ${he} cums deep in you.`);
											} else {
												r.push(`You quickly mount ${his} face and force ${him} to eat you out. ${He} <span class="hotpink">happily</span> runs ${his} hands across the underside of your belly as ${he} gets into the rhythm of penetrating you. It doesn't take long for the poor ${girl} to be out of breath and panicking.`);
											}
											r.push(`Sighing, you pull the spent ${girl} upright so ${he} can fondle your belly and hopefully recover enough for a second go. ${He} spends a lot of time comparing your belly to ${his} own, ${he} might not be a pregnancy fetishist, but it seems likely ${he} may become one.`);
											slave.devotion += 5;
											if (canPenetrate(slave)) {
												actX(slave, "penetrative", 1);
											} else {
												actX(slave, "oral", 1);
											}
											if (random(1, 100) > 40 && slave.fetish === Fetish.NONE) {
												slave.fetish = "pregnancy";
												slave.fetishStrength = 20;
											}
										} else if (tankBorn && PC.pregMood === 1) {
											r.push(`until ${he} has no choice but to wrap ${his} arms around it. ${He} happily runs ${his} hands across your belly, cooing with delight at the tautness and warmth. ${He} jumps back with a gasp the first time ${he} is met with a kick from within you, but <span class="hotpink">giggles pleasantly</span> as you help ${him} back to ${his} feet and pull ${him} into an embrace, guiding ${him} to the couch. You tweak one of your nipples, encouraging your milk to flow and enticing`);
											if (slave.mother === -1) {
												r.push(`your ${daughter} to suckle from ${his} mother.`);
											} else {
												r.push(`the ${girl} to suckle from your aching breasts.`);
											}
											r.push(`${He} eagerly complies, drinking deeply as you stroke ${his} head.`);
											if (canPenetrate(slave)) {
												r.push(`Before long, you feel something hard prodding your leg; it seems someone is getting turned on by all this. As you shift ${him} to your other breast, you reach down and begin stroking ${his} erection. You can feel ${his} gulps become erratic as ${his} cock begins throbbing in your grip. ${He} moans lewdly as ${he} cums, but makes sure not to miss a single drop of your milk in the process.`);
											}
											r.push(`Once ${he} drains you of your supply, you <span class="mediumaquamarine">cuddle up to ${him}</span> and allow ${him} to caress your body. ${He} spends a lot of time comparing your belly to ${his} own, ${he} might not be a pregnancy fetishist, but it seems likely ${he} may become one.`);
											slave.devotion += 15;
											slave.trust += 15;
											if (random(1, 100) > 40 && slave.fetish === Fetish.NONE) {
												slave.fetish = "pregnancy";
												slave.fetishStrength = 20;
											}
										}
									} else {
										r.push(`until ${he} has no choice but to be pushed to the ground. You quickly straddle ${his} face, forcing your oozing cunt over ${his} mouth as you eagerly stroke ${his} cock to full length.`);
										if (slave.fetish === "pregnancy") {
											r.push(`${He} groans with disappointment as your pregnant pussy leaves ${his} reach, though ${his} displeasure is short lived as you greedily take ${his} entire dick into your aching snatch. You ride ${him} mercilessly, frequently smacking ${him} with your heavy belly. ${He} loves every minute of it, especially when ${he} feels your body tense up as ${he} lets loose ${his} load deep into you. Where most slaves would be begging for mercy, ${he} <span class="hotpink">eagerly complies</span> as you adjust yourself and begin round two. You don't know what came over you, but when you wake up, you find ${he}'s resting peacefully under your gravid mass.`);
											if (slave.fetishKnown === 0) {
												r.push(`It seems ${he} likes <span class="green">being a pregnant ${womanP}'s plaything.</span>`);
												slave.fetishKnown = 1;
											} else {
												r.push(`You knew ${he} had a pregnancy fetish and the look on ${his} face confirms it.`);
											}
											r.push(`A kick from within startles you from your thoughts; it would appear your`);
											if (PC.pregType > 1) {
												r.push(`children agree`);
											} else {
												r.push(`child agrees`);
											}
											r.push(`that you'll have to have another ride sometime.`);
											slave.devotion += 15;
										} else {
											r.push(`${He} coughs as your pregnant pussy vacates ${his} face, though ${his} relief is short lived as you greedily slam yourself down onto ${his} waiting dick. You ride ${him} mercilessly, frequently smacking ${him} with your heavy belly. ${He} hates every minute of it, choosing to alternate between begging you to stop and just openly weeping. You cum hard as you watch the look on ${his} face as ${he} unwillingly cums deep inside you. ${He} cries out in protest as you continue raping ${him}, but you don't care. All that matters is your satisfaction. This continues until you pass out from orgasmic exhaustion with ${him} still inside you. You are eventually awoken by ${his} desperate struggle to escape from beneath your gravid mass; ${he} quickly regrets ${his} choices as you remount ${him} for one last go. ${He} now <span class="hotpink">better understands ${his} place as a toy</span> and is <span class="gold">terrified</span> of your insatiable lust.`);
											slave.devotion += 5;
											slave.trust -= 15;
										}
										actX(slave, "penetrative", 5);
										actX(slave, "oral");
									}
									return r.join(" ");
								},

							});
						} else if (PC.pregMood === 1 && PC.lactation > 0) {
							choice({
								// TODO: tankBorn
								get linkName() {
									return (tankBorn) ? `Nurse ${him}` : `Take ${him} to your breast`;
								},
								result(slave) {
									const r = [];
									if (tankBorn) {
										r.push(`You beckon the curious ${girl} to your weighty pregnancy and, as ${he} approaches, push it directly into ${his}`);
										if (slave.height > 175) {
											r.push(`stomach`);
										} else if (slave.height < 155) {
											r.push(`face`);
										} else {
											r.push(`chest`);
										}
										r.push(`until ${he} has no choice but to wrap ${his} arms around it. ${He} happily runs ${his} hands across your belly, cooing with delight at the tautness and warmth. ${He} jumps back with a gasp the first time ${he} is met with a kick from within you, but <span class="hotpink">giggles pleasantly</span> as you help ${him} back to $his feet and pull ${him} into an embrace, guiding ${him} to the couch. You tweak one of your nipples, encouraging your milk to flow and enticing`);
										if (slave.mother === -1) {
											r.push(`your ${daughter} to suckle from ${his} mother.`);
										} else {
											r.push(`the ${girl} to suckle from your aching breasts.`);
										}
										r.push(`${He} eagerly complies, drinking deeply as you stroke ${his} head.`);
										if (canPenetrate(slave)) {
											r.push(`Before long, you feel something hard prodding your leg; it seems someone is getting turned on by all this. As you shift ${him} to your other breast, you reach down and begin stroking ${his} erection. You can feel ${his} gulps become erratic as ${his} cock begins throbbing in your grip. ${He} moans lewdly as ${he} cums, but makes sure not to miss a single drop of your milk in the process.`);
										}
										r.push(`Once ${he} drains you of your supply, you <span class="mediumaquamarine">cuddle up to ${him}</span> and allow ${him} to caress your body. ${He} spends a lot of time comparing your belly to ${his} own, ${he} might not be a pregnancy fetishist, but it seems likely ${he} may become one.`);
										slave.devotion += 15;
										slave.trust += 15;
										if (random(1, 100) > 40 && slave.fetish === Fetish.NONE) {
											slave.fetish = "pregnancy";
											slave.fetishStrength = 20;
										}
									} else {
										r.push(`You calmly approach ${slave.slaveName}, pulling ${him} into a soothing embrace against your`);
										if (PC.boobs >= 1400) {
											r.push(`enormous,`);
											if (PC.boobsImplant > 0) {
												r.push(`fake,`);
											}
											r.push(`milk-laden breasts.`);
										} else if (PC.boobs >= 1200) {
											r.push(`huge,`);
											if (PC.boobsImplant > 0) {
												r.push(`fake,`);
											}
											r.push(`milk-laden breasts.`);
										} else if (PC.boobs >= 1000) {
											r.push(`large,`);
											if (PC.boobsImplant > 0) {
												r.push(`fake,`);
											}
											r.push(`milk-laden breasts.`);
										} else if (PC.boobs >= 800) {
											r.push(`big, milk-laden breasts.`);
										} else if (PC.boobs >= 650) {
											r.push(`milk-laden breasts.`);
										} else if (PC.boobs >= 500) {
											r.push(`small, milk-laden breasts.`);
										} else if (PC.boobs >= 300) {
											r.push(`tiny, milk-laden breasts.`);
										} else {
											r.push(`milk swollen chest.`);
										}
										r.push(`${He} tries to squirm away from the moist spot growing under ${his} cheek, but you reveal your nipple and carefully direct ${his} mouth over it.`);
										if (slave.fetish === "pregnancy") {
											r.push(`Slowly ${he} begins to suckle from your swollen breast. You gently brush ${his} head as you try to hold back your pleasure — a wasted effort, as a hand sneaks its way to your`); // TODO: handness
											if (PC.dick !== 0) {
												r.push(`growing erection and enthusiastically begins pumping away.`);
											} else {
												r.push(`wet pussy and enthusiastically begins rubbing your clit.`);
											}
											r.push(`You clutch your pervy ${girl} closer to you as ${he} caresses your pregnancy with one hand and gets you off with the other. Before long you find yourself bucking your hips with lust, a cue for you to release ${him} from your nipple so ${he} may slide down your gravid dome of a belly to finish you off. Happy to serve ${his} pregnant ${getWrittenTitle(slave)}, ${he} returns to your chest, happy to relieve you of the pressure building in your neglected breast.`);
											if (slave.fetishKnown === 0) {
												r.push(`Judging by that show, <span class="green">${he} savors getting to be with a pregnant ${womanP}.</span>`);
												slave.fetishKnown = 1;
											} else {
												r.push(`You knew ${he} had a pregnancy fetish and ${his} eagerness to serve a pregnant ${womanP} proves that.`);
											}
											r.push(`A kick from within startles you from your thoughts; as you reach to soothe your ${PC.pregType === 1 ? `child` : `children`}, you find your new slave <span class="mediumaquamarine">already doting on them.</span> ${He}'s already starting to <span class="hotpink">show understanding of ${his} place.</span>`);
											slave.devotion += 15;
											slave.trust += 15;
										} else if (slave.fetish === "boobs") {
											r.push(`Eagerly ${he} begins to suckle from your swollen breast. You gently brush ${his} head as you try to hold back your pleasure — a wasted effort, as a hand sneaks its way to your neglected breast. ${He} massages it, careful not to encourage your lactation too much, as ${he} greedily sucks you dry. ${He} wastes no time in swapping to your other nipple, shifting ${his} ministrations to the one the just left. By the time your reserves are tapped out, both you and ${he} are quite content. You permit ${him} to rest against your chest for a little before you send ${him} on ${his} way.`);
											if (slave.fetishKnown === 0) {
												r.push(`Judging by ${his} enthusiasm, <span class="green">${he} savors getting ${his} mouth close to a pair of boobs.</span>`);
												slave.fetishKnown = 1;
											} else {
												r.push(`You knew ${he} had a breast fetishist and ${his} eagerness to lighten a lactating ${womanP} proves that.`);
											}
											r.push(`A kick from within startles you from your thoughts; you pat your gravid middle, reassuring your ${(PC.pregType === 1) ? `child` : `children`} that you'll make sure to save some milk for them. ${He}'s already starting to <span class="hotpink">show understanding of ${his} place</span> and even <span class="mediumaquamarine">beginning to build trust</span> with you.`);
											slave.devotion += 15;
											slave.trust += 15;
										} else {
											r.push(`Reluctantly ${he} begins to suckle from your swollen breast. You gently brush ${his} head as you try to hold back your pleasure, but it is too much. As ${he} drinks deeper, you begin moaning with relief. At first ${he} tenses at`);
											if (canHear(slave)) {
												r.push(`the sound,`);
											} else {
												r.push(`your body's shuddering,`);
											}
											r.push(`fearing punishment, but soon realizes you have no intent on <span class="mediumaquamarine">harming ${him}.</span> ${He} allows you to dote over ${him} as if ${he} were`);
											if (slave.father === -1 || slave.mother === -1) {
												r.push(`a`);
											} else {
												r.push(`your`);
											}
											r.push(`child, carefully moving to your other breast once the first runs dry. As ${he} drinks, ${he} begins to massage your taut middle, ${his} touch soft and gentle. When you both finish, you push ${him}`);
											if (hasBothLegs(slave)) {
												r.push(`to ${his} feet`);
											} else {
												r.push(`into an upright position`);
											}
											r.push(`and send ${him} on ${his} way. <span class="hotpink">${He} stays and offers a hand to help you to your feet.</span> You are surprised by this display; it might be obedience, but ${he} also may view you in your gravid state as someone weak. As ${he} helps you back to your desk, ${he} shoulders all of your weight. It would appear ${he} is putting you first, for now.`);
											slave.devotion += 5;
											slave.trust += 5;
										}
									}
									PC.lactationDuration = 2;

									return r.join(" ");
								},

							});
						}
					}
				}

				if (slave.belly + PC.belly <= 2000) {
					// got to be able to get close without bumps getting in the way
					if (PC.boobs >= 800 && ((slave.boobs <= PC.boobs - 200 && slave.boobs >= 300) || tankBorn)) {
						choice({
							// TODO: tankBorn
							get linkName() {
								return (tankBorn) ? `Permit ${him} to explore your expansive bust` : `Let your ample bust dominate ${his} pathetic one`;
							},
							result(slave) {
								const el = new DocumentFragment();
								let r = [];
								if (tankBorn) {
									r.push(`You beckon the curious ${girl} to your hefty breasts, having noticed how hungrily ${he} has been`);
									if (canSee(slave)) {
										r.push(`eying`);
									} else {
										r.push(`focusing on`);
									}
									r.push(`them. ${He} eagerly places ${his} hands to them and begins squeezing and massaging them, quickly becoming aroused ${himself}. ${He} pays close attention to your nipples,`);
									if (PC.lactation > 0) {
										r.push(`squealing happily when milk begins to flow from them.`);
										PC.lactationDuration = 2;
									} else {
										r.push(`grumbling unhappily when ${he} finds no milk within.`);
									}
									if ((overpowerCheck(slave, V.PC) < random(1, 100)) && slave.muscles > 30 && slave.incubatorSettings.reproduction > 0 && canAchieveErection(slave)) {
										r.push(`Suddenly, ${he} shoves you onto your back and begins enthusiastically fucking your breasts. Before you can push ${him} off, ${he} thrusts hard and unloads ${his} pent-up orgasm deep into your cleavage and across your face. ${He} sits back with a huge smile on ${his} face and a <span class="hotpink">new connection to you.</span> ${He} <span class="gold">recoils in surprise and fear</span> when you respond by slapping ${him} across the face for ${his} impudence. ${He} might not look like a dom, but ${he} may turn into one.`);
										slave.devotion += 5;
										slave.trust -= 5;
										if (random(1, 100) > 60 && slave.fetish === Fetish.NONE) {
											slave.fetish = "dom";
											slave.fetishStrength = 20;
										}
										App.Events.addNode(el, r);
										const result2 = document.createElement("p");
										result2.id = "result2";
										App.UI.DOM.appendNewElement(
											"div",
											el,
											App.UI.DOM.link(
												`Let it slide for now`,
												() => {
													const r = [];
													r.push(`You decide to yourself that it may be for the best to just send ${him} on ${his} way for now. You quietly order ${slave.slaveName} out into the penthouse, while you fetch a towel to wipe off ${his} seed. You can't reasonably expect ${him} to know the full ramifications of what ${he} did; ${he} can't exactly be considered an adult${(slave.physicalAge < 18) ? `, by any means` : ``}. Indeed, the ${girl} is mostly just bewildered by your sudden change in mood, but seems pretty sure that <span class="orangered">${he} had nothing to do with it.</span>`);
													slave.trust += 25;
													jQuery("#result2").empty().append(r.join(" "));
												}
											)
										);

										App.UI.DOM.appendNewElement(
											"div",
											el,
											App.UI.DOM.link(
												`Teach ${him} what ${he} did wrong`,
												() => {
													const r = [];
													r.push(`${His} language skills may be undeveloped, but the tank instilled certain phrases into ${him} as it raised ${him}. Taking advantage of those commands, you chastise ${him} for ${his} impudence and instruct ${him} that only you may decide if ${he} is allowed to do that. ${He} <span class="hotpink">nods along to your words</span> understanding concepts but mostly following along <span class="gold">in fear</span> of you.`);
													slave.devotion += 5;
													slave.trust -= 5;
													jQuery("#result2").empty().append(r.join(" "));
												}
											)
										);

										App.UI.DOM.appendNewElement(
											"div",
											el,
											App.UI.DOM.link(
												`Punish ${him} with a chastity belt`,
												() => {
													const r = [];
													r.push(`Righting yourself, you head to your desk and pull out a chastity cage. Calling the cautious ${girl} over, you tease ${his} genitals until ${he} lowers ${his} guard and lock ${his} dick in the device. ${He} <span class="mediumorchid">howls with displeasure</span> at the tightness around ${his} cock and <span class="gold">begins to panic</span> when ${he} finds ${he} can't remove it. You send ${him} off to learn ${his} place.`);
													slave.devotion -= 15;
													slave.trust -= 5;
													slave.chastityPenis = 1;
													App.Events.refreshEventArt(slave);
													jQuery("#result2").empty().append(r.join(" "));
												}
											)
										);

										if (V.seeExtreme === 1) {
											App.UI.DOM.appendNewElement(
												"div",
												el,
												App.UI.DOM.link(
													`Geld ${him} as punishment`,
													() => {
														const r = [];
														r.push(`Righting yourself, you grab the cowering slave, drag ${him} to the autosurgery and strap ${him} face-down with ${his} legs spread. ${He} doesn't understand what's happening, but giggles at the sensations running through ${his} numb body. ${He}'s so drugged and drowsy with <span class="health dec">surgical recovery</span> that it takes a while for ${him} to figure out what's happened. When ${he} does, ${his} poor mind scarcely processes the <span class="gold">horror</span> of what's happened. ${He} spends the rest of the week dimly trying to find where ${his} balls went.`);
														if (FutureSocieties.isActive('FSGenderRadicalist')) {
															r.push(`Society <span class="green">approves</span> of your promptly gelding ${him}; this advances the idea that all societal inferiors can be made female.`);
															FutureSocieties.Change("Gender Radicalist", 2);
														}
														if (FutureSocieties.isActive('FSRestart')) {
															r.push(`Society <span class="green">approves</span> of your promptly gelding ${him}; this advances the idea that only the Elite should breed.`);
															FutureSocieties.Change("Eugenics", 2);
														}
														slave.devotion -= 25;
														slave.trust -= 50;
														slave.balls = 0;
														App.Events.refreshEventArt(slave);
														jQuery("#result2").empty().append(r.join(" "));
													}
												)
											);
										}
									} else {
										r.push(`Suddenly, ${he} buries ${his} head into your cleavage, knocking you off balance and to the floor. As you try to right yourself, you notice ${he} has fallen asleep in your pillowy breasts. Sighing, you make yourself comfortable until ${he} finishes ${his} nap. When`);
										if (canSee(slave)) {
											r.push(`the first thing ${he} sees when ${he} awakes is your face,`);
										} else {
											r.push(`he wakes up still enveloped in your bosom,`);
										}
										r.push(`a <span class="hotpink">lasting bond</span> is established between you two. ${He} happily returns to snuggling your tits before you can help ${him} up and send ${him} off. ${He} might be turning into a breast fetishist, if you had to guess.`);
										slave.devotion += 5;
										if (random(1, 100) > 40 && slave.fetish === Fetish.NONE) {
											slave.fetish = "boobs";
											slave.fetishStrength = 20;
										}
										App.Events.addNode(el, r);
									}
								} else {
									r.push(`You quickly strip off your shirt and draw close to ${slave.slaveName}. You grab ${him} as ${he} attempts to back away and pull ${his} tits directly into your own. Both sets of`);
									if (canSee(slave)) {
										r.push(`eyes lock onto their pair of breasts,`);
									} else {
										r.push(`tits push out against each other,`);
									}
									r.push(`or they would have, had yours not utterly eclipsed their rival. Scoffing, you release the confused ${girl} and walk away; leaving ${him} cupping ${his} own breasts and feeling uncertain about ${himself}. ${He} gets caught up in how small they really are, and how much <span class="hotpink">lesser</span> than ${his} ${getWrittenTitle(slave)} ${he} is.`);
									if (slave.fetish === "boobs") {
										if (slave.fetishKnown === 0) {
											r.push(`You did note one thing when your breasts touched: ${his} nipples`);
											if (slave.nipples === "fuckable") {
												r.push(`tightened around yours.`);
											} else {
												r.push(`got very hard.`);
											}
											r.push(`<span class="green">Looks like ${he}'s a breast fetishist!</span>`);
											slave.fetishKnown = 1;
										}
									}
									slave.devotion += 5;
									App.Events.addNode(el, r);
								}
								return el;
							},
						});
					}

					if (canAchieveErection(slave) && canSee(slave) && PC.dick >= 4 && PC.dick > slave.dick && slave.trust >= -20) {
						if (slave.energy > 95 || (slave.attrXX > 50 && slave.behavioralFlaw !== "hates women" && PC.boobs >= 400) || (slave.attrXY > 50 && slave.behavioralFlaw !== "hates men" && PC.boobs < 300) || (PC.belly >= 1500 && slave.fetish === "pregnancy") || (PC.boobs >= 1400 && slave.fetish === "pregnancy")) {
							choice({
								// TODO: tankBorn
								linkName: `Show ${him} what a real erection looks like`,
								result(slave) {
									const el = new DocumentFragment();
									let p;
									const r = [];

									$(el).append(`${His} arousal is obvious with the hard-on ${he} is sporting, but ${he} still has much to learn about size. You pop your own dick out and draw close to ${slave.slaveName}, grabbing and pulling ${him} close enough for your erections to touch. Both sets of eyes lock onto the crossed swords, or more appropriately, your sword and ${his} dagger. You give the confused ${girl} plenty of time to internalize what a real dick looks like as you <span class="hotpink">thoroughly emasculate</span> ${him}.`);
									slave.devotion += 5;

									p = document.createElement("p");
									p.id = "introResult2";
									p.append(App.UI.DOM.link(
										`Push ${his} head down`,
										() => {
											r.push(`You place a hand on ${his} head and guide ${him}`);
											if (slave.fetish === "cumslut") {
												r.push(`downwards, right onto your penis. As you slip deeper into ${his} throat, you find ${him} hungrily sucking your cock like an addict looking for their next hit. ${He} drains every last drop from your balls before you pull out. ${He} licks the last bit off the tip before opening wide again, <span class="hotpink">begging you for more.</span> <span class="green">You have quite the cum fiend on your hands.</span>`);
												slave.fetishKnown = 1;
											} else {
												r.push(`downwards. ${He} stares at your penis before hesitantly slipping it into ${his} mouth`);
												if (slave.skill.oral >= 100) {
													r.push(`and practically sucking the life out of you; it stands to reason that ${he} may have known exactly what ${he} was doing this whole time.`);
												} else if (slave.skill.oral > 60) {
													r.push(`and giving you a rather surprising blowjob; ${he}'s well on ${his} way already, it seems.`);
												} else if (slave.skill.oral > 30) {
													r.push(`and giving you a forgettable blowjob; ${he}'ll learn how to properly suck dick under your ownership.`);
												} else {
													r.push(`and giving you an awful blowjob; ${he}'ll get plenty of practice under your ownership.`);
												}
												r.push(`Only once ${he} has swallowed the last of your cum do you allow ${him} to clean ${himself} up and <span class="hotpink">reflect on what ${he} just did.</span>`);
											}
											slave.devotion += 5;
											actX(slave, "oral");
											jQuery("#introResult2").empty().append(r.join(" "));
										}
									));
									el.append(p);
									return el;
								},

							});
						}
					}
				}

				if ((slave.accent >= 3) && (slave.anus < 2) && (slave.intelligence + slave.intelligenceImplant <= 50) && (slave.devotion < 10) && (canSee(slave))) {
					choice({
						// TODO: tankBorn
						linkName: `Force understanding of ${his} situation past the language barrier`,
						result(slave) {
							const r = [];
							r.push(`With a rudimentary understanding of ${V.language}, at best, it's doubtful that ${he} understands exactly what ${his} immediate future is likely to entail. You resolve to ${him} in on the secret, and stand up, drawing ${his} attention to your hands with gestures. You point first at ${him}, and then at your left hand, which you form into a hole shape. Then you point at yourself with your left hand, and then at your right hand, whose index and middle fingers you extend, straight and together. Then, you take your left hand hole and your right hand phallus, and fuck the former with the latter, hard enough that the sex act depicted is obviously fun for your right hand only. ${He} watches raptly, and when comprehension dawns across ${his} face, <span class="gold">${he} starts to sob.</span>`);
							if (slave.vagina > -1) {
								r.push(`${He} indicates ${his} vagina tentatively, almost hopefully, but you shake your head, and emphasize the circular, anus-like shape of your left hand. ${He} cries harder.`);
							} else {
								r.push(`${He} wilts, pressing ${his} thighs together in an unconscious attempt to shield ${his} anus from its future as a target for ${his} ${getWrittenTitle(slave)}'s attentions.`);
							}
							slave.trust -= 10;

							return r.join(" ");
						},

					});
				}

				if (slave.inflation === 0 && hasAnyArms(slave) && canTaste(slave) && V.arcologies[0].FSHedonisticDecadenceResearch === 1) {
					choice({
						// TODO: tankBorn
						linkName: `Offer ${him} a slave-food cookie`,
						result(slave) {
							const r = [];
							r.push(`You pull a big plate of specially formulated cookies from your desk, place it before ${him} and invite ${him} to have some. ${He} looks between the plate and you, unsure of what to make of this development, but eventually grabs one and`);
							if (slave.behavioralFlaw === "gluttonous") {
								r.push(`shoves it into ${his} mouth. ${He} nearly chokes in surprise at the taste before greedily reaching for another.`);
							} else if (slave.behavioralFlaw === "anorexic") {
								r.push(`nibbles the edge of it. ${He} gasps in surprise at the taste before greedily shoving the entire thing into ${his} mouth and reaching for another.`);
							} else {
								r.push(`takes a bite. ${He} gasps in surprise at the taste before greedily shoving the entire thing into ${his} mouth and reaching for another.`);
							}
							r.push(`In minutes, ${he}'s managed to devour every last cookie on the plate. Before ${he} can even pout that they're all gone, you place another pair of plates`);
							if (canSmell(slave)) {
								r.push(`under ${his} nose.`);
							} else {
								r.push(`in front of ${him}.`);
							}
							r.push(`${He} promptly rushes for them,`);
							if (slave.behavioralFlaw === "gluttonous") {
								r.push(`paying no mind to ${his} bloated belly bumping into your desk, and resumes stuffing ${himself}.`);
							} else if (slave.behavioralFlaw === "anorexic") {
								r.push(`only to recoil in shock when ${his} bloated belly`);
								if (slave.belly >= 1000) {
									r.push(`reaches your desk earlier than expected.`);
								} else {
									r.push(`pushes into your desk.`);
								}
								r.push(`${He} gropes it uncomfortably before being overwhelmed by the addictive substance and going back to stuffing ${himself}.`);
							} else {
								r.push(`barely noticing ${his} bloated belly`);
								if (slave.belly >= 1000) {
									r.push(`hanging heavier than ever,`);
								} else {
									r.push(`bumping into your desk,`);
								}
								r.push(`and resumes stuffing ${himself}.`);
							}
							r.push(`By the time ${he}'s done, ${his} belly`);
							if (slave.belly >= 1000) {
								r.push(`is positively heaving. You can clearly see the defined mass of ${his} stomach resting atop ${his} swollen abdomen.`);
							} else {
								r.push(`is positively huge. You can clearly see ${his} swollen stomach at the top of the mass of food inside ${him}.`);
							}
							r.push(`${He} collapses onto ${his} rear and belches loudly.`);
							if (FutureSocieties.isActive('FSDegradationist')) {
								r.push(`It doesn't take long for the tainted food to do its thing. ${He} groans loudly and clutches ${his} bulging midriff, ${his} body in severe distress thanks to the modified slave food. ${He} rolls onto ${his} back and does everything ${he} can to soothe the turmoil growing inside ${him}. You know it won't do any good, but ${he} doesn't. ${He}'ll spend however long it takes ${his} body to digest the food in anguish; ${he}'ll regret ever touching the stuff. But you know better, ${his} growing addiction will have ${him} scarfing it down at every chance, but for now, all ${he} can do is <span class="mediumorchid">blame you</span> and <span class="gold">curse your trickery.</span>`);
								slave.devotion -= 20;
								slave.trust -= 20;
							} else {
								if (slave.behavioralFlaw === "gluttonous") {
									r.push(`${He} <span class="mediumaquamarine">happily pats ${his} full belly;</span> ${he}'s going to <span class="hotpink">like it here.</span>`);
									slave.devotion += 10;
									slave.trust += 10;
								} else if (slave.behavioralFlaw === "anorexic") {
									r.push(`Only then does ${he} regain composure enough to realize what ${he}'s done. ${He} <span class="mediumorchid">bursts into tears</span> as ${he} rubs ${his} disgustingly full belly. ${He} glares at you, only to catch you toying with even more food. ${He} begins to <span class="gold">tremble</span> when ${he} realizes how easily you did this to ${him}. You're sure ${he}'ll change ${his} tune in time, since you know ${he}'ll be unable to resist sneaking treats.`);
									slave.devotion -= 10;
									slave.trust -= 10;
								} else {
									r.push(`${He} <span class="hotpink">happily pats ${his} full belly,</span> before coming to ${his} senses and realizing what ${he} did. ${He} begins to <span class="gold">tremble</span> as it dawns on ${him} just how easily you manipulated ${him}.`);
									slave.devotion += 5;
									slave.trust -= 10;
								}
							}
							r.push(`Given the availability of the slave treats and ${his} burgeoning addiction to them, ${he}'ll likely keep ${himself} stuffed unless you force ${him} to stop.`);
							if (slave.bellyPreg >= 1500 || slave.bellyImplant >= 1500) {
								slave.inflation = 1;
							} else {
								slave.inflation = 2;
							}
							slave.inflationType = "food";
							slave.inflationMethod = 1;
							SetBellySize(slave);
							App.Events.refreshEventArt(slave);

							return r.join(" ");
						},

					});
				}
			}

			lineBreak();
			choice({
				linkName: `Spank ${him}`,
				result(slave) {
					const r = [];
					r.push(`You`);
					if (slave.devotion > 20 || slave.trust < -20) {
						r.push(`lay the ${(tankBorn) ? `curious` : `obedient`} ${desc} across your knees`);
					} else {
						r.push(`force the resistant ${desc} to lie across your knees`);
					}
					r.push(`and run a voluptuary hand across ${his}`);
					if (slave.butt > 6) {
						r.push(`jiggling`);
					} else if (slave.butt > 3) {
						r.push(`delightfully big`);
					} else if (slave.butt > 1) {
						r.push(`cute`);
					} else {
						r.push(`skinny`);
					}
					r.push(`buttocks, enjoying the way ${he} tenses up reflexively at the ${(tankBorn) ? `unfamiliar` : `extreme vulnerability of ${his}`} position. ${He} feels the change in your posture as you bring your hand back, and`);
					if (slave.devotion > 20 || slave.trust < -20) {
						r.push(`can't stop ${himself} from wriggling`);
					} else {
						r.push(`struggles desperately`);
					}
					r.push(`for just a moment before your palm smacks against ${his} ass.`);
					if (tankBorn) {
						r.push(`${He} gasps with surprise, but does not object or try to escape. ${He} accepts the spanking, viewing it as a game, and taunts your hand with ${his} rear; by the end, ${he} may even be starting to enjoy it. You're not particularly harsh, and ${he} gets up after you tire of swatting ${his} bottom <span class="hotpink">with a smile</span> on ${his} face.`);
						slave.devotion += 4;
						if (random(1, 100) > 60 && slave.fetish === Fetish.NONE) {
							slave.fetish = "masochist";
							slave.fetishStrength = 20;
						}
					} else if (slave.devotion > 20) {
						if (slave.fetish === "masochist") {
							if (slave.fetishKnown === 0) {
								r.push(`${He} gasps with profound shock, and you feel ${his} whole body stiffen atop your thighs as ${he} tries to work out what just happened. With each spank, ${he} grows more and more aroused until ${he} finally reaches orgasm. <span class="green">${He}'s a pain fetishist!</span>`);
								slave.fetishKnown = 1;
							} else {
								r.push(`${He} groans with guilty pleasure, feeling the pain radiate out from ${his} buttocks with each swat, feeling it seem to circle around ${his} hips to pool between ${his} legs. Before long, ${he} reaches a quivering orgasm.`);
							}
							r.push(`${He} gets up very gingerly, but bites ${his} lip cutely, <span class="hotpink">feeling a strange satisfaction.</span>`);
							slave.devotion += 5;
						} else {
							r.push(`${He} gasps with pain, but does not object or try to escape. ${He} accepts the spanking dutifully. You're not particularly harsh, and ${he} gets up after you tire of swatting ${his} bottom <span class="hotpink">without resentment</span> of this treatment.`);
							slave.devotion += 4;
						}
					} else {
						if (slave.fetish === "masochist") {
							if (slave.fetishKnown === 0) {
								r.push(`${He} gasps with profound shock, and you feel ${his} whole body stiffen atop your thighs as ${he} tries to work out what just happened. ${He} begins to cry as ${he} realizes that having ${his} bottom beaten is getting ${him} horny. <span class="green">${He}'s a pain fetishist!</span>`);
								slave.fetishKnown = 1;
							} else {
								r.push(`${He} groans with unwilling pleasure, feeling the pain radiate out from ${his} buttocks with each swat, feeling it seem to circle around ${his} hips to pool between ${his} legs. ${He} does not orgasm, but feels much more pleasure than ${he}'s willing to admit.`);
							}
							r.push(`When you let ${him} up, ${he}'s sobbing, more from humiliation than pain. However, ${he} <span class="hotpink">submits</span> to an uncomfortable groping of ${his} buttocks, which are pleasingly warm from the spanking.`);
							slave.devotion += 4;
						} else {
							r.push(`${He} gasps with pain, and starts to wriggle off you until you pin ${him} with your other hand. ${He} accepts the rest of the spanking unhappily. You're not particularly harsh, and ${he} gets up after you tire of swatting ${his} bottom, <span class="gold">fearful</span> due to the humiliation rather than the pain.`);
							slave.trust -= 4;
						}
					}

					return r.join(" ");
				},

			});
			lineBreak();

			if (hasAnyArms(slave)) {
				choice({
					// TODO: tankBorn
					linkName: `Tie ${him} up and give ${him} a good whipping`,
					result(slave) {
						const r = [];
						r.push(`You cuff ${his} wrist${hasBothArms(slave) ? 's' : ''}`);
						r.push(`and tie the cuffs to a hook in the ceiling so ${he}'s forced up on tiptoe. Reflecting that sometimes the old ways are best, you take a whip to ${him}. It's soft leather and you have some skill, so ${his} skin isn't broken, but you lash ${his} buttocks and every stroke draws a scream. After a while, the pain grows dull for ${him} and ${he} slumps in ${his} bindings, moaning. You switch to ${his} nipples, bringing ${him} back to howling life as ${he} dances on tiptoe and tries to dodge.`);
						if (slave.dick !== 0) {
							r.push(`You finish by taking the whip to ${his} penis, leaving ${him} sobbing and begging.`);
						}
						if (tankBorn) {
							r.push(`${His} first true introduction to you sinks deep; now ${he} <span class="gold">deeply fears you</span> and <span class="mediumorchid">hates being around you.</span>`);
							slave.devotion -= 50;
							slave.trust -= 100;
						} else {
							r.push(`If ${he} was wondering what kind of master ${his} new master is, now ${he} <span class="gold">knows.</span> ${He} will remember <span class="mediumorchid">what you can do to ${him}.</span>`);
							slave.devotion -= 5;
							slave.trust -= 10;
						}

						return r.join(" ");
					},

				});
			}
			lineBreak();
			if (slave.anus !== 0) {
				if (slave.vagina > 0) {
					choice({
						// TODO: tankBorn
						linkName: `Use a machine on ${his} holes`,
						result(slave) {
							const r = [];
							r.push(`${He}'s not a virgin anywhere, so you'll have to go more extreme to provide a properly introductory level of sexual torture equivalent to defloration. You tie your new slave down on`);
							if (hasAnyArms(slave)) {
								r.push(hands);
								if (hasAnyLegs(slave)) {
									r.push(`and`);
								}
							}
							if (hasBothLegs(slave)) {
								r.push(`knees`);
							} else if (hasAnyLegs(slave)) {
								r.push(`knee`);
							}
							r.push(`and bring a fuckmachine up from storage. It fits over ${him} as ${he} whimpers down there on`);
							if (hasAllLimbs(slave)) {
								r.push(`all fours,`);
							} else {
								r.push(`the floor,`);
							}
							r.push(`and you adjust the pistons so that the tip of a dildo rests inside each of ${his} holes. You add lube when necessary,`);
							if (V.assistant.personality <= 0) {
								r.push(`but the rest of the day is monotonous machine rape for ${him}.`);
							} else {
								r.push(`but for ${him} the rest of the day is machine rape controlled by your sultry-voiced personal assistant program. Your assistant is an exquisite sexual torturer, ensuring that the experience is never damaging and always overwhelming. ${He} keeps up a steady stream of degrading verbal abuse while ${he} works.`);
							}
							r.push(`Any resistance to you is <span class="mediumorchid">worn down</span> and replaced with a germ of <span class="gold">fear.</span> <span class="lime">The slave's holes are nicely stretched.</span>`);
							slave.devotion -= 5;
							slave.trust -= 10;
							actX(slave, "vaginal");
							actX(slave, "anal");
							slave.anus += 1;
							slave.vagina += 1;

							return r.join(" ");
						},

					});
				} else if (slave.vagina === -1) {
					choice({
						// TODO: tankBorn
						linkName: `Use a machine on ${his} asshole`,
						result(slave) {
							const r = [];
							r.push(`${He}'s not an anal virgin, so you'll have to go more extreme to provide an introductory level of sexual torture equivalent to defloration. You tie your new slave down on`);
							if (hasAnyArms(slave)) {
								r.push(hands);
								if (hasAnyLegs(slave)) {
									r.push(`and`);
								}
							}
							if (hasBothLegs(slave)) {
								r.push(`knees`);
							} else if (hasAnyLegs(slave)) {
								r.push(`knee`);
							}
							r.push(`and bring a fuckmachine up from storage. It fits over ${him} as ${he} whimpers down there on`);
							if (hasAllLimbs(slave)) {
								r.push(`all fours,`);
							} else {
								r.push(`the floor,`);
							}
							r.push(`and you adjust the pistons so that the tip of a dildo rests inside ${his} asshole. You add lube when necessary,`);
							if (V.assistant.personality <= 0) {
								r.push(`but the rest of the day is monotonous machine rape for ${him}.`);
							} else {
								r.push(`but for ${him} the rest of the day is machine rape controlled by your sultry-voiced personal assistant program. Your assistant is an exquisite sexual torturer, ensuring that the experience is never damaging and always overwhelming. ${He} keeps up a steady stream of degrading verbal abuse while ${he} works.`);
							}
							r.push(`Any resistance to you is <span class="mediumorchid">worn down</span> and replaced with a germ of <span class="gold">fear.</span> <span class="lime">The slave's asshole is nicely stretched.</span>`);
							// Written and coded by Boney M
							slave.devotion -= 5;
							slave.trust -= 10;
							actX(slave, "anal");
							slave.anus += 1;

							return r.join(" ");
						},

					});
				}
			}
			lineBreak();
			if (canTalk(slave) && !isAmputee(slave)) {
				choice({
					linkName: `Make ${him} an office ornament for the day`,
					result(slave) {
						const r = [];
						r.push(`You cuff ${his}`);
						if (hasAnyArms(slave)) {
							r.push(wrists);
							if (hasAnyLegs(slave)) {
								r.push(`and`);
							}
						}
						if (hasAnyLegs(slave)) {
							r.push(`${ankles}, bend`);
						} else {
							r.push(r.pop() + `, bend`);
						}
						if (getLimbCount(slave) === 4) {
							r.push(`all four limbs`);
						} else if (getLimbCount(slave) === 3) {
							r.push(`all three limbs`);
						} else if (getLimbCount(slave) === 2) {
							r.push(`both limbs`);
						} else {
							r.push(`${his} limb`);
						}
						r.push(`behind ${him}, secure them together, and hoist ${him} up to the ceiling on a rope. ${He} hangs up there like a sex slave chandelier${(slave.boobs >= 650) ? `, breasts swaying in a lovely way whenever ${he} struggles` : ``}. Periodically you let ${him} down to stretch ${his} aching`);
						if ((!hasAnyArms(slave) && !hasBothLegs(slave)) || (!hasBothArms(slave) && !hasAnyLegs(slave))) {
							r.push(`limb,`);
						} else {
							r.push(`limbs,`);
						}
						r.push(`but whenever you put your decoration back up you add some clips with little bells on them: first the nose, then the nipples, and finally the`);
						if (slave.dick !== 0) {
							r.push(`dickhead.`);
						} else {
							r.push(`pussylips.`);
						}
						r.push(`By the end of the day your work is accompanied by the sweet sounds of ringing bells and <span class="gold">agonized pleas</span> for mercy in ${his}`);
						if (slave.voice === 3) {
							r.push(`high, girlish`);
						} else if (slave.voice === 2) {
							r.push(`feminine`);
						} else {
							r.push(`deep`);
						}
						if (tankBorn) {
							r.push(`${He} <span class="hotpink">seems to think it's a game</span> and <span class="mediumaquamarine">trusts you more</span> for playing it with ${him}.`);
							slave.devotion += 5;
							slave.trust += 10;
						} else {
							r.push(`voice. ${He} will remember <span class="mediumorchid">what you can do to ${him}.</span>`);
							slave.devotion -= 5;
							slave.trust -= 10;
						}
						return r.join(" ");
					},

				});
			}
			lineBreak();
			if (cumSlaves().length > 3) {
				choice({
					// TODO: tankBorn
					linkName: `Fill ${him} with cum`,
					result(slave) {
						const r = [];
						r.push(`You securely restrain your new slave${(V.dairyRestraintsSetting > 1) ? ` in a milking stall` : ``}. A quick finger check of ${his} holes allows you to choose wisely from a selection of hollow phalluses, which push into your helpless new slave's mouth,`);
						actX(slave, "oral");
						if (slave.vagina > 0) {
							r.push(`vagina,`);
							actX(slave, "vaginal");
						}
						if (slave.anus > 0) {
							r.push(`and squeeze into ${his} ass,`);
							actX(slave, "anal");
						}
						r.push(`with no room to spare.`);
						r.push(`Your choices attach to long tubes, and with a fiendish smile you turn a valve. The lines run white with a mixture of fluids from your other slaves, and your newest slave begins to fill.`);
						if (slave.devotion > 20) {
							if (slave.fetish === "cumslut") {
								if (slave.fetishKnown === 0) {
									r.push(`${He} seems genuinely eager to hold as much of the fluid as ${he} can. <span class="green">${He}'s a cum fetishist!</span>`);
									slave.fetishKnown = 1;
								} else {
									r.push(`${He} groans with guilty pleasure, feeling ${his} muscles ache and ${his} torso swell. Before long, ${he} reaches a quivering orgasm.`);
								}
								r.push(`As you release ${him} ${he} swings up with difficulty, but <span class="hotpink">${he} seems very pleased</span> to stay plugged for now.`);
								slave.devotion += 5;
							} else {
								if (!hasBothEyes(slave)) {
									r.push(`${His} face swells`);
								} else {
									r.push(`${His} eyes swell`);
								}
								r.push(`with shock, but ${he} does not flinch or make a sound. When ${he} seems full enough, you shut off the valve, deciding to leave ${him} plugged for now. ${He} waddles off <span class="hotpink">without apparent resentment</span> of this treatment.`);
								slave.devotion += 4;
							}
						} else {
							if (slave.fetish === "cumslut") {
								if (slave.fetishKnown === 0) {
									if (!hasBothEyes(slave)) {
										r.push(`${His} face swells`);
									} else {
										r.push(`${His} eyes swell`);
									}
									r.push(`with profound horror at the realization of what is happening, and begin to leak tears as ${he} realizes that having ${his} body swell with semen is getting ${him} horny. <span class="green">${He}'s a cum fetishist!</span>`);
									slave.fetishKnown = 1;
								} else {
									r.push(`${He} groans with guilty pleasure, feeling ${his} muscles ache and ${his} torso swell. ${He} does not orgasm from ${his} "meal," but feels much more pleasure than ${he}'s willing to admit.`);
								}
								r.push(`When you let ${him} up, ${he}'s sobbing, more from humiliation than discomfort. However, ${he} <span class="hotpink">submits</span> to an uncomfortable groping of ${his} stomach, which is pleasingly taut from the inflation. You decide to leave ${him} plugged for a few hours, impressing on ${him} still more that ${his} fate is out of ${his} control.`);
								slave.devotion += 4;
							} else {
								r.push(`${He} gasps in horror, and starts to struggle frantically against ${his} bonds. However, as the fluid reaches ${him} ${he} seems to resign ${himself} to ${his} fate. Once ${he} reaches a fullness you like you let ${him} up, <span class="gold">fearful</span> due to the humiliation rather than the swelling. ${He} limps off to ${his} new duties as quickly as ${he} can, before you can unplug ${him}. Oh well!`);
								slave.trust -= 4;
							}
						}
						r.push(`${His} first day promises to be a full one!`);
						slave.inflation = 1;
						SetBellySize(slave);
						App.Events.refreshEventArt(slave); // temporarily inflate, refresh art, then deflate
						deflate(slave);

						return r.join(" ");
					},

				});
			}
			lineBreak();
			if (hasAnyArms(slave)) {
				choice({
					linkName: `Put a shock collar on ${him} and force ${him} to rape ${himself}`,
					result(slave) {
						const r = [];
						slave.collar = "shock punishment";
						r.push(`You put a shock collar on ${him}. Its function isn't immediately obvious, at least until you test it on the lowest power setting, making ${him} jump and look at you ${(tankBorn) ? `in terror` : `fearfully`}. This concern is compounded when you throw a big dildo at ${him} and tell ${him} to rape ${himself}. ${He} gapes at you incredulously until you give ${him} a stronger jolt and peremptorily tell ${him} to`);
						if (slave.vagina > 0) {
							r.push(`pick it up and pound ${his} own pussy. <span class="mediumorchid">${(tankBorn) ? `Uncertain` : `Reluctantly`},</span> ${he} reaches down shakily, seats ${himself}, and slowly pushes the uncomfortably big phallus inside ${his} womanhood. ${He} starts to fuck ${himself}. Harder, you command. Wincing, ${he} works ${his} cunt faster. Harder, you repeat, giving ${him} another shock. <span class="gold">${He} begins to cry,</span> but obeys, sawing the big fake cock in and out, really raping ${himself}.`);
							actX(slave, "vaginal");
						} else if (slave.anus > 0) {
							r.push(`pick it up and pound ${his} own ass. <span class="mediumorchid">${(tankBorn) ? `Uncertain` : `Reluctantly`},</span> ${he} reaches down shakily, seats ${himself}, and gradually shoves the already-lubricated phallus into ${his} ass. It's uncomfortably big for ${his} butt, but ${he} can manage it, and slowly starts to sodomize ${himself}. Harder, you command. Wincing, ${he} fucks ${his} ass faster. Harder, you repeat, giving ${him} another shock. <span class="gold">${He} begins to cry,</span> but obeys, sawing the big fake cock in and out, really assraping ${himself}.`);
							actX(slave, "anal");
						} else {
							r.push(`pick it up and facefuck ${himself}. <span class="mediumorchid">${(tankBorn) ? `Uncertain` : `Reluctantly`},</span> ${he} reaches down shakily, seats ${himself}, and slowly swallows the uncomfortably big phallus. ${He} has to start over several times as ${his} gag reflex kicks in, but ${he} finally manages to hilt it. Harder, you command. Eyes rolling fearfully, ${he} withdraws it a few`);
							if (V.showInches === 2) {
								r.push(`inches`);
							} else {
								r.push(`centimeters`);
							}
							r.push(`and shoves it down ${his} throat again. Harder, you repeat, giving ${him} another shock. <span class="gold">${He} begins to weep and gag,</span> but obeys, sawing the big fake cock in and out, really molesting ${himself}.`);
							actX(slave, "oral");
						}
						if (tankBorn) {
							slave.trust -= 100;
							slave.devotion -= 50;
						} else {
							slave.trust -= 10;
							slave.devotion -= 5;
						}
						return r.join(" ");
					},

				});
			}
			lineBreak();
			if ((V.dairy > 0) && (V.dairyRestraintsSetting > 1) && (V.seeExtreme === 1)) {
				App.UI.DOM.appendNewElement("div", p, `...in the Industrial Dairy`, "note");
				choice({
					linkName: `Threaten ${him} with the Industrial Dairy`,
					result(slave) {
						const r = [];
						const {hisU} = getNonlocalPronouns(V.seeDicks).appendSuffix('U');
						r.push(`You tell ${him} that it's in ${his} interests to be a good ${girl}.`);
						if (tankBorn) {
							r.push(`${He} smiles happily, taking it as a compliment. You point behind ${him}; ${he} turns,`);
						} else {
							r.push(`${He} does not react immediately, perhaps wondering if you think such a trite statement will have a real impact, but then you`);
							if (canSee(slave)) {
								r.push(`point at`);
							} else {
								r.push(`direct ${him} towards`);
							}
							r.push(`a wallscreen behind ${him}. ${He} turns,`);
						}
						r.push(`and beholds a live feed from the Industrial Dairy.`);
						if (canSee(slave)) {
							r.push(`${He} gazes spellbound at the interleaved row of bodies intertwined with machines in embraces far more intimate than any lover could hope to match. The gently heaving masses of breastflesh hold ${his} fascinated and horrified attention until one of the machines fortuitously chooses this moment to cycle its occupant's anal hydration regimen.`);
						} else if (canHear(slave)) {
							r.push(`${He} listens entranced by the steady rhythm of the machines collecting their occupants' bodily fluids. The muffled moans and groans of the restrained slaves hold ${his} fascinated and horrified attention until one of the machines fortuitously chooses this moment to cycle its occupant's anal hydration regimen.`);
						} else {
							r.push(`Such a broadcast would normally be pointless for a senseless slave like ${slave.slaveName}, but you've taken precautions to accommodate such slaves. The wallscreen is connected to the heating, air conditioning, and sprinkler systems in order to accurately replicate the aura of an industrial slave dairy, so ${he} is fully immersed in the scene when one of the machines fortuitously chooses this moment to cycle its occupant's anal hydration regimen.`);
						}
						r.push(`It withdraws its horse-sized phallus from the slave's anus, leaving ${hisU} gape pulsing gently as it awaits the resumption of the endless assrape. ${slave.slaveName} lets out a huge sob and turns to you, <span class="gold">fear suffusing ${him}</span> as ${he} promises to <span class="hotpink">be a good ${girl}.</span>`);
						slave.devotion += 10;
						slave.trust -= 10;
						return r.join(" ");
					},

				});

				if ((slave.lactation > 0 || ((V.dairySlimMaintainUpgrade === 0 || V.dairySlimMaintain === 0) && (slave.boobs > 300 || slave.dick === 0 || V.dairyImplantsSetting === 1) && V.dairyImplantsSetting !== 2)) || (slave.balls > 0)) {
					if (V.dairyPrepUpgrade === 1 && App.Entity.facilities.dairy.hasFreeSpace) {
						choice({
							linkName: `Send ${him} straight to the Industrial Dairy`,
							result(slave) {
								const r = [];
								slave.choosesOwnAssignment = 0;
								slave.anus = Math.clamp(slave.anus, 3, 4);
								if (slave.vagina > -1) {
									slave.vagina = Math.clamp(slave.vagina, 3, 4);
								}
								actX(slave, "anal", 10);
								assignJob(slave, Job.DAIRY);

								r.push(`You order`);
								if (V.HeadGirlID === 0) {
									r.push(`another slave`);
								} else {
									r.push(S.HeadGirl.slaveName);
								}
								r.push(`to get ${slave.slaveName} set up in ${V.dairyName}. The new slave does not know what ${V.dairyName} is, not really, and ${he} doesn't know what being set up there means, either. If ${he} knew that you are able to send ${him} there so blithely only because it is equipped with a special preparatory raper that will seize ${him},`);
								if (slave.vagina > -1) {
									r.push(`mercilessly fuck ${his} pussy and ass until both are gaped,`);
								} else {
									r.push(`ream ${his} anus until it's cavernously gaped,`);
								}
								r.push(`and then consign ${him} to constant fucking by gargantuan machine phalli, ${he} might resist. But ${he} doesn't, so ${he} does not.`);

								return r.join(" ");
							},

						});
					}
					if (App.Entity.facilities.dairy.hasFreeSpace) {
						choice({
							linkName: `Break ${him} in for the Industrial Dairy`,
							result(slave) {
								const r = [];
								slave.choosesOwnAssignment = 0;
								slave.anus = Math.clamp(slave.anus, 3, 4);
								if (slave.vagina > -1) {
									slave.vagina = Math.clamp(slave.vagina, 3, 4);
									actX(slave, "vaginal", 10);
								}
								actX(slave, "anal", 10);
								assignJob(slave, Job.DAIRY);

								r.push(`Making use of`);
								if (tankBorn) {
									r.push(`${his} blissful ignorance,`);
								} else if (slave.trust < -20 || slave.devotion > 20) {
									r.push(`${his} obedience,`);
								} else {
									r.push(`the compliance systems,`);
								}
								r.push(`you restrain ${him} on one of the chairs in your office in an approximation of the position ${he}'ll occupy in ${V.dairyName}. Then you put a mask on ${him}, like the ones the machines there feature, and turn it on, watching the slave squirm against ${his} restraints under the sudden bombardment of garish hardcore porn. Finally, you add a dildo gag, both to mimic the dildo that will feed ${him}, and to keep your office reasonably quiet. Then, for the rest of the day, you use ${his} vulnerable`);
								if (slave.vagina > -1) {
									r.push(`holes`);
								} else {
									r.push(`asshole`);
								}
								r.push(`as an outlet for your sexual energy. You are not gentle; in fact, the point of the whole exercise is to gape ${him}. By the evening ${he}'s been fucked so hard that ${he}'s stopped jerking against the chair when you pound`);
								if (PC.dick !== 0) {
									r.push(`your huge cock`);
								} else {
									r.push(`a huge strap-on`);
								}
								r.push(`in and out of ${him}, so you're obliged to get creative, sliding fingers in alongside`);
								if (PC.dick !== 0) {
									r.push(`yourself`);
								} else {
									r.push(`it`);
								}
								r.push(`to really blow ${him} out. Once that gets too easy, you start adding dildos for double`);
								if (slave.vagina > -1) {
									r.push(`and triple`);
								}
								r.push(`penetration. By nighttime ${he}'s properly prepared to take ${V.dairyName}'s giant phalli, and you're bored, so you consign ${him} to ${his} fate. ${He} might have some opinion on how ${he}'s spent ${his} day, but it's unlikely ${he}'ll remember it by tomorrow, what with the forearm-sized dildos sliding in and out of ${his} throat${(slave.vagina > -1) ? `, cunt,` : ``} and asshole.`);

								return r.join(" ");
							},

						});
					}
				}
			}
			lineBreak();
			if (V.dairyPiping === 1) {
				if (((V.cumPipeline > 88 && V.cumPipeline !== 0) || V.arcologies[0].FSPastoralistLaw === 1) && slave.bellyPreg < 1500 && slave.inflation === 0 && slave.bellyImplant < 1500) {
					choice({
						// TODO: tankBorn
						linkName: `Give ${him} all the cum ${he} can drink`,
						result(slave) {
							const el = new DocumentFragment();
							let r = [];
							r.push(`You securely restrain your new slave; for both ${his} own safety and so ${he} can't object to ${his} meal. You reassure ${him}, and order ${him} to`);
							if (hasAnyEyes(slave)) {
								r.push(`close ${his} eyes and`);
							}
							r.push(`open wide for a treat.`);
							if (canSee(slave)) {
								r.push(`Since ${his} eyes are contentedly closed,`);
							} else {
								r.push(`Blind as ${he} is,`);
							}
							r.push(`${he} doesn't see you reach for one of the phallus-tipped feeding tubes located throughout your penthouse. Before ${he} knows what's happening, you've forced the cocktube firmly into ${his} gaping maw and anchored it to ${his} head, causing ${his} entire body to tense up`);
							if (slave.devotion <= 20) {
								r.push(`in panic`);
							}
							r.push(`once more.`);

							App.UI.DOM.appendNewElement("p", el, r.join(" "));
							r = [];
							r.push(`You pause to examine the tap, making sure it is set to cum, before releasing the valve and unleashing a steady flow. The feeder bucks against ${his} face as thick, white liquid rushes downward towards the helpless slave.`);
							if (slave.devotion > 20) {
								if (slave.fetish === "cumslut") {
									if (slave.fetishKnown === 0) {
										r.push(`Stunningly, once ${he} gets over the impact of the wave of fresh semen, ${he} seems genuinely eager to hold as much of the fluid as ${he} can, stretching contentedly to ${his} reasonable limit. <span class="green">${He}'s a cum fetishist!</span>`);
										slave.fetishKnown = 1;
									} else {
										r.push(`${His} belly steadily swells from a few months of apparent pregnancy, to "spent too much time at the buffet", until it finally stops wobbling, grows taut and forces ${his} belly button into an outie. Your cow groans not only with the weight and mounting pressure, but with guilt as well. Before long, ${he} reaches a quivering orgasm.`);
									}
									r.push(`You stroke ${his} gurgling stomach slowly, before turning off the valve, unfastening ${his} binds and leaving your <span class="hotpink">very pleased</span> cum balloon to savor ${his} meal. You'll make sure to set aside enough cum from your cumslaves for ${him} to drink ${himself} stupid with, and, glancing over your shoulder, find ${him} eagerly masturbating to ${his} cum-filled gut. ${He}'ll probably intend to keep ${himself} filled to the brim, which is fine by you.`);
									slave.devotion += 5;
								} else {
									if (!hasBothEyes(slave)) {
										r.push(`${His} face swells`);
									} else {
										r.push(`${His} eyes swell`);
									}
									r.push(`with horror, but ${he} does not flinch or make a sound. ${His} belly also swells, from a few months of apparent pregnancy, to 'spent too much time at the buffet', till it finally stops wobbling, grows taut and forces ${his} belly button into an outie. Satisfied, you shut off the valve, deciding to leave ${him} to consider ${his} cum-filled middle. Time passes. ${His}`);
									if (canSee(slave)) {
										r.push(`eyes are glazed over,`);
									} else {
										r.push(`blind face is distant,`);
									}
									r.push(`but ${he} tolerates you slowly stroking ${his} stomach <span class="hotpink">without apparent resentment.</span> You'll make sure to keep ${him} like this for the time being.`);
									slave.devotion += 4;
								}
							} else {
								if (slave.fetish === "cumslut") {
									if (slave.fetishKnown === 0) {
										if (!hasBothEyes(slave)) {
											r.push(`${His} face tenses`);
										} else {
											r.push(`${His} eyes swell`);
										}
										r.push(`with profound horror at the realization of what is filling ${him} with a constant irresistible pressure, and ${he} begins to leak tears as ${he} realizes that ${his} rapidly swelling body is getting ${him} horny. <span class="green">${He}'s a cum fetishist!</span>`);
										slave.fetishKnown = 1;
									} else {
										r.push(`${His} belly steadily swells from a few months of apparent pregnancy, to "spent too much time at the buffet", till it finally stops wobbling, grows taut and forces ${his} belly button into an outie. Your cow groans not only with the weight and quickly mounting pressure, but with guilt as well. ${He} does not orgasm from ${his} gluttonous "meal," but feels much more pleasure than ${he}'s willing to admit.`);
									}
									r.push(`Time passes, marked only by the slowing growth of ${his} waistline and the gurgling deep within ${him}. However, ${he} <span class="hotpink">submits</span> to an uncomfortable groping of ${his} fluid distended stomach, which is pleasingly taut from ${his} massive cum meal. You decide to make it abundantly clear that if a single drop of cum leaves ${his} gullet, ${he}'s getting the hose again, impressing on ${him} still more that ${his} fate is out of ${his} control.`);
									slave.devotion += 4;
								} else {
									r.push(`${He} gasps in horror, and starts to struggle frantically against ${his} bonds,`);
									if (slave.voice !== 0) {
										r.push(`struggling to scream in panic.`);
									} else {
										r.push(`${his} whole body begging to scream.`);
									}
									r.push(`However, as the fluid reaches ${him}, ${he} seems to despair and resigns ${himself} to ${his} fate. As ${his} belly swells, you find yourself comparing ${him} first to a binge eater, then some of the chubbier citizens you've seen, a large pregnancy, and finally a water balloon ready to burst. You stop the flow, and rest a hand on ${his} heaving stomach. ${His} <span class="gold">terrified</span> breathing and distant expression are clearly due to the pain, not lust, but it's also now quite clear to ${him} who is in charge here. You have little intent on letting ${his} stomach empty and will be setting aside enough cum to keep ${him} bloated into submission.`);
									slave.trust -= 4;
								}
							}
							slave.inflation = 3;
							slave.inflationType = "cum";
							slave.inflationMethod = 1;
							SetBellySize(slave);
							App.Events.refreshEventArt(slave);

							return r.join(" ");
						},

					});
				}
				lineBreak();
				if (((V.milkPipeline > 88 && V.milkPipeline !== 0) || V.arcologies[0].FSPastoralistLaw === 1) && slave.bellyPreg < 1500 && slave.inflation === 0 && slave.bellyImplant < 1500) {
					choice({
						// TODO: tankBorn
						linkName: `Give ${him} all the milk ${he} can drink`,
						result(slave) {
							const el = new DocumentFragment();
							let r = [];
							r.push(`You securely restrain your new slave; for both ${his} own safety and so ${he} can't object to ${his} meal. You reassure ${him}, and order ${him} to`);
							if (hasAnyEyes(slave)) {
								r.push(`close ${his} eyes and`);
							}
							r.push(`open wide for a treat.`);
							if (canSee(slave)) {
								r.push(`Since ${his} eyes are contentedly closed,`);
							} else {
								r.push(`Blind as ${he} is,`);
							}
							r.push(`${he} doesn't see you reach for one of the phallus-tipped feeding tubes located throughout your penthouse. Before ${he} knows what's happening, you've forced the cocktube firmly into ${his} gaping maw and anchored it to ${his} head, causing ${his} entire body to tense up`);
							if (slave.devotion <= 20) {
								r.push(`in panic`);
							}
							r.push(`once more.`);
							App.UI.DOM.appendNewElement("p", el, r.join(" "));
							r = [];

							r.push(`You pause to examine the tap, making sure it is set to milk, before releasing the valve and unleashing a steady flow. The feeder bucks against ${his} face as creamy, white liquid rushes downward towards the helpless slave.`);
							if (slave.behavioralFlaw === "gluttonous") {
								if (!hasBothEyes(slave)) {
									r.push(`${His} face swells`);
								} else {
									r.push(`${His} eyes swell`);
								}
								r.push(`with horror, but ${he} does not flinch or make a sound. ${His} belly also swells, from a few months of apparent pregnancy, to "spent too much time at the buffet", till it finally stops wobbling, grows taut and forces ${his} belly button into an outie. Satisfied, you shut off the valve, deciding to leave ${him} to consider ${his} milk-filled middle. Time passes. ${His}`);
								if (canSee(slave)) {
									r.push(`eyes are glazed over,`);
								} else {
									r.push(`blind face is distant,`);
								}
								r.push(`but ${he} tolerates you slowly stroking ${his} stomach <span class="hotpink">without apparent resentment.</span> You'll make sure to keep ${him} like this for the time being.`);
								slave.devotion += 5;
							} else {
								r.push(`${He} gasps in horror, and starts to struggle frantically against ${his} bonds,`);
								if (slave.voice !== 0) {
									r.push(`struggling to scream in panic.`);
								} else {
									r.push(`${his} whole body begging to scream.`);
								}
								r.push(`However, as the fluid reaches ${him}, ${he} seems to despair and resigns ${himself} to ${his} fate. As ${his} belly swells, you find yourself comparing ${him} first to a binge eater, then some of the chubbier citizens you've seen, a large pregnancy, and finally a water balloon ready to burst. You stop the flow, and rest a hand on ${his} heaving stomach. ${His} <span class="gold">terrified</span> breathing and distant expression are clearly due to the pain, not lust, but it's also now quite clear to ${him} who is in charge here. You have little intent on letting ${his} stomach empty and will be setting aside enough milk to keep ${him} bloated into submission.`);
								slave.trust -= 3;
							}
							slave.inflation = 3;
							slave.inflationType = "milk";
							slave.inflationMethod = 1;
							SetBellySize(slave);
							App.Events.refreshEventArt(slave);

							return r.join(" ");
						},

					});
				}
			}
			lineBreak();
			if (V.arcade > 0 && V.seeExtreme === 1 && slave.indentureRestrictions <= 0) {
				App.UI.DOM.appendNewElement("div", p, "...in the Arcade", "note");
				choice({
					linkName: `Threaten ${him} with the Arcade`,
					result(slave) {
						const r = [];
						const {girlU, himU} = getNonlocalPronouns(V.seeDicks).appendSuffix('U');
						r.push(`You tell ${him} that it's in ${his} best interests to be a good ${girl}.`);
						if (tankBorn) {
							r.push(`${He} smiles happily, taking it as a compliment. You`);
						} else {
							r.push(`${He} does not react immediately, perhaps wondering if you think such a trite statement will have a real impact, but then you`);
						}
						if (canSee(slave)) {
							r.push(`point at`);
						} else {
							r.push(`direct ${him} towards`);
						}
						r.push(`a wallscreen behind ${him}. ${He} turns, and beholds a live feed from ${V.arcadeName}.`);
						if (canSee(slave)) {
							r.push(`${He} gazes at the row of butts sticking out of the wall at dick height, not quite realizing what ${he}'s seeing. Then ${he} notices that there are citizens pumping away in front of two of the butts, and ${he} understands.`);
						} else if (canHear(slave)) {
							r.push(`${He} listens to the wet sounds of flesh on flesh, not quite realizing what ${he}'s hearing. Then ${he} picks out the sound of your citizens grunting and moaning as they pound away, and ${he} understands.`);
						} else {
							r.push(`Such a broadcast would normally be pointless for a senseless slave like ${slave.slaveName}, but you've taken precautions to accommodate such slaves. The wallscreen is connected to the heating, air conditioning, and sprinkler systems in order to accurately replicate the feeling of standing in front of a row of restrained public sex slaves, so the meaning of the scene in front of ${him} is not lost.`);
						}
						if (tankBorn) {
							r.push(`As ${he}`);
							if (canSee(slave)) {
								r.push(`watches,`);
							} else if (canHear(slave)) {
								r.push(`listens,`);
							} else {
								r.push(`stands there,`);
							}
							r.push(`aroused, first one citizen and then the other finishes and steps away. The first arcade inmate's`);
							if (V.seeDicks !== 100) {
								r.push(`pussy`);
							} else {
								r.push(`butt`);
							}
							r.push(`is left looking sore until ${V.arcadeName}'s systems cover ${himU} for a quick cleaning, and the second inmate's asshole`);
							if (V.seeDicks !== 0) {
								r.push(`has obviously seen severe use, since the poor ${girlU} doesn't have a pussy to spread the load.`);
							} else {
								r.push(`is loose enough that the machines have to clean up the cum it drools onto the floor.`);
							}
							r.push(`${slave.slaveName} lets out a cheer and turns to you, <span class="hotpink">eagerly awaiting the day ${he} gets to go to ${V.arcadeName} and play with the holes.</span> It seems ${he} missed the point.`);
							// TODO: This devotion and trust is copied from the old tw, and is the same as the normal scene, but doesn't seem cheery?
							slave.devotion += 10;
							slave.trust -= 10;
						} else {
							r.push(`As ${he}`);
							if (canSee(slave)) {
								r.push(`watches,`);
							} else if (canHear(slave)) {
								r.push(`listens,`);
							} else {
								r.push(`stands there,`);
							}
							r.push(`terrified, first one citizen and then the other finishes and steps away. The first arcade inmate's`);
							if (V.seeDicks !== 100) {
								r.push(`pussy`);
							} else {
								r.push(`butt`);
							}
							r.push(`is left looking sore until ${V.arcadeName}'s systems cover ${himU} for a quick cleaning, and the second inmate's asshole`);
							if (V.seeDicks !== 0) {
								r.push(`has obviously seen severe use, since the poor ${girlU} doesn't have a pussy to spread the load.`);
							} else {
								r.push(`is loose enough that the machines have to clean up the cum it drools onto the floor.`);
							}
							r.push(`${slave.slaveName} lets out a huge sob and turns to you, <span class="gold">fear suffusing ${him}</span> as ${he} promises to <span class="hotpink">be a good ${girl}.</span>`);
							slave.devotion += 10;
							slave.trust -= 10;
						}
						return r.join(" ");
					},

				});

				if (App.Entity.facilities.arcade.hasFreeSpace || V.arcadeUpgradeFuckdolls > 1) {
					choice({
						linkName: `Send ${him} straight to the Arcade`,
						result(slave) {
							const r = [];
							assignJob(slave, "be confined in the arcade");
							r.push(`You order`);
							if (V.HeadGirlID === 0) {
								r.push(`another slave`);
							} else {
								r.push(S.HeadGirl.slaveName);
							}
							r.push(`to get ${slave.slaveName} set up in ${V.arcadeName}. The new slave does not know what ${V.arcadeName} is, not really, and ${he} doesn't know what being set up there means, either. ${He}'ll be confined inside a small space, not too different from the indignities ${he}'s suffered already. It's only when the restraints lock into place that ${he}'ll understand ${his} doom. ${His} mouth will be forced open and presented at one wall of ${V.arcadeName}, and ${his} ass will protrude from its other side, ${his} holes available for public relief at both ends. ${He}'ll probably refuse to believe the truth, until the first cockhead enters ${his} mouth${(slave.vagina > -1) ? `, parts ${his} pussylips,` : ``} or presses against ${his} poor anus.`);
							if (!App.Entity.facilities.arcade.hasFreeSpace) {
								r.push(`Mere`);
								if (V.showInches === 2) {
									r.push(`yards`);
								} else {
									r.push(`meters`);
								}
								r.push(`away, preparations to convert the least appealing Arcade slave into a Fuckdoll begin. As ${slave.slaveName} is broken in by ${his} first customers, ${he}'s blissfully unaware that ${he}'s ${V.arcade} new slaves away from the same fate.`);
							}

							return r.join(" ");
						},

					});
				}
			}
			lineBreak();
			p.append(newChild());
		}

		IncreasePCSkills('trading', 0.1);
		if (PC.skill.slaving < 100 && jsRandom(PC.skill.slaving, 100) > 50) {
			IncreasePCSkills('slaving', 0.5);
		} else {
			IncreasePCSkills('slaving', 0.1);
		}

		return el;

		function lineBreak() {
			if (linkArray.length > 0) {
				App.UI.DOM.appendNewElement("div", p, App.UI.DOM.generateLinksStrip(linkArray));
			}
			linkArray = [];
		}

		function applyBrand() {
			if (
				(V.brandDesign.primary === "a racial slur") && // Oh no, will this slur make sense...
				(V.brandDesign.secondary) && // They actually set a backup, so we can care
				(
					(FutureSocieties.isActive('FSSupremacist') && slave.race !== V.arcologies[0].FSSupremacistRace) ||
					(FutureSocieties.isActive('FSSubjugationist') && slave.race === V.arcologies[0].FSSubjugationistRace)
				)
			) {
				// Slur made no sense, use the backup
				App.Medicine.Modification.addBrand(slave, brandTarget, V.brandDesign.secondary);
			} else {
				App.Medicine.Modification.addBrand(slave, brandTarget, V.brandDesign.primary);
			}
			slave.devotion -= 5;
			slave.trust -= 10;
			healthDamage(slave, 10);
		}
	}

	function newChild() {
		let linkArray;
		let p = document.createElement("p");
		if (tankBorn) {
			let interestLine;
			if ((momInterest === "boobs") || (dadInterest === "boobs")) {
				interestLine = document.createElement("div");
				linkArray = [];
				r = [];
				r.push(`You noticed ${his} interest in ${his}`);
				if (momInterest === "boobs" && dadInterest === "boobs") {
					r.push(`parents'`);
				} else if (momInterest === "boobs") {
					r.push(`mother's`);
				} else {
					r.push(`father's`);
				}
				r.push(`massive breasts when ${he} was around them.`);
				p.append(r.join(" "));
				if (slave.geneMods.NCS === 0) {
					if (slave.boobs >= 4000 && V.arcologies[0].FSAssetExpansionistResearch === 1) {
						linkArray.push(
							App.UI.DOM.link(
								`Start ${him} on a regimen of hyper breast growth drugs`,
								() => {
									slave.devotion += 25;
									slave.trust += 20;
									slave.boobs += 500;
									slave.drugs = "hyper breast injections";
									App.Events.refreshEventArt(slave);
									jQuery("#introResult").empty().append(
										`${He} squeals in protest as you inject ${his} breasts with their first dosage of HA-HGH, though ${he} changes ${his} tune by the end of the day once ${he} realizes ${his} breasts are bigger. By the end of the week, ${he}'s <span class="hotpink">deliriously happy</span> over ${his} swollen chest and <span class="mediumaquamarine">hopes</span> you'll let them grow even larger.`
									);
								}
							)
						);
					} else if (slave.boobs < 4000) {
						linkArray.push(
							App.UI.DOM.link(
								`Start ${him} on a regimen of breast growth drugs`,
								() => {
									slave.devotion += 15;
									slave.trust += 10;
									slave.boobs += 200;
									slave.drugs = "breast injections";
									App.Events.refreshEventArt(slave);
									jQuery("#introResult").empty().append(
										`${He} squeals in protest as you inject ${his} breasts with their first dosage of A-HGH, though ${he} changes ${his} tune by the end of the week once ${he} realizes ${his} breasts are bigger than before. ${He}'s <span class="hotpink">deliriously happy</span> that ${his} chest is swelling and <span class="mediumaquamarine">hopes</span> you'll make them even larger.`
									);
								}
							)
						);
					} else {
						linkArray.push(
							App.UI.DOM.makeElement("span", `${His} breasts are already so huge that basic growth drugs will not have a noticeable enough effect to sate ${his} curiosity.`)
						);
					}
				}
				if (slave.boobs >= 1000 && V.arcologies[0].FSTransformationFetishistResearch === 1) {
					linkArray.push(optionWithNote(
						App.UI.DOM.link(
							`Implant a heaving pair of 4000cc fillable implants in ${his} chest`,
							() => {
								slave.devotion += 25;
								slave.trust += 20;
								slave.boobs += 4000;
								slave.boobsImplant += 4000;
								slave.boobsImplantType = "advanced fillable";
								cashX(forceNeg(V.surgeryCost), "slaveSurgery", slave);
								surgeryDamage(slave, 10);
								if (slave.boobsImplant / slave.boobs >= 0.90) {
									slave.boobShape = "spherical";
									slave.nipples = "flat";
								} else {
									slave.boobShape = "normal";
								}
								App.Events.refreshEventArt(slave);
								const r = [];
								r.push(`You escort ${him} to the remote surgery, strap ${him} in, and put ${him} under. When ${he} awakes, ${he} can't`);
								if (hasAnyArms(slave)) {
									r.push(`keep ${his} ${hands} off`);
								} else {
									r.push(`stop shaking around`);
								}
								r.push(`${his} new ridiculous fake tits. ${He}'s <span class="hotpink">deliriously happy</span> that ${he} has ${his} own pair of giant breasts hanging from ${his} stretched chest and <span class="mediumaquamarine">hopes</span> you have plans to make them even bigger, even though ${he} is already struggling to keep upright. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
								jQuery("#introResult").empty().append(r.join(" "));
							}), `This option costs ${cashFormat(V.surgeryCost)}`
					));
					linkArray.push(optionWithNote(
						App.UI.DOM.link(
							`Implant a pair of engorged 7500cc string implants in ${his} chest`,
							() => {
								slave.devotion += 25;
								slave.trust += 25;
								slave.boobs += 7500;
								slave.boobsImplant += 7500;
								slave.boobsImplantType = "string";
								cashX(forceNeg(V.surgeryCost), "slaveSurgery", slave);
								surgeryDamage(slave, 10);
								if (slave.boobsImplant / slave.boobs >= 0.90) {
									slave.boobShape = "spherical";
									slave.nipples = "flat";
								} else {
									slave.boobShape = "normal";
								}
								App.Events.refreshEventArt(slave);
								const r = [];
								r.push(`You escort ${him} to the remote surgery, strap ${him} in, and put ${him} under. When ${he} awakes, ${he} can't`);
								if (hasAnyArms(slave)) {
									r.push(`keep ${his} ${hands} off`);
								} else {
									r.push(`stop shaking around`);
								}
								r.push(`${his} new ridiculous fake tits. ${He}'s <span class="hotpink">deliriously happy</span> that ${he} has ${his} own pair of monster breasts straining ${his} chest and <span class="mediumaquamarine">bounces cheerfully</span> when ${he}`);
								if (canHear(slave)) {
									r.push(`hears`);
								} else {
									r.push(`discovers`);
								}
								r.push(`they'll keep growing, despite ${his} near inability to stay upright. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
								jQuery("#introResult").empty().append(r.join(" "));
							}), `This option costs ${cashFormat(V.surgeryCost)}`
					));
				} else if (slave.boobs < 1000) {
					linkArray.push(optionWithNote(
						App.UI.DOM.link(
							`Implant a pair of 1000cc fillable implants in ${his} chest`,
							() => {
								slave.devotion += 15;
								slave.trust += 10;
								slave.boobs += 1000;
								slave.boobsImplant += 1000;
								slave.boobsImplantType = "fillable";
								cashX(forceNeg(V.surgeryCost), "slaveSurgery", slave);
								surgeryDamage(slave, 10);
								if (slave.boobsImplant / slave.boobs >= 0.90) {
									slave.boobShape = "spherical";
									slave.nipples = "flat";
								} else {
									slave.boobShape = "normal";
								}
								App.Events.refreshEventArt(slave);
								const r = [];
								r.push(`You escort ${him} to the remote surgery, strap ${him} in, and put ${him} under. When ${he} awakes, ${he} can't`);
								if (hasAnyArms(slave)) {
									r.push(`keep ${his} ${hands} off`);
								} else {
									r.push(`stop shaking around`);
								}
								r.push(`${his} new fake balloons. ${He}'s <span class="hotpink">deliriously happy</span> that ${he} has ${his} own pair of big breasts hanging from ${his} chest and <span class="mediumaquamarine">hopes</span> you have plans to make them even bigger. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
								jQuery("#introResult").empty().append(r.join(" "));
							}), `This option costs ${cashFormat(V.surgeryCost)}`
					));

					linkArray.push(optionWithNote(
						App.UI.DOM.link(
							`Implant a heavy pair of 1500cc string implants in ${his} chest`,
							() => {
								slave.devotion += 15;
								slave.trust += 15;
								slave.boobs += 1500;
								slave.boobsImplant += 1500;
								slave.boobsImplantType = "string";
								cashX(forceNeg(V.surgeryCost), "slaveSurgery", slave);
								surgeryDamage(slave, 10);
								if (slave.boobsImplant / slave.boobs >= 0.90) {
									slave.boobShape = "spherical";
									slave.nipples = "flat";
								} else {
									slave.boobShape = "normal";
								}
								App.Events.refreshEventArt(slave);
								const r = [];
								r.push(`You escort ${him} to the remote surgery, strap ${him} in, and put ${him} under. When ${he} awakes, ${he} can't`);
								if (hasAnyArms(slave)) {
									r.push(`keep ${his} ${hands} off`);
								} else {
									r.push(`stop shaking around`);
								}
								r.push(`${his} new fake balloons. ${He}'s <span class="hotpink">deliriously happy</span> that ${he} has ${his} own pair of big breasts hanging from ${his} chest and <span class="mediumaquamarine">bounces cheerfully</span> when ${he}`);
								if (canHear(slave)) {
									r.push(`hears`);
								} else {
									r.push(`discovers`);
								}
								r.push(`they'll keep growing. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
								jQuery("#introResult").empty().append(r.join(" "));
							}), `This option costs ${cashFormat(V.surgeryCost)}`
					));
				} else {
					r.push(
						App.UI.DOM.makeElement("span", `${His} breasts are already so large that basic implants will not have a noticeable enough effect to sate ${his} curiosity.`)
					);
				}
				p.append(App.UI.DOM.generateLinksStrip(linkArray));
				p.append(interestLine);
			}

			if (momInterest === "belly" || dadInterest === "belly") {
				interestLine = document.createElement("div");
				linkArray = [];
				r = [];
				r.push(`You noticed ${his} interest in ${his}`);
				if (momInterest === "belly" && dadInterest === "belly") {
					r.push(`parents'`);
				} else if (momInterest === "belly") {
					r.push(`mother's`);
				} else {
					r.push(`father's`);
				}
				r.push(`rounded middle when ${he} was around them.`);
				interestLine.append(r.join(" "));
				if (isItemAccessible.entry("a huge empathy belly", "bellyAccessory")) {
					linkArray.push(
						App.UI.DOM.link(
							`Give ${him} a big fake belly to wear`,
							() => {
								slave.devotion += 15;
								slave.trust += 15;
								slave.bellyAccessory = "a huge empathy belly";
								App.Events.refreshEventArt(slave);
								const r = [];
								r.push(`You tell ${him} to cover ${his} eyes and wait while you go fetch something for ${him}. Lugging back the biggest empathy belly you had available, you slip it onto ${him}, eliciting a grunt of discomfort. You order ${him} to open ${his} eyes and look ${himself} over. ${He}'s <span class="hotpink">deliriously happy</span> at ${his} huge belly and <span class="mediumaquamarine">bounces cheerfully</span> when ${he}`);
								if (canHear(slave)) {
									r.push(`hears`);
								} else {
									r.push(`discovers`);
								}
								r.push(`${he} can keep it. ${He} spends the rest of the day bumping into things and struggling to adjust to the huge weight hanging off ${his} front.`);
								jQuery("#introResult").empty().append(r.join(" "));
							}
						)
					);
				}
				if (V.arcologies[0].FSTransformationFetishistResearch === 1) {
					linkArray.push(optionWithNote(
						App.UI.DOM.link(
							`Put ${him} into a medical coma and implant a 200000cc belly implant in ${his} abdomen`,
							() => {
								slave.devotion += 25;
								slave.trust += 25;
								slave.bellyImplant = 200000;
								cashX(forceNeg(V.surgeryCost), "slaveSurgery", slave);
								surgeryDamage(slave, 50);
								SetBellySize(slave);
								App.Events.refreshEventArt(slave);
								const r = [];
								r.push(`You escort ${him} to the remote surgery, strap ${him} in, and put ${him} under. When ${he} awakes from ${his} induced coma, ${he} nearly faints at the`);
								if (canSee(slave)) {
									r.push(`sight`);
								} else {
									r.push(`feeling`);
								}
								r.push(`of ${his} immense middle. ${He}'s <span class="hotpink">deliriously happy</span> at ${his} hugeness and <span class="mediumaquamarine">squirms happily</span> when ${he}`);
								if (canHear(slave)) {
									r.push(`hears`);
								} else {
									r.push(`discovers`);
								}
								r.push(`you can make it bigger, despite the fact that it is nearly as large as ${he} is and pins ${him} to the bed ${he} lies upon. As it was an invasive surgery, <span class="health dec">${his} health has been greatly affected.</span>`);
								jQuery("#introResult").empty().append(r.join(" "));
							}), `This option costs ${cashFormat(V.surgeryCost)}`
					));
				}
				linkArray.push(optionWithNote(
					App.UI.DOM.link(
						`Implant a 2000cc belly implant in ${his} abdomen`,
						() => {
							slave.devotion += 15;
							slave.trust += 15;
							slave.bellyImplant = 2000;
							cashX(forceNeg(V.surgeryCost), "slaveSurgery", slave);
							surgeryDamage(slave, 10);
							SetBellySize(slave);
							App.Events.refreshEventArt(slave);
							const r = [];
							r.push(`You escort ${him} to the remote surgery, strap ${him} in, and put ${him} under. When ${he} awakes, ${he} can't`);
							if (hasAnyArms(slave)) {
								r.push(`keep ${his} ${hands} off`);
							} else {
								r.push(`stop shaking around`);
							}
							r.push(`${his} new bulbous middle. ${He}'s <span class="hotpink">deliriously happy</span> that ${he} has ${his} own round belly and <span class="mediumaquamarine">bounces cheerfully</span> when ${he}`);
							if (canHear(slave)) {
								r.push(`hears`);
							} else {
								r.push(`discovers`);
							}
							r.push(`you can make it bigger. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
							jQuery("#introResult").empty().append(r.join(" "));
						}), `This option costs ${cashFormat(V.surgeryCost)}`
				));
				p.append(interestLine);
				p.append(App.UI.DOM.generateLinksStrip(linkArray));
			}

			if ((slave.geneMods.NCS === 0) && ((momInterest === "dick") || (dadInterest === "dick"))) {
				interestLine = document.createElement("div");
				linkArray = [];
				r = [];
				r.push(`You noticed ${his} interest in ${his}`);
				if (momInterest === "dick" && dadInterest === "dick") {
					r.push(`parents'`);
				} else if (momInterest === "dick") {
					r.push(`mother's`);
				} else {
					r.push(`father's`);
				}
				r.push(`enormous cock while ${he} was around them.`);
				interestLine.append(r.join(" "));
				if (slave.dick < 1) {
					App.UI.DOM.makeElement("span", `${He} has no dick of ${his} own, so there is little you can do to satisfy ${his} curiosity.`);
				} else if (slave.dick >= 10 && V.arcologies[0].FSAssetExpansionistResearch === 1) {
					linkArray.push(
						App.UI.DOM.link(
							`Start ${him} on a regimen of hyper penis growth drugs`,
							() => {
								slave.devotion += 25;
								slave.trust += 20;
								slave.dick += 3;
								slave.drugs = "hyper penis enhancement";
								App.Events.refreshEventArt(slave);
								const r = [];
								r.push(`${He} squeals in protest as you inject ${his} penis with its first dosage of HA-HGH, though ${he} changes ${his} tune by the end of the day once ${he} realizes ${his} dick feels heavier. By the end of the week, ${he}'s <span class="hotpink">deliriously happy</span> over ${his} meaty cock and <span class="mediumaquamarine">hopes</span> you'll let it grow even larger.`);
								jQuery("#introResult").empty().append(r.join(" "));
							}
						)
					);
				} else if (slave.dick < 10) {
					linkArray.push(
						App.UI.DOM.link(
							`Start ${him} on a regimen of penis growth drugs`,
							() => {
								slave.devotion += 15;
								slave.trust += 10;
								slave.dick += 1;
								slave.drugs = "penis enhancement";
								App.Events.refreshEventArt(slave);
								const r = [];
								r.push(`${He} squeals in protest as you inject ${his} cock with its first dosage of A-HGH, though ${he} changes ${his} tune by the end of the week once ${he} realizes ${his} dick feels heavier than before. ${He}'s <span class="hotpink">deliriously happy</span> that ${his} penis is steadily growing and <span class="mediumaquamarine">hopes</span> you'll make it even larger.`);
								jQuery("#introResult").empty().append(r.join(" "));
							}
						)
					);
				} else {
					r.push(
						App.UI.DOM.makeElement("span", `${His} dick is already so huge that basic growth drugs will not have a noticeable enough effect to sate ${his} curiosity.`)
					);
				}
				p.append(interestLine);
				p.append(App.UI.DOM.generateLinksStrip(linkArray));
			}

			if ((slave.geneMods.NCS === 0) && ((momInterest === "balls") || (dadInterest === "balls"))) {
				interestLine = document.createElement("div");
				linkArray = [];
				r = [];
				r.push(`You noticed ${his} interest in ${his}`);
				if (momInterest === "balls" && dadInterest === "balls") {
					r.push(`parents'`);
				} else if (momInterest === "balls") {
					r.push(`mother's`);
				} else {
					r.push(`father's`);
				}
				r.push(`pendulous testicles while ${he} was around them.`);
				interestLine.append(r.join(" "));
				if (slave.balls < 1) {
					App.UI.DOM.makeElement("span", `${He} has no balls of ${his} own, so there is little you can do to satisfy ${his} curiosity.`);
				} else if (slave.balls >= 6 && V.arcologies[0].FSAssetExpansionistResearch === 1) {
					linkArray.push(
						App.UI.DOM.link(
							`Start ${him} on a regimen of hyper testicle growth drugs`,
							() => {
								slave.devotion += 25;
								slave.trust += 20;
								slave.balls += 10;
								slave.drugs = "hyper testicle enhancement";
								App.Events.refreshEventArt(slave);
								const r = [];
								r.push(`${He} squeals in protest as you inject ${his} testicles with their first dosage of HA-HGH, though ${he} changes ${his} tune by the end of the day once ${he} realizes ${his} nuts feel heavier. By the end of the week, ${he}'s <span class="hotpink">deliriously happy</span> over ${his} swollen balls and <span class="mediumaquamarine">hopes</span> you'll let them grow even larger.`);
								jQuery("#introResult").empty().append(r.join(" "));
							}
						)
					);
				} else if (slave.balls < 6) {
					linkArray.push(
						App.UI.DOM.link(
							`Start ${him} on a regimen of testicle growth drugs`,
							() => {
								slave.devotion += 15;
								slave.trust += 10;
								slave.balls += 1;
								slave.drugs = "testicle enhancement";
								App.Events.refreshEventArt(slave);
								const r = [];
								r.push(`${He} squeals in protest as you inject ${his} testicles with their first dosage of A-HGH, though ${he} changes ${his} tune by the end of the week once ${he} realizes ${his} nuts feel heavier and fuller than before. ${He}'s <span class="hotpink">deliriously happy</span> that ${his} balls are steadily swelling and <span class="mediumaquamarine">hopes</span> you'll make them even larger.`);
								jQuery("#introResult").empty().append(r.join(" "));
							}
						)
					);
				} else {
					r.push(
						App.UI.DOM.makeElement("span", `${His} balls are already so huge that basic growth drugs will not have a noticeable enough effect to sate ${his} curiosity.`)
					);
				}
				p.append(interestLine);
				p.append(App.UI.DOM.generateLinksStrip(linkArray));
			}

			if ((momInterest === "hips") || (dadInterest === "hips")) {
				interestLine = document.createElement("div");
				linkArray = [];
				r = [];
				r.push(`You noticed ${his} interest in ${his}`);
				if (momInterest === "hips" && dadInterest === "hips") {
					r.push(`parents'`);
				} else if (momInterest === "hips") {
					r.push(`mother's`);
				} else {
					r.push(`father's`);
				}
				r.push(`door jamming hips while ${he} was around them.`);
				interestLine.append(r.join(" "));
				if (slave.hips === 2 && V.surgeryUpgrade === 1) {
					linkArray.push(optionWithNote(
						App.UI.DOM.link(
							`Surgically widen ${his} hips`,
							() => {
								slave.devotion += 15;
								slave.trust += 15;
								slave.hips += 1;
								slave.hipsImplant = 1;
								cashX(forceNeg(V.surgeryCost), "slaveSurgery", slave);
								surgeryDamage(slave, 40);
								App.Events.refreshEventArt(slave);
								const r = [];
								r.push(`You escort ${him} to the remote surgery, strap ${him} in, and put ${him} under. When ${he} awakes, ${he} can't`);
								if (hasAnyArms(slave)) {
									r.push(`keep ${his} ${hands} off`);
								} else {
									r.push(`stop shaking around`);
								}
								r.push(`${his} wide hips, especially since ${he} can't figure out how to roll over with them. ${He}'s <span class="hotpink">deliriously happy</span> that ${he} is ridiculously wide and <span class="mediumaquamarine">wiggles ${his} door-jammers cheerfully</span> at you whenever ${he} gets the chance. Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span>`);
								jQuery("#introResult").empty().append(r.join(" "));
							}), `This option costs ${cashFormat(V.surgeryCost)}`
					));
				} else if (slave.hips < 2) {
					linkArray.push(optionWithNote(
						App.UI.DOM.link(
							`Surgically widen ${his} hips`,
							() => {
								slave.devotion += 15;
								slave.trust += 15;
								slave.hips += 1;
								slave.hipsImplant = 1;
								cashX(forceNeg(V.surgeryCost), "slaveSurgery", slave);
								surgeryDamage(slave, 40);
								App.Events.refreshEventArt(slave);
								const r = [];
								r.push(`You escort ${him} to the remote surgery, strap ${him} in, and put ${him} under. When ${he} awakes, ${he} can't`);
								if (hasAnyArms(slave)) {
									r.push(`keep ${his} ${hands} off`);
								} else {
									r.push(`stop shaking around`);
								}
								r.push(`${his} wide hips. ${He}'s <span class="hotpink">deliriously happy</span> that ${he} is wider than ever and <span class="mediumaquamarine">wiggles ${his} hips cheerfully</span> at you whenever ${he} gets the chance. Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span>`);
								jQuery("#introResult").empty().append(r.join(" "));
							}), `This option costs ${cashFormat(V.surgeryCost)}`
					));
				} else {
					r.push(
						App.UI.DOM.makeElement("span", `Your surgery suite is not outfitted to widen ${his} hips further.`)
					);
				}
				p.append(interestLine);
				p.append(App.UI.DOM.generateLinksStrip(linkArray));
			}

			if ((momInterest === "butt") || (dadInterest === "butt")) {
				interestLine = document.createElement("div");
				linkArray = [];
				r = [];
				r.push(`You noticed ${his} interest in ${his}`);
				if (momInterest === "butt" && dadInterest === "butt") {
					r.push(`parents'`);
				} else if (momInterest === "butt") {
					r.push(`mother's`);
				} else {
					r.push(`father's`);
				}
				r.push(`ever-jiggling ass while ${he} was around them.`);
				interestLine.append(r.join(" "));
				if (slave.geneMods.NCS === 0) {
					if (slave.butt >= 10 && V.arcologies[0].FSAssetExpansionistResearch === 1) {
						linkArray.push(
							App.UI.DOM.link(
								`Start ${him} on a regimen of hyper ass growth drugs`,
								() => {
									slave.devotion += 25;
									slave.trust += 20;
									slave.butt += 3;
									slave.drugs = "hyper butt injections";
									App.Events.refreshEventArt(slave);
									const r = [];
									r.push(`${He} squeals in protest as you inject ${his} buttcheeks with their first dosage of HA-HGH, though ${he} changes ${his} tune by the end of the day once ${he} realizes ${his} butt is larger than ever. By the end of the week, ${he}'s <span class="hotpink">deliriously happy</span> over ${his} swollen rear and <span class="mediumaquamarine">hopes</span> you'll let it grow even larger.`);
									jQuery("#introResult").empty().append(r.join(" "));
								},
							)
						);
					} else if (slave.butt < 10) {
						linkArray.push(
							App.UI.DOM.link(
								`Start ${him} on a regimen of ass growth drugs`,
								() => {
									slave.devotion += 15;
									slave.trust += 10;
									slave.butt += 1;
									slave.drugs = "butt injections";
									App.Events.refreshEventArt(slave);
									const r = [];
									r.push(`${He} squeals in protest as you inject ${his} buttcheeks with their first dosage of A-HGH, though ${he} changes ${his} tune by the end of the week once ${he} realizes ${his} butt is bigger than before. ${He}'s <span class="hotpink">deliriously happy</span> that ${his} rear is swelling and <span class="mediumaquamarine">hopes</span> you'll make it even larger.`);
									jQuery("#introResult").empty().append(r.join(" "));
								},
							)
						);
					} else {
						r.push(
							App.UI.DOM.makeElement("span", `${His} butt is already so huge that basic growth drugs will not have a noticeable enough effect to sate ${his} curiosity.`)
						);
					}
				}
				if (slave.butt >= 6 && V.arcologies[0].FSTransformationFetishistResearch === 1) {
					linkArray.push(optionWithNote(
						App.UI.DOM.link(
							`Implant a heaving pair of fillable implants in ${his} rear`,
							() => {
								slave.devotion += 25;
								slave.trust += 20;
								slave.butt += 8;
								slave.buttImplant += 8;
								slave.buttImplantType = "advanced fillable";
								cashX(forceNeg(V.surgeryCost), "slaveSurgery", slave);
								surgeryDamage(slave, 10);
								App.Events.refreshEventArt(slave);
								const r = [];
								r.push(`You escort ${him} to the remote surgery, strap ${him} in, and put ${him} under. When ${he} awakes, ${he} can't`);
								if (hasAnyArms(slave)) {
									r.push(`keep ${his} ${hands} off`);
								} else {
									r.push(`stop shaking around`);
								}
								r.push(`${his} new ridiculous fake ass, not that ${he} has much choice, since it has ${him} pinned to the bed. ${He}'s <span class="hotpink">deliriously happy</span> that ${he} has ${his} own pair of giant butt cheeks ballooning from ${his} bottom and <span class="mediumaquamarine">hopes</span> you have plans to make them even bigger, even though ${he} is already struggling to escape from under them. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
								jQuery("#introResult").empty().append(r.join(" "));
							}), `This option costs ${cashFormat(V.surgeryCost)}`
					));
				} else if (slave.butt < 6) {
					linkArray.push(optionWithNote(
						App.UI.DOM.link(
							`Implant a pair of fillable implants in ${his} rear`,
							() => {
								slave.devotion += 15;
								slave.trust += 10;
								slave.butt += 2;
								slave.buttImplant += 2;
								slave.buttImplantType = "fillable";
								cashX(forceNeg(V.surgeryCost), "slaveSurgery", slave);
								surgeryDamage(slave, 10);
								App.Events.refreshEventArt(slave);
								const r = [];
								r.push(`You escort ${him} to the remote surgery, strap ${him} in, and put ${him} under. When ${he} awakes, ${he} can't`);
								if (hasAnyArms(slave)) {
									r.push(`keep ${his} ${hands} off`);
								} else {
									r.push(`stop shaking around`);
								}
								r.push(`${his} new fake bottom. ${He}'s <span class="hotpink">deliriously happy</span> that ${he} has ${his} own pair of big butt cheeks hanging from ${his} rear and <span class="mediumaquamarine">hopes</span> you have plans to make them even bigger. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
								jQuery("#introResult").empty().append(r.join(" "));
							}), `This option costs ${cashFormat(V.surgeryCost)}`
					));
					linkArray.push(optionWithNote(
						App.UI.DOM.link(
							`Implant a heavy pair of string implants in ${his} rear`,
							() => {
								slave.devotion += 15;
								slave.trust += 15;
								slave.butt += 3;
								slave.buttImplant += 3;
								slave.buttImplantType = "string";
								cashX(forceNeg(V.surgeryCost), "slaveSurgery", slave);
								surgeryDamage(slave, 10);
								App.Events.refreshEventArt(slave);
								const r = [];
								r.push(`You escort ${him} to the remote surgery, strap ${him} in, and put ${him} under. When ${he} awakes, ${he} can't`);
								if (hasAnyArms(slave)) {
									r.push(`keep ${his} ${hands} off`);
								} else {
									r.push(`stop shaking around`);
								}
								r.push(`${his} new fake bottom. ${He}'s <span class="hotpink">deliriously happy</span> that ${he} has ${his} own pair of big butt cheeks hanging from ${his} rear and <span class="mediumaquamarine">bounces them cheerfully</span> when ${he}`);
								if (canHear(slave)) {
									r.push(`hears`);
								} else {
									r.push(`discovers`);
								}
								r.push(`they'll keep growing. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
								jQuery("#introResult").empty().append(r.join(" "));
							}),  `This option costs ${cashFormat(V.surgeryCost)}`
					));
				} else {
					r.push(
						App.UI.DOM.makeElement("span", `${His} butt is already so large that basic implants will not have a noticeable enough effect to sate ${his} curiosity.`)
					);
				}
				p.append(interestLine);
				p.append(App.UI.DOM.generateLinksStrip(linkArray));
			}
		}
		return p;
	}

	/**
	 * @param {HTMLAnchorElement} link
	 * @param {string} note
	 */
	function optionWithNote(link, note) {
		const f = new DocumentFragment();
		f.append(link, " ");
		App.Events.addNode(f, [note], "span", "note");
		return f;
	}
};
