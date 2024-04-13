/**
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.Interact.fSuckDick = function(slave) {
	const node = new DocumentFragment();

	const {
		He, His,
		he, his, him, himself
	} = getPronouns(slave);

	seX(slave, "penetrative", V.PC, "oral");

	const belly = slave.belly > 5000 ? bellyAdjective(slave) + " belly" : " belly";
	const amount = cumAmount(slave);
	let liquid = "precum";

	let genitals;
	if (slave.scrotum > 0) {
		if (slave.balls === 1) {
			genitals = "vestigial gonads";
		} else if (slave.balls === 2) {
			genitals = "small testes";
		} else if (slave.balls === 3) {
			genitals = "average balls";
		} else if (slave.balls === 4) {
			genitals = "large balls";
		} else if (slave.balls === 5) {
			genitals = "massive balls";
		} else if (slave.balls === 6) {
			genitals = "huge balls";
		} else if (slave.balls === 7) {
			genitals = "giant balls";
		} else if (slave.balls === 8) {
			genitals = "enormous balls";
		} else if (slave.balls === 9) {
			genitals = "monstrous balls";
		} else if (slave.balls === 0) {
			genitals = "soft scrotum";
		} else {
			genitals = "overly massive balls";
		}
	} else {
		if (slave.vagina !== -1) {
			genitals = "vaginal opening";
		} else {
			genitals = "soft perineum";
		}
	}

	let dickAdj;
	if (slave.dick === 1) {
		dickAdj = "tiny";
	} else if (slave.dick === 2) {
		dickAdj = "cute";
	} else if (slave.dick === 3) {
		dickAdj = "average";
	} else if (slave.dick === 4) {
		dickAdj = "big";
	} else if (slave.dick === 5) {
		dickAdj = "impressive";
	} else if (slave.dick === 6) {
		dickAdj = "huge";
	} else if (slave.dick === 7) {
		dickAdj = "gigantic";
	} else if (slave.dick === 8) {
		dickAdj = "titanic";
	} else if (slave.dick === 9) {
		dickAdj = "absurd";
	} else if (slave.dick === 10) {
		dickAdj = "inhuman";
	} else {
		dickAdj = "hypertrophied";
	}

	let lips;
	let lipsLong = "thin lips";
	if (V.PC.lips <= 10) {
		lips = "thin ";
	} else if (V.PC.lips <= 20) {
		lips = "attractive ";
	} else if (V.PC.lips <= 40) {
		lips = "full ";
	} else if (V.PC.lips <= 70) {
		lips = "plump ";
	} else if (V.PC.lips <= 95) {
		lips = "huge cartoon ";
	} else {
		lips = "puffy pussy-like ";
	}
	if (V.PC.lips > 10) {
		lipsLong = lips + (V.PC.lipsImplant > 0 ? "fake lips" : "natural lips");
	}
	lips += "lips";

	let r = [];

	if (canWalk(slave) || (canMove(slave) && slave.rules.mobility === "permissive")) {
		r.push(`You ask ${slave.slaveName} to go to your office and order ${him} to lie down on the floor. ${He} does so`);
		if (slave.devotion > 95) {
			r.push(`with a smile, skipping over to give you a quick kiss before ${he} complies with your request.`);
		} else if (slave.devotion > 50) {
			r.push(`without hesitation, ready to serve and obey.`);
		} else if (slave.devotion > -50) {
			r.push(`with a look of trepidation, as though afraid you're going to hurt ${him}.`);
		} else if (slave.devotion <= -50) {
			r.push(`with a look of hatred, though only after you threaten to punish ${him}.`);
		}
	} else {
		r.push(`You have ${slave.slaveName} brought into your office and placed on the floor.`);
	}

	r.push(`After ${he} is situated, you go over to ${him} and admire ${his} naked body, licking your ${lipsLong}. ${He}`);
	if (slave.devotion > 50) {
		r.push(`gives you a soft smile.`);
	} else {
		r.push(`gives you an angry glare.`);
	}

	if (hasAnyLegs(slave)) {
		if (hasBothLegs(slave)) {
			r.push(`You kneel between ${his} legs,`);
		} else {
			r.push(`You kneel beside ${his} leg,`);
		}
	} else {
		r.push(`You kneel`);
	}
	r.push(`in front of ${his} crotch, take the shaft of ${his} ${dickAdj} dick`);
	if (slave.dick > 6) {
		r.push(`with both hands`);
	} else if (slave.dick >2) {
		r.push(`with your hand`);
	} else {
		r.push(`between your forefinger and thumb`);
	}

	r.push(`and you lower your head towards ${his} glans while`);
	if (canSee(slave)) {
		r.push(`you look into ${his} eyes with a smile.`);
	} else {
		r.push(`you emit a suggestive sound.`);
	}
	r.push(`It's obvious the slave has no clue what your intentions are until you stick out your tongue and lick the tip of ${his} limp penis.`);

	switch (slave.fetish) {
		case Fetish.MINDBROKEN:
			r.push(`Since the slave is mindbroken, ${he} lies still and ${his} face shows no reaction,`);
			if (canAchieveErection(slave)) {
				r.push(`but used to the demands of sex work,`);
			}
			break;
		case Fetish.BOOBS:
			if (hasAnyArms(slave)) {
				r.push(`The slave fondles ${his} breasts, while`);
			}
			break;
		case Fetish.BUTTSLUT:
			if (hasAnyArms(slave)) {
				r.push(`The slave rubs ${his} anus, while`);
			}
			break;
		case Fetish.DOM:
			r.push(`The slave thrusts ${his} hips upwards, while`);
			break;
		default:
			r.push(`A slight moan of pleasure escapes the slave's lips, while`);
	}
	if (canAchieveErection(slave)) {
		r.push(`${his} ${dickAdj} dick starts to swell and grow.`);
	} else {
		r.push(`${his} dick grows a bit, but remains flaccid since ${he} can't get an erection.`);
	}

	if (slave.devotion >= 95) {
		r.push(`Since ${slave.slaveName} loves you, ${he} thinks that what you are about to do is a reward for ${his} loyalty.`);
	} else if (slave.devotion <= 20) {
		r.push(`Since ${slave.slaveName} hates you, ${he} has mixed feelings, between submitting to your wishes and the possibility that the person ${he} loathes will give ${him} a blowjob. The second option prevails.`);
	}

	App.Events.addParagraph(node, r);
	r = [];

	r.push(`You stop what you're doing and instruct ${him} to let you know when he's about to cum.`);
	if (slave.fetish === Fetish.MINDBROKEN) {
		r.push(`${He} focuses ${his}`);
		r.push(canSee(slave) ? "dull" : "blind");
		r.push(`eyes in your direction.`);
	} else if (disobedience(slave) === 0) {
		r.push(`${He} nods.`);
	} else {
		r.push(`${He} smiles slyly.`);
	}

	r.push(`You go down on ${him} again, this time`);
	if (slave.foreskin > 0) {
		r.push(`pursing your ${lips}, taking the tip of ${his} member with them and sliding ${his} foreskin back, while playing with your tongue on the glans.`);
	} else {
		r.push(`encircling the tip of ${his} member with your ${lips} and letting the glans slide slowly into your mouth, while playing with your tongue.`);
	}

	r.push(`Once the glans is inside your mouth, you start to slowly bob your head up and down, every time a little further, until`);
	if (slave.dick > 7) {
		r.push(`all ${his} gigantic cockhead occupies your whole buccal cavity.`);
	} else if (slave.dick > 5) {
		r.push(`${his} enormous cockhead hits the back of your buccal cavity.`);
	} else if (slave.dick > 3) {
		r.push(`${his} big cockhead is at the entrance of your throat.`);
	} else if (slave.dick > 1) {
		r.push(`the whole length of ${his} cock is inside you mouth.`);
	} else {
		r.push(`you have ${his} cute small penis in your mouth and your lips sealed against ${his} pubes.`);
	}

	if (!canAchieveErection(slave)) { // Slaves unable to achieve an erection
		r.push(`As long as ${he} can't achieve an erection, it's hard to excite ${him} enough with only the use of your mouth, so`);
		if (slave.prostate > 0 && canDoAnal(slave)) { // Slaves with excitable prostate
			if (slave.dick > 2) {
				r.push(`while holding ${his} dick with your left hand, with the other`);
			}
			r.push(`you put two fingers in ${his} anus to reach ${his} prostate and massage it.`);
		} else if (canDoVaginal(slave)) { // Slaves with non-virgin vagina and no chastity belt
			if (slave.dick > 2) {
				r.push(`while holding ${his} dick with your left hand, with the other`);
			}
			if (slave.vagina < 3) {
				r.push(`you put two fingers inside ${his} vagina and fuck ${him} rudely.`);
			} else {
				r.push(`you rudely fistfuck ${his} loose vagina.`);
			}
		} else if (slave.balls > 0) { // Slaves with balls outside the abdomen
			if (slave.dick > 2 && slave.scrotum > 0) {
				r.push(`while holding ${his} dick with your left hand, with the other`);
			}
			r.push(`you fondle ${his} ${genitals}.`);
		} else if (V.seePee === 1 && jsRandom(1, 100) > 50) { // Involuntary urination ending
			r.push(`You continue sucking the slave's member for a long time, without getting any positive reaction. You notice how ${he} ${slave.fetish === Fetish.MINDBROKEN ? "remains impassible" : "strains, tensing up, desperately trying to cum for you"}. Suddenly, you notice a bitter and salty taste filling your mouth and going down your throat, and you move your head away just to receive a hot stream of urine on your face.`);

			App.Events.addParagraph(node, r);
			r = [];

			r.push(`After the first impression, you burst out laughing, while ${he} remains on the ground, ${slave.fetish === Fetish.MINDBROKEN ? "letting out the rest of the pee" : "trembling with fear"}. It is clear that it is not ${his} fault, ${he} has tried to fulfill your wishes in the best way that ${he} could, but you have not chosen with good judgment the right slave to give ${him} a blowjob. In any case, what happened cannot be left without an adequate punishment.`);
			if (canWalk(V.PC)) {
				r.push(`You stand up in front of ${him},`);
			} else {
				r.push(`You crawl on top of ${him},`);
			}
			if (V.PC.dick > 0) {
				r.push(`pull out your penis,`);
			} else if (slave.boobs > 5000) {
				r.push(`sit on ${his} enormous boobs, legs open, facing ${him},`);
			} else if (slave.boobs > 300) {
				r.push(`squat on ${his} tits, facing ${him},`);
			} else {
				r.push(`squat on ${his} chest, facing ${him},`);
			}
			r.push(`and completely unload your bladder on ${his} face.`);
			if (slave.fetish !== Fetish.MINDBROKEN) {
				r.push(`The slave is <span class="trust inc">relieved</span> that this is the only consequence of ${his} sudden incontinence.`);
				slave.trust += 2;
			}

			App.Events.addParagraph(node, r);
			r = [];

			liquid = "urine";

			r.push(cleanup());

			if (V.policies.sexualOpenness === 0) {
				r = [];
				r.push(rumors());
				App.Events.addParagraph(node, r);

				V.PC.degeneracy += 1;
			}

			App.Events.addParagraph(node, r);

			return node;
		} else { // Player fails to orally please the slave
			r.push(`You continue sucking the slave's member for a long time, without getting any positive reaction. You notice how ${he} strains, tensing up, desperately trying to cum for you, but to no avail. After what seems like hours to you, you get tired and give up. ${He} makes a face between worried and sad. You make ${him} understand that it is not necessary to worry, that you appreciate ${his} effort and that you are sure that ${he} will find another way to serve you in order to compensate you.`);

			App.Events.addParagraph(node, r);
			r = [];

			r.push(cleanup());

			if (V.policies.sexualOpenness === 0) {
				r = [];
				r.push(rumors());
				App.Events.addParagraph(node, r);

				V.PC.degeneracy += 1;
			}

			App.Events.addParagraph(node, r);

			return node;
		}

		if (isMindbroken(slave)) {
			r.push(`Without any warning, ${his} ${dickAdj} flaccid dick begins to release cum into your mouth. At the moment, you move away.`);
			r.push(`You should have known this would happen with a mindbroken slave. You turn your head away, releasing what you have in your mouth.`);
			r.push(cumFinal());

			App.Events.addParagraph(node, r);
			r = [];

			r.push(`It is not worth scolding ${him}, ${his} mental state won't allow ${him} to understand it.`);

			liquid = "cum";

			r.push(cleanup());

			if (V.policies.sexualOpenness === 0) {
				r = [];
				r.push(rumors());
				App.Events.addParagraph(node, r);

				V.PC.degeneracy += 1;
			}

			App.Events.addParagraph(node, r);

			return node;
		} else {
			r.push(`You continue to suck ${his} flaccid ${dickAdj} cock, determined to extract ${his} sperm. At one point you feel an almost imperceptible throb in ${his} member and ${he} lets you know that ${his} orgasm is imminent. You take one last firm suck before slowly letting the glans out of your mouth and taking the base of ${his} ${dickAdj} member ${slave.dick > 2 ? "with your hand" : "with your forefinger and thumb"}, toying the soft shaft with your ${lipsLong}, just in time.`);
			r.push(cumFinal());
			r.push(`${He} didn't enjoy being forced to come.`);

			App.Events.addParagraph(node, r);
			r = [];

			r.push(cleanup());

			if (V.policies.sexualOpenness === 0) {
				r = [];
				r.push(rumors());
				App.Events.addParagraph(node, r);

				V.PC.degeneracy += 1;
			}

			slave.trust -= 2;
			slave.devotion -= 5;

			App.Events.addParagraph(node, r);
			return node;
		}
	} else {
		r.push(`You continue sucking on the ${dickAdj} slave's member for some time, using your tongue and lips, making sure to keep it well lubricated with your saliva. Soft moans escape ${his} lips. At one moment, the cock in your mouth becomes even more rigid, and you know that the excellent worship you are giving this cock is going to bring its owner a powerful orgasm.`);
		if (isHorny(V.PC)) {
			r.push(`All of this excites you to the point that you feel like you're about to have your own orgasm, without any physical stimulation, other than having a cock in your mouth.`);
		}
		r.push(`You lift your head until only the${slave.dick > 4 ? " top half of the" : ""} glans is surrounded by your ${lips}, using your tongue to play with ${slave.foreskin === 0 ? "the tip" : "the frenulum"}, and`);
		if (slave.dick > 6) {
			r.push(`your hands`);
		} else if (slave.dick >2) {
			r.push(`your hand`);
		} else {
			r.push(`your forefinger and thumb`);
		}
		r.push(`to pump the shaft, waiting for ${him} to warn you that ${he} is about to cum.`);

		App.Events.addParagraph(node, r);
		r = [];

		if (slave.fetish === Fetish.MINDBROKEN) { // Mindbroken slaves don't warn the player
			r.push(`He's mentally broken, so ${he}'s unable to react when ${he} orgasms. ${He} doesn't warn you, ${he} doesn't give you any clues, you just feel ${his} penis twitch a bit before ${his} seed starts to flood your mouth.`);
			if (isHorny(V.PC)) {
				r.push(`${His} semen in your mouth takes you beyond your limits and an intense, extremely pleasurable and endless orgasm takes control of your mind. Instinctively you swallow the seed that the slave unloads in your mouth while`);
				if (V.PC.dick > 0) {
					r.push(`your own semen waters the floor under your body${V.PC.vagina >= 0 ? " and" : "."}`);
				}
				if (V.PC.vagina >= 0) {
					if (V.PC.vaginaLube === 0) {
						r.push(`your dry vagina pulses rhythmically.`);
					} else if (V.PC.vaginaLube === 1) {
						r.push(`your natural lubrication runs down your legs.`);
					} else {
						r.push(`your vaginal fluids gush between your legs, forming a pool.`);
					}
				} else if (V.PC.dick < 0) {
					r.push(`while your anus contracts rhythmically.`);
				}
				if (amount + (V.PC.belly > 5000 ? 100 : 0) > 150) {
					r.push(`${His} cumshot is so voluminous that your stomach can't take it anymore and you raise your head, releasing what you have in your mouth.`);
					r.push(cumFinal(150));
				}
			} else {
				r.push(`You should have known this would happen. You turn your head away, releasing what you have in your mouth.`);
				r.push(cumFinal());
			}

			App.Events.addParagraph(node, r);
			r = [];

			r.push(`It is not worth scolding ${him}, ${his} mental state won't allow ${him} to understand it.`);

			liquid = "cum";

			r.push(cleanup());

			if (V.policies.sexualOpenness === 0) {
				r = [];
				r.push(rumors());
				App.Events.addParagraph(node, r);

				V.PC.degeneracy += 1;
			}

			App.Events.addParagraph(node, r);
			return node;
		} else if ((disobedience(slave) > 0 || (slave.fetish === Fetish.DOM && slave.devotion < 20 && slave.trust > 20)) && hasAnyArms(slave)) { // Disobedient slaves try to force the player to swallow, dominant slaves have a plus
			r.push(`You feel a throbbing at the base of the dick, and ${amount <= 100 ? "liquid splatters in the back of your mouth" : "a thick spurt fills your mouth"}. You feel ${hasBothArms(slave) ? "the slave's hands" : "a hand"} on your head pushing you down.`);
			if (canTalk(slave)) {
				r.push(`<span class="orangered">${Spoken(slave, "Yeah, now, I cum! All for you!")}</span>`);
			} else {
				r.push(`The slave makes a grunt of pleasure, and you understand that <span class="orangered">${he} is determined to unload all ${his} semen in your mouth.</span>`);
			}
			App.Events.addParagraph(node, r);
			r = [];

			if (isHorny(V.PC)) { // Horny player can't resist the disobedient slave
				r.push(`A new throbbing of ${his} cock, with the consequent seminal discharge in your oral cavity, takes you beyond your limits and an intense, extremely pleasurable and endless orgasm takes control of your mind. You have no strength or desire to resist, and you simply let yourself be carried away by your pleasure and let the hands of the slave guide your head.`);
				r.push(swallow());
			} else if (overpowerCheck(slave, V.PC) >= jsRandom(1, 100)) {
				r.push(`You slam ${his} hand${hasBothArms(slave) ? "s" : ""} with yours, releasing ${his} grip on your head, and you manage to tear your mouth away from ${his} cock.`);
				if (canWalk(V.PC)) {
					if (slave.balls > 0 && slave.scrotum > 0) {
						r.push(`You stand up and kick ${him} hard in ${his} ${genitals}.`);
					} else if (slave.vagina >= 0) {
						r.push(`You pinch and twist ${his} labia furiously.`);
					} else {
						r.push(`You stand up and kick ${him} in the anus, so hard half a foot goes inside.`);
					}
				} else {
					if (slave.balls > 0 && slave.scrotum > 0) {
						r.push(`You move away a bit and give ${him} two strong punches in ${his} ${genitals}.`);
					} else if (slave.vagina >= 0) {
						r.push(`You pinch and twist ${his} labia furiously.`);
					} else {
						r.push(`You punch ${him} so hard in the anus that half your fist gets stuck inside.`);
					}
				}
				r.push(`Despite ${his} pained face, ${his} orgasm doesn't stop.`);

				r.push(cumFinal());

				slave.devotion--;
			} else {
				r.push(`You try to break free, but you don't have enough strength and your unsuccessful attempts only excite ${him} more. Finally you give up and decide to cooperate as best you can so that ${he} finishes as soon as possible.`);
				r.push(swallow());
				V.rapedThisWeek = (V.rapedThisWeek || 0) + 1;
			}

			App.Events.addParagraph(node, r);
			r = [];

			r.push(`You look at ${him} with a deeply angry face. Deep down you know that what happened is your fault, you shouldn't have put yourself in danger with a rebellious slave. You decide not to be harsh and simply lecture ${him} about the duties of slaves, the rules they must follow, and the respect they owe their owner. You assure ${him} that you trust ${him} to improve so that you can be proud of ${him}. <span class="trust inc">${He} nods, without much conviction.</span>`);

			liquid = "cum";

			r.push(cleanup());

			if (V.policies.sexualOpenness === 0) {
				r = [];
				r.push(rumors());
				App.Events.addParagraph(node, r);

				V.PC.degeneracy += 1;
			}

			slave.trust += 10;

			App.Events.addParagraph(node, r);
			return node;
		} else if (!hasAnyArms(slave)) { // Slaves with no arms
			r.push(`You continue sucking ${him} until ${he} warns you that ${his} orgasm is imminent. You pull your mouth away and take hold of the base of ${his} member ${slave.dick > 2 ? "with your hand" : "with your forefinger and thumb"}, just in time to feel the first contraction.`);

			r.push(cumFinal());

			App.Events.addParagraph(node, r);
			r = [];

			r.push(cleanup());

			if (V.policies.sexualOpenness === 0) {
				r = [];
				r.push(rumors());
				App.Events.addParagraph(node, r);

				V.PC.degeneracy += 1;
			}

			slave.trust += 2;
			slave.devotion += 2;

			App.Events.addParagraph(node, r);
			return node;
		} else if (slave.skill.oral < 30 || (slave.skill.oral < 70 && jsRandom(1, 100) > 70)) { // Player decides to give an oral lesson to the slave
			r.push(`You've looked through your archives and realized that ${slave.slaveName} can improve on ${his} oral skills, so you decide you're going to give ${him} a master class in pleasing a penis all the way. You take ${his} hands and place them on your head, making it clear that you want ${him} to take the reins, while you concentrate on using your ${lipsLong} and tongue to teach ${him}. At the same time you caress ${his} body until you take ${him} to the limit. You know your slaves well and you are aware ${he}'s about to erupt in your mouth.`);
			r.push(swallow());

			App.Events.addParagraph(node, r);
			r = [];

			r.push(`You smile at ${him} and give ${him} details of how you have used your mouth, your lips and your tongue to make ${his} orgasm as pleasant as possible. You ask ${him} to take good note and apply it at work or when necessary. ${He} nods, grateful.`);
			r.push(slaveSkillIncrease('oral', slave, 5));

			App.Events.addParagraph(node, r);
			r = [];

			r.push(cleanup());

			if (V.policies.sexualOpenness === 0) {
				r = [];
				r.push(rumors());
				App.Events.addParagraph(node, r);

				V.PC.degeneracy += 1;
			}

			slave.trust += 2;
			slave.devotion += 2;

			App.Events.addParagraph(node, r);
			return node;
		} else if (isHorny(slave) && slave.devotion < 50 && slave.trust > 50 && jsRandom(1, 100) > 50) { // Slaves unable to warn with time enough
			r.push(`${He} warns you that ${his} orgasm is imminent at the time you feel a throbbing at the base of the dick, and ${amount <= 100 ? "liquid splatters in the back of your mouth" : "a thick spurt fills your mouth"}.`);
			r.push(`You pull away immediately, taking out what's in your mouth. ${He} lets ${himself} go, the expression on ${his} face is worried, but ${his} orgasm and ${his} moans increase in intensity, having cummed in your mouth arouses ${him}${isHorny(V.PC) ? ", and you too." : "."} You look at ${him} threateningly, you're really angry.`);

			if (isHorny(V.PC)) {
				r.push(`You can't control yourself anymore and an intense, extremely pleasurable and endless orgasm takes control of your mind,`);
				if (V.PC.dick > 0) {
					r.push(`your own semen waters the floor under your body${V.PC.vagina >= 0 ? " and" : "."}`);
				}
				if (V.PC.vagina >= 0) {
					if (V.PC.vaginaLube === 0) {
						r.push(`your dry vagina pulses rhythmically.`);
					} else if (V.PC.vaginaLube === 1) {
						r.push(`your natural lubrication runs down your legs.`);
					} else {
						r.push(`your vaginal fluids gush between your legs, forming a pool.`);
					}
				} else if (V.PC.dick < 0) {
					r.push(`while your anus contracts rhythmically.`);
				}
			}
			r.push(cumFinal(30));

			App.Events.addParagraph(node, r);
			r = [];

			r.push(`Finally, you decide that what has happened is not serious enough to deserve a severe punishment. You lecture ${him} about self-control, the rules slaves must follow, and the respect they owe their owner. You assure ${him} that you trust ${him} to improve so that you can be proud of ${him}. <span class="trust inc">${He} nods, without much conviction.</span>`);

			App.Events.addParagraph(node, r);
			r = [];

			liquid = "cum";

			r.push(cleanup());
			App.Events.addParagraph(node, r);

			if (V.policies.sexualOpenness === 0) {
				r = [];
				r.push(rumors());
				App.Events.addParagraph(node, r);

				V.PC.degeneracy += 1;
			}

			slave.devotion += 2;
			slave.trust += 5;
		} else if (V.week - slave.weekAcquired > 30 && slave.devotion > 90 && isPlayerLusting()) { // Senior devoted slaves can be rewarded by a horny player
			r.push(`This devoted slave has been serving you for quite some time. Horny as you are, you decide to reward ${him} by letting ${him} go all the way. When ${he} tells you that ${he} is about to cum, instead of taking your mouth away, you take ${his} hand with yours, guiding it to the top of your head, letting ${him} know that you want ${him} to take the initiative and set the right pace. The slave understands it and, breathing heavily, ${he} prepares to fulfill your wish with great pleasure.`);
			r.push(swallow());

			App.Events.addParagraph(node, r);
			r = [];

			liquid = "cum";

			r.push(cleanup());
			App.Events.addParagraph(node, r);

			if (V.policies.sexualOpenness === 0) {
				r = [];
				r.push(rumors());
				App.Events.addParagraph(node, r);

				V.PC.degeneracy += 1;
			}

			slave.devotion += 5;
			slave.trust += 2;
		} else { // Default
			r.push(`You continue to suck ${him}, stroking ${his} body with one hand, making sure the blowjob is memorable. At one point you feel ${his} member stiffen and ${he} lets you know that ${his} orgasm is imminent. You take one last firm suck before slowly letting the glans out of your mouth and taking the base of ${his} ${dickAdj} member ${slave.dick > 2 ? "with your hand" : "with your forefinger and thumb"}, toying the shaft with your ${lipsLong}, just in time to feel the first contraction.`);
			r.push(cumFinal());

			if (isHorny(V.PC)) {
				r.push(`${His} moans of pleasure take you beyond your limits and you cum simultaneously with ${him}, a hands-free, intense, extremely pleasurable and endless orgasm takes control of your mind,`);
				if (V.PC.dick > 0) {
					r.push(`your own semen waters the floor under your body${V.PC.vagina >= 0 ? " and" : "."}`);
				}
				if (V.PC.vagina >= 0) {
					if (V.PC.vaginaLube === 0) {
						r.push(`your dry vagina pulses rhythmically.`);
					} else if (V.PC.vaginaLube === 1) {
						r.push(`your natural lubrication runs down your legs.`);
					} else {
						r.push(`your vaginal fluids gush between your legs, forming a pool.`);
					}
				} else if (V.PC.dick < 0) {
					r.push(`while your anus contracts rhythmically.`);
				}
			}

			App.Events.addParagraph(node, r);
			r = [];

			r.push(cleanup());

			if (V.policies.sexualOpenness === 0) {
				r = [];
				r.push(rumors());
				App.Events.addParagraph(node, r);

				V.PC.degeneracy += 1;
			}

			slave.trust += 2;
			slave.devotion += 5;

			App.Events.addParagraph(node, r);
			return node;
		}
	}

	return node;

	/* FUNCTIONS */

	function swallow() {
		const text = [];

		text.push(`You put your hands on either side of ${his} body, for balance,`);
		if (slave.dick > 7) {
			text.push(`as ${he} forces your head down, trying to put more of ${his} ${dickAdj} cock inside you, but the apple-sized cockhead can't go any deeper. ${His} urethral opening is wedged in the back of your throat, discharging ${his} cum directly into your guts.`);
		} else if (slave.dick > 4) {
			text.push(`while ${he} pushes your head down and ${his} hips up, and with the help of your abundant saliva, despite the thickness of ${his} cock, ${he} manages to put it through your throat and lodge it in your esophagus. Your distended ${lipsLong} encircle the wide base of the phallus and your nose is flattened against ${his} pubis. You sense how ${his} ${dickAdj} cock throbs as it unloads ${his} cum in your stomach.`);
		} else if (slave.dick > 2) {
			text.push(`while ${he} pushes your head down and ${his} hips up, and with the help of your abundant saliva, ${he} manages to lodge ${his} ${dickAdj} cock in your throat. Your ${lipsLong} encircle the base of the phallus and your nose flattens against ${his} pubis, as you feel ${his} cock throbbing, forcing ${his} cum down your throat.`);
		} else {
			text.push(`as ${he} pushes your head down and ${his} hips up, making sure all of ${his} ${dickAdj} cock is inside your mouth. Your ${lipsLong} encircle the base of ${his} phallus and your nose flattens against ${his} pubis as you feel ${his} cock throb, releasing ${his} semen onto your tongue at the back of your mouth.`);
		}
		if (amount + (V.PC.belly > 5000 ? 100 : 0) > 150) {
			text.push(`${His} cumshot is so voluminous that your stomach can't take it anymore and you slap your hand on ${his} hips to let ${him} know. ${He} understands and lets go of your head, so you can release ${his} member from your ${slave.dick > 2 ? "throat" : "mouth"}.`);
			text.push(cumFinal(150));
		}

		return toSentence(text);
	}

	function cumFinal(partial = 0) {
		const text2 = [];
		let rest = amount - partial;

		if (rest < 0) {
			text2.push(`A last drop of semen oozes from the tip of ${his} cock and slides, sticky, down the shaft.`);
		} else if (rest < 10) {
			text2.push(`${His} cock twitches and a big drop of sticky cum escapes from the tip and slides along the shaft to the base.`);
		} else if (rest < 20) {
			text2.push(`${His} cock twitches and ${he} releases a few timid spurts of cum over ${his} pubis.`);
		} else {
			let text3 = [];
			text3.push(`on ${his} ${belly}`);
			if (rest > 80) {
				text3.push(`over ${his} ${App.Desc.boobBits.noun(slave.boobs, false, true)}`);
				if (rest > 150) {
					text3.push(`on ${his} face`);
					if (rest > 180) {
						text3.push(`${his} ${slave.hStyle === "bald" ? "bald head" : "hair"}`);
						if (rest >= 200) {
							text3.push(`the floor over ${his} head`);
						}
					}
				}
			}
			let where = toSentence(text3);

			if (amount <= 30) {
				text2.push(`${His} cock throbs and three spurts of semen land ${where}.`);
			} else if (amount <= 60) {
				text2.push(`${His} cock throbs and several spurts of semen land ${where}.`);
			} else if (amount <= 80) {
				text2.push(`${His} cock throbs and releases a large load of cum ${where}.`);
			} else if (amount <= 100) {
				text2.push(`${His} dick throbs and massive spurts of seed land ${where}.`);
			} else if (amount <= 140) {
				text2.push(`${His} dick throbs and jumps, huge spurts of seed land ${where}.`);
			} else if (amount <= 160) {
				text2.push(`${His} dick throbs and jumps, a giant and drawn out gush of cum land ${where}.`);
			} else if (amount <= 180) {
				text2.push(`${His} cock throbs and jumps, releasing a long, copious stream of cum that lands ${where}.`);
			} else if (amount <= 200) {
				text2.push(`${His} dick throbs and jumps, a monstrous and drawn out gush of cum lands ${where}.`);
			} else {
				text2.push(`${His} dick throbs and jumps, an overly massive and unending gush of seed lands ${where}.`);
			}
		}

		return toSentence(text2);
	}

	function cleanup() {
		const text = [];

		if (V.slaves.length > 1) {
			text.push(`You order one of your other slaves to clean up the mess on the floor.`);
		} else if (canMove(slave)) {
			text.push(`You order ${slave.slaveName} to clean up the mess on the floor, which ${he} does.`);
		}

		if (canTaste(V.PC)) {
			text.push(`The taste of the slave's ${liquid} fills your mouth,`);
		} else if (canSmell(V.PC)) {
			text.push(`You feel that your mouth smells of the slave's ${liquid},`);
		} else {
			text.push(`You know that your mouth smells of the slave's ${liquid},`);
		}
		if (V.PC.refreshmentType === 0) {
			text.push(`so you smoke your preferred ${V.PC.refreshment} to get rid of it.`);
		} else if (V.PC.refreshmentType === 1) {
			text.push(`so you drink a glass of ${V.PC.refreshment} to get rid of it.`);
		} else if (V.PC.refreshmentType === 2) {
			text.push(`so you eat a plate of ${V.PC.refreshment} to get rid of it.`);
		} else {
			text.push(`so you rinse your mouth to get rid of it.`);
		}

		if (canMove(slave) && slave.fetish !== Fetish.MINDBROKEN && V.postSexCleanUp > 0) {
			text.push(`Your${liquid === "cum" ? " satisfied" : ""} slave`);
			switch (slave.assignment) {
				case "whore":
					text.push(`heads to the bathroom to clean ${himself} before returning to selling ${his} body publicly.`);
					break;
				case "serve the public":
					text.push(`heads to the bathroom to clean ${himself} before returning to allowing the public to use ${his} body.`);
					break;
				case "rest":
					text.push(`heads to the bathroom to clean ${himself} before crawling back into bed.`);
					break;
				case "get milked":
					text.push(`hurries to the bathroom to clean ${himself}`);
					if (slave.lactation > 0) {
						text.push(`before going to get ${his} uncomfortably milk-filled tits drained.`);
					} else {
						text.push(`and then rests until ${his} balls are ready to be drained again.`);
					}
					break;
				case "please you":
					text.push(`hurries to the bathroom to clean ${himself} before returning to await your next use of ${his} body, as though nothing had happened.`);
					break;
				case "be a subordinate slave":
					text.push(`moves to the bathroom to clean ${himself}, though it's only a matter of time before another slave decides to take their turn with ${him}.`);
					break;
				case "be a servant":
					text.push(`hurries to the bathroom to clean ${himself}, since ${his} chores didn't perform themselves while you used ${him}.`);
					break;
				case "be your Head Girl":
					text.push(`hurries to the bathroom to clean ${himself}, worried that ${his} charges got up to trouble while you were using ${him}.`);
					break;
				case "guard you":
					text.push(`hurries off to clean ${himself} so you'll be unguarded for as little time as possible.`);
					break;
				case "work in the brothel":
					text.push(`goes to clean ${himself} so ${his} next customer has no idea what ${he}'s been up to.`);
					break;
				case "serve in the club":
					text.push(`goes to clean ${himself} to make it appear unused.`);
					break;
				case "work in the dairy":
					text.push(`goes off to carefully clean ${himself} to avoid besmirching the nice clean dairy.`);
					break;
				case "work as a farmhand":
					text.push(`goes off to clean ${himself} to avoid tainting the food in ${V.farmyardName}.`);
					break;
				case "work as a servant":
					text.push(`rushes to clean ${himself}, impatient to get back to ${his} undiminished chores.`);
					break;
				case "work as a nanny":
					text.push(`hurries off to clean ${himself} before heading back to the ${V.nurseryName}.`);
					break;
				default:
					text.push(`hurries off to clean ${himself}.`);
			}
		}

		return text.join(' ');
	}


	function rumors() {
		return `Rumors spread that you <span class="reputation dec">enjoy taking it from slaves.</span>`;
	}
};
