App.Events.REFIPregnancy = class REFIPregnancy extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [];
	}

	actorPrerequisites() {
		return [
			[ // event slave
				s => App.Events.qualifiesForREFIeventSlave(s)
			],
			[ // and subslave /subID
				s => App.Events.qualifiesForREFIsubSlave(s, "pregnancy"),
				s => s.bellyPreg >= 5000,
				s => s.pregKnown === 1,
			]
		];
	}

	execute(node) {
		const [eventSlave, subSlave] = this.actors.map(a => getSlave(a));
		const {He, he, his, him, himself, girl, His} = getPronouns(eventSlave);
		const {He2, he2, his2, him2, His2, girl2} = getPronouns(subSlave).appendSuffix("2");
		const {say, title: master} = getEnunciation(eventSlave);
		const subBelly = bellyAdjective(subSlave);

		App.Events.drawEventArt(node, [eventSlave, subSlave], [eventSlave.clothes, "no clothing"]);

		let t = [];
		t.push(`Since ${he2}'s quite pregnant,`);
		t.push(contextualIntro(V.PC, subSlave, true));
		t.push(`gets inspected more regularly than your other slaves. ${His2} pregnancy is progressing acceptably, but having ${his2} belly inspected gets ${him2}`);
		if (subSlave.pregSource === -1) {
			t.push(`extremely eager to feel more of ${his2} ${getWrittenTitle(subSlave)}'s seed in ${his2} fertile`);
			if (subSlave.mpreg === 1) {
				t.push(`rear.`);
			} else {
				t.push(`cunt.`);
			}
			t.push(`${subSlave.slaveName} has been a good ${girl2},`);
			if ((subSlave.mpreg === 1 && canDoAnal(subSlave) && subSlave.anus > 0) || (subSlave.mpreg === 0 && canDoVaginal(subSlave) && subSlave.vagina > 0)) {
				if (V.PC.belly >= 5000) {
					t.push(`so you take ${him2}`);
					if (subSlave.belly >= 300000) {
						t.push(`over ${his2} own ${subBelly} belly. Such discomfort doesn't bother ${him2} since it means ${he2} gets to enjoy the sensation of your own gravid middle rubbing the small of ${his2} back`);
					} else {
						t.push(`on the edge of your desk. ${He2} doesn't mind the hard surface, not when it means your gravid middle is pushing against ${his2} ${subBelly} own`);
					}
					t.push(`as you languidly take ${him2}.`);
				} else {
					t.push(`so you take ${him2} on the couch, spooning so that ${his2}`);
					if (subSlave.belly >= 300000) {
						t.push(`immense gravidity can hang between your legs and towards the floor as you languidly take ${him2}. You have your arms as far around ${his2} middle as you can,`);
					} else {
						t.push(`${subBelly} heavy belly can rest comfortably as you languidly take ${him2}. You have your arms wrapped around ${his2} chest to cup both breasts,`);
					}
					t.push(`and ${he2} has ${his2} neck twisted back to kiss you.`);
				}
				if (subSlave.mpreg === 0 && canDoVaginal(subSlave) && subSlave.vagina > 0) {
					seX(subSlave, "vaginal", V.PC, "penetrative");
				} else if (canDoAnal(subSlave) && subSlave.anus > 0 && subSlave.mpreg === 1) {
					seX(subSlave, "anal", V.PC, "penetrative");
				}
			} else {
				t.push(`but ${his2} eager hole just can't be permitted to have another of your loads at the moment, so ${he2}'ll have to settle for some cuddling instead. You embrace ${him2} on the couch,`);
				if (V.PC.belly >= 5000) {
					t.push(`as closely as you can with your own gravidity in the way and languidly fondle ${him2}; one arm wrapped around behind to ${his2} breast and the other alternating between fecund bulges. The two of you share a deep kiss as your bellies run against each other.`);
				} else {
					t.push(`spooning so that ${his2}`);
					if (subSlave.belly >= 300000) {
						t.push(`immense gravidity can hang between your legs and towards the floor as you languidly grope ${him2}. You have your arms wrapped as far around ${his2} middle as you can, savoring the motion beneath your palms,`);
					} else {
						t.push(`${subBelly} heavy belly can rest comfortably as you languidly fondle ${him2}. You have one arm wrapped around ${his2} middle to grope ${his2} ${subBelly} belly and the other to ${his2} breast,`);
					}
					t.push(`while ${he2} has ${his2} neck twisted back to kiss you.`);
				}
			}
		} else if (V.PC.dick !== 0) {
			t.push(`extremely eager for a good fuck and there's no better dick than ${his2} ${getWrittenTitle(subSlave)}'s. ${subSlave.slaveName} has been a good ${girl2},`);
			if ((subSlave.mpreg === 1 && canDoAnal(subSlave) && subSlave.anus > 0) || (subSlave.mpreg === 0 && canDoVaginal(subSlave) && subSlave.vagina > 0)) {
				if (V.PC.belly >= 5000) {
					t.push(`so you take ${him2}`);
					if (subSlave.belly >= 300000) {
						t.push(`over ${his2} own ${subBelly} belly. Such discomfort doesn't bother ${him2} since it means ${he2} gets to enjoy the sensation of your own gravid middle rubbing the small of ${his2} back`);
					} else {
						t.push(`on the edge of your desk. ${He2} doesn't mind the hard surface, not when it means your gravid middle is pushing against ${his2} ${subBelly} own`);
					}
					t.push(`as you languidly take ${him2}.`);
				} else {
					t.push(`so you take ${him2} on the couch, spooning so that ${his2}`);
					if (subSlave.belly >= 300000) {
						t.push(`immense gravidity can hang between your legs and towards the floor as you languidly take ${him2}. You have your arms as far around ${his2} middle as you can,`);
					} else {
						t.push(`${subBelly} heavy belly can rest comfortably as you languidly take ${him2}. You have your arms wrapped around ${his2} chest to cup both breasts,`);
					}
					t.push(`and ${he2} has ${his2} neck twisted back to kiss you.`);
				}
				if (subSlave.mpreg === 0 && canDoVaginal(subSlave) && subSlave.vagina > 0) {
					seX(subSlave, "vaginal", V.PC, "penetrative");
				} else if (canDoAnal(subSlave) && subSlave.anus > 0 && subSlave.mpreg === 1) {
					seX(subSlave, "anal", V.PC, "penetrative");
				}
			} else {
				t.push(`but ${his2} fertile hole is off limits at the moment, so ${he2}'ll have to settle for some cuddling instead. You embrace ${him2} on the couch,`);
				if (V.PC.belly >= 5000) {
					t.push(`as closely as you can with your own gravidity in the way and languidly fondle ${him2}; one arm wrapped around behind to ${his2} breast and the other alternating between fecund bulges. The two of you share a deep kiss as your bellies run against each other.`);
				} else {
					t.push(`spooning so that ${his2}`);
					if (subSlave.belly >= 300000) {
						t.push(`immense gravidity can hang between your legs and towards the floor as you languidly grope ${him2}. You have your arms wrapped as far around ${his2} middle as you can, savoring the motion beneath your palms,`);
					} else {
						t.push(`${subBelly} heavy belly can rest comfortably as you languidly fondle ${him2}. You have one arm wrapped around ${his2} middle to grope ${his2} ${subBelly} belly and the other to ${his2} breast,`);
					}
					t.push(`while ${he2} has ${his2} neck twisted back to kiss you.`);
				}
			}
		} else {
			t.push(`all hot and bothered. ${subSlave.slaveName} has been a good ${girl2},`);
			if ((subSlave.mpreg === 1 && canDoAnal(subSlave) && subSlave.anus > 0) || (subSlave.mpreg === 0 && canDoVaginal(subSlave) && subSlave.vagina > 0)) {
				t.push(`so you don a strap-on and take ${him2}`);
				if (V.PC.belly >= 5000) {
					if (subSlave.belly >= 300000) {
						t.push(`over ${his2} own ${subBelly} belly. Such discomfort doesn't bother ${him2} since it means ${he2} gets to enjoy the sensation of your own gravid middle rubbing the small of ${his2} back`);
					} else {
						t.push(`on the edge of your desk. ${He2} doesn't mind the hard surface, not when it means your gravid middle is pushing against ${his2} ${subBelly} own`);
					}
					t.push(`as you languidly take ${him2}.`);
				} else {
					t.push(`on the couch, spooning so that ${his2}`);
					if (subSlave.belly >= 300000) {
						t.push(`immense gravidity can hang between your legs and towards the floor as you languidly take ${him2}. You have your arms as far around ${his2} middle as you can,`);
					} else {
						t.push(`${subBelly} heavy belly can rest comfortably as you languidly take ${him2}. You have your arms wrapped around ${his2} chest to cup both breasts,`);
					}
					t.push(`and ${he2} has ${his2} neck twisted back to kiss you.`);
				}
				if (subSlave.mpreg === 0 && canDoVaginal(subSlave) && subSlave.vagina > 0) {
					seX(subSlave, "vaginal", V.PC, "penetrative");
				} else if (canDoAnal(subSlave) && subSlave.anus > 0 && subSlave.mpreg === 1) {
					seX(subSlave, "anal", V.PC, "penetrative");
				}
			} else {
				t.push(`but ${his2} fertile hole is off limits at the moment, so ${he2}'ll have to settle for some cuddling instead. You embrace ${him2} on the couch,`);
				if (V.PC.belly >= 5000) {
					t.push(`as closely as you can with your own gravidity in the way and languidly fondle ${him2}; one arm wrapped around behind to ${his2} breast and the other alternating between fecund bulges. The two of you share a deep kiss as your bellies run against each other.`);
				} else {
					t.push(`spooning so that ${his2}`);
					if (subSlave.belly >= 300000) {
						t.push(`immense gravidity can hang between your legs and towards the floor as you languidly grope ${him2}. You have your arms wrapped as far around ${his2} middle as you can, savoring the motion beneath your palms,`);
					} else {
						t.push(`${subBelly} heavy belly can rest comfortably as you languidly fondle ${him2}. You have one arm wrapped around ${his2} middle to grope ${his2} ${subBelly} belly and the other to ${his2} breast,`);
					}
					t.push(`while ${he2} has ${his2} neck twisted back to kiss you.`);
				}
			}
		}
		t.push(`After you both finish and ${he2} leaves, smiling contentedly at you, you notice`);
		t.push(contextualIntro(subSlave, eventSlave, true));
		t.push(`at the door to your office. You call ${him} in.`);
		App.Events.addParagraph(node, t);
		t = [];

		t.push(`${eventSlave.slaveName} hesitates before explaining ${himself}, and the ${SlaveTitle(eventSlave)} is obviously aroused:`);
		if ((eventSlave.dick > 0) && (eventSlave.chastityPenis === 1)) {
			t.push(`${he}'s got a string of precum leaking out of ${his} chastity cage.`);
		} else if ((eventSlave.dick > 0) && (eventSlave.hormoneBalance >= 100)) {
			t.push(`though ${his} hormone-filled body can't get ${his} dick hard any more, ${he}'s got a string of precum coming off ${his} member.`);
		} else if (eventSlave.dick > 0 && eventSlave.balls > 0 && eventSlave.ballType === "sterile") {
			t.push(`though ${his} useless balls can't muster the effort to get ${his} dick hard any more, ${he}'s got a string of precum coming off ${his} limp member.`);
		} else if ((eventSlave.dick > 0) && (eventSlave.balls === 0)) {
			t.push(`though ${his} gelded body can't get ${his} dick hard any more, ${he}'s got a string of precum coming off ${his} limp member.`);
		} else if (canAchieveErection(eventSlave)) {
			if (eventSlave.dick > 4) {
				t.push(`${his} gigantic cock is standing out like a mast.`);
			} else if (eventSlave.dick > 2) {
				t.push(`${he}'s sporting an impressive erection.`);
			} else if (eventSlave.dick > 0) {
				t.push(`${his} little penis is rock hard.`);
			}
		} else if (eventSlave.dick > 7) {
			t.push(`${he}'s got a string of precum coming off ${his} engorged member.`);
		} else if (eventSlave.dick > 0) {
			t.push(`${he}'s got a string of precum coming off ${his} limp member.`);
		} else if (eventSlave.clit > 0) {
			t.push(`${his} large clit is visibly engorged.`);
		} else if (eventSlave.vagina > -1) {
			if (eventSlave.nipples !== "fuckable") {
				t.push(`${his} nipples are hard and`);
			}
			t.push(`there's a sheen on ${his} pussylips.`);
		} else if (eventSlave.balls > 0) {
			if (eventSlave.nipples !== "fuckable") {
				t.push(`${his} nipples are hard and`);
			}
			t.push(`there is a distinct dribble of precum running from ${his} featureless crotch.`);
		} else {
			if (eventSlave.nipples !== "fuckable") {
				t.push(`${his} nipples are hard and`);
			}
			t.push(`there is a clear scent of lust around ${him}.`);
		}
		t.push(`It seems ${he} passed by while you were enjoying the heavily pregnant ${subSlave.slaveName} and found the`);
		if (canSee(eventSlave)) {
			t.push(`sight`);
		} else if (canHear(eventSlave)) {
			t.push(`sounds`);
		} else {
			t.push(`sensations`);
		}
		t.push(`rather compelling. It should be possible to either encourage this fascination or steer ${him} away from it for now.`);


		App.Events.addParagraph(node, t);

		const responses = [];
		if (canPenetrate(eventSlave) && ((V.PC.preg >= 28 && V.PC.pregMood === 2) || V.PC.preg >= 36) && eventSlave.belly < 5000 && V.PC.vagina > 0) {
			responses.push(new App.Events.Result(`Sate your libido by giving ${him} a taste of lusty pregnant sex`, sate, "This option will penetrate you"));
		}

		if (isFertile(eventSlave) || ((eventSlave.ovaries === 1 || eventSlave.mpreg === 1) && eventSlave.pubertyXX === 0)) {
			responses.push(new App.Events.Result(`Turn ${him} into another fertility whore`, turnFertility));
		} else if (eventSlave.preg > 0) {
			responses.push(new App.Events.Result(`Turn ${him} into another pregnancy obsessed whore`, turnPregnancy));
		} else if (V.PC.belly >= 5000) {
			responses.push(new App.Events.Result(`Temper ${his} interest into a pregnancy obsession`, temperPregnancy));
		} else if (canAchieveErection(eventSlave)) {
			responses.push(new App.Events.Result(`Temper ${his} interest into an impregnation obsession`, temperImpregnation, (isPlayerReceptive(eventSlave) && V.PC.vagina > 0 && canImpreg(V.PC, eventSlave)) ? "This option may result in you getting knocked up" : null));
		} else {
			responses.push(new App.Events.Result(`Turn ${him} into another fertility whore despite ${his} barrenness`, turnBarren, ));
		}
		responses.push(new App.Events.Result(`Steer ${him} away from fertility obsession for the moment`, steer));

		App.Events.addResponses(node, responses);

		function turnIntro() {
			t = [];
			if (!canTalk(eventSlave)) {
				if (eventSlave.accent >= 3) {
					if (!hasAnyArms(eventSlave)) {
						t.push(`${He} takes a long, frustrating time for ${him} to communicate that ${he} would like you to make ${him} feel like you just made ${subSlave.slaveName} feel, since ${he} doesn't know the ${V.language} words for that nor has the hands to gesture it.`);
					} else {
						t.push(`${He} fumbles through a gestured explanation that ${he} would like you to make ${him} feel like you just made ${subSlave.slaveName} feel, since ${he} doesn't know the ${V.language} words for that.`);
					}
				} else if (eventSlave.voice === 0) {
					if (!hasAnyArms(eventSlave)) {
						t.push(`${He}'s mute and has no hands, so it takes a long, frustrating time for ${him} to communicate that ${he} would like`);
					} else {
						t.push(`${He}'s mute, so ${he} uses gestures to ask`);
					}
					t.push(`you to make ${him} feel like you just made ${subSlave.slaveName} feel.`);
				} else {
					t.push(`${He} can't form`);
					if (!hasAnyArms(eventSlave)) {
						t.push(`words and has no hands, so it takes a long, frustrating time for ${him} to communicate that ${he} would like`);
					} else {
						t.push(`words, so ${he} uses gestures to ask`);
					}
					t.push(`you to make ${him} feel like you just made ${subSlave.slaveName} feel.`);
				}
			} else {
				if (eventSlave.lips > 70) {
					t.push(`${He} asks through ${his} massive dick-sucking lips,`);
				} else if (eventSlave.piercing.lips.weight+eventSlave.piercing.tongue.weight > 2) {
					t.push(`${He} asks through ${his} big oral piercings,`);
				} else {
					t.push(`${He} asks,`);
				}
				t.push(Spoken(eventSlave, `"${capFirstChar(master)}, can — can I be — can I be like, you know, that?"`));
			}
			t.push(`You make ${him} state it more explicitly, so ${he} tries again:`);
			return t;
		}

		function turnFertility() {
			t = [];

			t.push(...turnIntro());
			if (!hasAnyArms(eventSlave) && !canTalk(eventSlave)) {
				t.push(`${he} wriggles around until ${his}`);
				if (eventSlave.mpreg === 1) {
					t.push(`ass`);
				}
				t.push(`pussy is pointed right at you.`);
			} else if (!canTalk(eventSlave)) {
				t.push(`${he} frantically pantomimes a pregnant belly, and lewdly gestures at ${his}`);
				if (eventSlave.mpreg === 1) {
					t.push(`butthole.`);
				} else {
					t.push(`cunt.`);
				}
			} else {
				t.push(Spoken(eventSlave, `"Please knock me up, ${master}!"`));
			}
			t.push(`You shove ${him} over the desk, rub`);
			if (V.PC.dick !== 0) {
				t.push(`your hard dick`);
			} else {
				t.push(`a squirt dildo`);
			}
			if (eventSlave.mpreg === 1) {
				if (canDoAnal(eventSlave)) {
					t.push(`around ${his} asspussy,`);
				} else {
					t.push(`between ${his} buttocks,`);
				}
			} else {
				if (canDoVaginal(eventSlave)) {
					t.push(`along ${his} pussylips,`);
				} else {
					t.push(`against ${his} inner thighs,`);
				}
			}
			t.push(`and ask if ${he} wants you to impregnate ${him}. ${He}'s almost beside ${himself}, shuddering at the titillation, but before ${he} can answer,`);
			if (eventSlave.mpreg === 1) {
				if (canDoAnal(eventSlave) && eventSlave.anus > 0) {
					t.push(`you slide`);
					if (V.PC.dick === 0) {
						t.push(`a strap-on`);
					} else {
						t.push(`your cock`);
					}
					t.push(`into ${his} rear and give ${him} a pounding that leaves ${him} begging for what's to come.`);
					if (V.PC.dick !== 0) {
						t.push(`When you start to feel your climax approaching,`);
					} else {
						t.push(`Once you've thoroughly enjoyed yourself,`);
					}
					t.push(`you tell ${him} that pregnancy is a very special reward for very good slaves, and you might give it to ${him} one day — but that ${he} doesn't deserve it yet. With that, you slide out of ${his} ass and paint ${his} back with`);
					if (V.PC.dick !== 0) {
						t.push(`your cum.`);
					} else {
						t.push(`a few squirts from the dildo.`);
					}
					t.push(VCheck.Anal(eventSlave, 1));
				} else {
					t.push(`you tell ${him} that pregnancy is a very special reward for very good slaves, and you might give it to ${him} one day — but that ${he} doesn't deserve it yet. With that, you run your hands across the quivering slave's belly; pantomiming it swelling with child and sending ${him} over the edge.`);
				}
			} else {
				if (canDoVaginal(eventSlave) && eventSlave.vagina > 0) {
					t.push(`you slide`);
					if (V.PC.dick === 0) {
						t.push(`a strap-on`);
					} else {
						t.push(`your cock`);
					}
					t.push(`into ${his} vagina and give ${him} a pounding that leaves ${him} begging for what's to come.`);
					if (V.PC.dick !== 0) {
						t.push(`When you start to feel your climax approaching,`);
					} else {
						t.push(`Once you've thoroughly enjoyed yourself,`);
					}
					t.push(`you tell ${him} that pregnancy is a very special reward for very good slaves, and you might give it to ${him} one day — but that ${he} doesn't deserve it yet. With that, you slide out of ${his} pussy and paint the quivering slave's belly with`);
					if (V.PC.dick !== 0) {
						t.push(`your cum.`);
					} else {
						t.push(`a few squirts from the dildo.`);
					}
					t.push(VCheck.Vaginal(eventSlave, 1));
				} else {
					t.push(`you tell ${him} that pregnancy is a very special reward for very good slaves, and you might give it to ${him} one day — but that ${he} doesn't deserve it yet. With that, you run your hands across the quivering slave's belly; pantomiming it swelling with child and sending ${him} over the edge.`);
				}
			}
			t.push(`<span class="devotion inc">${He} has become more devoted to you,</span> and <span class="fetish gain">${he} is desperately eager to get pregnant.</span>`);
			eventSlave.devotion += 4;
			eventSlave.fetish = "pregnancy";
			eventSlave.fetishKnown = 1;
			eventSlave.fetishStrength = 65;
			return t;
		}

		function turnPregnancy() {
			t = [];

			t.push(...turnIntro());
			if (!hasAnyArms(eventSlave) && !canTalk(eventSlave)) {
				t.push(`${he} wriggles around until ${his}`);
				if (eventSlave.mpreg === 1) {
					t.push(`ass`);
				}
				t.push(`pussy is pointed right at you.`);
			} else if (!canTalk(eventSlave)) {
				t.push(`${he}`);
				if (eventSlave.belly >= 1500) {
					t.push(`caresses ${his} ${bellyAdjective(eventSlave)}`);
				} else {
					t.push(`frantically pantomimes a pregnant`);
				}
				t.push(`belly, and lewdly gestures at ${his}`);
				if (eventSlave.mpreg === 1) {
					t.push(`butthole.`);
				} else {
					t.push(`cunt.`);
				}
			} else {
				t.push(Spoken(eventSlave, `"Please knock me up, ${master}!"`));
			}
			t.push(`You direct ${him} to the couch and run a hand along ${his} stomach, reminding ${him} that ${he} is already pregnant and efforts to knock ${him} up more won't satisfy ${his} craving. However, ${he}'s already got the pregnancy part covered, all ${he} needs to feel whole is to use ${his} gravid body to please you. ${He} shudders with anticipation at the realization as you`);
			if (eventSlave.belly >= 300000 || (V.PC.belly+eventSlave.belly >= 30000)) {
				t.push(`spin ${him} around to accommodate`);
				if (eventSlave.belly >= 300000) {
					t.push(`${his} belly`);
				} else {
					t.push(`your pregnancy`);
				}
				t.push(`and`);
			}
			if (eventSlave.mpreg === 1) {
				if (canDoAnal(eventSlave) && eventSlave.anus > 0) {
					t.push(`slide your`);
					if (V.PC.dick === 0) {
						t.push(`strap-on`);
					} else {
						t.push(`cock`);
					}
					t.push(`into ${his} rear. You lean in to run your hands across the quivering slave's belly as you focus on breeding the already fecund bitch.`);
					if (V.PC.dick !== 0) {
						t.push(`When you start to feel your climax approaching,`);
					} else {
						t.push(`Once you've thoroughly enjoyed yourself,`);
					}
					t.push(`you tell ${him} that pregnancy is a very special reward for very good slaves, and if ${he} keeps being a good ${girl} you'll be sure to keep ${him} swollen with child. With that, you hilt yourself and`);
					if (V.PC.dick !== 0) {
						t.push(`flood ${his} rectum with your cum.`);
					} else {
						t.push(`repeatedly pump bursts of cum out of your toy into ${his} bowels.`);
					}
					t.push(VCheck.Anal(eventSlave, 1));
				} else {
					t.push(`you tell ${him} that pregnancy is a very special reward for very good slaves, and if ${he} keeps being a good ${girl} you'll be sure to keep ${him} swollen with child. With that, you run your hands across the quivering slave's ${bellyAdjective(eventSlave)} belly, pantomiming it swelling to an obscene size with children and sending ${him} over the edge.`);
				}
			} else {
				if (canDoVaginal(eventSlave) && eventSlave.vagina > 0) {
					t.push(`slide your`);
					if (V.PC.dick === 0) {
						t.push(`strap-on`);
					} else {
						t.push(`cock`);
					}
					t.push(`into ${his} pussy. You lean in to run your hands across the quivering slave's belly as you focus on breeding the already fecund bitch.`);
					if (V.PC.dick !== 0) {
						t.push(`When you start to feel you climax approaching,`);
					} else {
						t.push(`Once you've thoroughly enjoyed yourself,`);
					}
					t.push(`you tell ${him} that pregnancy is a very special reward for very good slaves, and if ${he} keeps being a good ${girl} you'll be sure to keep ${him} swollen with child. With that, you hilt yourself and`);
					if (V.PC.dick !== 0) {
						t.push(`flood ${his} cunt with your cum.`);
					} else {
						t.push(`repeatedly pump bursts of cum into ${him} until it flows out around your toy.`);
					}
					t.push(VCheck.Vaginal(eventSlave, 1));
				} else {
					t.push(`you tell ${him} that pregnancy is a very special reward for very good slaves, and if ${he} keeps being a good ${girl} you'll be sure to keep ${him} swollen with child. With that, you run your hands across the quivering slave's ${bellyAdjective(eventSlave)} belly, pantomiming it swelling to an obscene size with children and sending ${him} over the edge.`);
				}
			}
			t.push(`<span class="devotion inc">${He} has become more devoted to you,</span> and <span class="fetish gain">${he} is desperately eager to get pregnant.</span>`);
			eventSlave.devotion += 4;
			eventSlave.fetish = "pregnancy";
			eventSlave.fetishKnown = 1;
			eventSlave.fetishStrength = 65;
			return t;
		}

		function temperIntro(kink1 = "insemination", kink2 = "sex"){
			t = [];

			if (!canTalk(eventSlave)) {
				if (eventSlave.accent >= 3) {
					if (!hasAnyArms(eventSlave)) {
						t.push(`It takes a long, frustrating time for ${him} to communicate that ${he}'s fascinated by pregnancy, since ${he} doesn't know the ${V.language} words for things like ${kink1} and swollen belly, nor has the hands to gesture it.`);
					} else {
						t.push(`${He} fumbles through a gestured explanation that ${he}'s fascinated by pregnancy, since ${he} doesn't know the ${V.language} words for things like ${kink1} and swollen belly.`);
					}
				} else if (eventSlave.voice === 0) {
					if (!hasAnyArms(eventSlave)) {
						t.push(`${He}'s mute and has no hands, so it takes a long, frustrating time for ${him} to communicate that ${he}'s fascinated by pregnancy.`);
					} else {
						t.push(`${He}'s mute, so ${he} uses gestures to communicate ${his} attraction to the pregnant ${kink2}.`);
					}
				} else {
					t.push(`${He} can't form`);
					if (!hasAnyArms(eventSlave)) {
						t.push(`words and has no hands, so it takes a long, frustrating time for ${him} to communicate that ${he}'s fascinated by pregnancy.`);
					} else {
						t.push(`words, so ${he} uses gestures to communicate ${his} attraction to the pregnant ${kink2}.`);
					}
				}
			} else {
				if (eventSlave.lips > 70) {
					t.push(`${He} ${say}s through ${his} massive dick-sucking lips,`);
				} else if (eventSlave.piercing.lips.weight+eventSlave.piercing.tongue.weight > 2) {
					t.push(`${He} ${say}s through ${his} big oral piercings,`);
				} else {
					t.push(`${He} ${say}s,`);
				}
				t.push(Spoken(eventSlave, `"${capFirstChar(master)}, I don't know. I just thought that was really hot."`));
			}
			return t;
		}

		function temperPregnancy() {
			t = [];

			t.push(...temperIntro("gravid", "figure"));
			t.push(`You gently lower your pregnant self onto the couch and ask ${him} whether ${he} wants to get pregnant too; as ${he} starts to answer you grunt and rub your`);
			if (V.PC.belly >= 120000) {
				t.push(`massive baby bump with both hands`);
			} else if (V.PC.belly >= 100000) {
				t.push(`massive baby bump`);
			} else if (V.PC.belly >= 60000) {
				t.push(`giant baby bump`);
			} else if (V.PC.belly >= 15000) {
				t.push(`huge baby bump`);
			} else if (V.PC.belly >= 10000) {
				t.push(`big baby bump`);
			} else if (V.PC.belly >= 5000) {
				t.push(`baby bump`);
			}
			t.push(`before informing ${him} that`);
			if (V.PC.pregType > 1) {
				t.push(`they've`);
			} else {
				t.push(`your child's`);
			}
			t.push(`been so active lately. You continue fondling your pregnancy, watching ${his} face progressively redden until ${he} frames a response:`);
			if (!hasAnyArms(eventSlave) && !canTalk(eventSlave)) {
				if (canPenetrate(eventSlave)) {
					t.push(`${he} wriggles around until ${his} throbbing erection is pointed right at you.`);
				} else {
					t.push(`${he} does everything in ${his} power to gesture towards your gravid middle.`);
				}
			} else if (!canTalk(eventSlave)) {
				t.push(`${he} points at your gravid middle before quivering with lust.`);
			} else {
				t.push(Spoken(eventSlave, `"You're so hot, ${master}!"`));
			}
			t.push(`You tell ${him} that getting to spend time with your gravid swell is a very special reward for very good slaves, and if ${he} keeps being a good ${girl} you'll make sure ${he} gets the chance to lavish attention on it. With that, you pull ${him} in and hug ${him} to your stomach, sending ${him} over the edge.`);
			t.push(`<span class="devotion inc">${He} has become more devoted to you,</span> and <span class="fetish gain">${he} has developed a pregnancy fetish.</span>`);
			eventSlave.devotion += 4;
			eventSlave.fetish = "pregnancy";
			eventSlave.fetishKnown = 1;
			eventSlave.fetishStrength = 65;
			return t;
		}

		function temperImpregnation() {
			t = [];

			t.push(...temperIntro("impregnation"));
			t.push(`You ask ${him} whether ${he} wants to get pregnant too, and ${he} reddens before shaking ${his} head. You force ${him} to frame a response:`);
			if (!hasAnyArms(eventSlave) && !canTalk(eventSlave)) {
				t.push(`${he} wriggles around until ${his} throbbing erection is pointed right at you.`);
			} else if (!canTalk(eventSlave)) {
				t.push(`${he} pantomimes a pregnant belly before stroking the length of ${his} cock.`);
			} else {
				t.push(Spoken(eventSlave, `"I would love to knock someone up, ${master}!"`));
			}
			if (isPlayerReceptive(eventSlave)) {
				if (V.PC.vagina === 0) {
					t.push(`You pull ${him} onto the couch, begin jacking ${him} off, and ask if ${he} wants to impregnate a girl. ${He}'s almost beside ${himself}, shuddering at the titillation, but before ${he} can answer, you tell ${him} that your pussy is still unused, and you intend to keep it that way for now. Penetrating you for the first time would be a very special reward for the only very best slave, and ${he} doesn't deserve it yet...but you teasingly dangle the possibility for the future. With that, you up your pace until ${he} sprays cum across ${his} own stomach.`);
				} else {
					t.push(`You push ${him} onto the couch, line yourself up with ${his} throbbing erection, and ask if ${he} wants to impregnate a girl. ${He}'s almost beside ${himself}, shuddering at the titillation, but before ${he} can answer, you tell ${him} that getting to use ${his} dick is a very special reward for very good slaves, and you might give it to ${him} one day — but that ${he} doesn't deserve it yet. With that, you tease the tip of ${his} penis with your pussy; a clear mistake, as this sets ${him} over the edge. ${He} can only gasp wordlessly over having just accidentally came in ${his} ${getWrittenTitle(eventSlave)}, something you take full advantage of. You clearly inform ${him} that you were fertile. <span style="italic">Were.</span> You continue to tease the blooming impregnation fetishist with descriptions of how hard it will be for you so heavily laden with child and how ${he} had better plan on taking responsibility. ${He} can't take it and releases another spurt of cum, this time onto ${himself};`);
					if (canImpreg(V.PC, eventSlave)) {
						knockMeUp(V.PC, 20, 0, eventSlave.ID);
						t.push(`you aren't taking more chances with ${him}.`);
					} else {
						t.push(`you can't actually get pregnant right now, but ${he} doesn't need to know that.`);
					}
				}
			} else {
				t.push(`You pull ${him} onto the couch, begin jacking ${him} off, and ask if ${he} wants to impregnate a girl. ${He}'s almost beside ${himself}, shuddering at the titillation, but before ${he} can answer, you tell ${him} that getting to use ${his} dick is a very special reward for very good slaves, and you might give it to ${him} one day — but that ${he} doesn't deserve it yet. With that, you up your pace until ${he} sprays cum across ${his} own stomach.`);
			}
			t.push(`<span class="devotion inc">${He} has become more devoted to you,</span> and <span class="fetish gain">${he} has developed a pregnancy fetish.</span>`);
			eventSlave.devotion += 4;
			eventSlave.fetish = "pregnancy";
			eventSlave.fetishKnown = 1;
			eventSlave.fetishStrength = 65;
			return t;
		}

		function turnBarren() {
			t = [];

			t.push(...temperIntro());
			t.push(`You ask ${him} whether ${he} wants to get pregnant too, and ${he} reddens, knowing ${he} can't. You force ${him} to frame a response:`);
			if (!hasAnyArms(eventSlave) && !canTalk(eventSlave)) {
				t.push(`${he} wriggles around until ${his}`);
				if (eventSlave.mpreg === 1) {
					t.push(`ass`);
				}
				t.push(`pussy is pointed right at you.`);
			} else if (!canTalk(eventSlave)) {
				t.push(`${he} pantomimes a pregnant belly, and uses gestures to indicate arousal.`);
			} else {
				t.push(Spoken(eventSlave, `"I would love to get pregnant, ${master}!"`));
			}
			t.push(`You shove ${him} over the desk, rub your hard dick between ${his} slick thighs, and ask if ${he} wants you to impregnate ${him}. ${He}'s almost beside ${himself}, shuddering at the titillation, but before ${he} can answer, you tell ${him} that it's a pointless dream, ${he}'ll never be pregnant, but that doesn't mean ${he} can't fuck pregnant girls. Or fertile girls. Perhaps you'll even take the time to simulate a pregnancy with ${him}, if ${he}'s particularly well behaved, you hint as you rub your hands across the quivering slave's belly. <span class="devotion inc">${He} has become more devoted to you,</span> and <span class="fetish gain">${he} has developed a pregnancy fetish.</span>`);
			eventSlave.devotion += 4;
			eventSlave.fetish = "pregnancy";
			eventSlave.fetishKnown = 1;
			eventSlave.fetishStrength = 65;
			return t;
		}

		function sate() {
			t = [];

			t.push(...temperIntro());
			if (V.PC.pregMood === 2) {
				t.push(`You ask ${him} if ${he} gets off from pregnant sex, causing ${him} to redden. Before ${he} can frame a response, you've got ${him} on the floor, pinned beneath your`);
				if (V.PC.belly >= 100000) {
					t.push(`crushingly`);
				}
				t.push(`gravid bulk with ${his} dick hilted in your needy pussy. You skip all pretense and ride ${him} long and hard until ${he}'s exhausted and your libido a little lighter. When you finally do release ${him} from your lust, ${he} can barely rise`);
				if (hasBothLegs(eventSlave)) {
					t.push(`to ${his} feet`);
				} else {
					t.push(`up`);
				}
				t.push(`you may have ridden ${him} <span class="health dec">a little too hard.</span> You remind ${him} that ${he} was saying something; in response,`);
				if (!canTalk(eventSlave)) {
					t.push(`${he} pantomimes a pregnant belly, your pregnant belly, and uses gestures to how much ${he} enjoyed it atop ${him}.`);
				} else {
					t.push(Spoken(eventSlave, `"Pregnant sex with ${master} is the best!"`));
				}
				t.push(`${He} has become <span class="devotion inc">more devoted to you,</span> <span class="gold">mostly out of fear of your sexual appetite,</span> but <span class="fetish gain">with a newfound pregnancy fetish,</span> even if though you got a little domineering.`);
				eventSlave.devotion += 4;
				eventSlave.trust -= 4;
				healthDamage(eventSlave, 5);
				seX(eventSlave, "penetrative", V.PC, "vaginal", 3);
			} else if (V.PC.pregMood === 1) {
				t.push(`You ask ${him} if ${he} finds you attractive, even with such a`);
				if (V.PC.belly >= 100000) {
					t.push(`massive`);
				} else if (V.PC.belly >= 60000) {
					t.push(`giant`);
				} else if (V.PC.belly >= 15000) {
					t.push(`huge`);
				} else if (V.PC.belly >= 10000) {
					t.push(`big`);
				}
				t.push(`belly, and ${he} reddens, knowing ${he} can't say no. You kindly ask ${him} again, pushing ${him} to frame a response:`);
				if (!canTalk(eventSlave)) {
					t.push(`${he} pantomimes a pregnant belly, your pregnant belly, and uses gestures to indicate arousal.`);
				} else {
					t.push(Spoken(eventSlave, `"Of course I find you attractive, ${master}, but the way your belly bulges out so far and the way it moves when you use us just... It turns me on so much lately!"`));
				}
				t.push(`You waddle to the couch, slowly settle yourself onto it, and spread your legs wide, revealing your aching sex. ${He}'s almost beside ${himself}, shuddering at the invitation, but before ${he} can answer, you struggle forward and pull ${him} onto you. ${He} wastes no more time on words, instead trying ${his} hardest to split ${his} focus between filling your pussy and molesting your gravid swell. Mentally, you are in no position to control ${his} actions, being in such a hormonal state, but ${he} doesn't overstep ${his} boundaries and dutifully brings you to orgasm. Even better, once ${he} is satisfied, ${he} still doesn't leave your vulnerable side, instead cozying up for some post-coital quality time with ${his} fecund ${getWrittenTitle(eventSlave)}.`);
				t.push(`${He} has become <span class="devotion inc">much more devoted to you,</span> <span class="mediumaquamarine">more trusting of you,</span> and <span class="fetish gain">${he} has developed a pregnancy fetish.</span>`);
				eventSlave.devotion += 6;
				eventSlave.trust += 4;
				seX(eventSlave, "penetrative", V.PC, "vaginal");
			} else {
				t.push(`You order ${him} to lie down on the couch, an order ${he} follows dutifully. You correct ${him}; ${he} should be on ${his} back for what's to come. ${He}'s almost beside ${himself}, shuddering at the prospect of pregnant sex, but first, you ask ${him} if the thought of being ridden by such a gravid woman turns ${him} on. ${He} turns red, but before ${he} has the chance to formulate an answer, you've got ${his} telltale erection lined up with your needy pussy. You force ${him} to frame a response:`);
				if (!canTalk(eventSlave)) {
					t.push(`${he} only manages a nod before you spear yourself on ${his} dick. This was happening either way.`);
				} else {
					t.push(Spoken(eventSlave, `"Yes, ${master}, that must feel ama-"`), `${his} voice catches as you spear yourself on ${his} dick. ${His} answer really didn't matter since ${his} cock already spilled ${his} thoughts.`);
				}
				t.push(`You begin riding ${him}, eager to scratch that growing itch that's been hounding you lately, only to find ${his}`);
				if (hasAnyArms(eventSlave)) {
					t.push(`hand${hasBothArms(eventSlave) ? "s" : ""} tracing your`);
				} else {
					t.push(`face nuzzling your`);
				}
				if (V.PC.belly >= 100000) {
					t.push(`massive`);
				} else if (V.PC.belly >= 60000) {
					t.push(`giant`);
				} else if (V.PC.belly >= 15000) {
					t.push(`huge`);
				} else if (V.PC.belly >= 10000) {
					t.push(`big`);
				}
				t.push(`baby bump as you bounce. ${He} takes an active role in being used like this, not that it surprises you, but ${his} interest in your middle is what you wanted to see. You've <span class="fetish gain">driven ${him} to embrace ${his} pregnancy fetish.</span> As you dismount, you remind ${him} that getting to sate ${his}`);
				t.push(`${getWrittenTitle(eventSlave)}'s growing libido like this is a very special reward for very good slaves, and it would do ${him} well to remain in your favor. <span class="devotion inc">${He} wholeheartedly agrees.</span>`);
				eventSlave.devotion += 6;
				seX(eventSlave, "penetrative", V.PC, "vaginal");
			}
			eventSlave.fetish = "pregnancy";
			eventSlave.fetishKnown = 1;
			eventSlave.fetishStrength = 65;
			return t;
		}

		function steer() {
			t = [];
			let blueballs = false;
			t.push(`Good slaves get aroused according to their masters' whim, not their own silly tendencies. You call ${eventSlave.slaveName} over before ${he} can give voice to ${his} interest in pregnancy, and`);
			if (canDoVaginal(eventSlave) && eventSlave.vagina > 0) {
				t.push(`gently fuck ${him}`);
				if (V.PC.dick === 0) {
					t.push(`with a strap-on`);
				}
				if (eventSlave.mpreg === 1) {
					t.push(`making the disassociation between sex and procreation explicit.`);
				} else {
					t.push(`until ${he} orgasms, making it clear that the thought of procreation is completely unneeded for ${him} to feel good.`);
					blueballs = (V.PC.dick && canGetPregnant(eventSlave));
				}
				seX(eventSlave, "vaginal", V.PC, "penetrative");
			} else if (canDoAnal(eventSlave) && eventSlave.anus > 0) {
				t.push(`gently fuck ${his} ass`);
				if (V.PC.dick === 0) {
					t.push(`with a strap-on`);
				}
				t.push(`until ${he} orgasms,`);
				if (eventSlave.mpreg === 1) {
					t.push(`until ${he} orgasms, making it clear that the thought of procreation is completely unneeded for ${him} to feel good.`);
					blueballs = (V.PC.dick && canGetPregnant(eventSlave));
				} else {
					t.push(`making the disassociation between sex and procreation explicit.`);
				}
				seX(eventSlave, "anal", V.PC, "penetrative");
			} else {
				t.push(`gently tease ${him} until ${he} orgasms, making it clear that the thought of procreation is completely unneeded for ${him} to feel good.`);
			}
			t.push(`You'll keep an eye on ${him}, and with this correction <span class="devotion inc">${he}'ll become more submissive to you.</span>`);
			if (blueballs) {
				t.push(`You wait until ${he} is out of earshot before losing your composure and blowing your backed up load. Risking a pregnancy in such an uncertain slave would surely complicate ${his} mental development, so sometimes burdens have to be taken up.`);
			}
			eventSlave.devotion += 4;
			return t;
		}
	}
};
