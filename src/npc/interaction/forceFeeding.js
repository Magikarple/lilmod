/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.Interact.forceFeeding = function(slave) {
	const node = new DocumentFragment();
	let r = [];

	const {
		He, His,
		he, his, him, himself, girl
	} = getPronouns(slave);

	let doMe;

	const belly = bellyAdjective(slave);
	if (slave.bellyAccessory !== "a support band") {
		slave.bellyAccessory = "none";
	}
	let isDone = slave.inflation-1;
	let pregDiscovery = 0;
	r.push(`You call ${him} over and ask ${him} to wait patiently for a moment.`);
	if (slave.fetish === Fetish.MINDBROKEN) {
		r.push(`${He} shows no response as`);
	} else {
		r.push(`${He} barely has time to ponder why you called for ${him} when`);
	}
	r.push(`another slave carries in a pair of`);
	if (slave.inflation === 3) {
		r.push(`one gallon`);
	} else if (slave.inflation === 2) {
		r.push(`two liter`);
	} else {
		r.push(`one liter`);
	}
	r.push(`buckets overflowing with slave food. ${He} is going to eat it all and you're going to enjoy ${him} as ${he} does it.`);

	if (slave.inflation > 1 && slave.preg > 1) {
		r.push(`${He} looks nauseated by the`);
		if (canSee(slave)) {
			r.push(`sight`);
		} else if (canSmell(slave)) {
			r.push(`smell`);
		} else {
			r.push(`very existence`);
		}
		r.push(`of the food.`);
	} else if (slave.fetish === Fetish.SUBMISSIVE && slave.devotion >= -20) {
		r.push(`${He} blushes at the thought of being forced to eat for another's amusement.`);
	} else if (slave.behavioralFlaw === "gluttonous" && slave.devotion >= -20) {
		r.push(`${He}'s awestruck that you approve of ${his} gluttony enough to present ${him} a feast.`);
	} else if (slave.behavioralFlaw === "gluttonous") {
		r.push(`${He}'s hesitant about your intent, but ${he} gives in as ${his} belly begins to growl at the`);
		if (canSee(slave)) {
			r.push(`sight`);
		} else if (canSmell(slave)) {
			r.push(`smell`);
		} else {
			r.push(`anticipation`);
		}
		r.push(`of ${his} waiting meal.`);
	} else if (slave.behavioralFlaw === "anorexic") {
		r.push(`${He} grimaces at the`);
		if (canSee(slave)) {
			r.push(`sight`);
		} else if (canSmell(slave)) {
			r.push(`smell`);
		} else {
			r.push(`thought`);
		}
		r.push(`of the food that will soon be going into ${him}. ${He} knows you won't let it come back up later.`);
	}

	if (canMove(slave)) {
		r.push(`You instruct ${him} to take a seat on your lap and open`);
		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`wide, but ${he} remains still and unresponsive. Talking to a broken mind is pointless.`);
		} else {
			r.push(`wide.`);
		}
		if (slave.devotion < -20) {
			r.push(`Opposed to the thought of being forced to eat all that food, ${he} tries to`);
			if (canWalk(slave)) {
				r.push(`step back,`);
			} else {
				r.push(`crawl away,`);
			}
			r.push(`but you catch ${him} and pull ${him} into your lap, wrapping an arm`);
		} else if (slave.fetish === Fetish.SUBMISSIVE) {
			r.push(`${He} meekly settles into your lap and shudders as ${he} feels your dominant hand wrap`);
		} else if (slave.behavioralFlaw === "gluttonous") {
			r.push(`${He} wastes no time getting into position with ${his} mouth agape as you wrap your hand`);
		} else if (slave.devotion <= 20) {
			r.push(`${He} complies without comment and settles ${himself} onto your lap, shuddering slightly as you wrap your arm`);
		} else if (slave.devotion <= 50) {
			r.push(`${He} hesitates but eventually settles onto your lap as you wrap your arm`);
		} else {
			r.push(`${He} eagerly settles ${himself} onto your lap as you wrap your arm`);
		}
	} else if (isAmputee(slave)) {
		if (slave.devotion < -20) {
			r.push(`${He}'s opposed to the thought of being forced to eat all that food, but as an amputee can do nothing about it. You heft ${him} onto your lap, wrapping an arm`);
		} else if (slave.fetish === Fetish.SUBMISSIVE) {
			r.push(`${He}'s opposed to the thought of being forced to eat all that food, but as an amputee can do nothing about it; not that ${he}'d go against your orders anyway. ${He} shudders with pleasure as you heft ${him} onto your lap, wrapping a dominant arm`);
		} else if (slave.behavioralFlaw === "gluttonous") {
			r.push(`${He} can't wait to chow down, but as an amputee can do nothing to get in position. ${He} shudders with anticipation as you heft ${him} onto your lap, wrapping an arm`);
		} else if (slave.devotion <= 20) {
			r.push(`${He}'s hesitant of being force-fed, but as an amputee can do nothing about it. You heft ${him} onto your lap, wrapping your arm`);
		} else if (slave.devotion <= 50) {
			r.push(`${He}'s mildly hesitant of being force-fed, but as an amputee can do nothing about it. You heft ${him} onto your lap, wrapping your arm`);
		} else {
			r.push(`${He} devotedly`);
			if (canSee(slave)) {
				r.push(`looks`);
			} else {
				r.push(`smiles`);
			}
			r.push(`at you as you heft ${him} onto your lap, wrapping your arm`);
		}
	} else {
		r.push(`You inform ${him} ${he}'ll be taking a seat on your lap and opening wide for ${his} meal.`);
		if (slave.devotion < -20) {
			r.push(`${He}'s opposed to the thought of being forced to eat all that food, but since ${he} is immobile, can't escape. You heft ${him} onto your lap, wrapping an arm`);
		} else if (slave.fetish === Fetish.SUBMISSIVE) {
			r.push(`${He} accepts your orders without question. ${He} shudders with pleasure as you heft ${him} onto your lap, wrapping a dominant arm`);
		} else if (slave.behavioralFlaw === "gluttonous") {
			r.push(`${He} eagerly tries to get to your lap faster. ${He} shudders with anticipation as you heft ${him} onto your lap, wrapping your arm`);
		} else if (slave.devotion <= 20) {
			r.push(`${He} complies without comment. You heft ${him} onto your lap, wrapping an arm`);
		} else if (slave.devotion <= 50) {
			r.push(`${He} hesitates for a moment, before demonstrating acceptance. You heft ${him} onto your lap, wrapping an arm`);
		} else {
			r.push(`${He} squirms with excitement as you heft ${him} onto your lap, wrapping an arm`);
		}
	}
	if (slave.fetish === Fetish.MINDBROKEN) {
		r.push(`You reach out and wrap your arms`);
	}

	r.push(`around ${his}`);
	if (slave.weight > 190) {
		r.push(`immensely soft`);
	} else if (slave.belly >= 150000) {
		r.push(belly);
	} else if (slave.weight > 160) {
		r.push(`massive soft`);
	} else if (slave.weight > 130) {
		r.push(`giant soft`);
	} else if (slave.belly >= 1500) {
		r.push(belly);
	} else if (slave.weight > 95) {
		r.push(`huge soft`);
	} else if (slave.weight > 30) {
		r.push(`big soft`);
	} else if (slave.weight > 10) {
		r.push(`soft`);
	} else if (slave.muscles > 95) {
		r.push(`chiseled`);
	} else if (slave.muscles > 30) {
		r.push(`muscular`);
	} else if (slave.muscles > 5) {
		r.push(`firm, ripped`);
	} else {
		r.push(`firm, flat`);
	}
	if (slave.fetish === Fetish.MINDBROKEN) {
		r.push(`belly, pulling ${him} into your lap.`);
	} else {
		r.push(`belly.`);
	}

	r.push(`You hold ${him} tight as you pull ${his} meal closer, dip in a cup and bring it to ${his} lips.`);
	if (slave.fetish === Fetish.MINDBROKEN) {
		r.push(`It takes little effort to get ${him} to gulp down the contents`);
	} else if (slave.devotion < -20) {
		r.push(`${He} struggles in your lap and refuses to open ${his} mouth. You drop the cup back into the bucket and lean in close. You quickly clip ${his} nose shut, eliciting a panicked thrash from the ${girl}.`);
		if (hasAnyLegs(slave)) {
			r.push(`You warn ${him} that ${his} punishment will be severe if ${he} comes that close to kicking over the buckets again.`);
		}
		r.push(`With ${his} mouth forced open, you now have a clear avenue with which to pour the slave food into ${his} mouth. ${He} sputters as ${he} struggles to swallow with ${his} nose shut. After several cups, tears are streaming down ${his} face from the discomfort. Weeping, ${he} implores you to remove the clamp so that ${he} may drink like a good ${girl}.`);
	} else if (slave.fetish === Fetish.SUBMISSIVE) {
		r.push(`${He} submissively drinks the contents and readies ${his} lips for the next,`);
	} else if (slave.behavioralFlaw === "gluttonous") {
		r.push(`${He} hurriedly gulps down the contents and opens wide for the next,`);
	} else if (slave.devotion <= 20) {
		r.push(`${He} wordless drinks the contents,`);
	} else if (slave.devotion <= 50) {
		r.push(`${He} drinks the contents without hesitation,`);
	} else {
		r.push(`${He} happily downs the contents,`);
	}

	if (slave.fetish !== Fetish.MINDBROKEN && slave.devotion < -20) {
		r.push(`You readily comply and waste no time in bring cupful after cupful to ${his} lips.`);
	} else {
		r.push(`so you keep the cupfuls coming.`);
	}

	r.push(`You can feel ${his} ${slave.skin} belly swelling with ${slave.inflationType} as it pushes out against your hand. Once ${he} has downed two liters, you give ${his} bloated belly a slap, eliciting`);
	if (slave.fetish === Fetish.MINDBROKEN) {
		r.push(`a small burp from the broken slave`);
	} else if (slave.devotion < -20) {
		r.push(`a shudder from the groaning slave`);
	} else if (slave.fetish === Fetish.SUBMISSIVE) {
		r.push(`a subtle belch that the moaning slave quickly apologizes for,`);
	} else if (slave.behavioralFlaw === "gluttonous") {
		r.push(`a subtle belch from the moaning slave`);
	} else if (slave.devotion <= 20) {
		r.push(`a small shudder from the bloated slave`);
	} else if (slave.devotion <= 50) {
		r.push(`a small hiccup that the overfilled slave immediately apologizes for,`);
	} else {
		r.push(`a cute burp from the bloated slave, followed by ${his} tongue running over ${his} lips`);
	}
	r.push(`and a little jiggle from ${his} gut.`);

	App.Events.addParagraph(node, r);
	r = [];

	if (slave.pregKnown === 0 && slave.preg > slave.pregData.normalBirth/13.33 && isDone > 0) {
		r.push(`As soon as the next helping enters ${him} you feel something is wrong. ${He} begins to heave,`);
		if (slave.fetish !== Fetish.MINDBROKEN && slave.devotion > 50) {
			r.push(`struggling to keep down the slave food, however ${he} shortly expels the entirety of ${his} stomach across the floor.`);
		} else {
			r.push(`shortly expelling the entirety of ${his} stomach`);
		}
		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`all over ${himself} and your lap.`);
		} else if (slave.devotion < -20) {
			r.push(`all over ${himself} and your lap.`);
		} else if (slave.fetish === Fetish.SUBMISSIVE) {
			r.push(`onto your floor.`);
		} else if (slave.behavioralFlaw === "gluttonous") {
			r.push(`all over ${himself} and your lap.`);
		} else if (slave.devotion <= 20) {
			r.push(`all over ${himself} and your lap.`);
		} else if (slave.devotion <= 50) {
			r.push(`across the floor.`);
		}
		r.push(`It didn't seem to be willful,`);
		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`not that much is with ${him}, but is still unacceptable.`);
		} else if (slave.devotion < -20) {
			r.push(`given how pathetically ${he} is cowering from your wrath, but is completely unacceptable.`);
		} else if (slave.fetish === Fetish.SUBMISSIVE) {
			r.push(`given how ${he} is begging to clean it up with ${his} tongue, but is completely unacceptable.`);
		} else if (slave.behavioralFlaw === "gluttonous") {
			r.push(`given how ${he} is in tears over the loss of such a meal, but is completely unacceptable.`);
		} else if (slave.devotion <= 20) {
			r.push(`given how ${he} is begging you to try again, but is completely unacceptable.`);
		} else if (slave.devotion <= 50) {
			r.push(`given how disappointed ${he} is in failing you, but is completely unacceptable.`);
		} else {
			r.push(`given how disappointed ${he} is in failing you, but is worrying. Such a good slave shouldn't do such bad things.`);
		}
		pregDiscovery = 1;
	} else {
		if (isDone > 0) {
			isDone--;
			r.push(`But ${he} isn't done`);
			if (slave.fetish === Fetish.MINDBROKEN) {
				r.push(`yet.`);
			} else if (slave.devotion < -20) {
				r.push(`yet.`);
			} else if (slave.fetish === Fetish.SUBMISSIVE) {
				r.push(`yet, not that ${he} minds.`);
			} else if (slave.behavioralFlaw === "gluttonous") {
				r.push(`yet, much to ${his} delight.`);
			} else if (slave.devotion <= 20) {
				r.push(`yet, much to ${his} dismay.`);
			} else if (slave.devotion <= 50) {
				r.push(`yet, not that ${he}'d risk complaining.`);
			} else {
				r.push(`yet, not that ${he}'d complain about fulfilling your desires.`);
			}
			r.push(`More and more you feed ${him}; ${his} belly swelling ever larger and growing even heavier as ${he}`);
			if (slave.fetish === Fetish.MINDBROKEN) {
				r.push(`guzzles`);
			} else if (slave.devotion < -20) {
				r.push(`painstakingly drinks`);
			} else if (slave.fetish === Fetish.SUBMISSIVE) {
				r.push(`diligently drinks`);
			} else if (slave.behavioralFlaw === "gluttonous") {
				r.push(`desperately sucks down`);
			} else if (slave.devotion <= 20) {
				r.push(`diligently drinks`);
			} else if (slave.devotion <= 50) {
				r.push(`diligently drinks`);
			} else {
				r.push(`diligently drinks`);
			}
			r.push(`the slave food. You reposition yourself to bet a better hold on ${his} bulging food baby. As ${he} passes the gallon mark, you give the swollen orb a good jiggle, eliciting`);
			if (slave.fetish === Fetish.MINDBROKEN) {
				r.push(`a burp from the broken slave and tons of motion under your arm.`);
			} else if (slave.devotion < -20) {
				r.push(`a pained burp from the crying slave and tons of motion under your arm.`);
			} else if (slave.fetish === Fetish.SUBMISSIVE) {
				r.push(`a moan of arousal over your control and tons of motion under your arm.`);
			} else if (slave.behavioralFlaw === "gluttonous") {
				r.push(`a load hiccup, tons of motion under your arm, and a plea for more food.`);
			} else if (slave.devotion <= 20) {
				r.push(`a strained burp from the full slave and tons of motion under your arm.`);
			} else if (slave.devotion <= 50) {
				r.push(`a small hiccup, which the bloated slave immediately apologizes for, and tons of motion under your arm.`);
			} else {
				r.push(`a small sigh followed by a request for more, from the bloated slave and tons of motion under your arm.`);
			}
			App.Events.addParagraph(node, r);
			r = [];
		}
		if (isDone > 0) {
			if (slave.fetish === Fetish.MINDBROKEN) {
				r.push(`${He} squirms a little in discomfort, but ${he} still has another gallon to go, so you continue feeding food into ${his} mouth.`);
			} else if (slave.devotion < -20) {
				r.push(`${He} squirms in discomfort, but ${he} still has another gallon to go and ${he} knows it. You remind ${him} of the ways you can torment ${him} in this state so you can continue feeding food into ${his} mouth without too much resistance.`);
			} else if (slave.fetish === Fetish.SUBMISSIVE) {
				r.push(`${He} gets comfortable as ${he} still has another gallon to go and ${he} knows it. Gulping, ${he} opens ${his} mouth in preparation, eager to obey ${his} dom.`);
			} else if (slave.behavioralFlaw === "gluttonous") {
				r.push(`${He} still has another gallon to go and ${he} knows it, so ${he} wastes no time in letting you know ${he}'s ready.`);
			} else if (slave.devotion <= 20) {
				r.push(`${He} begins to struggle when ${he} realizes ${he} still has another gallon to go. Gulping, ${he} opens up as another helping approaches ${his} mouth.`);
			} else if (slave.devotion <= 50) {
				r.push(`${He} still has another gallon to go and ${he} knows it, so ${he} tries ${his} best to get comfortable and give ${his} belly room to grow. Gulping, ${he} diligently opens up for the next serving.`);
			} else {
				r.push(`${He} still has another gallon to go and ${he} knows it, but if ${getWrittenTitle(slave)} wants ${him} to be stuffed like a turkey, ${he}'ll happily comply. ${He} wastes no time in opening up for your next helping.`);
			}
			r.push(`You can feel the pressure growing in ${his} middle as it fills out under your arm more and more. ${He}`);
			if (slave.fetish === Fetish.MINDBROKEN) {
				r.push(`mechanically downs every sip you give ${him} with no concern for ${his} own health.`);
			} else if (slave.devotion < -20) {
				r.push(`struggles to down every sip you give ${him} and pants heavily whenever ${he} gets the chance.`);
			} else if (slave.fetish === Fetish.SUBMISSIVE) {
				r.push(`struggles to down every sip you give ${him} and pants heavily whenever ${he} gets the chance.`);
			} else if (slave.behavioralFlaw === "gluttonous") {
				r.push(`forces down every sip you give ${him} and pants heavily when ${his} mouth isn't full.`);
			} else if (slave.devotion <= 20) {
				r.push(`struggles to down every sip you give ${him} and pants heavily whenever ${he} gets the chance.`);
			} else if (slave.devotion <= 50) {
				r.push(`obediently downs every gulp you give ${him} and pants heavily between helpings.`);
			} else {
				r.push(`devotedly downs every gulp you give ${him} and catches ${his} breath, while being a tease, between helpings.`);
			}
			r.push(`Once the last of the slave food is in ${his} stomach, you give the firm globe a`);
			if (slave.devotion > 20) {
				r.push(`gentle`);
			}
			r.push(`slap, eliciting`);
			if (slave.fetish === Fetish.MINDBROKEN) {
				r.push(`a large belch from the broken slave.`);
			} else if (slave.devotion < -20) {
				r.push(`a large belch and a glare from the straining slave.`);
			} else if (slave.fetish === Fetish.SUBMISSIVE) {
				r.push(`a large belch and a squeak of shame from the submissive slave.`);
			} else if (slave.behavioralFlaw === "gluttonous") {
				r.push(`a large belch and a content sigh from the bloated glutton.`);
			} else if (slave.devotion <= 20) {
				r.push(`a restrained gag from the overfilled slave.`);
			} else if (slave.devotion <= 50) {
				r.push(`a small hiccup from the overfilled slave, which ${he} immediately apologizes for.`);
			} else {
				r.push(`a large belch and a playfully stuck out tongue from the stuffed slave.`);
			}
			r.push(`${His} belly is as taut as a drum; you`);
			if (slave.devotion > 20) {
				r.push(`rub it some more`);
			} else {
				r.push(`pat it several more times`);
			}
			r.push(`as you appreciate its size.`);
			doMe = 1;
			App.Events.addParagraph(node, r);
			r = [];
		}
		r.push(`Knocking the empty buckets aside, you help ${his}`);
		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`hiccupping`);
		} else if (slave.devotion < -20) {
			r.push(`hiccupping`);
		} else if (slave.fetish === Fetish.SUBMISSIVE) {
			r.push(`hiccupping`);
		} else if (slave.behavioralFlaw === "gluttonous") {
			r.push(`hiccupping`);
		} else if (slave.devotion <= 20) {
			r.push(`heaving`);
		} else if (slave.devotion <= 50) {
			r.push(`hefty`);
		} else {
			r.push(`hefty`);
		}
		r.push(`bulk onto the couch to recover.`);
		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`After a few minutes of rest, and several glares from you when it appears ${his} meal might be coming back up,`);
		} else if (slave.devotion < -20) {
			r.push(`${He}`);
			if (canSee(slave)) {
				r.push(`looks in your eyes,`);
			} else {
				r.push(`faces you,`);
			}
			r.push(`as though almost demanding answers. ${He} looks apprehensive about what you will do next. After a few minutes of rest, and several glares from you when it appears ${his} meal might be coming back up,`);
		} else if (slave.fetish === Fetish.SUBMISSIVE) {
			r.push(`${He}`);
			if (canSee(slave)) {
				r.push(`looks in your eyes;`);
			} else {
				r.push(`faces you;`);
			}
			r.push(`a satisfied smile on ${his} face. ${He} almost looks sad that it's over, though ${his} gurgling middle says otherwise. After a few minutes of rest,`);
		} else if (slave.behavioralFlaw === "gluttonous") {
			r.push(`${He}`);
			if (canSee(slave)) {
				r.push(`looks in your eyes;`);
			} else {
				r.push(`faces you;`);
			}
			r.push(`a satisfied smile on ${his} face. ${He} almost looks sad that it's over, and ${his} stomach audibly grumbles its displeasure that no more food is working down ${his} throat. After a few minutes of rest,`);
		} else if (slave.devotion <= 20) {
			r.push(`${He} looks up at you quizzically, unsure about what you will do next. ${His} meal attempts to come back up on ${him} several times, but ${he} holds it down for fear of punishment should ${he} vomit. After a few minutes of rest,`);
		} else if (slave.devotion <= 50) {
			r.push(`${He} sighs contently, hoping you'll give ${him} more attention. ${His} meal attempts to come back up on ${him} several times, but ${he} dutifully holds it down. After a few minutes of rest,`);
		} else {
			r.push(`${He} sighs contently, hoping you'll give ${him} more attention. ${He} is proud to let you know that you could fit even more in ${him} if you wanted. After a few minutes of rest,`);
		}
		r.push(`you order ${him} to continue stuffing ${himself} to maintain ${his} current size until you say otherwise.`);
		if (slave.fetish !== Fetish.MINDBROKEN && slave.devotion >= -20 && slave.behavioralFlaw === "gluttonous") {
			r.push(`${He} squeals with glee at the order.`);
		}
		r.push(`You spend ${his} remaining time in recovery`);
		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`teasing ${his} belly until you tire of ${him} and send ${him} on ${his} way.`);
		} else if (slave.devotion < -20) {
			r.push(`tormenting ${his} gurgling belly until you tire of ${his} sobbing and send ${him} on ${his} way.`);
		} else if (slave.fetish === Fetish.SUBMISSIVE && slave.devotion <= 20) {
			r.push(`toying with ${his} belly until you tire of ${his} moaning and send ${him} on ${his} way.`);
		} else if (slave.behavioralFlaw === "gluttonous" && slave.devotion <= 20) {
			r.push(`massaging ${his} stuffed belly until you tire of ${him} and send ${him} on ${his} way.`);
		} else if (slave.devotion <= 20) {
			r.push(`tormenting ${his} gurgling belly until you tire of ${his} groaning and send ${him} on ${his} way.`);
		} else if (slave.devotion <= 50) {
			r.push(`lavishing attention on ${his} gurgling belly, much to ${his} delight, until you tire of ${him} and send ${him} on ${his} way.`);
		} else {
			r.push(`playing with ${his} belly. ${He} joins you in the endeavor, happy that you are pleased with the`);
			if (doMe !== 1) {
				r.push(`outcome.`);
			} else {
				r.push(`outcome, but ${his}`);
				if (canSee(slave)) {
					r.push(`eyes tell`);
				} else {
					r.push(`face tells`);
				}
				r.push(`you ${he} wants more.`);
			}
			// Fuckings for devoted slaves.
			doMe = 1;
			let sexType;
			if (canDoVaginal(slave) && slave.vagina > 0) {
				sexType = "vaginal";
			} else if (canDoAnal(slave) && slave.anus > 0) {
				sexType = "anal";
			} else {
				sexType = "none";
			}
			if (sexType !== "none") {
				if (V.PC.belly >= 10000) {
					doMe = 0;
					r.push(`${His}`);
					if (sexType === "vaginal") {
						r.push(`pussy`);
					} else {
						r.push(`ass`);
					}
					r.push(`is under a lot of pressure from ${his} swollen middle and surely would feel amazing; it's even`);
					if (sexType === "vaginal") {
						r.push(`sopping wet for`);
					} else {
						r.push(`eagerly winking at`);
					}
					r.push(`you. Unfortunately, no matter how hard you try, you can't find a position that will accommodate both ${his} food-stuffed stomach and your own gravid middle. Sighing, you settle for ${his} mouth instead.`);
				} else {
					if (V.PC.dick !== 0) {
						r.push(`You're already rock hard so you`);
					} else {
						if (sexType === "vaginal") {
							r.push(`You don a strap-on and`);
						} else {
							r.push(`You don a strap-on, lube up,`);
						}
					}
					r.push(`pull ${his} legs apart,`);
					if (sexType === "vaginal") {
						r.push(`revealing ${his}`);
						if (slave.vaginaLube > 1) {
							r.push(`sopping wet,`);
						} else if (slave.vaginaLube > 0) {
							r.push(`moist,`);
						} else {
							r.push(`moist, relative to its usual dryness,`);
						}
						if (slave.vagina >= 10) {
							r.push(`devastated`);
						} else if (slave.vagina > 3) {
							r.push(`cavernous`);
						} else if (slave.vagina > 2) {
							r.push(`loose`);
						} else if (slave.vagina > 1) {
							r.push(`used`);
						} else {
							r.push(`tight`);
						}
						r.push(`pussy.`);
					} else {
						r.push(`and heft ${his} bulk up to reveal ${his}`);
						if (slave.anus > 3) {
							r.push(`gaping asshole.`);
						} else if (slave.anus > 2) {
							r.push(`loose anus.`);
						} else if (slave.anus > 1) {
							r.push(`used asshole.`);
						} else {
							r.push(`tight asshole.`);
						}
					}
					r.push(`${His} belly is putting so much pressure on it that`);
					const looseness = (sexType === "vaginal") ? slave.vagina : slave.anus;
					if (sexType === "vaginal" && looseness >= 10) {
						r.push(`you might be able to get some decent friction now.`);
						if (V.PC.dick !== 0) {
							r.push(`You can actually feel the sides of ${his} cunt as you slide in.`);
						} else {
							r.push(`You slide in like it's still nothing.`);
						}
					} else if (looseness > 3) {
						r.push(`you should be able to get a decent fuck out of it.`);
						if (V.PC.dick !== 0) {
							r.push(`You can't help but be amazed that you're getting some resistance as you slide in.`);
						} else {
							r.push(`You slide in like it's nothing.`);
						}
					} else if (looseness > 2) {
						r.push(`it won't feel so`);
						if (sexType === "vaginal") {
							r.push(`worn out.`);
						} else {
							r.push(`stretched.`);
						}
						if (V.PC.dick !== 0) {
							r.push(`${He} gives some nice resistance as you squeeze into ${him}.`);
						} else {
							r.push(`You squeeze in without problem.`);
						}
					} else if (looseness > 1) {
						r.push(`it'll feel positively tight.`);
						if (V.PC.dick !== 0) {
							r.push(`${His}`);
							if (sexType === "vaginal") {
								r.push(`pussy`);
							} else {
								r.push(`anus`);
							}
							r.push(`feels great, you practically had to squeeze in.`);
						} else {
							r.push(`You squeeze in with a little effort.`);
						}
					} else {
						r.push(`you'll barely be able to fit it in.`);
						if (V.PC.dick !== 0) {
							r.push(`${His}`);
							if (sexType === "vaginal") {
								r.push(`vagina`);
							} else {
								r.push(`rear`);
							}
							r.push(`is so tight you can barely get it in, but with a little work, you manage to squeeze into its tight confines. ${He}'s tighter than any`);
							if (sexType === "anal") {
								r.push(`anal`);
							}
							r.push(`virgin you've ever fucked.`);
						} else {
							r.push(`You have to`);
							if (sexType === "vaginal") {
								r.push(`lube up some,`);
							} else {
								r.push(`get a little rough,`);
							}
							r.push(`but eventually you manage to slide into ${his} extremely tight`);
							if (sexType === "vaginal") {
								r.push(`vagina.`);
							} else {
								r.push(`anus.`);
							}
						}
					}
					r.push(`Once you're hilted, you bring your hands to ${his} distended belly, eager to feel it move as you fuck ${him}.`);
					if (hasAnyArms(slave)) {
						r.push(`${His} own ${hasBothArms(slave) ? `join` : `joins`} yours atop the taut dome.`);
					}
					r.push(`Every thrust into the stuffed ${SlaveTitle(slave)} forces ${his} full middle to leap back before slamming into your stomach alongside a moaning groan. As you pick up the pace, ${he} begins to buck against you, adding even more motion to ${his} body. It doesn't take long for you to reach your peak and, after cumming, catch sight of ${his} own climax. Watching ${his} middle attempt to contract around the mass of slave food inside ${him} invigorates you for a second round.`);
					if (V.PC.balls >= 30) {
						r.push(`By the time you're done, ${he}'s positively massive; your copious seed flows out of ${him} in spurts as ${his} body desperately struggles to relieve the extra pressure your huge balls pumped into ${him}.`);
					}
					r.push(`Once you are spent,`);
					if (V.PC.balls >= 30) {
						r.push(`and ${he}'s forced out all your cum,`);
					}
					r.push(`you settle down beside ${him} and rest your head against ${his} belly; it almost feels like a water-filled pillow, albeit a little noisy. You and ${slave.slaveName} doze off together for a much needed nap. You don't get much rest; ${his} stomach's constant groaning and burbling keeps you up, so you send ${him} on ${his} way. ${He} blows you one last kiss and eagerly looks forward to next time.`);
					if (sexType === "vaginal") {
						r.push(VCheck.Vaginal(slave, 2));
					} else {
						r.push(VCheck.Anal(slave, 2));
					}
				}
			} else {
				doMe = 0;
			}
			if (doMe === 0) {
				if (V.PC.dick !== 0) {
					r.push(`You crawl onto the couch above ${his} head and lower your erect cock straight into ${his} waiting mouth. ${He} eagerly sucks you off, ${his} belly wobbling with every thrust into ${his} throat. You cum fast and hard into ${him}, a product of being on the edge during ${his} feeding;`);
					if (slave.behavioralFlaw === "gluttonous") {
						r.push(`${he} takes it like nothing and resumes sucking, ${his} gluttony showing no bounds.`);
					} else {
						r.push(`${he} swallows it promptly and keeps sucking. You'd swear ${he} was a glutton at this point.`);
					}
				} else {
					r.push(`You crawl onto the couch above ${his} head and lower your needy pussy straight onto ${his} outstretched tongue. ${He} eagerly eats you out, ${his} belly wobbling along to ${his} vigorous licking. You cum fast and hard onto ${him}, a product of being on the edge during ${his} feeding;`);
					if (slave.behavioralFlaw === "gluttonous") {
						r.push(`${he} laps it all up and resumes pleasuring you, ${his} gluttony showing no bounds.`);
					} else {
						r.push(`${he} laps it promptly and resumes pleasuring you. You'd swear ${he} was a glutton at this point.`);
					}
				}
				r.push(`Once you are spent, you slide down beside ${him} and rest your head against ${his} belly; it almost feels like a water-filled pillow, albeit a little noisy. You and ${slave.slaveName} doze off together for a much needed nap. You don't get much rest; ${his} stomach's constant groaning and burbling keeping you up, so you send ${him} on ${his} way. ${He} blows you one last kiss and eagerly looks forward to next time.`);

				seX(slave, "oral", V.PC, "penetrative", 2);
			}
		}
	}

	if (pregDiscovery === 1) {
		r.push(`Once you've managed to stop ${his} heaving and clean up, you decide to get to the root of this mess. While most of the tests come back normal, one in particular catches your eye; <span class="lime">${he} is pregnant${(slave.preg > slave.pregData.normalBirth/4) ? ` and surprisingly far along` : ``}.</span>`);
		deflate(slave);
		slave.pregKnown = 1;
	} else {
		if (slave.inflation === 3) {
			if (canWalk(slave) || (canMove(slave) && slave.rules.mobility === "permissive")) {
				r.push(`${He} gingerly leaves your office, massaging ${his} over-stuffed belly as ${he} goes.`);
			} else {
				r.push(`${His} belly wobbles heavily as ${he} is helped from your office.`);
			}
			r.push(`Being filled so full <span class="health dec">surely had negative effects</span> on ${his} health.`);
			healthDamage(slave, 10);
		} else if (slave.inflation === 2) {
			if (canWalk(slave) || (canMove(slave) && slave.rules.mobility === "permissive")) {
				r.push(`${He} gingerly leaves your office, massaging ${his} stuffed belly as ${he} goes.`);
			} else {
				r.push(`${His} belly wobbles heavily as ${he} is helped from your office.`);
			}
		} else if (slave.inflation === 1) {
			if (canWalk(slave) || (canMove(slave) && slave.rules.mobility === "permissive")) {
				r.push(`${He} gingerly leaves your office, massaging ${his} distended belly as ${he} goes.`);
			} else {
				r.push(`${His} belly wobbles as ${he} is helped from your office.`);
			}
		}
		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`You question if the broken ${girl} understood your commands, but relish the idea of force-feeding ${him} even more should ${he} fail you.`);
		}
	}

	SetBellySize(slave);
	App.Events.addParagraph(node, r);
	return node;
};
