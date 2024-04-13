/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.Interact.fillUpFace = function(slave) {
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
	const belly = bellyAdjective(slave);
	r.push(`You attach a hose to ${V.dairyName} tap with the pipes set to pump ${slave.inflationType} and affix a special nozzle to it, one with straps useful for anchoring it to resisting slaves, before calling ${him} over so you can feel ${him} up while you force-feed ${him} ${slave.inflationType}.`);

	if (slave.inflation > 1 && slave.preg > 1) {
		r.push(`${He} looks uneasy at the prospect of taking in that much, far more than could be considered normal.`);
		pregDiscovery = 1;
	} else {
		if (slave.fetish === Fetish.SUBMISSIVE && slave.devotion >= -20) {
			r.push(`${He} blushes at the thought of being forcibly fed.`);
		} else if (slave.fetish === "cumslut" && slave.devotion >= -20 && slave.inflationType === "cum") {
			r.push(`${He}'s pleased at the idea of turning into a cum balloon.`);
		}
		if (slave.devotion >= -20 && (slave.inflationType === "cum" || slave.inflationType === "milk")) {
			if (slave.behavioralFlaw === "gluttonous") {
				r.push(`${He}'s thrilled that you are going to give ${him} such a filling meal.`);
			} else if (slave.behavioralFlaw === "anorexic") {
				r.push(`${He}'s hesitant about whether or not you are trying to make ${him} gain weight.`);
			}
		}
	}

	if (pregDiscovery === 1) {
		r.push(`Not wanting to risk such a mess, you send ${him} for a medical examination. While most of the tests come back normal, one in particular catches your eye; <span class="lime">${He} is pregnant${(slave.preg > slave.pregData.normalBirth/4) ? `` : ` and surprisingly far along`}.</span> ${He} should be able to still handle at least two liters of ${slave.inflationType}, however.`);
		deflate(slave);
		slave.pregKnown = 1;
	} else if (slave.fetish === Fetish.MINDBROKEN) {
		if (canMove(slave)) {
			r.push(`You instruct ${him} to take a seat on your lap and open ${his} mouth wide for the hose, but ${he} remains still and unresponsive. Talking to a broken mind is pointless.`);
		}
		r.push(`You reach out and wrap your arms around ${his}`);
		if (slave.weight > 190) {
			r.push(`immensely soft`);
		} else if (slave.belly >= 150000) {
			r.push(belly);
		} else if (slave.weight > 160) {
			r.push(`massive soft`);
		} else if (slave.weight > 130) {
			r.push(`giant soft`);
		} else if (slave.inflation === 2) {
			r.push(`sloshing, ${slave.inflationType}-filled`);
		} else if (slave.belly >= 1500) {
			r.push(belly);
		} else if (slave.weight > 95) {
			r.push(`huge soft`);
		} else if (slave.inflation === 1) {
			r.push(`${slave.inflationType}-bloated`);
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
		r.push(`belly, pulling ${him} into your lap. You force the hose down ${his} throat, strapping it to ${his} head to prevent it from slipping out, and turn the flow to low. With everything in place, you return your hands to ${his} gurgling stomach.`);
		if (slave.inflation === 2) {
			r.push(`You can feel ${his} ${slave.skin} belly growing taut with ${slave.inflationType} as it pushes out against your hands. Once you have given ${him} ${his} fill, you give the firm orb of ${his} belly a slap, eliciting a large belch from the broken slave and no motion at all from ${his} gut. You order ${him} to keep ${himself} filled with two gallons of ${slave.inflationType} until you say otherwise, before helping ${his} hiccupping bulk onto the couch to recover. After a few minutes of rest, and several glares from you when it appears ${his} meal might be coming back up, is the groaning ${slave.slaveName} ready to be moved.`);
		} else if (slave.inflation === 1) {
			r.push(`You can feel ${his} ${slave.skin} belly growing larger with ${slave.inflationType} as it pushes out against your hands. Once you have given ${him} ${his} fill, you give the jiggling orb of ${his} belly a slap, eliciting a burp from the broken slave and tons of motion from ${his} gut. You order ${him} to keep ${himself} filled with four liters of ${slave.inflationType} until you say otherwise, before helping ${his} hiccupping bulk onto the couch to recover, After a few minutes of rest, and several glares from you when it appears ${his} meal might be coming back up, is the groaning ${slave.slaveName} ready to be moved.`);
		} else {
			r.push(`You can feel ${his} ${slave.skin} belly swelling with ${slave.inflationType} as it pushes out against your hands. Once you have given ${him} ${his} fill, you give ${his} bloated belly a slap, eliciting a small burp from the broken slave and a little jiggle from ${his} gut. You order ${him} to keep ${himself} filled with two liters of ${slave.inflationType} until you say otherwise, before helping ${his} sloshing bulk onto the couch to recover. After a few minutes of rest, and several glares from you when it appears ${his} meal might be coming back up, is the hiccupping ${slave.slaveName} ready to be moved.`);
		}
	} else if (slave.devotion < -20) {
		if (canMove(slave)) {
			r.push(`You instruct ${him} to take a seat on your lap and open ${his} mouth wide for the hose. Opposed to the thought of being filled`);
			if (slave.inflation > 0) {
				r.push(`more`);
			}
			r.push(`with ${slave.inflationType}, ${he} tries to`);
			if (canWalk(slave)) {
				r.push(`step back,`);
			} else {
				r.push(`crawl away,`);
			}
			r.push(`but you catch ${him} and pull ${him} into your lap, wrapping your arms around ${his}`);
		} else if (hasAnyLimbs(slave)) {
			r.push(`You inform ${him} ${he}'ll be taking a seat on your lap, opening ${his} mouth wide for the hose, and drinking until you tell ${him} ${he} is full enough. ${He}'s opposed to the thought of being filled with`);
			if (slave.inflation > 0) {
				r.push(`more`);
			}
			r.push(`${slave.inflationType}, but since ${he} is immobile, ${he} can't escape. You heft ${him} onto your lap, wrapping your arms around ${his}`);
		} else {
			r.push(`${He}'s opposed to the thought of being filled with`);
			if (slave.inflation > 0) {
				r.push(`more`);
			}
			r.push(`${slave.inflationType}, but as an amputee can do nothing about it. You heft ${him} onto your lap, wrapping your arms around ${him}`);
		}
		if (slave.weight > 190) {
			r.push(`immensely soft`);
		} else if (slave.belly >= 150000) {
			r.push(belly);
		} else if (slave.weight > 160) {
			r.push(`massive soft`);
		} else if (slave.weight > 130) {
			r.push(`giant soft`);
		} else if (slave.inflation === 2) {
			r.push(`sloshing, ${slave.inflationType}-filled`);
		} else if (slave.belly >= 1500) {
			r.push(belly);
		} else if (slave.weight > 95) {
			r.push(`huge soft`);
		} else if (slave.inflation === 1) {
			r.push(`${slave.inflationType}-bloated`);
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
		r.push(`belly. You force the hose down ${his} throat, strapping it to ${his} head to prevent ${him} from removing it, and turn the flow to low. With everything in place, you return your hands to ${his} gurgling stomach.`);
		if (slave.inflation === 2) {
			r.push(`You can feel ${his} ${slave.skin} belly growing taut with ${slave.inflationType} as it pushes out against your hands. Once you have given ${him} ${his} fill, you give the firm orb of ${his} belly a slap, eliciting gagging from the overfilled slave and no motion at all from ${his} gut. ${He}`);
			if (canSee(slave)) {
				r.push(`looks in your eyes,`);
			} else {
				r.push(`faces you,`);
			}
			r.push(`as though almost demanding answers. ${He} looks apprehensive about what you will do next. You order ${him} to keep ${himself} filled with two gallons of ${slave.inflationType} until you say otherwise, before helping ${his} hiccupping bulk onto the couch to recover. After a few minutes of rest, and several glares from you when it appears ${his} meal might be coming back up, is the groaning ${slave.slaveName} ready to be moved.`);
		} else if (slave.inflation === 1) {
			r.push(`You can feel ${his} ${slave.skin} belly growing larger with ${slave.inflationType} as it pushes out against your hands. Once you have given ${him} ${his} fill, you give the jiggling orb of ${his} belly a slap, eliciting a burp from the full slave and tons of motion from ${his} gut. ${He}`);
			if (canSee(slave)) {
				r.push(`looks in your eyes,`);
			} else {
				r.push(`faces you,`);
			}
			r.push(`as though almost demanding answers. ${He} looks apprehensive about what you will do next. You order ${him} to keep ${himself} filled with four liters of ${slave.inflationType} until you say otherwise, before helping ${his} hiccupping bulk onto the couch to recover. After a few minutes of rest, and several glares from you when it appears ${his} meal might be coming back up, is the groaning ${slave.slaveName} ready to be moved.`);
		} else {
			r.push(`You can feel ${his} ${slave.skin} belly swelling with ${slave.inflationType} as it pushes out against your hands. Once you have given ${him} ${his} fill, you give ${his} bloated belly a slap, eliciting a shudder from the bloated slave and a little jiggle from ${his} gut. ${He}`);
			if (canSee(slave)) {
				r.push(`looks in your eyes,`);
			} else {
				r.push(`faces you,`);
			}
			r.push(`as though almost demanding answers. ${He} looks apprehensive about what you will do next. You order ${him} to keep ${himself} filled with two liters of ${slave.inflationType} until you say otherwise, before helping ${his} sloshing bulk onto the couch to recover. After a few minutes of rest, and several glares from you when it appears ${his} meal might be coming back up, is the hiccupping ${slave.slaveName} ready to be moved.`);
		}
	} else if (slave.devotion <= 20) {
		if (canMove(slave)) {
			r.push(`You instruct ${him} to take a seat on your lap and open ${his} mouth wide for the hose. ${He} complies without comment and settles ${himself} onto your lap, shuddering slightly as you wrap your arms around ${his}`);
		} else if (hasAnyLimbs(slave)) {
			r.push(`You inform ${him} ${he}'ll be taking a seat on your lap, opening ${his} mouth wide for the hose, and drinking until you tell ${him} ${he} is full enough. ${He} complies without comment. You heft ${him} onto your lap, wrapping your arms around ${his}`);
		} else {
			r.push(`${He}'s hesitant of being filled with`);
			if (slave.inflation > 0) {
				r.push(`more`);
			}
			r.push(`${slave.inflationType}, but as an amputee can do nothing about it. You heft ${him} onto your lap, wrapping your arms around ${his}`);
		}
		if (slave.weight > 190) {
			r.push(`immensely soft`);
		} else if (slave.belly >= 150000) {
			r.push(belly);
		} else if (slave.weight > 160) {
			r.push(`massive soft`);
		} else if (slave.weight > 130) {
			r.push(`giant soft`);
		} else if (slave.inflation === 2) {
			r.push(`sloshing, ${slave.inflationType}-filled`);
		} else if (slave.belly >= 1500) {
			r.push(belly);
		} else if (slave.weight > 95) {
			r.push(`huge soft`);
		} else if (slave.inflation === 1) {
			r.push(`${slave.inflationType}-bloated`);
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
		r.push(`belly. You insert the hose down ${his} throat, choosing to hold it place instead of strapping it to ${him}, and turn the flow to low. With everything in place, you place your free hand on ${his} gurgling stomach.`);
		if (slave.inflation === 2) {
			r.push(`You can feel ${his} ${slave.skin} belly growing taut with ${slave.inflationType} as it pushes out against your hand. Once you have given ${him} ${his} fill, you give the firm orb of ${his} belly a slap, eliciting a restrained gag from the overfilled slave and no motion at all from ${his} gut. ${He} looks up at you quizzically, unsure about what you will do next. You order ${him} to keep ${himself} filled with two gallons of ${slave.inflationType} until you say otherwise, before helping ${his} hiccupping bulk onto the couch to recover. ${His} meal attempts to come back up on ${his} several times, but ${he} holds it down for fear of punishment should ${he} vomit. Only after a few minutes of rest is the groaning ${slave.slaveName} ready to be moved.`);
		} else if (slave.inflation === 1) {
			r.push(`You can feel ${his} ${slave.skin} belly growing larger with ${slave.inflationType} as it pushes out against your hand. Once you have given ${him} ${his} fill, you give the jiggling orb of ${his} belly a slap, eliciting a strained burp from the full slave and tons of motion from ${his} gut. ${He} looks up at you quizzically, unsure about what you will do next. You order ${him} to keep ${himself} filled with four liters of ${slave.inflationType} until you say otherwise, before helping ${his} hiccupping bulk onto the couch to recover. ${His} meal attempts to come back up on ${his} several times, but ${he} holds it down for fear of punishment should ${he} vomit. Only after a few minutes of rest is the groaning ${slave.slaveName} ready to be moved.`);
		} else {
			r.push(`You can feel ${his} ${slave.skin} belly swelling with ${slave.inflationType} as it pushes out against your hand. Once you have given ${him} ${his} fill, you give ${his} bloated belly a slap, eliciting a small shudder from the bloated slave and a little jiggle from ${his} gut. ${He} looks up at you quizzically, unsure about what you will do next. You order ${him} to keep ${himself} filled with two liters of ${slave.inflationType} until you say otherwise, before helping ${his} sloshing bulk onto the couch to recover. ${His} meal attempts to come back up on ${his} several times, but ${he} holds it down for fear of punishment should ${he} vomit. Only after a few minutes of rest is the groaning ${slave.slaveName} ready to be moved.`);
		}
	} else if (slave.devotion <= 50) {
		if (canMove(slave)) {
			r.push(`You instruct ${him} to take a seat on your lap and open ${his} mouth wide for the hose. ${He} hesitates but eventually settles ${himself} onto your lap as you wrap your arms around ${his}`);
		} else if (hasAnyLimbs(slave)) {
			r.push(`You inform ${him} ${he}'ll be taking a seat on your lap, opening ${his} mouth wide for the hose, and drinking until you tell ${him} ${he} is full enough. ${He} hesitates for a moment, before demonstrating acceptance. You heft ${him} onto your lap, wrapping your arms around ${his}`);
		} else {
			r.push(`${He}'s mildly hesitant of being filled with`);
			if (slave.inflation > 0) {
				r.push(`more`);
			}
			r.push(`${slave.inflationType}, but as an amputee can do nothing about it. You heft ${him} onto your lap, wrapping your arms around ${his}`);
		}
		if (slave.weight > 190) {
			r.push(`immensely soft`);
		} else if (slave.belly >= 150000) {
			r.push(belly);
		} else if (slave.weight > 160) {
			r.push(`massive soft`);
		} else if (slave.weight > 130) {
			r.push(`giant soft`);
		} else if (slave.inflation === 2) {
			r.push(`sloshing, ${slave.inflationType}-filled`);
		} else if (slave.belly >= 1500) {
			r.push(belly);
		} else if (slave.weight > 95) {
			r.push(`huge soft`);
		} else if (slave.inflation === 1) {
			r.push(`${slave.inflationType}-bloated`);
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
		r.push(`belly. You`);
		if (hasAnyArms(slave)) {
			r.push(`hand ${him} the hose,`);
		} else {
			r.push(`place the hose in ${his} mouth,`);
		}
		r.push(`allowing ${him} to drink from it at ${his} own pace, as you keep a hand on the tap to control the flow. With everything in place, you place your free hand on ${his} gurgling stomach.`);
		if (slave.inflation === 2) {
			r.push(`You can feel ${his} ${slave.skin} belly growing taut with ${slave.inflationType} as it pushes out against your hand. Once you have given ${him} ${his} fill, you give the firm orb of ${his} belly a couple gentle pats, eliciting a small hiccup, that ${he} immediately apologizes for, from the overfilled slave and no motion at all from ${his} gut. ${He} sighs contently, hoping you'll give ${him} more attention. You order ${him} to keep ${himself} filled with two gallons of ${slave.inflationType} until you say otherwise, before helping ${his} heavy body onto the couch to recover. ${His} meal attempts to come back up on ${his} several times, but ${he} dutifully holds it down. Only after a few minutes of rest is the groaning ${slave.slaveName} ready to be moved.`);
		} else if (slave.inflation === 1) {
			r.push(`You can feel ${his} ${slave.skin} belly growing larger with ${slave.inflationType} as it pushes out against your hand. Once you have given ${him} ${his} fill, you give the jiggling orb of ${his} belly a couple pats, eliciting a small hiccup, that ${he} immediately apologizes for, from the full slave and tons of motion from ${his} gut. ${He} sighs contently, hoping you'll give ${him} more attention. You order ${him} to keep ${himself} filled with four liters of ${slave.inflationType} until you say otherwise, before helping ${his} heavy body onto the couch to recover. ${His} meal attempts to come back up on ${him} several times, but ${he} dutifully holds it down. Only after a few minutes of rest is the groaning ${slave.slaveName} ready to be moved.`);
		} else {
			r.push(`You can feel ${his} ${slave.skin} belly swelling with ${slave.inflationType} as it pushes out against your hand. Once you have given ${him} ${his} fill, you give ${his} bloated belly a couple pats, eliciting a small hiccup, that ${he} immediately apologizes for, from the bloated slave and a little jiggle from ${his} gut. ${He} sighs contently, hoping you'll give ${him} more attention. You order ${him} to keep ${himself} filled with two liters of ${slave.inflationType} until you say otherwise, before helping ${his} sloshing body onto the couch to recover. ${His} meal attempts to come back up on ${his} several times, but ${he} dutifully holds it down. Only after a few minutes of rest is the groaning ${slave.slaveName} ready to be moved.`);
		}
	} else {
		if (canMove(slave)) {
			r.push(`You instruct ${him} to take a seat on your lap and open ${his} mouth wide for the hose. ${He} eagerly settles ${himself} onto your lap as you wrap your arms around ${his}`);
		} else if (hasAnyLimbs(slave)) {
			r.push(`You inform ${him} ${he}'ll be taking a seat on your lap, opening ${his} mouth wide for the hose, and drinking until you tell ${him} ${he} is full enough. ${He} squirms with excitement as you heft ${him} onto your lap, wrapping your arms around ${his}`);
		} else {
			r.push(`${He}'s devotedly`);
			if (canSee(slave)) {
				r.push(`looks`);
			} else {
				r.push(`smiles`);
			}
			r.push(`at you as you heft ${him} onto your lap, wrapping your arms around ${his}`);
		}
		if (slave.weight > 190) {
			r.push(`immensely soft`);
		} else if (slave.belly >= 150000) {
			r.push(belly);
		} else if (slave.weight > 160) {
			r.push(`massive soft`);
		} else if (slave.weight > 130) {
			r.push(`giant soft`);
		} else if (slave.inflation === 2) {
			r.push(`sloshing, ${slave.inflationType}-filled`);
		} else if (slave.belly >= 1500) {
			r.push(belly);
		} else if (slave.weight > 95) {
			r.push(`huge soft`);
		} else if (slave.inflation === 1) {
			r.push(`${slave.inflationType}-bloated`);
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
		r.push(`belly. You`);
		if (hasAnyArms(slave)) {
			r.push(`hand ${him} the hose,`);
		} else {
			r.push(`place the hose in ${his} mouth,`);
		}
		r.push(`allowing ${him} to drink from it at ${his} own pace, as you keep a hand on the tap to control the flow. With everything in place, you place your free hand on ${his} gurgling stomach.`);
		if (slave.inflation === 2) {
			r.push(`You can feel ${his} ${slave.skin} belly growing taut with ${slave.inflationType} as it pushes out against your hand. Once you have given ${him} ${his} fill, you give the firm orb of ${his} belly a couple gentle pats, eliciting a cute burp followed by ${his} tongue running over ${his} lips, from the overfilled slave and no motion at all from ${his} gut. ${He} sighs contently, before eagerly begging for more. You tell ${him} to keep ${himself} filled with two gallons of ${slave.inflationType} until you say otherwise, before helping ${his} heavy body onto the couch to recover. Apart from a few hiccups, ${he} spends ${his} time settling ${his} stomach and teasing ${his} near-bursting belly. Only after a few minutes of rest is the groaning ${slave.slaveName} ready to be moved.`);
		} else if (slave.inflation === 1) {
			r.push(`You can feel ${his} ${slave.skin} belly growing larger with ${slave.inflationType} as it pushes out against your hand. Once you have given ${him} ${his} fill, you give the jiggling orb of ${his} belly a couple pats, eliciting a cute burp followed by ${his} tongue running over ${his} lips, from the full slave and tons of motion from ${his} gut. ${He} sighs contently, before eagerly begging for more. You tell ${him} to keep ${himself} filled with four liters of ${slave.inflationType} until you say otherwise, before helping ${his} heavy body onto the couch to recover. Apart from a few hiccups, ${he} spends ${his} time settling ${his} stomach and teasing ${his} overfilled belly. Only after a few minutes of rest is the groaning ${slave.slaveName} ready to be moved.`);
		} else {
			r.push(`You can feel ${his} ${slave.skin} belly swelling with ${slave.inflationType} as it pushes out against your hand. Once you have given ${him} ${his} fill, you give ${his} bloated belly a couple pats, eliciting a cute burp followed by ${his} tongue running over ${his} lips, from the bloated slave and a little jiggle from ${his} gut. ${He} sighs contently, before eagerly begging for more. You tell ${him} to keep ${himself} filled with two liters of ${slave.inflationType} until you say otherwise, before helping ${his} sloshing body onto the couch to recover. Apart from a few hiccups, ${he} spends ${his} time settling ${his} stomach and teasing ${his} bloated belly. Only after a few minutes of rest is the groaning ${slave.slaveName} ready to be moved.`);
		}
	}

	if (pregDiscovery === 0) {
		slave.inflation += 1;
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
		SetBellySize(slave);
	}
	App.Events.addParagraph(node, r);
	return node;
};
