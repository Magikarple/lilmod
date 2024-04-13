App.Events.SEPlayerBirth = class SEPlayerBirth extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.PC.labor === 1
		];
	}

	execute(node) {
		/** @type {boolean} */
		let playerDead;
		let PCDegree = 0;
		let pregTypeDecrement = WombReserveCount(V.PC, "incubator");
		let pregTypeDecrementNursery = WombReserveCount(V.PC, "incubator");
		let concubinePresent;
		let seed;

		let identicalChildGen; // TODO: remove me

		/* expand me with new variables to behave like slave birth */
		let badBirth;
		if (V.PC.counter.birthsTotal === 0) {
			badBirth = 30 + (V.PC.pregType * 4);
		} else {
			badBirth = 10;
		}
		let wounded = 0;
		const birthed = WombBirth(V.PC, 35);
		/** @type {number} count of live babies after birth */
		let curBabies = birthed.length;
		/** @type {number} currently not used - it's just for future improvements. */
		let stillBirth = V.PC.womb.length;


		let gender;
		if (curBabies === 1) {
			if (birthed[0].genetics.gender === "XX") {
				gender = "XX";
			} else {
				gender = "XY";
			}
		}

		/* Difference in code below:
		 * curBabies - count of live babies after birth
		 * V.PC.pregType = all babies in PC.
		 * I assume that dead fetuses do not count to reputation, etc., and PC manages to hide them. This mainly for future possibilities, or early birth triggers.
		 * PC will not support partial birth - even if she happens to be pregnant at different stages at once, undeveloped babies will be dead as result.
		 * stillBirth currently not used - it's just for future improvements. */
		V.PC.preg = 0;
		V.PC.pregKnown = 0;
		V.PC.labor = 0;
		V.PC.counter.birthsTotal += curBabies;

		/* setting the tallies for each type of child born */
		let others = 0;
		let self = 0;
		let citizens = 0;
		let oldMaster = 0;
		let arcOwner = 0;
		let clients = 0;
		let elite = 0;
		let lab = 0;
		let futaS = 0;
		let rapists = 0;
		let slavesLength = 0;
		let babies = [];
		for (const baby of birthed) {
			if (baby.fatherID === 0) {
				others++;
				babies.push("some guy");
			} else if (baby.fatherID === -1) {
				self++;
				babies.push("your own");
			} else if (baby.fatherID === -2) {
				citizens++;
				babies.push("an arcology citizen");
			} else if (baby.fatherID === -3) {
				oldMaster++;
				babies.push("your Master");
			} else if (baby.fatherID === -4) {
				arcOwner++;
				babies.push("another arcology owner");
			} else if (baby.fatherID === -5) {
				clients++;
				babies.push("your client");
			} else if (baby.fatherID === -6) {
				elite++;
				babies.push("the Societal Elite");
			} else if (baby.fatherID === -7) {
				lab++;
				babies.push("designer");
			} else if (baby.fatherID === -9) {
				futaS++;
				babies.push("a Futanari Sister");
			} else if (baby.fatherID === -10) {
				rapists++;
				babies.push("a rapist");
			} else {
				const babyDaddy = getSlave(baby.fatherID);
				if (babyDaddy) {
					slavesLength++;
					babies.push(String(babyDaddy.slaveName));
					actX(babyDaddy, "PCChildrenFathered");
				} else {
					others++;
					babies.push("some guy");
				}
			}
		}
		const babiesReduced = removeDuplicates(babies);

		let r = new SpacedTextAccumulator(node);

		if ((elite > 0 || self > 0) && FutureSocieties.isActive('FSRestart')) { /* for simplicity's sake, not going to allow other embryos to be added during an elite pregnancy */
			r.push(`Since you are heavily pregnant with`);
			if (elite + self >= 2) {
				r.push(`children`);
			} else {
				r.push(`a child`);
			}
			r.push(`of the Societal Elite, you are quickly taken to the finest clinic the arcology has to offer. After a quick sedation, you awake to find your belly no longer round with child; that, and a note stating your next breeding partner and a notice that ${cashFormat(50000)} has been added to your account. The Societal Elite are <span class="green">very pleased</span> at their new addition to the ranks. You just wish you could have seen your`);
			if (curBabies === 1) {
				r.push(`little`);
				if (gender === "XX") {
					r.push(`girl`);
				} else {
					r.push(`boy`);
				}
				r.push(`before they took`);
				if (gender === "XX") {
					r.push(`her`);
				} else {
					r.push(`him`);
				}
			} else {
				r.push(`babies before they took them`);
			}
			r.push(`away to be raised into`);
			if (curBabies > 1) {
				r.push(`proper members`);
			} else {
				r.push(`a proper member`);
			}
			r.push(`of the future world.`);
			V.PC.counter.birthElite += elite;
			if (V.PC.ovaryAge >= 47 && V.playerAging === 2) {
				r.push(`You are getting too old to have children; you feel like`);
				if (curBabies > 1) {
					r.push(`they`);
				} else {
					r.push(`this`);
				}
				r.push(`may be your last.`);
				V.PC.preg = -2;
			}
			r.toParagraph();
		} else {
			r.push(`While sitting at your desk planning your day, <span class="lime">your water breaks,</span> thoroughly soaking your crotch and the slave servicing it. You`);
			if (V.PC.belly >= 60000) {
				r.push(`struggle to`);
			}
			r.push(`pull your laboring body to its feet, notify ${V.assistant.name} that it's time, and begin heading towards`);
			if (V.masterSuite !== 0 && V.masterSuiteUpgradePregnancy === 1) {
				r.push(`${V.masterSuiteName}, since you had it redesigned to accommodate pregnant slaves. You should be able to give birth in both luxury and privacy there.`);
			} else if (V.clinic !== 0) {
				r.push(`${V.clinicName}; everything you'll need to give birth can be found there. Although you don't know how much privacy you'll be able to get there.`);
			} else if (V.masterSuite !== 0) {
				r.push(`${V.masterSuiteName}, since you'd like to be as comfortable as possible for the upcoming birth. You should be able to give birth in relative privacy there.`);
			} else {
				r.push(`your bed, since you'd like to be as comfortable as possible for the upcoming birth. You should be able to give birth in complete privacy there.`);
			}
			r.toParagraph();
			const {
				His2, He2,
				his2, he2, him2
			} = getPronouns(S.Concubine ? S.Concubine : {pronoun: App.Data.Pronouns.Kind.plural}).appendSuffix("2");
			if (V.PC.belly < 100000) {
				if (S.Concubine) {
					concubinePresent = 1;
				}
				r.push(`After what feels like a`);
				if (V.showInches === 2) {
					r.push(`mile`);
				} else {
					r.push(`kilometer`);
				}
				r.push(`run, you finally waddle into your destination finding`);
				if (S.Nurse) {
					const {he} = getPronouns(S.Nurse);
					r.push(`<span class="pink">${S.Nurse.slaveName}</span> waiting for you with everything ${he} needs to be a capable midwife to you.`);
					if (concubinePresent === 1) {
						r.push(`<span class="pink">${S.Concubine.slaveName}</span>`);
						if (hasAnyArms(S.Concubine)) {
							r.push(`wraps ${his2} ${hasBothArms(S.Concubine) ? "arms" : "arm"} around`);
						} else {
							r.push(`leans into`);
						}
						r.push(`you from behind, letting you know ${he2}'ll be here to comfort you while you labor.`);
					}
				} else if (V.BodyguardID !== 0) {
					const {he, his} = getPronouns(S.Bodyguard);
					r.push(`<span class="pink">${S.Bodyguard.slaveName}</span> waiting for you. Ever since ${he} realized ${he} was protecting for`);
					if (V.PC.pregType > 1) {
						r.push(`many,`);
					} else {
						r.push(`two,`);
					}
					r.push(`${he} made sure to hone ${his} skills as a midwife to make sure ${he} could protect you and your unborn ${onlyPlural(V.PC.pregType, 'child', 'children')} from any dangers.`);
					if (concubinePresent === 1) {
						r.push(`<span class="pink">${S.Concubine.slaveName}</span>`);
						if (hasAnyArms(S.Concubine)) {
							r.push(`wraps ${his2} ${hasBothArms(S.Concubine) ? "arms" : "arm"} around`);
						} else {
							r.push(`leans into`);
						}
						r.push(`you from behind, letting you know ${he2}'ll be here to comfort you while you labor.`);
					}
				} else if (V.HeadGirlID !== 0) {
					const {He, he} = getPronouns(S.HeadGirl);
					r.push(`<span class="pink">${S.HeadGirl.slaveName}</span> is waiting for you. ${He} promises to do everything ${he} can to help you.`);
					if (concubinePresent === 1) {
						r.push(`<span class="pink">${S.Concubine.slaveName}</span>`);
						if (hasAnyArms(S.Concubine)) {
							r.push(`wraps ${his2} ${hasBothArms(S.Concubine) ? "arms" : "arm"} around`);
						} else {
							r.push(`leans into`);
						}
						r.push(`you from behind, letting you know ${he2}'ll be here to comfort you while you labor.`);
					}
				} else if (concubinePresent === 1) {
					r.push(`<span class="pink">${S.Concubine.slaveName}</span> is waiting for you. ${He2} believes, if anything, that ${he2} could at least comfort you while you give birth.`);
				} else {
					r.push(`it quite empty. At least ${V.assistant.name} knows where you are should anything go wrong.`);
				}
			} else {
				if (S.Concubine) {
					if (!canWalk(S.Concubine)) {
						concubinePresent = 2;
					} else {
						concubinePresent = 1;
					}
				}
				r.push(`You barely make it half-way down the hall before you feel the first of your many children drop into position at the entrance to your birth canal. You try to keep going, but as it forces its way through your pelvis, spreading it wider, you're forced to the ground. Fortunately the penthouse is littered with supply rooms and closets, so you drag your laboring body into the nearest one instead. Fortunately, ${V.assistant.name} discretely directs`);
				if (S.Nurse) {
					const {he, him} = getPronouns(S.Nurse);
					r.push(`<span class="pink">${S.Nurse.slaveName}</span> to you with everything ${he}'ll need to deliver your ${(V.PC.pregType > 1) ? "children" : "child"}.`);
					if (concubinePresent === 1) {
						r.push(`<span class="pink">${S.Concubine.slaveName}</span> bursts in after ${him} and circles around behind you before`);
						if (hasAnyArms(S.Concubine)) {
							r.push(`wrapping ${his2} ${hasAnyArms(S.Concubine) ? "arms" : "arm"} around`);
						} else {
							r.push(`nuzzling against`);
						}
						r.push(`your contraction wracked middle. ${He2}'ll be here to comfort you while you labor.`);
					}
				} else if (V.BodyguardID !== 0) {
					const {He, he, his, him} = getPronouns(S.Bodyguard);
					r.push(`<span class="pink">${S.Bodyguard.slaveName}</span> to your location. Ever since ${he} realized ${he} was protecting for not only you, but the lives you bear too, ${he} made sure to hone ${his} skills as a midwife to make sure ${he} could protect you and your unborn ${(V.PC.pregType > 1) ? "children" : "child"} from any dangers. ${He} apologizes profusely for not being there when you needed ${him} most; ${he} wanted to make sure everything was ready for your arrival.`);
					if (concubinePresent === 1) {
						r.push(`<span class="pink">${S.Concubine.slaveName}</span> bursts in after ${him} and circles around behind you before`);
						if (hasAnyArms(S.Concubine)) {
							r.push(`wrapping ${his2} ${hasAnyArms(S.Concubine) ? "arms" : "arm"} around`);
						} else {
							r.push(`nuzzling against`);
						}
						r.push(`your contraction wracked middle. ${He2}'ll be here to comfort you while you labor.`);
					}
				} else if (V.HeadGirlID !== 0) {
					const {He, he, him} = getPronouns(S.HeadGirl);
					r.push(`<span class="pink">${S.HeadGirl.slaveName}</span> to your location. ${He} promises to do everything ${he} can to help you.`);
					if (concubinePresent === 1) {
						r.push(`<span class="pink">${S.Concubine.slaveName}</span> bursts in after ${him} and circles around behind you before`);
						if (hasAnyArms(S.Concubine)) {
							r.push(`wrapping ${his2} ${hasAnyArms(S.Concubine) ? "arms" : "arm"} around`);
						} else {
							r.push(`nuzzling against`);
						}
						r.push(`your contraction wracked middle. ${He2}'ll be here to comfort you while you labor.`);
					}
				} else if (concubinePresent === 1) {
					r.push(`<span class="pink">${S.Concubine.slaveName}</span> to your location. ${He2} believes, if anything, that ${he2} could at least comfort you while you give birth.`);
				} else {
					r.push(`a camera on the room you crawled into. At least ${V.assistant.name} knows where you are should anything go wrong.`);
				}
			}
			r.toParagraph();
			r.push(`You arrange yourself to give birth, relaxing until your body urges you to begin bearing down and pushing your child into the world.`);
			if (concubinePresent === 1) {
				r.push(`${S.Concubine.slaveName} settles in beside you, one hand soothing your contraction wracked middle and the other`);
				if (V.PC.dick !== 0) {
					r.push(`stroking your hardening dick.`);
				} else {
					r.push(`teasing your stiffening clit.`);
				}
			}
			if (badBirth > random(1, 100)) { /* shits going wrong */
				if (S.Nurse) {
					const {he, his} = getPronouns(S.Nurse);
					r.push(`You keep pushing and pushing, but your child is not coming out.`);
					if (concubinePresent === 1) {
						r.push(`${S.Concubine.slaveName} shifts to massaging your gravid middle${canTalk(S.Concubine) ? ", while whispering words of encouragement into your ear" : ""} until ${S.Nurse.slaveName} shoos ${him2} away so ${he} can take over and get this baby out of you.`);
					}
					r.push(`${S.Nurse.slaveName} was prepared for this possibility, adjusts your position and timings, and before long is holding your <span class="lime">new baby`);
					if (gender === "XX") {
						r.push(`girl`);
					} else {
						r.push(`boy`);
					}
					r.push(`</span> in ${his} arms.`);
					if (V.PC.pregType >= 8) {
						r.push(`But you're far from done; your taut dome of a belly still houses another ${num(V.PC.pregType - 1)} infants. You moan as the next child begins its descent; you'll be at this for a while. If ${S.Nurse.slaveName} weren't here, you and your children would likely have perished.`);
					} else if (V.PC.pregType >= 4) {
						r.push(`But you aren't close to done; your taut dome of a belly still houses another ${num(V.PC.pregType - 1)} infants. You moan as the next child begins its descent; you'll be at this for a while. If ${S.Nurse.slaveName} weren't here, you and your children would likely have perished.`);
					} else if (V.PC.pregType === 3) {
						r.push(`But you aren't done; your swollen belly still houses another pair of infants. You moan as the next child begins its descent; if ${S.Nurse.slaveName} weren't here, you and your children would likely have perished.`);
					} else if (V.PC.pregType === 2) {
						r.push(`But you aren't done; your rounded belly still houses another infant. You moan as they begin their decent; if ${S.Nurse.slaveName} weren't here, you and your children would likely have perished.`);
					}
				} else if (V.BodyguardID !== 0) {
					const {he, his} = getPronouns(S.Bodyguard);
					r.push(`You keep pushing and pushing, but your child is not coming out.`);
					if (concubinePresent === 1) {
						r.push(`${S.Concubine.slaveName} shifts to massaging your gravid middle${canTalk(S.Concubine) ? ", while whispering words of encouragement into your ear" : ""}. ${He2} begins to worry as ${his2} lover weakens in front of ${him2}. ${S.Bodyguard.slaveName} quickly pulls ${him2} away from you, fearing the worst.`);
					}
					r.push(`${S.Bodyguard.slaveName} read about this possibility and tries everything ${he} can to coax your child out. As time passes, ${he} notices your consciousness begin to fade as exhaustion kicks in. Fearing for your lives, and desperate to save you, ${he} draws ${his} sword from its sheath, hands unsteady from what ${he} is about to do. Carefully, ${he} slits your lower abdomen, allowing your baby-`);
					if (V.PC.pregType < 3) {
						r.push(`filled`);
					} else if (V.PC.pregType < 5) {
						r.push(`stuffed`);
					} else if (V.PC.pregType < 8) {
						r.push(`packed`);
					} else {
						r.push(`bursting`);
					}
					r.push(`womb to pop out through the incision. Doing ${his} best, ${he} cuts open your uterus, pulls your ${onlyPlural(V.PC.pregType, 'child', 'children')}`);
					r.push(`from you and severs the umbilical cord${(V.PC.pregType > 1) ? "s all at once" : ""}.`);
					r.toParagraph();
					r.push(`You awake some time later in the remote surgery, your stomach extremely sore; you quickly realize you're no longer round with child. As you try to rise, ${S.Bodyguard.slaveName} stops you; ${he} hefts you into a bridal carry and takes you to a recovery room, before gently placing you into a warm bed, tucking you in, and hurrying out of the room. Before you can call out, ${he} returns carrying`);
					if (curBabies === 1) {
						r.push(`<span class="lime">your baby`);
						if (gender === "XX") {
							r.push(`girl`);
						} else {
							r.push(`boy`);
						}
						r.push(`</span>`);
					} else if (curBabies < 6) {
						r.push(`<span class="lime">your newborn ${pregNumberName(curBabies, 2)}</span>`);
					} else {
						r.push(`a big bassinet containing <span class="lime">your newborn ${pregNumberName(curBabies, 2)}</span>`);
					}
					r.push(`in ${his} arms.`);
					wounded = 1;
				} else if (V.HeadGirlID !== 0) {
					const {he, his, him} = getPronouns(S.HeadGirl);
					r.push(`You keep pushing and pushing, but your child is not coming out.`);
					if (concubinePresent === 1) {
						r.push(`${S.Concubine.slaveName} shifts to massaging your gravid middle${canTalk(S.Concubine) ? ", while whispering words of encouragement into your ear" : ""}. ${He2} begins to worry as ${his2} lover weakens in front of ${him2}. ${S.HeadGirl.slaveName} quickly pulls ${him2} to`);
						if (hasBothLegs(S.Concubine)) {
							r.push(`${his2} feet`);
						} else {
							r.push(`upright`);
						}
						r.push(`and orders ${him2} to help ${him} carry you to the remote`);
						if (!canWalk(S.Concubine)) {
							r.push(`surgery; in ${his} rush, ${he} completely forgot`);
							if (tooBigBreasts(S.Concubine)) {
								r.push(`${S.Concubine.slaveName}'s breasts have ${him2} pinned to the bed`);
							} else if (tooBigBelly(S.Concubine)) {
								r.push(`${S.Concubine.slaveName}'s pregnancy renders ${him2} immobile`);
							} else if (tooBigDick(S.Concubine)) {
								r.push(`${S.Concubine.slaveName} can't walk with a dick that big`);
							} else if (tooBigButt(S.Concubine)) {
								r.push(`${S.Concubine.slaveName}'s butt pins ${him2} to the bed`);
							} else if (tooBigBalls(S.Concubine)) {
								r.push(`${S.Concubine.slaveName}'s balls act as a giant anchor`);
							} else if (tooFatSlave(S.Concubine)) {
								r.push(`${S.Concubine.slaveName} is so fat, the bed is ${his2} home now`);
							} else {
								r.push(`${S.Concubine.slaveName} can't walk.`);
							}
						} else {
							r.push(`surgery.`);
						}
					} else {
						r.push(`${S.HeadGirl.slaveName} notices your distress and carries you to the remote surgery${(V.PC.pregType >= 8) ? ", a daunting task given your extreme gravidity" : ""}.`);
					}
					r.toParagraph();
					r.push(`You awake some time later in a recovery room${(concubinePresent > 0) ? `, ${S.Concubine.slaveName} beside you` : ""}, your stomach extremely sore; a quick glance at the prominent scar tells you everything you need to know. Seeing you're awake, ${S.HeadGirl.slaveName} catches your attention. In ${his} arms`);
					if (curBabies === 1) {
						r.push(`is <span class="lime">your baby`);
						if (gender === "XX") {
							r.push(`girl,</span>`);
						} else {
							r.push(`boy,</span>`);
						}
						if (S.HeadGirl.lactation > 0) {
							r.push(`happily nursing from ${his} breast,`);
						}
					} else {
						r.push(`are <span class="lime">your newborn ${pregNumberName(curBabies, 2)},</span>`);
						if (S.HeadGirl.lactation > 0) {
							r.push(`happily nursing from ${his} breasts,`);
						}
					}
					r.push(`alive and well.`);
					wounded = 1;
				} else if (concubinePresent === 1) {
					r.push(`You keep pushing and pushing, but your child is not coming out.`);
					if (canWalk(S.Concubine)) {
						r.push(`In a panic, ${S.Concubine.slaveName} carries you to the remote surgery.`);
					} else {
						r.push(`The last thing you remember as you fade is ${S.Concubine.slaveName}'s look of panic.`);
					}
					r.toParagraph();
					r.push(`You awake some time later in a recovery room, your stomach extremely sore; a quick glance at the prominent scar tells you everything you need to know. A content sigh comes from beside you; ${S.Concubine.slaveName} is snuggled next to you, snoozing with`);
					if (curBabies === 1) {
						r.push(`<span class="lime">your baby`);
						if (gender === "XX") {
							r.push(`girl`);
						} else {
							r.push(`boy`);
						}
						r.push(`</span> in ${his2} arms.`);
						if (S.Concubine.lactation > 0) {
							r.push(`Your child has managed to free one of ${S.Concubine.slaveName}'s breasts and is eagerly suckling from its milky nipple.`);
						}
					} else {
						r.push(`<span class="lime">your newborn ${pregNumberName(curBabies, 2)}</span> in ${his2} arms.`);
						if (S.Concubine.lactation > 0) {
							r.push(`Your children have managed to free ${S.Concubine.slaveName}'s breasts and are eagerly suckling from their milky nipples.`);
						}
					}
					if (!canWalk(S.Concubine)) {
						if (tooBigBreasts(S.Concubine)) {
							r.push(`You don't know how ${he2} managed to get you here when ${his2} breasts prevent ${him2} from walking${(V.PC.pregType >= 8) ? ", especially with how heavy your pregnancy was" : ""}, but you give the pair a gentle caress as thanks.`);
						} else if (tooBigBelly(S.Concubine)) {
							r.push(`You don't know how ${he2} managed to get you here when ${he2}'s so gravid ${he2} can't walk${(V.PC.pregType >= 8) ? ", especially with how heavy your pregnancy was" : ""}, but you give the taut dome a gentle caress as thanks.`);
						} else if (tooBigDick(S.Concubine)) {
							r.push(`You don't know how ${he2} managed to get you here when ${his2} dick prevents ${him2} from walking${(V.PC.pregType >= 8) ? ", especially with how heavy your pregnancy was" : ""}, but you give the serpent a gentle caress as thanks.`);
						} else if (tooBigButt(S.Concubine)) {
							r.push(`You don't know how ${he2} managed to get you here when ${his2} ass prevent ${him2} from walking${(V.PC.pregType >= 8) ? ", especially with how heavy your pregnancy was" : ""}, but you give the jiggling giant a gentle caress as thanks.`);
						} else if (tooBigBalls(S.Concubine)) {
							r.push(`You don't know how ${he2} managed to get you here when ${his2} balls prevent ${him2} from walking${(V.PC.pregType >= 8) ? ", especially with how heavy your pregnancy was" : ""}, but you give the pair a gentle caress as thanks. ${He2} returns the kindness with a shudder and a large wet spot forming over ${his2} crotch.`);
						} else if (tooFatSlave(S.Concubine)) {
							r.push(`You don't know how ${he2} managed to get you here when ${he2}'s so fat ${he2} can't walk${(V.PC.pregType >= 8) ? ", especially with how heavy your pregnancy was" : ""}, but you give ${his2} soft body a gentle caress as thanks.`);
						} else if (!hasAnyLegs(S.Concubine)) {
							r.push(`You don't know how ${he2} managed to get you here when ${he2} has no legs to walk on${(V.PC.pregType >= 8) ? ", especially with how heavy your pregnancy was" : ""}, but you give ${his2} stumps a gentle caress as thanks.`);
						} else {
							r.push(`You don't know how ${he2} managed to get you here, since ${he2} can't walk${(V.PC.pregType >= 8) ? ", especially with how heavy your pregnancy was" : ""}, but you're thankful either way.`);
						}
					}
					wounded = 1;
				} else {
					r.push(`You keep pushing and pushing, but your child is not coming out. <span class="red">Something is wrong,</span> but you keep persisting.`);
					playerDead = true;
					V.gameover = "birth complications";
					V.nextButton = "Have to keep trying!";
					V.nextLink = "Gameover";
					App.Utils.scheduleSidebarRefresh();
				}
			} else {
				if (S.Nurse) {
					r.push(`Under ${S.Nurse.slaveName}'s guidance, childbirth is a breeze for you.`);
					if (V.PC.pregType === 1) {
						if (concubinePresent === 1) {
							r.push(`Or it would have been, had ${S.Concubine.slaveName} not driven you to an intense orgasm right as your child entered the world.`);
							if (V.PC.balls >= 9) {
								r.push(`An orgasm that resulted in ${S.Concubine.slaveName}, ${S.Nurse.slaveName}, and your newborn getting sprayed with cum.`);
							}
						}
						r.push(`${S.Nurse.slaveName} cuts the cord, swaddles your child, and hands you <span class="lime">your new baby`);
						if (gender === "XX") {
							r.push(`girl.</span>`);
						} else {
							r.push(`boy.</span>`);
						}
					} else {
						if (concubinePresent === 1) {
							r.push(`Or it would have been, had ${S.Concubine.slaveName} not driven you to an intense orgasm right as your first child entered the world.`);
							if (V.PC.balls >= 9) {
								r.push(`An orgasm that resulted in ${S.Concubine.slaveName},${S.Nurse.slaveName}, and your newborn getting sprayed with cum.`);
							}
							r.push(`But it isn't over: before you've even had a chance to come down from your climax, the next infant slips into your birth`);
							if (V.PC.pregType >= 3) {
								r.push(`canal, followed closely by the`);
								if (V.PC.pregType === 3) {
									r.push(`last,`);
								} else {
									r.push(`next,`);
								}
							} else {
								r.push(`canal`);
							}
							r.push(`and immediately pushes you back over the edge. In minutes, after ${num(curBabies)} children and ${num(curBabies)} intense orgasms, you're barely conscious. ${S.Concubine.slaveName} slides in behind you to snuggle with you as you return to your senses.`);
						} else {
							r.push(`With one out, you realize`);
							if (V.PC.pregType >= 6) {
								r.push(`you still have ${num(V.PC.pregType - 1)} more to go.`);
							} else if (V.PC.pregType === 5) {
								r.push(`your taut dome of a belly still houses four more.`);
							} else if (V.PC.pregType === 4) {
								r.push(`your swollen belly still houses three more.`);
							} else if (V.PC.pregType === 3) {
								r.push(`your swollen belly still houses another pair.`);
							} else if (V.PC.pregType === 2) {
								r.push(`your rounded belly still houses another.`);
							}
							r.push(`You moan as`);
							if (V.PC.pregType >= 3) {
								r.push(`the next child begins its`);
							} else {
								r.push(`they begin their`);
							}
							r.push(`descent; you'll be at this for a while. With ${S.Nurse.slaveName} around, you aren't worried at all.`);
						}
						r.push(`${S.Nurse.slaveName} cuts the cords, swaddles your children, and hands you <span class="lime">your new ${pregNumberName(curBabies, 2)}.</span>`);
					}
				} else if (V.BodyguardID !== 0) {
					const {his} = getPronouns(S.Bodyguard);
					r.push(`With ${S.Bodyguard.slaveName} watching over you, you feel safe enough to let your guard down and focus on giving birth. Once you are relaxed, you feel your child begin to inch down your birth canal. Before long you've completed the job without any trouble.`);
					if (V.PC.pregType === 1) {
						if (concubinePresent === 1) {
							r.push(`Or it would have, had ${S.Concubine.slaveName} not driven you to an intense orgasm right as your child entered the world.`);
							if (V.PC.balls >= 9) {
								r.push(`An orgasm that resulted in ${S.Concubine.slaveName},${S.Bodyguard.slaveName}, and your newborn getting sprayed with cum.`);
							}
						}
						r.push(`${S.Bodyguard.slaveName} cuts the cord with ${his} blade, and hands you <span class="lime">your new baby`);
						if (gender === "XX") {
							r.push(`girl.</span>`);
						} else {
							r.push(`boy.</span>`);
						}
					} else {
						if (concubinePresent === 1) {
							r.push(`Or you would have, had ${S.Concubine.slaveName} not driven you to an intense orgasm right as your child entered the world.`);
							if (V.PC.balls >= 9) {
								r.push(`An orgasm that resulted in ${S.Concubine.slaveName}, ${S.Bodyguard.slaveName}, and your newborn getting sprayed with cum.`);
							}
							r.push(`But it isn't over; before you've even had a chance to come down from your climax, the next infant slips into your birth `);
							if (V.PC.pregType >= 3) {
								r.push(`canal, followed closely by the`);
								if (V.PC.pregType === 3) {
									r.push(`last,`);
								} else {
									r.push(`next,`);
								}
							} else {
								r.push(`canal`);
							}
							r.push(`and immediately pushes you back over the edge. In minutes, after ${num(curBabies)} children and ${num(curBabies)} intense orgasms, you're barely conscious, nearly panicking ${S.Bodyguard.slaveName}. ${S.Concubine.slaveName} slides in behind you to snuggle with you as you return to your senses.`);
						} else {
							r.push(`With one out, you realize`);
							if (V.PC.pregType >= 6) {
								r.push(`you still have ${num(V.PC.pregType - 1)} more to go.`);
							} else if (V.PC.pregType === 5) {
								r.push(`your taut dome of a belly still houses four more.`);
							} else if (V.PC.pregType === 4) {
								r.push(`your swollen belly still houses three more.`);
							} else if (V.PC.pregType === 3) {
								r.push(`your swollen belly still houses another pair.`);
							} else if (V.PC.pregType === 2) {
								r.push(`your rounded belly still houses another.`);
							}
							r.push(`You moan as`);
							if (V.PC.pregType >= 3) {
								r.push(`the next child begins its`);
							} else {
								r.push(`they begin their`);
							}
							r.push(`descent; you'll be at this for a while. With ${S.Bodyguard.slaveName} around, you feel completely safe.`);
						}
						r.push(`${S.Bodyguard.slaveName} cuts the cords with ${his} blade, and hands you <span class="lime">your new ${pregNumberName(curBabies, 2)}.</span>`);
					}
				} else if (V.HeadGirlID !== 0) {
					r.push(`With ${S.HeadGirl.slaveName} waiting with everything you need, childbirth goes by without a hitch.`);
					if (V.PC.pregType === 1) {
						if (concubinePresent === 1) {
							r.push(`Or it would have been, had ${S.Concubine.slaveName} not driven you to an intense orgasm right as your child entered the world.`);
							if (V.PC.balls >= 9) {
								r.push(`An orgasm that resulted in ${S.Concubine.slaveName},${S.HeadGirl.slaveName}, and your newborn getting sprayed with cum.`);
							}
						}
						r.push(`${S.HeadGirl.slaveName} cuts the cord, swaddles your child, and hands you <span class="lime">your new baby`);
						if (gender === "XX") {
							r.push(`girl.</span>`);
						} else {
							r.push(`boy.</span>`);
						}
					} else {
						if (concubinePresent === 1) {
							r.push(`Or it would have been, had ${S.Concubine.slaveName} not driven you to an intense orgasm right as your first child entered the world.`);
							if (V.PC.balls >= 9) {
								r.push(`An orgasm that resulted in ${S.Concubine.slaveName},${S.HeadGirl.slaveName}, and your newborn getting sprayed with cum.`);
							}
							r.push(`But it isn't over: before you've even had a chance to come down from your climax, the next infant slips into your birth`);
							if (V.PC.pregType >= 3) {
								r.push(`canal, followed closely by the`);
								if (V.PC.pregType === 3) {
									r.push(`last,`);
								} else {
									r.push(`next,`);
								}
							} else {
								r.push(`canal`);
							}
							r.push(`and immediately pushes you back over the edge. In minutes, after ${num(curBabies)} children and ${num(curBabies)} intense orgasms, you're barely conscious. ${S.Concubine.slaveName} slides in behind you to snuggle with you as you return to your senses.`);
						} else {
							r.push(`With one out, you realize`);
							if (V.PC.pregType >= 6) {
								r.push(`you still have ${num(V.PC.pregType - 1)} more to go.`);
							} else if (V.PC.pregType === 5) {
								r.push(`your taut dome of a belly still houses four more.`);
							} else if (V.PC.pregType === 4) {
								r.push(`your swollen belly still houses three more.`);
							} else if (V.PC.pregType === 3) {
								r.push(`your swollen belly still houses another pair.`);
							} else if (V.PC.pregType === 2) {
								r.push(`your rounded belly still houses another.`);
							}
							r.push(`You moan as`);
							if (V.PC.pregType >= 3) {
								r.push(`the next child begins its`);
							} else {
								r.push(`they begin their`);
							}
							r.push(`descent; you'll be at this for a while. With ${S.HeadGirl.slaveName} around, you know everything is under control.`);
						}
						r.push(`${S.HeadGirl.slaveName} cuts the cords, swaddles your children, and hands you <span class="lime">your new ${pregNumberName(curBabies, 2)}.</span>`);
					}
				} else if (concubinePresent === 1) {
					r.push(`${S.Concubine.slaveName} alternates between calming your nerves and driving your to orgasm. It works fairly well, as your child rapidly enters the world alongside a particularly powerful climax. You reach down and draw <span class="lime">your new baby`);
					if (gender === "XX") {
						r.push(`girl`);
					} else {
						r.push(`boy`);
					}
					r.push(`</span> into your arms, while ${S.Concubine.slaveName} shifts to eagerly "clean" your crotch with ${his2} tongue.`);
					if (V.PC.pregType > 1) {
						r.push(`${His2} over-stimulation of you quickly has ${him2} licking the crowning head of your second child. ${He2} diligently works you over until all of your children are born, making sure you are thoroughly exhausted; both from the birth and from ${his2} ministrations.`);
						if (canPenetrate(S.Concubine) && canImpreg(V.PC, S.Concubine)) {
							r.push(`${S.Concubine.slaveName}`);
							if (canSee(S.Concubine)) {
								r.push(`eyes`);
							} else {
								r.push(`faces`);
							}
							r.push(`your spread pussy hungrily as ${his2} erection bobs with anticipation. But you're too tired right now and ${he2} realizes it.`);
						}
						r.push(`${He2} helps gather your ${onlyPlural(V.PC.pregType, 'child', 'children')} to`);
						if (S.Concubine.lactation > 0) {
							r.push(`${his2} and`);
						}
						r.push(`your breasts with the hope that you'll reward ${him2} when you recover.`);
					}
				} else {
					r.push(`You keep pushing and pushing, your child slowly working its way from your body. With the last of your strength, you bear down, freeing your child from your body at last. Panting, you gather <span class="lime">your new baby`);
					if (gender === "XX") {
						r.push(`girl`);
					} else {
						r.push(`boy`);
					}
					r.push(`</span>`);
					if (V.PC.pregType > 1) {
						r.push(`as another contraction ushers your next child into your birth canal.`);
					} else {
						r.push(`and drift off into a much deserved rest.`);
					}
					if (V.PC.pregType >= 2) {
						r.push(`You struggle to pass the second `);
						if (V.PC.pregType >= 3) {
							r.push(`baby, knowing full well a third will quickly follow suit`);
							if (V.PC.pregType >= 4) {
								r.push(`and a fourth after that`);
							}
						} else {
							r.push(`baby.`);
						}
						if (V.PC.pregType >= 5) {
							r.push(`You dread the challenge that will be the fifth `);
							if (V.PC.pregType >= 6) {
								r.push(`one and worry for your health over the sixth`);
							} else {
								r.push(`one.`);
							}
						}
						if (V.PC.pregType >= 7) {
							r.push(`You are nearly delirious by the time`);
							if (V.PC.pregType >= 8) {
								r.push(`it comes to the final ${num(V.PC.pregType - 6)}; your efforts to push them out are falling flat. You're just too tired. With one final push, you feel the first crown then exit your ruined pussy; the second`);
								if (V.PC.pregType >= 9) {
									r.push(`and the rest follow`);
								} else {
									r.push(`follows`);
								}
								r.push(`closely, finally allowing you relief.`);
							} else {
								r.push(`they are all born; you still look pregnant. It dawns on you as your cervix stretches wide; you forgot one.`);
							}
						}
						r.push(`You are`);
						if (V.PC.pregType >= 6) {
							r.push(`thoroughly`);
						}
						r.push(`exhausted by the time you've pushed out your ${pregNumberName(curBabies, 2)},`);
						if (V.PC.pregType >= 8) {
							r.push(`unable to even`);
						} else {
							r.push(`barely able to`);
						}
						r.push(`gather them to your chest. Fortunately, ${V.assistant.name} calls several devoted slaves to your aid; you're helped to your bed and left to connect with your children.`);
					}
				}
			}

			r.toParagraph();
			if (!playerDead) {
				V.PC.counter.birthOther += others;
				V.PC.counter.birthSelf += self;
				V.PC.counter.birthCitizen += citizens;
				V.PC.counter.birthMaster += oldMaster;
				V.PC.counter.birthArcOwner += arcOwner;
				V.PC.counter.birthClient += clients;
				V.PC.counter.birthElite += elite;
				V.PC.counter.birthLab += lab;
				V.PC.counter.birthFutaSis += futaS;
				V.PC.counter.birthDegenerate += slavesLength;
				V.PC.counter.birthRape = (V.PC.counter.birthRape || 0) + rapists;
				V.PC.counter.birthFutaSis += futaS;

				if (curBabies === 1) {
					let p = 0;
					if (birthed[p].genetics.race === V.PC.origRace) {
						PCDegree++;
					}
					if (birthed[p].genetics.hColor === V.PC.hColor) {
						PCDegree++;
					}
					if (birthed[p].genetics.skin === V.PC.skin) {
						PCDegree++;
					}
					if (birthed[p].genetics.eyeColor === V.PC.eye.origColor) {
						PCDegree++;
					}

					r.push(`Your little`);
					if (gender === "XX") {
						r.push(`girl`);
					} else {
						r.push(`boy`);
					}
					if (V.PC.pregSource === -1) {
						r.push(`looks exactly like you, in fact, the resemblance seems uncanny. Since`);
						if (gender === "XX") {
							r.push(`she`);
						} else {
							r.push(`he`);
						}
						r.push(`has the exact same genetics as you,`);
						if (gender === "XX") {
							r.push(`she'll`);
						} else {
							r.push(`he'll`);
						}
						r.push(`likely look almost identical to you when`);
						if (gender === "XX") {
							r.push(`she's`);
						} else {
							r.push(`he's`);
						}
						r.push(`your age.`);
					} else if (PCDegree === 4) {
						r.push(`looks just like you;`);
						if (gender === "XX") {
							r.push(`she`);
						} else {
							r.push(`he`);
						}
						r.push(`will likely grow up to closely resemble yourself.`);
					} else if (birthed[p].genetics.eyeColor === V.PC.eye.origColor) {
						r.push(`has your lovely ${V.PC.eye.origColor} eyes.`);
					} else if (PCDegree > 0) {
						r.push(`looks a little like you, enough that`);
						if (gender === "XX") {
							r.push(`she'll`);
						} else {
							r.push(`he'll`);
						}
						r.push(`be recognizable as yours.`);
					} else {
						r.push(`looks nothing like you; it's hard to believe`);
						if (gender === "XX") {
							r.push(`she's your daughter`);
						} else {
							r.push(`he's you son`);
						}
					}

					if (birthed[0].reserve === "incubator") {
						r.push(`<span class="pink">You set`);
						if (gender === "XX") {
							r.push(`her`);
						} else {
							r.push(`him`);
						}
						r.push(`aside for incubation.</span>`);
						if (V.incubator.tanks.length < V.incubator.capacity) {
							if (birthed[0].noticeData.child !== undefined) {
								App.Facilities.Incubator.newChild(birthed[0].noticeData.child, birthed[0].tankSetting);
							} else {
								App.Facilities.Incubator.newChild(generateChild(V.PC, birthed[0], true), birthed[0].tankSetting);
							}
						}
					} else if (birthed[0].reserve === "nursery") {
						r.push(`<span class="pink">You set`);
						if (gender === "XX") {
							r.push(`her`);
						} else {
							r.push(`him`);
						}
						r.push(`aside for incubation.</span>`);
						if (V.cribs.length < V.nurseryCribs) {
							// TODO:@franklygeorge handling for birthed[0].noticeData.child. Long term we probably just want to convert InfantState into an extension of SlaveState, or maybe just convert it to SlaveState
							App.Facilities.Nursery.newChild(generateChild(V.PC, birthed[0]));
						}
					}
					birthed.shift();
				} else if (curBabies > 1) {
					let firstChild = 1;
					for (let p = 0; p < curBabies; p++) {
						PCDegree = 0;
						if (birthed[0].genetics.race === V.PC.origRace) { // TODO: Fixme "0" is from TW; error?
							PCDegree++;
						}
						if (birthed[p].genetics.hColor === V.PC.hColor) {
							PCDegree++;
						}
						if (birthed[p].genetics.skin === V.PC.skin) {
							PCDegree++;
						}
						if (birthed[p].genetics.eyeColor === V.PC.eye.origColor) {
							PCDegree++;
						}

						if (firstChild === 1) {
							r.push(`Your first`);
							firstChild = 0;
						} else {
							r.push(`The next`);
						}
						r.push(`little`);
						if (birthed[p].genetics.gender === "XX") {
							r.push(`girl`);
						} else {
							r.push(`boy`);
						}
						if (identicalChildGen === 1) { // TODO: fixme: completely unique variable. -_-
							r.push(`looks exactly like the previous; they're identical twins.`);
						} else if (V.PC.pregSource === -1) {
							r.push(`looks exactly like`);
							if (p === 0) {
								r.push(`you, in fact, the resemblance seems uncanny. Since`);
								if (birthed[p].genetics.gender === "XX") {
									r.push(`she`);
								} else {
									r.push(`he`);
								}
								r.push(`has the exact same genetics as you,`);
								if (birthed[p].genetics.gender === "XX") {
									r.push(`she'll`);
								} else {
									r.push(`he'll`);
								}
								r.push(`likely look almost identical to you when`);
								if (birthed[p].genetics.gender === "XX") {
									r.push(`she's`);
								} else {
									r.push(`he's`);
								}
								r.push(`your age.`);
							} else {
								r.push(`you.`);
							}
							r.push(`Every one of your children look this way; it's kind of hard to tell them apart.`);
						} else if (PCDegree === 4) {
							r.push(`looks just like you;`);
							if (birthed[p].genetics.gender === "XX") {
								r.push(`she`);
							} else {
								r.push(`he`);
							}
							r.push(`will likely grow up to closely resemble yourself.`);
						} else if (birthed[p].genetics.eyeColor === V.PC.eye.origColor) {
							r.push(`has your lovely ${V.PC.eye.origColor} eyes.`);
						} else if (PCDegree > 0) {
							r.push(`looks a little like you, enough that`);
							if (birthed[p].genetics.gender === "XX") {
								r.push(`she'll`);
							} else {
								r.push(`he'll`);
							}
							r.push(`be recognizable as yours.`);
						} else {
							r.push(`looks nothing like you; it's hard to believe`);
							if (birthed[p].genetics.gender === "XX") {
								r.push(`she's your daughter`);
							} else {
								r.push(`he's your son`);
							}
						}
						if (birthed[p].reserve === "incubator") {
							r.push(`<span class="pink">You set`);
							if (birthed[p].genetics.gender === "XX") {
								r.push(`her`);
							} else {
								r.push(`him`);
							}
							r.push(`aside for incubation.</span>`);
							if (V.incubator.tanks.length < V.incubator.capacity) {
								App.Facilities.Incubator.newChild(generateChild(V.PC, birthed[p], true), birthed[p].tankSetting);
							}
							birthed.splice(birthed[p], 1);
							p--;
							curBabies--;
						} else if (birthed[p].reserve === "nursery") {
							r.push(`<span class="pink">You set`);
							if (birthed[p].genetics.gender === "XX") {
								r.push(`her`);
							} else {
								r.push(`him`);
							}
							r.push(`aside to be raised in the penthouse.</span>`);
							if (V.cribs.length < V.nurseryCribs) {
								App.Facilities.Nursery.newChild(generateChild(V.PC, birthed[p]));
							}
							birthed.splice(birthed[p], 1);
							p--;
							curBabies--;
						}
					}

					r.push(`All in all, you've brought a healthy group of`);
					if (babiesReduced.length > 2) {
						for (let spb = 0; spb < babiesReduced.length; spb++) {
							if (spb < babiesReduced.length - 1) {
								r.push(`${babiesReduced[spb]},`);
							} else {
								r.push(`and${babiesReduced[spb]}'s`);
							}
						}
					} else if (babiesReduced.length > 1) {
						r.push(`${babiesReduced[0]} and ${babiesReduced[1]}'s`);
					} else {
						if (babiesReduced[0] !== "your own" && babiesReduced[0] !== "designer") {
							r.push(`${babiesReduced[0]}'s`);
						} else {
							r.push(babiesReduced[0]);
						}
					}
					r.push(`babies into the world.`);
				}


				if (V.PC.pregSource > 0 && curBabies > 0) {
					const pb = findFather(V.PC.pregSource);
					if (pb) {
						if (V.arcologies[0].FSRestartDecoration === 100 && V.eugenicsFullControl !== 1) {
							r.push(`Word spreads fast through your peers that you gave birth to`);
							if (curBabies > 1) {
								r.push(`low class infants`);
							} else {
								r.push(`a low class child`);
							}
							r.push(`<span class="red">utterly devastating your standing among the Elite.</span>`);
							V.failedElite += 200;
						} else if (V.arcologies[0].FSChattelReligionistLaw === 1) {
							r.push(`Rumors spread that The Prophet gave birth to a slave's ${(curBabies > 1) ? "children" : "child"}.`);
							if (FutureSocieties.isActive('FSSupremacist')) {
								if (pb.race !== V.arcologies[0].FSSupremacistRace) {
									r.push(`Word is that your child${curBabies > 1 ? `ren were` : `was`} not ${V.arcologies[0].FSSupremacistRace}. As The Prophet saw fit to bear such a child, society views it as a sign to <span class="red">reject ${V.arcologies[0].FSSupremacistRace} supremacy.</span>`);
									V.arcologies[0].FSSupremacist -= 120;
								}
							}
							if (FutureSocieties.isActive('FSSubjugationist')) {
								if (pb.race === V.arcologies[0].FSSubjugationistRace) {
									r.push(`In addition, The Prophet's womb bore ${V.arcologies[0].FSSubjugationistRace} ${(curBabies > 1) ? "children" : "a child"}, surely a sign to <span class="red">reject ${V.arcologies[0].FSSubjugationistRace} subjugation.</span>`);
									V.arcologies[0].FSSubjugationist -= 120;
								}
							}
						} else {
							r.push(`Rumors spread that your child${curBabies > 1 ? `ren were` : `was`} fathered by a slave, <span class="red">harming your lasting reputation.</span>`);
							V.PC.degeneracy += 20;
							if (FutureSocieties.isActive('FSSupremacist')) {
								if (pb.race !== V.arcologies[0].FSSupremacistRace) {
									r.push(`Furthermore, word is that your child${curBabies > 1 ? `ren were` : `was`} not ${V.arcologies[0].FSSupremacistRace}, <span class="red">further hurting your lasting reputation.</span>`);
									V.PC.degeneracy += 10;
								}
							}
							if (FutureSocieties.isActive('FSSubjugationist')) {
								if (pb.race === V.arcologies[0].FSSubjugationistRace) {
									r.push(`In addition, there is a nasty rumor that you gave birth to ${V.arcologies[0].FSSubjugationistRace} ${(curBabies > 1) ? "children" : "a child"}, <span class="red">devastating your lasting reputation.</span>`);
									V.PC.degeneracy += 50;
								}
							}
						}
					}
				}

				/* -------------------- Now curBabies counts live, birthed babies who haven't been placed in the incubator. */
				curBabies = birthed.length;

				if (curBabies > 0) {
					r.toParagraph();
					r.push(`Now you are faced with a decision of what to do with your`);
					if (pregTypeDecrement > 0) {
						r.push(`remaining`);
					} else {
						r.push(`new`);
					}
					r.push(`${(curBabies > 1) ? "children" : "child"}. You're far too busy to keep`);
					if (curBabies > 1) {
						r.push(`them`);
					} else {
						r.push(`it`);
					}
					r.push(`yourself, but you could <span class="orange">send them to a boarding school to be raised until they are of age to serve as your heir.</span> Other options include sending them to <span class="orange">become a slave at a slave orphanage,</span> sending them to <span class="orange">a citizen school,</span> to be brought up coequal with the arcology's other young people, or sending them to be <span class="orange">raised privately,</span> with expert care and tutoring.`);
					if (V.arcologies[0].FSRepopulationFocus > 40) {
						r.push(`Of course, there are also the <span class="orange">breeding schools,</span> where your`);
						if (curBabies === 1) {
							if (gender === "XX") {
								r.push(`daughter will be taught the joys of motherhood up until she is around`);
								if (V.minimumSlaveAge > V.fertilityAge) {
									r.push(`${V.minimumSlaveAge}`);
								} else {
									r.push(`${V.fertilityAge}`);
								}
								r.push(`years old, when she will be impregnated with her first child.`);
							} else {
								r.push(`son will be taught it is his duty to fuck every slavegirl he sees without a baby bump pregnant.`);
							}
						} else {
							if (gender === "XX") {
								r.push(`daughters will be taught the joys of motherhood up until they are around`);
								if (V.minimumSlaveAge > V.fertilityAge) {
									r.push(`${V.minimumSlaveAge}`);
								} else {
									r.push(`${V.fertilityAge}`);
								}
								r.push(`years old, when they will be impregnated for the first time.`);
								if (curBabies > 1) {
									r.push(`They say multiples run in families, so your daughters should blossom into quite the fertile breeders.`);
								}
							} else {
								r.push(`sons will be taught it is their duty to fuck every slavegirl they see without a baby bump pregnant.`);
							}
						}
					}
					if (V.policies.cash4Babies === 1) {
						seed = random(1, 10);
						r.push(`Alternatively, since it is <span class="orange">legal to sell slave babies,</span> your child should be worth quite a pretty ¤ at auction.`);
					}
					if (((V.eliteFail > 0 || V.eugenicsFullControl > 0) && V.PC.pregSource === -1) || V.PC.pregSource === -6) {
						r.push(`The Societal Elite should look forward <span class="orange">to raising them.</span>`);
					}
					if (V.PC.pregSource === -9) {
						r.push(`The Futanari Sisters would happily <span class="orange">take them in.</span>`);
					}

					r.toParagraph();

					App.UI.DOM.appendNewElement("p", node, `What will it be?`);

					const choices = [
						new App.Events.Result(`Boarding School`, boarding),
						new App.Events.Result(`Slave Orphanage`, orphanage),
						new App.Events.Result(`Citizen School`, citizenSchool),
						new App.Events.Result(`Privately Raised`, privateSchool),
					];
					if (V.arcologies[0].FSRepopulationFocus > 40) {
						choices.push(new App.Events.Result(`Breeding School`, breeding));
					}
					if (V.policies.cash4Babies === 1) {
						choices.push(new App.Events.Result(`Auction Them`, auction));
					}
					if (((V.eliteFail > 0 || V.eugenicsFullControl > 0) && V.PC.pregSource === -1) || V.PC.pregSource === -6) {
						choices.push(new App.Events.Result(`Societal Elite`, eliteRaise));
					}
					if (V.PC.pregSource === -9) {
						choices.push(new App.Events.Result(`Futanari Sisters`, futa));
					}

					App.Events.addResponses(node, choices);
				}

				if (V.PC.ovaryAge >= 47 && V.playerAging === 2) {
					// <br>
					r.push(`You are getting too old to have children; you feel like this may be your last.`);
					V.PC.preg = -2;
				}

				if (wounded === 1) {
					r.push(`Things didn't quite go as planned, leaving you <span class="health dec">weak and wounded.</span> You'll need a couple weeks to recover from the ordeal before you're back on your feet.`);
					healthDamage(V.PC, 40);
				}
				r.toParagraph();
			}/* closes gaveBirth*/
		}/* closes SE*/

		/* belly sag is a thing now, USE IT! */
		badBirth = 0;
		WombFlush(V.PC);
		if (V.PC.geneticQuirks.fertility + V.PC.geneticQuirks.hyperFertility >= 4) {
			V.PC.pregWeek = -2;
		} else if (V.PC.geneticQuirks.hyperFertility === 2) {
			V.PC.pregWeek = -3;
		} else {
			V.PC.pregWeek = -4;
		}
		V.PC.belly = getPregBellySize(V.PC);

		function boarding() {
			return "You have decided to send them away to be raised in your stead.";
		}

		function orphanage() {
			V.slaveOrphanageTotal += curBabies;
			return `You have decided to send them to a slave orphanage to be raised to ${V.minimumSlaveAge} and sold. Perhaps you'll even see them again, though you are unlikely to recognize them if you do.`;
		}

		function citizenSchool() {
			V.citizenOrphanageTotal += curBabies;
			return "You have decided to send them to a citizen school to become a future citizen. Perhaps you'll even see them again, though you are unlikely to recognize them if you do.";
		}

		function privateSchool() {
			V.privateOrphanageTotal += curBabies;
			return `You have decided to send them to be privately raised. Perhaps you'll even see them again, though it's unlikely that there will be any connection between you. At least you'll know they've been properly reared.`;
		}

		function breeding() {
			V.breederOrphanageTotal += curBabies;
			return `You have decided to send them to be raised into a proper breeder. Perhaps you'll even see them again, though it's unlikely you'll recognize them with their reproduction-focused body.`;
		}

		function auction() {
			cashX((1000 * seed * curBabies), "babyTransfer");
			return `You send the ${(curBabies > 1) ? "children" : "child"} to be sold at auction amongst other prestigious slaves. The winning bid for your offspring came in at <span class="yellowgreen">${cashFormat(1000 * seed * curBabies)}.</span>"`;
		}

		function eliteRaise() {
			const r = [];
			r.push(`You have decided to gift them to the Societal Elite to be raised as`);
			if (curBabies > 1) {
				r.push(`proper members`);
			} else {
				r.push(`a proper member`);
			}
			r.push(`of the future world.`);
			return r.join(" ");
		}

		function futa() {
			return `You have decided to gift them to the Futanari Sisters to be raised to join them. They are more than happy to cover all the expenses for the gift you gave them — especially after they gave you a gift in return.`;
		}
	}
};
