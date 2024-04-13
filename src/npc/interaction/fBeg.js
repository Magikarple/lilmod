// cSpell:ignore misandristic

/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.Interact.fBeg = function(slave) {
	const frag = new DocumentFragment();

	const {
		He, His,
		he, his, him, himself, woman, girl
	} = getPronouns(slave);

	const {
		hisP,
	} = getPronouns(V.PC).appendSuffix("P");

	const {womenU} = getNonlocalPronouns(V.seeDicks).appendSuffix("U");
	const hands = hasBothArms(slave) ? "hands" : "hand";
	const knees = hasBothLegs(slave) ? "knees" : "knee";

	const {title: Master, say: say} = getEnunciation(slave);

	const text = new SpacedTextAccumulator(frag);

	// TODO: priority! femPC support!
	// TODO: checks for canWalk() to see how easily she can move, blindness checks, replacement for BoobsDesc, maybe devotion
	// TODO: catches for certain flaws

	text.push(
		intro(),
		setup(),
		consummation(),
	);

	if (random(1, 100) > (100 + slave.devotion)) {
		text.push(slaveGainsFlaw());
	} else if (random(1, 100) > (110 - slave.devotion)) {
		text.push(slaveGainsQuirk());
	}

	text.toParagraph();

	return frag;

	function intro() {
		const text = [];
		// TODO: this part needs expansion
		text.push(`You call ${him} over to you for inspection. ${App.Desc.boobs(slave)}`);

		return text.join(' ');
	}

	function setup() {
		const text = [];

		text.push(`You look at ${him} ${isPlayerLusting() ? "lustfully " : ""} and instruct ${him} to strip.`);

		if (slave.sexualFlaw === "shamefast") {
			text.push(`Tears well up in ${his} eyes at the idea of showing ${his} naked body.`);
		} else if (slave.sexualQuirk === "tease") {
			text.push(`${He} blushes with arousal. ${He} has kept ${his} innate embarrassment at the thought of being naked, but you have infused this with overwhelming arousal. ${His} cheeks are red as ${he} removes ${his} clothes, giving quite a strip tease as ${he} does.`);
		} else if (slave.sexualFlaw === "repressed") {
			text.push(`${He} subconsciously uses ${his} ${hands} to try to cover ${his} body. ${He} is still repressing ${his} own sexuality. That type of behavior may have been allowed in the old world, but it has no place in a Free City.`);
		} else if (slave.sexualFlaw === "idealistic") {
			text.push(`${He} shakes ${his} head pleadingly. ${Spoken(slave, `"But I don't consent,"`)} ${he} responds. You laugh in such a way that tells ${him} that ${his} consent is irrelevant. ${He} is still idealistic, believing that sex should be a consensual expression of love and intimacy. Such ideas were common in the Old World, but they have no place in a Free City. You decide to grab ${him} and forcefully rip ${his} clothes from ${his} body, since obedience could simply be seen as consent. ${He} screams and plead as you`);

			if (hasBothArms(slave)) {
				text.push(`pin ${his} arms,`);
			} else {
				text.push(`hold ${him} in place,`);
			}

			text.push(`ripping and tearing at the cloth that keeps ${his} beauty from sight.`);
		} else if (slave.sexualFlaw === "neglectful") {
			text.push(`${He} replies ${Spoken(slave, `"Yes, ${slave.rudeTitle ? PoliteRudeTitle(slave) : Master},""`)} ${he} replies contritely. ${He} has no sense of self beyond your usefulness of ${him}, and selflessly sacrifices ${his} own comfort for your pleasure.`);
		} else if (slave.sexualFlaw === "attention whore") {
			text.push(`${He} eagerly begins to shirk ${his} wear, drawing as much attention to the process as possible.`);
		} else {
			if (slave.devotion < -20) {
				text.push(`${He} resists, forcing you to undress ${him} yourself.`);
			} else if (slave.devotion >= -20) {
				text.push(`${He} obeys, and moves to the center of your office to disrobe for you.`);
			}
		}

		return text.join(' ');
	}

	function consummation() {
		const text = [];

		if (slave.devotion >= -20) {
			text.push(`${He} begins to undress with`);

			if (slave.skill.entertainment >= 100) {
				text.push(`masterful skill, teasing and taunting all the way down. ${He} rolls ${his} hips and most sexual parts as ${he} removes ${his} clothing.`);
			} else if (slave.skill.entertainment >= 80) {
				text.push(`arousing skill. Even though the goal is just to get ${him} naked, your slave knows that ${his} job is to entertain you with ${his} every move.`);
			} else if (slave.skill.entertainment >= 50) {
				text.push(`notable skill. ${He} takes the opportunity to give you a light strip tease as ${he} undresses.`);
			} else if (slave.skill.entertainment >= 20) {
				text.push(`a decent effort. ${He} isn't your most entertaining slave, but ${he} still makes an effort to arouse you with ${his} undressing.`);
			} else if (slave.skill.entertainment >= 9) {
				text.push(`some effort to be sexy. ${His} moves are less than skillful and the undressing is more pragmatic than arousing.`);
			} else {
				text.push(`no effort to be sexy. ${He} has no entertainment skill, and the only goal of ${his} actions is to go from clothed to naked.`);
			}
		}

		if (slave.fetishStrength > 60) {
			switch (slave.fetish) {
				case "submissive":
					text.push(`As ${he} begins to strip you grab ${him} without warning and begin to tear off ${his} clothes. Your slave expected you to allow ${him} to obey your command, and so ${he} is initially taken aback by the sudden force but ${his} submissive nature keeps ${him} from resisting. ${He} is such a submissive slut that you feel obligation to push ${his} status even further. You bind ${his} arms tightly behind ${his} back in a leather monoglove, lacing it tighter until ${his} elbows are touching. ${He} gives a soft whimper, but you both know that this is for your benefit and not a protest.`);

					if (slave.piercing.nipple.weight >= 1) {
						text.push(`You then retrieve heavy bells and attach them to ${his} nipple rings.`);
					} else {
						text.push(`You reach into your pocket and retrieve two weighted and belled nipple clamps, attaching them tightly to your slave's delicate nipples.`);
					}

					text.push(`You tell ${him} to bounce so that they jingle, reminding ${him} of ${his} status.`);

					break;
				case "masochist":
					text.push(`Once ${he} is fully exposed you give ${him} a firm slap across the tits. ${He}'s a masochist and relishes the pain with sexual arousal. You ask your painslut if ${he} deserves to be punished. ${Spoken(slave, `"Oh yes, ${slave.rudeTitle === 1 ? PoliteRudeTitle(slave) : Master}. Please punish your little slut."`)} Sensing that your slave is getting too much enjoyment from ${his} beating, you cease.`);

					break;
			}
		}

		text.push(`You stare at the naked figure standing before you.`);

		if (canSee(slave)) {
			if (slave.boobsTat === "rude words") {
				text.push(`The words on ${his} chest stand out at you. You ask ${him} what ${his} tits say. ${Spoken(slave, `"Fuckslave,"`)} ${he} replies. You ask if that's what ${he} is.`);

				if (slave.behavioralFlaw === "liberated") {
					text.push(`${Spoken(slave, `"I'm nobody's property. I'm a free ${woman}!"`)} ${he} shoots back. ${Spoken(slave, `"We shall see," you reply.`)}`);
				} else if (slave.devotion < -20) {
					text.push(`${He} does ${his} best to shake ${his} head.`);
				} else {
					text.push(Spoken(slave, `"Yes ${Master}, that's what I am."`));
				}
			} else if (slave.boobsTat === "possessive") {
				text.push(`The words on ${his} chest stand out at you. You ask ${him} what ${his} tits say. ${Spoken(slave, `"It's your personal symbol,"`)} ${he} replies. You ask if that's what ${he} is.`);
				if (slave.behavioralFlaw === "liberated") {
					text.push(Spoken(slave, `"I'm nobody's property. I'm a free ${woman}!" ${he} shoots back. ${Spoken(slave, `"We shall see," you reply.`)}`));
				} else if (slave.devotion < -20) {
					text.push(`${He} does ${his} best to shake ${his} head.`);
				} else {
					text.push(Spoken(slave, `"Yes, ${Master} that's what I am."`));
				}
			} else if (slave.boobsTat === "degradation") {
				text.push(`The words on ${his} chest stand out at you. You ask ${him} what ${his} tits say. " ${Spoken(slave, `${Master}'s Bitch,"`)} ${he} replies. You ask if that's what ${he} is.`);

				if (slave.behavioralFlaw === "liberated") {
					text.push(Spoken(slave, `"I'm nobody's property. I'm a free ${woman}!" ${he} shoots back. ${Spoken(slave, `"We shall see," you reply.`)}`));
				} else if (slave.devotion < -20) {
					text.push(`${He} does ${his} best to shake ${his} head.`);
				} else {
					text.push(Spoken(slave, `"Yes ${Master}, that's what I am."`));
				}
			} else {
				text.push(`${His} body belongs to you, and your slave needs to remember that.`);
			}
		} else {
			text.push(`${His} body belongs to you, and your slave needs to remember that.`);
		}

		text.push(`You then tell your slave to kneel at your feet.`);

		if (slave.behavioralFlaw === "bitchy") {
			text.push(`${He} rolls ${his} eyes at you. ${Spoken(slave, `"Whatever,"`)} ${he} scoffs and`);
		} else if (slave.behavioralFlaw === "arrogant") {
			text.push(`${He} stands up even straighter than before,`);

			if (hasBothArms(slave)) {
				text.push(`crossing ${his} arms and`);
			}

			text.push(`widening ${his} stance. ${His} arrogance makes obeying commands like this difficult, but that is not your concern. You give ${him} a look that tells ${him} that pain will await if ${he} does not obey. ${He}`);
		} else if (slave.behavioralQuirk === "confident") {
			text.push(`${He} confidently moves to obey. ${He}`);
		} else if (slave.behavioralFlaw === "liberated") {
			text.push(`${He} stands up even straighter than before,`);

			if (hasBothArms(slave)) {
				text.push(`crossing ${his} arms and`);
			}

			text.push(`widening ${his} stance. ${Spoken(slave, `"I am not some animal,"`)} ${he} protests, ${Spoken(slave, `"I am a free ${woman}."`)} You laugh at ${his} continued delusions. Liberated ${womenU} have no place in a Free City. You remind ${him} that pain awaits ${him} should ${he} defy you further and ${he}`);
		} else if (slave.behavioralQuirk === "advocate") {
			text.push(`${He} smiles at the demonstration of ${his} rightful place as a lowly slave. ${He}`);
		} else if (slave.behavioralFlaw === "odd") {
			text.push(`${He} sticks ${his} tongue out at you, blowing raspberries in an act of futile defiance. ${He} really is an odd one. ${He}`);
		} else if (slave.behavioralQuirk === "funny") {
			text.push(`${He} smiles and turns ${his} butt to you, swaying it cutely as ${his} silly way of acknowledging your command. ${He}`);
		} else {
			text.push(`${He}`);
		}

		if (slave.devotion < -20) {
			if (slave.trust < -50) {
				text.push(`drops terrified to the ground.`);
			} else {
				if (!canTalk(slave)) {
					text.push(`gestures`);
				} else if (SlaveStatsChecker.checkForLisp(slave)) {
					text.push(`lisps`);
				} else {
					text.push(`declares`);
				}

				text.push(`angrily that slavery is wrong and ${he} will not bow. You look at your assistant who silently summons two other, more obedient slaves from their duties.`);

				if (slave.piercing.nipple.weight > 1) {
					text.push(`You reach out and grab ${him} by ${his} nipple chain, pulling ${him} in harshly. ${He} yelps in pain, but knows better than to pull away.`);
				} else if (slave.piercing.nose.weight > 1) {
					text.push(`You reach out and grab ${him} by ${his} nose ring, pulling ${him} in harshly. ${He} yelps in pain, but knows better than to pull away.`);
				} else {
					text.push(`You reach out and grab ${him} firmly by the collar.`);
				}

				text.push(`"One more chance, slut." By now, the other slaves have arrived and are standing loyally by your side. Your loyal slaves force ${him} to`);

				if (hasAnyLegs(slave)) {
					text.push(`${his} ${knees}.`);
				} else {
					text.push(`the ground.`);
				}
			}

			text.push(`"Head at crotch level," you clarify. "Remember your purpose."`); // TODO: remove player voice
		} else if (slave.devotion < 20) {
			text.push(`is not enthusiastic, but is obedient enough to go down without much threat of discipline.`);
		} else if (slave.devotion > 20) {
			if (slave.fetishKnown === 1) {
				switch (slave.fetish) {
					case "submissive":
						text.push(`bows ${his} head and humbly assumes ${his} rightful position at ${his} ${getWrittenTitle(slave)}'s feet.`);
						break;
					case "dom":
						text.push(`would rather be standing by your side making your other sluts bow, but ${he} still knows that you are ${his} ${getWrittenTitle(slave)}.`);
						break;
					case "sadist":
						text.push(`would rather be pushing one of your other whores painfully to their knees, but ${he} still obeys.`);
						break;
					case "masochist":
						text.push(`waits just long enough to receive a disciplinary slap, making ${him} blush with arousal as ${he} kneels before you.`);
						break;
					case "cumslut":
						text.push(`is excited to be closer to your`);

						if (canTaste(slave)) {
							text.push(`delicious`);
						} else {
							text.push(`heavenly`);
						}

						text.push(`crotch, and hurries to match ${his} eyes to your`);

						if (V.PC.dick > 0) {
							text.push(`package.`);
						} else {
							text.push(`crotch.`);
						}
						break;
					case "humiliation":
						text.push(`makes a big show of it as ${he} lowers ${himself} dramatically before you.`);
						break;
					case "buttslut":
						text.push(`leans heavily forward so that ${his} ass sticks out ridiculously far as ${he}`);

						if (hasAnyLegs(slave)) {
							text.push(`bends ${his} ${knees} and`);
						}

						text.push(`goes to the floor.`);
						break;
					case "pregnancy":
						text.push(`obeys your command and goes to`);

						if (hasBothLegs(slave)) {
							text.push(`${his} knees.`);
						} else {
							text.push(`the floor.`);
						}

						break;
					case "boobs":
						text.push(`pulls ${his} shoulders back strongly while leaning far enough forward to drag ${his}`);

						if (slave.boobs >= 10000) {
							text.push(`weighty mammaries`);
						} else if (slave.boobs >= 2000) {
							text.push(`cumbersome udders`);
						} else if (slave.boobs >= 1000) {
							text.push(`massive slave tits`);
						} else if (slave.boobs >= 800) {
							text.push(`forward-thrust breasts`);
						} else if (slave.boobs >= 500) {
							text.push(`meager chest`);
						} else if (slave.boobs <= 400) {
							text.push(`pathetic slave boobs`);
						} else {
							text.push(`tits`);
						}

						text.push(`across your body as ${he} goes down.`);
						break;
					default:
						text.push(`obeys your command and goes to`);

						if (hasBothLegs(slave)) {
							text.push(`${his} knees.`);
						} else {
							text.push(`the floor.`);
						}
				}
			} else {
				text.push(`obeys your command and goes to`);

				if (hasBothLegs(slave)) {
					text.push(`${his} knees.`);
				} else {
					text.push(`the floor.`);
				}
			}
		}

		if (slave.devotion < -20) {
			text.push(`The other slaves guide ${him} to adjust ${his} posture so ${his} eyes are directly in line with your`);

			if (V.PC.dick > 0) {
				text.push(`package.`);
			} else {
				text.push(`crotch.`);
			}
		} else {
			text.push(`${He} kneels so that ${his} eyes are directly level with your`);

			if (V.PC.dick > 0) {
				text.push(`package.`);
			} else {
				text.push(`crotch.`);
			}
		}

		if (V.PC.dick > 0) {
			if (slave.energy > 50) {
				text.push(`${He} cant help but stare in lust at your`);
				if (V.PC.balls >= 30) {
					text.push(`monstrous, massive pair of watermelon sized balls.`);
				} else if (V.PC.balls >= 14) {
					text.push(`enormous, heavy pair of balls.`);
				} else if (V.PC.balls >= 9) {
					text.push(`huge pair of balls, bulging like softballs from behind your suit.`);
				} else if (V.PC.balls >= 5) {
					text.push(`large pair of balls, swinging heavily as you move.`);
				} else {
					text.push(`manly package.`);
				}
			} else if (V.PC.scrotum > 0) {
				text.push(`Your balls loom directly in front of ${his} face.`);
			}
		}

		text.push(`Now kneeling at your feet naked before you, your slave waits for ${his} ${getWrittenTitle(slave)}'s command. You take some time to survey the slut's properly displayed body.`);

		if (slave.butt > 6) {
			text.push(`${His} massive ass is so huge that ${he} it squishes around ${his} ${hasBothLegs(slave) ? `heels` : `heel`}, almost reaching the floor.`);
		} else if (slave.butt > 4) {
			text.push(`${His} ${either("ass", "rear end")} is so round and large it rolls out from ${his} back in two perfect mounds. The cheeks are so thick it forms a perfect crevice between them, more than a couple`);

			if (V.showInches === 2) {
				text.push(`inches`);
			} else {
				text.push(`centimeters`);
			}

			text.push(`deep.`);
		} else if (slave.butt > 2) {
			text.push(`${His} nice ${either("plump", "thick")} ${either("ass", "butt")} curves out noticeably, even while ${he} sits on ${his} ${knees}.`);
		} else {
			text.push(`${His} cute and tight ass rests gently on ${his} ${hasBothLegs(slave) ? `ankles` : `ankle`}.`);
		}

		if (slave.energy > 95) {
			text.push(`${His} eyes fill with lust at the helplessness of kneeling at your crotch.`);
		}
		if (slave.fetishKnown === 1) {
			if (slave.fetishStrength > 60) {
				switch (slave.fetish) {
					case "submissive":
						text.push(`${He} keeps ${his} eyes down and poises ${his} body to be fully available to ${his} ${getWrittenTitle(slave)}, trying to model for you the image of the perfect submissive.`);
						break;
					case "dom":
						text.push(`Despite ${his} kneeling stature, ${his} back is straight and shoulders back.`);
						break;
					case "masochist":
						text.push(`${He} positions ${himself} uncomfortably, bringing visual pleasure to you and pain to ${himself}. ${He} accentuates ${his} most sensitive parts, inviting you to slap or spank them.`);
						break;
					case "cumslut": {
						text.push(`${he} goes to ${his} ${knees}, all the while staring at your`);

						const pcCrotch = [];

						if (V.PC.dick !== 0) {
							pcCrotch.push(`manly bulge`);
						}
						if (V.PC.vagina !== -1) {
							pcCrotch.push(`feminine mound`);
						}

						text.push(`${toSentence(pcCrotch)}.`);
						break;
					}
					case "humiliation":
						text.push(`${He} eagerly takes to this humiliating position, hoping to demonstrate ${his} willingness to be degraded by ${his} ${getWrittenTitle(slave)}.`);
						break;
					case "buttslut":
						text.push(`${He} positions ${himself}, sticking ${his} butt out as far as ${he} can manage, hoping to draw your attention to ${his} favorite area.`);
						break;
					case "boobs":
						text.push(`${he} kneels with ${his} back strongly arching far back and diligently works to touch ${his} elbows behind ${his} back to best display ${his}`);

						if (slave.boobs >= 10000) {
							text.push(`colossal mammaries`);
						} else if (slave.boobs >= 2000) {
							text.push(`gigantic udders`);
						} else if (slave.boobs >= 1000) {
							text.push(`massive slave tits`);
						} else if (slave.boobs >= 800) {
							text.push(`prominent breasts`);
						} else if (slave.boobs >= 400) {
							text.push(`modest chest`);
						} else if (slave.boobs <= 400) {
							text.push(`pathetic slave boobs`);
						}

						text.push(`for ${his} ${getWrittenTitle(slave)}.`);

						if (slave.lactation > 0) {
							text.push(`Milk dribbles down the soft curves of ${his} chest as a further sign of ${his} arousal.`);
						}

						text.push(`This is, of course, how all slaves are supposed to kneel, but ${he} takes the pose with added dedication.`);
						break;
					default:
						text.push(`${He} positions ${himself} with ${his} ${knees} spread wide, hoping that you will turn your attention to`);

						if (canDoVaginal(slave)) {
							text.push(`${his} wet pussy.`);
						} else if (canAchieveErection(slave)) {
							text.push(`${his} hard cock.`);
						} else {
							text.push(`${him}.`);
						}
				}
			}
		}

		text.push(`You give ${him} permission to speak, and tell ${him} that ${he} may beg ${his} ${getWrittenTitle(slave)}.`);

		if (slave.devotion < -20) {
			if (slave.trust < -50) {
				switch (slave.rules.punishment) {
					case "confinement":
						text.push(`Your slave simply`);

						if (hasAnyArms(slave)) {
							text.push(`presses ${his} ${hands} together and`);
						}

						text.push(`begs you not to lock ${him} up in the bad-${girl} box.`);
						break;
					case "whipping":
						text.push(`Your slave simply`);

						if (hasAnyArms(slave)) {
							text.push(`presses ${his} ${hands} together and`);
						}

						text.push(`begs you not to whip ${him}.`);
						break;
					case "chastity":
						if (slave.energy > 60) {
							text.push(`Your slave simply presses ${his} ${hands} together and begs you not to take away ${his} next orgasm`);
						} else {
							text.push(`Your slave simply asks that you not change ${his} punishment. ${He} fears you, but using chastity as a punishment is not an efficient way to command ${his} obedience, since ${he} has no sexual energy.`);
						}
				}
			} else {
				if (slave.behavioralFlaw === "bitchy") {
					text.push(`${He} turns ${his} nose up in utter disgust. ${Spoken(slave, `"Why, to feed your ${girl === "boy" ? `misandristic` : `misogynistic`} ego? Thanks, but no."`)} ${He} looks at your other slaves holding ${him} down, ${Spoken(slave, `"Why don't you get one of these mindless cunts to do it? Or are they not hot enough?"`)} ${He} is disobedient and bitchy, a bad combo.`);
				} else if (slave.behavioralFlaw === "arrogant") {
					text.push(`${He} tries to cock ${his} shoulders back, giving a death glare to the slaves holding ${him} in place, ${Spoken(slave, `"I don't need anything from you,"`)} ${he} hisses. ${He} is disobedient and arrogant, a bad combo.`);
				} else if (slave.behavioralFlaw === "liberated") {
					text.push(`${He} does ${his} best to spit in your face, but the height difference means ${he} only stains your shirt. ${Spoken(slave, `"I demand you release me!"`)} ${he} scowls, ${Spoken(slave, `"Or I'm going to call the police!"`)} You smile at ${his} pathetically outdated worldview. You tell ${him} that's a good idea, since you know how rebellious slaves fare in jail.`);
				} else if (slave.behavioralFlaw === "odd") {
					text.push(`${He} purses ${his} lips and bounces on ${his} heels in futile rebellion. ${Spoken(slave, `"Nuh-uh."`)} ${he} puffs, shaking ${his} head wildly.`);
				} else {
					text.push(`${He} simply sits there, struggling against the hands holding ${him} down.`);
				}
			}

			text.push(`This is clearly the best you are going to get out of ${him} until ${he} is better trained. You`);

			if (slave.trust >= -50) {
				text.push(`signal your loyal slaves to lift ${him} to ${his} feet, and`);
			}

			text.push(`send ${him} away for now.`);
		} else if (slave.devotion < 20) {
			if (slave.behavioralFlaw === "bitchy") {
				text.push(`${He} turns ${his} nose up in utter disgust. ${Spoken(slave, `"Why, to feed your ${girl === "boy" ? `misandristic` : `misogynistic`} ego? Thanks, but no."`)} ${He} looks at your other slaves holding ${him} down, ${Spoken(slave, `"Why don't you get one of these mindless cunts to do it? Or are they not hot enough?"`)} ${He} is disobedient and bitchy, a bad combo.`);
			} else if (slave.behavioralFlaw === "arrogant") {
				text.push(`${He} tries to cock ${his} shoulders back, giving a death glare to the slaves holding ${him} in place, ${Spoken(slave, `"I don't need anything from you,"`)} ${he} hisses. ${He} is disobedient and arrogant, a bad combo.`);
			} else if (slave.behavioralFlaw === "liberated") {
				text.push(`${He} does ${his} best to spit in your face, but the height difference means ${he} only stains your shirt. ${Spoken(slave, `"I demand you release me!"`)} ${he} scowls, ${Spoken(slave, `"Or I'm going to call the police!"`)} You smile at ${his} pathetically outdated worldview. You tell ${him} that's a good idea, since you know how rebellious slaves fare in jail.`);
			} else if (slave.behavioralFlaw === "odd") {
				text.push(`${He} purses ${his} lips and bounces on ${his} heels in futile rebellion. ${Spoken(slave, `"Nuh-uh."`)} ${he} puffs, shaking ${his} head wildly.`);
			} else if (slave.sexualFlaw === "shamefast") {
				text.push(`${He} tries to cover ${his} naked body from your gaze ${Spoken(slave, `"Please, can I just put some clothes on?"`)}`);
			} else {
				text.push(`${He} looks up at you with a sudden glimpse of hope, and begins to plead, ${Spoken(slave, `"Please, sir, please set me free. I don't want to be here.`)}`);

				if (slave.energy < 50) {
					text.push(Spoken(slave, `I have no desire for sex. I don't want to be your toy! Please let me go."`));
				} else {
					text.push(Spoken(slave, `I might even come back to share consensual love with you. I just don't want to be property. Please, let me go."`));
				}
			}

			text.push(`You tell your slave to rise to ${his} feet. Even though ${he} desired the impossible, it wasn't a total waste. You feel as though you have a pretty good understanding of where your slave stands. You send ${him} away with ${his} request denied, and you resolve to break ${him} more in the coming weeks.`);
		} else if (slave.devotion <= 60) {
			text.push(`Your slave looks at ${his} ${getWrittenTitle(slave)} with obedient eyes.`);
		} else if (slave.devotion <= 100) {
			text.push(`Your devoted slave takes the begging position,`);
			if (slave.fetish !== "submissive") {
				text.push(`${he} even brings ${his} ${hands} up like a dog's paws.`);
			} else {
				if (slave.fetishKnown === 1 && slave.fetishStrength > 60) {
					text.push(`and ${he} bows ${his} head in total submission.`);

					if (slave.piercing.nipple.weight > 0) {
						text.push(`The armbinder thrusts ${his} tits out nicely, and ${his} nipple rings are pulled tight by the weighted bells weighing them down.`);
					} else if (slave.piercing.nipple.weight > 1) {
						text.push(`The armbinder thrusts ${his} tits out nicely, and ensures that ${his} nipple chains are pulled tight by the angle of ${his} shoulders. The bells on ${his} nipple piercings jungle sweetly as ${he} breathes.`);
					} else {
						text.push(`The armbinder thrusts ${his} tits out nicely and ${his} nipples are now red from the clamps pressing down hard on ${his} sensitive flesh. Every painful shudder makes the bells jungle ever so sweetly.`);
					}
				} else {
					text.push(`${he} even brings ${his} ${hands} up like a dog's paws.`);
				}
			}

			text.push(Spoken(slave, `"Yes ${Master}. Thank you, ${Master}." ${He} is fully subservient to you, and would do anything to please you.`));
		}

		if (slave.devotion > 20) {
			// TODO: eventually plan to make a string of Paraphilia text, which will be stronger versions of their fetish counterparts.
			if (slave.fetishKnown === 1) {
				if (slave.fetishStrength > 60) {
					switch (slave.fetish) {
						case "submissive":
							text.push( `${He} adjusts ${his} monoglove behind ${his} back, jingling ${his} nipple bells as ${he} does. ${Spoken(slave, `"Please ${Master},"`)} ${he} begs with genuine humility, ${Spoken(slave, `"please use your slave in whatever way you see fit. This slave has no purpose but to please ${his} ${Master}."`)}`);
							break;
						case "dom":
							text.push( `${He} looks up at you. Even from ${his} kneeling position ${his} eyes carry confident domination. ${Spoken(slave, `"${Master}, I know my place is beneath you. Give me the authority to lord over your other slaves and I will force them to serve you as I do."`)}`);
							break;
						case "masochist":
							text.push (`${Spoken(slave, `"I know I haven't disobeyed,"`)} ${he} begins, ${Spoken(slave, `"but I just need to be punished."`)} You smile down at your little painslut, running your finger along ${his} chin. ${Spoken(slave, `"Please ${Master}, beat me. Beat my ass until it's red and clamp my nipples until they bleed. Please! I need to feel your strength!"`)}`);
							break;
						case "cumslut":
							text.push(`Your little cumslut can't stop staring at your`);

							if (V.PC.balls >= 30) {
								text.push(`monstrous, massive pair of watermelon sized balls.`);
							} else if (V.PC.balls >= 14) {
								text.push(`enormous, heavy pair of balls.`);
							} else if (V.PC.balls >= 9) {
								text.push(`huge pair of balls, bulging like softballs from behind your suit.`);
							} else if (V.PC.balls >= 5) {
								text.push(`large pair of balls, swinging heavily as you move.`);
							} else {
								text.push(`crotch.`);
							}

							text.push( `Drool begins to drip from ${his} lips, and you have to remind your slave that ${he} is here to beg. ${Spoken(slave, `"${Master},"`)} ${he} breathes heavily, ${Spoken(slave, `"Please let me`)}`);

							if (V.PC.dick !== 0) {
								text.push(Spoken(slave, `suck your magnificent`));
								if (V.PC.vagina !== -1) {
									text.push(Spoken(slave, `cock and eat you out,`));
								} else {
									text.push(Spoken(slave, `cock,`));
								}
							} else {
								text.push(Spoken(slave, `eat your delicious pussy,`));
							}

							text.push(Spoken(slave, `please." You smile at the little cocksucker, so eager to please.`));
							break;
						case "humiliation":
							text.push(`${He} sits so that ${his} body is on full display, ${Spoken(slave, `"Please ${Master}, use me and humiliate me. Take me out to the public square so that everyone can see you overpower me."`)}`);
							break;
						case "buttslut":
							text.push(`${He} positions ${his} back so ${his} ass sticks out even further ${Spoken(slave, `"${Master},"`)} ${he} begs, ${Spoken(slave, `"use my ass!${(slave.sexualQuirk === 'painal queen') ? ' Make me squeal!' : ''}${V.PC.dick > 0 ? ' I just need your cock in my most useful fuckhole, please!' : ''}"`)}`);
							break;
						case "boobs":
							text.push(`${He}`);

							if (!hasAnyArms(slave)) {
								text.push(`leans ${his} head back and juts out ${his} tits, raising`);
							} else {
								text.push(`takes ${his} ${hands} and presses ${his} tits together, lifting`);
							}

							text.push(`them to display for you ${his} primary purpose in life.`);

							if (slave.lactation > 0) {
								text.push(`More milk`);

								if (!hasAnyArms(slave)) {
									text.push(`dribbles`);
								} else {
									text.push(`squirts`);
								}

								text.push(`from each teat as ${he} bears them.`);
							}

							text.push(Spoken(slave, `"I beg of you, ${Master}, I need you to use my tits. Suck them, squeeze them, fuck them, I cannot cum without you using my slave tits! I am nothing more than a ${canWalk(slave) ? `walking ` : ``}tit-carrier, and my only purpose is to offer these breasts to you."`));
							break;
						case "pregnancy":
							text.push(`${He} begins to`);

							if (hasAnyArms(slave)) {
								text.push(`caress`);
							} else {
								text.push(`stick out`);
							}

							text.push(`${his} stomach. ${Spoken(slave, `"Use me as your breeder, ${Master}, please! I just want to ${slave.pregSource === -1 ? 'be filled with your seed' : 'bear your children'} forever!"`)}`);
							break;
						default:
							text.push(`${He} kneels`);

							if (hasBothLegs(slave)) {
								text.push(`with ${his} legs far spread.`);
							} else {
								text.push(`on the floor.`);
							}

							text.push(Spoken(slave, `"Use my fuckhole ${Master}, I beg you. Please, I need you to fuck me!"`));
					}
				} else {
					text.push(Spoken(slave, `"${Master}, I exist to serve you." ${He} ${say}s, ${Spoken(slave, `"I have no other purpose in life. I beg of you, please never let me leave your service. Let me wait on you forever. I swear I will always be obedient. Let me cook your meals, clean your penthouse, care for your other slaves, even make me a cow. I don't care, as long as I'm here serving you." ${He} knows that ${his} rightful place is a slave, and ${he} is dedicated to living out that role to the fullest.`)}`));

					if (slave.behavioralQuirk === "advocate") {
						text.push(Spoken(slave, `"I see now," ${he} continues, "that slavery really is a ${woman}'s rightful place. ${He} has no purpose except to serve ${his} ${Master}."`));
					}
				}
			} else {
				text.push(Spoken(slave, `"${Master}, I exist to serve you." ${He} says, ${Spoken(slave, `"I have no other purpose in life. I beg of you, please never let me leave your service. Let me wait on you forever. I swear I will always be obedient. Let me cook your meals, clean your penthouse, care for your other slaves, even make me a cow. I don't care, as long as I'm here serving you."`)} ${He} knows that ${his} rightful place is a slave, and ${he} is dedicated to living out that role to the fullest.`));

				if (slave.behavioralQuirk === "advocate") {
					text.push(Spoken(slave, `"I see now," ${he} continues, ${Spoken(slave, `"that slavery really is a ${woman}'s rightful place. ${He} has no purpose except to serve ${his} ${Master}."`)}`));
				}
			}

			text.push(`You smile at your obedient little slave, and agree to grant ${his} request.`);
		}

		return text.join(' ');
	}

	function slaveGainsFlaw() {
		if (slave.fetish !== "submissive" && slave.energy <= 95 && slave.behavioralFlaw !== "liberated") {
			slave.behavioralFlaw = "liberated";

			return `Seeing the humiliating acts your slaves are expected to perform has made ${him} <span class="flaw gain">determined to be free.</span>`;
		}

		return ``;
	}

	function slaveGainsQuirk() {
		if (slave.fetish === Fetish.NONE && slave.behavioralFlaw !== "liberated") {
			slave.fetish = "submissive";
			slave.fetishKnown = 1;

			return `Feeling the joy of kneeling before such a powerful ${getWrittenTitle(slave)} and begging at ${hisP} feet has <span class="fetish gain">encouraged ${him} to be more submissive.</span>`;
		}

		return ``;
	}
};
