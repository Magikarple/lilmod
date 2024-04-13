/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.Interact.fondleButt = function(slave) {
	const node = new DocumentFragment();
	let r = [];

	const {
		He, His,
		he, his, him,
	} = getPronouns(slave);

	const {title: Master} = getEnunciation(slave);

	r.push(`You call ${him} over so you can fondle ${his}`);
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
	r.push(`as well as ${his}`);
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

	if (slave.fetish === "buttslut" && slave.devotion >= -20) {
		r.push(`${He}'s pleased at the prospect of you touching ${his} favorite body part.`);
	}

	if (slave.fetish === "masochist" && slave.fetishStrength > 60 && slave.fetishKnown === 1 && slave.anus === 0 && slave.devotion >= -20) {
		if (canWalk(slave)) {
			r.push(`${He} approaches you eagerly and waves ${his} butt, then presents ${his} virgin anus in front of you, spreading ${his} butt cheeks towards you with ${his} hands before turning to face you.`);
		}
		r.push(`You reach around and firmly grab ${his} buttocks with both hands. ${He} gasps as you smack both of ${his} cheeks, you feel the shape of ${his}`);
		if (V.seeRace === 1) {
			r.push(slave.race);
		}
		r.push(`ass with your fingers and squeeze hard. ${He} moans with arousal as you spank ${his}`);
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
		r.push(`buttocks. ${He} looks longingly into your eyes as you continue to move around ${his} posterior, pinching with your fingers and slapping with your palms before reaching to touch your fingertips against ${his} sphincter. ${He} moans and quivers slightly when you rub your fingers around ${his} virgin anus. ${He} starts to wiggle ${his} ass while you circle around ${his} anus, not breaking contact with ${him} with your fingers. You keep squeezing ${his} buttocks firmly — first one, then the other and then finally both. ${He} can't resist gyrating ${his} hips in arousal while in your grasp.`);
		if (canStand(slave)) {
			r.push(`You strongly pull ${his} body closer towards you by ${his} buttocks, turn ${him} around, and push ${him} down to bend ${him} over your desk.`);
		} else {
			r.push(`You move closer towards ${him}, turn ${him} around and firmly hold ${him} down on desk, face-down so that ${his} butt is facing you up into the air.`);
		}
		r.push(`${He} pretends to be unwilling but cannot disguise ${his} obvious joy. You see that ${his} rear has reddened in your rough play and you continue to squeeze ${his} cheeks hard and spank them with your firm hands. ${He} moans harder at you squeezing along the contours of ${his} posterior with both your hands and at ${his} virgin butthole as you push against it with your fingers and thumb. Eventually you decide to stop and ${he} squeals with delight after you give ${his}`);
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
		r.push(`buttocks a few hard smacks for good measure. ${His} face is in ecstasy as ${he} stands and turns to face you, gently rubbing the red spots on ${his} buttocks and`);
		if (canSee(slave)) {
			r.push(`looking at`);
		} else {
			r.push(`facing`);
		}
		r.push(`you hungrily as if ${he} wants more.`);
	} else if (slave.devotion > 50 && slave.anus === 0) {
		if (canStand(slave)) {
			r.push(`${He} accepts your orders happily and waves ${his} virgin anus to you, spreading ${his} butt cheeks in front of you with ${his} hands before turning to face you.`);
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
		r.push(`buttocks with both hands before rubbing along them, feeling the shape of ${his}`);
		if (V.seeRace === 1) {
			r.push(slave.race);
		}
		r.push(`ass with your fingers and squeezing gently. ${He} looks passionately into your eyes as you continue to move around ${his} posterior gently reaching to touch your fingertips against ${his} sphincter while rubbing ${his} ass at the same time. ${He} sighs as you rub your fingertips around ${his} virgin anus. ${He} starts to wiggle ${his} ass while you circle around ${his} anus, not breaking contact with ${him} with your fingers. You keep squeezing ${his} buttocks tenderly — first one, then the other and then both and ${he} can't resist gyrating ${his} hips enticingly while in your grasp.`);
		if (canStand(slave)) {
			r.push(`You pull ${his} body closer towards you by ${his} buttocks, turn ${him} around, and bend ${him} over your desk.`);
		} else {
			r.push(`You move closer towards ${him}, turn ${him} around and push ${him} down on desk, face-down so that ${his} butt is facing you up into the air.`);
		}
		r.push(`You look at ${his} rear while you squeeze ${his} cheeks and rub them with your firm hands. You explore the contours of ${his} posterior with both your eyes and hands, then look at ${his} virgin butthole as you trace it with your fingers and thumb. Eventually you decide to stop and ${he} squeals with delight after you give ${his}`);
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
		r.push(`buttocks a gentle smack. ${He} turns to face you, kissing you, but`);
		if (canSee(slave)) {
			r.push(`looking at`);
		} else {
			r.push(`facing`);
		}
		r.push(`you longingly as if ${he} wants more.`);
		if (!hasAnyArms(slave) && !canTalk(slave)) {
			r.push(`${He} does ${his} best to communicate love with ${his} ${App.Desc.eyesColor(slave)}.`);
		} else if (!canTalk(slave)) {
			r.push(`${He} signs that ${he} loves you.`);
		} else if (SlaveStatsChecker.checkForLisp(slave)) {
			r.push(Spoken(slave, `"I love you, ${Master},"`));
			r.push(`${he} lisps happily.`);
		} else {
			r.push(Spoken(slave, `"I love you, ${Master},"`));
			r.push(`${he} says happily.`);
		}
	} else if (slave.devotion > 20 && slave.anus === 0) {
		if (canStand(slave)) {
			r.push(`${He} accepts your orders without comment and presents ${his} virgin anus to you before turning to face you.`);
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
		r.push(`buttocks with both hands before rubbing along them, feeling the shape of ${his}`);
		if (V.seeRace === 1) {
			r.push(slave.race);
		}
		r.push(`ass with your fingers and squeezing gently. ${He} gasps as you rub fingers around ${his} virgin anus. You watch ${his} face as you continue to move around ${his} posterior and ${he} clearly enjoys the contact on ${his} bare skin. You gently reach to touch your fingertips against ${his} sphincter while rubbing ${his} ass at the same time. ${He} starts to wiggle ${his} ass while you circle around ${his} anus, not breaking contact with ${him} with your fingers. You keep squeezing ${his} buttocks tenderly — first one, then the other and then both and ${he} can't help but gyrate ${his} hips enticingly while in your grasp. You pull ${his} body closer towards you by ${his} buttocks, turn ${him} around, and bend ${him} over your desk. You look at ${his} rear while you squeeze ${his} cheeks and rub them with your firm hands. You explore the contours of ${his} posterior with both your eyes and hands, then look at ${his} virgin butthole as you trace it with your fingers and thumb. Eventually you decide to stop and ${he} squeals in surprise after you give ${his}`);
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
		r.push(`buttocks a gentle smack. You tell ${him} to stand as you are finished. ${He} stands and looks at you quizzically. Though ${he} has accepted life as a sex slave, ${he} cannot help but feel a conflicted mixture of enjoyment and mild embarrassment.`);
	} else if (slave.devotion >= -20 && slave.anus === 0) {
		r.push(`${He} obeys your harmless order but ${he} can't help but feel slight trepidation and trembles slightly at the thought of you groping ${his} butt.`);
		if (hasAnyLegs(slave)) {
			r.push(`${He} stands in front of you as you`);
		} else {
			r.push(`You`);
		}
		r.push(`reach around and grab ${his}`);
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
		r.push(`buttocks before rubbing along them, feeling the shape of ${his}`);
		if (V.seeRace === 1) {
			r.push(slave.race);
		}
		r.push(`ass with your fingers and squeezing gently. ${He} gasps as you rub fingers around ${his} virgin anus. You study ${his} face as you continue to move around ${his} posterior gently reaching to touch your fingertips against ${his} sphincter while rubbing ${his} ass at the same time. ${He} starts to wiggle ${his} ass while you circle around ${his} anus, not breaking contact with ${him} with your fingers. You keep squeezing ${his} buttocks tenderly — first one, then the other and then both and ${he} can't help but wiggle ${his} hips while in your grasp. You pull ${his} body closer towards you by ${his} buttocks, turn ${him} around, and bend ${him} over your desk. You look at ${his} rear while you squeeze ${his} cheeks and rub them with your firm hands. You explore the contours of ${his} posterior with both your eyes and hands, then look at ${his} virgin butthole as you trace it with your fingers and thumb. Eventually you decide to stop and ${he} squeals in surprise after you give ${his}`);
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
		r.push(`buttocks a gentle smack. You tell ${him} to stand as you are finished. ${He} stands and looks at you quizzically, ${his} eyes searching in yours for answers that ${he} cannot find.`);
	} else if (slave.trust < -50 && slave.anus === 0) {
		r.push(`${He} is nearly frozen with fear, and does not resist as you kiss ${him}. In fact, ${he} barely reacts at all. ${He} stands in front of you and visibly stiffens as you reach around and grab ${his}`);
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
		r.push(`buttocks before rubbing along them, feeling the shape of ${his}`);
		if (V.seeRace === 1) {
			r.push(slave.race);
		}
		r.push(`ass with your fingers and squeezing gently. ${He} gasps and shivers as you rub fingers around ${his} virgin anus. ${He} remains frozen as you continue to move around ${his} posterior gently reaching to touch your fingertips against ${his} sphincter while rubbing ${his} ass at the same time. ${He} shudders more while you circle around ${his} anus, not breaking contact with ${him} with your fingers. You keep squeezing ${his} buttocks tenderly — first one, then the other and then finally both. ${He} is so filled with terror that ${he} remains stiff while in your grasp, even as it becomes clear to ${him} you're not going to hurt ${him}. You pull ${his} quivering body closer towards you by ${his} buttocks, turn ${him} around, and bend ${him} over your desk. You look at ${his} quaking rear while you squeeze ${his} cheeks and rub them with your firm hands. You explore the contours of ${his} posterior with both your eyes and hands, then look at ${his} virgin butthole as you trace it with your fingers and thumb. Eventually, you decide to stop. ${He} gradually stands and looks in your eyes with utter incomprehension, but ${he} is frightened about what you will do next.`);
	} else if (slave.anus === 0) {
		r.push(`While you grope ${his} butt, ${he} tries hard to resist. ${He}`);
		if (hasAnyArms(slave)) {
			r.push(`grabs`);
			if (hasBothArms(slave)) {
				r.push(`your wrists and tugs on your arms`);
			} else {
				r.push(`your wrist and tugs on your arm`);
			}
		} else {
			r.push(`writhes under your fingers`);
		}
		r.push(`but stops, helpless, when you tell ${him} what the alternatives are. You reach around and grab ${his}`);
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
		r.push(`buttocks before rubbing along them, feeling the shape of ${his}`);
		if (V.seeRace === 1) {
			r.push(slave.race);
		}
		r.push(`ass with your fingers and squeezing gently. ${He} tries to break out of your grasp as you rub fingers around ${his} virgin anus. ${He} writhes as you continue to move around ${his} posterior, gently reaching to touch your fingertips against ${his} sphincter while rubbing ${his} ass at the same time. ${He} struggles to stay still while you circle around ${his} unbroken anus, not breaking contact with ${him} with your fingers. You look at ${his} face and ${he} has`);
		if (!canSee(slave)) {
			r.push(`reflexively`);
		}
		r.push(`shut ${his} eyes, trying not to think about what's happening to ${his} butt. This only encourages you to continue. You keep squeezing ${his} buttocks tenderly — first one, then the other and then finally both and ${he} can't help but quiver while in your grasp. You pull ${his} body closer towards you by ${his} buttocks, turn ${him} around, and push ${him} down, bending ${him} over your desk while ${he} tries to push away. You look at ${his} rear while you squeeze ${his} cheeks and rub them with your firm hands. You wander along the outline of ${his} posterior with both your eyes and hands, then look at ${his} virgin butthole as you trace it with your fingers and thumb. Eventually, you decide to stop. ${He} slowly stands and looks in your eyes, as though almost demanding answers. ${He} looks apprehensive about what you will do next.`);
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
		r.push(`but you understand it is only physiological. You continue to move around ${his} posterior gently reaching to touch your fingertips against ${his} sphincter while rubbing ${his} ass at the same time. You circle around ${his} anus but ${he} remains still. You keep squeezing ${his} buttocks tenderly — first one, then the other and then both but ${he} is like a doll in your grasp. You pull ${his} body closer towards you by ${his} buttocks, turn ${him} around, and bend ${him} over your desk. You look at ${his} rear while you squeeze ${his} cheeks and rub them with your firm hands. You explore the contours of ${his} posterior with both your eyes and hands, then look at ${his}`);
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
		r.push(`butthole as you trace it with your fingers and thumb. Eventually, you decide to stop but ${he} remains in position over your desk until you stand ${him} up yourself.`);
	} else if (slave.devotion < -20) {
		if (!isAmputee(slave)) {
			r.push(`You instruct ${him} to present ${his} buttocks and anus. Opposed to the thought of your hands groping ${him}, ${he} tries to`);
			if (hasAnyLegs(slave)) {
				r.push(`step`);
			} else {
				r.push(`move`);
			}
			r.push(`back, but you catch ${him} and pull ${him} closer to you as you reach around and grab ${his}`);
		} else {
			r.push(`${He}'s opposed to the thought of your hands groping ${him}, but as an amputee can do nothing about it. You reach around and grab ${his}`);
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
			r.push(`${He} tries to grab your wrists to keep them away but ${he} cannot resist for long.`);
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
		r.push(`${He} writhes as you continue to move around ${his} posterior, gently reaching to touch your fingertips against ${his} sphincter while rubbing ${his} ass at the same time. ${He} struggles to stay still while you circle around ${his} anus, not breaking contact with ${him} with your fingers. You look at ${his} face and ${he} has`);
		if (!canSee(slave)) {
			r.push(`reflexively`);
		}
		r.push(`shut ${his} eyes, trying not to think about what's happening to ${his} butt. This only encourages you to continue. You keep squeezing ${his} buttocks tenderly — first one, then the other and then finally both and ${he} can't help but quiver while in your grasp.`);
		if (hasBothLegs(slave)) {
			r.push(`You pull ${his} body closer towards you by ${his} buttocks, turn ${him} around, and push ${him} down, bending ${him} over your desk while ${he} tries to push away.`);
		} else {
			r.push(`You move closer to ${him}, turn ${him} around and push ${him} down, face-down on your desk while ${he} tries to wriggle desperately.`);
		}
		r.push(`You look at ${his} rear while you squeeze ${his} cheeks and rub them with your firm hands. You wander along the outline of ${his} posterior with both your eyes and hands, then look at ${his}`);
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
		r.push(`butthole as you trace it with your fingers and thumb. Eventually, you decide to stop. ${He} slowly stands and looks in your eyes, as though almost demanding answers. ${He} looks apprehensive about what you will do next.`);
	} else if (slave.devotion <= 20 && slave.vagina < 0) {
		if (!isAmputee(slave)) {
			r.push(`You instruct ${him} to present ${his} anus. ${He} complies without comment, standing in front of you.`);
		} else {
			r.push(`${He}'s hesitant at the thought of your hands groping ${him}, but as an amputee can do nothing about it.`);
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
		r.push(`buttocks. ${His} dick cannot stop twitching as you start rubbing along ${his} cheeks, feeling the shape of ${his}`);
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
		if (hasBothLegs(slave)) {
			r.push(`You pull ${his} body closer towards you by ${his} buttocks, turn ${him} around, and push ${him} down, bending ${him} over your desk.`);
		} else {
			r.push(`You move closer to ${him}, turn ${him} around and push ${him} down, face-down on your desk while ${he} wriggles.`);
		}
		r.push(`You look at ${his} rear while you squeeze ${his} cheeks and rub them with your firm hands. You wander along the outline of ${his} posterior with both your eyes and hands, then look at ${his}`);
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
		r.push(`butthole as you trace it with your fingers and thumb. Eventually, you decide to stop and ${he} looks up at you quizzically, unsure about what you will do next.`);
	} else if (slave.devotion <= 50) {
		if (!isAmputee(slave)) {
			r.push(`You instruct ${him} to present ${his}`);
			if (V.seeRace === 1) {
				r.push(slave.race);
			}
			r.push(`anus. ${He} hesitates but eventually stands in front of you showing ${his} buttocks before presenting ${his}`);
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
			r.push(`anus to you and turning to face you.`);
		} else {
			r.push(`${He}'s mildly hesitant at the thought of your hands groping ${him}, but as an amputee can do nothing about it.`);
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
		r.push(`ass with your fingers and squeezing gently. As you rub your fingers around ${his} anus, ${he} starts to relax. ${He} quivers as you continue to move around ${his} posterior gently reaching to touch your fingertips against ${his} sphincter while rubbing ${his} ass at the same time. ${He} purses ${his} lips while you circle around ${his} anus with your fingers. You look at ${his} face and ${he} is looking back at you doe-eyed, trying but failing not to get aroused by your soft touch on ${his} butt. You keep squeezing ${his} buttocks tenderly — first one, then the other and then finally both and ${he} can't help but let out a moan while in your grasp.`);
		if (hasBothLegs(slave)) {
			r.push(`You pull ${his} body closer towards you by ${his} buttocks, turn ${him} around, and push ${him} down, bending ${him} over your desk.`);
		} else {
			r.push(`You move closer to ${him}, turn ${him} around and push ${him} down, face-down on your desk while ${he} tries to wriggle desperately.`);
		}
		r.push(`You look at ${his} rear while you squeeze ${his} cheeks and rub them with your firm hands. You wander along the outline of ${his} posterior with both your eyes and hands, then look at ${his} butthole as you trace it with your fingers and thumb. Eventually, you decide to stop, and ${he}`);
		if (canSee(slave)) {
			r.push(`looks up into your eyes`);
		} else {
			r.push(`angles ${his} head to face you`);
		}
		r.push(`longingly, as if ${he} wants more.`);
	} else {
		if (!isAmputee(slave)) {
			r.push(`You instruct ${him} to present ${his}`);
			if (V.seeRace === 1) {
				r.push(slave.race);
			}
			r.push(`anus. ${He} eagerly stands in front of you showing ${his} buttocks before happily presenting ${his}`);
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
			r.push(`anus to you, spreading ${his} butt cheeks and turning to face you.`);
		} else {
			r.push(`${He} devotedly looks at you, awaiting your touch on ${his} body.`);
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
		r.push(`ass with your fingers and squeezing gently. As you rub your fingers around ${his} anus, ${he} sighs audibly. ${He} moans as you continue to move around ${his} posterior gently reaching to touch your fingertips against ${his} sphincter while rubbing ${his} ass at the same time. ${He} quivers while you circle around ${his} anus with your fingers. You look at ${his} face and ${he} is looking back at you longingly, getting aroused by your continued touch on ${his} butt. You keep squeezing ${his} buttocks tenderly — first one, then the other and then finally both and ${he} can't help but let out a moan while in your grasp.`);
		if (hasAnyLegs(slave)) {
			r.push(`You pull ${his} body closer towards you by ${his} buttocks, turn ${him} around, and push ${him} down, bending ${him} over your desk.`);
		} else {
			r.push(`You move closer to ${him}, turn ${him} around and push ${him} down, face-down on your desk so that ${his} butt is up facing towards you.`);
		}
		r.push(`You look at ${his} rear while you squeeze ${his} cheeks and rub them with your firm hands. You wander along the outline of ${his} posterior with both your eyes and hands, then look at ${his} butthole as you trace it with your fingers and thumb. Eventually, you decide to stop, and ${he}`);
		if (canSee(slave)) {
			r.push(`looks up into your eyes`);
		} else {
			r.push(`angles ${his} head to face you`);
		}
		r.push(`ecstatically${hasAnyLegs(slave) ? ` as ${he} stands up` : ``}, eager for more.`);
	}
	App.Events.addParagraph(node, r);
	return node;
};
