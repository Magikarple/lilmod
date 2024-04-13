/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.Interact.fSuckle = function(slave) {
	const node = new DocumentFragment();
	let r = [];

	const {
		He, His,
		he, his, him, himself
	} = getPronouns(slave);

	seX(slave, "mammary", V.PC, "oral");
	let mood;
	if (V.PC.pregMood === 0 || V.PC.preg < 28) {
		mood = 0;
	} else if (V.PC.pregMood === 1) {
		mood = 1;
	} else if (V.PC.pregMood === 2) {
		mood = 2;
	}

	// still needed: breast implant support, nipple piercing support

	r.push(`You`);
	if (mood === 2) {
		r.push(`demand`);
	} else {
		r.push(`beckon`);
	}
	r.push(`${slave.slaveName} to`);
	if (!hasAnyLegs(slave)) {
		r.push(`have another slave set ${him} on the floor close to you.`);
	} else if (tooBigBreasts(slave)) {
		r.push(`have another slave help ${him} heft ${his} tits so ${he} can take a seat on the floor close to you.`);
	} else if (tooBigBelly(slave)) {
		r.push(`have another slave help ${him} heft ${his} belly so ${he} can take a seat on the floor close to you.`);
	} else if (tooBigButt(slave)) {
		r.push(`have another slave help ${him} heft ${his} ass cheeks so ${he} can take a seat on the floor close to you.`);
	} else if (tooBigDick(slave)) {
		r.push(`have another slave help ${him} heft ${his} cock so ${he} can take a seat on the floor close to you.`);
	} else if (tooBigBalls(slave)) {
		r.push(`have another slave help ${him} heft ${his} balls so ${he} can take a seat on the floor close to you.`);
	} else if (tooFatSlave(slave)) {
		r.push(`have another slave help ${him} up so ${he} can take a seat on the floor close to you.`);
	} else {
		r.push(`to take a seat on the floor close to you.`);
	}

	if (canMove(slave)) {
		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} complies without a thought.`);
		} else if (slave.devotion > 20 && slave.trust > 20) {
			r.push(`${He} complies,`);
			if (mood === 2) {
				r.push(`knowing full well what you want.`);
			} else {
				r.push(`giddy with anticipation of your plans for ${him}.`);
			}
		} else if (slave.trust < -20) {
			r.push(`${He} hurriedly complies,`);
			if (mood === 2) {
				r.push(`fearful of the sudden shift in your demeanor.`);
			} else {
				r.push(`aware of the consequences of disobedience.`);
			}
		} else if (slave.devotion < -20) {
			if (mood === 2) {
				r.push(`${He} is shaken by your tone, knowing that disobedience may lead to even worse matters for ${him}; ${he} complies without any further hassle.`);
			} else {
				r.push(`${He} begrudgingly complies, not understanding your intentions, but knowing worse things await at ${his} disobedience.`);
			}
		} else {
			if (mood === 2) {
				r.push(`${He} is a little afraid of your sudden demanding tone, but steels ${himself} for whatever punishment you wish to mete out to ${him}.`);
			} else {
				r.push(`Though hesitant, ${he} complies without question.`);
			}
		}
	} else {
		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} pays no attention as ${he} is carefully positioned for your use.`);
		} else if (slave.devotion > 20 && slave.trust > 20) {
			r.push(`Though ${he} has no agency over this,`);
			if (mood === 2) {
				r.push(`${he} is somewhat confused by your sudden aggressive posture.`);
			} else {
				r.push(`${he} is visibly giddy with anticipation for your next course of action as ${he} is helped into position.`);
			}
		} else if (slave.trust < -20) {
			if (mood === 2) {
				r.push(`${He} knows better than to struggle as ${he} is helped into position, though ${he} dreads what ${his} pregnant ${getWrittenTitle(slave)} has planned.`);
			} else {
				r.push(`${He} knows better than to struggle as ${he} is helped into position, well aware of the consequences it would bring.`);
			}
		} else if (slave.devotion < -20) {
			r.push(`Though ${he} is rebellious,`);
			if (mood === 2) {
				r.push(`seeing such a gravid person take such a predatory stance shakes ${him} and ${he} becomes more compliant.`);
			} else {
				r.push(`${his} inability to move and distaste for falling to the ground kept ${him} from giving ${his} help much trouble.`);
			}
		} else {
			if (mood === 2) {
				r.push(`Though ${he} is frightened by your sudden aggressiveness, ${he} complies with ${his} helper as ${he} is positioned.`);
			} else {
				r.push(`Though hesitant, ${he} complies with ${his} helper as ${he} is positioned.`);
			}
		}
	}

	if (slave.boobs >= 20000) {
		r.push(`You`);
		if (mood === 1) {
			r.push(`caress`);
		} else {
			r.push(`take note of`);
		}
		r.push(`${his} massive udders,`);
		if (mood === 2) {
			if (slave.nipples === "puffy") {
				r.push(`grabbing a puffy nipple, lifting it up and letting it drop back down with a loud plop and a spurt of milk. They are dripping with excess milk and the flurry of kicks in your middle tells you what you need to do.`);
			} else if (slave.nipples === "inverted") {
				r.push(`prying an inverted nipple out of one of them before letting it slip back down with a loud plop and a gush of milk. A strong kick tells you that you are to take some of that cream for yourself.`);
			} else if (slave.nipples === "flat") {
				r.push(`pinching a nubby nipple, eliciting a dribble of milk that causes you to lose your grip. A strong kick insists you wrap your lips around it and try your hardest to suck out some cream.`);
			} else if (slave.nipples === "fuckable") {
				r.push(`using two fingers to pry a nippleslit open before letting it slip shut with a moist plop. A strong kick tells you that something good is hiding in there that you'll need to work out.`);
			} else {
				r.push(`grabbing one by the nipple only to let it drop back down with a loud plop and a spurt of milk. A strong kick tells you that you are to take some of that cream for yourself.`);
			}
		} else {
			r.push(`dripping with excess milk and resting on ${his} legs, the very spot you plan to make your own, but it will take finesse.`);
		}
		r.push(`You lift up ${his} hefty breasts and`);
		if (V.PC.belly >= 10000) {
			r.push(`gently lower yourself`);
		} else {
			r.push(`lie`);
		}
		r.push(`down on ${his} lap,`);
		if (slave.belly >= 30000) {
			if (slave.bellyPreg > 1000) {
				r.push(`getting familiar with ${his} huge life-swollen baby bump and`);
			} else {
				r.push(`getting familiar with ${his} hugely swollen belly and`);
			}
		} else if (slave.belly >= 10000) {
			if (slave.bellyPreg >= 8000) {
				r.push(`beside ${his} baby bump and`);
			} else if (slave.bellyImplant >= 8000) {
				r.push(`beside the swollen orb that is ${his} stomach and`);
			} else {
				r.push(`beside the bloated container of ${slave.inflationType} that is ${his} middle and`);
			}
		} else if (slave.belly >= 1000) {
			if (slave.bellyPreg >= 1000) {
				r.push(`beside the life growing within ${him} and`);
			} else if (slave.bellyImplant >= 1000) {
				r.push(`beside the curve of ${his} stomach and`);
			} else {
				r.push(`beside the groaning container of ${slave.inflationType} within ${him} and`);
			}
		} else if (slave.weight > 95) {
			r.push(`getting familiar with ${his} fat belly and`);
		}
		r.push(`letting go so that ${his} tits cover your face and`);
		if (V.PC.belly >= 5000) {
			r.push(`belly`);
		} else {
			r.push(`torso`);
		}
		r.push(`in heavenly softness, ${his}`);
		if (slave.nipples !== "fuckable") {
			if (slave.nipples === "puffy") {
				r.push(`exceedingly soft nipple already brushing against your lips, covering your face with excess milk as if begging for you to empty ${him}.`);
			} else if (slave.nipples === "inverted" || slave.nipples === "partially inverted") {
				r.push(`internally curved nipple providing an inviting hole for you to tease out with your tongue.`);
			} else if (slave.nipples === "flat") {
				r.push(`coin-sized nipple brushing your lips, daring you to get a grip on it.`);
			} else {
				r.push(`overly exertive nipple already prodding at your mouth, as if begging to be suckled on.`);
			}
			r.push(`Though muffled, you`);
			if (mood === 2) {
				r.push(`order ${him} to deal with`);
				if (V.PC.dick !== 0) {
					r.push(`the erect monster pressing uncomfortably against the underside of your belly.`);
				} else {
					r.push(`the needy hole leaking all over your floor.`);
				}
				if (slave.fetish === Fetish.MINDBROKEN) {
					r.push(`${He} obeys without question and mechanically begins to`);
					if (V.PC.dick !== 0) {
						r.push(`jerk you off.`);
					} else {
						r.push(`finger you.`);
					}
				} else if (slave.devotion >= -20) {
					r.push(`This proves unnecessary as, before you finish speaking, ${he}`);
					if (V.PC.dick !== 0) {
						r.push(`wraps ${his} fingers around your needy cock`);
					} else {
						if (canSmell(slave)) {
							r.push(`smells`);
						} else {
							r.push(`recognizes`);
						}
						r.push(`your arousal`);
					}
					r.push(`and begins to apply ${his} ministrations to take care of you${slave.nipples.endsWith("inverted") ? `, as the sensations to ${his} nipple add so much more to the already surrounding breastflesh` : ``}. You buck to ${his} touch, forcing ${him} to try and steady ${his} breasts as your baby bump jumps with life.`);
				} else if (slave.trust < -20) {
					r.push(`${He} begins to question your order, but quickly realizes that was a mistake as you grab ${his} hand and force it to your crotch. Hastily, ${he} begins to stroke`);
					if (V.PC.dick !== 0) {
						r.push(`your dick`);
					} else {
						r.push(`your pussy`);
					}
					r.push(`until reassured that ${he} is pleasing you from your lusty moans and thrusting. ${He} does ${his} best, hoping to not anger you further as ${he} presses`);
					if (V.PC.dick !== 0) {
						r.push(`the head`);
					} else {
						r.push(`your lower lips`);
					}
					r.push(`against ${his} nearby nipple.`);
				} else {
					r.push(`Though ${he} furrows ${his} brow, ${he} decides it's better to get it over with quickly and in ${his} hand before ${he} is pinned in a much more compromising position by your pregnancy. ${slave.slaveName} begins to`);
					if (V.PC.dick !== 0) {
						r.push(`tug at your penis, pressing the head against ${his} nearby nipple, hoping this doesn't`);
					} else {
						r.push(`finger your quivering pussy, rubbing ${his} thumb against your clit, hoping this won't`);
					}
					r.push(`take too long.`);
				}
			} else {
				r.push(`instruct ${him} to use ${his} hand to appease the evident arousal between your legs.`);
				if (slave.fetish === Fetish.MINDBROKEN) {
					r.push(`${He} obeys without question and mechanically begins to`);
					if (V.PC.dick !== 0) {
						r.push(`jerk you off.`);
					} else {
						r.push(`finger you.`);
					}
				} else if (slave.devotion >= -20) {
					r.push(`This proves unnecessary as, before you finish speaking, ${he}`);
					if (V.PC.dick !== 0) {
						r.push(`notices your hardening penis`);
					} else {
						if (canSmell(slave)) {
							r.push(`smells`);
						} else {
							r.push(`recognizes`);
						}
						r.push(`your arousal`);
					}
					r.push(`and begins to apply ${his} ministrations to take care of you${slave.nipples.endsWith("inverted") ? `, as the sensations to ${his} nipple add so much more to the already surrounding breastflesh` : ``}. You respond further with a positive "Mmmhmm~", which calms ${his} worries as ${he} works on pleasuring you as much as ${he} can with one hand.`);
				} else if (slave.trust < -20) {
					r.push(`${He} begins to question your order, but quickly realizes`);
					if (V.PC.dick !== 0) {
						r.push(`your penis is at full mast and prodding ${his} breastflesh.`);
					} else {
						r.push(`you're soaking wet and quivering with desire.`);
					}
					r.push(`Cautiously, ${he} begins to stroke`);
					if (V.PC.dick !== 0) {
						r.push(`it`);
					} else {
						r.push(`your pussy`);
					}
					r.push(`until reassured that ${he} is pleasing you with a positive "Mmmhmm~". ${He} does ${his} best, hoping to not anger you in any way or make a mistake as ${he} presses`);
					if (V.PC.dick !== 0) {
						r.push(`the head`);
					} else {
						r.push(`your lower lips`);
					}
					r.push(`against ${his} nearby nipple.`);
				} else {
					r.push(`Though ${he} furrows ${his} brow, ${he} decides it's better to get it over with quickly and in ${his} hand rather than any other hole or in worse circumstances. ${slave.slaveName} begins to`);
					if (V.PC.dick !== 0) {
						r.push(`tug at your hardened penis, pressing the head against ${his} nearby nipple, hoping this doesn't`);
					} else {
						r.push(`finger your quivering pussy, rubbing ${his} thumb against your clit, hoping this won't`);
					}
					r.push(`take too long.`);
				}
			}
		} else {
			r.push(`exotic nipple brushing across your lips, as if wanting to have your tongue inside it, while ${his} other nipple`);
			if (mood === 2) {
				r.push(`brushes across your`);
				if (V.PC.dick !== 0) {
					r.push(`penis, just begging to be penetrated. You struggle to shift yourself in such a way to penetrate ${his} nipple, before finally managing to slip the tip into ${him}`);
				} else {
					r.push(`clit, as if begging to join in. You struggle to shift yourself to an angle where you could attach your sex to`);
				}
				r.push(`${his} nippleslit.`);
				if (slave.fetish === Fetish.MINDBROKEN) {
					if (V.PC.dick !== 0) {
						r.push(`${He} gasps in surprise as you force yourself all the way into ${him} and your gravid swell parts ${his} breasts.`);
					} else {
						r.push(`${He} fails to understand your efforts, leaving you humping against ${his} breast.`);
					}
				} else if (slave.devotion >= -20) {
					r.push(`${He} gasps in surprise before understanding what you desire and begins to`);
					if (V.PC.dick !== 0) {
						r.push(`ease ${his} breast into consuming the rest of your length. ${He} fails to do so fast enough and you force yourself upwards, your gravid swell parting ${his} breasts as your cock delves into the depths of ${his} tits.`);
					} else {
						r.push(`jiggle ${his} breast in an attempt to add to your efforts.`);
					}
				} else if (slave.trust < -20) {
					r.push(`${He} begins to question your intent, but quickly realizes your`);
					if (V.PC.dick !== 0) {
						r.push(`penis is entering ${his} breastpussy by force and the ${he}'d better get used to it.`);
					} else {
						r.push(`pussy is rubbing against ${his} nippleslit. ${He} begins to jiggle ${his} breast in an attempt to add to your efforts.`);
					}
				} else {
					r.push(`Though ${he} furrows ${his} brow, ${he} decides it's better to get it over with quickly rather than in worse circumstances. ${slave.slaveName}`);
					if (V.PC.dick !== 0) {
						r.push(`shudders as the rest of your shaft forces its way into ${his} breastpussy,`);
					} else {
						r.push(`begins to jiggle ${his} breast in an attempt to get you off,`);
					}
					r.push(`hoping this doesn't take too long.`);
				}
				r.push(`You breathe in ${his} scent as you let out a moan, your ${(V.PC.pregType > 1) ? `children` : `child`} satisfied with the sensations of ${his} milky depths surrounding your crotch.`);
			} else {
				r.push(`brushes across your hardening`);
				if (V.PC.dick !== 0) {
					r.push(`penis, as if begging to be penetrated. You shift to angle yourself just right before thrusting your hips upwards, inserting the tip of your shaft into`);
				} else {
					r.push(`clit, as if begging to join in. You shift to angle yourself just right before thrusting your hips upwards in an attempt to attach your sex to`);
				}
				r.push(`${his} nippleslit.`);
				if (slave.fetish === Fetish.MINDBROKEN) {
					if (V.PC.dick !== 0) {
						r.push(`${He} gasps in surprise as you push all the way into ${him}.`);
					} else {
						r.push(`${He} fails to understand your efforts, leaving you rubbing yourself against ${his} breast.`);
					}
				} else if (slave.devotion >= -20) {
					r.push(`${He} gasps in surprise before understanding what you desire and begins to`);
					if (V.PC.dick !== 0) {
						r.push(`ease ${his} breast into consuming the rest of your length.`);
					} else {
						r.push(`jiggle ${his} breast in an attempt to add to your efforts.`);
					}
				} else if (slave.trust < -20) {
					r.push(`${He} begins to question your intent, but quickly realizes your`);
					if (V.PC.dick !== 0) {
						r.push(`penis is entering ${his} breastpussy one way or another and begins to ease it all the way in before you decide to force the matter.`);
					} else {
						r.push(`pussy is rubbing against ${his} nippleslit. ${He} begins to jiggle ${his} breast in an attempt to add to your efforts.`);
					}
				} else {
					r.push(`Though ${he} furrows ${his} brow, ${he} decides it's better to get it over with quickly rather than in worse circumstances. ${slave.slaveName} begins to`);
					if (V.PC.dick !== 0) {
						r.push(`ease the rest of your shaft into ${his} breastpussy,`);
					} else {
						r.push(`jiggle ${his} breast in an attempt to get you off,`);
					}
					r.push(`hoping this doesn't take too long.`);
				}
				r.push(`You breathe in ${his} scent as you let out a sigh, content with the sensations of ${his} milky depths surrounding your crotch.`);
			}
		}
	} else if (slave.boobs >= 2000) {
		r.push(`You`);
		if (mood === 1) {
			r.push(`caress`);
		} else if (mood === 2) {
			r.push(`hungrily eye`);
		} else {
			r.push(`eye`);
		}
		r.push(`${his} ${slave.nipples} nipples,`);
		if (slave.nipples === "puffy") {
			if (mood === 2) {
				r.push(`gripping the nipple with your hand and squeezing hard enough to force out a spurt of milk. A flurry of kicks tells you that you are to take one of those swollen, dripping beauties and have a drink.`);
			} else {
				r.push(`swollen and dripping with excess milk and calling on your instincts to suckle on them.`);
			}
		} else if (slave.nipples === "inverted") {
			if (mood === 2) {
				r.push(`poking it with your finger as deep as you can. The inviting hole keeps all the delicious milk locked up, your instincts insisting that you pry out the flavor for yourself. The kicking in your middle settles it, you're taking a drink whether or not ${his} nipples agree.`);
			} else {
				r.push(`the inviting hole keeping all the delicious milk locked up, your instincts insisting that you pry out the flavor for yourself.`);
			}
		} else if (slave.nipples === "flat") {
			if (mood === 2) {
				r.push(`pinching the nipple with your fingertips and squeezing hard enough to force out some drops of milk. A flurry of kicks demands you wrap you lips around it and take what little milk hides within.`);
			} else {
				r.push(`swollen and dripping with excess milk and calling on your instincts to suck on them.`);
			}
		} else if (slave.nipples === "fuckable") {
			if (mood === 2) {
				r.push(`using two fingers to penetrate and spread apart to appreciate the insides. They are dripping with excess milk and resemble a tiny pussy; a series of kicks insist that you have a taste${(V.PC.dick !== 0) ? ` and a little stress relief` : ``}.`);
			} else {
				r.push(`dripping with excess milk and resembling a tiny pussy, your instincts doubly insisting that you have a taste.`);
			}
		} else {
			if (mood === 2) {
				r.push(`pinching one between your thumb and forefinger with enough force to hurt. Excess milk drips from it as a rather forceful kick from your womb insists that you take your fill; you wouldn't mind a taste yourself.`);
			} else {
				r.push(`dripping with excess milk and calling on your instincts to suckle on them.`);
			}
		}
		r.push(`Though you plan to sate those innate desires, you also plan to do so with finesse. You`);
		if (V.PC.belly >= 10000) {
			r.push(`gently lower yourself`);
		} else {
			r.push(`lay`);
		}
		r.push(`down on ${his} lap and`);
		if (slave.nipples === "fuckable") {
			r.push(`ease your head onto`);
		} else {
			r.push(`rest your head on`);
		}
		r.push(`${his} thigh,`);
		if (slave.belly >= 30000) {
			if (slave.bellyPreg > 1000) {
				r.push(`the huge life-swollen orb that is ${his} middle brushing you and`);
			} else {
				r.push(`the hugely swollen orb that is ${his} middle brushing you and`);
			}
		} else if (slave.belly >= 10000) {
			if (slave.bellyPreg >= 8000) {
				r.push(`beside ${his} baby bump and`);
			} else if (slave.bellyImplant >= 8000) {
				r.push(`beside the swollen orb that is ${his} stomach and`);
			} else {
				r.push(`beside the bloated container of ${slave.inflationType} that is ${his} middle and`);
			}
		} else if (slave.belly >= 1000) {
			if (slave.bellyPreg >= 1000) {
				r.push(`beside the life growing within ${him} and`);
			} else if (slave.bellyImplant >= 1000) {
				r.push(`beside the curve of ${his} stomach and`);
			} else {
				r.push(`beside the groaning container of ${slave.inflationType} within ${him} and`);
			}
		} else if (slave.weight > 95) {
			r.push(`${his} fat belly softly cushioning your cheek and`);
		}
		r.push(`${his} over-productive bosoms dripping sweet cream on your face${(slave.nipples === "inverted") ? `, the milk waiting to be sucked from the tight inverted holes above you` : ``}${(V.PC.belly >= 10000) ? ` and your belly brushing the undersides of ${his} tits` : ``}. You`);
		if (mood === 2) {
			r.push(`order ${him} to deal with`);
			if (V.PC.dick !== 0) {
				r.push(`the erect monster pressing uncomfortably against the underside of your belly.`);
			} else {
				r.push(`the needy hole leaking all over your floor.`);
			}
		} else {
			r.push(`instruct ${him} to use ${his} hand to appease the evident arousal between your legs.`);
		}
		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} obeys without question and mechanically begins to`);
			if (V.PC.dick !== 0) {
				r.push(`jerk you off.`);
			} else {
				r.push(`finger you.`);
			}
		} else if (slave.devotion >= -20 || slave.trust < -20) {
			if (V.PC.dick !== 0) {
				r.push(`Though ${he} believes it would be better for you to use another of ${his} slew of pleasurable orifices, ${he} does not question your decision.`);
			} else {
				r.push(`${He} happily sets to work on your clit.`);
			}
		} else {
			r.push(`Though ${he} furrows ${his} brow, ${he} decides it's better to get it over with quickly and in ${his} hand rather than any other hole or in worse circumstances. ${slave.slaveName} begins to`);
			if (V.PC.dick !== 0) {
				r.push(`tug at your hardened penis,`);
			} else {
				r.push(`stroke your quivering pussy as best as ${he} can,`);
			}
			r.push(`hoping this doesn't take too long.`);
		}
	}

	if (slave.fetish === Fetish.MINDBROKEN) {
		r.push(`You`);
		if (mood === 1) {
			r.push(`struggle to lean forward and wrap your lips gently around a nipple,`);
		} else {
			r.push(`lurch forward and engulf a nipple with your lips,`);
		}
		r.push(`causing ${him} to shudder with arousal as the suction causes milk to gush into your mouth to sate your needs.`);
	} else if (slave.devotion <= 20 || slave.trust < -20) {
		r.push(`${He} braces ${himself} as you`);
		if (mood === 1) {
			r.push(`struggle to lean forward and wrap your lips gently around a nipple,`);
		} else {
			r.push(`lurch forward and engulf a nipple with your lips,`);
		}
		r.push(`cringing as the suction causes milk to gush into your mouth to sate your needs.`);
	} else {
		r.push(`You`);
		if (mood === 1) {
			r.push(`struggle to lean forward and wrap your lips gently around a nipple,`);
		} else {
			r.push(`lurch forward and engulf a nipple with your lips,`);
		}
		r.push(`causing ${him} to coo with delight`);
		if (mood === 1) {
			r.push(`and support your head`);
		}
		r.push(`as the suction causes milk to gush into your mouth to sate your needs.`);
	}
	if (mood === 2) {
		r.push(`Your`);
		if (V.PC.pregType > 1) {
			r.push(`babies calm`);
		} else {
			r.push(`baby calms`);
		}
		r.push(`down as ${his} cream reaches your system.`);
	} else if (mood === 1) {
		r.push(`Your`);
		if (V.PC.pregType > 1) {
			r.push(`babies kick`);
		} else {
			r.push(`baby kicks`);
		}
		r.push(`happily as you hug yourself closer to ${him}.`);
	} else {
		r.push(`You find yourself moaning at the delight of ${his} cream flowing into you.`);
		if (V.PC.preg > 15) {
			r.push(`A fluttering sensation in your womb tells you someone else also appreciates the drink.`);
		}
	}

	if (slave.boobs >= 20000) {
		r.push(`Such sensations hasten your breath, making you take in more of ${his} womanly scent. You work with your lips and tongue to`);
		if (slave.nipples === "inverted" || slave.nipples === "partially inverted") {
			r.push(`tease out ${his} nipple and suckle with newfound gusto,`);
		} else if (slave.nipples === "flat") {
			r.push(`get a hold of ${his} nipple and suckle with newfound gusto,`);
		} else if (slave.nipples === "fuckable") {
			r.push(`explore the inner chambers of ${his} breasts and ease out more of ${his} cream in a lustful frenzy,`);
		} else {
			r.push(`ease out more of ${his} cream in a lustful frenzy,`);
		}
		r.push(`as though the rest of the world did not exist. It might as well not, given how the entirety of your upper body sees and feels nothing but ${his} mesmerizing mammaries and`);
		if (slave.nipples === "puffy") {
			r.push(`${his} soft nipple in your mouth, while your sex focuses on the soft hand diligently working it. You feverishly suckle on ${his} nipple as you thrash your tongue, your efforts rewarded with more milk.`);
		} else if (slave.nipples === "flat") {
			r.push(`${his} milky nub in your mouth, while your sex focuses on the soft hand diligently working it. You feverishly suck on ${his} nipple as you thrash your tongue, your efforts accidentally forcing you off with a wet pop, but you just latch back on like nothing happened.`);
		} else if (slave.nipples === "inverted" || slave.nipples === "partially inverted") {
			r.push(`${his} erect nipple in your mouth, while your sex focuses on the soft hand diligently working it. You feverishly suckle on ${his} nipple as you thrash your tongue, your efforts rewarded with more milk.`);
		} else if (slave.nipples === "fuckable") {
			r.push(`your sex feeling nothing but the wet`);
			if (V.PC.dick !== 0) {
				r.push(`insides of ${his} breast.`);
			} else {
				r.push(`lips of ${his} breastpussy.`);
			}
			r.push(`You feverishly thrash your tongue around inside of the bumpy enclosure, with each strong movement sending shivers through ${him}, forcing gasps, moans and milk out of ${him}.`);
		} else {
			r.push(`${his} milky nipple in your mouth, while your sex focuses on the soft hand diligently working it. You feverishly suckle on ${his} nipple as you thrash your tongue, your efforts rewarded with more milk.`);
		}
		r.push(`You would worry about drowning if it didn't taste good enough for you to suckle ever harder with each spurt.`);
	} else if (slave.boobs >= 2000) {
		r.push(`Such sensations bring your attention further to ${his} teat; as you`);
		if (slave.nipples === "inverted") {
			r.push(`tease ${his} nipple`);
		} else if (slave.nipples === "fuckable") {
			r.push(`explore the depths of ${his} inner breast`);
		} else {
			r.push(`roll and prod`);
		}
		r.push(`with your tongue, trying to get the most out of ${his} mammaries, you hasten ${his} breath and bring ${him} further pleasure${(slave.nipples === "inverted") ? ` as it slowly hardens and leaves its inverted state` : ``}.`);
		if (slave.nipples === "puffy") {
			r.push(`You note the texture of ${his} nipple: soft, more so even than the rest of ${his} boob. Your constant efforts of sucking and tongueplay are rewarded`);
		} else if (slave.nipples === "flat") {
			r.push(`You take in the texture of ${his} nipple: hard and bumpy, just like the firm globe pulling it flat. Your constant efforts of sucking and tongueplay are rewarded`);
		} else if (slave.nipples === "fuckable") {
			r.push(`You feverishly thrash your tongue around in the bumpy enclosure, each strong movement sending shivers through ${him}, causing ${him} to gasp and moan, as well as rewarding you`);
		} else if (slave.nipples !== "inverted") {
			r.push(`You take in the texture of ${his} nipple: hard and bumpy, a stark contrast to the rest of ${his} boob — an undeniable ocean of softness. Your constant efforts of sucking and tongueplay are rewarded`);
		} else {
			r.push(`Your constant efforts of sucking and tongueplay are rewarded`);
		}
		r.push(`with more milk straight from the tap.`);
	}

	r.push(`Milk continues to spill into your mouth as you suckle away at the`);
	if (slave.nipples === "puffy") {
		r.push(`softness,`);
	} else if (slave.nipples === "flat") {
		r.push(`swollen bulge,`);
	} else if (slave.nipples === "inverted" || slave.nipples === "partially inverted") {
		r.push(`erect hardness,`);
	} else if (slave.nipples === "fuckable") {
		r.push(`milky slit,`);
	} else {
		r.push(`hardness,`);
	}
	r.push(`relishing the delicious treat one could have only received from a mother's bosom; at least, so was the case before modern medicine decided to say something about it. Though it may as well be artificial, the act of breastfeeding continues to appease a fundamental emotional need that is arguably unique to the action.`);
	if (mood === 2) {
		r.push(`It gives you undeniable emotional respite despite the mood caused by your pregnancy, even if it will only last as long as you stay with ${him}.`);
	} else if (mood === 1) {
		r.push(`You can only hope ${he}'ll return the favor when you yourself become too heavy with milk.`);
	} else if (V.PC.preg > 30) {
		r.push(`You know that you'll soon have your own ${onlyPlural(V.PC.pregType, 'child', 'children')} to share this feeling with and deep down, you hope to enjoy it just as much as ${he} does.`);
	}

	if (slave.boobs >= 20000) {
		if (slave.nipples === "fuckable") {
			r.push(`${He}`);
			if (V.PC.dick !== 0) {
				r.push(`holds ${his} breast and jiggles it in an attempt to compliment your thrusts, adding even more sensation alongside your own efforts. With the milk adding lubrication to the sensual hole of ${his} nipple and the enclosed nature of ${his} sopping wet breastpussy itself adding suction, it's like you were enveloped inside of a highly advanced cock milking machine, each bump sending thrums of pleasure as your dick brushed against them.`);
			} else {
				r.push(`held ${his} breast and jiggled it in an attempt to compliment your thrusts, adding more sensation to your own efforts. The milk adding wetness to the sensual hole of ${his} nipple and the nature of ${his} sopping wet breastpussy itself adding suction felt like you were being enveloped by a world class pussy pump, each movement adding more suction and wetness than the last.`);
			}
		} else {
			r.push(`While you were busy suckling, ${he} was anything but idle, using ${his} hand as best as ${he} could to bring you the most pleasure ${he} is capable of. Though no lube was applied, ${his} ministrations were more than enough to take you to the knife's edge of orgasm more than once. In your`);
			if (V.PC.dick !== 0) {
				r.push(`already dazed state,`);
			} else {
				r.push(`lust addled haze,`);
			}
			r.push(`${his} fingers seem to send lightning along your nerves${(V.PC.dick !== 0) ? `; the tips brushing across your shaft to tickle its head make you thrust instinctively. ${His} tugs, gentle yet firm` : `. ${His} fingertips brush across your labia to tickle your clit, making you buck instinctively. ${His} strokes, gentle yet decisive`}, have an almost motherly feel to them. Such ministrations cannot help but prepare you to`);
			if (V.PC.dick !== 0) {
				r.push(`shoot your load`);
			} else {
				r.push(`come`);
			}
			r.push(`as hard as you can.`);
		}
	} else if (slave.boobs >= 2000) {
		r.push(`While you were busy suckling, ${he} was anything but idle, using ${his} hand as best as ${he} could to bring you the most pleasure ${he} is capable of. Though no lube was applied, ${his} ministrations were more than enough to take you to the knife's edge of orgasm more than once. ${His} hand continues to apply itself to your`);
		if (V.PC.dick !== 0) {
			r.push(`shaft, its fingertips brushing across your shaft to tickle its head and make you thrust instinctively. ${His} tugs,`);
		} else {
			r.push(`sex, ${his} fingertips seeming to send lightning along your nerves. As ${he} tickles your clit, you buck instinctively. ${His} strokes,`);
		}
		r.push(`gentle yet firm, have an almost motherly feel to them. Such ministrations cannot help but prepare you to`);
		if (V.PC.dick !== 0) {
			r.push(`shoot your load`);
		} else {
			r.push(`come`);
		}
		r.push(`as hard as you can.`);
	}

	r.push(`The two of you put so much into seeking pleasure in the act that you both cum at once, ${his} great gasp coinciding with your`);
	if (V.PC.dick !== 0) {
		if (V.PC.balls >= 10) {
			r.push(`flood`);
		} else {
			r.push(`jet`);
		}
		r.push(`of jizz flying`);
	} else {
		r.push(`own jet of pussy juice squirting`);
	}
	if (slave.boobs >= 20000 && slave.nipples === "fuckable") {
		r.push(`into`);
	} else {
		r.push(`onto`);
	}
	r.push(`${his} other breast${(V.PC.dick !== 0 && V.PC.balls >= 10) ? ` and backflowing hard from your sheer volume` : ``}. You release ${his} nipple with a loud pop and lick your lips in delight.`);
	if (slave.boobs >= 20000 && slave.nipples === "fuckable") {
		r.push(`Your`);
		if (V.PC.dick !== 0) {
			r.push(`dick slips out`);
		} else {
			r.push(`pussy separates`);
		}
		r.push(`from ${his} other breast with a delicate pop, followed by lewd dripping noises and the sight of`);
		if (V.PC.dick !== 0) {
			r.push(`semen`);
		} else {
			r.push(`girlcum`);
		}
		r.push(`and milk oozing from ${his}`);
		if (V.PC.dick !== 0) {
			r.push(`newly expanded hole.`);
		} else {
			r.push(`nippleslit.`);
		}
	}
	if (mood === 2) {
		r.push(`For a moment, ${he} thought you were finished, but with your hormone fueled libido, ${he}'ll be feeling a lot more than sore nipples but the time you tire of ${his} touch.`);
	} else if (mood === 1) {
		r.push(`You cuddle up against ${him}, holding close to ${him} as you snooze off your milky meal.`);
		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} struggles in discomfort at your pregnant weight pinning ${him} down until ${he} manages to rouse your ${onlyPlural(V.PC.pregType, 'child', 'children')} and get you to move.`);
		} else if (slave.devotion > 20 && slave.trust > 20) {
			r.push(`${He} holds you close, gently caressing your head and pregnancy as you rest it off.`);
		} else if (slave.trust < -20) {
			r.push(`${He} freezes in fear, unsure of what to do other than let you rest.`);
		} else if (slave.devotion < -20) {
			r.push(`${He} groans at the weight leaning against ${him} and begrudgingly rests ${his} arm atop your pregnant bulge.`);
			if (V.PC.pregSource === slave.ID) {
				r.push(`${He} takes a moment to appreciate the size of your belly, knowing ${he} was the one that seeded you. ${He} admires ${his} work with pride.`);
			} else {
				r.push(`${He} knows ${he} has little choice but to put up with it.`);
			}
		} else {
			r.push(`Though hesitant, ${he} carefully rubs the taut dome of your belly as you rest.`);
		}
	}

	if (slave.lactation > 0) {
		slave.lactationDuration = 2;
		slave.boobs -= slave.boobsMilk;
		slave.boobsMilk = 0;
	}

	r.push(`Once you`);
	if (mood === 1) {
		r.push(`wake and slowly rise to your feet, you help ${him} clean up`);
	} else {
		r.push(`are done, you allow ${him} to clean up`);
	}
	switch (slave.assignment) {
		case "work in the brothel":
			r.push(`before returning ${his} lovely tits to the brothel.`);
			break;
		case "serve in the club":
			r.push(`before resuming ${his} lovely bouncing in the club.`);
			break;
		case "work in the dairy":
			r.push(`before returning to the dairy.`);
			break;
		case "work as a farmhand":
			r.push(`to avoid tainting the food in ${V.farmyardName}.`);
			break;
		case "work as a servant":
			r.push(`mostly to keep everything ${he} has to clean from getting any dirtier.`);
			break;
		case "work as a nanny":
			r.push(`before heading back to take care of the children.`);
			break;
		case "whore":
			r.push(`before returning to offering ${his} lovely tits for sale.`);
			break;
		case "serve the public":
			r.push(`before returning to offering ${his} lovely tits for free.`);
			break;
		case "rest":
			r.push(`before crawling back into bed.`);
			break;
		case "get milked":
			r.push(`before resting until ${his} tits swell with milk again.`);
			break;
		case "be a servant":
			r.push(`since ${his} chores didn't perform themselves while you enjoyed ${him}.`);
			break;
		case "please you":
			r.push(`before returning to await your next use of ${his} body, as though nothing had happened.`);
			break;
		case "be a subordinate slave":
			r.push(`though it's only a matter of time before another slave decides to play with ${his} tits.`);
			break;
		case "be your Head Girl":
			r.push(`worried that ${his} charges got up to trouble while ${he} enjoyed ${his} ${getWrittenTitle(slave)}'s use.`);
			break;
		case "guard you":
			r.push(`so ${he} can be fresh and ready for more sexual use even as ${he} guards your person.`);
			break;
		case "be the Schoolteacher":
			r.push(`before ${he} returns to teaching ${his} classes.`);
			break;
		default:
			r.push(`before ${he} returns to ${slave.assignment}.`);
	}
	App.Events.addParagraph(node, r);
	return node;
};
