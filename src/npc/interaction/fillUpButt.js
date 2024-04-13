/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.Interact.fillUpButt = function(slave) {
	const node = new DocumentFragment();
	let r = [];

	const {
		He, His,
		he, his, him, himself
	} = getPronouns(slave);

	if (slave.bellyAccessory !== "a support band") {
		slave.bellyAccessory = "none";
	}
	let pregDiscovery = 0;
	r.push(`You`);
	switch (slave.inflationType) {
		case "water":
		case "aphrodisiac":
		case "curative":
		case "tightener":
			r.push(`pull out an enema bag and`);
			if (slave.inflation < 2) {
				r.push(`a two liter bag of solution,`);
			} else {
				r.push(`a one gallon bag of solution,`);
			}
			break;
		case "cum":
		case "milk":
			r.push(`attach a hose to ${V.dairyName} tap with the pipes set to pump ${slave.inflationType},`);
			break;
		case "urine":
			r.push(`attach a hose to your penthouse's plumbing tap,`);
	}
	r.push(`before calling ${him} over so you can play with ${his}`);
	if (slave.butt < 2) {
		r.push(`flat, tight ass`);
	} else if (slave.butt <= 2) {
		r.push(`cute bottom`);
	} else if (slave.butt <= 3) {
		r.push(`round, firm rump`);
	} else if (slave.butt <= 4) {
		r.push(`curvy, enticing butt`);
	} else if (slave.butt <= 5) {
		r.push(`huge rear end`);
	} else if (slave.butt <= 6) {
		r.push(`massive, alluring rump`);
	} else if (slave.butt <= 7) {
		r.push(`enormous, hypnotic ass`);
	} else if (slave.butt <= 10) {
		r.push(`gigantic, jiggly rear`);
	} else if (slave.butt <= 14) {
		r.push(`inhuman, cushiony butt cheeks`);
	} else if (slave.butt <= 20) {
		r.push(`couch-like, super jiggly ass cheeks`);
	}
	r.push(`before shoving the equipment into ${his}`);
	if (slave.anus > 3) {
		r.push(`gaping anus.`);
	} else if (slave.anus === 3) {
		r.push(`loose anus.`);
	} else if (slave.anus === 2) {
		r.push(`well-used asshole.`);
	} else if (slave.anus === 1) {
		r.push(`tight butthole.`);
	} else if (slave.anus === 0) {
		r.push(`virgin butthole.`);
	}

	if (slave.inflation > 1 && slave.preg > 1) {
		r.push(`${He} looks uneasy at the prospect of that much fluid entering ${his} rear, far more than could be considered normal.`);
		pregDiscovery = 1;
	} else {
		if (slave.fetish === "buttslut" && slave.devotion >= -20) {
			r.push(`${He}'s pleased at the prospect of you touching ${his} favorite body part.`);
		} else if (slave.fetish === "cumslut" && slave.devotion >= -20 && slave.inflationType === "cum") {
			r.push(`${He}'s pleased at the idea of turning into a cum balloon.`);
		}
		if (slave.inflationType === "cum" || slave.inflationType === "milk") {
			if (slave.behavioralFlaw === "gluttonous" && slave.devotion >= -20) {
				r.push(`${He}'s thrilled that you are going to give ${him} such a filling meal.`);
			} else if (slave.behavioralFlaw === "anorexic" && slave.devotion >= -20) {
				r.push(`${He}'s hesitant about whether or not you are trying to make ${him} gain weight.`);
			}
		}
	}

	if (pregDiscovery === 1) {
		r.push(`Not wanting to risk such a mess, you send ${him} for a medical examination. While most of the tests come back normal, one in particular catches your eye; <span class="lime">${he} is pregnant${(slave.preg > slave.pregData.normalBirth/4) ? ` and surprisingly far along` : ``}.</span> ${He} should be able to still handle at least two liters of ${slave.inflationType} up ${his} ass, however.`);
		deflate(slave);
		slave.pregKnown = 1;
	} else if (slave.fetish === Fetish.MINDBROKEN) {
		if (canMove(slave)) {
			r.push(`You instruct ${him} to present ${his} buttocks and anus but ${he} remains still and unresponsive. Talking to a broken mind is pointless.`);
		}
		r.push(`You reach around and grab ${his}`);
		if (slave.butt < 2) {
			r.push(`flat`);
		} else if (slave.butt <= 2) {
			r.push(`cute`);
		} else if (slave.butt <= 3) {
			r.push(`firm`);
		} else if (slave.butt <= 4) {
			r.push(`generous`);
		} else if (slave.butt <= 5) {
			r.push(`massive`);
		} else if (slave.butt <= 7) {
			r.push(`enormous`);
		} else if (slave.butt <= 10) {
			r.push(`gigantic`);
		} else if (slave.butt <= 14) {
			r.push(`inhuman`);
		} else if (slave.butt <= 20) {
			r.push(`couch-like`);
		}
		if (V.seeRace === 1) {
			r.push(slave.race);
		}
		r.push(`buttocks before rubbing along them, feeling the shape of ${his}`);
		if (V.seeRace === 1) {
			r.push(slave.race);
		}
		r.push(`ass with your fingers and squeezing gently. ${He} reacts to your initial touch as you rub fingers around ${his}`);
		if (slave.anus > 3) {
			r.push(`gaping anus,`);
		} else if (slave.anus === 3) {
			r.push(`loose anus,`);
		} else if (slave.anus === 2) {
			r.push(`well-used asshole,`);
		} else if (slave.anus === 1) {
			r.push(`tight butthole,`);
		} else if (slave.anus === 0) {
			r.push(`virgin butthole,`);
		}
		r.push(`but you understand it is only physiological. You continue to move around ${his} posterior gently reaching to touch your fingertips against ${his} sphincter while rubbing ${his} ass at the same time. You circle around ${his} anus but ${he} remains still. You keep squeezing ${his} buttocks tenderly — first one, then the other and then both but ${he} is like a doll in your grasp. You pull ${his} body closer towards you by ${his} buttocks, turn ${him} around, and bend ${him} over your lap,`);
		if (slave.inflation === 2) {
			r.push(`${his} soft and jiggly ${slave.inflationType}-filled belly spilling over your legs.`);
		} else if (slave.inflation === 1) {
			r.push(`${his} ${slave.inflationType} distended belly resting on your legs.`);
		} else {
			r.push(`${his} belly resting on your legs.`);
		}
		r.push(`You look at ${his} rear while you squeeze ${his} cheeks and rub them with your firm hands. You explore the contours of ${his} posterior with both your eyes and hands, before picking up the hose and inserting it into ${his}`);
		if (slave.anus > 3) {
			r.push(`gaping`);
		} else if (slave.anus === 3) {
			r.push(`loose`);
		} else if (slave.anus === 2) {
			r.push(`well-used`);
		} else if (slave.anus === 1) {
			r.push(`tight`);
		} else if (slave.anus === 0) {
			r.push(`virgin`);
		}
		r.push(`butthole.`);
		if (slave.inflation === 2) {
			r.push(`${His} sloshing belly slowly grows even larger with ${slave.inflationType}. You rest a hand on ${his} back as ${his} swelling belly forces ${him} to rise off your lap. Once the enema is complete and ${he} is plugged, you push ${him} onto your desk and admire ${his} taut, ${slave.skin} stomach. You give the firm orb a slap, eliciting a slight grunt from the broken slave and no motion at all from ${his} gut. You order ${him} to keep ${himself} filled with two gallons of ${slave.inflationType} until you say otherwise.`);
		} else if (slave.inflation === 1) {
			r.push(`${His} bloated belly slowly swells even larger with ${slave.inflationType}. You slip a hand under ${his} stomach to feel it grow in your palm. Once the enema is complete and ${he} is plugged, you push ${him} onto your desk and admire ${his} jiggly, soft, ${slave.skin} stomach. You give the gut orb a slap, eliciting a slight grunt from the broken slave and whole bunch of wiggling and sloshing from ${his} middle. You order ${him} to keep ${himself} filled with four liters of ${slave.inflationType} until you say otherwise.`);
		} else {
			r.push(`${His} belly slowly swells with ${slave.inflationType}. You slip a hand under ${his} stomach to feel it grow in your palm. Once the enema is complete and ${he} is plugged, you push ${him} onto your desk and admire ${his} distended, ${slave.skin} stomach. You give the gut orb a slap, eliciting a slight grunt from the broken slave and touch of wiggling and sloshing from ${his} middle. You order ${him} to keep ${himself} filled with two liters of ${slave.inflationType} until you say otherwise.`);
		}
	} else if (slave.devotion < -20) {
		if (canMove(slave)) {
			r.push(`You instruct ${him} to present ${his} anus for a ${slave.inflationType} enema. Opposed to the thought of being filled`);
			if (slave.inflation > 0) {
				r.push(`more`);
			}
			r.push(`with ${slave.inflationType}, ${he} tries to`);
			if (canWalk(slave)) {
				r.push(`step back,`);
			} else {
				r.push(`crawl away,`);
			}
			r.push(`but you catch ${him} and pull ${him} closer to you as you reach around and grab ${his}`);
		} else if (!isAmputee(slave)) {
			r.push(`You instruct ${him} to present ${his} anus for a ${slave.inflationType} enema. ${He}'s opposed to the thought of being filled`);
			if (slave.inflation > 0) {
				r.push(`more`);
			}
			r.push(`with ${slave.inflationType}, but since ${he} is immobile, can't escape. You reach around and grab ${his}`);
		} else {
			r.push(`${He}'s opposed to the thought of being filled with`);
			if (slave.inflation > 0) {
				r.push(`more`);
			}
			r.push(`${slave.inflationType}, but as an amputee can do nothing about it. You reach around and grab ${his}`);
		}
		if (slave.butt < 2) {
			r.push(`flat`);
		} else if (slave.butt <= 2) {
			r.push(`cute`);
		} else if (slave.butt <= 3) {
			r.push(`firm`);
		} else if (slave.butt <= 4) {
			r.push(`generous`);
		} else if (slave.butt <= 5) {
			r.push(`massive`);
		} else if (slave.butt <= 7) {
			r.push(`enormous`);
		} else if (slave.butt <= 10) {
			r.push(`gigantic`);
		} else if (slave.butt <= 14) {
			r.push(`inhuman`);
		} else if (slave.butt <= 20) {
			r.push(`couch-like`);
		}
		if (V.seeRace === 1) {
			r.push(slave.race);
		}
		r.push(`buttocks.`);
		if (hasAnyArms(slave)) {
			r.push(`${He} tries to grab your`);
			if (hasBothArms(slave)) {
				r.push(`wrists to keep them`);
			} else {
				r.push(`wrist to keep it`);
			}
			r.push(`away but ${he} cannot resist for long.`);
		}
		r.push(`You start rubbing along ${his} cheeks, feeling the shape of ${his}`);
		if (V.seeRace === 1) {
			r.push(slave.race);
		}
		r.push(`ass with your fingers and squeezing gently. ${He} tries to break out of your grasp as you rub fingers around ${his}`);
		if (slave.anus > 3) {
			r.push(`gaping anus.`);
		} else if (slave.anus === 3) {
			r.push(`loose anus.`);
		} else if (slave.anus === 2) {
			r.push(`well-used asshole.`);
		} else if (slave.anus === 1) {
			r.push(`tight butthole.`);
		} else if (slave.anus === 0) {
			r.push(`virgin butthole.`);
		}
		r.push(`${He} writhes as you continue to move around ${his} posterior, gently reaching to touch your fingertips against ${his} sphincter while rubbing ${his} ass at the same time. ${He} struggles to stay still while you circle around ${his} anus with your fingers, not breaking contact with ${him}. You look at ${his} face and ${he} has`);
		if (!canSee(slave)) {
			r.push(`reflexively`);
		}
		r.push(`shut ${his} eyes, trying not to think about what's about to happen.`);
		if (hasAnyLegs(slave)) {
			r.push(`You pull ${his} body closer towards you by ${his} buttocks, turn ${him} around, and bend ${him} over your lap,`);
			if (slave.inflation === 2) {
				r.push(`${his} soft and jiggly ${slave.inflationType}-filled belly spilling over your legs,`);
			} else if (slave.inflation === 1) {
				r.push(`${his} ${slave.inflationType} distended belly resting on your legs,`);
			} else {
				r.push(`${his} belly resting on your legs,`);
			}
			r.push(`while ${he} tries to push away.`);
		} else {
			r.push(`You pull ${his} body closer towards you by ${his} buttocks, turn ${him} around, and place ${him} on your lap,`);
			if (slave.inflation === 2) {
				r.push(`${his} soft and jiggly ${slave.inflationType}-filled belly spilling over your legs,`);
			} else if (slave.inflation === 1) {
				r.push(`${his} ${slave.inflationType} distended belly resting on your legs,`);
			} else {
				r.push(`${his} belly resting on your legs,`);
			}
			r.push(`while ${he} tries to squirm away.`);
		}
		r.push(`You look at ${his} rear while you squeeze ${his} cheeks and rub them with your firm hands. You explore the contours of ${his} posterior with both your eyes and hands, before picking up the hose and inserting it into ${his}`);
		if (slave.anus > 3) {
			r.push(`gaping`);
		} else if (slave.anus === 3) {
			r.push(`loose`);
		} else if (slave.anus === 2) {
			r.push(`well-used`);
		} else if (slave.anus === 1) {
			r.push(`tight`);
		} else if (slave.anus === 0) {
			r.push(`virgin`);
		}
		r.push(`butthole, and setting it on low.`);
		if (slave.inflation === 2) {
			r.push(`${His} sloshing belly slowly grows even larger with ${slave.inflationType}. You rest a hand on ${his} back as ${his} swelling belly forces ${him} to rise off your lap. Once the enema is complete and ${he} is plugged, you`);
			if (canStand(slave)) {
				r.push(`push ${him} to ${his}`);
				if (hasBothLegs(slave)) {
					r.push(`feet`);
				} else {
					r.push(`foot`);
				}
			} else {
				r.push(`help ${him} onto your desk`);
			}
			r.push(`and admire ${his} taut, ${slave.skin} stomach. ${He}`);
			if (canSee(slave)) {
				r.push(`looks in your eyes,`);
			} else {
				r.push(`faces you,`);
			}
			r.push(`as though almost demanding answers. ${He} looks apprehensive about what you will do next. You order ${him} to keep ${himself} filled with two gallons of ${slave.inflationType} until you say otherwise.`);
		} else if (slave.inflation === 1) {
			r.push(`${His} bloated belly slowly swells even larger with ${slave.inflationType}. You slip a hand under ${his} stomach to feel it grow in your palm. Once the enema is complete and ${he} is plugged, you`);
			if (canStand(slave)) {
				r.push(`push ${him} to ${his}`);
				if (hasBothLegs(slave)) {
					r.push(`feet`);
				} else {
					r.push(`foot`);
				}
			} else {
				r.push(`help ${him} onto your desk`);
			}
			r.push(`and admire ${his} jiggly, soft, ${slave.skin} stomach. ${He}`);
			if (canSee(slave)) {
				r.push(`looks in your eyes,`);
			} else {
				r.push(`faces you,`);
			}
			r.push(`as though almost demanding answers. ${He} looks apprehensive about what you will do next. You order ${him} to keep ${himself} filled with four liters of ${slave.inflationType} until you say otherwise.`);
		} else {
			r.push(`${His} belly slowly swells with ${slave.inflationType}. You slip a hand under ${his} stomach to feel it grow in your palm. Once the enema is complete and ${he} is plugged, you`);
			if (canStand(slave)) {
				r.push(`push ${him} to ${his}`);
				if (hasBothLegs(slave)) {
					r.push(`feet`);
				} else {
					r.push(`foot`);
				}
			} else {
				r.push(`help ${him} onto your desk`);
			}
			r.push(`and admire ${his} distended, ${slave.skin} stomach. ${He}`);
			if (canSee(slave)) {
				r.push(`looks in your eyes,`);
			} else {
				r.push(`faces you,`);
			}
			r.push(`as though almost demanding answers. ${He} looks apprehensive about what you will do next. You order ${him} to keep ${himself} filled with two liters of ${slave.inflationType} until you say otherwise.`);
		}
	} else if (slave.devotion <= 20) {
		if (canMove(slave)) {
			r.push(`You instruct ${him} to present ${his} anus for a ${slave.inflationType} enema. ${He} complies without comment,`);
			if (canStand(slave)) {
				r.push(`standing in front of you.`);
			} else {
				r.push(`turning ${his} rear to you.`);
			}
		} else if (!isAmputee(slave)) {
			r.push(`You instruct ${him} to present ${his} anus for a ${slave.inflationType} enema. ${He} complies without comment, readying ${his} ass for you.`);
		} else {
			r.push(`${he}'s hesitant of being filled with`);
			if (slave.inflation > 0) {
				r.push(`more`);
			}
			r.push(`${slave.inflationType}, but as an amputee can do nothing about it.`);
		}
		r.push(`You reach around and grab ${his}`);
		if (slave.butt < 2) {
			r.push(`flat`);
		} else if (slave.butt <= 2) {
			r.push(`cute`);
		} else if (slave.butt <= 3) {
			r.push(`firm`);
		} else if (slave.butt <= 4) {
			r.push(`generous`);
		} else if (slave.butt <= 5) {
			r.push(`massive`);
		} else if (slave.butt <= 7) {
			r.push(`enormous`);
		} else if (slave.butt <= 10) {
			r.push(`gigantic`);
		} else if (slave.butt <= 14) {
			r.push(`inhuman`);
		} else if (slave.butt <= 20) {
			r.push(`couch-like`);
		}
		if (V.seeRace === 1) {
			r.push(slave.race);
		}
		r.push(`buttocks. ${He} can't stop ${himself} from becoming aroused as you start rubbing along ${his} cheeks, feeling the shape of ${his}`);
		if (V.seeRace === 1) {
			r.push(slave.race);
		}
		r.push(`ass with your fingers and squeezing gently. You rub your fingers around ${his}`);
		if (slave.anus > 3) {
			r.push(`gaping anus.`);
		} else if (slave.anus === 3) {
			r.push(`loose anus.`);
		} else if (slave.anus === 2) {
			r.push(`well-used asshole.`);
		} else if (slave.anus === 1) {
			r.push(`tight butthole.`);
		} else if (slave.anus === 0) {
			r.push(`virgin butthole.`);
		}
		r.push(`${He} writhes as you continue to move around ${his} posterior, gently reaching to touch your fingertips against ${his} sphincter while rubbing ${his} ass at the same time. ${He} struggles to stay still while you circle around ${his} anus with your fingers. You look at ${his} face and ${he} has`);
		if (!canSee(slave)) {
			r.push(`reflexively`);
		}
		r.push(`shut ${his} eyes, trying not to get aroused by your touch on ${his} butt. This only encourages you to continue. You keep squeezing ${his} buttocks tenderly — first one, then the other and then finally both and ${he} can't help but quiver while in your grasp.`);
		if (hasAnyLegs(slave)) {
			r.push(`You pull ${his} body closer towards you by ${his} buttocks, turn ${him} around, and bend ${him} over your lap,`);
			if (slave.inflation === 2) {
				r.push(`${his} soft and jiggly ${slave.inflationType}-filled belly spilling over your legs.`);
			} else if (slave.inflation === 1) {
				r.push(`${his} ${slave.inflationType} distended belly resting on your legs.`);
			} else {
				r.push(`${his} belly resting on your legs.`);
			}
		} else {
			r.push(`You pull ${his} body closer towards you by ${his} buttocks, turn ${him} around, and place ${his} wriggling body on your lap,`);
			if (slave.inflation === 2) {
				r.push(`${his} soft and jiggly ${slave.inflationType}-filled belly spilling over your legs.`);
			} else if (slave.inflation === 1) {
				r.push(`${his} ${slave.inflationType} distended belly resting on your legs.`);
			} else {
				r.push(`${his} belly resting on your legs.`);
			}
		}
		r.push(`You look at ${his} rear while you squeeze ${his} cheeks and rub them with your firm hands. You explore the contours of ${his} posterior with both your eyes and hands, before picking up the hose and inserting it into ${his}`);
		if (slave.anus > 3) {
			r.push(`gaping`);
		} else if (slave.anus === 3) {
			r.push(`loose`);
		} else if (slave.anus === 2) {
			r.push(`well-used`);
		} else if (slave.anus === 1) {
			r.push(`tight`);
		} else if (slave.anus === 0) {
			r.push(`virgin`);
		}
		r.push(`butthole, and setting it on low.`);
		if (slave.inflation === 2) {
			r.push(`${His} sloshing belly slowly grows even larger with ${slave.inflationType}. You rest a hand on ${his} back as ${his} swelling belly forces ${him} to rise off your lap. Once the enema is complete and ${he} is plugged, you`);
			if (canStand(slave)) {
				r.push(`push ${him} to ${his}`);
				if (hasBothLegs(slave)) {
					r.push(`feet`);
				} else {
					r.push(`foot`);
				}
			} else {
				r.push(`help ${him} onto your desk`);
			}
			r.push(`and admire ${his} taut, ${slave.skin} stomach. ${He} looks up at you quizzically, unsure about what you will do next. You order ${him} to keep ${himself} filled with two gallons of ${slave.inflationType} until you say otherwise.`);
		} else if (slave.inflation === 1) {
			r.push(`${His} bloated belly slowly swells even larger with ${slave.inflationType}. You slip a hand under ${his} stomach to feel it grow in your palm. Once the enema is complete and ${he} is plugged, you`);
			if (canStand(slave)) {
				r.push(`push ${him} to ${his}`);
				if (hasBothLegs(slave)) {
					r.push(`feet`);
				} else {
					r.push(`foot`);
				}
			} else {
				r.push(`help ${him} onto your desk`);
			}
			r.push(`and admire ${his} jiggly, soft, ${slave.skin} stomach. ${He} looks up at you quizzically, unsure about what you will do next. You order ${him} to keep ${himself} filled with four liters of ${slave.inflationType} until you say otherwise.`);
		} else {
			r.push(`${His} belly slowly swells with ${slave.inflationType}. You slip a hand under ${his} stomach to feel it grow in your palm. Once the enema is complete and ${he} is plugged, you`);
			if (canStand(slave)) {
				r.push(`push ${him} to ${his}`);
				if (hasBothLegs(slave)) {
					r.push(`feet`);
				} else {
					r.push(`foot`);
				}
			} else {
				r.push(`help ${him} onto your desk`);
			}
			r.push(`and admire ${his} distended, ${slave.skin} stomach. ${He} looks up at you quizzically, unsure about what you will do next. You order ${him} to keep ${himself} filled with two liters of ${slave.inflationType} until you say otherwise.`);
		}
	} else if (slave.devotion <= 50) {
		if (canMove(slave)) {
			r.push(`You instruct ${him} to present ${his}`);
			if (V.seeRace === 1) {
				r.push(slave.race);
			}
			r.push(`anus for a ${slave.inflationType} enema. ${He} hesitates but eventually`);
			if (canStand(slave)) {
				r.push(`stands`);
			} else {
				r.push(`crawls`);
			}
			r.push(`in front of you showing ${his} buttocks before presenting ${his} anus.`);
		} else if (!isAmputee(slave)) {
			r.push(`You instruct ${him} to present ${his}`);
			if (V.seeRace === 1) {
				r.push(slave.race);
			}
			r.push(`anus for a ${slave.inflationType} enema. ${He} hesitates but eventually shifts ${his} buttocks to face you before presenting ${his} anus.`);
		} else {
			r.push(`${he}'s mildly hesitant of being filled with`);
			if (slave.inflation > 0) {
				r.push(`more`);
			}
			r.push(`${slave.inflationType}, but as an amputee can do nothing about it.`);
		}
		r.push(`You reach around and grab ${his}`);
		if (slave.butt < 2) {
			r.push(`flat`);
		} else if (slave.butt <= 2) {
			r.push(`cute`);
		} else if (slave.butt <= 3) {
			r.push(`firm`);
		} else if (slave.butt <= 4) {
			r.push(`generous`);
		} else if (slave.butt <= 5) {
			r.push(`massive`);
		} else if (slave.butt <= 7) {
			r.push(`enormous`);
		} else if (slave.butt <= 10) {
			r.push(`gigantic`);
		} else if (slave.butt <= 14) {
			r.push(`inhuman`);
		} else if (slave.butt <= 20) {
			r.push(`couch-like`);
		}
		r.push(`buttocks. You start rubbing along ${his} cheeks, feeling the shape of ${his}`);
		if (V.seeRace === 1) {
			r.push(slave.race);
		}
		r.push(`ass with your fingers and squeezing gently. As you rub your fingers around ${his} anus, ${he} starts to relax. ${He} quivers as you continue to move around ${his} posterior gently reaching to touch your fingertips against ${his} sphincter while rubbing ${his} ass at the same time. ${He} purses ${his} lips while you circle around ${his} anus with your fingers. You look at ${his} face and ${he} is`);
		if (canSee(slave)) {
			r.push(`looking back at you doe-eyed,`);
		} else {
			r.push(`smiling pleasantly at you,`);
		}
		r.push(`trying but failing not to get aroused by your soft touch on ${his} butt. You keep squeezing ${his} buttocks tenderly — first one, then the other and then finally both and ${he} can't help but let out a moan while in your grasp.`);
		if (hasAnyLegs(slave)) {
			r.push(`You pull ${his} body closer towards you by ${his} buttocks, turn ${him} around, and bend ${him} over your lap,`);
			if (slave.inflation === 2) {
				r.push(`${his} soft and jiggly ${slave.inflationType}-filled belly spilling over your legs.`);
			} else if (slave.inflation === 1) {
				r.push(`${his} ${slave.inflationType} distended belly resting on your legs.`);
			} else {
				r.push(`${his} belly resting on your legs.`);
			}
		} else {
			r.push(`You pull ${his} body closer towards you by ${his} buttocks, turn ${him} around, and place ${him} wriggling body on your lap,`);
			if (slave.inflation === 2) {
				r.push(`${his} soft and jiggly ${slave.inflationType}-filled belly spilling over your legs.`);
			} else if (slave.inflation === 1) {
				r.push(`${his} ${slave.inflationType} distended belly resting on your legs.`);
			} else {
				r.push(`${his} belly resting on your legs.`);
			}
		}
		r.push(`You look at ${his} rear while you squeeze ${his} cheeks and rub them with your firm hands. You wander along the outline of ${his} posterior with both your eyes and hands, before picking up the hose and inserting it into ${his}`);
		if (slave.anus > 3) {
			r.push(`gaping`);
		} else if (slave.anus === 3) {
			r.push(`loose`);
		} else if (slave.anus === 2) {
			r.push(`well-used`);
		} else if (slave.anus === 1) {
			r.push(`tight`);
		} else if (slave.anus === 0) {
			r.push(`virgin`);
		}
		r.push(`butthole, and setting it on low.`);
		if (slave.inflation === 2) {
			r.push(`${His} sloshing belly slowly grows even larger with ${slave.inflationType}. You rest a hand on ${his} back as ${his} swelling belly forces ${him} to rise off your lap. Once the enema is complete and ${he} is plugged, you`);
			if (canStand(slave)) {
				r.push(`push ${him} to ${his}`);
				if (hasBothLegs(slave)) {
					r.push(`feet`);
				} else {
					r.push(`foot`);
				}
			} else {
				r.push(`help ${him} onto your desk`);
			}
			r.push(`and admire ${his} taut, ${slave.skin} stomach. ${He} sighs contently, hoping you'll give ${him} more attention. You pat ${his} belly and tell ${him} to keep ${himself} filled with two gallons of ${slave.inflationType} until you say otherwise.`);
		} else if (slave.inflation === 1) {
			r.push(`${His} bloated belly slowly swells even larger with ${slave.inflationType}. You slip a hand under ${his} stomach to feel it grow in your palm. Once the enema is complete and ${he} is plugged, you`);
			if (canStand(slave)) {
				r.push(`push ${him} to ${his}`);
				if (hasBothLegs(slave)) {
					r.push(`feet`);
				} else {
					r.push(`foot`);
				}
			} else {
				r.push(`help ${him} onto your desk`);
			}
			r.push(`and admire ${his} jiggly, soft, ${slave.skin} stomach. ${He} sighs contently, hoping you'll give ${him} more attention. You pat ${his} belly and tell ${him} to keep ${himself} filled with four liters of ${slave.inflationType} until you say otherwise.`);
		} else {
			r.push(`${His} belly slowly swells with ${slave.inflationType}. You slip a hand under ${his} stomach to feel it grow in your palm. Once the enema is complete and ${he} is plugged, you`);
			if (canStand(slave)) {
				r.push(`push ${him} to ${his}`);
				if (hasBothLegs(slave)) {
					r.push(`feet`);
				} else {
					r.push(`foot`);
				}
			} else {
				r.push(`help ${him} onto your desk`);
			}
			r.push(`and admire ${his} distended, ${slave.skin} stomach. ${He} sighs contently, hoping you'll give ${him} more attention. You pat ${his} belly and tell ${him} to keep ${himself} filled with two liters of ${slave.inflationType} until you say otherwise.`);
		}
	} else {
		if (canMove(slave)) {
			r.push(`You instruct ${him} to present ${his}`);
			if (V.seeRace === 1) {
				r.push(slave.race);
			}
			r.push(`anus for a ${slave.inflationType} enema. ${He} eagerly`);
			if (canStand(slave)) {
				r.push(`stands in front of you showing ${his} buttocks before happily presenting ${his} anus to you, spreading ${his} butt cheeks and turning to face you.`);
			} else {
				r.push(`crawls to you, showing ${his} buttocks in motion before happily presenting ${his} anus to you.`);
			}
		} else if (!isAmputee(slave)) {
			r.push(`You instruct ${him} to present ${his}`);
			if (V.seeRace === 1) {
				r.push(slave.race);
			}
			r.push(`anus for a ${slave.inflationType} enema. ${He} eagerly shifts around to show ${his} buttocks before happily presenting ${his} anus to you, spreading ${his} butt cheeks and turning to face you.`);
		} else {
			r.push(`${He} devotedly`);
			if (canSee(slave)) {
				r.push(`looks`);
			} else {
				r.push(`smiles`);
			}
			r.push(`at you, awaiting the warm liquids entering ${his} bowels.`);
		}
		r.push(`You reach around and grab ${his}`);
		if (slave.butt < 2) {
			r.push(`flat`);
		} else if (slave.butt <= 2) {
			r.push(`cute`);
		} else if (slave.butt <= 3) {
			r.push(`firm`);
		} else if (slave.butt <= 4) {
			r.push(`generous`);
		} else if (slave.butt <= 5) {
			r.push(`massive`);
		} else if (slave.butt <= 7) {
			r.push(`enormous`);
		} else if (slave.butt <= 10) {
			r.push(`gigantic`);
		} else if (slave.butt <= 14) {
			r.push(`inhuman`);
		} else if (slave.butt <= 20) {
			r.push(`couch-like`);
		}
		r.push(`buttocks. You start rubbing along ${his} cheeks, feeling the shape of ${his}`);
		if (V.seeRace === 1) {
			r.push(slave.race);
		}
		r.push(`ass with your fingers and squeezing gently. As you rub your fingers around ${his} anus, ${he} sighs audibly. ${He} moans as you continue to move around ${his} posterior gently reaching to touch your fingertips against ${his} sphincter while rubbing ${his} ass at the same time. ${He} quivers while you circle around ${his} anus with your fingers. You look at ${his} face and ${he} is`);
		if (canSee(slave)) {
			r.push(`looking`);
		} else {
			r.push(`gazing`);
		}
		r.push(`back at you longingly, getting aroused by your continued touch on ${his} butt. You keep squeezing ${his} buttocks tenderly — first one, then the other and then finally both and ${he} can't help but let out a moan while in your grasp.`);
		if (hasAnyLegs(slave)) {
			r.push(`You pull ${his} body closer towards you by ${his} buttocks, turn ${him} around, and bend ${him} over your lap,`);
			if (slave.inflation === 2) {
				r.push(`${his} soft and jiggly ${slave.inflationType}-filled belly spilling over your legs.`);
			} else if (slave.inflation === 1) {
				r.push(`${his} ${slave.inflationType} distended belly resting on your legs.`);
			} else {
				r.push(`${his} belly resting on your legs.`);
			}
		} else {
			r.push(`You pull ${his} body closer towards you by ${his} buttocks, turn ${him} around, and place ${his} wriggling body on your lap,`);
			if (slave.inflation === 2) {
				r.push(`${his} soft and jiggly ${slave.inflationType}-filled belly spilling over your legs.`);
			} else if (slave.inflation === 1) {
				r.push(`${his} ${slave.inflationType} distended belly resting on your legs.`);
			} else {
				r.push(`${his} belly resting on your legs.`);
			}
		}
		r.push(`You look at ${his} rear while you squeeze ${his} cheeks and rub them with your firm hands. You wander along the outline of ${his} posterior with both your eyes and hands, before picking up the hose and inserting it into ${his}`);
		if (slave.anus > 3) {
			r.push(`gaping`);
		} else if (slave.anus === 3) {
			r.push(`loose`);
		} else if (slave.anus === 2) {
			r.push(`well-used`);
		} else if (slave.anus === 1) {
			r.push(`tight`);
		} else if (slave.anus === 0) {
			r.push(`virgin`);
		}
		r.push(`butthole, and setting it on low.`);
		if (slave.inflation === 2) {
			r.push(`${His} sloshing belly slowly grows even larger with ${slave.inflationType}. You rest a hand on ${his} back as ${his} swelling belly forces ${him} to rise off your lap. Once the enema is complete and ${he} is plugged, you`);
			if (canStand(slave)) {
				r.push(`push ${him} to ${his}`);
				if (hasBothLegs(slave)) {
					r.push(`feet`);
				} else {
					r.push(`foot`);
				}
			} else {
				r.push(`help ${him} onto your desk`);
			}
			r.push(`and admire ${his} taut, ${slave.skin} stomach. ${He} sighs contently, before eagerly begging for more. You pat ${his} belly and tell ${him} to keep ${himself} filled with two gallons of ${slave.inflationType} until you say otherwise.`);
		} else if (slave.inflation === 1) {
			r.push(`${His} bloated belly slowly swells even larger with ${slave.inflationType}. You slip a hand under ${his} stomach to feel it grow in your palm. Once the enema is complete and ${he} is plugged, you`);
			if (canStand(slave)) {
				r.push(`push ${him} to ${his}`);
				if (hasBothLegs(slave)) {
					r.push(`feet`);
				} else {
					r.push(`foot`);
				}
			} else {
				r.push(`help ${him} onto your desk`);
			}
			r.push(`and admire ${his} jiggly, soft, ${slave.skin} stomach. ${He} sighs contently, before eagerly begging for more. You pat ${his} belly and tell ${him} to keep ${himself} filled with four liters of ${slave.inflationType} until you say otherwise.`);
		} else {
			r.push(`${His} belly slowly swells with ${slave.inflationType}. You slip a hand under ${his} stomach to feel it grow in your palm. Once the enema is complete and ${he} is plugged, you`);
			if (canStand(slave)) {
				r.push(`push ${him} to ${his}`);
				if (hasBothLegs(slave)) {
					r.push(`feet`);
				} else {
					r.push(`foot`);
				}
			} else {
				r.push(`help ${him} onto your desk`);
			}
			r.push(`and admire ${his} distended, ${slave.skin} stomach. ${He} sighs contently, before eagerly begging for more. You pat ${his} belly and tell ${him} to keep ${himself} filled with two liters of ${slave.inflationType} until you say otherwise.`);
		}
	}
	if (pregDiscovery === 0) {
		slave.inflation += 1;
		if (slave.inflation === 3) {
			if (canWalk(slave) || (canMove(slave) && slave.rules.mobility === "permissive")) {
				r.push(`${He} gingerly leaves your office, massaging ${his} bloated guts as ${he} goes.`);
			} else {
				r.push(`${His} belly wobbles heavily as ${he} is helped from your office.`);
			}
			r.push(`Being filled so full <span class="health dec">surely had negative effects</span> on ${his} health.`);
			healthDamage(slave, 10);
		} else if (slave.inflation === 2) {
			if (canWalk(slave) || (canMove(slave) && slave.rules.mobility === "permissive")) {
				r.push(`${He} gingerly leaves your office, massaging ${his} full guts as ${he} goes.`);
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
		SetBellySize(slave);
	}
	App.Events.addParagraph(node, r);
	return node;
};
